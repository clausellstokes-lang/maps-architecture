# SettlementForge dossier — real outputs (survey lane sf/outputs)

> PENDING FABLE REVIEW — Opus-produced (sf/outputs).

## PROGRESS
- [x] 0 resume and baseline: a first run of this lane (started 14:31) left scratch work only (no output file); its tree copy is verified equal to branch fp/integration-2026-09-23 @ 5d699cc68; this run re-executes and re-checks everything it quotes
- [x] 1 src/data/sampleDossier.json by script (branch, HEAD, master, working tree) + sampleSettlements.js
- [x] 2 fixtures census under tests/fixtures (branch) and the dossier-shaped ones read (input shapes only)
- [x] 3 fresh generation across six tiers (three seeds each), the three sample cards, one town per culture, a 120-dossier soak; determinism; sizes; counts
- [x] 4 simulator ticks (one week, one season, one year under the birth default; one year under realistic_regional)
- [x] 5 three worked examples quoted from a real output (an institution, an NPC, a power faction and a set of trade links)
- [x] 6 PLACE: what a real dossier says spatially vs what it leaves to the map
- [x] 7 differences: samples vs fixtures vs fresh outputs (and the stale working tree)
- [x] 8 queue row (B-sf/outputs in docs/FABLE-REVIEW-QUEUE.md) + LANDED

## 0. Baseline, method and reading log

**Which SettlementForge (CONFIRMED, 17:2x).** Same baseline as the sibling lanes sf/model and sf/seam: branch `fp/integration-2026-09-23` @ `5d699cc68` (2026-09-24 16:33; `git log -1` re-run today, the tip has not moved). The on-disk working tree of `/Users/cstokes/Desktop/settlement-engine` is stale (its fixture files carry July mtimes; see §7.1). All generation ran from the read-only export of the branch's `src/` in `scratchpad/sf/tree/` (node_modules symlinked to SettlementForge's, only read). That export was checked three ways: the first run's sorted blob list of all 2,320 files equals the branch's (`b.txt` = `c.txt`); this session's copy equals the first run's copy (`diff -rq`, no output); and `generateSettlementPipeline.js`, `advanceInterval.js` and `sampleDossier.json` hash-match `git show 5d699cc68:<path>`.

**Scratch** (`SCR` below = `/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/sf/outputs/r2/`): generated dossiers in `SCR/gen/` (35) and `SCR/soak/` (120), per-dossier counts `SCR/gen-counts.tsv`, per-tier summary `SCR/soak-summary.tsv`, samples `SCR/samples/`, branch fixtures `SCR/fxb/`. Scripts: `gen.mjs`, `soak.mjs`, `counts2.py` (and, reused from the first run, `../tree.py`, the key-tree walker).

**Nothing was written into SettlementForge (CONFIRMED).** Before every node run a marker file was touched in scratch; after each run `find /Users/cstokes/Desktop/settlement-engine -newer <marker> -not -path '*/.git/*'` listed nothing (node_modules included). Git use: `git log`, `git show` only.

**Resume note (CONFIRMED).** The first run of this lane (14:31–14:43, in session 454522d3) generated 18 dossiers with seeds `sfout-<tier>-<n>` and stopped before writing this file. This run regenerated the same 18 from this session's copy: all 18 are byte-identical to the first run's files (`cmp`, 18 of 18). So generation is deterministic across processes and sessions, and the first run's artifacts (tick runs, custom-content and neighbour runs) are the same product as this run's.

**Read in full:** `src/data/sampleDossier.json` (by script and by eye), `src/data/sampleDossier.js`, `src/data/sampleSettlements.js` (branch), `tests/fixtures/townMapFixtures.js` (branch; a pure input builder), `tests/fixtures/spatialPackFixtures.js` (branch), `tests/fixtures/save-museum/manifest.js`; every JSON fixture under 600 bytes (all hash goldens); the top-level structure (by script) of every larger JSON fixture; the save bodies in `legacy-saves/` and `save-museum/` (by script). **Headers only (first 32 lines):** the other twelve `.js` fixtures (to classify them). **Sibling files read:** `research/sf/dossier-model.md` (in full) and `research/sf/dossier-seam.md` (in full); this file does not repeat their field-by-field model, it measures real outputs.

**Not read (scope rule, decided by name):** `tests/fixtures/town-map-golden.json`, `town-map-v2-golden.json`, `town-cartography-dormancy-golden.json`, `cartography-calibration-corpus.json`, `cartographyCalibrationCorpus.js` (SettlementForge's own map-program outputs; only their byte sizes were taken, by `git show … | wc -c`). `interiorFixtures.js`: header read to decide — it is the synthetic corpus of SettlementForge's building-interior program ("the KEYED SCALE (interiors) golden … DOOR 3"), so it was not read further; its input roster (`{name, catalogId}` plus quarters) mirrors `townMapFixtures.js`. No file under `src/domain/townMap/**` or any map design doc was opened by this lane.

## 1. The samples (`src/data/`)

### 1.1 `sampleDossier.json` — a hand-made teaching dossier, not a generated one

- CONFIRMED: one file, byte-identical (sha1 `965cdb47…`, 7,237 bytes) on the branch, on the ledger HEAD `8ffe9479f`, on `master` `b9c494afe` and in the working tree. `sampleDossier.js` (also identical everywhere) re-exports it frozen as `SAMPLE_DOSSIER` for the landing page's proof card, the first-dossier callouts and the workshop's locked preview, and names three stable ids the callouts point at: `npc.velda`, the supply good `grain`, the hook `hook.ledger`.
- CONFIRMED (its `_comment`): "Hand-curated sample dossier … Crafted around the canonical Hightower's Reach example … Schema-compatible with a real generated settlement but tuned for teaching".
- CONFIRMED (key-tree script, `SCR/samples/sampleDossier.tree.txt`): **23 top-level keys** — `_comment, _seed, _version, schemaVersion, simulationVersion, generatorVersion, id, name, tier, population, culture, config, pressureSentence, arrivalScene, institutions, npcs, factions, economicState, stressors, supplyChainState, plotHooks, history, neighbourLinks`. (sf/model reports 21; the script counts 23 including `_comment` and `_version`.) Contents: a town, population 2,847; `config` has 5 keys (`settType town, tradeRouteAccess "salt road", terrainOverride hills, monsterThreat frontier, culture germanic`); 6 institutions `{id, name, category, size small|medium|large, weight 0.3–0.9}`; 4 NPCs `{id npc.<name>, name, role, importance major|minor, institutionId, secret (a string), want, publicFace?}`; 3 factions `{id fac.<x>, faction, category, power 45–78, trend rising|failing|stable}`; `economicState {prosperity {tier, label}, exports[4], imports[4], criticalImports[1]}`; 2 stressors `{id, type famine_primed|corruption, label, severity high|medium, tags}`; `supplyChainState {exports[1] {good, destination, stability}, imports[1] {good, source "Whitestone Pass", stability, criticality}, failures[1] {good, at, timeline "11 days", cascadeTo, reason}}`; 3 `plotHooks {id hook.<x>, tier A|B|C, title, body, connectsTo[npc ids]}`; `history {events[3] {yearsAgo 0.06–142, type, title, summary}}`; 2 `neighbourLinks {targetName, tier, relType rival|trade_partner, distance}`.
- CONFIRMED by comparison with §3: almost none of this is the generated shape. The generated dossier has no `culture`, `supplyChainState`, `plotHooks` or `neighbourLinks` key at the top; its institutions carry no `id`, `size` or `weight`; its NPCs carry `npc_<n>` ids, a `secret {what, stakes}` object, `goal`, `personality`, `factionAffiliation` and no `institutionId`; its top-level `factions` are NPC social groups (the power factions live in `powerStructure.factions`); its `prosperity` is a string; its stressor types are a fixed list that holds neither `famine_primed` nor `corruption`; its history is `historicalEvents` / `eventsTimeline`, not `events`; `tradeRouteAccess` "salt road" is not an access key (§6.1). Its size, 7 KB, is about a twentieth of a generated town's (135–190 KB minified, §3.3).
- For the map, the sample is interesting for what it has that real outputs lack: named places outside the town (`Whitestone Pass` as the source of grain and the place a supply failure happens), neighbour **distances with a direction** ("two days, salt road", "half a day, upriver"), and a scene with a wind direction and a site ("Stone walls cap a low hill above the road. Salt-cured smoke … drifts north on the prevailing wind"). No generated dossier carries a distance, a named pass or a wind (§6).

### 1.2 `sampleSettlements.js` — three sample cards that are generator CONFIGS, not dossiers

- CONFIRMED (branch file read in full, 12,333 bytes): three "teasers" shown to new accounts — Mossgate (town, `mossgate-004`), Black Crag (city, `blackcrag-016`), Cnocby (village, `cnocby-033a`; the owner's order of 2026-09-19 replaced Thornwell with Cnocby). Each carries only `{id, name, tier, terrain, teaser, tags, config}`; its header says the cards are "a REAL generation" whose seed and config were "seed-hunted through the live generateSettlementPipeline", and that a fork loads the config without `seed` and passes the seed as the generation argument (suffixed by who is forking). The file explains why no dossier JSON is shipped: "A full dossier serializes to 30-60 KB" and a stored JSON would go stale — the 30–60 KB figure is itself stale (measured 45–250 KB, §3.3).
- CONFIRMED: the three versions differ. Branch: Mossgate / Black Crag / Cnocby, seeds `mossgate-004`, `blackcrag-016`, `cnocby-033a`. Ledger HEAD and `master` (6,679 bytes, identical): Mossgate / Black Crag / Thornwell (`thornwell-034`). Working tree (4,710 bytes): the same three names with seeds `sample-*-v1`.
- CONFIRMED (executed): the three branch cards were generated with their canonical seeds and configs (`SCR/gen/sample-*.json`): Mossgate town, population 4,155, 60 institutions, 9 NPCs, government "Church Council"; Black Crag city, 18,911, 47 institutions, 12 NPCs, "Merchant City Council"; Cnocby village, 767, 26 institutions, 6 NPCs, "Elder Council". All three have the 41 keys of any generated dossier. Their configs use `monsterThreat: 'heartland'` and pinned resources (`nearbyResourcesRandom: false`, `nearbyResources[]`, `nearbyResourcesState {iron_deposits: 'depleted'}`) — real wizard dials that appear in no other sample.

## 2. The fixtures (`tests/fixtures/` on the branch)

CONFIRMED census: the branch holds 72 entries plus two sub-folders (`legacy-saves/` with 1 file, `save-museum/` with 4); the working tree holds 27 entries. Classified by reading as described in §0:

| Group | Files | Dossier-shaped? |
|---|---|---|
| Real historical save bodies | `legacy-saves/april-2026-v1.json` (3 pre-v2 saves, "envelope real, body real"), `save-museum/02-v2-draft-2026-06.json`, `03-campaign-canon-2026-07.json`, `04-forward-version-vNext.json` (the same bodies re-enveloped in later save shapes), `save-museum/manifest.js` | YES — but tiny: bodies of 2,887 B (Harrowmoor, village, 17 keys, 2 institutions `{name, category, desc}`, 1 NPC), 3,314 B (Kelder's Reach, town, 16 keys, 3 institutions, 2 NPCs) and 116 B (Thistledown, hamlet, 5 keys). Migration fixtures of April 2026: no `spatialLayout`, no quarters, `stress` as an object, an array or null ("all three stress shapes"). The canon exhibit's `campaignState` is `{phase: canon, eventLog: [{tick 0, kind canonized, at}], systemState, locks, canonizedAt, generatedAt}` plus `versionHistory`. |
| Synthetic settlement input for the legacy map | `townMapFixtures.js` | YES, as an INPUT builder: `makeTownFixture()` returns `{_seed, id 'fixture-<seed>', name, tier, population (one per tier: 40 / 220 / 650 / 2400 / 12000 / 48000), config {terrainType, tradeRouteAccess}, spatialLayout {quarters}, institutions, defenseProfile ({hasWalls: true} or {}), economicState {prosperity 'Modest'}, powerStructure {governance 'council'}}` — "ONLY the fields buildTownMapModel actually reads". Quarters come from a pool of 11 invented ones (`Temple Ward` … `Commoner Rows`) with locations such as `north gate`, `east`, `hilltop`, `docks`, `downwind edge`, `outer`; institutions are invented (`<Category> <Type> <k>`), every third one custom (`localUid`), the rest `catalogId: 'cat.<cat>.<k>'`; city and metropolis add `Lodging District Housing`. `GOLDEN_CONFIGS` = 18 tier × terrain × walls × water specs; `V2_EXTRA_CONFIGS` add an `urbanFabric` mirror `{drift, stocks{class: 0–1}, scars[{kind, severity, week}], rebirths[{classes, type, week}]}`; `LANDFORM_FIXTURES` add `economicState.exports ['reed','peat']` to one. |
| Synthetic realm packs (FMG shape) | `spatialPackFixtures.js` | NO settlement body — the REALM input: a pack `{cells {h (height; <20 water, >60 mountain), biome (FMG ids), r (river flag), p ([x, y]), c (neighbour cell ids), fl (flux, opt-in), g (grid index, opt-in)}, grid {temp, prec} (opt-in), meta}` and placements `[{id, cellId, institutions?: [{name}]}]` — a settlement enters the realm only as an id, a cell and, for ports and teleport circles, one institution NAME ("geography ∧ institution ⇒ a port"). Builders: grid, island, disconnected water, isthmus, port coast, teleport, lake, tie. |
| Generated at test time (no stored body) | `tasteTowns.js` (real generated towns plus ONE synthetic corruption impairment), `composedReadingSequence.js` (generates towns to compose a prose reading) | Via the generator. `tasteTowns.js` records measured facts about real outputs: "NO generated town carries an institution impairment of any kind — impairments are world-pulse products", "the 178 corrupt NPCs across 768 towns are homed to FACTIONS rather than to institutions", and `criminalCaptureState` `corrupted` in 15 of 768 towns. |
| Custom-content INPUTS | `customContentReferencePack.js` (one admitted definition per authorable bucket, the "Aurora" pack), `customContentArchiveFixtures.js` (archives and content packs) | Content definitions, not dossiers; §3.5 generates a town with the reference pack. |
| Hash goldens of generated or simulated output | `generator-golden-master.json` (525 rows `tier|culture|terrain|access|threat|seedTag` → SHA-256 of a generated dossier), `dossier-prose-manifest-golden.json` (1,050 rows = the 525 configs × dm/player), `worldpulse-golden-master.json`, `worldpulse-seasons-golden.json`, `worldpulse-spatial-golden.json`, about thirty `*-dormancy-golden.json`, `spatial-digest-golden.json` / `sea-lanes-golden.json` / `seasonal-overlay-golden.json` / `teleport-edges-golden.json` (8 settlements, 432 cells, 12–13 gates, a hash), `demographics-lifecycle-golden.json` (hash plus evidence: founding ticks, final populations, a receipt histogram), `timeline-track-golden.json`, `chroniclers-letter-golden.json` | NO — digests only. Useful as a CENSUS OF THE CONFIG SPACE SettlementForge pins: tiers thorp 84 / hamlet 84 / village 84 / town 105 / city 84 / metropolis 84 rows; 12 cultures `germanic, arabic, celtic, east_asian, greek, latin, mediterranean, mesoamerican, norse, slavic, south_asian, steppe`; terrains `plains, mountain, coastal, desert, forest, hills, riverside` (+ `auto`); access `road, port, isolated, river, random_trade, mountain_pass, crossroads, none`; threat `civilized` (522 rows), `frontier`, `plagued`, `safe`. |
| Other subjects | `wiringFixtures.js`, `grammarControls.js`, `brackwaterTables.js`, `civilityVectors.js`, `gameGradeHeraldFixtures.js`, `soakFlagRegistryFixture.js`, `goods-matcher-identity-corpus.json`, `herald-knowledge-desk-golden.json`, `distribution-envelopes.manifest.json` (measured base rates of generated features, e.g. an ordinary town born corrupted 2.25 % of 400), `simSoakReceiptFixture.json` ("AUTHORED fixture (never captured from a run"), `preset-lighting-witness-golden.json`, `mechanism-lit-coverage-baseline.json`, `brand-derivatives.mint.json`, `cl0-legacy-normalize-pin.json`, `cl0-rogue-authority-pin.json`, `.golden-freeze-register.json` | NO. |
| SettlementForge's own map program | `town-map-golden.json` (370 B), `town-map-v2-golden.json` (304 B), `town-cartography-dormancy-golden.json` (4,383 B), `cartography-calibration-corpus.json` (162,169 B), `cartographyCalibrationCorpus.js` (21,121 B); `interiorFixtures.js` (header only) | Not read (scope rule). |

Finding (CONFIRMED): **no fixture stores a full generated dossier.** SettlementForge pins generation by hash (525 configs) and builds every other settlement it tests either at test time from the generator or as a minimal synthetic object carrying only the fields one consumer reads. The only committed dossier bodies are the three April 2026 migration exhibits (≤ 3.3 KB each) and the hand-made teaching sample.

## 3. Freshly generated dossiers

### 3.1 What was generated (all CONFIRMED by execution; files in `SCR/gen/` and `SCR/soak/`)

- **The tier set** — 18 dossiers, three per tier, seeds `sfout-<tier>-<1..3>`, configs `{settType, culture, terrainOverride, tradeRouteAccess, monsterThreat}` rotated over five cultures, five terrains, five access keys and three threat levels (the list is in `SCR/gen.mjs`). Names: thorp Caththwaite / Ormmark / Miroovo; hamlet Ormvik / Easheath / Lidourbs; village Lipopol / Hartbrücke / Ormgarde; town Berghafen / Novaorum / Glenford; city Pianopagus / Flachfeld / Maloino; metropolis Unterthal / Ventovicus / Kilfield.
- **The three product sample cards** with their canonical seeds (§1.2); **one town per culture** for the twelve culture keys of SettlementForge's golden matrix; **a 120-dossier soak** (20 seeds per tier, cultures, terrains and threats rotated) used only for counts; **a town generated with `city-1` as its imported neighbour** (`town-nb-1`); **a town generated with SettlementForge's custom-content reference pack** (`town-cc-1`).
- Call: `generateSettlementPipeline(config, importedNeighbour | null, { seed, customContent })`. Time: 13–52 ms per dossier.
- **Determinism:** same seed and config give the same bytes — in-process (`town-1` regenerated and compared: identical) and across sessions (18 of 18 identical to the first run, §0). The settlement `id` is `s_` + 16 hex characters (sf/model: an FNV-1a hash of `_seed`), e.g. `city-1` → `s_e6468f1a5e53d526`.

### 3.2 The actual top-level structure

Every generated dossier has the same **41 top-level keys**, in this order (154 of the 155 generated here; the custom-content town adds a 42nd, `customContentProvenance`). Share of bytes = mean over the 138 soak and tier-set dossiers (`SCR/populated.txt`); "empty" = null, `[]`, `{}` or `""`.

| Key | Type | Populated in | Share of bytes |
|---|---|---|---|
| `name`, `tier`, `population` | string, string, integer | 138/138 | 0.0 % |
| `institutions` | array | 138/138 | 7.7 % |
| `structuralViolations`, `structuralSuggestions` | arrays | 13/138, 39/138 | 0.1 % each |
| `neighborRelationship` | null unless a neighbour is imported | 0/138 | 0.0 % |
| `economicState` | object (19 keys; 20 with a neighbour) | 138/138 | 14.7 % |
| `spatialLayout` | object `{layout, quarters, tradeAccess}` | 138/138 (quarters empty in 1) | **0.6 %** |
| `availableServices` | object of 11 lists | 138/138 | 4.7 % |
| `powerStructure` | object (11 keys) | 138/138 | 3.8 % |
| `settlementReason` | array of prose | 138/138 | 0.2 % |
| `npcs`, `relationships` | arrays | 138/138 | 9.1 %, 5.9 % |
| `factions` (NPC social groups, members are full NPC copies) | array | 138/138 | 9.1 % |
| `conflicts` | array | 82/138 | 0.3 % |
| `resourceAnalysis`, `economicViability`, `history` | objects | 138/138 | 3.3 %, 1.7 %, 4.0 % |
| `isolationSupport`, `culturalIdentity`, `culturalNotes` | object, object, string | 138/138 | 0.2 %, 1.0 %, 0.2 % |
| `stress` = `stressors` (the same value twice) | null (97), one object (38) or an array (3) | 41/138 | 0.2 % each |
| `config` (resolved inputs, 30 keys) and `_config` (raw inputs) | objects | 138/138 | 1.1 %, 0.1 % |
| `pressureSentence`, `arrivalScene` | prose | 138/138 | 0.2 %, 0.5 % |
| `defenseProfile` | object | 138/138 | 1.3 % |
| `prominentRelationship` | object or null | 78/138 | 0.3 % |
| `coherenceNotes` | array | 1/138 | 0.0 % |
| `generationCoherenceReceipt` | object | 138/138 | 5.0 % |
| `simulationTrace` (a generation log: `{causes, downstreamEffects, targetType, targetId, step, result, ts}`) | array | 138/138 | **23.4 %** |
| `_seed`, `simulationVersion`, `generatorVersion`, `id`, `schemaVersion` | scalars | 138/138 | 0.0 % |
| `activeConditions` | array | 41/138 (exactly the dossiers with a stressor) | 0.2 % |
| `aiOverlays`, `userCanon` | `[]`, `{}` | 0/138 | 0.0 % |

Second-level emptiness worth knowing (same census): `config.intendedStressTypes`, `config.nearbyResourceDefinitions`, `config.nearbyResourcesCustom`, `resourceAnalysis.featureEffects` and `resourceAnalysis.priorityNotes` are empty in all 138; `economicState.transit` is filled in 29/138, `economicState.institutionalServices` in 69/138, `history.siegeNarrative` in 14/138, `isolationSupport.paths` in 19/138. The stress record is stored three ways (null / object / array) — a consumer must normalise it.

### 3.3 Sizes in bytes

Minified JSON (UTF-8), min – median – max over 20 seeds per tier: thorp 44,598 – 51,977 – 63,536; hamlet 63,035 – 73,174 – 89,206; village 88,904 – 104,779 – 117,318; town 135,724 – 164,940 – 190,421; city 171,335 – 190,902 – 217,815; metropolis 215,331 – 233,886 – 250,009. Pretty-printed with a one-space indent they are about 1.23 × larger (`town-1` 174,174 → 214,690). The town with an imported neighbour is the largest seen (261,129 minified), because `neighborRelationship` embeds the neighbour's exports, chains, NPCs and factions. **About a quarter of every dossier is the generation log (`simulationTrace`); the spatial layout is under one percent.**

### 3.4 How richly each tier is populated (the 120-dossier soak)

| Measure (min–median–max over 20 seeds) | thorp | hamlet | village | town | city | metropolis |
|---|---|---|---|---|---|---|
| Population | 10–36.5–60 | 105–190.5–365 | 412–627.5–891 | 1105–2883–4565 | 7244–17491–24447 | 27436–62088.5–95882 |
| Bytes (minified JSON) | 44598–51977–63536 | 63035–73174–89206 | 88904–104779–117318 | 135724–164940–190421 | 171335–190902–217815 | 215331–233886–250009 |
| People — NPCs (named notables) | 2–3–5 | 4–6–8 | 5–6–8 | 7–8–11 | 10–13.5–19 | 15–19–22 |
| … of which structural (faction seats) | 0–0–3 | 0–2–4 | 0–1–2 | 0–1–1 | 0–1.5–4 | 0–0–2 |
| … NPC↔NPC relationships | 1–1–3 | 2–5–9 | 4–9.5–15 | 9–17.5–24 | 21–31.5–38 | 36–43.5–52 |
| … NPC social factions | 1–1.5–2 | 1–2–4 | 1–2–4 | 1–2–6 | 1–3–8 | 1–4–7 |
| Institutions (records) | 7–9–12 | 8–16–24 | 25–32.5–42 | 40–54.5–65 | 33–48–52 | 47–56.5–60 |
| … drawn from the catalog (have catalogId) | 7–9–12 | 8–15–23 | 19–27–36 | 32–47–58 | 29–40–46 | 43–53.5–59 |
| … with a count range in the name | 1 | 1 | 1 | 8–10–10 | 4–4–6 | 6–7–8 |
| … distinct categories | 4–4–5 | 4–5–7 | 5–6.5–8 | 8–9–10 | 9–10–10 | 9–10–11 |
| … required | 5 | 7 | 7–8–8 | 13 | 14 | 14–14–15 |
| … clandestine facet | 0 | 0 | 0–0–1 | 0–0–1 | 0–0–1 | 0–0–1 |
| … subterranean facet | 0 | 0 | 0–0–1 | 0–0–1 | 0–0–1 | 0–1–2 |
| Power factions | 2–3–5 | 3–4–7 | 5–6–8 | 6–6–8 | 8–8–9 | 8–8–10 |
| … relations between powers | 0–1–3 | 2–2–3 | 4–5–5 | 5–6–8 | 7–8–8 | 8 |
| Conflicts | 0–0.5–1 | 0–0–1 | 0–0–2 | 0–1–2 | 0–1–2 | 0–1–2 |
| Trade — export labels | 0–3.5–7 | 0–5.5–11 | 0–9.5–11 | 4–13–16 | 8–16–19 | 12–18–21 |
| … import labels | 0–1–1 | 0–2–4 | 0–3–4 | 5–8.5–10 | 6–10–10 | 10–10–12 |
| … transit labels | 0–0–2 | 0–0–2 | 0–0–1 | 0–0–3 | 0–0–1 | 0–0–3 |
| … active supply chains | 0–2–4 | 2–5–9 | 6–9–13 | 9–20–29 | 11–21.5–33 | 16–21–27 |
| … trade dependencies | 0 | 0–0.5–3 | 0–1–2 | 3–7.5–14 | 3–10.5–19 | 7–16.5–23 |
| … institutional services | 0 | 0 | 0 | 1–3–5 | 3–6–10 | 6–9–10 |
| … income sources | 1–2–3 | 1–2–4 | 1–5–8 | 5–10–12 | 6–10–12 | 5–10–13 |
| … good-level trade links | 0 | 0 | 0 | 0 | 0 | 0 |
| Services offered (entries) | 7–9.5–15 | 8–18–27 | 31–41–60 | 63–86.5–107 | 53–80–90 | 74–96–106 |
| Nearby resources | 5–9–15 | 5–9–14 | 6–8–13 | 4–10–15 | 5–10–17 | 0–5–15 |
| Events — historical events | 0–3–3 | 1–2–4 | 1–3–6 | 1–5–8 | 3–7.5–10 | 5–10–16 |
| … current tensions | 1–1–3 | 1–1–2 | 1–1–2 | 1–2–3 | 2–3–3 | 2–2.5–3 |
| … stressors | 0–0–2 | 0–0–2 | 0–0–1 | 0–0–2 | 0–0–1 | 0–0–1 |
| … active conditions | 0–0–2 | 0–0–2 | 0–0–1 | 0–0–2 | 0–0–1 | 0–0–1 |
| … simulation-trace entries | 19–22.5–29 | 31–39–49 | 49–58.5–65 | 74–96.5–114 | 71–97.5–114 | 93–112.5–118 |
| Age (years) | 19–146–288 | 30–68.5–120 | 32–121–234 | 54–172.5–290 | 102–303.5–495 | 204–468–755 |
| Place — quarters | 0–1–2 | 1–2–2 | 1–2–2 | 3–4–5 | 5–6–8 | 5–6–7 |
| … landmarks named | 0–1–4 | 1–4–4 | 1–4–4 | 5–8–12 | 9–15–20 | 13–16.5–19 |
| … wall institutions | 0–0–1 | 0–0–1 | 0–0–1 | 0–2–2 | 1–2–2 | 1–2–2 |
| hasWalls (dossiers with it) | 8/20 | 6/20 | 8/20 | 19/20 | 20/20 | 20/20 |
| hasGates (dossiers with it) | 8/20 | 6/20 | 8/20 | 19/20 | 20/20 | 20/20 |
| hasPort (dossiers with it) | 0/20 | 0/20 | 0/20 | 6/20 | 6/20 | 5/20 |
| entrepot (dossiers with it) | 3/20 | 3/20 | 3/20 | 3/20 | 6/20 | 6/20 |
| government (most common) | Elder Council 11; Household Council 9 | Feudal Stewardship 13; Free Elder Council 6; Elder Council 1 | Elected Reeve 15; Feudal Stewardship 4; Elder Council 1 | Town Council 15; Guild Council 4; Feudal Appointee 1 | City Council 10; Merchant Guild Council 9; Noble Governorship 1 | Grand Council 13; Grand Guild Consortium 6; Ducal Governorship 1 |
| capture (most common) | none 20 | none 20 | none 20 | none 18; equilibrium 2 | adversarial 16; equilibrium 4 | adversarial 18; equilibrium 2 |
| prosperity (most common) | Poor 12; Moderate 4; Struggling 4 | Moderate 10; Poor 4; Comfortable 3; Struggling 3 | Comfortable 9; Poor 6; Moderate 4; Prosperous 1 | Comfortable 7; Poor 6; Prosperous 5; Moderate 1 | Prosperous 8; Poor 5; Comfortable 4; Struggling 2 | Prosperous 10; Poor 6; Comfortable 3; Moderate 1 |

Reading the table (all CONFIRMED on these 120 outputs; `SCR/gen-counts.tsv` has the same measures per dossier for the tier set, the samples and the culture towns):

- **People are notables, not a population.** 2–22 named NPCs per settlement (pipeline NPCs plus 0–4 "structural" faction seats with `generatedAs: 'faction_structural'`), 1–52 relationships between them. `population` is one integer. No household, family, class or occupation record exists in any output (as sf/model found in source).
- **Institutions are kinds with counts, and they peak at the town.** Towns carry the most records (40–65); cities (33–52) and metropolises (47–60) carry fewer because their catalog entries are aggregates (`District markets (5-10)`, `Craft guilds (30-80)`, `Merchant guilds (15-40)`, `Inns and taverns (district)`). Below town exactly one record per settlement has a count range in its name — the housing stock (`Dwellings (4-16)`, `Dwellings (17-80)`, `Dwellings (80-180)`); towns carry 8–10 such records. Of 5,846 institution records in 155 outputs, **none carries an `id`**. Clandestine / subterranean facets appear in at most one or two records per settlement, from village up.
- **Power** is 2–10 power factions with 0–8 pairwise relations; the criminal capture state is `none` below town and mostly `adversarial` in cities.
- **Trade** is label lists: 0–21 export labels, 0–12 import labels, 0–33 supply chains (by kind), 0–23 trade dependencies. **Good-level trade links with a partner are absent (0 of 120) unless a neighbour is imported** (§3.5).
- **Events** at generation are history: 0–16 historical events (the timeline mirrors them one to one), 1–3 current tensions, 0–2 stressors with the same number of active conditions. Nothing in a fresh dossier is dated on the simulator clock.
- **Walls and gates always come together** (`hasWalls` equals `hasGates` in 155 of 155 outputs): in every city and metropolis, 19 of 20 towns, 6–8 of 20 smaller settlements. **No settlement below town has a port institution**, even with port access (`village-3`: access `port`, `hasPort` false, no dock institution).

### 3.5 Variants: a neighbour, custom content

- **With an imported neighbour** (`town-nb-1`, neighbour `city-1` Pianopagus as a `trade_partner`): still 41 keys. `neighborRelationship` = `{name, tier, relationshipType, primaryExports[21], primaryImports[10], activeChains[25], economicStrength 0.65, militaryStrength 0.5, governmentType, dominantFactionTypes, tradeRoute "port", dynamics, npcs (full copies), factions}` — `tradeRoute` is the neighbour's access KEY, not a route; there is no distance or bearing. `economicState.tradeLinks` gains 4 good-level links (quoted in §5.3).
- **With the custom-content reference pack** (`town-cc-1`, nine buckets: institutions, services, resources, stressors, tradeGoods, factions, deities, traditions, supplyChains): 42 keys (+ `customContentProvenance {schemaVersion, scope, environment, bindingHash, materializedDefinitions[{category, definitionId, revisionId, contentHash, localUid, name, surfaces}]}`); one custom institution enters, `Aurora Provisioners`, with `isCustom: true, source: 'custom', localUid, customDefinitionId, customDefinitionRevisionId, customDefinitionContentHash, customDefinitionVersion, customDefinitionFingerprint` — the only institution records that carry a rename-proof identity.

## 4. After simulator ticks

**Setup (CONFIRMED by execution, `SCR/tick.mjs`, outputs `SCR/tick/`).** `town-1`, `city-1` and `village-1` were put in one scratch campaign as canon members and advanced with `simulateCampaignWorldInterval({ campaign, saves, interval, commit: true, now: <pinned>, autoResolve: true, advanceEpoch, customContent: {} })`, each run from the same starting point. Two worlds: **(a) the birth default** — `createNewCampaignWorldState(campaign)`, byte-equal to `createDefaultWorldState(campaign)` (checked), which is what a new campaign receives today (`NEW_CAMPAIGN_SIMULATION_PRESET_ID = null`); 12 rules lit (stressors, emergent events, relationship dynamics, NPC agency, faction competition, population dynamics, migration flows, trade flows, resource drift, tier drift, institution lifecycle, major changes require a proposal). **(b) the `realistic_regional` preset**, forced through the test seam; 35 rules lit, including `urbanFabricEnabled`, `settlementLifecycleEnabled`, `disastersEnabled`, `commodityFlowEnabled`. (`DEFAULT_SIMULATION_PRESET_ID = 'realistic_regional'` is what a save without a preset key is INFERRED to be; a birth does not get it.)

| Run | Weeks (ticks) | Calendar after | Outcomes selected / auto-applied / proposals | News items |
|---|---|---|---|---|
| birth default, `one_week` | 1 | week 1, month 1, year 1, spring | 7 / 6 / 2 | 7 |
| birth default, `one_season` | 13 | month 4, year 1, summer | 41 / 62 / 7 | 39 |
| birth default, `one_year` | 52 | month 1, year 2, spring | 136 / 315 / 12 | 142 |
| `realistic_regional`, `one_year` | 52 | month 1, year 2, spring | 116 / 242 / 11 | 143 |

**What a tick writes back (CONFIRMED by deep diff of every member before and after, `SCR/tick-analysis.txt`):**
- The simulator returns each member as a **whole new settlement object** (`settlementUpdates[].settlement`), not a list of changes. One week already touches `population` (+2 for the town), a new `populationHistory [{tick, delta, population, reason, outcomeId}]`, `economicState.foodSecurity.stockpile` (11 fields), per-NPC `corruptionVector` / `timesExposed`, per-faction `rivals[]` / `updatedByPulse`, and the conditions.
- Over a year (birth default): institutions become **impaired in place** (`status: 'impaired'`, `impairments[{type 'legitimacy', severity, causeEventId 'corruption:save-town-1:npc_3:demoted:home', description 'Propagated from faction "Religious Authorities" (legitimacy → legitimacy, hop 1)', appliedAt}]` — 4 of 59 in the town, 28 of 49 in the city); an NPC is replaced by a successor with a NEW id (`npc_3` gone, `npc.successor_342707` in, `replacedNpc` holding the old NPC's NAME); `history.historicalEvents` gains a campaign-era event `{campaignEventId 'campaign.world_stressor.betrayal.save_town_1.…', campaignEra: true, tick: 40, name 'Betrayal shock', type 'corruption_scandal', …}` (the same event lands at tick 21 under `realistic_regional`); the city's `resourceHistory` records depletions (`fishing_grounds`, `shipbuilding_timber`) and `config.nearbyResourcesDepleted` follows. The city lost 549 people (23,178 → 22,629).
- Under `realistic_regional` the dossier also gains `urbanFabric`, `npcLadder`, `traditions`, `config.peakTier` / `_config.peakTier` and, in the city, `calamityHistory`: a storm in week 52 (`deaths 2081, exodus 2818, targets ['Brothel (red light district)', 'Cathedral (10,000+ only)', 'Merchant guilds (15-40)']`), the city falling to 17,827 people, three institutions left in the array as ruins (`status: 'ruined', worldPulseFate: 'destroyed_by_disaster', remnantReason`, `_worldPulseInactive`, `_worldPulseEconomyClosed`), `urbanFabric.scars [{kind 'flood_line', severity 1, week 52}]` and `rebirths [{classes ['merchant','religious'], type 'storm', week 52}]`.
- **In both worlds, from the first week, power factions gain `controlledInstitutions`** — a faction-to-institution link written by the simulator's capture outcomes, keyed by `catalogId`, absent at generation. After one week `village-1`'s Merchant Guilds hold `['farmland']`; after a year under `realistic_regional` its Merchant Guilds hold six kinds and its Religious Authorities five, two of them (`ale_house`, `fish_market`) claimed by both and one of them the housing stock (`dwellings_80_180`); the town's Town Council holds `['market_square']`. The lists come and go (the city's Merchant oligarchy held `['warehouse_district', 'city_granaries']` after a season and nothing after a year in the birth default).
- **Never changed in any run:** the number of institution records (59, 49, 29 before and after — ruin and impairment are status on the kept record, not removal), `spatialLayout` and `culturalIdentity` (12 of 12 member-runs identical). The quarter list is fixed at generation even when the simulator razes a district-named institution.
- Sizes after a year: town 174 KB → 181 KB, city 219 KB → 244 KB (birth default) or 253 KB (`realistic_regional`).
- The campaign world state (outside the dossier) has 20 keys after the birth-default runs and 22 under `realistic_regional` (adds `spatialLedgers {satellites, urbanFabric, npcLadder, traditions, provenance, upswing, npcGrowth}` and `narrativeTempo`). `tick` and `calendar` live only there; the dossier carries tick numbers only inside its history arrays (`populationHistory[].tick`, `historicalEvents[].tick`, `urbanFabric.scars[].week`).

## 5. Three worked examples, quoted from real outputs

### 5.1 An institution — `Underground network` in `town-1` (Berghafen, town, 2,130 people)

The whole record, exactly as generated (institution 44 of 59):

```json
{
 "category": "Criminal",
 "name": "Underground network",
 "required": false,
 "baseChance": 0.15,
 "desc": "A network of excavated passages joining cellars and yards to the town's edge. None of it on any map.",
 "tags": [
  "criminal",
  "smuggling",
  "underground"
 ],
 "priorityCategory": "criminal",
 "facets": {
  "clandestine": "clandestine",
  "subterranean": "subterranean"
 },
 "forbiddenResources": [
  "marshlands",
  "fertile_floodplain"
 ],
 "source": "generated",
 "catalogId": "underground_network"
}
```
What it tells the map (CONFIRMED on this output): the record is a catalog KIND (`catalogId: underground_network`) with no `id`, no position, no quarter, no size and no owner. Its facets say it is hidden and underground (items 63–66); `forbiddenResources` says it cannot exist where the land is marsh or floodplain; its description says, in the catalog's words, "None of it on any map". Its identity is its name: the name appears twice more in the dossier, as the provider of two services, and the catalog key once more, in the generation log —

```json
{
 "availableServices.equipment[6]": {
  "name": "Discreet passage",
  "desc": "Move people beneath the walls unseen.",
  "institution": "Underground network"
 },
 "availableServices.criminal[3]": {
  "name": "Untaxed storage",
  "desc": "Hold goods in dug caches off the rolls.",
  "institution": "Underground network"
 }
}
```
```json
{
 "causes": [
  {
   "source": "baseChance",
   "effect": "15% likelihood",
   "reason": "Base chance for this tier/category was 15%."
  },
  {
   "source": "terrain.riverside",
   "effect": "context",
   "reason": "Selection occurred in a riverside setting."
  }
 ],
 "downstreamEffects": [
  {
   "target": "publicOrder",
   "effect": "eroded"
  }
 ],
 "targetType": "institution",
 "targetId": "institution.underground_network",
 "step": "assembleInstitutions",
 "result": "selected",
 "ts": 51
}
```
— and nowhere else: no quarter lists it as a landmark (the Shadows District is not generated in this town), no chain names it, no NPC or faction is linked to it. For contrast, the town's entire statement about housing for 2,130 people is one record:

```json
{
 "category": "Infrastructure",
 "name": "Housing (180-1000 structures)",
 "required": true,
 "baseChance": 1,
 "desc": "Timber and stone, raised to more than one floor.",
 "tags": [
  "essential",
  "housing"
 ],
 "priorityCategory": "infrastructure",
 "source": "required",
 "catalogId": "housing_180_1000_structures"
}
```
### 5.2 An NPC — `npc_6` Vita Dentatus in `city-1` (Pianopagus, city, 23,178 people)

The record without its `personality`, `physical` and `presentation` blocks (character colour only; the full record is in `SCR/gen/city-1.json`):

```json
{
 "id": "npc_6",
 "name": "Vita Dentatus",
 "gender": "female",
 "role": "Guild Master",
 "title": "Decurio of Furrier's district",
 "category": "economy",
 "goal": {
  "short": "Convert commercial leverage into more durable institutional advantages before conditions change.",
  "long": "Be remembered as the master who expanded the guild into new trades"
 },
 "secret": {
  "what": "Knows the debt contains a clause that transfers significant civic assets to the creditor on default (a clause that was buried in the original document)",
  "stakes": "Fabia Dentatus is a notary who helped draft it. They've been avoiding eye contact for six months"
 },
 "plotHooks": [
  "Someone is buying up their debts. Quietly. They don't know who, or why, or when they plan to call them in."
 ],
 "influence": "low",
 "power": 3,
 "institution": "Furrier's district",
 "corrupt": true,
 "corruptionVector": "fear",
 "secondaryAffiliation": "Smuggling operation",
 "corruptTies": {
  "criminalInstitution": "Smuggling operation",
  "thievesGuild": "Thieves' guild chapter"
 },
 "factionAffiliation": "Merchant oligarchy",
 "structuralPosition": "Controls organized commercial infrastructure in a functioning settlement. The position is secure and the leverage is real.",
 "activeConstraint": "Visible accumulation of institutional advantage invites regulatory and political attention.",
 "settlementCondition": "stable",
 "structuralRank": "dominant"
}
```
What it tells the map (CONFIRMED): the NPC is tied to places and powers only by NAMES — `institution: "Furrier's district"` (itself an institution record of the city: `{"category": "Economy", "name": "Furrier's district", … "desc": "Those who dress, trade, and sell fur, all pressed into one district. …", "catalogId": "furrier_s_district"}`), `factionAffiliation: "Merchant oligarchy"`, `corruptTies` naming two criminal institutions. She has six relationships in `relationships[]` and sits in the NPC social faction "The Civic Authority", which the dossier maps to the power faction "Noble Families" — not to her own `factionAffiliation` (the two faction layers need not agree; whether that is intended is not settled here). No residence, workplace position or household. A structural seat of the same city shows the linked-id fields, which hold NAMES too:

```json
{
 "id": "npc.arcane_orders_archmagister_0",
 "name": "The Archmagister",
 "role": "Archmagister",
 "importance": "pillar",
 "status": "active",
 "factionAffiliation": "Arcane Orders",
 "linkedInstitutionIds": [
  "Bardic college"
 ],
 "linkedFactionIds": [
  "Arcane Orders"
 ],
 "influence": "high",
 "legitimacyContribution": 30,
 "stabilityContribution": 25,
 "generatedAs": "faction_structural"
}
```
(`Bardic college` was added to the roster by `source: 'coherence_repair'`, `coherenceRepair: 'hard_dependency'`, apparently to give the seat an institution. After a simulated year the pulse can replace an NPC with a new id — `npc_3` → `npc.successor_342707`, §4.)

### 5.3 A faction and a trade route

**A power faction — the `Thieves' Guild` of `city-1`:**

```json
{
 "faction": "Thieves' Guild",
 "power": 9,
 "desc": "Organised criminal network controls the black market and several informal revenue streams; present in council discussions through intermediaries. Running roughly even with the military in actual influence: the garrison can arrest individuals, the guild can make the investigation expensive.",
 "category": "criminal",
 "rawPower": 9,
 "powerLabel": "Suppressed"
}
```
Its relations to the other powers (2 of the city's 8 pairwise relations):

```json
[
 {
  "pair": [
   "Merchant oligarchy",
   "Thieves' Guild"
  ],
  "type": "competitive",
  "direction": "stable",
  "captureState": "adversarial",
  "narrative": "Merchant oligarchy actively suppresses Thieves' Guild. Enforcement is genuine but incomplete. Thieves' Guild retreats and reorganises rather than disappearing.",
  "dmNote": null
 },
 {
  "pair": [
   "Thieves' Guild",
   "Military/Guard"
  ],
  "type": "competitive",
  "direction": "stable",
  "captureState": "adversarial",
  "narrative": "Military/Guard actively hunts Thieves' Guild. Arrests are real, enforcement is genuine. Thieves' Guild uses superior local knowledge and social embeddedness to absorb pressure and reconstitute."
 }
]
```
and its two structural seats, `npc.thieves_guild_kingpin_0` (`importance: 'pillar'`) and `npc.thieves_guild_lieutenant_1` (`'key'`), both with `linkedInstitutionIds: []`. The city holds six criminal institutions (`Thieves' guild chapter`, `Front businesses`, `Smuggling network`, `Rookery`, `Smuggling operation`, `Black market`), but nothing in the dossier says which of them the guild runs or where its power sits; `criminalCaptureState` is `adversarial`. The only faction-to-institution links ever observed are the simulator's `controlledInstitutions` after capture outcomes (§4).

**Trade links — `town-nb-1` (Novasaltus, town, 4,921 people), generated with Pianopagus as its trade partner:**

```json
[
 {
  "good": "Shipbuilding timber (coastal stands cleared)",
  "goodId": "timber",
  "direction": "import",
  "partner": "Pianopagus",
  "viaNeighbour": true
 },
 {
  "good": "Arcane reagents and energy (local ley node exhausted)",
  "goodId": "arcane_reagents",
  "direction": "import",
  "partner": "Pianopagus",
  "viaNeighbour": true
 },
 {
  "good": "Sea salt",
  "goodId": "salt",
  "direction": "export",
  "partner": "Pianopagus",
  "viaNeighbour": true
 },
 {
  "good": "Quality tools and weapons",
  "goodId": "category.military",
  "direction": "export",
  "partner": "Pianopagus",
  "viaNeighbour": true,
  "viaCategory": true
 }
]
```
These four records are the only partner-level trade data any output holds (0 in all 120 soak dossiers, which have no neighbour). `direction` is the direction of the flow (import or export), not a compass direction; `partner` is a NAME; there is no route, distance or gate.

## 6. PLACE — what a real dossier says spatially, and what it leaves to the map

Census over 153 fresh dossiers (the soak, the tier set, the culture towns, the sample cards; `SCR/place-census.txt`), plus the tick runs. Everything in 6.1 and 6.2 is CONFIRMED on these outputs; 6.3 is PLAUSIBLE.

### 6.1 What the dossier does say about place

1. **The site, as keys.** `config.terrain` / `terrainType` / `terrainOverride` (plains, riverside, coastal, hills, forest, mountain, desert), `config.tradeRouteAccess` (road, river, port, crossroads, isolated in these outputs; SettlementForge's golden matrix also pins `random_trade`, `mountain_pass`, `none`), `resourceAnalysis.terrain` (a display label), and the hinterland as deposit keys: `config.nearbyResources[]` with `…Native`, `…Depleted`, `…State` (e.g. `iron_deposits: 'depleted'`). An isolated settlement adds `isolationSupport.paths[]` typed `seasonal_access` (19 of 153), `local_foodshed` (18), `patronage` (11), `reserves` (9), `hinterland` (3).
2. **The gates, as a count in words.** `spatialLayout.tradeAccess` is one of five strings: "Single main road (two gates)" (65), "Coastal port (harbour and shipyards)" (24), "River access (water gate and docks)" (23), "Major crossroads (multiple gates)" (22), "Isolated (one gate, poor road)" (19). No gate position, no road direction.
3. **Walls, as institutions and flags.** A wall institution in `defenseProfile.institutions.walls[]` (0–2), `economicState.compound.inst.hasWalls` and `hasGates` (always equal, §3.4), `culturalIdentity.defensePattern` in prose.
4. **Quarters, as names with a location phrase.** `spatialLayout.quarters[] {name, location, desc, landmarks[]}`, 0–8 per settlement, 13 names seen: Religious Quarter (152), Government Quarter (74), Noxious Trades Quarter (57), Wealthy Residential (47), Common Residential (47), Shadows District (46), Mages' Quarter (41), Market Quarter (39), Waterfront District (24), Alehouse & Common (19), Fishing Landing (7), Woodcutters' Ground (4), Artisan Quarter (3). Each name carries ONE fixed location phrase (pairings checked: every name maps to a single phrase, except the Waterfront District, which reads "Along the river" or "Along the coast" by access): "Eastern district (traditional)" (the Religious Quarter, 152 of 152 — **the only compass statement in any structured field**), "Defensible high ground" (74), "Downstream/downwind" (57), "High ground, good views" (47), "Spread throughout" (47), "Old town or slums" (46), "Isolated area (safety concerns)" (41), "Central" (39), "Village centre" (19), "Along the coast" (13), "Along the river" (11), "At the water's edge" (7), "At the forest edge" (4), "Between market and residential" (3). `landmarks` are institution names or fixed strings (e.g. "Tannery Row", "Slaughterhouse", "Dyer's Bridge", "Barge Wharf"). A Market Quarter appears in every town (36 of 36), in no city (0 of 24) and in 3 of 23 metropolises, although every city holds market institutions (`Multiple market squares`, `Daily markets`); sf/model traced the quarter switch to a case-sensitive test for "Market".
5. **One layout sentence.** `spatialLayout.layout`, 42 distinct lines over 153 outputs, chosen by tier and terrain (e.g. "Walled town straddling the river, a fortified bridge at its commercial heart"; "Woodcutters' clearings ringed by dense tree cover").
6. **Built form by culture.** `culturalIdentity` (11 profile keys; `mediterranean` resolves to `latin`) states a morphology in prose — e.g. celtic "Older round or oval compounds sit among later rectangular halls, linked by lanes rather than a rigid grid" / "the settlement follows the contours of the land instead of a surveyed grid"; east_asian "A planned civic axis links gate, market, administrative compound, temple precinct, and waterworks"; greek "A fortified high precinct overlooks the market, theater, and workshops; where geography permits, it also overlooks a working harbor"; south_asian "occupational quarters cluster around shared water and market infrastructure"; steppe "A fortified trade station or river town acts as the settled hinge of a much wider mobile hinterland"; norse "Long halls, boat sheds, turf-roofed outbuildings, and timber yards face a landing or sheltered common". `architecturalDetail` varies within a profile (`latin` vs `mediterranean` towns got different details). This is the richest place statement a dossier makes, and it is prose.
7. **Institutions that are places.** Many catalog kinds are named as areas: `Multiple market squares` (47), `Inns and taverns (district)` (47), `Warehouse district` (47), `Apothecary district` (46), `Luxury goods quarter` (41), `Market square` (39), `Mercenary quarter` (35), `Brothel (red light district)` (34), `Sage's quarter` (33), `Furrier's district` (27), `Stable district` (26), `Dungeon delving supply district` (24), `Banking district` (21), `District markets (5-10)` (20), `Mages' district` (16), `Alchemist quarter` (14), `Red light district` (13), `Gambling district` (7) — a district-scale institution the map must turn into an area, not a building. Institution records also carry placement constraints as data: tags (`port`, `water`, `underground`, …), `forbiddenResources`, the `subterranean` facet, `tradeRouteRequired` / `forbiddenTradeRoutes`.
8. **Prose scenes.** `arrivalScene` mentions a built or landscape feature in 153 of 153 (gate 176 times, road 149, market 145, street or streets 106, walls 46, river 37, square 25, harbour 23, dock 10, ford 7, bridge 6) and a relative position in 29 of 153 (mostly "above"); `settlementReason` says why the place is where it is ("Sited at the water's edge because the river was the only road worth having …").
9. **After ticks:** `urbanFabric {drift, stocks {districtClass: 0–1}, scars [{kind, severity, week}], rebirths [{classes, type, week}]}` (district CLASSES, not districts), `calamityHistory[].targets` (institution names), ruined and impaired institutions, `traditions[]` whose festivals are staged in prose places ("long tables set in the square"), `resourceHistory` (hinterland depletion).

### 6.2 What it leaves to the map (absent from every output: 155 generated, 12 after ticks)

A key-name scan of all 167 output files (120 soak, 35 generated, 12 after ticks) for coordinate- or place-shaped keys (`x`, `y`, `cx`, `lat`, `position`, `bearing`, `distance`, `area`, `geometry`, `cell`, `cellId`, `adjacency`, `location`, `parcel`, `plot`, `building`, `household`, `street`, `road`, `route`, `gate`, …) matched exactly one key, `spatialLayout.quarters[].location` (629 times, all prose phrases). So: no coordinate of anything; no quarter geometry, area or adjacency; no assignment of an institution to a quarter (quarters list a few landmarks by name, institutions name no quarter); no street, road or square inside the settlement; no wall line, gate position or gate count beyond the words in `tradeAccess`; no river course, coast side, slope or high point beyond the prose; no plot, building, household or residence; no position for any NPC, faction seat or faction territory; no bearing or distance to any neighbour (`tradeLinks.direction` is import/export; `neighborRelationship.tradeRoute` is an access key); no size for an institution beyond a count range in its name; no fields, commons or roads in the countryside. The realm-level facts that could supply bearings (placement x/y and cell, the frozen spatial digest's territories and gate cells) are campaign state outside the dossier (sf/model §2, sf/seam §4). The hand-made sample shows the kind of facts generation never produces: neighbour distances with a direction ("two days, salt road", "half a day, upriver"), a named pass as the source of an import, a wind direction.

### 6.3 What this means for the map (PLAUSIBLE — for the mapping lane to test)

- The map derives all geometry itself; the dossier supplies a roster (institution kinds with count ranges, statuses), a site (terrain, access, resources), soft hints (quarter names with fixed location phrases, one layout sentence, culture built-form prose, arrival scene) and politics by name. The fixed location phrases are candidates for soft placement preferences (downwind for noxious trades, high ground for government and the wealthy, the water's edge for fishing), and "Eastern district (traditional)" is the one hint that names a compass side — whether it is a real rule or a placeholder is an owner question (§8).
- Because `spatialLayout` never changes in the simulator while institutions are ruined and district classes gain scars, the map's districts will have to follow the institutions and `urbanFabric`, not the quarter list, if they are to move with the weekly clock (item 67).

## 7. Differences: the samples, the fixtures and freshly generated outputs

| | Hand-made sample (`sampleDossier.json`) | Sample cards (`sampleSettlements.js`) | Fixtures (`tests/fixtures`) | Fresh generation (branch) |
|---|---|---|---|---|
| What it is | one teaching dossier, hand-curated | three generator configs with canonical seeds | hash goldens; minimal synthetic objects for one consumer; three April-2026 save bodies; realm packs | the product's output |
| Top-level keys | 23 | — (config only) | synthetic town: 11; save bodies: 5–17 | 41 (42 with custom content) |
| Size | 7,237 B | 12,333 B file | save bodies 116 B – 3,314 B | 44.6 – 261 KB minified |
| Institution identity | `id` (`garrison`, …), `size`, `weight` | — | synthetic: `catalogId: 'cat.<cat>.<k>'` or `localUid`; save bodies: `{name, category, desc}` | name + `catalogId` (kind key); no `id` in 5,846 records; `localUid` + definition ids for custom ones |
| People | 4 NPCs with `institutionId`, string secrets | — | synthetic: none; save bodies: 1–2 NPCs | 2–22 notables, relationships, NPC social factions, structural seats |
| Factions | top-level `factions` = power factions with `id`, `trend` | — | synthetic: `powerStructure {governance: 'council'}` (not a generated key) | `powerStructure.factions` (power) + top-level `factions` (NPC groups) |
| Place | distances with directions, a named pass, a wind | terrain word + config | synthetic quarters with compass locations (`north gate`, `east`, `west`, `hilltop`, `docks`) — not generated vocabulary; realm packs with cells and coordinates | terrain/access keys, 5 access phrases, 13 quarter names with 14 fixed location phrases, layout sentence, culture built-form prose |
| Vocabulary outside the generated sets | `tradeRouteAccess: 'salt road'`, stressors `famine_primed`, `corruption`, `prosperity {tier, label}` | `monsterThreat: 'heartland'` | `prosperity: 'Modest'`, `tradeRouteAccess: 'coastal'`, `defenseProfile.hasWalls` | — |
| Stays true to the product? | no (its comment says "Schema-compatible"; by script it is not) | yes, by construction (seed-hunted; regenerated here) | goldens yes (by hash); synthetic objects only for the fields their consumer reads | yes, byte-deterministic |

### 7.1 Fresh outputs versus the stale working tree (CONFIRMED by generating the same two configs from both)

- The working tree (`/Users/cstokes/Desktop/settlement-engine/src`, imported read-only) gives **37 top-level keys**; the branch gives 41 (the working tree lacks `isolationSupport`, `culturalIdentity`, `culturalNotes`, `generationCoherenceReceipt`).
- **The same seed and config give a different settlement.** `city-1` (`sfout-city-1`, mediterranean coastal port) is "Flachturm" with 45 institutions and 16 NPCs on the working tree, "Pianopagus" with 49 institutions and 18 NPCs on the branch (39 institution names shared) — the branch resolves the culture `mediterranean` to the profile `latin`, which changes names and rolls. `town-1` keeps its name (Berghafen) and count (59) but 11 institution names differ each way. Institution fields differ too (in these two dossiers): `facets`, `forbiddenResources`, `magicLicense`, `serviceKeys`, `nativeTier`, `coherenceRepair`, `exclusiveGroupCoexists` appear only on the branch; `terrainAccess` and `minTier` only on the working tree.
- The fixtures differ: 27 entries on disk against 72 plus two folders on the branch; the working-tree `townMapFixtures.js` lacks the v2 and landform corpora; `spatialPackFixtures.js` on disk equals the ledger HEAD's version, which predates the `capture` surface that `master` and the branch carry; `sampleSettlements.js` on disk has seeds `sample-*-v1` and Thornwell. Their mtimes (July 13 and 22) date the working tree.
- Consequence: any statement about "real dossier outputs" made from the on-disk tree describes an older product, down to the names of the settlements a seed produces.

### 7.2 First run versus this run

The 18 tier dossiers, the neighbour town, the custom-content town and the two working-tree dossiers of the first run (session 454522d3, 14:36–14:42) are byte-identical to this run's (`cmp`, 22 of 22). The first run's tick runs used different campaign ids and epochs, so their outcomes differ from §4's; they were not compared.

## 8. For the mapping lane and the owner

**What the outputs imply for interim code preparation (PLAUSIBLE — proposals, not decisions):**
1. **Keep real dossiers as our fixtures, with provenance.** SettlementForge stores no full generated dossier in its tests. PLAT's adapter tests would need their own small frozen set (e.g. one per tier plus a neighbour town, a custom-content town and a one-year-after town), each labelled with branch, commit, seed and config — and kept OUT of `research/` and `captures/`, whose JSON the doc checks read as corpus (memory `doc-checks-corpus-drift`).
2. **The input adapter must normalise what the outputs really do:** `stress`/`stressors` as null, object or array; institutions keyed by name with `catalogId` or `localUid` (no dossier of the 167 files checked holds two records of one `catalogId` or one name, so the pair is unique per dossier today; sf/seam's two-instances hazard would arise only if SettlementForge ever emitted repeats); count ranges parsed from names; `status` absent at generation and `impaired` / `ruined` (with `worldPulseFate`) later; NPC ids that change on succession; culture profile keys that differ from the config culture (`mediterranean` → `latin`); access and threat values seen only in samples or goldens (`heartland`, `mountain_pass`, `random_trade`, `none`, `salt road`).
3. **Whole-object updates.** The simulator returns the whole settlement every advance; the map has to compute the change itself (which institutions changed status, which NPC left, which quarter-class stock moved) to mutate with least disruption (item 22) on the weekly clock (item 67).
4. **A map-facing digest.** Of a 45–260 KB dossier the map needs a small part (roster, statuses, site keys, quarter hints, culture profile, power factions and their links, trade labels and links, conditions, `urbanFabric`); a pure extractor from dossier to that digest is the natural seam to write and test first.

**Open questions (owner or SettlementForge side):**
1. Which SettlementForge line is the contract — `fp/integration-2026-09-23` (used here), `master`, or later? The working tree does not only lack fields: the same seed yields a different settlement.
2. Is the fixed "Eastern district (traditional)" for every Religious Quarter a rule the map must honour, or a placeholder?
3. `spatialLayout` never changes under the simulator, while institutions are ruined and `urbanFabric` scars district classes. Which one is authoritative for the map's districts over time?
4. `controlledInstitutions` (catalogId-keyed, written by capture outcomes, absent at generation) is the only faction→institution link seen in any output, and two factions can claim the same kind at once. Is it the intended source for item 72's political term, and what does a shared claim mean on the map?
5. Should PLAT accept the hand-made sample shape at all (it is used on the landing page, not produced by generation)?

## Fable review (2026-09-27) — B-sf/outputs

**Verdict: CORRECTED** (Fable reviewer, lane fable-review/main/sf; the full review is `docs/fable-review/main/sf.md`).

**Re-derived and CONFIRMED** by an independent census (own code, `scratchpad/fable-review/mycensus.py`) over the same 155
dossiers and by the 16 tick files: top-level keys {41, 42}; 5 846 institution records, 0 with `id`, 0 with `status`, 695
without `catalogId`, every present `catalogId` the slug of its name; `hasWalls` = `hasGates` in 155 of 155 (104 / 51);
13 quarter names (Religious 154, Government 75, Noxious Trades 59, Wealthy and Common Residential 47 each, Shadows 46,
Mages' 42, Market 41, Waterfront 25, Alehouse & Common 19, Fishing Landing 7, Woodcutters' Ground 4, Artisan 3 — this
file's lower figures are its 153-dossier census), the Waterfront's two phrases, "Eastern district (traditional)" on
154 of 154 Religious Quarters, the Market Quarter in 38 of 38 towns and 0 of 24 cities (`generators/spatialGenerator.js:62`);
sizes per tier (minima and maxima exact; medians within the denominators' difference); the teaching sample is ONE blob
(`3bdfea45…`, 7 237 bytes, sha1 `965cdb47…`) on the branch, the ledger HEAD, `master` and disk, with 23 top-level keys;
after ticks `spatialLayout` byte-unchanged in 12 of 12, institution counts 49 / 59 / 29 unchanged, 3 `ruined` in the lit
city, 28 `controlledInstitutions` entries in 9 files, the world clock tick 1 / 13 / 52 = `calendar.elapsedWeeks` with
seasons spring / summer / spring, the populations 23 178 → 22 629 and → 17 827 and the prosperity moves as §4 states them.

**Corrections.** (a) §4 and §8 Q4: `controlledInstitutions` is NOT keyed by `catalogId`. The writer is
`domain/worldPulse/factionCompetition.js:155-166` — `stablePart(entry.id || entry.name || entry.label || …)` over the first
twelve roster positions (`.slice(0, 12)`), accreted at `:904`. The values coincided with catalogue ids in these runs because
at birth every `catalogId` equals the name's slug (5 151 of 5 151); a minted `id` or a cascade record without a
`catalogId` breaks the coincidence (verify V30; 27d item 74 (e)). (b) §6.3 (2)'s suggestion that the map's districts
"follow the institutions and `urbanFabric`" is overruled: `urbanFabric` is SettlementForge's own town-map memory and is on
the port's ignore-list (mapping row 25; the plan §2.6; 27d item 86); the districts follow the institutions, the conditions
and the quarter names as naming claims (mapping J-M1). (c) §8's open questions: Q1 owner Q1 of the plan; Q2 owner Q5
(recommendation: a placeholder — a soft east row at low weight); Q3 answered by (b); Q4 answered by (a) and item 72 (d5)'s
partition of a kind two powers hold; Q5 no — the adapter refuses the hand-made shape (`E_UNKNOWN_SHAPE`, the plan §3).
