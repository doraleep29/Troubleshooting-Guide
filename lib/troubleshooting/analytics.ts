// Lightweight analytics hooks. This app has no backend, so events are
// logged to the console rather than sent anywhere — swap the body of
// trackEvent() for a real sink (e.g. a beacon POST) if one is added later.
// Never pass customer email, order number, or other PII into payload.

export type AnalyticsEvent =
  | "troubleshooting_started"
  | "watch_selected"
  | "issue_selected"
  | "step_viewed"
  | "step_completed"
  | "step_failed"
  | "troubleshooting_resolved"
  | "troubleshooting_exhausted"
  | "support_escalation_clicked";

let sessionId: string | null = null;

function getSessionId(): string {
  if (typeof window === "undefined") return "server";
  if (!sessionId) {
    sessionId = window.crypto.randomUUID();
  }
  return sessionId;
}

export function trackEvent(name: AnalyticsEvent, payload: Record<string, string | number | undefined> = {}): void {
  const event = {
    name,
    ...payload,
    sessionId: getSessionId(),
    timestamp: new Date().toISOString(),
  };
  console.log("[analytics]", event);
}
