# Hardening re-triage 2026-10-19 — the critic (seat retriage/critic, Fable/high)

Written 2026-10-19 07:20–07:35 against `plan.md` (254 lines, md5 adf3b8a7) and `plan.json` (196 lines, md5 a8a646e3),
the batch records B1–B11 (their DONE-BY lines read in full), `plat/docs/build/checks/hardening-inventory.md` §3
(:2190-2363) and the current source. Read-only: no git, no test, no build. Tags: [OBSERVED] = I read the line;
[INFERRED] = reasoned from what I read. The owner's word is J419 ("i defer to your judgement"; PROGRESS.md:477).

Scope note. The plan carries **nine** DONE-BY verdicts (eight inventory rows + queue L30) and **no** OBSOLETE and
**no** DUPLICATE-OF (B8's L18 "duplicate" is a listing twice of one queue row, not a row verdict). The task asks for
twelve checks of the verdicts that remove the most work, so the three after the nine are the next-largest removals:
the two folds F1 (c-06's round → its build) and F2 (f-02b's round → its build), which each remove a hardening child,
and d-04's large → medium cut (3.5 h), the biggest size cut that rests on a row-by-row reading.

## 1. The twelve checks

| # | verdict checked | what the row asks | what the tree shows | outcome |
|---|---|---|---|---|
| C1 | M0-a-07:14 N-6 DONE-BY build/M0-a-07-consolidate-1 (B1:21; plan §6) | a comment in `rayHit` naming C-0192 (7) (inventory :621) | [OBSERVED] `plat/packages/kernel/src/faces/fan.ts:64-66`: "Located in doubles (C-0192 (7)); the contact decision then judges the snapped hit exactly (`planCut`)." Lane: `docs/lane-events.log:9260` build/M0-a-07-consolidate-1 LANDED 2026-10-13 23:11 names `src/faces/{…,fan,…}.ts` [OBSERVED]. A comment row: no pin owed. | UPHELD |
| C2 | M0-a-09:102 21 X11 DONE-BY build/M0-a-09-fix-s2 (B1:54) | fixture chord case 43 face 3 asserting the kerb equals the no-splice kerb (:708) | [OBSERVED] `plat/packages/kernel/test/arr/bands/widthstep.test.ts:293-306`: 'a corner wedge the guard drops … the dropped splice taken out of the kerb (C-0281)', chords `{a: 11_553…}, {a: 2363…}, {a: 263…}`, `expect(r.kerb).toEqual(['0,404 3241,3677 3274,3711 447,4000 0,4000'])` — no `3253,3690`; `chordFace` returns the raw `read.value.kerb` (`:227-228`). Lane `:7204` 2026-10-08 16:33 names `kernel/test/arr/` [OBSERVED]. The pin is the row's pin. | UPHELD |
| C3 | M0-d-05a:16 N-2 DONE-BY build/M0-d-05b (B2:64, :74; plan §6 "mark DONE") | inventory :1379: "mint refuses a live set repeating an id (RangeError + test)" | [OBSERVED] `plat/packages/model/src/identity/mint.ts:183-187` has **no** repeat check (`takenIds.add`, `retiredIds.add`, nothing refused). The refusal is in the live-set builder: `plat/packages/model/src/match/carry.ts:55-59` `liveSetOf` throws `RangeError('match: the old id … is given twice')`, pinned at `plat/packages/model/test/match/carry.test.ts:144` (title cites "M0-d-05a note N-2") and `:163` (`toThrow(/given twice/)`). The notes row itself (`plat/docs/build/checks/M0-d-05a-notes.md:16`) gives two alternatives: "Either `mint` refuses … **or** M0-d-05b's live-set builder states and tests that each id appears once", homed "M0-d-05b (it builds the live set the mint reads)". The second alternative is on the tree with its pin; the inventory's row text compressed the fix to the first. Residue as B2 says: `mint` still accepts a repeating `live` from another caller. B2's "no such caller exists at M0" is imprecise: `mint(…, live, …)` is called with hand-built live sets at `layout/src/districts/stage.ts:267-270` (`input.live ?? []` plus the stage's own fresh ids), `layout/src/infill/bentCutFabric.ts:425, 455` (`ctx.live`), `testkit/src/edge/s8.ts:125-127`, `testkit/src/ladders/support.ts:156-157, 211, 249` [OBSERVED]; those sets are built from fresh minted ids, so well-formed by construction [INFERRED]; `pipeline/base.ts` builds no `live:` input [OBSERVED grep]. | UPHELD, with correction G1 (cite the note's second alternative in the bookkeeping; keep the residue on the owner list, as the plan does) |
| C4 | M0-k-02:15 N-10 DONE-BY build/M0-k-04 (B8:21) | inventory :1847: "name the far end in the step" | [OBSERVED] the notes row (`M0-k-02-notes.md:15`) offers "Either name the far end in the step … **or** have M0-k-04's runner resolve `farPart` as the part beyond `from`". The runner does: `plat/packages/testkit/src/invariants/constructive.ts:418-422` `farEnd(pts, from, other)` ("The far part of a chain from a point `from`, away from `other` (N-10's reading)") and `:484-487` ("farPart: the part beyond `from`, away from the other junction (N-10)"); `checks/M0-k-04.md:185` "N-10 … The case is green (CONFIRMED)". Residue cosmetic: `testkit/src/constructive/cases/removals.ts:108` still `{ chain: 'spine', rekey: 'farPart', from: 'j2' }` [OBSERVED]. Same structure as C3 (second alternative on the tree); upheld on the same footing. | UPHELD |
| C5 | M0-b-03:13 N-4 DONE-BY build/M0-x-05 (B10:33) | S8-run fixtures for the reflex pre-cut and the antenna split (:1014) | [OBSERVED] `plat/packages/testkit/test/ladders/rungs-s8.test.ts:32-39` 'cut/reflex' on `districtOf([L_SHAPE], 1)` asserts `rep.rungs[0]` `{ rung: 'pre', attempt: 0, outcome: 'cut' }` and `facesAfter: 2`; `:101-114` 'cut/antenna' (seed 6 through the base chain) asserts `[['pre','refused'],['antenna','cut']]`; fixtures `plat/packages/testkit/src/ladders/fixtures.ts:44` (L_SHAPE), `:173-174`. Lane `:6792` build/M0-x-05 LANDED 2026-10-07 19:40 names `ladders/{…,fixtures,…}.ts` and the tests [OBSERVED]. The K37/K38 kills: `M0-b-03-notes.md:183` C1-9 "N-4's two survivors are now killed (K37 antenna split off, K38 reflex pre-cut off)" [OBSERVED read of the record]; not re-run (this run does not run tests). | UPHELD |
| C6 | M0-b-03:14 N-5 DONE-BY build/M0-x-05 (B10:34) | assert W_CUT_SLID warning and step count on a slide fixture on an S8 run (:1015) | [OBSERVED] `rungs-s8.test.ts:86-99` 'cut/slide' asserts `c.map((r) => r.slide)` `[30]`, `rep.warnings['W_CUT_SLID']` 30, the S8 stage's report `warnings['W_CUT_SLID']` 30 and no other stage carrying it; the warning is raised at `plat/packages/layout/src/infill/bentCutFabric.ts:1287` `run.warn('W_CUT_SLID', foot.k)`. | UPHELD |
| C7 | M0-c-03:26 5 DONE-BY build/M0-x-05 (B10:35) | per-rung fixtures through runBase for the slice → `S4Report.rungs` path (:1156) | [OBSERVED] `plat/packages/testkit/test/ladders/rungs-route.test.ts:19-23` `riverTown` runs `ladderChain(… until: 'S4')` and returns `s4out.report.rungs`; per-rung assertions at `:33-34` (another_site, unserved/water), `:42` (slope), `:54` (unserved 'no path'), `:60-64` (work_cut); the handoff `plat/packages/layout/src/backbone/stage.ts:307` `rungs: built.rungs`; the chain registers the base at `plat/packages/testkit/src/ladders/chain.ts:246` `registerBase(registry, …)`. | UPHELD |
| C8 | M0-d-07:12 N3 DONE-BY build/M0-d-07-consolidate-1 (B3:71) | stub ESLint returning undefined; message "ignored, or matched by no configuration" (:1454) | [OBSERVED] `plat/tools/lint/coverage.test.mjs:179-184` `unmatched = { isPathIgnored: async () => false, calculateConfigForFile: async () => undefined }`, asserts `without ${ALL}` and `{ ok: false, counts: { files: 1, linted: 0 } }`; `plat/tools/lint/coverage.mjs:80` "eslint.config.js ignores it (…), or no configuration …". Lane `:7670` 2026-10-11 12:18 [OBSERVED]. | UPHELD |
| C9 | queue L30 DONE-BY build/M0-m-01-fix-s1 (B2:53; d-04's queue row) | one lifecycle-stamp builder `generatedLifecycle(epoch)` in @plat/model (M0-FIX-QUEUE.md:138) | [OBSERVED] `plat/packages/model/src/stage/lifecycle.ts:11-14` `generatedLifecycle(epoch)` refusing a non-whole epoch; exported `plat/packages/model/src/stage/index.ts:22`; `checks/M0-m-01-notes.md:103` "L30 FIXED (model); REPORTED (the copies)"; the copies are Q87 (`M0-FIX-QUEUE.md:101`), whose owner list reads "M0-d-04 none". Lane `:10066` 2026-10-18 22:37, close `:10075` 2026-10-19 01:39 [OBSERVED]. Nothing left for d-04's round. | UPHELD |
| C10 | F1: M0-c-06's round folds into c-06's third continuation build (plan §2, R1; B6:59) | rows M0-c-05:62 16 N-16 (:1293: the integrated run reports the window count) and Q60 (:74) | [OBSERVED] `plat/bench/src/fusion/index.ts` is a 2-line scaffold stub and `plat/bench/test/fusion/` does not exist on this tree (`ls`); no `build/M0-c-06 … LANDED` line (grep); `docs/HANDOFF.md:258` names `build/M0-c-06` on `wip/child-c06f0b` as the continuation to resume; Q60's own text: "OPEN — c-06's third continuation". The a-09 s6 lane line `:9926` that ran `bench test/fusion/drift.test.ts` red on 2026-10-13 was a tree carrying c-06's unlanded WIP (`HANDOFF.md:240`: "landed:verify red only on c-06's files") [OBSERVED], consistent with B6. Neither row is dropped: both named in F1. Gap G3 on Q60's class routing. | UPHELD |
| C11 | F2: M0-f-02b's round folds into f-02b's build (plan §2, R1; B11) | rows M0-f-02a:14 N-6 (:1810: "M0-f-02b declares the spikes' seed families as suites") and Q49 (:63) | [OBSERVED] no `build/M0-f-02b` or `check/M0-f-02b` lane line (grep over `docs/lane-events.log`), no `checks/M0-f-02b*` file (`ls`); N-6 is a declaration the build itself makes; Q49 reads "OPEN — after Q18 lands … and the session's detached 1 000-seed run, re-run both receipts whole". Both rows are named in F2. Gap G4: the plan's F2 gate names Q18 only. | UPHELD |
| C12 | M0-d-04 large → medium (B2:97; plan §1 entry 18, §5 "3.5 h") | §3's size rule (:2193): medium 7–15 rows, large > 15 or a code-path change | [OBSERVED] the 13 rows left (`hardening-inventory.md:1340-1371`) are tests, test renames, a doc sentence (N-1) and golden pins; the two defer-candidates N-6 (:1345, a debug-build assert) and N-16 (:1355, a count pin) are the only code touches and neither is a code path. 13 ≤ 15 and 15 ≤ 15, so the size holds whichever way the owner rules — no owner decision is applied by the cut. L30 (C9) no longer binds the "with M0-m-01" order word. | UPHELD |

Refuted: none. Upheld: 12.

## 2. The drops (task (2))

The plan declares DROP 0 and I find none hidden: F1 and F2 are the only verdicts that remove a hardening child, and
each names its two rows and the build child that carries them (C10, C11). No round of the 34 has every row done:
the smallest residues are d-05a (3 rows, merged), k-02 (3 rows, merged), c-06 and f-02b (1 + 1 queue row each,
folded). Pins owed by the nine DONE-BY rows: C1 is a comment row (none owed); C2, C5, C6, C7, C8 carry their pins
at the cited test lines; C3 and C4 carry the pin of the note's second alternative (`carry.test.ts:144, 163`;
`checks/M0-k-04.md:185` CONFIRMED, the case being the pin); C9's builder is pinned by m-01 s1's own close
(`checks/M0-m-01-s1.md`, lane `:10075`), and d-04 owes nothing for it.

## 3. The order (task (3))

Checked entry by entry against §3's order words (:2199-2360) and the gates in flight (J419: a-09 S9/Q18, a-05 s9,
c-01 s2, c-03 s3, e-04 s3, k-04 s1; the lane log has no build-lane line for the five non-a-09 rounds, a-09 S9's
spec run landed `:10136` 02:47 — the in-flight list rests on J419, which the plan cites). Every "after X" word is
met or kept: a-16's "after the §5 ruling on note 11" is met by RQ4 (`rulings-hardening-1.md:172-205`, B1:77,
C-0372 at `choices.md:379` names RQ4) [OBSERVED]; d-04's "with or right after M0-m-01" is met (C9); b-03 after Q18
and b-02; b-04 after b-03; c-02 after a-05 s9; c-04 after c-02; e-03 after a-05 s9 (L26); x-02 after b-03, c-02,
c-04, e-03; x-04 with/after b-03; x-05 after b-03; f-03a before f-03b; s-01 with d-07. The plan's deviations are all
delays, never early launches: a-07 (parallel → on k-04 s1, through M5), b-05 (parallel → on b-03, through M4), k-02
(parallel → on k-04 s1, which B8:14 shows is required: its rows N-2 and N-12 edit k-04's in-flight file). The two
gates in flight are placed right: Q18/Q19 before a-09's round, b-03, F1, F2; a-05 s9 before c-02, c-04, e-03.
Three gate lists are narrower than the order words (G4, G5, G6 below); none would launch a round early in practice,
because the omitted gates are wave-0 or wave-1 rounds that land first, but a brief generated from `waitsOn` would
not know that.

## 4. The merges' owns (task (4))

[OBSERVED] `plat/docs/build/M0-work.json`, pairwise intersections empty for all five merges and the optional one:
M1 d-05a `model/src+test/identity/` vs d-05b `model/src+test/match/`; M2 k-05 `testkit/src/{metrics,parity}/`,
`testkit/baselines/{README.md,crossings.json}`, `testkit/test/parity/`, `bench/src+test/{parity,baselines-check}/`
vs k-06 `testkit/src+test/scanner/`, `testkit/baselines/denylist-allow.json`, `bench/src+test/scan/`; M3 f-02a
`bench/src+test/tiers/`, `bench/src/tier-jobs/` vs f-03a `tables/src+test/workLimits/`, `tables/data/workLimits.json`
vs s-02 `tables/src/{loader,cell}/`, fourteen other `tables/data/*.json`, `tables/test/{loader,cell,data}/`; M4 b-04
`bench/src+test/bentcut/` vs b-05 `bench/src+test/bentcut-ng/`; M5 a-07 `kernel/src+test/faces/` vs k-02
`testkit/src+test/constructive/`; optional d-06 `testkit/src+test/crosshost/`, `bench/src+test/crosshost/` vs d-09
`bench/src+test/determinism/`. One cross-owns edit inside a merge, not between its members: M5's k-02 rows
M0-k-04:10 N-2 and the judge half of M0-k-02:17 N-12 edit `testkit/src/invariants/constructive.ts`, which is
**M0-k-04's** owns (`M0-work.json` k-04: `plat/packages/testkit/src/invariants/`), not a-07's or k-02's (G2).

## 5. Owner decisions (task (5))

§4 lists 39 defer-candidate rows with recommendations and names three owner-gated items; §1's verdicts and sizes
do not depend on them (C12 shows the one size cut that could have; a-09 stays large, x-02 is stated both ways,
e-01's cut to small holds with N-c1-2 kept, 7 rows). Session rulings R1–R11 are within the delegated scope (J419)
and marked vetoable. Two places apply a deferral de facto rather than list it (G7, G8): `plan.json`'s `rowsLeft`
omits the defer-candidate rows per round, so a brief rendered from that field would drop them before the owner
rules; and §5's "after" headcount puts x-02 among the 18 medium (6 h in the point figure) although the table says
"large by count (16)" unless the two defers are taken. Neither changes a verdict.

## 6. The gaps

| id | severity | the gap | the exact fix to the plan |
|---|---|---|---|
| G1 | minor | §6's bookkeeping "mark DONE … d-05a N-2 (build/M0-d-05b, `carry.ts:55-59`)" lets the inventory's fix text ("mint refuses") stand beside a fix that is not at the mint | In §6's bookkeeping line and B2's entry, add: "by the note's second alternative (`M0-d-05a-notes.md:16`: the live-set builder states and tests that each id appears once — `liveSetOf`, `carry.ts:55-59`, `carry.test.ts:144, 163`); the inventory's fix text named only the mint alternative". Keep the residue on the §4 owner list; replace B2's "no such caller exists at M0" with "every other `mint` caller (`districts/stage.ts:267-270`, `bentCutFabric.ts:425, 455`, testkit `edge/s8.ts:125-127`, `ladders/support.ts:156-157, 211, 249`) builds its live set from fresh minted ids". |
| G2 | blocking (for M5's brief, not for the plan's verdicts) | M5 (a-07 + k-02) would edit `plat/packages/testkit/src/invariants/constructive.ts` for k-02's rows M0-k-04:10 N-2 and N-12's judge half; that file is M0-k-04's owns, outside both members' owns, so the recipe's owns-by-item partition (§2 "the owns stay disjoint by construction") does not hold for M5 as written | In §2 M5 and `plan.json` merges, add an explicit owns extension for the child: "+ `plat/packages/testkit/src/invariants/constructive.ts` (k-04's, after k-04 s1 lands and with k-04 off the busy list)", and name it in the child's busy-list entry; or route N-2 and N-12's judge half to k-04's next round (k-04 s2) and leave M5 with a-07's 4 rows + k-02's M0-a-15:34 8 and the hold half of N-12. Either is a session ruling; the plan must pick one before M5 launches. |
| G3 | minor | F1 carries Q60 to c-06's build, but Q60's own text routes its **fix** by class (b-03 if a seed or kerb-component case, a-09 if a band case, c-06 if the clause's own; `M0-FIX-QUEUE.md:74`) and §3 entry 25 lists Q60 as merging into b-03's round; the plan's b-03 and a-09 row lists carry no placeholder | Add to entries 12 (a-09) and 25 (b-03) a rider: "Q60's fix if the third continuation classes it as this item's (`M0-FIX-QUEUE.md:74`); the classification itself stays in F1". If F1 lands after b-03 opens, the rider falls to the item's next round. |
| G4 | minor | §3 entry 50's order words are "after Q18 **and the session's 1 000-seed run**"; Q49 says the same; the plan's wave 2 gates F2 on Q18 alone | In §3 wave 2 and `plan.json` waves["2"], write "M0-f-02b build (on Q18 and the session's detached 1 000-seed run; Q49)". |
| G5 | minor | §3 entry 39: e-06 "after the e-* stage rounds"; the plan's `waitsOn` for e-06 names e-03, e-04 s3 and Q18 but not e-01 and e-05 (both wave 1) | Add "M0-e-01, M0-e-05 landed" to entry 39's waits (they will land first in practice; the brief should still name them). |
| G6 | minor | §3 entry 48: x-06 "after the census rounds"; the plan gates it on a-09's round, c-02, c-04, e-03 and omits the in-flight census rounds a-05 s9, c-01 s2, c-03 s3, e-04 s3 (§3 "Awaiting the census" lists a-05, a-06, a-08, a-09, a-11, c-01 … c-05, e-03, e-04) | Add "and the wave-0 census rounds (a-05 s9, c-01 s2, c-03 s3, e-04 s3) landed" to entry 48's waits; a-06, a-08, a-11, c-05 are among the 14 done (J419). |
| G7 | minor | `plan.json` `rowsLeft` per round omits the defer-candidate rows, so a brief rendered from it applies the deferral before the owner rules | Add a per-round `deferPending` array in `plan.json` (the refs from `deferCandidates` for that item) and one sentence in §1's preamble: "a brief carries rowsLeft + deferPending until the owner rules on §4". |
| G8 | minor | §5's "after" headcount counts x-02 as medium (18 medium, 6 h in the point figure) although §1 says it is large by count unless the two defers are taken | State the point figure both ways ("131.5 h with x-02's defers, 133.5 h without") or count x-02 as large and show the 2 h as the owner's. |
| G9 | minor | §3 preamble: "The lane log has …" is not claimed, but the in-flight list of five of the six wave-0 rounds has no build-lane line in `docs/lane-events.log` (only a-09 S9's spec run, `:10136`); the plan rests on J419 without saying so | Add to §3 wave 0: "(per J419, PROGRESS.md:477; the children's own lane lines are not yet in docs/lane-events.log)". |

## 7. Verdict

**PASS-WITH-CORRECTIONS.** All twelve checked verdicts hold on the current source (none refuted); no round is
dropped and no pin is lost; the order keeps every §3 order word and both in-flight gates; the merges' owns are
pairwise disjoint; the owner's deferrals are listed, not applied, in the verdicts and sizes. The corrections: G2
must be settled before M5 launches (a cross-owns edit of k-04's file); G1, G3–G9 are wording and gate-list
completions that change no verdict, size or wave.

Checks summary for the structured answer: refuted [] ; upheld 12.
