## §9 Labels and map furniture

*In plain words.* District names curve along the middle of their district, as MFCG's do, but never cross a river inside
it and never cover a gate, a bridge or the keep; where a district is too small for its name at city zoom, it is labelled
with its neighbours as a named quarter. Street names appear as you zoom in. Labels never collide, at any zoom. Every
browser and the headless tool place labels identically, because the width of every letter comes from the font files we
ship, not from the browser. The names are part of the town and never change when something elsewhere is re-rolled;
where a label sits is worked out for the view you are looking at. A scale bar, compass, grid, title, legend, emblem and
ruler are drawn on top; each can be moved, restyled or switched off.

### 9.1 What is model and what is view

* **Model** (S13a; in the model hash; persisted): every entity's name and short form; a `LabelEntity` per labelled thing
  with its candidates; the quarter merge tree (§9.4):

  ```ts
  interface LabelEntity { id: Id; target: Id; kind: 'district'|'quarter'|'way'|'landmark'|'water'|'wood'|'gate'|'title'|'annotation'|'address';
    text: NameRef; shortText?: NameRef; priority: number; lod: LodBand[];
    candidates: { spines: Polyline[] /* area and path labels, world cm, in order of preference */;
                  anchors: { p: Point; dirCdeg?: number }[] /* point labels */; breakAt?: number[] /* allowed two-line breaks */ };
    pinned?: PinnedPlacement /* a user placement: model data */; hidden?: boolean }
  interface QuarterNode { id: Id; members: Id[] /* districts */; children: [Id, Id] | null; name: NameRef; spine: Polyline;
    cityCut: boolean /* one of the min(N_q, L) quarters of the city cut (§4.5; L the number of districts): the city band's area labels */ }   // built by S6 (§4.5), named by S13a; every node has its own LabelEntity (kind 'quarter')
  interface Placement {                    // a user placement, set by moveLabel (§7.1): model data (N-28)
    stop: number;                          // the zoom stop (§8.8) at which the user placed it
    sizePx: number;                        // cap height in display px at 1× (never below the kind's floor, §9.4)
    anchor: PointCm;                       // point labels: the text origin; area and path labels: the spine's midpoint
    spine?: PolylineCm;                    // area and path labels: the user's spine, world cm
    dirCdeg?: number; lines?: 1 | 2 }      // a point label's direction; two lines broken at the entity's first `breakAt`
  interface PinnedPlacement extends Placement {   // what LabelEntity.pinned holds
    seq: number }                          // the seq of the moveLabel event that set it (§7.1): applying the event writes pinned = { ...placement, seq }; a warp or vertex move that carries the pin keeps it; it orders §9.2's pin pass
  ```

  The `title` label entity carries the map title's text as model data; the title is placed by §9.5's furniture rule
  (layer-order slot 24, §8.2), not by S13b's greedy.
* **View** (S13b; never hashed; recomputed per zoom stop and cached, §9.2): which candidate each label uses, its size
  and glyph positions, the quarter cut, the halo roles. Pinned placements are honoured by §9.2's pin pass; a pinned
  placement moves with its target under a warp or vertex move (§7.4).
* **Consequences.** The model hash does not depend on fonts, viewport or device pixel ratio, so O2 (a) and O11 (f) hold
  (GEO-29) — model hashes and per-stop placement digests are compared across Node, Chromium, Firefox and WebKit by
  §13.3's golden run. `moveLabel` (sets `pinned`) and `hideLabel` (sets `hidden`) are logged, hashed model events (§7.1);
  a scoped regeneration re-derives S13a only inside its scope (LC-17).

Judgment call: J-R12 (placement as view data, measured with our own font metrics).

### 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally

* **Metrics.** `@plat/labels` parses the bundled OFL font files itself (the label faces of §8.2, §17.2): `cmap`, `hmtx`,
  `kern` and GPOS pair adjustments (formats 1 and 2), GSUB single substitutions for `smcp` (small caps) and `onum`
  (old-style figures), and `loca` / `glyf` for SVG's outline text (§11.1). Advance widths and kerning in font units
  become world metres at a zoom stop; there is no contextual shaping (the label faces are Latin, ligatures off). Glyphs
  are placed and drawn one by one (§8.9), so what is drawn equals what was measured on every backend and in SVG.
* **Font features, checked (N-12).** From M1 a PR-tier CI test asserts for each bundled label face that it carries
  `cmap`, `hmtx` and TrueType `glyf` outlines and reports whether its GSUB has `smcp` and `onum` single-substitution
  lookups for the Latin script. The label style then takes a **pre-decided path per face, chosen by that test, never by
  hand**: with `smcp`, small caps come from the face; without it, the family's OFL small-caps cut (for IM FELL Great
  Primer its SC face, bundled unmodified, whose lower-case slots are small capitals) supplies them, measured by the same
  reader; where a family has no such cut (a user face), small caps are synthesised as the face's capitals scaled to
  0.75 × the cap height with the letter-spacing kept, measured by the same reader; without `onum`, the scale bar uses the
  face's default figures. The style report names the path each face took, and the census's floors (§9.4) run on
  whichever path is active (J-R37).
* **Zoom stops.** Placement is computed per zoom stop (§8.8). At stop k each glyph box, in world units, is its pixel box
  × the stop's metres per pixel; protected obstacles (gates, castle, plaza, bridges, walls — MFCG's measured defect) are
  their drawn symbol extents at that stop. S13b reads the display list through `ObstacleSource` and `RoleIndex` (§14);
  both implementations, what they call and the S14 writers of the columns they read are under §6.5 (3)'s allowlist
  lint, so S13b's inputs are bit-identical on every engine and §13.3's placement digests compare across the five engines;
  a symbol's rotated extent is computed with `dmath`, never `Math.cos` or `Math.hypot`. Between stops the view uses the
  placement of the stop at or coarser than the current scale: zooming in only shrinks every label's world box, so no
  collision can appear, and crossing below a stop switches to that coarser stop's placement. Zero collisions therefore
  hold at every zoom, not only at the stops.
* **The candidate set of a stop** is fixed before the greedy runs: every `LabelTable` row drawn at the band, minus the
  labels §9.4's rung (5) hands to a quarter at this stop, plus the quarter candidates rung (5) creates (§9.4; N-11). Rung
  (5) is decided from geometry alone, so the set is known before any collision is tested.
* **The greedy.** Candidates at a stop are totally ordered by `priority` (the numeric `LabelEntity.priority`; by default
  quarter / district > water > landmark > gate > way > address), then larger target area (`areaM2`), then id. A
  candidate takes its first alternate (its spines in order, then §9.4's ladder) that meets no placed higher candidate, no
  obstacle and no fixed pin; otherwise it yields. This whole-map greedy is **evaluated locally**: deciding c first
  decides (memoised) every higher candidate whose alternate boxes meet c's; the dependency graph is acyclic because the
  order is strict, so the result is the same whichever tiles are computed first and whatever the viewport.
* **Resumable placement.** S13b runs as a job the tile worker can stop between any two units and resume, as it does a
  raster (§8.9). Its input is the label rows, not the model record:

  ```ts
  // @plat/model (§14), beside LodBand, Role and ZoomStop: the rows S13b reads — §8.1's LabelTable with the StringTable and GeomTable
  // ranges it indexes. The tile worker's display list and each export's transient list implement it; LabelEntity stays the model record S13a writes and S14 reads
  interface LabelRows { labels: LabelTable; strings: StringTable; geom: GeomTable }
  // @plat/labels (§14 points here)
  interface LabelPlacer {
    begin(stop: ZoomStop, labels: LabelRows, obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementJob;
    place(stop: ZoomStop, labels: LabelRows, obstacles: ObstacleSource, roles: RoleIndex, fonts: FontMetrics, memo: PlacementMemo): PlacementSet;   // begin(…) then step(Infinity): SVG exports and tests
  }
  interface PlacementJob {
    step(deadlineMs: number): boolean;   // runs units on from where it stopped; returns after the first unit that ends deadlineMs or more after this call began; true when the stop's placement is complete
    result(): PlacementSet;              // once step() has returned true
    cancel(): void;                      // drops the job; the memo entries it wrote stay valid (keyed by stop, candidate id and revision)
    readonly spentMs: number;
  }
  ```

  A **unit** is one of: the rung-(5) test of one `LabelTable` row (building the candidate set); one pin of the pin pass
  (below); one step of the local evaluation, which runs on an explicit stack instead of recursion — push the highest
  undecided candidate whose alternate boxes meet those of the candidate on top, or, when every such candidate is
  decided, decide the top (its first alternate that meets no placed higher candidate, obstacle or fixed pin), write the
  memo and pop; or the glyph layout of one placed label. The job takes the scope's candidates as roots in the strict
  order, pins first, so most roots find every higher neighbour already decided and push nothing. The stack and the memo
  persist between steps, so the job can stop after any unit, and every decision reads only candidates already decided,
  so where the steps fall never changes the result: a stop placed whole and placed one unit per step give identical
  placement digests (§8.3, §13.3). A unit costs ≈ 1 µs on average and tens of µs at most (a long name trying every spine
  and rung), so a step overruns its deadline by one unit. The view's job reads the tile worker's list, which deltas
  change between steps: a delta applied between two steps drops the memo entries its dirty boxes invalidate
  (*Incremental*, below) and, when it changes a label row or an obstacle of the job's stop, the job is begun again,
  keeping every memo entry left valid. An export's job reads its own transient list, which nothing changes (§11.1)
  (J-R51).
* **Pinned labels (N-28).** A pinned label (`LabelEntity.pinned`, §9.1) is shown only in its bands. At its own stop and
  at every finer stop it is placed exactly as the user left it, before any other candidate, by the **pin pass**: the
  pins eligible at the stop — in their bands, with their own stop at this stop or a coarser one — are taken in the order
  of their `moveLabel` event's `seq`, then label id (`LabelTable.pinSeq`, §8.1), and each whose box at the stop meets no
  pin already fixed there becomes a **fixed pin** — an obstacle every candidate avoids. A pin whose box meets an already
  fixed pin is not fixed at that stop: its only alternate is its own placement, which the fixed pin blocks, so it is
  **hidden at that stop and reported** ("pinned label hidden: overlaps pin P at stop k"). The pass is a greedy in a strict
  order, evaluated locally like the main greedy — deciding a pin decides, memoised, every earlier pin whose box meets
  it — so its result does not depend on which tiles are computed first. A pin's box is sized in pixels, so zooming in
  only shrinks it in world units: a pin fixed at stop k meets nothing at a finer stop that it did not meet at k, and a
  pin hidden at k is fixed again at the finer stops where the two boxes part. `moveLabel`'s dry run (§7.1) refuses a
  placement whose box at its stop meets another pinned label's box at that stop, returning the nearest free position as
  the conflict's action — the **interactive guard**; the pin pass is the guarantee, because pins also come together
  without a `moveLabel`: a warp or vertex move carries them with the ground (§7.4), a `setAttr` rename or an ids-scoped
  `rerollLayer(naming)` lengthens a pin's text (§9.6), and a `setStyle` changes the label face's widths. At a **coarser**
  stop a pin's world box grows, so it is not fixed there: it keeps its anchor and spine and enters the greedy as a
  candidate, at its entity's priority, whose only alternate is that placement — drawn when it meets no higher candidate,
  obstacle or fixed pin, otherwise hidden at that stop and reported ("pinned label hidden at stops coarser than k").
  Zero collisions therefore hold at every zoom with pins included (J-R26, J-R45). **Test (B-ZOOM, §13.4):** two pins
  20 px apart brought together by a warp, and two brought together by a rename that lengthens the earlier pin's text —
  at every stop 0 collisions, the later pin reported hidden at the stops where the boxes meet, and the per-stop placement
  digests (§13.3) identical after a replay of the log.
* **Scope.** Area and way labels for all candidates of the band; addresses and repeated street names only for candidates
  in visible tiles and their dependency closure. The memo is keyed by (stop, candidate id, candidate revision).
* **Incremental (SCL-9).** After an edit, memo entries of candidates whose boxes meet the dirty boxes are dropped and
  re-decided; a change propagates only through candidates whose outcome changes (the priority cascade stops when nothing
  more moves).
* **Budget (SCL-10):** §12.7 — in the tile worker from the label rows alone (§8.9); an export's placement in class-4
  steps (§8.9).

### 9.3 Spines and candidates

* **Area labels** (districts, quarters, water bodies, woods; GEO-39). The face is simplified with the kernel's
  topology-preserving Visvalingam (`simplify`, §3.4: a vertex removal is refused when the new edge would cross another
  edge of the face or of its holes, checked in the kernel's index) to half the label's cap height at the band's coarsest
  stop. The hole-aware straight skeleton (`skeleton(rings, 'spine')`, §3.8, gated by its validator: connected, one
  independent cycle per hole) is a planar graph with cycles around holes; each skeleton edge's clearance is the smaller
  event time of its two ends; the **maximum-clearance spanning tree** (Kruskal on edges by clearance, descending, ties by
  edge index) drops the lowest-clearance edge of every cycle — the narrow passage beside an islet or a clearing; the
  spine is the **longest path of that tree** by length (two linear passes), smoothed (Visvalingam → centripetal
  Catmull-Rom) and curvature-limited by §13.7's O13 (a) threshold and fallback. When the skeleton fails (F-SKELETON),
  the medial axis of boundary samples is processed the same way. Candidates per area, in order: the spine; the spine
  trimmed to its central 80 %; the OBB-axis straight line; the OBB arc.
* **Path labels** (streets — new to all four references —, rivers, walls): along the centreline at the district and
  neighbourhood bands, repeated per segment above 12 em of length, kept upright (flipped when the tangent points left).
* **Point labels** (gates, bridges, landmarks): eight anchor offsets; a leader line when the footprint is under 12 px.
* **Addresses:** the numbering is model data (S13a: monotone along each way, per side); the numbers are placed as view
  data at the neighbourhood band.

### 9.4 Sizes, floors, the ladder, quarters, overflow, halos

* **Legibility floors** (display px at 1×): area labels cap height ≥ 7 px (and ≤ 14 px, ∝ √area within the band); way
  labels cap ≥ 6 px; point labels ≥ 6 px; addresses ≥ 5 px. Area labels are letter-spaced small caps (0.15 em).
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

### 9.5 Furniture, framing and tools

* **Scale bar:** metres ↔ feet, major and minor ticks, old-style figures (`onum`); a 100 m bar is accurate to 0.5 % at
  every zoom (O6 c).
* **Compass (XB08):** a procedural 8-ray design with ink and paper halves, rerollable per town: its stream is keyed from
  the town root's entity key (§6.1, §14 `TOWN_ROOT` — the seed key alone) with the concern `style.compass` and that
  concern's salt, so a reroll is a logged `rerollLayer('style.compass')` event and a link or a copy of the document draws
  the same compass (NF-D12). **Auto-placement:** candidates are the four corners and the four edge midpoints, inset 24 px;
  score = the sum over the display-list marks the compass would cover at the view (labels × 3, protected features × 3,
  buildings × 1, ways × 1, water × 0.2, paper 0) plus 0.5 × (1 − distance from the view centre ÷ the half-diagonal); the
  lowest wins, ties broken in the order NE, NW, SE, SW, N, E, S, W; re-evaluated when the view settles. The covers are
  computed where the display list is — in the tile worker, by `ObstacleSource.coverage` per candidate box — and reach
  the main thread through §8.9's furniture query. Dragging places the compass and the wheel rotates it; both are view
  state (§11.3) and pin the compass. Its view key `compass` is `trueNorth` (default: the needle points at model north,
  whatever the view's rotation) or `free`; the map's own rotation is the `rotation` view key about the frame centre
  (§2.9, §7.1: MFCG's Rotate as a view rotation, never a model change).
* **Grid (XB15):** kind none | square | hex (pointy or flat) | mesh (triangular); cell size in metres or feet (default: a
  round ground distance ≈ one tenth of the view's short side on a 1-2-5 sequence; for VTT 1.5 m / 5 ft); colour role
  `grid`; fades out below its legibility zoom (cell < 12 px); **skip water** clips grid strokes out of water faces (on by
  default for overview grids, off for VTT grids).
* **Title:** its text is the `title` label entity (§9.1); it is placed in the emptiest corner (NG's rule: the corner
  whose box covers the least mark area, the sum of its `coverage` record from the same furniture query); movable.
* **Legend (J04):** a gazetteer panel — an embedded title, numbered districts (always in `legend` mode; in `labels` mode
  only for legend fallbacks), lettered landmarks, the scale bar and the emblem; border none | single | double rule;
  position any corner (default: the emptiest corner other than the title's) or free; metric or imperial; label modes
  `labels` (default), `legend` (districts numbered on the map, MFCG's Districts = Legend) and `hidden`; plus the symbol key
  generated from the registry (O12 d). Position, mode and border are view state.
* **Emblem (M06):** a furniture slot `Emblem = { source: 'none'|'import'|'generated'; svg?: string; png?: Uint8Array;
  generated?: EmblemSpec }`. Imports are sanitised (no scripts, no external references, ≤ 64 KB). The base ships a
  minimal generator of our own: `EmblemSpec` = a field tincture from the palette's roles, one of eight partitions or
  ordinaries (per pale, per fess, per bend, chevron, cross, saltire, chief, bordure) and zero or one geometric charge
  (roundel, lozenge, mullet), keyed from the town root's entity key with the concern `naming.emblem` and its salt
  (rerolled by `rerollLayer('naming.emblem')`; NF-D12); off by default; drawn in the legend or a corner (J-R13).
* **Annotation layer** (numbered markers and a separate legend sheet); **north arrow**.
* **Measure tool (L10, L08):** an `@plat/app` ruler — click points for a polyline length in metres and feet; area mode
  for a polygon's area in m², ha and acres; snapping to way centrelines, face edges and vertices through the display-list
  index (8 px radius) — `RoleIndex.snap` in the tile worker, reached by §8.9's snap query and answered within one frame,
  the unsnapped point shown until the answer arrives; exact in world centimetres; a measurement is view data and can be
  saved as an annotation.
* **Framing (A06):** the initial view and the default export frame are the circle centred on the settlement centre with
  radius max(the outer enceinte's radius, the 95th percentile of footprint distances from the centre) × 1.08, fitted to
  the viewport's short side (no letterbox: the long side shows more context). River tails and ribbon tips beyond the
  percentile are outside unless the user frames them; a user frame is view state. Furniture sizes are CSS px × a UI
  scale; device pixels are handled by the tiles.

### 9.6 Names

Names come from §10.4's original grammar, conditioned on the model (a docks district for its water, a gate ward for its
gate, a street for its destination or trade — R16), and are drawn from the entity's `naming` stream only in §6.3's four
cases; a successor keeps its predecessor's name and naming record with its address (§6.3). **Uniqueness (LC-17)** within
its kind — districts, quarters and water bodies per town; ways per district, and tier-1 ways town-wide: in a full
generation names are resolved in id order, and a later entity whose draw repeats an earlier name re-draws on its own
`…/attempt=n` (≤ 8), then takes a distinguishing suffix; in a scoped regeneration or an edit, entities outside the scope
are fixed and only entities inside it re-draw. An existing entity is never renamed by another entity's creation, and the
locality oracle, which compares against a replay of the same log, resolves collisions the same way. Equal names brought
together by carrying, and features as non-inputs, are §6.3's. Names are rerollable (`rerollLayer(naming)`, town-wide or
with `ids`, §7.1), editable (`setAttr`) and persisted; the word lists are spell-checked in CI. **Test (B-EDIT):** a block
reroll changes 0 names and 0 `LabelEntity` records outside its scope; placement changes outside the scope are counted and
reported as view changes; selecting a user corpus renames exactly the unedited names drawn from the field it replaces,
and no other name — not the district names drawn through the same row (§6.3).
