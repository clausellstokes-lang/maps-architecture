#!/usr/bin/env python3
"""Build and append the merged round M0-c-02 S7 -> M0-c-04 S7 -> M0-e-06 S5 (Q173 with Q187 (a), Q185; the declared move
of q173.test.ts, Q187 (d), N-60; Q187 (e)) to specs.json."""
import json
P = '/home/user/maps-architecture/workflows/lane-prompts/session-fix-cloud/specs.json'
s = json.load(open(P, encoding='utf-8'))
tmpl = next(e for e in s['rounds'] if e['id'] == 'M0-c-05' and e.get('round') == 'S4')['session']
a = tmpl.index("Each 'failing line' below is one such row")
b = tmpl.index('THIS ROUND, IN THIS ORDER:')
RULES = tmpl[a:b]
assert "'Hardening round S4'" in RULES
REDS = ("THE HEAD'S DECLARED REDS, should your RELATED@1000 reach them, notes never a failing line of yours: Q152's six bands tests (packages/kernel/test/arr/bands: closing.test.ts ×2, "
        "dryrun.test.ts, hardening-s15.test.ts, restage.test.ts ×2); the reference-machine tests of bench/test/calibrate, host and timing (J176); bench/test/site/summary.test.ts's canary "
        "(J772 (7): the committed site summary is stale until the session's re-run — you neither re-run nor edit a summary); the flake of Q153 (testkit/test/determinism/dilation.test.ts, green "
        "alone); the two timing tests of Q198 (bench/test/tiers/exec.test.ts's busy child, bench/test/tier-jobs/cli.test.ts's hang boundary: red only on a loaded machine, green alone — a round "
        "in flight fixes them). ")
MERGED = ("THIS IS LEG {n} OF A MERGED ROUND (the MERGED-ROUND RULE, J443): M0-c-02 S7, then M0-c-04 S7, then M0-e-06 S5, on ONE tree and ONE branch, no reset between, each leg with its own build "
          "and closing check. Leg 1 makes a DECLARED SHIFT (the wall's line at a pinned gate); legs 2 and 3 move the pins of their own items that stood on the refusals leg 1 removes. ")


def opening(item, rnd, q, rows):
    return (f"This round was opened by the SESSION as {item}'s HARDENING ROUND {rnd} (J237 (2): the M0 hardening phase's fix rounds, batched per owning item; J238: M0 is the bedrock — the default for "
            f"an M0 row is FIX with an exact precaution and a pin; J567: the bar is an independent closing check's PASS on the evidence), on rows the session queued in docs/M0-FIX-QUEUE.md — read each "
            f"row whole by its own grep ({q}); the session's record J789 in docs/PROGRESS.md, read by its own grep: {rows}. ")


c02 = {
 'id': 'M0-c-02', 'from': 7, 'round': 'S7',
 'session': opening('M0-c-02', 'S7', "grep '^| Q173 '; grep '^| Q187 '; grep '^| Q185 '", "Q173 with Q187 (a) — ONE mechanism, the V at a pinned gate, diagnosed by M0-c-04 S6 and confirmed by its closing check — and Q185") +
  RULES.replace("'Hardening round S4'", "'Hardening round S7'") + MERGED.format(n=1) +
  "THIS ROUND, IN THIS ORDER: LINE 1 is the round's SOURCE change (the trace's pull and smoothing at a pinned gate), MEASURED FIRST; LINE 2 is tests only. OWNS: layout/src/enceinte/ and "
  "layout/test/enceinte/ (plat/docs/build/M0-work.json) — the growth stage (M0-c-04: growth/boundary.ts, growth/mainRoads.ts, test/growth/s5ab/), the bench and the kernel are READ, never edited by "
  "this leg. TWO SETS OF PINS OF OTHER ITEMS STAND ON THE REFUSALS YOUR FIX REMOVES AND GO RED WITH IT — both are later legs' declared moves, never a failing line of yours, and you name each in your "
  "RELATED reading: (i) packages/layout/test/growth/s5ab/q173.test.ts (M0-c-04's reproduction: two cases that pin today's refusals verbatim) — leg 2's; (ii) bench/test/site/compose.test.ts's "
  "'relief-3000 default seed 1 (test size) refuses at S5 …' and bench/test/site/spike.test.ts's 'relief-3000, seed 1 (S5 refused, S6 not reached) …' (Q187 (e)) — leg 3's, IF that seed's refusal is "
  "the same mechanism (you say whether it is). ANY OTHER pin your shift moves is LISTED for the session with its file and assertion (rule (3)); the session re-pins it by a seam measured on the "
  "merged tree. THE SESSION'S RULING ON WHAT IS NOT THIS ROUND'S (J789): Q174 (c) — an UNWALLED stage reads the selection and may leave points of the wall before it outside its boundary; the growth "
  "stage's narrowing C-0475 (2) STANDS at M0 and is pinned; nothing of it is asked of the enceinte. F-WALL's LATER rungs stay M1's (C-0085, RL2's proof in C-0474's round): a run that still needs "
  "them after your fix keeps its typed refusal. N-61 of M0-c-04's S6 check (the growth stage's `placeGateVertices` snaps a crossing to a way's vertex only within 52 cm, C-0244 (8)) is CONTEXT: with "
  "a wall that crosses its gate square the short sub-edge is harmless, and nothing of the growth stage is to be changed for it. " + REDS +
  "Notes section 'Hardening round S7'; verdict plat/docs/build/checks/M0-c-02-s7.md; ledger ids the next free at build time.",
 'lines': [
  {'line': "LINE 1 — Q173 with Q187 (a): THE V AT A PINNED GATE (a LAWFUL-INPUT REFUSAL, J264). On eight CITY runs of the site family — relief-60 seed 118; relief-3000 seeds 32, 81 and 188; default "
           "and coarse — S5 refuses at stage 2's trace. The boundary the growth stage hands the strategy is CLEAN on all eight (simple, touching itself nowhere at the attraction distance, holding "
           "stage 1's wall, each gate crossed SQUARE to its way with its two neighbours 15 m off on the way's normal — C-0244 (8), `squareGates`). The V is made INSIDE the trace: the pull "
           "(`pullAndPin`, enceinte/pull.ts; §4.4 S5a *Trace* (2)) draws the gate's neighbours 15 – 30 m inward while the gate stays pinned, and the smoothing (on 32, 81 and 188 also F-WALL's "
           "union-simplify rung, after the re-offset rung lost a pin) keeps a V of 11.8° – 43.4° with its apex AT the gate and both legs within 22.2° of the gate's own way; `insertChain` then "
           "attracts both legs onto the way's own vertex 55 – 91 cm beside the gate (2.3 – 24.7 cm from each leg; the attraction distance is 26 cm): the wall chain takes that vertex twice — "
           "`E_INVARIANT (wall, enceinte:2) branches: a linear role forms simple chains or rings (§3.10 role consistency)` on 118 and 81 — or the gate's knot lands on it and the strategy's "
           "read-back refuses `E_INVARIANT trace: gate gate:N is not on the committed trace at its point (§4.2 S3 (9))` on 32 (gate:7) and 188 (gate:9). ONE mechanism, two messages.",
   'evidence': "plat/docs/build/checks/M0-c-04-notes.md — section 'Hardening round S6', row 54 (N-54: the builder's table and the code path of each chain), and rows N-58, N-61 and N-63 of the "
               "section 'Closing check of hardening round S6' — read each whole; plat/docs/build/checks/M0-c-04-s6.md §1.2 (the checker's own table: per run the gate, the way's vertex beside it, "
               "the two legs, the apex, the distances); plat/docs/build/checks/M0-c-04-s6-evidence/q173-diagnosis.txt (one block per run, and a kernel hand-state sketch); "
               "plat/packages/layout/test/growth/s5ab/q173.test.ts (the reproduction and its `stage2Trace` harness — READ, never edited by this leg); docs/ARCHITECTURE.md §4.4 S5a *Trace* (2) "
               "'Pull and pin' and (3) 'Smooth and simplify' (grep -n 'Pull and pin'), §2.7's laws as (2) cites them, §5.2 F-WALL's rungs; plat/docs/build/choices.md C-0244 (8), C-0085, C-0474; "
               "docs/M0-FIX-QUEUE.md rows Q173 and Q187 — read both whole.",
   'required_change': "MEASURE FIRST, and write the table into your notes: over the site family's census (every S5-reaching seed of e-06's four groups at CITY — 800 derivations, one per process, the "
               "method of M0-c-04 S6's census-before / census-after files; or a stated sample of at least 100 seeds per group if the whole set cannot be carried — say which) and the item's own "
               "registered families, for EVERY pinned gate of every trace the strategy hands the kernel (stage 1's, S3's, read the same way): the interior angle at the gate, and the distance of "
               "each leg from the nearest vertex of the gate's own way other than the gate. How many traces carry an angle under 100° at a pin (the floor §4.4 S5a *Trace* (3) gives the simplify: "
               "'no interior angle < 100°'), in bins of 10°, and how many of those commit today. THEN MAKE-IT-SUCCEED: the trace handed to the kernel crosses each pinned gate as the handed "
               "boundary did — the design's own sentence, 'so the pulled trace crosses each arterial as the picked boundary did: on ground part 0 at its pin' (§4.4 S5a *Trace* (2)) — by the "
               "route the design's text supports, and say which and why: EITHER the pull and the smoothing keep the gate's squared crossing with its pin (the gate and the two points "
               "`squareGates` placed on its way's normal held as one pinned piece, or the pull's path bound to leave a pin along the handed line), OR the pin moved along its arterial to the "
               "place the pulled line admits it (§2.7's laws, law 2 (a), within the pull's search band — the gate vertex and the way's split with it). NEVER a new rung that only catches these "
               "runs after the fact, and never a looser attraction. F-WALL's rungs keep their order and their typed refusals; every line the strategy returns still passes its own validator and "
               "read-back. BARS, each a PIN: (a) the eight runs commit S5's stage-2 trace — a fixture per seed and configuration in YOUR test folder, deriving the trace on the committed tree as "
               "q173.test.ts's `stage2Trace` does (name the cost; the heavy ones may run at full strength only, as s5seeds.test.ts does), each asserting: the trace commits, every gate is on the "
               "committed trace at its point, no vertex of the wall chain has degree 3, and the interior angle at every pinned gate is at or above the floor you state; (b) a FAST pin at the "
               "unit's level — the pull and the smoothing on a hand boundary with a pinned, squared gate and a cost surface that draws its neighbours inward (or the evidence file's kernel "
               "hand-state sketch made a test) — RED today with the V, green with the fix; (c) a property over the item's own seeds: no committed trace carries an interior angle under the floor "
               "at a pinned gate. MUTANTS: the fix removed → (a), (b) and (c) red; the floor loosened by 10° → (c) red on a seed you name. THE DECLARED SHIFT, measured and listed (rule (3)): "
               "every seed of the census and of the item's own tests whose wall line moves, with the before and after digest of its wall chain; seeds whose trace carried no angle under the floor "
               "do NOT move — show it on at least five unbitten controls per group; the item's own goldens re-recorded and named. THE REFUSAL CENSUS before and after, never rising: the eight runs "
               "leave it. READ WITH IT and say for each whether the V was its cause and what it does after the fix: relief-3000 default seed 1 at the TEST size (S5 `branches`: the bench's pinned "
               "refusal, Q187 (e)) and the pipeline's own river fixture, river from 0 cdeg at 900 ha / 30 ha walled, seeds 1 and 6 (S5 `E_SELF_INTERSECT`, 'F-WALL: the trace touches itself after "
               "the re-offset and union-simplify rungs; the later rungs are M1's' — plat/docs/build/checks/M0-x-04-notes.md row 18)."},
  {'line': "LINE 2 — Q185 (tests only): packages/layout/test/enceinte/s5seeds.test.ts fails a plain `vitest run` at reduced strength — with PLAT_FUZZ_RUNS set its second describe ('F-WALL's later "
           "rungs (M1) …') loops over `FULL ? LATER_RUNGS : []`, registers no test, and vitest.config.ts's `passWithNoTests: false` makes that an error ('No test found in suite …': Test Files 1 "
           "failed, Tests all passed). Not a gate red (`vitest related` sets passWithNoTests itself; NEAR runs at full strength, where the file is 15 of 15), but every plain run of the folder or of "
           "the suite at reduced strength is red on the head.",
   'evidence': "docs/M0-FIX-QUEUE.md row Q185 — read it whole; plat/docs/build/checks/M0-c-02-notes.md N-71; the file's second describe.",
   'required_change': "TESTS ONLY: the second describe is skipped AS A UNIT at reduced strength (`describe.runIf(FULL)`, or one skipped placeholder case — say which and why), and registers the same "
               "cases as today at full strength. PIN: the file run with PLAT_FUZZ_RUNS=1 exits 0 (the command and its 'Test Files' line in your notes), and at full strength reports the same "
               "number of tests as before the round plus whatever LINE 1 adds to it. If LINE 1's fixtures live in this file, the same holds for them. NO-SHIFT."},
 ],
}

c04 = {
 'id': 'M0-c-04', 'from': 7, 'round': 'S7',
 'session': opening('M0-c-04', 'S7', "grep '^| Q173 '; grep '^| Q187 '; grep '^| Q200 '", "the declared move of q173.test.ts (N-58), Q187 (d), N-60 and the literal pin of L-0830; the ruling on Q174 (c)") +
  RULES.replace("'Hardening round S4'", "'Hardening round S7'") + MERGED.format(n=2) +
  "THIS ROUND, IN THIS ORDER: LINE 1 is TESTS ONLY and moves this item's own reproduction to leg 1's fix — it is done ONLY IF leg 1's LINE 1 ended FIXED with a PASS (read leg 1's verdict "
  "plat/docs/build/checks/M0-c-02-s7.md first); if leg 1 left its LINE 1 REPORTED, or ended without a PASS, LINE 1 here is NOT RUN (say so; the file stays as it is) and lines 2 and 3 proceed. "
  "LINE 2 is one TEXT change in a refusal's message (source), pinned verbatim; LINES 3 and 4 are tests only. NO-SHIFT in this leg: no boundary, pick, trace or strip moves by it. THE SESSION'S RULING ON "
  "Q174 (c) (J789; vetoable): C-0475 (2)'s narrowing STANDS at M0 — an unwalled stage reads the selection, and its boundary may leave points of the wall standing before it outside; the union on an "
  "unwalled stage is NOT built (measured by round S6: it empties the stage on two seeds — t_3 = 0, a region the river splits, more wall outside than before — collapses the ribbon's picks on others, "
  "and changes nothing on the capped frame; and nothing downstream needs it: S5c's growth area reads a walled stage by its WALL and the next stage as its boundary less that wall's interior, "
  "growth/proposals.ts `growthArea`, C-0254 (3)). The pin of the narrowing (held.test.ts, relief-60 default seed 13 at CITY) stays as it is. Nothing is asked of you for it. " + REDS +
  "Notes section 'Hardening round S7'; verdict plat/docs/build/checks/M0-c-04-s7.md; ledger ids the next free at build time.",
 'lines': [
  {'line': "LINE 1 — the DECLARED MOVE of test/growth/s5ab/q173.test.ts (round S6's reproduction; N-58 of its closing check): the file pins, on relief-60 default seed 118 and relief-3000 default "
           "seed 32, the boundary this item hands the trace CLEAN and the stage-2 trace's REFUSAL verbatim. Leg 1 of this merged round (M0-c-02 S7) makes the trace commit there, so the two "
           "refusal assertions are red on this tree by leg 1's declared shift — this line turns them. Round S6's checker ran the file's own harness on relief-3000 default 81 and 188 as well "
           "(the boundary clean, the refusal verbatim on both), and the coarse configuration refuses with the same message at the same coordinates on all four.",
   'evidence': "plat/docs/build/checks/M0-c-04-notes.md — rows 54 (N-54) and N-58 — read both whole; plat/docs/build/checks/M0-c-02-s7.md and the section 'Hardening round S7' of "
               "plat/docs/build/checks/M0-c-02-notes.md (leg 1's verdict, its declared shift and its own fixtures on these seeds — yours must not merely repeat them: yours pin THIS item's share); "
               "the file itself (`stage2Trace`).",
   'required_change': "TESTS ONLY (no file of the enceinte or of the growth sources is edited): the file's cases become the FOUR seeds (relief-60 118; relief-3000 32, 81, 188) in BOTH "
               "configurations — the heavy ones at full strength only if the cost requires it (name the cost; say which run at the PR size) — each asserting (i) THIS item's share as today: the "
               "handed boundary simple, touching itself nowhere, holding stage 1's wall, `defectOf` null; (ii) the stage-2 trace COMMITS (`traceStep` ok) and every gate S5b picked is on the "
               "committed trace at its point. The file's header says what moved and why (the refusals were the enceinte's, fixed by M0-c-02 S7). MUTANT, in your mirror: leg 1's fix reverted → "
               "(ii) red on every case with the messages round S6 pinned. NO-SHIFT."},
  {'line': "LINE 2 — Q187 (d): seed 151's REFUSE names no milestone. relief-60 coarse seed 151 refuses at S5a with 'S5a: the gate vertices could not be put on their ways: S5a: the stage boundary "
           "crosses bridge:24's span at (…) with N of its deck ends on the stage's side; its gate is the bridgehead on that side (N-54 (3))' — LAWFUL input, held at REFUSE by C-0475 (3) as a gate on "
           "a bridge's span, notBuilt M3a — but the text a user or a summary reads names no `notBuilt('M3a')`; J290 asks a REFUSE with no alternative to carry its numbered milestone.",
   'evidence': "docs/M0-FIX-QUEUE.md row Q187 (d) — read the row whole; plat/packages/layout/src/growth/boundary.ts — the two `err('E_INVARIANT', …)` texts of the bridge-span branch (grep -n "
               "\"span at\"; grep -n 'two gates at'); plat/docs/build/choices.md C-0475 (3); how the package's other refusals name a milestone (grep -rn \"notBuilt('\" packages/layout/src); J290 "
               "in docs/PROGRESS.md.",
   'required_change': "The bridge-span refusal's text NAMES ITS MILESTONE in the package's own form — `notBuilt('M3a')` with what M3a builds there, as C-0475 (3) states it — on the span-crossing "
               "text, and on the 'two gates at one bridgehead' text if C-0475 (3) carries it to the same milestone (say which you found). The code, the stage and every committed output are "
               "unchanged: a MESSAGE change, pinned VERBATIM (J263 Q6) on seed 151 (coarse) through S5a, or on a hand state that reaches the same branch at lower cost (say which). Every pin of "
               "another item that reads the old text is LISTED for the session with its file (the committed site summary's refused texts are stale until the session's re-run: a note, never yours "
               "to edit). MUTANT: the milestone dropped from the text → the pin red."},
  {'line': "LINE 3 — N-60 of round S6's closing check (tests only): `heldEnclosure`'s WATER guard has no pin — the mutant M9w (`lattice.water[u] !== 0` dropped) survives held-unit.test.ts, whose "
           "hand state is a dry flat site.",
   'evidence': "plat/docs/build/checks/M0-c-04-notes.md row N-60 — read it whole; plat/docs/build/checks/M0-c-04-s6.md §4 (M9w); test/growth/s5ab/held-unit.test.ts; growth/mainRoads.ts "
               "`heldEnclosure`.",
   'required_change': "TESTS ONLY: a second hand node inside the hand wall's line, set as WATER, asserted OUT of the held set while its dry neighbours are held (the T-finite case stays as it is). "
               "MUTANTS: M9w red; M9 (`!(T[u] < Infinity)` dropped) still red. NO-SHIFT."},
  {'line': "LINE 4 — the pin of C-0475 (2)'s narrowing is THREE LITERALS ON A WHOLE DERIVATION (tests only): held.test.ts pins, on relief-60 default seed 13 at CITY, stage 3's t_3, its outline's "
           "point count and the count of stage 2's wall points outside it as constants (T3_SEED13, OUTLINE3_SEED13, WALL2_OUTSIDE_SEED13). Round S6 recorded them on its base; a river fix that "
           "landed meanwhile (M0-e-02 S2, C-0498) gave the seed another river, and the session had to re-record all three by a seam at the landing (82 753.025 → 82 824.218 cm, 218 → 700, 26 → 6; "
           "L-0830) — as it will at every upstream shift, and leg 1 of this merged round may move them again (say whether it did; if so re-record them in this line's change, with the mutant's "
           "reading).",
   'evidence': "plat/CLEAN-ROOM.md row L-0830 and docs/validation/j789-c04s6-seam-2026-11-12/ (the two readings on the merged tree, plain and under the mutant M6); test/growth/s5ab/held.test.ts — "
               "the constants, the seed-13 block, and the `stage2` helper with the test 'a boundary that already holds the wall before it is the plain one' (which states its pin against the plain "
               "reading it computes itself); plat/docs/build/checks/M0-c-04-s6.md §1.3 and §4 (M6, M6u).",
   'required_change': "TESTS ONLY: state the pin AGAINST THE PLAIN READING COMPUTED IN THE TEST — stage 3's committed boundary equals the level set over stage 2's SELECTION (`stageBoundary` on "
               "the state as stage 3 begins: its t and its selected set), and it is NOT the held one (the two differ on this seed: the non-vacuity line — at least one point of stage 2's wall "
               "stands outside the plain boundary, and the boundary over the held enclosure has another t) — so that an upstream shift moves no constant. If the state as stage 3 begins cannot "
               "be rebuilt in the test at a cost you can name and defend, keep the three constants, say so, and add the non-vacuity line beside them. MUTANTS: M6 and M6u red, as today. "
               "NO-SHIFT."},
 ],
}

e06 = {
 'id': 'M0-e-06', 'from': 5, 'round': 'S5',
 'session': opening('M0-e-06', 'S5', "grep '^| Q187 '", "Q187 (e) — two pins that stand on a live refusal") +
  RULES.replace("'Hardening round S4'", "'Hardening round S5'") + MERGED.format(n=3) +
  "THIS ROUND IS TESTS ONLY, ONE LINE. IT IS NOT THE SUMMARY'S RE-RUN: you neither re-run nor edit plat/docs/build/summaries/M0-e-06.json, and the canary of bench/test/site/summary.test.ts stays "
  "red as declared (J772 (7)) — the session batches the final re-run after the stage and kernel rounds still in flight (it will be this item's LAST round). This leg runs whatever legs 1 and 2 "
  "ended with: the move it makes is right on either tree. NO-SHIFT: no source of the harness changes. " + REDS +
  "Notes section 'Hardening round S5'; verdict plat/docs/build/checks/M0-e-06-s5.md; ledger ids the next free at build time.",
 'lines': [
  {'line': "LINE 1 — Q187 (e): TWO PINS STAND ON A LIVE REFUSAL. bench/test/site/compose.test.ts's 'relief-3000 default seed 1 (test size) refuses at S5: the record names S5 with the runner's code "
           "and its detail text, and the class carries it once' and bench/test/site/spike.test.ts's 'relief-3000, seed 1 (S5 refused, S6 not reached): over the arena S4 left, a perimeter at the "
           "frame meets land:<n> faces, each counted against the bar' were moved by round S4 from relief-60 seed 2 (which a stage fix had made commit) to relief-3000 seed 1 at the test size — a "
           "seed that refuses only because of a defect the stage's owner is asked to fix (leg 1 of this merged round, M0-c-02 S7: say from its notes whether its fix makes this seed commit on "
           "this tree). Each time a stage fix lands, a pin that stands on a live refusal goes red with no defect of the harness.",
   'evidence': "docs/M0-FIX-QUEUE.md row Q187 (e) — read the row whole; plat/docs/build/checks/M0-e-06-notes.md 'Hardening round S4' (N-s4-2 … N-s4-4 and 'Named for the session'); the two tests "
               "and the helpers they use; bench/src/site/ — how the harness composes a refused record and reads the arena a refused run left (read whole before choosing the plant); leg 1's "
               "verdict plat/docs/build/checks/M0-c-02-s7.md and its notes section 'Hardening round S7' (what relief-3000 seed 1 does at the test size after its fix).",
   'required_change': "TESTS ONLY: the two tests take their refused run from a PLANTED refusal that no stage fix can turn green — a registration of the base product with ONE stage wrapped in the "
               "test to refuse with a typed code and a stated detail at a chosen point (the harness's own seam for a registry or a stage list, as the package's other tests wrap a stage; say which "
               "seam, and that no source of the harness changed), on a seed that otherwise commits whole — so that each test still proves what its title says: the record names the refusing "
               "stage with the runner's code and its detail text and the class carries it once; over the arena the last committed stage left, the perimeter reading counts each land face against "
               "the bar. Each title says the refusal is planted. If the harness offers NO seam to plant a refusal without a source change, change nothing: REPORT the smallest seam it would need "
               "and leave the two tests on whichever refusing seed leg 1's census still shows (name it), saying so. MUTANTS, in your mirror, one per test: the harness dropping the refused "
               "record's detail text → the first red; the perimeter reading skipping a land face → the second red. The live site family keeps its own census in the summary — nothing of it is "
               "re-counted here."},
 ],
}

have = {(e['id'], e.get('round')) for e in s['rounds']}
for e in (c02, c04, e06):
    assert (e['id'], e['round']) not in have, e['id']
s['rounds'] += [c02, c04, e06]
json.dump(s, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
open(P, 'a').write('\n')
print('appended; rounds =', len(s['rounds']), [len(e['session']) for e in (c02, c04, e06)])
