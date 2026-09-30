# repair-pipeline-r2 — lane amendments-b/repair-pipeline-r2 (repair round 2, PIPELINE part: §4, §10, PART II, PART III)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-b/repair-pipeline-r2; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per item — planned | done). The block file is
> `docs/validation/amendments-b/repair-r2-pipeline.md` (blocks only); this file is the lane's report.
> Base: docs/ARCHITECTURE.md sha256 365e19f2… and docs/ARCHITECTURE-RATIONALE.md sha256 50a94f2d….
> Generator: scratchpad rp2/gen.py (each REPLACE body = the live subsection with asserted single-occurrence
> substitutions, every untouched line verbatim); the block file is re-composed atomically after each spec, always closed.
> ITEM VP1-06 (26): planned §4.1, §4.7, §4.9, J-A26.44 | done: §4.1, §4.7, §4.9 (blocks 01, 05, 06); J-A26.44 (J-ROWS, RATIONALE-A)
> ITEM VP1-09 (24): planned §4.2 S3 (12), J-A24.43 | done: §4.2 (block 02)
> ITEM VP1-14 (19): planned §4.5 | done: §4.5 (block 03)
> ITEM V-MAB1-02 (30): planned §4.6 | done: §4.6 (block 04)
> ITEM V-MAB1-04 (28 (f)): planned §4.7, §10.2, J-A28.46 (new) | done: §4.7, §10.2 (blocks 05, 08); J rows written
> ITEM VP1-10 (20): planned §4.7, J-A20.42 (new) | done: §4.7 (block 05)
> ITEM VP1-15 (31, 19): planned §4.7 | done: §4.7 (block 05)
> ITEM VP1-07 (26): planned §4.9, J-A26.44 | done: §4.9 (block 06); J-A26.44 (J-ROWS, RATIONALE-A)
> ITEM VP1-01 (31): planned §4.11, J-A31.40 | done: §4.11 (block 07); J rows written
> ITEM VP1-02 (31): planned §4.11, J-A31.44 | done: §4.11 (block 07); J rows written
> ITEM VP1-04 (31, 8): planned §4.11, J-A31.44 | done: §4.11 (block 07); J rows written
> ITEM VP1-05 + VD1-03 (31, 8): planned §4.11 | done: §4.11 (block 07)
> ITEM VD1-14 (31, 17): planned §4.11 | done: §4.11 (block 07)
> ITEM VD1-15 (31 (c)): planned §4.11, J-A31.48 | done: §4.11 (block 07); J rows written
> ITEM VP1-12 (11, 12): planned II.6, §4.11, J-A11.43 (new) | done: §4.11, II.6 (blocks 07, 10); J rows written
> ITEM VP1-13 (12): planned II.7.3, II.7.4, J-A12.47 (new) | done: II.7.3, II.7.4 (blocks 11, 12); J rows written
> ITEM VP1-16 (12): planned II.1 | done: II.1 (block 09)
> J-ROWS + RATIONALE-A: planned | done: J-ROWS 9 rows, RATIONALE-A 9 entries (J-A24.43, J-A26.44, J-A31.40, J-A31.44, J-A31.48 restated; J-A11.43, J-A12.47, J-A20.42, J-A28.46 new)
> VERIFY: done (apply-blocks 14/14 applied, audit 0 not-OK; restated rows swapped on copies; refs 2 = baseline; doc_checks exit 0)

## 0 Outcome

All 18 issues routed to the pipeline part in round 2 are repaired in `docs/validation/amendments-b/repair-r2-pipeline.md`
(V-MAB1-02, V-MAB1-04, VP1-01, -02, -04, -05, -06, -07, -09, -10, -12, -13, -14, -15, -16, VD1-03, VD1-14, VD1-15;
VP1-05 and VD1-03 are one fix). The file holds 12 REPLACE blocks — §4.1, §4.2, §4.5, §4.6, §4.7, §4.9, §4.11, §10.2,
II.1, II.6, II.7.3, II.7.4, every one a pipeline heading — plus a J-ROWS block and a RATIONALE-A block (5 restated rows and
4 new ones in each). Every REPLACE body is the live subsection with asserted single-occurrence substitutions (37 edits),
so every untouched line is verbatim. Applied to scratch copies with the restated rows swapped into place, the result
has 32 document hunks and 5 rationale hunks, all intended. The resolver finds the 2 baseline external breaks and no
new ones. The document checks on the 13 changed heading keys exit 0 with the baseline counts (C1 5, C3 254 of which 249
are the pipeline's baseline and 5 §10.2's, C4 1; all reviewed). No allow row was needed: one new C3 hit ("run in the
table below") was reworded away. Four new vetoable rulings are recorded (§2).

## 1 Where each issue landed

| issue | block(s) | the change, in a line |
|---|---|---|
| V-MAB1-02 | §4.6 | the passage bullet cites `BaseWing.spans`, which a composition inherits (the model's r2 block adds the field) |
| V-MAB1-04 | §4.7, §10.2, J-A28.46 | S10b places households per residential slot up to `households.built`; S11 writes `Building.households` clamped to the capacity on the wings it made; an overflow is re-placed by S10b's solver after the district's last S11 batch, else it becomes an F-SITING item; later shell changes keep to the same capacity |
| VP1-01 | §4.11 rung 2, J-A31.40 | the front plot keeps its address and `builtBand`; every child's lineage continues by §6.3's SPLIT rule |
| VP1-02 | §4.11 floor, J-A31.44 | "moves it only through rung 3" becomes "lowers it only through rung 3" (a refurbishment raises it; rung 2's rear plots take their stock's band) |
| VP1-04 | §4.11 writer list, J-A31.44 | an `amalgamate` that builds nothing keeps the anchor member's `builtBand` and `builtProsperity` (§6.3's JOIN) |
| VP1-05, VD1-03 | §4.11 rung 1 | the condition steps down with wear and patched roofs only; a roof is lost only by `decay` after the last household has left (the derelict state) |
| VD1-14 | §4.11 rung 1, `LadderOp.thin`, J-A31.40 | `thin … infill` re-homes the households and vacates the buildings before it clears them; infill it cannot re-home waits |
| VD1-15 | §4.11, J-A31.48 | only a re-derivation takes fresh lineage (§6.3's succession rule) |
| VP1-06 | §4.1, §4.7 S10b, §4.9, J-A26.44 | farm households sit on outside plots only under `fill`; the `farmsteads` field-system preset is folded into `fill` (a farmstead lot is a count-driven outside plot, driveway included) |
| VP1-07 | §4.9 `rivers`, J-A26.44 | a river band too small for the arable demand continues as `perimeter` beyond the band, and the shortfall is reported (never a failure) |
| VP1-09 | §4.2 S3 (12), J-A24.43 | `portRef` is a stored `market.siting` cell computed by running S0–S2; a scripted pass re-runs it when a roster row changes (a table-version bump with its declared shift); a contract test (§13.2) checks it |
| VP1-10 | §4.7 S10b, `PlacementResult`, J-A20.42 | closest options are ordered by the number of hard rows failed, then score descending, then plot id |
| VP1-12 | II.6, §4.11 `DeclineOp`, J-A11.43 | a conversion given a `stretch` first splits the tunnel into its own records (`rekey`; the first-vertex part keeps the address; every part continues the lineage), so each record has one condition reading |
| VP1-13 | II.7.3 (c), II.7.4, J-A12.47 | the crowding hook reads the epoch's residual after the regrowth-first steps (0)–(5); its share is the typed field `UndergroundRule.crowdingShare` |
| VP1-14 | §4.5 | the band-keyed tables are "granularity and the designation templates (the site-plan table folded into them, J-A19.41)" |
| VP1-15 | §4.7 S11 | geometry columns read §4.11's plot-level manifested band |
| VP1-16 | II.1 | the `key` comment names the underground arena |

## 2 Rulings recorded (vetoable; index row + Part A entry each)

* **J-A28.46 (V-MAB1-04).** The generation fill is split between the two stages that can each read what they need.
  The re-placement uses S10b's own solver (score, then building address) instead of the verifier's "nearest", so no
  second ranking exists. When no building in the district has room, the household goes to F-SITING like any other
  household S10b cannot place, and F-SITING's home rule decides a dossier-backed one. The re-placement order is
  PLAUSIBLE. It was the verifier's proposal, adapted here.
* **J-A11.43 (VP1-12).** A stretch conversion splits the tunnel record. The alternatives were a per-stretch closure
  list, which would be a second stored state and so break J-A11.21, and whole-tunnel conversions only.
* **J-A20.42 (VP1-10).** Closest options are ordered failures-first. This refines J-A20.71's "best-scoring site", and
  the determinism r2 block already points F-SITING to "§4.7 S10b's order".
* **J-A12.47 (VP1-13; an extension beyond the issue's text).** The hook's quantity is the residual, as required. The
  seat added two things: the share became a typed field, `crowdingShare`, default 0.10 (PLAUSIBLE; staged), and it
  applies to the poorest band's households, which S7b (6) (a) already sends underground. This closes a staged hook that
  had "a table share" and no field (rule 4).

Restated rows are J-A24.43, J-A26.44, J-A31.40, J-A31.44 and J-A31.48, each with a round-2 amendment note in Part A.

## 3 Assembler hand-off

1. **Restated rows.** The J-ROWS and RATIONALE-A blocks carry 5 ids the tables already hold: J-A24.43, J-A26.44,
   J-A31.40, J-A31.44 and J-A31.48. Swap each later row into the older row's place, as `assemble-r1-handoff.py` step 1
   does. The seat's copy check swapped 5 rows in each table, which leaves 468 rows and no duplicate ids.
2. **Order.** The file's blocks are independent of the other r2 files. No heading outside the pipeline part is touched.

## 4 Cross-part residuals (for the next verify round; not this part's text)

* **Model, §2.6.** The static-baseline sentence ("with no epoch every building houses its template row's
  `households.built`, clamped into [1, capacity]", model r2 l. 620) does not cover a building that S11's overflow pass
  re-placed a household into. Suggested wording: "…clamped into [1, capacity], plus any household §4.7's overflow pass
  re-placed into it".
* **Scope, §13.2.** T19-4 needs the same qualifier. §13.2 also needs the `portRef` contract test that §4.2 S3 (12) now
  cites: "the stored `market.siting` `portRef` equals the median port demand fraction over B-CITY's harbour seeds
  computed by S0–S2".
* **Determinism, §5.2 F-PLAN.** Its tier-6 text still says "which S10b's fill and `relet` keep to (§4.7 S10b, §4.11)".
  It should read "the generation fill (S10b's placement, S11's clamped write) and `relet`".
* **Determinism, §6.3.** The SPLIT rule names the anchor only for a plot. II.6 now keys a tunnel's parts with the
  centreline's first vertex standing for the anchor. §6.3 could state the linear-record form once.

## 5 Receipts (CONFIRMED)

The live documents were read at sha256 365e19f2… (architecture) and 50a94f2d… (rationale), unchanged from the first read
to the last. The seat's copies are in the scratchpad under `rp2/`: `applied.md` / `final.md`, `doc.diff`, `rat.diff`,
`apply-log.json`, `refs-before.json` / `refs-after.json`, `dc-before.txt` / `dc-after.txt` / `dc-before-10.txt`, and the
generator `gen.py` with `specs/`. Results from those copies:

* `apply-blocks.py`: 14 of 14 blocks applied, 0 skipped, audit not-OK 0.
* Headings 145 → 145; fences balanced; title block unchanged.
* Retired-phrase probes: the 18 retired strings leave 0 hits in the part. The remaining hits are outside the part or
  intended: J-DET-2's "only New random" (determinism's VD1-04), the quoted old phrases in the Part A amendment notes, and
  "S0–S2 alone".
* `refs.py`: 139 headings, 463 J ids (459 + 4), the 2 baseline external breaks.
* `doc_checks.py` on "4.1, 4.2, 4.5, 4.6, 4.7, 4.9, 4.11, 10.2, II.1, II.6, II.7.3, II.7.4, Judgment calls": exit 0.

**PLAUSIBLE (judgment):** the four rulings above, the `crowdingShare` default, and the reading of "the generation fill"
for post-build shell changes.
