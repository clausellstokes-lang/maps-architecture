# repair-scope-r2 — lane amendments-b/repair-scope-r2 (repair round 2, SCOPE part): report and ledger

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-b/repair-scope-r2; queued in docs/FABLE-REVIEW-QUEUE.md.

> PROGRESS (kill-safe ledger; one line per item — planned | done). The block file is
> `docs/validation/amendments-b/repair-r2-scope.md` (blocks only; its preamble is the assembler hand-off). Base:
> docs/ARCHITECTURE.md sha256 365e19f24743c88a… and docs/ARCHITECTURE-RATIONALE.md sha256 50a94f2d6fca8b86…
> (assemble-r1's output). Generator: scratchpad rs2ab/compose.py over rs2ab/specs/*.py and rs2ab/rows.py (each REPLACE
> body = the live subsection with count-asserted single-occurrence substitutions; the block file re-composed atomically
> after each spec, always ending in "=== END ===").
> ITEM VS1-02 (12, 24): planned §0.2 rows 12, 24; §13.2 enumeration; §14 `@plat/edit`; Staged sewers row | done: blocks 01 (§0.2 rows 12, 24), 04 (§13.2 enumeration), 06 (§14 package line and comment), 07 (§16 M4 content: the tools built with the tunnel kinds), 08 (Staged sewers row) written
> ITEM VS1-03 (26, 29): planned §1.4 | done: block 02 (§1.4) written
> ITEM VK1-13 (28 (f)): planned §13.1 | done: block 03 (§13.1: the rotated T by the seed clip; the kept room on a four-times-split rotated side; '(the composition rungs', §3.4)') written
> ITEM VS1-01 (17, 20): planned §13.2 T20-2; §16 M3a, M4; J-A17.01 new; J-A20.01 Part A restated | done: blocks 04 (§13.2 T20-2), 07 (§16 M3a and M4 exits), J-ROWS (J-A17.01 new), RATIONALE-A (J-A17.01 new, J-A20.01 restated) written
> ITEM VS1-07 (28 (f)): planned §13.2 T28-13; J-A28.01 Part A restated | done: block 04 (T28-13), RATIONALE-A (J-A28.01 restated) written
> ITEM V-MAB1-11 = VS1-10 (28 (f)): planned §13.2 T28-14; J-A28.01 Part A restated | done: block 04 (T28-14), RATIONALE-A (J-A28.01 restated) written
> ITEM VP1-08 = VS1-11 (26): planned §13.2 T26-2 | done: block 04 (T26-2) written
> ITEM VD1-18 = VS1-09 (31): planned §13.2 T31-9 | done: block 04 (T31-9) written
> ITEM VR1-07 (30 (d)): planned §13.2 T30-5 | done: block 04 (T30-5) written
> ITEM VS1-05 (19): planned §13.9 | done: block 05 (§13.9 (4)) written
> ITEM VK1-12 (28): planned §14 package line, façade comment | done: block 06 (§14 package line and façade comment) written
> ITEM VS1-06 (12): planned §14 record homes | done: block 06 (§14 record homes + II.7.4) written
> ITEM VS1-04 (J-A scheme): planned preamble hand-off (2) OLD/NEW paragraph swap | done: preamble hand-off (2): OLD/NEW 2 → 2 lines written
> RECEIPTS: planned scratch assembly with every r2 file, refs.py, doc_checks, J-A digit script | done: scratch assembly 58/58 applied (all six r2 files), headings 145 → 145, fences balanced; refs 2 broken → 2 (pre-existing external); J-A digit rule 0 mismatches over 193 rows; T-id map as verify-scope-r1's with T17-2, T17-3 and T20-2's epoch clause at M4; word diff = this lane's 53 hunks only; doc_checks run 1 exit 1 (one C3 run of mine, reworded), run 2 exit 0 with no new allow row

## 1 Outcome

All 14 routed issues are answered in `docs/validation/amendments-b/repair-r2-scope.md`, which holds 8 REPLACE blocks
(§0.2, §1.4, §13.1, §13.2, §13.9, §14, §16, the Staged list), one J-ROWS block (J-A17.01, new) and one RATIONALE-A block
(J-A17.01 new; J-A20.01 and J-A28.01 restated in Part A only). The restated pairs were applied once each: VD1-18 with
VS1-09, V-MAB1-11 with VS1-10, and VP1-08 with VS1-11. VS1-04 cannot be a block without harm, because its paragraph shares
the level-1 heading `# Judgment calls` with the index table. The preamble therefore hands the assembler an exact 2 → 2
line swap, in the same `# OLD| ` / `# NEW| ` form as round 1's VS-40. Every REPLACE body is the live subsection with
count-asserted substitutions, and every untouched line is byte-identical.

| issue | where | fix (short) |
|---|---|---|
| VS1-02 | §0.2 rows 12, 24; §13.2; §14 (package line and `@plat/edit` comment); Staged sewers row; §16 M4 content | `drawTunnel` and `placeAccess` (J-A12.71) and the `rank` edit (J-A24.71) are named in every list; the tools are built at M4 with the tunnel conversion kinds |
| VS1-03 | §1.4 | the criteria read "O17 (a)–(j)" and "O14 (a)–(h)" |
| VK1-13 | §13.1 | a rotated T whose stem crosses one side of the bar twice, clipped by §3.4's seed clip (every crossing on both rings, within the hot pixel of the straight side, the seeds accepted); a kept room on a rotated side that four unkept walls split, accepted with every corner within the hot pixel (the input sides as the arena's routes) |
| VK1-12 | §14 (twice); §13.1 | "the composition rungs' transient arenas (a stage-3 `compose()` and the plan rung's storeys)" |
| VS1-01 | T20-2; §16 M3a and M4 exits; J-A17.01; J-A20.01 | T20-2 is split into a dossier-event clause (M3a) and an epoch clause (from M4); T17-2 and T17-3 move to M4 |
| VS1-07 | T28-13 | "every household of the building (`Building.households`, §2.6)" |
| V-MAB1-11 = VS1-10 | T28-14 | the leaf digest reads a stored plan's rings with the `composition`-role vertices its re-cut adds removed |
| VP1-08 = VS1-11 | T26-2 | no farmstead plot under `perimeter` and `rivers`; farm households allocated to town districts; `rivers` band with the reported shortfall; the arid override, with and without a river |
| VD1-18 = VS1-09 | T31-9 | only rungs 1 and 2 are bound; the list equals §5.3's epoch row as repair-r2-determinism leaves it |
| VR1-07 | T30-5 | every `query` kind and hover; the band-less column; `E_KNOWLEDGE_TIER` for `.plat` and a permalink; the legend |
| VS1-05 | §13.9 (4) | "the granularity and greenery rows" |
| VS1-06 | §14 | the record homes include II.7.4 |
| VS1-04 | index paragraph (hand-off) | "5, 6 or 7 determinism (§5–§7)" |

## 2 Rulings recorded (vetoable)

* **New: J-A17.01.** The bars that need an epoch run from M4, where the base builds its one epoch path (§1.5, D-25):
  T17-2, T17-3 and T20-2's epoch clause. T17-1 and T20-2's dossier-event clause stay at M3a. The choice is recorded in
  §16 and §13.2. J-A20.01's Part A entry gains the phrase VS1-01 asked for, which cites J-A17.01.
* **Restated in Part A: J-A28.01.** One sentence records the two B-PLAN bar corrections, T28-13's households and
  T28-14's digest reading, with their reasons.

## 3 Where this repair departs from, or goes beyond, the verifiers' wording

* **T30-5 (VR1-07): the view-bound readers' band.** At the `public` tier, §9.2's table admits a `secret` place at the
  building band. A `hit`, `inView` or hover at that band therefore shows its name. The verifier's text had `hit`,
  `inView` and hover withhold at the `public` tier with no band, which is a bar the design would fail. The test now says
  the view-bound kinds withhold "at every band coarser than the building band, the one band §9.2's table admits it at".
  The verifier's other clauses are kept: every `query` kind, the address-only workplace, the band-less kinds and GeoJSON
  as at the city band, `E_KNOWLEDGE_TIER`, and the legend. The permalink clause relies on repair-r2-rendering's §11.1
  (VR1-03), which is present in that file.
* **T26-2 (VP1-08).**
  * The arid river fixture is pinned "at TOWN on flat fertile land". Without the override the default there would be
    `fill`, so only such a fixture proves the climate row overrides it.
  * The shortfall clause uses repair-r2-pipeline's words ("laid beyond it as `perimeter` lays them").
* **T31-9 (VD1-18).** The list in parentheses adds "regrowth builds" and names `wallToWay` and `contractWall` among the
  conversions. The verifier required that the list equal §5.3's row as VD1-01's repair leaves it, and repair-r2-determinism's
  row names both.
* **VS1-02 beyond its list.**
  * §16 M4's content now names the underground tools with the tunnel conversion kinds. Otherwise no milestone would
    build the two events that the enumeration test (O9 (d)) now requires.
  * §14's `@plat/edit` package line names them as well. This follows the structural-prevention sweep of every list of
    amendments-b event kinds in the part.
* **VK1-12 beyond §14.** §13.1's "*The transient arena* (the plan rung's, §3.4)" is changed to "(the composition rungs',
  §3.4)". It had the same defect.
* **VK1-13 wording.** The clause reads "accepted with every corner within the hot pixel of that side's straight line",
  not "… and the ring accepted". The first wording gave a C3 run that the allow file does not review ("3 4 and the
  ring"), so it was reworded, not allowed.

## 4 Receipts

* **Scratch assembly.** `apply-blocks.py` was run over all six round-2 files, including repair-r2-rendering.md, which
  landed while this lane worked. The output is in scratchpad `rs2ab/asm/`.
  * 58 of 58 blocks applied, 0 skipped, audit not-OK 0.
  * Headings 145 → 145, fences balanced, title block unchanged.
  * Post-processing (`rs2ab/postproc.py`) ran assemble-r1-handoff.py's step-1 swap, 20 index and 22 Part A ids,
    J-A20.01 and J-A28.01 among them. It then ran this file's paragraph swap: one occurrence, 2 → 2 lines.
* **`refs.py`.** 2 broken references before and after. Both are the pre-existing external citations (`os-geometry.md`
  §2.1.4 and RFC 7946 §3.1.6). The J ids went from 459 to 469.
* **J-A digit script.** Under the new paragraph, 0 of 193 J-A rows mismatch. Under the old paragraph, 5 would mismatch:
  the verifier's four, plus repair-r2-determinism's new J-A28.73 (§5.2, digit 7).
* **T-id script.** 88 ids are defined. T20-2 is split M3a/M4 by clause, and T23-1 is split M1/M2b. T17-2 and T17-3 are at
  M4. The unscheduled ids are exactly the stage-3 group.
* **Word diff.** A diff of the part's sections, live against assembled, shows exactly this lane's 53 hunks. No other
  lane's text changed there (`rs2ab/diff-scope.txt`).
* **Document checks** (`--sections "0.2,1.4,13.1,13.2,13.9,14,16,Judgment calls,Staged"` on the assembled scratch
  document):
  * Run 1 exited 1 on one unreviewed C3 run in §13.1, which was reworded.
  * Run 2 exited 0: C1 5 / 0 unreviewed, C2 0 / 0, C3 149 / 0, C4 1 / 0, S1 0 / 0, S2 0 / 0, over 9 626 JSON
    files and 911 940 corpus 3-grams. No allow row was added (`rs2ab/dc-final2.out`).

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed on disk): every substitution matched exactly once; the scratch assembly, the swaps, `refs.py`,
the J-A digit and T-id scripts, the word diff and the document checks, as quoted above.

**PLAUSIBLE** (reasoning on the texts):
* No fixture can exercise T17-2, T17-3 or T20-2's epoch clause before M4 builds the epoch path.
* A view-bound reader at the building band shows a `secret` place's name at the `public` tier, read from §9.2's table.
