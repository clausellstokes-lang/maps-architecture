## Reconciliation round 4, second brief (volumes/reconcile-V10-r4, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V10-r4; covered by the whole-design retrovalidation (J84).

Reconciled in place against the continuation of `docs/volumes/critique/seam-surfaces-r3.md` (its §9 – §11: SR3-10 –
SR3-15, raised 11:06 on V10 `9e3fdbd3…`). Round 4's first brief (SR3-07, landed 07:38) is history; this second brief
under the same lane key covers the one issue the continuation addressed to this volume: 1 fixed, 0 invalid, 0 on the
fix list. New here: decision J-V10.100 and one §1b.1 row. No new test, change request or cross-volume request number:
T-V10-4's three-building clause gains the labels. The build plan's estimates are unchanged: each label is a catalogue
read the harness already makes, and a chip is the `entity` block's own drawing.

| issue | severity | what changed | where |
|---|---|---|---|
| SR3-14 | minor | (a) §12's PLAUSIBLE bullet on one list for **Use another building** and the clerk's alternatives reads "BCR-V9-22's widened sentences, which file f's item 372 carries (landed 10:39), and V4 §3.8's grouped-access exception (seam-surfaces-r3 SR3-11) — T-V10-4's three-building case decides"; (b) §3.16 and J-V10.98 label each dug-access alternative by V9 §4.9's `bend.under.accessDug` row's list form ("Dig down from {building} instead"; SR3-12 (e)), `{building}` the building's name at the session's effective key or its `clerk.content.withheldWords` word when it has none or the key withholds it — no longer a line joined from a button's text and a name; J-V10.98's reason names the one-row rule (J-SS3.9); (c) §3.16 reads "`bend.under.accessDug`'s **Show the way in** and `bend.under.accessOpening`'s buttons (**Show the way in**, **Show me why**) are `select` actions, the latter row listing no building", each labelled with its button's text, so the card carries every button of the row as the canvas's does (T101-3); T-V10-4's three-building clause checks the list-form labels (View as included) and the `select` | §3.16, J-V10.98, §12, T-V10-4 |

Found in passing and fixed (beside part (c)): `ClerkAction`'s `select` member was `{ kind: 'select'; ids }` with no
words, so the card could not word a bend's or refusal's show-buttons (**Show the way in**, **Show me why**, **Show them**)
as the canvas does, nor tell them apart. It is now `{ kind: 'select'; ids; label?: string }`: set, from the V9 §4.9 row's
button text rendered under the session's key, for every `select` made from a bend's or an engine refusal's button (V10
§3.5 step 3, §3.16); absent for V10 §3.16's `role` and `knowledge` rows, whose button V10 §5.4 now draws as its ids'
chips, as an `entity` block is (J-V10.100); §1b.1 gains the label's row (producer the harness, consumer the drawer's
button words). V09's drawer draws `TurnView` as V10 §5.4 gives its meaning (J-V9.34), so V09 needs no change; a lane
note tells its round-4 lane and the coherence pass. Not routed here, and not deferred: V09's list form (SR3-12 (e)) is
V09's own half of the pair, written by its fourth round (J-V9.118; landed 11:48, V09 `f16fc374…`) and cited as found in
section 12.

