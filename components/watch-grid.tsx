"use client";

import Image from "next/image";
import Link from "next/link";
import type { WatchModel } from "@/lib/troubleshooting/models";
import { trackEvent } from "@/lib/troubleshooting/analytics";

function WatchCard({ watch }: { watch: WatchModel }) {
  return (
    <Link
      href={`/troubleshooting/${watch.slug}`}
      onClick={() => {
        trackEvent("troubleshooting_started", { modelId: watch.key });
        trackEvent("watch_selected", { modelId: watch.key });
      }}
      className="group flex flex-col items-center px-4 pt-8 pb-4 text-center transition-transform duration-200 hover:-translate-y-1"
    >
      <div className="relative h-[180px] w-full">
        <Image
          src={watch.imageUrl}
          alt={watch.name}
          fill
          className="object-contain drop-shadow-[0_20px_26px_rgba(0,0,0,0.65)] transition-transform duration-200 group-hover:-translate-y-1.5"
          sizes="(max-width: 480px) 100vw, 420px"
        />
      </div>
      <div
        className="-mt-1 h-3 w-24 rounded-full blur-md"
        style={{ background: watch.accentColor, opacity: 0.55 }}
        aria-hidden
      />
      <div className="mt-4 support-display text-lg text-[var(--support-ink)]">{watch.name}</div>
    </Link>
  );
}

function CaseShapeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="none" stroke="var(--support-accent)" strokeWidth="1.5" aria-hidden="true">
      <rect x="7" y="4" width="10" height="16" rx="3" />
      <rect x="4.5" y="8.5" width="2.25" height="2.75" rx="0.6" fill="var(--support-accent)" stroke="none" />
      <rect x="4.5" y="12.75" width="2.25" height="2.75" rx="0.6" fill="var(--support-accent)" stroke="none" />
      <rect x="17.25" y="8.5" width="2.25" height="2.75" rx="0.6" fill="var(--support-accent)" stroke="none" />
      <rect x="17.25" y="12.75" width="2.25" height="2.75" rx="0.6" fill="var(--support-accent)" stroke="none" />
    </svg>
  );
}

function ButtonsIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="none" stroke="var(--support-accent)" strokeWidth="1.5" aria-hidden="true">
      <rect x="5" y="3" width="10" height="18" rx="3" />
      <circle cx="18.25" cy="8" r="1.3" fill="var(--support-accent)" stroke="none" />
      <circle cx="18.25" cy="16" r="1.3" fill="var(--support-accent)" stroke="none" />
    </svg>
  );
}

function PaletteIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0" fill="none" stroke="var(--support-accent)" strokeWidth="1.5" aria-hidden="true">
      <path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.9-.9 1.9-1.9 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1 .9-1.9 1.9-1.9H16.5a3.5 3.5 0 0 0 3.5-3.5A9 9 0 0 0 12 3Z" />
      <circle cx="8" cy="10.5" r="1.1" fill="var(--support-accent)" stroke="none" />
      <circle cx="12" cy="7.5" r="1.1" fill="var(--support-accent)" stroke="none" />
      <circle cx="16" cy="10.5" r="1.1" fill="var(--support-accent)" stroke="none" />
    </svg>
  );
}

const GUIDANCE_ROWS = [
  {
    Icon: CaseShapeIcon,
    title: "Match the case",
    description: "Compare the overall shape and build.",
  },
  {
    Icon: ButtonsIcon,
    title: "Check the buttons",
    description: "Look at the number and placement of buttons.",
  },
  {
    Icon: PaletteIcon,
    title: "Color doesn't matter",
    description: "Focus on the shape and button layout, not the color.",
  },
];

function ChooseYourWatchPanel() {
  return (
    <div className="relative">
      <span
        aria-hidden="true"
        className="absolute top-9 -left-9 hidden text-2xl leading-none text-[var(--support-accent)] lg:block"
      >
        ←
      </span>
      <aside
        className="h-fit overflow-hidden rounded-xl border border-[var(--support-accent)] bg-[var(--support-panel)] p-5"
        style={{ boxShadow: "0 0 26px rgba(245, 180, 0, 0.16)" }}
      >
        <div className="support-display text-xl text-white">Choose your watch</div>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--support-ink-dim)]">
          Select the model that looks closest to yours.
        </p>

        <div className="mt-3">
          {GUIDANCE_ROWS.map(({ Icon, title, description }, i) => (
            <div key={title} className={`flex items-start gap-3 py-2.5 ${i > 0 ? "border-t border-[var(--support-line)]" : ""}`}>
              <Icon />
              <div>
                <div className="text-[11.5px] font-bold uppercase tracking-wide text-[var(--support-accent)]">{title}</div>
                <div className="mt-0.5 text-[12.5px] leading-snug text-[var(--support-ink-dim)]">{description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative -mx-5 -mb-5 mt-3 h-[110px] overflow-hidden" aria-hidden="true">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[130px] w-[160px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{ background: "var(--support-accent)", opacity: 0.25 }}
          />
          <Image
            src="/watches/edge-armor-silver.png"
            alt=""
            fill
            className="object-cover"
            style={{ objectPosition: "50% 72%" }}
            sizes="400px"
          />
        </div>
      </aside>
    </div>
  );
}

export function WatchGrid({ watchModels }: { watchModels: WatchModel[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_390px] lg:items-start">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {watchModels.map((watch) => (
          <WatchCard key={watch.key} watch={watch} />
        ))}
      </div>
      <ChooseYourWatchPanel />
    </div>
  );
}
