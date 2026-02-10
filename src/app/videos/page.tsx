import type { Metadata } from "next";
import { VideoCard } from "@/components/VideoCard";
import { videos } from "@/data/videos";

export const metadata: Metadata = {
  title: "Videos | Topnotch Books",
  description:
    "Watch educational videos and tutorials from Topnotch Books to supplement your KCSE revision.",
  openGraph: {
    title: "Videos | Topnotch Books",
    description:
      "Educational videos and tutorials to supplement your KCSE revision.",
  },
};

export default function VideosPage() {

  return (
    <>
      {/* Page Header */}
      <div className="mb-8">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-muted px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Educational Content
        </div>
        <h1 className="section-heading mb-4">
          Video Resources
        </h1>
        <p className="muted max-w-3xl">
          Watch educational videos and tutorials to supplement your KCSE revision. 
          These videos complement our revision books and help reinforce key concepts.
        </p>
      </div>

      {/* Videos Grid */}
      {videos.length === 0 ? (
        <section className="section-card">
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No videos available at this time. Check back soon!
            </p>
          </div>
        </section>
      ) : (
        <section className="section-card">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video: { id: string; title: string; description?: string }) => (
              <VideoCard
                key={video.id}
                id={video.id}
                title={video.title}
                description={video.description}
              />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
