# Red team — PERFORMANCE AND SCALE lens against `docs/ARCHITECTURE.md`
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat redteam:scale (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `validation/redteam-scale` · 2026-09-25 · seat: red-team validator (Fable role; opus stand-in), clean-room (no
captured JavaScript bundle opened; no reference code copied; every benchmark below is our own implementation of a
textbook algorithm).

**Status: COMPLETE — 22 findings (2 blocker, 12 major, 8 minor).** §2 is the parseable table (one row per finding,
the `RT_SCHEMA` fields); §3 gives each failure scenario, its evidence and the required change; §4 lists what to keep; §5
groups the findings for the reviser and maps overlaps with other lenses; §6 separates CONFIRMED from PLAUSIBLE; §7 holds
the executions behind every measured number.

## §0 Reading record

| file | size | read |
|---|---|---|
| `workflows/lane-prompts/03/redteam_scale.prompt.txt` | 24 KB | in full (the brief) |
| `research/findings/_critic.md` | 42 KB, 478 lines | in full, first (standing ruling) |
| `docs/ARCHITECTURE.md` | 245 KB, 2 200 lines | in full, every line (§0–§17, PART II, PART III, D-1–D-25, J-1–J-18, deferrals, Appendix A) |
| `docs/ARCHITECTURE-VALIDATION.md` | 5 KB | §0 in full (history of the file under review; what the red team should weigh) |
| `docs/validation/redteam-geometry.md` | 134 KB | header, §0–§2 (the full GEO-1–GEO-42 table) and the detail of GEO-2, GEO-28, GEO-29, GEO-30 in full — to match the layout and to cite rather than duplicate |
| `workflows/03-assess-design-validate.js` | — | `RT_SCHEMA` only (to make §2 parseable) |
| `docs/design/judge-engineering.md` | 361 lines | §0.2 (executed checks #1–#6, incl. the flatbush-per-commit hazard), K-2–K-6, the performance rows of the three scorecards — located by grep, read in those ranges |
| `docs/IMPROVEMENTS.md` | — | O12 acceptance (lines 655–668), O16 (e) (724–728), O3 (878–886) — located by grep |
| `research/findings/profile-mfcg.md` | 204 KB | §0, §1, §4.9, §6.1–§6.5, §7 (cost model, wall-clock split, draw-call scaling, identities), §8, EG-3 (stage timings, the 19.5 ms + 7.5 µs per building fit), EG-8 item 6, the Styles addendum ST-0–ST-5 — in full; other sections by outline |
| `research/findings/visual-spec.md` | 51 KB | §1.1 and §1.3 (MFCG canvas strategy: per-ward canvases, 46 000 fills vs 590 uploads, layer order), §3.1, §4.1, §6 items 19–20 — in full |
| `research/findings/profile-neighbourhood.md` | 204 KB | §3.7 (shadows), §3.8 (Poisson field), §3.9 (trees), §5 (cost model: per-generation breakdown, hot functions, `Point.new` 385–561 k, scaling per wing) — in full; the rest by outline |
| `research/findings/profile-village.md` | — | §5 cost lines and the `createDeflection` rows (a 128² grid pass costs 17–87 ms) — located by grep |
| `research/findings/_critic-ftg.md` | 49 KB | §1 table rows F1, F2, F20, F27 (scale, generation time, performance ladder) — located by grep |
| `research/findings/ftg-payload-visual.md` | — | §1 (server-side generation; client busy 4.6 s; load busy 2.0 s) and the 593 KB payload line — located by grep |
| `research/ftg-capture/roadlength100/README.md` | — | "Side findings" and "CONFIRMED vs PLAUSIBLE" (server generation ≈ 3–7 s) |
| `captures/manor/README.md` | 235 lines | the cost table (model < 2 ms; drop shadow 35–63 ms of a 39–70 ms regeneration) — located by grep |
| `captures/mfcg/exports-2026-09-25/README.md` | 154 lines | per-file counts and SVG structure (SVG 6.3 MB for 15 392 buildings) |
| `research/findings/mfcg-posts-a.md`, `mfcg-devlogs-b.md` | — | §T4 warp mode (staged preview with Apply / Discard) and the 0.11.0 roof-speed note — located by grep |
| `captures/mfcg/2026-09-21T11-25-32/meta.json` | — | host fields only: `darwin`, 8 CPUs, `Apple M1` — the machine the reference bars were recorded on, which is also the machine these benchmarks ran on |
| `docs/validation/redteam-mfcg.md`, `redteam-lifecycle.md`, `redteam-ftg.md` | — | their §2 findings tables (claims), read after they landed at 16:56–17:02, to cite overlaps by id and withdraw one duplicate |
| scratchpad executions (this seat) | — | `bench_terrain`, `bench_poisson_astar`, `bench_index`, `bench_state`, `bench_siting_doc` (Node 24.12, Apple M1): our own code, outputs quoted in §7 and in the findings |

**Not read** (outside this lens or superseded by the critics read above): `_critic-os.md`, `_critic-vg-ng.md` and the
remaining findings files cover to cover, `docs/CONFIDENCE.md`, the design proposals and the other judges, and every
capture file other than those listed. Every reference fact below comes from a passage listed in this table. No
captured JavaScript bundle and no reference source code was opened. Reading total ≈ 200 k tokens, under the 350 k
switch point.

## §1 Lens, method, severity rule

**Lens (from the brief).** PERFORMANCE AND SCALE: hold the design to the recorded bars — MFCG size-80 ≈ 200 ms
generation, FTG city ≈ 3 s server-side (4.3 k nodes, 5.3 k edges, 2.8 k buildings, 50 k-population ceiling), rendering
dominating in OpenFL — and find super-linear stages, memory blow-ups, main-thread stalls, display-list sizes that break
SVG, label placement cost, and worker / serialisation overhead.

**Method.** Every finding is a concrete input or state → a missed budget, a stall, a crash, a blank output or an
unmeasurable claim, with the architecture text that specifies the failing mechanism, the evidence, and the specific
change required. Where the architecture names a mechanism, this seat implemented that mechanism in plain JavaScript and
timed it on the machine the reference bars were recorded on (Apple M1, `captures/*/meta.json`), so the design's own
budgets and the references' measured bars are compared on one machine. The implementations are straightforward, not
tuned; where a tuned variant would plausibly be several times faster, the finding says so and does not rest on the
untuned number alone.

**Severity.** *blocker* — the text as written prescribes a mechanism whose measured or computed cost misses a stated
goal by an order of magnitude or more, **and** the repair changes a cross-cutting protocol (the kernel's commit rule,
the model-hash definition), so the defect would silently sink every later measurement; *major* — a stated budget or
capability will be missed by roughly 2–10×, or a mechanism or interface the scale goal needs is missing, repairable by
a design change to one stage, interface or format; *minor* — a local defect or an unmeasurable statement with a cheap,
contained fix.

**Evidence classes.** Architecture text (quoted by section) is CONFIRMED as what the design says. Reference behaviour is
CONFIRMED where a findings file or capture README records it and this seat read the passage. Benchmark numbers are
CONFIRMED as executed measurements of our own implementation on this machine; their transfer to the eventual tuned
TypeScript implementation is PLAUSIBLE. Counts of entities at CITY and METROPOLIS come from ARCH §12 unless stated.

## §2 Findings table (machine-parseable; one row per finding)

Columns match the workflow's `RT_SCHEMA` (`id`, `severity`, `claim`, `evidence`, `required_change`). Each row stands
alone; §3 carries the full failure scenario per id. 22 findings: 2 blocker, 12 major, 8 minor. (A speed-parity row
drafted here duplicated MFP-5 of `redteam-mfcg.md`, which landed while this seat was writing; it was withdrawn before
numbering was final and is cited in §5.)

| id | severity | claim | evidence | required change |
|---|---|---|---|---|
| SCL-1 | blocker | §5.3 runs the whole invariant suite "after every batch and every edit" (and §7.1 runs it again as the dry run before each commit); several members are whole-model — "the model hash recomputed equals the recorded one" over the canonical serialisation, id uniqueness and reference integrity, containment 100 %, every gate joined to the plaza, every requested feature present — so generation costs O(batches × model) and every edit O(model); CITY ≤ 300 ms, per-district regeneration ≤ 30 ms, a plot edit ≤ 5 ms and edit-to-redraw < 100 ms are unattainable as written. | ARCH §5.3 (title; hash member), §7.1 (dry run), §13.2 ("runs after every batch on B-CITY"), §6.2 (hash over the canonical serialisation: sorted keys, integer coordinates, floats as shortest round-trip strings), §4.1 batch scopes (S8 per district, S10 per block, S11 per plot, edits per event), §12. Executed (bench_state; a schema-shaped model at §12's CITY counts: 22 250 entities, 5 levels × 60 k vertices): one canonical serialisation + hash = 1 163 ms (65 MB of canonical text); METROPOLIS 2 712 ms. CITY has ≈ 7 300 batches (25 districts + ≈ 1 750 blocks + 5 500 plots): even a 10× faster hash costs ≈ 14 min per generation. | Give every invariant a declared scope (batch-local = the touched faces plus their 1-ring; stage-end; save; CI-only) and check batch-local ones incrementally. Redefine the model hash as a Merkle digest over the plat tree (per-face and per-entity digests → block → district → level → model), updated along dirty paths; keep the canonical serialisation only for golden files and export. Verify per batch only the touched subtree's digest. Add a cost test: per-edit validation time flat from TOWN to METROPOLIS (± 20 %). Decide it before M0's determinism spike, because goldens, K-3 snapshot verification and the locality oracle all compare this hash. |
| SCL-2 | blocker | §3.3 rebuilds the static packed spatial index "once per batch commit" while §4.1 declares one batch per block (S10), one per plot or per block (S11) and one per edit; a rebuild is O(level size), so S10/S11 cost O(batches × level) — the engineering judge's ≈ 48 s K-2 hazard returns at a finer grain, and J-7's statement that batching removed it is false for these scopes. | ARCH §2.2 (`index.static: FlatbushIndex /* rebuilt at batch commit */`), §3.3, §4.1 "Transactions", J-7; judge-engineering §0.2 #4 and K-2 (its fix: "flatbush is rebuilt once per stage commit"). Executed (bench_index; our packed Hilbert R-tree, the flatbush construction): 4.9 ms at 17 k items, 12.5 ms at 42 k. Summed as each level grows to its final size: CITY S10 1.9 s (budget 55 ms), S11 13.4 s (budget 25 ms); METROPOLIS S10 12.7 s, S11 85 s. One plot edit (one L3 + one L4 rebuild): 7.3 ms at CITY, 18.8 ms at METROPOLIS (budget 5 ms). S11 per block instead of per plot is still ≈ 4 s. | Rebuild each level's static index once per stage (and after an edit burst goes idle); serve every query inside a stage and every edit from the dynamic per-level index (uniform grid, O(1) insert and delete), merged into the static index at stage end — or partition static indexes per district so a block or plot commit rebuilds only its district's partition (≤ 1 k items ≈ 0.25 ms). State the rule in §3.3, correct J-7, and add a cost-model test on commit count × level size. |
| SCL-3 | major | §12's CITY per-stage split omits the dominant term of several stages: S1 prices 2 M fBm evaluations at 30 ms but also floods, routes and contours a raster the plat's margin makes 2.6× larger; S4 omits the lattice construction; S5 omits the stage boundary's cost-distance field; S6 omits the σ ≈ 60 m smoothing of three fields; S10b and S12 omit their sort and face counts. Measured as specified, these stages cost ≈ 0.8 s at CITY against ≈ 0.1 s budgeted (≈ 1.3 s with the margin raster and a Poisson lattice), so the 300 ms p95 fails before any lane is cut. | ARCH §12 split; §2.3 (rasters 5 / 8 / 10 m; refined to 2.5 m in the built extent); §3.2 and §4.9 (the plat spans frame + 30 % per side); §4.3 (lattice "Poisson-disc, relaxed once"); §3.1 / D-11 (k = 50, all evaluated); §4.4 (stage boundary = level set of a cost-distance field); §4.5 (three fields, Gaussian σ ≈ 60 m). Executed on the capture machine: fBm 27.4 ns per 2-D simplex evaluation; S1 (fBm + priority-flood + D8 + accumulation + 11 contour levels) 126 ms at 625², 333 ms at 1 000² (frame + margin); raster cost-distance field 70 ms at 625²; separable Gaussian σ = 60 m 67 ms per field (3-box blur 6.4 ms); Poisson lattice 310 ms for 25.7 k points; 12 A* queries 16.6 ms on a 46 k-node lattice; naive siting 98 ms per round × 3 rounds; stream keys 73 ms (SCL-12). | Re-budget each stage with its mechanism named: fBm on a coarse grid plus bilinear refinement; priority-flood with a bucket queue on the integer heights; contours extracted lazily per render tile; the 2.5 m refinement as on-demand interpolation; the margin at ≥ 32 m cells; a jittered hexagonal lattice with adjacency by construction (no Poisson, no Lloyd, no Delaunay); one cost-distance field per growth run on the lattice or a ≥ 20 m raster; fields at 16–32 m with an O(N) blur and kernels splatted within their radius; top-k siting over affinity-filtered candidates; open-field strips as render-time segmentation inside FTG-sized field faces; the context vector counted in S10's per-plot rate. Add a site-and-fields spike to M0 next to the fusion gate, starting from §7's numbers. |
| SCL-4 | major | The first-paint plan relies on laziness that the default view defeats: §4.1 makes S10–S14 lazy per district "after the first paint" (city LOD emitted when S9 commits) and §12 says METROPOLIS "relies on lazy per-district derivation of S10–S13 (only visible districts first)"; but the one-click view shows every district, the owner's PLOT MODEL and stage-3 rulings require footprints at city zoom, and §8.5's city band needs district labels (S13) and the hinterland (S12) — so the complete city frame needs S10–S13 for all districts, and the preview at S9 can only show block masses, the "illusion of buildings" the owner ruled out. | ARCH §4.1 ("S10–S14 are lazy per district after the first paint"), §8.5 (city band: "blocks as footprint masses … district labels"), §12 (METROPOLIS clause; the per-district worker arenas "if profiling demands it"), J-12; owner PLOT MODEL ("at city zoom the footprints are what shows") and STAGE 3 ("shows at every zoom, including the city view"). §12's CITY split puts S10 + S10b + S11 + S12 + S13 at 110 ms, ≈ 275 ms at METROPOLIS, all of it on the one-click path. Related: LC-2 and FTG-1 (laziness breaks global siting), MFP-1 (city-zoom look). | Define the one-click first paint as the complete city LOD (S0–S13 for every district at city-band detail) and budget METROPOLIS for it. Restrict laziness to what the city band does not draw: yard sub-parts, entrances, roof ridges, street names, addresses, crowns. If an S9 preview is kept, specify its drawing (blocks in a distinct preview style) and that the city frame replaces it exactly once, reported. Write the per-district worker merge protocol (J-12) before M2 if METROPOLIS needs it, not "if profiling demands it". |
| SCL-5 | major | Memory: regenerate-undo keeps "the last k = 8 snapshots" of the materialised document (plats + entities + field rasters); one CITY snapshot is ≈ 80 MB, so the ring alone is ≈ 640 MB against a ≤ 100 MB CITY heap (≈ 1.6 GB against 300 MB at METROPOLIS, enough for an iOS tab kill); if "bounded by size" keeps k ≈ 1, every older undo is "rebuilt by replay" — a full regeneration plus the log. Even without the ring the CITY working set is ≈ 130–150 MB. | ARCH §7.4 (regenerate row: "the engine keeps the last k = 8 snapshots, bounded by size: older ones are rebuilt by replay"), §2.9 (`snapshot: { plats, entities, fields, modelHash }`), §12 (memory column; "CITY plat ≈ 60 k vertices × 5 levels ≈ 20 MB"). Executed (bench_state): typed arrays for 5 levels × 60 k vertices = 29 MB; the schema-shaped entity table ≈ 2.1 KB per entity (117 MB for 55 625 entities at METROPOLIS; ≈ 47 MB at CITY's 22 250); plus rasters, indices and the display list (≈ 20 MB by §12). | Replace whole-document snapshots with scoped undo records: the inverse event plus the replaced faces and entities of the regenerated scope, O(scope). Keep periodic checkpoints (every K edits, K chosen so replay stays ≤ 100 ms) instead of an 8-deep ring; if snapshots stay, chunk the arenas per district copy-on-write. Compact the entity store: context vectors and provenance as struct-of-arrays columns, `tableVersions` interned per stage run, `venueMix` referenced from the district rather than copied per plot, `deps` as u32 handles. Define what the memory column counts (JS heap + typed arrays + canvas backing stores + WASM memory, both threads) and test it per rung. |
| SCL-6 | major | The worker boundary is unspecified and, as typed, expensive: `PlatApi` passes `Document` by value (`generate → Promise<Document>`, `edit(doc, e)`, `render(doc, …)`, `export(doc, …)`) and `DisplayListBuilder.build` returns `Mark[]` objects with `Record` attributes; with generation in a worker, each call structured-clones — the main thread receives a CITY entity table in 162 ms and a 60 k-mark display list in 140 ms — and "transferable buffers" detach the worker's own arrays, which incremental delivery (S1–S9 preview while S10–S13 continue on the same levels) cannot allow. | ARCH §4.1 ("a Web Worker with transferable buffers and incremental delivery" — the only statement on the boundary), §11 embedding API, §14 `PlatApi`, `DisplayListBuilder`, `Mark` (§8.1). Executed (bench_state; v8 serialise / deserialise = the structured-clone algorithm): CITY entity table 19.4 MB, sender 60 ms + receiver 162 ms; display list 60 k marks (17.7 MB, close to §12's ≈ 20 MB): sender 46 ms + main-thread receive 140 ms; 125 k marks: 208 ms; METROPOLIS 150 k marks 302 ms, 312 k marks 895 ms. | Make the API handle-based (`generate → DocHandle`; the document lives in the worker; `edit(handle, e)`; `export(handle, fmt)` returns bytes) and document, per call, what crosses the boundary and whether it is transferred or copied. Make the display list columnar (typed arrays: mark kind, semantic id, entity handle, z, LOD mask, geometry offsets into one Int32 coordinate buffer, attribute columns), delivered as per-group deltas and transferred, never cloned; keep the worker's working buffers (transfer slices). State that SharedArrayBuffer is optional and needs cross-origin isolation from the embedding host. Budget the main thread's receive work per delivery (≤ 4 ms) and test it. |
| SCL-7 | major | Canvas2D "retained tiles per district" do not survive continuous zoom: a tile's pixel size grows with zoom² × DPR² (a 10 ha district is ≈ 2 400 px square at the B-ZOOM floor of 1:500, ≈ 4 800 px at DPR 2, 92 MB), beyond per-canvas area caps and tab canvas memory; MFCG's per-group caching works because MFCG has no zoom, and even so its forest canvas reached 6 133 × 5 988 px; a zoom step at METROPOLIS re-rasterises every visible tile (MFCG's full-frame replay: 170–230 ms); §12 drops O12 (b)'s zoom clause and its declared draw-call and upload budgets; a 300 dpi A2 PNG (≈ 35 Mpx) has no assembly path that avoids one giant canvas. | ARCH §8.5 (tiles per district; OffscreenCanvas; print by tiling "300 dpi A2 without artefacts"), §8.1 (`Mark.group` = district at city LOD), §13.4 (B-ZOOM 1:50 000 → 1:500), §12 ("≥ 60 fps pan"); IMPROVEMENTS O12 (b) (pan **and zoom** at ≥ 60 fps, ≥ 30 fps on a low-end laptop, draw calls and uploads per 1 000 buildings "within declared budgets") and (e) (the references' 8 MP ceiling). `profile-mfcg.md` ST-2 (forest canvas 6 133 × 5 988 px), §7.2 (170–230 ms per frame; 345 944 `lineTo`); `visual-spec.md` §1.1 (fixed 1 500 × 1 100 canvas, per-ward canvases at screen bounds). | Replace per-district tiles with a screen-space tile pyramid (256–512 px tiles at √2 zoom steps; a district change invalidates the tiles its bounds intersect — also GEO-28's alternative); an LRU canvas-memory budget in bytes per hardware tier; scaled interim tiles during zoom gestures and progressive re-raster in viewport order in the tile worker. Declare the O12 (b) draw-call and upload budgets and put zoom into §12. For print, render horizontal bands of tiles and stream each band into the PNG encoder, so no canvas exceeds one tile. Count shadow compositing buffers in the budget. |
| SCL-8 | major | Trees are generated at render and "never stored": positions per green entity by Poisson-disc with k = 50 candidates all evaluated (garden 4–6 m, wood 3–5 m), crowns per tree by the lobed-crown generator; measured at 11–12 µs per tree for positions alone, 10 000 trees cost ≈ 115 ms before any crown is built or drawn, so O19 (e) "≥ 10 000 trees within a 16 ms frame" and §12's 200 k-tree pan hold only if generation is cached off the frame — which the text does not say. D-11 justifies k = 50 as "cheap" at render; it is not. | ARCH §4.9 (trees-at-render row; O19 (e)), §3.1 Poisson row (both Bridson k = 50 and "a fixed 140-point tile stamped per area" are named, without saying which is normative), D-11, J-10, §8.2 `crown(lobes, jitter)`, §12. Executed (bench_poisson_astar): 11.4–12.1 µs per accepted point; one 36 ha wood = 14 477 trees in 170 ms. References: MFCG tiles one precomputed 140-point pattern (≈ 200 point tests per filled area) and builds 20 crowns once per session (ST-2); NG's crowns have 120–180 vertices from ≈ 20 `bloat` calls per tree, 6 canvas ops per tree (§3.9). | Make the tile-stamp path normative for every scatter class (a few precomputed blue-noise tiles per class, built once per session, stamped with a per-entity offset and rotation from its stream, clipped by point-in-polygon), with jittered grids for orchards and avenues. Build a crown library per style (≈ 20 per class) once per session, drawn as sprites in Canvas2D and as instances in WebGL2. Generate instances per tile in the tile worker and cache them by entity for the session, with positions independent of the LOD band (LC-20; the band selects only the crown symbol and a deterministic thinning) — still never persisted. Restate O19 (e) with what the 16 ms covers, a placement budget (≤ 1 µs per tree) and a draw budget. |
| SCL-9 | major | Edits scale with the city, not the scope: §7.3 re-runs "the label and display stages globally" after every regeneration, which at CITY is already S13 10 ms + S14 20 ms = the whole 30 ms per-district budget (≈ 75 ms at METROPOLIS) before any local work; replaying the edit log (load verification "immediately for ≤ CITY", undo beyond the ring, migration) repeats the global stages per edit, O(edits × city); and MFCG's warp tools are a live staged preview, while every PLAT warp event goes through dry run, suite and re-derivation. | ARCH §7.3 ("re-run only the label and display stages globally"), §12 (per-district regeneration ≤ 30 ms; single plot edit ≤ 5 ms; edit-to-redraw < 100 ms; S13 10 ms; S14 20 ms), §2.9 (load re-verification), §7.4 (undo "rebuilt by replay"), §7.5, §7.1 (warp event with dry-run validation), §3.4 `warp`. `mfcg-posts-a.md` §T4 (warp is "a staged, committable edit … Apply and Discard"). Arithmetic: 300 edits × ≥ 30 ms of global stages ≈ 9 s of replay at CITY. | Make S13 and S14 incremental: a regeneration marks a dirty region; S14 re-emits only changed entities' marks and groups; tiles intersecting the region are invalidated; S13 re-places only labels whose candidates intersect it, plus a priority cascade that stops when nothing more moves. Add a replay mode that applies the whole log to the model and runs S13/S14 once at the end, bounded by SCL-5's checkpoints. Add a warp preview mode (vertex moves on L1 and redraw of the affected tiles at ≥ 30 fps; invariants and re-derivation on Apply only). State §12's edit budgets as functions of scope size and test that the same scope costs the same from TOWN to METROPOLIS. |
| SCL-10 | major | Label placement is priced at 10 ms for district spines, but the specified work is the full map at every LOD band in the model: district and water spines, street labels "repeated per segment", addresses along every way (one per building), point labels, each fitted and checked in a screen-space collision index per LOD with protected obstacles and "0 collisions at every LOD" as an invariant; screen-space collisions also change with zoom inside a band, so the result is either wrong between band stops or recomputed per zoom on the main thread, unbudgeted — GEO-29's option (b) turns it into exactly that runtime cost. | ARCH §9 (area, path and point labels, addresses, per-LOD screen-space `rbush`, protected features, 0 collisions), §12 (S13 10 ms, "spines cached per district"), §7.3 (global re-run), §8.5 (continuous zoom with hysteresis); GEO-29. MFCG places ≈ 60–190 letters per city along ≈ 15 skeleton ridges (`profile-mfcg.md` §6.2, §8), and its label text costs 40–73 ms per frame (§7.2). METROPOLIS carries 12–15 k buildings, hence 12–15 k address candidates. | Split S13 into model-side candidate generation (spines, anchors, alternates, priorities, widths from bundled font metrics per GEO-29 (a)) and view-side selection (greedy by priority in a viewport-culled grid index, per zoom stop, in the tile worker) with a budget (≤ 2 ms per zoom stop for ≤ 2 000 visible candidates). Place addresses and street names only for visible tiles at their LOD. Check "0 collisions" at declared zoom stops. State S13's model budget at METROPOLIS. |
| SCL-11 | major | The `.plat` snapshot persists derivable, poorly-compressible data: the prosperity and density rasters (Float32 at terrain resolution gzip to 2.7 MB at CITY's 625², 7.0 MB over the plat's margin, 11.4 MB at METROPOLIS) against document budgets of ≤ 3 MB and ≤ 8 MB; five separate per-level DCELs store every inherited boundary up to four times; `report.streamKeysUsed` holds ≈ 10⁵ strings. FTG's 593 KB for 2 798 buildings, population and trees is the stated bar. | ARCH §2.9 (`snapshot.fields: { prosperity: Raster; density: Raster }`; "FTG's economy … is the bar"), §5.4 (`streamKeysUsed: string[]`), §2.2 (levels are separate DCELs), §12 (document gz ≤ 0.6 / 3 / 8 MB); `ftg-payload-visual.md` §1 (593 KB). Executed (bench_siting_doc): one Float32 field 1.36 MB gz at 625², 3.49 MB at 1 000², 5.72 MB at 1 280²; entity JSON for 22 250 schema-shaped records 1.25 MB gz; 10⁵ stream keys 0.50 MB gz. Geometry for 5 × 60 k vertices ≈ 2–3 MB gz (PLAUSIBLE). CITY total ≈ 6.5–7.5 MB. | Do not persist derivable fields: persist brush strokes and recompute on load with SCL-3's O(N) blur, or store a quantised coarse cache (Uint8 at 32 m ≈ 40 KB at CITY). Persist geometry once — a shared vertex store with level-tagged edges (GEO-1's alternative) or L3/L4 only, with L0–L2 re-derived from the recipe. Record stream keys only for attempts > 0 and ladder uses. Add a document-size test per rung against §12 and against FTG's bytes per building. |
| SCL-12 | major | Every stream key is derived by building a UTF-8 path string and hashing it (§6.1); measured at 0.73 µs per key, the design's own ≈ 10⁵ keys at CITY cost ≈ 73 ms (≈ 30 % of the 240 ms p50) and ≈ 2.5 × 10⁵ at METROPOLIS ≈ 195 ms, none of it budgeted; because the key encoding fixes every seed's output (D-15: reversal cost "high after M1"), a later speed fix would shift every golden. | ARCH §6.1 (canonical UTF-8 path; two 32-bit-lane mixers; "≈ 10⁵ keys" in a B-CITY city; streams created on demand, including `style/*` and `render.trees` at render time), D-15, §12. Executed (bench_state): 10⁵ path strings → 128-bit keys (TextEncoder + four murmur-style lanes) in 73 ms; 2.5 × 10⁵ in 195 ms. | Derive keys from structured components, not strings: stage id (u16), the entity's canonical-id hash (computed once when the id is minted and cached in the arena), concern id from the registry (u16), attempt and epoch, mixed by the 32-bit-lane mixer into 128 bits; keep the textual path for reports only; budget ≤ 0.1 µs per key; decide it in the M0 determinism spike, before any golden is signed. |
| SCL-13 | major | The stage-3 hook has no cost contract: compositions are "lazily generated", yet the owner requires the composed footprints "at every zoom, including the city view" and O17 (i) requires the same footprint hash at every LOD, so every building must be composed before the first city frame; at Fantasy Manor's measured 0.6–1.7 ms per building model, METROPOLIS's 12–15 k buildings take ≈ 7–25 s. | ARCH §2.6 (`composition?: Composition /* stage 3: lazily generated */`; `BuildingGenerator.compose(…, lod)`), §8.6, §15.2 O17 (i); owner STAGE 3 ruling; §12 (METROPOLIS 12 000–15 000 buildings, 700 ms p50). `captures/manor/README.md` cost table: `Manor.new` 1.7 / 0.8 / 0.6 ms in gens 0–2 (model only; its view and shadow cost more). | Split the interface into `outline(input) → footprint rings + heights` (cheap and deterministic, used at every LOD and in exports; ≤ 20 µs per building) and `compose(input, lod)` for wings, roofs and rooms, computed lazily per visible tile. Require the outline to equal the union of the composed wings (a contract test) so O17 (i) holds. Put a per-building cost budget and a METROPOLIS total into the hook's documentation; the stage-3 intake measures FM-class composition time per building class. |
| SCL-14 | major | The layered SVG export emits one element per entity with its id, trees as `<use>`, hatching as paths and per-glyph text, at an unstated LOD; at METROPOLIS that is ≈ 15 k footprints × 2 marks, ≈ 30 k yard parts, the ways, and up to ≈ 200 k tree instances at district LOD — ≈ 20–35 MB and 100–300 k elements, against MFCG's 6.3 MB and ≈ 35 k paths for 15 392 buildings — so O11 (h) "opens in Inkscape / Illustrator with layers intact" is not credible at that size. | ARCH §11 SVG row (entity ids on elements; instances as `<use>`; hatching as paths), §8.7, §15.2 O11 (h), O12 (c); §12 (200 k trees at METROPOLIS). `captures/mfcg/exports-2026-09-25/README.md` (size 80: 15 392 buildings, SVG 6 297 685 bytes, 15 367 roof paths + 19 526 dark footprints; size 40: 0.42–0.66 MB). Our size is PLAUSIBLE arithmetic at ≈ 70–150 bytes per element. | Specify the export LOD (city band by default; district band on request, with a size warning). Emit compound paths per (semantic, district) with an id side table (a data attribute on each group plus a JSON map from subpath ranges to entity ids) instead of one element per entity. Emit trees as one compound path per green entity or per tile, and per-glyph text only for curved labels. Add an export size and element-count test at METROPOLIS (for example ≤ 1.5× MFCG's bytes per building, ≤ 60 000 elements) and an open-time check in Inkscape to O11 (h). |
| SCL-15 | minor | Every budget is stated "on reference hardware", which is defined nowhere, so no budget is falsifiable and CI runner timings cannot be compared with the recorded bars; the bars themselves were recorded on one identifiable machine. | ARCH §1.2, §5.2 F-BUDGET-TIME, §12, §16 M0/M1 exits; IMPROVEMENTS O3 (d), O12 (b), O16 (e); `captures/mfcg/2026-09-21T11-25-32/meta.json` (`darwin`, 8 CPUs, `Apple M1`, headless Chrome). | Define reference hardware as the capture machine class (Apple M1, 8 cores, Chrome stable, one generation worker) and a named low-end device for O12 (b)'s ≥ 30 fps clause; normalise CI timings by a calibration benchmark (§7's scripts are a start); state per budget whether it is measured in Chrome or Node. |
| SCL-16 | minor | §7.8 promises six S0–S4 proxy thumbnails "within 1 s for all six" for the size and water controls, dropping IMPROVEMENTS O16 (e)'s "at town size"; S1 alone measures 126 ms at CITY and 267 ms at METROPOLIS, so six proxies take ≈ 0.8–1.6 s before S4. | ARCH §7.8; IMPROVEMENTS O16 (e) ("Six layout thumbnails in < 1 s at town size"); bench_terrain (S1 subtotal 53 ms TOWN, 126 ms CITY at 625², 267 ms METROPOLIS at 800²); bench_poisson_astar (A* 17 ms CITY, 30 ms METROPOLIS). | Restore "at TOWN size", or make S1 two-phase — SCL-3's ≥ 32 m coarse field is the model's own first phase — so a proxy is exactly the town's first phase and continuing it cannot diverge (LC-30); state a proxy budget per rung. |
| SCL-17 | minor | The first-map targets disagree and METROPOLIS's rests on an optional backend without text: §1.2 and O12 (g) say under 1 s, §12 says ≤ 2 s for METROPOLIS, and METROPOLIS's first frame "≤ 1 s (progressive; WebGL2 tier)" depends on WebGL2, which §1.7 makes optional and whose SDF text is deferred. | ARCH §1.2, §1.7 (WebGL2 optional), §12 (time to first map ≤ 2 s METROPOLIS; first frame "WebGL2 tier"), §15.2 O12 (g), Deferrals ("WebGL2 SDF text"). | Give one first-map target per rung for the default Canvas2D backend; if METROPOLIS needs WebGL2, make it a declared requirement with a text path (not deferred) and keep a Canvas2D fallback target. |
| SCL-18 | minor | The CI plan has no compute budget: B-CITY's 12 000 generations with the suite after every batch, B-EDIT's 10⁵ sequences each checked against a from-scratch regeneration, B-FUZZ's 10⁶ inputs per primitive and nightly five-engine goldens with a PNG per LOD and preset add up to ≈ 10–20 CPU-hours per full run, so the suite cannot gate changes. | ARCH §13.1–§13.3, §16 M3 exit (10⁵ sequences), §7.3 (oracle). Arithmetic: 12 000 × ≈ 0.47 s (TOWN 0.1, CITY 0.3, METROPOLIS 1 s) ≈ 1.6 CPU-h before the suite; 10⁵ oracle regenerations × ≈ 0.3 s ≈ 8 CPU-h; 10⁶ × ≈ 20 primitives × 50 µs–1 ms ≈ 0.3–5.5 CPU-h. Owner efficiency standard: "shorten long CI jobs structurally". | Tier CI with stated wall-clock budgets: a PR tier of minutes (for example 50 seeds per rung, 10⁴ fuzz cases per primitive, 10³ edit sequences) and a nightly full tier; sample the oracle per sequence, not per edit. |
| SCL-19 | minor | The cost-model tests fit each stage's time against its entity count "across the rungs" — three points — and time only generation, so they cannot catch the mechanisms that actually go super-linear here (per-batch work that grows with batches × level size; per-edit work that grows with city size). | ARCH §13.2; SCL-1, SCL-2, SCL-9. | Sweep ≥ 6 sizes per stage and fail on a log-log slope above ≈ 1.15; add per-edit cost-versus-model-size tests (edit cost must be flat across rungs for a fixed scope). |
| SCL-20 | minor | Evolution state grows without a compaction rule: every entity carries its whole lifecycle history, JOINed plots keep their members, superseded entities keep `supersedes` links, and epochs append; a 20-epoch town's working set and document grow with its churn, and nothing bounds them. | ARCH §2.1 (JOIN members kept as history; `supersedes`), §2.8 (`Lifecycle.history` inside each entity), §4.11, §2.9 (`epochs: EpochRecord[]`); owner EVOLUTION ruling. | Keep lifecycle history in an append-only event block keyed by id rather than inside each entity; move demolished and superseded entities to an archive block excluded from the working set and indexes; state a per-epoch growth budget and test a 20-epoch town's heap and document size. |
| SCL-21 | minor | A statistics record is emitted by every generation, including metrics that need all-pairs routing (detour index), neighbour graphs (Moran's I), KS tests and tree pair-correlation — the last over trees that exist only at render — and §12 has no stage or budget for it. | ARCH §13.2 ("The statistics record emitted per generation"), §15.2 O6 (d) ("100 % of generations emit a statistics record"), O4 (b), O18 (b), O19 (d), §4.9 (trees never stored), §12. | Split the record into an O(n) core emitted per generation (counts, sums, histograms) with a budget, and the expensive metrics computed on demand or in the bench only; compute tree statistics from the tile-stamped scatter in the bench. |
| SCL-22 | minor | §12's budgets assume Clipper2 in WebAssembly, but the pure-JS fallback ships too and hosts whose content-security policy forbids WebAssembly compilation get it; its cost on S9's per-district unions and the concave insets is budgeted nowhere. | ARCH §1.7, §3.1 (booleans row; one engine "chosen by the M0 benchmark"), D-14, §12 (S9 25 ms "Clipper2 union per district"); GEO-9 covers the numeric divergence. That a strict CSP blocks WebAssembly compilation is a platform rule (PLAUSIBLE here, not measured). | Have the M0 benchmark time both engines on S9 and S11 workloads; give §12 a fallback budget or make WebAssembly a stated requirement of the embed contract; record in the generation report which engine ran. |

## §3 Findings in detail (failure scenario → evidence → required change)

### SCL-1 · blocker · The invariant suite and a whole-model canonical hash run after every batch and every edit

**Failure scenario.** A one-click CITY generation (the §12 counts: ≈ 25 districts, ≈ 1 750 built blocks after S8's
≈ 1 500 cuts, 5 500 plots) commits S4 once, S5 three times, S8 once per district, S10 once per block and S11 once per
plot — ≈ 7 300 batches. §5.3 runs "the invariant suite (run after every batch and every edit)". Its members include
checks that are properties of the whole model, not of the batch: "the model hash recomputed equals the recorded one";
"id uniqueness and reference integrity"; "containment complete (building ⊂ plot ⊂ block ⊂ district, 100 %)"; "every gate
joined to the network and to the plaza" (a graph search); "every requested feature present or reported". With the hash
defined in §6.2 as a hash "over the canonical serialisation (sorted keys, integer coordinates, floats as shortest
round-trip strings)", each batch pays a full serialisation of the model built so far. On this machine, one canonical
serialisation + hash of a schema-shaped CITY model takes 1.16 s; 7 300 of them take hours, and a tuned implementation
ten or even a hundred times faster still takes minutes. The user then drags a plot boundary: §7.1 runs the schema and
the invariant suite on the scratch overlay as a dry run, commits, and §5.3 runs the suite again — two whole-model
hashes per edit against "a single plot edit ≤ 5 ms" and "edit-to-redraw < 100 ms".

**Evidence.** ARCH §5.3 (quoted above), §7.1 ("every event is validated against the schema and the invariant suite on
the scratch overlay before commit"), §13.2 ("The §5.3 suite runs after every batch on B-CITY"), §6.2, §4.1 (batch
scopes), §12 (the CITY split and the edit budgets). Executed, `bench_state` (§7.3): a synthetic model shaped by the §2
interfaces at §12's CITY counts — 22 250 entities (plots with context vectors, lifecycle and provenance; buildings;
blocks; ways; households; greens) and five plats of 60 k vertices each — serialises canonically in 1 045 ms (65 MB of
text) and hashes in a further 118 ms; METROPOLIS takes 2 712 ms for 167 MB. The dominant term is the typed-array
geometry, which a tuned hash would digest as raw bytes; even so a whole-model digest is O(model), and O(model) per batch
is O(batches × model).

**Required change.**
* Every invariant declares a **scope**: *batch-local* (evaluated on the touched faces and their one-ring; examples:
  simple polygons, minimum width, no footprint overlap, access edge present); *stage-end* (gate connectivity, requested
  features present, containment totals); *save* (id uniqueness across the document); *CI-only* (the cross-platform
  hash comparison). Only batch-local invariants run per batch, incrementally.
* The **model hash becomes a Merkle digest** over the plat tree: per-face and per-entity digests roll up to block,
  district, level and model; a batch updates the digests on its dirty path (O(touched × depth)). The canonical text
  serialisation remains the format of golden files and exports, not the in-loop check.
* A batch verifies only its subtree's digest; a CI test asserts that the per-edit validation cost is flat from TOWN to
  METROPOLIS (± 20 %).
* Decide this before M0's determinism spike (§16 M0 d), because goldens, the K-3 snapshot re-verification and the
  locality oracle all compare this hash; changing its definition after goldens exist re-signs every one of them.

**Status.** CONFIRMED that the text prescribes the whole suite per batch and per edit (quoted) and CONFIRMED as a
measurement of our serialiser on a schema-shaped model; the tuned-implementation factor is PLAUSIBLE, and the finding
does not depend on it (per-batch O(model) is the defect).

### SCL-2 · blocker · The static index rebuilt at every batch commit makes S10 and S11 cost seconds

**Failure scenario.** S10 lays plots block by block, committing one batch per block; each commit rebuilds L3's static
packed index over every L3 face so far. S11 lays footprints plot by plot (or block by block), and each commit rebuilds
L4's index over every footprint and yard part so far. The cost of a rebuild is linear-log in the level's size, so the
stage costs the sum over batches — quadratic in the number of plots. Measured with our flatbush-equivalent build, S10
takes ≈ 1.9 s and S11 ≈ 13 s at CITY against 55 ms and 25 ms; at METROPOLIS ≈ 13 s and ≈ 85 s. Choosing S11's per-block
option still costs ≈ 4 s. A single plot edit commits one L3 and one L4 batch — 7.3 ms at CITY and 18.8 ms at
METROPOLIS before any geometry is computed, against "a single plot edit ≤ 5 ms". Stage 2 inherits the same rule: a
district close-up of ≈ 220 plots rebuilds L4 ≈ 220 times (≈ 1 s against "open a district ≤ NG's 10–96 ms").

**Evidence.** ARCH §2.2 (`index: { static: FlatbushIndex /* rebuilt at batch commit */; dynamic: GridIndex /* inside a
batch */ }`), §3.3 ("the static `flatbush` index is rebuilt **once per batch commit**"), §4.1 ("S10 one per block; S11
one per plot (cheap ops) or per block; edits one per event"), J-7 ("Chose batched transactions … because the static
index rebuild would otherwise cost seconds"). The engineering judge computed the per-insertion version of this hazard
(≈ 48 s) and prescribed "flatbush is rebuilt once per stage commit" (judge-engineering §0.2 #4, K-2); the architecture
wrote "per batch commit" and then declared batches as small as one plot. Executed, `bench_index` (§7.4): median build
0.24 ms at 1 k items, 2.3 ms at 8 k, 4.9 ms at 17 k, 12.5 ms at 42 k, 18.0 ms at 60 k (the judge's estimate was
≈ 10 ms at 60 k, "optimistic"; at that rate the stage sums shrink by ≈ 45 % and remain two orders over budget). Level
sizes assumed: L3 ≈ 8 000 faces at CITY (5 500 plots plus residue), L4 ≈ 17 000 (6 000 footprints plus ≈ 2 yard parts
per plot); with L4 at only 6 000 items, S11 per plot is still ≈ 4 s. GEO-25's rear lanes add L1 and L2 commits per block.

**Required change.** One of:
* rebuild each level's static index **once per stage** (and once when an edit burst goes idle); answer every query
  inside a stage and every edit from the dynamic per-level index (a uniform grid: O(1) insert and delete), merged into
  the static index at stage end; or
* partition static indexes **per district**, so a block or plot commit rebuilds only its district's partition (≤ 1 000
  items, ≈ 0.25 ms).

State the rule in §3.3 and §4.1, correct J-7's rationale, and add a cost-model test on (commits × level size).

**Status.** CONFIRMED (text quoted; rebuild cost measured; stage sums are arithmetic on the measured curve).

### SCL-3 · major · The CITY per-stage split omits the dominant term of several stages

**Failure scenario.** A CITY with a river is generated on the capture machine. Implemented as the text specifies, the
stages cost:

| stage | what the text specifies | §12 budget | measured / computed (straightforward implementation) |
|---|---|---|---|
| S1 site | 5-octave fBm over the raster (§12 counts "≈ 2 M evaluations" at 625²), priority-flood, D8, accumulation, marching squares; raster "refined to 2.5 m inside the built extent"; the plat and the hinterland span frame + 30 % per side (§3.2, §4.9) | 30 ms | fBm alone 53.5 ms (27.4 ns per evaluation); fBm + flood + D8 + accumulation + 11 contour levels = 126 ms at 625²; 333 ms at 1 000² (the 8 km frame + margin); the 2.5 m refinement over a 2.5 km built extent is another 1 000² (≈ 330 ms if generated, not interpolated) |
| S4 backbone | lattice "at ≈ 25 m spacing (Poisson-disc, relaxed once) triangulated with Delaunator"; ≤ 12 A* queries | 12 ms | Poisson-disc (k = 50, all evaluated, D-11) 310 ms for 25.7 k points (≈ 480 ms at the stated ≈ 40 k); 12 A* queries 16.6 ms on a 46 k-node lattice (graph build 16 ms excluded); Lloyd relaxation and Delaunay not measured |
| S5 growth | a stage boundary per growth stage = "a smoothed level set of 'distance-cost from the centre' over the cost surface"; ≈ 5 000 proposals at ≤ 8 µs | 35 ms | the cost-distance field: 70 ms on the 625² raster (≈ 15–20 ms on the S4 lattice, PLAUSIBLE); and 5 000 × 8 µs = 40 ms, above the stage's own 35 ms before any legality query |
| S6 districts + fields | prosperity, density and greenery-propensity fields, each "smoothed by a Gaussian of one block width (σ ≈ 60 m at CITY)", driver kernels over all sources, a second pass after typing | 10 ms | separable Gaussian 67 ms per field at 625² → ≈ 200 ms for three (the O(N) three-box blur: 6.4 ms per field) |
| S10b siting | "each venue class has a score over the plot context … plots are filled in descending score", ≤ 3 reconcile rounds | 8 ms | 98 ms per round for 80 classes × 5 500 plots with a full sort per class; 294 ms for three rounds |
| S12 hinterland | the margin "partitioned by the extended arterials and the field-system preset: open-field strips (long narrow faces …)" | 12 ms | the CITY margin is 39 km²; strips of 0.2–0.4 ha are 10 000–20 000 faces → 80–160 ms at §12's 8 µs per insertion; FTG-sized fields (≈ 2.5 ha) ≈ 1 600 faces → ≈ 13–60 ms (PLAUSIBLE arithmetic) |
| S10 plots | 10 µs per plot incl. strips, bent side lines, joins, alleys and the context vector (7 nearest-feature distances, drainage position, slope, aspect, upwind, shape metrics) | 55 ms | not measured; the context vector alone is ≈ 10 nearest-feature and raster queries per plot (PLAUSIBLE ≈ 5–10 µs), so 20–30 µs per plot is the realistic rate |
| stream keys | ≈ 10⁵ keys derived from UTF-8 path strings (§6.1) | — | 73 ms (SCL-12) |

The measured rows alone (S1 126, S4 A* 17, S5 field 70, S6 blur 200, S10b 294, keys 73) sum to ≈ 780 ms against their
budgets' ≈ 95 ms, so the CITY p95 of 300 ms fails by ≈ 2–3× on these stages before any lane is cut; with the margin
raster and the Poisson lattice it is ≈ 4×.

**Evidence.** ARCH §12 (the per-stage split, verbatim in the table), §2.3, §3.1 Poisson row, §3.2 (frame table incl. the
margin), §4.2 S1, §4.3, §4.4, §4.5, §4.7 S10b, §4.9, D-11. Executed on the capture machine: `bench_terrain`,
`bench_poisson_astar`, `bench_siting_doc` (§7.1, §7.2, §7.5). Reference context: VG spends 17–87 ms in one 128 × 128 grid
pass (`createDeflection`, `profile-village.md` §4.1, §5), i.e. ≈ 1–5 µs per cell; our S1 budget assumes ≈ 0.08 µs per cell
for all raster work at 625².

**Required change.** Re-budget each stage with its mechanism named, and prefer the mechanisms whose cost is known:
* S1: fBm evaluated on a coarse grid (≥ 32 m) with bilinear refinement plus one or two fine octaves only inside the built
  extent; priority-flood with a bucket queue on the integer `heightCm` and a FIFO for depressions; contours extracted
  lazily per render tile rather than in S1; the 2.5 m refinement as on-demand interpolation, not a stored raster; the
  margin at ≥ 32 m cells. (Our three-box blur and the flood already run at 6 ms and 44 ms at 625²; the coarse-grid fBm
  divides the noise cost by the cell-area ratio.)
* S4: a jittered hexagonal lattice with adjacency known by construction — no Poisson-disc, no Lloyd, no Delaunay; edge
  costs computed once; the A* budget set from a measurement (≈ 17 ms here untuned).
* S5: one cost-distance field per growth run on the S4 lattice or a ≥ 20 m raster, budgeted; correct 5 000 × 8 µs.
* S6: fields at 16–32 m cells, an O(N) blur (three-box or recursive Gaussian), driver kernels splatted within their
  radius (O(sources × r²)) or by distance transforms per driver class — never a sum over all sources per cell.
* S10b: top-k selection over candidates pre-filtered by district affinity and requirement class; incremental capacity.
* S12: open-field strips drawn as render-time segmentation inside FTG-sized field faces; model faces counted and budgeted.
* S10: count the context vector in the per-plot rate.
* Add a **site-and-fields spike** to M0 next to the fusion gate (the fusion gate covers S4 + S5 + S8 only), starting
  from §7's scripts.

**Status.** CONFIRMED for the measured rows (untuned implementations of the named mechanisms); PLAUSIBLE for the S12,
S10 and lattice-Dijkstra rows (arithmetic). A tuned TypeScript implementation will be faster than these scripts; the
finding is that the budgets are an order of magnitude below the named mechanisms, not that the mechanisms are
unimprovable.

### SCL-4 · major · The one-click view defeats the laziness the METROPOLIS budget relies on

**Failure scenario.** "Surprise me" returns a METROPOLIS; the app shows the whole city at city LOD. §4.1 emits the
city-LOD display list "as soon as S9 commits" and derives S10–S14 lazily per district "after the first paint"; §12 says
METROPOLIS "relies on lazy per-district derivation of S10–S13 (only visible districts first)". But at the default view
every district is visible. The owner's PLOT MODEL requires that "at city zoom the footprints are what shows" and stage 3
that footprint shapes show "at every zoom, including the city view"; §8.5's city band needs "district labels" (S13) and
the hinterland (S12). So either the S9 frame draws blocks as masses — the "illusion of buildings" the owner ruled a
weakness — and then pops when S11 lands, or the first real frame waits for S10–S13 in every district, and the laziness
saves nothing on the one-click path. §12's CITY split puts S10 + S10b + S11 + S12 + S13 at 110 ms (≈ 275 ms at
METROPOLIS), all of which is on that path; the per-district worker arenas that might recover it are "if profiling
demands it", with the merge protocol unwritten (J-12).

**Evidence.** ARCH §4.1, §8.5 (city band: "blocks as footprint masses, landmarks, district labels"), §12 (METROPOLIS
clause), J-12; the owner's PLOT MODEL and STAGE 3 paragraphs (brief, PRODUCT SCOPE). LC-2 and FTG-1 reach the same
laziness from another side (a global siting fill cannot be derived district by district); MFP-1 from the look.

**Required change.**
* Define the one-click first paint as the complete city LOD: S0–S13 for every district at city-band detail, and budget
  METROPOLIS for that.
* Restrict laziness to what the city band does not draw: yard sub-parts, entrances, roof ridges, street names,
  addresses, tree crowns (per SCL-8 and SCL-10).
* If an S9 preview is kept, specify what it draws (blocks in a distinct preview style, never presented as the map) and
  that the city frame replaces it exactly once, with the pop counted in B-ZOOM's report.
* If METROPOLIS needs per-district workers, write the merge protocol before M2, not "if profiling demands it".

**Status.** CONFIRMED as a contradiction between quoted texts; the time at stake is arithmetic on §12's own numbers.

### SCL-5 · major · The undo snapshot ring multiplies the model by eight; the CITY heap is over budget even without it

**Failure scenario.** A user regenerates eight districts of a CITY one after another. §7.4 keeps "the last k = 8
snapshots" for undo, and a snapshot is the document's materialised model: every plat, the entity table and the field
rasters (§2.9). One CITY snapshot is ≈ 80 MB (plats ≈ 20–29 MB; entities ≈ 47 MB; rasters ≈ 3–5 MB), so the ring holds
≈ 640 MB against the ≤ 100 MB CITY heap; at METROPOLIS ≈ 200 MB per snapshot and ≈ 1.6 GB for the ring against 300 MB —
enough for a mobile browser to kill the tab. If "bounded by size" instead caps the ring at what fits (k ≈ 0–1 at CITY),
every older undo is "rebuilt by replay": a full regeneration plus the edit log (SCL-9), seconds rather than the
< 100 ms edit-to-redraw. Without any snapshot the CITY working set is already ≈ 130–150 MB: plats 20–29 MB, entities
≈ 47 MB, terrain and refined rasters and three fields ≈ 15–25 MB, indexes, the display list ≈ 20 MB in the worker and its
copy on the main thread (SCL-6).

**Evidence.** ARCH §7.4 (regenerate row), §12 ("the memoised snapshot ring bounded (k = 8, older ones rebuilt by
replay)"; memory column ≤ 30 / 100 / 300 MB; "CITY plat ≈ 60 k vertices × 5 levels ≈ 20 MB"; "display list ≈ 20 MB"),
§2.9. Executed, `bench_state` (§7.3): five plats of 60 k vertices as the §2.2 typed arrays = 29 MB (73 MB at METROPOLIS
scale); the entity table ≈ 117 MB for 55 625 schema-shaped entities (≈ 2.1 KB each; the CITY heap figure was lost to
GC noise, so CITY's ≈ 47 MB is that per-entity size × 22 250). What inflates an entity: a per-plot `ContextVector` with
a copied `venueMix` record, a `Lifecycle.history` array, and a `Provenance` with its own `tableVersions` record, `rules`
and `deps` arrays of strings (LC-25 raises the same per-entity versions for the hash).

**Required change.**
* Replace whole-document snapshots with **scoped undo records**: the inverse event plus the faces and entities the
  regeneration replaced, O(scope). Keep **checkpoints** every K edits (K chosen so replaying from the last checkpoint
  stays ≤ 100 ms) instead of an eight-deep ring. If snapshots stay, chunk the arenas per district with copy-on-write so a
  snapshot costs only the changed chunks.
* Compact the entity store: context vectors and provenance as struct-of-arrays columns; `tableVersions` interned once
  per stage run; `venueMix` referenced from the district instead of copied per plot; `deps` as u32 handles.
* Define what §12's memory column counts — JS heap, typed arrays, canvas backing stores and WebAssembly memory, on
  both threads — and add a per-rung memory test to B-CITY.

**Status.** CONFIRMED that the text keeps whole snapshots (quoted) and CONFIRMED sizes for our schema-shaped data
(measured); the per-snapshot total and the working-set sum are PLAUSIBLE arithmetic on those measurements.

### SCL-6 · major · The worker boundary is unspecified, and the typed API clones the model on every call

**Failure scenario.** The reference app runs generation "in a Web Worker with transferable buffers and incremental
delivery" (§4.1), and the embedding API is `generate(blueprint) → Promise<Document>`, `edit(doc, e)`,
`regenerate(doc, …)`, `render(doc, …)`, `export(doc, …)` (§11, §14). A `Document` holds the entity table, so returning
it from the worker structured-clones it: the main thread spends ≈ 162 ms deserialising a CITY table (≈ 268 ms at
METROPOLIS) inside the "first frame ≤ 400 ms" budget; passing it back for `edit` clones it again. `DisplayListBuilder.build`
returns `Mark[]`, one object per mark with a `Record` of attributes and an `lod` array; a 60 k-mark list — the size §12's
"display list ≈ 20 MB" implies — costs the main thread ≈ 140 ms to receive (≈ 300 ms at METROPOLIS's ≈ 150 k marks). If
instead the plats' typed arrays are transferred, they are detached in the worker, which is still running S10–S13 on the
same levels during incremental delivery. SharedArrayBuffer would avoid both, but it requires cross-origin isolation
that an embedding host page may not provide, and the design does not mention it.

**Evidence.** ARCH §4.1 (the only sentence on the boundary), §8.1 (`Mark`, `DisplayList`), §11 embedding API, §14
(`PlatApi`, `DisplayListBuilder.build(…): Mark[]`), §12 (first frame ≤ 400 ms CITY; edit-to-redraw < 100 ms). Executed,
`bench_state` (§7.3), with Node's v8 serialiser, which implements the structured-clone algorithm used by `postMessage`:
CITY entity table 19.4 MB, sender 60 ms + receiver 162 ms; display list 60 k marks 17.7 MB, sender 46 ms + receiver
140 ms; 125 k marks 208 ms; METROPOLIS 150 k marks 302 ms, 312 k marks 895 ms; the five CITY plats copied in 9 ms (typed
arrays clone cheaply — the objects are the cost).

**Required change.**
* **Handle-based API.** `generate → DocHandle`; the document lives in the worker; `edit(handle, e)`, `regenerate(handle,
  …)`, `query(handle, q)`; `export(handle, fmt)` returns bytes. Document, per call, what crosses and whether it is
  transferred or copied. The headless Node path may keep by-value convenience wrappers.
* **Columnar, transferable display list.** Typed arrays for mark kind, semantic id, entity handle, z, LOD mask,
  geometry offsets into one Int32 coordinate buffer, and attribute columns; delivered per group as deltas and
  transferred; the worker keeps its working buffers and transfers slices.
* State that SharedArrayBuffer is optional and needs COOP/COEP from the embedding host.
* Budget the main thread's receive work per delivery (≤ 4 ms, chunked if needed) and test it in B-CITY's browser runs.

**Status.** CONFIRMED (API text quoted; clone costs measured with the same algorithm; Node's serialiser stands in for a
browser's — PLAUSIBLE within a small factor).

### SCL-7 · major · Per-district retained tiles break under continuous zoom, and print has no assembly path

**Failure scenario.** The Canvas2D backend keeps "retained **tiles per district** (MFCG's per-ward cache)". MFCG draws at
one fixed scale into a 1 500 × 1 100 canvas, so its per-ward canvases stay a few hundred pixels (`visual-spec.md` §1.1);
even so, its forest layer — a group that extends off-screen — became a 6 133 × 5 988 px canvas (36.7 Mpx, ≈ 147 MB RGBA;
ST-2). PLAT zooms continuously from 1:50 000 to 1:500 (B-ZOOM). At 1:500 on a 96 dpi screen (≈ 0.13 m per pixel) a
10 ha district (≈ 316 m square, the middle of the 5–15 ha band) is ≈ 2 400 px square, ≈ 4 800 px at DPR 2: 23 Mpx and
≈ 92 MB for one tile, above the per-canvas area caps of common mobile browsers (a platform limit, PLAUSIBLE here) —
which draw such canvases blank or refuse them — and several of them exhaust tab canvas memory. Zooming out of a
METROPOLIS re-rasterises every visible tile at the new scale; MFCG's full-frame replay of a size-80 map (≈ 15 k buildings in the
profiled city) costs 170–230 ms, so zoom cannot hold IMPROVEMENTS O12 (b)'s "pan **and zoom** at ≥ 60 fps" — a clause §12 silently narrowed
to "≥ 60 fps pan", together with O12 (b)'s "draw calls per 1 000 buildings and GPU uploads per frame within declared
budgets", which no section declares. Printing A2 at 300 dpi (O12 (e)) needs a 4 961 × 7 016 px image (≈ 35 Mpx,
≈ 139 MB RGBA); "tiled rendering" is stated, but not how tiles become one PNG without a canvas of that size — the
references' measured ceiling is 8 MP.

**Evidence.** ARCH §8.5 (tiles per district; OffscreenCanvas; print tiling, "300 dpi A2 without artefacts"), §8.1
(`Mark.group`: "district at city LOD, block at district LOD"), §13.4 (B-ZOOM 1:50 000 → 1:500), §12; IMPROVEMENTS O12 (b)
and (e) (quoted in the §2 row). `profile-mfcg.md` ST-2, §7.2 (170–230 ms of Canvas replay per frame; 345 944 `lineTo`,
104 728 `stroke`, 34 950 `fill`); `visual-spec.md` §1.1 (1× pixels, fixed canvas; "cache per ward, not per building").
Overlap: GEO-28 attacks the same tiles for draw-order seams.

**Required change.**
* A **screen-space tile pyramid**: fixed 256–512 px tiles at discrete zoom steps (√2 apart); a district's change
  invalidates only the tiles its bounds intersect (this is also GEO-28's alternative). An LRU **canvas budget in bytes**
  per hardware tier.
* During zoom gestures draw scaled interim tiles; re-raster progressively in viewport order in the tile worker.
* Put zoom into §12 and **declare** O12 (b)'s draw-call and upload budgets per 1 000 buildings.
* **Print**: render horizontal bands of tiles and stream each band into the PNG encoder (one IDAT run per band), so no
  canvas is larger than a tile row; include shadow compositing buffers (one per layer per tile when shadows are on) in
  the canvas budget.

**Status.** CONFIRMED for the text and for MFCG's canvas sizes and replay times; the tile arithmetic is CONFIRMED
arithmetic; per-canvas caps of particular browsers are PLAUSIBLE (platform knowledge, not measured here).

### SCL-8 · major · Trees generated at render with per-tree Poisson sampling and per-tree crowns cannot meet the 16 ms claim

**Failure scenario.** The user zooms into district LOD over a quarter with gardens and a 36 ha wood. §4.9 generates trees
"at render … never stored": gardens by 4–6 m Poisson-disc, woods by 3–5 m warped Poisson-disc, with D-11's k = 50
candidates all evaluated; §8.2's `crown(lobes, jitter)` builds each crown with the lobed-crown generator. Positions
alone cost ≈ 12 µs per tree: the wood's 14 477 trees take 170 ms, and 10 000 trees take ≈ 115 ms — seven frames —
before a crown exists. NG's crowns, which the `hatched` preset reproduces, have 120–180 vertices from ≈ 20 `bloat` calls
each and six canvas operations per tree. O19 (e) "≥ 10 000 trees within a 16 ms frame at district LOD" and §12's
"≥ 60 fps pan at … 200 k trees" can hold only if generation and crown building are cached outside the frame; the text
says scatter is "cached by entity id and discardable" (§8.5) but also that it is regenerated per LOD band and that it is
cheap (D-11: "scatter is render-time and cheap"). §3.1 names both Bridson sampling and "a fixed 140-point tile stamped
per area for scatter (MFCG's trick)" without saying which one §4.9's rows use.

**Evidence.** ARCH §4.9 (trees-at-render row; O19 (e)), §3.1 (Poisson row), D-11, J-10, §6.1 (`style/*` and
`render.trees` streams keyed by entity and LOD band), §8.2, §8.5, §12. Executed, `bench_poisson_astar` (§7.2):
11.2–12.1 µs per accepted point with k = 50 candidates all evaluated (native trigonometry; a `dmath` port would be
slower). References: MFCG fills an area by tiling one 140-point pattern built once per page load and testing ≈ 200
points per filled area (0.13–1.37 M tests per city), and builds a library of 20 crowns once per session, picking one per
tree (`profile-mfcg.md` §6.1, ST-2); NG's crowns and per-tree canvases (`profile-neighbourhood.md` §3.9; 528 uploads,
`visual-spec.md` §6 item 20).

**Required change.**
* Make the **tile-stamp path normative** for every scatter class: a few precomputed blue-noise tiles per class (a warped
  one for woods), built once per session, stamped with a per-entity offset and rotation from the entity's stream and
  clipped by point-in-polygon; jittered grids for orchards and avenues.
* Build a **crown library** per style (≈ 20 per class, MFCG's number) once per session: sprites for Canvas2D
  (`drawImage`), instances for WebGL2.
* Generate instances **per tile in the tile worker** and cache them by entity for the session, with positions that do
  not depend on the LOD band (LC-20); the band selects only the crown symbol and a deterministic thinning. Still never
  written to the document.
* Restate O19 (e) with what the 16 ms covers, a placement budget (≤ 1 µs per tree) and a draw budget.

**Status.** CONFIRMED for the per-point cost of the specified sampler and for the reference mechanisms; the frame
arithmetic is CONFIRMED arithmetic; that §4.9 means per-entity sampling rather than tile stamping is the text's own
ambiguity, which the required change resolves.

### SCL-9 · major · Edits cost what the city costs, not what the scope costs

**Failure scenario.** At CITY the user regenerates one district. §7.3 re-derives the district's faces and then "re-run[s]
only the label and display stages globally": S13 (10 ms) and S14 (20 ms) at §12's own CITY rates already equal the
whole "per-district regeneration ≤ 30 ms" before any local stage runs, and at METROPOLIS they alone take ≈ 75 ms; SCL-1
and SCL-2 add their per-edit costs on top. A document with 300 edits is opened: §2.9 re-verifies the snapshot "against
a re-derivation … immediately for ≤ CITY", i.e. regenerate the recipe and replay the log — 300 × ≥ 30 ms of global
stages ≈ 9 s; the same replay serves every undo beyond the snapshot ring (§7.4) and every version upgrade (§7.5). The
user then warps a street with Displace: MFCG's warp mode is a live, staged preview with Apply and Discard
(`mfcg-posts-a.md` §T4), but every PLAT `warp` is an edit event that goes through the dry run, the invariant suite and
re-derivation of the finer levels under the touched faces, so a drag cannot reach an interactive frame rate.

**Evidence.** ARCH §7.3, §12 (per-district regeneration ≤ 30 ms; single plot edit ≤ 5 ms; edit-to-redraw < 100 ms; S13
10 ms; S14 20 ms), §2.9, §7.1 (warp event; dry-run validation), §7.4, §7.5, §3.4 (`warp`). `mfcg-posts-a.md` §T4 ("warping
is a staged, committable edit (a preview transform that is applied or thrown away)"). LC-17 is the determinism side of
the same global re-run.

**Required change.**
* **Incremental S13 and S14.** A regeneration marks a dirty region; S14 re-emits only the marks of changed entities
  and groups and invalidates the tiles the region intersects; S13 re-places only labels whose candidates intersect the
  region, plus a priority cascade that stops when no displaced label moves.
* **Replay mode.** Apply the whole log to the model and run S13 and S14 once at the end; bound replay by SCL-5's
  checkpoints.
* **Warp preview.** Vertex moves on L1 with redraw of the affected tiles at ≥ 30 fps; invariants and re-derivation run
  on Apply only (MFCG's staging).
* State §12's edit budgets as functions of scope size and test that the same scope costs the same from TOWN to
  METROPOLIS (SCL-19).

**Status.** CONFIRMED as text (quoted); the costs are arithmetic on §12's own stage rates.

### SCL-10 · major · Label placement is priced for district spines but specified for every label at every LOD

**Failure scenario.** S13 is budgeted at 10 ms at CITY, "spines cached per district". §9 specifies more: area labels for
districts, water bodies and woods on hole-aware skeleton spines; path labels for streets, rivers and walls "repeated per
segment above a length threshold"; addresses "as monotone numbering along each way" — one per building, 12 000–15 000 at
METROPOLIS; point labels with candidate offsets and leaders; each placed and checked in "a screen-space `rbush` per
LOD" with protected obstacles and alternates, under the invariant "0 collisions at every LOD". Because S13 is a model
stage with no viewport, all of this runs for the full map at every band, at generation and again after every
regeneration (§7.3). Screen-space collisions also depend on the zoom inside a band (text keeps its pixel size while the
geometry scales), so a placement computed at one representative scale collides at another scale in the same band —
unless placement reruns per zoom change, on the main thread or the tile worker, which is budgeted nowhere. GEO-29's
option (b) (labels as a derived view product) makes that per-zoom runtime cost explicit.

**Evidence.** ARCH §9, §12 (S13 10 ms), §7.3, §8.5 (continuous zoom with hysteresis), §2.7 (`Label`); GEO-29; LC-17.
References: MFCG sets ≈ 60–190 letters per city along ≈ 15 skeleton ridges (≈ 140–200 skeleton `intersect` events per
district) and still spends 40–73 ms per frame on label text (`profile-mfcg.md` §6.2, §7.2, §8); no reference places street
names or addresses at all. PLAUSIBLE arithmetic at METROPOLIS: ≈ 15 k address candidates + a few thousand street-label
instances, each laid out glyph by glyph and tested against the index with alternates, is a few µs per candidate —
tenths of a second per full pass, against the ≈ 25 ms that S13's CITY rate implies at METROPOLIS.

**Required change.** Split S13:
* **Model side, zoom-independent and cached:** spines, anchors, alternates, priorities and text widths from bundled
  font metrics (GEO-29 (a)).
* **View side:** greedy selection by priority in a viewport-culled grid index, per zoom stop within a band, in the tile
  worker, with a budget (≤ 2 ms per zoom stop for ≤ 2 000 visible candidates).
* Place addresses and street names only for visible tiles at their LOD; check "0 collisions" at declared zoom stops;
  state S13's model budget at METROPOLIS.

**Status.** CONFIRMED as text; the cost at METROPOLIS is PLAUSIBLE arithmetic (not measured).

### SCL-11 · major · The document persists derivable rasters and five copies of shared boundaries

**Failure scenario.** A user saves a CITY. The `.plat` snapshot (§2.9) holds `fields: { prosperity: Raster; density:
Raster }`: two smooth Float32 rasters at terrain resolution, which gzip poorly — 2.7 MB at the 625² frame raster and
7.0 MB over the 8 km plat including its margin — against a CITY document budget of ≤ 3 MB. The five levels are separate
DCELs (§2.2), so every kerb, plot line and footprint edge that a finer level inherits is stored again at each level.
The report carries `streamKeysUsed: string[]`, ≈ 10⁵ strings (0.5 MB gzipped). With the entity table (≈ 1.25 MB gzipped
for 22 250 schema-shaped records) and the geometry blocks (≈ 2–3 MB, PLAUSIBLE), the CITY document is ≈ 6.5–7.5 MB,
2–2.5× its budget; at METROPOLIS the two rasters alone are 11.4 MB against ≤ 8 MB. FTG stores a whole city — 2 798
buildings, 4 303 road nodes, 4 125 trees and its population — in 593 KB, and §2.9 names that economy as the bar.

**Evidence.** ARCH §2.9, §5.4, §2.2, §12 (document gz ≤ 0.6 / 3 / 8 MB); `ftg-payload-visual.md` §1 and its summary line
(593 KB); FTG-21 (the bar quoted but not budgeted). Executed, `bench_siting_doc` (§7.5): one smooth Float32 field gzips to 1.36 MB at 625², 3.49 MB at 1 000²,
5.72 MB at 1 280²; the entity JSON 15.5 MB raw → 1.25 MB gzip-9; 10⁵ keys 4.8 MB raw → 0.50 MB.

**Required change.**
* Do not persist derivable fields: persist the brush strokes and recompute the fields on load with SCL-3's O(N) blur, or
  store a quantised coarse cache (Uint8 at 32 m ≈ 40 KB at CITY).
* Persist geometry once: a shared vertex store with level-tagged edges and per-level face records (the structure GEO-1
  proposes for nesting), or L3/L4 only with L0–L2 re-derived from the recipe on load.
* Record stream keys only for attempts > 0 and ladder uses.
* Add a document-size test per rung against §12 and against FTG's bytes per building.

**Status.** CONFIRMED for the raster, key and entity sizes (measured on synthetic, schema-shaped data); the geometry
size is PLAUSIBLE.

### SCL-12 · major · String-path stream keys cost a third of the CITY budget, and the encoding is frozen after M1

**Failure scenario.** Every stream is created on demand from `path = "<stage>/<entity id>/<concern>[/attempt][/epoch]"`
by encoding the path as UTF-8 and running two 32-bit-lane mixers into a 128-bit key (§6.1). A CITY uses ≈ 10⁵ keys (§6.1's
own count). Measured: 0.73 µs per key including string building, UTF-8 encoding and four murmur-style lanes — 73 ms at
CITY, ≈ 30 % of the 240 ms p50, and ≈ 195 ms for ≈ 2.5 × 10⁵ keys at METROPOLIS; render-time streams (`style/*`,
`render.trees`, keyed by entity and LOD band) add more on every tile. None of it is in §12. Changing the encoding later to
save that time changes every key, and therefore every seed's town; D-15 rates the reversal cost "high after M1 (every
draw site)".

**Evidence.** ARCH §6.1, D-15, J-5, §12. Executed, `bench_state` (§7.3).

**Required change.** Derive keys from structured components, not strings: stage id (u16), the entity's canonical-id hash
(computed once when the id is minted and cached in the arena), the concern id from the concern registry (u16), attempt
and epoch, fed to the 32-bit-lane mixer; keep the textual path for reports only; budget ≤ 0.1 µs per key; keep the CI
distinctness test. Decide it in the M0 determinism spike, before any golden is signed.

**Status.** CONFIRMED (measured; the encoding-freeze consequence is D-15's own statement).

### SCL-13 · major · The stage-3 hook has no cost contract, and laziness cannot apply at the city view

**Failure scenario.** Stage 3 replaces `OutlineBuildingGenerator` with an FM-class generator. The owner's ruling puts
the composed footprint shapes "at every zoom, including the city view", and O17 (i) requires the same footprint hash at
every LOD; so the composition cannot stay "lazily generated" — every building must be composed before the first city
frame. Fantasy Manor's measured model step is 0.6–1.7 ms per building (its view and shadow cost more); at METROPOLIS's
12 000–15 000 buildings that is ≈ 7–25 s, at CITY ≈ 3–10 s. The interface as written (`compose(…, lod)` returning a whole
`Composition`) gives a later implementer no way to produce the city-view outline without the full composition.

**Evidence.** ARCH §2.6 (`composition?: Composition /* stage 3: lazily generated, stored only when edited */`;
`BuildingGenerator.compose`), §8.6, §15.2 O17 (i), §12; the owner's STAGE 3 ruling (brief). `captures/manor/README.md`
cost table (`Manor.new` 1.7 / 0.8 / 0.6 ms, gens 0–2).

**Required change.** Split the interface: `outline(input) → footprint rings + heights`, cheap and deterministic (≤ 20 µs
per building), used at every LOD, in the shadow pass and in exports; and `compose(input, lod)` for wings, roofs and
rooms, computed lazily per visible tile. Require by contract test that the outline equals the union of the composed
wings, so O17 (i) holds. Put a per-building budget and a METROPOLIS total in the hook's documentation; the stage-3 intake
measures FM-class composition time per building class.

**Status.** CONFIRMED (text and FM timings quoted; the totals are arithmetic).

### SCL-14 · major · The layered SVG export has no LOD rule and no size budget

**Failure scenario.** A user exports a METROPOLIS to SVG for Inkscape. §11 writes "entity ids on elements; text as text …
or outlined; hatching as paths; instances as `<use>`", from the display list, at an LOD it does not state. At city band
that is ≈ 15 k footprints × 2 marks (MFCG draws a dark footprint and a body per building), ≈ 30 k yard parts, the ways
with casings, and per-glyph curved labels; at district band add up to ≈ 200 k tree instances (§12's pan target) and the
yard detail. At ≈ 70–150 bytes per element this is ≈ 20–35 MB and 100–300 k elements, against MFCG's 6.3 MB and ≈ 35 k
paths for 15 392 buildings; O11 (h) "opens in Inkscape / Illustrator with layers intact" is not credible at that size,
and O12 (c)'s "screen = PNG = SVG within threshold" requires the heavy version.

**Evidence.** ARCH §11 (SVG row), §8.7, §15.2 O11 (h), O12 (c), §12. `captures/mfcg/exports-2026-09-25/README.md` (size 80:
15 392 buildings; SVG 6 297 685 bytes; 15 367 roof paths and 19 526 dark footprints; size 40: 0.42–0.66 MB for 837–1 512
buildings). Our byte count is PLAUSIBLE arithmetic.

**Required change.** State the export LOD (city band by default; district band on request, with a size warning). Emit
compound paths per (semantic, district) with an id side table — a data attribute per group and a JSON map from subpath
ranges to entity ids — instead of one element per entity; trees as one compound path per green entity or per tile;
per-glyph text only for curved labels. Add an export size and element-count test at METROPOLIS (for example ≤ 1.5× MFCG's
bytes per building and ≤ 60 000 elements) and an open-time check in Inkscape to O11 (h).

**Status.** CONFIRMED for MFCG's bar and the design text; PLAUSIBLE for our projected size.

### Minor findings (SCL-15 – SCL-22)

**SCL-15 · minor · "Reference hardware" is never defined.** *Scenario:* CI runs the cost-model tests on a cloud runner
and M1's exit asks for "model within §12 budgets"; nobody can say whether a 340 ms CITY on that runner passes.
*Evidence:* ARCH §1.2, §5.2 (F-BUDGET-TIME "on reference hardware"), §12, §16; IMPROVEMENTS O3 (d), O12 (b), O16 (e); the
reference bars were recorded on one machine (`meta.json`: `darwin`, 8 CPUs, `Apple M1`, headless Chrome). *Required
change:* define reference hardware as that machine class (Apple M1, 8 cores, Chrome stable, one generation worker) and
name a low-end device for O12 (b)'s ≥ 30 fps clause; normalise CI timings with a calibration benchmark; state per budget
whether it is measured in Chrome or in Node.

**SCL-16 · minor · Proxy thumbnails lost their "at town size".** *Scenario:* the user drags the size control to
METROPOLIS; §7.8 promises six S0–S4 proxies "within 1 s for all six"; S1 alone measures 267 ms at METROPOLIS (800²) and
126 ms at CITY, so six proxies take ≈ 0.8–1.6 s before S4. *Evidence:* ARCH §7.8; IMPROVEMENTS O16 (e) ("in < 1 s at town
size"); §7.1 of this file. *Required change:* restore "at TOWN size", or make S1 two-phase — SCL-3's ≥ 32 m coarse field is the
model's own first phase (≈ 1/16 of S1's cells) — so a proxy is exactly the town's first phase and continuing it cannot
diverge (LC-30); state a proxy budget per rung.

**SCL-17 · minor · First-map targets disagree, and METROPOLIS's depends on an optional backend without text.**
*Evidence:* ARCH §1.2 ("in under a second"), §15.2 O12 (g) ("< 1 s"), §12 ("≤ 2 s METROPOLIS"; first frame "≤ 1 s
(progressive; WebGL2 tier)"), §1.7 (WebGL2 "optional"), Deferrals ("WebGL2 SDF text"). *Required change:* one first-map
target per rung for the default Canvas2D backend; if METROPOLIS needs WebGL2, make it a declared requirement with a text
path (not deferred) and keep a Canvas2D fallback target.

**SCL-18 · minor · The test plan has no compute budget.** *Evidence and arithmetic:* B-CITY 1 000 seeds × 4 water settings ×
3 rungs = 12 000 generations with the suite after every batch (§13.2) ≈ 1.6 CPU-h before the suite's own cost (≈ 0.47 s
average per generation at the §12 budgets); B-EDIT
10⁵ sequences (§16 M3), each checked against a from-scratch regeneration (§7.3), ≈ 8 CPU-h at ≈ 0.3 s each; B-FUZZ 10⁶
inputs per primitive (§13.1) × ≈ 20 primitives at 50 µs–1 ms ≈ 0.3–5.5 CPU-h; nightly goldens on five engines with a
PNG per LOD and preset (§13.3). ≈ 10–20 CPU-h per full run cannot gate a change; the owner's efficiency standard asks
for long CI jobs to be shortened structurally. *Required change:* tiers with stated wall-clock budgets — a PR tier of
minutes (for example 50 seeds per rung, 10⁴ fuzz cases per primitive, 10³ edit sequences) and a nightly full tier; the
oracle sampled per sequence.

**SCL-19 · minor · Cost-model tests cannot see the super-linear mechanisms that matter.** *Evidence:* §13.2 fits "each
stage's time against its entity count across the rungs" — three points — and times generation only; the defects in
SCL-1, SCL-2 and SCL-9 grow with batches × level size or with city size per edit. *Required change:* sweep ≥ 6 sizes per
stage and fail on a log-log slope above ≈ 1.15; add per-edit cost-versus-model-size tests (a fixed scope must cost the
same across rungs).

**SCL-20 · minor · Evolution state has no compaction rule.** *Scenario:* a town evolved over 20 epochs keeps, inside every
entity, its full `Lifecycle.history`; JOINed plots keep their members; superseded entities keep `supersedes` links;
epoch records append — the working set, the indexes and the document grow with churn, unbounded. *Evidence:* ARCH §2.1,
§2.8, §2.9 (`epochs: EpochRecord[]`), §4.11; the owner's EVOLUTION ruling (hooks now). *Required change:* keep lifecycle
history in an append-only event block keyed by id, outside the entity records; move demolished and superseded entities
to an archive block excluded from the working set and the indexes; state a per-epoch growth budget and test a 20-epoch
town's heap and document size.

**SCL-21 · minor · The per-generation statistics record is unbudgeted and partly uncomputable in the model.**
*Evidence:* §13.2 ("The statistics record emitted per generation … feeds every acceptance criterion"), §15.2 O6 (d) ("100 %
of generations emit a statistics record"); its metrics include the detour index (O4 b, shortest paths between many
pairs), Moran's I (O18 b), KS distances and tree nearest-neighbour and pair-correlation statistics (O19 d) over trees that
exist only at render (§4.9); §12 has no stage for it. *Required change:* an O(n) core record per generation (counts,
sums, histograms) with a budget; the expensive metrics on demand or in the bench only; tree statistics computed in the
bench from the tile-stamped scatter (SCL-8).

**SCL-22 · minor · The pure-JS boolean fallback is budgeted nowhere.** *Evidence:* ARCH §1.7, §3.1 (Clipper2 via
WebAssembly, `polygon-clipping` fallback, "one chosen by the M0 benchmark"), D-14, §12 (S9 "Clipper2 union per
district"); a host page whose content-security policy forbids WebAssembly compilation gets the fallback (a platform
rule, PLAUSIBLE); GEO-9 covers the numeric divergence between the engines. *Required change:* the M0 benchmark times both
engines on S9 and S11 workloads; §12 gains a fallback budget or the embed contract requires WebAssembly; the generation
report records which engine ran.

## §4 What the design already gets right under this lens (keep it through the revision)

1. **A struct-of-arrays, allocation-free kernel** (§3.1, G-R7). It answers NG's measured hot spot — `Point.new`
   385–561 k and `intersectLines` 147–213 k calls per generation (`profile-neighbourhood.md` §5.3) — and it makes the
   geometry cheap to move: five CITY plats copy across a worker boundary in 9 ms (§7.3). Keep it; SCL-6 asks only that
   the entity table and the display list follow the same discipline.
2. **Batching as the unit of commit, with a dynamic index inside a batch** (§3.3, J-7). The structure is right; only the
   rebuild rule and the finest batch scopes are wrong (SCL-2).
3. **One generation worker with incremental delivery; the merge protocol written before any pool** (§4.1, J-12). The
   shippable concurrency model. Keep it, and specify the boundary (SCL-6).
4. **Cost-model tests that fail on super-linear growth** (§13.2) — a genuine graft from the pipeline proposal. Widen the
   sweep and add edit-cost tests (SCL-19); do not drop them.
5. **The fusion gate measured first, with a written fallback** (§4.4, §16 M0 c). The right shape for risk retirement;
   extend it to site and fields (SCL-3).
6. **Cache per group, not per primitive** (§8.3, §8.5) — MFCG's 46 000 fills in 590 uploads (`visual-spec.md` §1.1). Keep
   the principle; change the tile geometry (SCL-7).
7. **Lazy people derived from (seed, household id)** (§10.3): a 50 000-person metropolis stores kilobytes of people.
   FTG ships its whole population in its payload; this is a real improvement at no one-click cost.
8. **Shadows off by default and computed as vector offsets from stored heights** (§8.4). Fantasy Manor spends ≈ 90 % of
   a regeneration on a bitmap drop shadow (`captures/manor/README.md`); NG's flat-colour prism quads (≈ 2.33 per wing,
   one alpha composite per layer, `profile-neighbourhood.md` §3.7) are the cheap mechanism the design points at.
9. **Integer centimetres, typed arrays, delta + zig-zag varint geometry blocks** (§2.9) — FTG's economy. Keep the
   encoding; persist each boundary once (SCL-11).
10. **Client-side generation with no server round trip** (§1.7): FTG's 3–7 s server time plus 4.6 s of client scene
    building is beaten by construction.
11. **A per-stage budget table that admits its own thin headroom** (§12). Keep the table; re-derive its numbers from named
    mechanisms and by building count (SCL-3; MFP-5 for the per-building comparison).
12. **Heights on every building and a shadow-layer hook that costs nothing until shadows are on** (§2.6, §8.4).

## §5 How the findings cluster for the reviser, and overlaps with other lenses

| cluster | findings | one repair that covers it |
|---|---|---|
| A. Work per batch or per edit that scales with the whole model | SCL-1, SCL-2, SCL-9 (tested by SCL-19) | one **dirty-region** concept shared by the kernel and the pipeline: batch-local invariants on the dirty faces, Merkle digests updated on the dirty path, static indexes rebuilt per stage (dynamic inside), S13/S14 re-derived for the dirty region only, replay that runs S13/S14 once |
| B. Budgets that do not match the named mechanisms or the reference bars | SCL-3, SCL-4, SCL-12, SCL-15, SCL-16, SCL-17, SCL-21 | re-derive §12 from named mechanisms (§7's measurements as the floor), by building count against MFCG's fitted line (MFP-5), for the one-click complete city view, on a defined reference machine; a site-and-fields spike in M0 |
| C. Memory and persistence | SCL-5, SCL-11, SCL-20 | scoped undo records and checkpoints; a compact entity store; geometry persisted once; no derivable rasters in the document; an archive block for history |
| D. Worker, rendering and export at scale | SCL-6, SCL-7, SCL-8, SCL-10, SCL-14, SCL-22 | a handle-based API with a columnar, transferable display list; a screen-space tile pyramid with a canvas budget; tile-stamped scatter and a crown library; view-side label selection; compound-path SVG with an id side table |
| E. Hooks that must carry a cost contract now | SCL-13 (stage 3), SCL-20 (evolution) | `outline()` / `compose()` split with a per-building budget; compaction rule for histories |
| F. Test infrastructure | SCL-18, SCL-19 | tiered CI with wall-clock budgets; size sweeps and edit-cost tests |

**Order.** SCL-1, SCL-2 and SCL-12 must be settled before M0's kernel and determinism spikes, because they fix the commit
protocol, the hash that goldens compare, and the key encoding that every seed's output depends on. SCL-3 and SCL-4
before M1's "model within §12 budgets" exit. SCL-5, SCL-6, SCL-9, SCL-11 and SCL-14 before M3 (document, editing,
exports); SCL-7, SCL-8 and SCL-10 before M2 (renderer, `lit`, METROPOLIS). SCL-13 is a hook note to add now.

**Overlaps with other lenses (cited, not duplicated).**
* **GEO-2** (blocker; F-BUDGET-TIME's watchdog makes output depend on the clock). SCL-3's re-budgeting must be met by
  deterministic work budgets; F-BUDGET-TIME cannot be the tool that rescues a missed budget.
* **GEO-1** (blocker; cross-level nesting). Its shared-vertex-store alternative also removes SCL-11's repeated storage of
  shared boundaries and part of SCL-5's plat memory; SCL-2's per-district index partitions work with either structure.
* **GEO-25** (rear lanes write L1 from an L3 batch) adds L1 and L2 commits per block to SCL-2's count.
* **GEO-28** attacks the same per-district tiles for draw-order seams; its alternative (a screen-space tile grid) is
  SCL-7's repair.
* **GEO-29** (labels depend on the host's text engine): its option (a), font metrics from bundled fonts, is SCL-10's
  model side; its option (b), labels as a derived view product, is exactly the runtime cost SCL-10 budgets.
* **GEO-9** (two boolean engines, different numerics): SCL-22 is the cost side of the same fallback.
* **GEO-12** (B-FUZZ inputs) and **GEO-39** (cyclic skeletons for area labels): SCL-18 prices B-FUZZ; SCL-10 covers the
  label-stage cost.
* **MFCG-parity lens** (landed 16:56 while this seat was writing). **MFP-5** is the speed-parity finding — CITY
  compared with MFCG size-80 (13 349–36 480 buildings), 4–7× slower per building. This seat reached the same result
  independently from MFCG's fitted line (19.5 ms + 7.5 µs per building; `profile-mfcg.md` EG-3) and withdrew its own
  duplicate, so the SCL numbering has no speed-parity row. **MFP-1** (the city-zoom look once the plot model is on; its
  note "undefined first paint") meets SCL-4 at the definition of the first paint.
* **Determinism and lifecycle lens** (landed 17:02). **LC-2** (blocker) — and **FTG-1** (blocker, FTG lens) — show that
  lazy per-district S10–S14 breaks the global siting fill; SCL-4 shows that the default view defeats that laziness
  anyway. Together: S10–S13 belong to the first paint, and laziness is kept only for detail below the city band.
  **LC-17** (labels re-run globally after a regeneration move labels outside the scope) is the determinism side of
  SCL-9 and SCL-10's cost. **LC-20** (decoration keyed by LOD band differs between LODs) constrains SCL-8's repair:
  tree positions must not depend on the LOD band. **LC-25** (generator and table versions stored on every entity) is
  the hash side of SCL-5's entity compaction. **LC-13** and **LC-14** (replay and migration mapping) sit on the replay
  path SCL-9 prices. **LC-30** (a chosen proxy continues the seed's pipeline from S5) constrains SCL-16's repair.
  In the other direction, SCL-1 and SCL-12 change what the determinism guarantee hashes and keys, and SCL-5, SCL-9
  and SCL-20 (undo, replay, epochs) are lifecycle paths that lens should re-check after the revision.
* **FTG-parity lens.** **FTG-21** (the 593 KB bar is quoted, not budgeted: ≤ 3 MB allows ≈ 500–670 B per building) is
  the budget side of SCL-11, which shows the document exceeds even that allowance.
* **Deferrals.** No finding here re-raises a documented deferral as a bug. SCL-4 cites the deferred per-district workers
  and SCL-17 the deferred WebGL2 SDF text only because a stated METROPOLIS budget depends on them — the dependence is the
  defect, not the deferral.

## §6 CONFIRMED versus PLAUSIBLE

**CONFIRMED:** every quotation of the architecture (each failing mechanism is what the text says); every reference
figure as read in the cited findings or capture READMEs (MFCG's building counts at size 80, its 19.5 ms + 7.5 µs per
building fit, its canvas sizes and 170–230 ms replay, its 6.3 MB SVG, its tile-stamped trees and 20-crown library; NG's
crown sizes and per-wing draw costs; Fantasy Manor's 0.6–1.7 ms model and bitmap-shadow share; FTG's 593 KB payload and
3–7 s server time; the capture machine's identity); every benchmark number in §7 as an executed measurement of our own
straightforward implementation on that machine; the stage sums, batch counts and totals as arithmetic on those
measurements and on §12's own counts. **PLAUSIBLE:** how much faster a tuned implementation of each mechanism would be;
the synthetic, schema-shaped entity table as a proxy for the real one; per-canvas limits and content-security rules of
particular browsers; the METROPOLIS label cost, the SVG and geometry-block sizes, and the CI hours. Neither blocker rests
on a PLAUSIBLE number: SCL-1 and SCL-2 are O(batches × model) by the text itself, and the measurements only size it.

## §7 Appendix — the executions behind the CONFIRMED numbers

All scripts are this seat's own code (textbook algorithms), run with Node 24.12.0 on the Apple M1 (8 cores, 16 GB) that
recorded the reference captures, one thread, after a JIT warm-up. They lived in the session scratchpad
(`/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/3fbc58a0-613c-43b5-9c94-a4f47a8689a6/scratchpad/`); each method is
described below so any seat can re-derive the numbers. Outputs are verbatim.

### 7.1 `bench_terrain` — S1 raster work, S5 cost-distance field, S6 smoothing

Method: 2-D simplex noise (Gustavson-style, seeded permutation), 5-octave fBm per cell; priority-flood sink filling with
a binary heap (Float64 keys) seeded from the border, 8-neighbour; D8 steepest-descent direction; flow accumulation in
reverse flood order; marching-squares case classification for 11 levels; single-source Dijkstra from the centre over the
8-neighbour raster with cost = run × (1 + 20 · slope²); separable Gaussian with radius 3σ, σ = 60 m ÷ cell size; three
running-sum box passes per axis for the same σ.

```
case | cells | fBm5 ms (ns/eval) | priority-flood ms | D8 ms | accum ms | marching x10 levels ms | S1 subtotal ms | raster Dijkstra ms | Gaussian sigma=60 m ms | 3-box ms
TOWN frame 2 km @5 m | 160000 | 22.2 (27.7) | 17.4 | 5.6 | 0.8 | 6.8 | 52.8 | 31.3 | 41.6 (r=36) | 2.7
CITY frame 5 km @8 m (the budgeted 625^2) | 390625 | 53.5 (27.4) | 44.3 | 13.1 | 2.0 | 12.5 | 125.5 | 69.7 | 67.0 (r=23) | 6.4
CITY frame+30% margin 8 km @8 m | 1000000 | 137.0 (27.4) | 125.2 | 33.5 | 5.8 | 31.8 | 333.1 | 184.4 | 176.0 (r=23) | 24.2
METRO frame 8 km @10 m | 640000 | 87.7 (27.4) | 79.3 | 23.5 | 4.5 | 72.3 | 267.3 | 114.5 | 88.6 (r=18) | 10.5
METRO frame+margin 12.8 km @10 m | 1638400 | 224.0 (27.3) | 195.0 | 54.1 | 10.2 | 52.0 | 535.3 | 298.2 | 229.2 (r=18) | 33.3
CITY built extent refined 2.5 km @2.5 m | 1000000 | 138.7 (27.7) | 117.0 | 35.0 | 6.9 | 31.7 | 329.3 | 251.0 | 504.3 (r=72) | 22.0
```

### 7.2 `bench_poisson_astar` — Poisson-disc (k = 50, all candidates evaluated) and S4's A*

Method: Bridson sampling on a background grid of cell r/√2; every step draws and tests all 50 annulus candidates and
accepts the first valid one (the references' measured ratio validate/step = 50); A* on a jittered triangular lattice at
25 m spacing (6 neighbours; edge cost = length × (1 + 40 · slope²) on a synthetic relief), 12 queries from the centre to
points on the frame edge; lattice construction excluded from the A* time.

```
== Poisson-disc, k = 50 all evaluated ==
use | domain | r (m) | points | steps | candidate tests | ms | µs per point
S4 lattice CITY (5 km frame, 25 m) | 5000x5000 m | 25 | 25667 | 51333 | 2566650 | 310.1 | 12.08
S4 lattice METRO (8 km frame, 25 m) | 8000x8000 m | 25 | 65632 | 131263 | 6563150 | 783.7 | 11.94
one wood 300x300 m, 4 m trees | 300x300 m | 4 | 3637 | 7273 | 363650 | 41.5 | 11.42
wood 600x600 m (36 ha), 4 m | 600x600 m | 4 | 14477 | 28953 | 1447650 | 169.7 | 11.72
garden block 120x120 m, 5 m | 120x120 m | 5 | 395 | 789 | 39450 | 4.4 | 11.15
== S4 A* on a 25 m jittered triangular lattice (6-neighbour), slope cost ==
CITY 5 km: 46000 nodes (graph build 16.4 ms, excluded) | 12 plaza->frame-edge queries | 16.6 ms | expanded 35364 nodes (2947 per query)
METRO 8 km: 118080 nodes (graph build 27.3 ms, excluded) | 12 plaza->frame-edge queries | 30.4 ms | expanded 88869 nodes (7406 per query)
```

### 7.3 `bench_state` — canonical model hash, structured-clone costs, entity memory, stream keys

Method: a synthetic model shaped by the §2 interfaces at §12's counts (CITY: 5 500 plots with context vector, site plan,
yard parts, lifecycle and provenance; 6 000 buildings; 1 750 blocks; 3 000 ways; 5 000 households; 1 000 greens; 25
districts; five plats of 60 k vertices, 180 k half-edges and 20 k faces as the §2.2 typed arrays; METROPOLIS × 2.5);
canonical serialisation with sorted keys, JSON numbers (shortest round-trip) and typed arrays as number lists, then
FNV-1a; `structuredClone` and Node's v8 serialise / deserialise (the structured-clone algorithm) for the entity table,
the plats and `Mark[]` display lists; heap per entity-table copy by `--expose-gc` (the CITY heap line is GC noise and is
not used); 10⁵ (2.5 × 10⁵) stream paths → UTF-8 → four 32-bit murmur-style lanes.

```
rung=CITY entities=22250 plat vertices/level=60000 (build 190 ms)
canonical model hash: serialise entities 237 ms + plats 808 ms + hash 118 ms = 1163 ms; canonical text 65.0 MB
structuredClone(entities) 186 ms (sender serialise 60 ms + receiver deserialise 162 ms; 19.4 MB); structuredClone(plats, copied) 9 ms
display list 60000 Mark objects: build 6 ms; postMessage-equivalent sender 46 ms + main-thread receive 140 ms (17.7 MB)
display list 125000 Mark objects: build 15 ms; postMessage-equivalent sender 111 ms + main-thread receive 208 ms (36.9 MB)
heap per entity-table copy ≈ -90 MB; plat typed arrays per copy ≈ 29 MB
stream keys: 100000 paths -> 128-bit keys in 73 ms (1)

rung=METRO entities=55625 plat vertices/level=150000 (build 487 ms)
canonical model hash: serialise entities 582 ms + plats 1812 ms + hash 318 ms = 2712 ms; canonical text 167.4 MB
structuredClone(entities) 445 ms (sender serialise 159 ms + receiver deserialise 268 ms; 48.7 MB); structuredClone(plats, copied) 78 ms
display list 150000 Mark objects: build 168 ms; postMessage-equivalent sender 144 ms + main-thread receive 302 ms (44.3 MB)
display list 312500 Mark objects: build 50 ms; postMessage-equivalent sender 319 ms + main-thread receive 895 ms (92.5 MB)
heap per entity-table copy ≈ 117 MB; plat typed arrays per copy ≈ 73 MB
stream keys: 250000 paths -> 128-bit keys in 195 ms (0)
```

### 7.4 `bench_index` — static packed spatial index rebuilt per batch commit

Method: a packed Hilbert R-tree built the flatbush way (16-bit Hilbert key of each box centre, quicksort on the keys,
levels of 16 packed bottom-up), median of 15 builds per size; stage totals sum one rebuild per batch while the level
grows linearly to its final size (CITY S10: 1 750 blocks → 8 000 L3 faces; S11: 5 500 plots → 17 000 L4 faces;
METROPOLIS × 2.5); one plot edit = one L3 and one L4 rebuild at full size.

```
items | build ms (median of 15)
1000 | 0.243
2000 | 0.521
4000 | 1.103
8000 | 2.270
17000 | 4.938
20000 | 5.835
42000 | 12.523
60000 | 17.964
--- stage totals (level grows linearly to its final size over the stage) ---
CITY S10: one L3 commit per block (~1 750 blocks; L3 -> ~8 000 faces: plots+residue): 1.94 s
CITY S11: one L4 commit per plot (5 500 plots; L4 -> ~17 000 faces: footprints+yard parts): 13.37 s
METRO S10: ~4 400 blocks; L3 -> ~20 000: 12.65 s
METRO S11: 13 750 plots; L4 -> ~42 000: 84.93 s
--- one edit (full level already built) ---
CITY single plot edit: 1 L3 + 1 L4 rebuild: 7.33 ms
METRO single plot edit: 1 L3 + 1 L4 rebuild: 18.76 ms
```

### 7.5 `bench_siting_doc` — S10b siting as stated, and document sizes

Method: 80 venue classes × 5 500 plots × 10 context features, a linear score per class, a full sort per class and greedy
filling with capacity; three rounds. Document: JSON of 22 250 schema-shaped plot records (context vector, lifecycle,
provenance) and of 10⁵ stream keys, gzip level 9; smooth Float32 fields (two low-frequency sinusoids plus 1 % noise) at
three raster sizes, gzip level 9.

```
S10b naive: 80 classes x 5500 plots, full sort per class: 97.8 ms per round; x3 rounds = 293.5 ms (budget 8 ms)
entity JSON (22 250 schema-shaped records): 15.5 MB raw, 1.25 MB gzip-9
CITY frame 625^2 @8 m: one Float32 field 1.6 MB raw, 1.36 MB gzip-9; prosperity+density = 2.73 MB
CITY frame+margin 1000^2 @8 m: one Float32 field 4.0 MB raw, 3.49 MB gzip-9; prosperity+density = 6.98 MB
METRO frame+margin 1280^2 @10 m: one Float32 field 6.6 MB raw, 5.72 MB gzip-9; prosperity+density = 11.44 MB
report.streamKeysUsed 1e5 keys: 4.8 MB raw, 0.50 MB gzip-9
```
