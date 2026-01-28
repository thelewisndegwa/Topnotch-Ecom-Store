'use client';

import { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react';
import { Book } from '@/data/books';

export interface CartItem extends Book {
  quantity: number;
}

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
  const [items, setItems] = useState<CartItem[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load cart from localStorage on mount (only once)
  useEffect(() => {
    setMounted(true);
    try {
      const savedCart = localStorage.getItem('topnotch-cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        // Only set if we got valid data
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (error) {
      console.error('Error loading cart from localStorage:', error);
      // Clear invalid data
      try {
        localStorage.removeItem('topnotch-cart');
      } catch {
        // Ignore cleanup errors
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes (but only after mount)
  useEffect(() => {
    if (!mounted) return;
    
    try {
      const currentCart = localStorage.getItem('topnotch-cart');
      const newCart = JSON.stringify(items);
      
      // Only save if data actually changed (prevents unnecessary writes)
      if (currentCart !== newCart) {
        localStorage.setItem('topnotch-cart', newCart);
      }
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items, mounted]);

  const addToCart = useCallback((book: Book) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.slug === book.slug);
      if (existingItem) {
        return prevItems.map((item) =>
          item.slug === book.slug
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...book, quantity: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((slug: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.slug !== slug));
  }, []);

  const updateQuantity = useCallback((slug: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prevItems) => prevItems.filter((item) => item.slug !== slug));
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.slug === slug ? { ...item, quantity } : item
      )
    );
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getTotalPrice = useCallback(() => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [items]);

  const getTotalItems = useCallback(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems,
    }),
    [items, addToCart, removeFromCart, updateQuantity, clearCart, getTotalPrice, getTotalItems]
  );

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
