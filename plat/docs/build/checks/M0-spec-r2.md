# Check r2 — the M0 build spec after its second fix round (lane build/m0-check-r2, 2026-10-03)

**Verdict: FIX.** Checker seat: build/m0-check-r2 (Opus, on the owner's Mac), ledger row L-0012; independent of the
spec's writers (build/m0-spec, -fix1, -fix2) and the scaffold's (build/m0-scaffold, -fix1, -fix2). Read whole:
`M0.md`, `M0-work.json` (67 items, flattened by script and re-validated by this seat's own validator), `choices.md`
(C-0001 – C-0096), `open-design-findings.md`, `CLEAN-ROOM.md`, `checks/*-r1.md`; `docs/ARCHITECTURE.md` §16 (every
milestone row), §17 whole, §13's head, §13.1's bar, ladder-coverage and fixture paragraphs, §13.2's head through B-EDGE
and T34-1 – T41-1, §13.5's rows, §13.8 whole, §12.1, §12.4, §6.2's bars, §6.5 (3) – (5), §3.4's op list (scripted
census), §3.7's confirmation and miss rule, §3.8's confirmation, §4.13 whole.

## What holds (CONFIRMED by script or reading)

All 14 r1 findings are answered as §9 says (T34-1's commit clause at M0-b-03, R12-4 reported, M0-x-05, C-0086's
fields, the water gate, the tier nesting, `resolveVertexAt`, the matching pairs, the summaries' quantiles, C-0092,
C-0093, C-0094, the hand-overs, the stale ids). Every §16 M0 (a) – (f) clause and §13.8's M0 (b) row has an item; every
§3.4 operation name appears in the spec; every `dependsOn` lands in an earlier wave except the AFTER-M-1 (b) items'
stated order; every `owns` prefix overlap is a declared hand-over; bar counts 67 here / 22 timing-phase / 9 after-M-1
match the header; every after-M-1 item names its rows and digest entries; all 12 open design findings are decided; no
cloud-container clause survives without its Mac row (C-0001/19/22/23/24 superseded by C-0025 – C-0029, C-0051).

## Findings

1. **B-EDGE unscheduled** (CONFIRMED: "B-EDGE", "§5.1 (9)" and "failure class" occur nowhere in the spec). §13.8
   schedules B-EDGE at "the milestone that lands each row's mechanism"; M0 lands EP-01 (every stage's degenerate
   geometry), EP-04 (S5b / S5c), EP-05 (S5d), EP-06 (S6), EP-16 (the stop test at g = 1), the M0 parts of EP-20 / EP-23,
   and the frame-column cells for river, bridge and wall. §13.1's ladder coverage also needs, per stage failure class,
   one zero-length, zero-area, self-touching, collinear and coincident input — no item holds them.
2. **M0-k-02 judged before the kernel exists** (CONFIRMED). Wave 7, depending on a-01, k-01, m-01 only, its test and
   bar say "every M0 case runs against the kernel … green"; splitFace (w8), booleans / buffers (w8), warp (w8), kerb /
   tileRings (w9), the invariant suite (w9) and the arena block (w10) land later.
3. **M0-k-06 could be built now** (CONFIRMED by its tests): its scanner, salted digests, list sets, allow file and
   every test run on a synthetic deny-list; only the run over M-1's `denylist.json` needs M-1. No row says why the
   build waits. The same holds for M0-b-05b's `ng-faces.json` loader and refusal tests.
4. **AFTER-M-1 items may overlap the timing phase and the seat cap** (CONFIRMED). The wave rule starts them "on M-1's
   commits, whenever they fall"; M0-k-06 depends on no item past wave 12, so it can run during T or T2 (which must be
   alone) or as a fifth seat.
5. **The contention detector ignores M-1's lane on this machine** (CONFIRMED by reading C-0047 / M0-f-01). It counts
   only processes "of the build"; §12.1 requires no other suite, generation or browser running, and J157 runs M-1's
   captures and measurements here. Nothing makes T / T2 wait for M-1's lane.
6. **Whole-tier timing on the fanless host** (PLAUSIBLE). C-0088 times each tier (15 min – 3 h) as one run with
   calibrate before and after within 5 %, "else the run repeats"; §12.1's ≤ 60 s batches exist because the host is
   fanless, so sustained load will throttle and the repeat loop has no bound.
7. **§3.7's two miss paths undecided** (CONFIRMED). §3.7 (ii) sends the S9-band and S11-share misses to Clipper2 as the
   only engine; its per-loop rule sends misses to the accelerator or an amendment. M0.md §1 (a) applies the per-loop rule
   to every kernel timing bar; `timingBars` gives corridorUnion Clipper2 and S11 "§3.7's rule". No row decides.
8. **`ladderCoverage()` exported twice** (CONFIRMED by simulation in scratch: TS2308 under typescript 6.0.3). M0-k-04
   (`testkit/src/invariants/`) and M0-x-05 (`testkit/src/ladders/`) both export it, and both folders are `export *`'d
   from testkit's index; "extended later by M0-x-05" otherwise means editing M0-k-04's file.
9. **The check protocol cannot attribute a diff** (CONFIRMED by `git status`). `plat/packages/`, `bench/`, `tools/` are
   untracked, so `git diff --stat` shows nothing; seats commit nothing and share one tree, so it cannot separate four
   seats; every item's `choices.md` / `CLEAN-ROOM.md` appends fall outside its `owns` with no exemption and no id rule
   for parallel appends; the probe file and M0-d-07's probe test write into another item's `src/num/` while other seats
   lint (PLAUSIBLE race).
10. **The synthetic per-plot S11 workload has no builder** (CONFIRMED by script): only M0-t-01 "runs" it and M0-a-08's
    bar names it; untested code would be written in the idle T wave.
11. **T34-1's 10 000-face mean owned twice** (CONFIRMED): exit bars of both M0-b-02 and M0-b-04; M0.md §1 (b) and §5
    item 43 say M0-b-04, §2.1 says M0-b-02.
12. **`tier:pr` / `tier:nightly` end-to-end runs listed as tests** (PLAUSIBLE): as vitest tests they re-enter vitest
    through the PR tier — the defect C-0095 / C-0096 removed from the scaffold.
13. **Stale text** (CONFIRMED): M0.md §4 marks the second scaffold round "not yet run" and lists ledger rows to L-0010;
    §2's wave-0 row and §2.1 speak of it in the future; §7 lacks L-0011's receipts.

**CONFIRMED vs PLAUSIBLE.** Findings 1 – 5, 7 – 11 and 13 are CONFIRMED (script, git status, a scratch compile, or
quoted text); 6 and 12 are PLAUSIBLE readings.
