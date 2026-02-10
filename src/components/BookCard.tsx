import Image from "next/image";
import Link from "next/link";

type BookCardProps = {
  coverSrc: string;
  title: string;
  subject: string;
  form: string;
  priceKes: number;
  href?: string;
};

export function BookCard({
  coverSrc,
  title,
  subject,
  form,
  priceKes,
  href = "#",
}: BookCardProps) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border-subtle bg-white/80 transition-colors hover:border-slate-300">
      <div className="relative h-40 w-full overflow-hidden bg-muted sm:h-48">
        <Image
          src={coverSrc}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 220px, (min-width: 640px) 50vw, 100vw"
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
        <header className="space-y-1">
          <h3 className="line-clamp-2 text-sm font-semibold tracking-tight text-slate-900">
            {title}
          </h3>
          <p className="text-[0.7rem] uppercase tracking-[0.18em] text-muted-foreground">
            {subject} · Form {form}
          </p>
        </header>

        <div className="mt-auto flex items-end justify-between gap-3 text-sm">
          <p className="font-semibold text-slate-900">
            KES{" "}
            <span className="tabular-nums">
              {priceKes.toLocaleString("en-KE", {
                maximumFractionDigits: 0,
              })}
            </span>
          </p>

          <Link
            href={href}
            className="inline-flex items-center justify-center rounded-full border border-slate-900/10 bg-slate-900 px-3 py-1.5 text-[0.7rem] font-semibold tracking-wide text-slate-50 shadow-sm transition-colors hover:bg-slate-800"
          >
            View Book
          </Link>
        </div>
      </div>
    </article>
  );
}


