---
title: Row 8 primary key labels
---
# Row 8 Primary Key Labels

## What & Why
Set the primary face labels for the placeholder keys in Row 8, giving them their intended numeric and operator identities.

## Done looks like
- Key #0 of Row 8 remains unassigned (no label change)
- Key #1 of Row 8 displays "0"
- Key #2 of Row 8 displays "."
- Key #3 of Row 8 displays "SPC"
- Key #4 of Row 8 displays "+"
- All other rows and labels are unchanged

## Out of scope
- Top (magenta/cyan) shift labels for these keys
- Key operations / wiring
- Any other row

## Tasks
1. Update the label entries for `key-r8-1` through `key-r8-4` in the labels config to "0", ".", "SPC", and "+" respectively. Leave `key-r8-0` unchanged.

## Relevant files
- `artifacts/rpn-calc/src/config/labels.json`
- `artifacts/rpn-calc/src/data/hp48Keys.json`