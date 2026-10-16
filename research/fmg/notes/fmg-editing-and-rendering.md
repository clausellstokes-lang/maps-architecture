# FMG editing tools, regeneration semantics, rendering and styling — research notes

Date: 2026-10-16. Source: local clone at `reference/fmg-src` (FMG 2.x source as of 2026-10) plus `reference/fmg-src/docs/**` and the local wiki mirror. All paths below are relative to `/home/user/maps-architecture/reference/fmg-src/` unless noted. Clean-room: identifiers are named, no code is reproduced; presets, palettes and font lists are counted and described, not copied.

Tags: [OBSERVED] = read directly in source or docs at the cited line; [STATED] = claim made by FMG's own docs/wiki (not independently verified in code); [INFERRED] = my interpretation.

---

## 1. Summary

### Takeaway
FMG 2.x is a four-layer browser app: typed-array world state (`grid`/`pack`) plus a `styles` record → generator "model" classes that own every mutation and expose public edit methods → lazily-loaded controllers (editors, tools, overviews) that call those methods → idempotent `draw-*` renderers coordinated by a `Layers` registry whose registration order is z-order [OBSERVED docs/architecture/architecture.md L186-188, L403-404, L530-548]. Editing is rich (≈60 controllers) but **there is no global undo**: only a handful of tools keep session-scoped, capped stroke histories (heightmap, paint, wrap, diplomacy, notes, template editor, transform), while the Assistant's proposals implement a real before/after diff with Apply/Undo/Redo and staleness checks [OBSERVED controllers/assistant/proposals.ts L21-27, L66-87]. Regeneration is partial and explicit: each "Regenerate X" button re-runs one generator, honours per-entity `lock` flags, then redraws a hard-coded list of layers; nothing re-derives the rest of the model, so FMG routinely lets the map drift from its model (section 7). Seeds reproduce a fresh map only; user edits are stored as data in the `.map` file, not as a replayable log [STATED wiki Quick-Start L65, KB L919-921].

---

## 2. Editors table

### Takeaway
Nearly every editor goes through a model method (`Burgs.rename`, `States.setCells`, `Labels.setLayout` …) whose contract is validated in `src/generators/model-edits.test.ts` [OBSERVED], but a minority still mutate `pack` arrays directly (colors, zone cells, river control points, relief icon positions, goods cell assignment, diplomacy). Downstream recomputation is per-editor and hand-coded; "left stale" is the norm for anything not explicitly listed.

Column key — Geo = geometric (changes cells/vertices/points), Sem = semantic (names, ownership, attributes). Undo = session undo within the tool. Lock = entity lock respected by regenerate.

| Editor (controller) | What it edits | Geo/Sem | Recomputed downstream (explicitly) | Left stale / manual | Undo | Lock | Citations |
|---|---|---|---|---|---|---|---|
| Heightmap editor (`heightmap-editor.ts`) | `grid.cells.h` via brushes (raise/lower/smooth/… 46+ brush rows), template editor (14 built-in templates, step types H/P/R/T/S/M/I/+/*/~), image converter, rescaler, selection | Geo | On Apply: mode **Erase** clears cultures/burgs/states/provinces/religions/relief and runs ErasePipeline; **Keep** copies heights into pack only; **Risk** re-runs markupGrid/lakes/temperature/precipitation/Pack.generate/markupPack/GraphOverride.restore, re-attaches per-cell arrays by grid index, relocates burgs to nearest land (removes burgs in water unless capital/market centre), recomputes province/culture centres, state poles/neighbours/stats, zones, economy, ice; then draws ocean/landmass/lakes/coastline and restores the layer set | Keep mode leaves rivers, biomes, features and all political data untouched against new heights; Risk mode does not re-derive cultures/states territory | Yes: snapshots of `grid.cells.h`, limit 100 | n/a | [OBSERVED L57, L62-74, L83-99, L361-363, L380-391, L481-489, L525-547, L624-654, L711-737, L793-812, L902-944, L963-1008, L1726-1767]; [STATED docs/architecture/generation-pipeline.md L155-191; wiki KB L583-585] |
| Paint editor (`paint-editor.ts`, shared by states/provinces/cultures/religions/biomes) | Cell ownership for one entity type via brush; modes single/multiple; "don't override" and "land only" options | Geo (territory) | Changes are previewed in an overlay and applied only on Apply through `X.setCells`; states editor then deletes affected `label.pathPoints` and redraws | Population, economy, neighbours, provinces of changed states not recomputed except via the per-editor "recalculate" buttons | Yes: stroke history, limit 100 | – | [OBSERVED paint-editor.ts L59-60, L753-775; states-editor.ts L1101-1133; provinces-editor.ts L978-1007; cultures-editor.ts L826-846; religions-editor.ts L815-835; biomes-editor.ts L483-500] |
| Wrap tool (`wrap-tool.ts`, `vertex-brush.ts`) | Pack vertex positions only (coast/lake outlines) | Geo | Cell/feature areas refreshed via GraphOverride; redraws a fixed layer list (`LAYERS_TO_REDRAW`) | Burgs, rivers, routes, labels do not follow moved vertices (documented limitation) | Yes: 1000 strokes, session only; Esc/Ctrl+Z/Y captured | – | [OBSERVED wrap-tool.ts L27, L116, L134-203, L215-231, L244-278; vertex-brush.ts L6-8, L69-99; generators/graph-override.ts L24-35, L42-58, L94-117]; [STATED docs/prd/wrap-tool.md known limitations] |
| Coastline editor (`coastline-editor.ts`) | Per-feature coastline noise parameters (9 sliders, 5 presets) | Geo (rendering of outline) | Per feature: `Features.setCoastline` + feature path redraw; global: `Coastline.update` + draw landmass/coastline/lakes | Cells unchanged; purely presentational geometry | No | – | [OBSERVED L19-101, L103-145, L212-223] |
| Transform tool (`transform-tool.ts`) | Shift/rotate/scale/mirror the whole map via `Resample.process`; registers a new map id | Geo | Full resample of all data | Locks are cleared on removed entities during resample | Yes (listed in KB) | – | [OBSERVED transform-tool.ts; grep resample.ts lock:false]; [STATED wiki KB L51-53] |
| Submap tool (`submap-tool.ts`) | Crop to viewport region and rescale; divides distance and population scale | Geo | Full resample; `rescaleBurgStyles` | – | No | – | [OBSERVED L124-140] |
| River editor (`river-editor.ts`) | Drag control points (mutates `river.points`, `river.cells`, swaps `cells.r`/`cells.fl`), rename, type, parent, width via `Rivers.*`, remove | Geo + Sem | Length re-derived from SVG path length; draws rivers (+labels on remove) | Flux, basins, downstream rivers, lakes, biomes not recomputed | No | – | [OBSERVED L163-166, L194-240, L262-314] |
| River creator / auto creator (`river-creator.ts`, `river-auto-creator.ts`) | `Rivers.create(cells)` with per-cell flux inputs; `Rivers.add(x,y)` | Geo | Draws rivers | Same as above | No | – | [OBSERVED both files] |
| Rivers overview (`rivers-overview.ts`) | List, remove all (sets `pack.rivers` empty and zeroes `cells.r`) | Sem/Geo | Draw rivers | Flux/lakes stale | No | – | [OBSERVED L862-867] |
| Lakes editor (`lakes-editor.ts`) | Name (direct write), subtype via `Features.setSubtype`, group (moves SVG node + `feature.group`, custom groups seed `styles.lakes.groups`), remove group → freshwater | Sem | Redraw lake | Subtype change has no cascade (no evaporation/biome/relief change) | No | – | [OBSERVED L152-154, L211-263]; [STATED docs/prd/features-overview.md; wiki KB L959-961] |
| Features overview (`features-overview.ts`) | Rename, subtype, group, coastline per feature; no add/remove | Sem | Redraw | Explicit "no cascade" comment | No | – | [OBSERVED L375-377] |
| Burg editor (`burg-editor.ts`) | Name, group, type, culture, population, treasury, buildings/features, port, capital, link, relocate (`Burgs.move` to free land cell, capital may not leave state/province; port status re-derived; custom label path reset), remove, lock, emblem, notes | Sem + position | Draws burgIcons/labels (routes on create); market removal draws markets | Routes not re-routed on move; production/trade not recomputed on treasury/type; population edits don't touch state totals | No | Yes | [OBSERVED burg-editor.ts L343-344, L356-357, L362-366, L381-390, L410-441, L457, L709-713, L762-764; generators/burgs-generator.ts L1024-1046; burg-creator.ts L32-39] |
| Burgs overview (`burgs-overview.ts`) | Table edit, regenerate names (skips locked), CSV export/import rename, lock all, remove all unlocked (keeps capitals and market centres) | Sem | Draw burgIcons/labels | – | No | Yes | [OBSERVED L184-198, L476-484, L779-781, L795-809, L815-826] |
| Burg group editor (`burg-group-editor.ts`) | Burg group definitions (limits by biome/feature/etc.), re-assign all burgs by population | Sem | `ensureBurgLabelGroups`, `ensureBurgGroupStyles`, draw burgIcons+labels | – | No | – | [OBSERVED L374-381] |
| States editor (`states-editor.ts`) | Color (direct write), name/form/full name (optionally clears label text), population, treasury/taxes, culture, type, expansionism, capital, remove, merge/annex (as provinces), paint territory, add state mode (customization 3), lock, legend, randomize expansionism, "recalculate" (re-expands unlocked states) | Sem + Geo | Type/expansionism trigger recalculate only when auto-apply is on; recalculate draws states/borders/provinces/goods/emblems and resets label paths; remove draws many layers | Treasury/taxes do not recompute production; military not regenerated on territory change | No | Yes | [OBSERVED L149-150, L502-514, L600-615, L747-756, L821-838, L859-868, L1064-1078, L1101-1168, L1294-1303, L1339-1344] |
| Provinces editor (`provinces-editor.ts`) | Color (direct), name/form/full name, capital, population, remove, declare independence (new state), paint, add province mode (customization 12), merge, lock | Sem + Geo | Draw provinces/borders/labels; independence redraws state emblems and labels | Province stats (area/population) not recomputed on paint unless via editor refresh | No | Yes | [OBSERVED L108-109, L428-429, L455-472, L526-531, L551-559, L753-762, L978-1041, L1284-1294] |
| Cultures editor (`cultures-editor.ts`) | Color (direct), name, expansionism, type (direct write), namebase, emblem shape, population, move centre, paint, add culture (customization 9), regenerate burg names for culture (skips locked burgs), remove, lock, recalculate (re-expands) | Sem + Geo | Recalculate only if auto-change checkbox or forced; draws cultures | Burg/state cultures not re-derived | No | Yes | [OBSERVED L135-137, L502, L514-558, L625-630, L652-655, L737-742, L818-824, L826-884, L1036] |
| Religions editor (`religions-editor.ts`) | Color (direct), name, type, form, deity (direct write on regenerate), population, expansion/expansionism, move centre, paint, add (customization 8), remove, lock, recalculate | Sem + Geo | Same pattern (auto-change checkbox) | – | No | Yes | [OBSERVED L121-123, L516, L527-555, L620-644, L717-722, L815-881, L937-948] |
| Biomes editor (`biomes-editor.ts`) | Color (direct), name, habitability (triggers `Population.regenerate` + draw population/goods), add custom, remove, paint cells, restore defaults (`Biomes.restore` + population) | Sem + Geo | Population and goods layers | Relief pools, burgs not touched | No | – | [OBSERVED L336-337, L350-365, L441-455, L483-508, L517-519] |
| Zones editor (`zones-editor.ts`) | Add (pushed to `pack.zones`), reorder (array order), paint multiple (writes `zone.cells` directly), color direct, rename/type/population via `Zones.*`, remove | Sem + Geo | Draw zones | Zone population not re-derived after painting | No | Yes (regenerate) | [OBSERVED L266-280, L312-322, L376-385] |
| Markers editor/creator/overview/settings | Drag (`Markers.move`), icon/appearance applied to **all markers of same type**, lock, delete, add; overview remove-all keeps locked; settings table drives `Markers.regenerate` | Sem + position | Draw markers | – | No | Yes | [OBSERVED markers-editor.ts L148-152, L267-275; markers-overview.ts L381-390; markers-settings.ts] |
| Labels editor (`labels-editor.ts`) | dx/dy drag, control points / own path, text (warning for state/province since the entity name is the source of truth), group (cross-type confirmation), font size/letter spacing/start offset, path toggle (arc or plain text), reset | Presentation override | `redrawLabel` single label | Text override diverges from entity name until reset | No | – | [OBSERVED L30-33, L249-352, L395-402, L503-507, L540-549, L578-590] |
| Label creator (`label-creator.ts`) | `AddedLabels.add` with arc path | Presentation | Draw labels | – | No | – | [OBSERVED] |
| Labels overview (`labels-overview.ts`) + spread (`label-spread.ts`) | Filters, bulk group assignment, visibility/reset via `Labels.setLayout/reset`, "Spread" solver with snapshot → preview → Apply/Cancel | Presentation | Draw labels | Spread writes dx/dy/startOffset overrides, not re-run on later changes | Preview cancel only | – | [OBSERVED labels-overview.ts L58, L127-132, L316-329, L409-457; label-spread.ts L92-129] |
| Label groups editor (`labels-group-editor.ts`) | Group list in `options.map.labels.groups` (type, zoom min/max, mode), `Labels.regroup`, show-all app pref | Presentation | Draw labels | – | No | – | [OBSERVED L28-32, L80, L151-152, L276-299] |
| Notes editor (`notes-editor.ts`) | Rich text (Quill) per entity, `Notes.set` on input, HTML source mode, CSV import/export | Sem | None needed | – | Yes (rich-text history) | – | [OBSERVED L291-298]; [STATED wiki KB L51-53] |
| Route editor/creator/overview/groups | Control points drag (mutates `route.points` and `cells.routes`), split/join, group, lock, remove; create from points; remove all unlocked rebuilds `cells.routes` | Geo + Sem | Draw routes/labels | Trade, markets, journeys not re-routed | No | Yes | [OBSERVED route-editor.ts L155-190, L336-350; routes-overview.ts L247-262, L284-319; route-groups-editor.ts L111-126] |
| Military overview / regiment editor | Alert via `Military.setAlert`; unit types written to `options.map.military.units` then offer full `Military.generate`; rotate/naval/name/icon/units/split/add/attach/attack/remove | Sem | Draw military | Unit edits require full regeneration to take effect | No | – | [OBSERVED military-overview.ts L512-586; regiment-editor.ts to L458] |
| Diplomacy editor (`diplomacy-editor.ts`) | Paint relations between state pairs; writes `pack.states[].diplomacy` | Sem | Chronicle records added on Apply; draw states | – | Yes: stroke-based undo, cleared on Apply | – | [OBSERVED L119, L170-215, L252] |
| Emblems editor (`emblems-editor.ts`) | COA shape/field/charge/tincture/size/position (`Emblems.place`), regenerate one, upload/paste image, Armoria link, download | Presentation | `redrawEmblem` | – | No | – | [OBSERVED L424-478, L536-549, L598-671, L877] |
| Relief editor (`relief-editor.ts`) | Drag icons (direct x/y write on `pack.relief`), bulk add/remove brushes, resize, z-order front/back, delete | Presentation (icons) | Redraw relief | Not regenerated unless style effect triggers `Relief.generate` | No | – | [OBSERVED L56-57, L147-156, L238-347, L433-445] |
| Relief pool / rules editors | Per-biome icon pools and hill/mountain rules in `options.map.relief.rules`; restore defaults; apply offers `Relief.regenerate(covers)` for claimed cells | Presentation config | Regenerates affected icons only | – | No | – | [OBSERVED relief-pool-editor.ts L70-108, L247-250, L310-320; relief-rules-editor.ts L183, L199-212] |
| Ice editor (`ice-editor.ts`) | Randomize/resize/add/remove icebergs and glaciers via `Ice.*` | Geo (overlay) | Redraw ice | – | No | – | [OBSERVED L66-120] |
| Goods editor and related (`goods-editor.ts`) | Good definitions, manual resource assignment writes `pack.cells.good` directly (customization 14), restore defaults → `Goods.generate` + `Production.regenerateEconomy`, regenerate placement / regenerate production+trade | Sem + per-cell | Draw goods/markets/trade | Manual placement explicitly "won't affect production or trade" until regenerated | No | – | [OBSERVED L512-521, L535-589, L666-708] |
| Journeys (editor, path editor, overview, transports) | Name/type/color, segments (speed, hidden, custom path drawn cell-by-cell with validity rules, right-click undo while drawing), transports, lock, remove all unlocked | Sem + Geo | `Journeys.sync`, draw journeys | Custom paths never re-routed when routes change | Draw-time only | Yes | [OBSERVED journey-editor.ts L364-386, L426-483, L553-633; journey-path-editor.ts L20, L198-256, L375-380; journeys-overview.ts L307-352] |
| Lore editor (`lore-editor.ts`) | Map name, year, era, description via `Lore.*` | Sem | – | – | No | – | [OBSERVED L127-174] |
| Style editor (`style-editor/*`) | Any schema'd style value; effects write/draw/zoom/regenerateRelief; presets apply/save/upload | Presentation | Effect-driven redraw | regenerateRelief effect replaces all relief icons (Assistant refuses to propose it because Undo cannot restore) | No (baseline reset only) | – | [OBSERVED style-editor/index.ts L174-189; effects.ts L14-26; style-preset.ts L32-49, L88-118; assistant/proposals.ts L57-61] |
| Measurers (`measurers-editor.ts`) | Ruler, opisometer, route opisometer, planimeter | Overlay | Full rulers layer redraw per change | Never saved into SVG; stored in `pack.measurers` | No | – | [OBSERVED]; [OBSERVED services/io/save.ts L68, L96] |
| Units editor (`units-editor.ts`) | 9 unit keys in `options.map.units`, height exponent (regenerates temperature) | Scale | ScaleBar + grid readout redraw; temperature | Biomes not re-derived from new temperature here | No | Pins | [OBSERVED L656-661] |
| World configurator (`world-configurator.ts`) | Climate/geography; `updateWorld` regenerates temperature, precipitation, rivers (heights kept), biomes, feature groups/names and draws those layers | Sem/Geo derived | As listed | States/burgs/population not recomputed | No | Pins | [OBSERVED L303-319] |
| 3D view (`view-3d.ts`) | Mesh/globe display settings in `options.app.threeD`; erosion/satellite display-only | Presentation | – | – | No | – | [OBSERVED] |
| Omnibar (`omnibar.ts`) | Search entities/commands (`>` prefix), history of 10 in localStorage | Navigation | – | Stale record detection by object identity after `map:generated` | – | – | [OBSERVED L52-57, L363-380, L418, L431-447, L589-613] |
| Assistant (`assistant/*`) | Batches of whitelisted model methods on 22 model classes, tried on a draft world, shown as a change card | Any | Layers derived from changed fields (`redraw.ts` tables) | – | Yes: Apply/Undo/Redo with before/after rows and "changed since" check | – | [OBSERVED proposals.ts L21-87, L136-163; redraw.ts L7-60; operations.ts L24-47; world.ts L35-52] |

### Inferences
- [INFERRED] The "model class with public edit methods" pattern is the real editing API; controllers are thin and the Assistant reuses the same methods, so an external editing layer (SettlementForge) could target that method surface rather than the UI.
- [INFERRED] The remaining direct mutations (colors, zone cells, river points, relief icons, goods cells, diplomacy) are legacy paths that bypass validation and any future change tracking.

### Gaps
- `cell-info.ts`, `minimap.ts` remainder, `battle-screen.ts`, `charts-overview.ts`, `ai-generator.ts`, `hierarchy-tree.ts`, `elevation-profile.ts`, `namesbase-editor.ts`, `market*` and `production*` overviews were only skimmed or not read; they are overviews/viewers rather than editors as far as names and greps show.

---

## 3. Regeneration and determinism after edits

### Takeaway
Regeneration is a menu of per-domain commands (`MAP_COMMANDS`) each of which runs one generator's `regenerate`, preserves `lock`ed entities (sometimes by re-indexing them), and redraws a fixed layer list. There is no dependency graph: nothing downstream is invalidated automatically. Seeds only reproduce a fresh generation.

### Cited Findings
- [OBSERVED components/map-commands.ts L669-705] A confirmation dialog guards regeneration with a session-scoped "don't ask again" flag.
- [OBSERVED map-commands.ts L707-825] Command → redraw scope: state labels (deletes `state.label` overrides, draws labels); relief (`Relief.generate`); routes; rivers; population (draws population, goods); states (returns warning/error, un-fogs, draws states/borders/provinces/labels/burgIcons/military/goods/emblems); provinces; burgs (draws burgIcons/labels/routes/population/goods/emblems); goods; markets; economy; production; emblems; religions; cultures; military; ice; markers; zones (gauss multiplier prompt with Ctrl).
- [OBSERVED generators/states-generator.ts L204-258] `States.regenerate` refuses when all states are locked, strips capital status from burgs of unlocked states, marks provinces of unlocked states removed, keeps locked states with their capitals and re-indexes `cells.state` to the locked set before expanding new states.
- [OBSERVED generators/burgs-generator.ts L830-870] `Burgs.regenerate` rebuilds `cells.burg`, re-indexes locked burgs and unlocked market-centre burgs to **new ids** (updating state capital, province burg, market centre references).
- [OBSERVED grep] Provinces, religions, cultures, routes, markers, population and zones generators all filter on `lock` in their regenerate paths (provinces-generator L93-118; religions-generator L629-1185; cultures-generator L1096-1338; routes-generator L217-229; markers-generator L171-172; population L63-68).
- [OBSERVED components/tools-tab.ts L94-98, L155-158] Tooltips tell the user that regenerating burgs also regenerates routes, and that regenerating states changes capitals.
- [OBSERVED components/lifecycle.ts L100-128, L162, L177] Full regeneration is debounced, asks for confirmation if the user worked ≥1 minute, keeps a map history of 100 seeds, and emits `map:generated`.
- [OBSERVED components/seed.ts] Seed is settable and seed history can be restored.
- [STATED wiki Quick-Start L65; KB L919-921] A seed reproduces a map only with the same size/options/version and cannot store the user's changes.
- [OBSERVED docs/architecture/data-model.md L18; generators/graph-override.ts L42-58] The only geometric override that survives graph rebuild is moved pack vertices (record 51), restored only if the vertex's original position still matches.
- [OBSERVED heightmap-editor.ts L624-654, L711-737] Risk mode keys per-cell arrays by **grid** index to re-attach them after pack rebuild, and relocates burgs by nearest land.
- [STATED docs/architecture/generation-pipeline.md L63-80, L155-191] Pipeline is data (phase table), with Erase/Keep/Risk/Resample compared in a table.
- [OBSERVED controllers/assistant/proposals.ts L37-64, L66-87] Assistant proposals run on a structured-clone draft (`World.draft`), record changed rows (before/after), check "matches live" before Apply/Undo/Redo, and check reference integrity.

### Inferences
- [INFERRED] Because locked burgs are re-indexed on regenerate, FMG entity ids are **not** persistent addresses; anything holding a burg id (notes keyed by type:id, markers, journeys) depends on the generator updating the references it knows about.
- [INFERRED] Determinism after edits is impossible by design: edits are absorbed into data, the seed only governs the initial generation; FMG's "customization" is a data snapshot, not a replayable edit log.

### Gaps
- Did not read `resample.ts` beyond lock clearing; exact behaviour of ids under transform/submap not verified.

---

## 4. Rendering architecture and layers

### Takeaway
One SVG with a `Layers` registry of 42 layers in z-order; each layer has a `draw` function that is idempotent and reads only state; a `ViewportRenderer` reconciles heavy layers (labels, markers, burg icons…) against the visible bounds with overscan; performance presets trade shape rendering and halo quality for speed.

### Cited Findings
- [OBSERVED docs/architecture/architecture.md L186-188, L403-404, L421-426] Renderers idempotent and stateless; overlays self-cleaning.
- [OBSERVED components/layers.ts L41-277, L280-407] Registry API (`draw/show/hide/set/restore/eraseAll/move`), flags `permanent`, `keepContent`, `erase`; 42 registered layers from ocean to legend; state persisted in .map data index 50 [OBSERVED services/io/save.ts L76, L190].
- [STATED docs/prd/layers-management.md] `restore` never draws; fade removed; heightmap editor snapshots layer state.
- [OBSERVED renderers/index.ts L1-27] Renderer modules self-register on import; overlays are brush-circle, fogging, highlight.
- [OBSERVED renderers/viewport/viewport-renderer.ts L139-150, L180-182] `Scene` + `ViewportLayers` with schedule/renderNow/shouldReconcile; overscan 80 px, guard 40 px, zoom-in ratio 1.2.
- [OBSERVED renderers/labels/labels-renderer.ts L13-23, L35-46, L79-108, L110-125] Labels: full draw replaces the scene; `redrawLabel` re-materialises one label; reconcile per group materialises only labels inside bounds; group visibility by zoom min/max unless `showAll`, plus optional layer dependency.
- [OBSERVED components/zoom.ts L8, L41-77, L100-110] Zoom extent [1,20]; per-frame scale bar redraw on scale, coordinates on pan, viewport redraw continuous vs settled; zoom-end sets font sizes by `ZOOM_CURVES` and scales halo stroke width by scale^0.8.
- [OBSERVED components/viewport.ts L6-10] Zoom curves for labels/markers/burgIcons.
- [OBSERVED components/performance.ts L9-13; performance-settings.ts] Presets quality/balance/speed controlling shapeRendering, state halos, viewportRedraw mode. [STATED wiki Performance page table]
- [OBSERVED components/layers-presets.ts L7-44] 13 layer presets, custom ones in localStorage. [OBSERVED layers-tab.ts L94-125] Ctrl+click opens style editor; drag reorders via `Layers.move`; 3D refresh after 400 ms.
- [OBSERVED components/canvas.ts L29-39] Derived zoom floor fits the map.
- [OBSERVED docs/architecture/lazy-loading.md] Controllers and icon sets are lazy chunks; export awaits chunks.
- [OBSERVED components/viewbox-events.ts L27-75] Click-to-editor mapping by parent/grandparent group; label click opens label or burg editor.
- [OBSERVED components/reveal.ts L52-56] Zoom-to-fit then highlight after 750 ms.
- [OBSERVED components/dialog/dialog-helpers.ts L96-116] `REFRESHABLE_EDITORS` list; editors refresh by clicking their own refresh buttons.
- [OBSERVED renderers/draw-grid.ts L4-25] Grid is an SVG pattern (hex/square) scaled/translated by style options.
- [OBSERVED renderers/draw-legend.ts L14-25, L100-119] Legend boxes keyed by title with stored positions; redraw never reshuffles; kept within canvas.
- [OBSERVED renderers/draw-scalebar.ts L7-9, L21-34, L77] Scale bar owns its click control (TODO noted), skips drawing when hidden, labels computed from units scale ÷ zoom level.

### Inferences
- [INFERRED] The "list of layers to redraw" after every edit is the weakest link: correctness depends on each controller remembering every dependent layer (the Assistant's `redraw.ts` tables are the only declarative version of that mapping).

### Gaps
- `draw-states`, `draw-borders`, `draw-rivers`, `draw-routes`, `draw-burg-icons`, `draw-markers`, `draw-relief-icons` internals not read (only registry entries).

---

## 5. Styles, labels, embellishments

### Takeaway
Styles are a zod-validated record keyed by element with `attrs`/`options`/`groups`; the style editor is schema-driven with declared effects; 15 system presets plus custom ones; labels are entity-derived records with optional per-label overrides and a cost-based spread solver; embellishments (compass, scale bar, grid, legend, vignette, texture, fog) are ordinary layers.

### Cited Findings
- [OBSERVED docs/architecture/style.md L72-86, L172-197, L204-217, L299-343, L364-373] Fixed vs user groups; font sizes and zoom curves; writeAttr edit path; styles stored in .map data index 48; 15 system presets, custom presets in localStorage prefixed `fmg-style-`; preset apply steps; control list; effects; baseline diff/reset; invariants.
- [OBSERVED style-editor/effects.ts L14-26] Effects: write attr, zoom → `invokeActiveZooming`, regenerateRelief → `Relief.generate`, draw → `Layers.draw`.
- [OBSERVED style-editor/elements.ts L42-76; controls.ts L265-271] Group sources for labels/burgIcons/routes/lakes; custom controls (filter, font, blur, dash, transform, label style, scheme, texture, icon); grid readout formula uses units scale.
- [OBSERVED style-preset.ts L32-49, L88-118] Preset application sets store, ensures group styles, writes all attrs, vignette and colour schemes; confirmation once per session; full `Layers.drawAll` + zoom refresh.
- [OBSERVED generators/labels-generator.ts L6, L49-52, L66-153, L184-201, L236-291] Six label types; layout validation (fontSize 30–300 etc.); 14 default groups with zoom bounds; fallback group per type; `setGroup/regroup/setLayout/hasOverride/reset`.
- [OBSERVED renderers/labels/label-data.ts L50-168] Label data built per entity: `pathPoints` undefined = auto, empty = plain text, non-empty = own path; state labels fitted via `fitStateLabel` unless overridden; name mode auto/short/full per group.
- [OBSERVED renderers/labels/fit-state-label.ts L8-15, L17-80; label-raycast.ts L29-34, L83-109] State label fitting: font size bounds 40–160 %, raycast at 9° steps up to length 300 preferring horizontal rays, one- vs two-line and short- vs full-name selection by gain thresholds.
- [OBSERVED label-arc.ts L7-9, L21; label-markup.ts L7-61] Arc paths for point labels; SVG `textPath` with startOffset/font-size/letter-spacing.
- [OBSERVED label-groups.ts L6-37, L56] One `<g>` per label group with attrs written from the style store; fallback font sizes per type.
- [OBSERVED controllers/label-spread.ts L92-129] Spread solver: 12 directions × 6 step multipliers for point labels, start-offset candidates for path labels, overlap/obstacle/burg-conflict weights, refine passes 8, simulated annealing 2k–20k iterations.
- [OBSERVED docs/architecture/icons.md; docs/prd/icon-library.md, icon-assets.md, relief-icon-pools.md] Icon sets with glyph ids, relief descriptors `{type,variant?,set?}` or `{icon}`, 34 relief slots with alias fallback, custom icons in IndexedDB, pools per biome.
- [OBSERVED components/layers.ts L280-407] Embellishment layers: texture, grid overlay, coordinates, compass (uses a defs rose), fogging (mask), scale bar/vignette/legend under the `map` parent.
- [OBSERVED renderers/draw-legend.ts L25-53] Legend columns from style options, font-size inherited.

### Inferences
- [INFERRED] Label overrides are a model of "authored presentation override over derived default" very close to SettlementForge's intent, but they are stored on the entity (`entity.label`) rather than in a separate overrides layer, and the text override can silently diverge from the entity name.

### Gaps
- Exact preset names and palette contents intentionally not reproduced; fonts list not read (only that fonts are serialised in the .map, save.ts L70).

---

## 6. Scale and units

### Cited Findings
- [OBSERVED docs/architecture/configuration.md; units-editor.ts] Distance scale "1 map pixel = N units" (default 3, range 0.01–20), 9 unit keys, height exponent 1.5–2.2 affecting temperature/biomes; pins store (`fmg-locks`) protects options from regeneration [OBSERVED components/pins.ts; configuration.md L136-151].
- [OBSERVED renderers/draw-scalebar.ts L77] Scale bar tick labels divide by zoom level and multiply by distance scale.
- [OBSERVED style-editor/controls.ts L265-271] Grid readout = grid scale × 25 × units scale.
- [OBSERVED submap-tool.ts L124-140] Submap divides distance and population scales.
- [OBSERVED journey-editor.ts L451] Speeds stored in km/h, typed in the user distance unit.
- [STATED wiki Units page] Units are presentation; cells are the unit of geometry.

### Inferences
- [INFERRED] Scale is a single global ratio, so distance is uniform across the map; there is no projection-aware scale.

---

## 7. Implications for SettlementForge

### Takeaway
Keep the layered contract (state → model methods → controllers → idempotent renderers), the lock concept and the Assistant's diff-based proposals; generalise the layer registry and effect declarations; reject per-controller redraw lists, id re-indexing and direct `pack` mutation; replace session-only undo with a persistent edit log over stable addresses.

| Capability | Verdict | Reasoning |
|---|---|---|
| Model classes own all mutations (`X.rename/setCells/…`), validated by tests | KEEP | Clean editing API reused by UI and Assistant [OBSERVED model-edits.test.ts; operations.ts L24-47]. |
| Idempotent `draw-*` renderers + Layers registry with z-order, persisted visibility | KEEP/GENERALIZE | Works; generalise so dependencies are declared (as Assistant `redraw.ts` does) rather than listed per controller [OBSERVED redraw.ts L5-60 vs map-commands.ts L707-825]. |
| Style store with schema, declared effects, baseline diff, presets | KEEP | Declarative effects are the right abstraction [OBSERVED style.md L310-343]. |
| Per-entity `lock` honoured by regenerate | GENERALIZE | Good but binary; SettlementForge should treat "authored" fields as locked at field granularity, not entity. |
| Label records with override-vs-auto path semantics and spread solver | GENERALIZE | Move overrides into a separate authored layer keyed by stable id; keep solver as derived pass [OBSERVED label-data.ts L155-162]. |
| Assistant proposals: draft world, before/after rows, staleness check, Apply/Undo/Redo | GENERALIZE → core | This is the only true undo in FMG; make it the universal edit transaction [OBSERVED proposals.ts L21-87]. |
| Session-only, capped, per-tool undo histories | REPLACE | Inconsistent coverage (7 tools), lost on close [OBSERVED heightmap L57; wrap L116; paint L59-60; diplomacy L208; KB L51-53]. |
| Hard-coded "layers to redraw" per command/controller | REJECT | Source of stale rendering; replace with dependency-driven invalidation. |
| Re-indexing locked entities on regenerate | REJECT | Breaks persistent addresses [OBSERVED burgs-generator.ts L842-860; states-generator.ts L247]. |
| Direct `pack` mutation from controllers (colors, zones, rivers, relief, goods, diplomacy) | REJECT | Bypasses validation/tracking. |
| GraphOverride (original→edited vertex pairs restored if original matches) | GENERALIZE | Right idea for authored geometry over regenerated base; extend to all geometry and use content-based matching. |
| Heightmap Erase/Keep/Risk modes | GENERALIZE | Replace with explicit derived-state recomputation driven by what changed. |
| Customization mode flag that blocks other editors | REJECT | Global mutable mode; use transactional edit sessions instead. |
| Performance presets, viewport reconcile with overscan, zoom curves | KEEP | Proven approach [OBSERVED viewport-renderer.ts L180-182; zoom.ts L100-110]. |
| Omnibar, hotkeys (Ctrl+Z/Y click undo buttons, brush size keys, Delete) | KEEP (UI) | Cheap; note Ctrl+Z only works inside tools that render undo buttons [OBSERVED hotkeys.ts L55-56]. |
| Mobile/accessibility | REPLACE | Not supported [STATED wiki Q&A L60-61]; hotkeys suppressed in inputs only [OBSERVED hotkeys.ts L117-125]. |

### Where FMG lets the map drift from its model (stale derived data)
1. Keep mode after heightmap edits leaves rivers, biomes, features, political data on old terrain [OBSERVED heightmap-editor.ts L543-547].
2. Risk mode re-derives physical layers but not culture/state territories; burgs are relocated by nearest land [OBSERVED L711-737].
3. Wrap tool moves vertices only; burgs/rivers/routes/labels don't follow [STATED wrap-tool.md].
4. River control-point edits partially update `cells.r`/`fl`, never flux/basins/lakes [OBSERVED river-editor.ts L194-227].
5. Remove-all-rivers zeroes `cells.r` but leaves lakes/flux/biomes [OBSERVED rivers-overview.ts L862-867].
6. Feature subtype/group change has no cascade [OBSERVED features-overview.ts L375-377].
7. Label text override diverges from entity name; FMG only warns [OBSERVED labels-editor.ts L395-402]. Burg move resets label path but province/state paths reset only via paint/recalculate [OBSERVED burgs-generator.ts L1046; states-editor.ts L1064-1078].
8. Zone painting writes cells directly; zone population not re-derived [OBSERVED zones-editor.ts L312-322].
9. Marker appearance edits are applied to every marker of the same type [OBSERVED markers-editor.ts L267-275].
10. Treasury/taxes/type edits do not recompute production or trade [OBSERVED states-editor.ts L747-756; burg-editor.ts L388].
11. Military unit-type edits require a full `Military.generate` [OBSERVED military-overview.ts L512-586].
12. Manual goods placement explicitly does not affect production/trade until regenerated [OBSERVED goods-editor.ts L666-688].
13. Routes removal/edit does not re-route journeys or trade [OBSERVED routes-overview.ts L284-319; journey-path-editor.ts L380].
14. State/culture/religion type and expansionism only propagate when an auto-apply checkbox is on [OBSERVED states-editor.ts L821-838; cultures-editor.ts L818-824; religions-editor.ts L943-948].
15. Regenerate commands redraw fixed layer lists; e.g. regenerating rivers does not redraw biomes or labels of removed rivers unless listed [OBSERVED map-commands.ts L707-825].
16. Burg relocation does not re-route roads [OBSERVED burg-editor.ts L709-713; generators/burgs-generator.ts L1024-1046].
17. Units editor height exponent regenerates temperature but not biomes [OBSERVED units-editor.ts L656-661]; World configurator regenerates biomes but not population/states [OBSERVED world-configurator.ts L303-319].
18. Relief icons are regenerated wholesale by a style effect, discarding manual icon edits [OBSERVED effects.ts L14-26; proposals.ts L57-61].

---

## 8. Sources read

Read in full: `docs/architecture/{architecture,style,lazy-loading,icons,generation-pipeline,configuration,data-model}.md`; `docs/prd/{layers-management,omnibar,wrap-tool,icon-library,icon-assets,relief-icon-pools,features-overview,controller-service-registry,assistant}.md`; all wiki pages listed in the assignment incl. Knowledge Base, Quick-Start, Hotkeys, Units, Performance, Q&A; `src/generators/model-edits.test.ts`; `src/components/{layers,map-commands,hotkeys,viewport,zoom,performance,performance-settings,layers-presets,layers-tab,lifecycle,canvas,seed,map-brush,viewbox-events,reveal,annex-mode,tools-tab,customization-tab,pins,dialog/dialog-helpers}.ts`; `src/renderers/viewport/viewport-renderer.ts`, `src/renderers/labels/labels-renderer.ts`, `src/renderers/{index,draw-grid}.ts`; `src/generators/graph-override.ts`; controllers read in full: heightmap-editor, states-editor, wrap-tool, vertex-brush, paint-editor, coastline-editor, river-editor, river-creator, river-auto-creator, lakes-editor, features-overview, zones-editor, markers-editor, marker-creator, markers-overview, markers-settings, labels-editor, label-creator, notes-editor, route-editor, route-creator, military-overview, style-editor/* , style-preset, measurers-editor, units-editor, view-3d, transform-tool, submap-tool, assistant/{proposals,redraw}.ts.

Read partially (targeted greps/sections with line numbers): burg-editor, burg-creator, burgs-overview, burg-group-editor, provinces-editor, cultures-editor, religions-editor, emblems-editor, relief-editor, relief-pool-editor, relief-rules-editor, ice-editor, biomes-editor, diplomacy-editor, goods-editor, omnibar, label-spread, labels-overview, labels-group-editor, routes-overview, route-groups-editor, regiments-overview, regiment-editor, lore-editor, journey/*, world-configurator, rivers-overview, minimap, assistant/{change,operations,world}.ts, controllers/index.ts; `src/generators/{burgs-generator (L830-870, L1020-1076), states-generator (L195-260), labels-generator}.ts`; `src/renderers/labels/{label-data,fit-state-label,label-raycast,label-arc,label-markup,label-groups}.ts`; `src/renderers/{draw-scalebar,draw-legend}.ts`; `src/services/io/save.ts`.

Not read: cell-info, battle-screen, charts-overview, ai-generator, hierarchy-tree, elevation-profile, namesbase-editor, market/production overviews, trade-animation-editor, icon-picker/*, emblems/*, remaining draw-* renderers, resample.ts, export.ts. Web searches used: 0 of 4. Nothing was unreachable.
