# Agreement check — proof and plan, round 3: tests, bars, calibration and the build plan (verify-agree-proof-r3t)

> PENDING FABLE REVIEW — opus seat coherence/verify-agree-proof-r3t (round-3 agreement check after assemble-r3), standing in for the Fable seat.

PROGRESS
- P1 inputs: brief whole (ROUND-3 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); round-2 report and result (14 issues); adjudication-r3 (R3-01 – R3-03, R3-12 – R3-16, R3-26, R3-27, Part H for every unit with its END lines, Part I); assemble-r3 whole (live = its after-hashes: base `593c657d…`, INDEX `90e2844a…`, V01 `8260b2a8…` … V12 `90a61a9c…`, each re-hashed); the HAND-OFFS sections of all eighteen repair-r3 files; the twelve landed r3t peers' 91 issues indexed — done
- P2 round-2 VAP-r2-01 – VAP-r2-14 re-checked on the live text, under adjudication-r3's rulings and grades — done (all 14 closed)
- P3 repair-touched subsections in scope read by word diff (every changed hunk read in its subsection): §1.1, §13.2 (the owner-item groups, T110-2, T114-3, T116-4, T122-4, T123-4, T126-1, the take-over table), §13.4, §13.8, §14's touched items, §16, INDEX §1, every volume's §7 and §8, V02 §13 and V03 §13, V10 §10.2, V12 §2.13, §3.4's registry rows, §3.7.8, §3.11, §3.12, §3.15 (§3.15.6, §3.15.10 – §3.15.16), §3.16, §6 and §10.2 — done
- P4 censuses and prices: test-id census, cross-unit test references added this round, take-over both ends (`pertest.py`), the pin union (`pins.py`), the phone census, every price cell — done
- P5 report and result — done

**Result: 10 issues — 0 blocker, 5 major, 5 minor** (DISAGREE 7, HANDOFF-OPEN 2, MATRIX-GAP 1). Owners: V12 4, V02 1,
V03 1, V04 1, V06 1, V11 1, scope 1. Every round-2 finding is closed on the live text (12 fixed as required, 4 of them —
VAP-r2-01, -08, -09, -10 — as R3-26 rules). Return: `docs/validation/coherence/results/coherence_verify-agree-proof-r3t.json`.
Design files untouched. No issue is a blocker: none changes what the generator builds. The five majors are bars that a
correct build fails (or a fixture no build can construct): volume 12 runs the `disaster` preview's district clauses from
M3b, where §10.2 draws no district until M5; volume 12's `layout.touch` omits the `editFabric` setting T126-1 now states;
and three volume tests stage "a key that withholds the condition" for a disaster look, whose condition DR44 now makes
`public` at every key (R3-13).

## Scope and method

**Members.** scope (§0–§1, §13–§17, INDEX.md) and V01–V12, on the proof-and-plan subjects: every test id and bar (T⟨item⟩-n,
T-Vn-m, the take-over of base bars), calibration (§13.2's convention, §13.8, V12's pins, metrics, register and schedules),
the combined build plan (§16) and INDEX.md against every volume's tests (§7) and build plan (§8). The fabric, layers, time,
host, tools, edges and unit seats hold the other subjects; their landed r3t findings were read first and are not raised
again (list below).

**Checks run** (scripts in the seat's scratch folder `agp3/`: `sec.py`, `census.py`, `takeover.py`, `pertest.py`, `pins.py`,
`wd.py`, `changed.py`, `newrefs.py`; pre = assemble-r2's output, live = assemble-r3's):
- *Round-2 re-check.* Each round-2 finding against the live subsection its required change named and against the ruling
  that governs it (R3-26 for the take-over and pin classes; R3-03's grades).
- *Test-id census on the live set.* 733 volume tests, every family gap-free (V01 1–60, V02 1–60, V03 1–40, V04 1–82,
  V05 1–36, V06 1–76, V07 1–69, V08 1–62, V09 1–87, V10 1–53, V11 0–48, V12 1–59); 341 base bars defined in §13; **0
  unresolved references** to a volume test or a base bar in the base, INDEX, the rationale or the volumes. Round 3 adds and
  removes no test and no bar. Every cross-unit test reference whose count rose this round was read at its line (T-V3-39 (h)
  → T-V12-56; T-V6-76 → T-V2-59; T-V9-79 → T-V8-3; T-V9-87 → T-V11-48; V06's edge row → T20-15, T20-16; V12 §10.3's
  T-V9-84, T-V6-75, T-V6-76 rows; the base's new runs-list and table ids).
- *The take-over table's both ends* (R2-08, R3-26), test by test: every owner-item bar the table gives a test against the
  bars the test's head and clauses name, and back.
- *Pins* (R2-09, R3-26): every volume test naming an `item1nn.*` pin, a `NoOpPin`, a "no-op pin" or a registration against
  V12 §2.13's suites column, §3.7.8's list and X-V12-11.
- *Schedules*: §13.8's rows for items 110–126 against every taking test's milestone cell, V12 §3.15's heads, W7's cells and
  V12 §6's tiers; §16's rows and INDEX §1 against each volume's §8.
- *Prices*: no price cell of any §8, of §16, of INDEX §1, of J-A568.01 or J-A568.05 changed this round (word diffs); round
  2's exact sums stand.
- *Hand-offs*: every HAND-OFFS line of the eighteen repair-r3 files on tests, fixtures, pins or milestones, and every §10 /
  §13 hand-off row changed this round (V02 X34 – X37 and its X-V12-11 row, V03 §13's four new rows, V10 CVR-V10-22, V12
  X-V12-5 and X-V12-11), read at its destination.
- *Phone census* (item 126 (a2)): the 32 phone mentions are those of round 2, each stating the absence; none added.

## Round-2 findings — status on the live text

| id | owner | grade (R3-03) | status | where |
|---|---|---|---|---|
| VAP-r2-01 | scope | minor | FIXED per R3-26 | §13.2's take-over table (base l. 18469 – 18480): the calibration row itemises T111-1 – T111-5 (T-V12-44) … T119-1, T119-2, T119-4 and T119-5 (T-V12-50); the stage-3 row T115-4's rung clause (T-V2-58) and T123-7's exterior clause (T-V2-59); the plan-rung row T119-2 – T119-5 (T-V3-37) and T122-7 (T-V3-40); the evolution row T114-10's epoch clause (T-V6-73); the SettlementForge row T126-3's embed clause (T-V8-62); the application row T112-1's thematic-view clause and T112-2 (T-V9-72); the runs lists of items 111, 112, 113, 114, 115, 119, 122, 123 and 126 as required (l. 18249 – 18462). The registration ids scope added at the same time (T-V2-60, T-V8-59, T-V10-45, T-V11-38 – T-V11-41) are the peers' VCS-r3-03 – VCS-r3-05 at the volume end |
| VAP-r2-02 | V02 | minor | FIXED per R3-26 | T-V2-58's head takes T115-4's rung clause on B-MASS, its (f) in R2-09's form by the M6a seat; T-V2-59's head takes T123-7's exterior clause, its (d) the `item123.damage` registration; T-V2-60's head takes T122-1 and T122-7's registration (scope's hand-off closed) |
| VAP-r2-03 | V03 | minor | FIXED per R3-26 | T-V3-37 "takes T119-2 – T119-5's plan clauses"; T-V3-40 takes T122-7's plan clause, its (f) the `item122.crises` registration by the P4 seat |
| VAP-r2-04 | V06 | minor | FIXED per R3-26 | T-V6-73's head and welded-stretch clause name T114-10's epoch clause; V06 §7's table row (l. 4061) and lead (l. 4000) list it |
| VAP-r2-05 | V08 | minor | FIXED per R3-26 | T-V8-62 takes T126-2's host-frame clause and T126-3's embed clause; R1 (l. 3339) the same (V08 §3.16 (10)'s closing citation is the peer's VV78-r3-03) |
| VAP-r2-06 | V09 | minor | FIXED per R3-26 | T-V9-72 takes T112-1's thematic-view clause and T112-2; V09 §7's lead lists them (l. 4273) |
| VAP-r2-07 | V09 | major | FIXED | V09 §7's lead (l. 4276 – 4279) commits the app harness to X-V12-20's fixtures; T-V9-22, T-V9-83, T-V9-85 and T-V9-87 each "with V12 §3.15.n's fixtures on this harness", T-V9-84 the captures |
| VAP-r2-08 | V12 | major | FIXED per R3-26 | V12 §2.13's suites (l. 917 – 936), §3.7.8's list (l. 1711 – 1716) and X-V12-11 (l. 3412) are one list of registering tests: T-V2-58 (f), T-V2-59 (d), T-V2-60 (c), T-V3-39 (g), T-V3-40 (f), T-V8-59, T-V8-61 (b), T-V11-38 (b) – T-V11-41 (b) added; `item111.water`'s V10 cell "the reader and why goldens but the brief's" (the remaining V11 gaps are VAP-r3-07, -08) |
| VAP-r2-09 | V11 | minor | FIXED per R3-26 | T-V11-13 (C2 seat), T-V11-31 (C3b), T-V11-38 (b) – T-V11-41 (b) (C9) each state R2-09's registration clause, with their fixtures (the heads' bar ids are the peer's VCS-r3-05) |
| VAP-r2-10 | V10 | minor | FIXED per R3-26 | T-V10-45's last clause: the brief excepted, "the `item111.water` registration of the reader and why goldens, the brief's excepted, …, written by the C1 seat"; C1's exit names it (the head's id is the peer's VCS-r3-04) |
| VAP-r2-11 | V11 | major | FIXED | C9's exit runs T-V11-46 (b) – (d) and names (a) C4b's at M-SF (V11 l. 5051) |
| VAP-r2-12 | V12 | major | FIXED | the registry row (l. 1205) counts gap outlines and legend chips and steps a redo, a regenerate, a save and load and a migration with the count-0 chip; §3.15.10's T120-3 and T120-4 bullets the same; `crisis.weeks` (l. 1208) and §3.15.12's T122-2 bullet count a withheld condition's look; T-V12-52 and T-V12-54 plant each case (the withheld look a planted fault, R3-13) |
| VAP-r2-13 | V04 | minor | FIXED | J-V4.114 (V04 l. 3382): 28.5–39.5 pw, U5 at 3.25–4.5 pw, item 123's 0.25 pw in U5 (J-V4.130) |
| VAP-r2-14 | scope | major | FIXED | §13.8 (l. 19090): "M2a (with the medium layout); T126-1 each tool from the milestone that lands it, every tool from M3a" = T-V9-22, T-V12-59, V12 §3.15.16 |

## Agreement confirmed (no issue)

- **The take-over both ends.** Run test by test after the round, every owner-item bar the table gives a volume test is
  named by that test, and every bar a test takes is in the table, except the registration ids scope added (the peers'
  VCS-r3-01 – VCS-r3-05) and T114-3's new clause (VAP-r3-06). The remaining name-only hits are references (T-V3-39 (h)'s
  "T-V12-56, which takes T123-3"; T-V6-76's "the agreement V02's T-V2-59 bars for T123-5"), not takes.
- **The pin union** (R3-26). Every registering clause of the volumes (61 tests) stands on the pin V12 §2.13 lists it under,
  with the same suite, and §3.7.8's list equals X-V12-11's — but for the two V11 suites of VAP-r3-07 / -08.
- **R3-15's placement** of the looks before their services: §10.2 *Crisis looks*' lead, §16's M3b item-122 clause and M5
  row and exit, §13.8's T122 row, V01's W10 and T-V1-60, V07's T-V7-69 ("the disaster clause at the later of V-M3 and M5"),
  V03's T-V3-40 ("from P4 once … V01's districts (M5) stand"), V02's M6b — all but volume 12 (VAP-r3-01).
- **R3-13's knowledge tier** at T-V8-59, T-V9-85, T-V10-52 and V12's planted case — all but the three disaster-look
  clauses of VAP-r3-03 – VAP-r3-05.
- **R3-08, R3-04, R3-05, R3-10 in the tests**: T123-4's wording = T-V6-76 (b) = T-V3-39 (c); "above 0 and at least t" in
  T-V4-82 (b), T-V9-86 and T-V10-53 (with the `lo` = 0 case); the roofless rule in T-V2-59 (b) and T-V3-39 (b); the preview
  never handing over in T-V2-60 (d), T-V3-40 (b), T-V6-75.
- **R3-09 (e)'s fixtures**: V08 §7.1's crisis fixtures, X-V12-5, V12 §3.15.12, T-V1-60, T-V2-60's look fixture, T-V4-82 (i),
  T-V6-75, T-V10-52 and T-ER-27 each stage a disaster as a calamity with its linked `reconstruction` condition (V03's §7
  fixture is the peer's VV34-r3-05).
- **VCS-r2-03's two ends**: §13.4's fallback, §1.1, T126-1 and V09 §4.12 / T-V9-22 agree on `AppPrefs.touch.editFabric`
  (volume 12's measure is VAP-r3-02).
- **VV1112-r2-07** (V12 takes §13.8's tiers): V12 §6's rows for items 121 – 126 now read §13.8's PR, nightly and timing-phase
  tiers (T121-5 at PR inside V09's run, T121-2/-3/-8 in the timing phase; T123 at PR; T124-3/-4/-9 at PR; `item125.host` at
  PR; item 126 at PR).
- **T125-1 at every rung** (VV1112-r2-05): §13.2, V08 §7.1's required-keys dossier, X-V12-5, V12 §3.15.15, the registry row,
  §6 and T-V12-58 all say every rung, THORP to the cap.
- **T122-4's three lists** (VV78-r2-10's END): §13.2's T122-4, T-V11-46 (a) and T-V8-59 name stressor types, archetypes and
  crisis events (DR44's test cell is the peer's VDC3-04).
- **V10's C4** (VV910-r2-07): §16's M3c row, INDEX §1 and V10 §8 say "C4's Find content (the find form and read) at M5's exit".
- **T-V6-24's events** (V06 §6.8): 200 events in 20 years, 1 000 in 100 = V08 §6's "a CITY year of ≈ 10 events".
- **Prices**: unchanged this round in every §8, §16, INDEX §1, J-A568.01 and J-A568.05; J-A120.01's restated row carries no
  number (absorbed in O11 / O12). Round 2's exact sums stand.

## Overlaps with the landed r3t verifiers (not raised again)

The take-over registration ids at the volume ends — T-V8-59's head (VCS-r3-03), T-V10-45's (VCS-r3-04), T-V11-38 – T-V11-41's
(VCS-r3-05) — and the calibration row's T113-7, T114-8, T117/T118 pins and V12's heads T-V12-44 – T-V12-49 (VCS-r3-01,
VCS-r3-02); T110-2's epoch circuit clause taken by no volume test (VCS-r3-06) and its giving-way case untested (VM-R3T-05);
T122-6's statistic (VCS-r3-08, VV1112-r3-08); T76-1's cadence clause against §4.11's third trigger (VPC-R3-01); §16's M6-U
row against V04's "later of U5 and P4" (VV34-r3-04); T-V3-40's and V03 §7's disaster fixture not a calamity (VV34-r3-05);
V08 §3.16 (10)'s closing citation (VV78-r3-03); T121-2 and T-V9-84 against §8.8's idle rule (VRC3T-03, VRC3T-04);
`crisis.scale`'s second count against V01 §3.16 (5) (VV1112-r3-01, VV1112-r3-02); V08's fixtures lacking the week of three
camps (VV1112-r3-03); T-V9-87's shimmer hour (VV910-r3-06); T124-9's replay inputs (VDC3-10, VDC3-11); V06's catch-up budget
wording (VV56-r3-01, VV56-r3-02); V10's `crisis.look.<kind>` citations, T-V10-29 among them (VV910-r3-04, VV1112-r3-07).

## Matrix gaps found (shared subjects the matrix holds no row for)

New shared subjects of this round, each judged: the disaster look's district clauses and their milestone (§10.2's lead,
§13.8, §16's M5, V01, V03, V07, V12) — **disagree** at V12 (VAP-r3-01); the `AppPrefs.touch.editFabric` setting of T126-1's
touch scripts (§13.4, T126-1, V09, V12) — **disagree** at V12 (VAP-r3-02); DR44's tier as the fixture rule of every
withheld-condition test clause (DR44, T-V8-59, T-V9-85, T-V10-52, T-V2-60, T-V3-40, T-V4-82, V12) — **disagree** at V02,
V03, V04 (VAP-r3-03 – VAP-r3-05); T114-3's crossing-station fixture (§13.2, §13.8, V06 §3.7.7 (2), T-V6-73) — **open** at
V06 (VAP-r3-06); the look below ground as one of item 122's parts (§0.2's row, §13.2's runs list, V04 §1.2, T-V4-82 (i),
V12 §3.15.12's head) — **not listed** at scope (VAP-r3-09); T116-4's export framing (§8.7, T116-4, T-V9-76, T-V7-64,
V12 §3.15.6) — **differs in form** at V12 (VAP-r3-10). The older subject of the item-105 and item-106 pins' V11 suites
(T-V11-21, T-V11-19, V12 §2.13, §3.7.8, X-V12-11) — **open** (VAP-r3-07, VAP-r3-08).

## Issues

| id | sev | kind | owner | subject |
|---|---|---|---|---|
| VAP-r3-01 | major | DISAGREE | V12 | volume 12 runs the `disaster` preview's district clauses from M3b; §10.2, §13.8 and §16 place them at M5 |
| VAP-r3-02 | major | DISAGREE | V12 | `layout.touch` and §3.15.16's T126-1 bullet omit "with `AppPrefs.touch.editFabric` on" |
| VAP-r3-03 | major | DISAGREE | V02 | T-V2-60 (e) and (g) stage a key that withholds the disaster's condition, which DR44 makes `public` |
| VAP-r3-04 | major | DISAGREE | V03 | T-V3-40 (b) stages the same impossible key |
| VAP-r3-05 | major | DISAGREE | V04 | T-V4-82 (i) stages the same impossible key |
| VAP-r3-06 | minor | HANDOFF-OPEN | V06 | T-V6-73 takes T114-1 – T114-5 but runs no part of T114-3's new crossing-station clause |
| VAP-r3-07 | minor | HANDOFF-OPEN | V11 | T-V11-21 (item 105's pin) and T-V11-19 state no registration of the suites V12 lists under V11 |
| VAP-r3-08 | minor | DISAGREE | V12 | §2.13's "B-CITY (V11)" and "V11's T-V11-19 fixtures" name no registering test; §3.7.8 and X-V12-11 omit them |
| VAP-r3-09 | minor | MATRIX-GAP | scope | §0.2's item-122 row and §13.2's item-122 runs list omit volume 4's look below ground (T-V4-82 (i)) |
| VAP-r3-10 | minor | DISAGREE | V12 | V12 §3.15.6 glosses T116-4 as "every export within it" (the limit, stop 0 where the bounds do not fit) |

### VAP-r3-01 — DISAGREE, major, owner V12

**Claim.** Round 3 placed the `disaster` look's districts at M5 (R3-15): §10.2 *Crisis looks*' lead (base l. 15482 – 15486)
"Until V01's W10 (M5) the `disaster` look draws no district (its legend line and Find's listing stand)"; §13.8's T122-2,
T122-3, T122-5, T122-6 row (l. 19084) "M3b (the `disaster` look's district clauses from M5)"; §16's M5 exit (l. 19981) "the
`disaster` look's district clauses of T122-2, T122-3, T122-5 and T122-6"; V07's T-V7-69 "the disaster clause at the later of
V-M3 and M5". Volume 12, which takes those four bars (T-V12-54), runs every preview from M3b with no M5 exception: §3.15.12's
head (V12 l. 2682) "from M3b (§16) each look kind previewed … on B-CITY-lite's seeds of every rung"; T-V12-54's milestone
"M3b (the previews); M-SF (the dossier crisis fixtures)"; W7's M3b cell "item 122's previews, its `crisis.*` statistics
there and `item122.crises`"; V12 §6's item-122 row "M3b (the previews); M-SF". At M3b a correct build draws the `disaster`
preview on no district, so `crisis.scale`'s second count — "each look §10.2 (c) sizes by severity (… every preview among
them) … whose units differ in number from the count §10.2 (c) gives that share of its place's units" (registry l. 1208;
§3.15.12's T122-5 bullet) — counts it at every rung and severity: the bar fails a correct build from M3b to M5, and no
milestone cell of volume 12 runs the district clauses at M5's exit, where §16 requires them.

**Required change.** V12 §3.15.12's head: "from M3b (§16) each look kind previewed (`crises` `preview`, at
`previewSeverity`) on B-CITY-lite's seeds of every rung, an island town and an unwalled place — the `disaster` preview's
district clauses (its units, scale and placement under T122-2, T122-3, T122-5 and T122-6) from M5, when V01's W10 lands
(§10.2 *Crisis looks*; §13.8) —; from M-SF …". T-V12-54's milestone cell: "M3b (the previews; the `disaster` preview's
district clauses from M5); M-SF (the dossier crisis fixtures) (§16)". W7's cells: M3b "item 122's previews (the `disaster`
preview's districts at M5), its `crisis.*` statistics there and `item122.crises`", and M5 "(Find: …; the `disaster`
preview's district clauses of T122-2, T122-3, T122-5 and T122-6)". V12 §6's item-122 row milestone: "M3b (the previews; the
`disaster` look's district clauses from M5); M-SF (the dossier crisis and force fixtures) (§16)".

### VAP-r3-02 — DISAGREE, major, owner V12

**Claim.** Round 3 resolved §13.4's touch fallback into a switchable default (VCS-r2-03, graded major): §13.4 (base l. 18640 –
18641) "the fabric and finish layers' geometry edits are off by default on a coarse pointer (`AppPrefs.touch.editFabric`,
V09 §4.12), switchable back on"; V09 §4.12 "hiding the L3 FABRIC and L4 FINISH layers' geometry edits (T8 `fill`'s and T9
`shape`'s drags) on touch"; and T126-1 now reads "every tool of V09 §4.12's list completes its canvas script under touch,
with `AppPrefs.touch.editFabric` on" (l. 18456), as T-V9-22 does. Volume 12 measures T126-1 without the setting: the
registry row `layout.touch` (V12 l. 1214) "the tools of V09 §4.12's list whose canvas script fails to complete under touch
events", §3.15.16's T126-1 bullet (l. 2807) "under coarse-pointer touch events each tool … completes its canvas script",
T-V12-59 "`layout.touch` is 0 at 600 × 480". Once §13.4's fallback ships (a pre-decided shipped-data change), T8's and T9's
scripts cannot complete on a coarse pointer with the default setting, so `layout.touch` fails a correct build, while
T126-1 and T-V9-22 pass it.

**Required change.** The registry row reads "… the tools of V09 §4.12's list whose canvas script fails to complete under
touch events with `AppPrefs.touch.editFabric` on (V09 §4.12; §13.4's fallback changes only its default) …"; §3.15.16's
bullet reads "**T126-1, every tool under touch at the medium class** — `layout.touch`: at 600 × 480 CSS px under
coarse-pointer touch events, with `AppPrefs.touch.editFabric` on, each tool of V09 §4.12's list completes its canvas
script …"; T-V12-59 adds "with `AppPrefs.touch.editFabric` on" after "`layout.touch` is 0 at 600 × 480".

### VAP-r3-03 — DISAGREE, major, owner V02

**Claim.** DR44's rule cell now states the tier (R3-13, VAH-r2-01's text; base l. 11981): "a condition's `knownTo` is
`public` where its `map` row gives a look … and `secret` where the row is `none`", and §9.2's admission function admits a
`public` row at every tier (l. 14697 – 14699), so "a look-bearing condition is therefore never withheld at any key" (R3-13).
The disaster look's condition reads the `calamity` event row, which gives `disaster` (V08 §3.16 (7) (b)), so it is `public`.
T-V2-60 still stages the impossible key twice: (e) "a viewer whose knowledge key withholds the condition sees the look on no
building", and the clause round 3 added to (g) "View as set to a key that withholds the condition, the struck buildings'
damage marks re-emitted and the tile redrawn after each". No fixture can supply such a key; a builder who builds a key that
omits the condition finds the look drawn (DR44) and (e) failing a correct build, or makes the condition withholdable
against DR44 — the case R3-13 removed from T-V10-52 (VAH-r2-07, graded major).

**Required change.** T-V2-60 (e) reads "(e) the disaster's condition, whose map row gives the look and so `public` (§7.7's
DR44), draws the look on its units' buildings under View as at `public`, `local` and `secret` alike, and a `none`-row
condition carried beside it (an infiltrated stressor) draws no look on any building at any key;"; (g)'s clause reads "… a
preview started and ended, and View as changed, the struck buildings' damage marks re-emitted and the tile redrawn after
each, the look standing at every key …". (V02 §3.18's edge row "a condition the view's key withholds → no look" stays, the
withheld condition being a `none`-row one.)

### VAP-r3-04 — DISAGREE, major, owner V03

**Claim.** As VAP-r3-03, at V03: T-V3-40 (b) (V03 l. 2899) "each building of a returned district draws its damage at the
look's `lookLevel` … and at its own level outside them, after the hand-over (`crisisLookYields`), with Show crises off and
at a key that withholds the condition". The disaster's condition is `public` (DR44, R3-13), so no key withholds it; the
clause asks for a fixture that cannot exist, and a key built to omit the condition finds the look drawn and the clause
failing a correct build.

**Required change.** T-V3-40 (b) reads "… and at its own level outside them, after the hand-over (`crisisLookYields`) and
with Show crises off; under View as at `public`, `local` and `secret` the same drawing, the condition `public` (§7.7's
DR44); …" (V03 §5.6 (4)'s and (5)'s general sentences on a withheld condition stand: a `none`-row condition draws no look).

### VAP-r3-05 — DISAGREE, major, owner V04

**Claim.** As VAP-r3-03, at V04, in the clause round 3 added: T-V4-82 (i) (V04 l. 3144) "in the condition's weeks each
crypt's elements draw at its church's drawn level … and at its own level with Show crises off, at a key that withholds the
condition, in the weeks outside the condition's and from the week a Works begun on the church hands it over". The fixture's
condition is the `reconstruction` condition linked to a calamity, reading the `calamity` row and so `public` (DR44; V08
§3.16 (7) (b), (e)); no key withholds it.

**Required change.** T-V4-82 (i) reads "… and at its own level with Show crises off, in the weeks outside the condition's
and from the week a Works begun on the church hands it over (V06 §3.22 (3)'s `crisisLookYields`; this clause once V06's E2
has landed); under View as at `public`, `local` and `secret` the same drawing, the condition `public` (§7.7's DR44); …".

### VAP-r3-06 — HANDOFF-OPEN, minor, owner V06

**Claim.** Round 3 gave T114-3 a second clause (VM-R2T-03's END at scope; base l. 18278 – 18280): "on a neglected, poor CITY
ring over 20 epochs with a masonry aqueduct through its wall arch and a viaduct on a raised gate, the stretch under each
crossing station is never `breached` or `dismantled` while its deck stands (§2.7's support step (3)), every other stretch
decaying as the first clause states". §13.2's item-114 runs list, the take-over table's evolution row and V06 §7's table
give T114-1 – T114-5 to T-V6-73, and V06 §3.7.7 (2) carries the rule (l. 1629: "The breaches pass over a stretch under a
crossing station while its deck stands"). T-V6-73 (l. 4140) runs on H-WALLS only, which holds no raised way: no clause of
it, and no V06 test, runs the crossing-station case (repair-r3-scope's HAND-OFF to V06, unwritten). The head claims a bar
clause the body does not run; the base bar's own text states the fixture, so the clause is still runnable from §13.2.

**Required change.** T-V6-73 adds, after the welded-stretch clause: "**under a crossing station**: on H-AQUA's ring held
neglected and poor over 20 epochs — its masonry aqueduct through the wall arch, its viaduct on a raised gate — the stretch
under each crossing station is never `breached` or `dismantled` while its deck stands, every other stretch decaying
through `worn` to `breached` (V06 §3.7.7 (2); §2.7's support step (3); T114-3's crossing clause)"; V06 §7's table row for
T114-1 – T114-5 adds "the crossing stations over 20 epochs on H-AQUA". (Scope's end: §13.8's T114-1 – T114-5 row reads
"the milestone tier over H-100's epochs and H-AQUA's for T114-3's crossing clause".)

### VAP-r3-07 — HANDOFF-OPEN, minor, owner V11

**Claim.** R2-09 / R3-26: a volume test that restates an owner item's pin states "— the `<pin>` registration of <suite> on
V12 §3.7.8's engine (V12 §2.13), written by <seat>", and V12's lists are exactly the union of those clauses. V12 §2.13 lists
two V11 suites that no V11 clause registers: under `item105.web`, `item107.spread` "B-CITY (V11)" — V11's restating test is
T-V11-21 (V11 l. 4999: "with it applied the placement is byte-identical to the base's without item 105 (item 105 (k)'s no-op
pin)"; V11 l. 2270 names it so), which states no registration; under `item106.barrier` "V11's T-V11-19 fixtures" — T-V11-19
(l. 4997) states no pin at all. V12 §2.13's registration "refuses … a suite no owner registers".

**Required change.** T-V11-21's last clause ends "… byte-identical to the base's without item 105 (item 105 (k)'s no-op pin)
— the `item105.web` registration of B-CITY's 200 seeds per rung on V12 §3.7.8's engine (V12 §2.13), written by the C2
seat"; T-V11-19 adds "; with `barrier` closure and the stretch profile off, item 106 (h)'s barrier fixtures byte-identical to
the base — the `item106.barrier` registration of them on V12 §3.7.8's engine (V12 §2.13), written by the C4a seat (T106-5)".
(V12's end is VAP-r3-08.)

### VAP-r3-08 — DISAGREE, minor, owner V12

**Claim.** The other end of VAP-r3-07: V12 §2.13's `item105.web`, `item107.spread` suites cell reads "B-CITY (V11)" with no
test id and its `item106.barrier` cell "V11's T-V11-19 fixtures"; §3.7.8's list (l. 1711 – 1716) and X-V12-11 (l. 3412)
name neither T-V11-21 nor T-V11-19, so the three statements are not the one union R3-26 requires ("each named by its test
id").

**Required change.** §2.13: `item105.web`, `item107.spread`'s cell reads "… B-CITY's 200 seeds per rung (V11, T-V11-21) …"
and `item106.barrier`'s "… item 106 (h)'s barrier fixtures (V11, T-V11-19) …"; §3.7.8's list and X-V12-11 read "… V11's
T-V11-13, T-V11-19, T-V11-21, T-V11-31 and T-V11-38 (b) – T-V11-41 (b)".

### VAP-r3-09 — MATRIX-GAP, minor, owner scope

**Claim.** Round 3 gave volume 4 a part of item 122: the disaster look over a storey below 0 (V04 §1.2 l. 152 "item 122
(d)'s disaster look over a building …"; U5 "the look over a storey below 0"; T-V4-82 (i), "g item 122 (d)'s look below
ground"). The base's two lists of item 122's units do not carry it: §0.2's item-122 row (base l. 261) "volumes 1, 2, 3, 6,
7, 8, 9, 10, 11 and 12", and §13.2's item-122 runs list (l. 18412 – 18417), which names the volumes that run its bars and
those that "test their own parts" (V01's T-V1-60, V02's T-V2-60, V08's T-V8-60, V10's T-V10-52) without V04's T-V4-82 (i).
V12 §3.15.12's head repeats the list (l. 2679 – 2682). A list omitting an id the test names: nothing built changes.

**Required change.** §0.2's item-122 row reads "… volumes 1, 2, 3, 4, 6, 7, 8, 9, 10, 11 and 12"; §13.2's item-122 runs list
reads "… volume 1's units and land (T-V1-60), volume 2's ruined look, with T122-1 and T122-7's registration (T-V2-60), volume
4's look below ground (T-V4-82 (i)), volume 8's forces (T-V8-60) and volume 10's explanations (T-V10-52) test their own
parts". (V12 §3.15.12's head adds "V04's T-V4-82 (i)" beside V01's T-V1-60 — V12's end.)

### VAP-r3-10 — DISAGREE, minor, owner V12

**Claim.** Round 3 rewrote T116-4 (VEW-r2-02; base l. 18323 – 18325): "every export frames within the limit bounds (§8.7:
the whole bounds — town and camps while a crisis look stands — at most), at any window size and with none; at the
METROPOLIS cap a whole-bounds PNG, print and SVG export frames the whole bounds", the stop-0 clause staying in T116-1's view
bar only (canon). V12 §3.15.6 (l. 2536 – 2541) defines "the limit" as "the whole bounds inside the limit's view, or the
limit at stop 0 where they do not fit" and glosses "T116-2 – T116-4 (the first view unchanged, the limit moving with the
bounds, every export within it)" — read with its own definition, an export at the cap would be cut to stop 0's extent, the
reading T116-4 now excludes. V12 names these the base's bars, so nothing it builds changes.

**Required change.** V12 §3.15.6's parenthesis reads "(the first view unchanged, the limit moving with the bounds, every
export within the limit bounds — the whole bounds at most, a whole-bounds export at the cap framing them, §8.7)".
