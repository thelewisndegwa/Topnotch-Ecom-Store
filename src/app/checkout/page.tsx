'use client';

import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";
import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";

export default function CheckoutPage() {
  const { items, getTotalPrice, clearCart } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'mpesa' as 'mpesa' | 'card' | 'bank',
  });

  // Redirect to cart if empty - must be in useEffect to avoid render-time navigation
  useEffect(() => {
    if (items.length === 0) {
      router.push('/cart');
    }
  }, [items.length, router]);

  // Show nothing while redirecting
  if (items.length === 0) {
    return null;
  }

  const total = getTotalPrice();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create order
      const response = await fetch('/api/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items: items.map((item) => ({
            slug: item.slug,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
          })),
          customer: formData,
          total,
          paymentMethod: formData.paymentMethod,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create order');
      }

      const order = await response.json();

      // Clear cart and redirect to confirmation
      clearCart();
      router.push(`/checkout/confirmation?orderId=${order.data.id}`);
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your order. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-card">
      <header className="mb-6 space-y-2">
        <h1 className="section-heading">Checkout</h1>
        <p className="muted">
          Please provide your details to complete your order.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-[1.5fr,1fr]">
        {/* Customer Information */}
        <div className="space-y-6">
          <section>
            <h2 className="mb-4 text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Contact Information
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-xs font-medium text-muted-foreground">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded border border-border-subtle bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-xs font-medium text-muted-foreground">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full rounded border border-border-subtle bg-background px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-1 block text-xs font-medium text-muted-foreground">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+254 700 000 000"
                  className="w-full rounded border border-border-subtle bg-background px-3 py-2 text-sm"
                />
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Delivery Address
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="address" className="mb-1 block text-xs font-medium text-muted-foreground">
                  Street Address *
                </label>
                <input
                  type="text"
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full rounded border border-border-subtle bg-background px-3 py-2 text-sm"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="city" className="mb-1 block text-xs font-medium text-muted-foreground">
                    City *
                  </label>
                  <input
                    type="text"
                    id="city"
                    required
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full rounded border border-border-subtle bg-background px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="postalCode" className="mb-1 block text-xs font-medium text-muted-foreground">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full rounded border border-border-subtle bg-background px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Payment Method
            </h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 rounded border border-border-subtle bg-background p-3 cursor-pointer hover:bg-muted">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="mpesa"
                  checked={formData.paymentMethod === 'mpesa'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as 'mpesa' })}
                  className="h-4 w-4"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">M-Pesa</p>
                  <p className="text-xs text-muted-foreground">Pay via M-Pesa mobile money</p>
                </div>
              </label>
              <label className="flex items-center gap-3 rounded border border-border-subtle bg-background p-3 cursor-pointer hover:bg-muted">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="card"
                  checked={formData.paymentMethod === 'card'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as 'card' })}
                  className="h-4 w-4"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">Credit/Debit Card</p>
                  <p className="text-xs text-muted-foreground">Pay with Visa or Mastercard</p>
                </div>
              </label>
              <label className="flex items-center gap-3 rounded border border-border-subtle bg-background p-3 cursor-pointer hover:bg-muted">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="bank"
                  checked={formData.paymentMethod === 'bank'}
                  onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value as 'bank' })}
                  className="h-4 w-4"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-900 dark:text-slate-50">Bank Transfer</p>
                  <p className="text-xs text-muted-foreground">Direct bank transfer</p>
                </div>
              </label>
            </div>
          </section>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="rounded-lg border border-border-subtle bg-white/80 p-4 dark:bg-slate-900/70">
            <h2 className="mb-4 text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
              Order Summary
            </h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.slug} className="flex gap-3">
                  <div className="relative h-16 w-12 flex-shrink-0 overflow-hidden rounded border border-border-subtle bg-muted">
                    <Image
                      src={item.coverImagePath}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="48px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-900 dark:text-slate-50 line-clamp-2">
                      {item.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Qty: {item.quantity} × KES {item.price.toLocaleString("en-KE")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 border-t border-border-subtle pt-4">
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
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-900 px-4 py-3 text-sm font-semibold tracking-wide text-slate-50 shadow-sm transition-colors hover:bg-slate-800 dark:border-slate-100/10 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </form>
    </section>
  );
}
