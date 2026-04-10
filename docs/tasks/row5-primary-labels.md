# Row 5 Primary Key Labels

## What & Why
Rows 5–8 each have 5 keys (keys #0–#4), with each key proportionally wider to fill the same row width. Key #0 (alpha shift, α) is already defined. Assign the primary face labels for keys #1–#4, which completes the row.

## Done looks like
- Rows 5, 6, 7, and 8 each render exactly 5 keys per row
- Each key in these rows is wider than in 6-key rows, filling the full row width
- Row 5 key faces read (left to right): α (key #0, existing), **7**, **8**, **9**, **÷**
- No other visual differences compared to the current rows

## Out of scope
- Labels for rows 6, 7, and 8 buttons (future work)
- Top (magenta/cyan) labels for row 5
- Any functional wiring of the 7, 8, 9, ÷ keys

## Tasks
1. **Structural change: 5-key rows** — Update the key data for rows 5, 6, 7, and 8 so each has exactly 5 keys (removing the 6th key from each row). Adjust column span or grid configuration so keys are wider and fill the full row width.
2. **Row 5 primary labels** — Set the primary face labels for row 5 keys #1–#4 to "7", "8", "9", and "÷" respectively. Use existing label keys from `labels.json` where available (`digit-7`, `digit-8`, `digit-9`, `divide`).

## Relevant files
- `artifacts/rpn-calc/src/data/hp48Keys.json:72-115`
- `artifacts/rpn-calc/src/config/labels.json:122-145`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`
