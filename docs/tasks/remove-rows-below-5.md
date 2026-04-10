# Remove all buttons below row 5

## What & Why
The navcluster, numpad, and lower sections in hp48Keys.json and their corresponding rendering in KeyGrid.tsx are placeholder filler. They need to be removed entirely to clear space for future use.

## Done looks like
- The sections `navcluster`, `numpad`, and `lower` are gone from `hp48Keys.json`
- `KeyGrid.tsx` no longer renders those sections — no dead code or empty containers remain
- The keyboard display ends after row 5 (the flat 6-key row in `top-fn`)

## Out of scope
- Adding any new buttons or sections
- Changes to softkeys or top-fn rows

## Tasks
1. **Remove key data** — Delete the `navcluster`, `numpad`, and `lower` section entries from `hp48Keys.json`.
2. **Remove rendering code** — Remove any rendering branches or logic in `KeyGrid.tsx` that are specific to those three sections and are now dead code.

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`
