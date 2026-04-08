---
title: RPN Calculator App — Initial Build
---
# RPN Calculator App — Initial Build

  ## What & Why
  Build a standalone single-HTML application compiled from a modular TypeScript + Vite project. The first (and initially only) calculator pane is an HP48-style RPN calculator covering all non-programming features. The project must establish the full architectural foundation that all future calculators will inherit.

  ## Done looks like
  - A single self-contained HTML file builds successfully and opens in any browser with no server
  - The HP48 RPN calculator works: 4-level stack display (X/Y/Z/T), full number entry (digits, decimal, EEX, +/−), stack operations (Enter, Drop, Swap, Roll Up/Down, Clear, Last X), arithmetic (+, −, ×, ÷), math functions (√, x², yˣ, eˣ, ln, log, 10ˣ, 1/x, ±, π, e, %, %CHG), trig (sin, cos, tan, asin, acos, atan with DEG/RAD/GRAD mode), and display modes (STD, FIX n, SCI n, ENG n)
  - No programming/RPL language features are present
  - A pane/card switcher exists at the top level ready for future calculators to slot in
  - Source conventions are enforced: one exported function per file, all functions pure, all functions <25 lines, no logic in UI files, formatting logic in logic layer
  - All user-visible strings come from cascading locale JSON files; all config labels come from cascading config JSON files — nothing string-literal in code
  - Locale resolution merges correctly: en-us.json overrides en.json, en.json fills gaps; same cascade pattern applies to all key-based JSON configs
  - Vite is configured via vite-plugin-singlefile to inline all JS, CSS, and JSON into a single HTML output file
  - No dead code exists in the codebase at delivery

  ## Out of scope
  - Additional calculators beyond HP48
  - Programming/RPL language features
  - Complex number support
  - Matrix operations
  - Unit conversion
  - Statistics functions
  - Any server-side component

  ## Architecture conventions to establish
  The executor must follow these conventions throughout — they are the project's long-term standard:

  1. **One function per file**: Each `.ts` logic file exports exactly one function. The filename matches the function name (camelCase).
  2. **Pure functions**: Logic functions take inputs and return outputs. No side effects, no globals, no imports of state.
  3. **<25 lines per function**: If a function exceeds 25 lines, extract helpers into their own files.
  4. **No logic in UI files**: `.tsx` files import logic functions and call them. Conditionals and transformations live in logic files.
  5. **Formatting is logic**: All number/display formatting lives in `src/logic/formatting/`, never in UI files.
  6. **No duplication**: Any logic used in more than one place is extracted into a shared pure function. This applies to JSON data too — if a value appears in multiple JSON files, it belongs in the base file only.
  7. **No dead code**: Unused functions, exports, and JSON keys must be eliminated.

  ### Key-based JSON config (the core data pattern)
  All data that might vary across contexts — user-visible strings, button labels, symbol choices, display configurations — is externalized to JSON files and accessed by key. Nothing is hard-coded as a string literal in `.ts` or `.tsx` files.

  This pattern has two layers:

  **Layer 1 — Localization** (user-visible text, error messages, status labels):
  - `src/locales/en.json` — base English, contains the grand bulk of all strings
  - `src/locales/en-us.json` — only the keys that differ from `en`; all other keys fall through to `en.json`
  - A `resolveLocale(baseLocale, variantLocale?)` pure function merges them: variant overrides base, base fills gaps
  - New locale variants only need to contain their actual differences

  **Layer 2 — Symbol/label config** (display style choices, not language):
  - `src/config/labels.json` — default label style: e.g., `"square-root": "√"`
  - `src/config/labels-text.json` — text-only variant: e.g., `"square-root": "sqrt"`
  - Follows the exact same cascade and resolver pattern as locales
  - A `resolveConfig(baseConfig, variantConfig?)` pure function handles the merge
  - This pattern is reused for any future config that has base + variant variants (e.g., button color themes)

  The resolver pattern (cascade merge) is implemented once as a shared pure function and reused by both layers — no duplication between resolveLocale and resolveConfig.

  ### Folder structure to create
  ```
  artifacts/rpn-calc/
  ├── index.html
  ├── package.json
  ├── vite.config.ts          # vite-plugin-singlefile, JSON imports
  ├── tsconfig.json
  ├── CONVENTIONS.md          # Coding standards reference
  ├── src/
  │   ├── main.ts             # Entry point only — mounts app
  │   ├── ui/                 # React UI files (no logic)
  │   │   ├── App.tsx         # Pane switcher root
  │   │   ├── calculators/
  │   │   │   └── HP48Calculator.tsx
  │   │   └── components/
  │   │       ├── StackDisplay.tsx
  │   │       ├── KeyButton.tsx
  │   │       ├── KeyGrid.tsx
  │   │       └── StatusBar.tsx
  │   ├── logic/              # Pure functions, one per file
  │   │   ├── stack/
  │   │   ├── input/
  │   │   ├── math/
  │   │   ├── trig/
  │   │   ├── formatting/
  │   │   └── shared/         # Reusable helpers (incl. cascadeResolve)
  │   ├── state/
  │   │   └── calculatorState.ts   # State shape + initial state only
  │   ├── data/
  │   │   ├── hp48Keys.json        # Button layout (keys reference label keys)
  │   │   └── displayModes.json    # STD/FIX/SCI/ENG config
  │   ├── config/
  │   │   ├── labels.json          # Default symbol labels (e.g. "square-root": "√")
  │   │   └── labels-text.json     # Text-only variant (e.g. "square-root": "sqrt")
  │   └── locales/
  │       ├── en.json              # Base English — the grand bulk of all strings
  │       └── en-us.json           # en-US deltas only
  ```

  ## Tasks
  1. **Scaffold the artifact** — Create the Vite + TypeScript artifact (`rpn-calc`) with vite-plugin-singlefile, establish the full folder structure, configure `vite.config.ts` to produce a single inlined HTML file, and write `CONVENTIONS.md` documenting all coding standards including the cascade pattern.

  2. **Cascade resolver and data files** — Implement `cascadeResolve(base, variant?)` as a single shared pure function used by both the locale and config layers. Author all JSON files: `locales/en.json` (all strings), `locales/en-us.json` (deltas only), `config/labels.json` (symbol defaults), `config/labels-text.json` (text-only deltas), `data/hp48Keys.json` (button layout with label keys, not literal labels), `data/displayModes.json`. Wire up `t(key)` and `label(key)` resolver functions that call `cascadeResolve`.

  3. **RPN stack engine** — Implement pure function files for all stack operations: `pushStack`, `popStack`, `swapStack`, `dropStack`, `rollUp`, `rollDown`, `clearStack`, `enterValue`, `getLastX`.

  4. **Number entry logic** — Implement pure function files: `appendDigit`, `appendDecimal`, `toggleSign`, `enterExponent`, `appendExponentDigit`, `backspace`, `startEntry`.

  5. **Math and arithmetic functions** — Implement one pure function per file for: `opAdd`, `opSubtract`, `opMultiply`, `opDivide`, `opSqrt`, `opSquare`, `opPower`, `opExp`, `opLn`, `opLog`, `opTenPow`, `opReciprocal`, `opNegate`, `opPi`, `opE`, `opPercent`, `opPercentChange`.

  6. **Trig functions** — Implement pure function files for: `opSin`, `opCos`, `opTan`, `opAsin`, `opAcos`, `opAtan`. Each accepts an angle-mode parameter (`"DEG" | "RAD" | "GRAD"`). Extract `toRadians` and `fromRadians` as shared helpers.

  7. **Display formatting** — Implement pure formatting functions: `formatStd`, `formatFixed`, `formatSci`, `formatEng`, `formatStackValue` (dispatcher), `formatEntryBuffer`. All take a number and options; return a display string. No state access.

  8. **HP48 Calculator UI** — Build the UI component tree. UI files call logic functions; contain no conditional math or string construction. Button layout is driven by `hp48Keys.json`; labels are resolved through the `label(key)` resolver.

  9. **State wiring and pane switcher** — Define the calculator state shape, implement the reducer/dispatch layer (wires key presses to logic functions), and build the top-level `App.tsx` pane switcher. Verify the full round-trip: key press → logic → state → display update.

  10. **Build verification** — Run `pnpm build`, confirm the output is a single HTML file with no external dependencies, verify dead code elimination, and confirm the file works standalone.

  ## Relevant files
  - `pnpm-workspace.yaml`
  - `package.json`
  - `tsconfig.base.json`