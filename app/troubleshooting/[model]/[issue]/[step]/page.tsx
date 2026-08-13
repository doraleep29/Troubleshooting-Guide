import { findWatchBySlug } from "@/lib/troubleshooting/models";
import { findIssueBySlug, getStepVisual } from "@/lib/troubleshooting/issues";
import { interpolateInstructions } from "@/lib/interpolate";
import { SiteHeader } from "@/components/troubleshoot/site-header";
import { SiteFooter } from "@/components/troubleshoot/site-footer";
import { SelectedWatchPanel } from "@/components/troubleshoot/selected-watch-panel";
import { TroubleshootingTimeline } from "@/components/troubleshoot/timeline";
import { InstructionPanel } from "@/components/troubleshoot/instruction-panel";
import { ResolutionFeedback } from "@/components/troubleshoot/resolution-feedback";
import { InstructionVisualPanel } from "@/components/troubleshoot/visual-panel";
import { StepFocus } from "@/components/troubleshoot/step-focus";
import { OutcomeTracker } from "@/components/troubleshoot/outcome-tracker";
import { FixedCard } from "@/components/troubleshoot/fixed-card";
import { ContactCard } from "@/components/contact-card";
import { InvalidRouteCard } from "@/components/troubleshoot/invalid-route-card";

function Shell({
  activeIndex,
  watchSlug,
  children,
}: {
  activeIndex: number;
  watchSlug?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-[1320px] px-4 pb-16">
      <SiteHeader
        activeIndex={activeIndex}
        trail={[
          { label: "01 Watch", href: "/" },
          { label: "02 Issue", href: watchSlug ? `/troubleshooting/${watchSlug}` : undefined },
          { label: "03 Fix", href: undefined },
        ]}
      />
      <div className="mt-6">{children}</div>
      <SiteFooter />
    </div>
  );
}

export default async function FixStepPage({
  params,
}: {
  params: Promise<{ model: string; issue: string; step: string }>;
}) {
  const { model: modelSlug, issue: issueSlug, step: stepSlug } = await params;
  const watch = findWatchBySlug(modelSlug);
  const issue = findIssueBySlug(issueSlug);

  if (!watch) {
    return (
      <Shell activeIndex={2}>
        <InvalidRouteCard message="We couldn't find that watch model." href="/" linkLabel="Choose your watch" />
      </Shell>
    );
  }

  if (!issue) {
    return (
      <Shell activeIndex={2} watchSlug={watch.slug}>
        <InvalidRouteCard
          message="We couldn't find that issue."
          href={`/troubleshooting/${watch.slug}`}
          linkLabel="Choose your issue"
        />
      </Shell>
    );
  }

  if (stepSlug === "resolved") {
    return (
      <Shell activeIndex={2} watchSlug={watch.slug}>
        <OutcomeTracker event="troubleshooting_resolved" modelKey={watch.key} issueKey={issue.key} />
        <FixedCard startOverHref="/" />
      </Shell>
    );
  }

  if (stepSlug === "escalate") {
    return (
      <Shell activeIndex={2} watchSlug={watch.slug}>
        <OutcomeTracker event="troubleshooting_exhausted" modelKey={watch.key} issueKey={issue.key} />
        <ContactCard watch={watch} issue={issue} startOverHref="/" />
      </Shell>
    );
  }

  const stepIndex = issue.steps.findIndex((s) => s.slug === stepSlug);
  if (stepIndex === -1) {
    return (
      <Shell activeIndex={2} watchSlug={watch.slug}>
        <InvalidRouteCard
          message="We couldn't find that troubleshooting step."
          href={`/troubleshooting/${watch.slug}/${issue.slug}/${issue.steps[0].slug}`}
          linkLabel="Back to the first step"
        />
      </Shell>
    );
  }

  const step = issue.steps[stepIndex];
  const instructions = interpolateInstructions(step.instructions, watch);
  const visual = getStepVisual(step, watch);
  const isLast = stepIndex === issue.steps.length - 1;
  const prevHref = stepIndex > 0 ? `/troubleshooting/${watch.slug}/${issue.slug}/${issue.steps[stepIndex - 1].slug}` : null;
  const noHref = `/troubleshooting/${watch.slug}/${issue.slug}/${isLast ? "escalate" : issue.steps[stepIndex + 1].slug}`;
  const yesHref = `/troubleshooting/${watch.slug}/${issue.slug}/resolved`;

  return (
    <div className="mx-auto max-w-[1320px] px-4 pb-16">
      <SiteHeader
        activeIndex={2}
        trail={[
          { label: "01 Watch", href: "/" },
          { label: "02 Issue", href: `/troubleshooting/${watch.slug}` },
          { label: "03 Fix" },
        ]}
      />

      <div className="troubleshooting-workspace">
        <div className="tw-watch">
          <SelectedWatchPanel watch={watch} />
        </div>

        <div className="tw-steps">
          <TroubleshootingTimeline steps={issue.steps} currentIndex={stepIndex} modelSlug={watch.slug} issueSlug={issue.slug} />
          <StepFocus modelKey={watch.key} issueKey={issue.key} stepSlug={step.slug} />
          <InstructionPanel
            issue={issue}
            modelSlug={watch.slug}
            step={step}
            stepIndex={stepIndex}
            totalSteps={issue.steps.length}
            instructions={instructions}
            prevHref={prevHref}
          />
        </div>

        <div className="tw-visual">
          <InstructionVisualPanel visual={visual} additionalHelp={step.additionalHelp} />
        </div>

        <div className="tw-feedback">
          <ResolutionFeedback yesHref={yesHref} noHref={noHref} modelKey={watch.key} issueKey={issue.key} stepSlug={step.slug} />
        </div>
      </div>

      <SiteFooter />
    </div>
  );
}
