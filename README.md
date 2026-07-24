# AI Drop

A curated launch board for discovering recently released AI tools, apps, skills, and plugins. Built with React and Vite.

## Features

- **Tool of the Day** — A featured spotlight on the best new AI tool
- **Category Filtering** — Browse by Create, Code, Research, Automate, Work
- **Fresh Drops** — Recently added tools section
- **Newsletter Demo** — Local email validation with success confirmation
- **Bold Playful Design** — Chunky typography, thick borders, offset shadows, vibrant accents
- **Responsive** — Mobile-first with tablet and desktop layouts
- **Accessible** — Semantic HTML, keyboard navigation, focus-visible, reduced-motion support

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build |
| `npm test -- --run` | Run all tests once |

## Tech Stack

- **React 19** — UI components and state management
- **Vite 7** — Build tool and dev server
- **Vitest + Testing Library** — Unit and integration tests
- **CSS** — Responsive visual system with custom properties
- **Google Fonts** — DM Sans (body) + Space Grotesk (display)

## Project Structure

```
src/
├── main.jsx                 # React bootstrap
├── App.jsx                  # Page composition + filter state
├── App.test.jsx             # Integration tests
├── styles.css               # Visual system, layout, responsive
├── test/setup.js            # Test environment setup
├── data/tools.js            # Curated tools and categories
└── components/
    ├── Nav.jsx              # Responsive navigation
    ├── Hero.jsx             # Hero section with decorative accents
    ├── FeaturedTool.jsx     # Tool of the Day spotlight
    ├── CategoryFilter.jsx   # Accessible filter controls
    ├── ToolCard.jsx         # Reusable external-link card
    ├── ToolGrid.jsx         # Filtered card collection + empty state
    ├── FreshDrops.jsx       # Recently added products
    ├── Newsletter.jsx       # Email validation demo
    ├── Newsletter.test.jsx  # Newsletter interaction tests
    └── Footer.jsx           # Closing navigation and brand treatment
```

## Verification

- `npm test -- --run` — 7 tests pass (rendering, filtering, newsletter, links)
- `npm run build` — Production build completes successfully
- Mobile, tablet, and desktop responsive breakpoints
- Keyboard navigation with visible focus indicators
- External links use `target="_blank"` + `rel="noreferrer"`
- Newsletter validates email and shows success/error states
- `prefers-reduced-motion` disables animations
