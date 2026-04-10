# Row 3 Key 2 Top Magenta Label

## What & Why
Change the top-right magenta label on row 3, key 2 (the EVAL key, id `fn-o`) from `→NUM` to `NUM`.

## Done looks like
- The top magenta label on that key reads "NUM" instead of "→NUM"

## Out of scope
- Any other keys or labels

## Tasks
1. In the key data file, update the `topMagenta` field for key `fn-o` from `"→NUM"` to `"NUM"`.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json:44-45`
