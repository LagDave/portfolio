# Rustine Dave Portfolio Changelog

All notable changes to the Rustine Dave Portfolio are documented here.

## [0.0.1] - July 2026

### Stack Pyramid Rebuild

The Stack section's broken pyramid became the centerpiece interaction: a continuous seven-layer silhouette with a pointed apex cap, an animated connector that draws from the active fragment's slanted edge to the sticky explanation card, per-fragment technology trays with full-color brand logos (the design system's single sanctioned chroma), a drafting-style tower crane tied into the slope that hoists a fragment block to the summit on a synchronized loop, and a mobile accordion that expands each fragment's explanation and logos inline, one at a time.

**Key Changes:**
- Rebuilt the pyramid as stacked trapezoids with monotonic widths and edge-continuous clip paths; centered fragment text; centered section heading with breathing room above the new pointed apex
- Fixed the invisible connector (Framer Motion pathLength/dasharray conflict) and made it prominent in both themes, starting on the visible slab edge via a measured edge inset
- Added per-fragment "preferred tools" trays: React/TS/Tailwind/Vite, Node/Express, PostgreSQL/Knex/Redis/MongoDB/MSSQL, AWS/GCP/Azure/Vercel/Docker/GH Actions/Cloudflare, Auth0/Cloudflare/Sentry, Figma/Framer Motion/GSAP, Claude Code/Codex/Gemini/Kimi/Copilot — with vendor-removed marks (AWS, Azure, MSSQL, OpenAI) inlined from an archived icon set and near-black marks auto-flipping to light ink in dark mode
- Added the tower crane scene: lattice mast, tie-in braces ending on the slope corner line, jib stopping short of the crown, and a load-lift-slide-place-return cycle on one shared timeline
- Mobile: tap-to-expand accordion panels replace the stacked card; desktop card/connector/tray untouched
- Hardened the connector hook (synchronous first measure; rAF only coalesces bursts) and stabilized the sticky card against remount ghosts

**Commits:**
- `60eda78` — `src/components/Technologies.tsx` (full section rebuild), `src/hooks/useElementConnector.ts` (edge-inset + sync measure), `simple-icons` dependency, plan folder with spec (9 revisions), acceptance results, and evidence
- `f472f97` — hero lab card fixes (balanced description wrap, Explore chip removed), contact/resume/config updates, lab imagery

### Agentic Workflow Section

The "Speed with Structure" slab now shows the system instead of claiming virtues: a five-stage command-gated pipeline (Explore, Plan, Execute, Verify, Finalize) with command chips, a provenance note that the system predates today's agents, a "Learn the workflow" modal covering all twelve commands, the artifact contract, and a Code Constitution summary, plus a downloadable company-neutral AGENTS.md. The Code Constitution is offered on request, tailored per stack.

**Key Changes:**
- Replaced the Speed/Structure/Accountability tiles with the real five-stage workflow pipeline; section reframed as "How I harness AI" while keeping the original headline
- Accessible modal (Esc/backdrop/X close, body-scroll lock) explaining every command, spec-code parity, acceptance gating, and the §N.M Constitution model
- Authored `public/files/AGENTS.md`: the full controlled-agentic-engineering manual, scrubbed of all company, client, and personal identifiers
- Removed every em dash from the section's copy per voice preference

**Commits:**
- `e21321e` — `src/components/SpeedWithStructure.tsx` (pipeline, modal, actions), `public/files/AGENTS.md`, plan folder with spec (1 revision), acceptance results, and evidence
