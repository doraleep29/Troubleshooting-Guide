"use client";

import Image from "next/image";
import Link from "next/link";
import type { TroubleshootingIssue } from "@/lib/troubleshooting/issues";
import type { WatchModel } from "@/lib/troubleshooting/models";
import { trackEvent } from "@/lib/troubleshooting/analytics";

type IconKey = "power" | "screen" | "bluetooth" | "bell" | "heart" | "battery" | "water" | "clock" | "wrench";

const ICON_BY_ISSUE: Record<string, IconKey> = {
  POWER: "power",
  SCREEN: "screen",
  PAIR: "bluetooth",
  NOTIF: "bell",
  READINGS: "heart",
  BATTERY: "battery",
  WATER: "water",
  UNITS: "clock",
  STRAP: "wrench",
};

function IssueIcon({ icon }: { icon: IconKey }) {
  const common = { viewBox: "0 0 24 24", className: "h-5 w-5", fill: "none", stroke: "var(--support-red)" };
  switch (icon) {
    case "power":
      return (
        <svg {...common}>
          <path d="M12 3v7" strokeWidth="2" strokeLinecap="round" />
          <path d="M6.5 6.5a7 7 0 1 0 11 0" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "screen":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="16" height="12" rx="1.5" strokeWidth="2" />
          <path d="M9 20h6M12 16v4" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    case "bluetooth":
      return (
        <svg {...common}>
          <path d="M7 7l10 10-5 4V3l5 4L7 17" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "bell":
      return (
        <svg {...common}>
          <path d="M6 16V10a6 6 0 1 1 12 0v6l1.5 2.5h-15z" strokeWidth="2" strokeLinejoin="round" />
          <path d="M10 20a2 2 0 0 0 4 0" strokeWidth="2" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path
            d="M12 20s-7-4.35-9.5-8.5C.8 8 2.3 4.5 6 4.5c2.2 0 3.5 1.3 4 2.2.5-.9 1.8-2.2 4-2.2 3.7 0 5.2 3.5 3.5 7C19 15.65 12 20 12 20z"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "battery":
      return (
        <svg {...common}>
          <rect x="2" y="7" width="17" height="10" rx="1.5" strokeWidth="2" />
          <path d="M21 10v4" strokeWidth="2" strokeLinecap="round" />
          <rect x="4.5" y="9.5" width="6" height="5" fill="var(--support-red)" stroke="none" />
        </svg>
      );
    case "water":
      return (
        <svg {...common}>
          <path
            d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11z"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "clock":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8.5" strokeWidth="2" />
          <path d="M12 7.5V12l3 2" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "wrench":
      return (
        <svg {...common}>
          <path
            d="M14.5 6.5a4 4 0 0 1-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 1 5.3-5.3l-2.6 2.6-2-2 2.6-2.6z"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
  }
}

export function IssueList({ issues, watch }: { issues: TroubleshootingIssue[]; watch: WatchModel }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit rounded-xl border border-[var(--support-line)] bg-[var(--support-panel)] p-5 text-center lg:text-left">
        <div className="text-[11px] font-bold uppercase tracking-wide text-[var(--support-ink-dim)]">Your watch</div>
        <div className="relative mx-auto h-[110px] w-full lg:mx-0">
          <Image src={watch.imageUrl} alt={watch.name} fill className="object-contain" sizes="220px" />
        </div>
        <div className="support-display text-lg text-[var(--support-ink)]">{watch.name}</div>
        <p className="mt-1 text-xs leading-relaxed text-[var(--support-ink-dim)]">{watch.tagline}</p>
        <Link
          href="/"
          className="mt-4 block w-full rounded-md border border-[var(--support-line)] px-3 py-2 text-center text-[11px] font-bold uppercase tracking-wide text-[var(--support-ink-dim)] hover:border-[var(--support-red)] hover:text-[var(--support-red)]"
        >
          ← Change watch
        </Link>
      </aside>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {issues.map((issue) => (
          <Link
            key={issue.key}
            href={`/troubleshooting/${watch.slug}/${issue.slug}/${issue.steps[0].slug}`}
            onClick={() => trackEvent("issue_selected", { modelId: watch.key, issueId: issue.key })}
            className="flex items-start gap-3 rounded-md border border-[var(--support-line)] bg-[var(--support-panel)] px-4 py-3.5 text-left transition-colors hover:border-[var(--support-red)]"
          >
            <span className="mt-0.5 shrink-0">
              <IssueIcon icon={ICON_BY_ISSUE[issue.key] ?? "wrench"} />
            </span>
            <span>
              <span className="block text-[14px] font-semibold text-[var(--support-ink)]">{issue.label}</span>
              <span className="mt-0.5 block text-[12px] leading-snug text-[var(--support-ink-dim)]">
                {issue.description}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
