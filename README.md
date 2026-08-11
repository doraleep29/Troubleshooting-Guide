# Carbinox Troubleshooting Guide — embed

This repo is intentionally tiny: a single Next.js page that embeds the real
troubleshooting guide — model → issue → guided repair steps → escalate —
in a full-viewport iframe.

**All actual logic and content lives in
[`doraleep29/Carbinox.workspace.com`](https://github.com/doraleep29/Carbinox.workspace.com)**,
at `/support/troubleshoot`: the watch model / issue / step catalog, the
"agent view" toggle for CX-internal notes, and the escalation flow
(Zendesk ticket creation, with an honest local-log fallback if that fails).
CX edits that content from that app's Settings pages — nothing here needs
to change when the guide's content changes.

This repo exists only so the guide can be deployed to its own domain
(e.g. for embedding on a Shopify page or linking from marketing), decoupled
from the ops workspace's own deployment, without duplicating any of that
app's UI or logic.

## Setup

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_GUIDE_URL to a real deployment
npm run dev
```

`NEXT_PUBLIC_GUIDE_URL` must point at a live deployment of the ops
workspace's `/support/troubleshoot` page. Locally it defaults to
`http://localhost:3000/support/troubleshoot` if unset.

## Deploying on Vercel

1. Import this repo as a new Vercel project.
2. Set `NEXT_PUBLIC_GUIDE_URL` in the project's Environment Variables to the
   ops workspace's real production URL (that app needs its own Vercel
   project too, if it doesn't have one yet).
3. Deploy. No other configuration is needed.

## Known limitation: agent view won't work inside the embed

The ops workspace's login session cookie is `SameSite=Lax`. Browsers don't
send that cookie on a cross-site iframe request, so a CX agent who's logged
into the workspace in another tab will still see the "sign in" prompt for
internal notes *inside this embed* — the browser can't tell the iframe who
they are. Agents who need internal notes should use the workspace's own
`/support/troubleshoot` URL directly, not this embedded copy. The
customer-facing flow (model → issue → steps → escalate) is unaffected —
it never required a session in the first place.
