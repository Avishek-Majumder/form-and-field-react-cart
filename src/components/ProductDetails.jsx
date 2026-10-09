import { ShoppingBag, Check } from 'lucide-react';
import { formatPrice } from '../data/products';
import { useCart } from '../hooks/useCart';
import { MAX_QUANTITY } from '../context/cartState';
import Modal from './Modal';

export default function ProductDetails({ product, onClose, onAdd }) {
  const { items } = useCart();
  const quantity = items.find(item => item.id === product.id)?.quantity || 0;
  return <Modal titleId="product-detail-title" onClose={onClose}><div className="detail-layout">
    <img className="detail-image" src={product.image} alt={product.alt} />
    <div className="detail-copy"><p className="eyebrow">{product.category.toUpperCase()} / THE CONSIDERED COLLECTION</p><h2 id="product-detail-title">{product.name}</h2><p className="detail-price">{formatPrice(product.price)}</p><p className="detail-description">{product.description}</p>
      <dl className="detail-specs"><div><dt>Details</dt><dd>{product.material}</dd></div><div><dt>Dimensions</dt><dd>{product.dimensions}</dd></div><div><dt>Availability</dt><dd><Check size={12} /> In stock</dd></div></dl>
      <button className="button button-dark" disabled={quantity >= MAX_QUANTITY} onClick={() => onAdd(product.id)}>{quantity >= MAX_QUANTITY ? 'Bag limit reached' : 'Add to bag'}<ShoppingBag size={17} /></button>
      <details className="care-details"><summary>A little care goes a long way</summary><p>{product.care}</p></details><p className="checkout-note">Curated demo product. Prices shown in USD.</p>
    </div>
  </div></Modal>;
}
