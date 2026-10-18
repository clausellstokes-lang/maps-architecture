# repair-scope-r3 — lane amendments-b/repair-scope-r3 (repair round 3, SCOPE part): report and ledger

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-b/repair-scope-r3; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per item — planned | done). The block file is
> `docs/validation/amendments-b/repair-r3-scope.md` (blocks only; its preamble is the assembler hand-off). Base:
> docs/ARCHITECTURE.md sha256 831efd429092adf3… and docs/ARCHITECTURE-RATIONALE.md sha256 f2c2a1ca11a0f1da…
> (assemble-r2's output, the state validate.md judged). Generator: scratchpad rs3/compose.py over rs3/specs/*.py and
> rs3/rows.py (each REPLACE body = the live subsection with count-asserted single-occurrence substitutions; the block
> file re-composed atomically after each spec, always ending in "=== END ===").
> ITEM VAL-04 (31): planned the one-page summary | done: block 01 (the summary: 'until one of those') written
> ITEM VS2-01 (20, 28 (f), 30): planned §0.2 rows 20, 28, 30 | done: block 02 (§0.2 rows 20, 28, 30; row 20 also names §4.11's *Dossier content across epochs*) written
> ITEM VS2-03 (20): planned §13.2 T20-6; §16 M3a, M4; §0.2 row 20; §15.2 O10 (i); J-A17.01 index + Part A; J-A20.01 Part A | done: blocks 02 (row 20), 05 (T20-6), 07 (O10 (i)), 08 (M3a, M4), J-ROWS (J-A17.01 restated), RATIONALE-A (J-A17.01, J-A20.01 restated) written
> ITEM VS2-11 (9): planned §1.1 `RungProfile` comment | done: block 03 written
> ITEM VK2-08 (28): planned §13.1 transient-arena clause | done: block 04 written
> ITEM VK2-09 (28): planned §13.1 (1) differential line, (2) `tileRings` fixtures, (3) three-side fixture | done: block 04 (1)–(3) written
> ITEM VS2-02 (29, 28): planned §13.2 T28-3, T29-4 | done: block 05 written
> ITEM VP2-09 (19, 28 (f)): planned §13.2 T19-4 | done: block 05 written
> ITEM VS2-05 (24): planned §13.2 stage contract tests | done: block 05 written
> ITEM VP2-11 (31): planned §13.2 T31-10 | done: block 05 written
> ITEM VP2-12 (11): planned §13.2 T11-1 | done: block 05 written
> ITEM VR2-06 (30 (d)): planned §13.2 T30-5 | done: block 05 written
> ITEM VAL-03 (31, 28 (f)): planned §13.2 T31-9, T31-11 | done: block 05 written
> ITEM VAL-05 (30): planned §13.2 T30-2; §13.7 item-30 row; sweep §15.2 O18 (d) | done: blocks 05 (T30-2), 06 (§13.7), 07 (O18 (d)) written
> ITEM VP2-13 (12): planned Staged sewers-and-islands row | done: block 09 written
> RECEIPTS: planned scratch assembly with every r3 file, refs.py, doc_checks, T-id script | done: scratch assembly 46/46 applied (all six r3 files), audit not-OK 0, headings 145 → 145, fences balanced; refs 2 broken → 2 (pre-existing external); T-ids 89 defined, 0 unplaced; section diff = this lane's hunks only; doc_checks runs 1, 2 and 4 drew 7 C3 runs of mine, all reworded; the final run exit 0 with no new allow row

## 1 Outcome

All 15 routed issues are answered in `docs/validation/amendments-b/repair-r3-scope.md`: 9 REPLACE blocks (the one-page
summary, §0.2, §1.1, §13.1, §13.2, §13.7, §15.2, §16, the Staged list), one J-ROWS block (J-A17.01 restated) and one
RATIONALE-A block (J-A17.01 and J-A20.01 restated). No new J id. Each merged duplicate is applied once, through its
primary (V-MAB2-14 and VK2-07 via VS2-02; VD2-03 via VS2-03; VS2-04 via VP2-09; VP2-10 via VS2-05; VS2-06 via VP2-11;
VS2-07 via VP2-12; VS2-08 via VP2-13; VS2-09 via VK2-08; VS2-10 via VK2-09; VK2-10 and VR2-05 via VS2-11; VS2-12 via
VR2-06). Every REPLACE body is the live subsection with count-asserted substitutions; every untouched line is verbatim.

| issue | where | fix (short) |
|---|---|---|
| VS2-01 | §0.2 rows 20, 28, 30 | `Identity.dossier`, a `DossierRef` (§7.1), J-A20.22; J-A28.46's generation fill and `Plot.fieldBand`; `BaseWing.spans` (J-A30.23) |
| VS2-02 | T28-3, T29-4 | the basement's three accesses: the core, a trapdoor (or the reported `trapdoor` core), a walk-out's outside stair |
| VS2-03 | T20-6 new; §16 M3a, M4; §0.2 row 20; §15.2 O10 (i); J-A17.01; J-A20.01 | the refusal clause at M3a; the epoch clause at M4 |
| VP2-09 | T19-4 | one household to capacity, the overflow pass's moves, every household housed or reported unplaced |
| VS2-05 | §13.2 contract tests | the `portRef` contract test, from M1 |
| VP2-11 | T31-10 | an `amalgamate` that builds nothing keeps its anchor member's `builtBand` |
| VP2-12 | T11-1 | the stretch split: address, lineage, re-pointing, only the stretch's plots closed, U1, one-record undo |
| VP2-13 | Staged sewers row | the crowding share |
| VK2-08 | §13.1 | every crossing vertex a vertex of both rings, the joint shared vertex for vertex |
| VK2-09 | §13.1 | `tileRings` in the differential line and its three outcomes; a wall end on three input sides |
| VS2-11 | §1.1 | the comment points to §3.2 (9) |
| VR2-06 | T30-5 | a bridged `.plat` request under a `public` key answered by `export.refused` |
| VAL-03 | T31-9, T31-11 | shells read without the `composition`-role vertices (§2.6, J-P48 (1)) |
| VAL-04 | the summary | "until one of those" |
| VAL-05 | T30-2; §13.7; §15.2 O18 (d) | the district's own §4.6 target (mean value, rung and density scaling) |

## 2 Rulings recorded (vetoable)

* **Restated: J-A17.01** (index and Part A). T20-6's epoch clause runs from M4 with the other epoch-bound bars. Its
  refusal clause runs at M3a, which builds the dossier contract, the mutator and the plot edits.
* **Restated: J-A20.01** (Part A only). The count reads T20-1 – T20-6, with the reason (VS2-03, which merged VD2-03).

## 3 Where this repair departs from, or goes beyond, the validator's wording

* **T20-6 (VS2-03).**
  * The refusal clause names all of §7.7 item 2's M3a map events: `mutate` and a demolishing plot `join` or `split` are
    added. The validator's claim lists them, but its text did not. The M4 clause covers the hand `vacate` or `demolish`.
  * The epoch clause does not say every such epoch "relocates the use first". §4.11's paragraph (repair-r3-pipeline)
    lets the use step leave a use in its building when no candidate plot exists, and lets a pinned use keep its building.
    The clause says the use is never closed and its building is emptied or removed only after the use has moved.
* **T19-4 (VP2-09).** The count clamped is the households S10b placed in the slot (one to `households.built`). It is not
  "`households.built` clamped", because repair-r3-pipeline's fill places at most `households.built`, by band and drift.
  The last clause keeps the F-SITING row's words, "every household S2 demanded" (repair-r3-determinism §5.2).
* **§16 beyond VS2-03 (a consequence of VP2-09).** T19-4 gates M2b, and its bar now reads §2.6's capacity. §16 placed
  that capacity at M3a ("the shell's household capacity `relet` reads"). Since round 2 (J-A28.46), generation clamps
  to it at S11. M2b's content therefore gains the generation fill with the capacity and the programme-row cells it reads,
  and M3a's line now reads "`relet` reading the household capacity M2b builds". The work moves between milestones and
  is not re-priced (absorbed; PLAUSIBLE).
* **§0.2 row 20 beyond VS2-01.** The row also names §4.11's *Dossier content across epochs* (J-A20.43), which round 3
  adds.
* **§15.2 O18 (d) (VAL-05's sweep).** O18 (d) had the same per-band wording and now reads "its §4.6 target".
* **T30-2 and §13.7.** "area-weighted mean" follows repair-r3-pipeline's §4.6 wording.
* **T11-1.** The pointer reads "(II.6, §6.3; J-A11.43)", because the address and lineage clause is §6.3's SPLIT rule.
* **T30-5.** The wording is "from a client whose key is `public`" where the validator had "to a client".
* **Wording changed for document checks (no allow row added):**
  - "(§2.6's fallback; J-A29.25)";
  - "its access by one of the three ways §2.6 gives it";
  - "interpolated at the district's";
  - "the oracle's result for that ring less every earlier ring";
  - "where a kept room's side lies along a joint, an unkept wall ending on it";
  - M2b's "(§4.7; J-A28.46) … (§10.2)".
  The earlier wordings each drew an unreviewed C3 run.

## 4 Receipts (scratchpad `rs3/`)

* **Scratch assembly.** `apply-blocks.py` was run over all six r3 files (kernel, determinism, model, pipeline,
  rendering and this one). 46 of 46 blocks applied, 0 skipped, audit not-OK 0. Headings 145 → 145, fences balanced,
  title block unchanged. `postproc.py` then ran the restated-row swaps: 12 in the index and 15 in Part A, J-A17.01 and
  J-A20.01 among them. Result: 13 028 document lines, 2 051 rationale lines.
* **`refs.py`.** 2 broken references before and after, both the pre-existing external citations. J ids 469 → 470.
* **Section diff** (`diff-scope.txt`). Only this lane's hunks appear in the scope part, and no other lane touched it.
* **T-id script.** 89 ids are defined in §13.2. 76 are scheduled in §16's exits and 13 are stage-3 in the Staged list;
  0 are unplaced. T20-6's refusal clause is at M3a and its epoch clause at M4.
* **`doc_checks`** (`--sections "The whole design in one page,0.2,1.1,13.1,13.2,13.7,15.2,16,Judgment calls,Staged"`
  on the assembled copy). Runs 1, 2 and 4 found 7 unreviewed C3 runs, all in text this lane wrote, and all were
  reworded. The final run (the sixth) exit 0: C1 5/0, C2 0/0, C3 142/0, C4 2/0, S1 0/0, S2 0/0. The live document gives C3 143/0 on the same corpus.
* **Live files untouched.** `docs/ARCHITECTURE.md` 831efd42… and `docs/ARCHITECTURE-RATIONALE.md` f2c2a1ca… at the end.

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed on disk): every substitution matched exactly once; the scratch assembly and its audit, the
swaps, `refs.py`, the T-id script, the section diff and the document checks, as quoted above.

**PLAUSIBLE** (reasoning on the texts):
* The hand `vacate` and `demolish` conversions are M4 work (T8-1, M4's conversion test), so the validator's placement of
  their refusal in the M4 clause stands.
* Moving the capacity function from M3a to M2b needs no re-pricing.
* T28-15 (re-uniting restores the earlier plan) may read a stored plan's shell with re-cut vertices as VAL-03's bars did.
  §2.6's "re-uniting removes what the subdivision added" suggests it holds. Not changed; Fable should glance at it.
