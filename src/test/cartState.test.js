import { describe, expect, it } from 'vitest';
import { calculateSummary, normalizeCart, normalizeSaved, updateCart } from '../context/cartState';

describe('cart storage boundary', () => {
  it('ignores non-array storage and malformed entries', () => {
    expect(normalizeCart({ id: 'studio-lamp', quantity: 1 })).toEqual([]);
    expect(
      normalizeCart([
        null,
        {},
        { id: 'missing', quantity: 2 },
        { id: '__proto__', quantity: 1 },
        { id: 'studio-lamp', quantity: '2' },
        { id: 'studio-lamp', quantity: -1 },
        { id: 'studio-lamp', quantity: 1.5 },
      ]),
    ).toEqual([]);
  });
  it('merges duplicates, caps quantities, and discards stored prices', () => {
    expect(
      normalizeCart([
        { id: 'studio-lamp', quantity: 60, price: 1 },
        { id: 'studio-lamp', quantity: 50 },
      ]),
    ).toEqual([{ id: 'studio-lamp', quantity: 99 }]);
  });
  it('keeps only unique known saved products', () => {
    expect(normalizeSaved(['studio-lamp', 'studio-lamp', 'unknown', '__proto__'])).toEqual([
      'studio-lamp',
    ]);
    expect(normalizeSaved(null)).toEqual([]);
  });
});

describe('cart operations', () => {
  it('adds distinct products and combines repeat additions', () => {
    let cart = updateCart([], { type: 'add', id: 'studio-lamp' });
    cart = updateCart(cart, { type: 'add', id: 'studio-lamp' });
    cart = updateCart(cart, { type: 'add', id: 'still-plates' });
    expect(cart).toEqual([
      { id: 'studio-lamp', quantity: 2 },
      { id: 'still-plates', quantity: 1 },
    ]);
  });
  it('never exceeds the quantity limit', () => {
    expect(
      updateCart([{ id: 'studio-lamp', quantity: 99 }], { type: 'add', id: 'studio-lamp' })[0]
        .quantity,
    ).toBe(99);
  });
  it('decreases quantities and removes a line at zero', () => {
    let cart = [{ id: 'studio-lamp', quantity: 2 }];
    cart = updateCart(cart, { type: 'decrease', id: 'studio-lamp' });
    expect(cart[0].quantity).toBe(1);
    expect(updateCart(cart, { type: 'decrease', id: 'studio-lamp' })).toEqual([]);
  });
  it('removes only the requested product', () => {
    expect(
      updateCart(
        [
          { id: 'studio-lamp', quantity: 2 },
          { id: 'still-plates', quantity: 1 },
        ],
        { type: 'remove', id: 'studio-lamp' },
      ),
    ).toEqual([{ id: 'still-plates', quantity: 1 }]);
  });
  it('ignores unknown actions and products without mutating previous state', () => {
    const cart = [{ id: 'studio-lamp', quantity: 1 }];
    expect(updateCart(cart, { type: 'add', id: '__proto__' })).toBe(cart);
    expect(updateCart(cart, { type: 'unknown', id: 'studio-lamp' })).toBe(cart);
    updateCart(cart, { type: 'add', id: 'studio-lamp' });
    expect(cart[0].quantity).toBe(1);
  });
  it('clears a completed bag', () => {
    expect(updateCart([{ id: 'studio-lamp', quantity: 1 }], { type: 'clear' })).toEqual([]);
  });
});

describe('money and shipping', () => {
  it('charges nothing for an empty bag', () => {
    expect(calculateSummary([])).toEqual({ count: 0, subtotal: 0, shipping: 0, total: 0 });
  });
  it('calculates quantities and prices with integer cents', () => {
    expect(
      calculateSummary([
        { id: 'studio-lamp', quantity: 1 },
        { id: 'still-plates', quantity: 1 },
      ]),
    ).toEqual({ count: 2, subtotal: 11400, shipping: 895, total: 12295 });
  });
  it('waives shipping at exactly the threshold', () => {
    expect(
      calculateSummary([
        { id: 'studio-lamp', quantity: 1 },
        { id: 'still-plates', quantity: 2 },
      ]),
    ).toEqual({ count: 3, subtotal: 15000, shipping: 0, total: 15000 });
  });
  it('waives shipping above the threshold', () => {
    expect(calculateSummary([{ id: 'arc-chair', quantity: 2 }]).total).toBe(37800);
  });
});
