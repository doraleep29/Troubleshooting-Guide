"use client";

import Image from "next/image";
import type { WatchModel } from "@/lib/content";

export function WatchGrid({ watchModels, onSelect }: { watchModels: WatchModel[]; onSelect: (key: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {watchModels.map((watch) => (
        <button
          key={watch.key}
          type="button"
          onClick={() => onSelect(watch.key)}
          className="group flex flex-col items-center rounded-lg border border-[var(--support-line)] bg-[var(--support-panel)] px-4 pt-8 pb-4 text-center transition-colors hover:border-[var(--support-red)]"
        >
          {/* The watch floats free on the card background — no picture-frame
              box around it, just the product photo and a glow ring. */}
          <div className="relative h-[160px] w-full">
            <Image
              src={watch.imageUrl}
              alt={watch.name}
              fill
              className="object-contain drop-shadow-[0_20px_26px_rgba(0,0,0,0.65)] transition-transform duration-200 group-hover:-translate-y-1.5"
              sizes="(max-width: 480px) 100vw, 380px"
            />
          </div>
          <div
            className="-mt-1 h-3 w-24 rounded-full blur-md"
            style={{ background: watch.accentColor, opacity: 0.55 }}
            aria-hidden
          />
          <div className="mt-4">
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
