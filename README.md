# Scallop — Original Landing Page Concept

An original, premium landing page for **Scallop**, the next generation money market built on **Sui**. This is an independent design and implementation — not a clone of scallop.io — created to communicate Scallop's lending, borrowing, sCoins, flash loans and developer tooling with a distinctive underwater-inspired visual system.

> **Disclaimer:** This project is an independently created landing-page concept. Scallop trademarks, logos and brand assets belong to their respective owners. No official endorsement is implied.

---

## Preview

Open `index.html` directly or run a local static server (see below). The page is fully responsive, motion-aware, and dependency-free.

---

## Purpose

- Present Scallop accurately to newcomers without copying the existing site's layout.
- Build a fresh art direction: Ocean Navy depth, typographic hierarchy, breathing scallop-shell hero, and restrained bubble motion.
- Keep every figure, feature and audit claim verifiable against official Scallop sources.

## Key Features

- **Original hero** with a stylized scallop shell that gently opens/closes (CSS transforms) and releases translucent bubbles. Floating metric cards add context without blocking interaction.
- **Ambient bubble canvas** — lightweight `canvas` field of drifting, specular bubbles with varied size, speed and hue; disabled under `prefers-reduced-motion`.
- **Recomposed product showcase** — real app screenshots (Lending, Collateral, Liquid-Stake, veSCA) presented in an original browser-chrome tab switcher; data stays true to the screenshots.
- **How it works** — three-step journey (Supply → Choose how you earn → Borrow) with clear separation of *Supply* vs *Deposit as collateral*.
- **Bento feature grid** — varied cards for Lending/Borrowing, sCoins, Flash Loans, Liquid Staking (scaSUI), and a dark developer card with SDK snippet.
- **Statistics strip + protocol glance** — TVL, supply, collateral, borrow figures reproduced as a dated snapshot with an explicit freshness note.
- **Security & Trust** — OtterSec / Zellic / MoveBit audits with precise language, plus link to the open-source `sui-lending-protocol` repo.
- **Sui ecosystem** — listing venues and integrations without invented partnerships.
- **Responsive, accessible, vanilla** — semantic HTML, keyboard-navigable tabs and nav, focus states, reduced-motion support, no framework.

## Technology Stack

- **HTML5** — semantic, accessible markup
- **CSS3** — custom properties, Grid/Flex, layered surfaces, CSS animations, `backdrop-filter`
- **Vanilla JavaScript** — mobile nav, tab switching, IntersectionObserver reveals, canvas bubbles
- **No dependencies** — no React, Vue, bundler or build step required
- **Fonts** — Fraunces (display) + Instrument Sans (body) + JetBrains Mono (code/meta) via Google Fonts

## Project Structure

```
scallop-landing-page/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── assets/
│   ├── logos/
│   │   ├── Scallop.svg
│   │   ├── logotype_primary_color.svg
│   │   ├── logotype_reversed_primary_color.svg
│   │   ├── sui-logo.svg
│   │   └── sui-icon.svg
│   ├── seaweed.png
│   └── screenshots/
│       ├── *Screenshot*.png  (7 app views)
└── README.md
```

Adapt the structure to files already present rather than moving assets unnecessarily — the page works from this layout as-is.

## Running Locally

No build step needed. Any static server works.

**Option A — Python:**
```bash
python -m http.server 8000
# then open http://localhost:8000
```

**Option B — Node (serve):**
```bash
npx serve .
```

**Option C — VS Code:**
Install “Live Server” and click **Go Live**.

Open `http://localhost:8000/index.html` (or the port your server prints).

## Customizing

### Colors

Edit the palette at the top of `css/style.css`:

```css
:root{
  --navy:#1E2D45;
  --twilight:#334664;
  --bubble:#9CD0DD;
  --white:#FFFFFF;
  --mist:#ABB0C0;
  --peach:#F1D6C8;
}
```

`--navy`/`--twilight` drive depth, `--bubble` is the primary action accent, `--peach` is a restrained warm accent. Adjust derivatives (`--bubble-strong`, `--twilight-2`, etc.) to keep hover and glow treatments consistent.

### Text & Headlines

Headlines are in `index.html` — hero title is `.hero__title`, section headings are `.h2`. Body copy uses `.lead` and standard `<p>` tags. All marketing claims are sourced from the official docs; verify before changing figures.

### Images & Logo Variants

- `logotype_reversed_primary_color.svg` — used on dark navy backgrounds (nav, footer)
- `logotype_primary_color.svg` — for light backgrounds if you add them
- `Scallop.svg` — the circular shell mark, used as favicon and in the hero art
- `sui-logo.svg` — Sui droplet, used in eyebrow and meta rows
- `seaweed.png` — decorative, low-opacity element in final CTA
- `assets/screenshots/*.png` — genuine app captures; keep the `showcase` note about point-in-time data

Preserve SVG aspect ratios and transparency. Do not stretch logos.

### Links

Search `href="https://` in `index.html` to update externals. Verified destinations:

| Label | URL |
|---|---|
| App | https://sui.scallop.io/ |
| Website | https://www.scallop.io/ |
| Docs | https://docs.scallop.io/ |
| Audits | https://docs.scallop.io/resources/audits |
| Lending Protocol | https://github.com/scallop-io/sui-lending-protocol |
| SDK | https://github.com/scallop-io/sui-scallop-sdk |
| Sui Kit | https://github.com/scallop-io/sui-kit |
| API Docs | https://sui.apis.scallop.io/api-docs/ |

Social links in the footer point to `x.com/Scallop_io`, `discord.gg/scallop`, `t.me/scallop_io`, `github.com/scallop-io` — verify before publishing.

### Statistics

Figures in the strip and **Protocol at a glance** are snapshots from screenshots dated 13 Oct 2026 (e.g. TVL $10.26M, Supply $7.35M). The page explicitly labels them as point-in-time. To update:

1. Take a fresh screenshot from `sui.scallop.io` (Overview) and `scallop.io`.
2. Replace the numbers in `.strip__v` and `.sg__v`.
3. Update the date in `.strip__note`.

Do not present manually entered figures as live on-chain data.

## Asset Organization & Usage

- **SVGs** are official brand assets — use as-is, do not recolor the circular shell mark beyond the provided variants.
- **Screenshots** are references re-composed inside an original browser chrome; surrounding layout, tabs and copy are original.
- **Seaweed / bubble motifs** are atmospheric accents at low opacity with `pointer-events: none` where decorative.

## Responsive Design & Accessibility

- Breakpoints at ~980px, 900px, 620px, 520px — tested for mobile, tablet, laptop, desktop.
- Mobile nav uses a burger button with `aria-expanded` and focusable links.
- Tab switcher uses `role="tablist"`/`role="tab"` with `aria-selected`.
- Color contrast targets WCAG AA on navy and sand surfaces; `--mist` text is only used on dark backgrounds at sufficient size/weight.
- `prefers-reduced-motion` disables shell breathing, bubble canvas, float cards and reveal transitions.
- Decorative canvas and grain have `aria-hidden="true"` and `pointer-events: none`.

## Deployment (Static)

The site is fully static — deploy the folder contents to any static host.

**Vercel / Netlify / Cloudflare Pages:**
- Build command: *(none)*
- Output directory: `/` (root)
- Publish `index.html`, `css/`, `js/`, `assets/`

**GitHub Pages:**
```bash
git init
git add .
git commit -m "Scallop landing — original concept"
git branch -M main
git remote add origin https://github.com/<you>/scallop-landing.git
git push -u origin main
# then enable Pages → Deploy from branch → / (root)
```

**Manual (S3, Nginx, etc.):** upload the folder; ensure MIME types for `.svg` (`image/svg+xml`) and `.js` (`text/javascript`) are set.

## Official Scallop Resources

- Website: https://www.scallop.io/
- App: https://sui.scallop.io/
- Docs: https://docs.scallop.io/
- Lending Protocol: https://github.com/scallop-io/sui-lending-protocol
- SDK: https://github.com/scallop-io/sui-scallop-sdk
- Sui Kit: https://github.com/scallop-io/sui-kit
- APIs: https://sui.apis.scallop.io/api-docs/

## Design Choices (Author’s Notes)

Original decisions made for this concept (not official Scallop specifications):

- Headline “Capital that breathes.” frames Scallop as a living money market — adaptive rates, breathing shell, bubbles as liquidity metaphor.
- Hero shell is an abstract SVG interpretation (not the detailed brand mark) so it can breathe cleanly at any size; the official `Scallop.svg` is preserved separately as favicon and in the footer mark.
- Bubbles use a cool blue-pink hue range (≈195–209°) with radial highlights to echo `var(--bubble)` without being flat circles.
- Sand/peach is used only for warmth (pill highlights, pearl, code accents) — never as a competing CTA.
- Statistics are deliberately shown as a *strip* and a *glance grid* rather than live widgets to avoid implying this static page reads on-chain data.

## License & Attribution

Code in this repository (HTML/CSS/JS structure and original styles) is provided as-is for demonstration and portfolio use. Scallop’s name, logos and screenshots remain the property of Scallop and their respective owners. If you fork or publish, keep the disclaimer and do not represent the page as an official Scallop property.

---

Built with care for the Sui ecosystem. Questions or tweaks? Open `index.html` and make it yours.
