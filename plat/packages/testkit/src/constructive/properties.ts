// The properties a constructive case's result holds (M0-k-02; §13.1's *Properties*, §3.11's outcomes, §3.3, §3.7,
// §3.8, §3.9): one key per checkable statement, each with the design's words, so a case's expected outcome is data the
// runner (M0-k-04) reads and checks — never prose it must interpret. §13.1's bar — 0 crashes, 0 hangs, 0 invalid
// outputs — applies to every case and is not listed.

/** Every property key, with the statement it checks. */
export const CONSTRUCTIVE_PROPERTIES = Object.freeze({
  // The numeric core (§3.2), judged here (C-0110).
  'snap-half-away': '`snap` rounds each coordinate to the nearest centimetre, a half away from zero, never −0 (§3.2 (1); C-0134 (1)): the result is `points.expected`',
  'snap-exact': '`snap` returns an integer coordinate in range unchanged (§3.2 (1), (7))',
  'snap-refuses': '`snap` refuses with E_OUT_OF_RANGE, its detail the refused coordinate, x first (§3.2 (7))',
  'orient2d-zero': '`orient2d` of every collinear triple of the draw is exactly 0, in every argument order (§3.2 (1), (3))',
  'orient2d-sign-exact': "`orient2d`'s sign equals a BigInt reference's on every triple of the draw (§13.1's adversarial triples)",
  'area2-exact': '`area2Big` equals a BigInt shoelace reference and `area2` equals it as a double, exact where |2A| ≤ 2⁵³ (§3.2 (6))',
  // Every kernel operation (§13.1's Properties, §3.10).
  'hard-invariants': 'every hard §3.10 row holds on the result (M0-a-14)',
  euler: 'the Euler characteristic holds after every insertion (§13.1)',
  'no-short-edge': 'no edge shorter than `minEdge` from any writer, and clearance ≥ `minEdge` (§3.2 (2), §13.1)',
  'version-kept': 'the refused batch leaves the arena at its version, nothing committed (§2.2 rule 8, §3.3)',
  planar: 'the committed result is planar (§3.6 step 4)',
  // Insertion and contact (§3.6).
  'one-vertex': 'coincident points are one vertex (§3.11 degenerate geometry)',
  'shared-stretch': 'a collinear overlap is one shared stretch whose edges carry both chains’ roles (§3.11, §3.6 step 3)',
  'roles-preserved': 'every input chain’s roles survive on the committed edges — coincident chains keep both (§13.1)',
  'simple-runs': 'a self-touching or self-crossing chain is committed as simple runs (§3.11)',
  decimated: 'a point within `minEdge` of its predecessor is decimated (§3.6 step 1, §3.11)',
  'lands-on-target': 'the incoming vertex lands on the lattice point `points.target` (§3.6 step 2)',
  'face-count-unchanged': 'the insertion adds no face — an antenna dangles (§3.6, §3.10)',
  'children-tile-parent': "`splitFace`'s children tile the parent exactly at the child level — integer `area2` equality (§13.1)",
  'empty-result': 'the call returns an empty value — an empty list, no triangle, no piece (§3.11 no input)',
  'work-within-limit': "the operation's charged work stays within its limit, or the limit's typed result (E_WORK_LIMIT, or the reader's downgrade with that cause) — never a hang (§3.3, §3.8, §3.11 the caps)",
  // Moves (§3.6).
  'step-halved': 'the move step is halved, at most 8 times, then commits or is a reported no-op (§3.6, §3.11)',
  'held-unmoved': 'every held vertex is unmoved (§3.6 the held set)',
  'slides-on-route': 'the named vertex slides along its route and stays on it (§3.6)',
  'placement-rule': "the re-seated vertex is placed by §3.6's placement rule",
  'renumbering-identity': 'renumbering the arena’s slots gives identical output (§3.3, §13.1)',
  'no-kept-error': 'the batch returns no E_KEPT (§3.3 kept content, §13.1)',
  'junction-shape-vertex': 'the junction stays a shape vertex of the warped spine after the lane is removed (§13.1)',
  'coarser-edge-restored': '`clearFiner` after the refinement restores the coarser edge exactly (§13.1)',
  // Removals and profiles (§2.2 rules 3, 5; C-0045).
  'chain-restored': 'the chain is restored exactly, its own shape vertices untouched — the split flag (§2.2 rule 3)',
  'profile-unchanged': 'every sampled half-width is unchanged (§2.2 rule 5)',
  'profile-within-1e-9': 'every remaining profile sample is within 10⁻⁹ cm of its value before (§13.1)',
  'profile-bit-identical': 'the re-joined profile equals the original bit for bit (§13.1)',
  'other-roles-unchanged': 'every other role is unchanged (§13.1)',
  'value-everywhere': "a one-knot profile reads that knot's value at every sample (§2.2 rule 5, §3.11)",
  // Indexes and slots (§3.3).
  'query-returns-item': 'every index query whose box meets the vertex returns it (§3.3)',
  'query-returns-new-item': 'the query returns the slot’s new item, never its old one (§3.3, J-K34)',
  'slot-reused':
    'the removal frees its slots and the insertion after it takes them again: the vertex and pair tops after the insertion equal those after the removal, and both free lists are empty (§3.3, J-K34)',
  'query-equals-rebuild': 'every index query’s answer is identical before and after a rebuild of the partitions it reads (§3.3)',
  'query-each-once': 'every query over the block returns each item once, before and after the rebuild (§3.3)',
  'query-order-stable': 'the query returns its results in the same order before and after (§3.3 canonical keys)',
  'rebuild-at-threshold': "a partition is rebuilt when its grid overflow exceeds max(256, ¼ of its static size), never before (§3.3 moment (2))",
  // The straight skeleton (§3.8).
  'skeleton-valid': 'the skeleton takes the skeleton path and passes the §3.8 validator (§13.1)',
  'skeleton-valid-or-downgrade': 'the skeleton output passes the §3.8 validator or is a reported downgrade (§13.1)',
  'roof-inside': 'no roof line lies outside the footprint (§13.1)',
  // Persistence and regeneration (§3.9, §3.3).
  'round-trip': 'save → load → save is byte-identical and the loaded arena passes every hard invariant (§3.9, §13.1)',
  'one-face': 'the arena holds exactly one face (§3.9)',
  'same-arena': 'the same inputs twice give the same arena, byte for byte (§3.3 canonical order, §6)',
  'corrupt-cache': 'the load returns the typed corrupt-cache failure — the replay is M1’s (§3.9; M0-a-15)',
  'resolves-empty': 'the ref resolves empty, and stored, fails §3.10’s stored-references row with E_INVARIANT (§3.11)',
  // Arrangement operations (§3.7).
  'oracle-agreement': 'the result agrees with the CI oracles (M0-k-03), split by attraction (§3.7, §13.1)',
  'ring-equals-face': "`insetRing` at 0 returns the face's ring (§3.7 Insets)",
  'outward-not-collapsing': '`insetRing` below 0 grows outward and never collapses (§3.7 Insets)',
  'kerb-equals-face': 'kerb(F) = F, one built block (§3.7, §3.11)',
  'pieces-tile':
    "`tileRings`' pieces are each simple and counter-clockwise, their area2 the ring's less every earlier ring's, every crossing vertex a vertex of both rings' pieces and a joint shared vertex for vertex; ring i has `params.pieces[i]` pieces where the draw names them (§3.4, §13.1)",
  'names-hole-vertex': 'the refusal names a vertex of the hole (§13.1)',
  'kerb-wedges': 'the corridor’s kerb is the chain’s external wall; a junction yields wedges like a street junction, and a line ending on the kerb lands by attraction (§13.1, II.7)',
  // The regular fit (§3.4, item 45).
  'targets-within-1cm': 'every fit target lies within 1 cm of its vertex and the compactness within 10⁻³ of the n-gon’s own (§13.1)',
  'targets-identical': 'every rotation of the vertex order and its reversal return identical targets, bit for bit (§13.1)',
  'compactness-below-075': 'the compactness falls below 0.75 and the targets lie on a square (§13.1)',
  'centre-unchanged': 'splitting a side into many short edges leaves the centre unchanged (§13.1)',
  'cross-host-identical': "the service's doubles are identical under §6.5 (10)'s cross-implementation test (M0-d-06)",
  // Every rung, every toggle (§3.11).
  'in-range': 'every coordinate lies inside the range invariant |x|, |y| < 2²³ (§3.2 (1))',
  'same-code-every-rung':
    'the operation runs the same code with the one `LatticeSpec` at every extent from THORP to the METROPOLIS cap (§3.11) — a STATIC reading: the two lattice constants every rung reads, true of every draw by construction, so no code path can fail it (the rungs’ code paths are judged by the case’s other holds)',
  'kernel-reads-no-model': '`@plat/kernel` imports no dossier, table, toggle, preset or style module — it depends on no other workspace package (§3.11, §14)',
  // Expectations (§3.3).
  absorbed: 'the sliver below its floor is absorbed by `absorbSliver`, re-checked and the batch committed (§3.3 repair)',
});

/** A property key. */
export type ConstructiveProperty = keyof typeof CONSTRUCTIVE_PROPERTIES;

/** Every property key, in table order. */
export const CONSTRUCTIVE_PROPERTY_KEYS: readonly ConstructiveProperty[] = Object.freeze(
  Object.keys(CONSTRUCTIVE_PROPERTIES) as ConstructiveProperty[],
);
