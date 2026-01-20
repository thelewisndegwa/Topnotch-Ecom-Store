import Link from "next/link";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/videos", label: "Videos" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border-subtle bg-background">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-baseline gap-1">
          <span className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-900 dark:text-slate-50">
            Topnotch
          </span>
          <span className="text-sm font-light uppercase tracking-[0.22em] text-muted-foreground">
            Books
          </span>
        </Link>

        {/* Navigation + CTA */}
        <div className="flex flex-1 items-center justify-end gap-4">
          <nav className="hidden items-center gap-5 text-xs font-medium text-muted-foreground sm:flex">
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

          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-900 px-4 py-2 text-xs font-semibold tracking-wide text-slate-50 shadow-sm transition-colors hover:bg-slate-800 dark:border-slate-100/10 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Shop Books
          </Link>
        </div>
      </div>
    </header>
  );
}


