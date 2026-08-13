"use client";

import type { WatchModel } from "@/lib/content";

interface InterpolatedStep {
  title: string;
  body: string;
}

export function StepCard({
  watch,
  steps,
  stepIndex,
  onBack,
  onFixed,
  onStillBroken,
}: {
  watch: WatchModel;
  steps: InterpolatedStep[];
  stepIndex: number;
  onBack: () => void;
  onFixed: () => void;
  onStillBroken: () => void;
}) {
  const step = steps[stepIndex];

  return (
    <div>
      <button
        type="button"
        onClick={onBack}
        className="mb-4 text-[11.5px] font-bold uppercase tracking-wide text-[var(--support-ink-dim)] hover:text-[var(--support-red)]"
      >
        ← Change issue
      </button>

      <div className="mb-4 flex gap-1">
        {steps.map((s, i) => (
          <i
            key={s.title}
            className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
              i <= stepIndex ? "bg-[var(--support-red)]" : "bg-[var(--support-line)]"
            }`}
          />
        ))}
      </div>

      <div className="rounded-lg border border-[var(--support-line)] bg-[var(--support-panel)] p-6">
        <div className="mb-3.5 flex items-baseline gap-2.5">
          <div className="support-display text-[34px] leading-none text-[var(--support-red)]">
            {String(stepIndex + 1).padStart(2, "0")}
          </div>
          <div className="text-[11px] font-bold uppercase tracking-wide text-[var(--support-ink-dim)]">
            of {steps.length} · {watch.name}
          </div>
        </div>
        <div className="support-display mb-3 text-xl text-[var(--support-ink)]">{step.title}</div>
        <div className="text-[14.5px] leading-relaxed text-[#d7d7d7]">{step.body}</div>

        <div className="mt-5 flex flex-wrap gap-2.5">
          <button
            type="button"
            onClick={onFixed}
            className="rounded-md bg-[var(--support-red)] px-4 py-3 text-[13px] font-bold uppercase tracking-wide text-white transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]"
          >
            That fixed it ✓
          </button>
          <button
            type="button"
            onClick={onStillBroken}
            className="rounded-md border border-[var(--support-line)] bg-[var(--support-panel-2)] px-4 py-3 text-[13px] font-bold uppercase tracking-wide text-[var(--support-ink)] transition-transform duration-150 hover:scale-[1.03] active:scale-[0.98]"
          >
            Still not working →
          </button>
        </div>
      </div>
    </div>
  );
}
