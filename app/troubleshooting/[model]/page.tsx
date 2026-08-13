import { findWatchBySlug } from "@/lib/troubleshooting/models";
import { ISSUES } from "@/lib/troubleshooting/issues";
import { IssueList } from "@/components/issue-list";
import { SiteHeader } from "@/components/troubleshoot/site-header";
import { SiteFooter } from "@/components/troubleshoot/site-footer";
import { InvalidRouteCard } from "@/components/troubleshoot/invalid-route-card";

export default async function IssuePickerPage({ params }: { params: Promise<{ model: string }> }) {
  const { model: modelSlug } = await params;
  const watch = findWatchBySlug(modelSlug);

  return (
    <div className="mx-auto max-w-[1320px] px-4 pb-16">
      <SiteHeader
        activeIndex={1}
        trail={[
          { label: "01 Watch", href: "/" },
          { label: "02 Issue", href: watch ? `/troubleshooting/${watch.slug}` : undefined },
          { label: "03 Fix" },
        ]}
      />

      {watch ? (
        <>
          <h1 className="support-display mt-6 mb-5 text-[30px] text-[var(--support-ink)]">What&apos;s Going On?</h1>
          <IssueList issues={ISSUES} watch={watch} />
        </>
      ) : (
        <div className="mt-8">
          <InvalidRouteCard message="We couldn't find that watch model." href="/" linkLabel="Choose your watch" />
        </div>
      )}

      <SiteFooter />
    </div>
  );
}
