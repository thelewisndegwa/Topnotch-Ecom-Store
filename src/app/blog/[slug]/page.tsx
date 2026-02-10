import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { blogPosts } from "@/data/blog";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "The requested KCSE revision article could not be found.",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return notFound();
  }

  const paragraphs = post.content.split(/\n\s*\n/);

  return (
    <article className="section-card">
      <header className="mb-6 space-y-2">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          KCSE REVISION · STUDY TIPS
        </p>
        <h1 className="text-balance text-xl font-semibold tracking-tight text-slate-900 sm:text-2xl">
          {post.title}
        </h1>
        <p className="text-[0.75rem] text-muted-foreground">
          {new Date(post.publishedAt).toLocaleDateString("en-KE", {
            year: "numeric",
            month: "short",
            day: "2-digit",
          })}
        </p>
      </header>

      <div className="space-y-3 text-sm leading-relaxed text-muted-foreground">
        {paragraphs.map((para, index) => (
          <p key={index}>{para}</p>
        ))}
      </div>

      <footer className="mt-6 border-t border-border-subtle pt-3 text-xs text-muted-foreground">
        <p>Written by Thaddeus Mbaluka</p>
      </footer>
    </article>
  );
}


