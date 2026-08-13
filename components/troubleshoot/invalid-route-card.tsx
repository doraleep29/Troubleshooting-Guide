import Link from "next/link";

export function InvalidRouteCard({ message, href, linkLabel }: { message: string; href: string; linkLabel: string }) {
  return (
    <div className="rounded-lg border border-[var(--support-line)] bg-[var(--support-panel)] p-7 text-center">
      <div className="mb-3 text-3xl">🔍</div>
      <div className="support-display mb-2.5 text-xl text-[var(--support-ink)]">Let&apos;s get you back on track</div>
      <p className="mb-4 text-sm leading-relaxed text-[var(--support-ink-dim)]">{message}</p>
      <Link
        href={href}
        className="inline-block rounded-md bg-[var(--support-red)] px-4 py-3 text-[13px] font-bold tracking-wide text-white uppercase"
      >
        {linkLabel}
      </Link>
    </div>
  );
}
