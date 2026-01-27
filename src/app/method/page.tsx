import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Octopus Revision Method",
  description:
    "Learn about the Octopus Revision Method—a structured approach to KCSE revision that connects past papers, topics, and visual summaries.",
  openGraph: {
    title: "The Octopus Revision Method",
    description:
      "Discover how the Octopus Method transforms KCSE revision into clear, visual study paths.",
  },
};

export default function MethodPage() {
  return (
    <section className="section-card">
      <header className="mb-6 space-y-2">
        <h1 className="section-heading">The Octopus Revision Method</h1>
        <p className="muted">
          A structured approach to KCSE revision that turns past papers into clear,
          visual study paths.
        </p>
      </header>

      <div className="space-y-6 text-sm leading-relaxed text-muted-foreground">
        <section>
          <h2 className="mb-3 text-base font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            How It Works
          </h2>
          <div className="space-y-3">
            <p>
              The Octopus Revision Method treats each topic like the head of an octopus:
              past-paper questions are the tentacles that reach into different years,
              schools, and exam settings.
            </p>
            <p>
              Instead of doing papers year by year, you pick one topic (for example,
              Quadratic Equations in Mathematics), collect 10–20 questions on that topic
              from different KCSE years, attempt them in short, timed sets, then mark,
              annotate, and group the questions by idea: standard, twisted, and challenge.
            </p>
            <p>
              Over time, you begin to see that examiners recycle core ideas with small
              changes. This removes the fear of "new" questions and gives you a calm sense
              of familiarity when you open the paper.
            </p>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Key Principles
          </h2>
          <div className="space-y-3">
            <div>
              <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-50">
                Topic-Centered Learning
              </h3>
              <p>
                Focus on one topic at a time, gathering all related questions from
                different years and sources. This helps you see patterns and connections
                rather than isolated questions.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-50">
                Visual Organization
              </h3>
              <p>
                Each topic is organized with visual summaries, diagrams, and clear
                structures that make complex information easier to remember and recall.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-50">
                Pattern Recognition
              </h3>
              <p>
                By grouping questions by type (standard, twisted, challenge), you learn
                to recognize what examiners are really asking, regardless of how the
                question is phrased.
              </p>
            </div>
            <div>
              <h3 className="mb-1 font-semibold text-slate-900 dark:text-slate-50">
                Calm, Structured Practice
              </h3>
              <p>
                The method emphasizes steady, week-by-week revision rather than last-minute
                cramming. Each study session has a clear focus and realistic goals.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-3 text-base font-semibold tracking-tight text-slate-900 dark:text-slate-50">
            Using the Method with Topnotch Books
          </h2>
          <div className="space-y-3">
            <p>
              All Topnotch Books are built around the Octopus Revision Method. Each book
              is organized by topic, with past-paper questions grouped together, worked
              examples, and visual summaries.
            </p>
            <p>
              Teachers can use these books to structure weekly lesson plans, while students
              can use them for self-directed revision. The goal is always the same: to
              make KCSE preparation calmer, more predictable, and more effective.
            </p>
            <p>
              <a
                href="/shop"
                className="font-medium text-slate-900 underline-offset-4 hover:underline dark:text-slate-50"
              >
                Browse our books →
              </a>
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}
