# PEF Website Design Handoff for MagicPath

## Project

This is the **Packaging Equipment and Films (PEF)** website redesign.

The current design direction is already partially implemented in code. The goal for MagicPath is to **continue designing from the current state**, not restart from scratch.

Please keep the **same overall website structure, color system, typography, and visual language** described below.

## Core Design Direction

- B2B packaging / industrial services website
- Feels modern, credible, visual, and practical
- Should be **visual, not text-heavy**
- Should communicate **confidence, trust, support, responsiveness, and problem solving**
- Should feel more like a polished industrial solutions company than a generic distributor
- Avoid anything that feels overly corporate, overly tech-startup, or overly decorative

## Technology Context

The live front-end is built with:

- `HTML`
- `Bootstrap 5.3`
- reusable `HTML partials`
- minimal custom CSS in `assets/css/main.css`
- a small JS template loader

Important constraint:

- **Bootstrap should do most of the work**
- custom CSS should be used only when Bootstrap cannot reasonably achieve the result

## Current Typography

Use these exact fonts:

- **Headings:** `Sora`
- **Body/UI text:** `Inter`

Current implementation intent:

- `Sora` for headings, buttons, and key emphasis
- `Inter` for paragraphs, supporting copy, navigation, and general interface text

## Current Color System

These are the active brand/design colors in the current implementation:

- **Primary blue:** `#0e4ea6`
- **Primary blue gradient range:**
  - `#1f74ff`
  - `#1360d9`
  - `#0c4db0`
- **Secondary yellow/gold:** `#f2b233`
- **Secondary gradient range:**
  - `#ffd25a`
  - `#f2b233`
  - `#d79818`
- **Dark ink / text:** `#15304d`
- **Soft light blue background:** `#eef4fb`
- **Border / subtle divider:** `#d8e3f0`
- **Hero dark overlay:** `rgba(11, 38, 74, 0.68)`

## Current Button Language

There is already a visual button system in place. Please continue that language.

### Primary CTA shape

- Angular / clipped shape
- Slightly softened corners
- Blue gradient
- Uppercase, bold, compact text
- Industrial and custom, but not flashy

### Secondary CTA shape

- Same angular concept as the primary CTA
- Uses the **secondary yellow/gold gradient**
- Same sizing logic and overall silhouette

### Video play button

- Circular
- Uses the **same blue gradient family as the primary CTA**
- Centered over the intro video cover
- Clean and simple, no large text card over it

## Current Homepage Structure

MagicPath should preserve this homepage structure:

1. `Header / Navbar`
2. `Hero`
3. `Greeting From Bill / Intro Video`
4. `Main Solutions`
5. `What Help Do You Need?`
6. `Why / Stats`
7. `PackTalk`
8. `Testimonials / Reviews`
9. `Partner Logos`
10. `Midwest Map`
11. `Bottom CTA`

Do not invent a totally different homepage flow unless specifically asked later.

## Current Partial Structure

The site is currently organized into these reusable sections:

- `partials/header.html`
- `partials/hero.html`
- `partials/intro-video.html`
- `partials/main-cards.html`
- `partials/help-needed.html`
- `partials/stats.html`
- `partials/packtalk.html`
- `partials/testimonials.html`
- `partials/partner-logos.html`
- `partials/midwest-map.html`
- `partials/bottom-cta.html`

## Current Header / Navbar Intent

- White sticky header
- Compact custom brand mark with:
  - `PEF`
  - `Since 1985`
  - `Packaging Equipment and Films`
- Nav links:
  - About
  - Equipment
  - Materials
  - Parts & Service
  - Resources
- One primary CTA only:
  - `Give Us a Call`

Navbar notes:

- Clean and compact
- Should feel more refined than default Bootstrap
- Navigation text should stay in `Inter`
- CTA uses the custom angular blue button treatment

## Current Hero Intent

### Background image

Current hero image:

- `/assets/img/pef-home-banner-2.webp`

### Copy

- Eyebrow:
  - `Where Supply Meets Support`
- H1:
  - `Midwest's Leading Independent Packaging Distributor`
- Supporting text:
  - `Packaging equipment, packaging materials, parts, repair, and practical guidance from a team that helps you move faster and solve problems with confidence.`

### CTA row

- Primary:
  - `Talk to PEF`
- Secondary:
  - `Explore Solutions`

### Hero design notes

- Keep it clean and strong
- Avoid clutter
- Keep spacing balanced
- Text should feel prominent but not cramped
- CTA row should use the same custom button system

## Current Intro Section Intent

### Left side

- Bill Baitinger video cover image
- Centered circular play button

Current image:

- `/assets/img/bill-baitinger-video-cover.webp`

### Right side

- Eyebrow:
  - `Greeting From Bill`
- H2:
  - `Your Partner in Packaging. Helping People Make Better Decisions.`
- Lead paragraph:
  - `Your trusted Midwest packaging automation and optimization partner that reduces downtime, labor costs, and packaging inefficiencies.`
- Body paragraph:
  - `PEF helps manufacturers, distributors, and logistics teams choose the right equipment, materials, and support so packaging keeps moving without unnecessary complexity.`

### Benefit pills

The section currently includes 3 benefit pills:

- `Reduce downtime`
- `Lower labor costs`
- `Solve packaging inefficiencies`

### Intro design notes

- Needs balanced spacing between image and text
- Image and copy should feel equal in importance
- Avoid oversized custom typography tricks when Bootstrap utilities can do the job
- Benefit pills should remain compact and readable

## Current Main Solutions Intent

Section headline:

- Eyebrow:
  - `Main Solutions`
- H2:
  - `Six Ways PEF Helps Keep Packaging Moving`
- Supporting line:
  - `Explore the core areas where PEF helps packaging operations improve speed, reliability, and day-to-day support.`

Current 6 cards:

1. `Packaging Equipment`
2. `Packaging Materials`
3. `Parts and Repair`
4. `Specials on Used Equipment`
5. `Packaging Solutions`
6. `Featured Packaging`

Each card currently has:

- strong background photo
- dark overlay
- small micro-label above title
- concise supporting line

Micro-labels currently used:

- Machines
- Consumables
- Support
- Value
- Guidance
- Results

### Main Solutions design notes

- Should feel highly visual
- Cards should be easy to scan
- Copy should stay concise
- Avoid turning this into dense text blocks

## Current “What Help Do You Need?” Intent

This section is a quick decision-support grid with 4 paths:

- I Need Equipment
- I Need Materials
- I Need Parts or Repair
- I Need Packaging Guidance

It should feel like a fast routing tool, not a long explanation.

## Current Stats Section Intent

Current highlights:

- `1985` — Serving customers since 1985
- `12k+` — Service records supported
- `3k+` — Machines worked on

This section should communicate credibility quickly.

## Current PackTalk Intent

This is the content/insights section.

- Eyebrow:
  - `PackTalk`
- H2:
  - `Tips, Tricks & Packaging Insights`
- Positioned as a monthly video / educational content area

Keep it practical and useful, not bloggy for the sake of being bloggy.

## Current Testimonials Intent

- 3 quote cards
- Clean, calm, trust-building
- More practical than emotional

## Current Partner Logos Intent

- Vendor / provider credibility area
- Quiet visual treatment
- Should not overpower the page

## Current Midwest Map Intent

- Regional credibility section
- Indiana / Midwest positioning
- Reinforces local support and geographic focus

## Current Bottom CTA Intent

- Eyebrow:
  - `Free Packaging Analysis`
- H2:
  - `Do You Know What You're Paying Per Load?`
- Supporting copy about reducing waste, downtime, and improving packaging setup

## Image / Asset Context

Current key local assets already in use:

- Hero:
  - `/assets/img/pef-home-banner-2.webp`
- Intro video cover:
  - `/assets/img/bill-baitinger-video-cover.webp`

Many other sections still use temporary placeholder images. MagicPath should preserve the overall visual direction, but can refine image choice if needed while staying aligned with the industrial / packaging context.

## Visual Behavior to Preserve

- Custom angular CTA language
- Blue-led palette with yellow as secondary emphasis
- Sora + Inter typography pairing
- Rounded corners generally around `0.7rem` to `1rem`, not overly soft
- Strong image-led sections
- Confident but not flashy UI
- More spacious than the original PEF site

## Things to Avoid

- Do not redesign this into a generic SaaS landing page
- Do not make it overly text-heavy
- Do not switch away from the current font pair
- Do not replace the blue-led palette
- Do not introduce a bunch of decorative cards-within-cards patterns
- Do not overuse custom CSS when Bootstrap utilities/classes can solve the layout
- Do not replace the existing homepage structure

## If MagicPath Needs a Simple Summary

Continue the current PEF homepage design using:

- the **existing homepage structure**
- the **same blue/yellow brand palette**
- **Sora** for headings and **Inter** for body text
- the **same custom angular CTA system**
- a **visual, industrial, modern** tone
- Bootstrap-style spacing, layout, and hierarchy

This should feel like a polished packaging/industrial solutions site that is practical, trustworthy, and visually confident.
