# Hardening re-triage 2026-10-19: the fix seat (retriage/fix, Opus/high)

Written 2026-10-19 07:22–07:40. Inputs: `critic.md` (105 lines, md5 ffc3f35f, read whole), `plan.md` (254 lines, md5
adf3b8a7) and `plan.json` (196 lines, md5 a8a646e3). Outputs: `plan.md` (278 lines, md5 d888102c) and `plan.json` (119
lines, md5 147c719d). The new plan.json holds the same data in a compact layout, one round per line; the new keys are
listed below. This seat did not run git, tests or builds. It did not edit B1–B11, the inventory or the queue. Tags:
[OBSERVED] means I read the line myself in this run. [INFERRED] means reasoned from lines I read.

## 1. Refuted rows

None. The critic upheld all 12 of its checks (`critic.md` §1, "Refuted: none. Upheld: 12"). No row goes back to
STILL-OPEN, and no round's verdict, size or rows-left moves.

## 2. The gaps, one by one

| gap | sev. | applied? | what changed (plan.md / plan.json) | evidence read by this seat |
|---|---|---|---|---|
| G1 | minor | yes, reworded | **plan.md §6 bookkeeping:** "d-05a N-2 (build/M0-d-05b, `carry.ts:55-59`)" now reads "by the note's second alternative (`M0-d-05a-notes.md:16` …; `liveSetOf`, `carry.ts:55-59`, `carry.test.ts:144, 163`). The inventory's fix text (:1379) named only the mint alternative, which is not on the tree (`mint.ts:183-187`), and that alternative stays on the §4 owner list as the residue." **plan.md §4 d-05a residue row:** "no second caller at M0" is replaced with the hand-built-live-set callers. Recommend now reads "M1, with the first caller that passes a live set it did not build". **plan.json** `deferCandidates[M0-d-05a]` `why` / `recommend`: same change. **B2.md is not edited** because it is another seat's record. The plan's §4/§6 wording supersedes B2's "no such caller exists at M0". | [OBSERVED] `mint.ts:180-187`: every `live` entry is added and none is refused. `carry.ts:55-59`: `liveSetOf` throws `RangeError('… is given twice')`. `carry.test.ts:144` (title cites "M0-d-05a note N-2"), `:163` (`toThrow(/given twice/)`). `M0-d-05a-notes.md:16`: "Either `mint` refuses … or M0-d-05b's live-set builder states and tests that each id appears once". Inventory `:1379`: "mint refuses …". Callers: `districts/stage.ts:267-270`, `bentCutFabric.ts:425, 455`, `edge/s8.ts:125-127`, `ladders/support.ts:157, 211, 249`. One precision added beyond the critic: `districts/stage.ts:267` seeds from `input.live ?? []`, and `pipeline/base.ts` builds no `live:` input (grep `live` hits only `:658`, a comment) [OBSERVED]. So "well-formed by construction" holds for every M0 path [INFERRED]. |
| G2 | blocking (M5's brief) | yes, ruled: owns extension (R12) | **plan.md §1 entry 40 waits:** "k-04 s1 landed and k-04 off the busy list … the child's k-02 ID carries the one-file owns extension of R12". **§2 M5 row:** each member's owns is named, plus the extension `plat/packages/testkit/src/invariants/constructive.ts` (M0-k-04's), limited to two edits (drop KI-2 from `CONSTRUCTIVE_KNOWN`; the `slot-reused` judge check). It is valid only after k-04 s1 lands and k-04 is off the busy list. It is named in the brief, in the busy-list entry `M0-k-02 (+ testkit/src/invariants/constructive.ts)` and in k-02's `land_child.py --owns`. **§2 closing paragraph:** "disjoint by construction" now names this one declared exception. **§3 wave 2:** the M5 line carries the gate and the extension. **§6:** new ruling **R12**, the session's and vetoable. **plan.json:** `rounds[M0-k-02].ownsExtension`, `rounds[M0-k-02].waitsOn`, `rounds[M0-a-07].waitsOn`, new top-level `mergeOwnsExtensions`, and the `waves["2"]` M5 string. | [OBSERVED] `M0-work.json`: k-04 owns `plat/packages/testkit/src/invariants/`, a-07 owns `kernel/src+test/faces/`, k-02 owns `testkit/src+test/constructive/`. Inventory `:1849` (N-12, owner M0-k-02) and `:1859` (k-04 N-2, owner M0-k-02). `constructive.ts:1777-1782`: the KI-2 entry's `owner: 'M0-k-02 (the case data)'`. `land_child.py:16` ("land overlays the owns … per file") and `:105-110` (`overlay_paths` = `--owns` + checks + records): an extension missing from `--owns` would silently not land. Inventory §3 (:2317-2319): entry 42 is k-04's only planned round. No "k-04 s2" exists, so the critic's second option would add a child or reopen k-04 for two S edits. Taking entry 42 to be the k-04 s1 now in flight is [INFERRED] from J419. |
| G3 | minor | yes | **plan.md §1 entry 12 (a-09) rows left:** added the rider "Q60's fix if c-06's third continuation classes it as a band case (`M0-FIX-QUEUE.md:74`; the classification stays in F1)". **Entry 25 (b-03):** added the rider "… as a seed or kerb-component case …; §3 entry 25 lists Q60 here; … if F1 lands after b-03 opens, the rider falls to b-03's next round". **plan.json:** `riders` on M0-a-09 and M0-b-03. The rider is not a counted row: Q60 is still counted once, in F1's queue row. | [OBSERVED] `M0-FIX-QUEUE.md:74`: "the owning item by its class (b-03 if a seed or kerb-component case, a-09 if a band case, c-06 if the clause's own)". Inventory §3 entry 25 (:2269): "census: Q60 (c-06's third continuation classifies it) … merge here". |
| G4 | minor | yes | **plan.md §3 wave 2 F2:** "the M0-f-02b build (on Q18 and the session's detached 1 000-seed run; Q49)". **plan.json:** `waves["2"]` string and `rounds[M0-f-02b].waitsOn` (the 1 000-seed run added). | [OBSERVED] inventory §3 entry 50 (:2341): "after Q18 and the session's 1 000-seed run". `M0-FIX-QUEUE.md:63` Q49: "after Q18 lands … and the session's detached 1 000-seed run". |
| G5 | minor | yes | **plan.md §1 entry 39 waits:** added "M0-e-01 and M0-e-05 landed (§3 entry 39 'after the e-* stage rounds'; both wave 1)". **§3 wave 3:** the e-06 line now names e-01 and e-05. **plan.json:** `rounds[M0-e-06].waitsOn` and `waves["3"]`. | [OBSERVED] inventory §3 entry 39 (:2309): "after the e-* stage rounds". |
| G6 | minor | yes | **plan.md §1 entry 48 waits:** added "and the wave-0 census rounds (a-05 s9, c-01 s2, c-03 s3, e-04 s3) (§3 entry 48; a-06, a-08, a-11, c-05 are among the 14 done, J419)". **§3 wave 4:** same. **plan.json:** `rounds[M0-x-06].waitsOn` and `waves["4"]`. | [OBSERVED] inventory §3 entry 48 (:2335): "after the census rounds (re-pins move)". :2362-2363 lists the census-verdict items (a-05, a-06, a-08, a-09, a-11, c-01 … c-05, e-03, e-04). `docs/PROGRESS.md:477` (J419) lists a-06, a-08, a-11, c-05 among the 14 done. |
| G7 | minor | yes | **plan.md §1 preamble:** "a brief carries rowsLeft + deferPending (`plan.json`, per round) until the owner rules on §4; no deferral is applied by a brief before that ruling". **plan.json:** each round has a `deferPending` array, built from `deferCandidates` for that item. That gives 40 refs: the 36 inventory rows, the 3 L15 parts on d-07 and the d-05a N-2 residue. Owner-gated rows already in `rowsLeft` (a-16 rows 5 and 7, b-03 N-25) are flagged in `ownerPendingInRowsLeft` and not listed twice. There is a new top-level `briefRule`. | [OBSERVED] plan.json before: `rowsLeft` per round excluded the defer refs. Per-item defer counts match `deferCandidates` (checked by script: Σ defer = 36). |
| G8 | minor | yes (both ways) | **plan.md §5 table:** the point figure reads "131.5 with x-02's two defers taken; 133.5 without them (x-02 large by count, 16): 3×3 + 17×4.5 + 6×8; the 2 h is the owner's". Range: 93–176 with the defers, 96–180 without. Cut: 28 h (17.6 %) and 24 % on the range with the defers; 26 h (16.3 %) and 22 % without. "Where the cut comes from" now says x-02's 2 h is the owner's. **plan.json** `counts.after`: added `childHoursPointNote`, `childHoursPointWithoutX02Defers` 133.5, `childHoursRangeWithoutX02Defers` [96, 180], `cutPointHoursWithoutX02Defers` 26, `cutPointPctWithoutX02Defers` 16.3, `cutRangePctWithoutX02Defers` 22. The existing keys are unchanged. | Arithmetic: 9 + 76.5 + 48 = 133.5. Range low 9 + 51 + 36 = 96, high 18 + 102 + 60 = 180. (123 − 96)/123 = 22.0 %, (232 − 180)/232 = 22.4 %. 26/159.5 = 16.3 %. |
| G9 | minor | yes | **plan.md §3 wave 0:** "(per J419, PROGRESS.md:477; the children's own lane lines are not yet in docs/lane-events.log; only a-09 S9's spec run is, `:10117`, `:10136`)". **plan.json:** `waves["0basis"]`. | [OBSERVED] the lane log has no build/check line for a-05 s9, c-01 s2, c-03 s3, e-04 s3 or k-04 s1 after :10100 (grep). `:10117` is a09-s9-spec/design LANDED and `:10136` is a09-s9-spec/session LANDED. `docs/PROGRESS.md:477` is J419. |

All nine gaps were applied and none was rejected. One gap departs from the critic's text. In G2 the critic offered two
options, and this seat picked the owns extension, for the reasons in R12. The alternative's target round (k-04 s2) is
not in §3.

## 3. One reconciliation this seat added (no number moved)

`plan.md` §5 said "3 small" children without naming them. By §1's labels, four children are small: M1, M5, e-01 and
M3, the f-03a host. The 16.5 h merge saving in §5 only adds up if M3 is counted as medium: 3 + 3 + 4.5 + 3 + 3. M3 has
12 S rows plus L22, which is 13 rows, inside §3's 7–15 medium band (inventory :2193). §5 now names the three small
children (M1, M5, e-01), says M3 is counted medium, and says the two small-medium children (k-03, M4) are counted
medium. `plan.json` `counts.after.smallChildren` and `mediumCountedNote` carry the same. The totals 3 / 18 / 5 and
131.5 h are unchanged.

## 4. The counts, recomputed

Script-checked on the new `plan.json`: Σ open, done and defer over the 34 rounds, and the verdict tally.

- **Rounds (34 unstarted):** KEEP 24, SHRINK 3 (a-09, k-02, x-05), DROP 0, MERGE 7 (d-05a→d-05b, b-04→b-05,
  k-05→k-06, f-02a + s-02→f-03a, k-02→a-07; c-06 and f-02b fold into their builds). Unchanged.
- **Children:** 26 hardening children (5 large, 18 medium, 3 small) plus 2 build children that carry rows (c-06, f-02b).
  Unchanged. If the owner keeps x-02's two defers, x-02 counts as large: 6 large, 17 medium, 3 small.
- **Inventory rows (299 judged):** 255 open, 8 done, 36 defer-candidates. Unchanged.
- **Queue rows:** 25 open, 1 done (L30), 3 L15 parts defer-candidates.
- **All rows:** 280 open, 9 done, 39 defer.
- **Owner list:** 42 entries (39 defer-candidate rows, plus a-16 rows 5/7, §5 Q8 and the d-05a N-2 residue).
- **deferPending:** 40 refs across the rounds. That is the 39 defer-candidate rows plus the d-05a residue.
- **Child-hours (point):** 159.5 before. After: 131.5 with x-02's defers, 133.5 without.
- **Child-hours (range):** 123–232 before. After: 93–176 with x-02's defers, 96–180 without.
- **Cut:** 28 h / 17.6 % (24 % on the range) with x-02's defers; 26 h / 16.3 % (22 %) without.
- **Session rulings:** R1–R11 plus R12 (G2: M5's one-file owns extension), all vetoable (J419).
