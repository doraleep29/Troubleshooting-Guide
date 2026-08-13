"use client";

import Link from "next/link";
import type { TroubleshootingIssue } from "@/lib/troubleshooting/issues";
import type { WatchModel } from "@/lib/troubleshooting/models";
import { trackEvent } from "@/lib/troubleshooting/analytics";

export function ContactCard({
  watch,
  issue,
  startOverHref,
}: {
  watch: WatchModel;
  issue: TroubleshootingIssue;
  startOverHref: string;
}) {
  const subject = `Support request — ${watch.name} — ${issue.label}`;
  const body = [
    `Watch model: ${watch.name}`,
    `Issue: ${issue.label}`,
    `Steps already tried: ${issue.steps.map((s) => s.title).join("; ")}`,
    "",
    "What happened:",
  ].join("\n");
  const mailHref = `mailto:info@shopcarbinox.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  function handleEscalate() {
    trackEvent("support_escalation_clicked", { modelId: watch.key, issueId: issue.key });
  }

  return (
    <div className="rounded-lg border border-[var(--support-red)] bg-[var(--support-panel)] p-7 text-center">
      <div className="mb-3 text-3xl">⚠</div>
      <div className="support-display mb-2.5 text-xl text-[var(--support-ink)]">Let&apos;s get a human on it</div>
      <p className="mb-2.5 text-sm leading-relaxed text-[var(--support-ink-dim)]">
        You&apos;ve been through the field steps for your {watch.name} — this one needs the support team.
      </p>
      <div className="my-3.5 rounded bg-[var(--support-panel-2)] p-3.5 text-left text-[12.5px] leading-relaxed text-[var(--support-gold)]">
        If this is a power/screen issue and you&apos;re within 45 days of purchase, it qualifies for a free
        replacement automatically — no more troubleshooting needed. A human still reviews every request; nothing is
        approved automatically here.
      </div>
      <div className="text-sm text-[var(--support-ink-dim)]">
        Email{" "}
        <a href={mailHref} onClick={handleEscalate} className="font-bold text-[var(--support-red)] no-underline">
          info@shopcarbinox.com
        </a>{" "}
        (pre-filled with your watch model and the steps you tried) or visit the{" "}
        <a
          href="https://shopcarbinox.com/pages/carbinox-troubleshooting-guide"
          target="_blank"
          rel="noreferrer"
          onClick={handleEscalate}
          className="font-bold text-[var(--support-red)] no-underline"
        >
          support page
        </a>
        .
      </div>
      <Link
        href={startOverHref}
        className="mt-5 inline-block rounded-md border border-[var(--support-line)] bg-transparent px-4 py-3 text-[13px] font-bold tracking-wide text-[var(--support-ink)] uppercase"
      >
        Start a new lookup
      </Link>
    </div>
  );
}
