'use client';

import { useCart } from '@/contexts/CartContext';
import { Book } from '@/data/books';
import { useState } from 'react';

type AddToCartButtonProps = {
  book: Book;
  variant?: 'default' | 'full-width';
};

export function AddToCartButton({ book, variant = 'default' }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(book);
    setTimeout(() => setIsAdding(false), 500);
  };

  const baseClasses = "inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-900 px-4 py-2 text-xs font-semibold tracking-wide text-slate-50 shadow-sm transition-all hover:bg-slate-800 dark:border-slate-100/10 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed";
  const widthClass = variant === 'full-width' ? 'w-full' : '';

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      disabled={isAdding}
      className={`${baseClasses} ${widthClass}`}
    >
      {isAdding ? 'Added!' : 'Add to Cart'}
    </button>
  );
}
