'use client';

import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { useMemo, useState, useEffect } from 'react';

export function CartIcon() {
  const { items } = useCart();
  const [mounted, setMounted] = useState(false);
  
  // Ensure component is mounted before showing count (prevents hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Calculate item count directly from items to ensure reactivity
  const itemCount = useMemo(() => {
    if (!mounted) return 0;
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items, mounted]);

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center justify-center rounded-full border border-border-subtle bg-background p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      aria-label={`Shopping cart${itemCount > 0 ? ` with ${itemCount} items` : ''}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
      </svg>
      {mounted && itemCount > 0 && (
        <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-[0.65rem] font-semibold text-slate-50 dark:bg-slate-100 dark:text-slate-900">
          {itemCount > 9 ? '9+' : itemCount}
        </span>
      )}
    </Link>
  );
}
