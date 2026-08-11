export function ContactCard({ onStartOver }: { onStartOver: () => void }) {
  return (
    <div className="rounded-lg border border-[var(--support-red)] bg-[var(--support-panel)] p-7 text-center">
      <div className="mb-3 text-3xl">⚠</div>
      <div className="support-display mb-2.5 text-xl text-[var(--support-ink)]">Let&apos;s get a human on it</div>
      <p className="mb-2.5 text-sm leading-relaxed text-[var(--support-ink-dim)]">
        You&apos;ve been through the field steps — this one needs the support team.
      </p>
      <div className="my-3.5 rounded bg-[var(--support-panel-2)] p-3.5 text-left text-[12.5px] leading-relaxed text-[var(--support-gold)]">
        If this is a power/screen issue and you&apos;re within 45 days of purchase, it qualifies for a free
        replacement automatically — no more troubleshooting needed.
      </div>
      <div className="text-sm text-[var(--support-ink-dim)]">
        Email{" "}
        <a href="mailto:info@shopcarbinox.com" className="font-bold text-[var(--support-red)] no-underline">
          info@shopcarbinox.com
        </a>{" "}
        or visit the{" "}
        <a
          href="https://shopcarbinox.com/pages/carbinox-troubleshooting-guide"
          target="_blank"
          rel="noreferrer"
          className="font-bold text-[var(--support-red)] no-underline"
        >
          support page
        </a>
        . Include your watch model and issue.
      </div>
      <button
        type="button"
        onClick={onStartOver}
        className="mt-5 rounded-md border border-[var(--support-line)] bg-transparent px-4 py-3 text-[13px] font-bold uppercase tracking-wide text-[var(--support-ink)]"
      >
        Start a new lookup
      </button>
    </div>
  );
}
