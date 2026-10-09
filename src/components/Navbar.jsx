import { ArrowUpRight, Heart, Search, ShoppingBag } from 'lucide-react';

export default function Navbar({ count = 0, onOpenCart, onSearch, onSaved, savedCount = 0 }) {
  return (
    <>
      <div className="announcement">
        <span>Good design. A little closer to home.</span>
        <span>
          Complimentary shipping on orders $150+ <ArrowUpRight size={13} />
        </span>
      </div>
      <header className="site-header">
        <a className="wordmark" href="#" aria-label="Form and Field home">
          form<span>&</span>field<span className="brand-dot">®</span>
        </a>
        <nav aria-label="Main navigation">
          <a className="nav-active" href="#collection">
            Shop the collection
          </a>
          <a href="#our-story">Our approach</a>
        </nav>
        <div className="header-actions">
          <button className="icon-button" onClick={onSearch} aria-label="Search the collection">
            <Search size={21} />
          </button>
          <button
            className="icon-button saved-button"
            onClick={onSaved}
            aria-label={`View saved objects (${savedCount})`}
          >
            <Heart size={21} />
            {savedCount > 0 && <span className="saved-dot" />}
          </button>
          <button
            className="bag-button"
            onClick={onOpenCart}
            aria-label={`Open shopping bag, ${count} items`}
          >
            <ShoppingBag size={20} />
            <span className="bag-label">Bag</span>
            <span className="bag-count">{count}</span>
          </button>
        </div>
      </header>
    </>
  );
}
