# Row 6 color-function top labels

## What & Why
Set the top shift labels on row 6 keys 1–4 (the four non-shift keys: 4, 5, 6, ×).
Row 6 is the magenta-shift row. The top labels expose the secondary/tertiary functions assigned to those keys, matching the same visual pattern established in row 5.

## Done looks like
- Key "4" shows a merged cyan label "TIME" above it
- Key "5" shows a merged cyan label "STAT" above it
- Key "6" shows a merged cyan label "UNIT" above it
- Key "×" shows split top labels: magenta "[]" on the left and cyan "_" on the right

## Out of scope
- Changing the primary key labels (4, 5, 6, ×)
- Wiring any key actions to TIME, STAT, UNIT, [], or _
- Changes to any other row

## Tasks
1. In `hp48Keys.json`, update `top-fn-6` keys `fn-6b`, `fn-6c`, `fn-6d`, and `fn-6e`:
   - `fn-6b`: replace the `topMagenta`/`topCyan` placeholder pair with `topCyanMerged: "TIME"`
   - `fn-6c`: replace with `topCyanMerged: "STAT"`
   - `fn-6d`: replace with `topCyanMerged: "UNIT"`
   - `fn-6e`: replace the placeholder pair with `topMagenta: "[]"` and `topCyan: "_"`

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json:83-91`
