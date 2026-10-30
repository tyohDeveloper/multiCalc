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

## Coding & architecture standards

Policy: `tyohDeveloper/engineering-standards` release 1.0.1.1 (tag `standards-1.0.1.1`). [`docs/CODING-STANDARDS.md`](docs/CODING-STANDARDS.md) records the adopted release, delivery profile (`none / single-file / none / none / none / interactive`, localization scope language), role mapping, enforcement matrix and local extensions; the rule text is retrieved from the hub at that tag. [`STANDARDS-ADOPTION.json`](STANDARDS-ADOPTION.json) is the machine-readable record; [`docs/EXCEPTIONS.md`](docs/EXCEPTIONS.md) lists open exceptions (C-27). [`AGENTS.md`](AGENTS.md) is the agent contract. [`docs/standards/portable-v2.2.md`](docs/standards/portable-v2.2.md) is the superseded predecessor, kept for history.

Key hard limits (C-11, C-12, C-6): exported function bodies ≤ 20 lines; one export per PURE file; PURE-CORE files ≤ 100 lines, other PURE/STATE/CONTROLLER files ≤ 150, VIEW files ≤ 250.

Proposals to change a rule go to the hub, not to this repository.
