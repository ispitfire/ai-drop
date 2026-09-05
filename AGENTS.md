# AGENTS.md

## Cursor Cloud specific instructions

AI Drop is a single-service React 19 + Vite 7 frontend (no backend, no database, no external services). Standard commands live in `README.md` and `package.json` scripts.

- Dev server: `npm run dev` serves on port `5173` (Vite default). This is the app to run for development.
- Tests: `npm test` runs Vitest in watch mode. Use `npm test -- --run` for a single non-interactive pass (11 tests).
- There is no lint script; `package.json` only defines `dev`, `build`, `preview`, and `test`.
- Node 22 (or Vite 7's minimum of Node 20.19+/22.12+) is required.
