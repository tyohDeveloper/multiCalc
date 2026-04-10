# Rows 5–8 Filler Top & Bottom Labels

## What & Why
Rows 5, 6, 7, and 8 currently have no top labels (magenta left / cyan right) and empty bottom alpha labels. This task fills them with placeholder content so the layout slots are visually populated and consistent with the rows above.

## Done looks like
- Every button in rows 5, 6, 7, and 8 shows a magenta placeholder label on the top-left and a cyan placeholder label on the top-right above the button body.
- The top-left (magenta) filler text is "magenta"; the top-right (cyan) filler text is "cyan".
- The bottom-right alpha label slot for rows 5–8 contains a U+200B (zero-width space) placeholder instead of an empty string.

## Out of scope
- Changing any labels in rows 1–4, including the Y and Z bottom alpha labels on the ENTER row (row 4) — those must remain "Y" and "Z".
- Wiring up actual shift operations for these buttons.
- Changing main button label text (the "#5 0" style placeholders stay as-is for now).

## Tasks
1. **Add topMagenta and topCyan fields to rows 5–8 in the key data file** — Set `topMagenta: "magenta"` and `topCyan: "cyan"` on every key entry in rows `top-fn-5`, `top-fn-6`, `top-fn-7`, and `top-fn-8`.
2. **Fill bottom-right alpha labels for rows 5–8** — Update the `ROW5_ALPHA` through `ROW8_ALPHA` arrays in the KeyGrid component to contain the U+200B character (`"\u200B"`) for each of the six columns instead of empty strings.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`
