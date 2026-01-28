'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
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

  // Load cart from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedCart = localStorage.getItem('topnotch-cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes (but only after mount)
  useEffect(() => {
    if (!mounted) return;
    
    try {
      localStorage.setItem('topnotch-cart', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [items, mounted]);

  const addToCart = (book: Book) => {
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
  };

  const removeFromCart = (slug: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.slug !== slug));
  };

  const updateQuantity = (slug: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(slug);
      return;
    }
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.slug === slug ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
      }}
    >
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
