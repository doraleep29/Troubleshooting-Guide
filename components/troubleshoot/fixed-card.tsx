import Link from "next/link";

export function FixedCard({ startOverHref }: { startOverHref: string }) {
  return (
    <div className="rounded-lg border border-[var(--support-green)] bg-[var(--support-panel)] p-7 text-center">
      <div className="mb-3 text-3xl">✓</div>
      <div className="support-display mb-2.5 text-xl text-[var(--support-ink)]">Fixed. Back in the field.</div>
      <p className="mb-4 text-sm leading-relaxed text-[var(--support-ink-dim)]">
        Glad that sorted it. If it acts up again, this guide is always one tap away.
      </p>
      <Link
        href={startOverHref}
        className="inline-block rounded-md border border-[var(--support-line)] bg-transparent px-4 py-3 text-[13px] font-bold tracking-wide text-[var(--support-ink)] uppercase"
      >
        Start a new lookup
      </Link>
    </div>
  );
}
