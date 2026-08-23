import { createContext, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { FREE_SHIPPING_THRESHOLD } from '../data/products';

const STORAGE_KEY = 'miunita-cart';
const MAX_QTY = 99;

const CartContext = createContext(null);

/*
  Lines are stored as { id, slug, name, price, tint, art, qty }. We keep a
  snapshot of the display fields rather than just an id so a cart restored from
  localStorage still renders even if the catalogue changed underneath it.

  The reducer is pure: totals are derived below, never stored.
*/
function reducer(lines, action) {
  switch (action.type) {
    case 'add': {
      const { product, qty = 1 } = action;
      const existing = lines.find((l) => l.id === product.id);
      if (existing) {
        return lines.map((l) =>
          l.id === product.id ? { ...l, qty: Math.min(l.qty + qty, MAX_QTY) } : l,
        );
      }
      const { id, slug, name, price, tint, art } = product;
      return [...lines, { id, slug, name, price, tint, art, qty: Math.min(qty, MAX_QTY) }];
    }

    case 'setQty': {
      // Dropping to zero removes the line, which is what the stepper's minus
      // button does at qty 1.
      if (action.qty < 1) return lines.filter((l) => l.id !== action.id);
      return lines.map((l) =>
        l.id === action.id ? { ...l, qty: Math.min(action.qty, MAX_QTY) } : l,
      );
    }

    case 'remove':
      return lines.filter((l) => l.id !== action.id);

    case 'clear':
      return [];

    default:
      return lines;
  }
}

function readStoredCart() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Guard against hand-edited or half-written storage.
    return parsed.filter(
      (l) => l && typeof l.id === 'number' && typeof l.price === 'number' && l.qty > 0,
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [lines, dispatch] = useReducer(reducer, undefined, readStoredCart);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Private browsing or a full quota. The cart still works for this
      // session, it just will not survive a reload.
    }
  }, [lines]);

  const value = useMemo(() => {
    const count = lines.reduce((sum, l) => sum + l.qty, 0);
    const subtotal = lines.reduce((sum, l) => sum + l.price * l.qty, 0);

    return {
      lines,
      count,
      subtotal,
      remainingForFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal),
      qualifiesForFreeShipping: subtotal >= FREE_SHIPPING_THRESHOLD,
      isOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      addItem: (product, qty = 1) => {
        dispatch({ type: 'add', product, qty });
        setIsOpen(true);
      },
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      removeItem: (id) => dispatch({ type: 'remove', id }),
      clearCart: () => dispatch({ type: 'clear' }),
    };
  }, [lines, isOpen]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside a CartProvider');
  return context;
}
