# Agreement check — proof and plan, round 4: tests, bars, calibration and the build plan (verify-agree-proof-r4t)

> PENDING FABLE REVIEW — opus seat coherence/verify-agree-proof-r4t (round-4 agreement check after assemble-r4), standing in for the Fable seat.

PROGRESS
- P1 inputs: brief whole (ROUND-4 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); round-3 report and result (10 issues); adjudication-r4 (R4-01, R4-11 – R4-16, R4-03, R4-04, Part H for every unit with its END lines); assemble-r4 (live = its after-hashes, each re-hashed: base `5f34cceb…`, INDEX `90e2844a…` unchanged, V01 `a0c15b71…` … V12 `2db3c8c9…`); pre = HEAD 96bdae26's text (base `593c657d…`) — done
- P2 round-3 VAP-r3-01 – VAP-r3-10 re-checked on the live text under adjudication-r4's dispositions, END lines included — done (all 10 closed: 7 FIXED, 3 FIXED per R4-11)
- P3 repair-touched subsections in scope read by word diff: base §0.2, §12.10, §13.1, §13.2 (13 hunks), §13.8 (3), §14, §16; V12's 31 hunks whole; every volume's §7 and §8 hunks (V01 2, V02 3, V03 4, V04 2, V05 6, V06 13, V07 1, V08 8, V09 2, V10 5, V11 7); INDEX untouched; the eighteen repair-r4 HAND-OFFS sections — done
- P4 censuses: test ids, take-over both ends, the pin union, prices, phone; the 76 issues of the sixteen landed r4t peers indexed — done
- P5 report and result — done

**Result: 9 issues — 0 blocker, 1 major, 8 minor** (DISAGREE 6, MATRIX-GAP 2, HANDOFF-OPEN 1). Owners: V12 3, scope 1,
V03 1, V04 1, V05 1, V09 1, V10 1. Every round-3 finding is closed on the live text (VAP-r3-03 – 05 as R4-11 rules), with
both END lines written (VAP-r3-06's §13.8 row, VAP-r3-09's V12 head) and R4-11's sweep ends at scope's T122-2 and V12's
four sites. Return: `docs/validation/coherence/results/coherence_verify-agree-proof-r4t.json`. Design files untouched.
No issue is a blocker. The one major is an untested branch: a raised way repaired beside a crossing station whose
stretch is `dismantled`. Round 4 wrote that branch in V06 §3.19.2 (5); no bar runs it, and the model seat's hand-off naming
it is unwritten. The minors are of two kinds. Three are fixture or restatement lists left behind by round-4 texts: V03's
damage fixtures, V12's item-114 lead, and V12's T124-9 run and T-V12-54's fire cases. Four are Find's drawn-week clauses,
scheduled at milestones that can come before V06's history frames (E6). INDEX §5 risk 2's rule ("each named in its
volume") settles them, as the peer's VV12-r4-04 graded V01's.

## Scope and method

**Members.** scope (§0–§1, §13–§17, INDEX.md) and V01–V12, on the proof-and-plan subjects: every test id and bar (T⟨item⟩-n,
T-Vn-m, the take-over of base bars), calibration (§13.2's convention, §13.8, V12's pins, metrics, register and schedules),
the combined build plan (§16) and INDEX.md against every volume's tests (§7) and build plan (§8). The fabric, layers, time,
host, tools, edges and unit seats hold the other subjects; their landed r4t findings were read first and are not raised
again (list below).

**Checks run** (scripts in the seat's scratch folder `agp4/`: round 3's `sec.py`, `census.py`, `takeover.py`, `pertest.py`,
`pins.py`, `tt.py` pointed at this round's copies, and `hunks.py` and `wd.py` for this round's hunks; pre = assemble-r3's
output at HEAD 96bdae26, live = assemble-r4's):
- *Round-3 re-check.* Each round-3 finding against the live subsection its required change named, against Part H's
  disposition (FIX, or FIX per R4-11 for VAP-r3-03 – 05) and against each END line's second end.
- *Hunks.* Every round-4 hunk in scope read whole in its subsection (word diff, pre → live); every test whose row changed
  read whole (`tt.py`).
- *Test-id census on the live set.* 734 volume tests, every family gap-free (V01 1–60, V02 1–60, V03 1–40, V04 1–82,
  V05 1–36, V06 1–76, V07 1–69, V08 1–63, V09 1–87, V10 1–53, V11 0–48, V12 1–59). T-V8-63 is new (R4-16's identity bar),
  run at SF7 and named in V08 §6's row, W89 and J-V8.137. 341 base bars defined in §13. **0 unresolved references** to a
  volume test or a base bar in the base, INDEX, the rationale or the volumes.
- *The take-over table's both ends* (`pertest.py`), test by test. Round 3's open registration heads are all present now
  (T-V8-59, T-V10-45, T-V11-38 – T-V11-41, T-V12-44 – T-V12-49). The new takes match their table rows: T-V6-47 takes T110-2's
  epoch clauses (4) and (5), T-V5-14 T114-3's landfall clause, and T-V6-73 T114-1 – T114-5 save that clause. The remaining
  name-only hits are references, as in round 3 (T-V9-87's "(§6.1; T124-9)" is new and a reference).
- *Pins* (`pins.py`): the only change is T-V11-19's `item106.barrier` and T-V11-21's `item105.web` registrations, now in
  V12 §2.13, §3.7.8 and X-V12-11. §3.7.8's list equals X-V12-11's, V07's tests written "V07's pins" in the latter. The
  row's `item107.spread` qualifier is the peer's VV1112-r4-02.
- *Schedules*: §13.8's changed rows (T76-1's coarsened fixture with M6-E; T110-2's (4)–(5) with M6-E's E2 and E3; T114's
  H-AQUA and landfall clauses with M6-E and M6-sky) and §16's M6-U row against the taking tests' cells and each volume's §8.
  The drawn-week clauses of Find against V06's E6 (VAP-r4-06 – 09).
- *Prices*: no price cell of any §8, of §16, of INDEX §1 or of the rationale changed this round (a scan of every range cell,
  pre against live); round 2's exact sums stand.
- *Hand-offs*: the eighteen repair-r4 HAND-OFFS sections read; each one on tests, fixtures, pins, milestones or prices
  checked at its destination.
- *Phone census* (item 126 (a2)): 39 mentions before and after, each stating the absence; none added.

## Round-3 findings — status on the live text

| id | owner | grade (Part H) | status | where |
|---|---|---|---|---|
| VAP-r3-01 | V12 | major | FIXED | V12 §3.15.12's head (l. 2685–2689): "the `disaster` preview's district clauses (its units, scale and placement under T122-2, T122-3, T122-5 and T122-6) from M5, when V01's W10 lands"; T-V12-54's cell (l. 3167); W7's M3b and M5 cells (l. 3211); §6's item-122 row (l. 3085); §3.15's lead (l. 2455) and §8.1 (l. 3193) the same |
| VAP-r3-02 | V12 | major | FIXED | the `layout.touch` row (l. 1214) "with `AppPrefs.touch.editFabric` on (V09 §4.12; §13.4's fallback changes only its default)"; §3.15.16's T126-1 bullet (l. 2815–2817); T-V12-59 (l. 3172); the sweep reached the planted-fault row (l. 2342) and edge row 37 (l. 2883) |
| VAP-r3-03 | V02 | major | FIXED per R4-11 | T-V2-60 (e) and (g) (l. 3790–3799) read R4-11's text; the look fixture (l. 3749) carries the `infiltrated` stressor (a `none`-row condition, V11's map row l. 4573) that (e) runs; V02 §3.18's row (l. 2523) names the `none`-row case |
| VAP-r3-04 | V03 | major | FIXED per R4-11 | T-V3-40 (b) (l. 2907) and the edge row (l. 2095) read R4-11's text (the fixture list's omission is VAP-r4-02) |
| VAP-r3-05 | V04 | major | FIXED per R4-11 | T-V4-82 (i) (l. 3167): "under View as at `public`, `local` and `secret` the same drawing, the condition `public` (§7.7's DR44), and a `none`-row condition carried beside it changing no crypt's drawing at any key" (the fixture inline) |
| VAP-r3-06 | V06 | minor | FIXED | T-V6-73's crossing-station clause on H-AQUA (l. 4181) and V06 §7's row (l. 4102); END at scope: §13.8's row (l. 19262) "the milestone tier over H-100's epochs and H-AQUA's for T114-3's crossing clause" |
| VAP-r3-07 | V11 | minor | FIXED | T-V11-19 (l. 5008) registers `item106.barrier` (C4a seat), T-V11-21 (l. 5010) `item105.web` (C2 seat) |
| VAP-r3-08 | V12 | minor | FIXED | §2.13 (l. 919–920) names T-V11-21 and T-V11-19; §3.7.8 (l. 1715) and X-V12-11 (l. 3420) list both (the row's missing `on item105.web` is the peer's VV1112-r4-02) |
| VAP-r3-09 | scope | minor | FIXED | §0.2's item-122 row (l. 261) "volumes 1, 2, 3, 4, 6, …"; §13.2's runs list (l. 18613) "volume 4's look below ground (T-V4-82 (i))"; END at V12: §3.15.12's head (l. 2684) "V04's T-V4-82 (i)" |
| VAP-r3-10 | V12 | minor | FIXED | §3.15.6 (l. 2543–2544): "every export within the limit bounds — the whole bounds at most, a whole-bounds export at the cap framing them, §8.7" |

## Agreement confirmed (no issue)

- **R4-11 at every site.** T122-2 (base l. 18596–18597) = V12's registry row (l. 1208), §3.15.12's T122-2 bullet
  (l. 2697–2701), the planted-fault row (l. 2338), edge row 33 (l. 2879) and T-V12-54. T-V2-60 (e), (g), T-V3-40 (b),
  T-V4-82 (i), T-V9-85 and T-V10-52 (its fixture carrying the `infiltrated` stressor) read the same. No test stages a key
  that withholds a look-bearing condition.
- **R4-06 (a barrier across a way)**: T122-6 (l. 18604) = V12's five `crisis.blocked` statements = T-ER-27; no
  carriageway statement in the set keeps the barricade-only form.
- **R4-10 (Auto while the view is settled)**: T121-2 (l. 18579–18581) = V09 §4.21.11 (2) = T-V9-83 (T121-7); no "next
  settle" left in the set.
- **R4-16 (the catch-up batch)**: V08 §6's row = V06 §6.8 (1)'s `b` (150 / 500 ms per epoch) and `a` (3 / 3.5 ms per
  event). The row's three target fixtures = T-V8-63's = T-V6-24's three catch-up fixtures. T-V8-63 runs at SF7 (V08 §8)
  and is cited by W89 and V06 §6.8 (6). The fourth, over-budget fixture's wording is the peers' VV56-r4-03 and VV78-r4-05 (c).
- **R4-07 and R4-08**: T-V6-70's present-week fire and 0-years-ago event = T-V8-51's latest-tick calamity. T76-1's new
  cadence fixtures (l. 18169–18175, the coarsened one "from M6-E") = §13.8's T76-1 row (M3a, "the coarsened catch-up
  fixture with M6-E") = T-V8-49 (g)'s late calamity.
- **R4-09 in the tests**: T110-2's fixtures (1)–(5) (l. 18405–18420) = T-V6-47's H-AQUA clauses = V06 §7's new row
  (l. 4099) = the take-over evolution row = §13.8's T110 row (E2 and E3; T-V6-47 at E3). T-V9-52's hand cases cite
  T110-2, and T-V4-63's vault clause reads §2.7 (6) (b) (iii). T114-3's crossing and landfall clauses = T-V6-73 = T-V5-14
  = T-V6-11's second run (dismantled only after both spans fell) = the take-over rows (l. 18670–18671) = §13.8 (l. 19262)
  = V05 §7's lead.
- **R4-13**: `crisis.scale`'s second count (V12 l. 1208, l. 2709) = V01 §3.16 (5)'s max(k, |`matched`|) and shortfall
  (T-V1-60 (a)). Its fixtures are VAP-r4-05.
- **R4-03**: T-V6-76 (b)'s running-repair re-cut = T-V3-39 (c)'s new clause, both citing V06 §3.23 (3).
- **R4-12's readings**: T-V1-59 (f), T-V4-81 (j), T-V5-36 (i) and T-V9-83 (e) read §11.2's *At a drawn week* as the base
  states it. Their schedules are VAP-r4-06 – 09 (and the peer's VV12-r4-04).
- **The take-over's new registration heads** (VCS-r3-01 – 05): T-V8-59, T-V10-45, T-V11-38 – T-V11-41 and T-V12-44 –
  T-V12-49 each name exactly the bars the calibration and content rows give them.
- **§16's M6-U row** ("item 123's damage below ground at the later of U5 and V03's P4 (V04 §5.6 (6))") = V04 §8's U5 cell =
  T-V4-82's "(at the later of U5 and V03's P4)". INDEX states nothing on it.
- **V10's C4 row** ("a disaster look's units (§10.2 (d)) with V01's W10 at M5 (V07's W84 at the village rungs)") = V07's
  W84 = T-V10-52's "its disaster district's from M5".
- **Prices**: unchanged this round in every §8, §16, INDEX §1 and the rationale; round 2's exact sums stand.

## Overlaps with the landed r4t verifiers (not raised again)

The H-AQUA definition lacking the viaduct, raised gate and timber elevated road that T-V6-47 and T-V6-73 run (VV56-r4-02).
V06 §6.8 (6)'s and V08 §6's "T-V6-24's fixtures" beside its new over-budget fixture (VV56-r4-03, VV78-r4-05 (c)).
V12 §2.13's B-CITY suite with no "on `item105.web`" (VV1112-r4-02; the two repair seats' hand-offs pointed opposite ways,
and the peer's fix at V12 matches T-V11-21's claim). T121-3's "reference views" (VCS-r4-01, VRC4T-06; rendering's
hand-off). §16's M3b row naming no village units (VAF-R4T-04; V03's hand-off). T110-2 lacking a locked Re-derive fixture
(VM-R4T-02; the model's hand-off, part one). T-V1-59 (f)'s exit before V06's frames (VV12-r4-04). The three-crisis week
at the METROPOLIS cap (VV1112-r4-01, VV78-r4-08). T-V10-51's and V10 §3.9b (7)'s superseded frame wording (VAT-r4-03,
VAH-r4-02). V07's Find over committed records at a drawn week (VAF-R4T-02). §11.2's Find index rebuild at a drawn week
(VRC4T-04).

## Matrix gaps found (shared subjects the matrix holds no row for)

New shared subjects of this round, each judged:
- The raised-way repair beside a crossing station whose stretch is `dismantled` (V06 §3.19.2 (5), T114-3, T-V6-11,
  T-V5-14, the model's hand-off): **untested**, open at scope (VAP-r4-01).
- T-V3-40's disaster fixture, read by T-V9-86 (V03 §7, V09): **omits** the `none`-row condition and the rebuild Works
  (VAP-r4-02).
- T114-3's landfall clause and who runs it (§13.2, the take-over, §13.8, V05, V06, V12): **omitted** at V12 §3.15.4
  (VAP-r4-03).
- T124-9's replay inputs and fixtures (§13.2, §6.5 (9), V09's T-V9-87, V12): **differ** at V12 (VAP-r4-04).
- The disaster fire's target and shortfall cases (V12's T-V12-54, V01 §3.16 (5), X-V12-5, V08 §7.1): **no fixture**
  (VAP-r4-05).
- Find's drawn-week clauses and V06's history frames (§11.2, V01, V04, V05, V09, V10, V06 §8, INDEX §5): **unscheduled**
  at V04, V05, V09, V10 (VAP-r4-06 – 09; V01 the peer's).

## Issues

| id | sev | kind | owner | subject |
|---|---|---|---|---|
| VAP-r4-01 | major | HANDOFF-OPEN | scope | a raised way repaired beside a crossing station whose stretch is `dismantled` (V06 §3.19.2 (5)'s `repairWall` bend) is run by no bar |
| VAP-r4-02 | minor | MATRIX-GAP | V03 | V03's damage fixtures hold neither the `none`-row condition nor the rebuild Works that T-V3-40 (b) and T-V9-86 run |
| VAP-r4-03 | minor | DISAGREE | V12 | V12 §3.15.4 omits volume 5's T114-3 landfall clause (T-V5-14) |
| VAP-r4-04 | minor | DISAGREE | V12 | V12's `weather.replay` and T124-9 bullet omit the replay's inputs and the three fixtures T124-9 now names |
| VAP-r4-05 | minor | MATRIX-GAP | V12 | T-V12-54's two fire passing cases (more targets than the count; a short fire order) have no fixture |
| VAP-r4-06 | minor | DISAGREE | V04 | T-V4-81 (j) reads V06's history frames but runs at U5, which can precede V06's E6 |
| VAP-r4-07 | minor | DISAGREE | V05 | T-V5-36 (i) reads V06's `advance` and frames but lands with P3, which can precede V06's E6 |
| VAP-r4-08 | minor | DISAGREE | V09 | T-V9-83 (e)'s scrubbed and drawn-week clauses run at M5, which can precede V06's E6 |
| VAP-r4-09 | minor | DISAGREE | V10 | T-V10-51's drawn-week clause runs from M5, which can precede V06's E6 |

### VAP-r4-01 — HANDOFF-OPEN, major, owner scope

**Claim.** Round 4 wrote both regrowth branches of a raised way's repair beside a crossing station. V06 §3.19.2 (5) (V06 l. 2935–2943, the END of VEW-r3-04): 'beside a crossing station whose stretch is `breached` or `dismantled`, a `repairWall` of that stretch first, in the same batch, … a `dismantled` stretch taking the op's bend, a new stretch drawn on its line (V06 §2.8) — so no deck stands on a fallen wall'. The `dismantled` stretch is reachable on the ordinary decline and regrowth path. T114-3's new clause (base l. 18469–18471) lets a crossing station whose spans have both fallen keep its stretch 'as a wall run', and T-V6-11's second run (V06 l. 4119) dismantles it by `absorbWall` 'from the epoch after both spans beside its crossing station have fallen'. A raised way whose reason is live again is then repaired by (5). Only the `breached` branch has a bar: T114-3's landfall clause on T-V5-14 (V05 l. 2556–2562), by hand and by V06 §3.19.2 (5). The `dismantled` branch runs a different op, `repairWall`'s bend drawing a new stretch on the line, and no bar or volume test runs it. T-V6-11 runs a hand `repairRaised` on a dismantled span and a hand `repairWall` on a dismantled stretch, each alone; T-V6-61 runs ruined spans with no station; T-V6-73 runs only the station's decay. The model seat's round-4 HAND-OFF to scope names this fixture ('a `repairRaised` beside a station whose stretch is `dismantled` (the stretch re-laid with the deck, never a deck on a gap)'). Its sibling fixture (a locked Re-derive) is the peer's VM-R4T-02; this one is open. Principle (11): an untested edge is a MAJOR.

**Required change.** §13.2's item-114 group, T114-3, after '… the stretch repaired with the deck, never a deck on a breached run;': add 'its regrowth clause: on a CITY fixture whose aqueduct crosses the ring at a crossing station, both spans beside the station toppled (as T-V6-11's second run), then the curtain absorbed (`absorbWall`, the stretch `dismantled`), then the aqueduct repaired — by a hand `repairRaised` and, on a second run, by V06 §3.19.2 (5) at the first epoch its reason is live — the stretch re-laid on its line by `repairWall`'s bend in the same batch before the spans (item 114's patch material), never a deck over a gap at any commit, and the hand repair's undo restoring the gap and both fallen spans;'. The runs sentence (l. 18491): 'Volume 6 runs T114-1 – T114-5 save T114-3's landfall clause, …' keeps T114-3's regrowth clause with volume 6 (T-V6-73). §13.8's T114-1 – T114-5 row adds 'and T114-3's regrowth clause on volume 6's engine' to its tier cell. V06's end, for an END line: T-V6-73 adds after its crossing-station clause '**the station's regrowth** (T114-3's regrowth clause): on H-AQUA's ring, both spans beside the aqueduct's crossing station toppled and the curtain absorbed, then the aqueduct repaired by hand and, on a second run, by V06 §3.19.2 (5) with its reason live — the stretch re-laid by `repairWall`'s bend in the batch before its spans, never a deck over a gap, the hand repair's undo restoring the gap and the spans', and V06 §7's table row for T114-1 – T114-5 adds 'the station's regrowth on H-AQUA'.

### VAP-r4-02 — MATRIX-GAP, minor, owner V03

**Claim.** Round 4 made T-V3-40 (b) run two fixture parts that V03's fixture list does not hold. Shared subject: T-V3-40's disaster fixture (V03, and V09 reading it). (1) R4-11's text (V03 l. 2907): 'a `none`-row condition carried beside it draws, lists and counts nothing at any key'. V03's edge row (l. 2095) lists 'a `none`-row condition carried beside the look, and View as at each key'. (2) T-V3-40 (b)'s hand-over ('after the hand-over (`crisisLookYields`)') and 'a `disaster` preview draws its ruin over a building under a rebuild Works'. V09's T-V9-86, rewritten this round (l. 4409), now reads 'on T-V3-40's fixture with a rebuild begun on one building of the disaster's units'. The damage fixtures V03 §7 defines for T-V3-40 (l. 2848–2853) hold 'a district of houses ruined by a fixture calamity through its linked `reconstruction` condition's `ConditionOverlay` … and under a `disaster` preview': no `none`-row condition and no rebuild Works. Volume 2's look fixture for the same subject states both: 'an `infiltrated` stressor (a `none`-row condition, V11's map rows) carried beside the looks' and 'a rebuild's `repair` Works beginning in week 18 on half the struck buildings' (V02 l. 3743–3752). A fixture list omitting what its own test runs: the test text names the parts, so nothing built changes.

**Required change.** V03 §7's damage fixtures (l. 2851–2853): '… and a district of houses ruined by a fixture calamity through its linked `reconstruction` condition's `ConditionOverlay` (V08 §3.16 (7) (b): `event` `calamity`; §2.7: its weeks and severity) and under a `disaster` preview' → '… (V08 §3.16 (7) (b): `event` `calamity`; §2.7: its weeks and severity), a rebuild's `repair` Works begun on one of its buildings inside the condition's weeks (V06 §3.22 (3)'s hand-over) and an `infiltrated` stressor (a `none`-row condition, V11's map rows) carried beside it in its weeks, and under a `disaster` preview'.

### VAP-r4-03 — DISAGREE, minor, owner V12

**Claim.** Round 4 gave T114-3 a landfall clause run by volume 5. §13.2 (base l. 18471–18473): 'its landfall clause, on volume 5's landfall (V05 §3.16): a landfall over a raised gate, then the deck's repair'. The runs sentence (l. 18491–18493): 'Volume 6 runs T114-1 – T114-5 save T114-3's landfall clause … volume 5 T114-3's landfall clause on its landfall fixture (T-V5-14)'. The take-over sky row (l. 18671), §13.8 (l. 19262), V05 §7's lead (l. 2424) and T-V5-14's head (l. 2516) say the same. V12 §3.15.4 restates who runs item 114's bars and omits volume 5: its lead (V12 l. 2506–2507) 'V06 runs the transitions over epochs (T-V6-73) and V07 the palisade's (T-V7-62); V08 supplies readiness and wealth (T-V8-52)'. Its T114-1 – T114-3 bullet (l. 2508–2510) gives the three bars only as 'conformance on V06's wall fixtures'. A restatement that drops an id the base's list names: nothing built changes.

**Required change.** V12 §3.15.4's lead: 'V06 runs the transitions over epochs (T-V6-73) and V07 the palisade's (T-V7-62); V08 supplies readiness and wealth (T-V8-52).' → 'V06 runs the transitions over epochs (T-V6-73), V05 T114-3's landfall clause on its landfall fixture (T-V5-14) and V07 the palisade's (T-V7-62); V08 supplies readiness and wealth (T-V8-52).'; the T114-1 – T114-3 bullet: '— conformance on V06's wall fixtures, `wall.condition` their statistic;' → '— conformance on V06's wall fixtures (T114-3's crossing clause on H-AQUA) and, for T114-3's landfall clause, V05's landfall fixture (T-V5-14), `wall.condition` their statistic;'.

### VAP-r4-04 — DISAGREE, minor, owner V12

**Claim.** Round 4 rewrote T124-9 (VDC3-10; base l. 18641–18645). It reads: 'the timeline replays from its session seed, clock and presses with the climate row, year position, sites, `light` mode and view hour in force at each moment (§6.1 *The weather stream*) — a year-position change from a week with no live kind into a live one and back, a press at a moment with no live kind and a view hour crossing a kind's `hours` among its fixtures (… `weather.replay` 0)'. Volume 12 takes T124-9 (T-V12-57; the take-over row l. 18680) and measures it with `weather.replay`. It still states the old bar. §3.15.14's bullet (V12 l. 2787–2788): 'two runs from one session seed, clock and set of presses give the same spells'. The registry row (l. 1212): 'two timelines from one session seed, clock and set of presses, spells differing in kind, start or length (0)'. Its weather fixtures (l. 2766–2768) step only the week and the clock. So V12's run names neither the replay's other inputs nor the three fixtures the bar names. The five-engine half is determinism §6.5 (9)'s run (l. 10185–10191), which stages all three, so nothing built changes.

**Required change.** V12 §3.15.14's T124-9 bullet: '— `weather.replay`: two runs from one session seed, clock and set of presses give the same spells; across the five engines it is determinism §6.5 (9)'s run.' → '— `weather.replay`: two runs from one session seed, clock and set of presses, with the climate row, year position, sites, `light` mode and view hour in force at each moment (§6.1 *The weather stream*), give the same spells, on the weather fixtures and on T124-9's three: a year-position change from a week with no live kind into a live one and back, a press at a moment with no live kind (starting none) and a view hour crossing a kind's `hours` under `light: 'time'`; across the five engines it is determinism §6.5 (9)'s run.' The registry row's last clause: 'two timelines from one session seed, clock and set of presses, spells differing in kind, start or length (0)' → 'two timelines from one session seed, clock and set of presses, with the climate row, year position, sites, `light` mode and view hour in force at each moment and T124-9's three fixtures among the runs, spells differing in kind, start or length (0)'. T-V12-57: '`weather.replay` fails a planted spell drawn from the host's clock' → '`weather.replay` fails a planted spell drawn from the host's clock and one carried into a week with no live kind across a year-position change'.

### VAP-r4-05 — MATRIX-GAP, minor, owner V12

**Claim.** Round 4 (R4-13, VV1112-r3-01) gave T-V12-54 two passing cases for `crisis.scale`'s second count (V12 l. 3167): 'a fire calamity naming more target districts than its share's count, every one drawn, and a fire whose district adjacency ends before its count, its shortfall reported, passing'. The registry row (l. 1208) and §3.15.12's T122-5 bullet (l. 2709–2710) count by that rule (max(k, |`matched`|), or every unit of a shorter fire order). No fixture list holds either case. V12 §3.15.12's crisis fixtures (l. 2688–2696) and X-V12-5 (l. 3414) ask V08 for 'a fire, a flood and an earthquake … a calamity with its linked `reconstruction` condition …, its `targets` resolved'. V08 §7.1's crisis fixtures (V08 l. 3218–3224) hold one fire on `town-1`, `city-1` and `metropolis-3` with its `targets` resolved, not more targets than its share's count and not a fire whose district order is shorter than its count. The previews have no targets. A test names fixture cases no fixture list carries; the test text states them, so nothing built changes.

**Required change.** V12 §3.15.12's crisis-fixture sentence, after '… each of the last three a calamity with its linked `reconstruction` condition (V08 §3.16 (7) (b))': add '— among the fires one naming more target districts than its share of its place's units gives (§10.2 (c)) and one on a place whose district adjacency from its seed ends before that count (V01 §3.16 `disasterSource` (5)) —'. X-V12-5's crisis-fixture parenthesis adds the same two fires after 'its `targets` resolved'. V08's end, for an END line: V08 §7.1's crisis fixtures, after 'the calamities' `targets` resolved (V08 §3.16 (7))', add '; on `city-1` a second fire naming more target districts than its severity's share of the place's units, and on `town-1` a fire at severity 1 whose district adjacency from its seed ends before its count (X-V12-5)'.

### VAP-r4-06 — DISAGREE, minor, owner V04

**Claim.** Round 4 (R4-12, VAL-R3-05) gave T-V4-81 clause (j) (V04 l. 3166): 'at a drawn week whose frame is not the head (V04 §5.1 (7)) — the METROPOLIS fixture advanced over epochs, one of which extends its catacomb complex and re-cuts an undercity district, and scrubbed to a week before that epoch'. A frame that is not the head is V06 §3.15.2's history frame (§11.2 *At a drawn week*, base l. 16455–16459: 'read from V06 §3.15.2's frame'), built at V06's E6 ('the history index, store and frames', V06 §8). Before E6 a scrub draws the current model (§4.11 (9), l. 8828–8831). T-V4-81 runs at U5 (V04 §8, l. 3202: 'Find on Below … at U5'; its tests cell 'T-V4-81'). §16 (l. 20151 ff.; INDEX §3–§4) orders M6-E only after M4 and beside M5, and orders E8, not E6, after V04's U5, so U5 can exit before E6 and (j) has no frame to read. INDEX §5 risk 2 moves such a clause to 'the first exit after the provider (each named in its volume)', and T-V4-81 names none. The rule settles it, so nothing built changes. VV12-r4-04 is the same defect at V01's T-V1-59 (f).

**Required change.** T-V4-81 (j): '(j) at a drawn week whose frame is not the head (V04 §5.1 (7)) —' → '(j) at a drawn week whose frame is not the head (V04 §5.1 (7)), from the later of U5 and V06's E6, whose history frames (V06 §3.15.2) it reads —'. V04 §8's U5 tests cell: 'T-V4-81' → 'T-V4-81 ((j) at the later of U5 and V06's E6)'.

### VAP-r4-07 — DISAGREE, minor, owner V05

**Claim.** As VAP-r4-06, at V05. Round 4 (R4-12) gave T-V5-36 clause (i) (V05 l. 2816–2822): 'at a drawn week whose frame is not the head (V05 §5.6 (5)), on (f)'s fixture after an `advance` whose epochs raise one island and resize another …, each scrubbed to a week before those epochs'. It reads V06 §3.15.2's frames, built at V06's E6 with `advance` on T1 (V06 §8). V05 §8 lands T-V5-36 'with P3 at M6-sky' (l. 2865; P3's tests cell, l. 2841). §16 orders M6-sky after M6-U and orders M6-E only after M4, so P3 can exit before E6. INDEX §5 risk 2 moves the clause to the first exit after the provider, 'each named in its volume', and V05 names none for (i). Nothing built changes.

**Required change.** T-V5-36 (i): '(i) at a drawn week whose frame is not the head (V05 §5.6 (5)), on (f)'s' → '(i) from the later of P3 and V06's E6 (its `advance` and history frames, V06 §3.15.2), at a drawn week whose frame is not the head (V05 §5.6 (5)), on (f)'s'. V05 §8's sentence 'so T-V5-36 lands with P3 at M6-sky' → 'so T-V5-36 lands with P3 at M6-sky, its (i) at the later of P3 and V06's E6'.

### VAP-r4-08 — DISAGREE, minor, owner V09

**Claim.** As VAP-r4-06, at V09. T-V9-83 (e) (V09 l. 4406) gained this round 'at a week before a matched use closed that use is matched and drawn, and a building whose use changed since is matched by its use then, never its head use (§11.2's *At a drawn week*)'. Beside it stands 'at a scrubbed week before a matched building was built, and after a closed use's end, the match is neither drawn, pinned, counted nor listed'. Both read a frame that is not the head, which is V06 §3.15.2's history frame, built at V06's E6. T-V9-83's milestone cell is 'M5 (§16)'. M6-E runs beside M5 (§16; V06 §8's lead), so M5's exit can come before E6, when every scrub draws the head (§4.11 (9)). INDEX §5 risk 2 moves the clauses to the first exit after the provider, 'each named in its volume'; T-V9-83 names none. Nothing built changes.

**Required change.** T-V9-83's milestone cell: 'M5 (§16)' → 'M5 (§16); (e)'s scrubbed and drawn-week clauses at the later of M5 and V06's E6 (V06 §3.15.2's frames)'.

### VAP-r4-09 — DISAGREE, minor, owner V10

**Claim.** The same class as VAP-r4-06 – 08, at V10; the clause predates round 4 (R3-24), and round 4 extended its subject to V01, V04, V05 and V09. T-V10-51 (V10 l. 3141) checks `read_map find` 'at a drawn week whose frame is not the head (a scrub to before a matched building was built)'. That reads V06 §3.15.2's history frame, built at V06's E6. Its milestone cell is 'PR, from M5 (Find's milestone; V09 §8)', and §16's M3c row lands C4's item-120 content 'with M5's exit'. M6-E runs beside M5, so the clause can be due before any frame exists. INDEX §5 risk 2's rule ('each named in its volume') settles it, so nothing built changes. VAT-r4-03 is this row's wording fix (the frame's listing per R4-12); this is its schedule.

**Required change.** T-V10-51's milestone cell: 'PR, from M5 (Find's milestone; V09 §8)' → 'PR, from M5 (Find's milestone; V09 §8); its drawn-week clause at the later of M5 and V06's E6 (V06 §3.15.2's frames)'.
