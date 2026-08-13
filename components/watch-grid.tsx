"use client";

import { useRef } from "react";
import Image from "next/image";
import type { WatchModel } from "@/lib/content";

function WatchCard({ watch, index, onSelect }: { watch: WatchModel; index: number; onSelect: (key: string) => void }) {
  const ref = useRef<HTMLButtonElement>(null);

  // Cursor-tracked 3D tilt — no transition while the mouse is actually
  // moving (so it tracks immediately), only snaps back smoothly on leave.
  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transition = "transform 60ms linear";
    el.style.transform = `perspective(800px) rotateX(${py * -10}deg) rotateY(${px * 14}deg) translateY(-4px) scale(1.02)`;
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 350ms ease";
    el.style.transform = "";
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onSelect(watch.key)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card-in flex flex-col items-center rounded-lg border border-[var(--support-line)] bg-[var(--support-panel)] px-4 pt-8 pb-4 text-center will-change-transform hover:border-[var(--support-red)]"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      {/* The watch floats free on the card background — no picture-frame
          box around it, just the product photo, a gentle bob, and a glow
          ring beneath it. */}
      <div className="float-watch relative h-[160px] w-full" style={{ animationDelay: `${index * 220}ms` }}>
        <Image
          src={watch.imageUrl}
          alt={watch.name}
          fill
          className="object-contain drop-shadow-[0_20px_26px_rgba(0,0,0,0.65)]"
          sizes="(max-width: 480px) 100vw, 380px"
        />
      </div>
      <div
        className="pulse-ring -mt-1 h-3 w-24 rounded-full blur-md"
        style={{ background: watch.accentColor, animationDelay: `${index * 220}ms` }}
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
  );
}

export function WatchGrid({ watchModels, onSelect }: { watchModels: WatchModel[]; onSelect: (key: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      {watchModels.map((watch, index) => (
        <WatchCard key={watch.key} watch={watch} index={index} onSelect={onSelect} />
      ))}
    </div>
  );
}
