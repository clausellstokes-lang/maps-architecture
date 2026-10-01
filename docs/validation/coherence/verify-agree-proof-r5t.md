# Agreement check — proof and plan, round 5: tests, bars, calibration and the build plan (verify-agree-proof-r5t)

> PENDING FABLE REVIEW — opus seat coherence/verify-agree-proof-r5t (round-5 agreement check after assemble-r5), standing in for the Fable seat.

PROGRESS
- P1 inputs: brief whole (ROUND-5 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); round-4 report and result (9 issues); adjudication-r5 (R5-01 – R5-10 whole, Part H every unit with its END lines); assemble-r5 (live = its after-hashes, each re-hashed: base `2d84eac2…`, INDEX `90e2844a…` unchanged, V01 `4585e1a5…` … V12 `1e305ebe…`); pre = HEAD 3310b538's text (base `5f34cceb…`) — done
- P2 round-4 VAP-r4-01 – VAP-r4-09 re-checked on the live text under adjudication-r5's dispositions, END lines included — done (all 9 closed: VAP-r4-01 FIXED with its V06 END; 02 – 09 FIXED per R5-10 / R5-05, VAP-r4-05's V08 END as amended)
- P3 repair-touched subsections in scope read by word diff — done (base §3.2 (9)'s insert as §13.1 reads it, §12.5, §12.10's R12-35, §13.1, §13.2 (T76-1, T110-2, T114-3, T121-3), §13.8 (T110, T114 rows), §16's M3b row; every volume's §7 and §8 hunks; V12's 11 hunks; the eighteen repair-r5 HAND-OFFS sections)
- P4 censuses: test ids, take-over both ends, pins, prices, phone; r5t peers' progress lines indexed (none landed) — done
- P5 report and result — done

**Result: 5 issues — 0 blocker, 1 major, 4 minor** (HANDOFF-OPEN 3, MATRIX-GAP 2). Owners: scope 2, V12 1, V08 1,
V07 1. Every round-4 finding is closed on the live text, both END lines included: VAP-r4-01's regrowth clause stands in
T114-3, §13.8 and T-V6-73. VAP-r4-02 – 09 are fixed as R5-10 and R5-05 rule, and VAP-r4-05's V08 end follows Part H's
amended text. Return: `docs/validation/coherence/results/coherence_verify-agree-proof-r5t.json`. Design files untouched.

No issue is a blocker. The one major is a measurement two units define differently. §12.10's R12-35 now times the
drawn-week re-evaluation of Find's chips (R5-05 (b)) by V12's `time.findGlow`. T120-6, its home bar, and V12's statistic
row, §3.15.10 and T-V12-52 still time only a chip's click. The round's two hand-offs for it (rendering → scope, rendering
→ V12) are open, and V12 waits for the home. The four minors are of two kinds. Two are fixtures that tests name and no
fixture list holds: T-V9-85's famine at severity 0.5, whose V09 hand-off to V08 is open, and T-V7-69 (c)'s two count
cases. The other two are lists: V12 §2.13 names "H-AQUA" for a pin whose registration now runs H-AQUA without its two
raised-way edits (V06's hand-off), and the derived fixtures that V08 and V12 register in §13.2's manifest, whose row form
cannot hold them.

## Scope and method

**Members.** scope (§0–§1, §13–§17, INDEX.md) and V01–V12, on the proof-and-plan subjects. These are every test id and bar
(T⟨item⟩-n, T-Vn-m, the take-over of base bars) and calibration (§13.2's convention, §13.8, §12.10's register rows that
name V12 statistics, V12's pins, metrics, register and schedules). They are also the combined build plan (§16) and
INDEX.md, checked against every volume's tests (§7) and build plan (§8). The fabric, layers, time, host, tools, edges and
unit seats hold the other subjects; their r5t seats were running while this seat ran, and their progress lines were read
(below).

**Checks run** (scripts in the seat's scratch folder `agp5/`: round 4's `sec.py`, `census.py`, `takeover.py`,
`pertest.py`, `pins.py`, `tt.py`, `newrefs.py`, `hunks.py` and `wd.py` pointed at this round's copies; pre = assemble-r4's
output at HEAD 3310b538, live = assemble-r5's):
- *Round-4 re-check.* Each round-4 finding was read against the live subsection its required change named, against Part
  H's disposition (FIX, FIX per R5-10, FIX per R5-05, FIX per R5-10 amended) and against each END line's second end.
- *Hunks.* 85 base hunks and 200 volume hunks were listed. Every hunk in scope was read whole in its subsection (word
  diff, pre → live), and every test whose row changed was read whole (`tt.py`).
- *Test-id census on the live set.* 734 volume tests, every family gap-free and unchanged from round 4 (V01 1–60, V02
  1–60, V03 1–40, V04 1–82, V05 1–36, V06 1–76, V07 1–69, V08 1–63, V09 1–87, V10 1–53, V11 0–48, V12 1–59). 341 base
  bars are defined in §13. **0 unresolved references** to a volume test or a base bar in the base, INDEX, the rationale
  or the volumes. No id was added or removed this round.
- *The take-over table's both ends* (`takeover.py`, `pertest.py`). The output is identical to round 4's but for line
  numbers, so no take gap is new. The changed takes match their rows. T-V6-47 takes T110-2's epoch clauses (4) and (5),
  now with (4)'s contraction case. T-V6-73 takes T114-1 – T114-5 save T114-3's landfall clause, now with its regrowth
  clause.
- *Pins* (`pins.py`): the output is identical to round 4's. V12 §2.13's B-CITY entry now reads "on `item105.web`" for
  T-V11-21.
- *Schedules.* §13.8's changed rows (T110's contraction; T114-3's regrowth clause on volume 6's engine) and §16's M3b
  row were checked against the taking tests' cells and each volume's §8. Every drawn-week test clause was checked against
  V06's E6 (R5-05 (c)). Each test whose text reads a frame that is not the head names E6 in its timing cell (T-V1-59 (f),
  T-V1-60 (c), T-V3-39, T-V4-81 (j), T-V5-36 (i), T-V7-68, T-V9-83 (e), T-V9-86, T-V10-51). T-V6-21 and T-V6-76 are
  V06's own, at E6.
- *Prices*: no price or range cell of any §8, of §16, of INDEX or of the rationale changed this round (every whole
  numeric table cell compared, pre against live). Round 2's exact sums stand.
- *Hand-offs*: the eighteen repair-r5 HAND-OFFS sections were read. Each one on tests, fixtures, pins, milestones or
  prices was checked at its destination.
- *Phone census* (item 126 (a2)): 36 mentions before and after, each stating the absence; none added.

## Round-4 findings — status on the live text

| id | owner | grade (Part H) | status | where |
|---|---|---|---|---|
| VAP-r4-01 | scope | major | FIXED | T114-3's regrowth clause (base l. 18558–18564), as written. §13.8's T114 row (l. 19354): "… and T114-3's regrowth clause on volume 6's engine". The runs sentence keeps it with volume 6 (T-V6-73). END at V06: T-V6-73's **the station's regrowth** (V06 l. 4196) and §7's T114-1 – T114-5 row (l. 4117) "the station's regrowth on H-AQUA", both as Part H gives them. V12 §3.15.4's bullet reads "(T114-3's crossing and regrowth clauses on H-AQUA)". The release before the absorb and the `repairWall` bend stand under R5-02 (3)'s held-stretch clause (base l. 2556–2567) |
| VAP-r4-02 | V03 | minor | FIXED per R5-10 | V03 §7's damage fixtures (l. 2853) add the rebuild's `repair` Works on one building of the district and the `infiltrated` stressor (a `none`-row condition), the two parts T-V3-40 (b) and T-V9-86 run |
| VAP-r4-03 | V12 | minor | FIXED per R5-10 | V12 §3.15.4's lead (l. 2507–2509) names V05's T-V5-14 for T114-3's landfall clause. Its T114-1 – T114-3 bullet (l. 2511–2512) names both fixtures. The new last sentence (l. 2529–2530) places T114-9 and T114-10 as §13.8 and the runs sentence do |
| VAP-r4-04 | V12 | minor | FIXED per R5-10 | §3.15.14's T124-9 bullet (l. 2793–2797), the `weather.*` catalogue row (l. 1212) and T-V12-57 (l. 3179) carry the replay's inputs and T124-9's three fixtures, as §13.2 states them (l. 18733–18736) |
| VAP-r4-05 | V12 | minor | FIXED per R5-10, amended | V12 §3.15.12's crisis fixtures (l. 2695–2697) and X-V12-5 (l. 3423) add the two fires. END at V08 §7.1 (l. 3249–3256), in Part H's amended text: `city-1`'s second fire, and a severity-1 fire on `town-1`. Its river parts the districts into two banks, and the target sits on the smaller bank, the harness asserting the bank's count. This agrees with T-V12-54's two passing cases |
| VAP-r4-06 | V04 | minor | FIXED per R5-05 | T-V4-81 (j) (l. 3164): "from the later of U5 and V06's E6, whose history frames (V06 §3.15.2) it reads". V04 §8's U5 cell (l. 3200): "T-V4-81 ((j) at the later of U5 and V06's E6)" |
| VAP-r4-07 | V05 | minor | FIXED per R5-05 | T-V5-36 (i) (l. 2818): "from the later of P3, P6 and V06's E6". V05 §8 (l. 2843, l. 2867–2869) says the same and also schedules (f)'s fall cases at the later of P3 and P6, which builds the landfall |
| VAP-r4-08 | V09 | minor | FIXED per R5-05 | T-V9-83's cell (l. 4434): "M5 (§16); (e)'s scrubbed and drawn-week clauses at the later of M5 and V06's E6 (V06 §3.15.2's frames)". §4.21.10 (15) (l. 3583–3584) says the same |
| VAP-r4-09 | V10 | minor | FIXED per R5-05 | T-V10-51's cell (l. 3144): "…; its drawn-week clause at the later of M5 and V06's E6 (V06 §3.15.2's frames)". V10 §8's C4 cell (l. 3234) says the same |

R5-05's other END lines in scope were also written. T-V1-60's timing cell (V01 l. 3363) has "(c)'s scrubbed-week clause at
the later of M5 and V06's E6". T-V3-39's timing cell (V03 l. 2906) and V03 §8's P4 cell (l. 2943) have "its scrub across
the run at the later of P4 and V06's E6". T-V1-59's cell (l. 3362) schedules (c)'s epoch cases with the M6-E exits that
provide them, and (f) at the later of those and E6 (VV12-r4-04). T-V7-68's cell (V07 l. 3701) and V07 §8 (l. 3735,
l. 3814–3815) use "the latest of V-M3, M5 and V06's E6", Part H's amended text for VAF-R4T-02.

## Agreement confirmed (no issue)

- **R5-02 at every test.** T110-2 (base l. 18478–18506) is R5-02's (S1) text word for word, with VV34-r4-01's
  frame-growth end (l. 18469–18471). T-V6-47 (V06 l. 4170) runs (4)'s and (5)'s epoch cases on H-AQUA: the circuit across
  its aqueduct, the circuit across its timber elevated road, the contraction within p ÷ 2 of the CITY ring's crossing
  station, the stage growth and the route re-solve. Each is run again locked, with no station taken, no gate on a deck
  and no run above a soffit. V06 §7's T110-2 row (l. 4114), the take-over's evolution row (l. 18762) and §13.8's T110
  row (l. 19343) list the same cases. T-V9-52 (V09 l. 4404) runs (4)'s and (5)'s hand cases: the wall beneath the deck
  with `bend.wall.raisedCrossing`, the delete keeping the gate tower with `bend.wall.held`, and the wide road with
  `bend.raised.around`. Those are R5-02's V09 lines, and V09 §4.9 holds the `bend.raised.around` row (l. 2103).
  T-V4-63 and T-V4-65 (V04 l. 3146, 3148) are R5-02's V04 lines and VV34-r4-01's end. T-V7-48 (V07 l. 3681) is Part H's
  amended VAL-R4-03 text. No test in the set keeps "through one station on the deck", "a trace's crossing station" or
  "the last support run".
- **R5-03 in the tests.** T76-1 (l. 18234–18248) carries both new fixtures: the second absorb in the last epoch's own week,
  and the late non-calamity change folded at `W₀` + 1. T-V8-49 (g) (V08 l. 3311) runs the same two, with
  `DossierBinding.lateCalamities` and the `late` note. Both read §4.11 *The clock* (4) (l. 8476–8487), whose held list
  is §7.7's `lateCalamities` (l. 11825). §13.8's T76-1 row stands at M3a, its coarsened fixture with M6-E.
- **R5-10's catch-up fixtures.** V06 §6.8 (6) (l. 4023–4024), V08 §6's absorb-with-epochs row (l. 3220), T-V8-63
  (l. 3325) and J-V6.136 / J-V8 each say "T-V6-24's three catch-up fixtures". Each names the over-budget one (5 000 at the
  METROPOLIS cap) as taking the one-epoch fold, reported F-BUDGET-TIME, by design. The per-event cost is 3 ms at TOWN and
  CITY and 3.5 ms at the METROPOLIS cap, equal to V06 §6.8 (1)'s `a` (l. 3976).
- **R5-10's crisis-week cap.** V08 §7.1 (l. 3246–3247): "one on a copy of `metropolis-3` mutated test-side to the
  population cap's 120 000 people", the case V12's T-V12-54 names.
- **R5-08's tests.** T-V9-85 (l. 4436) and T-V9-86 (l. 4437) carry the preview's why line, the open form and the famine's
  field. T-V9-86's scrubbed-week clause is scheduled at E6. T-V10-52 (V10 l. 3145) carries `.lineUnnamed` and
  `.lineUnnamedOpen`. T-V10-50 clause (33) carries the `building` read with no `over`. The famine clause's fixture is
  VAP-r5-02.
- **R5-04's fixtures.** V02 §7.8's fixture (l. 3744–3754) adds the reoccupied house whose re-cut mints rooms while its
  `repair` Works runs (T-V3-39 (c)'s case), and its bar (l. 3764–3778) draws them as built in every week.
- **R5-09's test.** T-V9-80's clause (21) (V09 l. 4432) = edge row 21 (l. 1526) = R5-09's removed-target rule.
- **§16's M3b row** (l. 20276): the `disaster` look's units come from V01's `disasterSource` at M5 (W10); at the village
  rungs they come from V07's `villageDisasterUnits` and `villageUnitPlots` at V-M3. This agrees with V07 §5.6 (8)
  (l. 3532–3534), V07 §8 (14) (l. 3815–3818) and T-V7-69's cell. The price is unchanged.
- **T114-9 and T114-10** in V12's new sentence (l. 2529–2530) agree with §13.8's rows (l. 19369–19370) and the runs
  sentence (V07's T-V7-59, V06's T-V6-73).
- **The V12 → V11 hand-off** (VV1112-r4-04): V11 §3.24.2 (l. 3961) and §8 (l. 5148–5149) route `clearWidthM` and
  `squareDeg` to V12 §3.11's default line (l. 2042–2043) and `stripMarginM` to the `raisedWays.structure` line
  (l. 2176). V12 and V11 agree.
- **The weather press.** §6.1's "a further press before then changes nothing" (l. 9595–9596) stands with V09's button,
  which is disabled while a pressed spell waits (§4.21.14 (4), T-V9-87). No press is made, so the outcomes agree.
- **Prices**: unchanged this round in every §8, §16, INDEX and the rationale.

## Overlaps with the running r5t verifiers (not raised again, or raised once with a note)

verify-rendering-r5t's progress line marks VRC4T-04 "PARTLY: T120-6 and V12 time.findGlow lack the drawn-week clause".
That is VAP-r5-01's defect, seen from rendering's end. One fix closes both: the adjudicator merges them or takes either
id. verify-vol-V07-V08-r5t's candidates (V08's late note words, T-V8-61's reopen fixture, V08 §6) are not raised here.
verify-model-r5t's and verify-agree-layers-r5t's candidates on §2.7 (3), (6) (d) and §4.8 are fabric and layers subjects.
§13.1's frame-and-arena figures (3 373 m, 4 293 m, 5 397 m; VKr4-02's fixture) are the kernel's arithmetic and were
not re-derived here.

## Matrix gaps found (shared subjects the matrix holds no row for)

- Find's drawn-week re-evaluation timing (§12.5, R12-35, T-ER-25, T120-6, V12's `time.findGlow`, T-V12-52): **V12's
  statistic and T120-6 omit it** (VAP-r5-01).
- T-V9-85's famine fixture (V09, V08 §7.1, V12 §3.15.12): **no severity named** (VAP-r5-02).
- The `item110.*` pin's H-AQUA suite (V06's T-V6-65, V06 §7's E1 line, V12 §2.13): **the variant unnamed at V12**
  (VAP-r5-03).
- T-V7-69 (c)'s count cases (V07, V01 §3.16 (5), V07 §5.6 (3)): **no fixture** (VAP-r5-04).
- The derived dossier fixtures (§13.2's manifest; V12 §1b, V12's spec `dossier` field and §3.6b; V08 W93, §7.1): **no row
  form at the home** (VAP-r5-05).

## Issues

| id | sev | kind | owner | subject |
|---|---|---|---|---|
| VAP-r5-01 | major | HANDOFF-OPEN | scope | T120-6 and V12's `time.findGlow` time only a chip's click; R12-35 measures the drawn-week re-evaluation by that statistic |
| VAP-r5-02 | minor | HANDOFF-OPEN | V08 | T-V9-85's famine at severity 0.5 "(V08 §7.1)": V08 §7.1 names no famine severity |
| VAP-r5-03 | minor | HANDOFF-OPEN | V12 | V12 §2.13's `item110.*` row names "H-AQUA"; T-V6-65 runs H-AQUA without its two raised-way edits |
| VAP-r5-04 | minor | MATRIX-GAP | V07 | T-V7-69 (c)'s two count cases (more named ends than k; a fire order ending before k) have no fixture |
| VAP-r5-05 | minor | MATRIX-GAP | scope | §13.2's fixture manifest has no row form for the derived fixtures V12 and V08 register in it |

### VAP-r5-01 — HANDOFF-OPEN, major, owner scope

**Claim.** R5-05 (b) set a budget: a change of the drawn week re-evaluates the chips within ≈ 100 ms of the frame being
drawn, at the METROPOLIS cap. Rendering wrote it at §12.5 (base l. 17176–17179) and at T-ER-25's bar (l. 14753): "the
chips re-evaluated within ≈ 100 ms of each scrubbed frame being drawn … the scrub clauses from the later of M5 and V06's
E6". It also wrote it at §12.10's R12-35 (l. 17527). R12-35 names its measure as "V12 §3.15.10's `time.findSuggest`
and `time.findGlow` (the glow from a chip's click, and from a scrubbed week's frame being drawn) … the scrubbed week's
from the later of M5 and V06's E6", with the bar "≤ 100 ms (T120-6; T-ER-25)".

The other two homes of the same timing still time only the click. The bar R12-35 cites, T120-6 (l. 18662–18663), reads
"a chip's glow within ≈ 100 ms of its click (`time.findSuggest`, `time.findGlow` …)". §13.8's T120-6 row (l. 19373)
reads "M5". V12's statistic follows the base bar: its catalogue row (V12 l. 1172) reads "a chip's click to its matches'
glow drawn", and §3.15.10's T120-6 bullet (l. 2641–2643) says the same. T-V12-52 (l. 3174), which takes T120-6, plants
no re-evaluation time and runs at M5 alone.

VRC4T-04 asked that "R12-35's row and T120-6 add that timing", and R5-05's sweep lists "R12-35 and T120-6". Part H gives
no END line for T120-6, which is scope's text. Rendering's two hand-offs, to scope and to V12, are open
(repair-r5-rendering l. 133–141). V12 declined to write ahead of its home (repair-r5-V12, "Hand-offs received").

So the register's third bar reads a measurement that V12's statistic, as specified, never takes. A builder following V12
times only clicks. A builder following R12-35 also times the scrubbed frame. MAJOR: two builders build different
behaviour, and the register needs an input that has no producer (VAP-r2-11's grade for a V12 statistic narrower than its
base home).

**Required change.** §13.2's T120-6, after "a chip's glow within ≈ 100 ms of its click": add ", and at a drawn week
whose frame is not the head the chips re-evaluated within ≈ 100 ms of that frame being drawn, the frame never waiting for
them (§12.5; that clause from the later of M5 and V06's E6, V06 §3.15.2's frames)". §13.8's T120-6 row's milestone cell
"M5" → "M5 (its drawn-week clause at the later of M5 and V06's E6)".

V12's end, for an END line:
- The catalogue row (l. 1172), "a chip's click to its matches' glow drawn" → "a chip's click to its matches' glow drawn,
  and a drawn week's frame (one that is not the head) drawn to its chips' re-evaluated glow drawn (from the later of M5
  and V06's E6)".
- §3.15.10's T120-6 bullet, "`time.findGlow` (a chip's click to its matches' glow drawn)" → "`time.findGlow` (a chip's
  click, and a scrubbed week's frame being drawn, to its matches' glow drawn — the latter from the later of M5 and V06's
  E6)".
- T-V12-52, after "a planted suggestion time above §12.5's budget at the METROPOLIS cap fails its timing row": add "and a
  planted re-evaluation drawn more than 100 ms after a scrubbed week's frame fails `time.findGlow`'s".
- T-V12-52's cell, "M5 (Find's milestone, §16)" → "M5 (Find's milestone, §16); its scrubbed-week glow at the later of M5
  and V06's E6 (V06 §3.15.2's frames)".

### VAP-r5-02 — HANDOFF-OPEN, minor, owner V08

**Claim.** R5-08 (c) gave a famine look a `field` read. V09 wrote its test into T-V9-85 (V09 l. 4436): "on a dossier
crisis fixture with a famine at severity 0.5 (V08 §7.1), the why card of a bare field carries `info.crisis.ruinedFor`
and that of a field left sown none". V08 §7.1's crisis fixtures (V08 l. 3242–3246) hold "… a famine, a fire, a flood and
an earthquake … each standing through part of the year at its severity". They name no severity for the famine, and
V12 §3.15.12 (l. 2693) and X-V12-5 restate them the same way. The clause needs a severity below 1, since at 1 every
field is bare. V09's hand-off to V08 and V12 (repair-r5-V09 l. 120–122) is open. V12 declined it as V08's ("the severity
belongs in V08 §7.1, which X-V12-5 then cites"). This is a fixture list that omits a case its test names, so the grade is
minor (R5-01).

**Required change.** V08 §7.1's crisis fixtures (l. 3244): "a plague with its affected quarter, a famine, a fire" → "a
plague with its affected quarter, a famine at severity 0.5 (its look baring part of the arable faces and leaving the
rest sown, V09's T-V9-85), a fire".

### VAP-r5-03 — HANDOFF-OPEN, minor, owner V12

**Claim.** Round 5 changed the `item110.*` pin's H-AQUA suite. T-V6-65 (V06 l. 4188) now runs its pins "over H-100,
H-AQUA (run without the two raised-way edits its fixture logs — the viaduct row's `editTable` and the declared elevated
road — so that the overlay's off form governs it), H-TERRACE and H-DECK". R5-10 (VV56-r4-02) gave H-AQUA those two
edits (V06 l. 4063–4072). A pin's overlay leaves the cells editable, so with the edits kept the history under the overlay
would hold raised ways. V12 §2.13's `item110.*` row (V12 l. 922) still lists "H-100, H-AQUA, H-TERRACE, H-DECK (V06,
T-V6-65)". V06 §7's E1 registration line (V06 l. 4275) reads "(H-100, H-AQUA, H-TERRACE, H-DECK; T-V6-65)". R3-26 makes
V12 §2.13's suites column exactly the union of the registering clauses. V06's hand-off asks "a verifier checks that the
two agree" (repair-r5-V06, HAND-OFFS), and they differ in form. The registering seat runs what T-V6-65 states, so
nothing built changes. MINOR.

**Required change.** V12 §2.13's `item110.raised`, `.terrace`, `.deck`, `.stepped` row (l. 922): "H-100, H-AQUA,
H-TERRACE, H-DECK (V06, T-V6-65)" → "H-100, H-AQUA without its two raised-way edits (the CITY viaduct row's `editTable`
and the declared elevated road), H-TERRACE, H-DECK (V06, T-V6-65)". V06's end, for an END line: §7's E1 line (l. 4275)
"(H-100, H-AQUA, H-TERRACE, H-DECK; T-V6-65)" → "(H-100, H-AQUA without its two raised-way edits, H-TERRACE, H-DECK;
T-V6-65)".

### VAP-r5-04 — MATRIX-GAP, minor, owner V07

**Claim.** R5-06 (VAF-R4T-01) gave T-V7-69 (c) (V07 l. 3702) V01 §3.16 (5)'s count at the village rungs, with two cases:
"on a VILLAGE fixture whose calamity names more ends than k (every named end struck) and on a fire whose order ends
before k (the shortfall reported)". T-V7-69's fixture list holds neither. It names "THORP (P = 1, 40), HAMLET and VILLAGE
(P = 1 499) fixtures — … each look kind previewed … and, from M-SF, a dossier fixture carrying each mapped condition,
among them a disaster whose rebuild Works begin on some of an end's buildings inside its weeks". A preview has no
targets, so it cannot name ends. A village fire's order ends before k only on a village where an end has no `neighbours`
unit (V07 §5.6 (3), l. 3480–3485: no plot sharing a boundary or a way segment with another end's). No fixture is said to
have that shape. This is R5-10's class: a test names a case that no fixture list carries, as VAP-r4-05 was at the town
rungs, where V08 §7.1 now names `town-1`'s two banks. The test text states the cases, so the grade is minor.

**Required change.** T-V7-69's fixture list: after "among them a disaster whose rebuild Works begin on some of an end's
buildings inside its weeks" add "; and two test-side mutations of one of V07 §7's frozen small-dossier VILLAGE fixtures,
each from M-SF — a calamity whose `targets` name uses on more ends than its severity's share k of the village's units,
and a fire at severity 1 whose `targets` name a use on an end that no other end neighbours (V07 §5.6 (3)'s `neighbours`:
an end parted from the rest by a water face or by land no plot of either touches), its order ending at that end before
k, the harness asserting the end's isolation before the clause reads it".

### VAP-r5-05 — MATRIX-GAP, minor, owner scope

**Claim.** V12 and V08 register derived dossier fixtures in §13.2's fixture manifest:
- V12 §1b (V12 l. 207–209): "the derived fixtures registered in §13.2's frozen fixture manifest (item 84; §17.1 (3) makes
  it the one door for a dossier into `plat/`)". The population row (l. 211) gives "a derived fixture `<dossier>@pop×k`
  in the manifest".
- V12's spec field `dossier` (l. 633): "a fixture id of the frozen manifest …, a derived '<dossier>@pop×k' included".
- V12 l. 1419: a population sweep or a landmark "enters as a fixture record of the frozen manifest".
- V08 W93 (V08 l. 320) and V08 §7 (l. 3354): "their `@pop×k` derivatives registered in the frozen manifest".
- V08 §7.1 (l. 3242): V12's item-122 and item-125 fixtures are "test-side mutations made here (X-V12-5), each in
  §13.2's frozen manifest". This round added three such mutations: the `metropolis-3` cap copy, `city-1`'s second fire
  and `town-1`'s severity-1 fire (V08's hand-off to scope).

The home cannot hold them. §13.2's manifest (base l. 18307–18316) "holds one row per file". `DossierFixtureRow.kind` is
`'birth'|'after-events'|'after-ticks'|'world-state'`, with no derived kind and no field naming a source file and its
mutation. V08 §7.1 also says a mutation is "never written back into a fixture file". So a harness built to the base has
no row for `town-1@pop×2` or the crisis copies, and one built to V12 looks them up there. The derived content is stated
in each case, so nothing built or tested changes. This is a list that omits an id its readers name, graded minor.

**Required change.** §13.2's manifest paragraph: "Their `manifest.json` holds one row per file:" → "Their
`manifest.json` holds one row per file, and one per derived fixture a volume names — a run-time, test-side mutation of
one file, never written as a file (V12 §1b's `<dossier>@pop×k` levels; V08 §7.1's crisis, force and required-keys
fixtures):". `DossierFixtureRow`'s `kind` union adds `'derived'`, and the interface adds `derivedFrom?: { file: string;
mutation: string /* the mutation as its volume names it — '@pop×k', or the V08 §7.1 fixture's name */ } /* kind
'derived' only: its source row's file; the harness makes it at run time */`.
