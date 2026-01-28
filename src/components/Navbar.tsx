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
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before showing menu (prevents hydration issues)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    try {
      if (isMobileMenuOpen && mounted) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    } catch (error) {
      // Silently handle any errors with body style manipulation
      console.error('Error managing body scroll:', error);
    }
    
    // Cleanup on unmount
    return () => {
      try {
        if (typeof window !== 'undefined') {
          document.body.style.overflow = '';
        }
      } catch (error) {
        // Silently handle cleanup errors
      }
    };
  }, [isMobileMenuOpen, mounted]);

  const toggleMobileMenu = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link 
          href="/" 
          className="flex items-baseline gap-1" 
          onClick={(e) => {
            // Close mobile menu if open, but don't prevent navigation
            if (isMobileMenuOpen) {
              setIsMobileMenuOpen(false);
            }
          }}
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
            onClick={toggleMobileMenu}
            className="inline-flex items-center justify-center rounded-full border border-border-subtle bg-background p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:bg-muted"
            style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mounted && isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[35] sm:hidden"
            onClick={(e) => {
              e.stopPropagation();
              closeMobileMenu(e);
            }}
            onMouseDown={(e) => {
              // Prevent text selection when clicking backdrop
              e.preventDefault();
            }}
            role="button"
            tabIndex={-1}
            aria-label="Close menu"
            style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent', cursor: 'pointer' }}
          />
          
          {/* Menu Drawer */}
          <div className="fixed inset-y-0 right-0 z-[45] w-full max-w-xs bg-background border-l border-border-subtle shadow-lg sm:hidden transform transition-transform duration-200 ease-in-out">
            <div className="flex flex-col h-full">
              {/* Menu Header */}
              <div className="flex items-center justify-between p-4 border-b border-border-subtle">
                <span className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-900 dark:text-slate-50">
                  Menu
                </span>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="inline-flex items-center justify-center rounded-full p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:bg-muted"
                  style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                  aria-label="Close menu"
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
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="flex-1 overflow-y-auto p-4">
                <div className="space-y-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMobileMenu}
                      className="block rounded-lg px-4 py-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:bg-muted"
                      style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </nav>

              {/* Mobile CTA */}
              <div className="p-4 border-t border-border-subtle">
                <Link
                  href="/shop"
                  onClick={closeMobileMenu}
                  className="block w-full text-center rounded-full border border-slate-900/10 bg-slate-900 px-4 py-2.5 text-xs font-semibold tracking-wide text-slate-50 shadow-sm transition-colors hover:bg-slate-800 active:bg-slate-700 dark:border-slate-100/10 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200 dark:active:bg-slate-300"
                  style={{ touchAction: 'manipulation', WebkitTapHighlightColor: 'transparent' }}
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


