import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FeaturedBooks } from "@/components/FeaturedBooks";
import { VideoCard } from "@/components/VideoCard";
import { blogPosts } from "@/data/blog";
import { videos as allVideos } from "@/data/videos";

export const metadata: Metadata = {
  title: "Topnotch Books",
  description:
    "KCSE revision made simple and visual with the Octopus Revision Method and Topnotch Books by Thaddeus Mbaluka.",
  openGraph: {
    title: "Topnotch Books",
    description:
      "Discover KCSE revision books and resources built around the Octopus Revision Method for calm, structured study.",
  },
};

export default function Home() {
  const recentVideos = allVideos.slice(0, 3);
  const recentPosts = blogPosts.slice(0, 3);

  // Placeholder blog posts if no real posts available
  const placeholderPosts = [
    {
      slug: "placeholder-1",
      title: "KCSE Revision Strategies",
      excerpt: "Discover effective strategies for structuring your KCSE revision and maximizing your study time.",
      publishedAt: new Date().toISOString().split('T')[0],
    },
    {
      slug: "placeholder-2",
      title: "The Octopus Method Explained",
      excerpt: "Learn how the Octopus Revision Method helps students organize past papers and identify patterns.",
      publishedAt: new Date().toISOString().split('T')[0],
    },
    {
      slug: "placeholder-3",
      title: "Study Tips for Success",
      excerpt: "Practical tips and techniques to help you stay focused and make the most of your revision sessions.",
      publishedAt: new Date().toISOString().split('T')[0],
    },
  ];

  // Placeholder videos if no real videos available
  const placeholderVideos = [
    {
      id: "VIDEO_PLACEHOLDER_1",
      title: "KCSE Mathematics Tutorial",
      description: "Comprehensive mathematics revision tutorials covering key KCSE topics.",
    },
    {
      id: "VIDEO_PLACEHOLDER_2",
      title: "Chemistry Revision Guide",
      description: "Step-by-step chemistry revision videos to help you master KCSE chemistry.",
    },
    {
      id: "VIDEO_PLACEHOLDER_3",
      title: "English Comprehension Tips",
      description: "Learn effective strategies for tackling English comprehension questions in KCSE.",
    },
  ];

  const displayPosts = recentPosts.length > 0 ? recentPosts : placeholderPosts;
  const displayVideos = recentVideos.length > 0 ? recentVideos : placeholderVideos as { id: string; title: string; description?: string }[];

  return (
    <>
      <section className="section-card">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          KCSE REVISION · OCTOPUS METHOD
        </p>
        <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
          KCSE revision made simple, visual, and deeply memorable.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The Octopus Revision Method turns dense past papers into clear, visual study
          paths—so students focus on what matters, not on fighting the notes.
        </p>

        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          Designed for candidates who want structured, exam-aligned practice without the
          overwhelm, guesswork, or noisy study hacks.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-900 px-4 py-2 text-xs font-semibold tracking-wide text-slate-50 shadow-sm transition-colors hover:bg-slate-800"
          >
            Shop Books
          </a>
          <a
            href="/method"
            className="inline-flex items-center justify-center rounded-full border border-border-subtle px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:border-slate-900/40 hover:text-foreground"
          >
            Learn the Method
          </a>
        </div>
      </section>

      <FeaturedBooks />

      {/* Blog Posts Preview */}
      <section className="section-card">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="section-heading">Latest from the Blog</h2>
            <p className="muted">
              KCSE revision tips, study strategies, and insights from the Octopus Method.
            </p>
          </div>
          <Link
            href="/blog"
            className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {displayPosts.map((post) => {
            const isPlaceholder = post.slug.startsWith('placeholder-');
            return (
              <article
                key={post.slug}
                className="rounded-lg border border-border-subtle bg-background/60 p-4 transition hover:bg-background"
              >
                <h3 className="text-sm font-semibold tracking-tight text-slate-900 sm:text-base">
                  {post.title}
                </h3>
                <p className="mt-1 text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
                  {new Date(post.publishedAt).toLocaleDateString("en-KE", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                  })}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt.length > 120 ? `${post.excerpt.substring(0, 120)}...` : post.excerpt}
                </p>
                {isPlaceholder ? (
                  <span className="mt-3 inline-flex text-xs font-medium text-muted-foreground">
                    Coming Soon
                  </span>
                ) : (
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-3 inline-flex text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                  >
                    Read More →
                  </Link>
                )}
              </article>
            );
          })}
        </div>
      </section>

      {/* Videos Preview */}
      <section className="section-card">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="section-heading">Educational Videos</h2>
            <p className="muted">
              Watch tutorials and educational content to supplement your KCSE revision.
            </p>
          </div>
          <Link
            href="/videos"
            className="text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
          >
            View All →
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {displayVideos.map((video: { id: string; title: string; description?: string }) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              description={video.description}
            />
          ))}
        </div>
      </section>

      <section className="section-card">
        <div className="grid gap-5 sm:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] sm:items-start">
          <div>
            <h2 className="section-heading">Meet Thaddeus Mbaluka</h2>
            <p className="muted">
              Thaddeus Mbaluka is an educator and author focused on making KCSE revision
              structured, visual, and predictable for candidates across Kenya.
            </p>

            <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
              <p>
                Drawing on years of classroom experience and analysis of past papers, he
                developed the Octopus Revision Method to help students see patterns, not
                just pages of questions. His books are designed to guide revision lesson
                by lesson, topic by topic.
              </p>
              <p>
                Each title balances exam rigour with calm, readable layouts—so teachers
                and students can focus on understanding, not on wrestling with materials.
              </p>
            </div>

            <a
              href="/about"
              className="mt-5 inline-flex text-xs font-medium text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Read the full story on the About page
            </a>
          </div>

          <div className="mx-auto hidden w-32 sm:block md:w-40">
            <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-border-subtle bg-muted">
              <Image
                src="/placeholder-author.svg"
                alt="Portrait of Thaddeus Mbaluka"
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
