# Agreement check, round 3 — time and change (determinism, V06, V01, V02, V03, V04, V05, V07) after assemble-r3

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-time-r3t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (fresh start) · [x] round-2 findings re-checked against the live text (9) · [x] round-3 blocks in scope re-read (diff 920d280d → live) · [x] repair seats' HAND-OFFS for the members checked at their destinations · [x] peers' round-3 results read (88 issues) · [x] issues written · [x] result saved · [x] LANDED

## Scope and method

**Members:** determinism (base §5–§7), V06, V01, V02, V03, V04, V05 and V07, read in the live files after assemble-r3. Each live
file equals assemble-r3's sha256 "after" column (base `593c657d…`, V01 `8260b2a8…`, V02 `4696951c…`, V03 `f4458cf4…`, V04
`0e3bcacd…`, V05 `cc1dfa61…`, V06 `8f92dd38…`, V07 `285e2f6f…`, V11 `1671da41…`); the commits after it touch only logs and
reports.

**Round-2 findings.** Each of my nine round-2 findings is read against adjudication-r3's Part H disposition and the ruling it
names: R3-17 (VAT2-r2-01, -02 amended), R3-18 (VAT2-r2-03, -04), R3-06 (b)–(c) (VAT2-r2-05, -06), R3-19 (VAT2-r2-07 amended),
plain FIX (VAT2-r2-08), R3-10 (VAT2-r2-09), with each END line's second end (model §2.6 step 7, V11 §3.25.10, V02 §5.7 (1),
V03 §5.6 (4)).

**Round-3 blocks.** The line diff of every member against the pre-round commit `920d280d` (base 135 hunks; V01 20, V02 25, V03
20, V04 22, V05 4, V06 56, V07 11; V08 57 and V11 34 read for the ends they carry). Every hunk on time and change was read with
the whole subsection it lands in and its counterpart text in the other units: the cadence and the clock (§4.11 *The clock*
(1), (4); V06 §3.3.1; V08 §3.6), the creation week and the present at creation (every use in the set), the catch-up's
budget and its over-budget branch (V06 §6.8, §3.21, W91, J-V6.136; V08 §3.6 (3), §6), decline under locks (V06 §3.5.1, §2.10,
§3.21, §4.3; V07 §3.12, T-V7-16, J-V7.2; base §4.11 step (c), §7.7's precedence), the decay run, its level and peak (V06
§3.23; model §2.6 step 7, §2.8; V02 §5.7; V03 §5.6; V04 §5.6; V11 §3.25.10), the replay's ruins and the creation prefix (V06
§3.20.2 – §3.20.4), the crisis hand-over in time (V06 §3.22; §8.2; §10.2 (f); V01 §3.16; V02 §5.7 (6); V03 §5.6 (4)), walls
and raised ways over epochs (§2.7's support step (3), (6); V06 §3.7.1, §3.7.6 (5), §3.7.7 (2)–(3); T110-2; the item-114
group), the frame growth at an epoch (§3.2 (9); §4.11 *The rung at an epoch*), and the time bars (§13.2's T76-1, T114-4,
T123-4; V12 §3.15.4).

**Hand-offs.** The HAND-OFFS sections of repair-r3-V06, -V07, -V01 … -V05, -determinism, -pipeline and -kernel were read and
each time-and-change end checked at its destination (V06's (a)–(d): V04 §5.6 (3) and V02's X36 written; V08 §6's and V10's
ends are peers' findings).

**Peers.** The twelve round-3 verifiers who landed before this seat raised 88 issues; I read every one. Where one covers a
defect in this lane I list it under *Confirmed peer findings* and do not raise it again.

## Outcome

**10 issues: 0 blocker, 5 major, 5 minor.**
- **Owners:** model 2, pipeline 1, scope 1, V06 1, V12 1, V08 1, V02 1, V03 1, V11 1.
- **By kind:** 6 DISAGREE (2 major; 4 minor, the restated decay-run start week), 3 EDGE-UNDEFINED (major), 1 TERM (minor).

**Round-2 findings.** All nine are closed at the sites their rulings name, including both blockers (the cadence's calamity week
at its home; the creation week and the present at creation as two values, so the first replay epoch's span is positive). The
residue of R3-18's "one name each, everywhere" at `HistoryHint.calamities` and V08 §3.15 (2) is the peers' VM-R3T-02 /
VPC-R3-05; this seat adds V08's two remaining uses (VAT3-r3-05) and the bound's endpoint (VAT3-r3-02).

**New this round:**
- **VAT3-r3-01 (major):** R3-17's trigger — "an epoch at the week of each newly carried calamity" — has no outcome for a
  calamity dated at or before the last epoch's week `W₀`: an epoch there precedes one already folded, and `EpochInputs.events`
  holds only weeks in (the previous epoch's week, week].
- **VAT3-r3-02 (major):** the creation's history and the epoch path leave a gap at the present: a calamity whose tick is the
  present at creation (a tick that can itself set the present week) falls outside "before …" and is never newly carried later.
  The peers' two fixes word the bound differently ("before" against "up to").
- **VAT3-r3-03, VAT3-r3-04 (major):** T114-4 and V12's `T114g.oldestFirst` order patches "by each run's epoch of last change".
  §6.1 and V06 §3.7.7 (3) order them by that epoch's week, and a replay epoch's number `0x8000_0000 + r` sorts after every live
  epoch's.
- **VAT3-r3-10 (major):** V06 §3.20.2 maps an event to "the epoch whose span `(toYearsAgo, fromYearsAgo]` holds its years
  ago". No span holds 0 years ago, so an event or calamity at the present week rides no replay epoch.
- **Minors:** "from that epoch's week" in V02 and V03 (VAT3-r3-06, -07); "from that replay epoch's week" in model §2.6 step 7
  and V11 (VAT3-r3-08, -09). Each restates the decay run's start against V06 §3.23 (1), (4), where every reader calls V06's
  function. V08's W64 and present-week rows name "the creation week" for the present at creation (VAT3-r3-05).

**What agrees** after round 3:
- the cadence's three triggers at their home and V06's citation of it;
- the creation week and the present at creation in §4.11 (1), EP-15, V06 l.410, §2.11, §3.1 (3), §3.15.2 / §3.15.4 and
  §3.20.3;
- the dossier and standalone falls under locks: §4.11 step (c), §7.7's precedence, V06 §3.5.1 (1), (4), (5), §2.10, §3.21 and
  §4.3, V07 §3.12, T-V7-16 and J-V7.2;
- the decay run, its default age that ages, the per-element peak's entry weeks and the M6-E landing: V06 §3.23, model §2.6
  step 7, §2.8, V02 §5.7, V03 §5.6, V04 §5.6, V11 §3.25.10;
- the preview that never hands over;
- the catch-up's estimate and budgets: V06 §6.8 (1)–(6) against §12.5's T(B) and V08 §6's rows — 9 000 − 400 − 2 290 = 6 310 ms;
- the band held under a crossing station: §2.7 (3) = V06 §3.7.7 (2) = the item-114 group;
- the patch order inside V06: §3.7.7 (3), §3.21 and T-V6-73 by `EpochRecord.inputs.week`.

## Round-2 findings — verdicts

| id | owner | ruling (adjudication-r3 Part H) | verdict | where (live) |
|---|---|---|---|---|
| VAT2-r2-01 | pipeline | FIX per R3-17 (graded MAJOR) | **FIXED** | §4.11 *The clock* (4) l.8352-8361: "and at the week of each newly carried calamity that no other epoch falls on (DR28: a destructive event is epoch content; V08 §3.6 (3); J-V8.55)", the catch-up clause "a calamity then riding the coarse epoch that holds its week"; its edge is VAT3-r3-01, its bar VPC-R3-01 |
| VAT2-r2-02 | V06 | FIX, amended per R3-17 | **FIXED** | V06 §3.3.1 l.1075-1077 cites "§4.11 *The clock* (4)'s cadence" and lists no trigger — R3-17's text whole |
| VAT2-r2-03 | pipeline | FIX per R3-18 (BLOCKER kept) | **FIXED at its named sites** | §4.11 *The clock* (1) l.8330-8334 (the present at creation; the creation week, the `generate` event's, the replay's start on a history-first document; the first epoch's `years` and V06's `prevWeek` read it); EP-15 l.8862 "a week-0 present". The first replay epoch's `years` is now start.yearsAgo − toYearsAgo₁ > 0. Residue elsewhere: VM-R3T-02 / VPC-R3-05 (peers), VAT3-r3-05 |
| VAT2-r2-04 | V06 | FIX per R3-18 | **FIXED** | V06 l.410-411 ("between the creation week and the present"); §3.20.3 l.3135-3139 (`W_p` the present at creation; the `generate` event's week the creation week, `HistoryIndex.creationWeek`, read by the first replay epoch's `prevWeek` and `years`) |
| VAT2-r2-05 | V06 | FIX per R3-06 (b) | **FIXED** | V06 §3.23 (4) l.3423-3427; §3.21's decay row l.3274 and combination row l.3304; T-V6-76 (d); model §2.6 step 7 l.2099-2102; V11 §3.25.10 `settings` l.4616-4619 (the start week those two restate is VAT3-r3-08 / -09) |
| VAT2-r2-06 | V06 | FIX per R3-06 (c) | **FIXED** | V06 §3.23 (4) l.3418-3423 (`A` = the week first met so − 52 × `D`, the creation week for a building generated so, aging by (2)); §3.21 l.3274 and T-V6-76 (d) ("`D` + 50 years, non-decreasing"); V11 l.808, l.4616 |
| VAT2-r2-07 | V07 | FIX, amended per R3-19 | **FIXED** | V07 §3.12 l.2544-2548 (R3-19's text whole, the dossier and other falls told apart); T-V7-16 l.3621; J-V7.2 l.3800; agrees with V06 §3.5.1 (1), (4), (5) l.1220-1250, §3.21 l.3254, l.3300 and base §4.11 step (c) l.8041-8045 |
| VAT2-r2-08 | V06 | FIX | **FIXED** | V06 l.1637, l.3302, T-V6-73 l.4140 read `EpochRecord.inputs.week`; no `EpochRecord.week` left in the set |
| VAT2-r2-09 | V06 | FIX per R3-10 (graded MAJOR) | **FIXED** | V06 §3.22's signature l.3317 (`overlay: Id \| null`), (3) l.3364-3366, §2.12 l.872, §3.21 row l.3273, T-V6-75 (d); V02 §5.7 (1) l.3043, §3.18 l.2523; V03 §5.6 (4) l.2726, §3.13 l.2095, T-V3-40 (b); X36 l.4176 |

## Issues

### VAT3-r3-01 — MAJOR EDGE-UNDEFINED (owner: pipeline)

**Claim.** R3-17 put a third trigger in the cadence's home, and it has an input with no defined outcome.
- **The rule.** §4.11 *The clock* (4) l.8352-8356 folds "an `epoch` at each 52-week boundary crossed … and at the week of each
  newly carried calamity that no other epoch falls on". V08 §3.6 (3) l.1838-1847 takes the span "From the last epoch's week
  `W₀` … to the absorb's week `W₁`". Its year ends are bounded "in `(W₀, W₁]`", but its calamity clause carries no bound.
- **The case.** A calamity newly carried at an absorb but dated at or before `W₀` — a backdated record, or a host whose clock
  turned back and then forward again — has no defined outcome. An epoch "at its week" would follow, in the log, an epoch
  already folded at a later week. Its `years` (§4.11 l.8237) would be zero or negative. Its event would break
  `EpochInputs.events[].week` "in (the previous epoch's week, week]" (l.8239), and §6.1 orders epochs by week. No epoch of the
  absorb holds its week either.
- **What the set says.** V08's edge row (l.2645) defines only the whole absorb before the last epoch (`W₁ < W₀`: "makes no
  epoch and folds its dated changes after the last epoch, applied finished"). V01 §3.16 (2) l.2336-2338 assumes such a
  calamity exists: "a calamity carried with no event (one dated at or before the last absorbed week)".

One builder folds an epoch out of week order with a non-positive span. Another drops the calamity from the epoch path, so DR28's
strike and V06 §3.22 (1)'s aftermath — the burned quarter, the deaths into the burial need — never reach the model. A third
attaches it to the absorb's first epoch.

**Required change.**
- §4.11 *The clock* (4): after "… that no other epoch falls on (DR28: a destructive event is epoch content; V08 §3.6 (3);
  J-V8.55)" add: "— a newly carried calamity dated at or before the last epoch's week folds no epoch at its own week. It rides
  the first epoch the absorb folds; with none, the port folds one at the absorb's week for it. Its `EpochInputs.events` entry
  takes that epoch's first week (the last epoch's week + 1), its own tick kept in its receipt, so its hazard strikes and its
  deaths reach the burial need. With the absorb's week itself before the last epoch's (V08 §3.6's degenerate row), it folds no
  epoch and its dated changes apply finished, noted".
- V08 §3.6 (3)'s calamity clause and its edge row (l.2645) cite that sentence; the row names the case among its degenerate
  inputs.
- T76-1's cadence clause (the peers' VPC-R3-01) adds a fixture of a calamity carried one year late.

### VAT3-r3-02 — MAJOR EDGE-UNDEFINED (owner: model)

**Claim.** The bound that splits the dossier's calamities between the creation's history and the epoch path leaves out the
present week.
- **Where the present comes from.** The present at creation is the dossier's latest stamped tick, which may be a calamity's own
  `tick` (§4.11 *The clock* (1) l.8327-8328; V08 l.672).
- **The bound.** `HistoryHint.calamities` (§2.7 l.2452) and its writer V08 §3.15 (2) (l.2318) take "`calamityHistory` before
  the creation week". Before R3-18 that meant strictly before the present.
- **The gap.** A calamity at the present week itself is carried at creation (V08 l.1287: the `calamity` kind at `creation`), so
  no later absorb carries it "newly", and V08 §3.6 (3) never gives it an epoch. It therefore reaches neither DR37's replay, nor
  the `HistoryRecord`'s story, nor DR28's epoch path. This is the case of a map made right after a disaster, a common request.
- **Two fixes in flight.** The peers' fixes word the bound two ways: VM-R3T-02 "before the present at creation", VPC-R3-05 "up
  to the present at creation". One builder drops the calamity and the other replays it.

**Required change.**
- §2.7's `HistoryHint.calamities` comment reads "`calamityHistory` up to and including the present at creation (§4.11 *The
  clock* (1)) — every calamity the creation carries (DR36's losses; DR37's events)". This is the endpoint of VM-R3T-02's and
  VPC-R3-05's text, the one bound for both.
- V08 §3.15 (2)'s `calamities` bullet (l.2318) reads the same in the same round.
- V08's history test (T-V8-51) adds a dossier whose latest stamped tick is a calamity's: that calamity is in the hint and in the
  last replay epoch (VAT3-r3-10).

### VAT3-r3-03 — MAJOR DISAGREE (owner: scope)

**Claim.** The bar for item 114's recovery orders patches by a different key from the rule it tests.
- **The bar.** T114-4 (§13.2 l.18280-18281) reads "recovery replaces patches oldest first, by each run's epoch of last change
  (volume 12's spec `T114g.oldestFirst`)".
- **The rule.** §6.1 orders epochs by their weeks (round 2's ruling). It numbers a replay epoch `0x8000_0000 + r`, above every
  live epoch's 1, 2, …. V06 §3.7.7 (3) l.1636-1638 replaces "oldest patch first (by the week of the run's last-change epoch —
  `EpochRecord.inputs.week` of its `conditionEpoch`, generation's epoch 0 first, a replay epoch's week before every live
  epoch's, §6.1 …)". V06 §3.21 l.3302 and T-V6-73 l.4140 say the same.

Read by `conditionEpoch`'s number, T114-4 puts every replay-era patch after every live-era one on a history-first document.
That is the reverse of the rule. The bar then fails a correct build or passes the wrong order (J141: a bar that passes a wrong
result).

**Required change.** T114-4: "by each run's epoch of last change" → "by the week of each run's last-change epoch
(`EpochRecord.inputs.week` of its `conditionEpoch`; generation's epoch 0 first, every replay epoch's week before every live
one's — §6.1, V06 §3.7.7 (3)), never the epoch's number". The T114 group's runs list keeps T-V6-73's history-first clause as
the replay case.

### VAT3-r3-04 — MAJOR DISAGREE (owner: V12)

**Claim.** V12 §3.15.4's `T114g.oldestFirst` (l.2511-2512) runs `exactScript` `patchesOldestFirst` "over H-100's epochs and
V06's recovery fixture, the order read from each run's epoch of last change". V06's recovery fixture (T-V6-73) is history-first,
with walls patched in replay epochs and again in live epochs. Read by epoch number, the script expects live patches replaced
first. V06 §3.7.7 (3) and §6.1 replace replay-era patches first (VAT3-r3-03). T-V12-47's planted fault ("a recovery that
replaces a younger patch first") is then judged by the wrong key.

**Required change.** V12 §3.15.4: "the order read from each run's epoch of last change" → "the order read from the week of each
run's last-change epoch (`EpochRecord.inputs.week`; §6.1 — never the epoch's number, so a replay epoch orders by its week, before
every live one), over H-100's epochs and T-V6-73's history-first recovery fixture". T-V12-47's planted fault adds "a live-era
patch replaced before a replay-era one".

### VAT3-r3-05 — MINOR TERM (owner: V08)

**Claim.** R3-18 gives one name to each value, everywhere: the **present at creation** is the dossier's present week, and the
**creation week** is the `generate` event's (the replay's start on a history-first document). V08 still feeds its `presentWeek`
to "the creation week" in two places:
- W64 (l.291): "§4.11's clock (the creation week; V08 §3.6 (3)'s `W₁`)";
- the present-week field row (l.672): "§4.11's clock — the creation week and V08 §3.6 (3)'s `W₁`".

The peers' VM-R3T-02 rewrites V08 l.2318 only. Nothing built changes: §4.11 (1) and V06 §3.20.3 derive the creation week from
the present.

**Required change.** In both cells, "the creation week" → "the present at creation (from which a history-first document's
creation week follows, V06 §3.20.3)".

### VAT3-r3-06 — MINOR DISAGREE (owner: V02)

**Claim.** V02 dates the aftermath's own decay level from the wrong week.
- **V02's text.** V02 §5.7 (6) l.3115-3116 and its §3.18 row l.2550 read "a building the next epoch really ruins or abandons
  reads its own level from that epoch's week (V06's hazard and decline phases)".
- **The home.** V06 §3.23 (1), the level's one home, starts the run "at the week its change shows": a hazard's change at the
  hazard's week (the calamity's), and a `vacate`'s `decay` Works at its drawn offset in the epoch's span (V06 §3.13 (2)). In a
  coarse catch-up the calamity's week can lie years before the epoch's (R3-06 (a); R3-17).

V02 calls `decayLevel`, and neither T-V2-59 nor T-V2-60 encodes the week, so nothing built changes. The restatement still
states another week (round 2 named this end, and no END line carried it).

**Required change.** In both places, "reads its own level from that epoch's week (V06's hazard and decline phases)" → "reads its
own level from the week its change shows (V06 §3.23 (1): the hazard's week, a `vacate`'s `decay` Works' start)".

### VAT3-r3-07 — MINOR DISAGREE (owner: V03)

**Claim.** V03 §5.6 (4) l.2734-2735 reads "a building the aftermath really ruins enters a decay run (V03 §3.11) and draws its own
level from that epoch's week". V06 §3.23 (1) starts the run at the week the change shows (VAT3-r3-06); `planDamage` reads V06's
`decayLevel`, and T-V3-40 does not encode the week.

**Required change.** "draws its own level from that epoch's week" → "draws its own level from the week its change shows (V06 §3.23
(1))".

### VAT3-r3-08 — MINOR DISAGREE (owner: model)

**Claim.** Model §2.6 step 7 (l.2100-2101; R3-06's binding text) dates a replay ruin from the epoch's week where the home dates it
from the change.
- **Model's text.** "one item 113's replay abandons or ruins ages from that replay epoch's week".
- **The home.** V06 §3.23 (4) l.3423-3426 starts it "from the week (1) gives its change in that replay epoch — the epoch's week
  where the epoch runs at model level and starts no Works (V06 §3.20.4)".
- **Where the two part.** A replay epoch ending within `replay.detailRetainYears` (50) of the present runs its Works (V06 §3.13
  (1), §3.20.4: "a fire five years ago still shows its rebuilding Works"). There a `vacate`'s or a hazard's change shows at the
  Works' start, which falls anywhere in a span of `history.epochYears` (10 years by default).

R3-06 (a) governs where a run starts. Nothing built changes, because every reader calls V06's `decayLevel`.

**Required change.** "one item 113's replay abandons or ruins ages from that replay epoch's week" → "one item 113's replay
abandons or ruins ages from the week its change shows in that replay epoch (V06 §3.23 (4): the epoch's week where it starts no
Works)".

### VAT3-r3-09 — MINOR DISAGREE (owner: V11)

**Claim.** V11 §3.25.10's `settings` row (l.4617-4618; R3-06's END text) reads "a building item 113's replay abandons or ruins ages
from that replay epoch's week". This is the same restatement as VAT3-r3-08, against V06 §3.23 (4).

**Required change.** "ages from that replay epoch's week" → "ages from the week its change shows in that replay epoch (V06 §3.23
(4))".

### VAT3-r3-10 — MAJOR EDGE-UNDEFINED (owner: V06)

**Claim.** The replay's event-to-epoch mapping has no epoch for an event at the present.
- **The mapping.** V06 §3.20.2 (l.3108-3110) places each history event and each `calamityHistory` entry "in the epoch whose span
  `(toYearsAgo, fromYearsAgo]` holds its years ago; one before the start is not replayed".
- **Why it misses.** The last replay epoch ends at the present ("the last ending at the present (yearsAgo 0)", V06 l.911), so its
  span `(0, fromYearsAgo]` excludes 0. An event or calamity at the present week therefore lies in no span, though it is not
  before the start. Such entries come from a calamity whose tick set the present week, or a history event of 0 years ago.
- **The other convention.** Under `EpochInputs.events`' own rule, "(the previous epoch's week, week]" (§4.11 l.8239), that week
  belongs to the last replay epoch at `W_p`.

One builder drops the event, another replays it in the last epoch (DR37: "the dossier's present facts met exactly at the
replay's end").

**Required change.**
- V06 §3.20.2: after "holds its years ago" add ", an event at the present (0 years ago) in the last epoch, at `W_p`".
- V06 §3.21's replay row adds "an event or a calamity at the present week | replayed in the last epoch at `W_p`".
- T-V6-71 adds that fixture.

## Confirmed peer findings (not raised again; confirmed in the live text)

* **R3-18's residue:** VM-R3T-02 (model, with V08 l.2318's end) and VPC-R3-05 (model) — `HistoryHint.calamities` "before the
  creation week". Since R3-18 that bound is circular on a history-first document: the creation week depends on DR36's peak,
  which reads these calamities. Their endpoint is VAT3-r3-02.
* **R3-17's bar:** VPC-R3-01 (scope) — T76-1 names two triggers.
* **The catch-up's over-budget branch:**
  * VV56-r2-04 (V08) — V08 §3.6 (3) l.1851 still says "one epoch over the span always fitting", against V06 §6.8 (6) and V08 §6's
    row l.3167;
  * VV56-r3-01 (V06's two wordings of the branch) and VV56-r3-02 (V09 §4.21.9 (1)).
* **The frame growth at an epoch:** VKr3-01 (pipeline) — §4.11 *The rung at an epoch* names no raised way's re-derivation and
  still says "an L0 batch" (repair-r3-kernel HAND-OFFS 1–2).
* **Raised ways over epochs:** VM-R3T-03 (V06 §3.7.2 (2), §3.7.6 (5) release the held stretch on a span state that no longer
  exists); VM-R3T-04 – VM-R3T-06, VM-R3T-09, VDC3-05 – VDC3-07, VCS-r3-06.
* **Item 123 over time:**
  * VV56-r2-06 / VV34-r3-01 (the restoring re-cut's own elements, blocker);
  * VV34-r3-06 (`PlanDamage.own` under a running repair);
  * VV34-r3-04 (§16's M6-U row);
  * VDC3-02 (the roofless case against §6.3's "exactly while").
* **Item 122 over time:**
  * VPC-R3-02 (`crisisLookYields` before E2);
  * VV12-r3-03 and VRC3T-01 (Find at a drawn week);
  * VV56-r3-03 (a camp of fewer heads than one household);
  * VV910-r3-02 (V10's look end).

## Checked and agreeing

* **The cadence.** §4.11 *The clock* (4) l.8352-8361 (three triggers, the coarse catch-up carrying a calamity in the epoch that
  holds its week), V06 §3.3.1 (citation only), V06 §3.21's dossier-bound row, §6.8 (6), J-V6.136, V08 §3.6 (3) and J-V8.55. V06
  §6.8 (1)'s estimate sums the epochs it is given, so the calamity trigger's epochs are priced.
* **The two weeks of creation.** The creation week's uses read the new meaning:
  * §4.11 (1), `EpochInputs.years` l.8237, §4.11 l.8664 and l.8738;
  * V06 l.410, `ProductEpochContext.prevWeek` l.468, `HistoryIndex.creationWeek` l.811, §3.1 (3) l.956, §3.14 l.2288, §3.15.2
    l.2336, §3.15.4 l.2370, §3.20.3 l.3135-3139, §3.21 l.3266, §3.23 (4) l.3421 and §5.2's *Years* l.3689;
  * V08 §3.6 (3)'s `W₀`.

  V06 §3.10.1's "the plan's creation week" (l.2027, l.2037) is the `MutationPlan`'s, now so named. V06 §3.7.7 (3)'s "generation's
  epoch 0 first" orders by week under the new meaning: the creation week precedes every replay epoch.
* **Decline under locks.** Base §4.11 step (c) l.8041-8045, the strike pool l.8513-8516, §7.7's precedence l.11712-11722, §5.3's
  capacity row l.9098 and `LadderOp.relet` l.8099 cover a dossier fall. V06 §3.5.1 (1), (4), (5) tells the dossier and other
  falls apart, with `EpochReport.households.heldByLock` l.748, §3.21 l.3254, l.3300, §4.3 l.3554-3557 and T-V6-70 (f). V07
  §3.12, T-V7-16 and J-V7.2 follow it.
* **The decay run and its level over time.** V06 §3.23 (1)–(6), W94 l.377, §2.12 l.873, §6.9 and T-V6-76 agree with:
  * model §2.6 step 7 l.2084-2102 and §2.8's elaboration record l.2864-2867 (occupant inputs of the week before the run);
  * V02 §5.7 (2), (8), §2.4 and X36;
  * V03 §5.6 (2) (b), (c), §1b l.303, §2.5 l.926, §3.13 l.2094 and T-V3-39;
  * V04 §5.6 (1), (3), (6), UE33 and UC21 ("a scrubbed week never opens or closes a way");
  * V11 §3.25.10.

  The level is never an epoch input: V06 (5) = V04 (4) = UC21. The start week's restatements are VAT3-r3-06 – -09.
* **The crisis hand-over in time.** V06 §3.22 (1)–(4) agrees with §8.2 l.13013-13030 (`live.crises` re-run at a Works' start week
  on a struck building), §10.2 (f) l.15574-15577, DR44 l.11981 ([`sinceWeek`, `untilWeek`) at §2.9's `week`), V01 §3.16 (the
  crisis services over the model the view draws, head or frame), V02 §5.7 (6), (8) (re-emission at a week step) and V03 §5.6 (4).
* **The village over time.** V07's desertion, the palisade's condition over epochs (V06 §3.7) and the village's latitude and river
  (R3-22) read V06's engine and §7.7's rows.
* **Walls and raised ways over epochs.** §2.7's support step (3) and (6), V06 §3.7.1 l.1449-1451, §3.7.6 (5) l.1581-1593, §3.7.7
  (2) l.1629-1631, T-V6-47, T110-2 and the item-114 group l.18278-18280 agree. The release condition's wording is the peers'
  VM-R3T-03.
* **The comfort level's numbers.** V06 §6.8 (2), (6) cite §12.5's T(B) (246 / 589 / 2 290 ms, l.16893-16895) and V08 §6's boot
  (400 ms, l.3159) and per-event bounds (30 / 45 ms, l.3166). With `advance.budgetMs` 9 000 (V06 l.581) they give the stated
  6 310 ms.
* **Owner items.** No phone, narrow-class or bottom-sheet clause in determinism (§5–§7) or V01–V07 (item 126 (a2)). Item 125 —
  the dossier as the only data input: the week from its stamped ticks, the latitude from `Intent.latitudeDeg` (V06 l.400, V07
  VS1), no river input at the village rungs (V07 l.1232-1234).

## Not run

`docs/validation/bench/doc_checks.py` was not run: this seat writes no design text, and the reference corpus is incomplete in
this checkout, so any clean-room result here would be provisional.
