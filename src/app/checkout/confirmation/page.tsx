'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';

function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <section className="section-card">
      <div className="text-center py-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-green-600 dark:text-green-400"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>

        <h1 className="section-heading mb-4">Order Confirmed!</h1>
        <p className="muted mb-2">
          Thank you for your order. We've received your order and will process it shortly.
        </p>
        {orderId && (
          <p className="text-xs text-muted-foreground mb-6">
            Order ID: <span className="font-mono font-semibold">{orderId}</span>
          </p>
        )}

        <div className="mx-auto max-w-md space-y-4 rounded-lg border border-border-subtle bg-white/80 p-6 text-left dark:bg-slate-900/70">
          <div>
            <h2 className="mb-3 text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              What's Next?
            </h2>
            <ul className="space-y-2 text-xs leading-relaxed text-muted-foreground">
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-600 dark:text-green-400">✓</span>
                <span>You'll receive an email confirmation shortly with your order details.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-600 dark:text-green-400">✓</span>
                <span>We'll contact you to confirm payment and arrange delivery.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-0.5 text-green-600 dark:text-green-400">✓</span>
                <span>Your books will be prepared and shipped to your address.</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border border-border-subtle px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:border-slate-900/40 hover:text-foreground dark:hover:border-slate-100/60"
          >
            Continue Shopping
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-900 px-4 py-2 text-xs font-semibold tracking-wide text-slate-50 shadow-sm transition-colors hover:bg-slate-800 dark:border-slate-100/10 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={
      <section className="section-card">
        <div className="text-center py-12">
          <p className="muted">Loading...</p>
        </div>
      </section>
    }>
      <OrderConfirmationContent />
    </Suspense>
  );
}
