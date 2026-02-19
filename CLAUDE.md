# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

**From the project root:**
```bash
npm run gui       # Start frontend dev server (http://localhost:5173)
npm run server    # Start Flask backend (http://127.0.0.1:5000)
```

**Frontend (from `gui/`):**
```bash
npm run dev       # Start Vite dev server
npm run build     # TypeScript compile + Vite production build
npm run lint      # ESLint check
npm run preview   # Preview production build
```

**Adding shadcn/ui components (from `gui/`):**
```bash
npx shadcn@latest add <component-name>
```

## Architecture

This is a full-stack web app with a React frontend and Python Flask backend.

**Frontend** (`gui/`): React 19 + TypeScript + Vite. Uses Tailwind CSS 4 (configured via `@theme` block in `index.css` with OKLCH colors), shadcn/ui components, and Zustand for global state. For styling that Tailwind cannot achieve, use Sass (`.scss`) as the fallback.

**Backend** (`server/`): Minimal Flask app with Flask-CORS. Currently has a single `/hello` test endpoint.

**Frontend structure:**
- `src/components/ui/` — shadcn/ui primitives; these can be modified for custom styling
- `src/components/feature/` — feature-specific components
- `src/components/layout/` — top-level layout components (e.g. `AppLayout`)
- `src/components/utils/` — shared utility components
- `src/stores/useAppStore.ts` — Zustand global state (sidebar open/closed state)
- `src/types/snippet.ts` — `Snippet` data type
- `src/service/` — API call functions (not yet implemented)
- `src/lib/utils.ts` — `cn()` helper for merging Tailwind classes

**Canvas:** Uses `@xyflow/react` (ReactFlow v12). The `Canvas` component renders an empty flow with `<Background />`, `<Controls />`, and `<MiniMap />`.

**Path alias:** `@/` maps to `gui/src/`.

## Data Model

```ts
type Snippet = {
  id: string;
  songTitle: string;
  section: string;       // e.g. "chorus", "verse", "bridge"
  artist: string;
  chordProgression: string[];  // Roman numerals, e.g. ["I", "vi", "IV", "V"]
  key: string;           // e.g. "C"
};
```

## Naming Conventions

- React components and their files: `UpperCamelCase` (e.g., `ThemePreview.tsx`)
- All other files: `lowerCamelCase` (e.g., `utils.ts`)
- Folders: `snake_case`, except component folders which match the component name
- Frontend variables: `camelCase`; backend variables: `snake_case`

## Git Workflow

- Branch names: `kebab-case`, one branch per feature
- Rebase onto `main` before opening a PR, then force-push the branch
- PRs require peer review before merging; delete branches after merge
- Never commit broken code
