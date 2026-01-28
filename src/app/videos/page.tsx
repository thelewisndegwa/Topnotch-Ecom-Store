import type { Metadata } from "next";
import { VideoCard } from "@/components/VideoCard";

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

/**
 * Fetch videos from YouTube API
 * Uses Next.js server-side fetching with caching
 */
async function getVideos() {
  try {
    // During build time, we need an absolute URL for fetch
    // In runtime (Vercel), relative URLs work fine
    const isBuildTime = process.env.NEXT_PHASE === 'phase-production-build';
    
    let apiUrl: string;
    if (isBuildTime) {
      // During build, use a placeholder or skip API call
      // The API route will be available at runtime
      // For now, return empty array - videos will load at runtime
      return [];
    } else {
      // At runtime, use relative path (works in Vercel)
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
      apiUrl = baseUrl 
        ? `${baseUrl}/api/v1/youtube`
        : '/api/v1/youtube';
    }
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 3600 }, // Revalidate every hour
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch videos');
    }

    const result = await response.json();
    return result.data || [];
  } catch (error) {
    console.error('Error fetching videos:', error);
    return [];
  }
}

export default async function VideosPage() {
  const videos = await getVideos();

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
