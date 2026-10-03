# Repair round 6 — V02 (Buildings) — lane coherence/repair-V02-r6

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V02-r6; covered by the whole-design retrovalidation (J84).

Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
ignored; the FILE line routes every block to docs/volumes/V02-buildings.md. Live unit: V02 as assemble-r5 left it
(sha256 fb46c67694cfe88d…, 564 391 bytes, 4 221 lines). The REPLACE body is the live subsection with one count-asserted
substitution (scratch rV02r6/build.py: the anchor found exactly once in §8.6 and once in the whole file; the table row
and the paragraph's first two lines verbatim; the paragraph re-wrapped at 120 columns from its third line). Blocks: 1,
REPLACE — §8.6. No heading retitled or added, no whole-volume REPLACE, the title block untouched. Ruling requests: 0.
END lines written: 0 of 0 (Part H · V02 holds none). Binding rulings applied (adjudication-r6, Part H · V02): R6-01,
R6-09; R3-01 – R3-03, R4-01 and R5-01 stand.

PROGRESS (lane `coherence/repair-V02-r6`, 2026-10-01)
- P0 brief read whole (1 issue routed; ROUND-6 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); resume check (no output, no
  LANDED): fresh start; adjudication-r6's head, summary, TOC, Part A, R6-01, R6-09, R6-02's sweep line ("V02 … need
  nothing more"), Part H · V02 (1 FIX, 0 END lines) and Part P (no PRB6 finding names V02) read: done
- P1 issue source read (verify-vol-V01-V02-r5t: VV12-r5-02 and its section-3 note); live V02 read whole at every site
  concerned (§7.8 with T-V2-59 and T-V2-60, §8.1, §8.3, §8.5, §8.6, §6.6, §13's X36); the homes cited read (V06 §8's E2
  row and its dependency note, V06 §3.8.2 (2), V06 §3.22 (3), V06 §3.23 (3)–(4); INDEX §3 and §5 risk 2; base §16's
  M6-E and M3b rows, §13.2's T123 bars, §13.8's T122 and T123 rows; V03's T-V3-39 and T-V3-40 and ## 8's *Items 122 and
  123*): done
- P2 the block built: done
- P3 dry run of apply-blocks.py on copies of the live V02 and the rationale (FILE line dropped): 1 found, 1 applied, 0
  skipped, audit not-OK 0; headings 77 → 77; fences 16 → 16 balanced; title block unchanged; rationale unchanged; output
  sha256 c7fbb7055d776409…, 565 121 bytes, 4 227 lines; the diff is §8.6's paragraph alone; doc_checks before and after
  (below): done
- P4 result saved to docs/validation/coherence/results/coherence_repair-V02-r6.json; LANDED logged: done

## Issues → where fixed (1 routed: 1 FIXED in text; none MERGED, none INVALID; nothing parked)

* **VV12-r5-02** (minor; FIX, R6-09) — §8.6's paragraph, after "until V06's decay level lands (M6-E) the level is read
  from the existence state alone at V11's default age (V06);", the required clause is added: "T-V2-59 (c)'s house
  reoccupied from derelict at an epoch (V02 §7.8's damage sub-fixture; V06 §3.8.2 (2)) and its restoring re-cut's minted
  elements run at the later of M6b and V06's E2 (V06 §8: its regrowth tiers and the decay level with its restorations,
  V06 §3.23 (3));". Verbatim but for one reference: the required text's "§7.8's damage sub-fixture" is written "V02
  §7.8's damage sub-fixture". In a volume a bare "§x.y" is the base's (principle (1): "see §x.y" for the base, "see V04
  §3.2" for a volume), and V02 keeps that convention (every bare "§7.8" in V02 — l. 191, 195, 300, 1882, 2684 — is the
  base's §7.8 *Controls*, while its own fixtures section is cited "V02 §7.8" at l. 3320, 3349, 4208). Written bare, the
  pointer would land on the base's control registry, a broken reference; the meaning is the one the issue states. The
  clause now names T-V2-59 (c)'s epoch case's later exit, as INDEX §5 risk 2 asks ("the dependent test clauses move to
  the first exit after the provider (each named in its volume)"), and agrees with T-V3-39's run of the same case ("from
  M6-E, week by week over V06's decay runs"), V06 §8's E2 row (the siting tiers with crowding; the decay level:
  `decayLevel`, `decayPeak`, restoration) and base §16's M6-E row ("item 122's hand-over and item 123's decay level at
  E2").

**Root cause (round note (6)) and the sweep (R6-01 (2), R6-09).** The defect class is a T-V2-59 or T-V2-60 clause that
reads a V06 part E2 builds, run at M6b with no later exit named. V02's own §13 states what V02 reads before E2 (X36's
stand-in: "the level from the existence state at V11's default age, nothing repaired; the look standing until its
condition no longer stands"), so every clause that stand-in cannot pass waits for E2. §8.6 named the level's reading
only. Two more members of the class were found in the same tests and are conformed in the same block, so the finding
cannot recur at a sibling clause:
* **T-V2-59's other restoration clauses** — (a)'s patched rings and (c)'s restoration in reverse threshold order, with
  its patches and the manor's `extend` (each reads `decayPeak` and V06 §3.23 (3)'s restoration, which E2 builds; under
  the stand-in nothing is repaired, so no patch is drawn and the level drops at once). Base §13.8 already times
  T123-4's restoring epoch clause "with M6-E".
* **T-V2-60's hand-over to a rebuild's Works** — (a)'s weeks 10–17 on a building whose rebuild's Works begins in week
  18, (d)'s Works' stage from week 18 and (g)'s week step 17 → 18 re-emitting exactly the buildings whose rebuild began
  (each reads V06 §3.22 (3)'s `crisisLookYields`, which E2 builds per V06 §8 and base §16's M6-E row; under the stand-in
  the look stands through week 19).
Written as: "so do T-V2-59's other restoration clauses ((a)'s patched rings; (c)'s restoration in reverse threshold
order, its patches and the manor's `extend`) and T-V2-60's hand-over to a rebuild's Works ((a)'s weeks 10–17, (d)'s
Works' stage from week 18, (g)'s week step 17 → 18; V06 §3.22 (3)'s `crisisLookYields`, which E2 builds), since until E2
lands V02 reads X36's stand-in — nothing repaired, the look standing until its condition no longer stands;". Every other
clause of both tests runs as before (T-V2-60's previews — a preview never hands over — and its `decay` Works clause pass
on the stand-in).

**Searched, standing, with the reason.**
* M6-E and E2 elsewhere in V02: only §8.6 (the "E2" at §3.18 (e) is the edge sweep's "one item"). Every other V02 test
  timing read against §8's cells: T-V2-36's dig and crypt parts from M6-U (§8.1, R8); T-V2-47 and M3a-V2's exit waiting
  for V11's C3b `deck` rows (§8.4 R10, §8.5's dependencies); T-V2-58's epoch clauses are V06's T-V6-74 (its (d)); the
  pin registrations of T-V2-59 (d) and T-V2-60 (c) at M6b need no epoch. None other is scheduled before its provider.
* T-V2-59's levels 0.1 – 0.75 by years: the existing clause ("until V06's decay level lands (M6-E) the level is read from
  the existence state alone at V11's default age") stands — the verifier found it covers the level, and it agrees with
  T-V3-39's timing cell ("before M6-E the levels at V11's default age").
* T-V2-60's look fixture's conditions: no clause waits on V08's port, since the base's own crisis fixtures carry
  conditions from M3b (T-ER-27; R12-37 "at M3b … with the crisis fixtures"); no change.
* R6-02 and R6-03 (round note (7) (a)–(b)): V02 names no crossing station, raised gate, wall opening of a raised way,
  held stretch, support step, crossing table, `bend.wall.*` key, `lateCalamities` or held calamity (searched; §3.17
  (b)'s arch vault is V04's chamber under a raised way, not under a wall). R6-02's sweep says V02 needs nothing more;
  R6-03 touches no V02 text.
* Part P: no PRB6 finding names V02, and no amended spot falls in V02's text.

## Not changed, with the reason

* The required change is written whole; its one reference is written "V02 §7.8" (above), nothing else differs.

## HAND-OFFS

None that this fix needs: every word is V02's own. Observed in passing, the same class at a peer's test (for the
adjudicator to route; V03's round-6 blocks leave it as it stands):
* **V03** — T-V3-40 (b) asserts the drawing "after the hand-over (`crisisLookYields`)", and its timing cell runs it "from
  P4 once item 122's base parts (M3b) and V01's districts (M5) stand", naming no exit after V06's E2, which builds
  `crisisLookYields` (V06 §8; base §16's M6-E row). Exact words: in T-V3-40's timing cell, after "(b)'s village clause
  at the later of that and V-M3 (V07's units)," add " (b)'s hand-over clause at the later of that and V06's E2 (V06
  §3.22 (3)'s `crisisLookYields`),".

## Checks

* Dry run (above): 1/1 applied, audit OK, the output's only change §8.6's paragraph.
* doc_checks (docs/validation/bench/doc_checks.py --doc <V02 copy> --heads docs/ARCHITECTURE.md, before and after):
  WARNING — reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs,
  research/external): the clean-room results are NOT authoritative and are provisional. Before → after: C1 0 → 0, C2 0
  → 0, C3 600 hits / 536 unreviewed → 601 / 537 (the one new 3-gram is the section number "3 8 2 2 and" of "V06 §3.8.2
  (2)) and"), C4 1 / 0 → 1 / 0, S1 0 → 0, S2 212 / 10 unreviewed → 214 / 10 unreviewed (the new pointers, resolving).
* Every new pointer resolves: V02 §7.8 (its fixtures), V06 §3.8.2 (2) (`reoccupy` derelict), V06 §8 (E2's row), V06
  §3.23 (3) (restoration), V06 §3.22 (3) (`crisisLookYields`), X36 (V02 §13), T-V2-59 (a) and (c), T-V2-60 (a), (d) and
  (g).
* No review id, deferral word or phone text in the block; no owner rule touched.
* Words (principle (9)): V02 94 455 → 94 571 (+116), all schedule content the finding and its class require (three
  later exits named at their clauses, the stand-in they wait on); nothing restated beyond a citation, no narration. The
  unit's shrink is reported by the rounds that rewrote it; this round adds only what the bars need.

=== FILE docs/volumes/V02-buildings.md ===

=== REPLACE ### 8.6 Ruin and disaster in the build (items 123, 122) ===
### 8.6 Ruin and disaster in the build (items 123, 122)

| milestone | content | exit (executed) | est. |
|---|---|---|---|
| **M6b**, added — the exterior's damage at the later of M6b and V03's item-123 plan step (V03 §8); the ruined look with it, once item 122's base parts (M3b) and V01's `disasterSource` and `disasterDistricts` (M5) stand | `exteriorDamage` in the generation worker and its damage marks with their re-emission (V02 §5.7 (8)); V02 §5.7's drawing in every shipped family — the holes, gaps, rubble and patches, the massing reading's tone and dash, the fire's blackening — the SVG semantics and the export rows of V02 §5.5; V02 §6.6's memo; the pin registrations of T-V2-59 (d) and T-V2-60 (c) | T-V2-59, T-V2-60; V02 §6.6 measured | + 0.5–1 pw |

Until V03's item-123 step lands no plan carries a damage layer, so the element reading draws nothing and the massing
reading stands; until V06's decay level lands (M6-E) the level is read from the existence state alone at V11's default
age (V06); T-V2-59 (c)'s house reoccupied from derelict at an epoch (V02 §7.8's damage sub-fixture; V06 §3.8.2 (2)) and
its restoring re-cut's minted elements run at the later of M6b and V06's E2 (V06 §8: its regrowth tiers and the decay
level with its restorations, V06 §3.23 (3)); so do T-V2-59's other restoration clauses ((a)'s patched rings; (c)'s
restoration in reverse threshold order, its patches and the manor's `extend`) and T-V2-60's hand-over to a rebuild's
Works ((a)'s weeks 10–17, (d)'s Works' stage from week 18, (g)'s week step 17 → 18; V06 §3.22 (3)'s `crisisLookYields`,
which E2 builds), since until E2 lands V02 reads X36's stand-in — nothing repaired, the look standing until its
condition no longer stands; at THORP, HAMLET and VILLAGE the look's units wait for V07's `villageDisasterUnits` and
`villageUnitPlots` (V-M3, V07 §5.6 (8)).
=== END ===
