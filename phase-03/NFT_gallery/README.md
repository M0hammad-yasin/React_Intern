# NΞXUS — NFT Gallery

> A production-quality NFT Gallery application built with React + Vite, demonstrating clean architecture, responsive CSS Grid layouts, and professional UI/UX design.

![NEXUS NFT Gallery](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-4.4-646CFF?logo=vite&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-F7DF1E?logo=javascript&logoColor=black)
![CSS](https://img.shields.io/badge/CSS-Grid_+_Flexbox-1572B6?logo=css3&logoColor=white)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Architecture](#project-architecture)
- [Getting Started](#getting-started)
- [Design System](#design-system)
- [Component Documentation](#component-documentation)
- [Custom Hooks](#custom-hooks)
- [Responsive Design](#responsive-design)
- [Accessibility](#accessibility)
- [Performance](#performance)
- [Production Considerations](#production-considerations)

---

## Overview

NΞXUS is a fully interactive NFT gallery showcasing digital artwork with filtering, sorting, search, and detailed views. The project is built without any UI libraries — every component, layout, and animation is handcrafted in CSS, demonstrating deep frontend fundamentals.

**Live Features:**
- 12 unique NFTs with procedurally generated SVG artwork
- Real-time search across title, creator, category, and tags
- Category filter pills with animated state transitions
- Multi-field sorting (newest, price, likes)
- Full-screen detail modal with attributes, metadata, and purchase UI
- Wallet connect simulation
- Scroll-aware sticky navbar

---

## Features

| Feature | Details |
|---|---|
| **Gallery Grid** | CSS Grid with 4→3→2→1 responsive columns |
| **Search** | Filters by title, creator, category, tags in real-time |
| **Category Filters** | Pill buttons: All, Abstract, Generative, Photography, Pixel Art, 3D, AI Art |
| **Sort Options** | Newest, Oldest, Price High/Low, Most Liked |
| **NFT Detail Modal** | Full metadata, attributes, chain info, buy/bid actions |
| **Procedural Art** | Unique SVG artwork per NFT — no external images required |
| **Like System** | Toggle likes with animated counter |
| **Wallet Connect** | Simulated connect/disconnect with address truncation |
| **Responsive** | Mobile (320px+), tablet (768px+), desktop (1440px+) |
| **Accessibility** | ARIA labels, keyboard navigation, focus management, live regions |
| **Animations** | Staggered card entrance, hover effects, smooth transitions |

---

## Tech Stack

```
React 18          — UI framework (functional components, hooks)
Vite 4            — Build tool and dev server
JavaScript ES2022 — Language (no TypeScript for simplicity)
CSS Custom Props  — Design token system
CSS Grid          — Gallery layout
CSS Flexbox       — Component-level layout
SVG               — Procedural artwork generation
Google Fonts      — Syne (display) + DM Mono (code)
```

**No UI libraries.** All components built from scratch.

---

## Project Architecture

```
nft-gallery/
├── index.html                    # HTML entry, font imports
├── vite.config.js                # Vite configuration
├── package.json
│
└── src/
    ├── main.jsx                  # React root mount
    ├── App.jsx                   # Root: layout + state coordination
    │
    ├── styles/
    │   └── globals.css           # Design system: tokens, reset, animations
    │
    ├── data/
    │   └── nfts.js               # Mock NFT data + helper functions
    │
    ├── hooks/
    │   └── useFilter.js          # Custom hook: filter + sort + search logic
    │
    └── components/
        ├── Navbar.jsx / .css     # Sticky nav, wallet connect, mobile menu
        ├── HeroSection.jsx / .css # Hero banner, stats, decorative preview
        ├── FilterBar.jsx / .css  # Search input, category pills, sort select
        ├── Gallery.jsx / .css    # CSS Grid container
        ├── NFTCard.jsx / .css    # Individual NFT card (art + info + actions)
        ├── NFTArt.jsx            # SVG art generator (12 unique styles)
        ├── NFTModal.jsx / .css   # Full-screen detail view
        └── Footer.jsx / .css     # Site footer
```

### State Management

State is managed locally in `App.jsx` using React hooks, passed down as props. No external state library is needed at this scale.

```
App.jsx
│
├── selectedNFT (useState)       → controls NFTModal visibility
│
└── useFilter(nfts)
    ├── activeCategory (useState)
    ├── searchQuery (useState)
    ├── sortBy (useState)
    └── filtered (useMemo)       → derived from all three filters
```

---

## Getting Started

### Prerequisites

- Node.js >= 16
- npm >= 7

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/nft-gallery.git
cd nft-gallery

# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## Design System

All design tokens are defined as CSS custom properties in `src/styles/globals.css`.

### Color Palette

```css
/* Backgrounds — dark depth system */
--bg-void:     #080A0F   /* deepest layer */
--bg-deep:     #0D1117   /* modal/overlay background */
--bg-surface:  #111820   /* card backgrounds */
--bg-elevated: #182030   /* elevated elements */

/* Accent Colors */
--accent-cyan:   #00E5FF  /* primary CTA, active states */
--accent-gold:   #FFB830  /* price display */
--accent-violet: #9B6EFF  /* epic rarity, abstract art */
--accent-rose:   #FF4D8D  /* likes, live badges */
```

### Typography

| Role | Font | Weight |
|---|---|---|
| Display / Headings | Syne | 400–800 |
| Code / Metadata | DM Mono | 300–500 |

### Rarity Tiers

| Tier | Color |
|---|---|
| Legendary | `#FFB830` (Gold) |
| Epic | `#9B6EFF` (Violet) |
| Rare | `#00E5FF` (Cyan) |
| Uncommon | `#4DFFB4` (Mint) |
| Common | `#8A9BBE` (Steel) |

---

## Component Documentation

### `<Navbar />`

Sticky top navigation with scroll-aware background blur.

| Feature | Implementation |
|---|---|
| Scroll detection | `useEffect` + `window.scroll` event listener |
| Wallet connect | Local `useState` toggle with address truncation |
| Mobile menu | CSS `transform: translateY` transition |
| Underline hover | CSS `::after` pseudo-element with `right: 0 → 100%` |

---

### `<FilterBar />`

Combines three filter mechanisms.

| Prop | Type | Description |
|---|---|---|
| `activeCategory` | `string` | Currently selected category |
| `setActiveCategory` | `fn` | Category setter |
| `searchQuery` | `string` | Live search text |
| `setSearchQuery` | `fn` | Search setter |
| `sortBy` | `string` | Current sort key |
| `setSortBy` | `fn` | Sort setter |
| `filteredCount` | `number` | Number of visible results |
| `totalCount` | `number` | Total NFT count |
| `onReset` | `fn` | Reset all filters to defaults |

---

### `<NFTCard />`

Interactive card with hover states and like system.

| Feature | Implementation |
|---|---|
| Art display | `<NFTArt>` renders unique SVG per NFT |
| Like toggle | Local `useState` for liked + count |
| Stagger animation | `animation-delay: ${index * 60}ms` |
| Hover overlay | CSS `opacity: 0 → 1` + `translateY` on view button |
| Keyboard access | `onKeyDown` handler for Enter key |

---

### `<NFTArt />`

Generates 12 distinct SVG artwork styles using deterministic randomness.

```js
// Deterministic PRNG seeded by NFT ID
const rng = (n) => {
  const x = Math.sin(seed * 127.1 + n * 311.7) * 43758.5453;
  return x - Math.floor(x);
};
```

Each pattern type maps to a unique visual style:
- `abstract-*` — radial gradients + orbital rings
- `photography-*` — solar corona, server room grids
- `pixel-*` — grid pixel art, character sprites
- `generative-*` — reaction-diffusion spots, matrix text
- `3d-*` — shaded ellipsoid sculpture, chrome figure
- `ai-*` — point cloud networks, floral petal arrays

> **Production note:** Replace `<NFTArt>` with `<img src={nft.imageUrl} alt={nft.title} />` when connecting to a real NFT API.

---

### `<NFTModal />`

Full-screen accessible detail view.

| Feature | Implementation |
|---|---|
| Escape to close | `document.addEventListener('keydown')` in `useEffect` |
| Body scroll lock | `document.body.style.overflow = 'hidden'` |
| Focus management | `ref.current.focus()` on open |
| Click-outside close | Checks `e.target === e.currentTarget` on overlay |
| Mobile bottom sheet | CSS `border-radius` + `align-items: flex-end` at `<768px` |

---

## Custom Hooks

### `useFilter(items)`

Encapsulates all filter, search, and sort logic using `useMemo` for performance.

```js
import useFilter from './hooks/useFilter';

const {
  activeCategory, setActiveCategory,
  searchQuery,    setSearchQuery,
  sortBy,         setSortBy,
  filtered,       // ← memoized derived array
  resetFilters,
  totalCount,
  filteredCount,
} = useFilter(nfts);
```

**Search fields:** title, creator, tags, category  
**Sort options:** newest, oldest, price-high, price-low, likes  
**Performance:** `useMemo` dependency array prevents re-computation on unrelated renders.

---

## Responsive Design

| Breakpoint | Grid Columns | Notes |
|---|---|---|
| `< 520px` | 1 column | Single-column mobile |
| `520–900px` | 2 columns | Compact tablet |
| `900–1280px` | 3 columns | Standard tablet/laptop |
| `> 1280px` | 4 columns | Full desktop |

The `FilterBar` becomes non-sticky and full-width on mobile. The `NFTModal` becomes a bottom sheet. The `Hero` preview card is hidden below 1100px.

---

## Accessibility

- All interactive elements have `aria-label` attributes
- Modal uses `role="dialog"` and `aria-modal="true"`
- Filter count uses `aria-live="polite"` for screen reader updates
- Category pills use `aria-pressed` for toggle state
- Keyboard navigation: Enter activates cards, Escape closes modal
- Focus is trapped and managed in the modal
- Color is never the sole indicator of state (shape + text always accompany)

---

## Performance

- `useMemo` on filter computation avoids unnecessary re-renders
- SVG art is rendered synchronously — no image loading states needed
- CSS animations use `transform` and `opacity` (GPU-composited)
- Fonts loaded via `<link rel="preconnect">` in `index.html`
- `animation-delay` for staggered entrance without JS timers

---

## Production Considerations

When moving to production, these areas would be extended:

| Area | Current | Production |
|---|---|---|
| **Data** | Static mock array | Alchemy / OpenSea / Moralis API |
| **Art** | SVG generator | IPFS-hosted images via `<img>` |
| **Wallet** | Simulated button | wagmi + viem + RainbowKit |
| **Payments** | UI only | ethers.js contract calls |
| **State** | Local hooks | TanStack Query for API caching |
| **Auth** | None | SIWE (Sign-In with Ethereum) |
| **Search** | Client-side | Algolia or server-side filtering |
| **Analytics** | None | Mixpanel / Amplitude |

---

## License

MIT © 2024 NΞXUS Gallery

---

*Built as a portfolio demonstration of React architecture, CSS expertise, and UI/UX design. No external component libraries were used.*
