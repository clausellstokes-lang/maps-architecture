# How a SettlementForge dossier is produced, and how it changes

> PENDING FABLE REVIEW — Opus-produced (sf/generation).

> RE-BASED 2026-09-27 (same lane, reopened after it landed at 14:31). The first pass read SF's on-disk working
> tree. The sibling lane sf/model then showed that working tree is not the current product (its `src/` matches no
> branch) and adopted `fp/integration-2026-09-23` @ `5d699cc68` (2026-09-24) as the baseline; sf/seam did the
> same. This file now uses that baseline too: every section keeps its working-tree text and gains "(branch)"
> deltas; where a (branch) statement disagrees with the text above it, the (branch) statement describes the
> current product. §1.6 records the method and §11 the claim-by-claim ledger. JUDGMENT: chose to re-base the
> landed file over returning it unchanged, because the Mapping lane reads all four surveys and the working-tree
> reading was materially stale on this lane's own subject (steps, event vocabulary, edit mode and decrees,
> presets, receipts) — say "veto" to restore the working-tree-only reading.

Lane `sf/generation`, 2026-09-27. Read-only survey of SettlementForge (SF) at
`/Users/cstokes/Desktop/settlement-engine`, checkout branch `review-fixes-2026-07-08`, HEAD `8ffe9479f`
(read with `git log`/`git branch` only). Every claim is labelled **CONFIRMED** (read on disk or executed) or
**PLAUSIBLE** (inferred). Nothing was written inside the SF tree (§1.4 records the proof).

## PROGRESS ledger

| # | item | state |
|---|---|---|
| 1 | read-coverage and scope decisions (§1) | done |
| 2 | inputs: seed, config, custom content, toggles, neighbour, world context (§2) | done |
| 3 | the generation pipeline in order, executed (§3) | done |
| 4 | determinism: seeding, streams, what reproduces (§4) | done |
| 5 | the three doors of change after birth: draft edits, events, decrees (§5) | done |
| 6 | the simulator: clock, tick, what changes and why, executed probes (§6) | done |
| 7 | how a change is recorded (§7) | done |
| 8 | what a map must subscribe to for items 22 and 67; interim code preparation (§8) | done |
| 9 | open questions (§9) and the evidence summary (§10) | done |
| 10 | RE-BASE (opened 2026-09-27 after landing): re-verify every section against `fp/integration-2026-09-23` @ `5d699cc68`, the baseline sf/model and sf/seam adopted when sf/model found the on-disk working tree stale; deltas as "(branch)" bullets, conclusions revised (§1.6, §2.7, §3.4, §4.5, §5.4, §6.6, §7, §8.7–§8.8, §9 Q9–Q11, §11) | done |

---

## §0 · In plain words (the outcome first)

1. **A dossier is born from a seed in 20 fixed steps.** The user's settings, their homebrew library, the
   on/off switches and (optionally) a neighbour go in; the same seed with the same inputs gives the same
   dossier byte for byte (executed twice, identical). The Azgaar/FMG world does **not** feed the settlement
   generator directly: the world reaches a settlement only through its settings (terrain, trade access) and,
   once a realm is canonized, through a frozen realm-scale "spatial digest" (territories, the gates between
   neighbouring territories, travel distances).
2. **After birth a dossier changes through three doors:** the DM's edits on a draft (renames, prose, section
   rerolls, full rerolls that keep the DM's recorded changes), **events** (40 typed changes on the working tree and 41 on the current product line — the first pass wrote 42, a miscount corrected by execution — such as "add
   institution", "plague", "shift tier"), and — designed, being built on other branches, not in this checkout —
   **decrees** (edits on a canonized town that wait for the next week and then apply as causes).
3. **The simulator's clock ticks one week at a time** (4-week months, 13-week seasons, 52-week years). An
   "advance a month" is four real one-week ticks. It only runs for **canonized settlements inside a campaign**.
   Each week it can move population, institutions (impaired, closed, rebuilt, ruined), the tier (town ↔
   village, with named fates for each institution), prosperity (a seven-step band), resources, who governs,
   crises, and trade. In a probe of three towns over 52 weeks with default settings, population, power and
   crises changed every week, institutions changed status 49 times, and tier changes waited as proposals for
   the DM; with "dramatic" settings a town fell to a hamlet within the year.
4. **SF does not send anyone a list of what changed.** A change arrives as a whole new dossier. Some changes
   leave a receipt (a timeline entry for canon events; short history lists with an outcome id for simulated
   changes; a campaign news feed), but there is no single change stream, no revision number, and several
   receipts carry no week number. A map that must mutate with least disruption (item 22) and show
   week-by-week building stages (item 67) therefore has to **diff two dossiers** until SF emits changes *(re-base:
   or for good — under the owner's rule item 20 (h) (iv) the map never asks SF for a change list, §8.7)*.
5. **What to do now in our code (without reconciling):** define our own `DossierChange` record and a pure
   dossier-diff adapter at the host door; key dossier elements by an identity adapter (SF institutions have
   **no id at birth**, and one record can stand for "5–15 craft guilds"); fix the clock contract (tick = one
   week, our Works durations in weeks); and write the mapping tables from SF's status words, tier fates and
   prosperity bands to our Works kinds and bands. §8 lists these in order.

**(branch) — the same five points on the current product line (`fp/integration-2026-09-23`); they supersede the
items above where they differ:**

1. Generation has **22 steps** (three new: a "world law" that decides eligibility once, a coherence repair pass,
   a final power-projection pass; the faith step is gone). The same seed still reproduces byte for byte **within
   one line**, but the same seed on the two lines gives two different dossiers (56 vs 59 institutions,
   prosperity "Comfortable" vs "Moderate") while both say `generatorVersion: '0.9.0'` — so a seed plus a version
   number does not name a dossier (CONFIRMED, executed). The FMG world is still not a generator input; the realm
   capture now also records where a settlement's declared terrain disagrees with its map cell, without rewriting
   it (CONFIRMED).
2. The decree door is **built**: a DM edit mode with a decree registry stored on the saved settlement
   (`settlement.decrees`), applied in order at the head of the next weekly tick and receipted as `decreeCauses`
   on that week's pulse record; and a "table ledger" through which the DM (or an AI clerk that may only propose)
   records what happened at the game table as typed canon events (CONFIRMED by reading; not executed).
3. The clock is unchanged (one-week tick, 4-4-5 calendar; executed). What changed is **which movers run**: a
   plain new campaign still gets the old defaults, but the "Realistic Regional" preset — which SF's own code says
   the instant-world composer and the realm dialog apply to new realms — now lights upswing, settlement
   lifecycle, disasters, resource dynamics, constructive flows, a provenance ledger and SF's own "urban fabric"
   map-memory layer (CONFIRMED by reading and executing the presets). In a lit 52-week probe a city rose two
   prosperity bands; under the Dramatic preset a town fell to a village and a village to a thorp within one year
   (CONFIRMED, executed).
4. Still **no change stream a consumer can subscribe to** and no revision counter, but more receipts: decree
   entries with `tickRef`, a recorded cause graph (lit presets), a founding stamp `foundedAt { year, tick }` on
   institutions the simulator founds, and a week (`tick`) on institution-lifecycle history entries; tier-change
   history still has no week. SF's operation manifest names every store operation's receipt but emits nothing
   yet, by its own stated decision (CONFIRMED).
5. Our interim steps stand (§8.6) with three additions (§8.8): read `decrees`/`decreeCauses` and `foundedAt` as
   change sources; never take SF's own map-side layers (`urbanFabric` on the dossier, the campaign's spatial
   substrate) as map inputs; and put the SF-line question and the overlap with SF's map-memory layer to the owner
   (§9 Q9–Q11).

---

## §1 · Coverage, method and scope decisions

### 1.1 Read in full (CONFIRMED)

- Pipeline: `src/generators/generateSettlementPipeline.js`, `src/generators/pipeline.js`,
  `src/generators/steps/index.js`, `steps/resolveConfig.js`, `steps/resolveResources.js`,
  `steps/assembleSettlement.js`, `steps/economyReconcilePass.js` (lines 79–164, its body).
- Kernel randomness: `src/kernel/prng.js`.
- Events: `src/domain/events/applyEvent.js`, `eventPipeline.js`, `mutate.js`, `registryFull.js` (lines 25–92,
  the rerun table), `src/domain/types.js`.
- Simulator: `src/domain/clock.js`, `worldPulse/index.js`, `worldPulse/advanceCampaignWorld.js`,
  `worldPulse/advanceInterval.js`, `worldPulse/reconcile.js`.
- Docs: `docs/GENERATION.md`, `docs/DESIGN_FMG_WEAVE.md`, `docs/DESIGN_SETTLEMENT_LIFECYCLE.md`,
  `docs/DESIGN_RESOURCE_DYNAMICS.md`, `docs/DESIGN_UPSWING.md`, `CLAUDE.md` (SF's).
- Maps side: `docs/AMENDMENTS-2026-09-27c.md` items 67 and 72; `docs/AMENDMENTS-2026-09-25b.md` items 20–27.

### 1.2 Read in part (CONFIRMED for the parts read; the rest only searched)

- Every other pipeline step: header comment plus the full `registerStep` metadata block (deps, reads, provides,
  mutates, scratch, phase) — `resolveStress`, `resolveNeighbour`, `assembleInstitutions`, `subsumptionPass`,
  `cascadePass`, `isolationPass`, `stressConfirmPass`, `generateEconomy`, `generatePower`, `neighbourFactions`,
  `factionCorrelationPass`, `structuralValidationPass`, `generatePopulation`, `corruptionPass`,
  `seedStartingPantheon`, `generateNarratives`. Their bodies were not read; their outputs were observed by
  execution (§3).
- `src/store/settlementSlice.js` (2,337 lines): lines 160–199, 805–1014 (generateSettlement), 1142–1226
  (regenSection), 1680–1919 (applyEvent), 498–577 (commitPendingEdits), 2262–2292 (applyMapEdit); the rest
  searched by grep.
- `worldPulse/pulseKernel.js` (2,482 lines): lines 1–120, 150–479, 1130–1330, 1596–1626, 2415–2482; the stage
  order by grep of every stage call.
- `worldPulse/applyWorldPulse.js` 1–80 and 440–562; `worldState.js` 1–60 and 205–350;
  `populationDynamics.js` 1–80 and 256–475; `tierResourceDynamics.js` 1–192; `tierOutcomeApply.js` 1–30 and
  100–260; `institutionLifecycle.js` 1–70 and 780–900; `upswingKernel.js` 1–60 and 880–925;
  `calamityKernel.js` 1–40; `stressorsCore.js` 34–45 plus the catalog keys; `simulationRules.js` 36–96.
- `domain/pendingEdits.js` 1–60, `userEdits.js` 1–70, `regenerationDelta.js` 1–80, `regenerationMode.js`
  1–60, `events/undoEvent.js` 1–45, `events/drainQueuedEvents.js` 1–50, `worldPulse/chronicle.js` 1–80,
  `dailyLife.js` 1–50, `simulationSpine.js` 1–50, `timeProgression.js` 1–110 plus its function index,
  `normalizeSettlement.js` 90–140, `entities/status.js` (status constants), `events/mutateEntities.js`
  50–243 and 918–953, `lib/dependencyEngine.js` 60–110, `store/campaignPulseHelpers.js` 28–160,
  `store/campaignAdvanceSession.js` 1–60, `store/campaignSpatialCanonize.js` 1–60,
  `domain/spatial/spatialDigest.js` 1–80 plus its output fields by grep.
- `docs/DESIGN_EDIT_MODE_AND_DECREES.md`: lines 1–334 read; 335–456 searched (headings and build-state lines).
- `DESIGN_STRESSOR_DYNAMICS.md` (SF root): lines 1–6 and 103–220 read; headings of the rest.
- `docs/TEMPORAL_AUDIT.md`: lines 1–25 and headings.
- `docs/DESIGN_MAP_MODULE_SPLIT.md`: §0–§2 (lines 1–37) read; interface/integration lines found by grep.

### 1.3 Scope decisions (recorded as the brief requires)

| file | decision | why |
|---|---|---|
| `src/generators/spatialGenerator.js` | IN — header + a grep of its quarter names and return shape | its subject is the dossier's own `spatialLayout` (named quarters as text: name, location, description, landmarks); it produces dossier content, not a drawing |
| `src/domain/districtProfile.js`, `src/domain/mapProfile.js` | IN — first 40 lines only | pure derivations over the dossier (districts' wealth/safety/dominant faction; a declared map↔simulator interface), not drawing programs |
| `src/domain/townMap/townMapModel.js` | INPUT SIDE ONLY — header, signature (`buildTownMapModel(settlement, mapEdits)`), imports, the first lines of its body | the brief allows the legacy entry point's input adapter; drawing not read |
| `src/domain/townMap/institutionAssignment.js`, `anchors.js`, `mapEdits.js` | OUT (names seen in the import list only) | SF map program internals |
| `docs/DESIGN_SETTLEMENT_MAP.md`, `DESIGN_ILLUSTRATED_TOWN.md`, `map-corpus/`, `GENERATION-SPEC.md`, `MORPHOLOGY-PLAN.md` | OUT, not opened | brief's exclusion |
| `docs/ARCH_EDIT_MODE_AND_DECREES.md`, `DESIGN_UPSWING_RELATIONSHIP_FLOWS.md`, `DESIGN_MOMENTUM.md`, `DESIGN_PACING_GOVERNOR.md`, `world-pulse-roadmap.md`, `src/data/sampleDossier.json`, `tests/fixtures/**`, `sim-report.json` | NOT READ (time) | the design doc for decrees was read instead of its architecture twin; dossier shape was observed by executing generation (§3.3) rather than from the samples, which the data-model lane covers |

### 1.4 Execution, and the proof that nothing was written into SF (CONFIRMED)

Three node scripts in this lane's scratch folder imported SF modules by absolute path
(`/private/tmp/claude-502/…/scratchpad/sf/gen1.mjs`, `probe2.mjs`, `probe3.mjs`, run with `NODE_ENV=test`).
Before and after each run: the modification times of the SF root, `src`, `src/generators`, `src/domain` and
`node_modules` were listed and compared (`MTIMES UNCHANGED` all three times), and
`find <SF> -newer <marker>` (excluding `node_modules`, `.claude`, `.git`) returned nothing. Outputs:
`gen1-out.json`, `dossier-town-probe1.json`, `dossier-town-probe1-after-events.json`, `probe2-out.json`,
`probe2-pulse-result.json`, `probe3-out.json` in the scratch folder.

### 1.5 A checkout caveat (CONFIRMED)

This checkout is SF's ledger branch. Its `src/domain/townMap/` has 5 files, it has no
`lib/spatialSubstrateDerive.js` and no instant-world composer (`composeInstantWorld`, `worldPlan`), and it has
no `src/domain/edit/` (edit mode). `git log --all` shows edit-mode commits on other branches (for example
`accaba7d35` "EM-B1b: the seven OFF-STAGE ops land …", 2026-09-22). So the build branch differs; everything
below describes this checkout unless marked.

### 1.6 Re-base on the current product line (CONFIRMED)

- **Baseline.** `fp/integration-2026-09-23` @ `5d699cc68` (2026-09-24 16:33), still its tip at re-base time
  (read-only `git log`); the only newer commit on any ref is `fp/in-6` (`7411afbead`, a news-vocabulary change
  branched from it, not this lane's subject). Its `src/` had already been exported by sf/model into
  `scratchpad/sf/tree/` with `git show` (node_modules symlinked to SF's, read-only).
- **Export verified.** For every source file this lane cites, `git show <branch>:<path>` was compared byte for
  byte with the exported copy: equal for all 75 cited source files present on the branch (the 76th, the removed
  faith step, is absent there) (`scratchpad/sf/gen-rebase/compare-out.tsv`).
- **What differs.** Of the 86 files the first pass read, 11 are identical on both lines, 72 differ and 3 are
  absent from the branch: `steps/seedStartingPantheon.js` (removed), `docs/DESIGN_FMG_WEAVE.md` and
  `docs/DESIGN_MAP_MODULE_SPLIT.md`. The two docs exist only on SF's ledger branch (added there by `943e7d674d`
  and `19610662dc`, restored by `cb174fc4ab`; never on the product lines — `git log --diff-filter=A`), so they
  remain the design record and this file's reading of them stands. The differences are large exactly where this
  lane's subject lives: the generation entry grew from 173 to 717 lines, the simulation rules from 549 to 1593,
  the advance session from 680 to 1558, the pulse kernel from 2482 to 3007.
- **Read on the branch** (in full unless a range is given): `steps/buildGenerationContext.js`;
  `generationContext.js` 1–90; `generateSettlementPipeline.js` 1–224 and its function index; `kernel/prng.js`;
  the diffs of `pipeline.js`, `clock.js`, `registryFull.js`, `eventPipeline.js`, `undoEvent.js`, `applyEvent.js`,
  `worldSnapshot.js`, `advanceCampaignWorld.js`, `regenerationDelta.js` (added lines) and four SF docs
  (`GENERATION.md`, `DESIGN_SETTLEMENT_LIFECYCLE.md`, `DESIGN_EDIT_MODE_AND_DECREES.md`, `CLAUDE.md`);
  `simulationRules.js` 1–40, 692–800 and 863–905 plus its export index; `pendingEdits.js` 1–104;
  `store/operationRegistry.js` 1–86 plus all 160 `OPERATIONS` rows (parsed by script); `store/editSlice.js` 1–80
  plus its decree lines; `store/settlementSlice.js` 894–935 and a scan of 1082–1450;
  `store/settlementRederiveAction.js` 1–40; `worldPulse/decreeHook.js` 1–120; `edit/registry.js` 1–67 plus its
  export index; `edit/operations.js` `OP_TYPES` (parsed); `edit/recordRegister.js` (grep); `edit/dmLayer.js`
  1–30; `worldPulse/pulseKernel.js` 257–272, 362–440, 1925–1960, 2961–3007 and its `@pulse-stage` markers;
  `advanceInterval.js` 380–470 and its exports; `tierResourceDynamics.js` 118–138 and 596–612; the caps in
  `worldState.js` (grep); the outcome fields of `applyWorldPulse.js` (grep); `spatialDigest.js` 484–500 and
  855–900; the `campaignSpatialCanonize.js` diff (grep); and the headers (first 20–75 lines) of
  `provenanceKernel.js`, `advanceEpochLedger.js`, `tableLedger.js`, `treasury.js`, `satellitesLedger.js`,
  `institutionFounding.js`, `dossier/chronicleFeed.js`, `dossier/settlementWorldChronicle.js`,
  `lib/instantWorld/composeInstantWorld.js` and `domain/instantWorld/worldPlan.js`.
- **Scope decisions on the branch** (the brief's first-40-lines rule): `worldPulse/urbanFabricKernel.js` — OUT
  beyond its header, because its subject is SF's own town map's "memory" ("the growth layer for STONE … Map =
  projection(dossier + fabric)"), i.e. SF's map program; only the key it writes on the dossier was observed, by
  execution. `worldPulse/spatialConsequenceKernel.js` — OUT beyond its header, because it consumes a substrate
  derived from SF's own town layout (`lib/spatialSubstrateDerive.js`, not opened). `domain/institutionFounding.js`
  — header only (an `MF-` charter leaf); its stamp is dossier data and is reported. `domain/resourceSites.js`,
  `townCartography/`, `townScene/`, `interior/`, `drawOpsSvg.js` — not opened (map programs by name).
  `store/outbox.js`, `simulationSpine.js`, `dailyLife.js` — not read (the spine and daily life are derived
  read-models, §8.6 rule 7; the outbox was not needed).
- **Executed on the branch copy** (node imports from `scratchpad/sf/tree/`, `NODE_ENV=test`): `b1-genrebase.mjs`
  (step order, same-seed identity, the probe town, the event vocabulary, the presets); `b2-genrebase.mjs` in four
  modes (seven events on the probe town; 52 weekly ticks under the plain defaults; 52 weekly ticks under the lit
  Realistic Regional preset; one `one_year` advance under Dramatic Campaign); `presets.mjs` (both lines'
  presets); `wt-check.mjs` (the working tree's event count and defaults). Before and after each of the five runs
  the modification times of SF's root, `src`, `src/generators`, `src/domain` and `node_modules` were compared
  (`MTIMES UNCHANGED` five times) and `find <SF> -newer <marker>` (excluding `node_modules`, `.claude`, `.git`)
  returned nothing. Outputs are in `scratchpad/sf/gen-rebase/`.
- **Git use, disclosed.** The re-base ran only `git log` and `git show` against SF (read-only). The first pass's
  header records that it also used `git branch` (a read-only listing, outside the brief's log/show/ls-files set).

---

## §2 · Inputs

`generateSettlementPipeline(config, importedNeighbour, { seed, customContent, onStep, onComplete })`
(CONFIRMED, `generateSettlementPipeline.js:43`). Its only caller in the app is the store's
`generateSettlement` (CONFIRMED by grep: `store/settlementSlice.js` is the sole importer besides the module
itself). GENERATION.md's law 0.2: "The Forge's inputs are exactly four: the config, the custom content
snapshot, the toggles, and … the imported neighbor" — plus the seed.

### 2.1 The seed

- `options.seed || config._seed || generateSeed()`; `generateSeed()` is `Date.now().toString(36)` plus six
  `Math.random` characters — "the ONE place non-determinism enters" (CONFIRMED, `prng.js`).
- The store passes `seedOverride || eng.generateSeed()` and records it as `lastSeed` (CONFIRMED,
  `settlementSlice.js:886,974`). The dossier stores it as `_seed`; the dossier `id` is minted from it
  (`s_…`, via `normalizeSettlement`'s `idFromSeed`) (CONFIRMED by execution: `_seed: plat-sf-probe-1`,
  `id: s_9296d86fa969b198`).

### 2.2 The config (the user's choices)

- Raw wizard settings: `settType` (thorp … metropolis, `random`, `custom` with `population`),
  `tradeRouteAccess` (`road`, `river`, `crossroads`, `port`, `isolated`, `random_trade`), `terrainOverride`
  (`auto` or a terrain), `culture` (11 keys or `random_culture`), `monsterThreat`, five priority sliders
  (`priorityEconomy/Military/Religion/Criminal/Magic`), `magicExists`, stress choices, `customName`,
  `faith`, resource choices (`nearbyResourcesRandom`, `nearbyResourcesState`, `nearbyResources`) (CONFIRMED,
  `resolveConfig.js`, `resolveResources.js`).
- The store adds the four toggle maps as `_institutionToggles`, `_categoryToggles`, `_goodsToggles`,
  `_servicesToggles`, plus `_randomizePriorities` and `_importedNeighbor` (CONFIRMED, `settlementSlice.js:871–882`).
- Two copies land in the dossier: `config` = the RESOLVED snapshot (random choices rolled, derived keys such as
  `tier`, `terrainType`, `magicLevel`, `stressTypes`, `latentPantheon`) and `_config` = the RAW input with its
  `random` sentinels. Regeneration reads `_config`, never `config`, so emergent facts never re-enter as user
  intent (CONFIRMED, `assembleSettlement.js:110–122`; `DERIVED_CONFIG_KEYS`, `settlementSlice.js:177`).

### 2.3 Custom content (the homebrew library)

- The store passes `eligibleCustomContent(customContent, { tier })` (tier-gated) or `{}` when the user turned
  custom content off (CONFIRMED, `settlementSlice.js:905–907`). The pipeline reads it through
  `withCustomContent(…)` → `customDeps.registry().listCustom('resources' | 'services' | …)` (CONFIRMED,
  `dependencyEngine.js:79`, `resolveResources.js:157`, `economyReconcilePass.js`).
- Custom entries are injected tier-gated; "essential"/"critical" ones always, the rest on a 30 % roll, iterated
  in codepoint name order so adding homebrew never scrambles unrelated rolls; they are tinted as custom in the
  dossier (`nearbyResourcesCustom`, `source: 'custom'`) (CONFIRMED, same files).
- The **library itself is not stored in the dossier** (CONFIRMED: the resolved `config` keys observed carry no
  library snapshot or hash). Consequence (PLAUSIBLE): a regeneration after the library changed can differ
  from the first birth even with the same seed.
- GENERATION.md §5, the facet law: custom institutions carry facets (clandestine, subterranean, mercenary …)
  resolved declared → inferred → kind-default, and every mechanism must consult facets, not names
  (CONFIRMED as design text). This is the seam our item 63 (clandestine) and item 64/65 (underground) read.

### 2.4 Toggles and the neighbour

- Toggles decide which catalogue entries, categories, goods and services may appear (CONFIRMED,
  `resolveConfig.js:70–74`). A layer switched off draws no randomness (GENERATION.md, the dormancy law).
- `importedNeighbour` is an already-generated settlement; it biases economy and factions and fills
  `neighborRelationship` (CONFIRMED, `resolveNeighbour`, `neighbourFactions`, `assembleSettlement.js:80–86`).
  A guard throws if an options bag is passed in its slot (CONFIRMED, lines 52–60).

### 2.5 The Azgaar / FMG world context — how the fusion actually reaches a settlement

- **Not a pipeline input.** No generation step reads FMG data (CONFIRMED: no FMG/pack/digest reference in
  `src/generators`; the pipeline's inputs are listed above).
- **At generation, the world is the settings**: terrain and trade access are closed vocabularies chosen in the
  wizard or rolled; with terrain on `auto` and an explicit route, terrain is derived from the route
  (CONFIRMED, `resolveConfig.js:94–142, 207–224`).
- **At realm canonization**, the store captures the FMG map's cells from the live world-map iframe
  (`captureSpatialPack`: per-cell height, biome, river id, centroid `[x, y]`, neighbours) and the placements
  `[{ id: saveId, cellId }]`, and builds a FROZEN `spatialDigest` stored at
  `campaign.worldState.spatialDigest` (CONFIRMED, `store/campaignSpatialCanonize.js`,
  `domain/spatial/spatialDigest.js`). The digest holds: `territory` (per cell → nearest settlement), `tiers`
  (primary/secondary/tertiary neighbours), `distanceMatrix`, **`gates`** (`{ between: [a, b], cellA, cellB,
  cost }` — the cheapest crossing between two neighbouring territories), `routeReceipts` (per primary hop, cost
  by terrain class), a cost field and version stamps (CONFIRMED, `spatialDigest.js:340–509`).
- The digest holds **cell ids, not coordinates**; coordinates live in the captured pack / saved FMG map
  (CONFIRMED for the digest's fields; DESIGN_FMG_WEAVE D10: "the digest cannot serve it — no coordinates
  persist").
- The designed "terrain agreement" check (WEAVE S3) compares the FMG cell's terrain with the settlement's
  `terrainType` and **never rewrites** the settlement (CONFIRMED as design text; not built in this checkout —
  PLAUSIBLE from the grep finding nothing).
- **What this means for item 72's "direction trade comes from"**: SF can, in principle, say which neighbours a
  settlement trades with (the campaign's regional graph `trade_route` channels, `tradeFlow` tallies) and
  through which realm gate cell; the **bearing** of each partner from the town needs the pack's centroids,
  which are not in the dossier today (PLAUSIBLE). The settlement's own `tradeRouteAccess` (one word) and
  `economicState.tradeAccess`, `primaryExports/Imports`, `tradeDependencies`, `transit`, `isEntrepot` are in
  the dossier (CONFIRMED by execution).

### 2.6 The DM's recorded changes, re-applied at every regeneration

Events write small "authored records" into BOTH `config` and `_config`, and generation re-applies them after
its rolls with ZERO random draws, so a regeneration keeps what the DM's events did (CONFIRMED,
`resolveResources.js:42–56,180–235`; `assembleSettlement.js:237–245`; `undoEvent.js` header):
`resourceEdits` (added/removed/depleted/recovered), `customTradeGoods`, `stressorEdits`, `eventConditions`,
`_cutRoutes`. World- and party-authored conditions survive a local regeneration through
`preserveWorldConditions` (CONFIRMED, `worldPulse/reconcile.js`). The legacy map's own cosmetic overlay lives
on the settlement as `settlement.mapEdits` (CONFIRMED, `applyMapEdit`, `settlementSlice.js:2271–2292`) — a
precedent for item 20 (d)'s "opaque map artifact".

### 2.7 (branch) deltas — inputs on the current product line

- **Seed.** Same law (`options.seed || config._seed || generateSeed()`); a new guard throws when a `seed` key is
  put in the config bag (CONFIRMED, `generateSettlementPipeline.js:77–137`). Minted seeds gain a three-character
  per-millisecond sequence and WebCrypto entropy (CONFIRMED, `prng.js`) — the shape of new seeds only; no stream
  moves.
- **New options.** `contentTunables` (registered defaults from the active custom-content environment; invalid
  values reject the run before any draw), `explicitConfigFields` (which config fields were the user's own choice),
  `contentProvenance`, and `pins` (§3.4, §5.4) (CONFIRMED, the function's doc block). The config's new keys
  (content profile and boundaries, culture profile key, native resources, route intent …) are listed by sf/model
  and not repeated here.
- **Custom content is now receipted.** When the run had custom content the dossier gains
  `customContentProvenance` (the reviewed environment and optional campaign binding in scope) and, on worlds whose
  config carries living-content law 2, `customContentRoster` — both written after every draw ("recording, not
  adoption") (CONFIRMED, `generateSettlementPipeline.js:147–190`; the receipt's inner fields were not read). This
  narrows §2.3: a receipt of which library was in scope is now stored; that it identifies rather than contains the
  library is PLAUSIBLE.
- **The FMG world is still not a generator input**: no file under `src/generators` names FMG, a digest, a realm
  placement or a world plan (CONFIRMED, grep on the branch). Two additions around it:
  - the **instant world** (`lib/instantWorld/composeInstantWorld.js`, store op `instantWorld`): seed + three knobs
    → a plan → settlements minted by the same pipeline at seeded sites → wrapped as canon saves and placed on the
    map → connections discovered → a campaign assembled with a tone preset; the FMG geometry travels only as a map
    plan (seed + template) and materializes when the realm map opens; the realm's spatial canon stays unfrozen
    (CONFIRMED, the module's header);
  - the **spatial digest** gains a capture receipt: `terrainDisagreements` (every settlement whose declared
    `terrainType` contradicts the cell it sits on — recorded, never rewritten: the weave's S3 check, built as a
    receipt), `cellResolution`, and an optional `kmScale`; biome, climate and lake sub-digests exist dark
    (CONFIRMED, `spatialDigest.js:484–500, 855–900`). The digest still holds cell ids, not coordinates.
- **Authored records.** Beside §2.6's list, the branch's undo scrubs `_userRoutes` (from CREATE_ROUTE),
  `_refugeeWaves`, `_raidHistory`, `_forcedRelief` and `_offeredCredit` from `config`/`_config` (CONFIRMED,
  `undoEvent.js` diff). Correction to §2.6's mechanism: no file under `src/generators` names `_cutRoutes` on either
  line (CONFIRMED, grep); generation re-applies `resourceEdits`, `stressorEdits`, `eventConditions` and
  `customTradeGoods`, while `_cutRoutes` survives a regeneration by riding in the carried config (PLAUSIBLE).
- **The DM's layer.** `dmLayer` and `decrees` are registered AUTHORED record keys with named writers in
  `store/editSlice.js` (CONFIRMED, `edit/recordRegister.js:42, 99–133`).

---

## §3 · The generation pipeline, in order

### 3.1 The machine (CONFIRMED, `pipeline.js`)

- Steps register `{ deps, reads, provides, mutates, scratch, phase }`; the runner orders them topologically by
  `deps` and runs each once, merging its returned patch into a shared context.
- Each step gets its own random stream `rng.fork(stepName)`, set as the ambient stream for the step's
  sub-generators; the ambient stream is restored after (fail-closed: an unseeded draw during generation
  throws — GENERATION.md law 0.1).
- A strict mode (off in production) asserts each step wrote only what it declared.
- There is **no partial re-run engine**: "Edits re-run the WHOLE pipeline with the same seed" (the step-level
  partial re-run was retired) (CONFIRMED, lines 5–13, 123–134).

### 3.2 The twenty steps (order CONFIRMED by executing `getStepOrder()`; roles from each step's header and metadata)

| # | step | provides (and mutates) | what it decides |
|---|---|---|---|
| 1 | resolveConfig | tier, population, tradeRoute, terrainType, resolvedTerrain, culture, magicLevel, threat, noMagic, townPlus, effectiveConfig, the toggle maps | tier (or from population), population (rolled in the tier's range), terrain, trade route, culture, threat, magic; floors a plagued town's military priority |
| 2 | resolveResources | nearbyResources, …Depleted, …Custom (mutates effectiveConfig) | terrain-legal resources, tier-weighted depletion, custom resources, then the DM's `resourceEdits` overlay |
| 3 | resolveStress | stress, stressTypes | generation-time crises (before institutions exist) |
| 4 | resolveNeighbour | neighbourProfile, neighbourEconBias, neighbourFacBias, rawNeighbour | the imported neighbour's influence |
| 5 | assembleInstitutions | institutions, catalogForTier | institutions rolled from the catalogue by tier, terrain, resources, route, neighbour; forced/required entries |
| 6 | subsumptionPass | (mutates institutions) | a greater institution absorbs a lesser (a banking district absorbs money changers) |
| 7 | cascadePass | (mutates institutions) | boosts chain-adjacent institutions; re-runs subsumption |
| 8 | isolationPass | stress (mutates institutions, effectiveConfig) | isolated towns: teleport infrastructure, subsistence stripping |
| 9 | stressConfirmPass | stress, stressTypes | re-weighs rolled crises against the real roster (walls suppress sieges, granaries famine); never adds, never drops user-forced crises |
| 10 | generateEconomy | economicState (provisional) | chains, income, exports/imports, prosperity band |
| 11 | generatePower | powerStructure | government, power factions with power shares, legitimacy |
| 12 | neighbourFactions | (mutates powerStructure) | mirror/opposition factions from the neighbour |
| 13 | factionCorrelationPass | (mutates institutions) | a dominant faction may pull one signature institution onto the roster |
| 14 | economyReconcilePass | economicState, **spatialLayout**, availableServices | re-derives the economy on the FINAL roster (a damped one-pass fixpoint), demand imports, the named quarters, services, supply-chain receipts |
| 15 | structuralValidationPass | structural | coherence receipt on the final roster |
| 16 | generatePopulation | npcs, relationships, factions, conflicts | the named cast and their groups |
| 17 | corruptionPass | (mutates npcs, factions) | who is born corrupt (only if a criminal institution exists; zero draws otherwise) |
| 18 | seedStartingPantheon | (mutates effectiveConfig) | the LATENT pantheon, identical for every account tier; activation is a later, draw-free step in the store |
| 19 | generateNarratives | settlementReason, resourceAnalysis, economicViability, history | the reason to exist, the resource story, the history timeline |
| 20 | assembleSettlement | settlement (mutates powerStructure, stress) | the name, the assembled record, pressure sentence, arrival scene, defence profile, the legitimacy patch, coherence enrichment of the cast, structural NPCs per faction, the trace; then `normalizeSettlement` → promote crises into `activeConditions` → re-apply event conditions |

GENERATION.md speaks of "roughly twenty-one steps"; the executed order has 20 (CONFIRMED).

After the pipeline, still at birth, the **store** (not the pipeline) (CONFIRMED, `settlementSlice.js:929–1005`):
carries world/party conditions over on a reroll of an unsaved draft (`reconcileSettlementChange`), activates
the latent pantheon for entitled accounts (`activateFaithIfEntitled`), derives the four-dimension
`systemState`, and resets the lifecycle: `phase: 'draft'`, empty `eventLog`, `generatedAt`.

### 3.3 What comes out — the facts a map depends on (CONFIRMED by execution, seed `plat-sf-probe-1`, a river town)

- 37 top-level keys: `name, tier, population, institutions, structuralViolations, structuralSuggestions,
  neighborRelationship, economicState, spatialLayout, availableServices, powerStructure, settlementReason,
  npcs, relationships, factions, conflicts, resourceAnalysis, economicViability, history, stress, stressors,
  config, _config, pressureSentence, arrivalScene, defenseProfile, prominentRelationship, coherenceNotes,
  simulationTrace, _seed, simulationVersion (1), generatorVersion ('0.9.0'), id, activeConditions,
  aiOverlays, userCanon, schemaVersion (1)`.
- **Institutions carry no `id` and no `status` at birth** (0 of 56 had `id`); they carry `name`, `catalogId`
  (e.g. `merchant_guilds_3_8`), `category`, `tags`, `required`, `source`, `tier`, `exclusiveGroup`,
  `terrainAccess`, cascade marks. Ids appear only later: events mint `institution.<slug>` and simulated builds
  mint `institution.<stablePart(name)>`. A missing status reads as active; the first status write sets e.g.
  `impaired` (observed as "NEW→impaired" in the weekly probe).
- **One record can stand for many buildings**: names such as `Craft guilds (5-15)`, `Taverns (5-20)`,
  `Parish churches (2-5)`, `Inn (multiple)` — a count RANGE, not a count.
- NPCs carry ids (`npc_1`, `npc_2`, …) with `role`, `institution`, `factionAffiliation`, `power`,
  `influence`, `structuralRank`.
- Power factions are keyed by NAME (`faction`), with `category`, `power`, `rawPower`, `isGoverning`,
  `powerLabel`; the top-level `factions` are NPC groups linked to them.
- `spatialLayout` = `{ layout: <one sentence>, quarters: [{ name, location, desc, landmarks[] }],
  tradeAccess }` — e.g. five quarters (Market, Religious, Noxious Trades "Downstream/downwind", Waterfront,
  Government "Defensible high ground") and "River access (water gate and docks)". Quarters are chosen by
  name-substring tests on the institution list (CONFIRMED, `spatialGenerator.js`).
- `economicState.prosperity` is a band label on a seven-step ladder: `Subsistence, Struggling, Poor,
  Moderate, Comfortable, Prosperous, Wealthy` (CONFIRMED, `data/constants.js:47`).

### 3.4 (branch) deltas — the pipeline on the current product line (CONFIRMED by execution unless marked)

- **22 steps**, in executed order: `resolveConfig, buildGenerationContext, resolveResources, resolveStress,
  resolveNeighbour, assembleInstitutions, subsumptionPass, cascadePass, isolationPass, stressConfirmPass,
  generateEconomy, generatePower, neighbourFactions, factionCorrelationPass, coherenceRepairPass,
  economyReconcilePass, powerEconomyReconcilePass, structuralValidationPass, generatePopulation, corruptionPass,
  generateNarratives, assembleSettlement` (sf/model lists the same 22 names in a different order; the order here is
  what `getStepOrder()` returns, and it matches the import order in `steps/index.js`). New: `buildGenerationContext` (an immutable "world law" that
  decides eligibility once — does magic function, may maritime-only institutions appear — from config, tier,
  route, terrain, culture and content profile; no randomness and no world data; read in full);
  `coherenceRepairPass` (its repairs are recorded in `generationCoherenceReceipt.repairs`; SF's edit-mode design's
  re-derivation findings say it also writes `institutions` — CONFIRMED as design text, body not read); `powerEconomyReconcilePass` (replays the
  political intent once against the final economy and stamps `economyInputFingerprint`; assembly fails closed if
  the fingerprint disagrees — CONFIRMED as GENERATION.md's branch text). Gone: `seedStartingPantheon` —
  generation writes no faith record (sf/model, CONFIRMED there).
- **41 top-level keys**: §3.3's 37 plus `isolationSupport`, `culturalIdentity`, `culturalNotes`,
  `generationCoherenceReceipt` (its keys: `version, status, seed, worldLawVersion, cultureProfile, contentProfile,
  checks, judgments, repairs, authoredTensions`).
- **The probe town** (same seed and config as §3.3): the same name (`Rundhausen`), tier, population (4694) and id
  (`s_9296d86fa969b198`); **59** institutions (not 56), **0** with `id`, **0** with `status`; the same collective
  count-range records (11, e.g. `Craft guilds (5-15)`, `Taverns (5-20)`, `Parish churches (2-5)`, `Multiple water
  sources`); the same `spatialLayout` shape (the waterfront's location now reads "Along the river"); prosperity
  **`Moderate`** where the working tree gave **`Comfortable`**; `generatorVersion` `'0.9.0'` on both lines.
- **The machine** gains a pinned mode: `runPipeline(…, { pins })`, pins keyed by RECORD PATH (`npcs`,
  `relationships`, `factions`, …); a step whose choosers are pinned takes the held values and does not draw; every
  step still runs; a partial pin is an error; pins are deep-cloned on entry (CONFIRMED, `pipeline.js` diff). Edit
  mode re-derives a record this way with the DM's chosen facts held (§5.4). There is still no partial re-run
  engine.
- The store's generation moved to `store/settlementGenerateAction.js` (`generateSettlementAction(set, get,
  seedOverride, …)`), registered as op `generateSettlement` with receipt `pipelineHistory` (CONFIRMED,
  `operationRegistry.js`); its post-pipeline body was not re-read.

---

## §4 · Determinism: what reproduces, what does not

### 4.1 The mechanism (CONFIRMED)

- `createPRNG(seed)` wraps `seedrandom`; `fork(label)` = `createPRNG(`${seed}::${label}`)` — a child stream
  derived from the seed STRING and a name, not from stream position, so reordering steps changes nobody's
  draws (`prng.js`).
- Generation: one fork per step name; loops that feed draws iterate in codepoint order; overlays draw
  nothing; a dormant layer draws nothing (GENERATION.md; the files read).
- Trace timestamps use a counter, not the clock (`_traceClock`).
- Executed: two generations with the same seed and config produced byte-identical JSON (`sameSeedIdentical:
  true`).

### 4.2 What reproduces

- Same seed + same raw config + same toggles + same neighbour + same custom-content snapshot → the same
  dossier (CONFIRMED for the case run; GENERATION.md states it as the product promise).
- Section rerolls (`regenNPCsPipeline`, `regenHistoryPipeline`) mint a FRESH seed unless one is passed and
  return it as `_regenSeed` (CONFIRMED, lines 107–172). Whether the store persists `_regenSeed` was not
  traced (the regenSection body read does not store it — PLAUSIBLE that a section reroll is not replayable).
- The simulator: each weekly tick seeds `createPRNG(`${worldState.rngSeed}::tick:${n}::${interval}`)`, with
  `rngSeed = 'world-pulse:<campaign id or name>'`, and every mover forks by a named key; `now` must be pinned
  (a test throws otherwise) (CONFIRMED, `pulseKernel.js:270`, `worldState.js:211–215`, `clock.js`).
  Therefore a campaign replays exactly from the same starting world, saves and DM decisions.
- The legacy town map derives its own stream from the dossier: `${_seed}::town-map:v1` (CONFIRMED,
  `townMapModel.js`, input side).

### 4.3 What does not reproduce, or reproduces only with extra inputs

- No seed given → a fresh time-based seed (by design).
- The custom-content library is not in the dossier (§2.3).
- A dossier's CURRENT state is path-dependent: it is the birth plus an ordered history of edits, events and
  weekly ticks; the dossier does not carry that history in full (§7). Two paths to "the same" dossier need not
  be byte-equal (PLAUSIBLE, and the same stance as our item 22 (c)).
- Designed and measured on the build branch: pinned re-derivation of a record does not reproduce the record
  (6 of 63 in a recon), so the edit-mode design ruled "the consequence of an edit is the difference between two
  re-derivations" (a three-way merge) (CONFIRMED as design text, `DESIGN_EDIT_MODE_AND_DECREES.md` §21–§22).

### 4.4 What this means for us (PLAUSIBLE, program's reading)

Our map should seed from the dossier's `_seed` with our own label (the same idiom SF's own legacy map uses)
and must never draw from SF's streams; it must not assume that re-generating SF from the seed gives the
current dossier — it must take the dossier it is handed.

### 4.5 (branch) deltas

- The fork law is unchanged (`fork(label)` = ``createPRNG(`${seed}::${label}`)``; changing it is "owner-gated under
  THE PROMISE") (CONFIRMED, `prng.js`). Same seed and inputs → a byte-identical dossier on the branch (CONFIRMED,
  executed).
- **Across product lines the same seed does not give the same dossier** (the probe town: 56 vs 59 institutions,
  `Comfortable` vs `Moderate`; 17 of the 37 shared top-level keys identical), and `generatorVersion` did not change
  (CONFIRMED, executed). §4.4's rule is therefore stronger than it reads: the map must never reconstruct a dossier
  from `(_seed, generatorVersion)`.
- A new **advance-epoch** stream segment (`epochSuffix` → `::epoch:<e>`, ledger `spatialLedgers.advanceEpoch`)
  lets a re-advance after an undo draw a fresh future; it is behind `advanceEpochEnabled`, dormant in every preset
  (CONFIRMED, `prng.js`, `advanceEpochLedger.js` header, the dormant-key list executed). While it is dormant a
  campaign replays exactly as §4.2 says.
- Instant worlds carry a **plan-law version** (`PLAN_LAW_VERSION = 2`; a version-1 share code replays under law 1
  forever) (CONFIRMED, `worldPlan.js` header): SF versions world-derivation laws explicitly there, not in the
  dossier.

---

## §5 · After birth: the three doors of change

### 5.1 Draft edits (a settlement not yet canonized) (CONFIRMED unless marked)

- **Phase.** A generated settlement starts in `phase: 'draft'`; `canonize()` sets `phase: 'canon'`, clears the
  event log and stamps `canonizedAt`; `uncanonize()` returns it to draft and discards the log
  (`settlementSlice.js:1506–1558`).
- **The pending-edits queue** ("Change Dock"): declared kinds `rename-npc, rename-faction, rename-settlement,
  add/remove-institution, add/remove-resource, add/remove-stressor, edit-prose`, but only the committable
  subset has a dispatcher — `commitPendingEdits` handles `rename-npc` and `rename-settlement`; the queue refuses
  kinds without a committer (`pendingEdits.js`; `settlementSlice.js:498–577`). A commit records a version
  snapshot.
- **Prose edits**: `_userEdits` on the entity (`{ value, originalValue, editedAt }` per dotted path) plus
  `_authored: true`, which the canon tagger turns into "locked" (`userEdits.js`). Prose only; structural fields
  are not editable through this door.
- **Locks**: `{ identity, geography, factions[], institutions[], npcs[] }` consulted before rerolls
  (`types.js`).
- **Section reroll** (`regenSection('npcs' | 'history')`, draft only): a fresh seed, then
  `deriveRegenerationDelta(before, after)` — direct effects, ripple effects, capacity and daily-life shifts, and
  an entity-catalogue set diff (preserved / new / removed) (`settlementSlice.js:1142–1222`,
  `regenerationDelta.js`).
- **Full reroll** from `_config` with the same seed keeps the authored overlays of §2.6. Regeneration modes
  `nudge | rebalance | reforge` build a preservation plan (hard anchors `_seed, id, name, tier`, versions)
  (`regenerationMode.js`). Whether the store's full-reroll path applies these modes was not traced (searched).
- **Version timeline**: snapshots of the whole settlement, capped at 50 per save (`MAX_VERSION_HISTORY`,
  `settlementSliceHelpers.js:28`).
- **Events on a draft** apply immediately and change the settlement the same way as on canon, but write **no
  timeline entry** (`settlementSlice.js:1836–1842`).

### 5.2 Events — the typed change vocabulary (CONFIRMED)

**The vocabulary (40 types on the working tree, `events/registry.js` — counted by executing `EVENT_TYPES`; the first pass wrote 42, a miscount; 41 on the branch, §5.4):** institutions — ADD, REMOVE, DAMAGE, IMPAIR, RESTORE;
resources — DEPLETE, RECOVERED, ADD, REMOVE; trade — CUT_TRADE_ROUTE, OPENED_TRADE_ROUTE, ADD/REMOVE_TRADE_GOOD;
neighbours — SETTLEMENT_DISPUTE, BROKERED_ALLIANCE; people — ADD_NPC, KILL_NPC, ASSIGN_NPC_TO_ROLE, KILL_LEADER,
PROMOTE_NPC, DEMOTE_NPC; factions — IMPAIR/RESTORE/ADD_FACTION, EXPOSE/IMPOSE_CORRUPTION, CHANGE_RULING_POWER;
crises — APPLY_STRESSOR, RESOLVE_STRESSOR, PLAGUE, REFUGEE_WAVE, RAID_OR_MONSTER_ATTACK, REMOVED_THREAT,
STARTED_RIOT; faith — SET_PRIMARY_DEITY, IMPOSE_CULT; scale — SHIFT_TIER (one step up or down),
DESTROY_SETTLEMENT; generosity — FORCE_RELIEF, OFFER_CREDIT.

**An event**: `{ id, type, targetId, payload, cause: 'authoring' | 'player_action' | 'world_event',
inWorldDate?, description? }`; `targetId` is resolved by name (for example `institution.granary`)
(`types.js:94–102`).

**One flow for preview and apply** (`eventPipeline.js`): validate → clone-and-mutate through a per-type handler
(`mutate.js` → `mutateEntities.js` / `mutateWorld.js`) → re-derive the four-dimension system state → add the
registry's authored deltas → re-derive the 14-variable causal state → compute both delta lists → faction
relationship deltas and faction responses → one narrative line. A handler may **veto** (for example
`institution_not_found`, `tier_at_bound`): nothing commits, nothing logs.

**Where the event goes** (`settlementSlice.js:1701–1919`):
- canon settlement bound to a canonized campaign → the event is **queued** in
  `campaign.worldState.pendingEvents` (cap 400) and resolves at the next weekly tick, before the simulation,
  simultaneously with every other member's queued events (`drainQueuedEvents.js`; `isSettlementClockBound`,
  `campaignSlice.js:676`);
- otherwise → applied now; `reconcileSettlementChange` re-attaches world conditions; canon settlements append a
  log entry; the save is persisted; the event then **ripples** into the campaign (regional propagation, the
  crisis twin, party impact).

**What each probed event changed** (CONFIRMED by execution on the probe town, `probe2-out.json`):

| event | top-level keys changed | entity stamps written |
|---|---|---|
| ADD_INSTITUTION `institution.Granary` | institutions | new `{ id: 'institution.granary', status: 'active', createdByEventId }` |
| DAMAGE_INSTITUTION (0.8) | institutions, powerStructure, config, _config, activeConditions | `status: 'impaired'`, `impairments: [{ type: 'capacity', severity, causeEventId }]`; a food-anchor loss condition |
| REMOVE_INSTITUTION | institutions, powerStructure | `status: 'removed'`, `removedByEventId`; propagated `wealth` impairments on linked institutions |
| SHIFT_TIER (promotion) | tier, population, institutions, config, tierHistory, institutionHistory | the new tier's required institutions added with ids and `requiredForTier`; `tierHistory` entry with `institutionFates` |
| PLAGUE (0.7) | institutions, config, _config, activeConditions | healers impaired ("Overrun by plague casualties") |
| CHANGE_RULING_POWER | powerStructure, config, _config, activeConditions | the governing seat moves ("Military/Guard took power … by coup") |

A removed institution **stays in the list** with a status (soft removal), which is what lets a map keep its
building as a vacant or ruined plot. Other status words: `destroyed` (the typedef), `vacant` (the typedef),
and the simulator's `remnant` and `ruined` (§6.3).

**The rerun table**: `RERUN_KEYS_FOR_EVENT` names, per event type, the subsystems it touches (for example
ADD_INSTITUTION → institutions, services, activeChains, foodSecurity, economicState, narrative; SHIFT_TIER →
institutions, demand, foodSecurity, economicState, powerStructure, narrative) — descriptive metadata for the
composer, not a re-run engine (`registryFull.js:41–91`). A map can use it as a coarse "what to re-read" hint.

**Undo**: `undoLastEvent` restores the system state from the log entry, strips everything the event wrote with
its event id (impairments, condition causes, stress entries, destruction stamps), and restores the authored
records from the snapshot `logEntry.undo` (observed keys: `settlement` for ADD, REMOVE, SHIFT_TIER and
CHANGE_RULING_POWER; `config` too for SHIFT_TIER) (`undoEvent.js` header; probe).

### 5.3 Decrees and edit mode — designed, being built elsewhere (CONFIRMED as design text; code not in this checkout)

`DESIGN_EDIT_MODE_AND_DECREES.md` (2026-09-19, amended to 2026-09-21) — the owner's single door for changing a
saved settlement:
- **Draft → corrections apply on save; canon → every pooled fact becomes an EVENT (a "decree") applied at the
  next advance**, in the DM's order, as a first-class cause with a chronicle line (§2.6). Names and annotations
  apply on save even on canon (§20.2), except that a rename on canon was later ruled a decree (2026-09-21
  amendment).
- **The decree registry** is persisted on the saved settlement: `decrees: [{ id, op, status: pending | applied
  | withdrawn, addedBy: dm | guard | surveyor, orderIndex, orderedAt, appliedAt?, tickRef?, chronicleRef?,
  overrode?, withdrawnReason? }]`; an entry may carry `when` (a tick or a season) (§2.5, §11, §20.3).
- **The DM's layer** `dmLayer` records which fields are the DM's (`roots` keyed `<cardType>:<entityId>:<field>`,
  `worldFacts` by config key); it is applied ON WRITE, so every reader sees one record (§12.5, §14).
- **Edit at the source, never at a derivation**; five kinds of fact (world facts, roots, derived, annotation,
  minted `dm:` entities); an edit re-derives with the record's chosen facts held (§14), realized as a three-way
  merge of two re-derivations (§22).
- **Entity states** (§15): NPC status ∈ active, exiled, jailed, dead, missing, retired, removed; institution
  state ∈ active, impaired, ruined, destroyed, vacant, removed — "destruction is a state; removal is erasure";
  one writer `set-institution-state` shared by the DM and the simulator.
- **Directives** pin the simulator's own registered decisions ("let the siege fall", "the coup fails") rather
  than writing outcomes (§16–§19).
- **Spatial edits are out of scope**: "the town map's own tools emit the same ops when they arrive" (§11,
  §10's extension points).
- Build state: git history shows the op catalogue and off-stage ops landing dark on train branches
  (2026-09-22); none of it is in this checkout (§1.5).

### 5.4 (branch) deltas — the doors on the current product line

**Draft edits.** The queue's committable kinds grow from 2 to 13: `rename-npc, rename-faction, rename-settlement,
edit-npc, reassign-npc, stasis-npc, return-npc, ransom-npc, rescue-npc, champion-npc, table-event, recall-npc,
edit-prose`; adding or removing institutions, resources and stressors is still not a queue kind (it goes through
events or edit mode) (CONFIRMED, `pendingEdits.js:22–100`). `canonize` now restores the event log from an in-session
tombstone after an accidental uncanonize; otherwise the lifecycle is §5.1's (CONFIRMED, `settlementSlice.js:894–935`).
The version-history cap stays 50 (`settlementSliceHelpers.js:57`). The regeneration delta now also reports the DM's
own fields (roots and world facts from `dmLayer`) (CONFIRMED, diff).

**Events.** 41 types — the working tree's 40 plus `CREATE_ROUTE` (a user-chartered realm route; writes
`_userRoutes` and a `neighbourNetwork` link) (CONFIRMED, executed). The flow (validate → mutate → re-derive → log →
ripple) and the queue for clock-bound canon settlements are unchanged (CONFIRMED, `settlementSlice.js:1082–1300`
scan; the `eventPipeline.js` diff is a banding fix). The seven-event probe on the branch wrote the same keys and
stamps as §5.2's table, and `IMPAIR_INSTITUTION` wrote `status: 'impaired'` with `impairments[{ type: 'capacity',
severity, causeEventId }]`; a DM tier shift's outcome id is `dm_shift_tier:<settlement id>:town>city` (no week) and
the institutions it adds carry `createdByWorldPulseOutcomeId` and `requiredForTier` (CONFIRMED, executed,
`b2-out-events.json`). The rerun table moved to `registryRerunKeys.js` (re-exported; still descriptive only). The
session **table ledger** (`domain/tableLedger.js`) turns what happened at the game table into typed, bounded,
existing canon events (incident → a flavour line; structure-harm → IMPAIR_INSTITUTION; structure-restored →
RESTORE_INSTITUTION; supply-loss → DEPLETE_RESOURCE; …); an AI clerk may only propose and the DM confirms; it rides
the `table-event` queue kind (CONFIRMED, header). The store's **operation manifest** (`store/operationRegistry.js`)
lists all 160 state-changing store operations with their receipt source and undo — e.g. `applyEvent` →
`eventLog-entry`, `advanceCampaignWorld` → `pulse-record`, `commitPendingEdits` → `versionHistory-snapshot`,
`canonizeCampaignWorldSpatial` → `spatialDigest` (irreversible) — but "this wave adds no runtime emission"
(CONFIRMED, header and parsed rows).

**Edit mode and decrees — built.** `store/editSlice.js` (lazy-loaded) has three editor modes (`off`, `plain`,
`decree`): plain edits write the draft through the DM layer; decree mode stages, reorders, withdraws, reopens and
applies entries of the **decree registry**, stored on the saved settlement as `settlement.decrees` (CONFIRMED). An
entry: `{ id, op, status: pending|applied|withdrawn, addedBy: dm|guard|surveyor, orderIndex, orderedAt, when?: {
tick?, season? }, appliedAt?, tickRef?, chronicleRef?, overrode?, followsFrom?, surveyorCredit?, withdrawnReason? }`
(CONFIRMED, `edit/registry.js:54–66`). The op catalogue has 21 types: 14 home ops (`add-faction, add-institution,
add-npc, found-phantom, promote-phantom, rebalance-power, remove-faction, remove-institution, remove-npc, set-field,
set-institution-state, set-npc-status, set-power-holder, set-relationship`) and 7 off-stage ops (`close-trade,
declare-war, make-peace, open-trade, recall-force, resolve-outcome, send-force`) (CONFIRMED by parsing the home rows;
the off-stage names PLAUSIBLE, from the file's own comments). **The simulator applies due decrees first in each
weekly tick**, before any draw, in the registry's order; it marks them applied and writes one receipt per decree on
that week's pulse record — `decreeCauses[{ decreeId, saveId, opType, cause: 'table', tickRef, orderIndex, target?,
offStage?, consequence?, overrode?, followsFrom? }]`, present only when non-empty (CONFIRMED, `decreeHook.js` header,
`pulseKernel.js:362–407, 1950`). At this build "a cause is a receipt": the world effect of each verb is bound verb by
verb by later members (EM-E4 to EM-E7), and a decree whose verb is not yet bound still lands as a cause (CONFIRMED,
header). A re-derivation seat (`store/settlementRederiveAction.js` → `dmLayer.rederive`) re-runs generation with the
DM's facts pinned (CONFIRMED, header). What a given decree changes in a dossier was not executed in this lane.

---

## §6 · The simulator

### 6.1 The clock (CONFIRMED)

- **The tick is one week.** "The temporal constitution fixes tick = 1 week and year = 52 weeks"
  (`worldState.js:16–27`). Intervals: `one_week 1, one_month 4, one_season 13, one_year 52` weeks
  (`INTERVAL_WEEKS`). The display calendar is a 4-4-5 grid: twelve months over 52 weeks, four 13-week seasons
  (spring first), labels derived from integer `calendar.elapsedWeeks` (never accumulated) (`worldState.js`,
  `TEMPORAL_AUDIT.md`).
- **An advance is N real weekly ticks.** `simulateCampaignWorldInterval` runs the one-week kernel
  `simulateCampaignWorldPulse` N times, feeding each tick's output into the next; it only commits on the last
  tick; it collapses the pulse-history ring to ONE record per advance; with auto-resolve off it pauses at the
  first tick that raises a "major" (war, coup, tier change …) for the DM and resumes by re-running that tick
  from its saved inputs (`advanceInterval.js`). A catch-up may run an arbitrary whole number of weeks.
- **Who ticks.** Only saves that are members of a campaign AND canon (`phase === 'canon'` or `canonizedAt`)
  enter the world snapshot (`worldSnapshot.js:76–82`, `campaign/canon.js:38`). A standalone settlement does
  not tick. (`timeProgression.advanceTime` exists as a pure per-settlement step — faction deltas and escalation
  clocks — and is called INSIDE the kernel for each member.)
- **Undo of time**: `undoLastPulse` restores a pre-advance snapshot, session only, ten deep
  (`campaignAdvanceSession.js:57`; `campaignWorldPulseSlice.js:15`).

### 6.2 What one weekly tick does, in order (CONFIRMED from the kernel's stage calls; details PLAUSIBLE from names and headers)

1. Tick +1, calendar +1 week; seed the week's stream; expire stale held proposals.
2. Ensure/prune/relax the per-NPC, per-faction and per-relationship states (mean reversion toward baseline).
3. Corruption onset and exposure; seat NPCs into factions; faction capture; foreign corruption web and
   settlement politics (behind flags).
4. Age the roaming crises (19 catalogue types with stages `emerging, active, peaking, easing, resolved,
   residual, dormant`); coup verdicts.
5. Per settlement: `advanceTime`, the granary (surplus fills, deficit draws down, sieges and famines cut),
   seasons (behind a flag), blockade impairment of transport; institution reform; replace ousted NPCs.
6. Supply, entrepôts, migration arrivals, mobilization, the war layer, trade war, occupations, religion
   (most behind flags; the war layer is off by default).
7. Candidates: tier/resource drift, resource discovery/removal, settlement lifecycle, institution lifecycle,
   moral/martial institution pressure and founding, population dynamics, and the rule-driven world events;
   then ONE central seeded roll (`rollCandidates`, at most 7 auto-applied and 5 proposals per tick, scaled by
   volatility and the tempo governor).
8. Apply the selected outcomes to settlements and the world (`applyWorldPulseOutcomes`) — "minors" apply; with
   `majorChangesRequireProposal` (the default) a major becomes a PROPOSAL awaiting the DM.
9. Pantheon, martial readiness, conquest feeds, mercenaries, tolerance, cause lifecycle; realm events; rumours,
   beliefs, information war, supply-web warfare, moral drift, embattlement, migration dispatch, armies, navies,
   pestilence, **calamity**, generosity, intervention, **upswing**, **settlement lifecycle**, treaties, war and
   peace reasons, momentum.
10. Append the week's `pulseRecord` to `worldState.pulseHistory` (ring of 80) and return.

The kernel returns `{ tick, calendar, worldState, regionalGraph, wizardNews, settlementUpdates:
[{ saveId, settlement }], candidates, selected, rollExplanations, autoApplied, proposals, resolvedStressors,
majors, deferredMajors, pulseRecord }` (CONFIRMED, `pulseKernel.js:2446–2481`; executed).

### 6.3 How the things a map draws change, and why (CONFIRMED unless marked)

**The outcome payload fields** a settlement can receive in one tick (`applyOutcomeToSettlement`,
`applyWorldPulse.js:474–562`): `populationDeltas`, `foodStockpileDeltas`, `tierChange`, `resourcePatch`,
`resourceMembership`, `lifecyclePatch`, `institutionPatch`, `powerTransfer`, `deityReembed`, `condition`; plus
`npcPatch`, `factionPatch` for people and factions.

| what changes | how often, and why | what is written |
|---|---|---|
| **Population** | every week a settlement can gain or lose people. The rate follows a stability score from six pressures (food 0.26, disease 0.20, conflict 0.22, trade 0.14, legitimacy 0.12, crime 0.06) and condition signals (migration influx +, famine −, plague −, war −, occupation/war drain −, recovery +), capped per interval; heavy loss becomes mass emigration that moves people to other settlements, conserved (`populationDynamics.js:262–390`) | `population`, `populationHistory` (last 12: `{ tick, delta, population, reason, outcomeId }`) |
| **Tier** | a promotion needs population ≥ 92 % of the next tier's floor AND support ≥ 0.62 held for a streak; a demotion follows population below 82 % of the tier's floor, or support ≤ 0.25, or below-floor with support < 0.45; the chance grows with the streak; by default a tier change is a PROPOSAL for the DM (`tierResourceDynamics.js:56–190`). SHIFT_TIER (DM) uses the same applier | `tier`, `config.tier/settType`, `institutions` (promotion: required institutions added or remnants reactivated; demotion: over-tier institutions become `remnant` or `removed` with a FATE — `reduced_to_watch_post`, `abandoned`, `privatized`, `survives_as_remnant`, `downsized`, `captured_by_local_powers`, `hollowed_out`), population raised to the new floor on promotion, `tierHistory` (last 12: `{ fromTier, toTier, direction, outcomeId, institutionFates[] }`) (`tierOutcomeApply.js`) |
| **Institutions (economy)** | a settlement whose economy stays healthy for a streak may BUILD the missing supply-chain step (a mine for a smithy with ore; works for a mine); a stably distressed one may CLOSE its least essential institution (export anchors close last; required, criminal and essential never) (`institutionLifecycle.js` header) | new `{ id, name, category, status: 'active', _worldPulseEconomyBuilt, createdByWorldPulseOutcomeId, builtReason }`; closure → `status: 'remnant'`, `worldPulseFate`, `closedByWorldPulseOutcomeId`, `remnantReason`; reopen → `status: 'active'`, `reopenedByWorldPulseOutcomeId`; `institutionHistory` (last 24: `{ name, category, fate, tier, outcomeId, reason }`) |
| **Institutions (other)** | impairments from events, corruption, sieges, plague; moral/martial abolition and founding by a patron deity (behind faith); a calamity sets `status: 'ruined'`; reconstruction completes with an institution UPGRADE (behind the upswing flag) | `impairments[]` with `causeEventId`, `status` (`impaired`, `remnant`, `ruined`, `removed`, `destroyed`) |
| **Prosperity** | a band step on the seven-step ladder. Writers found: the upswing mover (boom +, bust retreat), the generosity mover (a purchase debits the buyer's band, nudges the seller's), the entrepôt toll (a bounded lift) — all behind flags. No event handler writes prosperity (searched `mutateWorld.js`, `mutateEntities.js`) | `economicState.prosperity` (a label, or an object with `tier`) (`upswingKernel.js:889–915`) |
| **Resources** | depletion and recovery by pressure and taxonomy (renewable/nonrenewable/magical), a DM proposal by default; organic discovery from the terrain's latent pool and removal of a long-depleted nonrenewable (behind `resourceDynamicsEnabled`) (DESIGN_RESOURCE_DYNAMICS) | `config.nearbyResources*`, `config.resourceEdits` (so it survives regeneration), a surgical re-derivation of `economicState.activeChains`/`primaryExports`, `resourceHistory`, a `resource_strike` or `vein_exhausted` condition |
| **Power and factions** | per-faction states relax, compete and are captured by corrupt seat-holders; coups resolve into a `powerTransfer`; conquest installs an occupation authority (war layer) | `powerStructure.factions`, `governingName`, legitimacy; `activeConditions` |
| **Crises** | three layers that do not share vocabulary: generation-time `stress` (static), the campaign's roaming stressors (19 types, staged), and `activeConditions` — only conditions bite the causal scores (DESIGN_STRESSOR_DYNAMICS §0) | `activeConditions[]` `{ id, archetype, severity, status, triggeredAt: { tick, sourceEventType }, duration }` |
| **Trade** | the campaign's regional graph (channels such as `trade_route`, `war_front`, `trade_dependency`), trade wars, and — behind the commodity-flow opt-in — goods stocks, entrepôt centrality and a windowed `tradeFlow` tally `{ in, out }` per settlement, which is display-only ("never writes economicState — the generation baseline is sacred") (`worldState.js:305–340`) | mostly campaign ledgers, not the dossier |
| **Birth, death, ruin** | behind `settlementLifecycleEnabled`: town+ parents seed satellite thorps (growth, a resource strike, refugees); a thorp that dwelled in terminal decline may die — a relic ruin only if its `peakTier` ≥ city, else an abandoned site; a remnant may be resettled on the same cell (DESIGN_SETTLEMENT_LIFECYCLE) | `lifecyclePatch`; "institutions clear"; satellites in `spatialLedgers.satellites` |
| **Calamity** | behind `disastersEnabled`: one seeded draw per settlement per year (about one strike per 15 years realm-wide), picks institutions to demote/collapse/destroy, kills and displaces an aggregate share, names the disaster (`calamityKernel.js`) | institution `status: 'ruined'`, `calamityHistory`, conditions |
| **Upswing** | behind `upswingArcsEnabled`: reconstruction after a calamity or siege (progress from prosperity, builders, ally credit, peace; regresses on new shocks); boom → bust on trade throughput; flourishing (DESIGN_UPSWING) | conditions `reconstruction`, `boom`, `bust`; prosperity band steps; an institution upgrade at completion |

The flag defaults (`DEFAULT_SIMULATION_RULES`, `simulationRules.js:36–96`): population, migration, trade flows,
resource drift, tier drift, institution lifecycle, stressors, NPC agency, faction competition — ON; the war
layer, strategy, faith spread, attrition, war-economy drain — OFF; resource dynamics, lifecycle, upswing,
calamity — absent (off). `majorChangesRequireProposal: true`.

### 6.4 What a year looks like — two executed probes (CONFIRMED by execution; three probe settlements: a river town, a road village, a port city; no regional links between them)

**Default rules, 52 separate weekly ticks** (`probe3-out.json`): settlement records came back changed on
`population` 111 times, `powerStructure` 156, `activeConditions` 156, `npcs` 57, `economicState` 33,
`institutions` 35 (49 institution status changes, mostly `impaired`, one `remnant`), `history` 3; **no tier
changed** (they waited as proposals); **no prosperity band changed**; populations fell by 817, 176 and 197
over the year (−17 %, −23 %, −2 %).

**"Dramatic" intensity with proposals off, one `one_year` advance** (`probe2-out.json`): 485 outcomes
auto-applied; the town went town → village (week 15) → hamlet, the village went village → hamlet → thorp, the
city lost resources to depletion; `institutionHistory` shows demotion fates (`hollowed_out`, `privatized`).

Reading (PLAUSIBLE): the default simulator changes a settlement's people, power and crises every week and its
institutions' condition often, while its scale moves rarely and only with the DM's consent; under aggressive
settings decline can be fast. A map that shows item 67's building stages will mostly be showing
impairment/repair and decline stages unless the upswing and lifecycle movers are switched on.

### 6.5 Where simulated changes are recorded (CONFIRMED)

- Each changed settlement comes back WHOLE in `settlementUpdates`; the store writes it into the save,
  re-derives the system state and sets `campaignState.worldPulse = { lastTick, lastInterval, updatedAt }`
  (`campaignPulseHelpers.js:90–160, 47–58`).
- Organic changes do **not** enter the settlement's `eventLog` (that log holds DM events only).
- Receipts: the capped history lists of §6.3 (with `outcomeId`, and `tick` on population entries only),
  entity stamps (`createdByWorldPulseOutcomeId`, `demotedByWorldPulseOutcomeId`,
  `removedByWorldPulseOutcomeId`, `closedByWorldPulseOutcomeId`, `reopenedByWorldPulseOutcomeId`), condition
  provenance (`triggeredAt.sourceEventType` such as `WORLD_PULSE_PRESSURE`, `ORGANIC_CORRUPTION_EXPOSURE`),
  the campaign news feed `wizardNews.entries[]` `{ id, tick, scope, significance, headline, summary, kind:
  applied | queued, impactKind, settlementIds[], sourceEventId, tags, reasons }`, the pending
  `worldState.proposals` (cap 80), and one `pulseRecord` per advance.
- Outcome ids embed their week: `candidate.population.decline.save1.50`, `candidate.tier.demotion.save1.15`
  (observed). `tierHistory` and `institutionHistory` entries carry no `tick` field (observed), so their week
  is recoverable only from the id's suffix (PLAUSIBLE as a stable convention; not a declared contract).
- Over a multi-week advance, `settlementUpdates` are merged last-write-wins, so only the END state of each
  settlement is returned; the interior weeks survive only in those receipts (`advanceInterval.js:153–166,
  353–355`).

### 6.6 (branch) deltas — the simulator on the current product line

- **Clock: unchanged.** `INTERVAL_WEEKS` = `{ one_week: 1, one_month: 4, one_season: 13, one_year: 52 }`
  (executed); the 4-4-5 calendar on integer `elapsedWeeks`; caps unchanged (`MAX_HISTORY` 80, `MAX_PROPOSALS` 80,
  `MAX_PENDING` 400, pulse undo 10) (CONFIRMED). New: a **catch-up** may run any whole number of weeks up to
  `CATCH_UP_CAP_WEEKS = 26` (for worlds whose progression is autonomous; `worldProgression: 'dm_advanced'` is the
  default) (CONFIRMED, `simulationRules.js:1388`, `advanceInterval.js:408–434`); an interval advance accepts an
  **`onTickObservation`** callback — "audit-only", called after every weekly tick with that week's raw news receipts
  (executed: 52 calls in a one-year advance) (CONFIRMED).
- **Who ticks: unchanged** (canon members only, `isCanonSave`); NPCs in stasis or held hostage are left out of the
  snapshot the movers read (CONFIRMED, `worldSnapshot.js` diff).
- **The tick's stages are now named** (`@pulse-stage` markers): `bootstrap, actor_memory, condition_aging,
  settlement_clock, mover_planes, candidate_selection, permission_and_apply, consequence_fold, finalize_receipt`,
  with the decree head at the very start (CONFIRMED, grep; the working tree has no markers). The kernel's return adds
  `memberBirths` (whole new member saves; that the settlement-lifecycle mover produces them is PLAUSIBLE, not
  traced) and `tempoDeferred`, each only when non-empty (CONFIRMED, `pulseKernel.js:2961–3007`).
- **Rules: unchanged where §6.3 states them** — the population stability weights, the tier thresholds (92 % and
  0.62 up; 82 %, 0.25 and 0.45 down) and the outcome payload fields of `applyOutcomeToSettlement` (CONFIRMED, grep
  on both lines). One new, dark rule: with `demographicsEnabled` (lit in no preset) promotion needs 100 % of the next
  tier's floor and the promotion population mint is removed (CONFIRMED, `tierResourceDynamics.js:127–137, 598–611`).
- **New institution receipts.** Closures carry fate words such as `bankrupt`, `closed_for_want_of_custom` and
  `shuttered` beside §6.3's demotion fates (CONFIRMED, executed). Institution-lifecycle entries in
  `institutionHistory` carry **`tick` and `year`**; tier-change fate entries and `tierHistory` entries still carry
  **no week** (the outcome id's suffix, e.g. `candidate.tier.demotion.save1.32`, is the only week) (CONFIRMED,
  executed). An institution the simulator founds is stamped once with **`foundedAt: { year, tick }`**; generation
  stamps nothing, and an unstamped institution reads as having stood since the founding (CONFIRMED,
  `institutionFounding.js` header; writers at `institutionLifecycle.js:990, 1139`).
- **Presets decide what moves.** The default rules object is the same on both lines, and a campaign born through
  `newCampaignSimulationRules()` still gets it (`NEW_CAMPAIGN_SIMULATION_PRESET_ID = null`) (CONFIRMED, executed).
  But the **Realistic Regional** preset — "THE LIT DEFAULT", which SF's comment says the instant-world composer
  applies as its fallback tone and the realm dialog offers as the default chip (CONFIRMED as SF's comment; the UI
  path not traced) — now carries `disastersEnabled`, `commodityFlowEnabled`, the WAVES bundle (`momentum, naval,
  intervention, settlementLifecycle, peaceEngine, supplyWebWarfare, upswingArcs, resourceDynamics,
  constructiveFlows`) and the ONE_REGEN bundle (`distancePricedNews, reframe, provenanceLedger, urbanFabric,
  npcGrowth, spatialConsequence, npcLadder, traditions, roads`); on the working tree the same preset carries none of
  them (CONFIRMED, both lines' presets executed). 34 further keys are engine-gated and declared neither by the defaults nor by any preset (SF's own definition of
  dormant), among them `treasuryEnabled` (a conserved coin stock, `economicState.treasury`) and `advanceEpochEnabled`
  (CONFIRMED, executed).
- **Under the lit preset the dossier gains keys the map will see**: `urbanFabric` = `{ drift, rebirths[], scars[],
  stocks: { civic, criminal, industrial, merchant, military, residential } }` — SF's own map-memory layer (see §1.6's
  scope decision) — plus `npcLadder` and `traditions`; the campaign gains `spatialLedgers.{ satellites, urbanFabric,
  npcLadder, traditions, provenance }` (CONFIRMED, executed).
- **A year on the branch** (executed; the same three probe seeds, which the branch generates as different
  settlements, so the rows compare in kind only):

| run | changed-key counts over 52 weeks (3 settlements) | institutions | tier | prosperity | population |
|---|---|---|---|---|---|
| working tree, defaults (§6.4) | population 111, powerStructure 156, activeConditions 156, npcs 57, economicState 33, institutions 35 | 49 status changes | none (proposals) | none | −817, −176, −197 |
| branch, plain defaults | population 137, powerStructure 156, activeConditions 156, npcs 63, economicState 107, institutions 44 | 57 status changes (impaired, remnant; one build, `Caravaneer's post`, id minted) | none (12 proposals pending) | none | −660, −158, +34 |
| branch, lit Realistic Regional | as above, plus `urbanFabric` 71, `npcLadder` 156, `traditions` 12 | 53 status changes | none | the city Comfortable → Prosperous (week 5) → Wealthy (week 33) | −663, −158, +125 |
| branch, Dramatic Campaign, one `one_year` advance | 499 outcomes auto-applied, 12 proposals | demotion and closure fates incl. `hollowed_out`, `privatized`, `shuttered`, `bankrupt` | town → village (week 32); village → hamlet (week 9) → thorp | the city Comfortable → Wealthy | 4694 → 3364; 763 → 495; 8950 → 9438 |

  Reading (PLAUSIBLE): on the current line a campaign born into the lit default shows growth-side change (prosperity
  climbing, a build) beside decline; tier changes stay rare within a year except under Dramatic; §6.4's "item 67
  will mostly show decline" holds for plain-default campaigns only.

---

## §7 · How a change is recorded — one table (CONFIRMED unless marked)

| record | written by | holds | limits |
|---|---|---|---|
| the dossier itself | everything | the current state, whole | no revision counter (searched `domain`, `store`, `lib`: none); versions only `schemaVersion`, `simulationVersion`, `generatorVersion` |
| `campaignState.eventLog[]` | canon events | `{ event, appliedAt, beforeState, afterState, deltas, factionResponses, narrativeSummary, causalStateDeltas, factionRelationshipDeltas, undo? }` — no entity-level diff | canon only; cleared on (un)canonize and on regeneration |
| entity stamps | events and simulator | `causeEventId`, `createdByEventId`, `removedByEventId`, `destroyedByEventId`, `…ByWorldPulseOutcomeId`, `worldPulseFate`, `remnantReason`, `requiredForTier` | per entity, current only |
| history lists | simulator and SHIFT_TIER | `populationHistory` (12), `tierHistory` (12), `institutionHistory` (24), `resourceHistory`, `calamityHistory` | capped; ticks partly implicit |
| authored records in `config` + `_config` | events and resource dynamics | `resourceEdits`, `customTradeGoods`, `stressorEdits`, `eventConditions`, `_cutRoutes` | re-applied at every regeneration |
| `wizardNews.entries[]` | simulator | campaign news with `tick`, `settlementIds`, `impactKind`, `sourceEventId` | campaign-level |
| `worldState.pulseHistory` | simulator | one compacted record per advance | ring of 80 |
| `versionHistory` | draft snapshots | whole-settlement snapshots | 50 per save |
| `lastRegenerationDelta` | rerolls | entity-catalogue diff + state deltas | session only |
| `pulseUndoStack` | advances | pre-advance snapshots | session only, 10 |
| designed: `decrees[]`, `dmLayer` | edit mode | ordered decrees with status and chronicle links; the DM's fields | not in this checkout |
| `settlement.mapEdits` | the legacy map | the map's own cosmetic overlay (a layout variant …) | on the save; SF never reads it back into generation |

**Answer to the brief's question "event log? diff? version?"**: an event LOG for canon DM events, capped
HISTORY lists and news for simulated changes, whole-settlement SNAPSHOTS for drafts, and version NUMBERS only
for schema and generator — **no diff and no change stream is emitted to consumers** (CONFIRMED for the files
read and searched).

**(branch) additions to the table** (CONFIRMED unless marked):

| record | written by | holds | limits |
|---|---|---|---|
| `settlement.decrees[]` | edit mode (`editSlice`), the tick's decree head, the rewind | ordered DM, guard and surveyor decrees with status, `tickRef`, `chronicleRef`, `appliedAt` | on the save, per settlement |
| `pulseRecord.decreeCauses[]` | the kernel, per week | one receipt per applied decree | only when non-empty; a multi-week advance keeps one record (§6.1), so interior weeks' causes survive only in the chronicle (PLAUSIBLE) |
| `dmLayer` | edit mode | the DM's overridden fields (roots, world facts) | an AUTHORED record key |
| `inst.foundedAt` | the simulator's two founding constructions | `{ year, tick }`, write-once | absent at generation |
| `institutionHistory[].tick` / `.year` | the institution lifecycle | the week of a closure, reopening or build | not on tier-fate entries; `tierHistory` has none |
| `spatialLedgers.provenance` | the pulse commit seam (lit presets) | `{ [receiptId]: { parents[], type, tick, receiptClass? } }` — recorded cause edges | capped (lowest tick evicted), sized to the 80-record history |
| `spatialLedgers.advanceEpoch` | the advance (dormant flag) | the epoch per tick and per lived year | dormant in every preset |
| the operation manifest | declared, not emitted | per store operation: class, scope, receipt source, undo | "no runtime emission" until its consumer and a budget ruling |
| `onTickObservation` | the interval advance | each week's raw news receipts | an audit-only callback, not persisted |
| `wizardNews` | the simulator | now keeps the last year whole and caps only beyond it (`domain/region/wizardNews.js:24–33`, `FEED_RETENTION_TUNING.windowWeeks = 52`; SF commit `1f3cba161`) | campaign-level |

Still **no revision counter** on a settlement (searched `store` and `domain` on the branch: only a custom-content
draft session has one) and **no change stream** delivered to consumers (CONFIRMED for the files read and searched).

---

## §8 · What a map must subscribe to — for item 22's least-disruption mutations and item 67's transitions

### 8.1 The honest starting point (CONFIRMED)

SF has **no change stream a consumer can subscribe to**. A change reaches anyone as a new whole dossier
(`settlementUpdates[].settlement`, a persisted save, a regenerated draft). The partial receipts of §7 exist,
but: the event log is canon-only and carries no entity diff; simulated changes are receipted in capped lists,
some without a week; a multi-week advance returns only end states; institutions have no stable id at birth.
So, until SF emits changes, **the map's host door must DIFF the previous dossier against the next one** and
read the receipts to recover causes and weeks.

### 8.2 The changes the map needs, where SF records them today, and what the map does

Our columns: item 22 (mutate the current map with least disruption) and item 67 (a physical change is a
`Works` with a start week and a duration in weeks).

| # | change the map needs | SF source today (detect by) | payload available | our response (item 22 / item 67) |
|---|---|---|---|---|
| 1 | institution ADDED | ADD_INSTITUTION (`createdByEventId`); promotion (`tierHistory…fate: 'added' / 'reactivated'`); economic build (`institutionHistory fate: 'built' / 'reopened'`); reconstruction upgrade; moral founding; a reroll (diff) | name, `catalogId` (born entries only), category, tags, `requiredForTier`, `builtReason`, the event/outcome id | a dossier `assign` placed by S10b's least-disruption order; a construction `Works` (stages 1–7) from the week of the cause; `reactivated`/`reopened` → a repair `Works` on the standing remnant |
| 2 | institution CLOSED or REMOVED | REMOVE_INSTITUTION (`status: 'removed'`, `removedByEventId`); economic closure (`status: 'remnant'`, `worldPulseFate`); demotion fates; abolition | status, fate word, `remnantReason`, the id | the use leaves; the building by FATE: `privatized` → kept, use converts (item 18); `downsized` / `reduced_to_watch_post` → a smaller use in place; `hollowed_out` / `abandoned` / `removed` → vacancy (item 22 (a)), then the slow ruin `Works` if it stays vacant (item 67 (f)) |
| 3 | institution IMPAIRED or RESTORED | `impairments[]` `{ type: capacity / wealth / access / corruption, severity, causeEventId }`, `status: 'impaired'` ↔ `'active'` | severity, type, cause id | a condition on the building (a damaged-stage look by severity); restoration → a repair `Works` |
| 4 | institution RUINED or DESTROYED | calamity (`status: 'ruined'`); `destroyedByEventId` | status, calamity stamp | a jump to the matching ruin stage (fire → charred shell in one week, item 67 (f)); then decay or repair `Works` |
| 5 | TIER changed | `tier`, `tierHistory` `{ fromTier, toTier, direction, outcomeId, institutionFates[] }` | the full fate list | an epoch-scale change (items 8 / 31): the demand stage moves; rows 1–2 for each fate, batched |
| 6 | POPULATION changed | `population`, `populationHistory` `{ tick, delta, reason, outcomeId }` | delta, week, reason | housing demand (items 17 / 31): growth → dwelling construction `Works`, decline → vacancy → decay, at item 67 (i)'s share of buildings in works |
| 7 | PROSPERITY band changed | `economicState.prosperity` (seven-step label) | old and new band | the prosperity field's driver (§4.5), item 31's ladder, item 72's dials; slow, epoch-scale |
| 8 | POWER standings changed | `powerStructure.factions[]` (`faction`, `category`, `power`, `rawPower`, `isGoverning`), `governingName`, `publicLegitimacy`, `criminalCaptureState` | per-faction power | item 72 (d″): the INSTITUTION dial and the QUARTER dial |
| 9 | GOVERNMENT changed (coup, conquest) | `governingName`, `powerTransfer`, a `vassal_extraction` condition | new ruler, cause | the seat-of-power use; an occupation mark |
| 10 | CRISIS began or ended | `activeConditions[]` `{ id, archetype, severity, status, triggeredAt.tick }` (siege, famine, plague, occupation, war pressure, food anchor lost, reconstruction, boom, bust, resource strike, vein exhausted) | archetype, severity, week | overlays; the rate at which `Works` start and stall (a siege pauses building; a boom raises the share in works) |
| 11 | RESOURCES changed | `config.nearbyResources*`, `resourceEdits`, `resourceHistory` | key, state | the hinterland (item 26): an extraction site opens or closes |
| 12 | TRADE changed | neighbour relationship events, `config._cutRoutes`, `economicState.primaryExports / primaryImports / tradeDependencies / transit / isEntrepot`; campaign `trade_route` channels | goods, partners (campaign level) | item 72's trade-position term and the weight of each gate — the bearing of each partner is NOT in the dossier (§2.5) |
| 13 | settlement DESTROYED, DIED, RESETTLED | DESTROY_SETTLEMENT (`status: 'destroyed'`); `lifecyclePatch` (relic ruin / abandoned site / resettlement, behind a flag) | grade, cause | the whole map to ruin stages; a resettlement is an open question (§9) |
| 14 | RENAMES | `name` of settlement, NPCs, factions | old and new | labels only — our identity must not ride on names (§8.5) |
| 15 | DEITY changed | `config.primaryDeitySnapshot`, cults | the deity | temple dedication labels; the church's power in item 72 |
| 16 | NPC changes | `npcs[]` (`id`, `role`, `institution`, status) | per NPC | named household heads (item 17); low priority |
| 17 | a DECREE applied (future) | `decrees[]` `{ status: 'applied', appliedAt, tickRef, chronicleRef }` | the op, the tick | the decree id becomes the cause of the resulting changes |
| 18 | a draft REROLL | a whole new dossier from the same seed | the entity-catalogue diff (`deriveRegenerationDelta`) | open question (§9 Q1): mutate (item 22) or start a new map |

### 8.3 The envelope to define on our side now (program's proposal, vetoable)

One record type at the host door, ours, so that nothing downstream depends on SF's shapes:

```
type DossierChange = {
  changeId: string            // SF's event id, outcome id or decree id; else a hash of (element, op, week)
  source: 'event' | 'pulse' | 'decree' | 'regeneration' | 'edit' | 'diff'
  week: number | null         // SF's world week (worldState.tick / calendar.elapsedWeeks); null for a draft
  cause?: { kind: string; ref?: string; author?: 'dm' | 'world' | 'party' | 'guard' | 'surveyor' }
  element: { kind: 'settlement' | 'institution' | 'faction' | 'npc' | 'resource' | 'condition' | 'trade'
             ref: DossierRef }   // §7.1's { element, version? }
  op: 'add' | 'remove' | 'state' | 'attr' | 'tier' | 'population' | 'prosperity' | 'power' | 'rename'
  before?: unknown; after?: unknown   // the changed fields only
  fate?: string               // SF's fate word (institutionFates, worldPulseFate)
  reason?: string             // SF's receipt text, carried into the disruption report
}
```

Each `DossierChange` becomes one or more of our `EditEvent`s with `author: 'host'` and `EditBase.dossier`
set (ARCHITECTURE §7.7, §11.4), and, when physical, a `Works` whose start week is `week` (item 67 (a)). Both
item 22 (c)'s ordered history and item 67 (k)'s scrubbing need `week` and a stable `changeId`; both exist in
SF's receipts for most kinds (§6.5), so the adapter can supply them without SF changes, imperfectly.

### 8.4 Timing contract for item 67 (CONFIRMED facts; the contract is the program's proposal)

- SF's tick and our item 67's unit are the same: **one week**. Our `Works` durations are in weeks; a `Works`
  starts at the SF week of its cause.
- Seasons: SF's law is the 4-4-5 grid with spring in weeks 0–12 (`seasonForTick`); item 67 (b)'s season row
  (masonry pauses in winter) should read SF's season for a campaign week, not a calendar of our own.
- A multi-week advance returns only the end state; interior weeks come from receipts: `populationHistory.tick`,
  condition `triggeredAt.tick`, news `tick`, and the week suffix of outcome ids (`…save1.15`). `tierHistory`
  and `institutionHistory` have no week field (observed).
- A draft has no clock (`week: null`): the change applies at the map's current epoch; the program's default
  would be to show it finished (no staging) — an open question (§9 Q5).
- A decree applies at the head of its tick (design §2.6), so its `week` is that tick.
- SF's catch-up may run any whole number of weeks; our replay must accept gaps.

### 8.5 Identity — the dossier element key (CONFIRMED facts; the adapter is the program's proposal)

| element | SF identity today | interim key for `DossierRef.element` |
|---|---|---|
| settlement | `id` (`s_…`, from the seed); in a campaign also the save id | `settlement:<id>` |
| institution | **none at birth**; `name` (with count ranges), `catalogId` on born entries; `institution.<slug>` minted by events and builds | `inst:<catalogId or slug(name)>`; a collective record expanded to instances `…#1…#n` |
| NPC | `npc_N` | `npc:<id>` |
| power faction | its name (`faction`) | `power:<slug(name)>` — breaks on rename; flag it |
| condition | `condition.<archetype>.<suffix>` | the id as given |
| resource | the resource key | `res:<key>` |

**Collective records** (`Craft guilds (5-15)`, `Taverns (5-20)`, `Parish churches (2-5)`): SF gives a RANGE,
not a count. Our map must decide the instance count itself (seeded, by population and prosperity inside the
range, item 19's scaling) and keep it stable across changes; a status change on the record (for example an
impairment) must then be distributed over instances by a rule (§9 Q2–Q3). Stable per-institution ids in SF
("EM-P1" in the edit-mode design) would remove the name-keyed fragility; that is SF work at reconciliation.
*(Re-base note, CONFIRMED: SF's edit-mode design rules "EM-P1 IS WITHDRAWN. No NPC id is re-spelled; no faction id
is minted" — so SF plans no such ids; and the owner's rule of 2026-09-27 evening, item 20 (h) (iv)–(v), makes the
map's own binding of its record ids to dossier keys the answer, with an SF id used only if one is ever present.)*

### 8.6 What to prepare in our code now, in order (program's proposal; small, contract-level, not blocking the current layer)

1. **Types only**: `DossierChange` (§8.3) and `DossierMeta { seed, id, schemaVersion, simulationVersion,
   generatorVersion, week }` in the host-door contract (ARCHITECTURE §7.7 / §11.4), next to `DossierRef`.
2. **A spec for one pure adapter**, `diffDossiers(prev, next, receipts) → DossierChange[]`, as the ONLY place
   SF's shape enters the module (the identity adapter of §8.5 inside it). Build it at reconciliation; write its
   rules now. Test fixtures can come from this lane's scratch dossiers (before and after events; a year of
   ticks) when that time comes.
3. **Vocabulary tables as data rows** (our tables, dossier-overridable): SF institution status and fate words
   → our `Works` kind and entry stage (§8.2 rows 1–4); SF's seven prosperity bands → our bands (item 27);
   SF tiers → our tier rows; SF condition archetypes → our overlays and `Works` rate modifiers; SF power
   `category` values → item 72 (d″)'s power families.
4. **The clock contract** of §8.4 written into our evolution/`Works` design: `week` integer, SF's season law,
   gaps allowed.
5. **The collective-record expansion rule** (§8.5), seeded from our own fork of `_seed`.
6. **An optional input slot for trade bearings** (`tradePartners[]` with a bearing and weight) in the dossier
   contract, absent today — so item 72's trade term has a place to receive it when SF can derive it from the
   realm digest plus the FMG pack (§2.5).
7. **Rules of abstention**: never treat SF's derived surfaces (the four-dimension system state, the causal
   state, daily-life prose, the spine) as map facts; never regenerate SF; never write back (item 20).

### 8.7 Optional fields the port uses when present — never requests (reworded on re-base)

*The first pass titled this "What SF would need to add at reconciliation". The owner's rule of 2026-09-27 evening
(docs/AMENDMENTS-2026-09-27c.md item 20 (h) (iv)) forbids that framing: a gap in the dossier is the map's job, never a
request to SettlementForge; the port may declare OPTIONAL fields it uses when present and never REQUIRED ones.* So
each item below is an optional input with the map's own derivation as the rule: a per-tick change list (else the
host door diffs dossiers and dates changes from the receipts, §8.1, §8.4); a week on every history entry (else the
outcome-id suffix, else the week the new dossier arrived); stable institution ids (else the map's own binding table
over `catalogId`/name, §8.5); explicit instance counts for collective institutions (else the map's seeded count
inside SF's range, §8.5); per-partner trade bearings (else item 72's trade-flow term derived from the realm-level
partners, routes, terrain and the map's own road-and-gate geometry). Where our map document is stored is a
host-integration matter (the `settlement.mapEdits` precedent), not a dossier field. None of this is needed to keep
building the current layer.

### 8.8 (branch) revisions to §8 (program's proposals, vetoable; facts CONFIRMED as cited in §2.7–§7)

- **§8.1 stands**: the current line has no subscribable change stream either; the host door still diffs two
  dossiers. Two SF seams exist that would make diffing easier if SF ever exposes them (optional, §8.7): the interval
  advance's per-week `onTickObservation` callback, and the operation manifest's envelopes (SF's own header defers
  their emission "when the budget question is owner-resolved").
- **§8.2's table, amended rows:**
  - row 1 (institution ADDED): the start week now exists for simulator foundings (`foundedAt.tick`) and lifecycle
    builds (`institutionHistory[].tick`), so item 67's `Works` can start at SF's week without parsing ids;
  - row 2 (CLOSED or REMOVED): add the closure fates `bankrupt`, `closed_for_want_of_custom`, `shuttered` → our
    vacancy path (item 22 (a)), then item 67 (f)'s slow ruin if the plot stays vacant;
  - row 5 (TIER): unchanged — `tierHistory` still has no week; take it from the outcome-id suffix, and for a DM tier
    shift (`dm_shift_tier:…`, no suffix) from the week the event applied (a draft: `week: null`);
  - row 13 (DESTROYED, DIED, RESETTLED): add `memberBirths` — a new member settlement arrives as a whole new save,
    which starts a new map rather than mutating one;
  - row 17 (DECREE): **real on the current line** — `settlement.decrees[]` (status `applied`, `tickRef`) and the
    week's `pulseRecord.decreeCauses[]`; the decree id becomes the cause of the changes the diff finds that week;
  - new row 19 — **SF's own map-side layers**: `urbanFabric` on the dossier (lit preset) and the campaign's
    `spatialLedgers.urbanFabric` and spatial substrate: never inputs to our map (item 20's one-way flow; the rule
    that what we build stays the base until reconciliation); see §9 Q10;
  - new row 20 — **table events** (the clerk): they arrive as ordinary canon events (the kinds of rows 1–4, 10, 11)
    and need no separate handling.
- **§8.3's envelope**: `source: 'decree'` changes carry `decreeId`, `opType` and `tickRef` in `cause`; nothing else
  changes.
- **§8.4's timing**: add the catch-up (any whole number of weeks up to 26); the interior weeks of an advance are
  recoverable from `institutionHistory[].tick`, `foundedAt.tick`, `populationHistory[].tick`, conditions'
  `triggeredAt.tick`, news `tick` and outcome-id suffixes, and under the lit preset from the provenance ledger's
  `tick` per receipt.
- **§8.5's identity**: unchanged — institutions still have no id at birth; SF's own code states "an institution's
  NAME is its join key" and cascades renames across 33 stored-handle paths (sf/model, CONFIRMED there); with EM-P1
  withdrawn, the map's binding table (item 20 (h) (v), proposed) is the lasting answer, not an interim one.
- **§8.6, three additions**: (8) a decree reader in the diff adapter (`decrees` + `decreeCauses` → `DossierChange`
  with `source: 'decree'`); (9) an ignore-list in the adapter for SF's map-side keys (`urbanFabric` and `mapEdits` on the
  settlement, everything under the campaign's `worldState.spatialLedgers`) so they never become map inputs — the
  separate `worldState.spatialDigest` stays an input for its gates and distances (§2.5); (10)
  when fixtures are cut, cut them from this lane's branch runs (`scratchpad/sf/gen-rebase/b2-*`), not from the
  working-tree runs.

---

## §9 · Open questions (for Fable / the owner)

1. **A draft reroll** (same seed, whole new dossier): mutate the current map (item 22) or start a new one? A
   reroll can replace most institutions at once.
2. **Instance counts** for collective institutions: ours (seeded, inside SF's range) or SF's at reconciliation?
   *(Re-base: settled by item 20 (h) — ours, derived; an SF count would be used only if present.)*
3. **A status on a collective record** (an impaired "Taverns (5-20)"): which instances carry it?
4. **Settlement death and resettlement**: the old map to ruin stages, then a new growth on the same site — or a
   new map?
5. **DM events on canon without a clock** (a canon settlement not in a campaign): show the building staged, or
   finished at once?
6. **Interior weeks of a multi-week advance**: accept receipt-based reconstruction, or ask SF for per-tick
   change lists at reconciliation? *(Re-base: settled by item 20 (h) (iv) — receipt-based reconstruction; the
   current line carries more weeks, §8.8.)*
7. **Faction identity by name** (a coup can rename the governing faction): accept renames as remove+add, or
   require SF ids? *(Re-base: never require — item 20 (h) (iv)–(v); SF withdrew EM-P1, so a rename is a rename only
   when SF's rename cascade leaves a receipt the diff can read, otherwise remove + add.)*
8. **Which flags a campaign runs** (upswing, lifecycle, calamity, resource dynamics are off by default): item 67's
   construction side will mostly be dormant under the defaults (§6.4) — acceptable?
9. **Which SettlementForge line the map binds to** (sf/model's Q1, restated): this file now describes
   `fp/integration-2026-09-23` @ `5d699cc68`; the working tree and `master` differ materially (steps, events, edit
   mode, presets). Owner.
10. **SF's own map-memory and map-to-engine layers** (current line): `urbanFabric` (district-class prominence stocks
    SF's town map projects from) and a spatial substrate derived from SF's own town layout, which the simulator reads
    to place calamity damage, siege breaches and covert corruption by district and then narrates. Under item 20 our
    map never feeds SF, so SF's news may name districts of SF's own layout that our map does not have. Is that
    acceptable, or must our district naming follow SF's district classes so the news and our map agree (a coherence
    question under item 20 (h) (iii))? Owner and Fable.
11. **Question 8, re-asked for the current line**: new realms get the lit Realistic Regional preset (growth and
    decline movers on), other births get the plain defaults. Which should our item 67 calibration assume?

---

## §10 · Evidence summary

CONFIRMED by execution: the 20-step order; same-seed byte identity; the dossier's 37 top-level keys;
institutions without ids or statuses at birth; collective count-range records; the six probed events' writes;
a year of weekly ticks under default and dramatic rules; no writes into SF. CONFIRMED by reading: the inputs,
the fork law, the clock and its 4-4-5 calendar, the event flow and vocabulary, the outcome payload fields, the
tier, population and institution-lifecycle rules, the receipts and their caps, the realm digest's fields, the
edit-mode design. PLAUSIBLE (inference): that section rerolls are not replayable; that a library change alters
a regeneration; the reading of what the probes mean for item 67; every "our response" and every proposal in §8.

(branch) CONFIRMED by execution on `fp/integration-2026-09-23`: the 22-step order; same-seed identity within the
line and a different dossier across lines at an unchanged `generatorVersion`; 41 top-level keys; institutions without
ids or statuses at birth; the event vocabulary (41; 40 on the working tree); both lines' presets and default rules;
the seven-event probe; 52 weeks under the plain defaults and under the lit preset; a Dramatic year; which history
entries carry a week; the dossier keys the lit preset adds; no writes into SF (five before/after checks). CONFIRMED by
reading on the branch: the new steps' roles (headers), the pinned pipeline mode, the prng changes, the committable
edit kinds, the decree registry and its head-of-tick application, the op catalogue, the operation manifest, the stage
markers, the kernel's return, the rule constants, the founding stamp, the digest's capture receipt, the instant-world
flow. PLAUSIBLE: what a decree does to a dossier (not executed); whether the custom-content receipt can reproduce a
regeneration; the UI paths by which new realms receive the lit preset.

---

## §11 · Re-base ledger: the working tree against the current product line

| # | claim (section) | working tree (first pass) | branch `5d699cc68` | status |
|---|---|---|---|---|
| 1 | step count and order (§3.2) | 20, executed | 22, executed (§3.4) | REVISED |
| 2 | top-level keys (§3.3) | 37 | 41 | REVISED |
| 3 | no id and no status on institutions at birth (§3.3) | 0 of 56 | 0 of 59 | HOLDS |
| 4 | collective count-range records (§3.3) | yes | yes (11 in the probe town) | HOLDS |
| 5 | same seed → same dossier (§4.2) | executed | executed within the line; differs across lines at the same `generatorVersion` (§4.5) | HOLDS, plus a new limit |
| 6 | the FMG world is not a generator input (§2.5) | grep | grep (§2.7) | HOLDS |
| 7 | the terrain agreement check is not built (§2.5) | grep found nothing | built as a capture receipt (§2.7) | REVISED |
| 8 | the custom library is not stored (§2.3) | true | a provenance receipt is stored (§2.7) | REVISED |
| 9 | event vocabulary (§5.2) | written 42; executed **40** | 41 (`CREATE_ROUTE`) | CORRECTED and REVISED |
| 10 | committable queue kinds (§5.1) | 2 | 13 (§5.4) | REVISED |
| 11 | decrees and edit mode (§5.3) | design only | built: registry on the save, head-of-tick application, `decreeCauses` (§5.4) | REVISED |
| 12 | tick = one week, 4-4-5 calendar (§6.1) | read | executed (§6.6) | HOLDS |
| 13 | only canon campaign members tick (§6.1) | read | read | HOLDS |
| 14 | the kernel's order (§6.2) | from stage calls | nine named stages, decree head first (§6.6) | REFINED |
| 15 | outcome payload fields (§6.3) | read | the same fields | HOLDS |
| 16 | tier and population rules (§6.3) | read | the same constants; one dark "earned ascension" rule | HOLDS |
| 17 | upswing, lifecycle, calamity and resource dynamics off by default (§6.3) | off except in Dramatic/Full | off in the plain default; ON in the Realistic Regional preset new realms receive (§6.6) | REVISED |
| 18 | `institutionHistory` carries no week (§6.5) | observed | lifecycle entries carry `tick` and `year`; tier-fate entries do not (§6.6) | REVISED |
| 19 | no change stream, no revision counter (§7) | searched | searched (§7's branch table) | HOLDS |
| 20 | the receipts (§7) | event log, capped lists, news, snapshots | plus decrees, `decreeCauses`, `foundedAt`, the provenance ledger, the declared operation manifest, the observation hook | EXTENDED |
| 21 | the map must diff (§8.1) | proposal | the proposal stands; two optional seams named (§8.8) | HOLDS |
| 22 | `_cutRoutes` is re-applied by generation (§2.6) | stated | no generator names it on either line; it rides in the carried config (PLAUSIBLE) | CORRECTED |
| 23 | §8.7's "what SF would need to add" | a list of requests | reworded as optional fields with map-side derivations (owner rule item 20 (h) (iv)) | REWORDED |

## Fable review (2026-09-27) — B-sf/generation

**Verdict: CORRECTED** (Fable reviewer, lane fable-review/main/sf; the full review is `docs/fable-review/main/sf.md`).

**Re-derived and CONFIRMED** — five by execution from the scratch copy (proved equal to `5d699cc68` by blob hash; `find
-newer` over SettlementForge empty afterwards): the 22 steps in §3.4's order; the probe town (seed `plat-sf-probe-1`)
generated twice byte-identical and byte-identical to this lane's `gen-rebase/br-dossier-town-probe1.json` (Rundhausen,
`s_9296d86fa969b198`, 4 694, 59 institutions, 0 ids, 0 statuses, 41 keys); 41 event types with `CREATE_ROUTE`
(`domain/events/registry.js:197, 827`); the fork law (`kernel/prng.js:90`, the `::` delimiter `:73-76`); the clock
(`domain/worldPulse/worldState.js:23-33, 41-46, 57`; `intervalWeeks.js:8-11`); the decree head (`decreeHook.js:1-13`);
`CATCH_UP_CAP_WEEKS = 26` (`simulationRules.js:1388`); the 13 committable kinds (`domain/pendingEdits.js:22-31`); `foundedAt`
at exactly two sites (`institutionLifecycle.js:990, 1139`); `_cutRoutes` named by no file under `src/generators` (§2.7's
correction holds).

**Corrections** (the file predates `research/sf/mapping-verify.md` and the plan; each is carried by 27d items 75, 76, 80):
(a) §8.2 row 1: the ADDED receipts also include `_worldPulseTierAdded`, `_worldPulseFounded` / `foundedByWorldPulseOutcomeId`
and the upswing founding `founded_by_flourishing`, which writes `{ name, category, status, worldPulseFate }` and nothing
else (`upswingKernel.js:763`); an ADD of an existing name is a REOPEN; a missing `foundedAt` never means "stood since the
founding" (V57, V58). (b) Row 2: the closure fates arrive with `status: 'remnant'` and `_worldPulseInactive: true`
(`institutionLifecycle.js:1006-1021`), never `removed`; the closed vocabulary of eighteen fates is
`worldPulseFates.js:56-75`; `abolished`, `disbanded`, `abandoned_with_the_settlement` belong to the list; key on the fate and
the inactive flag before the status (V59). (c) Row 4 and §7: `destroyedByEventId` is written on the settlement root only
(`mutateEntities.js:66-78`; V61). (d) Row 14 and §8.5: institutions are renamed only by a calamity demotion (`demotedFrom`,
`calamityKernel.js:301-317`, the old `catalogId` kept) and a reconstruction upgrade (`promotedFrom`, `upswingKernel.js:516`);
the institution rename writer has no caller and no `rename-institution` edit exists (V5, V62). (e) §6.3's tier row: a
calamity lowers `tier` directly with no `tierHistory` entry (`calamityKernel.js:482-486`), a resettlement forces `thorp`,
and presets that lift proposal gating auto-apply (V47) — F8 fires on a bare `tier` change. (f) §8.5's collective-record
rule is ruled (J-Fsf-4): an impairment is distributed over the members by severity band on the record's stream (the
plan's J-P12); a terminal state (`ruined`, `destroyed`, `removed`, a closure fate) applies to every member, because the
dossier's fact is the kind's state.

**§9 dispositions** (all also the plan's §3 rulings, confirmed): Q1 → same `id`, dossier changes by least disruption
(J-M11); Q2 → ours, inside the range (R9); Q3 → J-Fsf-4; Q4 → owner Q4 (recommendation: one map, ruin then regrowth);
Q5 → finished, no stages (J-M10); Q6 → receipt-based; Q7 → re-bind on receipts, else removal plus addition (J-M4 with
the two institution stamps); Q8/Q11 → the lit preset is the reference scenario (J-P8), item 67 (i)'s table being keyed by
the observed growth-or-decline rate so the presets change which rows occur, not the calibration (J-Fsf-9); Q9 → owner
Q1; Q10 → owner Q6, recommendation accept the mismatch.
