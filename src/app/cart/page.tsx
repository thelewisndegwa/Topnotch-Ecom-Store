'use client';

import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for client-side mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state during hydration
  if (!mounted) {
    return (
      <section className="section-card">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading cart...</p>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="section-card">
        <div className="text-center py-12">
          <h1 className="section-heading mb-4">Your cart is empty</h1>
          <p className="muted mb-6">
            Add some books to your cart to get started with your KCSE revision.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-900 px-4 py-2 text-xs font-semibold tracking-wide text-slate-50 shadow-sm transition-colors hover:bg-slate-800 dark:border-slate-100/10 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Browse Books
          </Link>
        </div>
      </section>
    );
  }

  const total = getTotalPrice();

  return (
    <section className="section-card">
      <header className="mb-6 space-y-2">
        <h1 className="section-heading">Shopping Cart</h1>
        <p className="muted">
          Review your selected books before checkout.
        </p>
      </header>

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.slug}
            className="flex gap-4 rounded-lg border border-border-subtle bg-white/80 p-4 dark:bg-slate-900/70"
          >
            <div className="relative h-24 w-16 flex-shrink-0 overflow-hidden rounded border border-border-subtle bg-muted">
              <Image
                src={item.coverImagePath}
                alt={item.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <Link
                    href={`/shop/${item.slug}`}
                    className="text-sm font-semibold text-slate-900 hover:underline dark:text-slate-50"
                  >
                    {item.title}
                  </Link>
                  <p className="text-xs text-muted-foreground">
                    {item.subject} · Form {item.form}
                  </p>
                </div>
                <button
                  onClick={() => removeFromCart(item.slug)}
                  className="text-muted-foreground hover:text-foreground"
                  aria-label="Remove from cart"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <label htmlFor={`quantity-${item.slug}`} className="text-xs text-muted-foreground">
                    Qty:
                  </label>
                  <select
                    id={`quantity-${item.slug}`}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.slug, parseInt(e.target.value))}
                    className="rounded border border-border-subtle bg-background px-2 py-1 text-xs"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                      <option key={num} value={num}>
                        {num}
                      </option>
                    ))}
                  </select>
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-50">
                  KES{" "}
                  <span className="tabular-nums">
                    {(item.price * item.quantity).toLocaleString("en-KE", {
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-4 border-t border-border-subtle pt-6">
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-slate-900 dark:text-slate-50">Total</span>
          <span className="text-lg font-semibold text-slate-900 dark:text-slate-50">
            KES{" "}
            <span className="tabular-nums">
              {total.toLocaleString("en-KE", {
                maximumFractionDigits: 0,
              })}
            </span>
          </span>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="/shop"
            className="flex-1 inline-flex items-center justify-center rounded-full border border-border-subtle px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:border-slate-900/40 hover:text-foreground dark:hover:border-slate-100/60"
          >
            Continue Shopping
          </Link>
          <button
            onClick={() => router.push('/checkout')}
            className="flex-1 inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-900 px-4 py-2 text-xs font-semibold tracking-wide text-slate-50 shadow-sm transition-colors hover:bg-slate-800 dark:border-slate-100/10 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}
