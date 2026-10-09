import { beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { CartProvider } from '../context/CartContext';
import { CART_STORAGE_KEY } from '../context/cartState';

const renderShop = () =>
  render(
    <CartProvider>
      <App />
    </CartProvider>,
  );
beforeEach(() => localStorage.clear());

describe('shopping workflows', () => {
  it('filters, searches, sorts, and recovers from an empty search', async () => {
    const user = userEvent.setup();
    renderShop();
    expect(screen.getAllByRole('article')).toHaveLength(8);
    await user.click(screen.getByRole('button', { name: 'Lighting', exact: true }));
    expect(screen.getAllByRole('article')).toHaveLength(2);
    await user.selectOptions(screen.getByRole('combobox', { name: 'Sort products' }), 'price-desc');
    expect(within(screen.getAllByRole('article')[0]).getByRole('heading')).toHaveTextContent(
      'Halo Pendant Light',
    );
    await user.type(screen.getByRole('searchbox', { name: 'Search products' }), 'nonsense');
    expect(screen.getByText('Nothing here just yet.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Explore all objects' }));
    expect(screen.getAllByRole('article')).toHaveLength(8);
  });

  it('updates real totals and persists the bag across a remount', async () => {
    const user = userEvent.setup();
    const view = renderShop();
    await user.click(screen.getByRole('button', { name: 'Add Studio Table Lamp to bag' }));
    await user.click(screen.getByRole('button', { name: 'Open shopping bag, 1 items' }));
    let dialog = within(screen.getByRole('dialog'));
    expect(dialog.getByText('$86.95')).toBeInTheDocument();
    await user.click(dialog.getByRole('button', { name: 'Increase Studio Table Lamp quantity' }));
    expect(dialog.getByText('$156.00', { selector: 'strong' })).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY))).toEqual([
      { id: 'studio-lamp', quantity: 2 },
    ]);
    view.unmount();
    renderShop();
    await user.click(screen.getByRole('button', { name: 'Open shopping bag, 2 items' }));
    dialog = within(screen.getByRole('dialog'));
    expect(dialog.getByRole('status', { name: 'Studio Table Lamp quantity' })).toHaveTextContent(
      '2',
    );
    await user.click(dialog.getByRole('button', { name: 'Decrease Studio Table Lamp quantity' }));
    expect(dialog.getByText('$86.95')).toBeInTheDocument();
    await user.click(dialog.getByRole('button', { name: 'Remove Studio Table Lamp' }));
    expect(dialog.getByText('Room for something lovely.')).toBeInTheDocument();
  });

  it('opens product details and completes a clearly marked demo order', async () => {
    const user = userEvent.setup();
    renderShop();
    await user.click(screen.getByRole('button', { name: 'View Still Ceramic Plates' }));
    let dialog = within(screen.getByRole('dialog'));
    expect(dialog.getByText('Ø 24 cm · Set of four')).toBeInTheDocument();
    await user.click(dialog.getByRole('button', { name: 'Add to bag', exact: true }));
    await user.click(
      within(screen.getByRole('dialog')).getByRole('button', { name: 'Review your bag' }),
    );
    dialog = within(screen.getByRole('dialog'));
    expect(dialog.getByText('$44.95')).toBeInTheDocument();
    await user.click(dialog.getByRole('button', { name: 'Complete demo order' }));
    expect(
      within(screen.getByRole('dialog')).getByText(/No payment was taken/),
    ).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem(CART_STORAGE_KEY))).toEqual([]);
  });

  it('saves favorites and restores them after remounting', async () => {
    const user = userEvent.setup();
    const view = renderShop();
    await user.click(screen.getByRole('button', { name: 'Save Studio Table Lamp' }));
    view.unmount();
    renderShop();
    await user.click(screen.getByRole('button', { name: 'View saved objects (1)' }));
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Unsave Studio Table Lamp' })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    await user.click(screen.getByRole('button', { name: 'Unsave Studio Table Lamp' }));
    expect(screen.getByText('A place for your favorites.')).toBeInTheDocument();
  });

  it('recovers from corrupt browser storage', () => {
    localStorage.setItem(CART_STORAGE_KEY, '{invalid');
    localStorage.setItem('form-field:saved:v1', '{"bad":"shape"}');
    renderShop();
    expect(screen.getByRole('button', { name: 'Open shopping bag, 0 items' })).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(8);
  });

  it('stays functional when storage access is denied', async () => {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Denied');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Denied');
    });
    const user = userEvent.setup();
    renderShop();
    await user.click(screen.getByRole('button', { name: 'Add Studio Table Lamp to bag' }));
    expect(screen.getByRole('button', { name: 'Open shopping bag, 1 items' })).toBeInTheDocument();
  });

  it('exposes shipping and demo-store information without dead links', async () => {
    const user = userEvent.setup();
    renderShop();
    await user.click(screen.getByRole('button', { name: 'Shipping & returns' }));
    expect(
      within(screen.getByRole('dialog')).getByText(/Standard shipping is/),
    ).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Close dialog' }));
    await user.click(screen.getByRole('button', { name: 'About this store' }));
    expect(
      within(screen.getByRole('dialog')).getByText(/No accounts, analytics, or payments/),
    ).toBeInTheDocument();
  });
});
