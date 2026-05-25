# Volt Gießen – Active Workspace

## Project
- Static HTML/CSS/JS website for Volt Gießen (municipal politics, Germany)
- German-language content; no framework, no bundler
- GitHub remote: `https://github.com/SlavaYa-blip/Volt_Page_Beta.git`

## Architecture
```
index.html            — main landing page
klimabericht.html     — climate report page
css/
  variables.css       — design tokens (colors, spacing, fonts)
  base.css            — resets, typography
  layout.css          — grid, nav, sections
  animations.css      — transitions, keyframes
  components/         — per-component styles
  pages/              — per-page overrides
js/
  app.js              — entry point
  router.js           — client-side routing
  store.js            — lightweight state
  components/         — component JS
  pages/              — page-specific logic
assets/               — images, logos, icons
```

## Stack
- Vanilla JS (ES modules via `<script type="module">`)
- CSS custom properties for theming (light/dark)
- Fonts: Montserrat + Ubuntu from Google Fonts
- Dev server: `npm start` → live-server on :3000

## Coding rules
- Prefer small, targeted diffs; avoid full-file rewrites
- Before multi-file edits, propose a 1–3 step plan first
- Keep German-language copy intact; do not translate
- CSS: use existing variables from `variables.css`; don't hardcode colors
- JS: no external dependencies; keep modules small and focused
- No comments unless the WHY is non-obvious

## Prompting patterns that work well
- "Fix [selected block], minimal diff, code only"
- "Using @css/variables.css and @css/layout.css, adjust [X]"
- "Propose a plan for [feature] before editing any files"
- "Explain this and list accessibility/contrast risks"

## Instagram Carousel Workflow (Canva)

Vorlagen für Instagram-Carousel-Posts des Volt Hessen Kreisverbandes Gießen.

### Canva Master-Template

- **Design-ID:** `DAHAFCLH9js`
- **Name:** "Copy of Allgemeine Vorlage Volt Hessen" (77 Seiten)
- Vollständiges Seiten-Mapping → `assets/Recherche/volt-template-mapping.md`

### Seiten-Übersicht nach Farbe

| Farbe | Thema | Cover-Seite | Fakten-Box-Seite |
|---|---|---|---|
| Gelb | Politik / Forderungen | 1 | 3 |
| Cyan | Forschung / Bildung | 9 | 5 |
| Grün | Klima / Umwelt | 9 | 10–11 |
| Orange/Pink | Soziales | 17 | 18 |
| Pink/Magenta | Wahlen / Mobilisierung | 15 | 18 |
| Cyan (groß) | Faktenchecks | 9 | 57 |

### Workflow: Neues Carousel erstellen

1. `copy-design` mit ID `DAHAFCLH9js`, pages = [Cover-Seite, Fakten-Seite]
2. `start-editing-transaction`
3. `perform-editing-operations`:
   - `update_title` → interner Name
   - Cover-Titel → Hauptüberschrift (kurz & prägnant)
   - Cover-Banner → Slogan (**max ~40 Zeichen**, sonst Overflow!)
   - Fakten-Titel → Zwischenüberschrift
   - Fakten-Text → Fakten (mit `\n\n` trennen)
4. `commit-editing-transaction`

### Bereits erstellte Designs

| ID | Design-ID | Thema | Farbe |
|---|---|---|---|
| C1 | DAHKmbue0Mo | Strukturfonds & Stadtentwicklung | Gelb |
| C2 | DAHKmfmLnPM | Philosophenhöhe | Grün |
| C3 | DAHKmSLLIkI | Frauenhäuser & Soziales | Orange/Pink |
| C4 | DAHKmQHDv-o | JLU Forschungsförderung | Cyan |
| C5 | DAHKmQkhhgA | JLU Forschung | Gelb |
| C6 | DAHKmYDJvuY | Erasmus & Bildung | Pink/Magenta |
| C7 | DAHKmTbCxHE | Wasserqualität & Umweltrecht | Cyan |
