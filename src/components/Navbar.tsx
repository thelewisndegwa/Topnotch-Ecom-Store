'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";
import { CartIcon } from "@/components/CartIcon";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/videos", label: "Videos" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

const MENU_ID = "nav-menu-toggle";

export function Navbar() {
  const pathname = usePathname();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) inputRef.current.checked = false;
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background">
      {/* Top bar */}
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-baseline gap-1 text-sm font-semibold uppercase tracking-[0.22em] text-slate-900"
        >
          Topnotch
          <span className="font-light text-muted-foreground"> Books</span>
        </Link>

        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-end sm:gap-4">
          <nav className="flex items-center gap-5 text-xs font-medium text-muted-foreground">
            {NAV_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-foreground">
                {l.label}
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

        <div className="flex items-center gap-2 sm:hidden">
          <CartIcon />
          <label
            htmlFor={MENU_ID}
            className="flex h-11 w-11 flex-shrink-0 cursor-pointer items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label="Open menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </label>
        </div>
      </div>

      {/* Mobile menu layer: fixed box so overlay/drawer are siblings of checkbox for peer-checked */}
      <div className="fixed inset-0 z-[100] pointer-events-none sm:pointer-events-none sm:hidden" aria-hidden>
        <input
          ref={inputRef}
          type="checkbox"
          id={MENU_ID}
          className="peer sr-only"
        />
        <label
          htmlFor={MENU_ID}
          className="fixed inset-0 bg-black/50 opacity-0 transition-opacity duration-200 pointer-events-none peer-checked:opacity-100 peer-checked:pointer-events-auto sm:hidden"
          aria-label="Close menu"
        />
        <aside
          className="pointer-events-auto fixed inset-y-0 right-0 z-[101] flex w-[min(100vw,280px)] flex-col border-l border-border-subtle bg-background shadow-xl transition-transform duration-200 translate-x-full peer-checked:translate-x-0 sm:hidden"
          aria-label="Menu"
        >
          <div className="flex justify-end p-3">
            <label
              htmlFor={MENU_ID}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
              aria-label="Close menu"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </label>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 pb-4">
            <ul className="space-y-1">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="flex min-h-[48px] items-center rounded-lg px-4 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="border-t border-border-subtle p-4">
            <Link
              href="/shop"
              className="flex min-h-[48px] w-full items-center justify-center rounded-lg bg-slate-900 px-4 text-sm font-semibold text-slate-50 hover:bg-slate-800"
            >
              Shop Books
            </Link>
          </div>
        </aside>
      </div>
    </header>
  );
}
