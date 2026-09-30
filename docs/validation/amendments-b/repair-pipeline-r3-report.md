# repair-pipeline-r3 — report and ledger of lane amendments-b/repair-pipeline-r3 (PIPELINE part: §4, §10, PART II, PART III)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-b/repair-pipeline-r3; queued in docs/FABLE-REVIEW-QUEUE.md.

PROGRESS
ITEM VAL-01: planned §4.1 | done block 1 (REPLACE §4.1)
ITEM VAL-02: planned §4.6, J-ROWS J-A30.41, RATIONALE-A J-A30.41 | done blocks 2, 7, 8
ITEM VP2-01: planned §4.7 (1), §10.2 (2), J-ROWS + RATIONALE-A J-A28.46 (3) | done blocks 3, 5, 7, 8
ITEM V-MAB2-02: planned §4.7 | done block 3
ITEM VP2-02: planned §4.11 | done block 4
ITEM VP2-03: planned §4.11 | done block 4
ITEM VD2-02: planned §4.11 (1)–(4), J-ROWS + RATIONALE-A J-A20.43 (new) | done blocks 4, 7, 8
ITEM V-MAB2-11: planned §10.2 | done block 5
ITEM VP2-04: planned II.6, J-ROWS + RATIONALE-A J-A11.43 | done blocks 6, 7, 8 (block file complete: 8 blocks + END)
ITEM verify: planned apply on a copy with apply-blocks.py, diff audit, doc_checks | done (receipts below)

Block file: docs/validation/amendments-b/repair-r3-pipeline.md. Base: docs/ARCHITECTURE.md sha256 831efd42… and
docs/ARCHITECTURE-RATIONALE.md sha256 f2c2a1ca… (assemble-r2's output, the state validate.md judged).

## Outcome

All nine pipeline issues routed to this lane (validate.md §6: VD2-02 major; V-MAB2-02, VP2-02, V-MAB2-11, VP2-01, VP2-03,
VP2-04, VAL-01, VAL-02 minor) are fixed by eight blocks: REPLACE §4.1, §4.6, §4.7, §4.11, §10.2 and II.6, one J-ROWS and
one RATIONALE-A. Each REPLACE body is the live subsection (doc 831efd42…) with count-asserted substitutions made by
`scratchpad/rp3b/gen.py`; every other line is verbatim. The validator's required text is applied as written except for
the refinements listed below, each made to close a gap the required text left.

| issue | where | what changed |
|---|---|---|
| VD2-02 (major) | §4.11 | new paragraph **Dossier content across epochs** after the epoch-spread paragraph (the one §7.7 item 2 and §5.3's row point to, determinism's VD2-01); use step (2) never closes a dossier-backed use; rung 3's purchase relocates, never closes; decline table's exemptions row; new ruling J-A20.43 |
| VP2-02 | §4.11 epoch order (a) | S6 re-bands every live plot's `fieldBand` before any rung reads it, former values in the epoch's undo record |
| VP2-03 | §4.11 regrowth-first (6) | the crowding hook sends `crowdingShare` of the residual's poorest-band households underground |
| VAL-01 | §4.1 | the stale list gains a spanned passage's face and points to §2.8's `ElaborationRecord.inputs` |
| VAL-02 | §4.6 | the hidden-share target read at the district's area-weighted mean value, scaled by the rung and density factors; J-A30.41 restated |
| VP2-01 | §4.7, §10.2, J-A28.46 | at least one household per residential slot; an unfillable slot dropped (yard), an unfillable plot vacant; §10.2 a pointer; J-A28.46 restated |
| V-MAB2-02 | §4.7 | the overflow pass runs inside every change §2.6's capacity rule lists (pointer to model's V-MAB2-01) |
| V-MAB2-11 | §10.2 | `basementAccess` commented as the default `Basement.access` derives from at `builtBand` |
| VP2-04 | II.6, J-A11.43 | the stretch widened to plot-frontage breaks; the parts keyed by §6.3's SPLIT rule (pointer, VP2-05); chambers, access points and block `Frontage` records re-pointed; J-A11.43 restated |

## Refinements beyond the validator's text (all PLAUSIBLE, for Fable to re-check)

1. **VD2-02, dossier events excepted.** The required "No step of an epoch closes a dossier-backed use" would forbid step
   (e)'s own dossier events, which item 20 (c) lets remove, add or re-designate. The paragraph adds: "only a dossier event
   the epoch applies at step (e) removes, adds or re-designates one".
2. **VD2-02, a total relocation.** The forced relocation's request excludes the plots the step empties or removes, so the
   use never moves into doomed fabric, and widens to the town where the catchment then holds no candidate. In the use
   step a dossier-backed use whose catchment holds no candidate stays in its building. Its ordinary inertia moves are
   unchanged. The validator's "and otherwise stays" read as if a dossier-backed use never moved by inertia. Recorded as
   J-A20.43, a pipeline id; J-A20.75 stays the determinism file's.
3. **VP2-01, fill order.** A plot's slots are filled in slot-list order, required slots first, so a dropped slot is never
   the main building of a filled plot. "the reconcile below" became "S10b's reconcile (above)", because the reconcile
   stands above that paragraph.
4. **VP2-04, precise widening.** "Opposite which no plot's frontage continues" is stated as a station test on both sides
   of the tunnel (a plot's frontage = the interval of centreline stations its frontage edges project onto). The
   widening is shown by the dry run and reported with the fates, not stored in the op. A `Frontage` split at an end is
   keyed "as the tunnel's parts are": §6.3 names the tunnel record only (VP2-05), so this applies that rule by pointer.
5. **VAL-02, fallback pointer.** The clamp is worded "capped at one", and §13.7's item-30 row is named as the fit's
   fallback. That row already re-tunes the weights once, then widens the tolerance to the measured p90. The scaled target
   can exceed what a saturated passage weight delivers in dense METROPOLIS poor districts, and the fallback catches it.

## Assembler hand-off

(1) RESTATED ROWS: J-A30.41, J-A28.46 and J-A11.43, index and Part A each. Swap each into the older row's place, as
assemble-r1-handoff.py's `swap_restated` does. New id J-A20.43 is appended. (2) No other round-3 file replaces §4.1, §4.6,
§4.7, §4.11, §10.2 or II.6; the determinism, kernel and model files were checked on disk at 09:40. (3) This file's
pointers depend on other files: §2.6's capacity rule and Basement.access (model), §2.8's stale gloss (model), §6.3's
tunnel SPLIT sentence (determinism, VP2-05). J-A20.75 is restated by the determinism file only.

## Receipts (CONFIRMED, executed on copies; docs/ARCHITECTURE.md and the rationale file were not touched)

* Block file sha256 `2d2c4ff0…`, 8 blocks + END. `apply-blocks.py` applied 8 of 8 blocks with 0 skipped and audit "not OK: 0".
  Headings stay 145 → 145, fences are balanced (108 → 108), the title block is unchanged and PENDING lines stay 0 → 0. The
  document goes 12 942 → 12 974 lines; the rationale goes 2 050 → 2 054 before the swap. After the hand-off swap
  (`swap_restated`, 3 + 3 rows) the whole-document diff is 18 hunks and the rationale diff 4, exactly the planned ones.
* `refs.py` gives the same 2 baseline entries before and after (the external §2.1.4 and RFC 7946 §3.1.6, shifted by line
  only). J-A20.43 resolves.
* `doc_checks.py --sections "4.1,4.6,4.7,4.11,10.2,II.6,Judgment calls"` exits 0 on the applied copy: C1 5/0, C2 0, C3
  188/0 unreviewed, C4 1/0, S1 0, S2 0. The live document scored C3 187/0 and exit 0. A first run found 4 C3 phrase runs
  of my own wording, and they were reworded rather than allowed: "capped at one", "The overflow pass", "widens it, at
  both ends, out to", "interpolated to each district's". No allow row was added.
* Receipts: `scratchpad/rp3b/` (gen.py, verify.sh, apply-stdout.txt, doc.diff, rat.diff, refs-*.json, dc-*.txt).

PLAUSIBLE only: the refinements above and the claims the validator marked PLAUSIBLE — that every epoch path is listed,
that the widening rule is right, and that the scaled target can be attained. None of them was executed; the design has
no code yet.
