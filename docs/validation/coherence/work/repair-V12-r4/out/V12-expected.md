# Design volume 12 — Calibration, reconciliation and parity measurement: how the built generator is tuned against the references and later the corpus

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V12-calibration, its revisions, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds the calibration harness over the base (`docs/ARCHITECTURE.md` with files f and g
applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`). **Citations:** a bare `§n` or `II.n` is the
base's; `Vnn §n` is a design volume's section, this one included (`V12 §3.11`); a list after a volume prefix stays in that
volume; `item n` is an amendment item — 1–101 the owner's instructions, file g's items, from 102, its owner and program rules, 200 and
above file f's, each the applied text of a volume's base change request (V12 §10 lists this volume's); `J-VI.n` is a
volumes-integration decision (`docs/volumes/_integrate.md`), cited, never restated. Decisions are J-V12.n (V12 §9), bars
T-V12-n (V12 §7), owner questions Q-V12-n (V12 §11, every one answered). **Clean room.** This volume is an implementer
input under §17.1 (1): it names no reference class, method, grammar, palette or asset; reference evidence is cited by file
and section only, and every number it quotes from a capture is a measured behaviour (§17.1 (6)). The corpus was not
read: the machinery and the process follow `partitioned/README.md`'s rules alone.

## 0 In plain words

**What this part of the program is.** Once the generator is built, its rule tables are full of numbers — how far a lane
may bend, how wide a rich plot is, how often a market sits off the main square. This volume sets those numbers right and
proves it, first against the other generators (MFCG, FTG, Neighbourhood, Village Generator and Fantasy Manor) and later
against the owner's historical map collection — without ever changing how the generator works. It runs as four loops.

1. **Measuring the references.** A research helper measures our recordings of the other generators — how much streets
   turn, how big buildings are, how many gates a town has — on towns whose seeds were fixed by a formula before anything
   was captured, so nobody can pick flattering examples. Only numbers cross into the product's folder: never a picture, a
   name, a colour or a line of anyone's code.
2. **Measuring ours the same way.** The product measures its own towns with the very same code, so like is compared
   with like. Every number has a band worked out by one written rule; each night a report says, for every comparison,
   "in band", "out of band" or "for information".
3. **Tuning.** When one of our numbers is out of band, a table value is changed — never the code — by a small, recorded
   search on practice towns kept apart from the test towns, then checked on a second set it never saw. Each change is a
   new version of that table, declared in the release notes in plain words ("lanes now bend a little more, matching FTG's
   streets"), and saved towns keep opening exactly as they were made.
4. **The owner's eye.** At four milestones — M1 (the look check), M2b, M4 and M5 — the owner gets one sitting page of
   about an hour: pairs of maps, ours beside a reference, the sides hidden, three questions per pair (which is easier to
   read, which looks more like a real town, which would you rather use). The later stages' pages join the next of these
   sittings once built; a page the owner has not rated stays "provisional — not rated". Only the owner's answers let a
   milestone say "at parity" or "mastered"; a machine never says it for them.

**Tendencies, not guarantees.** Many of the owner's rules are leanings — "the tannery is usually downstream", "a town that
grows over a cavern usually breaks into it". The harness proves each by counting over many practice towns: it ranks each
town against the same town shuffled at random (a fair coin breaking exact ties), counts members exactly where the
question is "how many landed on the right plots", or watches a rate climb as towns grow — with rules worked out
beforehand so that chance almost never passes and a real leaning almost always does. A failing bar re-runs once on fresh
towns before anything changes. Where the owner's own volume states how a bar passes, that statement wins.

**Rules that are the owner's stay the owner's.** Some numbers are the owner's word — a catacomb only under a cemetery,
the cathedral always with a crypt, raised ways generated only in cities. No tuning, fallback or historical map moves
them; a historical map that shows something an owner's rule excludes goes to the owner as a question with the
recommendation "keep the rule". Catacombs are checked never to shrink on any kind of rebuild, and to fill their ossuaries
when they cannot grow.

**Later: the historical maps.** After the standalone generators are built, the owner's historical map collection adjusts
the default numbers and bands — never the machinery ("what we built stays the base"). One historical example proves
that something is *possible*, never that it is *common*; only a fair sample of measured plans, chosen before anyone
looks at the answer, says how common. The collection teaches drawing, never naming, and its 53 held-back plates are never
used. MFCG's and FTG's behaviour stays exactly reachable through the parity presets; the historical values arrive as a
"historical" layer that becomes the default for its era and region only where the owner's sitting passes it.

**The owner's later rules.** Terraces, raised ways, deck plots and stepped temples (item 110) are measured against our
own rules — no other generator makes them — and a second test city made from an original sketch (a port with a
sea-anchored wall, a walled harbour, terraces, a raised road and a stepped temple) must come out as sketched every time,
as must the first. Water in dry country (item 111), history at generation (item 113), walls that decay into gaps and patchwork and
recover (item 114), the grandeur ceiling of small places (item 115), the zoom-out limit (item 116), seasons (item 117),
festival decorations (item 118), Find, the view that makes what a user looks for glow on the map (item 120), the
resolution setting that keeps the map smooth up to 4K (item 121), the camps, cordons and ruins a SettlementForge siege,
plague or disaster shows while it lasts, sized by the armies and crowds the dossier counts (item 122), a ruined
building's floor plans broken where it decayed (item 123), light passing weather (item 124), the dossier as the map's
only input (item 125) and the map on tablets and desktops only (item 126) each get their bars here; colour-blind-safe
styles (item 112) get their style check's threshold and the game-master trial's findings in the calibration record; and
every one-time wait is timed against its target and the ten-second comfort level (item 119). Turning any owner item's
new rules off gives back exactly yesterday's towns, and a season, a festival, a Find view, a crisis look, the weather,
the resolution setting, the host around the map or the window's size never changes the map itself, nor does a building
that never decayed draw differently — each proved by a byte-for-byte pin.

**How it feels to the owner.** A one-page dashboard in plain words after each nightly run; the four sittings; and release
notes that name every number that moved, what it was matched against and by how much, with one plain line for each new
behaviour switched on.

## 1 Scope, the base hooks consumed, and what is out of scope

**Built to depth here.** The calibration harness end to end: the metric suite as a registry with one implementation run
on every source (V12 §2.1, V12 §2.2, V12 §3.4); the numbers-only crossing of the firewall (V12 §3.3); the
capture-and-measure loop with pre-registered seeds (V12 §3.2); the band arithmetic and the parity run (V12 §3.5); the
correlation harness of every "above a random baseline" bar (V12 §3.6) and the share, sweep, paired and two-sample harness
of every other tendency bar (V12 §3.6b); tuning runs as table-version bumps with declared shifts (V12 §3.7); reference
drift (V12 §3.8); the owner's sittings as one panel engine (V12 §3.9); the corpus reconciliation as a process (
V12 §3.10); the calibration register that keeps every provisional number wired to its measurement (V12 §3.11); the
known-city fixtures' engine (V12 §3.14); the no-op pin engine every owner item's pin registers on (V12 §3.7.8, E-20) and
the feature switch-on bumps (V12 §3.7.6); the harness parts of items 111–126 (V12 §3.15), the game-master trial's findings in the calibration
record among them; and the edges of every mechanism here (V12 §3.16).

**The base hooks consumed** (cited, never restated):

| base hook | what this volume uses it for |
|---|---|
| §13.5 (B-REF; file f items 496, 497) | the metric catalogue (V12 §3.4), the band arithmetic (V12 §3.5), the report |
| §13.6 (D-5; item 500) | the panel engine and the sitting page (V12 §3.9) |
| §13.7 (JT, the thresholds, "not achieved"; item 501) | the register (V12 §3.11), tuning's scope (V12 §3.7), the correlation and tendency rows |
| §13.9 (items 503, 504) | every calibration run (V12 §3.7) and the reconciliation (V12 §3.10) |
| §13.3 (items 491–493) | every accepted run's declared shift; the goldens; `MilestoneRecord` |
| §13.2 (items 488, 489; the owner-item bars and their convention) | the per-town statistics; the bars this harness runs |
| §13.8 (item 502) | where each run lives (V12 §6) |
| §16 (item 533), §12.1, §12.10 | the build plan (V12 §8); timings normalised by the calibration score; item 119's budget register |
| §17.1 (1)–(8) (items 535–537) | the crossing (V12 §3.3), provenance, the name scan, the statistical methods |
| item 69 with §8.2's measurement render and §13.4's palette bar | the `palette.*` metrics and their re-check (V12 §3.10.7) |
| §7.6 (cells, parity presets, packs, the pinning hash; items 376, 377, 381, 382) | what a run may write and where (V12 §3.7.2, V12 §3.10.3) |
| §6.4 | table versions, output versions, retention, stage isolation |
| §11.1 (item 447) | the neutral measurement profile `MeasureInput` (V12 §2.2) |
| §14 (item 521) | where the code lives |
| D-2, D-5, D-30, D-31 | the historical packs' keys (V12 §3.10.3); the gates; METROPOLIS against MFCG only (J122) |
| §2.7 `Enceinte.closure` and `.condition` (items 575, 114); II.7.3, II.7.5, II.7.6 (item 109); §4.11 | the enclosure, the underground profile, the crypt, catacomb and sweep metrics (V12 §2.2, V12 §3.4.2) |
| §2.7 and §3.4 with item 110's `RetainingWall`, raised ways and deck plots (items 244, 245); §5.3's deck invariant | the profile's item-110 kinds; the `raised.*`, `retaining.*`, `deck.*`, `tier.*` metrics |
| §13.2's T101-6 | the known-city fixtures' engine (V12 §3.14) |
| §7.5 and §7.1's fate report; the suppression of file f item 260 | a release or a pack never re-opens a suppressed raised way (V12 §4.1) |
| §8.2's style check and variants (item 112); §2.9's view state (items 117, 118, 120); §8.8's zoom-out limit (item 116); §11.2's gazetteer under knowledge admission and §12.5's overlay budget (item 120) | item 112's register line; the view-invariance pins; item 116's bars; item 120's match, knowledge, persistence, pin and cue statistics and its interaction timings (V12 §3.15) |
| §8.8's Resolution setting, ultra tier, 4K ceiling and Auto loop with §8.4 (g)'s order; §12.1's ultra bar, §12.5's frame budgets and §12.8's canvases per tier (item 121) | item 121's pin and statistics (V12 §3.15.11) |
| §2.7's `ConditionOverlay`, §2.9's `crises` key and crisis framing, §7.7's DR44, §10.2's crisis look table and placement, §8.2's look rows, §8.8's surrounding ring (item 122, with (h)–(i)) | item 122's pin and statistics and item 122 (h)–(i)'s own bars (V12 §3.15.12) |
| §2.6 step 7's damage layer, §6.3's `plan.damage` thresholds, §8.6's drawing and §11.1's battle-map walls (item 123) | item 123's pin and statistics (V12 §3.15.13) |
| §2.9's weather effects, §6.1's `view.weather` stream, §8.2's effect marks, §8.4 (i)'s light terms and photosensitivity limit, §8.8's effects layer, §12.5's frame cost (item 124) | item 124's pin and statistics (V12 §3.15.14) |
| §11.3 – §11.4's host inputs (no data input but the dossier), §7.7's re-sourced DR1, DR3, DR19, DR29 and DR42, §2.9's week source (item 125) | item 125's pin and statistic (V12 §3.15.15) |
| §1's supported devices and §13.4's sessions on tablets and desktops (item 126) | item 126's pin and statistics (V12 §3.15.16) |

**Rules from other volumes this volume hosts.** V01's NG rows (T-V1-31) and panel (T-V1-32); V02's Fantasy Manor harness
and panel (T-V2-31, V02 §7.5); V07's VG rows and panel (T-V7-23, T-V7-29); V03's plan panel (V03 §8, `V3-P6`; Dwellings stays
a research-side note, never a `baselines.json` row); V04's underground panel (V04 §7); V05's island set (V05 §7,
descriptive); V06's history panel (V06 §12, on H-100); and file g's tendency bars — items 103 (e)–(f), 104 (g), 104 (h)
(8), 105 (k), 107 (g), 108 (f), 109 (a), (c), (i), (j) (5), (k) (6), 110 (b)'s two "likelier" clauses and its viaduct and
aqueduct presence, and 111 (d) — all run on this volume's machinery. Item 102 (g) is a fixture bar of V05 and V06, not a
random-baseline bar (V12 §3.6). Each volume keeps its rows' content; this one supplies the registry entries, bands,
harnesses and sittings. **Precedence (J-V12.48):** where the owning volume states a bar's pass rule, seeds or tolerance
(V11's T-V11-12 – T-V11-18; V04's T-V4-6, T-V4-19, T-V4-20, T-V4-43, T-V4-49 – T-V4-58; V06's T-V6-34 – T-V6-40), that
statement wins and the harness takes it as parameters (V12 §2.7, V12 §2.7b); V12's rules are defaults for a bar that
states none. The unit a g item names (a *void*, a *placement*, a *district*) is g's and binds the owning volume too.
Every volume's calibrate-later constant becomes one row of the calibration register (V12 §3.11). The second known-city
fixture's structure list, seed and golden are this volume's (item 110's HOMES); its canvas script is V09's, its
transcript V10's.

**Out of scope.** The stages that produce what is measured (§4, the volumes); the content of any rule table (V11, and
V04's `CatacombRule`); the owner items' bars as base text (§13.2 states them; this volume gives them their harness and
default pass rule, item 488); and the other volumes' bars (their own §7), among them every fixture bar of items 105–118
and 120–126 that is a plain conformance check — a quay reachable, at most one catacomb at TOWN, every catacomb under a cemetery or a
CITY or METROPOLIS quarry ossuary and none under a church, the cathedral always crypted with the largest crypt (V04's
T-V4-50, V06's T-V6-40, V11's T-V11-25), and item 110 (f)'s:
* generated retaining walls exactly where S10 or S11 levels ground steeper than `terrace.slopeMin` with a step above
  `terrace.stepMinCm`, never elsewhere (§13.2's T110-1; V06's T-V6-62 over epochs), reported by `retaining.onFlatM`
  (V12 §3.4.2), never a harness row;
* every way crossing a retaining wall a stair or a ramp;
* a raised part's zero junctions with part 0 and no shared planar arrangement (§3.4, §5.3; V04's T-V4-62 – T-V4-70;
  V01's T-V1-51);
* generated raised ways only at CITY and METROPOLIS, each with its reason, within the cap, and a suppression holding
  (T110-3; V06's T-V6-60; V01's T-V1-52) — V12's reach there is the guards (V12 §3.7.4), the owner-stamped cells (
  V12 §3.7.2) and V12 §4.1's rule for releases and packs;
* tiers nesting with one shadow each (V02's T-V2-44); deck plots within the deck's width and budget, falling with the
  deck (V02's T-V2-47; V06's T-V6-63; V01's T-V1-53).

Also out of scope: an editor sitting on the application itself (V09 §7.4 reuses only the protocol's shape); the game-master
trial's running and its `TrialRecord` (V09 §7.6 — this volume enters its findings into the calibration record, V12 §2.14); SettlementForge's inputs (V08) — calibration
never *targets* a dossier fact, reads dossier fields only as fixture inputs of its bars and guards (V12 §1b), and never
re-signs the dossier row sets (§13.9 (7)); a premium FTG capture (D-31; J122, Q-V12-1: no).

## 1b Wiring table

Every piece this volume adds has a producer and at least one consumer. **Every record** — its producer, its consumers,
where it persists and how it regenerates, undoes and migrates — is in V12 §2.11's one table (E-35); the pieces below are
the engines, commands, profiles and metric families that write and read those records, each with its base hook.

| piece (V12 §) | producer (fed by) | consumers (feeds) | base hook |
|---|---|---|---|
| `plat measure` (3.4) | a `MeasureInput`, a `.plat` document, a render, a trace or a count file | per-seed metric rows → `plat baselines aggregate` (research side) and `plat parity` (product side) | §13.2 `stats(doc, { level: 'bench' })` |
| `plat baselines aggregate` and the estimators (3.5) | per-seed rows | `Baseline.values`, `spreadKS` (research side); ours in `ParityReport` | §13.5 band rule |
| the crossing check `plat baselines check` and its M-1 twin (3.3) | a candidate numbers-only file (V12 §3.3's list) | the commit into `plat/`; `CrossingRecord` | §17.1 (3)–(5) |
| the seed families `seedOf`, the `sweep/…`, `null/…` and `known/…` families among them (2.4) | `@plat/testkit/seeds` | the capture plan (3.2), B-REF (3.5), B-CITY and the goldens (item 491), tuning train and holdout (3.7), the correlation and tendency harnesses (3.6, 3.6b), the panels (3.9), the known-city fixtures (3.14) | §13.3, §13.6 (2) `H32` |
| the capture plan `research/baselines/plan.json` (3.2) | `plan.py` over the seed families | the capture sessions; crossing check C7 | §16 M-1 |
| the parity dashboard and plain-words summary (5.1) | `plat parity --html`, `history.jsonl` | the owner; the seats; the milestone exit review | §14 `@plat/docs` |
| the correlation harness `plat nullmodel` (3.6) | `NullModelSpec`s; B-CITY's nightly towns or the spec's `null/…` family | `ParityReport` rows of class C / O (`pass`, `suspect`, `fail`); the confirmation re-run; corpus correlation rows; the register's `siting.*` and `bar.*` metrics | §13.2; §13.7; T71-3 |
| the tendency harness `plat statbar` with the step-script runner (3.6b) | `StatBarSpec`s; their levels' towns and fixtures | `ParityReport` rows of class C / O; the register's `bar.*` metrics; `known-defects.json` | §13.2; §13.7 |
| the panel engine `plat d5 seeds / render / verdict` (3.9) | `PanelSpec` registrations (V12 §3.9.1) | `seeds.json`, the renders, `D5Record` verdicts, `MilestoneRecord.d5` | §13.6 |
| the sitting page `research/d5/<panel>/sitting.html` (3.9, 5.4) | `build_sitting.py` over the product's renders and the reference images | the owner; `answers.json` | §13.6 (4)–(9) |
| the drift watch `research/baselines/watch.py` (3.8) | the references' live builds | `BaselinesFile.pins`; a `baselineShift` record at a pin change | §13.5 |
| the corpus adapter implementation (3.10) | the M-CAL adapter seat, research side, under the corpus's own rules | `CorpusMapMeta`, `SampleFrame`, `MeasureInput` files | §13.9 `CorpusAdapter` |
| the enclosure profile: `closure` and `enclosure` features (2.2) | the GeoJSON export's closing edges (item 447); the MFCG adapter's shore split (3.2.2); a corpus plan's drawn circuit | `walled.share`, `wall.*`, `gate.count`, `wall.barrierShare` (3.4.2); the corpus frames' wall rows (3.10.5) | §2.7 `Enceinte.closure`; §11.1 |
| the underground profile `undergroundInputOf` (2.2) | the model's underground systems (II.7.6; item 109's `ruin` record and its access records) | `grid.*`, `ruin.blockArea`, `plan.*` (3.4.2) → the paired, two-sample and sweep bars (3.6b) | II.7.6 |
| the profile's item-110 kinds and properties (2.2) | `measureInputOf`; §11.1's GeoJSON variants (item 447) | the per-part way graphs; `wall.*`, `bldg.*` reading only their kinds; T-V12-4, T-V12-38 | §11.1 |
| the model metrics `void.*`, `link.*`, `ladder.members`, `crypt.*`, `catacomb.*`, `raised.*`, `retaining.*`, `deck.buildings`, `tier.count`, `crossing.kinds`, `water.needRatio`, `ruin.survival`, `shade.gap` and the item-111–120 metrics (3.4.2, 3.15) | the model's records: V04's `CatacombComplex`, V03's `Basement.crypt`, the raised-way records (item 244; `source` derived at read; the founding rung from the founding epoch's record), S10 and S11's levelling, V02's tiers and deck buildings, the ways' `stair` and `ramp` flags and `W_STEEP_RAMP` reports, S6's water-balance function, the ruin's element records, `Enceinte.condition`, the view state and its renders, Find's matches (V09's `live.find` over §11.2's gazetteer) | the tendency bars (3.6b, 3.15); the guards (3.7.4); the register lines (3.11); the M4-110 and V4-U5 groups' reports; T-V11-33's bench; the nightly statistics | §13.2 bench metrics |
| the metric families `bar.<barId>` and `frame.<table>.<column>` (2.1, 3.4.2) | `plat build` from the registered specs and `BenchBarDef`s and the registry's calibratable columns; values by `plat parity` and, at a corpus run, the frames' rows | the register entries' `metric` lists (V12 §3.11; V02 §3.10.10, V06 §8, V11 §8); the lint (T-V12-20); the exits' history rows; the fallback runs' targets | §13.2; §13.5; §13.9 |
| the guards: `GuardSet.fixtureSuites` and the TOWN guard setting (2.5, 3.7.4) | B-DOSSIER-lite (§13.2, item 84), the owner-rule hook fixtures, K1 and K2, `tune/<id>/guard/TOWN/…` | a run's acceptance (3.7.5); `guardFlips` | §13.2, §13.8 |
| the structure engine and its three-path runner (3.14) | `KnownCityFixture`s; V09 §7.2's canvas script; V10's transcript | `StructureResult`s → T-V12-36, the guards, the M4-110 group, `MilestoneRecord.exitCriteria` `T-V12-36:<id>` | §13.2 T101-6 (item 489) |
| V11 §3.24.0's switch table — each owner item's off form (V11's rows) | V11 | the no-op pins' overlays (3.7.8); the parity presets, where they resolve off (3.4.4); the switch-on bumps | §7.6 `extension`; J-V11.12 |
| the switch-on bumps, `ShiftRecord.cause` of the base's kind `feature` (3.7.6) | the release that switches a family on | shift and cascade records; the release notes' plain line (5.5); the pins' off-state sets | §13.3 |
| the four raised-way bars `T110b.*` (3.6b) | forcing fixture sites (frozen S1), `Level.intent.wealthLevel`, the dossier landmark fixture (DR35) | the `raisedWays` register line (3.11); fallback runs bounded by the owner's floor (3.7.2) | §13.2 T110-3 |
| the M4 panel's M4-110 group (3.9.1) | the panel engine; K2 and five forcing-site towns | the `panel` stage of the item-110 register lines (3.11) | §13.6 |
| the wait timer and the budget-register check of item 119 (3.15.9) | §12.1's timing phase on B-CITY's browser runs; V11 §3.25.8's `perf.qualitySpend` rows (registry row 106) with §12.10's rows | the `wait.*` report rows; each `perf.qualitySpend` row's verdict; T-V12-50; the release's budget section | §12.1, §12.10 |
| item 120's measurements (3.15.10): `item120.find`, the `find.*` statistics and the Find timings | the Find view key (§2.9) set by the fixtures' chip sets; §11.2's gazetteer at the view's key; V09's `live.find` overlay on V09's app harness, its key and click timer | the pin's off-state sets; the nightly statistics' C rows; the timing phase's interaction rows (3.15.9 (5)); T-V12-52 | §2.9, §11.2, §12.5 |
| item 121's measurements (3.15.11): `item121.display`, the `resolution.*` statistics | V09's app harness on the reference, low-end and ultra-tier device fixtures (§12.1's tiers): `AppPrefs.resolution` set by the fixtures, §8.8's Auto loop and its changes with their reasons, the text-layer captures V09's T-V9-84 takes, §12.8's memory measurement | the pin's off-state sets; the timing phase's rows; the PR tier's check of T121-5's captures; T-V12-53 | §8.8, §12.1, §12.5, §12.8 |
| item 122's measurements (3.15.12): `item122.crises`, the `crisis.*` statistics and item 122 (h)–(i)'s own bars | §2.9's `crises` key set by the fixtures (`follow`, `off`, each look kind's `preview`); the crisis fixtures' `ConditionOverlay`s through DR44 and §10.2's placement (V01's `campLand` and `disasterDistricts`, V06's `frontierFor`); §2.9's crisis framing; §8.8's ring; the force and group sizes V08 reads (from M-SF) | the pin's off-state sets; the nightly statistics' C rows; the timing phase's rows (R12-37); T-V12-54, T-V12-55 | §2.7, §2.9, §7.7, §8.2, §8.8, §10.2, §12.5 |
| item 123's measurements (3.15.13): `item123.damage`, the `damage.*` statistics | each plan element's §6.3 threshold against the building's decay level (§2.6 step 7) — at the sweep's levels, and from M6-E through V06's `decayLevel` over weeks — on V03 §7's damage fixtures | the pin's off-state sets; the PR tier's checks, the decay runs' rows nightly; T-V12-56 | §2.6, §6.3, §8.6 |
| item 124's measurements (3.15.14): `item124.effects`, the `weather.*` statistics | V09's `AppPrefs.weatherEffects` and **Start a shower now** on V09's app harness; §6.1's `view.weather` stream at a session seed the testkit stream `weather/<fixture>` fixes; V11's climate rows' weather columns and the climate table's `settings.weather` block; §8.8's effects layer and the frame timer | the pin's off-state sets; the timing phase's and the visual-regression run's rows; the PR tier's checks and the nightly statistics' C rows; T-V12-57 | §2.9, §6.1, §8.2, §8.4 (i), §8.8, §12.5 |
| item 125's measurements (3.15.15): `item125.host`, `port.fallbacks` | the required-keys dossier and B-DOSSIER-lite through the port with no host context and with each fixture's `HostContext` (§11.3 – §11.4); the generation report's fallback lines | the pin's off-state sets; the nightly statistics' C rows; T-V12-58 | §7.7, §11.3, §11.4 |
| item 126's measurements (3.15.16): `item126.resize`, the `layout.*` statistics | V09's app harness: the resize script over the medium threshold; each tool's canvas script under touch events (V09 §4.12's list) | the pin's off-state sets; the PR tier's checks; T-V12-59 | §1, §13.4 |

**The dossier.** Calibration never *targets* a dossier fact: the dossier row sets are never a calibration target (§13.9
(7)), B-DOSSIER-lite's fixtures are not a seed family of any run, so a SettlementForge fixture never moves a default, and
FTG pairs take their populations from the captures (§13.6 (2)). Calibration always *guards* the dossier fixtures (
V12 §3.7.4: B-DOSSIER-lite runs on every accepted candidate), and its bars *read* these dossier fields as fixture inputs, each
through its derivation row, the derived fixtures registered in §13.2's frozen fixture manifest (item 84; §17.1 (3) makes
it the one door for a dossier into `plat/`):

| dossier field (V08) | derivation row | where this volume reads it | how |
|---|---|---|---|
| the population | DR23, DR7 | item 108 (f)'s population sweep levels (× 0.5 … × 2) | a derived fixture `<dossier>@pop×k` in the manifest; a level outside [1 500, 120 000] is `notApplicable` (V12 §3.6b) |
| `site.ruinEvidence` | DR30 | a level's forced ruin source (item 109 (b)) | a fixture record, never a test-only branch (J-V12.35) |
| the terrain and the mining deposits | DR31, DR1 | the mining boost's `higherWith` strata (item 109 (a)) | a fixture record; the site-stage factor is `SiteResources.ore` or the deposits |
| `economy.chains` (SettlementForge's `activeChains`) | DR33 | item 104 (h) (8)'s and item 105's custom-chain levels | V08's custom-chain fixtures |
| the burial, church, cathedral and monastery records, the Cemetery network | DR32, DR9 | the catacomb count and crypt levels (item 109 (k)) | the surveyed-dossier fixtures |
| `wealth.label` | DR6 | the elevated-road prosperity trend's dossier arm (item 110 (b)); item 114's generation-time condition fixtures; item 115's rich small-rung fixtures | the fixture's wealth word; the standalone arm sets `Level.intent.wealthLevel` |
| the institutions of significance ≥ V11 §3.24.2's `elevated.landmarkMinSignificance` and the custom `landmark` records on high ground | DR35 | the elevated-road landmark `higherWith` (item 110 (b)) | the same fixture with and without the landmark |
| the water-system record `aqueduct_or_water_system` | DR34 | the raised bump's shift records name the B-DOSSIER-lite towns carrying it (V12 §3.7.6) | read, never targeted: at CITY and METROPOLIS it makes the aqueduct's need count as met (V11 §3.24.7 (3)), never a declaration — the dossier declares no arches, so no raised way has a dossier source |
| `oasis_water` on a desert | DR40 (the site itself DR1's) | item 111 (d)'s "unless supplied by a dossier" conformance | a fixture record of the manifest |
| the history: `peakTier`, `tierHistory`, `populationHistory`, `calamityHistory`, the lifecycle, the events | §7.7's history rows DR36 – DR39 | item 113 (g)'s city-to-village, refounded and symbolic-peak fixtures | V08's history fixtures, registered in the manifest |
| the defence `readiness` label | DR41 (item 114 (d)) | item 114's generation-time condition fixtures | fixture records |
| the stamped ticks — the conditions' `triggeredAt`, the calamities' and the history's ticks, whose latest is a dossier-bound map's present week (§4.11 *The clock*; item 125 (b)) — and the terrain type (the season's climate row); `traditions` | DR42, DR43 | a campaign dossier opening on its latest stamped tick's week; a festival fixture's window; the required-keys dossier, with no tick, opening at the season control's midsummer (item 125 (e)) | fixture records; the view-invariance pins read them as view inputs only |
| the institutions' names and kinds | DR9, DR24 | item 120 (b)'s list entries on the Find fixtures (the dossier's names first; V12 §3.15.10) | a fixture record of the manifest; read as view inputs only, never a calibration target |
| the `activeConditions` and `stressors` (archetype or type, severity, tick and duration) and the calamities' `targets` | DR44 (DR28 for the calamity's aftermath) | item 122's crisis fixtures: each look in its condition's weeks, scaled by severity, a disaster's districts by its targets | V08's crisis fixtures in the manifest (M-SF), each disaster fixture a calamity with its linked `reconstruction` condition (V08 §3.16 (7) (b)); read as view inputs only, never a calibration target |
| the forces', coalitions' and travelling groups' sizes (in development; item 125 (d)'s final check confirms them) | DR44 (item 122 (h)) | item 122 (h)–(i)'s area, coalition, framing and ring bars | V08's force fixtures; a size absent or 0 reads as none given, the scale by severity and tier holding |
| only SettlementForge's required keys | each used field's standalone fallback (item 125 (b); V08's field table) | item 125 (e)'s full-map bar and `item125.host` | the required-keys dossier at every rung, V08's fixture in the manifest |

## 2 Data model

Everything below is test-side or repository data — code and JSON in `@plat/testkit` and `plat/calibration/`, plus
research-side files that never enter `plat/` — except the provenance fields `evidence` and `ownerRule` (§7.6), which ride
in the shipped tables, and `dist/evidence.json` beside them (V12 §2.10). None of it is document state: a `.plat` document
never holds a metric, a baseline or a run; it holds the table versions they produced (§6.4). **Units** are §2.1's
vocabulary (E-37); a metric names its unit from the subset `MetricUnit` below, where `deg` is degrees, `share` lies in
[0, 1], `ratio` is dimensionless, `luma` is 8-bit Rec. 601 luma, `rb` 8-bit R − B, `chroma` CIELAB C*ab and `z` a
standard score.

### 2.1 The metric registry

```ts
// @plat/testkit/metrics — code; `plat build` also writes dist/metrics.json (ids, versions, inputs, units, rows) for the docs and the research side
type MetricId = string   // dotted, stable, never reused: 'street.turn100', 'bldg.r4.60', 'fg.coverWalled', 'fm.towers' — V12 §3.4's catalogue
type MetricInput =
  | 'geo'     // computed on a MeasureInput (V12 §2.2): the same code on a reference, a corpus map and ours
  | 'model'   // only on our model: plots, prosperity, the generation report, the core statistics record (§13.2)
  | 'render'  // on a PNG: §8.2's measurement render (palette), the city band at the matched scale (recoverability, §8.5)
  | 'timing'  // §12.1's timing phase, normalised by the calibration score
  | 'trace'   // a stage's recorded trace at the bench level: S8's cut log (§4.6), S10b's placement log
  | 'counts'  // integer counts a harness writes: Fantasy Manor's family and element counts (V02 §7.4), NG hood and VG village counts
type MetricUnit = Extract<Unit /* §2.1 */, 'm'|'m2'|'ha'|'deg'|'share'|'count'|'perHa'|'perKm'|'ratio'|'bits'|'ms'|'s'|'luma'|'rb'|'chroma'|'z'|'none'>
interface MetricDef {
  id: MetricId;
  version: string            // semver: major = the definition changed (every baseline of it re-measured, V12 §3.4.3); minor = a new field; patch = no value change
  input: MetricInput;
  scale: 'metric' | 'free';  // free: angles, shares, counts, ratios, rank statistics — valid on a relative-scale input; metric needs metres
  sign: 'positive' | 'any';  // how a band widens (V12 §3.5.2): multiplicatively for positive quantities, additively otherwise
  absFloor: number;          // the smallest band half-width, in the metric's unit (a zero-width reference spread never gives a zero-width band)
  requires: FeatureKind[];   // MeasureInput kinds read; a source lacking one yields 'notApplicable', never 0
  stages: StageId[];         // the registered StageIds (§4.1) whose output it measures: a tuning run may only move cells those stages read (V12 §3.7.2)
  output: { kind: 'scalar'; unit: MetricUnit } | { kind: 'distribution'; unit: MetricUnit; edges: number[] /* fixed bin edges */ } | { kind: 'vector'; unit: MetricUnit; fields: string[] };
  perSeed: 'median' | 'mean' | 'share' | 'value' | 'sample';   // how one town's many values reduce; 'sample' keeps the distribution (KS rows)
  row: string;               // the §13.5 / §13.7 / volume row it serves, by its first cell ("street turning", "T-V2-31 family shares")
  tolerance: { abs?: number; rel?: number };   // two implementations agree within this (T-V12-3)
  costMs: number;            // per CITY town, single thread (V12 §6)
  sampling?: { label: string; n: number };     // a sampling metric's testkit stream label and sample count (R4's 1 500 buildings)
  plain: string }            // the release-note and dashboard sentence, with {ours}, {band}, {dir} slots — our own words
```

Metric code is pure: no clock, no global state; transcendental functions come from `dmath` (§17.4) and every sampling
metric draws from its testkit stream (V12 §3.13), so one `MeasureInput` gives bit-identical values on every host
(J-V12.9). Every field that decides a verdict — `sign`, `absFloor`, `output.edges`, `tolerance`, `costMs`, `stages` — is
filled for every catalogue row, stated or by V12 §3.4.2's default rules; a row whose field neither states nor defaults
fails `plat build`.

**Two generated families** (J-V12.65). A register entry is mostly confirmed by an owning volume's bar, and a bar is no
catalogue row, so `plat build` generates two families from registrations, each member a full `MetricDef`:
* **`bar.<barId>`** — the verdict statistic of one registered owner bar, `<barId>` the owner's bar id verbatim
  (`bar.T-V6-8`, `bar.T16-4`, `bar.T110b.viaduct`). It resolves to the registrations whose `id` or `ownerBar` equals
  `<barId>` — several give the vector of their statistics, passing only when each passes: a `StatBarSpec`
  (`StatBarResult.statistic`); a `NullModelSpec` (the statistic its pass rule tests — the share of towns with u > 0.5 on
  the rank route, the pooled p on the pooled route, the median margin on `margin`, the spec's own p in a `holm` family —
  while `siting.<spec>` stays the placement statistic itself, which a corpus row compares); or a `BenchBarDef` (below),
  which an owner registers for every bar its register lines name that no spec carries (a second owner's epoch form of a
  bar-map row among them: V06's T-V6-37 beside V04's T-V4-45). `unit`, `stages` and `row` are the registration's;
  `input: 'model'`, `scale: 'free'`, `sign: 'any'`, `perSeed: 'value'`, a scalar output (a vector for a bar of several
  clauses); no band — the verdict is the bar's own pass rule; `costMs` 0, the value read from the bar's own run. `plat
  parity` writes one row per registered bar of its tier (the statistic as ours, the bar's verdict, `baselineIds` empty). A
  `<barId>` with no registration does not exist, so the lint fails an entry naming it (V12 §3.11).
* **`frame.<table>.<column>`** — a declared sample frame's value for one calibratable column (the table id matched as the
  longest registered `TableId` prefix): the frame target rows (V12 §3.10.2) of the `geo` metrics the corpus run touching
  that column targets (V12 §3.10.5), each read in the frame's corpus variant, its row the frame's A2 verdict under its
  pack (V12 §3.10.6). It is `notApplicable` before its corpus run (M-CAL, or the later run `M-CAL/<layer>` that takes its
  column, V12 §3.10.1), on every source but a frame, and for a column no frame's run targets — whose entry then closes
  `fixed` with "no admissible frame" (V12 §3.11). It exists for every calibratable column.

```ts
type PresetArm = 'default' | PresetId   // the recipe a harness run generates its towns under (J-V12.72): 'default' — no parity preset applied (the
                                        // O and C rows; an owner bar's own towns); else PresetId (V11 §2.2: 'MFCG' | 'FTG' | 'VG' | 'FM' | 'NG').
                                        // Every `preset` field of V12 §2's records is a PresetArm, except CalibrationRun's `layer` and
                                        // CalibrationEntry.target, which name a cell's preset ENTRY ('FM' | 'VG' | 'NG'), never an arm
interface BenchBarDef {   // @plat/testkit/bars — an owner's bar that is neither a NullModelSpec nor a StatBarSpec, registered by its owner once a register entry names it
  id: string;             // the owner's bar id verbatim: 'T-V6-8', 'T-V2-32', 'T16-4', 'T-V11-30'
  owner: 'base' | 'V01' | 'V02' | 'V03' | 'V04' | 'V05' | 'V06' | 'V07' | 'V08' | 'V09' | 'V10' | 'V11' | 'V12';
  statistic: { what: string /* the owner's plain words */; unit: MetricUnit };
  stages: StageId[];      // whose output the statistic reads (V06's phase ids for a history bar); V12 §3.7.2 (4) reads them
  towns: { family: string /* 'bcity', 'golden' or the owner's fixture family (V06's H-100) */; perSetting: number;
           settings: { rung: Rung; water: WaterSetting; preset: PresetArm }[] };
  tier: 'pr' | 'nightly' | 'milestone';
  run(towns: { seed: string; doc: Document; bench: ReturnType<typeof stats> /* §13.2 */ }[]):
    { statistic: number | number[] /* one value per clause, in the owner's clause order */;
      verdict: 'pass' | 'fail' | 'notApplicable' } }   // pure: the owner's one implementation of its bar
```

### 2.2 `MeasureInput` — the neutral measurement profile

```ts
type ReferenceId = 'MFCG' | 'FTG' | 'NG' | 'VG' | 'FM'   // Dwellings stays a research-side note (V03 §7), never a source here
type FeatureKind = 'way'|'block'|'plot'|'building'|'wall'|'tower'|'gate'|'castle'|'square'|'district'|'water'|'river'|'pier'|'green'|'field'|'tree'
  | 'closure'|'enclosure'   // item 106: a natural edge closing a circuit (LineString); the enclosed area (Polygon)
  | 'gallery'|'chamber'     // the underground profile only: a system's passages (LineString with widthM) and rooms (Polygon)
  | 'retaining'             // item 110 (a): a retaining wall (LineString), never a `wall`
  | 'raisedSupport'         // item 110 (b): a raised way's pier or abutment footprint (Polygon), never a `building`
  | 'span'                  // item 110 (b): a raised way's span between two supports (Polygon; item 447); read by no metric
interface MeasureInput {   // one per town or map: §11.1's metric GeoJSON variant with this header in its sidecar
  header: {
    source: 'PLAT' | ReferenceId | 'corpus';
    build: string;                    // our output version; a reference build (§13.5's `referenceBuild`); the corpus adapter's version
    scale: 'metric' | 'relative';     // relative: no metric scale known (NG's vertex captures; a corpus plate without a scale bar)
    unitM?: number;                   // metres per input unit when metric and ≠ 1
    centre: [number, number];         // the settlement centre in input units (the plaza, else the wall ring's centroid, else the building centroid)
    rung?: Rung; population?: number; water?: WaterSetting;
    seedLabel?: string;               // the seed family path that made it (V12 §2.4) — never a place name
    layer?: 'surface' | 'underground'; // absent = surface; underground inputs exist only for our towns
    frame?: string;                   // corpus: the sample frame (V12 §2.9)
    options?: Record<string, number | boolean> };   // a reference's generation options, numbers and flags only
  features: MeasureFeature[] }
interface MeasureFeature {
  kind: FeatureKind; id: string /* opaque, file-local */; geometry: Geometry /* GeoJSON in input units; rings closed on read */;
  props: {
    class?: string;       // closed vocabularies: way 'arterial'|'street'|'lane'|'alley'|'track'|'aqueduct'|'unknown'; wall 'curtain'|'castle';
                          // water 'sea'|'river'|'lake' (a moat, a millpond and an oasis read 'lake'); square 'plaza'|'market'|'other';
                          // building: a class family key of V11 §3.4 or 'unknown'; gate 'land'|'water';
                          // closure J-VI.3's six barrier kinds 'shore'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte' (item 447);
                          // gallery and chamber: the system's `UndergroundSystem.kind` (§2.7, with item 109's 'ruin'), a fissure as 'cavern'
    state?: string;       // gallery and chamber: the part's closure state (§2.7's states) or 'unexcavated' (item 109 (j) (2))
    widthM?: number; storeys?: number; heightM?: number;
    district?: string;    // the id of the district feature it lies in
    use?: string;         // a class family key, for the siting statistics (V12 §3.6); a corpus map's trades mapped research-side
    prosperity?: number;  // PLAT only: the field's value at the feature (§4.5), 3 decimals
    part?: number;        // ways: 0 the ground, ≥ 1 a raised arena part (§3.4); absent reads 0
    raisedKind?: 'viaduct' | 'elevated' | 'aqueduct';     // a raised way's LineString only (item 447)
    source?: 'generated' | 'declared';                    // raised ways: derived at read (item 244) — declared by T4 or a skeleton file, else generated
    reason?: 'drop' | 'link' | 'water';                   // a generated raised way's recorded reason (item 110 (b))
    onDeck?: 'mole' | 'pier' | 'quay' | 'bridge';         // plots and buildings standing on a deck face (item 110 (d))
    stair?: boolean; ramp?: boolean;                      // way segments crossing a retaining wall, and a raised way's ends
    stepMinCm?: number; stepMaxCm?: number } }            // retaining walls: the least and greatest step over the whole wall (merged on read, below)
```

**Our way classes in the profile.** `measureInputOf` maps §2.4's `WayClass` once: `through` and `primary` → `arterial`;
`secondary` → `street`; `lane` and `cul_de_sac` → `lane`; `alley` → `alley`; `track` and `path` → `track`; `bridge` and `ford`
take the class of the way they carry; `quay` and `pier` are no ways for these metrics (`pier` features stay); `aqueduct`
stays `aqueduct` and enters no way graph and no way-distance statistic (V12 §3.4.2). A reference adapter maps its own
classes (V12 §3.2.2); a class it cannot map is `unknown`, which no class-specific metric reads.

`MeasureInput` carries no name, label text, colour or style: a reference's district names, a corpus map's place names and
every drawn word stay research-side (J-V12.2). For our towns `measureInputOf(doc, opts)` builds it from the model in
memory; T-V12-4 holds it equal to the metric GeoJSON export read back, `use`, `district`, `prosperity` and item 110's
kinds included (item 447, whose export supersedes item 456's raised-way, retaining-wall and deck clauses). **One reading rule** keeps that equality exact: the profile declares a subset of item 447's
properties, and the reader drops every exported property it does not declare — `deckMinCm`, `deckMaxCm`, `underuseSince`
on a raised way; `way`, `key`, `state` on a support; `use`, `state` on a span; `wall`, `run`, `highSide`, `material`,
`state` on a retaining wall; `condition` and `material` on a wall (items 575, 114); `deck`, `tiers` on a plot or building —
so the model-side builder never writes them and no `geo` metric reads them (the `raised.*`, `retaining.*`, `tier.*` and
`wall.condition` metrics that need them are `model` metrics and read the records).

**Runs merged on read** (J-V12.68). Item 447 exports a retaining wall as one LineString per run of equal state, and item
575 splits §11.1's wall LineStrings per run of equal condition. The reader merges them before any metric runs: the
`retaining` features carrying one `wall` id become one feature, runs joined in `run` order (a closed wall's ring closed),
`stepMinCm` and `stepMaxCm` the least and greatest over its runs; the `wall` features carrying one enceinte's `id` (§11.1's
entity address; a run has none, a `StretchRef` being never stored) that join end to end become one feature per **built
stretch** — a maximal part of the trace between closure edges, in trace order; each merged feature keeps its entity's
`id`. A condition or a state is no measurement input, so a worn, patched, breached, dismantled or landfall-buried stretch
measures as the built stretch it is part of, and a run boundary is never a stretch end. `measureInputOf` writes the same,
so T-V12-4's equality holds on a town whose walls a decline, a landfall or a hand edit has struck.

**Item 110's entities (J-V12.62).** A raised way's ways carry `part` ≥ 1 with `raisedKind`, `source` and `reason`; an
aqueduct is its way — a `way` of class `aqueduct` with `raisedKind: 'aqueduct'`, never a kind of its own; a raised way's
supports are `raisedSupport` polygons and its spans `span` polygons; a retaining wall is one `retaining` line with
`stepMinCm` and `stepMaxCm`; the way segments crossing one carry `stair` or `ramp`; deck buildings are `building` features
with `onDeck`; a stepped building's `heightM` is the top of its stack. No founding rung rides in the profile:
`raised.generatedBelowCity` is a `model` metric reading the founding epoch's record (item 244 stores none).

**The enclosure (item 106).** A wall metric reads the outermost *enclosure*: the `enclosure` polygon where the source gives
one — ours from the export of an enceinte closed by `ring`, `shore` or `barrier` (item 447), a corpus plan's drawn circuit
— else the outermost `wall` ring of class `curtain`. `wall` features are the built stretches only; `closure` features are
the natural edges that close the circuit (item 106 (a)), never counted as wall length, tower stretches or gates. The MFCG
adapter splits its exported ring the same way (V12 §3.2.2), so a shore-closed MFCG city and a cliff-closed town of ours
are measured by one rule.

**The underground profile (item 109).** `undergroundInputOf(doc, systemId)` writes one underground system — its galleries
as `gallery` LineStrings with their widths, its chambers as `chamber` Polygons, each with its system kind and state, every
part in every state (a ruin's collapsed and filled parts included, so its plan is measured as laid) — with
`header.layer: 'underground'`, the flag `options.sharedAxis` when a ruin took item 109 (c)'s shared-axis chance, and
`header.centre` at the system's centroid. The same code that measures a town then measures a ruin's plan or a cavern. It
exists only for our towns — no reference and no corpus plate has an underground — and never crosses the firewall. **A
chamber's monument is not a chamber** (V04's `Chamber.monument`, item 110 (c)): its tiers are `building` features of the
underground layer with `props.class` the monument's row, and no plan metric (`plan.*`, `ruin.blockArea`, `grid.*`) reads a
`building` of that layer (T-V12-33).

### 2.3 The baselines file

```ts
interface BaselinesFile {   // plat/packages/testkit/baselines/baselines.json — the one file the parity CLI reads (§13.5)
  schema: 'plat.baselines/2';
  metricsVersion: string;     // the metrics.json version its rows were computed with
  pins: ReferencePin[];       // the gating build per reference (V12 §3.8)
  rows: Baseline[];           // §13.5's rows with item 496's fields; append-only: a row is superseded, never deleted
  crossings: CrossingRecord[] }
interface ReferencePin { reference: ReferenceId; build: string; since: string /* milestone */ }
interface CrossingRecord {  // one per commit that changes the file (V12 §3.3)
  date: string; seat: string; checker: string; added: string[]; superseded: string[];
  checks: { id: 'C1'|'C2'|'C3'|'C4'|'C5'|'C6'|'C7'|'C8'|'C9'|'C10'; pass: true }[]; scanVersion: string; fileHash: Hash128 }
```

§13.5's `Baseline` carries item 496's fields (`metricVersion`, `supersedes`, the `sample` block with its `failed` plan
indices, `estimator`, `spreadKS`, `scale`, and for corpus rows `evidence` and `frameN`; the references `'FM'`,
`corpus:frame:…` and `corpus:map:…`). `ftg-captures.json`, `ng-counts.json` and every panel file of §13.6 (9) cross by the
same check (V12 §3.3); a volume's reference counts (V02's Fantasy Manor counts, V07's VG counts) are ordinary `Baseline`
rows of input `counts`. **At its limits** the file is refused, never repaired: an absent or unreadable file stops `plat
parity` at step 1 naming the path, the last committed file standing; two live rows for one (reference, build, metric,
rung, setting) with no `supersedes` link fail C9; an empty `rows` list is a valid file whose target rows read
`missingBaseline` by §13.5's ⟨M-1⟩ rule (V12 §3.5.6).

### 2.4 Seed families

```ts
interface SeedFamily { label: string; reduce: 'u32' | 'parkMiller' /* 1 + (H32 mod 2 147 483 646): the MINSTD state range, §13.6 (2) */;
  priority: 0|1|2|3|4|5 /* gate 0 · golden 1 · bench 2 · capture 3 · tune 4 · null and sweep 5 */ }
// seedOf(family, path) = reduce(H32(label + '/' + path.join('/'))); if the seed equals a seed in the COLLISION DOMAIN, the path
// gains '/r1', '/r2', … until it does not (J-V12.4). The domain of a family is every higher-priority family's FULL declared
// count — bref 100, golden 12, known 1 per fixture, bcity 1 000 per setting — compared per (rung, water) where the path
// carries them and globally where it does not (sweep, known); capture families are excluded (they seed a reference, not
// us). It never depends on what a tier has drawn. §13.6's own formulas are unchanged.
```

| family label (+ path) | reduce | priority | count per setting | consumer | check vector |
|---|---|---|---|---|---|
| `bref/<ref>/<rung>/<water>/<i>` | u32 | 0 | nightly 20 · milestone 100 | our side of every parity row (V12 §3.5) | `bref/MFCG/TOWN/none/0` → 1738244370 |
| `golden/<rung>/<water>/<i>` | u32 | 1 | 12 | the golden suite (§13.3; item 491) | `golden/CITY/river/11` → 639553850 |
| `known/<id>` | u32 | 1 | 1 per fixture | the known-city fixtures (V12 §3.14) | `known/K1` → 3403473561; `known/K2` → 3205843448 |
| `bcity/<rung>/<water>/<i>` | u32 | 2 | 1 000 (B-CITY-lite: i < 50) | B-CITY (§13.2; item 491) | `bcity/TOWN/none/0` → 104466889 |
| `capture/<ref>/<size or template>/<options>/<i>` | parkMiller (MFCG, NG, VG); u32 otherwise | 3 | MFCG 10 per matched size; NG 5 per template; VG per V07 | the capture plan (V12 §3.2) | `capture/MFCG/40/plain/0` → 2003595629 |
| `tune/<run>/train/<rung>/<water>/<i>`, `…/holdout/…`, `…/guard/TOWN/<water>/<i>` | u32 | 4 | 30 each | tuning and corpus runs (V12 §3.7) | `tune/2026-09-28-example/train/CITY/none/0` → 1236353098; `…/guard/TOWN/none/0` → 2478365614 |
| `null/<spec>/<rung>/<water>/<i>`; confirmation `null/<spec>/<rung>/<water>/c1/<i>` | u32 | 5 | 50; c1: 100 | the correlation harness (V12 §3.6) and the pooled bars of V12 §3.6b on settings B-CITY lacks | `null/T71-3/CITY/none/0` → 1233256533; `…/c1/0` → 338389334; `null/T110b.viaduct/CITY/none/0` → 4261915227 |
| `sweep/<spec>/<level>/<i>`; for an ordered property `sweep/<spec>/any/<i>` (one seed shared by every level and step) | u32 | 5 | per rule (V12 §3.6b) | the sweep bars and the step scripts (V12 §3.6b, V12 §3.15) | `sweep/T109-a.relief/mountainous/0` → 4027728537; `sweep/T109-j5.access/TOWN/0` → 649597841; `sweep/T109k6.extent/any/0` → 1148414874; `sweep/T110b.elevated.prosperity/w0.1/0` → 4196945930 |
| `d5…` (§13.6 (2)), `d5-fm/<panel>/<i>`, `d5-vg/<panel>/<rung>/<tags>/<i>`, `d5/M-CAL/<rung>/<water>/<i>` (a later run's `d5/M-CAL/<layer>/<rung>/<water>/<i>`) | as §13.6 | — | per panel | panels (V12 §3.9) | `d5/M-CAL/TOWN/none/0` → 1899492655 |

A family is prefix-stable (the first n seeds never change when a tier draws more), so B-CITY-lite is B-CITY's prefix and
the nightly's `bref` seeds are the milestone's first twenty. The pooled siting bars that V11 states on "≥ 200 B-CITY seeds
per rung" read B-CITY's nightly towns and pay only for their permutations (J-V12.40); `null/…` families remain for the
settings B-CITY lacks. The check vectors are `docs/validation/bench/v12_rev_h32.out` (the script `v12_h32_vectors.py`,
whose SMHasher value and the base's `d5` vectors reproduce). The item-111–119 specs take their families by the same
formulas under their spec ids (V12 §3.15); their vectors are computed by the same script when the specs register.

### 2.5 Calibration runs (tuning against a reference, a threshold fallback, or the corpus)

```ts
type CellRef = { table: TableId; rowKey: string; column: string; band?: string /* the band row of a band-keyed cell (§4.5) */ }
interface CalibrationRun {   // §13.9's record generalised (item 503); plat/calibration/runs/<id>.json
  id: string;                          // 'cal/<milestone>/<slug>/<n>', fixed before the run (it salts the train and holdout families)
  kind: 'reference' | 'fallback' | 'corpus';
  source: { reference: ReferenceId; build: string } | { fallback: string /* register entry id */ }
        | { corpus: { adapter: string; version: string; frames: string[]; maps: number } };
  cells: { ref: CellRef; lo: number; hi: number; step: number; from: number;   // lo, hi inside the column's range, at or above an owner-stamped minimum (V12 §3.7.2 (5))
    layer: 'inPlace' | { pack: string } /* 'historical:<frame>': every corpus change, V12 §3.10.3 R1 */
         | { preset: 'FM' | 'VG' | 'NG' } /* the cell's preset entry a register entry names: a 'reference' run against that preset's own reference,
                                             or a 'fallback' run applying that entry's own pre-decided fallback (V12 §3.7.2 (3); J-V12.63, J-V12.67) */ }[];
  objective: { targets: { metric: MetricId; rung: Rung | 'building' | 'hood' | 'village'; preset: PresetArm; baselineIds: string[]; weight: number }[];
               guards: GuardSet };
  search: SearchSpec;
  seeds: { perSetting: 30; settings: { rung: Rung; water: WaterSetting; population: number; preset: PresetArm }[] };   // tune/<id>/train and tune/<id>/holdout
  budgetCpuH: number;                  // default 2; hard stop
  evaluations: { values: number[]; score: number; guardFlips: string[]; report: Hash128 }[];   // every candidate, in evaluation order
  chosen: number[] | null;
  holdout: ParityReport | null;
  status: 'accepted' | 'rejected' | 'fallback-applied' | 'aborted-budget' | 'refused';
  refusal?: { cell?: CellRef; rule: string };   // V12 §3.7.2, V12 §3.10.3; `cell` absent for a malformed spec (rule 'spec')
  changes: { ref: CellRef; from: unknown; to: unknown; evidence: string[] }[];   // evidence = baseline ids + this run's id
  before: ParityReport; after: ParityReport | null /* the gate seeds, from the nightly after the release */;
  shifts: string[];                    // ShiftRecord ids with cause { kind: 'calibration', ref: id }
  date: string; seat: string }
type SearchSpec =
  | { kind: 'grid'; values: number[][] /* ≤ 16 candidates */ }
  | { kind: 'golden'; maxIter: number /* one cell; ≤ 12 */ }
  | { kind: 'coordinate'; rounds: number /* ≤ 3 */; maxIterPerCell: number /* ≤ 8 */ /* ≤ 4 cells */ }
interface GuardSet { parityRows: 'allPassing'; cBars: true; ownerRuleBars: true; frozen: string[] /* register entries that must not move */;
  fixtureSuites: ('B-DOSSIER-lite' | 'ownerRuleHooks' | 'K1' | 'K2')[];   // run once on the chosen candidate before the holdout decision (V12 §3.7.5)
  townGuard: boolean }   // true when any cell is a raised-way row: 30 TOWN towns on tune/<id>/guard/TOWN/… join each evaluation (V12 §3.7.4)
```

A spec is **refused before any evaluation** (`status: 'refused'`, rule `spec`) when it names no cell or no target, has
`lo` ≥ `hi`, a `step` ≤ 0, or a `from` outside [`lo`, `hi`], or a target whose baseline ids resolve to no committed row;
every other refusal names its V12 §3.7.2 rule. A `step` larger than `hi − lo` leaves the endpoints as the only candidates.

### 2.6 The calibration register

```ts
interface CalibrationEntry {   // plat/calibration/register.json — one per provisional number of the design
  id: string;                  // 'cal.<table>.<rowKey>.<column>' | 'thr.<letter>' | 'band.<metric>.<rung>'; a preset entry's entry adds '@FM', '@VG' or '@NG'
  target: { cell: CellRef; preset?: 'FM' | 'VG' | 'NG' } | { threshold: string /* a §13.7 letter */ } | { band: { metric: MetricId; rung: string } }
        | { column: { table: TableId; column: string; rows?: string /* a row-key glob; absent = every row */; preset?: 'FM' | 'VG' | 'NG' } };
                               // column: one entry for a column family (V12 §3.11); preset: that preset's entry of the cell or column (a
                               // measured-rate cell awaiting its reference run), never its default (V12 §3.7.2 (3)); volume 1 holds no
                               // provisional NG entry (V01 §3.15, J-V1.98), so no '…@NG' id exists until a volume states one
  owner: 'base' | 'V01' | 'V02' | 'V03' | 'V04' | 'V05' | 'V06' | 'V07' | 'V08' | 'V09' | 'V10' | 'V11' | 'V12';
  metric: MetricId[];          // what measures it: catalogue ids (V12 §3.4.2) or members of `siting.<spec>`, `bar.<barId>`, `frame.<table>.<column>` (V12 §2.1)
  method: 'measure' | 'tune' | 'panel' | 'corpus';
                               // 'measure' — confirmed by its metrics at its due milestone's exit (V12 §3.11); 'tune' — set by a `reference` run
                               // against the entry's own reference when it falls due (V12 §3.7.1 (c)), the accepted value its confirmation, a
                               // rejected run applying its fallback, and, where the owning volume states it (V07 §3.15), no run while the
                               // entry's metric holds its band; 'panel' — a rated pass of its panel; 'corpus' — its corpus run (V12 §3.10.1)
  due: string;                 // the milestone that confirms it, in V12 §2.8's form; a corpus due is a `CorpusRunId` (V12 §2.9)
  fallback: { mechanism: string /* one sentence from the owning section */; notAchieved: boolean /* moving the threshold itself = not achieved, §13.7 */ };
  status: 'provisional' | 'confirmed' | 'fallback-applied' | 'not-achieved' | 'owner-set' | 'fixed';
  line?: 'default';            // only on an entry V12 §3.11's default line wrote: the lint holds its method, due, metric and fallback to that
                               // line's, and a later named line restates it in place, dropping the field; absent = a named line's entry
  panel?: { id: string; group?: string /* a group inside the sitting: 'M4-110' */; question: 'legibility' | 'realism' | 'charm' | 'reads' };
  stages?: { method: 'measure' | 'tune' | 'panel' | 'corpus'; due: string;   // a line of several stages, in the line's order (V12 §3.11's *Staged entries*)
             panel?: { id: string; group?: string; question: 'legibility' | 'realism' | 'charm' | 'reads' };
             metric?: MetricId[];   // the members this stage reads; absent: every member but `frame.*` at a non-`corpus` stage, the `frame.*` ones at a `corpus` stage
             possibility?: true     // a `corpus` stage read as E1's reachability rows and E4's checks only (V12 §3.10.4)
           }[];                     // absent: one stage, the entry's own method, due and panel; on a staged entry `method`, `due` and `panel`
                                    // hold the current stage's — the first with no passing row, or the one it confirmed or closed at
  history: { date: string; value: unknown; run?: string; panel?: string; milestone?: string; cells?: true; trial?: string;
             stage?: { index: number; outcome: 'pass' | 'fail' | 'unrated' };   // a staged entry's exit or sitting row
             held?: true }[] }      // a held row, value null (V12 §3.11's *A value moved by its owning seat before its due* (1))
```

**History rows.** `cells: true` marks a cells row, whose value is the target's compiled cells by row key: `--defaults`'
first row; a named entry's first row (its writing seat writes it with the compiled cells — a preset entry's excepted); the
moved-value and rows-added rows (V12 §3.11 (2), (2′)); a later line's restating row; a pick's row whose release moves the
target's cells in place (V12 §3.9.5: the next table version, a declared shift); and a run's row where the run changed the
target in place (V12 §3.7.6 step 5). A metrics row (an exit's readings, a corpus run's `frame.*` reading), a panel's row,
a pick's row that moves no cell, a held or status row, a pack or preset run's row and a trial row (`trial`, the finding of
V09 §7.6's `TrialRecord` it records, V12 §2.14) carry no `cells`.

**One knob has one entry and one column:** the register check fails when two entries, or two compiled columns, name one
mechanism under different names (a cell's default and its `FM`, `VG` or `NG` entry are two knobs, told apart by
`preset`); the crypt join and the growth cap keep V04's `CatacombRule.cryptJoin` and `CatacombRule.growthCapShare`, read
per year over the span (V06's J-V6.53). A `panel` entry is confirmed by a rated pass of its panel on its question; while
that panel is unrated the entry stays `provisional` and its exit row reads *provisional — not rated*, which never fails an
exit and never lets its gate be claimed (§13.6 (7)). **At its limits:** an absent `register.json` reads as an empty
register — every calibratable cell then fails the lint naming `--defaults` (V12 §3.11); a file failing its schema stops
the check naming the path; an entry whose target cell or column a new major table version removed fails "cell exists"
until a restating line closes it `fixed` with the version as reason.

### 2.7 The correlation harness

```ts
type ClassSelector = { classes?: string[]; families?: string[]; tags?: string[] }   // V11 §2.3's keys
type StatSpec =
  | { kind: 'meanDistTo'; to: ClassSelector | 'market' | 'gate' | 'quay' | 'water' | 'wall'; agg?: 'mean' | 'median' }   // metres along the way graph; 'median' where the owner states it (T-V11-12)
  | { kind: 'shareWithin'; to: ClassSelector | 'market' | 'gate' | 'quay'; radiusM: number }     // member-on-indicator share: the pooled route
  | { kind: 'servedShare'; unit?: 'coverage' | 'district'; minHouseholds?: number }   // the share of the subject class's coverage units holding ≥ 1 member,
                                                       // each unit as V11 §2.3 defines it at a plot (V12 §3.6); 'coverage' (default) reads the class's
                                                       // compiled profile.coverage, 'district' the plot's district; `minHouseholds` counts only
                                                       // districts of at least that many households — set only by T-V11-18's dispersal reading (30);
                                                       // one class per spec; null scope 'town' only
  | { kind: 'nnSameKind' }                             // median nearest same-class distance; null scope 'town' only
  | { kind: 'downstreamShare' } | { kind: 'downwindShare' }   // share of members downstream / downwind of the median household: the pooled route
  | { kind: 'prestigeShare' }                          // share on prime frontages (item 71's definition, T71-3): the pooled route
  | { kind: 'flowOrder'; chain: string }               // share of chains whose resource lies farther from the market than the seller (item 104 (h) (8))
  | { kind: 'chainSpread'; chain?: string }            // item 104 (g): the mean way distance between a chain instance's in-town nodes
  | { kind: 'meanDistToPartners'; role: 'dominantOutputConsumers' | 'providers' | 'inputs' | 'demand' }   // item 105 (k)
type NullPass =
  | { kind: 'rank'; townShare: number /* 0.70 */; medianU: number /* 0.60 */ }                // the default for every statistic but the pooled ones
  | { kind: 'pooledExact'; alpha: number /* 0.01 */; minShift?: number /* a share the pooled observed must also exceed the null mean by */ }
  | { kind: 'margin'; value: number /* median over towns of S_obs − mean S_k, in the statistic's unit: T71-3's 0.15 */ }
  | { kind: 'holm'; family: string; alpha: number /* 0.01 */ }   // an owning volume's clauses Holm-corrected together (T-V11-12)
interface NullModelSpec {
  id: string;                                          // the bar id: 'T71-3', 'T103-e.tannery-downstream', 'T105-k.shared-provider' …
  owner: 'base' | 'V01' | 'V02' | 'V03' | 'V04' | 'V05' | 'V06' | 'V07' | 'V08' | 'V09' | 'V10' | 'V11' | 'V12';
  ownerBar?: string;                                   // the owning volume's bar id when it states the rule; its statement wins (J-V12.48)
  subject: ClassSelector; statistic: StatSpec;
  null: { scope: 'block' | 'district' | 'town'; eligible: 'hardNeeds' | 'sameSizeClass' | 'anyPlot'; permutations: number /* K = 20 */ };
  expect: 'lower' | 'higher';
  pass: NullPass;                                      // default: 'pooledExact' for the member-on-plot shares, 'rank' otherwise (J-V12.12)
  towns: { source: 'bcity'; perRung: number /* 200 when the owner says so, else 50 */ } | { source: 'null'; perSetting: number /* 50 */ };
  seeds: { settings: { rung: Rung; water: WaterSetting; preset: PresetArm }[] };
  applies: { requires?: ('river' | 'coast' | 'walls' | 'customChain' | 'islands')[]; minMembers: number /* 1 pooled, 3 rank */ };
  variant?: { distance: 'way' | 'euclid'; eligible: 'hardNeeds' | 'anyPlot'; subjects: 'plots' | 'buildingsWithUse' } }   // corpus comparisons only (V12 §3.10.5)
interface NullModelResult { spec: string; setting: string; towns: number; skipped: number;
  share: number /* towns with u > 0.5 */; medianU: number; pooled?: { observed: number; nullMean: number; p: number };
  verdict: 'pass' | 'suspect' | 'fail' | 'insufficient';   // 'suspect': run 1 failed, the confirmation pending or passed (V12 §3.6)
  confirmation?: { family: string; towns: number; pass: boolean };
  perSeed: { seed: string; obs: number; nullMean: number; lt: number; eq: number; u: number }[] }
```

Registration refuses: a `servedShare` or `nnSameKind` spec at a scope other than `town` (a district or block permutation
conserves them exactly); a `servedShare` spec whose subject is not exactly one class (a "per coverage class" bar registers
one spec per class, id `<bar>.<class>`), whose class has no coverage row under `unit: 'coverage'`, or whose class's unit is
`settlement` (the town holds a member or not, and a permutation conserves it: that class's coverage is T-V11-13's roster
clause, reported `notApplicable` in the bar); `minHouseholds` on any unit but `district`; a spec with `expect: 'lower'`
and a `minShift`, or a `minShift` outside (0, 1); a pooled-route spec whose pooled null share over its first 50 towns
exceeds 0.85 (below 0.02 for `expect: 'lower'`) — the **headroom lint**: at that base share no rule can see a pull
(executed: power ≤ 0.09 at a 0.3 pull, `critique_v12_pooled_exact.out`), so the owner restates the indicator (a tighter
radius) or states its complement. A spec whose subject has members in no counted town is `insufficient` (V12 §3.6).

### 2.7b Share, sweep, paired and two-sample bars

The other shapes a tendency bar takes in file g — "in most placements", "at or above the floor", "at the ranked share",
"at every rung", "rises with", "higher with than without", "rising monotonically", "differ from", "beat the baseline",
"within tolerance of the base's" — each get one typed rule, run by `plat statbar` (V12 §3.6b).

```ts
type Indicator =                                          // one yes / no per instance, read from the bench statistics and the explain query's link list
  | { kind: 'flowOrder' }                                 // item 104 (h) (8): a chain instance's resource node farther from the principal market than its final seller
  | { kind: 'withinComfort' }                             // items 104 (h) (8), 107 (g): a consumer–provider link's way distance ≤ its good's comfortM
  | { kind: 'voidAccessible' }                            // item 109 (j) (3), (3b): a cavern or ruin system with an access point through an OPEN link, direct or through linked systems (item 113 (e))
  | { kind: 'voidSealedDeep' }                            // item 109 (j) (5): per deep void (V12 §3.4.2's `void.*` row defines it) — sealed when no access reaches it
  | { kind: 'ruinChosen' }                                // item 109 (i): an undercity whose first void source is a ruin, where a ruin and a cavern both qualify
  | { kind: 'present'; system: 'cavern' | 'ruin' }        // item 109 (a), (j) (1): the site holds at least one such system
  | { kind: 'raised'; raisedKind: 'viaduct' | 'elevated' | 'aqueduct'; source: 'generated' }   // item 110 (b): the town holds ≥ 1 such generated way
  | { kind: 'water'; water: 'river' | 'lake' | 'coast' | 'oasis' }   // item 111 (d): the site draws that water (S0–S1)
  | { kind: 'walkToWater' }                               // item 111 (d): per household, its plot within the water-supply family's walking radius (V11) of water
  | { kind: 'richNearerWater' }                           // item 111 (d): per town, the richest band's mean way distance to water below the middle band's
type Quantity = 'ladder.members' | 'catacomb.extentM2' | 'catacomb.fill' | 'catacomb.growthM2'   // V12 §3.4.2's model metrics, per record
  | 'season.leafCover'                                     // item 117 (i): per fixture document, its one record, across the leaf-fall weeks
type Step = 'epoch' | 'regenerate' | { rederive: StageId } | { newRandom: 'system' } | 'upgradeReplay' | { dossierEvent: string } | 'extendGrowth'
  | { week: number }                                      // item 117: the view's year position 0 – 51, set as the season control sets it — a look: the model, its digest and the save untouched
type AuthorStep = { edit: string /* an item-101 event kind: 'delete', 'repairWall', … */; target: string /* a fixture address */; args?: Record<string, unknown> }
interface Level { id: string /* 'mountainous', 'TOWN', 'x1.5', 'w0.9', 'arid' */; rung: Rung; water: WaterSetting; preset: PresetArm;
  site?: Record<string, string | number | boolean>;       // a fixture site override: relief, geology, mining, a ravine across the frame, a forced ruin or cavern source, a climate row
  dossier?: string;                                       // a fixture id of the frozen manifest (V12 §1b's dossier table), a derived '<dossier>@pop×k' included
  intent?: { wealthLevel?: number };                      // a T1 `intend` input (§7.7): the settlement-level prosperity of item 110 (b)'s trend
  populationScale?: number; epochs?: number;              // a population sweep's factor; a growth history's epochs (V06's engine, once landed)
  requires?: string }                                     // the volume whose generator the level needs ('V07'): notApplicable until it has landed
type Rule =
  | { kind: 'most'; indicator: Indicator; share: number /* 2/3; an owner's 0.70, 0.75, 0.80 */; minEffective: number /* 100 */; minTowns: number /* 20 */;
      townClause: { minInstances: number /* 3 */; share: number /* 0.70 of those towns at ≥ 1/2 */ } }
  | { kind: 'floor'; indicator: Indicator; floor: number | CellRef; alpha: number /* 0.01, one-sided */; minEffective: number /* 100 */; minTowns: number /* 20 */; perTownCap: number /* 3 */ }
  | { kind: 'rate'; indicator: Indicator; value: number | CellRef | { derived: 'ruinShare' | 'cavernChance' | 'waterChance' };
      tolerance: { kind: 'exact'; alpha: number /* 0.01, two-sided */ } | { kind: 'se'; k: number /* V04's 3 */ }; minInstances: number /* 200 */ }
  | { kind: 'presence'; indicator: Indicator; chance: number | CellRef | { derived: 'cavernChance' } }
  | { kind: 'trend'; indicator: Indicator; perLevel: number; bins?: { by: 'buildingsOver'; edges: number[] /* [0, 1, 3, 6, 11, 21] */; minPerBin: number /* 20 */ } }
  | { kind: 'higherWith'; indicator: Indicator; factor: { key: string; with: string | number | boolean; without: string | number | boolean }; perCell: number /* 200 */ }
  | { kind: 'exactMonotone'; quantity: Quantity; where?: 'stagnant' /* fill: only across steps where blockedBy is non-empty and the extent held */;
      identity: 'record' /* per record key: a CatacombComplex's id (its source lineage), a ladder record's id; a record present at a step is present at the next */;
      sequence: { kind: 'levels' } | { kind: 'steps'; script: Step[] /* author edits never appear */ }; fixtures: string[] }
  | { kind: 'exactBound'; quantity: 'catacomb.growthM2'; bound: 'cap' /* per record and step: ≤ max(extent × ((1 + growthCapShare)^years − 1), growthFloorM2) */; fixtures: string[] }
  | { kind: 'exactScript'; property: ScriptProperty; script: (Step | AuthorStep)[]; fixtures: string[] }   // a named property checked at every step (V12 §3.15)
  | { kind: 'paired'; measures: PairedMeasure[]; eachShare: number /* 0.70 */; minDiffering: number /* 2 */; minSeeds: number /* 50 */ }
  | { kind: 'twoSample'; a: 'ruin'; b: 'cavern'; metrics: MetricId[]; expect: 'higher'; minEach: number /* 30 systems */ }
  | { kind: 'noRegression'; statistic: StatSpec; subject: ClassSelector; off: { ref: CellRef; value: unknown }[] /* the reference arm's overlay: the owning volume's named off form */; tolerance: number | CellRef }
type ScriptProperty =                                     // each 0 violations over every record and step
  | 'voidLostAndRefound'      // item 113 (e): after the step closing a void's last OPEN link its access state is LOST; after a step reopening a link it is restored; dwellings empty, then return
  | 'conditionSustained'      // item 114 (c): a run's condition changes at a step only when its driver has held over the table window before it
  | 'patchesOldestFirst'      // item 114 (c): recovery replaces a wall's patched runs oldest first, by the week of each run's last-change epoch (`EpochRecord.inputs.week`, §6.1), never the epoch's number
  | 'noIceSnow'               // item 117 (i): no ice and no snow drawn at any step (`season.iceSnow` 0)
  | 'iceOrder'                // item 117 (i): every still water's first frozen step at or before every flowing water's, and no ice drawn on a mill race's or a weir's polygon (`season.iceOrder`)
  | 'seasonStyles'            // item 117 (i): T112-1's style check (`bar.T112-1`) passes at every step
interface PairedMeasure {   // a ruin's laid plan (a) against the town above within its outline (b), per seed
  metric: 'ruin.blockArea' | 'grid.r4' | 'grid.axis';
  differs: { kind: 'logRatio'; atLeast: number /* ln 1.5 */ } | { kind: 'absDiff'; atLeast: number /* 0.15 */ } | { kind: 'axisDeg'; atLeast: number /* 10 */; skipWhen: 'sharedAxis' } }
interface StatBarSpec {
  id: string;                    // the bar id as §13.2 or the owning volume names it, or V12's spec id for a clause: 'T104h8.flow', 'T109i.relief', 'T110b.viaduct', 'T111d.walk' …
  owner: 'base' | 'V01' | 'V02' | 'V03' | 'V04' | 'V05' | 'V06' | 'V07' | 'V08' | 'V09' | 'V10' | 'V11' | 'V12';
  ownerBar?: string;             // the owning bar id ('T-V4-54', 'T111-1'); its stated parameters win (J-V12.48)
  rule: Rule;
  levels: Level[];               // ordered for 'trend' and ordered 'exactMonotone'; strata for 'higherWith'; the pooled settings otherwise
  seeds: { perLevel: number; max: number /* drawn in steps of 50 up to max until the rule's minimum is met */ };
  stopAfter?: StageId;           // regenerate only up to the stage that settles the indicator (V12 §3.7.7's stage isolation)
  applies: { requires?: ('river' | 'coast' | 'walls' | 'customChain' | 'islands' | 'underground')[] };
  fallback: string }             // one sentence from the owning volume: what moves when the bar fails (V12 §3.6b's default otherwise)
interface StatBarResult { spec: string; verdict: 'pass' | 'suspect' | 'fail' | 'insufficient' | 'notApplicable'; towns: number; skipped: number;
  instances: number; effective?: number /* instances ÷ the design effect (V12 §3.6b) */;
  statistic: number;             // the rule's test value: the pooled share, the z, the exact p, the separation
  perLevel?: { level: string; n: number; y: number; notApplicable?: string }[]; perSeed?: { seed: string; values: number[] }[];
  violations?: { record: string; step: string; before: number | string; after: number | string }[] }   // the exact rules
```

**At its limits:** a level naming a fixture absent from the manifest, or a site override a stage before S1 reads, is
refused at registration; a level whose towns all skip, or a rule whose minimum is unmet at `seeds.max`, is `insufficient`
(gating as a fail naming the shortfall); a population level outside [1 500, 120 000] or a level whose generator has not
landed is `notApplicable`.

### 2.8 Panels and sittings

```ts
interface PanelSpec {   // @plat/testkit/panels — one per panel, registered by the owner of its gate
  id: string;           // a milestone id in V12 §2.8's form: 'M1', 'M2b', 'M4', 'M5', 'M6', 'V-M4', 'M-CAL' and a later corpus run's 'M-CAL/<layer>';
                        // a volume's step: 'V3-P6', 'V4-U5', 'M6-sky', 'V6-E7'
  gate: string;         // what a rated pass lets the milestone claim ("the base at parity", "mastered", …), or 'diagnostic'
  sitting: 'M1' | 'M2b' | 'M4' | 'M5' | 'nextGating';   // where it is sat (J122): its own gating sitting, or the next gating sitting after its build lands
  groups: PanelGroup[]; questions: ('legibility' | 'realism' | 'charm' | 'reads')[];
  subject?: string;     // the plain words 'reads' asks about ("a floating patch"); required when 'reads' is asked
  strips: string[];     // §13.7 letters shown as threshold strips (§13.6 (8))
  extras: ('house' | 'labels' | 'ladderStreet' | 'item110Buildings' | 'styleReference' | 'palette')[];
                        // 'item110Buildings': V02 §7.5 (3)'s five items, one `reads` answer each; 'styleReference': one
                        // reference-family image shown beside a SOLO set, never rated (V04 §7's hatched-style render)
  passRule: { perGroup: 'all' | 'rung' | 'template' | 'frame' | 'class' | 'none' /* 'none': a descriptive set, never a gate */ };
             // ⌈2n / 3⌉ better-or-same per group and question, never worse on every pair of a subgroup (§13.6 (6));
             // a SOLO group passes a question with ⌈2n / 3⌉ Yes and no subgroup answered No on every item
  render: PanelRender }
interface PanelGroup { reference: 'MFCG' | 'FTG' | 'NG' | 'FM' | 'VG' | 'DW' | 'AB' | 'SOLO'; formula: string /* the seed label pattern */; count: number; preset: PresetArm;
  id?: string /* a named group inside a panel: 'M4-110' */; items?: string[] /* a SOLO group's fixed items: a fixture id or a forcing-site level id */ }
// 'DW': Dwellings plan images, research-side, one side of a plan pair (V03's panel; never a baselines.json source); 'AB': two recipes of ours,
// blind; 'SOLO': one render of ours per item, rated Yes / No per question where no reference and no second recipe exists (V04's panel)
interface PanelRender { widthPx: 1600; heightPx: 1200; framing: 'walledPlus10' | 'overview' | 'hood' | 'building' | 'village' | 'plan' | 'underground' | 'island';
  mPerPx: 'matched'; labels: false; furniture: false; light: 'fixedSun'; stripMetadata: true }
type D5PairStaged =     // §13.6's `D5Pair` union names it (file f item 500): the five staged variants, one per pair, in seeds.json and the record
  | { reference: 'FM'; i: number; refCapture: string; platSeed: string; cls: string }                                     /* V02 §7.5 */
  | { reference: 'VG'; rung: 'THORP' | 'HAMLET' | 'VILLAGE'; tags: string; i: number; refSeed: string; platSeed: string }   /* V07 §8 */
  | { reference: 'DW'; i: number; refCapture: string; platSeed: string; cls: string; band: string }                         /* V03 §8, V3-P6 */
  | { reference: 'AB'; purpose: 'reconcile' | 'history'; rung: Rung; water: WaterSetting; i: number; platSeed: string;
      a: string; b: string /* each a recipe: output version, preset, and the layer or epoch it differs by */ }              /* V12 §3.10.6; V06 §12 */
  | { reference: 'SOLO'; rung: Rung; i: number; platSeed: string; recipe: string /* output version, preset, mode */ }     /* V04 §7 */
interface AnswersFile {   // exported by the sitting page; after the reveal it crosses with key.json into plat/goldens/d5/<panel>/ by V12 §3.3 (item 535)
  panel: string; commitment: Hash128; sessions: { started: string; ended: string }[];
  answers: { pair: number; question: 'legibility' | 'realism' | 'charm' | 'reads'; answer: 'left' | 'right' | 'same' | 'yes' | 'no' /* yes / no: a SOLO item */; note?: string }[];
  strips: { letter: string; picked: 'A' | 'B' | 'C' | 'same' }[]; house?: 'A' | 'B' | 'C'; ladder?: { seed: string; reads: boolean }[];
  item110?: { item: string /* V02 §7.5 (3)'s item, by its seed label */; reads: boolean }[] }
// §13.6 (9)'s D5Record holds these answers and verdicts (item 500 (c)); §13.3's MilestoneRecord holds a list of panels per
// milestone and the register's statuses in its exit rows (item 493)
```

The owner's free-text `note`s stay research-side: `answers.json` crosses with each note replaced by its H128 hash, so the
record keeps that a note was written without carrying a word the scanner would have to judge (C3). Registration refuses a
`PanelSpec` whose id fails the form below, with no group, with a group of count 0, or with `reads` but no `subject`.

**Milestone ids** (J-V12.78). Every milestone id this volume's records and commands carry — a `PanelSpec.id`, a register
entry's `due` and a history row's `milestone`, `--defaults --milestone <id>`, a `MilestoneRecord`'s id — is
volume-qualified: a base milestone by its §16 id (M-1, M0, M1, M2a, M2b, M3a, M3b, M3c, M4, M4b, M5, M6; the staged rows
M6-U, M6-sky, M6-E, M6-P, M-CAL, M-SF); volume 2's and volume 7's by their build plans' ids (`M3a-V2`, `M6a` – `M6c`; `V-M0` –
`V-M4`, `V-M2u`); a volume step its plan names by a bare letter and number by its volume's prefix `V<n>-`: `V3-P0` –
`V3-P6` (volume 3's PE is built inside M2b and M3a and takes their ids), `V4-U0` – `V4-U5` with `V4-U3b`, `V5-P0` –
`V5-P6`, `V6-E0` – `V6-E9`; a corpus run by V12 §2.9's `CorpusRunId`. A volume's own register lines name their steps so:
V06 §8's E1 – E9 as `V6-E1` – `V6-E9` (a line's exit step in `--milestone`, its `due` `V6-E7`, or `V6-E8` and `V6-E9` for
E8's and E9's lines);
V04 §8's U-steps as `V4-U0` – `V4-U5` and `V4-U3b` ("at U5" in V02 §3.10.10 and V11 §8 as `V4-U5`; V02 §3.10.10's crypt
line's "from the landing of volume 4's access draw" as `V4-U3b`). Volume 11's content steps are built inside §16's
milestones and take their ids (V11 §8): C0 `M0`, C1 `M1`, C2 `M2b`, C3 and C3b `M3a`, C4a `M2b`, C4b `M-SF` (no entry:
the dossier row sets are not calibratable), C5 `M2b` for its O13-core part and `M3b` for the rest, C6 `M4`, C7 `M4b`,
C8 `M6-U`, C9 the milestone that lands each owner item's base part (V11 §8; §13.8) — so no `V11-` id exists, and a C8 column landing
after M-CAL's record dates to `M-CAL/under`. Item 110's raised ways are built at `M3a` (items 244, 290). The lint refuses
any other form of due (V12 §3.11).

### 2.9 Corpus records (M-CAL)

```ts
type EvidenceClass = 'record' | 'surveyed' | 'drawn'   // a historical record · a measured plan with a metric scale · a drawn or painted plate
interface CorpusMapMeta {   // research-side index row; never crosses
  id: string /* the corpus's own id */; salted: string /* 'corpus:map:<16 hex>' — the only form that crosses */;
  evidence: EvidenceClass; scale: 'metric' | 'relative'; era: string; region: string /* our D-2 preset keys, mapped research-side */;
  frames: string[]; features: FeatureKind[]; excluded?: 'holdout' | 'mapDesign' | 'unreadable' }
interface SampleFrame {     // declared research-side before any of its maps is measured
  id: string /* 'frame:<era>/<region>/<n>' */; rule: string /* one sentence, independent of every measured feature */;
  era: string; region: string; n: number; evidence: 'surveyed'; declared: string /* date */; digest: string /* salted digest of its member list */ }
interface FramesFile {      // plat/calibration/reconciliation/frames.json — each declaration crosses by V12 §3.3 BEFORE any row of its frame (C8)
  frames: { id: string; rule: string; n: number; era: string; region: string; declared: string; digest: string }[] }
type CorpusRunId = 'M-CAL' | 'M-CAL/under' | 'M-CAL/sky' | 'M-CAL/evolution' | `M-CAL/${string}`
                   // 'M-CAL' — the first run (V12 §3.10.1); 'M-CAL/<layer>' — the later run for the columns whose first compiled cell landed after
                   // M-CAL's record was committed, by V12 §3.11's *The due's corpus run* ('M-CAL/M6-P' for the plan rung) (J-V12.75)
interface ReconciliationRecord {   // plat/calibration/reconciliation/<id>.json, the id's '/' written '-' ('M-CAL-under.json')
  id: CorpusRunId; opened: { by: 'owner'; date: string; words: string };
  adapter: { id: string; version: string; maps: number; excludedHoldout: number; excludedDigest: string };
  frames: { id: string; n: number; rule: string; declared: string; digest: string; crossing: string /* the CrossingRecord that carried it */ }[];
  runs: string[];                                       // CalibrationRun ids, kind 'corpus'
  refused: { target: string; rule: 'R1'|'R2'|'R3'|'R4'|'R5'|'R6'|'E1'|'E2'|'E3'|'E4'|'E5'; reason: string }[];
  ownerExcluded: { target: string; rule: string /* the owner-rule item and part, '109 (k) (2)' */; evidence: string /* a salted id */ }[];   // R6: an owner question
  reachability: { metric: MetricId; value: number; reachable: boolean; setting?: string; by?: 'declaration' }[];   // possibility evidence (V12 §3.10.4)
  floorsHeld: { cell: string; corpusValue: number; held: number; rule: string }[];   // an owner-stamped calibration minimum a corpus run met (V12 §3.10.3 R6)
  panel: CorpusRunId | null /* its panel, the run's own id; null for a later run that moved no cell */;
  decisions: { frame: string; decision: 'default' | 'selectable' | 'pending-owner' }[];   // per frame (V12 §3.10.6)
  palette: { mismatch: boolean; ours?: Record<string, [number, number]>; ownerPick?: 'released' | 'remeasured' } }
```

**At its limits:** a corpus of no admissible map, or a frame of 0 members, records no frame run — every entry due there
closes `fixed` with "no admissible frame" and possibility evidence is what E1 and E4 find; a frame below 20 maps is
possibility-only (V12 §3.10.2); a map without an era or region key is excluded `unreadable`; a frame id declared twice
with different digests is refused by C8 (a superseding frame is a new id).

### 2.10 Provenance evidence (item 381)

§7.6's cell provenance carries `evidence` (ids of the baseline rows, the `CalibrationRun`, the panel `d5:<panel>` or the
M-1 record that set the value — ids, never sentences) and `ownerRule` (the owner-rule item and part a cell encodes), both
outside the pinning hash (§7.6), so rewording or adding evidence never moves an output version. **Writers:** an accepted
run and a panel pick write `evidence` into the table source (V12 §3.7.6), V11's compiler carries the ids into every
compiled cell and stamps `ownerRule` from the owner-rule rows — the catacomb TOWN gate, the cemetery-only source list,
the cathedral's `always` crypt, the underground's any-tier existence, the dossier's primacy rows, the `raisedWays` rung
gate (V11's schema admits no row below CITY) and the owner-stamped **calibration minima** of the CITY and METROPOLIS
raised-way chances and caps (V11 §3.24.2 states their values; V12 §3.7.2 (5)). A stamped cell is never a run's cell (
V12 §3.7.2 (2)) nor an E1 or E4 target (V12 §3.10.3 R6); a stamped minimum binds every run, fallback and corpus pack — never
the parity presets' extension zeros (item 23), a no-op pin's overlay or a user's own override.

**`dist/evidence.json`** — written by the compiler beside the tables from the register (≤ 200 kB, V12 §6):

```ts
type EvidenceFile = Record<string /* a cell ref */, {
  status: CalibrationEntry['status'] | 'owner';   // the entry's status (V12 §2.6); 'owner' for a stamped cell
  entry?: string;          // the register entry id that covers the cell (V12 §2.6), absent for a stamped or `ref:` cell
  method?: CalibrationEntry['method'];   // the entry's method, with `entry`
  measuredBy?: string;     // one plain line naming what measures it: its metrics' `row` words ("street turning against FTG") or its panel
  due?: string;            // the entry's due milestone, while provisional
  lines: string[];         // one plain sentence per cited evidence id, from each run's `plain` summary
  history: string[] }>     // the entry's last three history rows as plain lines ("confirmed at M2b: 1.3 per 100 m, band 1.1–1.6")
```

The tables editor's cell inspector (V09 §4.14) and the clerk's provenance answer (§11.2's `RuleAnswer`, read by the
clerk, V10 §3.5) read this file — the one shipped copy of each cell's register entry (`RuleAnswer.register` takes its `entry`, `status`,
`method` and `due`) — so both explain a value, its status, what measures it and when it falls due without reading
`plat/calibration/`, which never ships; a repository tool may read `register.json` itself. An absent file, or one whose table versions differ from the document's pinned versions, reads as
"no calibration record for this table version": the inspector and the clerk show the provenance source alone.

### 2.11 Lifecycle and wiring of every record (E-35)

The one table of every record's producer, consumers and lifecycle; V12 §1b cites it.

| record | producer (create) | consumers (read) | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `MetricDef` and `dist/metrics.json` | authored in `@plat/testkit/metrics` with its catalogue row; `plat build` generates the `bar.*` and `frame.*` members and writes the file | `plat measure`, `plat parity`, crossing check C6, `plat calibrate`, the research row writer, the docs pages, release-note sentences | `metrics.json` in `dist/` | rebuilt by `plat build` | a code revert; a major bump re-measures its baselines (V12 §3.4.3) | a definition change is a major version, never an edit in place |
| `MeasureInput` | research adapters per reference; `measureInputOf` (ours); the corpus adapter at M-CAL | `plat measure` (every `geo` metric) | research side: `research/baselines/inputs/<ref>/<build>/`; ours in memory or a golden fixture | re-derived from its capture or document at will | — (derived) | re-written when the profile's version bumps |
| `Baseline` row (item 496) | `rows.py` over `plat baselines aggregate`, through the crossing | the band arithmetic (3.5), crossing checks C6–C9, tuning targets (3.7), corpus runs (3.10), `plat parity` | `baselines.json` | never re-computed in place: a new metric version or build adds a row that `supersedes` it | supersession (append-only) | `schema` bump with a converter in `plat baselines check --migrate` |
| `BaselinesFile` header — `ReferencePin`, `CrossingRecord` | the baseline seat through the crossing (M-1; pins moved by the drift rule, 3.8) | `plat parity` (the gating build), the drift handling (3.8), the checker's audit | `baselines.json` | — | a pin change back is a new declared baseline shift | — |
| `ParityReport` (item 497) | `plat parity` | `MilestoneRecord.parity`, `CalibrationRun.before` / `after` / holdout, the dashboard, release notes | `plat/goldens/parity/` (milestone), CI artifacts (nightly) | the same inputs give the same bytes (V12 §3.13) | — (a report is a fact) | read by schema version |
| `CalibrationRun` (item 503) | `plat calibrate run <spec>` | table source edits (V11's compiler), `ShiftRecord`s with cause `calibration`, the register's history, release notes, `ReconciliationRecord.runs`, the compiler's evidence | `plat/calibration/runs/`, its spec in `plat/calibration/specs/` | re-running its spec reproduces every evaluation (T-V12-8) | a revert run restoring the `from` values, itself declared | read by schema version |
| `CalibrationEntry` (`register.json`) | the seat landing each volume's constants — its named lines' entries, the default line's by `plat calibrate register --defaults --milestone <id>` (and by that command a moved-value or rows-added cells row); a held row by `--hold`; status changes and stage advances by runs, panels, exits and M-1; a trial row by `plat calibrate register --trial` (V12 §2.14) — V11's column entries with each content milestone (C6 at M4 audits them), V04's, V02's and V06's seats for theirs, and the seat landing a base change request for the base cells it adds | `MilestoneRecord.exitCriteria`; release notes; the corpus runs' target lists (3.10.5); the V4-U5 panel's confirmations; the compiler (→ `dist/evidence.json`, hence V09 §4.14's cell inspector and §11.2's `RuleAnswer`, read by the clerk, V10 §3.5) | `register.json` | statuses recomputed from `history` by `--check`; `--defaults` writes only columns that hold a compiled cell and have no entry (idempotent), each with a first cells row naming its landing milestone and its `due` from it (V12 §3.11) | a history row is appended, never removed; a later named line restates a default entry in place (`line` dropped) | an entry without `line` reads as a named line's; a history row without `cells` as a metrics, panel or status row; an entry without `stages` as single-stage; a row without `stage`, `held` or `trial` as before |
| `NullModelSpec`, `StatBarSpec`, `BenchBarDef` and their results | the bar's owner registers the spec (the base's §13.2 rows, V11's T-V11-12 – T-V11-18, the volumes' bars, V12's item-111–119 specs); results by `plat nullmodel`, `plat statbar`, a `BenchBarDef.run` | `plat parity`'s rows (class C / O) and the `bar.<barId>` metrics; the register; `known-defects.json` | spec in code; results in the report | re-run gives the same bytes | — | a spec change is a new spec id version |
| `PanelSpec`, `seeds.json`, `D5Record` (item 500) | registered in code (the base's M1, M2b, M4, M5; V02's M6; V07's V-M4; V03's V3-P6; V04's V4-U5; V05's M6-sky; V06's V6-E7; this volume's M-CAL and each later `M-CAL/<layer>`); `plat d5 seeds`; `plat d5 verdict` | the sitting, `MilestoneRecord.d5` (a list, item 493), release notes; strip picks → `owner-set` entries | `plat/goldens/d5/<panel>/` | seeds from formulas; renders re-rendered under the current output version when re-offered (§13.6 (7)) | a new sitting is a new record; answers are never edited | — |
| `AnswersFile`, `key.json`, the capture-id files (`fm-`, `dw-captures.json`, `vg-seeds.json`) | the sitting page; the panel seat; `plan.py` | `plat d5 verdict`, `plat d5 seeds` (after the crossing) | research side, then `plat/goldens/d5/<panel>/` by V12 §3.3 | — | — | — |
| `CorpusMapMeta`, `SampleFrame` | the adapter seat, each frame declared before measurement | the frame rows' `evidence` and `frameN`; the corpus runs' evidence gate (E2) — through rows only | research side only | — | — | — |
| `FramesFile` | the adapter seat, before measurement | check C8; `ReconciliationRecord.frames` | `plat/calibration/reconciliation/frames.json` | — (a declaration is a fact) | a superseding frame is a new id | — |
| `ReconciliationRecord` (item 504) | the M-CAL calibration seat, for M-CAL and each later run `M-CAL/<layer>` (V12 §3.10.1) | `MilestoneRecord` of its id; the register's corpus dues (3.11); release notes; the owner's reconciliation report (5.5), `ownerExcluded` rows as owner questions | `plat/calibration/reconciliation/` | — | a revert release restores the previous tables (a declared shift) | — |
| `evidence` ids, `ownerRule` stamps, `dist/evidence.json` (V12 §2.10) | accepted runs, panel picks and M-1 records; V11's compiler from the owner-rule rows and from the register | the compiler, V09 §4.14's cell inspector and preset dialog, V10's clerk (plain line first), M4's provenance audit; run refusal and R6; the register check's stamped-clause list | ids and stamps in the shipped tables (outside the pinning hash); statuses and lines in `dist/evidence.json` | recompiled with the tables | with the value it explains | optional fields: absent reads as none |
| the historical pack `historical:<frame>` (item 382) | accepted corpus runs of its frame | §7.6's packs slot for documents whose D-2 era and region match; V09's preset dialog ("historical (<era>, <region>)"); the recipe's pinned pack version | a versioned pack table in `@plat/tables`, pinned by id, version and hash (§2.9) | the recipe replays its pinned pack version | §7.6's apply is one undo step | a pinned retired version replays under §6.4's retention; a revert release ships a new pack version |
| `KnownCityFixture`, `StructureResult` | its seats at M3a (K1's inputs from T101-6's fixture); the structure engine per path | T-V12-36; the guards; the M4-110 group; `MilestoneRecord.exitCriteria` `T-V12-36:<id>`; V03's B-PLAN click set (from `V3-P1`); V01's T-V1-54 at M5; V04's T-V4-62 – T-V4-70 on K2; V10's evaluation group A | inputs `plat/tests/fixtures/known-city/<id>/`; golden `plat/goldens/known/<id>/` | from its skeleton and seed | a revert commit | its digest re-recorded only by a declared shift naming it (item 492) |
| `NoOpPin` and its off-state sets (V12 §2.13) | registrations by each pin's owner; the sets at the item's switch-on bump | CI (nightly; PR on the two PR golden seeds); the switch-on bumps (3.7.6); other causes' shifts, which re-record the sets | `plat/goldens/noop/<id>/o<k>/` | the suites under the overlay | — | re-recorded only by another cause's declared shift with matching stage lists (V12 §3.7.8) |
| the trial's entries: `trial` rows and `known-defects.json` entries (V12 §2.14) | `plat calibrate register --trial <path>` over V09 §7.6's `TrialRecord` | the register report, the release notes, the fix list | `register.json`; §13.3's file | — (a finding is a fact) | a disposition is appended, never edited | read by schema version |
| `history.jsonl` | `plat parity`, one line per row per run | the dashboard's sparkline | `plat/goldens/parity/history.jsonl`, pruned to 60 nights | appended per run | — | read by schema version |
| `known-defects.json` entries opened here | failing bars, unreachable witnessed values, withdrawn M-1 rows, open trial findings | release notes, milestone exits | §13.3's file | — | closed, never deleted, by the run, report or release that clears it (`MilestoneRecord.knownDefects.closed`) | — |

### 2.12 The known-city fixtures (V12 §3.14)

```ts
interface KnownCityFixture {              // plat/goldens/known/<id>/fixture.json; test-side, never document state
  id: 'K1' | 'K2';                        // K1 = J78's fixture (T101-6); K2 = item 110 (e)'s
  inputs: string;                         // plat/tests/fixtures/known-city/<id>/ — brief.md (our words and names), skeleton.plat, canvas.json, transcript.json
  seed: string;                           // seedOf('known', [id]) as a decimal string (V12 §2.4)
  rung: Rung; population: number; water: WaterSetting;   // K2: CITY, 20 000, 'coast'; K1: as T101-6's brief declares (CITY, coast)
  structure: StructureCheck[];            // evaluated on the model after generation, on every authoring path
  emulationSubset: string[];              // the check ids whose entities are all declared at L1 or L2 (§7.1's level table), computed at registration
  digests: Record<string /* output version */, Hash128> }   // the model digest the skeleton and the canvas paths share
type StructureCheck = { id: string; what: string /* plain words: the report line and the dedicated-user checklist */ } & (
  | { kind: 'quarter'; name: string; quarterKind?: string }          // a declared quarter by name and kind (T101-6)
  | { kind: 'namedPlaceInQuarter' }                                   // every named place in its declared quarter (T101-6)
  | { kind: 'enceinte'; closure: 'ring' | 'shore' | 'barrier'; chainEndsOnShoreM?: number; towersMin: number; landGatesMin: number; gatePlaza?: true }
  | { kind: 'harbour'; enclosedBy: 'mole'; headLandmark: string /* class */; midLandmark: string; midTolerance: number /* share of the mole's length */ }
  | { kind: 'causeway'; toIsletMaxHa: number; isletLandmark: string }
  | { kind: 'anchorage'; jettiesMin: number; outsideBasin: true; deckBuildingJettiesMin: number }
  | { kind: 'terracedWards'; wardsMin: number; innerWall: true; retainingMin: number }
  | { kind: 'stairOrRamp' }                                           // every way crossing a retaining wall is a stair or a ramp there
  | { kind: 'ringStreet'; aroundPlace: string }                       // a cycle of ways whose interior holds that place and no other declared place
  | { kind: 'raisedWay'; ref: string; straightMax: number /* largest chord deviation ÷ length */; part0CrossingsMin: number; endsRampOrStair: true }
  | { kind: 'ravineQuarter'; quarter: string; retainingMin: number; informal: true }
  | { kind: 'landmark'; cls: string; name?: string; inQuarter?: string }
  | { kind: 'stepped'; place: string; tiersMin: number }
  | { kind: 'deckPlots'; bridge: string; buildingsMin: number }
  | { kind: 'regionLabels'; count: number }                           // K1's three region labels
  | { kind: 'across'; place: string; water: 'river' }                 // K1's satellite across the river
  | { kind: 'namesClean' } )                                          // the fixture's files pass §17.1 (5)'s scan with item 536's names
interface StructureResult { fixture: string; path: 'skeleton' | 'canvas' | 'transcript' | 'emulation'; outputVersion: string;
  digest: Hash128; failed: { id: string; what: string; found: string }[]; extras: string[] /* generated extras, reported, never failed */ }
```

Registration refuses a fixture whose input folder lacks one of its four files (naming the path) or whose structure list
is empty (a fixture with no check proves nothing).

### 2.13 The no-op pins (V12 §3.7.8; E-20)

```ts
interface NoOpPin {                       // @plat/testkit/noop; test-side
  id: string;                             // 'item<n>.<family>' — the registered set below
  bar: string;                            // the owner bar the pin proves: 'T110-7', 'T111-5', 'T113-7', 'T120-1', …
  kind: 'offForm' | 'rungScope' | 'view' | 'entityScope' | 'input';
  overlay: { ref: CellRef; value: unknown }[];   // offForm: the item's off form, each cell at its in-range off value where V11 states it (E-20); empty otherwise
  rungs?: Rung[];                         // rungScope: the rungs whose suites stay byte-identical across the item's switch-on bump
  view?: { key: 'season' | 'festival' | 'find' | 'crises' | 'resolution' | 'effects' | 'viewport'; values: string[];
           tiles?: true; exports?: true; cache?: true; session?: true };
                                          // view: the values of one key outside the document — view state (season, festival,
                                          // find, crises), device state (resolution, effects: V09's AppPrefs) or the window's
                                          // size (viewport, CSS px) — the model digest and the saved bytes (the edit log
                                          // included) are invariant across: weeks; festival displays; Find `off` and each fixture
                                          // chip set, with `+gaps` for Show gaps on; crises `follow` in every week, `off` and each
                                          // look kind's `preview`; Auto and each manual level; the effects off, on with no spell
                                          // and each spell kind in force; a resize script's sizes; `tiles`: also the tiles drawn
                                          // with the view off — no festival (item 118 (h)), Find cleared after its chips were on
                                          // (item 120 (k)), no condition standing and no preview (item 122 (g)) — against the
                                          // pre-item tile goldens; `exports`: also every picture, print and battle-map export
                                          // byte-identical across the values (items 121 (g), 124 (h)); `cache`: also no cached
                                          // tile re-rastered or re-composed across them (item 124 (i)); `session`: the values
                                          // stepped through in order in one open session, the view key (§2.9) and the selection
                                          // also byte-identical at every step (item 126 (e))
  entities?: { kind: 'building'; neverHeld: ('abandoned' | 'decayed' | 'ruined')[] };
                                          // entityScope: the entities whose drawings and exports stay byte-identical to the
                                          // off-state set at every band and week — item 123's buildings whose lineage never held
                                          // those states (decay level 0, §2.6 step 7; §6.3)
  input?: { key: 'hostContext'; values: string[] };
                                          // input: the values of an input outside the dossier — no host context, and each
                                          // fixture's `HostContext` (§11.4) — under which each suite dossier generates one model
                                          // digest and identical saved bytes (item 125 (e))
  suites: { suite: string; owner: string }[];   // registered by their owners
  switchedOn?: string;                    // the output version whose bump switched the family on; absent before it
  store: string }                         // plat/goldens/noop/<id>/o<k>/ — the off-state digests per output version
```

| pin | bar | kind | off form (read from V11 §3.24.0 where V11 states it, else from the cells the bar names — E-20) | suites (their owners register them) |
|---|---|---|---|---|
| `item102.sun` | T102-1 | offForm | the cells T102-1 names | the golden suite and hook fixtures (base); V05's island fixture (T-V5-19 (c)); H-100 (V06, T-V6-12's `w_sun` clause) |
| `item103.coverage` | T103-3 | offForm | the cells T103-3 names | the golden suite; B-CITY's 200 seeds per rung (V11, T-V11-13); V05's island fixture (T-V5-22 (b)) |
| `item105.web`, `item107.spread` | T105-4, T107-4 | offForm | V11 §3.7.4's web off form; with it, the cells T107-4 names | the golden suite; B-CITY's 200 seeds per rung (V11, T-V11-21); H-100 (V06, T-V6-44); V05's island fixture (T-V5-22 (k)); V07's village goldens (T-V7-33, on `item105.web`) |
| `item106.barrier` | T106-5 | offForm | the cells T106-5 names | the golden suite; item 106 (h)'s barrier fixtures (V11, T-V11-19); V05's island fixture (T-V5-27) |
| `item109.underground` | T109-6 | offForm | the cells T109-6 names | the underground goldens (V04, T-V4-47); V07's village goldens (T-V7-38) |
| `item110.raised`, `.terrace`, `.deck`, `.stepped` | T110-7 | offForm | V11 §3.24.0's switch table, one row set per family (the stepped family's `roster.specialisations` included, which a pin leaving it on would not isolate); `item110.terrace`'s overlay also sets V03's `exposureAllStoreys` false (item 110 (a)), so the four pins together are V11 §3.24.0's six switches off | the golden suite and hook fixtures, B-DOSSIER-lite (base); the neighbourhood suite (V01, T-V1-4 (e)); B-MASS (V02, T-V2-50); B-PLAN and B-CITY-lite's plans (V03, T-V3-34); the underground goldens (V04, T-V4-69); the sky goldens (V05, T-V5-15) and V05's island fixture (T-V5-27's item-110 clause, on `.terrace`); H-100, H-AQUA, H-TERRACE, H-DECK (V06, T-V6-65); V07's village goldens (T-V7-52); the known-city canvas scripts (V09, T-V9-57); the reader goldens (V10, T-V10-43); B-CITY (V11, T-V11-31); K1, K2 (V12) |
| `item111.water` | T111-5 | offForm | V11 §3.24.0's `climate` dry-cell off form (the six cells) | the golden suite; an arid and a temperate site, 200 seeds per rung (V11, T-V11-38 (b)); V05's island fixture (T-V5-33's item-111 clause); H-100 (V06, T-V6-72); V07's village goldens (T-V7-58); V08's port fixtures (T-V8-50); the reader and why goldens but the brief's (V10, T-V10-45) |
| `item113.history` | T113-7 | offForm | V11 §3.24.0's `history.replay` false (§4.11) | the golden suite; the underground goldens (V04, T-V4-77 (d)); the history fixtures (V06, T-V6-71); V07's village goldens (T-V7-59); T-V11-39 (a)'s four fixtures (V11, T-V11-39 (b)) |
| `item114.condition` | T114-8 | offForm | V11 §3.24.0's `walls.condition` off form | the golden suite (base; T114-8's generation clause); H-100 and H-WALLS, the wall fixtures (V06, T-V6-73); V07's palisade goldens (T-V7-62); B-CITY's 200 seeds per rung (V11, T-V11-40 (b)) |
| `item115.off` | T115-4 | offForm | V11 §3.24.0's `grandeur.ceiling` `enabled` false on every row | the golden suite; V07's village goldens (T-V7-63); B-CITY's 200 seeds per rung (V11, T-V11-41 (b)) |
| `item115.ceiling` | T115-4 | rungScope | — (`rungs`: TOWN, CITY, METROPOLIS) | the golden suite; B-MASS (V02, T-V2-58 (f)); H-100 over epochs at TOWN and above (V06, T-V6-74); V08's port fixtures at TOWN (T-V8-53); B-CITY's TOWN, CITY and METROPOLIS seeds (V11, T-V11-41 (b)) |
| `item117.season` | T117-1 | view | weeks 0 – 51 | the golden suite; the sky goldens (V05, T-V5-34); V07's village goldens (T-V7-65) |
| `item118.festival` | T118-1 | view (`tiles`) | display `off`, `follow` in every week, `preview` of each listed festival | the golden suite; the sky goldens (V05, T-V5-35); V07's village goldens (T-V7-66); the festival fixtures |
| `item120.find` | T120-1 | view (`tiles`) | Find `off`; each Find fixture's chip sets, Show gaps off and on (V12 §3.15.10) | the golden suite; the sky goldens (V05, T-V5-36); V07's village goldens (T-V7-68) |
| `item121.display` | T121-6 | view (`exports`) | Resolution Auto and each manual level — 4K, 1440p, 1080p, 720p — on V12's device fixtures (V12 §3.15.11) | the golden suite; V12's display fixtures |
| `item122.crises` | T122-1, T122-7 | view (`tiles`) | crises `follow` in every week, `off`, and `preview` of each look kind of §10.2's table (V12 §3.15.12) | the golden suite; V12's crisis fixtures (the previews from M3b, V08's dossier crisis fixtures from M-SF); the look fixture's exteriors (V02, T-V2-60 (c)); the damage fixtures' disaster district, its plan tiles at the building band (V03, T-V3-40 (f)); the frozen dossier set's crisis conditions (V08, T-V8-59) |
| `item123.damage` | T123-7 | entityScope | — (`entities`: the buildings whose lineage never held `abandoned`, `decayed` or `ruined`) | the golden suite; V03's damage fixtures, their plans drawn and exported at every level (V03, T-V3-39 (g); measured by V12 §3.15.13); the damage sub-fixture's exteriors (V02, T-V2-59 (d)); the underground's bands and per-band exports (V04, T-V4-82 (g)) |
| `item124.effects` | T124-1, T124-8 | view (`cache`, `exports`) | the effects off, on with no spell, each spell kind in force, and **Start a shower now** (V12 §3.15.14) | the golden suite; V12's weather fixtures |
| `item125.host` | T125-2 | input | no host context; each fixture `HostContext` — an `audience`, `displayNames` and a `line` (V12 §3.15.15) | B-DOSSIER-lite (base); V12's item-125 fixtures (the required-keys dossier at every rung); the frozen dossier set through the port (V08, T-V8-61 (b)) |
| `item126.resize` | T126-2 | view (`session`) | the resize script's sizes: 1 024 × 768, 600 × 480, 599 × 479, 480 × 360 and 1 024 × 768 CSS px (V12 §3.15.16) | V12's layout sessions on V09's app harness |

Registration refuses an `offForm` pin with an empty overlay or an overlay cell outside its column's range, a `rungScope`
pin without rungs, a `view` or `input` pin without values, an `entityScope` pin without `entities`, and a suite no owner
registers. A missing off-state set after switch-on
fails CI naming the pin.

### 2.14 The game-master trial in the calibration record (item 112 (b))

The trial's one record is V09 §7.6's `TrialRecord` (`plat/goldens/ux/release/trial.json`: its participants, sessions,
findings with their severity and fix, its report and verdict), and its pass is V09's T-V9-72 under §13.2's T112-2 in §16's
release gate. This volume enters its findings into the calibration record and the fix list: `plat calibrate register
--trial <path>` (the release candidate's trial seat runs it when the record is committed) appends, to each register entry a
finding concerns — a colour finding the style threshold's entry (V12 §3.11), a realism finding the entry of the table its
`area` names — one `trial` history row `{ date, value: null, trial: '<path>#<participant>.<finding>' }`, which moves no cell
and no status (the entry's own method decides any change); and it opens one `known-defects.json` entry for every finding
without `fixed`, naming its area and severity, closed by the change that fixes it or by the owner's ruling (V09 §7.6's pass
rule). A finding whose `area` names a calibrated value with no register entry is refused, naming the finding; a second run
appends nothing. The release notes list the findings and their dispositions (V12 §5.5).

## 3 Generation — the harness pipeline

### 3.1 The loop at a glance

```
 research side (reads captures; never ships)                 │ product side, plat/ (reads only what crossed)
 ──────────────────────────────────────────────────────────── │ ─────────────────────────────────────────────────────────────
 capture plan (seed families, V12 §2.4)                       │
   → captures (profiler tools; FTG one per day)               │
   → adapters → MeasureInput files (numbers, geometry)         │
   → plat measure (the product's metric code, run here)  ─────┼─ the same code: plat measure on our towns
   → per-seed rows → plat baselines aggregate                  │
   → rows.py → candidate baselines.json                        │
   → plat baselines check (C1–C10) + checker seat  ═══ numbers only ══> baselines.json ─→ plat parity ─→ ParityReport
                                                              │                                  ↓ out of band?
 panel assembly: renders from plat (read) + reference images  │  plat calibrate run (train / holdout) ─→ table versions,
   → sitting page → owner → answers.json  ═══ answers, hashes ══> plat d5 verdict ─→ D5Record          shift records, goldens
 corpus (M-CAL only): adapter → MeasureInput → plat measure   │  corpus runs (same engine) ─→ historical packs
   → frame rows  ═══ numbers only ════════════════════════════> baselines.json (corpus rows)  → M-CAL panel → release
```

The product never reads the research side; the research side may run the product's released CLI (§13.3). Every arrow
that crosses is a numbers-only file passing V12 §3.3. **At its limits:** before M-1 nothing runs; a night with no table
change and no new baseline re-runs to the same bytes (V12 §3.13); a tier with no registered spec reports its parity rows
alone; a missing research file means nothing crosses and the product side reads its last committed files. Every toggle
and preset is a recipe input the harness generates under (the P rows under their reference's preset, the O and C rows
under `'default'`, V12 §3.5.5); the model's layer toggles are visibility (II.7.1), so `measureInputOf` reads the model
whatever a view shows, and a surface `MeasureInput` never holds an underground or sky feature. The features a parity
preset meets are V12 §3.16.2's.

### 3.2 The capture-and-measure loop (research side)

**3.2.1 The capture plan.** Before a capture session `research/baselines/plan.py` writes `research/baselines/plan.json`:
for each reference, matched setting and index i, the seed `seedOf('capture/<ref>/<size or template>/<options>', [i])` and
the options string. A row is built only from a plan's indices [0, n) (check C7), so the seeds are fixed by formula before
anything is seen and a disappointing seed cannot be dropped. MFCG, NG and VG seeds are reduced into their MINSTD state
range (§13.6 (2)); FTG cannot be seeded, so its plan lists capture slots in capture order; Fantasy Manor's 41 captured
buildings are its sample as recorded (V02 §7.4). The plan at M-1:

| reference | settings | per setting | cost | note |
|---|---|---|---|---|
| MFCG (build 12710731) | sizes 40 / 80 / 130 with §13.5's plain options; size 80 with river and coast (stress, descriptive) | 10 plain (J-V12.3); 5 stress | ≈ 35 exports × ≈ 7 s wall | one URL load per export (`captures/mfcg/exports-2026-09-25/README.md`, *How export was triggered*); JSON, SVG and screenshot per seed |
| FTG (server of the capture date) | BIG_TOWN and BIG_CITY; one capture with water options nearest `none`, two nearest `coast+river` (§13.6 (2)) | 3 | six days on the free daily allowance | each capture's resident count recorded |
| NG 1.2.2 | `medium`, templates area / street / square / ring | 5 | the vertex-capture sessions of `docs/CONFIDENCE.md` §6 #2 | relative scale |
| VG 1.6.9 | V07 §7's tag sets | V07's counts | V07's recordings | V07's rows |
| Fantasy Manor 1.0.0 (build 890) | the free frame | 41 buildings (as captured) | none new | counts only (V02 §7.4) |

The MFCG stress settings exist at size 80 only, so B-REF runs no MFCG `coast+river` town at TOWN or METROPOLIS; the M1
panel's MFCG `coast+river` pairs take their own exports per rung (V12 §3.9.1), which feed no row. The panels' reference
identifiers — `fm-captures.json`, `dw-captures.json` and `vg-seeds.json`, numbers and ids only — are written by `plan.py`
and cross by V12 §3.3 into `plat/goldens/d5/<panel>/`, where `plat d5 seeds` reads them (item 535).

**3.2.2 Adapters to `MeasureInput`.** One research-side script per reference, `research/baselines/adapters/<ref>.py`,
writes `research/baselines/inputs/<ref>/<build>/<capture>.metric.geojson` with its header:

* **MFCG** — the JSON export is already in metres (the sweep README's *Units*). Each exported road becomes a way of class
  `arterial`; each footprint and prism a building of class `unknown`; the first wall polygon the city's enclosure and
  curtain, the second the castle curtain and a `castle` feature; gates are the city ring's vertices touching a road vertex,
  less those shared with the castle ring (class `land`); the district, square, green and field polygons, the river
  centrelines (with the file's river width), the pier segments and the sea polygon map to our kinds of the same meaning.
  **The shore split (item 106).** A coastal city's exported ring follows the shoreline where the drawn wall is an open
  chain (the exports README's review note 2): ring edges whose two vertices lie on the sea polygon's boundary within 0.5 m
  become `closure` features of class `shore`, the rest stays the curtain, and the ring stays the enclosure, so
  `walled.share` reads what it read before; the ring vertex on a river centreline is a gate of class `water`. Towers are
  the castle ring's non-gate vertices plus the city ring's vertices that are neither a gate, nor castle-shared, nor inside
  a shore closure (a vertex both of whose ring edges are closure edges), so the shore-end posts keep theirs — on the four
  dry cities the README's counts, on the recorded coastal city its derivation's 20. Lanes are not exported, so the
  lane-level metrics read the derived street graph (V12 §3.4.1).
* **FTG** — the decoded payload's road graph with main → `arterial`, district → `street`, suburb → `lane`; footprints;
  wall chains and tower points; fields; water outlines; centimetres to metres. No plots (the client receives none, item
  49).
* **NG** — blocks, plots and building polygons from the vertex captures, `scale: 'relative'`; the bent-cut signature's
  reference values are the recorded measurements of §13.5's bent-cut row, entered as `trace` rows.
* **VG** — V07 §7's features from its recordings; **Fantasy Manor** — no geometry, a `counts` file.

**Degenerate geometry in a capture or a corpus plate** is cleaned by one rule, never guessed: coincident vertices within
1 mm merge; zero-length segments and zero-area polygons drop; rings close on read; a self-touching ring splits at the
touch into its simple parts; each drop is counted in the row's note (`dropped: n`). A capture left with no building is
a plan index in `sample.failed` with reason `empty`, never silently skipped (C7).

**3.2.3 Measuring, with one implementation.** At M-1 no product exists, so the M-1 seats measure with research-side
scripts written from V12 §3.4's definitions (the red-team scripts of `docs/validation/bench/README.md` are their starting
point). From M1 the product's `plat measure` is the one implementation: the research side re-runs every baseline
through the released CLI on the same `MeasureInput` files, and T-V12-3 holds the two within each metric's `tolerance`;
where they differ beyond it, the seat finds which definition is wrong, and the product's value replaces the M-1 row as a
superseding row with a declared `baselineShift` (§13.3) whose note names the metric (J-V12.1). A render metric
(recoverability) keeps §16 M-1's cross-check within 0.01 on M1's golden renders. T-V12-3 and T-V12-6 read captures, so
they are **research-side checks** (`research/baselines/check_t3.py`, `check_t6.py`, running the released CLI): their
verdicts reach `MilestoneRecord.exitCriteria` as evidence strings naming the check's output hash, and nothing under
`plat/` reads a capture (§17.1 (3); T-V12-28).

**3.2.4 Writing rows.** `plat measure` writes per-seed values; `plat baselines aggregate` (product code, run research-side)
forms each row's `values` by V12 §3.5.1's estimator and, for distribution rows, `spreadKS`; `rows.py` adds §13.5's
provenance (`referenceBuild`, `capture`, `script`, `date`), the `sample` block and the role from the metric's row, and
writes the candidate file. `script` and `capture` are `research:`-prefixed labels (`research:baselines/adapters/mfcg.py`),
opaque strings the product never resolves (C2; J-V12.24).

### 3.3 The crossing — how numbers, and only numbers, enter `plat/`

`plat baselines check <file> [--previous <committed file>]` runs on every candidate numbers-only file before it is
committed — `baselines.json`, `ftg-captures.json`, `ng-counts.json`, `fm-captures.json`, `dw-captures.json`,
`vg-seeds.json`, a panel's `answers.json` and `key.json` after the reveal, and the corpus's `frames.json`
(§17.1 (4)'s list, item 535); until M1 its research-side twin `research/baselines/cross_check.py` applies
the same rules, and M1's first run of the product check re-validates the M-1 file (T-V12-1).

| check | rule | on failure |
|---|---|---|
| C1 schema | the file parses under its zod schema (`plat.baselines/2`, §13.6 (9)'s types) | refused, naming the path |
| C2 strings | every string matches its field's pattern: `id`, `metric`, `supersedes` `^[a-z0-9.:/@+_-]{1,120}$`; `sample.family`, `sample.captures[]`, a panel file's seed labels and reference ids `^[A-Za-z0-9.:/@+_-]{1,120}$`; builds `^[A-Za-z0-9._:+-]{1,64}$`; dates ISO 8601; `capture` a capture folder name (`^\d{4}-\d{2}-\d{2}T[\d-]{8}$`) or a `research:` label; `script` a `research:` label `^research:[a-z0-9_./-]{1,160}$`; any other string field refused | refused, naming the field |
| C3 notes | a `note` is ≤ 200 characters of letters, digits, spaces and `.,;:()-/%±≤≥×` and passes the clean-room scanner | refused |
| C4 colours | no six-hex-digit sequence anywhere in the file | refused |
| C5 numbers | every number finite; every unit in V12 §2.1's `MetricUnit` | refused |
| C6 metrics | every `metric` exists in `metrics.json` at the row's `metricVersion` | refused |
| C7 samples | `sample.family` is a registered `capture/…` family and `indices` start at 0; an FTG row's `captures` equal the plan's slots in order; a panel file's FM, DW and VG references are the plan's, in order | refused |
| C8 corpus | a corpus row's reference is `corpus:frame:<id>` or `corpus:map:<16 hex>`; `evidence` present; a *target* row is a frame row with `frameN` ≥ 20 and `evidence: 'surveyed'`; a frame row's frame is in `frames.json` by a `CrossingRecord` EARLIER than the row's, with equal `n` and digest; no other string of corpus origin | refused |
| C9 append-only | against the previous committed file, no row is removed or changed; a replaced row is kept and named by the new row's `supersedes`; no two live rows share one (reference, build, metric, rung, setting) | refused |
| C10 scan | the clean-room scanner (§17.1 (5)) over the whole file: 0 hits | refused |

A passing file is committed by the **baseline seat** (research tier) and countersigned by a **checker seat** that reads
only the candidate file, the check's output and `metrics.json` — never the captures — appending a `CrossingRecord`. A
candidate holding one row passes like any other (its `estimator` `single`, V12 §3.5.1); an empty candidate is refused as
"nothing to cross"; a candidate for a file that has a committed version, checked without `--previous`, is refused naming
the flag. What never crosses, whatever the check says: images, geometry, names, colours, a reference's option names
beyond numbers and flags, any corpus string other than our D-2 preset keys (J-V12.2).

### 3.4 The metric suite

**3.4.1 Two derived features for sources that lack them.** MFCG exports no blocks and no lanes; a corpus plate may show
buildings only. So that one definition runs on every source, `plat measure` derives, from footprints alone:
* **cluster blocks** — footprints whose rings lie within `g` of each other join one cluster (`g` = 1.0 m on a metric
  input, 2 % of the median footprint's short side on a relative one); a cluster block's outline is the union of its
  footprints closed by a dilation then erosion of 3 m (metric) or 10 % of that short side (relative);
* **the derived street graph** — inside the outermost curtain (or the built area's outline where there is none), the
  complement of the cluster blocks, reduced to its straight skeleton (§3.8), spurs shorter than 8 m (metric) or 40 % of
  the median short side (relative) pruned, nodes within 2 m merged.

A metric that reads blocks or lanes on MFCG reads these, and the same metric on our side reads the same derivation from
our footprints — never our true blocks — so the comparison is like with like (`blockc.*`, `sgd.*`); our true blocks and
ways feed the rows whose reference has them (J-V12.5).

**3.4.2 The catalogue.** Where the base defines a measure the row cites it; otherwise the definition here is the one
implementation's. `m` = metric scale needed, `f` = scale-free. Every wall row reads the enclosure of V12 §2.2 (item 106):
"inside the outermost curtain" means inside the outermost enclosure, "the curtain ring's area" is the enclosure's area,
along-curtain distances run along built stretches only and never across a closure edge (a condition run's end is no
stretch end), and a "main gate" is a gate of class `land` (a water gate, a harbour-mouth chain included, never counts).

**Default rules** (a row states its own value only where it differs; the registry holds the result):
* `absFloor` — shares, ratios and rank statistics 0.02; angles 1°; lengths 2 % and areas 5 % of the reference's median;
  densities (`perHa`, `perKm`) 5 % of it; counts 0.5; Moran's I and Spearman 0.05; entropies 0.05 bits; timings 5 %.
* `sign` — `any` for Moran's I, Spearman, `z` and signed angles; `positive` for everything else (a folded angle is positive).
* Distribution bins (`output.edges`; V12 §3.5.3's KS distance runs on the binned CDFs at these edges) — areas
  log-spaced, 24 bins over the metric's range (blocks 50 – 50 000 m²; buildings 10 – 2 000 m²; plots 20 – 5 000 m²) with an
  underflow and an overflow bin; run lengths 5 m bins to 400 m with overflow; nearest-neighbour distances and widths 0.25 m
  bins to 30 m with overflow.
* `tolerance` — `geo`, `model`, `trace` and `counts`: 1e-9 relative (the same code on the same input); `render`: 0.01
  absolute; the M-1 twin comparison of T-V12-3: 0.5 % relative or one unit of the last printed digit, whichever is larger.
* `stages` — the registered StageIds (§4.1) that produce the kinds the metric reads: ways S3, S4, S5a – S5d and S8; walls,
  towers, gates, the castle, closures and enclosures S3, S4, S5a – S5d; districts and squares S3, S6 – S7b; blocks S8 – S9;
  plots S8 – S10; buildings S10 – S11; the `water`, `river` and `pier` kinds S1 and S3; the `green`, `field` and `tree`
  kinds S12a – S12b; galleries and chambers the underground stages (II.7); retaining walls S10 – S11; raised parts, their
  supports and spans S4 – S6 (viaducts at S4, elevated roads and aqueducts at the end of S6, V11 §3.24). A `model` row
  names its stages where its input differs; a table's registry `readers` expand a group name (V11 §2.1) before any
  comparison, so a metric and a run always compare StageIds.
* `costMs` — measured: `plat build` writes each row's M1-measured cost per CITY town into the registry, and V12 §6
  budgets the sum; before M1 it is the §6 row's share.
* **Centroids** are area centroids for polygons and the point itself for points, in every metric; the red-team's R4 script
  used vertex means, which T-V12-6's R4 clause absorbs within its 0.02.

**Reading rules for item 110's entities** (item 447): every way graph (`junction.*`, `street.*`, `sgd.*`, V12 §3.6's
way-distance statistics) is built per part — nodes merge only within a part, parts join only at shared ramp-foot vertices
— so a viaduct passing over a ground node makes no junction; **a way of class `aqueduct` enters no way graph** and no
way-distance statistic, and no class-specific metric reads it; `wall.*`, `gate.count` and `wall.ungated` read `wall`
features only, never `retaining`; `bldg.*`, the cluster blocks, the derived street graph and `fg.*` read `building`
features only, never `raisedSupport`, `span` or `retaining`; no metric reads a `span`; deck buildings are buildings, and
the siting statistics read their `onDeck`; a stepped building's `heightM` is the top of its stack.

| metric id | input | scale | definition | reference(s) | row served |
|---|---|---|---|---|---|
| `street.turn100` | geo | m | ways other than alleys resampled at 10 m arc steps; turning = Σ \|Δheading\| between steps × 100 ÷ length; per seed the length-weighted median over ways ≥ 50 m | FTG; PLAT organic presets | §13.5 street turning |
| `street.stepHist` | geo | m | histogram of \|Δheading\| per 10 m step, 1° bins over 0–45° plus overflow; the cliff clause reads it | FTG (weakness) | street turning |
| `street.entropy50` | geo | m | Shannon entropy in bits of the heading change per 50 m window, 5° bins over 0–90° | FTG (weakness) | street turning |
| `street.drift600` | model | m | §4.4's net turn over 600 m of grown streets, organic regimes | — | growth drift |
| `junction.angles` | geo | f | nodes of degree ≥ 3 after merging nodes within 2 m; each arm's direction 10 m along it; angles between angularly consecutive arms; per seed median and p5 | NG; FTG | junction arm angles |
| `junction.share4` | geo | f | degree-4 nodes ÷ nodes of degree ≥ 3 | NG; FTG | junction arm angles |
| `street.runs` | geo | m | lengths of maximal paths between nodes of degree ≠ 2, per way class; per seed median per class | FTG | street runs by class |
| `bldg.r4.60`, `.120`, `.250` | geo | m | each building's axis = its longest ring edge's direction; z = e^{4iθ}; for 1 500 buildings sampled by the metric's stream (all if fewer), R4 = \|mean z\| over buildings whose centroids lie within r of the sample's centroid, samples with ≥ 5 such buildings; per seed median | MFCG | MFCG street signature |
| `bldg.wallAlign` | geo | m | buildings inside the outermost curtain, in bands 0–40, 40–100, 100–200 m from it: the angle between the building axis and the nearest curtain segment folded into [0°, 45°]; per band the median and the share ≤ 15° | MFCG | MFCG street signature |
| `sgd.tShare` | geo | f | on the derived street graph, degree-3 nodes with two arms within 20° of straight ÷ degree-3 nodes | MFCG | MFCG street signature |
| `sgd.deadEnds` | geo | m | degree-1 nodes of the derived street graph per km of its length | MFCG | MFCG street signature |
| `blockc.perHa` | geo | m | cluster blocks inside the outermost curtain per walled hectare | MFCG | MFCG street signature |
| `blockc.lotsPer` | geo | f | footprints per cluster block; per seed median | MFCG | MFCG street signature |
| `block.area` | geo | m (f as `block.areaRel`, ÷ median footprint area) | built blocks' areas per district; distribution | NG | blocks |
| `block.countTemplate` | counts | f | built blocks per hood per template at `medium` | NG (V01 T-V1-31) | blocks |
| `block.courtShare` | geo | f | deep blocks — largest inscribed circle's radius > 1.5 × the median footprint's short side — holding an unbuilt interior component (the block less its footprints dilated by 5 % of that short side) of area ≥ 0.5 × the median footprint area that touches no block edge ÷ deep blocks | NG; MFCG | deep block interiors |
| `cut.sigma`, `cut.cornerMid`, `cut.arrival85`, `cut.fillet` | trace | f | §4.6's recorded-frame measures on S8's cut log | NG | bent-cut signature |
| `fg.recoverability` | render | f | §8.5's metric on the city band at the matched scale | MFCG | figure-ground and streetwall |
| `fg.coverWalled` | geo | f | Σ area of footprints whose centroid is inside the outermost curtain ÷ the curtain ring's area | MFCG (descriptive) | figure-ground and streetwall |
| `fg.streetwall` | geo | f | on dense frontages, the share of cluster-block outline length within 0.5 m (metric) or 2 % of the median short side (relative) of a footprint edge | MFCG | figure-ground and streetwall |
| `bldg.area` | geo | m | footprint areas (ours: residential families; references: all buildings); per seed median and p95 | FTG; MFCG (descriptive) | plots and footprints |
| `bldg.quadSide`, `bldg.worstCorner` | geo | m / f | four-vertex footprints' median side; per footprint the largest \|corner − 90°\|, per seed p95 | FTG | plots and footprints |
| `plot.area` | model | m | L3 plot areas per class and band | — | plots and footprints |
| `bldg.partyShare`, `bldg.attached` | geo | f | per footprint the share of its perimeter within 0.3 m (relative: 1 % of its short side) of another footprint's edge, per class median; the share of footprints with any | NG; FTG (descriptive) | party walls and attachment |
| `plot.spearman`, `plot.moran`, `plot.cvDistrict` | model (NG's plots: geo) | f | Spearman(prosperity, plot area); Moran's I of plot area on the shared-edge adjacency graph with unit weights; within-district CV, districts ≥ 30 plots | NG (weakness) | plot-area gradient |
| `alley.gradient` | model | f | Spearman of alley length per hectare against prosperity decile | FTG (weakness) | alleys |
| `walled.share`, `ribbon.share` | geo | f / m | buildings whose centroid is inside the outermost curtain ÷ all; extramural buildings within 100 m of an arterial ÷ extramural buildings | MFCG | walled share and ribbons |
| `district.area`, `plaza.area`, `castle.area`, `castle.compact` | geo | m / f | per district hectares (per seed median); the principal square's hectares; the castle's hectares; 4πA ÷ P² | MFCG | MFCG anchors |
| `wall.nodeSpacing` | geo | m | along-curtain distance between consecutive wall nodes — towers, gates and vertices where the curtain turns ≥ 10° — p50 | MFCG | MFCG anchors |
| `quarter.count` | geo (references: district features) / model (ours: quarter labels at the city band) | f | the count | MFCG | MFCG anchors; labels |
| `outline.r90cv`, `outline.roadRatio` | geo | f | 36 sectors of 10° about the centre; r90 = the 90th percentile of building-centroid distances in a sector (sectors ≥ 5 buildings); CV of r90 over sectors; mean r90 of sectors whose middle bearing lies within 5° of an arterial's outward bearing where it leaves the built area ÷ the other sectors' mean | FTG | outline anisotropy |
| `usemix.resOnly`, `usemix.entropy`, `usemix.liveIn` | model | f | §13.7's block-level use-mix definitions | — | block-level use mix |
| `wall.towerSpacing`, `wall.ungated`, `gate.count` | geo | m / f / f | along-curtain spacing of consecutive towers, p50; arterial ways crossing a curtain at no gate; main gates of the outermost curtain | FTG; MFCG | towers and gates |
| `water.step`, `water.riverWidth` | geo | m | median vertex spacing of water outlines after dropping vertices turning < 1°; the median river width | FTG; MFCG (descriptive) | water |
| `tree.nnP1`, `tree.nnMedian`, `tree.pcf` | geo | m | nearest-neighbour distances of tree points; the pair-correlation function at 1 … 20 m (Stoyan and Stoyan's estimator, §17.1 (8)) | FTG (weakness); the sampler | tree scatter |
| `pop.perBuilding` | geo / model | f | population ÷ buildings | MFCG (weakness); FTG | population and buildings |
| `time.model`, `time.firstMap`, `time.worst` | timing | — | §12's measures in the timing phase, ÷ the calibration score ratio (§12.1), at every rung (item 119 (f)) | MFCG; FTG; NG | generation time; MFCG-worst configurations; §12's targets |
| `wait.generate`, `.regenerate`, `.openFromSF`, `.dossierChange`, `.advanceTime`, `.historyReplay`, `.export`, `.migrate`; `wait.progressMs` | timing | — | item 119's one-time waits, click to complete result — `advanceTime` the whole advance and `historyReplay` the replay with the peak's generation before it, each in total (item 119 (a2)) — on the reference hardware (§12.1), and the time from the click to the first progress frame (V12 §3.15.9) | — (ours) | item 119 (f) |
| `time.findSuggest`, `time.findGlow` | timing | — | item 120 (j)'s interaction times at the METROPOLIS cap on V09's app harness: a key in Find's box to its suggestions drawn; a chip's click to its matches' glow drawn | — (ours) | item 120 (k): §12.5's overlay budget (V12 §3.15.10) |
| `delivery.tier`, `ladder.use`, `vacancy.share`, `quay.reach`, `residue.share`, `entrance.frontage`, `hidden.share`, `wealth.*` | model | — | from the core statistics record and the report (§13.2, §5.4) | — / FTG descriptive | the C rows of §13.5 |
| `draw.*`, `label.*` | render / model | — | §8.3's census; §9.4's checks | MFCG; NG | draw style; labels |
| `variety.dispersion` | geo | f | §7.7's signature vector per town, computed from the input where the source has the kinds; standardised by the rung's pooled deviations; mean pairwise Euclidean distance over the seeds | MFCG; FTG (floors) | between-seed variety |
| `market.secondary`, `market.adjacent` | geo | f | market squares beyond the first per town; market-square pairs sharing an edge | MFCG | markets |
| `palette.paperLuma`, `.paperWarmth`, `.inkLuma`, `.inkWarmth`, `.plateChroma` | render | — | §8.2's definitions on §8.2's measurement render | item 69 (owner-set targets) | §13.4 palette bar |
| `fm.*` | counts | f | one metric per row of V02 T-V2-31's table and its plan-extent clause, as V02 states them (nine rows — family shares, path segments, blocks, towers, square towers, dormers per segment, porches, half-round porches, entrances — and the plan extent in wing widths) | FM | V02 §7.4 |
| `vg.*` | geo / counts / timing | per V07 | V07 §7's parity metrics | VG | V07 §7 |
| `siting.<spec>` | model (corpus: geo with `use`) | m / f | the correlation harness's placement statistic for one `NullModelSpec` (V12 §3.6); its bar's verdict statistic is `bar.<spec id>` | the corpus at M-CAL | T71-3; file g's bars |
| `bar.<barId>` | model | f | the verdict statistic of one registered owner bar, generated per registration, no band (V12 §2.1) | — (ours) | the register's entries (V12 §3.11; V02 §3.10.10, V06 §8, V11 §8) |
| `frame.<table>.<column>` | geo | per its target metrics | a declared frame's value for one calibratable column; `notApplicable` until its corpus run (V12 §2.1) | the corpus | the register's `corpus` entries |
| `wall.barrierShare` | geo | f | closure edge length ÷ the enclosure's perimeter; a town without a curtain is `notApplicable` | MFCG (descriptive: its shore closures); the corpus | item 106's use of natural barriers |
| `wall.condition` | model | m | per enceinte, run length by condition (`standing`, `worn`, `patched`, `breached`, `dismantled`) and by material (robust or a patch row), with each run's epoch of last change (§2.7, items 575, 114) | — (ours) | item 114 (g) |
| `grid.r4`, `grid.axis` | geo | f / deg | inside a region (for a paired bar the ruin's outline, V12 §3.6b; otherwise the enclosure), ways or galleries resampled at 10 m steps; z = e^{4iθ} per step weighted by its length ℓ; R = \|Σ ℓ z\| ÷ Σ ℓ; axis = arg(Σ ℓ z) ÷ 4 folded into [0°, 90°); fewer than 20 steps → `notApplicable` | — (ours: a ruin against the town above) | item 109 (c)'s distinctness bar |
| `ruin.blockArea` | geo (underground profile) | m | the faces of the gallery graph — every gallery in every state, nodes within 2 m merged — inside the system's outline, median area; no face → `notApplicable`; the town side: `block.area`'s built blocks inside the same outline dilated by 25 m steps (at most 100 m) until it holds ≥ 5 blocks, else `notApplicable` | — | item 109 (c)'s distinctness bar |
| `plan.rightAngle`, `plan.straight` | geo (underground profile) | f | on every chamber outline and every gallery's two wall lines (its centreline offset by half its width), vertices turning < 1° dropped: the share of the remaining vertices whose turn lies within 5° of ±90°; the share of wall length in straight runs ≥ 4 m (a run keeps within 2° of its first segment's direction) | — (a ruin against a cavern) | item 109 (i)'s structure test |
| `void.*`, `link.*`, `ladder.members` | model | — | per cavern or ruin system: present by kind, accessible through open links (directly or through linked systems, items 109 (j) (3), (3b), 113 (e)), its access state (open or LOST), buildings over it (footprints whose base lies within `DigRule.reachM` above one of its chambers or galleries); per deep void (a connected component of a system's parts of positive area whose tops lie deeper than `DigRule.reachM` below every footprint over them): whether an access reaches it; per undercity: its first void source; per derived supply link (item 105 (a)): way distance, the good's `comfortM`, within comfort; per chain instance: flow order and spread; a collective record's member count | — | V12 §2.7b's indicators: items 104 (h) (8), 105 (k), 107 (g), 108 (f), 109 (i)–(j), 113 (e) |
| `crypt.present`, `crypt.areaM2`, `crypt.rank`, `crypt.joined` | model | f / m / f / f | per building of a church class (V11's crypt column `always` or `basement`): whether it holds `Basement.crypt` (V03), per class the share; each crypt's floor area; the rank of the cathedral's (or great temple's) crypt by area, 1 wherever one stands; whether a (3b) link joins the crypt to a catacomb complex (V04's `cryptJoin`) | — | item 109 (k) (2): V11's T-V11-25, V04's T-V4-50 |
| `catacomb.count`, `catacomb.source`, `catacomb.rank` | model | f | complexes per settlement; each complex's source kind (V04's `CatacombComplex.source.kind`); whether the largest by `extentFloorM2` lies under the cemetery serving the most burials | — | item 109 (k) (3): V04's T-V4-50, V06's T-V6-40 |
| `catacomb.extentM2`, `catacomb.fill`, `catacomb.blockedBy`, `catacomb.growthM2` | model | m / f / — / m | per complex keyed by its id (its source lineage, V04 §3.5.1): `extentFloorM2`, the high-water extent over every gallery and chamber in every closure state — silted, caved-in and sealed parts included, the author-deleted area excluded (J-V4.56); its ossuary `fill` in [0, 1]; its `blockedBy` reasons; the area added at a step, with its cap `max(extent × ((1 + growthCapShare)^years − 1), growthFloorM2)` (V04 §2.3's `CatacombRule`, read per year, J-V6.53) | — | item 109 (k) (4)–(6): V04's T-V4-51, T-V4-52; V06's T-V6-38, T-V6-39 |
| `raised.count`, `raised.generatedBelowCity`, `raised.reasonMissing`, `raised.overCap` | model | f | raised ways by kind × source; generated ways whose founding epoch's rung was below CITY — the rung of the `EpochRecord` of the epoch whose event created the way (item 244 stores none), `source` `generated` only, so a declared way never counts and a way carried down from a city epoch counts by that epoch's rung; generated ways without a recorded reason and its why rows; generated foundings made while the kind's generated, suppressed and declared ways already reach its cap (V06 §3.19.1 (1)–(2)) — the last three 0 by rule | — (ours only, descriptive and C) | item 110 (b), (f): the guards (V12 §3.7.4) |
| `raised.junctions` | geo | f | nodes of degree ≥ 3 joining a part ≥ 1 to part 0 anywhere but a ramp foot; 0 by rule | — | item 110 (f) |
| `retaining.lengthM`, `retaining.onFlatM` | model | m | retaining-wall length by source; generated wall length whose both sides lie below `terrace.slopeMin` — 0 by §13.2's T110-1, reported in the nightly statistics, never a harness row | — | item 110 (a), (f) |
| `deck.buildings`, `tier.count` | geo / model | f | buildings with `onDeck` by deck kind; per stepped building its tier count | — | item 110 (c), (d) |
| `crossing.kinds` | model | f | (J-V12.64) per way class, the crossings of a retaining wall by kind — ramp or stair — and the count of `W_STEEP_RAMP` reports (V11 §3.24.5); stages S4, S5a – S5d, S9 and the levelling | — (ours only, descriptive) | the `ways.crossing` register line (V12 §3.11); the M4-110 group's report |
| `water.needRatio` | model | f | per town at the aqueduct reason's test: the demand D, the supply S and `needRatio` (V11 §3.24.6), and whether an aqueduct is a candidate — by the base's own water-balance function over the town's recorded inputs, never a second implementation; stage S6 | — (ours only, descriptive) | the `water` and `climate` register lines; V11's T-V11-33 |
| `water.kinds`, `water.walkShare`, `water.distByBand` | model | f / f / m | the waters a site draws by kind (river, lake, coast, oasis) and source (generated, drawn, dossier); per town the share of households whose plot lies within the water-supply family's walking radius (V11) of water — a river bank, a lake or oasis shore, a spring, a well or a public fountain; per town and prosperity band the households' mean way distance to reliable water (§4.5's water term's targets) | — (ours) | item 111 (d) (V12 §3.15.1) |
| `ruin.survival` | model | f | per ruin system and persistence class (V04's `PersistenceClass`): the share of its laid elements standing — in no collapsed or filled closure state (§2.7) — beside V11 §3.23.5's share aged by V04's law at the ruin's age and cover; the underground stages (II.7) | — (ours only, descriptive) | the `under.ruin` `survival` register line; the V4-U5 panel's report |
| `shade.gap` | model | — | item 102 (g): the mean prosperity of sunlit minus shaded plots within districts holding both; descriptive — V05's island fixture and V06's drift fixture read it as their fixture bars | — | item 102 (g) |
| `bldg.grandeur` | model | f | per rung, the dwellings holding an `H` or `U` plan, a court, a tower, a turret or a gatehouse; the manor-class dwellings with their cause (a lord, a dossier record, a hand edit) | — (ours) | item 115 (f) (V12 §3.15.5) |
| `view.limitStop` | model | f | per map and viewport, the zoom-out limit's stop (§8.8), whether the whole `bounds` fits the viewport's short side there, or, where no stop fits them, whether the limit is stop 0 (J122), and the count of reachable stops beyond it (0 by rule) | — (ours) | item 116 (e) (V12 §3.15.6) |
| `season.crownColours`, `season.leafCover`, `season.iceOrder`, `season.iceSnow`, `time.reskin` | render / timing | f / f / — / f / — | at a week of the year: the distinct crown colours drawn among deciduous trees; the share of ground, street, green and roof area drawn under leaf cover; per water kind the first week it is drawn frozen; any ice or snow drawn (a count); the re-skin time of cached tiles at a season switch (§12.5) | — (ours) | item 117 (i) (V12 §3.15.7) |
| `festival.weeks`, `festival.kinds`, `festival.stage`, `festival.blocked` | render / model | — / f / — / f | the weeks a festival's decorations draw; the decoration kinds drawn, by tier; the place its staging landed on and how (named, keyed, fallback); decorations over a gate's passage or a label keep-out (0 by rule) | — (ours) | item 118 (h) (V12 §3.15.8) |
| `find.matches`, `find.leaks`, `find.held`, `find.pins`, `find.cues` | model (the overlay provider's match set and §11.2's rows) / render (pins, bubbles and cues as drawn) | f | on V09's app harness, per chip of a Find fixture's chip set at a view key: the entities Find draws against the gazetteer query's rows at that key, mismatches counted; under a player view on the knowledge canary fixture, the suggestions, counts, glows, pins, ghost pins, gap outlines and legend chips naming a withheld entity; over a step script of band and layer changes, commits — one removing a chip's last match among them —, an advance, an undo, a redo, a regenerate, a save and load and a migration, the steps whose chip set changed or whose matches differ from a fresh evaluation there, and a chip whose last match went counted unless it stays at count 0, dark; at the city band's stops, the matches with neither a pin nor a count bubble; the chips without their own second cue — each 0 by rule | — (ours) | item 120 (k) (V12 §3.15.10) |
| `resolution.changes`, `resolution.p95` | timing | — | on V09's app harness under Auto (V12 §3.15.11): over a scripted session of pans, zooms and drags with a settle after each, on the fixture loaded at its threshold, the level changes applied during a gesture and the most applied in any 10 s window (counts); Auto's rolling frame-time p95 (ms) over §12.5's reference viewports on the reference and low-end devices, against the tier's frame budget (§12.5) | — (ours) | item 121 (h): T121-2, T121-3 (V12 §3.15.11) |
| `resolution.textPx`, `resolution.ultra4k` | render / timing | f | at each level — Auto's rungs and each manual level — on a device fixture of pixel ratio 2, the pixels of the label glyphs and halos, the chrome and the overlay marks inside their boxes that differ from the same view drawn at the device's ratio, in V09's captures (0 by rule); on an ultra-tier device fixture holding a native-4K view lit at full precision over §12.5's reference viewports, a vector: the canvas memory §12.8's measurement reads ÷ the tier's 512 MB ceiling (≤ 1), and the light rungs given up (0) | — (ours) | T121-5, T121-8 (V12 §3.15.11) |
| `crisis.weeks`, `crisis.stable`, `crisis.scale`, `crisis.blocked`, `crisis.share` | render / model (DR44's standing looks and §10.2's placement) | f | on the crisis fixtures (V12 §3.15.12): per look, the weeks it draws against its condition's [`sinceWeek`, `untilWeek`) (§2.7), mismatched weeks counted, and, under a player view, any look drawn for a `none`-row condition carried beside the looks counted as a mismatched week, and each look-bearing condition's look drawn in its weeks at every key (`public`, DR44); per seed, the look's tiles in the view against a picture export at the same stop and against a second open of the document, differing tiles counted; over a rung sweep at one severity and a severity sweep (0, ¼, ½, ¾, 1) at each rung, the steps at which a look's drawn extent — its camped ground in m² at a camp place, else the share of its place's units (§10.2 (c)) — falls, and, its second count, at each rung and at severities 0, ½ and 1, each look §10.2 (c) sizes by severity (no headcount and no count given; every preview among them) whose camped ground, the ring remainder counted at §8.8's ring density, differs from its row's `scale` at that severity (linear between its two ends) by more than 5 %, or whose units differ in number from the count §10.2 (c) gives that share of its place's units — for the `disaster` look V01 §3.16 `disasterSource` (5)'s, max(k, \|`matched`\|) with k that count, or every unit of a fire order shorter than that, its shortfall reported and not counted; look marks on water, a gate's passage or a label's keep-out, and on a way's carriageway any mark save a barrier across it (a `barricade`, a `beast`'s `stakes`, a quarantine's `cordon`; §10.2 (d)); on a week standing several camp looks, a camp look holding outskirts land owed to a look before it in `priority` order (ties by condition id) — a face that look's place ranks while it spills onto the ring, or any outskirts face while it spills at the cap — and the camped land past `densityCap` of the outskirts' free land, in m² (§10.2 (e)) — each 0 by rule | — (ours) | item 122 (g): T122-2, T122-3, T122-5, T122-6 (V12 §3.15.12) |
| `time.crisisReskin`, `crisis.rasterShare` | timing | — / f | in §12.1's timing phase on the golden views of every family at every rung with the crisis fixtures (V12 §3.15.12): the re-skin time of the visible tiles at a change of the crisis display and at the drawn week crossing a condition's edge, against §12.5's settle bound; the looks' share of a tile's raster time, against §12.5's 20 % | — (ours) | §12.10's R12-37 (V12 §3.15.12) |
| `crisis.areaPerHead`, `crisis.coalition`, `crisis.framing`, `crisis.ring` | model (§10.2's placement, §2.9's crisis framing) / render (the ring's arcs) | f | on the force fixtures (V12 §3.15.12): per army or group with a dossier headcount h, its camped ground — its camp's faces, plus any remainder on the ring at §8.8's ring density — ÷ (h × `areaPerHeadM2`), within [0.9, 1.1]; a coalition of two armies of h heads against one army of h, the ratio of their camped ground, within [1.8, 2.2]; while a look stands, the camps outside the opening view, outside Fit's view and beyond the limit's view, and once none stands the stops by which the limit differs from item 116's and the moved views re-framed — each 0 by rule; per force too large for the frame and its margin, a remainder with no arc on the ring at the city band, and any change of the frame, the margin, the model digest or the hash — 0 | — (ours) | item 122 (h)–(i) (V12 §3.15.12) |
| `damage.nested`, `damage.breakLevel` | model (each plan element's §6.3 threshold against the building's decay level, §2.6 step 7) | f | on V03 §7's damage fixtures (V12 §3.15.13): per building at the levels 0, 0.05, …, 1 and, from M6-E, at every week of V06's decay runs, the elements damaged at a level or a week and undamaged at a higher level or a later week of the same run (0 by rule); per element, the lowest sweep level at which it shows damaged, compared across a regeneration from the same seed, a save and load, an undo and redo of an unrelated edit and a migration, differing elements counted (0) | — (ours) | item 123 (f): T123-2, T123-3 (V12 §3.15.13) |
| `weather.frameMs`, `weather.snow`, `weather.aridRain`, `weather.cover`, `weather.luma`, `weather.replay` | timing / render / model (the weather timeline's spells) | ms / f / share / f / share / f | on V09's app harness (V12 §3.15.14): the effects layer's frame time at the densest spell of each kind over §12.5's reference viewport on the reference and low-end devices, p95; over all 52 weeks of every `arid` climate row and every row whose winter does not freeze, the frames drawing a falling-snow mark and the tiles drawing lying snow (0 by rule); per `arid` row and week band, the timeline's rain-spell frequency over a simulated session clock against the row's weather column (within three standard errors), and its rain spells in the row's dry weeks (0); the label, halo, chrome and overlay pixels a spell changes (0 by rule); the view's mean relative luminance per frame through each spell's life, its largest change in any one second against §8.4 (i)'s photosensitivity limit, flashes counted (0); two timelines from one session seed, clock and set of presses, spells differing in kind, start or length (0) | — (ours) | item 124 (i): T124-2 – T124-4, T124-6, T124-7, T124-9 (V12 §3.15.14) |
| `port.fallbacks` | model (the generation report) | f | on the required-keys dossier at every rung (V12 §3.15.15): the fields V08's field table lists as read that the dossier lacks, each without a report line naming the fallback taken, and the stages that end with no output — both 0 by rule | — (ours) | item 125 (e): T125-1 (V12 §3.15.15) |
| `layout.touch`, `layout.belowMedium` | render (V09's app harness: its layout and frame captures) | f | at the medium class's minimum, 600 × 480 CSS px, the tools of V09 §4.12's list whose canvas script fails to complete under touch events with `AppPrefs.touch.editFabric` on (V09 §4.12; §13.4's fallback changes only its default); over the resize script, the steps below 600 × 480 at which the map's layout is not the medium layout at its minimum, a tool is withheld or greyed, or the page does not scroll to every part — each 0 by rule | — (ours) | item 126 (e): T126-1, T126-2 (V12 §3.15.16) |
| `street.detour` | geo | m | over 200 node pairs per town drawn by the metric's stream among degree-≥ 3 nodes at least 100 m apart, the way-graph distance ÷ the straight distance; per seed median | NG (§16 M-1's IMPROVEMENTS §7.2 rows) | detour index ⟨M-1⟩ |
| `street.cyclesPerKm2` | geo | m | independent cycles of the way graph (edges − nodes + components) per km² of the built outline | NG | cycles per km² ⟨M-1⟩ |
| `plot.minWidth` | geo (NG's plots) / model (ours) | m | per plot the width of its minimum-width enclosing rectangle (rotating calipers, §17.1 (8)); distribution | NG | plot minimum width ⟨M-1⟩ |
| `fg.streetwallGap100` | geo | m | along dense frontages (as `fg.streetwall`), gaps longer than 2 m per 100 m of frontage | NG | streetwall gap ⟨M-1⟩ |
| `bldg.pairing` | geo | f | the share of footprints sharing ≥ 50 % of one edge with exactly one neighbour whose area lies within ± 25 % of theirs | NG (CONFIDENCE §6 #10) | adjacent-footprint pairing ⟨M-1⟩ |
| `draw.contrast`, `draw.hairline` | render | — | §8.2's contrast matrix and §8.3's hairline fidelity on §8.2's measurement render | — (our floors) | the M1 exit's contrast matrix and hairline fidelity |
| `ftg.ringBlock` | geo | m | areas of the faces FTG's ways close inside a ring, from ways alone; distribution | FTG (descriptive) | FTG face recovery (descriptive); plot depth, frontage and plot share withdrawn by item 49 ("the client receives none"), each a `known-defects.json` note |

**3.4.3 Metric versions.** A definition change is a major version: every baseline of that metric is re-measured through
`plat measure` at the new version and re-crossed as superseding rows, and the version change enters the next shift record
as a `baselineShift` (a gate that flips is declared, §13.5). Two versions of one metric never gate in one report: the
report reads the rows whose `metricVersion` equals the running registry's.

**3.4.4 The matrix — which reference gates which rung.**

| reference and pinned build | our setting | rungs | what gates (role as §13.5 or the volume states) | tier |
|---|---|---|---|---|
| MFCG 12710731 | the matched population (V12 §3.5.5), water `none`, parity preset `MFCG` for P rows; stress rows at `coast+river` | TOWN (size 40), CITY (80), METROPOLIS (130) | street signature, walled and ribbon shares, anchors, gates, recoverability and streetwall ⟨M-1⟩, markets ⟨M-1⟩, draw style (`ink`), labels (weakness), variety (floor); cover, footprints and time descriptive | nightly; milestone |
| FTG (server of each capture, request hash) | each capture's recorded population and water setting (§13.6 (2)), parity preset `FTG` | TOWN (BIG_TOWN), CITY (BIG_CITY); METROPOLIS none (D-31; J122) | turning, junctions, runs, footprints, outline, towers and gates, water, trees (weakness), time (weakness), variety (floor); population and wealth descriptive | nightly; milestone |
| NG 1.2.2 (itch 11441280) | the base's bent cut on the same face shapes (M0, M1); a district opened at neighbourhood LOD (M5, §13.6 (2)'s search) | the neighbourhood band | bent-cut signature, junction angles (organic), blocks and template counts, court share, party walls, Moran (weakness), hood time | M0 spike; nightly from M1; M5 |
| VG 1.6.9 (19365073) | V07's settings under the `VG` preset | THORP, HAMLET, VILLAGE | V07 §7's rows | V07's tiers from V-M4 |
| Fantasy Manor (build 890) | the free frame, `FM` preset | the building band | V02 T-V2-31 | V02's tiers from M6c |
| Dwellings (itch 17195045) | the plan rung | — | nothing: research-side notes (V03 §7) | — |
| the corpus (M-CAL) | per sample frame, the historical pack | the rungs its frames cover | corpus *target* rows gate the historical pack only; under the default they are descriptive until the pack is adopted for that frame (V12 §3.10.3 R2) | M-CAL; nightly after |

**The owner's later rules are invisible to every parity row** (item 23; J-V12.54). No measured reference builds retaining
walls, raises a way or builds on a mole, pier or deck (0 of 48 research inputs mention any,
`docs/validation/bench/v12_rev_item110_grep.out`; "terrace" there means row-house frontages, and FTG's moles and piers are
stored as edges with no recorded buildings — the FTG coverage audit's H17, H18). Item 110's families are extensions: 
V11 §3.24.0's switch table resolves them off in `presets.MFCG`, `presets.FTG` and `VG` (T-V11-21), `NG` resolving them as
`MFCG` does (V01 §3.15), and `presets.FM` resolves the stepped and deck families off, so every P row measures towns and
buildings without them; in the default preset they are on, and their metrics are ours only — descriptive or C, never a
§13.5 row. Items 111 and 113's extensions resolve off in the parity presets the same way (the oasis chance and the water
pull by §7.6's zeroing; `history.replay` false, §4.11), item 114's wall conditions are no measurement input (V12 §2.2),
and items 117, 118 and 122 are looks, item 120 a view and item 123's damage layer a drawing (no measurement input, the
model storing none): every `render` metric and panel render draws at the standalone default view — midsummer,
decorations off, Find off, crises `off`, `cvdVariant` `none` — whatever a document's view state holds, never draws item
124's weather effects and never reads item 121's Resolution setting (V12 §3.16.2 lists every feature a preset meets). V06's growth parity (a history's raised-way prevalence within
± 15 % of the one-click city's) compares ours with ours and stays V06's.

### 3.5 The band arithmetic and the parity run

**3.5.1 Estimators.** A reference's per-seed statistics s₁ … sₙ give its spread [a, b] and centre c (the median):
n = 1 → a = b = c (`single`); 2 ≤ n < 10 → [min, max] (`minmax`); n ≥ 10 → the 10th and 90th percentiles by linear
interpolation between order statistics (Hyndman and Fan's type 7; `type7`). With n i.i.d. draws [min, max] covers on
average (n − 1) ÷ (n + 1) of the population — 0.82 at n = 10 — so at ten seeds the two estimators aim at the same
interval as §13.5's [p10, p90] (J-V12.3).

**3.5.2 Scalar target bands.** For a `positive` metric: lo = min(a × 0.9, c × 0.85), hi = max(b × 1.1, c × 1.15) — the
union of §13.5's rule and its single-value ± 15 %, so the band is never narrower than a single value's and n = 1 reduces
exactly to §13.5's single-value rule; then lo ≤ c − `absFloor` and hi ≥ c + `absFloor` are enforced. For a metric of sign
`any`: w = max(b − a, `absFloor`), lo = a − 0.1 w, hi = b + 0.1 w. Ours is the median of our per-seed statistics
t₁ … tₘ; a target row passes when lo ≤ ours ≤ hi (J-V12.6).

**3.5.3 Distribution target bands.** The reference's own seed-to-seed spread is the 90th percentile (type 7) of the
two-sample KS distances over its n(n − 1) ÷ 2 seed pairs (n = 2: the one value). Ours is the median, over every pair
(our seed j, reference seed i), of KS(tⱼ, sᵢ) — single seed against single seed, as the reference's spread is measured —
and the row passes when ours ≤ 1.25 × that spread (J-V12.7). At n = 1 there is no spread: the ceiling is the two-sample
KS critical value c(0.01) × √((n₁ + n₂) ÷ (n₁ n₂)), c(0.01) = 1.628, n₁ the element count of the one reference seed and
n₂ that of our median-sized seed, and the row compares our median single-seed distance with it.

**3.5.4 Weakness, descriptive and declared exceptions.** A weakness row compares ours (the median) with its one-sided
bound and margin as §13.5 states it; a descriptive row is reported and gates nothing; a row whose band §13.5 or a volume
declares as an exception (the organic turning's 0.5–1.5 × FTG; V02's χ² and KS clauses for Fantasy Manor's small sample)
carries that band in its registry entry as `band.override`, and the report prints "declared exception" beside it.

**3.5.5 The parity run, step by step** (`plat parity --tier nightly|milestone [--html] [--csv]`):
1. Load `baselines.json`; re-run checks C1, C5, C6 and C9 against the last committed hash; select rows whose build equals
   their reference's pin and whose `metricVersion` equals the registry's.
2. Resolve each row's setting: for MFCG rows the **matched population** — the population whose expected non-hinterland
   building count equals the reference's median building count at that size, round(3.4 × count ÷ (1 − h)), with §12.2's
   3.4 persons per building and h the hinterland share of buildings measured on B-CITY-lite at that rung, solved once per
   rung at each milestone and recorded in the report's `setting` (J-V12.8); for FTG rows the capture's recorded population;
   for NG rows the districts `ng-counts.json` records from §13.6 (2)'s search (so the nightly never repeats it); for VG and
   Fantasy Manor rows V07's and V02's settings.
3. Generate our towns on `bref/<ref>/<rung>/<water>/<i>` (20 per setting nightly, 100 at a milestone) once per preset arm
   the setting's rows need — the reference's own preset for P rows (`MFCG` or `FTG`, T23-1; `NG`, T-V1-31; `VG`, T-V7-23;
   `FM`, T-V2-31) and `'default'` for O and C rows — so a setting with both kinds of rows generates two arms (V12 §6).
4. Per town: `measureInputOf` and the `geo` metrics; the `model` and `trace` metrics from the bench statistics; the
   `render` metrics on the nightly and milestone tiers only, at the standalone default view; the `timing` and `wait`
   metrics only inside §12.1's timing phase.
5. Per row: per-seed statistics → ours → the band of V12 §3.5.2 – V12 §3.5.4 → a verdict.
6. Write the `ParityReport` (V12 §3.13's canonical form), its dashboard and its CSV; at a milestone store it at
   `plat/goldens/parity/<milestone>.json` and name it in the `MilestoneRecord` (§13.3).

**3.5.6 Verdicts.** `pass`, `fail`, `reported` (§13.5) and two more (item 497): `notApplicable` — the setting lacks what
the metric requires (a coastal row on a dry seed; a scale-needing metric on a relative input), which gates nothing and is
counted; and `missingBaseline` — an ⟨M-1⟩ row with no baseline, which counts as `fail` by §13.5's ⟨M-1⟩ rule until M-1
records it descriptive in `known-defects.json`. A corpus *target* row is evaluated under its historical pack (gating it,
V12 §3.10.6 A2) and, under the default, reported as `reported` beside that verdict until the pack is adopted for its
frame (V12 §3.10.3 R2); a failing corpus row therefore never fails a milestone's parity exit under the default.

### 3.6 The correlation harness — every "above a random baseline" bar

T71-3 and file g's random-baseline bars (items 103 (e)–(f), 104 (g), 104 (h) (8)'s closeness, 105 (k)'s distances, 107 (g)'s
coverage and spacing) all say one thing: a soft rule shows as a measured shift against a random placement, never as a
guarantee. Item 102 (g) is not one of them: its bar is a fixture — an island over a uniform district, the shade strip
poorer by the declared weight within tolerance — owned by V05 and V06; prosperity is a field and permuting plots does not
permute shade, so no null exists for it and `shade.gap` is a descriptive metric. `plat nullmodel <spec | all>` is these
bars' one implementation; each bar's owner registers a `NullModelSpec` (V12 §2.7) and §13.2's text cites it (item 488).
Where the owner states the pass rule (V11's T-V11-12 – T-V11-14), the spec carries it as `pass` and `ownerBar` (J-V12.48).

**Towns.** A spec whose settings B-CITY covers reads B-CITY's nightly towns — the owner's count per rung (V11's 200), else
the first 50 — which the nightly generates anyway, so the bar pays only for its permutations (J-V12.40). A setting B-CITY
lacks (a custom-chain fixture, a forced site, a METROPOLIS web setting) draws `null/<spec>/<rung>/<water>/<i>` under the
spec's preset.

**Per town:**
1. The members M: the placed uses of the subject's classes. With fewer than `minMembers` (default 1 on the pooled route,
   3 on the rank route), or without a feature the spec `requires` (a river for `downstreamShare`), the town is skipped and
   counted; a spec whose every town skips is `insufficient`.
2. The eligible sites of each scope unit (a block, a district, or the town): `hardNeeds` — plots meeting every hard need of
   the subject's siting profile (V11 §2.3: a watermill's water, a quay's shore), so the null tests the soft pulls and never
   the physical ones; `sameSizeClass` — plots within the class's template area range; `anyPlot` — every built plot. The
   members' own plots are eligible, so a unit never holds fewer eligible plots than members.
3. S_obs, the statistic on the members' plots.
4. For k = 1 … K (20): per scope unit, draw as many eligible plots as the unit holds members, without replacement, from the
   testkit stream `null/<spec>/<rung>/<water>/<i>/perm` (V12 §3.13); S_k on them.
5. **The rank** u = (#{S_k < S_obs} + U × (#{S_k = S_obs} + 1)) ÷ (K + 1), with U uniform from the stream
   `null/<spec>/<rung>/<water>/<i>/tie` and S negated when the spec expects `lower`. With no pull, u is exactly uniform on
   (0, 1) however discrete the statistic — §13.2's faithfulness-campaign tie-break (J-V12.12).

**Degenerate towns.** A member or target with no access point on the way graph, or a pair the per-part graph does not
connect, has no way distance: that member is left out of the statistic and counted in the town's `skipped`; a statistic
whose denominator is 0 (no unit, no member left) skips the town. Coincident plots are ordinary ties, which the rank's
tie-break handles.

**The pooled route** (`shareWithin`, `downstreamShare`, `downwindShare`, `prestigeShare`: members counted on indicator
plots). Per scope unit the null count is hypergeometric — m members drawn from its E eligible plots, G of which satisfy the
indicator — and a town's null is the convolution of its units'; the pooled null is the convolution over the counted towns,
computed in integer-indexed doubles in town order with a fixed summation order (V12 §3.13). The bar passes when
P(pooled count ≥ observed) ≤ `alpha` (0.01; for `expect: 'lower'`, P(pooled count ≤ observed)) and, where the spec states
`minShift`, the pooled observed share exceeds the pooled null mean share by at least it.

**Across towns (the rank route).** The **rank rule** passes when the share of counted towns with u > 0.5 is at least
`townShare` (0.70) and the median u is at least `medianU` (0.60). Its exact p-value, for a `holm` family, is
P(Binomial(n, ½) ≥ the count of towns with u > 0.5), u being uniform under the null; the pooled route's p is its tail. A bar
that states its own margin (T71-3's 0.15 of the prime-frontage share, §13.7) uses the `margin` rule — the median over
towns of S_obs − mean S_k at least that value; a `holm` family (T-V11-12: each shift significant at p < 0.01,
Holm-corrected) runs Holm's step-down over its specs' p-values.

**Calibration (executed; seeded; our own code).** The rank rule passes chance 0.000 – 0.005 on normal statistics and on
six discrete fixtures (members m ∈ {1, 2, 3, 10}, base shares q ∈ {0.3, 0.5, 0.85}), and passes 0.412 / 0.927 / 0.993 at
planted shifts of 0.5 / 0.8 / 1.0 standard deviations (`docs/validation/bench/critique_v12_nullrule_rank_power.out`). The
pooled exact test holds its size at 0.002 – 0.015 and reaches a pull of 0.3 with power 0.705 (q 0.3, m 1), 0.384 (q 0.5,
m 1), 0.905 (q 0.5, m 3) and 1.000 (q 0.3, m 10), where the rank rule gives 0.302, 0.170, 0.535 and 1.000
(`critique_v12_pooled_exact.out`); at q 0.85 no rule sees a 0.3 pull (≤ 0.09), hence the headroom lint (V12 §2.7).

**Verdict and confirmation (J-V12.47).** A bar that fails on its towns is reported `suspect`, never yet a failure: it
re-runs once on a fresh family at twice the towns — `null/<spec>/<rung>/<water>/c1/<i>`, or the next B-CITY towns of its
settings — and passes if the re-run passes ("pass on confirmation"). Only when both fail is the verdict `fail`. The seeds
are fixed, so a verdict holds for the table version, and the confirmation runs at most once per (spec, table version).
Executed (`docs/validation/bench/v12_rev_confirm.out`): at a real 0.8-standard-deviation shift the first run passes 0.934
and both fail 0.0015 of the time — 0.06 false fallbacks expected over 40 such bars per table version — while under no pull
the final pass rate stays 0.0025.

**Pre-decided fallback** (the spec's default; a bar's owner may state its own): the family or pair weight behind the pull
doubles once — clamped to its column's declared range top, a value already at the top going straight to *not produced* —
a mechanism change recorded as a `fallback` run (V12 §3.7); the bar re-runs; still failing, the bar is reported *not
produced* and enters `known-defects.json` (§13.7). A fallback never moves an owner-stamped cell and never crosses an
owner-stamped minimum (V12 §3.7.2; J-V12.26).

**The statistics** (`StatSpec`, V12 §2.7): distances are along the way graph from a plot's access point, metres, built per
part (V12 §3.4.2); `meanDistTo` the members' mean distance to the nearest target (the target class's access points, a
market square's edge, a gate, a quay face; `water` and `wall` Euclidean to the nearest face); `shareWithin` the share
within `radiusM`; **`servedShare`** (item 103 (f)) the share of the subject class's coverage units holding ≥ 1 member, the
unit read from the class's compiled `profile.coverage` (V11 §2.3: `unit`, `per`) and each unit taken as V11 §2.3 defines it
at a plot: `district` — the plot's district, every district of the town, served when a member's plot lies in it; `parish` —
the cells of the parish partition V11 §2.3 derives (the Voronoi cells of the placed members of the classes counted as
churches, V11 §3.23.8's list, over residential land; one cell per district before any church stands), derived from the
town's churches as they stand and held fixed while the subject's members are permuted; `walk` — the residential plots
(those holding ≥ 1 household at S10a, §4.7), each served when a member's plot lies within the disc of radius `per` m about
it; `households` — the residential plots, each served when a member lies within the disc of radius √(`per` × a_res ÷ π)
about it, a_res its district's residential plot area per household; each disc counted as V11 §2.3 counts it (the 16 m
raster). Shares are unweighted counts of units. A church class whose unit is `parish` would be served in every cell by
construction, observed and permuted alike, so for it the unit is read in its `households` form with the same `per`
(J-V12.59). A spec with `unit: 'district'` reads the district unit whatever the class's row says — item 105 (k)'s
dispersal row (T-V11-18), which speaks of districts (J-V12.60); its `minHouseholds: 30` counts only districts of at least
thirty households, the one reading that filters (J-V12.86). `nnSameKind` is the median distance to the nearest other
member; `downstreamShare` the share of members whose `ContextVector.upstream` (§2.5) exceeds the household-weighted
median of the residential plots'; `downwindShare` the share whose `ContextVector.upwind` lies below that median;
`prestigeShare` item 71's prime-frontage share (T71-3); `flowOrder` the share of a chain's instances whose resource node
lies farther from the principal market than its final seller (item 104 (h) (8)); `chainSpread` the mean way distance
between the in-town nodes of a chain instance, the chain's other nodes held while one node's plot is permuted (item 104
(g)); `meanDistToPartners` a member's mean way distance to its bound link partners of the named role — the consumers of
its dominant output, its providers, its inputs' providers or its demand's consumers — read from item 105 (a)'s derived
links through the explain query at the bench level, the partners held while the member's plot is permuted.

**On a corpus map** the statistic runs in the spec's corpus `variant` — buildings carrying a `use`, the null drawing among
the map's buildings (`anyPlot`), Euclidean distances where the map has no way graph — and a corpus target row is compared
with OUR statistic in the same variant as a `geo` metric on our `MeasureInput`, never with the model statistic, so like is
compared with like (J-V12.51); `downstreamShare` and `downwindShare` need a context vector and are `notApplicable` there.

### 3.6b Share, sweep, paired and two-sample bars

`plat statbar <spec | all>` runs every `StatBarSpec` (V12 §2.7b) on towns of its levels under their presets, seeds from
`null/<spec>/…` for pooled rules and `sweep/<spec>/…` for ordered ones (V12 §2.4); instances come from the bench
statistics and the `void.*`, `link.*`, `ladder.members`, `crypt.*`, `catacomb.*`, `raised.*`, `water.*` and `wall.condition`
metrics (V12 §3.4.2). Towns are drawn in steps of 50 per level up to `seeds.max` until the rule's minimum is met; a bar
still short is `insufficient`, which gates as a fail naming the shortfall, so its owner adds a fixture level instead of
the bar passing on too little. A spec with `stopAfter` regenerates each town only up to that stage on the golden
tooling's stage isolation (§6.4; V12 §3.7.7), so a site-stage or raised-way bar never pays for a whole town. A level's
`site` override enters as a frozen S1 output through the same tooling — the relief class, the geology, the ore share, a
ravine across the frame, a climate row — and a forced ruin or cavern source, a population sweep or a landmark enters as a
fixture record of the frozen manifest (V12 §1b's dossier table) or a recipe declaration, so no test-only branch enters the
shipped generator (J-V12.35). **Levels that cannot run:** a level whose generator has not landed (`requires: 'V07'` for
THORP, HAMLET and VILLAGE until V-M4) and a population level outside the port's range [1 500, 120 000] (§12.2; item 108
(f)'s × 0.5 of a small TOWN or × 2 of a large METROPOLIS) are `notApplicable`, reported and skipped — never
`insufficient`, never a failure. **Indicators count bends, never refusals:** where an outcome of item 110 or of the sky
layer is a bend (J-VI.4), a bar counts the bend, each with its report line.

**Precedence (J-V12.48).** Where the owning volume states a bar's pass rule, seeds or tolerance, that statement wins and
the spec carries it as parameters (`most.share`, `rate.tolerance`, the `margin` and `holm` routes, the seed counts); the
rules below are the defaults. The unit a g item names binds the owner too: item 109 (j) (5) speaks of *voids*, so V04's
T-V4-54 is read per deep void.

The pass rules (calibration executed: `docs/validation/bench/v12_sweeprule.py` → `.out`, with instances independent;
`v12_rev_clustered.py` and `v12_rev_confirm.py` → `.out`, with instances of one town sharing a town effect; seeded, our
own code):

* **most** — the indicator pooled over the levels' instances; pass when the pooled share is at least `share` (default
  2/3; an owner's 0.70, 0.75 or 0.80) over at least `minEffective` (100) **effective** instances from at least 20 towns,
  **and** at least 70 % of the towns holding ≥ 3 instances have a share of at least 1/2 (the town clause; skipped when fewer
  than ten towns hold three). Effective instances are n ÷ (1 + (m̄ − 1) ρ̂): m̄ the mean instances per town and ρ̂ the
  one-way analysis-of-variance estimate of the intraclass correlation, clamped to [0, 1]; towns are drawn until the
  effective count reaches the minimum. Executed with independent instances: at 100 a true share of 0.75 passes 97 % of the
  time and 0.80 99.9 %, 0.60 9 % and 0.55 1 %; with a town effect of ρ = 0.3 and 1 – 8 instances per town, 0.55 passes
  0.9 %, 0.60 8 %, 0.75 97 % and 0.80 99.8 % on effective instances (`v12_rev_confirm.out` (B)). "Most" therefore means
  clearly most — the two thirds the owner's sittings use (§13.6 (6)) — and a handful of towns with many instances cannot
  carry the bar (J-V12.28, J-V12.50).
* **floor** — over deep voids (connected components, so one access that opens a whole system counts once), at most the
  first three per town in id order, at least `minEffective` (100) effective units from at least 20 towns: pass unless the
  deflated count (y ÷ deff of n ÷ deff, deff the design effect above) would have a one-sided exact binomial probability
  below 0.01 were the true share exactly the floor. Executed at a floor of 0.50 with 50 towns, 1 – 3 deep voids each and
  ρ = 0.3: a true share at the floor fails 0.9 % of the time, 0.45 fails 6.8 %, 0.40 26 %, 0.35 57 %, 0.30 87 %; with 70
  towns 0.9 %, 8.9 %, 37 %, 76 %, 96 % (`v12_rev_clustered.out`). The floor is a bound the owner's rule sets (item 109 (j)
  (5)); a design whose expected share sits on it is the designer's error, so the rule is lenient at the floor and strict
  below it.
* **rate** — pass when the two-sided exact binomial p against the expected value is at least 0.01, over at least 200
  instances (`tolerance.kind 'exact'`), or when the observed rate lies within k standard errors of it (`'se'`, V04's
  ± 3 s.e.). Executed for the exact form: a right rate fails 0.7 – 0.8 %; a rate off by half fails 84 % at 100 units and
  99.5 % at 200, off by a third 35 % and 75 %. The expected value is a cell or a **derived value** from a named pure
  function of `@plat/testkit/expected` over the tables at the running version: `ruinShare(tables)` = w_ruin ÷ (w_ruin +
  w_cavern) of V11's void-source rank weights, exact on the fixture forcing one qualifying ruin and one qualifying cavern
  per undercity (V04's T-V4-58); `cavernChance(tables, level)` = min(cap, chance(relief, geology) × (mining ? boost : 1))
  from the S1 relief and geology rows (registry row 9, item 109 (a)) and `under.systems`' cavern row (row 59: the mining
  boost and its cap), V11's `miningCellShare` deciding whether the site holds mining (V11 §3.23.1), the level's site
  fixing relief, geology and mining; `waterChance(tables, level, kind)` = the level's climate row's P(kind) from S0's
  feature table (§4.2 S0: P(river), P(lake), P(coast), P(oasis) with its no-other-water factor), the level fixing the
  climate row and the rung.
* **presence** — at each level N = min(500, ⌈5 ÷ p⌉) towns, p the design chance there (a cell or `cavernChance`); pass when
  every level holds at least one instance. P(none at a level) ≤ 0.0066 for p ≥ 0.01 (executed); a level whose chance is
  below 0.01 runs on its fixture site with the source forced, so p is the forced chance. At p = 0.02, N = 250.
* **trend** — levels in order; the Cochran–Armitage trend z (scores 0 … L − 1) at least 2.326 (one-sided α 0.01), and no
  reversal: no adjacent pair whose adjusted rates (y + 0.5) ÷ (n + 1) fall by more than two standard errors. With `bins`,
  the units are pooled across the levels and binned (buildings over a void: 0, 1–2, 3–5, 6–10, 11–20, 21 and more); a bin
  under 20 units merges into the next lower bin. Executed: item 109 (a)'s relief rows (cavern rates 0.07, 0.148, 0.23,
  0.375 under an independence approximation) pass 95 % at 50 towns per level and 100 % at 100; no effect passes 1.05 % to
  1.25 %; a real trend with one flat step 85 % at 100 per level; access against buildings over, at two sets of dig and
  opening rows, at least 99 % at 20 voids per bin, and no effect 0.85 %. Defaults: 50 towns per level, 20 units per bin.
* **higherWith** — per stratum `perCell` towns with the factor on and off; the Cochran–Mantel–Haenszel z at least 2.326
  and no stratum where the with-rate falls below the without-rate by more than two standard errors; with an indicator per
  instance (a household), each stratum's counts are first deflated by its design effect (as `most`'s effective instances).
  Executed: the mining boost (1.4, capped 0.9) passes 96 % at 200 towns per cell, 70 % at 100, 38 % at 50; no boost 1.2 %.
  Default 200 per cell — cheap, since a cavern's existence is settled at the site stage (S1 and II.7.6's existence draw;
  `stopAfter`). The mining factor at the site stage is `SiteResources.ore` or the dossier's mining deposits (DR31); the
  roster's mining class, drawn later, is V04's conformance bar.
* **exactMonotone** — a property, no statistics: per fixture and per record (`identity: 'record'` — a `CatacombComplex` by
  its id, which keeps its source lineage across derivations, V04 §3.5.1; a collective record by its id), the quantity at
  each step at least its value at the step before, and every record present at a step present at the next; 0 violations.
  The sequence is `levels` (a population sweep on one seed, `sweep/<spec>/any/<i>`) or a **step script** run by the step
  runner on the fixture document — `epoch` (V06's engine), `regenerate`, `{ rederive: S1 }` and `{ rederive: <the
  underground stage> }`, `{ newRandom: 'system' }` on the catacomb system, `upgradeReplay` across an output version (§7.5),
  `{ dossierEvent: 'burial' }`, `extendGrowth`, `{ week }` (item 117's year position, set as V09's season control sets
  it: a look, the model untouched) — the base's own events, commands and view actions, never a test-only path. Author edits
  never appear in its scripts: the ratchet binds derivations, not the author (J-V4.56). With `where: 'stagnant'` (the
  `fill` form) a step counts only where the record's `blockedBy` is non-empty and its extent held. The runner also runs
  each fixture's **author-delete probe**: deleting n grid nodes lowers `extentFloorM2` by exactly their area, and no later
  step re-digs a tombstoned node.
* **exactBound** — per record and step, `catacomb.growthM2` ≤ its cap `max(extent × ((1 + growthCapShare)^years − 1),
  growthFloorM2)` (J-V6.53); 0 violations.
* **exactScript** — a named property (`ScriptProperty`, V12 §2.7b) checked by the same step runner at every step of a
  script that may hold author steps (`AuthorStep`: an item-101 event on a fixture address, applied through §7.1's events
  as a user would), since these properties bind the author's acts too (item 113 (e): a cellar filled; item 114 (f): a
  repair); 0 violations, each reported with the record, the step and both values (V12 §3.15). A script of `{ week }`
  steps alone checks a look week by week (item 117 (i): `noIceSnow`, `iceOrder`, `seasonStyles`; V12 §3.15.7).
* **paired** — per seed holding a ruin, the ruin's laid plan against the town above inside its outline on three measures:
  `ruin.blockArea` against `block.area` (differs at a ratio of 1.5 either way), `grid.r4` (|ΔR| ≥ 0.15) and `grid.axis`
  (folded axes ≥ 10° apart; skipped for a ruin that took the shared-axis chance). Pass when each measure differs in at
  least 70 % of the seeds where it applies and every seed differs on at least min(2, applicable) measures — item 109 (c)'s
  "never a copy of the streets overhead". The thresholds are §13.7 rows (item 501); the ancient-culture rows that must
  clear them are V11's, the plan V04's. A ruin's stepped monument is never read by these measures (V12 §2.2).
* **twoSample** — ruin systems against cavern systems on `plan.rightAngle` and `plan.straight`: pass when, on each metric,
  the median over ruins exceeds the 90th percentile (type 7) over caverns, each side at least 30 systems.
* **noRegression** — the same seeds in two arms, the reference arm with the `off` overlay applied, each cell at its named
  off value (common random numbers); pass when |median over towns of (default − reference)| is within the tolerance (a
  share: 0.05, a §13.7 row).

**Degenerate inputs.** A void component of zero area is no void; a ruin outline too small to hold 20 steps of 10 m makes
`grid.*` `notApplicable` and a gallery graph with no face makes `ruin.blockArea` `notApplicable`, so the seed counts for
the other measures only; coincident galleries merge by the 2 m node rule.

**The confirmation stage** applies to every statistical rule here (`most`, `floor`, `rate`, `presence`, `trend`,
`higherWith`, `paired`, `twoSample`, `noRegression`) as to V12 §3.6: a failing bar is `suspect` and re-runs once on a fresh
family (`…/c1/…`) at twice the towns; only a second failure is `fail`. The properties (`exactMonotone`, `exactBound`,
`exactScript`) are exact and need none.

**The bar map** — §13.2's tendency bars, their owners registering the specs with these rules and their stated
parameters; the conformance clauses of the same items stay their owners' checks (V12 §1):

| g bar | rule | indicator or statistic | levels and counts | owner's bar (its parameters win) |
|---|---|---|---|---|
| 103 (e): a nuisance's sensitive members farther from its emitters than random | null, `holm` family T-V11-12 | `meanDistTo` (median) from sensitive-≥ 2 members to the nearest emitter of level ≥ 3, `higher` | B-CITY, 200 towns per rung | V11 T-V11-12 |
| 103 (e): tanneries downstream | null, `holm` family T-V11-12 (pooled exact); and most | `downstreamShare` of tanneries; per river town the tanneries' downstream share | B-CITY river towns, 200 per rung; most at 0.80 of towns | V11 T-V11-12 |
| 103 (e): the thieves' den farther from the law than random | null, `holm` family T-V11-12 | `meanDistTo` the nearest law member, `higher` | B-CITY, 200 per rung | V11 T-V11-12 |
| 103 (e): shops nearer the market than random | null, `holm` family T-V11-12 | `meanDistTo` the nearest market edge, `lower` | B-CITY, 200 per rung | V11 T-V11-12 |
| 103 (f): a coverage class's served share above random | null, `margin` 0.1 | `servedShare` per coverage class on its own compiled unit (a `settlement`-unit class `notApplicable`), scope `town` | B-CITY, 200 per rung | V11 T-V11-13 |
| 104 (g), 104 (h) (8): a chain's nodes closer than random | null, rank | `chainSpread`, `lower` | CITY and TOWN custom-chain fixtures (V08's), 50 towns each | V11 T-V11-16 |
| 104 (h) (8): the flow order holds in most placements | most at 0.75 | `flowOrder` | as above, ≥ 100 effective chain instances | V11 T-V11-16 |
| 104 (h) (8): a compatible chain's in-town nodes within their links' comfortable distances in most placements | most | `withinComfort` over those links | as above | base T104-3 (its comfortable-distance clause; the spec's `ownerBar`) |
| 105 (k): a multi-output producer nearer its dominant output's consumers; a shared provider's consumers nearer it; source-oriented nearer inputs, market-oriented nearer demand — each than random | null, rank | `meanDistToPartners` by role | B-CITY CITY, 200 towns | V11 T-V11-14 |
| 105 (k): the share of districts holding a dispersed class within tolerance of the base's | noRegression, tolerance 0.05 | `servedShare`, `unit: 'district'`, `minHouseholds: 30`, per dispersed class; `off` = V11 §3.7.4's web off form | CITY and METROPOLIS, 50 towns each | V11 T-V11-18 |
| 106 (h) | none: fixtures; the enclosure (V12 §2.2) makes their measurements well defined, `wall.barrierShare` reported | — | — | V11 T-V11-19 |
| 107 (g): a coverage class's served share above random with the web on; a spaced class's nearest-member distance above random | null, rank (scope `town`) | `servedShare` per coverage class on its own unit; `nnSameKind` | B-CITY CITY and METROPOLIS, 50 each | base T107-1 (the `servedShare` specs' `ownerBar`), T107-2 (the `nnSameKind` spec's) |
| 107 (g): consumer-to-provider distance within `comfortM` in most placements | most at 0.70 | `withinComfort` over every link | B-CITY CITY, ≥ 100 effective links from ≥ 20 towns | V11 T-V11-14 |
| 108 (f): members rising monotonically across a population sweep | exactMonotone, `levels` | `ladder.members` per COUNT, QUARTER and GUILD record | the surveyed-dossier fixtures at population × 0.5, 0.75, 1, 1.5, 2 (outside [1 500, 120 000]: `notApplicable`) | V11 T-V11-17 |
| 109 (c), (i): a ruin differs from the town above | paired | the three measures | CITY on a fixture site with a forced ruin source, 50 seeds | V04 T-V4-45; V06 T-V6-37 |
| 109 (i): ruin plans beat the cavern baseline on structure | twoSample | `plan.rightAngle`, `plan.straight` | the ruins above; caverns at CITY on a soluble mountainous fixture site; ≥ 30 systems each | V04 T-V4-44 |
| 109 (a), (i): cavern frequency rises with relief | trend, `stopAfter` S1 | `present` cavern | plain, rolling, hilly, mountainous; 50 towns per level | V04 T-V4-55 |
| 109 (a): higher with mining than without, per relief class | higherWith, `stopAfter` S1 | `present` cavern | four relief strata × mining on and off; 200 per cell | V04 T-V4-55 |
| 109 (i): an undercity takes a ruin over a cavern at the ranked share | rate, `se` 3 | `ruinChosen` against `ruinShare` | CITY and METROPOLIS with one ruin and one cavern forced, ≥ 200 undercities | V04 T-V4-58 |
| 109 (j) (1): caverns and ruins at every rung | rate, `se` 3, 500 per rung | `present` cavern against `cavernChance`; `present` ruin against the forced source's chance | THORP … METROPOLIS on forced-geology and forced-source sites; the village rungs `notApplicable` until V-M4 | V04 T-V4-43; V06 T-V6-37 |
| 109 (j) (5): the access share rises with buildings over the void | trend with bins | `voidAccessible` | a forced-void fixture site, 40 towns per rung TOWN … METROPOLIS (the village rungs from V-M4); once V06 lands, H-VOID's growth epochs join as units | V04 T-V4-49; V06 T-V6-34 |
| 109 (j) (5): depth keeps secrets | floor | `voidSealedDeep` per deep void against `DigRule.sealedFloor` | METROPOLIS on a forced deep-void fixture site, ≥ 100 effective deep voids from ≥ 20 towns, ≤ 3 per town | V04 T-V4-54 (read per void); V06 T-V6-36 |
| 109 (k) (6): a catacomb's extent never shrinks, on every derivation | exactMonotone, `identity: 'record'` | `catacomb.extentM2` per complex | every epoch of H-100, V06's 50 random trajectories and H-METRO; the step script on the surveyed-dossier catacomb fixtures; the author-delete probe | V04 T-V4-51; V06 T-V6-38 |
| 109 (k) (5), (6): a stagnant catacomb's fill rises while its extent holds | exactMonotone, `where: 'stagnant'` | `catacomb.fill` per complex | V06's stagnant and rank-held fixtures; H-100 | V04 T-V4-52; V06 T-V6-39 |
| 109 (k) (6): growth per epoch within the cap | exactBound | `catacomb.growthM2` per complex and step | as the extent row | V04 T-V4-52; V06 T-V6-39 |
| 109 (k) (6): at most one catacomb at TOWN; the CITY and METROPOLIS counts within the bound; the largest under the largest cemetery; every catacomb under a cemetery or a CITY or METROPOLIS quarry ossuary, none under a church; the cathedral always crypted, with the largest crypt | none: conformance; `catacomb.count`, `catacomb.source`, `catacomb.rank`, `crypt.*` reported | — | — | V04 T-V4-50; V06 T-V6-40 (a), (c) as the epoch forms; V11 T-V11-25 |
| 110 (f) | none: conformance; `retaining.onFlatM`, `raised.junctions`, `raised.generatedBelowCity`, `raised.reasonMissing`, `raised.overCap` reported | — | — | §13.2 T110-1 – T110-7 |
| 110 (b): a viaduct where a route's best course crosses a deep ravine | presence, `stopAfter` the raised-way stage | `raised` viaduct, `generated` | CITY and METROPOLIS on the ravine fixture site; N by the rule | base (`T110b.viaduct`) |
| 110 (b): an aqueduct where the water need exceeds the walled supply and a higher source lies in reach | presence, `stopAfter` the raised-way stage | `raised` aqueduct, `generated` | CITY and METROPOLIS on the spring fixture site | base (`T110b.aqueduct`) |
| 110 (b): an elevated road likelier with prosperity | trend, `stopAfter` the elevated-road stage | `raised` elevated, `generated` | CITY on the two-high-wards site at `intent.wealthLevel` 0.1, 0.3, 0.5, 0.7, 0.9; 100 towns per level | base (`T110b.elevated.prosperity`) |
| 110 (b): an elevated road likelier with dossier landmarks on high ground | higherWith, `stopAfter` the elevated-road stage | `raised` elevated, `generated` | CITY on the same site; the fixture dossier with and without a high-ground landmark (DR35); 200 per cell | base (`T110b.elevated.landmarks`) |
| 111 (d): on arid seeds more households within walking distance of water than the non-arid baseline | higherWith (per household, deflated) | `walkToWater`; factor the climate row, arid against temperate | TOWN, CITY and METROPOLIS strata; 200 towns per cell; the village rungs from V-M4 | base T111-1 (`T111d.walk`) |
| 111 (d): arid sites still draw rivers, lakes and coasts at the arid row's chances | rate, `exact`, `stopAfter` S1 | `water` river, lake, coast each against `waterChance` | the arid climate row at TOWN, CITY and METROPOLIS, ≥ 200 towns per kind and rung | base T111-3 (`T111d.water.<kind>`) |
| 111 (d): the richest band nearer water than the middle band on arid seeds | most (per town) | `richNearerWater` | arid TOWN, CITY and METROPOLIS; ≥ 100 towns from ≥ 20 per rung | base T111-4 (`T111d.rich`) |

**The raised-way bars (J-V12.44).** Only two clauses of item 110 (b) are leanings — the elevated road's "likelier with
prosperity and with dossier landmarks on high ground"; "no reason, no raised way", the rung gate and the cap are
conformance (V12 §1) and guards (V12 §3.7.4), and an "off" arm of a viaduct or aqueduct would measure that conformance,
never a tendency. So:
* **`T110b.viaduct`** runs `presence` on a forcing site: a frozen S1 output whose ravine runs across the whole frame, so
  every primary's best course crosses it deeper than `viaduct.minDropM` and the detour costs more than the span for every
  value of the span cost row's range — p is then the table chance at the rung, and a cheap detour cannot pull the rate
  below it. Registration checks this on the frozen site (the route solver's costs at the row's range ends) and refuses a
  site where a detour could win.
* **`T110b.aqueduct`** runs `presence` on a site whose frozen S1 output and roster give a water need above the walled
  supply and one higher spring in reach, the era and culture rows neutral.
* **`T110b.elevated.prosperity`** runs `trend` over the settlement's prosperity input `intent.wealthLevel` (§7.7; DR6 is
  the dossier's route to it) on a site with exactly two high wards and one lower district between them, so there is one
  candidate and the cap never binds.
* **`T110b.elevated.landmarks`** runs `higherWith` on the same site, the factor the fixture dossier's landmark on high
  ground at one end of the candidate link (V11 §3.24.2's `elevated.landmarkFactor`, read by V11 §3.24.7 (4)'s high-ground
  test) against the same dossier without it, traced through DR35; the chances and factors it and the prosperity trend
  read are V11 §3.24.2's (`elevated.bandFactor` by band, poor 0).

Their fallback is the default below bounded by the owner's floor (V12 §3.7.2): a presence bar still failing with its
chance at the floor is *not produced*, and generation is never switched off.

**Pre-decided fallback** (the default; a bar's owner may state its own): as V12 §3.6's — after a confirmed failure, the
row that drives the tendency moves once (a weight doubles; a chance's odds double within its column's range; a mechanism
threshold takes its volume's stated second value), clamped to the column's range and never across an owner-stamped cell
or minimum, as a declared `fallback` run (V12 §3.7), and the bar re-runs; still failing, it is reported *not produced* in
`known-defects.json` (§13.7). A bar never passes by relaxing its rule (J-V12.26).

### 3.7 Tuning runs — table-version bumps with declared shifts

**3.7.1 When a run opens.** (a) A P row fails its band at a milestone's parity run and its row names a tuning route
(§13.5's street-turning fallback sets `headingSigma` so the organic median equals FTG's); (b) a register entry's
confirming measurement fails and its fallback moves a table value (a `fallback` run: §1.1's doubled rung modifiers,
§13.7's O18 (j) frontage CV, item 24's market-siting weights, item 30's reach weights, item 71's prestige weight); (c) a
volume's calibrate-later constant falls due as an entry of `method: 'tune'` — V02 §3.10.8's measured-rate `FM` entries at
M6c, and V07's one measured-rate `VG` entry, `rules.race.densityPower@VG` (V07 §2.2a, V07 §3.15), at V-M4, opened there
only when T-V7-23's accepted-share row misses its band (every other `VG` entry is code-read or `fixed:` and never a run's
cell) — each a `reference` run on the preset's own entry (V12 §3.7.2 (3)); item 34's depth rows and `cut.flattenM` at M0
as `reference` runs on the bent-cut spike's S8 harness, the first product code that reads them (at M-1 no product exists,
so there the NG and MFCG distributions only cross as `Baseline` rows); (d) the corpus stage (V12 §3.10). The calibration
seat (implementer tier: it reads only `plat/`) writes the run's spec to `plat/calibration/specs/<id>.json` — id, cells with
bounds and step, targets, guards, search, settings — and commits it before the first evaluation, so the objective is fixed
before any result is seen (J-V12.10).

**3.7.2 What a run may touch.** A spec is refused before any evaluation (`status: 'refused'`, naming the rule) unless every
cell: (1) is `calibratable: true` in the registry (V11 §2.1); (2) has a provenance source other than `owner`, `owner-eye`
(an owner pick moves only by the owner, V12 §3.9), `corpus` (the palette targets, V12 §3.10.7), `host` and `sf:⟨file⟩@⟨baseline⟩`
(V11 §2.2, file f item 534: the owner's own program's rows pinned to the port's baseline, the ladder table among them,
item 108 (a), which move only when that baseline moves), and carries no `ownerRule` stamp (V12 §2.10); item 110 (b)'s rung
gate ("a TOWN gets them only by declaration") is no cell at all — V11's `raisedWays` key admits only CITY and METROPOLIS
rows (provenance `owner`, V11 §3.24.2), so no run can open a TOWN chance, and an `editTable` or a pack adding one is
refused by V11's schema; (3) is a default value, never a `presets.MFCG` or `presets.FTG` entry; a `presets.FM`,
`presets.VG` or `presets.NG` entry only when a register entry names it (V12 §2.6's `preset` target), and then only by a
`reference` run against that preset's own reference (`layer: { preset }`: V02 §3.10.8's free-frame run against Fantasy
Manor at M6c; V07's one run against VG at V-M4, on `rules.race.densityPower@VG` alone) or by a `fallback` run applying that
entry's own pre-decided fallback (V02 §3.10.8's `hipInset` 0.5; for the `VG` entry none — its fallback is `not-achieved`,
V07 §3.15, so a rejected `VG` run leaves the entry at its value, reported to the owner), either run touching no default
value and no other preset's entry; a preset entry no register entry names — one read from its reference's code
(`ref:… (code)`, V02 §3.10.8's layout families) or an off value with a `fixed:` note (V11 §2.2) — is never a run's cell;
every `presets.NG` entry is a code-read value or a switch's on value (V01 §3.15; J-V1.98), so no `NG` run exists; the MFCG
and FTG presets' reference values are never tuned (J-V12.11); (4) lies in a table whose registry `readers` StageIds (
V11 §2.1; the dist manifest's `stageReaders` — a module id never counts) include a stage in the target metrics' `stages`, so
no run reaches for an unrelated knob; (5) keeps `lo`, `hi` inside its column's declared `range` and at or above the
column's owner-stamped calibration minimum where it has one (the CITY and METROPOLIS raised-way chances and caps,
`ownerRule: '110 (b)'`, their values V11 §3.24.2's), so the owner's "raised ways for cities is fair for the generator to
generate" can never be tuned, fallen back or reconciled to zero (J-V12.42) — a minimum binds runs, fallbacks and corpus
packs, never the parity presets' extension zeros (item 23), a no-op pin's overlay (V12 §3.7.8) or a user's own override;
and (6) no other open run holds it (the second waits for the first to close). At most four cells per run. A fallback's
doubled or halved value is clamped the same way: to its column's range and never across an owner-stamped minimum.

**3.7.3 The search.** `grid` evaluates every listed candidate (≤ 16). `golden` searches one cell on [lo, hi] by
golden-section, every probe snapped to `step`, the endpoints evaluated first, stopping after `maxIter` (≤ 12) probes or when
the bracket is under two steps (at once when [lo, hi] spans under two steps: the endpoints alone). `coordinate` runs
`golden` on each cell in the spec's order holding the others, for ≤ 3 rounds, stopping after a round in which no cell
moved by a step. No gradient method: the objective is a statistic of generated towns, noisy and stepwise.

**3.7.4 The objective and its guards.** Each candidate generates the train family `tune/<id>/train/<rung>/<water>/<i>`,
30 towns per setting — the same seeds for every candidate (common random numbers), so candidates differ by their values,
not their towns. Score = Σ wₜ dₜ² + 10 × (guard flips), where for a target scalar row dₜ = (ours − (lo + hi) ÷ 2) ÷
((hi − lo) ÷ 2) with V12 §3.5.2's band, for a weakness row dₜ = max(0, (bound − ours) ÷ margin) on the failing side, and
for a distribution row dₜ = ours ÷ (1.25 × the reference spread). A **guard flip** is any row passing in `before` on the
train seeds that fails with the candidate: every §13.5 row on those settings under its preset, the C bars of §13.2 that
run on those towns, and every owner-rule bar (the owner's rules outrank parity: a run never buys a parity number with an
owner rule). **The TOWN guard:** a run any of whose cells is a raised-way row (a chance, a cap, `viaduct.minDropM`, the
span cost) adds one TOWN setting to every candidate's evaluation — 30 towns on `tune/<id>/guard/TOWN/<water>/<i>` — where
`raised.generatedBelowCity`, `raised.reasonMissing` and `raised.overCap` are C bars that must stay 0 and a moved TOWN S4 or S5a – S5d
isolated digest is a guard flip (J-V12.42). Ties go to the candidate nearest `from` in steps, then to the lower value.

**3.7.5 Holdout and acceptance.** The chosen values run on the holdout family `tune/<id>/holdout/…` (30 per setting, never
seen by the search), and once on the guard's **fixture suites**: B-DOSSIER-lite's generations with their dossier-primacy
bars (T73-1 – T73-10, T85-1 – T85-2, T20-13, T88 on B-DOSSIER-lite, §13.8), the owner-rule hook fixtures (T20-7 – T20-13,
T63 – T72, T76-1 and the owner items' fixture bars) and the two known-city fixtures' structure lists (V12 §3.14) — about
2 – 3 CPU-min. Calibration never *targets* a dossier fixture but always *guards* it (V12 §1b). The run is **accepted** when
every target row passes its band on the holdout, no guard flips there and no fixture-suite bar that passed before fails;
otherwise **rejected** (`guardFlips` naming the bar), the cells stay at `from`, and the register entry's pre-decided
fallback applies — if that fallback moves the threshold instead of a mechanism, the entry becomes `not-achieved` (§13.7).
A run whose best candidate is `from` itself closes rejected ("already at its best"). A run that exceeds `budgetCpuH`
stops `aborted-budget`, applying nothing; it may be re-specified once with a narrower bracket.

**3.7.6 Emission.** An accepted run is released as one declared shift:
1. The seat writes the chosen values into the table's source (V11 §2.2) — into the cell's `presets.FM` or `presets.VG`
   entry for a `layer: { preset }` cell, the default untouched — with provenance `ref:<reference> <behaviour>` (a reference
   run: the behaviour matched is the anchor, §17.1 (6)), `own` (a fallback run) or `corpus` (V12 §3.10), and `evidence` =
   the target rows' baseline ids and the run id (V12 §2.10).
2. `plat tables compile` bumps the table's minor version (V11 §2.1: minor = a declared output shift).
3. The golden tooling computes the stage-isolated digests (§6.4); every stage whose digest moved gets a `ShiftRecord` with
   cause `{ kind: 'calibration', ref: <run id> }`, its statistics the targets with the direction ours moved on the train
   seeds, its `d5SeedsChanged` listed; downstream stages get cascade records (§13.3).
4. The release carries the output-version bump (§6.4); existing documents replay under their own versions.
5. The register entry gains the run in its history (a cells row where the run changed the entry's target in place) and its
   new status; the release notes gain the metric's `plain` sentence ("lanes now bend {dir}: {ours} per 100 m, FTG's band
   {band}").
6. The first nightly after the release re-runs B-REF on the `bref` seeds and writes `after` into the run record; a target
   that passes on the holdout and fails on `bref` enters `known-defects.json` and opens one follow-up run.

**Feature switch-on (J-V12.54).** Item 110's four families ship switched off and are switched on by four releases,
upstream first. Each registers its family's row sets in the default pinned table set for the first time — before it, every
document reads V11 §3.24.0's parity-neutral default, which is off (J-V11.12) — and ships its own `ShiftRecord`s and
cascades of cause `{ kind: 'feature', ref: 'item 110 (b)' | 'item 110 (a)' | 'item 110 (d)' | 'item 110 (c)' }` (§13.3's
`feature` kind), so every shift names the one rule that moved it:
1. the `raisedWays` row set — S4, S5a – S5d and the stage that commits elevated roads. The isolated S4 and S5 digests of
   every THORP – TOWN golden stay unchanged: a moved one fails CI and is not a declared shift. Its records name every CITY
   and METROPOLIS golden where a reason arises (`raised.count` by kind, expected `up` there and `none` at TOWN) and, where
   they move, V05's two sky goldens, V06's H-100, K1 and K2, and the B-DOSSIER-lite towns carrying the water-system record
   (its met need, cap step and cistern terminal, V11 §3.24.7 (3)).
2. the `terrace` and `retaining` row sets — S10 and S11's levelling and the district-edge source.
3. the `deck` and `deck.landmarks` row sets — S10's deck faces and deck plots; K1's golden moves here (its bridge's deck
   plots, V12 §3.14).
4. `roster.specialisations` — reachable only through the stepped class rows, so it moves only goldens holding such a class.

Every bump leaves the `MFCG`, `FTG` and `FM` presets' goldens byte-identical (V12 §3.4.4). An owner item whose rows land
after its suites' first goldens (items 111's water pull at M2b, 113's replay at M6-E, 114's drivers, 115's ceiling table)
ships the same way, one `feature` cause naming the item; an item whose code lands with its suites' first goldens needs no
bump. Items 117, 118, 120 and 122 move no model digest: their releases shift only render goldens drawn at a non-default
week or festival, with a Find chip on or with a crisis look standing, as declared view shifts (§13.3); item 123 moves no
model digest and shifts only the drawings of buildings that are or were abandoned, decayed or ruined (`item123.damage`
holding every other), declared the same way; items 121, 124, 125 and 126 shift no golden — device state, a layer in no
tile and no export, an input that never reaches the document, the window (their pins, V12 §2.13). The release notes (V12 §5.5) carry one plain line of new behaviour per bump —
for the first: "cities may now build viaducts, raised roads and aqueducts where the ground or the water calls for them;
you can remove any".

**3.7.7 The cost shortcut.** A candidate's towns are regenerated from the first reader stage of the cells' tables only
(the registry's `readers` StageIds; a cell only an epoch phase reads re-runs the history from that phase), on frozen
upstream outputs per seed — the golden tooling's stage isolation (§6.4) — which is exact because no upstream stage reads
the cell. A cell read at S0 – S2 regenerates the whole town.

**3.7.8 No-op pins — one engine for every owner item's pin (J-V12.43; E-20).** Each owner item's "with its rows off,
byte-identical to the base" bar is a `NoOpPin` registration on this engine (V12 §2.13's set; §13.2's convention (5)), and
each volume pin that restates one registers its suites here and cites it, on the pin V12 §2.13 lists it under: V01's
T-V1-4 (e); V02's T-V2-50, T-V2-58 (f), T-V2-59 (d) and T-V2-60 (c); V03's T-V3-34, T-V3-39 (g) and T-V3-40 (f); V04's T-V4-47, T-V4-69, T-V4-77 (d) and T-V4-82 (g); V05's T-V5-15, T-V5-19 (c), T-V5-22 (b)
and (k), T-V5-27, T-V5-33's item-111 clause and T-V5-34 – T-V5-36; V06's T-V6-12 (its `w_sun` clause), T-V6-44, T-V6-65 and T-V6-71 –
T-V6-74; V07's pins by its §7 rule (T-V7-33, T-V7-38, T-V7-52, T-V7-58, T-V7-59, T-V7-62, T-V7-63,
T-V7-65, T-V7-66, T-V7-68); V08's
T-V8-50, T-V8-53, T-V8-59 and T-V8-61 (b); V09's T-V9-57; V10's T-V10-43 and T-V10-45; V11's T-V11-13, T-V11-19, T-V11-21, T-V11-31 and
T-V11-38 (b) – T-V11-41 (b).
V02's T-V2-37 and V10's T-V10-10 are unit properties of one cell and register none.
1. **"Off" is stated once**: V11 §3.24.0's switch table for item 110 (one named off form per row set: `terrace`,
   `raisedWays`, `deck`, `roster.specialisations`, `deck.landmarks`, and V03's `roomProgram` `exposureAllStoreys`) and
   its rows for items 111, 113, 114 and 115 (the
   `climate` dry cells, `history.replay`, `walls.condition`, `grandeur.ceiling`), V11 §3.7.4's web off form for items 105
   and 107, the cells the owner bar names otherwise (items 102, 103, 106 and 109); each off value lies inside its column's range, never an out-of-range sentinel, and
   is the same form the table's parity-neutral default and the parity presets resolve where they resolve it. The owner-stamped
   minima bind calibration, not a pin's overlay (J-V12.56). A pin's overlay sets its item's off values; the cells stay
   editable like any cell (everything is editable).
2. **The landing gate.** Every commit that lands an item's code before its switch-on produces zero `ShiftRecord`s on the
   pin's suites: the code is present and inert.
3. **After switch-on.** The off-state digests are recorded as a parallel golden set under the overlay
   (`plat/goldens/noop/<id>/o<k>/`) at the item's switch-on bump, or when the pin registers for an item that lands with its
   suites' first goldens. CI runs the suites under the overlay nightly, and in the PR tier on the two PR golden seeds, and
   requires byte-identity with the set. A change whose cause is the pin's item may never move the off-state set; a declared
   shift of any other cause re-records it, and its record must list, per stage, the same moved stages as the main set shows
   for the towns that hold none of the item's entities — so a leak into the off state is caught even across unrelated
   shifts, and the set never goes stale at the first unrelated change.
4. **The code properties, asserted by name.** An item's draws come only from its own stream labels (§6.1); an entity kind
   with no instance is absent from the document and from its digest, never serialised as an empty array; no arena part is
   allocated for an absent raised way; an older record gains no written default — the reader supplies it.
5. **The other kinds.** A `rungScope` pin (item 115's `item115.ceiling`, beside its `offForm` pin `item115.off`) requires
   its rungs' suites byte-identical across the item's bump, its record naming only the other rungs' seeds. A `view` pin
   (items 117, 118, 120, 121, 122, 124 and 126) opens each suite document at every listed value — of a view key, a device
   setting or the window's size — and requires one model digest (§6.2) and identical saved bytes, the edit log included,
   at all of them; with `tiles`, the tiles drawn with the view off — no festival; Find cleared after its chips were on; no
   condition standing and no preview — equal the pre-item tile goldens (§13.4); with `exports`, every picture, print and
   battle-map export is byte-identical at every value; with `cache`, the tile cache's raster and composition counts stand
   unchanged from the first value through the last; with `session`, the values are stepped through in order in one open
   session and the view key and the selection are byte-identical at every step too. An `entityScope` pin (item 123's `item123.damage`) requires every entity its `entities` selects — a building
   whose lineage never held `abandoned`, `decayed` or `ruined` — drawn and exported byte-identically to its off-state set
   at every band and every week of its suites, the set recorded by (3) from the drawings its suites' goldens held before
   the item's code landed, or at the landing where those drawings land with it; its record names only the other
   entities. An `input` pin (item 125's `item125.host`) generates each suite dossier under each listed value of its input
   — no host context, and each fixture `HostContext` — and requires one model digest and identical saved bytes at all
   of them.
6. **Tested** by T-V12-37: a planted draw on a shared stream fails the pin, a planted empty array fails it, an unrelated
   planted table shift re-records both sets with matching stage lists, a planted season-dependent model write fails the
   season pin, a planted chip-dependent model write or log entry fails the Find pin, a planted TOWN change fails the
   rung pin, a planted Resolution-dependent export byte fails `item121.display`, a planted look drawn with no condition
   and no preview fails `item122.crises`' tiles, a planted damaged element on a never-decayed building fails
   `item123.damage`, a planted tile re-raster during a spell fails `item124.effects`' cache clause, a planted
   `HostContext` field read into the document fails `item125.host`, and a planted view-key change on a resize below
   600 × 480 fails `item126.resize`.

### 3.8 Reference drift

`research/baselines/watch.py` runs at each milestone's start and weekly: it resolves each web reference's live build (the
itch build of MFCG, NG, VG and Fantasy Manor through the profiler's target resolver; FTG's server version as the capture
date and create-request hash) and appends a line to `research/baselines/drift.md` — "no change" when nothing moved. On a
change, the pin stays; the capture plan runs its same formulas on the new build and the rows are added under the new
build, reported beside the pinned rows and gating nothing. **At the next milestone boundary the pin moves to the newer
build** — we compare with the product the owner can see — by the baseline seat, as a `ShiftRecord` with cause
`baselineShift` that lists every row whose verdict flips; the old rows stay as history (J-V12.13). A change on one seed
only (VG's geometry for one seed between builds 19251041 and 19365073, §13.5) follows the same rule. FTG cannot be seeded
and changes on its server silently: its pin is a capture-date range, and when two of a size's three new captures fall
outside the pinned rows' spread on the same metric, the next boundary opens a new pin (J-V12.25). Drift never touches a
document: a pin move changes which baseline rows gate, never a saved town; a pin moved back is a new declared shift. A
reference build that disappears from its host freezes its pin on the last captured build, recorded in `drift.md`.

### 3.9 The owner's sittings — one panel engine

**3.9.1 The registered panels.** The owner sits only at the four gating milestones — M1 (the look check), M2b, M4 and M5 —
batched, about an hour each (§13.6 (1); J122, Q-V12-2). A staged milestone's panel joins the next gating sitting when its
build has landed by then; otherwise its bars stay *provisional — not rated* (§13.6 (7)) and the panel is re-offered with
every release until rated, never blocking the build.

| panel | sat at | gate a rated pass claims | groups (pairs) | extras | spec owner |
|---|---|---|---|---|---|
| M1 | M1 | diagnostic (§13.6 (1)) | MFCG 30 (per rung five `none`, five `coast+river`), FTG 6 (three per rung, TOWN and CITY) | threshold strips due at M1; labels | base |
| M2b | M2b | "the base at parity" | as M1 (`lit` against FTG) | strips due at M2b; labels | base |
| M4 | M4 | "mastered" | as M2b; plus the **M4-110 group** (SOLO, six items, below), which confirms item 110's register lines and gates nothing of M4's claim | strips; the `house` pick (§13.6 (8)); labels | base; the M4-110 group V12 |
| M5 | M5 | the stage-2 gate | NG 20 (five per template), `preset: 'NG'` (V01's T-V1-32) | strips (S4 (d)) | base (item 498: its `square` pairs on the carved plaza) |
| M6 | next gating | "stage 3 at parity" | Fantasy Manor 20 | the ladder street and the item-110 buildings (V02 §7.5 (2), (3)) | V02 (item 499) |
| V-M4 | next gating | the village at parity | VG pairs per V07 §8 | per V07 | V07 |
| V3-P6 | next gating | diagnostic: the plan rung's soft bands (V03 §8) | DW 20: plans of six classes in three bands beside Dwellings houses of like size | — | V03 |
| V4-U5 | next gating | diagnostic: the underground reads (V04 §7); rated, it confirms the underground's `panel` register entries, the crypt and catacomb rows among them | SOLO 30 as V04 §7 states it: ten CITY and five METROPOLIS underground bands, each seed in the historical and the navigable mode, a ruin among them, shuffled, each framed to hold the cathedral's crypt (or the largest church's) and the largest catacomb complex; questions `legibility` and `realism` | one render in the reference family's hatched style beside the set (`styleReference`, V04 §7) | V04 |
| M6-sky | next gating | none: a descriptive set, never a gate (V05 §7) | NG 5: island close-ups in `hatched` beside Neighbourhood patches; question `reads`, subject "a floating patch" | — | V05 |
| V6-E7 | next gating | diagnostic: the histories read as historically faithful (V06 §12) | AB (`history`) 10: ten CITY seeds, each run through H-100's script and shown at its last epoch, against the same seed generated fresh at that epoch's population; questions `realism` and `legibility` | — | V06 |
| M-CAL (and each later `M-CAL/<layer>`, sat only when that run moved a cell) | next gating | the reconciliation decision (V12 §3.10.6) | AB (`reconcile`): per frame, five seeds per rung the frame covers, `none` water, before against after | re-offered owner-eye strips; the palette pick if V12 §3.10.7 finds a mismatch | this volume |

**The M4-110 group** (J-V12.45): six SOLO items inside the M4 panel, about five minutes — K2 rendered once (its authoring
paths share a digest), and five CITY or METROPOLIS towns on V12 §3.6b's forcing sites showing between them a viaduct over a
ravine, an aqueduct on arches, an elevated road between high wards, a terraced hill ward with its retaining walls, and a
mole with deck buildings beside a stepped temple; framing `walledPlus10` centred on the feature; questions `legibility`
and `realism`; SOLO's ⌈2n ÷ 3⌉ Yes. A random D-5 pair seldom shows these things, so only a group made of them can confirm
their rows.

**Batching and re-offers.** A gating sitting holds its own panel, the staged panels whose builds have landed by then, and
at most ONE earlier panel still *provisional — not rated*, the oldest first, within its hour; a panel that does not fit
waits for the next release's offer. A diagnostic panel (M1) superseded by a rated panel of the same reference is no longer
re-offered. A re-offered panel is re-rendered under the current output version and freshly sealed (a new salt and
commitment); earlier partial answers are kept as notes and never resumed against new images. M-CAL shows at most two
frames per sitting. With no owner input at all, every panel stays *provisional — not rated*, no gate is claimed and no
pack becomes a default; one input (a single strip pick) is recorded and released like any other.

**3.9.2 Assembly.** `plat d5 seeds <panel>` writes `seeds.json` from the formulas (§13.6 (2); V12 §2.4), reading only the
committed numbers-only inputs. `plat d5 render <panel>` renders our side under `PanelRender` (V12 §2.8): 1 600 × 1 200 px
PNG at the standalone default view (midsummer, decorations off, Find off, `cvdVariant` `none`); `walledPlus10` frames the larger
side's outermost curtain (or built outline) with a 10 % margin and puts both sides at that metres-per-pixel; `overview` is
FTG's first capture per rung (§13.6 (3)); `hood`, `building` and `village` fill the frame with the hood, the building or the
village, sizes matched by count; `plan` fills the frame with the building's footprint plus 10 %, both sides at matched
metres per pixel by the footprint's long side; `underground` frames the walled area plus 10 % at the city band, placed so
that the cathedral's (or the largest church's) crypt and the largest catacomb complex lie inside it (V4-U5); `island`
frames the island's rim plus 25 %; labels and furniture off, the fixed sun, every PNG text chunk stripped so no file names
a generator. A framing never reaches past our map's zoom-out limit (§8.8, item 116): a wider frame is clamped to the
limit's, the reference side cropped to the same metres. An item whose framing target is absent (an underground band
holding no crypt) takes the next seed of its formula, the replacement recorded in `seeds.json`. The research-side panel
seat prepares the reference side the same way (an MFCG export at the pair's seed; an FTG capture screenshot at the matched
framing; an NG re-render at the pair's seed; V02's and V07's images), resampled to the same metres per pixel, furniture
cropped, and `research/d5/build_sitting.py` assembles the page.

**3.9.3 Sealing.** The panel seat draws a 128-bit salt from the operating system's random source; each pair's side (a
coin) and the pair order (a shuffle) come from a testkit stream keyed by that salt; the key — salt, order, sides — is
written research-side, and only its commitment H128(canonical key) is committed to `plat/goldens/d5/<panel>/key.commit`
before the owner sees anything. The secret salt is the one non-reproducible value in this volume, on purpose (J-V12.14).

**3.9.4 The sitting.** The page is a single local file the panel seat hands the owner — never published, because the
reference images are other creators' work (J-V12.20). One screen of plain-words introduction; then one pair per screen,
the two maps side by side, click to view either full screen, three questions with Left / Same / Right and an optional
one-line note; a progress bar; answers saved as given in the browser's storage under the panel and its commitment, so a
closed page resumes where it stopped; up to three sessions within §13.6 (7)'s seven days. After the blind pairs: the
threshold strips (three renders labelled A, B and C in a shuffled order, pick one or "same"), the `house` sheets at M4 and
later, the ladder street and the item-110 buildings with M6's panel (one `reads` answer per item, the stepped temple's
summit offset shown and named, V02 §7.5 (3)), the hatched-style render beside V4-U5's set, and the non-blind label pass. A SOLO item shows one map with Yes / No per
question. **The question texts** for the new forms (§13.6 (5)'s rubric is comparative): SOLO `legibility` — "Can you read
this — its ways, rooms and ways in — at this size?"; SOLO `realism` — "Could this lie in (or under) a real medieval
town?"; `reads` — "Does this read as {subject}?" (each item-110 building's subject V02 §7.5 (3)'s word for it: a stepped
temple, a terraced palace, a pagoda, an amphitheatre, a bridge street). **Storage.** The page tests its browser storage on load; where there is
none (a private window, a browser that gives a local file no storage) it says so on the first screen and offers "Export
answers" after every screen instead. **Returning the answers.** The first screen says in plain words that "Export answers"
saves one file to the Downloads folder and that the panel seat collects it from there. "Export answers" writes
`answers.json` (V12 §2.8). Keys: ← left, ↓ same, → right (Y and N on a SOLO item), 1–3 choose the question, O a note, P
pause.

**3.9.5 Verdict and record.** The seat reveals the key and crosses `answers.json` (notes hashed) and `key.json` into
`plat/goldens/d5/<panel>/` by V12 §3.3; `plat d5 verdict <panel>` reads only those files under `plat/`, checks the key
against its commitment, the answers against the pair list (every pair, every question — a rated verdict needs them all;
a file still incomplete after seven days records the panel *provisional — not rated* with the answers kept, J-V12.27),
computes the verdicts by §13.6 (6) and the spec's `passRule`, and writes `record.json` (`D5Record`, item 500 (c)) and the
research-side mirror (§13.3); the milestone record lists every panel sat or re-offered at it (`MilestoneRecord.d5`, item
493). A key that does not match its commitment voids the panel: a fresh sealing and sitting follow, the owner's answers
kept as notes. Each strip pick becomes an `owner-set` register entry with provenance `owner-eye <panel>` (V12 §3.11),
released in the next table version as a declared shift; the change that releases it runs `plat calibrate register`, which
appends that cells row (V12 §2.6; J-V12.83).

### 3.10 The corpus reconciliation — a process, milestone M-CAL

**3.10.1 When it opens.** On the owner's word, recorded in `ReconciliationRecord.opened`, once the standalone generators
it calibrates have exited — the base (M4), neighbourhoods (M5), buildings (M6) and the village (V-M4) — and in §16's order
after M6-sky (J122; docs/DEFINITION.md §1 and §13.9: "after the standalone generators"). Layers that land later join by
later runs of the same process (their calibratable cells already hold register entries — the default line's `corpus`
entries due at their layer's run, and the named lines' at their own steps; V06's lines carry no corpus stage, V06 §8). **A
later run** (J-V12.75) is `M-CAL/<layer>` (V12 §2.9): `M-CAL/under`, `M-CAL/sky`, `M-CAL/evolution`, or `M-CAL/<milestone>`
for a column any other milestone lands after M-CAL. It exists only for the columns whose first compiled cell landed after
M-CAL's `ReconciliationRecord` was committed (V12 §3.11's *The due's corpus run*) — a layer landing before M-CAL (M6-U, by
§16, lands before M-CAL) is M-CAL's — and it opens, as M-CAL does, on the owner's word recorded in its own `opened`, once
its layer's last milestone has exited. It reads M-CAL's declared frames (a frame declared since follows V12 §3.10.2 step 3
unchanged), measures only the metrics of the entries due at it, and applies V12 §3.10.3 – V12 §3.10.6 unchanged: its
accepted changes ship as new versions of the frames' historical packs, and its panel, its id the run's own, is sat only
when it moved a cell; otherwise its entries close by its record (E1's reachability rows, E4's checks, `fixed` with "no
admissible frame") and `panel` is `null`. Its exit is a `MilestoneRecord` of its id, where an entry due there and still
`provisional` fails as at any exit (V12 §3.11). The underground's rows (item 109's relief, mining, fissure, ruin, access,
crypt and catacomb rows) are possibility-only by nature — no town plan frames an underground — so their run is E1's
reachability and E4's historical checks (a catacomb under a cemetery outside the walls, a worked-out quarry turned ossuary,
a cathedral crypt, a parish church crypt), never prevalence, and their values are confirmed by the V4-U5 panel. Item 110's
rows take E1 and E4 the same way — houses on a bridge, buildings on a mole or pier, an aqueduct on arches, a viaduct across
a valley, terrace retaining walls in a hill town, a stepped temple (region-bound) — and a witnessed TOWN raised way is
reachable by declaration (item 101's T4), so it lifts nothing (V12 §3.10.4). Item 113's history rows take E4 the same way
(a city shrunk to a village inside its old walls; a church too large for its parish; a refounded town on the old roads)
at `M-CAL/evolution`. Until M-CAL opens nothing reads the corpus; the two owner-opened exceptions stand: item 69's palette
bands (§8.2) and the historical checks as evidence for rules (`partitioned/README.md`, J103).

**3.10.2 Intake (research side, the adapter seat).** The corpus lives outside this folder (§13.9); the adapter seat is a
research seat that reads it under the corpus's own laws (`partitioned/README.md`):
1. It reads the corpus's own manifest and lists its maps. It **never opens** the 53-plate blind holdout (it takes the
   holdout's ids from the corpus's own list and records only their count and a salted digest of the list), nor
   SettlementForge's own map-design documents; each exclusion is written to `CorpusMapMeta.excluded`.
2. It classes each map by evidence: a historical record → `record`; a measured plan whose metadata or scale gives metres →
   `surveyed`; a drawn or painted plate → `drawn`, even with a scale bar, unless the corpus's metadata calls it a survey
   (the stricter class wins; J-V12.16).
3. **Before measuring anything** it declares its sample frames (`SampleFrame`): era × region groups of `surveyed` maps
   chosen by a rule that names no measured feature ("every surveyed plan of a town of region R dated 1200–1500 in the
   corpus"), with the member list's salted digest; a frame of fewer than 20 maps may be declared and is possibility
   evidence only. The declarations cross into `frames.json` by V12 §3.3 before any row of their frames, so check C8 refuses
   a frame row whose declaration's `CrossingRecord` is not earlier — pre-registration made checkable (J-V12.19).
4. It maps each map's era and region onto our D-2 preset keys and each corpus trade label onto our class-family keys (for
   `use`), in a research-side table; no corpus word crosses.
5. It writes each map's `MeasureInput` (scale `metric` or `relative`; degenerate geometry cleaned by V12 §3.2.2's rule, a
   map left with no building excluded `unreadable`) and the index of `CorpusMapMeta` rows.
6. It salts ids: `corpus:map:` + the first 16 hex digits of SHA-256(salt ‖ id), the salt kept in the adapter's folder
   (§17.1 (5)'s convention), so no place name enters `plat/`.

Measurement then runs `plat measure` per map and `plat baselines aggregate` per frame: a frame row is role *target*, a
per-map row role *descriptive*; both cross by V12 §3.3 with check C8.

**3.10.3 What the stage may change, and what it may not.** "What you have built is always the BASE" (owner, 2026-09-25),
read with item 23 (defaults emulate; extensions ride on top):
* **R1 — every change is a layer, never an overwrite.** A corpus value lands in the historical pack `historical:<frame>` —
  a sparse, versioned delta over the defaults, one per frame — and never in a table's shipped default. The pack sits in
  §7.6's **packs** slot, bound to its frame's D-2 era and region keys: it applies to a document whose era and region
  presets match the frame and to no other, so a document keeps its one preset slot for the D-2 era and region preset or a
  parity preset and still takes the matching layer (item 382; J-V12.49). The emulated defaults (`ref:` cells), our own
  defaults and the extension values all stay as built; the default town changes only where the pack is adopted for its
  frame (V12 §3.10.6). The pack's cells carry provenance `corpus` and evidence ids (V12 §2.10; J-V12.15).
* **R2 — thresholds and bands.** A §13.7 threshold with provenance `architecture` may be re-signed where a frame measures it
  (§13.9 (4)); one with provenance `owner-eye` only by the owner's re-pick at the M-CAL panel, the corpus value shown as one
  option of its strip; a re-sign that moves a threshold onto its own measured value to make it pass is *not achieved*
  (§13.7). Corpus target rows join §13.5 and **gate the historical pack of their frame** (A2). Under the default preset they
  are role `descriptive`, reported beside the pack's verdict, until that pack is adopted; from then on they gate the new
  default for matching documents. No permitted run could fix a corpus row failing under the default, so it never fails a
  parity exit there.
* **R3 — owner-set values.** `owner` cells (the owner's rules) never move; item 69's palette targets move only by 
  V12 §3.10.7.
* **R4 — never.** Code, mechanisms, stage order and table schemas; a cell that is not `calibratable`; the parity presets
  (the layer is not part of them, so `MFCG` and `FTG` stay byte-identical, T-V12-24); the dossier row sets (§13.9 (7));
  naming tables, grammars, word lists and packs (the corpus teaches drawing, never naming); engineering invariants and
  budgets (§7.6's reading rule).
* **R5 — scale and scope.** A metric that needs metres runs only on `metric` inputs; a frame calibrates only its own era
  and region layer, and a rung its frames do not cover never receives it.
* **R6 — owner rules (J-V12.39).** A cell or mechanism that implements a clause of an OWNER RULE item (the amendment items
  marked OWNER RULE, the owner's dated words in `docs/OWNER-INSTRUCTIONS-2026-09-25.md`, DEFINITION) is never an E1 or E4
  target: every such cell carries its `ownerRule` stamp (V12 §2.10), and a mechanism's clause is named in the register. A
  witnessed form such a clause excludes — a catacomb under a cathedral against 109 (k) (2), a village catacomb against 109
  (k) (1) — is written to `ReconciliationRecord.ownerExcluded`; it never enters `known-defects.json` or a layer, and the
  owner's reconciliation report (V12 §5.5) lists it as an owner question with the recommendation "keep the rule". An
  owner-stamped calibration minimum binds a corpus run too: E2 may lower the CITY and METROPOLIS raised-way chances and
  caps only to their owner-stamped minima (V11 §3.24.2), recorded in `floorsHeld`, and the report says: "the historical
  maps show few raised ways; the owner's rule keeps cities able to build them, at the lowest chance".

**3.10.4 The evidence rules.**
* **E1 — possibility, not prevalence.** A `record`, a `drawn` plate, a single surveyed map or any map outside a declared
  frame proves only that what it shows is possible. It creates a **reachability requirement**: under some admissible
  setting the generator can produce the witnessed value. **The search** (J-V12.52): the settings are the grid of §7.8's
  controls whose parameters the metric's `stages` read, each at its range ends and middle, capped at 64 settings in the
  controls' registry order, crossed with the D-2 presets of the frame's era and region, and item 101's declarations where
  the witnessed thing is one an author can declare (a TOWN raised way by T4; a quarter by T5); the value is **reachable**
  when any of 50 seeds at any setting gives the metric within max(`absFloor`, 10 %) of the witnessed value, or a
  declaration produces it (`by: 'declaration'`). An unreachable one is recorded in `ReconciliationRecord.reachability` and
  in `known-defects.json` ("the generator cannot make …", with the salted id) — unless R6 excludes it. Where the gap is a
  chance of 0 or an option off, the one value change E1 permits is raising the chance to the **possibility floor** 0.02,
  or lowering a certainty to 0.98, in the layer, with evidence "possibility", and only in a cell that a register entry maps
  to that metric and that carries no `ownerRule` stamp. E1 never sets a weight, a share, a frequency, a count or a band's
  centre (J-V12.17).
* **E2 — prevalence needs a frame.** Only frame rows — `surveyed`, n ≥ 20, declared before measurement, selected by a rule
  that names no measured feature — may set shares, weights, frequencies and band centres, and only in their frame's layer.
* **E3 — drawing, never naming.** `drawn` plates may set a render family's look targets (the `render` metrics: palette,
  line-weight ratios, hatch density), each confirmed by the owner at the M-CAL panel; never a structural metric, never a
  name.
* **E4 — the historical checks.** Their verdicts (J103) enter as possibility: SUPPORTED → the rule's note reads
  "corpus-witnessed (possibility)", the rule stays soft; CONTRADICTED for a program universal (no `ownerRule` stamp) → E1's
  floor in the layer, the note saying so; CONTRADICTED for an owner rule → R6; ABSENT → nothing changes and the row keeps
  "general historical knowledge, not corpus-witnessed" (item 104 (f)).
* **E5 — never used.** The holdout and SettlementForge's map design, recorded by count and digest only.

**3.10.5 The runs.** Per frame, corpus `CalibrationRun`s (V12 §3.7's engine, `kind: 'corpus'`, every cell's layer
`{ pack: 'historical:<frame>' }`) in upstream-first order, so a later run fits on an earlier one's result: (1) the rung
profile's frame area, walled shares and stage rows (§1.1); (2) S3 – S5d — gates, the enceinte with item 106's barrier rows
(the defensibility thresholds and `wall.barrierReachM`, from the frames' `wall.barrierShare` and walled shares on walled
plans; the historical checks' wall rows as E4 possibility), the street heading and separation rows; (3) S6 – S7b — the
district rows; (4) S8 – S10 — the bent cut's rows, granularity, hidden shares; (5) S10b – S11 — the siting families' and
signature pairs' weights from the frame's `siting.*` rows (each compared with our statistic in the same corpus variant,
V12 §3.6), item 105's web weights and `comfortM` and item 107's spacing radii where the frame's `use` labels measure them,
the class mix; (6) S12a – S12b — greenery and hinterland; (7) the render looks (E3). Each run's guards add every earlier
run's targets, so a later run cannot undo an earlier fit. A proposed change that breaks R1 – R5 or E1 – E5 is not run: it is
written to `ReconciliationRecord.refused` with its rule.

**3.10.6 Acceptance and the before-and-after panel.** The layer of a frame is accepted when: **A1** every change's evidence
is admissible (E1 – E5); **A2** every frame target row passes on the holdout seeds under the layer; **A3** the parity
presets' goldens are byte-identical before and after, and every §13.5 row passes as before; **A4** the C bars and every
owner-rule bar pass under the layer; **A5** no threshold was moved onto its own measured value without *not achieved*.
Then the **M-CAL panel** (V12 §3.9.1) shows, blind, the same seeds before (the default) and after (the default with the
layer), with the three questions, the re-offered owner-eye strips and, if needed, the palette pick. **The decision**
(Q-V12-3; J122: a pack becomes a default only where the owner's sitting passes it) is taken **per frame**: a frame's pack
becomes on-by-default for new documents whose era and region match it when, rated, its after side is judged better or the
same on *realism* in ⌈2n ÷ 3⌉ of its pairs and not worse on *legibility* on every pair of any rung (`default`); rated
otherwise it ships selectable, listed in the preset dialog as "historical (<era>, <region>)" (V09 §4.14), the default
unchanged (`selectable`); while the panel is unrated it ships selectable and its decision reads `pending-owner` until a
rated sitting decides it. A document of another era or region never receives it. Adopting a pack is a recipe default
change: an output-version bump with its shift records (§13.3), documents made before replaying unchanged.

**3.10.7 The palette targets (item 69).** The owner released bands measured by the corpus's own instrument, whose
definitions this program cannot see (§8.2). At M-CAL the same axes are measured by **our** definitions (§8.2's code) on the
non-holdout `drawn` plates, and only the **corpus-sourced ends** are re-checked: paper luma 226 – 244, paper warmth 20 – 50
and plate chroma 18 – 70 (two-ended: our p10 and p90 against the ends) and darkest ink ≤ 45 (one-ended: our p90 against 45);
our own tolerances (ink warmth 15 – 25, `ink`'s chroma 20 – 30) are never re-signed by this step. If every re-checked end
lies within 3 units (luma, R − B) or 3 C* (chroma) of ours, nothing changes; otherwise the owner sees both bands at the
panel and picks. The pick is recorded (`ReconciliationRecord.palette`); a change re-signs §8.2's targets with provenance
`corpus` and evidence "remeasured by our definitions at M-CAL", and §13.4's palette bar with its chroma sweeps re-runs for
every family (J-V12.18).

**3.10.8 Release.** Each accepted layer ships as a versioned pack table; the `ReconciliationRecord` is committed; the release
notes and the owner's reconciliation report (V12 §5.5) say in plain words what the historical maps changed, what they could
not change and why, and which witnessed things the generator cannot yet make.

### 3.11 The calibration register — no provisional number dangles

**Entries.** One per provisional number: every §13.7 letter (owner `base`); every §13.5 row whose fallback moves a
mechanism; §1.1's rung modifiers; every volume's calibrate-later model constant (never an application or engineering
constant, *The provisional-number lint* below) — written, with its default, its measurement (its metric ids), its due
milestone and its fallback, by the seat that lands that volume's milestone, `owner` naming the volume — from a named
register line, else from the default line below; the siting weights files g items 103–108 mark "general historical
knowledge, not corpus-witnessed" (`method: 'corpus'`, due M-CAL); the thresholds of V12 §3.6b's rules (owner `V12`, §13.7
rows by item 501); and each owner strip pick (`owner-set`).

**The default line** (J-V12.71). A calibratable column (V11's `ColumnSpec`) of a registry table (V11 §3.1) that no register
line names — this section's lines with their catch-all, V11 §8's non-g lines, V02 §3.10.10's, V06 §8's, V07's one
`rules.race.densityPower@VG` entry (V07 §3.15), or a line a volume writes in V02 §3.10.10's form (in its own §8, or beside
its table as V03 §2.4 does for `roomProgram.json`, J-V3.118) — takes its one entry from this line, so no landing seat
invents a method, a metric or a fallback: id `cal.<table>.*.<column>`; `target.column` with `rows` absent; `owner` the
document whose source file holds the column's cells when the entry is written — the source manifest's author seat for that
file (V11 §3.2.1 step 1), as its volume, or `base` for a base section's seat — and, where two documents' files hold them,
the first the table's `rowsHome` names (V11 §2.1); a document that writes the column's cells later never moves it
(J-V12.73); `method: 'corpus'`; `due` M-CAL — or, for a column whose first compiled cell lands after M-CAL's
`ReconciliationRecord` is committed, the later run that takes its layer by *The due's corpus run* below (J-V12.75);
`metric` [`frame.<table>.<column>`]; `fallback` { mechanism: "at its due corpus run the run that targets the column moves
it under V12 §3.10's rules; a column no frame's run targets closes `fixed` with 'no admissible frame'", `notAchieved: false`
}; `line: 'default'`. The seat that lands the column's first compiled cell writes it in the same change with `plat calibrate
register --defaults --milestone <id>` (the landing change's milestone in V12 §2.8's form), after its named lines' entries:
the command writes this entry for every calibratable column that holds at least one compiled cell and has no entry — a
column of an empty table (V11 §2.1: every registry row ships as its schema's empty table until its rows-home milestone)
takes none until the change that ships its first row — in table-id then column order, never touches an existing entry
except to append the moved-value or rows-added row below, is idempotent, and lists the ids it wrote or appended to in the
register report (V12 §5.2). This floor is no measurement plan: its corpus run moves no owner-stamped cell or gate and no
value below an owner-stamped minimum (V12 §3.10.3 R6), and it binds no key, law, enumeration, switch, word list or
dossier row set (V11 marks those non-calibratable). It binds, among others, volume 1's `hood.*` default rows; volume 3's
`roomProgram.json` columns its V03 §2.4 lines leave (PE's cells among them; J-V3.118); V04 §2.3's rule-table columns
no line below names; V05 §2.4's values, its `IslandRule` cells `accessSiting.deckGapM` and `lineClearM` among them
(V05's own, calibrate-later, never V11 rows; J-VI.17 H29); V07 §2.2's and V07 §2.2a's numeric cells other than its one `VG`
entry — the `FarmTable` village rows among them, while `territory.haPerHead`, derived as their sum, takes no entry (E-38;
V07 §3.9 (1)); and the calibratable look rows of item 117 (V11's season, leaf and leaf-cover rows, registry rows 98–101: their
densities and week bands). Volume 8's dossier row sets and volumes 9's and 10's tables take none — every column of V11 §3.1 rows 63–66
and 86–89 is `calibratable: false` (J-V11.65, J-V11.81). **A later line** for a column the default line bound — a volume
whose bars confirm the column before its corpus run writes it in V02 §3.10.10's form and registers the bars it names —
restates that one entry in place while it is `provisional` (after its corpus run only under a new major table version,
V12 §4.2): the same id, the line's `owner`, method, metric, due and fallback, `line` dropped, a cells row appended with the
column's value and the restating milestone; never a second entry.

**The due's corpus run** (J-V12.75, J-V12.78). `--milestone <id>` is required: `--defaults` without it refuses, writing
nothing and naming the flag, and a volume's short citation of the command runs with it. `<id>` is the landing change's
milestone in V12 §2.8's form (`M1`, `M2b`, `M3a`, `M3a-V2`, `M5`, `V-M0`, `V-M2u`, `V3-P1`, `V4-U3b`, `V5-P2`, `V6-E2` …); an
id that is neither one of §16's ids nor volume-qualified by V12 §2.8's rule — a bare `P1` — is refused, naming the form.
`--defaults --milestone <id>` writes each entry's first history row `{ date, value: the column's compiled cells by row key,
milestone: <id>, cells: true }` and its `due` from that milestone: `M-CAL` while no M-CAL `ReconciliationRecord` is
committed; once one is, the later run that takes the landing milestone's layer:

| the landing milestone | `due` once M-CAL's record is committed |
|---|---|
| M6-U and `V4-U0` – `V4-U5` (`V4-U3b` among them); `V-M2u` | `M-CAL/under` |
| M6-sky and `V5-P0` – `V5-P6` | `M-CAL/sky` |
| M6-E and `V6-E0` – `V6-E9` | `M-CAL/evolution` |
| M6-P and `V3-P0` – `V3-P6` (PE is built inside M2b and M3a and lands under their ids) | `M-CAL/M6-P` |
| any other milestone | `M-CAL/<that milestone's id>` |

The same substitution holds on every named line: a line's `corpus` stage or due at M-CAL, on a column whose first compiled
cell lands after M-CAL's record is committed, falls at that column's run by this table, and the seat landing the column
writes that due. A column landing before M-CAL's record stays due at M-CAL.

**A value moved by its owning seat before its due** (J-V12.77). (1) *When.* The seat that owns a calibratable column (its
entry's `owner`) whose entry carries `line: 'default'`, is `provisional` and is not yet due — no `ReconciliationRecord` of
its `due` is committed — may change the column's compiled cells in its table's source outside any run (V12 §3.7), only when
the change's golden check (§6.4's stage-isolated digests at PR tier, over the main set, the no-op pins' sets and the
known-city fixtures') finds no digest of a golden committed before the change moved by the new value — a column a
committed stage already reads may so move where no golden's digest depends on the moved cells (`terrace.siteShare`, read
from M3a by `terraceState` for the base's district-edge source, V01 §8.1, BCR-V1-42, matters only where an authored
`terrace` site primitive covers a district); a reader stage the same change lands records its first golden, or its
feature's declared shift, with the moved value. Volume 1's M5 tunings are the case (V01 §8.1): `land.spineFactor`,
`land.ringSlack`, `land.smallShare`, `terrace.askGain`, `terrace.siteShare` and `ng.plazaM2` of `hood.constants` (entries
written at M1) and S7c's `select.*` weights of `hood.templates` (written at M3a), each tuned to that volume's own acceptance
bars inside the work item that lands its reader, before M5's exit. **Held:** should the golden check find a committed
digest moved by such a tuning, the tuning is not landed — the cell keeps its landed value, the change records the hold
with `plat calibrate register --hold <entry id> --milestone <id>` (one row `{ date, value: null, milestone, held: true }`,
its only change), the register report lists the entry "held: a committed golden reads it" until a later cells row, and the
owning volume's bar reads the shipped value (V01's T-V1-50). A move that would shift a committed golden is a run — a
`fallback` or `reference` run with its declared shift (V12 §3.7.6) — never this row; the command below does not read
goldens, the golden check does. A named line's entry moves its cells by its line's method — a run, the panel rule's stated
second value — and, on a `measure` line whose owning volume states a tuning before its exit and whose bars no run may name
(every `BenchBarDef.stages` `[]`, V12 §3.7.2 (4): V03 §2.4's lines, tuned at `V3-P6`), by its owning seat inside the exit's
milestone under this clause's golden test, and by the line's stated fallback applied in the exit's change (*Milestone
exits*); each such move appends (2)'s cells row by the same command while the entry is `provisional`, and (3)'s check
covers the entry. (2) *The row.* The change that moves the value runs `plat calibrate register --defaults --milestone
<id>`, `<id>` its own milestone. For an existing default entry, or a named entry (1)'s last sentence admits — one whose
current stage is `measure` and every metric of which that stage reads is a `bar.` member whose bar's `stages` is `[]` (the
command reads the registered `BenchBarDef`s; that the owning volume states the tuning is the landing review's check) —
whose target's compiled cells differ, on the row keys its last cells row holds, from that row's `value`, the command
appends `{ date, value: the column's compiled cells by row key, milestone: <id>, cells: true }` — its only change to an
existing entry: `status`, `due`, the first row, `owner`, method, metric and fallback stay as written. For such an entry
that is not `provisional`, or whose due's record was committed before the change (a default entry's
`ReconciliationRecord`; a named entry's current stage's `MilestoneRecord`), it appends nothing and lists the entry as a
move owed to a run (`plat calibrate run`). A second run of the command appends nothing. (2′) *Rows added* (J-V12.80). A
change whose compiled cells hold row keys an entry's last cells row lacks, every row key that row holds unchanged, adds
rows: the command appends the cells row to that entry — default or named, whatever its status or due, whichever seat lands
the rows (V03's `V3-P1` band rows of `roomProgram.circulation`, whose poorest-band rows landed at M2b under owner `base`;
V11's C3 rows of a column its C1 rows opened) — and changes nothing else. Rows added after the entry left `provisional`
keep their authored values and are reported "rows added after close", a later major table version restating the entry for
them (V12 §4.2). A change that also changes a cell of a row key that row holds is a move, which (1) and (2) decide, one
cells row recording both; (1)'s owner condition and (2)'s "owed to a run" read only the changed cells of held row keys.
(3) *The check.* `plat calibrate register --check` compares, for every entry whose target is a cell or a column without
`preset` and whose history holds a cells row, its target's compiled cells with its last cells row: a changed or removed
cell of a row key that row holds fails — naming `plat calibrate register --defaults --milestone <id>` for a default entry,
or a named entry (1)'s last sentence admits, while it is `provisional` and not yet due, and `plat calibrate run`
otherwise; a compiled row key the row lacks fails naming the command, which appends it by (2′). It compares the last cells
row, not the last row of any kind: after its corpus run a default entry's later rows record metric readings and its status,
while that run's changes ship as historical packs (V12 §3.10.3 R1) and leave the column's cells as its last cells row holds
them — so a closed entry passes until someone moves its cells in place outside a run.

**Lines by column family.** A table column whose cells share one measurement is one entry (`target.column`), written by the
seat that lands the table; V11's column entries land with each content milestone and C6 at M4 audits them (V11 §8). A
line's method cell writes `CalibrationEntry.method` by name — `measure`, `panel`, `corpus` — and a line whose method is a
`reference` run writes `method: 'tune'`. **The catch-all rule** (J-V12.69): a line ending "and every other calibratable
column" (of the tables or columns it names) binds every calibratable column of those tables or columns that no other
register line names — this section's, V11 §8's non-g lines, V02 §3.10.10's, V06 §8's — each as its own entry, id
`cal.<table>.*.<column>`, with that line's method, metric and fallback; keys, laws, enumerations, switches and the dossier
row sets take none, and a column two lines bind fails the lint as two entries for one knob (V12 §2.6):

| rows (their content is the owning volume's) | method, due | the confirming measurement | when it cannot confirm |
|---|---|---|---|
| items 103–107: siting-family and signature-pair weights, coverage targets, item 105's web weights, `comfortM` and orientation factors, item 107's spacing radii, and every other calibratable column of the tables and columns items 103–107 add — registry rows 33–37 (`siting.profiles`, `.families`, `.pairs`, `.web`, `.custom`: `siting.web`'s `relaxPasses`, `relaxGain`, `splitThreshold`, `reverseShare`, `valuableSecurity` and every `siting.custom` rule cell among them), row 19 (`roster.resources`: `maxDistanceM` and every other goods column), row 17's `profile` columns (V11 §2.3's `SitingProfile`) and row 24's `coverage.rosterWeight` (V11 §2.3 – V11 §2.5, V11 §3.3 – V11 §3.8, V11 §3.13) (V11) | `measure` at M2b for the direction (the bar map's null and share bars, V12 §3.6b), then `corpus` at M-CAL for the value (the frames' `siting.*` and `link.*` rows) | `siting.<spec>` and `bar.<barId>` of the bar map's rows; `frame.*` (a column the catch-all binds names the bar map's rows of its item and its own `frame.<table>.<column>`) | a failing bar's fallback; a column no frame measures closes `fixed` at M-CAL with "no admissible frame" |
| item 106: the defensibility thresholds, `wall.barrierReachM`, the waterfront size threshold, and every other calibratable column of `walls.barriers` and `walls.waterfront` (rows 14–15, the thickness · height and tower-spacing factors among them; V11 §2.7, V11 §3.16) (V11) | `corpus` at M-CAL | `wall.barrierShare` and `walled.share` on walled frames; each column's own `frame.<table>.<column>` | as above |
| item 108: the ladder pairs and subsumption rules (provenance `sf:`, V11 §2.2); the port's ranges for unnumbered qualifiers | never entries: the first move only with the port's baseline (V12 §3.7.2 rule 2), the second are the port's derivation rules (item 20 (h)); `calibratable: false` on every `dossier.*` column (V11 §3.1) | — | — |
| item 102: `w_sun` (`prosperity.drivers`' row `sun`, V11 §3.3.5; owner V11), `sun.samples` and the `roster.classMix` prestige key `sun` (V11); V05's and V06's own shade cells by their volume's own lines where one names them (V06 §8), else by the default line | `measure` at M2b with V11's C2: T-V11-30 (`w_sun` at its default against 0 under common random numbers on B-CITY — the term alone moves no plot across two bands); then item 102 (g)'s fixtures, `measure` at `V5-P1` (V05's island, T-V5-19) and `measure` at `V6-E7` (V06's drift fixture's `shade.gap` on E7's bench, T-V6-12) — two stages at unordered rows, each read at its own exit (*Staged entries*) | `bar.T-V11-30` at M2b; the fixtures' `shade.gap` at their stages | V11 §3.3.5's stated fallback: halve `w_sun` once, then its stated floor, each followed by a re-run |

**Items 109 and 110 by column.** Every calibratable column of the underground's tables and of item 110's is one
`target.column` entry, id `cal.<table>.*.<column>` (`rows` absent), written by the seat landing the owning content
milestone — V11's C8 for item 109 (M6-U), C3b for item 110 (M3a) with the era's and the culture's item-110 factors, C1 for
`climate` (V11 §8); V04's and V02's seats for their own cells; and a base cell that a volume's base change request adds,
owner `base`, by the seat landing that request, once the cell exists (V06's E2 at M6-E for BCR-V6-26's persistence cells,
file f item 291; J-V12.66) — with the method, metric and fallback of its line; a line ending "and every other calibratable
column" binds by the catch-all rule. `retaining.settings.stateSnapCm` (row 79; file f item 245; owner `base`, whose value it
holds): the default line's entry at M3a, restated in place at `V6-E2` by V06 §8's line on `bar.T-V6-62` (J-RF2.4's
measurement), due `V6-E7` — an entry written at M3a cannot name a bar V06 registers at E2 (J-V12.82); V11 §3.24.1 cites
this line for it. `owner` is the volume whose values the cells hold, the schema's volume named in brackets. No entry of these
lines names a preset entry (V11's preset entries are `fixed:` off values, V11 §2.2) or moves an owner-stamped cell or gate
or a value below an owner-stamped minimum. A line's step is written into its entries' `due` (and a staged line's into each
stage's) in V12 §2.8's form — "at U3" as `V4-U3`, "at U3b" as `V4-U3b`, "at U4" as `V4-U4`, "at U5" as `V4-U5`, V06's E2
and E7 as `V6-E2` and `V6-E7` — while the corpus evidence rules E1 – E5 are rules, not milestones.

| table (registry row) · columns — one entry each | owner (schema) | method, due | metric | fallback |
|---|---|---|---|---|
| `s0.features`' relief and geology rows' item-109 (a) values — P(soluble), P(volcanic) by relief (row 9); `under.systems`' cavern row `mineBoost`, `mineCap`, `fissureChance`, `breachM` (row 59) | `base` (item 109 (a)'s values; V04's `params` names) | `measure` at `V4-U3` (the bar map's 109 (a) `trend` and `higherWith` rows; T-V4-55), then `panel` (V4-U5, `realism`) at `V4-U5` | `void.*` (cavern present) | V12 §3.6b's default, then *not produced*; unrated: the panel rule |
| `under.systems`' cavern `miningCellShare` (row 59) | V11 (V11 §3.23.1) | `measure` at `V4-U3` (the `higherWith` row's mining factor) | `void.*` (cavern present) | V12 §3.6b's default |
| `under.ruin` (row 58a) `chance`: `magic`, `history`, `delvingFactor`, every `blueprint` rung × relief cell | V11 (V11 §3.23.2; V04 §2.3) | `measure` at `V4-U3` (the 109 (j) (1) `rate` rows on forced-source sites confirm each draw reads its chance), then `panel` (V4-U5, `realism`) at `V4-U5`, then `corpus` possibility (E1) at M-CAL | `void.*` (ruin present) | the panel rule; a reachability gap enters `known-defects.json` |
| `under.ruin` `cultures` (`CultureRow`): `blockPitchM`, `streetCm`, `aspect`, `roomM`, `columnPitchM`, `hallShare`, `terraceRiseM`, `weight`, `monument`, and every other calibratable column of the row | V11 (V11 §3.23.4; V04 §2.3) | `measure` at `V4-U3` — T-V11-24's distinctness against the town's fabric above the ruin (`paired`; T-V4-45) — then `panel` (V4-U5) at `V4-U5` | `ruin.blockArea`, `grid.r4`, `grid.axis` | V11 §3.23.4's: the failing row's `blockPitchM` moves 25 % away from the town's median block pitch once and the bench re-runs; a second failure drops the row's weight to 0, reported to the owner as a table defect |
| `under.ruin` `survival` (the eight persistence classes) | V11 (V11 §3.23.5; V04 §2.3) | `panel` (V4-U5, `realism`) at `V4-U5`; the order is T-V11-23's compile bar | `ruin.survival` | the panel rule, every move keeping V11 §3.23.5's order |
| `under.ruin` `sourceWeight` | V11 (V11 §3.23.6; V04 §2.3) | `measure` at `V4-U4`, the step whose exit runs that bar (the 109 (i) `rate` row: T-V4-58), then `panel` (V4-U5) at `V4-U5` | `void.*` (an undercity's first void source) | the panel rule |
| `under.ruin` V04's cells: `ancientYears`, `significance`, `maxFrameShare`, `maxChambers`, `forecastFloorShare`, `depthM`, `burialByAge`, `smoothM`, `sharedAxisChance`, `ageRefYears`, `coverKeep`, `distinct`, `fadeFactor`, `magicLightChance`, `monument` (`clearM`, `tierDecay`, `ceilingClearCm`, `moundShare`), and every other calibratable column | V04 (V04 §2.3) | `measure` at `V4-U3` (T-V4-45, T-V4-68; T-V4-62 reads the span-rule line's cells), then `panel` (V4-U5) at `V4-U5` | `ruin.blockArea`, `grid.axis`, `void.*` | V04 §8's pre-decided fallbacks, else the panel rule |
| `under.openings` (row 58a) each kind's `chance` | V11 (V11 §3.23.7; V04 §2.3) | `measure` at `V4-U3b`, the step whose exit runs those bars (the bar map's 109 (j) (5) `trend` and `floor`: T-V4-49, T-V4-54), then `panel` (V4-U5) at `V4-U5` | `void.*` (accessible; deep voids sealed) | V12 §3.6b's default |
| `under.openings` `coverM` | V04 (V04 §2.3) | as the line above | `void.*` | as the line above |
| `under.dig` (row 58a): `cap`, `reachM`, `decayM`, `maxM`, `basementFactor`, every resolved `classRow` | V11 (V11 §3.23.7; V04 §2.3) | as the `under.openings` line | `void.*` (accessible; deep voids sealed) | V12 §3.6b's default, every move keeping T-V11-23's non-increasing depth factor |
| `under.dig` `sealedFloor` — the floor the `voidSealedDeep` bar reads (item 109 (j) (5)) | V11 (V11 §3.23.7) | `panel` (V4-U5) at `V4-U5` | `void.*` (deep voids sealed) | none: moving it moves the bar's threshold, so a miss is `not-achieved` (`notAchieved: true`) |
| `under.dig` `planReachM` | V04 (V04 §2.3) | as the `under.openings` line | `void.*` | V12 §3.6b's default |
| `under.catacomb` (row 58a): `count` (`churchesPer`, `cap`), the `chance` cells, `rankCap`, `growthCapShare` (per year), `growthFloorM2`, `plagueNeedFactor`, `cryptJoin` (`own`, `other`), `charnelMaxM2`, and every other calibratable column — never the owner-stamped gates (the TOWN rung, the cemetery-only sources, the cathedral's `always`) | V11 (V11 §3.23.8, J-VI.6; V04 §2.3) | `panel` (V4-U5, `realism`; its framing holds the cathedral's crypt and the largest complex) at `V4-U5`, then `corpus` possibility (E4's crypt and catacomb checks) at M-CAL | `catacomb.count`, `catacomb.extentM2`, `catacomb.growthM2`, `crypt.joined` | the panel rule; the bar map's catacomb properties are exact conformance and move no cell |
| `under.catacomb` `ossuaryReachM` | V04 (V04 §3.5.1) | as the line above | `catacomb.fill` | as the line above |
| the crypt columns of item 109 (k) (2): the crypt chance per church class (the `basement` classes' cellar rows), `cryptM2` by class and band (`roster.classes`), `crypt.rankShare` (`roster.settings`) | V11 (V11 §3.5.8, V11 §3.5.1) | as the `under.catacomb` line | `crypt.present`, `crypt.areaM2`, `crypt.rank` | as the `under.catacomb` line |
| V04's other item-109 cells (`voidDwellings`, `under.layout`'s `overlapShaftM` and `overlapShaftChance`, the fade rows); and `accessForecastMin`, `under.rule`'s base cell (registry row 57; II.7.4's `UndergroundRule`, its default written there beside `forecastSafety`'s), its entry landed at `V4-U3b`, the step of its reader P7 | V04; `accessForecastMin` `base` | the default line — `corpus` at M-CAL, or at `M-CAL/under` for a step landing after M-CAL's record — unless V04 §8 writes its own line for the column in V02 §3.10.10's form, which then restates the entry in place | `frame.<table>.<column>`, else that line's | closes `fixed` at its corpus run with "no admissible frame", else that line's |
| `terrace`: `slopeMin`, `stepMinCm`, `stepMaxCm`, `minTerraceDepthM` (`enabled` is a switch, not calibratable, and takes no entry — V11 §3.24.1); `retainingReachM`, `flatDepthM`, `coverShare` (V09 §4.20.1 (3)'s flat-ground bends); `s0.features`' relief column `terracedEdges` (row 9); and every other calibratable column | V11 (V11 §3.24.1) | `panel` (the M4 panel's M4-110 group; K2 its item) at M4, then `corpus` possibility (E1) at M-CAL | `retaining.lengthM` (and `retaining.onFlatM`, 0 by T110-1) | the panel rule, every move clamped by T-V11-32 (a)'s inequalities |
| `retaining` (row 79) by band: material weights, `batter`, `thicknessShare`, buttress `fromCm` and `spacingM`, `parapetCm`, towers per 100 m and their least step, and every other calibratable column but `settings.stateSnapCm` | V11 (V11 §3.24.1) | `panel` (the M4-110 group) at M4 | `retaining.lengthM` | the panel rule |
| `raisedWays` (row 80) rows, CITY and METROPOLIS × kind: `chance`, `cap`, `pMax`; `raisedWays.settings`: `totalCap`, `viaduct.minDropM`, `viaduct.spanCostFactor`, `viaduct.maxSpanM`, `elevated.minRiseM`, `elevated.maxSpanM`, `elevated.bandFactor`, `elevated.landmarkFactor`, `elevated.landmarkMinSignificance` (DR35's threshold), `landmarkMax`, `elevated.highGroundM`, `aqueduct.sourceReachKm`, `aqueduct.needRatioMin`, `aqueduct.minFallPerKm`, `aqueduct.gradient`, `aqueduct.capPerSizeMember`, `aqueduct.terminal`, and every other calibratable settings column — the chances and caps at or above their owner-stamped minima (J-V12.42); the rung gate is V11's schema, never a cell; no `aqueduct.dossierFactor` cell exists — the aqueduct takes no dossier factor (V11 §3.24.7 (3)) | V11 (V11 §3.24.2) | `measure` at M3a, where raised-way generation lands (the four raised-way bars; V06's growth parity reads the ways over the epochs by the `decline` lines below, never a stage of this line), then `panel` (the M4-110 group) at M4, then `corpus` possibility (E1, E4) at M-CAL | `raised.count` | V12 §3.6b's default bounded by the owner's minima — a presence bar still failing at the floor is *not produced*; unrated: *provisional — not rated*; a reachability gap enters `known-defects.json` |
| `raisedWays.structure`: `clearanceCm` (cart, foot), `parapetCm`, `channelWallCm`, `channelCm`, `deckExtraCm`, `maxPierM` by kind, `pierSpacingM` by material, `pierWidthShare`, `pierMinCm`, `material` by band, `slideMaxFactor` (file f item 244), `stripMarginM` (the under-deck strip's one margin cell, read by §4.6 S8, shipped with item 110's rows from M3a), and every other calibratable column but the `span` block (the span-rule line's) | V11 (V11 §3.24.2) | `panel` (the M4-110 group) at M4 | `raised.count` (a course needing a taller pier than `maxPierM` drops, reported `raised_too_tall`) | the panel rule |
| `era` (row 50) `aqueductM`, `raisedVaultM`; the culture rows' `building` block (row 71) `aqueductM`, `elevatedM`, `raisedVaultM` | V11 (V11 §3.19.1, V11 §3.20.3) | `panel` (the M4-110 group) at M4, then `corpus` possibility (E1: a frame's era and region reach its raised-way rates) at M-CAL | `raised.count` | the panel rule |
| `ways.crossing` (row 81) by way class: `rampMaxGrade`, the stair's riser, tread, landing interval and landing length, and every other calibratable column | V11 (V11 §3.24.5) | `panel` (the M4-110 group; K2's stairs and ramps) at M4 | `crossing.kinds` | the panel rule; a cart class never takes a stair (V11 §3.24.5's failure rule, the owner's words) |
| `deck` (row 82) by kind: `offer` per rung, footprint and floors by band, `frontageM`, `minPlotDepthM`, `fill`, `endClearM`, and every other calibratable column | V11 (V11 §3.24.4) | `panel` (the M4-110 group) at M4, then `corpus` possibility (E1) at M-CAL | `deck.buildings` | the panel rule |
| `deck.landmarks` (row 83): each slot's claimant chances, `minSpanM`, and every other calibratable column | V11 (V11 §3.24.4) | `panel` (the M4-110 group; K2's mole head, mid-mole and islet slots) at M4 | `deck.buildings` | the panel rule |
| `roster.specialisations` (row 84): each row's `chance`, `capShare`, `capMin` | V11 (V11 §3.24.3) | `panel` (the M4-110 group; its stepped-temple item) at M4 | `tier.count` | the panel rule |
| the stepped tiers: V11's `stepped-shrine` heights row (V11 §3.6.4); V02's stepped compositions (V02 §3.15) take V02 §3.10.10's stepped line, never this one | V11 | `panel` (the M4-110 group; the stepped-temple item) at M4 | `tier.count` | the panel rule |
| `water` (row 85) `perHeadL` | V11 (V11 §3.24.6) | `measure` at M3a — T-V11-33's bench at the start of V11's C3b (arid METROPOLIS seeds with an aqueduct candidate ≥ 0.5; temperate alluvial CITY seeds ≤ 0.2) | `water.needRatio` | V11 §3.24.6's: `perHeadL` moves by 5 litres once toward the missed side and the bench re-runs; a second miss is reported to the owner with both measurements |
| `water`: `wellsPerHa` by geology, `wellYieldM3`, `roofShare`, `captureShare` by biome; `climate` (row 43) `rainMmPerYear` by biome | V11 (V11 §3.24.6, V11 §3.17.1) | as the line above, then `corpus` possibility (E1) at M-CAL | `water.needRatio` | V11 §3.24.6's fallback moves `perHeadL` only; these columns close with its result |
| `decline` (row 46) structures block: `retaining.holdM`, `retaining.neglectAfterYears`, `retaining.stretchM`, `aqueduct.disuseAfterYears` — written at V11's C3b (M3a) | V11 (V11 §3.18; read by V06 §3.19.2, V06 §3.19.4) | `panel` (V6-E7, AB `history` on H-100) at `V6-E7`, inside M6-E | `retaining.lengthM`, `raised.count` over the epochs | the panel rule |
| the base decline table's persistence cells `raised`, `retaining` (row 46; §4.11 by file f item 291, STAGED M6-E; V11 §3.18 holds no rate) — written by the seat landing V06's E2 at M6-E | `base` | `panel` (V6-E7, AB `history` on H-100) at `V6-E7`, inside M6-E | `retaining.lengthM`, `raised.count` over the epochs | the panel rule, with V06 §8's stated second value |
| V04's span-rule constants, the cells `raisedWays.structure.span` (row 80; their values V11 §3.24.2, J-V11.97 — the base's §2.7 support step and span rule, file f item 244 from V04's request BCR-V4-45, and V04 cite the cells): `vaultShare` by kind (`span.vaultShare`, scaled by the era and culture `raisedVaultM`), `maxHeightCm`, `minHeadroomCm`, `maxFallCm`, `vaultCap` by rung, `deckDepthCm`, `supportFoundationCm` (J-V4.93) | V04 | `panel` (the M4-110 group) at M4, then `measure` — T-V4-62's conformance, 0 violations — at `V4-U3`, then `panel` (V4-U5, `realism`) at `V4-U5`: three stages in milestone order, the cells landing at M3a (*Staged entries*; V04 §8's row takes this order and cites this line, its home) | `raised.count` | V04 §8's pre-decided fallback, else the panel rule |

**Items 111–119 by column** (the owner items' register lines; V12 §3.15 gives each item's bars):

| table · columns — one entry each | owner (schema) | method, due | metric | fallback |
|---|---|---|---|---|
| item 111's pull and term cells: the water-pull weights by climate row (the growth field's and the crowding map's), the prosperity water term's weight, item 102's sunlight cell per climate row, the well-yield weighting and the arid walking-coverage factor (V11's item-111 rows), and every other calibratable column they add but the oasis, grove and garden rows | V11 | `measure` at M2b — T111-1 (`higherWith`) and T111-4 (`most`) — then `corpus` (an arid frame's `water.distByBand`, where one exists) at M-CAL | `bar.T111-1`, `bar.T111-4`, `water.walkShare`, `water.distByBand`; `frame.*` | V12 §3.6b's default (the weight doubles once, clamped), then *not produced* |
| item 111's oasis chance and no-other-water factor, the oasis area band, the grove and irrigated-garden rows, and the arid row's river, lake and coast chances | V11 | the default line (`corpus` at M-CAL; T111-3's rate rows at M1 confirm each draw reads its chance, and a miss there is a code defect fixed before M1's exit, moving no cell) | `frame.<table>.<column>`; `water.kinds` reported | the default line's |
| the deficiency-contrast threshold of §8.2's style check (item 112 (a); its cell in V11's style registry rows) | `base` | `measure` at M3b — T112-1 green on every shipped family's checked variants (`hatched`'s at M5) — with the game-master trial's colour findings appended as `trial` rows (V12 §3.15.2) | `bar.T112-1` | none: moving it moves the bar, so a miss is `not-achieved` (`notAchieved: true`); a failing variant is fixed in its colours, never by the threshold |
| item 113's cells: `history.epochYears`, the event-to-epoch rows, the burial threshold and its flood, silt, rebuilding and bare-rock factors, the effective peak's sizing quantile (V11's item-113 rows), and every other calibratable column they add | V11 | `measure` at `V6-E9`, where the replay lands (its fixtures pass with the cells as shipped), then `corpus` possibility (E4: a town shrunk inside its old walls, a church too large for its parish, a refounding on the old roads) at its corpus run | `bar.T113-1`, `bar.T113-3`, `bar.T113-4`, `bar.T113-6` | V12 §3.6b's default |
| item 114's cells: the need and means windows, the neglect, wear, breach, patch and rebuild rates, the patch-replacement rate (V11's item-114 rows) | V11 | `panel` (V6-E7, AB `history` on H-100, whose walls decay and recover) at `V6-E7`, then `corpus` possibility (E4: a poor town's patched circuit) at its corpus run | `wall.condition` over the epochs; `bar.T114-5`, `bar.T114-4` (their specs `T114g.sustained`, `T114g.oldestFirst`, V12 §3.15.4) | the panel rule |
| item 114's generation-time shares (§7.7's DR41 from readiness and wealth; V11's rows) | V11 | `measure` at M2b, where §7.7's DR41 lands (§13.8), on T114-7's readiness × wealth fixture grid, then `corpus` possibility (E4) at M-CAL | `wall.condition`; `bar.T114-7` | V12 §3.6b's default |

Item 115's ceiling table and item 118's decoration, staging-keyword, motif and generic-festival tables (registry rows 97 and
102–105) are enumerations (not calibratable; V11) and take no entry; item 120 adds no line — its search lexicon
(V11's labels, synonyms and groups) is a word list, and a calibratable cell its rows add takes the default line like any
column; item 116's zoom-out margin stop, item 119's comfort level, item 120's interaction budgets and every time budget
are engineering constants outside the register (*The provisional-number lint*), each provenance note naming its
confirming bar. Items 121 – 126 add no line either. The look cells of items 122, 123 and 124 — item 122's look rows'
`scale` and `lookLevel` and its settings `densityCap`, `siegeStandoffM`, `areaPerHeadM2`,
`enginesPerBesiegers` and `previewSeverity` (§10.2's `RosterTables.crisis`), item 123's threshold ranges by element kind,
its decay rates by material and its default age, item 124's climate rows' weather columns and the numbers of the
climate table's `settings.weather` block (the kinds' `lengthS` and `hours`, the site factors and `forestShareMin`; not
its two owner-stamped caps, V11 §3.25.11) —
take the default line like item 117's look rows: V12 §3.15's bars check that the drawing follows them, never their
values; item 122's `map` rows are a dossier row set and take none. Item 121's ladder, tier ceilings, 4K ceiling and Auto
loop thresholds, item 124's frame cost and item 126's medium-class minimum are engineering constants outside the
register, each provenance note naming its confirming bar (T121-2, T121-3, T121-8; T124-2; T126-2); item 125 adds no
cell (its fallbacks are the generator's own choices).

**The panel rule** (J-V12.61). Where a line reads "the panel rule": a group rated No on its question moves the line's cells
once to the owning volume's stated second value where it states one — a declared `fallback` run (V12 §3.7) — and the group
re-sits at the next sitting; where no second value is stated, the entry becomes `not-achieved` and the group's finding
reaches the owner as a table defect in the reconciliation report (V12 §5.5); an unrated group leaves the entry *provisional
— not rated*, which never fails an exit (V12 §2.6).

**The provisional-number lint** (`plat calibrate register --check`, PR tier). **Every** compiled cell whose column is
`calibratable` passes only when its provenance source is `ref:…`, `owner`, `owner-eye`, `host`, `corpus` (item 69's palette
exception, or a historical pack's cell) or `sf:⟨file⟩@⟨baseline⟩`, or an entry names it directly or by its column, or its
provenance note begins `fixed:` with its reason; everything else fails — so an `own` calibrate-later cell never dangles. A
cell no entry covers fails naming its column and `plat calibrate register --defaults --milestone <id>`; an entry carrying
`line: 'default'` whose method, due, metric or fallback differs from the default line's (its due `M-CAL`, or — only once
M-CAL's record is committed — the `M-CAL/<layer>` its first history row's milestone gives; a default entry due `M-CAL` still
`provisional` once that record is committed fails, owing its layer's run), or whose `owner` is no document whose source file
holds the column's cells, fails (a hand-edited default is a named line without its section); a default entry beside a named
entry for one column fails as two entries for one knob; an entry, or a stage of one, whose `due` is none of §16's ids, 
V12 §2.8's volume-qualified ids or a `CorpusRunId` fails, naming V12 §2.8's form (`E2`, `U5` and "the raised-way milestone"
fail); an entry whose last cells row disagrees with its target's compiled cells, or lacks a compiled row key, fails by (3)
above. Model constants the volumes keep outside tables, in code, move into a table or take a `thr.` entry. An application
or engineering constant — a UI threshold, an autosave or export limit, a time budget — that its volume confirms by its own
test or performance row under D-18 (V09's autosave limits, `raised.previewOnReleaseKm`, the deck scenes' export cap and
times; V10's T-V10-8 budget row; item 116's margin stop; item 119's comfort level; item 120's interaction budgets; item
121's ladder, ceilings and Auto loop thresholds; item 124's frame cost; item 126's medium-class minimum) is outside the
register: its provenance
note names that test, and no entry is written (J-V12.81). Every §13.7 letter has an entry; every entry's cell or column
exists and is calibratable and every metric it names exists — a catalogue id, or a family member that resolves
(`siting.<spec>` and `bar.<barId>` to a registered bar, `frame.<table>.<column>` to a calibratable column); one mechanism has
one entry and one column; every cell that encodes an OWNER RULE item's hard clause carries its `ownerRule` stamp — the check
reads the stamped-clause list V11's compiler writes; status moves only provisional → confirmed | fallback-applied |
not-achieved | owner-set | fixed (a `corpus` entry closed at its corpus run, with its reason), and confirmed → owner-set (a
later pick) — a staged entry's advance from stage to stage is no status move; a history row is appended, never removed.

**Milestone exits.** At the exit the landing seat appends to each `measure` entry due there — on a staged entry, to each
stage due there — one history row holding each metric it names as the milestone's `ParityReport` gives it (a `bar.` metric:
its bar's statistic and verdict); the entry moves to `confirmed` when every `bar.` metric it names passes and every other
metric meets the condition its line states, and otherwise its fallback opens (V12 §3.7.1 (b)) — or, for an entry whose
cells no run may name (every metric its stage reads a `bar.` member whose bar's `stages` is `[]`), its line's stated
fallback is applied by the exit's seat in the exit's change, recorded by (2)'s cells row, the entry closing
`fallback-applied`. A `frame.*` metric is read only at a `corpus` stage (M-CAL, or the later run that takes its column): at
an earlier exit it is not read and does not hold the entry back, and its history row is appended at that run; an entry
whose every metric is a `frame.*` member is due at its corpus run, and the lint refuses any other due for it (J-V12.70).
`MilestoneRecord.exitCriteria` (§13.3) gains one row per entry due at that milestone, with its status and evidence
(`result` widened to carry `not-achieved`, `owner-set`, `fixed` and `provisional-not-rated`, item 493); an entry still
`provisional` past its due milestone fails the exit — §13.7's JT ("no acceptance run treats an unset value as passed") made
mechanical — except a `panel` entry whose panel is unrated, which reads *provisional — not rated* and never fails an exit.
**Every volume's landing exits green:** a milestone of any volume that lands a registry table, or a calibratable column of
one, exits with `plat calibrate register --check` green over the cells it lands — T-V12-20 runs at PR tier from M1, so the
landing change carries its named lines' entries and the default line's (each owner's §8 exit cells carry it). The register
check needs no input to pass: with no calibratable cell compiled it passes empty.

**Staged entries** (J-V12.79). A line that names more than one stage — "`measure` at `V4-U3` …, then `panel` (V4-U5) at
`V4-U5`, then `corpus` possibility at M-CAL" — writes each of its entries with `stages`, one per stage in the line's order:
its method, its due (a `corpus` stage's a `CorpusRunId` by *The due's corpus run*), its panel on a `panel` stage,
`possibility: true` where the line says "possibility", and `metric` where the line gives the stage metrics of its own; a line
of one stage writes none. The entry's `method`, `due` and `panel` hold its current stage's: the first stage with no passing
row. A stage is read at its milestone's exit, or at its sitting for a `panel` stage, and appends its row with
`stage: { index, outcome }`: (1) a pass that leaves a non-`corpus` stage unpassed appends `pass` and advances `method`, `due`
and `panel` to the first unpassed stage, the entry staying `provisional`; (2) the pass that leaves no non-`corpus` stage
unpassed confirms the entry; (3) a failing stage applies the line's "when it cannot confirm" there — its fallback (a
`fallback` run, or the hand fallback of *Milestone exits* where no run may name the cells), the panel rule's stated second
value, or `not-achieved` — and so closes the entry (`fallback-applied` or `not-achieved`), its later stages still read at
their exits as metrics or panel rows that move no cell and no status; (4) an unrated `panel` stage appends `unrated` and
holds the entry *provisional — not rated*, never failing an exit, its later stages still read at their own exits, and a
later sitting's rated pass (V12 §3.9.1's re-offers) passing it; (5) a `corpus` stage is read at its corpus run whatever the
entry's status then is — a `frame.*` metrics row, and for a `possibility` stage that run's reachability rows (E1) and checks
(E4) — and moves cells only as V12 §3.10 lets a corpus run, into historical packs (R1), never re-opening, closing or
advancing the entry (V12 §3.10.1's closing by the run's record binds entries whose only stage is `corpus`). A staged entry
holding a non-`corpus` stage due at a milestone whose `MilestoneRecord` is committed, with no row of that stage, fails that
exit as an entry past its due.

**The order**, which the lint holds, is §16's (J122's combined order, stated there once): a stage sits at the §16 row it is
built inside — a §16 id at itself; `M3a-V2` at M3a; volume 2's `M6a` – `M6c` at M6, before M6's own exit; `V3-P*` at M6-P
(P0, P1 and P3 after M4, the rest after M6), `V4-U*` at M6-U, `V5-P*` at M6-sky, `V6-E*` at M6-E; `V-M0` after M0 and
`V-M1` – `V-M4`, `V-M2u` in their own order; volume 11's steps at their §16 ids — two stages at one row following their step
numbers (`V4-U3` before `V4-U3b` before `V4-U4`), volume 6's steps by V06 §8's *Order and dependencies* instead (E2, E3,
E5 and E6 in any order after E1, E4 after E1, E7 after E1 – E6, E8 unordered against E7, E9 after E8). A row precedes every row that
starts after it in §16's table, directly or through a chain (M-1 – M4 in their order before every other row; M6 and M6-U
after M5; M6-sky after M6-U; M-CAL after M6-sky; M-SF after M-CAL; M3c after M3a); rows no chain connects are unordered —
M5, the village, M6-E and M6-P's first rungs, which J122 runs side by side after M4; M6-E against M6, M6-U and M6-sky; M6-U
against M5 where it runs beside it with a second pair — and two stages at unordered rows are each read at their own exit,
whichever comes first (the item-102 line's island and drift stages); a `corpus` stage follows every other. The lint refuses a
`stages` list the order places the wrong way round, naming the pair (a `V4-U3` stage before an `M4` stage), a `corpus` stage
before a stage of another method, a stage whose `due` fails the due test, and a staged entry whose `method`, `due` or
`panel` is not its current stage's.

### 3.12 Failure handling — every failure, its rung, its report

No step discards and retries everything: each failure has a bounded ladder (§5's principle, applied to the harness).

| failure | detection | ladder | reported as |
|---|---|---|---|
| a capture fails (session crash, export error) | the capture script | same seed, up to 3 attempts; FTG: the next day, up to 6 days | a plan index in `sample.failed` with its reason — never silently skipped (C7) |
| a reference re-seeds itself inside a capture (MFCG's size-200 retry, sweep README item 6) | its console trace | kept: it is the reference's output for that seed | a row note |
| a capture or plate with degenerate geometry | the adapter (V12 §3.2.2) | the cleaning rule; a capture left empty is a failed index | `dropped: n` in the row note; `sample.failed` reason `empty` |
| FTG payload without a resident count | the adapter | the size's nominal target (§13.6 (2)) | `populationSource: 'nominal'` |
| a metric not computable on a source | `requires`, `scale` | none | `notApplicable`, counted |
| an ⟨M-1⟩ number not measurable or not reproducible | M-1 | none | descriptive and in `known-defects.json` (§13.5) |
| two implementations disagree beyond tolerance | T-V12-3 | find the wrong definition; the product's value supersedes | `baselineShift`, note naming the metric |
| the baselines file absent, unreadable or contradictory | `plat parity` step 1; C1, C9 | none: the last committed file stands | the run stops naming the path or the check (V12 §2.3) |
| a parity row fails at a milestone | `plat parity` | the register's fallback or a tuning run; then the row's own fallback | the exit criterion; *not achieved* where the threshold moved |
| a malformed run spec | the spec check (V12 §2.5) | none | `refused`, rule `spec` |
| a tuning run finds nothing better, fails on holdout, or exceeds its budget | the run | one re-specified run; then the entry's fallback | `rejected` / `aborted-budget` with every evaluation kept |
| two runs claim one cell | the spec check | the second waits for the first to close | `refused` (rule 6) |
| a corpus map unreadable | the adapter | excluded | `excluded: 'unreadable'`; a frame dropping below 20 turns possibility-only |
| a sitting incomplete after seven days | `plat d5 verdict` | re-offered at the next gating sitting or release (§13.6 (7)) | *provisional — not rated* |
| a key that does not match its commitment | `plat d5 verdict` | the panel is void; a fresh sealing and sitting | the owner's answers kept as notes |
| a panel item whose framing target is absent | `plat d5 render` | the next seed of its formula | the replacement recorded in `seeds.json` |
| a statistical bar short of its minimum instances | `plat statbar` | towns in steps of 50 per level up to `seeds.max` | `insufficient`, gating as a fail naming the shortfall; the owner adds a fixture level |
| an `exactMonotone`, `exactBound` or `exactScript` violation | `plat statbar` | none: a property | fail naming the fixture, the record, the step and both values |
| a level's site override cannot be frozen, or its fixture is missing from the manifest | spec registration | none | the spec is refused; its owner states the level through a recipe or dossier input |
| a statistical bar fails on its towns | `plat nullmodel`, `plat statbar` | one re-run on the fresh `c1` family at twice the towns (V12 §3.6) | `suspect`; `pass` on confirmation; `fail` only when both fail, then the fallback |
| a level whose generator has not landed, or a population level outside [1 500, 120 000] | `plat statbar` | none | `notApplicable`, reported, never a failure |
| a spec whose pooled null share exceeds 0.85 (below 0.02 for `lower`), or a `servedShare` / `nnSameKind` spec off town scope, or a `servedShare` spec of more than one class, of a class without a coverage row (`unit: 'coverage'`), of a `settlement`-unit class, or with `minHouseholds` off the district unit | registration | none | refused naming the lint; the owner restates the indicator (a `settlement`-unit class is reported `notApplicable` in its bar) |
| a run spec naming an owner-stamped cell, or a bound below an owner-stamped minimum | the spec check | none | `refused` (rules 2, 5) |
| a known-city StructureCheck fails, or a fixture's input file is missing | T-V12-36; registration | none: the capability or the fixture is wrong | the exit row `T-V12-36:<id>` fails with the check's id and plain `what` (or the missing path); a guard flip when inside a run |
| an owner item's change moves its off-state golden, or an unrelated shift's stage list differs between the sets; a view value changes a model digest; a rung pin's rung moves | the no-op pin (V12 §3.7.8) | none | CI fails naming the pin, the suite, the stage (or the week, festival or rung) |
| a raised bump moves a THORP – TOWN S4 or S5a – S5d isolated digest | the golden tooling at the bump | none | CI fails: not a declared shift (V12 §3.7.6) |
| a witnessed form an owner rule excludes | E1, E4 under R6 | none | an `ownerExcluded` row and an owner question; never a known defect or a layer cell |
| a trial finding naming a calibrated value with no register entry | `plat calibrate register --trial` | none | refused, naming the finding (V12 §2.14) |
| a one-time wait beyond the ten-second comfort level (advance time and the history replay in total); a wait over one second with no progress frame; a stage above its §12 target with no `perf.qualitySpend` row standing, or a row whose `gainBar` fails, whose gain the release's runs do not show or whose run is absent | the wait timer and the budget-register check (V12 §3.15.9) | none at the harness: the owning path takes its §12.10 row's change, or the row is removed by the fixing change and the stage runs its target path (V11 §3.25.8: the quality path runs only while its row stands) | the bar fails naming the wait, rung and seconds, or the `perf.qualitySpend` row and its §12.10 row |
| a Find chip whose matches differ from the gazetteer's rows; a withheld entity in a suggestion, count, glow, pin, ghost pin, gap outline or legend chip; a chip set lost or a match stale after a band, layer or lifecycle step, or a chip dropped when its last match went; a city-band match with no pin or bubble; a chip without its second cue | the `find.*` statistics (V12 §3.15.10) | none: a property | the bar fails naming the fixture, the chip and the entity or step |
| Auto changing level during a gesture or more than once in 10 s; Auto's p95 over the frame budget on the reference or low-end device; a label, chrome or overlay pixel off the device's ratio; an export or the document differing between Resolution settings; the ultra tier's native-4K view over its 512 MB or giving up a light rung | the `resolution.*` statistics and `item121.display` (V12 §3.15.11) | none at the harness: a frame or memory miss takes §12.10's pre-decided change for item 121, a property violation is a code defect fixed before the exit — never a relaxed bar | the bar fails naming the device, the level, the view and the window or the pixel count |
| a look drawn outside its condition's weeks or for a `none`-row condition, differing between the view, an export and a second open, shrinking at a higher severity or rung, off its row's `scale` at its severity, or on water, a gate's passage or a keep-out, or on a way's carriageway as anything save a barrier across it (a `barricade`, a `beast`'s `stakes`, a quarantine's `cordon`; §10.2 (d)); camp looks placed out of `priority` order or together past `densityCap`; a camp's ground off its headcount by more than 10 %; a two-army coalition's ground not twice one army's within 10 %; a camp outside the opening view, Fit or the limit while a look stands; the limit not restored when none stands; a moved view re-framed; a force's remainder without its ring arc; a frame, model or hash changed; a re-skin past the settle bound or looks past 20 % of a tile's raster time | the `crisis.*` statistics, `time.crisisReskin` and `item122.crises` (V12 §3.15.12) | none at the harness: a raster miss takes R12-37's pre-decided change, a property violation is a code defect fixed before the exit | the bar fails naming the fixture, the condition, the look and the week, the force or the tile |
| an element damaged at a level or week and undamaged at a higher level or a later week of its decay run; an element breaking at a different level after a regeneration, a load, an undo or a migration; a never-decayed building drawn or exported differently | the `damage.*` statistics and `item123.damage` (V12 §3.15.13) | none: a property | the bar fails naming the fixture, the building, the element and the levels or the lifecycle step |
| an effects frame over its cost; snow falling or lying on an `arid` or non-freezing row; arid rain off its row's frequency or in its dry weeks; a label, halo, chrome or overlay pixel a spell changed; a luminance change past §8.4 (i)'s limit, or a flash; a timeline that does not replay; a tile re-rastered or an export changed by the effects | the `weather.*` statistics and `item124.effects` (V12 §3.15.14) | none at the harness: a frame-cost miss takes §12.10's pre-decided change for item 124, a property violation is a code defect fixed before the exit | the bar fails naming the climate row, the week, the spell and the frame or pixel count |
| on the required-keys dossier a used field absent with no fallback reported, or a stage ending without output; a document or hash differing with and without a host context | `port.fallbacks` and `item125.host` (V12 §3.15.15) | none: a property | the bar fails naming the field or the stage, or the host context and the first differing record |
| a tool's touch script not completing at 600 × 480 with `AppPrefs.touch.editFabric` on; below the medium class a layout other than the medium layout at its minimum, a tool withheld or greyed, a page that does not scroll, or the document, view or selection changed by a resize | the `layout.*` statistics and `item126.resize` (V12 §3.15.16) | none: a property | the bar fails naming the tool or the resize step |
| a `known-defects.json` entry this volume opened is cleared | the run, report or release that clears it | — | closed, never deleted, listed in `MilestoneRecord.knownDefects.closed` with the clearing id |

Every record of this table is repository data: a document's save, load, undo, regeneration or migration never reads or
writes it, and a record reverted with its change leaves the entries it opened closed by that revert. A missing
`known-defects.json` reads as empty and is created by the first entry opened.

### 3.13 Determinism

All randomness in the harness comes from `TestStream(label)` — xoshiro128\*\* seeded by H128 of the label (the published
generator and hash of §17.1 (8)) — with structured labels (`null/<spec>/…/perm`, `null/<spec>/…/tie`, `bldg.r4/<seed>`),
never a clock; the pooled exact test's convolution runs in integer-indexed doubles in town order with a fixed summation
order, and verdicts are computed on unrounded values; the known-city fixtures seed from `known/<id>`; only the panel's
sealing salt comes from the operating system, by design (V12 §3.9.3). Metric code uses `dmath`; per-town work runs in
workers and merges in seed order. A `ParityReport` has one canonical form: rows sorted by (reference, metric, rung in the
ladder's order THORP … METROPOLIS then the building, hood and village bands, preset); numbers written with six significant
digits by our own formatter (round half to even on the decimal string, never the host's float printing); keys sorted — so
the same inputs give the same bytes on every host, and a report's hash in a run record is a check (J-V12.9). A report with
no row is its header alone, canonical like any other. A calibration run's spec, seeds and evaluation order are fixed
before it starts, so re-running a spec reproduces every evaluation (T-V12-8).

### 3.14 The known-city fixtures — one engine for both (item 110 (e), (f); J78; T101-6)

**3.14.1 What they are.** Two acceptance fixtures of the authoring toolkit, each an original skeleton with a city's
structure and our own names: **K1**, J78's (T101-6), and **K2**, item 110 (e)'s second fixture ("both known-city fixtures
pass", item 110 (f)). This section is their one statement of setting, seed, structure list and golden: V09 §7.2 cites it
for its dedicated-user checklist and thresholds, V10's evaluation group A reads the fixture record; the types are 
V12 §2.12. Their canvas scripts are V09's content, their transcripts V10's, the building bars on K2 V02's (T-V2-44 –
T-V2-47, T-V2-51 on its terraced wards and T-V2-42's arena part), the vault bars V04's (T-V4-62 – T-V4-70), and V01's T-V1-54 re-runs K2's skeleton with stage 2 on at M5.

**3.14.2 Inputs, authors and the clean room.**
* **K2's brief** is written from item 110 (e)'s list alone, in our words, with our own names — drawn from our naming
  tables at the fixture's seed or invented by the seat. This volume names no reference city, ward or landmark and cites only
  "item 110 (e); J114". V09 §7.2 holds the brief's current draft (its six ward names are our own); the file is `brief.md`.
* **Who writes them.** The brief, the skeleton, the canvas script and the transcript are authored by implementer-tier seats
  that hold only the base and the volumes (§17.1 (1)); none of them opens `research/reference-maps/` or `docs/experiments/`,
  and T101-6's text points an implementer at nothing research-side (item 489).
* **The name scan.** Item 536 adds the place, ward and landmark names legible on the study-only reference maps
  (transcribed research-side, digests only) to §17.1 (5)'s deny-list, so `namesClean` (0 scanner hits on
  `plat/tests/fixtures/known-city/**` and `plat/goldens/known/**`) catches a carried name.
* **No outline traced.** At M3a's exit the checker seat compares each fixture's `ink` render with its study image,
  research-side, and records the verdict "no outline traced" as evidence in the `MilestoneRecord`'s exit row; only the
  verdict crosses into `plat/`.
* **Files.** Inputs in `plat/tests/fixtures/known-city/<id>/` — `brief.md`, `skeleton.plat`, `canvas.json` (V09),
  `transcript.json` (V10: at M3a a scripted transcript of tool-API calls, from M3c V10's cassette); the fixture record and its
  golden in `plat/goldens/known/<id>/` (`fixture.json`, per output version the model digest and the StructureResults;
  J-V12.58).

**3.14.3 Three authoring paths (J-V12.41).** Each fixture is authored T101-6's three ways: the skeleton file, V09's canvas
script, and the tool API from the recorded transcript. The skeleton file and the canvas script share one model digest under
the fixture's seed (differing digests fail T-V12-36 naming both); the structure list holds on all three; and its
**emulation subset** — the checks whose entities are all declared at L1 or L2 by §7.1's level table, computed at
registration, never hand-listed — holds on V09's variant declared only to L2. Item 110 (e)'s "authored both ways" names the
two paths that share a digest; its "the same acceptance bars as the first fixture" brings the third.

**3.14.4 Settings and seeds.** K2: CITY, 20 000 people (the rung's default, §1.1), water `coast`, seed `known/K2` →
3205843448. K1: CITY on its declared coast and river, as T101-6's brief declares, seed `known/K1` → 3403473561. The seeds are
family `known` at priority 1 (V12 §2.4), in the collision domain of every lower-priority family.

**3.14.5 K2's structure list.** Written from item 110 (e) alone; no check adds a feature item 110 (e) does not name. Every
threshold follows from the brief's declarations, never from a count the rules may or may not fill: generated extras — a
viaduct the site calls for at CITY, more retaining walls, more towers — are reported in `extras`, never failed (J-V12.57).

| id | check (the `what` line is the plain sentence the report and the dedicated-user checklist print) |
|---|---|
| K2-1 | `enceinte`: the outer enceinte closed by `shore` (item 106's barrier closure); its built stretches one open chain with both ends on the shoreline within 1 m; ≥ 2 towers; ≥ 1 land gate with a square touching its inner side (the gate plaza) |
| K2-2 | `harbour`: a basin whose mouth a mole bounds; a fort at the mole's head; a tower within 20 % of the mole's length from its midpoint |
| K2-3 | `causeway`: from the mole or the shore to an islet of ≤ 1 ha that holds a lighthouse |
| K2-4 | `anchorage`: ≥ 8 declared jetties outside the mole's basin, with deck-plot buildings standing on ≥ 4 of them (the deck rows fill piers by chance — a deck "may carry plots", item 110 (d)) |
| K2-5 | `terracedWards`: ≥ 3 terraced wards, each bounded at least in part by an enceinte of kind `inner`, together holding ≥ 10 retaining walls (drawn by T3 `retaining` or the edges of T2 terrace strokes, item 110 (a)) |
| K2-6 | `stairOrRamp`: every way crossing a retaining wall is a stair or a ramp there |
| K2-7 | `ringStreet` × 2: ring streets round the two declared precincts |
| K2-8 | `raisedWay`: the one declared raised straight road (T4 with `raised` on) — its largest chord deviation ≤ 2 % of its length; it crosses ≥ 2 part-0 ways with 0 junctions; both ends ramps or stairs on part-0 vertices |
| K2-9 | `ravineQuarter`: a ravine (a T2 stroke) under a declared quarter with ≥ 5 retaining walls and item 70's informal clusters — the stepped housing |
| K2-10 | `stepped`: a stepped temple of ≥ 4 tiers (V02's `stepped-temple` row; T-V2-44 checks the tiers themselves) |
| K2-11 | `landmark`: an arena (V11's `arena` class) |
| K2-12 | `quarter` per declared ward, present by name and kind, and `namedPlaceInQuarter`: every named place in its declared ward (T101-6's clauses) |
| K2-13 | `namesClean` |

A check whose target entity comes out degenerate (a declared raised road of zero length, a ward with no area) fails naming
the entity, never passing vacuously.

**3.14.6 K1's structure list** runs on the same engine: T101-6's three clauses (every declared quarter by kind and name,
both enceintes with their gates, every named place in its declared quarter) and V09 §7.2's checklist — two enceintes, nine
gates, three region labels, every named place present and in its region, the bridge fortress, the cemetery on the cliff, the
satellite across the river — each cited, plus, since item 110 (d) un-stages them, **the bridge fortress's bridge carries
deck plots with ≥ 1 building**. K1's golden moves with the deck switch-on bump, declared (V12 §3.7.6).

**3.14.7 The bar T-V12-36, tiers and exits.** The milestone tier runs all three paths of both fixtures from M3a, as T101-6
(§13.8); the PR tier runs K2's skeleton path only (one CITY generation, ≤ 5 s, V12 §6). A failing check names its id and
its plain `what`. The `MilestoneRecord.exitCriteria` carry one row per fixture, `T-V12-36:<id>`, listing the failing checks.

**3.14.8 The golden and its shifts.** Each fixture's golden — per output version its model digest and StructureResults — is
recorded at M3a and moves only by declared shifts that name it (`ShiftRecord.seeds[].fixture`, item 492): item 110's
switch-on bumps (V12 §3.7.6), stage 2's landing at M5 (T-V1-54), and any other table bump that moves it; an upgrade (§7.5)
of a fixture document is such a shift. A capability absent at M3a fails its StructureCheck at M3a's exit — no deferral (the
owner's no-defer rule): §16's M3a row carries item 110 (a) – (d)'s base parts (items 244, 245, 290; V02's BCR-V2-39),
raised-way generation among them. The fixtures are test documents: save, load, undo and regenerate act on them as on any
document, and the skeleton path regenerates from the skeleton file.

**3.14.9 Guards and consumers.** Both fixtures are in every calibration run's `fixtureSuites` (V12 §3.7.5): a chosen
candidate that fails any StructureCheck is rejected (two CITY generations and a few seconds). Both are no-op pin suites
(V12 §2.13). K2 is the first item of the M4-110 group (V12 §3.9.1). V03's B-PLAN click set includes both from P1.

### 3.15 The owner rules 111–126 on the harness

Each item's bars are §13.2's, numbered there (T111-1 – T126-3), item 122 (h)–(i)'s four bars this volume's own
(V12 §3.15.12); this section registers the part of each that runs on this volume's machinery — its specs, pins,
metrics and register lines — and names the owner of every other clause. Items 120 – 126's statistics and pins measure
fixture properties: each clause they measure is on the harness registry's `conformance` list (§13.2's convention
(6)), none a tendency bar asking for a spec (T-V12-35). Spec ids are this volume's (`T111d.walk`, as `T110b.*`), each a `StatBarSpec`
or `NullModelSpec` carrying its base bar as `ownerBar`; a base bar registered as a `BenchBarDef` takes the bar's own id
(V12 §2.1). Their seed families follow V12 §2.4 under the spec id. Tiers and milestones are §13.8's, items 120 – 126's
placed by §16 (J122): Find at M5, item 121 at M4, items 122 and 124's base parts at M3b (the `disaster` look's district clauses at M5), item 123 with V03's
damaged-plan step and V06's decay level at M6-E, item 125's bars at M-SF and item 126 at M2a.

**3.15.1 Item 111 — water in dry country.** The levels fix the climate row by a frozen S0–S1 site override (`site.climate`)
at each rung; the village rungs join from V-M4 (`requires: 'V07'`, V07 running the item at its rungs).
* **T111-1** — `T111d.walk`: `higherWith` over `walkToWater` per household (deflated by the design effect, V12 §3.6b),
  the factor the climate row, arid against temperate, strata TOWN, CITY and METROPOLIS, 200 towns per cell.
* **T111-2** — conformance (the base's): an oasis stands only on an arid site unless drawn (T2 `ground`'s spring flag) or
  supplied by a dossier's `oasis_water`; `water.kinds` reports every oasis by source, and a `generated` oasis on a non-arid
  row is the bar's violation; T2's spring-fed oasis is V09's T-V9-71.
* **T111-3** — `T111d.water.river`, `.lake`, `.coast`: `rate` (`exact`) of the `water` indicator against `waterChance` at
  the arid row, `stopAfter` S1, ≥ 200 towns per kind and rung.
* **T111-4** — `T111d.rich`: `most` (default 2/3) over the per-town `richNearerWater`, arid TOWN, CITY and METROPOLIS,
  ≥ 100 towns from ≥ 20 per rung.
* **T111-5** — the pin `item111.water` (V12 §2.13). A failing spring over epochs (the pull weakening, the quarters around
  it declining) is V06's bar on its engine.
* Register lines: V12 §3.11's *Items 111–119 by column* (the pull and term cells `measure` at M2b on T111-1 and T111-4;
  the chance, grove and garden rows on the default line).

**3.15.2 Item 112 — the style check's line and the game-master trial's findings.** T112-1 (the style check) is the base's
bar, registered as a `BenchBarDef` (`bar.T112-1`: the least simulated-deficiency contrast over every category pair every
legend distinguishes, in every shipped family's checked variants `protan`, `deutan` and `tritan`, and whether each
category's second cue is drawn at its legend-bearing stops; pass when the contrast meets §8.2's threshold and every cue is
drawn); its threshold's register line is V12 §3.11's, `notAchieved: true`, a failing variant fixed in its colours. **The
trial** (item 112 (b); T112-2) is run and recorded by V09 §7.6 — ten to twenty SettlementForge game masters recruited
through its community, each using the map on their own settlements for at least two sessions of play before the public
release, thanked by credit and early access, no payments — its `TrialRecord` the release gate's (§16). **Its findings
enter the calibration record and the fix list** by V12 §2.14's `--trial`: a `trial` row on each register entry a finding
concerns and a `known-defects.json` entry for every finding not yet fixed.

**3.15.3 Item 113 — history at generation.** V06 runs the replay and item 113's bars on its engine; V04 runs T113-4 and
T113-5 on the underground's output; V08 supplies the dossier's history fixtures; the History chip is V09's T-V9-73. This volume registers:
* **T113-2** — the replay's byte-stability: the history fixtures' model digests in §13.8's nightly five-engine digest run,
  compared across engines (C: one digest).
* **T113-5** — `T113e.lost`: `exactScript` with property `voidLostAndRefound` on V04's LOST fixtures — a void whose last
  open link is a sewer run, and one whose last is a cellar access — scripted as the base's own events: an epoch that seals
  the run (V06's decline), then an epoch that grows over the closed run and reopens it (V04's J-V4.29); an author `delete` of
  the building over the cellar access, then V04's dig on a new building over the void. After each closing step the void is
  LOST (drawn faded like an unexcavated void) and its dwellings are emptied by the base's vacancy rules; after each
  reopening step its access state and dwellings return; 0 violations. Owner `base` (ownerBar T113-5), run by V04 at M6-U
  (at the later of M6-U and M6-E, §13.8).
* **T113-7** — the pin `item113.history`.
* **T113-1, T113-3, T113-4, T113-6** — conformance on V06's and V04's fixtures; their statistics are the `bar.` members the
  item-113 register line names (V12 §3.11), each a `BenchBarDef` its owner registers.
* **The register line** — V12 §3.11's item-113 line, `measure` at `V6-E9` (the replay's step) on those conformance bars,
  then E4's historical checks at its corpus run.
* **The replay's budget** — its wait is `wait.historyReplay` (V12 §3.15.9), measured click to complete in total — the
  peak's generation and every replay epoch, never per epoch (item 119 (a2)) — on the history fixtures at every rung (their
  peaks up to METROPOLIS) against item 119's ten-second comfort level, with V06 §6.7's replay budget reported beside it as
  the target and the cadence the run used (V06's coarsening); the harness's own cost of the item-113 bars is V12 §6's row.

**3.15.4 Item 114 — walls that decay and recover.** V06 runs the transitions over epochs (T-V6-73) and V07 the
palisade's (T-V7-62); V08 supplies readiness and wealth (T-V8-52). Of item 114's bars:
* **T114-1 – T114-3** — a poor, threatened fixture shows patched runs and no robust rebuild; a rich, threatened one rebuilds
  in stone; a safe one decays through `worn` to `breached` — conformance on V06's wall fixtures, `wall.condition` their
  statistic;
* **T114-4, recovery replaces patches oldest first** — `T114g.oldestFirst` (`ownerBar` T114-4): `exactScript`
  `patchesOldestFirst`, the order read from the week of each run's last-change epoch (`EpochRecord.inputs.week`; §6.1 —
  never the epoch's number, so a replay epoch orders by its week, before every live one), over H-100's epochs and
  T-V6-73's history-first recovery fixture;
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

**3.15.6 Item 116 — the zoom-out limit.** T116-1 — at every rung from THORP to the cap the limit shows the whole bounds, or
is stop 0 where they do not fit (§8.8; J122), and no stop beyond it is reachable — is a conformance sweep on B-ZOOM (§13.4)
over B-CITY-lite's seeds of every rung and V07's village fixtures (V07's T-V7-64), its statistic `view.limitStop` (0
reachable stops beyond the limit; the whole bounds inside the limit's view, or the limit at stop 0 where they do not fit —
the METROPOLIS cap's frame in a 1 280 × 720 and a 600 × 480 CSS-px viewport among the cases), reported in the nightly
statistics; T-ER-08's restatement and T116-2 – T116-4 (the first view
unchanged, the limit moving with the bounds, every export within the limit bounds — the whole bounds at most, a
whole-bounds export at the cap framing them, §8.7) are the base's render bars; the view controls
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

**3.15.10 Item 120 — Find, a view.** V09 builds Find — its panel, type-ahead, chip grid, results list, the `live.find`
overlay provider and Coverage folded into Show gaps — and runs its screens' bars, its T-V9-83 taking T120-2 – T120-5's
interface clauses on these fixtures; this volume measures T120-1 – T120-6 with one pin, five statistics and two
timings, each 0 by rule or within its budget, from M5 (§16) on V09's app harness over the Find fixtures: B-CITY-lite's seeds of every rung, V07's village fixtures and a dossier fixture (its institutions'
names first), each with three chip sets — one institution kind, one named place or area, one chip spanning several kinds
(an "all smiths") — drawn from the kinds the town holds by the testkit stream `find/<seed>` (V12 §3.13), with Show gaps off
and on:
* **T120-1, the document hashes identically with Find on and off, and turning everything off restores byte-identical
  tiles** — the pin `item120.find` (`view`, `tiles`; V12 §2.13): each suite document opened with Find `off` and with each of its chip
  sets gives one model digest and identical saved bytes, the edit log included, and the tiles drawn after Clear equal the
  pre-item tile goldens (Find is an overlay and never re-renders a base tile);
* **T120-2, each chip's matches equal the gazetteer query's rows at the key** — `find.matches`: per chip, the entities Find draws
  against §11.2's gazetteer rows for the chip's class, name or area at the view's key, mismatches counted;
* **T120-3, the knowledge canary never surfaces** — `find.leaks`: on T-V9-66's canary fixture (V10's T-V10-6) under a player view,
  every suggestion, count, glow, pin, ghost pin, gap outline (Show gaps on) and legend chip naming a withheld entity;
* **T120-4, the filter survives every band and layer change and every commit, advance, undo, redo, regenerate, load and
  migration** — `find.held` over a step script on each fixture document: the city, neighbourhood, building and interior
  bands in turn, Ground, Below and Sky in turn, a commit that adds a match and one that removes a chip's last match, an
  `advance` where the document admits one (V06), an undo, a redo, a regenerate, a save and load and a migration — at
  every step the chip set unchanged and its matches equal to a fresh evaluation there (a new match glowing, a removed one
  dark), a chip whose last match went staying in the set at count 0, dark;
* **T120-5, at the city band every match has a pin or a bubble** — `find.pins`: matches with neither, at every city-band stop from
  item 116's limit inward;
* **T120-5, every chip has its second cue** — `find.cues`: chips without their own glyph and halo dash pattern, over chip sets of
  one to twelve chips (past eight the colours repeat and the glyph tells them apart);
* **T120-6, the interaction budgets of item 120 (j) hold at the metropolis cap** — `time.findSuggest` (a key to its suggestions
  drawn) and `time.findGlow` (a chip's click to its matches' glow drawn) in §12.1's timing phase at the METROPOLIS cap,
  against §12.5's overlay budget, their rows among V12 §3.15.9 (5)'s interaction rows.
The five statistics are C rows of the nightly statistics, each 0 by rule; a non-zero value fails its bar naming the
fixture, the chip and the entity or step (V12 §3.12). Find adds no `StatBarSpec` (its clauses are properties of one view,
not tendencies) and no register entry (V12 §3.11). The clerk's "show me" is V10's bar, the list entries V08's, the
lexicon V11's, the area targets and Show gaps' units V01's, the interior rooms V03's, the matches and ghost pins on Below
and Sky V04's and V05's, the village rungs V07's — each volume's own part of item 120.

**3.15.11 Item 121 — the resolution adjuster.** §8.8 builds the Resolution ladder, the 4K ceiling, the ultra tier and the
Auto loop, §8.4 (g) the order of what Auto gives up, §12.1 the ultra tier's bar and §12.8 the canvases per tier; V09 builds
Settings › Display › **Resolution** (`AppPrefs.resolution`), the view-status chip and the fallback line, its T-V9-84 taking
T121-1 (Auto the default on a fresh install), T121-4 (a manual level honoured, or the nearest that fits drawn and said) and
T121-7 (a device-pixel-ratio change re-evaluated at once). This volume measures the other five clauses, from M4 (§16), on
V09's app harness — T121-2, T121-3 and T121-8 in §12.1's timing phase, T121-5 at PR (§13.8) — on three
**device fixtures** — the reference device (its frame budget 16.7 ms),
the low-end device (the low tier, 33.3 ms) and an ultra-tier device (the tier picked by §12.1's bar) — over §12.5's
reference viewports at every rung's top and the METROPOLIS cap:
* **T121-2, no oscillation** — `resolution.changes`: under Auto, a scripted 120-second session of pans, zooms and drags,
  each followed by a settle, on each device's reference viewports and on the **threshold fixture** — a CITY view whose layers
  and lighting put its frame-time p95 just over the reference device's budget at one rung and under 60 % of it at the rung
  below, so a loop without its spacing and hold would alternate — gives 0 changes applied during a gesture and at most 1
  in any 10-second window;
* **T121-3, Auto holds the frame budget** — `resolution.p95`: Auto's rolling frame-time p95 over each reference viewport on
  the reference and the low-end device at most the tier's budget (§12.5), the first 10 seconds after the open excluded
  while the start-up pick stands; a device below the low tier is reported per device (§12.1), never gated;
* **T121-5, labels and chrome at the device's ratio** — `resolution.textPx`: on a device fixture of pixel ratio 2, at each
  of Auto's rungs and each manual level, the view with its labels, chrome and overlays on (Find's halo, the handles, the
  ghost) is captured on V09's harness (T-V9-84 takes the captures) and the pixels inside those marks' boxes compared with
  the same view drawn at the device's ratio: 0 differences — the base tiles may soften, the text layer never;
* **T121-6, exports and the document unchanged** — the pin `item121.display` (`view`, `exports`; V12 §2.13): each suite
  document opened at Auto and at each manual level gives one model digest, identical saved bytes and byte-identical
  picture, print and battle-map exports;
* **T121-8, native 4K on the ultra tier** — `resolution.ultra4k`: on the ultra-tier device holding a native-4K view
  (3 840 × 2 160 device px) lit at full precision, the canvas memory §12.8's measurement reads is at most the tier's
  512 MB and no light rung is given up over the reference viewports.
A screen above 4K (a 5K and an 8K fixture) is drawn at its 4K-equivalent tile DPR (§8.8's ceiling): `resolution.textPx`
holds there too and the view status names the ceiling as the reason. The ladder, the ceilings and the loop's thresholds
are engineering constants (V12 §3.11); a miss of T121-3 or T121-8 takes §12.10's R12-36 change (the thresholds or the
ultra tier's bar re-declared at the measured values), never a relaxed bar. Item 121 adds no `StatBarSpec` (every clause a property or a budget) and no register line.

**3.15.12 Item 122 — crisis looks, with (h)–(i)'s forces and framing.** The base draws the looks (§2.9's `crises` key and
crisis framing, §7.7's DR44, §10.2's table and placement, §8.2's look rows, §8.8's ring); V08 reads the conditions, the
calamities' targets and the force and group sizes; V11 writes the rows; V06 hands the aftermath to the epoch path; V09
builds Show crises, the preview and the panel's numbers. Of item 122 (g)'s bars, T122-4 (every stressor type and archetype
has its map row) is V11's compile check (T-V11-46) and V08's census at the pinned baseline (T-V8-59), V09's T-V9-85
takes T122-2's interface clause, V06's T-V6-75 T122-1's hand-over clause and V03's T-V3-40 the plan clauses of T122-1 –
T122-3 and T122-7; V01's T-V1-60, V02's T-V2-60, V04's T-V4-82 (i), V08's T-V8-60 and V10's T-V10-52 test their own
parts; this volume measures the rest on its **crisis fixtures** — from M3b (§16) each look kind previewed (`crises`
`preview`, at `previewSeverity`) on B-CITY-lite's seeds of every rung, an island town and an unwalled place, the
`disaster` preview's district clauses (its units, scale and placement under T122-2, T122-3, T122-5 and T122-6) from
M5, when V01's W10 lands (§10.2 *Crisis looks*; §13.8); from M-SF V08's dossier crisis fixtures
(V08 §7.1) — a siege by a two-army coalition, a refugee wave, a plague with its affected quarter, a famine, a fire, a
flood and an earthquake, each of the last three a calamity with its linked `reconstruction` condition (V08 §3.16 (7)
(b)), and an occupation — each standing through part of the year, with one week in which a siege, a quarantine and a
refugee wave stand at once at CITY and at the METROPOLIS cap, their camped ground together past `densityCap` (at the
village rungs V07's village fixtures, V07's T-V7-69 taking T122-5's and T122-6's village clauses there):
* **T122-1 and T122-7, a look only** — the pin `item122.crises` (`view`, `tiles`; V12 §2.13): each suite document opened
  under `follow` in every week, `off` and each look kind's `preview` gives one model digest and identical saved bytes, the
  edit log included; with no condition standing and no preview its tiles equal the pre-item tile goldens;
* **T122-2, each look exactly in its condition's weeks** — `crisis.weeks`: through all 52 weeks of the fixture's year and
  across each window's ends — a condition with no `untilWeek` and one whose `untilWeek` is not after its `sinceWeek` among
  them — and, under a player view, any look drawn for a `none`-row condition carried beside the looks counted as a
  mismatched week, and each look-bearing condition's look drawn in its weeks at every key (`public`, DR44): 0
  mismatched weeks;
* **T122-3, byte-stable per seed** — `crisis.stable`: a look's tiles in the view, in a picture export at the same stop
  and in a second open of the document byte-identical per seed (keyed draws, §8.10);
* **T122-5, scaled by tier and severity, and by headcount** — `crisis.scale`: over a rung sweep THORP – the METROPOLIS cap
  at one severity and a severity sweep at each rung, no look's drawn extent falls as the rung or the severity rises; and,
  at each rung and at severities 0, ½ and 1, each look §10.2 (c) sizes by severity (no headcount and no count given;
  every preview among them) is drawn at its row's `scale` at that severity (linear between its two ends) — its camped
  ground, the ring remainder counted at §8.8's ring density, within 5 %, else its units the count §10.2 (c) gives that
  share of its place's units — a `disaster` look's max(k, |`matched`|), k that count, or all of a shorter fire order
  (V01 §3.16 `disasterSource` (5)) — (`crisis.scale`'s second count, 0 by rule); its headcount clause is item 122 (h)'s area bar
  below;
* **T122-6, never on water, a gate's passage or a keep-out, and the outskirts shared by priority under the cap** —
  `crisis.blocked` 0 — water, a gate's passage and a label's keep-out, and a way's carriageway save a barrier across
  it (a `barricade`, a `beast`'s `stakes`, a quarantine's `cordon`; §10.2 (d)), the previews of `blockade`, `raiders`,
  `rebellion`, `beast` and `quarantine` among the kinds checked; and, on the week standing
  a siege, a quarantine and a refugee wave at once at CITY and at the METROPOLIS cap, the camp looks taking the outskirts
  in `priority` order, each from what the earlier left, together at most `densityCap` of the outskirts' free land, the
  rest on the ring (`crisis.share`, 0 by rule; §10.2 (e));
* **the looks' raster** (§12.10's R12-37) — `time.crisisReskin` and `crisis.rasterShare` in §12.1's timing phase from
  M3b, on the golden views of every family at every rung with the crisis fixtures: each re-skin within §12.5's settle bound
  and the looks within 20 % of a tile's raster time, a miss taking R12-37's pre-decided change.
**Item 122 (h)–(i)'s four bars are this volume's own** (T-V12-55), from M-SF on V08's **force fixtures** — single armies
of 1 000, 4 000 and 12 000 heads; a coalition of two armies of 4 000 beside one army of 4 000; a migrant group of 3 000;
a 60 000-head siege of a THORP, too large for its frame and margin — the armies, the coalition and the group each at
TOWN, CITY and the METROPOLIS cap:
* **the camped area proportional to headcount within 10 %** — `crisis.areaPerHead` in [0.9, 1.1] for every army and
  group, a ring remainder counted at §8.8's ring density;
* **two armies twice one** — `crisis.coalition` in [1.8, 2.2], each army in its own camp and colours (§10.2 (f));
* **the opening view contains every camp** — `crisis.framing`: while a look stands no camp lies outside the opening view,
  Fit's view or the limit's view (the bounds of town and camps, §2.9; the limit at stop 0 where they do not fit, §8.8),
  the previews' camps included from M3b;
* **the limit restored when the crisis ends** — `crisis.framing`: in the first week no look stands, the limit's stop is
  item 116's (`view.limitStop`'s), a view coarser than it settles to it about its own centre, and a view the user moved
  while the look stood is never re-framed.
Item 122 (i)'s overflow is `crisis.ring`: the 60 000-head siege fills its frame and margin and draws its remainder as
massed marks on the ring at the city band — the panel's full number is V09's (T-V9-85) — the frame, the margin, the model
digest and the hash unchanged. Item 122 adds no `StatBarSpec` (every clause a property of a look) and no register line
(V12 §3.11).

**3.15.13 Item 123 — a ruined building's plans amended, never redrawn.** V03 draws the damage layer over the one plan
(§2.6 step 7, §8.6), its exports and panel lines; §6.3 keys each element's threshold (`plan.damage`); V06 derives the decay
level (`decayLevel`, from M6-E; before it a building reads its existence state at V11's default age); V02 draws the
exterior from the same thresholds; V04 the cellars, crypts and underground buildings. Of item 123 (f)'s bars, T123-1 (room,
wall and opening ids identical between the intact and the damaged plan) is V03's and V04's, T123-4 (restoring reverses
it) V03's and V06's, T123-5 (the exterior agrees with the plan) V02's and T123-6 (battle-map line of sight follows fallen
walls) V03's and V04's; this volume measures three, from the V03 step that draws a decayed or ruined plan (V03 §8; §16),
on the **damage fixtures** (V03 §7) and from M6-E over H-100's decay runs:
* **T123-2, damage monotone in the decay level** — `damage.nested`: each building's damaged elements at the levels 0,
  0.05, …, 1 (§6.3's one comparison evaluated at each), and from M6-E at every week of V06's decay runs, contain those of
  every lower level or earlier week of the run — 0 elements damaged at one and undamaged at the next; V04's T-V4-82 takes
  the clause below ground;
* **T123-3, the same element breaks at the same level for a seed** — `damage.breakLevel`: each element's lowest damaged
  level identical across a regeneration from the same seed, a save and load, an undo and redo of an unrelated edit and a
  migration; across the five engines it is determinism §6.5 (9)'s run;
* **T123-7, a building never decayed is byte-identical to today's plan** — the pin `item123.damage` (`entityScope`;
  V12 §2.13): every building whose lineage never held `abandoned`, `decayed` or `ruined` drawn and exported
  byte-identically to its off-state set at every band and week, the damage fixtures' plans registered by V03
  (T-V3-39 (g)), the damage sub-fixture's exteriors by V02 (T-V2-59 (d)) and the underground's bands and per-band
  exports by V04 (T-V4-82 (g)).
Item 123 adds no `StatBarSpec` and no register line (its cells take the default line, V12 §3.11).

**3.15.14 Item 124 — intermittent light weather.** §8.8 draws the effects layer, §8.2 its marks and §8.4 (i) its light
terms within its photosensitivity limit; §6.1 seeds the timeline per session (`view.weather`); §2.9 keeps the spell
session-transient and the switch device state; V11 writes the climate rows' weather columns, the two hard rules its compile
checks; V09 builds **Weather effects**, **Start a shower now** and the defaults, its T-V9-87 taking T124-5 (off by default
under reduced motion and on the low tier). This volume measures the rest, from M3b (§16), on V09's app harness over its
**weather fixtures** — a fixture town on every climate row of V11's table through all 52 weeks, the session seed drawn by
the testkit stream `weather/<fixture>` (V12 §3.13) and the view time stepped by the harness's clock, never the host's:
* **T124-1 and T124-8, a layer only** — the pin `item124.effects` (`view`, `cache`, `exports`; V12 §2.13): each suite
  document opened with the effects off, on with no spell, under each spell kind in force and after **Start a shower now**
  gives one model digest and identical saved bytes, leaves the tile cache untouched — no tile re-rastered or re-composed
  by a spell — and gives byte-identical exports;
* **T124-2, ≈ 1 ms at the densest spell** — `weather.frameMs` in §12.1's timing phase on the reference and the low-end
  device over §12.5's reference viewport, against §12.5's figure on the reference machine, a miss taking §12.10's R12-38
  change;
* **T124-3, no snow where the winter does not freeze** — `weather.snow` 0 over all 52 weeks of every `arid` row and
  every non-freezing row, a carried `snow` cover among the cases (drawn `clear`, §2.9, §8.2), V11's compile check beside
  it;
* **T124-4, arid rain within its row** — `weather.aridRain`: per `arid` row and week band, over a simulated clock long
  enough that the row's column expects at least 50 rain spells in the band, the observed count within three standard
  errors of the expected (a Poisson count), and 0 rain spells in its dry weeks over a year of them;
* **T124-6, labels and chrome never covered** — `weather.cover`: 0 pixels of a label, a halo, the chrome, a Find glow or
  a handle changed by any spell, a pixel test over V09's captures;
* **T124-7, no luminance step faster than the photosensitivity limit** — `weather.luma`: the view's mean relative
  luminance per frame through each spell kind's onset, standing and fade at 60 frames a second, its largest change in
  any one second within §8.4 (i)'s limit, and 0 flashes;
* **T124-9, the timeline replays** — `weather.replay`: two runs from one session seed, clock and set of presses give the
  same spells; across the five engines it is determinism §6.5 (9)'s run.
Item 124 adds no `StatBarSpec` and no register line (its weather columns and the `settings.weather` block's numbers take
the default line, V12 §3.11).

**3.15.15 Item 125 — the dossier the only data input.** The port reads SettlementForge only through the dossier (§11.3 –
§11.4; V08's field table, each field with its standalone fallback); a `HostContext` carries no data input — its
`audience`, `displayNames` and `line` change no document a dossier makes (§11.4); §7.7's DR1, DR3, DR19, DR29 and DR42 read
the dossier or the generator's fallback. Of item 125 (e)'s bars, T125-3 (no code path of the port reads anything but the
dossier, a static check of the adapter's imports and reads) is V08's; this volume measures two, from M-SF (§16), V08's own
tests taking T125-1 and T125-2 on the port's fixtures beside them:
* **T125-1, a required-keys dossier makes a full map** — `port.fallbacks`: the **required-keys dossier** (V08's fixture
  holding only SettlementForge's required keys, in §13.2's frozen manifest) at every rung — THORP, HAMLET and VILLAGE
  through the village product (V07; the port's router hands a dossier below 1 500 people to it, V08 §3.10), TOWN, CITY
  and the METROPOLIS cap — generates every stage's output, and each field V08's table lists as read that the dossier
  lacks has its report line naming the fallback taken — 0 missing lines, 0 stages without output; with no stamped
  tick §4.11's clock starts at week 0 and the year position is the season control's, midsummer (week 19) by default
  (§2.9's *The week's source*; DR42);
* **T125-2, a host context changes nothing** — the pin `item125.host` (`input`; V12 §2.13): B-DOSSIER-lite and the
  required-keys dossier generated with no host context and under each fixture `HostContext` (a viewer's `audience`, a
  `displayNames` map and each `line` the dossier's version stamps admit) give one model digest and identical saved bytes.
Item 125 adds no `StatBarSpec`, no register line and no cell.

**3.15.16 Item 126 — tablets and desktops only.** The map designs nothing for a phone (item 126 (a2)): V09 retires the
narrow layout class, holds the medium layout at its 600 × 480 CSS-px minimum in a smaller window with the page scrolling,
and its T-V9-22 takes T126-1's tablet half, T126-2 and T126-3 (no phone layout, screen or catalogue row); V08's host frame
carries no phone handling. This volume measures two clauses on V09's app harness, from M2a (§16), no fixture of it a
phone viewport:
* **T126-1, every tool under touch at the medium class** — `layout.touch`: at 600 × 480 CSS px under coarse-pointer
  touch events, with `AppPrefs.touch.editFabric` on, each tool of V09 §4.12's list completes its canvas script (V09
  §7.2's scripts) — each tool from the milestone that lands it, every tool from M3a — 0 failing;
* **T126-2, below the medium class the medium layout holds** — `layout.belowMedium` 0 over the **resize script**
  1 024 × 768 → 600 × 480 → 599 × 479 → 480 × 360 → 1 024 × 768 CSS px on a CITY session holding a selection, its view
  finer than the zoom-out limit at every size (so no resize settles it, §8.8): below 600 × 480 the medium layout at its
  minimum, no tool withheld or greyed, the page scrolling to every part; and the pin `item126.resize` (`view`, `session`;
  V12 §2.13): the model digest, the saved bytes, the view key and the selection byte-identical at every step.
Item 126 adds no `StatBarSpec` and no register line.

### 3.16 Edges and combinations (principle (11))

**3.16.1 Every mechanism at its limits.** Each row names where the outcome is stated, its failure rung (§5.1's ladder:
check, repair locally, retry that piece, simpler shape, substitute, leave out and report — never a whole-map retry; in the
harness never a lost record) and its test; T-V12-42 is the edge suite, one fixture per row number. Four rules hold
everywhere and the rows name only what they add:
* **Degenerate geometry.** The harness generates nothing itself: our towns come through the base's pipeline, whose kernel
  refuses a degenerate commit (§3.1) under the stage's failure class, so a model feature reaching a metric is valid; a
  capture's or plate's degenerate geometry is cleaned by V12 §3.2.2's rule; a metric meeting a zero denominator reports
  `notApplicable` for that seed, counted — never 0, never a crash.
* **Every rung.** Every command runs from THORP to the METROPOLIS cap; the only rung limits are the references' coverage
  (V12 §3.4.4: a row with no reference setting at a rung reports nothing there) and the village rungs' levels,
  `notApplicable` until V-M4.
* **Every toggle and preset.** Recipe inputs (the preset arms, V12 §3.5.5) and view and device state (layers, seasons,
  festivals, Find, crises, `cvdVariant`, the Resolution setting, the weather effects) never mix: a harness run generates under its arm and measures the model, and render metrics draw at the
  standalone default view (V12 §3.4.4).
* **The lifecycle.** The harness's records are repository data changed only by V12 §4.2's verbs, append-only with their
  undo; no document holds them, so a document's save, load, undo, redo, regeneration or migration never reads or writes
  them, and a schema change migrates each record by its version (V12 §2.11).

| # | mechanism · its limit | outcome, where stated | failure rung | test |
|---|---|---|---|---|
| 1 | the baselines file · missing, empty or contradictory | V12 §2.3 *At its limits* | check: refused, the last committed file stands | T-V12-42 (1); T-V12-1 |
| 2 | a run spec · missing or contradictory fields | V12 §2.5: refused, rule `spec`; an over-wide step leaves the endpoints | check: refused before any evaluation | T-V12-42 (2); T-V12-9 |
| 3 | the register · absent, unreadable, a removed column | V12 §2.6 *At its limits* | check: the lint fails naming the command or the entry | T-V12-20 |
| 4 | a correlation spec · no members, a contradictory spec | V12 §2.7: `insufficient`; registration refuses | leave out and report | T-V12-14 |
| 5 | a tendency spec · a missing fixture, empty levels | V12 §2.7b *At its limits* | check at registration; leave out and report | T-V12-42 (5) |
| 6 | a panel spec · a bad id, no group, count 0, `reads` without subject | V12 §2.8: registration refuses | check | T-V12-17 |
| 7 | the corpus records · no admissible map, an empty frame, a map without keys, a frame declared twice | V12 §2.9 *At its limits* | leave out and report; C8 refuses | T-V12-23 |
| 8 | evidence · a dangling id, an absent or stale `dist/evidence.json` | V12 §2.10: the compile fails; "no calibration record for this table version" | check; substitute (the provenance source alone) | T-V12-21 |
| 9 | a known-city fixture · a missing input file, an empty list, split digests | V12 §2.12, V12 §3.14.3 | check: registration refuses; T-V12-36 fails naming both digests | T-V12-36 |
| 10 | a no-op pin · an empty overlay, no rungs, no values, an unregistered suite, a missing set | V12 §2.13; V12 §3.7.8 | check: refused; CI fails naming the pin | T-V12-37 |
| 11 | the loop · no input, missing research files, every preset and toggle | V12 §3.1 | nothing runs or crosses; the last committed files stand | T-V12-7; T-V12-42 (11) |
| 12 | the capture loop · degenerate geometry, an empty capture | V12 §3.2.2's cleaning rule | repair locally; a failed plan index | T-V12-30 |
| 13 | the crossing · one row, an empty candidate, no `--previous`, duplicate live rows | V12 §3.3 | check: refused naming the rule | T-V12-1 |
| 14 | the correlation harness · members without access, disconnected parts, a zero denominator | V12 §3.6 *Degenerate towns* | leave out and report (the member or the town, counted) | T-V12-14 |
| 15 | the tendency harness · a zero-area void, a small outline, no face | V12 §3.6b *Degenerate inputs* | leave out and report (`notApplicable` per measure) | T-V12-33 |
| 16 | tuning · `lo` = `hi`, a bracket under two steps, a zero-cell spec | V12 §2.5; V12 §3.7.3 | check: refused; the endpoints alone | T-V12-9 |
| 17 | drift · no change, a one-seed change, documents | V12 §3.8 | report ("no change"); a declared shift at the boundary | T-V12-22 |
| 18 | the panel engine · an absent framing target, a frame past the zoom-out limit | V12 §3.9.2 | substitute (the next seed, recorded); clamp | T-V12-17; T-V12-18 |
| 19 | the corpus intake · degenerate plates | V12 §3.10.2 step 5 | repair locally; exclude `unreadable` | T-V12-23 |
| 20 | the register · an empty table, a removed column, a one-stage line | V12 §3.11; V12 §2.6 | check | T-V12-20 |
| 21 | failure handling · a missing `known-defects.json`, a reverted record | V12 §3.12's closing paragraph | report | T-V12-42 (21) |
| 22 | determinism · no rows, every rung | V12 §3.13 (a header-only report; the rung order) | — | T-V12-7 |
| 23 | the known-city fixtures · a degenerate target entity, the fixture's lifecycle | V12 §3.14.5, V12 §3.14.8 | check: the check fails naming the entity | T-V12-36 |
| 24 | calibration reaching documents · no release, every rung | V12 §4.1 | nothing changes; a pack reaches only its frame's rungs (R5) | T-V12-26; T-V12-40 |
| 25 | the records' verbs · nothing to do, an unreadable compiled table, reverts | V12 §4.2 | idempotent; refused naming the table; revert by the landing change | T-V12-20; T-V12-13 |
| 26 | the owner's inputs · none, exactly one | V12 §3.9.1 *Batching and re-offers*; V12 §4.3 | provisional — not rated; one pick released like any | T-V12-17 |
| 27 | the clerk's view and the cell inspector · a cell without evidence, an absent file | V12 §2.10; V12 §4.4 | substitute (the provenance source and status alone) | T-V12-21 |
| 28 | the parity dashboard · no rows, a corrupt history line, every rung, every preset arm | V12 §5.1 | report ("no comparisons this run"; the line skipped and counted) | T-V12-42 (28) |
| 29 | the reports · no run, one candidate, equal scores, a missing record, regeneration | V12 §5.2 | report; regenerated from records, never edited | T-V12-42 (29) |
| 30 | release notes and the owner's report · no run, one frame | V12 §5.5 | report ("no calibrated value moved"; one page) | T-V12-42 (30) |
| 31 | item 120's measurements · no chip, a chip whose last match is removed, a withheld kind, every band and layer, one to twelve chips, the metropolis cap, save, load, undo, redo, regenerate, advance and migrate | V12 §3.15.10: no chip is the pin's `off` value; a chip with no match left counts 0 and stays in the set, dark; a withheld kind is never offered, counted or drawn; the city, neighbourhood, building and interior bands, Ground, Below and Sky, an advance, an undo, a redo, a regenerate, a save and load and a migration are steps of the script, the chips re-evaluated at each | report (the statistic's row, counted); never a lost chip or a silent pass | T-V12-52 |
| 32 | item 121's measurements · every level and tier, a device below the low tier, a screen above 4K, a monitor change mid-gesture, a lost GPU context under Auto | V12 §3.15.11: each level on each device fixture; a device below the low tier drawn at its lowest rung that fits (§8.8) and reported per device, never gated; a 5K and an 8K screen at the 4K-equivalent DPR, the text layer at the device's ratio, the reason `ceiling` shown; the change applied at the next settle; the session's light rung lowered (§8.8) and the loop measured from there | report (the statistic's row, counted); never a crash or a silent pass | T-V12-53 |
| 33 | item 122's measurements · no condition and no preview, a `none`-row condition beside the looks (drawn at no key) and a look-bearing one (drawn at every key), a condition with no `untilWeek` and one ending before it starts, several crises past the density cap, a force too large for its frame and margin, an island town, an unwalled siege, a headcount of 0, every rung THORP – the cap, a barrier look on a way (the `blockade`, `raiders` and `rebellion` barricades, a `beast`'s stakes, a quarantine's cordon) | V12 §3.15.12: the pin's tiles; the `none`-row one never drawn, counted or widening the framing, the look-bearing one drawn at every key; drawn from `sinceWeek` on; never standing; by priority, the rest on the ring; the ring's arcs with the frame and hash unchanged; the ring; the `blockade` row; the scale by severity and tier; each rung's `scale` cell; a way's carriageway holding nothing save a barrier across it (a `barricade`, a `beast`'s `stakes`, a quarantine's `cordon`; §10.2 (d)) | report (the statistic's row, counted); never a silent pass | T-V12-54; T-V12-55 |
| 34 | item 123's measurements · level 0 and level 1, a building first met ruined (generated ruined, or in item 113's replay), a restored building, a stale plan, a one-room plan, a ruined church with its crypt, a building of a disaster look's district, every rung where plans draw | V12 §3.15.13: no element, every element damaged; its as-built plan, then its damage; the damage leaving in reverse (T123-4, V03's and V06's); its cached rooms under the change marker until re-derived; its elements by their thresholds; the crypt by its own; at `lookLevel` or its own level where higher — `damage.nested` holding over each | report (the statistic's row, counted) | T-V12-56 |
| 35 | item 124's measurements · the switch off, reduced motion and the low tier, every climate row and week, a snow spell asked on an `arid` or non-freezing row, a spell during an export, a resize and a gesture, the vector rung, a lost GPU context | V12 §3.15.14: nothing drawn; off by default (V09's T-V9-87); each row by its columns; never snow; the export without effects, the layer redrawn at the new size, the gesture's frames within budget; the wash and the halos only — the pin and `weather.cover` holding at each | report (the statistic's row, counted) | T-V12-57 |
| 36 | item 125's measurements · a required-keys dossier, a dossier with no stamped tick, a host context present and absent, a `line` the dossier's stamps contradict, every rung | V12 §3.15.15: a full map with every fallback reported; week 0 at midsummer; one document and hash; refused with `E_LINE_UNSUPPORTED` (§11.4), no document made and none compared; at every rung, the village rungs through V07's product: a full map with every fallback reported | report; check (the refusal) | T-V12-58 |
| 37 | item 126's measurements · exactly 600 × 480, one pixel below it, a window far below it, every tool | V12 §3.15.16: the medium layout; the medium layout at its minimum with the page scrolling; the same; each tool's touch script, with `AppPrefs.touch.editFabric` on, from the milestone that lands it | report (the statistic's row, counted) | T-V12-59 |

**3.16.2 Features under the parity presets.** A parity preset is cell values — §7.6's preset entries and extension zeroing,
V11 §3.24.0's switches — never a change of a stage, a rule or a lifecycle. So a feature on a map under a preset is what its
own rules give with the preset's values: an extension whose chance or weight the preset zeroes is absent from generated
towns (declared or dossier-supplied content still stands), a site feature stands as the site gives it, an owner-rule cell
(stamped, never an extension) keeps its value. The harness then measures the preset's towns by V12 §2.2's and V12 §3.4.2's
reading rules; a P row whose reference captured no such setting reports the feature's rows `notApplicable`; and a feature
the preset resolves off that appears in a P row's input fails T-V12-37's leak clause, naming the row and the feature. The
rungs are the P rows' (MFCG and FTG at TOWN, CITY and METROPOLIS; VG at THORP, HAMLET and VILLAGE; NG at the neighbourhood
band; FM at the building band). T-V12-43 runs each row's fixture under each parity preset at each rung it names.

| feature (its home) | rungs | under the parity presets | what the P rows read | fixture of T-V12-43 |
|---|---|---|---|---|
| cliff (§4.2 S1; item 106) | THORP – METROPOLIS | site relief; item 106's barrier anchoring as its rules give | the enclosure: closure edges never wall length, towers or gates; `wall.barrierShare` descriptive | T106-1's cliff-backed coastal fixture |
| steep ground (§4.2 S1) | THORP – METROPOLIS | `terrace.enabled` false (V11 §3.24.0): no retaining wall; the plinth, skirt and stepped wings carry the fall (§2.2) | the town as generated; no `retaining` feature | T110-1's terraced-slope fixture |
| river (§4.2 S1) | THORP – METROPOLIS | site water | MFCG plain rows at `none` exclude it; MFCG stress rows (size 80) descriptive; FTG at its captured water settings; bridges as their carried class | B-CITY's river seeds |
| coast (§4.2 S1) | THORP – METROPOLIS | site water | the shore split and our shore closures by one rule (V12 §3.2.2) | B-CITY's coast seeds; T-V12-32's fixture |
| harbour (§4.8; item 106) | TOWN – METROPOLIS | the waterfront's default `open` (§4.4 S5a), MFCG's and FTG's behaviour; deck offers 0 | water gates and the harbour-mouth chain never main gates; moles and piers as `pier` | T106-3's harbour fixtures |
| moat (§4.8) | TOWN – METROPOLIS | site of the enceinte's water furniture | still water of class `lake`, never wall length; its bridges as their carried class | a moated TOWN of the golden suite |
| bridge (§2.7) | THORP – METROPOLIS | deck offers 0 (V11 §3.24.0): no deck plot | the carried way class; no `onDeck` | K1 |
| retaining wall (§2.7; item 110 (a)) | THORP – METROPOLIS | off (`terrace.enabled` false); a declared wall stands | `retaining` only, never a `wall` | T110-1's fixture with a declared wall |
| oasis (§4.2 S1; item 111) | THORP – METROPOLIS | P(oasis), an extension, 0 by zeroing; a drawn or dossier oasis stands | `water.kinds` reported; never a P row input on `bref` towns | T111's arid levels |
| the frame (§3.2 (9)) | THORP – METROPOLIS | no frame law is a cell; raised ways at the frame off | every feature inside the frame; `outline.*` read the built area | T110-2's frame fixture |
| terraced ward (V01) | TOWN – METROPOLIS | off under `NG` (as `MFCG`: the terrace rows off) | hoods as NG's rows read them | V01's terraced district fixture |
| crypt (V03; item 109 (k) (2)) | THORP – METROPOLIS | the cathedral's `always` crypt, an owner rule, stays | none: the underground is never in a surface input; `crypt.*` ours | the surveyed-dossier crypt fixtures |
| catacomb (V04) | TOWN – METROPOLIS | the underground's extension shares 0 (V04's T-V4-35); the owner-rule gates stay | none (surface only) | the surveyed-dossier catacomb fixtures |
| vault (V04) | THORP – METROPOLIS | as the catacomb | none (surface only) | V04's hook fixtures |
| island shade (V05; item 102) | CITY, METROPOLIS | the island rules 0 (§7.6): no island | none (the sky never in a surface input); `shade.gap` descriptive | V05's island fixture |
| island landfall (V05) | CITY, METROPOLIS | as the shade | none | V05's landfall fixture |
| history (V06; item 113) | THORP – METROPOLIS | `history.replay` false (§4.11); no epoch on a `bref` town | one-shot towns; V06's growth parity compares ours with ours | V06's history fixtures |

A preset town that fails generation takes its stage's failure class (§5.2) and is a failed seed, reported and counted, never
retried whole-map.

## 4 Editing

### 4.1 No new map event: calibration reaches a town as tables and packs

Calibration adds no event to §7.1's vocabulary and no declaration to item 101's tools. Its outputs reach documents in three
ways the base already edits: **table versions** (a release's re-signed cells, pinned in each recipe, §6.4), the
**historical pack** `historical:<frame>` (§7.6's packs slot, for documents of its era and region), and **thresholds**
(test-side, never in a document). With no release, nothing reaches a document.
* A user overrides any calibrated value like any cell — the tables editor, the override layer, orphaned and shown side by
  side when a newer table version changes the row (§7.6); "reset to the shipped value" removes the override.
* A new town of a matching era and region takes an adopted historical pack by default and a selectable one from the preset
  dialog at creation (T1 `intend`'s advanced panel, V09); an existing town applies or removes it through §7.6's pack
  `adjust` (`param: 'packs'`) — a Re-derive from the pack's first reader stage with the fate report, the whole apply one undo
  step. A pack reaches every rung its frames cover and no other (V12 §3.10.3 R5).
* A calibration release never changes a saved town silently: the town keeps replaying under its own output version, and
  moving it to the new tables is §7.5's upgrade, with its diff and its undo.
* **A suppressed raised way stays suppressed** (the owner's "then a user can decide to add or remove"). A table release or a
  historical pack never re-opens a raised way the user removed. The suppression (file f item 260) is keyed to the way's
  **reason** — the drop, link or water need that raised it — not to its course (the key's owner is §7 with V06 §3.19.1), so
  an apply or an upgrade that moves the course (a lower `viaduct.minDropM`, a doubled chance) keeps that reason suppressed,
  and the fate report lists the suppression as held. T-V12-40 tests it; V06 and V09 keep the key's identity independent of
  the course.

### 4.2 The records' verbs

The harness's records are repository data, changed only by these commands, each append-only with its undo:

| verb | changes | undo |
|---|---|---|
| `plat baselines check --previous <file>` then the baseline seat's commit | adds `Baseline` rows, a pin, a `CrossingRecord` | a superseding row (C9: nothing is deleted) |
| `plat calibrate run <spec>` | a `CalibrationRun`; if accepted, table sources, a minor version, shift records | a revert run whose spec restores the `from` values — itself declared |
| `plat calibrate register [--check]` | entry statuses from runs, picks and M-1 records, and a released pick's cells row | a history row appended; a status never returns to `provisional` except under a new major table version |
| `plat calibrate register --defaults --milestone <id>` | the default line's entries for calibratable columns that hold a compiled cell and have no entry, each with a first cells row naming the landing milestone and its `due` from it (V12 §3.11); a moved-value cells row on a `provisional`, not-yet-due default entry or named entry whose cells no run may name, and a rows-added cells row on any entry (V12 §3.11 (2), (2′)); without `--milestone` it refuses, writing nothing and naming the flag; over a compiled table it cannot read it refuses, naming the table; with nothing to write it writes nothing | the change that wrote them is reverted with the table change that landed the columns, a moved-value or rows-added row with the change that moved the value or added the rows; a later named line restates an entry in place, never deletes it |
| `plat calibrate register --hold <entry> --milestone <id>` | one held row on a `provisional` default entry, or a named entry whose cells no run may name, whose owning seat's tuning the change's golden check refused — its only change (V12 §3.11 (1)); refused on any other entry, naming why | reverted with the change that recorded it; a later cells row supersedes it in the report |
| `plat calibrate register --trial <path>` | a `trial` row on each register entry a finding of V09 §7.6's `TrialRecord` concerns, and a `known-defects.json` entry per finding not yet fixed (V12 §2.14); refused for a finding naming a calibrated value with no entry | reverted with the change that recorded it; a disposition is appended, never edited |
| `plat nullmodel <spec>`, `plat statbar <spec>` | results inside a report | — (a result is a fact) |
| `plat d5 seeds / render / verdict <panel>` | `seeds.json`, renders, `record.json` | a new sitting writes a new record; answers are never edited |
| `research/baselines/*`, `research/d5/*`, the corpus adapter (research side) | capture plans, `MeasureInput` files, candidate files, sitting pages, the corpus index | re-run from their inputs |

### 4.3 The owner's inputs

The owner acts at six points, each recorded with its date: the sittings' answers, strip picks and `house` pick (`D5Record`),
the M4-110 group's among them; a written acceptance of a failed or unrated panel (`D5Record.acceptance`,
§13.6 (6)–(7)); the opening of M-CAL and of each later corpus run (`ReconciliationRecord.opened`, V12 §3.10.1); the palette
pick if one is needed (V12 §3.10.7); the per-frame adoption of a historical pack at the M-CAL panel (J122: only where the
sitting passes it, V12 §3.10.6); and the answer to each `ownerExcluded` question of the reconciliation report ("keep the
rule" by default; a change of an owner rule is an owner amendment, never a run). A pick becomes an `owner-set` register
entry; no run and no seat moves an owner-set value afterwards (V12 §3.7.2 rule 2).

### 4.4 The clerk's view and the cell inspector

Every calibrated cell carries its `evidence` ids (V12 §2.10), and `dist/evidence.json` ships each cell's status, its
register entry, what measures it, its due and its last history rows, with one plain line per cited id. The tables editor's
cell inspector (V09 §4.14) shows the cell's provenance source, its evidence lines and its status in plain words
(provisional, confirmed, fallback applied, not achieved, owner-set, fixed; "the owner's rule" for a stamped cell), what
measures it and, while provisional, its due; the preset dialog lists the adopted and selectable historical packs. The
clerk's "why" (§11.2's `RuleAnswer`, read by the clerk, V10 §3.5) answers a question about a value — "why are lanes this curvy?" — with the plain
line first ("tuned so organic lanes turn as much as FTG's streets per 100 m"), its status and what measures it, and the run
id only behind "details" (item 101's plain-words rule); a stamped cell answers "the owner's rule, item …". A cell with no
evidence shows its provenance source and status alone; an absent or stale file shows "no calibration record for this table
version". No clerk and no API call can start a calibration run: calibration is a repository process run by seats, never a
document action.

## 5 Rendering, labels, exports

### 5.1 The parity dashboard

`plat parity --html` writes one self-contained page (inline SVG, no external script or font request, our own UI colours —
no reference palette): a header (output version, tier, date, the baselines file's hash, counts of pass, fail, reported,
not applicable); a **plain-words summary** — "37 of 41 comparisons in band; out of band: …", each out-of-band row as its
metric's `plain` sentence (a run with no rows says "no comparisons this run"); then one table per reference, rung and band
(the village rungs and the hood and building bands included where their rows run), grouped by preset arm: metric (plain
name and id), ours, band, verdict (a word and an icon, never colour alone), and a sparkline of ours over the last 14
nights. `plat parity` appends one line per row per run — date, row id, ours, verdict — to
`plat/goldens/parity/history.jsonl`, pruned to 60 nights, and the sparkline reads it (the nightly reports themselves are CI
artifacts the CLI cannot read); a missing file starts the sparklines empty, and a line that fails its schema is skipped and
counted in the header. Each distribution row opens a small chart of our per-seed CDFs against the reference seeds'. A
tendency bar's verdict prints as a word — pass, pass on confirmation, suspect (re-run pending), fail, not applicable — with
its test value; the item-119 rows print each wait's p95 against its target and the ten-second comfort level. Milestone
dashboards are stored beside their reports in `plat/goldens/parity/`; nightly ones are CI artifacts kept 30 days.

### 5.2 Run, register and correlation reports

`plat calibrate report <run> --html`: the spec, a chart of score against candidate value in evaluation order (one candidate
a single point; equal scores a flat line, ties noted), the train and holdout tables, the changes with their evidence, the
shift records, the plain sentence. `plat calibrate register --html`: counts by status and owner, entries due at the next
milestone, overdue entries first, and the default line's entries by owner and table with those a change's `--defaults` run
wrote marked new; every entry a `--defaults` run appended a moved-value row to marked moved and a rows-added row to marked
rows added ("rows added after close" where the entry had left `provisional`); every entry whose last row after its last
cells row is a held row marked "held: a committed golden reads it"; the entries it owes to a run listed; each staged entry
with its current stage, the stages passed and any stage read after its close; and each open trial finding beside the entry
it concerns. `plat nullmodel --html`: per spec the share and median u against the rule, a per-seed strip, the settings
skipped and why. `plat statbar --html`: per bar its test value against its pass line in words ("pooled share 0.78 over 131
effective instances, needs 0.67: pass"); for an ordered rule each level's rate with a two-standard-error whisker; for a
paired rule the per-seed table of the three measures; for a property its violations (record, step, before, after); the
confirmation re-run beside a suspect first run; verdicts as words and icons, never colour alone. `plat known --html` prints
each fixture's StructureResults per path — every check's `what` line with pass or its finding, and the generated extras —
and `plat noop --html` each pin's suites with byte-identity per stage (per week, festival, chip set, crisis display,
level, spell, size or rung for the view and rung pins; per building for the entity pin; per host context for the input
pin). With no run, no spec or no fixture a report says so in one line; a record a report needs and cannot read is named
in the report, which draws the rest. Every report is regenerated from its records, never edited.

### 5.3 The panel renders

V12 §3.9.2's `PanelRender`: 1 600 × 1 200 px PNG per side, matched metres per pixel, no labels, no furniture, the fixed
sun, the standalone default view, PNG text chunks stripped, file names the images' content hashes, framed within the
zoom-out limit. The label pass renders the same frames with labels on. Our side is drawn by §8's pipeline under the pair's
preset and family (§13.6 (3)); nothing in this volume adds a paint program or a style.

### 5.4 The sitting page

Research-side, one local HTML file per panel (V12 §3.9.4): a plain-words first screen; pairs full width, each side
enlargeable; buttons with visible keyboard shortcuts; a progress bar and a "pause" that keeps the answers; no text that
names a generator, a reference or a side. It meets the app's accessibility contract where it applies (§14's WCAG 2.2 AA
chrome rules: keyboard-only operation, visible focus, 4.5 : 1 text contrast); the images are the thing judged, so they
carry no alternative text that could reveal a side.

### 5.5 Release notes and the owner's reconciliation report

`@plat/docs`'s release-notes generator (§14) gains a **calibration** section built from the release's `CalibrationRun`s and
their shift records: per run, the metric's plain sentence, the cells moved (`from → to`), the reference or frame, and the
run id — or, for a release with no run, the one line "no calibrated value moved"; a **new behaviour** line for each feature
switch-on bump (V12 §3.7.6) — "cities may now build viaducts, raised roads and aqueducts where the ground or the water calls
for them; you can remove any"; the trial's findings and their dispositions (V12 §2.14); and the item-119 waits against
their targets and the comfort level. At M-CAL, the owner's reconciliation report is one page per frame in plain words — a
corpus of one frame gives one page: what the historical maps changed, what they were not allowed to change and why (the
refused list, by rule), which witnessed things the generator cannot make yet, each `ownerExcluded` row as a question with
the recommendation "keep the rule", each owner-stamped minimum a run met ("the historical maps show few raised ways; the
owner's rule keeps cities able to build them, at the lowest chance"), the default line's columns that closed `fixed` with
"no admissible frame", counted by volume (V12 §3.11), each frame's decision (`default`, `selectable`, `pending-owner`), and
three before-and-after thumbnails. A later run `M-CAL/<layer>` adds its own page in the same form, its thumbnails only where
it moved a cell.

### 5.6 Exports and labels

Every record is JSON under its schema; `plat parity --csv` and `plat calibrate register --csv` write flat tables for a
spreadsheet; the research-side markdown mirrors of the shift and panel records are §13.3's. This volume draws no map label
and exports no map feature: the panel renders are §11's PNG export at a fixed frame, and `MeasureInput` for our towns is
§11.1's metric GeoJSON.

## 6 Performance budgets

Single-thread figures on the reference machine (§12.1), normalised by the calibration score; PLAUSIBLE until measured at
the milestone named. These are the harness's costs; the product's own waits and their comfort level are §12's, measured by
V12 §3.15.9.

| work | budget | measured at | pre-decided change if missed |
|---|---|---|---|
| `measureInputOf(doc)`, item 110's kinds and properties included | ≤ 15 ms at CITY, ≤ 45 ms at METROPOLIS | M1; again at M3a with item 110's kinds | build it from the columnar display list's model columns instead of entity walks |
| all `geo` metrics of one town (the sum of `costMs`, derived blocks and street graph included) | ≤ 300 ms at CITY, ≤ 900 ms at METROPOLIS | M1 | the R4 sample drops from 1 500 to 750 (a major metric version: its reference rows re-measured, V12 §3.4.3) |
| `render` metrics of one town (the matched-scale city band and recoverability) | ≤ 1.5 s at CITY, ≤ 4 s at METROPOLIS | M1 | render metrics run every third night, rotating the settings |
| one `NullModelSpec` on one town (K = 20 permutations and the statistic; the town read from B-CITY) | ≤ 40 ms at CITY, ≤ 120 ms at METROPOLIS | M2b | K drops to 12 and the rule is re-calibrated by the rank receipt's code before use |
| B-REF nightly, counted per preset arm: MFCG TOWN, CITY and METROPOLIS at `none` × 2 arms (`MFCG` for P rows, `'default'` for O and C rows) × 20 = 120 towns; MFCG `coast+river` at CITY × 1 arm × 20 = 20; FTG 6 settings × 2 arms × 20 = 240; NG from `ng-counts.json`'s recorded districts, ≈ 20 districts opened at LOD — ≈ 400 towns, ≈ 3 s each on average with the render metrics (METROPOLIS 40 of them) | ≤ 20 CPU-min, ≈ 2 min wall on 16 cores | M1 | render metrics every third night; then the O and C arms at 10 seeds nightly (20 at milestones) |
| all pooled statistics nightly — every `NullModelSpec` and pooled `StatBarSpec` on B-CITY's towns: the marginal cost only (≈ 60 specs × 200 towns × 40 ms at CITY ≈ 8 CPU-min) | ≤ 10 CPU-min | M2b | specs rotate over nights by spec id; each still runs at least every third night |
| specs on their own `null/…` families (custom-chain fixtures, forced sites) and the web, comfort and chain bars; item 111's specs (`T111d.*`: the rate rows `stopAfter` S1, the walk and rich specs on arid levels) | ≤ 15 CPU-min together, nightly | M2b | they rotate over two nights |
| the confirmation re-runs (`c1`, twice the towns), when a bar is suspect | ≤ 10 CPU-min per night, a runner job outside the tier budget | M2b | queued to the next night |
| a site-stage sweep bar (item 109's relief trend: 200 site draws; the mining comparison: 1 600), `stopAfter` S1 | ≤ 2 CPU-min | `V4-U3` | — |
| a full-town underground bar (the access trend: 40 towns per rung, 120 at TOWN … METROPOLIS until V-M4, 240 from THORP after; the paired, two-sample, rate and floor bars) | ≤ 60 CPU-min each, milestone tier and weekly | `V4-U3` – `V4-U5` | the bars alternate weeks |
| the step-script properties: the catacomb scripts on the surveyed-dossier fixtures, `T113e.lost` on V04's LOST fixtures, `T114g.*` over the wall fixtures (H-100's epochs are V06's run) | ≤ 5 CPU-min nightly | `V4-U5`, the E-milestones (V06) | the scripts run on half the fixtures per night, alternating |
| the item-113 history fixtures' replays (T113-1 – T113-7) | ≤ 10 CPU-min nightly; T113-2's digests inside the five-engine run | M6-E | the fixtures rotate over two nights; T113-7's pin never rotates on the PR seeds |
| a known-city fixture's skeleton path (PR): one CITY generation plus the structure checks (≤ 0.5 s) | ≤ 5 s per fixture | M3a | the PR run takes K2 only; K1 runs nightly |
| both fixtures' three paths (milestone tier) | ≤ 10 min wall, the canvas scripts' 10 minutes being V09's | M3a | the transcript path runs nightly instead |
| the no-op pins, nightly (the registered suites once more under each overlay) | ≤ the golden job's own time once more | M3a | the pins rotate by item over two nights; the landing gate stays per commit on the two PR golden seeds |
| the view pins (items 117, 118, 120: each suite document opened at 52 weeks, each festival display and each Find chip set, digests only) | ≤ 5 CPU-min nightly | the milestones that land items 117, 118 and 120 | weeks sampled at every fourth week and one chip set per seed nightly, all at milestones |
| the render bars of items 114, 117 and 118 (T114-6, T117-2 with the `T117i.*` specs, T118-2 – T118-6) on their fixtures | ≤ 10 CPU-min nightly | the milestones that land them | alternate nights |
| item 120's statistics (`find.*` on V09's app harness over B-CITY-lite's seeds of every rung, the village fixtures and a dossier fixture, three chip sets per seed); its two timings at the METROPOLIS cap | ≤ 10 CPU-min nightly; the timings inside §13.8's timing phase | M5 (Find's milestone, §16) | the rungs alternate nights; the timings never leave the phase |
| item 121's measurements (the `resolution.*` statistics on V09's app harness over three device fixtures and §12.5's reference viewports at every rung's top and the cap: the scripted Auto sessions, the threshold fixture, the captures at every level, the ultra tier's 4K view) and `item121.display` | T121-2, T121-3 and T121-8 inside §13.8's timing phase, ≤ 20 min wall per milestone run; T121-5's captures at PR, each level on one device fixture, inside V09's PR run of its app harness (T-V9-84 takes the captures); the pin ≤ 2 CPU-min nightly | M4 (§16) | the rungs alternate milestone runs; the 5K and 8K fixtures at milestones only; at PR the levels rotate over runs, every level nightly |
| item 122's measurements (the `crisis.*` statistics over the crisis fixtures' weeks and sweeps and the force fixtures) and `item122.crises`; the looks' raster timing | ≤ 10 CPU-min nightly; the raster timing inside §13.8's timing phase | M3b (the previews; the `disaster` look's district clauses from M5); M-SF (the dossier crisis and force fixtures) (§16) | every fourth week nightly, all 52 at milestones |
| item 123's measurements (the `damage.*` statistics: 21 levels per building of the damage fixtures; H-100's decay runs from M6-E) and `item123.damage` | ≤ 5 CPU-min at PR on the damage fixtures (the 21 levels); H-100's decay runs nightly from M6-E | the V03 step that draws a decayed or ruined plan; M6-E (§16) | every fourth level at PR, all 21 nightly and at milestones |
| item 124's measurements (the `weather.*` statistics over every climate row's 52 weeks, the simulated clocks, the captures and the frame timer) and `item124.effects` | T124-3, T124-4 and T124-9 at PR on one climate row per run, rotating, and nightly on every row, ≤ 10 CPU-min; `weather.frameMs`, `weather.cover` and `weather.luma` inside §13.8's timing phase and the visual-regression run; the pin's suites nightly | M3b (§16) | the climate rows alternate nights |
| item 125's measurements (`port.fallbacks` on the required-keys dossier at every rung, THORP to the METROPOLIS cap, the village rungs through V07's product) and `item125.host` | `item125.host` at PR on B-DOSSIER-lite; the required-keys dossier at every rung nightly, ≤ 3 CPU-min | M-SF (§16) | — |
| item 126's measurements (the tools' touch scripts at 600 × 480, the resize script) and `item126.resize` | ≤ 5 min wall at PR on V09's app harness (each tool's script from the milestone that lands it) | M2a (§16); every tool's script from M3a | the tools' scripts rotate over PR runs, every tool nightly |
| the four raised-way bars (≈ 1 700 – 1 900 towns per full run), weekly and at milestones | ≤ 20 CPU-min together, with `stopAfter` the raised-way stage | M3a | the METROPOLIS levels run at milestones only |
| a TOWN guard setting inside a run (30 towns) | ≤ 1 CPU-min per candidate | M3a | the guard runs on the chosen candidate and the bracket's endpoints only |
| item 119's wait timing (`wait.*`, five seeds per kind at each rung's top and the metropolis cap; advance time and the history replay each in total) | inside §13.8's timing phase; ≤ 30 min wall per milestone run | M1 (TOWN, CITY), M2b (METROPOLIS and the cap); each other wait from the milestone that lands it — M3a (a dossier change applied, a migration), M6-E (advance time and the history replay), M-SF (an open from SettlementForge) | the kinds split across two timing-phase runs, never outside the phase |
| `dist/evidence.json` | ≤ 200 kB shipped | M2b | lines longer than 160 characters truncate at a word and the history keeps its last two rows, the full text staying in the records |
| milestone parity (100 seeds per setting) | ≤ 60 CPU-min | M2b | 60 seeds per setting |
| one tuning run | the spec's `budgetCpuH`, default 2 CPU-h (a one-cell golden search ≈ 12 probes × 90 towns ≈ 18 CPU-min before the shortcut) | M2b | V12 §3.7.5's `aborted-budget` |
| the crossing check on a 5 000-row file | ≤ 30 s | M-1 (twin), M1 | — |
| the register check; `--trial` | ≤ 10 s each (PR tier; the release candidate) | M1; the release candidate | — |
| panel assembly (36 pairs, strips) | ≤ 10 min | M1 | — |
| a gating sitting (M1, M2b, M4, M5) with the staged panels batched into it | about an hour (J122), splittable into three sessions within seven days; at most one re-offered earlier panel | M1 | fewer strips per sitting, strips carried to the next; a staged panel that does not fit waits for the next release's offer |
| the staged panels' own durations inside a gating sitting: the floor plans ≈ 20 min, the underground ≈ 15, the islands ≈ 5, the town histories ≈ 10; the M4-110 group ≈ 5 inside M4 | as stated | V3-P6, `V4-U5`, M6-sky, `V6-E7`, M4 | a panel over its time is split across the sitting's sessions |
| a corpus map's measurement / a frame's runs | ≤ 3 s per map / ≤ 4 CPU-h per frame | M-CAL | frames run on successive nights |

Calibration runs and M-CAL's runs are jobs on the CI runner outside the three tiers, never during a tier's timing phase
(§12.1), so they cannot disturb a timing that gates a budget; the tiers' own budgets (§13.8) do not change (J-V12.22).

## 7 Tests and acceptance bars

### 7.1 The bars

Classes as §15.2: C conformance, P parity with a measured reference number, O an outcome beyond the references.

| bar | statement | class | tier / from |
|---|---|---|---|
| T-V12-1 | **The crossing refuses what must not cross.** Fixture files — a place-name string in `capture`; a 201-character note; a six-hex-digit sequence; a row without `referenceBuild`; `sample.indices` starting at 3; a removed row; two live rows for one setting with no `supersedes`; an unsalted corpus id; a corpus *target* row with `frameN` 12; a corpus string other than a preset key; a frame row whose frame's `frames.json` crossing is not earlier; an `answers.json` note carried as text; an empty candidate; a committed file's candidate checked without `--previous` — are each refused naming their check; an upper-case `sample.family` (`capture/MFCG/40/plain`) passes C2; a one-row file passes; the M-1 file passes the product check with 0 refusals at M1 | C | PR fixtures; M1 |
| T-V12-2 | **The band arithmetic.** On synthetic samples: n = 1 gives exactly c × 0.85 … c × 1.15; n = 5 gives V12 §3.5.2's union; n = 10 gives the type-7 quantiles computed by hand; a sign-`any` metric widens additively; `absFloor` holds; the KS rule pairs single seeds and takes the reference's pairwise p90 | C | PR from M1 |
| T-V12-3 | **One implementation.** For every M-1 baseline, the released CLI's `plat measure` on the same `MeasureInput` agrees with the M-1 script within the metric's `tolerance`; recoverability within 0.01 on M1's golden renders (§16 M-1). Research-side (`research/baselines/check_t3.py`); its verdict reaches the exit record as the output hash | C | M1, research-side |
| T-V12-4 | **Our input equals our export.** On the golden suite `measureInputOf(doc)` equals the metric GeoJSON export read back — ids, kinds, classes (V12 §2.2's `WayClass` mapping and water classes), `use`, `district`, `prosperity`, item 110's kinds and properties as item 447 exports them and V12 §2.2 declares them (the undeclared ones dropped on read), the closures' six barrier kinds (J-VI.3), coordinates to the centimetre, each retaining wall and each built stretch one feature after V12 §2.2's merge (`wall`, `run`, `state`, `condition` and `material` dropped) — and every `geo` metric gives equal values on the two; on a fixture whose curtain holds a worn, a patched, a breached and a dismantled run and whose retaining wall holds one decayed run, the read-back holds one feature per built stretch and per retaining wall, `stepMinCm` and `stepMaxCm` the least and greatest over the runs, and `wall.nodeSpacing` and `wall.towerSpacing` equal the fixture's all-standing twin's | C | PR (two golden seeds); nightly (the suite) from M1; item 110's clause from M3a; the runs clause from M4 (item 575; item 114's states when they land) |
| T-V12-5 | **Like with like.** On B-CITY-lite towns the cluster-block and derived-street-graph metrics computed on our full input equal those on the same town's input with plots, blocks and lanes removed | C | nightly from M1 |
| T-V12-6 | **Measurement parity with our recorded measurements of MFCG.** The released CLI's `plat measure` on the five exports of `captures/mfcg/exports-2026-09-25/` reproduces gross cover 0.657 / 0.582 / 0.621 / 0.583 / 0.569 to three decimals, walled shares 0.98 / 0.97 / 0.92 / 0.82 / 0.30 to two, city gates 0 / 1 / 4 / 9 / 7 exactly and towers 33 / 32 / 29 / 24 on the dry cities, R4 medians within 0.02 of `docs/validation/bench/mfcg_orient.out`'s per-city values, the wall-alignment shares within one point of `mfcg_wallalign.out`'s; and on the sweep (`captures/mfcg/exports-sweep-2026-09-25/`) the buildings, walled share, cover, median footprint, gates, districts, plaza and castle areas of every size exactly as its `stats.md`. Research-side (`research/baselines/check_t6.py`) | P | M-1 (twin); M1 (the released CLI), research-side |
| T-V12-7 | **Reports are facts.** Two `plat parity` runs on the same inputs, on Node x86 and arm64, give byte-identical reports at every rung and band, rows in V12 §3.13's order; a run with no rows gives the header alone, identical on both | C | nightly from M1 |
| T-V12-8 | **Runs reproduce.** A calibration spec run twice gives the same evaluations, the same chosen values and the same holdout report hash | C | M2b |
| T-V12-9 | **Runs keep to their scope.** Specs naming an `owner`, `owner-eye`, palette-target, `host` or `sf:` cell, an `ownerRule`-stamped cell, a `raisedWays` row below CITY (refused by V11's schema before the spec check), a non-calibratable cell, a `presets.MFCG` or `presets.FTG` entry, a `presets.FM`, `presets.VG` or `presets.NG` entry in any run but a `reference` run against that preset's own reference or a `fallback` run applying that entry's own register fallback (or such a run that also names a default or another preset's entry, or a fallback run moving it to any value but its entry's stated fallback), a preset entry no register entry names, a bound outside the column's range, a `lo` below a column's owner-stamped minimum, a table no target stage reads, a fifth cell, a cell another open run holds, no cell, no target, `lo` ≥ `hi`, a step ≤ 0 or a `from` outside the bracket are each refused before any evaluation; a fallback whose doubled value would pass its range top is clamped, and one already at the top goes to *not produced*; a bracket under two steps evaluates its endpoints only | C | PR fixtures from M2b |
| T-V12-10 | **The holdout holds.** A planted over-fit fixture (a target whose train seeds are biased by construction) is rejected on the holdout; train, holdout, `bref`, `golden` and `bcity` seeds are disjoint for every setting (the collision rule) | C | M2b |
| T-V12-11 | **Guards win.** A candidate that improves its target but flips a passing C bar or owner-rule bar on the train seeds is never chosen; a chosen candidate that passes its targets but breaks a B-DOSSIER-lite bar, an owner-rule hook fixture or a known-city StructureCheck is rejected with `guardFlips` naming it; a run touching a raised-way row evaluates its TOWN guard setting, and a candidate that raises a way at a TOWN guard town, or moves a TOWN S4 or S5a – S5d isolated digest, is never chosen | C | M2b; the TOWN clause from M3a |
| T-V12-12 | **Emission is declared.** An accepted run yields a minor table version, provenance `ref:…` with evidence ids that resolve to baseline rows and the run, a `ShiftRecord` with cause `calibration` for exactly the stages whose isolated digests moved, the register's history row and the release-note sentence; a digest that moves without a record fails CI | C | M2b |
| T-V12-13 | **Reverts are exact.** A revert run restores byte-identical tables and stage digests of the version before the run, as a declared shift; reverting a change that wrote register rows reverts them with it | C | M2b |
| T-V12-14 | **The correlation rule is calibrated.** On fixture towns with the subject placed uniformly among its eligible sites, ≤ 1 % of 200 bars pass under the rank rule for a normal statistic and for each discrete fixture (members m ∈ {1, 2, 3, 10} × base share q ∈ {0.3, 0.5, 0.85}), and ≤ 1.5 % under the pooled exact test; with a planted pull of 1.0 standard deviation ≥ 95 % pass the rank rule; a pooled spec whose null share exceeds 0.85 is refused at registration; a `servedShare` spec at district scope, with `minHouseholds` off the district unit, or with `expect: 'lower'` and a `minShift` is refused; `unit: 'district'` counts every district of a fixture town and `minHouseholds: 30` only those of thirty households or more; a member with no access point, or a pair the parts do not connect, is left out and counted, and a spec whose every town skips is `insufficient`; T71-3 as a `NullModelSpec` (block scope, 20 permutations, the `margin` rule) gives the base's shuffled-placement result; the rules' code reproduces `critique_v12_nullrule_rank_power.out` and `critique_v12_pooled_exact.out` within two points | C | M2b |
| T-V12-15 | **The null never tests a hard need.** A spec whose statistic is fixed by a hard need (a watermill's distance to water) gives z = 0 on every town | C | M2b |
| T-V12-16 | **Seeds by formula.** V12 §2.4's check vectors reproduce; a planted collision is rehashed to `/r1`; the first 50 `bcity` seeds of a setting are B-CITY-lite's | C | PR from M1 |
| T-V12-17 | **Panels.** `plat d5 seeds` reproduces `seeds.json`; a key differing by one side fails its commitment and voids the panel; a missing answer leaves the panel *provisional — not rated*; verdicts on fixture answers equal the hand-computed §13.6 (6) results for MFCG (20 of 30), FTG (2 of 3 per rung), NG (14 of 20), Fantasy Manor, DW, AB (`reconcile`, `history`) and SOLO (⌈2n ÷ 3⌉ Yes), the M4-110 group included; the M6 panel's item-110 buildings record one `reads` answer per item in `AnswersFile.item110`, and V4-U5's `styleReference` image is shown and never rated; each of `D5PairStaged`'s five variants round-trips through `seeds.json` and `D5Record.pairs`; a `none` panel records answers, no verdict and status `descriptive`; the widened `D5Record` holds a `reads` answer, a SOLO Yes / No, and verdicts grouped by template, frame and class; a milestone with two panels lists both in `MilestoneRecord.d5`; a sitting never holds more than one re-offered earlier panel, and a re-offered panel carries a fresh commitment; registration refuses a panel with a bad id, no group, a group of count 0 or `reads` without a subject; an item whose framing target is absent takes the next seed, recorded; with no owner input every panel stays *provisional — not rated*, and one strip pick is released as a cells row | C | M1 (MFCG, FTG), M4 (the M4-110 group), M5, and each staged panel where it is sat |
| T-V12-18 | **Blind renders.** Both sides of every pair have the same pixel size and metres per pixel, no PNG text chunk, the standalone default view, a frame within our map's zoom-out limit (a wider frame clamped, the reference side cropped alike), and our side's label layer is empty | C | M1; the limit clause from item 116's milestone |
| T-V12-19 | **The sitting page works for the owner.** A three-pair fixture completes keyboard-only; a reload resumes with the answers kept; with browser storage blocked the page says so on its first screen and offers the export after every screen; the first screen says where the export lands; the export matches `AnswersFile`; axe-core finds 0 serious or critical violations (research-side harness) | C | M1 |
| T-V12-20 | **No provisional number dangles.** `plat calibrate register --check` is green: every calibratable cell is covered by an admissible source, an entry or a `fixed:` note; an `own` calibrate-later fixture cell without an entry fails; two entries or two columns for one knob fail; a cell of an owner-rule hard clause without its `ownerRule` stamp fails; every §13.7 letter has an entry; statuses move legally, and a `trial` row moves none; a fixture milestone with an overdue provisional entry fails its exit, one with an unrated `panel` entry reads *provisional — not rated*; an entry naming `bar.<barId>` with no registered bar, or `frame.<table>.<column>` of a non-calibratable column, fails, and one naming `bar.T-V6-8` with its `BenchBarDef` registered passes; an entry for a base cell whose base change request has not landed fails ("cell exists"); a fixture `siting.web` cell named by no line passes through the items 103–107 line's catch-all, and a column two lines bind fails; an entry naming `frame.*` beside a passing M2b metric is confirmed at M2b with no `frame.*` row until its corpus run, and an entry of `frame.*` metrics alone with a due before M-CAL fails; **the default line:** a registry column no named line binds fails without an entry, naming `plat calibrate register --defaults`, and passes once that command wrote `cal.<table>.*.<column>` (`corpus`, due M-CAL, [`frame.<table>.<column>`], `line: 'default'`), a second run writing nothing; a column of an empty table takes none until the change that ships its first row, whose entry names as `owner` the volume of that file's author seat, a second document's later cells not moving it; the FarmTable village rows take default entries and `territory.haPerHead` none (E-38); a named line restating a default entry in place passes, a named entry beside a default entry fails, and a `line: 'default'` entry with another method, due, metric or fallback fails; **the due's corpus run:** a column first landed after a committed fixture M-CAL record takes, from `--defaults --milestone M6-U`, due `M-CAL/under` and a first row naming M6-U, its landing exit passing, while the same entry due `M-CAL` fails, a default entry due `M-CAL/under` with no M-CAL record committed fails, and a `frame.*`-only named entry due `M-CAL/under` for such a column passes; `--defaults` without `--milestone` refuses writing nothing, `--milestone P1` refuses naming V12 §2.8's form, and such a column takes `M-CAL/M6-P` from `V3-P1`, `M-CAL/sky` from `V5-P1`, `M-CAL/under` from `V4-U3b` and a V11 C8 column `M-CAL/under` from `M6-U`; an entry due `E2`, or a stage due `U5`, fails naming the form, the same due `V6-E2` passing; **a value moved before its due:** a default entry written at M1 whose cells a fixture M5 change moves with no row fails `--check` naming `--defaults --milestone <id>`, and after `--defaults --milestone M5` carries a second cells row `{ date, value, milestone: 'M5', cells: true }`, every other field unchanged, and passes, a second run appending nothing; the command appends nothing to a `confirmed` entry or one whose due's record is committed, listing it as owed to a run, and `--check` fails it naming `plat calibrate run`; a closed default entry whose later rows are metrics rows and whose cells equal its last cells row passes; a named `measure` entry whose one metric is a `bar.` of a `BenchBarDef` with `stages` `[]`, its cells tuned before its exit, fails until `--defaults --milestone V3-P6` appends the cells row, its hand fallback applied in an exit's change closing it `fallback-applied`, while the same move on a named entry whose bar has stages fails as owed to a run and takes no row; rows added at `V3-P1` by another seat to a column whose entry closed at a committed M-CAL record fail until the command appends them, the report listing them "added after close", a changed M2b cell still failing as owed to a run; `--hold` appends one held row and nothing else, the report lists "held: a committed golden reads it", and `--check` passes the unchanged cells; an application constant whose provenance note names its test (V09's `raised.previewOnReleaseKm`, T-V9-3) takes no entry and passes; a confirmed entry whose released strip pick moves one cell passes once `plat calibrate register` appended the pick's cells row and fails before it; **staged entries:** `measure` at M2b, then `panel` at M4, then `corpus` at M-CAL — `provisional` with method `panel` and due M4 after M2b's passing row, `confirmed` at M4's rated pass, then a `frame.*` metrics row at M-CAL with its status kept; with a panel No (no second value) it closes `not-achieved`, its M-CAL row a metrics row; with M4 unrated it reads *provisional — not rated* and passes M4's exit; stages against §16's order (a `V4-U3` stage before an `M4` stage, a `corpus` stage first, an M-CAL stage before an M6-sky stage) are refused naming the pair; two stages at unordered rows (`V5-P1`, `V6-E7`) are each read at whichever exit comes first, while an `M6` stage follows an `M5` stage; an entry without `stages` reads as single-stage; a staged entry whose `due` is not its current stage's fails; **limits:** an absent `register.json` reads empty, every covered cell then failing; a column removed by a major table version fails "cell exists" until closed `fixed` | C | PR from M1 |
| T-V12-21 | **Evidence resolves.** Every compiled cell's `evidence` ids resolve to a baseline row, a run or a panel (a dangling id fails the compile); `dist/evidence.json` has a status, its entry, what measures it, its due and its last history rows for each covered cell and stays ≤ 200 kB; rewording an evidence line leaves every pinning hash and output version unchanged; the cell inspector (V09 §4.14) and §11.2's `RuleAnswer`, read by the clerk (V10 §3.5), show the plain line, the status, what measures it and the due on a fixture; with the file absent, or stale against the pinned table versions, both show "no calibration record for this table version" and the provenance source | C | M2b |
| T-V12-22 | **Drift is declared.** A week with no change writes one "no change" line and no row; a fixture new build's rows (one of them a one-seed change) are reported beside the pinned ones and gate nothing; a pin change without a `baselineShift` record fails CI; the record lists every flipped verdict; no document's digest moves with a pin | C | M1 |
| T-V12-23 | **Corpus intake.** On a synthetic corpus we author (60 maps, 5 flagged holdout, 2 flagged map-design, 3 frames, one map without an era key, one degenerate plate): 0 holdout or map-design maps measured, their counts recorded; every id salted; no corpus string but preset keys crosses; the keyless map excluded `unreadable` and the degenerate plate cleaned or excluded; `frames.json` crosses before any row of its frames, a frame whose declaration postdates its rows and a frame id declared twice with another digest are refused by C8; an empty synthetic corpus closes its entries `fixed` with "no admissible frame" | C | M-CAL (the synthetic corpus from M4) |
| T-V12-24 | **The base stays the base.** Every corpus run's cells target `historical:<frame>`; the shipped default tables and the `MFCG`, `FTG`, `NG`, `FM` and `VG` presets' goldens are byte-identical before and after M-CAL and each later `M-CAL/<layer>` (a preset entry moves only by its own reference run or its entry's own fallback run, never by a corpus run); proposals aimed at a naming table, a dossier row set, a `presets` entry, an `owner` cell or an `ownerRule`-stamped cell are refused with their rule | C | M-CAL; each `M-CAL/<layer>` |
| T-V12-25 | **Evidence gates.** On the synthetic corpus, a possibility-only row proposing a weight is refused E1; a 12-map frame setting a share is refused E2; a drawn plate aimed at a structural metric is refused E3; the possibility floor only lifts 0 to 0.02 or lowers 1 to 0.98, and only in a cell a register entry maps to the metric; the reachability search records a planted unreachable value; a planted record of a catacomb under a cathedral yields one `ownerExcluded` row, no layer cell and no known defect (109 (k) (2)), and a planted village catacomb the same (109 (k) (1)); a frame with zero raised ways yields the CITY raised-way chance at its owner-stamped minimum in the layer, a `floorsHeld` row and the report line; a witnessed TOWN aqueduct is recorded reachable by declaration and yields no layer cell | C | M-CAL |
| T-V12-26 | **Acceptance.** A1 – A5 evaluated on the synthetic corpus; the M-CAL panel's decision computed per frame by V12 §3.10.6's rule, an unrated panel leaving every frame `pending-owner` with its pack selectable; an adopted pack applies to a new document of its era and region and never to another, nor to a rung its frames do not cover; a fixture frame row failing under the default passes the parity exit as `reported`; a document pinning a retired pack version replays it | C | M-CAL |
| T-V12-27 | **Palette re-check.** A synthetic plate set within 3 units of the released corpus-sourced ends changes nothing; one outside requires the owner's pick; a one-ended fixture (darkest ink) is compared on our p90 only; ink warmth and `ink`'s chroma (our own tolerances) are never re-signed; a re-sign without the pick is refused | C | M-CAL |
| T-V12-28 | **Clean room.** `baselines.json`, `metrics.json`, the register, run and panel records, `answers.json`, `key.json`, the capture-id files and `frames.json` pass the scanner with 0 hits; no `MeasureInput` of a reference or the corpus exists under `plat/`, and no `plat/` test reads `captures/` (a path and header scan; T-V12-3 and T-V12-6 live research-side) | C | PR from M-1 |
| T-V12-29 | **Budgets.** V12 §6's rows, measured at their milestones (timings in the timing phase; CPU budgets by accounting) | C | as V12 §6 |
| T-V12-30 | **No silent gaps.** A row with a failed plan index listed in `sample.failed` passes C7; an unlisted gap is refused; an FTG capture without residents takes the nominal population, marked; a capture with coincident vertices, a zero-length segment, a zero-area footprint and a self-touching ring is cleaned by V12 §3.2.2's rule with `dropped` counted, and one left with no building is a failed index with reason `empty` | C | PR fixtures from M-1 |
| T-V12-31 | **The tendency rules are calibrated.** `plat statbar --calibrate` re-runs V12 §3.6b's simulations with the product's rule code and matches `v12_sweeprule.out`, `v12_rev_clustered.out` and `v12_rev_confirm.out` within two points on every rate; on fixtures a planted 0.55 share fails `most` and 0.80 passes, and with a town effect of ρ = 0.3 a planted 0.55 passes ≤ 2 % of the time on effective instances; a flat rate fails `trend`, a planted reversal fails the no-reversal clause, a rate off by half fails `rate` at 200 units; a per-household `higherWith` with a planted town effect holds its size ≤ 1.5 % after deflation; **family-wise:** 40 fixture bars at a planted 0.8-standard-deviation effect fire ≤ 0.1 fallbacks per table version with the confirmation stage; a suspect bar that passes its confirmation reads "pass on confirmation" | C | M2b |
| T-V12-32 | **Enclosures and way classes are measured by one rule.** On a cliff-closed fixture town (item 106) `walled.share` counts the buildings inside the enclosure, no tower spacing spans the closure, `gate.count` excludes a water gate and the harbour-mouth chain, `wall.barrierShare` equals the fixture's closure length share; the way mapping sends `through` and `primary` to `arterial`, `secondary` to `street`, `cul_de_sac` to `lane`, `path` to `track`, a bridge to its carried class and no `quay` or `pier` into the way graph, and a moat to still water; the five MFCG exports measured through the shore split keep T-V12-6's values, and the coastal city gives the 24 shore vertices and the 20 towers of its README's derivation | C | M1 (MFCG); M2b (ours, with item 106) |
| T-V12-33 | **The underground profile measures plans.** `undergroundInputOf` on a fixture ruin returns every gallery and chamber in every state; `plan.rightAngle` is 1.0 on a drawn rectangular grid and 0 on a drawn circle; `grid.r4` is 1.0 on an orthogonal grid and below 0.05 on 360 rays at 1° steps; `ruin.blockArea` on a 30 m centreline grid is 900 m²; `plan.*` and `ruin.blockArea` on a ruin with its stepped monument equal the same ruin's values without it; a zero-area void is no void, and an outline too small for 20 steps and a faceless gallery graph read `notApplicable` | C | `V4-U3` |
| T-V12-34 | **Distinctness and structure rules bite.** A ruin laid from the town's own culture row fails `paired`; a ruin flagged `sharedAxis` is judged on its two other measures; ruins drawn with the cavern's outline fail `twoSample`; a dispersed class whose share drops by 0.10 with the web on fails `noRegression` | C | `V4-U3`; M2b (the web) |
| T-V12-35 | **The bar map is wired.** Every row of V12 §3.6b's bar map has a registered spec whose owner, owner's bar, rule, parameters and levels match; `plat statbar all` runs each on its tier; a registered spec absent from the map fails; a tendency bar in §13.2 without a spec fails, except a clause on the registry's `conformance` list (§13.2's conformance clauses of items 105 – 118 and 120 – 126, V12 §1, V12 §3.15); the 104 (h) (8) comfort row's spec carries `ownerBar` T104-3 and the 107 (g) row's T107-1 and T107-2; item 102 (g) has no spec | C | M2b (web, siting, chains, item 111); `V4-U3` (underground); M3a (raised ways) |
| T-V12-36 | **Both known-city fixtures pass (item 110 (e), (f)).** For K1 and K2: the skeleton file and V09's canvas script give one model digest under `known/<id>` (differing digests fail naming both); the structure list of V12 §3.14 holds on all three paths and its emulation subset on V09's L2 variant; a failing check names its id and `what`, a degenerate target entity fails its check; `namesClean` finds 0 scanner hits; registration refuses a fixture missing an input file or with an empty list; the exit carries `T-V12-36:<id>` and the research-side "no outline traced" verdict at M3a | C | milestone tier from M3a; PR: K2's skeleton path |
| T-V12-37 | **The no-op pins and the switch-on bumps.** Before an item's switch-on, a commit landing its code produces zero ShiftRecords on the pin's suites; after it, the suites under the overlay are byte-identical to the off-state set; a planted draw on a shared stream fails the pin, a planted empty array fails it, an unrelated planted table shift re-records both sets with matching stage lists; item 110's four bumps produce records with exactly their own `feature` cause, the raised bump moving no THORP – TOWN S4 or S5a – S5d isolated digest; across the bumps the `MFCG`, `FTG` and `FM` presets' goldens stay byte-identical and no P row's input holds a `retaining` or `raisedSupport` feature, a way with `part` ≠ 0, or any feature its preset resolves off; every registered pin of V12 §2.13 runs — a planted season-dependent model write fails `item117.season`, a planted decoration drawn with no traditions fails `item118.festival`'s tiles, a planted TOWN change at item 115's bump fails `item115.ceiling`, a planted village-rung change with every ceiling row's `enabled` false fails `item115.off`, a planted chip-dependent model write or log entry fails `item120.find`, a planted Resolution-dependent export byte fails `item121.display`, a planted look drawn with no condition and no preview fails `item122.crises`' tiles, a planted damaged element on a never-decayed building fails `item123.damage`, a planted tile re-raster during a spell fails `item124.effects`, a planted `HostContext` field read into the document fails `item125.host`, a planted view-key change on a resize below 600 × 480 fails `item126.resize`; registration refuses an empty overlay, a rung pin without rungs, a view or input pin without values, an entity-scope pin without its entities and an unregistered suite | C | PR (the landing gate, two golden seeds); nightly from M3a; at each bump |
| T-V12-38 | **Item 110 measured without disturbing the old metrics.** On a fixture CITY with a viaduct over two streets, an arched aqueduct over two other streets, a terrace crossed by a stair, a mole with deck buildings and a stepped temple: the viaduct adds no node of degree ≥ 3 away from its ramp feet (`raised.junctions` 0); the aqueduct adds no node, edge or length to any way graph (`junction.*`, `street.*`, `sgd.*`, `street.detour` and `street.cyclesPerKm2` equal those of the town with the aqueduct's way deleted); `wall.*`, `gate.count` and `wall.ungated` equal those with its retaining walls deleted; `bldg.*` and the cluster blocks equal those with the supports and spans deleted; T-V12-4's equality holds with every kind and property item 447 exports | C | M3a |
| T-V12-39 | **The raised-way bars.** The four `T110b.*` specs are registered as mapped; on planted fixtures a viaduct chance at its owner-stamped minimum at CITY passes `presence` with N = min(500, ⌈5 ÷ p⌉) towns on the ravine site, an elevated-road chance flat across `wealthLevel` fails the trend, and a landmark factor of 1 fails `higherWith`; a spec whose ravine site lets a cheap detour win is refused at registration | C | M3a |
| T-V12-40 | **A suppressed raised way stays suppressed.** On a CITY fixture document with one generated viaduct removed: an upgrade across a release that lowers `viaduct.minDropM` leaves no raised way at that reason; applying a historical pack that doubles the viaduct chance leaves none either; in both the fates list names the held suppression; undoing the apply restores the prior document byte for byte | C | M3a |
| T-V12-41 | **The monotone engine.** On the catacomb fixtures the step runner performs Regenerate, a Re-derive from S1 and from the underground stage, New random on the system, an upgrade replay, a dossier burial event and extend-growth through the base's own events; a planted shrink at any step, a complex vanishing between steps, or a growth above its cap fails with the record, the step and both values; a stagnant fixture's fill rising while its extent holds passes and a planted fill drop fails; the author-delete probe lowers the extent by exactly the deleted area and no later step re-digs a tombstone; an author edit in an `exactMonotone` script is refused, and an `exactScript` runs its author steps through §7.1's events | C | `V4-U3`; the E-milestones (V06) |
| T-V12-42 | **The harness at its limits.** One fixture per row of V12 §3.16.1, each producing the outcome its row names on its failure rung — never a crash, a hang, a lost record or a silent wrong value | C | PR fixtures from M1; each row from its mechanism's milestone |
| T-V12-43 | **Features under the parity presets.** Each row of V12 §3.16.2 on its fixture under each parity preset at each rung it names: generation completes by §5's ladder (a failed seed reported and counted); no feature the preset resolves off appears in the P input (a leak fails naming the row and the feature); the P rows read the present features by V12 §3.4.2's rules; a row with no reference setting reports `notApplicable` | C | nightly from each feature's milestone |
| T-V12-44 | **Item 111's bars are wired** (takes T111-1 – T111-5: their specs and `item111.water`). `T111d.walk`, `T111d.water.<kind>` and `T111d.rich` are registered as V12 §3.6b's bar map states; on planted fixtures a flat walk-to-water share fails `higherWith`, a river chance drawn at half the arid row's fails its `rate`, and a richest band farther from water than the middle band in most towns fails `most`; `water.kinds` flags a generated oasis on a temperate row; `item111.water` holds; the item-111 register lines are written at M2b | C | M1 (T111-2, T111-3, T111-5); M2b (T111-1, T111-4) |
| T-V12-45 | **The style line and the trial's findings (item 112)** (takes T112-1's style line). `bar.T112-1` fails a fixture variant whose one legend pair falls below §8.2's threshold and passes once its colours are fixed, the threshold's entry unmoved; `plat calibrate register --trial` on a fixture `TrialRecord` appends a `trial` row to the threshold's entry for a colour finding, moving no cell and no status, opens a `known-defects.json` entry for an unfixed minor, closed by a fixture change marking it fixed, refuses a finding naming a calibrated value with no entry, and appends nothing on a second run | C | M3b (the line); the release candidate (the trial) |
| T-V12-46 | **Item 113's registrations** (takes T113-2's five-engine digest, T113-5's `T113e.lost` and T113-7's pin `item113.history`). `T113e.lost` on V04's LOST fixtures: after the sealing epoch and after the author `delete` the void is LOST and its dwellings empty; after the reopening epoch and the dig they return; a planted void staying reachable through a closed link fails; the history fixtures' digests agree on the five engines (T113-2); `item113.history` holds; the item-113 register line's entries take their `V6-E9` row from T113-1, T113-3, T113-4 and T113-6's registered `BenchBarDef`s | C | M6-E (`V6-E9`); M6-U (T113-5, at the later of the two) |
| T-V12-47 | **Item 114's specs and bench bars** (takes T114-4 – T114-7 and T114-8's pin `item114.condition`). On V06's wall fixtures `T114g.oldestFirst` fails a planted recovery that replaces a younger patch first and one that replaces a live-era patch before a replay-era one (T-V6-73's history-first fixture), and `T114g.sustained` a planted change on a driver alternating across its threshold, `bar.T114-4` and `bar.T114-5` resolving to them; `bar.T114-6` fails a planted `patched` row whose luma equals `standing`'s at a band where both draw, and `bar.T114-7` a readiness × wealth fixture whose shares differ from the derivation row's by more than one run; `item114.condition` holds the golden suite at generation and reproduces V06's neglect and repair | C | M2b (T114-6, T114-7 and the pin's generation clause, with §7.7's DR41 and the state rows, §13.8); M6-E (the specs and the pin over epochs) |
| T-V12-48 | **Items 115 and 116** (takes T115-1's statistic, T115-4's two pins and T116-1's statistic). `bldg.grandeur` counts an `H` dwelling, a court and a second manor on a planted rich HAMLET fixture; the rung pin `item115.ceiling` holds TOWN, CITY and METROPOLIS byte-identical across the ceiling table's bump, and the off-form pin `item115.off`, with every ceiling row's `enabled` false, holds every rung byte-identical to the base; `view.limitStop` reports the whole bounds inside the limit, or the limit at stop 0 where they do not fit (the METROPOLIS cap at 1 280 × 720 and at 600 × 480 CSS px), and 0 reachable stops beyond it at every rung THORP – METROPOLIS, and a planted extra stop fails | C | M1 (item 116); M2b (item 115); the village rungs with volume 7 (§13.8) |
| T-V12-49 | **Items 117 and 118** (takes T117-1 and T118-1's pins, T117-2, T117-4, T117-5 and T117-7, and T118-2 – T118-6). `item117.season` and `item118.festival` hold on their suites; `bar.T117-2` counts ≥ 5 crown colours on the autumn fixture and fails a planted single tint, and `T117i.leafCover` fails a planted week whose cover thins; `T117i.arid` fails one planted snowflake; `T117i.ice` fails a planted river frozen before its pond and ice on a mill race; `T117i.styles` runs T112-1 at each season's middle week and fails a planted season whose one legend pair falls below §8.2's threshold; a `{ week }` step moves no model digest; the `BenchBarDef`s T118-2 – T118-6 each fail their planted breach (a decoration a week outside the window; a differing export tile; a CITY banner at a HAMLET; a staging off its keyed place; a pennant across a gate's passage) | C | M3b (items 117 and 118, §13.8) |
| T-V12-50 | **Item 119's measurements** (takes T119-1's target report, T119-2's timer, T119-4's budget-register check and T119-5's interaction-row comparison). On the timing-phase runs every `wait.*` kind is timed click to complete at every rung's top and the metropolis cap, advance time and the history replay each in total (item 119 (a2)): a planted 60-epoch advance of 0.2 s an epoch (12 s in all) fails the comfort bar though no epoch takes a second; a planted 11-second wait fails the comfort bar naming the wait and rung; a planted 1.4-second wait with no progress frame fails, and one showing an empty frame fails; a `perf.qualitySpend` row whose `gainBar` fails, whose gain its runs do not show or whose `run` is absent fails the budget-register check, as does a stage timed above its §12 target with no row standing, while a row whose gain the runs show passes; a relaxed interaction row fails it; a target miss inside ten seconds is reported as D-18's declared miss and gates nothing | C | M1 (TOWN, CITY); M2b (METROPOLIS and the cap; the budget-register check); each other wait from the milestone that lands it — M3a (a dossier change applied, a migration), M6-E (advance time and the history replay), M-SF (an open from SettlementForge) |
| T-V12-51 | **The owner's sittings follow J122.** Only M1, M2b, M4 and M5 register `sitting` as themselves; every other panel registers `nextGating` and is batched into the next gating sitting when its build has landed by then; a staged panel whose build lands after M5 stays *provisional — not rated*, re-offered with every release, and never fails an exit | C | M1 |
| T-V12-52 | **Item 120's measurements (Find)** (takes T120-1 and T120-6; its statistics measure T120-2 – T120-5, whose interface clauses V09's T-V9-83 takes). `item120.find` holds on its suites: a planted chip-dependent model write, saved byte or log entry fails it, and a planted base tile left redrawn after Clear fails its tiles; `find.matches` fails a planted chip drawing an entity the gazetteer does not return and one missing a row; `find.leaks` fails a planted canary in a suggestion, in a count bubble and in a gap outline on the canary's district under a player view; `find.held` fails a chip set dropped at a planted layer change, a chip dropped by a migration, a chip removed from the set with its last match and a match left glowing after its entity's removal; `find.pins` fails a planted city-band match with neither pin nor bubble; `find.cues` fails a planted ninth chip without its glyph; a planted suggestion time above §12.5's budget at the METROPOLIS cap fails its timing row, and a relaxed Find row fails V12 §3.15.9 (5)'s comparison; the chip sets drawn by `find/<seed>` reproduce | C | M5 (Find's milestone, §16) |
| T-V12-53 | **Item 121's measurements** (takes T121-2, T121-3, T121-5, T121-6 and T121-8). On the threshold fixture a loop planted without its 10-second spacing fails `resolution.changes` (two changes in one window) and one planted to apply a change mid-pan fails it (a change during a gesture); a planted load holding the reference device's p95 over 16.7 ms under Auto fails `resolution.p95`; a planted label glyph composed into the base tile at a tile DPR below the device's ratio fails `resolution.textPx` at that level; a planted export reading the tile DPR fails `item121.display`; a planted ultra-tier canvas over 512 MB, or a light rung given up at native 4K, fails `resolution.ultra4k`; the 5K and 8K fixtures draw at their 4K-equivalent DPR with `resolution.textPx` 0; a device below the low tier is reported, never gated | C | M4 (§16) |
| T-V12-54 | **Item 122's measurements** (takes T122-1, T122-2, T122-3, T122-5, T122-6 and T122-7). `item122.crises` holds on its suites; a planted look drawn with Show crises off fails it and one drawn with no condition and no preview fails its tiles; `crisis.weeks` fails a planted look drawn one week past its `untilWeek`, one drawn for a condition whose `untilWeek` is not after its `sinceWeek` and a planted look drawn for a `none`-row condition carried beside the looks — each look-bearing condition's look drawn at `public`, `local` and `secret` alike passing; `crisis.stable` fails a planted unkeyed draw (two opens differ); `crisis.scale` fails a planted CITY camp smaller than the TOWN one at equal severity, a camp shrinking as severity rises and, by its second count, a camp drawn at double its row's `scale` cell — a fire calamity naming more target districts than its share's count, every one drawn, and a fire whose district adjacency ends before its count, its shortfall reported, passing; `crisis.blocked` fails a planted tent in a gate's passage, one on water and a planted camp on a way's carriageway, which holds nothing save a barrier across it (a `barricade`, a `beast`'s `stakes`, a quarantine's `cordon`; §10.2 (d)) — the `blockade`, `raiders` and `rebellion` barricades across their ways, a `beast`'s stakes where its edge crosses a way and a quarantine's cordon across each way entering its quarter passing; `crisis.share` fails a planted refugee camp placed before the siege and planted camps together past `densityCap`; `time.crisisReskin` fails a planted re-raster of every cached tile at a week crossing a condition's edge | C | M3b (the previews; the `disaster` preview's district clauses from M5); M-SF (the dossier crisis fixtures) (§16) |
| T-V12-55 | **Item 122 (h)–(i)'s own bars.** On V08's force fixtures `crisis.areaPerHead` lies in [0.9, 1.1] for every army and group and fails a planted camp sized by severity where a headcount is given; `crisis.coalition` lies in [1.8, 2.2] and fails a planted coalition drawn as one army's camp; `crisis.framing` fails a planted opening view leaving a camp out, a limit not restored in the first week no look stands and a moved view re-framed when a look begins; on the 60 000-head THORP siege `crisis.ring` finds every remainder's arc, and the frame, the margin, the model digest and the hash equal those of the same document with no condition | C | M3b (the framing on previews); M-SF (the headcounts) (§16) |
| T-V12-56 | **Item 123's measurements** (takes T123-2, T123-3 and T123-7). On the damage fixtures `damage.nested` is 0 over the 21 levels and fails a planted threshold re-drawn per level (an element damaged at 0.4 and whole at 0.45); from M6-E it is 0 over H-100's decay runs' weeks; `damage.breakLevel` fails a planted threshold keyed by a draw counter (a regeneration moves an element's level); `item123.damage` holds the never-decayed control and the underground's bands and fails a planted rubble stipple drawn on every building | C | the V03 step that draws a decayed or ruined plan (V03 §8); M6-E for the decay runs (§16) |
| T-V12-57 | **Item 124's measurements** (takes T124-1 – T124-4 and T124-6 – T124-9). `item124.effects` holds on its suites and fails a planted spell that re-rasters a tile and one that writes a view key; `weather.frameMs` reports each kind's densest p95 and fails a planted density four times the row's on the reference device; `weather.snow` fails one planted snowflake on an `arid` row; `weather.aridRain` fails a planted arid row whose showers come ten times too often and one raining in a dry week; `weather.cover` fails a planted drop drawn over a label; `weather.luma` fails a planted lightning flash and a shower fading in over 0.2 s; `weather.replay` fails a planted spell drawn from the host's clock | C | M3b (§16) |
| T-V12-58 | **Item 125's measurements** (takes T125-1 and T125-2). On the required-keys dossier `port.fallbacks` is 0 at every rung, THORP to the METROPOLIS cap, and fails a planted used field read with no fallback report and a planted stage left without output; with no stamped tick the clock starts at week 0, the year position at midsummer (week 19); `item125.host` holds over B-DOSSIER-lite and the required-keys dossier and fails a planted host week read into the clock and a planted `audience` read into a stage | C | M-SF (§16) |
| T-V12-59 | **Item 126's measurements** (takes T126-1's medium-minimum clause and T126-2). `layout.touch` is 0 at 600 × 480 with `AppPrefs.touch.editFabric` on and fails a planted tool whose canvas script needs a hover; `layout.belowMedium` is 0 over the resize script and fails a planted narrow layout below 600 × 480, a tool greyed there and a page that does not scroll; `item126.resize` fails a planted view re-framed by a resize and a selection it clears; the fixture registry holds no viewport but the resize script's sizes (no phone viewport) | C | M2a (§16); each tool's script from the milestone that lands it, every tool from M3a |

### 7.2 Parity metrics for this volume's own subject

The subject here is measurement itself, and the reference that owns it is our own recorded measurement of the references:
T-V12-6 holds the one implementation to the red-team's and the sweep's executed numbers on the same files, and T-V12-3 holds
it to every M-1 row. The generator's parity against MFCG, FTG, NG, VG and Fantasy Manor is §13.5's rows and the volumes'
rows, which this harness runs (V12 §3.4.4). The owner's later rules (items 110–126) have no reference at all: their bars are
ours only — the conformance clauses, the tendency and property specs, the known-city fixtures, the pins, the M4-110 group
and the statistics of items 120 – 126 — and
the parity presets never show them (T-V12-37, T-V12-43).

## 8 Build plan

### 8.1 Where it slots into §16

Most of this volume is the base's own verification rig made exact, so it is built inside the base's milestones, from M-1 to
M4, and priced as an itemised widening of §16's rig line (file f item 533, stated as deltas; §16's total computed once there, item 568). The known-city fixture engine,
K2, the no-op pin engine and item 110's measurement profile land at **M3a** with item 110 (a) – (d)'s base parts (the base outline builder's stepped and deck constructions among them, item 229), the four
raised-way bars and the TOWN guard inside M3a too, where raised-way generation lands (items 244, 290); the M4-110 group at
M4. The harness parts of items 111–126 land with the milestones that land each item's base part (§13.8's schedule;
items 120 – 126's as §16 places them, J122: Find at M5, item 121 at M4, items 122 and 124 at M3b with the `disaster` look's district clauses at M5 and item 122's dossier
and force bars at M-SF, item 123 with V03's damaged-plan step and V06's level at M6-E, item 125 at M-SF, item 126 at
M2a; V12 §3.15). The panels of M5, M6, V-M4 and the volumes' steps register on the engine M1 builds; their content is their
volumes', and each is sat at the next gating sitting after its build lands (J122; V12 §3.9.1). The corpus reconciliation is
its own staged milestone, **M-CAL**, after M6-sky in §16's order (J122), its inputs the standalone generators (M4, M5, M6,
V-M4), and before the SettlementForge stage M-SF (V08, J-V8.39; item 529); its later runs `M-CAL/<layer>` follow the layers that land after it
(V12 §3.10.1). The owner's roadmap stages it, so its price sits outside the base's total, as M-SF's does.

### 8.2 Steps, estimates and exits (person-weeks, expert; PLAUSIBLE)

| step | milestone | content | exit (executed) | pw |
|---|---|---|---|---|
| W1 — the capture plan and the crossing | M-1 | the seed families' research-side twin (`docs/validation/bench/v12_h32_vectors.py` is its check); the capture plan; MFCG at ten seeds per matched size plus five stress seeds; the adapters with the degenerate-geometry rule; the M-1 metric scripts for every ⟨M-1⟩ and baseline row of the catalogue; `cross_check.py`; the pins and the first `CrossingRecord`; spikes S-V12-1 and S-V12-2 | every §13.5 baseline row present by the ⟨M-1⟩ rule (§16 M-1); T-V12-1's fixtures on the twin; T-V12-6 (twin); T-V12-28; T-V12-30 | 0.5–1 |
| W2 — measure, parity, panels | M1 | `@plat/testkit/metrics` with `METRICS`, `measureInputOf` with the enclosure profile, the MFCG shore split, the derived features, `plat measure`, `plat baselines check / aggregate`, `plat parity` to V12 §3.5 with the dashboard and CSV; `@plat/testkit/seeds` with B-CITY's and the goldens' formulas (item 491); the panel engine (`PanelSpec` with its `sitting`, `plat d5 verdict` reading only crossed files, the variants' types, the widened `D5Record` and the milestone's panel list) and `build_sitting.py` with its storage fallback; the research-side checks `check_t3.py` and `check_t6.py`; `history.jsonl`; the M-1 metric rows' product side (`street.detour` … `draw.hairline`); the register with §13.7's letters and the M1–M2b constants, and `plat calibrate register --defaults --milestone <id>` (the default line with *The due's corpus run*'s table, the moved-value, rows-added and held rows, the staged entries, the due test and §16's order) | T-V12-1 – T-V12-7, T-V12-16 – T-V12-20, T-V12-22, T-V12-32's MFCG clauses, T-V12-51; the M1 panel sat or *provisional — not rated* | 1.75–2.25 |
| W3 — tuning and correlations | M2b | `plat calibrate run` (the search, guards with the fixture suites, holdout, the stage-isolated shortcut, emission and revert, the owner-stamp and minimum refusals); `plat nullmodel` with the rank rule, the pooled exact route, the headroom lint, the confirmation stage and B-CITY's towns; `plat statbar` with its rules (effective instances, the town clause, derived values, `stopAfter`), `--calibrate` and the bar map's siting, web, comfort and chain specs; the `evidence` ids with V11's compiler, `dist/evidence.json` with the register fields, the `ownerRule` stamps; the register's lint over every calibratable cell; the first runs (`headingSigma`, the rung modifiers, O18 (j), items 24, 30 and 71's weights as they fall due); spikes S-V12-3 and S-V12-4 | T-V12-8 – T-V12-15, T-V12-20, T-V12-21, T-V12-31, T-V12-34's web clause, T-V12-35; every entry due at M2b confirmed, fallen back or not achieved | 2–2.75 |
| W5 — item 110's harness | M3a; M4 | the known-city fixture engine (`KnownCityFixture`, `StructureCheck`, the three paths' runner, the emulation subset), K2's structure list and golden, K1 on the engine; the no-op pin engine and the landing gate; the profile's item-110 kinds (item 447); the four raised-way bars and the TOWN guard; the M4-110 group and the item-110 register lines | T-V12-36 – T-V12-40 and T-V12-11's TOWN clause at M3a; T-V12-17's M4-110 group clause at M4 | 1.25–2 (M3a 1–1.75; M4 0.25) |
| W4 — notes, audit, drift | M3b – M4 | the release notes' calibration section and new-behaviour lines; the register report; M4's provenance audit reading `evidence`; a rehearsed pin change | the M4 audit green; T-V12-22 on a rehearsal | 0.25–0.5 |
| W6 — the underground's harness | `V4-U3` – `V4-U5` | `undergroundInputOf` with the monument rule; the crypt and catacomb metrics; the step runner for `exactMonotone` with record identity, `exactBound`, `exactScript` and the author-delete probe | T-V12-33, T-V12-41 | 0.25–0.5 |
| W7 — the owner rules 111–126 and the edges | M1 (item 111's rate specs and pin; item 116's `view.limitStop`; the `--trial` entry; the edge suite's M1 rows); M2a (item 126's `layout.*` and `item126.resize`); M2b (`T111d.walk`, `T111d.rich`; the wait timer and the budget-register check over `perf.qualitySpend`; T114-6, T114-7 and `item114.condition`'s generation clause; item 115's two pins and `bldg.grandeur`); M3b (the style line; items 117 and 118: the view pins, T117-2, the `T117i.*` specs on `{ week }` steps, T118-2 – T118-6; item 122's previews (the `disaster` preview's districts at M5), its `crisis.*` statistics there and `item122.crises`; item 124's `weather.*` and `item124.effects`); M4 (item 121's `resolution.*` and `item121.display`); the V03 step that draws a decayed or ruined plan (item 123's `damage.*` sweep and `item123.damage`); M6-E and M6-U (`T113e.lost`, the item-113 registrations and pin, item 114's step specs over epochs, the advance's and the replay's total timing; `damage.nested` over V06's decay runs); M5 (Find: `item120.find`, `find.*`, the Find timings; the `disaster` preview's district clauses of T122-2, T122-3, T122-5 and T122-6); M-SF (item 122's dossier crisis and force fixtures with item 122 (h)–(i)'s bars; item 125's `port.fallbacks` and `item125.host`); the release candidate (`plat calibrate register --trial`) | V12 §3.15's registrations, V12 §2.13's pins beyond item 110, V12 §3.16's suites; items 111–113's registrations and the style line ride W2, W3 and W6's engines at no added price (§16's rig line absorbs them), and item 120's pin, statistics and timings ride the `view` pin kind, the nightly statistics and the timing phase at none either (J-V12.97), so W7 prices items 114–119's specs and pins, the `exactScript` author and week steps, the `rungScope` and `view` pin kinds, the wait timer and the edge suite (0.75–1.25), and items 121 – 126's measurements: the `entityScope` and `input` pin kinds and the `view` kind's device and window values, item 121's device fixtures, threshold fixture and captures, item 122's crisis and force fixtures and placement reads, item 123's level sweep, item 124's climate-row sweeps and simulated clocks, item 125's required-keys runs and item 126's touch and resize scripts (0.5–0.75) | T-V12-42 – T-V12-50 and T-V12-52 – T-V12-59, each at its milestone | 1.25–2 |
| — panels and bars of later stages | M5, M6, V-M4, V3-P6, `V4-U3` – `V4-U5`, M6-sky, `V6-E7` | the NG, Fantasy Manor, VG, Dwellings, SOLO, island and history panel specs on the engine; item 109's bar specs | T-V12-17's clauses for each; T-V12-34, T-V12-35's underground clause | within V01, V02, V07, V03, V04, V05, V06 |
| M-CAL — the corpus reconciliation (staged) | after M6-sky (§16; J122), its inputs M4, M5, M6, V-M4 | the owner opens it; the adapter, its frames and `frames.json` (research side, 1.5–2.5); measurement and crossing (0.5–1); the corpus runs per frame, upstream first, with the reachability search, R6 and the owner-excluded report (2–3.25); the historical pack in §7.6's packs slot with per-frame adoption (0.25); the M-CAL panel, the palette re-check, the report and the release (0.5–1); the synthetic corpus for T-V12-23 – T-V12-27 is authored at M4 | T-V12-23 – T-V12-27; the M-CAL panel rated or *provisional — not rated* (every frame then `pending-owner`); the `ReconciliationRecord` committed | 4.75–8 |
| M-CAL/<layer> — the later corpus runs (staged) | after M-CAL and the layer's last milestone, each on the owner's word | one run over the entries due there on M-CAL's frames — the underground's E1 and E4 only, the sky's and the evolution engine's as their frames admit; the pack versions, the panel only when a cell moved, the report and the release | the run's entries closed; its `ReconciliationRecord` committed; its panel rated or *provisional* when held | 0.25–0.75 each |

**The total.** The base side, W1 – W7: 7.25–11 pw (W1 – W6 6–9; W7 1.25–2), priced on §16's rig line; M-CAL
4.75–8 pw and each later corpus run 0.25–0.75 pw, staged.

### 8.3 Risks, spikes and their pre-decided outcomes

1. **Small reference samples make noisy bands** (FTG has three captures per size). *Spike S-V12-1 (M-1, 1–2 days):*
   bootstrap the ten MFCG seeds per size — draw ten with replacement 1 000 times, recompute each target band, and count how
   often a fixed candidate value's verdict flips. *Pre-decided:* above 10 % of target rows flipping in over 5 % of draws,
   MFCG goes to 20 seeds per size (minutes of exports); FTG's rows stay as §13.5 classes them (weakness and descriptive, the
   one declared target exception).
2. **The derived street graph may be unstable** (skeleton spurs on footprint outlines). *Spike S-V12-2 (M-1, 1 day):* its
   metrics on the ten seeds per size; *pre-decided:* a metric whose seed-to-seed CV exceeds 0.3 becomes descriptive by the
   ⟨M-1⟩ rule and enters `known-defects.json`.
3. **Targets fight each other** (a gain on one row costs another). The guards stop a trade; a run that cannot satisfy both is
   rejected and the register's fallback decides.
4. **Tuning over-fits the train seeds.** The per-run holdout and the gate seeds after release (V12 §3.7.5 – V12 §3.7.6).
   *Spike S-V12-3 (M2b week 1, 2 days):* `headingSigma` end to end — spec, search, holdout, emission, revert — before any
   other run.
5. **The correlation rule mis-calibrated on real placements** (effects smaller than the planted ones). *Spike S-V12-4 (M2b,
   1 day):* T71-3 and three g bars on B-CITY-lite; *pre-decided:* a bar that fails takes its spec's fallback (V12 §3.6),
   never a lower threshold.
6. **The owner's time** — four gating sittings of about an hour (J122), the staged panels batched into them or left
   unrated. §13.6 (7)'s rule answers it: an unrated panel never stops the build and never lets a gate be claimed, and an
   unrated M-CAL panel leaves every historical pack selectable (`pending-owner`), never a default.
7. **The corpus may hold few surveyed frames.** Then reconciliation is mostly possibility (reachability) and drawing (look
   targets); the process runs unchanged and says so in the owner's report — no prevalence is invented.
8. **A reference build disappears** from its host. The captures on disk remain the evidence; the pin freezes on the last
   captured build, recorded in `drift.md` (V12 §3.8).
9. **Real tendencies may be weaker than the simulated ones** (instances of one town correlate; the design's rows may produce
   smaller shifts). The bars carry their owners' fallbacks (V12 §3.6b); a bar that fails twice is *not produced*, never
   relaxed, and T-V12-31 keeps the rules' own calibration honest.
10. **A fixture level may be unreachable by a frozen S1 output** (a source a later stage decides). The spec is refused at
   registration (V12 §3.12) and its owner states the level through a dossier fixture or a declaration instead.
11. **An item-110 capability may be missing at M3a.** K2's StructureCheck then fails M3a's exit (no deferral); the capability's
   base part lands before M3a closes, or K2's golden is recorded without it only if the owner moves that capability's
   milestone in writing — an owner decision on product order, never a seat's.
12. **Small pulls may escape the rank rule** (its power at a 0.3 pull on single members is 0.30 – 0.54). *Pre-decided:* a
   member-on-plot statistic always takes the pooled route (power 0.38 – 1.00 on the same fixtures); a bar still failing takes
   its fallback — never a looser rule.
13. **The pins double the golden job's time.** *Pre-decided:* V12 §6's rotation by item; the landing gate never rotates.
14. **A one-time wait may exceed the ten-second comfort level** (the history replay at METROPOLIS, a large export). The bar
   fails (item 119 (a)); the owning path takes its §12.10 row's pre-decided change, and a slower step survives only with its
   `perf.qualitySpend` row and the gain its bar shows (V11 §3.25.8) — never a relaxed comfort level.

## 9 Decisions (each vetoable)

Each row is in its current form; a row another decision changed carries one mark, "amended by X" or "superseded by X"
(E-24), the governing row keeping the reason.

| id | decision |
|---|---|
| J-V12.1 | chose one implementation of every metric — the product's `plat measure`, run research-side on reference and corpus inputs from M1, the M-1 scripts kept only as cross-checked twins — over separate research-side and product-side implementations, because a definition that drifts between the two sides is the silent way a parity number lies |
| J-V12.2 | chose a `MeasureInput` of numbers, geometry and closed vocabularies only — no names, label text, colours or styles — over carrying names for traceability, because names are creative content the firewall and the corpus's "drawing, never naming" rule both keep out, and the salted ids trace a row well enough |
| J-V12.3 | chose ten reference seeds per matched MFCG size with the min–max estimator below ten seeds and type-7 quantiles from ten, over §13.5's five seeds, because [min, max] of ten draws covers 0.82 of the spread on average — the intent of [p10, p90] — while five cover only 0.67, and the extra exports cost minutes |
| J-V12.4 | chose seed families derived by `H32` from structured labels, with a priority-ordered rehash on collision and B-CITY and the goldens formula-derived too, over stored seed lists, because a formula is a pre-registration anyone can recompute from text, and disjoint families keep tuning off the test seeds |
| J-V12.5 | chose to derive cluster blocks and a street graph from footprints alone, identically on ours, for rows whose reference lacks blocks or lanes, over comparing our true blocks with MFCG's reconstructions, because only the same derivation on both sides compares like with like |
| J-V12.6 | chose the scalar band as the union of §13.5's multiplicative band and the ± 15 % single-value band, additive for sign-indefinite metrics and floored by `absFloor`, over the multiplicative band alone, because a narrow reference spread would otherwise give a band narrower than a single value's, and a zero-centred metric has no multiplicative band |
| J-V12.7 | chose the KS rule as the median of single-seed-against-single-seed distances compared with the reference's pairwise p90, over pooled-against-pooled distances, because the reference's spread is measured seed against seed, and pooling shrinks a distance and flatters ours |
| J-V12.8 | chose the MFCG settings' population as the one whose expected non-hinterland building count equals the reference's median building count — 3.4 persons per building ÷ (1 − the hinterland share measured on B-CITY-lite), solved per rung at each milestone — over the rungs' target populations or 3.4 × the whole count, because §13.6 (3) matches building counts, MFCG exports no farmsteads, and a population off by a third, or by the hinterland's share, would compare towns of different sizes |
| J-V12.9 | chose a canonical `ParityReport` — sorted rows, six significant digits by our own formatter, `dmath` in the metrics — over host float printing, because a report is then a fact with a hash, identical on every host, and a changed report always means a changed measurement |
| J-V12.10 | chose calibration runs whose spec is committed before the first evaluation, with common random numbers, per-run train and holdout families, at most four cells and no gradient method, over hand tuning, because a pre-registered objective cannot be chosen after seeing results and the holdout catches a value fitted to its seeds; "over hand tuning" binds a value a stage already reads in a committed golden, while a value set before any reader's golden holds it is authoring, recorded by V12 §3.11's moved-value row. *Amended by J-V12.77.* |
| J-V12.11 | chose that no run may move an `owner`, `owner-eye`, palette-target, `host`, `MFCG` or `FTG` preset value; that a `presets.FM`, `presets.VG` or `presets.NG` value moves only by a `reference` run against that preset's own reference or by a `fallback` run applying its register entry's own pre-decided fallback, touching no default, and only where a register entry names it (V02 §3.10.8 at M6c; V07's one measured-rate entry, `rules.race.densityPower@VG`, at V-M4, every other `VG` entry code-read or `fixed:`); and that every owner-rule bar is a guard — over letting parity numbers win or freezing every preset, because the owner's rules outrank parity, and the FM and VG presets' measured-rate cells exist to be set against their own references while no default moves with them. *Amended by J-V12.63, J-V12.67.* |
| J-V12.12 | chose, for every random-baseline bar, the randomised-tie rank u per town and the rank rule (u > 0.5 in at least 70 % of the towns and median u at least 0.60), over a z-sign clause, because u is exactly uniform under no pull however discrete the statistic — the base's faithfulness-campaign tie-break — so the rule passes chance at most 0.5 % on normal and on few-member discrete statistics (executed), where the z-sign rule passed 58 – 98 % on skewed shares, while keeping power on smooth statistics (0.927 at a 0.8-standard-deviation shift) |
| J-V12.13 | chose to move each reference's pin to its newest build at the next milestone boundary, as a declared baseline shift, over freezing the M-1 build, because parity is judged against the product the owner can open today, while the old rows stay as history |
| J-V12.14 | chose to seal each panel with an operating-system random salt and commit only the key's hash, over a formula-seeded coin, because a public formula would let anyone predict which side is ours |
| J-V12.15 | chose that every corpus change lands in a pack `historical:<frame>`, never overwriting a shipped default, over re-signing cells in place, because the owner's "what you have built is always the BASE" and item 23's emulation-first default both hold only if the built values survive intact, and adopting a pack is the owner's sitting's decision (Q-V12-3, J122) |
| J-V12.16 | chose that a drawn plate stays `drawn` even with a scale bar unless the corpus's own metadata calls it a survey, over classing by the scale bar, because a painted plate's geometry is an artist's, whatever its scale bar says |
| J-V12.17 | chose that possibility evidence creates reachability requirements and at most lifts a chance from 0 to 0.02 (or lowers 1 to 0.98), over letting witnessed examples set weights, because a record proves possibility, not prevalence |
| J-V12.18 | chose to re-measure the palette axes by our own definitions at M-CAL and to ask the owner only when a band end moves by more than 3 units (3 C* for chroma), over silently re-signing, because the bands are the owner's numbers and our instrument differs from the corpus's |
| J-V12.19 | chose a sample frame of at least 20 surveyed maps, declared before measurement by a rule naming no measured feature, as the only prevalence evidence, over any large set of maps, because a set chosen by what it shows measures the chooser, and below 20 maps a p10 – p90 band is too variable to set a band centre |
| J-V12.20 | chose a local sitting page, never published, over a hosted page, because the reference images are other creators' work |
| J-V12.21 | chose to open M-CAL once the standalone generators it calibrates have exited (M4, M5, M6, V-M4), the layers and evolution joining by later runs `M-CAL/<layer>` of the same process, over one reconciliation after everything, because the owner's order is "built standalone first, then calibrated" and the staged layers may land much later; its slot is J122's, after M6-sky (§16). *Amended by J-V12.75.* |
| J-V12.22 | chose to run calibration and corpus jobs on the runner outside the three CI tiers and never during a timing phase, over fitting them into a tier, because a two-hour search would break a tier's budget and disturb gating timings |
| J-V12.23 | chose one panel engine keyed by milestone id, with `D5Pair` variants for Fantasy Manor, VG, Dwellings, the before-and-after pairs and SOLO items, over a protocol per stage, because §13.6's blind rules, sealing and pass rule are the same whatever is compared |
| J-V12.24 | chose to write research-side paths in committed files as opaque `research:` labels, over plain relative paths, because §17.1 (3)'s path rule must never meet a research path inside `plat/` |
| J-V12.25 | chose FTG's pin as a capture-date range, moved when two of a size's three new captures fall outside the pinned spread on one metric, over a pin per capture, because FTG's server cannot be seeded or versioned from outside |
| J-V12.26 | chose a failing correlation bar's default fallback as "after a confirmed failure, double the pulling weight once, clamped to its column's range and never across an owner-stamped cell or minimum, then report not produced", over lowering the bar, because §13.7 forbids a fallback that passes by construction, and a doubled value outside its range or across the owner's floor would break the compiler or the owner's rule |
| J-V12.27 | chose that a rated verdict needs every answer, an incomplete sitting staying *provisional — not rated* with its answers kept, over rating a partial sitting, because a partial panel could be steered by which pairs were skipped |
| J-V12.28 | chose "most" as a pooled share of at least 2/3 over at least 100 effective instances from at least 20 towns, with a town clause, over a raw instance count, a per-town majority alone or a test against one half, because a clear leaning (0.75) then passes 97 % of the time and a coin flip (0.55) at most 1 % even when a town's instances share a town effect (executed, ρ = 0.3), and two thirds is the owner's own bar at the sittings |
| J-V12.29 | chose exact binomial tests at 0.01 for a floor (one-sided) and a rate (two-sided, 200 units), over comparing a point estimate with the value, because a random mechanism set exactly to its promise would fail a point comparison half the time |
| J-V12.30 | chose one Cochran–Armitage trend test at one-sided 0.01 with a two-standard-error no-reversal clause, and a stratified Cochran–Mantel–Haenszel test for "higher with than without", over pairwise tests between levels, because one test over all levels holds chance near 1 % (executed) and the clause keeps "rises monotonically" honest without demanding strict steps noise would break |
| J-V12.31 | chose the enclosure — built stretches plus natural closure edges — as what every wall metric reads, with MFCG's ring split at the shore, over measuring curtains alone, because item 106 makes barriers part of the circuit and MFCG's exported ring already follows the shore where its wall is open, so one rule measures both and T-V12-6's recorded values stand |
| J-V12.32 | chose ruin distinctness as a per-seed paired rule on block size (ratio 1.5), grid order (0.15) and axis (10°), each in 70 % of seeds and every seed on two, over comparing the culture rows' parameters, because the owner's refinement is about what a reader sees under the town, and skipping the axis for a shared-axis ruin honours item 109 (c)'s surviving old axis |
| J-V12.33 | chose the structure test as a separation — the ruins' median above the caverns' 90th percentile — over a significance test, because the difference is large by construction and a test small effects pass would not catch a ruin drawn as a cave |
| J-V12.34 | chose SOLO and AB groups on the one panel engine for sittings without a reference, over separate protocols in V04 and V06, because sealing, the resumable page and the two-thirds rule are the same, and SOLO's Yes / No fits modes of ours that have no better side |
| J-V12.35 | chose to apply a bar level's site as a frozen S1 output through the golden tooling's stage isolation, over a test-only branch in the generator, because a bar must test the shipped code path |
| J-V12.36 | chose that the ladder rows (provenance `sf:`, V11 §2.2) and the port's unnumbered ranges are never calibration targets, over tuning them, because the first are the owner's program's facts pinned to the port's baseline (item 108 (a)) and the second derivation rules of the port (item 20 (h)) |
| J-V12.37 | chose to confirm the underground's rows by the owner's V4-U5 panel and E1's reachability, never by prevalence, over leaving them provisional or inventing a source, because no town plan frames an underground |
| J-V12.38 | chose record-keyed monotone checks — each catacomb complex by its id, which keeps its source lineage — over step scripts of the base's own events (Regenerate, Re-derive, New random, upgrade replay, a dossier event, extend growth) that exclude author edits, with an `exactBound` for the growth cap and a stagnant-fill form, over epoch-only levels, because the owner's ratchet binds every derivation ("they do grow and never shrink", item 109 (k) (4)), a cave-in or a second complex would otherwise read as a shrink or a jump, and J-V4.56 exempts the author |
| J-V12.39 | chose to route every witnessed contradiction of an owner rule to the owner (R6: an `ownerExcluded` row and an owner question recommending "keep the rule"), with owner-rule cells stamped at compile time, over E1's possibility floor in the layer or a known-defect line, because the owner's rules outrank the corpus, and the layer may become the default by a sitting that judges looks, not rules |
| J-V12.40 | chose to read B-CITY's nightly towns for the pooled siting bars, paying only for permutations, with `null/…` families only for settings B-CITY lacks, over per-spec town families, because V11 states its bars on "≥ 200 B-CITY seeds per rung", those towns are generated every night anyway, and dozens of per-spec families would cost thousands of generations |
| J-V12.41 | chose three authoring paths for the second known-city fixture (skeleton file, canvas script, transcript), over the two item 110 (e) names, because the item gives it "the same acceptance bars as the first fixture" and T101-6's bars are three paths; "both ways" names the two that share a digest |
| J-V12.42 | chose owner-stamped calibration minima for the CITY and METROPOLIS raised-way chances and caps (values V11 §3.24.2's), binding every run, fallback and corpus pack, with V11's schema holding the rung gate and a TOWN guard setting in every run that touches a raised-way row, over leaving the chances to tuning and the corpus, because the owner ruled that cities generate raised ways and towns only declare them, and a layer adopted as the default must never undo that; the minima bind calibration only, so the parity presets' extension zeros, a pin's overlay and a user's own edit stay free |
| J-V12.43 | chose V11 §3.24.0's switch table (one named, in-range off form per row set, also the parity-neutral default) as the item-110 pins' overlay, and one off-state golden set per family recorded at switch-on and re-recorded only by other causes' declared shifts with matching stage lists, over digests of "the code before" or a fresh boolean per family, because stored "before" digests go stale at the first unrelated shift and then fail forever or stop guarding, and one definition of "off" serves every lane's pin. *Amended by J-V12.87.* |
| J-V12.44 | chose tendency bars only for item 110 (b)'s two "likelier" clauses (prosperity, dossier landmarks) and presence bars on forcing sites for the viaduct and the aqueduct, over on / off rows for every kind, because without its reason no raised way may exist, so an "off" arm measures conformance, not a leaning, and a site where the detour always loses keeps the presence chance honest |
| J-V12.45 | chose a six-item SOLO group inside the M4 panel (K2 and five forcing-site towns) to confirm item 110's rows, over the realism item of the ordinary D-5 pairs, because a random pair seldom shows a raised way, a terrace or a deck building and a confirmation must be attributable to the rows it confirms |
| J-V12.46 | chose a pooled exact hypergeometric test for statistics that count members on indicator plots, with a headroom lint refusing a nearly-always-true indicator, over the rank rule for those too, because the exact pooled count is more powerful on few members (0.705 against 0.302 at a 0.3 pull on single members, executed) and no rule can see a pull when the indicator is already true for 85 % of plots |
| J-V12.47 | chose a confirmation re-run on a fresh family at twice the towns before any fallback fires, over a stricter single-run rule, because with dozens of nightly bars at 93 % power a few would otherwise fail by bad luck and double real weights; with the re-run 40 bars at a real 0.8-standard-deviation effect fire 0.06 false fallbacks per table version (executed), and the null pass rate stays 0.25 % |
| J-V12.48 | chose that an owning volume's stated pass rule, seeds and tolerance win and V12's rules are defaults taken as parameters, while the unit a g item names binds everyone, over V12 overriding the volumes, because each volume keeps its rows' content (single source), and the g item is the owner's text |
| J-V12.49 | chose the historical layer as a setting pack in §7.6's packs slot bound to its frame's era and region, adopted per frame, over a preset in the one preset slot, because a document must be able to hold its D-2 era and region preset (or a parity preset) and the matching layer at once, and one frame's layer must never reach a town of another era or region |
| J-V12.50 | chose effective instances by the one-way analysis-of-variance design effect, deep voids as connected components counted at most three per town, and a town clause on towns of three or more instances, over raw instance counts, because one access opens a whole connected system and instances of one town share a town effect; the correction restores the independent rule's size (0.9 % at a 0.55 share, ρ = 0.3, executed) |
| J-V12.51 | chose to compare a corpus siting row with our statistic in the same corpus variant (buildings with a use, Euclidean distances, any building eligible), computed as a `geo` metric on our measurement profile, over comparing it with the model statistic, because the model statistic uses way distances among hard-need-eligible plots — a different quantity — and like must be compared with like where the corpus sets weights |
| J-V12.52 | chose E1's reachability search as the grid of the controls the metric's stages read, at their range ends and middle, capped at 64 settings, crossed with the frame's era and region presets and the author's declarations, reachable within max(`absFloor`, 10 %) on any of 50 seeds, over an unspecified "bounded search", because an implementer must not invent the controls, the bounds or the criterion, and a declaration an author can make is already reachability |
| J-V12.53 | chose to hash each panel note into `answers.json` when it crosses, keeping the words research-side, over crossing the notes under C3's character rule, because the owner's free text is the one string the scanner could not judge, and the record needs only that a note exists |
| J-V12.54 | chose item 110's four families as extensions off in the `MFCG`, `FTG` and `VG` presets (`NG` as `MFCG`; `FM` resolving the stepped and deck families off), switched on by four upstream-first bumps each with its own `feature` cause, over one bump for all rows, because no measured reference builds them (0 of 48 research inputs), item 23 keeps extensions out of parity, and one bump cannot attribute a stage moved by two families to either |
| J-V12.55 | chose no `dossier` source for raised ways, because the dossier declares no arches (V06 §3.19.1): its water-system record makes the aqueduct's need count as met at CITY and METROPOLIS (V11 §3.24.7 (3)), so a dossier-bound aqueduct is generated, never below CITY, and the guard counts it as generated; `source` is derived at read with the values `generated` and `declared`, a way carried down from a city epoch reading `generated`, its founding rung read on the model side from the founding epoch's record. *Amended by J-V12.62.* |
| J-V12.56 | chose to leave the switch cells ordinary table cells — editable by the tables editor like any cell, their off form V11's — over "never a user control" and a separate boolean per family, because the owner's rule is that everything is editable, a user who turns a family off simply gets the pre-110 behaviour, and the owner-stamped minima bind calibration, not the user |
| J-V12.57 | chose K2's thresholds as consequences of its declarations (≥ 8 jetties with deck buildings on ≥ 4; ≥ 3 terraced wards with ≥ 10 retaining walls; a raised road within 2 % of straight crossing ≥ 2 ways) at CITY, 20 000 people, on the coast, over counts the rules may or may not fill ("every jetty with deck buildings"), because deck plots are offered by chance (item 110 (d)) and a fixture bar must fail only when the capability or the fixture is wrong |
| J-V12.58 | chose the fixtures' inputs under `plat/tests/fixtures/known-city/<id>/` (the base's fixture tree, §17.1 (3)) and their goldens under `plat/goldens/known/<id>/`, over V09's draft path, because the base names one fixture tree and one golden store, and K1 and K2 share one engine |
| J-V12.59 | chose to read a church class whose coverage unit is `parish` — a class that itself makes the parish partition — in the unit's `households` form with the same `per`, over the parish cells, because the cells are the churches' own Voronoi cells: every cell holds exactly one member, observed and permuted alike, so the statistic could never move and T-V11-13 could never pass for the principal coverage class |
| J-V12.60 | chose one `servedShare` whose unit is read from the subject class's compiled `profile.coverage` — the plot's district, parish cells, or residential plots for the walk and households discs, counted unweighted — with a `unit: 'district'` override for item 105 (k)'s dispersal row, one class per spec and a `settlement` unit refused, over a single district statistic, because T-V11-13 measures "the share of units served" per class unit and T-V11-18 speaks of districts, the owning volume's statement winning (J-V12.48), and a permutation conserves a town-level unit. *Amended by J-V12.86.* |
| J-V12.61 | chose one **panel rule** for the register lines a panel confirms — a group rated No moves the line's cells once to the owning volume's stated second value as a declared `fallback` run and re-sits, else the entry is `not-achieved` and reaches the owner as a table defect; unrated, *provisional — not rated* — over a fallback per line, because V11 states second values for only a few cells and every other line needs a pre-decided outcome |
| J-V12.62 | chose item 447's shapes for the measurement profile — an aqueduct a `way` of class `aqueduct` that enters no way graph, a `span` kind no metric reads, `stepMinCm` and `stepMaxCm`, J-VI.3's six closure kinds, no founding rung — with one drop-on-read rule for the exported properties the profile does not declare, over a separate aqueduct kind and reading every exported property, because 447 is the base's one export text for both variants (J-VI.18) and T-V12-4's equality must hold on it, while the metrics that need the dropped properties are `model` metrics reading the records |
| J-V12.63 | chose a `layer: { preset: 'FM' \| 'VG' \| 'NG' }` cell in a `reference` run against that preset's own reference, written into the cell's preset entry with the default untouched, over freezing every preset entry, because V02 §3.10.8 and V07's V-M4 set those presets' measured-rate entries by exactly such runs (V07's one entry, `rules.race.densityPower@VG`), while the MFCG and FTG presets hold values read from their references' behaviour and stay untuned. *Amended by J-V12.67, J-V12.76.* |
| J-V12.64 | chose three descriptive `model` metrics — `crossing.kinds`, `water.needRatio` (computed by the base's own water-balance function), `ruin.survival` — for register lines whose cells no metric read, over pointing those entries at unrelated metrics, because `CalibrationEntry.metric` must name what measures the cell and the register check verifies that the metric exists |
| J-V12.65 | chose two generated metric families — `bar.<barId>`, the verdict statistic of one registered owner bar (a `StatBarSpec`, a `NullModelSpec` or a `BenchBarDef`), and `frame.<table>.<column>`, a declared frame's value for one calibratable column, `notApplicable` until its corpus run — with `CalibrationEntry.metric` a list, over one descriptive `model` metric per column family, because the owning volumes confirm their cells by bars whose verdicts are the measurement, a descriptive metric per family would restate each bar's statistic under a second name, and V02 §3.10.10's, V06 §8's and V11 §8's lines name these families and several measurements per line; the value is read from the bar's own run, so the family costs nothing |
| J-V12.66 | chose to split V12 §3.11's `decline` line — V11 §3.18's four structure cells, owner V11, written at C3b; the base decline table's persistence cells `raised` and `retaining`, owner `base`, written by the seat landing V06's E2 at M6-E where file f item 291 lands — with the rule that a base cell a volume's request adds is registered by the seat landing that request, over one line owned by V11, because `CalibrationEntry.owner` is single-valued, the lint fails an entry whose cell does not yet exist, and only the seat that lands a cell can write its entry with it |
| J-V12.67 | chose to admit a `presets.FM` or `presets.VG` entry in a `fallback` run applying that entry's own pre-decided fallback, with a `preset` field on the register target (ids `…@FM`, `…@VG`), and to keep out of every run a preset entry no register entry names (a code-read `ref:… (code)` entry, a `fixed:` off value), over admitting preset entries only in `reference` runs, because V02 §3.10.8 pre-decides `hipInset` 0.5 for a rejected FM run and V12 §3.7.5 applies an entry's fallback on rejection, and the entry test makes "measured-rate" mechanical |
| J-V12.68 | chose to merge per-run exports on read — a retaining wall's runs by `wall` in `run` order, an enceinte's condition runs by its `id` into built stretches — with `measureInputOf` writing one feature per retaining wall and per built stretch, states and conditions being no measurement input, over per-run features, because every wall and retaining metric measures geometry a condition does not change, per-run features would read a run end as a stretch end and let a decline move a parity number without moving a stone, and the merge keeps T-V12-4's equality exact |
| J-V12.69 | chose one catch-all rule for every register line — a line ending "and every other calibratable column" binds each calibratable column of the tables or columns it names that no other line names, each its own entry with that line's method, metric and fallback — ending the items 103–107 and item-106 lines with it, over enumerating every column by name, because V11's `ColumnSpec` compiles only with V11's milestones and a named list goes stale at every V11 change, while the rule leaves no calibratable cell without a line and the one-knob check catches a column two lines bind; and chose to leave V02's stepped compositions to V02 §3.10.10's stepped line alone, the stepped tiers' line (confirmed by the M4-110 group) binding only V11's `stepped-shrine` heights row, over two lines for one set of knobs |
| J-V12.70 | chose to define `method: 'tune'` as a `reference` run against the entry's own reference when it falls due — the accepted value its confirmation, a rejected run applying its fallback, and, where the owning volume states it (V07 §3.15), no run while the metric holds its band — and to read a `frame.*` metric only at its corpus run, never holding an entry back earlier, an entry of `frame.*` metrics alone due at its corpus run, over a new method value per reference and over moving every entry naming `frame.*` to M-CAL, because the union already holds `tune` and items 34's, V02's and V07's cells use exactly that route, and an entry's earlier measurement must confirm on its own while the corpus value arrives only with the frames |
| J-V12.71 | chose one default register line — every calibratable column of a registry table that no named line binds takes one entry `cal.<table>.*.<column>`, `corpus` at M-CAL on its own `frame.<table>.<column>`, closing `fixed` with "no admissible frame" when no frame's run targets it, marked `line: 'default'`, written by `plat calibrate register --defaults` in the change that lands the column — with any later line in V02 §3.10.10's form restating that entry in place, over asking each volume to write per-family lines now or exempting their `own` cells from the lint, because those volumes state no metric, due or fallback for cells they call calibratable, a per-family line needs bars most of them lack before M-CAL, and an exemption would let a provisional number dangle, while the corpus stage is the one measurement every calibratable column has; volumes 8 and 10's tables are not calibratable, and volume 3's `roomProgram.json` joins. *Amended by J-V12.73.* |
| J-V12.72 | chose a named type `PresetArm = 'default' \| PresetId` for every `preset` field of V12 §2's records a harness generates under (a tuning run's targets and seeds, a correlation spec's seeds, a sweep level, a panel group, a `BenchBarDef`'s settings), `'default'` being the recipe with no parity preset, over a comment on one bare string, because a typed union makes a third spelling a compile error; `CalibrationRun`'s `layer` and `CalibrationEntry.target` name a cell's preset entry, not an arm. *Amended by J-V12.76.* |
| J-V12.73 | chose (a) to have `plat calibrate register --defaults` write a default entry only for a calibratable column that holds at least one compiled cell, over one for every calibratable column of the compiled registry, because V11 §2.1 ships every registry row from C0 as its schema's empty table, so the wider rule would write entries for columns milestones before their seats land; and (b) to read a default entry's `owner` from the source manifest's author seat of the file holding the column's cells (V11 §3.2.1 step 1), the first document the table's `rowsHome` names deciding between two writers and a later writer never moving it, over `rowsHome` alone, because several rows name more than one home, and the author seat is known exactly when (a) lets the entry be written |
| J-V12.74 | chose to make the parity-report row carry a required `preset` spelled as `PresetArm` (`'default'` \| `'MFCG'` \| `'FTG'` \| `'VG'` \| `'FM'` \| `'NG'`), written out in the base's text (file f item 497), over an optional `preset?: string`, because V12 §3.5 step 3 names every row's arm and an optional string admits a third spelling; the union is spelled out so the base names no volume type it does not define. *Amended by J-V12.76.* |
| J-V12.75 | chose to date a column whose first compiled cell lands after M-CAL's `ReconciliationRecord` is committed to the later run of the corpus process that takes its layer — `M-CAL/under`, `M-CAL/sky`, `M-CAL/evolution`, `M-CAL/M6-P`, or `M-CAL/<milestone>` — written by `--defaults --milestone <id>` from the landing change's milestone through one table, with the same substitution on a named line's M-CAL stage, over keeping M-CAL the only corpus due (a late column's landing exit would fail on an entry already past due), over a due without an id (the exit and the lint need a milestone they can name), and over re-opening M-CAL (a committed record is a fact); the later run opens on the owner's word, reuses M-CAL's frames and holds a panel only when it moved a cell; the lint reads the landing milestone from the entry's first history row, so no new field is needed |
| J-V12.76 | chose to write `NG` wherever this volume spells the presets out — the register's `…@NG` id and `target.preset`, a run's `layer: { preset }`, the report row's `preset` union, V12 §3.5 step 3's arms, the M5 panel, T-V12-9's and T-V12-24's preset clauses — over leaving `NG` to `PresetArm` alone, because V11 types `PresetId` with `NG` (V01's BCR-V1-46, file f item 584) and every spelled-out union that omits it is a third spelling; volume 1 holds no provisional `NG` entry (J-V1.98), so the `NG` arm is admitted, not used, and V12 §3.7.2 (3) keeps every `NG` entry out of runs |
| J-V12.77 | chose to admit a value moved by the column's owning seat before its due — on a `provisional` default entry whose due's record is not committed, and only while no committed golden holds a stage that reads the moved cells (the change's golden check proves it) — recorded by one cells row `--defaults --milestone <id>` appends, with `--check` failing an entry whose last cells row disagrees with its column's cells; a tuning whose golden check finds a committed digest moved is held (`--hold`), the cell keeping its landed value and the owning volume's bar reading it; and a named `measure` entry whose cells no run may name (every bar's `stages` `[]`, V03 §2.4's lines) taking the same row for its owning seat's stated tuning and for its line's hand fallback in the exit's change, closing `fallback-applied` — over requiring a run for every such move (volume 1's M5 tunings aim at that volume's own acceptance bars, which are no register metrics, so a run would have no target), over a new verb (the command that writes the default entry already reads the cells and takes the milestone), and over comparing the entry's last row of any kind (after its corpus run a default entry's later rows are readings, so every closed entry would fail); status, due, owner, method, metric and fallback never move by the row. *Amended by J-V12.80.* |
| J-V12.78 | chose to make `--milestone <id>` required — refusing without it, naming the flag, and refusing an id that is neither one of §16's ids nor volume-qualified — with every milestone id this volume's records carry in V12 §2.8's form, the volumes' own register lines writing their steps so (`V6-E1` – `V6-E8`, `V4-U*`, V02's crypt line's access draw as `V4-U3b`) and volume 11's content steps taking the §16 ids of the milestones they are built inside, over defaulting the flag (a wrong default dates a late column's due wrongly and silently), over bare step ids (volumes 3's and 5's steps are both P0 – P6) and over a `V11-C*` prefix (a C-step has no record of its own); "the raised-way milestone" is M3a (items 244, 290), and the lint's due test refuses any other due |
| J-V12.79 | chose to type a register line of several stages as one entry carrying `stages` — `method`, `due` and `panel` its current stage's, each exit or sitting appending a stage row with its outcome, the last non-`corpus` stage's pass confirming, a failing stage closing the entry by its line's "when it cannot confirm", an unrated panel stage holding it *provisional — not rated*, a trailing `corpus` stage read at its corpus run whatever the status and never moving it, and a stage-level `metric` where the line gives one — over one entry per stage (two entries for one knob fail the one-knob check) and over confirming at the first stage (a later panel No would be an illegal move from `confirmed`, and the corpus possibility would never fall due); the span-rule line takes the staged order M4, `V4-U3`, `V4-U5`. *Amended by J-V12.95.* |
| J-V12.80 | chose to record rows a later landing adds to an entry's target by one cells row from `--defaults --milestone <id>`, whatever the entry's status or due and whichever seat lands them, the owner condition and "owed to a run" reading only the changed cells of held row keys, with `--check` failing a compiled row key the last cells row lacks until the command appends it, over treating added rows as moves (no run adds a row, so a landing after an entry's close could never exit green) and over ignoring them (the register would stop holding the cells it confirmed); rows added after close keep their authored values, reported "rows added after close", a later major table version restating the entry for them |
| J-V12.81 | chose to keep application and engineering constants — UI thresholds, autosave and export limits, time budgets — outside the register when their volume confirms them by its own test or performance row under D-18, their provenance note naming that test, over a `thr.` entry for each (the register's methods, metrics and corpus stages describe model behaviour a parity bar or a frame measures) and over a scan of code constants (the lint reads compiled cells, and each such constant already has its test) |
| J-V12.82 | chose to name V04's span-rule constants by volume 11's cells `raisedWays.structure.span.*` (row 80) in the span-rule line, to exclude the `span` block from the `raisedWays.structure` line's catch-all and add `slideMaxFactor` to it, and to take `retaining.settings.stateSnapCm` out of the `retaining` line's catch-all into its own default entry at M3a restated in place at `V6-E2` on `bar.T-V6-62` (J-RF2.4's measurement), over prose keys the lint cannot match and over an M4 panel for the snap (which sees no wall an epoch has re-levelled); values unchanged |
| J-V12.83 | chose to make a released strip pick's row a cells row — the change that releases it runs `plat calibrate register`, which appends the released cells by row key — over exempting owner-set entries from the cells check, because the check is what proves a released value matches its table version, and a pick is no run |
| J-V12.84 | chose to apply J122's sittings (Q-V12-2) as a `sitting` field on every `PanelSpec` — the four gating sittings as themselves, every staged panel `nextGating`, batched into the next gating sitting when its build has landed by then and otherwise *provisional — not rated*, re-offered with every release — over the volume's former seven sittings with short extras, because the owner's delegation decided the schedule (J122 > volume) and §13.6 (7) already keeps an unrated panel from stopping the build or claiming a gate |
| J-V12.85 | chose V12 §2.11's lifecycle table, with producer and consumers columns, as the one statement of every record's wiring, V12 §1b keeping the engines, commands, profiles and metric families (E-35), over two tables kept in step, because two lists of one record's readers drift; every producer and consumer the two carried is in the merged table |
| J-V12.86 | chose to read `servedShare`'s `district` unit as every district of the town (V11 §2.3's plot's district), the ≥ 30-households filter a `minHouseholds` parameter only T-V11-18's dispersal reading sets, over a threshold inside the unit, because the mechanism's unit governs its bar and only the dispersal row speaks of districts of that size |
| J-V12.87 | *amended by J-V12.99.* chose one `NoOpPin` engine for every owner item's "byte-identical with its rows off" bar — kinds `offForm` (items 102–115, item 115's `enabled` false among them), `rungScope` (item 115's TOWN and above) and `view` (items 117, 118 and 120), each off form read from V11 §3.24.0 where V11 states it, else from the cells its bar names (E-20) — over a pin engine per item, because the landing gate, the parallel off-state set and the re-recording rule are the same for every item, while a rung-scoped ceiling and a look-only view need their own comparison, not an overlay |
| J-V12.88 | chose to read V09 §7.6's `TrialRecord` as the game-master trial's one record and to enter its findings into the register as `trial` rows and into the fix list as `known-defects.json` entries by `plat calibrate register --trial`, over a second record of the trial in `plat/calibration/`, because one trial has one record (principle (9)), V09 runs it and holds its pass, and the calibration record needs only each finding's row beside the value it concerns |
| J-V12.89 | chose a property rule `exactScript` whose scripts may hold author steps for item 113 (e)'s LOST state and item 114's sustained-driver and oldest-first rules, on the catacomb ratchet's step runner, over `exactMonotone`, whose scripts refuse author edits, because a cellar filled or a repair is an author's act these properties bind, while the ratchet binds only derivations |
| J-V12.90 | chose item 111 (d)'s bars as `higherWith` over a per-household indicator deflated by its design effect, a `rate` against the arid row's chance derived from S0's feature table, and `most` over a per-town indicator, over one bar of the town's mean distance, because the owner's clauses compare a share against a baseline, a draw against its chance and the richest band against the middle band in most towns, and households of one town share a town effect |
| J-V12.91 | chose item 114's greyscale bar as the style check's pairwise contrast on luma alone against §8.2's deficiency-contrast threshold, over a threshold of its own, because one threshold for "distinguishable without hue" keeps items 112 and 114 on one scale |
| J-V12.92 | chose to measure item 119's comfort level click to complete on the reference hardware, five seeds per wait kind at every rung's top and at the metropolis cap, advance time and the history replay each in total (item 119 (a2)), passing on the p95 ≤ 10 s, with progress within one second, the measured-gain rule read from V11 §3.25.8's `perf.qualitySpend` rows — the record that gates the stage's quality path — matched to §12.10's rows, and interaction rows compared release to release, over a mean, a single run, a per-epoch time or a check of §12.10's rows alone, because the owner's ceiling is total time a user sits through ("Total", J132), a mean hides the slow tail, and a gain must be checked on the record that admits the slower step |
| J-V12.93 | chose to ship each cell's register entry id, what measures it, its due and its last three history rows in `dist/evidence.json`, over the tables editor and the clerk reading `register.json`, because the register is repository data that never ships, while V09's cell inspector and V10's provenance answer must explain a value from the shipped files alone |
| J-V12.94 | chose to state once that a parity preset is cell values — never a stage, rule or lifecycle change — and to define every feature a preset meets by one table of what the preset leaves and what the P rows read, with a leak clause, over a sentence per feature, because the combinations share one mechanism and differ only in which cells the preset zeroes |
| J-V12.95 | chose §16's starts-after chains (J122's combined order, stated there once) as the stages' order, rows no chain connects unordered, over the former rule leaving every staged row unordered, because the owner's delegation fixed the product order, while M5, the village, M6-E and M6-P's first rungs run side by side and M6-E stands in no chain with M6-sky |
| J-V12.96 | chose the metric ids `bldg.r4.*` and `bldg.wallAlign`, over `lots.*` (a retired term) or `plot.*`, because the statistics read building axes, not plots, and no baseline row of them exists before M-1 |
| J-V12.97 | chose to measure item 120 (Find) by one `view` pin (`item120.find`, tiles included), five 0-by-rule statistics (`find.matches`, `.leaks`, `.held`, `.pins`, `.cues`) on V09's app harness over B-CITY-lite's seeds of every rung, the village fixtures and a dossier fixture with three chip sets each, and its two interaction timings at the METROPOLIS cap among item 119's interaction rows, priced inside W7, over `StatBarSpec`s or a register line, because Find is a view — each of item 120 (k)'s clauses a property that holds or fails, none a tendency or a calibratable value — and the view pin kind, the nightly statistics and the timing phase already exist |
| J-V12.98 | chose to key every base bar this volume registers as a `BenchBarDef` by its §13.2 id (T114-6, T114-7, T117-2, T118-2 – T118-6, T119-2), keeping V12's spec ids (`T114g.*`, `T117i.*`) only for `StatBarSpec`s that carry their base bar as `ownerBar`, and to type item 117's week checks as `exactScript` and `exactMonotone` over `{ week }` steps (`noIceSnow`, `iceOrder`, `seasonStyles`), over spec ids standing for base bars and untyped checks, because `bar.<barId>` resolves only through a registration's `id` or `ownerBar` (V12 §2.1) and a week is a view step the step runner takes as a user does, moving no model digest |
| J-V12.99 | chose to prove items 121 – 126's "changes nothing" clauses on the one pin engine — the `view` kind widened to a device setting and the window's size (`resolution`, `effects`, `viewport`, beside `crises`) with three clauses (`exports`, `cache`, `session`), and two kinds added, `entityScope` for item 123's never-decayed buildings and `input` for item 125's host context — over a pin engine per item or one-off comparisons, because each is the same landing gate, off-state set and re-recording rule over another invariant: a device setting, a crisis display and a resize are values a document is opened under as a week is; never-decayed buildings are a subset of entities as a rung pin's rungs are a subset of seeds; a host context is an input a dossier is generated under |
| J-V12.100 | chose to measure item 121 on three device fixtures — in the timing phase the gesture and 10-second counts on a threshold fixture whose p95 straddles the loop's two tests, Auto's p95 against the tier's budget and the ultra tier's native-4K memory read by §12.8, and at PR a text-layer pixel test against the same view at the device's ratio — leaving the default, the honoured-or-said manual level and the pixel-ratio change to V09's T-V9-84, over an average frame time or a capture of the chip, because item 121 (h)'s clauses are properties and budgets a loop breaks only at its thresholds and a label softens only where the text layer is skipped |
| J-V12.101 | chose to measure item 122 by its pin and five 0-by-rule statistics, on previews from M3b and on V08's dossier crisis fixtures from M-SF, and item 122 (h)–(i)'s four bars as this volume's own on force fixtures — the camped ground per head within 10 % of `areaPerHeadM2`, a two-army coalition within 10 % of twice one army, every camp inside the opening view, Fit and the limit while a look stands, and item 116's limit back in the first week none stands — over a count of drawn tents or a panel, because the owner's bars are proportions and containments the placement keeps or breaks, and a look's scale is its row's, which the bars check the drawing follows, never its value |
| J-V12.102 | chose to measure item 123's monotone and same-level clauses over a level sweep in 0.05 steps on fixtures of every element kind and state — §6.3's one comparison evaluated at each level, never a test-only plan — and over V06's decay runs from M6-E, and its no-op clause by an `entityScope` pin on never-decayed buildings, leaving the ids, the restoration, the exterior and the battle maps to V03, V04, V06 and V02, over a pin on whole suites, because a damaged building's drawings must change while every other building's must not, and the sweep reaches every threshold before the decay level is built |
| J-V12.103 | chose to measure item 124 over every climate row's 52 weeks at a testkit session seed and the harness's clock, the arid rain frequency over a simulated clock long enough for 50 expected spells (a Poisson count within three standard errors), the photosensitivity clause as a per-frame luminance trace against §8.4 (i)'s limit, and the "changes nothing" clauses by a `view` pin with its `cache` and `exports` clauses, over sampled sessions on the host's clock, because the timeline is a pure function of its seed and clock, rare showers need a long clock to be counted, and a flash is a frame-to-frame property |
| J-V12.104 | chose to measure item 125 by a full-map count on the required-keys dossier at every rung — every used, absent field reported with its fallback, every stage with its output — and an `input` pin over B-DOSSIER-lite and that dossier with and without each fixture `HostContext`, leaving the static check of the adapter's reads to V08, over a comparison of selected outputs, because "the identical document and hash" is a whole-document property and the fallbacks' reports are what the owner's "our map code supplements" leaves to check |
| J-V12.105 | chose to measure item 126 at the medium class's minimum — every tool's touch script at 600 × 480 and a resize script across it under a `view` pin holding the document, the view key and the selection — with no phone viewport in any fixture, over a test of a narrow class, because item 126 (a2) designs nothing for a phone and its bar is the medium layout held below the threshold |
| J-V12.106 | chose to let items 122, 123 and 124's look cells take the default line and to keep items 121, 124 and 126's ladder, ceilings, loop thresholds, frame cost and window minimum outside the register as engineering constants, over named register lines, because these items' bars check that the drawing follows the cells, never their values, and the constants are confirmed by their own bars (T121-2, T121-3, T121-8, T124-2, T126-2) under D-18 |

## 10 Base change requests

### 10.1 Requests to the base

Every base change this volume needs is applied in the base as a file f item; this volume cites the base's text and restates
none of it. The former request ids stay here only as a pointer table, so an older citation resolves.

| former id | subject | applied as | base home |
|---|---|---|---|
| BCR-V12-1 | the baseline row's fields and the band rule | file f item 496 | §13.5 |
| BCR-V12-2 | the parity report's rows, verdicts and `preset` arm | file f item 497 | §13.5 |
| BCR-V12-3 | the calibration run, generalised | file f item 503 | §13.9 |
| BCR-V12-4 | the reconciliation's rules (its adoption rule J122's, V12 §3.10.6) | file f item 504 | §13.9 |
| BCR-V12-5 | provenance `evidence` and `ownerRule` | file f item 381 | §7.6 |
| BCR-V12-6 | the panel engine (`D5Pair`'s variants, the widened `D5Record`) | file f item 500 | §13.6 |
| BCR-V12-7 | seeds by formula for the benches and the goldens | file f item 491 | §13.3 |
| BCR-V12-8 | the crossing's file list | file f item 535 | §17.1 (4) |
| BCR-V12-9 | the build plan and its price (deltas) | file f item 533 | §16 |
| BCR-V12-10 | the package | file f item 521 | §14 |
| BCR-V12-11 | the staged row | file f item 569 | the staged list |
| BCR-V12-12 | JT and the correlation and tendency rows | file f item 501 | §13.7 |
| BCR-V12-13 | one harness for every random baseline and tendency bar | file f item 488 | §13.2 |
| BCR-V12-14 | the tiers | file f item 502 | §13.8 |
| BCR-V12-15 | closures in the export (item 106) | file f item 447 | §11.1 |
| BCR-V12-16 | the second known-city fixture (item 110 (e)) | file f item 489 | §13.2 |
| BCR-V12-17 | item 110's entities in the export (one text with BCR-V9-31) | file f item 447 | §11.1 |
| BCR-V12-18 | the reference maps' names in the deny-list | file f item 536 | §17.1 (5) |
| BCR-V12-19 | a fixture in a shift record | file f item 492 | §13.3 |
| BCR-V12-20 | several panels per milestone; the register's statuses in exits | file f item 493 | §13.3 |
| BCR-V12-21 | the statistical methods | file f item 537 | §17.1 (8) |
| BCR-V12-22 | the historical pack's slot | file f item 382 | §7.6 |

### 10.2 Hand-offs from this volume — each closed at its destination

| id | to | what | closed at |
|---|---|---|---|
| X-V12-1 | V11 | the compiler admits a `corpus` source in `historical:<frame>` pack rows whose evidence names a corpus run of a committed `ReconciliationRecord`, carries evidence ids outside the pinning hash, writes `dist/evidence.json` with each cell's register fields (V12 §2.10), stamps `ownerRule` and writes the stamped-clause list | V11 §2.2, V11 §3.2.1 (steps 4 and 7) |
| X-V12-2 | V02, V07 | their panels are `PanelSpec`s on V12 §3.9's engine, their pairs item 500's variants, their reference rows `Baseline` rows of input `counts` or `geo` under `'FM'` and `'VG'` (items 522 and 495) | V02 §7.5; V07 §8 |
| X-V12-3 | V11 | its column entries land with each content milestone, C6 at M4 auditing them; the ancient-culture rows clear V12 §3.6b's distinctness thresholds against the fabric above the ruin (J-V11.30) | V11 §8; V11 §3.23.4 |
| X-V12-4 | V03, V04, V05, V06 | their sittings are V12 §3.9.1's `PanelSpec`s, sat at the next gating sitting (J122); V04's item-109 bars are the bar map's `StatBarSpec`s on forced-source sites; V06 lends H-100 and its trajectories | V03 §8; V04 §7; V05 §7; V06 §12 |
| X-V12-5 | V08 | its surveyed-dossier fixtures are item 108 (f)'s levels (their `@pop×k` derivatives in the manifest), its custom-chain fixtures item 104 (h) (8)'s, its catacomb fixtures (DR32) the step script's, its high-ground landmark fixture (DR35) the elevated road's `higherWith`, its history, readiness, calendar and festival fixtures items 113, 114, 117 and 118's, a dossier fixture's institution names item 120 (b)'s list entries (V12 §3.15.10), its crisis fixtures (conditions standing through part of the year with their severities; each disaster fixture — a fire, a flood, an earthquake — a calamity with its linked `reconstruction` condition (V08 §7.1), its `targets` resolved; one week standing a siege, a quarantine and a refugee wave at once at CITY and at the METROPOLIS cap, their camped ground together past `densityCap`) and force fixtures (single armies, a two-army coalition, a migrant group, an oversized siege) items 122's and 122 (h)–(i)'s (V12 §3.15.12), and its required-keys dossier, made at every rung, item 125 (e)'s (V12 §3.15.15); none a calibration seed family | V08 §7 |
| X-V12-6 | V09 | the cell inspector reads `dist/evidence.json` (status, what measures it, due, history, evidence lines); the preset dialog lists adopted and selectable historical packs for matching documents only | V09 §4.14 |
| X-V12-7 | V10 | "why is this value so?" answers from `dist/evidence.json` — `RuleAnswer.register`'s `entry`, `status`, `method` and `due` its shipped copy of the register entry (V12 §2.10) — plain line first, the run id behind "details"; a stamped cell answers "the owner's rule, item …"; the clerk never starts a run | §11.2 (`RuleAnswer.register`); V10 §3.5 |
| X-V12-8 | V09, V10 | V09 §7.2 cites V12 §3.14's K2 list (K2-4: "≥ 8 jetties outside the basin, deck buildings on ≥ 4") and the path `plat/tests/fixtures/known-city/K2/`; K1's bridge keeps its deck plots; V10's evaluation group A reads `plat/goldens/known/<id>/fixture.json` | V09 §7.2; V10 §7 |
| X-V12-9 | V11 | the switch table as the item-110 pins' off form; the schema's rung gate; the `ownerRule: '110 (b)'` stamp and the calibration minima on the CITY and METROPOLIS `raisedWays` columns; the owner-rule stamps and the stamped-clause list; `presets.FM` resolving the stepped and deck families off; V11's T-V11-12 – T-V11-18 registering their specs with the bar map (J-VI.10) | V11 §3.24.0, V11 §3.24.2, V11 §2.2 |
| X-V12-10 | V06, V09 | a generated raised way's suppression keyed to its reason, never its course (V12 §4.1; T-V12-40) | V06 §3.19.1; V09 §4.20 |
| X-V12-11 | V01 – V11 | every volume pin that restates an owner item's pin — V12 §3.7.8's list: T-V1-4 (e), T-V2-50, T-V2-58 (f), T-V2-59 (d), T-V2-60 (c), T-V3-34, T-V3-39 (g), T-V3-40 (f), T-V4-47, T-V4-69, T-V4-77 (d), T-V4-82 (g), T-V5-15, T-V5-19 (c), T-V5-22 (b) and (k), T-V5-27, T-V5-33's item-111 clause, T-V5-34 – T-V5-36, T-V6-12's `w_sun` clause, T-V6-44, T-V6-65, T-V6-71 – T-V6-74, V07's pins, T-V8-50, T-V8-53, T-V8-59, T-V8-61 (b), T-V9-57, T-V10-43, T-V10-45, T-V11-13, T-V11-19, T-V11-21, T-V11-31, T-V11-38 (b) – T-V11-41 (b) — registers its suites on V12 §3.7.8's engine under its V12 §2.13 pin, reads "off" as V11 §3.24.0 (V11 §3.7.4 for items 105 and 107) and follows V12 §3.7.6's bumps | V01 §7; V02 §7; V03 §7; V04 §7; V05 §7; V06 §7; V07 §7; V08 §7; V09 §7; V10 §7; V11 §7 |
| X-V12-12 | the base | the requests applied as file f items (V12 §10.1); §16's M3a row carries item 110 (a) – (d)'s base parts and K2, raised-way generation at M3a; §13.2's conformance clauses on the harness registry's `conformance` list; V12's deltas in §16's sum | §16; §13.2 |
| X-V12-13 | V04 | T-V4-54 reads g's *voids* (a deep void a connected component as V12 §3.4.2's `void.*` row defines it, at most three per town); T-V4-43's ± 3 s.e. and 500 seeds per rung and T-V4-58's ± 3 s.e. and ≥ 200 undercities as parameters; T-V4-51's step script V12 §3.6b's; `CatacombComplex.id` keeps its source lineage; T-V4-44 never reads a monument's tiers | V04 §7 |
| X-V12-14 | V07 | the village rungs' levels of item 109's bars join at V-M4 (`notApplicable` before); V07's village pin registers on V12 §3.7.8 | V07 §7 |
| X-V12-15 | the base, V02, V03, V06, V11 | every bar a register line names as `bar.<id>` that no spec carries registers a `BenchBarDef` with the milestone whose exit writes the entry (the base's T16-4, V11 §8's `detourFactor` line; V02's T-V2-22, -28, -29, -30, -32, -36, -37, -42, -46, -47, -51; V06's T-V6-6 – -10, -13, -16, -18, -28, -31, -32, -40, -43, -54, -62, -72, and T-V6-34 and -37 in their epoch forms; V11's T-V11-30; V03's T-V3-35; the base's bench bars of items 112–119 by their §13.2 ids — T112-1; T113-1, T113-3, T113-4, T113-6; T114-6, T114-7; T117-2; T118-2 – T118-6; T119-2 (V12 §3.15)), each setting's `preset` a `PresetArm` | V02 §3.10.10; V03 §2.4; V06 §8; V11 §8; §13.2 |
| X-V12-16 | V01, V03, V04, V05, V07 | every milestone landing a registry table or a calibratable column exits with `plat calibrate register --check` green over the cells it lands; V03 writes its own lines, the others take V12 §3.11's named lines or the default line | V01 §8.1 (J-V1.97); V03 §2.4, V03 §8; V04 §8 (J-V4.117); V05 §8 (J-V5.80); V07 §8 (J-V7.124) |
| X-V12-17 | V01, V03, V04, V05, V06, V07 | the default line dates a column landing after M-CAL's record to its layer's later run (`M-CAL/under`, `M-CAL/sky`, `M-CAL/evolution`, `M-CAL/M6-P`); `--milestone <id>` is required in V12 §2.8's form; the volumes' own lines write their steps so (`V6-E1` – `V6-E8`, `V4-U*`, `V4-U3b`) | closed: the seat writing each entry writes the id, the command refusing any other form; V04 §8 and V06 §8 write the ids |
| X-V12-18 | V02, V03, V04, V09, V10, V11 | a line of several stages is one staged entry; the span-rule line's order M4, `V4-U3`, `V4-U5`; V03's hand tuning at `V3-P6` and its hand fallback by the moved-value row; rows a later step adds by the rows-added row; V09's and V10's application constants outside the register | closed: V04 §8's span row takes this line's order and cites it; the rest hold as the destinations read |
| X-V12-19 | V04, V06, the base | V06's lines date by exit step and line `stateSnapCm` at `V6-E2` on `bar.T-V6-62`; V04's span row (J-V4.118) names the cells `raisedWays.structure.span.*` (values V11 §3.24.2; the rule §2.7, file f item 244); item 244's slide bound and item 245's snap named by their V11 cells | V06 §8; V04 §8; file f items 244, 245 |
| X-V12-20 | V09 | the app harness runs V12 §3.15.11 – V12 §3.15.16's fixtures: the device fixtures with T121-5's captures, the crisis previews' and the weather fixtures' sessions, the touch scripts and the resize script at the medium class's minimum | V09 §7 (T-V9-22, T-V9-84, T-V9-85, T-V9-87) |

### 10.3 Hand-offs to this volume — closed here

| from | what | closed at |
|---|---|---|
| V02 X33 | the metric family `bar.<barId>` naming V02 §3.10.10's lines' bars | V12 §2.1 (J-V12.65); V02 registers its `BenchBarDef`s (X-V12-15) |
| V06 §7 (T-V6-34, T-V6-36, T-V6-38, T-V6-40) | T-V6-38 as item 109 (k) (6)'s monotone bar; T-V6-40 (a), (c) as the epoch forms of "at most one catacomb at TOWN" and "the largest under the largest cemetery"; T-V6-34 and T-V6-36 on `voidAccessible` and `voidSealedDeep`; the walled-share growth parity | V12 §3.6b's bar map (the 109 (k) and 109 (j) (5) rows); the growth parity is V06's ours-against-ours bar, a `BenchBarDef` where a line names it, never a parity row (V12 §3.4.4) |
| V06 §3.19.1 (4); V06 §7 (T-V6-65) | the guards `raised.generatedBelowCity`, `raised.reasonMissing`, `raised.overCap`; T-V6-65's declared shift; the growth parity's raised-way presence row | V12 §3.4.2, V12 §3.7.4; V12 §3.7.6 and V12 §3.7.8; V12 §3.4.4 (no reference row) |
| V06 §2.2's structure knobs; V06 §7 (T-V6-61, T-V6-62) | `retaining.holdM`, `.neglectAfterYears`, `.stretchM` and `aqueduct.disuseAfterYears` as V11 §3.18's cells; T-V6-61 and T-V6-62 in the nightly tier | V12 §3.11's `decline` line (owner V11); T-V6-61 and T-V6-62 are V06's, nightly on its fixtures by §13.8, each a `BenchBarDef` where a line names it |
| V06 §8's register lines (`bar.T-V6-<n>`) | the bar family; the `decline` line split so the base persistence cells are owner `base`, written by the seat landing V06's E2 | V12 §2.1; V12 §3.11 (J-V12.66) |
| V06 §8's register paragraph and line table (J-V6.126) | V06's lines dated by exit step, due `V6-E7`, `V6-E8` or `V6-E9`; `stateSnapCm` at E2 on `bar.T-V6-62` | V12 §2.8; V12 §3.11 (J-V12.82) |
| V11 X-V12-1 (its reading) | the compiler's part of X-V12-1 | V12 §2.10 cites V11's compiler |
| V11 X-V11-12 | every calibratable cell of V11 §3.23 and V11 §3.24 registered; evidence carried; a `corpus` source in pack rows | V12 §3.11's *Items 109 and 110 by column* with their catch-alls; V12 §2.10 |
| V11 X-V11-14 (c) | the run scope and the cost shortcut read the registry's `readers` StageIds, a module id never counting; V11 §8's bar registrations write `preset: 'default'` | V12 §3.7.2 (4), V12 §3.7.7; V12 §2.1's `PresetArm` |
| V11 X-V11-16 (b) | `PresetArm` takes `'NG'` through `PresetId` | V12 §2.1 |
| V11 X-V11-17 (f) | the span-rule line cites row 80's `structure.span`; the `raisedWays.structure` line excludes the `span` block and holds `slideMaxFactor`; `stateSnapCm` its own line | V12 §3.11 (J-V12.82) |
| V09 §7 (T-V9-84) | T121-5's pixel captures taken on V09's harness for this volume | V12 §3.15.11 (`resolution.textPx` reads them) |
| V04 §7 (T-V4-82 (g)) | the `item123.damage` pin over the underground's bands and per-band exports | V12 §2.13's row; V12 §3.7.8's list |
| the base's §10.2 *Crisis looks* (i) | V12's item-122 (h)–(i) measurements beside T122-1 – T122-7 | V12 §3.15.12 (T-V12-55) |
| V06 §7 (T-V6-75, T-V6-76) | T122-1's hand-over clause and T123-4's epoch clause run on V06's engine | V12 §3.15.12 and V12 §3.15.13 name them as V06's |

## 11 Owner questions

Every owner question is answered (J122; `docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md`); the design reads each decision in
its body.

| # | question | answer |
|---|---|---|
| Q-V12-1 | Buy one month of FTG's premium tier to capture one METROPOLIS for the side-by-sides? | decided (J122): no. METROPOLIS stays compared with MFCG size 130 (D-31); FTG's published metropolis pictures are an unscored card (V12 §3.4.4) |
| Q-V12-2 | When does the owner sit? | decided (J122): only at the gating milestones — M1 (the look check), M2b, M4 and M5 — batched, about an hour each; a missed sitting leaves its milestone *provisional — not rated*; the staged panels join the next gating sitting once built, else stay unrated (V12 §3.9.1; §13.6 (1), (7)) |
| Q-V12-3 | Should an era and region's historical layer become the default look of new towns of that era and region? | decided (J122): only where the owner's sitting passes it, frame by frame — the after side better or the same on realism in two thirds of its pairs and not worse on legibility on every pair of any rung; otherwise selectable, the default unchanged; unrated, `pending-owner` and selectable; a town of another era or region never receives it (V12 §3.10.6) |

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed evidence).** Every base section this volume cites was read at its text with files f and g
applied (§1, §6.4, §7.6, §8.2, §8.8, §11.1, §12.1 – §12.2, §12.9 – §12.10, §13.2 – §13.9, §14, §16, §17.1, the staged table,
D-2, D-5, D-30, D-31, Appendix A), as were items 102–126 (item 119 (a2), items 120 – 126 and item 122 (h)–(i) with their dated routings, J132 – J140, and
the canon's ruling of 2026-10-01 on their shared names, bar ids and milestones), the delegated decisions (J121, J122) and the sibling sections
named in V12 §10.2 and V12 §10.3. `H32` as written from the published algorithm reproduces §13.6's check vectors
(1221236157, 3998735106, 1965791931 after reduction, 1819777585, 951122398, 3881605733) and SMHasher's verification value
0xB3ECE62A, and gives V12 §2.4's vectors (`docs/validation/bench/v12_h32_vectors.py`, `v12_rev_h32.out`). Executed, seeded,
our own code: the rank rule's null rates (0.000 – 0.005) and powers, the pooled exact test's size (0.002 – 0.015) and
powers (`critique_v12_nullrule_rank_power`, `critique_v12_pooled_exact`); the tendency rules' rates (`v12_sweeprule`); the
effective-instance and deep-void rates (`v12_rev_clustered`); the confirmation stage (`v12_rev_confirm`: 0.0015
fallbacks per bar at a real 0.8-standard-deviation effect, 0.06 over 40 bars); the [min, max] coverage (n − 1) ÷ (n + 1) =
0.82 at n = 10. The MFCG facts T-V12-6 holds the product to are the recorded measurements of
`captures/mfcg/exports-2026-09-25/README.md`, `captures/mfcg/exports-sweep-2026-09-25/README.md` and
`docs/validation/bench/README.md`; the coastal ring's 24 shore vertices and 20 towers are the exports README's review note
2. `v12_rev_item110_grep.out`: 0 of 48 research inputs mention retaining walls, viaducts, aqueducts, elevated or raised
roads, deck plots or houses on a bridge. The corpus's laws are `partitioned/README.md`'s, read whole; no corpus file was
opened. The validation records keep the evidence of each review round.

**PLAUSIBLE (reasoning, each measured or calibrated by its stated protocol, with its pre-decided fallback).**
1. Every budget of V12 §6 until the milestone named beside it, and every estimate of V12 §8 (W7 among them).
2. The ten-seed choice's adequacy (S-V12-1); the derived street graph's stability on MFCG's footprint outlines (S-V12-2);
   that FTG's server build can be pinned by capture date; that the corpus holds enough surveyed maps for frames of 20
   (risk 7).
3. The metric definitions' parameters (the 2 m node merge, the 8 m spur prune, the 1.0 m cluster gap, the 3 m closing, the
   1.5 × deep-block rule, the 10° wall-node turn) and V12 §3.4.2's default rules — our own, a change being a major metric
   version.
4. The correlation and tendency rules on real towns beyond their simulations (spike S-V12-4; risk 9): that real clustering
   resembles the simulated town effect (the design effect estimates ρ per bar, so a different structure changes the
   effective count, not the rule); that the confirmation stage's family-wise rate holds when bars are correlated; that the
   households-form reading of a church's parish coverage lets T-V11-13 see a real pull.
5. Our own §13.7 values: the distinctness thresholds (1.5, 0.15, 10°), the structure separation, the no-regression
   tolerance; every item-110 threshold and count here (K2's ≥ 8 jetties and ≥ 4 with deck buildings, the 2 % straightness,
   the 1 m anchoring, the 20 % mid-mole tolerance, the 1 ha islet, the 30 TOWN guard towns, 100 and 200 towns per
   raised-way level); the item-111–126 counts (200 towns per cell, ≥ 200 per rate, ≥ 100 towns for `most`, five
   seeds per wait kind, three Find chip sets per seed, the 120-second Auto session, the 0.05 level step, the force
   fixtures' headcounts, 50 expected spells per arid band, the resize script's sizes); the two MFCG shore-end towers (not pixel-checked in the README).
6. That every fixture level the bars need can be set as a frozen S1 output or a dossier or declaration input (risk 10);
   that a ravine forcing site always exists on which the detour loses (registration refuses one where it does not).
7. The staged panels' durations and that they fit the gating sittings' hour (V12 §6); the M4-110 group's minutes.
8. That item 575's per-run wall features keep their enceinte's address as `id` (T-V12-4's runs clause catches the other
   reading at M4, the pre-decided fallback a base request giving each run `wall` and `run` as item 447's retaining runs
   carry); that V04's ruin element records carry their persistence class and the levelling stage reports `W_STEEP_RAMP` per
   crossing, as `ruin.survival` and `crossing.kinds` read them.
9. That the PR-tier golden check tells a digest moved by a value alone from one a same-change reader landing shifts; that
   `terrace.siteShare`'s M5 tuning moves no committed digest (where it does, it is held); that no volume other than volume
   1 moves a default-line value before its due (the check fails any that does without the row); that each author seat the
   source manifest names belongs to one design document.
10. That the later corpus runs opening on the owner's word is wanted as M-CAL's is; that a staged layer's last milestone is
   where its run belongs; that volume 7's V-M2u lands only underground cells.
11. That every bar a register line names has a scalar or per-clause verdict statistic its owner can register; that no
   register line but V12 §3.11's items 103–107 and item-106 lines names a column of registry rows 14–15, 17's `profile`,
   19 or 33–37 (the one-knob-one-entry check finds any at C2's and C4a's exits); that `tune`'s "no run when the metric
   holds" clause is wanted only where an owner states it (V07).
12. That the corpus stage can target the default line's columns (a column no frame's run targets closes `fixed` by the
   line's fallback); that the empty-table rule leaves no column holding cells without an entry at any exit (the PR-tier
   per-cell check finds any); that the staged-entry rules, the rows-added row and the extended `--check` behave as written —
   no fixture has run (T-V12-20 runs from M1); that every legitimate move of a named entry's cells already writes a cells
   row (a run by V12 §3.7.6 step 5, a restating line, the command), so the check's extension to named entries catches only
   moves outside a line's method.
13. That V09's app harness evaluates `live.find` on the fixture documents at every band and layer as its frame sampler does
   for the progress view, and that three chip sets per seed reach every match kind item 120 (b) lists (V12 §3.15.10).
14. That V09's app harness drives the Auto loop on device fixtures standing for the reference, low-end and ultra-tier
   devices and captures the text layer at each level (T-V9-84); that a threshold fixture straddling the loop's two
   tests can be built from a view's layers and lighting; that §10.2's placement exposes each camp's faces and ring
   remainder to `crisis.areaPerHead`; that a 0.05 level step reaches every element kind's threshold range; that a
   simulated weather clock reaches 50 arid rain spells per band inside the nightly budget; that V08's force fixtures
   can be authored before item 125 (d)'s final check confirms SettlementForge's force fields — a field it names
   differently changes the fixture, never the bar (V12 §3.15.11 – V12 §3.15.16).

## 13 Fix list

None open. Every finding against this volume — its critiques', its seam rounds' and the coherence pass's — is fixed in the
text above, and every hand-off it named or received is closed at its destination (V12 §10.2, V12 §10.3); the validation
records keep the disposition of each. What remains is measurement, not design: V12 §12's PLAUSIBLE items, each with its
protocol and pre-decided fallback (V12 §6, V12 §8).

## Integration notes

The integration lane's rulings for this volume (`docs/volumes/_integrate.md`) are folded into the text at their homes:

| ruling | where it lives |
|---|---|
| J-VI.17 H29 — V05's `IslandRule` cells `accessSiting.deckGapM` and `lineClearM` are volume 5's own calibrate-later cells, never V11 rows | V12 §3.11 (the default line) |
| J-VI.10 — X-V12-9 met by V11's owner-rule stamps and raised-way calibration minima and V11 §3.24.0's `presets.FM` line | V12 §10.2 (X-V12-9); V12 §3.7.2 (5); V12 §3.4.4 |
| J-VI.4 — a bar that counted refusals of item 110 or of the sky layer counts bends, each with its line | V12 §3.6b |
| J-VI.18, J-VI.3 — BCR-V12-15 and BCR-V12-17 applied with BCR-V9-31 as file f item 447's one text; the closures' six barrier kinds; the `span` polygons no bar reads | V12 §2.2; V12 §10.1 |
