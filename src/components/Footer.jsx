import { ArrowUpRight, Leaf, PackageCheck, Truck, MoveUpRight } from 'lucide-react';

export function Benefits() {
  return <div className="benefits"><div><Truck size={23} strokeWidth={1.4} /><span>Delivered with care <small>Free shipping on orders $150+</small></span></div><div><Leaf size={23} strokeWidth={1.4} /><span>Considered by design <small>Natural textures. Timeless shapes.</small></span></div><div><PackageCheck size={23} strokeWidth={1.4} /><span>Room to decide <small>A simple 30-day return policy</small></span></div></div>;
}

export default function Footer({ onInfo }) {
  return <>
    <section className="story section-wrap" id="our-story"><div className="story-mark" aria-hidden="true">f<span>&</span>f<div className="orbit orbit-one" /><div className="orbit orbit-two" /></div><div className="story-copy"><p className="eyebrow">FEWER THINGS. MORE MEANING.</p><h2>A little intention.<br />A lot of <em>feeling.</em></h2><p>We believe the best spaces aren’t filled overnight. They’re collected over time, with objects that feel right. Form & Field is our ode to those pieces: useful, beautiful, and quietly distinctive.</p><a className="story-link" href="#collection">Make yourself at home <ArrowUpRight size={18} /></a></div></section>
    <footer className="footer"><div className="footer-top"><div><a className="wordmark footer-wordmark" href="#">form<span>&</span>field<span className="brand-dot">®</span></a><p>Objects for a considered life.</p></div><div className="footer-links"><a href="#collection">The collection <MoveUpRight size={13} /></a><a href="#our-story">Our approach <MoveUpRight size={13} /></a><button onClick={() => onInfo('shipping')}>Shipping & returns <MoveUpRight size={13} /></button><button onClick={() => onInfo('about')}>About this store <MoveUpRight size={13} /></button></div></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Form & Field</span><span>Thoughtfully put together.</span><span>USD $ <span className="footer-divider">/</span> EN</span></div></footer>
  </>;
}
