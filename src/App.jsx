import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer, { Benefits } from './components/Footer';
import Cart from './components/Cart';
import ProductDetails from './components/ProductDetails';
import OrderReview, { OrderComplete } from './components/OrderReview';
import StoreInfo from './components/StoreInfo';
import { products, productById } from './data/products';
import { useCart } from './hooks/useCart';
import { usePersistentState } from './hooks/usePersistentState';
import { normalizeSaved, MAX_QUANTITY } from './context/cartState';

export default function App() {
  const cart = useCart();
  const [category, setCategory] = useState('All objects');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [saved, setSaved] = usePersistentState('form-field:saved:v1', [], normalizeSaved);
  const [savedOnly, setSavedOnly] = useState(false);
  const [panel, setPanel] = useState(null);
  const [toast, setToast] = useState(null);
  const searchRef = useRef(null);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 3500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  const filtered = products
    .filter(
      (product) =>
        (category === 'All objects' || product.category === category) &&
        (!savedOnly || saved.includes(product.id)) &&
        [product.name, product.category, product.material]
          .join(' ')
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
    )
    .sort((a, b) =>
      sort === 'price-asc'
        ? a.price - b.price
        : sort === 'price-desc'
          ? b.price - a.price
          : sort === 'name'
            ? a.name.localeCompare(b.name)
            : 0,
    );
  const toggleSaved = (id) =>
    setSaved((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  const showSaved = () => {
    setSavedOnly(true);
    setCategory('All objects');
    setQuery('');
    document.getElementById('collection').scrollIntoView();
  };
  const openBag = () => {
    setToast(null);
    setPanel({ type: 'cart' });
  };
  const addItem = (id) => {
    if ((cart.items.find((item) => item.id === id)?.quantity || 0) >= MAX_QUANTITY) return;
    cart.addItem(id);
    setToast({ message: productById[id].name + ' added to your bag.' });
  };
  const closePanel = () => setPanel(null);

  return (
    <>
      <a className="skip-link" href="#collection">
        Skip to collection
      </a>
      <Navbar
        count={cart.count}
        onOpenCart={openBag}
        onSearch={() => {
          searchRef.current.focus();
          searchRef.current.scrollIntoView({ block: 'center' });
        }}
        onSaved={showSaved}
        savedCount={saved.length}
      />
      <main>
        <Hero />
        <Benefits />
        <ProductGrid
          products={filtered}
          category={category}
          setCategory={setCategory}
          query={query}
          setQuery={setQuery}
          sort={sort}
          setSort={setSort}
          searchRef={searchRef}
          savedOnly={savedOnly}
          setSavedOnly={setSavedOnly}
          saved={saved}
          toggleSaved={toggleSaved}
          onQuickView={(product) => setPanel({ type: 'product', product })}
          onAdd={addItem}
          items={cart.items}
        />
      </main>
      <Footer onInfo={(type) => setPanel({ type: 'info', info: type })} />
      {panel?.type === 'product' && (
        <ProductDetails
          product={panel.product}
          onClose={closePanel}
          onAdd={(id) => {
            addItem(id);
            openBag();
          }}
        />
      )}
      {panel?.type === 'cart' && (
        <Cart onClose={closePanel} onReview={() => setPanel({ type: 'review' })} />
      )}
      {panel?.type === 'review' && (
        <OrderReview
          onClose={closePanel}
          onBack={openBag}
          onComplete={(receipt) => setPanel({ type: 'complete', receipt })}
        />
      )}
      {panel?.type === 'complete' && <OrderComplete receipt={panel.receipt} onClose={closePanel} />}
      {panel?.type === 'info' && <StoreInfo type={panel.info} onClose={closePanel} />}
      <div className="sr-only" role="status" aria-live="polite">
        {toast?.message}
      </div>
      {toast && !panel && (
        <div className="toast">
          <Check size={17} />
          <span>{toast.message}</span>
          <button onClick={openBag}>View bag</button>
          <button onClick={() => setToast(null)} aria-label="Dismiss notification">
            ×
          </button>
        </div>
      )}
    </>
  );
}
