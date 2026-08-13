"use client";

import { useState } from "react";
import Image from "next/image";
import type { ResolvedStepVisual } from "@/lib/troubleshooting/issues";
import { Accordion } from "@/components/troubleshoot/accordion";

export function InstructionVisualPanel({
  visual,
  additionalHelp,
}: {
  visual: ResolvedStepVisual | null;
  additionalHelp?: { title: string; content: string }[];
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  return (
    <div className="rounded-lg border border-[var(--support-line)] bg-[var(--support-panel)] p-5">
      {visual ? (
        <>
          <div className="support-display text-base text-[var(--support-ink)]">{visual.title}</div>
          <button type="button" onClick={() => setLightboxOpen(true)} className="group mt-3 block w-full text-left">
            <div className="relative h-[260px] w-full transition-opacity motion-reduce:transition-none group-hover:opacity-90">
              <Image src={visual.src} alt={visual.alt} fill className="object-contain" sizes="(max-width: 1199px) 90vw, 500px" />
            </div>
            <div className="mt-2 text-center text-[11px] font-bold tracking-wide text-[var(--support-ink-dim)] uppercase group-hover:text-[var(--support-red)]">
              From the manual — tap to enlarge
            </div>
          </button>
        </>
      ) : (
        <div className="flex min-h-[260px] flex-col items-center justify-center text-center">
          <span className="text-2xl">🖼</span>
          <p className="mt-2 text-[12px] leading-relaxed text-[var(--support-ink-dim)]">
            A manual diagram for this step isn&apos;t added yet.
          </p>
        </div>
      )}

      {additionalHelp && additionalHelp.length > 0 && <Accordion items={additionalHelp} />}

      {lightboxOpen && visual && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={visual.title}
          onClick={() => setLightboxOpen(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-6"
        >
          <div className="relative max-h-[85vh] w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="relative h-[70vh] w-full">
              <Image src={visual.src} alt={visual.alt} fill className="object-contain" sizes="700px" />
            </div>
            <button
              type="button"
              onClick={() => setLightboxOpen(false)}
              className="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--support-red)] text-lg font-bold text-white"
              aria-label="Close"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
