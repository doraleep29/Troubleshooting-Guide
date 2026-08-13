"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/troubleshooting/analytics";

export function ResolutionFeedback({
  yesHref,
  noHref,
  modelKey,
  issueKey,
  stepSlug,
}: {
  yesHref: string;
  noHref: string;
  modelKey: string;
  issueKey: string;
  stepSlug: string;
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
          No, still not working →
        </Link>
      </div>
    </div>
  );
}
