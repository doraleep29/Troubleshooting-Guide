"use client";

import { useRef } from "react";
import Image from "next/image";
import type { WatchModel } from "@/lib/content";

// Softens the photo's edges instead of a hard-edged rectangle — several
// source product photos are studio shots on a white background. Fading it
// into the card's own vivid color (rather than fighting to remove it) reads
// as an intentional spotlight, not a background-removal artifact.
const PHOTO_MASK = "radial-gradient(ellipse 52% 56% at 50% 46%, black 22%, transparent 68%)";

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
    el.style.transition = "transform 60ms linear, filter 60ms linear";
    el.style.transform = `perspective(800px) rotateX(${py * -14}deg) rotateY(${px * 18}deg) translateY(-6px) scale(1.05)`;
    el.style.filter = "brightness(1.08) saturate(1.15)";
  }

  function handleMouseLeave() {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 400ms cubic-bezier(0.22, 1, 0.36, 1), filter 400ms ease";
    el.style.transform = "";
    el.style.filter = "";
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => onSelect(watch.key)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card-in group relative flex flex-col overflow-hidden rounded-2xl text-left shadow-lg will-change-transform"
      style={{ background: watch.accentColor, animationDelay: `${index * 90}ms` }}
    >
      {/* Depth overlay — a diagonal light-to-dark wash so the flat accent
          color reads as a rich panel instead of a plain fill. */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "linear-gradient(155deg, rgba(255,255,255,0.22), rgba(0,0,0,0.4) 75%)" }}
        aria-hidden
      />

      <div className="relative flex h-[190px] items-center justify-center">
        <div className="float-watch relative h-[150px] w-[82%]" style={{ animationDelay: `${index * 220}ms` }}>
          <Image
            src={watch.imageUrl}
            alt={watch.name}
            fill
            className="object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-[1.08]"
            style={{ maskImage: PHOTO_MASK, WebkitMaskImage: PHOTO_MASK }}
            sizes="(max-width: 480px) 100vw, 380px"
          />
        </div>
      </div>

      <div className="relative bg-black/32 px-4 py-3.5 backdrop-blur-[2px]">
        <div className="support-display text-lg text-white">{watch.name}</div>
        <p className="mt-1 text-xs leading-relaxed text-white/75">{watch.tagline}</p>
        <span
          className="mt-2 inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-wide transition-transform duration-200 group-hover:scale-110"
          style={{ color: watch.accentColor }}
        >
          Select →
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
