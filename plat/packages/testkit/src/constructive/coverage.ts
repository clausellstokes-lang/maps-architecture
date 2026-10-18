// The coverage table (M0-k-02's listed test "every §13.1 constructive bullet maps to at least one case id … checked by
// the checker"): §13.1 (2)'s list transcribed clause by clause — each bullet split at its fixtures, §3.11's rows at the
// items of their outcome cells ("every row a case of the set", §3.11), and the two fixture paragraphs and the ladder
// coverage's F-NUM and F-SKELETON inputs after the list — each clause naming the case ids that build it. Written by
// hand from the section, never derived from the set, so the test that every clause has a case and every case a clause
// judges the set against the design. The readings of the open fixtures are C-0183's; the tags per fixture C-0182's.

/** One clause of §13.1 (2) (or §3.11's table, or the paragraphs after the list) and the cases that build it. */
export interface ConstructiveCoverageRow {
  /** The bullet: §13.1 (2)'s heading in italics, `§3.11 <row>`, or the paragraph's name. */
  readonly bullet: string;
  /** The clause, in the design's words (shortened). */
  readonly clause: string;
  readonly cases: readonly string[];
}

const row = (bullet: string, clause: string, ...cases: string[]): ConstructiveCoverageRow => Object.freeze({ bullet, clause, cases: Object.freeze(cases) });

const G = 'geometry classes';
const Q = 'quantisation';
const A = 'attraction and moves';
const K = 'kept content, carves and water edits';
const R = 'removals, profiles and neighbour steps';
const S = 'stretch-state writes';
const I = 'indexes, slots and the pool';
const SK = 'straight-skeleton fixtures (M0)';
const L = 'the kernel at its limits (§3.11)';
const E = 'expectations (§3.3 Expectations)';
const F = "the kernel's further limits";
const X12 = 'fixtures of items 12 and 28';
const X45 = 'fixtures of items 45, 53 and 65';
const LC = 'ladder coverage: one degenerate input of each kind per failure class (F-NUM, F-SKELETON kernel side)';

/** §13.1 (2)'s bullets in order, then the paragraphs after the list: every one must have at least one row. */
export const CONSTRUCTIVE_BULLETS: readonly string[] = Object.freeze([G, Q, A, K, R, S, I, SK, L, E, F, X12, X45, LC]);

export const CONSTRUCTIVE_COVERAGE: readonly ConstructiveCoverageRow[] = Object.freeze([
  row(G, 'lattice points exactly on a segment, placed by gcd stepping (p₀ + k · d / gcd(dx, dy))', 'geom/on-segment-gcd', 'geom/on-segment-split'),
  row(G, 'collinear triples', 'geom/collinear-triple'),
  row(G, 'collinear overlapping edges, shared runs from 1 cm to the whole edge, same direction', 'geom/collinear-overlap-same'),
  row(G, 'collinear overlapping edges, shared runs from 1 cm to the whole edge, opposite direction', 'geom/collinear-overlap-opposite'),
  row(G, 'cuts through a vertex', 'geom/cut-through-vertex', 'geom/cut-ends-at-vertex'),
  row(G, 'cuts grazing a reflex vertex — through it (offset 0)', 'geom/cut-graze-reflex'),
  row(G, 'cuts grazing a reflex vertex — offset by ± 1 lattice unit', 'geom/cut-graze-reflex-plus1', 'geom/cut-graze-reflex-minus1'),
  row(G, 'antennae (chains dangling into a face)', 'geom/antenna'),
  row(G, 'chains touching a boundary at one point', 'geom/one-point-touch'),
  row(G, 'coincident typed chains — a wall on a bank, a quay on a shore, a street on a district boundary, a track on a field boundary', 'geom/coincident-typed-chains'),
  row(G, 'rectangles rotated by random angles and snapped', 'geom/rotated-rectangle'),
  row(G, 'squares rotated by random angles and snapped', 'geom/rotated-square'),
  row(G, 'regular n-gons (n = 3 … 12) rotated by random angles and snapped', 'geom/rotated-ngon'),
  row(G, 'holes touching the outer ring at a vertex', 'geom/hole-touch-outer-vertex'),
  row(G, 'holes touching the outer ring along an edge', 'geom/hole-touch-outer-edge'),
  row(G, 'holes touching each other', 'geom/holes-touch-each-other'),
  row(G, 'simultaneous skeleton events (regular polygons, equal-sided rectangles, symmetric notches)', 'geom/skeleton-simultaneous-events'),
  row(G, 'star rings of radius 2²³ − 2 (area2 exact)', 'geom/star-ring-max-radius'),

  row(Q, 'half-centimetre ties before snapping', 'quant/half-ties'),
  row(Q, '± (2²³ − 1)', 'quant/range-edge'),
  row(Q, 'values snap must refuse: ± 2²³', 'quant/refuse-out-of-range'),
  row(Q, 'values snap must refuse: NaN, ± ∞', 'quant/refuse-non-finite'),

  row(A, 'a vertex at (20, 20) against the edge (0, 0)–(1 000, 0) moves onto (0, 0), leaving no sub-minEdge edge', 'move/vertex-near-endpoint'),
  row(A, 'a chain crossing an edge next to a vertex standing 25.0–25.7 cm from it', 'move/crossing-near-vertex'),
  row(A, 'a stretch whose join point lies within attractCm of an edge endpoint', 'move/stretch-join-near-endpoint'),
  row(A, 'a pinch that would shorten an edge below minEdge (halves)', 'move/pinch-halves'),
  row(A, 'a step that would put two vertices on one lattice point (halves)', 'move/coincide-halves'),
  row(A, 'a warp with fromLevel = 1 over a street ending on a shore (the junction slides along the shore and the step commits)', 'move/warp-junction-on-shore'),
  row(A, 'a warp moving a kerb beside a vertex 25.3 cm from it — the kerb (0, 0)–(1 000, 9) past (517, 30) — commits, placed by the placement rule', 'move/warp-kerb-near-vertex'),
  row(A, 'a warp re-seating two Steiner vertices within minEdge + 1 cm of each other gives identical output after a slot renumbering', 'move/warp-steiner-pair-renumbering'),
  row(A, 'a warp over a locked plot and over a pinned building holds every corner (a neighbour footprint corner on the plot line slides)', 'move/warp-held-corners'),
  row(A, 'a warp with fromLevel = 1 over finished fabric gives 0 E_KEPT', 'move/warp-finished-fabric'),
  row(A, "… and over a generated and an edited water gate moves neither gate's bank vertices", 'move/warp-water-gates'),
  row(A, 'a warp over a spine carrying a same-level T-junction, and one moving the spine around the unmoved junction, then the lane removed', 'move/warp-spine-tjunction'),
  row(A, 'a warp that re-seats a Steiner vertex, then clearFiner — the vertex dissolves and the coarser edge is restored exactly', 'move/warp-reseat-clearfiner'),

  row(K, 'an L1 lane into a face holding kept L3 content of an earlier stage (E_KEPT)', 'kept/lane-into-kept-content'),
  row(K, 'a canal across a CITY district that cuts a lane, prunes its remainder and re-routes a primary', 'kept/canal-across-district'),
  row(K, 'a course-knot move and a river move across a street grid (§7.3 (b))', 'kept/course-knot-and-river-move'),
  row(K, "a canal crossing a walled CITY's wall between two towers", 'kept/canal-across-wall'),
  row(K, 'an outer moat carved at S5a', 'kept/outer-moat-s5a'),
  row(K, 'a carve chain that touches a finer edge away from its prepared vertices (E_LEVEL inside, E_KEPT outside)', 'kept/carve-touches-finer-edge'),
  row(K, "a canal across an open enceinte's glacis line and a river moved through a walled town", 'kept/canal-glacis-and-river-walled-town'),
  row(K, 'a river moved away from a quay-lined and a walled bank', 'kept/river-moved-from-quay-and-wall'),
  row(K, 'a deck whose bank vertex also carries a width knot, removed by F-REDERIVE', 'kept/deck-bank-width-knot'),
  row(K, 'new water across a corner of the frame', 'kept/new-water-frame-corner'),
  row(K, 'a declared preparation batch placing two contact names on one entity, its ops permuted — identical ordinals', 'kept/preparation-permuted-ops'),

  row(R, 'a lane removed from a spine it ended on — the chain restored exactly, its own shape vertices untouched', 'remove/lane-from-spine'),
  row(R, 'an S8 T-junction on a spine with a width profile — every sampled half-width unchanged', 'remove/tjunction-profiled-spine'),
  row(R, 'a way split between two width knots (within 10⁻⁹ cm), then re-joined (bit for bit)', 'remove/split-rejoin-profile'),
  row(R, 'a stretch of a way removed between two junctions', 'remove/stretch-way'),
  row(R, 'a stretch of a ring removed between two anchors', 'remove/stretch-ring'),
  row(R, 'a removal that leaves a way in two parts without a rekey, refused by role consistency', 'remove/two-part-way-refused'),
  row(R, "II.1 (3)'s neighbour step beside finished plots — a plot-line end within attractCm of the foot (promoted)", 'neighbour/foot-near-promoted'),
  row(R, '… and one farther (a kerb split)', 'neighbour/foot-far-kerb-split'),
  row(R, '… then the street removed again, by an undo and by a reroll', 'neighbour/removed-by-undo-and-reroll'),
  row(R, 'two neighbour steps on one kerb edge, the first street removed by a reroll', 'neighbour/two-steps-one-kerb'),
  row(R, 'a promotion that leaves another finer vertex 1.2 cm from its new route edge commits; every index query meeting it returns it', 'remove/promotion-near-finer-vertex'),

  row(S, 'random writes on open and closed chains that already carry a profile (RetainingWall.state)', 'stretch/retaining-wall-writes'),
  row(S, "an enceinte's three parallel profiles written in one batch", 'stretch/enceinte-three-profiles'),
  row(S, 'a negative control — the dropped knots stripped last — fails the bar', 'stretch/negative-control'),

  row(I, 'a pool overlay writing outside its district (E_SCOPE)', 'index/pool-overlay-scope'),
  row(I, 'a logged moveVertex replayed after an upgrade that puts an unrelated vertex 20 cm from its position', 'index/replay-move-vertex'),
  row(I, 'a slot freed and reused inside a stage — the query returns the new item', 'index/slot-reuse-stage'),
  row(I, "a slot freed in one district and reused in another, the second district's partition rebuilt before the first's", 'index/slot-reuse-districts'),
  row(I, 'after a neighbour step and its removal by a reroll with no rebuild, L2 and L3 queries over the kerb equal those after a rebuild', 'index/neighbour-step-queries'),
  row(I, "a drawBoundary that moves a kept block from district A to district B, B's partitions rebuilt before A's", 'index/regroup-block'),
  row(I, 'an L3 query in a block before and after S11 derives L4 there returns its results in the same order', 'index/l3-order-after-l4'),
  row(I, 'a pooled district beside the settlement perimeter at pool sizes 0 and 3; every freeze finds every grid and tombstone set empty', 'index/pool-backland'),
  row(I, 'the frozen copy sent to a pool worker holds typed arrays only', 'index/pool-frozen-copy'),

  row(SK, 'squares at every centidegree 0°–90°', 'skel/square-every-cdeg'),
  row(SK, 'rectangles at every centidegree 0°–90°', 'skel/rectangle-every-cdeg'),
  row(SK, 'regular n-gons n = 3 … 64', 'skel/regular-ngon'),
  row(SK, 'equal-width strips', 'skel/equal-width-strip'),
  row(SK, 'rotated L, T and U shapes', 'skel/rotated-l', 'skel/rotated-t', 'skel/rotated-u'),
  row(SK, 'near-rectangles with a notch on a long side (20 × 10 m with a 3 × 2 m notch: no roof line outside)', 'skel/notched-rectangle'),
  row(SK, '1 000 holed polygons', 'skel/holed-polygons'),
  row(SK, 'snapped rotated squares', 'skel/snapped-rotated-square'),
  row(SK, "B-CITY-lite's irregular footprints and district and water faces", 'skel/bcity-lite-faces'),

  row(L, 'no input: a query whose box meets nothing returns an empty value', 'limit/no-input-query'),
  row(L, 'no input: hexLattice of an empty region', 'limit/no-input-hexlattice'),
  row(L, 'no input: tileRings of no rings', 'limit/no-input-tilerings'),
  row(L, 'no input: the Poisson sampler on an empty domain', 'limit/no-input-poisson'),
  row(L, 'no input: a Delaunay of fewer than three distinct, or of collinear, sites returns no triangle', 'limit/no-input-delaunay'),
  row(L, 'no input: booleans whose result is empty return E_DEGENERATE (empty)', 'limit/no-input-booleans-empty'),
  row(L, 'no input: buffer whose result is empty', 'limit/no-input-buffer-empty'),
  row(L, 'no input: offsetFace whose result is empty', 'limit/no-input-offsetface-empty'),
  row(L, 'no input: insetRing whose result is empty', 'limit/no-input-insetring-empty'),
  row(L, 'no input: transientArena with no seed ring, E_DEGENERATE (seed)', 'limit/no-input-transient-arena'),
  row(L, "no input: a transaction with no op commits nothing and keeps its arena's version", 'limit/no-input-empty-tx'),
  row(L, 'no input: sampleProfile of a chain that resolves to no edge returns an empty list', 'limit/no-input-sampleprofile'),
  row(L, 'one item: a chain with fewer than two distinct points — E_BELOW_MIN_EDGE if optional', 'limit/one-item-chain-optional'),
  row(L, 'one item: … E_DEGENERATE (empty) if mandatory', 'limit/one-item-chain-mandatory'),
  row(L, 'one item: obb, hull or lir of fewer than 3 distinct points: collinear', 'limit/one-item-obb', 'limit/one-item-hull', 'limit/one-item-lir'),
  row(L, 'one item: regularFit of fewer than 3 vertices: fit', 'limit/one-item-regularfit'),
  row(L, 'one item: a cut of one point: E_NOT_TWO_CROSSINGS', 'limit/one-item-cut'),
  row(L, "one item: a ring's profile with one knot: that value everywhere", 'limit/one-item-profile-knot'),
  row(L, 'one item: a face with no bounding spine: kerb(F) = F, one built block', 'limit/one-item-kerb-no-spine'),
  row(L, 'the caps: the range invariant (E_OUT_OF_RANGE)', 'quant/refuse-out-of-range'),
  row(L, "the caps: each transaction's workLimit (E_WORK_LIMIT)", 'limit/cap-tx-work-limit'),
  row(L, "the caps: the skeleton's event limit (E_WORK_LIMIT)", 'limit/cap-skeleton-events'),
  row(L, 'the caps: ≤ 3 snap-rounding passes, an unconverged result committing planar with W_SNAP_PASSES', 'limit/cap-snap-passes'),
  row(L, 'the caps: ≤ 8 halvings of a move step, then a reported no-op', 'limit/cap-move-halvings'),
  row(L, "the caps: the held set's closure within four rounds", 'limit/cap-held-closure'),
  row(L, 'the caps: the placement search within attractCm', 'limit/cap-placement-search'),
  row(L, "the caps: area2's flush at 2⁵²", 'geom/star-ring-max-radius'),
  row(L, 'the caps: the rebuild threshold', 'limit/cap-rebuild-threshold'),
  row(L, 'the caps: the largest arena, METROPOLIS at the cap', 'limit/cap-largest-arena'),
  row(L, '… whose frame grows no further', 'limit/cap-frame-no-growth'),
  row(L, 'degenerate geometry: coincident points are one vertex', 'limit/degen-coincident-points'),
  row(L, 'degenerate geometry: a collinear overlap is one shared stretch with merged roles', 'geom/collinear-overlap-same', 'geom/collinear-overlap-opposite', 'geom/coincident-typed-chains'),
  row(L, 'degenerate geometry: a self-touching or self-crossing chain is split into simple runs', 'limit/degen-self-touching-chain'),
  row(L, 'degenerate geometry: a point within minEdge of its predecessor is decimated', 'limit/degen-decimate'),
  row(L, 'degenerate geometry: a zero-area … face never commits', 'limit/degen-zero-area-face'),
  row(L, 'degenerate geometry: … or pinched face never commits (a cut whose two ends land on one vertex: E_NOT_TWO_CROSSINGS)', 'limit/degen-pinched-face'),
  row(L, "degenerate geometry: a skeleton input with a hole touching the outer ring or another hole takes its reader's downgrade", 'limit/degen-skeleton-hole-touch'),
  row(L, "degenerate geometry: … or a corner sharper than 5°, takes its reader's downgrade", 'limit/degen-skeleton-sharp-corner'),
  row(L, "degenerate geometry: hexLattice's spacing below minEdge or jitter at or above half the spacing is an assertion", 'limit/degen-hexlattice-assert'),
  row(L, 'missing data: the kernel reads no dossier field', 'limit/data-no-dossier'),
  row(L, "missing data: a ref that finds no geometry resolves empty; a stored one fails the stored-references row", 'limit/data-ref-no-geometry'),
  row(L, 'missing data: a StretchRef whose ends are not on one part of its chain: stretch', 'limit/data-stretchref-parts'),
  row(L, 'missing data: a stale or foreign slot: a debug-build assertion', 'limit/data-stale-slot'),
  row(L, 'missing data: a clear-region batch meeting finer geometry away from its prepared contacts: E_LEVEL', 'limit/data-clear-region-level'),
  row(L, 'missing data: a snapshot chunk that fails to decode, or a lattice-point reference with no vertex: a corrupt cache', 'limit/data-corrupt-chunk'),
  row(L, 'every rung, THORP to the METROPOLIS cap: one kernel with no rung-specific number', 'limit/every-rung'),
  row(L, 'every toggle and preset: the kernel reads no toggle, preset or style', 'limit/every-toggle-preset'),
  row(L, 'save, load: only the arenas persist', 'limit/save-load-round-trip'),
  row(L, 'undo and redo re-run the log’s events through the same transactions', 'limit/undo-redo'),
  row(L, 'regenerate: a regeneration from the same inputs yields the same arena', 'limit/regenerate-same'),
  row(L, 'a kernel code change that moves output is a declared shift', 'limit/declared-shift'),
  row(L, 'migrate: a document of another output version opens as §2.9 states', 'limit/migrate'),

  row(E, 'reject: E_BELOW_MIN_WIDTH, E_BELOW_MIN_AREA or E_BELOW_MIN_ANGLE returned, the version kept', 'expect/reject-min-width', 'expect/reject-min-area', 'expect/reject-min-angle'),
  row(E, 'repair: a sliver below its width or area floor absorbed by absorbSliver, re-checked and committed', 'expect/repair-sliver-width', 'expect/repair-sliver-area'),
  row(E, 'repair: a face below its angle floor still rejected after the repair', 'expect/repair-angle-rejected'),
  row(E, "downgrade: the version kept, the code returned for the ladder's simpler rung", 'expect/downgrade'),
  row(E, 'a batch whose failed entry is not a class floor (E_INVARIANT)', 'expect/non-floor-invariant'),

  row(F, 'buffer with miter joins', 'further/buffer-miter-joins'),
  row(F, 'buffer with square joins', 'further/buffer-square-joins'),
  row(F, 'buffer with flat ends', 'further/buffer-flat-ends'),
  row(F, "insetRing at 0 (the face's ring)", 'further/inset-zero'),
  row(F, 'insetRing below 0 (outward, never collapsing)', 'further/inset-negative'),
  row(F, 'insetRing on a non-convex face (E_NON_CONVEX)', 'further/inset-non-convex'),
  row(F, 'an arena holding only its outer ring saved and loaded (one face)', 'further/outer-ring-only'),
  row(F, 'a frame growth whose frame and arena would be no larger (nothing runs)', 'further/frame-growth-none'),
  row(F, 'a frame growth whose law would move a side out by at most attractCm (a CITY frame kept through a decline)', 'further/frame-growth-kept'),
  row(F, 'a village → town fold', 'further/fold-village-town'),
  row(F, 'its reverse — a TOWN handed down to the village product', 'further/fold-town-village'),
  row(F, 'a part-0 warp under a raised way (its feet held)', 'further/raised-part0-warp'),
  row(F, 'a raised way crossing part-0 ways (no junction, two parts sharing no topology)', 'further/raised-crossing'),

  row(X12, 'the underground arena: corridorUnion over a fixture of tunnel chains', 'fix/tunnel-corridor'),
  row(X12, 'the transient arena: the seed-tiling area2 identity after random partitions of rect, L, T and curved-quad rings; the seeds accepted', 'fix/transient-seed-tiling'),
  row(X12, "a rotated T's two wings, its stem crossing one side of the bar twice, clipped to tile (§3.4's seed clip)", 'fix/seed-clip-rotated-t'),
  row(X12, 'tileRings on a ring the earlier rings cover (no piece)', 'fix/tilerings-covered'),
  row(X12, 'tileRings on a ring they cut in two (two pieces)', 'fix/tilerings-cut-in-two'),
  row(X12, 'tileRings on an earlier ring wholly inside a later one (refused, overlap)', 'fix/tilerings-hole-refused'),
  row(X12, 'a side two seed rings share becoming one edge', 'fix/transient-shared-side'),
  row(X12, "a seed vertex within the hot pixel of another ring's side; one 20 cm from it refused (seed)", 'fix/transient-seed-hot-pixel'),
  row(X12, 'overlapping seed rings, and a fixed ring outside the seeds or across a seed side (overlap)', 'fix/transient-overlap'),
  row(X12, 'a fixed bay with a slit and a cut', 'fix/transient-fixed-bay'),
  row(X12, 'mergeFaces across a seed edge refused with E_STRUCTURAL', 'fix/transient-merge-seed-edge'),
  row(X12, 'the readBack order identical after a slot renumbering', 'fix/transient-readback-order'),
  row(X12, 'the re-cut (item 28 (f))', 'fix/recut'),

  row(X45, 'the regular fit: regular n-gons (n = 3 … 12, radius ≥ 5 m), rotated and snapped; the cross-implementation test', 'fix/regularfit-ngon'),
  row(X45, 'every rotation of the vertex order and its reversal return identical targets', 'fix/regularfit-rotation-reversal'),
  row(X45, 'a thin rectangle (1 : 3 or thinner) falls below compactness 0.75', 'fix/regularfit-thin-rectangle'),
  row(X45, 'a side split into many short edges leaves the centre unchanged', 'fix/regularfit-split-side'),
  row(X45, 'fewer than three vertices, a zero-area ring and a vanishing first component return E_DEGENERATE (fit)', 'fix/regularfit-degenerate'),
  row(X45, 'the sampler (item 53): accepted points within [r₀, (1 + a) r₀]', 'fix/poisson-annulus'),
  row(X45, 'the underground parts (item 65): two systems crossing in plan commit in two parts', 'fix/underground-two-parts'),
  row(X45, 'a link record resolves one vertex in each part', 'fix/underground-link'),
  row(X45, 'a transaction on one part handed a slot of another asserts in a debug build', 'fix/underground-foreign-slot'),
  row(X45, 'corridorUnion over a gallery chain gives its kerb at widthCm ÷ 2 + wallCm', 'fix/underground-gallery'),
  row(X45, 'a chamber outline at L1 separates floor from rock', 'fix/underground-chamber'),

  row(LC, 'F-NUM, zero-length', 'limit/one-item-chain-optional'),
  row(LC, 'F-NUM, zero-area', 'limit/degen-zero-area-face'),
  row(LC, 'F-NUM, self-touching', 'limit/degen-self-touching-chain'),
  row(LC, 'F-NUM, collinear', 'limit/degen-collinear-chain'),
  row(LC, 'F-NUM, coincident', 'limit/degen-coincident-points'),
  row(LC, 'F-SKELETON, zero-length', 'skel/degenerate-zero-length'),
  row(LC, 'F-SKELETON, zero-area', 'skel/degenerate-zero-area'),
  row(LC, 'F-SKELETON, self-touching', 'skel/degenerate-self-touching'),
  row(LC, 'F-SKELETON, collinear', 'skel/degenerate-collinear'),
  row(LC, 'F-SKELETON, coincident', 'skel/degenerate-coincident'),
]);

/** The coverage table as Markdown, each clause with its case ids and their milestones — the checker's walk. */
export function formatConstructiveCoverage(milestoneOf: (id: string) => string | undefined): string {
  const lines = ['| bullet | clause | cases (milestone) |', '|---|---|---|'];
  for (const r of CONSTRUCTIVE_COVERAGE) {
    lines.push(`| ${r.bullet} | ${r.clause} | ${r.cases.map((id) => `${id} (${milestoneOf(id) ?? 'MISSING'})`).join(', ')} |`);
  }
  return lines.join('\n');
}
