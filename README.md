# TRG Snow Tech Training & Consulting LLC — Squarespace 7.0 Developer Mode

Production-ready custom template (JSON-T + LESS + JS) built from the Figma file  
[Square-Space-Projects (Copy) — TRG Snow Tech](https://www.figma.com/design/e71niymnNqDjjnIueQWLTx/Square-Space-Projects--Copy-?node-id=609-2).

Architecture follows the Alton Chocolates 7.0 pattern: coded visual fallbacks + labeled `squarespace:block-field` CMS slots.

## Design tokens (Figma)

| Token | Value |
|-------|-------|
| Primary 1 | `#2D5095` |
| Primary 2 | `#538DDB` |
| Text 1 / 2 / 3 | `#212121` / `#242B3C` / `#656464` |
| Background 1 / 2 / 3 | `#FFFFFF` / `#F3F2F0` / `#EEEEEE` |
| Font (Figma) | Graphik Trial → web fallback **DM Sans** |

## Page → Figma frame map

| Template page | URL (recommended) | Figma frame | Node |
|---------------|-------------------|-------------|------|
| `home.page` | `/` | Design 1 - Home | `611:435` |
| `training-consulting.page` | `/training-consulting` | Design 1 - Training & Consultation | `611:1010` |
| `mechanic-technician-training.page` | `/mechanic-technician-training` | Design 1 - Mechanic & Technician Training & Consultation | `619:2` |
| `snow-removal-operator-training.page` | `/snow-removal-operator-training` | Design 1 - Snow Removal Operator Training & Consultation | `619:361` |
| `fleet-management-training.page` | `/fleet-management-training` | Design 1 - Fleet Management Training & Consultation | `619:588` |
| `our-services.page` | `/our-services` | Design 1 - Our Services | `630:1090` |
| `snow-removal-services.page` | `/snow-removal-services` | Design 1 - Snow Removal Services | `629:103` |
| `fleet-management-services.page` | `/fleet-management-services` | Design 1 - Fleet Management Services | `630:380` |
| `equipment-evaluation-repair.page` | `/equipment-evaluation-repair` | Design 1 - Equipement Evaluations & Repair Services | `630:608` |
| `equipment-operators.page` | `/equipment-operators` | Design 1 - Equipement Operators | `630:867` |
| `about.page` | `/about` | *No dedicated frame* — composed from Home mission + Who We Serve | — |
| `gallery.page` | `/gallery` | *No dedicated frame* — composed from Home gallery section | — |
| `contact.page` | `/contact` | *No dedicated frame* — composed from Home quote form | — |

## Template structure

```
template.conf
site.region
pages/           # *.page + *.page.conf
blocks/          # site-header, site-footer, navigation, contact-form, …
styles/          # trg.less, cms-editable.less, variables.less
scripts/site.js
assets/          # images, icons, compiled trg.css + cms-editable.css
```

## CMS wiring (Squarespace)

1. Connect this repo as the site’s Developer Mode template (Squarespace Git).
2. Create pages in the CMS and assign each URL to the matching template layout / page file above.
3. Build **Main Navigation** (`mainNav`) in this order (matches Figma):  
   Home · About · Our Services · Training & Consulting · Gallery · Contact Us
4. Optional: configure **Footer Navigation** (`footerNav`) and **Footer Legal** (`footerLegal`).
5. Upload the logo under Design → Logo (falls back to `/assets/images/logo.png`).
6. On any page, open an `EDIT:` block field and add Text / Image / Button / Form blocks.  
   When real blocks are present, JS/CSS hide the coded fallback (`.has-cms`).
7. For the quote form, prefer a Squarespace **Form** block in the form slot (`contactQuoteForm` / `contactPageForm`) so submissions go through Squarespace.

## Dual-editable pattern

```html
<div class="trg-editable" data-trg-editable>
  <div class="trg-editable__fallback">…Figma markup…</div>
  <div class="trg-editable__cms">
    <squarespace:block-field id="uniqueId" columns="12" label="EDIT: …" />
  </div>
</div>
```

## Deploy notes

- Do **not** use 7.1 Fluid Engine as the primary layout system.
- Squarespace compiles `styles/*.less` from `template.conf`; `site.region` also loads `/assets/trg.css` and `/assets/cms-editable.css` for reliable production styling.
- Push to Squarespace Git only when you explicitly ask to commit/push.

## Present vs missing (summary)

See the checklist at the end of the build notes in chat. High-level:

- **Present:** All 10 Figma desktop page frames implemented; global top bar, header, footer; Home sections in Figma order; shared quote form; responsive breakpoints; CMS editable slots.
- **Gaps / notes:** Figma MCP rate-limited mid-build — page-specific photo assets beyond Home reuse Home imagery until you re-export from Figma; Graphik Trial replaced with DM Sans; About / Gallery / Contact have no dedicated Figma frames (composed from Home); no commerce/auth screens in Figma (not built).
