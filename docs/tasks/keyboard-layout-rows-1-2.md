# Keyboard Layout Rows 1–2 (Structure Check)

## What & Why
Rebuild the top two keyboard rows to establish the new key-cell layout structure. This is a partial build to confirm the general layout before describing the remaining rows.

Row 1 (inside the graphite display frame): 6 blank off-white softkeys.
Row 2 (in the darker grey keyboard panel): MTH, PRG, CST, VAR, ▲, NXT keys.

Each key in row 2 sits inside a cell that has three zones:
- Top zone: two small text labels — magenta on the left, cyan on the right.
- Middle zone: the key button itself (with a subtle drop shadow).
- Bottom zone: an alphabet letter, right-aligned (G through L for row 2).

Use placeholder labels RAD (magenta) and POLAR (cyan) for every key in row 2.

All text is uppercase and sans-serif. The alphabet and shift labels are smaller than the key label text. CSS classes must be used for every distinct text element (magenta label, cyan label, alphabet label, key button) so sizes and colors can be adjusted independently.

## Done looks like
- Row 1 shows 6 off-white blank softkeys inside the graphite display bezel, each with a thin border outline and an A–F letter label at the bottom-right.
- Row 2 shows 6 keys (MTH, PRG, CST, VAR, ▲, NXT) in the darker grey keyboard panel. Above each key: "RAD" in magenta on the left and "POLAR" in cyan on the right. Below each key: G, H, I, J, K, L respectively, right-aligned.
- Keys have subtle drop shadows; labels are plain text with no box.
- All label sizes, colors, and the key button appearance are controlled by dedicated CSS classes.
- The remaining rows of the keyboard (rows 3–9) are not yet built.

## Out of scope
- Rows 3–9 of the keyboard.
- Actual magenta/cyan label content (only placeholders for now).
- Functional wiring of the new keys (click handlers, RPN logic).
- Navigation cluster, numpad, and lower rows.

## Tasks
1. **Define the key-cell CSS structure** — Create CSS classes for the key cell wrapper, the top label row (`.key-label-magenta`, `.key-label-cyan`), the key button (`.key-btn`), and the alphabet label (`.key-label-alpha`). Set font sizes, colors, and alignment. Keys get a subtle drop shadow.
2. **Rebuild row 1 (softkeys)** — Style the 6 softkeys as off-white blank buttons with a thin border inside the graphite display frame. Add A–F alphabet labels at the bottom-right of each cell using the new CSS class.
3. **Implement row 2 key cells** — Render MTH, PRG, CST, VAR, ▲, NXT using the new three-zone cell structure. Apply placeholder RAD/POLAR shift labels and G–L alphabet labels.

## Relevant files
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`
- `artifacts/rpn-calc/src/ui/components/KeyButton.tsx`
- `artifacts/rpn-calc/src/data/hp48Keys.json`
- `artifacts/rpn-calc/src/styles/calculator.css`
- `artifacts/rpn-calc/src/logic/ui/buildKeyButtonViewModel.ts`
