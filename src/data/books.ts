export type Book = {
  slug: string;
  title: string;
  subject: string;
  form: string;
  price: number;
  description: string;
  coverImagePath: string;
};

export const books: Book[] = [
  {
    slug: "kcse-mathematics-form-4-octopus-revision",
    title: "KCSE Mathematics Revision · Form 4 (Octopus Method)",
    subject: "Mathematics",
    form: "4",
    price: 850,
    description:
      "Topic–by–topic Form 4 maths revision with worked KCSE-style questions, model answers, and visual summaries for each subtopic.",
    coverImagePath: "https://images.pexels.com/photos/590570/pexels-photo-590570.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "kcse-chemistry-form-3-visual-notes",
    title: "KCSE Chemistry Past Papers · Form 3 Visual Notes",
    subject: "Chemistry",
    form: "3",
    price: 920,
    description:
      "Structured Form 3 chemistry notes built from real KCSE past papers, focusing on experiments, equations, and common traps.",
    coverImagePath: "https://images.pexels.com/photos/2280568/pexels-photo-2280568.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "kcse-english-form-2-comprehension-practice",
    title: "KCSE English Comprehension · Form 2 Practice",
    subject: "English",
    form: "2",
    price: 780,
    description:
      "Reading passages, guided questions, and marking-scheme style notes to build Form 2 comprehension confidence.",
    coverImagePath: "https://images.pexels.com/photos/159775/library-la-trobe-study-students-159775.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "kcse-biology-form-4-diagram-atlas",
    title: "KCSE Biology Diagrams · Form 4 Revision Atlas",
    subject: "Biology",
    form: "4",
    price: 990,
    description:
      "An annotated atlas of must-know Form 4 biology diagrams, processes, and labelled illustrations for last-minute revision.",
    coverImagePath: "https://images.pexels.com/photos/163117/calendula-calendar-flower-desk-163117.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "kcse-physics-form-3-exam-practice",
    title: "KCSE Physics Exam Practice · Form 3",
    subject: "Physics",
    form: "3",
    price: 930,
    description:
      "Form 3 physics exam-style questions grouped by topic, with step-by-step solutions and examiner-style marking notes.",
    coverImagePath: "https://images.pexels.com/photos/590493/pexels-photo-590493.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "kcse-business-studies-form-4-revision-guide",
    title: "KCSE Business Studies · Form 4 Revision Guide",
    subject: "Business Studies",
    form: "4",
    price: 800,
    description:
      "Concise notes and KCSE-style questions covering key Form 4 business concepts, case studies, and structured essay practice.",
    coverImagePath: "https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "kcse-history-form-2-topic-notes",
    title: "KCSE History & Government · Form 2 Topic Notes",
    subject: "History & Government",
    form: "2",
    price: 760,
    description:
      "Organised topic notes and short-answer questions for Form 2 History & Government, aligned with KCSE trends and verbs.",
    coverImagePath: "https://images.pexels.com/photos/159751/book-address-book-learning-learn-159751.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    slug: "kcse-cre-form-4-chapter-review",
    title: "KCSE C.R.E. · Form 4 Chapter Review",
    subject: "C.R.E.",
    form: "4",
    price: 720,
    description:
      "Chapter-by-chapter review questions and essay prompts for Form 4 C.R.E., with guidance on structuring KCSE-style answers.",
    coverImagePath: "https://images.pexels.com/photos/415071/pexels-photo-415071.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

