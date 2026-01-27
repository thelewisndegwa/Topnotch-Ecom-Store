import type { Metadata } from "next";
import { BookCard } from "@/components/BookCard";
import { books } from "@/data/books";

export const metadata: Metadata = {
  title: "Shop KCSE Books",
  description:
    "Browse all Topnotch Books KCSE revision titles by subject and form, built around the Octopus Revision Method.",
  openGraph: {
    title: "Shop KCSE Books",
    description:
      "Explore KCSE revision books for Mathematics, Chemistry, Biology, English and more from Topnotch Books.",
  },
};

export default function ShopPage() {
  return (
    <section className="section-card">
      <header className="mb-6 space-y-2">
        <h1 className="section-heading">Shop all books</h1>
        <p className="muted">
          Browse KCSE-ready titles built around the Octopus Revision Method. Each book is
          organised by form and subject to make lesson planning and self-study simpler.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {books.map((book) => (
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
    </section>
  );
}


