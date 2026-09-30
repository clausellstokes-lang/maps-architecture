# Fix-all round 2 — PIPELINE area (§4 generation pipeline, the schemas it writes §2.5–§2.7, §10, PART II, PART III)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/draft-pipeline-r2 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

Lane `fixall/draft-pipeline-r2`, 2026-09-25. Status: COMPLETE. Input: the 18 items still open after round 1
(`docs/validation/fix-all/r1-verify-pipeline.md` §3 and the round-2 list), `docs/ARCHITECTURE.md` (the integrated text:
§2.1–§2.9, §3.1–§3.10, §4.1–§4.12, §5, §6.1–§6.5, §7.1–§7.6, §9.4, §10, §12.3–§12.4, §13.2, PART II, PART III, the
delegated decisions, the judgment calls and the staged list read line by line; §8 read at §8.2's paint programs and relief
tier and §8.9; the rest by outline), `docs/ARCHITECTURE-VALIDATION.md` §0.M, the round-1 receipts
`docs/validation/bench/fixall_pipeline_{mfcg_fits,ou_heading}.out`, and `captures/mfcg/exports-sweep-2026-09-25/README.md`
(per-size statistics, numbers only), and the cross-area requests the other round-2 drafts make of the pipeline sections
(`r2-determinism.md` §3.2, `r2-kernel.md` Part 3, `r2-rendering.md` §3.2 — incorporated or resolved as §3's coordination
list says). `docs/validation/fix-all/r1-validate.md` does not exist; nothing was read outside the
project and no reference code or content was consulted. Executed in this lane (scripts and outputs in
`docs/validation/bench/`): `fixall_pipeline_r2_levelset.py` (how far the road-anisotropic level set departs from the
terrain-only one — the premise of NF-P1 and the separation floor of NF-P10) and `fixall_pipeline_r2_quarters.py` (the
quarter city cut against the district count on MFCG's sweep and across our ladder — NF-P9, N-21).

## 0. How to read this file (plain words)

Every one of the 18 items ends FIXED; none is deferred, none is claimed invalid, and none needed the owner-staged label
(NF-P13 concerns the floating-island hook, whose subject is staged by the owner, but the defect was in the base-side hook
and is fixed now). Section 1 is the disposition table. Section 2 holds the replacement text for the architecture, one
block per subsection, each opening with `=== REPLACE … ===` or `=== INSERT AFTER … ===`; the integrator pastes each block
over the named subsection. Section 3 lists the changes other areas must make so their sections agree. Section 4 says what
was measured and what is reasoning.

**What changed, in plain words.**
1. **The first town wall is now decided in one go.** Before, the program guessed the wall's line once, placed the gates, the
   castle and the moat on that guess, and later drew the wall again along the main roads — about 76 m further out at each
   gate in a typical town (measured here), so gates sat in dents and the moat could miss the wall. Now the main roads to
   the gates are worked out first, the town's edge is measured along them, the gates are where the roads cross that edge,
   and the castle, the wall and the moat are all placed on that one line before any street is drawn.
2. **Moats and canals come with their bridges.** When the program digs a moat or canal it now also places a bridge site at
   every gate, at the castle gate and along canals, so main roads can always cross.
3. **Row houses on curved streets are stored as they are cut.** A row house cut to its plot on a bend has slightly bent
   sides; it is now stored as a four-sided "quad" wing with its roof ridge defined, instead of being forced into a
   rectangle that would break the shared party wall.
4. **The wall zone is off-limits to lanes, by construction.** The strip along the wall (the wall itself plus the gap where
   no house may stand) is cut off as its own piece of ground before lanes are drawn, so lanes stop at it; the wall's own
   shapes are built inside it later.
5. **Each district only plants trees and orchards on its own ground.** Tree-lined avenues are planted on each district's
   side of the road, and orchards outside the town are handed to the countryside's own step, so the result no longer
   depends on which district was built first.
6. **Lanes that end on a boundary street are written into one shared record** that both neighbouring districts read, and
   "re-rolling one district leaves the others untouched" is now stated precisely: only the few points where its lanes meet
   the shared street change.
7. **Smaller fixes:** the step-by-step list of which stage draws what is now complete and consistent; the countryside is
   built alongside the districts on a worker that was idle; the number of quarter labels is never negative at town size
   and stays within one of MFCG's count; twin towns keep their walls apart or share one wall with a cross wall; floating
   islands get their residents assigned before they exist; a moat or canal dug by hand now says which roads get bridges
   and which are cut; setting packs change the roster row by row, never by position.

## 1. Disposition table

**18 items: 18 FIXED, 0 INVALID, 0 STAGED-BY-OWNER. None deferred.** N-21 is the same defect as NF-P9 and shares its
mechanism. "Blocks" name the replacement blocks of §2; "XR" names the cross-area requests of §3.

| item | sev. | disposition | sections changed (blocks) | mechanism |
|---|---|---|---|---|
| NF-P1 | major | FIXED | §4.2 (S3 rewritten), §4.3, §4.4 (S5a, S5d), §4.8, §4.1, §2.7; XR K4, D6, D8, R1, S2, S3 | One construction: S3 solves the gate routes on its lattice, computes the one travel-cost field over them, takes the stage-1 boundary as its level set, puts each gate at the first crossing of its route with that boundary, sites the castle (weld vertices on the boundary) and traces the wall — all before L1; S5a commits that trace unchanged; the moat is carved along it. Stage k ≥ 2 takes its boundary before its own S5b, so its gates lie on the boundary they were picked on. Premise confirmed by execution: 76 m / −35 m departure at 58 ha, 5 roads, a = 1.3. |
| NF-P2 | major | FIXED | §2.6, §4.7 S11; XR K4, R4 | `BaseWing { kind: 'rect'|'quad'|'polygon'; ring; ridgeAxis; … }`; a clipped row footprint is one `quad` wing (stepped quads on a slope) handed to `outline()` as `fixedWings`; ridge between the midpoints of the two sides `ridgeAxis` names; §3.8's exact OBB roof when near-rectangular, skeleton otherwise; "stored as wings". |
| NF-P3 | major | FIXED | §4.9, §4.5 S7b (4), §2.5, §2.7, §4.1, §4.7; XR D3, S5 | S12b writes only inside its own faces: avenue and street-tree rows are `Greenery.along` rows in the planting district's own half-corridor strip (no plat edge); edge orchards are hinterland `Allocation` rows drawn at S7b and built by the hinterland unit; park paths are L3 faces; S12b named in the derived-complete digest test. |
| NF-P4 | major | FIXED | §4.2 S3 (2), (10), §4.3, §4.4 (outer moats), §4.8, §2.7 `Bridge` | S3 emits pinned decks of S1's form for the water it carves: one per main gate across a city moat, one at the castle gate across a castle moat, canal decks at a spacing row; S4/S5 route through them as fixed edges; S7 builds the bridges. Outer moats (S5a) and edit carves get decks by the §4.11 way rule. |
| NF-P5 | major | FIXED | §4.8, §4.6, §4.7 S10 (0), §2.5, §2.7; XR K1, K5, D8 | S7 cuts two L1 wall strips off the faces beside each trace (band + setback, bounded by the setback line or intervallum; band + setback + glacis or berm); S8 never cuts a strip and its lanes end on it; the band, tower and gatehouse L3 parts are built inside the strip blocks by S10's first step, after S9. |
| NF-P6 | major | FIXED | §4.6 step 7, §2.5, II.1 (rule 6, `Seam`), II.4, II.5, §4.12, §4.1; XR K3, D1, D2, D4, S1 | Every S8 lane end on a district-boundary spine is a `baseLane` portal + `SeamAmendment` in the one shared `Seam` record both districts read; a portal gap keeps two districts' lanes off one vertex; a removed lane's vertex is dissolved; the effective scope (seam exception) is stated in §4.6 and II.4 and the oracle computes it from commit records. |
| NF-P7 | minor | FIXED | §4.1 (per-level batch table), §4.2 S3 (10), §4.9, §4.11 | Every stage's batches listed per level; "S8 is the only stage after S5 that writes L1" replaced by the true list (S3–S8, never after S9); the stray "separate L1 transaction" clause deleted (later lanes are `drawWay` edits under §7.3); decoration ponds carved at S3 before any way; S12a writes no geometry. |
| NF-P8 | minor | FIXED | §4.1, §4.9; XR R1, R2 | One stated position: S12a (siting, no geometry) runs after S7b and before S8; the hinterland unit (its S10–S12b at L3/L4) runs on the generation worker concurrently with the pool as one more overlay of disjoint faces, committed in lineage order — so the furlong work stays hidden and nothing else writes the arena during the merge. |
| NF-P9 | minor | FIXED | §4.5 (quarters); XR R3 | City cut at `min(N_q, L)` nodes (L = districts grown); TOWN figure corrected to 9–10 (N_q) with the cut 5–11 across the TOWN band; executed: 8 / 13 / 17 against MFCG's 9 / 12 / 18 at the matched sizes (±1); §9.4's `min(12, districts)` bar shown to fail at 7 500 and 10 000 inhabitants and restated in XR R3. |
| NF-P10 | minor | FIXED | §4.2 S3 (1), (2), (4), (6), §4.3 | T partitioned by nearest source nucleus; separation floor `τ(a)·(R_i+R_j)` + both setbacks and glacis + 30 m (≈ 800 m for two 29 ha TOWN nuclei; τ from the executed tip factors); re-site ≤ 3, then merge under one enceinte with a cross wall, reported; one plaza and the gate law per nucleus; inter-nucleus route gate to gate. |
| NF-P13 | minor | FIXED | §4.5 S7b (5), II.6, §2.5 | S7b creates each sky pseudo-district's `Allocation` first, before islands exist, from `IslandRule.areaHaBand` × the dense core's plot share ÷ band plot area, richest band down; `SkyStrategy.place(…, allocations, …)` takes them as declared inputs. (The islands are staged by the owner; this base-side hook is fixed.) |
| NF-P14 | minor | FIXED | §4.11; XR K2, D7 | `carve` way rule by class: arterials and sole connections kept with a perpendicular pinned deck via S4's local operator; other classes cut at the bank setback, stubs pruned, access restored by S5's local operator or an alley, else demolished; quays/piers kept at ≥ 30°; lifecycle events with cause `convert:carve`; declared batch order L1 → L0 → L1 → tree scoping. |
| NF-D8 | minor | FIXED | §10.4 | `rosterPatch: { table, baseVersion, ops: RowOp[] }[]` — rows by key with `baseRowHash`; a changed or vanished base row (or an insert on an existing key) is an orphan, kept and reported as in §7.6. |
| NF-D9 | minor | FIXED | §2.5, §4.5 S7b (1), §4.7 S10a | `Allocation.stream` removed; S7b draws from the town's `alloc.district` stream and S10a from each district's `alloc.block` stream, derived from lineage on demand. |
| NF-D16 | minor | FIXED | §4.1 | "The model digest covers the eager model …", with the document digest named as the separate hash of the canonical bytes. |
| COV-VG-VN-029 | minor | FIXED | PART III | Item 5: VG's spotlight vignette and grass-tuft look as `painterly` programs; hillshade, contour and hachure marks are the base relief tier (§8.2); "does not pay for" now names VG's spotlight and painterly look, not the relief renderer; the relief tier added to what the village reuses. |
| N-20 | minor | FIXED | §4.1 | "The tile worker rasters tiles from the display list and the main thread only composites them (§8.9)." |
| N-21 | minor | FIXED (dup of NF-P9) | §4.5 | as NF-P9: the cut is `min(N_q, L)`, so ≈ 440 buildings (N_q 7, districts 5–6) cut at every district. |

## 2. Replacement blocks

Each block replaces the whole subsection named on its `===` line (the heading as it stands in `docs/ARCHITECTURE.md`
today); where a block's first line carries a new heading, the new heading replaces the old. Unchanged paragraphs inside a
block are copied verbatim from the integrated text; the requests other round-2 drafts made of these subsections are
already folded in where §3's coordination list says so.

=== REPLACE §2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector ===

### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

```ts
interface District { id: Id; kind: DistrictKind /* feature-named: central, market, docks, gate, riverbank, castle, temple, park, craft, sprawl, suburb, shanty, hinterland, … data-defined; never a social class */;
  quarter: Id /* the label-level grouping, below */; faces: FaceRef /* L1 coarse faces, before and after infill */; boundary: TypedBoundary; seams: Id[] /* its Seam records (II.1): one per boundary run, shared with the neighbour across it; the district's SeamContract is the view assembled from them — from milestone 1 */;
  character: CharacterVector; venueMix: Record<string, number>; prosperity: { mean: number; band: string }; growthStage: number;
  fabric: FabricStrategyId /* 'bent-cut' in the base; ring / square / street at stage 2 */; fabricParams: Record<string, number>;
  buildingScale: number /* 0.5–2, default 1: FTG's "smaller / bigger" knob as a continuous multiplier on footprint targets (§4.7 S11) */;
  materialOverride?: Partial<MaterialRow> /* §2.6 */; allocation: Id /* the district's Allocation record (§4.5 S7b) */; subDistricts: Id[];
  description?: TextRef /* a generated one-line summary of the mix and features (§10.4), regenerated when the mix changes, editable */;
  namingFeature?: Id; name?: NameRef; lifecycle: Lifecycle }   // labels: LabelEntity (§9.1)
// Quarters are the QuarterNode merge tree of §9.1, built by S6 (§4.5); the N_q nodes of its city cut (QuarterNode.cityCut) are the city-LOD label unit (MFCG's district count)
interface SubDistrict { id: Id; district: Id; blocks: Id[]; cluster: string /* roster cluster tag, e.g. a trade group */ }             // FTG's sub-district: a contiguous block group a cluster is placed into (§4.7 S10a)
interface Reservation { id: Id; kind: 'castle'|'plaza'|'market'|'precinct'|'institution'|'park'|'harbour_basin'|'moat'|'canal';
  face: FaceRef /* L1 barrier face(s); water kinds are L0 faces */; areaBandM2: [number, number]; compactnessMin?: number; owner?: Id /* castle, institution, commons */;
  attach: VertexRef[] /* ('attach', reservation id, i): perimeter vertices arterials end at (plaza) or the wall welds through (castle on the enceinte); role-carried, so splits and warps carry them (§2.2 rule 5) */; stage: StageId /* S3, S7 (gate plazas) or S7b */; lifecycle: Lifecycle }
interface Allocation { id: Id; level: 'town'|'district'|'block'; target: Id /* town, district, block, the hinterland pseudo-district or a sky pseudo-district (II.6) */;
  rows: { cls: string; band: string; count: number; claim?: Id /* Reservation for items larger than a block */; subDistrict?: Id;
    near?: Id /* hinterland rows only: the district an edge orchard serves (§4.9) */; areaM2?: number /* area-sized rows: edge orchards, sky capacity */ }[];
  lifecycle: Lifecycle }   // persisted; the eager content decision every lazy or per-district stage honours (§4.1 laziness contract); stores no stream key (§2.4)
interface FieldBands { field: 'prosperity'|'density'|'greenery'; cuts: number[] /* ascending, on the field's [0, 1] value */; hysteresis: number /* default 0.02 */;
  source: 'roster-shares'|'table'|'edit'; epoch: number }   // computed once per town at S6 (§4.5); changed only by an explicit edit or an epoch
interface Block { id: Id; face: FaceRef /* L2 built block(s) */; district: Id; subDistrict?: Id; frontages: Frontage[]; depthClass: string;
  interior: 'plots'|'court'|'back_lane'|'through_alley'|'rear_plots'|'green'|'landmark'|'reserved'|'wall_strip'|'empty' /* the deep-interior treatment, decided in S8 (§4.6); 'wall_strip': an enceinte's band, setback and glacis block, never plotted (§4.8) */; reservation?: Id }
interface Frontage { id: Id; way: Id; edges: EdgeSetRef /* ('frontage', frontage id): the L2 kerb edges of this block on this way */; class: WayClass; lengthCm: Cm }
interface Plot {
  id: Id; face: FaceRef /* L3 */; block: Id; district: Id;
  frontage: EdgeSetRef /* ('frontage', plot id) */; access: EdgeSetRef /* ('access', plot id): ≥ 1 edge always (invariant) */; depthCm: Cm; frontageCm: Cm;
  partyWalls: EdgeSetRef /* ('party_wall', plot id): one shared edge per wall; the neighbour is the owner of the face across */;
  bounds: PlotBound[] /* the boundary treatment of every non-party-wall edge (VIS-8) */;
  owner?: Id /* household | business | institution */; use: PlotUse; sitePlan: SitePlan;
  buildings: Id[] /* 0..n footprints */; yard: YardPart[] /* typed sub-areas: yard, garden, court, orchard, midden, pen, vacant, formal_garden, forecourt, churchyard, shore */;
  ctx: ContextVector; derivedFrom: DerivationRecord /* §2.8 */; assignment?: AssignmentRef; members?: Id[] /* joined plots (EVO) */; lifecycle: Lifecycle;
}
interface PlotBound { id: Id; edges: EdgeSetRef /* ('treatment', bound id): the treated sub-edges; a gate opening is the sub-edge carrying the indexed `gate_opening` role instead of `treatment` (splitThrough at the gate ends) */;
  side: 'frontage'|'side'|'rear'; treatment: 'none'|'fence'|'hedge'|'wall'|'railing';
  heightCm: Cm; gates: { opening: EdgeSetRef /* ('gate_opening', bound id, i): the open sub-edge */; widthCm: Cm }[] /* every access edge with a treatment has ≥ 1 */; ownedBy: Id /* one owner per shared edge */ }
// DerivationRecord (what S10–S12b read last time; Regenerate (keep) re-reads it, §4.5, §4.11) is defined once, in §2.8.
interface SitePlan { arrangement: 'row'|'compound'|'detached'|'hovel'|'tents'|'institution'|'none'; coverage: number; slots: BuildingSlot[]; frontJitterCm: Cm; ruleRow: string }
interface BuildingSlot { role: string /* house, hall, stables, workshop, chapel, barn, kitchen, brewhouse, tent, … */; hint: Polygon; entranceOn: EdgeSetRef /* ('access', plot id) */ }
interface ContextVector {   // the per-plot vector every rule table reads (owner hook; O7 / O17 / O18 / O19)
  areaM2: number; shape: { obbW: number; obbD: number; compactness: number; reflex: number; corner: boolean; wedge: boolean };
  frontageM: number; roadClass: WayClass; roadWidthM: number;
  districtKind: DistrictKind; quarter: Id; venueMix: Id /* the district's mix, read through the district, never copied per plot (SCL-5) */;
  prosperity: number; prosperityBand: string; density: number; greenery: number;   // continuous values + banded class (O18)
  dist: { centre: number; plaza: number; market: number; gate: number; wall: number; water: number; shore: number; harbour?: number };
  upstream: number /* 0 = upstream … 1 = downstream along drainage */; slope: number; aspect: number; upwind: number; baseCm: Cm;
  terrainClass: 'high'|'mid'|'low'|'damp'|'flood'|'rock'; growthStage: number; epoch: number; buildingScale: number;
  rosterAssignment?: Id; assignment?: Id;
}
```

The context vector is stored as struct-of-arrays columns per district partition (one typed column per field), not as an
object per plot (SCL-5).

A plot is the parcel (the owner's stage-3 wording and the references' code say *lot* for the same thing; this document
says *plot* except when quoting them, and *building* only for a footprint with heights standing on a plot); rendering
never draws a plot outline as a building (a cadastral outline group is an optional toggle).
Coverage ratio, arrangement, separation rule and boundary treatment come from the site-plan tables keyed by `class ×
prosperityBand × density`, with continuous rules (coverage, plot size, greenery, building scale) interpolating along the
prosperity value between band rows (§4.7).

**What the new records are for.**

* **Districts are feature-named, never class-named.** A district's kind names its feature or function (market, docks,
  gate, castle, temple, craft, riverbank …); "rich quarter" and "poor quarter" are *descriptions* derived from the
  prosperity field for naming and the description line only. *Judgment:* chose feature-named kinds over the synthesis
  seat's `patrician` / `slum` kinds because MFCG's live taxonomy dropped class-typed wards and its creator states that
  townspeople lived where they worked with no purely residential wards except the patriciate (MFP-7); wealth still
  varies continuously through the prosperity field, which is where the owner put it.
* **Quarters are the city-LOD label unit.** A quarter is a group of adjacent districts (often one district at TOWN)
  whose count follows MFCG's measured law (§4.5), so the city view carries as many area labels as MFCG draws; districts
  keep their own names at district LOD.
* **Reservations** are the large claims made before the streets (§4.2 S3) or before the lanes (§4.5 S7b): castle bailey,
  main plaza, market, church or cathedral precinct, large institutions, parks, and the water kinds (harbour basin, moat,
  canal) that are carved into L0 before any way is routed. A reservation is a barrier to growth and infill; the claimed
  entity is built inside it.
* **Allocations** are the persisted content decision: which classes and how many, in which wealth band, go to each
  district, sub-district and block — and, for the outside classes and the edge orchards, to the hinterland pseudo-district,
  and, when the owner-staged island toggle is on, to the sky pseudo-districts (II.6). They are computed eagerly for the whole
  town (§4.1) and every per-district stage reads them, so the town's content never depends on the order districts are
  derived or viewed (LC-2). An allocation stores no stream key: S7b's town-wide run draws from the town's `alloc.district`
  stream and S10a's per-district runs from each district's `alloc.block` stream, both derived from lineage on demand
  (§2.4, §6.1), so a district's New random re-draws its own block allocation and nothing else (NF-D9).
* **Seams** (II.1) are the records of the boundary runs districts share: one record per run, read by both districts, with
  the run's typed edges, its portals (every way that meets or crosses it, the lanes S8 ends on it included), its
  amendments and its boundary field samples. Because both districts read one record, their contracts cannot disagree, and a
  district's re-derivation changes only the seams it is party to (§4.6, II.1, II.4; NF-P6).
* **FieldBands** hold the prosperity (and density, greenery) cut points. They are computed once per town from the
  roster's household wealth shares (§4.5), recorded, and changed only by an explicit edit (`setAttr` on the record, which
  re-derives every block whose band changes) or by an epoch. A block keeps its recorded band unless its value crosses a cut
  by more than the hysteresis, so a from-scratch replay reproduces the session's bands (LC-6).
* **DerivationRecord** is the per-plot memory of the inputs its last derivation read. "Regenerate (keep settings)"
  re-derives from these recorded inputs (faithful, byte-identical); re-deriving with current inputs is `Adjust`; a field
  brush or an epoch re-derives only plots whose current sample differs from the recorded one by more than the declared
  tolerance τ = 0.01 of the field range, and the same τ applies on replay (LC-6, LC-12).
* **PlotBound** gives every plot edge a treatment — none, fence, hedge, wall or railing — with gate openings on access
  edges, chosen by the site-plan table (§4.7 S11). It is what draws a walled manor compound, a fenced garden, a hedged
  field edge, and it exports as VTT walls and GeoJSON lines (VIS-8; NG's walled manor compound, COV-NG-N27; FTG's fences,
  COV-FTG-F23).
* **Vacant frontage runs** are ordinary plots with `use = 'vacant'` (or a `yard` part joined to the neighbour) placed by
  the vacancy-run rule of the granularity table (§4.7 S10), so a built block is not always fully ringed (COV-VG-VN-170).

=== REPLACE §2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface ===

### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

```ts
interface Heights { baseCm: Cm /* ground datum: floor level in terrain cm (§4.7 S11) */; floors: number; eaveCm: Cm; ridgeCm: Cm; towerCm?: Cm /* eave, ridge, tower above baseCm */ }   // owner HEIGHT ruling: always populated
interface BaseWing { kind: 'rect'|'quad'|'polygon';
  ring: Polygon /* rect: 4 vertices, a rectangle · quad: a row footprint clipped to its plot (§4.7 S11) — ring sides 1 and 3 are the two straight
                   party-wall sides, sides 2 and 4 the front and rear chains, which may be bent or curved · polygon: a template part (apse, octagon, star point) */;
  ridgeAxis: 0|1 /* rect: along the ring's first or second side · quad: 0 = the ridge joins the midpoints of the two party-wall sides (eaves to the
                    street), 1 = it joins the midpoints of the front and rear chains (gable to the street) · polygon: unused (pyramid, cone or dome) */;
  heights: Heights; roof: RoofSpec }
interface Building {
  id: Id; plot: Id; slot: number; footprint: FaceRef /* L4 */; wings: BaseWing[] /* ≥ 1; the footprint is their union (rectangle = 1, L = 2, T = 2–3, templates n; a clipped row house = 1 quad, or stepped quads on a slope) */;
  class: BuildingClass /* hovel, cottage, house, row_house, hall, inn, workshop, warehouse, chapel, church, temple, manor, keep, tower, mill, tent, … data-defined */;
  use: Id /* roster building type */; dwelling?: Id /* the household living in a workplace (live-in), §4.7 S10b */;
  entrance: VertexRef /* ('entrance', building id): a vertex on the footprint edge that lies on the access edge */; heights: Heights /* the building's max over its wings */;
  roof: RoofSpec /* the model's default roof construction; a style sheet may override the construction, never the heights (§8.2) */;
  material: { walls: string; roof: string } /* from MaterialRow; setAttr-overridable */; description?: TextRef; openingHours?: OpeningRow[];
  subLocations: Id[] /* SubLocation records, from the class table */;
  composition?: Composition /* stage 3: lazily generated, stored only when edited; its streams derive from the building's lineage (§6.1) */;
  assignment?: Id; drift?: DriftBounds; occupants: Id[]; lifecycle: Lifecycle;
}
type RoofSpec = { kind: 'gable'|'hip'|'flat'|'pyramid'|'cone'|'dome'|'skeleton'|'tent'|'plain' /* the F-SKELETON downgrade: no ridge or hip lines, §3.8 */|'none' /* a ruined building's roofless state, §2.8 */; pitch?: number; material?: string };
interface MaterialRow { key: { districtKind: string; cls: string; band: string; era: string }; walls: string; roof: string; weight: number }   // a rule table (§7.6), our own rows
interface OpeningRow { dayType: string; openH: number; closeH: number }
interface SubLocation { id: Id; building: Id; name: string; tags: string[] /* table, counter, stage, bed, bath, pickup, deliver, … data-defined */;
  capacities: { leisure: number; tempResidential: number; guestWorker: number; studying: number; working: number }; relax?: string[] }   // from the class table; rooms at stage 3 refine, never replace
interface Composition { lod: ('outline'|'wings'|'rooms')[]; wings: Wing[]; towers: Tower[]; courts: Polygon[]; rooms?: Room[] }
interface Wing { footprint: Polygon; heights: Heights; roof: RoofSpec; dormers?: number; porch?: Porch }
interface Tower { centre: Point; radiusCm: Cm; heights: Heights; roof: RoofSpec }
interface BuildingInput { lot: Polygon; access: Segment[]; slot: BuildingSlot; ctx: ContextVector; cls: BuildingClass; assignment?: Assignment; drift: DriftBounds; seed: StreamKey /* derived from the building's lineage for this call; never stored */; terrain: TerrainSampler;
  fixedWings?: BaseWing[] /* the row arrangement's clipped quads (§4.7 S11): outline() returns them with heights and roofs and never re-fits them */ }
interface BuildingGenerator {   // the stage-3 hook, split by cost (SCL-13)
  outline(input: BuildingInput, k: Kernel): KernelResult<{ wings: BaseWing[] }>;              // every LOD, exports, shadows: cheap and deterministic
  compose(input: BuildingInput, outline: BaseWing[], lod: 'wings'|'rooms', k: Kernel): KernelResult<Composition>;   // lazy, per visible tile
}
interface ClassRules { pick(ctx: ContextVector, assignment?: Assignment): { cls: BuildingClass; heights: Omit<Heights, 'baseCm'>; roof: RoofSpec; template?: string } }   // a data table, not code
```

**The base outline builder.** The base ships `OutlineBuildingGenerator`: the site plan's rectangle, an L or T composed of
2–3 rectangular wings (MFCG Complex mode, FTG Dense/Gaps looks), a row's `fixedWings` passed through unchanged (below),
and — for institution classes (keep, temple, church, manor, hall, farmstead) — two further constructions behind the same
`outline()`:
1. **Footprint templates** (COV-FTG-F16): data rows of normalised shapes fitted to the claim — cruciform church (nave,
   transept, apse), cruciform keep with corner projections, octagon, n-gon (a 9-gon theatre), 6- and 7-pointed star
   temples, U-court, ring cloister around a court. Fitting is an affine map of the template into the claim's `lir`,
   then a boolean intersection with the claim; each template is stored as its constituent rectangles and wedges so the
   wing rule below holds.
2. **The axis-locked composer** (COV-MFCG-G05; our own construction of MFCG's idea): take the claim's OBB axes; cut the
   axis-aligned rectangle on the axis more perpendicular to the current longest edge at a ratio drawn from U(0.4, 0.6);
   recurse until cells reach the class's minimum cell (`minCell = baseCell · 2^(2·size − 1)`, a table row); keep each
   cell with the class's `fill` probability, keeping the cell nearest the entrance and rejecting any drop that
   disconnects the kept set; retry ≤ 3 times on the `…/attempt=n` stream, then the full rectangle (reported). U, H,
   comb, cross and ring footprints emerge — the landmark silhouettes that show at city zoom.

Every footprint is stored as **wings** (VIS-10) of three kinds: `rect` (the outline builder's rectangles and its L / T
compositions), `quad` (a row house clipped to its plot, below) and `polygon` (non-rectangular template parts — apse,
octagon, star points — with a `pyramid` / `cone` / `dome` roof). Each wing carries its ridge axis (the wing's long axis,
or the short axis in a table share of wings — NG measures ≈ 36 %), its heights and its roof; the footprint is the wings'
union, so the footprint hash at city LOD does not depend on the wing split. The roof *construction*
the renderer draws (plain, skeleton-hip, skeleton-gable, fake gable per wing) is a style-sheet parameter over the stored
wings (§8.2); the model's `roof.kind` is the default that the 3-D export uses, so presets can change the picture without
changing the model. *Judgment:* chose wings stored in the base over a single-wing L/T because NG's per-wing roofs,
two-tone law and hatching cannot be derived from one ridge line (VIS-10) and the wing split costs one small array per
building.

**Row footprints are quads (NF-P2).** S11's row arrangement builds each row house's footprint by the boolean
`plot ∩ frontage band` (§4.7 S11, GEO-26), so two neighbours share one party-wall edge even on a bent or curved frontage.
That polygon is stored as one `quad` wing — its two side lines are the plot's party walls, its front and rear are the
clipped chains — and S11 hands it to `outline()` as `fixedWings`; `outline()` adds heights and the roof and never re-fits
it, so the footprint the boolean made is the footprint the model stores (on a slope beyond `skirtMaxCm` S11 first splits
it along the contour into stepped quads, each a wing). The quad's model ridge joins the midpoints of the two sides its
`ridgeAxis` names, so every row house has a ridge without a skeleton. The drawn roof follows §3.8 wing by wing: a quad
that passes the near-rectangle test (its four OBB corners matched by footprint vertices within 30 cm, area ≥ 0.97 of its
OBB) takes the exact OBB roof; any other quad takes the validated skeleton with its plain-roof downgrade; the per-wing
fake-gable construction draws the stored ridge directly. The union rule, O17 (i)'s identical footprint hash at every LOD
and the stage-3 contract therefore hold for attached rows on curved frontages exactly as for rectangles; the contract
test runs on the curved-street fixtures (§13.2). *Judgment (J-P31):* chose a `quad` wing kind that stores the clipped footprint
over re-fitting row houses as rectangles, which breaks GEO-26's shared party wall, and over storing them as `polygon`
wings, which loses the ridge the per-wing roofs and NG's two-tone law need, because the quad keeps the party wall exact
and still names a ridge by construction.

**Heights and the ground datum (owner HEIGHT ruling; AM-3; FTG-13).** Every building, wing, tower, keep, wall run, gate
and bridge carries heights; eave, ridge and tower heights are measured above `baseCm`, the floor level in terrain
centimetres. One per-entity function, `deriveBase(entity, sampler)`, computes every ground datum, and S11, S7 and S1's
terrain operator (§7.3 (a)) all call it: a wing's `baseCm` from the terrain sampler (bilinear on the refined 2.5 m raster at
the wing's vertices and centroid) is `max(samples) + plinthCm` (table, default 30 cm), so no floor is buried; the fall under the
wing (`max − min`) is a foundation skirt the 3-D export extrudes down to the terrain and the shadow pass includes. Where
the fall across a row footprint would exceed `skirtMaxCm` (table, default 300 cm) the footprint is split along the
contour into stepped wings, each within the limit — terraces step down a hill instead of floating. Walls store their base
as a knot profile along the trace (§2.2 rule 5), gates and towers their own base from the samples under their footprints,
bridges and pier decks a deck height from the two bank elevations plus a clearance row.
Shadows and a later 3-D export read the same numbers, so they agree on any terrain, not only on flat sites. The shadow
pass itself is the owner's later SHADOW stage; the base populates every height and keeps the display list's shadow hook
(§8.1) and its budget (§8.4, §12). Acceptance: heights on 100 % of buildings, wings, towers and wall runs; on the hilly
golden seeds and after every terrain stroke, 0 wings whose `baseCm` differs from the highest terrain sample under the wing
plus the plinth, user-edited bases excepted (the rule is exact, §7.3 (a)).

**Materials (COV-FTG-F20).** `MaterialRow` is a rule table keyed by district kind × class × prosperity band × era (weighted
rows; temples and churches stone by row), read by S11; a district's `materialOverride` and a building's `setAttr` override
it; enceintes carry their own wall material (§2.7). The style sheet maps materials to colour and texture roles.

**Descriptions, opening hours, sub-locations (COV-FTG-F21, FTG-11).** A building's description is generated by the naming
engine (§10.4) from its class, use, owner and district, persisted per entity and editable; opening hours come from the
class table and are what the simulation module reads. `SubLocation` records (named parts of a building with tags and
capacities for leisure, temporary residence, guest workers, study and work) are filled from the class table when the
building is created; stage-3 rooms refine them (a room may host a sub-location) and never replace their ids.

**The stage-3 hook and its cost contract (owner-staged; DEF-17, SCL-13).** Stage 3 replaces `OutlineBuildingGenerator`
with a lot-driven Fantasy-Manor-class generator (`manor.md` §3.3, §9 via the proposals: a lot-derived path of wings,
orientation fixed by the frontage, the lot polygon in the collision set, a class picker per plot from the same
`ClassRules` table). The interface is split so the city view never waits for a manor:
* `outline(input)` returns the wings every LOD, every export and the shadow hook use — a row's `fixedWings` unchanged,
  with heights and roofs added. The base `OutlineBuildingGenerator`'s `outline()` is part of S11's geometry share
  (≤ 3 µs per plot median, §3.7, §12.4). A stage-3 generator's `outline()` is admitted at ≤ 10 µs per building median by
  the intake measurement below, and registering it re-declares S11's row of §12.4 by the measured difference — a declared
  budget amendment under §3.7's rule — so the METROPOLIS city view still composes no manor to show its footprints.
* `compose(input, outline, lod)` returns wings with roofs, dormers, porches, towers, courts and rooms, lazily per visible
  tile at district LOD and finer; ≤ 1 ms per building median at `wings`, one tile's compositions within 16 ms of frame
  work (amortised: a tile draws the outline until its compositions arrive). **Contract test:** the union of the composed
  wings equals the outline's union exactly (integer equality after snapping), so O17 (i)'s identical footprint hash at
  every LOD holds by construction.
* **Stage-3 intake measurement and fallback, decided now.** The stage-3 intake measures the generator's `outline()` time
  per building class on B-CITY METROPOLIS seeds. If it exceeds the 10 µs median, `outline()` runs the generator's own
  massing step only (its wing rectangles without roofs or rooms); if that still exceeds the budget, the base
  `OutlineBuildingGenerator` keeps producing the outline and stage-3 `compose()` is constrained to it (its wings must
  union to the base outline). Diversity "from a giant manor to a small hovel" stays a property of `ClassRules` (data keyed
  by the context vector), not of the generator.

=== REPLACE §2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records ===

### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

```ts
interface Enceinte { id: Id; kind: 'citadel'|'inner'|'outer'|'suburb'|'bailey'|'palisade'|'earthwork';
  trace: ChainRef /* ('wall', id): the L1 wall chain, a ring or an open chain */; closure: 'ring'|'shore' /* 'shore': an open chain whose enclosure is closed by the L0 shoreline */;
  anchors?: { end: 0|1; on: 'shore'|'bank'|'cliff'|'enceinte'; vertex: VertexRef /* ('anchor', enceinte id, end) */ }[] /* typed end anchors of an open chain */;
  waterfront: 'open'|'quay_wall'|'sea_wall'; placement: 'aroundAll'|'aroundStage';
  strips: { inner: FaceRef; outer: FaceRef } /* L1 wall-strip faces S7 cuts off beside the trace: inside, band + inner setback (bounded by the setback line or the
                                                intervallum); outside, band + outer setback + glacis, or the berm up to a moat; S8 never cuts them and lanes end on them (§4.6, §4.8) */;
  band: { inner: FaceRef; outer: FaceRef } /* L3 half-bands on each side of the L1 wall chain, built by bandUnion inside the strips by S10's first step (§4.7); nesting holds */; glacis?: { inner?: FaceRef; outer: FaceRef };
  thicknessCm: Cm; walkCm: Cm; heightCm: Cm; base: ChainProfile /* 'base_knot' on the trace: the wall's base elevation, one knot per trace vertex S7 places, linear between (§2.2 rule 5) */; setbackCm: { inner: Cm; outer: Cm } /* both faces unbuildable */;
  intervallum?: Id /* the lane inside the wall when the era row asks for it */; material: string;
  gates: Id[]; towers: Id[]; ditch?: Id /* the moat WaterBody along the trace: carved at S3 for the innermost enceinte, by S5a's carve for an outer one (§4.2, §4.4) */; stage: number; lifecycle: Lifecycle }
interface Gate { id: Id; enceinte: Id; junction: Id; way: Id | null /* null: a postern or water gate without an outward way */;
  kind: 'main'|'postern'|'water'|'gatehouse'|'castle'; heights: Heights; footprint: { inner: FaceRef; outer: FaceRef }; plaza?: FaceRef }
interface Tower { id: Id; enceinte: Id; vertex: VertexRef /* ('tower', id) */; radiusCm: Cm; heights: Heights; kind: 'round'|'square'|'bastion'|'octagonal'; footprint: { inner: FaceRef; outer: FaceRef } }
interface Castle { id: Id; plot: Id; reservation: Id; curtain: Id /* its own Enceinte, kind 'bailey' */; cityWeld?: [VertexRef, VertexRef] /* ('weld', castle id, 0 | 1): ends of the shared wall stretch (one edge carrying both enceintes' 'wall' roles) when on the enceinte */;
  keep: Id; keepShape: 'rect'|'square'|'octagon'|'round'|'cruciform'; keepAt: 'opposite_gate'|'highest'|'centre'; innerWard?: FaceRef; gatehouse: Id /* one town-side gate, sited at S3 on the bailey side facing the plaza by least cost (§4.2 S3) */;
  paths: Id[] /* keep ↔ gate ↔ wall stairs, 'path' ways inside the bailey */; bailey: FaceRef; moat?: Id; surround: 'none'|'esplanade'|'park'|'plaza'|'cliff'; siteScore: number; template: string }
interface Bridge { id: Id; way: Id; deck: [VertexRef, VertexRef] /* ('deck_end', bridge id, 0 | 1): the pinned bank-to-bank deck, perpendicular to the local flow or channel; its span carries the structural `deck` role; held under a warp unless fromLevel = 0 (§3.6) */;
  over: 'river'|'moat'|'castle_moat'|'canal'|'carve' /* who emitted the deck: S1, S3, S5a or a carve edit (§4.2, §4.4, §4.11) */; deckCm: Cm; spanCm: Cm; kind: 'stone'|'timber'|'draw'|'ford'; piers: number }
interface Greenery { id: Id; kind: 'park'|'garden'|'formal_garden'|'orchard'|'green'|'commons'|'avenue'|'street_trees'|'churchyard'|'market_green'|'esplanade'|'grove'
    |'wood'|'coppice'|'meadow'|'hedgerow'|'shore_band'|'ambient'|'yard_planting';
  face?: FaceRef; line?: ChainRef /* ('green_line', id): hedgerows, a role on L3 field boundaries */;
  along?: { way: Id; strip: FaceRef /* one half-corridor strip on the planting district's own side */; offsetCm: Cm } /* avenues and street trees: a row derived along the strip; no plat edge (§4.9) */;
  owner?: Id | 'commons'; rule: string; density: number;
  species: { kind: string; inner: number; outer: number; leafType?: 'deciduous'|'evergreen' /* read by §8.2's season rows; deciduous when absent */ }[] /* shares per species kind (§4.9) */;
  layout?: 'fan'|'semi_fan'|'grid'|'free' /* parks and groves, §4.9 */; paths?: FaceRef /* L3 path faces of a park layout (§4.9) */; lifecycle: Lifecycle }
  // tree instances: stamped at render from the `render.instances/<entity>` stream by ordinal (§6.1, §8.10); never stored; overrides are `instance` events (§7.1)
interface LandUse { id: Id; kind: 'arable'|'strip_field'|'meadow'|'pasture'|'commons'|'orchard'|'vineyard'|'coppice'|'wildwood'|'quarry'|'claypit'|'mine'|'lumber'|'fishery'|'saltpan'|'marsh'|'reserve';
  face: FaceRef /* L3 faces inside the hinterland's blocks: furlongs, lots, woods (§4.9) */; owner?: Id; furrowAxisCdeg?: number; crop?: string /* from the era / region crop table */; livestock?: string; rotation?: { scheme: string; slot: number } }
interface SiteResources { cellCm: Cm; ore: Float32Array; stone: Float32Array; timber: Float32Array; fish: Float32Array; clay: Float32Array; fertile: Float32Array }   // S1 output on the terrain grid, 0..1 per cell (§4.2)
interface Decoration { id: Id; kind: string /* pond, copse, stone circle, ruin, wayside shrine, boundary stone, gallows hill, … data-defined */; face?: FaceRef; point?: Point;
  trail?: FaceRef /* the L3 path face to the nearest way corridor (§4.9) */; keepClearCm: Cm; rule: string; lifecycle: Lifecycle }
interface Pin { id: Id; kind: 'well'|'fountain'|'large_tree'|'cross'|'market_cross'|'shrine'|'pump'|'gallows'|'statue'|'monument'|'bandstand'|'campfire'|'fire_pit'|'stall'|'trough'|'lamp';
  point: Point; host: Id /* the yard, square, corridor or plot face */; rule: string; lifecycle: Lifecycle }   // in the entity registry (§2.8) from M1; placed by §4.7 S11 / §4.9 rules and by stage 2 (II.3)
// Labels are model records `LabelEntity` and `QuarterNode`, defined in §9.1 (names, candidates, pinned and hidden placements; S13a)
interface Institution { id: Id; kind: string; plots: Id[]; buildings: Id[]; faction?: Id; roster: RosterRef; name: NameRef; reservation?: Id }
interface Household { id: Id /* the address: stable across re-derivation of its plot (§6.3); people are keyed by it */; plot: Id; building: Id; members: number /* size; people derived lazily */; wealth: number; tableVersion: string /* person tables at creation */ }
interface Person { id: Id; key: { household: Id; ordinal: number; bornEpoch: number }; status: 'worker'|'unemployed'|'retired'|'student'|'dependent';
  role: string; workplace?: Id; carer?: Id /* dependent → the person whose schedule it follows */; derived: true; pinned?: Partial<PersonFields> /* only by an explicit edit */ }
interface Faction { id: Id; kind: 'guild'|'religion'|'lordship'|'company'|'criminal'|'council'; seats: Id[]; turf?: Id[]; influence: number; secret: boolean;
  goals: { id: string; method: string; progress: number }[]; roles: { name: string; criteria: string; count: number }[]; template: string }
interface Government { kind: 'crown'|'seigneurial'|'ecclesiastical'|'chartered_commune'|'merchant_oligarchy'; seat: Id /* the institution */; offices: { name: string; seatClass: string; count: number }[] }
interface Religion { id: Id; name: NameRef; deities: { name: NameRef; domain: string }[]; practiceShare: number; clergyPerThousand: number; temples: Id[]; faction: Id }
// The relation store (FTG-9): schema in the base registry from M1; materialised by @plat/sim's first run, then persisted with lifecycle and reference integrity (§10.3)
interface FamilyUnit { id: Id; kind: 'couple'|'parents_children'|'single_parent'|'extended'; members: Id[]; households: Id[] }
interface Relation { id: Id; a: Id; b: Id; kind: 'partner'|'parent'|'sibling'|'carer'|'friend'|'rival'|'business'|'religious'|'affair'; since: number; lifecycle: Lifecycle }
interface Membership { id: Id; person: Id; faction: Id; role: string; since: number }
interface Posting { id: Id; workplace: Id; profession: string; filledBy?: Id; lifecycle: Lifecycle }
// The staged layers' records (owner-staged: floating islands and sewers are toggles after the city is mastered; the base carries these records empty)
interface SkyIsland { id: Id; outline: Polygon; elevationCm: Cm; terrain?: Terrain; terrainEcho?: { river?: Id /* the ground river it echoes */; relief?: 'echo'|'own' };
  key: PlatKey /* its own arena, part 1–3 (§2.2) */; districts: Id[]; reason: 'prosperity'|'institution'; institution?: Id; placement: { over: 'water'|'fields'|'outskirts'|'core'; byAssignment: boolean }; occlusion: 'opaque'|'ghost'|'offset' }
interface Tunnel { id: Id; kind: 'drain'|'main'|'culvert'|'passage'; centreline: ChainRef /* ('tunnel', id) in the underground arena */; widthCm: Cm; invert: ChainProfile /* 'invert_knot' on the centreline, below ground */; follows?: Id /* way */;
  outfall?: Outfall; serves: Id[] /* plots or buildings drained */; chambers?: FaceRef; rule: string }
```

People are never materialised in the document unless an explicit edit pins them (FTG's rule: "locked in" on manual
edit, never on view — LC-16, FTG-10): derivation is `derivePerson(seed, key, tableVersion)` under the person tables current
at the household's creation (`Household.tableVersion`), so a later table edit applies only to later households unless
the user re-derives existing people through a diffed action (§7.5 pattern). Which people a user has opened is per-user
view state outside the document. Content references geometry by id and never the reverse, so the map can be
regenerated without deleting content and content re-solved without moving the map.

**What the new wall, castle and water records settle.**
* **Open traces and the waterfront (FTG-8, COV-MFCG-C07).** An enceinte may be an open chain whose ends are anchored on a
  shore, bank, cliff or another enceinte; its enclosure is closed by the L0 shoreline for every "enclosed" and "sealed"
  test. `waterfront` is a preset row: `open` (MFCG's default and FTG's captured open chain: no wall along quays and
  beaches), `quay_wall` (a wall along the waterfront with a water gate at every quay access), `sea_wall` (a full wall
  with water gates only at the harbour mouth). `placement: 'aroundStage'` walls only a stage's new ring, anchored on the
  previous enceinte (FTG's "around stage lots").
* **Both faces unbuildable (MFP-9).** `setbackCm.inner` and `setbackCm.outer` are both unbuildable bands; the invariant
  "footprints ∩ (band ⊕ setback) = ∅ on both faces" is hard (§5.3), and ribbon plots start beyond the outer setback
  (§4.4).
* **Nesting and build order (GEO-38, NF-P5).** S7 cuts two L1 **wall strips** off the faces beside each trace — the
  band plus the inner setback inside (bounded by the setback line, or by the intervallum spine where the era row has
  one), the band plus the outer setback and glacis outside (or the berm up to a moat) — so the lane cutter never sees
  that ground: S8 does not cut a strip and its lanes end on the strip's boundary as they end on a reservation (§4.6).
  Wall bands, glacis, towers and gatehouses are `FaceRef` unions of per-side L3 parts, like corridors, built by
  `bandUnion` inside the strips by the first step of S10 for each strip block (§4.7), after S9 has committed the strips'
  corridors — so no L1 or L2 batch ever splits an L3 band face, and each part nests in the strip on its side of the wall
  edge.
* **Castles (COV-FTG-G09, COV-FTG-G10).** A castle is a reservation (§4.2 S3) with its own curtain, one town-side
  gatehouse on the bailey side facing the plaza (fixed at S3, so the castle street and a castle-moat deck exist before S4
  routes), a keep whose shape and position are template rows, internal paths
  (keep ↔ gatehouse ↔ wall stairs), an optional inner ward (an inset of the bailey with its own gate) and a surround row
  (esplanade, park with a perimeter path, plaza, cliff skirt, moat).
* **Bridges (GEO-17, NF-P4).** A bridge is a deck pinned bank to bank, perpendicular to the local flow or channel,
  emitted by whichever step makes the water: S1 at a river crossing site; S3 on the water it carves — at every gate
  across a city moat, at the castle gate across a castle moat, and along a canal at the crossing spacing row; S5a on an
  outer moat; a `carve` edit by its way rule (§4.11). Ways route to its endpoints as a fixed graph edge (§4.3), and S7
  builds the bridge furniture on it (§4.8).

**What the content records settle.** `Faction` gains goals, named roles with member criteria and a secret flag (COV-FTG-B12);
`Government` is a blueprint circumstance whose offices force seats (COV-FTG-B13, §10.2); `Religion` carries a generated
pantheon, practice share and clergy rate (COV-FTG-B14); `Person` carries a status and a carer (COV-FTG-C08); the relation
store holds family units, relations, memberships and postings (FTG-9, COV-FTG-C04). `SiteResources` makes raw-resource
availability a site property (COV-FTG-B09), `LandUse` carries crop and livestock (COV-NG-VS27), `Greenery.species` the
species mix (COV-FTG-I11), `Decoration` the hinterland decoration table's output (COV-FTG-I12), and `Pin` the complete
furniture vocabulary: statue, monument, bandstand, market cross, campfire, fire pit, stall (COV-FTG-J02, COV-NG-XB23,
COV-NG-CR23, COV-MFCG-I01, COV-FTG-J05, COV-FTG-E07). The placement rules are in §4.7 S11 and §4.9.

**The staged layers (AM-2, DEF-7).** `SkyIsland` and `Tunnel` are schema-complete hooks, empty in the base; the owner
stages both layers after the city is mastered. An island exists for one of two reasons (`reason`): a very prosperous
neighbourhood or set of neighbourhoods, or a unique institution (a palace overlooking the land, a cathedral, a prison
isolating criminals), by rule or by assignment; it may carry its own terrain that echoes the ground (a conjured river
with the ground river's bearing); it has no relation to the underground layer. A tunnel records what it drains, where it
falls (per-vertex invert) and where it discharges, so the later sewer rules (II.6) have their data model now.

=== REPLACE §4.1 Stage graph, evaluation model, laziness contract, transactions, the worker ===

### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

```
S0 Blueprint ─► S1 Site ─► S2 Programme ─► S3 Siting, reservations, stage-1 boundary + trace ─► S4 Backbone ─► S5 Stage k (for k = 1 … K) ─────────────────►
 params, sub-    terrain, L0   roster demand,    centre(s) + plazas, lattice, gate picks,      L1 arterial     S5a boundary + trace + gates (k = 1: S3's trace committed;
 seeds, auto     water, river  plot quotas per   gate routes solved, field T, stage-1          graph: S3's     outer moats carved, k ≥ 2)
 features        decks,        stage × class ×   contour, gates, castle + its gate, trace;     gate routes     S5b main-road step (new primaries for stage k)
                 resources     band              L0 carvings + their decks + ponds; L1         + the rest      S5c growth of secondaries (regime rules; district scale in walled cores)
                                                 barrier faces (plazas, precinct, castle …)                    S5d capacity check (one bounded top-up)
     ─► S6 Districts, quarters, field pass 1 ─► S7 Wall strips + fortification lines ─► S7b Allocation + district claims ─► S12a Hinterland siting (no geometry)
        perimeter, grower over coarse faces,     setback / glacis lines, intervallum,     roster → districts, hinterland,     field system, outside sites and seeds,
        typing, quarters, FieldBands             gate plazas, castle paths, quays, piers  sky (staged); claims > 1 block;     decoration sites, crops (count-driven)
                                                                                          edge orchards → hinterland
     ─► S8 Infill (per district) ─► S9 Corridors (L2; districts + hinterland) ─► S10a Block allocation + field pass 2
        bent cuts, deep interior,
        rear lanes (L1); lane ends
        on bounding spines = seam portals
     ─► per district in the derivation pool, and the hinterland unit on the generation worker, merged in lineage order:
        S10 Plots (per block; a wall-strip block's band parts first; the hinterland's furlongs, lots, driveways, trails, orchards)
        ─► S10b Placement ─► S11 Site plans + footprints (per block) ─► S12b Greenery (own faces only)
     ─► S13a Names + label candidates ─► S14 Display list ─► S15 Simulation (optional module)
        (S13b label placement is view data, computed per zoom stop with the display list, §9.2; never in the model)
```

* **The graph is built from declared I/O (COV-VG-VN-002).** Each `Stage` registration declares `{inputs, outputs,
  streamKeys, invariants with their scopes, ladder, work-limit laws (operation counts over the batch scope's
  population-derived counts, §5.1 (5)), budgetMs per rung (reporting only), batch scope, lineageUnit, op form}` (§14).
  The **op form** is the transaction form of §3.3: *callback* for the stages whose ops read the faces earlier ops made —
  S5c, S8, S10 — and *declared* for S3, S4, S5a, S5b, S7, S9, S11 and an edit's inserted feature; every other stage
  (S6, S7b, S12b and the hinterland unit's stages) registers as *callback*, which is always safe. The pipeline is the
  directed acyclic graph those
  declarations induce, topologically sorted with the stage id as the deterministic tie-break; the base's registrations
  yield exactly the order drawn above, and a cycle is a registration error caught at load. A later product may register a
  stage that the base does not have (the village's density stage before its network, its palisade before its roads —
  PART III) without editing the pipeline. Each growth stage k runs S5a–S5d in order, and the same S5 runs incrementally
  for an epoch (§4.11).
* **Order rationale.** Water before roads, *including* every carved water body — harbour basins, canals, moats and the
  hinterland's decoration ponds are carved into L0 at S3 together with the decks their crossings need, so no street is
  ever laid on ground that later becomes water and no route meets water without a deck (FTG's order, `_critic.md` C12;
  GEO-19, NF-P4, NF-P7); the one water body that follows a later wall — an outer enceinte's moat — is carved by S5a
  through the carve path of §4.11 before that stage's secondaries grow, when the only ways it meets are the arterials
  through its gates. Programme before layout (FTG: buildings and people decided before geometry — kept as the *demand*
  side; geometry answers with capacity, O7). Large claims before streets: the castle bailey, the main plazas, the market,
  church precincts and large institutions are reservations inserted as L1 barrier faces at S3, before S4 commits any way
  (MFP-3); district-level claims larger than one block are cut out at S7b, before S8 cuts lanes (FTG's landmark-first,
  FTG-3). Walls before the streets they enclose: the first enceinte is one construction at S3 — the gate routes are solved
  on the lattice first, the stage-1 boundary is the travel-cost level set over them, the gates are where the routes cross
  it, and the castle weld and the moat are placed on the trace pulled from that boundary — so no later stage recomputes a
  boundary the gates, the castle or the moat were fixed on (NF-P1); each later stage's boundary and trace are fixed in S5a,
  gates first, *before* that stage's secondaries grow, so a secondary never crosses a wall except at a gate and the
  intramural fabric inherits the wall's direction (MFCG builds its wall before its bisection; GEO-18, MFP-2). Districts and
  the first field pass before infill (the infill's block band is the district class's, J-2). The wall strips before
  infill (S7 before S8), so no lane is planned through a wall's band and setback (NF-P5). The hinterland's decisions before
  placement (S12a before S10b), so the roster's farms, mills and quarries have outside sites to go to (FTG-7). Greenery
  after site plans (it reads yards and claims).
* **The laziness contract (LC-2, FTG-1).** A stage may run lazily for a scope X (a district, a block, a tile) only if its
  output for X is a pure function of eager upstream state and X's own sub-streams, it reads no other scope's lazy output,
  and it writes nothing outside X. Everything that decides the town's *content* is eager and town-wide: S2's roster, S3's
  reservations, S6's field bands, S7b's and S10a's allocations, S12a's hinterland siting. The per-district stages that may
  run lazily or in the pool — S10, S10b, S11 and S12b, for every district and for the hinterland unit — read those
  records and their own district's sub-stream only and **write only inside their own faces**; S12b is held to the same
  rule as the others: a district plants avenue and street-tree rows only in its own half-corridor strips, and an edge
  orchard in the hinterland is a hinterland allocation row built by the hinterland unit, never by the district (§4.9;
  NF-P3). So any order of derivation — viewer order, worker order, headless order — gives the same model. S8 is eager: it
  runs in the generation worker, district by district in lineage order, and its only writes outside a district's own
  faces are the vertices where its lanes end on a bounding spine, each recorded as a `baseLane` portal in the shared
  `Seam` record (§4.6, II.1; NF-P6). The F-CUT substitution rung reads the district's allocation, never live roster
  state; S13a's names and label candidates draw from `naming/*` streams per entity and are eager for every district; label
  *placement* (S13b) is view data at every band, outside the model hash, and deterministic for a given zoom stop because
  it measures with the bundled fonts' own metrics (§9.1–§9.2).
* **The one-click first paint is the complete city LOD (SCL-4).** `generate({seed})` runs S0–S13a eagerly for every
  district and for the hinterland at city-band detail — every footprint with its wings and heights, every quarter and
  district label candidate, the hinterland's fields and the greenery faces — and S14 with S13b builds the city band's
  first frame. Laziness is restricted to what the city band does not draw: yard sub-part detail at district LOD, entrance
  glyphs, roof constructions and hatching, way names and addresses, pins below the city band, tree instances and crowns,
  stage-2 close-up detail and stage-3 compositions — each a pure function under the contract. **No rung shows a preview**
  (§8.5, J-R7): the first map is under one second with the derivation pool below for every TOWN and CITY request and for
  METROPOLIS up to ≈ 14 200 buildings; the slower first map above that knee (≈ 2.3 s at the 120 000 cap) and the
  single-worker knee (≈ 11 400 buildings) are declared in §12.5 for the owner's veto rather than hidden behind a partial
  picture (integration record, `docs/validation/fix-all/r1-integration-log.md` C-2).
* **The model digest (LC-2).** The model digest covers the eager model — everything the city LOD draws plus the
  allocation and field-band records; label placement is excluded as view data (§2.9, §6.2, §9.1; NF-D16: the document
  digest is the separate hash over the canonical bytes). CI derives every lazy output of 50 METROPOLIS seeds — every
  district's S10, S10b, S11 and S12b and the hinterland unit's, **S12b named explicitly** because its rows are the ones
  that border other districts (NF-P3) — in three random district orders and with pool sizes 0–3, and requires identical
  *derived-complete* digests (§6.5); a viewer's order can therefore never change the town.
* **Transactions: one level per batch, listed per stage (NF-P7; §3.3).**

  | stage | its batches, in order — each writes one level |
  |---|---|
  | S1 | L0: water faces, shores and banks, islets, river crossing decks (pinned bank vertices) |
  | S3 | L0: harbour basins, canals, the castle moat, the city moat, the hinterland's decoration ponds, and the decks of every channel it carves · then L1: the land reservations as barrier faces (plazas, precinct, market, castle bailey) |
  | S4 | L1: the arterial graph's spines, inserted once |
  | S5, per stage k | k = 1 — S5a L1: S3's trace with its gate vertices · k ≥ 2 — S5b L1: main roads, picked on the stage's boundary (data, no batch), then S5a L1: the trace with every arterial crossing as a gate, then an outer moat's carve batches (L1: deck bank vertices on the arterials; L0: the channel, §4.11) · every k — S5c L1: growth, then L1: the between-stage prune and trim · S5d: a top-up re-runs S5a's arc and S5c on the rim, each L1 |
  | S6 | L1: the settlement perimeter chain, then district owners and `district_bound` roles (one batch) |
  | S7, per enceinte | L1: setback and glacis lines (the wall strips), the intervallum, gate-plaza claims, castle paths and inner-ward trace, quays, piers and moles |
  | S7b, per district | L1: district claims (`claimSubFace`) |
  | S12a | none — siting decisions only; the hinterland's geometry is written by its unit's S10–S12b |
  | S8, per district | L1: lanes, rear lanes and through-alleys with their T-junction ends |
  | S9, per district and for the hinterland | L2: `corridorUnion` |
  | S10a, S10b | none — allocation and placement records; field pass 2 is a raster |
  | S10, per block | L3: in a wall-strip block, the band, setback, glacis, tower and gatehouse parts first (§4.7); elsewhere claims, plots, alleys-as-faces and residue; in the hinterland unit's blocks, furlongs, outside lots, driveways, trails, woods and edge orchards |
  | S11, per block | L4: footprints and yard parts (a row's party walls are one shared L4 edge, §4.7) |
  | S12b, per district and for the hinterland unit | L3: park and grove layouts on its own reserved green faces and residue · then L4: yard-planting parts; avenue and street-tree rows write no plat edge (§2.7 `Greenery.along`) |
  | edits | one batch per operator and level, in §7.3's chain order, validated together in the dry run (§3.3, §7.1); a conversion that must touch several levels (a carve, `wallToWay`) is a declared sequence of single-level batches (§4.11) |

  L1 is therefore written by S3, S4, S5, S6, S7, S7b and S8, in that order, and by no generation stage after S9; S10
  never writes L1 — a
  rear or back lane is decided by S8's deep-interior rule (§4.6), and a lane a user adds later is a `drawWay` edit
  through §7.3's S5 operator, whose tree scoping re-derives every finer level under it (GEO-25). Static spatial indexes
  are rebuilt at stage end, never per batch (§3.3, SCL-2); each stage's `workLimit` counts kernel operations, never
  milliseconds, and the wall-clock watchdog lives in `@plat/api`'s worker host and only reports (§5.2 F-BUDGET-TIME).
* **The generation worker, the derivation pool and the hinterland unit, decided now (DEF-16; D-18; NF-P8).** The
  pipeline runs in one generation Web Worker with transferable buffers and incremental delivery; the tile worker rasters
  tiles from the display list and the main thread composites the transferred tiles (§8.9 — nothing model-sized reaches
  the main thread; N-20), behind the worker boundary of §8.9 / §11.2. The **primary configuration** at every rung adds a
  derivation pool of up to three workers (`min(3, hardwareConcurrency − 1)`) for the per-district stages S10, S10b, S11
  and S12b, which run after the eager S10a allocation. Because the laziness contract makes each district's output a pure
  function of eager state, its allocation and its own sub-stream, districts run in parallel, each on its own
  copy-on-write overlay over a read-only copy of the arena frozen after S10a, and merge in district lineage order with a
  slot remap and their index partitions — §3.3's merge steps; any write outside a district's face set is `E_SCOPE`, and
  pool size 0 runs the same path in the generation worker. Addresses and lineage keys derive from lineage (§6.3), so no
  id ranges are reserved, and there are no shared-edge writes (district boundary edges belong to L1/L2, committed before
  S10). **The hinterland unit** — the hinterland pseudo-district's S10
  (furlongs, outside lots, driveways, trails, woods, edge orchards), S10b (outside classes and farm households), S11
  (farmstead and outside site plans) and S12b (ring supply, ambient scatter, shoreline band) — runs **on the generation
  worker while the pool workers run the districts**, on its own overlay over the same frozen arena. Its faces are the
  hinterland's L2 blocks, disjoint from every district's, so its overlay obeys the same merge rule and merges with the
  districts' in lineage order (its lineage is the hinterland pseudo-district's); from the freeze to the merge no other
  writer touches the arena. On the single-worker fallback the hinterland unit runs first, then the districts in lineage order.
  **Measurement:** M1 runs CITY with the pool and with one worker on B-CITY-lite; the pool stays primary if its p95
  ≤ 300 ms and the model digests are identical for pool sizes 0–3 on 200 seeds (§12.3); M2b repeats the single-threaded
  METROPOLIS measurement as a second check. **Pre-decided fallback:** the single-worker configuration (§12.3's fallback
  column) — also used on the low tier and in hosts that forbid extra workers; the golden suite already runs pool sizes
  0–3 and requires identical digests (§6.5, §13.2), so the switch is a configuration, not a redesign.
  *Judgment (J-P10, reconciled with J-R18 at integration):* chose the pool as the primary configuration, measured at M1
  with the single worker as the pre-decided fallback, over single-worker-first, because after the eager allocation the
  per-district stages share no writes, and the pool keeps CITY within 300 ms at its target and moves METROPOLIS's
  one-second knee from ≈ 11 400 to ≈ 14 200 buildings (§12.3, §12.5). *Judgment (J-P27):* chose to run the hinterland unit on the otherwise idle generation worker
  as one more overlay of disjoint faces over keeping the field partition as an eager L1 stage before S8, which would add
  its ≈ 12 ms to CITY's critical path (≈ 257 ms p50), because the fields are L3 content of the hinterland's own blocks and
  the generation worker waits for the pool anyway.

=== REPLACE §4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations and gate sites ===

### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

**S0 Blueprint.** `Blueprint = { version, seed, size: { rung: TOWN|CITY|METROPOLIS, population? | areaHa? | buildings?, tolerance, aspect /* 0.5–2, default 1: frame width ÷ height, §3.2 (9) */ },
intent (§7.7), site request (coast side / bearing with two arm rows, river with inflow bearing, islands and mouth, lake,
hill, …), toggles (walls, castle: 'inside'|'on_enceinte'|'outside'|'auto'|'none', castles: 0–2, plaza, temple, harbour,
farms, forests, shanty, greens, waterfront: 'open'|'quay_wall'|'sea_wall', wallPlacement, moat: 'none'|'inner'|'all'|'auto' /* the
innermost enceinte (S3) or every enceinte (outer ones by S5a's carve, §4.4) */ — MFCG's flags kept as intent),
circumstances (era, government, biome, economy, landscape toggles: fertile land, mines, quarries, fishing, logging),
style, assignments, edits }`. Parameter expansion (intent → the ≈ 200 internal parameters) is a pure function held in data
(§7.7). The blueprint's assignments and edits become log events at positions 0…k when the document is created (§2.9,
§7.7); the entry mode is the recipe field `entryMode`. **Size by population (AM-4).** The population chooses the rung by
its band (§1.1); a rung without a population takes the rung's target; a rung with a population outside its band is an
F-EDIT conflict offering the right rung (§5.2), and a population below the TOWN floor of 1 500 is routed to the village
product by `LadderRouter` (§1.1, D-33). **Auto features (COV-MFCG-A03).** Every toggle left on `auto` is resolved by a per-rung **feature table** —
P(coast), P(river), P(castle), P(castle on the enceinte), P(temple), P(harbour | coast), P(shanty), P(greens) … — drawn
once from its own concern `blueprint.features` before any other stage, never redrawn by a later rung, so "Enter" varies
the structural features the way MFCG's master switch does; every auto-resolved value is recorded in the report with its
reason (O16 b). **What the base supports, stated (COV-MFCG-Q01).** Several enceintes (§4.8); 0–2 castles (a second castle
is a citadel on the outer enceinte, by request or by the METROPOLIS row); islands, confluences and distributaries (S1);
non-circular and multi-cluster (polycentric) settlements (S3); routed non-radial arterials (§4.3); generated institutions
(S2); multi-line labels (§9); continuous zoom, save and load (§8, §2.9).

**S1 Site (O1; the mechanism that removes whole-map restarts).** (1) **Heightfield**: 5-octave fBm (VG's measured
character, `_critic-vg-ng.md` V7) with a low base frequency and a relief-character amplitude (flat / rolling / hilly /
mountainous, metres by class) plus **authored site primitives** from the request (hill, spur, valley along the river
bearing, terrace, cliff, ravine, hollow for a lake — VG's `createMount/Hollow/Ridge` idea); heights are stored in the
range and datum §2.3 declares. *Mechanism the budget assumes (§12.4, SCL-3):* the fBm is evaluated on a 32 m grid over
frame + margin; the stored raster (TOWN 5 m, CITY 8 m, METROPOLIS 10 m) is its bilinear refinement plus one fine octave
inside the built extent; slope queries at 2.5 m go through the `TerrainSampler`'s on-demand interpolation (§2.3).

(2) **Coast.** From a sea bearing (MFCG's `sea` angle kept as the request's coast bearing) and an intent (bay / headland /
straight / fjord / islands), one **closed-outline routine** draws the sea polygon. *Arms (COV-FTG-H04):* the base line is two
arms from a point near the town toward two frame edges, each arm with its own **shape** row (smooth / gentle / sharp: the
lateral amplitude and count of the arm's 3–5 control points, then a centripetal Catmull-Rom through them) and its own
**detail** row (none / bays / deep bays / rough / jagged: fBm amplitude, frequency, warp strength and, for bays, the count
and depth of indentations) — our own values, all calibratable. The base line is displaced by domain-warped fBm with an
amplitude envelope that damps detail near the town (FTG's "ease into detail") → resample → Chaikin. **Simplicity
(GEO-13):** the normal displacement at every sample is clamped to 0.8 × the local feature size on that side (the distance
from the sample to the base shape's medial axis, taken from its straight skeleton — for an open arm, the distance to the
facing arm or the frame), which keeps small islands, elongated ovals (whose end radius is ≈ b²/a) and fjords simple for any
fBm draw; if the resampled ring still self-touches, a non-zero union repairs it, the component containing the anchor (the
town side) keeps the outline's id, and every other loop is typed by rule — a land loop in the sea above the minimum islet
area is an `islet`, a water loop on land above the minimum pond area is a `pond`, anything smaller is absorbed — and
reported. Property test: 10 000 outlines per intent → 0 self-intersections, 0 untyped loops. **Contours and coast
(GEO-14):** the vector coast is authoritative; the raster is lowered below sea level on the sea side and every land cell
within two cells of the shore is raised to at least sea level + 10 cm (every sea cell at most sea level − 10 cm), and
contour lines are not model geometry: they are extracted per render tile by marching squares and **clipped to the land
faces in vector space before emission** (§8), so a contour cannot cross the shore on any coast, cliffs and sub-cell spits
included; steep-coast and cliff fixtures are in the golden suite. The same routine with a closed base curve makes lakes
(from sinks), ponds, islands (a raised closed curve) and — with `elevationCm` set — **the floating-island outline of the
LAYER hook**, which gets its own arena, `Terrain`, datum and frame (§2.2, §2.3) and may carry its own terrain from the
same S1 with a request that echoes the ground (e.g. a conjured river with the ground river's bearing; AM-2); its ground
footprint lies over water, fields or outskirts by default and over the built core only by assignment (`SkyIsland.placement`,
§2.7), and its occlusion is §8.4's `LayerSpec.occlusion`. For a standalone or sky outline the base curve comes from an **outline
template** row — disc, D-shape, lozenge, crescent, spindle — scaled to the requested area (COV-NG-N06; II.1).

(3) **Hydrology.** Priority-flood sink filling with the flat resolution §2.3 declares (a bucket-queue priority flood on the
integer heights of the hydrology grid `Terrain.hydro` over frame and margin — 16 m at TOWN, 25 m at CITY, 32 m at
METROPOLIS, §2.3, §12.4), D8 flow direction and accumulation; **rivers by descent**: the inlet on the arena's upstream edge
(frame + margin; from the requested bearing or the highest edge), so the drawn margin shows the river arriving, the
course traced by steepest descent with a lateral meander term — a Chaikin-smoothed control polyline whose knots sit
mostly on alternating sides, our own construction; VG's live course is a different one, a terrain-independent spline
through 6–7 control points laid before its terrain (COV-VG-WC2) — **the terrain carved to the course** (after the carve,
D8 is recomputed on the carved corridor and accumulation once, §2.3) so the river always
reaches the sea, a lake or the frame; width `w = w0 · acc^0.4` clamped to the class band (FTG's ≈ 31 m mean river width at
CITY is one calibration point); tributaries by the same rule from secondary inlets. **Bounds (GEO-36):** knot offsets are
clamped to half the control spacing and the course is tested for simplicity (a self-touching course is re-traced with the
offsets halved); carving is capped at `carveMaxCm` (table: 400 cm at TOWN and CITY, 600 cm at METROPOLIS) — a course that
would need more is re-routed by the F-RIVER rung (re-trace from the last good knot, then move the inlet), never trenched.
**Mouths (IMP-9, COV-FTG-H11):** `mouth: 'estuary'` is a widening width profile (`deltaRiver` in MFCG is a widened mouth,
`_critic.md` C15); `mouth: 'delta'` splits the course inside the delta zone (within the table's distance of the sea, where
the bed slope is below its threshold) into 2–4 **distributaries** at splits spaced ≥ 3 channel widths, each carrying a
share of the accumulation drawn from the `water.delta` stream (each ≥ 0.2), each of width `w0 · (share · acc)^0.4`, each
traced by descent to the sea without rejoining; a distributary that would meet another merges, and the land between
becomes a river island under rule (4).

(4) **River islands** (the parity judge's shared repair): a `river: { islands: n }` request adds a branch that leaves the
course and rejoins it after k cells, typing the enclosed land as an `islet` L0 face, **only if** the branch's separation
from the main channel stays ≥ (w_main + w_branch)/2 + the minimum islet width (table: 20 m); otherwise the island is
reported as not built. Mid-channel islets appear at reaches wider than a table threshold with a per-reach probability.

(5) **Crossing decks (GEO-17).** One function, `siteCrossings(reaches, bandM, existingDecks)`, sites crossings: S1 runs it
over every reach, S1's water operator (§7.3 (b)) over the re-traced reach only. The narrowest / shallowest reaches within
the search band (`crossing.searchBandM`, table default 120 m) become crossing sites, typed `ford` (width < table) or
`bridge_site`, with a minimum spacing (FTG's 40 m as the table default). Each bridge site is emitted as a **pinned deck**:
a bank-to-bank segment perpendicular to the local flow (the course tangent averaged over one channel width upstream and
downstream), its endpoints on the banks, its vertices pinned against every later smoothing, its span carrying the
structural `deck` role. S3's decks on the water it carves (S3 (2), (10)) have the same form.
S4 routes to the deck's endpoints as a fixed graph edge (§4.3), so "bridges within ± 10° of the channel normal" holds on
the way itself by construction.

(6) **Harbour candidates**: coast faces with depth ≥ threshold. (7) **Bank classes and bay / headland (COV-FTG-H06):**
every shore segment is classed `bay`, `headland` or `straight` (`WaterBody.shoreClass`, §2.3) by the signed curvature of the shoreline smoothed over
200 m (thresholds in a table); its bank kind — beach / rock / cliff / quay / marsh — is drawn from a per-class weight
table (our own weights) conditioned on slope and exposure (G-R5), so bays tend to beaches and headlands to rock and
cliff; the class is kept per segment for the shore decoration of §8. (8) Water faces enter L0 with `shore` / `bank` edges;
land components by flood fill (MFCG's `buildDomains`); every land component gets uses later (O14 g). **Shore setback
(COV-FTG-H07):** a table `shoreSetback` per bank kind (plots: beach 6 m, marsh 10 m, rock 3 m, cliff 5 m from the edge,
quay 0 m because quay plots front the quay way; fields: 10 m) is read by S10 and the hinterland unit (§4.9); the band is typed `shore` greenery
or commons. (9) Drainage stays queryable. (10) **Resources (COV-FTG-B09):** `SiteResources` rasters on the terrain grid —
stone from slope, rock class and cliffs; ore from relief times an fBm propensity (hills only); timber from the forest
propensity (slope and soil class, realised as woods by the hinterland unit, §4.9); fish from water adjacency and reach width; clay from low
damp river flats; fertile land from gentle, dry, non-rock ground. The S0 landscape toggles clamp a kind to zero or raise
its floor. S2's resource gates and S12a's outside sites read these rasters.

**Restart-free by design**: if a requested feature is infeasible on the drawn site, S1 adjusts inside its own ladder
(F-RIVER, §5.2) — the source moves along the frame edge, a sink is carved deeper within its cap, the course re-traces —
never the whole map.

**S2 Programme (the roster demand side; O7).** From `population` (or derived from area / buildings by the size tables):
households by wealth band, institutions (market, temple, churches per capita, guild halls, inn, mill on water, tannery;
the seats the `government` circumstance forces — a crown seat or a lord's castle or keep, a bishop's palace, a town hall
or guildhall, per §10.2, COV-FTG-B13), building demand per class from **our own** dependency tables run as the
**sequential, prefix-stable roster** of §10.2 (FTG's idea, none of its values), with resource gates read from
`SiteResources` ("no farmland → no farms, shops instead"). Outside classes (farmsteads, mills, quarries, lumber yards,
fisheries, mines) are demanded here, sited by S12a and placed on the outside plots the hinterland unit builds (FTG-7).

*Demand in plot counts (FTG-2).* Stage demand is **plot counts per class × band**: `n(c, b, k)` = the class's demand ×
the band shares × stage k's quota share. Residential band shares are the roster's household wealth shares (the character
vector shifts them); workplace bands come from the class row's lifestyle band. The stage's land is
`A_k = Σ_(c, b) n(c, b, k) · plotArea(c, b) / plotShare(regime_k)`, with `plotArea` the *plot* area of the granularity
table's band centre (§4.7; footprints and coverage are not in this formula) and `plotShare` the measured share of a
stage's land that is plots (the rest is corridors, squares, greens and residue): **dense core 0.62** — MFCG's gross lot
cover inside the wall is 0.60–0.65 at sizes 40–250 and its lots are plots in our sense (`captures/mfcg/exports-sweep-
2026-09-25/README.md`, CONFIRMED) — gapped rings 0.55, ribbon 0.45 (PLAUSIBLE). *Judgment:* chose plot counts per band with
a measured plot share over the synthesis seat's single area per class with `builtBlockShare = 1 − 0.38`, because FTG's 38 %
is footprint over lot, not plots over land, and one area per class ignores the 11× plot-size spread across bands.
**Measurement:** M-1 #5 (FTG face recovery) measures FTG's plot share; M1 measures B-CITY's own per regime. **Fallback:**
if S5d's top-up fires on more than 10 % of B-CITY seeds at a rung, the `plotShare` rows are refitted from B-CITY's
measured share per regime by one scripted pass, with a declared golden shift (§13.3).

*Stages and the walled share (MFP-6).* Stage rows per rung (a table, era-calibratable): **TOWN** 2 stages — walled core
0.90 of buildings, ribbon 0.10; **CITY** 3 — inner walled 0.55, outer walled 0.33, ribbon 0.12; **METROPOLIS** 4 — inner
0.30, middle 0.30, outer 0.28 (all walled), ribbon 0.12; the FTG cul-de-sac **suburb** regime is added only by the era or
form preset or by the shanty toggle. The share inside the outermost wall is thus ≈ 0.9 at TOWN and ≈ 0.88 at CITY and
METROPOLIS, anchored on MFCG's measured 0.87–0.92 inside the wall at sizes 40–250 with shanty towns off (sweep README,
CONFIRMED). *Judgment:* chose MFCG's walled share over the synthesis seat's 0.35–0.5 (an addition to D-2, not the owner's
era default) because a mostly-extramural default reproduces MFCG's size-80 shanty case, the wall is the town's signature
silhouette (R6), and a compact walled town with ribbons on its approach roads is the historically constrained medieval
pattern; FTG's ≈ 20 % walled preset stays reachable as a preset row, and the corpus phase recalibrates the rows. Output:
`Roster` (demand by class with area / frontage requirement classes, district affinities, wealth bands) and `StageQuotas[]`
(plot counts per class × band, land area, regime per stage: dense core → gapped rings → ribbon, plus the optional suburb;
FTG's zonal gradient, R4).

**S3 Siting, reservations, the stage-1 boundary and its trace (the large decisions, made before any street).** S3 decides
everything the first enceinte depends on in one construction and commits it in two batches — L0 (every water body it
carves, with the decks its crossings need) and then L1 (the land reservations) — before S4 commits a single way (NF-P1,
NF-P4, NF-P7).
1. **Centre(s).** Candidate centres on a coarse lattice inside the frame's middle third are scored by a rule table:
   distance to a crossing site (river towns sit at fords and bridges), to the harbour candidate, slope, elevation above the
   flood line, wind exposure, distance from the frame, plus a controlled random term; the best is the **centre / market**.
   **The site is placed relative to the river** (G-P14), so "no river through the core" cannot occur when a river is
   requested; the invariant is checked here and repaired by moving the centre, never by re-rolling. **Polycentric forms
   (IMP-9, NF-P10):** the `twin-town` and `polycentric` form rows site k = 2–3 nuclei (candidates inside the frame's middle
   half), each scored the same way, each with its own share `A_1,i` of stage 1's land (a form-row share), its own main
   plaza (2) and its own gates (4); the market sits at the highest-scoring nucleus. Nuclei are sited at least the
   **separation floor** apart: `sep_ij = τ(a₁) · (R_i + R_j) + (outer setback + glacis)_i + (outer setback + glacis)_j + g`,
   with `R = √(A_1/π)` a nucleus's equal-area radius, `τ(a)` the tip factor of the anisotropic level set — its reach along
   a road over R: table 1.2 at a = 1.3 and 1.4 at a = 1.8, above the executed 1.13–1.18 and 1.24–1.34
   (`docs/validation/bench/fixall_pipeline_r2_levelset.out`, this lane), and τ = a for any other a, a safe bound because
   the reach along a road is a times the off-road reach, which never exceeds R — and `g` one ribbon plot depth (30 m). The form
   row's separation band runs from that floor to 400 m beyond it (≈ 800–1 200 m for two 29 ha nuclei at TOWN, where the
   old band's 400 m floor left the level sets overlapping by ≈ 200 m); the ground between the nuclei is grown as an
   extramural regime in S5.
2. **Plazas and the reservations that do not read the boundary (MFP-3, GEO-19).** The **main plaza** of every nucleus
   (area band TOWN 0.25–0.45 ha, CITY 0.35–0.6, METROPOLIS 0.45–0.8, anchored on MFCG's 0.32–0.58 ha across sizes 40–250
   and the red team's 0.36–0.54 ha; a compact 4–6-vertex polygon at the nucleus aligned to the contours, compactness ≥ 0.8;
   its vertices are the attach points arterials end at, so the plaza acts as MFCG's roundabout); the **temple or
   cathedral precinct** adjacent to the main plaza by score, sized from its institution row; a separate **market square**
   when the roster asks for one (CITY and above); the **harbour basin** (a template shape: rectangle, semi-octagon,
   semi-hexagon, L wide or narrow, scaled to port demand) at the chosen harbour candidate; and **canals** along a
   least-cost line between two water bodies, each carrying crossing decks at the spacing row `canalDeckSpacingM` (table:
   150 m inside the predicted built extent, 600 m outside it), each deck a bank-to-bank segment perpendicular to the
   channel with its bank vertices pinned — the form of S1 (5)'s decks. These are planned polygons at this point: the
   lattice sees them as reservations and water (water impassable except along its decks), and they are committed in (10)
   and (11).
3. **Lattice and costs.** S4's candidate lattice and its edge costs (§4.3) are built here, once, over the planned water
   and reservations of (2).
4. **Gate picks and bearings (MFP-4, COV-MFCG-E04).** `N₁` (per nucleus) = the request, or `round(1 + 0.47 · √A_ha)` with
   A the stage-1 land — a law that reproduces MFCG's 5 / 8 / 12 gates at sizes 40 / 80 / 130 from their walled areas of
   58 / 220 / 548 ha (and 18 at size 200) (`docs/validation/bench/fixall_pipeline_mfcg_fits.out`, from the sweep README).
   Picks are **sequential nested picks** from the `gate.pick` stream on the **pick contour** — the level set of stage 1's
   land in the terrain-only field (a = 1), which serves only to score candidates: pick i scores the contour's candidate
   points by angular gap to the earlier picks, nearness to a requested bearing, terrain (saddles and valley exits score
   up, steep ground down) and a jitter, so a smaller N is always a prefix of a larger one. Each pick carries a **bearing**:
   the requested bearing it serves or, when none was requested, the least-cost outward direction from the pick to the
   frame. A polycentric nucleus's first picks are forced at the bearings of its adjacent nuclei. Where the river crosses
   the boundary, **water gates** are added (not counted in N). `N = 0` produces no gate and no external arterial through
   the wall; the sealed circuit is reported and the extramural stages are folded into the walled stage.
5. **Gate routes, solved (not committed).** For every pick: the route from its plaza's attach point through the pick to
   the frame at its bearing — the plaza-rooted Dijkstra tree to the pick, heap A\* beyond it — on (3)'s lattice with S4's
   cost function (§4.3); an island town routes to its landings, a polycentric pair gate to gate, and the harbour ↔ plaza
   route is solved here too. S4 commits exactly these routes and reuses the plaza-rooted tree for its own plaza-anchored
   routes (§4.3).
6. **The stage-1 field and boundary.** The one travel-cost field `T` of §4.4 S5a is computed here: a multi-source
   Dijkstra from the plaza(s) over (3)'s lattice with the road multiplier `1/a₁` (a₁ = stage 1's regime row: walled core
   1.3) on the lattice edges of (5)'s routes. Each node records its source nucleus, so a polycentric town's T is
   partitioned by nearest source; `t_1,i` is chosen so that nucleus i's nodes with `T ≤ t_1,i` hold its land `A_1,i`
   (exact to one cell), and the **stage-1 boundary** is that contour, Chaikin-smoothed and resampled. If two nuclei's
   regions come closer than their setbacks, glacis and `g`, the later-scored nucleus is re-sited to its next candidate
   (≤ 3 attempts); if they still come too close, the two are merged — one enceinte around their union and a **cross wall**
   along T's partition line between them (an open wall chain anchored on that enceinte at both ends, with a gate where the
   inter-nucleus route crosses it) — and the merge is reported.
7. **Gates on the boundary.** Each gate is the **first point at which its solved route, walked outward from its plaza,
   reaches `T = t_1`** — on the boundary by construction; the pick was only the route's waypoint, and the gate keeps the
   pick's identity, ordinal, bearing and route. Two routes that cross the boundary at one point (a shared run there) cannot
   both be gates: the later pick is re-drawn from its next candidate (≤ 3 attempts), then dropped and reported (F-WALL).
8. **The castle (MFP-3, COV-FTG-G09).** When a castle is requested or drawn, the **castle bailey** is sited by
   defensibility (height + water on ≥ 1 side + control of the main route, `docs/IMPROVEMENTS.md` O8 d), restricted by the
   `castle` option to inside / on / outside the stage-1 boundary, under a hard filter that no (5) route crosses the claim
   (a castle stands beside the road it controls): a 5–7-vertex polygon on a jittered circle, area band TOWN 1.0–3.0 ha,
   CITY 1.5–3.5, METROPOLIS 2.0–5.0, anchored on MFCG's plain-size castles of 1.3–3.4 ha, compactness ≥ 0.75 — MFCG's
   threshold. `on_enceinte` places it across the boundary so that exactly two of its vertices lie on the boundary — the
   **weld vertices**. The castle's **town-side gate** is fixed now, at the midpoint of the bailey side with the least-cost
   path to the plaza, so the castle street is a routable destination and a castle moat can carry its deck.
9. **The stage-1 trace.** For a walled stage 1 the registered `EnceinteStrategy` traces the enceinte here, by S5a's rules
   (§4.4): the boundary pulled to defensible ground within the 40 m band with the gates and the weld vertices pinned, then
   pinned-vertex smoothing and topology-preserving simplification. S5a commits this trace unchanged for k = 1; an unwalled
   town keeps the boundary itself as stage 1's boundary. **Test:** every gate and weld vertex lies on the committed trace
   exactly (lattice equality), and the trace departs from the boundary by ≤ 40 m everywhere. The two-construction
   mismatch this replaces — the anisotropic contour 76 m beyond the terrain-only contour at the gates and 35 m inside it
   between them, for 58 ha and five roads at a = 1.3 (147 m and 82 m at a = 1.8; `fixall_pipeline_r2_levelset.out`) —
   cannot occur, because stage 1 has one boundary.
10. **Water carvings and their decks → the L0 batch (GEO-19, NF-P4, NF-P7).** Carved into L0 here, before S4, and seen as
   water by every later stage: the harbour basin and the canals of (2) with their decks; a **castle moat** (a ring band
   around the bailey when water is within reach) with **one deck at the castle gate**, perpendicular to the moat; a
   **city moat** when the blueprint's `moat` is `inner` or `all` — a channel of the era row's width along the (9) trace,
   outside its outer half-band and a berm (table 2–5 m) — with **one deck at every main gate**, where the gate's route
   crosses the channel, perpendicular to it; and the hinterland's **decoration ponds** — the pond row of §4.9's
   decoration table (count by rung and biome), sites scored on hollows, flow accumulation and damp ground, each at least
   `pondClearM` (table: 150 m) beyond the predicted built extent `{T ≤ t_K}` and at least 30 m from every (5) route and
   planned canal. Every deck has the form of S1 (5)'s: a bank-to-bank segment perpendicular to the channel, its bank
   vertices pinned against every later smoothing, its span carrying the structural `deck` role. S4 and S5 route through deck endpoints as fixed graph edges (§4.3), and
   S7 builds the bridge furniture on them (§4.8). When a moat was carved, `T` is recomputed once over the new water (≈ 4 ms
   at CITY) for the stages k ≥ 2; stage 1's boundary is never re-derived from it.
11. **Land reservations → the L1 batch.** The plazas, the precinct, the market square and the castle bailey enter L1 as
   barrier faces carrying the `reserved` role: no way crosses them (S4, S5), S8 does not cut them, and the claimed entity
   is built inside them (§4.7, §4.8).
12. **Destinations** are typed entities: the plazas' attach points; each gate and its bearing (an **external bearing** per
   gate for a walled town; an unwalled town derives its bearings by the same law on its own land); the crossing decks
   (inside the boundary they connect in town; outside, through the nearest gate); the harbour; the castle's town-side
   gate; the precinct. **Island towns (FTG-19):** when the settlement's land component does not touch the frame, external
   destinations are shore points — the harbour, one **landing** per requested bearing (the shore point nearest the bearing
   with the best deep-water score) and a ferry point — and O4 (g) counts landings as the external connections.

*Judgment (J-P26; NF-P1):* chose to solve the gate routes at S3 and take the stage-1 boundary, the gates, the castle weld
and the moat from one travel-cost construction over the two alternatives the verifier named — a provisional boundary on
straight corridors along the bearings, which still differs from the routed arterials by their bends, and sliding the
gates at S5a, which leaves a moat carved at S3 on a line the wall no longer follows or forces water into L0 after the
arterials exist — because a moat must enter L0 before any L1 edge (§2.2 rules 3 and 6), and it can follow the real wall
only if the real wall is known then; the plaza-rooted Dijkstra and the field are the work S4 and S5a already did, moved
earlier (§12.4).

=== REPLACE §4.3 S4 Backbone — arterials routed between named destinations, built as one graph ===

### 4.3 S4 Backbone — arterials routed between named destinations, built as one graph

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

**Lattice and costs.** The lattice and its edge costs are built once, at S3 (they depend only on the frame, terrain, water
and reservations; §4.2 S3 (3)), and reused by S3's pick contour, its gate routes and its field `T`, by S4's routes and by
every S5a boundary. Arterials (`through`, `primary`) are routed between the S3 destinations on this **candidate lattice**: a
jittered hexagonal point set at ≈ 25 m spacing whose adjacency is known by construction (six neighbours per point, the
jitter bounded so no edge crosses another; no Poisson sampling, relaxation or triangulation is needed). Edge cost =
length × (1 + k_slope · slope²) × waterCrossingPenalty (impassable except along a pinned crossing deck — S1's on rivers,
S3's on the moats and canals it carves, §4.2 S1 (5), S3 (2), (10)) ×
reservationPenalty (impassable inside a reservation; the plaza and castle are reached only at their attach points and
gate) × wallCrossingPenalty (only at gates) × existingFabricCost (epoch > 0: crossing a built face costs by its class, so
growth reuses streets) × landValue. At epoch 0 the plaza-rooted Dijkstra that S3 computed for its gate routes gives every
plaza-anchored route through its shortest-path tree; a tree path that crosses a claim or water S3 added after the tree
(the castle bailey, a moat) is re-solved by heap A\*, as are routes without a plaza end and every route at epoch > 0 (with
`existingFabricCost`) (the 2017 BFS is replaced; §12.4).

**Routes.** The gate routes arrive solved from S3 (§4.2 S3 (5)), and S4 commits them without re-solving: each is split at
its gate (S3 (7)) into the inward street (its plaza attach point ↔ the gate, `primary`) and the outward arterial (the gate ↔
the frame edge at the gate's bearing, `through`), so roads leaving the walled stage = N exactly and each gate carries one
road out and one street in (MFCG's gate identity; MFP-4). Where S3 carved water across a solved route — the city moat just
outside each gate — S4 re-solves only that stretch, from the last lattice node before the channel to the first beyond it,
through the gate's deck; the deck continues the gate passage straight across the moat, perpendicular to it (NF-P4).
S4 then solves the remaining routes: crossing decks inside the stage-1 boundary connect to the nearest arterial in town
and decks outside it through the nearest gate, never through a new wall crossing; the castle's town-side gate ↔ plaza
(the castle street, across the castle-moat deck when there is a moat); the precinct's frontage ↔ the plaza side it faces;
canal decks inside the boundary ↔ the nearest arterial. Harbour ↔ plaza and island-town gate ↔ landing were solved at S3.
A polycentric town's gate-to-gate route between each pair of adjacent nuclei (solved at S3 between their forced gates,
§4.2 S3 (4)) joins their plazas through both nuclei's gates; when a pair was merged under one enceinte, the route crosses
the cross wall at its gate (NF-P10).

**One graph, then one smoothing (GEO-16).** All routes are solved first on the lattice; the arterial graph is the union of
the lattice edges they use, each edge carrying its multiplicity (how many routes share it). The graph is split into
chains at every node of degree ≠ 2 and at every pinned node (gates, attach points, deck endpoints, landings); junctions
closer than 8 m are merged *on the graph*; each chain is then simplified (Visvalingam) and smoothed (Chaikin × 2, then
curvature-limited to the class's minimum radius) **once**, with its end nodes pinned, and inserted into L1 **once** as a
spine — a `mandatory` chain carrying the `way` role (§3.6), whose attraction folds any residual near-duplicate within
26 cm into a shared stretch. Routes that share a run leaving the plaza therefore become one street, never braided near-duplicates. Class and
width come from multiplicity and betweenness on this graph (the width table is keyed by class and the class by
betweenness, O4 c); where a way's width varies along it (a widening at a market or a gate), S4 places `width_knot`
vertices at the class-change junctions (`insertChain` `opts.knots`, §3.4), so the width is a knot profile on the spine
(§2.2 rule 5). Junction rules: minimum crossing angle 30° (else deflect), **Y → T conversion** where the acute arm can
be bent within its class curvature limit (G-P5). A deck is a fixed edge of the graph: smoothing never moves its vertices
and each approach curve stays within the class radius; if an approach to a river or canal deck cannot meet the radius,
the F-ROUTE rung moves the crossing site along its reach (§5.2), while a moat deck stays fixed to its gate, whose passage
it continues straight. Test: on B-CITY, no two spines run closer than their class separation for more than
one step length; every deck's way angle is within ± 10° of the channel normal.

**Result.** Through-roads continue to the context margin with their bearings (O14); MFCG's radial gate → plaza legibility
(CONFIDENCE B7: streets converge on the plaza) with real metres and terrain (O4 a, d). Later growth stages add main roads
through the **main-road step** (§4.4 S5b), which runs this same router incrementally with every existing arterial fixed.
**S4's local operator** (§7.3): an edit re-routes an arterial only between its nearest pinned nodes (junctions of degree
≥ 3, destination nodes) on either side of the edit region, over this lattice, with every deck — a re-sited one included —
a fixed graph edge.

=== REPLACE §4.4 S5 Growth stages — boundary and wall first, main roads, then FTG-shaped growth, then a capacity check ===

### 4.4 S5 Growth stages — boundary and wall first, main roads, then FTG-shaped growth, then a capacity check

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

Each growth stage k runs four sub-steps; stage 1 commits the boundary, gates and trace S3 fixed in one construction
(§4.2 S3 (6)–(9)), and a stage k ≥ 2 takes its boundary first, then its main roads, then its trace, so every gate lies on
the boundary it was picked on (NF-P1).

**S5a Stage boundary and enceinte trace.** *Boundary (FTG-5, COV-FTG-D26):* the boundary of stage k is a level set of
**network travel cost**: `T(x)` = the least cost from the plaza(s) over the S3 / S4 lattice, where a lattice edge inside an arterial's corridor costs ρ_road per metre and any other edge ρ_off per metre,
both times the slope term; water is impassable except along decks and reservations are impassable. The **anisotropy
ratio** `a = ρ_off / ρ_road` is a stage-regime and form row — our equivalent of FTG's spoke-priority control: walled core
1.3, walled rings 1.8, ribbon 4, suburb 3, `linear-street` form 8 (our own values; FTG's measured road / non-road
90th-percentile radius ratio of 1.26–1.65 on its two captured cities is the calibration target for the extramural
stages). `T` is **one field**: computed at S3 by a multi-source Dijkstra on the lattice and edge costs with the road
multiplier applied on the lattice edges of the gate routes S3 solved (§4.2 S3 (6); ≈ 4 ms at CITY), recomputed once after
S3's L0 batch only when a moat was carved; S4's remaining routes run inside stage 1 and are not in its road set; and each
S5b's new main roads re-settle `T` incrementally, only at the nodes whose cost they lower — so no stage computes a new
field (SCL-3). **Stage 1's boundary is S3's contour, and S5a commits S3's trace for it unchanged.** For k ≥ 2, stage k's
boundary is taken from `T` **as it stands when stage k begins**, before its own S5b: the threshold `t_k` is chosen so that
the land of `{T ≤ t_k}` ∪ the enclosure of stage k − 1 equals the land of stages 1…k from S2 (lattice nodes sorted by T,
their cell areas accumulated; exact to one cell) — the union keeps the stages nested even where a moat raised T just
outside the previous wall — and the boundary is that region's outer contour, Chaikin-smoothed and resampled. S5b then
picks and routes the stage's new primaries on that boundary, and their re-settlement of `T` serves stage k + 1 onward,
so the boundary a gate was picked on is the boundary the trace passes through. On a flat, dry site a walled core is therefore compact and the outer stages stretch along the main roads;
`a` is also the control over the wide-versus-elongated balance of ribbons and suburbs. B-REF measures the land-sector r90
coefficient of variation and the road / non-road r90 ratio on ours and on FTG's payloads and requires both to be monotone
in `a` (§13.5).

*Trace (GEO-18, FTG-8).* For a walled stage the trace is fixed **before the stage's secondaries grow** — for stage 1 by
S3 (§4.2 S3 (9)), for k ≥ 2 right after S5b — by one rule set (the registered `EnceinteStrategy`): the boundary → pulled
to defensible ground within a 40 m search band (local ridges, slope breaks, river banks: a cost-surface path around the
town with a penalty for leaving high ground) with **the gates pinned** where the arterials cross the boundary (stage 1:
S3's gates, the first crossings of its solved gate routes; k ≥ 2: every crossing of an S4, earlier-S5b or this stage's
S5b arterial) and an `on_enceinte` castle **welded through its two weld vertices on the boundary** (the shared castle edge
is one wall; MFP-3; a second castle on an outer enceinte — the citadel of §4.2 S0 — is sited by S3 (8)'s rules against its
stage's boundary and entered as an L1 barrier face in that stage's trace batch, with its gate and any moat deck) → pinned-vertex Laplacian smoothing → **topology-preserving**
Visvalingam (the kernel's `simplify`, §3.4: minimum segment 20 m, no interior angle < 100°; a removal that would make the
trace touch itself, cross water, enter a reservation or move a pinned vertex is refused) → inserted on L1 through
`insertChain` as a `mandatory` chain carrying the `wall` role, gate vertices carrying `wall_gate`; on a shore or bank the
trace is attracted onto the outline, so the shared stretch is one edge carrying both roles (§3.6). Water: the trace
never crosses water except at a **water gate** where a river passes; on a coast or a river bank the trace is an **open
chain** anchored on the shore at its two ends, with the enclosure closed by the shoreline, and the preset's `waterfront`
row decides whether a quay wall or sea wall is added along the water (with a water gate at every quay access, so every
quay stays reachable through a gate) or the waterfront stays open (the default: MFCG's coastal wall stops at the water,
FTG's captured wall is an open 17-tower chain from bank to coast). `placement: 'aroundStage'` traces only the stage's new
ring as an open chain anchored on the previous enceinte. Nothing grown later can cross the trace except at a gate, and
S6 treats it as a barrier. If an inward pull would leave the stage's land short by more than the S5d tolerance, the pull
is capped at the smoothing step (reported); the F-WALL ladder's last rung (§5.2) cuts any way that still reaches the wall
at the setback band and prunes the outer stub.

*Outer moats (NF-P4).* When the blueprint's `moat` is `all`, S5a carves stage k's moat (k ≥ 2) right after committing
its trace, through the carve path of §4.11: an L1 batch places a deck's two bank vertices on every way the channel's line
crosses — at this point only arterials, each just outside one of the stage's gates, because the stage's secondaries have
not grown — and an L0 batch inserts the channel (the era row's width, outside the outer half-band and a berm) through
those vertices. Each deck is perpendicular to the channel and continues its gate's passage straight across; S7 builds
its `Bridge` (§4.8), and S5c treats the moat as water. The innermost enceinte's moat is S3's (§4.2 S3 (10)).

**S5b Main-road step (FTG-4; stages k ≥ 2 and every epoch stage).** The stage's primaries are made to match its gates:
`N_k` = the gate law of §4.2 S3 on the land inside the stage's enceinte (walled), or one primary per `mainRoadSpacingM` of
boundary (unwalled; table: 450 m at CITY). The existing arterials all continue to the frame, so they cross the new
boundary `c` times; when `N_k > c`, S5b spawns `N_k − c` radial destinations on the boundary by nested picks (largest
angular gaps first, terrain-scored like gates) and routes each with the incremental S4 router from the nearest junction on
an existing primary *outside* the previous enceinte (never through an inner wall) to the frame at its bearing; the
crossings become stage k's main gates, posterns only for an explicitly requested remainder. An outer enceinte never gets
fewer gates than arterials cross it; a request below that is raised and reported (a requested gate count applies to the
innermost enceinte, MFCG's semantics). Test: primary length per km² and the share of gates on primaries in band from
TOWN to METROPOLIS; each epoch stage whose `N_k` exceeds its crossings adds ≥ 1 primary.

**S5c Growth of the secondaries.** Inside the boundary a priority queue of proposals grows streets FTG-style (CONFIDENCE C5;
`ftg-docs-params.md` §2.2 via the proposals): each proposal `{origin junction, heading, curvature, goalHeading, class,
remainingSegments, branchCounter, priority}`, lowest priority first; step length by class (secondary 25–40 m, lane 15–25 m;
FTG's district streets persist at (L + 0.5)/2 ≈ 25–30 m, `_critic-ftg.md` F3, our tables start there).
* **Division of labour with the bent cut (MFP-2).** In **walled regimes** S5c grows only the arterial-connecting
  secondary network at district scale — proposals seeded at arterial junctions and gate plazas, separation floor
  120 / 160 / 200 m at TOWN / CITY / METROPOLIS, destination bias toward other arterials — and every lane and every
  finer intramural street comes from S8's recursive bent cut of the district polygon, which inherits the wall's and the
  shore's direction (MFCG's measured lot-orientation coherence of 0.84–0.97 within 60 m falling to 0.32–0.68 within 250 m,
  and its lots within 40 m of the wall aligned to it at a median 3.5–4.5°, are the targets §13.5 measures). In
  **extramural regimes** (ribbon, suburb, unwalled rings, the ground between polycentric nuclei) growth works at block
  scale as FTG's does. *Judgment:* chose the bent cut for the intramural fabric and FTG growth outside the walls over FTG
  growth everywhere, because MFCG's intramural signature (coherence, wall alignment, the connected three-valent alley
  mesh) comes from recursion on the district polygon and the tiebreaker favours the measured construction, while FTG's
  staged growth along roads is the historically constrained form of extramural expansion.
* **Heading model per proposal class and preset (FTG-17, FTG-6).** `ou` — a mean-reverting curvature walk:
  `κ ← ρ·κ + (1 − ρ)·κ_goal + s·√(1 − ρ²)·ξ` per step Δs, with `ρ = e^(−Δs/ℓ)` (correlation length ℓ),
  `κ_goal = (θ_goal − θ)/L_r` (reversion toward the proposal's goal heading over L_r), `s` from `headingSigma` stated in
  degrees per 100 m; organic defaults 20° per 100 m, ℓ = 90 m, L_r = 250 m; planned 5° per 100 m. Executed (this lane,
  `docs/validation/bench/fixall_pipeline_ou_heading.out`, 4 000 streets per setting): at the organic defaults a 600 m street's net turn is p50 21°, p90 50°, 0.1 %
  beyond 90°, and the per-30 m-step turn has p95 11.4°, p99 14.9° with Gaussian tails — no cliff and no curling.
  `radiusHold` — ring proposals keep the curvature 1/r of their radius about the centre with a small `s` (the `ringed`
  preset); `gridLock` — headings snap to the preset's grid table (`american`). CI tests the drift distribution per preset.
* **Branching** after `n` segments with a per-class probability, perpendicular ± jitter (FTG's `Continue`) or tangential
  to the centre (FTG's `Curve around origin`, the `ringed` preset's ring branch).
* **Destination bias**, switchable per class and preset: a proposal that can reach an unserved destination or an existing
  spine within ≈ 1.5 step lengths turns toward it (this connects the fabric and ends cul-de-sacs deliberately); it is off
  for suburb offshoots and ring proposals.
* **Legality (explicit, unlike FTG's unstated thresholds).** Minimum separation from parallel spines = the regime's
  separation; **the same clearance applies to shores, wall setback bands, reservations and the stage boundary** (GEO-37):
  a proposal running within `max(minimum block depth of the regime, separation / 2) + half its corridor` of any of them
  and within 30° of parallel is deflected or rejected, so no strip thinner than a plot depth is left; a proposal meeting
  a shore or a reservation at ≥ 30° ends there (a street arriving at the quay). A wall is never crossed except at a gate:
  a proposal reaching the setback band stops there. Snap to a junction within `0.35 · step`. **Crossings follow the
  preset's crossing matrix** (proposal class × crossed class → stop in a T, cross with a materialised crossroads, or
  deflect): organic crosses only a lower-or-equal class collinear within 6° (the rare crossroads, O4 b); `ringed` crosses
  radials with rings; `american` crosses on the grid. Reject water unless the way uses a deck; slope ≤ class limit.
  Junction rules as §4.3 with T-preference in organic regimes; the junction-degree band is a preset row (organic 4-way
  0–15 %, ringed 20–45 %, american 40–80 %).
* **Between stages:** prune dangling `secondary` chains shorter than one block width; trim only S5-grown provisional
  spines that run beyond the boundary (FTG-18) — **S4 and S5b arterials are never trimmed**. The boundary becomes the next
  stage's start.

**S5d Capacity check (FTG-2).** Right after S5c, the stage's new coarse faces are priced: built land per face = face area
minus the corridor reserve of its spines (declared half-widths) minus reservations; each face's band is the driver-only
prosperity field at its centroid (the same kernels as S6's pass 1) cut by provisional cut points computed exactly as §4.5
computes the recorded bands, over the land grown so far (S6 then records the town's `FieldBands` once, over all stages). If the land per band
falls short of the stage's demand `Σ n(c, b, k) · plotArea(c, b) / plotShare` by more than 5 % in total, **one top-up**
runs: the level set grows to cover the shortfall, S5a re-traces only the affected arc between its pinned gates, and S5c
grows the added rim — except along a moat: a moated arc is never re-traced, so a moated stage's shortfall moves to the
next stage's quota (the last stage's to the exact check below), reported. A remaining shortfall goes to the exact check after S10 (plots per class × band against the quota)
and to the F-SITING reconcile, reported (F-BUDGET-STAGE, §5.2). B-CITY sweeps `wealthLevel` ∈ {0, 0.5, 1} and asserts
population ± 5 % and the walled share inside its rung band.

**Stage regimes (a table; `StageRegime` rows per rung, era and form):**

| regime | where | block-depth band floor | separation | anisotropy `a` | heading model / bias | notes |
|---|---|---|---|---|---|---|
| dense core (walled) | stage 1 | 30–45 m (applied by S8) | 120–200 m (district-scale secondaries only) | 1.3 | `ou`, bias on | lanes come from S8; T-preference |
| walled rings | walled stages ≥ 2 | 45–70 m (S8) | 120–200 m | 1.8 | `ou`, bias on | courts and rear lanes (S8) |
| ribbon (default extramural) | outside the last enceinte along arterials | plots directly on the arterial, depth band 30–50 m, **starting beyond the outer setback / glacis** (MFP-9), density falloff by a distance-to-gate kernel (MFCG's `filterOutskirts` idea) | — | 4 | — | MFCG's outskirts: 71–85 % of its extramural buildings lie within 100 m of a gate road (red-team EXP) |
| **suburb** (FTG C10; preset, era row or shanty toggle only — MFP-6) | a final regime outside the last enceinte | 40–60 m | 80 m | 3 | offshoots, bias off | an optional **perimeter lane** (FTG-20): the previous enceinte's outer boundary offset by setback and glacis, typed `lane`, broken at arterials, seeds offshoots at a 60–90 m spacing row besides the arterial seeds; offshoots grow as `cul_de_sac` / `lane` proposals **without destination-bias termination** (deliberate dead ends), no infill below the band; plots **directly along the offshoots with small lots from the outset**, a per-plot density Bernoulli from the distance-to-gate kernel leaves gaps; calibration references: FTG's 83 cul-de-sacs, 30.00 m suburb streets, 14.70 m lot outlines (`research/ftg-capture/roadlength100/README.md` via `_critic-ftg.md`) |
| `american` / `ringed` presets | on request | — | preset | preset | `gridLock` / `radiusHold` | crossing matrix and junction band per preset; fixture: `ringed` on a flat site gives ≥ 3 closed rings with radius CV ≤ 10 % and ring × radial crossroads |

**Alternatives rejected (written, as required).** 1 *Partition seeded from a grown skeleton via Voronoi cells around the
arterials*: cell edges are again widthless, classless "streets"; fails the tiebreaker and O4 (a)–(c). 2 *Pure FTG growth
including infill*: the 15°-clamp fabric and "vaguely circular" sameness; loses the NG signature R3 requires; a queue cannot
guarantee block-size bands. 3 *Pure MFCG partition with FTG plots inside*: no destinations, no growth (the evolution hook
needs it), no metres, restart-prone water. 4 *Urban Places' base mesh*: street geometry becomes a function of mesh
resolution, which the precision tiebreaker forbids; its warp/edit affordances are obtained by the vertex arena and
`warp`. 5 *Least-cost connectors instead of growth for the secondaries* (the pipeline proposal's default): defensible
under the tiebreaker, but it leaves FTG's organic staged accretion and the measured suburb signature on the shelf, and the
owner asked for the best of both. 6 *Walls traced after growth* (this document's first version): streets grown before
the wall must then be cut or gated, and the fabric cannot inherit the wall's direction (GEO-18, MFP-2).

**The fusion risk gate (O4 f), and the fallback if it fails.** S4 + S5 + S8 infill ≤ 100 ms at CITY on reference
hardware, block-area and junction-degree distributions of the infill inside the NG-measured bands on the same district
shapes **and** MFCG's street-signature rows (orientation coherence at 60 / 120 / 250 m, wall and shore alignment by distance
band, T/Y share, intramural dead ends, blocks per ha, lots per block) inside their bands (§13.5). M0 measures this before
anything else is built (§16). If the gate fails on time, extramural growth also stops at `secondary` (`lane` becomes
infill-only everywhere) and the gate is re-run; if it fails on statistics, the infill constants are recalibrated against
the NG vertex captures and the MFCG size-sweep exports (spike M0-b) before M1. Neither fallback changes the architecture.
The gate is repeated at M1 on B-CITY-lite's river, coast and relief configurations with the reordered stages, with M1's
pre-decided fallbacks (§16; IMP-13).

=== REPLACE §4.5 S6 Districts, quarters and fields · S7b Allocation and district claims ===

### 4.5 S6 Districts, quarters and fields · S7b Allocation and district claims

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

**Perimeter.** S6's one L1 batch first inserts the **settlement perimeter** — the last stage's boundary offset outward by
the ribbon regime's block-depth band top (50 m) and rounded (FTG C17) — as a chain carrying `district_bound`, closing it
against the arterials, shores and frame it meets; every coarse face outside it belongs to the hinterland pseudo-district
and every face inside it to a grown district, so the hinterland's faces are fixed before any district is typed and no
later stage splits a district face to make hinterland (§4.9).

**Grower.** Seeds = the sited features (market, harbour, gates, castle, temple precinct, river banks, parks) plus a
density-guided remainder; a **grower** (MFCG's `DistrictBuilder` / `Grower` idea, CONFIDENCE B9) claims adjacent
coarse faces of the L1 skeleton with `validateEdge` = (no arterial of class ≥ primary, no wall trace, no water, no
reservation boundary) unless the seed kind allows it, `validatePatch` = (area within the district band, compactness ≥ 0.5,
no hole); `check4holes` → split; faces below the floor are merged into the neighbour with the longest shared edge.
**One law for count and band (MFP-10):** the district count is `N_d = round(3.5 · √(A_ha / 10))` over the settlement's land
A (FTG's 10 ha anchor sits in its middle), and the band is derived from it — `[0.5, 1.5] × A / N_d` — so the two can no
longer disagree at any size (the mean district grows as √(10A)/3.5: ≈ 7 ha at 60 ha of land, ≈ 13 ha at 250 ha, ≈ 21 ha at
600 ha). A district's `faces` is a `FaceRef`; after S8 cuts lanes inside them, the finer faces inherit the district
through `parent`, so containment is 100 % by construction (O11 b).

**Quarters (MFP-10, VIS-4) — one merge tree, one cut for the city band.** After typing, S6 builds the **quarter merge
tree** of §9.1 (`QuarterNode`) once per model: it repeatedly merges the adjacent pair of nodes with the smallest cost —
combined area, plus 1 000 ha when the two nodes' kinds are of different families (central + market, docks + riverbank,
gate + ribbon, craft + craft … share a family), plus 10 000 ha when a wall or water barrier separates them — until one root
remains, ties by id. The **quarters** are the tree's cut at `min(N_q, L)` nodes — the state after `L − min(N_q, L)`
merges, where L is the number of districts the grower produced, so the cut is every district on its own when `N_q ≥ L`
(`QuarterNode.cityCut`) — with `N_q = round(1.37 · B^0.267)`, B the roster's building count: the least-squares fit of
MFCG's district counts on its size sweep (9 / 12 / 18 / 22 / 24 districts at 1 475 / 5 242 / 13 091 / 31 951 / 48 379
buildings; `docs/validation/bench/fixall_pipeline_mfcg_fits.out`), which gives N_q = 9–10 at TOWN (1 200–1 500
buildings), 13–14 at CITY (4 500–6 000) and 17–18 at METROPOLIS (12 000–15 000). The cut takes the minimum because N_q
can exceed the district count at TOWN, where the old "`N_d − N_q` merges" was negative: N_q = 10 against N_d = 8 on MFCG's
size-40 walled land and 7 against 5 at size 24 (NF-P9, N-21). Executed (`docs/validation/bench/fixall_pipeline_r2_quarters.out`,
this lane): at the matched sizes 40 / 80 / 130 the city cut is 8 / 13 / 17 against MFCG's 9 / 12 / 18 district labels,
within ± 1 at every rung, and across the TOWN band it runs from 5 (1 500 inhabitants) to 11. The quarters are the
city-band label unit (§9.4), so the city view carries MFCG's label count — `min(N_q, L)` labels, the number §9.4's
acceptance counts — while districts keep their own names at district LOD. *Judgment (J-P28):* chose the cut at
`min(N_q, L)` over flooring the district count at N_q, because the floor moves the matched TOWN from 8 to 10 labels — no
closer to MFCG's 9 — and would shrink TOWN's districts below MFCG's own size; S13a names every node of the tree, and a zoom stop between the city and district bands may use a finer cut
(view data, §9.4). *Judgment:* chose a quarter level over thinning district labels by priority, because thinning leaves
named districts unlabelled at the view the owner compares with MFCG, whereas MFCG labels every one of its (larger)
districts; and chose one merge tree whose city cut is fixed by the count law over two mechanisms (a flat grouping here
and a label-side tree in §9), so the model and the label ladder can never disagree about what a quarter is (integration
record C-1).

**Typing (G-P5; MFP-7).** A data-driven scorer per district kind reads the roster's remaining demand per class, adjacency
(docks at the harbour, gate wards at gates, central → market / merchant, noxious crafts downstream and downwind, near the
castle → military / administration, waterfront → docks) and a random term; faces are typed **greedily from the largest**
with a **mixed-use floor** (no single-use district unless requested, R5). Kinds are **feature-named**; wealth is not a
kind — "the rich quarter" or "the poor end" is a description the naming engine derives from the prosperity field (§10.4),
so no district is zoned residential or by class. A **shanty / squalid** type is allowed only after the first half of the
stages and only outside the enceinte (FTG's staging rule); MFCG's "one prominent feature per named type" survives as the
district's `namingFeature`. The district's `fabric` is `bent-cut` unless a template is requested (PART II).

**Fields (owner: prosperity is a gradient and a band; AM-6).** The **prosperity field**
`P(x) = Σ_i w_i · kernel_i(x) + characterOffset(district) + ε(x)`, clamped once to [0, 1], with driver kernels from a table:
distance decay to the plaza / market, main streets, gates, water and the harbour (+); elevation above the flood line and
upwind (+); low, damp, downwind, flood-prone (−); walls (−); attractors at the reserved institutions (castle, precinct,
plaza); `ε` a low-frequency fBm from the field's own sub-stream with a declared share (default 0.15); smoothed by a
Gaussian of one block width (σ ≈ 60 m at CITY) so neighbours vary gradually; stored per coarse face and as a raster.
*Mechanism the budget assumes (§12.4, SCL-3):* the fields live on 32 m cells over frame + margin; each driver kernel is
splatted within its radius (or one distance transform per driver class) and the Gaussian is an O(N) three-box blur. It is
computed in **two declared eager passes** (LC-2): **pass 1** here, from the drivers that exist after S5 (the same kernels
S5d uses); **pass 2** at S10a (§4.7), adding the kernels around the noxious trades, prisons, middens and institutions the
block allocation has placed. S6's typing and S8's block bands read pass 1; S10 onward reads pass 2.
* **Bands (LC-6, FTG-2).** The cut points are computed **once per town** so that the share of built land falling in each
  band equals that band's share of the plot land the roster demands (household wealth shares × the band's plot areas,
  S2) — band capacity and band demand agree by construction — and recorded as the town's `FieldBands` (§2.5). They move
  only by an explicit edit of that record or by an epoch; a field brush never moves them. A block keeps its recorded band
  unless its value crosses a cut point by more than the hysteresis (0.02), so a replay reproduces the session's bands.
  Bands are used **only where a table needs a class**; continuous rules (coverage, plot size, greenery share, building
  scale) **interpolate linearly between band rows along the value**, so quarters blend at their edges.
* **Brush (§7.2).** A stroke is a **relative** raster Δ composited over the driver field, the sum clamped once; it
  re-derives every block whose plot samples moved by more than τ = 0.01 of the field range (the plots' `DerivationRecord`
  holds the last samples), and replay applies the same τ; strokes persist as events and survive epochs as Δ over the
  re-evaluated drivers.
* **Over time (LC-12).** An epoch re-evaluates the drivers with the new circumstances; surviving plots keep their built
  state and change only through the explicit, rate-limited transformation events of §4.11.
* **The owner rule, clause by clause (AM-6).** Continuous field: `P(x)`. Predictable drivers: the kernel table (centre,
  market, main streets, gates, water / harbour, high versus low / damp / downwind ground, noxious trades, walls, prisons,
  institutions). Controlled random component: `ε` with its declared share. Banded only where a table needs a class:
  `FieldBands`. Continuous rules interpolate: §4.7, §4.9. Dynamic over time yet predictable: epochs move the drivers,
  survivors transform by rule. Editable: the brush and `setAttr` on `FieldBands`.

The **density field** and the **greenery propensity field** follow the same construction with their own driver tables and
their own `FieldBands`. A second S6 pass applies the district-type term after typing.

**S7b Allocation and district claims (runs after S7; LC-2, FTG-1, FTG-3).** Everything that decides the town's content is
decided here, once, for the whole town, before any lane is cut:
1. **Town → districts.** The roster's demand per class × band is allocated to the districts — and, for the outside
   classes (farmsteads, mills, quarries, mines, lumber yards, fisheries), to the **hinterland** pseudo-district (§4.9
   S12a) — by capacity (each district's built land per band from pass 1) and affinity (district-kind affinity rows,
   adjacency to features, resource sites from `SiteResources`), greedy in a declared order (institutions, then large
   workplaces, then households; classes by priority then id; districts by score then id) from the town's `alloc.district`
   stream — derived from the town's lineage on demand; no allocation record stores a stream key (§2.5, §6.1; NF-D9). A
   bounded reconcile (≤ 3 rounds) moves counts between districts before any placement. The result is persisted as one
   `Allocation` per district and one for the hinterland.
2. **Sub-districts (COV-FTG-E02).** Classes carrying a cluster tag (a trade group) whose allocation in a district exceeds a
   threshold share get a `SubDistrict`; S10a gives it a contiguous group of blocks sized to its allocation, so industries
   clump inside their district as FTG's sub-districts make them.
3. **District claims (FTG-3).** Every item larger than one block — institutions whose requirement exceeds the district's
   block band, the district's share of the park and green quota (§4.9), area-bearing assignments, a castle's esplanade —
   is sized from its requirement table and cut out of the district's coarse faces with `claimSubFace` at the best
   siting score inside the district, entered as a `Reservation`; S8 cuts around it as a hole (the slit exists), S10 keeps
   only sub-block claims, and S12b builds parks only on reserved faces or residue. Test: 100 % of institutions and parks
   larger than one block placed at their requirement (O18 f).
4. **Edge greens and orchards (§4.9; NF-P3).** For every district that touches the settlement perimeter and whose band
   row carries the edge-green-or-orchard rule, S7b draws the choice — before (3) cuts the claims — from that district's
   `alloc.district` stream with the
   rung's probability (`RungProfile.greenery.edgeGreenProb`, §1.1): a **green** becomes one of the district's claims (3),
   built by its own S12b on its own faces; an **orchard** becomes a row of the **hinterland's** allocation,
   `{ cls: 'orchard', areaM2, near: district }`, built by the hinterland unit's S10 in the first ring beside that district
   (§4.9). No district stage ever writes a hinterland face.
5. **Sky pseudo-districts (owner-staged; AM-2, II.6; NF-P13).** When the island toggle is on, S7b creates each sky
   pseudo-district's `Allocation` itself — first, before (1), and before any island exists. A `prosperity` island's plot
   land is its area — drawn from `IslandRule.areaHaBand` on the `island.place` stream — × the dense core's plot share
   (0.62, §4.2 S2); it is filled from the richest band down with the roster's richest demand, each allocated household
   using its band's plot area, until the land is used or three districts' worth of households are allocated. An `institution` island's allocation holds its one institution (the `IslandInstitution` row's, or the
   assignment's). The ground's districts are then allocated the remainder, so the population stays whole. These
   allocations are S7b outputs; `SkyStrategy`, registered after S7b by declared I/O, takes them as inputs and sizes and
   places each island to hold its allocation (II.6).

=== REPLACE §4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule ===

### 4.6 S8 Infill — the measured bent cut as a kernel transaction, per district, with the deep-interior rule

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

Runs per district (one batch each, districts in lineage order in the generation worker) on every coarse face of the
district except its reservations and its wall strips — a reservation inside a face is a hole; a wall strip is a face of
its own that S8 never cuts (§4.8) — whose kerb polygon (`kerb(F)`, the kernel's single kerb function: the face minus the
buffered spines, §3.7) is larger than **the district
class's block band** (from the granularity table, §4.7, at the district's pass-1 band), floored by the stage regime's band (§4.4) — the
parity judge's sequencing repair. In walled regimes the faces are district-scale (S5c grew only arterial-connecting
secondaries), so this recursion produces every intramural lane and secondary and propagates the wall's and the shore's
direction into the fabric (MFP-2). S8 plans each cut on `kerb(F)` of the current L1 faces, inserts each accepted lane at
L1 in the district's transaction — extended to the crossed spine as a T-junction (step 7) — and recurses on the
children's kerbs; S9's `corridorUnion` then commits exactly those kerbs (the contract test "S8's working block ≡ S9's
committed block, Hausdorff 0", §13.2), so no `insetRing` by corridor half-widths is needed (GEO-20). **The wall is a
barrier (NF-P5).** S7 has already cut each enceinte's wall strips off the faces beside the trace (§4.8), so the `kerb(F)`
of a face beside a wall stops at the strip's boundary — the inner setback line, or the intervallum's kerb where the era
row has one — and no cut is ever planned through a wall's band or setback; the band, tower and gatehouse faces are built
later, inside the strips, by S10's first step (§4.7), so S8 never meets an L3 face. Test: on every walled B-CITY seed, 0
lanes cross a wall strip and 0 L3 band faces are cleared or split by an L1 batch.

**Sides (GEO-22).** Before any rule reads a side, the face boundary is reduced to **runs** (the kernel's `sideRuns`,
§3.4): maximal boundary chains whose cumulative turning stays within 10°, each with its chord direction; a crossing street's fillet arc is replaced by its
virtual corner (NG PF-1's method). "Perpendicular to a side" is measured against the run's chord, or on a curved run
against the tangent over a ± 5 m window at the contact point — never against the one short segment a cut happens to hit
on a Chaikin-smoothed, round-joined kerb. M0 (b) includes curved, round-joined, triangular, C-shaped and holed faces and
re-measures the NG signature on them before calibration.

**The recipe (MN-3; `profile-neighbourhood.md` AN-6, PF-2, BG-1 — the measured default).** Given a face F:

1. **Stop test.** `obb(F)`; if the OBB minor extent < the band's upper bound, F is a block. **Slope term (COV-MFCG-C05):** on a
   face whose mean slope exceeds 5 %, the working major axis is the OBB major axis rotated toward the contour direction by
   the weight `min(0.5, slope / 0.3)`, so cuts on a hillside run with the fall line and blocks lie along the contours
   (MFCG's one elevation effect is on exactly the alleys).
2. **Position.** Draw `f ~ N(0.5, σ)` as a fraction of the (working) major axis — σ = 0.066 on plain faces, 0.098 on holed or
   annular faces — with an outlier term: with probability 0.03 draw `f` uniform over [0.15, 0.85] instead (NG's 2–5 % tail);
   no clamp (the measured law is bell-shaped with no pile-up at a bound); `f` outside [0.1, 0.9] is redrawn once from the
   same stream. Stream `cut.t`.
3. **Start.** The minor-axis line at `f` meets F in one segment around the OBB centre's projection (for a concave face, the
   segment containing the point nearest to it); its two ends are the candidate starts, one on each long side, which defines
   the start and far sides for any face shape — triangles, C-shapes and curved faces included. A coin (`cut.side`, p = 0.5;
   the table row `cut.sideLongerBias` records NG's unconfirmed 2 : 1 lean in plain faces and defaults to 0.5) picks the
   start A. Leave A exactly perpendicular to its run.
4. **Far side.** The side hit by the perpendicular ray from A (NG's R1: right in 66 % of cuts, the best face rule measured).
   `cut.farSideAlt` (default 0) is the probability of taking the next reachable side instead. **Measurement:** M0 (b) compares
   our block-area, cut-length and junction-angle distributions with NG's on the same faces. **Fallback:** if they fail the KS
   test with R1 alone, `cut.farSideAlt` is set to 0.34 (NG's measured mismatch rate) and the test re-run; if that also fails,
   the far side is taken from the minor-axis line through A (NG's R4) — each step a table value, not a code change.
5. **Straight or bent.** If a straight cut would reach the far side within 2° of perpendicular, keep it straight along the
   mean of the two run normals (NG: 83 of 86 straight cuts join roads within 4–6° of parallel); otherwise place **one
   corner at half the perpendicular projection A–F** (F = where the first leg's line meets the far side; NG AN-4: within 0.05
   chord of the course midpoint in 96 of 120 cuts) and drop the second leg perpendicular to the far side's run. Two bends
   never (3 / 519).
6. **Fillet (COV-NG-N19).** With probability 0.53 (NG: 201 / 379, no predictor found; stream `cut.arc`) replace the corner
   by an equal-chord circular arc whose **tangent length is `r_t` × the shorter leg**, `r_t ~ N(0.73, 0.10)` clipped to
   [0.54, 0.87] (NG PF-2 e: p10 0.54, p50 0.73, p90 0.87, ρ = 0.94 with the shorter leg) — the radius follows from the
   legs, never a constant; chord steps equal and ≥ the lattice minimum edge.
7. **Ends in the model (GEO-21).** Each junction end is extended along its arrival direction from the kerb to the crossed
   spine and inserted there as a T-junction (`splitThrough`, §3.4), so the L1 face splits, the lane joins the street graph
   and the junction census, betweenness and R3 see it. NG's "stop half the crossed road's width short, square caps" is the
   renderer's stroke rule, which S9's corridor union and junction wedge produce without any model trimming. A cut end
   that meets a dead end or a hole follows §3.6's contact semantics (an antenna end becomes a T-junction; a hole is
   joined by `connectHole`, §3.4). An end that arrives at a wall strip's setback line — a boundary with no spine — stays
   there, square to the line, as a lane ends at a reservation; an end at the intervallum is a T-junction like any other.
   **Seam portals (NF-P6).** When the crossed spine bounds the district — an arterial or a boundary secondary — the
   T-junction's vertex lies on a chain two districts share, so S8 records it as a `baseLane` portal, with its
   `SeamAmendment`, in the shared `Seam` record of that boundary run (II.1): both districts' contracts read the one
   record. A planned end inside the **portal gap** of an existing portal on that spine — max(6 m, 2 × the wider lane's
   width), a table row — slides along the spine out of the gap, toward the side that keeps its arrival within 85–95°; if
   neither side does, the cut takes its next ladder rung. So two districts' lanes never meet at one boundary vertex (the
   crossroads step 10 forbids) and each portal vertex carries exactly one lane. When a re-derivation removes a lane, its
   end vertex loses its `portal` role and is dissolved and its portal and amendment leave the `Seam` record, so the spine
   reads exactly as it did before the lane (§3.4 `removeEdges`). A district's **effective scope** therefore includes, besides its own faces: its bounding ways' chains
   and `Corridor` records; the half-corridor strips on both sides and the junction wedges at the vertices its lanes create
   or remove; the neighbouring cells whose rings pass through those vertices, which change only by those degree-2
   vertices; and the `Seam` records it is party to. Every other entity of every other district stays byte-identical, and
   the locality oracle computes and checks exactly that set (§7.3; II.4). *Judgment (J-P32):* chose a portal gap that
   slides a planned end away from an existing portal over letting two districts' lane ends share one boundary vertex,
   because a shared vertex is the crossroads across a district boundary that step 10 forbids and would bind either
   district's reroll to the other's lane.
8. **Transaction and ladder (GEO-23).** Before step 1 on any face with a reflex vertex deeper than the band's plot depth (L-
   and C-shaped faces, faces wrapped round a cul-de-sac antenna), a **reflex pre-cut** splits the face perpendicular to the
   reflex vertex's longer run, and antennae are split off at their roots (FTG's fix for "internal corners"). Then
   `splitFace(F, cut)` as a transaction; reject if either child violates `minEdge`, min angle or the class's minimum block
   width — the **ladder**: (a) redraw `f` (≤ 2 more candidates; NG's ≈ 4 % "Alternative cut"); (b) the straight cut on the
   mean normal; (c) **the always-succeeding cut**: a straight cut perpendicular to the longest run through its midpoint,
   clipped to F's own component by boolean intersection (a clipped line cannot make four crossings); (d) substitution — F
   becomes a court, green or landmark block chosen from the district allocation's pending claims (NG's substitution rule,
   K6) — **only for faces ≤ 2 × the band's upper block area**; a larger face reaching (d) is cut by (c) again. No rung
   restarts anything above F. Every district reports the share of its built land left as court or green by substitution
   (soft bound ≤ 5 %), so MFCG's "empty areas inside city walls" cannot return silently.
9. **Width (COV-NG-N20).** The new way's width — one scalar per lane — is `w = a_district + b · (L + e · n_free)`: `a` drawn once per district (NG: a
   per-seed intercept), `b` a rung-table slope, L the final course length, `n_free` its free ends and `e = 0.025 ×` the
   district's median cut length (NG: ≈ 5 model units per free end against median lengths of 150–250); metres: alleys
   2–3 m, lanes 3–5 m, and a cut longer than the lane length band in a walled regime is typed `secondary`. Never narrower
   than a lower class (O4 c). Template roads (PART II) take fixed per-district widths drawn once from the district's stream.
10. **Continuation.** A cut may **continue across an existing lower-or-equal-class street** when collinear within 6° (the
   rare crossroads) — **only inside its own district**: never across a district-boundary edge (GEO-42). *Judgment:* chose
   the prohibition over a two-district transaction because per-district batches, the worker merge rule and per-district
   reroll isolation all rest on districts never writing each other's faces, and the crossroads it forgoes is rare by design.
11. **Recurse** on both children with their own sub-streams.

**The deep-interior rule (IMP-8, GEO-25).** When recursion stops and a block's local thickness exceeds twice its band's plot
depth, the district's band row chooses the interior **now, in S8**, by target shares: `court` (a hollow block, perimeter
plots around a shared court — MFCG's donut and NG's hollow block), `back_lane` (a lane spine through the middle, parallel to
the longer frontage), `through_alley` (an alley spine joining two opposite frontages), `rear_plots` (a second row of plots
reached by a passage). Default shares — poor: court 0.35, back lane 0.25, through-alley 0.30, rear plots 0.10; modest: 0.45 /
0.30 / 0.15 / 0.10; prosperous: 0.65 / 0.15 / 0.05 / 0.15; rich: 0.75 / 0.10 / 0 / 0.15 — our own values, calibrated at
M-1 on NG's hollow-block frequency in the vertex captures and MFCG's inner-lot removal in the size-sweep exports. Lanes and
alleys chosen here are inserted as L1 spines in S8's own district batch, so **S10 never writes L1** and no sibling block is
left stale; dense poor quarters get many narrow alleys and still keep courts, rich quarters keep gardens behind their
houses — from the same rule. Keep-test: the court share of deep blocks within band per class (§13.5).

**Holes (the `BisectorEx` case, C13 — ours):** a cut that would cross a hole is routed to the hole's boundary (a *slit*,
committed by `connectHole`, §3.4),
the annulus becomes simply connected, and the same ladder applies (σ = 0.098); this is the primitive the stage-2 ring
template needs (PART II). Cuts are inserted as `lane` / `alley` / `secondary` spines, so lanes are real ways in the same
graph (NG's look on FTG's substrate). Junction fillets at street corners are a style-time smoothing (Urban Places' arcs),
not a model change.

**Partition recipes (COV-MFCG-G03).** The same module exposes `PartitionRecipe` rows built only from the kernel's
`splitFace`, `radialSplit`, `ringBand` and `insetRing` (§3.4): `fan` (k radial cuts from the centroid with alley-width gaps), `semiFan` (from a boundary vertex), and `ring`
(an inset band around a court, split into segments by slit cuts, short sides first). Park layouts (§4.9 S12b) and
institution templates (cloister, quadrangle; §4.7 S11) use them.

**The strategy slot.** S8 calls `FabricStrategy.partition(district)`; the base registers `BentCutFabric`; stage 2 registers
`RingFabric`, `SquareFabric`, `StreetFabric` (G-P2, §14).

=== REPLACE §4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model ===

### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

**S9 Corridors (L2).** `corridorUnion(l1Faces)` (§3.7) — the single kerb function, the commit of exactly the kerbs S8
already cut against: each spine buffered by its half-width (round joins; square ends at gates and bridgeheads) on the
kernel's arrangement, subtracted from the L1 faces → half-corridor strips, junction wedges and **built blocks**; the main plaza is S3's reservation, typed as a `square` face; other squares come from S7b claims and are sized
from population (O7); gate plazas and forecourts from S7 (§4.8). S9 runs once per district and once for the
hinterland's faces; a wall strip's L2 is its half-corridor strips along the arterials at its gates (and along the
intervallum, where there is one) and one built block, the strip block (§4.8). Streets exist as geometry from here on;
"negative-space streets" is purely a style (§8), and the figure-ground contract of §8 fills blocks in a ground tone.

**S10a Block allocation and field pass 2 (eager, town-wide; LC-2, FTG-1).** Each district's `Allocation` (S7b) is distributed
to its blocks in three declared steps, from the district's `alloc.block` stream (keyed from the district's lineage; §2.5,
§6.1), blocks by score then id: (i) the **field-driving
classes** — noxious trades, middens, prisons and institutions below a block — are allocated first, by scores that need no
prosperity (downstream, downwind, extramural, frontage class, adjacency); (ii) **field pass 2** adds their kernels to pass 1
(§4.5); (iii) every other class — households by band, ordinary workplaces, shops — is allocated by capacity per band under
pass 2, sub-districts receiving contiguous block groups sized to their clusters (COV-FTG-E02). The result is persisted as
one block-level `Allocation` per block. From here on every district's S10, S10b, S11 and S12b — and the hinterland
unit's — is a pure function of these records and its own sub-stream, writing only inside its own faces (§4.1), so the
town's content does not depend on derivation order, viewer order or worker count.

**S10 Plots (L3) — frontage-first with the granularity law (O5 / O18), per block.**
**(0) Wall-strip blocks first (NF-P5).** A block whose `interior` is `wall_strip` (§4.8) gets no plots. Its L3 batch
commits, by `bandUnion` (§3.7), the enceinte's half-band on its side of the wall edge, the rest of the strip — the inner
setback, or the outer setback and glacis, or the berm up to a moat — as typed unbuildable residue (`setback`, `glacis`),
and its side's parts of every tower and gatehouse on its stretch of trace; the enceinte's `band` and `glacis` and each
tower's and gate's `footprint` are the unions of these parts across the strip blocks (§2.7). S9 has already committed the
strip's corridors and nothing after S10 writes L1 or L2, so no batch ever clears or splits these faces. A castle's curtain
band is built the same way inside the bailey's blocks. The hinterland unit's S10 builds the hinterland recipe of §4.9 —
furlongs, outside lots, driveways, trails, woods and edge orchards — instead of frontage-first plots.
For every other built block: (1) classify each kerb edge as a frontage by way class; (2) read the block's context (district
kind, prosperity value and recorded band, density, growth stage) → the **granularity table** gives target frontage-width and
depth bands, a join maximum and a vacancy-run share, interpolated along the prosperity value, and scaled by the rung's
`RungProfile.granularity` (frontage × and depth × on every band; the rich band's join maximum + `joinMaxDelta`; §1.1,
AM-4) — `GranularityLaw.bands` takes the rung (§14):

| band (default rows; all calibratable, J-T) | frontage width (m) | depth (m) | join max | vacancy-run share of frontage | reference anchors |
|---|---|---|---|---|---|
| poor / dense | 4–6 (log-normal, CV 0.25) | 12–20 | 1 | 0.03 | NG 95–99 % attached, party walls 39–43 % of perimeter |
| modest | 6–9 | 18–30 | 2 | 0.06 | FTG quad side median 10.3 m, footprint median 103 m² |
| prosperous | 9–14 | 25–40 | 3 | 0.08 | MFCG ≈ 18.6 lots per block |
| rich | 14–25 (joined) | 30–60 | 5 | 0.05 | "fewer, bigger buildings, bigger yards and courts" (owner) |
| institution / assigned | by requirement class | by requirement | whole block above a share threshold | — | FTG landmark-first |

(The deep-interior choice — court, back lane, through-alley or rear plots — was made by S8, §4.6; S10 reads the block's
`interior`.)
(3) **Claims first**: institutions and assignments *smaller than a block* `claimSubFace` (which may span several faces,
§3.4) the contiguous area and frontage class their requirement demands before ordinary plots are cut (larger ones are S7b
reservations already); claims-first applies to the scope of every `assign` event (§7.7), not only to recipe data; (4) **per-frontage
regions (GEO-24)**: the block (minus claims and the S8 interior) is partitioned into one region per frontage run by its
straight skeleton, each region's depth capped by the skeleton height and the band depth — if the skeleton is downgraded
(F-SKELETON), a reflex pre-cut partition (a perpendicular cut from every reflex vertex, built exactly from `sideRuns`
and `splitFace`) is used instead; the validated skeleton arcs enter the arena through `insertChain` (§3.8) — and plots are
laid as strips perpendicular to each region's frontage with widths drawn from the band and depth = min(band depth, region
depth); side lines are bent lot cuts perpendicular to the frontage arriving at the region's rear line (the creator's stated
use of the primitive for buildings, `watabou-extra-a.md` §2.1 via the proposals); because strips never leave their region,
reflex corners, notches round cul-de-sacs and the inside of tight curves cannot produce overlapping or hourglass plots —
property test on concave, notched and curved blocks: 0 overlapping or self-intersecting plots before any fallback; (5)
**corners and seams**: the corner plot takes the higher-class frontage and the shorter frontage's depth; the wedge left
between two regions becomes a corner plot when it meets the minimum width and angle, else a declared `wedge` class
(bounded < 0.5 %) or residue; (6) the residue is typed: `court` (from the S8 interior), `yard` (assigned to the adjacent
plot when its area < 1.5 × the plot), `green`, `vacant`, `shore` (the shore setback); (7) **joins and splits, one law**:
strips are cut to the band's lower end, then a merge operator joins k adjacent plots (along a frontage or back to back
keeping a frontage) up to the band's upper end, keeping `members`; poor bands stay at the lower end; both directions read the
same context vector — one code path (O18 g); (8) **vacancy runs (COV-VG-VN-170)**: runs of frontage totalling the band's
vacancy share, each at least one band frontage long, are left unbuilt from the `plot.vacancy` stream — typed `vacant`, or a
`garden` yard joined to the neighbour — so no built block is necessarily fully ringed; (9) **alleys**: slivers narrower than
the minimum plot width that connect two ways become `alley` L3 faces (S10 never inserts an L1 spine; GEO-25); (10) every plot
gets its `ContextVector`, its `DerivationRecord` and access edges (100 %, O5 a); NG's ≈ 42 % discard becomes 0 by
construction. Party walls are shared L3 edges carrying the `party_wall` role in row classes (one edge per wall, §2.2). **Unbuildable bands:** the shore setback
(§4.2 S1 (8)), the wall strips — the band, the inner setback, the outer setback and glacis (MFP-9; step 0) — and
reservations are never plotted; ribbon plots begin beyond the outer wall strip. **Exact capacity check (FTG-2):** after the last block of a stage, plots per class
× band are compared with the stage quota; a shortfall goes to S10b's reconcile and the report (F-BUDGET-STAGE).

**S10b Placement (O7; per district; the allocation honoured).** Each block's allocated classes are placed onto its plots by a
rule-based score over the plot context — noxious trades downstream and extramural (`upstream` high, outside the enceinte),
mills on water, markets and inns at tier-1 junctions or gates, religious precincts and faction turf as attractors, frontage
class, area fit — filled in descending score with capacity accounting; households take residential plots of their band
± drift. **Live-in (MFP-7):** craft and shop rows default to `liveIn`; a live-in household is sited first at its workplace
and recorded as the building's `dwelling`, so the arterial frontages are shop-houses, not workplace strips, and residential-only
blocks stay the exception; block-level acceptance measures the share of residential-only blocks, per-block use-mix entropy
and the share of trade households living at their workplace (§13.5). **Outside classes and farm households** are placed by
the hinterland unit's own S10b on the outside plots its S10 built at S12a's sites (FTG-7). A bounded **plan–fit–reconcile** loop (≤ 3 rounds) adjusts
*inside the district's allocation* where a class finds no plot (one more JOIN; a class demoted within its band; surplus
capacity typed as yards, greens or vacant plots) — placement never gives up (O18 f; F-SITING ladder) and never reaches into
another district; moving demand between districts happens only in S7b's reconcile. *Mechanism the budget assumes (§12.4,
SCL-3):* context-vector distances come from per-feature-class distance rasters (16 m) computed once per model; S10b is a
top-k over candidates pre-filtered by district affinity and requirement class, with incremental capacity. Both entry
points exist, read from `recipe.entryMode` (§2.9): content-first (default) and layout-first (thumbnails, then
populate). People are derived lazily from the household's key; **a person is
pinned only by an explicit edit, never by being viewed** (§10.3; LC-16).

**S11 Site plans and footprints (L4; O17; one batch per block).** One rule evaluation per plot, no search: the site-plan table
keyed by `class × prosperityBand × density` (interpolated) gives coverage ratio, arrangement, setbacks, separation (party
wall / slot / passage), front-line jitter (MFCG `Offset`, NG's uneven streetwall — a parameter; a jitter below `minEdge`
would collapse to zero by attraction, so the table's jitter values are {0} ∪ [25 cm, max], §3.6), yard partition and
**boundary treatments**:

| arrangement | geometry | boundary treatment (default rows) | where |
|---|---|---|---|
| row | one or more footprints end to end along the frontage; **footprint = plot ∩ the frontage band of the row depth** (a boolean intersection, GEO-26), so every party wall is the plot side line and, the block being one L4 batch, one shared edge even on bent or curved frontages; the result is stored as one `quad` wing (stepped quads on a slope) and handed to `outline()` as fixed input (§2.6; NF-P2); depth from the coverage; rear yard | frontage none (the house is the frontage); rear wall (dense) or fence | dense and poor bands, shops, workshops (NG 95–99 % attached; FTG's warehouse rows) |
| set-back compound | hall or house set back behind a forecourt; **2–5 disjoint outbuildings** (stables, workshop, chapel, barn, brewhouse) placed by a small greedy packer on the plot's OBB grid around a court | **enclosure wall** (rich, prosperous) or fence, with a **gate on the access edge** (NG's walled manor compound) | manors, inns, temples, guildhalls, farmsteads (FTG's farmstead with a driveway) |
| detached | one OBB-aligned footprint at the frontage with side yards and a path to the access edge | frontage fence, railing (rich) or hedge, with a gate; side hedges | prosperous / semi-rural bands, sparingly (R4/R5) |
| hovel | one small footprint on the frontage of a plot that is mostly bare yard | none or a hedge | squalid bands, outskirts |
| tents | 1–3 small round or rectangular footprints (6–15 m², class `tent`, roof `tent`) with a fire-pit pin, dirt surface | none | squalid and shanty districts after the first half of the stages (COV-FTG-E07) |
| institution | the claim's own template (§2.6 footprint templates, the axis-locked composer, the `ring` partition recipe for a cloister) | wall with a gatehouse gap; churchyard wall | claims |
| vacant run | no footprint | wall (dense bands) or fence | vacancy runs (S10 (8)) |

Treatments are stored as the `treatment` role on plot edges with one `PlotBound` record each (§2.2 rule 7, §2.5; a gate
opening is the sub-edge carrying the indexed `gate_opening` role instead of `treatment`, split by `splitThrough` at the
gate ends), drawn at district LOD as a stroke distinct from buildings — never
filled, at most half the building outline's weight, gaps at gates (§8) — and **walled or fenced frontage counts toward
O17 (d)'s streetwall continuity**; walls and fences export to VTT and GeoJSON (VIS-8).

The row arrangement's footprints are made here by the boolean above and passed to `BuildingGenerator.outline()` as fixed
`quad` wings, which it returns with heights and roofs and never re-fits (§2.6; NF-P2); every other arrangement's
footprints come from `outline()` itself: rectangles and L / T compositions as `rect` wings with per-wing ridge axes
(VIS-10), footprint templates and the axis-locked composer for institutions (COV-FTG-F16, COV-MFCG-G05).
**Scale (COV-FTG-F09):** footprint targets are multiplied by the district's `buildingScale` (0.5–2, continuous; FTG's
"smaller / bigger" as a district edit or an `Adjust` regeneration). **Heights** from the class tables on every wing
(floors × storey height + roof rise by pitch; eave and ridge per wing; tower heights for keeps and church towers) with the
**ground datum** `baseCm` from the terrain by §2.6's `deriveBase` (FTG-13) — carried even though the top-down view never
shows them;
entrance on the access edge 3 ± 1 m from the corridor (FTG's measured 2.99 m rule kept); roof kind by class per wing (the
style sheet chooses the construction, §8.2); **materials** from `MaterialRow` (COV-FTG-F20); **description, opening hours
and sub-locations** from the class table and the naming engine (COV-FTG-F21, FTG-11); yards partitioned into typed parts.

**Furniture pins (COV-MFCG-I01, COV-FTG-J02, COV-FTG-J05; `pin.*` streams).** The main plaza always gets one centrepiece —
statue 0.6, fountain 0.3, market cross 0.1 by default weights (MFCG places one in every market square, 60 % statues) —
offset toward the plaza's longest edge for statues and for 30 % of fountains; each gate plaza gets a well, cross or trough
with probability 0.5; every block draws one **weighted decoration row** from a deck and applies it to its unused plots and
vacancy runs (wells, pumps, troughs, large trees); **singletons** — bandstand, statue, monument — are placed once per
district in an unused plot by a deck draw, campfires in squalid districts; **market stalls** line the market square's edge
band and ring a market hall in market districts, one per ≈ 150 m² of square (≤ 40), drawn as small tents. Rendering draws
footprints, yards, boundary treatments and pins; the plot outline is an optional cadastral layer.

=== REPLACE §4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture ===

### 4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

**The trace is S3's and S5a's.** Stage 1's enceinte trace, its gates and its castle weld are fixed at S3 in one
construction (§4.2 S3 (6)–(9)) and each later stage's in S5a (§4.4), always before that stage's secondaries grow, with the
waterfront policy and open chains of FTG-8; S7 builds everything that stands on the traced wall, once per enceinte, after
S6 has typed the districts, in **one L1 batch** per enceinte — its geometry at L3 and L4 is built inside the wall strips
by S10 and S11 after S9 (NF-P5, NF-P7).

**Wall strips, band, setbacks, intervallum (GEO-38, MFP-9, COV-FTG-G07, NF-P5).** S7's L1 batch cuts two **wall strips**
off the L1 faces beside the trace. Inside: the band's half (wall thickness by era 2–3 m) plus the inner setback (table
6–10 m; MFCG's "buildings never touch the wall"), bounded by the **inner setback line** — or, where the era row asks for an
**intervallum** (`lane` on inner and outer enceintes at CITY and METROPOLIS in the high-medieval preset, `none` at TOWN),
by the intervallum spine itself, inserted here as an L1 `lane` whose kerb is the strip's edge. Outside: the band's half
plus the outer setback and glacis (table 10–20 m), bounded by the **glacis line** — or, where a moat runs along the wall,
by the moat's inner bank, the strip then being the band's half plus the berm. The lines carry the structural `setback`
role (§2.2 rule 7), run from gate to gate, stop at each gate's plaza claim or arterial corridor, and close on the
secondaries S5c stopped at the setback band, so each strip is a face of its own; the strip faces inherit their district
from the faces they were cut from and are typed `wall_strip`. S8 never cuts a strip and its lanes end on the strip's
boundary (§4.6); after S9, S10's first step builds inside each strip block the L3 half-band (`bandUnion` per side, §3.7),
the setback and glacis residue and its side's parts of every tower and gatehouse (§4.7), so nesting holds and no later
batch splits them. **Both faces are unbuildable** by construction: no plot is cut in a strip, so the hard invariant
"footprints ∩ (band ⊕ setback) = ∅ on both faces" holds, and ribbon plots start beyond the outer strip (O8 b).
*Judgment (J-P29; NF-P5):* chose to cut the strips off as L1 faces at S7 and build the band inside them after S9 over
subtracting band ⊕ setback inside `kerb(F)` while committing the band at L3 before S8, because an L3 face committed before
S8 and S9 must then be cleared or split by their L1 and L2 batches (§2.2 rule 6, §3.10 nesting), whereas an L1 strip
boundary makes the wall a barrier for the lane cutter by the same mechanism as a reservation.

**Gates — exactly N, by construction (MFP-4).** Main gates are where S4's and S5b's arterials cross the trace: N₁ gate sites
were picked in S3 and the arterials were routed through them, and each outer enceinte's gates are its S5b primaries'
crossings, so roads leaving each walled stage = its gate count and no arterial ends blind against a wall. Water gates sit
where a river passes and, under a `quay_wall` or `sea_wall` waterfront, at every quay access; the castle has one
town-side gate; posterns are a separate, road-less count added only on request. `N = 0` was honoured in S3 (no gate, no
external arterial). **Gate plazas (G-R1):** a small plaza is claimed in S7's L1 batch at each main gate inside the wall,
taking the inner strip's setback zone around the arterial (MFCG B14);
**forecourt squares** at churches and temples are typed open spaces sized by the institution's class. The F-WALL ladder
(§5.2) keeps, as its last reported rung, cutting any way that still reaches the wall at the setback band and pruning the
outer stub.

**Towers** at every trace vertex whose turn exceeds a threshold and along straight runs at a spacing (35–60 m by rung and
era; FTG's 39 m median and MFCG's tower-per-vertex are the two reference points); kind (round, square, bastion,
octagonal) by era row; heights and a ground datum per tower; each tower's footprint is built per side of the wall by the
strip blocks' S10 first step (§4.7).

**The castle (MFP-3, COV-FTG-G09, COV-FTG-G10).** The S3 bailey reservation becomes the castle's plot; its curtain is its
own enceinte of kind `bailey` along the reservation polygon, with towers at its vertices and along its runs; an
`on_enceinte` castle is already welded into the town wall through its two weld vertices (the shared edge is one wall).
A **castle template table** places: the **gatehouse** at the town-side gate S3 fixed on the bailey side facing the plaza
(§4.2 S3 (8)), with an inward spur; the
**keep** — shape `rect` (by `lir`), `square`, `octagon`, `round` or `cruciform` with corner projections, by era and rank
rows — opposite the gate, on the highest ground or central, by row; an optional **inner ward** (an inset of the bailey by
30–40 % with its own gate, its wall chain in S7's L1 batch) by rank; **internal paths** as `path` ways keep ↔ gatehouse ↔
wall stairs (S7's L1 batch; the keep and gatehouse footprints are S11's); and a **surround** row — an esplanade (MFCG's
green spacer before an inner castle, §4.9), a park with a perimeter path, a plaza, a cliff skirt on a cliff site, a moat
(carved with its gate deck at S3). The 0.75 compactness gate (MFCG's threshold, kept as a *shape check*) is checked when
S3 sites the bailey, before the trace welds to it, and **repaired in place first**, in MFCG's order: equalise the claim polygon's angles toward the regular polygon's (≤ 20
iterations), then bloat it about its centroid in 5 % steps up to its area band's top; only then re-site to the next
candidate (reported), and last a keep without a bailey (reported) — never a restart (F-CASTLE, §5.2). The claim polygon is
the target of the `warp` `equalize` and `bloat` edits (MFCG's documented castle-resize workflow). Acceptance: castle area and
compactness inside the band on ≥ 99 % of seeds with a castle requested; every re-sited castle reported. Several enceintes
(citadel, inner, outer, suburb, bailey, palisade, earthwork) are stage rows in the table; up to two castles (§4.2 S0).
Every wall carries a lifecycle for wall → ring road conversion (§4.11's `wallToWay`, a `retypeEdges` on the wall's role
set).

**Water furniture.** **Bridges** stand on pinned decks — S1's on rivers, S3's on the moats and canals it carves, S5a's on
outer moats, a carve edit's on its channel (§4.2 S1 (5), S3 (2) and (10), §4.4, §4.11; NF-P4): the deck is perpendicular
to the flow or channel by construction, S4 or S5 routed the way to its endpoints, the class comes from the way, stone or timber by era and prosperity rows,
the deck height (`deckCm`) from the two bank elevations plus a clearance row; minimum spacing 40 m (FTG); fords where the
class allows. A deck that S1's water operator re-sites keeps its `Bridge` address by §6.3's bridge row; bridges and piers
are re-based by §2.6's datum step (`deriveBase`) after a terrain stroke (§7.3 (a)). Gate passages stay open by
construction: a wall strip ends at the corridor of the way through each gate (S7 above), so the band and gatehouse parts
S10 builds inside the strips never meet that corridor, and the intervallum's corridor is the strip's inner edge.
**Harbour (GEO-19, COV-FTG-H17)**: the basin was reserved and carved into L0 at S3, before any street, so S7 builds only its
furniture on the reserved shore: a **harbour-wall row** — shape (none, one arm, two arms; following the coast or projecting)
and type (wall, wall with rocks, detached breakwater) — moles, quays as `quay` ways along the waterfront (bank class
`quay`), piers as `pier` ways at 12–20 m spacing, straight or branching, on the harbour and on the open coast, with FTG's
≈ 75 m length as a reference and timber or stone by era, each pier carrying its deck height like a bridge (read by the
shadow pass and the 3-D export, §8.4, §11.1); moles, breakwaters, quays and piers are `pier` / `quay` ways in S7's L1
batch; MFCG's `1.2 ± t` pier casing is a style. **Canals and moats** were carved with their decks at S3 (`canal` along the
chosen line; MFCG's `buildCanals` name for rivers is covered by S1), outer moats at S5a; S7 adds their quays, their bank
classes and the bridges on their decks. A carve requested later by an edit goes through the conversion path of §4.11,
whose way rule gives every arterial it meets a deck and records every cut, never a silent overwrite.

=== REPLACE §4.9 S12a Hinterland land and outside plots · S12b Greenery — the rule tables (O14 / O19) ===

### 4.9 S12a Hinterland siting and the hinterland unit · S12b Greenery — the rule tables (O14 / O19)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

**S12a Hinterland siting (eager, no geometry; after S7b, before S8; O14-core; FTG-7; NF-P7, NF-P8).** S12a makes the
hinterland's content decisions once for the town and writes no plat edge: the field-system preset and its parameters, the
land-use ring radii, the outside sites and seeds of the count-driven outside plots below, the decoration sites (ponds
excepted: they are carved at S3, §4.2 S3 (10)) and the crop rotation, all recorded in the hinterland's `Allocation` and
its derivation record. The geometry is the **hinterland unit**'s — the hinterland pseudo-district's S10, S10b, S11 and
S12b, run on the generation worker while the pool runs the districts, its faces disjoint from theirs and its overlay
committed with theirs in lineage order (§4.1) — at L3 inside the hinterland's L2 blocks (the faces outside the settlement
perimeter that S6 inserted, §4.5, with the corridors S9 committed for them). The unit's S10 partitions those blocks by the
field-system preset: **open-field strips** (long narrow faces perpendicular to lanes), **enclosed fields** (FTG-style, the
hedgerows a `green_line` role on their L3 boundaries), **farmsteads** with driveways (an L3 `driveway` face from each
farmstead lot to the nearest way corridor), **perimeter**, **along rivers**, or the MFCG/VG **sector look** (Voronoi of ring
seeds ∩ land cut by the OBB bisector, the recorded construction) as a style preset; land-use rings (gardens / closes /
orchards → fields → meadow / pasture / commons → coppice → wild wood); managed woodland by distance band and wild wood
beyond, as L3 wood faces, with forest edges by domain-warped density noise (a render-time property); every land component
gets uses (both banks, islands); the arterials continue to the frame at their bearings (S4). Fields keep the shore
setback of §4.2 S1 (8) (COV-FTG-H07). *Model and render split (SCL-3):* the model's field faces are FTG-sized furlongs
(≈ 2.5 ha; ≈ 1 600 in CITY's 39 km² margin), each carrying its crop, livestock and rotation slot — their ≈ 12 ms at CITY
runs in the hinterland unit, hidden behind the pool (§4.1, §12.4); the open-field **strips** inside a furlong are
render-time segmentation (their count and width a style and era parameter), so the strip look costs no model faces.
* **One farm table (FTG-7).** `FarmTable { arableHaPerCapita (era, with provenance), householdsPerFarmstead,
  fieldHaPerFarmstead }` is the only source of both numbers: S2 demands `farmsteads = round(arableHaPerCapita · P /
  fieldHaPerFarmstead)` farm plots and their households, and the hinterland unit's S10 gives each farmstead its fields (at
the sites S12a chose), so farmland per capita
  and the farm classes' field area agree by construction (MFCG's "not enough farms" removed). Test: 100 % of outside-class
  buildings on outside plots with occupants; farmland per capita ± 20 % of the era row and equal to the farm classes' area.
* **Count-driven outside plots (FTG-7, COV-FTG-I03, COV-FTG-B09).** The hinterland allocation (S7b) lists the outside classes
  — farmsteads, water and wind mills, quarries, mines, lumber yards, charcoal burners, fisheries, lodges — and the
  decorations below. Their sites are seeded by score on `SiteResources` (quarries on stone, mines on ore, lumber at the
  woodland edge, fisheries on the shore, water mills at a reach with fall, windmills on exposed high ground, farmsteads on
  fertile land near a lane) with a **clustering term** (a seed's score rises for each seed of its own kind within the
  cluster radius, so similar features sit together, FTG's rule) — S12a fixes the seeds; the hinterland unit's S10 then
  divides the outside land into exactly that many lots by a weighted Voronoi (power diagram with area targets) clipped to
  the land; each lot is an outside plot (L3 in the hinterland's blocks) with its yard and a `driveway` face to the nearest
  way corridor (VG's lonely houses, on purpose), and the edge orchards of S7b (§4.5 S7b (4)) are lots of their allocated
  area in the first ring beside the district they serve. The unit's S10b places the allocated outside classes and farm
  households on the outside plots.
* **Crops and livestock (COV-NG-VS27).** Every field face takes `crop` and `livestock` from the era / region crop table (our
  own rows) under a rotation scheme (three-field by default: winter grain, spring crop, fallow per furlong, each field's slot
  from its furlong index); pastures take livestock. The `lit` preset's field textures read these attributes.
* **Hinterland decorations (COV-FTG-I12).** A decoration table — rows `{kind, count by rung and biome, placement score,
  trail: yes / no, keepClearCm}` — places ponds (small closed outlines from S1's routine, carved into L0 at S3 before any
  way, clear of every solved route and of the predicted built extent, §4.2 S3 (10); NF-P7), copses (wood faces), stone
  circles, ruins (an outline footprint in the `ruined` lifecycle state), wayside shrines (one per through-road by
  default), boundary stones at the margin crossings — sited by S12a and built by the hinterland unit; a row with `trail`
  links its decoration to the nearest way corridor by an L3 `path` face; fields and woods keep back by `keepClearCm`. Our
  own rows and counts, calibratable.

**S12b Greenery (after S11; O19; owner base ruling AM-1) — the rule table.** Greenery is a rule family that reads the
prosperity value, the district kind and the greenery propensity field, never leftover space. It is **the same rule family
as coverage and plot granularity**: every share below is a band row, and the value used for a plot is interpolated along
its prosperity value between the band rows, so a quarter's greenery blends at its edges. Rows are defaults with provenance
"owner ruling + O19 answers", all calibratable (J-T), and scaled by the rung's `RungProfile.greenery` (park area per 1 000
inhabitants ×, the edge-green or orchard probability, the private-green shift; §1.1, AM-4). **S12b writes only inside
its own faces (§4.1; NF-P3):** it runs per district in the pool and for the hinterland unit on the generation worker; its
L3 batch lays parks and
groves on its own reserved green faces and residue, then its L4 batch types yard-planting parts; avenue and street-tree
rows are `Greenery` entities along its own half-corridor strips (`Greenery.along`, §2.7) — derived rows that write no plat
edge — and the hinterland's rows are the hinterland unit's:

| rule | reads | fires when | places (typed, owned entities) |
|---|---|---|---|
| yard planting by plot class | site plan, value | every plot | row → rear kitchen garden (≥ modest), else bare / midden; compound → formal or kitchen garden + orchard part; detached → garden; hovel → bare, pen or midden; institution → forecourt / churchyard |
| formal gardens | value | compound plots: share rising from 0 at the modest band's centre through 0.3 at the prosperous centre to ≥ 0.6 in the rich band | `formal_garden` yard parts (grid layout) |
| parks and ornamental grounds | value, institutions, `greens` | rich or planned districts: **0.4–0.8 ha of park per 1 000 inhabitants of the district**, only on S7b reserved faces or residue ≥ 0.3 ha; palace / cathedral close / monastery: an ornamental claim of 0.5–2 ha | `park`, `garden` faces owned by the institution or the commons |
| avenues | way class, value, planned flag | tier-1 ways (`through`, `primary`) bounding or crossing rich or planned districts; prosperous districts with probability 0.5 (the district's `greenery` stream) | `avenue` rows at 8–12 m spacing in each qualifying district's **own** half-corridor strip: a boundary way gets a row on each side whose district's rule fires — both, one or neither (NF-P3) |
| street trees (COV-FTG-I09) | way class, value | `secondary` streets in prosperous and rich districts with probability 0.3 | `street_trees`: one row at 10–14 m in the half-corridor strip of the wider side (by corridor half-width; ties: the side left of the way's direction), planted only by that side's district when its rule fires |
| edge green or orchard | value, position | modest districts touching the settlement perimeter: S7b draws the choice (§4.5 S7b (4)) — a `green` / `commons` claim of 0.1–0.3 ha inside the district at its edge, **or** an `orchard` of 0.2–0.5 ha as a hinterland allocation row in the first ring beside it | the green: built by the district's S12b on its claim; the orchard: built by the hinterland unit's S10 — both owned by the commons |
| churchyard | institution | every church / temple plot: a `churchyard` part ≥ 30 % of the plot's yard | yard part |
| market green | era preset | an unpaved market square (era table) | `market_green` |
| castle esplanade (MFP-11) | castle surround row | an inside or inner castle: a 20–40 m green spacer between the bailey and the town | `esplanade` |
| poor quarters | value | little: yard planting on ≤ 15 % of plots; **a tree by the well** (a pin rule at squares and wells) — charm, not zero | yard parts, pins |
| hinterland ring supply | O14 rings | orchards in ring 1, commons in ring 3, coppice in ring 4 (the hinterland unit) | `orchard`, `commons`, `coppice` |
| ambient scatter (COV-FTG-I09) | land use, biome | pasture, meadow and commons: 0.5–2 single trees per ha by biome row, clumped by a cluster process — each unit on its own land-use faces | `ambient` |
| shoreline band (COV-FTG-I09) | bank kind, biome | round ponds and lakes where the bank is not a quay or a beach: a 5–15 m tree band — each unit on its own faces along the shore | `shore_band` |
| trees at render | ecology, species | every green entity: instanced by §8.10's ranked tile stamp (woods, gardens, parks, copses: wood 3–5 m, garden 4–6 m) or a jittered grid (orchards 6–8 m, avenues and hedgerows 8–12 m), keyed by entity and instance ordinal from the `render.instances/<entity>` stream (§6.1) — positions independent of the LOD band; crown diameters in metres consistent with building sizes; species from the entity's mix | never stored; overrides are `instance` events (§7.1) |

* **The `greens` toggle (MFP-11).** `on`: the park row fires in every band at a floor rate (0.1 ha per 1 000 inhabitants in
  modest districts, 0.05 in poor) and one park district is seeded per 25 000 inhabitants regardless of wealth (MFCG grows
  its park districts independently of wealth); `off`: parks and park districts are not generated, yard planting and every
  other row unchanged; `auto`: the feature table (§4.2 S0). The resolved mapping is written to the report.
* **Park layout (COV-MFCG-I03, COV-MFCG-G03).** A park's inside is laid by a `PartitionRecipe` (§4.6): a radial `fan` of
  groves with alley-width paths when its compactness is ≥ 0.7, otherwise a `semiFan` from the vertex at its longest edge
  (MFCG's rule), plus a perimeter path (FTG's); groves are `grove` L3 faces and the paths L3 `path` faces (the fan's
  alley-width gaps and the perimeter band), not ways, so S12b never writes L1 after S9; formal gardens use a grid.
* **Species and climate (COV-FTG-I11, COV-FTG-I15).** A `ClimateTable` row per biome (temperate-deciduous,
  temperate-coniferous, mixed, maritime, arid, cold — the biome is a circumstance, §7.7) sets the ground-cover role, the
  tree-species mix with separate inner and outer shares for woods (e.g. a coniferous interior with a deciduous edge), the
  default field system and farm layout, the default roof form and pitch, and the scatter densities; `Greenery.species`
  carries each entity's resulting mix, which the crown symbols and the orchard kinds read. Our own rows.

Acceptance (O19, adopted): (a) Spearman(prosperity, private green share) ≥ 0.7 within ± 5 points of the table mean,
σ ≤ 8 across seeds; (b) public-green rule satisfaction ≥ 95 % and park / green area per 1 000 inhabitants within its
band, reported; (c) 100 % of greenery typed and owned or common, untyped leftover green = 0; (d) tree scatter NN p1
above the canopy threshold and a pair-correlation per class; (e) ≥ 10 000 trees within a 16 ms frame at district LOD
(restated per rung and tier in §12.7);
(f) the greenery control monotone and continuous (§7.8); (g) city-zoom greenery passes the legibility check and no
option coupling drops the layer. Restraint: calm at city zoom (area fill → crowns → lobed trees by LOD; avenues are not
drawn at the city band, §8.5); the `grove`
tag and VG's dramatic forest kept as options; trees a layer toggle.

**The owner rule, clause by clause (AM-1).** Trees and greens here and there: the poor-quarter tree-by-the-well pin, edge
greens, street trees, ambient scatter. Parks: the park row with its per-capita band and the `greens` toggle. Artificial
landscapes — formal gardens, orchards, avenues, ornamental grounds: their rows. Placed by rules reading prosperity and
district type: every row's `reads` column and the interpolated band rows. Rich quarters gardens, parks and tree-lined ways;
modest ones a green or an orchard at the edge; poor ones little: the rows' band conditions. Yard planting follows the plot
class: the first row. Same rule family as coverage and plot granularity: band rows interpolated along the prosperity value.

=== REPLACE §4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base) ===

### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

**The one built path: add a growth stage (GEO-27, LC-12, FTG-4, FTG-14).** `grow(doc, epochInputs)` appends an `epoch`
event to the log and runs at that log position (§7.1, §7.4), on the persisted
model with the epoch sub-stream: S2 (**delta demand** = the suffix of the sequential roster between the old and the new
population, §10.2 — prefix-stable, so no survivor's use is withdrawn by arithmetic) → S5 for the new stage (S5a the boundary
grown from the previous one and, if walled, its trace and gates; **S5b the main-road step**, the incremental S4 router with
every existing arterial fixed, so each epoch can add main roads; S5c growth with the **built-face legality class** below;
S5d) → S6 (districts extend over the new faces, existing districts keep their ids; the field's drivers are re-evaluated
with the new circumstances and the brush strokes kept as Δ) → S7 (the new enceinte's furniture) → S7b (allocation of the
delta demand only, to new faces and to transformed plots) → S12a (outside plots for new outside classes) → S8–S13 on new
faces only.
* **Built-face legality (GEO-27).** In an epoch, a growth proposal may not cross a face holding footprints unless it runs
  along plot boundaries or back lanes (the `existingFabricCost` of §4.3 applies to S5c as well, pricing a route along plot
  lines far below one through buildings) or a declared `demolish` conversion is chosen at its table cost (by building class
  and age), recorded as events. Plots cut by a new corridor are re-cut through the conversion path — buildings that still
  fit are kept, the others demolished with lifecycle events — never re-derived from scratch.
* **Survivors (LC-12).** Surviving plots and buildings keep their built state. A re-evaluated field acts on them **only
  through explicit, rate-limited transformation events** chosen by rules and drawn from `…/epoch=e` streams: `densify` /
  `subdivide` when a plot's value has risen past a cut point by more than the hysteresis, `amalgamate` when neighbours
  join, `rebuild` (a class upgrade), `decay` when the value has fallen past a cut; at most a table share of a district's
  plots transforms per epoch (default 10 % per decade). A transformed entity's `DerivationRecord` is updated; every other
  plot keeps its record, so "Regenerate (keep settings)" on an untouched block reproduces it byte for byte, and re-deriving
  it with the new field is the explicit `Adjust`. Siting across epochs places only delta demand, only on new or
  transformed plots.
* **Test (M4).** On a town with walled, ribbon and suburb regimes, adding a stage re-rolls 0 survivors, adds ≥ 1 primary when
  its gate law asks for one, and replays from the log to the session hash.

**Conversions** are typed plat operations with recorded events. `ConversionOp` is defined here, once; §7.1's `convert`
event carries it, and `build` below is §7.1's `build` event:

```ts
type ConversionOp =
  | { op: 'wallToWay'; enceinte: Id; widthCm?: Cm } | { op: 'gateToJunction'; gate: Id; square?: boolean }
  | { op: 'outskirtToDistrict'; region: { ring: Polygon; key: PlatKey } /* the outskirt faces it covers; no stored slots, §2.2 rule 5 */ } | { op: 'demolish'; id: Id } | { op: 'densify'; district: Id; band: string }
  | { op: 'subdivide' | 'amalgamate'; plots: Id[] } | { op: 'rebuild'; building: Id; cls: BuildingClass }
  | { op: 'build'; plot: Id; cls: BuildingClass; footprint?: Polygon } | { op: 'carve'; kind: 'canal'|'moat'|'harbour_basin'; polygon: Polygon }
  | { op: 'abandon' | 'decay' | 'ruin' | 'robStone' | 'clear' /* removed to a footprint trace */; building: Id } | { op: 'plotToGarden'; plot: Id } | { op: 'contractWall'; enceinte: Id; trace: Polygon };
```

`wallToWay(enceinte)` is `retypeEdges(ChainRef('wall', enceinte), add ('way', the new ring road), remove 'wall')` — the
wall chain becomes the spine of a `primary` way with a ring-road width, on the same edges; the wall strips' setback and
glacis lines are removed, so the strips merge into the faces beside them, their band, tower and gatehouse faces are
cleared with the rest of their finer content, and S9's `corridorUnion` re-derives the ring road's corridor there; towers
are removed; gates become junctions with a `square` option. **Clearance (GEO-38):** the new corridor needs half its width on
each side of the old wall line; where the half-band plus setback on a side is narrower, plots meeting the new corridor are
clipped along its edge — a plot keeps its id when its frontage anchor survives (O8 g), footprints that no longer fit are
demolished with lifecycle events (cause `convert:wallToWay`).

**`carve` — a canal, moat or basin added by an edit, or an outer moat by S5a (§4.4) — and its way rule (NF-P14).** The dry
run lists every way whose corridor meets the carve polygon ⊕ its bank setback, and a rule by class decides each one's
fate, recorded as lifecycle events with cause `convert:carve`:
* **kept with a pinned deck** — every `through` and `primary` way, and any other way that is the only connection of the
  streets on its far side to a gate or the plaza: the stretch across the channel is re-routed by §7.3's S4 local operator
  between its nearest junctions on either side so that it meets the channel perpendicularly, through a deck of S1 (5)'s
  form placed at the crossing, and S7's rules give the deck its `Bridge` (events: `altered` on the way, `built` on the
  bridge);
* **cut** — every other `secondary`, `lane`, `alley`, `cul_de_sac`, `track` and `path`: the stretch inside the channel's
  bank setback is removed and a remainder that now dangles shorter than one block depth is pruned (events: `altered`,
  `demolished`); where a cut leaves a plot without an access edge, the local S5 operator re-routes a lane around the
  channel inside the affected L1 cells, or F-PLOT's access rung inserts an alley, and a plot that still has none is
  demolished with its buildings (F-REDERIVE, §5.2);
* `quay` and `pier` ways are kept where they meet the new water at ≥ 30° (a quay or a landing) and cut otherwise.

The carve runs as a declared sequence of single-level batches (§3.3): (1) an L1 batch places the deck bank vertices on
the kept ways and the cut points on the others, removes the cut stretches and clears the finer content of the L1 cells the
channel ⊕ setback meets; (2) the L0 batch inserts the channel ring, which meets finer edges only at the vertices (1)
placed (the kernel's coarse-insertion rule, §3.6); (3) an L1 batch inserts the re-routed ways; (4) S9–S11 re-derive the
cleared cells by tree scoping (§7.3). At S5a the channel of an outer moat meets only the arterials through its gates, so
(1) places a deck on each and nothing is cut. Every touched entity's lifecycle records the event with its cause; nothing
outside the touched cells changes (the O18 (g) / O2 (c) perturbation test is the check). *Judgment (J-P30):* chose a way
rule by class — decks for arterials and for sole connections, cuts for the rest — over re-routing every way around the
new water, because a town keeps its through-roads across a new moat or canal by bridging them, while lanes that simply
end at a new bank are what a carve does to a street pattern.

**Coherence from one seed** (owner): epoch N+1 is derived from epoch N's persisted state, the inputs and the seed's epoch sub-stream
`…/epoch=<n>`; the same town under different inputs has different histories and under the same inputs the same history;
nothing that survives is re-rolled, because a survivor keeps its lineage and its derivation record (§6.3, §7.3).

**The evolution engine is the owner's later stage (DEF-8); its hooks are concrete now.** The owner's history — growth,
regression and growth again: houses emptied and robbed for stone, plots turned to gardens, a shorter wall ring inside the
old one, ruins left standing — is expressed with the base's own records: the transformation and conversion kinds above
(`abandon`, `decay`, `ruin`, `robStone`, `plotToGarden`, `contractWall`), the lifecycle history on every entity, the epoch
streams, the circumstances timeline (§7.7) and the sequential roster (a population fall selects its suffix in reverse
ordinal order; a decline rule table — periphery, lowest value, noxious and extramural first, never locked or assigned —
chooses which buildings empty). The engine plugs in behind one interface, and the base registers only its own path:

```ts
interface EpochInputs { years: number; populationTarget: number; circumstances: CircumstanceSlice; events: { kind: string; params: Record<string, number> }[] }
interface EvolutionStrategy { plan(doc: Document, inputs: EpochInputs, tables: TableView, rng: Stream): KernelResult<(ConversionOp | EditEvent)[]> }   // registered by name (§4.12)
// base registration: 'grow-by-stage' — the path above; the owner-staged engine registers its own strategy and reuses every event kind
```

The base builds and tests exactly one path — **add a growth stage to an existing town** — at M4 (G-P13), because it is the
same path "regenerate this area" uses.

=== REPLACE §4.12 The strategy interface, stage registration by declared I/O, and the stage-2 seam (pointer) ===

### 4.12 The strategy interface, stage registration by declared I/O, and the stage-2 seam (pointer)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

Every layout stage runs behind a strategy in the registry (§14): `TerrainStrategy`, `CoastStrategy`, `RiverStrategy`,
`ManifestStrategy`, `NetworkStrategy` (the fused base; `american` / `ringed`; a village would add a tracker walk),
`EnceinteStrategy` (the base's S5a pull-and-simplify; a village's palisade), `FabricStrategy` (`BentCutFabric` now; NG's
templates at stage 2), `PlotStrategy`, `SitePlanStrategy`, `BuildingGenerator` (§2.6), `EvolutionStrategy` (§4.11). The
signatures this section changes (mirrored in §14):

```ts
interface StageDecl { id: StageId; inputs: DataKey[]; outputs: DataKey[]; streamKeys: string[]; invariants: Invariant[] /* each with its scope, §5.3 */; ladder: Ladder;
  workLimits: Record<Rung, WorkLimits> /* operation counts, §5.1 */; budgetMs: Record<Rung, number> /* reporting only */; batch: BatchScope; lineageUnit: EntityKind /* §6.3 */; lazy: boolean /* only under the §4.1 contract */ }   // §14's Stage extends it
interface NetworkStrategy { grow(site: Site, destinations: Destination[], terrain: Terrain, water: WaterSet,
  enceintes: Enceinte[] /* traced before growth; the strategy consults them at every step and places gates where it meets them */,
  existing: Network | null, stage: number, ctx: StageContext, k: Kernel): KernelResult<Network> }
interface EnceinteStrategy { trace(boundary: Polygon, gateSites: GateSite[], reservations: Reservation[], terrain: Terrain, water: WaterSet,
  policy: { waterfront: 'open'|'quay_wall'|'sea_wall'; placement: 'aroundAll'|'aroundStage' }, ctx: StageContext, k: Kernel): KernelResult<Enceinte> }
```

The pipeline order is the topological order of the registered `StageDecl`s (§4.1), so a product may add a stage — a
village's density field before its network, its palisade before its roads (PART III) — by registration alone. Every
district's `SeamContract` is complete from milestone 1 (G-P1): the view over the `Seam` records it shares with its
neighbours — typed boundary edges with `hard` flags, portals (the lanes S8 ends on a boundary spine included, §4.6),
amendments and boundary field samples, one record per boundary run read by both sides — plus its own plot lines and
alleys on the boundary and its interior field samples (II.1); shared geometry is owned by the base, and the district →
neighbourhood interface of PART II reads the contract. Nothing in PART II needs a base change; what the base must already carry is
listed there and is a base requirement here.

=== REPLACE §10.4 Names, descriptions and setting packs ===

### 10.4 Names, descriptions and setting packs

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

An original English-fantasy grammar (D-6) in a Tracery-class engine of our own (rules with modifiers, feature guards,
weighted decks, conditional lines, article agreement) plus syllable and Markov generators over corpora of our own
authoring; folk-contraction as an EVO event (FTG's erosion idea; "≤ 3 syllables" a parameter); naming draws from `naming/*`
streams only — including `naming/quarter/<node>` for the quarter tree and `naming/emblem/<town>` for the emblem (§9.5) —
so names never move geometry, and uniqueness follows §9.6 (an existing entity is never renamed; a new entity whose draw
repeats a name re-draws on its own stream). The same engine writes **descriptions** — a district's one-line summary of its
mix and features, e.g. a waterfront quarter that also holds workshops and a green (COV-FTG-E10), and each building's
description (§2.6) — and people's appearance lines (§10.3); descriptions are regenerated when their inputs change unless
edited.

**Per-culture generators and user lists (COV-FTG-L06).** Every `AncestryRow` and culture row names its own grammar and
corpora, so personal and place names can differ by culture; a user-uploaded list (plain text, one entry per line) becomes a
`user` corpus: a syllable and a Markov model trained from it at load, stored in the document as pack data (the `packs`
block of §2.9) with author `user`, selectable wherever a corpus is.

**Setting packs — format and loading hook decided now (DEF-10).**

```ts
interface SettingPack { id: string; version: string; author: string; date: string; licence: string;
  provides: { grammars?: GrammarDef[]; corpora?: { id: string; kind: 'personal'|'place'|'word'; entries: string[] }[]; ancestries?: AncestryRow[];
    religions?: ReligionRow[]; appearance?: TemplateDef[];
    rosterPatch?: { table: RosterTableId /* classes, institutions, government, religions, households, professions, farm (§10.2) */; baseVersion: string; ops: RowOp[] /* §7.1 */ }[];
    styleHints?: Partial<StyleSheet> } }
```

A pack is data, never code: schema-validated (`zod`), every entry carrying its author and date (the clean-room rule of §17),
loaded as one layer of the override chain between the shipped defaults and the preset (§7.6), and recorded in the recipe
by id, version and content hash; the content of every pack that is not shipped with the output version is copied into the
document's `packs` block (§2.9, §7.6), so a replay never depends on what is installed, and a link is emitted only for
shipped packs (§6.4). **A pack's roster patch is keyed row operations, never a positional patch
(LC-22, NF-D8):** per roster table, the `RowOp`s of §7.1 — rows addressed by their stable row key, each `set` carrying the
hash of the base row it was written against (`baseRowHash`) and the table version it targets (`baseVersion`). When the
document's pinned version of that table has changed or removed the row, the operation is an **orphan**: kept in the pack
layer, not applied, and reported with the old base row, the new row and the pack's value side by side, exactly as a user
override is (§7.6); an `insert` whose key already exists is an orphan too. So a newer table version can never silently
misapply a pack, and a pack edits the roster by the same row operations as a user. The base ships exactly one pack, our original English-fantasy set; further
packs' contents are the owner's adopted default "setting packs later" (D-6), and adding one is a file, not a code change.

=== REPLACE II.1 The district → neighbourhood interface ===

## II.1 The district → neighbourhood interface

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

```ts
interface Seam {                               // one per boundary run, created by S6 and read by both districts it separates — from milestone 1 (G-P1; NF-P6)
  id: Id; sides: [Id, Id | null];              // the two districts in address order; null: a one-sided run (frame, water, cliff, sky)
  edges: SeamEdge[];                           // in the first side's ring order; each: { chain: ChainRef /* the shared way, shore, wall or field chain */, type: 'way'|'water'|'wall'|'field'|'cliff'|'frame'|'sky', wayClass?, widthCm?, frontageSide?, hard: boolean }
  portals: Portal[];                           // every way that crosses or meets the run: { id, wayId, class, widthCm, at: VertexRef /* ('portal', id) */, bearing, from: 'growth'|'baseLane'|'closeup', by?: Id /* the district whose lane or close-up added it */ } — every one must be connected
  amendments: SeamAmendment[];                 // the vertices inserted on a shared spine after S6: S8's lane ends and close-up T-junctions — one record, so both sides always agree
  boundarySamples: { prosperity: Sample[]; density: Sample[]; greenery: Sample[]; terrain: Sample[] };   // along the run; `hard` seams jump, soft seams interpolate
}
interface SeamAmendment { kind: 'baseLane'|'tJunction'; spine: Id /* the shared boundary way */; vertex: VertexRef /* ('junction', the new junction's id): inserted at level 1 by splitThrough or as a lane's end */; portal: Id; by: Id /* the district whose batch inserted it */; cause: 'generation' | EditId /* S8's run, a regenerate, or the close-up's event */ }
interface SeamContract {                       // a district's view, assembled on demand from its Seam records; never stored
  district: Id; seams: Id[] /* in ring order */; sharedGeometry: 'ownedByBase';   // shared edges are generated once by the base; neighbourhoods change them only through a SeamAmendment
  plotLinesOnBoundary: EdgeSetRef[]; alleysOnBoundary: Id[];   // resolved from the district's own plots and alleys
  interiorSamples: { prosperity: Sample[]; density: Sample[]; greenery: Sample[]; terrain: Sample[] };   // on an interior lattice
}
interface NeighbourhoodRequest {
  district: Id; key: PlatKey /* the ground, or the sky island's arena */; boundary: TypedBoundary; seam: SeamContract; context: DistrictContext /* kind, venue mix, character, prosperity band, growth stage, water, walls, slope */;
  laid: { blocks: Id[]; plots: Id[]; alleys: Id[] };   // the base's own L2/L3 fabric under this district (R's `laid`)
  layer: 'ground' | 'sky';                     // sky: no portals, no roads in or out (the floating-island context); own terrain optional
  mode: 'refine' | 'replace';                  // refine: presentation detail only (derived); replace: a template fabric (a model edit, II.4)
  strategy: FabricStrategyId; params: Record<string, number>;   // 'bent-cut' (refine) | 'ring' | 'square' | 'street' (replace)
  outlineTemplate?: 'disc'|'d_shape'|'lozenge'|'crescent'|'spindle';   // standalone and sky calls only (§4.2 S1 (2))
  // streams: keyed from the district's lineage on demand (§6.1); nothing stored
  lod: 'neighbourhood';
}
interface NeighbourhoodResult { blocks: Block[]; ways: Way[]; plots: Plot[]; buildings: Building[]; greens: Greenery[]; pins: Pin[]; labels: LabelEntity[] /* §9.1 */; seams: SeamReport; report: StageReport }
interface SeamReport {                         // written by every close-up; its numbers are the S1 acceptance (II.5)
  portalsTotal: number; portalsConnected: number /* must equal portalsTotal */; unconnected: Id[]; addedPortals: SeamAmendment[];
  sharedEdgeHausdorffCm: Cm /* must be 0: shared edges are read from the base; an amendment only inserts a vertex on them */;
  fieldJumps: { at: PointCm /* a sample position, not a vertex */; field: 'prosperity'|'density'|'greenery'; delta: number; hard: boolean }[] /* a jump on a soft seam outside its band is a soft-invariant failure */;
  superseded: { old: Id; new: Id }[];          // §6.3's successions for the entities a template replacement re-derived (anchor rule, §2.1, §6.3)
}
interface NeighbourhoodStrategy { generate(req: NeighbourhoodRequest, ctx: StageContext, k: Kernel): KernelResult<NeighbourhoodResult> }
// Pin is defined in §2.7 (the complete furniture vocabulary, in the entity registry from M1)
```

Rules: (1) the base generates every shared edge once and both districts read it; (2) a close-up either **refines** — adds the
neighbourhood-LOD presentation detail (roof construction and hatching, surfaces, pins, trees, local street names) as a
pure function of the district's committed base state, its sub-seed, strategy and params, never changing L1–L4 geometry —
or **replaces** the base's plots with a template layout inside its boundary with `ring` / `square` / `street`; the templates
are `FabricStrategy` registrations selected per district (G-P2), so a template district is laid by the base's own engine
with seams by construction; (3) **seam amendment (GEO-30):** a close-up may end a street on a shared boundary spine (NG's
cuts end on existing roads, 361 / 361; the ring template's radials run to the edge); each such end is a T-junction
inserted with `splitThrough` at level 1 so the shared spine stays one chain, recorded as a `SeamAmendment` (kind
`tJunction`) and a new portal in the shared `Seam` record that both districts' contracts read; the neighbour re-derives
only its corridor half-strip and junction wedge at that vertex,
through `corridorUnion` on its adjacent L1 face alone (§3.7), never its plots — where the new wedge's edge ends within
`attractCm` of one of the neighbour's plot-line ends on its kerb, that finer vertex is promoted (§2.2 rule 3), so the plots
stay byte-identical — and every portal stays connected (S1 acceptance: portal connection 100 %, shared-edge Hausdorff 0); (4) footprint
hashes at city LOD and neighbourhood LOD are identical for every entity a `refine` close-up covers (refinement never changes
geometry); a `refine` close-up is a derived refinement level outside the base digest until a `closeup` event is logged
before its first edit (§7.1, §7.4); a `replace` close-up re-derives its entities under the anchor rule and records §6.3's
successions in `SeamReport.superseded`; (5) the
standalone no-portal mode is the same call with a synthetic boundary drawn from an **outline template** (disc, D-shape,
lozenge, crescent, spindle — NG's template outlines, our own shapes; COV-NG-N06) through §4.2's closed-outline routine; the
**sky-island call** is the same request with `layer: 'sky'`, an outline from that routine, optional own terrain echoing the
ground, no roads in or out, and a `reason` (II.6), its shadow projected onto the ground layer by §8.4; (6) **base lanes
on shared spines (NF-P6):** the lanes the base's own S8 ends on a district-boundary spine are the same kind of vertex,
recorded in the same `Seam` record with kind `baseLane` and kept at least a portal gap from every other portal on the
spine (§4.6), so a close-up reads them like any portal and a reroll of either district changes only the seam records it
is party to and the vertices it inserts or removes (II.4). *Judgment (J-P33):* chose one `Seam` record per boundary run,
read by both districts, over a contract copied into each district, because one record cannot disagree with itself and a
district's re-derivation then changes the seams it is party to rather than its neighbour's district record.

=== REPLACE II.4 The render tier, the workflow and the close-up's persistence status (S5, S6) ===

## II.4 The render tier, the workflow and the close-up's persistence status (S5, S6)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

The `hatched` preset at neighbourhood LOD (§8.2, §8.6): tapered hatch triangles from the ridge, two-tone roofs by the
measured law over the stored wings, prism shadows from stored heights, cobbles / tiles / outlined / dashed road programs,
chimneys, wells, lobed depth-sorted trees, the hood title in the emptiest corner; ≈ 25 canvas ops per wing as the
ceiling; instanced hatching.

**Persistence status (LC-18).** A `refine` close-up is **derived data**: a pure function of the district's committed base
state, sub-seed, strategy and params, identical whether computed eagerly or lazily, held outside the base hash and never
stored — so the town is the same before and after anyone opens a district. The first edit inside a close-up is preceded
by a logged `closeup` event (strategy and params, §7.1), from which point the close-up enters the digest under
`closeups` (§2.9) and replays exactly. Editing a close-up element (moving a well, removing a tree, restyling a pin) records
an **instance-override event** on the element's host entity and ordinal (§7.1),
which persists, undoes and replays after regeneration, re-matched by position; when the base re-derives the district, the
close-up re-derives with those overrides carried over and orphans reported. Close-up lanes, plots and houses are base
entities (the base's S8–S11 already produce the finest model fabric), so renaming a lane or locking a house is an ordinary
base edit. A `replace` close-up (a template fabric) is **a model edit**: `setAttr(district.fabric, template)` plus a scoped
regeneration of the district — logged, hashed, the same for every viewer, and visible at city LOD because city-LOD footprints
read the same model at every zoom.

**Workflow.** Open any district at neighbourhood LOD from the city view; "Same kind, new seed" per district with locks — New
random on the district, one of §7.1's named actions scoped to it; per-district reroll isolation — rerolling district D
leaves every other district byte-identical (R8) except the **seam exception** of §4.6 (NF-P6): the chains and `Corridor`
records of the ways that bound D; the half-corridor strips on both sides and the junction wedges at the vertices D's
batches insert or remove on those spines — S8's `baseLane` ends and a close-up's T-junctions; the neighbouring cells
whose rings pass through those vertices, which change only by those degree-2 vertices (the same polygon point for point,
checked by comparing the rings with the vertices removed); and the `Seam` records D is party to. The locality oracle
computes this set from the batches' commit records and checks everything else byte for byte (§7.3). Export of one
district as its own SVG / PNG / VTT scene.

=== REPLACE II.5 What the base already carries for stage 2 (all base requirements in PART I) ===

## II.5 What the base already carries for stage 2 (all base requirements in PART I)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

Typed boundary edges with `hard` flags and portals in the shared `Seam` records of every district (§2.5, II.1), the lane
ends S8 puts on boundary spines included (§4.6); shared geometry owned by the base (§2.2) with the
seam-amendment protocol and `splitThrough` (§3.4, II.1); plot lines and alleys on the boundary (§4.7); seam-continuous
prosperity, density and greenery fields with hard / soft seams (§4.5); per-district streams keyed from each district's
lineage (§6.1); the hole-aware bent cut
with the measured recipe (§4.6); the `FabricStrategy` slot (§14, G-P2) with `BentCutFabric` registered from M1 and the three
template fabrics registered at M5; stored wings, boundary treatments and the complete pin vocabulary (§2.5–§2.7); the
neighbourhood LOD band declared in the display list and the `hatched` programs (§8); the world-aligned tile pyramid (§8.8),
invalidated by per-district dirty regions; the
per-district regeneration budget ≤ 30 ms (§12); the close-up persistence rule and the instance-override event (II.4, §7.1);
the sky context and outline templates (§2.1, §4.2, II.6). Acceptance for stage-2 readiness of the base itself, before any
close-up generator exists (M1 exit): on every B-CITY city every district's `SeamContract` view resolves completely — every
boundary run belongs to exactly one `Seam` record, every portal's vertex resolves, and every `baseLane` portal matches
exactly one S8 lane end and every lane end on a boundary spine one `baseLane` portal — 100 %; and a New random on each of
20 districts per city changes nothing outside its seam exception (II.4). Acceptance for stage 2 itself (M5 exit, §16), read from the `SeamReport` of II.1: portals connected 100 % (added
portals included); shared-edge Hausdorff distance 0; field jumps on soft seams within band; the footprint hash at
neighbourhood LOD identical to the city-LOD hash for every entity a refine close-up covers; opening a district ≤ NG's
recorded 10–96 ms at comparable counts and per-district regeneration ≤ 30 ms (§12); rerolling one district leaves every
other district byte-identical outside the seam exception of II.4; the model hash unchanged by opening, closing or reopening any
number of districts.

=== REPLACE II.6 The staged layers — floating islands and sewers: the hooks the base carries now ===

## II.6 The staged layers — floating islands and sewers: the hooks the base carries now

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

*In plain words.* The owner stages both layers as toggles after the city is mastered. Nothing here is built in the base,
but every record and interface they need exists now, so adding them later is a registration, not a redesign.

**Floating islands (AM-2; DEF-7).** The toggle creates 1–3 islands. **Why an island exists** is one of two reasons, by rule or
by assignment: `prosperity` — the island carries a very prosperous neighbourhood or set of neighbourhoods; by rule, when the
toggle is on, the roster's richest demand for up to three districts' worth of households is allocated by S7b to sky
pseudo-districts instead of the ground (so the population stays whole) — S7b creates each sky pseudo-district's
`Allocation` itself, first and before any island exists: its plot land is the island's area, drawn from
`IslandRule.areaHaBand` on the `island.place` stream, × the dense core's plot share, filled from the richest band down at
each band's plot area (§4.5 S7b (5); NF-P13); `institution` — the island carries one unique
institution chosen from an `IslandInstitution` row (a palace overlooking the land, a cathedral, a prison isolating
criminals) or named by an assignment. **What it is:** a `SkyIsland` (§2.7) with an organic oval outline from §4.2's
routine (the `disc` or `lozenge` outline template), an elevation from a band row, and optionally its own terrain from S1 run
on the sky plat with an *echo* request — its relief `echo` or `own`, and a conjured river that takes the ground river's
bearing and width law; its districts are laid by the ordinary pipeline through a `NeighbourhoodRequest` with `layer: 'sky'`
(no portals, no roads in or out). **Where it floats:** a placement rule reads the ground plan — over water, fields or
outskirts by default, over the core only by assignment; the occlusion mode (opaque, ghost the covered ground, offset view) is
a rendering choice (§8.4). **What it does not do:** it has no relation to the underground layer; its shadow falls on the
ground through the shadow pass; it exports as its own layer (§11). Hook interface:

```ts
interface IslandRule { reason: 'prosperity'|'institution'; maxIslands: 1|2|3; elevationCmBand: [Cm, Cm]; areaHaBand: [number, number]; placement: ('water'|'fields'|'outskirts')[]; terrain: 'none'|'echo'|'own' }
interface SkyStrategy { place(doc: Document, rules: IslandRule[], allocations: Allocation[] /* S7b's sky pseudo-district allocations */, ctx: StageContext, k: Kernel): KernelResult<SkyIsland[]> }
// a Stage registered after S7b by declared I/O: inputs S7b's sky allocations and the ground plan; outputs the islands (outline sized to each
// allocation's area, placement by rule), their arenas and their districts, which run the ordinary pipeline through a NeighbourhoodRequest
```

**Sewers (DEF-7).** A `SewerStrategy` registers as a stage after S11 (declared inputs: ways with `flowToward`, the drainage
raster and outfalls of §2.3, plots and buildings with their class table's `drain` column, the underground plat; output:
`Tunnel` records, §2.7). Its rule families are data: `follow-streets` (mains under the ways, falling with `flowToward` to the
outfalls), `drainage-lines` (along the natural drainage), `mixed`; which buildings need drains is the class table's column;
two presets — `historical` (restrained: open gutters, a few culverted mains, cess pits by class) and `navigable` (the fantasy
preset: large vaulted mains with chambers). It renders through the ground by §8.4's cut-away or overlay and exports as the
underground layer.

```ts
interface SewerStrategy { derive(doc: Document, rules: { family: 'follow-streets'|'drainage-lines'|'mixed'; preset: 'historical'|'navigable' }, ctx: StageContext, k: Kernel): KernelResult<Tunnel[]> }
```

=== REPLACE PART III — What a later village product needs from the base (one page; the hooks are concrete) ===

# PART III — What a later village product needs from the base (one page; the hooks are concrete)

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2)

*In plain words.* The village generator is a separate product the owner stages after the town, with its own ladder
(thorp → hamlet → village). This page lists what it would take from the base, the hooks the base carries for it now, and
confirms nothing here stands in its way; the base does not pay for it.

**What it would reuse unchanged:** the kernel and plat (§2–§3); the site model — descent-traced rivers with a carved field,
level-set ponds, the coast routine (§4.2) — and, for VG's own order, a `RiverStrategy` that lays a terrain-independent
spline course first (VG's live course runs through 6–7 control points before its terrain; COV-VG-WC2) and asks S1 to carve
the field to it, which S1's carve step already does; the sequential roster and lazy people (§10); the frontage-first plot
machinery and the site-plan tables, which already contain cottage, farmstead and detached-in-yard classes (§4.7); the
hinterland presets incl. the VG sector look, orchards and commons (§4.9); the `palisade` enceinte kind (§2.7); the display
list, style sheets, the base's relief tier (hillshade, contour and hachure marks, §8.2) and the reserved `painterly` preset
slot (§8.2); the document, edits, exports and the API (§7, §11).

**What it would add behind hooks the base now carries (DEF-15):**
1. **A density stage before its network (COV-VG-VN-002).** The pipeline is the topological order of declared stage I/O
   (§4.1, §4.12), so a `VillageStrategy` registers a density `StageDecl` whose output the network stage declares as an
   input; VG computes its density before its roads, and the base's S6 order does not bind it.
2. **A palisade before its roads (MN-4, COV-VG-VN-003).** On the live VG build 19365073 the palisade is built before the roads
   — the hull of the populated points of a 10 × 10 lattice over the density field, cleaned and smoothed — and the road
   trackers consult it at every step, gates falling where they meet it (`profile-village.md` New-build addendum N2, P1).
   The village registers an `EnceinteStrategy` that builds exactly that from its density stage, and its tracker-steered
   `NetworkStrategy` receives the result through the `enceintes` input every network strategy now takes (§4.12).
3. **A tracker-steered network** (VG's roads are steered trackers, not A\* — `_critic-vg-ng.md`) with one through-road and
   partial driveways, and a **"houses along ways" `FabricStrategy`** with no block cutting.
4. **One district (COV-VG-WC4).** A village is modelled as **one district** of kind `village` (one quarter) covering the
   settlement; its blocks are the large faces between ways and its plots line the ways, so the containment invariant
   building ⊂ plot ⊂ block ⊂ district holds unchanged and nothing in §2–§4 needs a village exception.
5. **A size ladder below TOWN.** Rung rows THORP ≈ 20–80, HAMLET ≈ 80–400, VILLAGE ≈ 400 up to (not including) 1 500
   inhabitants (our own rows, calibratable; VG spans ≈ 130–1 700); a request of 1 500 or more is a base TOWN (§1.1, D-33)
   whose size follows its population within its rung, and below 1 500 `LadderRouter` routes to the village product; a
   village request's default is not a walled circle (walls are a rule keyed on rung); VG's independent tree stream is a
   keyed sub-stream (already the design); VG's spotlight vignette and grass-tuft look as `painterly` programs — the hillshade,
   contour and hachure marks are already the base's relief tier (§8.2), built at M2b (§16), so the village adds none of
   them (COV-VG-VN-029).

**Not-precluded checks** (the parity judge's 44 / 44): the strategy registry admits every strategy above; the level model
tolerates nearly empty L2 / L3; model time is near-linear in building count; every VG rendering row has a program or a
preset slot; terrain-and-water-as-one-picture is the base's own model. **What the base does not pay for:** tracker
steering, the palisade construction, VG's spotlight and painterly look, the palisade look, VG's grammar and its tag
vocabulary.

=== INSERT AFTER Judgment calls ("chose X over Y because Z"; each vetoable) — the row J-P25 ===

> PENDING FABLE REVIEW — revised by opus stand-in (fixall/draft-pipeline-r2) (rows J-P26–J-P33 only; the section is the scope area's, which applies the rows and the J-I5 amendment of §3 S2)

| J-P26 | Chose to solve the gate routes at S3 and take the stage-1 boundary, the gates, the castle weld, the wall trace and the moat from one travel-cost construction over a provisional boundary on straight corridors (which still differs from the routed arterials) or sliding the gates at S5a (which leaves a moat carved at S3 off the wall or forces water into L0 after the arterials), because a moat must enter L0 before any L1 edge and can follow the real wall only if the wall is known then (§4.2 S3; NF-P1; `fixall_pipeline_r2_levelset.out`). |
| J-P27 | Chose to run the hinterland unit (the hinterland's S10–S12b) on the otherwise idle generation worker as one more overlay of disjoint faces over an eager L1 field partition before S8, which would add ≈ 12 ms to CITY's critical path, because fields are L3 content of the hinterland's own blocks (§4.1, §4.9; NF-P8). |
| J-P28 | Chose the quarter city cut at `min(N_q, L)` over flooring the district count at N_q, because the floor moves the matched TOWN from 8 to 10 labels — no closer to MFCG's 9 — and shrinks TOWN districts below MFCG's own (§4.5; NF-P9; `fixall_pipeline_r2_quarters.out`). |
| J-P29 | Chose to cut the wall strips off as L1 faces at S7 and build the band, towers and gatehouses inside them after S9 over subtracting band ⊕ setback inside `kerb(F)` while committing the band at L3 before S8, because an L3 face committed before S8 and S9 must be cleared or split by their batches, while an L1 strip boundary makes the wall a barrier the way a reservation is (§4.8; NF-P5). |
| J-P30 | Chose a carve way rule by class — pinned decks for arterials and sole connections, cuts for the rest — over re-routing every way around new water, because a town bridges its through-roads over a new moat or canal while lanes simply end at the new bank (§4.11; NF-P14). |
| J-P31 | Chose a `quad` wing kind that stores the clipped row footprint over re-fitting row houses as rectangles (breaks GEO-26's shared party wall) or storing them as `polygon` wings (loses the ridge the per-wing roofs need) (§2.6; NF-P2). |
| J-P32 | Chose a portal gap that slides a planned lane end away from an existing portal over letting two districts' lanes share a boundary vertex, because a shared vertex is the cross-boundary crossroads GEO-42 forbids and binds either district's reroll to the other's lane (§4.6; NF-P6). |
| J-P33 | Chose one `Seam` record per boundary run, read by both districts, over a contract copied into each district, because one record cannot disagree with itself and a re-derivation then changes the seams a district is party to rather than its neighbour's district record (II.1; NF-P6). |

## 3. Cross-area requests

The integrator applies these in the owning areas' sections. Each names the section, the change and why.

### Coordination with the other round-2 drafts (read before applying)

`r2-determinism.md` (landed), `r2-kernel.md` and `r2-rendering.md` (complete when read) make requests of the pipeline
sections. The blocks of §2 already contain the ones below, so the integrator need not re-apply them there:

* **Incorporated:** kernel P2, P3 (`Reservation.attach`, `PlotBound.gates` as role-carried refs; §2.5, §4.7), P4, P5
  (`Enceinte.anchors`, `base` knot profile, `Castle.cityWeld`, `Bridge.deck`, `Tunnel.invert`; §2.7), P6, P7 (§2.6), P8
  (II.1 `SeamAmendment.vertex`, `fieldJumps.at`, the promotion sentence in rule (3)), P9's op-form declarations (§4.1),
  P10 (the frozen-arena overlays and `E_SCOPE`, §4.1 — the hinterland unit uses the same overlay), P15 (the hydrology
  grid and margin inlet, §4.2 S1 (3)), P16 (width knots, §4.3; scalar lane width, §4.6 step 9); determinism PR-1 (§4.2 S1
  (5), `siteCrossings`, `crossing.searchBandM`, the `deck` role — S3's decks carry it too), PR-2 (`deriveBase`, §2.6,
  §4.7), PR-3 (S4's local operator, §4.3), PR-4 (§4.8), PR-5 (work-limit laws and edit batching, §4.1; §4.12's
  `StageDecl` is scope's §14 mirror and the integrator applies it there), PR-6 (§10.4); rendering P1 and P2 (§4.1).
* **For the integrator to apply directly (outside these blocks):** kernel P1 (§2.4 `Way.width` as a knot profile);
  rendering P3 (§4.10's S14 sentence); determinism PR-5's `StageDecl` line in §4.12 (my §4.12 block leaves the interface
  untouched, so PR-5 applies to it unchanged).
* **Resolved differently — the integrator should take this area's version:**
  * **Kernel P9 (S7's L3 batch), P11, P12, P13 — the wall band as S7's kept L3 content before S8.** This area's NF-P5
    fix cuts the wall strips off at L1 (S7) and builds the band, towers and gatehouses inside them after S9 (S10 (0)).
    Reason: under the kept-content rule an S8 cut toward the wall has no L1 boundary to end on — the band ⊕ setback edge
    is an L3 edge, invisible at L1, so `splitFace`'s contact semantics (§3.6) cannot split the L1 face there, and running
    on to the wall edge crosses kept content (`E_KEPT`). The L1 setback line gives the cut a boundary, exactly as a
    reservation's does. VK-1's kept-content rule itself stays valid and is compatible: in this order no finer face
    precedes S8 in generation, so `E_KEPT` cannot arise there, and an edit that re-derives wall-adjacent cells re-runs
    the strip blocks' S10 first step (§3 D7), which replaces kernel D4's "re-run S7's band step". Kernel S3's property
    test "0 `E_KEPT` on the one-click path" holds as stated.
  * **Kernel P14 — S12a commits its own corridors and outside plots before S8/S9.** This area makes S12a geometry-free and
    lets S9 commit the hinterland's corridors with everyone else's; the hinterland unit then builds its L3 content after
    S9 on its own overlay (NF-P7, NF-P8). The outcome P14 wants — outside plots fronting kerbs, no `E_KEPT` — holds, and
    S9 stays one uniform stage. P14's S12b clause is moot here: avenue and street-tree rows write no edge and no role
    (`Greenery.along`, §2.7), so nothing is written on a district-boundary way from inside an overlay.
* **Consistent by design:** determinism's F-REDERIVE way rungs for river edits (re-route through a deck within 1.4 ×, else
  cut at the bank and prune the stub) and this area's carve way rule (§4.11) use the same cut-and-prune rung; the carve
  rule decides by class which ways get a new deck, because a carve makes new water where no deck exists yet.


### KERNEL

| # | section | request |
|---|---|---|
| K1 | §2.2 rule 1 and rule 7 | (a) **Field boundaries are L3 edges in the hinterland** (the furlong, lot, wood, driveway and trail partition of the hinterland's L2 blocks, built by the hinterland unit's S10, §4.9): strike "field boundaries" from the list of L1 edges and add "the hinterland's furlongs, lots, woods, driveways and trails" to the L3 faces; a hedgerow is the `green_line` role on such an L3 edge, and a track that runs along a field boundary is still one edge with both roles. (b) Add to the L1 edge list "the settlement perimeter (a `district_bound` chain, §4.5) and the wall strips' setback and glacis lines (§4.8)". (c) Register the structural role **`setback`** — the L1 line bounding a wall strip — so no sliver absorption or face merge can remove it. Why: NF-P5 and NF-P7/NF-P8 of this lane. |
| K2 | §2.2 rule 3, §3.3 "Kept content" / "One level per transaction", §3.6 | **Local coarse insertion** (used by §4.11's carve and §4.4's outer moats): a level-n batch whose `rederivesFrom` is an early stage (a carve re-derives from S1) may clear finer content only inside a declared **clear region** — the new chain ⊕ (attractCm + clearance), i.e. the channel ⊕ its bank setback — instead of every finer face of its level-n faces (today an L0 batch's face is the whole land component, so a carve would clear the whole town); outside the clear region finer content is kept (VK-1's rule), and the chain may meet a finer edge only at vertices a preceding finer batch placed for the purpose (the deck bank vertices and cut points), which are **promoted** to level n by VK-18's rule; any other contact is `E_LEVEL` / `E_KEPT`. Why: NF-P14, NF-P4 (outer moats); S1's water operator in `r2-determinism.md` §7.3 (b) needs the same rule when it re-carves a reach. |
| K3 | §3.4 `removeEdges` (and `clearFiner`) | Dissolve **any** degree-2 vertex left with no vertex role and no pin whose two remaining edges carry identical role sets and level — not only Steiner vertices — so removing a lane that ended on a spine restores the spine's chain exactly. Why: NF-P6 (`baseLane` portals, §4.6). |
| K4 | §3.8 "Near-rectangles take the exact path"; §3.1 skeleton row | Read `BaseWing.kind` (§2.6): a `quad` wing takes the exact OBB roof when it passes the near-rectangle test and the validated skeleton (with the plain-roof downgrade) otherwise, and the gable construction draws the stored ridge (the midpoints of the two sides its `ridgeAxis` names); `polygon` wings keep pyramid / cone / dome. Replace "clipped row fronts" among the skeleton's inputs by "quad wings that fail the near-rectangle test". Why: NF-P2. |
| K5 | §2.2 rule 1 (wall bands sentence), §3.7 (last sentence of "The kerb, defined once") | Wall bands, glacis, tower and gatehouse parts are built by `bandUnion` **inside the wall-strip faces S7 cuts off at L1, by the strip blocks' L3 batch after S9** (§4.7 S10 (0), §4.8), not before S8. Why: NF-P5. |

### DETERMINISM

| # | section | request |
|---|---|---|
| D1 | §7.3 item 1 (effective scope) | Add the **seam exception**: a district-scoped re-derivation's effective scope includes its bounding ways' chains and `Corridor` records, the half-corridor strips on both sides and the junction wedges at the vertices its batches insert or remove on those spines, the neighbouring cells whose rings pass through those vertices (changed only by those degree-2 vertices), and the `Seam` records it is party to (§4.6, II.4). Why: NF-P6. |
| D2 | §7.3 item 7 (ii) | "Outside the scope, byte-identical" — the oracle **computes** the seam exception from the batches' commit records (changed faces per level, the portal roles added or removed) and checks each excepted neighbour cell equal to its prior ring after removing those vertices; every other entity keeps its leaf digest. Why: NF-P6. |
| D3 | §6.5 (9) | The derived-complete digest derives every district's S10, S10b, S11 and **S12b** and the **hinterland unit's**, S12b named explicitly, in three random orders with pool sizes 0–3. Why: NF-P3, NF-P8. |
| D4 | §6.3 anchor table and lineage units | Add `seam` (anchor: its two districts' addresses and its first chain's address; derivation unit: S6's run, creation index by the run's lowest-then-leftmost vertex) and `portal` (anchor: position, 1 m; derivation unit: the S5c growth run, the district's S8 run for `baseLane`, or the creating edit). Why: NF-P6 (`Seam`, `Portal.id`). |
| D5 | §6.1 concern registry note | No new concern: `alloc.district` also draws S7b's edge-green-or-orchard choice per district, and `island.place` draws the sky allocations' areas (§4.5 S7b (4)–(5)). |
| D6 | §5.2 | F-ROUTE: its first rung ("move the crossing site along its reach") applies to river and canal decks; a moat deck is fixed at its gate (§4.3). F-WALL: add the rung "two gate routes cross the stage-1 boundary at one point → re-draw the later pick (≤ 3) → drop it and report" (§4.2 S3 (7)). F-CASTLE: the compactness repair runs at S3 when the bailey is sited (§4.8). F-SITE: add "polycentric nuclei closer than the separation floor → re-site the later nucleus (≤ 3) → merge under one enceinte with a cross wall, reported" (§4.2 S3 (6)). Why: NF-P1, NF-P4, NF-P10. |
| D7 | §7.3 local-operator table; §7.4 MFCG-asks table | S7 row: re-trace the run between the nearest unaffected towers **and re-cut the wall strips' setback and glacis lines along it**, re-deriving the strip blocks' S10 first step; add a row "carve (canal, moat, basin; edit) — §4.11's way rule and batch order; pinned: every way outside the channel ⊕ setback". §7.4 "draw walls": "F-REDERIVE on plots in the new wall strips". Why: NF-P5, NF-P14. |
| D8 | §5.3 invariant table | Add: "no lane crosses a wall strip, and no L3 band, tower or gatehouse face is cleared or split by an L1 or L2 batch" (batch-local); "every gate and weld vertex lies on its trace, and stage 1's trace lies within 40 m of the stage-1 boundary" (stage-end S5); "every `baseLane` portal matches one S8 lane end on a boundary spine and vice versa, and no two portals on one spine lie within the portal gap" (stage-end S8). The deck invariant ("a way crosses water only on a deck, and a deck only over water") is already in `r2-determinism.md`'s §5.3 and now also covers S3's moat and canal decks and S5a's outer-moat decks. Why: NF-P1, NF-P4, NF-P5, NF-P6. |

### RENDERING

| # | section | request |
|---|---|---|
| R1 | §12.4 | S2 / S3 row: + the plaza-rooted Dijkstra and gate-route solves (≈ 7 ms, moved from S4) + the stage-1 field `T` (≈ 4 ms, moved from S5) → ≈ 16 ms; S4 17 → ≈ 10 ms; S5 44 → ≈ 40 ms; S7: "L1 wall-strip lines, intervallum, gate plazas, castle paths, quays and piers" (its band, tower and gatehouse faces move into the pooled row at ≈ 1 µs per strip block); S12a row → "S12a hinterland siting (≈ 1 ms, critical path) + the hinterland unit's S10–S12b (furlongs ≈ 12 ms, lots and driveways ≈ 3 ms) on the generation worker concurrently with the pool — hidden behind the pooled 48 ms"; this area's moves leave the critical path unchanged at ≈ 245 ms p50 (+ ≈ 4 ms only when a moat is carved and `T` is recomputed; `r2-kernel.md`'s R3 adds its own ≈ 3 ms for the frozen arena copies); single-worker ≈ 328 ms p50 (the pooled 116 ms plus the hinterland unit's ≈ 15 ms). Why: NF-P1, NF-P5, NF-P8. |
| R2 | §12.3 first paragraph | The pooled list "(S10 plots, S10b placement, S11 site plans, per-district greenery)" gains "— and the hinterland unit, which runs the same stages on the generation worker concurrently (§4.1)". (NF-P12's "id order" → "district lineage order" is rendering's own item.) Why: NF-P8. |
| R3 | §9.4 acceptance and its fallback | Replace "area labels on the map at or above the floor ≥ min(12, number of districts)" by "**every node of the city cut — min(N_q, number of districts), §4.5 — labelled at or above the floor**, and at the matched sizes within ± 1 of MFCG's 9 / 12 / 18 district labels (sizes 40 / 80 / 130)"; key the framing-percentile fallback on "fewer than the city cut" instead of "fewer than 12". The old bar fails by construction at 7 500 inhabitants (cut 10 against min(12, 11)) and at 10 000 (cut 11 against 12) — `docs/validation/bench/fixall_pipeline_r2_quarters.out`. Also reconcile the parenthesis "(MFCG size 80 draws 17)" with the sweep's 12 districts at size 80 (`captures/mfcg/exports-sweep-2026-09-25/README.md`): say which labels the 17 counts, or drop it. Why: NF-P9's re-check. |
| R4 | §8.2 roof programs, §8.6, §8.1 cache key, §11.1 (glTF, CityJSON) | Per-wing roof constructions read `BaseWing.kind`: `rect` as today; `quad` — the exact OBB path when near-rectangular, the validated skeleton otherwise, and the fake-gable construction from the stored ridge; `polygon` — pyramid / cone / dome. The two-tone law by face normal is unchanged. Exports extrude each wing's `ring` (the field is no longer `rect`). Why: NF-P2. |
| R5 | §8.10 (instances), §8.5 | Avenue and street-tree rows are `Greenery.along` rows derived along a half-corridor strip at `offsetCm` from its kerb — no plat edge — and the stamp places instances along that derived line by ordinal; hedgerows remain `line` chains (now L3 field boundaries); park paths are L3 `path` faces drawn with the path program. Why: NF-P3. |

### SCOPE

| # | section | request |
|---|---|---|
| S1 | §15.2 O2 (c) | Restate "outside the scope byte-identical" with the seam exception of §4.6 / II.4, computed by the oracle (§7.3). Why: NF-P6. |
| S2 | Judgment calls | Apply the J-P26–J-P33 rows of §2's last block. Amend **J-I5**: "…one travel-cost field, computed at S3 on the solved gate routes (recomputed once after S3's L0 batch when a moat was carved) and re-settled incrementally where S5b's main roads lower it; stage 1's boundary is taken at S3, stage k's before its own S5b…". Append to **J-P3**: "(stage 1's trace at S3 itself, J-P26)". Why: NF-P1. |
| S3 | D-17; §1.4 "walls, gates, castle" row | "each enceinte traced from its stage's provisional boundary" → "stage 1's enceinte traced at S3 from the travel-cost boundary over its solved gate routes, each later enceinte at S5a from its stage's boundary, both pulled to defensible ground before that stage's streets grow". Why: NF-P1. |
| S4 | §14 stage registrations and interfaces | S3's declared outputs gain the gate routes, the field `T`, the stage-1 trace and gates, carved water with decks and the decoration ponds; S6 outputs the settlement perimeter and the `Seam` records; S12a declares no geometry outputs; the hinterland unit is a registered unit of S10 / S10b / S11 / S12b; `SkyStrategy.place` takes S7b's sky allocations; `BuildingInput.fixedWings`; `BaseWing.kind`; `SettingPack.rosterPatch`'s new type; line 5339's "S12a hinterland" → "S12a hinterland siting, the hinterland unit". Why: NF-P1, NF-P2, NF-P6, NF-P8, NF-P13, NF-D8. |
| S5 | §13.2 contract and property tests | The derived-complete digest names S12b and the hinterland unit (D3). Add property tests: every gate and weld vertex on its trace and stage 1's trace within 40 m of its boundary; 0 lanes crossing a wall strip and 0 L3 band faces split or cleared; the seam exception on New random of 20 districts per B-CITY-lite city; the union rule (composed wings = outline) on curved-street row fixtures with `quad` wings; decks on 100 % of way–water crossings including moats and canals. Why: NF-P1–NF-P6. |
| S6 | §13.7 row O14 (b); §15.1 rows C16 and C17 | O14 (b)'s fallback "S12a re-sites a violating farmstead" → "the hinterland unit's S10 re-sites…"; C16: ponds are carved at S3 (§4.2 S3 (10)), the rest of the decoration table is S12a's sites built by the hinterland unit; C17: the settlement perimeter is S6's (§4.5). Why: NF-P7, NF-P8. |

## 4. Evidence status

* **CONFIRMED (executed in this lane, re-runnable):** `docs/validation/bench/fixall_pipeline_r2_levelset.out` — on a 5 m
  grid with a 16-neighbour Dijkstra, the road-anisotropic level set of 58 ha with five radial roads at a = 1.3 reaches
  76 m beyond the terrain-only contour along the roads and 35 m inside it between them (147 m / 82 m at a = 1.8; 114 m /
  64 m for 220 ha and eight roads at a = 1.3), and its tip factor (reach along a road over the equal-area radius) is
  1.13–1.18 at a = 1.3 and 1.24–1.34 at a = 1.8 — so NF-P1's premise holds and τ(a) = 1.2 / 1.4 is a conservative table
  value; two 29 ha nuclei need ≈ 790 m plus setbacks, above the old 400 m floor (NF-P10).
  `docs/validation/bench/fixall_pipeline_r2_quarters.out` — the quarter arithmetic of NF-P9 / N-21 on MFCG's sweep and our
  ladder (the ladder's land is a stated proxy: buildings ÷ 19.8 per ha).
* **PLAUSIBLE (reasoning from the text and the evidence):** every mechanism in the blocks — the S3 construction and its
  budget moves, the wall strips, the seam records and portal gap, the quad wings, the hinterland unit's concurrency, the
  carve way rule and the sky allocation — until M0 / M1 execute them (the tests named in each block and in XR D8, S5).
* **Assumption flagged for the Fable reviewer:** XR K2 (coarse insertion with vertex promotion) is new kernel semantics;
  §4.4's outer moats and §4.11's carve rely on it. If the kernel owner rejects it, the pre-decided alternative is the one
  §2.2 rule 6 already allows — clear the finer content of the whole L0 land face and re-derive it — which is correct but
  costs a full L1–L4 re-derivation per carve; the pipeline text would then restrict `moat: 'all'` to generation before
  S5c of the outer stage (where L1 holds only arterials, so the re-derivation is cheap) and keep the edit carve as a
  declared town-wide re-derivation with the fate report.

## Fable review (2026-09-27) — A-fixall/draft-pipeline-r2

**Verdict: CONFIRMED.** Reviewed by Fable (lane fable-review/main/pipeline, `docs/fable-review/main/pipeline.md`) on the live design (`docs/ARCHITECTURE.md` sha256 1c23190f…, 13 026 lines). All 18 dispositions stand as later rounds refined them; J-P26–J-P33 are the right calls (one S3 construction; L1 wall strips as the barrier S8 needs under the kernel's kept-content rule; per-district S12b; seam records and `baseLane` portals; `quad` wings; the hinterland unit; the cut at `min(N_q, L)`; the carve way rule by class). Both receipts (`fixall_pipeline_r2_levelset.py`, `fixall_pipeline_r2_quarters.py`) re-run byte-identical and the cited numbers re-derived (tip factors 1.13–1.18 and 1.24–1.34; 76 m / −35 m; 8 / 13 / 17). The flagged assumption XR K2 (local coarse insertion with vertex promotion) was accepted by the kernel and is §3.3's clear region today, so the pre-decided alternative was never needed. No correction.
