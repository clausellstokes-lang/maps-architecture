# Design volume 12 — Calibration, reconciliation and parity measurement: how the built generator is tuned against the references and later the corpus

> PENDING FABLE REVIEW — written by opus stand-ins for the Fable seat (volumes/V12-calibration, its revisions, reconciliation and coherence lanes); covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the calibration and parity machinery the base
(`docs/ARCHITECTURE.md`, with files f and g applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`)
carries in §13 and §16. The implementer holds the base and this volume and nothing else (§17.1). Every fact the base or
another volume states is cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or `II.n`
is the base's; `Vnn §n` is a design volume's section, this one included (`V12 §3.11`); `item n` is an amendment item —
items 1–113 the owner's, items 200 and above file f's, each the applied text of a volume's base change request (V12 §10
lists this volume's); `J-VI.n` is a volumes-integration decision (`docs/volumes/_integrate.md`), cited and never
restated. Decisions are `J-V12.n` (V12 §9), tests `T-V12-n` (V12 §7), owner questions `Q-V12-n` (V12 §11). This volume is
an implementer input under §17.1 (1): it names no reference class, method, grammar, palette or asset; reference evidence
is cited by file and section only, and every number it quotes from a capture is a measured behaviour (§17.1 (6)). The
corpus was not read: its machinery and process follow `partitioned/README.md`'s rules alone.

## 0 In plain words

**What this part of the program is.** Once the generator is built, its rule tables are full of numbers — how far a lane
may bend, how wide a rich plot is, how often a market sits off the main square. This volume is how those numbers are set
right and how we prove it, first against the other generators (MFCG, FTG, Neighbourhood, Village Generator and Fantasy
Manor) and later against the owner's historical map collection — without ever changing how the generator works. It runs
as four loops.

1. **Measuring the references.** A research helper measures our recordings of the other generators — how much streets
   turn, how big buildings are, how many gates a town has — on towns whose seeds were fixed by a formula before anything
   was captured, so nobody can pick flattering examples. Only numbers cross into the product's folder: never a picture,
   a name, a colour or a line of anyone's code.
2. **Measuring ours the same way.** The product measures its own towns with the very same code, so like is compared with
   like. Every number has a band worked out by one written rule; each night a report says, for every comparison, "in
   band", "out of band" or "for information".
3. **Tuning.** When one of our numbers is out of band, a table value is changed — never the code — by a small, recorded
   search on practice towns kept apart from the test towns, then checked on a second set it never saw. Each change is a
   new version of that table, declared in the release notes in plain words ("lanes now bend a little more, matching FTG's
   streets"), and saved towns keep opening exactly as they were made.
4. **The owner's eye.** At four milestones — M1 (the look check), M2b, M4 and M5 — the owner gets one sitting page of
   about an hour: pairs of maps, ours beside a reference, the sides hidden, three questions per pair — which is easier to
   read, which looks more like a real town, which would you rather use. A later stage's pairs join the next of those
   sittings if that stage is built by then; otherwise they wait, marked "provisional — not rated". Only the owner's
   answers let a milestone say "at parity" or "mastered"; a machine never says it for them.

**Tendencies, not guarantees.** Many of the owner's rules are leanings — "the tannery is usually downstream", "a town
that grows over a cavern usually breaks into it", "in dry country the households crowd toward water". The harness proves
each one by counting over many practice towns: it ranks each town against the same town shuffled at random (ties broken
by a fair coin), counts members exactly where the question is "how many landed on the right plots", or watches a rate
climb as the towns grow — with rules worked out beforehand so that chance alone almost never passes and a real leaning
almost always does. A bar that fails is re-run once on fresh towns before anything is changed, so bad luck never moves a
number. Where the owner's own volume states how a bar passes, that statement wins.

**Rules that are the owner's stay the owner's.** Some numbers are the owner's word — a catacomb only under a cemetery,
the cathedral always with a crypt, raised ways generated only in cities. No tuning run, no fallback and no historical map
may move them; if the historical maps show something an owner's rule excludes, it goes to the owner as a question with
the recommendation "keep the rule". Catacombs are checked to never shrink on every kind of rebuild and, when they cannot
grow, to fill their ossuaries instead; a cave whose last way in closes is checked to become lost — remembered, drawn
faded, its dwellers gone — and to be found again when a way reopens.

**Later: the historical maps.** After the generators are built, the owner's historical map collection adjusts default
numbers and bands — never the machinery. One historical example proves that something is *possible*, never that it is
*common*; only a fair sample of measured town plans, chosen before anyone looks at the answer, can say how common
something is. The collection teaches drawing, never naming, and its 53 held-back plates are never used. MFCG's and FTG's
behaviour stays exactly reachable through the parity presets; the historical values arrive as a "historical" layer per
era and region, which becomes the default only where the owner's before-and-after sitting passes it.

**Features no reference has.** Terraces and retaining walls, viaducts, raised roads and aqueducts, buildings on moles and
bridges, stepped temples, oases in dry country and town histories that leave old walls and buried streets behind: none of
the other generators makes them, so we measure them against our own rules, the "look like MFCG / FTG" settings never show
them, and turning each new rule off gives back exactly yesterday's towns. Two original test cities must come out as
sketched, every time.

**How it feels to the owner.** A one-page dashboard in plain words after each nightly run; the four sittings; release
notes that name every number that moved, what it was matched against and by how much, with one plain line for each new
behaviour switched on; and, before the public release, the report of ten to twenty game masters who used the map on
their own settlements, whose findings enter the same records.

## 1 Scope, the base hooks consumed, and what is out of scope

**Built to depth here.** The calibration harness end to end: the metric suite as a registry with one implementation run on
every source (V12 §2.1–§2.2, §3.4); the numbers-only crossing of the firewall (V12 §3.3); the capture-and-measure loop with
pre-registered seeds (V12 §3.2); the band arithmetic and the parity run (V12 §3.5); the correlation harness every "above a
random baseline" bar uses (V12 §3.6) and the share, sweep, paired, two-sample and step-script harness of every other
tendency or property bar (V12 §3.6b); tuning runs as table-version bumps with declared shifts (V12 §3.7); reference drift
(V12 §3.8); the owner's sittings as one panel engine with its page (V12 §3.9); the corpus reconciliation as a process
(V12 §3.10); the calibration register that keeps every provisional number wired to its measurement (V12 §3.11); the
known-city fixtures' engine with the second fixture's structure list, seed and golden (V12 §3.14); the no-op pin engine
every owner item's pin registers on (V12 §3.7.8) and the feature switch-on bumps (V12 §3.7.6); the intake of the
game-master trial's findings (V12 §2.14); and every edge of these mechanisms (V12 §3.15).

**The base hooks consumed** (each cited, never restated):

| base hook | used at |
|---|---|
| §13.5 (`Baseline`, `ParityReport`, the band rule, the ⟨M-1⟩ rule, matched sizes, the metric table; items 496, 497) | V12 §2.3, §3.4, §3.5 |
| §13.6 (the D-5 protocol, `H32`, `D5Pair`, `FtgCapture`, `D5Record`, the rule for an unrated panel, the sittings of J122; item 500) | V12 §2.8, §3.9 |
| §13.7 (JT, the thresholds, "not achieved", the correlation and tendency rows; item 501) | V12 §3.6, §3.6b, §3.7, §3.11 |
| §13.9 (`CorpusAdapter`, `CorpusMap`, `CalibrationRun`, items (1)–(11); items 503, 504) | V12 §2.5, §2.9, §3.10 |
| §13.3 (`ShiftRecord`, `CascadeRecord`, `MilestoneRecord`, the golden store; items 491–493) | V12 §2.4, §3.7, §3.11, §3.14 |
| §13.2 (the core statistics record, the bench metrics `stats(doc, { level: 'bench' })`, the faithfulness campaign's rank method, the owner-item bars and their convention, T101-6; items 488, 489) | V12 §3.4, §3.6, §3.6b, §3.7.8, §3.14 |
| §13.8 (the CI tiers, budgets and the bar schedule; item 502) | V12 §6 |
| §16 (M-1, the milestone rows, J122's order, the release gate; item 533) and §12.1 (the reference machine) | V12 §6, §8, §3.11 |
| §17.1 (1)–(8) (seats, the repository boundary, numbers-only files, the scanner, provenance, the published methods; items 535–537) | V12 §3.3, §3.14 |
| item 69, §8.2's measurement render and palette targets, §13.4's palette bar | V12 §3.10.7 |
| §7.6 (cells and their provenance with `evidence` and `ownerRule`, the pinning hash, the parity presets, packs, the reading rule for absolutes; items 381, 382) | V12 §2.10, §3.7.2, §3.10.3 |
| §6.4 (table and output versions, retention, stage isolation) | V12 §3.7 |
| §11.1 (the metric GeoJSON variant; item 447) | V12 §2.2 |
| §14 (`@plat/testkit`, `@plat/tables`, `@plat/docs`; `CorpusAdapter` as an extension point; item 521) | the code's homes |
| D-2, D-5, D-30, D-31 | V12 §3.4.4, §3.10.3 |
| §2.7 (`Enceinte.closure`, item 106's `barrier` closure; item 110's `RetainingWall`, raised ways and deck plots; item 575) and §5.3's deck invariant | V12 §2.2, §3.4.2 |
| II.7.3, II.7.5, II.7.6 (item 109's `ruin` system, access records, the catacomb rules, item 113's lost access and buried former settlement) and §4.11 (epochs, the history replay) | V12 §2.2, §3.4.2, §3.6b |
| §7.5 (upgrade) and §7.1's fate report | V12 §4.1 |

**Rules from other volumes this volume hosts.** V01's NG template rows (T-V1-31) and panel (T-V1-32), V02's Fantasy Manor
harness and panel (T-V2-31, V02 §7.5), V07's VG rows and panel (T-V7-23, T-V7-29), V03's plan panel (V03 §8, P6; its
Dwellings notes stay research-side, never a `baselines.json` row), V04's underground panel (V04 §7), V05's island set (V05
§7, descriptive), V06's history panel (V06 §12, on H-100), and the statistical bars of file g (items 103 (e)–(f), 104 (g),
104 (h) (8), 105 (k), 106 (h)'s enclosures, 107 (g), 108 (f), 109 (a), (c), (i), (j) (1), (j) (5) and (k) (4)–(6), 110
(b)'s two "likelier" clauses and its viaduct and aqueduct presence, 111 (d), 113 (e)) all run on this volume's machinery;
item 102 (g) is a fixture bar of V05 and V06, not a random-baseline bar (V12 §3.6). Each volume keeps its rows' content;
this one supplies the registry entries, the bands, the harnesses, the pins and the sittings. **Precedence (J-V12.48):**
where the owning volume states a bar's pass rule, seeds or tolerance (V11's T-V11-12 – T-V11-18, V04's T-V4-6, -19, -20,
-43, -49 – -58, V06's T-V6-34 – T-V6-40), that statement wins and the harness takes it as parameters (V12 §2.7, §2.7b);
V12's rules are the defaults for a bar that states none. The unit a g item names (a *void*, a *placement*, a *district*)
is g's and binds the owning volume too. Every volume's calibrate-later model constant, with its default, measurement and
fallback, is one entry of the calibration register (V12 §3.11). The second known-city fixture's structure list, seed and
golden are this volume's (item 110's HOMES: "V12 (the fixture's bars)"); its canvas script is V09's, its transcript V10's.

**Out of scope.** The stages that produce what is measured (§4, the volumes); the content of any rule table (V11, and
V04's `CatacombRule`); the g items' bars as base text (§13.2 states them; this volume gives them their harness and
default pass rule, item 488); the bars of the other volumes (their own §7), among them every fixture bar of items
105–113 that is a plain conformance check — a quay reachable, a catacomb count within its bound, at most one catacomb at
TOWN, every catacomb under a cemetery or a CITY or METROPOLIS quarry ossuary and none under a church, the cathedral
always crypted with the largest crypt (V04's T-V4-50, V06's T-V6-40, V11's T-V11-25), an oasis only where item 111 (d)
admits one (T111-2), the history fixtures of item 113 (g) (T113-1 – T113-4, T113-6; V04's T-V4-76, V06's T-V6-70), and
item 110 (f)'s:
* generated retaining walls exactly where S10 or S11 levels ground steeper than `terrace.slopeMin` with a step above
  `terrace.stepMinCm`, and never elsewhere (§13.2's T110-1; V06's T-V6-62 over epochs; V01's terraced districts),
  reported by the model metric `retaining.onFlatM` (V12 §3.4.2), never a harness row;
* every way crossing a retaining wall a stair or a ramp (the base's way-class rule; V01; V07's village crossing rule);
* a raised part's zero junctions with part 0 and no shared planar arrangement (§3.4, §5.3; V04's T-V4-62 – T-V4-70
  below it; V01's T-V1-51);
* generated raised ways only at CITY and METROPOLIS, each with its reason, within the cap, and a suppression holding
  (§13.2's T110-3; V06's T-V6-60; V01's T-V1-52; V07's carried ways; V09's tool) — V12's reach there is the guards (V12
  §3.7.4), the owner-stamped cells (V12 §3.7.2) and V12 §4.1's rule for releases and layers;
* tiers nesting with one shadow each (V02's T-V2-44);
* deck plots within the deck's width and budget, falling with the deck (V02's T-V2-47; V06's T-V6-63; V01's T-V1-53).

Also out of scope: an editor sitting on the application itself (V09 §7.4 reuses only the protocol's shape); running the
game-master trial (V09 §7.6: recruitment, sessions, the report); the style check's mechanism (§8.2, §13.2's T112-1);
SettlementForge's inputs (V08) — calibration never *targets* a dossier fact, reads dossier fields only as fixture inputs
of its bars and guards (V12 §1b), and never re-signs the dossier row sets (§13.9 (7)); FTG's paid METROPOLIS (D-31; Q-V12-1
answered no, J122).

## 1b Wiring table

Every piece this volume adds, what feeds it, what it feeds and the base hook it plugs into; no piece is an orphan. The
**records** — their producers, consumers, persistence, regeneration, undo and migration — are V12 §2.11's one table
(E-35); this table wires the engines, commands, profiles, metric families and bars that make and read them.

| piece (V12 §) | producer (fed by) | consumers (feeds) | base hook |
|---|---|---|---|
| `plat measure` (3.4) | a `MeasureInput`, a `.plat` document, a render, a trace or a count file | per-seed metric rows → `plat baselines aggregate` (research side) and `plat parity` (product side) | §13.2 `stats(doc, { level: 'bench' })` |
| `plat baselines aggregate` and the estimators (3.5) | per-seed rows | `Baseline.values`, `spreadKS` (research side); ours in `ParityReport` | §13.5 band rule |
| the crossing check `plat baselines check` and its M-1 twin (3.3) | a candidate numbers-only file | the commit into `plat/`; its `CrossingRecord` | §17.1 (3)–(5) |
| seed families `seedOf` (2.4) | `@plat/testkit/seeds` | the capture plan (3.2), B-REF (3.5), B-CITY and the goldens (item 491), tuning train, holdout and guard families (3.7), the correlation harness (3.6), the sweep bars (3.6b), panels (3.9), the known-city fixtures (3.14) | §13.3, §13.6 (2) `H32` |
| the capture plan `research/baselines/plan.json` (3.2) | `plan.py` over the seed families | the capture sessions; crossing check C7; the panels' reference-id files | §16 M-1 |
| `plat parity` and its dashboard (3.5, 5.1) | `baselines.json`, the B-REF towns | `ParityReport`, `history.jsonl`, the CSV; the owner, the seats and the milestone exit review | §13.5; §14 `@plat/docs` |
| the correlation harness `plat nullmodel` (3.6) | `NullModelSpec`s registered by each bar's owner (§13.2's rows, V11's T-V11-12 – T-V11-14, the volumes' bars); B-CITY's nightly towns (pooled settings) or the spec's own `null/…` family | `ParityReport` rows of class C / O with verdicts `pass`, `suspect`, `fail`; the confirmation re-run; corpus correlation rows; the register | §13.2; §13.7; T71-3 |
| the tendency and property harness `plat statbar` (3.6b) | `StatBarSpec`s registered by each bar's owner (the bar map, V12 §3.6b) | `ParityReport` rows of class C / O; register entries of method `measure`; `known-defects.json` | §13.2; §13.7 (item 501) |
| the step-script runner (2.7b, 3.6b) | the bar's fixture documents | T-V4-51, T-V4-52, T-V6-38, T-V6-39 (`exactMonotone`, `exactBound`); T-V4-77 and T113-5 (`exactStates`) | §7.1's events, §7.5's upgrade |
| `plat calibrate run` (3.7) | a spec committed before its first evaluation | `CalibrationRun`; table source edits through V11's compiler; `ShiftRecord`s with cause `calibration` | §13.9, §13.3, §6.4, §7.6 |
| `plat calibrate register` (3.11) | the seat landing each volume's constants (its named lines' entries; the default line's by `--defaults --milestone <id>`), runs, panels, exits, M-1 records, `--hold` | `register.json` and its report (5.2) | §13.7 JT |
| `GuardSet.fixtureSuites` and the TOWN guard (2.5, 3.7.4) | B-DOSSIER-lite (§13.2, item 84), the owner-rule hook fixtures, K1, K2, `tune/<id>/guard/TOWN/…` | a run's acceptance (3.7.5); `guardFlips` | §13.2, §13.8 |
| the panel engine `plat d5 seeds / render / verdict` (3.9) | the registered `PanelSpec`s (3.9.1) | `seeds.json`, the renders, `D5Record` verdicts, `MilestoneRecord.d5` | §13.6 (item 500) |
| the sitting page `research/d5/<panel>/sitting.html` (3.9, 5.4) | `build_sitting.py` over the product's renders and the reference images | the owner; `answers.json` → `D5Record` | §13.6 (4)–(10) |
| the drift watch `research/baselines/watch.py` (3.8) | each reference's live build | `BaselinesFile.pins`; a `baselineShift` shift record at a pin change | §13.5 |
| the corpus adapter (3.10) | the M-CAL adapter seat, research side, under the corpus's own rules | the `CorpusMapMeta` index, `SampleFrame`s and `frames.json`, `MeasureInput` files | §13.9 `CorpusAdapter` |
| the enclosure profile: `closure` and `enclosure` features (2.2) | the GeoJSON export's closing edges (item 447); the MFCG adapter's shore split (3.2.2); a corpus plan's drawn circuit | `walled.share`, `wall.*`, `gate.count`, `wall.barrierShare` (3.4.2); the corpus frames' wall rows (3.10.5) | §2.7 `Enceinte.closure`; §11.1 |
| the underground profile `undergroundInputOf` (2.2) | the model's underground systems (II.7.6; item 109's `ruin` record, its access records) | `grid.*`, `ruin.blockArea`, `plan.*`, `void.*` (3.4.2) → the paired, two-sample and sweep bars (3.6b) | II.7.6 |
| the profile's item-110 kinds and properties (2.2) | `measureInputOf`; §11.1's GeoJSON variants (item 447) | the per-part way graphs; `wall.*` and `bldg.*` reading only their kinds; the `raised.*`, `retaining.*`, `deck.*`, `tier.*` metrics; T-V12-4, T-V12-38 | §11.1 |
| crypt and catacomb metrics `crypt.*`, `catacomb.*` (3.4.2) | V04's `CatacombComplex` records (keyed by id, its source lineage), V03's `Basement.crypt`, V11's crypt column | the record-keyed `exactMonotone` and `exactBound` bars (3.6b); the crypt and `under.catacomb` register lines (3.11); the V4-U5 framing (3.9.2) | II.7.6 |
| `raised.*`, `retaining.*`, `deck.buildings`, `tier.count` (3.4.2) | the route solver's raised-way records (reason; `source` derived at read; the founding rung from the founding epoch's record — item 244), S10 and S11's levelling, V02's tiers and deck buildings | the TOWN guard (3.7.4); the four raised-way bars; the no-op pins; the switch-on shift records; the nightly statistics | §13.2 |
| `crossing.kinds`, `water.needRatio`, `ruin.survival` (3.4.2) | the way segments' `stair` and `ramp` flags and the `W_STEEP_RAMP` reports (S4, S5, S9); S6's water-balance function; the ruin's element records (V04) | the `ways.crossing`, `water`, `climate` and `under.ruin` `survival` register lines (3.11); the M4-110 and V4-U5 panels' reports; T-V11-33's bench | §13.2 bench metrics |
| item 111's and item 113's indicators `walkWater`, `waterPresent`, `richNearWater`, `excavation` (2.7b) | the bench statistics' household distances to water and the coverage radius of V11's water-supply family (§4.7 S10b), S0–S1's water features and oases (§4.2), the field's bands (§4.5), V04's `excavation(doc, cluster)` (V04 §2.2) | the item-111 and item-113 rows of the bar map (3.6b); their register lines (3.11) | §13.2 T111-1, T111-3, T111-4, T113-5 |
| the metric families `bar.<barId>` and `frame.<table>.<column>` (2.1, 3.4.2) | `plat build`, from the registered `NullModelSpec`s, `StatBarSpec`s and `BenchBarDef`s and from the registry's calibratable columns; values by `plat parity` (each bar's row) and by the corpus runs' frame rows | the register entries' `metric` lists (V12 §3.11; V02 §3.10.10, V06 §8, V11 §8); the lint (T-V12-20); the milestone exits' history rows; the fallback runs' targets (3.7.1 (b)) | §13.2; §13.5; §13.9 |
| the structure engine (2.12, 3.14) | the `KnownCityFixture` records and their three authoring paths | T-V12-36; the guards; the M4 panel's M4-110 group; exit rows `T-V12-36:<id>`; V03's B-PLAN click set (from P1); V01's T-V1-54 at M5; V04's T-V4-62 – T-V4-70 on K2; V10's evaluation group A | §13.2 T101-6 (item 489); §13.8 |
| the no-op pin engine (2.13, 3.7.8) | the `NoOpPin` registrations of every owner item's pin; V11's off forms (V11 §3.24.0, V11 §3.7.4, the cells a bar names) | CI (the landing gate per commit on the two PR golden seeds; the off-state suites nightly); the switch-on bumps; re-recording by other causes' shifts | §13.2's convention (5); §13.3; §6.4 |
| the switch-on bumps (3.7.6) | the release that switches a family on | shift and cascade records of cause `feature`; the release notes' plain line (5.5); K1's and K2's goldens; the pins' off-state sets | §13.3 |
| the four raised-way bars `T110b.*` (3.6b) | forcing fixture sites (frozen S1), `Level.intent.wealthLevel`, the dossier landmark fixture (DR35) | the `raisedWays` register line (3.11); fallback runs bounded by the owner's minima (3.7.2) | §13.2 T110-3 |
| the M4 panel's M4-110 group (3.9.1) | the panel engine; K2 and five forcing-site towns | the `panel` stages of the item-110 register lines (3.11) | §13.6 |
| the trial intake (2.14) | V09's `GmTrialRecord` (V09 §7.6) with its `TrialFinding`s | register history rows, `known-defects.json` (the fix list), the owner's reconciliation report's questions (5.5); T112-2's exit evidence | §13.2 T112-2; §16's release gate |

**The dossier.** Calibration never *targets* a dossier fact: the dossier row sets `tables/dossier/*` are never a
calibration target (§13.9 (7)), B-DOSSIER-lite's fixtures are not a seed family of any calibration run, so a
SettlementForge fixture never moves a default, and FTG pairs take their populations from the captures (§13.6 (2)), never
from a dossier. Calibration always *guards* the dossier fixtures (V12 §3.7.4: B-DOSSIER-lite runs on every accepted
candidate), and its bars *read* these dossier fields as fixture inputs, each through its derivation row (V08's traces;
the derived fixtures are registered in §13.2's frozen fixture manifest, item 84, which §17.1 (3) makes the one door for a
dossier into `plat/`):

| dossier field (V08) | derivation row | where this volume reads it | how |
|---|---|---|---|
| the population | DR23 (the rung and the frame), DR7 | item 108 (f)'s population sweep levels (× 0.5 … × 2) | a derived fixture `<dossier>@pop×k` in the manifest; a level whose population leaves [1 500, 120 000] is `notApplicable`, never a failure (V12 §3.6b) |
| `site.ruinEvidence` (ancient ruins, a ruined landmark, a magical node, ley lines, magical history) | DR30 | a level's forced ruin source (item 109 (b)) | a fixture record, never a test-only branch (J-V12.35) |
| the terrain and the mining deposits | DR31, DR1 | the mining boost's `higherWith` strata (item 109 (a)) | a fixture record; the site-stage factor is `SiteResources.ore` or the deposits (V12 §3.6b) |
| `economy.chains` (SettlementForge's `activeChains`) | DR33 | item 104 (h) (8)'s and item 105's custom-chain levels | V08's custom-chain fixtures |
| the burial, church, cathedral and monastery records, the Cemetery network | DR32, DR9 | the catacomb count and crypt levels (item 109 (k)); the crypt checks | the surveyed-dossier fixtures |
| `wealth.label` | DR6 (to `intent.wealthLevel`) | the elevated-road prosperity trend's dossier arm (item 110 (b)) | the fixture's wealth word; the standalone arm sets `Level.intent.wealthLevel` |
| the institutions of significance ≥ V11 §3.24.2's `elevated.landmarkMinSignificance` and the custom `landmark` records on high ground | DR35 | the elevated-road landmark `higherWith` (item 110 (b)) | the same fixture with and without the landmark |
| the water-system record `aqueduct_or_water_system` | DR34 (V11's mapping to `conduit_house`) | the raised bump's shift records name the B-DOSSIER-lite towns carrying it (V12 §3.7.6) | read, never targeted: at CITY and METROPOLIS it makes the aqueduct's need count as met (V11 §3.24.7 (3)) — never a factor on the chance and never a declaration; the dossier declares no arches, so no raised way has a dossier source (V06 §3.19.1) |

## 2 Data model

Everything below is test-side or repository data — code and JSON in `@plat/testkit` and `plat/calibration/`, plus
research-side files that never enter `plat/` — except the two optional provenance fields of V12 §2.10 (`evidence` ids and
the `ownerRule` stamp), which ride in the shipped tables, and `dist/evidence.json` beside them. None of it is document
state: a `.plat` document never holds a metric, a baseline or a run; it holds the table versions they produced (§6.4).
**Units** are the metric subset of §2.1's unit vocabulary (E-37): `m`, `m2`, `ha`, `deg` (degrees), `share` ([0, 1]),
`count`, `perHa`, `perKm`, `ratio` (dimensionless), `bits`, `ms`, `s`, `luma` (8-bit Rec. 601), `rb` (8-bit R − B),
`chroma` (CIELAB C*ab), `z` (standard scores), `none`.

### 2.1 The metric registry

```ts
// @plat/testkit/metrics — code; `plat build` also writes dist/metrics.json (ids, versions, inputs, units, rows) for the docs and the research side
type MetricId = string   // dotted, stable, never reused: 'street.turn100', 'lots.r4.60', 'fg.coverWalled', 'fm.towers' — V12 §3.4's catalogue
type MetricInput =
  | 'geo'     // computed on a MeasureInput (V12 §2.2): the same code on a reference, a corpus map and ours
  | 'model'   // only on our model: plots, prosperity, the generation report, the core statistics record (§13.2)
  | 'render'  // on a PNG: §8.2's measurement render (palette), the city band at the matched scale (recoverability, §8.5)
  | 'timing'  // §12.1's timing phase, normalised by the calibration score
  | 'trace'   // a stage's recorded trace at the bench level: S8's cut log (the bent-cut signature, §4.6), S10b's placement log
  | 'counts'  // integer counts a harness writes: Fantasy Manor's family and element counts (V02 §7.4), NG hood and VG village counts
type MetricUnit = Extract<Unit, 'm'|'m2'|'ha'|'deg'|'share'|'count'|'perHa'|'perKm'|'ratio'|'bits'|'ms'|'s'|'luma'|'rb'|'chroma'|'z'|'none'>   // §2.1's Unit, the metric subset (E-37)
interface MetricDef {
  id: MetricId;
  version: string            // semver: major = the definition changed (values move; every baseline of it is re-measured, V12 §3.4.3), minor = a new field, patch = no value change
  input: MetricInput;
  scale: 'metric' | 'free';  // free: angles, shares, counts, ratios, rank statistics — valid on a relative-scale input; metric needs metres
  sign: 'positive' | 'any';  // how a band widens (V12 §3.5.2): multiplicatively for positive quantities, additively otherwise
  absFloor: number;          // the smallest band half-width, in the metric's unit (a zero-width reference spread never gives a zero-width band)
  requires: FeatureKind[];   // MeasureInput kinds read; a source lacking one yields 'notApplicable' for this metric, never 0
  stages: StageId[];         // the registered StageIds whose output it measures (§4.1): a tuning run may only move cells those stages read (V12 §3.7.2)
  output: { kind: 'scalar'; unit: MetricUnit } | { kind: 'distribution'; unit: MetricUnit; edges: number[] /* fixed bin edges */ } | { kind: 'vector'; unit: MetricUnit; fields: string[] };
  perSeed: 'median' | 'mean' | 'share' | 'value' | 'sample';   // how one town's many values reduce; 'sample' keeps the distribution (KS rows)
  row: string;               // the §13.5 / §13.7 / volume row it serves, by its first cell ("street turning", "T-V2-31 family shares")
  tolerance: { abs?: number; rel?: number };   // two implementations of it agree within this (T-V12-3)
  costMs: number;            // budget per CITY town, single thread (V12 §6)
  sampling?: { label: string; n: number };     // a sampling metric's testkit stream label and sample count (R4's 1 500 buildings)
  plain: string }            // the release-note and dashboard sentence, with {ours}, {band}, {dir} slots — our own words
```

Metric code is pure: no clock, no global state; transcendental functions come from `dmath` (§17.4) and every sampling
metric draws from its testkit stream (V12 §3.13), so one `MeasureInput` gives bit-identical values on every host
(J-V12.9). Every field that decides a verdict — `sign`, `absFloor`, `output.edges`, `tolerance`, `costMs`, `stages` — is
filled for every catalogue row, explicitly where the row states it and otherwise by V12 §3.4.2's default rules; a row
whose field neither states nor defaults fails `plat build`. `stages` holds registered StageIds only; a catalogue row may
write a stage group the registry expands (V11's rule: `S5` expands to `S5a`–`S5d`), and `plat build` stores the expansion,
so no metric names an unregistered id (§4.1).

**Two generated families** (J-V12.65). Most register entries are confirmed by an owning volume's bar, and a bar is no
catalogue row; so the registry holds two families whose members `plat build` generates from registrations, each member a
full `MetricDef` filled as stated here:
* **`bar.<barId>`** — the verdict statistic of one registered owner bar, `<barId>` the owner's bar id verbatim
  (`bar.T-V6-8`, `bar.T-V2-32`, `bar.T16-4`, `bar.T110b.viaduct`, `bar.T111-1`). It resolves to the registrations whose
  `id` or `ownerBar` equals `<barId>` — with several, its value is the vector of their statistics and its verdict passes
  only when each passes: a `StatBarSpec` (the value `StatBarResult.statistic`); a `NullModelSpec` (the statistic its pass
  rule tests — the share of towns with u > 0.5 on the rank route, the pooled p on the pooled route, the median margin on
  the `margin` route, the spec's own p in a `holm` family — while `siting.<spec>` stays the placement statistic itself,
  which a corpus row compares, so the two never name one quantity); or a `BenchBarDef` (below), which an owner registers
  for every bar its register lines name that no spec carries as its `id` or `ownerBar` (a second owner's epoch form of a
  bar-map row among them: V06's T-V6-37 beside V04's T-V4-45). `unit`, `stages` and `row` are the registration's;
  `input: 'model'`, `scale: 'free'`, `sign: 'any'`, `perSeed: 'value'`, a scalar output (a vector for a bar of several
  clauses); no band — the verdict is the bar's own pass rule, never V12 §3.5's; `costMs` 0, the value being read from the
  bar's own run. `plat parity` writes one row per registered bar of its tier (`metric` `bar.<barId>`, the statistic as
  ours, the bar's verdict, `baselineIds` empty), as it writes the `NullModelSpec` and `StatBarSpec` rows. A `<barId>` with
  no registration does not exist, so the lint fails an entry naming it (V12 §3.11).
* **`frame.<table>.<column>`** — a declared sample frame's value for one calibratable column
  (`frame.roster.classes.perCapita`; the table id matched as the longest registered `TableId` prefix): the target rows (V12
  §3.10.2) of the `geo` metrics that the corpus run touching that column's cells targets (V12 §3.10.5), each read in the
  frame's corpus variant, its report row the frame's A2 verdict for them under its pack (V12 §3.10.6). It is
  `notApplicable` before M-CAL (read at M-CAL and at each later corpus run `M-CAL/<layer>`, V12 §3.10.1), on every source
  but a frame, and for a column no frame's run targets — whose `corpus` entry then closes `fixed` with "no admissible
  frame" (V12 §3.11). It exists for every calibratable column; a register line's `frame.*` names the members for that
  line's own columns.

```ts
type PresetArm = 'default' | PresetId   // the recipe a harness run generates its towns under (J-V12.72): 'default' — the recipe with no parity preset
                                        // applied (V12 §3.5's O and C rows; an owner bar's own towns); else a registered preset, PresetId (V11 §2.2:
                                        // 'MFCG' | 'FTG' | 'VG' | 'FM' | 'NG'). Every `preset` field of V12 §2's records is a PresetArm, except
                                        // `CalibrationRun`'s `layer` and `CalibrationEntry.target`, which name a preset ENTRY of a cell
                                        // ('FM' | 'VG' | 'NG'), never an arm
interface BenchBarDef {   // @plat/testkit/bars — an owner's bar that is neither a NullModelSpec nor a StatBarSpec, registered in code by its owner
                          // once a register entry names it as `bar.<id>` (V12 §3.11; the owners' registrations, V12 §13)
  id: string;             // the owner's bar id verbatim: 'T-V6-8', 'T-V2-32', 'T16-4', 'T-V11-30', 'T112-1'
  owner: 'base' | 'V01' | 'V02' | 'V03' | 'V04' | 'V05' | 'V06' | 'V07' | 'V08' | 'V09' | 'V10' | 'V11' | 'V12';
  statistic: { what: string /* the owner's plain words: 'the share of growth stages at which crowding precedes regrowth' */; unit: MetricUnit };
  stages: StageId[];      // the StageIds (V06's phase ids for a history bar) whose output the statistic reads; V12 §3.7.2 (4) reads them; [] for a bar no run may move
  towns: { family: string /* 'bcity', 'golden' or the owner's fixture family (V06's H-100) */; perSetting: number;
           settings: { rung: Rung; water: WaterSetting; preset: PresetArm /* 'default' for a bar's own towns (V06 §8, V02 §3.10.10, V11 §8) */ }[] };
  tier: 'pr' | 'nightly' | 'milestone';
  run(towns: { seed: string; doc: Document; bench: ReturnType<typeof stats> /* stats(doc, { level: 'bench' }), §13.2 */ }[]):
    { statistic: number | number[] /* one value per clause, in the owner's clause order, for a bar of several clauses */;
      verdict: 'pass' | 'fail' | 'notApplicable' } }   // pure: the owner's one implementation of its bar — no clock, no global state
```

### 2.2 `MeasureInput` — the neutral measurement profile

```ts
type ReferenceId = 'MFCG' | 'FTG' | 'NG' | 'VG' | 'FM'   // Dwellings stays a research-side note (V03 §7), never a source here
type FeatureKind = 'way'|'block'|'plot'|'building'|'wall'|'tower'|'gate'|'castle'|'square'|'district'|'water'|'river'|'pier'|'green'|'field'|'tree'
  | 'closure'|'enclosure'   // item 106: a natural edge closing a circuit (LineString); the enclosed area (Polygon)
  | 'gallery'|'chamber'     // the underground profile only (layer 'underground'): a system's passages (LineString with widthM) and rooms (Polygon)
  | 'retaining'             // item 110 (a): a retaining wall (LineString), never a `wall`
  | 'raisedSupport'         // item 110 (b): a raised way's pier or abutment footprint (Polygon), never a `building`
  | 'span'                  // item 110 (b): a raised way's span between two supports (Polygon; item 447); read by no metric
                            // an aqueduct has no kind of its own: it is a `way` of class 'aqueduct', raisedKind 'aqueduct' where raised (item 447)
interface MeasureInput {   // one per town or map: §11.1's metric GeoJSON variant with this header in its sidecar
  header: {
    source: 'PLAT' | ReferenceId | 'corpus';
    build: string;                    // our output version; a reference build (§13.5's `referenceBuild`); the corpus adapter's version
    scale: 'metric' | 'relative';     // relative: no metric scale known (NG's vertex captures; a corpus plate without a scale bar)
    unitM?: number;                   // metres per input unit when metric and ≠ 1
    centre: [number, number];         // the settlement centre in input units (the plaza, else the wall ring's centroid, else the building centroid)
    rung?: Rung; population?: number; water?: WaterSetting;
    seedLabel?: string;               // the seed family path that made it (V12 §2.4) — never a place name
    layer?: 'surface' | 'underground'; // absent = surface; underground inputs exist only for our towns (below)
    frame?: string;                   // corpus: the sample frame (V12 §2.9)
    options?: Record<string, number | boolean> };   // a reference's generation options, numbers and flags only
  features: MeasureFeature[] }
interface MeasureFeature {
  kind: FeatureKind; id: string /* opaque, file-local */; geometry: Geometry /* GeoJSON geometry in input units; rings are closed on read */;
  props: {
    class?: string;       // closed vocabularies: way 'arterial'|'street'|'lane'|'alley'|'track'|'aqueduct'|'unknown' ('aqueduct': item 447's
                          // channel, read by no way graph, V12 §3.4.2); wall 'curtain'|'castle';
                          // water 'sea'|'river'|'lake' (our ponds, an oasis's spring-fed water among them, item 111, write 'lake');
                          // square 'plaza'|'market'|'other'; building: a class family key of V11 §3.4 or 'unknown';
                          // gate 'land'|'water'; closure J-VI.3's six barrier kinds 'shore'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte' (item 447);
                          // gallery and chamber: the system's `UndergroundSystem.kind` (§2.7, with item 109's 'ruin'), a cavern's fissure variant as 'cavern'
    state?: string;       // gallery and chamber: the part's closure state (§2.7's states) or 'unexcavated' (item 109 (j) (2)); a decayed ruin part keeps its state
    widthM?: number; storeys?: number; heightM?: number;
    district?: string;    // the id of the district feature it lies in
    use?: string;         // a class family key, for the siting statistics (V12 §3.6); a corpus map's trades mapped research-side
    prosperity?: number;  // PLAT only: the field's value at the feature (§4.5), 3 decimals
    part?: number;        // ways (item 110 (b)): 0 the ground, ≥ 1 a raised arena part (§3.4); absent reads 0
    raisedKind?: 'viaduct' | 'elevated' | 'aqueduct';     // a raised way's LineString only (item 447; its supports and spans carry none)
    source?: 'generated' | 'declared';                    // raised ways: derived at read (item 244) — declared by T4 or a skeleton file, else
                                                          // generated; the dossier declares no arches (V06 §3.19.1)
    reason?: 'drop' | 'link' | 'water';                   // a generated raised way's recorded reason (item 110 (b))
    onDeck?: 'mole' | 'pier' | 'quay' | 'bridge';         // plots and buildings standing on a deck face (item 110 (d))
    stair?: boolean; ramp?: boolean;                      // way segments that cross a retaining wall, and a raised way's ends
    stepMinCm?: number; stepMaxCm?: number } }            // retaining walls: the least and the greatest step along the whole wall, over its
                                                          // exported runs (item 447; merged on read, below)
```

**Our way classes in the profile.** `measureInputOf` maps §2's `WayClass` once: `through` and `primary` → `arterial`;
`secondary` → `street`; `lane` and `cul_de_sac` → `lane`; `alley` → `alley`; `track` and `path` → `track`; `bridge` and `ford`
take the class of the way they carry; `quay` and `pier` are not ways for these metrics (`pier` features stay); `aqueduct`
stays `aqueduct`, mapped into no traffic class, so an aqueduct's channel enters no way graph and no way-distance statistic
(V12 §3.4.2's reading rules; item 447 exports it as its way's LineString). A reference adapter maps its own classes (V12
§3.2.2); a class it cannot map is `unknown`, which no class-specific metric reads. An oasis (§2.3; item 111) is a pond or
lake with a spring and enters the profile as `lake` water, so every water metric reads it as water.

`MeasureInput` carries no name, no label text, no colour and no style: a reference's district names, a corpus map's place
names and every drawn word stay research-side (J-V12.2). For our towns `measureInputOf(doc, opts)` builds it from the
model in memory; T-V12-4 holds it equal to the metric GeoJSON export read back — `use`, `district` and `prosperity`
included, which the metric variant carries, and item 110's kinds and properties (items 447, 575). **One reading rule**
keeps that equality exact: the profile declares a subset of item 447's properties, and the reader drops every exported
property the profile does not declare — `deckMinCm`, `deckMaxCm` and `underuseSince` on a raised way; `way`, `key` and
`state` on a support; `use` and `state` on a span (item 244's span use is no class family key); `wall`, `run`,
`highSide`, `material` and `state` on a retaining wall; `condition` on a wall (item 575); `deck` and `tiers` on a plot or
building — so the model-side builder never writes them and no `geo` metric reads them (the `raised.*`, `retaining.*` and
`tier.*` metrics that need them are `model` metrics and read the records).

**Runs merged on read** (J-V12.68). Item 447 exports a retaining wall as one LineString per run of equal state, and item
575 splits §11.1's wall LineStrings per run of equal condition. The reader merges them back before any metric runs: the
`retaining` features carrying one `wall` id become one feature, their runs joined in `run` order (a closed wall's ring
closed), with `stepMinCm` and `stepMaxCm` the least and the greatest over its runs; the `wall` features carrying one
enceinte's `id` (§11.1's `id`, the entity's address — a run has none of its own, a `StretchRef` being never stored, item
575) that join end to end become one feature per **built stretch**, a maximal part of the trace between closure edges,
in trace order; each merged feature keeps its entity's `id`. `wall`, `run`, `state` and `condition` are then dropped by
the rule above: a condition or a state is no measurement input, so a breached, dismantled or landfall-buried stretch
measures as the built stretch it is part of, and a run boundary is never a stretch end. `measureInputOf` writes the same —
one `retaining` feature per retaining wall, one `wall` feature per built stretch, whatever their states and conditions —
so T-V12-4's equality holds on a town whose walls a decline, a landfall or a hand edit has struck.

**Item 110's entities** (item 447, one export text for both variants, J-VI.18; J-V12.62). A raised way's ways carry `part` ≥ 1 with `raisedKind`, `source` and
`reason`; an aqueduct is its way — a `way` LineString of class `aqueduct` with `raisedKind: 'aqueduct'`, never a kind of
its own; a raised way's supports are `raisedSupport` polygons and its spans `span` polygons, which no metric reads; a
retaining wall is one `retaining` line with `stepMinCm` and `stepMaxCm`; the way segments crossing one carry `stair` or
`ramp`; deck buildings are `building` features with `onDeck`; a stepped building's `heightM` is the top of its stack
(V02's heights envelope). No founding rung rides in the profile: `raised.generatedBelowCity` is a `model` metric and reads
the founding epoch's record (V12 §3.4.2; item 244 stores none). The reading rules that keep every existing metric exact
are V12 §3.4.2's preamble.

**The enclosure (item 106).** A wall metric reads the outermost *enclosure*: the `enclosure` polygon where the source gives
one — ours from the export of an enceinte closed by `ring`, `shore` or `barrier` (item 447), a corpus plan's drawn circuit
— else the outermost `wall` ring of class `curtain`. `wall` features are the built stretches only (after the merge
above); `closure` features are the natural edges that close the circuit (item 106 (a)) and are never counted as wall
length, as tower stretches or as gates. The MFCG adapter splits its exported city ring the same way (V12 §3.2.2), so a
shore-closed MFCG city and a cliff-closed town of ours are measured by one rule.

**The underground profile (items 109, 113).** `undergroundInputOf(doc, systemId)` writes one underground system of our
model — its galleries as `gallery` LineStrings with their widths, its chambers as `chamber` Polygons, each with its system
kind and state, every part in every state (a ruin's collapsed and filled parts included, so its plan is measured as laid;
a buried former settlement, item 113 (c), as the `ruin` system V04 §3.5.5 lays) — in `MeasureInput` form with
`header.layer: 'underground'`, the flag `options.sharedAxis` when a ruin took item 109 (c)'s shared-axis chance, and
`header.centre` at the system's centroid. The same geometry code that measures a town then measures a ruin's plan or a
cavern. It exists only for our towns — no reference and no corpus plate has an underground — and never crosses the
firewall. **A chamber's monument is not a chamber** (V04's `Chamber.monument`, item 110 (c)): its tiers are written as
`building` features of the underground layer with `props.class` the monument's row, and no plan metric (`plan.*`,
`ruin.blockArea`, `grid.*`) reads a `building` of that layer (T-V12-33). The excavation reading (`unexcavated`,
`accessible`, `lost`; V04 §2.2) is no profile property: the `exactStates` bar reads it on the model (V12 §3.6b).

### 2.3 The baselines file

```ts
interface BaselinesFile {   // plat/packages/testkit/baselines/baselines.json — the one file the parity CLI reads (§13.5)
  schema: 'plat.baselines/2';
  metricsVersion: string;     // the metrics.json version its rows were computed with
  pins: ReferencePin[];       // the gating build per reference (V12 §3.8)
  rows: Baseline[];           // §13.5's rows, their fields from `metricVersion` on this volume's (item 496); append-only: a row is superseded, never deleted
  crossings: CrossingRecord[] }
interface ReferencePin { reference: ReferenceId; build: string; since: string /* milestone */ }
interface CrossingRecord {  // one per commit that changes the file (V12 §3.3)
  date: string; seat: string; checker: string; added: string[]; superseded: string[];
  checks: { id: 'C1'|'C2'|'C3'|'C4'|'C5'|'C6'|'C7'|'C8'|'C9'|'C10'; pass: true }[]; scanVersion: string; fileHash: Hash128 }
```

A row's `reference` is a `ReferenceId` or a salted corpus id (`corpus:frame:<id>`, `corpus:map:<16 hex>`, V12 §3.10.2);
its `sample` names its seed family and, for an unseeded reference, its captures in capture order, and lists in `failed`
every plan index that could not be captured after V12 §3.12's retries — never silently skipped; its `estimator` says how
p10 and p90 were formed (V12 §3.5.1). `ftg-captures.json`, `ng-counts.json` and every panel file of §13.6 (9) cross by the
same check (V12 §3.3); a volume's reference counts (V02's Fantasy Manor counts, V07's VG counts) are ordinary `Baseline`
rows of input `counts`.

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

| family label (+ path) | reduce | priority | count per setting | consumer | check vector (V12 §12) |
|---|---|---|---|---|---|
| `bref/<ref>/<rung>/<water>/<i>` | u32 | 0 | nightly 20 · milestone 100 | our side of every parity row (V12 §3.5) | `bref/MFCG/TOWN/none/0` → 1738244370 |
| `golden/<rung>/<water>/<i>` | u32 | 1 | 12 | the golden suite (§13.3; item 491) | `golden/CITY/river/11` → 639553850 |
| `known/<id>` | u32 | 1 | 1 per fixture | the known-city fixtures (V12 §3.14) | `known/K1` → 3403473561; `known/K2` → 3205843448 |
| `bcity/<rung>/<water>/<i>` | u32 | 2 | 1 000 (B-CITY-lite: i < 50) | B-CITY (§13.2; item 491) | `bcity/TOWN/none/0` → 104466889 |
| `capture/<ref>/<size or template>/<options>/<i>` | parkMiller (MFCG, NG, VG); u32 otherwise | 3 | MFCG 10 per matched size; NG 5 per template; VG per V07 | the capture plan (V12 §3.2) | `capture/MFCG/40/plain/0` → 2003595629 |
| `tune/<run>/train/<rung>/<water>/<i>` and `…/holdout/…`; `…/guard/TOWN/<water>/<i>` (the TOWN guard of a run touching raised-way rows, V12 §3.7.4) | u32 | 4 | 30 each | tuning and corpus runs (V12 §3.7) | `tune/2026-09-28-example/train/CITY/none/0` → 1236353098; `tune/2026-09-28-example/guard/TOWN/none/0` → 2478365614 |
| `null/<spec>/<rung>/<water>/<i>`; the confirmation family `null/<spec>/<rung>/<water>/c1/<i>` (V12 §3.6) | u32 | 5 | 50; c1: 100 | the correlation harness (V12 §3.6) and the pooled bars of V12 §3.6b on settings B-CITY lacks (fixture sites, custom-chain fixtures, arid sites) | `null/T71-3/CITY/none/0` → 1233256533; `null/T71-3/CITY/none/c1/0` → 338389334; `null/T110b.viaduct/CITY/none/0` → 4261915227 |
| `sweep/<spec>/<level>/<i>`; for an `exactMonotone` or `exactStates` bar `sweep/<spec>/any/<i>` (one seed shared by every level and step) | u32 | 5 | per rule (V12 §3.6b) | the sweep and step-script bars (V12 §3.6b) | `sweep/T109-a.relief/mountainous/0` → 4027728537; `sweep/T109-j5.access/TOWN/0` → 649597841; `sweep/T109k6.extent/any/0` → 1148414874; `sweep/T110b.elevated.prosperity/w0.1/0` → 4196945930 |
| `d5…` (§13.6 (2)), `d5-fm/<panel>/<i>`, `d5-vg/<panel>/<rung>/<tags>/<i>`, `d5/M-CAL/<rung>/<water>/<i>` (a later run's `d5/M-CAL/<layer>/<rung>/<water>/<i>`, V12 §3.10.1) | as §13.6 | — | per panel | panels (V12 §3.9) | `d5/M-CAL/TOWN/none/0` → 1899492655 |

A family is prefix-stable (the first n seeds never change when a tier draws more), so B-CITY-lite is B-CITY's prefix and
the nightly's `bref` seeds are the milestone's first twenty. The pooled siting bars that V11 states on "≥ 200 B-CITY seeds
per rung" read B-CITY's nightly towns — generated each night anyway (§13.8) — and pay only for their permutations
(J-V12.40); `null/…` families remain for the settings B-CITY lacks. The check vectors are
`docs/validation/bench/v12_rev_h32.out` (the script `v12_h32_vectors.py`, whose SMHasher value and the base's `d5` vectors
reproduce); the new specs' families (`T111-*`, `T113-5`) take their seeds by the same formula, their vectors computed by
the same script when they are registered (T-V12-16).

### 2.5 Calibration runs (tuning against a reference, a threshold fallback, or the corpus)

```ts
type CellRef = { table: TableId; rowKey: string; column: string; band?: string /* the band row of a band-keyed cell (§4.5) */ }
interface CalibrationRun {   // §13.9's record (item 503); plat/calibration/runs/<id>.json
  id: string;                          // 'cal/<milestone>/<slug>/<n>', fixed before the run (it salts the train and holdout families)
  kind: 'reference' | 'fallback' | 'corpus';
  source: { reference: ReferenceId; build: string } | { fallback: string /* register entry id */ }
        | { corpus: { adapter: string; version: string; frames: string[]; maps: number } };
  cells: { ref: CellRef; lo: number; hi: number; step: number; from: number;   // lo, hi inside the column's range and at or above an owner-stamped calibration minimum (V12 §3.7.2 (5))
    layer: 'inPlace' | { pack: string } /* 'historical:<frame>': every corpus change, V12 §3.10.3 R1; item 382 */
         | { preset: 'FM' | 'VG' | 'NG' } /* the cell's presets.FM, presets.VG or presets.NG entry, one a register entry names: a 'reference' run against that preset's own
                                             reference, or a 'fallback' run applying that entry's own pre-decided fallback — V12 §3.7.2 (3); J-V12.63, J-V12.67 */ }[];
  objective: { targets: { metric: MetricId; rung: Rung | 'building' | 'hood' | 'village'; preset: PresetArm; baselineIds: string[]; weight: number }[];
               guards: GuardSet };
  search: SearchSpec;
  seeds: { perSetting: 30; settings: { rung: Rung; water: WaterSetting; population: number; preset: PresetArm }[] };   // families tune/<id>/train and tune/<id>/holdout
  budgetCpuH: number;                  // default 2; hard stop
  evaluations: { values: number[]; score: number; guardFlips: string[]; report: Hash128 }[];   // every candidate, in evaluation order
  chosen: number[] | null;
  holdout: ParityReport | null;
  status: 'accepted' | 'rejected' | 'fallback-applied' | 'aborted-budget' | 'refused';
  refusal?: { cell: CellRef; rule: string };   // V12 §3.7.2, §3.10.3
  changes: { ref: CellRef; from: unknown; to: unknown; evidence: string[] }[];   // §13.9's field; evidence = baseline ids + this run's id
  before: ParityReport; after: ParityReport | null /* the gate seeds, from the nightly after the release */;
  shifts: string[];                    // ShiftRecord ids with cause { kind: 'calibration', ref: id }
  date: string; seat: string }
type SearchSpec =
  | { kind: 'grid'; values: number[][] /* ≤ 16 candidates */ }
  | { kind: 'golden'; maxIter: number /* one cell; ≤ 12 */ }
  | { kind: 'coordinate'; rounds: number /* ≤ 3 */; maxIterPerCell: number /* ≤ 8 */ /* ≤ 4 cells */ }
interface GuardSet { parityRows: 'allPassing'; cBars: true; ownerRuleBars: true; frozen: string[] /* register entries that must not move */;
  fixtureSuites: ('B-DOSSIER-lite' | 'ownerRuleHooks' | 'K1' | 'K2')[];   // run once on the chosen candidate before the holdout decision (V12 §3.7.5)
  townGuard: boolean }   // true when any cell is a raised-way row: 30 TOWN towns on tune/<id>/guard/TOWN/… join the guard evaluation (V12 §3.7.4)
```

### 2.6 The calibration register

```ts
interface CalibrationEntry {   // plat/calibration/register.json — one per provisional number of the design
  id: string;                  // 'cal.<table>.<rowKey>.<column>' | 'thr.<letter>' | 'band.<metric>.<rung>'; a preset entry's entry adds '@FM', '@VG' or '@NG'
  target: { cell: CellRef; preset?: 'FM' | 'VG' | 'NG' } | { threshold: string /* a §13.7 letter */ } | { band: { metric: MetricId; rung: string } }
        | { column: { table: TableId; column: string; rows?: string /* a row-key glob; absent = every row */; preset?: 'FM' | 'VG' | 'NG' } };
                               // column: one entry for a column family (V12 §3.11); preset: that preset's entry of the cell or column (a measured-rate
                               // cell awaiting its reference run), never its default (V12 §3.7.2 (3)); V01 holds no provisional NG entry
                               // (V01 §3.15, J-V1.98), so no '…@NG' id exists until a volume states one
  owner: 'base' | 'V01' | 'V02' | 'V03' | 'V04' | 'V05' | 'V06' | 'V07' | 'V08' | 'V09' | 'V10' | 'V11' | 'V12';
  metric: MetricId[];          // what measures it — one or more: catalogue ids (V12 §3.4.2) or members of the families `siting.<spec>`,
                               // `bar.<barId>` and `frame.<table>.<column>` (V12 §2.1)
  method: 'measure' | 'tune' | 'panel' | 'corpus';
                               // 'measure' — confirmed by the metrics it names at its due milestone's exit (V12 §3.11's *Milestone exits*);
                               // 'tune' — set by a `reference` run against the entry's own reference when it falls due (V12 §3.7.1 (c)), the accepted
                               // run's value its confirmation and a rejected run applying the entry's fallback (V12 §3.7.5); where the owning volume
                               // states it (V07 §3.15), the run opens only when the entry's metric misses its band at the due milestone, the entry
                               // otherwise confirmed at its value with a history row and no run; 'panel' — a rated pass of its panel (below);
                               // 'corpus' — the corpus stage at M-CAL (V12 §3.10), or at the later corpus run `M-CAL/<layer>` that takes a column
                               // first landed after M-CAL's record (V12 §3.10.1)
  due: string;                 // the milestone that confirms it, in V12 §2.8's form; a corpus due is a `CorpusRunId` (V12 §2.9) by V12 §3.11's *The due's corpus run*
  fallback: { mechanism: string /* one sentence: what moves, from the owning section */; notAchieved: boolean /* moving the threshold itself = not achieved, §13.7 */ };
  status: 'provisional' | 'confirmed' | 'fallback-applied' | 'not-achieved' | 'owner-set' | 'fixed';
  line?: 'default';            // present only on an entry V12 §3.11's default line wrote (`plat calibrate register --defaults`): the lint holds its
                               // method, due, metric and fallback to that line's, and a later named line for its column restates it in place,
                               // dropping the field; absent = a named line's entry
  panel?: { id: string; group?: string /* a SOLO group inside the sitting: 'M4-110' */; question: 'legibility' | 'realism' | 'charm' | 'reads' };   // method 'panel' only (a staged entry's: its current stage's)
  stages?: { method: 'measure' | 'tune' | 'panel' | 'corpus'; due: string;   // a line of several stages, in the line's order (V12 §3.11's *Staged entries*)
             panel?: { id: string; group?: string; question: 'legibility' | 'realism' | 'charm' | 'reads' };   // a `panel` stage's panel
             metric?: MetricId[];   // the members of `metric` this stage reads; absent: every member but the `frame.*` ones at a non-`corpus` stage,
                                    // the `frame.*` members at a `corpus` stage
             possibility?: true     // a `corpus` stage read as E1's reachability rows and E4's checks only (V12 §3.10.4), never a frame run's value target
           }[];                     // written only when the line names more than one stage; absent: one stage, the entry's own method, due and panel.
                                    // On a staged entry `method`, `due` and `panel` hold the current stage's — the first with no passing row, the first at
                                    // writing, and once the entry leaves `provisional` the stage it confirmed or closed at
  history: { date: string; value: unknown; run?: string; panel?: string; milestone?: string; cells?: true;
             stage?: { index: number /* into `stages` */; outcome: 'pass' | 'fail' | 'unrated' };   // a staged entry's exit or sitting row
             held?: true;           // a held row, value null: the owning seat's tuning its change's golden check refused (V12 §3.11 (1), `--hold`)
             trial?: { record: string; finding: string } }[] }   // a trial row, value null: a game-master finding naming this entry's cell (V12 §2.14)
```

**The `cells` marker.** A history row with `cells: true` is a cells row: its value is the target's compiled cells by row
key. Cells rows are written by `--defaults`' first row; a named entry's first row (its writing seat writes it with the
target's compiled cells — a preset entry's excepted); the moved-value and rows-added rows (V12 §3.11 (2), (2′)); a later
line's restating row; a pick's row whose release moves the target's cells in place (V12 §3.9.5: the next table version, a
declared shift; J-V12.83), its value the released cells by row key; and a run's row where the run changed the target in
place (V12 §3.7.6 step 5: the cells after the run). No cells marker sits on a metrics row (a milestone exit's readings, a
corpus run's `frame.*` reading), a panel's row, a pick's row that moves no cell, a held, trial or status row, or a pack or
preset run's row (its cells are not the column's compiled cells).

One knob has one entry and one column: the register check fails when two entries, or two compiled columns, name one
mechanism under different names (a cell's default and its `FM`, `VG` or `NG` entry are two knobs, told apart by `preset`);
the crypt join and the catacomb growth cap each have one column, V04's `CatacombRule.cryptJoin` and
`CatacombRule.growthCapShare` (the latter read per year over the span, J-V6.53).

A `panel` entry is confirmed by a rated pass of its panel on the question it names. While that panel is unrated the entry
stays `provisional` and its exit row reads *provisional — not rated*: it never fails an exit and never lets its gate be
claimed (§13.6 (7)'s rule, carried into the register).

### 2.7 The correlation harness

```ts
type ClassSelector = { classes?: string[]; families?: string[]; tags?: string[] }   // V11 §2.3's keys
type StatSpec =
  | { kind: 'meanDistTo'; to: ClassSelector | 'market' | 'gate' | 'quay' | 'water' | 'wall'; agg?: 'mean' | 'median' }   // metres along the way graph; 'median' where the owner states it (T-V11-12)
  | { kind: 'shareWithin'; to: ClassSelector | 'market' | 'gate' | 'quay'; radiusM: number }     // member-on-indicator share: the pooled route
  | { kind: 'servedShare'; unit?: 'coverage' | 'district' }   // the share of the subject class's coverage units holding ≥ 1 member, each unit as
                                                       // V11 §2.3 defines it at a plot (V12 §3.6); 'coverage' (the default) reads the class's
                                                       // compiled profile.coverage, its district unit every district; 'district' forces the
                                                       // district unit for item 105 (k)'s dispersal reading, which alone counts only districts of
                                                       // ≥ 30 households (T-V11-18; J-V12.60); one class per spec; null scope 'town' only
  | { kind: 'nnSameKind' }                             // median nearest same-class distance; null scope 'town' only
  | { kind: 'downstreamShare' } | { kind: 'downwindShare' }   // share of members downstream / downwind of the median household: the pooled route
  | { kind: 'prestigeShare' }                          // share on prime frontages (item 71's definition, T71-3): the pooled route
  | { kind: 'flowOrder'; chain: string }               // share of chains whose resource lies farther from the market than the seller (item 104 (h) (8))
  | { kind: 'chainSpread'; chain?: string }            // item 104 (g): the mean way distance between a chain instance's in-town nodes
  | { kind: 'meanDistToPartners'; role: 'dominantOutputConsumers' | 'providers' | 'inputs' | 'demand' }   // item 105 (k)
type NullPass =
  | { kind: 'rank'; townShare: number /* 0.70 */; medianU: number /* 0.60 */ }                // the default for every statistic but the pooled ones
  | { kind: 'pooledExact'; alpha: number /* 0.01 */; minShift?: number /* a share the pooled observed must also exceed the null mean by */ }   // shareWithin, downstreamShare, downwindShare, prestigeShare
  | { kind: 'margin'; value: number /* median over towns of S_obs − mean S_k, in the statistic's unit: T71-3's 0.15 */ }
  | { kind: 'holm'; family: string; alpha: number /* 0.01 */ }   // an owning volume's clauses Holm-corrected together (V11's T-V11-12): each spec's p is its rank or pooled p
interface NullModelSpec {
  id: string;                                          // the bar id: 'T71-3', 'T103-e.tannery-downstream', 'T105-k.shared-provider' …
  owner: 'base' | 'V01' | 'V02' | 'V03' | 'V04' | 'V05' | 'V06' | 'V07' | 'V08' | 'V09' | 'V10' | 'V11' | 'V12';
  ownerBar?: string;                                   // the owning volume's bar id when it states the rule ('T-V11-12'); its statement wins (J-V12.48)
  subject: ClassSelector; statistic: StatSpec;
  null: { scope: 'block' | 'district' | 'town'; eligible: 'hardNeeds' | 'sameSizeClass' | 'anyPlot'; permutations: number /* K = 20 */ };
  expect: 'lower' | 'higher';
  pass: NullPass;                                      // default: 'pooledExact' for the member-on-plot shares, 'rank' otherwise (J-V12.12)
  towns: { source: 'bcity'; perRung: number /* 200 when the owner says so, else 50 */ } | { source: 'null'; perSetting: number /* 50 */ };
  seeds: { settings: { rung: Rung; water: WaterSetting; preset: PresetArm }[] };
  applies: { requires?: ('river' | 'coast' | 'walls' | 'customChain' | 'islands')[]; minMembers: number /* default 1 on the pooled route, 3 on the rank route */ };
  variant?: { distance: 'way' | 'euclid'; eligible: 'hardNeeds' | 'anyPlot'; subjects: 'plots' | 'buildingsWithUse' } }   // corpus comparisons only (V12 §3.10.5)
interface NullModelResult { spec: string; setting: string; towns: number; skipped: number;
  share: number /* towns with u > 0.5 */; medianU: number; pooled?: { observed: number; nullMean: number; p: number };
  verdict: 'pass' | 'suspect' | 'fail' | 'insufficient';   // 'suspect': run 1 failed and the confirmation is pending or passed (V12 §3.6)
  confirmation?: { family: string; towns: number; pass: boolean };
  perSeed: { seed: string; obs: number; nullMean: number; lt: number; eq: number; u: number }[] }
```

Registration refuses: a `servedShare` or `nnSameKind` spec at a scope other than `town` (a district or block permutation
conserves them exactly); a `servedShare` spec whose subject is not exactly one class (a "per coverage class" bar registers
one spec per class, id `<bar>.<class>`), whose class has no coverage row under `unit: 'coverage'`, or whose class's unit is
`settlement` (the town holds a member or not, and a permutation conserves it: that class's coverage is T-V11-13's roster
clause, reported `notApplicable` in the bar); a pooled-route spec whose pooled null share over its first 50 towns exceeds
0.85 (below 0.02 for `expect: 'lower'`) — the headroom lint: at that base share no rule can see a pull (executed: power ≤
0.09 at a 0.3 pull, `critique_v12_pooled_exact.out`), so the owner restates the indicator (a tighter radius) or states its
complement.

### 2.7b Share, sweep, paired, two-sample and step-script bars

The other shapes a tendency or property bar takes in file g — "in most placements", "at or above the floor", "at the
ranked share", "at every rung", "rises with", "higher with than without", "rising monotonically", "differ from", "beat the
baseline", "within tolerance of the base's", "lost on closing and restored on reopening" — each get one typed rule, run by
`plat statbar` (V12 §3.6b).

```ts
type Indicator =                                          // one yes / no per instance, read from the bench statistics and the explain query's link list
  | { kind: 'flowOrder' }                                 // item 104 (h) (8): a chain instance's resource node farther from the principal market than its final seller
  | { kind: 'withinComfort' }                             // items 104 (h) (8), 107 (g): a consumer–provider link's way distance ≤ its good's comfortM
  | { kind: 'voidAccessible' }                            // item 109 (j) (3), (3b): a cavern or ruin system with an access point, direct or through linked systems
  | { kind: 'voidSealedDeep' }                            // item 109 (j) (5): per DEEP VOID — a connected component of a cavern or ruin system's parts whose
                                                          // tops lie deeper than DigRule.reachM below every footprint over them — sealed when no access reaches it
  | { kind: 'ruinChosen' }                                // item 109 (i): an undercity whose first void source is a ruin, among undercities where a ruin and a cavern both qualify
  | { kind: 'present'; system: 'cavern' | 'ruin' }        // item 109 (a), (j) (1): the settlement's site holds at least one such system
  | { kind: 'raised'; raisedKind: 'viaduct' | 'elevated' | 'aqueduct'; source: 'generated' }   // item 110 (b): the town holds ≥ 1 such generated way
  | { kind: 'walkWater' }                                 // item 111 (d): per household, its dwelling plot's access point lies within the walking coverage radius
                                                          // of V11's water-supply family (that family's `walk` unit `per`, V11 §2.3) of the nearest water — a water
                                                          // body's shore (an oasis included, §2.3), a well, a fountain or a cistern of that family
  | { kind: 'waterPresent'; water: 'river' | 'lake' | 'coast' }   // item 111 (d): the site holds at least one such water (S0–S1; an oasis is not a lake here)
  | { kind: 'richNearWater' }                             // item 111 (d): per town, the richest occupied band's households' mean way distance to the nearest water
                                                          // (as walkWater reads it) below the middle band's (§4.5's band set; a town lacking either band skips)
type Quantity = 'ladder.members' | 'catacomb.extentM2' | 'catacomb.fill' | 'catacomb.growthM2'   // V12 §3.4.2's model metrics, per record
type Step = 'epoch' | 'regenerate' | { rederive: StageId } | { newRandom: 'system' } | 'upgradeReplay' | { dossierEvent: string } | 'extendGrowth'
  | { access: 'seal' | 'caveIn' | 'brick' | 'reopen' | 'dig' | 'excavate' | 'demolishAbove'; target: string /* a link, access or building the fixture names */ }
  | 'undo' | 'saveReload'                                 // the access steps are §7.1's events and ops on links, accesses and buildings (§7.3 item 9 (d)); exactStates only
interface Level { id: string /* 'mountainous', 'TOWN', 'x1.5', 'w0.9', 'arid' */; rung: Rung; water: WaterSetting; preset: PresetArm;
  site?: Record<string, string | number | boolean>;       // a fixture site override: relief class, geology, mining, a ravine across the frame, a forced ruin or cavern source, a climate row
  dossier?: string;                                       // a fixture id of the frozen manifest (V12 §1b's dossier table), a derived one '<dossier>@pop×k' included
  intent?: { wealthLevel?: number };                      // a T1 `intend` input (§7.7): the settlement-level prosperity of item 110 (b)'s trend
  populationScale?: number; epochs?: number;              // a population sweep's factor; a growth history's epochs (V06's engine, once it lands)
  requires?: string }                                     // the volume whose generator the level needs ('V07'): notApplicable until it has landed
type Rule =
  | { kind: 'most'; indicator: Indicator; share: number /* 2/3; an owner's 0.70, 0.75, 0.80 */; minEffective: number /* 100 effective instances */; minTowns: number /* 20 */;
      townClause: { minInstances: number /* 3 */; share: number /* 0.70 of those towns at ≥ 1/2 */ } }
  | { kind: 'floor'; indicator: Indicator; floor: number | CellRef; alpha: number /* 0.01, one-sided */; minEffective: number /* 100 */; minTowns: number /* 20 */; perTownCap: number /* 3 */ }
  | { kind: 'rate'; indicator: Indicator; value: number | CellRef | { derived: 'ruinShare' | 'cavernChance' };
      tolerance: { kind: 'exact'; alpha: number /* 0.01, two-sided */ } | { kind: 'se'; k: number /* V04's 3 */ }; minInstances: number /* 200 */ }
  | { kind: 'presence'; indicator: Indicator; chance: number | CellRef | { derived: 'cavernChance' } /* the design chance per town at each level */ }
  | { kind: 'trend'; indicator: Indicator; perLevel: number; bins?: { by: 'buildingsOver'; edges: number[] /* [0, 1, 3, 6, 11, 21] */; minPerBin: number /* 20 */ } }
  | { kind: 'higherWith'; indicator: Indicator; factor: { key: string; with: string | number | boolean; without: string | number | boolean }; perCell: number /* 200 */ }
  | { kind: 'exactMonotone'; quantity: Quantity; where?: 'stagnant' /* fill: only across steps where the record's blockedBy is non-empty and its extent held */;
      identity: 'record' /* compared per record key: a CatacombComplex's id (its source lineage), a ladder record's id; a record present at a step is present at the next */;
      sequence: { kind: 'levels' } | { kind: 'steps'; script: Step[] /* author edits never appear in a script */ }; fixtures: string[] }
  | { kind: 'exactBound'; quantity: 'catacomb.growthM2'; bound: 'cap' /* per record and step: ≤ max(extent × ((1 + growthCapShare)^years − 1), growthFloorM2) */; fixtures: string[] }
  | { kind: 'exactStates'; reading: 'excavation';          // item 113 (e): V04's excavation reading per cluster (V04 §2.2), keyed by the cluster's lowest element id
      script: { step: Step; expect: { cluster: string /* a cluster the fixture names */; reading: 'unexcavated' | 'accessible' | 'lost'; dwellings: 'none' | 'some' }[] }[];
      fixtures: string[] }                                // author edits allowed: the reading answers to the author's access edits as to every derivation
  | { kind: 'paired'; measures: PairedMeasure[]; eachShare: number /* 0.70 */; minDiffering: number /* 2 */; minSeeds: number /* 50 */ }
  | { kind: 'twoSample'; a: 'ruin'; b: 'cavern'; metrics: MetricId[]; expect: 'higher'; minEach: number /* 30 systems */ }
  | { kind: 'noRegression'; statistic: StatSpec; subject: ClassSelector; off: { ref: CellRef; value: unknown }[] /* the reference arm's overlay: the owning volume's named off form, each cell at its in-range off value (105 (k): V11 §3.7.4's web off form) */; tolerance: number | CellRef }
interface PairedMeasure {   // a ruin's laid plan (a) against the town above within its outline (b), per seed
  metric: 'ruin.blockArea' | 'grid.r4' | 'grid.axis';
  differs: { kind: 'logRatio'; atLeast: number /* ln 1.5 */ } | { kind: 'absDiff'; atLeast: number /* 0.15 */ } | { kind: 'axisDeg'; atLeast: number /* 10 */; skipWhen: 'sharedAxis' } }
interface StatBarSpec {
  id: string;                    // the bar id as §13.2 or the owning volume names it: 'T104h8.flow', 'T109i.relief', 'T109j5.deep', 'T110b.viaduct', 'T111-1' …
  owner: 'base' | 'V01' | 'V02' | 'V03' | 'V04' | 'V05' | 'V06' | 'V07' | 'V08' | 'V09' | 'V10' | 'V11' | 'V12';
  ownerBar?: string;             // the owning volume's bar id ('T-V4-54'); its stated parameters win (J-V12.48)
  rule: Rule;
  levels: Level[];               // ordered for 'trend' and 'exactMonotone' levels; strata for 'higherWith'; the pooled settings otherwise
  seeds: { perLevel: number; max: number /* drawn in steps of 50 up to max until the rule's minimum is met */ };
  stopAfter?: StageId;           // regenerate only up to the stage that settles the indicator, by the golden tooling's stage isolation (V12 §3.7.7)
  applies: { requires?: ('river' | 'coast' | 'walls' | 'customChain' | 'islands' | 'underground' | 'arid')[] };
  fallback: string }             // one sentence from the owning volume: what moves when the bar fails (V12 §3.6b's default otherwise)
interface StatBarResult { spec: string; verdict: 'pass' | 'suspect' | 'fail' | 'insufficient' | 'notApplicable'; towns: number; skipped: number;
  instances: number; effective?: number /* instances ÷ the design effect (V12 §3.6b) */;
  statistic: number;             // the rule's test value: the pooled share, the z, the exact p, the separation
  perLevel?: { level: string; n: number; y: number; notApplicable?: string }[]; perSeed?: { seed: string; values: number[] }[];
  violations?: { record: string; step: string; before: number | string; after: number | string }[] }   // exactMonotone, exactBound and exactStates
```

### 2.8 Panels and sittings

```ts
interface PanelSpec {   // @plat/testkit/panels — one per panel, registered by the owner of its gate
  id: string;           // the milestone id: 'M1', 'M2b', 'M4', 'M5', 'M6', 'V-M4', 'M-CAL' and a later corpus run's 'M-CAL/<layer>' (V12 §2.9's CorpusRunId);
                        // a volume's phase: 'V3-P6', 'V4-U5', 'M6-sky', 'V6-E7'
  gate: string;         // what a rated pass lets the milestone claim ("the base at parity", "mastered", …), or 'diagnostic'
  groups: PanelGroup[]; questions: ('legibility' | 'realism' | 'charm' | 'reads')[];
  subject?: string;     // the plain words 'reads' asks about ("a floating patch"); required when 'reads' is asked
  strips: string[];     // §13.7 letters shown as threshold strips (§13.6 (8))
  extras: ('house' | 'labels' | 'ladderStreet' | 'palette')[];
  passRule: { perGroup: 'all' | 'rung' | 'template' | 'frame' | 'class' | 'none' /* 'none': a descriptive set, never a gate */ }
             // ⌈2n / 3⌉ better-or-same per group and question, never worse on every pair of a subgroup (§13.6 (6));
             // a SOLO group passes a question with ⌈2n / 3⌉ Yes and no subgroup answered No on every item
  minutes: number;      // its estimated rating time with its extras, as V12 §6's sitting row registers it and re-estimated from the recorded session
                        // times of every sitting sat; the batch rule of V12 §3.9.1 sums it
  render: PanelRender }
interface PanelGroup { reference: 'MFCG' | 'FTG' | 'NG' | 'FM' | 'VG' | 'DW' | 'AB' | 'SOLO'; formula: string /* the seed label pattern */; count: number; preset: PresetArm;
  id?: string /* a named group inside a panel: 'M4-110' */; items?: string[] /* a SOLO group's fixed items: a fixture id or a forcing-site level id */ }
// 'DW': Dwellings plan images, research-side, one side of a plan pair (V03's panel; never a baselines.json source); 'AB': two recipes of ours,
// blind; 'SOLO': one render of ours per item, rated Yes / No per question where no reference and no second recipe exists (V04's panel)
interface PanelRender { widthPx: 1600; heightPx: 1200; framing: 'walledPlus10' | 'overview' | 'hood' | 'building' | 'village' | 'plan' | 'underground' | 'island';
  mPerPx: 'matched'; labels: false; furniture: false; light: 'fixedSun'; stripMetadata: true }
type D5PairStaged =     // the five variants §13.6's `D5Pair` closes with (item 500)
  | { reference: 'FM'; i: number; refCapture: string; platSeed: string; cls: string }                                    // V02 §7.5
  | { reference: 'VG'; rung: 'THORP'|'HAMLET'|'VILLAGE'; tags: string; i: number; refSeed: string; platSeed: string }       // V07 §8
  | { reference: 'DW'; i: number; refCapture: string; platSeed: string; cls: string; band: string }                        // V03 §8, P6
  | { reference: 'AB'; purpose: 'reconcile' | 'history'; rung: Rung; water: WaterSetting; i: number; platSeed: string;
      a: string; b: string /* each a recipe: output version, preset, and the layer or epoch it differs by */ }              // V12 §3.10.6; V06 §12
  | { reference: 'SOLO'; rung: Rung; i: number; platSeed: string; recipe: string /* output version, preset, mode */ }     // V04 §7
interface AnswersFile {   // exported by the sitting page; after the reveal it crosses with key.json into plat/goldens/d5/<panel>/ by V12 §3.3 (item 535), where `plat d5 verdict` reads it
  panel: string; commitment: Hash128; sessions: { started: string; ended: string }[];
  answers: { pair: number; question: 'legibility' | 'realism' | 'charm' | 'reads'; answer: 'left' | 'right' | 'same' | 'yes' | 'no' /* yes / no: a SOLO item */; note?: string }[];
  strips: { letter: string; picked: 'A' | 'B' | 'C' | 'same' }[]; house?: 'A' | 'B' | 'C'; ladder?: { seed: string; reads: boolean }[] }
// §13.6 (9)'s D5Record holds these answers and verdicts; §13.3's MilestoneRecord holds a list of panels per milestone and the register's
// statuses in its exit rows (items 500, 493).
```

The owner's free-text `note`s stay research-side: `answers.json` crosses with each note replaced by its H128 hash, so the
record keeps that a note was written without carrying a word the scanner would have to judge (C3; J-V12.53).

**Milestone ids** (J-V12.78). Every milestone id this volume's records and commands carry — a `PanelSpec.id`, a register
entry's `due` and a history row's `milestone`, `--defaults --milestone <id>`, a `MilestoneRecord`'s id — is
volume-qualified, so no two volumes' steps share one: a base milestone by its §16 id (M-1, M0, M1, M2a, M2b, M3a, M3b, M3c,
M4, M4b, M5, M6; the staged rows M6-U, M6-sky, M6-E, M6-P, M-CAL, M-SF); volume 2's and volume 7's milestones by the ids
their build plans give (`M3a-V2`, `M6a` – `M6c`; `V-M0` – `V-M4`, `V-M2u`); a volume's step that its build plan names by
a bare letter and number by its volume's prefix `V<n>-`: `V3-P0` – `V3-P6` (volume 3's PE is built inside M2b and M3a and
takes their ids), `V4-U0` – `V4-U5` with `V4-U3b`, `V5-P0` – `V5-P6`, `V6-E0` – `V6-E9`; and a corpus run by V12 §2.9's
`CorpusRunId`. **A volume's own register lines** name their steps by that volume's id, which the seat writing an entry
puts into its `due`, its stages' dues (V12 §2.6) and `--milestone` in this form: V06 §8's steps as `V6-E<n>` — a line's
exit step in `--milestone`, its `due` as V06 §8 states it; V04 §8's U-steps as `V4-U0` – `V4-U5` and `V4-U3b`; "at U5" in
V02 §3.10.10 and V11 §8 as `V4-U5`, and V02 §3.10.10's crypt line's "from the landing of volume 4's access draw" as
`V4-U3b` (V04 §8's access step). Volume 11's content steps C0 – C8 are built inside §16's milestones and take their ids
(V11 §8's *where in §16*): C0 `M0`, C1 `M1`, C2 `M2b`, C3 and C3b `M3a`, C4's wall rows `M2b` (its SettlementForge rows
are not calibratable, V11 §3.1), C5 `M2b` for its O13-core part and `M3b` for the rest, C6 `M4`, C7 `M4b`, C8 `M6-U` — so
no `V11-` id exists, and a C8 column landing after M-CAL's record dates to `M-CAL/under`, never `M-CAL/V11-C8`. Item 110's
raised ways are built at `M3a` (items 244, 290), so no separate raised-way milestone exists. The lint refuses any other
form of due (V12 §3.11's *The provisional-number lint*).

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
interface FramesFile {      // plat/calibration/reconciliation/frames.json — each frame's declaration crosses by V12 §3.3 BEFORE any row of it (C8)
  frames: { id: string; rule: string; n: number; era: string; region: string; declared: string; digest: string }[] }
type CorpusRunId = 'M-CAL' | 'M-CAL/under' | 'M-CAL/sky' | 'M-CAL/evolution' | `M-CAL/${string}`
                   // 'M-CAL' — the first run (V12 §3.10.1); 'M-CAL/<layer>' — the later run of the same process for the columns whose first
                   // compiled cell landed after M-CAL's record was committed: the layer of the landing milestone by V12 §3.11's *The due's
                   // corpus run* — 'M-CAL/M6-P' for the plan rung's M6-P and V3-P0 – V3-P6 — or that milestone's own id for any other (J-V12.75)
interface ReconciliationRecord {   // plat/calibration/reconciliation/<id>.json, the id's '/' written '-' ('M-CAL-under.json')
  id: CorpusRunId; opened: { by: 'owner'; date: string; words: string };
  adapter: { id: string; version: string; maps: number; excludedHoldout: number; excludedDigest: string };
  frames: { id: string; n: number; rule: string; declared: string; digest: string; crossing: string /* the CrossingRecord that carried it */ }[];
  runs: string[];                                       // CalibrationRun ids, kind 'corpus'
  refused: { target: string; rule: 'R1'|'R2'|'R3'|'R4'|'R5'|'R6'|'E1'|'E2'|'E3'|'E4'|'E5'; reason: string }[];
  ownerExcluded: { target: string; rule: string /* the owner-rule item and part, '109 (k) (2)' */; evidence: string /* a salted id */ }[];   // R6: an owner question, never a layer cell or a known defect
  reachability: { metric: MetricId; value: number; reachable: boolean; setting?: string; by?: 'declaration' }[];   // possibility evidence (V12 §3.10.4)
  floorsHeld: { cell: string; corpusValue: number; held: number; rule: string }[];   // an owner-stamped calibration minimum a corpus run met (V12 §3.10.3 R6)
  panel: CorpusRunId | null /* its sitting, the run's own id; null for a later run that moved no cell (V12 §3.10.1) */;
  decisions: { frame: string; decision: 'default' | 'selectable' | 'pending-owner' }[];   // adoption is per frame (V12 §3.10.6)
  palette: { mismatch: boolean; ours?: Record<string, [number, number]>; ownerPick?: 'released' | 'remeasured' } }
```

### 2.10 Provenance evidence and the owner's stamps (item 381)

§7.6's cell provenance carries this volume's two optional fields; their meaning, the compiler that carries them and the
**pinning hash** that excludes the whole provenance block (so rewording or adding evidence never moves an output version)
are §7.6's (item 381; V11 §3.2.1 step 7 computes the hash so). This volume fills them:
* `evidence` — the **ids** of the baseline rows, the `CalibrationRun`, the panel (`d5:<panel>`) or the M-1 record that
  set the value; ids only, never sentences.
* `ownerRule` — the owner-rule item and part a cell encodes (`'109 (k) (1)'`, `'110 (b)'`): the catacomb TOWN gate, the
  cemetery-only source list, the cathedral's `always` crypt, the underground's any-tier existence, the dossier's primacy
  rows, the `raisedWays` rung gate (V11's schema admits no row below CITY), and the owner-stamped **calibration minima** of
  the CITY and METROPOLIS raised-way chances and caps (their values V11 §3.24.2's row 80, J-V12.42). V11's compiler stamps
  it from the owner-rule rows and writes the stamped-clause list the register check reads (V11 §3.2.1; J-VI.10). A stamped cell is
  never a run's cell (V12 §3.7.2 (2)) nor an E1 or E4 target (V12 §3.10.3 R6); a stamped calibration minimum binds every
  run, fallback and corpus pack — never the parity presets' extension zeros (item 23), a no-op pin's overlay or a user's
  own override (everything is editable).

```ts
interface EvidenceFile {   // dist/evidence.json — written by V11's compiler beside the tables from the register, the runs and the panels (≤ 200 kB, V12 §6)
  entries: Record<string /* CalibrationEntry.id */, {
    method: 'measure' | 'tune' | 'panel' | 'corpus'; due: string;
    against: string;       // plain words: the reference, the frame or "our own bar <id>" the entry's metrics compare with
    history: { date: string; milestone?: string; what: string /* plain: "confirmed at M2b", "tuned against FTG", "held: a committed golden reads it" */ }[];   // its last three rows
    rows: number }>;       // every history row the register holds for it
  cells: Record<string /* '<table>/<rowKey>/<column>', a band-keyed cell adding '/<band>' */, {
    status: 'provisional' | 'confirmed' | 'fallback applied' | 'not achieved' | 'owner-set' | 'fixed' | 'owner';   // the register's plain word; 'owner' for a stamped cell
    lines: string[];       // one plain sentence per cited evidence id, from each run's or panel's `plain` summary
                           // ("tuned so organic lanes turn as much as FTG's streets per 100 m")
    entry?: string;        // the entry that covers the cell (by its cell, its column or the default line)
    ownerRule?: string }> }
```

It ships with the tables, so the tables editor's cell inspector (V09 §4.14) and the clerk's provenance answer (V10 §2.13)
show a value's status, what it is measured against, its due milestone and its latest history without reading
`plat/calibration/` (V12 §4.4; wiring W-IF-04, W-IF-05).

### 2.11 Lifecycle of every record

The one table of every record's producer and consumers (E-35): the "create" column is the producer, the "read" column
every consumer.

| record | create (producer) | read (consumers) | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `MetricDef` and `metrics.json` | authored in code with its catalogue row (`@plat/testkit/metrics`); the families by `plat build` | `plat measure`, `plat parity`, the crossing check (C6), `plat calibrate`, the research side's row writer, the docs pages, release-note sentences | `metrics.json` in `dist/` | rebuilt by `plat build` | a code revert; a major bump re-measures its baselines (V12 §3.4.3) | a definition change is a major version, never an edit in place |
| `MeasureInput` | the research adapters (references), `measureInputOf` (ours), the corpus adapter at M-CAL | `plat measure` (every `geo` metric) | research side: `research/baselines/inputs/<ref>/<build>/`; ours: in memory, or a golden fixture | re-derived from its capture or document at will | — (derived) | re-written when the profile's version bumps |
| `Baseline` row (V12 §2.3) | `rows.py` over `plat baselines aggregate`, through the crossing | the band arithmetic (V12 §3.5), `plat parity`, the crossing check C6–C9, tuning targets (V12 §3.7), corpus runs (V12 §3.10) | `baselines.json` | never re-computed in place: a new metric version or build adds a row that `supersedes` it | supersession (append-only) | `schema` bump with a converter in `plat baselines check --migrate` |
| `ReferencePin` | the baseline seat at M-1; the drift watch at a milestone boundary (V12 §3.8) | `plat parity` (the gating build), drift handling | `baselines.json` | — | a pin change back is a new declared baseline shift | — |
| `CrossingRecord` | the baseline seat with the checker's countersignature (V12 §3.3) | the checker's audit; C8 (a frame's crossing before its rows); `ReconciliationRecord.frames[].crossing` | `baselines.json`, and beside every other crossed file | — (a fact) | — | read by schema version |
| `ParityReport` | `plat parity` | `MilestoneRecord.parity`; `CalibrationRun.before` / `after` / holdout; the dashboard; `history.jsonl`; release notes; the `bar.<barId>` history rows | `plat/goldens/parity/` (milestone), CI artifacts (nightly) | a re-run gives the same bytes on the same inputs (V12 §3.13) | — (a report is a fact) | read by schema version |
| `CalibrationRun` | `plat calibrate run` | V11's compiler (table source edits and evidence ids), `ShiftRecord`s with cause `calibration`, the register's history, release notes, `ReconciliationRecord.runs` | `plat/calibration/runs/` | re-running its spec reproduces every evaluation (T-V12-8) | a revert run restoring `from` values, itself declared | read by schema version |
| `CalibrationEntry` (`register.json`) | the seat landing a volume's constant, or §13.7's letter; the default line's by `plat calibrate register --defaults --milestone <id>`; history rows by runs, panels, exits, M-1, the moved-value, rows-added, held and trial rows (V12 §3.11, §2.14) | `MilestoneRecord.exitCriteria`; release notes; the register report (V12 §5.2); `dist/evidence.json` (→ the tables editor's cell inspector, V09 §4.14; the clerk's provenance answer, V10 §2.13); the docs | `register.json` | statuses recomputed from `history` by `plat calibrate register --check` (V12 §3.11's lint and *A value moved by its owning seat before its due*) | a history row is appended, never removed; a later named line restates a default entry in place (`line` dropped) | an entry without `line` reads as a named line's; a history row without `cells` as a metrics, panel or status row; an entry without `stages` as single-stage; a row without `stage`, `held` or `trial` as before |
| `NullModelSpec`, `StatBarSpec`, `BenchBarDef` and their results | the bar's owner registers the spec; results by `plat nullmodel`, `plat statbar` and the bench bar's `run` | `plat parity` (their report rows), the register (the `bar.<barId>` rows, V12 §2.1), `known-defects.json` | spec in code; results in the report | a re-run gives the same bytes | — | a spec change is a new spec id version |
| `PanelSpec`, `seeds.json`, `D5Record` | registered in code; `plat d5 seeds`; `plat d5 verdict` | the sitting, `MilestoneRecord.d5`, the register's `panel` stages, release notes | `plat/goldens/d5/<panel>/` | seeds from formulas; renders re-rendered under the current output version when re-offered (§13.6 (7)) | a new sitting is a new record; answers are never edited | — |
| `AnswersFile`, `CorpusMapMeta`, `SampleFrame` | the sitting page; the adapter seat | `plat d5 verdict` (answers, after crossing); the corpus runs (through rows only); frame rows' `evidence` and `frameN`; the evidence gate | research side only (`answers.json` crosses hashed) | — | — | — |
| `FramesFile` | the adapter seat, before measurement | C8; `ReconciliationRecord.frames` | `plat/calibration/reconciliation/frames.json` | — (a declaration is a fact) | a superseding frame is a new id | — |
| `ReconciliationRecord` | the M-CAL calibration seat, for M-CAL and each later run `M-CAL/<layer>` (V12 §3.10.1) | `MilestoneRecord` of its id; the register's corpus dues (V12 §3.11); release notes; the owner's reconciliation report (V12 §5.5); T-V12-25 | `plat/calibration/reconciliation/` | — | a revert release restores the previous tables (a declared shift) | — |
| `evidence` ids, `ownerRule` stamps, `dist/evidence.json` (`EvidenceFile`) | accepted runs, panel picks and M-1 records (ids); V11's compiler from the owner-rule rows (stamps); the compiler from the register and the runs (the file) | V11's compiler; the tables editor's cell inspector and preset dialog (V09); the clerk (V10); M4's provenance audit; the run spec check (V12 §3.7.2 (2)); R6 and E1/E4 (V12 §3.10.3–§3.10.4); the register check | ids and stamps in the shipped tables (outside the pinning hash); sentences, statuses and entry summaries in `dist/evidence.json` | recompiled with the tables | with the value it explains | optional fields: absent reads as none |
| the historical pack `historical:<frame>` | accepted corpus runs of its frame | §7.6's expansion (packs slot) for documents whose era and region match; the preset dialog's "historical (<era>, <region>)" entries (V09); the recipe's pinned pack version | a versioned pack table in `@plat/tables`, pinned in each recipe by id, version and hash (§2.9) | the recipe replays its pinned pack version | §7.6's apply is one undo step | a document pinning a retired version replays it under §6.4's retention; a revert release ships a new pack version, never an edit |
| `KnownCityFixture` | its seats at M3a (K1's inputs from T101-6's fixture) | the structure engine: T-V12-36; the guards; the M4-110 group; V03's B-PLAN; V01's T-V1-54; V04's T-V4-62 – T-V4-70; V10's evaluation group A | inputs `plat/tests/fixtures/known-city/<id>/`; golden `plat/goldens/known/<id>/` | from its skeleton and seed | a revert commit | its digest re-recorded only by a declared shift that names it (item 492) |
| `NoOpPin` and its off-state sets | at registration; the sets at a family's landing or switch-on (V12 §3.7.8) | CI (the landing gate, the nightly suites); the switch-on bumps | `plat/goldens/noop/<id>/o<k>/` | the suites under the overlay | — | re-recorded only by another cause's declared shift with matching stage lists (V12 §3.7.8) |
| `TrialFinding` (V12 §2.14) | the trial seat (V09 §7.6) inside `GmTrialRecord`; its `route` at intake by `plat calibrate trial` | the register's trial rows; `known-defects.json`; the owner's report; T112-2's evidence | inside V09's `GmTrialRecord` (V09 §7.6) | — (a finding is a fact) | a superseding intake writes a new record | read by schema version |
| `history.jsonl` | `plat parity` | the dashboard's sparkline | `plat/goldens/parity/history.jsonl`, pruned to 60 nights | appended per run | — | read by schema version |
| `known-defects.json` entries this volume opens | failing bars, unreachable values, withdrawn M-1 rows, routed trial findings | release notes, milestone exits (`MilestoneRecord.knownDefects`) | §13.3's file | — | closed, never deleted, by the run or report that clears it (`MilestoneRecord.knownDefects.closed`) | — |

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
  digest: Hash128; failed: { id: string; what: string; found: string }[]; extras: string[] /* generated extras reported, never failed */ }
```

### 2.13 The no-op pins (V12 §3.7.8)

```ts
interface NoOpPin {                       // @plat/testkit/noop; test-side
  id: string;                             // 'item<n>.<family>', one per row of V12 §3.7.8's pin table
  bar: string;                            // the base bar it pins (§13.2): 'T102-1', 'T103-3', 'T105-4', 'T106-5', 'T107-4', 'T109-6', 'T110-7', 'T111-5', 'T113-7'
  overlay: { ref: CellRef; value: unknown }[]; // the family's off form: each cell and its value as its home states it (V11 §3.24.0's switch table for item 110;
                                               // V11 §3.7.4's web off form for items 105 and 107; the cells the bar names otherwise) — copied by the build, stated nowhere here
  suites: { suite: string; owner: string; test?: string /* the owner's pin test */ }[];   // registered by their owners (V12 §3.7.8)
  switchedOn?: string;                    // the output version whose landing or switch-on bump recorded the off-state set; absent before it
  store: string }                         // plat/goldens/noop/<id>/o<k>/ — the off-state digests per output version
```

### 2.14 The game-master trial's findings (item 112 (b))

The trial — ten to twenty SettlementForge game masters, each using the map on their own settlements for at least two
sessions of play before the public release — is run by V09 (V09 §7.6: recruitment through SettlementForge's community,
the sessions, the report, held as its `GmTrialRecord`) and gated by §16's release gate (T112-2). Its findings enter this
volume's calibration record and the fix list in one typed form, which `GmTrialRecord.findings` holds:

```ts
interface TrialFinding {
  id: string;                 // 'gm/<trial>/<n>'
  area: 'look' | 'legibility' | 'colour' | 'realism' | 'tool' | 'content' | 'performance' | 'dossier';
  what: string;               // one plain sentence in our words: no participant's name, no settlement's name, no quotation (the participants' own words
                              // stay outside `plat/`, crossing hashed as a sitting's notes do, V12 §2.8)
  sessions: number;           // how many sessions reported it (≥ 1)
  severity: 'blocker' | 'major' | 'minor';
  cells?: CellRef[];          // the table cells it names when it names a value ("streets too winding" → the heading cells); each must exist
  route?: { to: 'register'; entries: string[] } | { to: 'knownDefects'; entry: string } | { to: 'owner'; question: string } }   // written at intake
```

**Intake** (`plat calibrate trial <record>`, run by the calibration seat once V09's report is committed). Each finding is
routed by one rule, in order: (1) a finding whose `cells` name a cell an `ownerRule` stamp covers, or whose `what`
contradicts an OWNER RULE item, goes to the owner as a question with the recommendation "keep the rule" (as R6's, V12
§3.10.3), never into a table; (2) a finding with `cells` appends one trial row `{ date, value: null, trial: { record,
finding } }` to every register entry covering those cells — status, due and cells unchanged; a `provisional` entry reads
it at its due as evidence beside its metrics, a closed entry is listed in the register report as "questioned by the
trial", and its cells move only by its line's method (a run, a panel's stated second value) or under a new major table
version restating it (V12 §4.2); (3) every finding not routed by (1), and every finding of severity `blocker` or `major`
whatever (2) wrote, opens one `known-defects.json` entry naming the finding's id — the fix list the release notes print
(§13.3); (4) a `colour` finding naming a legend pair the style check passed (T112-1) is a (3) entry against that style
family, fixed by the family's swatch or second cue (a style-version change, §6.4), and a second (3) entry against the
style check's threshold `cvd.minDeltaE2000` — not calibratable (V11 §3.1, row 52), so it takes no register entry and is
re-set only by an authoring table version of row 52 with a declared style-version shift (V12 §3.11's style line), never
lowered. The intake writes each finding's `route`; T-V12-44 fails a record
with an unrouted finding, a `cells` ref that resolves to no cell, a trial row naming no finding, or a routed finding whose
target (entry, known defect, question) is missing, and T112-2's exit evidence is the intake's output hash.

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
 corpus (M-CAL only): adapter → MeasureInput → plat measure   │  corpus runs (same engine) ─→ reconciled preset layer
   → frame rows  ═══ numbers only ════════════════════════════> baselines.json (corpus rows)  → sitting M-CAL → release
```

The product never reads the research side; the research side may run the product's released CLI (§13.3's "research may
read the product; the product never reads research"). Every arrow that crosses is a numbers-only file passing V12 §3.3.

### 3.2 The capture-and-measure loop (research side)

**3.2.1 The capture plan.** Before a capture session, `research/baselines/plan.py` writes `research/baselines/plan.json`:
for each reference, each matched setting and each index i, the seed `seedOf('capture/<ref>/<size or template>/<options>',
[i])` (V12 §2.4) and the options string. A row may only be built from a plan's indices [0, n) (crossing check C7), so the
seeds are fixed by formula before anything is seen and a disappointing seed cannot be dropped. MFCG, NG and VG seeds are
reduced into their MINSTD state range (§13.6 (2)); FTG cannot be seeded, so its plan lists capture slots in capture order
(§13.6 (2)); Fantasy Manor's 41 captured buildings are its sample as recorded (V02 §7.4). The plan at M-1:

| reference | settings | per setting | cost | note |
|---|---|---|---|---|
| MFCG (build 12710731) | sizes 40 / 80 / 130 with §13.5's plain options; size 80 with river and coast (stress, descriptive) | 10 plain (J-V12.3); 5 stress | ≈ 35 exports × ≈ 7 s wall | one URL load per export (`captures/mfcg/exports-2026-09-25/README.md`, *How export was triggered*); JSON, SVG and screenshot per seed |
| FTG (server of the capture date) | BIG_TOWN and BIG_CITY; one capture with water options nearest `none`, two nearest `coast+river` (§13.6 (2)) | 3 | six days on the free daily allowance | each capture's resident count recorded for §13.6 (2) |
| NG 1.2.2 | `medium`, templates area / street / square / ring | 5 | the vertex-capture sessions of `docs/CONFIDENCE.md` §6 #2 | relative scale |
| VG 1.6.9 | V07 §7's tag sets | V07's counts | V07's recordings | item 495 |
| Fantasy Manor 1.0.0 (build 890) | the free frame | 41 buildings (as captured) | none new | counts only (V02 §7.4) |

The MFCG stress settings exist at size 80 only, so B-REF runs no MFCG `coast+river` town at TOWN or METROPOLIS (no
baseline row exists there); the M1 panel's MFCG `coast+river` pairs take their own exports per rung (V12 §3.9.1), which
feed no row. The panels' reference identifiers — Fantasy Manor capture ids (`fm-captures.json`), Dwellings capture ids
(`dw-captures.json`) and VG seeds with their tags (`vg-seeds.json`), numbers and ids only — are written research-side by
`plan.py` and cross by V12 §3.3 into `plat/goldens/d5/<panel>/`, where `plat d5 seeds` reads them (item 535).

**3.2.2 Adapters to `MeasureInput`.** One research-side script per reference, `research/baselines/adapters/<ref>.py`,
writes `research/baselines/inputs/<ref>/<build>/<capture>.metric.geojson` with its header (V12 §2.2). What each maps:

* **MFCG** — the JSON export is already in metres (the sweep README's *Units*; `unitM` absent). Each exported road
  becomes a way of class `arterial`; each footprint and prism a building of class `unknown`; the first wall polygon the
  city's enclosure and curtain, the second the castle curtain and a `castle` feature from its ring; gates are the city
  ring's vertices touching a road vertex, less those shared with the castle ring (class `land`); the district, square,
  green and field polygons, the river centrelines (with the file's river width), the pier segments and the sea polygon
  map to our kinds of the same meaning. **The shore split (item 106).** A coastal city's exported ring follows the
  shoreline where the drawn wall is an open chain (the exports README's review note 2): ring edges whose two vertices lie
  on the sea polygon's boundary within 0.5 m become `closure` features of class `shore`, the rest stays the curtain, and
  the ring stays the enclosure, so `walled.share` reads exactly what it read before; the ring vertex on a river
  centreline is a gate of class `water`. Towers are the castle ring's non-gate vertices plus the city ring's vertices that
  are neither a gate (land or water), nor castle-shared, nor inside a shore closure (a vertex both of whose ring edges are
  closure edges), so the shore-end posts keep theirs — on the four dry cities the README's counts, on the recorded
  coastal city its derivation's 20 (the arithmetic CONFIRMED there, the end posts PLAUSIBLE). Lanes are not exported, so
  the lane-level metrics read the derived street graph (V12 §3.4.1).
* **FTG** — the decoded payload's road graph with its classes mapped main → `arterial`, district → `street`, suburb →
  `lane`; footprints; wall chains and tower points; fields; water outlines; centimetres to metres. No plots (the client
  receives none, item 49).
* **NG** — blocks, lots (NG's own parcels) and building polygons from the vertex captures, `scale: 'relative'`; the
  bent-cut traces are not re-derived here: the signature's reference values are the recorded measurements of §13.5's
  bent-cut row, entered as `trace` rows.
* **VG** — V07 §7's features from its recordings; **Fantasy Manor** — no geometry, a `counts` file.

**3.2.3 Measuring, with one implementation.** At M-1 no product exists, so the M-1 seats measure with research-side scripts
written from V12 §3.4's definitions (the red-team scripts of `docs/validation/bench/README.md` are their starting point).
From M1 the product's `plat measure` is the one implementation: the research side re-runs every baseline through the
released CLI on the same `MeasureInput` files, and T-V12-3 holds the two within each metric's `tolerance`; where they
differ beyond it, the seat finds which definition is wrong, and the product's value replaces the M-1 row as a superseding
row with a declared `baselineShift` (§13.3) whose note names the metric (J-V12.1). A render metric (recoverability) keeps
§16 M-1's cross-check within 0.01 on M1's golden renders. T-V12-3 and T-V12-6 read captures, so they are **research-side
checks** (`research/baselines/check_t3.py`, `check_t6.py`, running the released CLI): their verdicts reach
`MilestoneRecord.exitCriteria` as evidence strings naming the check's output hash, and nothing under `plat/` reads a
capture (§17.1 (3); T-V12-28).

**3.2.4 Writing rows.** `plat measure` writes per-seed values; `plat baselines aggregate` (product code, run research-side)
forms each row's `values` by V12 §3.5.1's estimator and, for distribution rows, `spreadKS`; `rows.py` adds the provenance
of §13.5 (`referenceBuild`, `capture`, `script`, `date`), the `sample` block, the role from the metric's row in §13.5 or
the owning volume, and writes the candidate file. `script` and `capture` are written as `research:`-prefixed labels
(`research:baselines/adapters/mfcg.py`), opaque strings the product never resolves (V12 §3.3 C2; J-V12.24).

### 3.3 The crossing — how numbers, and only numbers, enter `plat/`

`plat baselines check <file> [--previous <committed file>]` runs on every candidate numbers-only file before it is
committed — `baselines.json`, `ftg-captures.json`, `ng-counts.json`, `fm-captures.json`, `dw-captures.json`,
`vg-seeds.json`, a panel's `answers.json` and `key.json` after the reveal, and the corpus's `frames.json` (§17.1 (4)'s list,
item 535); until M1 its research-side twin `research/baselines/cross_check.py` applies the same rules, and M1's first run of
the product check re-validates the M-1 file (T-V12-1).

| check | rule | on failure |
|---|---|---|
| C1 schema | the file parses under its zod schema (`plat.baselines/2`, §13.6 (9)'s types) | refused, naming the path |
| C2 strings | every string matches its field's pattern, the fields listed by name: `id`, `metric`, `supersedes` `^[a-z0-9.:/@+_-]{1,120}$`; `sample.family`, `sample.captures[]`, a panel file's seed labels and reference ids `^[A-Za-z0-9.:/@+_-]{1,120}$` (the seed families are upper-case: `capture/MFCG/40/plain`); builds `^[A-Za-z0-9._:+-]{1,64}$`; dates ISO 8601; `capture` a capture folder name (`^\d{4}-\d{2}-\d{2}T[\d-]{8}$`) or a `research:` label; `script` a `research:` label `^research:[a-z0-9_./-]{1,160}$`; any other string field refused | refused, naming the field |
| C3 notes | a `note` is ≤ 200 characters of letters, digits, spaces and `.,;:()-/%±≤≥×` and passes the clean-room scanner | refused |
| C4 colours | no six-hex-digit sequence anywhere in the file | refused |
| C5 numbers | every number finite; every unit in `MetricUnit` (V12 §2.1) | refused |
| C6 metrics | every `metric` exists in `metrics.json` at the row's `metricVersion` | refused |
| C7 samples | `sample.family` is a registered `capture/…` family and `indices` start at 0; an FTG row's `captures` equal the capture plan's slots in order; a panel file's FM, DW and VG references are the plan's, in its order | refused |
| C8 corpus | a corpus row's reference is `corpus:frame:<id>` or `corpus:map:<16 hex>`; `evidence` present; a *target* row is a frame row with `frameN` ≥ 20 and `evidence: 'surveyed'`; a frame row's frame is in `frames.json` by a `CrossingRecord` EARLIER than the row's, with equal `n` and digest; no other string of corpus origin | refused |
| C9 append-only | against the previous committed file, no row is removed or changed; a replaced row is kept and named by the new row's `supersedes` | refused |
| C10 scan | the clean-room scanner (§17.1 (5)) over the whole file: 0 hits | refused |

A passing file is committed by the **baseline seat** (research tier) and countersigned by a **checker seat** that reads
only the candidate file, the check's output and `metrics.json` — never the captures — appending a `CrossingRecord` (V12
§2.3). What never crosses, whatever the check says: images, geometry, names, colours, a reference's option names beyond
numbers and flags, any corpus string other than our D-2 preset keys (J-V12.2).

### 3.4 The metric suite

**3.4.1 Two derived features for sources that lack them.** MFCG exports no blocks and no lanes; a corpus plate may show
buildings only. So that one definition runs on every source, `plat measure` derives, from footprints alone:
* **cluster blocks** — footprints whose rings lie within `g` of each other join one cluster (`g` = 1.0 m on a metric
  input, 2 % of the median footprint's short side on a relative one); a cluster block's outline is the union of its
  footprints closed by a dilation then erosion of 3 m (metric) or 10 % of that short side (relative);
* **the derived street graph** — inside the outermost curtain (or the built area's outline where there is none), the
  complement of the cluster blocks, reduced to its straight skeleton (§3.8's kernel skeleton), spurs shorter than 8 m
  (metric) or 40 % of the median short side (relative) pruned, nodes within 2 m merged.

A metric that reads blocks or lanes on MFCG reads these, and the same metric on our side reads the same derivation from
our footprints — never our true blocks — so the comparison is like with like (`blockc.*`, `sgd.*` below); our true blocks
and ways feed the rows whose reference has them (J-V12.5).

**3.4.2 The catalogue.** Ids, inputs and definitions. Where the base defines a measure, the row cites it; otherwise the
definition here is the one implementation's. `m` = metric scale needed, `f` = scale-free. Every wall row reads the
enclosure of V12 §2.2 (item 106): "inside the outermost curtain" means inside the outermost enclosure, "the curtain ring's
area" is the enclosure's area, along-curtain distances run along built stretches only and never across a closure edge (a
condition run's end is no stretch end: V12 §2.2 merges the runs), and a "main gate" is a gate of class `land` (a water
gate, a harbour-mouth chain included, never counts). The metric ids `lots.*` and `blockc.lotsPer` name the references'
own lots (MFCG's lots drawn as buildings, §13.5; NG's parcels), as §13.5's rows do; our parcels are plots (§2.5).

**Default rules** (a row states its own value only where it differs, and the registry holds the result):
* `absFloor` — shares, ratios and rank statistics 0.02; angles 1°; lengths 2 % and areas 5 % of the reference's median;
  densities (`perHa`, `perKm`) 5 % of it; counts 0.5; Moran's I and Spearman 0.05; entropies 0.05 bits; timings 5 %.
* `sign` — `any` for Moran's I, Spearman, `z` and signed angles; `positive` for everything else (a folded angle is positive).
* Distribution bins (`output.edges`; the KS distance of V12 §3.5.3 runs on the binned CDFs at these fixed edges) — areas
  log-spaced, 24 bins over the metric's range (blocks 50 – 50 000 m²; buildings 10 – 2 000 m²; plots 20 – 5 000 m²) with an
  underflow and an overflow bin; run lengths 5 m bins to 400 m with overflow; nearest-neighbour distances 0.25 m bins to
  30 m with overflow; widths 0.25 m bins to 30 m with overflow.
* `tolerance` — `geo`, `model`, `trace` and `counts`: 1e-9 relative (the same code on the same input); `render`: 0.01
  absolute; the M-1 twin comparison of T-V12-3: 0.5 % relative or one unit of the last printed digit, whichever is larger.
* `stages` — registered StageIds (§4.1) only: ways S3, S4, S5a – S5d and S8; walls, towers, gates, the
  castle, closures and enclosures S3, S4, S5a – S5d; districts and squares S3, S6, S7, S7b; blocks S8, S9; plots S8, S9,
  S10a, S10; buildings S10, S10b, S11; the `water`, `river` and `pier` kinds S1 and S3; the `green`, `field` and `tree`
  kinds S12a – S12b; galleries and chambers the underground stages (II.7); retaining walls S10, S11; raised parts, their
  supports and spans S4 to S6 (viaducts at S4, elevated roads and aqueducts at the end of S6, V11 §3.24). `model` metrics
  name their stages in the row where the row's input differs.
* `costMs` — measured, not designed: `plat build` writes each row's M1-measured cost per CITY town into the registry, and
  V12 §6 budgets the sum; before M1 it is the §6 row's share.
* **Centroids** are area centroids for polygons and the point itself for points, in every metric; the red-team's R4 script
  used vertex means, which T-V12-6's R4 clause absorbs within its 0.02.

**Reading rules for item 110's entities** (item 447): every way graph (`junction.*`, `street.*`, `sgd.*`, V12 §3.6's
way-distance statistics) is built per part — nodes merge only within a part and parts join only at shared ramp-foot
vertices — so a viaduct passing 2 m over a ground node makes no junction; **a way of class `aqueduct` enters no way graph**
and no way-distance statistic (it carries water, not traffic; a raised aqueduct's arches are its supports and spans), and
no class-specific metric reads it; `wall.*`, `gate.count` and `wall.ungated` read `wall` features only, never `retaining`;
`bldg.*`, the cluster blocks, the derived street graph and `fg.*` read `building` features only, never `raisedSupport`,
`span` or `retaining`; no metric reads a `span`; deck buildings are buildings, and the siting statistics read their
`onDeck`; a stepped building's `heightM` is the top of its stack.

| metric id | input | scale | definition | reference(s) | row served |
|---|---|---|---|---|---|
| `street.turn100` | geo | m | ways other than alleys resampled at 10 m arc steps; turning = Σ \|Δheading\| between steps × 100 ÷ length; per seed the length-weighted median over ways ≥ 50 m | FTG; PLAT organic presets | §13.5 street turning |
| `street.stepHist` | geo | m | histogram of \|Δheading\| per 10 m step, 1° bins over 0–45° plus overflow; the cliff clause reads it | FTG (weakness) | street turning |
| `street.entropy50` | geo | m | Shannon entropy in bits of the heading change per 50 m window, 5° bins over 0–90° | FTG (weakness) | street turning |
| `street.drift600` | model | m | §4.4's net turn over 600 m of grown streets, organic regimes | — | growth drift |
| `junction.angles` | geo | f | nodes of degree ≥ 3 after merging nodes within 2 m; each arm's direction 10 m along it; angles between angularly consecutive arms; per seed median and p5 | NG; FTG | junction arm angles |
| `junction.share4` | geo | f | degree-4 nodes ÷ nodes of degree ≥ 3 | NG; FTG | junction arm angles |
| `street.runs` | geo | m | lengths of maximal paths between nodes of degree ≠ 2, per way class; per seed median per class | FTG | street runs by class |
| `lots.r4.60`, `.120`, `.250` | geo | m | each building's axis = its longest ring edge's direction; z = e^{4iθ}; for 1 500 buildings sampled by the metric's stream (all if fewer), R4 = \|mean z\| over buildings whose centroids lie within r of the sample's centroid, samples with ≥ 5 such buildings; per seed median | MFCG | MFCG street signature |
| `lots.wallAlign` | geo | m | buildings inside the outermost curtain, in bands 0–40, 40–100, 100–200 m from it: the angle between the building axis and the nearest curtain segment folded into [0°, 45°]; per band the median and the share ≤ 15° | MFCG | MFCG street signature |
| `sgd.tShare` | geo | f | on the derived street graph, degree-3 nodes with two arms within 20° of straight ÷ degree-3 nodes | MFCG | MFCG street signature |
| `sgd.deadEnds` | geo | m | degree-1 nodes of the derived street graph per km of its length | MFCG | MFCG street signature |
| `blockc.perHa` | geo | m | cluster blocks inside the outermost curtain per walled hectare | MFCG | MFCG street signature |
| `blockc.lotsPer` | geo | f | footprints per cluster block; per seed median | MFCG | MFCG street signature |
| `block.area` | geo | m (f as `block.areaRel`, ÷ median footprint area) | built blocks' areas per district; distribution | NG | blocks |
| `block.countTemplate` | counts | f | built blocks per hood per template at `medium` | NG (V01's T-V1-31) | blocks |
| `block.courtShare` | geo | f | deep blocks — largest inscribed circle's radius > 1.5 × the median footprint's short side — holding an unbuilt interior component (the block less its footprints dilated by 5 % of that short side) of area ≥ 0.5 × the median footprint area that touches no block edge ÷ deep blocks | NG; MFCG | deep block interiors |
| `cut.sigma`, `cut.cornerMid`, `cut.arrival85`, `cut.fillet` | trace | f | §4.6's recorded-frame measures on S8's cut log | NG | bent-cut signature |
| `fg.recoverability` | render | f | §8.5's metric on the city band at the matched scale | MFCG | figure-ground and streetwall |
| `fg.coverWalled` | geo | f | Σ area of footprints whose centroid is inside the outermost curtain ÷ the curtain ring's area | MFCG (descriptive) | figure-ground and streetwall |
| `fg.streetwall` | geo | f | on dense frontages, the share of cluster-block outline length within 0.5 m (metric) or 2 % of the median short side (relative) of a footprint edge | MFCG | figure-ground and streetwall |
| `bldg.area` | geo | m | footprint areas (ours: residential families; references: all buildings); per seed median and p95 | FTG; MFCG (descriptive) | plots and footprints |
| `bldg.quadSide`, `bldg.worstCorner` | geo | m / f | four-vertex footprints' median side; per footprint the largest \|corner − 90°\|, per seed p95 | FTG | plots and footprints |
| `plot.area` | model | m | L3 plot areas per class and band | — | plots and footprints |
| `bldg.partyShare`, `bldg.attached` | geo | f | per footprint the share of its perimeter within 0.3 m (relative: 1 % of its short side) of another footprint's edge, per class median; the share of footprints with any | NG; FTG (descriptive) | party walls and attachment |
| `plot.spearman`, `plot.moran`, `plot.cvDistrict` | model (NG's `plot.moran` on its parcels: geo) | f | Spearman(prosperity, plot area); Moran's I of plot area on the shared-edge adjacency graph with unit weights; within-district CV, districts ≥ 30 plots | NG (weakness) | plot-area gradient |
| `alley.gradient` | model | f | Spearman of alley length per hectare against prosperity decile | FTG (weakness) | alleys |
| `walled.share`, `ribbon.share` | geo | f / m | buildings whose centroid is inside the outermost curtain ÷ all; extramural buildings within 100 m of an arterial ÷ extramural buildings — on any document, a history's epochs included (V06's growth parity) | MFCG | walled share and ribbons |
| `district.area`, `plaza.area`, `castle.area`, `castle.compact` | geo | m / f | per district hectares (per seed median); the principal square's hectares; the castle's hectares; 4πA ÷ P² | MFCG | MFCG anchors |
| `wall.nodeSpacing` | geo | m | along-curtain distance between consecutive wall nodes — towers, gates and vertices where the curtain turns ≥ 10° — p50 | MFCG | MFCG anchors |
| `quarter.count` | geo (references: district features) / model (ours: quarter labels at the city band) | f | the count | MFCG | MFCG anchors; labels |
| `outline.r90cv`, `outline.roadRatio` | geo | f | 36 sectors of 10° about the centre; r90 = the 90th percentile of building-centroid distances in a sector (sectors ≥ 5 buildings); CV of r90 over sectors; mean r90 of sectors whose middle bearing lies within 5° of an arterial's outward bearing where it leaves the built area ÷ the other sectors' mean | FTG | outline anisotropy |
| `usemix.resOnly`, `usemix.entropy`, `usemix.liveIn` | model | f | §13.7's block-level use-mix definitions | — | block-level use mix |
| `wall.towerSpacing`, `wall.ungated`, `gate.count` | geo | m / f / f | along-curtain spacing of consecutive towers, p50; arterial ways crossing a curtain at no gate; main gates of the outermost curtain | FTG; MFCG | towers and gates |
| `water.step`, `water.riverWidth` | geo | m | median vertex spacing of water outlines after dropping vertices turning < 1°; the median river width | FTG; MFCG (descriptive) | water |
| `tree.nnP1`, `tree.nnMedian`, `tree.pcf` | geo | m | nearest-neighbour distances of tree points; the pair-correlation function at 1 … 20 m (Stoyan and Stoyan's estimator, §17.1 (8)) | FTG (weakness); the sampler | tree scatter |
| `pop.perBuilding` | geo / model | f | population ÷ buildings | MFCG (weakness); FTG | population and buildings |
| `time.model`, `time.firstMap`, `time.worst` | timing | — | §12's measures in the timing phase, ÷ the calibration score ratio (§12.1) | MFCG; FTG; NG | generation time; MFCG-worst configurations |
| `delivery.tier`, `ladder.use`, `vacancy.share`, `quay.reach`, `residue.share`, `entrance.frontage`, `hidden.share`, `wealth.*` | model | — | from the core statistics record and the report (§13.2, §5.4) | — / FTG descriptive | the C rows of §13.5 |
| `draw.*`, `label.*` | render / model | — | §8.3's census; §9.4's checks | MFCG; NG | draw style; labels |
| `variety.dispersion` | geo | f | §7.7's signature vector per town, computed from the input where the source has the kinds; standardised by the rung's pooled deviations; mean pairwise Euclidean distance over the seeds | MFCG; FTG (floors) | between-seed variety |
| `market.secondary`, `market.adjacent` | geo | f | market squares beyond the first per town; market-square pairs sharing an edge | MFCG | markets |
| `palette.paperLuma`, `.paperWarmth`, `.inkLuma`, `.inkWarmth`, `.plateChroma` | render | — | §8.2's definitions on §8.2's measurement render | item 69 (owner-set targets) | §13.4 palette bar |
| `fm.*` | counts | f | one metric per row of V02's T-V2-31 table and its plan-extent clause, as V02 states them: nine rows — family shares, path segments, blocks, towers, square towers, dormers per segment, porches, half-round porches, entrances — and the plan extent in wing widths (SP-V2-4) | FM | V02 §7.4 |
| `vg.*` | geo / counts / timing | per V07 | V07 §7's parity metrics | VG | V07 §7 |
| `siting.<spec>` | model (corpus: geo with `use`) | m / f | the correlation harness's placement statistic for one `NullModelSpec` (V12 §3.6) — its bar's verdict statistic is `bar.<spec id>` | the corpus at M-CAL | T71-3; file g's bars |
| `bar.<barId>` | model | f | the verdict statistic of one registered owner bar — a `StatBarSpec`, a `NullModelSpec` or a `BenchBarDef` — generated per registration, no band: its verdict is the bar's own (V12 §2.1) | — (ours) | the register's `measure` entries (V12 §3.11; V02 §3.10.10, V06 §8, V11 §8) |
| `frame.<table>.<column>` | geo | per its target metrics | a declared frame's value for one calibratable column: the frame target rows of the metrics its corpus run targets; `notApplicable` until M-CAL (V12 §2.1) | the corpus at M-CAL | the register's `corpus` entries (V12 §3.11; V11 §8) |
| `wall.barrierShare` | geo | f | closure edge length ÷ the enclosure's perimeter; a town without a curtain is `notApplicable` | MFCG (descriptive: its shore closures); the corpus at M-CAL | item 106's use of natural barriers |
| `grid.r4`, `grid.axis` | geo | f / deg | inside a region (for a paired bar the ruin's outline, V12 §3.6b; otherwise the enclosure), ways or galleries resampled at 10 m steps; z = e^{4iθ} per step weighted by its length ℓ; R = \|Σ ℓ z\| ÷ Σ ℓ; axis = arg(Σ ℓ z) ÷ 4 folded into [0°, 90°); fewer than 20 steps → `notApplicable` | — (ours: a ruin against the town above) | item 109 (c)'s distinctness bar |
| `ruin.blockArea` | geo (underground profile) | m | the faces of the gallery graph — every gallery in every state, nodes within 2 m merged — inside the system's outline, median area; the town side: `block.area`'s built blocks inside the same outline dilated by 25 m steps (at most 100 m) until it holds ≥ 5 blocks, else `notApplicable` | — | item 109 (c)'s distinctness bar |
| `plan.rightAngle`, `plan.straight` | geo (underground profile) | f | on every chamber outline and every gallery's two wall lines (its centreline offset by half its width), vertices turning < 1° dropped: the share of the remaining vertices whose turn lies within 5° of ±90°; the share of wall length in straight runs ≥ 4 m (a run keeps within 2° of its first segment's direction) | — (a ruin against a cavern) | item 109 (i)'s structure test |
| `void.*`, `link.*`, `ladder.members` | model | — | per cavern or ruin system: present by kind, accessible (directly or through linked systems, item 109 (j) (3), (3b)), buildings over it (footprints whose base lies within `DigRule.reachM` above one of its chambers or galleries); per deep void (a connected component of a system's parts whose tops lie deeper than `DigRule.reachM` below every footprint over them): whether an access reaches it; per undercity: its first void source; per cluster: its excavation reading `unexcavated`, `accessible` or `lost` and its dwellings (V04 §2.2's `excavation(doc, cluster)`; item 113 (e)); per derived supply link (item 105 (a)): way distance, the good's `comfortM`, within comfort; per chain instance: flow order and spread; a collective record's member count | — | V12 §2.7b's indicators: items 104 (h) (8), 105 (k), 107 (g), 108 (f), 109 (i)–(j), 113 (e) |
| `crypt.present`, `crypt.areaM2`, `crypt.rank`, `crypt.joined` | model | f / m / f / f | per building of a church class (V11's crypt column `always` or `basement`): whether it holds `Basement.crypt` (V03), per class the share; each crypt's floor area; the crypts ranked by area, and the rank of the cathedral's (or great temple's) crypt, 1 wherever one stands; whether a (3b) link joins the crypt to a catacomb complex (V04's `cryptJoin`) | — | item 109 (k) (2): V11's T-V11-25, V04's T-V4-50 |
| `catacomb.count`, `catacomb.source`, `catacomb.rank` | model | f | complexes per settlement; each complex's source kind (V04's `CatacombComplex.source.kind`); whether the largest by `extentFloorM2` lies under the cemetery that serves the most burials | — | item 109 (k) (3): V04's T-V4-50, V06's T-V6-40 |
| `catacomb.extentM2`, `catacomb.fill`, `catacomb.blockedBy`, `catacomb.growthM2` | model | m / f / — / m | per complex keyed by its id (its source lineage, V04 §3.5.1): `extentFloorM2`, the high-water extent over every gallery and chamber in every closure state — silted, caved-in and sealed parts included, the author-deleted area excluded (J-V4.56); its ossuary `fill` in [0, 1]; its `blockedBy` reasons, reported; the area added at a step, with its cap `max(extent × ((1 + growthCapShare)^years − 1), growthFloorM2)` (V04 §2.3's `CatacombRule`, read per year, J-V6.53) | — | item 109 (k) (4)–(6): V04's T-V4-51, T-V4-52; V06's T-V6-38, T-V6-39 |
| `raised.count`, `raised.generatedBelowCity`, `raised.reasonMissing`, `raised.overCap` | model | f | raised ways by kind × source; generated ways whose founding epoch's rung was below CITY — the rung of the `EpochRecord` of the epoch whose event created the way, read on the model side (item 244 stores none; the profile carries none) — `source` `generated` only, so a declared way never counts and a way carried down from a city epoch counts by that city epoch's rung; generated ways without a recorded reason and its why rows; generated foundings made while the kind's generated, suppressed and declared ways already reach its cap (V06 §3.19.1 (1)–(2)) — the last three 0 by rule | — (ours only, descriptive and C) | item 110 (b), (f): the guards (V12 §3.7.4) |
| `raised.junctions` | geo | f | nodes of degree ≥ 3 joining a part ≥ 1 to part 0 anywhere but a ramp foot; 0 by rule | — | item 110 (f) |
| `retaining.lengthM`, `retaining.onFlatM` | model | m | retaining-wall length by source; generated wall length whose both sides lie below `terrace.slopeMin` — 0 by §13.2's T110-1, reported in the nightly statistics, never a harness row | — | item 110 (a), (f) |
| `deck.buildings`, `tier.count` | geo / model | f | buildings with `onDeck` by deck kind; per stepped building its tier count | — | item 110 (c), (d) |
| `crossing.kinds` | model | f | per way class, the crossings of a retaining wall by kind — ramp or stair (the way segments' `stair` and `ramp` flags) — and the count of `W_STEEP_RAMP` reports (V11 §3.24.5); stages S4, S5a – S5d, S9 and the levelling (J-V12.64) | — (ours only, descriptive) | the `ways.crossing` register line (V12 §3.11); the M4-110 group's report |
| `water.needRatio` | model | f | per town at the aqueduct reason's test: the demand D, the supply S and `needRatio` (V11 §3.24.6), and whether an aqueduct is a candidate — computed by the base's own water-balance function over the town's recorded inputs, never a second implementation; stage S6 | — (ours only, descriptive) | the `water` and `climate` register lines; V11's T-V11-33 bench |
| `water.walk` | model | f / m | per town: the share of households whose dwelling plot lies within the walking coverage radius of V11's water-supply family of the nearest water (a water body's shore, an oasis included, or a placed member of that family; `walkWater`, V12 §2.7b), and each occupied band's mean way distance from its households' plots to that water; stages S1, S3, S10a, S10b | — (ours only, descriptive) | item 111 (d): the `walkWater` and `richNearWater` indicators; the item-111 register lines |
| `ruin.survival` | model | f | per ruin system and persistence class (V04's `PersistenceClass`): the share of its laid elements standing — in no collapsed or filled closure state (§2.7's states) — read from the ruin's element records, beside V11 §3.23.5's share aged by V04's law at the ruin's age and cover; the underground stages (II.7) | — (ours only, descriptive) | the `under.ruin` `survival` register line; the V4-U5 panel's report |
| `shade.gap` | model | — | item 102 (g): the mean prosperity of sunlit minus shaded plots within districts holding both; descriptive — V05's island fixture and V06's drift fixture read it as their fixture bars | — | item 102 (g) |
| `street.detour` | geo | m | over 200 node pairs per town drawn by the metric's stream among degree-≥ 3 nodes at least 100 m apart, the way-graph distance ÷ the straight distance; per seed median | NG (§16 M-1's IMPROVEMENTS §7.2 rows) | detour index ⟨M-1⟩ |
| `street.cyclesPerKm2` | geo | m | independent cycles of the way graph (edges − nodes + components) per km² of the built outline | NG | cycles per km² ⟨M-1⟩ |
| `plot.minWidth` | geo (NG's parcels) / model (ours) | m | per plot the width of its minimum-width enclosing rectangle (rotating calipers, §17.1 (8)); distribution | NG | plot minimum width ⟨M-1⟩ |
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
| FTG (server of each capture, request hash) | each capture's recorded population and water setting (§13.6 (2)), parity preset `FTG` | TOWN (BIG_TOWN), CITY (BIG_CITY); METROPOLIS per D-31 (none) | turning, junctions, runs, footprints, outline, towers and gates, water, trees (weakness), time (weakness), variety (floor); population and wealth descriptive | nightly; milestone |
| NG 1.2.2 (itch 11441280) | the base's bent cut on the same face shapes (M0, M1); a district opened at neighbourhood LOD (M5, §13.6 (2)'s search) | the neighbourhood band | bent-cut signature, junction angles (organic), blocks and template counts, court share, party walls, Moran (weakness), hood time | M0 spike; nightly from M1; M5 |
| VG 1.6.9 (19365073) | V07's settings under the `VG` preset | THORP, HAMLET, VILLAGE | V07 §7's rows | V07's tiers from V-M4 |
| Fantasy Manor (build 890) | the free frame, `FM` preset | the building band | V02's T-V2-31 | V02's tiers from M6c |
| Dwellings (itch 17195045) | the plan rung | — | nothing: research-side notes (V03 §7) | — |
| the corpus (M-CAL) | per sample frame, the historical pack | the rungs its frames cover | corpus *target* rows gate the historical pack only; under the default they are descriptive until the owner adopts the pack for that frame (V12 §3.10.3 R2) | M-CAL; nightly after |

**Items 110, 111 and 113 are invisible to every parity row** (item 23; J-V12.54). No measured reference builds retaining
walls, raises a way or builds on a mole, pier or deck: 0 of 48 research inputs mention retaining walls, viaducts,
aqueducts, elevated or raised roads, deck plots or houses on a bridge (`docs/validation/bench/v12_rev_item110_grep.out`);
"terrace" there means row-house frontages, and FTG's moles and piers are stored as edges with no recorded buildings (the
FTG coverage audit's H17, H18). Item 110's four families are extensions: V11 §3.24.0's switch table resolves them off in
`presets.MFCG`, `presets.FTG` and `VG` (T-V11-21), `NG` resolving them as `MFCG` does (V01 §3.15), and `presets.FM`
resolves the stepped and deck families off too (J-VI.10), so every P row measures towns and buildings without them. Item 113's
history replay is off under the parity presets (§4.11), so no P row measures a replayed town; no reference draws an oasis,
so item 111's cells reach a P row only at their parity-preset values (§7.6). In the default preset these features are on,
and their metrics (`raised.*`, `retaining.*`, `deck.*`, `tier.*`, `water.walk`, `void.*`'s excavation reading) are ours
only — descriptive or C, never a §13.5 row. V06's growth parity (a history's raised-way prevalence within ± 15 % of the
one-click city's; its walled share in [0.5, 0.95], read by `walled.share` on the history's epochs) compares ours with ours
and stays V06's (V06 §7).

### 3.5 The band arithmetic and the parity run

**3.5.1 Estimators.** A reference's per-seed statistics s₁ … sₙ give its spread [a, b] and centre c (the median):
n = 1 → a = b = c (`single`); 2 ≤ n < 10 → [min, max] (`minmax`); n ≥ 10 → the 10th and 90th percentiles by linear
interpolation between order statistics (Hyndman and Fan's type 7; `type7`). With n i.i.d. draws [min, max] covers on
average (n − 1) ÷ (n + 1) of the population — 0.82 at n = 10 — so at ten seeds the two estimators aim at the same interval
as §13.5's [p10, p90] (V12 §12; J-V12.3).

**3.5.2 Scalar target bands.** For a `positive` metric: lo = min(a × 0.9, c × 0.85), hi = max(b × 1.1, c × 1.15) — the
union of §13.5's rule and its single-value ± 15 %, so the band is never narrower than a single value's and n = 1 reduces
exactly to §13.5's single-value rule; then lo ≤ c − `absFloor` and hi ≥ c + `absFloor` are enforced. For a metric of sign
`any` (signed angles, Moran's I): w = max(b − a, `absFloor`), lo = a − 0.1 w, hi = b + 0.1 w. Ours is the median of our
per-seed statistics t₁ … tₘ; a target row passes when lo ≤ ours ≤ hi (J-V12.6).

**3.5.3 Distribution target bands.** The reference's own seed-to-seed spread is the 90th percentile (type 7) of the
two-sample KS distances over its n(n − 1) ÷ 2 seed pairs (n = 2: the one value). Ours is the median, over every pair (our
seed j, reference seed i), of KS(tⱼ, sᵢ) — single seed against single seed, as the reference's spread is measured — and
the row passes when ours ≤ 1.25 × that spread (J-V12.7). At n = 1 there is no spread: the ceiling is the two-sample KS
critical value c(0.01) × √((n₁ + n₂) ÷ (n₁ n₂)), c(0.01) = 1.628, with n₁ the element count of the one reference seed and
n₂ that of our median-sized seed (by element count), and the row compares our median single-seed distance with it, as for
n ≥ 2.

**3.5.4 Weakness, descriptive and declared exceptions.** A weakness row compares ours (the median) with its one-sided bound
and margin as §13.5 states it; a descriptive row is reported and gates nothing; a row whose band §13.5 or a volume
declares as an exception (the organic turning's 0.5–1.5 × FTG; V02's χ² and KS clauses for Fantasy Manor's small sample)
carries that band in its registry entry as `band.override`, and the report prints "declared exception" beside it.

**3.5.5 The parity run, step by step** (`plat parity --tier nightly|milestone [--html] [--csv]`):
1. Load `baselines.json`; re-run checks C1, C5, C6 and C9 against the last committed hash; select rows whose build equals
   their reference's pin and whose `metricVersion` equals the registry's.
2. Resolve each row's setting: for MFCG rows the **matched population** — the population whose expected non-hinterland
   building count equals the reference's median building count at that size, round(3.4 × count ÷ (1 − h)), with §12.2's
   3.4 persons per building (core plus hinterland) and h the hinterland share of buildings measured on B-CITY-lite at that
   rung, solved once per rung at each milestone and recorded in the report's `setting` (MFCG exports no farmsteads;
   J-V12.8); for FTG rows the capture's recorded population; for NG rows the districts `ng-counts.json` records from §13.6
   (2)'s search (k and the address), so the nightly never repeats the search; for VG and Fantasy Manor rows V07's and
   V02's settings.
3. Generate our towns on `bref/<ref>/<rung>/<water>/<i>` (20 per setting nightly, 100 at a milestone) once per preset arm
   (`PresetArm`, V12 §2.1) the setting's rows need — the reference's own preset for P rows, `MFCG` or `FTG` (T23-1), `NG`
   (V01's T-V1-31), `VG` (V07's T-V7-23) or `FM` (V02's `fm.*` rows, T-V2-31), and `'default'` for O and C rows — so a
   setting with both kinds of rows generates two arms (V12 §6 counts them).
4. Per town: `measureInputOf` and the `geo` metrics; the `model` and `trace` metrics from the bench statistics; the
   `render` metrics on the nightly and milestone tiers only; the `timing` metrics only inside §12.1's timing phase.
5. Per row: per-seed statistics → ours → the band of V12 §3.5.2–§3.5.4 → a verdict.
6. Write the `ParityReport` (V12 §3.13's canonical form), its dashboard and its CSV; at a milestone, store it at
   `plat/goldens/parity/<milestone>.json` and name it in the `MilestoneRecord` (§13.3).

**3.5.6 Verdicts.** `pass`, `fail`, `reported` (§13.5) and two more (item 497): `notApplicable` — the setting lacks what the
metric requires (a coastal row on a dry seed; a scale-needing metric on a relative input), which gates nothing and is
counted; and `missingBaseline` — an ⟨M-1⟩ row with no baseline, which counts as `fail` by §13.5's ⟨M-1⟩ rule until M-1
records it descriptive in `known-defects.json`. A corpus *target* row is evaluated under its historical pack (gating it,
V12 §3.10.6 A2) and, under the default, reported as `reported` beside that verdict until the owner adopts the pack for its
frame (V12 §3.10.3 R2); a failing corpus row therefore never fails a milestone's parity exit under the default.

### 3.6 The correlation harness — every "above a random baseline" bar

T71-3 and file g's random-baseline bars (items 103 (e)–(f), 104 (g), 104 (h) (8)'s closeness, 105 (k)'s distances, 107
(g)'s coverage and spacing) all say the same thing: a soft rule shows as a measured shift against a random placement,
never as a guarantee. Item 102 (g) is not one of them: its bar is a fixture — an island over a uniform district, the shade
strip poorer by the declared weight within tolerance — owned by V05 (its island fixture) and V06 (the drift fixture);
prosperity is a field, and permuting plots does not permute shade, so no null exists for it and `shade.gap` is a
descriptive metric (V12 §3.4.2). File g's other tendency shapes run on V12 §3.6b. `plat nullmodel <spec | all>` is their
one implementation; each bar's owner registers a `NullModelSpec` (V12 §2.7), which §13.2's convention (6) cites (item 488).
Where the owner states the pass rule (V11's T-V11-12 – T-V11-14), the spec carries it as `pass` and `ownerBar` (J-V12.48).

**Towns.** A spec whose settings B-CITY covers reads B-CITY's nightly towns — the owner's count per rung (V11's 200), else
the first 50 — which the nightly generates anyway, so the bar pays only for its permutations (J-V12.40). A setting B-CITY
lacks (a custom-chain fixture, a forced site, a METROPOLIS web setting beyond B-CITY's) draws
`null/<spec>/<rung>/<water>/<i>` under the spec's preset.

**Per town:**
1. The members M: the placed uses of the subject's classes. With fewer than `minMembers` (default 1 on the pooled route,
   3 on the rank route), or without a feature the spec `requires` (a river for `downstreamShare`), the town is skipped and
   counted.
2. The eligible sites of each scope unit (a block, a district, or the town): `hardNeeds` — plots meeting every hard need
   of the subject's siting profile (V11 §2.3; a watermill's water, a quay's shore), so the null tests the soft pulls and
   never the physical ones; `sameSizeClass` — plots within the class's template area range; `anyPlot` — every built plot.
   The members' own plots are eligible. `servedShare` and `nnSameKind` run at scope `town` only (a district or block
   permutation conserves them; registration refuses otherwise).
3. S_obs, the statistic on the members' plots.
4. For k = 1 … K (20): per scope unit, draw as many eligible plots as the unit holds members, without replacement, from
   the testkit stream `null/<spec>/<rung>/<water>/<i>/perm` (V12 §3.13); S_k on them.
5. **The rank** u = (#{S_k < S_obs} + U × (#{S_k = S_obs} + 1)) ÷ (K + 1), with U uniform from the testkit stream
   `null/<spec>/<rung>/<water>/<i>/tie` and S negated when the spec expects `lower`. With no pull, u is exactly uniform on
   (0, 1) however discrete the statistic — the randomised tie-break of §13.2's faithfulness campaign, which records that
   without it a perfect regenerator fails on discrete statistics (J-V12.12).

**The pooled route** (`shareWithin`, `downstreamShare`, `downwindShare`, `prestigeShare`: members counted on indicator
plots). Per scope unit the null count is hypergeometric — m members drawn from its E eligible plots, G of which satisfy
the indicator — and a town's null is the convolution of its units'; the pooled null distribution is the convolution over
the counted towns, computed in integer-indexed doubles in town order with a fixed summation order (V12 §3.13). The bar
passes when P(pooled count ≥ observed) ≤ `alpha` (0.01; for `expect: 'lower'`, P(pooled count ≤ observed)) and, where the
spec states `minShift`, the pooled observed share exceeds the pooled null mean share by at least it. The headroom lint of
V12 §2.7 refuses a spec whose indicator is nearly always true under the null (J-V12.46).

**Across towns (the rank route).** The **rank rule** passes when the share of counted towns with u > 0.5 is at least
`townShare` (0.70) and the median u is at least `medianU` (0.60). Its exact p-value, for a `holm` family, is
P(Binomial(n, ½) ≥ the count of towns with u > 0.5), since u is uniform under the null; the pooled route's p is its tail.
A bar that states its own margin (T71-3's 0.15 of the prime-frontage share, §13.7) uses the `margin` rule — the median
over towns of S_obs − mean S_k at least that value; a `holm` family (V11's T-V11-12: each shift significant at p < 0.01,
Holm-corrected) runs Holm's step-down over its specs' p-values.

**Calibration (executed; seeded; our own code).** The rank rule passes chance 0.000 – 0.005 on normal statistics and on
six discrete fixtures (members m ∈ {1, 2, 3, 10}, base shares q ∈ {0.3, 0.5, 0.85}), and passes 0.412 / 0.927 / 0.993 at
planted shifts of 0.5 / 0.8 / 1.0 standard deviations (`docs/validation/bench/critique_v12_nullrule_rank_power.out`); a
z-sign rule (z > 0 in 70 % of towns, median z ≥ 0.2) passed chance 0.58 – 0.98 on few-member shares and is not used
(`critique_v12_nullrule_discrete.out`; `v12_nullrule.py`). The pooled exact test holds its size at 0.002 – 0.015 and
reaches a pull of 0.3 with power 0.705 (q 0.3, m 1), 0.384 (q 0.5, m 1), 0.905 (q 0.5, m 3) and 1.000 (q 0.3, m 10),
where the rank rule gives 0.302, 0.170, 0.535 and 1.000 (`critique_v12_pooled_exact.out`); at q 0.85 no rule sees a 0.3
pull (≤ 0.09), hence the headroom lint. A tendency a reader can see ("in most river towns") passes, chance does not.

**Verdict and confirmation** (J-V12.47). A bar that fails on its towns is reported `suspect`, never yet a failure: it
re-runs once on a fresh family at twice the towns — `null/<spec>/<rung>/<water>/c1/<i>`, or the next B-CITY towns of its
settings — and passes if the re-run passes ("pass on confirmation"). Only when both fail is the verdict `fail`. The seeds
are fixed, so a verdict holds for the table version, and the confirmation runs at most once per (spec, table version).
Executed (`docs/validation/bench/v12_rev_confirm.out`): at a real 0.8-standard-deviation shift the first run passes 0.934
and both fail 0.0015 of the time — 0.06 false fallbacks expected over 40 such bars per table version — while under no pull
the final pass rate stays 0.0025.

**Pre-decided fallback** (the spec's default; a bar's owner may state its own): the family or pair weight behind the pull
doubles once — clamped to its column's declared range top, and a value already at the top goes straight to *not
produced* — a mechanism change, recorded as a `fallback` run (V12 §3.7); the bar re-runs; still failing, the bar is
reported "not produced" and enters `known-defects.json` (§13.7's not-achieved rule; J-V12.26). A fallback never moves an
owner-stamped cell and never crosses an owner-stamped minimum (V12 §3.7.2).

**The statistics** (`StatSpec`, V12 §2.7): distances are along the way graph from a plot's access point, metres, built
per part (V12 §3.4.2); `meanDistTo` the members' mean distance to the nearest target (the target class's access points, a
market square's edge, a gate, a quay face; `water` and `wall` Euclidean to the nearest face, an oasis's shore being water);
`shareWithin` the share within `radiusM`; **`servedShare`** (item 103 (f)) the share of the subject class's coverage units
holding ≥ 1 member, the unit read from the class's compiled `profile.coverage` (V11 §2.3: `unit`, `per`) and each unit
taken as V11 §2.3 defines it at a plot: `district` — every district of the town (the plot's district, no household
threshold; J-V12.60), served when a member's plot lies in it; `parish` — the cells of the parish partition derived as
V11 §2.3 states (the Voronoi cells of the placed members of the classes counted as churches, V11 §3.23.8's list, over
residential land; one cell per district before any church stands), derived from the town's churches as they stand and
held fixed while the subject's members are permuted, served when a member's plot lies in the cell; `walk` — the
residential plots (those holding ≥ 1 household at S10a, §4.7), each served when a member's plot lies within the disc of
radius `per` m about it; `households` — the residential plots, each served when a member lies within the disc of radius
√(`per` × a_res ÷ π) about it, a_res its district's residential plot area per household (S10a's derived value); each disc
counted as V11 §2.3 counts it (the 16 m raster). Shares are unweighted counts of units. A class that itself makes the
parish partition (a church class whose unit is `parish`) would be served in every cell by construction, observed and
permuted alike, so for it the unit is read in its `households` form with the same `per` (J-V12.59). A spec with `unit:
'district'` reads the district unit whatever the class's row says — item 105 (k)'s dispersal row (V11's T-V11-18), which
speaks of districts and alone counts only districts of ≥ 30 households (J-V12.60); `nnSameKind` the median distance to the
nearest other member; `downstreamShare` the share of members whose `ContextVector.upstream` (§2.5: 0 upstream … 1
downstream) exceeds the household-weighted median of the residential plots'; `downwindShare` the share whose
`ContextVector.upwind` lies below that median (§2.5); `prestigeShare` item 71's prime-frontage share (T71-3's definition);
`flowOrder` the share of a chain's instances whose resource node lies farther from the principal market than its final
seller (item 104 (h) (8)); `chainSpread` the mean way distance between the in-town nodes of a chain instance, the chain's
other nodes held where they stand while one node's plot is permuted (item 104 (g)); `meanDistToPartners` a member's mean
way distance to its bound link partners of the named role — the consumers of its dominant output, its providers, its
inputs' providers or its demand's consumers — read from item 105 (a)'s derived links through the explain query at the
bench level, the partners held where they stand while the member's plot is permuted.

**On a corpus map** the statistic runs in the spec's corpus `variant` — buildings carrying a `use` (V12 §2.2), the null
drawing among the map's buildings (`anyPlot`), Euclidean distances where the map has no way graph — and a corpus target
row is compared with OUR statistic computed in the same variant as a `geo` metric on our `MeasureInput` (buildings with
`use`, Euclidean, `anyPlot`), never with the model statistic, so like is compared with like (J-V12.5, J-V12.51);
`downstreamShare` and `downwindShare` need a context vector and are `notApplicable` on a corpus map.

### 3.6b Share, sweep, paired, two-sample and step-script bars

`plat statbar <spec | all>` runs every `StatBarSpec` (V12 §2.7b) on towns of its levels under their presets, seeds from
`null/<spec>/…` for pooled rules and `sweep/<spec>/…` for ordered ones and step scripts (V12 §2.4); instances come from the
bench statistics and the `void.*`, `link.*`, `ladder.members`, `crypt.*`, `catacomb.*`, `raised.*` and `water.walk`
metrics (V12 §3.4.2). Towns are drawn in steps of 50 per level up to `seeds.max` until the rule's minimum is met; a bar
still short is `insufficient`, which gates as a fail naming the shortfall, so its owner adds a fixture level instead of
the bar passing on too little. A spec with `stopAfter` regenerates each town only up to that stage, on the golden
tooling's stage isolation (§6.4; V12 §3.7.7), so a site-stage bar or a raised-way bar never pays for a whole town. A
level's `site` override enters as a frozen S1 output through the same tooling — the relief class, the geology, the ore
share, a ravine across the frame, the climate row — and a forced ruin or cavern source, a population sweep or a landmark
enters as a fixture record of the frozen manifest (V12 §1b's dossier table) or a recipe declaration, so no test-only
branch enters the shipped generator (J-V12.35). **Levels that cannot run:** a level whose generator has not landed
(`requires: 'V07'` for THORP, HAMLET and VILLAGE until V-M4 opens caverns and ruins at every rung, item 109 (j) (1)) and a
population level outside the port's range [1 500, 120 000] (§12.2; item 108 (f)'s × 0.5 of a small TOWN or × 2 of a
large METROPOLIS) are `notApplicable`, reported and skipped — never `insufficient`, never a failure.

**Precedence (J-V12.48).** Where the owning volume states a bar's pass rule, seeds or tolerance, that statement wins and
the spec carries it as parameters (`most.share`, `rate.tolerance`, the `margin` and `holm` routes of V12 §2.7, the seed
counts); the rules below are the defaults for a bar that states none. The unit a g item names binds the owner too: item
109 (j) (5) speaks of *voids*, so V04's T-V4-54 is read per deep void. **Bends, not refusals** (J-VI.4): a bar whose
indicator counts infeasible declarations of item 110 or of the sky layer counts bends, each with its line (item 101 R2),
never refusals.

The pass rules (calibration executed: `docs/validation/bench/v12_sweeprule.py` → `.out`, with instances independent;
`v12_rev_clustered.py` and `v12_rev_confirm.py` → `.out`, with instances of one town sharing a town effect; seeded, our own
code):

* **most** — the indicator pooled over the levels' instances; pass when the pooled share is at least `share` (default
  2/3; an owner's 0.70, 0.75 or 0.80) over at least `minEffective` (100) **effective** instances from at least 20 towns,
  **and** at least 70 % of the towns holding ≥ 3 instances have a share of at least 1/2 (the town clause; skipped when
  fewer than ten towns hold three). Effective instances are n ÷ (1 + (m̄ − 1) ρ̂): m̄ the mean instances per town and ρ̂
  the one-way analysis-of-variance estimate of the intraclass correlation, clamped to [0, 1]; towns are drawn until the
  effective count reaches the minimum. Executed with independent instances: at 100 a true share of 0.75 passes 97 % of
  the time and 0.80 99.9 %, 0.60 9 % and 0.55 1 %. With a town effect of ρ = 0.3 and 1 – 8 instances per town the raw
  100-instance rule passed 0.55 in 5 % of runs; with effective instances it passes 0.55 in 0.9 %, 0.60 in 8 %, 0.75 in
  97 % and 0.80 in 99.8 % (`v12_rev_confirm.out` (B)). "Most" therefore means clearly most — the two thirds the owner's
  sittings use (§13.6 (6)) — a coin-flip placement fails, and a handful of towns with many instances cannot carry the bar
  (J-V12.28, J-V12.50).
* **floor** — over deep voids (V12 §2.7b: connected components, so one access that opens a whole system counts once), at
  most the first three per town in id order, at least `minEffective` (100) effective units from at least 20 towns: pass
  unless the deflated count (y ÷ deff of n ÷ deff, deff the design effect above) would have a one-sided exact binomial
  probability below 0.01 were the true share exactly the floor. Executed at a floor of 0.50 with 50 towns, 1 – 3 deep
  voids each and ρ = 0.3: a true share at the floor fails 0.9 % of the time with the deflation (2.2 % without), 0.45 fails
  6.8 %, 0.40 26 %, 0.35 57 %, 0.30 87 %; with 70 towns 0.9 %, 8.9 %, 37 %, 76 %, 96 % (`v12_rev_clustered.out`). The
  floor is a bound the owner's rule sets (item 109 (j) (5)); a design whose expected share sits on it is the designer's
  error, so the rule is lenient at the floor and strict below it (J-V12.29).
* **rate** — pass when the two-sided exact binomial p against the expected value is at least 0.01, over at least 200
  instances (`tolerance.kind 'exact'`), or when the observed rate lies within k standard errors of it (`'se'`, V04's ± 3
  s.e.). Executed for the exact form: a right rate fails 0.7 – 0.8 %; a rate off by half fails 84 % at 100 units and 99.5 %
  at 200, off by a third 35 % and 75 %. The expected value is a cell or a **derived value** from a named pure function of
  `@plat/testkit/expected` over the tables at the running version: `ruinShare(tables)` = w_ruin ÷ (w_ruin + w_cavern) of
  V11's void-source rank weights, exact on the fixture that forces one qualifying ruin and one qualifying cavern per
  undercity (V04's T-V4-58: "`w_ruin ÷ Σ w`"); `cavernChance(tables, level)` = min(cap, chance(relief, geology) × (mining ?
  boost : 1)) from the S1 relief and geology rows (registry row 9, item 109 (a)) and `under.systems`' cavern row (row 59:
  the mining boost and its cap), with V11's `miningCellShare` deciding whether the site holds mining (V11 §3.23.1), the
  level's site fixing relief, geology and mining.
* **presence** — at each level N = min(500, ⌈5 ÷ p⌉) towns, p the design chance there (a cell or `cavernChance`); pass when
  every level holds at least one instance. P(none at a level) ≤ 0.0066 for p ≥ 0.01 (executed); a level whose chance is
  below 0.01 runs on its fixture site with the source forced, so p is the forced chance. At p = 0.02, N = 250.
* **trend** — levels in order; the Cochran–Armitage trend z (scores 0 … L − 1) at least 2.326 (one-sided α 0.01), and no
  reversal: no adjacent pair whose adjusted rates (y + 0.5) ÷ (n + 1) fall by more than two standard errors. With `bins`,
  the units are pooled across the levels and binned (buildings over a void: 0, 1–2, 3–5, 6–10, 11–20, 21 and more); a bin
  under 20 units merges into the next lower bin. Executed: item 109 (a)'s relief rows (cavern rates 0.07, 0.148, 0.23,
  0.375 under an independence approximation) pass 95 % at 50 towns per level and 100 % at 100; no effect passes 1.05 % to
  1.25 %; a real trend with one flat step 85 % at 100 per level; access against buildings over, at two sets of dig and
  opening rows, at least 99 % at 20 voids per bin, and no effect 0.85 %. Defaults: 50 towns per level, 20 units per bin
  (J-V12.30).
* **higherWith** — per stratum `perCell` towns with the factor on and off; the Cochran–Mantel–Haenszel z at least 2.326 and
  no stratum where the with-rate falls below the without-rate by more than two standard errors. An indicator with several
  instances per town (`walkWater`, per household) enters the test on effective instances and deflated counts per stratum
  and arm, the design effect as `most`'s, so one town's many households never carry the test. Executed: the mining boost
  (1.4, capped 0.9) passes 96 % at 200 towns per cell, 70 % at 100, 38 % at 50; no boost 1.2 %. Default 200 per cell —
  cheap where existence is settled at the site stage (S1 and II.7.6's existence draw; `stopAfter`). The mining factor at
  the site stage is `SiteResources.ore` or the dossier's mining deposits (DR31); the roster's mining class, drawn later, is
  V04's conformance bar, not this one.
* **exactMonotone** — a property, no statistics: per fixture and per record (`identity: 'record'` — a `CatacombComplex` by
  its id, which keeps its source lineage across derivations, V04 §3.5.1; a collective record by its id), the quantity at
  each step at least its value at the step before, and every record present at a step present at the next; 0 violations.
  The sequence is either `levels` (a population sweep on one seed, `sweep/<spec>/any/<i>`) or a **step script** run by the
  harness's step runner on the fixture document — `epoch` (V06's engine), `regenerate`, `{ rederive: S1 }` and
  `{ rederive: <the underground stage> }`, `{ newRandom: 'system' }` on the catacomb system, `upgradeReplay` across an
  output version (§7.5), `{ dossierEvent: 'burial' }` (a dossier event adding burials), `extendGrowth` — the base's own
  events and commands, never a test-only path. Author edits never appear in its script: the ratchet binds derivations,
  not the author (J-V4.56). With `where: 'stagnant'` (the `fill` form) a step counts only where the record's `blockedBy`
  is non-empty and its extent held. The runner also runs each fixture's **author-delete probe**: deleting n grid nodes
  lowers `extentFloorM2` by exactly their area, and no later step re-digs a tombstoned node (J-V12.38).
* **exactBound** — per record and step, `catacomb.growthM2` ≤ its cap `max(extent × ((1 + growthCapShare)^years − 1),
  growthFloorM2)` (V04's `CatacombRule`, read per year over the span, J-V6.53); 0 violations.
* **exactStates** — a property on the same step runner: per fixture and step, every named cluster's excavation reading
  (V04 §2.2) and its dwellings equal the script's expectation after the step; 0 violations. Its scripts may hold the
  author's access edits — `{ access: 'seal' | 'caveIn' | 'brick' }` on the last open link or access, `{ access: 'reopen' |
  'dig' | 'excavate' }`, `{ access: 'demolishAbove' }` on the building over a cellar access — beside `epoch`, `undo` and
  `saveReload`, because item 113 (e)'s reading answers to every closing and reopening alike; each step runs through §7.1's
  events and ops, never a test-only path. A violation names the fixture, the step, the cluster and both readings
  (J-V12.87).
* **paired** — per seed holding a ruin, the ruin's laid plan against the town above inside its outline on three measures:
  `ruin.blockArea` against `block.area` (differs when the ratio is at least 1.5 either way), `grid.r4` (differs when |ΔR| ≥
  0.15) and `grid.axis` (differs when the folded axes lie ≥ 10° apart; skipped for a ruin that took the shared-axis chance).
  Pass when each measure differs in at least 70 % of the seeds where it applies and every seed differs on at least min(2,
  applicable) measures — item 109 (c)'s "never a copy of the streets overhead" (J-V12.32). The thresholds are §13.7 rows
  (item 501); the ancient-culture rows that must clear them are V11's, the plan V04's. A ruin's stepped monument is never
  read by these measures (V12 §2.2).
* **twoSample** — ruin systems against cavern systems on `plan.rightAngle` and `plan.straight`: pass when, on each metric,
  the median over ruins exceeds the 90th percentile (type 7) over caverns, each side at least 30 systems. A built plan
  clears it by construction; a ruin laid with the cavern's organic outline does not (J-V12.33).
* **noRegression** — the same seeds in two arms, the reference arm with the `off` overlay applied, each cell at its named
  off value (common random numbers); pass when |median over towns of (default − reference)| is within the tolerance (a
  share: 0.05, a §13.7 row).

**The confirmation stage** applies to every statistical rule here (`most`, `floor`, `rate`, `presence`, `trend`,
`higherWith`, `paired`, `twoSample`, `noRegression`) as to V12 §3.6: a failing bar is `suspect` and re-runs once on a fresh
family (`…/c1/…`) at twice the towns; only a second failure is `fail`. The properties (`exactMonotone`, `exactBound`,
`exactStates`) are exact and need none.

**The bar map** — file g's tendency and property bars as §13.2 states them (their owners register the specs with these
rules and their stated parameters; the conformance clauses of the same items stay their owners' checks, V12 §1, and sit on
the harness registry's `conformance` list, §13.2's convention (6)):

| g bar | rule | indicator or statistic | levels and counts | owner's bar (its parameters win) |
|---|---|---|---|---|
| 103 (e): a nuisance's sensitive members farther from its emitters than random | null, `holm` family T-V11-12 | `meanDistTo` (median) from sensitive-≥ 2 members to the nearest emitter of level ≥ 3, `higher` | B-CITY, 200 towns per rung | V11 T-V11-12 |
| 103 (e): tanneries downstream | null, `holm` family T-V11-12 (pooled exact); and most | `downstreamShare` of tanneries; per river town the tanneries' downstream share | B-CITY river towns, 200 per rung; most at 0.80 of towns (the owner's) | V11 T-V11-12 |
| 103 (e): the thieves' den farther from the law than random | null, `holm` family T-V11-12 | `meanDistTo` the nearest law member, `higher` | B-CITY, 200 per rung | V11 T-V11-12 |
| 103 (e): shops nearer the market than random | null, `holm` family T-V11-12 | `meanDistTo` the nearest market edge, `lower` | B-CITY, 200 per rung | V11 T-V11-12 |
| 103 (f): a coverage class's served share above random | null, `margin` 0.1 (the owner's) | `servedShare` per coverage class, each on its own compiled coverage unit (V12 §3.6; a `settlement`-unit class `notApplicable`), scope `town` | B-CITY, 200 per rung | V11 T-V11-13 |
| 104 (g), 104 (h) (8): a chain's nodes closer than random | null, rank | `chainSpread`, `lower` | CITY and TOWN custom-chain fixtures (V08's), 50 towns each | V11 T-V11-16 |
| 104 (h) (8): the flow order holds in most placements | most at 0.75 (the owner's) | `flowOrder` | as above, ≥ 100 effective chain instances | V11 T-V11-16 |
| 104 (h) (8): a compatible chain's in-town nodes within their links' comfortable distances in most placements | most | `withinComfort` over those links | as above | — |
| 105 (k): a multi-output producer nearer its dominant output's consumers; a shared provider's consumers nearer it; source-oriented nearer inputs, market-oriented nearer demand — each than random | null, rank | `meanDistToPartners` by role | B-CITY CITY, 200 towns | V11 T-V11-14 |
| 105 (k): the share of districts holding a dispersed class within tolerance of the base's | noRegression, tolerance 0.05 | `servedShare` with `unit: 'district'` per dispersed class (districts of ≥ 30 households, V12 §3.6); `off` = V11 §3.7.4's web off form | CITY and METROPOLIS, 50 towns each | V11 T-V11-18 |
| 106 (h) | none: fixtures; the enclosure (V12 §2.2) makes their measurements well defined, `wall.barrierShare` reported | — | — | V11 T-V11-19 |
| 107 (g): a coverage class's served share above random with the web on; a spaced class's nearest-member distance above random | null, rank (scope `town`) | `servedShare` per coverage class on its own coverage unit (V12 §3.6); `nnSameKind` | B-CITY CITY and METROPOLIS, 50 each | — |
| 107 (g): consumer-to-provider distance within `comfortM` in most placements | most at 0.70 (the owner's) | `withinComfort` over every link | B-CITY CITY, ≥ 100 effective links from ≥ 20 towns | V11 T-V11-14 |
| 108 (f): members rising monotonically across a population sweep | exactMonotone, `levels` | `ladder.members` per COUNT, QUARTER and GUILD record | the surveyed-dossier fixtures at population × 0.5, 0.75, 1, 1.5, 2 (outside [1 500, 120 000]: `notApplicable`) | V11 T-V11-17 |
| 109 (c), (i): a ruin differs from the town above | paired | V12 §3.6b's three measures | CITY on a fixture site with a forced ruin source, 50 seeds | V04 T-V4-45; V06 T-V6-37 |
| 109 (i): ruin plans beat the cavern baseline on structure | twoSample | `plan.rightAngle`, `plan.straight` | the ruins above; caverns at CITY on a soluble mountainous fixture site; ≥ 30 systems each | V04 T-V4-44 |
| 109 (a), (i): cavern frequency rises with relief | trend, `stopAfter` S1 | `present` cavern | plain, rolling, hilly, mountainous; 50 towns per level | V04 T-V4-55 |
| 109 (a): higher with mining than without, per relief class | higherWith, `stopAfter` S1 | `present` cavern | four relief strata × mining on and off; 200 per cell | V04 T-V4-55 |
| 109 (i): an undercity takes a ruin over a cavern at the ranked share | rate, `se` 3 (the owner's) | `ruinChosen` against `ruinShare` | CITY and METROPOLIS with one ruin and one cavern forced, ≥ 200 undercities | V04 T-V4-58 |
| 109 (j) (1): caverns and ruins at every rung | rate, `se` 3, 500 per rung (the owner's) | `present` cavern against `cavernChance`; `present` ruin against the forced source's chance | THORP … METROPOLIS on forced-geology and forced-source sites; the village rungs `notApplicable` until V-M4 | V04 T-V4-43; V06 T-V6-37 |
| 109 (j) (5): the access share rises with buildings over the void | trend with bins | `voidAccessible` | a forced-void fixture site, 40 towns per rung TOWN … METROPOLIS (the village rungs join at V-M4); once V06 lands, H-VOID's growth epochs join as units | V04 T-V4-49; V06 T-V6-34 |
| 109 (j) (5): depth keeps secrets | floor | `voidSealedDeep` per deep void against `DigRule.sealedFloor` | METROPOLIS on a forced deep-void fixture site, ≥ 100 effective deep voids from ≥ 20 towns, ≤ 3 per town | V04 T-V4-54 (read per void); V06 T-V6-36 |
| 109 (k) (6): a catacomb's extent never shrinks, on every derivation | exactMonotone, `identity: 'record'` | `catacomb.extentM2` per complex | every epoch of H-100, of V06's 50 random trajectories and of H-METRO; the step script (Regenerate, Re-derive from S1 and from the underground stage, New random on the catacomb system, an upgrade replay, a dossier burial event, extend growth) on the surveyed-dossier catacomb fixtures; the author-delete probe | V04 T-V4-51; V06 T-V6-38 |
| 109 (k) (5), (6): a stagnant catacomb's fill rises while its extent holds | exactMonotone, `where: 'stagnant'` | `catacomb.fill` per complex | V06's stagnant and rank-held fixtures; H-100 | V04 T-V4-52; V06 T-V6-39 |
| 109 (k) (6): growth per epoch within the cap | exactBound | `catacomb.growthM2` per complex and step | as the extent row | V04 T-V4-52; V06 T-V6-39 |
| 109 (k) (6): at most one catacomb at TOWN; the CITY and METROPOLIS count within the bound; the largest under the largest cemetery; every catacomb under a cemetery or a CITY or METROPOLIS quarry ossuary, none under a church; the cathedral always crypted, with the largest crypt | none: conformance (V12 §1); `catacomb.count`, `catacomb.source`, `catacomb.rank`, `crypt.*` reported | — | — | V04 T-V4-50; V06 T-V6-40 (a), (c) as the epoch forms; V11 T-V11-25 |
| 110 (f) | none: conformance (V12 §1); `retaining.onFlatM`, `raised.junctions`, `raised.generatedBelowCity`, `raised.reasonMissing`, `raised.overCap` reported | — | — | §13.2's T110-1 – T110-6; V01, V02, V04, V06, V07 |
| 110 (b): a viaduct where a route's best course crosses a deep ravine | presence, `stopAfter` the raised-way stage | `raised` viaduct, `generated` | CITY and METROPOLIS on the ravine fixture site; N by the rule | base (`T110b.viaduct`) |
| 110 (b): an aqueduct where the water need exceeds the walled supply and a higher source lies in reach | presence, `stopAfter` the raised-way stage | `raised` aqueduct, `generated` | CITY and METROPOLIS on the spring fixture site | base (`T110b.aqueduct`) |
| 110 (b): an elevated road likelier with prosperity | trend, `stopAfter` the elevated-road stage | `raised` elevated, `generated` | CITY on the two-high-wards site at `intent.wealthLevel` 0.1, 0.3, 0.5, 0.7, 0.9; 100 towns per level | base (`T110b.elevated.prosperity`) |
| 110 (b): an elevated road likelier with dossier landmarks on high ground | higherWith, `stopAfter` the elevated-road stage | `raised` elevated, `generated` | CITY on the same site; the fixture dossier with and without a high-ground landmark (DR35); 200 per cell | base (`T110b.elevated.landmarks`) |
| 111 (d): on arid seeds the share of households within walking distance of water exceeds the non-arid baseline | higherWith, effective instances | `walkWater` per household; the factor the climate row (arid against its temperate counterpart, same seeds) | TOWN, CITY and METROPOLIS strata, 200 towns per cell on `null/T111-1/…`; the village rungs V07's (T-V7-58) | base (T111-1); V07 T-V7-58; V06 T-V6-71 over epochs |
| 111 (d): arid sites still draw rivers, lakes and coasts at the arid row's chances | rate, exact, `stopAfter` S1 | `waterPresent` per water kind against the arid row's chance cell for that kind (§4.2 S0's feature table) | arid sites at every base rung, ≥ 200 towns per kind | base (T111-3) |
| 111 (d): the richest band's mean distance to water below the middle band's | most | `richNearWater` per arid town | arid CITY and METROPOLIS towns, ≥ 100 towns holding both bands | base (T111-4) |
| 111 (d): oases only on arid sites unless drawn or supplied; an oasis is water for every reader | none: conformance | — | — | base (T111-2) |
| 112 (a): every legend pair of every checked variant above the contrast threshold | none: the style check (§8.2, B-ZOOM) | — | — | base (T112-1); its register line V12 §3.11 |
| 113 (e): a void lost on its last open link's closing and restored on reopening | exactStates | the excavation reading and dwellings per named cluster | V04's lost-access fixtures with its scripts: seal, cave-in, brick, demolish-above; reopen, dig, excavate; undo; save and reload; an epoch's seal and a later epoch's reopen | V04 T-V4-77; base T113-5 |
| 113 (g): the city-to-village fixture, the byte-stable replay, the refounded fixture, buried ruins past the threshold, a symbolic peak only with evidence | none: conformance (fixture properties and digests) | — | — | base T113-1 – T113-4, T113-6; V06 T-V6-70, T-V6-72; V04 T-V4-76 |

**The raised-way bars** (J-V12.44). Only two clauses of item 110 (b) are leanings — the elevated road's "likelier with
prosperity and with dossier landmarks on high ground"; "no reason, no raised way", the rung gate and the cap are
conformance (V12 §1) and guards (V12 §3.7.4), and an "off" arm of a viaduct or aqueduct would measure that conformance,
never a tendency. So:
* **`T110b.viaduct`** runs `presence` on a forcing site: a frozen S1 output whose ravine runs across the whole frame, so
  every primary's best course crosses it deeper than `viaduct.minDropM` and the detour costs more than the span for every
  value of the span cost row's range — p is then the table chance at the rung, and a cheap detour cannot make the rate
  fall below it. Registration checks this on the frozen site (the route solver's costs at the row's range ends) and
  refuses a site where a detour could win.
* **`T110b.aqueduct`** runs `presence` on a site whose frozen S1 output and roster give a water need above the walled
  supply and one higher spring in reach, the era and culture rows neutral.
* **`T110b.elevated.prosperity`** runs `trend` over the settlement's prosperity input `intent.wealthLevel` (§7.7; DR6 is
  the dossier's route to it) on a site with exactly two high wards and one lower district between them, so there is one
  candidate and the cap never binds.
* **`T110b.elevated.landmarks`** runs `higherWith` on the same site, the factor the fixture dossier's landmark on high
  ground at one end of the candidate link (V11 §3.24.2's `elevated.landmarkFactor`, read by V11 §3.24.7 (4)'s high-ground
  test) against the same dossier without it, traced through DR35. The `raisedWays` chances and factors it and the
  prosperity trend read are V11 §3.24.2's (`elevated.bandFactor` by band, poor 0).

Their fallback is V12 §3.6b's default bounded by the owner's minima (V12 §3.7.2): a presence bar still failing with its
chance at the floor is *not produced*, and generation is never switched off.

**The water bars (item 111 (d); J-V12.86).** `T111-1` compares the same seeds under an arid climate row and its temperate
counterpart (common random numbers), each household one instance, the counts deflated by the design effect so a large
town's households count as the effective sample they are; `T111-3` runs `rate` per water kind at the site stage, its
expected value the arid row's chance cell for that kind, so the bar reads the table at the running version and a tuned
chance moves the expectation with it; `T111-4` is one instance per arid town. A failing water bar takes V12 §3.6b's
default fallback on the row that drives it — the water-pull weight, the arid water chance, the prosperity water term (V11's
item-111 rows) — never the climate rows' gates.

**Pre-decided fallback** (the default; a bar's owner may state its own): as V12 §3.6's — after a confirmed failure, the row
that drives the tendency moves once (a weight doubles; a chance's odds double within its column's range; a mechanism
threshold takes its volume's stated second value), clamped to the column's range and never across an owner-stamped cell or
minimum, as a declared `fallback` run (V12 §3.7), and the bar re-runs; still failing, it is reported *not produced* in
`known-defects.json` (§13.7). A bar never passes by relaxing its rule (J-V12.26). A property bar (`exactMonotone`,
`exactBound`, `exactStates`) has no fallback: a violation is a defect of the mechanism, entered in `known-defects.json`
with its record and step, and its milestone does not exit until it is fixed.

### 3.7 Tuning runs — table-version bumps with declared shifts

**3.7.1 When a run opens.** (a) A P row fails its band at a milestone's parity run and its row names a tuning route
(§13.5's street-turning fallback sets `headingSigma` so the organic median equals FTG's); (b) a register entry's confirming
measurement fails and its fallback moves a table value (a `fallback` run: §1.1's doubled rung modifiers, §13.7's O18 (j)
frontage CV, item 24's market-siting weights, item 30's reach weights, item 71's prestige weight); (c) a volume's
calibrate-later constant falls due — an entry of `method: 'tune'` (V12 §2.6): V02 §3.10.8's measured-rate `FM` entries at
M6c, and V07's one measured-rate `VG` entry, `rules.race.densityPower@VG` (V07 §2.2a, §3.15), at V-M4, opened there only
when T-V7-23's accepted-share row misses its band — every other `VG` entry is code-read or `fixed:` and never a run's cell —
each a `reference` run on the preset's own entry (V12 §3.7.2 (3)); item 34's depth rows and `cut.flattenM` at M0 as
`reference` runs on the bent-cut spike's S8 harness, the first product code that reads them (at M-1 no product exists, so
there the NG and MFCG distributions only cross as `Baseline` rows); (d) the corpus stage (V12 §3.10). The calibration seat
(implementer tier: it reads only `plat/`) writes the run's spec to `plat/calibration/specs/<id>.json` — id, cells with
bounds and step, targets, guards, search, settings — and commits it before the first evaluation, so the objective is fixed
before any result is seen (J-V12.10).

**3.7.2 What a run may touch.** A spec is refused before any evaluation (`status: 'refused'`, naming the rule) unless every
cell: (1) is `calibratable: true` in the registry (V11 §2.1); (2) has a provenance source other than `owner`, `owner-eye`
(an owner pick moves only by the owner, V12 §3.9), `corpus` (the palette targets, V12 §3.10.7), `host` and the provenance
source `sf:⟨file⟩@⟨baseline⟩` (V11 §2.2; item 534: the owner's own program's rows pinned to the port's baseline, the ladder
table among them, item 108 (a); they move only when that baseline moves, V08), and carries no `ownerRule` stamp (V12
§2.10). Item 110 (b)'s rung gate ("A TOWN gets them only by declaration") is no cell at all: V11's `raisedWays` key admits
only CITY and METROPOLIS rows (provenance `owner`, V11 §3.24.2), so no run can open a TOWN chance, and an `editTable` or a
pack adding one is refused by V11's schema; (3) is a default value, never a `presets.MFCG` or `presets.FTG` entry; a
`presets.FM`, `presets.VG` or `presets.NG` entry only when a register entry names it (V12 §2.6's `preset` target — a
measured-rate entry awaiting its reference), and then only by a `reference` run against that preset's own reference
(`layer: { preset }`, V12 §2.5: V02 §3.10.8's free-frame run against Fantasy Manor at M6c; V07's one run against VG at
V-M4, on `rules.race.densityPower@VG` alone, V07 §3.15) or by a `fallback` run applying that entry's own pre-decided
fallback (V12 §3.7.1 (b): V02 §3.10.8's `hipInset` 0.5; the `VG` entry has none — its fallback is `not-achieved` (V07
§3.15), so a rejected `VG` run leaves the entry at its value, reported to the owner, and no `VG` fallback run exists),
either run touching no default value and no other preset's entry; a preset entry no register entry names — one read from
its reference's code (`ref:… (code)`, V02 §3.10.8's layout families) or an off value with a `fixed:` note (V11 §2.2) — is
never a run's cell; every `presets.NG` entry is a code-read value or a switch's on value (V01 §3.15; J-V1.98), so no `NG`
run exists. The MFCG and FTG presets' reference values are never tuned, and the FM and VG presets' measured-rate cells are
set only against their own references or by their entries' own fallbacks (J-V12.11, J-V12.63, J-V12.67); (4) lies in a
table whose registry `readers` StageIds (V11 §2.1; the dist manifest's `stageReaders`, V11 §3.2.1 step 7 — a module id
never counts) include a stage in the target metrics' `stages` (V12 §2.1), so no run reaches for an unrelated knob; (5)
keeps `lo`, `hi` inside its column's declared `range` and at or above any owner-stamped calibration minimum — the CITY
and METROPOLIS raised-way chances' and per-rung caps' minima, each stamped `ownerRule: '110 (b)'`, their values V11
§3.24.2's (row 80; the chance's minimum is E1's possibility floor, reused so that one small-chance constant exists), so
the owner's "raised ways for cities is fair for the generator to generate" can never be tuned, fallen back or reconciled to
zero (J-V12.42); a calibration minimum binds runs, fallbacks and corpus packs, never the parity presets' extension zeros
(item 23), a no-op pin's overlay (V12 §3.7.8) or a user's own override; and (6) no other open run holds it. At most four
cells per run. A fallback's doubled or halved value is clamped the same way: to its column's range and never across an
owner-stamped minimum.

**3.7.3 The search.** `grid` evaluates every listed candidate (≤ 16). `golden` searches one cell on [lo, hi] by
golden-section, every probe snapped to `step`, the endpoints evaluated first, stopping after `maxIter` (≤ 12) probes or
when the bracket is under two steps. `coordinate` runs `golden` on each cell in the spec's order holding the others, for
≤ 3 rounds, stopping after a round in which no cell moved by a step. No gradient method: the objective is a statistic of
generated towns, noisy and stepwise.

**3.7.4 The objective and its guards.** Each candidate generates the train family `tune/<id>/train/<rung>/<water>/<i>`,
30 towns per setting — the same seeds for every candidate (common random numbers), so candidates differ by their values
and not by their towns. Score = Σ wₜ dₜ² + 10 × (guard flips), where for a target scalar row dₜ = (ours − (lo + hi) ÷ 2)
÷ ((hi − lo) ÷ 2) with V12 §3.5.2's band, for a weakness row dₜ = max(0, (bound − ours) ÷ margin) on the failing side,
and for a distribution row dₜ = ours ÷ (1.25 × the reference spread). A **guard flip** is any row passing in `before` on
the train seeds that fails with the candidate: every §13.5 row on those settings under its preset, the C bars of §13.2 that
run on those towns, and every owner-rule bar (the owner's rules outrank parity: a run can never buy a parity number with
an owner rule). **The TOWN guard:** a run any of whose cells is a raised-way row (a chance, a cap, `viaduct.minDropM`, the
span cost) adds one TOWN setting to every candidate's evaluation, whatever its targets — 30 towns on
`tune/<id>/guard/TOWN/<water>/<i>` — where `raised.generatedBelowCity`, `raised.reasonMissing` and `raised.overCap` are C
bars that must stay 0 and a moved TOWN S4 or S5a – S5d isolated digest is a guard flip (J-V12.42). Ties go to the candidate
nearest `from` in steps, then to the lower value.

**3.7.5 Holdout and acceptance.** The chosen values run on the holdout family `tune/<id>/holdout/…` (30 per setting, never
seen by the search), and once on the guard's **fixture suites** (`GuardSet.fixtureSuites`): B-DOSSIER-lite's generations
with their dossier-primacy bars (T73-1 – T73-10, T85-1 – T85-2, T20-13, T88 on B-DOSSIER-lite, §13.8), the owner-rule hook
fixtures (T20-7 – T20-13, T63 – T72, T76-1 and the g items' fixture bars) and the two known-city fixtures' structure lists
(V12 §3.14) — about 2 – 3 CPU-min. Calibration never *targets* a dossier fixture but always *guards* it (V12 §1b). The run
is **accepted** when every target row passes its band on the holdout, no guard flips there and no fixture-suite bar that
passed before fails; otherwise **rejected** (`guardFlips` naming the bar), the cells stay at `from`, and the register
entry's pre-decided fallback applies — if that fallback moves the threshold instead of a mechanism, the entry becomes
`not-achieved` (§13.7). A run whose best candidate is `from` itself closes rejected ("already at its best"). A run that
exceeds `budgetCpuH` stops, `aborted-budget`, applying nothing; it may be re-specified once with a narrower bracket.

**3.7.6 Emission.** An accepted run is released as one declared shift:
1. The seat writes the chosen values into the table's source (V11 §2.2) — into the cell's `presets.FM` or `presets.VG`
   entry for a `layer: { preset }` cell, the default untouched — with provenance `ref:<reference> <behaviour>` (a
   reference run — the behaviour matched is the anchor, §17.1 (6)), `own` (a fallback run) or `corpus` (V12 §3.10), and
   `evidence` = the target rows' baseline ids and the run id (V12 §2.10).
2. `plat tables compile` bumps the table's minor version (V11 §2.1: minor = a declared output shift).
3. The golden tooling computes the stage-isolated digests (§6.4); every stage whose digest moved gets a `ShiftRecord` with
   cause `{ kind: 'calibration', ref: <run id> }`, its statistics being the targets with the direction ours moved on the
   train seeds, its `d5SeedsChanged` listed; downstream stages get cascade records (§13.3).
4. The release carries the output-version bump (§6.4); existing documents replay under their own versions.
5. The register entry gains the run in its history (a cells row, V12 §2.6, where the run changed the entry's target in
   place) and its new status; the release notes gain the metric's `plain` sentence ("lanes now bend {dir}: {ours} per
   100 m, FTG's band {band}").
6. The first nightly after the release re-runs B-REF on the `bref` seeds and writes `after` into the run record; a target
   that passes on the holdout and fails on `bref` enters `known-defects.json` and opens one follow-up run.

**Feature switch-on (item 110; J-V12.54).** Item 110's four families ship switched off and are switched on by four
separate releases, upstream first. Each release registers its family's row sets in the default pinned table set for the
first time — before it, every document reads V11 §3.24.0's parity-neutral default, which is off (J-V11.12) — and ships
with its own `ShiftRecord`s and cascades of cause `{ kind: 'feature', ref: 'item 110 (b)' | 'item 110 (a)' | 'item 110
(d)' | 'item 110 (c)' }` (§13.3), so every shift names the one rule that moved it:
1. the `raisedWays` row set — S4, S5a – S5d and the stage that commits elevated roads. The isolated S4 and S5 digests of
   every THORP – TOWN golden stay unchanged: a moved one fails CI and is not a declared shift. Its records name every CITY
   and METROPOLIS golden where a reason arises (`raised.count` by kind, expected `up` there and `none` at TOWN), and, where
   they move, V05's two sky goldens, V06's H-100, K1 and K2, and the B-DOSSIER-lite towns carrying the water-system record
   (its met need, cap step and cistern terminal, V11 §3.24.7 (3)).
2. the `terrace` and `retaining` row sets — S10 and S11's levelling and the district-edge source.
3. the `deck` and `deck.landmarks` row sets — S10's deck faces and deck plots; K1's golden moves here (its bridge's deck
   plots, V12 §3.14).
4. `roster.specialisations` — reachable only through the stepped class rows, so it moves only goldens that hold such a
   class.
Every bump leaves the `MFCG`, `FTG` and `FM` presets' goldens byte-identical (V12 §3.4.4). The release notes (V12 §5.5)
carry one plain line of new behaviour per bump beside the calibration section — for the first: "cities may now build
viaducts, raised roads and aqueducts where the ground or the water calls for them; you can remove any".

**3.7.7 The cost shortcut.** A candidate's towns are regenerated from the first reader stage of the cells' tables only (the
registry's `readers` StageIds, V11 §2.1: the manifest's `stageReaders`; a cell only an epoch phase reads re-runs the history
from that phase), on frozen upstream outputs per seed — the golden tooling's stage isolation (§6.4) — which is exact
because no upstream stage reads the cell. A cell read at S0–S2 regenerates the whole town.

**3.7.8 No-op pins — one engine for every owner item's pin** (E-20; J-V12.43, J-V12.85). §13.2's convention (5) makes every
no-op pin of the owner items a `NoOpPin` registration on this engine ("with the item's rows off, byte-identical to the
base"); each owner registers its suites here and cites it. The pins:

| pin `id` | base bar | its off form (each value stated at its home) | the family lands on | owners' pin tests (each the owner's §7) |
|---|---|---|---|---|
| `item102.sun` | T102-1 | `w_sun` 0 and item 111's climate cell at its temperate value (the prosperity drivers, V11 §3.3.5) | M2b | V01's T-V1-41; V05's T-V5-19 (c) |
| `item103.coverage` | T103-3 | the coverage weight 0 (V11 §2.3's coverage rows) | M2b | V05's T-V5-22 (b) |
| `item105.web` | T105-4 | V11 §3.7.4's web off form | M2b | V05's T-V5-22 (k); V06's T-V6-44; V07's T-V7-33 |
| `item106.barrier` | T106-5 | the `barrier` closure and the stretch profile off (V11 §3.16's barrier rows) | M2b | V05's T-V5-27 |
| `item107.balance` | T107-4 | `comfortM` and the spacing radii 0 (V11 §3.7.4's off form for item 107's cells), against items 103 and 105 alone | M2b | V05's T-V5-22 (k) |
| `item109.underground` | T109-6 | the ruin chance 0 and the relief, boost and fissure rows at the base's values (V11 §3.23) | M6-U | V04's T-V4-47 |
| `item110.raised`, `item110.terrace`, `item110.deck`, `item110.stepped` | T110-7 | V11 §3.24.0's switch table, one row set per family (the stepped family's included, which the owner's list does not name but a pin leaving it on would not isolate) | M3a, switched on by V12 §3.7.6's four bumps | V01's T-V1-4 (e), V02's T-V2-50, V03's T-V3-34, V04's T-V4-69, V05's T-V5-15, V06's T-V6-65, V07's T-V7-52, V11's T-V11-31, this volume's K1 and K2 |
| `item111.water` | T111-5 | the oasis chance, the water pull and item 102's climate cell at their neutral values (V11's item-111 rows, V11 §3.1's registry) | M1 (the oasis), its pull at M2b and T2's spring flag at M3a under the same pin | V07's T-V7-58 |
| `item113.history` | T113-7 | `history.replay` false (§4.11) | M6-E (V06's E9) | V04's T-V4-76 (h); V07's T-V7-59; the base's suites on V06's history fixtures (H-HISTORY) |

Every pin also holds the base's own suites (the golden suite and the hook fixtures). The rules:
1. **"Off" is the item's off form** — each value stated at its home only (V11 §3.24.0's five row sets `terrace`,
   `raisedWays`, `deck`, `roster.specialisations`, `deck.landmarks` for item 110; V11 §3.7.4 for items 105 and 107; the
   cells §13.2's bar names otherwise) and written here only through the overlay, which the build copies from those cells;
   the same form is the table's parity-neutral default where the item ships off and the value the parity presets resolve.
   Every off value lies inside its column's range, never an out-of-range sentinel; the owner-stamped calibration minimum
   of V12 §3.7.2 (5) binds calibration, not a pin's overlay or a preset (J-V12.43, J-V12.56). A pin's overlay sets its
   family's off values; the cells stay editable like any cell (everything is editable).
2. **The landing gate and the off-state set.** Every commit that lands a family's code before its switch-on produces zero
   `ShiftRecord`s on the pin's suites: the code is present and inert. A family that ships off and is switched on by a later
   release (item 110's four, V12 §3.7.6) records its off-state digests at that bump; a family whose landing change switches
   it on records them in that change — the suites run under the overlay must be byte-identical to the goldens committed
   before the change, and their digests become the off-state set; a family landing in the milestone that records the
   first goldens (M1; no golden exists before it, D-24) records its set with them, its gate vacuous; a family landing in
   steps (item 111: the oasis at M1, the pull at M2b, the spring flag at M3a) re-runs the gate at each step against the set
   the step before recorded.
3. **After switch-on.** The off-state digests are a parallel golden set under the overlay (`plat/goldens/noop/<id>/o<k>/`).
   CI runs the suites under the overlay nightly, and in the PR tier on the two PR golden seeds, and requires byte-identity
   with the set. A change whose cause is the pinned item may never move the off-state set; a declared shift of any other
   cause re-records it, and its record must list, per stage, the same moved stages as the main set shows for the towns
   that hold none of the item's entities — so a leak of the item's behaviour into the off state is caught even across
   unrelated shifts, and the set never goes stale at the first unrelated change.
4. **The code properties, asserted by name.** The item's draws come only from their own stream labels (§6.1); an entity
   kind with no instance is absent from the document and from its digest, never serialised as an empty array; no arena
   part is allocated for an absent raised way; an older record gains no written default — the reader supplies it.
5. **Tested** by T-V12-37 (item 110's pins and bumps) and T-V12-45 (every pin of the table): a planted draw on a shared
   stream fails the pin, a planted empty array fails it, an unrelated planted table shift re-records both sets with
   matching stage lists, and a pin bar §13.2 or a volume's §7 names with no registration fails.

### 3.8 Reference drift

`research/baselines/watch.py` runs at each milestone's start and weekly: it resolves each web reference's live build (the
itch build of MFCG, NG, VG and Fantasy Manor through the profiler's target resolver; FTG's server version as the capture
date and create-request hash) and appends a line to `research/baselines/drift.md`. On a change, the pin stays; the capture
plan runs its same formulas on the new build and the rows are added under the new build, reported beside the pinned rows
and gating nothing. **At the next milestone boundary the pin moves to the newer build** — we compare with the product the
owner can see — by the baseline seat, as a `ShiftRecord` with cause `baselineShift` that lists every row whose verdict
flips; the old rows stay as history (J-V12.13). FTG cannot be seeded and changes on its server silently: its pin is a
capture-date range, and when two of a size's three new captures fall outside the pinned rows' spread on the same metric,
the next boundary opens a new pin (J-V12.25). VG's change of geometry for one seed between builds 19251041 and 19365073
(§13.5) is the precedent this rule answers.

### 3.9 The owner's sittings — one panel engine

**3.9.1 The registered panels and the four sittings.** The owner sits only at M1 (the look check), M2b, M4 and M5,
batched, about an hour each (§13.6 (1); J122, Q-V12-2). Every other panel is registered on the same engine and is rated
at one of those sittings when its build has exited by then; otherwise it stays *provisional — not rated* and is offered
with every release until rated (§13.6 (7); J122).

| panel | gate a rated pass claims | groups (pairs) | extras | spec owner | sat at |
|---|---|---|---|---|---|
| M1 | diagnostic (§13.6 (1)) | MFCG 30 (per rung five `none`, five `coast+river`), FTG 6 (three per rung, TOWN and CITY) | threshold strips due at M1; labels | base | M1 |
| M2b | "the base at parity" | as M1 (`lit` against FTG) | strips due at M2b; labels | base | M2b |
| M4 | "mastered" | as M2b; plus the **M4-110** SOLO group of six items (below), which confirms item 110's register lines and gates nothing of M4's claim | strips; the `house` pick (§13.6 (8)); labels | base; the M4-110 group V12 | M4 |
| M5 | the stage-2 gate | NG 20 (five per template), `preset: 'NG'`; beside them the same twenty seeds under `'default'`, shown unrated, and M4's MFCG and FTG groups re-offered on the new default preset, rated by §13.6 (6) (V01's T-V1-32; Q-V1-1, J122) | strips (S4 (d)) | base (item 498) | M5 |
| V-M4 | the village at parity | VG pairs per V07 §8 | per V07 | V07 | M5 when V-M4 has exited by then (the village runs beside M5); else provisional |
| V6-E7 | diagnostic: the histories read as historically faithful (V06 §12) | AB (`history`) 10: ten CITY seeds, each run through H-100's script and shown at its last epoch, against the same seed generated fresh at that epoch's population; questions `realism` and `legibility` | — | V06 | M5 when E7 has exited by then (M6-E runs beside M5); else provisional |
| V3-P6 | diagnostic: the plan rung's soft bands (V03 §8, P6) | DW 20: plans of six classes in three bands beside Dwellings houses of like size | — | V03 | provisional (P6 follows M6, after M5) |
| M6 | "stage 3 at parity" | Fantasy Manor 20 | the ladder street (V02 §7.5 (2)) | V02 (item 499) | provisional (M6 follows M5) |
| V4-U5 | diagnostic: the underground reads (V04 §7); rated, it confirms the underground's `panel` register entries, the crypt and catacomb rows among them | SOLO 30: ten CITY and five METROPOLIS underground bands, each seed in the historical and the navigable mode, shuffled, each framed to hold the cathedral's crypt (or the largest church's) and the largest catacomb complex; questions `legibility` and `realism` (V04's "plausibility") | — | V04 | provisional (M6-U follows M5) |
| M6-sky | none: a descriptive set, never a gate (V05 §7) | NG 5: island close-ups in `hatched` beside Neighbourhood patches; question `reads`, subject "a floating patch" | — | V05 | offered with every release from M6-sky; descriptive either way |
| M-CAL (and each later run's `M-CAL/<layer>`, the same form, offered only when that run moved a cell; V12 §3.10.1) | the reconciliation decision (V12 §3.10.6) | AB (`reconcile`): per frame, five seeds per rung the frame covers, `none` water, before against after | re-offered owner-eye strips; the palette pick if V12 §3.10.7 finds a mismatch | this volume | provisional (M-CAL follows M6-sky); until rated every frame's pack ships selectable |

**The batch** (J-V12.84). A gating sitting holds its own panel always (M4's with its M4-110 group; split into sessions where
it alone passes the hour), then, in this order and while the panels' `minutes` (V12 §2.8; V12 §6's rows) sum to at most
60: each staged panel whose build has exited since the
previous gating sitting, in §16's order; then at most one earlier panel still *provisional — not rated*, the oldest first.
A panel that does not fit waits for the next gating sitting, or after M5 is offered with every release until rated. The
page splits a sitting into up to three sessions within §13.6 (7)'s seven days. A diagnostic panel (M1) superseded by a
rated panel of the same reference is no longer re-offered. A re-offered panel is re-rendered under the current output
version and freshly sealed (a new salt and commitment); earlier partial answers are kept as notes and never resumed against
new images. M-CAL shows at most two frames per sitting.

**The M4-110 group** (J-V12.45): six SOLO items inside the M4 panel, about five minutes — K2 rendered once (its authoring
paths share a digest), and five CITY or METROPOLIS towns on V12 §3.6b's forcing sites showing between them a viaduct over
a ravine, an aqueduct on arches, an elevated road between high wards, a terraced hill ward with its retaining walls, and a
mole with deck buildings beside a stepped temple; framing `walledPlus10` centred on the feature; questions `legibility`
and `realism`; SOLO's ⌈2n ÷ 3⌉ Yes. A random D-5 pair seldom shows these things, so only a group made of them can confirm
their rows.

**3.9.2 Assembly.** `plat d5 seeds <panel>` writes `seeds.json` from the formulas (§13.6 (2); V12 §2.4), reading only the
committed numbers-only inputs. `plat d5 render <panel>` renders our side under `PanelRender` (V12 §2.8): 1 600 × 1 200 px
PNG; `walledPlus10` frames the larger side's outermost curtain (or built outline) with a 10 % margin and puts both sides at
that metres-per-pixel; `overview` is FTG's first capture per rung (§13.6 (3)); `hood`, `building` and `village` fill the
frame with the hood, the building or the village, sizes matched by count; `plan` fills the frame with the building's
footprint plus 10 %, both sides at matched metres per pixel by the footprint's long side; `underground` frames the walled
area plus 10 % at the city band, placed so that the cathedral's (or the largest church's) crypt and the largest catacomb
complex lie inside it (V4-U5); `island` frames the island's rim plus 25 %; labels and furniture off, the fixed sun, and
every PNG text chunk stripped so no file names a generator. The research-side panel seat prepares the reference side the
same way (an MFCG export at the pair's seed; an FTG capture screenshot at the matched framing; an NG re-render at the
pair's seed; the Fantasy Manor and VG images of V02 and V07), resampled to the same metres per pixel, furniture cropped,
and `research/d5/build_sitting.py` assembles the page.

**3.9.3 Sealing.** The panel seat draws a 128-bit salt from the operating system's random source; each pair's side (a coin)
and the pair order (a shuffle) come from a testkit stream keyed by that salt; the key — salt, order, sides — is written
research-side, and only its commitment H128(canonical key) is committed to `plat/goldens/d5/<panel>/key.commit` before the
owner sees anything. A public formula would let anyone predict the sides; the secret salt is the one non-reproducible value
in this volume, on purpose (J-V12.14).

**3.9.4 The sitting.** The page is a single local file the panel seat hands the owner — never published, because the
reference images are other creators' work (J-V12.20). One screen of plain-words introduction; then one pair per screen,
the two maps side by side, click to view either full screen, three questions with Left / Same / Right and an optional
one-line note; a progress bar; answers saved as they are given in the browser's storage under the panel and its
commitment, so a closed page resumes where it stopped; up to three sessions within §13.6 (7)'s seven days. After the blind
pairs: the threshold strips (three renders labelled A, B and C in a shuffled order, pick one or "same"), the `house` sheets
at M4 and later, the ladder street with M6's panel, and the non-blind label pass. A SOLO item shows one map with Yes / No
per question. **The question texts** for the new forms (§13.6 (5)'s rubric is comparative): SOLO `legibility` — "Can you
read this — its ways, rooms and ways in — at this size?"; SOLO `realism` — "Could this lie in (or under) a real medieval
town?"; `reads` — "Does this read as {subject}?". **Storage.** The page tests its browser storage on load; where there is
none (a private window, a browser that gives a local file no storage) it says so on the first screen and offers "Export
answers" after every screen instead. **Returning the answers.** The first screen says in plain words that "Export answers"
saves one file to the Downloads folder and that the panel seat collects it from there; nothing else is asked of the owner.
"Export answers" writes `answers.json` (V12 §2.8). Keys: ← left, ↓ same, → right (Y and N on a SOLO item), 1–3 choose the
question, O a note, P pause.

**3.9.5 Verdict and record.** The seat reveals the key and crosses `answers.json` (notes hashed) and `key.json` into
`plat/goldens/d5/<panel>/` by V12 §3.3; `plat d5 verdict <panel>` reads only those files under `plat/`, checks the key
against its commitment, the answers against the pair list (every pair, every question — a rated verdict needs them all; a
file still incomplete after seven days records the panel *provisional — not rated* with the answers kept; J-V12.27),
computes the verdicts by §13.6 (6) and the spec's `passRule`, and writes `record.json` (§13.6 (9)'s `D5Record`) and the
research-side mirror (§13.3); the milestone record lists every panel sat or re-offered at it (`MilestoneRecord.d5` as a
list, item 493). Each strip pick becomes an `owner-set` register entry with provenance `owner-eye <panel>` (V12 §3.11),
released in the next table version as a declared shift; the change that releases it runs `plat calibrate register`, which
appends that cells row (V12 §2.6; J-V12.83).

### 3.10 The corpus reconciliation — a process, milestone M-CAL

**3.10.1 When it opens.** On the owner's word, recorded in `ReconciliationRecord.opened`, at its place in §16's order —
after M6-sky (J122) — once the standalone generators it calibrates have exited: the base (M4), neighbourhoods (M5),
buildings (M6) and the village (V-M4), the order of docs/DEFINITION.md §1 and §13.9 ("after the standalone generators").
In J122's order the underground (M6-U) and the sky (M6-sky) have exited before it, so their calibratable cells — the
default line's `corpus` entries and the named lines' corpus stages — are M-CAL's like every other column whose first
compiled cell landed before M-CAL's record. **A later run** (J-V12.75) is `M-CAL/<layer>` (V12 §2.9's `CorpusRunId`): it
exists only for the columns whose first compiled cell landed after M-CAL's `ReconciliationRecord` was committed (V12
§3.11's *The due's corpus run*) — the evolution engine's and the plan rung's last steps, which §16 runs beside M5 and M6
and which may land after M-CAL (`M-CAL/evolution`, `M-CAL/M6-P`), the village's underground V-M2u (`M-CAL/under`), and
any later milestone (`M-CAL/<milestone>`) — and it opens, as M-CAL does, on the owner's word recorded in its own `opened`,
once its layer's last milestone has exited (M6-U, M6-sky, M6-E, M6-P; the named milestone for any other). It reads
M-CAL's declared frames (`frames.json`; a frame declared since follows V12 §3.10.2 step 3 unchanged), measures only the
metrics of the entries due at it, and applies V12 §3.10.3 – §3.10.6 unchanged: its accepted changes ship as new versions of
the frames' historical packs, and its panel, id its own run id, is offered only when it moved a cell; otherwise its
entries close by its record (E1's reachability rows, E4's checks, `fixed` with "no admissible frame") and `panel` is
`null`. Its exit is a `MilestoneRecord` of its id, where an entry due there and still `provisional` fails as at any exit
(V12 §3.11). The underground's rows (item 109's relief, mining, fissure, ruin, access, crypt and catacomb rows; item 113's
buried former settlement's `former*` cells) are possibility-only by nature — no town plan frames an underground — so
their run is E1's reachability and E4's historical checks (a catacomb under a cemetery outside the walls, a worked-out
quarry turned ossuary, a cathedral crypt, a parish church crypt), never prevalence, and their values are confirmed by the
V4-U5 panel when it is rated (V12 §3.9.1; J-V12.37). Item 110's rows take E1's reachability and E4's checks the same way —
houses on a bridge, buildings on a mole or pier, a town's aqueduct on arches, a viaduct across a valley, terrace retaining
walls in a hill town, a stepped temple (region-bound) — and a witnessed TOWN raised way is reachable by declaration (item
101's T4), so it lifts nothing (V12 §3.10.4). Item 111's rows take E1's reachability (an oasis town, a desert town on a
river) and item 113's history rows E4's checks (a town shrunk inside its old walls, a church too large for its village),
never prevalence. Until M-CAL opens nothing reads the corpus; the two owner-opened exceptions stand as they are: the
palette bands of item 69 (§8.2) and the historical checks as evidence for rules (`partitioned/README.md`, J103).

**3.10.2 Intake (research side, the adapter seat).** The corpus lives outside this folder (§13.9); the adapter seat is a
research seat that reads it under the corpus's own laws (`partitioned/README.md`):
1. It reads the corpus's own manifest and lists its maps. It **never opens** the 53-plate blind holdout (it takes the
   holdout's ids from the corpus's own list and records only their count and a salted digest of the list), nor
   SettlementForge's own map-design documents; each exclusion is written to `CorpusMapMeta.excluded`.
2. It classes each map by evidence: a historical record → `record`; a measured plan whose metadata or scale gives metres →
   `surveyed`; a drawn or painted plate → `drawn`, even when it shows a scale bar, unless the corpus's metadata calls it a
   survey (the stricter class wins; J-V12.16).
3. **Before measuring anything** it declares its sample frames (`SampleFrame`, V12 §2.9): era × region groups of `surveyed`
   maps chosen by a rule that names no measured feature ("every surveyed plan of a town of region R dated 1200–1500 in the
   corpus"), with the member list's salted digest; a frame of fewer than 20 maps may be declared and is possibility
   evidence only. The declarations cross into `plat/calibration/reconciliation/frames.json` (`FramesFile`) by V12 §3.3
   before any row of their frames, so check C8 can refuse a frame row whose declaration's `CrossingRecord` is not earlier —
   pre-registration made checkable.
4. It maps each map's era and region onto our D-2 preset keys and each corpus trade label onto our class-family keys (for
   `use`), in a research-side table; no corpus word crosses.
5. It writes each map's `MeasureInput` (scale `metric` or `relative`) and the index of `CorpusMapMeta` rows.
6. It salts ids: `corpus:map:` + the first 16 hex digits of SHA-256(salt ‖ id), the salt kept in the adapter's folder
   (§17.1 (5)'s convention), so no place name enters `plat/`.
Measurement then runs `plat measure` per map and `plat baselines aggregate` per frame: a frame row is role *target*, a
per-map row role *descriptive*; both cross by V12 §3.3 with check C8.

**3.10.3 What the stage may change, and what it may not.** "What you have built is always the BASE" (owner, 2026-09-25),
read with item 23 (defaults emulate; extensions ride on top):
* **R1 — every change is a layer, never an overwrite.** A corpus value lands in the historical pack `historical:<frame>` —
  a sparse, versioned delta over the defaults, one per frame — and never in a table's shipped default. The pack sits in
  §7.6's **packs** slot, bound to its frame's D-2 era and region keys (item 382): it applies to a document whose era and
  region presets match the frame and to no other, so a document keeps its one preset slot for the D-2 era and region
  preset or a parity preset and still takes the matching layer (J-V12.49). The emulated defaults (`ref:` cells), our own
  defaults and the extension values all stay as built; the default town changes only where the owner adopts the pack for
  its frame (V12 §3.10.6; Q-V12-3 answered, J122). The pack's cells carry provenance `corpus` and evidence ids (V12 §2.10)
  (J-V12.15).
* **R2 — thresholds and bands.** A §13.7 threshold with provenance `architecture` may be re-signed where a frame measures it
  (§13.9 (4)); one with provenance `owner-eye` only by the owner's re-pick at the M-CAL panel, the corpus value shown as one
  option of its strip; a re-sign that moves a threshold onto its own measured value to make it pass is *not achieved*
  (§13.7). Corpus target rows join §13.5 and **gate the historical pack of their frame** (A2). Under the default preset
  they are role `descriptive`, reported beside the pack's verdict, until the owner adopts that pack; from then on they gate
  the new default for matching documents. No permitted run could fix a corpus row failing under the default, so it never
  fails a parity exit there.
* **R3 — owner-set values.** `owner` cells (the owner's rules) never move; item 69's palette targets move only by V12
  §3.10.7.
* **R4 — never.** Code, mechanisms, stage order and table schemas; a cell that is not `calibratable`; the parity presets (the
  layer is not part of them, so `MFCG` and `FTG` stay byte-identical, T-V12-24); the dossier row sets (§13.9 (7)); naming
  tables, grammars, word lists and packs (the corpus teaches drawing, never naming); engineering invariants and budgets
  (§7.6's reading rule).
* **R5 — scale and scope.** A metric that needs metres runs only on `metric` inputs; a frame calibrates only its own era and
  region layer.
* **R6 — owner rules** (J-V12.39). A cell or mechanism that implements a clause of an OWNER RULE item (the amendment items
  marked OWNER RULE, the owner's dated words in `docs/OWNER-INSTRUCTIONS-2026-09-25.md`, DEFINITION) is never an E1 or E4
  target: every such cell carries its `ownerRule` stamp (V12 §2.10), and a mechanism's clause is named in the register. A
  witnessed form such a clause excludes — a catacomb under a cathedral against 109 (k) (2), a village catacomb against 109
  (k) (1) — is written to `ReconciliationRecord.ownerExcluded`; it never enters `known-defects.json` and never a layer, and
  the owner's reconciliation report (V12 §5.5) lists it as an owner question with the recommendation "keep the rule". An
  owner-stamped calibration minimum binds a corpus run too: E2 may lower the CITY and METROPOLIS raised-way chances and caps
  only to their minima (V11 §3.24.2's row 80), recorded in `floorsHeld`, and the report says in plain words: "the
  historical maps show few raised ways; the owner's rule keeps cities able to build them, at the lowest chance".

**3.10.4 The evidence rules.**
* **E1 — possibility, not prevalence.** A `record`, a `drawn` plate, a single surveyed map or any map outside a declared
  frame proves only that what it shows is possible. It creates a **reachability requirement**: under some admissible
  setting the generator can produce the witnessed value. **The search** (J-V12.52): the settings are the grid of §7.8's
  controls whose parameters are read by the metric's `stages`, each at its range ends and middle, capped at 64 settings in
  the controls' registry order, crossed with the D-2 presets of the frame's era and region, and item 101's declarations
  where the witnessed thing is one an author can declare (a TOWN raised way by T4; a quarter by T5; an oasis by T2's spring
  flag); the value is **reachable** when any of 50 seeds at any setting gives the metric within max(`absFloor`, 10 %) of the
  witnessed value, or a declaration produces it (`by: 'declaration'`). An unreachable one is recorded in
  `ReconciliationRecord.reachability` and in `known-defects.json` ("the generator cannot make …", with the salted id) —
  unless R6 excludes it. Where the gap is a chance of 0 or an option off, the one value change E1 permits is raising the
  chance to the **possibility floor** 0.02, or lowering a certainty to 0.98, in the layer, with evidence "possibility", and
  only in a cell that a register entry maps to that metric and that carries no `ownerRule` stamp. E1 never sets a weight, a
  share, a frequency, a count or a band's centre (J-V12.17).
* **E2 — prevalence needs a frame.** Only frame rows — `surveyed`, n ≥ 20, declared before measurement, selected by a rule
  that names no measured feature — may set shares, weights, frequencies and band centres, and only in their frame's layer
  (J-V12.19).
* **E3 — drawing, never naming.** `drawn` plates may set a render family's look targets (the `render` metrics: palette,
  line-weight ratios, hatch density), each confirmed by the owner at the panel; never a structural metric, never a name.
* **E4 — the historical checks.** Their verdicts (J103) enter as possibility: SUPPORTED → the rule's note reads
  "corpus-witnessed (possibility)", the rule stays soft; CONTRADICTED for a program universal (no `ownerRule` stamp) → E1's
  floor in the layer, the note saying so; CONTRADICTED for an owner rule → R6 (an `ownerExcluded` row and an owner
  question); ABSENT → nothing changes and the row keeps "general historical knowledge, not corpus-witnessed" (item 104 (f)).
* **E5 — never used.** The holdout and SettlementForge's map design, recorded by count and digest only.

**3.10.5 The runs.** Per frame, corpus `CalibrationRun`s (V12 §3.7's engine, `kind: 'corpus'`, every cell's layer `{ pack:
'historical:<frame>' }`, V12 §2.5) in upstream-first order, so a later run fits on an earlier one's result: (1) the rung
profile's frame area, walled shares and stage rows (§1.1); (2) S3, S4, S5a – S5d — gates, the enceinte with item 106's
barrier rows (the defensibility thresholds and `wall.barrierReachM`, from the frames' `wall.barrierShare` and walled shares
on walled plans; the historical checks' wall rows as E4 possibility), the street heading and separation rows; (3) S6, S7,
S7b — the district rows; (4) S8, S9, S10a, S10 — the bent cut's rows, granularity, hidden shares; (5) S10b, S11 — the
siting families' and signature pairs' weights from the frame's `siting.*` rows (each compared with our statistic in the
same corpus variant, V12 §3.6), item 105's web weights and `comfortM` and item 107's spacing radii where the frame's `use`
labels measure them, the class mix; (6) S12a, S12b — greenery and hinterland; (7) the render looks (E3). Each run's guards
add every earlier run's targets, so a later run cannot undo an earlier fit. A proposed change that breaks R1–R5 or E1–E5
is not run: it is written to `ReconciliationRecord.refused` with its rule.

**3.10.6 Acceptance and the before-and-after panel.** The layer of a frame is accepted when: **A1** every change's evidence
is admissible (E1–E5); **A2** every frame target row passes on the holdout seeds under the layer; **A3** the parity presets'
goldens are byte-identical before and after, and every §13.5 row passes as before; **A4** the C bars and every owner-rule
bar pass under the layer; **A5** no threshold was moved onto its own measured value without *not achieved*. Then the
**M-CAL panel** (V12 §3.9.1) shows, blind, the same seeds before (the default) and after (the default with the layer), with
the three questions, the re-offered owner-eye strips and, if needed, the palette pick. **The decision** (Q-V12-3, answered
J122: a historical layer becomes a default only where the owner's sitting passes it) is taken **per frame**: a frame's pack
becomes on-by-default for new documents whose era and region match it when its after side is judged better or the same on
*realism* in ⌈2n ÷ 3⌉ of its pairs and is not judged worse on *legibility* on every pair of any rung; otherwise — and
while the panel stays *provisional — not rated* (it follows M5, V12 §3.9.1; `decision: 'pending-owner'`) — it ships
selectable, listed in the preset dialog as "historical (<era>, <region>)" (V09), and the default stays as built. A
document of another era or region never receives it. Adopting a pack is a recipe default change: an output-version bump
with its shift records (§13.3), documents made before replaying unchanged.

**3.10.7 The palette targets (item 69).** The owner released bands measured by the corpus's own instrument, whose
definitions this program cannot see (§8.2). At M-CAL the same axes are measured by **our** definitions (§8.2's code) on the
non-holdout `drawn` plates, and only §8.2's **corpus-sourced ends** are re-checked: paper luma, paper warmth and plate
chroma (two-ended: our p10 and p90 against the ends) and the darkest ink (one-ended: our p90 against its bound); our own
tolerances (ink warmth, `ink`'s chroma) are never re-signed by this step. If every re-checked
end lies within 3 units (luma, R − B) or 3 C* (chroma) of ours, nothing changes; otherwise the owner sees both bands at the
panel and picks. The pick is recorded (`ReconciliationRecord.palette`); a change re-signs §8.2's targets with provenance
`corpus` and evidence "remeasured by our definitions at M-CAL", and §13.4's palette bar with its chroma sweeps re-runs for
every family (J-V12.18). Until a pick is recorded the targets stand as released.

**3.10.8 Release.** Each accepted layer ships as a versioned preset table; the `ReconciliationRecord` is committed; the
release notes and the owner's reconciliation report (V12 §5.5) say in plain words what the historical maps changed, what
they could not change and why, and which witnessed things the generator cannot yet make.

### 3.11 The calibration register — no provisional number dangles

**Entries.** One per provisional number: every §13.7 letter (owner `base`); every §13.5 row whose fallback moves a
mechanism; §1.1's rung modifiers; every volume's calibrate-later model constant (never an application or engineering
constant, *The provisional-number lint* below) — written, with its default, its measurement (its metric ids, V12 §2.6), its
due milestone and its fallback, by the seat that lands that volume's milestone, `owner` naming the volume — from a named
register line, else from the default line below; the siting weights file g items 103–108 mark "general historical
knowledge, not corpus-witnessed" (`method: 'corpus'`, due M-CAL); the thresholds of V12 §3.6b's rules (owner `V12`, §13.7
rows by item 501); and each owner strip pick (`owner-set`).

**The default line** (J-V12.71, J-V12.73). A calibratable column (V11's `ColumnSpec`) of a registry table (V11 §3.1) that no
register line names — this section's lines with their catch-all, V11 §8's non-g lines, V02 §3.10.10's, V06 §8's, V07's one
`rules.race.densityPower@VG` entry (V07 §3.15), or a line a volume writes in V02 §3.10.10's form (in its own §8, or beside
its table as V03 §2.4 does for `roomProgram.json`, J-V3.118) — takes its one entry from this line, so no landing seat
invents a method, a metric or a fallback: id `cal.<table>.*.<column>`; `target.column` with `rows` absent; `owner` the
document whose source file holds the column's cells when the entry is written — the source manifest's author seat for that
file (V11 §3.2.1 step 1), as its volume, or `base` for a base section's seat — and, where two documents' files hold them,
the first the table's `rowsHome` names (V11 §2.1); a document that writes the column's cells later never moves it;
`method: 'corpus'`; `due` M-CAL — or, for a column whose first compiled cell lands after M-CAL's `ReconciliationRecord` is
committed, the later corpus run that takes its layer, `M-CAL/<layer>` by *The due's corpus run* below; `metric`
[`frame.<table>.<column>`]; `fallback` { mechanism: "at its due corpus run (M-CAL or `M-CAL/<layer>`) the run that targets
the column moves it under V12 §3.10's rules; a column no frame's run targets closes `fixed` with 'no admissible frame'",
`notAchieved: false` }; `line: 'default'` (V12 §2.6). The seat that lands the column's first compiled cell writes it in the
same change with `plat calibrate register --defaults --milestone <id>` (the landing change's milestone in V12 §2.8's form),
after its named lines' entries: the command writes this entry for every calibratable column that holds at least one
compiled cell and has no entry — a column of an empty table (V11 §2.1: every registry row ships as its schema's empty table
until its rows-home milestone) takes none until the change that ships its first row — in table-id then column order, never
touches an existing entry except to append the moved-value or rows-added row of *A value moved by its owning seat before its
due* below, is idempotent, and lists the ids it wrote or appended to in the register report (V12 §5.2). This floor is no
measurement plan: its corpus run moves no owner-stamped cell or gate and no value below an owner-stamped calibration
minimum (V12 §3.10's R6), and it binds no key, law, enumeration, switch, word list or dossier row set (V11 marks those
non-calibratable). As the volumes stand it binds, among others, volume 1's `hood.*` default rows, volume 3's
`roomProgram.json` columns its V03 §2.4 lines leave (PE's cells among them; J-V3.118), volume 4's V04 §2.3 rule-table
columns that no line below names (the buried former settlement's `former*` cells among them), volume 5's V05 §2.4 values
(its `IslandRule` cells `accessSiting.deckGapM` and `lineClearM` among them — V05's own, calibrate-later, never V11 rows;
J-VI.17) and volume 7's V07 §2.2 and §2.2a numeric cells other than its one `VG` entry — the farm table's village rows
among them, while the territory's area per head is derived from their sum and takes no entry (E-38; V07 §3.9 (1)); volume
8's dossier row sets and volume 9's and volume 10's tables take none — every column of V11 §3.1 rows 63–66 and 86–89 is
`calibratable: false` (J-V11.65, J-V11.81). **A later line** for a column the default line bound — a volume whose bars
confirm the column before M-CAL writes it in V02 §3.10.10's form and registers the bars it names — restates that one entry
in place while it is `provisional` (after its corpus run, M-CAL or `M-CAL/<layer>`, only under a new major table version,
V12 §4.2): the same id, the line's `owner`, method, metric, due and fallback, `line` dropped, a history row appended with
the column's value and the restating milestone (a cells row, V12 §2.6); never a second entry.

**The due's corpus run** (J-V12.75, J-V12.78). `--milestone <id>` is required: `--defaults` without it refuses, writing
nothing and naming the flag, and a volume's short citation of the command (`plat calibrate register --defaults`, as V01
§8.1, V03 §2.4, V04 §8, V05 §8 and V07 §8 cite it) runs with it. `<id>` is the landing change's milestone in V12 §2.8's
volume-qualified form (`M1`, `M2b`, `M3a`, `M3a-V2`, `M5`, `V-M0`, `V-M2u`, `V3-P1`, `V4-U3b`, `V5-P2`, `V6-E2` …); an id
that is neither one of §16's ids nor volume-qualified by V12 §2.8's rule — a bare `P1` — is refused, naming the form.
`--defaults --milestone <id>` writes each entry's first history row `{ date, value: the column's compiled cells by row key,
milestone: <id>, cells: true }` and its `due` from that milestone: `M-CAL` while no M-CAL `ReconciliationRecord` is
committed; once one is, the later run (V12 §3.10.1) that takes the landing milestone's layer:

| the landing milestone | `due` once M-CAL's record is committed |
|---|---|
| M6-U and `V4-U0` – `V4-U5` (`V4-U3b` among them; V04 §8); `V-M2u` | `M-CAL/under` |
| M6-sky and `V5-P0` – `V5-P6` (V05 §8) | `M-CAL/sky` |
| M6-E and `V6-E0` – `V6-E9` (V06 §8) | `M-CAL/evolution` |
| M6-P and `V3-P0` – `V3-P6` (V03 §8; PE is built inside M2b and M3a and lands under their ids) | `M-CAL/M6-P` |
| any other milestone (a later amendment's, M-SF's) | `M-CAL/<that milestone's id>` |

In J122's order (§16) M6-U and M6-sky exit before M-CAL opens, so their rows of this table apply only to a column one of
their steps lands later. The same substitution holds on every named line: a line's `corpus` stage or due at M-CAL, on a
column whose first compiled cell lands after M-CAL's record is committed, falls at that column's run by this table, and
the seat landing the column writes that due. A column landing before M-CAL's record stays due at M-CAL.

**A value moved by its owning seat before its due** (J-V12.77, J-V12.80). (1) *When.* The seat that owns a calibratable
column (its entry's `owner`) whose entry carries `line: 'default'`, is `provisional` and is not yet due (no
`ReconciliationRecord` of its `due` committed) may change the column's compiled cells in its table's source outside any run
(V12 §3.7) only when the change's golden check — §6.4's stage-isolated digests at PR tier over the main set, the no-op
pins' sets and the known-city fixtures' — finds no digest of a golden committed before the change moved by the new value. A
column a committed stage already reads may so move where no golden's digest depends on the moved cells
(`terrace.siteShare`, read from M3a by `terraceState` for the base's district-edge source, V01 §8.1, matters only where an
authored `terrace` site primitive covers a district, V01 §3.17.1 (1)); a reader stage the same change lands records its
first golden, or its feature's declared shift, with the moved value. Volume 1's M5 tunings are the case (V01 §8.1):
`land.spineFactor`, `land.ringSlack`, `land.smallShare`, `terrace.askGain`, `terrace.siteShare` and `ng.plazaM2` of
`hood.constants` (entries written at M1) and S7c's `select.*` weights of `hood.templates` (entries written at M3a), each
tuned to that volume's own acceptance bars inside the work item that lands its reader, before M5's exit. **Held:** should
the golden check find a committed digest moved, the tuning is not landed — the cell keeps its landed value, the change
records the hold with `plat calibrate register --hold <entry id> --milestone <id>` (one row `{ date, value: null,
milestone, held: true }`, its only change), the register report lists the entry "held: a committed golden reads it" until
a later cells row (V12 §5.2), and the owning volume's bar reads the shipped value (V01's T-V1-50). A move that would shift
a committed golden is a run (a `fallback` or `reference` run with its declared shift, V12 §3.7.6), never this row; the
command does not read goldens, the golden check does. A named line's entry moves its cells by its line's method — a run,
the panel rule's stated second value — and, on a `measure` line whose owning volume states a tuning before its exit and
whose bars no run may name (every `BenchBarDef.stages` `[]`, V12 §3.7.2 (4): V03 §2.4's lines, tuned at `V3-P6`), also by
its owning seat inside the exit's milestone under this clause's golden test and by the line's stated fallback applied in
the exit's change (*Milestone exits*); each such move appends (2)'s row while the entry is `provisional`, and (3) covers
the entry. (2) *The row.* The change that moves the value runs `plat calibrate register --defaults --milestone <id>`,
`<id>` its own milestone (V01 §8.1's `M5`, V03's `V3-P6`). On an existing default entry, or a named entry (1) admits (its
current stage `measure` and every metric that stage reads a `bar.` member whose `BenchBarDef.stages` is `[]`, which the
command reads; that the owning volume states the tuning is the landing review's check), whose compiled cells differ on the
row keys its last cells row holds from that row's `value`, the command appends `{ date, value: the column's compiled cells
by row key, milestone: <id>, cells: true }` — its only change: `status`, `due` (still dated from the first row's
milestone), the first row, `owner`, method, metric and fallback stay as written. On such an entry that is not
`provisional`, or whose due's record was committed before the change (a default entry's `ReconciliationRecord`; a named
entry's current stage's `MilestoneRecord`, the exit's own change preceding it), it appends nothing and lists the entry in
its report as a move owed to a run (`plat calibrate run`). A second run appends nothing. (2′) *Rows added.* A change whose
compiled cells hold row keys an entry's last cells row lacks, every held row key unchanged, adds rows: the command appends
the cells row to that entry — default or named, whatever its status or due, whichever seat lands the rows (V03's `V3-P1`
band rows of `roomProgram.circulation`, whose poorest-band class rows landed at M2b under owner `base`, V03 §2.4; V11's C3
rows of a column its C1 rows opened) — and changes nothing else. Rows added after the entry left `provisional` keep their
authored values and are reported "rows added after close", a later major table version restating the entry for them (V12
§4.2). A change that also changes a held row key's cell is a move, decided by (1) and (2), one cells row recording both;
(1)'s owner condition and (2)'s "owed to a run" read only the changed cells of held row keys. (3) *The check.* `plat
calibrate register --check` compares, for every entry whose target is a cell or a column without `preset` and whose
history holds a cells row, its target's compiled cells with its last cells row: a changed or removed cell of a held row key
fails — naming the command for a default entry, or a named entry (1) admits, while it is `provisional` and not yet due, and
`plat calibrate run` otherwise; a compiled row key the row lacks fails naming the command, which appends it by (2′). It
compares the last cells row, not the last row of any kind: after its corpus run a default entry's later rows are metric
readings and its status, while that run's changes ship as historical packs (V12 §3.10.3 R1) and leave the column's cells as
its last cells row holds them — so a closed entry passes until someone moves its cells in place outside a run.

**File g's rows by column family.** A table column whose cells share one measurement is one entry (`target.column`),
written by the seat that lands the table; V11's column entries land with each content milestone and C6 at M4 audits them
(V11 §8's register at every exit). A line's method cell writes `CalibrationEntry.method` by name — `measure`, `panel`,
`corpus` — and a line whose method is a `reference` run writes `method: 'tune'` (V12 §2.6; J-V12.70). **The catch-all
rule** (J-V12.69): a line ending "and every other calibratable column" (of the tables or columns it names) binds every
calibratable column (V11's `ColumnSpec`) of those tables or columns that no other register line names — this section's,
V11 §8's non-g lines, V02 §3.10.10's, V06 §8's — each as its own entry, id `cal.<table>.*.<column>`, with that line's
method, metric and fallback, so the register check finds none without an entry; keys, laws, enumerations, switches and the
dossier row sets, which V11 marks non-calibratable, take none, and a column two lines bind fails the lint as two entries
for one knob (V12 §2.6):

| rows (their content is the owning volume's) | method, due | the confirming measurement | when it cannot confirm |
|---|---|---|---|
| items 103–107: siting-family and signature-pair weights, coverage targets, item 105's web weights, `comfortM` and orientation factors, item 107's spacing radii, and every other calibratable column of the tables and columns items 103–107 add — registry rows 33–37 (`siting.profiles`, `.families`, `.pairs`, `.web`, `.custom`: `siting.web`'s `relaxPasses`, `relaxGain`, `splitThreshold`, `reverseShare`, `valuableSecurity` and every `siting.custom` rule cell among them), row 19 (`roster.resources`, the goods table: `maxDistanceM` and every other goods column), row 17's `profile` columns (coverage, balance, orientation and split with the rest of V11 §2.3's `SitingProfile`) and row 24's `coverage.rosterWeight` (V11 §2.3–§2.5, §3.3–§3.8, §3.13) (V11) | `measure` at M2b for the direction (the bar map's null and share bars, V12 §3.6b), then `corpus` at M-CAL for the value (the frames' `siting.*` and `link.*` rows) | `siting.<spec>` and `bar.<barId>` of the bar map's rows (V12 §3.6b); `frame.*`; a column the catch-all binds names the bar map's rows of the item whose table or column it is, and its own `frame.<table>.<column>` | a failing bar's fallback; a column no frame measures closes `fixed` at M-CAL with "no admissible frame" |
| item 106: the defensibility thresholds, `wall.barrierReachM`, the waterfront size threshold, and every other calibratable column of `walls.barriers` and `walls.waterfront` (registry rows 14–15, the thickness · height and tower-spacing factors among them; V11 §2.7, §3.16) (V11) | `corpus` at M-CAL | `wall.barrierShare` and `walled.share` on walled frames; `frame.*` (each column its own `frame.<table>.<column>`) | as above |
| item 108: the ladder pairs and subsumption rules (provenance source `sf:`, V11 §2.2, item 534); the port's ranges for unnumbered qualifiers | never entries: the first move only with the port's baseline (V12 §3.7.2 rule 2), the second are derivation rules of the port (item 20 (h)); not calibratable (V11 §3.1: `calibratable: false` on every `dossier.*` column; J-V12.36) | — | — |
| item 102: `w_sun` (`prosperity.drivers`' row `sun`, V11 §3.3.5; owner V11), `sun.samples` and the `roster.classMix` prestige key `sun` (V11); V05's and V06's own shade cells by their volume's own lines where one names them (V06 §8), else by the default line above | `measure` at M2b with V11's C2: T-V11-30 (`w_sun` at its default against 0 under common random numbers on B-CITY — the term alone moves no plot across two bands); then item 102 (g)'s fixtures, `measure` at `V5-P1` (V05's island, T-V5-19) and `measure` at `V6-E7` (V06's drift fixture's `shade.gap` on E7's bench, T-V6-12) — two stages at unordered rows (§16 orders neither M6-sky nor M6-E after the other), each read at its own exit (*Staged entries* below) | `bar.T-V11-30` at M2b; the fixtures' `shade.gap` (V12 §3.4.2) at their stages | V11 §3.3.5's: halve `w_sun` once, then set it to its stated second value and re-run |

**Items 109 – 113 by column** (J-V12.61, J-V12.66, J-V12.82, J-V12.86, J-V12.87). Every calibratable column of the
underground's tables and of items 110, 111 and 113's is one `target.column` entry, id `cal.<table>.*.<column>` (`rows`
absent: every row), written by the seat landing the owning content milestone — V11's C8 for item 109 (M6-U), C3b for item
110 (M3a) with the era's and the culture's item-110 factors (`aqueductM`, `raisedVaultM`, the culture `building` block), C1
for `climate`'s first cells and the item-111 cells of each step that lands them (M1, M2b), the seat landing the history
rows for item 113 (V11 §3.25; with M6-E) (V11 §8's register at every exit); V04's and V02's seats for their own cells; and
a base cell that a volume's base change request adds, owner `base`, by the seat landing that request, once the cell exists
(V06's E2 at M6-E for item 291's persistence cells, V06 §8) — with the method, metric and fallback of its line. A line
ending "and every other calibratable column" binds by the catch-all rule above. `retaining.settings.stateSnapCm` (row 79;
item 245, J-RF2.4; owner `base`, whose value it holds, as the `span` cells' is V04): the default line's entry at M3a,
restated in place at `V6-E2` by V06 §8's line on `bar.T-V6-62`, J-RF2.4's measurement (*A later line*), due `V6-E7` — a bar
V06 registers at E2 cannot be named by an entry written at M3a (T-V12-20: an entry naming an unregistered bar fails); V11
§3.24.1 cites this entry. `owner` is the volume whose values the cells hold, the schema's volume named in
brackets. No entry of these lines names a preset entry (V11's preset entries are `fixed:` off values, V11 §2.2; V12 §3.7.2
(3)) or moves an owner-stamped cell or gate or a value below an owner-stamped calibration minimum. A line's step is written
into its entries' `due` (and a staged line's into each stage's, *Staged entries* below) in V12 §2.8's volume-qualified form
— "at U3" as `V4-U3`, "at U3b" as `V4-U3b`, "at U4" as `V4-U4`, "at U5" as `V4-U5`, V06's E2, E7 and E9 as `V6-E2`,
`V6-E7` and `V6-E9` — while the corpus evidence rules E1 – E5 (V12 §3.10.4) are rules, not milestones, and keep their
names. A `panel` stage whose panel stays *provisional — not rated* under J122's sittings (V4-U5, V6-E7 when not sat at M5,
V12 §3.9.1) holds its entry *provisional — not rated*, never failing an exit (V12 §2.6).

| table (registry row) · columns — one entry each | owner (schema) | method, due | metric | fallback |
|---|---|---|---|---|
| `s0.features`' relief and geology rows' item-109 (a) values — P(soluble), P(volcanic) by relief (row 9); `under.systems`' cavern row `mineBoost`, `mineCap`, `fissureChance`, `breachM` (row 59) | `base` (item 109 (a)'s values; V04's `params` names) | `measure` at `V4-U3` (the bar map's 109 (a) `trend` and `higherWith` rows; V04's T-V4-55), then `panel` (V4-U5, `realism`) at `V4-U5` | `void.*` (cavern present) | V12 §3.6b's default, then *not produced*; unrated: the panel rule |
| `under.systems`' cavern `miningCellShare` (row 59) | V11 (V11 §3.23.1) | `measure` at `V4-U3` (the `higherWith` row's mining factor) | `void.*` (cavern present) | V12 §3.6b's default |
| `under.ruin` (row 58a) `chance`: `magic`, `history`, `delvingFactor`, every `blueprint` rung × relief cell | V11 (V11 §3.23.2; V04 §2.3) | `measure` at `V4-U3` (the 109 (j) (1) `rate` rows on forced-source sites confirm each draw reads its chance), then `panel` (V4-U5, `realism`) at `V4-U5`, then `corpus` possibility (E1) at M-CAL | `void.*` (ruin present) | the panel rule; a reachability gap enters `known-defects.json` |
| `under.ruin` `cultures` (`CultureRow`): `blockPitchM`, `streetCm`, `aspect`, `roomM`, `columnPitchM`, `hallShare`, `terraceRiseM`, `weight`, `monument`, and every other calibratable column of the row | V11 (V11 §3.23.4; V04 §2.3) | `measure` at `V4-U3` — T-V11-24's distinctness against the town's fabric above the ruin (V12 §3.6b `paired`; V04's T-V4-45) — then `panel` (V4-U5) at `V4-U5` | `ruin.blockArea`, `grid.r4`, `grid.axis` | V11 §3.23.4's: the failing row's `blockPitchM` moves 25 % away from the town's median block pitch once and the bench re-runs; a second failure drops the row's weight to 0, reported to the owner as a table defect |
| `under.ruin` `survival` (the eight persistence classes) | V11 (V11 §3.23.5; V04 §2.3) | `panel` (V4-U5, `realism`) at `V4-U5`; the order is T-V11-23's compile bar | `ruin.survival` (V12 §3.4.2) | the panel rule, every move keeping V11 §3.23.5's order |
| `under.ruin` `sourceWeight` | V11 (V11 §3.23.6; V04 §2.3) | `measure` at `V4-U4`, the step whose exit runs that bar (the 109 (i) `rate` row, `ruinChosen` against `ruinShare`: V04's T-V4-58; V04 §8's due steps), then `panel` (V4-U5) at `V4-U5` | `void.*` (an undercity's first void source) | the panel rule |
| `under.ruin` V04's cells: `ancientYears`, `significance`, `maxFrameShare`, `maxChambers`, `forecastFloorShare`, `depthM`, `burialByAge`, `smoothM`, `sharedAxisChance`, `ageRefYears`, `coverKeep`, `distinct`, `fadeFactor`, `magicLightChance`, `monument` (`clearM`, `tierDecay`, `ceilingClearCm`, `moundShare`), and every other calibratable column | V04 (V04 §2.3) | `measure` at `V4-U3` (V04's T-V4-45, T-V4-68; T-V4-62 reads the span-rule line's cells, not these), then `panel` (V4-U5) at `V4-U5` | `ruin.blockArea`, `grid.axis`, `void.*` | V04 §8's pre-decided fallbacks, else the panel rule |
| `under.openings` (row 58a) each kind's `chance` | V11 (V11 §3.23.7; V04 §2.3) | `measure` at `V4-U3b`, the step whose exit runs those bars (the bar map's 109 (j) (5) `trend` of access against buildings over and `floor` of sealed deep voids: V04's T-V4-49, T-V4-54), then `panel` (V4-U5) at `V4-U5` | `void.*` (accessible; deep voids sealed) | V12 §3.6b's default |
| `under.openings` `coverM` | V04 (V04 §2.3) | as the line above | `void.*` | as the line above |
| `under.dig` (row 58a): `cap`, `reachM`, `decayM`, `maxM`, `basementFactor`, every resolved `classRow` | V11 (V11 §3.23.7; V04 §2.3) | as the `under.openings` line | `void.*` (accessible; deep voids sealed) | V12 §3.6b's default, every move keeping T-V11-23's non-increasing depth factor |
| `under.dig` `sealedFloor` — the floor the `voidSealedDeep` bar reads (item 109 (j) (5)) | V11 (V11 §3.23.7) | `panel` (V4-U5) at `V4-U5` | `void.*` (deep voids sealed) | none: moving it moves the bar's threshold, so a miss is `not-achieved` (`notAchieved: true`, §13.7) |
| `under.dig` `planReachM` | V04 (V04 §2.3) | as the `under.openings` line | `void.*` | V12 §3.6b's default |
| `under.catacomb` (row 58a): `count` (`churchesPer`, `cap`), the `chance` cells, `rankCap`, `growthCapShare` (per year), `growthFloorM2`, `plagueNeedFactor`, `cryptJoin` (`own`, `other`), `charnelMaxM2`, and every other calibratable column — never the owner-stamped gates (the TOWN rung, the cemetery-only sources, the cathedral's `always`) | V11 (V11 §3.23.8, J-VI.6; V04 §2.3) | `panel` (V4-U5, `realism`; its framing holds the cathedral's crypt and the largest complex) at `V4-U5`, then `corpus` possibility (E4's crypt and catacomb checks) at M-CAL | `catacomb.count`, `catacomb.extentM2`, `catacomb.growthM2`, `crypt.joined` | the panel rule; the bar map's catacomb properties are exact conformance and move no cell |
| `under.catacomb` `ossuaryReachM` | V04 (V04 §3.5.1) | as the line above | `catacomb.fill` | as the line above |
| the crypt columns of item 109 (k) (2): the crypt chance per church class (the `basement` classes' cellar rows), `cryptM2` by class and band (`roster.classes`), `crypt.rankShare` (`roster.settings`) | V11 (V11 §3.5.8, §3.5.1) | as the `under.catacomb` line | `crypt.present`, `crypt.areaM2`, `crypt.rank` | as the `under.catacomb` line |
| V04's other item-109 cells (`voidDwellings`, `accessForecastMin`, `under.layout`'s `overlapShaftM` and `overlapShaftChance`, the fade rows) | V04 | the default line above — `corpus` at M-CAL, or at `M-CAL/under` for a step landing after M-CAL's record — unless V04 §8 writes its own line for the column in V02 §3.10.10's form, which then restates the entry in place | `frame.<table>.<column>` (the default line), else that line's | closes `fixed` at its corpus run with "no admissible frame" (the default line), else that line's |
| `terrace`: `slopeMin`, `stepMinCm`, `stepMaxCm`, `minTerraceDepthM` (`enabled` is a switch, not calibratable, and takes no entry — V11 §3.24.1); `retainingReachM`, `flatDepthM`, `coverShare` (V09 §4.20.1 (3)'s flat-ground bends); `s0.features`' relief column `terracedEdges` (row 9); and every other calibratable column | V11 (V11 §3.24.1) | `panel` (M4's M4-110 group; K2 its item) at M4, then `corpus` possibility (E1) at M-CAL | `retaining.lengthM` (and `retaining.onFlatM`, 0 by the invariant) | the panel rule, every move clamped by T-V11-32 (a)'s inequalities |
| `retaining` (row 79) by band: material weights, `batter`, `thicknessShare`, buttress `fromCm` and `spacingM`, `parapetCm`, towers per 100 m and their least step, and every other calibratable column but `settings.stateSnapCm` | V11 (V11 §3.24.1) | `panel` (M4-110) at M4 | `retaining.lengthM` | the panel rule |
| `raisedWays` (row 80) rows, CITY and METROPOLIS × kind: `chance`, `cap`, `pMax`; `raisedWays.settings`: `totalCap`, `viaduct.minDropM`, `viaduct.spanCostFactor`, `viaduct.maxSpanM`, `elevated.minRiseM`, `elevated.maxSpanM`, `elevated.bandFactor`, `elevated.landmarkFactor`, `elevated.landmarkMinSignificance` (DR35's threshold, V11 §3.24.2), `landmarkMax`, `elevated.highGroundM`, `aqueduct.sourceReachKm`, `aqueduct.needRatioMin`, `aqueduct.minFallPerKm`, `aqueduct.gradient`, `aqueduct.capPerSizeMember`, `aqueduct.terminal`, and every other calibratable settings column — the chances and caps never below the column's owner-stamped calibration minimum (V11 §3.24.2; J-V12.42); the rung gate is V11's schema, never a cell; the dossier's water-system record is a met need, never a factor on the chance (V11 §3.24.7 (3)) | V11 (V11 §3.24.2) | `measure` at M3a, where raised-way generation lands (V12 §3.6b's four raised-way bars; V06's growth parity reads the ways over the epochs by the `decline` lines below, never a stage of this line), then `panel` (M4-110) at M4, then `corpus` possibility (E1, E4) at M-CAL | `raised.count`; `bar.T110b.viaduct`, `bar.T110b.aqueduct`, `bar.T110b.elevated.prosperity`, `bar.T110b.elevated.landmarks` (the M3a stage's) | V12 §3.6b's default bounded by the owner's minima — a presence bar still failing at the floor is *not produced*; unrated: *provisional — not rated*; a reachability gap enters `known-defects.json` |
| `raisedWays.structure`: `clearanceCm` (cart, foot), `parapetCm`, `channelWallCm`, `channelCm`, `deckExtraCm`, `maxPierM` by kind, `pierSpacingM` by material, `pierWidthShare`, `pierMinCm`, `material` by band, `slideMaxFactor` (item 244), and every other calibratable column but the `span` block (the span-rule line's) | V11 (V11 §3.24.2) | `panel` (M4-110) at M4 | `raised.count` (a course needing a taller pier than `maxPierM` drops, reported `raised_too_tall`) | the panel rule |
| `era` (row 50) `aqueductM`, `raisedVaultM`; the culture rows' `building` block (row 71) `aqueductM`, `elevatedM`, `raisedVaultM` | V11 (V11 §3.19.1, §3.20.3) | `panel` (M4-110) at M4, then `corpus` possibility (E1: a frame's era and region reach its raised-way rates) at M-CAL | `raised.count` | the panel rule |
| `ways.crossing` (row 81) by way class: `rampMaxGrade`, the stair's riser, tread, landing interval and landing length, and every other calibratable column | V11 (V11 §3.24.5) | `panel` (M4-110; K2's stairs and ramps) at M4 | `crossing.kinds` (V12 §3.4.2) | the panel rule; a cart class never takes a stair (V11 §3.24.5's failure rule, the owner's words) |
| `deck` (row 82) by kind: `offer` per rung, footprint and floors by band, `frontageM`, `minPlotDepthM`, `fill`, `endClearM`, and every other calibratable column | V11 (V11 §3.24.4) | `panel` (M4-110) at M4, then `corpus` possibility (E1) at M-CAL | `deck.buildings` | the panel rule; V02's stand-ins `deck.fallbackM2` and `deck.fallbackFloors` close `fixed: superseded by V11's deck row` when that row lands |
| `deck.landmarks` (row 83): each slot's claimant chances, `minSpanM`, and every other calibratable column | V11 (V11 §3.24.4) | `panel` (M4-110; K2's mole head, mid-mole and islet slots) at M4 | `deck.buildings` | the panel rule |
| `roster.specialisations` (row 84): each row's `chance`, `capShare`, `capMin` | V11 (V11 §3.24.3) | `panel` (M4-110; its stepped-temple item) at M4 | `tier.count` | the panel rule |
| the stepped tiers: V11's `stepped-shrine` heights row (V11 §3.6.4); V02's stepped compositions (V02 §3.15) take V02 §3.10.10's stepped line, never this one | V11 | `panel` (M4-110; the stepped-temple item) at M4 | `tier.count` | the panel rule |
| `water` (row 85) `perHeadL` | V11 (V11 §3.24.6) | `measure` at M3a — T-V11-33's bench at the start of V11's C3b (arid METROPOLIS seeds with an aqueduct candidate ≥ 0.5; temperate alluvial CITY seeds ≤ 0.2) | `water.needRatio` (V12 §3.4.2) | V11 §3.24.6's: `perHeadL` moves by 5 litres once toward the missed side and the bench re-runs; a second miss is reported to the owner with both measurements |
| `water`: `wellsPerHa` by geology, `wellYieldM3`, `roofShare`, `captureShare` by biome; `climate` (row 43) `rainMmPerYear` by biome | V11 (V11 §3.24.6, §3.17.1) | as the line above, then `corpus` possibility (E1) at M-CAL | `water.needRatio` | V11 §3.24.6's fallback moves `perHeadL` only; these columns close with its result |
| `climate` (row 43) item 111's cells: `aridChance` (river, lake, coast), `oasisChance`, `oasisNoWaterFactor`, `oasisAreaHa`, `gardenFactor`, `channelReachM`, `groveBandM`, the `grove` shares, `w_water`, `pullRadiusM`, `w_waterP`, `sunlight`, `wellYieldWeight`, `wellCoverageFactor`, and every other calibratable column of the climate rows' dry-country cells (`arid` is the gate, never a cell of a run); the `garden` land-use row (row 44) | V11 (V11 §3.17.1, §3.17.2) | `measure` at M1 for the arid chances (the bar map's 111 (d) `rate`, T111-3), then `measure` at M2b for the pull, the prosperity water term, the sunlight cell and the well terms (T111-1, T111-4), then `corpus` possibility (E1: an oasis town, a desert town on a river) at M-CAL | `bar.T111-3` at M1; `bar.T111-1`, `bar.T111-4`, `water.walk` at M2b | V12 §3.6b's default on the row that drives the failing bar (an `aridChance`'s odds doubled within its range; `w_water` doubled within [0, 0.9]; `wellCoverageFactor` stepped toward 1), never the `arid` gate and never across P(oasis) 0 off the arid rows (§4.2 S0) |
| `history` (row 92) `settings`: `epochYears`, `symbolicQuantile`, `burialYears`, `burialFactor` (flood, silt, rebuilt, bare rock), `burialBoundsYears`, `reuseCost`; the event-to-epoch rows' numbers (`minSeverity`, `weeksAtFull`, the slice steps), and every other calibratable column (`history.replay` is a switch and takes no entry) | V11 (V11 §3.25) | `measure` at `V6-E9` (the replay's bars on H-HISTORY: `bar.T-V6-72`, V06 §8; T113-1 – T113-3 and T113-6 its conformance), then `corpus` possibility (E4: a town shrunk inside its old walls, a church too large for its village) at M-CAL | `bar.T-V6-72` | V12 §3.6b's default on the driving cell (a declared `fallback` run); a move of `epochYears` re-runs the replay's budget check (V06 §6.7); the burial cells' conformance (T113-4, V04's T-V4-76) moves no cell |
| the style check's threshold `cvd.minDeltaE2000` (registry row 52) | V11 (V11 §3.1) | **no entry**: the cell is `calibratable: false` (V11 §3.1), a check threshold no run, panel or frame re-signs; T112-1 confirms the families against it on every checked variant at M3b (`hatched` at M5) | `bar.T112-1` (reported; its `BenchBarDef` registered by the seat landing T112-1, `stages` `[]`) | a legend pair below it is fixed in its style family (a style-version change), never by lowering the cell; a game-master `colour` finding that shows the threshold too low enters `known-defects.json` (V12 §2.14 (4)) and is answered by an authoring table version of row 52 with a declared style-version shift |
| `decline` (row 46) structures block: `retaining.holdM`, `retaining.neglectAfterYears`, `retaining.stretchM`, `aqueduct.disuseAfterYears` — written at V11's C3b (M3a) | V11 (V11 §3.18; read by V06 §3.19.2, §3.19.4) | `panel` (V6-E7, AB `history` on H-100) at `V6-E7`, inside M6-E | `retaining.lengthM`, `raised.count` over the epochs | the panel rule |
| the base decline table's persistence cells `raised`, `retaining` (registry row 46; §4.11 by item 291, STAGED M6-E; V11 §3.18 holds no rate) — written by the seat landing V06's E2 at M6-E, where the request lands | `base` | `panel` (V6-E7, AB `history` on H-100) at `V6-E7`, inside M6-E | `retaining.lengthM`, `raised.count` over the epochs | the panel rule, with V06 §8's stated second value |
| V04's span-rule constants, the cells `raisedWays.structure.span` (row 80; V11 §3.24.2's name map; their values item 244's text and V04's): `vaultShare` by kind (V04's `raised.vaultShare`, scaled by the era and culture `raisedVaultM`), `maxHeightCm`, `minHeadroomCm`, `maxFallCm`, `vaultCap` by rung, `deckDepthCm`, `supportFoundationCm` (J-V4.93) | V04 | `panel` (M4-110) at M4, then `measure` — T-V4-62's conformance, 0 violations — at `V4-U3`, then `panel` (V4-U5, `realism`) at `V4-U5`: three stages in milestone order, the cells landing at M3a (*Staged entries* below; V04 §8's row takes this order) | `raised.count` | V04 §8's pre-decided fallback, else the panel rule |

**The panel rule** (J-V12.61). Where a line reads "the panel rule": a group rated No on its question moves the line's cells
once to the owning volume's stated second value where it states one — a declared `fallback` run (V12 §3.7) — and the
group re-sits at the next sitting it is offered at; where no second value is stated, the entry becomes `not-achieved` and
the group's finding reaches the owner as a table defect in the reconciliation report (V12 §5.5); an unrated group leaves
the entry *provisional — not rated*, which never fails an exit (V12 §2.6).

**The provisional-number lint** (`plat calibrate register --check`, PR tier): **every** compiled cell whose column is
`calibratable` passes only when its provenance source is `ref:…`, `owner`, `owner-eye`, `host`, `corpus` (item 69's palette
exception, or a historical pack's cell) or `sf:⟨file⟩@⟨baseline⟩` (V11 §2.2; item 534), or an entry names it directly or by
its column, or its provenance note begins `fixed:` with its reason; everything else fails — so an `own` calibrate-later cell
(most volumes' constants: `growthFloorM2`, the terrace thresholds, the raised-way chances) never dangles. A cell no entry
covers fails naming its column and the command that writes the default line's entry (`plat calibrate register --defaults
--milestone <id>`); an entry carrying `line: 'default'` whose method, due, metric or fallback differs from the default
line's (its due `M-CAL`, or — only once M-CAL's record is committed — the `M-CAL/<layer>` its first history row's
`milestone` gives by *The due's corpus run*; a default entry due `M-CAL` still `provisional` once that record is committed
fails as written after M-CAL, owing its layer's run), or whose `owner` is no document whose source file holds the column's
cells, fails (a hand-edited default is a named line without its section), and a default entry beside a named entry for one
column fails as two entries for one knob; an entry, or a stage of one, whose `due` is none of §16's ids, V12 §2.8's
volume-qualified ids or a `CorpusRunId` fails, naming V12 §2.8's form — the test `--milestone` applies — so no entry waits
on an id no `MilestoneRecord` carries (`E2`, `U5`, "the raised-way milestone"); an entry whose last cells row disagrees
with its target's compiled cells, or lacks a compiled row key, fails by *A value moved by its owning seat before its due*
(3). Model constants the volumes keep outside tables, in code, move into a table or take a `thr.` entry. An application or
engineering constant — a UI threshold, an autosave or export limit, a time budget — that its volume confirms by its own
test or performance row under D-18 (volume 9's and volume 10's calibrate-later constants: V09's autosave limits,
`raised.previewOnReleaseKm`, the deck scenes' export cap and its times; V10's budget row measured by T-V10-8) is outside
the register: its provenance note names that test, and no entry is written (J-V12.81). Every §13.7 letter has an entry;
every entry's cell or column exists and is calibratable and every metric it names exists — a catalogue id, or a family
member that resolves (`siting.<spec>` and `bar.<barId>` to a registered bar, `frame.<table>.<column>` to a calibratable
column; V12 §2.1); one mechanism has one entry and one column (two names for one knob fail); every cell that encodes an
OWNER RULE item's hard clause carries its `ownerRule` stamp (V12 §2.10) — the check reads the stamped-clause list V11's
compiler writes from the owner-rule rows; every trial row names a finding of a committed `GmTrialRecord` (V12 §2.14);
status moves only provisional → confirmed | fallback-applied | not-achieved | owner-set | fixed (a `corpus` entry closed at
its corpus run, M-CAL or `M-CAL/<layer>`, with its reason), and confirmed → owner-set (a later pick) — a staged entry's
advance from stage to stage is no status move (*Staged entries* below); a history row is appended, never removed.

**Milestone exits.** At the exit the landing seat appends to each `measure` entry due there — on a staged entry, to each of
its stages due there, by *Staged entries* below — one history row holding each metric it names as the milestone's
`ParityReport` gives it (a `bar.` metric: its bar's statistic and verdict); the entry moves to `confirmed` when every `bar.`
metric it names passes and every other metric meets the condition its line states, and otherwise its fallback opens (V12
§3.7.1 (b)) — or, for an entry whose cells no run may name (V12 §3.7.2 (4): every metric its stage reads a `bar.` member
whose bar's `BenchBarDef.stages` is `[]`), its line's stated fallback applied by the exit's seat in the exit's change,
recorded by the cells row of *A value moved by its owning seat before its due* (2), the entry closing `fallback-applied`. A
`frame.*` metric is read only at a `corpus` stage (M-CAL, or the later run `M-CAL/<layer>` that takes its column, V12
§3.10.1, §3.10.5): at an earlier exit it is not read and does not hold the entry back, and its history row is appended at
that run; an entry whose every metric is a `frame.*` member is due at M-CAL — or, for a column whose first compiled cell
landed after M-CAL's record was committed, at that column's `M-CAL/<layer>` — and the lint refuses any other due for it
(J-V12.70). `MilestoneRecord.exitCriteria` (§13.3) gains one row per entry due at that milestone, with its status and
evidence (`result` carrying `not-achieved`, `owner-set`, `fixed` and `provisional-not-rated`, item 493); an entry still
`provisional` past its due milestone fails the exit — §13.7's JT ("no acceptance run treats an unset value as passed") made
mechanical — except a `panel` entry whose panel is unrated, which reads *provisional — not rated* and never fails an exit
(V12 §2.6). **Every volume's landing exits green:** a milestone of any volume that lands a registry table, or a
calibratable column of one, exits with `plat calibrate register --check` green over the cells it lands — T-V12-20 runs at
PR tier from M1, so the landing change carries its named lines' entries and the default line's (each owner's §8 exit
carries it: V01 §8.1, V03 §8, V04 §8, V05 §8, V07 §8).

**Staged entries** (J-V12.79, J-V12.89). A line that names more than one stage — "`measure` at U3 …, then `panel` (V4-U5) at
U5, then `corpus` possibility at M-CAL" — writes each of its entries with `stages` (V12 §2.6), one per stage in the line's
order: its method, its due in V12 §2.8's form (a `corpus` stage's a `CorpusRunId` by *The due's corpus run*), its panel on a
`panel` stage, `possibility: true` where the line says "possibility", and `metric` where the line gives the stage metrics
of its own; a line of one stage writes none, and every rule above reads its entry unchanged. The entry's `method`, `due`
and `panel` hold its current stage's: the first stage with no passing row, the first at writing. A stage is read at its
milestone's exit, or at its sitting for a `panel` stage, as *Milestone exits* reads an entry, and appends its row with
`stage: { index, outcome }`: (1) a pass that leaves a non-`corpus` stage unpassed appends outcome `pass` and advances
`method`, `due` and `panel` to the first unpassed stage, the entry staying `provisional` — a stage advance is no status
move; (2) the pass that leaves no non-`corpus` stage unpassed confirms the entry; (3) a failing stage applies the line's
"when it cannot confirm" there — its fallback (a `fallback` run, V12 §3.7.1 (b), or the hand fallback of *Milestone exits*
where no run may name the cells), the panel rule's stated second value, or `not-achieved` — and so closes the entry
(`fallback-applied` or `not-achieved`), its later stages still read at their exits as metrics or panel rows (outcome
recorded) that move no cell and no status; (4) an unrated `panel` stage appends outcome `unrated` and holds the entry
*provisional — not rated* (V12 §2.6), never failing an exit, its later stages still read at their own exits, and a later
rated pass (V12 §3.9.1's batch and re-offers) passing it; (5) a `corpus` stage is read at its corpus run (M-CAL, or
`M-CAL/<layer>` by *The due's corpus run*) whatever the entry's status then is — a `frame.*` metrics row, and for a
`possibility` stage that run's reachability rows (E1) and checks (E4) — and moves cells only as V12 §3.10 lets a corpus run,
into historical packs (R1), never re-opening, closing or advancing the entry (V12 §3.10.1's closing by the run's record
binds entries whose only stage is `corpus`). A staged entry holding a non-`corpus` stage due at a milestone whose
`MilestoneRecord` is committed, with no row of that stage, fails that exit as an entry past its due. **The order**, which
the lint holds, is §16's (J122): a row follows every row its "starts after" cell names, transitively — M-1 … M4 in §16's
order before the rows that start after them; V-M0 after M0; M3c after M3a; the village (`V-M1` – `V-M4` in their own order,
`V-M2u` after M6-U's tail), M6-E and M6-P's first steps after M4; M6 and M6-U after M5; M6-sky after M6-U; M-CAL after
M6-sky; M-SF after M-CAL — and a stage sits at the §16 row it is built inside: a §16 id at itself; `M3a-V2` at M3a; volume
2's `M6a` – `M6c` at M6, before M6's own exit; `V3-P*` at M6-P (P2 after M6-U's access records, the steps after P3 after
M6, V03 §8), `V4-U*` at M6-U, `V5-P*` at M6-sky, `V6-E*` at M6-E; volume 11's steps at their §16 ids (V12 §2.8); two stages
at one row follow their step numbers (`V4-U3` before `V4-U3b` before `V4-U4`), volume 6's steps by V06 §8's *Order and
dependencies* instead. Two stages at rows neither of which follows the other in that order (M5 against the village, M6-E or
M6-P; M6-E against M6-sky — the item-102 line's island and drift stages) are each read at their own exit, whichever comes
first; a `corpus` stage follows every other. The lint refuses a `stages` list the order places the wrong way round, naming
the pair (a `V4-U3` stage before an `M4` stage), a `corpus` stage before a stage of another method, a stage whose `due`
fails the lint's due test (V12 §2.8's form), and a staged entry whose `method`, `due` or `panel` is not its current stage's.

### 3.12 Failure handling — every failure, its rung, its report

No step discards and retries everything: each failure has a bounded ladder (§5's principle, applied to the harness).

| failure | detection | ladder | reported as |
|---|---|---|---|
| a capture fails (session crash, export error) | the capture script | same seed, up to 3 attempts; FTG: the next day, up to 6 days | a plan index in `sample.failed` with its reason — never silently skipped (C7) |
| a reference re-seeds itself inside a capture (MFCG's size-200 retry, sweep README item 6) | its console trace | kept: it is the reference's output for that seed | a row note |
| FTG payload without a resident count | the adapter | the size's nominal target (§13.6 (2)) | `populationSource: 'nominal'` |
| a metric not computable on a source | `requires`, `scale` | none | `notApplicable`, counted |
| an ⟨M-1⟩ number not measurable or not reproducible | M-1 | none | descriptive and in `known-defects.json` (§13.5) |
| two implementations disagree beyond tolerance | T-V12-3 | find the wrong definition; the product's value supersedes | `baselineShift`, note naming the metric |
| a parity row fails at a milestone | `plat parity` | the register's fallback or a tuning run; then the row's own fallback | the exit criterion; *not achieved* where the threshold moved |
| a tuning run finds nothing better, fails on holdout, or exceeds its budget | the run | one re-specified run; then the entry's fallback | `rejected` / `aborted-budget` with every evaluation kept |
| two runs claim one cell | the spec check | the second waits for the first to close | `refused` (rule 6) |
| a corpus map unreadable | the adapter | excluded | `excluded: 'unreadable'`; a frame dropping below 20 turns possibility-only |
| a sitting incomplete after seven days | `plat d5 verdict` | re-offered at the next gating sitting, after M5 with every release (§13.6 (7); V12 §3.9.1) | *provisional — not rated* |
| a staged panel that does not fit its sitting's 60-minute batch | the panel seat at assembly (V12 §3.9.1) | waits for the next gating sitting; after M5 offered with every release | *provisional — not rated*, never a failure |
| a key that does not match its commitment | `plat d5 verdict` | the panel is void; a fresh sealing and sitting | the owner's answers kept as notes |
| a statistical bar short of its minimum instances | `plat statbar` | towns in steps of 50 per level up to `seeds.max` | `insufficient`, gating as a fail naming the shortfall; the owner adds a fixture level |
| an `exactMonotone`, `exactBound` or `exactStates` violation | `plat statbar` | none: a property | fail naming the fixture, the record or cluster, the step and both values or readings; a `known-defects.json` entry; the milestone does not exit until fixed |
| a level's site override cannot be frozen (a stage before S1 reads it) | `plat statbar` at spec registration | none | the spec is refused; its owner states the level through a recipe or dossier input instead |
| a statistical bar fails on its towns | `plat nullmodel`, `plat statbar` | one re-run on the fresh `c1` family at twice the towns (V12 §3.6) | `suspect`; `pass` on confirmation; `fail` only when both fail, then the fallback |
| a level whose generator has not landed, or a population level outside [1 500, 120 000] | `plat statbar` | none | `notApplicable`, reported, never a failure (V12 §3.6b) |
| a spec whose pooled null share exceeds 0.85 (below 0.02 for `lower`), or a `servedShare` / `nnSameKind` spec off town scope, or a `servedShare` spec of more than one class, of a class without a coverage row (`unit: 'coverage'`) or of a `settlement`-unit class | registration | none | refused naming the lint; the owner restates the indicator (a `settlement`-unit class is reported `notApplicable` in its bar) |
| a run spec naming an owner-stamped cell, or a bound below an owner-stamped minimum | the spec check | none | `refused` (rules 2, 5) |
| a known-city StructureCheck fails | T-V12-36 | none: the capability or the fixture is wrong | the exit row `T-V12-36:<id>` fails with the check's id and plain `what`; a guard flip when inside a run |
| a pinned item's change moves an off-state golden, an unrelated shift's stage list differs between the sets, or a family's landing change moves a committed golden under its overlay | the no-op pin (V12 §3.7.8) | none | CI fails naming the pin, the suite and the stage |
| a raised bump moves a THORP – TOWN S4 or S5a – S5d isolated digest | the golden tooling at the bump | none | CI fails: not a declared shift (V12 §3.7.6) |
| a witnessed form an owner rule excludes | E1, E4 under R6 | none | an `ownerExcluded` row and an owner question; never a known defect or a layer cell |
| a trial finding unrouted, naming a cell that does not exist, or routed to a missing entry, defect or question | `plat calibrate trial`, `plat calibrate register --check` (V12 §2.14) | the intake re-runs on the record; a finding whose cell resolves nothing is routed by rule (3) with its `cells` dropped and the drop noted | T-V12-44 fails naming the finding; the release gate's evidence waits for a clean intake |
| a `known-defects.json` entry this volume opened is cleared (a bar passes, a reachability is met, a fallback lands) | the run or report that clears it | — | closed, never deleted, listed in `MilestoneRecord.knownDefects.closed` with the clearing run's or report's id |

### 3.13 Determinism

All randomness in the harness comes from `TestStream(label)` — xoshiro128\*\* seeded by H128 of the label (the published
generator and hash of §17.1 (8)) — with structured labels (`null/<spec>/…/perm`, `null/<spec>/…/tie`, `lots.r4/<seed>`),
never a clock; the pooled exact test's convolution runs in integer-indexed doubles in town order with a fixed summation
order, and verdicts are computed on unrounded values; the known-city fixtures seed from `known/<id>`; only the panel's
sealing salt comes from the operating system, by design (V12 §3.9.3). Metric code uses `dmath`; per-town work runs in
workers and merges in seed order. A `ParityReport` has one canonical form: rows sorted by (reference, metric, rung,
preset); numbers written with six significant digits by our own formatter (round half to even on the decimal string, never
the host's float printing); keys sorted — so the same inputs give the same bytes on every host, and a report's hash in a
run record is a check (J-V12.9). An empty report (no row selected: a tier with no baseline of its rungs) is written in the
same canonical form with zero rows and its summary zeros, never omitted. A calibration run's spec, seeds and evaluation
order are fixed before it starts, so re-running a spec reproduces every evaluation (T-V12-8).

### 3.14 The known-city fixtures — one engine for both (item 110 (e), (f); J78; T101-6)

**3.14.1 What they are.** Two acceptance fixtures of the authoring toolkit, each an original skeleton with a city's
structure and our own names: **K1**, J78's (T101-6), and **K2**, item 110 (e)'s second fixture ("both known-city fixtures
pass", item 110 (f)). This section is their one statement of setting, seed, structure list and golden (V09 §7.2 cites it
for its dedicated-user checklist and thresholds, V10's evaluation group A reads the fixture record); the types are V12
§2.12. Their canvas scripts are V09's content, their transcripts V10's, the building bars on K2 V02's (T-V2-44 – T-V2-47),
the vault bars V04's (T-V4-62 – T-V4-70), and V01's T-V1-54 re-runs K2's skeleton with stage 2 on at M5.

**3.14.2 Inputs, authors and the clean room.**
* **K2's brief** is written from item 110 (e)'s list alone, in our words, with our own names — drawn from our naming tables
  at the fixture's seed or invented by the seat. This volume names no reference city, ward or landmark and cites only "item
  110 (e); J114". V09 §7.2 holds the brief's current draft (its six ward names are our own); the file is `brief.md` in the
  fixture's input folder.
* **Who writes them.** The brief, the skeleton, the canvas script and the transcript are authored by implementer-tier seats
  that hold only the base and the volumes (§17.1 (1)); none of them opens `research/reference-maps/` or
  `docs/experiments/`; T101-6's text points an implementer at nothing research-side (item 489).
* **The name scan.** §17.1 (5)'s deny-list holds the place, ward and landmark names legible on the study-only reference maps
  (transcribed research-side by the research seat, digests only; item 536), so the check `namesClean` (0 scanner hits on
  `plat/tests/fixtures/known-city/**` and `plat/goldens/known/**`) catches a carried name.
* **No outline traced.** At M3a's exit the checker seat compares each fixture's `ink` render with its study image,
  research-side, and records the verdict "no outline traced" as evidence in the `MilestoneRecord`'s exit row; only the
  verdict crosses into `plat/`.
* **Files.** Inputs in `plat/tests/fixtures/known-city/<id>/` — `brief.md`, `skeleton.plat`, `canvas.json` (V09),
  `transcript.json` (V10: at M3a a scripted transcript of tool-API calls, from M3c V10's cassette); the fixture record and
  its golden in `plat/goldens/known/<id>/` (`fixture.json`, per output version the model digest and the StructureResults;
  J-V12.58).

**3.14.3 Three authoring paths (J-V12.41).** Each fixture is authored T101-6's three ways: the skeleton file, V09's canvas
script, and the tool API from the recorded transcript. The skeleton file and the canvas script share one model digest
under the fixture's seed; the structure list holds on all three; and its **emulation subset** — the checks whose entities
are all declared at L1 or L2 by §7.1's level table, computed at registration, never hand-listed — holds on V09's variant
declared only to L2. Item 110 (e)'s "authored both ways" names the two paths that share a digest; its "the same acceptance
bars as the first fixture" brings the third.

**3.14.4 Settings and seeds.** K2: CITY, 20 000 people (the rung's default, §1.1), water `coast`, seed `known/K2` →
3205843448. K1: CITY on its declared coast and river, as T101-6's brief declares, seed `known/K1` → 3403473561. The seeds
are family `known` at priority 1 (V12 §2.4), in the collision domain of every lower-priority family.

**3.14.5 K2's structure list.** Written from item 110 (e) alone; no check adds a feature item 110 (e) does not name. Every
threshold follows from the brief's declarations, never from a count the rules may or may not fill: generated extras — a
viaduct the site calls for at CITY, more retaining walls, more towers — are reported in `extras`, never failed (J-V12.57).

| id | check (the `what` line is the plain sentence the report and the dedicated-user checklist print) |
|---|---|
| K2-1 | `enceinte`: the outer enceinte closed by `shore` (item 106's barrier closure); its built stretches one open chain with both ends on the shoreline within 1 m; ≥ 2 towers; ≥ 1 land gate with a square touching its inner side (the gate plaza) |
| K2-2 | `harbour`: a basin whose mouth a mole bounds; a fort at the mole's head; a tower within 20 % of the mole's length from its midpoint |
| K2-3 | `causeway`: from the mole or the shore to an islet of ≤ 1 ha that holds a lighthouse |
| K2-4 | `anchorage`: ≥ 8 declared jetties outside the mole's basin, with deck-plot buildings standing on ≥ 4 of them (the deck rows fill piers by chance — item 110 (d): a deck "may carry plots" — so "every jetty" would not follow from the declarations) |
| K2-5 | `terracedWards`: ≥ 3 terraced wards, each bounded at least in part by an enceinte of kind `inner`, together holding ≥ 10 retaining walls (drawn by T3 `retaining` or the edges of T2 terrace strokes, item 110 (a)) |
| K2-6 | `stairOrRamp`: every way crossing a retaining wall is a stair or a ramp there |
| K2-7 | `ringStreet` × 2: ring streets round the two declared precincts |
| K2-8 | `raisedWay`: the one declared raised straight road (T4 with `raised` on) — its largest chord deviation ≤ 2 % of its length; it crosses ≥ 2 part-0 ways with 0 junctions; both ends ramps or stairs on part-0 vertices |
| K2-9 | `ravineQuarter`: a ravine (a T2 stroke) under a declared quarter with ≥ 5 retaining walls and item 70's informal clusters — the stepped housing |
| K2-10 | `stepped`: a stepped temple of ≥ 4 tiers (V02's `stepped-temple` row; T-V2-44 checks the tiers themselves) |
| K2-11 | `landmark`: an arena (V11's `arena` class) |
| K2-12 | `quarter` per declared ward, present by name and kind, and `namedPlaceInQuarter`: every named place in its declared ward (T101-6's clauses) |
| K2-13 | `namesClean` |

**3.14.6 K1's structure list** runs on the same engine: T101-6's three clauses (every declared quarter by kind and name, both
enceintes with their gates, every named place in its declared quarter) and V09 §7.2's checklist — two enceintes, nine
gates, three region labels, every named place present and in its region, the bridge fortress, the cemetery on the cliff,
the satellite across the river — each cited, plus, since item 110 (d) un-stages them, **the bridge fortress's bridge
carries deck plots with ≥ 1 building**. K1's golden moves with the deck switch-on bump, declared (V12 §3.7.6).

**3.14.7 The bar T-V12-36, tiers and exits.** The milestone tier runs all three paths of both fixtures from M3a, as T101-6
(§13.8); the PR tier runs K2's skeleton path only (one CITY generation, ≤ 5 s, V12 §6). A failing check names its id and
its plain `what`. The `MilestoneRecord.exitCriteria` carry one row per fixture, `T-V12-36:<id>`, listing the failing
checks' ids.

**3.14.8 The golden and its shifts.** Each fixture's golden — per output version its model digest and StructureResults — is
recorded at M3a and moves only by declared shifts that name it (`ShiftRecord.seeds[].fixture`, item 492): item 110's
switch-on bumps (V12 §3.7.6), stage 2's landing at M5 (T-V1-54), and any other table bump that moves it. Raised-way
generation lands at M3a with the fixture (items 244, 290); a family's switch-on bump after M3a moves K2's golden, declared.
A capability absent at M3a fails its StructureCheck at M3a's exit — there is no deferral (the owner's no-defer rule); the
fixture's milestone rests on §16's M3a row carrying item 110 (a) – (d)'s base parts (item 229) and K2.

**3.14.9 Guards and consumers.** Both fixtures are in every calibration run's `fixtureSuites` (V12 §3.7.5): a chosen
candidate that fails any StructureCheck is rejected (two CITY generations and a few seconds). Both are suites of the
`item110.*` pins (V12 §3.7.8). K2 is the first item of the M4 panel's M4-110 group (V12 §3.9.1). V03's B-PLAN click set
includes both from P1.

### 3.15 Edges — every mechanism at its limits (principle (11))

**General rules.** (a) *No whole retry:* every harness failure has its bounded ladder (V12 §3.12); no step re-runs a whole
capture plan, a whole tier or a whole corpus. (b) *Degenerate geometry:* our side never holds it — the kernel refuses a
degenerate commit (§3.1) and the stage's failure class repairs or substitutes it (§5.2) — so a degenerate feature in our
`MeasureInput` fails T-V12-4 as a profile defect; on a reference or corpus input the reader drops a zero-length line, a
zero-area or self-touching polygon and a ring of fewer than three distinct vertices before any metric runs, counts the
drops per kind in the input's sidecar (`dropped`), and a metric whose required kind keeps no feature reads
`notApplicable`; a capture or a map whose every feature of a required kind dropped is a failed capture (retried by V12
§3.12's ladder) or an `unreadable` map. (c) *Rungs:* every mechanism takes the rung as a setting, THORP to the METROPOLIS
cap (120 000, §1.1); the village rungs run only under V07's generator (`requires: 'V07'`, `notApplicable` before V-M4), and
a population outside [1 500, 120 000] is `notApplicable`. (d) *Lifecycle:* the harness's records are repository data, never
document state: a document's save, load, undo, redo, regeneration or migration never reads or writes them (§13.5's and
§13.6 (12)'s edges); each record's own create, persist, regenerate, undo and migrate rows are V12 §2.11's.

**Per mechanism** (each row's outcome, its rung on V12 §3.12's ladder, and its clause of T-V12-47):

| mechanism | edge | outcome (rung) | T-V12-47 |
|---|---|---|---|
| the baselines file (V12 §2.3) | missing, empty or contradictory data | a missing or unparsable file stops `plat parity` naming it (§13.5; T-RIG-1); a file with no row of a metric reports `missingBaseline` for an ⟨M-1⟩ row and `notApplicable` otherwise, never *pass*; two unsuperseded rows sharing (metric, `metricVersion`, reference, `referenceBuild`, matched setting) are refused by C9 as a duplicate live row (refused) | (a) |
| calibration runs (V12 §2.5) | an empty spec, one cell, contradictory bounds | a spec with no cell or no target, a cell listed twice, `lo` > `hi`, `from` outside [`lo`, `hi`], a `step` ≤ 0, or a `golden` search over more than one cell is refused before any evaluation (refused); `lo` = `hi`, or a range of one step, evaluates `from` alone and closes rejected "already at its best" | (b) |
| the register (V12 §2.6) | missing, empty or contradictory data | a missing `register.json` fails `--check` naming the file; an empty register over calibratable cells fails each cell naming `--defaults`; two entries or two columns for one knob fail (the one-knob check); an entry whose target cell a later table version removed fails "cell exists" naming the version; an entry naming an unregistered bar fails (refused at the lint) | (c) |
| the correlation harness (V12 §2.7, §3.6) | missing, empty or contradictory data; degenerate units | a spec whose subject names no roster class is refused at registration; a scope unit with no eligible plot and no member contributes nothing (its E = 0, m = 0); a town with every unit empty is skipped and counted; every town skipped gives `insufficient` (a fail naming the shortfall); a corpus building of zero area is dropped by the reader (b) | (d) |
| the tendency harness (V12 §2.7b, §3.6b) | missing, empty or contradictory data; degenerate inputs | a spec with no level, a level naming a fixture id absent from the frozen manifest, or a `trend` with one level is refused at registration; an indicator with no instance at any level is `insufficient`; a ruin of fewer than 20 grid steps reads `grid.*` `notApplicable` and its paired seed is judged on its other measures; an `exactStates` script naming a cluster the fixture lacks is refused at registration | (e) |
| panels (V12 §2.8, §3.9) | a malformed id; no pairs; one pair; degenerate renders | a `PanelSpec` whose `id` is no milestone id of V12 §2.8's form, or whose formula yields no pair, is refused at registration; a panel of one pair is rated by §13.6 (6) with n = 1 (⌈2 ÷ 3⌉ = 1); a pair whose town delivers a requested feature below full is rendered as delivered, its report line on the sealed key (§13.6 (12)); a panel with fewer pairs than its rule needs records the verdict it can reach, marked short, never passing by default | (f) |
| corpus records and the reconciliation (V12 §2.9, §3.10) | an empty corpus; an empty frame; contradictory declarations; degenerate maps | a corpus with no admissible map changes nothing: each column closes `fixed` with "no admissible frame" and the `ReconciliationRecord` is committed with no pack (§13.9 (11); T-RIG-6); a frame left under 20 maps by exclusions is possibility only; a frame row whose `n` or digest differs from its declaration is refused by C8; a map whose every feature dropped is `unreadable` | (g) |
| provenance and `dist/evidence.json` (V12 §2.10, §4.4) | missing, empty or contradictory data | an evidence id that resolves to nothing fails T-V12-21; an `ownerRule` stamp naming an item not marked OWNER RULE fails the register check; a cell with no evidence shows its provenance source and status alone ("no calibration evidence yet"); a missing `dist/evidence.json` makes the cell inspector and the clerk show the provenance source with the status "not recorded", and the build that shipped without it fails its release check | (h) |
| the known-city fixtures (V12 §2.12, §3.14) | missing inputs; degenerate declarations; lifecycle | a missing input file fails its path's StructureResult naming the file, the exit row `T-V12-36:<id>` failing; a degenerate declaration in the skeleton (a zero-length jetty) is §7.1's declaration rule's — bent or refused there, never repaired by the fixture — and the check that needs it fails naming it; a `skeleton.plat` of an older schema migrates on load by §7.5, and the fixture holds only when the migration's diff is empty; an undo inside a document never touches the fixture files | (i) |
| the no-op pins (V12 §2.13, §3.7.8) | missing, empty or contradictory data | a pin with an empty overlay, an overlay cell that does not exist, or a suite its owner did not register is refused at registration; a suite whose seed family or fixtures are missing fails naming it (§13.8's edges, never a vacuous pass) | (j) |
| the loop and the parity run (V12 §3.1, §3.5) | no input; one item; toggles and presets | a tier with no baseline row of its rungs writes a canonical report of zero rows and zero counts, and the dashboard says "no comparisons this run"; a setting of one seed forms its band by `single`; every preset arm a row needs runs (V12 §3.5.5 step 3); a staged layer switched off (the underground, the sky) leaves its metrics `notApplicable`, never 0 | (k) |
| the capture loop and the crossing (V12 §3.2, §3.3) | degenerate captures; one row; empty files | an adapter's degenerate features drop by rule (b); a candidate file with one row crosses like any other; a candidate with no new or superseded row is refused "nothing to cross" (no empty `CrossingRecord`); a first commit runs C9 against no previous file | (l) |
| tuning (V12 §3.7) | degenerate ranges | as calibration runs above; a cell whose column range collapses to one value after the owner-stamped minimum is applied is refused (rule 5) | (b) |
| reference drift (V12 §3.8) | no input; one changed seed; lifecycle | an unreachable reference records "unreachable" in `drift.md` and the pin stays; one changed seed between builds is reported beside the pinned rows and gates nothing until the next boundary; a pin change is a declared `baselineShift`, its undo a declared pin change back (V12 §2.11) | (m) |
| the register's lines and lint (V12 §3.11) | non-finite values | a non-finite compiled cell fails the compiler (V11 §3.2.1) and the crossing's C5; a register value is a compiled cell by row key, never a computed number, so no geometry reaches the register | (c) |
| determinism (V12 §3.13) | no input; every rung | an empty report is written in the canonical form (V12 §3.13); the canonical form and every stream label are rung-independent, and a report at THORP or at the METROPOLIS cap sorts and formats as any other | (k) |
| failures (V12 §3.12) | missing data; lifecycle | a missing `known-defects.json` fails the golden CLI (§13.3); an entry this volume opens is closed, never deleted | (n) |
| calibration in documents (V12 §4.1) | no release; every rung | with no calibration release a new town takes the current tables and nothing moves; table versions apply at every rung, the village rungs through V07's tables | (o) |
| the records' verbs (V12 §4.2) | no previous file; missing data; undo | `plat baselines check` without `--previous` on an existing file is refused naming the flag, and on the first commit runs C9 against nothing; every verb's undo is its row of V12 §4.2's table; a verb run on a missing record file fails naming it | (l) |
| the owner's inputs (V12 §4.3) | no input; one answer | no sitting rated leaves every panel *provisional — not rated* and gates nothing; a single answer is an incomplete sitting, kept, the panel unrated (J-V12.27) | (f) |
| the dashboard and the reports (V12 §5.1, §5.2) | no input; one item; missing data; every rung; toggles; lifecycle | zero rows: "no comparisons this run"; one row: the same layout; a missing `history.jsonl`: no sparkline, "first run"; one table per reference, rung and preset arm, every rung included; reports are regenerated from their records, a milestone's stored beside its report (V12 §5.1) | (k) |
| release notes (V12 §5.5) | no input; one frame | a release with no calibration run prints "no calibrated value changed"; a reconciliation of one frame prints one page | (o) |

**Combinations with the parity presets** (the catalogue's `<feature>` × presets, owned here). The measurement rule is one
for every feature: a P row is measured under its reference's preset, where §7.6 zeroes every `extension` cell and sets
each per-preset value, and reads whatever the town then holds through the profile's rules; an O or C row is measured
under `'default'`. So:

| feature | rungs | under a parity preset (P rows) | under `'default'` (O and C rows) |
|---|---|---|---|
| a cliff, a steep slope, a river, a coast, a frame | every rung (THORP – VILLAGE under `VG`) | present as the site draws it; walls on them read by the enclosure rule (a cliff or shore closure is a `closure`, never wall length); streets on steep ground by the per-part graphs | the same, with item 106's barrier closure and item 110's levelling where the default turns them on |
| a harbour, a moat, a bridge | TOWN – METROPOLIS (bridges every rung) | present where the preset's town has them; a harbour-mouth chain never a main gate; a bridge carries its way's class | the same, deck plots on a bridge read as `onDeck` buildings |
| a retaining wall, a terraced ward | every rung (the ward TOWN – METROPOLIS) | absent (item 110's families resolve off, V11 §3.24.0), so no P row's input holds a `retaining` feature (T-V12-37) | `retaining.*` and `crossing.kinds` measured; never a P row |
| an oasis | every rung on arid sites | at the preset's values (§7.6; V12 §3.4.4); no reference row reads it | `water.walk` and the item-111 bars |
| a crypt, a catacomb, a vault | every rung (catacombs TOWN – METROPOLIS) | no underground profile enters a P row (V12 §2.2); the preset's underground is §7.6's | `crypt.*`, `catacomb.*`, `void.*` and the underground bars |
| an island's shade, a landfall | CITY – METROPOLIS | no island under a parity preset (the sky layer's extensions zeroed); no P row reads `shade.gap` | `shade.gap` descriptive; V05's fixture bars |
| a town history | every rung | the replay off (§4.11), so no replayed town in a P row | the item-113 bars on V06's and V04's fixtures |

T-V12-48 runs each row on a fixture town at each named rung under each preset arm its rows need: the P rows hold no
extension feature (no `retaining`, `raisedSupport` or `part` ≠ 0 way, no underground profile, no replayed epoch), every
measurement reads the feature by the rule above, and each `notApplicable` count is reported, never a crash, a silent drop
or a whole-run retry.

## 4 Editing

### 4.1 No new map event: calibration reaches a town as tables and presets

Calibration adds no event to §7.1's vocabulary and no declaration to item 101's tools. Its outputs reach documents in three
ways the base already edits: **table versions** (a release's re-signed cells, pinned in each recipe, §6.4), the
**historical pack** `historical:<frame>` (§7.6's packs slot, for documents of its era and region), and **thresholds**
(test-side, never in a document).
* A user overrides any calibrated value like any cell — the tables editor, the override layer, orphaned and shown side by
  side when a newer table version changes the row (§7.6); "reset to the shipped value" removes the override.
* A new town of a matching era and region takes an adopted historical pack by default and a selectable one from the preset
  dialog at creation (T1 `intend`'s advanced panel, V09); an existing town applies or removes it through §7.6's pack
  `adjust` (`param: 'packs'`) — a Re-derive from the pack's first reader stage with the fate report, the whole apply one
  undo step.
* A calibration release never changes a saved town silently: the town keeps replaying under its own output version, and
  moving it to the new tables is §7.5's upgrade, with its diff and its undo.
* **A suppression holds** (the owner's "then a user can decide to add or remove"). A table release or a historical pack
  never re-opens a raised way the user removed. The suppression is keyed to its **reason** — the drop, link or water need
  that raised it — not to the way's course (the key's owner is the base's §7 with V06's suppression, V06 §3.19.1; item
  260), so an apply or an upgrade that moves the course (a lower `viaduct.minDropM`, a doubled chance) keeps that reason
  suppressed, and the fate report lists the suppression as held (T-V12-40; V06 §3.19.1 and V09 keep the key independent
  of the course).

### 4.2 The records' verbs

The harness's records are repository data, changed only by these commands, each append-only with its undo:

| verb | changes | undo |
|---|---|---|
| `plat baselines check --previous <file>` then the baseline seat's commit | adds `Baseline` rows, a pin, a `CrossingRecord` | a superseding row (C9: nothing is deleted) |
| `plat calibrate run <spec>` | a `CalibrationRun`; if accepted, table sources, a minor version, shift records | a revert run whose spec restores the `from` values — itself declared |
| `plat calibrate register [--check]` | entry statuses from runs, picks and M-1 records, and a released pick's cells row (V12 §2.6) | a history row appended; a status never returns to `provisional` except under a new major table version |
| `plat calibrate register --defaults --milestone <id>` | the default line's entries for calibratable columns that hold a compiled cell and have no entry, each with a first history row naming the landing milestone and its `due` from it (V12 §3.11's *The due's corpus run*); on an existing default entry, or a named entry whose cells no run may name, `provisional` and not yet due, whose target's compiled cells differ from its last cells row on the row keys that row holds, one appended row `{ date, value, milestone, cells: true }` — its only change to an existing entry (V12 §3.11's *A value moved by its owning seat before its due*); on any entry whose target's compiled cells add row keys its last cells row lacks, the held keys unchanged, one appended cells row whatever its status or due (*Rows added*); without `--milestone` it refuses, writing nothing and naming the flag | the change that wrote them is reverted with the table change that landed the columns, and a moved-value or rows-added row with the table change that moved the value or added the rows; a later named line restates an entry in place, never deletes it |
| `plat calibrate register --hold <entry> --milestone <id>` | one held row `{ date, value: null, milestone, held: true }` on a `provisional` default entry, or a named entry whose cells no run may name, whose owning seat's tuning the change's golden check refused — its only change (V12 §3.11 (1)); refused on any other entry, naming why | reverted with the change that recorded it; a later cells row supersedes it in the report |
| `plat calibrate trial <record>` | each `TrialFinding`'s `route`, the trial rows on the register entries its cells name, the `known-defects.json` entries and the owner questions (V12 §2.14) | a superseding intake of the same record rewrites the routes; trial rows and defect entries are never deleted (a defect is closed by the change that clears it) |
| `plat nullmodel <spec>`, `plat statbar <spec>` | results inside a report | — (a result is a fact) |
| `plat d5 seeds / render / verdict <panel>` | `seeds.json`, renders, `record.json` | a new sitting writes a new record; answers are never edited |
| `research/baselines/*`, `research/d5/*`, the corpus adapter (research side) | capture plans, `MeasureInput` files, candidate files, sitting pages, the corpus index | re-run from their inputs |

### 4.3 The owner's inputs

The owner acts at six points, each recorded with its date: the sittings' answers, strip picks and `house` pick
(`D5Record`), the M4-110 group's among them; a written acceptance of a failed or unrated panel (`D5Record.acceptance`,
§13.6 (6)–(7)); the opening of M-CAL and of each later corpus run `M-CAL/<layer>` (`ReconciliationRecord.opened`, V12
§3.10.1); the palette pick if one is needed (V12 §3.10.7); the M-CAL panel's rating, frame by frame, which decides each
historical pack's adoption (Q-V12-3, answered J122: a layer becomes a default only where the owner's sitting passes it);
and the answer to each owner question of the reconciliation report and the trial's page ("keep the rule" by default; a
change of an owner rule is an owner amendment, never a run). A pick becomes an `owner-set` register entry; no run and no
seat moves an owner-set value afterwards (V12 §3.7.2 rule 2).

### 4.4 The clerk's view and the cell inspector

Every calibrated cell carries its `evidence` ids (V12 §2.10), and `dist/evidence.json` ships each cell's register status,
one plain line per cited id, and its entry's summary — method, due milestone, what it is measured against and its latest
history (`EvidenceFile`, V12 §2.10). The tables editor's cell inspector (V09 §4.14) shows the cell's provenance source, its
status in plain words (provisional, confirmed, fallback applied, not achieved, owner-set, fixed; "the owner's rule" for a
stamped cell), what it is measured against, its due milestone, its evidence lines and its latest history, and the preset
dialog lists the adopted and selectable historical packs ("historical (<era>, <region>)", offered only to documents of
that era and region). The clerk's provenance answer (V10 §2.13) to a question about a value — "why are lanes this curvy?" —
gives the plain line first ("tuned so organic lanes turn as much as FTG's streets per 100 m"), the status and what it is
measured against, and the run id only behind "details" (item 101's plain-words rule); a stamped cell answers "the owner's
rule, item …". Both read the shipped file, never `plat/calibration/` (W-IF-04, W-IF-05). No clerk and no API call can start
a calibration run: calibration is a repository process run by seats, never a document action.

## 5 Rendering, labels, exports

### 5.1 The parity dashboard

`plat parity --html` writes one self-contained page (inline SVG, no external script or font request, our own UI colours —
no reference palette): a header (output version, tier, date, the baselines file's hash, counts of pass, fail, reported,
not applicable); a **plain-words summary** — "37 of 41 comparisons in band; out of band: …", each out-of-band row as its
metric's `plain` sentence; then one table per reference, rung and preset arm: metric (plain name and id), ours, band,
verdict (a word and an icon, never colour alone), and a sparkline of ours over the last 14 nights. `plat parity` appends
one line per row per run — date, row id, ours, verdict — to `plat/goldens/parity/history.jsonl`, pruned to 60 nights, and
the sparkline reads it (the nightly reports themselves are CI artifacts the CLI cannot read). Each distribution row opens a
small chart of our per-seed CDFs against the reference seeds'. A tendency bar's verdict prints as a word — pass, pass on
confirmation, suspect (re-run pending), fail, not applicable — with its test value. Milestone dashboards are stored beside
their reports in `plat/goldens/parity/`; nightly ones are CI artifacts kept 30 days.

### 5.2 Run, register, correlation and trial reports

`plat calibrate report <run> --html`: the spec, a chart of score against candidate value in evaluation order, the train and
holdout tables, the changes with their evidence, the shift records, the plain sentence. `plat calibrate register --html`:
counts by status and owner, entries due at the next milestone, overdue entries first, and the default line's entries by
owner and table with those a change's `--defaults` run wrote marked new; every entry a change's `--defaults` run appended a
moved-value row to marked moved and a rows-added row to marked rows added ("rows added after close" where the entry had
left `provisional`); every entry whose last row after its last cells row is a held row marked "held: a committed golden
reads it"; every closed entry with a trial row marked "questioned by the trial"; the entries it owes to a run listed (V12
§3.11); and each staged entry with its current stage, the stages passed and any stage read after its close. `plat
nullmodel --html`: per spec the share and median u against the rule, a per-seed strip of u values, the settings skipped
and why. `plat statbar --html`: per bar its test value against its pass line in words ("pooled share 0.78 over 131
effective instances, needs 0.67: pass"); for an ordered rule each level's rate with a two-standard-error whisker; for a
paired rule the per-seed table of the three measures; for a property its violations (record, step, before, after); the
confirmation re-run beside a suspect first run; verdicts as words and icons, never colour alone. `plat known --html`
prints each fixture's StructureResults per path — every check's `what` line with pass or its finding, and the generated
extras — and `plat noop --html` each pin's suites with byte-identity per stage. `plat calibrate trial --html`: per finding
its area, severity, sessions and route, the unrouted ones first.

### 5.3 The panel renders

V12 §3.9.2's `PanelRender`: 1 600 × 1 200 px PNG per side, matched metres per pixel, no labels, no furniture, the fixed sun,
PNG text chunks stripped, file names the images' content hashes. The label pass renders the same frames with labels on.
Our side is drawn by §8's pipeline under the pair's preset and family (§13.6 (3)); nothing in this volume adds a paint
program or a style.

### 5.4 The sitting page

Research-side, one local HTML file per sitting (V12 §3.9.4): a plain-words first screen; pairs full width, each side
enlargeable; buttons with visible keyboard shortcuts; a progress bar and a "pause" that keeps the answers; no text that
names a generator, a reference or a side. It meets the app's accessibility contract where it applies (§14's WCAG 2.2 AA
chrome rules: keyboard-only operation, visible focus, 4.5 : 1 text contrast); the images are the thing judged, so they
carry no alternative text that could reveal a side.

### 5.5 Release notes and the owner's pages

`@plat/docs`'s release-notes generator (§14) has a **calibration** section built from the release's `CalibrationRun`s and
their shift records: per run, the metric's plain sentence, the cells moved (`from → to`), the reference or frame, and the
run id ("no calibrated value changed" when the release holds no run); and a **new behaviour** line for each feature
switch-on bump (V12 §3.7.6) — "cities may now build viaducts, raised roads and aqueducts where the ground or the water
calls for them; you can remove any". At M-CAL, the owner's reconciliation report is one page per frame in plain words:
what the historical maps changed, what they were not allowed to change and why (the refused list, by rule), which
witnessed things the generator cannot make yet, each `ownerExcluded` row as a question with the recommendation "keep the
rule", each owner-stamped minimum a run met ("the historical maps show few raised ways; the owner's rule keeps cities able
to build them, at the lowest chance"), the default line's columns that closed `fixed` with "no admissible frame", counted
by volume (V12 §3.11), and three before-and-after thumbnails. A later run `M-CAL/<layer>` (V12 §3.10.1) adds its own page
in the same form, its thumbnails only where it moved a cell. The game-master trial's intake (V12 §2.14) adds one page in
the same form: its findings by area, the defects it opened, and each owner question with the recommendation "keep the
rule".

### 5.6 Exports and labels

Every record is JSON under its schema; `plat parity --csv` and `plat calibrate register --csv` write flat tables for a
spreadsheet; the research-side markdown mirrors of the shift and panel records are §13.3's. This volume draws no map label
and exports no map feature: the panel renders are §11's PNG export at a fixed frame, and `MeasureInput` for our towns is
§11.1's metric GeoJSON.

## 6 Performance budgets

Single-thread figures on the reference machine (§12.1), normalised by the calibration score; PLAUSIBLE until measured at
the milestone named.

| work | budget | measured at | pre-decided change if missed |
|---|---|---|---|
| `measureInputOf(doc)`, item 110's kinds and properties included | ≤ 15 ms at CITY, ≤ 45 ms at METROPOLIS | M1; again at M3a with item 110's kinds | build it from the columnar display list's model columns instead of entity walks; the new kinds likewise |
| all `geo` metrics of one town (the sum of `costMs`, derived blocks and street graph included) | ≤ 300 ms at CITY, ≤ 900 ms at METROPOLIS | M1 | the R4 sample drops from 1 500 to 750 (a major metric version: its reference rows are re-measured through `plat measure`, V12 §3.4.3) |
| `render` metrics of one town (the matched-scale city band and recoverability) | ≤ 1.5 s at CITY, ≤ 4 s at METROPOLIS | M1 | render metrics run every third night, rotating the settings |
| one `NullModelSpec` on one town (K = 20 permutations and the statistic; the town itself read from B-CITY) | ≤ 40 ms at CITY, ≤ 120 ms at METROPOLIS | M2b | K drops to 12 and the rule is re-calibrated by the rank receipt's code before use |
| B-REF nightly, counted per preset arm: MFCG TOWN, CITY and METROPOLIS at `none` × 2 arms (the `MFCG` preset for P rows, `'default'` for O and C rows) × 20 = 120 towns; MFCG `coast+river` at CITY × 1 arm × 20 = 20 (no stress baseline at TOWN or METROPOLIS, V12 §3.2.1); FTG 6 settings × 2 arms × 20 = 240; NG from `ng-counts.json`'s recorded districts (no search), ≈ 20 districts opened at LOD — ≈ 400 towns, ≈ 3 s each on average with the render metrics (METROPOLIS 40 of them) | ≤ 20 CPU-min, ≈ 2 min wall on 16 cores | M1 | render metrics every third night; then the O and C arms at 10 seeds nightly (20 at milestones) |
| all pooled statistics nightly — every `NullModelSpec` and pooled `StatBarSpec` on B-CITY's towns: the marginal cost only, K × the statistic (≈ 60 specs × 200 towns × 40 ms at CITY ≈ 8 CPU-min) | ≤ 10 CPU-min | M2b | specs rotate over nights by spec id; each spec still runs at least every third night |
| specs on their own `null/…` families (custom-chain fixtures, forced sites) and the web, comfort and chain bars of V12 §3.6b | ≤ 15 CPU-min together, nightly | M2b | they rotate over two nights |
| the item-111 water bars: `T111-3` with `stopAfter` S1 (≥ 200 site draws per water kind); `T111-1` and `T111-4` on their `null/T111-*` families with `stopAfter` S10b (≈ 1 200 towns over the three strata and two arms) | `T111-3` ≤ 2 CPU-min; `T111-1` and `T111-4` ≤ 15 CPU-min together, nightly | M1 (`T111-3`); M2b | the METROPOLIS stratum runs at milestones only and the nightly rotates the other two |
| the confirmation re-runs (`c1`, twice the towns), when a bar is suspect | ≤ 10 CPU-min per night, outside the tier budget as a runner job | M2b | queued to the next night |
| a site-stage sweep bar (item 109's relief trend: 200 site draws; the mining comparison: 1 600), `stopAfter` S1 | ≤ 2 CPU-min | `V4-U3` | — |
| a full-town underground bar (the access trend: 40 towns per rung, 120 at TOWN … METROPOLIS until V-M4, 240 from THORP after; the paired, two-sample, rate and floor bars) | ≤ 60 CPU-min each, milestone tier and weekly | `V4-U3` – `V4-U5` | the bars alternate weeks |
| the catacomb properties (the step script on the surveyed-dossier fixtures; H-100's epochs are V06's run) and the `exactStates` script on V04's lost-access fixtures | ≤ 5 CPU-min nightly together | `V4-U5`, V06's E-steps | the scripts run on half the fixtures per night, alternating |
| item 113's bars in the tiers — the replay's budget: the PR tier replays each history fixture once (each replay within V06 §6.7's per-start bound), T113-2's five-engine digest inside the nightly golden job, the owners' seed sweeps (V04's T-V4-76, V06's T-V6-72) in their volumes' budgets | ≤ 10 min wall at PR for the history fixtures, run 8-wide | `V6-E9` | the PR tier keeps one fixture per history kind and the rest move to nightly |
| a known-city fixture's skeleton path (PR): one CITY generation plus the structure checks (≤ 0.5 s) | ≤ 5 s per fixture | M3a | the PR run takes K2 only; K1 runs nightly |
| both fixtures' three paths (milestone tier) | ≤ 10 min wall, the canvas scripts' 10 minutes being V09's | M3a | the transcript path runs nightly instead |
| the no-op pins, nightly (the registered suites once more under each overlay) | ≤ the golden job's own time once more | M2b (the first pins); M3a | the pins rotate by family over two nights; the landing gate stays per commit on the two PR golden seeds |
| the four raised-way bars (≈ 1 700 – 1 900 towns per full run), weekly and at milestones | ≤ 20 CPU-min together, with `stopAfter` the raised-way stage | M3a, where raised-way generation lands (items 244, 290) | the METROPOLIS levels run at milestones only |
| a TOWN guard setting inside a run (30 towns) | ≤ 1 CPU-min per candidate | M3a | the guard runs on the chosen candidate and the bracket's endpoints only |
| `dist/evidence.json` | ≤ 200 kB shipped | M2b | lines longer than 160 characters truncate at a word, the full text staying in the run record; then each entry's history keeps its last row only |
| milestone parity (100 seeds per setting) | ≤ 60 CPU-min | M2b | 60 seeds per setting |
| one tuning run | the spec's `budgetCpuH`, default 2 CPU-h (a one-cell golden search ≈ 12 probes × 90 towns ≈ 18 CPU-min before the shortcut) | M2b | V12 §3.7.5's `aborted-budget` |
| the crossing check on a 5 000-row file | ≤ 30 s | M-1 (twin), M1 | — |
| the register check, the trial rows included | ≤ 10 s (PR tier) | M1 | — |
| panel assembly (36 pairs, strips) | ≤ 10 min | M1 | — |
| a gating sitting (M1, M2b, M4, M5; J122) — the batch of V12 §3.9.1 by the panels' `minutes`: M1 and M2b ≈ 40, M4 ≈ 45 with the M4-110 group's ≈ 5, M5 ≈ 55 with V01's re-offered MFCG and FTG pairs; a joining staged panel: the floor plans ≈ 20, the underground ≈ 15, the islands ≈ 5, the town histories ≈ 10, the village and stage 3 their owners' | ≤ 60 min, splittable into three sessions within seven days | M1 | fewer strips per sitting, strips carried to the next; a panel past the hour waits (V12 §3.9.1) |
| the game-master trial's intake (one record, ≤ 500 findings) | ≤ 1 min | the release gate | — |
| a corpus map's measurement / a frame's runs | ≤ 3 s per map / ≤ 4 CPU-h per frame | M-CAL | frames run on successive nights |

Calibration runs and M-CAL's runs are jobs on the CI runner outside the three tiers, never during a tier's timing phase
(§12.1), so they cannot disturb a timing that gates a budget; the tiers' own budgets (§13.8) do not change (J-V12.22).

## 7 Tests and acceptance bars

### 7.1 The bars

Classes as §15.2: C conformance, P parity with a measured reference number, O an outcome beyond the references. Each bar a
base bar's clause runs takes it over as §13.2's table names (calibration: every bar's register line and its spec).

| bar | statement | class | tier / from |
|---|---|---|---|
| T-V12-1 | **The crossing refuses what must not cross.** Fixture files — a place-name string in `capture`; a 201-character note; a six-hex-digit sequence; a row without `referenceBuild`; `sample.indices` starting at 3; a removed row; an unsalted corpus id; a corpus *target* row with `frameN` 12; a corpus string other than a preset key; a frame row whose frame's `frames.json` crossing is not earlier; an `answers.json` note carried as text — are each refused naming their check (C1–C10); an upper-case `sample.family` (`capture/MFCG/40/plain`) passes C2; the M-1 file passes the product check with 0 refusals at M1 | C | PR fixtures; M1 |
| T-V12-2 | **The band arithmetic.** On synthetic samples: n = 1 gives exactly c × 0.85 … c × 1.15; n = 5 gives the union of V12 §3.5.2; n = 10 gives the type-7 quantiles computed by hand; a sign-`any` metric widens additively; `absFloor` holds; the KS rule pairs single seeds and takes the reference's pairwise p90 | C | PR from M1 |
| T-V12-3 | **One implementation.** For every M-1 baseline, the released CLI's `plat measure` on the same `MeasureInput` agrees with the M-1 script within the metric's `tolerance` (default: 0.5 % relative or one unit of the last printed digit); recoverability within 0.01 on M1's golden renders (§16 M-1). Research-side (`research/baselines/check_t3.py`); its verdict reaches the exit record as the output hash | C | M1, research-side |
| T-V12-4 | **Our input equals our export.** On the golden suite `measureInputOf(doc)` equals the metric GeoJSON export read back — ids, kinds, classes (the `WayClass` mapping of V12 §2.2), `use`, `district`, `prosperity`, item 110's kinds and properties as item 447 exports them and V12 §2.2 declares them (the kinds `retaining`, `raisedSupport` and `span`; an aqueduct as a `way` of class `aqueduct`; `part`, `raisedKind`, `source`, `reason`, `onDeck`, `stair`, `ramp`, `stepMinCm`, `stepMaxCm`; item 447's other properties dropped on read by V12 §2.2's one rule), the closures' six barrier kinds (J-VI.3), an oasis as `lake` water, coordinates to the centimetre, each retaining wall and each built stretch one feature after V12 §2.2's merge of items 447's and 575's runs (`wall`, `run`, `state` and `condition` dropped) — and every `geo` metric gives equal values on the two; on a fixture document whose curtain holds one breached and one dismantled run and whose retaining wall holds one decayed run (their profiles written in the fixture), the read-back holds one feature per built stretch and per retaining wall, `stepMinCm` and `stepMaxCm` the least and greatest over the runs, and `wall.nodeSpacing` and `wall.towerSpacing` equal the fixture's all-standing twin's; a degenerate feature in our profile fails naming it (V12 §3.15 (b)) | C | PR (two golden seeds); nightly (the suite) from M1; item 110's clause from M3a; the runs clause from M4 (item 575) |
| T-V12-5 | **Like with like.** On B-CITY-lite towns the cluster-block and derived-street-graph metrics computed on our full input equal those on the same town's input with plots, blocks and lanes removed | C | nightly from M1 |
| T-V12-6 | **Measurement parity with our recorded measurements of MFCG.** The released CLI's `plat measure` on the five exports of `captures/mfcg/exports-2026-09-25/` reproduces gross cover 0.657 / 0.582 / 0.621 / 0.583 / 0.569 to three decimals, walled shares 0.98 / 0.97 / 0.92 / 0.82 / 0.30 to two, city gates 0 / 1 / 4 / 9 / 7 exactly and towers 33 / 32 / 29 / 24 on the dry cities, R4 medians within 0.02 of `docs/validation/bench/mfcg_orient.out`'s per-city values (the red-team used vertex-mean centroids and its own sampling; ours area centroids and our stream — the 0.02 absorbs both), the wall-alignment shares within one point of `mfcg_wallalign.out`'s; and on the sweep (`captures/mfcg/exports-sweep-2026-09-25/`) the buildings, walled share, cover, median footprint, gates, districts, plaza and castle areas of every size exactly as its `stats.md`. Research-side (`research/baselines/check_t6.py`); its verdict reaches the exit record as the output hash | P | M-1 (twin); M1 (the released CLI), research-side |
| T-V12-7 | **Reports are facts.** Two `plat parity` runs on the same inputs, on Node x86 and arm64, give byte-identical reports, an empty report included | C | nightly from M1 |
| T-V12-8 | **Runs reproduce.** A calibration spec run twice gives the same evaluations, the same chosen values and the same holdout report hash | C | M2b |
| T-V12-9 | **Runs keep to their scope.** Specs naming an `owner`, `owner-eye`, palette-target, `host` or `sf:` cell (V11 §2.2; item 534), an `ownerRule`-stamped cell, a `raisedWays` row below CITY (refused by V11's schema before the spec check), a non-calibratable cell, a `presets.MFCG` or `presets.FTG` entry, a `presets.FM`, `presets.VG` or `presets.NG` entry in any run but a `reference` run against that preset's own reference or a `fallback` run applying that entry's own register fallback (or such a run that also names a default or another preset's entry, or a fallback run moving it to any value but its entry's stated fallback), a preset entry that no register entry names (a code-read `ref:… (code)` entry or a `fixed:` off value), a bound outside the column's range, `lo` below the owner-stamped minimum on a CITY raised-way chance or a cap (rule 5), a table no target stage reads, a fifth cell, or a cell another open run holds are each refused before any evaluation; a fallback whose doubled value would pass its range top is clamped, and one already at the top goes to *not produced* | C | PR fixtures from M2b |
| T-V12-10 | **The holdout holds.** A planted over-fit fixture (a target whose train seeds are biased by construction) is rejected on the holdout; train, holdout, `bref`, `golden` and `bcity` seeds are disjoint for every setting (the collision rule) | C | M2b |
| T-V12-11 | **Guards win.** A candidate that improves its target but flips a passing C bar or owner-rule bar on the train seeds is never chosen; a chosen candidate that passes its targets but breaks a B-DOSSIER-lite bar, an owner-rule hook fixture or a known-city StructureCheck is rejected with `guardFlips` naming it; a run touching a raised-way row evaluates its TOWN guard setting, and a candidate that raises a way at a TOWN guard town, or moves a TOWN S4 or S5a – S5d isolated digest, is never chosen | C | M2b; the TOWN clause from M3a, where raised-way generation lands (items 244, 290) |
| T-V12-12 | **Emission is declared.** An accepted run yields a minor table version, provenance `ref:…` with evidence ids that resolve to baseline rows and the run, a `ShiftRecord` with cause `calibration` for exactly the stages whose isolated digests moved, the register's history row and the release-note sentence; a digest that moves without a record fails CI | C | M2b |
| T-V12-13 | **Reverts are exact.** A revert run restores byte-identical tables and stage digests of the version before the run, as a declared shift | C | M2b |
| T-V12-14 | **The correlation rule is calibrated.** On fixture towns with the subject placed uniformly among its eligible sites, ≤ 1 % of 200 bars pass under the rank rule for a normal statistic and for each discrete fixture (members m ∈ {1, 2, 3, 10} × base share q ∈ {0.3, 0.5, 0.85}), and ≤ 1.5 % under the pooled exact test; with a planted pull of 1.0 standard deviation ≥ 95 % pass the rank rule; a pooled spec whose null share exceeds 0.85 is refused at registration (the headroom lint); a `servedShare` spec at district scope is refused; T71-3 written as a `NullModelSpec` (block scope, 20 permutations, the `margin` rule) gives the base's shuffled-placement result; the rules' code reproduces `critique_v12_nullrule_rank_power.out` and `critique_v12_pooled_exact.out` within two points | C | M2b |
| T-V12-15 | **The null never tests a hard need.** A spec whose statistic is fixed by a hard need (a watermill's distance to water) gives S_k = S_obs on every permutation of every town, so each rank u is the tie-break's uniform draw and the bar cannot pass on the hard need | C | M2b |
| T-V12-16 | **Seeds by formula.** V12 §2.4's check vectors reproduce, and each newly registered spec's family vectors are recorded and reproduce; a planted collision is rehashed to `/r1`; the first 50 `bcity` seeds of a setting are B-CITY-lite's | C | PR from M1 |
| T-V12-17 | **Panels.** `plat d5 seeds` reproduces `seeds.json`; a key differing by one side fails its commitment; a missing answer leaves the panel *provisional — not rated*; verdicts on fixture answers equal the hand-computed §13.6 (6) results for MFCG (20 of 30), FTG (2 of 3 per rung), NG (14 of 20), Fantasy Manor, DW, AB (`reconcile`, `history`) and SOLO (⌈2n ÷ 3⌉ Yes), the M4-110 group included; a `none` panel records answers, no verdict and status `descriptive`; the `D5Record` holds a `reads` answer, a SOLO Yes / No, and verdicts grouped by template, frame and class; a milestone with two panels lists both in `MilestoneRecord.d5`; a sitting holds at most one re-offered panel, and a re-offered panel carries a fresh commitment | C | M1 (MFCG, FTG), M4 (M4-110), M5; each staged panel when sat |
| T-V12-18 | **Blind renders.** Both sides of every pair have the same pixel size and metres per pixel, no PNG text chunk, and our side's label layer is empty | C | M1 |
| T-V12-19 | **The sitting page works for the owner.** A three-pair fixture completes keyboard-only; a reload resumes with the answers kept; with browser storage blocked the page says so on its first screen and offers the export after every screen; the first screen says where the export lands; the export matches `AnswersFile`; axe-core finds 0 serious or critical violations (research-side harness) | C | M1 |
| T-V12-20 | **No provisional number dangles.** `plat calibrate register --check` is green, and on fixtures: (a) every calibratable cell is covered by an admissible source, an entry or a `fixed:` note; an `own` calibrate-later cell without an entry fails, naming `plat calibrate register --defaults`, and passes once that command has written its default entry (`cal.<table>.*.<column>`, `corpus`, due M-CAL, [`frame.<table>.<column>`], `line: 'default'`), a second run of the command writing nothing; (b) two entries or two columns for one knob fail; a named entry beside a default entry for one column fails, a named line's entry restating a default entry in place passes, and a `line: 'default'` entry with another method, due, metric or fallback fails; (c) a cell of an owner-rule hard clause without its `ownerRule` stamp fails; every §13.7 letter has an entry; statuses move legally; (d) a fixture milestone with an overdue provisional entry fails its exit, and one with an unrated `panel` entry reads *provisional — not rated*; (e) an entry naming `bar.<barId>` with no registered bar, or `frame.<table>.<column>` of a non-calibratable column, fails, and one naming `bar.T-V6-8` with its `BenchBarDef` registered passes; an entry for a base cell whose base change request has not landed fails ("cell exists"); (f) a fixture `siting.web` cell named by no line passes through the items 103–107 line's catch-all, and a fixture column two lines bind fails; (g) an entry naming `frame.*` beside a passing M2b metric is confirmed at M2b with no `frame.*` history row until M-CAL, and an entry of `frame.*` metrics alone with a due before M-CAL fails; (h) a fixture column whose first compiled cell lands after a committed fixture M-CAL record takes, from `--defaults --milestone M6-U`, due `M-CAL/under` and a first history row naming M6-U, and its landing exit passes, while the same entry due `M-CAL` fails, a default entry due `M-CAL/under` while no M-CAL record is committed fails, and a `frame.*`-only named entry due `M-CAL/under` for such a column passes; such a column takes `M-CAL/M6-P` from `--milestone V3-P1`, `M-CAL/sky` from `--milestone V5-P1` and `M-CAL/under` from `--milestone V4-U3b` or (a V11 C8 column) `--milestone M6-U`; (i) a column of an empty table takes no default entry until the change that ships its first row, and the entry then written names as `owner` the volume of that source file's author seat, which a second document's later cells do not move; (j) a fixture default entry written at M1 whose column's compiled cells a fixture M5 change moves with no history row fails `--check` naming `plat calibrate register --defaults --milestone <id>`, and after `--defaults --milestone M5` carries a second row `{ date, value: the moved cells by row key, milestone: 'M5', cells: true }` with its `status`, `due`, first row and other fields unchanged and passes, a second run appending nothing; the command appends nothing to a fixture default entry that is `confirmed`, or whose due's fixture record is committed, and lists it as owed to a run, and `--check` then fails that entry naming `plat calibrate run`; a closed fixture default entry whose later rows are metrics rows and whose column's cells equal its last cells row passes; (k) `--defaults` without `--milestone` refuses, writing nothing and naming the flag, and `--milestone P1` refuses naming V12 §2.8's form; an entry with `due: 'E2'`, or a stage due `U5`, fails naming the form, the same entry due `V6-E2` passes; (l) a fixture staged entry — `measure` at M2b, then `panel` at M4, then `corpus` at M-CAL — is `provisional` with `method` `panel` and due M4 after M2b's passing row (`stage: { index: 0, outcome: 'pass' }`), `confirmed` at M4's rated pass, and takes a `frame.*` metrics row at M-CAL with its status kept; the same entry with a panel No after the passing measure (no second value stated) closes `not-achieved`, its M-CAL row a metrics row; with the M4 panel unrated it reads *provisional — not rated* and passes M4's exit; stages written against §16's order (a `V4-U3` stage before an `M4` stage, a `corpus` stage first) are refused naming the pair; two stages at unordered rows (`V5-P1`, `V6-E7`) are each read at whichever exit comes first; an entry without `stages` reads as single-stage; a staged entry whose `due` is not its current stage's fails; (m) a fixture named `measure` entry whose one metric is `bar.<id>` of a `BenchBarDef` with `stages` `[]`, its cells tuned before its exit, fails `--check` naming the command until `--defaults --milestone V3-P6` appends the cells row, then passes; its line's hand fallback applied in a fixture exit's change appends a cells row and closes the entry `fallback-applied`; the same move on a named entry whose bar has stages fails as owed to a run, naming `plat calibrate run`, and the command appends nothing to it; (n) a fixture default-line column whose M2b rows' entry is closed at a committed fixture M-CAL record, with rows added at `V3-P1` by a seat other than its owner, fails `--check` naming the command until `--defaults --milestone V3-P1` appends the cells row, then passes, the register report listing the rows as added after close, while a changed M2b cell of the same column still fails as owed to a run; (o) `--hold` on a fixture `provisional` default entry appends one held row and changes nothing else, the register report lists the entry "held: a committed golden reads it", and `--check` passes it with its cells unchanged; (p) a fixture application constant whose provenance note names its test (V09's `raised.previewOnReleaseKm`, T-V9-3) takes no entry and passes; (q) a fixture named entry confirmed at M4 whose strip pick is released moving one cell passes `--check` once `plat calibrate register` has appended the pick's cells row, and fails before it; (r) a trial row naming no finding of a committed `GmTrialRecord` fails; the style check's threshold (row 52, `calibratable: false`) takes no entry and passes; the farm table's village rows hold entries and the derived territory per head none (E-38) | C | PR from M1 |
| T-V12-21 | **Evidence resolves.** Every compiled cell's `evidence` ids resolve to a baseline row, a run or a panel; `dist/evidence.json` has a status and its lines for each cell and, for each covered cell, its entry's method, due, `against` and latest history, and stays ≤ 200 kB; rewording an evidence line leaves every table content hash and output version unchanged (the pinning hash, §7.6); on a fixture, the cell inspector (V09 §4.14) and the clerk's provenance answer (V10 §2.13) show the plain line, the status, what the value is measured against and its due milestone, reading the shipped file only | C | M2b |
| T-V12-22 | **Drift is declared.** A fixture new build's rows are reported beside the pinned ones and gate nothing; a pin change without a `baselineShift` record fails CI; the record lists every flipped verdict; an unreachable reference records "unreachable" and keeps its pin | C | M1 |
| T-V12-23 | **Corpus intake.** On a synthetic corpus we author (60 maps, 5 flagged holdout, 2 flagged map-design, 3 frames): 0 holdout or map-design maps measured, their counts recorded; every id salted; no corpus string but preset keys crosses; `frames.json` crosses before any row of its frames, and a frame whose declaration postdates its rows is refused by C8 | C | M-CAL (the synthetic corpus from M4) |
| T-V12-24 | **The base stays the base.** Every corpus run's cells target `historical:<frame>`; the shipped default tables and the `MFCG`, `FTG`, `NG`, `FM` and `VG` presets' goldens are byte-identical before and after M-CAL and each later corpus run `M-CAL/<layer>` (a `presets.FM`, `presets.VG` or `presets.NG` entry moves only by its own reference run or its entry's own fallback run, V12 §3.7.2 (3), never by a corpus run); proposals aimed at a naming table, a dossier row set, a `presets` entry, an `owner` cell or an `ownerRule`-stamped cell are refused with their rule | C | M-CAL; each `M-CAL/<layer>` |
| T-V12-25 | **Evidence gates.** On the synthetic corpus, a possibility-only row proposing a weight is refused E1; a 12-map frame setting a share is refused E2; a drawn plate aimed at a structural metric is refused E3; the possibility floor only lifts 0 to 0.02 or lowers 1 to 0.98, and only in a cell a register entry maps to the metric; the reachability search (V12 §3.10.4) records a planted unreachable value; a planted record of a catacomb under a cathedral yields one `ownerExcluded` row, no layer cell and no known defect (109 (k) (2)), and a planted village catacomb the same (109 (k) (1)); a frame with zero raised ways yields the CITY raised-way chance at its owner-stamped minimum in the layer, a `floorsHeld` row and the report line; a witnessed TOWN aqueduct is recorded reachable by declaration and yields no layer cell | C | M-CAL |
| T-V12-26 | **Acceptance.** A1–A5 evaluated on the synthetic corpus; the M-CAL panel's decision computed per frame by V12 §3.10.6's rule, and with the panel unrated every pack ships selectable (`pending-owner`); an adopted pack applies to a new document of its era and region and never to another; a fixture frame row failing under the default passes the parity exit as `reported`; a document pinning a retired pack version replays it | C | M-CAL |
| T-V12-27 | **Palette re-check.** A synthetic plate set within 3 units of the released corpus-sourced ends changes nothing; one outside requires the owner's pick; a one-ended fixture (darkest ink) is compared on our p90 only; ink warmth and `ink`'s chroma (our own tolerances) are never re-signed; a re-sign without the pick is refused | C | M-CAL |
| T-V12-28 | **Clean room.** `baselines.json`, `metrics.json`, the register, run and panel records, `answers.json`, `key.json`, the capture-id files, `frames.json` and the trial's findings pass the scanner with 0 hits; no `MeasureInput` of a reference or the corpus exists under `plat/`, and no `plat/` test reads `captures/` (a path and header scan; T-V12-3 and T-V12-6 live research-side) | C | PR from M-1 |
| T-V12-29 | **Budgets.** V12 §6's rows, measured at their milestones (timings in the timing phase; CPU budgets by accounting) | C | as V12 §6 |
| T-V12-30 | **No silent gaps.** A row with a failed plan index listed in `sample.failed` passes C7; an unlisted gap is refused; an FTG capture without residents takes the nominal population, marked | C | PR fixtures from M-1 |
| T-V12-31 | **The tendency rules are calibrated.** `plat statbar --calibrate` re-runs V12 §3.6b's simulations with the product's rule code and matches `v12_sweeprule.out`, `v12_rev_clustered.out` and `v12_rev_confirm.out` within two points on every rate; on fixtures a planted 0.55 share fails `most` and 0.80 passes, and with a town effect of ρ = 0.3 a planted 0.55 passes ≤ 2 % of the time on effective instances; a flat rate fails `trend`, a planted reversal fails the no-reversal clause, a rate off by half fails `rate` at 200 units; **family-wise:** 40 fixture bars all at a planted 0.8-standard-deviation effect fire ≤ 0.1 fallbacks per table version with the confirmation stage; a suspect bar that passes its confirmation reads "pass on confirmation" | C | M2b |
| T-V12-32 | **Enclosures and way classes are measured by one rule.** On a cliff-closed fixture town (item 106) `walled.share` counts the buildings inside the enclosure, no tower spacing spans the closure, `gate.count` excludes a water gate and the harbour-mouth chain, `wall.barrierShare` equals the fixture's closure length share; the way mapping sends `through` and `primary` to `arterial`, `secondary` to `street`, `cul_de_sac` to `lane`, `path` to `track`, a bridge to its carried class and no `quay` or `pier` into the way graph; the five MFCG exports measured through the shore split keep T-V12-6's values, and the coastal city gives the 24 shore vertices and the 20 towers of its README's derivation | C | M1 (MFCG); M2b (ours, with item 106) |
| T-V12-33 | **The underground profile measures plans.** `undergroundInputOf` on a fixture ruin returns every gallery and chamber in every state; `plan.rightAngle` is 1.0 on a drawn rectangular grid and 0 on a drawn circle; `grid.r4` is 1.0 on an orthogonal grid and below 0.05 on 360 rays at 1° steps; `ruin.blockArea` on a 30 m centreline grid is 900 m²; `plan.*` and `ruin.blockArea` on a ruin with its stepped monument equal the same ruin's values without it | C | `V4-U3` |
| T-V12-34 | **Distinctness and structure rules bite.** A ruin laid from the town's own culture row fails `paired`; a ruin flagged `sharedAxis` is judged on its two other measures; ruins drawn with the cavern's outline fail `twoSample`; a dispersed class whose share drops by 0.10 with the web on fails `noRegression` | C | `V4-U3`; M2b (the web) |
| T-V12-35 | **The bar map is wired.** Every row of V12 §3.6b's bar map has a registered spec whose owner, owner's bar, rule, parameters and levels match; `plat statbar all` runs each on its tier; a registered spec absent from the map fails; a g tendency or property bar in §13.2 without a spec fails, except a clause on the registry's `conformance` list (§13.2's conformance clauses of items 105 – 113 — T111-2, T112-1, T113-1 – T113-4, T113-6 among them — and V04's T-V4-76, T-V4-78, T-V4-79); item 102 (g) has no spec | C | M2b (web, siting, chains); M1 and M2b (item 111's); `V4-U3` (underground); M3a (item 110's raised ways); `V6-E9` and M6-U (item 113's) |
| T-V12-36 | **Both known-city fixtures pass (item 110 (e), (f)).** For K1 and K2: the skeleton file and V09's canvas script give one model digest under `known/<id>`; the structure list of V12 §3.14 holds on all three paths and its emulation subset on V09's L2 variant; a failing check names its id and `what`; `namesClean` finds 0 scanner hits on the fixtures' files; the exit carries `T-V12-36:<id>` and the research-side "no outline traced" verdict at M3a | C | milestone tier from M3a; PR: K2's skeleton path |
| T-V12-37 | **Item 110's pins and the switch-on bumps.** Before a family's bump, a commit landing its code produces zero ShiftRecords on the pin's suites; after it, the suites under the overlay are byte-identical to the off-state set; a planted item-110 draw on a shared stream fails the pin, a planted empty array fails it, and an unrelated planted table shift re-records both sets with matching stage lists; the four bumps produce records with exactly their own `feature` cause; the raised bump moves no THORP – TOWN S4 or S5a – S5d isolated digest; across the four bumps the `MFCG`, `FTG` and `FM` presets' goldens stay byte-identical and no P row's input holds a `retaining` or `raisedSupport` feature or a way with `part` ≠ 0 | C | PR (the landing gate, two golden seeds); nightly from M3a; at each bump |
| T-V12-38 | **Item 110 measured without disturbing the old metrics.** On a fixture CITY with a viaduct over two streets, an arched aqueduct over two other streets, a terrace crossed by a stair, a mole with deck buildings and a stepped temple: the viaduct adds no node of degree ≥ 3 away from its ramp feet (`raised.junctions` 0); the aqueduct adds no node, edge or length to any way graph (`junction.*`, `street.*`, `sgd.*`, `street.detour` and `street.cyclesPerKm2` equal those of the same town with the aqueduct's way deleted); `wall.*`, `gate.count` and `wall.ungated` equal those of the same town with its retaining walls deleted; `bldg.*` and the cluster blocks equal those with the supports and spans deleted; T-V12-4's equality holds with every kind and property item 447 exports (the undeclared ones dropped on read, V12 §2.2) | C | M3a |
| T-V12-39 | **The raised-way bars.** The four `T110b.*` specs are registered as mapped; on planted fixtures a viaduct chance of 0.02 at CITY passes `presence` with N = min(500, ⌈5 ÷ 0.02⌉) = 250 towns on the ravine site, an elevated-road chance flat across `wealthLevel` fails the trend, and a landmark factor of 1 fails `higherWith`; a spec whose ravine site lets a cheap detour win is refused at registration | C | M3a (raised-way generation, items 244, 290) |
| T-V12-40 | **A suppression holds.** On a CITY fixture document with one generated viaduct removed: an upgrade across a release that lowers `viaduct.minDropM` leaves no raised way at that reason; applying a historical pack that doubles the viaduct chance leaves none either; in both the fates list names the held suppression; undoing the apply restores the prior document byte for byte | C | M3a (raised-way generation, items 244, 290) |
| T-V12-41 | **The monotone engine.** On the catacomb fixtures the step runner performs Regenerate, a Re-derive from S1 and from the underground stage, New random on the system, an upgrade replay, a dossier burial event and extend-growth through the base's own events; a planted shrink at any step, a complex vanishing between steps, or a growth above its cap fails with the record, the step and both values; a stagnant fixture's fill rising while its extent holds passes and a planted fill drop fails; the author-delete probe lowers the extent by exactly the deleted area and no later step re-digs a tombstone; an author edit in an `exactMonotone` script is refused | C | `V4-U3`; V06's E-steps |
| T-V12-42 | **The water bars (item 111 (d)).** `T111-1`, `T111-3` and `T111-4` are registered as mapped; on planted fixtures an arid row whose households sit no nearer water than the temperate row's fails `higherWith` on effective instances, and one 0.10 nearer passes; a site stage whose river chance on arid sites is set to the arid row's cell passes `rate` and one at half the cell fails at 200 sites; a town whose richest band lies farther from water than its middle band counts against `most`; `water.walk` equals a hand count on a three-household fixture with one oasis, one well and one dry plot; the `item111.water` pin is registered with V11 §3.17.1's three cells | C | M1 (`T111-3`); M2b |
| T-V12-43 | **The states engine (item 113 (e)).** On V04's lost-access fixtures the step runner performs a seal, a cave-in, a brick, a demolish-above, a reopen, a dig, an excavation, an epoch's seal and a later epoch's reopen, an undo and a save-and-reload through the base's own events; after each step every named cluster's excavation reading and dwellings equal the script's expectation; a planted reading left `accessible` after its last open link's seal, or dwellings kept in a lost cluster, fails naming the fixture, step, cluster and both readings; a script naming a cluster the fixture lacks is refused at registration | C | the later of M6-U and M6-E |
| T-V12-44 | **The trial's findings enter the record (item 112 (b)).** On a fixture `GmTrialRecord` of 12 findings: `plat calibrate trial` routes each by V12 §2.14's rules — a finding naming an owner-stamped cell becomes an owner question, a finding naming a calibratable cell appends one trial row to each covering entry with status, due and cells unchanged, every blocker and major opens a `known-defects.json` entry, a `colour` finding naming a pair the style check passed opens its family's defect and the threshold's; a finding naming a missing cell is routed by rule (3) with the drop noted; an unrouted finding, a dangling trial row or a missing route target fails; no participant name or quotation crosses (T-V12-28's scan); the intake's output hash is T112-2's exit evidence | C | the release gate (fixtures in PR from M3b) |
| T-V12-45 | **Every owner item's pin is one engine's.** Each pin of V12 §3.7.8's table is registered with its bar, its overlay copied from its home cells and its owners' suites; for each family the landing change's suites under the overlay are byte-identical to the goldens committed before it (the landing gate), the off-state set is recorded then (or at item 110's bumps, or with M1's first goldens), and a stepped landing (item 111's) re-runs the gate at each step; a pin bar §13.2 or a volume's §7 names with no registration fails; a planted leak (an item's draw on a shared stream) fails its pin | C | PR (the landing gates, two golden seeds); nightly from M2b |
| T-V12-46 | **The four sittings (J122).** On fixture panels: a sitting at M5 batches its own panel, then the staged panels that exited since M4 in §16's order, then at most one earlier provisional panel, while the panels' `minutes` sum to ≤ 60; a panel past the hour waits and after M5 is offered with every release, its status *provisional — not rated*; a staged panel whose build exits after M5 is never placed in a gating sitting it postdates; with every staged panel unrated, no gate they claim is claimed and the M-CAL packs ship selectable | C | M1; M5 |
| T-V12-47 | **Every edge defined (V12 §3.15).** Each clause asserts its row's outcome on its fixture, with no crash, no hang, no lost record, no silent drop (every drop counted) and no whole-run retry: (a) the baselines file; (b) runs and tuning ranges; (c) the register and its lint; (d) the correlation harness; (e) the tendency harness; (f) panels and the owner's inputs; (g) the corpus; (h) provenance and `dist/evidence.json`; (i) the known-city fixtures; (j) the pins; (k) the loop, the report, determinism and the dashboard at every rung; (l) the capture loop, the crossing and the verbs; (m) drift; (n) failures; (o) calibration in documents and the release notes | C | PR (fixtures); the rung sweep nightly |
| T-V12-48 | **The parity presets meet every feature (V12 §3.15).** For each combination row, on a fixture town at each named rung under each preset arm its rows need: no extension feature in a P row's input (no `retaining`, `raisedSupport` or `part` ≠ 0 way, no underground profile, no replayed epoch, no island), each feature read by the profile's rule, and every `notApplicable` count reported | C | nightly from M3a; the staged rows with their layers |

### 7.2 Parity metrics for this volume's own subject

The subject here is measurement itself, and the reference that owns it is our own recorded measurement of the references:
T-V12-6 holds the one implementation to the red-team's and the sweep's executed numbers on the same files, and T-V12-3
holds it to every M-1 row. The generator's parity against MFCG, FTG, NG, VG and Fantasy Manor is §13.5's rows and the
volumes' rows, which this harness runs (V12 §3.4.4). Items 110, 111 and 113's subjects have no reference at all (V12
§3.4.4): their bars are ours only — the conformance clauses, the raised-way and water tendency bars, the states engine,
the known-city fixtures and the M4-110 group — and the parity presets never show them (T-V12-37, T-V12-48).

## 8 Build plan

### 8.1 Where it slots into §16

Most of this volume is the base's own verification rig made exact, so it is built inside the base's milestones, from M-1
to M4, and priced inside §16's verification-rig line (item 533; V12 §8.2's base-side steps, 6–9 pw). The known-city fixture
engine, K2, item 110's pins and measurement profile land at **M3a** with item 110 (a) – (d)'s base parts; the four
raised-way bars and the TOWN guard inside M3a too, where raised-way generation lands (items 244, 290); the M4-110 group at
M4. The first owner-item pins land at M2b with items 102–107 (item 111's oasis pin at M1); item 111's water bars at M1 and
M2b. The panels of M5, M6 and V-M4 register on the engine M1 builds; their content is their volumes'. The corpus
reconciliation is its own staged milestone, **M-CAL**, at its place in J122's order (§16): after M6-sky, its inputs M4, M5,
M6 and V-M4, and before the SettlementForge stage M-SF (V08 §8); its later runs `M-CAL/<layer>` follow the columns that land
after its record (V12 §3.10.1). The owner's roadmap stages it, so its price sits outside the base's total, as V08's M-SF
does; §16 computes both totals once (item 568) and this volume states none of its own.

### 8.2 Steps, estimates and exits (person-weeks, expert; PLAUSIBLE)

| step | milestone | content | exit (executed) | pw |
|---|---|---|---|---|
| W1 — the capture plan and the crossing | M-1 | the seed families' research-side twin (`docs/validation/bench/v12_h32_vectors.py` is its check); the capture plan; MFCG at ten seeds per matched size plus five stress seeds; the adapters to `MeasureInput`; the M-1 metric scripts for every ⟨M-1⟩ and baseline row of the catalogue; `cross_check.py`; the pins and the first `CrossingRecord`; spikes S-V12-1 and S-V12-2 | every §13.5 baseline row present by the ⟨M-1⟩ rule (§16 M-1); T-V12-1's fixtures on the twin; T-V12-6 (twin); T-V12-28; T-V12-30 | 0.5–1 |
| W2 — measure, parity, panels | M1 | `@plat/testkit/metrics` with `METRICS`, `measureInputOf` with the enclosure profile, the MFCG shore split, the derived features, `plat measure`, `plat baselines check / aggregate`, `plat parity` to V12 §3.5 with the dashboard and CSV; `@plat/testkit/seeds` with B-CITY's and the goldens' formulas (item 491); the panel engine (`PanelSpec` with `minutes`, `plat d5 verdict` reading only crossed files, the variants' types, the `D5Record` and the milestone's panel list, the batch of the four sittings) and `build_sitting.py` with its storage fallback; the research-side checks `check_t3.py` and `check_t6.py`; `history.jsonl`; the M-1 metric rows' product side (`street.detour` … `draw.hairline`); the register with §13.7's letters and the M1–M2b constants, and `plat calibrate register --defaults --milestone <id>` (V12 §3.11's default line with *The due's corpus run*'s table, the flag required and its ids volume-qualified, V12 §2.8, the moved-value row of *A value moved by its owning seat before its due*, the staged entries, the rows-added and held rows with `--hold`, and the due test); `T111-3` and the `item111.water` pin with M1's oasis | T-V12-1 – T-V12-7, T-V12-16 – T-V12-20, T-V12-22, T-V12-32's MFCG clauses, T-V12-42's M1 clause, T-V12-46's M1 clause; the M1 panel sat or *provisional — not rated* | 1.75–2.25 |
| W3 — tuning and correlations | M2b | `plat calibrate run` (the search, guards with the fixture suites, holdout, the stage-isolated shortcut, emission and revert, the owner-stamp and range-minimum refusals); `plat nullmodel` with the rank rule, the pooled exact route, the headroom lint, the confirmation stage and B-CITY's towns; `plat statbar` with its rules (effective instances, the town clause, derived values, `stopAfter`), `--calibrate` and the bar map's siting, web, comfort, chain and water specs; the `evidence` ids with V11's compiler, `dist/evidence.json` with statuses and entry summaries, the `ownerRule` stamps; the register's lint over every calibratable cell; the owner-item pins of items 102–107 with their landing gates; the first runs (`headingSigma`, the rung modifiers, O18 (j), items 24, 30 and 71's weights as they fall due); spikes S-V12-3 and S-V12-4 | T-V12-8 – T-V12-15, T-V12-20, T-V12-21, T-V12-31, T-V12-34's web clause, T-V12-35, T-V12-42, T-V12-45's M2b pins; every entry due at M2b confirmed, fallen back or not achieved | 2–2.75 |
| W5 — item 110's harness | M3a; M4 | the known-city fixture engine (`KnownCityFixture`, `StructureCheck`, the three paths' runner, the emulation subset), K2's structure list and golden, K1 on the engine; item 110's pins and their landing gate; the profile's item-110 kinds (item 447); then the four raised-way bars and the TOWN guard; then the M4-110 group and the item-110 register lines (V12 §3.11) | T-V12-36 – T-V12-38 at M3a; T-V12-39, T-V12-40 and T-V12-11's TOWN clause at M3a once raised-way generation lands inside it (items 244, 290); T-V12-17's M4-110 clause at M4 | 1.25–2 (M3a 1–1.75: the fixtures, pins and profile 0.75–1.25, then the raised-way bars and the TOWN guard 0.25–0.5; M4 0.25) |
| W4 — notes, audit, drift, the trial's intake | M3b–M4 | the release notes' calibration section and new-behaviour lines; the register report; M4's provenance audit reading `evidence`; a rehearsed pin change; `plat calibrate trial` and its fixtures (the intake itself runs at the release gate, V12 §2.14) | the M4 audit green; T-V12-22 on a rehearsal; T-V12-44's fixtures | 0.25–0.5 |
| W6 — the underground's and the histories' harness | `V4-U3` – `V4-U5`; `V6-E9` | `undergroundInputOf` with the monument rule; the crypt and catacomb metrics; the step-script runner for `exactMonotone` with record identity, `exactBound`, the author-delete probe and `exactStates`; the `item109.underground` and `item113.history` pins; item 113's register lines and the history fixtures' PR runs | T-V12-33, T-V12-41, T-V12-43, T-V12-45's staged pins | 0.25–0.5 |
| — panels and bars of later stages | M5, M6, V-M4, `V3-P6`, `V4-U3` – `V4-U5`, M6-sky, `V6-E7` | the NG, Fantasy Manor, VG, Dwellings, SOLO, island and history panel specs on the engine (each sat or provisional by V12 §3.9.1); item 109's bar specs | T-V12-17's clauses for each panel sat; T-V12-34, T-V12-35's underground clause | within V01, V02, V07, V03, V04, V05, V06 |
| the base-side steps together | | | | 6–9 (inside §16's verification-rig line; T-V12-47 and T-V12-48 grow with the steps whose mechanisms they edge) |
| M-CAL — the corpus reconciliation (staged) | after M6-sky (J122); its inputs M4, M5, M6, V-M4 | the owner opens it; the adapter, its frames and `frames.json` (research side, 1.5–2.5); measurement and crossing (0.5–1); the corpus runs per frame, upstream first, with the reachability search, R6 and the owner-excluded report (2–3.25); the historical pack in §7.6's packs slot with per-frame adoption (0.25); the before-and-after panel, the palette re-check, the report and the release (0.5–1); the synthetic corpus for T-V12-23 – T-V12-27 is authored at M4 | T-V12-23 – T-V12-27; the M-CAL panel rated, or *provisional — not rated* with every pack selectable; the `ReconciliationRecord` committed | 4.75–8 |
| `M-CAL/<layer>` — the later corpus runs (staged; V12 §3.10.1) | after M-CAL and the layer's last milestone, each on the owner's word | one run over the entries due there on M-CAL's frames — the underground's E1 and E4 only, the others as their frames admit; the pack versions, the panel only when a cell moved, the report and the release | the run's entries closed; its `ReconciliationRecord` committed; its panel rated or *provisional* when offered | 0.25–0.75 each, outside both of §16's totals |

### 8.3 Risks, spikes and their pre-decided outcomes

1. **Small reference samples make noisy bands** (FTG has three captures per size). *Spike S-V12-1 (M-1, 1–2 days):*
   bootstrap the ten MFCG seeds per size — draw ten with replacement 1 000 times, recompute each target band, and count how
   often a fixed candidate value's verdict flips. *Pre-decided:* above 10 % of target rows flipping in over 5 % of draws,
   MFCG goes to 20 seeds per size (minutes of exports); FTG's rows stay as §13.5 classes them (weakness and descriptive,
   the one declared target exception).
2. **The derived street graph may be unstable** (skeleton spurs on lot outlines). *Spike S-V12-2 (M-1, 1 day):* its metrics
   on the ten seeds per size; *pre-decided:* a metric whose seed-to-seed CV exceeds 0.3 becomes descriptive by the ⟨M-1⟩
   rule and enters `known-defects.json`.
3. **Targets fight each other** (a gain on one row costs another). The guards stop a trade; a run that cannot satisfy both
   is rejected and the register's fallback decides.
4. **Tuning over-fits the train seeds.** The per-run holdout and the gate seeds after release (V12 §3.7.5–§3.7.6). *Spike
   S-V12-3 (M2b week 1, 2 days):* `headingSigma` end to end — spec, search, holdout, emission, revert — before any other
   run.
5. **The correlation rule mis-calibrated on real placements** (effects smaller than the planted ones). *Spike S-V12-4 (M2b,
   1 day):* T71-3 and three g bars on B-CITY-lite; *pre-decided:* a bar that fails takes its spec's fallback (V12 §3.6),
   never a lower threshold.
6. **The owner's time** — four sittings of about an hour (J122). §13.6 (7)'s rule answers the rest: a panel that is not sat
   stays *provisional — not rated*, never stops the build and never lets a gate be claimed; the batch (V12 §3.9.1) keeps
   each sitting inside its hour.
7. **The corpus may hold few surveyed frames.** Then reconciliation is mostly possibility (reachability) and drawing (look
   targets); the process runs unchanged and says so in the owner's report — no prevalence is invented.
8. **A reference build disappears** from its host. The captures on disk remain the evidence; the pin freezes on the last
   captured build, recorded in `drift.md`.
9. **Real tendencies may be weaker than the simulated ones** (instances of one town correlate; the design's rows may produce
   smaller shifts). The bars carry their owners' fallbacks (V12 §3.6b); a bar that fails twice is *not produced*, never
   relaxed, and T-V12-31 keeps the rules' own calibration honest.
10. **A fixture level may be unreachable by a frozen S1 output** (a source a later stage decides). The spec is refused at
    registration (V12 §3.12) and its owner states the level through a dossier fixture or a declaration instead.
11. **An item-110 capability may be missing at M3a.** K2's StructureCheck then fails M3a's exit (no deferral); the
    pre-decided outcome is that the capability's base part lands before M3a closes, or K2's golden is recorded without it
    only if the owner moves that capability's milestone in writing — an owner decision on product order, never a seat's.
12. **Small pulls may escape the rank rule** (its power at a 0.3 pull on single members is 0.30 – 0.54). *Pre-decided:* a
    member-on-plot statistic always takes the pooled route (power 0.38 – 1.00 on the same fixtures); a bar still failing
    takes its fallback — never a looser rule.
13. **The pins double the golden job's time.** *Pre-decided:* V12 §6's rotation by family; the landing gate never rotates.
14. **A water bar's household instances may cluster by town more than the simulations assumed.** The design effect is
    estimated per bar (ρ̂), so a stronger clustering lowers the effective count and draws more towns, never passes on too
    few; a bar still short is `insufficient` and its owner adds an arid fixture level.

## 9 Decisions (each vetoable)

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
| J-V12.10 | chose calibration runs whose spec is committed before the first evaluation, with common random numbers, per-run train and holdout families, at most four cells and no gradient method, over hand tuning of a value a stage already reads in a committed golden, because a pre-registered objective cannot be chosen after seeing results, and the holdout catches a value fitted to its seeds; a value set before any reader's golden holds it — volume 1's M5 tunings inside the work items that land their readers — is authoring, not a run, recorded by the moved-value row of V12 §3.11's *A value moved by its owning seat before its due* (amended by J-V12.77) |
| J-V12.11 | chose that no run may move an `owner`, `owner-eye`, palette-target, `host` or `MFCG` or `FTG` preset value, that a `presets.FM` or `presets.VG` value moves only by a `reference` run against that preset's own reference or by a `fallback` run applying its register entry's own pre-decided fallback, touching no default, and only where a register entry names it (V02 §3.10.8 at M6c; V07's one measured-rate entry, `rules.race.densityPower@VG`, at V-M4, every other `VG` entry code-read or `fixed:`), and that every owner-rule bar is a guard, over letting parity numbers win or freezing every preset, because the owner's rules outrank parity, and the FM and VG presets' measured-rate cells exist to be set against their own references while no default moves with them (amended by J-V12.63, J-V12.67) |
| J-V12.12 | chose, for every random-baseline bar, the randomised-tie rank u per town and the rank rule (u > 0.5 in at least 70 % of the towns and median u at least 0.60), over the first rule's z-sign clause, because u is exactly uniform under no pull however discrete the statistic — the base's own faithfulness-campaign tie-break — so the rule passes chance at most 0.5 % on normal and on few-member discrete statistics (executed), where the z-sign rule passed 58 – 98 % on skewed shares, while keeping the z rule's power on smooth statistics (0.927 at a 0.8-standard-deviation shift) — the owner's "correlating general rule" made honest |
| J-V12.13 | chose to move each reference's pin to its newest build at the next milestone boundary, as a declared baseline shift, over freezing the M-1 build, because parity is judged against the product the owner can open today, while the old rows stay as history |
| J-V12.14 | chose to seal each panel with an operating-system random salt and commit only the key's hash, over a formula-seeded coin, because a public formula would let anyone predict which side is ours |
| J-V12.15 | chose that every corpus change lands in a reconciled preset `historical:<frame>`, never overwriting a shipped default, over re-signing cells in place, because the owner's "what you have built is always the BASE" and item 23's emulation-first default both hold only if the built values survive intact, and adopting the layer is the owner's sitting's (Q-V12-3, answered J122) |
| J-V12.16 | chose that a drawn plate stays `drawn` even with a scale bar unless the corpus's own metadata calls it a survey, over classing by the scale bar, because a painted plate's geometry is an artist's, whatever its scale bar says |
| J-V12.17 | chose that possibility evidence creates reachability requirements and at most lifts a chance from 0 to 0.02 (or lowers 1 to 0.98), over letting witnessed examples set weights, because a record proves possibility, not prevalence |
| J-V12.18 | chose to re-measure the palette axes by our own definitions at M-CAL and to ask the owner only when a band end moves by more than 3 units (3 C* for chroma), over silently re-signing, because the bands are the owner's numbers and our instrument differs from the corpus's |
| J-V12.19 | chose a sample frame of at least 20 surveyed maps, declared before measurement by a rule naming no measured feature, as the only prevalence evidence, over any large set of maps, because a set chosen by what it shows measures the chooser, and below 20 maps a p10 – p90 band, though computable, is too variable to set a band centre |
| J-V12.20 | chose a local sitting page, never published, over a hosted page, because the reference images are other creators' work |
| J-V12.21 | chose to open M-CAL once the standalone generators it calibrates have exited (M4, M5, M6, V-M4), at its place in §16's order after M6-sky, with every column whose first compiled cell lands after its record taking a later run of the same process, `M-CAL/<layer>`, a milestone of its own, over one reconciliation after everything, because the owner's order is "built standalone first, then calibrated" and some staged steps may land after it (amended by J-V12.75 and J122's order) |
| J-V12.22 | chose to run calibration and corpus jobs on the runner outside the three CI tiers and never during a timing phase, over fitting them into a tier, because a two-hour search would break a tier's budget and disturb gating timings |
| J-V12.23 | chose one panel engine keyed by milestone id, with `D5Pair` variants for Fantasy Manor, VG and the before-and-after pairs, over a protocol per stage, because §13.6's blind rules, sealing and pass rule are the same whatever is compared |
| J-V12.24 | chose to write research-side paths in committed files as opaque `research:` labels, over plain relative paths, because §17.1 (3)'s path rule must never meet a research path inside `plat/` |
| J-V12.25 | chose FTG's pin as a capture-date range, moved when two of a size's three new captures fall outside the pinned spread on one metric, over a pin per capture, because FTG's server cannot be seeded or versioned from outside |
| J-V12.26 | chose a failing correlation bar's default fallback as "after a confirmed failure, double the pulling weight once, clamped to its column's range and never across an owner-stamped cell or minimum, then report not produced", over lowering the bar, because §13.7 forbids a fallback that passes by construction, and a doubled value outside its range or across the owner's floor would break the compiler or the owner's rule |
| J-V12.27 | chose that a rated verdict needs every answer, an incomplete sitting staying *provisional — not rated* with its answers kept, over rating a partial sitting, because a partial panel could be steered by which pairs were skipped |
| J-V12.28 | chose "most" as a pooled share of at least 2/3 over at least 100 effective instances from at least 20 towns, with a town clause, over a raw instance count, a per-town majority alone or a test against one half, because a clear leaning (0.75) then passes 97 % of the time and a coin flip (0.55) at most 1 % even when a town's instances share a town effect (executed, ρ = 0.3), and two thirds is the owner's own bar at the sittings |
| J-V12.29 | chose exact binomial tests at 0.01 for a floor (one-sided) and a rate (two-sided, 200 units), over comparing a point estimate with the value, because a random mechanism set exactly to its promise would fail a point comparison half the time |
| J-V12.30 | chose one Cochran–Armitage trend test at one-sided 0.01 with a two-standard-error no-reversal clause, and a stratified Cochran–Mantel–Haenszel test for "higher with than without", over pairwise tests between levels, because one test over all levels holds chance near 1 % (executed) and the clause keeps "rises monotonically" honest without demanding strict steps that noise would break |
| J-V12.31 | chose the enclosure — built stretches plus natural closure edges — as what every wall metric reads, with MFCG's ring split at the shore, over measuring curtains alone, because item 106 makes barriers part of the circuit and MFCG's exported ring already follows the shore where its wall is open, so one rule measures both and T-V12-6's recorded values stand |
| J-V12.32 | chose ruin distinctness as a per-seed paired rule on block size (ratio 1.5), grid order (0.15) and axis (10°), each in 70 % of seeds and every seed on two, over comparing the culture rows' parameters, because the owner's refinement is about what a reader sees under the town, and skipping the axis for a shared-axis ruin honours item 109 (c)'s surviving old axis |
| J-V12.33 | chose the structure test as a separation — the ruins' median above the caverns' 90th percentile — over a significance test, because the difference is large by construction and a test small effects pass would not catch a ruin drawn as a cave |
| J-V12.34 | chose SOLO and AB groups on the one panel engine for sittings without a reference, over separate protocols in V04 and V06, because sealing, the resumable page and the two-thirds rule are the same, and SOLO's Yes / No fits two modes of ours that have no better side |
| J-V12.35 | chose to apply a bar level's site as a frozen S1 output through the golden tooling's stage isolation, over a test-only branch in the generator, because a bar must test the shipped code path |
| J-V12.36 | chose that the ladder rows (provenance source `sf:`, V11 §2.2, item 534) and the port's unnumbered ranges are never calibration targets, over tuning them, because the first are the owner's program's facts pinned to the port's baseline (item 108 (a)) and the second derivation rules of the port (item 20 (h)) |
| J-V12.37 | chose to confirm the underground's rows by the owner's V4-U5 panel, when it is rated, and E1's reachability, never by prevalence, over leaving them without a confirming route or inventing a source, because no town plan frames an underground |
| J-V12.38 | chose record-keyed monotone checks — each catacomb complex by its id, which keeps its source lineage — over step scripts of the base's own events (Regenerate, Re-derive, New random, upgrade replay, a dossier event, extend growth) that exclude author edits, with an `exactBound` for the growth cap and a stagnant-fill form, over the first volume's epoch-only levels, because the owner's ratchet binds every derivation ("they do grow and never shrink", item 109 (k) (4)), a cave-in or a second complex would otherwise read as a shrink or a jump, and J-V4.56 exempts the author |
| J-V12.39 | chose to route every witnessed contradiction of an owner rule to the owner (R6: an `ownerExcluded` row and an owner question with the recommendation "keep the rule"), with owner-rule cells stamped at compile time, over E1's possibility floor in the layer or a known-defect line, because the owner's rules outrank the corpus, and the layer may become the default by a sitting that judges looks, not rules |
| J-V12.40 | chose to read B-CITY's nightly towns for the pooled siting bars, paying only for permutations, with `null/…` families only for settings B-CITY lacks, over per-spec town families, because V11 already states its bars on "≥ 200 B-CITY seeds per rung", those towns are generated every night anyway, and dozens of per-spec families would cost thousands of generations |
| J-V12.41 | chose three authoring paths for the second known-city fixture (skeleton file, canvas script, transcript), over the two item 110 (e) names, because the item gives it "the same acceptance bars as the first fixture" and T101-6's bars are three paths; "both ways" names the two that share a digest |
| J-V12.42 | chose owner-stamped calibration minima for the CITY and METROPOLIS raised-way chances and caps (their values V11 §3.24.2's row 80), binding every run, fallback and corpus pack, with V11's schema holding the rung gate (no `raisedWays` row below CITY) and a TOWN guard setting in every run that touches a raised-way row, over leaving the chances to tuning and the corpus, because the owner ruled that cities generate raised ways and towns only declare them, and a layer adopted as the default must never undo that; the minima bind calibration only, so the parity presets' extension zeros, a pin's overlay and a user's own edit stay free |
| J-V12.43 | chose V11 §3.24.0's switch table (one named, in-range off form per row set, which is also the parity-neutral default) as the no-op pins' overlay, and one off-state golden set per family recorded at switch-on and re-recorded only by other causes' declared shifts with matching stage lists, over digests of "the code before the fold" or a fresh boolean per family, because stored "before" digests go stale at the first unrelated shift and then fail forever or stop guarding, and V11 has landed one definition of "off" that every lane's pin can share |
| J-V12.44 | chose tendency bars only for the owner-rule text's two "likelier" clauses (prosperity, dossier landmarks) and presence bars on forcing sites for the viaduct and the aqueduct, over on / off rows for every kind, because without its reason no raised way may exist, so an "off" arm measures conformance, not a leaning, and a site where the detour always loses keeps the presence chance honest |
| J-V12.45 | chose a six-item SOLO group inside the M4 sitting (K2 and five forcing-site towns) to confirm item 110's rows, over the realism item of the ordinary D-5 pairs, because a random pair seldom shows a raised way, a terrace or a deck building and a confirmation must be attributable to the rows it confirms |
| J-V12.46 | chose a pooled exact hypergeometric test for statistics that count members on indicator plots, with a headroom lint refusing a nearly-always-true indicator, over the rank rule for those too, because the exact pooled count is more powerful on few members (0.705 against 0.302 at a 0.3 pull on single members, executed) and no rule can see a pull when the indicator is already true for 85 % of plots |
| J-V12.47 | chose a confirmation re-run on a fresh family at twice the towns before any fallback fires, over a stricter single-run rule, because with dozens of nightly bars at 93 % power a few would otherwise fail by bad luck and double real weights; with the re-run 40 bars at a real 0.8-standard-deviation effect fire 0.06 false fallbacks per table version (executed), and the null pass rate stays 0.25 % |
| J-V12.48 | chose that an owning volume's stated pass rule, seeds and tolerance win and V12's rules are defaults taken as parameters, while the unit a g item names binds everyone, over V12 overriding the volumes, because each volume keeps its rows' content (single source), and the g item is the owner's text |
| J-V12.49 | chose the historical layer as a setting pack in §7.6's packs slot bound to its frame's era and region, adopted per frame, over a preset in the one preset slot, because a document must be able to hold its D-2 era and region preset (or a parity preset) and the matching layer at once, and one frame's layer must never reach a town of another era or region |
| J-V12.50 | chose effective instances by the one-way analysis-of-variance design effect, deep voids as connected components counted at most three per town, and a town clause on towns of three or more instances, over raw instance counts, because one access opens a whole connected system and instances of one town share a town effect; the correction restores the independent rule's size (0.9 % at a 0.55 share, ρ = 0.3, executed) |
| J-V12.51 | chose to compare a corpus siting row with our statistic in the same corpus variant (buildings with a use, Euclidean distances, any building eligible), computed as a `geo` metric on our measurement profile, over comparing it with the model statistic, because the model statistic uses way distances among hard-need-eligible plots — a different quantity — and like must be compared with like where the corpus sets weights |
| J-V12.52 | chose E1's reachability search as the grid of the controls the metric's stages read, at their range ends and middle, capped at 64 settings, crossed with the frame's era and region presets and the author's declarations, reachable within max(`absFloor`, 10 %) on any of 50 seeds, over an unspecified "bounded search", because an implementer must not invent the controls, the bounds or the criterion, and a declaration an author can make is already reachability |
| J-V12.53 | chose to hash each panel note into `answers.json` when it crosses, keeping the words research-side, over crossing the notes under C3's character rule, because the owner's free text is the one string the scanner could not judge, and the record needs only that a note exists |
| J-V12.54 | chose item 110's four families as extensions off in the `MFCG`, `FTG` and `FM` presets, switched on by four upstream-first bumps each with its own `feature` cause, over one bump for all rows, because no measured reference builds them (0 of 48 research inputs), item 23 keeps extensions out of parity, and one bump cannot attribute a stage moved by two families to either |
| J-V12.55 | chose `source` for raised ways derived at read with the values `generated` and `declared` only, with no `dossier` source, a way carried down from a city epoch reading `generated` and the founding rung read on the model side from the founding epoch's record, over a `dossier` or `carried` value, because the dossier declares no arches (V06 §3.19.1): its water-system record makes the aqueduct's need count as met at CITY and METROPOLIS (V11 §3.24.7 (3)), never a factor on the chance, so a dossier-bound aqueduct is generated, never below CITY, and the guard counts it as generated (amended by item 244) |
| J-V12.56 | chose to leave the switch cells ordinary table cells — editable by the tables editor like any cell, their off form V11's — over "never a user control" and a separate boolean per family, because the owner's rule is that everything is editable, a user who turns a family off simply gets the pre-110 behaviour, and the owner-stamped minima bind calibration, not the user |
| J-V12.57 | chose K2's thresholds as consequences of its declarations (≥ 8 jetties with deck buildings on ≥ 4; ≥ 3 terraced wards with ≥ 10 retaining walls; a raised road within 2 % of straight crossing ≥ 2 ways) at CITY, 20 000 people, on the coast, over counts the rules may or may not fill ("every jetty with deck buildings"), because deck plots are offered by chance (item 110 (d)) and a fixture bar must fail only when the capability or the fixture is wrong |
| J-V12.58 | chose the fixtures' inputs under `plat/tests/fixtures/known-city/<id>/` (the base's fixture tree, §17.1 (3)) and their goldens under `plat/goldens/known/<id>/`, over V09's draft path `plat/test/fixtures/known-city-2/`, because the base names one fixture tree and one golden store, and K1 and K2 share one engine |
| J-V12.59 | chose to read a church class whose coverage unit is `parish` — a class that itself makes the parish partition — in the unit's `households` form with the same `per` (a disc of radius √(per × a_res ÷ π) about each residential plot), over the parish cells, because the cells are the churches' own Voronoi cells: every cell holds exactly one member, observed and permuted alike, so the statistic could never move and T-V11-13 could never pass for the principal coverage class |
| J-V12.60 | chose one `servedShare` whose unit is read from the subject class's compiled `profile.coverage` — every district (V11 §2.3's unit, no household threshold), parish cells, or residential plots for the walk and households discs, counted unweighted — with a `unit: 'district'` override for item 105 (k)'s dispersal row, which alone counts districts of ≥ 30 households (T-V11-18), one class per spec and a `settlement` unit refused, over a single district statistic, because T-V11-13 measures "the share of units served" per class unit and T-V11-18 speaks of districts, the owning volume's statement wins (J-V12.48), and a permutation conserves a town-level unit |
| J-V12.61 | chose one **panel rule** for the register lines a panel confirms — a group rated No moves the line's cells once to the owning volume's stated second value as a declared `fallback` run and re-sits, else the entry is `not-achieved` and reaches the owner as a table defect; unrated, *provisional — not rated* — over a fallback per line, because V11 states second values for only a few cells (`blockPitchM`, `perHeadL`, `w_sun`) and every other line needs a pre-decided outcome |
| J-V12.62 | chose file f item 447's shapes for the measurement profile — an aqueduct a `way` of class `aqueduct` that enters no way graph, a `span` kind no metric reads, `stepMinCm` and `stepMaxCm`, J-VI.3's six closure kinds, no founding rung — with one drop-on-read rule for the exported properties the profile does not declare, over a separate aqueduct kind and reading every exported property, because 447 is the base's one export text for both variants (J-VI.18) and T-V12-4's equality must hold on it, while the metrics that need the dropped properties are `model` metrics reading the records |
| J-V12.63 | chose a `layer: { preset }` cell in a `reference` run against that preset's own reference, written into the cell's preset entry with the default untouched, or in a `fallback` run applying that entry's own pre-decided fallback, over freezing every preset entry, because V02 §3.10.8 and V07's V-M4 set those presets' measured-rate entries by exactly such runs (V07's one entry, `rules.race.densityPower@VG`, V07 §3.15), while the MFCG and FTG presets hold values read from their references' behaviour and stay untuned (amended by J-V12.67, J-V12.76) |
| J-V12.64 | chose three descriptive `model` metrics — `crossing.kinds`, `water.needRatio` (computed by the base's own water-balance function), `ruin.survival` — for register lines whose cells no metric read, over pointing those entries at unrelated metrics, because `CalibrationEntry.metric` must name what measures the cell and the register check verifies that the metric exists |
| J-V12.65 | chose two generated metric families — `bar.<barId>`, the verdict statistic of one registered owner bar (a `StatBarSpec`, a `NullModelSpec` or the new `BenchBarDef`), and `frame.<table>.<column>`, a declared frame's value for one calibratable column, `notApplicable` until M-CAL — with `CalibrationEntry.metric` a list, over J-V12.64's pattern of one descriptive `model` metric per owning volume's column family, because the owning volumes confirm their cells by bars whose verdicts are the measurement, a descriptive metric per family would restate each bar's statistic under a second name, and the landed lines of V02 §3.10.10, V06 §8 and V11 §8 already name these families and several measurements per line; the value is read from the bar's own run, so the family costs nothing |
| J-V12.66 | chose to split V12 §3.11's `decline` line — V11 §3.18's four structure cells, owner V11, written at C3b; the base decline table's persistence cells `raised` and `retaining`, owner `base`, written by the seat landing V06's E2 at M6-E where item 291 (STAGED M6-E) lands — with the rule that a base cell a volume's base change request adds is registered by the seat landing that request, over one line owned by V11, because `CalibrationEntry.owner` is single-valued, the lint fails an entry whose cell does not yet exist, and only the seat that lands a cell can write its entry with it |
| J-V12.67 | chose to admit a `presets.FM` or `presets.VG` entry in a `fallback` run applying that entry's own pre-decided fallback, with a `preset` field on the register target (ids `…@FM`, `…@VG`) so a preset entry has its own entry, and to keep out of every run a preset entry no register entry names (a code-read `ref:… (code)` entry, a `fixed:` off value), over admitting preset entries only in `reference` runs, because V02 §3.10.8 pre-decides `hipInset` 0.5 for a rejected FM run and V12 §3.7.5 applies an entry's fallback on rejection — refusing that run would leave a pre-decided fallback unappliable — and the entry test makes "measured-rate" mechanical: V02's code-read layout families and V11's off values take no entry |
| J-V12.68 | chose to merge per-run exports on read — a retaining wall's runs by `wall` in `run` order, an enceinte's condition runs by its `id` into built stretches — with `measureInputOf` writing one feature per retaining wall and per built stretch and states and conditions no measurement input, over having `measureInputOf` write per-run features, because every wall and retaining metric measures geometry a condition does not change, per-run features would make along-curtain statistics read a run end as a stretch end and let a decline move a parity number without moving a stone, and the merge keeps T-V12-4's equality exact |
| J-V12.69 | chose one catch-all rule for V12 §3.11's register lines — a line ending "and every other calibratable column" binds each calibratable column of the tables it names that no other line names, with that line's method, metric and fallback — and to end the items 103–107 and item-106 lines with it, over enumerating every column by name, because a named list of V11's columns goes stale with each change to V11's tables while the rule leaves no calibratable cell without a line and the lint's one-knob-one-entry check catches a column two lines bind; for the same reason chose to leave V02's stepped compositions to V02 §3.10.10's stepped line, the M4-110 line binding only V11's `stepped-shrine` heights row, over two lines for one set of knobs |
| J-V12.70 | chose to define `method: 'tune'` as a `reference` run against the entry's own reference when it falls due (V12 §2.6's comment, with V07 §3.15's no-run case), and to read a `frame.*` metric only at M-CAL, never holding an entry back at an earlier exit, over a new method value per reference and over moving every entry that names `frame.*` to M-CAL, because the typed union already holds `tune` and item 34's, V02's and V07's cells use that route, and an entry's earlier measurement (the direction at M2b) must confirm on its own while the corpus value arrives only with the frames |
| J-V12.71 | chose one default register line (V12 §3.11 *The default line*: a `corpus` entry at M-CAL on the column's own `frame.<table>.<column>` for every calibratable column no named line binds, marked `line: 'default'`, written by `plat calibrate register --defaults` in the change that lands the column, a later named line restating it in place), over asking each volume to write per-family lines now or exempting their `own` cells from the lint, because V01, V03, V04, V05 and V07 state no metric, due or fallback for cells they call calibratable (V08's and V10's tables are not calibratable, V11 §3.1 rows 63–66 and 86–89), a per-family line needs bars most of them lack before M-CAL and an exemption would let a provisional number dangle, while the corpus stage is the one measurement every calibratable column already has; the marker lets the lint hold a default entry to the line and a volume's own line replace it without two entries for one knob (amended by J-V12.73) |
| J-V12.72 | chose a named type `PresetArm = 'default' \| PresetId` for `BenchBarDef.towns.settings[].preset` and for every other `preset` field of V12 §2's records (a tuning run's targets and seeds, a correlation spec's seeds, a sweep level, a panel group), `'default'` being the recipe with no parity preset, over a comment on one bare string, because the same bare string sat in several records a harness reads and a typed union makes a third spelling a compile error; `CalibrationRun`'s `layer` and `CalibrationEntry.target` keep `'FM' \| 'VG' \| 'NG'`, since they name a cell's preset entry, not the recipe a town is generated under (amended by J-V12.76) |
| J-V12.73 | chose (a) to have `--defaults` write a default entry only for a calibratable column holding at least one compiled cell, over one for every calibratable column of the compiled registry, because V11 §2.1 ships every registry row from C0 as its schema's empty table, so the wider rule would write entries at M1 for V04's, V06's and V07's columns milestones before their seats land and fill the due list with unbuilt columns, while a column with no cell has no cell to fail the lint; and (b) to read a default entry's `owner` from the source manifest's author seat of the file holding the cells (V11 §3.2.1 step 1), the first document the table's `rowsHome` names deciding between two writers and a later writer never moving it, over `rowsHome` alone, because several rows name more than one home (row 56 `islands` "II.6, V05", row 38 `roomProgram` "V03; §2.6") and the author seat is known exactly when (a) writes the entry; the lint holds the `owner` to a document whose file holds the cells, so a second writer's later change fails no entry |
| J-V12.74 | chose to make §13.5's parity-report row carry a required `preset` spelled as V12 §2.1's `PresetArm` (`'default'` \| `'MFCG'` \| `'FTG'` \| `'VG'` \| `'FM'` \| `'NG'`), written out in the base's text (item 497), over an optional `preset?: string`, because V12 §3.5 step 3 names every row's arm — `'default'` for the O and C rows, the preset otherwise — and an optional string admits a third spelling (the field absent) that J-V12.72 closed in V12's own records; the union is spelled out so the base text names no volume type it does not define (amended by J-V12.76) |
| J-V12.75 | chose to date a column whose first compiled cell lands after M-CAL's `ReconciliationRecord` is committed to the later corpus run that takes its layer (V12 §3.11 *The due's corpus run*), written by `--defaults --milestone <id>`, with the same substitution on a named line's M-CAL stage, over keeping M-CAL the only corpus due (a late column's landing exit would fail on an entry already past due), over a due of "the next corpus run" without an id (the exit and the lint need a milestone they can name and a record they can read), and over re-opening M-CAL (a committed record is a fact, its adoption decisions taken); the later run opens on the owner's word as M-CAL does, because the corpus stays walled until the owner opens it (`partitioned/README.md`; J103), reusing M-CAL's frames and holding a sitting only when it moved a cell; the lint reads the landing milestone from the first history row, so no new register field is needed |
| J-V12.76 | chose to write `NG` wherever this volume spells the presets out — the register's `…@NG` id and `target.preset`, a run's `layer: { preset }`, the report row's `preset` union (item 497), V12 §3.5 step 3's arms (each P row under its reference's own preset: `MFCG`, `FTG`, `NG`, `VG`, `FM`), the M5 panel's groups, T-V12-9's and T-V12-24's preset clauses — over leaving `NG` to `PresetArm` alone, because V11 types `PresetId` with `NG` (item 584) and every spelled-out union that omits it is a third spelling; volume 1 holds no provisional `NG` entry (V01 §3.15, J-V1.98), so the register's `NG` arm is admitted, not used, and V12 §3.7.2 (3) keeps every `NG` entry out of runs |
| J-V12.77 | chose to admit a value moved by the column's owning seat before its due on the terms of V12 §3.11 *A value moved by its owning seat* — a `provisional` default entry whose due's record is not committed, or a `measure` entry no run may name, the change's golden check finding no committed golden moved, recorded by one `cells` row from `--defaults --milestone <id>`, a refused tuning held by `--hold` — over (a) a run for every such move, because volume 1's M5 tunings aim at its own acceptance bars, which are no register metrics (V01 §8.1), so a run would have no target or shift to declare; over (b) a new verb, because the command that writes the default entry already reads the compiled cells and takes the milestone, and one writer per row kind keeps the register's writers countable; and over (c) comparing the entry's last row of any kind, because a closed default entry's later rows are readings and status while the run's changes ship as historical packs (V12 §3.10.3 R1), so every closed entry would fail — the typed `cells` marker tells a cells row from the rest; a closed or past-due entry takes no appended row, so every later move is a run, and no other field moves by the row |
| J-V12.78 | chose to make `--milestone <id>` required, refusing without it or with an id neither §16's nor volume-qualified (V12 §2.8's form: `V6-E<n>`, `V4-U*`, `V4-U3b`, volume 11's C-steps by the §16 milestones they sit inside), and to key *The due's corpus run*'s table by those ids, the plan rung's own row (M6-P, `V3-P0` – `V3-P6` → `M-CAL/M6-P`), over defaulting the flag (no command can tell which milestone a change belongs to, and a wrong default dates a due wrongly and silently), over bare step ids (volume 3's and volume 5's steps are both P0 – P6) and over a `V11-C*` prefix (a C-step has no record of its own); "the raised-way milestone" is M3a (items 244, 290); the lint's due test refuses any other due, so no entry waits on an id no `MilestoneRecord` carries |
| J-V12.79 | chose to type a register line of several stages as one entry carrying `stages` (V12 §2.6; V12 §3.11 *Staged entries*: the current stage's method, due and panel, the last non-`corpus` stage's pass confirming, a failing stage closing by the line's fallback, an unrated panel stage holding *provisional — not rated*, a trailing `corpus` stage read whatever the status), over one entry per stage (two entries for one knob fail the one-knob check, and a later stage's fallback would move cells an earlier entry confirmed) and over confirming at the first stage (the panel rule's later No would be an illegal move from `confirmed`, and the corpus possibility would never fall due); stages at rows §16 leaves unordered are each read at their own exit; the span-rule line's stages run M4, `V4-U3`, `V4-U5` (amended by J-V12.89) |
| J-V12.80 | chose to record rows a later landing adds to an entry's target by one `cells` row from `--defaults --milestone <id>` whatever the entry's status, due or landing seat (V12 §3.11 *Rows added*), over treating added rows as moves (no run adds a row, V12 §3.7.2, so a landing after an entry's close — the plan rung's `M-CAL/M6-P` — could never exit green) and over ignoring them (the register would stop holding the cells it confirmed, and the check could not tell an added row from an in-place move); rows added after close keep their authored values and are reported "rows added after close", a later major table version restating the entry for them, because the closed entry's measurement never saw them |
| J-V12.81 | chose to keep application and engineering constants — UI thresholds, autosave and export limits, time budgets — outside the register when their volume confirms them by its own test or performance row under D-18 (volume 9's and volume 10's), their provenance note naming that test, and to scope the in-code rule and *Entries* to model constants, over a `thr.` entry for each (the register's methods, metrics and corpus stages describe model behaviour a parity bar or a frame measures, which a UI timing is not) and over a scan of code constants (the lint reads compiled cells, and each such constant already has its test) |
| J-V12.82 | chose to name V04's span-rule constants by volume 11's cells `raisedWays.structure.span.*` (row 80) in the span-rule line, to exclude the `span` block from the `raisedWays.structure` line's catch-all and add `slideMaxFactor` to it, and to take `retaining.settings.stateSnapCm` out of the `retaining` line's catch-all into its own default entry at M3a restated in place at `V6-E2` on `bar.T-V6-62` (item 245, J-RF2.4's measurement), over leaving the prose keys (which the lint cannot match, so the M3a seat would write two entries for one knob) and over an M4 panel for the snap (which sees no wall an epoch has re-levelled). Values unchanged. |
| J-V12.83 | chose to make a released strip pick's row a cells row — the change that releases it runs `plat calibrate register`, which appends the released cells by row key — over exempting owner-set entries from V12 §3.11 (3)'s cells check, because the check is what proves a released value matches its table version, and a pick is no run, so without the row the releasing change could never pass `--check`. |
| J-V12.84 | chose to apply J122's four sittings by one batch rule — a gating sitting holds its own panel, then each staged panel whose build exited since the previous gating sitting in §16's order, then at most one earlier provisional panel, while the panels' estimated `minutes` sum to at most 60, a panel that does not fit waiting for the next gating sitting or, after M5, offered with every release — over a sitting per staged milestone (J122 allows four) or an unbounded batch (J122's "about an hour each" protects the owner's time), because every panel then has a defined place and a missed one stays *provisional — not rated* without faking a verdict (§13.6 (1), (7)) |
| J-V12.85 | chose one no-op pin engine for every owner item's pin (items 102, 103, 105–107, 109–111, 113), each a `NoOpPin` with its base bar and its off form read from its home cells, and one landing rule — the landing change's suites under the overlay byte-identical to the goldens committed before it, the off-state set recorded then (or at item 110's switch-on bumps, or with M1's first goldens), a stepped landing re-checked at each step — over item 110's engine alone with the other pins left to each owner, because §13.2's convention (5) makes every pin a registration here (E-20) and a pin with no recorded off-state set cannot be checked byte for byte |
| J-V12.86 | chose item 111 (d)'s bars as V12 §3.6b specs — `T111-1` a `higherWith` of the arid row against its temperate counterpart on the same seeds with households as instances deflated by the design effect, `T111-3` a `rate` per water kind against the arid row's chance cell at the site stage, `T111-4` a `most` over arid towns — and one register line for the climate rows' item-111 cells (measure at M1, then M2b, then corpus possibility), over one rule for all three or raw household counts, because the three clauses are a comparison of arms, a promised rate and a per-town ordering, and a town's households share its water so raw counts would let a few large towns carry the bar |
| J-V12.87 | chose item 113 (e)'s lost-access property as an `exactStates` rule on the existing step runner, its scripts admitting the author's access edits beside epochs, undo and reloads, with item 113's other bars on the conformance list, one register line for the history rows on V06's `bar.T-V6-72`, and the replay's CI budget as a V12 §6 row citing V06 §6.7's per-replay bound, over a new engine or a statistical bar, because a reading that must change exactly when the last open link closes and reopens is a property of every step, and the author's edits are among the closings the owner's rule names |
| J-V12.88 | chose to type the game-master trial's findings (`TrialFinding`) here and hold them in V09's `GmTrialRecord`, routed by one intake — an owner question for a finding against an owner rule, a trial row on every register entry a finding's cells name, a `known-defects.json` entry for every unrouted finding and every blocker or major — and to give the style check's threshold no register entry because V11 makes it non-calibratable, over a second trial record or a status move from a trial finding, because item 112 (b) asks that the findings enter the calibration record and the fix list while the register's status moves stay those of its lines, and two records of one trial would have to be kept in step |
| J-V12.89 | chose to read *Staged entries*' order from §16's "starts after" column as J122 fixed it (a row after every row it starts after, transitively; rows neither of which follows the other unordered), over the list of rows left unordered until the owner's order, because the owner's delegation decided the order and one statement of it lives in §16 |
| J-V12.90 | chose to ship each register entry's summary — method, due, what it is measured against, its latest history — inside `dist/evidence.json`, keyed once per entry and referenced by its cells, over shipping `register.json` with the tables or leaving the inspector and the clerk without the register, because the app reads only shipped files (§17.1 (3)) and the cell inspector and the clerk's provenance answer need the status, the reference and the due (W-IF-04, W-IF-05), while one summary per entry keeps the file inside its 200 kB |
| J-V12.91 | chose, for every edge of the harness, to drop a degenerate reference or corpus feature on read and count it, to treat a degenerate feature on our side as a profile defect, and to measure every feature under a parity preset by the same profile rules that read it under the default, over repairing foreign geometry or special-casing a feature per preset, because the harness must measure what each source holds, never invent geometry, and one rule per kind keeps P rows and O rows comparable |

## 10 Base change requests

Every request of this volume is applied to the base by file f; the base text is the applied item, cited throughout this
volume by its item number.

| request | subject | applied as |
|---|---|---|
| BCR-V12-1 | the baseline row and the band rule | item 496 (§13.5) |
| BCR-V12-2 | the parity report (`preset` as `PresetArm`, the two new verdicts, the canonical form) | item 497 (§13.5) |
| BCR-V12-3 | the calibration run, generalised; `CorpusMap.features` as `MeasureInput` | item 503 (§13.9) |
| BCR-V12-4 | the reconciliation's rules: the historical pack, evidence, never-changed, acceptance, owner rules (its decision rule J122's) | item 504 (§13.9) |
| BCR-V12-5 | provenance `evidence` and `ownerRule`; the pinning hash outside the provenance block | item 381 (§7.6) |
| BCR-V12-6 | the panel engine: `D5Pair`'s staged variants, the `D5Record`, one engine for every sitting (the sittings J122's) | item 500 (§13.6) |
| BCR-V12-7 | seeds by formula for the benches and the goldens | item 491 (§13.3) |
| BCR-V12-8 | the crossing's file list | item 535 (§17.1 (4)) |
| BCR-V12-9 | the build plan and its price | item 533 (§16; the totals item 568's) |
| BCR-V12-10 | the package (`@plat/testkit`'s calibration modules) | item 521 (§14) |
| BCR-V12-11 | the staged row | item 569 (the staged list) |
| BCR-V12-12 | JT and the correlation and tendency rows | item 501 (§13.7) |
| BCR-V12-13 | one harness for every random baseline and tendency bar | item 488 (§13.2) |
| BCR-V12-14 | the tiers | item 502 (§13.8) |
| BCR-V12-15 | closures in the export (item 106) | item 447 (§11.1; one text with BCR-V12-17 and BCR-V9-31, J-VI.18; J-VI.3's six barrier kinds) |
| BCR-V12-16 | the second known-city fixture (item 110 (e)) | item 489 (§13.2) |
| BCR-V12-17 | item 110's entities in the export | item 447 (§11.1) |
| BCR-V12-18 | the reference maps' names in the deny-list | item 536 (§17.1 (5)) |
| BCR-V12-19 | a fixture in a shift record | item 492 (§13.3) |
| BCR-V12-20 | several panels per milestone and the register's statuses in exits | item 493 (§13.3) |
| BCR-V12-21 | the statistical methods | item 537 (§17.1 (8)) |
| BCR-V12-22 | the historical pack's slot | item 382 (§7.6) |

The other volumes' requests this volume reads are cited where it reads them: items 229, 244, 245, 290, 291, 376, 377,
447, 456, 495, 498, 499, 522, 529, 534, 568, 575, 584.

## 11 Owner questions

All three are answered (J122, `docs/OWNER-DECISIONS-DELEGATED-2026-09-29.md`); none of J121's subjects arises in this
volume.
1. **Q-V12-1 — one month of FTG's premium tier to capture one METROPOLIS — answered: no (J122).** METROPOLIS stays compared
   with MFCG size 130 (D-31 records no premium FTG capture), FTG's published metropolis pictures shown as an unscored card;
   one capture would give one sample, too few for a band.
2. **Q-V12-2 — the owner's sittings — answered (J122):** only at the gating milestones M1 (the look check), M2b, M4 and M5,
   batched, about an hour each; a missed sitting leaves the milestone *provisional — not rated*. V12 §3.9.1 places every
   panel accordingly (its batch, J-V12.84), §13.6 (1) states the rule.
3. **Q-V12-3 — historical layers as defaults — answered (J122):** only where the owner's sitting passes them — V12
   §3.10.6's per-frame rule; until the M-CAL panel is rated every frame's pack ships selectable and a town of another era
   or region never receives it.

## 12 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed).**
* `H32` as written from the published algorithm reproduces §13.6's check vectors (1221236157, 3998735106, 1965791931 after
  reduction, 1819777585, 951122398, 3881605733) and SMHasher's verification value 0xB3ECE62A, and gives V12 §2.4's check
  vectors, `known/K1`, `known/K2`, the TOWN guard, the `c1` family, `T110b.*` and the catacomb sweep among them
  (`docs/validation/bench/v12_h32_vectors.py`, `v12_rev_h32.out`).
* The rules' rates, seeded, our own code: the rank rule's null rates (0.000 – 0.005) and powers, the pooled exact test's
  size (0.002 – 0.015) and powers (`critique_v12_nullrule_rank_power`, `critique_v12_pooled_exact`); the z-sign rule's
  failure on few-member shares (`critique_v12_nullrule_discrete`); the tendency rules' rates (`v12_sweeprule`); the
  effective-instance and deep-void rates (`v12_rev_clustered`); the confirmation stage (0.0015 fallbacks per bar at a real
  0.8-standard-deviation effect, 0.06 over 40 bars) and `most` on effective instances (`v12_rev_confirm`); the [min, max]
  coverage (n − 1) ÷ (n + 1) = 0.82 at n = 10 (`v12_nullrule`). Each re-ran byte-identical.
* The MFCG facts T-V12-6 holds the product to are the recorded, re-run measurements of
  `captures/mfcg/exports-2026-09-25/README.md`, `captures/mfcg/exports-sweep-2026-09-25/README.md` and
  `docs/validation/bench/README.md`; the coastal ring's 24 shore vertices and 20 towers are the exports README's review
  note 2.
* 0 of 48 research inputs mention retaining walls, viaducts, aqueducts, elevated or raised roads, deck plots or houses on a
  bridge (`v12_rev_item110_grep.out`).
* The base this volume cites is the coherence pass's text with files f and g applied (§7.6's pinning hash and provenance,
  §13.2's owner-item bars T102-1 – T113-7 and their convention, §13.3, §13.5's `Baseline` and `ParityReport`, §13.6 with
  J122's sittings, §13.7's rows, §13.8's schedule, §13.9, §16's J122 order and release gate); the volumes' rows it cites
  were read at their sections (V04 §2.2–§2.3 and §7, V06 §3.19.1, §6.7, §7, §8, V07 §3.9, V11 §2.1–§2.3, §3.17.1, §3.23 –
  §3.25, §8, V09 §7.2, §7.6). The corpus's laws are `partitioned/README.md`'s, read whole; no corpus file was opened.

**PLAUSIBLE (reasoned, to be measured; each names what measures it).**
* Every budget of V12 §6 until the milestone named beside it; every estimate of V12 §8; the panels' `minutes` and the
  sittings' fit inside their hour (the M1 sitting's recorded session times re-estimate them).
* The ten-seed choice's adequacy (spike S-V12-1); the derived street graph's stability on MFCG's lot outlines (spike
  S-V12-2); the metric definitions' own parameters (the 2 m node merge, the 8 m spur prune, the 1.0 m cluster gap, the 3 m
  closing, the 1.5 × deep-block rule, the 10° wall-node turn) — a change is a major metric version (V12 §3.4.3); V12 §3.4.2's
  default rules; that FTG's server build can be pinned by capture date; the two MFCG shore-end towers.
* That the corpus holds enough surveyed maps for frames of 20 (risk 7); the correlation and tendency rules' behaviour on
  real towns beyond their simulations (spike S-V12-4; risks 9, 14), that real towns' clustering resembles the simulated
  town effect (the design effect estimates ρ per bar), and that the confirmation stage's family-wise rate holds when bars
  are correlated.
* The distinctness thresholds (1.5, 0.15, 10°), the structure separation and the no-regression tolerance — our own §13.7
  values; every item-110 threshold and count of this volume (K2's ≥ 8 jetties and ≥ 4 with deck buildings, the 2 %
  straightness, the 1 m anchoring, the 20 % mid-mole tolerance, the 1 ha islet, the 30 TOWN guard towns, 100 and 200 towns
  per raised-way level); that a ravine forcing site always exists on which the detour loses (registration refuses one
  where it does not); that every fixture level the bars need can be set as a frozen S1 output or a dossier or declaration
  input (risk 10).
* That the column lists of V12 §3.11 follow V11's and V04's text, not a compiled `ColumnSpec` (hence each line's catch-all);
  that V04's ruin element records carry their persistence class and the levelling stage reports `W_STEEP_RAMP` per
  crossing; that the households-form reading of a church's parish coverage (J-V12.59) lets T-V11-13 see a real pull; that
  item 575's per-run wall features keep their enceinte's address as `id` (T-V12-4's runs clause catches the other reading
  at M4); that each author seat the source manifest names belongs to exactly one design document; that `terrace.siteShare`'s
  M5 tuning moves no committed digest (where it does, the tuning is held); that the staged-entry rules, the rows-added row
  and the extended check behave as written (T-V12-20 runs from M1).
* That item 111's water bars see the pull at the arid rows' values (T-V12-42's planted fixtures, then the M2b bench); that
  `exactStates`' scripts cover every closing item 113 (e) names (T-V12-43 on V04's fixtures); that the trial's findings
  map onto register cells often enough to inform them (the intake's report counts the routed share).

## 13 Fix list

The Fix list holds no item: every finding routed to this volume is fixed in its text, and every hand-off is closed at its
home. The critique's variations are decisions with their reasons (J-V12.42, J-V12.43, J-V12.55, J-V12.56).

**This volume's hand-offs to other units, each that unit's own part, closed at its home:**

| to | what | at its home |
|---|---|---|
| V11 | the compiler admits a `corpus` source in a `historical:<frame>` pack table when its `evidence` names a corpus run of a committed `ReconciliationRecord`; writes `dist/evidence.json` (V12 §2.10's `EvidenceFile`, its entry summaries included); carries evidence ids outside the pinning hash; stamps `ownerRule` and writes the stamped-clause list | V11 §2.2, V11 §3.2.1 (steps 4, 7) |
| V11 | its column entries land with each content milestone and C6 at M4 audits them; the ancient-culture rows clear V12 §3.6b's distinctness thresholds (J-V11.30); the switch table is item 110's pins' off form; the rung gate is its schema's; the `ownerRule: '110 (b)'` stamp and the calibration minima on the CITY and METROPOLIS `raisedWays` columns; `presets.FM` resolves the stepped and deck families off; T-V11-12 – T-V11-18 register as the bar map's specs; item 111's climate cells and item 113's history rows take V12 §3.11's lines; the style threshold is not calibratable; V11 §3.24.1 cites V12 §3.11 for `stateSnapCm`'s entry | V11 §8, V11 §3.23.4, §3.24.0 – §3.24.2, §3.17.1, §3.25, §3.1 |
| V02, V07 | their panels are `PanelSpec`s on V12 §3.9's engine, their pair variants V12 §2.8's `D5PairStaged`; their reference rows `Baseline` rows of input `counts` or `geo` under `'FM'` and `'VG'` | V02 §7.5, V07 §8 |
| V03, V04, V05, V06 | their sittings are V12 §3.9.1's `PanelSpec`s (V3-P6, V4-U5, M6-sky, V6-E7), sat or provisional under J122; V04's item-109 bars the bar map's specs on forced-source fixture sites, `undergroundInputOf` reading its system records; V06 lends H-100, its random trajectories and H-VOID | V03 §8, V04 §7, V05 §7, V06 §7, V06 §12 |
| V08 | its surveyed-dossier fixtures are item 108 (f)'s `exactMonotone` levels (their `@pop×k` derivatives in the frozen manifest), its custom-chain fixtures item 104 (h) (8)'s levels, its catacomb fixtures (DR32) the step script's, a high-ground landmark fixture (DR35) the elevated-road `higherWith`'s; none is a calibration seed family | V08 §7 |
| V09 | the cell inspector reads `dist/evidence.json` (status in plain words, "the owner's rule" for a stamped cell, what the value is measured against, its due, its history and evidence lines; W-IF-04); the preset dialog lists the historical packs per era and region; K2's checklist cites V12 §3.14's list (K2-4: ≥ 8 jetties outside the basin, deck buildings on ≥ 4); K2's inputs under `plat/tests/fixtures/known-city/K2/`; K1's brief keeps its bridge's deck plots; a suppression keyed to its reason; the game-master trial's `GmTrialRecord` holds `TrialFinding`s (V12 §2.14) | V09 §4.14, V09 §4.3, V09 §7.2, V09 §7.6 |
| V10 | the clerk's provenance answer reads `dist/evidence.json` — the plain line first, the status, what it is measured against and the due, the run id behind "details", "the owner's rule, item …" for a stamped cell (W-IF-05); the clerk never starts a run; its evaluation group A reads `plat/goldens/known/<id>/fixture.json` | V10 §2.13, V10 §7 |
| V06 | a generated raised way's suppression keyed to its reason, never its course | V06 §3.19.1 |
| V01, V02, V03, V04, V05, V06, V07, V11 | each pin of its item on V12 §3.7.8's engine reading its item's off form (the pin table's tests) | each owner's §7 |
| V04 | T-V4-54 read per deep void; T-V4-43's and T-V4-58's "± 3 s.e." and 500 seeds as the specs' parameters; T-V4-51's step script V12 §3.6b's; `CatacombComplex.id` keeps its source lineage; T-V4-44 never reads a monument's tiers; T-V4-77 the `exactStates` spec, T-V4-76, T-V4-78 and T-V4-79 on the conformance list; the span-rule line's cells `raisedWays.structure.span.*` and its staged order | V04 §7, V04 §8 |
| V07 | the village rungs' levels of item 109's presence and access bars join at V-M4 (`notApplicable` before, never `insufficient`); its pins on V12 §3.7.8; the farm table's village rows calibratable, the territory per head derived (E-38) | V07 §7, V07 §3.9 (1) |
| base, V02, V03, V06, V11 | every bar a register line names as `bar.<id>` that no spec carries registers a `BenchBarDef` with `preset: 'default'` — the base's T16-4 (V11's C1 seat), V02's (V02 §3.10.10), V03's T-V3-35, V06's (V06 §8), V11's T-V11-30, and T112-1's by the seat landing it | V02 §3.10.10, V03 §2.4, V06 §8, V11 §8 |
| V01, V03, V04, V05, V07 | every exit landing a registry table or a calibratable column runs the register check green, its `--defaults` with `--milestone <id>` in V12 §2.8's form | V01 §8.1, V03 §8, V04 §8, V05 §8, V07 §8 |
| V04, V05, V06 | a column landing after M-CAL's record dates to its layer's later run; V06's lines dated by their exit step (`--milestone V6-E<n>`, due as V06 §8 states) and `retaining.settings.stateSnapCm` lined at E2 on `bar.T-V6-62` | V04 §8, V05 §8, V06 §8 |
| V02, V03, V04, V09, V10, V11 | a line of several stages is one staged entry; V03's `V3-P6` tuning and hand fallback recorded by the cells row; rows a later step adds take a rows-added row; V09's and V10's application constants take no entry, each provenance note naming its test | V02 §3.10.10, V03 §2.4, V04 §8, V11 §8, V09, V10 |
| base (scope) | §13.2's conformance list holds items 105 – 113's conformance clauses; its volume-family row for calibration reads T-V12-1 – T-V12-48 | §13.2 |
| file f | item 244's slide bound and item 245's snap named by V11's cells | items 244, 245 |

**Hand-offs to this volume, closed here:**

| from | what | closed at |
|---|---|---|
| V02 X33 | the metric family `bar.<barId>` that V02 §3.10.10's lines name | V12 §2.1, §3.4.2 (J-V12.65) |
| V06 X9 | T-V6-38 as item 109 (k) (6)'s monotone bar; T-V6-40 (a) and (c) as the epoch forms; T-V6-34 and T-V6-36 on `voidAccessible` and `voidSealedDeep`; the walled-share growth parity | V12 §3.6b's bar map; `walled.share` on any document (V12 §3.4.2, §3.4.4) |
| V06 X19 | the guards `raised.generatedBelowCity`, `raised.reasonMissing`, `raised.overCap`; T-V6-65's declared shift; the growth parity's raised-way presence row (no reference row) | V12 §3.4.2, §3.7.4, §3.7.6, §3.7.8, §3.4.4 |
| V06 X31 | the `decline` line names V11 §3.18's four structure cells, none of V06's; T-V6-66 – T-V6-69 nightly | V12 §3.11's `decline` lines; V06 §7's tiers |
| V06 X38, X49 | the `bar.<barId>` family; the split `decline` line; V06's lines dated by their exit step; `stateSnapCm` at E2 on `bar.T-V6-62` | V12 §2.1, §2.8, §3.11 (J-V12.65, J-V12.66, J-V12.82) |
| V11 X-V12-1, X-V11-12 | the historical pack rows' corpus provenance and evidence; every calibratable cell of V11 §3.23 and §3.24 registered; the dossier row sets not calibratable; the water record a met need; the off forms V11 §3.24.0's; the `decline` line on the base's persistence rows; `noRegression.off` as `{ ref, value }[]`; `terrace.enabled` no entry; the `bar.*` and `frame.*` families; preset entries `fixed:` off values no run names | V12 §2.10, §2.7b, §2.1, §3.7.2 (3), §3.11 |
| V11 X-V11-14 (c) | V12 §3.7.2 (4) and §3.7.7 read the registry's `readers` StageIds; V11 §8's two bar registrations write `preset: 'default'` | V12 §3.7.2 (4), §3.7.7, §2.1 |
| V11 X-V11-16 (b) | `PresetArm` takes `'NG'` through `PresetId` | V12 §2.1 |
| V11 X-V11-17 (f) | the span-rule line cites row 80's `structure.span`; the `raisedWays.structure` catch-all excludes the `span` block and holds `slideMaxFactor`; `stateSnapCm` its own line on `bar.T-V6-62` at `V6-E7`, fallback J-RF2.4's | V12 §3.11 (J-V12.82) |
| INDEX §7 (the fix list's span-rule entry) | V04's rows take V12's span-rule order | V12 §3.11; V04 §8 |
| V04 | register T-V4-76 – T-V4-79; the `former*` cells on the default line | V12 §3.6b's bar map and conformance list, V12 §3.11's default line |
| V01 | T-V1-4 (e) a `NoOpPin`; M5's panel re-offers the MFCG and FTG side-by-sides on the new default preset beside the NG pairs (T-V1-32) | V12 §3.7.8's pin table; V12 §3.9.1's M5 row |
| V07 | E-38: the farm rows calibratable, the territory per head off the register; T-V7-58 and T-V7-59 `NoOpPin`s beside T-V7-52 | V12 §3.11's default line; V12 §3.7.8 |
| scope | §13.6's `D5Pair` closes with `D5PairStaged` | V12 §2.8 |
| determinism | the pinning hash at §7.6 | V12 §2.10 |
| model | the metric `Unit` a named subset of §2.1's (E-37) | V12 §2 (`MetricUnit`) |

## Integration notes

The volumes integration's decisions for this volume (`docs/volumes/_integrate.md`) are folded into the body at their
homes, cited there by their J-VI number: J-VI.17 (volume 5's `IslandRule` cells `accessSiting.deckGapM` and `lineClearM`
are V05's own, calibrate-later, never V11 rows) at V12 §3.11's default line; J-VI.10 (V11's `ownerRule` stamps and the
raised-way calibration minima; `presets.FM` resolving the stepped and deck families off) at V12 §2.10 and V12 §3.4.4; J-VI.4
(a bar that counted refusals of item 110 or of the sky layer counts bends, each with its line) at V12 §3.6b; J-VI.18 and
J-VI.3 (BCR-V12-15 and BCR-V12-17 applied with BCR-V9-31 as item 447's one text; the closure barrier kinds J-VI.3's six;
the metric variant's span polygons, which no bar of this volume reads) at V12 §2.2; J-VI.6 (the catacomb growth cap read
per year) at V12 §3.11.
