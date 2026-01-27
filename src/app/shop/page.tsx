import type { Metadata } from "next";
import { BookCardWithCart } from "@/components/BookCardWithCart";
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
  if (!books || books.length === 0) {
    return (
      <section className="section-card">
        <p>No books available.</p>
      </section>
    );
  }

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
          <BookCardWithCart key={book.slug} book={book} />
        ))}
      </div>
    </section>
  );
}


