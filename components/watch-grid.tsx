"use client";

import Image from "next/image";
import type { WatchModel } from "@/lib/content";

export function WatchGrid({ watchModels, onSelect }: { watchModels: WatchModel[]; onSelect: (key: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {watchModels.map((watch) => (
        <button
          key={watch.key}
          type="button"
          onClick={() => onSelect(watch.key)}
          className="flex flex-col overflow-hidden rounded-lg border border-[var(--support-line)] bg-[var(--support-panel)] text-left transition-colors hover:border-[var(--support-red)]"
        >
          <div
            className="relative h-[190px] w-full border-b-[3px]"
            style={{ borderColor: watch.accentColor, background: "radial-gradient(circle at 50% 30%, #1a1a1a, #000 75%)" }}
          >
            <Image
              src={watch.imageUrl}
              alt={watch.name}
              fill
              className="object-contain p-6"
              sizes="(max-width: 480px) 100vw, 380px"
            />
          </div>
          <div className="p-4">
            <div className="support-display text-lg text-[var(--support-ink)]">{watch.name}</div>
            <p className="mt-1 text-xs leading-relaxed text-[var(--support-ink-dim)]">{watch.tagline}</p>
            <span
              className="mt-2 inline-block rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#0a0a0a]"
              style={{ background: watch.accentColor }}
            >
              Select
            </span>
          </div>
        </button>
      ))}
    </div>
  );
}
