## II.1 The district → neighbourhood interface

```ts
interface Seam {                               // one per boundary run, created by S6 and read by both districts it separates — from milestone 1 (G-P1)
  id: Id; sides: [Id, Id | null];              // the two districts in address order; null: a one-sided run (frame, water, cliff, marsh, sky)
  edges: SeamEdge[];                           // in the first side's ring order; each: { chain: ChainRef /* the shared way, shore, wall, reservation-boundary or perimeter chain */, type: 'way'|'water'|'wall'|'reserve'|'field'|'cliff'|'marsh'|'frame'|'sky', reservation?: Id /* 'reserve' only: the reservation whose `reserved` boundary the run follows */, wayClass?, widthCm?, frontageSide?, hard: boolean }
  portals: Portal[];                           // every way that crosses or meets the run: { id, wayId, class, widthCm, at: VertexRef /* ('portal', id) */, bearing, from: 'growth'|'baseLane'|'closeup', by?: Id /* the district whose lane or close-up added it */ } — every one must be connected
  amendments: SeamAmendment[];                 // the vertices inserted on a shared spine after S6: S8's lane ends and close-up T-junctions — one record, so both sides always agree
  boundarySamples: { prosperity: Sample[]; density: Sample[]; greenery: Sample[]; terrain: Sample[] };   // along the run; `hard` seams jump, soft seams interpolate
}
type Sample = { at: PointCm /* a boundary sample's position on the run; an interior sample's on the lattice */; value: number /* the field's [0, 1] value; terrain in metres */ };
interface SeamAmendment { kind: 'baseLane'|'tJunction'; spine: Id /* the shared boundary way */; vertex: VertexRef /* ('junction', the new junction's id): inserted at level 1 by splitThrough or as a lane's end */; portal: Id; by: Id /* the district whose batch inserted it */; cause: 'generation' | EditId /* S8's run, a regenerate, or the close-up's event */ }
interface SeamContract {                       // a district's view, assembled on demand from its Seam records; never stored
  district: Id; seams: Id[] /* in ring order */; sharedGeometry: 'ownedByBase';   // shared edges are generated once by the base; neighbourhoods change them only through a SeamAmendment
  plotLinesOnBoundary: EdgeSetRef[]; alleysOnBoundary: Id[];   // resolved from the district's own plots and alleys
  interiorSamples: { prosperity: Sample[]; density: Sample[]; greenery: Sample[]; terrain: Sample[] };   // on an interior lattice
}
interface SeamReport {                         // written by every close-up; its numbers are stage-2 feature S1's acceptance (II.5)
  portalsTotal: number; portalsConnected: number /* must equal portalsTotal */; unconnected: Id[]; addedPortals: SeamAmendment[];
  sharedEdgeHausdorffCm: Cm /* must be 0: shared edges are read from the base; an amendment only inserts a vertex on them */;
  fieldJumps: { at: PointCm /* a sample position, not a vertex */; field: 'prosperity'|'density'|'greenery'; delta: number; hard: boolean }[] /* a jump on a soft seam outside its band is a soft-invariant failure */;
  superseded: { old: Id; new: Id }[];          // §6.3's successions for the entities a template replacement re-derived (anchor rule, §2.1, §6.3)
  landingsReached?: number /* the landing attach vertices a walk along the run's ways joins to the district's largest way component; present where the run holds a landing attach — a sky unit run, whose portalsTotal is 0 (rule (5)), or a ground district holding a ground landing's S8 destination (V01 §3.11 (6)) */;
}
interface NeighbourhoodStrategy { generate(req: NeighbourhoodRequest, ctx: StageContext, k: Kernel): KernelResult<NeighbourhoodResult> }
// NeighbourhoodRequest and NeighbourhoodResult, with DistrictContext and TypedBoundary, are V01 §2.4's: the request's mode is derived and carries no reason;
// its seam, context, params and closeup are absent exactly when `laid` is empty (the unit runner builds them after its partition); the result carries `districts`,
// a unit run's district ids, which SKY-F writes to SkyIsland.districts. Pin is §2.7's (the complete furniture vocabulary, in the entity registry from M1).
```

**Seam records (J-P33).** One `Seam` record per boundary run, read by both districts it separates, so the two contracts
cannot disagree and a district's re-derivation changes only the seams it is party to (§4.6, II.4). **Seam edge types
(J-P37).** An edge's type is the first its role rows give: `way` → `way`; `wall` → `wall`; `shore` or `bank` → `water`, or
`cliff` where the bank kind is cliff, or `marsh` where the bank kind is marsh; a barrier-closure arc (item 106 (a), (f)) →
by its barrier kind (J-VI.3's six): `shore` → `water`, `cliff` and `gorge` → `cliff`, `marsh` → `marsh`, `enceinte` →
`wall` (an earlier ring's curtain), while `sheer`, an island's rim, never types a ground seam (its run is `sky`); `reserved`
→ `reserve`; `district_bound` alone (the settlement perimeter) → `field`; `border` or `margin` → `frame`; a sky arena's
outline → `sky`. A **`reserve`** run is a reservation boundary two districts share with no way on it — a plaza's,
precinct's or market's edge where the grower's edge test stopped (§4.5): its shared geometry is the `reserved` chain and the
two parts of §4.5's margin band along it; it has no portals; a close-up ends its plot lines on its own part's inner edge and
writes neither part (a `replace` close-up's scoped regeneration re-lays its own side's part, §7.3 item 2). `hard` comes from
the seam-type row of the editable tables (§7.6): `wall`, `water`, `cliff`, `marsh`, `frame` and `sky` hard; `way` and
`field` soft; `reserve` by the reservation's kind — castle and precinct hard; plaza, market, park and institution soft.

Rules: (1) the base generates every shared edge once and both districts read it; (2) a close-up either **refines** — adds the
neighbourhood-LOD presentation detail (roof construction and hatching, surfaces, pins, trees, local street names) as a pure
function of the district's committed base state, its sub-seed, strategy and params, never changing L1–L4 geometry — or
**replaces** the base's plots with a template layout inside its boundary with `ring` / `square` / `street`; the templates are
`FabricStrategy` registrations selected per district (G-P2) — by S7c (V01 §3.3) or a declaration — so a template district is
laid by the base's own engine with seams by construction, and a `refine` close-up applies to whatever fabric the district has;
(3) **seam amendment (GEO-30):** a close-up may end a street on a shared boundary spine (NG's cuts end on existing roads,
361 / 361; the ring template's radials run to the edge); each such end is a T-junction inserted with `splitThrough` at level
1, so the shared spine stays one chain, recorded as a `SeamAmendment` of kind `tJunction` when an edit event inserts the end
itself (a `drawWay` ending on the spine) — an end S8 inserts, at generation or in a district's re-derivation, whatever its
fabric, is kind `baseLane` (rule (6); V01 §3.11) — and a new portal in the shared `Seam` record both districts' contracts
read.
**The neighbour step (J-P38)** is the only write on the other side, the same for a close-up's T-junction and for a lane a
district's reroll adds or removes on a shared spine (§4.6 step 7): one L2 batch whose only face is the neighbour's
half-corridor strip along the split spine edge inserts one `corridor_split` edge from the junction vertex to the foot of its
perpendicular on the neighbour's kerb — the edge `corridorUnion` builds on a side the spine passes straight through (§3.7),
so each spine sub-edge keeps its own strip (§2.2 rule 1) and that side gets no wedge. A half-corridor strip holds no L3
content (avenue and street-tree rows are `Greenery.along` records, §2.7), so the batch clears and re-derives nothing: the
neighbour's blocks, plots, footprints and greenery are neither in its face nor re-derived. The edge's kerb end lands, by
§3.6's attraction, on a vertex of the kerb's route within `attractCm` — a plot-line end or footprint corner there is promoted
to L2 (§2.2 rule 3): every ring of the vertex's own level and finer stays as it was, and each coarser ring along the kerb
gains it (the neighbour's block at L2, and its plot at L3 when the promoted vertex is an L4 footprint corner) — or otherwise
splits the kerb at L2 by the placement rule, adding that one vertex to the rings through it and, by §2.6's wing-carrying
rule, to the wing ring of a building whose footprint fronts that stretch of kerb; either way each changed ring equals its
prior ring with the vertex removed (II.4's seam exception). Removing the street reverses the step, whether by an undo, the
district's reroll or any later edit: `removeEdges` takes the `corridor_split` out, the strip is one face again, a kerb vertex
the step created dissolves (`split` flag, no role) and leaves the wing ring it joined, and a plot-line end or footprint
corner the step promoted returns to its level by demotion — it kept its `split` flag, which only a warp that has since moved
it or the kerb vertices beside it clears, making the bend part of the kerb's true shape (§3.6) — so the kerb's L2 route,
index and digest, and every ring the step touched, are those before the step, with any later change to the kerb kept (§2.2
rule 3; test §13.1). Every portal stays connected (stage-2 feature S1's acceptance: portal connection 100 %, shared-edge
Hausdorff 0; II.5).
(4) Footprint hashes at city LOD and neighbourhood LOD are identical for every entity a `refine` close-up covers (refinement
never changes geometry); the close-up's persistence is II.4's; a `replace` close-up re-derives its entities under the anchor
rule and records §6.3's successions in `SeamReport.superseded`. (5) The standalone no-portal mode is the same call with a
synthetic boundary drawn from an **outline template** (§4.2 S1 (2); NG's template outlines, our own shapes; COV-NG-N06)
through §4.2's closed-outline routine; the **sky-island call** is the same request with `layer: 'sky'`, an outline from that
routine, optional own terrain echoing the ground and no roads in or out, its shadow projected onto the ground layer by §8.4
(the island's reason is `SkyIsland.reason`, §2.7). A request with an empty `laid` runs as a **unit** on its own arena (V01
§3.10): the standalone neighbourhood document (`Recipe.product = 'hood'`) and each sky island's districts. (6) **Base lanes
on shared spines:** the lanes the base's own S8 ends on a district-boundary spine are the same kind of vertex, recorded in the
same `Seam` record with kind `baseLane` and kept at least a portal gap from every other portal on the spine (§4.6 step 7), so
a close-up reads them like any portal and a reroll of either district changes only the seam records it is party to, the
vertices it inserts or removes and their neighbour steps (3) (II.4).

**Close-ups and the geometry floor (item 31).** A `refine` close-up reads the committed plots and changes no plot record —
`builtBand` included; a `replace` close-up is a model edit of the redevelopment class (II.4): the plots its template lays take
`builtBand` and `builtProsperity` from the band and value the template read, as a rung-3 event of §4.11 does.

**The underground close-up (II.7.3).** With `layer: 'underground'` the underground pseudo-district opens as a `refine`
close-up — its key the sewer's part (part 0 of the underground layer), no portals and no roads in or out, its tunnels the
ways its plots front, no `replace` fabric. An undercity neighbourhood (II.7.5) opens the same way — a `refine` close-up with
its void's part as key, its walkways the ways its plots front, no portals and no `replace` fabric.
