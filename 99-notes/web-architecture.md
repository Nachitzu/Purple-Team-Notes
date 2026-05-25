---
title: Web Architecture
phase: notes
platform: web
tags: [web, architecture, static-site, html, tailwind]
risk: low
attack_tactic: NA
attack_technique: NA
data_sources: []
last_review: 2026-05-25
---

# Web Architecture

### Objetivo

Documentar la arquitectura del sitio web estático que hosteará el contenido del repositorio.

### Stack Recomendado

```
Frontend: HTML5 semántico + Tailwind CSS + Vanilla JS
Hostin: GitHub Pages (gratuito, CDN, SSL automático)
Generator: Eleventy (11ty) para Markdown → HTML
Search: Pagefind (local search, no server needed)
Indexing:build-time JSON index for search
```

### Estructura del Sitio

```
/
├── index.html           # Homepage with search + categories
├── cheat/
│   ├── recon/
│   │   ├── dns.html
│   │   └── ...
│   ├── explotacion/
│   │   └── ...
│   └── ...
├── search.html          # Dedicated search page
├── tags/                # Tag-based filtering
│   ├── linux.html
│   ├── windows.html
│   └── ...
└── assets/
    ├── css/
    ├── js/
    └── icons/
```

### Build Pipeline

```bash
# Eleventy build
npx @11ty/eleventy

# Pagefind indexing
pagefind --site _site

# Output: static HTML in _site/
```

### Key Features

```
- Full-text search local (no server, no external calls)
- Filter by: phase, platform, tags, ATT&CK tactic
- Responsive design (mobile-friendly for fieldwork)
- Fast (static HTML, no backend, no database)
- Dark mode compatible with Tailwind
- Print-friendly stylesheets for cheatsheets
```

### Frontmatter Schema (Metadata)

```yaml
---
title: DNS Reconnaissance
phase: recon
platform: multi
tags: [dns, recon, enumeration]
risk: low
attack_tactic: TA0043
attack_technique: T1016
data_sources: [passive-dns, network-traffic]
last_review: 2026-05-25
---
```

### Search Implementation

```javascript
// Pagefind example (generated at build)
import { search } from '/pagefind.js';

async function searchNotes(query) {
  let results = await search(query);
  displayResults(results.results);
}
```

### Future Enhancements (V2)

```
- Tag-based browsing
- ATT&CK navigator overlay (click on tactic → see available notes)
- Favorites/bookmarks (localStorage)
- Contribution workflow (PR-based)
- Export to PDF individual sheets
- Dark/light mode toggle
- Print button per page
```

### Publishing Workflow

```bash
# Development
npm run dev    # 11ty watch mode + pagefind dev

# Build
npm run build  # Eleventy + pagefind

# Deploy (GitHub Actions)
git push main → GitHub Pages auto-deploy
```

### Performance Targets

```
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3s
- Lighthouse Performance: > 90
- Page weight: < 500KB per page (excludes search index)
```
