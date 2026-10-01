# Agreement check, round 2 — time and change (determinism, V06, V01, V02, V03, V04, V05, V07) after assemble-r2

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-time-r2t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (fresh start) · [x] round-1 findings re-checked against the live text (20) · [x] round-2 blocks in scope re-read (diff 682e8e9 → live) · [x] owner items 120–126 parts checked as new design · [x] issues written · [x] result saved · [x] LANDED

## Scope and method

**Members:** determinism (base §5–§7), V06, V01, V02, V03, V04, V05 and V07, read in the live files after assemble-r2. The
live files equal assemble-r2's sha256 "after" column (base `4ed292e9…`, V01 `fb2d1496…`, V02 `c4d39837…`, V03 `b015fd00…`,
V04 `2786cc53…`, V05 `7617d87c…`, V06 `d12c382b…`, V07 `8a4302dc…`). The commits after it touch only the logs and the
verifiers' reports.

**Round-1 findings.** I re-checked each of my 20 round-1 findings against the live text. I read each against
adjudication-r2's ruling for it: R2-19 (VAT1-03, VAT1-04), R2-20 (VAT0-07, VAT1-05), R2-34 (VAT1-01, VAT1-02), plain FIX
(VAT0-01), and NEW DESIGN under R2-35 – R2-40 for the G-ids.

**Round-2 blocks.** I took the line diff of every member against the pre-round commit `682e8e9` (base 326 hunks; V01 69,
V02 43, V03 55, V04 57, V05 17, V06 81, V07 51). I read every hunk on time and change: epochs, the cadence, the clock and
the week's source, the replay, decline, decay, the hand-over to the epoch path, undo targets, the lifecycle rows and the
comfort level. I read each such hunk with the whole subsection it lands in and the counterpart text in the other members.
In V06 that was everything new: §1b, §2.12, §3.3, §3.5.1, §3.7, §3.7.7, §3.13, §3.15, §3.20, §3.21, §3.22, §3.23, §4.1,
§4.3, §6.8, §6.9, §7, J-V6.136 – J-V6.140.

**Owner items.** I checked items 120–126 against the canon's dated routings, R2-30 – R2-41 and file g's text, as new
design. That covers their wiring, lifecycle, edges and agreement with the other units' parts, and whether any part
contradicts the owner's words. In this lane's units:
- item 120: V01, V03, V04, V05, V07;
- item 122: determinism (DR44), V06, V01, V02, V03, V07, and V04 by R2-37 (7);
- item 123: determinism (§6.3), V06, V02, V03, V04;
- item 124: determinism (§6.1);
- item 125: determinism (§7.7's rows), and V06 by R2-40 (1);
- item 126: V04, plus a phone-clause sweep of every member under R2-41.

None of my units is named for item 121 or for item 122 (h)–(i).

**Peers.** The round-2 verifiers who landed before this seat raised 135 issues; I read every one. Where one of them covers
a defect in this lane, I list it under *Confirmed peer findings* and do not raise it again.

## Outcome

**9 issues: 2 blocker, 5 major, 2 minor.**
- **Owners:** V06 5, pipeline 2, V07 1, and one further V06 minor.
- **By kind:** 4 DISAGREE, 1 MATRIX-GAP, 1 CONFLICT (with an owner's words), 1 BROKEN-REFERENCE, 1 EDGE-UNDEFINED, and 1
  DISAGREE paired with the matrix gap.

**Round-1 findings.** All 20 are closed in the live text. The seven disagreements are fixed as their rulings word them,
and the 13 F-MISSING parts are written at build depth (verdicts below).

**New this round:**
- **VAT2-r2-01 (blocker) and VAT2-r2-02:** the dossier cadence's third trigger, an epoch at a newly carried calamity's
  week, lives only in V08 §3.6 (3). J-V8.55 says it is §4.11's, but the cadence's home (§4.11 *The clock* (4)) and V06
  §3.3.1 state two triggers. Built from the home, a calamity reaches the model only at the next year end. Every reader of
  the aftermath and of the disaster's calamity then sees it late; V01's lookup misses it at the present week, so the
  calamity's targets lose to the scatter pattern (item 122 (b)).
- **VAT2-r2-03 (blocker) and VAT2-r2-04:** "the creation week" means the dossier's present in §4.11 (1) and in V06
  §3.20.3's `W_p`. In V06 §2.11, §3.15.2 and §3.15.4 it means the first model's week, the replay's start. The first
  epoch's `years` reads it, so a history-first document's first replay epoch gets a negative span under the home's
  definition.
- **VAT2-r2-05:** item 123's decay level reads V11's frozen default age for "ruins first met in item 113's replay". Yet the
  replay ruins them by ops in the creation prefix, a decay run V06 §3.23 (1), (5) and V06 §3.21's combination row read as
  "their replayed years".
- **VAT2-r2-06:** a building generated ruined never ages: `w − A = 52 × D` is the same at every week. That goes against
  item 123 (b), "damage … only accumulates as decay goes on".
- **VAT2-r2-07:** V07's desertion ("every dwelling vacates", T-V7-16) drops the locked and pinned dwelling's exception that
  V06 §3.5.1 (5) and R2-18 (a) state.
- **VAT2-r2-08 (minor):** `EpochRecord.week`, from my round-1 wording and R2-20's, names a field §2.9's `EpochRecord`
  lacks.
- **VAT2-r2-09 (minor):** V02 and V03 apply V06's `crisisLookYields` to a preview, which has no overlay.

**What agrees.** The rest of the time-and-change contract agrees across the members after round 2:
- the replay's epoch numbers and their order by week;
- the port session's undo rule;
- the week's one source;
- the hand-over's three parts;
- the decay level's signature, readers and landing (default age before M6-E);
- the dig draw per added wing;
- Show gaps' units Below and on Sky;
- the catch-up's coarsening;
- every new lifecycle row (derived, never stored; undo re-reads).

## Round-1 findings — verdicts

| id | owner | ruling | verdict | where (live) |
|---|---|---|---|---|
| VAT0-01 | V04 | FIX | **FIXED** | V04 §3.5.7 (d) l.1874-1878: "a building draws once per void kind, plus once for each wing V02's mutator adds over a void … never twice for one key (V06 §3.18.1 (2a); T-V6-34)", with "Item 109 (d)'s 'chance raised over a ruin' is this row." after it; agrees with V06 §3.18.1 (2a) l.2492-2494, T-V6-34 |
| VAT0-07 | determinism | R2-20 | **FIXED** | §6.1 epoch component l.9241-9248: live epochs numbered 1, 2, … after the creation prefix whatever R; a replay epoch records `0x8000_0000 + r` in the lineage key, `LifecycleEvent.epoch`, `Lifecycle.since.epoch`, `EpochRecord.epoch`, `conditionEpoch` and V06 §2.11's index; ordering by the epochs' weeks. §6.5 *epoch keys* l.9983-9986 adds the lineage-key clause. J-A113.61 (l.22367; rationale l.805) reads `0x8000_0000 + r` |
| VAT1-01 | V05 | R2-34 | **FIXED** | V05 §5.6 (4) l.2319-2326 cites V01 §5.4 (3)'s `gapUnits`, the island one `walk` unit, per-plot `households`; V05 §3.21's Find row l.1793 and T-V5-36 (g) l.2793-2797 read the same; agrees with V01 §5.4 (3) l.3160-3193 |
| VAT1-02 | V04 | R2-34 | **FIXED** | V04 §5.1 *Find on Below* (4) l.2724-2728; UE32 l.2418 and T-V4-81 (c) l.3128 name the pseudo-district's gap and `underDistance` |
| VAT1-03 | V06 | R2-19 | **FIXED** | V06 §4.1 l.3445-3447, §4.3 l.3520-3522, T-V6-27 l.4032, the T20-2 and T20-6 take-over rows l.3983-3984 — "no event of the port's session `host:port` — a port epoch, with or without a dossier change, a dossier event — is an undo, redo or revert target (§7.4 *Replay semantics*)"; agrees with §7.1's row l.10376 and §7.4 l.10973 |
| VAT1-04 | V07 | R2-19 | **FIXED** | V07 l.2354-2356 and l.2500-2501; V07's lifecycle rows l.1009, l.1013, l.1020 read the same rule |
| VAT1-05 | V06 | R2-20 | **FIXED** (one naming slip: VAT2-r2-08) | V06 §3.7.7 (3) l.1619-1620 orders by the week of the run's last-change epoch, epoch 0 first, every replay week before every live one; V06 §3.21 row l.3281; T-V6-73's history-first clause l.4078 |
| G122-determinism | determinism | R2-37 (3) | **PRESENT** | §7.7's DR44 l.11896, named in item 10's lead l.11847-11849 (peers' VDC2-09 / VPC-R2-02 on its regional_* clause) |
| G122-V06 | V06 | R2-37 (6) | **PRESENT** | V06 §3.22 (`frontierFor`, `crisisLookYields`, the aftermath, reconstruction as Works), W92–W93, §2.12 rows, §3.21 rows, §6.9, T-V6-75, J-V6.137 – J-V6.138 (VAT2-r2-09) |
| G122-V01 | V01 | R2-37 (4)–(5) | **PRESENT** | V01 §3.16 `disasterSource` / `disasterDistricts` and `campLand` l.2315-2372, T-V1-60, J-V1.104 – J-V1.105 (peers' VV12-r2-01 – 03) |
| G122-V02 | V02 | R2-37 (4), (7) | **PRESENT** | V02 §5.7 (1), (3)–(6) l.3016-3104, X35 – X36, T-V2-60 (VAT2-r2-09) |
| G122-V03 | V03 | R2-37 (7) | **PRESENT** | V03 §5.6 (4) l.2715-2728, T-V3-40 (VAT2-r2-09) |
| G122-V07 | V07 | R2-37 (4) | **PRESENT** | V07 §5.6 l.3387-3500, W84, T-V7-69, J-V7.146 (peers' VV78-r2-05 – 07) |
| G123-determinism | determinism | R2-38 (2) | **PRESENT** | §6.3 *Plan damage* l.9786-9802; §6.1's `plan.damage` row l.9351; §6.5 (9) l.10003-10006 (T123-3) |
| G123-V06 | V06 | R2-38 (3) | **PRESENT** | V06 §3.23 `decayLevel` / `decayPeak`, W94, §2.12 row, §3.21 row, T-V6-76, J-V6.139 (VAT2-r2-05, -06; peers' VV56-r2-01, -05, -06) |
| G123-V02 | V02 | R2-38 (4) | **PRESENT** | V02 §5.7 (1)–(2), (7)–(8); T-V2-59 takes T123-5 |
| G123-V03 | V03 | R2-38 (1)–(4) | **PRESENT** | V03 §3.11 *Decay re-cuts no plan* l.1997-2023, §5.6 l.2638-2746, T-V3-39 (peers' VV34-r2-08 – 12) |
| G123-V04 | V04 | R2-38 (4) | **PRESENT** | V04 §5.6 l.2865-2930, UE33, UC21, T-V4-82, J-V4.130 (the closure states stay the access model's, (4)) (peers' VV34-r2-01 – 06) |
| G124-determinism | determinism | R2-39 (d) | **PRESENT** | §6.1 *The weather stream* l.9380-9395 (session seed, `STAGE_VIEW`, `view.weather`), its registry row l.9352, §6.5 (9) l.10007-10009 (T124-9) (peers' VDC2-01 – 04) |
| G125-determinism | determinism | R2-40 (3) | **PRESENT** | DR1 l.11853, DR3 l.11855, DR19 l.11871, DR29 l.11881 and DR42 l.11894 re-sourced; item 10's input order l.11836-11838 "the dossier's, then the blueprint's own; no host input is a data input" (peers' VDC2-11 – 15 on residue elsewhere) |

## Owner items 120–126 in this lane's units

| item | unit | verdict |
|---|---|---|
| 120 | V01, V03, V04, V05, V07 | agree after round 2. Show gaps' units have one definition (V01 §5.4 (3)) read by V04 and V05 (R2-34). Find lands at M5 (R2-32): T-V1-59 at M5, T-V3-38 at the later of P5 and M5 (V03 l.2928-2932), T-V4-81 at U5, T-V5-36 at M6-sky (V05 l.2840-2841), T-V7-68 with M5's exit (V07 l.3777-3779). Re-evaluation at every commit, regenerate, undo, redo and epoch agrees in V01 §5.4 (4), V03 §5.5, V04 §5.1 (6), V05 §5.6 (5) and V07 §5.5. Find at a scrubbed week is the peer finding VRC2T-07 |
| 122 | determinism, V06, V01, V02, V03, V07 | present (table above). They agree on: the look's weeks (§2.7's reader rule, cited by V02 (1), V03 (4), V06 §3.22 and V07 §5.6); the aftermath only through the epoch path (DR44 l.11896, V06 §3.22 (1), V07 §5.6 (4)); whole districts and V07's ends as units (V01 §3.16 (1); V07 §5.6 (3)); the hand-over per building through `crisisLookYields` (V02 (6), V03 (4), V07 (3)); and no week drawing both. Open: VAT2-r2-01 (the calamity's epoch) and VAT2-r2-09 (a preview); the peers' items listed below |
| 123 | determinism, V06, V02, V03, V04 | present. They agree on: one comparison and one threshold per element (§6.3); the level's one home and its signature `decayLevel(doc, lineage, week)` / `decayPeak` (V06 §3.23), read at the drawn week by V02 (1), V03 (2) (d) and V04 (1); "a level is never an input of an epoch rule" (V06 (5) = V04 (4)); and the landing — default age before M6-E (V06 (4), V03 (8), V04 (6), V02 X36, §2.6 step 7, R2-36). Open: VAT2-r2-05, VAT2-r2-06; the peers' items listed below |
| 124 | determinism | present; peers' VDC2-01 – VDC2-04 |
| 125 | determinism, V06 | present. The week's one sentence appears in §4.11 (1), DR42, V06 §1b's week row (l.384) and V06 §5.2's *Years*. V06 §3.20.3's `W_p` cites §4.11 (1); the term it cites is VAT2-r2-03 / -04. Residue raised by peers: VDC2-14 (V06 l.399's realm latitude), VDC2-15 / VV78-r2-02 (V07 l.1232) and VV78-r2-03 (V07's week) |
| 126 | V04, every member | no phone, narrow-class or bottom-sheet clause in determinism (§5–§7) or in V01–V07; V04's phone-sheet mention is gone |

## Issues

### VAT2-r2-01 — BLOCKER MATRIX-GAP (owner: pipeline)

**Claim.** The dossier cadence has three triggers in its producer and two in its home.
- **The producer.** V08 §3.6 (3) (l.1826-1840) folds an epoch at every year end, at the first week of each crossing of the
  ± 5 % roster tolerance, "and an epoch at the week of each newly carried calamity that no other epoch falls on (a
  destructive event is epoch content, §4.11's rung at an epoch)". J-V8.55 (V08 l.3416) says it does so "to cite §4.11's
  cadence — … plus one at each new calamity's week — over a cadence of this volume's own".
- **The home.** §4.11 *The clock* (4) (l.8293-8299) states only "an `epoch` at each 52-week boundary crossed — or sooner,
  when the dossier's population has moved … by more than the roster tolerance", and "No epoch is folded per tick". V06
  §3.3.1 (l.1073-1074) restates that two-trigger cadence (VAT2-r2-02). `EpochInputs.events[].week` "in (the previous
  epoch's week, week]" (l.8184) then reads a calamity as riding the epoch whose span holds it.

So a port built from the home folds a calamity of week 10 into the next year-end epoch. While the dossier's present lies
before that year end, the calamity is not in the model at all; a port built from V08 folds it in its own week. The
difference reaches every reader of that epoch:
- V06 §3.22 (1)'s aftermath, "in the epoch that holds its week";
- V06 §3.13 (2)'s hazard dated at its week;
- V04's burial from `CalamityRef.deaths`;
- V01 §3.16 (2)'s disaster calamity, read "from the committed `epoch` events" (V01 l.2327-2330, l.343). At the present
  week of a fresh calamity no committed event holds it under the home's cadence. The look then strikes the scatter
  pattern with no matched target, against item 122 (b)'s "the calamity's `targets` win where the dossier names the place
  hit", and changes its units when the epoch later folds.

The agreement matrix has no cadence row.

**Required change.** §4.11 *The clock* (4): after "by more than the **roster tolerance**, ± 5 % (J-A76.43; the one
number §7.7 item 3's lapse reads too)" insert "— and at the week of each newly carried calamity that no other epoch
falls on (DR28: a destructive event is epoch content; V08 §3.6 (3); J-V8.55)". Keep the catch-up clause "coarsened under
item 119's comfort level by V06 §6.8 (6)", under which a coarse catch-up carries a calamity in the coarse epoch that holds
its week. V06 §3.3.1 states the same three triggers in the same round (VAT2-r2-02; R2-05).

### VAT2-r2-02 — MAJOR DISAGREE (owner: V06)

**Claim.** V06 §3.3.1 (l.1073-1074) restates the port's cadence as "(a 52-week boundary, or a population move past the
roster tolerance; …)". V08 §3.6 (3) also folds an epoch at each newly carried calamity's week (VAT2-r2-01). V06 §3.22
(1)'s aftermath, "in the epoch that holds its week", and V06's dossier-trace calamity row (l.388) read whichever cadence
the port folds.

**Required change.** V06 §3.3.1: replace "(a 52-week boundary, or a population move past the roster tolerance; a
catch-up whose epochs at that cadence would pass the comfort level folds coarser, V06 §6.8 (6))" with "(a 52-week
boundary, a population move past the roster tolerance, or a newly carried calamity's week, §4.11 *The clock* (4); a
catch-up whose epochs at that cadence would pass the comfort level folds coarser, V06 §6.8 (6), a calamity then riding the
coarse epoch that holds its week)".

### VAT2-r2-03 — BLOCKER DISAGREE (owner: pipeline)

**Claim.** "The creation week" has two meanings, and the first epoch's span reads it.
- **The present.** §4.11 *The clock* (1) (l.8275-8276): "Its creation week is the present week of the dossier it is
  created from; a standalone map starts at week 0". V06 §3.20.3 (l.3117) takes `W_p` as "the present — the document's
  creation week (§4.11 *The clock* (1))". V06 l.409 and EP-15 (l.8801, "a replay starting 300 years before a week-0
  creation") use the same meaning.
- **The first model's week.** A history-first document's `generate` event stands at `W_p − round(52 × start.yearsAgo)`
  (V06 §3.20.3, l.3118-3119). V06 §2.11's `HistoryIndex.creationWeek` (l.809) is "the week of the log's first model: a
  replayed document's first replay epoch's start". V06 §3.15.2's `locate` (l.2317-2319: "for `w` at or before the
  creation week, the creation model … a replayed document's: … the town … at the replay's start") and §3.15.4's bar
  (l.2352) read that meaning.
- **Where the span reads it.** `EpochInputs.years` is "(week − the previous epoch's week, or the creation week) ÷ 52"
  (l.8182). V06's `ProductEpochContext.prevWeek` (l.467) and V06 §3.1 (3) (l.953-955) say the same.

Under the home's definition, the first replay epoch's `years` is (W_p − 52·toYearsAgo₁ − W_p) ÷ 52, which is below 0. Every
per-year chance `1 − (1 − p)^years` (§4.11 *The clock* (5)) and every churn cap scaled by `years` then runs on a negative
span. Under V06 §2.11's meaning, `years` is the first epoch's span.

**Required change.** §4.11 *The clock* (1): replace "Its creation week is the present week of the dossier it is created
from; a standalone map starts at week 0." with this: "Its present at creation is the dossier's present week (a standalone
map's, week 0). Its **creation week** — the week of its `generate` event, its first model's — is that present, except on a
history-first document, whose `generate` event stands at the replay's start, `W_p − round(52 × start.yearsAgo)` (V06
§3.20.3); the first epoch's `prevWeek` and `years` (above) read the creation week, and a replayed past lies between it and
the present." In EP-15 (l.8801), "before a week-0 creation" reads "before a week-0 present". V06's end is VAT2-r2-04
(R2-05).

### VAT2-r2-04 — MAJOR DISAGREE (owner: V06)

**Claim.** V06 uses the present meaning of "the creation week" in two places, against its own §2.11, §3.15.2 and §3.15.4
(VAT2-r2-03):
- l.409: "a replayed past lies before the creation week, V06 §3.20.3";
- §3.20.3 l.3117: "`W_p` the present — the document's creation week (§4.11 *The clock* (1))".

**Required change.**
- l.409: "a replayed past lies before the creation week, V06 §3.20.3" → "a replayed past lies between the creation week
  and the present, V06 §3.20.3".
- §3.20.3: "`W_p` the present — the document's creation week (§4.11 *The clock* (1)) —" → "`W_p` the present at
  creation (§4.11 *The clock* (1): the dossier's present week, a standalone document's week 0) —".
- §3.20.3: after "the `generate` event stands at `W_p − round(52 × start.yearsAgo)`" add "— the document's creation week
  (`HistoryIndex.creationWeek`, V06 §2.11), which the first replay epoch's `prevWeek` and `years` read (V06 §3.1 (3))".

### VAT2-r2-05 — MAJOR DISAGREE (owner: V06)

**Claim.** V06 gives the decay level of a building the history replay ruined two readings.
- **The default age.** V06 §3.23 (4) (l.3378-3383) gives "a building generated `abandoned`, `decayed` or `ruined`, or
  first met so in item 113's replay", V11's default age `D` under "No decay run in the log". T-V6-76 (d) (l.4081) bars
  "H-HISTORY's ruins first met in the replay, read V11's default age". V06 §3.21's decay row (l.3253) says the same.
- **The replay's ops.** The replay ruins and abandons buildings by ops of its epochs. V06 §3.20.5 (2) states "every
  building `ruin`ed" at the destruction epoch's `hazards` step, and the replay's decline and hazards act likewise. Those
  ops are lifecycle events of the creation prefix, at known weeks (V06 §2.11's `HistoryIndex.epochs` with `replay: true`;
  `EffectiveWeek`).
- **The decay run.** By V06 §3.23 (1) these events start a decay run, and (5) reads "a replay epoch's (a negative week is
  read as any week) — so scrubbing the history shows one plan aging (item 123 (a))". V06 §3.21's combination row
  "ruined plans × the history" (l.3283) gives "the replay's ruins at their replayed years".

A destruction two centuries before the present draws at `D`'s level under (4) and T-V6-76 (d), and at its state's top
under (1) and §3.21's row. Under the default age, a scrub of the replayed past shows no aging, against item 123 (a).
R2-38 (3)'s rule is unchanged: the default age is for "a building with no abandonment epoch". Its example "first met in
item 113's replay" fits no building whose ruin the replay's own ops made. V03 §3.11 (c)'s as-built plan for such a
building is a separate fact about the plan, not the level: the replay derives no plan.

**Required change.**
- V06 §3.23 (4): "A building generated `abandoned`, `decayed` or `ruined`, or first met so in item 113's replay," → "A
  building generated `abandoned`, `decayed` or `ruined` — its log holding no event that took it there from a standing
  state —".
- After that sentence add: "A building item 113's replay abandons or ruins (its decline, its hazards, V06 §3.20.5's
  destruction epoch) has its decay run in the creation prefix from that replay epoch's week ((1), (5)), so the present and
  every scrubbed week show its replayed years (item 123 (a))."
- T-V6-76 (d) → "a building generated ruined reads V11's default age; H-HISTORY's ruins read the years since the replay
  epoch that ruined them, a scrub across the replayed past showing each plan aging".
- V06 §3.21's decay row: "a building generated ruined or first met so in the replay | … V11's default age" → "a
  building generated ruined | V11's default age; one the replay ruined | its replayed years".
- The same correction in the same round (R2-05) at §2.6 step 7's parenthetical "(generated ruined; first met in item 113's
  replay)" (model) and at V11 §3.25.10's `settings` row ("one first met so in item 113's replay") (V11).

### VAT2-r2-06 — MAJOR CONFLICT (owner: V06)

**Claim.** V06 §3.23 (4) (l.3378-3381) gives a building with no decay run in the log "its state at V11's default age
`D`: (2) with `w − A = 52 × D`". That holds `w − A` constant at every week. A ruin generated at creation therefore reads
the same level at creation and after a century of epochs, so its damage never accumulates. This is against:
- item 123 (b): "the decay level (0–1, from its existence state and the years since it was abandoned …) … Damage
  therefore only accumulates as decay goes on";
- V06 §3.23 (2): "Years only add".

V11 §3.25.10's `settings` ("the years a building whose log holds no decay run reads at") and §2.6 step 7 read the same
frozen age. Only the reading before V06's E2 lands, the existence state alone, has no clock to age by.

**Required change.**
- V06 §3.23 (4): "reads its state at V11's default age `D`: (2) with `w − A = 52 × D`" → "reads its state as a decay
  run begun `D` years (V11's default age) before the week it was first met so — `A` = the creation week, the week of its
  `generate` event (§4.11 *The clock* (1)), − 52 × `D` — so it reads `D` years at creation and ages by (2) from then on as
  any run". Keep "Every reader reads every building so until this volume's E2 lands (M6-E): the existence state alone at
  V11's default age".
- V06 §3.21's decay row and T-V6-76 (d) add: "a ruin generated at creation read after 50 years of epochs: `D` + 50
  years, non-decreasing".
- V11 §3.25.10's `settings` row reads "the years such a building reads at the week it is first met" (V11; R2-05).

### VAT2-r2-07 — MAJOR DISAGREE (owner: V07)

**Claim.** V07 drops the protected dwelling's exception at desertion.
- **V07's text.** V07 §3.12 *Decline and desertion* (l.2542-2543) reads "**A deserted village** — a target below 1, or
  no household left — is an outcome …: every dwelling vacates and decays over the dwell bands". T-V7-16 (l.3615) bars
  "a target of 0 vacates every dwelling".
- **The engine's rule.** The village's decline is V06's engine (V07 l.2505, "the engine's strike lottery (V06 §3.5)").
  V06 §3.5.1 (5) (l.1236-1238) never vacates a locked or pinned building: its last household "lets out by a `relet` down
  to 0, the building keeping its state (§7.7's precedence)". R2-18 (a) words the same exception at §2.6's clamp, §4.11
  step (c), `LadderOp.relet` and §5.3's capacity row (l.9037).

A deserted village holding a locked or pinned dwelling is therefore vacated by V07's statement and its bar, and kept by
the engine's rule. T-V7-16 fails on a fixture that holds one.

**Required change.**
- V07 l.2542-2543: "every dwelling vacates and decays over the dwell bands" → "every dwelling vacates and decays over the
  dwell bands — a locked or pinned dwelling excepted, whose last household leaves by a `relet` down to 0, the building
  keeping its state (V06 §3.5.1 (5); §7.7's precedence)".
- T-V7-16: "a target of 0 vacates every dwelling" → "a target of 0 vacates every dwelling but a locked or pinned one,
  which keeps its state with 0 households (V06 §3.5.1 (5))".

### VAT2-r2-08 — MINOR BROKEN-REFERENCE (owner: V06)

**Claim.** V06 names `EpochRecord.week` in §3.7.7 (3) (l.1619), §3.21's row "item 114's recovery × the history replay"
(l.3281) and T-V6-73's history-first clause (l.4078). §2.9 declares `interface EpochRecord { epoch; seq; inputs:
EpochInputs; postDigest }` "… its week is inputs.week" (l.3051). §6.1, the ordering rule's home, writes "an
`EpochRecord`'s week, its `inputs.week`" (l.9247-9248). The path names no field. It comes from my round-1 wording of
VAT1-05 and R2-20's; the meaning is unchanged. Model §2.7's copy (l.2502) is the peer finding VM-R2T-10, whose rewrite
drops it.

**Required change.** In V06 l.1619, l.3281 and T-V6-73, "`EpochRecord.week`" → "`EpochRecord.inputs.week`".

### VAT2-r2-09 — MINOR EDGE-UNDEFINED (owner: V06)

**Claim.** V02 and V03 call `crisisLookYields` for a preview, which V06 never defines.
- **The callers.** V02 §5.7 (1) (l.3027-3031) draws a disaster preview over a building "while the building stands in a
  unit the look strikes and has not handed over ((6))". (6) reads V06's `crisisLookYields(doc, building, overlay, week)`
  against "the condition's `sinceWeek`". V03 §5.6 (4) (l.2715-2720) applies the same "not yet handed over" test to "a
  `disaster` preview at §10.2's `previewSeverity`".
- **The callee.** V06 §3.22 types `overlay: Id /* a ConditionOverlay whose look ruins the building */`, and its rule reads
  the overlay's `sinceWeek`. A preview has no overlay and no `sinceWeek` (V06 §3.22 (1): "A crisis preview … has no
  condition and no aftermath"; V01 §3.16 passes `null` for one).

So whether a previewed ruin yields to a building's running repair or rebuild Works is undefined, and the two callers pass
a value the callee does not take.

**Required change.** V06 §3.22's signature reads `overlay: Id | null /* null: a preview */`. Its (3) adds: "A preview
(`overlay` null) never hands over: `crisisLookYields` is false for it, so a previewed ruin draws over every building of
its units whatever their Works, and ends with the preview". The V06 §3.21 hand-over row adds "a preview over a building
under a rebuild Works | the look drawn (a preview never hands over)". V02 §5.7 (1) and V03 §5.6 (4) cite it (R2-05).

## Confirmed peer findings (not raised again; confirmed in the live text)

* **Item 123's level and plan:**
  * VV56-r2-05 (V06's decay run dated by its epoch's week, not the hazard's or the Works' week). V02 §5.7 (6) (l.3093)
    and V03 §5.6 (4) (l.2726-2728) restate "from that epoch's week". Whichever reading is adopted, those two follow it in
    the same round (R2-05).
  * VV56-r2-06 (`decayPeak` per element), VV56-r2-01 (`reused`), VM-R2T-01 / VM-R2T-02 (§2.6 step 7 against V03 §3.11
    and V06 §3.23), VDC2-07 / VDC2-08 / VRC2T-13 / VRC2T-14 / VV34-r2-04 (level ≥ t against "above 0 and at least t"),
    VDC2-06, VV34-r2-16.
* **Item 122's hand-over:**
  * VV56-r2-02, VV56-r2-03, VPC-R2-09, VPC-R2-10: the whole look ends at the first Works in §8.2 and §10.2 (f), against
    V06's per-building `crisisLookYields`.
  * VV56-r2-07 (`frontierFor`'s households count), VV56-r2-10, VV78-r2-07 (the village's entry).
  * VV12-r2-01 (the overlay's calamity). It reads committed `epoch` events, which ties it to VAT2-r2-01.
  * VV12-r2-02, VV12-r2-03, VV78-r2-05, VV78-r2-06, VPC-R2-03 / VV78-r2-09 (no dossier source for `disaster`),
    VDC2-09 / VPC-R2-01 / VPC-R2-02 / VV56-r2-08 (regional_migration_pressure), VRC2T-07 (Find and crisis looks at a
    scrubbed week).
* **Item 125's residue in this lane's volumes:** VDC2-14 (V06 l.399's realm latitude row), VDC2-15 / VV78-r2-02 (V07
  l.1232's `river: 'descent'` trigger), VV78-r2-01 (V07's VS1 latitude) and VV78-r2-03 (V07's week from the campaign
  calendar, l.288, l.324).
* **Decline and locks:** VPC-R2-07. V06 §3.5.1 (5) applies the protected dwelling's exception to every fall, while the
  base words it for a dossier fall. VAT2-r2-07 cites V06's rule, so it follows whichever wording is adopted.
* **Item 119's catch-up:** VV56-r2-04 (the events' and the open's costs outside the estimate) and VV56-r2-09 ("two
  one-time waits").
* **Round 1's peer items in this lane, now closed:**
  * VPC-R1-20: V06 l.614 and l.926 cite §4.11's `EpochInputs.wealthLevel`, `.advance` and `.replay`.
  * J-A113.61: the index l.22367 and the rationale l.805 read `0x8000_0000 + r`.
  * §6.1's `raised.reason` row cites §2.7's `RaisedReasonKey` (l.9342).
  * §13.2's T20-2 and T20-6 read the port-session rule (l.17519, l.17524).

## Checked and agreeing

* **The replay's numbers and order.** §6.1 (l.9241-9248) states every point R2-20 asks for. §6.5's fixture covers the
  lineage keys. V06 §3.7.7 (3), its §3.21 row and T-V6-73 order recovery by week. `Enceinte.pathway.since` and
  `.underuseSince` (§2.7 l.2252; V06 §2.7) and the raised way's `underuseSince` (V06 l.2862-2864) are weeks, never epoch
  numbers. No member orders by an epoch number.
* **The port session's undo rule.** §7.1 l.10376, §7.4 l.10973, V06 §4.1, §4.3, §2.12 (the catch-up's coarse epochs
  l.868), T-V6-27, the take-over rows, V07 l.1009-1020, l.2354-2356, l.2461 and l.2500.
* **The week's one source (item 125).**
  * §4.11 *The clock* (1)–(2) (l.8271-8287): no host rung left.
  * DR42 (l.11894), V06 §1b's week row (l.384), V06 §5.2 *Years* (the map reads no host calendar) and V06 §3.20.3's
    `W_p` cite §4.11 (1); the term `W_p` cites is VAT2-r2-03.
* **The catch-up's coarsening (R2-31 (a)).** §4.11 *The clock* (4) l.8297-8298, V06 §6.8 (6), V06 §3.21's row,
  J-V6.136, V06 §2.10's `EpochReport.advance` comment (l.779) and V08 §3.6 (3)'s sentence agree: every dossier event at
  its own week, one epoch over the span always fitting.
* **The hand-over (item 122).**
  * The look's weeks: §2.7's reader rule (l.2424) is cited by DR44, V02 (1), V03 (4), V06 §3.22 and V07 §5.6.
  * The aftermath only by the epoch path: DR44, V06 §3.22 (1), V07 §5.6 (4).
  * The camp at the frontier: V06 §3.22 (2), W92, and V07's `approachByGate` row.
  * The per-building yield: V06 §3.22 (3), V02 (6), V03 (4), V07 (3).
  * The lifecycle rows are derived and never stored, an undo re-derives them: V06 §2.12 l.869-870, V01 l.282-283, V07
    l.1036, V02 l.593, V03 l.926, V04 l.873.
* **The decay level (item 123).**
  * One signature at every reader: `decayLevel(doc, lineage, week)` and `decayPeak` in V02 (1)–(2), V03 (2), V04 (1),
    (3).
  * The drawn week everywhere, a scrubbed frame's included.
  * The level is never an input of an epoch rule: V06 (5), V04 (4).
  * The landing: the default age until M6-E (V06 (4), V03 (8), V04 (6), V02 X36, §2.6 step 7, §16 l.18836, R2-36).
  * The thresholds are keyed by lineage and element with epoch component 0 (§6.3, §6.1 l.9351).
* **The dig and the void ledger.** V04 §3.5.7 (d) = V06 §3.18.1 (2a) = T-V6-34. `AccessPassStrategy.run(doc, rules,
  ctx, k, scope?)` appears identically in II.7.6 l.21286, V04 l.323, l.1944, l.2230, l.2298 and V06 l.1028, l.2485
  (R2-12).
* **The village over time.** V07's hand-over (§5.6 (4)) runs through V06 §3.22 and the village epochs (V07 §3.12). V07
  reads the look's rung at the fold's rung in force. The palisade's condition over epochs (V07 l.2536-2538) cites V06
  §3.7.
* **Frame growth at an epoch.** §7.4's frame row (l.11184, R2-24), V06 l.1413 and §3.21's frame row: the frame never
  shrinks; a rung crossing grows it.

## Not run

`docs/validation/bench/doc_checks.py` was not run. This seat writes no design text, and the reference corpus is incomplete
in this checkout, so any clean-room result here would be provisional.
