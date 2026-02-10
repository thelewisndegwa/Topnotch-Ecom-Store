'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { CartIcon } from "@/components/CartIcon";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/videos", label: "Videos" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-baseline gap-1 shrink-0"
          onClick={close}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-900">
            Topnotch
          </span>
          <span className="text-sm font-light uppercase tracking-[0.22em] text-muted-foreground">
            Books
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden sm:flex flex-1 items-center justify-end gap-4">
          <nav className="flex items-center gap-5 text-xs font-medium text-muted-foreground">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <CartIcon />
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-900 px-4 py-2 text-xs font-semibold tracking-wide text-slate-50 shadow-sm transition-colors hover:bg-slate-800"
          >
            Shop Books
          </Link>
        </div>

        {/* Mobile: cart + hamburger */}
        <div className="flex sm:hidden items-center gap-2">
          <CartIcon />
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center -m-2 text-muted-foreground hover:text-foreground"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile overlay + menu */}
      {open && (
        <div className="fixed inset-0 z-[100] sm:hidden" aria-hidden="false">
          {/* Backdrop: tap to close */}
          <button
            type="button"
            className="absolute inset-0 bg-black/50 w-full h-full cursor-default"
            onClick={close}
            aria-label="Close menu"
          />
          {/* Panel */}
          <div
            className="absolute top-0 right-0 bottom-0 w-[min(100vw,280px)] bg-background border-l border-border-subtle shadow-xl flex flex-col"
            role="dialog"
            aria-label="Main menu"
          >
            <div className="flex justify-end p-3">
              <button
                type="button"
                onClick={close}
                className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted"
                aria-label="Close menu"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 px-4 pb-4 overflow-y-auto">
              <ul className="space-y-1">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={close}
                      className="flex items-center min-h-[48px] px-4 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="p-4 border-t border-border-subtle">
              <Link
                href="/shop"
                onClick={close}
                className="flex items-center justify-center min-h-[48px] w-full rounded-lg bg-slate-900 px-4 text-sm font-semibold text-slate-50 hover:bg-slate-800"
              >
                Shop Books
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
