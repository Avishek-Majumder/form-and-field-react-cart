import { createContext } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import { CART_STORAGE_KEY, normalizeCart, updateCart, calculateSummary } from './cartState';

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = usePersistentState(CART_STORAGE_KEY, [], normalizeCart);
  const dispatch = action => setItems(current => updateCart(current, action));
  const value = {
    items,
    ...calculateSummary(items),
    addItem: id => dispatch({ type: 'add', id }),
    decreaseItem: id => dispatch({ type: 'decrease', id }),
    removeItem: id => dispatch({ type: 'remove', id }),
    clearCart: () => dispatch({ type: 'clear' }),
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
