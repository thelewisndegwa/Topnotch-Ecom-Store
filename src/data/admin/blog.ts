/**
 * Admin Mock Data - Blog Posts
 * 
 * Mock data for admin blog management page.
 * Includes blog post content and metadata for admin management.
 */

export type AdminBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string; // ISO date string, e.g. "2026-01-10"
  createdAt?: string;
  updatedAt?: string;
  author?: string;
  status?: 'draft' | 'published' | 'archived';
  views?: number;
};

export const adminBlogPosts: AdminBlogPost[] = [
  {
    slug: "how-to-structure-your-kcse-revision-weeks",
    title: "How to Structure Your KCSE Revision Weeks",
    excerpt:
      "A calm, week-by-week revision structure that balances past papers, notes, and rest so you do not burn out before the exam room.",
    publishedAt: "2026-01-05",
    createdAt: "2026-01-03T10:00:00",
    updatedAt: "2026-01-05T08:00:00",
    author: "Thaddeus Mbaluka",
    status: "published",
    views: 1245,
    content: [
      "Many candidates treat KCSE revision as a race to finish as many papers as possible. The result is exhaustion, not mastery.",
      "",
      "A more effective approach is to think in weeks, not days. Each week should have a clear focus per subject: a small set of topics, a limited pool of past papers, and a realistic number of questions you can mark and reflect on.",
      "",
      "Start by mapping your syllabus into 6–8 revision blocks per subject. Then, for each week:",
      "",
      "- Choose 2–3 high-yield topics in each subject.",
      "- Attempt past-paper questions for those topics only.",
      "- Mark your work with the official marking scheme or teacher guidance.",
      "- Summarise patterns you notice: verbs used, common tricks, and recurring diagrams.",
      "",
      "This slower, more deliberate rhythm gives your brain time to recognise patterns—the same patterns examiners use when setting KCSE papers.",
    ].join("\n"),
  },
  {
    slug: "using-the-octopus-revision-method-with-past-papers",
    title: "Using the Octopus Revision Method with Past Papers",
    excerpt:
      "Past papers are powerful only when they are organised. Here is how the Octopus Revision Method helps you see connections instead of isolated questions.",
    publishedAt: "2026-01-08",
    createdAt: "2026-01-06T14:30:00",
    updatedAt: "2026-01-08T09:15:00",
    author: "Thaddeus Mbaluka",
    status: "published",
    views: 1890,
    content: [
      "The Octopus Revision Method treats each topic like the head of an octopus: past-paper questions are the tentacles that reach into different years, schools, and exam settings.",
      "",
      "Instead of doing papers year by year, you:",
      "",
      "1. Pick one topic (for example, Quadratic Equations in Mathematics).",
      "2. Collect 10–20 questions on that topic from different KCSE years.",
      "3. Attempt them in short, timed sets.",
      "4. Mark, annotate, and group the questions by idea: standard, twisted, and challenge.",
      "",
      "Over time, you begin to see that examiners recycle core ideas with small changes. This removes the fear of 'new' questions and gives you a calm sense of familiarity when you open the paper.",
    ].join("\n"),
  },
  {
    slug: "quiet-study-routines-for-kcse-candidates",
    title: "Quiet Study Routines for KCSE Candidates",
    excerpt:
      "Not every candidate thrives in noisy group discussions. This guide outlines quiet, focused routines that still prepare you fully for KCSE.",
    publishedAt: "2026-01-12",
    createdAt: "2026-01-10T11:00:00",
    updatedAt: "2026-01-12T07:30:00",
    author: "Thaddeus Mbaluka",
    status: "published",
    views: 987,
    content: [
      "Some of the strongest KCSE performances come from students who prefer quiet, structured study over loud discussions.",
      "",
      "A quiet routine does not mean studying alone without feedback. It means:",
      "",
      "- Short, timed study blocks (25–40 minutes) with clear goals.",
      "- Check-ins with a teacher or study partner a few times a week.",
      "- Written reflection after past-paper sessions: what you missed and why.",
      "",
      "Combine this routine with well-organised revision materials—such as topic-based books and visual summaries—and you can progress confidently without draining your energy in every group discussion.",
    ].join("\n"),
  },
  {
    slug: "how-teachers-can-use-octopus-method-in-class",
    title: "How Teachers Can Use the Octopus Method in Class",
    excerpt:
      "A practical outline for turning topic-based Octopus Method materials into weekly lesson plans and homework sets.",
    publishedAt: "2026-01-14",
    createdAt: "2026-01-12T15:45:00",
    updatedAt: "2026-01-14T10:00:00",
    author: "Thaddeus Mbaluka",
    status: "published",
    views: 756,
    content: [
      "The Octopus Method is not only for private study. In the classroom, it can provide a clear structure for week-by-week KCSE preparation.",
      "",
      "Start each topic by mapping past-paper questions to specific lessons. During class, work through one or two questions together, then assign similar items from the same 'tentacle' as homework.",
      "",
      "Over the term, your students will see the same core ideas in multiple forms, across different years and contexts. This repetition with variation builds deep familiarity without feeling repetitive.",
    ].join("\n"),
  },
  {
    slug: "avoiding-kcse-cramming-panic",
    title: "Avoiding KCSE Cramming Panic",
    excerpt:
      "Last-minute cramming is tempting but unreliable. Here is how to protect your energy and still feel prepared in the final month.",
    publishedAt: "2026-01-16",
    createdAt: "2026-01-14T09:20:00",
    updatedAt: "2026-01-16T08:45:00",
    author: "Thaddeus Mbaluka",
    status: "published",
    views: 1123,
    content: [
      "The final month before KCSE can feel like a sprint, but treating it as a frantic rush often damages performance more than it helps.",
      "",
      "Instead of trying to 'cover everything', shift your focus to:",
      "",
      "- Cleaning up weak topics that keep appearing in past papers.",
      "- Practising full sections under timed conditions.",
      "- Reviewing marked scripts and writing short reflections on common mistakes.",
      "",
      "By narrowing your attention in this way, you protect your sleep, your confidence, and your ability to think clearly in the exam room.",
    ].join("\n"),
  },
];
