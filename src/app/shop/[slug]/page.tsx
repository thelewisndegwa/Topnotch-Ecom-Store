import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import { books } from "@/data/books";
import { AddToCartButton } from "@/components/AddToCartButton";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return books.map((book) => ({ slug: book.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);

  if (!book) {
    return {
      title: "Book not found",
      description: "The requested KCSE revision book could not be found.",
    };
  }

  const title = `${book.title}`;

  return {
    title,
    description: book.description,
    openGraph: {
      title,
      description: book.description,
      type: "website",
    },
  };
}

export default async function BookDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const book = books.find((b) => b.slug === slug);

  if (!book) {
    return notFound();
  }

  return (
    <article className="section-card">
      <div className="grid gap-8 md:grid-cols-[280px,1fr]">
        {/* Cover */}
        <div className="space-y-4">
          <div className="relative aspect-[3/4] w-full max-w-[280px] mx-auto md:mx-0 overflow-hidden rounded-lg border border-border-subtle bg-muted">
            <Image
              src={book.coverImagePath}
              alt={book.title}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 280px, 100vw"
              priority
            />
          </div>

          <AddToCartButton book={book} variant="full-width" />
        </div>

        {/* Details */}
        <div className="space-y-5">
          <header className="space-y-2">
            <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {book.subject} · Form {book.form}
            </p>
            <h1 className="text-balance text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
              {book.title}
            </h1>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {book.description}
            </p>
            <p className="text-sm font-semibold text-slate-900">
              KES{" "}
              <span className="tabular-nums">
                {book.price.toLocaleString("en-KE", {
                  maximumFractionDigits: 0,
                })}
              </span>
            </p>
          </header>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              What&apos;s Inside
            </h2>
            <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                Structured KCSE-style questions arranged by topic and subtopic, with
                spaces for students to attempt before checking the model answers.
              </p>
              <p>
                Visual summaries and checklists that turn past paper trends into clear,
                page-by-page revision routes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Who It&apos;s For
            </h2>
            <div className="mt-2 space-y-2 text-sm leading-relaxed text-muted-foreground">
              <p>
                KCSE candidates and teachers who want calm, predictable practice rather
                than scattered notes and last-minute cramming.
              </p>
              <p>
                Ideal for focused revision sessions, holiday assignments, and term-long
                practice plans.
              </p>
            </div>
          </section>
        </div>
      </div>
    </article>
  );
}


