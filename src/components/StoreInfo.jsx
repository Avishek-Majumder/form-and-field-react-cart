import Modal from './Modal';

export default function StoreInfo({ type, onClose }) {
  const shipping = type === 'shipping';
  return (
    <Modal titleId="info-title" className="info-modal" onClose={onClose}>
      <div className="info-content">
        <p className="eyebrow">FORM & FIELD / GOOD TO KNOW</p>
        <h2 id="info-title">
          {shipping ? 'Delivered with care.' : 'A considered little project.'}
        </h2>
        {shipping ? (
          <>
            <p>
              These are the example policies used by our demo storefront. No physical products are
              sold or shipped.
            </p>
            <h3>Shipping</h3>
            <p>
              Standard shipping is $8.95 for bags below $150, and complimentary from $150. The bag
              calculates this automatically.
            </p>
            <h3>Returns</h3>
            <p>
              Our fictional store offers a 30-day return window for unused objects in their original
              packaging. There is no live returns service.
            </p>
          </>
        ) : (
          <>
            <p>
              Form & Field is a fictional homewares brand and a fully interactive React shopping
              cart project. The catalog, prices, stock, dimensions, and policies are illustrative.
            </p>
            <h3>Make yourself at home</h3>
            <p>
              Explore eight objects, filter and sort the collection, save favorites, and build your
              bag. Your saved objects and bag stay in this browser between visits.
            </p>
            <h3>Your privacy</h3>
            <p>
              No accounts, analytics, or payments. Only your product selections are stored locally
              on this device. Photography from Unsplash; fonts are bundled locally.
            </p>
          </>
        )}
      </div>
    </Modal>
  );
}
