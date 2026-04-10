# MultiCalc

## Overview

MultiCalc — pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Artifacts

### RPN Calculator (`artifacts/rpn-calc`)
Note: "RPN Calculator" is the name of this calculator feature/artifact; the overall project is named MultiCalc.

- **Path**: `/` (preview pane)
- **Kind**: web (React + Vite, single-file HTML output)
- **Description**: HP-48 style RPN calculator. Full 4-register stack (X/Y/Z/T), auto-lift, SHIFT mode, arithmetic operators, math functions (√, x², yˣ, ˣ√y, 1/x, LN, LOG, eˣ, 10ˣ), trig (SIN/COS/TAN + inverses), constants (π, e), stack ops (ENTER, DROP, SWAP, ROLL↑, ROLL↓, CLR, LSTx), number entry (EEX, +/-, backspace, I for imaginary separator), DEG/RAD/GRAD modes, STD/FIX/SCI/ENG display modes. **Complex number support**: stack uses Complex type internally; typing `123I456` during entry produces the complex number (123, i456); operations that produce imaginary results (e.g., sqrt(-4) = 2i) display as `a + bi`; undefined operations (0/0, ln(0)) display as NaN.
- **Build**: `pnpm build` outputs a single self-contained `dist/public/index.html` (all JS+CSS inlined).
- **Conventions**: See `artifacts/rpn-calc/CONVENTIONS.md`. One function per file, pure functions, ≤25 lines, no logic in .tsx, JSON-externalized labels/locales, cascading resolver pattern.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
