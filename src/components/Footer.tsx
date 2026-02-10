import Link from "next/link";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-8 border-t border-border-subtle pt-4 text-xs text-muted-foreground">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.75rem] font-semibold tracking-wide text-slate-900">
            Topnotch Books
          </p>
          <p className="mt-1 text-[0.72rem] leading-relaxed">
            Quiet, focused KCSE revision materials for serious candidates.
          </p>
          <p className="mt-1 text-[0.7rem]">
            © {year} Topnotch Books. All rights reserved.
          </p>
        </div>

        <nav className="flex flex-wrap gap-3 text-[0.72rem]">
          <Link href="/shop" className="transition-colors hover:text-foreground">
            Shop
          </Link>
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
          <Link href="/about" className="transition-colors hover:text-foreground">
            About
          </Link>
        </nav>
      </div>
    </footer>
  );
}


