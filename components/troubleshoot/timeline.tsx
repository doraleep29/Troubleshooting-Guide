import Link from "next/link";
import type { TroubleshootingStep } from "@/lib/troubleshooting/issues";

export function TroubleshootingTimeline({
  steps,
  currentIndex,
  modelSlug,
  issueSlug,
}: {
  steps: TroubleshootingStep[];
  currentIndex: number;
  modelSlug: string;
  issueSlug: string;
}) {
  return (
    <ol className="mb-5 flex flex-wrap items-center gap-x-1 gap-y-2" aria-label="Troubleshooting progress">
      {steps.map((step, i) => {
        const status = i < currentIndex ? "complete" : i === currentIndex ? "active" : "upcoming";
        const reachable = i <= currentIndex;
        const href = `/troubleshooting/${modelSlug}/${issueSlug}/${step.slug}`;
        const dotClass =
          status === "complete"
            ? "bg-[var(--support-green)] text-[#0a0a0a]"
            : status === "active"
              ? "bg-[var(--support-red)] text-white"
              : "border border-[var(--support-line)] text-[var(--support-ink-dim)]";
        const labelClass = status === "active" ? "text-[var(--support-red)]" : "text-[var(--support-ink-dim)]";

        const content = (
          <span className="flex items-center gap-1.5">
            <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold ${dotClass}`}>
              {status === "complete" ? "✓" : i + 1}
            </span>
            <span className={`text-[11px] font-bold tracking-wide uppercase ${labelClass}`}>{step.shortLabel}</span>
          </span>
        );

        return (
          <li key={step.slug} className="flex items-center gap-1">
            {reachable ? (
              <Link href={href} aria-current={status === "active" ? "step" : undefined}>
                {content}
              </Link>
            ) : (
              content
            )}
            {i < steps.length - 1 && <span className="mx-0.5 text-[var(--support-line)]">—</span>}
          </li>
        );
      })}
    </ol>
  );
}
