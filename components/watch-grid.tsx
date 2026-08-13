"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { WatchModel } from "@/lib/troubleshooting/models";
import { trackEvent } from "@/lib/troubleshooting/analytics";

interface WatchGroup {
  groupKey: string;
  groupName: string;
  variants: WatchModel[];
}

function groupWatches(watchModels: WatchModel[]): WatchGroup[] {
  const groups = new Map<string, WatchGroup>();
  for (const watch of watchModels) {
    const existing = groups.get(watch.groupKey);
    if (existing) {
      existing.variants.push(watch);
    } else {
      groups.set(watch.groupKey, { groupKey: watch.groupKey, groupName: watch.groupName, variants: [watch] });
    }
  }
  return Array.from(groups.values());
}

function GroupCard({ group }: { group: WatchGroup }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = group.variants[activeIndex];
  const hasVariants = group.variants.length > 1;

  return (
    <div className="flex flex-col items-center rounded-xl border border-[var(--support-line)] bg-[var(--support-panel)] px-5 pt-8 pb-5 text-center transition-colors hover:border-[var(--support-red)]">
      <div className="relative h-[180px] w-full">
        <Image
          src={active.imageUrl}
          alt={active.name}
          fill
          className="object-contain drop-shadow-[0_20px_26px_rgba(0,0,0,0.65)]"
          sizes="(max-width: 480px) 100vw, 420px"
        />
      </div>
      <div
        className="-mt-1 h-3 w-24 rounded-full blur-md"
        style={{ background: active.accentColor, opacity: 0.55 }}
        aria-hidden
      />
      <div className="mt-4 support-display text-lg text-[var(--support-ink)]">{group.groupName}</div>
      <p className="mt-1 text-xs leading-relaxed text-[var(--support-ink-dim)]">{active.tagline}</p>

      {hasVariants && (
        <div
          className="mt-3 flex flex-wrap justify-center gap-1.5"
          role="group"
          aria-label={`${group.groupName} color/case options`}
        >
          {group.variants.map((v, i) => (
            <button
              key={v.key}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-pressed={i === activeIndex}
              className={`rounded px-2.5 py-1 text-[10.5px] font-bold uppercase tracking-wide transition-colors ${
                i === activeIndex
                  ? "bg-[var(--support-red)] text-white"
                  : "border border-[var(--support-line)] text-[var(--support-ink-dim)] hover:border-[var(--support-red)]"
              }`}
            >
              {v.variantName}
            </button>
          ))}
        </div>
      )}

      <Link
        href={`/troubleshooting/${active.slug}`}
        onClick={() => {
          trackEvent("troubleshooting_started", { modelId: active.key });
          trackEvent("watch_selected", { modelId: active.key });
        }}
        className="mt-4 block w-full rounded px-3 py-2.5 text-center text-[11px] font-bold uppercase tracking-wide text-[#0a0a0a] transition-opacity hover:opacity-90"
        style={{ background: active.accentColor }}
      >
        Select{hasVariants ? ` — ${active.variantName}` : ""}
      </Link>
    </div>
  );
}

function SquareCaseIcon() {
  return (
    <svg viewBox="0 0 64 80" className="h-14 w-11" fill="none" aria-hidden>
      <rect x="14" y="14" width="36" height="52" rx="8" stroke="var(--support-gold)" strokeWidth="2.5" />
      <rect x="6" y="21" width="8" height="6" rx="1.5" fill="var(--support-gold)" />
      <rect x="6" y="39" width="8" height="6" rx="1.5" fill="var(--support-gold)" />
      <rect x="50" y="21" width="8" height="6" rx="1.5" fill="var(--support-gold)" />
      <rect x="50" y="39" width="8" height="6" rx="1.5" fill="var(--support-gold)" />
    </svg>
  );
}

function RoundCaseIcon() {
  return (
    <svg viewBox="0 0 64 80" className="h-14 w-11" fill="none" aria-hidden>
      <circle cx="32" cy="40" r="26" stroke="var(--support-red)" strokeWidth="2.5" />
      <rect x="50" y="30" width="10" height="7" rx="1.5" fill="var(--support-red)" />
      <rect x="50" y="43" width="10" height="7" rx="1.5" fill="var(--support-red)" />
    </svg>
  );
}

function IdentifyHelp() {
  return (
    <aside className="h-fit rounded-xl border border-[var(--support-line)] bg-[var(--support-panel)] p-5">
      <div className="support-display text-base text-[var(--support-ink)]">Not sure which watch?</div>
      <p className="mt-1.5 text-[12.5px] leading-relaxed text-[var(--support-ink-dim)]">
        Identify your watch by its case shape and number of buttons.
      </p>

      <div className="mt-4 flex items-start gap-3 border-t border-[var(--support-line)] pt-4">
        <SquareCaseIcon />
        <div>
          <div className="text-[11.5px] font-bold uppercase tracking-wide text-[var(--support-gold)]">
            Square case
          </div>
          <div className="mt-0.5 text-xs text-[var(--support-ink-dim)]">4 buttons</div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 border-t border-[var(--support-line)] pt-4">
        <RoundCaseIcon />
        <div>
          <div className="text-[11.5px] font-bold uppercase tracking-wide text-[var(--support-red)]">Round case</div>
          <div className="mt-0.5 text-xs text-[var(--support-ink-dim)]">2 or 4 buttons</div>
        </div>
      </div>
    </aside>
  );
}

export function WatchGrid({ watchModels }: { watchModels: WatchModel[] }) {
  const groups = groupWatches(watchModels);

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_260px]">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {groups.map((group) => (
          <GroupCard key={group.groupKey} group={group} />
        ))}
      </div>
      <IdentifyHelp />
    </div>
  );
}
