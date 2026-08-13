import Link from "next/link";
import type { TroubleshootingIssue, TroubleshootingStep } from "@/lib/troubleshooting/issues";

export function InstructionPanel({
  issue,
  modelSlug,
  step,
  stepIndex,
  totalSteps,
  instructions,
  prevHref,
}: {
  issue: TroubleshootingIssue;
  modelSlug: string;
  step: TroubleshootingStep;
  stepIndex: number;
  totalSteps: number;
  instructions: string[];
  prevHref: string | null;
}) {
  return (
    <div className="rounded-lg border border-[var(--support-line)] bg-[var(--support-panel)] p-6">
      <Link
        href={`/troubleshooting/${modelSlug}`}
        className="text-[11px] font-bold tracking-wide text-[var(--support-ink-dim)] uppercase hover:text-[var(--support-red)]"
      >
        {issue.label}
      </Link>

      <div className="mt-3 text-[11px] font-bold tracking-wide text-[var(--support-ink-dim)] uppercase">
        Step {stepIndex + 1} of {totalSteps}
      </div>
      <h1 id="step-title" tabIndex={-1} className="support-display mt-1 text-2xl text-[var(--support-ink)] outline-none">
        {step.title}
      </h1>

      <ol className="mt-4 list-decimal space-y-2 pl-5 text-[14.5px] leading-relaxed text-[#d7d7d7]">
        {instructions.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ol>

      <div className="mt-6 flex gap-2.5">
        {prevHref ? (
          <Link
            href={prevHref}
            className="rounded-md border border-[var(--support-line)] bg-[var(--support-panel-2)] px-4 py-3 text-[13px] font-bold tracking-wide text-[var(--support-ink)] uppercase"
          >
            ← Back
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="cursor-not-allowed rounded-md border border-[var(--support-line)] bg-[var(--support-panel-2)] px-4 py-3 text-[13px] font-bold tracking-wide text-[var(--support-ink-dim)] uppercase opacity-50"
          >
            ← Back
          </span>
        )}
      </div>
    </div>
  );
}
