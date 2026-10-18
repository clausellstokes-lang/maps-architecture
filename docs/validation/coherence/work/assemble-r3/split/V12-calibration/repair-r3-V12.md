
=== REPLACE ## 1b Wiring table ===
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
=== END ===

=== REPLACE ### 2.13 The no-op pins (V12 §3.7.8; E-20) ===
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
| `item105.web`, `item107.spread` | T105-4, T107-4 | offForm | V11 §3.7.4's web off form; with it, the cells T107-4 names | the golden suite; B-CITY (V11); H-100 (V06, T-V6-44); V05's island fixture (T-V5-22 (k)); V07's village goldens (T-V7-33, on `item105.web`) |
| `item106.barrier` | T106-5 | offForm | the cells T106-5 names | the golden suite; V11's T-V11-19 fixtures; V05's island fixture (T-V5-27) |
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
=== END ===

=== REPLACE ### 3.4 The metric suite ===
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
| `resolution.changes`, `resolution.p95` | timing | — | on V09's app harness under Auto (V12 §3.15.11): over a scripted session of pans, zooms and drags with a settle after each, on the fixture loaded at its threshold, the level changes applied during a gesture and the most applied in any 10 s window (counts); Auto's rolling frame-time p95 (ms) over §12.5's reference views on the reference and low-end devices, against the tier's frame budget (§12.5) | — (ours) | item 121 (h): T121-2, T121-3 (V12 §3.15.11) |
| `resolution.textPx`, `resolution.ultra4k` | render / timing | f | at each level — Auto's rungs and each manual level — on a device fixture of pixel ratio 2, the pixels of the label glyphs and halos, the chrome and the overlay marks inside their boxes that differ from the same view drawn at the device's ratio, in V09's captures (0 by rule); on an ultra-tier device fixture holding a native-4K view lit at full precision over §12.5's reference views, a vector: the canvas memory §12.8's measurement reads ÷ the tier's 512 MB ceiling (≤ 1), and the light rungs given up (0) | — (ours) | T121-5, T121-8 (V12 §3.15.11) |
| `crisis.weeks`, `crisis.stable`, `crisis.scale`, `crisis.blocked`, `crisis.share` | render / model (DR44's standing looks and §10.2's placement) | f | on the crisis fixtures (V12 §3.15.12): per look, the weeks it draws against its condition's [`sinceWeek`, `untilWeek`) (§2.7), mismatched weeks counted, and, under a player view whose key withholds a condition, every look of it drawn counted as a mismatched week (DR44's admission); per seed, the look's tiles in the view against a picture export at the same stop and against a second open of the document, differing tiles counted; over a rung sweep at one severity and a severity sweep (0, ¼, ½, ¾, 1) at each rung, the steps at which a look's drawn extent — its camped ground in m² at a camp place, else the share of its place's units (§10.2 (c)) — falls, and, its second count, at each rung and at severities 0, ½ and 1, each look §10.2 (c) sizes by severity (no headcount and no count given; every preview among them) whose camped ground, the ring remainder counted at §8.8's ring density, differs from its row's `scale` at that severity (linear between its two ends) by more than 5 %, or whose units differ in number from the count §10.2 (c) gives that share of its place's units; look marks on water, a gate's passage or a label's keep-out, and on a way's carriageway any mark but a `barricade` across it (§10.2 (d)); on a week standing several camp looks, a camp look holding outskirts land owed to a look before it in `priority` order (ties by condition id) — a face that look's place ranks while it spills onto the ring, or any outskirts face while it spills at the cap — and the camped land past `densityCap` of the outskirts' free land, in m² (§10.2 (e)) — each 0 by rule | — (ours) | item 122 (g): T122-2, T122-3, T122-5, T122-6 (V12 §3.15.12) |
| `time.crisisReskin`, `crisis.rasterShare` | timing | — / f | in §12.1's timing phase on the golden views of every family at every rung with the crisis fixtures (V12 §3.15.12): the re-skin time of the visible tiles at a change of the crisis display and at the drawn week crossing a condition's edge, against §12.5's settle bound; the looks' share of a tile's raster time, against §12.5's 20 % | — (ours) | §12.10's R12-37 (V12 §3.15.12) |
| `crisis.areaPerHead`, `crisis.coalition`, `crisis.framing`, `crisis.ring` | model (§10.2's placement, §2.9's crisis framing) / render (the ring's arcs) | f | on the force fixtures (V12 §3.15.12): per army or group with a dossier headcount h, its camped ground — its camp's faces, plus any remainder on the ring at §8.8's ring density — ÷ (h × `areaPerHeadM2`), within [0.9, 1.1]; a coalition of two armies of h heads against one army of h, the ratio of their camped ground, within [1.8, 2.2]; while a look stands, the camps outside the opening view, outside Fit's view and beyond the limit's view, and once none stands the stops by which the limit differs from item 116's and the moved views re-framed — each 0 by rule; per force too large for the frame and its margin, a remainder with no arc on the ring at the city band, and any change of the frame, the margin, the model digest or the hash — 0 | — (ours) | item 122 (h)–(i) (V12 §3.15.12) |
| `damage.nested`, `damage.breakLevel` | model (each plan element's §6.3 threshold against the building's decay level, §2.6 step 7) | f | on V03 §7's damage fixtures (V12 §3.15.13): per building at the levels 0, 0.05, …, 1 and, from M6-E, at every week of V06's decay runs, the elements damaged at a level or a week and undamaged at a higher level or a later week of the same run (0 by rule); per element, the lowest sweep level at which it shows damaged, compared across a regeneration from the same seed, a save and load, an undo and redo of an unrelated edit and a migration, differing elements counted (0) | — (ours) | item 123 (f): T123-2, T123-3 (V12 §3.15.13) |
| `weather.frameMs`, `weather.snow`, `weather.aridRain`, `weather.cover`, `weather.luma`, `weather.replay` | timing / render / model (the weather timeline's spells) | ms / f / share / f / share / f | on V09's app harness (V12 §3.15.14): the effects layer's frame time at the densest spell of each kind over §12.5's reference view on the reference and low-end devices, p95; over all 52 weeks of every `arid` climate row and every row whose winter does not freeze, the frames drawing a falling-snow mark and the tiles drawing lying snow (0 by rule); per `arid` row and week band, the timeline's rain-spell frequency over a simulated session clock against the row's weather column (within three standard errors), and its rain spells in the row's dry weeks (0); the label, halo, chrome and overlay pixels a spell changes (0 by rule); the view's mean relative luminance per frame through each spell's life, its largest change in any one second against §8.4 (i)'s photosensitivity limit, flashes counted (0); two timelines from one session seed, clock and set of presses, spells differing in kind, start or length (0) | — (ours) | item 124 (i): T124-2 – T124-4, T124-6, T124-7, T124-9 (V12 §3.15.14) |
| `port.fallbacks` | model (the generation report) | f | on the required-keys dossier at every rung (V12 §3.15.15): the fields V08's field table lists as read that the dossier lacks, each without a report line naming the fallback taken, and the stages that end with no output — both 0 by rule | — (ours) | item 125 (e): T125-1 (V12 §3.15.15) |
| `layout.touch`, `layout.belowMedium` | render (V09's app harness: its layout and frame captures) | f | at the medium class's minimum, 600 × 480 CSS px, the tools of V09 §4.12's list whose canvas script fails to complete under touch events; over the resize script, the steps below 600 × 480 at which the map's layout is not the medium layout at its minimum, a tool is withheld or greyed, or the page does not scroll to every part — each 0 by rule | — (ours) | item 126 (e): T126-1, T126-2 (V12 §3.15.16) |
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
=== END ===

=== REPLACE ### 3.7 Tuning runs — table-version bumps with declared shifts ===
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
T-V8-50, T-V8-53, T-V8-59 and T-V8-61 (b); V09's T-V9-57; V10's T-V10-43 and T-V10-45; V11's T-V11-13, T-V11-31 and
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
=== END ===

=== REPLACE ### 3.11 The calibration register — no provisional number dangles ===
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
=== END ===

=== REPLACE ### 3.12 Failure handling — every failure, its rung, its report ===
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
| a look drawn outside its condition's weeks or for a condition the viewer's key withholds, differing between the view, an export and a second open, shrinking at a higher severity or rung, off its row's `scale` at its severity, or on water, a gate's passage or a keep-out, or on a carriageway as anything but a `barricade` across it; camp looks placed out of `priority` order or together past `densityCap`; a camp's ground off its headcount by more than 10 %; a two-army coalition's ground not twice one army's within 10 %; a camp outside the opening view, Fit or the limit while a look stands; the limit not restored when none stands; a moved view re-framed; a force's remainder without its ring arc; a frame, model or hash changed; a re-skin past the settle bound or looks past 20 % of a tile's raster time | the `crisis.*` statistics, `time.crisisReskin` and `item122.crises` (V12 §3.15.12) | none at the harness: a raster miss takes R12-37's pre-decided change, a property violation is a code defect fixed before the exit | the bar fails naming the fixture, the condition, the look and the week, the force or the tile |
| an element damaged at a level or week and undamaged at a higher level or a later week of its decay run; an element breaking at a different level after a regeneration, a load, an undo or a migration; a never-decayed building drawn or exported differently | the `damage.*` statistics and `item123.damage` (V12 §3.15.13) | none: a property | the bar fails naming the fixture, the building, the element and the levels or the lifecycle step |
| an effects frame over its cost; snow falling or lying on an `arid` or non-freezing row; arid rain off its row's frequency or in its dry weeks; a label, halo, chrome or overlay pixel a spell changed; a luminance change past §8.4 (i)'s limit, or a flash; a timeline that does not replay; a tile re-rastered or an export changed by the effects | the `weather.*` statistics and `item124.effects` (V12 §3.15.14) | none at the harness: a frame-cost miss takes §12.10's pre-decided change for item 124, a property violation is a code defect fixed before the exit | the bar fails naming the climate row, the week, the spell and the frame or pixel count |
| on the required-keys dossier a used field absent with no fallback reported, or a stage ending without output; a document or hash differing with and without a host context | `port.fallbacks` and `item125.host` (V12 §3.15.15) | none: a property | the bar fails naming the field or the stage, or the host context and the first differing record |
| a tool's touch script not completing at 600 × 480; below the medium class a layout other than the medium layout at its minimum, a tool withheld or greyed, a page that does not scroll, or the document, view or selection changed by a resize | the `layout.*` statistics and `item126.resize` (V12 §3.15.16) | none: a property | the bar fails naming the tool or the resize step |
| a `known-defects.json` entry this volume opened is cleared | the run, report or release that clears it | — | closed, never deleted, listed in `MilestoneRecord.knownDefects.closed` with the clearing id |

Every record of this table is repository data: a document's save, load, undo, regeneration or migration never reads or
writes it, and a record reverted with its change leaves the entries it opened closed by that revert. A missing
`known-defects.json` reads as empty and is created by the first entry opened.
=== END ===

=== REPLACE ### 3.15 The owner rules 111–126 on the harness ===
### 3.15 The owner rules 111–126 on the harness

Each item's bars are §13.2's, numbered there (T111-1 – T126-3), item 122 (h)–(i)'s four bars this volume's own
(V12 §3.15.12); this section registers the part of each that runs on this volume's machinery — its specs, pins,
metrics and register lines — and names the owner of every other clause. Items 120 – 126's statistics and pins measure
fixture properties: each clause they measure is on the harness registry's `conformance` list (§13.2's convention
(6)), none a tendency bar asking for a spec (T-V12-35). Spec ids are this volume's (`T111d.walk`, as `T110b.*`), each a `StatBarSpec`
or `NullModelSpec` carrying its base bar as `ownerBar`; a base bar registered as a `BenchBarDef` takes the bar's own id
(V12 §2.1). Their seed families follow V12 §2.4 under the spec id. Tiers and milestones are §13.8's, items 120 – 126's
placed by §16 (J122): Find at M5, item 121 at M4, items 122 and 124's base parts at M3b, item 123 with V03's
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

**3.15.6 Item 116 — the zoom-out limit.** T116-1 — at every rung from THORP to the cap the limit shows the whole bounds, or
is stop 0 where they do not fit (§8.8; J122), and no stop beyond it is reachable — is a conformance sweep on B-ZOOM (§13.4)
over B-CITY-lite's seeds of every rung and V07's village fixtures (V07's T-V7-64), its statistic `view.limitStop` (0
reachable stops beyond the limit; the whole bounds inside the limit's view, or the limit at stop 0 where they do not fit —
the METROPOLIS cap's frame in a 1 280 × 720 and a 600 × 480 CSS-px viewport among the cases), reported in the nightly
statistics; T-ER-08's restatement and T116-2 – T116-4 (the first view
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
reference views at every rung's top and the METROPOLIS cap:
* **T121-2, no oscillation** — `resolution.changes`: under Auto, a scripted 120-second session of pans, zooms and drags,
  each followed by a settle, on each device's reference views and on the **threshold fixture** — a CITY view whose layers
  and lighting put its frame-time p95 just over the reference device's budget at one rung and under 60 % of it at the rung
  below, so a loop without its spacing and hold would alternate — gives 0 changes applied during a gesture and at most 1
  in any 10-second window;
* **T121-3, Auto holds the frame budget** — `resolution.p95`: Auto's rolling frame-time p95 over each reference view on
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
  512 MB and no light rung is given up over the reference views.
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
T122-3; V01's T-V1-60, V02's T-V2-60, V08's T-V8-60 and V10's T-V10-52 test their own parts; this volume measures the
rest on its **crisis fixtures** — from M3b (§16) each look kind previewed (`crises` `preview`, at `previewSeverity`) on
B-CITY-lite's seeds of every rung, an island town and an unwalled place; from M-SF V08's dossier crisis fixtures
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
  them — and, under a player view whose key withholds a condition, every look of it drawn counted as a mismatched week
  (DR44's admission): 0 mismatched weeks;
* **T122-3, byte-stable per seed** — `crisis.stable`: a look's tiles in the view, in a picture export at the same stop
  and in a second open of the document byte-identical per seed (keyed draws, §8.10);
* **T122-5, scaled by tier and severity, and by headcount** — `crisis.scale`: over a rung sweep THORP – the METROPOLIS cap
  at one severity and a severity sweep at each rung, no look's drawn extent falls as the rung or the severity rises; and,
  at each rung and at severities 0, ½ and 1, each look §10.2 (c) sizes by severity (no headcount and no count given;
  every preview among them) is drawn at its row's `scale` at that severity (linear between its two ends) — its camped
  ground, the ring remainder counted at §8.8's ring density, within 5 %, else its units the count §10.2 (c) gives that
  share of its place's units (`crisis.scale`'s second count, 0 by rule); its headcount clause is item 122 (h)'s area bar
  below;
* **T122-6, never on water, a gate's passage or a keep-out, and the outskirts shared by priority under the cap** —
  `crisis.blocked` 0 — water, a gate's passage and a label's keep-out, and a way's carriageway save a `barricade` across
  it (§10.2 (d)), the previews of `blockade`, `raiders` and `rebellion` among the kinds checked; and, on the week standing
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
  device over §12.5's reference view, against §12.5's figure on the reference machine, a miss taking §12.10's R12-38
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
  touch events each tool of V09 §4.12's list completes its canvas script (V09 §7.2's scripts) — each tool from the
  milestone that lands it, every tool from M3a — 0 failing;
* **T126-2, below the medium class the medium layout holds** — `layout.belowMedium` 0 over the **resize script**
  1 024 × 768 → 600 × 480 → 599 × 479 → 480 × 360 → 1 024 × 768 CSS px on a CITY session holding a selection, its view
  finer than the zoom-out limit at every size (so no resize settles it, §8.8): below 600 × 480 the medium layout at its
  minimum, no tool withheld or greyed, the page scrolling to every part; and the pin `item126.resize` (`view`, `session`;
  V12 §2.13): the model digest, the saved bytes, the view key and the selection byte-identical at every step.
Item 126 adds no `StatBarSpec` and no register line.
=== END ===

=== REPLACE ### 3.16 Edges and combinations (principle (11)) ===
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
| 33 | item 122's measurements · no condition and no preview, a withheld condition, a condition with no `untilWeek` and one ending before it starts, several crises past the density cap, a force too large for its frame and margin, an island town, an unwalled siege, a headcount of 0, every rung THORP – the cap, a barricade look (`blockade`, `raiders`, `rebellion`) on a way | V12 §3.15.12: the pin's tiles; never drawn, counted or widening the framing; drawn from `sinceWeek` on; never standing; by priority, the rest on the ring; the ring's arcs with the frame and hash unchanged; the ring; the `blockade` row; the scale by severity and tier; each rung's `scale` cell; its `barricade` across the carriageway, no other part there | report (the statistic's row, counted); never a silent pass | T-V12-54; T-V12-55 |
| 34 | item 123's measurements · level 0 and level 1, a building first met ruined (generated ruined, or in item 113's replay), a restored building, a stale plan, a one-room plan, a ruined church with its crypt, a building of a disaster look's district, every rung where plans draw | V12 §3.15.13: no element, every element damaged; its as-built plan, then its damage; the damage leaving in reverse (T123-4, V03's and V06's); its cached rooms under the change marker until re-derived; its elements by their thresholds; the crypt by its own; at `lookLevel` or its own level where higher — `damage.nested` holding over each | report (the statistic's row, counted) | T-V12-56 |
| 35 | item 124's measurements · the switch off, reduced motion and the low tier, every climate row and week, a snow spell asked on an `arid` or non-freezing row, a spell during an export, a resize and a gesture, the vector rung, a lost GPU context | V12 §3.15.14: nothing drawn; off by default (V09's T-V9-87); each row by its columns; never snow; the export without effects, the layer redrawn at the new size, the gesture's frames within budget; the wash and the halos only — the pin and `weather.cover` holding at each | report (the statistic's row, counted) | T-V12-57 |
| 36 | item 125's measurements · a required-keys dossier, a dossier with no stamped tick, a host context present and absent, a `line` the dossier's stamps contradict, every rung | V12 §3.15.15: a full map with every fallback reported; week 0 at midsummer; one document and hash; refused with `E_LINE_UNSUPPORTED` (§11.4), no document made and none compared; at every rung, the village rungs through V07's product: a full map with every fallback reported | report; check (the refusal) | T-V12-58 |
| 37 | item 126's measurements · exactly 600 × 480, one pixel below it, a window far below it, every tool | V12 §3.15.16: the medium layout; the medium layout at its minimum with the page scrolling; the same; each tool's touch script from the milestone that lands it | report (the statistic's row, counted) | T-V12-59 |

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
=== END ===

=== REPLACE ## 6 Performance budgets ===
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
| item 121's measurements (the `resolution.*` statistics on V09's app harness over three device fixtures and §12.5's reference views at every rung's top and the cap: the scripted Auto sessions, the threshold fixture, the captures at every level, the ultra tier's 4K view) and `item121.display` | T121-2, T121-3 and T121-8 inside §13.8's timing phase, ≤ 20 min wall per milestone run; T121-5's captures at PR, each level on one device fixture, inside V09's PR run of its app harness (T-V9-84 takes the captures); the pin ≤ 2 CPU-min nightly | M4 (§16) | the rungs alternate milestone runs; the 5K and 8K fixtures at milestones only; at PR the levels rotate over runs, every level nightly |
| item 122's measurements (the `crisis.*` statistics over the crisis fixtures' weeks and sweeps and the force fixtures) and `item122.crises`; the looks' raster timing | ≤ 10 CPU-min nightly; the raster timing inside §13.8's timing phase | M3b (the previews); M-SF (the dossier crisis and force fixtures) (§16) | every fourth week nightly, all 52 at milestones |
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
=== END ===

=== REPLACE ### 7.1 The bars ===
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
| T-V12-44 | **Item 111's bars are wired.** `T111d.walk`, `T111d.water.<kind>` and `T111d.rich` are registered as V12 §3.6b's bar map states; on planted fixtures a flat walk-to-water share fails `higherWith`, a river chance drawn at half the arid row's fails its `rate`, and a richest band farther from water than the middle band in most towns fails `most`; `water.kinds` flags a generated oasis on a temperate row; `item111.water` holds; the item-111 register lines are written at M2b | C | M1 (T111-2, T111-3, T111-5); M2b (T111-1, T111-4) |
| T-V12-45 | **The style line and the trial's findings (item 112).** `bar.T112-1` fails a fixture variant whose one legend pair falls below §8.2's threshold and passes once its colours are fixed, the threshold's entry unmoved; `plat calibrate register --trial` on a fixture `TrialRecord` appends a `trial` row to the threshold's entry for a colour finding, moving no cell and no status, opens a `known-defects.json` entry for an unfixed minor, closed by a fixture change marking it fixed, refuses a finding naming a calibrated value with no entry, and appends nothing on a second run | C | M3b (the line); the release candidate (the trial) |
| T-V12-46 | **Item 113's registrations.** `T113e.lost` on V04's LOST fixtures: after the sealing epoch and after the author `delete` the void is LOST and its dwellings empty; after the reopening epoch and the dig they return; a planted void staying reachable through a closed link fails; the history fixtures' digests agree on the five engines (T113-2); `item113.history` holds; the item-113 register line's entries take their `V6-E9` row from T113-1, T113-3, T113-4 and T113-6's registered `BenchBarDef`s | C | M6-E (`V6-E9`); M6-U (T113-5, at the later of the two) |
| T-V12-47 | **Item 114's specs and bench bars.** On V06's wall fixtures `T114g.oldestFirst` fails a planted recovery that replaces a younger patch first and `T114g.sustained` a planted change on a driver alternating across its threshold, `bar.T114-4` and `bar.T114-5` resolving to them; `bar.T114-6` fails a planted `patched` row whose luma equals `standing`'s at a band where both draw, and `bar.T114-7` a readiness × wealth fixture whose shares differ from the derivation row's by more than one run; `item114.condition` holds the golden suite at generation and reproduces V06's neglect and repair | C | M2b (T114-6, T114-7 and the pin's generation clause, with §7.7's DR41 and the state rows, §13.8); M6-E (the specs and the pin over epochs) |
| T-V12-48 | **Items 115 and 116** (takes T115-1's statistic, T115-4's two pins and T116-1's statistic). `bldg.grandeur` counts an `H` dwelling, a court and a second manor on a planted rich HAMLET fixture; the rung pin `item115.ceiling` holds TOWN, CITY and METROPOLIS byte-identical across the ceiling table's bump, and the off-form pin `item115.off`, with every ceiling row's `enabled` false, holds every rung byte-identical to the base; `view.limitStop` reports the whole bounds inside the limit, or the limit at stop 0 where they do not fit (the METROPOLIS cap at 1 280 × 720 and at 600 × 480 CSS px), and 0 reachable stops beyond it at every rung THORP – METROPOLIS, and a planted extra stop fails | C | M1 (item 116); M2b (item 115); the village rungs with volume 7 (§13.8) |
| T-V12-49 | **Items 117 and 118.** `item117.season` and `item118.festival` hold on their suites; `bar.T117-2` counts ≥ 5 crown colours on the autumn fixture and fails a planted single tint, and `T117i.leafCover` fails a planted week whose cover thins; `T117i.arid` fails one planted snowflake; `T117i.ice` fails a planted river frozen before its pond and ice on a mill race; `T117i.styles` runs T112-1 at each season's middle week and fails a planted season whose one legend pair falls below §8.2's threshold; a `{ week }` step moves no model digest; the `BenchBarDef`s T118-2 – T118-6 each fail their planted breach (a decoration a week outside the window; a differing export tile; a CITY banner at a HAMLET; a staging off its keyed place; a pennant across a gate's passage) | C | M3b (items 117 and 118, §13.8) |
| T-V12-50 | **Item 119's measurements** (takes T119-1's target report, T119-2's timer, T119-4's budget-register check and T119-5's interaction-row comparison). On the timing-phase runs every `wait.*` kind is timed click to complete at every rung's top and the metropolis cap, advance time and the history replay each in total (item 119 (a2)): a planted 60-epoch advance of 0.2 s an epoch (12 s in all) fails the comfort bar though no epoch takes a second; a planted 11-second wait fails the comfort bar naming the wait and rung; a planted 1.4-second wait with no progress frame fails, and one showing an empty frame fails; a `perf.qualitySpend` row whose `gainBar` fails, whose gain its runs do not show or whose `run` is absent fails the budget-register check, as does a stage timed above its §12 target with no row standing, while a row whose gain the runs show passes; a relaxed interaction row fails it; a target miss inside ten seconds is reported as D-18's declared miss and gates nothing | C | M1 (TOWN, CITY); M2b (METROPOLIS and the cap; the budget-register check); each other wait from the milestone that lands it — M3a (a dossier change applied, a migration), M6-E (advance time and the history replay), M-SF (an open from SettlementForge) |
| T-V12-51 | **The owner's sittings follow J122.** Only M1, M2b, M4 and M5 register `sitting` as themselves; every other panel registers `nextGating` and is batched into the next gating sitting when its build has landed by then; a staged panel whose build lands after M5 stays *provisional — not rated*, re-offered with every release, and never fails an exit | C | M1 |
| T-V12-52 | **Item 120's measurements (Find)** (takes T120-1 and T120-6; its statistics measure T120-2 – T120-5, whose interface clauses V09's T-V9-83 takes). `item120.find` holds on its suites: a planted chip-dependent model write, saved byte or log entry fails it, and a planted base tile left redrawn after Clear fails its tiles; `find.matches` fails a planted chip drawing an entity the gazetteer does not return and one missing a row; `find.leaks` fails a planted canary in a suggestion, in a count bubble and in a gap outline on the canary's district under a player view; `find.held` fails a chip set dropped at a planted layer change, a chip dropped by a migration, a chip removed from the set with its last match and a match left glowing after its entity's removal; `find.pins` fails a planted city-band match with neither pin nor bubble; `find.cues` fails a planted ninth chip without its glyph; a planted suggestion time above §12.5's budget at the METROPOLIS cap fails its timing row, and a relaxed Find row fails V12 §3.15.9 (5)'s comparison; the chip sets drawn by `find/<seed>` reproduce | C | M5 (Find's milestone, §16) |
| T-V12-53 | **Item 121's measurements** (takes T121-2, T121-3, T121-5, T121-6 and T121-8). On the threshold fixture a loop planted without its 10-second spacing fails `resolution.changes` (two changes in one window) and one planted to apply a change mid-pan fails it (a change during a gesture); a planted load holding the reference device's p95 over 16.7 ms under Auto fails `resolution.p95`; a planted label glyph composed into the base tile at a tile DPR below the device's ratio fails `resolution.textPx` at that level; a planted export reading the tile DPR fails `item121.display`; a planted ultra-tier canvas over 512 MB, or a light rung given up at native 4K, fails `resolution.ultra4k`; the 5K and 8K fixtures draw at their 4K-equivalent DPR with `resolution.textPx` 0; a device below the low tier is reported, never gated | C | M4 (§16) |
| T-V12-54 | **Item 122's measurements** (takes T122-1, T122-2, T122-3, T122-5, T122-6 and T122-7). `item122.crises` holds on its suites; a planted look drawn with Show crises off fails it and one drawn with no condition and no preview fails its tiles; `crisis.weeks` fails a planted look drawn one week past its `untilWeek`, one drawn for a condition whose `untilWeek` is not after its `sinceWeek` and a planted look of a condition the `public` key withholds; `crisis.stable` fails a planted unkeyed draw (two opens differ); `crisis.scale` fails a planted CITY camp smaller than the TOWN one at equal severity, a camp shrinking as severity rises and, by its second count, a camp drawn at double its row's `scale` cell; `crisis.blocked` fails a planted tent in a gate's passage, one on water and a planted camp on a carriageway, the `blockade`, `raiders` and `rebellion` barricades across their ways passing; `crisis.share` fails a planted refugee camp placed before the siege and planted camps together past `densityCap`; `time.crisisReskin` fails a planted re-raster of every cached tile at a week crossing a condition's edge | C | M3b (the previews); M-SF (the dossier crisis fixtures) (§16) |
| T-V12-55 | **Item 122 (h)–(i)'s own bars.** On V08's force fixtures `crisis.areaPerHead` lies in [0.9, 1.1] for every army and group and fails a planted camp sized by severity where a headcount is given; `crisis.coalition` lies in [1.8, 2.2] and fails a planted coalition drawn as one army's camp; `crisis.framing` fails a planted opening view leaving a camp out, a limit not restored in the first week no look stands and a moved view re-framed when a look begins; on the 60 000-head THORP siege `crisis.ring` finds every remainder's arc, and the frame, the margin, the model digest and the hash equal those of the same document with no condition | C | M3b (the framing on previews); M-SF (the headcounts) (§16) |
| T-V12-56 | **Item 123's measurements** (takes T123-2, T123-3 and T123-7). On the damage fixtures `damage.nested` is 0 over the 21 levels and fails a planted threshold re-drawn per level (an element damaged at 0.4 and whole at 0.45); from M6-E it is 0 over H-100's decay runs' weeks; `damage.breakLevel` fails a planted threshold keyed by a draw counter (a regeneration moves an element's level); `item123.damage` holds the never-decayed control and the underground's bands and fails a planted rubble stipple drawn on every building | C | the V03 step that draws a decayed or ruined plan (V03 §8); M6-E for the decay runs (§16) |
| T-V12-57 | **Item 124's measurements** (takes T124-1 – T124-4 and T124-6 – T124-9). `item124.effects` holds on its suites and fails a planted spell that re-rasters a tile and one that writes a view key; `weather.frameMs` reports each kind's densest p95 and fails a planted density four times the row's on the reference device; `weather.snow` fails one planted snowflake on an `arid` row; `weather.aridRain` fails a planted arid row whose showers come ten times too often and one raining in a dry week; `weather.cover` fails a planted drop drawn over a label; `weather.luma` fails a planted lightning flash and a shower fading in over 0.2 s; `weather.replay` fails a planted spell drawn from the host's clock | C | M3b (§16) |
| T-V12-58 | **Item 125's measurements** (takes T125-1 and T125-2). On the required-keys dossier `port.fallbacks` is 0 at every rung, THORP to the METROPOLIS cap, and fails a planted used field read with no fallback report and a planted stage left without output; with no stamped tick the clock starts at week 0, the year position at midsummer (week 19); `item125.host` holds over B-DOSSIER-lite and the required-keys dossier and fails a planted host week read into the clock and a planted `audience` read into a stage | C | M-SF (§16) |
| T-V12-59 | **Item 126's measurements** (takes T126-1's medium-minimum clause and T126-2). `layout.touch` is 0 at 600 × 480 and fails a planted tool whose canvas script needs a hover; `layout.belowMedium` is 0 over the resize script and fails a planted narrow layout below 600 × 480, a tool greyed there and a page that does not scroll; `item126.resize` fails a planted view re-framed by a resize and a selection it clears; the fixture registry holds no viewport but the resize script's sizes (no phone viewport) | C | M2a (§16); each tool's script from the milestone that lands it, every tool from M3a |
=== END ===

=== REPLACE ## 9 Decisions (each vetoable) ===
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
=== END ===

=== REPLACE ### 10.2 Hand-offs from this volume — each closed at its destination ===
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
| X-V12-11 | V01 – V11 | every volume pin that restates an owner item's pin — V12 §3.7.8's list: T-V1-4 (e), T-V2-50, T-V2-58 (f), T-V2-59 (d), T-V2-60 (c), T-V3-34, T-V3-39 (g), T-V3-40 (f), T-V4-47, T-V4-69, T-V4-77 (d), T-V4-82 (g), T-V5-15, T-V5-19 (c), T-V5-22 (b) and (k), T-V5-27, T-V5-33's item-111 clause, T-V5-34 – T-V5-36, T-V6-12's `w_sun` clause, T-V6-44, T-V6-65, T-V6-71 – T-V6-74, V07's pins, T-V8-50, T-V8-53, T-V8-59, T-V8-61 (b), T-V9-57, T-V10-43, T-V10-45, T-V11-13, T-V11-31, T-V11-38 (b) – T-V11-41 (b) — registers its suites on V12 §3.7.8's engine under its V12 §2.13 pin, reads "off" as V11 §3.24.0 (V11 §3.7.4 for items 105 and 107) and follows V12 §3.7.6's bumps | V01 §7; V02 §7; V03 §7; V04 §7; V05 §7; V06 §7; V07 §7; V08 §7; V09 §7; V10 §7; V11 §7 |
| X-V12-12 | the base | the requests applied as file f items (V12 §10.1); §16's M3a row carries item 110 (a) – (d)'s base parts and K2, raised-way generation at M3a; §13.2's conformance clauses on the harness registry's `conformance` list; V12's deltas in §16's sum | §16; §13.2 |
| X-V12-13 | V04 | T-V4-54 reads g's *voids* (a deep void a connected component as V12 §3.4.2's `void.*` row defines it, at most three per town); T-V4-43's ± 3 s.e. and 500 seeds per rung and T-V4-58's ± 3 s.e. and ≥ 200 undercities as parameters; T-V4-51's step script V12 §3.6b's; `CatacombComplex.id` keeps its source lineage; T-V4-44 never reads a monument's tiers | V04 §7 |
| X-V12-14 | V07 | the village rungs' levels of item 109's bars join at V-M4 (`notApplicable` before); V07's village pin registers on V12 §3.7.8 | V07 §7 |
| X-V12-15 | the base, V02, V03, V06, V11 | every bar a register line names as `bar.<id>` that no spec carries registers a `BenchBarDef` with the milestone whose exit writes the entry (the base's T16-4, V11 §8's `detourFactor` line; V02's T-V2-22, -28, -29, -30, -32, -36, -37, -42, -46, -47, -51; V06's T-V6-6 – -10, -13, -16, -18, -28, -31, -32, -40, -43, -54, -62, -72, and T-V6-34 and -37 in their epoch forms; V11's T-V11-30; V03's T-V3-35; the base's bench bars of items 112–119 by their §13.2 ids — T112-1; T113-1, T113-3, T113-4, T113-6; T114-6, T114-7; T117-2; T118-2 – T118-6; T119-2 (V12 §3.15)), each setting's `preset` a `PresetArm` | V02 §3.10.10; V03 §2.4; V06 §8; V11 §8; §13.2 |
| X-V12-16 | V01, V03, V04, V05, V07 | every milestone landing a registry table or a calibratable column exits with `plat calibrate register --check` green over the cells it lands; V03 writes its own lines, the others take V12 §3.11's named lines or the default line | V01 §8.1 (J-V1.97); V03 §2.4, V03 §8; V04 §8 (J-V4.117); V05 §8 (J-V5.80); V07 §8 (J-V7.124) |
| X-V12-17 | V01, V03, V04, V05, V06, V07 | the default line dates a column landing after M-CAL's record to its layer's later run (`M-CAL/under`, `M-CAL/sky`, `M-CAL/evolution`, `M-CAL/M6-P`); `--milestone <id>` is required in V12 §2.8's form; the volumes' own lines write their steps so (`V6-E1` – `V6-E8`, `V4-U*`, `V4-U3b`) | closed: the seat writing each entry writes the id, the command refusing any other form; V04 §8 and V06 §8 write the ids |
| X-V12-18 | V02, V03, V04, V09, V10, V11 | a line of several stages is one staged entry; the span-rule line's order M4, `V4-U3`, `V4-U5`; V03's hand tuning at `V3-P6` and its hand fallback by the moved-value row; rows a later step adds by the rows-added row; V09's and V10's application constants outside the register | closed: V04 §8's span row takes this line's order and cites it; the rest hold as the destinations read |
| X-V12-19 | V04, V06, the base | V06's lines date by exit step and line `stateSnapCm` at `V6-E2` on `bar.T-V6-62`; V04's span row (J-V4.118) names the cells `raisedWays.structure.span.*` (values V11 §3.24.2; the rule §2.7, file f item 244); item 244's slide bound and item 245's snap named by their V11 cells | V06 §8; V04 §8; file f items 244, 245 |
| X-V12-20 | V09 | the app harness runs V12 §3.15.11 – V12 §3.15.16's fixtures: the device fixtures with T121-5's captures, the crisis previews' and the weather fixtures' sessions, the touch scripts and the resize script at the medium class's minimum | V09 §7 (T-V9-22, T-V9-84, T-V9-85, T-V9-87) |
=== END ===

