#!/usr/bin/env python3
"""Build and append the merged round M0-e-02 S3 -> M0-e-03 S5 to specs.json.
Usage: ea-entries.py <landing hash of M0-e-02 S2> <landing hash of M0-e-03 S4> <J row> <Q row e-02> <Q row e-03> [--dry]"""
import json, sys
h2, h3, J, Q2, Q3 = sys.argv[1:6]
dry = '--dry' in sys.argv
P = 'workflows/lane-prompts/session-fix-cloud/specs.json'
s = json.load(open(P, encoding='utf-8'))
tmpl = next(e for e in s['rounds'] if e['id'] == 'M0-c-05' and e.get('round') == 'S4')['session']
a = tmpl.index("Each 'failing line' below is one such row")
b = tmpl.index('THIS ROUND, IN THIS ORDER:')
RULES = tmpl[a:b]
assert "'Hardening round S4'" in RULES
REDS = ("THE HEAD'S DECLARED REDS, should your RELATED@1000 reach them, notes never a failing line of yours: Q152's six bands tests (packages/kernel/test/arr/bands: closing.test.ts ×2, "
        "dryrun.test.ts, hardening-s15.test.ts, restage.test.ts ×2); the reference-machine tests of bench/test/calibrate, host and timing (J176); bench/test/site/summary.test.ts's canary "
        "(J772 (7): the committed site summary is stale until the session's re-run — you neither re-run nor edit a summary); the flake of Q153 (testkit/test/determinism/dilation.test.ts, green alone). ")
MERGED = ("THIS IS LEG {n} OF A MERGED ROUND (the MERGED-ROUND RULE, J443): M0-e-02 S3, then M0-e-03 S5, on ONE tree and ONE branch, no reset between, each leg with its own build and closing check; "
          "leg 2 READS leg 1's change (the water stage reads the rivers' carved terrain and courses), so leg 2 launches only when leg 1 has PASSED. ")

def opening(item, rnd, last, lasthash, q, rows):
    return (f"This round was opened by the SESSION as {item}'s HARDENING ROUND {rnd} (J237 (2): the M0 hardening phase's fix rounds, batched per owning item; J238: M0 is the bedrock — the default for "
            f"an M0 row is FIX with an exact precaution and a pin; J567: the bar is an independent closing check's PASS on the evidence), on the rows the item's LAST CLOSING CHECK (round {last}, landed "
            f"{lasthash}) wrote into its notes file and the session queued as row {q} (docs/M0-FIX-QUEUE.md — read the row whole: grep '^| {q} '; the session's record {J} in docs/PROGRESS.md, read by "
            f"its own grep): {rows}. ")

e02 = {
 'id': 'M0-e-02', 'from': 3, 'round': 'S3',
 'session': opening('M0-e-02', 'S3', 'S2', h2, Q2, 'N-s2c-1, N-s2c-4, N-s2c-3, N-s2c-2 and N-s2c-5') + RULES.replace("'Hardening round S4'", "'Hardening round S3'") + MERGED.format(n=1) +
  "THIS ROUND, IN THIS ORDER: LINE 1 is the round's one SOURCE change and a DECLARED SHIFT (a joining tributary's carve; MAKE-IT-RIGHT — measure and diagnose FIRST, no source change before the "
  "diagnosis is in your notes); LINES 2 – 5 are TESTS ONLY on round S2's new path (the line re-trace), each killing the closing check's surviving mutant. WHAT IS NOT THIS ROUND'S (report anything "
  "you meet, build nothing for it): Q123's residual class B (the descent stalls at the inlet on 27 of 200 default and 48 of 200 coarse relief-3000 seeds) is CLOSED AT M0 by the session's ruling "
  f"({J}): the fixture's property, pinned by round S2 with its cause on keys 12, 14 and 28; F-RIVER's next rungs (S3's centre to the bank; the lake a sink becomes) are M1's by the design (§5.2, §4b) "
  "— build nothing for it. The S3 refusal on the site spike's relief-60 seed 2 (N-s2c-6) is another stage's, routed to its owner. " + REDS +
  "Notes section 'Hardening round S3'; verdict plat/docs/build/checks/M0-e-02-s3.md; ledger ids the next free at build time.",
 'lines': [
  {'line': "LINE 1 — N-s2c-1 (" + Q2 + " (a); J238: a wrong result on a lawful input, older than round S2): A JOINING TRIBUTARY'S CARVE DIGS A PIT IN THE RIVER'S BED AT THE CONFLUENCE, AND THE SUMMED CUT "
           "OF TWO COURSES ON ONE CELL CAN PASS carveMaxCm. `runRivers` carves the plans in order, each against the raster as the earlier carves left it; a tributary whose own bed arrives lower than "
           "the river's bed at the joined cell lowers the river's channel cells inside its half-width. The design asks the opposite: 'the terrain is carved to the course, its bed descending "
           "monotonically to the outfall so no depression is created … carving is capped at carveMaxCm … tributaries by the same rule from secondary inlets' (§4.2 S1 (3)). It fails safely (no "
           "refusal, no throw, D8 defined on 100 %), and each course's own maxCarveCm reads ≤ the cap, so the report does not show it.",
   'evidence': "plat/docs/build/checks/M0-e-02-notes.md 'Closing check of hardening round S2' row N-s2c-1 — read it whole (the registered `valleyWithSide`, river from 90°, one tributary from 180°, "
               "seeds 1 and 2: the river's bed alone is monotone, 2 940 cm at the confluence; the tributary ends at 2 808 cm and one or two river-bed cells at (5 200, −74 800) cm read 2 808 — a pit "
               "of 132 cm, the bed then rising 116 cm (seed 1) and 90 cm (seed 2); 164 and 122 cm with hydroCoarsen; `nonIncreasing(bedAlong(terrain, course))`, what `carveBars` asserts, is false "
               "there; a sweep of 720 tributary runs: a rising bed on 66, the largest rise 400 cm; on the checker's `basin`, ground rising 5 % to every edge, the summed cut of two courses on a few "
               "cells reads up to 430 cm against the cap of 400); checks/M0-e-02-s2.md (3) and 'The finishing seat's own reading'; docs/ARCHITECTURE.md §4.2 S1 (3) (the rivers passage, read whole) "
               "and §5.2's F-RIVER row; packages/site/src/hydro/ — `runRivers` and its carve order, `planCarve`, the carve itself, `lineEnd`'s join case; packages/site/test/hydro/fixtures.ts "
               "(`valleyWithSide`) and relief-bar.test.ts's `carveBars`.",
   'required_change': "MAKE-IT-RIGHT, inside packages/site/src/hydro/ only. After every course is carved: (i) each delivered course's bed along its own course is non-increasing to its outfall — the "
               "receiving river's too, at and below every confluence; (ii) a joining tributary's bed never lies below the receiving course's bed at the joined cell (a course descends TO its outfall); "
               "(iii) no raster cell is cut by more than carveMaxCm in total, measured against the raster BEFORE any carve; (iv) a tributary that cannot join within (i) – (iii) is not trenched and not "
               "refused: it takes F-RIVER's ladder as any course that 'would need more' does (the delivery tier says so). THE MECHANISM IS YOURS, chosen on your diagnosis — the note names two shapes "
               "(the tributary's bed clamped at the joined cell's bed and an earlier channel's cells never lowered by a later carve; or the receiving course re-levelled below the confluence): take "
               "the one §4.2 S1 (3)'s sentence supports and say which, with what the other would cost. No draw is added, removed or re-ordered (every stream reads what it read before; a run with no "
               "tributary is BYTE-IDENTICAL — show it on the item's census). PINS: `valleyWithSide`, river 90°, tributary 180°, seeds 1 and 2, default and hydroCoarsen — the river fits and leaves by "
               "the frame, the tributary fits and joins, both courses' beds non-increasing on the FINAL raster, the tributary's last bed ≥ the river's bed at the joined cell; a basin fixture of your "
               "own in test/hydro/fixtures.ts (ground rising to every edge) with two tributaries, on which a cell's summed cut passes the cap today and none does after; `carveBars` read on the final "
               "raster for every tributary run of the folder. MUTANTS, in your mirror: the fix removed → the valleyWithSide pin red; the total-cut bound removed → the basin pin red; the clamp read "
               "from the tributary's own last cell instead of the joined cell's bed → red. THE CENSUS (rule (4)) GAINS A TRIBUTARY SWEEP of at least the checker's size (ten small fixtures × nine "
               "bearings × one or two tributaries at ± 90° of the river × seeds 1 – 2 × both cells: 720 runs), before → after: rising beds 66 → 0, cells over the cap → 0, refusals 0 → 0, throws 0, "
               "and every run whose tributary's delivery tier changes NAMED with its tier before and after (a fit lost only where joining would need a trench). DECLARED SHIFT (your choices row, the "
               "before and after): the runs with a joining tributary whose carve met an earlier channel; the item holds no golden or digest; leg 2 (M0-e-03 S5) re-pins its own tests that read such a "
               "run as its first act; the pipeline's fixtures request no tributary, so no summary or digest of another item is expected to move — a RELATED red outside packages/site/test/water is "
               "attributed by replay on your start sources and REPORTED, never edited."},
  {'line': "LINE 2 — N-s2c-4 (" + Q2 + " (b); tests only): the checker's mutant QJ — the line re-trace's `descentLine` called WITHOUT the tributary's `stop` mask — survives the folder (67 / 67) and is "
           "NOT equivalent: 24 of 1 620 census outputs move (the rescued tributary runs on to the frame instead of joining). The code as written joins; nothing pins it.",
   'evidence': "plat/docs/build/checks/M0-e-02-notes.md 'Closing check of hardening round S2' row N-s2c-4 and the verdict's mutant table (QJ); packages/site/src/hydro/trace.ts — the block after the "
               "re-trace loop (round S2's fix) and `lineEnd`.",
   'required_change': "TESTS ONLY: a tributary fixture whose knot courses fail their three re-traces while its descent line fits (a gully running into the river's corridor — `gully`'s kind, beside a "
               "river), asserting the tributary's `flowTo`, `outfall: 'join'` and the confluence point on the river's course. MUTANT: QJ red on it. If LINE 1 changes what a joining line re-trace "
               "delivers, pin the behaviour LINE 1 leaves. NO-SHIFT."},
  {'line': "LINE 3 — N-s2c-3 (" + Q2 + " (c); tests only): the line re-trace after a third re-trace that ended on `touch` or `stuck` is unpinned — QI (`if (last.ok || last.failure !== 'carve') return "
           "last`) and QN (the event's cause always written 'carve') survive 67 / 67. The cases are real: on the spike's relief-3000, 10 of 84 class-A attempts (default; 5 of 43 coarse) end their "
           "third re-trace on `stuck` or `touch` and are rescued by the line.",
   'evidence': "the same notes section, row N-s2c-3; the verdict's Q123 table (class A: carve 74 / 38, stuck 6 / 2, touch 4 / 3); packages/site/test/hydro/relief-bar.test.ts's Q123 title.",
   'required_change': "TESTS ONLY: one relief-bar key (or a small fixture) whose delivered attempt's third re-trace failed on `touch`, and one on `stuck`, each asserting the fourth re-trace from the "
               "inlet, its delivery, and the re-trace event's recorded cause. MUTANTS: QI and QN red. NO-SHIFT."},
  {'line': "LINE 4 — N-s2c-2 (" + Q2 + " (d)): the line re-trace's own self-touch check is unpinned — QB (the `firstSelfTouch` line removed) survives 67 / 67 and moves 0 of 1 620 census outputs; not "
           "proven equivalent (the builder's Q3: a descent line's course touching itself at the class's clearance needs the line to double back within a cell).",
   'evidence': "the same notes section, row N-s2c-2; the builder's section 'The surviving mutant' (Q3); packages/site/src/hydro/trace.ts (`firstSelfTouch` on the line's course) and d8.ts (the "
               "descent's step and the surface's parent chain on a flat).",
   'required_change': "A PIN, OR THE PROOF: a hand-built field whose descent line's own course comes within the clearance of itself (a hairpin one cell apart at the tributary clearance), asserting the "
               "last try stands (degraded, never a touching course delivered) — QB red on it; or, if you PROVE no descent line of d8.ts can make such a course (the proof written out in your notes "
               "against the code, and a property test over random fields that finds none), the check is kept as the guard it is and the row is REPORTED with that proof — the closing check judges "
               "it. NO-SHIFT."},
  {'line': "LINE 5 — N-s2c-5 (" + Q2 + " (e); tests only): the delivered line's carve-rung events are unpinned — QF2 (the `...tried` events dropped, the re-trace event kept) survives 67 / 67; "
           "report-only (the ladder uses of rung 1 on the delivered line).",
   'evidence': "the same notes section, row N-s2c-5; relief-bar.test.ts's Q123 title (keys 2, 4, 8).",
   'required_change': "TESTS ONLY: in the relief-bar Q123 title (or beside it), the delivered attempt's carve uses after its last re-trace equal the line's own sink crossings, counted by the test's own "
               "reading of the surface. MUTANT: QF2 red. NO-SHIFT."},
 ],
}
e03 = {
 'id': 'M0-e-03', 'from': 5, 'round': 'S5',
 'session': opening('M0-e-03', 'S5', 'S4', h3, Q3, 'N-s4c-1') + RULES.replace("'Hardening round S4'", "'Hardening round S5'") + MERGED.format(n=2) +
  "YOUR FIRST ACT (J766's pattern): leg 1 (M0-e-02 S3) changes what a joining tributary's carve leaves — a DECLARED SHIFT of the hydrology that this stage reads. Before anything else, run "
  "packages/site/test/water on the tree as leg 1 left it; every red there is attributed by replay (green on leg 1's start sources — its closing checker's before-image — red on leg 1's), judged "
  "lawful for THIS stage (a fallback, never a refusal; every hard row green), and RE-PINNED in your own test files, with the before and after in your notes; a red you cannot attribute to leg 1 is "
  "a finding. If nothing moves, say so with the run. THIS ROUND: ONE row, one SOURCE change with NO SHIFT on every input met. WHAT IS NOT THIS ROUND'S: the land wedge beside a grazing river "
  f"(S4-1; queued, {Q3} (b)); RL13 (the structured field on the kernel's refusal: after M0-a-05 S14). " + REDS +
  "Notes section 'Hardening round S5'; verdict plat/docs/build/checks/M0-e-03-s5.md; ledger ids the next free at build time.",
 'lines': [
  {'line': "LINE 1 — N-s4c-1 (" + Q3 + " (a); the closing check's vetoable judgment on round S4, accepted by the session as a PASS and bound here): `provedRings` (polygons.ts) drops a hole before the "
           "proofs when the kernel MADE it under 4 m² AND the clean LEAVES it under 4 m². The two clauses are unpinned (the checker's K9 and K10 each drop one and pass the whole folder, 87 / 87) "
           "and are not equivalent: a hole whose area crosses the sliver threshold under the clean falls on either side. And a residue of Q122's own class remains: a pocket the kernel makes just "
           "OVER 4 m² that the clean leaves under it is still PROVED before `partsOf` drops it — and refuses the body if it meets another ring, a refusal on a ring that was about to be dropped.",
   'evidence': "plat/docs/build/checks/M0-e-03-notes.md 'Closing check of hardening round S4' row N-s4c-1 — read it whole; checks/M0-e-03-s4.md 'Judgments (vetoable)' (the two crafted holes 10 cm "
               "off an outer ring: a 2 m rectangle with a 15 cm dent — made 3.93 m², cleaned 4.08 m²; with a 15 cm bump — made 4.07 m², cleaned 3.92 m²; the code refuses both `not clear (rings "
               "meet)`; over the 303 census runs 143 kernel rings reach `provedRings`, 2 of them holes, both made and cleaned under 4 m², 0 in either band); packages/site/src/water/polygons.ts — "
               "`provedRings` (:550), `partsOf` (:241: the drop by the CLEANED ring's `|area2| < 2 · SLIVER_AREA_CM2`), `proveRings`; test/water/hardening-s4.test.ts's two Q122 titles and "
               "slow-rings.test.ts's three loop-river tests (the precaution: an OUTER ring is proved whatever its area).",
   'required_change': "ONE SOURCE CHANGE: the rule is reduced to ONE measure, the one `partsOf` judges by — a HOLE the clean leaves under the sliver area is dropped before the proofs, whatever area "
               "the kernel made it; every other ring is proved (an outer ring whatever its area; a hole the clean leaves at or over the sliver area). So `provedRings` proves exactly the rings the "
               "body keeps, and the residue closes: the bump hole (made 4.07 m², cleaned 3.92 m²) is dropped and the body commits; the dent hole (made 3.93 m², cleaned 4.08 m²) is a kept ring and "
               "is still proved. If the code shows the two measures cannot be made one (say why against `partsOf`), keep the conjunction, pin both clauses with the two crafted rings and REPORT. "
               "PINS, in hardening-s4.test.ts or a file beside it: the two crafted holes with their made and cleaned areas asserted by the test's own shoelace, the bump dropped (the body kept, one "
               "ring) and the dent proved (`rings meet`); round S4's 3.3 m² and 5 m² pockets and the 3.3 m² outer ring unchanged. MUTANTS, in your mirror: the made-area clause restored as a "
               "conjunction → red on the bump; the made area in place of the cleaned → red on both; the hole clause dropped (outers too) → red on the outer-ring case and slow-rings' three tests; "
               "the threshold at 2 m² and at 8 m² → red. NO-SHIFT SHOWN, before → after, rows identical arena prints and model roots included: the item's registered family (the exit bar's 100 seeds "
               "at 100 ha and the CITY frames 4, 10, 3) and the site spike's relief-3000 fixture, default configuration, S1 alone, seeds 1 – 200 (303 runs; the census's refusals 0 → 0 on both). No "
               "export changes; no message text changes."},
 ],
}
have = {(e['id'], e.get('round')) for e in s['rounds']}
assert ('M0-e-02', 'S3') not in have and ('M0-e-03', 'S5') not in have
s['rounds'] += [e02, e03]
if dry:
    print(len(e02['session']), len(e03['session']), len(s['rounds']))
    print(e02['session'][:600]); print('...'); print(e03['session'][-1500:])
else:
    json.dump(s, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    open(P, 'a').write('\n')
    print('appended; rounds =', len(s['rounds']))
