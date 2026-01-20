import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "KCSE Revision Blog",
  description:
    "Essays and study tips on KCSE revision, the Octopus Method, and calm, focused preparation from Topnotch Books.",
  openGraph: {
    title: "KCSE Revision Blog",
    description:
      "Read KCSE revision advice, Octopus Method guides, and quiet study routines from Topnotch Books.",
  },
};

export default function BlogPage() {
  return (
    <section className="section-card">
      <header className="mb-6 space-y-2">
        <h1 className="section-heading">KCSE revision notes & study tips</h1>
        <p className="muted">
          Short, practical essays on structuring KCSE revision, using the Octopus Method,
          and building calm, focused study routines.
        </p>
      </header>

      <div className="space-y-4">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-lg border border-border-subtle bg-background/60 p-4 transition hover:bg-background"
          >
            <h2 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-base">
              {post.title}
            </h2>
            <p className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
              {new Date(post.publishedAt).toLocaleDateString("en-KE", {
                year: "numeric",
                month: "short",
                day: "2-digit",
              })}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {post.excerpt}
            </p>
            <Link
              href={`/blog/${post.slug}`}
              className="mt-3 inline-flex text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Read More
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}


