"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/troubleshooting/analytics";

// Moves keyboard focus to the new step's heading after Back/Next/timeline
// navigation, so screen reader and keyboard users land on the new content
// instead of staying on the just-clicked link. Also fires step_viewed.
// Re-runs whenever the App Router remounts this page for a new step slug.
export function StepFocus({ modelKey, issueKey, stepSlug }: { modelKey: string; issueKey: string; stepSlug: string }) {
  useEffect(() => {
    document.getElementById("step-title")?.focus();
    trackEvent("step_viewed", { modelId: modelKey, issueId: issueKey, stepId: stepSlug });
  }, [modelKey, issueKey, stepSlug]);

  return null;
}
