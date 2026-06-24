---
name: Rustine Dave — Portfolio
description: Monochrome engineering-blueprint portfolio; tech-logo color is the only chroma.
colors:
  paper: "#ffffff"
  surface: "#f5f5f5"
  surface-elevated: "#ededed"
  hairline: "#e3e3e3"
  border: "#d4d4d4"
  muted-ink: "#595959"
  ink: "#1a1a1a"
  black: "#0a0a0a"
  dark-bg: "#0a0a0a"
  dark-surface: "#161616"
  dark-surface-elevated: "#1f1f1f"
  dark-hairline: "#262626"
  dark-border: "#2e2e2e"
  dark-muted-ink: "#9a9a9a"
  dark-ink: "#ededed"
  white: "#ffffff"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.5rem, 6vw, 5rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(1.9rem, 3.5vw, 3rem)"
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: "-0.015em"
  title:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Plus Jakarta Sans, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.62
    letterSpacing: "normal"
  label:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "0.04em"
rounded:
  none: "0px"
  sm: "2px"
  md: "6px"
  lg: "10px"
  pill: "999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
  xxl: "112px"
components:
  button-primary:
    backgroundColor: "{colors.black}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-primary-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.white}"
  button-ghost:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px 28px"
  button-ghost-hover:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.black}"
  chip:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.muted-ink}"
    rounded: "{rounded.pill}"
    padding: "6px 14px"
  input:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "14px 18px"
  card:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "28px"
---

# Design System: Rustine Dave — Portfolio

## 1. Overview

**Creative North Star: "The Engineering Blueprint"**

This is the portfolio of an engineer who started before AI was the default copilot and now uses it as a power tool. The interface has to *be* the proof of that thesis — so it is built like a precise technical drawing: a true white drafting surface, black ink, a measured grid, hairline rules, and monospace coordinate labels that read like callouts on a schematic. Nothing is decorative; everything looks placed. The serif display type (Playfair Display) supplies confidence and editorial weight at the headline scale, while a clean humanist sans (Plus Jakarta Sans) carries the reading, and a technical monospace (JetBrains Mono) annotates. The result should feel like the cover sheet of a beautifully engineered drawing set, not a SaaS landing page.

The system is **monochrome by doctrine**. Black, white, and a calibrated grey ramp do all the structural work. The *only* chroma permitted anywhere in the product is the brand color of the technology logos themselves — React's cyan, TypeScript's blue, Postgres' indigo — rendered in full color against the grey field so they read as the one place the engineer's actual toolset lights up. This is the memorable move: a strictly black-and-white world where the tools are the only thing in color.

This system explicitly rejects: the **generic SaaS / purple-gradient template** (no gradient text, no glass cards by default, no hero-metric cliché); the **crowded dev portfolio** (no skill bars, no badge walls, no busy timelines); the **flashy neon cyberpunk** look (no glow-on-black spectacle); and the **corporate stock-photo agency** feel (no stock imagery, no committee blandness). Motion is treated as engineering, not garnish — a Three.js wireframe field, GSAP scroll choreography, and Framer Motion micro-interactions are part of the build, tuned to feel smooth and inevitable, with full reduced-motion fallbacks.

**Key Characteristics:**
- True-neutral monochrome surface; tech-logo brand color is the sole accent.
- Serif display (Playfair) + humanist sans body (Plus Jakarta) + technical mono (JetBrains Mono).
- Visible measured grid, hairline rules, mono coordinate/section labels.
- Crisp corners, generous negative space, drafting-set restraint.
- Motion is engineered (Three.js / GSAP / Framer Motion), never ornamental.

## 2. Colors

A true-neutral (chroma-zero) greyscale carries the entire interface; warmth and coolness are deliberately absent so the technology logos are the only thing that ever reads as "color."

### Primary
- **Drafting White** (`#ffffff`, oklch(1 0 0)): The default body surface (light mode). The drawing paper. Most of the screen is this.
- **Schematic Ink** (`#1a1a1a`, oklch(0.21 0 0)): Primary body text and most UI strokes in light mode. Near-black, ~15:1 on white.
- **Pure Black** (`#0a0a0a`, oklch(0.13 0 0)): Display headings, primary buttons, the hardest structural lines.

### Secondary
- **Tech-Logo Color** (varies — e.g. React `#61DAFB`, TypeScript `#3178C6`): The single sanctioned chroma. Applied *only* to technology logo marks, at full saturation, never to UI chrome, text, borders, or backgrounds.

### Neutral
- **Surface Grey** (`#f5f5f5`, oklch(0.97 0 0)): Recessed panels, alternating section fills, input wells.
- **Elevated Grey** (`#ededed`, oklch(0.94 0 0)): Cards and raised tiles in light mode.
- **Hairline** (`#e3e3e3`, oklch(0.89 0 0)): The measured grid and 1px drafting rules.
- **Border** (`#d4d4d4`, oklch(0.84 0 0)): Stronger dividers and resting component outlines.
- **Muted Ink** (`#595959`, oklch(0.46 0 0)): Secondary/caption text. Holds ≥7:1 on white — never lighter than this for body-sized copy.

### Dark Mode (alternate; toggle preserved)
- **Carbon** (`#0a0a0a`): body surface. **Dark Surface** (`#161616`) / **Dark Elevated** (`#1f1f1f`): panels and cards. **Dark Hairline** (`#262626`) / **Dark Border** (`#2e2e2e`): grid and dividers. **Dark Muted Ink** (`#9a9a9a`, ~8:1 on carbon): captions. **Dark Ink** (`#ededed`): body text. **White** (`#ffffff`): display headings.

### Named Rules
**The Logos-Are-The-Only-Color Rule.** Chroma is forbidden on every surface except the technology logo marks. No accent color of our own — not on links, not on buttons, not on focus rings, not on a single dot. If something needs emphasis, use weight, size, or contrast within the greyscale. The day a non-logo element turns blue, the concept is broken.

**The True-Neutral Rule.** Every grey is chroma 0. No warm "paper" tint, no cool "slate" tint. Warm-neutral cream/sand/bone backgrounds are forbidden — they are the 2026 AI default and they fight the blueprint concept.

## 3. Typography

**Display Font:** Playfair Display (with Georgia, serif fallback)
**Body Font:** Plus Jakarta Sans (with system-ui, sans-serif fallback)
**Label/Mono Font:** JetBrains Mono (with ui-monospace fallback)

**Character:** A high-contrast transitional serif against a warm-but-precise geometric-humanist sans — paired on the contrast axis (serif vs sans), which is exactly the legitimate pairing logic. Playfair brings editorial confidence and a hand-set, considered authority that aligns with a senior-engineer voice; Plus Jakarta keeps the reading clean and contemporary; JetBrains Mono annotates like a drafting callout. Three families, three jobs, no overlap.

### Hierarchy
- **Display** (Playfair Display, 600, clamp(2.5rem → 5rem), line-height 1.02, tracking -0.02em): Hero and the single biggest statement per section. Use `text-wrap: balance`.
- **Headline** (Playfair Display, 600, clamp(1.9rem → 3rem), line-height 1.08): Section titles.
- **Title** (Plus Jakarta Sans, 600, 1.25rem, line-height 1.3): Card and sub-section titles. Sans here, on purpose, to separate it from the serif section headline.
- **Body** (Plus Jakarta Sans, 400, 1.0625rem, line-height 1.62): All reading copy. Cap measure at 65–75ch.
- **Label** (JetBrains Mono, 500, 0.75rem, tracking 0.04em, often uppercase): Technical annotations — section coordinates, captions, metadata, the typewriter line, form helper text.

### Named Rules
**The Mono-Is-For-Machines Rule.** JetBrains Mono is reserved for things a machine would print: coordinates, counts, file-style labels, status, the animated code line. Never set a sentence of prose in mono. It is annotation, not voice.

**The One-Serif-Statement Rule.** Playfair earns its drama by scarcity. One serif statement owns each viewport; everything supporting it is sans or mono. Do not set body paragraphs, buttons, or nav in the serif.

## 4. Elevation

Light mode is **flat by default**, with depth carried by the hairline grid and tonal layering (paper → surface → elevated) rather than shadow. Shadows are a *response to state*, not a resting style — they appear on hover/focus and on genuinely floating elements (nav-on-scroll, modals, the contact card). Dark mode leans entirely on tonal layering; shadows mostly disappear because there is no light to cast them, so separation comes from the surface ramp and hairline borders.

### Shadow Vocabulary
- **Lift** (`box-shadow: 0 1px 2px rgba(10,10,10,0.06), 0 8px 24px rgba(10,10,10,0.08)`): hover state on cards and tiles; the floating navbar after scroll.
- **Float** (`box-shadow: 0 12px 48px rgba(10,10,10,0.12)`): the contact card and any true overlay.

### Named Rules
**The Flat-By-Default Rule.** Surfaces rest flat with a 1px border. If a card has a shadow at rest, the shadow is wrong — remove it and let the hairline and the grey ramp do the separating. Shadows are earned by interaction.

## 5. Components

### Buttons
- **Shape:** Crisp, near-square (`6px` radius). No pill-shaped primary buttons.
- **Primary:** Pure Black (`#0a0a0a`) fill, white text, `14px 28px` padding, mono or sans label. In dark mode it inverts to white fill, black text.
- **Hover / Focus:** Lifts 2px with the **Lift** shadow; fill shifts black→Schematic Ink. `:focus-visible` shows a 2px offset solid black outline (white in dark mode) — never a colored ring.
- **Ghost / Secondary:** Transparent on paper, `1px` Border outline, ink text. Hover fills Surface Grey and darkens the border to ink.

### Chips / Tags
- **Style:** Paper background, `1px` Hairline border, Muted Ink mono text, pill radius. Genuinely flat.
- **State:** Hover darkens border to ink and text to black. No fill color, ever. (Replaces the old blue-tinted tag style.)

### Cards / Containers
- **Corner Style:** `10px` (lg) for content cards; `6px` for tighter tiles.
- **Background:** Paper or Elevated Grey in light; Dark Surface/Elevated in dark.
- **Shadow Strategy:** Flat at rest (per Elevation), **Lift** on hover.
- **Border:** Always a `1px` Hairline or Border. The border is the card, not the shadow.
- **Internal Padding:** `28px` (lg) standard; `16px` for compact.

### Inputs / Fields
- **Style:** `1px` Border on Paper, `6px` radius, ink text, Muted Ink placeholder (must still hit 4.5:1 — no light-grey placeholders).
- **Focus:** Border shifts to Pure Black + a subtle 1px inset; no colored glow. Mono helper text below.
- **Error / Disabled:** Error uses a heavier black border + mono error label (no red fill); disabled drops to Surface Grey with Border outline.

### Navigation
- **Style:** Transparent at top; after scroll, condenses to a Paper bar with a hairline bottom border and the **Lift** shadow. Links are sans, Muted Ink, hover to ink; the active link is ink with a 1px black underline indicator (animated with Framer Motion `layoutId`) — not a colored pill.
- **Mobile:** Hairline-bordered sheet, same monochrome rules.

### Signature: Blueprint Coordinate Label
A mono micro-label (JetBrains Mono, 0.75rem, uppercase, tracking 0.04em, Muted Ink) used as a section marker and around the Three.js canvas, formatted like a drafting callout (e.g. `[ 02 · ABOUT ]`, `X:1440 Y:900`). It is the brand's voice device — but it is a *deliberate system*, not an eyebrow on every block. Use it as an intentional cadence, not reflexively above every heading.

### Signature: Wireframe Field (Three.js)
A monochrome Three.js element (wireframe geometry / point field / line mesh) rendered in ink-on-paper (or white-on-carbon in dark). It animates slowly, reacts to pointer and scroll, and must degrade to a static rendered frame under `prefers-reduced-motion` and on low-power devices. It is structural atmosphere, never a colored spectacle.

## 6. Do's and Don'ts

### Do:
- **Do** keep every surface true-neutral greyscale (chroma 0) and let only the technology logos carry color, at full saturation.
- **Do** pair Playfair Display (serif, headlines only) with Plus Jakarta Sans (body) and JetBrains Mono (technical labels) — three jobs, no overlap.
- **Do** separate surfaces with a 1px hairline and the paper→surface→elevated ramp; reserve shadow for hover/focus and true overlays.
- **Do** treat motion as part of the build: Three.js wireframe atmosphere, GSAP scroll choreography, Framer Motion micro-interactions — each with a `prefers-reduced-motion` fallback.
- **Do** cap body measure at 65–75ch and hold body/caption text at ≥4.5:1 (Muted Ink `#595959` or darker on white).
- **Do** use the mono Blueprint Coordinate Label as a deliberate, occasional system.

### Don't:
- **Don't** introduce any accent color of our own — no blue links, buttons, focus rings, dots, or the old `electric #3b82f6`. The logos are the only color.
- **Don't** use `background-clip: text` gradient text (the old `.gradient-text` is removed) or any gradient as decoration.
- **Don't** ship the generic SaaS / purple-gradient template, glassmorphism-by-default, or the hero-metric cliché.
- **Don't** build the crowded dev-portfolio look — no skill bars, percentage meters, badge walls, or busy timelines.
- **Don't** go neon-cyberpunk (glow-on-black spectacle) or corporate stock-photo agency.
- **Don't** tint the neutrals warm ("paper/cream/sand/bone") or cool ("slate"); chroma stays at 0.
- **Don't** put a mono coordinate eyebrow above *every* section, and don't set prose in the serif or in mono.
- **Don't** gate content visibility behind a motion-triggered reveal; animate an already-visible default.
