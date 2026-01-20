import type { Metadata } from "next";
import { VideoCard } from "@/components/VideoCard";
import { videos } from "@/data/videos";

export const metadata: Metadata = {
  title: "Topnotch Online TV",
  description:
    "KCSE revision lessons by Thaddeus Mbaluka from the Topnotch Online TV YouTube channel.",
  openGraph: {
    title: "Topnotch Online TV",
    description:
      "Watch KCSE revision lessons by Thaddeus Mbaluka from Topnotch Online TV.",
  },
};

export default function VideosPage() {
  return (
    <section className="section-card">
      <header className="mb-4 space-y-2">
        <h1 className="section-heading">Topnotch Online TV</h1>
        <p className="muted">
          These video lessons are part of Topnotch Online TV, where Thaddeus Mbaluka
          explains KCSE concepts using the Octopus Revision Method to help students
          understand faster and remember longer.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {videos.map((video) => (
          <VideoCard
            key={video.id}
            id={video.id}
            title={video.title}
            description={video.description}
          />
        ))}
      </div>
    </section>
  );
}


