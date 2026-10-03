# Edits B: §3.4, §3.6b, §3.7, §3.9, §3.11, §3.12, §3.14, §3.15, §3.16
import os
S = os.path.dirname(os.path.abspath(__file__))
L = open(os.path.join(S, 'V12.orig.md'), encoding='utf-8').read().split('\n')

NEW_315_4_TO_10 = """**3.15.4 Item 114 — walls that decay and recover.** V06 runs the transitions over epochs (T-V6-73) and V07 the
palisade's (T-V7-62); V08 supplies readiness and wealth (T-V8-52). Of item 114's bars:
* **T114-1 – T114-3** — a poor, threatened fixture shows patched runs and no robust rebuild; a rich, threatened one rebuilds
  in stone; a safe one decays through `worn` to `breached` — conformance on V06's wall fixtures, `wall.condition` their
  statistic;
* **T114-4, recovery replaces patches oldest first** — `T114g.oldestFirst` (`ownerBar` T114-4): `exactScript`
  `patchesOldestFirst` over H-100's epochs and V06's recovery fixture, the order read from each run's epoch of last change;
* **T114-5, no condition changes without a sustained driver** — `T114g.sustained` (`ownerBar` T114-5): `exactScript`
  `conditionSustained` over H-100's epochs and a fixture whose driver alternates across its threshold every epoch (no run
  changes there);
* **T114-6, every state distinguishable in greyscale at the bands stated** — the `BenchBarDef` `T114-6` (owner `base`): the
  style check's pairwise contrast computed on luma alone between the renders of `standing`, `worn` (district band and
  finer), `patched`, `breached` and `dismantled`, at every band where both of a pair draw, against §8.2's threshold;
* **T114-7, the generation-time condition derives from readiness and wealth** — the `BenchBarDef` `T114-7` (owner `base`):
  on the readiness × wealth fixture grid with no replay, each fixture's condition shares by run length equal §7.7's
  derivation row's table shares within one run's length;
* **T114-8, with need and means neutral, the existing neglect and repair reproduced** — the pin `item114.condition`.
The register lines are V12 §3.11's; the repair tool's material and the legend (V09's T-V9-74) and the story told (V10's
T-V10-47) are their volumes' bars.

**3.15.5 Item 115 — the grandeur ceiling.** T115-1 – T115-3 — rich THORP, HAMLET and VILLAGE fixtures at the wealth maximum
with no `H`, `U`, court, tower or turret dwelling but the manor; at most one manor, only with a lord or a dossier record; a
dossier-named hall keeping its design — are V02's and V07's conformance bars on their fixtures (V07's T-V7-63; what
"specified" reads, V08's T-V8-53), their statistic `bldg.grandeur`, which the nightly statistics also report at every
rung; a hand design beyond the ceiling is V09's T-V9-75 and the clerk's V10's T-V10-48. T115-4 is two pins (V12 §2.13):
"TOWN rungs and above byte-identical" is the rung pin `item115.ceiling`, and "every ceiling row's `enabled` false,
byte-identical to the base" — V11 §3.24.0's off form, which T-V11-41 (b) restates — is the `offForm` pin `item115.off`.
The ceiling table is an enumeration and takes no register entry.

**3.15.6 Item 116 — the zoom-out limit.** T116-1 — at every rung from THORP to the cap the limit shows the whole bounds and
no stop beyond it is reachable — is a conformance sweep on B-ZOOM (§13.4) over B-CITY-lite's seeds of every rung and V07's
village fixtures (V07's T-V7-64), its statistic `view.limitStop` (0 reachable stops beyond the limit; the whole bounds
inside the limit's view), reported in the nightly statistics; T-ER-08's restatement and T116-2 – T116-4 (the first view
unchanged, the limit moving with the bounds, every export within it) are the base's render bars; the view controls
stopping at the limit are V09's T-V9-76. Every panel render and render metric frames within the limit (V12 §3.9.2).

**3.15.7 Item 117 — seasons.** Of item 117's bars (each `T117i.*` spec a `StatBarSpec` carrying its base bar as
`ownerBar`, its step script one `{ week }` step per week, V12 §2.7b):
* **T117-1, the same document hashes identically in all 52 weeks** — the pin `item117.season`;
* **T117-2, an autumn fixture shows at least five distinct crown colours across its deciduous trees** — the `BenchBarDef`
  `T117-2` (owner `base`: `season.crownColours` at the leaf-colour weeks' middle week) — **and leaf cover on the ground
  deepening week by week through the leaf-fall weeks** — `T117i.leafCover` (`ownerBar` T117-2): `exactMonotone` over a
  step script of the fixture's leaf-fall weeks in order, quantity `season.leafCover`; `bar.T117-2` is the two clauses'
  vector;
* **T117-3, every climate's season rows cover all 52 weeks with no gap** — V11's table compile check (T-V11-42);
* **T117-4, an arid fixture never draws ice or snow** — `T117i.arid` (`ownerBar` T117-4): `exactScript` `noIceSnow` over
  its 52 weeks (`season.iceSnow` 0 at every step);
* **T117-5, a cold fixture freezes still water before flowing water and keeps open water at mill races and weirs** —
  `T117i.ice` (`ownerBar` T117-5): `exactScript` `iceOrder` over its 52 weeks (`season.iceOrder`: every still water's first
  ice week at or before every flowing water's; no ice drawn on a mill race's or weir's polygon);
* **T117-6, a campaign dossier opens on its own week** — V08's conformance (T-V8-54) and V09's T-V9-77;
* **T117-7, each season's look passes the contrast and colour-blind checks** — `T117i.styles` (`ownerBar` T117-7):
  `exactScript` `seasonStyles`, T112-1's check at each season's middle week;
* **T117-8, switching season re-skins cached tiles within §12.5's budget** — `time.reskin` in the timing phase, its row
  §12.10's.
The village rungs' clauses are V07's T-V7-65 and the explanations V10's T-V10-49.

**3.15.8 Item 118 — festival decorations.** Of item 118's bars:
* **T118-1, the same document hashes identically with decorations on and off and in every week, and with no traditions and
  no preview the tiles are byte-identical to the base** — the pin `item118.festival` (`tiles`);
* **T118-2, a festival shows exactly in its window's weeks** — `festival.weeks` equals the dossier fixture's window, a
  window across the year's end wrapping;
* **T118-3, the same festival draws identically across views and exports** — the fixture's tiles drawn in the view and in
  an export at one stop are byte-identical per seed;
* **T118-4, each tier fixture shows its tier's kinds and no larger** — `festival.kinds` within the tier's decoration row;
* **T118-5, staging lands on the named or keyed place, else its fallback** — `festival.stage` against the fixture's
  expected place;
* **T118-6, nothing blocks a gate or covers a keep-out** — `festival.blocked` 0.
T118-2 – T118-6 are each the `BenchBarDef` of that id, owned by the base, on the festival fixtures (V07's at the village
rungs, T-V7-66), none a register metric; the festival list is V09's T-V9-78, the dossier's `traditions` V08's T-V8-55
and the explanations V10's T-V10-49.

**3.15.9 Item 119 — as fast as possible; the comfort level.** §12's present laws stay the targets; the harness measures
them and the comfort level, and moves no interaction budget:
1. **The targets (T119-1)** — `time.model` and `time.firstMap` at every rung's bottom, default and top in §12.1's timing
   phase, reported against §12.3's and §12.5's laws as *target met* or *target miss*; a miss is D-18's declared target miss
   inside the comfort level and gates nothing by itself.
2. **The comfort level (T119-2)** — each `wait.*` kind (generate, regenerate, open from SettlementForge, a dossier change
   applied, advance time, the history replay, an export, a migration) timed from the click to the complete result — the
   map's final complete frame, or the export file written — on the reference hardware (§12.1), five seeds each at every
   rung's top and at the metropolis cap, on B-CITY's browser runs and the history and dossier fixtures; advance time and the
   history replay are each timed in total — the whole advance, and the replay with the peak's generation before it — never
   per epoch (item 119 (a2), J132); the bar passes when every p95 is at most 10 000 ms. Past it the wait fails (item 119
   (a)). The low tier aims at the same ceiling; a size it cannot reach within it is declared per device (§12.1), recorded
   beside the measurement.
3. **Progress (T119-3)** — for every timed wait over 1 000 ms, `wait.progressMs` (click to the first progress frame naming
   the stage) at most 1 000 ms, and every frame sampled during the wait shows the previous map or the progress view, never
   an empty screen (V09's progress view, T-V9-79; the app harness's frame sampler).
4. **Slower only for a measured gain (T119-4)** — the budget-register check reads the one record of a step a stage runs
   above its §12 target, V11 §3.25.8's `perf.qualitySpend` rows (registry row 106), which also gate that stage's quality
   path (it runs only while its row stands): each row's `gainBar` resolves to a registered bar (`bar.<gainBar>`,
   V12 §2.1), its `run` to the `CalibrationRun` that measured the gain, and the release's runs show the bar's statistic with
   the quality path on beyond the one without by the row's `gain`; a row whose bar fails, whose gain the runs do not show
   or whose run is absent fails, and so does a stage the timing phase measures above its §12.10 target with no row
   standing. The check matches each row to §12.10's row for its stage, which cites it.
5. **Interaction unchanged (T119-5)** — the same check compares §12.10's interaction rows (frame, pan, zoom, drag,
   preview, hover, inspect, undo, the season and festival switches, Find's suggestions and glow) with the previous
   release's and fails any relaxed row.
The wait rows are `timing` metrics of the report (V12 §3.4.2), their bar the `BenchBarDef` `T119-2` (owner `base`);
their runs sit in §13.8's timing phase, never beside a calibration job (V12 §6).

**3.15.10 Item 120 — Find, a view.** V09 builds Find — its panel, type-ahead, chip grid, results list, phone sheet, the
`live.find` overlay provider and Coverage folded into Show gaps — and runs its screens' bars; this volume measures item 120
(k)'s clauses with one pin, five statistics and two timings, each 0 by rule or within its budget, on V09's app harness
over the Find fixtures: B-CITY-lite's seeds of every rung, V07's village fixtures and a dossier fixture (its institutions'
names first), each with three chip sets — one institution kind, one named place or area, one chip spanning several kinds
(an "all smiths") — drawn from the kinds the town holds by the testkit stream `find/<seed>` (V12 §3.13), with Show gaps off
and on:
* **the document hashes identically with Find on and off, and turning everything off restores byte-identical tiles** — the
  pin `item120.find` (`view`, `tiles`; V12 §2.13): each suite document opened with Find `off` and with each of its chip
  sets gives one model digest and identical saved bytes, the edit log included, and the tiles drawn after Clear equal the
  pre-item tile goldens (Find is an overlay and never re-renders a base tile);
* **each chip's matches equal the gazetteer query's rows at the key** — `find.matches`: per chip, the entities Find draws
  against §11.2's gazetteer rows for the chip's class, name or area at the view's key, mismatches counted;
* **the knowledge canary never surfaces** — `find.leaks`: on T-V9-66's canary fixture (V10's T-V10-6) under a player view,
  every suggestion, count, glow, pin and ghost pin naming a withheld entity;
* **the filter survives every band and layer change and every commit, advance and undo** — `find.held` over a step script
  on each fixture document: the city, neighbourhood, building and interior bands in turn, Ground, Below and Sky in turn, a
  commit that adds a match and one that removes one, an `advance` where the document admits one (V06) and an undo — at
  every step the chip set unchanged and its matches equal to a fresh evaluation there (a new match glowing, a removed one
  dark);
* **at the city band every match has a pin or a bubble** — `find.pins`: matches with neither, at every city-band stop from
  item 116's limit inward;
* **every chip has its second cue** — `find.cues`: chips without their own glyph and halo dash pattern, over chip sets of
  one to twelve chips (past eight the colours repeat and the glyph tells them apart);
* **the interaction budgets of item 120 (j) hold at the metropolis cap** — `time.findSuggest` (a key to its suggestions
  drawn) and `time.findGlow` (a chip's click to its matches' glow drawn) in §12.1's timing phase at the METROPOLIS cap,
  against §12.5's overlay budget, their rows among V12 §3.15.9 (5)'s interaction rows.
The five statistics are C rows of the nightly statistics, each 0 by rule; a non-zero value fails its bar naming the
fixture, the chip and the entity or step (V12 §3.12). Find adds no `StatBarSpec` (its clauses are properties of one view,
not tendencies) and no register entry (V12 §3.11). The clerk's "show me" is V10's bar, the list entries V08's, the
lexicon V11's, the area targets and Show gaps' units V01's, the interior rooms V03's, the matches and ghost pins on Below
and Sky V04's and V05's, the village rungs V07's — each volume's own part of item 120."""


def add(E, RETITLE):
    # ---------------------------------------------------------------- §3.4
    h = '### 3.4 The metric suite'
    E(h, "per deep void: whether an access reaches it;",
      "per deep void (a connected component of a system's parts of positive area whose tops lie deeper than `DigRule.reachM` below every footprint over them): whether an access reaches it;",
      tag='VV1112-13')
    E(h, """| item 119's one-time waits, click to complete result, on the reference hardware (§12.1), and the time from the click to the first progress frame (V12 §3.15.9) | — (ours) | item 119 (f) |""",
      """| item 119's one-time waits, click to complete result — `advanceTime` the whole advance and `historyReplay` the replay with the peak's generation before it, each in total (item 119 (a2)) — on the reference hardware (§12.1), and the time from the click to the first progress frame (V12 §3.15.9) | — (ours) | item 119 (f) |
| `time.findSuggest`, `time.findGlow` | timing | — | item 120 (j)'s interaction times at the METROPOLIS cap on V09's app harness: a key in Find's box to its suggestions drawn; a chip's click to its matches' glow drawn | — (ours) | item 120 (k): §12.5's overlay budget (V12 §3.15.10) |""",
      tag='item 119 (a2); G120')
    E(h, """decorations over a gate's passage or a label keep-out (0 by rule) | — (ours) | item 118 (h) (V12 §3.15.8) |""",
      """decorations over a gate's passage or a label keep-out (0 by rule) | — (ours) | item 118 (h) (V12 §3.15.8) |
| `find.matches`, `find.leaks`, `find.held`, `find.pins`, `find.cues` | model (the overlay provider's match set and §11.2's rows) / render (pins, bubbles and cues as drawn) | f | on V09's app harness, per chip of a Find fixture's chip set at a view key: the entities Find draws against the gazetteer query's rows at that key, mismatches counted; under a player view on the knowledge canary fixture, the suggestions, counts, glows, pins and ghost pins naming a withheld entity; over a step script of band and layer changes, commits, an advance and an undo, the steps whose chip set changed or whose matches differ from a fresh evaluation there; at the city band's stops, the matches with neither a pin nor a count bubble; the chips without their own second cue — each 0 by rule | — (ours) | item 120 (k) (V12 §3.15.10) |""",
      tag='G120')
    E(h, """and items 117 and 118 are looks: every `render` metric and panel render draws at the standalone default view — midsummer,
decorations off, `cvdVariant` `none` — whatever""",
      """and items 117 and 118 are looks and item 120 a view: every `render` metric and panel render draws at the standalone
default view — midsummer, decorations off, Find off, `cvdVariant` `none` — whatever""", tag='G120')

    # ---------------------------------------------------------------- §3.6b
    h = '### 3.6b Share, sweep, paired and two-sample bars'
    E(h, """| 104 (h) (8): a compatible chain's in-town nodes within their links' comfortable distances in most placements | most | `withinComfort` over those links | as above | — |""",
      """| 104 (h) (8): a compatible chain's in-town nodes within their links' comfortable distances in most placements | most | `withinComfort` over those links | as above | base T104-3 (its comfortable-distance clause; the spec's `ownerBar`) |""",
      tag='VAP-26')
    E(h, """| 107 (g): a coverage class's served share above random with the web on; a spaced class's nearest-member distance above random | null, rank (scope `town`) | `servedShare` per coverage class on its own unit; `nnSameKind` | B-CITY CITY and METROPOLIS, 50 each | — |""",
      """| 107 (g): a coverage class's served share above random with the web on; a spaced class's nearest-member distance above random | null, rank (scope `town`) | `servedShare` per coverage class on its own unit; `nnSameKind` | B-CITY CITY and METROPOLIS, 50 each | base T107-1 (the `servedShare` specs' `ownerBar`), T107-2 (the `nnSameKind` spec's) |""",
      tag='VAP-26')
    E(h, """  `{ dossierEvent: 'burial' }`, `extendGrowth` — the base's own events and commands, never a test-only path.""",
      """  `{ dossierEvent: 'burial' }`, `extendGrowth`, `{ week }` (item 117's year position, set as V09's season control sets
  it: a look, the model untouched) — the base's own events, commands and view actions, never a test-only path.""",
      tag='VAP-30 (week steps)')
    E(h, """  repair); 0 violations, each reported with the record, the step and both values (V12 §3.15).""",
      """  repair); 0 violations, each reported with the record, the step and both values (V12 §3.15). A script of `{ week }`
  steps alone checks a look week by week (item 117 (i): `noIceSnow`, `iceOrder`, `seasonStyles`; V12 §3.15.7).""",
      tag='VAP-30 (week steps)')

    # ---------------------------------------------------------------- §3.7
    h = '### 3.7 Tuning runs — table-version bumps with declared shifts'
    E(h, """bump. Items 117 and 118 move no model digest: their releases shift only render goldens drawn at a non-default week or
festival, as declared view shifts (§13.3).""",
      """bump. Items 117, 118 and 120 move no model digest: their releases shift only render goldens drawn at a non-default week
or festival or with a Find chip on, as declared view shifts (§13.3).""", tag='G120')
    E(h, """byte-identical to the base" bar is a `NoOpPin` registration on this engine (V12 §2.13's set; §13.2's convention (5)), and
each volume pin that restates one (V02's T-V2-50, V04's T-V4-69, V05's T-V5-15, V06's T-V6-65, V11's T-V11-31, V07's
village pin) registers its suites here and cites it.""",
      """byte-identical to the base" bar is a `NoOpPin` registration on this engine (V12 §2.13's set; §13.2's convention (5)), and
each volume pin that restates one registers its suites here and cites it, on the pin V12 §2.13 lists it under: V01's
T-V1-4 (e); V02's T-V2-50; V03's T-V3-34; V04's T-V4-47, T-V4-69 and T-V4-77 (d); V05's T-V5-15, T-V5-19 (c), T-V5-22 (b)
and (k), T-V5-27 and T-V5-33's item-111 clause; V06's T-V6-12 (its `w_sun` clause), T-V6-44, T-V6-65 and T-V6-71 –
T-V6-74; V07's pins by its §7 rule (T-V7-33, T-V7-38, T-V7-52, T-V7-58, T-V7-59, T-V7-62, T-V7-65, T-V7-66); V08's
T-V8-50 and T-V8-53; V09's T-V9-57; V10's T-V10-43 and T-V10-45; V11's T-V11-13, T-V11-31 and T-V11-38 – T-V11-41 (b).
V02's T-V2-37 and V10's T-V10-10 are unit properties of one cell and register none.""", tag='VAP-17')
    E(h, """`raisedWays`, `deck`, `roster.specialisations`, `deck.landmarks`), V11 §3.7.4's web off form for items 105 and 107, the
   cells the owner bar names otherwise;""",
      """`raisedWays`, `deck`, `roster.specialisations`, `deck.landmarks`) and its rows for items 111, 113, 114 and 115 (the
   `climate` dry cells, `history.replay`, `walls.condition`, `grandeur.ceiling`), V11 §3.7.4's web off form for items 105
   and 107, the cells the owner bar names otherwise (items 102, 103, 106 and 109);""", tag='VV1112-14; VAP-16')
    E(h, """5. **The other kinds.** A `rungScope` pin (item 115) requires its rungs' suites byte-identical across the item's bump, its
   record naming only the other rungs' seeds. A `view` pin (items 117, 118) opens each suite document at every listed view
   value and requires one model digest (§6.2) and identical saved bytes at all of them; with `tiles`, the tiles drawn with no
   festival equal the pre-item tile goldens (§13.4).""",
      """5. **The other kinds.** A `rungScope` pin (item 115's `item115.ceiling`, beside its `offForm` pin `item115.off`) requires
   its rungs' suites byte-identical across the item's bump, its record naming only the other rungs' seeds. A `view` pin
   (items 117, 118 and 120) opens each suite document at every listed view value and requires one model digest (§6.2) and
   identical saved bytes, the edit log included, at all of them; with `tiles`, the tiles drawn with the view off — no
   festival; Find cleared after its chips were on — equal the pre-item tile goldens (§13.4).""", tag='VAP-16; G120')
    E(h, """   planted table shift re-records both sets with matching stage lists, a planted season-dependent model write fails the
   season pin, and a planted TOWN change fails the rung pin.""",
      """   planted table shift re-records both sets with matching stage lists, a planted season-dependent model write fails the
   season pin, a planted chip-dependent model write or log entry fails the Find pin, and a planted TOWN change fails the
   rung pin.""", tag='G120')

    # ---------------------------------------------------------------- §3.9
    h = '### 3.9 The owner\'s sittings — one panel engine'
    E(h, """| Fantasy Manor 20 | the ladder street (V02 §7.5 (2)) | V02 (item 499) |""",
      """| Fantasy Manor 20 | the ladder street and the item-110 buildings (V02 §7.5 (2), (3)) | V02 (item 499) |""", tag='VAP-31')
    E(h, """| SOLO 30: ten CITY and five METROPOLIS underground bands, each seed in the historical and the navigable mode, shuffled, each framed to hold the cathedral's crypt (or the largest church's) and the largest catacomb complex; questions `legibility` and `realism` | — | V04 |""",
      """| SOLO 30 as V04 §7 states it: ten CITY and five METROPOLIS underground bands, each seed in the historical and the navigable mode, a ruin among them, shuffled, each framed to hold the cathedral's crypt (or the largest church's) and the largest catacomb complex; questions `legibility` and `realism` | one render in the reference family's hatched style beside the set (`styleReference`, V04 §7) | V04 |""",
      tag='VAP-32 (V12 part)')
    E(h, """PNG at the standalone default view (midsummer, decorations off, `cvdVariant` `none`);""",
      """PNG at the standalone default view (midsummer, decorations off, Find off, `cvdVariant` `none`);""", tag='G120')
    E(h, """later, the ladder street with M6's panel, and the non-blind label pass.""",
      """later, the ladder street and the item-110 buildings with M6's panel (one `reads` answer per item, the stepped temple's
summit offset shown and named, V02 §7.5 (3)), the hatched-style render beside V4-U5's set, and the non-blind label pass.""",
      tag='VAP-31; VAP-32')
    E(h, """town?"; `reads` — "Does this read as {subject}?".""",
      """town?"; `reads` — "Does this read as {subject}?" (each item-110 building's subject V02 §7.5 (3)'s word for it: a stepped
temple, a terraced palace, a pagoda, an amphitheatre, a bridge street).""", tag='VAP-31')

    # ---------------------------------------------------------------- §3.11
    h = '### 3.11 The calibration register — no provisional number dangles'
    E(h, """V07 §3.9 (1)); and the calibratable look rows of items 117 and 118 (V11's season, leaf, decoration and motif densities and
week bands).""",
      """V07 §3.9 (1)); and the calibratable look rows of item 117 (V11's season, leaf and leaf-cover rows, registry rows 98–101: their
densities and week bands).""", tag='VV1112-16 counterpart')
    E(h, """| V04's span-rule constants, the cells `raisedWays.structure.span` (row 80; V11 §3.24.2's name map; their values in §2.7, item 244, from V04's request BCR-V4-45): `vaultShare` by kind (V04's `raised.vaultShare`, scaled by the era and culture `raisedVaultM`),""",
      """| V04's span-rule constants, the cells `raisedWays.structure.span` (row 80; their values V11 §3.24.2, J-V11.97 — the base's §2.7 support step and span rule, file f item 244 from V04's request BCR-V4-45, and V04 cite the cells): `vaultShare` by kind (`span.vaultShare`, scaled by the era and culture `raisedVaultM`),""",
      tag='VV1112-07; VM-R0S-21')
    E(h, """| `wall.condition` over the epochs; `bar.T114g.sustained`, `bar.T114g.oldestFirst` | the panel rule |""",
      """| `wall.condition` over the epochs; `bar.T114-5`, `bar.T114-4` (their specs `T114g.sustained`, `T114g.oldestFirst`, V12 §3.15.4) | the panel rule |""",
      tag='VAP-30')
    E(h, """| V11 | `measure` at the milestone that lands the derivation row (its seat writes the id, V12 §2.8) on item 114 (g)'s generation-time fixtures, then `corpus` possibility (E4) at M-CAL | `wall.condition`; `bar.T114g.generation` | V12 §3.6b's default |""",
      """| V11 | `measure` at M2b, where §7.7's condition row lands (§13.8), on T114-7's readiness × wealth fixture grid, then `corpus` possibility (E4) at M-CAL | `wall.condition`; `bar.T114-7` | V12 §3.6b's default |""",
      tag='VAP-30')
    E(h, """Items 115's ceiling table and 118's decoration and staging-keyword tables are enumerations (not calibratable; V11) and take
no entry; items 116's zoom-out margin stop, item 119's comfort level and every time budget are engineering constants outside
the register (*The provisional-number lint*), each provenance note naming its confirming bar.""",
      """Item 115's ceiling table and item 118's decoration, staging-keyword, motif and generic-festival tables (registry rows 97 and
102–105) are enumerations (not calibratable; V11) and take no entry; item 120 adds no line — its search lexicon
(V11's labels, synonyms and groups) is a word list, and a calibratable cell its rows add takes the default line like any
column; item 116's zoom-out margin stop, item 119's comfort level, item 120's interaction budgets and every time budget
are engineering constants outside the register (*The provisional-number lint*), each provenance note naming its
confirming bar.""", tag='VV1112-16 counterpart; G120')
    E(h, """times; V10's T-V10-8 budget row; item 116's margin stop; item 119's comfort level) is outside the register""",
      """times; V10's T-V10-8 budget row; item 116's margin stop; item 119's comfort level; item 120's interaction budgets) is
outside the register""", tag='G120')

    # ---------------------------------------------------------------- §3.12
    h = '### 3.12 Failure handling — every failure, its rung, its report'
    E(h, """| a one-time wait beyond the ten-second comfort level; a wait over one second with no progress frame; a slower-than-target step with no measured gain | the wait timer and the budget-register check (V12 §3.15.9) | none at the harness: the owning path takes its §12.10 row's change | the bar fails naming the wait, rung and seconds, or the §12.10 row |""",
      """| a one-time wait beyond the ten-second comfort level (advance time and the history replay in total); a wait over one second with no progress frame; a stage above its §12 target with no `perf.qualitySpend` row standing, or a row whose `gainBar` fails, whose gain the release's runs do not show or whose run is absent | the wait timer and the budget-register check (V12 §3.15.9) | none at the harness: the owning path takes its §12.10 row's change, or the row is removed by the fixing change and the stage runs its target path (V11 §3.25.8: the quality path runs only while its row stands) | the bar fails naming the wait, rung and seconds, or the `perf.qualitySpend` row and its §12.10 row |
| a Find chip whose matches differ from the gazetteer's rows; a withheld entity in a suggestion, count, glow, pin or ghost pin; a chip set lost or a match stale after a band, layer or step; a city-band match with no pin or bubble; a chip without its second cue | the `find.*` statistics (V12 §3.15.10) | none: a property | the bar fails naming the fixture, the chip and the entity or step |""",
      tag='VV1112-06; item 119 (a2); G120')

    # ---------------------------------------------------------------- §3.14
    h = '### 3.14 The known-city fixtures — one engine for both (item 110 (e), (f); J78; T101-6)'
    E(h, """the building bars on K2 V02's (T-V2-44 –
T-V2-47),""", """the building bars on K2 V02's (T-V2-44 –
T-V2-47, T-V2-51 on its terraced wards and T-V2-42's arena part),""", tag='VAP-29')

    # ---------------------------------------------------------------- §3.15
    h = '### 3.15 The owner rules 111–119 on the harness'
    RETITLE[h] = '### 3.15 The owner rules 111–120 on the harness'
    E(h, """Each item's bars are §13.2's (items 111–113 numbered there; items 114–119 by their clauses); this section registers the
part of each that runs on this volume's machinery — its specs, pins, metrics and register lines — and names the owner of
every other clause. Spec ids are this volume's (`T111d.walk`, as `T110b.*`), each carrying its base bar as `ownerBar`; their
seed families follow V12 §2.4 under the spec id. Tiers and milestones are §13.8's.""",
      """Each item's bars are §13.2's — items 111–119 numbered there (T111-1 – T119-5), item 120 by the clauses of its (k); this
section registers the part of each that runs on this volume's machinery — its specs, pins, metrics and register lines —
and names the owner of every other clause. Spec ids are this volume's (`T111d.walk`, as `T110b.*`), each a `StatBarSpec`
or `NullModelSpec` carrying its base bar as `ownerBar`; a base bar registered as a `BenchBarDef` takes the bar's own id
(V12 §2.1). Their seed families follow V12 §2.4 under the spec id. Tiers and milestones are §13.8's.""", tag='VAP-30; G120')
    E(h, """  row is the bar's violation.""", """  row is the bar's violation; T2's spring-fed oasis is V09's T-V9-71.""", tag='VV1112-17')
    E(h, """V08 supplies the dossier's history fixtures. This volume registers:""",
      """V08 supplies the dossier's history fixtures; the History chip is V09's T-V9-73. This volume registers:""", tag='VV1112-17')
    E(h, """* **The replay's budget** — its wait is `wait.historyReplay` (V12 §3.15.9), measured click to complete on the history
  fixtures at every rung (their peaks up to METROPOLIS) against item 119's ten-second comfort level, with V06 §6.7's
  replay budget reported beside it as the target; the harness's own cost of the item-113 bars is V12 §6's row.""",
      """* **The replay's budget** — its wait is `wait.historyReplay` (V12 §3.15.9), measured click to complete in total — the
  peak's generation and every replay epoch, never per epoch (item 119 (a2)) — on the history fixtures at every rung (their
  peaks up to METROPOLIS) against item 119's ten-second comfort level, with V06 §6.7's replay budget reported beside it as
  the target and the cadence the run used (V06's coarsening); the harness's own cost of the item-113 bars is V12 §6's row.""",
      tag='item 119 (a2)')
    i0 = next(i for i, l in enumerate(L) if l.startswith('**3.15.4 Item 114'))
    i1 = next(i for i in range(i0, len(L)) if L[i].startswith('### 3.16 '))
    while not L[i1 - 1].strip():
        i1 -= 1
    old = '\n'.join(L[i0:i1])
    E(h, old, NEW_315_4_TO_10, tag='VAP-16, VAP-30, VV1112-06, VV1112-17, item 119 (a2), G120')

    # ---------------------------------------------------------------- §3.16
    h = '### 3.16 Edges and combinations (principle (11))'
    E(h, """view state (layers, seasons, festivals,
  `cvdVariant`)""", """view state (layers, seasons, festivals, Find,
  `cvdVariant`)""", tag='G120')
    E(h, """| 30 | release notes and the owner's report · no run, one frame | V12 §5.5 | report ("no calibrated value moved"; one page) | T-V12-42 (30) |""",
      """| 30 | release notes and the owner's report · no run, one frame | V12 §5.5 | report ("no calibrated value moved"; one page) | T-V12-42 (30) |
| 31 | item 120's measurements · no chip, a chip whose last match is removed, a withheld kind, every band and layer, one to twelve chips, the metropolis cap | V12 §3.15.10: no chip is the pin's `off` value; a chip with no match left counts 0 and stays in the set, dark; a withheld kind is never offered, counted or drawn; the city, neighbourhood, building and interior bands and Ground, Below and Sky are steps of the script | report (the statistic's row, counted); never a lost chip or a silent pass | T-V12-52 |""",
      tag='G120')
