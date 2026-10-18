# SettlementForge host ↔ FMG fork integration audit (settlement-engine @ 00b648c, 2026-10-02)

Audit date: 2026-10-16. Host clone: `/home/user/clausellstokes-lang/settlement-engine` (shallow, HEAD 00b648c). Upstream reference: `/home/user/maps-architecture/reference/fmg-src` (HEAD bae507ce, tags to v1.154.1) and the wiki Changelog. All paths below are relative to the settlement-engine root unless prefixed `upstream:`. Tags: [OBSERVED] read in code/schema/tests; [STATED] a host document says it; [INFERRED] reconstruction with reasoning. Clean-room: identifiers are named for citation only; no code is reproduced.

---

## 1. Summary

### Takeaway
SettlementForge embeds a **built `dist` of upstream Fantasy Map Generator v1.114.2 (upstream bump commit bb5039d7, 2026-04-09)**, re-branded, security-hardened, and driven over a typed `postMessage` RPC. In embedded mode the fork is forced to generate **geography only** (states, burgs, religions, provinces zeroed) [OBSERVED public/map/sf-bridge.js:123-150]. The host **never parses FMG's map format**: it stores the opaque `prepareMapData` text blob, a seed, and placement rows (`burgId → settlementId, x, y, cellId`) in FMG map-pixel space [OBSERVED src/store/mapSlice.js:153-178; src/store/campaignSlice.js:8-29]. The only structured geography that ever leaves the iframe is a one-shot read-only capture of seven pack arrays plus two grid arrays (`h, biome, r, p, c, fl, g` and `grid.temp, grid.prec`) [OBSERVED sf-bridge.js:1291-1330], from which the host builds a **frozen integer "spatial digest"** (territory, gates, tiers, distance matrix, route receipts, optional sea lanes/teleport/lakes/biome/climate sub-digests) at an entitled "spatial canonize" [OBSERVED src/domain/spatial/spatialDigest.js:587-916; src/store/campaignSpatialCanonize.js:58-229]. **Every settlement's own terrain, coast/river status, trade access and threat are chosen at generation from config, independent of the map** [OBSERVED src/generators/steps/resolveConfig.js:109-207; src/generators/terrainHelpers.js:22-34]; the map is consulted only afterwards, and disagreement is receipted, never reconciled ("genesis is sacred") [OBSERVED src/domain/worldPulse/routeNetworkGenesis.js:6-10; STATED docs/DESIGN_ROUTE_LIFECYCLE.md §1 Law 2]. The host's own spatial generators (instant-world plan, realm plate renderer, autoplacement, road-edge selection, town map/cartography) are deterministic but **none of them produces realm terrain**; the realm plate is a landing-page illustration and the town map is a dossier projection with no realm-map input. No host document states an intent to replace FMG; the nearest statements are "no headless FMG reconstructor for v1" [STATED docs/PHASE55_SPATIAL_ENGINE_DESIGN.md:1119-1122] and "keep the fork small, do not hard-fork" [STATED docs/fmg-fork.md:128-130], while ASSESSMENT.md lists the fork as an open structural risk [STATED ASSESSMENT.md:10,35].

---

## 2. The fork: upstream version and every host modification

### Takeaway
The fork is upstream's Vite build output of v1.114.2 (plus its `public/` tree), with (a) two host-added files (`sf-origin.js`, `sf-bridge.js`), (b) ~160 lines of inline patches in `main.js`, (c) escaping/security patches across ~30 `modules/**` files, (d) branding/texture/licence pruning, and (e) a **rebuilt bundle** that renames the `Burgs` module global to `Settlements` — which contradicts the host runbook's claim that the bundle is "FMG-native (no SF markers)".

### 2.1 Upstream version identification [OBSERVED]
- Version string: `VERSION` is `1.114.2` [OBSERVED public/map/versioning.js:19]. The `latestPublicChanges` list in that file matches upstream's 1.11x era (routes rework, Dark Seas preset, configurable longitude).
- Upstream commits: `bb5039d7` "update burg-editor styles and bump version to 1.114.2" dated **2026-04-09**; next bump `8b78c9df` to 1.114.3 on **2026-04-20**; `ca873321` 1.114.4 on 2026-04-22 [OBSERVED upstream git log -S].
- Wiki dating: Changelog section **[1.110] – 2026-01-22**; next section **[1.119] – 2026-04-27** lists 1.114.6 ("Lakes layer: toggle and reorder lakes independently"), 1.116.0 (Fill brush, undo), 1.117.0 (Minimap), 1.118.0 (jagged coastlines) [OBSERVED /home/user/maps-architecture/reference/fmg-wiki/Changelog.md:124-135]. So the fork predates minimap, fill brush, jagged coastlines, eroded terrain/satellite texture (1.123), economy (1.124/1.125) and everything after.
- Host corroboration: the TinyMCE subtree "entered this repository in a single commit on 24 April 2026" [STATED THIRD-PARTY-NOTICES.md §1.4]; the notices §1.1 name fork revision `sfdrop16`; `MAP_FORK_REVISION` is `'sfdrop16'` [OBSERVED src/lib/mapRuntimeConfig.js:20]; cachebusters in index.html carry `sfdrop15`/`sfdrop16` [OBSERVED public/map/index.html:8509,8524,8529-8534].
- [INFERRED] Drop date ≈ mid-April 2026, from the 1.114.2 window (2026-04-09 → 04-20) and the 24 April TinyMCE import.

### 2.2 File-layout comparison (fork vs upstream at bb5039d7) [OBSERVED]
- Upstream at that commit is a Vite/TypeScript project: `root: ./src`, `outDir: ../dist`, `publicDir: ../public` [OBSERVED upstream:vite.config.ts]; `src/index.html` loads `utils/index.ts`, `modules/index.ts`, `renderers/index.ts` as modules [OBSERVED upstream:src/index.html:8536-8538]; generators live in `src/modules/*.ts` (heightmap-generator, river-generator, burgs-generator, routes-generator, biomes, lakes, features, …).
- The fork holds 87 non-lib/non-art files. Of upstream's 83 `public/` files, 82 are present; **`sw.js` is absent** (deleted). Five files exist only in the fork: `LICENSE-FMG.txt`, `index-Bp79q281.js` (669,641 bytes), `index.html` (derived from upstream `src/index.html`, 264 ± diff lines), `sf-bridge.js` (1,728 lines), `sf-origin.js` [OBSERVED comm of file lists; wc].
- Sampling five upstream commits around the bump gives an identical diff total against the fork (556 lines over ten sample files), i.e. the differences are host modifications, not a base mismatch [OBSERVED].

### 2.3 Modification inventory (file → what changed → evidence)

| Area | File(s) | Host modification | Evidence |
|---|---|---|---|
| Bridge (new) | `public/map/sf-origin.js` | Resolves the single trusted `parentOrigin` from the iframe query, loopback-only fallback, exposes `window.__sfBridgeOrigin.postToParent` | [OBSERVED sf-origin.js:1-77] |
| Bridge (new) | `public/map/sf-bridge.js` | Entire RPC surface (see §3); embedded-mode overrides: `randomizeOptions` wrapped to force a curated template and zero `statesNumber`, `manorsInput/Output`, `religionsNumber`, `provincesRatio`; canvas sized to iframe; injected CSS hides burgs/labels/routes/borders/markers/zones/armies/emblems/rulers and all FMG chrome; custom `sfArchipelago` heightmap template registered with probability 0 | [OBSERVED sf-bridge.js:83-208] |
| Bundle | `public/map/index-Bp79q281.js` | Rebuilt from modified source: exports `window.Settlements` (no `window.Burgs`); upstream assigns `window.Burgs` | [OBSERVED bundle grep; upstream:src/modules/burgs-generator.ts:735] |
| Bundle | same | Emblem charge pick table pruned to the 104 shipped CC0 charges | [STATED docs/fmg-fork.md:173-185] |
| main.js | `public/map/main.js:8-31` | `INFO/TIME/WARN` gated on `PRODUCTION`; `ERROR` unconditional | [OBSERVED] |
| main.js | `:35-39` | Service-worker registration block removed; `sw.js` deleted | [OBSERVED; STATED docs/fmg-fork.md:28] |
| main.js | diff lines 66-67, 225-232; `:819` | `Burgs.*` → `Settlements.*` calls; seed null guards for `?from=MFCG` | [OBSERVED] |
| main.js | `:281` | Branded "cannot run serverless" text | [OBSERVED] |
| main.js | diff 84-96 | `?maplink=` must pass an `isTrustedMapLink` check | [OBSERVED] |
| main.js | `:366` | `generateMapOnLoad` bails when `pack` is empty | [OBSERVED] |
| main.js | `:428` | `toggleAssistant` early-return disables the OpenWidget remote chat | [OBSERVED] |
| main.js | `:620-687` | ~70-line drag-drop block: reads `application/settlementforge` payload, converts via `window.__sfScreenToMap`, mints `sf_<id>_<Date.now base36>` burg id, `findCell`, posts `fmg:settlementPlaced` through the origin contract | [OBSERVED] |
| main.js | `:1395` | Marker that the bridge moved to sf-bridge.js | [OBSERVED] |
| versioning.js | `:54-66` | Rebranded update dialog | [OBSERVED] |
| versioning.js | `:80-140` | `cleanupData` scoped to fork-owned localStorage keys/prefixes and `fmg`-named caches (H11) | [OBSERVED] |
| versioning.js | `:152` | `parseMapVersion` legacy two-part fix | [OBSERVED] |
| index.html | `:7-9, 31-60, 169, 411-412` | Title/meta/author rebrand; palette override `<style>` with `--sf-*` tokens and `body.sf-embedded` rules; module script re-pointed to `/map/index-Bp79q281.js`; `#titleName` "SettlementForge" | [OBSERVED] |
| index.html | diff | Google Tag Manager block, OG/Twitter meta, canonical link removed; About tab hidden; "Burg" labels → "Settlement"; texture dropdown cut from 26 options to the two estate paper-grain tiles | [OBSERVED diff] |
| index.html | `:8509-8534` | Script order `versioning.js?v=sfdrop15` … `general.js?v=1.113.1-sfdrop15` … `sf-origin.js` → `main.js?v=1.111.0-sfdrop16` → `sf-bridge.js` | [OBSERVED] |
| modules/ui/general.js | `:30, 92, 150-161, 394, 665` | `tip()` chokepoint hardening; handler lifetime fix; added `escapeHtml`/`sanitizeMapSvg`; `updateCellInfo` escaping; rebranded about text | [OBSERVED markers] |
| modules/io/load.js | `:335` | Loaded `.map` SVG segment sanitized; texture ref repointed | [OBSERVED; STATED fmg-fork.md:51,186] |
| modules/io/cloud.js | `:19, 123` | Dropbox token moved to sessionStorage; debug token log removed | [OBSERVED] |
| modules/io/export.js | `:403` | `@font-face` builder strips CSS-structural chars | [OBSERVED] |
| modules/ui/ai-generator.js | `:196-209` | BYOK LLM egress disabled by early return | [OBSERVED] |
| modules/ui/notes-editor.js | `:68, 161, 183` | TinyMCE loaded from local vendored copy; AI-apply path sanitized; notes JSON shape validated | [OBSERVED] |
| modules/ui/style-presets.js | `:32-35` | Embedded default preset forced to `ancient` | [OBSERVED] |
| modules/ui/options.js | diff | `THEME_COLOR` `#997787` → `#8a6a2a` | [OBSERVED] |
| modules/ui/layers.js | `:561` | Province label escaped | [OBSERVED] |
| modules/ui/{burg-editor, burgs-overview, burg-group-editor, markers-editor, markers-overview, military-overview, regiments-overview, regiment-editor, battle-screen, zones-editor, provinces-editor, labels-editor, rivers-overview, routes-overview, route-group-editor, diplomacy-editor, tools, editors, lakes-editor, relief-editor, world-configurator, namesbase-editor, biomes-editor, heightmap-editor}.js; modules/dynamic/{editors/states,cultures,religions-editor, hierarchy-tree, overview/charts-overview, auto-update}.js | per-file | `escapeHtml` wrapping of untrusted `.map` strings; small bug fixes (divide-by-zero, inverted lock icon, dead memo, `setTimeout` misuse, `{once:true}` listener, lake group sync, `Burgs→Settlements`); 2–54 diff lines each | [OBSERVED marker grep + per-file diff counts] |
| styles/*.json (12) | each | Texture `data-href` repointed to `paper-grain-light.png` | [OBSERVED diff] |
| manifest.webmanifest | | PWA identity rebranded, scope `/map/` | [OBSERVED] |
| dropbox.html | 3 lines | Local SDK (per runbook) | [OBSERVED count; STATED fmg-fork.md:224] |
| libs/ | | `umami.js` deleted; `openwidget.min.js` served but never loaded; `VENDOR-MANIFEST.json` SHA-256 pins for libs only | [OBSERVED; STATED THIRD-PARTY-NOTICES §1.2,1.6] |
| charges/, images/textures/ | | 234 of 338 charges removed (non-CC0); 23 textures replaced by 2 estate tiles | [STATED docs/fmg-fork.md:150-188] |
| heightmaps/ | | Retained upstream 23 PNG + import-rules.txt (Tangrams Heightmapper renders) | [STATED THIRD-PARTY-NOTICES §1.7] |

### 2.4 Removed/disabled upstream features in embedded mode [OBSERVED]
- Civilisation generation zeroed (states, manors/burgs, religions, provinces) [sf-bridge.js:139-150]; template choice restricted to six curated single-landmass templates plus `sfArchipelago` [sf-bridge.js:83-113].
- Native burg icons/labels/anchors, routes, borders, state halos, labels, markers, zones, armies, emblems, rulers and all FMG UI chrome hidden by CSS [sf-bridge.js:171-205].
- Service worker, Google Analytics, OpenWidget chat, BYOK AI, remote TinyMCE and remote Dropbox SDK removed or disabled (table above).
- Not removed: all upstream editors remain loadable (heightmap editor is driven through `activateTool`; rivers/coastline/lakes editors open by double-click inside the iframe) [OBSERVED src/components/map/TerrainToolbar.jsx:4-19; sf-bridge.js:1489-1532].

### 2.5 Inferences and discrepancies
- [INFERRED] Because the bundle exports `Settlements` and the fork's `modules/**` and `main.js` call `Settlements.*` (28 sites; the remaining `Burgs`-containing identifiers are local names such as `validBurgs`), the host must have rebuilt the Vite bundle from a **modified copy of upstream's TypeScript source**. That source is **not in the clone**: `package.json` has only `validate:map`; `scripts/` has `validate-map-fork.mjs` and no build; no `burgs-generator`/`BurgModule` source exists outside the bundle [OBSERVED].
- [STATED vs OBSERVED] `docs/fmg-fork.md:81-84` says the bundle "is FMG-native (no SF markers) … not diffed against upstream"; the same document's §5 says the bundle's pick table was patched [docs/fmg-fork.md:173-185], and the rename above shows further source-level change. The runbook's own upgrade step ("regenerate from the new release's build") would therefore drop the rename and break every `Settlements.*` call.
- [OBSERVED] The notices say the bundle is not hash-pinned (`SHIPPABLE_EXTS` covers libs only) [docs/fmg-fork.md:84]; ARCHITECTURE.md:446-447 records that `public/map/main.js` is outside all gates.
- [STATED] A known upstream bug (`addLakesInDeepDepressions` typed-array indexing) is deliberately left unfixed to preserve same-seed output [docs/fmg-fork.md:33].

---

## 3. The bridge protocol (both directions)

### Takeaway
A request-id-correlated RPC: the parent sends `settlementEngine:*` commands with `_rid`; the child replies `fmg:*Reply` echoing `_rid` (or `_error`); push events carry no `_rid`. Both ends validate `event.origin` and `event.source`; no wildcard target [OBSERVED src/lib/mapBridge.js:91-153; sf-bridge.js:1646-1668]. Data crossing is small: placement coordinates, the opaque snapshot text, road polylines, a thumbnail, viewport numbers, and the one-shot pack capture.

### 3.1 Transport and trust [OBSERVED]
- Parent creates the bridge against the iframe with an explicit `targetOrigin` (required in production; dev falls back to same origin) [src/lib/mapBridge.js:28-50, 56-59]; messages accepted only when origin matches and `event.source` is the iframe's `contentWindow` [:91-97]; only `fmg:`-prefixed types are handled [:105]. Default timeout 7,000 ms; queued until `fmg:ready` [:22, 195-213].
- Frame URL: `VITE_FMG_URL` (production `https://map.settlementforge.com/map/index.html`), with `v=<MAP_FORK_REVISION>` and `parentOrigin=<app origin>` appended [src/lib/mapRuntimeConfig.js:20-21, 146-152; STATED docs/ops/FMG_ORIGIN_RUNBOOK.md].
- Child installs nothing unless embedded and `parentOrigin` resolved [sf-bridge.js:50-61]; accepts commands only from `window.parent` at that origin [:1655-1656]; adds `sf-embedded` body class [:64].
- `useMapBridge` constructs the singleton, registers it in `spatialCaptureRegistry` so the lazy canonize path can reach the live iframe, installs a 15 s load watchdog, and wires push events into the store [src/hooks/useMapBridge.js:92-217; src/lib/spatialCaptureRegistry.js].

### 3.2 Parent → child commands

| Command (`settlementEngine:`) | Payload | Child behaviour | Reply | Evidence |
|---|---|---|---|---|
| `requestBurgList` | – | Filters `pack.burgs` to ids in `__sfPlacedBurgIds` | `fmg:burgListReply {burgs}` + push `fmg:burgList` | sf-bridge.js:292-307 |
| `placeSettlement` | `{settlementId,x,y,name,population}` (iframe screen px) | `screenToMap` via `#viewbox` CTM; `findCell`; mints `sf_<base36 time>_<random>` id; **does not add a burg** | `fmg:settlementPlacedReply {burgId,settlementId,name,population,x,y,cellId}` + push `fmg:settlementPlaced` | :509-553 |
| `removePlacement` | `{burgId}` | Legacy numeric-id burgs marked removed; set pruned | `fmg:placementRemovedReply` + push | :555-573 |
| `clearAllPlacements` | – | Legacy cleanup; set cleared | `fmg:allPlacementsClearedReply` + push | :575-592 |
| `restorePlacements` | `{placements[]}` | **No-op echo** (placements are React-owned) | `fmg:placementsRestoredReply {restored}` + push | :594-614 |
| `computeRoadNetwork` | `{edges:[{id,fromX,fromY,toX,toY,preferSea}]}` (map coords) | A* over `pack.cells` with biome/elevation/river/corridor-reuse/off-burg/coast-graded sea costs; land-vs-sea by re-scored difficulty × `SEA_ROUTE_BIAS` 1.15; `MAX_ITER` 25,000; batch-order dependent | `fmg:roadNetworkReply {paths:{id:{points,mode}}, diagnostics}` | :616-1255 |
| `getSpatialPack` | – | Copies `cells.h, biome, r, p, c, fl, g` and `grid.temp, grid.prec` to plain arrays; mutates nothing | `fmg:spatialPackReply {pack:{cells,grid}}` | :1291-1330 |
| `exportThumb` | `{size}` (64–1024) | Clones `#map` SVG, strips camera transform, rasterizes to JPEG 0.82 | `fmg:exportThumbReply {dataUrl,w,h}` | :1337-1390 |
| `getViewport` / `setViewport` / `fitMap` | `{cx,cy,scale,duration}` | Reads `#viewbox` transform / `zoomTo` / `resetZoom` | `fmg:viewportReply {cx,cy,scale,width,height,tx,ty}` | :363-392, 1392-1445 |
| `saveSnapshot` | – | `prepareMapData()` text | `fmg:snapshotReply {snapshot}` | :462-465, 1447-1454 |
| `loadSnapshot` | `{snapshot}` | `uploadMap(blob)`; re-installs observers; 300 ms settle | `fmg:snapshotLoadedReply` + push `fmg:snapshotLoaded` + `fmg:burgList` | :467-478, 1456-1471 |
| `resetMap` | `{seed?}` | `regenerateMap({seed})` (string seed → alea PRNG); undefined ⇒ random; 500 ms settle | `fmg:mapResetReply {seed}` + push `fmg:mapReset` | :488-499, 1473-1487 |
| `activateTool` | `{tool: heightmap|rivers|coastline|lakes|biomes}` | Calls FMG editor openers; pushes `fmg:terrainChanged` on activation only | `fmg:toolActivatedReply {tool,activated}` | :1489-1532 |
| `deactivateTool`, `terrainUndo`, `terrainRedo` | – | Closes jQuery dialogs / `HeightmapEditor.undo/redo` | respective replies | :1534-1565 |
| `setEmbeddedMode` | `{enabled}` | toggles body class | `fmg:embeddedModeReply` | :1567-1575 |
| `setFmgLayer` | `{layer: stateBorders|cultures|biomes|routes|rivers, visible}` | flips display on FMG `<g>` ids; lazily `drawBiomes` | `fmg:setFmgLayerReply {applied}` | :1583-1621 |
| `setTemplate` / `getTemplates` | `{templateId}` | sets `__sfRequestedTemplate` for the next regenerate | `fmg:setTemplateReply` / `fmg:getTemplatesReply {templates,current}` | :1625-1642 |

Parent typed surface mirrors this list [src/lib/mapBridge.js:277-336]; `computeRoadNetwork` and `setFmgLayer` are sent via the raw `call` [src/components/map/RoadsLayer.jsx:104; src/components/WorldMap.jsx:293-307]. Timeouts: `getSpatialPack`/`exportThumb`/`computeRoadNetwork` 20 s, `restorePlacements`/`saveSnapshot` 15 s, `loadSnapshot`/`resetMap` 30 s [mapBridge.js:291-318; RoadsLayer.jsx:104].

### 3.3 Child → parent push events and host listeners [OBSERVED]
- `fmg:ready {seed,width,height,templates}` — polled every 500 ms for `pack.cells` up to 60 s; re-emitted 2 s after `regenerateMap` [sf-bridge.js:1671-1727]. Listener: sets map ready, stores seed via `setMapSnapshot(null, seed)`, templates into component state [useMapBridge.js:149-158; WorldMap.jsx:82].
- `fmg:burgSelected {burg}` — wraps `editBurg` [:452-459]; listener sets `selectedBurgId` [useMapBridge.js:159-161].
- `fmg:viewport` — on d3 zoom event and a per-frame RAF poll [:394-449]; listener: MapOverlay mirrors the transform onto its `<g>` and debounces persistence [src/components/MapOverlay.jsx:73-113, 219-226].
- `fmg:settlementPlaced` — listener calls `addPlacement` (authoritative gate) then the advisory terrain-fit toast [useMapBridge.js:162-181].
- `fmg:placementRemoved`, `fmg:allPlacementsCleared` — listeners mirror to store [useMapBridge.js:182-187].
- `fmg:terrainChanged` — raises `geographyMayHaveDiverged` only when a spatial canon exists [useMapBridge.js:200-202; mapSlice.js:298-303].
- **No host listener**: `fmg:burgList`, `fmg:mapReset`, `fmg:snapshotLoaded`, `fmg:placementsRestored` [OBSERVED grep of `.on(` sites].

### 3.4 What the host stores versus references [OBSERVED]
- Stores: `mapState.fmgSnapshot` (opaque text, ~100 KB–1 MB) and `mapState.seed` [mapSlice.js:724-727; campaignSlice.js:8-29]; placements with FMG map-pixel `x,y` and pack `cellId` [mapSlice.js:386-471]; the frozen `worldState.spatialDigest` built from the capture [campaignSpatialCanonize.js:186].
- References only (never persisted): FMG burg objects, states, cultures, cells, heightmap, the live pack (road polylines live in RoadsLayer component state [RoadsLayer.jsx:49]; TerritoryLayer refetches the pack per digest [src/components/map/TerritoryLayer.jsx:60-70]).
- Not captured at all: `cells.f` (feature id), `pack.features`, `cells.t` (distance field), `cells.haven`, `cells.b` (border), vertices/polygons, rivers array, lakes, `graphWidth/graphHeight`, the map's distance scale [OBSERVED sf-bridge.js:1303-1324; src/domain/spatial/waterBodies.js header notes `b` and `f` absent]. The capture consumer reads `reply.graphWidth/graphHeight/mapSeed/mapKind` for the provenance sidecar [src/lib/spatialPackCapture.js:286-291] but the child never emits them, so the sidecar's frame fields are always absent [OBSERVED].
- [STATED] docs/azgaar-bridge.md:57-63 summarises the snapshot flow; docs/fmg-bridge.js is a historical example with an older protocol (`highlightBurgs`, `setOverlay`) that production does not use [OBSERVED docs/fmg-bridge.js:1-22].

---

## 4. Host-owned spatial state and generators

### 4.1 `src/store/mapSlice.js` — the map slice
- State: `mapState { fmgSnapshot, seed, customBackdrop{imageUrl,w,h}, placements{burgId→{settlementId,x,y,cellId,placedAt}}, labels[], markers[], forests[], layers{…}, viewport{cx,cy,scale,width,height,mode} }` plus transient `mapReady/mapLoading/mapError`, `geometryVersion`, `geographyMayHaveDiverged`, modes/tools, selection, undo stacks [OBSERVED mapSlice.js:58-279].
- Determinism: burg ids and annotation ids minted with `Date.now`/`Math.random` [mapSlice.js:570, 658, 682, 705; WorldMap.jsx:365]; `placedAt` wall clock. The slice is UI state, not simulation state.
- Placement gate: campaign active, settlement canon, no duplicate [mapSlice.js:387-404]; move-lock once `worldState.canonizedAt` is set [:486-500]; `applyAutoplacement` writes only through those two paths [:538-634].
- Persistence: `saveCampaignMap` copies the slice into `campaign.mapState` with `schemaVersion` 2 and `savedAt` [campaignSlice.js:814-836]; v1→v2 migration keeps `_legacyPlacements` [:314-370]; autosave debounced 3.5 s behind the `mapAutosave` flag with a flush on unmount/pagehide [src/hooks/useMapAutosave.js:1-40]. Cloud: `saved_maps.map_data` (whole campaign snapshot), with `map_seed`, `burg_settlement_map`, `supply_chain_config` columns [supabase/migrations/002_developer_role_maps_config.sql:15-18; 069_world_pulse_atomic_persist.sql:180-184]; gallery sharing extracts only `fmgSnapshot`/`customBackdrop` (+ placements for `map_with_campaign`) [045_gallery_maps.sql:85-93; 046_gallery_map_with_campaign.sql:57-66]; custom backdrops in the public-read `map-backdrops` bucket [044_map_backdrop_storage.sql]. `campaignSync` fingerprints the snapshot once per object identity because of its size [src/lib/campaignSync.js:32-37].

### 4.2 `src/domain/spatial/` — the frozen spatial canon (the keystone)
- Input: the captured pack (`h, biome, r, p, c, fl, g` + grid `temp, prec`) and placement rows carrying `cellId`, institution roster, `magicExists`, declared `terrainType` [spatialDigest.js:52-100; spatialPackCapture.js:84-138].
- Cell re-resolution (SEAM-2): stored cells are re-derived from `x,y` by `nearestCellTo` only after one "witness" row proves the frame; rows with no cell and no witness are refused (`frame_unverified`) and an all-unresolved realm refuses to canonize [spatialPackCapture.js:140-234; campaignSpatialCanonize.js:79-86].
- Algorithm: integer-quantized land cost field (`BIOME_COST` ported verbatim from the bridge, `LAND_HEIGHT` 20, `MOUNTAIN_HEIGHT` 60, `COST_SCALE` 100), one multi-source integer Dijkstra → per-cell `territory` and distances, gate crossings → sparse settlement graph → Floyd–Warshall matrix and BFS tiers, per-primary-hop route receipts [spatialDigest.js:1-37; spatialCost.js:1-68].
- Output keys: `spatialGeometryVersion, costLawVersion, overlayVersion, settlementIds, cellCount, landCellCount, skippedSettlements, costField, territory, tiers, distanceMatrix, gates, routeReceipts, reserved{seasonalOverlay, seaLanes, teleportEdges, …}` plus opt-in `biomes`, `climate`, lakes typology, capture receipt, sidecar, `kmScale` [spatialDigest.js:903-916; campaignSpatialCanonize.js:111-157]. **No cell coordinates are persisted** [placementRaster.js:9-16; steadingTopography.js:9-29; demographicsLand.js:8-24].
- Determinism: pure, no Date/Math.random; codepoint tie-breaks; the digest is authored once, deep-frozen, never recomputed [spatialDigest.js:1-11; campaignSpatialCanonize.js:162-168]. Two captures are compared as evidence; the first is frozen regardless [spatialPackCapture.js:264-273].
- Gates and persistence: premium tier, generated (non-image) map, no advance in flight; stamps `worldState.spatialCanonVersion` (+1 per re-canonize) and `worldState.spatialDigest`; size cap 400,000 bytes; synced as part of the campaign snapshot [campaignWorldPulseSlice.js:377-407; campaignSpatialCanonize.js:36, 159-221].
- Water: port eligibility = (coastal cell ∨ river cell) ∧ water-access institution [seaLanes.js header]; `waterBodies.js` derives ocean-vs-lake from the centroid bounding box because `cells.b` is not captured, erring toward ocean, and refuses the `salt` verdict because inlet/outlet is unknowable [waterBodies.js:1-60]; sea-lane routing still uses the height rule because `cells.f` never crossed the bridge [sf-bridge.js:718-725].
- Climate/biome: `climateBandOf` reaches grid rows only through `g` [spatialDigest.js:420-432]; `biomes` and `climate` sub-digests light only under virtual `biomeTruthEnabled`/`climateTruthEnabled` flags [campaignSpatialCanonize.js:87-103]; `seasons.js` is the climate consumer [OBSERVED grep].
- Scale datum: `kmScale` km per map unit, admitted from the creation flow on first canonize only; default 3 km/px mirrors FMG's slider; mode speeds foot 150, cart 110, river 280, coastal 450, sea 900 km/week; absent datum ⇒ legacy normalized weeks (primary hop ≈ 1 week) [modeSpeeds.js:1-80; distanceRead.js:1-70; STATED PHASE55 II.5-1].
- Readers: `distanceRead.js` (hopWeeks, pathCost, gates, sea/teleport adjacency, seasonal multipliers) feeds the mover waves (embattlement, supply shipments, migration, army transit, entrepôts, smuggle, rumor network, pestilence, calamity, naval layer, roads) [OBSERVED module headers].

### 4.3 `src/store/campaignRegionalSlice.js` and `src/domain/region/`
- The regional graph is an **aspatial** campaign-level directed multigraph (nodes, edges, channels of 13 types, queued impacts, event log) derived from saves and DM confirmation; no coordinates [region/graph.js:1-90; STATED docs/regional-causality-engine.md:1-22]. Neutral default edges (k-nearest, "known not trading") are minted behind a virtual flag and are the only "nearest" selection the route-genesis pass reuses [neutralNeighbourEdges.js:1-50; routeNetworkGenesis.js:12-18]. Trade links reconcile goods between a settlement and its generation-time neighbour profile [tradeLinks.js:1-15]. Slice actions rebuild/discover channels, apply impacts as conditions, inject/resolve stressors [campaignRegionalSlice.js:102-732]. Persistence: `campaign.regionalGraph` (channels mirrored to `saved_maps.supply_chain_config`) [069:184]. [STATED] docs/REGIONAL_ENGINE_AUDIT.md rates the architecture 8/10 and truthfulness 5.5/10 (2026-06-11).

### 4.4 `src/store/campaignWorldPulseSlice.js` / `src/domain/worldPulse/`
- `canonizeCampaignWorld` stamps `worldState.canonizedAt` and snapshots the aspatial graph; `canonizeCampaignWorldSpatial` is the separate entitled opt-in (above) [campaignWorldPulseSlice.js:331-407]. World state carries `spatialLedgers` sidecars (roads, armyTransit, navalTransit, spatialSubstrate, routeNetwork…) [roadsKernel.js:293-296; DESIGN_NAVY §0].
- `routeNetworkGenesis.js`: derives the birth road network from frozen `tradeRouteAccess` (grade ladder major→highway, standard→road, seasonal→track, isolated→none), k-NN pairs, port pairs from the sea-lane slot, user routes, plus an Urquhart pass; pure, no RNG; law version 1; the lane is "unmounted" (no world carries a stamp yet) [routeNetworkGenesis.js:1-144, 80-83]. Charters are demand-then-event proposals at grade `track` [routeNetworkCharter.js:1-50].
- `demographicsLand.js`: founding-site legality written in the digest's nearness vocabulary (frontier gate costs, hinterland envelopes) because no coordinates exist; user placements are never refused [demographicsLand.js:1-75].
- `steadingTopography.js`: satellite ground read from `routeReceipts` terrain names or a cost-band inversion into nine landforms; no per-cell biome array available [steadingTopography.js:1-90].
- `spatialConsequenceKernel.js`: town-scale map→engine coupling (fire/siege/diffusion over a district substrate derived from the town layout, not the realm map) behind a virtual flag [spatialConsequenceKernel.js:1-40; src/lib/spatialSubstrateDerive.js:1-30].
- `roadsKernel.js`: named-NPC travel over the digest; writes only `spatialLedgers.roads` and mirrors [roadsKernel.js:1-40].

### 4.5 `src/domain/realmMap/realmPlateRenderer.js`
- A pure SVG "realm plate" from the instant-world plan: seeded coastline polygon enclosing all sites, mountain carets by map kind, a Euclidean MST road web, tier-scaled markers, cartouche/compass; 1000×560 sheet scaled from the plan's 1000×600 box; frozen unit-vector table, no trig, no Date/Math.random [realmPlateRenderer.js:1-110, 153-377]. **Used only for static landing previews** (`scripts/generate-realm-preview.mjs`) and tests; its header states there is no headless realm renderer and the FMG iframe is non-deterministic and browser-bound [realmPlateRenderer.js:6-9, 38-42]. Determinism: same (seed, basicConfig, styleId) ⇒ byte-identical SVG [:33-37]. Not persisted.

### 4.6 Instant world — `src/domain/instantWorld/`, `src/lib/instantWorld/`, `src/store/instantWorld*`, `src/hooks/useInstantWorldMaterialize.js`
- `deriveWorldPlan`: seed → realm size (5/9/14 tier pyramid), tone preset, map kind (one of the bridge's templates, `sfArchipelago` excluded from random), magic, seeded site scatter in a **nominal 1000×600 box** (slot 0 at centre; margins 150/100), per-site seed `${seed}::iw<slot>`, burg ids `iw_b<slot>`, `mapSeed` `${seed}::map`, genesis relations under plan law 2 (law 1 frozen for old share codes) [worldPlan.js:1-25, 39-41, 157-160, 226-317].
- `composeInstantWorld`: mints members with the settlement pipeline, canon saves, placements with `cellId: null`, discovered regional graph, campaign with `mapState { fmgSnapshot:null, seed, mapKind, pendingMapGen:true }` [composeInstantWorld.js:1-60, 395-466]; pipeline-as-data with declared couplings [composerPipeline.js].
- Materialization: when the bridge is ready and `pendingMapGen` is set, calls `setTemplate(mapKind)` then `resetMap(String(seed))` in the iframe; no snapshot is captured until the user saves [useInstantWorldMaterialize.js:1-61]. The host records that plan coordinates are **not known to be in FMG's `graphWidth×graphHeight` space** and refuses to invent a transform (`frame_unverified`) [spatialPackCapture.js:155-171]. [INFERRED] Instant worlds therefore cannot spatially canonize until at least one placement is dropped/moved through the iframe (a witness), unless the nominal box happens to coincide with the live frame.

### 4.7 `src/domain/realm/autoplacement.js` + `placementRaster.js`
- Reads the **live pack** via `getSpatialPack` (pre-canonize only; refuses after canonize); builds a raster of land cells, terrain class via `terrainClassOf` plus a `HILL_HEIGHT` 40 shoulder; scores fit (weight 100), k=3 reach (30), tie hash (4), tier-scaled separation floor, refinement and isolation repair; **no RNG** (seed enters only as a tie hash) [autoplacement.js:1-120; placementRaster.js:1-70]. "Paint map terrain" is reported unavailable because the bridge has no programmatic terrain write [autoplacement.js:17-29]. Consent UI commits via `applyAutoplacement`, appends one Herald record [mapSlice.js:538-634; src/components/map/AutoplacementConsent.jsx].

### 4.8 `src/lib/roadNetwork.js` + `RoadsLayer.jsx`
- Edge selection (highway MST via Prim with stable tie-breaks, Urquhart supergraph, trade/relationship edges, lanes), `preferSea` when both ends are ports — port read from `config.tradeRouteAccess === 'port'` or, when a canon exists, the digest's `isPort` [roadNetwork.js:1-25, 293-367, 417]. Geometry is computed in the iframe and held in component state; recomputed on `geometryVersion` bumps; never persisted [RoadsLayer.jsx:1-50, 104]. [STATED] PHASE55 II.1 calls this "the §2 math the design wants — in the wrong layer, under the wrong contract" [docs/PHASE55_SPATIAL_ENGINE_DESIGN.md:983-986].

### 4.9 `src/components/map/*` overlay layers (all render-only, in FMG map coordinates)
- `MapOverlay.jsx`: mirrors the d3 transform; in image mode owns pan/zoom itself [MapOverlay.jsx:1-20, 56-62, 125-195]. `WorldMapStage.jsx`: mounts the iframe (not sandboxed) or the image backdrop [WorldMapStage.jsx:232-257].
- `TerritoryLayer.jsx`: draws `digest.territory` as a sampled dot field (≤2,400 dots) over live centroids; draws nothing when `cellCount` disagrees [TerritoryLayer.jsx:1-70]. `PlacementsLayer.jsx`: tier icons from placements + saves [PlacementsLayer.jsx:1-40]. `TerrainToolbar.jsx`: heightmap tool + biomes layer toggle/editor; rivers/coast/lakes editing by double-click in the iframe [TerrainToolbar.jsx:1-60]. `TimelapseLayer.jsx`: pulse-history rings/tints, DM-only, no geography [TimelapseLayer.jsx:1-40]. `HeraldGazetteer.jsx`: settlement register with show-on-map links [HeraldGazetteer.jsx:1-40]. `ForestsLayer.jsx`: decorative trees from a mulberry32 PRNG seeded by forest id [ForestsLayer.jsx:1-25]. `useRealmMapExport`/`realmMapExport.js`: composite PNG from `exportThumb` (≤1,024 px) plus overlay SVG; FMG's native SVG/PNG/GeoJSON exporters are not bridged [realmMapExport.js:1-30]; `mapThumb.js` uploads a gallery thumbnail [mapThumb.js:1-30].

### 4.10 Town map — `src/domain/townMap/`, `townCartography/`, `townScene/`
- `buildTownMapModel(settlement, mapEdits)`: pure view-time projection of the dossier into a 0..1000 integer space; v2 layout engine (`townLayoutV2`, Lynch-rubric self-scoring) reads district categories, quarter prose, institution assignment, urban-fabric memory; site genesis derives river/coast/marsh **from the dossier's terrain, trade routes and resources, never invented**; forks `${seed}::town-map:v1|v2` [townMapModel.js:1-50; townLayoutV2.js:1-50; siteGenesis.js:1-30]. Cosmetic edits live in `settlement.mapEdits` (absent ⇒ byte-identical) [mapEdits.js:1-40].
- Town cartography (TC-0..TC-2 built; TC-3..8 pending): streets/wards/parcels/buildings as manifest layers inside the `TownSceneManifest`, seeded from the manifest digest, counted draws per stage [cartographySynthesis.js:1-50; STATED docs/DESIGN_TOWN_CARTOGRAPHY.md:1-20]. 3D portrait opt-in (`settlementScene3d`), default withheld [STATED docs/TOWN_SCENE_3D_ARCHITECTURE.md:1-40; ARCHITECTURE.md:170-190].
- Relationship to the realm map: **none**. The design states "No FMG iframe, no bridge — the bridge doesn't exist outside WorldMap and never will here" [STATED docs/DESIGN_SETTLEMENT_MAP.md §4]; the town map's "terrain edge" is synthesised from the trade-route class because "no geometry fields exist" [STATED DESIGN_SETTLEMENT_MAP §2 table]. [INFERRED] It is not a placeholder for PLAT; it is a mature, independent town-scale generator whose only realm coupling is the spatial-consequence substrate derived from its own layout. Note: ARCHITECTURE.md:176-177 names `src/components/townMap/scene3d/`, but the clone's `src/components/townMap/` contains only `edgeAnnotations.js` [OBSERVED]; the viewer component's location was not reached.

### 4.11 `src/data/biomeTexture.js`, `geographyData.js`, `spatialData.js`
- `BIOME_NAMES` maps FMG biome ids 0..12 to names and `TERRAIN_SEASON_TEXTURE` gives per-terrain-class/season prose; consumed by the road scene when the biome sub-digest exists [biomeTexture.js:1-117]. `TERRAIN_DATA` is keyed by the **config** terrain vocabulary (coastal, …) with allowed resources [geographyData.js:49-60]; `INSTITUTION_SPATIAL` gates institutions by trade access [spatialData.js:34-40].

---

## 5. The host's stated intent for the map

### Takeaway
The map is declared a **first-class engine input via a frozen digest**, premium-only, canonize-gated, imported-image maps aspatial; the fork is to be kept small and upstream-tracking; the deeper "living map" and terrain-at-cursor are deferred. No document states an intent to replace FMG with a native generator.

### Cited statements
- [STATED] ARCHITECTURE.md:147-166: Phase 5.5 "promotes the realm map to a first-class engine input"; constitution (same-seed byte-identity, dormancy, first-paint ratchet) lives in `docs/PHASE55_EXECUTION_PLAYBOOK.md`. ARCHITECTURE.md:446-447: `public/map/main.js` is a fork "outside all gates, reconciled by hand".
- [STATED] PHASE55 §0: geometry "from the fantasy-map generator OR a user-authored overlay" becomes the substrate [docs/PHASE55_SPATIAL_ENGINE_DESIGN.md:14-23]; §1 spine (canonize activation, determinism, dormancy, premium, weeks, endogeneity) [:24-44]; II.1 "nothing in src/ parses [the snapshot]… re-materializable only by injecting it back into the FMG iframe" [:971-990]; II.2 keystone (port routing out of the iframe, integer digest, persist as canon data) [:993-1008]; II.5-3 imported maps stay aspatial in v1; II.5-4 "No headless FMG reconstructor for v1 — reuse the working router once" [:1113-1122]; §4j port rule and sea/river edge set [:715-766].
- [STATED] docs/fmg-fork.md:128-130 (decision 2026-05): no hard fork — "we own ~14,000 lines of map-generation code we don't understand"; §"What we do NOT do": no subtree/submodule, no upstream PR [:104-107].
- [STATED] ASSESSMENT.md:10,35: the FMG fork is an open structural risk — "Either commit to hard-fork or upstream the bridge hooks".
- [STATED] docs/PRODUCT_COMPLETION_ARCHITECTURE.md §11 "Deferred by design": "Terrain-at-cursor FMG work" and "Deep living-map scarring before retention evidence" [:249-257]; §9 lists "post-deploy probes for … map bridge" [:165-166].
- [STATED] docs/CURRENT_STATE.md:63: "Configurable separate-origin FMG loading and enforced production CSP contracts" is what the current integration adds; the map is otherwise absent from the release blockers.
- [STATED] docs/DESIGN_SETTLEMENT_MAP.md §0-§1: the dossier is the only truth; the town map is a view-time projection; persistent scarring remains "the owner's parked last thing". docs/DESIGN_MAP_DOORS.md: Door 1 (town-scale map→engine), Door 2 (fog/table layer), Door 3 (interiors) — all town-scale. docs/DESIGN_TOWN_CARTOGRAPHY.md:43-45: the Watabou iframe "remains an optional external view until promotion, then retires" (town scale).
- [STATED] docs/DESIGN_ROUTE_LIFECYCLE.md §1: digest stays frozen; genesis is sacred; ports totality. docs/DESIGN_NAVY.md §0: fleets live in `spatialLedgers`, never in the frozen slot.
- [STATED] docs/ARCH_EDIT_MODE_AND_DECREES.md and CODEBASE_REVIEW.md contain no map-architecture intent beyond a vendored-libs CVE finding [CODEBASE_REVIEW.md:752-754] and praise for MapOverlay's transform mirroring [:643].
- [OBSERVED] Code comments repeatedly record the FMG limitation as a fact to design around: "FMG is iframe-bound, so its geometry cannot be generated headlessly" [useInstantWorldMaterialize.js:6-7]; "the only realm geography is the FMG iframe … non-deterministic … unreachable outside a browser" [realmPlateRenderer.js:6-9].

### Gaps
- A design document named `DESIGN_FMG_WEAVE` (referenced from `composeInstantWorld.js`, `composerPipeline.js`, `genesisDiplomacy.js`, `captureSidecar.js` as "D1/D6/D12", "W-SEAM", "W-CAP") is **not in the clone** (`find` finds no such file) [OBSERVED]. The owner decision queue (`docs/OWNER_DECISION_QUEUE.md`, ODQ §… citations) lives on a ledger branch and is also absent [STATED docs/CURRENT_STATE.md:3-10]. Any stated intent in those documents is unknown.

---

## 6. The coherence question: which settlement inputs come from the map

### Takeaway
**None of a settlement's generation inputs come from the map.** Terrain, coast/river, trade access and threat are chosen from config (explicit or seeded random pools) and frozen; map-derived facts enter only post-generation, at the campaign/world-pulse layer, as derived digest fields and advisory receipts.

### Cited findings
- Terrain: `config.terrainType` is minted in `resolveConfig` from `getTerrainType(tradeRoute, override)` — port→coastal, river→riverside, crossroads/road→plains, isolated→forest, mountain_pass/road→mountain, desert_road→desert — or from a weighted random `TERRAIN_WEIGHTS` pick when override is `auto` and the route is `random_trade` [OBSERVED resolveConfig.js:109-120, 183, 206-207; terrainHelpers.js:22-34]. `resolveTerrain` is the single read (`terrainType` → `terrainOverride` → `terrain`) [resolveTerrain.js:40-46].
- Trade access: `config.tradeRouteAccess` explicit, or drawn from `TERRAIN_ROUTE_POOLS[resolvedTerrain]` / a generic pool [resolveConfig.js:39-44, 122-147]; default config is `random_trade` [src/store/configSlice.js:16].
- Coast/river: `maritimeSupported` = terrain coastal ∨ (route port ∧ terrain ≠ riverside); `riverTradeSupported` = route river ∨ terrain riverside — both from config [generationContext.js:243-262]. Defense, food, factions, cascades read `config.terrainType`/`tradeRouteAccess` [defenseGenerator.js:81,137-142; foodGenerator.js:106-108; factionCorrelation.js:123-124].
- Threat: `config.monsterThreat` from config or a random pool (heartland/frontier/plagued) [resolveConfig.js:153-159; settlementThreat.js header]; `threatProfile.js` derives threats from config/defense/stressors/neighbours/conditions — no geography [threatProfile.js:1-40].
- Map facts that reach the settlement layer, all post-hoc: (1) `terrainAgreement` compares declared terrain to the cell (plains↔grassland, forest, desert, mountain; riverside/coastal via `isRiverCell`/`isCoastalCell`; hills unknowable) and yields an advisory toast and a digest receipt — it "never rewrites `terrainType`" [spatialCost.js:274-376; useMapBridge.js:41-90; spatialPackCapture.js:97-101]; (2) port eligibility in the digest is geography ∧ institution, and the render tier adopts the canon's `isPort` for `preferSea` [seaLanes.js header; RoadsLayer.jsx:52-77]; (3) satellite resource leans from cost bands [steadingTopography.js]; (4) climate band for the seasons food year when `climateTruthEnabled` [campaignSpatialCanonize.js:96-103]; (5) autoplacement fit [placementRaster.js]; (6) distances/territory/gates for every mover wave [distanceRead.js].
- Genesis is sacred: "a settlement's generation-time `tradeRouteAccess` is frozen truth… divergence… is surfaced honestly rather than reconciled by mutation" [routeNetworkGenesis.js:6-10]; autoplacement offers "re-terrain as regen" only as a labelled re-roll [autoplacement.js:30-33].

### Inferences
- [INFERRED] The host's coherence model is **map-follows-dossier at the town scale** (the town map derives its river/coast from config) and **dossier-independent-of-map at the realm scale** (the realm map is an illustration that is later measured). A native generator fed by the dossier would close the realm-scale gap exactly where the host already declares the dossier "the only truth".
- [INFERRED] Because `terrainType` is derived from `tradeRouteAccess` for most routes, the dossier already carries a weak hydrographic contract (port ⇒ coast, river ⇒ river course) that a native generator can honour as a hard boundary condition.

---

## 7. Implications for the native world generator (PLAT)

### 7.1 What must be replaced (functions FMG currently supplies)
- Heightmap generation from a template seed (six curated templates + `sfArchipelago`), coastlines, lakes, rivers with flux, biomes (13-id vocabulary), grid climate (`temp` °C, `prec` 0..255), the cell graph (`p`, `c`, `g`), and the `findCell` point→cell lookup [sf-bridge.js:83-150, 1291-1324].
- The road router (`computeRoadNetwork`) and its cost law, which the digest already ported into `spatialCost.js` — so the canonical cost law to match is the host's, not FMG's [spatialCost.js:1-68].
- Snapshot save/load (`prepareMapData`/`uploadMap`), thumbnail export, viewport control, heightmap/biome editors with undo/redo [sf-bridge.js:461-499, 1337-1390, 1489-1565].
- The materialization contract for instant worlds (`setTemplate` + `resetMap(seed)` ⇒ same seed, same map) [useInstantWorldMaterialize.js:48-51].

### 7.2 Host state that must be respected as canonical
- `worldState.spatialDigest` + `spatialCanonVersion` are immutable canon once frozen; a new geometry must be a declared re-canonize with a `spatialGeometryVersion` bump, never a silent drift [spatialDigest.js:115-123; campaignSpatialCanonize.js:162-168].
- `mapState.placements` (settlementId, x, y, cellId) and the move-lock after `canonizedAt` [mapSlice.js:486-500].
- The settlement config (`terrainType`, `tradeRouteAccess`, `monsterThreat`, resources, institutions) is frozen generation truth [routeNetworkGenesis.js:6-10].
- Share codes and instant-world plan law 1 must replay byte-identically [worldPlan.js:27-41].
- The dossier's hydrographic contract (port/river/coastal) and institution-based port capability [seaLanes.js header; generationContext.js:243-262].
- `kmScale` datum and the mode-speed table (3 km/px default; weeks calibration) [modeSpeeds.js:1-80].

### 7.3 What the host must change to hand PLAT boundary conditions (one-way host → map)
- **Edge elevations / datum / sea side**: nothing in the host today expresses these; the only shape input is a template id and a seed [sf-bridge.js:115-137; worldPlan.js:100-110]. The host would need a per-campaign map charter (frame size in integer cm, datum, which edges are sea, elevation range) persisted beside `mapState.seed`.
- **River entry/exit**: the dossier knows only "riverside/river access"; no river identity, direction or flux crosses today; the host's own lake law explicitly cannot tell inlet from outlet [waterBodies.js:30-40]. The host must emit river requirements per settlement (must sit on a navigable course; port must front the sea) as constraints, and receive back river ids, direction and flux.
- **Roads**: edge selection (`computeRoadEdges`) is host-side and deterministic; the host must stop routing in the iframe and consume routed polylines (and the genesis network) from the port [roadNetwork.js:14-17; routeNetworkGenesis.js].
- **Biome and rainfall**: the host consumes FMG biome ids 0..12 and a 0..255 precipitation scale [biomeTexture.js:26-43; spatialDigest.js:85-93]; PLAT must either emit that vocabulary or the host must re-version `BIOME_TEXTURE_VERSION`/`CLIMATE_BAND_VERSION` and `BIOME_COST`.
- **Placement frame**: the instant-world nominal 1000×600 box must become the real map frame, or the composer must place by cell/constraint and let the map return coordinates (the `frame_unverified` refusal shows the host already wants a frame stamp) [spatialPackCapture.js:155-183; captureSidecar.js].
- **Capture widening**: the capture must carry what the host already wishes it had — `cells.f`/features (lake vs ocean), `cells.b` (border), `cells.t`/`haven` (coast distance, harbour cell), river/lake entities, frame width/height, seed/kind — and the host must drop the live-pack reads (`TerritoryLayer`, autoplacement) in favour of persisted coordinates [TerritoryLayer.jsx:12-20; placementRaster.js:9-28; sf-bridge.js:718-725].
- **Receive derived facts back**: today's return port is the one-shot capture → digest. A one-way "derived facts" port should return per-settlement cell, coast/river/port truth, biome, climate band, elevation, plus the territory/gate/distance products, versioned like the digest; the host should then retire the advisory `terrainAgreement` toast in favour of a hard contract (or keep it as a receipt).
- **Editors**: the host's terrain toolbar depends on FMG's in-frame editors and under-reports edits (`terrainChanged` fires on activation only) [mapSlice.js:230-245]; PLAT needs an edit protocol with fingerprinted outputs.
- **Build/ops**: the fork's rebuilt bundle has no source in the repo; the CSP, separate origin, hash manifests and `validate:map` gate are fork-specific and would be retired or re-pointed [docs/fmg-fork.md; docs/ops/FMG_ORIGIN_RUNBOOK.md].

### 7.4 UNKNOWNS (could not be settled from the code)
- Where the modified upstream TypeScript source that produced `index-Bp79q281.js` lives, and whether other bundle-level changes exist beyond the `Settlements` rename and the charge-table prune.
- The contents of `DESIGN_FMG_WEAVE` (W-SEAM/W-CAP/POLIS design) and the owner decision queue (ledger branch) — including any ruling on replacing or hard-forking FMG.
- Actual production `graphWidth×graphHeight` (window-derived) and therefore the coordinate frame of persisted placements across devices; whether any instant world has ever spatially canonized.
- Whether the gallery import of `fmgSnapshot` blobs across users is still enabled (notices and tests reference an F6 guard) and how PLAT would migrate existing blobs.
- The exact semantics the host assumes for `cells.g` on packs older than the capture (CAP-1 says it may be absent).
- Whether any `.map` snapshot in production was saved under a version other than 1.114.2 (load compatibility of a native replacement).
- The town-map viewer component location (clone lacks `src/components/townMap/scene3d/` named in ARCHITECTURE.md).

---

## 8. Sources read

### Read in full
- public/map: `versioning.js`, `sf-origin.js`, `sf-bridge.js` (1,728 lines), `main.js` diff vs upstream, `index.html` diff vs upstream `src/index.html`, per-file diffs for all 87 non-lib files (dumped to scratchpad), host-marker grep across `modules/**`, bundle global-export grep.
- THIRD-PARTY-NOTICES.md §1.1–1.7; docs/fmg-fork.md; docs/azgaar-bridge.md; docs/fmg-bridge.js (head); docs/ops/FMG_ORIGIN_RUNBOOK.md (head).
- src/lib/mapBridge.js; src/hooks/useMapBridge.js; src/store/mapSlice.js; src/lib/spatialPackCapture.js; src/lib/spatialCaptureRegistry.js; src/store/campaignSpatialCanonize.js; src/hooks/useInstantWorldMaterialize.js; src/hooks/useRealmMapExport.js; src/domain/resolveTerrain.js; src/data/biomeTexture.js; src/lib/mapRuntimeConfig.js (1-80 + greps).
- docs/CURRENT_STATE.md; docs/DESIGN_MAP_DOORS.md; ARCHITECTURE.md §"spatial engine" and §"Settlement scene"; PHASE55_SPATIAL_ENGINE_DESIGN.md §0–§4c, §4j, Part II.
- Upstream: `vite.config.ts`, `package.json`, `src/index.html` script list, `src/modules/index.ts`, git log/tags; wiki Changelog lines 100-135.

### Read in part (headers, key sections, greps)
- src/components/WorldMap.jsx (imports; 318-490; 495-560; 575-645); WorldMapStage.jsx; MapOverlay.jsx; RoadsLayer.jsx (1-80); TerritoryLayer.jsx (1-70); PlacementsLayer, TerrainToolbar, TimelapseLayer, HeraldGazetteer, ForestsLayer headers; src/lib/roadNetwork.js (1-140 + greps); realmMapExport.js, mapThumb.js headers.
- src/domain/spatial: spatialDigest.js (1-140, 341-432, 587-640, 903-916), spatialCost.js (1-120, 274-376), distanceRead.js (1-70), modeSpeeds.js (1-80), spatialSubstrate.js, captureSidecar.js, waterBodies.js, seaLanes.js, index.js headers; one-line purposes of all 36 modules.
- src/domain/realmMap/realmPlateRenderer.js (1-110); src/domain/realm/autoplacement.js (1-120), placementRaster.js (1-60); src/domain/instantWorld/worldPlan.js (1-130, 226-317), genesisDiplomacy.js header; src/lib/instantWorld/composeInstantWorld.js (1-80, 395-517), composerPipeline.js header; src/store/instantWorldBody.js header.
- src/domain/worldPulse: routeNetworkGenesis.js (1-130), demographicsLand.js (1-110), roadsKernel.js (1-70), steadingTopography.js (1-90), spatialConsequenceKernel.js (1-40), routeNetworkCharter.js (1-50); src/store/campaignWorldPulseSlice.js (331-420 + greps).
- src/domain/region: index.js, graph.js (1-90), tradeLinks.js, neutralNeighbourEdges.js, deriveRegionalState.js headers; src/domain/regionalGraph.js header; src/store/campaignRegionalSlice.js (1-70 + action list).
- src/domain/townMap: townMapModel.js (1-90), townLayoutV2.js, siteGenesis.js, mapEdits.js headers; townCartography/cartographySynthesis.js header; townScene listing; docs/DESIGN_SETTLEMENT_MAP.md (1-140); docs/DESIGN_TOWN_CARTOGRAPHY.md (1-90); docs/TOWN_SCENE_3D_ARCHITECTURE.md (1-60).
- Generators: steps/resolveConfig.js (greps), terrainHelpers.js, generationContext.js (225-262), spatialGenerator.js header; configSlice greps; geographyData.js, spatialData.js heads; mapProfile.js, threatProfile.js, settlementThreat.js heads.
- Store/persistence: campaignSlice.js (1-60, 314-380, 805-850); campaignSliceShared/campaignSync greps; supabase migrations 002, 013, 044, 045, 046, 069 (greps); test listing.
- Docs greps: PRODUCT_COMPLETION_ARCHITECTURE (map lines; §11), ARCH_EDIT_MODE_AND_DECREES, CODEBASE_REVIEW, ASSESSMENT, DESIGN_ROUTE_LIFECYCLE (1-70), DESIGN_NAVY (1-30), REGIONAL_ENGINE_AUDIT (1-40), regional-causality-engine (1-30), briefs/W_R2_SEAMS_BRIEF (1-60).

### Not reached
- Bodies of: distanceRead.js beyond its export list; seaLanes.js, waterBodies.js, commodityFlow/armyTransit/migration and the other mover modules; roadsKernel beyond its header; region/propagation.js and graph.js bodies; townLayoutV2/townMapModel bodies; townCartography beyond the synthesis header; the town-map viewer components; WarFaithMapOverlay, TravelersLayer, RelationshipEdges, ChainEdges, HitLayer, LayersPanel; PHASE55 Parts III–VII; DESIGN_DEMOGRAPHIC_ENGINE, DESIGN_COHESION_WEAVE, DESIGN_FP_ARCH_WY; the FMG bundle's internals beyond global-export greps; all test bodies; `foundry-module/`, `mcp-server/`, `api/`.
