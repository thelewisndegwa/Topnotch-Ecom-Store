import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "About Thaddeus Mbaluka",
  description:
    "Learn about educator and author Thaddeus Mbaluka, Topnotch Books, and the Octopus Revision Method for KCSE preparation.",
  openGraph: {
    title: "About Thaddeus Mbaluka",
    description:
      "Background on Thaddeus Mbaluka, Topnotch Books, and the Octopus Revision Method for KCSE revision.",
  },
};

export default function AboutPage() {
  return (
    <section className="section-card">
      <div className="space-y-8">
        {/* About Thaddeus Mbaluka */}
        <section>
          <div className="grid gap-6 sm:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] sm:items-start">
            <div>
              <h1 className="section-heading">About Thaddeus Mbaluka</h1>
              <p className="muted">
                Thaddeus Mbaluka is an educator and author dedicated to making KCSE
                revision calmer, more visual, and more predictable for candidates and
                teachers across Kenya.
              </p>

              <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>
                  Over years of classroom teaching and exam preparation, Thaddeus has
                  guided hundreds of students through the pressure and complexity of KCSE.
                  His work focuses on turning past papers and dense notes into clear,
                  structured learning experiences that students can trust.
                </p>
                <p>
                  He studies examiner reports, syllabus changes, and classroom challenges
                  to design materials that are both rigorous and realistic. The goal is
                  always the same: to help candidates recognise patterns, understand what
                  each question is really asking, and walk into the exam room with quiet
                  confidence.
                </p>
                <p>
                  As an author, Thaddeus builds books that are easy to navigate, easy to
                  mark, and easy to revisit. Each title is crafted to support teachers in
                  lesson planning and students in self-directed revision.
                </p>
              </div>
            </div>

            <div className="mx-auto hidden w-40 sm:block md:w-48">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-lg border border-border-subtle bg-muted">
                <Image
                  src="https://images.pexels.com/photos/6326064/pexels-photo-6326064.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Portrait of Thaddeus Mbaluka"
                  fill
                  className="object-cover"
                  sizes="192px"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        {/* About Topnotch Books & the Octopus Method */}
        <section>
          <h2 className="section-heading">
            About Topnotch Books &amp; the Octopus Revision Method
          </h2>
          <p className="muted">
            Topnotch Books publishes KCSE-focused materials that combine clear structure,
            past-paper insight, and calm visual design under the Octopus Revision Method.
          </p>

          <div className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
            <p>
              The Octopus Revision Method treats each topic as the centre of an octopus:
              past-paper questions, diagrams, and notes become the tentacles that connect
              different years and exam settings back to the same core ideas. This helps
              learners see how questions repeat and evolve, instead of experiencing every
              paper as something completely new.
            </p>
            <p>
              Topnotch books are organised by form, subject, and topic, with worked
              examples, practice questions, and space for reflection. Layouts are kept
              clean and uncluttered so that attention stays on the concepts, not on
              fighting the page.
            </p>
            <p>
              Whether used in the classroom or at home, the aim is to provide trustworthy
              revision materials that reduce guesswork, support consistent study habits,
              and honour the effort students invest in KCSE preparation.
            </p>
          </div>
        </section>
      </div>
    </section>
  );
}


