---
kind: frontend_style
name: Bootstrap-First CSS with Custom Overrides and Pure-CSS Star Rating
category: frontend_style
scope:
    - '**'
source_files:
    - views/layouts/boilerplate.ejs
    - public/css/style.css
    - public/css/rating.css
    - public/css/js/index.js
---

The frontend styling of the wanderLust platform follows a Bootstrap-first approach layered with custom CSS overrides, rather than a component library or design-token system.

**System & tooling**
- **CSS methodology**: Plain CSS files under `public/css/`. No preprocessors (SCSS/Less), no CSS-in-JS, no utility-first framework. Styles are written as flat selectors with BEM-like class names (e.g., `.listing-card`, `.f-info-links`).
- **Base UI framework**: Bootstrap 5.3 loaded via CDN in `views/layouts/boilerplate.ejs` for grid, cards, forms, navbar, and utilities. The app relies on Bootstrap's default components and only tweaks them through custom classes.
- **Icons**: Font Awesome 7 via CDN (`fa-compass`, social icons).
- **Typography**: Google Fonts — "Plus Jakarta Sans" loaded from Google Fonts CDN.
- **Interactive widgets**: A pure-CSS star rating widget implemented in `public/css/rating.css` using hidden radio inputs, sibling selectors, and base64-encoded sprite images; no JavaScript dependency.
- **Client-side JS**: Minimal vanilla JS in `public/css/js/index.js` that enables Bootstrap's client-side form validation by adding the `was-validated` class to `.needs-validation` forms.

**Key files**
- `views/layouts/boilerplate.ejs` — single layout that wires all external assets (Bootstrap CSS/JS, Font Awesome, Google Fonts) and includes the two local stylesheets.
- `public/css/style.css` — global overrides: body flex column layout, navbar/footer styling, listing card image sizing, responsive breakpoints, accent color `#fe424d`, and small-screen adjustments for filters/map.
- `public/css/rating.css` — self-contained star-rating stylesheet (input + label sprite technique).
- `public/css/js/index.js` — Bootstrap form validation helper.

**Architecture & conventions**
- All page HTML is server-rendered EJS templates under `views/`; there is no SPA build step or asset bundler.
- Global style surface area is intentionally small — most visual structure comes from Bootstrap classes applied directly in EJS partials (`includes/navbar.ejs`, `includes/footer.ejs`) and feature views (`listings/*.ejs`, `users/*.ejs`).
- Responsive strategy uses Bootstrap's built-in breakpoints plus a few custom `@media` rules in `style.css` for listing images and filter bar behavior.
- There is no centralized theme file, CSS variables, or design-token registry; colors and spacing are repeated as literal values (e.g., `#fe424d`, `1rem`, `20rem`).

**Rules developers should follow**
- Prefer existing Bootstrap classes for layout and components; add new custom CSS only when overriding Bootstrap defaults.
- Keep custom styles in `public/css/style.css` (or a new file linked from `boilerplate.ejs`) and use descriptive, scoped class names rather than element selectors.
- Do not introduce CSS preprocessors or build tools — keep the stack simple and served statically.
- For interactive features, write plain vanilla JS in `public/css/js/` and attach it via the script tag already present in the layout.