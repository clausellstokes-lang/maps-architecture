## Reconciliation round 4 — continuation (volumes/reconcile-V08-r4, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r4; covered by the whole-design retrovalidation (J84).

The lane was re-issued with a different brief from the one its 07:32 landing covered; that landing's SR3-06 is not in
this brief and stays as written. The two new issues are **both FIXED**, 0 ruled invalid, 0 left on the fix list:
SR3-13 (minor), from `docs/volumes/critique/seam-surfaces-r3.md` §9 (its continuation of 11:06), and SCC-R3C-11
(minor), from `docs/volumes/critique/seam-content-calibration-r3.md` §6.2 (its continuation of 11:18). SCC-R3C-11 asks
for a subset of SR3-13 (a) and (b), and the two were applied as one change.

| issue | what changed (where) |
|---|---|
| SR3-13 (a), SCC-R3C-11 | V08 §13: X19 is **CLOSED**. It cites V11 §3.24.2's `elevated.landmarkMinSignificance` (calibratable, V12 §3.11's `raisedWays` settings line) and V11 §3.1 row 63's `customWeights` (non-calibratable like the row's others); reconcile-V11-r3's continuation landed 10:48. X20 is **CLOSED**. It cites V09 §2.2's `list(key)`, §4.10's re-list, T-V9-28's View-as clause and XV-V9-29 met; reconcile-V09-r3's continuation landed 10:48. §13's opening "and X19 (V11) and X20 (V09) are added" now continues "(both since closed)". |
| SR3-13 (b), SCC-R3C-11 | V08 §12: the round-3 continuation's sentence on X19 and X20 now says they were PLAUSIBLE when written and are CONFIRMED, with both landing times. A new paragraph, "Added by reconciliation round 4's continuation", holds what was read and where. |
| SR3-13 (c) | V08 §3.1 step 7 (b): the answer cache's head-move drop now names its source: "the head move read from the `doc.changed` `ApiEvent` of the handler's one `subscribe(h, …)` on the frame's document (§11.2), registered at each `doc.load` and released at `close` and `switchTo` — firing `onChange` then, so the shell lists again". "The handler keeps no subscription of its own" now reads "no key subscription of its own (V09 §2.2)". T-V8-47 gains "and exactly one `subscribe` on the loaded document", released at `switchTo` with a fresh one at the next `doc.load`. It also gains a behavioural clause: a commit that renames a named place, and an applied tail that raises a named place's knowledge tier above the listed key, each fire `onChange`, and the next `list` names the place by its new name or not at all. This is the failure the seam describes. The same rule is carried into §1b's two rows (the bridge handler's inputs and hook, and the `historyLines` producer) and §2.7's lifecycle row (read, and regenerate). New J-V8.110. |
| SR3-13 (d) | V08 §12: the round-3 continuation's sentence on V09's `epoch` row lines keeps V09's text CONFIRMED and adds "the field itself PLAUSIBLE until volume 6 writes it". Volume 6 wrote the field before this lane edited: reconcile-V06-r4's continuation landed 11:39, with V06 §2.10's `EpochReport.raised.suppressedFired: { removal; week }[]`, V06 §3.19.3 (2), T-V6-58 and J-V6.120, and its X44 asks this volume to close X21. So §13 gains X21 (V06) as SR3-13 (d) states it, and X21 is **opened and closed** in this lane, as X16 was in round 3. The new §12 paragraph confirms the field. V08 §4.6 item 3 and T-V8-45 now cite V06 §2.10 as the producer. |

**Found in passing and fixed (the intake rule).** J-V8.106's REVISED tail said "the handler keeps no subscription". That
is the same defect as SR3-13 (c), so it now reads "no key subscription (V09 §2.2) … its one `subscribe` on the document
reads head moves for its answer cache only (J-V8.110)". §12's new paragraph records one point as PLAUSIBLE: that §11.2's
`doc.changed` event fires for an applied tail as it does for a local commit. The base's `subscribe` row lists the event
without saying which commits raise it. V10 §3.11's staleness watch reads it the same way (a host's dossier event,
another client's edit), and T-V8-47's new clause measures it.

**New rows.** J-V8.110 is new, and J-V8.106 is edited in its REVISED tail. There is no new bar: T-V8-45 and T-V8-47 are
widened. In §13, X19 and X20 are closed and X21 is added and closed. Effort is unchanged, since one `subscribe` and its
release fit SF6's range. Counts now are 110 J-V8, 32 BCR-V8 (item 202 withdrawn), 47 T-V8 and 5 owner questions. No
base change request is needed, because §11.2's `subscribe` is used as the base states it.

**For the siblings (no edit made in their files).** V06: X44's request is met here (X21 closed, §12 CONFIRMED). V09:
XV-V9-28's second reader (V08 §4.6 item 3) now cites V06 §2.10, which is SR3-12 (b)'s pair. V09 §2.2's "keeping no View-as
state or key subscription of its own" reads as V08 §3.1 step 7 (b) now does.

