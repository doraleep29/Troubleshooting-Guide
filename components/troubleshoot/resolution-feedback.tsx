"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/troubleshooting/analytics";

export function ResolutionFeedback({
  yesHref,
  noHref,
  modelKey,
  issueKey,
  stepSlug,
  isLast,
  nextStepNumber,
}: {
  yesHref: string;
  noHref: string;
  modelKey: string;
  issueKey: string;
  stepSlug: string;
  isLast: boolean;
  nextStepNumber: number;
}) {
  return (
    <div className="mt-6 border-t border-[var(--support-line)] pt-5">
      <div className="text-[11px] font-bold tracking-wide text-[var(--support-ink-dim)] uppercase">Did this fix it?</div>
      <div className="mt-3 flex flex-wrap gap-2.5">
        <Link
          href={yesHref}
          onClick={() => trackEvent("step_completed", { modelId: modelKey, issueId: issueKey, stepId: stepSlug })}
          className="rounded-md bg-[var(--support-red)] px-4 py-3 text-[13px] font-bold tracking-wide text-white uppercase"
        >
          Yes, it&apos;s working
        </Link>
        <Link
          href={noHref}
          onClick={() => trackEvent("step_failed", { modelId: modelKey, issueId: issueKey, stepId: stepSlug })}
          className="rounded-md border border-[var(--support-line)] bg-[var(--support-panel-2)] px-4 py-3 text-[13px] font-bold tracking-wide text-[var(--support-ink)] uppercase"
        >
          {isLast ? "No, still not working →" : `No — Try Step ${nextStepNumber} →`}
        </Link>
      </div>
      {!isLast && (
        <p className="mt-2.5 text-[12px] text-[var(--support-ink-dim)]">
          Didn&apos;t work? There&apos;s another step to try before contacting support.
        </p>
      )}
    </div>
  );
}
