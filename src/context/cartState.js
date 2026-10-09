import { productById } from '../data/products';

export const CART_STORAGE_KEY = 'form-field:cart:v1';
export const MAX_QUANTITY = 99;
export const FREE_SHIPPING_THRESHOLD = 15000;
export const SHIPPING_COST = 895;

const knownProduct = id => typeof id === 'string' && Object.hasOwn(productById, id);

// Persist only catalog identifiers and quantities. Never trust a price from storage.
export function normalizeCart(value) {
  if (!Array.isArray(value)) return [];
  const quantities = new Map();
  for (const item of value) {
    if (!item || !knownProduct(item.id) || !Number.isSafeInteger(item.quantity) || item.quantity < 1) continue;
    quantities.set(item.id, Math.min(MAX_QUANTITY, (quantities.get(item.id) || 0) + item.quantity));
  }
  return Array.from(quantities, ([id, quantity]) => ({ id, quantity }));
}

export function updateCart(items, action) {
  if (action.type === 'clear') return [];
  if (!knownProduct(action.id)) return items;
  const existing = items.find(item => item.id === action.id);
  switch (action.type) {
    case 'add':
      if (!existing) return [...items, { id: action.id, quantity: 1 }];
      return items.map(item => item.id === action.id ? { ...item, quantity: Math.min(MAX_QUANTITY, item.quantity + 1) } : item);
    case 'decrease':
      return items.map(item => item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item).filter(item => item.quantity > 0);
    case 'remove':
      return items.filter(item => item.id !== action.id);
    default:
      return items;
  }
}

export function calculateSummary(items) {
  const count = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + productById[item.id].price * item.quantity, 0);
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  return { count, subtotal, shipping, total: subtotal + shipping };
}

export function normalizeSaved(value) {
  return Array.isArray(value) ? [...new Set(value.filter(knownProduct))] : [];
}
