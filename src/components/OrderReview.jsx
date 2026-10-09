import { ArrowRight, Check, Leaf } from 'lucide-react';
import { formatPrice, productById } from '../data/products';
import { useCart } from '../hooks/useCart';
import Modal from './Modal';

export default function OrderReview({ onClose, onBack, onComplete }) {
  const cart = useCart();
  return <Modal titleId="review-title" className="review-modal" onClose={onClose}><div className="review-content"><p className="eyebrow">ONE LAST LOOK / DEMO CHECKOUT</p><h2 id="review-title">Lovely choices.</h2><p>Here’s everything you’ve picked. This practice checkout does not take payment, collect an address, or place a real order.</p><ul className="review-list">{cart.items.map(item => <li key={item.id}><span>{productById[item.id].name} × {item.quantity}</span><span>{formatPrice(productById[item.id].price * item.quantity)}</span></li>)}</ul><div className="summary-row"><span>Subtotal</span><span>{formatPrice(cart.subtotal)}</span></div><div className="summary-row"><span>Shipping</span><span>{cart.shipping ? formatPrice(cart.shipping) : 'Complimentary'}</span></div><div className="summary-row summary-total"><span>Demo total</span><strong>{formatPrice(cart.total)}</strong></div><button className="button button-dark" disabled={!cart.items.length} onClick={() => { const receipt = { count: cart.count, total: cart.total }; cart.clearCart(); onComplete(receipt); }}>Complete demo order <ArrowRight size={17} /></button><button className="text-link" onClick={onBack}>Back to your bag</button></div></Modal>;
}

export function OrderComplete({ receipt, onClose }) {
  return <Modal titleId="complete-title" className="review-modal" onClose={onClose}><div className="review-content"><div className="review-icon"><Check size={25} /></div><p className="eyebrow">DEMO COMPLETE</p><h2 id="complete-title">A little more lovely.</h2><p>You completed a demo order for {receipt.count} {receipt.count === 1 ? 'object' : 'objects'}, totaling {formatPrice(receipt.total)}. Your bag is now empty. No payment was taken and no real order was placed.</p><button className="button button-dark" onClick={onClose}>Keep exploring <Leaf size={17} /></button></div></Modal>;
}
