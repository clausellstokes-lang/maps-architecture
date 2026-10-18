# Agreement check, round 4 — time and change (determinism, V06, V01, V02, V03, V04, V05, V07) after assemble-r4

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-time-r4t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (fresh start) · [x] round-3 findings re-checked against the live text (10, with each END line's second end) · [x] round-4 blocks in scope re-read (diff 96bdae26 → live) · [x] repair seats' HAND-OFFS for the members checked at their destinations · [x] peers' round-4 results read (12 seats, 53 issues) · [x] issues written · [x] result saved · [x] LANDED

## Scope and method

**Members:** determinism (base §5–§7), V06, V01, V02, V03, V04, V05 and V07. The base's §2.6, §2.7, §4.3, §4.4, §4.8, §4.11
and §13.2 are read where they carry a time-and-change subject the members share. V08, V11 and V12 are read for the ends they
carry. Every live file equals assemble-r4's sha256 "after" column: base `5f34cceb…`, V01 `a0c15b71…`, V02 `2579cb16…`,
V03 `9af5ffd5…`, V04 `6aebc1e1…`, V05 `ef99abd9…`, V06 `ef22171a…`, V07 `a55c4d08…`, V08 `4675c05e…`, V11 `47b14d9f…`,
V12 `2db3c8c9…`. The commits after it touch only logs and reports.

**Round-3 findings.** Each of my ten round-3 findings is read against adjudication-r4's Part H disposition and the ruling it
names:
- R4-07: VAT3-r3-02, VAT3-r3-10, and VAT3-r3-05 (MERGED into VAH-r3-04);
- R4-08: VAT3-r3-01;
- plain FIX: VAT3-r3-03, -04, -06, -07, -08, -09.

Each END line's second end is checked too: V08 §3.15 (2) and T-V8-51; V08 §3.6 (3) and its §3.17 row; T76-1's late-calamity
fixture; the T114 group's runs list.

**Round-4 blocks.** I took the line diff of every member against the pre-round commit `96bdae26`:
- base: 130 hunks;
- V01 29, V02 12, V03 18, V04 29, V05 22, V06 51, V07 7;
- read for the ends they carry: V08 59, V11 24, V12 31.

Every hunk on time and change was read with the whole subsection it lands in and its counterpart text in the other units:
- **the cadence and the late calamity:** §4.11 *The clock* (1), (4); `EpochInputs`; V08 §3.6 (1)–(3), (6), its §3.17 row,
  §4.6's `late` variant, T-V8-49 (g); T76-1;
- **the creation's history bound:** §2.7 `HistoryHint`, §2.9 `Recipe.history`, V08 §3.15 (2), W64, the present-week row,
  §3.16 (4); V06 §3.20.2, §3.21, T-V6-71, T-V8-51;
- **the catch-up's batch and budget:** V06 §1.1 (14), W91, §6.8 (1), (3), (6), §3.21, T-V6-24, J-V6.136; V08 §3.6 (3), §6's
  absorb-with-epochs row, T-V8-63, J-V8.137; §12.1, R12-31;
- **a rise after a fall that held a household:** V06 §3.5.1 (1), §3.6 (1), §3.21, T-V6-70 (f); base §4.11's delta demand, step
  (c), §10.2 *Under a fall*; V07 §3.12;
- **the decay level and a restoring re-cut's minted elements:** V06 §3.23 (3), `decayPeak`, §6.9, T-V6-76 (b), J-V6.139; model
  §2.6 step 7; §6.3 *Plan damage*; V03 §1b, §2.5, §3.13, §5.6 (2), (4), T-V3-39; V10 §3.9a;
- **the decay run's start week:** V02 §5.7 (6), §3.18; V03 §5.6 (4); model §2.6 step 7; V11 §3.25.10;
- **walls and raised ways over epochs (R4-09):**
  - base: §2.7's support step (3), (6); §4.3, §4.4 S5a, §4.8; §7.1's three new bend rows, §7.3's S7 row, §7.4's lock column;
    T110-2, the item-114 group, §13.8;
  - V06: §2.1 `EpochScope.raised`, W64, W68, W79, §2.8 `repairRaised`, §2.10 `walls.waited` / `walls.raisedCrossings`,
    §3.6 (4), §3.7.1, §3.7.2, §3.7.6 (5), §3.11, §3.19 lead, §3.19.2 (3)–(5), T-V6-11, T-V6-47, T-V6-73, J-V6.91, J-V6.114,
    J-V6.140;
  - other members: V04 §3.5.0, §3.10, §1b, §2.6, §4.3, T-V4-63; V05 §3.16, T-V5-14;
- **the frame growth at an epoch:** §3.2 (9), §4.11's frame batches, `RaisedFoot`;
- **the time bars:** T114-4, V12 §3.15.4, T-V12-47;
- **Find at a drawn week:** §11.2 *At a drawn week*, V01 §5.4, V04 §5.1 (7), V05 §5.6 (5), V06 §3.15.2.

**Hand-offs.** The HAND-OFFS sections of repair-r4-V06, -V07, -V01 … -V05, -determinism, -pipeline, -model and -kernel were
read, with V08's. Each time-and-change end was checked at its destination:
- **written:** V06 (7)–(8); V08's first (V06 §6.8 (1), (3) now price the catch-up at V08 §6's batch costs);
- **open, now peer findings:** V08's second (§4.11 (4) "before" → "not after"), which is VPC-R4-02; V04's frame-growth
  question, which is VV34-r4-01.

**Peers.** The twelve round-4 verifiers who landed before this seat raised 53 issues, and I read every one. Where one covers a
defect in this lane I list it under *Confirmed peer findings* and do not raise it again.

## Outcome

**1 issue: 0 blocker, 1 major, 0 minor.** Owner: pipeline (one fix with the peer's VPC-R4-02, at the same sentence; V08 and
scope ends).

**Round-3 findings.** All ten are closed at the sites their rulings name, END lines included:
- R4-07's bound: §2.7 `HistoryHint.ageYears` and `.calamities`, §2.9 `Recipe.history`, V08 §3.15 (2), W64, the present-week row
  and §3.16 (4);
- V06 §3.20.2's present-week event, with its §3.21 row and the T-V6-71 / T-V8-51 fixtures;
- R4-08's late calamity at §4.11 (4), V08 §3.6 (3), its §3.17 row and T76-1;
- T114-4 and V12's `T114g.oldestFirst` by week, T-V12-47's planted fault and the script comment;
- the decay run's start week in V02, V03, model §2.6 step 7 and V11.

**New this round:**
- **VAT4-r4-01 (major):** the case R4-08 does not reach. This is an absorb in the last epoch's own week (`W₁` = `W₀`), a
  second sync before the dossier's clock moves. The base's rule gives an impossible epoch at `W₀`. V08's repair gives no epoch
  at all, so a calamity recorded in the week of the last sync never strikes and its deaths never reach the burial need, which
  is the loss R4-08 exists to prevent. The same absorb's population move reads two ways. VPC-R4-02 asks the base to adopt V08's
  reading, so the adjudicator rules both together.

**What agrees** after round 4:
- the cadence and the late calamity for an absorb whose week passes `W₀`;
- the creation's history bound and the present-week event;
- the catch-up's batch, with its numbers equal in V06 and V08 (`b` 150 / 500 ms, `a` 3 / 3.5 ms; one epoch ≈ 5.8 s ≤ 6 310 ms;
  V08's worst fixture 6 090 ms);
- a rise after a held fall;
- the decay level with a restoring re-cut's minted elements;
- the held raised way at every epoch op;
- `EpochScope.raised` and its readers;
- the patch order by week;
- Find at a drawn week.

## Round-3 findings — verdicts

| id | owner | ruling (adjudication-r4 Part H) | verdict | where (live) |
|---|---|---|---|---|
| VAT3-r3-01 | pipeline | FIX per R4-08 | **FIXED** (its `W₁` = `W₀` residue is VPC-R4-02 and VAT4-r4-01) | §4.11 *The clock* (4) l.8441-8452 (R4-08's text, the trigger "dated after the last epoch's week"); V08 §3.6 (3) l.1859-1864, l.1876 (END); §3.17 row l.2674 (END); T-V8-49 (g) l.3279; T76-1 l.18169-18175 "a calamity carried one year late, riding the absorb's first epoch, its event at that epoch's first week" (VPC-R3-01's END) |
| VAT3-r3-02 | model | FIX per R4-07 | **FIXED** | §2.7 l.2449 (the hint's head), l.2450 `ageYears`, l.2458 `calamities` "up to and including the present at creation (§4.11 *The clock* (1)) — every calamity the creation carries"; §2.9 l.3102; V08 §3.15 (2) l.2343 (END); T-V8-51 l.3281 (END: "a dossier whose latest stamped tick is a calamity's … in the last replay epoch, at the present") |
| VAT3-r3-03 | scope | FIX | **FIXED** | T114-4 l.18472-18475 "by the week of each run's last-change epoch (`EpochRecord.inputs.week` of its `conditionEpoch`; … every replay epoch's week before every live one's …), never the epoch's number"; the runs list l.18492 "T114-4's replay case on its history-first fixture (T-V6-73)" |
| VAT3-r3-04 | V12 | FIX | **FIXED** | V12 §3.15.4 l.2511-2514; T-V12-47 l.3160 "one that replaces a live-era patch before a replay-era one"; `patchesOldestFirst`'s comment l.657 |
| VAT3-r3-05 | V08 | MERGED into VAH-r3-04 (FIX per R4-07) | **FIXED** | W64 l.291, the present-week row l.675 and §3.16 (4) l.2445 read "the present at creation (§4.11 *The clock* (1))"; no other "creation week" in V08 |
| VAT3-r3-06 | V02 | FIX | **FIXED** | V02 §5.7 (6) l.3117-3118 and the §3.18 row l.2550 "from the week its change shows (V06 §3.23 (1): the hazard's week, a `vacate`'s `decay` Works' start)" |
| VAT3-r3-07 | V03 | FIX | **FIXED** | V03 §5.6 (4) l.2741 |
| VAT3-r3-08 | model | FIX | **FIXED** | §2.6 step 7 l.2102-2104 "from the week its change shows in that replay epoch (V06 §3.23 (4): the epoch's week where it starts no Works)" |
| VAT3-r3-09 | V11 | FIX | **FIXED** | V11 §3.25.10's `settings` l.4625-4626 |
| VAT3-r3-10 | V06 | FIX per R4-07 | **FIXED** | V06 §3.20.2 l.3134-3135 "an event or a calamity at the present (0 years ago) in the last epoch, at `W_p`"; §3.21's replay row l.3297; T-V6-71 l.4179 |

R4-07's sweep was checked as well. Every "creation week" left in the set means the `generate` event's week:
- base l.5295, 8323, 8417-8420, 8759, 8833, J-A67.47;
- V06 l.410, 468, 957, 2301, 2349, 2383, 3292, 3453, 3721;
- V10 l.1711.

V06 l.2039, l.2049 and l.3272 are a `MutationPlan`'s, so qualified.

## Issues

### VAT4-r4-01 — MAJOR EDGE-UNDEFINED (owner: pipeline; one fix with VPC-R4-02)

**Where.**
- §4.11 *The clock* (4) l.8446-8452 (R4-08's text);
- V08 §3.6 (3) l.1857-1864, its §3.17 row l.2674, §4.6's `late` variant l.2933, T-V8-49 (g) l.3279;
- `EpochInputs.events[].week` l.8325;
- T76-1 l.18174-18175.

**What the set says.**
- **The base.** R4-08 sends a calamity dated at or before the last epoch's week `W₀` to "the first epoch folded by the absorb
  that carries it (… with none, the port folds one at the absorb's week for it), its `EpochInputs.events` entry at that epoch's
  first week (the last epoch's week + 1)". Only "with the absorb's week itself before the last epoch's" does it fold no epoch.
- **At `W₁` = `W₀` the base has no possible outcome.** "One at the absorb's week" is an epoch at `W₀` on top of the last one,
  with `years` 0. Its event at `W₀` + 1 lies outside that epoch's `(W₀, W₀]`.
- **V08's repair.** It wrote the degenerate branch as "with `W₁` not after `W₀` (a clock turned back, or no week past the last
  epoch's)": no epoch, "its dated changes applied finished, noted by `unreceipted_change`'s `late` variant". The `late`
  variant's message reads "{name} is dated before the map's last update". VPC-R4-02 (peer) asks the base to read V08's way.

**Why it matters.**
- **The case is an ordinary path.** `W₁` = `W₀` is any second absorb in the week of the last epoch, not a clock turned back. It
  follows whenever the previous sync's epoch fell at the dossier's present week. That is the case for a calamity epoch at its
  own week (the cadence's third trigger), a year end, or a crossing "with none, at `W₁`".
- **An example.** A DM records a fire at week P and the map syncs: an epoch at P, so `W₀` = P. In the same week the DM records
  a second calamity. It is dated `W₀`, so it is carried late, and `W₁` = P = `W₀`.
- **What is lost.** Under V08, and under the base once VPC-R4-02 is applied as written, that calamity folds no epoch now or at
  any later absorb, because it is no longer "newly carried". So:
  - its hazard never strikes (DR28's "a destructive event is epoch content"; V06 §3.11);
  - its deaths never reach the burial need (`CalamityRef.deaths`, V06 §3.18.2's catacomb growth).

  That is the loss R4-08 was written to prevent ("so its hazard strikes and its deaths reach the burial need"). It also misses
  the path R4-08 cites from item 122 (a): "the calamity and the population change into the next epoch, V06's hazard phase".
- **The result depends on how the syncs were batched.** Had the DM recorded both calamities before one sync, both would strike.
- **The same absorb's population move is undefined.** V08 §3.6 (3) folds a crossing epoch "at the first week the population
  leaves the last epoch's `populationTarget` ± 5 % (read from `populationHistory`; with none, at `W₁` when the new population is
  outside it)" and says "every crossing inside the span adds its own epoch". At `W₁` = `W₀` there are two readings:
  - an epoch at `W₀` with `years` 0 — VPC-R4-02's own scenario reads it so ("a population move folds one at `W₁`"), and a late
    calamity riding it then has an impossible event at `W₀` + 1;
  - none, because the span `(W₀, W₀]` is empty.

  V08's degenerate row names only `W₁ < W₀`.
- **The grade.** Two builders, two behaviours, and the defined one loses a calamity on a reachable path.

**Required change.**
- **§4.11 *The clock* (4).** Replace "with the absorb's week itself before the last epoch's (V08 §3.6's degenerate row) it
  folds no epoch and its dated changes apply finished, noted" with:

  > an absorb whose week is the last epoch's own (`W₁` = `W₀`: a second absorb before the dossier's clock moves) folds no
  > epoch — a population move it carries crosses at the next absorb whose week passes `W₀`, and a calamity it newly carries
  > applies its F5 targets' dossier events now as element events (finished, no Works) and rides, with its `EpochInputs.events`
  > entry and its deaths, the first epoch a later absorb folds, at that epoch's first week, held meanwhile in the binding
  > (`DossierBinding.lateCalamities`, V08 §2.3); only with the absorb's week before the last epoch's (a clock turned back;
  > V08 §3.17's row for V08 §3.6) do its dated changes apply finished, noted (`unreceipted_change`'s `late` variant, V08 §4.6)

- **END under V08.**
  1. §3.6 (3): "(with `W₁` not after `W₀`, V08 §3.17's degenerate row)" → "(with `W₁` = `W₀`, held in
     `DossierBinding.lateCalamities` for the first epoch a later absorb folds; with `W₁` before `W₀`, V08 §3.17's degenerate
     row)". Its crossing clause adds "— none when `W₁` = `W₀`, the crossing then read at the next absorb whose week passes
     `W₀`".
  2. §2.3's `DossierBinding` gains `lateCalamities: CalamityRef[]`, with its §2.6 lifecycle row:
     - written by the ledger event of an absorb at `W₁` = `W₀` that newly carries a calamity;
     - read and emptied by the next absorb that folds an epoch, each entry at that epoch's first week;
     - persisted with the binding; no undo (an absorb is no undo target); absent in an older document, `[]`.
  3. §3.17's row splits its "with `W₁` not after `W₀`" clause the same way.
  4. The `late` variant's row (l.2933): "by an absorb whose week is not after it" → "by an absorb whose week is before it".
  5. T-V8-49 (g) adds: "a second absorb in the last epoch's own week carrying a calamity dated that week and a population move
     past the tolerance — no epoch, the calamity's targets applied; then the next absorb past `W₀` folding the crossing and the
     calamity's strike at its first epoch's first week, its deaths in that epoch's burial need".
- **END under scope.** T76-1's late-calamity fixture adds "and one carried by a second absorb in the last epoch's own week,
  held to the next absorb's first epoch".
- **If the adjudicator rules the loss acceptable instead,** VPC-R4-02's text applies as written. In that case V08 §3.17's row
  must still name the population move at `W₁` = `W₀` (no epoch), and the `late` variant's wording must fit a same-week change.

## Confirmed peer findings (not raised again; confirmed in the live text)

* **The late calamity at `W₁` = `W₀`:** VPC-R4-02 (pipeline). The base's "before" disagrees with V08's "not after", and the
  base's "V08 §3.6's degenerate row" names a row that sits in V08 §3.17. This is V08's open hand-off (repair-r4-V08, note 5).
  VAT4-r4-01 is its second half.
* **A late non-calamity change with `W₁` after `W₀`:** VV78-r4-04 (V08). No week is given, so the current week can fall back
  before the last epoch.
* **The frame growth's deck extension at an epoch:** VV34-r4-01 (model). Do the old deck's stations stay, against V04 §3.5.0's
  "an epoch op removes no obstacle"? This is V04's open hand-off. Also VKr4-01 (kernel): the frame grows and the arena is kept
  at a change of law.
* **Raised ways over epochs:** VDC4-05 (pipeline) — §4.11's `wallToWay` removes the tower that carries a standing deck, against
  V06 §3.7.6 (5). VDC4-04 (determinism) covers a `delete` of the held stretch; VM-R4T-05 (model) covers "none drops it".
* **The decay level:** VDC4-01 (determinism) — §6.3's comparison "exactly while" against R4-03's minted elements.
* **The catch-up:**
  * VV56-r4-01 (V09's trigger wording);
  * VV56-r4-03 (V06 §6.8 (6)'s "than T-V6-24's fixtures carry", against its fourth fixture);
  * VV78-r4-05 (V08 §6's batch row: the epoch's own week, the per-event rungs, "one of T-V6-24's fixtures").

## Checked and agreeing

* **The cadence (for `W₁` after `W₀`).** §4.11 *The clock* (4) l.8437-8452 agrees with the others:
  - the three triggers, the calamity's "dated after the last epoch's week", the coarse catch-up, and R4-08's late rule;
  - `EpochInputs` l.8322-8327, whose late event at `W₀` + 1 lies in `(W₀, W_e]`;
  - V06 §3.3.1 l.1076-1079 (a citation only);
  - V08 §3.6 (3) l.1855-1880 and (6) l.1922-1928;
  - T76-1 and T-V8-49 (g).
* **The creation's history.**
  - The present at creation bounds `HistoryHint` (l.2449-2458), `Recipe.history` (l.3102) and V08 §3.15 (2) (l.2343)
    inclusively.
  - A calamity whose tick set the present lies in the last replay epoch at `W_p` (V06 §3.20.2, §3.21, T-V6-71, T-V8-51).
  - The hazards phase (V06 §3.2 step 2) precedes the `dossier` step (step 12), so in that last epoch the strike precedes the
    present facts, and T-V6-71's "every dossier fact match exactly" holds.
* **The catch-up's batch and budget.**
  - V06 §6.8 (1) prices the catch-up from V08 §6's absorb-with-epochs row (`b` per epoch folded, 150 / 500 ms; `a` per event,
    3 / 3.5 ms). That row (l.3196), T-V8-63 and J-V8.137 give the same numbers.
  - Both units do the same arithmetic:
    - V06 §6.8 (3), one epoch at the cap: 1 310 + 3 × 260 + 18 × 60 + 6 + 0.06 × 35 000 ≈ 5.3 s, plus `b` 500 ≈ 5.8 s ≤ 6 310 ms
      (9 000 − 400 − 2 290);
    - V08's worst fixture: 1 310 + 780 + 500 + 3 500 = 6 090 ms.
  - The over-budget branch reads "even one epoch over the span with its events' term" at V06 §1.1 (14), W91, §3.21, §6.8 (6),
    T-V6-24 and J-V6.136, and at V08 §3.6 (3). §12.1 and R12-31 agree that a path is changed first and a wait is never a
    declared miss.
* **A rise after a held fall.**
  - V06 §3.5.1 (1) l.1230-1237: the town's held set, and the suffix back first.
  - V06 §3.6 (1) l.1388 and base §4.11's delta demand l.7963 read the same set.
  - §10.2 *Under a fall* l.15424: "a later rise reoccupies the same suffix first".
  - Also agreeing: §4.11 step (c) l.8125-8130, V06 §3.21's decline row l.3280, T-V6-70 (f) l.4178, and V07 §3.12 l.2545-2549
    (the deserted village's later rise by the regrowth-first order).
* **The decay level and a restoring re-cut's minted elements.** V06 §3.23 (3) l.3437-3444 and `decayPeak` l.3408 ("0 for a week
  before `since`") agree with:
  - model §2.6 step 7 l.2100-2101;
  - V03 §1b l.303, §2.5 l.926, §3.13 l.2094, §5.6 (2) (a)–(b) l.2693-2706, T-V3-39 (c);
  - V10 §3.9a l.1856;
  - V06 §6.9's memo and T-V6-76 (b).

  The decay run's start week reads "the week its change shows" in model §2.6 step 7, V02 §5.7 (6), V03 §5.6 (4) and V11
  §3.25.10. §4.11 l.8801 is the decay Works' start for an undated event.
* **Walls and raised ways over epochs (R4-09).** §2.7's support step (3) l.2550-2569 and (6) (b) l.2595-2613 agree with:
  - **V06:**
    - §3.7.1 l.1461-1463, §3.7.2 l.1483-1492 ("from the first epoch after … both sides … fallen"), §3.7.6 (5) l.1594-1612;
    - §3.11 l.2142-2145, the quake's breach passing over a station's stretch and `topple` never taking one;
    - §3.19's lead l.2735-2741, §3.19.2 (3)–(5) l.2921-2943, §2.8's `repairRaised` l.726, §2.10 l.755-756, §3.6 (4)
      l.1433-1436;
    - W64, W68, W79;
    - T-V6-11, T-V6-47, T-V6-73 and J-V6.91, J-V6.114, J-V6.140;
  - **base:** §4.3 l.5623-5634, §4.4 S5a l.5876-5882, S5c l.5931-5935, §4.8 l.7590-7650, §7.1's `bend.wall.held`,
    `bend.wall.raisedCrossing` and `bend.raised.underSpan` l.10592-10594, §7.3's S7 row l.10845, §7.4's lock column l.11365,
    T110-2 (4)–(5) l.18414-18421, the item-114 group l.18465-18494 and §13.8 l.19248-19262;
  - **V05:** §3.16 l.1342, l.1352 and T-V5-14's raised-gate clause l.2556-2562.
* **`EpochScope.raised`.** The field and W64 (V06 l.465, l.347) read "every raised way whose `feet`, `supports` or `spans` an
  epoch op, a landfall, a trace's crossing station or the frame growth changed". Its readers agree: V04 §3.5.0 l.1340-1343,
  §3.10 l.2282-2290, §1b.2 l.328, §2.6 l.867, §4.3 l.2579, T-V4-63; V05 l.1293, l.1347; V01 l.303. Narrowing the field from
  "neglected" leaves no reader without its input, because a mark of disuse changes no pier, vault or caster.
* **The patch order.** Generation's epoch 0, then every replay epoch, then the live epochs, each by `EpochRecord.inputs.week`.
  This holds in V06 §3.7.7 (3) l.1649, §3.21 and T-V6-73, T114-4 and V12 §3.15.4, l.657 and T-V12-47.
* **Find at a drawn week.** §11.2 *At a drawn week* l.16455-16463 and V06 §3.15.2 `locate(w)` l.2348-2351 agree with:
  - V01 §3.16 l.2315-2318, §5.4 l.3140-3240;
  - V04 §5.1 (7) l.2750, UE32;
  - V05 §5.6 (5) l.2336, l.1795;
  - W92 `frontierFor` (V06 l.375, l.3342).

  Each reads the frame `locate(w)` gives, and the head after the last epoch's week.
* **Owner items.**
  - Item 126 (a2): no phone, narrow-class or bottom-sheet clause in determinism (§5–§7) or V01–V07.
  - Item 125: the dossier is the only data input, its week taken from its stamped ticks (V08's present-week row; §4.11 (1)).
  - g items 114–119 and their canon routings: unchanged by this round's time hunks.

## Not run

`docs/validation/bench/doc_checks.py` was not run. This seat writes no design text, and the reference corpus is incomplete in
this checkout, so any clean-room result here would be provisional.
