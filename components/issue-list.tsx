"use client";

import type { TroubleshootingIssue } from "@/lib/content";

export function IssueList({
  issues,
  onSelect,
  onBack,
}: {
  issues: TroubleshootingIssue[];
  onSelect: (key: string) => void;
  onBack: () => void;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 text-[11.5px] font-bold uppercase tracking-wide text-[var(--support-ink-dim)] hover:text-[var(--support-red)]"
      >
        ← Change watch
      </button>
      <div className="flex flex-col gap-2">
        {issues.map((issue, index) => (
          <button
            key={issue.key}
            type="button"
            onClick={() => onSelect(issue.key)}
            className="card-in group flex items-center justify-between rounded-md border border-[var(--support-line)] bg-[var(--support-panel)] px-4 py-3.5 text-left transition-all duration-150 hover:translate-x-1 hover:border-[var(--support-red)]"
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <span className="text-[14.5px] font-semibold text-[var(--support-ink)]">{issue.label}</span>
            <span className="text-base font-extrabold text-[var(--support-red)] transition-transform duration-150 group-hover:translate-x-1">
              →
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
