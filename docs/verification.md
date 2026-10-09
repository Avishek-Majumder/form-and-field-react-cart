# Verification

## Automated coverage

20 tests pass across two suites:

- Cart normalization, unknown IDs, invalid quantities, duplicate records, and quantity caps.
- Add, decrease, remove, clear, and immutable state transitions.
- Empty totals, per-item arithmetic, shipping below the threshold, exactly at $150, and above it.
- Catalog filtering, searching, empty-search recovery, and sorting.
- Cart persistence after remounting.
- Product details and complete demo checkout.
- Saved favorites and empty saved collections.
- Corrupt storage and blocked storage access.
- Store information and shipping dialogs.

Run with `npm test`. Production builds and Prettier checks are separate gates in GitHub Actions.

## Browser checks

Verified manually in the Codex Chromium-based browser:

- Product photographs load and correspond to their catalog entries.
- A $78 lamp plus $36 plates totals $122.95 including $8.95 shipping.
- Increasing plates to two makes the subtotal exactly $150 and shipping free.
- Refresh preserves items and quantities.
- Quantity decrease and item removal recalculate totals immediately.
- Order review totals match the bag.
- Completing demo checkout clears the bag and explicitly confirms no real order or payment.
- Empty-cart actions and Escape dismissal work.
- Responsive hero, catalog, and dialogs inspected at 320px, 390px, 768px, and 1440px viewport widths. No document overflow at the narrowest checked width.

## Limits

This is a frontend demonstration. There are no real payments, inventory checks, shipping integrations, or accounts. Automated DOM tests do not replace screen-reader testing or a full browser compatibility audit.

- Production browser console: no errors or warnings during the final checks.
- Dialog Tab and Shift+Tab wrap between controls; Escape returns focus to the trigger.
- Production build and formatting checks pass; npm audit reports zero vulnerabilities.
