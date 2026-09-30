# repair-pipeline-r3 — lane amendments-c/repair-pipeline-r3 (repair round 3, PIPELINE part: §4, §10, PART II, PART III)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/repair-pipeline-r3; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per item — planned | done). The block file is
> `docs/validation/amendments-c/repair-r3-pipeline.md` (blocks only); this file is the lane's report.
> Base: docs/ARCHITECTURE.md sha256 3daa0b0731b8c76f… and docs/ARCHITECTURE-RATIONALE.md sha256 bfa20419ca4dd6e5… (both untouched by this seat).
> ITEM VAL-01 (design part): planned REPLACE §4.6 | done: block B01 REPLACE §4.6 (1 edit) — complete
> ITEM VPR2-01, VPR2-02, VAL-03: planned REPLACE §4.7 | done: block B02 REPLACE §4.7 (6 edits: VPR2-01; VPR2-02 ×2, with (2)–(6); VAL-03 ×2 + the path width, same class) — complete
> ITEM VPR2-03: planned REPLACE §4.11 | done: block B03 REPLACE §4.11 (1 edit; the buried and dug parts, both origins of a buried town) — complete
> ITEM RP3-01 (self-found: the cluster row's fire gap varies by rung, typed a scalar): planned REPLACE §10.2 | done: block B04 REPLACE §10.2 (1 edit) + B02's edit 6 — complete
> ITEM VPR2-04, VPR2-05, VPR2-06: planned REPLACE II.7.6 | done: block B05 REPLACE II.7.6 (4 edits) — complete
> ITEM VS2-04: planned J-ROWS + RATIONALE-A J-A88.42 restated | done: blocks B06 (index row) + B07 (Part A entry) — complete
> ITEM VAL-01 (rationale part), VAL-04: planned RATIONALE-A J-A42.41, J-P37 restated (Part A only) | done: block B07 — complete
> RECEIPTS (apply alone / with siblings, doc checks): planned | done: alone 7/7, combined 15/15, audit 0, swap exact, line counts kept, VD2-03 hand-off exit 0, doc_checks alone exit 0 (C3 191/0), rationale unreviewed set unchanged — complete (§5)

## 0 Outcome

All ten routed issue rows (VPR2-01 – VPR2-06, VS2-04, VAL-01, VAL-03, VAL-04) are repaired in
`docs/validation/amendments-c/repair-r3-pipeline.md`: five REPLACE blocks — §4.6, §4.7, §4.11, §10.2, II.7.6, every one
pipeline-owned — a J-ROWS block (J-A88.42 restated) and a RATIONALE-A block (J-A88.42, J-A42.41 and J-P37 restated).
No new judgment id and no new ruling: each fix completes or corrects wording under a ruling that already stands
(J-A72.50, J-A63.22, J-A81.41 / J-A81.31, J-A65.46, J-A88.42, J-A42.41, J-P37). Every substitution keeps its lines'
count, so each REPLACE keeps its subsection's length and every later line of both files keeps its number. None is
invalid; none is held. No other repair-r3 file REPLACEs any of these headings (determinism: §7.4, §7.7; model: §2.7,
§2.9; checked before each block).

Three places depart from the validator's exact text, each for a stated reason (§2), and one defect found while fixing
VAL-03 is repaired with it (RP3-01, §2 (4)).

## 1 Where each issue landed

| issue | block | the change, in a line |
|---|---|---|
| VAL-01 (design) | B01 §4.6 step 2 | "NG's measured outputs" → "NG 1.2.2's measured outputs" (gate (b)) |
| VPR2-01 | B02 §4.7 S10b *Reconcile* | demand moves between districts "only in S7b's reconcile and in S10a's band-range re-homing (§4.5 (5); J-A72.50)" |
| VPR2-02 | B02 §4.7 *Concealed institutions* (1) | "resolved when the institution is first placed — and again only when a dossier event withdraws the mode the dossier set (below)"; the withdrawal clause now says the use is re-placed by (2)–(6) as the event's least-disruption mutation (§7.7 items 5, 11 (b)), as an open use where the order yields `none` |
| VAL-03 | B02 §4.7 *Informal clusters* 3 (i), (ii) | the footprint bands, the fire gap and the path width are read from the cluster row (§10.2); §10.2's bullet keeps every value |
| RP3-01 (found here) | B04 §10.2 `ClusterRow`; B02 (ii) | `fireGapM` typed by rung (`{ rung; m }[]`, as `householdsPerStructure`); §4.7 reads it "at the settlement's rung" |
| VPR2-03 | B03 §4.11 *The rung at an epoch* | the `buried` and `dug` parts, which no stage re-derives at an epoch, have their cleared bands re-laid from their kept gallery chains by `corridorUnion` (§3.7), drawing nothing |
| VPR2-04 | B05 II.7.6 *The derivations*; `UndergroundSystemRow.chance` | the gate names the scar rule (the `buried` row's `scarSeverity`, no draw; off in the parity presets); the `chance` comment likewise |
| VPR2-05 | B05 II.7.6 *A buried old town* | "its floors laid at … cm below the present grade — its old grade, at which *Depth bands* lays a buried town (above)" |
| VPR2-06 | B05 II.7.6 `params` comment | the scar rows named without values; the values stay in the bullet |
| VS2-04 | B06 index, B07 Part A (J-A88.42) | HistoryHint's three readers (stage count with S2's `max(1, …)`, the catacomb age, the fire / flood scar's buried town) |
| VAL-01 (rationale) | B07 Part A (J-A42.41) | "about 42 % of NG 1.2.2's lot leaves"; index row unchanged |
| VAL-04 | B07 Part A (J-P37) | "the grower's edge test (§4.5) stops at reservation boundaries"; Part F's verbatim copy and the index row unchanged |

## 2 Where the text departs from the validator's, and why

1. **VPR2-02, "(2)–(6)" for the validator's "(2)–(4)".** A mode re-resolved from the map-side sources may be `front`,
   `hidden` or `underground` (the assignment's value or `ConcealmentRow.weights`, §10.2). (2)–(4) place and build a
   front only; a `hidden` mode is placed by (5) and an `underground` one by (6). So the re-placement is (2)–(6), with
   (2)'s fallback chain covering all three.
2. **VPR2-03, both origins of a buried town, and the four stage systems named.** The validator's insert names "a buried
   town a `raiseGrade` made" as the part no stage derives. But II.7.6 runs the history-scar stage "at generation" only,
   so at an epoch a scar-made buried town has no stage either; and one `buried` system per kind means a later
   `raiseGrade` extends a scar-made part, so a part-level "no stage derives" would split one part between two rules.
   The block states the rule for the `buried` and `dug` parts whatever their origin. The re-lay is `corridorUnion` over
   the kept L1 gallery chains in every case, so the result is the same. "each other system's stage" now names its four
   systems (catacomb, cavern, quarry, vaults), so the two clauses cannot both claim the buried part. The undercity's
   plots in a buried part stay II.7.5's stage's, as the sentence already said.
3. **VAL-03 extended to the path width.** 3 (i) also restated the cluster row's `pathWidthM` default ("1.2 m"), which
   §10.2's bullet states. It is the same duplicate class in the same paragraph, so it now reads "of width `pathWidthM`
   (the cluster row's, §10.2; below an alley's)".
4. **RP3-01 (found while fixing VAL-03; minor, pipeline, item 70, kind mechanism).** §10.2's bullet gives `fireGapM`
   "1.0 (in the squalid row 0.8 at CITY and METROPOLIS)", and the deleted §4.7 text said "less in the larger rungs … by
   the row". But `ClusterRow` is keyed by band × climate × era, and `fireGapM: number` cannot hold a per-rung value.
   The type becomes `fireGapM: { rung: string; m: number }[]`, by rung as `householdsPerStructure` is, and §4.7 (ii)
   reads the gap "at the settlement's rung". The bullet's values are unchanged. This fix goes beyond the routed list,
   because the owner's no-defer rule asks for every finding to be fixed now; it is flagged for Fable (§6).

## 3 Cross-part notes (no action required of this seat)

* **Model, §2.7 `Use.concealmentSource` comment.** Since VPR2-02 makes §4.7's *Concealed institutions* (1) state
  what a withdrawal does to the placed use, §2.7's comment now repeats "(the use then placed as an open use) — as that
  event's least-disruption mutation (§7.7 items 5, 11 (b))". The two texts agree. A later model repair could shorten
  the comment to a pointer ("re-resolves the mode by §4.7's *Concealed institutions* (1), writing their source") for
  single source. model r3's §2.7 block leaves the comment as it was, so nothing conflicts.
* **Determinism, the restated J-A68.73 index row (VD2-01).** On the combined copy, doc_checks over the Judgment-calls
  key reports one unreviewed C3 hit, "fraction along the footprint edge", in that row. The row is determinism's, and this
  file's blocks add no such text. Determinism's verification (not yet run when this seat checked) or the assembler
  rewords it, or adds a reviewed allow row if it is a false positive.

## 4 Assembler hand-off

1. **Restated rows (swap_restated).** Index: J-A88.42. Part A: J-A88.42, J-A42.41, J-P37. J-A42.41 and J-P37 are
   restated in Part A only, so apply-blocks' `part_a_without_j_rows` lists exactly those two, as J-A66.01 did in
   round 2. The next hand-off script's EXPECTED sets gain: index {J-A88.42}; Part A {J-A88.42, J-A42.41, J-P37}.
2. **VD2-03 (determinism's `repair-determinism-r3-handoff.py`).** Every '§7.7 item 2' context this file's REPLACE bodies
   hold (§4.11, §10.2) is carried verbatim. The new "§7.7 items 5, 11 (b)" in §4.7 does not match the script's pattern
   (items 1 and 2 only). Run on the combined copy: exit 0, 26 contexts rewritten, every remaining contract pointer
   known (§5).

## 5 Receipts (scratch `c0d81c15…/scratchpad/rp3c/`; the design files untouched, hashes re-checked at end)

* **Alone** (`apply-blocks.py` on copies, this file only): 7 blocks found, 7 applied, 0 skipped; audit not-OK 0;
  headings 147 → 147; fences balanced (130 → 130); title block unchanged; `part_a_without_j_rows` = [J-A42.41, J-P37]
  as handed off. After `swap_restated` (index {J-A88.42}; Part A {J-P37, J-A42.41, J-A88.42}): the design keeps 17 215
  lines and the rationale 2 314. The whole-file diffs are exactly the intended lines — design l. 4924, 5279, 5496,
  5500, 5637, 5641–5644, 6414, 11623, 15995, 16036, 16097, 16099 and the index row l. 17140; rationale l. 191, 600, 764
  (`alone-doc.diff`, `alone-rat.diff`). Every J id in the changed lines resolves to an index row.
* **With the sibling r3 files** (determinism, model; all three block files on disk at 14:31): 15 blocks, 15 applied, 0
  skipped, audit not-OK 0. The swap moved index {J-A88.21, J-A68.73, J-A88.42} and Part A {J-P37, J-A88.21, J-A42.41,
  J-A68.73, J-A88.42}. Determinism's `repair-determinism-r3-handoff.py` then exited 0: 26 contexts rewritten, and every
  remaining '§7.7 item 1/2' pointer is a known contract pointer (`comb-handoff.out`).
* **Document checks**, `doc_checks.py --sections "4.6,4.7,4.11,10.2,II.7.6,Judgment calls"`:
  * base: exit 0 — C1 5/0, C2 0/0, C3 190/0, C4 1/0, S1 0/0, S2 0/0;
  * alone: **exit 0** — C1 5/0, C2 0/0, C3 191/0, C4 1/0, S1 0/0, S2 0/0. The one added hit is the reviewed build tag
    "ng 1 2 2 s" (VAL-01's "NG 1.2.2's"), identified by a patched copy that lists every hit (`dca-*.out`);
  * combined: exit 1 — C3 192/1. The one unreviewed hit is "fraction along the footprint edge" in the Judgment-calls
    index. It comes from determinism's restated J-A68.73 row (VD2-01), not from this file, so it is determinism's own
    verification step (§3 of this report records it for that seat and the assembler).
  * Rationale (whole file): base and repaired have the same 328 unreviewed C3, 7 C4 and 15 S2 hits (the file's
    standing baseline). C3 total 506 → 507, the added hit reviewed.
* **Guard against a double REPLACE**: checked before each block against the repair-r3 files on disk (determinism
  §7.4, §7.7; model §2.7, §2.9); none of them names this file's five headings.

## 6 CONFIRMED versus PLAUSIBLE; held parts; what Fable should re-check first

**CONFIRMED** (executed): every substitution landed once, and every line count held; the blocks apply alone and with the
siblings, with clean audits; the swaps are exact; the VD2-03 hand-off still passes; and doc_checks shows no unreviewed
hit that this file adds. **PLAUSIBLE** (reasoning only): that "(2)–(6)" is the right reading of VPR2-02 (§2 (1)); that no
stage re-derives a scar-made buried town at an epoch, a reading of II.7.6's "at generation" (§2 (2)); and that RP3-01's
per-rung type matches the fire-gap rows the owner-rule design intended (§2 (4)).

**Held parts.** No held part is touched. VAL-01's §4.6 fix adds only the build tag, and item 35's held position check
("160 of 162") stays absent. validate.md §6's list stands unchanged: 52, 35 (support), 60 (support), 68 (g),
68 (support), 50 (MFCG clause).

**Fable, re-check first:** the three departures from the validator's text and the self-found fix (§2 (1), (2), (4)).
