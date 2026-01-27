import type { Metadata } from "next";
import { VideoCard } from "@/components/VideoCard";

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

async function getVideos() {
  try {
    // Use absolute URL for server-side fetching
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 
                   process.env.NEXT_PUBLIC_SITE_URL ||
                   'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/v1/youtube`, {
      next: { revalidate: 3600 }, // Revalidate every hour
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }

    const data = await response.json();
    return data.success ? data.data : [];
  } catch (error) {
    console.error('Error fetching videos:', error);
    // Return fallback videos if API fails
    const { videos } = await import('@/data/videos');
    return videos;
  }
}

export default async function VideosPage() {
  const videos = await getVideos();

  return (
    <section className="section-card">
      <header className="mb-4 space-y-2">
        <h1 className="section-heading">Topnotch Online TV</h1>
        <p className="muted">
          These video lessons are part of Topnotch Online TV, where Thaddeus Mbaluka
          explains KCSE concepts using the Octopus Revision Method to help students
          understand faster and remember longer.
        </p>
        {videos.length === 0 && (
          <p className="text-xs text-muted-foreground">
            Videos are loading from the YouTube channel...
          </p>
        )}
      </header>

      {videos.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {videos.map((video: { id: string; title: string; description: string }) => (
            <VideoCard
              key={video.id}
              id={video.id}
              title={video.title}
              description={video.description}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-sm text-muted-foreground">
          <p>No videos available at the moment.</p>
          <p className="mt-2">
            <a
              href="https://www.youtube.com/@TopnotchonlineTV"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-foreground"
            >
              Visit Topnotch Online TV on YouTube →
            </a>
          </p>
        </div>
      )}
    </section>
  );
}
