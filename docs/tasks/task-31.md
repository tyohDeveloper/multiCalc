---
title: Softkey alpha labels highlight on alpha shift
---
# Softkey Alpha Labels Highlight on Alpha Shift

## What & Why
Row #0 (softkeys) renders A–F alpha labels at the bottom of each key, but those labels never receive the `key-label-active` highlight class when alpha shift (`shiftedBottom`) is engaged. Every other row already applies this conditional styling. The labels should visually activate — matching the behaviour of rows 1–4 — so the user can see which keys will type hex digits A–F.

## Done looks like
- When alpha shift is active, the A–F labels at the bottom of the softkey row are highlighted (active style) just like alpha labels on other rows
- When alpha shift is inactive, those labels appear in their normal (dim) state

## Out of scope
- Changing the alpha characters themselves
- Any changes to other rows

## Tasks
1. In the softkey rendering block of `KeyGrid.tsx`, apply the `key-label-active` class to the `.key-label-alpha` div when `shiftState === "shiftedBottom"`, mirroring what is done for THREE_ZONE_ROWS at line 186.

## Relevant files
- `artifacts/rpn-calc/src/ui/components/KeyGrid.tsx:84-115`