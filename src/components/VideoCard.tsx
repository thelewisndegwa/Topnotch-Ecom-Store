type VideoCardProps = {
  id: string;
  title: string;
  description: string;
};

export function VideoCard({ id, title, description }: VideoCardProps) {
  // Check if video ID is valid (not a placeholder)
  const isValidVideoId = id && !id.startsWith('VIDEO_ID_') && id.length > 5;

  return (
    <article className="space-y-2">
      <div className="relative w-full overflow-hidden rounded-lg border border-border-subtle bg-black pt-[56.25%]">
        {isValidVideoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            title={title}
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-slate-900 text-slate-50">
            <div className="text-center p-4">
              <p className="text-xs text-muted-foreground mb-2">Video coming soon</p>
              <a
                href="https://www.youtube.com/@TopnotchonlineTV"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs underline hover:text-slate-200"
              >
                Watch on YouTube →
              </a>
            </div>
          </div>
        )}
      </div>
      <div className="space-y-1">
        <h2 className="text-sm font-semibold tracking-tight text-slate-900 dark:text-slate-50">
          {title}
        </h2>
        <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
      </div>
    </article>
  );
}


