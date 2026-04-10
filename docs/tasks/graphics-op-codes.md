# Tag Graphics Functions in Op Registry

## What & Why
Add the full set of HP-48 graphics functions as named placeholder op codes in `opCodes.ts` and register them all in `GRAPHICS_OPS`, so they are suppressed by the existing `noGraphics` flag. This keeps the architecture consistent and ensures that when graphics mode is built later, all ops already have correct identities.

## Done looks like
- All 22 graphics functions below have a named `PlaceholderOpCode` entry and appear in `PLACEHOLDER_OPS`
- All of them are listed in `GRAPHICS_OPS` so `opSuppressedBy` returns `"noGraphics"` for each
- The existing three entries (`OP_SYMB`, `OP_SOLV`, `SIGMA_PLUS`) remain in `GRAPHICS_OPS`
- No existing ops are changed or removed
- TypeScript compiles without errors

## Graphics functions to add
| Label | Suggested op code |
|---|---|
| right-shift + PLOT | `PLOT_RS` |
| PLOT | `PLOT` |
| TYPE | `GFX_TYPE` |
| SETUP | `GFX_SETUP` |
| RANGE | `GFX_RANGE` |
| ZOOM | `GFX_ZOOM` |
| TRACE | `GFX_TRACE` |
| Arrow keys (graphics mode) | `GFX_ARROW_UP`, `GFX_ARROW_DOWN`, `GFX_ARROW_LEFT`, `GFX_ARROW_RIGHT` |
| CLLCD | `CLLCD` |
| CLRG | `CLRG` |
| LINE | `GFX_LINE` |
| BOX | `GFX_BOX` |
| CIRCL | `GFX_CIRCL` |
| ARC | `GFX_ARC` |
| STO PICT | `STO_PICT` |
| RCL PICT | `RCL_PICT` |
| ERASE | `GFX_ERASE` |
| CENT | `GFX_CENT` |
| CNTR | `GFX_CNTR` |
| COORD | `GFX_COORD` |
| CNCT | `GFX_CNCT` |

## Out of scope
- Implementing any graphics logic or screen rendering
- Wiring these op codes to any keys in the keyboard layout
- UI suppression styling (`.key-suppressed` class) — that is tracked separately

## Tasks
1. Add all 25 new op code strings to the `PlaceholderOpCode` union type and to `PLACEHOLDER_OPS` set in `opCodes.ts`.
2. Add all 25 new op codes to the `GRAPHICS_OPS` set so `opSuppressedBy` returns `"noGraphics"` for each.

## Relevant files
- `artifacts/rpn-calc/src/state/opCodes.ts`
