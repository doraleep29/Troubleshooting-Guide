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
        className="h-fit overflow-hidden rounded-xl border border-[var(--support-accent)] bg-[var(--support-panel)] p-6"
        style={{ boxShadow: "0 0 26px rgba(245, 180, 0, 0.16)" }}
      >
        <div className="support-display text-xl text-white">Choose your watch</div>
        <p className="mt-2 text-[13px] leading-relaxed text-[var(--support-ink-dim)]">
          Select the model that looks closest to yours.
        </p>

        <div className="mt-4">
          {GUIDANCE_ROWS.map(({ Icon, title, description }, i) => (
            <div key={title} className={`flex items-start gap-3 py-3.5 ${i > 0 ? "border-t border-[var(--support-line)]" : ""}`}>
              <Icon />
              <div>
                <div className="text-[11.5px] font-bold uppercase tracking-wide text-[var(--support-accent)]">{title}</div>
                <div className="mt-0.5 text-[12.5px] leading-snug text-[var(--support-ink-dim)]">{description}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative mt-1 h-[80px] sm:h-[130px]" aria-hidden="true">
          <div
            className="pointer-events-none absolute -right-8 bottom-[-18px] h-[130px] w-[160px] rounded-full blur-2xl sm:h-[170px] sm:w-[210px]"
            style={{ background: "var(--support-accent)", opacity: 0.22 }}
          />
          <div className="pointer-events-none absolute -right-6 bottom-[-14px] h-[110px] w-[150px] sm:h-[160px] sm:w-[200px]">
            <Image src="/watches/edge-armor-silver.png" alt="" fill className="object-contain object-bottom" sizes="200px" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-8 bg-gradient-to-b from-[var(--support-panel)] to-transparent" />
        </div>

        <p className="mt-2 text-center text-[11px] text-[var(--support-ink-dim)]">You can change your watch anytime.</p>
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
