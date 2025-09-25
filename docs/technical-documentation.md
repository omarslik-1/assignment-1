# Technical Documentation

## Architecture
- **index.html**: Single‑page portfolio with sections (Hero, About, Projects, Contact).
- **css/styles.css**: Base variables, layout utilities, responsive grid, components (cards, form, header, footer).
- **js/script.js**: Theme toggle, greeting, smooth scroll, mobile nav toggle, basic form validation.

## CSS Strategy
- CSS custom properties for theming (dark/light)
- Grid + Flexbox for layout
- Mobile‑first media queries with breakpoints at 760px and 900px
- Utility classes: `.stack`, `.gap-2`, `.container`, `.narrow`

## JavaScript Features
- `localStorage` for theme preference
- Greeting based on local time
- Smooth scrolling and hash update
- Simple, accessible mobile menu
- Client‑side validation for form fields

## Accessibility
- Skip link to main content
- Clear labels and hints for form inputs
- Sufficient color contrast (test in both themes)
- Semantic headings and landmarks (header/main/footer)

## Performance Notes
- Lightweight, no large frameworks
- SVG placeholder images
- Avoids render‑blocking JS; minimal script at bottom

## Compatibility
- Tested on recent Chrome/Firefox/Edge
- Progressive enhancement: works without JS but with reduced features

## How to Extend
- Add Skills section (badges/progress)
- Replace placeholders with real projects
- Connect a backend or form service for Contact
