// The entire app: embed the ops workspace's real, fully-working
// troubleshooting guide in a full-viewport iframe. There is no logic or
// content here to keep in sync — that all lives in
// doraleep29/Carbinox.workspace.com at /support/troubleshoot. See the
// README for why (single source of truth, no duplicated UI) and for a
// known limitation (the "agent view" toggle can't see a cross-domain login
// session inside the iframe).
const GUIDE_URL = process.env.NEXT_PUBLIC_GUIDE_URL ?? "http://localhost:3000/support/troubleshoot";

export default function EmbedPage() {
  return (
    <iframe
      src={GUIDE_URL}
      title="Carbinox Support — Find Your Fix"
      style={{ display: "block", width: "100%", height: "100%", border: "none" }}
      allow="clipboard-write"
    />
  );
}
