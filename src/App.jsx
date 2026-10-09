import { useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import Footer, { Benefits } from './components/Footer';
import { products } from './data/products';

export default function App() {
  const [category, setCategory] = useState('All objects');
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('featured');
  const [saved, setSaved] = useState([]);
  const [savedOnly, setSavedOnly] = useState(false);
  const searchRef = useRef(null);
  const filtered = products.filter(p => (category === 'All objects' || p.category === category) && (!savedOnly || saved.includes(p.id)) && [p.name,p.category,p.material].join(' ').toLowerCase().includes(query.trim().toLowerCase())).sort((a,b) => sort === 'price-asc' ? a.price-b.price : sort === 'price-desc' ? b.price-a.price : sort === 'name' ? a.name.localeCompare(b.name) : 0);
  const toggleSaved = id => setSaved(current => current.includes(id) ? current.filter(item => item !== id) : [...current,id]);
  const showSaved = () => { setSavedOnly(true); setCategory('All objects'); setQuery(''); document.getElementById('collection').scrollIntoView(); };
  return <><a className="skip-link" href="#collection">Skip to collection</a><Navbar onSearch={() => { searchRef.current.focus(); searchRef.current.scrollIntoView({ block: 'center' }); }} onSaved={showSaved} savedCount={saved.length} /><main><Hero /><Benefits /><ProductGrid products={filtered} category={category} setCategory={setCategory} query={query} setQuery={setQuery} sort={sort} setSort={setSort} searchRef={searchRef} savedOnly={savedOnly} setSavedOnly={setSavedOnly} saved={saved} toggleSaved={toggleSaved} onQuickView={() => {}} onAdd={() => {}} /></main><Footer onInfo={() => {}} /></>;
}
