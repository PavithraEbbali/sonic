# Sonic Authorized Retailer — landing site

A single-page, statically prerendered landing site for an **independent
authorized retailer of Sonic** fiber internet and home phone service.

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Lenis.
No API routes, no database, no server actions — every route prerenders to static
content.

---

## Getting started

```bash
npm install
npm run dev
```

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (both routes prerender as static) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

---

## Deploying to Vercel

The project needs no special configuration — Vercel detects Next.js and uses
the framework defaults.

1. Import the repository at [vercel.com/new](https://vercel.com/new).
2. Framework preset: **Next.js** (auto-detected).
3. Build command `npm run build`, output directory `.next` — both defaults.
4. **No environment variables are required.**
5. Deploy.

`next/image` optimization works out of the box on Vercel; the photographs in
`public/images/` are served re-encoded to AVIF/WebP and resized per breakpoint.

---

## Editing content

**`lib/content.ts` is the single source of truth.** Every price, speed, fee,
promotional qualifier, feature bullet, FAQ answer, image path and legal
disclosure lives there. No `.tsx` file contains a hard-coded dollar amount,
speed, plan name or image path.

Changing a rate in that file cascades automatically to the hero price anchor,
every plan card, the fine-print comparison table and the footer disclosures —
no layout edits.

Useful exports:

| Export | Role |
|---|---|
| `PLANS` | Every plan. Add or remove entries here. |
| `SERVICE_LINE_ORDER` | Fixed merchandising order: fiber → cable → bundle → tv → mobile → phone |
| `SERVICE_LINE_META` | Per-line copy, plus its photograph and `imagePlacement` |
| `MEDIA` | Photography used outside the plan sections |
| `SITE` | Brand name, retailer label, phone number, disclosure |
| `EQUIPMENT`, `UNIVERSAL_TERMS`, `FAQS`, `WHY_US`, `HOW_IT_WORKS` | Section content |

A service line with no plans is skipped entirely, so Sonic's non-native lines
(cable, TV, mobile) never render as empty placeholders. Adding a cable plan to
`PLANS` would make a cable section appear in the correct slot with no component
change.

### Before launch

`SITE.phoneDisplay` / `SITE.phoneHref` hold **`(888) 555-0123`**, a placeholder
in the reserved 555-01xx range that never connects. Replace it with the
retailer's own tracked sales number. It must not be a carrier support line.

---

## Compliance rules baked into the build

These are deliberate. Please read `ai.wing` before changing any of them.

- Persistent, non-dismissable disclosure bar: *"Independent Authorized Retailer of Sonic."*
- The hero carries **both** a ZIP availability checker and a call path.
- Body CTAs read *"Call to order"*, or *"Call for pricing"* when a plan has no
  published rate. Raw phone numbers appear only in the header, footer and hero
  fine print.
- No carrier support routing — nothing tells a visitor to contact Sonic for
  billing, outages or support.
- No Broadband Facts links, no "pricing observed" date stamps, no
  "is this the official site?" FAQ, no competitor comparisons.
- The ZIP checker makes no availability claim; serviceability is confirmed at
  the street address.
- Every `tel:` link carries `data-call-cta` for call tracking.

---

## Project layout

```
app/          layout, page composition, global styles and brand tokens
components/   presentation only — no data, no image paths
lib/          content.ts, the single source of truth
public/images/ photography (optimized JPEG, re-encoded again by next/image)
ai.wing       running change log and architecture record
```

## ai.wing

`ai.wing` records every structural change, the reasoning behind it, and the
problems found along the way — including the content audit against sonic.com
that determined which service lines exist. Read it before making significant
changes.
