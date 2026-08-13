import Image from "next/image";
import Link from "next/link";
import type { WatchModel } from "@/lib/troubleshooting/models";

function parseButtonLabels(buttonLayout: string): string[] {
  const match = buttonLayout.match(/\(([^)]+)\)/);
  if (!match) return [];
  return match[1]
    .split(/\/|\+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function SelectedWatchPanel({ watch }: { watch: WatchModel }) {
  const buttons = parseButtonLabels(watch.buttonLayout);
  const buttonDiagram = watch.manualVisuals?.buttonLayout;

  return (
    <div className="rounded-lg border border-[var(--support-line)] bg-[var(--support-panel)] p-5">
      <div className="text-[11px] font-bold tracking-wide text-[var(--support-ink-dim)] uppercase">Your watch</div>

      <div className="relative mt-3 h-[220px] w-full sm:h-[260px] lg:h-[300px]">
        <Image
          src={watch.imageUrl}
          alt={watch.name}
          fill
          className="selected-watch-image object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.65)] drop-shadow-[0_0_14px_rgba(239,47,42,0.12)]"
          sizes="(max-width: 767px) 90vw, 280px"
        />
      </div>

      <div className="support-display mt-2 text-lg text-[var(--support-ink)]">{watch.name}</div>

      <Link
        href="/"
        className="mt-3 block rounded-md border border-[var(--support-line)] px-3 py-2.5 text-center text-[11px] font-bold tracking-wide text-[var(--support-ink-dim)] uppercase hover:border-[var(--support-red)] hover:text-[var(--support-red)]"
      >
        ← Change watch
      </Link>

      <div className="mt-5 border-t border-[var(--support-line)] pt-4">
        <div className="text-[11px] font-bold tracking-wide text-[var(--support-ink-dim)] uppercase">
          Physical buttons &amp; ports
        </div>
        {buttonDiagram ? (
          <div className="relative mt-2 h-[110px] w-full">
            <Image src={buttonDiagram} alt={`${watch.name} button layout diagram`} fill className="object-contain" sizes="260px" />
          </div>
        ) : (
          <ul className="mt-2 space-y-1.5">
            {buttons.map((label) => (
              <li key={label} className="flex items-center gap-2 text-[13px] text-[var(--support-ink)]">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: watch.accentColor }} />
                {label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
