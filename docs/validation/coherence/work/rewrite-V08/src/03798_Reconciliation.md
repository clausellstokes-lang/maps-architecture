## Reconciliation round 5 (volumes/reconcile-V08-r5, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r5; covered by the whole-design retrovalidation (J84).

Reconciled in place against the four seam issues owned by this volume in `docs/volumes/critique/seam-settlements-r4.md`
(SR4-06, SR4-07, SR4-12) and `docs/volumes/critique/seam-surfaces-r4.md` (SR4-06), all minor: **4 FIXED**, 0 ruled
invalid, 0 left on the fix list. The two files number their findings separately, so "SR4-06 (settlements)" and "SR4-06
(surfaces)" are two issues.

| issue | what changed (where) |
|---|---|
| SR4-06 (settlements) | V08 §3.5.1 (c): after "the greater's building" the rule reads "— save a lesser that is a pin record, which V11 §3.12's row keeps as a pin of the greater's plot: `parish_church` over `wayside_shrine` binds the shrine's key to the churchyard `cross` pin, laid by VS8 at a village rung (V07 §2.4, §3.10; seam-settlements-r4 SR4-01), while at a base rung, where no churchyard cross is laid, it aliases the church building as above". It adds that the target is chosen where the merge is first read and kept across a later rung change (J-V8.111). T-V8-46's VH clauses gain SR4-01's hamlet fixture: the shrine record's key bound to one `cross` pin in the churchyard and aliased on no building. They also gain the base-rung counterpart, a `town-1` mutation whose shrine key aliases the church building. |
| SR4-07 | V08 §4.6: `unmapped_kind`'s `class` arg reads "the display label (§9.5) of the class that builds the record at the document's rung — at a village rung the class V07 §3.11 steps 2–4 give (the `villageForm`, the archetype's `village` cell, or the tag fallback), or the pin kind its cell names — read after the fold". `custom_resolved`'s `class` cites that row and names the `mercantile-market` case (the market cross, not the `market_hall`). V08 §3.5 step 5 (d)–(e) and §3.6 (4) now write `unmapped_kind` after the fold, as `custom_resolved` already was: after the dry run at an absorb, after `generate` at creation, and from the loaded document's state for an offer answered `unchanged`. This happens before `notes` and `notesCleared` are computed, so a note whose built class changes is cleared and written anew (J-V8.112). §1b's `PortNote` row and §2.7's lifecycle row say the same. T-V8-46 gains a hamlet fixture, off any through road, whose unmapped `lodging` kind's note names `v.alehouse`, and a clause for T-V7-21's `mercantile-market` record, whose `custom_resolved` note names the market cross. |
| SR4-12 | V08 §1b's row for `DossierInstitution.step`, `.lesser`, `.popQualifier` and the ladder merge: the consumer cell adds "at village rungs V07's readings — V07 §2.4's range rows (`rules.ladders.ranges`), DR9's members and V07 §3.10's QUARTER end claim" (the section signs qualified by volume, this volume's convention). It also adds the pin lesser's churchyard `cross` from SR4-06 (settlements). |
| SR4-06 (surfaces) | V08 §13: X11 (V10, V06) is **CLOSED**, citing V10 §3.9's `info.raised.*` rows with `info.raised.suppressed` as one key (CVR-V10-14's V08 part **Met**) and V06's chronicle `raisedWay` entries (W19; V6 §3.15.1) drawn as V9 §4.10's `epoch` rows. X12 (V09) is **CLOSED**, citing V9 §4.9's sentence on `host.*` keys, V9 §5.12's `host.locked` and T-V9-15 (SR2-18, V09's round 2). §13's opening names both closures under this round. Each citation was read in the live text (V10 0edd1635…, V09 f16fc374…, V06 1d669d79…). |

**New rows.** J-V8.111 and J-V8.112. §13 gains X22 (V07, V11), open until reconcile-V07-r5 and reconcile-V11-r5 land
with SR4-01, SR4-02 and SR4-08. §12 gains the paragraph "Added by reconciliation round 5". Its one PLAUSIBLE point
is that V07 §3.10 lays the churchyard `cross` and V11 §3.11–§3.12 read as SR4-01 and SR4-02 require. Those lanes,
reconcile-V07-r5 and reconcile-V11-r5, were running when this was written, and T-V8-46's hamlet clause would refute the
rule if they land otherwise. No bar is new: T-V8-46 is widened. No base change request is needed. Counts now are 112
J-V8, 32 BCR-V8 (BCR-V8-9 withdrawn), 47 T-V8 and 5 owner questions. Effort is unchanged: the note's later write and the
pin-lesser branch fit SF3's range.

**For the siblings (no edit made in their files).** V07 (reconcile-V07-r5): SR4-01's rule is the producer this volume's
pin-lesser branch binds to, and SR4-08's step 4 can cite V08 §4.6's `unmapped_kind` row as it now reads. V11
(reconcile-V11-r5): SR4-02 (b)'s "at a base rung the shrine record's key aliases the church, V08 §3.5.1 (c)" matches
this volume's text.

