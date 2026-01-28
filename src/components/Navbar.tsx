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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const toggleMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-baseline gap-1"
          onClick={closeMenu}
        >
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-900 dark:text-slate-50">
            Topnotch
          </span>
          <span className="text-sm font-light uppercase tracking-[0.22em] text-muted-foreground">
            Books
          </span>
        </Link>

        {/* Desktop Navigation + CTA */}
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
            className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-900 px-4 py-2 text-xs font-semibold tracking-wide text-slate-50 shadow-sm transition-colors hover:bg-slate-800 dark:border-slate-100/10 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Shop Books
          </Link>
        </div>

        {/* Mobile: Cart + Menu Button */}
        <div className="flex sm:hidden items-center gap-3">
          <CartIcon />
          <button
            type="button"
            onClick={toggleMenu}
            className="p-2 text-muted-foreground hover:text-foreground"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 sm:hidden"
            onClick={closeMenu}
          />
          
          {/* Menu */}
          <div className="fixed inset-y-0 right-0 z-50 w-64 bg-background border-l border-border-subtle shadow-xl sm:hidden">
            <div className="flex flex-col h-full p-4">
              {/* Close Button */}
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  onClick={closeMenu}
                  className="p-2 text-muted-foreground hover:text-foreground"
                  aria-label="Close menu"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeMenu}
                    className="block px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* CTA */}
              <div className="pt-4 border-t border-border-subtle">
                <Link
                  href="/shop"
                  onClick={closeMenu}
                  className="block w-full text-center rounded-lg bg-slate-900 px-4 py-3 text-sm font-semibold text-slate-50 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 transition-colors"
                >
                  Shop Books
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}


