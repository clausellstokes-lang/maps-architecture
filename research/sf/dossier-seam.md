# SettlementForge — the map↔product seam (survey lane sf/seam)

> PENDING FABLE REVIEW — Opus-produced (sf/seam).

## PROGRESS
- [x] 0 orientation: our §11 / §14 read in full; baseline branch check (working tree vs fp/integration-2026-09-23)
- [x] 1 docs/DESIGN_MAP_MODULE_SPLIT.md — read in full (490 lines, §0–§11.5 + Appendices A–G)
- [x] 2 legacy in-product map entry point — INPUT only (signature, accessors, fields)
- [x] 3 map tab loading, lazy loading, map-state persistence, edit flow back
- [x] 4 realm-map (FMG weave) hook: burg data into the settlement
- [x] 5 what the carve-out plan expects of the module (continuation pass, 2026-09-27 17:44–)
- [x] 6 constraints on our data protocol (§11, §14) — C-1 … C-17, Q-1 … Q-4
- [x] 7 docs chosen not to read, and why — with the search denominator
- [x] 8 queue row + LANDED
- [x] 9 resume: the 14:42 run left items 0–4; this pass re-verified their key claims (spot-checks in §0), added
  branch facts to §3 and §4, and wrote the plain-words summary and §5–§8

## In plain words (the outcome first)

- **Today SettlementForge has no settlement map at all.** On its current product line the owner's order to strip the
  old in-product town map has landed (commits of all six strip waves are on the branch; the terminal census landed
  on 2026-08-30). What survives is a hidden
  geometry summary the simulator can read (districts, their neighbours, walls, gates — dormant), a marker stamped on
  every new save, and old saves' map keys kept but inert. A map module therefore plugs into a clean slot: a new mount,
  no paid map features, and no map data in the dossier that we must honour. (CONFIRMED)
- **SettlementForge's own plan for that slot** (written 2026-08-29 for its own new map program) wants a separate
  program that talks through versioned data only — never shared code — and whose pictures the product ships as data;
  one form it names is the realm map's, which already runs that way in an iframe on its own web address. Our design already
  has that door, the bridge of §11.3. (CONFIRMED)
- **The one big difference:** SF's plan puts the PLANNING of the town in SF's engine and only the DRAWING in the
  module; our design, and the owner's rule of today ("derivation fills every gap"), has the module plan and draw from
  the dossier as it is. Which seam the product adopts is the owner's reconciliation call (Q-1); nothing in the current
  layer has to change for either answer. (facts CONFIRMED; the reading PLAUSIBLE)
- **A second difference:** SF planned to let its simulator read the map's geometry (fire along real streets, sieges at
  real wall segments). Our one-way rule has no door for that; if the owner wants it, the safe form is a read-only
  summary built without the users' own map edits (Q-2).
- **The realm map does not hand a burg's population, culture or state to a settlement today.** In the product the
  Azgaar fork draws geography only; a settlement is generated first and placed afterwards, and only its position is
  recorded. No direction from one settlement to another is stored anywhere — SF's own war layer fakes one with a
  stable hash. So "where trade comes from" is the map's to derive now (owner rule 20 (h)), with an optional realm
  block ready for when bearings exist (C-9). (CONFIRMED)
- **Seventeen constraints on our protocol are listed in §6; most already hold.** The real gaps are small and concrete:
  say how bridge replies name their requests; make every exported SVG inert, because SF will ship it as data; never
  carry SF's secret seed in our document (derive ours one-way); let a public export take display names (SF veils
  flagged words on public pages, and our SVG bakes text into outlines); say where the "previous dossier" comes from
  (our own carried dossier facts); and decide what an SF undo does to the map (Q-3).

## 0. Baseline and reading log

**Which SettlementForge.** CONFIRMED: the on-disk SF working tree is stale (the sf/model lane's finding; its
BASELINE section). The current product line is branch `fp/integration-2026-09-23` @ `5d699cc68`
(2026-09-24). Its `src/` is already exported read-only into `scratchpad/sf/tree/` by the sf/model lane; this
lane read the product code THERE. The design docs live on the LEDGER branch `review-fixes-2026-07-08` (the SF
checkout's HEAD): `docs/DESIGN_MAP_MODULE_SPLIT.md` does **not exist** on `5d699cc68` (`git show` refuses the
path) and the working-tree copy equals `HEAD`'s byte for byte (CONFIRMED by `diff` against `git show HEAD:…`).
So: docs from the ledger HEAD, code from the product branch. Where the two differ, the code wins and it is said.

**Read in full (CONFIRMED by reading):** `docs/DESIGN_MAP_MODULE_SPLIT.md` (490 lines, all sections and all
seven appendices — the appendices are survey reports about files, gates, docs, docket and licences, not about
how their map draws); ours: `docs/ARCHITECTURE.md` §11 (lines 9143–9456) and §14 (10904–11097);
on the branch copy: `lib/spatialSubstrateDerive.js` (104 lines), `domain/townMap/anchors.js`.

**Read in part (ranges):** branch `domain/townMap/townMapModel.js` lines 1–50 (header, imports), 100–160
(input typedefs), 320–380 (the entry function up to its derivation calls) and a grep of every `s.` read — the
drawing/geometry body (380–632) NOT read; `domain/townMap/townLayoutV2.js` typedef 133–142 and signature
242–252 only; `domain/townMap/institutionAssignment.js` header 1–25; `domain/townMap/mapEdits.js` 1–60,
175–195, 600–640 + export list; `domain/townMap/fabricRead.js` 1–50 + exports; `domain/townMap/ladderRead.js`
1–25; `domain/spatial/spatialSubstrate.js` 1–60; `domain/spatial/spatialSubstrateRead.js` 1–95;
`domain/mapProfile.js` typedef 45–53, 123–137, 300–335; `domain/districtProfile.js` typedef 72–92;
`domain/causalState.js` 198–218, 380–389; `domain/activeConditions.js` 675–700;
`store/campaignWorldPulseDeferred.js` 270–320; `store/campaignWorldPulseSlice.js` 325–420;
`store/mapSlice.js` 1–80, 850–889 + action list; `lib/mapBridge.js` 1–120 + the command list;
`hooks/useMapBridge.js` 1–40, 74–114, 149–200; `lib/mapRuntimeConfig.js` 1–40; `lib/campaigns.js` 440–492;
`lib/saves.js` the `select`/`insert` lines; `components/OutputContainer.jsx` 40–70; `config/entitlementLadder.js`
45–80; `lib/mapLayerAnalytics.js` 1–30; `components/map/PlacementsLayer.jsx` 140–165. Ledger
`docs/OWNER_DECISION_QUEUE.md` (HEAD, 32 953 lines): searched for the module seam; lines 31532 (§738.1) and
32624 (§925.7) read.

**Only searched (grep), not read:** importers of `buildTownMapModel`, `mapEdits`, `spatialSubstrate*`,
`burgToConfig`, `useMapBridge`, `mapLayerAnalytics`, `fogSessions`, `MapTabShell`.

**Git use:** `git show` and `git log` only (the allowed read-only set). Nothing was written, installed, built or
run inside `/Users/cstokes/Desktop/settlement-engine`; every output went to `scratchpad/sf/seam/`. No code was
executed by this lane (no generation was needed — the sibling lanes' generated dossiers suffice).

**Continuation pass (2026-09-27 17:44–, same baseline; CONFIRMED by reading unless marked).** Ours, read in full:
`docs/ARCHITECTURE.md` §11 (lines 9143–9456) and §14 (10904–11097) again; §7.1's `EditBase` and `DossierRef`
(6395–6403); §7.7's dossier contract items 1, 2, 6, 7, 8 (7374–7445); `docs/AMENDMENTS-2026-09-25b.md` items 20–22
(155–222); `docs/AMENDMENTS-2026-09-27c.md` item 20 (h) (1226–1276); the sibling files' §2.5, §2.7 and §8
(`research/sf/dossier-generation.md` 286–356 and 900–1069) and their undo lines. SettlementForge, read-only: the split
doc again (§0–§11.5, lines 1–150; Appendix A, 154–190; Appendix B §3, its roster line and §8, 212–217, 232, 234–243);
`docs/DESIGN_FMG_WEAVE.md` (HEAD only, 163 lines) in full; `docs/azgaar-bridge.md` (HEAD = branch, 67 lines) in full;
`docs/fmg-bridge.js` 1–140 of 262; `docs/DESIGN_FP_ARCHITECTURE.md` 1–14 (triage);
`docs/COMPREHENSIVE_REVIEW_PROGRAM.md` 396–412 and 640–656; ODQ §738 (whole), §739.1, §925.7, §934.85 and the head
of §751.3; three rows of `docs/FABLE_VALIDATION_QUEUE.md` (branch, lines 7451, 7487, 7598). Branch code:
`domain/spatial/spatialSubstrateRead.js` 205–270, `store/operationRegistry.js` 296–362, `config/entitlementLadder.js`
185–205, `domain/display/publicSafe.js` 1–120 and 320–345, `lib/civility.js` 1–40, `hooks/useMapBridge.js` 155–186,
`domain/townMap/mapEdits.js` 1–30. Searched only: every top-level `docs/` file of the branch and the ledger HEAD for
seventeen seam patterns (§7); `git log --grep` for the six strip waves on the branch. Spot-checks of the first run's
claims (the entry signature at `townMapModel.js:336`, the fork key, `burgToConfig`'s lone definition at
`mapSlice.js:872`, `PRODUCTION_MAP_ORIGIN` at `mapRuntimeConfig.js:21`) all reproduced.

## 1. What SettlementForge's own carve-out plan says (DESIGN_MAP_MODULE_SPLIT.md)

**Directives (owner, 2026-08-29; CONFIRMED, §0).** (1) De-scope: settlement-layer mapmaking is separated out as
a module the owner adds later; it must not gate launch. (2) GPL reason: the module alone can be published under
GPL-3.0 while the rest of SettlementForge stays private. (3) Seats: Fable architects/surveys, Opus implements
and verifies.

**The three map surfaces (CONFIRMED, §1 table), as SF saw them on 2026-08-29:**

| surface | what it is | in the product? | SF's disposition |
|---|---|---|---|
| the new map program | SF's own sandbox map program on an orphan git line (spine/fabric/dress/…) | zero imports | "BECOMES THE MODULE" |
| the legacy in-product map | `buildTownMapModel` → `townMapDraw`, lazy behind `MapTabShell` | yes | first "stays at launch"; then STRIPPED by the owner (§11) |
| the realm/world map | the Azgaar/FMG fork in an iframe (`public/map/`, `src/components/map/`) | yes | launch-core, not part of the carve |

(Our standing rule makes what we build the base until reconciliation — memory `settlementforge-map-program-link`: "built
generator = BASE". SF's "new map program" row is therefore a competitor to PLAT for the module slot, not a
constraint on it; this lane did not read it.)

**The owner's rulings of 2026-08-29(b) (CONFIRMED, §11, verbatim quotes there):** "We are stripping the entire
legacy settlement map. Leave no tab or trace of it on the website…"; and the GPL election: third-party GPL-3.0
code may be copied/derived **into the module only**. §11.1's mechanics (CONFIRMED, quoted in substance):
the module is GPL-3.0 and can never be re-closed where it derives from GPL code; it must live in **its own
repository from day one**; **"The private product consumes the module's OUTPUT, never its code"** — the module
runs "as a separate program (build-time/generation-time renderer, separate process or service, or an isolated
iframe origin like the existing map.settlementforge.com FMG-fork precedent) — consumes the plan and emits SVG;
the product ships the SVG as data"; **"The private client bundle must NEVER import/link the module's JS"**; a
lane that has read GPL source may never write to the core repo.

**The later reaffirmation (CONFIRMED, ODQ §738.1, owner in-chat):** "anything involving settlement layer
mapmaking is deferred until after launch and is part of the module." The chair's gloss in the same entry: the
REALM map is launch-core; the SETTLEMENT map is module-side; "the retained headless `buildTownMapModel`
substrate is engine-internal geometry, not mapmaking, and is replaced at module-land." ODQ §764.5 (owner): the
only exception to "nothing emergent is deferred" is "anything related to the settlement layer map module(s)"
(line 31704, CONFIRMED by grep). ODQ §925.7 (CONFIRMED): the module's scope includes BUILDING interiors (the
DW/AD/interiors line), not SF's character-interior volume.

**The boundary contract SF planned (CONFIRMED, §2, §8, J-SPLIT-2):** "a serialized, versioned plan-artifact
schema. The engine emits the plan; the module draws it." "The module never links engine code, the engine never
links module code; they exchange versioned data." SF's candidate field set for that plan (CONFIRMED, Appendix B
§3, quoting their module's entry header): `meta.tier/terrain/tradeAccess/hasWalls, frame.water,
districts[].id/category/wealth, buildings[].anchorKey/districtId` from the legacy model, plus a "fifteen-field
illustrator handoff" (§723.6, not read — ledger-only) and a spine `partitionInputs` record. ⚠ This contract puts
**planning in SF's engine** and only **drawing in the module**; PLAT is a planner AND a drawer (§1 of our
design). See §5 E-4 and §8 Q-1 below: this is the largest mismatch.

## 2. The legacy map's entry point — what it reads from a dossier (INPUT only)

The retained headless entry (CONFIRMED on the branch; the tab, pane and drawing were stripped by STRIP-1…6):

```
buildTownMapModel(settlement, mapEdits = null) → TownMapModel      // domain/townMap/townMapModel.js:336
```

Its header (CONFIRMED): "a PURE, view-time projection of the dossier … The map persists NOTHING onto the
settlement … this model is derived only when a viewer asks for it." Its rng is forked from the settlement seed
(`${_seed ?? id}::town-map:v1[::variant:n]`); `mapEdits.layoutLawVersion === 2` dispatches to a sibling
`buildTownLayoutV2(settlement, mapEdits)` with the same output shape.

**Direct dossier reads (CONFIRMED by grep of every `s.` read in the entry function):** `institutions[]`,
`_seed` (fallback `id`), `config` (→ `resolveTerrain`), `config.tradeRouteAccess`, `defenseProfile`
(→ `defenseProfileHasWalls`: `hasWalls`, `walls`, `institutions.walls`), `tier` (fallback
`popToTier(population)`), `population`; from `mapEdits`: `layoutLawVersion`, `layoutVariant`, `pins`.

**Per-institution fields its input typedef names (CONFIRMED, `TownInstitution`):** `name, catalogId, localUid,
priorityCategory, category, tags, id, isCustom, customDefinitionId, customDefinitionRevisionId,
customDefinitionContentHash, customDefinitionVersion, customDefinitionFingerprint, sceneProfileId,
landmarkLevel, materialFamily, glyph`.

**Composed derivations it calls, and what they read (CONFIRMED from their typedefs):**
- `deriveAllDistricts(s)` (districtProfile) — `economicState.prosperity`, `institutions`,
  `spatialLayout.quarters`, `powerStructure.factions` / `factions`. Output: `district.<snake>` ids with
  category, wealth, safety, dominant faction, institutions, services.
- `deriveMapProfile(s)` — `config.{terrain, biome, riverAccess|river, roadAccess|road, tradeRouteAccess,
  monsterThreat, region, magicLevel, priorityMagic, magicExists}`, `defenseProfile`, `institutions[].name`, and
  through `deriveCausalState(s)` also `population`, `stressors|stress|stresses`, `powerStructure.{governingName,
  government, publicLegitimacy}`, `economicState.{prosperity, economicComplexity, safetyProfile, activeChains}`,
  `safetyProfile`, `config.{government, primaryDeitySnapshot}`; plus threat profiles and the regional graph.
- `resolveTerrain(s.config)`, `defenseProfileHasWalls(s.defenseProfile)`,
  `deriveAllActiveConditions(s)` (`activeConditions[]`).
- v2 path adds (CONFIRMED, `TownV2Settlement`): `config.{terrainType, biome, terrainOverride}`,
  `spatialLayout.quarters[].location`, `economicState.{primaryExports|exports, prosperity}`, `urbanFabric`.

**Identity keys it uses (CONFIRMED, `anchors.js` read in full):** institution anchor = `cat:<catalogId>` →
`uid:<localUid>` → `name:<slug(name)>`; district anchor = the derived `district.<snake>` id. The anchor module
says why: "an array index is a false identity". ⚠ PLAUSIBLE hazard: two instances sharing one `catalogId`
(count-range institutions, sf/generation §8) get the SAME anchor — the legacy key does not separate them.

**What the entry does NOT read (CONFIRMED by the grep):** `npcs`, `relationships`, `conflicts`, `history`,
`eventLog`, any household or class record (none exist — sf/model), and nothing of the realm (no FMG cell, no
spatial digest). It is a settlement-only projection.

## 3. How a settlement map plugs into SettlementForge TODAY

1. **No settlement map is mounted.** CONFIRMED (`components/OutputContainer.jsx:49–51` on the branch):
   "STRIP-1 (owner ruling, ODQ §725): the legacy settlement-map tab is GONE from the product. The dossier's tab
   set is Summary / Systems / World / Notes — there is no fifth Map tab, no MapTabShell specifier". The paid
   ladder's four map rows left with it (`config/entitlementLadder.js:58–68`). There is no live entry point,
   lazy chunk or pane for a settlement map; a module will need a new mount.
2. **The old lazy-loading pattern (the precedent a new mount will follow; CONFIRMED, split doc Appendix A
   §3):** `SettlementDetail → OutputContainer → lazy(() => import('./townMap/MapTabShell.jsx')) →
   SettlementMapPane → buildTownMapModel → draw`, "imported by NOTHING eager", so first paint stayed
   byte-identical; build censuses pinned the lazy chunk names. A residual telemetry helper survives on the
   branch, `lib/mapLayerAnalytics.js` (one event `TOWN_MAP_LAYER_USED`, coarse bands only, "imported only by the
   lazy SettlementMapPane") — its only importers now are analytics registries (CONFIRMED by grep): a dormant
   hook for a future map layer's telemetry.
3. **Data handed over:** the whole settlement object (the dossier blob) plus its `mapEdits` container, read
   in-process (§2). No serialized contract, no version handshake — the planned plan-artifact never landed.
4. **Persistence of map state (CONFIRMED, `mapEdits.js` header):** the legacy map's state lived INSIDE the
   dossier blob as `settlement.mapEdits` = `{ layoutVariant?, pins?[{anchor,dx,dy}], sceneOverrides?[],
   legendPrefs?, styleLens?, layoutLawVersion?, annotations?[{x,y,label,audience:'dm'|'player'}],
   bespokeStyles?, seasonOverride? }` — anchor-keyed, never coordinates, cosmetic only, absent ⇒ byte-identical.
   The whole dossier persists as the `data` jsonb of a `settlements` row (CONFIRMED, `lib/saves.js:464, 594`).
   Still live on the branch: the save/create boundary stamps `mapEdits: { layoutLawVersion: 2 }` on every new
   settlement (`SaveToLibraryButton.jsx:43,99`, `SettlementsPanel.jsx:211`, `BuyThisDossier.jsx:172`), and the
   town-scene, interior and substrate readers still read `mapEdits` (CONFIRMED by grep). The fog sessions
   (`domain/townMap/fogSessions.js`, per-session reveal sets of districts/streets/buildings) survive as a module
   file registered in `store/operationRegistry.js` (CONFIRMED by grep; not read further). *(Continuation,
   CONFIRMED, `store/operationRegistry.js:313–345`:)* on the branch the map-edit writer `applyMapEdit` (its only caller,
   the style-overhaul panel, was deleted) and the fog writer `applyFogEdit` are RETIRED; the save-time minting of
   `{ layoutLawVersion: 2 }` stays because SF's substrate and interior footprint read it to pick the layout law; old
   saves' `mapEdits` and `fogSessions` keys are honoured or tolerated on read and deliberately not migrated.
5. **Edit flow back:** none into the dossier. The legacy map's edits were cosmetic (`mapEdits`) and wrote only
   their own container; its header says it "persists NOTHING onto the settlement". The one map→engine channel
   is not an edit but a DERIVED SIDECAR (next item). *(Continuation:)* with `applyMapEdit` retired, no map edit of
   any kind is written on the branch today (CONFIRMED, item 4).
6. **⚠ DOOR 1 — the engine reads map geometry (CONFIRMED, `lib/spatialSubstrateDerive.js` in full,
   `spatialSubstrateRead.js` 1–95).** "the map→engine half of the dialogue": at world canonization
   (`campaignWorldPulseDeferred.js:287–304`, only when `worldState.simulationRules.spatialConsequenceEnabled
   === true`), SF dynamically imports the derive body, builds each settlement's `buildTownMapModel`, projects it
   to a compact **spatial substrate** `{ v, sig, lyr, d:[{id,cat,cx,cy,flam,den}], adj:{id:[ids]},
   w:[{i,x1,y1,x2,y2,str,did}], g:[{x,y,seg}] }` (districts with centroid 0..1000, flammability, density; district
   adjacency; 8 wall segments with strength and protected district; gates) and stores it in
   `campaign.worldState.spatialLedgers.spatialSubstrate[saveId]`. Consumers (CONFIRMED by grep, 10 files):
   `worldPulse/{pulseKernel, spatialConsequenceKernel, npcLedger, npcVerdictTable, deploymentReturn}`,
   `resourceSites`, `townScene/compileTownSceneManifest`, `certification/subsystemRowsPlace`, `lib/spatialUsage`,
   `store/operationRegistry`. Fire/siege act as district FIELDS ("never per-building simulation"); a structural
   signature (seed, layout version, variant, tier, walls, institution names+status, quarter count) skips
   re-derivation. The flag is DORMANT and "PRE-SIGNED to light at THE ONE REGEN (ruling #8)". SF plans to
   REPLACE this substrate with the module's output at module-land (§738.1).
7. **The engine→map channel (CONFIRMED, `fabricRead.js` 1–50):** the fabric kernel mirrors each advance onto the
   dossier as `settlement.urbanFabric = { drift 0..1, stocks:{[districtClass]: prominence01}, scars:[{kind,
   severity,week}], rebirths:[{classes,type,week}] }` — "the layout engine's history-weighted district
   sizing/priority input". Absent/dark ⇒ empty. Likewise `settlement.npcLadder` (faction rungs; `ladderRead.js`)
   — an engine read, not a map input.

## 4. The realm map (Azgaar/FMG) — what reaches a settlement

CONFIRMED on the branch (`store/mapSlice.js`, `lib/mapBridge.js`, `hooks/useMapBridge.js`,
`lib/mapRuntimeConfig.js`, `lib/campaigns.js`):
- **Transport precedent.** The FMG fork runs in an iframe on a SEPARATE ORIGIN in production
  (`PRODUCTION_MAP_ORIGIN = 'https://map.settlementforge.com'`, fork revision `sfdrop16`), "away from the app
  origin's Supabase session and payment state". `createMapBridge` is a typed RPC over `postMessage`: every
  command carries `_rid`, replies echo it, errors return `{_rid,_error}`, push events carry an `fmg:` prefix;
  commands issued before `fmg:ready` queue and drain in order; each inbound message must match BOTH the exact
  origin and the iframe's `contentWindow`; production refuses a missing or same-origin target. Commands:
  `settlementEngine:{placeSettlement, removePlacement, clearAllPlacements, restorePlacements, getViewport,
  setViewport, fitMap, getSpatialPack, exportThumb, saveSnapshot, loadSnapshot, resetMap, activateTool,
  deactivateTool, terrainUndo, terrainRedo, setTemplate, getTemplates, requestBurgList, setEmbeddedMode}`;
  push events `ready, burgSelected, settlementPlaced, placementRemoved, allPlacementsCleared, terrainChanged`.
  The world map mounts lazily (`AppViews.jsx:51`, `campaignLazy(() => import('./components/WorldMap.jsx'))`).
- **Direction of flow: settlement → burg, not burg → settlement.** A DM places an existing canon dossier ON the
  realm: `addPlacement({burgId, settlementId, x, y, cellId, via})` is the authoritative gate (campaign, canon,
  no duplicate) and records `mapState.placements[burgId] = {settlementId, x, y, cellId, placedAt}`, persisted as
  the campaign row's `burg_settlement_map` jsonb beside `map_seed` and `map_data` (which holds the FMG snapshot
  as an opaque string, `fmgSnapshot`). After a placement, an ADVISORY terrain check compares the FMG cell with
  the dossier's declared terrain and only toasts ("Its dossier and its geography will disagree") — it never
  rewrites the dossier.
- **`burgToConfig(burg)`** (`mapSlice.js:872`) maps a burg to a wizard config `{settType: popToTier(population),
  population, tradeRouteAccess: port ? 'port' : 'road', customName}` — ⚠ it has NO caller on the branch (grep:
  only its definition and two comments; the split doc's Appendix F lists a "burgToConfig dead-code sweep"). So
  no live path generates a settlement from a burg's data today.
- **World context at canonization** (sibling lane sf/generation §2.5, not re-derived here): the realm's cells
  (height, biome, river, centroid, neighbours) are captured once into a frozen `worldState.spatialDigest`
  (territories, neighbour tiers, distances, the gate CELLS between territories, route receipts) — cell ids, no
  coordinates; the campaign-level `canonizeCampaignWorldSpatial` is premium-only and generated-map-only
  (`campaignWorldPulseSlice.js:377–405`, CONFIRMED).
- **Consequence for item 72 ("the direction trade comes from").** None of this is IN the dossier object: the
  realm position (cell, x, y) and the realm gates live in CAMPAIGN state (`mapState.placements`,
  `worldState.spatialDigest`, the FMG pack), and no bearing between settlements is stored anywhere (one could be
  computed from two placed positions). Under the owner's rules they can reach the map only as OPTIONAL fields of the one dossier contract, never
  as a second hand-off, and without them the map derives (§6, C-9). CONFIRMED for where they live; PLAUSIBLE that
  bearings can be computed from placement positions or pack centroids (sf/generation said the same).
- *(Continuation, CONFIRMED:)* in the product the Azgaar fork generates geography ONLY — "no states, burgs, religions,
  or armies" (`docs/azgaar-bridge.md`, HEAD = branch); `burgSelected` keeps only the burg's id
  (`hooks/useMapBridge.js:159–161`); the burg fields an Azgaar map could carry (population, capital, state, culture …)
  appear only in the historical bridge example `docs/fmg-bridge.js`, which production does not use; SF's war layer
  stands in for a missing realm bearing with a stable per-pair hash direction (`approachOctant`,
  `domain/spatial/spatialSubstrateRead.js:212–222`). Details and consequences: §6 C-9.

## 5. What SettlementForge's carve-out plan expects of a settlement-map module

The plan is `docs/DESIGN_MAP_MODULE_SPLIT.md` (ledger HEAD; the file is not on the product branch) with the owner
rulings it cites (ODQ §724–§739, §764.5, §925.7). It was written on 2026-08-29 for SF's OWN new map program — its
judgment J-SPLIT-1 defines "settlement-layer mapmaking" as that program — so it describes the slot our module would
fill, not a specification for us. Under our owner's roadmap what we build stays the base until reconciliation, and the
reconciliation is the owner's. Each expectation is paired with where our design stands.

| # | the plan expects (source; CONFIRMED as read) | our design | status |
|---|---|---|---|
| E-1 | a separate program with its own package identity and its own repository "from day one" (split §11.1 item 2); a new package identity because the product has its own, different `townMap/fabric` (Appendix B §4) | `plat/` is its own repository of `@plat/*` packages (§14); no `townMap` or `fabric` package | HOLDS (CONFIRMED from §14's list). The plan's REASON — GPL-3 — is withdrawn for us (item 21: private for now); the separation stays as a design choice (item 21 (d), §11.3, J-A21.81) |
| E-2 | the product consumes the module's OUTPUT, never its code; "The private client bundle must NEVER import/link the module's JS"; the module runs as a build-time or generation-time renderer, a separate process or service, or an isolated iframe origin like the realm fork's; it "consumes the plan and emits SVG; the product ships the SVG as data" (split §11.1 item 3) | §11.3's bridge carries data only, the module in its own bundle (worker, iframe or service); §11.2's in-page `PlatApi` would be imported by a host page | HOLDS if SF uses the bridge, not the facade (C-2). Beyond shipped SVG, our live view and editing (§11.2 `view`, §7) need the iframe or a worker |
| E-3 | a serialized, versioned data boundary: "the module never links engine code, the engine never links module code; they exchange versioned data" (J-SPLIT-2; split §8) | the envelope `{ plat: 1, … }`, `ready { outputVersions, schemaVersion }`, the output-version handshake (§11.3) | HOLDS |
| E-4 | PLANNING IN SF'S ENGINE, DRAWING IN THE MODULE: "The engine emits the plan; the module draws it" — formalising the fields SF's own module read from the legacy model (tier, terrain, trade access, walls; water; districts with category and wealth; buildings with anchor and district), its spine's `partitionInputs`, and a fifteen-field illustrator hand-off (ledger §723.6, not read) (split §2; Appendix B §3) | PLAT plans AND draws (§1); it derives what the dossier lacks (item 20 (h) (ii)) and never makes the map depend on the dossier growing a new artifact (item 20 (h) (iv)) | MISMATCH of seams, not a defect on either side: SF's plan puts the seam after planning, ours at the dossier. Which one the product adopts is the owner's call (Q-1). If SF ever emits a plan, its parts can enter as OPTIONAL hints under (iv) (PLAUSIBLE); the current layer depends on neither answer |
| E-5 | the module REPLACES the engine's retained spatial substrate at "module-land" (split §11.2 J-STRIP-1; ODQ §738.1) — SF's own geometry summary (district centroids, flammability, density; district adjacency; eight wall segments with strength; gates), derived from the legacy model at world canonisation, stored in campaign state, behind the dormant flag `spatialConsequenceEnabled`, read by ten files — the world-pulse fire and siege kernels among them (this file, §3 item 6) | no door carries map facts into a host's simulation; §11.3 forbids any message that writes, patches or proposes a change to the dossier; exports are one-way outputs any host may read | QUESTION (Q-2). The substrate is not the dossier, so a host READING a map export keeps item 20 (a)'s letter; but a substrate built with the users' own map edits (a drawn wall, a moved gate) would let a map edit steer simulated fires and sieges and so reach later dossier states — against item 20 (d)'s "never flows into the dossier" (PLAUSIBLE reading) |
| E-6 | BUILDING interiors are module scope: the dwellings program (~42 cars), the art-direction program (~17) and the CT-1b partition faces moved to the module (ODQ §739.1); the module's "interiors" are building interiors, not SF's character-interior volume (ODQ §925.7); SF's 3-D town portrait and interior domain stay at launch on the retained substrate, "portrait stays" meaning a fresh mount later (split §11.5) | the plan rung (item 28, §2.6) and the owner's floor-plan and click-elaboration rules; glTF and CityJSON carry building solids (§11.1) | HOLDS for our side (CONFIRMED); that SF's 3-D portrait could read our glTF or CityJSON is PLAUSIBLE |
| E-7 | the module arrives AFTER launch into a product with no settlement map: all six strip waves are on the branch (11 / 10 / 9 / 9 / 6 / 6 commits by `git log --grep`, the last "TE-STRIP-6 car 5: the terminal census lands", 2026-08-30); the CARTOGRAPHER tier lost its four settlement-map authoring rows (map editing, DM pins, change-view history, the fog table) and the lens rows; its spine (unlimited saves, custom content, living realm, map chains, export bundle) stays; `interiors` survives as a deferred ladder row (split §11.3; `config/entitlementLadder.js` header) | roles, knowledge keys and host-requested exports (§11.3) are the switches a host needs | HOLDS; what a map feature costs is paid-surface behaviour — the owner's in both programs (C-12) |
| E-8 | gates and loading: the module's gate sits outside the launch gate; a cutover re-freezes SF's census laws in the same act — test ratchet, size baseline, typecheck floors, observed-shape readers, route and chunk censuses, hazard registry (split §4); the product's map code was "imported by NOTHING eager", so first paint stayed byte-identical and the lazy chunks were pinned (Appendix A §3) | an iframe- or worker-hosted module adds only a mount and a bridge client to SF's bundle | HOLDS (C-10) |
| E-9 | tests without the engine: serialize the fixtures (settlement + model JSON per seed) rather than make SF's proprietary engine a dev-dependency of the module (Appendix B §8 item 2) | §17.1 (3), §14: no import, fixture or script path resolves outside `plat/` | HOLDS — dossier fixtures are copied JSON (sibling sf/generation §8.8 (10)) |
| E-10 | map-minted tuning constants are module-side; the legacy coastal-wall defect died with the legacy surface (split §11) | our constants are our tables | N/A |
| E-11 | publication hygiene: the scrub list, upstream notices, a contributor agreement before any outside pull request (split §5 and §11.1 items 6–7) | private for now (item 21); the clean-room chain (§17.1) keeps later options | N/A now |

**The owner's own words in SF's record (CONFIRMED as text).** SF's review programme recorded on 2026-07-14, as an
owner-parked aspiration, "THE LIVING SETTLEMENT MAP: a settlement-layer map procedurally DETERMINED BY the dossier and
EVOLVING WITH it" — a calamity's ruined quarter, a boom's new district, reconstruction visibly raising beams — with
"the DEEP living map — persistent scarring history" parked last (`docs/COMPREHENSIVE_REVIEW_PROGRAM.md`, ledger HEAD,
lines 403–409 and 648–652). It is the intent our items 22 and 67 carry.

## 6. Constraints on our data protocol (§11 and §14)

Each constraint gives the SettlementForge fact (label and source), the part of our design it bears on, where our
design stands, and — for a gap — a CANDIDATE for the plan seat (A-sf/plan). Candidates are this lane's proposals,
vetoable; nothing here edits `docs/ARCHITECTURE.md`. Under the owner's rule of today (item 20 (h) (iv)) no candidate
asks SettlementForge to change: each is our own design text, an OPTIONAL field the port uses when present, or a
host-side note. Section numbers in this section name `docs/ARCHITECTURE.md` unless prefixed "split" (SF's
`DESIGN_MAP_MODULE_SPLIT.md`), "sibling" (`research/sf/dossier-generation.md`) or "above" (this file).

**C-1 · Transport and origin (§11.3 Transport).** SF fact (CONFIRMED: `docs/azgaar-bridge.md`, identical on the ledger
HEAD and the branch; `lib/mapRuntimeConfig.js:21`; `lib/mapBridge.js`): SF's one embedded map program, the Azgaar
fork, runs in an iframe on its OWN origin (`https://map.settlementforge.com`); the app's `/map/*` paths redirect there
"so the fork's relaxed script surface cannot execute with the app origin's Supabase session"; both ends check the exact
origin AND the source window and never post to `'*'`; a `frame-ancestors` policy lists the two production app origins;
every command carries a request id the reply echoes (errors as `{ _rid, _error }`, push events without one), and
commands sent before the child's `ready` are queued and drained in order. (The disk copy of that doc is stale and still
describes a same-origin fork — CONFIRMED by `cmp`.) Ours: `WindowPostMessageTransport` with a fixed target origin and an
allowlist of incoming origins; envelope `{ plat: 1, type, session, seq, logHead?, body }`. Status: HOLDS in shape, with
three small GAPS (CONFIRMED by reading §11.3 and by a grep for correlation and `ready` wording): the text does not say
that (a) the incoming message's source window is checked as well as its origin, (b) a reply (`query.result`,
`export.ready` / `export.refused`, `doc.applied` / `doc.rejected`) names the request it answers, (c) what happens to host
messages sent before `ready`. Candidate: §11.3 adds the source check; every reply carries the request's `seq` (for
example `re: seq`); the transport queues host messages sent before `ready` and delivers them in order.

**C-2 · Code linking (§11.2 against §11.3).** SF fact (CONFIRMED, split §11.1 item 3): the product never imports the
module's code. Ours: the bridge is SF's boundary (§11.3: "SettlementForge in its owner-staged phase included … loaded in
a worker, an iframe or a service"); `PlatApi` (§11.2) serves pages that embed the library. Status: HOLDS if SF uses the
bridge. Note: a worker started from our bundle would run our code on SF's app origin, beside its session and payment
state — what SF moved the Azgaar fork away from. Our code is ours and private, so this is a security-posture
preference, not a licence need. Candidate: §11.3 names "an iframe on the module's own origin" as the SettlementForge
configuration; worker and service remain for other hosts.

**C-3 · What SF can hand over, and the missing "previous dossier" (§11.4 door 2; §7.7 item 1).** SF fact (CONFIRMED: §2
and §3 above; sibling sf/generation §8.1): the legacy entry took the whole settlement object (with `mapEdits`)
in-process; SF has no change stream and no revision counter; after any number of weeks the host holds only the new
whole dossier. Ours: dossier changes enter as events with `EditBase.dossier`, in host order (§11.4, §7.7 item 1); the
sibling lane proposes one pure `diffDossiers(prev, next, receipts)` adapter (sf/generation §8.6 (2)). GAP (PLAUSIBLE,
from reading both): nothing says where `prev` comes from when a stored map is reopened after the dossier changed.
Candidate: the map document already carries every dossier fact it holds by its dossier key (item 20 (h) (i)); the port
diffs the incoming dossier against those carried facts, and records with each absorbed dossier change a hash of the
dossier facts after it — no SF-side history is needed (item 20 (h) (iv)), and C-4's rewind has what it needs.

**C-4 · SF's undo meets our forward-only dossier history (§7.4; §11.3 Logging).** SF fact (CONFIRMED in sibling
sf/generation §5.2 and §6.1, from `events/undoEvent.js` and `campaignAdvanceSession.js`): SF restores earlier dossier
states EXACTLY — `undoLastEvent` from the event log's snapshot, `undoLastPulse` from a pre-advance snapshot (session
only, ten deep). Ours: every dossier change is forward history, and a dossier event is never an undo or revert target
(§7.4; the round-1 repairs VDR-01 and VSH-05). Consequence (PLAUSIBLE, from the two rules): after an SF undo the DM sees
the dossier return exactly while the map applies a forward mutation — an added smithy's plot goes vacant, the use it
displaced stays displaced. Candidate (Q-3): the port recognises an SF undo when the incoming dossier's hash equals an
earlier absorbed state's (C-3) and offers a REWIND of the dossier events after that state when no map event depends on
them; otherwise it applies the forward mutation and reports why. This touches ruled undo text, so it is the plan
seat's and Fable's to rule.

**C-5 · When the map is built and fed (§11.2 `open`; §11.3 `doc.apply`; item 67).** SF fact (CONFIRMED: §3 above;
sibling §8.4, §8.8): the legacy model was derived only when a viewer asked; SF's own substrate is derived at world
canonisation behind a dormant flag; the realm capture happens at canonisation; one tick is one week; a catch-up may
run up to 26 weeks at once. Ours: `open`, then `doc.apply` in host order; `Works` in weeks (item 67). Status: HOLDS with
the sibling's timing adapter. Note (PLAUSIBLE): a map built only when opened absorbs everything since its last absorbed
dossier as one batch, its interior weeks recovered from SF's receipts (sibling §8.4).

**C-6 · Persistence of map state (§11.3 "the host is the store"; item 20 (d)).** SF fact (CONFIRMED): the dossier
persists as the `data` jsonb of a `settlements` row (`lib/saves.js`); the legacy map kept its state INSIDE the dossier
blob (`settlement.mapEdits` — cosmetic, anchor-keyed, absent ⇒ byte-identical, key names chosen to survive SF's public
filter); the realm map's snapshot (~1 MB) is stored on the CAMPAIGN (`mapState.fmgSnapshot`, the `map_data` column)
and fingerprinted for dirty checks instead of re-serialised (azgaar-bridge.md, "Snapshot flow" — doc text; the sync
code was not read). On the branch the map-edit writer `applyMapEdit` and the fog writer `applyFogEdit` are RETIRED; the
save-time stamp `mapEdits: { layoutLawVersion: 2 }` is alive and load-bearing for SF's substrate and interior
footprint; old saves' keys are honoured on read, never migrated (`store/operationRegistry.js:313–345`). Ours: the host
stores our document as an opaque artifact (item 20 (d)); `logHead` (128-bit) is a ready fingerprint; a document is at
most 3 MB at CITY (§2.9, §11.3) against SF dossiers of 45–261 KB (sf/outputs). Status: HOLDS. Host-side note (not a
request): keep the `.plat` beside the dossier — its own row or column keyed by settlement id, fingerprinted by
`logHead` — not inside `settlement.data`, where it would ride every save, sync and gallery projection at about ten
times the dossier's size and sit under SF's public filter (C-8). Our port ignores `mapEdits` entirely (sibling §8.8 (9)).

**C-7 · Identity (§6.3; item 20 (h) (v)).** SF fact (CONFIRMED, `domain/townMap/anchors.js`): SF's own map keyed an
institution by `cat:<catalogId>`, else `uid:<localUid>`, else `name:<slug(name)>`, and a district by its derived
`district.<snake>` id, stating that "an array index is a false identity"; PLAUSIBLE hazard: two instances sharing one
`catalogId` get one key. Ours: stable addresses (§6.3) and the proposed binding table (item 20 (h) (v); sibling §8.5).
Status: HOLDS. Candidate: the binding table's dossier-key side reuses SF's precedence, adds the sibling's `#1…#n`
expansion of collective records, and separates same-key instances by SF's array order ("the dossier's own ordering").

**C-8 · Public, gallery and player projections (§11.1 Knowledge; §11.3 view keys).** SF fact (CONFIRMED,
`domain/display/publicSafe.js` 1–120 and 320–345; `lib/civility.js` header): SF's public projection FAILS CLOSED — a
top-level allowlist (`spatialLayout` is on it; `mapEdits`, `urbanFabric` and `fogSessions` are not) plus a recursive key
denylist (`PRIVATE_KEY_RE`, tokens including `seed`, `_config`, `secret`, `private`, `dm`, `gm`, `hook`, `compass`,
`chronicle`, `notes`, `decrees`); the settlement's `_seed` and `_config` are SECRET on every shared or gallery surface
(the "seed posture"); flagged words in private-origin text render VEILED on public shares — a projection, never a
storage write. Ours: document formats (they carry the recipe, the seed and every name) go only to a key of tier
`secret`; hosts send every other viewer pictures and interchange exports (§11.1). Status: HOLDS for the secrecy of
places; three GAPS. (a) SEED — if the port passes SF's `_seed` as our seed, every `.plat` carries SF's secret seed, from
which SF's DM-private content could be regenerated (PLAUSIBLE). Candidate: the port derives our seed one-way, e.g.
H128("plat:sf-seed" ‖ `_seed`) — the same determinism, nothing reversible. (b) CIVILITY — our SVG draws names as glyph
outlines (§11.1), so SF cannot veil them afterwards. Candidate: `export.request` may carry a per-export display-name
table (dossier key → text), applied only inside that export — a projection, never stored (SF's storage law and our
item 20 alike). (c) KEY NAMES — if SF ever keeps map state inside the dossier blob, its keys must avoid SF's private-key
tokens, as SF's own `mapEdits` schema does — a host-side note only.

**C-9 · World context from the realm map (§11.4; item 72's trade direction).** SF facts (CONFIRMED unless marked): in
the product the Azgaar fork generates GEOGRAPHY ONLY — "no states, burgs, religions, or armies"; SF draws its own
settlements, routes and supply overlays on top (azgaar-bridge.md). A settlement is generated first — the manual wizard
cannot know its site, because placement needs an already-canon save — and placed afterwards (weave verification, HEAD,
lines 466–467); a placement records `{ burgId, settlementId, x, y, cellId, via }` in campaign state
(`hooks/useMapBridge.js:162–181`); a selected burg keeps only its id (`:159–161`); `burgToConfig` has no caller (§4 above). The
historical bridge example shows what an Azgaar burg would carry — name, x, y, population, port, capital, citadel,
walls, state, culture, cell, feature — but production never forwards it (`docs/fmg-bridge.js` lines 1–140; SF's
validation row of 2026-08-11 found the `capital` flag "severed three times before app state"). Realm geography reaches
the campaign as the frozen spatial digest (cell ids, no coordinates; sibling §2.5). SF holds NO settlement-to-settlement
bearing anywhere (the validation row of 2026-08-11); its war layer takes an attacker's approach direction as a stable
hash of the two settlements' ids, noting that a realm bearing "would be more precise but requires the (often-absent)
spatial digest + pack" (`domain/spatial/spatialSubstrateRead.js:212–222`, branch). Owner rules: world context reaches
the map only through the one dossier contract (owner, 2026-09-26); optional fields only (item 20 (h) (iv)). Status: HOLDS
as a rule. Candidates: (a) the port declares an OPTIONAL realm block inside the one dossier contract — partner bearings
and weights, the settlement cell's terrain, river and coast (the sibling's `tradePartners[]`, sf/generation §8.6 (6));
(b) without it, each partner's direction is a map fact derived under item 72 and seeded per partner from that partner's
dossier key, so it never moves when unrelated facts change (SF's hash-direction precedent, done our way); (c) when true
bearings arrive later — a DM places the town on the realm — the port first turns the map's north (the geo anchor's
`bearingDeg`, §11.1) to fit the derived gates to the true bearings, a change of no geometry, and moves gates or roads
only for the residual, by least disruption (item 22). All PLAUSIBLE, vetoable. **For the owner:** the fusion today feeds
GEOGRAPHY — terrain, rivers, coast and a placed town's position — not Azgaar burgs' population, culture or state
(CONFIRMED for the product's embedded mode; an imported Azgaar map carrying burgs was not examined).

**C-10 · Loading and first paint (§11.2 worker boundary; §12).** SF fact (CONFIRMED): SF's law was that map code is
"imported by NOTHING eager", first paint stays byte-identical and lazy chunks are pinned (split Appendix A §3); the
realm map mounts lazily (`AppViews.jsx:51`). Ours: generation needs no cross-origin isolation (§11.2); the tile worker's
shared columns are optional (§8.9). Status: HOLDS. Note (PLAUSIBLE, not checked): SF's app is probably not cross-origin
isolated, so our shared columns stay off inside SF and the fallback is the SF path. Candidate: a tiny, dependency-free
host client for the §11.3 bridge, so SF's lazy chunk holds only a mount and that client.

**C-11 · Exports that SF ships as data (§11.1).** SF fact (CONFIRMED): SF's plan ships the module's SVG "as data"
(split §11.1 item 3); its legacy surface fed PDF plates, card thumbnails, public dossier pages and VTT/Foundry exports
(Appendix A); SF keeps security guards against stored scripting on gallery snapshot import (split §11.4). Ours: SVG text
by default as outlines with the label text in `aria-label` and `<title>`, a `<metadata>` JSON map, editable `<text>` on
request (§11.1). GAP (CONFIRMED by grep: §11 says nothing about escaping text or about active content): names reach
exports from the dossier (SF custom content, AI-written text) and from other users' edits. Candidate: an §11.1 bar —
every text node, attribute and metadata string XML-escaped; the SVG writer emits no script, no event attribute, no
`foreignObject` and no external reference; a CI bar runs hostile names through every exporter and asserts inert,
well-formed output.

**C-12 · Roles, audiences and entitlements (§11.3 Roles, view keys).** SF fact (CONFIRMED): SF gates by tier and share
mode — the DM, the player view, the DM-full share, the anonymous gallery; the stripped CARTOGRAPHER map rows were map
editing, DM pins, change-view history and the fog table (split §11.3). Ours: roles `owner` / `editor` / `viewer` given by
`doc.load`; knowledge per viewer, raised only by the host; exports requested by the host. Status: HOLDS. Candidate: a
mapping table in the port — DM → `owner` (key `secret`); a co-DM → `editor`; a player → `viewer` (key `public`, raised
place by place by the DM's `view.set`); anonymous and gallery → pictures only under key `public`; a DM-full share →
pictures under key `secret`, never the document (§11.1). What each feature costs stays the owner's.

**C-13 · Determinism and versions (§6; §11.3 version handshake; item 22 (c)).** SF fact (CONFIRMED): SF's seed stays
fixed under edits — `_seed` is a WORLD-class key and "rederive never mints" (`docs/DESIGN_FP_ARCH_EDITOR.md` line 287,
branch); SF forks random streams by label (`${_seed}::town-map:v1`); SF's version law keeps lived worlds still — old
canons keep their version axes forever (`docs/DESIGN_FMG_WEAVE.md` §1); the same seed yields a different settlement on
another SF line at the same `generatorVersion` (sibling §4.5). Ours: map = f(seed, ordered dossier history, map edits);
the output-version handshake; a frozen read-only view for a version a client cannot replay (§11.3). Status: HOLDS — the
map never regenerates SF (sibling §8.6 (7)), so SF's cross-line differences never reach our replay.

**C-14 · Host code across the boundary (§11.4 door 4; §14 `ContentProvider`).** SF fact (CONFIRMED, split §11.1 item 3;
our item 21 (d)): only data crosses. Ours: door 4 runs a host's `ContentProvider` inside the module after the double-run
check, and the bridge vocabulary has no provider request or reply. So for SF, host content arrives only as data —
dossier events (door 2) and tables (door 3); door 4 serves in-page embedders. Status: HOLDS (what the dossier lacks is
derived, item 20 (h) (ii)). Candidate: one line in §11.4 saying so.

**C-15 · Fixtures and the port's package (§14).** SF fact (CONFIRMED, split Appendix B §4 and §8): serialized fixtures,
no engine dev-dependency, a package identity of its own. Ours: §17.1 (3), `@plat/*`. Status: HOLDS. Candidate for item
20 (h)'s §14 home "the port": SF's shapes enter in exactly ONE package — e.g. `@plat/port`, depending on `model` and
`edit` types and imported only by `api` and the reference app's host glue, as §14 admits each runtime library in one
adapter file. Alternatives, rejected here: inside `@plat/api` (fewer packages, but SF shapes beside the generic bridge);
inside `@plat/edit` (wrong direction — editing must not know a host).

**C-16 · The map→engine channel (SF's "door 1").** See E-5 and Q-2.

**C-17 · Telemetry.** SF fact (CONFIRMED: `docs/analytics-event-taxonomy.md` line 177; `lib/mapLayerAnalytics.js`
1–30): SF's map analytics carry coarse bands and "never coordinates". Ours: `view.changed` and `entity.selected` carry
positions and ids. Host-side note only: SF bands before it logs.

| id | status | home in our design | candidate, in one line |
|---|---|---|---|
| C-1 | HOLDS, small gaps | §11.3 Transport | check the source window; replies carry the request's `seq`; queue before `ready` |
| C-2 | HOLDS | §11.2, §11.3 | name "iframe on the module's own origin" as the SF configuration |
| C-3 | GAP | §11.4, §7.7; item 20 (h) | diff against the map's carried dossier facts; a hash per absorbed change |
| C-4 | QUESTION | §7.4, §11.3 Logging | rewind on an SF undo when hashes match and nothing depends (Q-3) |
| C-5 | HOLDS | §11.2, §11.3; item 67 | none (the sibling's timing adapter) |
| C-6 | HOLDS | §11.3; item 20 (d) | host-side: store beside the dossier, fingerprint by `logHead` |
| C-7 | HOLDS | §6.3; item 20 (h) (v) | reuse SF's anchor precedence; `#1…#n`; array order |
| C-8 | GAPS | §11.1 Knowledge; §6 | one-way derived seed; per-export display names; key-name note |
| C-9 | HOLDS as a rule | §11.4; item 72 | optional realm block; per-partner seeded directions; fit north first |
| C-10 | HOLDS | §11.2, §8.9, §12 | a tiny host client |
| C-11 | GAP | §11.1 SVG | the inert-export bar |
| C-12 | HOLDS | §11.3 Roles | an audience → role and key table in the port |
| C-13 | HOLDS | §6, §11.3 | none |
| C-14 | HOLDS | §11.4 door 4 | one clarifying line |
| C-15 | HOLDS | §14, §17.1 | one port package |
| C-16 | QUESTION | §11.3 one way | Q-2 |
| C-17 | HOLDS | — | host-side note |

## 7. Documents chosen not to read, and why — with the search denominator

**The denominator (CONFIRMED, executed).** Every top-level file under `docs/` on the product branch (189 files) and on
the ledger HEAD (228 files) was exported by `git show` into `scratchpad/sf/seam/docs-{branch,head}/` and searched for
seventeen seam patterns (`MODULE_SPLIT`, "map module", "settlement-layer map", "plan artifact", "module-land",
`buildTownMapModel`, `mapEdits`, `spatialSubstrate`, `MapTabShell`, `townMapLazy`, `burgToConfig`, `addPlacement`,
`burg_settlement_map`, `placeSettlement`, `burgSelected`, `fromBurg`, "module land"); 33 HEAD files and 21 branch files
hit (`scratchpad/sf/seam/doc-hit-table.txt`). Files without a hit were not opened; the sub-directories of `docs/`
(`briefs/`, `design-notes/`, `implementation/`, `review-r2/` and others) were not searched. Dispositions:

- **Read in full, or in the ranges §0 gives:** `DESIGN_MAP_MODULE_SPLIT.md`, `DESIGN_FMG_WEAVE.md`, `azgaar-bridge.md`,
  `DESIGN_MAP_DOORS.md` (see the table), `docs/fmg-bridge.js` (lines 1–140 of 262).
- **Hit lines read in context only:** `OWNER_DECISION_QUEUE.md` (the entries §0 lists), `FABLE_VALIDATION_QUEUE.md`
  (three rows), `DESIGN_FMG_WEAVE_VERIFICATION.md`, `REVIEW_FMG_RECONCILIATION.md`, `COMPREHENSIVE_REVIEW_PROGRAM.md`
  (lines 396–412 and 640–656), `COMPREHENSIVE_REVIEW_2026-08-01.md`, `DESIGN_CONTENT_PLANE.md`,
  `DESIGN_AI_CAPABILITY_LADDER.md`, `DESIGN_FP_ARCH_EP.md`, `DESIGN_FP_ARCH_EDITOR.md`, `DESIGN_FP_ARCH_WF.md` (a false
  hit: "each module lands"), `ENGINE_DEFECT_DISPOSITIONS.md`, `DEFERRAL_SWEEP_LAUNCH_PATH.md`, `DESIGN_HORIZON.md`,
  `DESIGN_W_SEAT.md`, `DESIGN_W_COIN.md`, `HANDOFF_CURRENT.md`, `HANDOFF_2026-08-01_PAUSE.md`,
  `PHASE55_EXECUTION_PLAYBOOK.md`, `PROVENANCE_MAP.tsv`, `analytics-event-taxonomy.md`, `FABLE_RETROVALIDATION_QUEUE.md`,
  `A_PLUS_ROADMAP.md`.
- **Hits counted, files not opened:** `COMPREHENSIVE_REVIEW_2026-07-15.md` (a July review of the legacy product, since
  stripped), `SETTLEMENT_CAPABILITY_ATLAS.md` (a 1.6 MB capability atlas; its 53 legacy-map hits describe the stripped
  surface, its 3 realm hits were not read), `SITE_COHERENCE_AUDIT.md` and `SITE_COHERENCE_PLAN.md` (website audits of
  the stripped surfaces). PLAUSIBLE that none adds to the seam beyond §3; a reader wanting certainty greps the atlas's
  realm hits.

**Not read — named in the brief, or SF's own map program or map design by SF's own classification:**

| document | where | decision and reason |
|---|---|---|
| `DESIGN_SETTLEMENT_MAP.md` | HEAD, branch | named in the brief (the legacy map's design) |
| `DESIGN_ILLUSTRATED_TOWN.md` | disk only | named in the brief |
| `map-corpus/`, incl. `docs/GENERATION-SPEC.md`, `MORPHOLOGY-PLAN.md`, `MORPHOLOGY-CONTEXT.md` | disk | named in the brief; file names listed only |
| `THE_MAP_SUITE_CONSTITUTION.md` | disk only | classified by the first run from its opening (about 35 lines): "SUPERSEDED FOR THE SETTLEMENT MAP", a design of how SF draws a town; not read further. Disclosure: this continuation displayed that triage file while resuming; nothing from it is used |
| `DESIGN_TOWN_CARTOGRAPHY.md` | HEAD, branch | filed "product-map" by SF's own roster (split Appendix B §7) |
| `DESIGN_FP_ARCH_MF.md`, `DESIGN_FP_ARCH_PG.md`, `DESIGN_FP_ARCH_CN.md` | HEAD only | map-program parts (the split's scrub list names MF's "clone" language and measured palette tables); absent from the product branch |
| `DESIGN_SPINE.md`, `DESIGN_SPINE_COMPLETION.md`, `SPINE_DECISION_2026-08-26.md`, `DESIGN_REGISTER_PROGRAM.md`, `DESIGN_REG_GROW.md` | HEAD only | "Map-program family" by SF's roster (Appendix B §7) |
| `DESIGN_DWELLINGS_PROGRAM.md`, `DW0-CHARTER-COMPILED.md` | HEAD only | the dwellings / interiors program — module-side by owner ruling (ODQ §739.1), SF's own map design |
| `TOWN_SCENE_3D_ARCHITECTURE.md` | HEAD, branch | the 3-D town scene, a drawing surface; its one seam fact (it reads the substrate and `mapEdits`) is taken from code (§3) |
| the other `DESIGN_FP_*` files | branch | CLASSIFICATION CORRECTED: SF's roster of 2026-08-29 called all 27 `DESIGN_FP_*` files the "map-program family", but the branch's `DESIGN_FP_ARCHITECTURE.md` opens as "THE FP ARCHITECTURE (thirteen programs compiled for build)" — spine, grammar, information, trade, faith, populations, interior, couplings, espionage, wayfare, habit, war circulation, advance epoch: simulation programs (lines 1–14 read for triage; ODQ §934.85's "SEAM FAMILY" is about disputes between neighbouring settlements, not the map seam). Not read — simulation design is the sibling lanes' ground; only their seam-hit lines were read |
| `DESIGN_MAP_DOORS.md` | HEAD = branch, 143 lines | door 1 (the map→engine substrate) is seam and is used (§3 item 6, E-5). Disclosure: the first run read the whole file (its scratch copy is byte-identical); doors 2 (a fog / session table layer) and 3 (building interiors) are SF map-feature designs outside this lane — only their persistence and projection laws are used (blob-resident cosmetic state, no dossier writes, never in anonymous projections), nothing of their design |
| `REVIEW_FMG_PUBLISHED_MATERIALS.md`, `fmg-fork.md` | HEAD (the second also branch) | realm-map review and the fork's upgrade procedure; no seam hit; not opened |

**Code not read (the first run's scope, unchanged):** SF's town-map drawing and layout bodies (`townMapModel.js` beyond
the entry, `townLayoutV2.js` beyond its input typedef and signature, `massing.js`, `mapDress.js`, `glyphAssign.js`,
`siteGenesis.js`, `lynchRubric.js`, `asymmetrySources.js`, `arch/`), the orphan map-program line, and SF's interior and
town-scene domains beyond grep.

## 8. For the plan seat and the owner

**Owner questions (batched, each with a recommendation).**
- **Q-1 · Which seam does the product adopt?** SF's plan puts the seam after planning (SF's engine emits a plan, the
  module draws it); ours puts it at the dossier (the module plans and draws from the dossier as it is).
  Recommendation: ours — item 20 (h) already makes the map derive what the dossier lacks and forbids asking SF for new
  artifacts; a plan from SF, if one ever exists, enters as optional hints. Owner-gated (cross-program architecture);
  the current layer depends on neither answer.
- **Q-2 · SF's "door 1": may SF's simulator read the map's geometry?** (a) never — SF keeps its own headless substrate
  and item 20 is untouched; (b) a read-only summary export built from the seed and the dossier history ONLY — no user
  map edit can steer a fire or a siege, item 20 (d) intact; (c) including map edits — "the stone shapes events", as SF's
  door 1 wanted, at the cost of map edits reaching later dossier states. Recommendation: (b) if the owner wants door 1
  at all, otherwise (a). Owner-gated (a new capability across the one-way boundary).
- **Q-3 · What does an SF undo do to the map?** (C-4) Recommendation: rewind when the incoming dossier equals an
  earlier absorbed state and no map event depends on what is rewound; otherwise a forward mutation, reported. For the
  plan seat and Fable (it touches ruled undo text in §7.4).
- **Q-4 · The fusion framing.** The product's Azgaar fork feeds geography and placed positions — not burgs'
  population, culture or state — and no bearing between settlements exists anywhere (C-9). Recommendation: design the
  optional realm block now as types only (the no-defer rule), and let item 72's derivation carry trade direction until
  SF supplies bearings.

**Candidates for the plan seat (vetoable; none edits the design here):** C-1 (bridge replies, source check, before
`ready`), C-2 (SF configuration = an iframe on the module's own origin), C-3 (diff against carried dossier facts; a
dossier hash per absorbed change), C-8 (a one-way derived seed; per-export display names), C-9 (optional realm block;
per-partner seeded directions; fit north before moving gates), C-10 (a tiny host client), C-11 (the inert-export bar),
C-12 (an audience → role and key table), C-14 (one line in §11.4), C-15 (one port package).

**Not checked by this lane.** Whether SF's app origin is cross-origin isolated (C-10); the sync code that fingerprints
the realm snapshot (C-6 rests on the bridge doc's text); an imported Azgaar map that carries burgs (C-9); the capability
atlas's three realm hits; the full bodies of the weave-verification and FMG-review files; which WEAVE cars have landed
on the branch (sibling §2.7 records the terrain-disagreement receipt as built).

**No write into SettlementForge (CONFIRMED).** Both runs of this lane used only `git show` and `git log` (plus `cat`,
`sed`, `grep`, `cmp`, `ls`, `stat` and `find` reads) on `/Users/cstokes/Desktop/settlement-engine`; every output went to
`scratchpad/sf/seam/`. SF's `.git/index` still carries its 2026-09-24 11:38:54 mtime, and `find -newer` over the SF tree
(excluding `node_modules/`, `.claude/worktrees/` and `map-corpus/plates/`) against this pass's first scratch file
(17:44:35) and against its write-phase marker (17:55:24) listed nothing.

## Fable review (2026-09-27) — B-sf/seam

**Verdict: CORRECTED** (Fable reviewer, lane fable-review/main/sf; the full review is `docs/fable-review/main/sf.md`).

**Re-derived and CONFIRMED** on the scratch copy (equal to `5d699cc68` by blob hash) and by read-only git: the entry's
signature `export function buildTownMapModel(settlement, mapEdits = null)` (`domain/townMap/townMapModel.js:336`, one grep
line); STRIP-1's comment (`components/OutputContainer.jsx:49-51`); `PRODUCTION_MAP_ORIGIN` and `sfdrop16`
(`lib/mapRuntimeConfig.js:20-21`); `burgToConfig` defined at `store/mapSlice.js:872` with no caller; `approachOctant`'s hash
direction and its comment (`domain/spatial/spatialSubstrateRead.js:213-223`); `applyMapEdit` and `applyFogEdit` retired, the
`{ layoutLawVersion: 2 }` minting alive and load-bearing (`store/operationRegistry.js:313-345`); `PRIVATE_KEY_RE`'s tokens
(`domain/display/publicSafe.js:110`); the anchor precedence (`domain/townMap/anchors.js:50-56`);
`DESIGN_MAP_MODULE_SPLIT.md` absent from `5d699cc68` and present on the ledger HEAD; the six strip waves' commits on the
branch 11 / 10 / 9 / 9 / 6 / 6.

**Rulings (vetoable; the design homes are candidate amendments of `docs/AMENDMENTS-2026-09-27d.md`):**
- **E-4 / Q-1 — J-Fsf-1:** for our side the seam is at the dossier — the module plans and draws from the dossier as it is
  (`docs/DEFINITION.md` §1; item 20 (h) (ii), (iv)); a plan artifact from SettlementForge, if one ever exists, enters only
  as OPTIONAL hints. Whether the product adopts this module is the owner's reconciliation call, already parked.
- **E-5 / C-16 / Q-2 (door 1) — J-Fsf-3:** the module adds no door; its exports are one-way outputs. Owner-gated. The cost
  of option (b), which this file's recommendation leaves implicit: a canonical-only export shows the simulator a town the
  user does not see (a fire "along a real street" may burn a street the user moved). Recommend (a) never; (b) only if the
  owner wants door 1 knowing that cost.
- **C-4 / Q-3 — J-Fsf-2, REJECTED as written:** no rewind. A host's restored dossier arrives as ordinary forward dossier
  changes; §4.7 S10b's vacant-first order and §4.11 (5)'s `formerUses` return what they can and the residue is reported
  with the matching absorbed state named (the plan's J-P5; 27d item 87). §7.4's rule — a dossier event "is likewise no
  `undo`, `redo` or `revert` target of a map event" — stays; item 22 (c) chose continuity over path-independence.
- **C-1, C-2, C-8, C-11, C-12, C-14, C-15:** right; carried by 27d items 73 and 85 (reply correlation `re`, the source-window
  check, the before-`ready` queue, the iframe on the module's own origin, the one-way seed, per-export display names, the
  inert-export bar, the audience table, the one port package). **C-3:** the map's carried dossier facts are the "previous
  dossier" (27d 74–75). **C-7:** no dossier of the 155 holds two records of one `catalogId` or one name; the `#k` ordinal and
  array-order tie-break (27d 74 (b)) cover the case. **C-9:** right; V71 notes that two realm placements' `x, y` give a
  placed partner's bearing without pack centroids.
- **Scope — J-Fsf-6:** the reads inside `src/domain/townMap/` (the entry's header, signature, input typedefs and first body
  lines; `anchors.js`; `mapEdits.js`'s container shape; the read-side headers of `fabricRead.js` and `ladderRead.js`;
  `institutionAssignment.js`'s header) are the INPUT side of the seam — what a map receives — which J67 names in scope;
  its literal exclusion of `src/domain/townMap/**` is read as the drawing and layout program. The first run's whole read of
  `DESIGN_MAP_DOORS.md` (doors 2 and 3) is a disclosed slip: only persistence and projection laws were used, nothing of
  their design reached any file of ours. Accepted, no contamination.
