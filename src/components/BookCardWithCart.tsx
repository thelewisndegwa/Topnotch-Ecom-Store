'use client';

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/contexts/CartContext";
import { Book } from "@/data/books";
import { useState } from "react";

type BookCardWithCartProps = {
  book: Book;
};

export function BookCardWithCart({ book }: BookCardWithCartProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsAdding(true);
    addToCart(book);
    setTimeout(() => setIsAdding(false), 500);
  };

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border-subtle bg-white/80 transition-colors hover:border-slate-300">
      <Link href={`/shop/${book.slug}`} className="relative h-40 w-full overflow-hidden bg-muted sm:h-48">
        <Image
          src={book.coverImagePath}
          alt={book.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 220px, (min-width: 640px) 50vw, 100vw"
        />
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <header className="space-y-1">
          <Link href={`/shop/${book.slug}`}>
            <h3 className="line-clamp-2 text-sm font-semibold tracking-tight text-slate-900 hover:underline">
              {book.title}
            </h3>
          </Link>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
            {book.subject} · Form {book.form}
          </p>
        </header>

        <div className="mt-auto flex items-end justify-between gap-3 text-sm">
          <p className="font-semibold text-slate-900">
            KES{" "}
            <span className="tabular-nums">
              {book.price.toLocaleString("en-KE", {
                maximumFractionDigits: 0,
              })}
            </span>
          </p>

          <div className="flex gap-2">
            <Link
              href={`/shop/${book.slug}`}
              className="inline-flex items-center justify-center rounded-full border border-border-subtle px-3 py-1.5 text-[0.7rem] font-medium tracking-wide text-muted-foreground transition-colors hover:border-slate-900/40 hover:text-foreground"
            >
              View
            </Link>
            <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-900 px-3 py-1.5 text-[0.7rem] font-semibold tracking-wide text-slate-50 shadow-sm transition-colors hover:bg-slate-800 disabled:opacity-50"
            >
              {isAdding ? 'Added!' : 'Add'}
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
