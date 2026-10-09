import { ArrowUpRight, Heart, Plus, Check } from 'lucide-react';
import { formatPrice } from '../data/products';

export default function ProductCard({
  product,
  onQuickView,
  onAdd,
  saved,
  onToggleSaved,
  quantity = 0,
}) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <button
          className="product-image-button"
          onClick={() => onQuickView(product)}
          aria-label={`View ${product.name}`}
        >
          <img src={product.image} alt={product.alt} loading="lazy" width="800" height="900" />
          <span className="quick-view-label">
            A closer look <ArrowUpRight size={15} />
          </span>
        </button>
        {product.badge && (
          <span className={`product-badge ${product.badge === 'New arrival' ? 'badge-green' : ''}`}>
            {product.badge}
          </span>
        )}
        <button
          className={`save-object ${saved ? 'is-saved' : ''}`}
          aria-label={`${saved ? 'Unsave' : 'Save'} ${product.name}`}
          aria-pressed={saved}
          onClick={() => onToggleSaved(product.id)}
        >
          <Heart size={17} fill={saved ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="product-meta">
        <span>{product.category}</span>
        <span
          className="color-swatch"
          style={{ backgroundColor: product.color }}
          aria-label={`Natural ${product.material.split(' · ')[0].toLowerCase()} finish`}
          role="img"
        />
      </div>
      <div className="product-title-row">
        <h3>
          <button onClick={() => onQuickView(product)}>{product.name}</button>
        </h3>
        <span>{formatPrice(product.price)}</span>
      </div>
      <div className="product-bottom">
        <p>{product.material}</p>
        <button
          className={`add-button ${quantity ? 'has-item' : ''}`}
          onClick={() => onAdd(product.id)}
          disabled={quantity >= 99}
          aria-label={`Add ${product.name} to bag`}
        >
          {quantity ? <Check size={17} /> : <Plus size={19} />}
        </button>
      </div>
    </article>
  );
}
