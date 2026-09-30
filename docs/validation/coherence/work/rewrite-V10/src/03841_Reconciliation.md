## Reconciliation round 1, second brief (volumes/reconcile-V10-r1, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V10-r1; covered by the whole-design retrovalidation (J84).

Reconciled in place against the continuation of `docs/volumes/critique/seam-surfaces-r0.md` (its §5, SS-28 – SS-46, read
in the live text after reconciliation round 4 and the integration continuation). Round 1's first brief (SS-09 – SS-27,
landed 04:03) is history; this second brief under the same lane key covers the four issues the continuation addressed to
this volume: 4 fixed, 0 invalid, 0 on the fix list. New here: decision J-V10.94 and cross-volume request CVR-V10-17. No
new test or change request: T-V10-4 and T-V10-29 gain clauses, and BCR-V10-12's closing sentence is corrected. The build
plan's estimates are unchanged: the refusal card already renders a `MsgRef`, so dropping two templates removes text, and
the terrace's `water` is one field the `raise` row already writes.

| issue | severity | what changed | where |
|---|---|---|---|
| SS-28 | major | the bends paragraph is retitled **The dry run's bends**: every `bend.*` row of V9 §4.9 — item 110's and file f item 582's (`bend.place.noSite`, `bend.place.overBudget`, `bend.vacate`), `bend.invalid` among them — reaches the model and the card as the item's `bent` line with its alternatives as `propose` actions carrying the events the canvas's button commits, no refusal category used; `bend.vacate`'s **Keep {building}** is the card's **Drop** or the model's `check_draft` `drop`; the `rule` row's *when* is an F-EDIT neither dossier-owned nor a lock that the dry run does not bend (a kept record, a staged layer, the rung, a warp or new water reaching a held record, an undo's dependence, an assignment), its sentence the engine's `MsgRef` (V9 §4.9's `refuse.*` row for the code); the `lock` row renders `refuse.locked`; `clerk.content.refusals` carries no `msg` for `lock` and `rule`; §3.5 step 3 maps a bent answer to a `bent` item and the engine's actions to `propose` or `select`; prompt rule 10 says a bent item is not refused; T-V10-29 checks that no engine code has a second English sentence in `clerk.content.refusals` | §3.16, §3.5, §3.3 rule 10, §2.9, §2.10, §1b.1, T-V10-29, J-V10.94, CVR-V10-17 |
| SS-36 | major | §4.1's `terrace` row writes `water: input.water ?? 'locked'`, as its `raise` row and V9 §4.20.1 (4)'s T2 mapper do, so the canvas's and the clerk's terrace are one byte sequence and a terrace whose water follows can be asked for; IN-V10-5's "`water` stays absent (`locked`)" is replaced by that clause; T-V10-4's terrace case compares the two paths' bytes at the default and at `follow` | §4.1, IN-V10-5, T-V10-4 |
| SS-33 | minor | "Dig a well at {terminal} instead" dropped from §3.16's bends and from IN-V10-1; the list reads "Add a hoist instead", "Stairs along the front", and the uphill aqueduct's bent result — the well itself — is cited to V9 §4.20.2 (5) and J-VI.4 (h) | §3.16, IN-V10-1 |
| SS-37 | minor | BCR-V10-12's closing sentence and §10.3's *withdrawn* cell read "BCR-V9-16's duplicate `sizeM2` wording (its §7.1 part); its §9.5 part on the badge's plus and minus stands (file f item 348)" | §10.1 BCR-V10-12, §10.3 |

Found in passing and fixed: the `dossier` row's engine cases still worded F-EDIT `dossier-owned` with the clerk's own
sentence ("SettlementForge sets {name}; …") — a second sentence for an engine code that T-V10-29's new clause would
catch; they now render V9 §4.9's row for the code (`refuse.dossierOwned`, `refuse.dossierRemove`,
`refuse.roster.dossier`), the clerk's own sentence kept only for a refusal given before any tool call. The `rule` row's
list adds an assignment holding the target (`refuse.assigned`), which V9 §4.9 names among the remaining refusals and
SS-28's list left out. Routed, not fixed here: CVR-V10-17 (V09's family row), announced to reconcile-V09-r1 by a lane
note.

---
