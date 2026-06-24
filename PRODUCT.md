# Product

## Register

brand

## Users

Primarily **founders and hiring managers at startups** evaluating whether to hire or contract Rustine Dave for AI-augmented engineering work. They arrive skeptical and time-poor: they have seen a hundred "AI engineer" portfolios and want fast proof of real judgment, not buzzwords. Secondary viewers are engineering leaders at larger orgs and direct clients looking for someone who can ship quickly without leaving a mess behind. Context of use: scanning on a laptop between meetings, often after seeing a resume or referral, deciding in under 60 seconds whether to keep reading or reach out.

## Product Purpose

A personal portfolio that positions Rustine as an engineer who started before AI was the default copilot and now uses AI as a power tool — fast output without outsourcing thinking. Success is a qualified inbound: a founder or hiring manager who reads the hero, believes the "speed with structure" thesis because the site itself demonstrates it, and uses the contact form or resume link. The site is the argument; its own craft, performance, and restraint are the evidence.

## Brand Personality

**Precise · fast · grounded.** Engineering rigor plus AI speed, with zero hype. Voice is direct, confident, and plainspoken — the same register as the existing copy ("I ship systems that survive week 12", "Bring the idea. I'll bring the speed and the structure"). Pro-AI and just as pro-understanding. Never salesy, never breathless about the future. The emotional goal is *earned trust*: the visitor should feel they are looking at the work of a senior engineer who has nothing to prove and proves it anyway.

## Anti-references

- **Generic SaaS / purple-gradient template** — the default AI-slop landing look. No glassmorphism-by-default, no gradient text, no hero-metric template.
- **Crowded dev portfolio with skill bars and badges** — no percentage skill meters, no tech-stack badge walls, no busy multi-row timelines.
- **Flashy neon cyberpunk Dribbble shot** — no neon-on-black glow, no style-over-substance spectacle.
- **Corporate stock-photo agency site** — no soulless enterprise marketing, no stock imagery, no committee-design blandness.

## Design Principles

1. **Show the engineering, don't claim it.** The site's own performance, motion quality, and structural clarity are the proof of "speed with structure." If the copy says "built to last," the build must look and feel built to last.
2. **Restraint is the flex.** Monochrome confidence. Nothing decorative survives unless it earns its place. The discipline of black-white-grey is itself a signal of senior judgment.
3. **Senior judgment over hype.** Pro-AI without being a hype machine. Every claim is grounded; every effect is intentional, never a gimmick.
4. **Motion communicates competence.** Animation is not garnish — it is part of the argument. Each interaction should feel engineered, smooth, and purposeful, with graceful reduced-motion fallbacks.
5. **Respect the 60-second skim.** Lead with the thesis, make hierarchy obvious, and let a time-poor decision-maker reach "contact" convinced without reading everything.

## Accessibility & Inclusion

Target **WCAG 2.1 AA**. In a monochrome system the main contrast risk is grey-on-grey and muted body text on tinted surfaces — body text must hold ≥4.5:1, large text ≥3:1. Full keyboard navigation with visible `:focus-visible` states. Because the design is motion-heavy (Three.js, GSAP, Framer Motion), every animation must honor `prefers-reduced-motion: reduce` with a crossfade or instant fallback, and no content may be gated behind a motion-triggered reveal. The single accent color allowance — tech-logo brand colors — must never be the sole carrier of meaning.
