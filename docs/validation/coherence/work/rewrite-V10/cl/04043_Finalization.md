## Finalization (volumes/_finalize, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/_finalize; covered by the whole-design retrovalidation (J84).

The finalization fixed, in place, **SR6-01** (seam-surfaces-r6, major): a bent or refused draft item's buttons now have a carrier — `ProposalView.variations[].bends` as `{ item, msg, actions }`, `lines[].actions`, and `TurnView.refused` holding every refused or conflicting item with its actions beside the turn's own `refusal`; inside a proposal of several items a bend's `commit` replaces only that item's events and **Keep {building}** removes only them (V10 §3.5 step 3; §3.16), a refused item's `commit` appends the button's events to the active variation; step 4 gives the model each bent item's action labels; §3.11 step 1, §1b.1's view-model row, §2.14's Proposal row, J-V10.106 (amended) and T-V10-4 (the bend actions, a two-item draft, a turn with a refused and an applied item) follow; new **J-V10.110** (J-SS6.2). Left on the fix list: seam-surfaces-r6 SR6-05 (docs/volumes/INDEX.md §7). **CONFIRMED** by execution: every edit an exact-match replacement with its count asserted.

