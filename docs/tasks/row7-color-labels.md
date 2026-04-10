# Row 7 color-function top labels

## What & Why
Set the top shift-function labels for keys 1–4 of row 7 (`top-fn-7`), replacing the current placeholder "magenta"/"cyan" strings with the real function names.

## Done looks like
- Key #1 (face label "1", id `fn-7b`): single merged cyan label reading **I/O**
- Key #2 (face label "2", id `fn-7c`): single merged cyan label reading **LIBRARY**
- Key #3 (face label "3", id `fn-7d`): single merged cyan label reading **EQ LIB**
- Key #4 (face label "-", id `fn-7e`): split label — magenta left **«»**, cyan right **""**

## Out of scope
- Key #0 (`fn-7a`, the cyan shift key itself) — no changes
- Any row other than row 7
- Primary key face labels or alpha labels

## Tasks
1. In `hp48Keys.json`, update `fn-7b` to use `topCyanMerged: "I/O"` (remove existing `topMagenta`/`topCyan` placeholders).
2. Update `fn-7c` to use `topCyanMerged: "LIBRARY"`.
3. Update `fn-7d` to use `topCyanMerged: "EQ LIB"`.
4. Update `fn-7e` to use `topMagenta: "«»"` and `topCyan: "\"\""` (replacing placeholder strings).

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json:92-101`
