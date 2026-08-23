import Image from "next/image";
import Link from "next/link";

interface TrailItem {
  label: string;
  href?: string;
}

export function SiteHeader({ activeIndex, trail }: { activeIndex: number; trail: TrailItem[] }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[var(--support-accent)]/40 pt-6 pb-4">
      <Link href="/" className="block">
        <div className="flex items-center gap-2.5">
          <Image
            src="/brand/carbinox-wordmark.webp"
            alt="Carbinox"
            width={190}
            height={24}
            priority
            className="h-[20px] w-auto invert"
          />
          <span className="support-display text-[20px] text-white">Support</span>
        </div>
        <p className="mt-1 text-[11px] tracking-wider text-[var(--support-ink-dim)] uppercase">
          Durability &amp; Reliability, Beyond Reality
        </p>
      </Link>

      <div className="support-display text-lg text-[var(--support-ink)] sm:text-xl">Let&apos;s Get It Working</div>

      <nav className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold tracking-wide uppercase" aria-label="Progress">
        {trail.map((item, i) => {
          const isActive = i === activeIndex;
          const className = `rounded px-2.5 py-1 border ${
            isActive ? "border-[var(--support-accent)] text-[var(--support-accent)]" : "border-[var(--support-line)] text-[var(--support-ink-dim)]"
          }`;
          return (
            <span key={item.label} className="flex items-center gap-1.5">
              {item.href ? (
                <Link href={item.href} className={className} aria-current={isActive ? "step" : undefined}>
                  {item.label}
                </Link>
              ) : (
                <span className={className} aria-current={isActive ? "step" : undefined}>
                  {item.label}
                </span>
              )}
              {i < trail.length - 1 && <span className="text-[var(--support-line)]">→</span>}
            </span>
          );
        })}
      </nav>
    </header>
  );
}
