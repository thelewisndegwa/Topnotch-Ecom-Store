import Link from "next/link";
import { BookCard } from "@/components/BookCard";
import { books } from "@/data/books";

export function FeaturedBooks() {
  const booksToShow = books.slice(0, 4);

  return (
    <section className="section-card">
      <div className="flex items-baseline justify-between gap-4">
        <div>
          <h2 className="section-heading">Featured books</h2>
          <p className="muted">
            A small selection of KCSE-ready titles built around the Octopus Revision
            Method.
          </p>
        </div>
        <Link
          href="/shop"
          className="hidden text-[0.7rem] font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline sm:inline-flex"
        >
          View all books
        </Link>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {booksToShow.map((book) => (
          <BookCard
            key={book.slug}
            coverSrc={book.coverImagePath}
            title={book.title}
            subject={book.subject}
            form={book.form}
            priceKes={book.price}
            href={`/shop/${book.slug}`}
          />
        ))}
      </div>

      <div className="mt-5 sm:hidden">
        <Link
          href="/shop"
          className="text-[0.7rem] font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          View all books
        </Link>
      </div>
    </section>
  );
}


