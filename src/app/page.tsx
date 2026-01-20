import type { Metadata } from "next";
import Image from "next/image";
import { FeaturedBooks } from "@/components/FeaturedBooks";

export const metadata: Metadata = {
  title: "KCSE Revision Books",
  description:
    "KCSE revision made simple and visual with the Octopus Revision Method and Topnotch Books by Thaddeus Mbaluka.",
  openGraph: {
    title: "KCSE Revision Books",
    description:
      "Discover KCSE revision books and resources built around the Octopus Revision Method for calm, structured study.",
  },
};

export default function Home() {
  return (
    <>
      <section className="section-card">
        <p className="text-[0.75rem] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          KCSE REVISION · OCTOPUS METHOD
        </p>
        <h2 className="mt-3 text-balance text-2xl font-semibold tracking-tight text-slate-900 dark:text-slate-50 sm:text-3xl">
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
            className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-900 px-4 py-2 text-xs font-semibold tracking-wide text-slate-50 shadow-sm transition-colors hover:bg-slate-800 dark:border-slate-100/10 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200"
          >
            Shop Books
          </a>
          <a
            href="/method"
            className="inline-flex items-center justify-center rounded-full border border-border-subtle px-4 py-2 text-xs font-medium tracking-wide text-muted-foreground transition-colors hover:border-slate-900/40 hover:text-foreground dark:hover:border-slate-100/60"
          >
            Learn the Method
          </a>
        </div>
      </section>

      <FeaturedBooks />

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
                src="/people/thaddeus-mbaluka.jpg"
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
