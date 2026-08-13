import { WATCH_MODELS } from "@/lib/troubleshooting/models";
import { WatchGrid } from "@/components/watch-grid";
import { SiteHeader } from "@/components/troubleshoot/site-header";
import { SiteFooter } from "@/components/troubleshoot/site-footer";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1320px] px-4 pb-16">
      <SiteHeader
        activeIndex={0}
        trail={[{ label: "01 Watch", href: "/" }, { label: "02 Issue" }, { label: "03 Fix" }]}
      />

      <h1 className="support-display mt-6 mb-5 text-[30px] text-[var(--support-ink)]">Find Your Fix</h1>

      <WatchGrid watchModels={WATCH_MODELS} />

      <SiteFooter />
    </div>
  );
}
