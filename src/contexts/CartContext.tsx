'use client';

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useSyncExternalStore,
  type ReactNode,
} from 'react';
import type { Book } from '@/data/books';
import {
  type CartItem,
  getCartSnapshot,
  getCartServerSnapshot,
  subscribeCart,
  initCartFromCookie,
  addToCartStore,
  removeFromCartStore,
  updateQuantityStore,
  clearCartStore,
  getTotalPriceStore,
  getTotalItemsStore,
} from '@/lib/cart-store';

export type { CartItem };

interface CartContextType {
  items: CartItem[];
  addToCart: (book: Book) => void;
  removeFromCart: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  useEffect(() => {
    initCartFromCookie();
  }, []);

  const items = useSyncExternalStore(
    subscribeCart,
    getCartSnapshot,
    getCartServerSnapshot
  );

  const addToCart = useCallback((book: Book) => {
    addToCartStore(book);
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    removeFromCartStore(slug);
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    updateQuantityStore(slug, quantity);
  }, []);

  const clearCart = useCallback(() => {
    clearCartStore();
  }, []);

  const getTotalPrice = useCallback(() => getTotalPriceStore(), []);
  const getTotalItems = useCallback(() => getTotalItemsStore(), []);

  const value: CartContextType = {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const ctx = useContext(CartContext);
  if (ctx === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return ctx;
}
