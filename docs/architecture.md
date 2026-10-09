# Architecture

## State ownership

`CartProvider` wraps the application once in `main.jsx`. It owns the canonical array of `{ id, quantity }` records. `useCart` exposes that array, derived totals, and add/decrease/remove/clear actions.

`cartState.js` contains pure cart transitions and normalization. Components never modify the catalog or persist product prices. Each calculation looks up the current price in the bundled product catalog.

Catalog filters, sorting, active dialog, and transient notifications belong to `App`. Saved IDs use the same persistence hook as the cart but have their own storage key. Filters are intentionally temporary.

## Data flow

1. A card or detail dialog requests `addItem(productId)`.
2. The provider uses a functional state update, preserving rapid successive additions.
3. React updates every consumer: the header badge, product controls, and open cart.
4. Totals are recalculated from current catalog prices and quantities.
5. An effect writes the validated bag to localStorage.

The small fixed catalog does not require memoization or an external state library. The provider is the single source of truth for the cart.

## Persistence boundary

Storage keys are versioned: `form-field:cart:v1` and `form-field:saved:v1`.

Reading is lazy, so storage is consulted only when the owning component mounts. JSON parsing and storage access are guarded. Only known catalog IDs and positive safe integer quantities survive normalization. Duplicates merge up to a 99-unit limit. Unknown IDs, including object-prototype property names, are rejected.

Unavailable storage does not block shopping; selections then last only for the current page session. Synchronization between simultaneously open tabs is outside the scope.

## Money

Every price and fee is an integer number of cents. Only the presentation layer calls `Intl.NumberFormat`. The subtotal is the sum of price times quantity; shipping is 895 cents below 15000 cents, otherwise zero. The total includes shipping. No tax calculation is implemented in this demo, and the UI states this.

## Dialogs and accessibility

A shared `Modal` renders a native `dialog` into a portal. `showModal()` puts it in the browser's top layer and makes the background inert. Escape and backdrop clicks dismiss it. Body scrolling is locked for its lifetime; the prior scroll style and focus are restored on cleanup.

Only one dialog is active at a time. The product dialog, cart, order review, confirmation, and store information reuse this primitive. The test environment stubs native dialog methods; keyboard containment and layout require browser verification.

## Assets and delivery

Product photos and fonts are served from the project itself. The application performs no third-party data requests at runtime. Asset URLs respect Vite's base path. Photos have explicit alt text and fixed card proportions; below-the-fold photos use lazy loading, while the hero is prioritized.

Vite produces a static `dist/` build. No backend, secrets, or database is required. A real commerce deployment would require server-authoritative pricing, inventory, tax, order creation, and payment processing.
