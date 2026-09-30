=== REPLACE ### 8.3 Symbol catalogue and draw-style census ===
### 8.3 Symbol catalogue and draw-style census

**Catalogue.** Filled faces with hairline outlines; cased ribbons with square lane ends at kerbs; shore marks per bank
segment; repeated-offset shoreline bands; raised under-copies and prism shadows from heights; library crowns (§8.10);
clipped hatching at a per-face angle and tapered ticks; one composited shadow pass per layer; tinted pattern textures with
per-face light; field-raster ramps, hillshade and contour / hachure marks; curved per-glyph text with a role halo; a
point symbol for every `Pin.kind` of §2.7; screen-space furniture (§9.5); door ticks by entrance role, frontage-treatment runs and the passage arch (§8.2's rows;
items 19, 29, 30); trace hairlines, the vault hatch and the overrides of §8.2's `states` table; access-point symbols on
the ground layer (II.7.4); the change marker (§8.5). Every semantic visible at a band has exactly
one registry glyph, from which the legend is generated (O12 d).

**Draw-style census** (G-R2 / G-R18): a regression suite per preset, run on the golden suite (§13.3) and in B-ZOOM
(§13.4). **Order parity** (VIS-16): the reference's recorded order is a subsequence of the preset's, and every semantic the
reference never drew sits at a declared slot with a reason (§8.2's `OrderSlot`s).

| check | presets | pass |
|---|---|---|
| casing Δ = 2h on every ribbon, at every settled view | all | ± 0.1 px (hairline fidelity) |
| 0.5-px hairline ink coverage at 1× | ink | 50 % ± 10 % |
| round joins and caps | ink | ≥ 99.9 % |
| drawn wall, tower and road-core widths against MFCG at the matched scale (MFCG size 40, 0.816 px/m) | ink | within ± 15 % of 6.2 / 12.4 / 6.5 px |
| outline share of footprint pixels at the city band, default view, every rung | ink | ≤ 25 % |
| walls after buildings; wall-symbol pixels inside plots | ink | order holds; 0 pixels |
| order parity | all | subsequence and declared slots |
| draw order: the (slot, pass) sequence of every tile's draw calls, logged by an instrumented raster (N-7) | all | non-decreasing in the slot table, then in pass, in every tile |
| sliced rasters: per preset and band, the golden views' densest district- and neighbourhood-band tiles and a whole-CITY city-band view, each tile rastered by one `step(Infinity)`, by `step(1)` until done, and by `step(1)` with another tile's job, a furniture query and a band answer for districts outside the tile served between every two steps (§8.9) | all | pixel-identical in the three runs; logged (slot, pass, z, key) call sequence identical |
| sliced placement: per preset, every golden view's stop and the stop of an A2 300-dpi export of a golden CITY, S13b by one `step(Infinity)` and by one unit per step, with a furniture query, a raster step and a band answer for districts outside the view served between every two steps (§8.9, §9.2) | all | identical placement digests (§13.3) |
| light steps: a METROPOLIS view in `lit` with `prism` shadows and a `path` sun advanced one 1° step per frame across three light steps, then stopped, on a tier with shadow layers and one without, both at tile DPR 1 (§8.4, §8.8) | lit | after the stop every cached `under` and `over` (or `base`) tile carries the final light step; the two tiers' tiles equal outside the projected-shadow pixels; the view pixel-identical to a fresh render at the final sun |
| slot resolution by §8.2's rule | every shipped sheet at every band in CI; every sheet at load | 0 unresolved, 0 ambiguous; each `derived` kind in one slot per band |
| contrast matrix (§8.2) on the rendered city band | all | every pair present at or above its floors |
| text against its halo, every placed glyph (N-3) | all | the label floor (§8.2), halo role by §9.4's rule |
| foam on `quay` and `sheltered` shore segments | lit | 0 % |
| tree marks over a tier-1/2 casing at the city band | all | 0 pixels |
| casing pixels inside junction mouths on district boundaries | all | 0 |
| role continuity across band switches | each family | §8.2's bar |
| decoration stability over a city → neighbourhood → city sweep, for stamped classes (woods, gardens, parks, scatter) and `grid` (orchards) and `line` (avenues, hedgerows) classes (N-10) | all | each instance appears at most once and keeps its position; every coarser band's set is a subset of the finer's; an unchanged view re-renders pixel-identically |
| render-time keys: an unchanged model saved, reloaded and rendered, and derived in two district orders | all | tiles pixel-identical to the first render |
| render keys across seeds: two B-CITY-lite seeds per rung, every pair of entities with equal lineage hashes | all | the render keys differ for every pair |
| stamp tiles: the H128 of each (class, tile index) tile of the shipped asset — its points' cm coordinates and ranks in point-index order (§8.10) | all | as loaded in the generation and tile workers: equal to the stored value (PR tier; every session checks it too, §8.10); as rebuilt by `plat/tools/stamptiles/`: byte-identical to the shipped asset on the five engines (Node x86 / arm64, Chromium, Firefox, WebKit; nightly); a moved stored value is a view shift (§13.3) |
| stamp-tile seams: per stamped class, all 256 2 × 2 arrangements of cells drawing its four tiles (every ordered pair side by side in both directions, every corner), for the full point sets and each band's rank subset (§8.10's r < s_b) | all | 0 pairs of points in different cells closer than r₀ (an integer test on tile cm); `plat/tools/stamptiles/` refuses to write a failing asset, and the PR tier re-runs the check on the loaded asset |
| roof lines outside their footprint (the F-SKELETON plain downgrade) | all | 0 |
| per wing, `hatched` | hatched | 15–20 hatch triangles; no ridge stroke; outline = footprint only (NG BG-3; N35) |
| two-tone roof law with our palette | hatched | dark = lit × lerp(ambience, shadow, α) within ± 0.02 (IMP-15) |
| water bands | painterly | band widths follow W · (i / N)^1.5 for our N and W within 1e-4 |
| label floors, counts, collisions | all | §9.4 |
| street-edge recoverability, access ways drawn | ink | §8.5 |
| states: every (kind, state) pair that §2.8's ladders, `Building.condition`, `SkyIsland.state`, `Enceinte.supersededBy` and `Passage.sealed` can produce — other than the undeclined defaults (`kept`, and the Existence values `generated`, `built`, `altered` and `converted`), which draw the entity's own programs, and `demolished`, a tombstone that is never drawn — resolves one `states` row (§8.2) per band the kind is drawn at, in every shipped sheet (CI, and at every sheet load) | all | 0 unresolved; a golden TOWN converted by hand once through every building, wall, gate and passage conversion of §4.11 draws those kinds' rows, and a hand-built CITY fixture holding one tunnel and one island record (§2.7's schema) draws the tunnel and island rows until their stages register |
| hidden courts (item 30): on B-CITY-lite seeds whose hidden share is > 0, every court face reached only through a passage (§4.6), at the city band | ink | drawn in `ground` under its block's masses and enclosed by drawn masses or outlines on ≥ 3 sides; 0 hidden plots drawn as `road` or `paper` voids; §8.5's figure-ground metrics within 0.01 of the same seeds at hidden share 0 |
| knowledge (item 30): a golden CITY rendered at the `public` tier and at `secret` under the shipped `knowledge.admit` rows (§9.2), with no thematic row and with a `use`-keyed one (§8.2) | all | with no theme the base tiles pixel-identical, with the `use` theme differing only on the marks of places `public` does not admit, which draw unthemed; the composed tiles differ only where label glyphs lie; at `public` no glyph run of a `local` name at the city or district band, none of a `secret` name above the building band and no legend key of a withheld use; each tier's per-stop placement digests equal §13.3's |
| entrances (item 29): the golden views' district-band tiles | all | exactly one `main` tick per building, placed where §2.6's rule 1 puts it (its frontage, the court or path from the plot's street gate, or a hidden plot's access face); every `side` or `rear` tick on an access edge of its plot beyond the frontage, every `yard` or `service` tick facing a yard or court part of its plot (§2.6's rules 2–3) |
| change markers (item 28): B-ZOOM over a document holding three `stale` rungs (a designation change, a re-let, a dossier event) | all | a marker at every band for each stale building and one for its district at the city band; none after the click; the base tiles unchanged by the marker |
| plots-only view (item 28; §8.5): the golden views at the city and district bands with `plotsOnly` on | all | every plot boundary drawn, 0 building marks; the default view's base tiles pixel-identical once the key is off |
| passages (item 30; §8.5 (2)): B-CITY-lite seeds whose hidden share is > 0, every passage with a `frontBuilding` | ink | at the city band its span ring inside its block's mass (0 `ground`, `road` or `paper` pixels over it); at the district band its floor in `road` with an arch glyph at each end, drawn closed where `Passage.sealed` |
| the plan draw (item 28; §8.5, §8.6): every B-PLAN fixture of §13.2, building band, `ink` and its `night` variant | all | every drawn room label inside its room's ring at a cap height within §9.4's room-label range, a room left unlabelled only where its label does not fit at the range's bottom, and 0 S13b glyphs over one; one light per lit room, at its spine summit, and none in an unlit room; one stack per `Chimney` and no decorative chimney on the building |
| roof by band (items 19, 23; §8.2): the `lit` default sheet on a golden CITY, textures off | lit | each building's roof tone, read through the pick buffer, is its prosperity band's row; every row passes the contrast matrix's `building` pairs |

=== REPLACE ### 8.5 Level of detail, the city-band figure-ground contract, way selection, first paint ===
### 8.5 Level of detail, the city-band figure-ground contract, way selection, first paint

**Bands.** **city** — water; block ground; footprint masses and landmarks; tier-1/2 ways cased and access-critical lanes
(below); symbolised walls, towers and gates; bridges; parks and greens ≥ 0.3 ha in `green`; wood fills; fields; quarter
labels (the city cut, §4.5, §9.4), water, major landmarks, gates. **district** — district names; footprints with
outlines, entrance ticks by role and frontage-treatment runs (§8.2's rows; items 19, 29); yards by role; boundary treatments; every way stroked; courts; greens; crowns; way names.
**neighbourhood** — the family's close-up (§8.2); every named way; addresses; pins; stage 2 composes here (§8.6).
**building** — wings and, once its plan rung exists (§2.6; item 28), the floor plan one storey at a time — the
per-viewer view key `storey` (§2.9) names it, default the ground storey, a basement or an upper storey by choice, the
other storeys' wing outlines faded beneath it — with walls by kind, openings and every entrance's door (§2.6's entrance
set), windows, the stair core, chimneys, abstract furniture by room role, room labels and lights (below; §8.2's presets); a building
whose plan rung is `absent` draws its wings, a `stale` one its cached plan under the change marker below (J-A28.82). Way tiers: 1 = `through`, `primary`; 2 = `secondary`, `quay`; 3 = `lane`,
`cul_de_sac`, `alley`, `track`, `path`; `pier`, `bridge` and `ford` draw with their way. Continuous zoom selects the band
with hysteresis (entered at its threshold stop, left one stop past it); added detail cross-fades across that interval;
per-band detail budgets by hardware tier; no feature pops more than once across a zoom sweep (B-ZOOM).

**Room labels and lights at the building band (item 28; J-A28.32, J-A28.85, J-A28.87).** The plan draw sets each room's label
itself: the room's role (§2.6's `RoomRole`, a §10.2 row's name) along the room's label spine — §3.8's `spine` reader on
the room's ring, its sampled medial axis on a downgrade — at the largest cap height in §9.4's room-label range whose
glyph boxes fit within the room's ring, and not at all below that range (hover still names the room). A room label is
a `text` mark with no `LabelTable` row (§8.1 item 2) and
never an S13b candidate: each lies inside its own room and the rooms of a storey never overlap (§3.10's seed-tiling
row), so room labels never collide with one another, and S13b reads their boxes as protected obstacles at the building
band (§9.2), so no placed label crosses one. A lit room (`Room.lit`, §2.6) has one light point at its spine summit —
the axis point of greatest clearance — drawn as a `lights` glow in the `night` variants (§8.2's
presets; §8.4's night switch) and exported as the storey scene's light (§11.1). A derived plan's chimneys are drawn by
the roof construction (§8.6).

**The city-band figure-ground contract (MFP-1).**
1. Every L2 built block is filled with `ground` at every band; at the city band yards are not subdivided (parks and greens
   ≥ 0.3 ha show in `green`; enclosed courts stay `ground` and take `court` from the district band, keeping `ink`'s eight
   city-band tones, §8.2, N-25 — a hidden court reached only through a passage or a sealed one, §4.6, item 30, is such a
   court: it reads as a court behind the block's masses and never as a paper void, §8.3's census row), so inside the built area streets and squares are the only `road`-role voids.
2. At the city band footprints are drawn over the ground as **masses**: per block, closed across gaps narrower than 1.5 px
   at the zoom stop (offset +r then −r, r = 0.75 px × metres per px, in the kernel's integer offset, computed and cached
   per (block, stop, revision) in the tile worker from the footprint marks, which carry their block in the `block`
   column), never across the corridor of a way drawn at the band (the closing is clipped by those corridors, so an
   access-critical alley stays open), filled with `building` and outlined at the band's outline width; party lines
   between one mass's footprints at one third of that width, only where the footprint's short side is ≥ 4 px. **A
   building over a passage** (`Passage.frontBuilding`, §2.5) adds a **span mark** to its block's closing: the passage's
   span ring — §2.6's cut of the `Passage` face under the base wing that spans it (`BaseWing.spans`, which a composed
   wing inherits as `Wing.spans`) — so its upper storeys cover the passage at the city band
   (J-A30.84, J-A30.87). S14 emits the span mark at every band, its `block` column the building's, its `baseCm` column
   the building's base plus the passage's `headroomCm` and its height the eave; only the city band paints it,
   the finer bands reading it as a shadow caster alone (§8.4) while the passage's floor draws in `road` under its arch
   glyphs (§8.2).
3. A mass smaller than (2 px)² that merged with nothing is a 2-px **settlement dot** in `building` with an ink rim — a
   symbol at the centroid, never an enlarged footprint (O12 a's 2-px floor).
4. Access-critical lanes are drawn as below.

**Metrics** (B-ZOOM, city band, default view, every rung). **Street-edge recoverability** — the share of intramural street
length (sampled every 2 px along corridor centrelines) with a road / non-road transition within (half-width + 1 px) on
both sides — ≥ MFCG's value on its size-40 / 80 / 130 plain sweep renders less 0.03; MFCG's value is measured
research-side at M-1 by this metric (§13.5 ⟨M-1⟩), and the product's implementation is cross-checked against it on M1's
golden renders within 0.01. Road / ground contrast is the matrix's (§8.2); gross footprint cover inside the walls is
reported beside MFCG's as information, not a target (§13.5; yards are the owner's plot-model ruling). **Pre-decided
fallback** if recoverability fails at M1: the ink city band adds kerb hairlines (0.25 px, `ink`) along every open
frontage run ≥ 6 m (detached, compound, hovel, vacant and green frontages) and re-runs the metric (J-R5).

**Way selection at the city band (VIS-3, N-6).** Tiers 1–2 are always drawn. A tier-3 way is **bounded** when the
footprint-covered share of its frontage is ≥ 0.8 on **both** sides and its width is at least the closing's 1.5 px at the
stop (the gap between two continuous masses already reads as a street). It is drawn when **access-critical** — some plot
has all its access edges on it and fronts no other drawn way — and not bounded, i.e. covered below 0.8 on at least one
side (a lane with a row on one side and open gardens on the other) or narrower than the closing. Drawn tier-3 ways take
the lane symbol (body = max(model width, 1 px), casing h / 2); bounded intramural lanes and alleys stay unstroked gaps
between masses. Suburb offshoots, ribbon back lanes, farm tracks and extramural lanes are therefore drawn. Metric: the
share of city-band plots whose access way is drawn or bounded ≥ 95 %.

**Line greenery (VIS-14).** Avenues and street trees are not drawn at the city band; they appear from the district band,
where a crown is ≥ 4 px. Check: no tree mark covers a tier-1/2 casing at the city band (§8.3; J-R6).

**Views that are not the default (item 28; J-A28.42).** `plotsOnly`, a per-viewer view key
(§2.9), is the cadastral view: at the city and district bands it draws every plot's boundary (§2.5's cadastral outline
group) over the block ground and no building mark — masses, footprints, entrance ticks and roof detail off; walls,
ways, water, greenery and labels as they are. It is never the default: the default at city zoom is every footprint, MFCG's look, as J-A28.42 rules (§4.1).

**Change markers (item 28; J-A28.81).** A building whose elaboration record (§2.8) reads `stale` — an input of its wings
or plan rung changed since it was derived (§4.1) — carries a marker glyph at the building, neighbourhood and district
bands; a district holding any stale building carries one marker at the city band, so the user sees where the simulator
or the dossier has moved on and clicks at their own pace. The marker is the `live.stale` overlay layer (§8.2): composed
onto the tiles without re-rastering a base, never hashed, read from the records outside every digest; it vanishes when
the click re-derives the rung from its canonical prior — for a plan the stored plan, else the as-built plan carried
along §2.6's interior ladder; for wings the stored or as-built wings — never from the cache (§2.6, §7.3; J-A28.71).

**First paint.** The one-click first paint is the complete city band — S0–S13a for every district and S14's city band —
with no S9 block preview on the one-click path (SCL-4; J-R7). Lazy work is only what the city band does not draw: yard
sub-parts, entrance ticks (the entrance set itself is S11's, §2.6), roof ridges and hatching, street names and addresses (view data, §9), crowns and scatter (§8.10), and the stage-3 rungs — wings and plans — by
click or by view (§4.1).
Proxy thumbnails (§7.8) draw S0–S4 marks in a distinct preview style and are never presented as the map.

=== REPLACE ### 8.9 Backends, text, threads and the worker boundary ===
### 8.9 Backends, text, threads and the worker boundary

* **Canvas2D is the reference backend of every shipped preset** (`ink`, `lit`, `hatched` and variants), on an
  `OffscreenCanvas` in the tile worker through the resumable raster jobs below; programs render typed-array paths, one
  `Path2D` per (program, semantic, variant) per tile, sprites by `drawImage`. SVG is written from the same display list
  (§11.1).
* **WebGL2 draws no marks.** It exists only as a **pre-decided fallback compositor**: it uploads the composed Canvas2D
  tiles as textures, composites them with the view transform and runs the post operations as one fragment pass — no
  stroke tessellation, no SDF text, no look that differs by backend (VIS-7). Measured at M2b: pan and zoom frame rates of
  the Canvas2D compositor on the reference and low-end devices at METROPOLIS scale (§12.5); the WebGL2 compositor is
  enabled for a hardware tier only if Canvas2D misses ≥ 60 fps (reference) or ≥ 30 fps (low end) there.
* **Text (DEF-6).** All text is drawn by Canvas2D in the tile worker's composition step (§8.8), glyph by glyph at the
  positions computed from the bundled font's own metrics (§9.2), through a glyph atlas per (face, size, stop): each glyph
  drawn once into the atlas and copied per placement. SVG writes the same per-glyph positions — as the face's glyph
  outlines by default, or as text in the embedded face on request (§11.1, N-13) (J-R9). Measured at M1 against §12.7's
  label-composition budget; pre-decided fallback: whole words cached as bitmaps per (text, size, stop) in the atlas.
* **Threads (N-4).** (1) The **generation worker** holds the document and the model and runs S0–S14; it also resolves
  instance overrides (§8.10), runs the live-layer providers (§8.2), builds on-demand bands (the district, neighbourhood
  and building bands of the districts a band request names, `DisplayListBuilder.build(model, band, groups)`), writes every
  export (§11.1), answers the API's `hit` and `inView` queries (§11.2) from the model and its 24-B index (`entity`,
  `bbox`, `group` — all a hit test or a features-in-view list reads), holds the elaboration cache (§2.9), and hands stage-3 `compose()`, `plan()` and close-up
  derivation (§8.6) to the derivation pool — on a click under `elaborate: 'click'`, on the tile worker's band request
  under `'view'` (§4.1). (2) The **derivation pool** (up to three workers, §4.1) runs the per-district
  stages at every rung (§12.3) and, on request, `compose()`, `plan()` and close-up derivation from the committed state of the
  district it is handed; with the pool off the generation worker runs them. (3) The **tile worker holds no model and no
  terrain**: it holds the display list with its label, instance and string tables (the only full copy, §8.1 item 6) and
  from them rasters base layers, runs S13b (§9.2) and decoration instancing (§8.10), composes labels and `overlay` live
  marks (§8.8) and runs post operations; it answers the main thread's furniture and snap queries and rasters raster
  exports from the transient list each request carries (§11.1) — all through the queue below, with everything arriving
  through the table below (J-R23). (4) The **main thread** runs the UI, compositing of the transferred tiles, pointer
  hit-testing on the hit-test slices, screen-space furniture (§9.5; placement scores and ruler snaps asked of the tile
  worker) and input. Nothing model-sized reaches the main thread (J-R10).
* **What crosses (SCL-6, N-4).**

  | from → to | what | how | bound |
  |---|---|---|---|
  | generation → tile worker | display-list deltas: mark columns (with `key`), geometry, field rasters, and the changed rows of the label, instance and string tables (candidates, priority, parent node, pinned placement, `hidden` and `knownTo` per label; stamp parameters, species mix and resolved overrides per `instances` mark) | transferred: each slice copied into a fresh buffer and transferred; the generation worker keeps only the 24-B index columns (§8.1 item 6) | O(changed marks); ≤ 97 B per label row, ≤ 40 B per instance row, ≤ 16 B per species row, ≤ 32 B per override row, plus geometry and UTF-8 text |
  | generation ↔ tile worker (cross-origin-isolated hosts only) | the mark table | `SharedArrayBuffer` columns, no copy — optional, never required (needs COOP / COEP from the embedding host) | — |
  | tile worker → generation | band requests: the districts (group handles) and band that tiles entering the view need and the tile worker lacks; the buildings whose rungs and the districts whose close-ups the band needs (`compose()`, `plan()`, close-up derivation) — derived on the request under `elaborate: 'view'`, and under `'click'` served only from the elaboration cache (§4.1, §8.6) | copied | ≤ 4 KB per request |
  | generation or pool → tile worker | answers: on-demand band marks, `compose()` wings and rooms, `plan()` storeys, close-up marks, as `DisplayDelta` slices naming the request | transferred | ≤ 1 MB per answer |
  | generation → tile worker | live-layer marks (`live.<id>` groups), when the view state a provider reads, the model, the visible region or — for a provider that reads them, `live.stale` — the elaboration records change (§8.2) | transferred | ≤ 256 KB per delivery |
  | tile worker → main | composed tile `ImageBitmap`s; per-tile hit-test slices (mark bboxes + entity handles) | transferred (zero-copy) | ≤ 1 MB bitmap + ≤ 64 KB slice per tile |
  | main → tile worker | furniture-placement queries (view, stop, ≤ 16 candidate boxes: the compass's eight, the title's and the legend's four corners) and snap queries (a pointer in world cm, a radius in px, the stop), each with a request id | copied | ≤ 4 KB per query |
  | tile worker → main | per candidate box its `ObstacleSource.coverage` record; the snapped point from `RoleIndex.snap`, or none | copied | ≤ 4 KB per answer, within one 16.7 ms frame |
  | generation → tile worker | raster-export requests (PNG, print, the `.dd2vtt` scene image): frame, scale, band, layers, post operations and the export's zoom stop (§8.7), and the look and view state at the request — the sheet (its id@version, or the viewer's `stylePreset` sheet with the document's rows, §11.3), §8.8's view-state switches (season, weather, shadow mode, model-layer toggles, `base` live layers, `plotsOnly`, `storey`, `depthBand`), the shadow sun, the light step and the requesting viewer's knowledge key (§9.2, §11.3), which the tile worker keeps until the export completes and rasters every export tile with — each carrying the export's transient list (mark, geometry, label, instance and string tables for its band and frame; §11.1) | request copied; list columns transferred | ≤ 4 KB plus the list (§12.8's export-time peak) |
  | tile worker → generation | the encoded raster: PNG bytes streamed band by band (§8.8); a progress message per band (bands done, bands total) for the export dialog | bytes transferred; progress copied | the file's size; < 64 B per progress message |
  | main → workers | view changes, input, API calls (§11.2) | copied | small |

  Budget: main-thread receive work ≤ 4 ms per delivery (bitmaps and slices only), measured in B-CITY's browser runs.

  **Resumable rasters.** A worker serves its message queue only between two calls it makes, so a tile is rastered by a
  job the tile worker can stop and resume:

  ```ts
  // @plat/render — the tile and vector backends (§14 points here). A tile address is §8.8's (stop, i, j, tile DPR); an export's tiles are addressed at its stop and DPR
  type TileAddress = { stop: number; i: number; j: number; dpr: number };
  interface TileRasterOpts { layers: Layer[]; tileLayer: 'base'|'under'|'shadow'|'over'; shadows: 'off'|'drop'|'prism' /* §8.2's StyleSheet.shadows.projected */;
    sun?: { azimuthCdeg: number; altitudeCdeg: number };        // the shadow sun (§8.4's 1° step): read only by the projected-shadow pass
    lightStep?: { azimuthCdeg: number; altitudeCdeg: number };  // the drawn light step (§8.4): read by faceLight, the two-tone roof, hillshade and the crowns
    tier: 'low'|'mid'|'high'; dpr: number }
  interface TileBackend { begin(tile: TileAddress, list: DisplayList, style: StyleSheet, opts: TileRasterOpts): RasterJob }   // fixes the tile's draw sequence; draws nothing
  interface RasterJob {
    step(deadlineMs: number): boolean;   // runs the sequence on from where it stopped; returns after the first draw call ending deadlineMs or more after this call began; true when the tile is complete
    finish(): ImageBitmap;               // once step() returned true: the finished layer, its canvas transferred
    cancel(): void;                      // drops the job, frees its canvas: the tile left the view, a newer sun step, a delta that dirties the tile
    readonly spentMs: number;            // tile-worker time spent so far; the budgets and the census read it
  }
  interface VectorBackend { write(list: DisplayList, style: StyleSheet, opts: { layers: Layer[]; band: LodBand; frame: Box }): string }   // the SVG writer (§11.1): runs in the generation worker over the export's transient list
  ```

  The queue passes the view's drawn light step for `under`, `over` and `base` and the shadow sun wherever projected
  shadows are drawn; an export's jobs get its request's sheet, switches, shadow sun and light step. `begin` finds every
  mark whose bbox meets the dilated tile (§8.8) and fixes the **draw sequence**: the native calls in §8.1 item 3's
  (slot, pass, z, key) order, each a fill or stroke of one batched `Path2D` (§12.5's per-tile bound), a run of ≤ 64
  sprite draws (crowns, glyph copies), or a derived per-tile operation (projected-shadow union, raised under-copy, post
  operation; §8.2, §8.4). The JavaScript preparing a call (appending rings to its `Path2D`, generating a stamp's
  instances, §8.10) reads the clock after every mark and every 64 instances and can stop there; a native call is never
  split (a split batched fill would draw anti-aliasing seams, §8.8), and a derived operation, which uses the shared
  shadow and post-operation buffers (§8.8), runs whole inside one step — so the overrun past the deadline is at most one
  native call or derived operation. Each job owns its canvas and context state, and what it reads does not change under
  it: deltas are applied between steps, a removed mark becomes a dead row and an added mark a new row, and the tile
  worker compacts its list only while no job is live; a job whose tile a delta's dirty boxes meet is cancelled and
  queued again. Slicing changes when calls run, never which or in what order: a tile rastered whole and in 1-ms slices is
  pixel-identical (§8.3). The queue calls `step(8)` — `step(4)` after the pre-decided fallback below.

  **The tile worker's queue.** Between two steps the tile worker serves its message queue, then runs one step of the
  highest class with ready work:

  | class | work | why it stands there |
  |---|---|---|
  | 1 | furniture and snap queries (below) | an answer is due within one frame |
  | 2 | incoming deltas — edit deltas, band answers, live-layer deliveries — in arrival order; each O(changed marks), ≤ 1 MB per answer | a visible tile needing a band's marks cannot be rastered before its answer is applied, and a tile rastered before a pending delta that dirties it is rastered twice |
  | 3 | the visible view: S13b at the view's stop (§9.2); with a `path` sun, after a new light step, the `lit` crown bake (one sprite per unit) and §8.4's light pass; the visible tiles' raster jobs centre-out, their compositions and commits (§8.8); re-compositions for label and `overlay` changes | the picture the user is looking at |
  | 4 | exports: first S13b at the export's stop over its transient list, its memo held by the job (§9.2, §11.1); in `lit` with a `path` sun, when the crown set of the request's light step is not cached, its bake (one sprite per unit), the set then held until the export completes; then, band by band, the band's raster jobs, composition, read-back (64 rows per step) and encoding (§8.8) | an export waits for the view, never the reverse |

  A class runs only while every higher class is empty, one step at a time, and within a class the job in progress runs to
  completion before the next begins (at most one raster job per class live); a query waits at most one step, and a pan or
  zoom during an export pre-empts it within one step (newly exposed tiles are rastered at once, not behind the export's
  bands). **No starvation:** an export that has waited 100 ms since its last step runs its next step ahead of class 3
  (never ahead of classes 1 and 2) — at most one step in any 100 ms, ≤ 8 % of the worker — so an animated view (a
  `path`-mode sun, moving people, a live layer) slows an export but cannot stop it; a settle (§12.5) then contains at most
  two export steps at CITY and three at METROPOLIS, ≤ 16 and ≤ 24 ms. A newer sun step or a tile leaving the view cancels
  its job (latest wins; §8.4, §8.8). The export dialog shows the progress messages (bands done of total) and, while class
  3 holds the worker, that the export is waiting for the view (J-R46).

  **Placement and crown bakes are stepped like a raster.** S13b — the view's in class 3, an export's in class 4 — is a
  `PlacementJob` whose unit is one decision (§9.2), called with the queue's step limit; a crown bake is stepped one sprite
  per unit. A print's placement over its whole frame therefore runs as a few class-4 steps (§12.7) with queries, deltas
  and the view served between them, and every bound above holds while an export places its labels (J-R51).

  **Queries to the tile worker.** Compass, title and legend placement (§9.5) and the ruler's snapping read the display
  list, which only the tile worker holds; the main thread asks through the query rows above and the tile worker answers
  with `ObstacleSource.coverage` and `RoleIndex.snap` over its list — the implementations S13b uses (§14). A query is
  class 1: it runs at the next step boundary, so it waits ≤ 8 ms plus one native call or derived operation, runs in
  ≤ 4 ms of tile-worker time, and its answer arrives within one 16.7 ms frame; most tiles are one step (a city-band tile
  of a whole-CITY view rasters in ≈ 1.2 ms, §12.5). The ruler keeps one snap query in flight (a newer pointer position
  replaces a queued one) and shows the unsnapped point until the answer arrives; furniture placement is asked when the
  view settles, the furniture keeping its previous place until its answer arrives (J-R40). **Measurement** with the first
  map (M1 at TOWN and CITY, M2b at METROPOLIS) in B-CITY's browser runs: query round trip p95 ≤ 16 ms during a settle
  raster and ≤ 4 ms of tile-worker time per query, each tile's longest native call and derived operation logged beside it;
  exports beside the view are §12.7's run. **Pre-decided fallback:** the step limit falls from 8 ms to 4 ms (`step(4)`),
  halving a query's wait and an export step's share of a settle.

=== REPLACE ### 9.4 Sizes, floors, the ladder, quarters, overflow, halos ===
### 9.4 Sizes, floors, the ladder, quarters, overflow, halos

* **Legibility floors** (display px at 1×): area labels cap height ≥ 7 px (and ≤ 14 px, ∝ √area within the band); way
  labels cap ≥ 6 px; point labels ≥ 6 px; addresses ≥ 5 px; room labels cap 5–9 px, each sized within that range by
  §8.5's plan draw (J-A28.87). Area labels are letter-spaced small caps (0.15 em).
* **The F-LABEL ladder, view side** (every rung reached is counted in the report): (1) the preferred spine at the size
  ∝ √area, never below the floor; (2) the short name form; (3) a straight label on the OBB axis, on one line or on two
  lines broken at a space (two lines at a `breakAt` position); (4) the OBB arc; (5) the **quarter tree** (N-11) —
  decided per stop before the greedy, from geometry alone: when none of rungs (1)–(4) fits the label's own face at the
  floor at this stop, the label yields to the smallest ancestor `QuarterNode` (following `LabelTable.parent`, §8.1)
  whose spine fits that node's own name at the floor. The yielding label is suppressed at that stop and reported ("named
  by quarter Q at stops k…k′"), and the ancestor's own `LabelEntity` becomes a candidate at that stop — once, however
  many members yield to it, and not again when the stop's cut already labels that node — with the highest priority among
  its yielding members, the node's area and the node's label id, so its place in §9.2's strict order is fixed before the
  greedy runs; it then takes its own alternates (its spines and rungs (3), (4), (6), (7)) like any candidate, and
  members whose own rungs fit keep their labels and are obstacles to it like any placed label (J-R27); (6) a declared
  **overflow**: ≤ 20 % of the glyph area outside the face, never over a protected obstacle or another label; (7) a
  **legend entry**: a numbered disc on the face and a row in the legend (§9.5).
* **Quarters (VIS-4, MFP-10).** S6 builds the merge tree of districts once per model by §4.5's rule. S13a gives each
  internal node a name from the grammar, conditioned on its dominant kind and on the naming feature of its largest member
  (§10.4), and a spine from its union (§9.3). The names, spines and the **city cut** — the `min(N_q, L)` nodes of §4.5's
  city cut (L the number of districts; `docs/validation/bench/fixall_pipeline_r2_quarters.out`, J-P28's column), MFCG's
  label count, flagged `cityCut` — are model data; the city band labels the city cut; a stop between the city and
  district bands may use a finer cut (the finest nodes whose spine fits the floor), which is view data; the district
  band labels districts.
* **Halo (VIS-15, N-3).** Each glyph's halo, 1.5 px wide, takes the role of the area mark under the glyph's centre,
  looked up in the display-list index at the label's band (`ground`, `road`, `water`, `field`, `green`, …), **when** the
  text colour against that role passes the **label floor** (§8.2's ink / ground row); **otherwise it takes `ground`**,
  which passes by that same row in every accepted palette. Text is therefore always separated from what it crosses: over
  masses and woods its halo is the block's ground tone (J-R28). With the shipped palettes the local role is kept over
  paper, road, ground, court, field, verge and green in every family and over garden and water in `ink` and `hatched`;
  `ground` replaces building and tree in every family and garden and water in `lit`
  (`docs/validation/bench/fixall_rendering_r2_palette.out`). SVG writes the halo as a paint-order stroke per glyph in the
  halo's colour. A user palette accepted with "accept low contrast" (§8.2) may fail the floor; the report lists the
  failing text / halo pairs.
* **Acceptance** (B-ZOOM; the default view of every rung; the bundled font): **every node of the city cut** —
  min(N_q, number of districts), §4.5 — labelled on the map at or above the floor, and at the matched sizes within ± 1 of
  the 9 / 12 / 18 district labels MFCG's plain sweep draws at sizes 40 / 80 / 130
  (`captures/mfcg/exports-sweep-2026-09-25/README.md`); 0 protected overlaps; 0 collisions at settled views and during a
  scripted zoom sweep, pinned labels included; every placed glyph's text / halo pair at or above the label floor, read
  from the rendered pixels (§8.3); overflows, legend fallbacks, quarter substitutions and hidden pins reported; ≥ 99 % of
  all area-label glyph area inside its face (O13 a); ≥ 90 % of named streets labelled at the neighbourhood band (O13 b).
  **Pre-decided fallback** if a rung labels fewer than its city cut at M1: the default framing percentile (§9.5)
  tightens from 95 % to 85 %, which enlarges every district on screen, and the check re-runs.

=== REPLACE ### 11.1 Formats ===
### 11.1 Formats

| target | mapping | notes |
|---|---|---|
| **native `.plat`** | §2.9's format and canonical form; its byte-identical round trip is tested in §13.2 | import of our own export (MFCG cannot re-import its export; FTG's export ≠ its edit format) |
| **JSON schema** | published, versioned (generated from the `zod` types); entities by id with containment; a `plan` block per building whose plan rung is not `absent`, its state (§2.8) recorded on the block (§2.6; items 28 and 28 (f); J-A28.84): storeys, each with its rooms (address, ring in integer cm, role, `scope` — `unit`, `shared`, `service` or `circulation` — and, for a `unit` room, `unit`, the address of the household whose dwelling unit it belongs to), walls by kind, openings (kind, width, and the entrance of §2.6's set an `entrance` opening serves) and windows; the plan's `units` (each household's address, its unit form and its entry opening), stair cores and chimneys; with the output version and the supersedes table, so an exported plan says who lives where and the room graph follows from the openings; our own schema, never a cell grid | the API's response type |
| **compact twin** | CBOR with typed-array tags; varint zig-zag int32 cm in **world** coordinates, the settlement centre stored in the header, so it is an encoding of the same schema (FTG-21) | embeds and sharing; a decoder is part of the library |
| **GeoJSON** (RFC 7946) | two declared variants (N-14, below): the default **strict RFC 7946** file in WGS84 longitude / latitude through the geo anchor, and the **metric** file by prior arrangement; neither has a `crs` member. One FeatureCollection per layer; one feature per entity with `id` (its address, §6.3), `kind`, `layer`, `epoch` and public attributes; **districts included** (FTG omits them); ways as LineStrings with class and model width; faces as Polygons with holes, emitted without antennae (§3.6 (6)); MultiPolygons for face unions; walls, towers, gates and built bridges as typed features (a crossing `site` is not exported, §2.7); boundary treatments as LineStrings with `treatment` (VIS-8); **trees** per green entity as one MultiPoint of its instance positions (§8.10's function at the finest band, overrides applied: integer-centimetre positions under §6.5's lint, so the file is byte-identical on every host) with `species[]` (each instance's species kind), `crownM[]` and `leafType[]` in the same order, or one Feature per tree on request with `species`, `crownM` and `leafType`, or none (VN-158, XB32); model widths only, never symbol widths; public attributes include the lifecycle states (`existence`, `condition`, a wall's `supersededBy`, a tunnel's `closure`, an island's `state`; items 8, 11, 31), a plot's `exposure` and `knownTo`, a building's `knownTo`, and an institution's `knownTo` on the features of its buildings (item 30), a building's `entrances` as points with their roles (item 29), an underground building's `baseCm` as its depth below the datum and `eaveCm` as its ceiling and a tunnel's invert profile (II.7), a market reservation's `rank` (§4.2); the `name` and the purpose of a place (its `use`, or an institution's kind) the export's knowledge key does not admit (§9.2 and §11.3) are withheld, the feature staying in the file; a fallen island's archived arena is not exported (II.6) | the default file validated by an open RFC 7946 validator in CI and loaded by the scripted QGIS test (O11 d); the metric file checked for geometry validity and its sidecar against its schema |
| **SVG** | written from a transient display list the generation worker builds for the export (below) at a declared band — the city band by default; the district band on request, after a size estimate is shown; the neighbourhood band only for a district-sized or smaller scope; `<g id="layer.ground"><g id="sem.building.footprint">` groups per layer and semantic; inside a group one compound `<path>` per (semantic, district), and a `<metadata>` JSON map from subpath index ranges to entity ids, so every entity stays addressable without an element each; trees as one compound path per green entity (crowns at the district band, the wood outline at the city band); text (N-13; the export dialog's `text` option) by default as **outlines** — each glyph used written once in `<defs>` as a path from the bundled face's own `glyf` outlines (the face the labels were measured with, §9.2; quadratic segments as SVG `Q`), each placed glyph a `<use>` at the per-glyph position S13b computed, the label's text carried in an `aria-label` and a `<title>` so it stays searchable — or, with `text: 'embedded'`, as editable `<text>` (curved labels per glyph, straight labels as one `<text>` with explicit per-glyph x positions) in the bundled face embedded unmodified as an `@font-face` data URI (OFL permits embedding; no subsetting, §17.2) (J-R32); halos by paint-order in both; hatching as compound paths; symbol widths; the colour-matrix post operations as filters (§8.2) | size and element budgets: §12.7; CI opens the METROPOLIS file in Inkscape headless (export to PNG within 120 s) and checks every layer id (O11 h) (SCL-14, VIS-18); the outline file's Inkscape PNG and the embedded file's Chromium PNG each match PLAT's own PNG of the same frame within the visual-regression threshold (§13.4) |
| **PNG / tiles** | §8.8's band-streamed tile assembly at any DPI, rastered in the tile worker from the export's transient list (below); transparent background; per-layer transparent PNGs (the largest MFCG ask); print presets A4…A2 at 300 dpi | O12 (e): A2 at 300 dpi with no canvas larger than one tile band |
| **VTT** | Foundry-class scene JSON and **Universal VTT (`.dd2vtt`)** by the profile below, one scene set per model layer — the ground; the sky per island; the underground one scene per depth band (`depthBandCm`, II.7.3) at that band's depth — with its elevation, plus one scene for each storey of a building whose plan rung exists (the profile below; item 28); model widths only | grid alignment error 0 px per cell (O11 g); no manual steps on import |
| **3-D** | glTF 2.0 binary (D-8): **ground as one planar partition** — the plat's leaf faces at the finest committed level, each boundary read once from the arena (§3.9) and each face exported once (no coplanar overlap), clipped to the terrain cells and draped (vertex z by bilinear terrain sample), material by role; **rivers as sloped surfaces** — the water level at each vertex is that of the nearest course station, falling monotonically downstream along S1's carved course; lakes, ponds and sea as level planes (GEO-40); buildings extruded from `baseCm` (FTG-13) to eave height with roof meshes to ridge height, per wing, a building over a passage extruded over its span ring from `headroomCm` above its base to the eave, the passage left open beneath (§8.5 (2); `Passage`, §2.5; `BaseWing.spans`, §2.6), a basement (§2.6; item 29) extruded down from `baseCm` by its storeys inside its inset ring, an underground cell or vault (II.7.3) at its own depth — each wing's `ring` (§2.6), its roof by the wing's kind as in §8.6 — each wing's foundation skirt extruded down to the terrain (§2.6); walls, towers and gatehouses as prisms on their bases; bridge and pier decks at `deckCm`; trees as instanced crown meshes (`EXT_mesh_gpu_instancing`, positions from §8.10), one instancing node per (green entity, crown class) whose `extras` carry the entity's address and, per instance in instance order, `species`, `crownM` and `leafType` (XB32). OBJ as a flat secondary (one mesh per entity, unlike MFCG's merged OBJ) | shadows, glTF and CityJSON agree by construction (heights are model data, §2.6) |
| **CityJSON 2.0** | `transform { scale: [0.01, 0.01, 0.01], translate }` so every vertex is our integer centimetre (lossless); `Building` (LoD1.2 solid from base to eave; LoD2.2 roof surfaces; over a passage the solid takes the span ring's prism above `headroomCm`, the passage open beneath), `WaterBody`, `Road` (lines with class and width, sampled from the way's width profile, §2.2 rule 5), `PlantCover` (greenery faces), `SolitaryVegetationObject` (trees from §8.10, one per instance: a `GeometryInstance` of the crown class's template, with `species`, `crownDiameter` and `height`; XB32), `LandUse`, `OtherConstruction` (walls, towers, gatehouses), `Tunnel` (II.7's tunnels, swept from the invert profile and the bore), `Bridge`, `TINRelief` (terrain); a basement as a `BuildingPart` below `baseCm` and an underground cell as a `Building` whose base lies below the datum (items 12, 29); no `referenceSystem` (a local metric CRS); a geo anchor, when the export has one, is recorded in the root property `+platGeoAnchor { latDeg, lonDeg, bearingDeg }`, defined by PLAT's own CityJSON Extension and listed in the file's `extensions` member (below; DEF-5) | validated against the CityJSON 2.0 schema in CI — the anchor-less file as it is, the anchored file with PLAT's extension schema given to the validator from the repository |
| **CSV / statistics** | the statistics record per generation with provenance (O6 d); people, buildings, plots | the corpus-calibration input |
| **permalinks** | §6.4's format and refusal rule; `&doc=` references resolve through §11.5's `DocResolver` | a document format under *Knowledge* (below): offered only to a key of tier `secret` |

**Rotation.** Picture exports (SVG, PNG, VTT) use the view's rotation (§9.5); GeoJSON keeps model coordinates and records
the rotation.

**Knowledge (item 30; J-A30.83, J-A30.85).** Every picture and interchange export takes the requesting viewer's
knowledge key with the view state (§11.3), so a shared SVG, PNG, VTT scene or GeoJSON carries no name and no purpose of a
local or secret place the key does not admit — the place itself, its faces and its doors, stays in the file (§9.2). A
picture admits at the band it draws (an SVG its declared band, a raster the band of its export stop, a storey's scene
the building band); a file without a band — GeoJSON, CityJSON, glTF extras, CSV, a scene's journal entries — admits as at the city
band (§11.2), so a file never names what the town view withholds. The document formats — `.plat`, the compact twin, the
JSON schema and a permalink (its recipe and log, or the document a `&doc=` link names, rebuild every name, §6.4) — are
the model and carry every name, so they are admitted whole or not at all: `export` offers them
only to a key of tier `secret` (the `owner` and `editor` roles by default, §11.3; a script's by-value `exportDocument`
runs as the owner) and refuses any other key with the API error `E_KNOWLEDGE_TIER`, naming the tier the format needs.
The key governs what the module shows and writes; it does not hide what a client that loads the document holds, so a
host that keeps a place secret from a client sends that client pictures and interchange exports, never the document.

**The two GeoJSON variants (N-14).** RFC 7946 fixes WGS84 longitude and latitude and removed the `crs` member, so the
default export writes exactly that. A **geo anchor** `{ latDeg, lonDeg, bearingDeg }` places the settlement centre and
turns model north by the bearing; it is an export option, remembered per document in the view key `exportAnchor`
(§11.3), and defaults to (0°, 0°, 0°) — the conventional "no real location" point, so a default export is never mistaken
for a real place. Each model vertex (x, y) in metres, rotated by the bearing, is taken as a transverse Mercator easting
and northing — scale 1 on the central meridian through the anchor, false origin at the anchor — and inverted to WGS84
latitude and longitude with Krüger's published series to fourth order in the third flattening, evaluated with `dmath`
so the file is byte-identical on every host; coordinates are written with 7 decimals (≈ 1 cm), exterior rings
counter-clockwise and holes clockwise (RFC 7946 §3.1.6). Distances a GIS measures on the ellipsoid then match model
distances within a factor 1 + (d ÷ R)² ÷ 2 — at most 3.1 × 10⁻⁶, ≤ 5 cm, at the farthest corner of the largest frame
(≈ 15.7 km from the centre at aspect 2, §12.2). A foreign member `plat` records the anchor, whether it is the default,
the document id and the output version. The **metric** variant — offered "by prior arrangement" (RFC 7946 §4) for tools
that want the model's own metres — writes x east and y north in metres from the settlement centre with 2 decimals (the
centimetre lattice exactly), no `crs` member, in `<name>.metric.geojson`, beside a sidecar `<name>.metric.json` giving
the origin, the unit, the axes, the document id and the anchor if one is set (J-R31).

**Where exports run.** Every `export(h, fmt)` runs in the generation worker, which holds the document (§8.9). *Model
formats* — `.plat`, the JSON schema, the compact twin, GeoJSON, glTF / OBJ, CityJSON, CSV and permalinks — read the model
and §8.10's instance function (`Exporter.write(doc, null, opts)`) — except the JSON schema's `plan` blocks, which
carry every stored plan and the derived plans the exporting session's elaboration cache holds, each with its rung state
(§2.8), so which derived plans a JSON export carries depends on what was clicked, the cache being non-canonical (§2.9;
J-A28.86). *SVG* needs a display list and label placement at the
export's own stop (§8.7), while the generation worker keeps only a 24-B index of the tile worker's list (§8.1 item 6):
the SVG exporter builds a **transient list** for the export's band and frame with `DisplayListBuilder.build(model, band)`
(≈ 4 µs per building at the city band), runs S13b there at the export stop through `@plat/labels` with `@plat/render`'s
`ObstacleSource` and `RoleIndex` over that list — the code the tile worker runs, with the export frame as the visible
region of §9.2's scope, so the placement is the one the tile worker would compute at that stop and §13.3's placement
digests test the code both run — writes the file and releases the list (time: §12.7; the list is §12.8's export-time
peak). A district-band SVG's list is counted in the size estimate shown before writing (J-R41). *Raster formats* — PNG,
print and the `.dd2vtt` scene image — use a transient list too: the generation worker builds it the same way for the
export's band and frame (including the live layers the export's layer set names, as their providers stand at the
request) and transfers it with the raster-export request (§8.9), which also carries the look and view state as they
stood at the request — the sheet, §8.8's view-state switches, the shadow sun and the light step. In its queue's export
class (§8.9) the tile worker runs S13b at the export stop over the list, with the export frame as the visible region; in
`lit` with a `path` sun it bakes the request's crown set when it is not cached and holds it until the export completes;
it rasters every tile with the request's look and view state by §8.8's band-streamed assembly, streams the encoded bytes
and a progress message per band back, and releases the list; the generation worker wraps the VTT scene around the image.
The export therefore shows the model, its look and its view state as they stood when it was requested, whatever is
edited, restyled or animated while its bands are rastered; the export dialog shows the bands done out of the bands total
(J-R47).

**The CityJSON extension.** By the CityJSON 2.0 convention a root property outside the core schema is named with a
leading `+` and defined by an Extension listed in the file's `extensions` member; whether a validator rejects an
undeclared one was not executed (PLAUSIBLE), so PLAT declares its one. `@plat/export` ships
`schemas/cityjson/plat.ext.json`, a CityJSON Extension (`type: "CityJSONExtension"`, name `Plat`, its own version,
`versionCityJSON: "2.0"`) whose `extraRootProperties` define `+platGeoAnchor` as an object of exactly three numbers —
`latDeg` in [−90, 90], `lonDeg` in [−180, 180) and `bearingDeg` in [0, 360) — and whose `extraAttributes`,
`extraCityObjects` and `extraSemanticSurfaces` are empty. A file with an anchor lists
`"extensions": { "Plat": { "url": …, "version": … } }`, the url being the address at which each release publishes the
schema beside the package; a file without an anchor — the default — has neither the property nor the member and is
plain CityJSON. CI validates both kinds with the extension schema supplied from the repository, so no check fetches
anything. A change to the property bumps the extension's version with the exporter's output version (§6.4).
**Measurement** at the CityJSON exporter's milestone (M3b, D-8): the anchored file passes the CityJSON validator with the
extension. **Pre-decided fallback:** the anchor moves to a sidecar `<name>.geoanchor.json` beside `<name>.city.json` —
the three numbers, the document id and the output version, checked against its own JSON schema like the metric
GeoJSON's sidecar — the CityJSON file carries neither the property nor the member, and the report says so (J-R43).
CityJSON is built for its lossless integer-vertex encoding (J-R14).

**Identity in every export (LC-1, LC-28).** Every export carries entity addresses (§6.3) and the document's supersedes
table (tombstone → successor), so an outside tool that keyed data to an entity can follow it across re-derivations; ids
cross the API and bridge boundary as `<docId>/<id>`.

**The `.dd2vtt` profile (DEF-4).**
* **Scope:** a rectangle or a district chosen by the user — by default the current view snapped to whole grid squares.
  One scene image is ≤ 8 192 px on a side at the declared grid (default 1 square = 5 ft = 1.5 m at 100 px, so ≈ 123 m);
  a larger scope is split into a grid of scenes aligned to grid lines, or the user lowers the pixels per square (≥ 50) —
  the export dialog shows the choice before writing. Output is exact pixels per cell (grid alignment error 0 px per
  cell, O11 g).
* **Fields:** `format` 0.3; `resolution { map_origin: {x: 0, y: 0}, map_size: {x, y} in squares, pixels_per_grid }`;
  `line_of_sight` — polylines in grid units from building footprint edges (minus door openings), enceinte faces, yard
  walls and hedges from boundary treatments (fences and railings do not block sight), and cliffs; `objects_line_of_sight`
  empty; `portals` — doors at every entrance of a building's entrance set (§2.6; item 29: `main`, `side`, `rear`, `yard` and `service`, each 1.2 m wide) and gates (their opening), each
  `{ position, bounds: [two points], rotation, closed: true, freestanding: false }`; `lights` — the module's light sources
  in the scope, none otherwise, `{ position, range in squares, intensity: 1, color, shadows: true }`;
  `environment { baked_lighting: true, ambient_light }`; `image` — the scene PNG (base64) rendered by §8.8 at
  `pixels_per_grid` without the grid drawn in.
* **Per layer:** one file per model layer — the underground one per depth band (II.7.3) — its elevation in the file name
  and in a `plat` extension object; coordinates exact to the grid (O11 g).
* **Per storey (item 28):** a building whose plan rung exists exports one scene for each storey, at that storey's elevation:
  `line_of_sight` from its walls minus their openings, `portals` from every opening and every entrance, the stair core a
  named portal on both storeys' scenes; `lights` — one per lit room (`Room.lit`, §2.6) at its spine summit (§3.8's
  `spine` reader, its sampled medial axis on a downgrade; §8.5), `{ position, range, intensity: 1, color, shadows: true }`
  as the scene-level `lights` above, `range` being the room's diameter in squares and `color` the `lights` role's; the
  walls keep their centimetre positions and only the scene's grid snaps.
* **Foundry scene JSON:** the same geometry as walls (`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged),
  the same lights, a background image file, grid size and distance units, and journal entries from the gazetteer.

=== REPLACE ### 11.2 The embedding API and the worker boundary (SCL-6) ===
### 11.2 The embedding API and the worker boundary (SCL-6)

```ts
type DocHandle = { readonly id: string };            // the document lives in the generation worker
interface PlatApi {
  generate(bp: Blueprint, opts?: { onProgress?: (p: Progress) => void }): Promise<DocHandle>;
  open(bytes: ArrayBuffer, opts?: { readOnly?: boolean; session?: string /* a host-assigned session (§11.3); otherwise the document's stored session, minted on first edit (§7.4) */ }): Promise<DocHandle>;             // .plat or CBOR twin; bytes transferred in
  edit(h: DocHandle, e: EditEvent | EditEvent[]): Promise<ApplyResult>;                    // an event may arrive with its `fates` filled (below)
  regenerate(h: DocHandle, scope: Scope, mode: 'keep'|'newRandom', opts?: { discardEdits?: boolean }): Promise<ApplyResult>;   // §7.1's Regenerate (keep settings) and New random
  adjust(h: DocHandle, param: string, value: unknown): Promise<ApplyResult>;                          // §7.1's Adjust, or Re-derive from Sk for a parameter consumed early
  confirm(h: DocHandle, token: string, fates: EditFate[], renames?: Rename[]): Promise<ApplyResult>;                     // completes an action that returned `confirm` (below)
  cancel(h: DocHandle, token: string): void;                                                         // drops it; nothing was committed
  undo(h: DocHandle, of?: number): Promise<ApplyResult>;   // appends an `undo` event for the handle's session (§7.4); `of` only for the `owner` role; a conflict lists the dependent events
  redo(h: DocHandle): Promise<ApplyResult>;                  // appends a `redo` event for the handle's session (§7.4)
  query(h: DocHandle, q: Query): Promise<QueryResult>;                                     // gazetteer, hit-test, whereIs, fates; ≤ 64 KB per page, paginated (kinds below); local and secret places' names withheld by the knowledge key (below)
  view(h: DocHandle, target: HTMLCanvasElement | OffscreenCanvas, opts?: ViewOpts): Promise<ViewHandle>;   // tiles flow from the tile worker
  setView(v: ViewHandle, patch: Partial<ViewState>): void;
  export(h: DocHandle, fmt: Format, opts?: ExportOpts): Promise<ArrayBuffer>;              // transferred out
  report(h: DocHandle): Promise<GenerationReport>;
  subscribe(h: DocHandle, handler: (e: ApiEvent) => void): Unsubscribe;
  close(h: DocHandle): void;
}
type ApplyResult =
  | { status: 'ok'; logHead: string /* §11.3 */; changed: number /* addresses whose records changed */ }
  | { status: 'conflict'; actions: ConflictAction[] }                // §7.1's dry run: the nearest valid position, the blocking lock, a stale base …
  | { status: 'confirm'; token: string; fates: EditFate[] /* the first 1 000; the rest by query 'fates' */; renames: Rename[] /* the case-(4) renames the dry run listed (§6.3, §7.3 item 4); the rest by query 'fates' */;
      counts: Record<EditFate['fate'], number>; scope: EditScope /* resolved */ };   // §7.3 item 4: nothing is committed until confirmed
type ConflictAction = { kind: 'moveTo'|'unlock'|'unassign'|'reroute'|'stale'|'invalid'; target?: Id; at?: PointCm; message: string };
type Query =
  | { kind: 'gazetteer'; text?: string; kinds?: string[]; page?: number }
  | { kind: 'people'; type?: string; race?: string; gender?: string; profession?: string; workplace?: Id; ageRange?: [number, number]; household?: Id; district?: Id; page?: number }   // COV-FTG-C13
  | { kind: 'hit'; view: ViewHandle; x: number; y: number } | { kind: 'whereIs'; person: Id; day: string; hour: number }
  | { kind: 'relations'; person: Id; up: number; down: number }   // the family-tree view (COV-FTG-C11), from the relation store
  | { kind: 'inView'; view: ViewHandle }                          // the "features in view" list (COV-FTG-A24; the non-visual route, J-S19)
  | { kind: 'fates'; token: string; page: number };               // the full fate list of a pending confirmation, then its renames
// @plat/api/node — the same API over worker_threads, plus by-value helpers for scripts and tests
declare function generateDocument(bp: Blueprint): Document;
declare function exportDocument(doc: Document, fmt: Format, opts?: ExportOpts): Uint8Array;
```

**Knowledge (item 30; J-A30.83, J-A30.85).** `query` answers of every kind — `gazetteer`, `people`, `whereIs`,
`relations`, `hit`, `inView` — and hover content list every entity in scope with its kind, address and geometry, but
withhold the `name` and the purpose of a place (its `use`, or an institution's kind) whose `knownTo` (§2.5–§2.7) the
view's knowledge key does not admit under §9.2's table, marking the row `withheld: true`; a person's workplace or
household that is a withheld place is given by its address only, and the person's profession is withheld with it where
that profession is the place's use. A view-bound reader (`hit`, `inView`, hover) admits at its view's band — a secret
place at the building band (§9.2's table); a band-less one — the gazetteer, `people`, `whereIs`, `relations`, and
every export without a band (§11.1) — admits as at the city band, so a list or a file never names what the town view
withholds. `fates` pages and a `confirm` result go only to an editing role and are not filtered: `confirm` needs the
lists back unchanged (*Confirming fates*, below), and an editing client holds the document it loaded (`open`, above,
or §11.3's `doc.load`), for which the key is no secrecy boundary (§11.1). A content provider (§14) answering through
`query` gets the same filtered
rows. A host that holds the dossier knows every place already (§11.4); a viewer learns one only by
the host raising its key (§11.3), never by asking.

**Confirming fates.** An action whose dry run (§7.1) must be confirmed under §7.3 item 4 — protected entities in
its effective scope (Re-derive from Sk, Adjust of an early parameter, a regeneration over locked, pinned, edited or
assigned entities, "discard edits in scope"), or case-(4) renames (§6.3), including an `unlock`, `unassign`, `undo`,
`redo` or `revert` that frees a name — returns `confirm` with the fate of every protected entity, every listed rename
and a **token** = H128(the document's `logHead` ‖ the canonical bytes of the event without its fates and renames).
Nothing is committed. `confirm(h, token, fates, renames)` commits the event with those fates and renames when the token
is still current (the `logHead` has not moved) and the fates and the renames equal the dry run's lists; if the state
moved it re-runs the dry run and returns a fresh `confirm`, and a changed list is never committed silently. Resubmitting
the event through `edit` with its `fates` and `renames` filled is the same operation — the engine commits when a fresh dry
run computes the same fates and renames and otherwise returns `confirm` — which is how a host bridge carries a confirmed
action (§11.3). "Discard edits in scope" is a new request (`regenerate` with `discardEdits: true`) with its own
confirmation. `cancel` drops the token (J-R33).

| call | crosses | copy or transfer | bound |
|---|---|---|---|
| `generate` | in: the blueprint; out: the handle, progress events | copy | < 64 KB; < 1 KB per event |
| `open` | in: the document bytes | transfer | the document's size |
| `edit`, `regenerate`, `adjust`, `confirm`, `undo`, `redo` | in: events or a token with fates and renames; out: `ApplyResult` — `ok` (the new `logHead`, count of changed addresses), `conflict` (actions) or `confirm` (token, the first 1 000 fates, the renames, counts per fate, the resolved scope) | copy | < 64 KB per batch; longer fate lists by `query({ kind: 'fates' })` pages |
| `query` | out: one result page | copy | ≤ 64 KB |
| `view` | out: composed tile bitmaps and hit-test slices (§8.9) | transfer | ≤ 1 MB + 64 KB per tile |
| `export` | out: the file bytes | transfer | the format's size |
| `subscribe` | out: `ApiEvent`s (`doc.changed`, `view.changed`, `report.changed` — the `changes` entries of §5.4's `GenerationReport` appended since the last delivery; items 17–22) | copy | < 64 KB |

The headless path runs the same worker code, and its model hash equals the browser's (text is not in the model, §9.1);
ids cross this boundary as `<docId>/<id>` (§6.3). The derivation pool uses transferred copies, never `SharedArrayBuffer`
(§3.3), so no embedding host needs cross-origin isolation for generation; the tile worker's optional shared columns
(§8.9) remain the only use of shared memory. **Engine (§3.7, SCL-22):** the product bundle has no WebAssembly dependency;
if M0 triggers the kernel's pre-decided fallback (Clipper2-WASM as the single engine), WebAssembly becomes an embed
requirement and a host without it receives the API error `E_ENGINE_UNAVAILABLE` from `generate` and `open` (not a kernel
result, §3.1).

=== REPLACE ### 11.3 The host bridge — the host is the store (FTG-12) ===
### 11.3 The host bridge — the host is the store (FTG-12)

* **Transport.** `interface BridgeTransport { send(msg: BridgeMessage): void; onMessage(h: (msg: BridgeMessage) => void): void }`.
  Shipped: `WindowPostMessageTransport` (iframe hosts; a fixed target origin; incoming origins checked against the
  embed's allowlist) and `MessagePortTransport` (any relay — a browser-extension content script, a SharedWorker, a
  chat-bus relay; COV-FTG-N06). Envelope: `{ plat: 1, type, session, seq, logHead?, body }`. The bridge is the module's
  boundary with a host program, SettlementForge in its owner-staged phase included: its messages carry data only — a
  dossier's events in, the map document and its report out — and the module stays a separate program in its own bundle,
  loaded in a worker, an iframe or a service (item 21 (d): a design choice that keeps the seams clean and every later
  licensing choice open, §17.3; J-A21.81).
* **Vocabulary (our own terms, FTG-22).** Host → PLAT: `doc.load { bytes | ref, role, session }`,
  `doc.apply { baseLogHead, events }`, `view.set { patch }`, `export.request { fmt, opts }`, `query { q }`. PLAT → host:
  `ready { outputVersions, schemaVersion }`, `doc.changed { baseLogHead, events }` (a local user's proposed events),
  `doc.applied { logHead }`, `doc.rejected { reason: 'stale'|'invalid'|'role'|'version', currentLogHead, conflicts? }`,
  `view.changed { patch }`, `entity.selected { id, kind }`, `export.ready { bytes }` or `export.refused { error, message }`
  (an API error of `export`, §11.1's `E_KNOWLEDGE_TIER` among them), `query.result`,
  `report.changed { entries }` (§11.2's report event). **One way (items 20, 22; J-A20.81).** No PLAT → host message writes,
  patches or proposes a change to the host's dossier: `doc.changed` carries map-document events only, `report.changed` the
  map's report, and the vocabulary has no message that addresses the dossier; a dossier change reaches the map as
  `doc.apply` events with `author: 'host'` and `EditBase.dossier` set (§7.1, §7.7, §11.4), in the host's order — the ordered
  dossier history of item 22 (c) — and the host stores the returned document as an opaque artifact of the map (item 20 (d)).
* **logHead** = a 128-bit hash of (document id, edit-log length, hash of the last event), in hex (our own term, FTG-22).
* **Convergence.** The host holds the canonical document and log. A client sends its user's edit as `doc.changed` against
  its `baseLogHead`; the host accepts only when that base is the current `logHead` — it appends the events, advances the
  `logHead` and fans `doc.apply` out to every client, the sender included — and otherwise answers
  `doc.rejected { stale }`; the client then applies the host's pending `doc.apply` messages, re-runs its own events
  through the dry run (§7.1) on the new state and sends them again, or shows its user the conflicts. An action that needs
  its fates confirmed (§7.3 item 4, §11.2) is sent only after the local user confirmed them, as an event carrying its
  `fates` and `renames`; if the state moved underneath it, the client's re-run returns a fresh confirmation for its user
  instead of resending, and every other client replays the event with those fates, reporting a mismatch if it computes
  different ones. Every client applies the same events in the host's order on the same output version, so every client's
  model hash is the same (§6.2) — after a load mismatch, once the owner has chosen (§2.9 step 4). **Test (M3a):** a host
  and three headless clients applying 1 000 interleaved random events — undo and redo from every client and one owner
  undo through a chain among them — converge to one model hash with 0 lost accepted events; and one forced load mismatch
  settled by an owner's keep while two editors edit on the replayed town: all four converge to one model hash, the
  editors' events re-applied on the saved town.
* **Version handshake.** On `doc.load` the client compares the document's **`outputVersion`** (§6.4) — not the generator
  version — with the output versions it can replay (announced in `ready`); when it cannot, it opens the snapshot
  read-only (its role drops to viewer, and it says so) as §2.9 step 2's frozen view does — checked by its chunks' content
  hashes only and labelled "made with o<k>; not verified by this version", never reported as a mismatch — and it never
  replays under another version silently.
* **View state.** The document's view keys (§2.9's view section, outside the model hash; each last-writer-wins by
  (Lamport counter, session id)) travel as `view.set` / `view.changed`. The view key `time` is set by `view.set { time }`
  and advanced by the module-tier message `sim.advance { hours }` (§10.3). The per-viewer keys `knowledge` (§2.9; admitted by
  §9.2's table), `elaborate` (§4.1), `storey`, `depthBand` and
  `plotsOnly` (§8.4, §8.5) travel the same way. A viewer's `knowledge` defaults from its role — `owner` and `editor`
  `secret`, `viewer` `public` — the host may set any viewer's key by `view.set`, and a client never raises its own tier
  above the one its role or the host gave it, so a player learns a secret place when the game master says so (J-A30.82).
* **Style is canonical; the preset a viewer looks through is not (N-15).** The document's style (§2.9 `style`: the sheet
  and version, its row operations, the ground-cover regions) changes only through logged `setStyle` events, which the
  bridge carries in `doc.changed` / `doc.apply` like any edit and which only the `owner` and `editor` roles may send. The
  view key `stylePreset` is a per-viewer choice of preset (for example a player looking at the `lit` family while the
  document is drawn in `ink`): it never writes `setStyle`; the chosen preset replaces the document's sheet for that viewer
  only, and the document's own rows (thematic overrides, ground-cover regions) apply on top where the preset has the roles
  they name, the rest listed in that viewer's style dialog (J-R34).
* **Roles.** `owner` | `editor` | `viewer`, given by `doc.load`. A viewer's client never emits `doc.changed` (model edits
  are disabled in the UI and dropped by the bridge) and emits only the view changes the host allows; the host enforces
  the roles as well. The host assigns one session per user and document and passes it on every load; a bridged client
  never mints a session or writes the `session` view key (§7.4). **Bridged load verification.** Load verification
  (§2.9 step 3) runs while the client's user edits; on a mismatch only an `owner` client may keep the saved town (a
  `rebase` sent like any event; J-DET-42); every other client takes the replayed town for its own working state,
  reports the mismatch, records its root at `h₀` and keeps the `doc.load` bytes (≤ 3 MB at CITY, §2.9's size budget;
  counted in §12.8) until the mismatch is settled or its session ends; when the owner's `keptSnapshot` rebase arrives it
  installs the saved town from them and re-applies the events after `h₀` (the install mechanics: §2.9 step 4); under
  §6.2 (iii) its comparison of its own root with the owner's `stateDigest` waits for its load's recomputation, a client
  still verifying stops, and a client that loads after the owner's choice takes the saved town as its base without
  asking — so every client converges on the owner's choice.
* **Logging (LC-31).** Every model change over the bridge is a `doc.apply` of `EditEvent`s, logged one to one — a host's
  own commands with `author: 'host'` (§7.1's `EditBase`); no bridge command changes the model any other way. Undo and
  redo are `EditEvent`s (§7.4): they travel as `doc.changed` and `doc.apply` like any other event, the envelope's
  `session` is their `EditBase.session`, and a client never truncates a bridged log. A provider output refused at §2.9's
  cap returns the requesting edit as `doc.rejected { reason: 'invalid', conflicts }`.

=== REPLACE ### 12.2 Size ladder and matched reference sizes (MFP-5, MN-1, MN-2) ===
### 12.2 Size ladder and matched reference sizes (MFP-5, MN-1, MN-2)

The rungs' population bands and targets, buildings at the target and frame areas are §1.1's rung table (frames: §3.2
(9)); this table adds the matched MFCG reference at each rung and the cap above METROPOLIS's target.

| rung (§1.1) | matched MFCG size (plain options, seed 555001) | MFCG buildings / walled ha | MFCG generation (the app's own stage timings) |
|---|---|---|---|
| TOWN | 40 | 1 475 / 58 | 57 ms |
| CITY | 80 | 5 242 / 220 | 131 ms |
| METROPOLIS | 130 | 13 091 / 548 | 156 ms |
| METROPOLIS above its target — up to the population cap of 120 000: ≤ 35 000 buildings, a frame ≤ 153.6 km² (≤ 12.4 × 12.4 km) | 200 (a stress comparison) | 31 951 / 1 274 | 236 ms |

* Buildings at the target are derived at ≈ 3.4 persons per building for the core plus the hinterland (PLAUSIBLE). **The
  default request** of a rung is its target population, whose building count §1.1's rung table gives as a range; a band's
  bottom and top are its population ends at 3.4 persons per building (in buildings: §12.5's table).
* Within a rung the frame scales with the requested population (§3.2 (9)). At the cap the square
  frame is 12.4 km (19.8 km with the margins); at the extreme aspect 2 it is 17.5 × 8.8 km and |x| ≤ 1.40 × 10⁶ cm with
  the margins — ≈ 6× headroom under §3.2's 2²³-cm range (§3.2 (1)). Requests outside the ladder are routed or clamped by
  §1.1's `LadderRouter`.
* The matched counts come from the MFCG size sweep (`captures/mfcg/exports-sweep-2026-09-25/README.md`). MFCG's GeoJSON
  export is in metres and only its SVG uses its 4 m internal unit (road width 8 in the JSON, 2 in the SVG). The
  15 392-building size-80 city of the earlier exports had shanty town, river and coast switched on; it and the
  13 349–36 480 size-80 counts of the MFCG profile belong to such option sets and are stress comparisons, not the CITY
  bar.

=== J-ROWS ===
| J-A30.85 | the knowledge filter's reach: every `query` kind; readers and files without a band admit as at the city band; a `use`- or `owner`-keyed theme skips withheld places; the document formats and permalinks go only to a key of tier `secret`, a refused bridged export answered by `export.refused`; the key is no secrecy boundary for a client that holds the document (amends J-A30.83) | §11.2 and §11.1, with §8.2, §9.2 and §11.3 |
| J-A30.87 | a building over a passage carries a span mark — the passage's span ring under the base wing that spans it — filled into its block's mass at the city band, a shadow caster from the passage's headroom, and extruded over the passage in glTF and CityJSON (amends J-A30.84's mechanism) | §8.5, §8.4, §11.1 |
| J-A28.87 | room labels take a cap-height range of their own among §9.4's floors, 5–9 px, the plan draw setting each at the largest in the range that fits its room and none below it, over a room size carried by the style sheet | §9.4, §8.5 (with §8.3) |

=== RATIONALE-A ===
| J-A30.85 | Chose to carry the knowledge filter to every reader and file — every `query` kind, `people`, `whereIs` and `relations` giving a withheld workplace or household by its address and withholding a profession that is the place's use; every reader or file without a band admitting as at the city band; a `use`- or `owner`-keyed theme skipping a withheld place and naming no withheld value in its legend — and to offer the document formats (`.plat`, the compact twin, the JSON schema, a permalink) only to a key of tier `secret`, refusing any other with `E_KNOWLEDGE_TIER`, which the host bridge answers with a message of its own, `export.refused`, beside `export.ready`, over filtering only the view-bound readers and every export alike, because the owner's rule is that the future clerk answers about secret places only to a viewer who knows them, and a list, a theme colour or a file that named what the town view withholds would break it; because a reader without a band must take one column, and the city band's is the one the town view shows; and because the document formats are the model — withholding a name there would break their byte-identical round trip, and a permalink's recipe and log, or the document its `&doc=` names, rebuild every name — so the honest rule is that the key governs what the module shows and writes, not what a client that holds the document holds: a host that keeps a place secret from a client sends it pictures and interchange exports, never the document; because a bridged host's `export.request` must be answered either way, and `doc.rejected` answers document events only; and `fates` pages and a `confirm` result, which only an editing role receives, stay unfiltered because `confirm` needs its lists back unchanged and that client holds the document it loaded, not because of any tier (§11.1, §11.2, §11.3, §8.2, §9.2; item 30 (d); repair round 1: VR-09, VR-10, VR-11; repair round 2: VR1-03, VR1-04, VR1-05). Amends J-A30.83. |
| J-A30.87 | Chose to cover a spanned passage by a span mark — the passage's span ring (§2.6's cut of the `Passage` face under the base wing that spans it, `BaseWing.spans`, which a composition inherits), emitted by S14 at every band with the building's block and a base raised by the passage's `headroomCm` — which the city band's mass closing reads like a footprint, the finer bands read only as a shadow caster, and the glTF and CityJSON exports extrude over the passage from the headroom to the eave, over widening the footprint across the passage or leaving the covering to the composed wing alone, because the footprint must end at the passage's edge (the stage-3 contract reads that ring), because the city band is drawn before any building is composed (item 28's click), the base wing carrying the span from S11 on (J-A30.23), and a passage wider than the 1.5-px closing would otherwise show as a ground-tone gap in the streetwall, and because the mass, the shadows and the 3-D export must read one covering to agree (§8.5, §8.4, §11.1; item 30 (c); repair round 1: VR-06; repair round 2: VR1-02, with the model's V-MAB1-01). Amends J-A30.84's mechanism, not its choice. |
| J-A28.87 | Chose to give room labels a cap-height range of their own among §9.4's legibility floors — 5–9 px, from the address floor up to one and a half times the point-label floor — with the plan draw setting each room's label at the largest cap height in that range whose glyph boxes fit within the room's ring and drawing none below it (hover still naming the room), over taking the upper bound from the style sheet's label style or leaving it unbounded, because `StyleSheet.labels` declares no size for rooms, so the bound §8.5 named resolved to nothing and §8.3's plan-draw census had no size to check; because a room is the smallest space the map names, so its label starts at the smallest floor any label has, the addresses'; because an upper bound keeps a great hall's name an annotation inside the drawing rather than a heading over it; and because every label size then stands in one place, §9.4, beside the other floors. The range is a calibration, PLAUSIBLE and vetoable; §8.3's plan-draw census checks every drawn room label against it (§9.4, §8.5, §8.3; item 28; repair round 2: VR1-06). |

=== END ===
