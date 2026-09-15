# Carbinox Troubleshooting Guide

A standalone, public, customer-facing troubleshooting tool for Carbinox
smartwatches: pick your model → pick your issue → get guided repair steps,
with a path to contact support when self-service doesn't resolve it.

This is a fully independent project — no database, no login, no dependency
on any other Carbinox codebase or service. Nothing here is sensitive: every
page is meant to be public.

## Stack

Next.js (App Router) + React + TypeScript + Tailwind CSS. No backend.

## Branding

Uses the real Carbinox logo (`public/brand/carbinox-wordmark.webp` in the
header, `public/brand/carbinox-mark.png` as `app/icon.png`, the favicon) and
the real black + yellow brand palette — `--support-accent` in
`app/globals.css` (`#f5b400`) is the single source of truth for the yellow
used across buttons, active states, and badges. The header logo is shown
white via a CSS `invert` filter since the source files are black ink on a
transparent background.

## Content

Watch models live in `lib/troubleshooting/models.ts`; issues and guided
steps live in `lib/troubleshooting/issues.ts` — plain typed data, sourced
from the model manuals and the live
`shopcarbinox.com/pages/carbinox-troubleshooting-guide` page. There's no
database or admin UI by design — updating content means editing those
files and deploying, same as any other code change.

Diagrams are wired to steps via a `visualSlot` (e.g. `chargingAlignment`,
`chargingPort`, `restart`, `pairingApp`) resolved per selected watch through
`getStepVisual()` in `lib/troubleshooting/issues.ts` — the same step data is
shared across every model, but each model supplies its own diagrams via
`manualVisuals`. A model with no diagram yet for a given slot shows an
honest "not added yet" placeholder rather than borrowing another model's
image. Two image sources exist side by side:

- `public/troubleshooting-diagrams/<model-slug>/*.png` — clean, transparent-
  background recreations (used for `buttonLayout`, `chargingAlignment`,
  `chargingPort`, `restart` on most models). Preferred where available.
- `public/manuals/<model-slug>/*.png` — raw crops from the real manual pages
  (used for `pairingApp`, `gestures`, `otaUpdate`, `bluetoothCalling`, and
  X-Ranger's charging slots specifically — see below).

X-Ranger's manual has no dedicated gestures or firmware-update section, so
those two slots are intentionally left unset. X-Ranger's recreated charging
diagrams also had fabricated case-back engraving ("Designed in Germany", a
made-up serial number) that contradicts the real manual ("Assembled in
China"), so its `chargingAlignment`/`chargingPort` still point at the raw
manual crop until a corrected recreation exists — never swap those back to
the recreated pack without checking the engraved text first.

`getStepVisual()` falls back to `sharedStepDiagrams` (keyed by step slug, in
`public/troubleshooting-diagrams/shared/`) when a step has no `visualSlot`,
or its slot is empty for the selected watch — generic process/app steps
(`silent-modes`, `complete-profile`, `temperature-units`, `time-distance-units`,
`app-permissions`, `check-coverage`) that don't depend on watch hardware at
all. **Known interim gap:** `hard-reset-all-buttons`, `check-fit`, `dry-out`,
`document-damage`, and `rating-coverage` are also served from this shared
folder right now, but those five actually do depend on hardware (button
count/position, case shape, water rating) — the current images only depict
the real Edge hardware and Edge's own water guidance, so a Blaze/Vortex/
X-Ranger customer sees an accurate diagram of the wrong model on those five
steps. Model-specific versions for Blaze Type R, Blaze Type S, Vortex, and
X-Ranger are expected to replace the shared fallback for those five slugs —
move them to each model's own `manualVisuals` once those exist, the same way
every other hardware-dependent slot works. `proximity-background` is still
unset (shows the placeholder) because the one draft image for it stated the
wrong Bluetooth range (1–2m instead of the documented ~10m) and was held back
rather than shipped with a wrong number.

## Routing

`/` — pick a watch. `/troubleshooting/[model]` — pick an issue for that
model. `/troubleshooting/[model]/[issue]/[step]` — the guided fix screen,
one URL per step, so the page is refreshable, shareable, and works with
browser back/forward. `.../resolved` and `.../escalate` are reserved step
slugs for the two terminal states. An unknown model/issue/step slug shows a
friendly recovery card instead of a hard 404.

## Escalation

When the guided steps don't resolve it, the guide shows a "Get an agent"
button linking to the Zendesk request form
(`https://carbinox.zendesk.com/hc/en-us/requests/new`) — no ticket is
created automatically from here, and no replacement is ever auto-approved.
This keeps the project fully static/serverless with nothing to configure.

## Analytics

`lib/troubleshooting/analytics.ts` exports a `trackEvent()` stub (console
logging only, no backend) for the lifecycle events a real analytics
pipeline would want: `troubleshooting_started`, `watch_selected`,
`issue_selected`, `step_viewed`, `step_completed`, `step_failed`,
`troubleshooting_resolved`, `troubleshooting_exhausted`,
`support_escalation_clicked`. No PII is ever passed in the payload.

## Getting started

```bash
npm install
npm run dev
```

## Deploying on Vercel

Import this repo as a new Vercel project. No environment variables or
other configuration are required — it's a static/serverless Next.js app.
