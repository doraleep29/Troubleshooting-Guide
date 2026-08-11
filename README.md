# Carbinox Troubleshooting Guide

A standalone, public, customer-facing troubleshooting tool for Carbinox
smartwatches: pick your model → pick your issue → get guided repair steps,
with a path to contact support when self-service doesn't resolve it.

This is a fully independent project — no database, no login, no dependency
on any other Carbinox codebase or service. Nothing here is sensitive: every
page is meant to be public.

## Stack

Next.js (App Router) + React + TypeScript + Tailwind CSS. No backend.

## Content

Watch models, issues, and guided steps live in `lib/content.ts` as plain
data, sourced from the model manuals and the live
`shopcarbinox.com/pages/carbinox-troubleshooting-guide` page. There's no
database or admin UI by design — updating content means editing that file
and deploying, same as any other code change.

## Escalation

When the guided steps don't resolve it, the guide shows an email link
(`info@shopcarbinox.com`) and a link to the live shopcarbinox.com support
page — no ticket is created automatically. This keeps the project fully
static/serverless with nothing to configure.

## Getting started

```bash
npm install
npm run dev
```

## Deploying on Vercel

Import this repo as a new Vercel project. No environment variables or
other configuration are required — it's a static/serverless Next.js app.
