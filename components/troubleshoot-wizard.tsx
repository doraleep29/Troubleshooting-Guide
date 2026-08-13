"use client";

import { useMemo, useState } from "react";
import type { TroubleshootingIssue, WatchModel } from "@/lib/content";
import { interpolateStepBody } from "@/lib/interpolate";
import { WatchGrid } from "@/components/watch-grid";
import { IssueList } from "@/components/issue-list";
import { StepCard } from "@/components/step-card";
import { ContactCard } from "@/components/contact-card";

type View = "watch" | "issue" | "steps" | "end";
type Outcome = "fixed" | "escalate";

const TRAIL_STEPS = ["01 Watch", "02 Issue", "03 Fix"];

function Trail({ activeIndex }: { activeIndex: number }) {
  return (
    <div className="mb-5 flex flex-wrap items-center gap-1.5 text-[11px] font-bold uppercase tracking-wide">
      {TRAIL_STEPS.map((label, i) => (
        <span key={label} className="flex items-center gap-1.5">
          <span
            className={`rounded px-2.5 py-1 ${
              i === activeIndex
                ? "bg-[var(--support-red)] text-white"
                : "border border-[var(--support-line)] text-[var(--support-ink-dim)]"
            }`}
          >
            {label}
          </span>
          {i < TRAIL_STEPS.length - 1 && <span className="text-[var(--support-line)]">→</span>}
        </span>
      ))}
    </div>
  );
}

function FixedCard({ onStartOver }: { onStartOver: () => void }) {
  return (
    <div className="rounded-lg border border-[var(--support-green)] bg-[var(--support-panel)] p-7 text-center">
      <div className="mb-3 text-3xl">✓</div>
      <div className="support-display mb-2.5 text-xl text-[var(--support-ink)]">Fixed. Back in the field.</div>
      <p className="mb-4 text-sm leading-relaxed text-[var(--support-ink-dim)]">
        Glad that sorted it. If it acts up again, this guide is always one tap away.
      </p>
      <button
        type="button"
        onClick={onStartOver}
        className="rounded-md border border-[var(--support-line)] bg-transparent px-4 py-3 text-[13px] font-bold uppercase tracking-wide text-[var(--support-ink)]"
      >
        Start a new lookup
      </button>
    </div>
  );
}

export function TroubleshootWizard({
  watchModels,
  issues,
}: {
  watchModels: WatchModel[];
  issues: TroubleshootingIssue[];
}) {
  const [view, setView] = useState<View>("watch");
  const [watchKey, setWatchKey] = useState<string | null>(null);
  const [issueKey, setIssueKey] = useState<string | null>(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [outcome, setOutcome] = useState<Outcome | null>(null);

  const watch = watchModels.find((w) => w.key === watchKey) ?? null;
  const issue = issues.find((i) => i.key === issueKey) ?? null;

  const steps = useMemo(() => {
    if (!issue || !watch) return [];
    return issue.steps.map((s) => ({ ...s, body: interpolateStepBody(s.body, watch) }));
  }, [issue, watch]);

  function selectWatch(key: string) {
    setWatchKey(key);
    setView("issue");
  }

  function selectIssue(key: string) {
    setIssueKey(key);
    setStepIndex(0);
    setView("steps");
  }

  function backToWatch() {
    setWatchKey(null);
    setIssueKey(null);
    setView("watch");
  }

  function backToIssue() {
    setIssueKey(null);
    setView("issue");
  }

  function markFixed() {
    setOutcome("fixed");
    setView("end");
  }

  function markStillBroken() {
    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      setOutcome("escalate");
      setView("end");
    }
  }

  function startOver() {
    setWatchKey(null);
    setIssueKey(null);
    setStepIndex(0);
    setOutcome(null);
    setView("watch");
  }

  return (
    <div className="mx-auto max-w-[760px] px-4 pb-16">
      <header className="pt-6 pb-1">
        <div className="support-display text-[26px] text-white">
          CARBINO<span className="text-[var(--support-red)]">X</span> SUPPORT
        </div>
        <p className="mt-1 text-[11px] uppercase tracking-wider text-[var(--support-ink-dim)]">
          Durability &amp; Reliability, Beyond Reality
        </p>
      </header>

      <h1 className="support-display mt-3.5 mb-5 text-[30px] text-[var(--support-ink)]">
        {view === "watch" && "Find Your Fix"}
        {view === "issue" && "What's Going On?"}
        {view === "steps" && "Field Repair Steps"}
        {view === "end" && "Result"}
      </h1>

      <Trail activeIndex={view === "watch" ? 0 : view === "issue" ? 1 : 2} />

      {view === "watch" && <WatchGrid watchModels={watchModels} onSelect={selectWatch} />}

      {view === "issue" && <IssueList issues={issues} onSelect={selectIssue} onBack={backToWatch} />}

      {view === "steps" && watch && issue && steps.length > 0 && (
        <StepCard watch={watch} steps={steps} stepIndex={stepIndex} onBack={backToIssue} onFixed={markFixed} onStillBroken={markStillBroken} />
      )}

      {view === "end" && outcome === "fixed" && <FixedCard onStartOver={startOver} />}
      {view === "end" && outcome === "escalate" && <ContactCard onStartOver={startOver} />}

      <div className="mt-9 border-t border-[var(--support-line)] pt-4 text-[11px] leading-relaxed text-[var(--support-ink-dim)]">
        Content sourced from the model manuals and the live shopcarbinox.com troubleshooting guide. Have your order
        number ready if you need to contact support.
      </div>
    </div>
  );
}
