import { ArrowRight, Minus, Plus, ShoppingBag, Truck, X } from 'lucide-react';
import { productById, formatPrice } from '../data/products';
import { FREE_SHIPPING_THRESHOLD, MAX_QUANTITY } from '../context/cartState';
import { useCart } from '../hooks/useCart';
import Modal from './Modal';

export default function Cart({ onClose, onReview }) {
  const { items, count, subtotal, shipping, total, addItem, decreaseItem, removeItem } = useCart();
  return <Modal titleId="bag-title" className="drawer" onClose={onClose}><div className="drawer-shell">
    <header className="drawer-header"><h2 id="bag-title">Your everyday bag <span>({count})</span></h2><p>A few good things, chosen by you.</p></header>
    {!items.length ? <div className="empty-bag"><ShoppingBag size={46} strokeWidth={1} /><h3>Room for something lovely.</h3><p>Your bag is taking a little breather.<br />Explore the collection and find your everyday.</p><button className="button button-dark" onClick={onClose}>Continue exploring <ArrowRight size={17} /></button></div> : <>
      <div className="shipping-progress"><p><Truck size={16} />{subtotal >= FREE_SHIPPING_THRESHOLD ? 'Your order ships on us.' : 'You’re ' + formatPrice(FREE_SHIPPING_THRESHOLD - subtotal) + ' away from free shipping.'}</p><progress aria-label="Progress toward free shipping" max={FREE_SHIPPING_THRESHOLD} value={Math.min(subtotal, FREE_SHIPPING_THRESHOLD)} /></div>
      <div className="cart-items">{items.map(item => { const product = productById[item.id]; return <article className="cart-item" key={item.id}><img src={product.image} alt={product.alt} /><div><div className="cart-item-top"><h3>{product.name}</h3><button className="remove-item" aria-label={'Remove ' + product.name} onClick={() => removeItem(item.id)}><X size={15} /></button></div><p>{product.category} · {formatPrice(product.price)} each</p><div className="cart-item-controls"><div className="quantity-control"><button aria-label={'Decrease ' + product.name + ' quantity'} onClick={() => decreaseItem(item.id)}><Minus size={13} /></button><output aria-label={product.name + ' quantity'}>{item.quantity}</output><button aria-label={'Increase ' + product.name + ' quantity'} disabled={item.quantity >= MAX_QUANTITY} onClick={() => addItem(item.id)}><Plus size={13} /></button></div><span>{formatPrice(product.price * item.quantity)}</span></div></div></article>; })}</div>
      <div className="cart-summary"><div className="summary-row"><span>Subtotal ({count} {count === 1 ? 'item' : 'items'})</span><span>{formatPrice(subtotal)}</span></div><div className="summary-row shipping-row"><span>Standard shipping</span><span>{shipping === 0 ? 'On us' : formatPrice(shipping)}</span></div><div className="summary-row summary-total" aria-live="polite"><span>Total</span><strong>{formatPrice(total)}</strong></div><button className="button button-dark" onClick={onReview}>Review your bag <ArrowRight size={17} /></button><p className="checkout-note">This is a demo store. No payment or taxes are collected.<br />Decrease an item to zero to remove it.</p></div>
    </>}
  </div></Modal>;
}
