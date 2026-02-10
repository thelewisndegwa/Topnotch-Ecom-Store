/**
 * Cart store: in-memory + cookie. No React state for cart data.
 * Use useSyncExternalStore in components so add-to-cart works reliably (e.g. on Vercel).
 */

import { Book, books } from '@/data/books';

const CART_COOKIE = 'topnotch-cart';
const COOKIE_DAYS = 30;

export interface CartItem extends Book {
  quantity: number;
}

type Listener = () => void;

let cart: CartItem[] = [];
const listeners = new Set<Listener>();

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string) {
  if (typeof document === 'undefined') return;
  try {
    const maxAge = COOKIE_DAYS * 24 * 60 * 60;
    document.cookie = `${name}=${encodeURIComponent(value)};path=/;max-age=${maxAge};SameSite=Lax`;
  } catch {
    // Cookie may fail in some environments; in-memory cart still works
  }
}

function getBookBySlug(slug: string): Book | undefined {
  return books.find((b) => b.slug === slug);
}

function loadFromCookie(): CartItem[] {
  const raw = getCookie(CART_COOKIE);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as { s: string; q: number }[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .map(({ s, q }) => {
        const book = getBookBySlug(s);
        if (!book || q < 1) return null;
        return { ...book, quantity: q };
      })
      .filter((x): x is CartItem => x !== null);
  } catch {
    return [];
  }
}

function persist() {
  try {
    const compact = cart.map(({ slug, quantity }) => ({ s: slug, q: quantity }));
    setCookie(CART_COOKIE, JSON.stringify(compact));
  } catch {
    // Keep in-memory cart working even if cookie fails
  }
}

function notify() {
  listeners.forEach((l) => l());
}

export function getCartSnapshot(): CartItem[] {
  return cart;
}

/** Call once on client mount to load cart from cookie. */
export function initCartFromCookie() {
  if (typeof document === 'undefined') return;
  cart = loadFromCookie();
  notify();
}

export function getCartServerSnapshot(): CartItem[] {
  return [];
}

export function subscribeCart(listener: Listener): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function addToCartStore(book: Book) {
  if (!book?.slug) return;
  const existing = cart.find((i) => i.slug === book.slug);
  if (existing) {
    cart = cart.map((i) =>
      i.slug === book.slug ? { ...i, quantity: i.quantity + 1 } : i
    );
  } else {
    cart = [...cart, { ...book, quantity: 1 }];
  }
  persist();
  notify();
}

export function removeFromCartStore(slug: string) {
  cart = cart.filter((i) => i.slug !== slug);
  persist();
  notify();
}

export function updateQuantityStore(slug: string, quantity: number) {
  if (quantity <= 0) {
    removeFromCartStore(slug);
    return;
  }
  cart = cart.map((i) => (i.slug === slug ? { ...i, quantity } : i));
  persist();
  notify();
}

export function clearCartStore() {
  cart = [];
  persist();
  notify();
}

export function getTotalPriceStore(): number {
  return cart.reduce((sum, i) => sum + i.price * i.quantity, 0);
}

export function getTotalItemsStore(): number {
  return cart.reduce((sum, i) => sum + i.quantity, 0);
}
