'use client';

import { Book } from '@/data/books';
import { addToCartStore } from '@/lib/cart-store';
import { useState } from 'react';

type AddToCartButtonProps = {
  book: Book;
  variant?: 'default' | 'full-width';
};

export function AddToCartButton({ book, variant = 'default' }: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isAdding) return;
    setIsAdding(true);
    addToCartStore(book);
    setTimeout(() => setIsAdding(false), 400);
  };

  const baseClasses = "inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-900 px-4 py-2 text-xs font-semibold tracking-wide text-slate-50 shadow-sm transition-all hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer touch-manipulation min-h-[44px]";
  const widthClass = variant === 'full-width' ? 'w-full' : '';

  return (
    <button
      type="button"
      onClick={handleAddToCart}
      onPointerDown={(e) => e.stopPropagation()}
      disabled={isAdding}
      className={`${baseClasses} ${widthClass}`}
    >
      {isAdding ? 'Added!' : 'Add to Cart'}
    </button>
  );
}
