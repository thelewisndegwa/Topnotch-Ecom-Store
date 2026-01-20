type VideoCardProps = {
  id: string;
  title: string;
  description: string;
};

export function VideoCard({ id, title, description }: VideoCardProps) {
  return (
    <article className="space-y-2">
      <div className="relative w-full overflow-hidden rounded-lg border border-border-subtle bg-black pt-[56.25%]">
        <iframe
          src={`https://www.youtube.com/embed/${id}`}
          title={title}
          className="absolute inset-0 h-full w-full"
          loading="lazy"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
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


