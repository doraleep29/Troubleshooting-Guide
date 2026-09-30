import Link from "next/link";
import type { WatchModel } from "@/lib/troubleshooting/models";

export function LastStepCard({ watch, startOverHref }: { watch: WatchModel; startOverHref: string }) {
  return (
    <div className="rounded-lg border border-[var(--support-accent)] bg-[var(--support-panel)] p-7 text-center">
      <div className="mb-3 text-3xl">⚠</div>
      <div className="support-display mb-2.5 text-xl text-[var(--support-ink)]">You&apos;ve reached the last step</div>
      <p className="mb-2.5 text-sm leading-relaxed text-[var(--support-ink-dim)]">
        You&apos;ve been through every step this guide has for your {watch.name} on this issue.
      </p>
      <Link
        href={startOverHref}
        className="mt-4 inline-block rounded-md border border-[var(--support-line)] bg-transparent px-4 py-3 text-[13px] font-bold tracking-wide text-[var(--support-ink)] uppercase"
      >
        Start a new lookup
      </Link>
    </div>
  );
}
