# HP-48 GX Authentic Visual Redesign

## What & Why
The calculator already functions as an HP-48 GX and carries the branding, but the visual styling doesn't match the real hardware. This task updates the colors, layout accents, and key scheme to faithfully replicate the look of the physical HP-48 GX calculator.

## Done looks like
- Calculator body is dark charcoal (near-black), not cream/tan
- A teal/turquoise horizontal accent bar separates the screen area from the keypad (authentic HP-48 GX signature detail)
- The LCD screen uses an authentic grey-green tone with very dark text (not the current bright green)
- The "HP" logo appears on the left of the header and "48GX" on the right, in the correct font and color
- Key colors follow the real hardware palette:
  - Function/math keys: medium-dark grey
  - Digit keys: slightly lighter dark grey
  - Arithmetic operator keys: dark grey (not brown)
  - The left-shift key is teal/slate-blue, matching the real hardware accent color
  - The right-shift key (if present) is a lighter grey/cream
  - ENTER key is prominently styled
- Pressed-key feedback is subtle and realistic
- The overall calculator silhouette (rounded corners, proportions) matches the elongated portrait shape of the real HP-48 GX

## Out of scope
- Changes to calculator logic, RPN behavior, or key mappings
- Adding new keys or changing key layout
- Mobile responsiveness beyond what currently exists
- Pixel-perfect reproduction of every detail (sticker labels, card port, battery cover, etc.)

## Tasks
1. **Update color palette** — Redefine all CSS variables in `globals.css` to match the HP-48 GX: dark charcoal body, authentic LCD grey-green screen, proper key greys, teal shift-key accent, and remove the cream and brown tones.

2. **Restyle the body and header** — Update `.hp48-body` to dark charcoal with appropriate border/shadow. Reposition the HP logo (left) and "48GX" brand text (right) in the header, styled to match the real hardware typography (sans-serif, correct color).

3. **Add teal accent strip** — Insert a teal/turquoise horizontal bar between the screen block and the keypad in `HP48Calculator.tsx` and style it in `calculator.css`. This is the single most recognizable visual detail of the HP-48 GX.

4. **Restyle the LCD screen** — Update `.hp48-screen` to use an authentic grey-green background (e.g. `#b8c4a4`) with near-black text, a recessed inset shadow, and a darker frame border that looks like an embedded display.

5. **Restyle key categories** — Update key-button category classes so all keys use dark grey variants. Digit keys get a slightly lighter shade. Operator keys lose the brown. The shift key gets the teal accent. ENTER key stays oversized and gets a distinct (but still dark) color.

## Relevant files
- `artifacts/rpn-calc/src/styles/globals.css`
- `artifacts/rpn-calc/src/styles/calculator.css`
- `artifacts/rpn-calc/src/ui/calculators/HP48Calculator.tsx`
- `artifacts/rpn-calc/src/ui/components/KeyButton.tsx`
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx`
- `artifacts/rpn-calc/src/ui/components/StatusBar.tsx`
- `artifacts/rpn-calc/src/ui/components/StackDisplay.tsx`
