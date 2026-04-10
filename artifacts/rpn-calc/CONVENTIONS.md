# RPN Calculator — Coding Conventions

This document is the authoritative standard for all contributors.

## Core Rules

1. **One function per file** — Every `.ts` file exports exactly one function.
   The filename must match the exported function name (camelCase).

2. **Pure functions** — Logic functions accept inputs and return outputs only.
   No side effects, no module-level mutable state, no global access.
   State-transformer functions (`CalcState → CalcState`) are pure: they take
   state as a parameter and return a new state object.

3. **≤ 25 lines per function body** — If a function exceeds 25 lines, extract
   shared logic into a new helper file and import it.

4. **No logic in UI files** — `.tsx` files import logic functions and call them.
   Conditionals and transformations live in `src/logic/`. No inline `if (x > 0)`
   math in JSX or event handlers.

5. **Formatting is logic** — All number and display formatting lives in
   `src/logic/formatting/`. Never format values inline in JSX.

6. **No duplication** — Any logic used in more than one file must be extracted
   into its own file in `src/logic/shared/`. This applies to JSON data too:
   if a value appears in multiple JSON files, it belongs in the base file only.

7. **No dead code** — Unused functions, exports, and JSON keys must be removed.

## Key-based JSON Config (the core data pattern)

All data that might vary across contexts lives in JSON files accessed by key.
Nothing is hard-coded as a string literal in `.ts` or `.tsx` files.

### Layer 1 — Localization (user-visible text)

- `src/locales/en.json` — Base English. Contains the full set of strings.
- `src/locales/en-us.json` — US-English delta. Contains **only** keys that differ
  from `en`. All other keys fall through to `en.json`.
- New locales only need to contain their actual differences from the base.
- Use `t(key)` in UI and formatting code to resolve strings.

### Layer 2 — Symbol/label config (display style choices)

- `src/config/labels.json` — Default label style (`"square-root": "√x"`).
- `src/config/labels-text.json` — Text-only delta (`"square-root": "SQRT"`).
  Contains **only** keys that differ from `labels.json`.
- Use `label(key)` in UI code to resolve labels.
- This pattern reuses the same `cascadeResolve` helper as localization.

### The cascade rule

`cascadeResolve(base, variant?)` merges two records: variant keys override base,
base fills in gaps. This function is implemented once in `src/logic/shared/cascadeResolve.ts`
and reused by both the locale layer and the config/label layer.

## Folder Structure

```
src/
├── main.tsx                   # Entry point only — mounts the React app
├── ui/                        # React UI files (no logic)
│   ├── App.tsx                # Pane switcher root
│   ├── calculators/           # One component per calculator
│   └── components/            # Shared UI primitives
├── logic/                     # Pure functions, one per file
│   ├── shared/                # Reusable helpers (cascadeResolve, applyBinaryOp, …)
│   ├── stack/                 # Stack operations (enter, drop, swap, …)
│   ├── input/                 # Number entry logic
│   ├── math/                  # Arithmetic and math operations
│   ├── trig/                  # Trigonometric functions
│   ├── formatting/            # Display formatting
│   └── i18n/                  # Locale and label resolvers
├── state/                     # State shape, initial state, reducer
├── data/                      # Button layout, display mode config (JSON)
├── config/                    # Label/symbol configs (JSON)
├── locales/                   # Locale files (JSON)
└── styles/                    # CSS files
```

## Counting and Indexing

All positional references — rows, keys within a row, stack levels, registers,
panes, or any other ordered sequence — are **0-indexed** throughout: in code,
in JSON data files, and in task descriptions.

**Cross-check rule:** Whenever a task description (or code comment) identifies
something by both its numeric position *and* its name or label, both must agree
under 0-based counting before the description is finalised.

Example: if the keyboard grid has rows 0–5 and row 0 is the top row containing
the "HOME" key, then "Row 0, key 0 (HOME)" is correct. Writing "Row 1, key 0
(HOME)" is wrong because row 1 is the second row, which holds different keys.

## Op Codes

The `op` field in button definitions drives all calculator operations.
The reducer maps op codes to logic functions — never to inline logic.
See `src/data/hp48Keys.json` for the full list of op codes.
