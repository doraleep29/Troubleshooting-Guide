"use client";

import { useEffect } from "react";
import { trackEvent, type AnalyticsEvent } from "@/lib/troubleshooting/analytics";

// Fires a one-time analytics event when the resolved/escalate terminal
// views mount (troubleshooting_resolved / troubleshooting_exhausted).
export function OutcomeTracker({ event, modelKey, issueKey }: { event: AnalyticsEvent; modelKey: string; issueKey: string }) {
  useEffect(() => {
    trackEvent(event, { modelId: modelKey, issueId: issueKey });
  }, [event, modelKey, issueKey]);

  return null;
}
