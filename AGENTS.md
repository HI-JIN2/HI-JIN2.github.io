# Agent Notes (Repo Guide)

This repository is a Vite + React + TypeScript resume site deployed to GitHub Pages.

## Scope + Intent

- Primary stack: React 18, TypeScript (strict), Vite, Tailwind CSS v4.
- Deployment: GitHub Pages; app is served at the domain root `/`.
- No dedicated lint/test tooling is currently configured (type-check is enforced via `tsc`).

## Key Paths

- App entry: `src/index.tsx`
- Router root: `src/App.tsx`
- Data model + content: `src/data/*`
- Shared state: `src/context/resume-context.tsx`
- Styling: `src/index.css` (Tailwind v4 `@import "tailwindcss";` + `@theme` tokens)
- Build config: `vite.config.ts`

## Build / Dev / Deploy Commands

This repo uses npm in CI (`.github/workflows/deploy.yml`). Prefer npm locally.

```bash
# install (CI-equivalent)
npm ci

# install (local)
npm install

# dev server (hot reload)
npm run dev

# production build (includes type-check via tsc)
npm run build

# preview the production build
npm run preview

# deploy to GitHub Pages (builds first)
npm run deploy

# type-check only (no build output)
npx tsc -p tsconfig.json --noEmit
```

### Lint

- ESLint/Prettier/Biome are not configured in this repo.
- Treat `tsc` (`strict`, `noUnusedLocals`, `noUnusedParameters`) as the current lint gate.

### Tests

- There are currently no `*.test.*` / `*.spec.*` files and no test runner configured.
- If you add Vitest (recommended for Vite projects), standard commands would be:

```bash
# run all tests once
npx vitest run

# watch mode
npx vitest

# run a single test file
npx vitest run src/path/to/foo.test.ts

# run tests matching a name/pattern
npx vitest run -t "some test name"
```

## GitHub Actions (CI)

- Workflow: `.github/workflows/deploy.yml`
- Uses Node 20 + `npm ci` + `npm run build`, then publishes `dist/` to Pages.
- Keep the build reproducible (no reliance on local-only files).

## Package Manager + Lockfiles

- CI is npm-based; keep `package-lock.json` authoritative.
- A `yarn.lock` exists; avoid updating it unless the repo intentionally switches to Yarn.
- Local requirement: Node.js 18+; CI currently runs Node 20.

## Code Style (Project Conventions)

### TypeScript

- `strict: true` is enabled; avoid `any` and unsafe assertions.
- Prefer `type` aliases for object shapes and unions (matches existing files).
- Add explicit types at module boundaries (public utils, context values, component props).
- Keep imports at the top of the file (avoid mid-file `import` statements).
- Prefer small helper functions over complex inline logic in JSX.

### React

- Use function components + hooks; avoid class components.
- Component names: `PascalCase` (e.g., `Layout`, `Profile`).
- File naming in `src/components/` is mixed; prefer `kebab-case.tsx` unless extending an existing PascalCase “primitive”.
- Props: `type Props = { ... }` near the top; default props via parameter defaults.
- Hooks: name `useX`; throw a clear provider error when needed (see `useResume`).

### Imports

- Group imports: React/framework, third-party, internal (context/data/components/utils), then styles/assets.
- Use relative imports (no path aliases are configured).

### Formatting

- Use double quotes for strings (current codebase standard).
- Use semicolons.
- Indentation: 2 spaces.
- Prefer trailing commas where it improves diffs (especially multiline objects/arrays).
- Keep line lengths reasonable; break long JSX props and long template literals.

### Naming

- Variables/functions: `camelCase`.
- Constants: `UPPER_SNAKE_CASE`.
- Booleans: prefix with `is`/`has`/`can`/`should`.
- Event handlers: `handleX` (e.g., `handleClick`).

### Error Handling

- For programmer errors (invalid state, missing provider), throw `Error` with an actionable message.
- For user-facing behavior, prefer graceful UI fallbacks over `try/catch` that hides errors.
- Don’t ignore rejected promises; handle or surface them.

### Tailwind + CSS

- Tailwind v4 is configured via Vite (`@tailwindcss/vite`) and `src/index.css`.
- Prefer Tailwind utilities for layout/spacing/typography; use inline styles only when dynamic.
- Reuse theme tokens from `@theme` when adding global colors/fonts.
- Avoid overusing `!important` utilities (`!bg-*`) unless necessary.

## App-Specific Constraints

- If you change `base` in `vite.config.ts`, ensure it matches the GitHub Pages publishing path.
- Query parameter convention: `?General=true` selects “general”; absence defaults to “android” (`DEFAULT_RESUME_TYPE`).

## Cursor / Copilot Rules

- No `.cursor/rules/`, `.cursorrules`, or `.github/copilot-instructions.md` files were found in this repository at the time this guide was generated.
