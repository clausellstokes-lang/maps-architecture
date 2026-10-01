# repair-r1-model — lane coherence/repair-model-r1 (unit model: base §2)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-model-r1; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header
# is ignored. Base: docs/ARCHITECTURE.md sha256 484af066f0115b1d… (assemble-r0's output). Each REPLACE body is the live
# subsection with count-asserted substitutions (scratch generator rm1/build.py over edits_a.py … edits_d.py: 79
# substitutions, each applied exactly once); every untouched line is verbatim. Blocks: 9 (REPLACE §2.1 … §2.9).
# Ruling requests: 0.
#
# PROGRESS
# - P0 brief read whole; 47 issues parsed (2 blocker, 26 major, 19 minor): done
# - P1 issue sources, canon dated rulings (g 114/117/118), counterparts (V01–V03, V06, V08, V09, V11; determinism's
#   DR41–DR43): done
# - P2 edits §2.1–§2.9: done (all 47 ids carried)
# - P3 blocks written; dry run on a copy (9/9 applied, audit not-OK 0, only §2 changed); refs resolve; result saved: done
#
# ISSUES → WHERE FIXED (all 47 FIXED in text; none INVALID; none parked)
#  §2.1  VK0-05, VM-R0S-06 (ground parts ≥ 1, nextGroundPart, unprefixed raised addresses)
#  §2.2  VK0-05, VM-R0S-06 (PlatKey comment; rule 1's raised ground part; rule 2), VK0-06, VM-R0S-13 (raised_foot role,
#        rule 1's link sentence, rule 2's cross-arena links), VK0-25, VM-R0S-14 (stretch write: interior knots dropped,
#        renumbering order), VM-R0S-03, VDC0-07 (condition, material and epoch profiles; knot roles), VM-R0S-30 (outside
#        plots)
#  §2.3  VV34-11; VM-R0S-10 (Terrain.mining)
#  §2.4  VAF-R0S-03 (wayFall takes `levelCm`, so the base uses no volume-only NetworkRule; V04's NetworkRule.levelCm is
#        the value its caller passes — the dead band and its 10 cm unchanged)
#  §2.5  VAL-20 (dist.wall?), VM-R0S-17 (FabricStrategyId = a registered fabric), VM-R0S-36 (V1C ids), VM-R0S-10
#        (Plot.platformCm, Block.platformCm)
#  §2.6  VAF-R0S-02, VM-R0S-28 (PorchKind), VAF-R0S-03 (DormerRow, DormerKind, AccessHead), VAF-R0S-16 (BuildingClass
#        and *A building's class*), VM-R0S-01, VV12-10 (core mix restored), VAF-R0S-10 (crypt rank), VAF-R0S-26,
#        VM-R0S-29, VM-R0S-34
#  §2.7  VAF-R0S-04, VAH-26 (RaisedKind), VAF-R0S-03 (RaisedReasonKey, TierLay, LaidWing), VK0-06, VM-R0S-13
#        (RaisedWayRecord.feet, RaisedFoot), VM-R0S-03, VDC0-07 (WallCondition five values; conditionMaterial,
#        conditionEpoch; the condition paragraph), VM-R0S-02, VM-R0S-23, VRC0S-19, VM-R0S-08 (Use.strain), VM-R0S-09
#        (Household.transit, DisplaceCause), VM-R0S-10 (SiteResources.wellYield, Person.key.bornWeek), VM-R0S-11
#        (HistoryHint), VEW-11, VEW-12 (support step obstacles, the clear-span bound; span reason `clear`), VEW-13,
#        VDC0-24, VM-R0S-19, VM-R0S-20, VM-R0S-28, VM-R0S-30, VM-R0S-36
#  §2.8  VM-R0S-22, VM-R0S-13 (Identity.key), VM-R0S-33, VM-R0S-35, VM-R0S-37, VM-R0S-28, VAF-R0S-03 (RaisedReasonKey
#        cite); registry rows for the new attributes (Household.transit, conditionMaterial/conditionEpoch, feet,
#        platformCm, Terrain.mining); the walls ladder names item 114's worn and patched runs
#  §2.9  VAF-R0S-03 (HoodRecipe, OutlineTemplateId declared beside Recipe), VM-R0S-11 (Recipe.history's two writers),
#        VK0-13 (corrupt cache), VM-R0S-04, VM-R0S-05, VM-R0S-32, VRC0S-10 (yearWeek, seasonFollow, festival,
#        cvdVariant; season derived)
#
# DECISIONS TAKEN IN THE FIX (each the narrowest reading of its issue; no other decision changed)
#  D1 NetworkRule (VAF-R0S-03): the base's one use was wayFall's parameter, which reads only `levelCm`; wayFall now
#     takes that number, so no volume table type enters §2 (V04 keeps NetworkRule; its `levelCm` row stays "wayFall's
#     dead band"). Behaviour identical.
#  D2 DisplaceCause is declared at §2.7 (MC-11: a type a base record uses is the base's) with V06 §3.20.5 (2)'s
#     `destruction`, the value VAT0-16 asks V06 to add; V06 §2.1 then cites §2.7.
#  D3 The support step's obstacles (VEW-11) take §4.3's and §4.13's list; to keep the step's "omitted → merged span
#     `open`" true for every obstacle, the span rule's step (2) opens a span over a square, a reservation, a wall strip
#     or a grove with the new reason `clear` (§4.13's "spans over it with the clearance"; a vault there would wall in
#     ground that stays open).
#  D4 VEW-12's bound is the issue's first option: `raisedWays.structure.maxClearSpanM` by material class; a longer merged
#     clear span drops a generated course (`raised_too_long`, waiting as `raised_too_tall` does) and bends a declared
#     one (item 101 R2) — "no support in water" (§4.13, J-A110.42) unchanged.
#  D5 The stretch write (VK0-25, VM-R0S-14): interior knots of the written stretch are dropped (the stretch takes one
#     value) and the renumbering order is fixed — strip dropped; rising last-first; place the end knots; falling
#     first-last. Executed check (scratch rm1/knotsim.py): 200 000 random writes on open chains, 0 ordinal collisions
#     and 0 bad final orders; negative control (dropped knots stripped last, the earlier draft's order): 84 006 failures.
#  D6 Wall condition (VM-R0S-03, VDC0-07): three parallel stretch-state profiles (condition, material, epoch) on their
#     own knot roles, written together; the enclosed and sealed tests read the trace whatever a run's condition (no
#     behaviour change: they never read it); a patch row named on a worn or patched run bends to robust (V09 §4.21.4
#     offers only robust there); a breached patch keeps its patch row until a repair writes another.
#  D7 `season` stays a reading of `yearWeek` (VM-R0S-04): never stored; an older document's key maps to its middle week.
#  D8 *A building's class* (VAF-R0S-16) is stated at the record's home (§2.6), from §4.7's own rules (the FRONT's class,
#     a bare hidden use's true class, item 71's class mix, item 70's cluster structures); §4.7 cites it.
#  J-RM2 (the rewrite's "hinterland lots kept") is withdrawn by VM-R0S-30's fix.
#  VV56-07 (held for the owner) touches none of these issues.
#
# CROSS-UNIT HAND-OFFS (facts other units own, cited here and to be closed at their homes; no block written for them)
#  V01  §2.6 cites §2.9's HoodRecipe; §2.1's OutlineTemplateId line cites §2.9; §2.3's DistrictContext.raised.kind and
#       WayNamingContext.raised read RaisedKind (§2.7).
#  V02  §2.2 cites §2.6's DormerRow, DormerKind and PorchKind; §2.6 cites §2.7's TierLay and LaidWing.
#  V03  §2.1 cites §2.6's AccessHead; §2.4's building-class rows (hall, keep, tower, mill, temple) key on §2.6's
#       BuildingClass (roster.classes ids); A1 (4) likewise.
#  V05  §3.11: "else none" reads "else absent (§2.5)".
#  V06  §2.13 cites §2.7's RaisedKind and RaisedReasonKey; §2.1 cites §2.7's DisplaceCause (with `destruction`);
#       §3.19 (5): a `raised_too_long` course waits as `raised_too_tall` does; §2.8's repairWall: a patch row on a worn
#       or patched run bends to robust.
#  V09  the span panel's reason words gain `clear`.
#  V11  §2.8c cites §2.7's RaisedKind; RaisedWayStructure gains `maxClearSpanM: { masonry: number; timber: number }`
#       (V11 §3.24.2's defaults, calibratable); V12 registers the cell.
#  pipeline  §4.3 and §4.13 (river, square, wall, oasis cells) cite §2.7's support step and clear-span bound; §4.4 S5a
#       cites §2.7 for the waterfront meanings; §4.7 S11 cites §2.6's *A building's class*; §4.12 drops its second
#       FabricStrategyId declaration and cites §2.5; §4.11's walls ladder names item 114's worn and patched runs.
#  scope  §13.2: T110-2 gains a viaduct over a square and an aqueduct across a wall strip (0 piers in either) and a
#       viaduct and an aqueduct over a 200 m river (dropped or bent by the clear-span bound); T110-5 gains a walled moated
#       fixture with stone moat bridges (0 deck plots on a gate's moat deck); the E-01 bar gains a write inside an
#       existing run (knots in ordinal order after it); §14's DistrictContext comment cites §2.5's FabricStrategyId and
#       @plat/model's list takes HoodRecipe from §2.9.
#  determinism  §6.1's `raised.reason` row cites §2.7 for RaisedReasonKey.
#  rendering  §8.2's season rows read `season` as §2.9's reading of `yearWeek`; its festival rows read `festival`.
#
# WORDS (§2.1–§2.9, whitespace-split): 54 002 before → 58 351 after (+4 349, +8.1 %). Every added word is design an
# issue requires (F-MISSING, WIRING, EDGE parts at build depth: the item-114 condition record, the four view keys,
# HistoryHint's item-113 fields, the six declared types, the raised feet); nothing was cut to offset it.
#
# CHECKS: apply-blocks.py dry run on copies — 9 found, 9 applied, 0 skipped, audit not-OK 0, headings 153 → 153, fences
# balanced, rationale unchanged, every line outside §2 byte-identical; applied together with the sibling base block
# files (determinism, scope) all 9 still apply, audit OK. 57 new volume section references and every new base section
# reference resolve to a heading; no deferral wording, request id or narration added. doc_checks.py --sections 2.1–2.9
# (WARNING: reference corpus INCOMPLETE — not authoritative): live C1 5/0, C2 1/0, C3 369/0, C4 1/0, S1 0, S2 139/0;
# after the dry run C1 5/0, C2 1/0, C3 388/19 unreviewed, C4 1/0, S1 0, S2 150/0. The 19 C3 hits are reviewed below
# (our own words moved from V01/V02/V03's declarations, generic phrasing or section-number tokens); this lane writes no
# shared file, so the rows are proposed for docs/validation/doc-checks-allow.tsv (tab-separated after the "#   "):
#   C3	b 2 7 3 4	repair-model-r1 (2026-10-01): a generic run of English words or section-number tokens in new §2 text (a citation like '§2.7, §3.4' or plain phrasing), no reference text
#   C3	3 2 9 2 7	repair-model-r1 (2026-10-01): a generic run of English words or section-number tokens in new §2 text (a citation like '§2.7, §3.4' or plain phrasing), no reference text
#   C3	and one on its own	repair-model-r1 (2026-10-01): a generic run of English words or section-number tokens in new §2 text (a citation like '§2.7, §3.4' or plain phrasing), no reference text
#   C3	form and in the same	repair-model-r1 (2026-10-01): a generic run of English words or section-number tokens in new §2 text (a citation like '§2.7, §3.4' or plain phrasing), no reference text
#   C3	2 2 street square ring	repair-model-r1 (2026-10-01): a generic run of English words or section-number tokens in new §2 text (a citation like '§2.7, §3.4' or plain phrasing), no reference text
#   C3	or of the ward that	repair-model-r1 (2026-10-01): a generic run of English words or section-number tokens in new §2 text (a citation like '§2.7, §3.4' or plain phrasing), no reference text
#   C3	s in the plot s	repair-model-r1 (2026-10-01): a generic run of English words or section-number tokens in new §2 text (a citation like '§2.7, §3.4' or plain phrasing), no reference text
#   C3	0 1 which of the wing s	repair-model-r1 (2026-10-01): our own words moved verbatim from V02 §2.2's DormerRow comment to its §2 declaration (MC-11); the run matches only our own research notes
#   C3	a fixed input to the plan rung s	repair-model-r1 (2026-10-01): our own words moved verbatim from V02 §2.2's DormerRow comment to its §2 declaration (MC-11); the run matches only our own research notes
#   C3	dormer set back from the eave	repair-model-r1 (2026-10-01): our own words moved verbatim from V02 §2.2's DormerKind comment to its §2 declaration (MC-11); the run matches only our own research notes
#   C3	3 7 2 1 s	repair-model-r1 (2026-10-01): our own words moved verbatim from V03 §2.1's AccessHead comment to its §2 declaration (MC-11); the run matches only our own research notes
#   C3	3 7 2 1 ring	repair-model-r1 (2026-10-01): our own words moved verbatim from V03 §2.1's AccessHead comment to its §2 declaration (MC-11); the run matches only our own research notes
#   C3	on the wall or door	repair-model-r1 (2026-10-01): our own words moved verbatim from V03 §2.1's AccessHead comment to its §2 declaration (MC-11); the run matches only our own research notes
#   C3	3 7 2 3 for	repair-model-r1 (2026-10-01): our own words moved verbatim from V03 §2.1's AccessHead comment to its §2 declaration (MC-11); the run matches only our own research notes
#   C3	10 2 the room programme	repair-model-r1 (2026-10-01): a generic run of English words or section-number tokens in new §2 text (a citation like '§2.7, §3.4' or plain phrasing), no reference text
#   C3	3 7 4 3 the	repair-model-r1 (2026-10-01): a generic run of English words or section-number tokens in new §2 text (a citation like '§2.7, §3.4' or plain phrasing), no reference text
#   C3	4 7 the gate s	repair-model-r1 (2026-10-01): a generic run of English words or section-number tokens in new §2 text (a citation like '§2.7, §3.4' or plain phrasing), no reference text
#   C3	the one on its own	repair-model-r1 (2026-10-01): a generic run of English words or section-number tokens in new §2 text (a citation like '§2.7, §3.4' or plain phrasing), no reference text
#   C3	size small medium large the	repair-model-r1 (2026-10-01): our own words moved verbatim from V01 §2.6's HoodRecipe to its §2 declaration (MC-11); the run matches only our own research notes
#

=== REPLACE ### 2.1 Layers, coordinates, units, ids ===
### 2.1 Layers, coordinates, units, ids

* **Units.** Every model length is an integer number of **centimetres** (`i32`), the world centred on (0, 0), `+x`
  east and `+y` north as in FTG (`_critic-ftg.md` F1), inside the arena frame of §3.2 (9); twice-areas and ring
  orientation are §3.2 (6)'s exact integer predicates, directions §3.2 (5)'s. Heights are centimetres. **Centidegrees
  are the model's one angle unit**: a stored angle is an `i32` named `…Cdeg` or typed `Cdeg` (§2.8's type list).
  A length field carries its unit in its name (`…Cm`, `…M`) or in a unit-branded type (`Cm`, `M`, `CmArray`, a
  `ChainProfile` of `Cm`); a schema lint refuses a length field with neither (O6 (a), G-R14).
* **The unit vocabulary.** Every table column, metric and field that names its unit by a word takes it from one
  list:

  ```ts
  type Unit = 'm'|'m2'|'ha'|'cm'|'cdeg'|'deg'|'share'|'weight'|'people'|'count'|'yr'|'wk'|'m3'|'lvl'
            |'perHa'|'perKm'|'ratio'|'bits'|'ms'|'s'|'luma'|'rb'|'chroma'|'z'|'none';
  type Segment = { a: PointCm; b: PointCm };   // a straight piece of a plot edge: a building's access segments (§2.6 BuildingInput.access)
  ```

  `cdeg` is a model angle and `deg` a measured angle of a calibration metric; `people` counts persons and `count`
  anything else. Volume 11's `ColumnSpec.unit` (V11 §2.1) and volume 12's metric `Unit` (V12 §2.1) are named subsets of
  this list, each exactly its present set.
* **Layers.** `layer ∈ {underground, ground, sky}` is a field on every geometric entity and every display-list item,
  with `z: i32` (order inside the layer) and `elevationCm: i32` (base elevation: an island's altitude; a sewer's
  negative depth). Per-layer toggles, shadows and export hang off this one field; a layer's drawing and export settings
  are its `LayerSpec` (§8.4), edited by `setLayer` (§7.1). **The base populates only `ground`; `underground` and `sky` —
  and every staged record of §2.7 — are schema-complete and empty until their staged stages run** (II.6, II.7; volumes
  4 and 5). **Wording:** *layer* without qualification means one of these three model layers; the toggleable drawing
  groups of §8–§9 (labels, cadastral outlines, trees, annotations, the thematic style overrides) are display-list groups
  selected by `semantic`, never a fourth model layer.
* **Arena parts (G-R11).** Each layer has its own arena or arena parts, keyed by `PlatKey` (§2.2): the ground — part 0 of
  the ground layer — and, on that layer, one part per raised way's deck from 1 (g item 110 (b); §2.7 *Raised ways*,
  §3.4); part 0 of the underground — the sewer network and, along its navigable runs, the underground neighbourhoods (II.7.2, II.7.3) —
  and one further part per underground system of II.7.6 (catacombs, caverns, quarries and mine voids, vaults, a buried
  old town, dug passages; an `UndergroundSystem`, §2.7), the undercity's neighbourhoods lying in the part of the void
  they occupy (II.7.5); and one part per sky island (volume 5). **Every part number is allocated once, at its arena's
  creation, and never reused** — the counters `Document.nextUndergroundPart`, `Document.nextSkyPart` and
  `Document.nextGroundPart` (§2.9) never decrease, because the number is part of its entities' keys and addresses (§6.3). Underground records are populated
  only by II.7's stages or, for a `dug` system, by an access edit or an undercity lifeline's closure once those stages
  exist (§7.3 item 9 (d), II.7.4; item 66); their level mapping is §2.2 rule 1's and their depth is `elevationCm`
  (negative below the ground datum, II.7.3, II.7.6). Whether a layer exists is decided by what the model holds, never by
  a layer's visibility (item 14): `Features.sewers` for the network at a rung and `Features.underground` for the layer as
  a whole (§2.9, II.7.4).
* **Ids.** Every entity has an **address id** `kind:token` — prefixed with its arena outside the ground layer: part 0 of
  the underground keeps `under/` (`under/tunnel:…`), a further underground part n takes `under<n>/`
  (`under3/chamber:…`) and a sky island's part n `sky<n>/` (`sky2/plot:…`), while a raised way's records on a ground
  part ≥ 1 take no prefix, their part read from `Identity.key` (§2.4) — that edits, locks, assignments, pins,
  labels, households, exports and hosts point at. Its separate lineage key (which keys its random streams), the anchor
  rule with its hysteresis radii, survival and succession, the JOIN rule and the one collision rule are §6.3's (LC-1,
  LC-29, GEO-34). In memory addresses are interned `u32` handles, which the kernel's owner and role tables hold; in the
  document they are strings. The parent is a field (`Identity.parent`, §2.8), never parsed from the id, and no record
  outside the kernel stores an arena slot (§2.2 rule 5).
=== END ===

=== REPLACE ### 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices ===
### 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices

```ts
// @plat/kernel
type Cm = number;                        // integer centimetres; a number becomes an arena coordinate only through snap() (§3.2 (7)), in every build
type Level = 0 | 1 | 2 | 3 | 4;          // L0 land/water · L1 way skeleton · L2 kerbs, corridors, blocks · L3 plots+residue · L4 footprints+yard parts
type PlatKey = { layer: Layer; part: number };   // part 0 = the ground, or the underground's sewer network; ground parts ≥ 1 = one arena per raised way's deck (g item 110 (b); §2.7, §3.4), numbered by Document.nextGroundPart; underground parts ≥ 1 = one arena per further system (II.7.6); sky parts ≥ 1 = one arena per sky island (its count-law slot is SkyIsland.slot); numbering: §2.1 Arena parts
type VertexId = number; type HalfEdgeId = number; type FaceId = number;   // arena slots: kernel-internal, valid within one batch (rule 5)
interface Plat {
  readonly key: PlatKey;
  frame: Frame /* §3.2 (9): set at creation; replaced only by the frame growth of an epoch's upward rung crossing (§4.11; J-A81.41), which only grows it */;
  readonly lattice: LatticeSpec /* fixed for the arena's life: §3.2 (1)'s range bound is taken at the population cap and the extreme aspect, so a grown frame keeps every old lattice point */;
  vertices:  { x: Int32Array; y: Int32Array; out: Int32Array /* one outgoing half-edge */; level: Uint8Array /* birth level; lowered by promotion, raised by demotion (rule 3) */;
               flags: Uint8Array /* pinned (set only by `pinVertices`, §3.4; released by rule 3 (b)) | steiner | split (rule 3; under moves §3.6) | free slot */ };
  halfEdges: { origin: Int32Array; next: Int32Array; prev: Int32Array;    // twin(h) = h ^ 1: half-edges are allocated in pairs
               level: Uint8Array /* per pair (h >> 1): the edge's birth level — always the lowest level among its role rows (rule 3) */ };
  roles: RoleTable;                      // (role, entity, level, ordinal) sets on edge pairs and vertices, with a reverse index (rule 7)
  faces: [LevelFaces, LevelFaces, LevelFaces, LevelFaces, LevelFaces];
  index: [LevelIndex, LevelIndex, LevelIndex, LevelIndex, LevelIndex];     // §3.3
  indexHome: { vertex: Int16Array; edge: Int16Array /* per edge pair */; face: [Int16Array, Int16Array, Int16Array, Int16Array, Int16Array] /* per level */ };   // per slot: the static index partition (numbered across the levels) whose build holds the item, −1 if none; written by every build, read to tombstone the item (§3.3)
  version: number;                       // every committed batch bumps it
}
interface LatticeSpec { unitCm: 1; minEdgeCm: 25; attractCm: 26; minFaceAngleCdeg: 500; rangeCm: 8_388_608 /* 2^23 */ }   // meaning §3.2 (2), classes §3.10
interface LevelFaces { outer: Int32Array; holesStart: Int32Array; holes: Int32Array; kind: Uint16Array;
  owner: Int32Array /* interned entity handle */; parent: Int32Array /* the level − 1 face containing it; −1 at L0 */;
  stage: Uint8Array /* rank (§4.1 order) of the stage whose batch created or last re-owned the face: the kept-content rule (§3.3) */;
  nextOfOwner: Int32Array; ownerHead: OwnerTable /* owner handle → first face of that owner at this level */ }
interface RoleTable { edgeFirst: Int32Array; vertexFirst: Int32Array /* first slot of each set, −1 if none */;
  kind: Uint16Array /* interned RoleName */; entity: Int32Array; level: Uint8Array /* level of the batch that added it */;
  ordinal: Uint16Array /* 0 unless the registry declares the role indexed (rule 7) */;
  nextInSet: Int32Array; nextSameKey: Int32Array; head: RoleHeadTable /* (role, entity, ordinal) → first slot */ }
// RoleHeadTable and OwnerTable are typed-array hash tables (J-K22): open addressing, linear probing, capacity a power of two kept
// at load ≤ 0.5 (doubled and re-inserted in slot order when exceeded), a fixed integer hash of the key words, deletion by backward
// shift (no tombstones). Lookups only — nothing iterates a table — so its layout never reaches an output.
interface RoleHeadTable { k0: Int32Array /* entity handle */; k1: Int32Array /* role << 16 | ordinal */; first: Int32Array /* first role-row slot; −1 = empty */; count: number }
interface OwnerTable    { owner: Int32Array /* interned entity handle */; head: Int32Array /* first FaceId; −1 = empty */; count: number }
interface LevelIndex { static: PackedIndex[] /* partitions: one per arena at L0–L1; one per district + one outside districts at L2–L4 */; dynamic: UniformGrid;
  tombstones: Set<number>[] /* one set per static partition: the keys (kind · 2³² + slot; kind = vertex, route edge or face) of the items §3.3 has tombstoned in it since its build; they filter that partition's hits only; when a set empties is §3.3's */ }
type PackedIndex = unknown;   // §3.3's packed static partition (a double-precision box and a 32-bit index per node, one inner node per 16 below it); kernel-internal
type UniformGrid = unknown;   // §3.3's dynamic index over the items a batch adds since the last static build; kernel-internal
type RoleRow = { role: RoleName; entity: Id; ordinal?: number };     // a row a writer adds; its level is always the adding batch's (rules 3, 7); an `anchor` contact name is given without an ordinal, which the kernel allocates (§3.3 rule 2)
type RoleKey = { role: RoleName; entity: Id; ordinal: number };      // a row's identity, without its level
// The only forms in which an entity, a seam contract, an edit event or an API scope refers to geometry (rule 5):
type FaceRef    = { owner: Id; level: Level };                       // view: the faces whose owner at that level is the entity (district, block, corridor, junction, plot, water body …)
type ChainRef   = { role: RoleName; entity: Id };                    // view: the ordered edge chain carrying (role, entity) — a way's spine, a wall trace, a tunnel, an island's rim
type EdgeSetRef = { role: RoleName; entity: Id; ordinal?: number };  // view: the unordered edges carrying (role, entity[, ordinal]) — a plot's frontage, access, party walls, one gate opening
type VertexRef  = { role: RoleName; entity: Id; ordinal?: number };  // view: the vertex carrying (role, entity[, ordinal]) — a junction, a tower, a gate, an entrance, a portal, a deck end, a water gate's bank end, a weld end
type StretchRef = { chain: ChainRef; from: VertexRef | LatticePoint; to: VertexRef | LatticePoint };   // view: the chain's edges between two of its vertices; batch-local, never stored in an entity record (rule 5)
type LatticePoint = { x: Cm; y: Cm };   // a position in an arena; which records may hold a vertex's position is rule 5's
interface VertexSig { v: RoleKey[] /* the vertex's own (role, entity, ordinal) rows, sorted */; e: RoleKey[] /* the structural (role, entity) rows of its incident edges, sorted, deduplicated */ }
interface ChainProfile<T extends number | string = number> {   // a value that varies along an entity's chain (rule 5): never an array indexed by the chain's vertices
  knotRole: RoleName /* the registry's knot role for this attribute (rule 7) */;
  values: T[] /* values[i] belongs to the chain vertex carrying (knotRole, entity, i): an authored value in the attribute's unit, or a cut knot's exact sample (rule 5) */; interp: 'linear' | 'step' }
```

Rules that make it the single spatial truth:

1. **Everything with a boundary is a face; everything linear is an edge chain.** On the ground:
   * **L0** faces: land components, sea, lakes, river reaches, islets, ponds, moats — land and water only. Terrain
     contours and drainage lines are raster products (§2.3), never plat edges or faces, so no L1 face straddles two L0
     parents and no drainage antenna enters a face ring. The arena's outer ring — the frame plus its context margin,
     one chain carrying the structural `margin` role on the arena's `Terrain` — is written as §4.1's S1 row states.
   * **L1** faces: coarse blocks (the regions between way *spines*) and the wall strips S7 cuts off beside each trace
     (§4.8). L1 edges: way spines (centrelines), wall lines, the wall strips' setback and glacis lines (role `setback`),
     shorelines inherited from L0, the map border (the frame rectangle, role `border` on the arena's `Terrain`, written
     as §4.1's S3 row states), the settlement perimeter (a `district_bound` chain, §4.5) and district boundaries, which
     are always L1 edges — a spine, a wall line, a reservation boundary, a shore or the perimeter — so every finer face
     lies inside one district.
   * **L2** refines each L1 face into one half-corridor strip along each of its spine edges (the road reserve on that
     face's side, width = the way's half-width), one junction wedge at each of its corners, and the built block(s) that
     remain, built by `corridorUnion` (§3.7), so every L2 face nests in exactly one L1 face. A `Corridor` entity is the
     `FaceRef` of the half-corridor faces on both sides of its spine; a `Junction` the `FaceRef` of the wedges around its
     vertex; a `Square` is a corridor face of class `square` (G-R11).
   * **L3** faces: plots, courts, yards, greens, alleys-as-faces and **passage faces** (a covered alley-as-face under a
     front building's wing — §2.5's `Passage`, cut by S10 on §4.6's reach; item 30); the wall-band, setback and glacis
     parts (per side of the L1 wall chain, built by `bandUnion` inside the wall strips after S9, §3.7, §4.8;
     `Enceinte.band` is the `FaceRef` of both sides); the margin-band parts along the settlement perimeter and along the
     other shared non-spine district boundaries (§3.3 pool step 3); and the hinterland's furlongs, outside plots, woods,
     driveways and trails, whose boundaries are L3 edges carrying `field_bound` (a hedgerow is the `green_line` role on
     such an edge; a track along one is the same edge with both roles, §4.9).
   * **L4** faces: building footprints (and wing sub-faces when stage 3 exists) plus yard sub-areas.

   Districts, blocks, merged plots and water bodies are multi-face `FaceRef`s, never single face ids.

   **The other arenas take the same five views** with their own meanings:
   * **Underground part 0** (the sewer network): L0 one land face, the rock; L1 the tunnel centrelines (`tunnel` chains,
     never `way` — the underground has no street skeleton); L2 the tunnel bands and the rock between them as its built
     blocks; L3 the frontage plots, each on exactly one navigable, open tunnel run, and residue typed `rock`; L4 the
     buildings, flush against the kerb — as II.7.2 (L0–L2) and II.7.3 (L3–L4, rules U1–U3) write them. Its outer
     ring's `margin` role sits on the underground pseudo-district's record (II.7.3), not on part 0's `UndergroundSystem`
     of kind `sewer`, which carries none: the sewer network is the part every district reaches (II.7.1), so the
     pseudo-district owns its boundary.
   * **A further underground part** (item 65; II.7.6; J-A65.31, J-A65.32): L0 its rock face, bounded by the part's outer
     ring — the ground's frame plus its context margin, so every part grows with the frame by §3.2 (9) (J-A65.22) — a
     chain carrying `margin` on the part's `UndergroundSystem` (§2.7), written by the system's stage before any gallery;
     L1 its gallery centrelines (`gallery` chains — a system's passages and an undercity's walkways alike) and each
     chamber's closed outline chain carrying `chamber_wall`, whose inside is the chamber's floor, an L1 face; L2 the
     gallery bands — bore plus wall (`Gallery.widthCm`, `wallCm`, §2.7) — that `corridorUnion` builds as it builds a
     tunnel's (§3.7), and, inside a chamber the undercity settles (II.7.5), the walkway bands and the built blocks
     between them; L3 frontage plots on a gallery's kerb, plots that may end on the `chamber_wall`, and residue typed
     `rock`; L4 the buildings under the chamber's ceiling (`Chamber.ceilingCm`).
   * **A sky island's part** (volume 5; f items 203, 204), in its own local frame: L0 the arena's outer ring (`margin`
     on its `Terrain`), the **rim** — one closed structural chain carrying the `rim` role on the island — the **void**
     face (L0 kind `sky`, V05 §3.8) between them, the **land** face inside the rim, and its water faces; the void holds
     no land and no water and is never cut or plotted, the one L0 face that is neither. L1 its ways, district
     boundaries, the rim strip's `setback` line and its landing and institution claims; L2–L4 as the ground's.
   * **A raised ground part** (g item 110 (b); §3.4): L0 its outer ring — the ground's frame plus its context margin,
     growing with the frame by §3.2 (9) (§2.7 *At the frame*), a chain carrying `margin` on the raised way's `Way`
     record, written when the part is allocated, before its spine — and the one face inside it; L1 the raised way's
     spine (its `way` chain) between its two feet (`RaisedWayRecord.feet`, §2.7); L2 the spine's corridor band by
     `corridorUnion` (§3.7), as §3.4 states, the faces beside it never plotted; no L3 or L4 (a raised deck carries no
     plot, §2.7 *Deck plots*).

   The underground and the ground never share topology (rule 2): every surface constraint the underground reads is a
   query on the ground's key (§3.4; J-A12.32). Two arena parts never share a vertex: a link between elements of two
   parts names one vertex in each (`UndergroundLink`, §2.7, its ends carrying `link_end`), as each foot of a raised way names one on ground part 0 and one
   on its own part (`RaisedWayRecord.feet`, §2.7, both carrying `raised_foot`), and two systems that cross in
   plan without meeting are two parts, drawn over and under (§8.4).
2. **One arena per `PlatKey`; the five levels are views of it (J-K1).** All levels live in one vertex-and-half-edge
   arena and every edge carries its birth level; the level-n subdivision is the set of edges of level ≤ n, so each
   level-n face is exactly the union of the level-(n+1) faces inside it. Nesting therefore holds by construction and is
   checked by index (§3.10). A face walk at level n follows `next` and, around each vertex, skips edges of level > n
   (O(degree)). A level's face records inside a parent face are materialised when the first edge of that level is
   inserted there; until then the parent face is its own child. A shared boundary is one edge seen by every finer level
   — a kerb, a plot line, a party wall — so a warp moves it once and two row houses share literally one wall edge. The
   ground, each raised part of the ground layer, each underground part and each sky island are separate arenas and never
   share topology: sky and underground geometry never cut ground faces, a raised part never cuts ground part 0's (it
   crosses the ways beneath without a junction), two underground parts never cut each other's, and cross-arena links (an
   island's shadow footprint, a sewer outfall, an access point, an underground link, a raised way's feet) are entity ids,
   each end naming at most one vertex in its arena.
3. **Finer levels never move coarser geometry, with one bounded exception.** A level-n batch creates vertices and edges
   of level n only (`E_LEVEL` otherwise; clearing finer content, promotion, demotion and `warp` moves excepted, §3.3,
   §3.6). Where it needs a vertex on a coarser edge (a plot line ending on a kerb, a footprint corner on a plot line, a
   band's cross edge on its wall), `splitThrough` inserts a level-n **Steiner vertex** at the lattice point §3.6's
   placement rule chooses near the exact foot and routes the coarser edge through it, moving the route by at most half a
   lattice diagonal, 0.71 cm (61 % of 5–60 m edges have no interior lattice point, GEO-1). The coarser edge's endpoints,
   birth level, faces and own-level roles never change; a finer batch may add roles of its own level (a plot's frontage
   on a kerb). The **level-n route** of an edge is the chain through its vertices of level ≤ n; every level-n query,
   digest (§6.2) and stage reads it, so no level-n result depends on whether or when a finer level was derived — lazy
   per-district stages included. A same-level split, a promotion, a demotion or a dissolution adds a vertex to a route or
   removes one and moves nothing (J-K32), so the hot pixel bounds placement, not a standing distance (§3.6, §3.10), and
   the index boxes each route edge over the vertices on its run (§3.3).

   **Promotion (J-K11).** A coarser batch that ends a chain on a route already carrying a finer vertex kept beside it (a
   neighbour's plot-line end where II.1 (3)'s neighbour step lands its `corridor_split` edge; a close-up's kept fabric
   beside a new L1 junction) attracts onto that vertex and **promotes** it: its birth level drops to the batch's level,
   adding it to the coarser route (it lies within that route's hot pixel, §3.6) without moving it or touching the finer
   faces beside it. It keeps its `split` flag, since removing the promoting chain restores the edge it split (demotion,
   below). The commit record lists every promotion and the undo record restores the birth levels (§3.6). A coarse batch
   inserted into finished fabric (a carve, a re-carved reach, an outer moat) meets finer geometry only as §3.3's
   clear-region rules allow; a kept way's straight L1 edge between its two promoted bank vertices becomes the deck span
   over the new water (rule 7; J-I12).

   **Dissolution.** `clearFiner` (regeneration, undo) and `removeEdges` remove edges and roles, then dissolve each vertex
   left with degree 2 that carries the `split` flag, no vertex role and no pin, and whose two remaining edges carry
   identical role sets and one birth level.

   **The `split` flag** marks a vertex whose dissolution restores exactly the edge it was created on. It is set when the
   vertex is created on an existing edge (a split foot, a crossing, every Steiner vertex) and cleared (a) by a promotion
   that makes it a coarse chain's own vertex — a prepared contact (§3.3 rule 3) or a stretch end (§3.4); (b) by a move
   of it, or of the nearest vertex beside it on a run it split, as §3.6's "split flag under moves" states; (c) by a
   removal that breaks the run it split (demotion (b)). A promotion onto the route it already lies on (§3.6 candidate
   (b)) keeps it. A chain's own shape vertices never carry it.

   **Levels follow the rows — demotion (J-K28).** A row is added at the adding batch's level and never at a level
   coarser than its edge or vertex (a coarser chain never shares a finer edge, §3.6; promotion is the only way a vertex
   becomes coarser), so an edge's birth level is the lowest level among its rows, and only a removal can leave a level
   its rows no longer justify. `removeEdges`, `clearFiner` and `retypeEdges`' `remove` (§3.4) therefore end, after
   stripping rows and deleting the edges left with none, with three steps:
   * (a) *edges:* an edge whose remaining rows are all above its birth level takes the lowest of them — a quay on an old
     shore stretch, left with its `way` row when a moved river takes the `shore` and `bank` rows, becomes L1, as does a
     wall on an old bank, so the L0 view stays land and water only (rule 1);
   * (b) *flags:* a `split` vertex keeps its flag only while a run it split survives the batch whole — a pair of its
     incident edges of its lowest incident level that carried identical rows of that level before the batch still
     exists after it, at one level, with identical rows (a crossing has two such pairs, a T-junction one); otherwise the
     flag is cleared (where a quay left the old shore stretch it shared, that point becomes a shape vertex of the quay; a
     quay that shared the whole stretch on both sides of a street end keeps that end restorable). A vertex from which
     the batch strips its last vertex role row other than knot rows loses its kernel `pinned` flag, since a pin guards
     the feature its role names (a gate, a junction, a portal, a deck, gate, weld or anchor end; §3.4 `pinVertices`) —
     so the bank vertices of a deck F-REDERIVE removes become plain vertices of their way, keeping any knot row, and a
     water gate's bank vertex left on an unchanged shore can dissolve;
   * (c) *vertices,* in canonical order (y, then x), each reading the levels the earlier ones left: a vertex with no
     incident edge and no vertex role row of its level or coarser takes the lowest level among its incident edges and
     vertex role rows (with neither it is freed) — as an old shore stretch's L0 vertices do. A deck's bank vertex left
     over land by moved water takes its way's level at once when its `deck_end` rows are L1 (a preparation batch placed
     them), and keeps L0, with no L0 edge at it, while they are L0 (an L0 batch placed them; which batches place them at
     which level is §4.2 S1 (5)'s), until F-REDERIVE removes the deck's `deck` and `deck_end` rows (§7.3 (b) 9). Then
     the dissolution rule; then **split restoration**: a `split` vertex whose incident edges of its level or coarser are
     exactly two, of one level, with identical rows of its level or coarser, and which carries no vertex role row of its
     level or coarser and no pin but still meets finer edges or carries finer vertex role rows (the vertex dissolution
     would take but for that finer geometry), takes the lowest level among those finer edges and rows and keeps its
     flag. The flag is the whole guard: it stands only while neither the vertex nor its neighbours on the run have
     moved since it split the run (clearing (b)), so restoring it gives the run's route before its promotion, changed
     only by the same-level vertices added or removed since, which move nothing.

   So a plot-line end or footprint corner that II.1 (3)'s neighbour step promoted to L2 returns to its level when the
   street is removed — by an undo, the district's reroll or any later edit — and the kerb's L2 route, index and digest
   are those before the step (restored vertex for vertex on 100 000 of 100 000 random routes,
   `docs/validation/bench/fixall_kernel_r4_checks.out` A, and, with the flag as the whole guard, by construction for any
   number of later same-level vertices on that route). A promoted vertex that a move has unflagged stays in the coarser
   route, which is then its true shape. Each demotion re-indexes the items it changes (§3.3 "No item changes in place")
   and re-walks the faces beside a demoted edge at the levels it no longer bounds (§3.6 step 5); the per-level digests
   read the current levels (§6.2), and the commit record lists the demotions and cleared flags, which the undo record
   restores (§3.3, §7.4). §3.10's level-consistency row checks the result on every batch.
4. **Edges enter only through `insertChain`** — one door for generated chains, user strokes, boolean and buffer
   outputs, offsets and smoothing results (§3.4; its snapping, attraction, shared stretches, placement, crossings and
   local re-walk are §3.6's). Faces are never re-walked globally; a split face's two parts both inherit its owner and
   stage rank until the stage re-owns one (§3.6 step 5).
5. **Topology by index; references by role (J-K3, J-K9).** Inside the kernel topology is keyed by `VertexId`,
   `HalfEdgeId` and `FaceId` — never by object identity or coordinates (the 2017 shared-`Point` topology and FTG's
   coincident-intersection bug are the two failures, `os-geometry.md` §1.1, FTG 153121107). **No record outside the
   kernel stores those slots, and no entity record stores a vertex's position**, except a building's wing rings and its
   stored stage-3 composition's and plan's rings and points and its tower centres (§2.6), whose boundary points are
   footprint vertices that §2.6's wing-carrying rule re-reads after every change of the footprint, so they cannot go
   stale. Otherwise vertex positions live only in log events (with a `VertexSig`, below), view state, label placements
   and `StretchRef` ends; a point that is no vertex — a river's control knot, a pin's or decoration's point, a tree
   override, a point light's point, an access point's ground point, a Works' kept rings and lines, a raised way's pier
   rings and terminal point — is an ordinary attribute of its record (§2.3, §2.7, II.7.4, §7.4), and one inside a
   building — a basement ring's point, or a stored composition's or plan's point off the footprint's boundary — is
   carried with its building by that rule's mean-value coordinates (§2.6 rule 2 (b)). An entity reaches its geometry
   through the kernel's role and owner tables — `ChainRef('way', wayId)` for a way's spine, `FaceRef(plotId, 3)` for a
   plot, `VertexRef('junction', id)`, a bridge's deck ends `VertexRef('deck_end', bridgeId, 0 | 1)`, a water gate's bank
   ends `VertexRef('gate_end', gateId, 0 | 1)`, a castle's weld ends `VertexRef('weld', castleId, 0 | 1)`, an open
   wall's end anchors `VertexRef('anchor', enceinteId, 0 | 1)`, a reservation's attach points `VertexRef('attach',
   reservationId, i)`, a plot bound's gate openings `EdgeSetRef('gate_opening', boundId, i)`, an island's rim
   `ChainRef('rim', islandId)` — resolved on demand by `resolve` (§3.4). Splits carry roles to both parts, merges union
   them, attraction merges them onto the surviving edge or vertex, promotion keeps them (except a prepared `anchor`
   contact name, which it strips, rule 7) and `warp` moves the vertex carrying them, so a stored reference cannot go
   stale: there is nothing to rewrite (GEO-5 (a)). How a warp treats kernel-pinned vertices and the vertices of locked
   or pinned entities is §3.6's (GEO-5 (c)).
   * **Stretches (J-K31).** An operator that removes or hands over part of a chain — a carve's cut stretch, a pruned
     remainder, a kept way's replaced stretch, a moved river's old shore stretch, the stretch between two bank anchors,
     a way split, a partial `wallToWay`, a stretch-state write (below) — names it by a `StretchRef`: the chain's edges
     between two of its vertices, in chain order for an open chain and, for a ring, from `from` counter-clockwise to
     `to` (orientation by `orient2d` at the lowest-leftmost vertex, §3.2 (6)), so a ring's two stretches between one
     pair of vertices differ without a stored direction. Each end names a vertex of the chain by a vertex role or by its
     lattice point (unique per lattice point, §3.10); a cut end that is not yet a vertex is placed first by
     `splitThrough`, which may give it a vertex role row. A `StretchRef` is resolved within its batch and never stored in
     an entity record; `removeEdges` and `retypeEdges` apply it as §3.4 states.
   * **Chain attributes are knot profiles, never positional arrays (J-K10).** A value varying along a chain — a way's
     width, a wall's base elevation, a tunnel's invert, a shore's bank kind and shore class, a wall's stretch class and each run's condition, material and last change — is a
     `ChainProfile`: its knots are vertices of the entity's own-level route carrying the registry's knot role for the
     attribute with an ordinal (`('width_knot', wayId, i)`); between consecutive knots the value is interpolated linearly
     by arc length along that route (`linear`) or held to the next knot (`step`, categorical values); it is constant
     before the first and after the last knot of an open chain, a ring interpolates cyclically, and a chain of several
     rings has at least one knot per ring and never interpolates across rings. A constant attribute is a scalar with no
     knots. The creating stage places each knot on an existing vertex of its own level or inserts one by `splitThrough`
     at its own level. `splitThrough`, attraction, crossings, promotion and `warp` never change a profile (a split adds
     a vertex without a knot; a knot vertex moves with its chain). `kerb`, `bandUnion` and every export *sample* the
     profile (§3.4, §3.7) and the digest hashes its values with the knot rows, so a T-junction S8 inserts into a spine
     cannot shift the width elsewhere along it.
   * **Cutting and joining a profiled chain (J-K23).** A conversion that hands part of a chain to another entity or opens
     a ring — a way split, a partial `wallToWay`, a carve's cut — goes through `retypeEdges` with `rekey` (§3.4), which
     first gives **each** part a **cut knot** at every cut vertex: a knot row of that part's entity carrying the
     profile's sample there — for `linear` the arc-length interpolation between the knots around the cut, kept as that
     exact double (the one kind of knot value that is not an authored value in the attribute's unit; computed with
     + − × ÷ and `Math.sqrt` only, so it is the same on every engine), for `step` the held value. A cut at a knot vertex
     copies that knot to the other part, and a part wholly before the first or after the last knot takes the constant
     there as a scalar. Every part therefore samples what it sampled before, to within one interpolation's rounding
     (≤ 6.8 × 10⁻¹³ cm over 20 000 random ways, `docs/validation/bench/fixall_kernel_r3_checks.out` B). **Removing a
     stretch** of a profiled chain first gives each remaining part a cut knot at the stretch's end on its side, by the
     same rule, before the stretch's rows and interior knot rows leave, so every remaining sample is unchanged
     (`fixall_kernel_r4_checks.out` C). A **join** of two chains into one entity concatenates their knots in chain order
     and drops a knot at the join vertex only where the joined profile samples identically without it — its value
     equals the interpolation between its neighbouring knots within 10⁻⁹ cm, decided in doubles so every engine decides
     alike, or, for `step`, the previous knot's value: the two cut knots of an undone split carry one value and drop,
     restoring the original profile bit for bit (20 000 of 20 000, r3 file), while two different values at the join
     stay on the one vertex as two ordinals, a step, as §3.6 step 1's merged knots are.
   * **Stretch-state profiles.** A record whose condition varies by stretch along its
     chain — `RetainingWall.state`, and `Enceinte.condition` with each run's `conditionMaterial` and `conditionEpoch`
     (§2.7) — stores each such attribute `S` as `S | ChainProfile<S>` (`interp: 'step'`) on its own knot role; absent
     means the record's default throughout. One mechanism serves every such record, each stating only its value set,
     knot role, default, writers and readers (§2.7); attributes a record writes together (a wall run's condition,
     material and last change) are written over the same stretch in the same batch, each by this mechanism:
     * *Canonical form.* Since a step profile is constant before its first knot, an open chain's profile always keeps a
       knot on the chain's first vertex (placed with the value that held there when a scalar is first expanded); a closed
       chain's needs none. After every write the writer drops each knot whose value equals the knot before it (never an
       open chain's first-vertex knot), stores a profile whose values are all equal as that scalar, and the default
       scalar as absent — one form, so the digest (§6.3) is stable.
     * *Write.* A writer names a `StretchRef` — none: the whole chain — and places a knot at each end, an end that is no
       vertex placed first by `splitThrough` (§3.4): the near knot carries the new value, the far knot the value that
       held there before, and the knots strictly between them are dropped. The writer then applies the canonical form
       and, in the same batch, renumbers the profile's knot rows from 0 in chain order, as `rekey` does for a cut
       (§3.4): every row is written at its final ordinal — first the dropped knots are stripped; then the knots whose
       ordinal rises move, last-first; then the new end knots are placed; then the knots whose ordinal falls move,
       first-last — so no two vertices hold one ordinal at any step; a knot that moves gains its new row by `splitThrough` landing on its vertex
       before it loses the old one by `removeEdges` on its `VertexRef` (§3.4's doors), so its vertex never stands without
       a row and never dissolves, its value moving with it. So a write inside an existing run — a breach of one run of a
       wall, a landfall over part of a retaining wall — leaves the knots in ordinal order, as §3.10's stored-reference
       row requires at stage end and save.
     * *Read.* `sampleProfile` by arc length (§3.4), cyclic on a closed chain. *Persist:* the knot rows and values.
     * *Regenerate.* Where its chain is re-derived and the record is not restored, a knot stays on its vertex while the
       vertex survives (carry-over by lattice point, §3.10, §6.3); a knot whose vertex is gone is re-placed by
       `splitThrough` at the new chain's point nearest its old point when that point lies within
       `retaining.settings.stateSnapCm` (volume 11's `retaining` table, its named `settings` row, V11 §2.8c — the one cell
       every such record reads), else dropped and its run merged into the run before it;
       an open chain's first-vertex knot is always re-placed on the new chain's first vertex.
     * *Cut or join.* Carried by J-K23's `rekey` pairing (above). *Undo:* the writing op's undo record restores the
       former profile, knot rows included. *Migrate:* absent reads the default; a document holding the former scalar
       reads it as the constant profile.
   * **Positions in the log (GEO-5 (b)).** A log event that addresses a vertex by position (`moveVertex`, §7.1) stores
     its `LatticePoint` *and* the vertex's `VertexSig` at the time of the edit; the edit layer refuses a target with an
     empty signature (every editable vertex carries a structural or vertex role, §7.1's table). On replay
     `resolveVertexAt(key, at, sig)` (§3.4) maps the signature's entity ids through carry-over (§6.3) and binds, in
     order: (1) the vertex at `at` if its signature contains every recorded row; (2) else the nearest vertex whose
     signature does, within the rebind radius — `attractCm` for a vertex without vertex roles, else the §6.3 anchor
     radius of its vertex-role kind (junction and pin 1 m, gate and tower 2 m) — ties by lattice position (y, then x);
     (3) else the event is **orphaned** and reported (§7.3 item 4). A vertex is never bound by distance alone, so an
     upgrade replay never moves an unrelated vertex that happens to lie nearby. A river's control knot is no arena
     vertex: `moveCourseKnot` binds by the knot's ordinal (§7.4).
6. **Refinement is a pure function**: `L(n+1) = refine_n(level-n view, params, streams)`, the streams keyed from the
   scope's lineage (§6.1). How an edit clears and re-derives the finer content under the faces it touches is §7.3 (2);
   what survives the clear, and how, is §3.3's (locks and pins: §7.2).
7. **Roles, not a single type.** Each edge pair and each vertex carries a small sorted set of `(role, entity, level,
   ordinal)` rows from the **role registry** (a versioned data table); an output that reads a set in order — a digest
   (§6.2), a contact name's entity (below) — reads it by the role's rank in the registry and then the entity's address
   id, never by an interned handle, whose value depends on the order in which a session interned it.

   | kind | roles (**structural** in bold; *indexed* — rows carry an ordinal — in italics) |
   |---|---|
   | edge | **`way`**, `kerb`, `corridor_split`, `band`, **`wall`**, **`wall_gate`**, **`shore`**, **`bank`**, **`border`**, **`margin`**, `field_bound`, `district_bound`, `plot_line`, `party_wall`, `frontage`, `access`, `yard_part`, `claim`, **`reserved`** (a reservation's boundary before growth, §4.2 S3), **`setback`** (the L1 line bounding a wall strip, §4.8), **`deck`** (below), `green_line` (hedgerows on L3 field boundaries; avenue and street-tree rows are `Greenery.along` records, not edges, §2.7), `treatment` (a plot edge's fence, hedge, wall or railing as an attribute row), *`gate_opening`* (the sub-edge of a treated plot edge left open for a gate, one ordinal per gate), **`tunnel`**, **`gallery`** (the centreline of an underground system's gallery or an undercity's walkway, rule 1; item 65), **`chamber_wall`** (a chamber's closed outline chain, rule 1; item 65), **`rim`** (a sky island's rim, rule 1; volume 5), `invisible` |
   | vertex | `junction`, `tower`, `gate`, *`entrance`* (one row per entrance of a building's entrance set, `('entrance', building id, i)`, §2.6, item 29), `portal`, *`attach`*, *`anchor`*, *`weld`*, *`deck_end`*, *`gate_end`*, *`composition`* (a stored stage-3 composition's boundary points, §2.6), `access_point` (an `AccessPoint`'s vertex on its underground element — a tunnel's or a gallery's kerb, a chamber's wall, a sewer dwelling's side or rear wall, II.7.4 — distinct from the `access` edge role), *`link_end`* (`('link_end', link id, 0 \| 1)`: an `UndergroundLink`'s end, one vertex in each of the two parts it joins, §2.7; item 65), *`raised_foot`* (`('raised_foot', way id, 0 \| 1)`: a raised way's foot i, one vertex on ground part 0 and one at its spine's end on the way's own part, as `link_end`, §2.7 `RaisedWayRecord.feet`; g item 110 (b)), `sky_access` (a `SkyAccess`'s vertex on its island, volume 5), and one knot role per profiled attribute, all *indexed*: *`width_knot`*, *`base_knot`*, *`invert_knot`*, *`bank_knot`*, *`shore_class_knot`*, *`retaining_state_knot`* (`RetainingWall.state`), *`wall_state_knot`* (`Enceinte.condition`), *`wall_material_knot`* (`Enceinte.conditionMaterial`), *`wall_epoch_knot`* (`Enceinte.conditionEpoch`), *`wall_class_knot`* (`Enceinte.stretchClass`, g item 106 (c)) |

   * **Structural and partition roles.** A structural edge role is never removed by a sliver absorption or a face merge
     (§3.6), and §5.3's crossing invariant finds deck edges by their role; every other edge role is a partition role. A
     vertex that carries any role row of a live entity is never dissolved. Coincident features are one edge with several
     roles — a street on a district boundary, a quay on a shore, a wall on a river bank, a track on a field boundary —
     never two edges and never an overwrite. A way's class, width profile and surface are attributes of the `Way`
     entity, not of its edges (FTG's 14 wire types generalised); a `wall` chain may be open, its ends anchored on typed
     vertices (a shore, a cliff, a castle; `Enceinte.anchors`, §2.7).
   * **The deck.** A `Bridge`'s deck span is the way's own L1 edge between the bridge's two `deck_end` bank vertices,
     carrying `deck` beside the way's `way` role — `ChainRef('deck', bridgeId)`; a site no way uses keeps its two bank
     vertices and no span (`Bridge.state = 'site'`, §2.7). Which batch places a deck's bank vertices, at which level and
     before or after its water, is §4.2 S1 (5)'s; in every case no L0 edge crosses water and no deck splits a water
     body's L0 faces (LC-7, J-I12).
   * **Anchors, contact names and gate ends (J-K29).** An `anchor` row marks the end of an open chain that rests on a
     coarser feature — an open wall's two ends, `('anchor', enceinteId, 0 | 1)` — or serves as a **contact name**: a
     bank point that a coarse insertion's preparation batch places on a finer edge that is neither a kept way nor a
     re-traced wall run (a settlement-perimeter or other district-boundary stretch, a wall strip's setback or glacis
     line, the map's `border` line; §3.3 rule 2), for the water's batch to name in `KernelTx.prepared`. A contact name's
     entity is that of the first row of the edge's own birth level in the row order above: on a district boundary the
     first district in id order among its `district_bound` rows, on the settlement perimeter the first in id order of
     the inner district and the hinterland pseudo-district, on a setback or glacis line its `setback` row's enceinte, on
     the map border the arena's `Terrain` entity. Its kernel-allocated ordinal and its life until the promotion that
     strips it are §3.3 rules 2–3's; no record references it. A **water gate's** two bank vertices carry `('gate_end',
     gateId, 0 | 1)` instead — on a re-traced run from the preparation batch on, under a fresh `Gate` address, as a
     re-sited deck's bank vertices are under a fresh `Bridge` (§6.3, §7.3 (b) 3) — and persist, because `Gate.banks`
     names them (§2.7) as a `Bridge` names its `deck_end`s; the wall's edge between them lies across the water as a deck
     span does. Where a generated and an edited water gate's bank vertices stand is §4.4 S5a's; both are held under a
     warp unless `fromLevel = 0`, as a deck's bank vertices are (§3.6; J-K35).
8. **Every committed batch validates its declared invariants** at their scopes, writes a report record and a
   `CommitRecord`, and a failed batch leaves the arena at the previous `version` (§3.3, §3.10).

*Size.* One arena per layer stores every boundary once: at CITY ≈ 80 k vertices, ≈ 240 k half-edges, their role rows
(with a 2-byte ordinal) and five face tables (with a 1-byte stage rank) take ≈ 10 MB of typed arrays, plus ≈ 2 MB for
the two lookup tables at load ≤ 0.5 (≈ 1.5 MB of role heads for ≈ 60 000 role keys at 12 B a slot, ≈ 0.5 MB of owner
heads over the five levels at 8 B a slot) — ≈ 12 MB (PLAUSIBLE until M0), against ≈ 20–29 MB for five per-level DCELs
that repeat each inherited edge at every finer level (SCL-11). The spatial index adds 38.4 B per item (§3.3;
`docs/validation/bench/fixall_kernel_r4_bench.out` A) over one item per vertex, route edge and face: ≈ 190 000–230 000
items, ≈ 7–8.5 MB at a finished CITY (our count, PLAUSIBLE until M1); its home column (`indexHome`, 2 B per vertex,
edge-pair and face slot) adds ≈ 0.5 MB, so the generation worker's arena with its index is ≈ 19.5–21 MB. A pool
worker's frozen copy and its size are §3.3 pool step 1's. Knot rows are few: a constant-width way has none, and a wall's
base profile has one knot per trace vertex (tens to a few hundred per enceinte). Rebuilding the lookup tables as `Map`s
would cost each pool worker ≈ 10 ms (60 000 keys) to ≈ 20 ms (100 000 keys) at CITY and ≈ 62 ms at METROPOLIS before
its first query (`docs/validation/bench/fixall_kernel_r3_bench.out` B); the typed tables travel inside the frozen
copy, one memory copy of which costs a worker ≈ 1.1 ms at 12 MB, ≈ 1.5 ms at 15 MB and ≈ 2 ms at 20 MB
(`fixall_kernel_r4_bench.out` A).
=== END ===

=== REPLACE ### 2.3 Terrain and water ===
### 2.3 Terrain and water

```ts
interface Terrain { id: Id; key: PlatKey /* the ground, or one sky island's own terrain */;
  cellCm: Cm; cols: number; rows: number; originX: Cm; originY: Cm /* the height raster: frame + margin (§3.2 (9)) */;
  datumCm: Cm /* the elevation that height 0 represents, relative to mean sea level; one per document (per island for sky terrain); set by S1 (§4.2) */;
  heightCm: Int32Array /* above datum */; reliefLimitCm: Cm /* 1 000 000 (10 km): the declared range every write is checked against */;
  hydro: HydroGrid /* the hydrology raster: frame + margin, coarser than the height raster (below) */;
  flowDir: Uint8Array /* on `hydro`: D8, defined on every land cell of frame and margin, flats included */; flatRank: Uint32Array /* on `hydro`: flat-resolution order; 0 off flats */;
  flowAccum: Uint32Array /* on `hydro` */;
  outfalls: Outfall[] /* S1 (3)'s drainage outlets (§4.2 S1 (9)): one per bank stretch of `outfallStretchM` (50 m) of each water body into which D8 flow from land enters, and per 50 m of frame edge the flow leaves by — the one of largest accumulation per stretch; recomputed by S1's water operator after a water edit (§7.3 (b)); read by the network stage (II.7.2) */;
  seaLevelCm: Cm /* in the datum frame */; wind: { bearingCdeg: number; strength: number }; features: SiteFeature[] /* hill, spur, valley, terrace, cliff, ravine */;
  geology: 'ordinary'|'soluble'|'volcanic' /* item 65: the site's rock under the frame — written by S1 (§4.2) with the resources, or overridden by `setAttr` (§7.1's terrain row), read only by II.7.6's cavern rule (soluble or volcanic rock holds caverns); 'ordinary' on a sky island's terrain */;
  mining: boolean /* item 109 (a) (2): the site holds mining — SiteResources.ore ≥ 0.5 over the frame, a mining class in the roster or a mining deposit in the dossier (§4.2 S1 (10)); written by S1 (10) with the resources and re-derived with them, no edit kind of its own; read only by II.7.6's cavern rule (its mine boost and fissure variant); false on a sky island's terrain and in the parity presets; absent reads false */;
  lifecycle: Lifecycle }
interface HydroGrid { cellCm: Cm /* TOWN 1 600, CITY 2 500, METROPOLIS 3 200 (table values at creation; kept through frame growth, §3.2 (9)) */; cols: number; rows: number; originX: Cm; originY: Cm /* the same extent as the height raster */ }
type OutfallInto = 'sea'|'lake'|'river'|'canal'|'ditch'|'moat'|'frame'|'stream'|'field';   // declared here, V04 §2.1 cites it
interface Outfall {
  into: OutfallInto;          // from the receiving water's kind: river, tributary, distributary, estuary, islet_channel → 'river'; sea → 'sea'; lake, pond, oxbow → 'lake';
                              // canal → 'canal'; ditch → 'ditch'; moat → 'moat'; the frame edge → 'frame'; a culverted brook's open course below the
                              // town (a drainage line that is no water body, V04 §3.2 N3) → 'stream'; the network's cess field outside the walls → 'field'
  water: Id | null;           // the receiving WaterBody; null for 'frame' and 'field'
  at: PointCm;                // the bank point (on the receiving body's shore chain), the frame-edge point, or the field's point in outside ground;
                              // a point-anchored value carried with the face it lies on under a warp or a vertex move by §7.4's point rule
  cell: number }              // the `hydro` cell containing `at`, re-found whenever `at` moves
// Tunnel.outfall (§2.7) is the Outfall a run discharges at: a copy of one of Terrain.outfalls at derivation, or a 'field' Outfall
// the network stage makes (V04 §3.2 N2); re-seated by V04 §4.3's outfall re-seat when a water edit moves its shore.
interface TerrainSampler { heightAt(p: Point): Cm /* bilinear on the height raster; the 2.5 m refinement is computed on demand, never stored */; slopeAt(p: Point): number;
  flowAt(p: Point): { dir: number; accum: number } /* the `hydro` cell containing p */ }
interface WaterBody { id: Id; kind: 'sea'|'lake'|'river'|'tributary'|'distributary'|'islet_channel'|'pond'|'moat'|'estuary'|'harbour_basin'|'canal'
    |'ditch' /* a drainage cut that drains reclaimed ground (item 25; §4.11) */
    |'oxbow' /* a still body cut off from a river by a meander cut-off (below) */;
  face: FaceRef /* L0 */; shore: ChainRef /* ('shore', id): its ring(s) */;
  course?: Polyline /* rivers: the reach's centreline downstream, kept in step with the shores (below) */;
  controls?: { ordinal: number; at: PointCm }[] /* rivers: S1's control knots in course order (§4.2 S1 (3)) — recorded inputs, not arena vertices; a knot the user moved is the edited path 'controls/<ordinal>', implicitly pinned (§7.1 moveCourseKnot, §7.4) */;
  nextControl?: number /* the next free knot ordinal: a re-trace or re-sampling gives its new knots fresh ordinals, so an ordinal never names two knots */;
  widthProfile?: CmArray; depthCm?: Int16Array /* per `course` vertex: the course is the entity's own derived polyline, which no kernel op re-vertexes */;
  flowFrom?: Id; flowTo?: Id;
  fall?: true /* a sky island's conjured river whose outfall is the rim — a waterfall (V05 §3.8) */;
  cutFrom?: Id /* oxbow: the river it was cut off from */; epoch?: number /* oxbow: the epoch of its cut-off */;
  spring?: { at: PointCm /* the source point in the hollow or at the fault line: an ordinary attribute (§2.2 rule 5) */; flow: number /* share of the spring's full flow, (0, 1]; 1 when made */ } /* item 111: a spring-fed pond or small lake — an oasis's water (below) */;
  bankKinds?: ChainProfile<'beach'|'rock'|'cliff'|'quay'|'marsh'> /* step, on the shore chain, G-R5 */;
  shoreClass?: ChainProfile<'bay'|'headland'|'straight'> /* step, on the shore chain */; lifecycle: Lifecycle }
```

**The rasters.** Terrain is a raster in metres with a resolution set at creation by the size class (TOWN 5 m, CITY 8 m,
METROPOLIS 10 m — so the 128² fixed grid VG uses at every size is never the constraint) over the frame and its context
margin; `cols × rows` follow the arena's width × height (§3.2 (9)). When an epoch grows the frame every raster of this
section extends by whole cells on its own grid, keeping its `cellCm` (§3.2 (9); J-A81.31); a re-grid at the new rung's
cell is only that rule's pre-decided fallback. Point queries go through a `TerrainSampler` (bilinear), which is how slope
queries inside the built extent and S11's ground datum read a 2.5 m refinement without storing one.

**The hydrology grid (J-K12).** Flow direction, flat rank and accumulation live on their own raster, `hydro`, over the
same extent — frame *and* margin — at 16 m (TOWN), 25 m (CITY) and 32 m (METROPOLIS): 200², 320² and 400² cells at the
rungs' target populations, the cell counts §12.4's S1 budget assumes (1.6 × the cell of a frame-only raster with the same
counts, 10 / 16 / 20 m). A `hydro` cell's height is the height raster's bilinear sample at the cell's centre, rounded to
the centimetre, so the flood runs on integers. Measured with the mechanism below (bucket-queue flood, two-gradient flats,
D8, accumulation; `docs/validation/bench/fixall_kernel_r2_hydro.out`): CITY 15.9–17.2 ms, METROPOLIS 25.3–26.5 ms, TOWN
6.2–7.0 ms, every cell with a defined D8 on both 60 m and 3 000 m relief (a frame-only raster of the same counts: 15.3–16.4
and 25.6–26.8 ms; frame and margin at the frame-only cells: 41–44 and 67–69 ms). `flowAt(p)` returns the `hydro` cell
containing `p`, so a hinterland plot's `upstream` (§2.5), a water mill's reach and the sewer hook read defined flow
everywhere on the map, and O1 (b)'s "every terrain cell has a defined flow path to an outfall" holds on this grid over
frame and margin (§13.1). How S1 traces and carves the river course on this grid and keeps the stored flow in step with
the carved terrain is §4.2 S1 (3)'s; the grid's pre-decided coarsening is §12.4's M0 site-and-fields fallback.

**Heights (GEO-15; J-K7).** Heights are `Int32` centimetres relative to the per-document datum `datumCm` (§4.2 S1), so
stored values stay small and a 3 000 m relief is ordinary. Every write to a height or depth raster — S1, the terrain
brush, a site primitive — goes through a range check against its declared limit that clamps and reports
(`W_HEIGHT_CLAMPED` with the cell count in the generation report) and never wraps (an `Int16Array` stores 40 000 as
−25 536, executed in GEO-15). The mountainous round-trip fixture is §13.1's.

**Flats (GEO-15).** Sinks are filled by §4.2 S1 (3)'s priority flood, which keeps exact flat surfaces. Flow across every
flat — filled depressions and genuinely level ground — is resolved by the two-gradient flat-resolution method (a
breadth-first gradient away from higher terrain and one towards lower terrain, combined into `flatRank`), computed into
its own array, so stored heights are untouched, D8 is defined on every land cell and each flat drains to its spill
point. D8 ties break in the fixed neighbour order E, NE, N, NW, W, SW, S, SE, so flow is the same on every engine.

**Terrain is not in the plat.** Water faces and their shore and bank edges enter L0 from S1 (§4.2). Contour lines are
not model geometry: they are extracted per render tile and per export and clipped to the land faces (§4.2 S1 (2), §8,
§11). Drainage lines are raster queries, not plat edges: as L0 edges they would be antennae that every street, lane and
plot line inherited at L1–L4 would have to end on or avoid (§3.6); a line that must be visible as water is a `tributary`
water body with its own L0 face instead (§2.2 rule 1; GEO-1, GEO-6). **Drainage (flow direction, flat rank,
accumulation, outfalls) is queryable per `hydro` cell** — the sewer hook's query surface (II.7.2). A sky island's terrain is
its own `Terrain` with its own key, datum, frame and `hydro` grid (volume 5).

**Water attributes along a shore.** A shore's bank kind and shore class are step `ChainProfile`s on the water body's
shore chain (§2.2 rule 5): a knot where the class changes, so a street end, a bridgehead or a quay inserted into the
shore afterwards never shifts which stretch is a beach and which a quay. The river `course` and its width and depth
arrays are S1's centreline of the reach, recomputed by S1's water operator whenever a batch moves or re-vertexes the
reach's shores, and `moveCourseKnot` is the one edit that changes the course directly (both §7.3 (b) 1), so a warp can
never leave the course behind.

**The oasis (item 111).** An oasis is a `WaterBody` of kind `pond` or `lake` carrying `spring` — its source point and its
flow share — with a **grove** (`Greenery` rows of kind `grove`, §2.7) around its shore and **irrigated gardens** (`LandUse`
faces of kind `garden`, §2.7) beside it, each grove and garden naming its water body in `fedBy`; the short channels from
the water to each garden are drawn from those links (§8.2), never stored. *Written* by S1 on an arid site at the arid
climate row's chance, likelier with no other water (§4.2 S0 and S1), by a dossier's `oasis_water` (§7.7, its DR row
citing DR1), and by T2 `ground`'s point-and-level form with its spring flag (§7.1), which adds or removes the water body
with its grove and gardens in one event. *Read* as water by every rule that reads water — the water pull on the growth
field (§4.2 S3, §4.4), the prosperity field's water term (§4.5), wells and fountains by ground yield (§4.7 S10b), mills,
water trades, bathhouses, the aqueduct's supply, the island and underground rules — the pull weighted by `spring.flow`;
volume 6's failing spring lowers `flow` over epochs (V06). *Persisted* as the fields; *regenerated* with the site by S1 (a hand-made or
dossier-made oasis is re-applied from its event); *undone* by its event's undo record (§7.4's T2 row); *migrated*: absent
`spring` is a body with no spring, absent `fedBy` a grove or garden fed by none. A sky island's water is volume 5's:
item 111's oasis, water pull and climate cell do not apply there.

**Slow change — what each terrain and water conversion changes (item 25; the kinds, their rarity rows and their rates
are §4.11's, their local repair §7.3 (b)'s).** Terrain and water are the slowest layer, not an immutable one.
* `siltReach` on a reach or basin: its `widthProfile` and `depthCm` fall by the row's share and S1's water operator
  re-buffers its shores from the unchanged `course` (a basin below the harbour's draught loses its harbour role, §4.11);
  on an `oxbow` it shrinks the shore by the row's share and, below 0.1 ha, removes the water face and types the land
  `marsh` (V06 §3.12).
* `reclaim` of a marsh or a foreshore: the water face's L0 ring retreats (a moved shore, §7.3 (b)) or the marsh `LandUse`
  face is re-typed; the new ground is an L3 land-use face marked `reclaimed` (§2.7), drained to the nearest outfall by a
  `ditch` water body cut like a canal (§4.11's carve).
* `shiftCourse`: the reach is re-traced between two control knots with fresh ordinals (`nextControl`), the old shores'
  vertices demoted as §2.2 rule 3 states; a meander cut-off's abandoned loop becomes an `oxbow` minted in the same op (the
  river's lineage, the op's epoch, index 0), an avulsion's abandoned channel — and the old bed of any other re-trace — a
  `marsh` land-use face.
* `digCanal` is §4.11's `carve` of kind `canal`.

Each is a lifecycle event on the water body or land-use face with cause `convert:<kind>` (§2.8), undone from the chain's
replaced scope (§7.4). A building's basement decision (§2.6) reads these facts — the nearest water surface's elevation
and the `hydro` grid's accumulation — with `ContextVector.terrainClass` (§2.5). Emulation note: neither reference has
time; MFCG's warp and FTG's water drawing already let a user reshape water, which the base keeps as edits (§7.1); this
adds only slow change over epochs (item 23).
=== END ===

=== REPLACE ### 2.4 Ways (the skeleton) and typed edges ===
### 2.4 Ways (the skeleton) and typed edges

```ts
type WayClass = 'through'|'primary'|'secondary'|'lane'|'alley'|'cul_de_sac'|'track'|'path'|'quay'|'pier'|'bridge'|'ford'
  |'aqueduct' /* item 110 (b): a water channel, `raised` wherever it is carried above the ground, never a traffic edge and never a portal; its buried stretches stay a line on ground part 0 */;
interface Way { id: Id; class: WayClass; spine: ChainRef /* ('way', id): the L1 chain, resolved by the kernel (§2.2 rule 5) */; width: Cm | ChainProfile<Cm> /* 'width_knot' on the spine; a constant-width way stores a scalar (§2.2 rule 5) */;
  surface: 'paved'|'cobble'|'dirt'|'planks' /* derived at S10a's end by volume 1's rule unless edited (V01 §3.7.3) */;
  name?: NameRef; from: NodeRef; to: NodeRef /* gate, plaza, bridge, harbour, junction, external bearing — an external bearing names the trade partner it leads to by the partner's key (§7.7's TradePartner, item 77; the settlement's derived TradeFlow weighs it, §4.3) */; growthStage: number; epoch: number;
  provisional: boolean /* an S5-grown spine beyond a stage boundary: the only ways the inter-stage trim may cut (§4.4) */; bridge?: Id /* the §2.7 Bridge deck it crosses */;
  raised?: RaisedWayRecord /* g item 110 (b): a way on a ground arena part ≥ 1 carried above the ground (§2.7) */;
  slopeP95: number /* written by S9 for every way from the unlevelled terrain along its spine — S10 and S11's levelling (item 110 (a)) never rewrites it; a terrain stroke re-samples it (§7.3): volume 1's stair-stepped way rule reads it (V01 §3.6; the sewer reads `wayFall`, below) */;
  corridor?: FaceRef /* L2 view */;
  formerClass?: WayClass /* written by downgradeWay and by volume 5's landfall when it drops a covered way to track; cleared by upgradeWay, the landfall clearance (V06 §3.5.2) or a setAttr of class (§4.11) */;
  lifecycle: Lifecycle }
interface Junction { id: Id; vertex: VertexRef /* ('junction', id) */; arms: Id[] /* ways; on an underground part the tunnels or galleries meeting there (V04) */; kind: 'T'|'X'|'Y'|'end'|'gate'|'bridgehead'|'square'; wedges?: FaceRef /* L2 view */;
  chamber?: true /* underground: a navigable junction wedge drawn and used as a sewer chamber (II.7.2) */; lifecycle: Lifecycle }
declare function wayFall(way: Way, t: TerrainSampler, levelCm: Cm /* the dead band: volume 4's NetworkRule.levelCm (V04 §2.3), which its caller passes */): 'from'|'to'|'level';   // the drainage direction along a way — a reading, never stored
```

`wayFall(way)` compares the terrain sampler's height at the spine's `from` end with that at its `to` end: a difference
beyond `levelCm` (10 cm) either way gives `'to'` or `'from'`, else `'level'` (II.7.2); a stored `flowToward`
in an older document is dropped on load (§7.5).

Edges carry role sets, not a single type, and a way's class, width profile and surface are attributes of the `Way`
(§2.2 rule 7). Every record of §2.4–§2.7 and PART II reaches geometry only through `FaceRef`, `ChainRef`, `EdgeSetRef` or
`VertexRef`, never through an arena slot, and holds a vertex position only where §2.2 rule 5 allows it. Every entity
record embeds the `Identity` and `Lifecycle` of §2.8 — its `id` and `lifecycle` fields are those, shown on every entity
interface — and no record stores a seed or a stream key: streams derive from the entity's lineage on demand (§6.1).
A raised way's records (ground parts ≥ 1, §2.7) keep the ground's unprefixed addresses (§2.1): their arena is
`Identity.key`.

**No `passage` way class (item 30).** A passage through a building is not a way: it is an L3 face of kind `passage` under
the front building's wing (§2.5's `Passage`, cut by S10 on §4.6's reach; the kernel's J-A30.31 — no nesting exception, no
new operation), reached as an access face and drawn with an arch glyph (§8.3). `WayClass` is unchanged, and the
underground layer carries `tunnel` and `gallery` chains — an undercity's walkways among them — never ways (§2.2 rule 1).

**Missing and contradictory data.** A way without `name` is legal until S13a names it (alleys, tracks and paths may stay
unnamed, §9). A way whose external bearing names a trade partner the current slice no longer holds (a dossier removal,
§7.7) keeps its geometry, its bearing and the recorded key: the road outlives its trade, and `TradeFlow` weighs it 0
(§4.3); T77-1 carries the clause (§13.2). A document without `slopeP95` has it written on load by S9's rule from the
terrain along the spine (§7.5); a stored `flowToward` is dropped (above). A `formerClass` equal to `class` reads as
absent. `Way` and `Junction` are entity-registry kinds (§2.8), so the registry's path test (§13.2 *Document tests*,
O11 a) covers their generation, persistence, edit, undo, regeneration and migration.
=== END ===

=== REPLACE ### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector ===
### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector

```ts
interface District { id: Id; kind: DistrictKind /* feature-named, data-defined, never a social class: central, market (one per market of either rank, item 24), docks, gate, riverbank, castle, temple, park, craft, sprawl, suburb, shanty,
      and the pseudo-districts — hinterland; underground (the owner-staged layer's, II.7.3); undercity (one neighbourhood of the undercity, in its void's part, II.7.5; item 65); the sky kinds (§10.2's sky-island, sky-palace, sky-temple, sky-prison, sky-tower rows, keyed apart from every ground kind); village (the village product's one district covering its settlement, PART III (4), V07 §3.7) — … */;
  quarter: Id /* the label-level grouping (§9.1) */; faces: FaceRef /* L1 coarse faces, before and after infill */;
  boundary: TypedBoundary /* a derived view over `seams`, never serialised (below; II.5's readiness reads it) */; seams: Id[] /* its Seam records (II.1), from milestone 1 */;
  character: CharacterVector /* item 72 (a): what the district has become (below) — written by S12c and each epoch's character step (§4.5 (2)); derived: recomputed on load, outside the model digest (§6.2) */; venueMix: Record<string, number>; prosperity: { mean: number; band: string }; growthStage: number;
  identity?: { row: string /* the §10.2 row it took: a quarter-identity row, a family's or a sector's dominant row, or a plain row by band */; source: 'dossier'|'emergent'|'dominant'|'plain'; sinceWeek: number /* §4.11's week */ } /* item 72 (d′): its quarter identity (§4.5 (4)) — model data in the digest, written by S12c, by an epoch's character step past its hysteresis and by a dossier kind (a district-defining institution, a matched naming claim, §7.7); a setAttr overrides an identity the dossier did not set (§2.8's fact tiers) */;
  bandRange: [string, string] /* item 72 (d‴): the floor and ceiling bands (FieldBands.bands ids) of what any building in it may be — derived by S10a from its prosperity value through §10.2's bandRanges rows (§4.5 (5)), recomputed on load, outside the model digest */;
  pressure: number /* item 72 (d‴): the leaky sum of the excess the dials would push past the range (§4.5 (8)) — model data in the digest, written only by epochs; 0 with none */;
  nameHistory?: NameRef[] /* item 72 (c): the names a rename replaced, oldest first — §6.3's epoch rename and a dossier rename keep the old name here (§10.4) */;
  parent?: Id /* item 65: an undercity neighbourhood's surface district, the one it shadows (II.7.5); written by the undercity's stage */;
  terrace?: 'on'|'off' /* item 110 (a): a declared terracing (T8's chip, a skeleton quarter's `terrace`, the clerk's API; V01 §2.2); absent: derived by terraceState (V01 §2.3), which §4.7 S10's district-edge source reads; model data in the digest */;
  outskirts?: Id[] /* item 65: an undercity neighbourhood's sewer-front blocks in part 0 (II.7.3) — a link across parts, never a second key (J-A65.31); written by the connection stage (II.7.6) */;
  core?: Id /* item 65: an undercity neighbourhood's main chamber — its plaza and black market (II.7.5); written by the undercity's stage */;
  fabric: FabricStrategyId /* a registered fabric (FabricStrategyId, below): 'bent-cut' in the base and the parity presets; S7c or a declaration sets a hood.templates row at stage 2 (V01 §2.2); the village product's district 'village-ways' (V07 §3.7) */;
  fabricParams: Record<string, number> /* the template's parameters; `depthRatio`, when present, is the footprint depth-to-width ratio S11's `detached` and `hovel` templates read (V07 §3.2 (5)), absent: the template's own */;
  buildingScale: number /* 0.5–2, default 1: FTG's "smaller / bigger" knob as a continuous multiplier on footprint targets (§4.7 S11) */;
  materialOverride?: Partial<MaterialRow> /* §2.6 */; allocation: Id /* the district's Allocation record (§4.5 S7b) */; subDistricts: Id[];
  description?: TextRef /* a generated one-line summary of the mix and features (§10.4), regenerated when the mix changes, editable */;
  namingFeature?: Id; name?: NameRef; lifecycle: Lifecycle }   // labels: LabelEntity (§9.1)
type FabricStrategyId = string;   // the id of a registered FabricStrategy (§14's StrategyRegistry.fabric; §4.12): 'bent-cut' (NG's `area`; the base's own) and the other row keys of V01's `hood.templates` table (V01 §2.2: 'street', 'square', 'ring', 'quay', 'wallside', 'crossroads', 'landmark', 'bridgehead', 'stepped', 'park'), and V07's 'village-ways' (V07 §3.8), which is no hood.templates row; every further fabric is a registration (§14's extension points)
interface SeamRun { seam: Id; edge: number /* index into Seam.edges (II.1) */; type: SeamEdge['type']; hard: boolean; lengthCm: Cm; portals: Id[];
  walled?: 'full'|'parapet' /* a `wall` run: its stretch class (g item 106 (c)); a closure-only barrier arc types by its barrier instead */ }
interface TypedBoundary { outer: SeamRun[] /* in the district's ring order */; holes: SeamRun[][] }   // assembled from District.seams on demand; V01 §2.3 cites it
interface CharacterVector {   // item 72 (a): a district's derived five-component profile — the one meaning of "character" (J-A72.41; the per-district input is §7.7's DistrictIntent); S12c and each epoch's character step compute it (§4.5 (2)), draw-free; every share significance-weighted (§4.5 (1))
  mix: Record<string, number> /* (1) the plot mix: each class family's share of what was placed in it (§10.2's families), Σ = 1 */;
  powers: Record<string, number> /* (2) political alignment: each power's share (a PowerStanding key, §7.7) by the partition weights (§4.5 (7)) */;
  trade: number /* (3) trade position, 0–1: its trade-weighted frontage over the busiest district's (§4.3's TradeFlow) */; tradeBearingCdeg?: Cdeg /* the weighted mean bearing of the gates whose routes cross it */;
  sectors: Record<string, number> /* (4) economic role: for each sector, the district's weighted presence over the settlement-wide total (§10.2's sectors) */;
  mainRoad: number /* (5) relations: the share of its frontage on through and primary ways */; anchors: { institution: Id; weight: number }[] /* (5) the significant institutions near it and its contributions to them */ }
// Quarters are §9.1's QuarterNode merge tree, built by S6 (§4.5); its city cut is the city-LOD label unit (§9.4)
interface SubDistrict { id: Id; district: Id; blocks: Id[]; cluster: string /* roster cluster tag, e.g. a trade group */; lifecycle: Lifecycle }   // FTG's sub-district: a contiguous block group a cluster is placed into (§4.7 S10a)
interface Reservation { id: Id; kind: 'castle'|'plaza'|'market'|'precinct'|'institution'|'park'|'harbour_basin'|'moat'|'canal'
    |'landing' /* a sky landing's yard (V05 §3.10); on the ground, SKY's writes under the data key reservations.landing */
    |'green' /* a village green, owner commons, its Greenery of kind green; §4.2 S3 (12)'s market rule reads it as a plaza candidate at village rungs (V07 §3.6 (4)) */;
  rank?: 'principal'|'secondary' /* market kinds only (item 24): the principal market — the plaza when it wins S3 (12)'s trade score, else a flanking site — or one of S7b's secondary markets (§4.2, §4.5); setAttr-editable */;
  face: FaceRef /* L1 barrier face(s); water kinds are L0 faces */; areaBandM2: [number, number]; compactnessMin?: number;
  owner?: Id /* castle, institution, commons */; handedFrom?: Id /* the institution whose reservation this was before it went up to a sky island (V05 §3.5); the owner is then its hand-over instance, or commons for a park */;
  attach: VertexRef[] /* ('attach', reservation id, i): perimeter vertices arterials end at (plaza) or the wall welds through (castle on the enceinte) (§2.2 rule 5) */;
  stage: StageId /* S3, S7 (gate plazas), S7b, or S8 (a template plaza or green plaza, V01 §3.4.5) */; lifecycle: Lifecycle }
interface Allocation { id: Id; level: 'town'|'district'|'block'; target: Id /* town, district, block, the hinterland pseudo-district, a sky pseudo-district (II.6), the underground pseudo-district (II.7.3) or an undercity neighbourhood (II.7.5) */;
  rows: { cls: string; band: string; count: number; claim?: Id /* Reservation for items larger than a block */; subDistrict?: Id;
    near?: Id /* hinterland rows only: the district an edge orchard serves (§4.9) */; areaM2?: number /* area-sized rows: edge orchards, sky capacity */;
    at?: PointCm /* a positioned row: a sky landing's foot (V05 §3.10) */; access?: Id /* its SkyAccess */ }[];
  lifecycle: Lifecycle }   // persisted; the eager content decision every lazy or per-district stage honours (§4.1 laziness contract); stores no stream key (§2.4)
interface FieldBands { field: 'prosperity'|'density'|'greenery'; cuts: number[] /* ascending, on the field's [0, 1] value */; hysteresis: number /* default 0.02 */;
  bands: string[] /* the band set's ids in order — cuts.length + 1 of them — from §4.5's `prosperity.bands` table (item 27); every band-keyed row key is one of them */;
  middle: string /* the settlement's middle band — the band that holds its median household under the roster's wealth shares, designated at S6 with the cuts (§4.5; J-A27.42): the band §4.11's geometry floor bounds a plot's manifested geometry to (item 31), and the row §2.6's interior ladder reads as its middle (item 28 (f)) */;
  source: 'roster-shares'|'table'|'edit'; epoch: number }   // computed once per town at S6 and changed only by an explicit edit or an epoch (§4.5)
type BlockKind = 'ordinary'|'manor'|'square'|'green'|'yard';                             // S9b's dispatch output (V01 §3.5)
type SquareType = 'forecourt'|'crossroads'|'bridgehead'|'trading'|'well'|'plain';        // a square's function (V01 §3.5.3): 'trading' a small open trading place — never a market, no stalls, no market rank (item 24); 'plain' only for a template plaza no rule types
interface Block { id: Id; face: FaceRef /* L2 built block(s) */; district: Id; subDistrict?: Id; frontages: Frontage[];
  depthClass: 'standard'|'deep' /* S8's deep-interior test (§4.6): 'deep' when, as recursion stops, the block's local thickness exceeds twice its band's plot depth — written with `interior`, read by §13.5's keep-test (the court share of deep blocks within band per class) */;
  interior: 'plots'|'court'|'back_lane'|'through_alley'|'rear_plots'|'green'|'landmark'|'reserved'|'wall_strip'|'empty'
    |'rim_strip' /* a sky island's unbuilt rim walk (V05 §3.10) */ /* the deep-interior treatment, decided in S8 (§4.6); 'wall_strip': an enceinte's band, setback and glacis block, never plotted (§4.8) */;
  reach: 'open'|'passage'|'gated' /* item 30: how a court or rear-row interior is reached from the public way — drawn with the treatment in S8 (§4.6); 'open' for every other interior and in the parity presets */;
  due?: { band: string; since: number /* the epoch of the crossing */; epochs: number /* epochs spent in that band since */ } /* item 31: the block's value crossed a cut past the hysteresis at an epoch and its stock has not yet met the new band; written and cleared by §4.11's wealth ladder, never by a brush */; reservation?: Id;
  content: BlockKind /* S9b's typing (V01 §3.5); 'ordinary' in every document written before M5 */;
  squareType?: SquareType /* when content is 'square' */;
  ringCentre?: true /* the innermost face of a ring template: S9b's forced pick (V01 §3.4.4) */;
  voidCorner?: { junction: VertexRef /* ('junction', id) */; radiusCm: Cm } /* a void square's corner claim on this block (V01 §3.4.5) */;
  overrides?: InstanceOverride[] /* §2.7's uniform instance-override field: the hood pins' `instance` overrides, their op, ordinal ('hood:<n>' generated, 'u<n>' user) and style in the event itself (§7.1, §8.10) */;
  platformCm?: Cm /* item 110 (a): the platform datum of a levelled block — written by S10's levelling of the block or of the ward that holds it (§4.7 *Levelling and retaining walls*), re-derived with its levelling unit, never a write to the Terrain raster; read by levelledGroundCm (§4.7) and through it by every ground sample (§2.6's datum, the basement gate, V03's outside ground, V05's surface); in the block's leaf digest; absent: not levelled */;
  lifecycle: Lifecycle }
interface Frontage { id: Id; way: Id; edges: EdgeSetRef /* ('frontage', frontage id): the L2 kerb edges of this block on this way */; class: WayClass; lengthCm: Cm /* written by S9 with the edges, read by S10's frontage cut and CharacterVector.mainRoad */; lifecycle: Lifecycle }
interface Plot {
  id: Id; face: FaceRef /* L3 */; block: Id; district: Id;
  frontage: EdgeSetRef /* ('frontage', plot id) */; access: EdgeSetRef /* ('access', plot id): ≥ 1 edge always (§5.2 F-PLOT); an access edge lying on a sealed Passage face (below) is a sealed access edge */; depthCm: Cm; frontageCm: Cm;
  exposure: 'street'|'lane'|'alley'|'court'|'hidden'|'sealed' /* item 30: how the plot is reached — derived at §4.6 from the block's interior access graph when S10 types the access edges (by adjacency and reach depth, never a sight line, J-A30.42); 'hidden': every reach to a public kerb passes a passage, a gated opening or two or more interior faces; 'sealed': every reach passes a sealed passage */;
  knownTo: 'public'|'local'|'secret' /* item 30: who knows the place — defaults from exposure (hidden → local, sealed → secret — item 30 (e)'s lost place, J-A30.24 — else public), otherwise a dossier fact (§7.7) or a setAttr; read by §9.2's label policy and the reader (§11.2), never by geometry */;
  tenure: 'owned'|'rented'|'common'|'informal' /* item 70 (a): who holds the ground (below) — derived by §4.7's rule (Informal clusters (1)), written with the plot by S10b and S11 and re-derived by every event that changes its inputs; a setAttr overrides it, kept as an edited path (§7.2); a persisted attribute column, in the leaf digest (§6.2) and the snapshot */;
  partyWalls: EdgeSetRef /* ('party_wall', plot id): one shared edge per wall; the neighbour is the owner of the face across */;
  bounds: PlotBound[] /* the boundary treatment of every non-party-wall edge (VIS-8) */;
  owner?: Id /* household | business | institution */; use: PlotUse; sitePlan: SitePlan;
  buildings: Id[] /* 0..n footprints */; yard: YardPart[] /* typed sub-areas (YardPart, below) */;
  builtBand: string; builtProsperity: number /* item 31: the band and the field value on [0, 1] the plot's present stock was built for — persisted attribute columns, in schema order in the leaf digest (§6.2) and in the snapshot (§2.9), never recomputed from the field (J-DET-12); written by generation and the paths J-A31.44 lists (§4.11) and by no bare setAttr (§7.1). The **geometry floor** is derived at read, never stored, from builtBand and FieldBands.middle by §4.11's floor rule, so a changed middle designation needs no migration; that rule, the manifested band a plot's geometry reads and what writes builtBand are §4.11's (J-A31.43, J-A31.44); a block's `due` mark is that ladder's trigger; with no epoch the manifested band is the field band everywhere (item 23) */;
  fieldBand: string /* item 28 (f): the **occupants' band** — the plot's prosperity band by §4.5's rule with its hysteresis read against this column, so the band's memory moves with the band (J-A28.29); set by every derivation that reads the current field (= its ctx.prosperityBand, banded against this column, by the cuts alone at the plot's first derivation — a field brush's re-derivation past τ among them, §7.2; Regenerate (keep settings), which reads the recorded inputs, keeps it as it keeps builtBand) and re-banded after S6 at every epoch (§4.11); a persisted attribute column, in the leaf digest (§6.2) and the snapshot (§2.9), derived — no setAttr (§7.1); read by §2.6's interior ladder, ClassRules.pick and the plan rung's recorded inputs (§2.8) */;
  ctx: ContextVector; derivedFrom: DerivationRecord /* §2.8 */; assignment?: AssignmentRef; members?: Id[] /* joined plots (EVO; item 31's fusion, §7.1) */;
  deck?: { host: Id; kind: 'bridge'|'pier'|'mole'|'quay'; surfaceCm: Cm | null; landmark: boolean } /* g item 110 (d): a plot on a bridge, pier, mole or quay platform — the fields and their rules are §2.7's Deck plots */;
  platformCm?: Cm /* item 110 (a): the platform datum of a levelled plot — written by S11's levelling from the plot's site plan (§4.7 *Levelling and retaining walls*), re-derived with the plot, never a write to the Terrain raster; read by levelledGroundCm (§4.7) before its block's; in the plot's leaf digest; absent: not levelled */;
  lifecycle: Lifecycle;
}
interface PlotBound { id: Id; edges: EdgeSetRef /* ('treatment', bound id): the treated sub-edges; a gate opening is the sub-edge carrying the indexed `gate_opening` role instead of `treatment` (splitThrough at the gate ends) */;
  side: 'frontage'|'side'|'rear'; treatment: 'none'|'fence'|'hedge'|'wall'|'railing';
  heightCm: Cm; gates: { opening: EdgeSetRef /* ('gate_opening', bound id, i): the open sub-edge */; widthCm: Cm }[] /* every access edge with a treatment has ≥ 1 */; ownedBy: Id /* one owner per shared edge */; lifecycle: Lifecycle }
interface YardPart { id: Id; kind: string /* data-defined — the designation templates' yard rows name them (§10.2 DesignationTemplateRow.yard): yard, garden, court (every hole of a footprint face is one, below), orchard, midden, pen, vacant, formal_garden, forecourt, churchyard, shore, footpath (item 70: a cluster plot's internal path, narrower than an alley, onto which every structure's door opens, §4.7 S11), … */;
  face: FaceRef /* L4: a yard sub-area bounded by 'yard_part' edges (§2.2 rule 7), made by S11's yard partition (§4.7 S11, §4.9) */; lifecycle: Lifecycle }   // the lineage unit of its address is the plot (§6.3)
// DerivationRecord (what S10–S12b read last time; Regenerate (keep) re-reads it, §4.5, §4.11) is defined once, in §2.8.
interface SitePlan { arrangement: 'row'|'compound'|'detached'|'hovel'|'tents'|'institution'|'cluster' /* item 70: informal structures packed along footpaths, each with its own door (§4.7 S11); `tents` stays FTG's row for the parity presets */|'none'; coverage: number; slots: BuildingSlot[];
  frontJitterCm: Cm /* the drawn front-line recession h (§4.7 S11, item 43): 0, or in [jitter.minM, jitter.maxM] */; ruleRow: string }
interface Passage { id: Id; face: FaceRef /* the L3 face of kind passage: a covered alley-as-face cut along one side line of the front plot, from the kerb to the court or rear row it serves (§4.6, §4.7 S10 (9)); the kernel's J-A30.31 */; block: Id; frontPlot: Id;
  frontBuilding?: Id /* the building whose wing spans it — written by S11 with its wings' spans and cleared with them (§2.6's BaseWing.spans, the one statement of the span's life) */;
  widthCm: Cm; headroomCm: Cm /* the passage's clear height — the ground storey it takes, the storeys above keeping the frontage continuous (§2.6): the least ground-storey height (eaveCm ÷ floors, rounded down to the centimetre) over the base wings that span it; derived, written by S11 whenever it writes those wings' spans (so on every re-fit) and re-derived inside every other event that changes a spanning wing's heights (a `setAttr` of heights, §7.1, or its `undo`, §7.4), which holds the passage in its effective scope (§7.3 item 1); kept as it stands, and read by no reader, while no wing spans it, until S11 writes it with a successor's spans. S11 gives every spanning wing at least two floors (raising its class row's floors to two where they would be one), so each spanning wing's eave stands above the headroom (§8.5 (2)'s span mark, §8.4, §11.1); a heights edit that would leave a spanning wing below two floors is refused (F-EDIT, §5.2) */;
  sealed: boolean /* item 30 (e): a bricked arch — sealPassage / openPassage (§4.11, §7.1), no geometry change; the one stored bit behind "a sealed access edge" and a plot's exposure 'sealed' (§4.6) */; lifecycle: Lifecycle }   // item 30; the entity registry (§2.8)
interface BuildingSlot { role: string /* house, hall, stables, workshop, chapel, barn, kitchen, brewhouse, tent, … */;
  entranceOn: EdgeSetRef /* ('access', plot id): the access edges the slot's main entrance faces (§2.6's Entrances rule 1): the frontage for a front slot, the court or the path from the plot's street gate for a set-back one (item 29); a hidden plot's door faces its passage or court, and a cluster structure's the `footpath` that reaches these edges (items 30, 70); side, rear and yard doors read the plot's other access edges and yard parts there */;
  frontage?: 'none'|'lean_to'|'stall'|'shopfront'|'arcade'|'gate'|'wall' /* the designation template's frontage treatment for the main slot (§4.7 S11, item 19), persisted with the slot */;
  unhoused?: true /* item 28 (f): present only on a residential slot of a workplace's or an institution's plot — its main slot or one within a required structure's least count — for which §4.7's generation fill found no household of its band or drift, and which S11 so built as a slot without houses: every reader of a slot's houses (§4.7 S11, §2.6's capacity, §13.2 T19-4) reads it as one without; written by every run of that fill, cleared by the designation mutator (§4.7), whose undo restores it with the former parts */ }   // persisted: no polygon
interface SlotPlan extends BuildingSlot { hint: Polygon /* S11's working shape for the slot — transient, never stored; a later outline() or compose() call gets the building's current footprint ring, resolved from its FaceRef at the call (§2.6) */ }
interface ContextVector {   // the one per-plot vector every rule table reads (owner hook; O7 / O17 / O18 / O19) — the object the plot model, the prosperity field, granularity and greenery share
  areaM2: number; shape: { obbW: M; obbD: M; compactness: number; reflex: number; corner: boolean; wedge: boolean };
  frontageM: number; roadClass: WayClass; roadWidthM: number;
  districtKind: DistrictKind; quarter: Id; venueMix: Id /* the district's mix, read through the district, never copied per plot (SCL-5) */;
  prosperity: number; prosperityBand: string; density: number; greenery: number;   // continuous values + banded class (O18), as sampled at the plot's derivation; after it a building's interior reads the current sample and Plot.fieldBand
  dist: { centre: M; plaza: M; market: M /* the nearest market of either rank (item 24) */; gate: M; wall?: M /* absent where the arena holds no enceinte — an unwalled town, a village with no palisade, a sky island without an author's island wall (V05 §3.21): a `wall` or `wallInner` row then finds no target, as a `harbour` row does where no harbour exists */; water: M; shore: M; harbour?: M } /* at village rungs, below */;
  upstream: number /* 0 = upstream … 1 = downstream along drainage */; slope: number; aspect: Cdeg; upwind: number; baseCm: Cm;
  terrainClass: 'high'|'mid'|'low'|'damp'|'flood'|'rock'; growthStage: number; epoch: number; buildingScale: number;
  arena: 'ground'|'underground'|'sky' /* item 12: keys the arena-specific rows of the granularity table and of the designation templates' arrangement (II.7.3); every underground part reads 'underground', a system's own rows being its rule's (II.7.5, II.7.6); 'sky' on an island's arena, its values read as V05 §3.11 states */;
  rosterAssignment?: AssignmentRef /* the roster line's claim — written by S10b when a roster assignment claims the plot; read by S11's designation template and the class-mix step */;
  assignment?: AssignmentRef /* the dossier assignment that claims the plot (§7.7) */;
}
```

The context vector is written by S10 for every plot at its derivation (§4.7 S10 (10)) — its `dist` readings, `upwind`,
`aspect`, `slope` and `baseCm` sampled from the committed ways, reservations, water, wind and terrain — and stored as struct-of-arrays
columns per district partition (one typed column per field), never as an object per plot (SCL-5). **At the rungs whose
`RungProfile.frameLaw` is `territory`** (the village rows (b)) `dist.centre` is measured to the
`VillagePlan`'s heart (V07 §3.2 (4)) and `dist.gate` to the palisade's gates, else to the points where a `through` way or
a road to a neighbour crosses the settlement's perimeter (V07 §3.7); `dist.market` to the reservation carrying the
principal market rank (the open space, or the flanking square where there is none; V07 §3.6 (4)), else to the first
nucleus's open space, else to the heart — a secondary fair field never counted; `dist.harbour` to the wharf's `quay` way
(V07 §3.10) where one is laid, else absent, a class row's "at a port" reading "a wharf is laid". So the `nearCentre`,
`nearGate`, `nearMarket` and `nearHarbour` rows and needs of the village classes, and V11 §3.13.4's `stepInward` and
`finalSeller`, read the village's own centre, entries, centre of trade and wharf.

A plot is the parcel (the owner's stage-3 wording and the references' code say *lot* for the same thing; this document
says *plot* except when quoting them, and *building* only for a footprint with heights standing on a plot). A plot's
coverage, arrangement, separation and boundary treatment come from S11's designation templates (§4.7); a cadastral plot
outline is an optional drawing group, never drawn as a building (§8). A slot's shape is S11's working data, never a stored
polygon: after S11 the building's footprint face and its wings (§2.6) are the slot's geometry, so no plot record holds a
world position that a warp would leave behind (§2.2 rule 5; J-P50). S11's yard partition types every hole of a footprint
face as a yard part of kind `court`, whatever the designation template's yard rows name (their shares type the plot's
other yard parts, from M3a).

**What the records are for.**

* **Districts are feature-named, never class-named (J-P1, refined by item 72).** A district's kind names its feature or
  function — the typing the stages read (§4.5); its **identity** is what it has become, derived from what landed in it
  and the powers it answers to (a religious quarter, a craftsmen's quarter, a merchants' quarter, or a plain residential
  identity by band), and names and describes it (§10.4) without zoning it by class; an identity row may re-type the kind
  at an epoch (§4.5 (9)). "Rich quarter" and "poor quarter" stay *descriptions* derived from the prosperity field for
  naming and the description line only; wealth varies continuously through the prosperity field (MFP-7). A
  **pseudo-district** is a district record that is no surface district of the settlement: the hinterland, the sky
  pseudo-districts (II.6), the underground pseudo-district (II.7.3) and each undercity neighbourhood (II.7.5).
* **Character, identity, range and pressure (item 72).** `CharacterVector` is derived and recomputed on load — never an
  input, which is §7.7's `DistrictIntent`; `identity` and `pressure` are model data that generation and the epochs
  write; `bandRange` is a derived bound; `nameHistory` keeps the names a rename replaced. How each is computed — the
  significance weights, the partition, the identity rows, the three dials, the pressure's law — is §4.5's.
* **Reservations** are the large claims made before the streets (§4.2 S3) or before the lanes (§4.5 S7b): castle bailey,
  main plaza, market, church or cathedral precinct, large institutions, parks, and the water kinds (harbour basin, moat,
  canal) that are carved into L0 before any way is routed. A reservation is a barrier to growth and infill; the claimed
  entity is built inside it. A reservation whose institution a later S7b (5) slot takes up to a sky island is handed over
  by V05 §3.5 (the row's hand-over class, else a park) — never left without an owner — its `handedFrom` naming the
  institution.
* **Allocations** are the persisted content decision: which classes and how many, in which wealth band, go to each
  district, sub-district and block — and, for the outside classes and the edge orchards, to the hinterland
  pseudo-district, and, when the owner-staged island toggle is on, to the sky pseudo-districts (II.6). They are computed
  eagerly for the whole town (§4.1) and every per-district stage reads them, so the town's content never depends on the
  order districts are derived or viewed (LC-2). An allocation stores no stream key — S7b and S10a draw from
  lineage-derived streams (§6.1) — so a district's New random re-draws its own block allocation and nothing else. The
  positioned `sky_landing` rows are SKY's writes under their own data key `allocations.landing` (§4.1), never a rewrite
  of a row S7b wrote; S10a reads `allocations` and `allocations.landing` together and takes each landing row's staff
  households (its class's) from the host district's `modest` residential rows (V05 §3.10 (4)).
* **DerivationRecord** (§2.8) is a plot's, block's or building's memory of its derivation inputs. "Regenerate (keep
  settings)" re-derives from these recorded inputs (faithful, byte-identical); re-deriving with current inputs is
  `Adjust`; a field brush compares each plot's current sample with the recorded one and re-derives only what §7.2's τ rule
  selects (τ = 0.01 of the field range, the same τ on replay; LC-6) — an authorial re-derivation that sets `builtBand` in
  its scope (J-A31.44); **an epoch never re-derives plots by τ**: it acts on survivors only through §4.11's wealth ladder,
  at due blocks, bounded by the geometry floor (item 31; LC-12).
* **PlotBound** gives every plot edge a treatment — none, fence, hedge, wall or railing — with gate openings on access
  edges, chosen by the designation template (§4.7 S11). It draws a walled manor compound, a fenced garden, a hedged field
  edge, and exports as VTT walls and GeoJSON lines (VIS-8; our compound enclosure — NG 1.2.2 draws none; FTG's fences,
  COV-FTG-F23). A plot in transition (item 67 (g)) keeps the rings its event gave it; a boundary line the event removed is
  drawn from its Works' kept lines until the clearing stage, and a new one as stakes first (`Works.before`, §2.7; §4.11's
  *Works*).
* **Exposure, passages and knowledge (item 30).** A `Passage` is the covered way under a front building that a `passage`
  reach cuts; its `sealed` bit puts its plots into §4.11's ladder as vacant (§2.8). `knownTo` is knowledge, not geometry —
  the place is always on the map, and only its name and purpose are withheld (§9.2, §11.2). A hidden plot keeps the
  access guarantee: ≥ 1 access edge and a chain of access faces to a public kerb (§5.2 F-PLOT, §5.3). An informal cluster
  (item 70) carries the guarantee down to each structure: every structure's main entrance opens on a `footpath` yard part
  that reaches an access edge of its plot (§4.7 S11's *Informal clusters*).
* **Tenure (item 70).** `owned`; `rented`, let out beyond what its buildings were built for; `common`, ground no one owns
  (commons, greens); `informal`, no single owner (squatted or customary ground). The `cluster` arrangement and §4.11's
  decline and formalisation paths read it.
* **Seams** (II.1), **FieldBands** (§4.5) and **vacant frontage runs** — ordinary plots with `use = 'vacant'` or a `yard`
  part joined to the neighbour (§4.7 S10 (8); COV-VG-VN-170) — are stated at their homes. Block `content`, `squareType`,
  `ringCentre` and `voidCorner` and their migration (a block without `content` reads `ordinary`; a stored square type
  `market` reads `trading`, §7.5) are V01 §2.7's lifecycle rows.
=== END ===

=== REPLACE ### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface ===
### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface

```ts
interface Heights { baseCm: Cm /* ground datum: floor level in terrain cm (below) */; floors: number /* 0 on a solid wing */; floorsBelow?: number /* derived, never set on its own: on Building.heights the basement's Basement.floors (item 29), 0 or absent without one; absent from every other entity's heights */; eaveCm: Cm; ridgeCm: Cm; towerCm?: Cm /* eave, ridge, tower above baseCm */ }   // owner HEIGHT ruling: always populated
type WingRole = 'main'|'range'|'cross'|'block'|'back'|'service'|'tower'|'turret'|'gate'|'part'|'shelter'|'tier'|'shrine'|'stair';   // each role's meaning is V02 §2.1's; the base outline builder writes main (a rectangle, the bar of an L or T), range (their other rectangle), part (a template or axis-locked part), shelter (a cluster structure) and, from M3a, tier, shrine and stair (the stacked-tier construction)
interface BaseWing { kind: 'rect'|'quad'|'polygon';
  ring: Polygon /* world lattice points, counter-clockwise — a derived shape record the wing-carrying rule keeps on the footprint (below).
                   rect: a rectangle — its four corners, and on its sides, between them, the footprint's and the building's other wings' vertices that lie
                   there · quad: a row footprint clipped to its plot (§4.7 S11) — four sides in ring order from corners[0]: sides 1 and 3 are the party-wall
                   chains (straight, or with the plot cut's one bend, §4.7 S10 (4)), sides 2 and 4 the front and rear chains, which may be bent or curved —
                   or a rect the carry turned into a quad (rule 3) · polygon: a template part (apse, octagon, star point) */;
  corners?: [0, number, number, number] /* rect and quad: the ring indices at which sides 1, 2, 3 and 4 begin (the ring starts at the first corner);
                   S11 records them when it clips a row or when a rect's sides carry other vertices, and every carry re-indexes them;
                   absent on a rect whose ring is its four corners ([0, 1, 2, 3]) */;
  ridgeAxis: 0|1 /* rect: along side 1 (0) or side 2 (1) · quad: 0 = the ridge joins the arc-length midpoints of sides 1 and 3, the party-wall chains
                    (eaves to the street), 1 = it joins the arc-length midpoints of sides 2 and 4, the front and rear chains (gable to the street) ·
                    polygon: unused (pyramid, cone or dome) */;
  partName?: string /* a footprint template part's name (nave, transept, crossing, chancel, apse, tower, cloister walk, …; data), written by the
                   outline builder's templates and kept by every wing writer on the wing that keeps its key; read by the plan rung's room placement and the
                   crypt's seed (V03 §3.2 A5 (e), V03 §3.7.4); absent on every other wing; its lifecycle row is V03 §2.5's */;
  spans?: FaceRef /* item 30: the Passage face (§2.5) this wing spans — on each base wing whose ring runs along the passage's edge (a stepped front building's
                   quads each). The one statement of a span's life: written only by S11, with `Passage.frontBuilding`, and cleared by S11, when it builds or
                   re-fits the passage's front building or the passage goes (§4.6, §4.7 S10 (9); a drawPassage, a block's reach changed to or from passage
                   (J-A30.72), densify … back_court's new passage and the rung-3 re-cut that removes a sealed passage with its rear row (amalgamate) reach it
                   through that re-fit, §7.1, §4.11 — sealPassage, openPassage and thin … back_court's sealing change no geometry and leave it) — and cleared,
                   with `Passage.frontBuilding`, inside the event that makes the front building a footprint trace (§2.8's `cleared`: `robStone` or `clear`,
                   which zero its heights) or a tombstone (`demolish`); each such event holds the passage in its effective scope (§7.3 item 1), and its undo
                   restores what it cleared (§7.4); the passage is then open above — its face, its `sealed` bit and its plots' access unchanged, and no span
                   mark, span caster or arch glyph drawn over it — until S11 raises a successor over it (`reuse … build`, `build`); absent on every other
                   wing. Its span ring and its extent above the ground are as Wing.spans below, so the capacity (below), the building's leaf digest and §8.5's
                   span mark read them before any composition exists, and a composition inherits them */;
  heights: Heights; roof: RoofSpec;
  role: WingRole /* its part in the building's plan */;
  key: number /* a stable ordinal in the building — written once when the wing is minted, never changed, never re-used after a removal
                 (Building.nextWingKey); edit paths (`wings/<key>/…`) and stage 3's per-wing streams name the wing by it; the base outline builder's keys equal
                 its indices */;
  arcade?: true /* stage 3: the ground storey is an open arcade (V02 §2.1); the capacity function gives it no ground-storey rooms */;
  on?: number /* the key of the wing this wing stands on — its floor is that wing's deck level (V02 §2.6): a stepped building's upper tiers,
                 its shrine and its upper stairs; absent: the wing stands on the ground */;
  solid?: true /* a solid mass with no interior — floors 0, its eave its top; no storey, room, dormer, porch or capacity (V02 §2.6) */ }
interface Building {
  id: Id; plot: Id; slot: number; footprint: FaceRef /* L4 */; wings: BaseWing[] /* ≥ 1; the footprint is their union exactly, kept so through every move by the wing-carrying rule (rectangle = 1, L = 2, T = 2–3, templates n; a clipped row house = 1 quad, or stepped quads on a slope); in V02 §2.1's canonical wing order */;
  nextWingKey: number /* the next free wing key; never decreases */; massing?: MassingRef /* the family, the composition row and grammar the massing read, and the entrance hint — present on a stepped or oval building from M3a and on every building under stage 3 */;
  class: BuildingClass /* its class row (below), written with the plot's designation (§4.7 S11) by the rule of *A building's class* (below) */;
  use?: Id /* the current Use record (§2.7): the roster class it houses, its specialisation and assignment — a split site's shop names its works' use by Use.branchOf (g item 105 (h)); absent: vacant (item 17) */; formerUses: Id[] /* the Use records that occupied it before, newest last — the traces item 17 (c) keeps (a former inn, a guildhall turned tenement) */;
  concealed?: Id[] /* item 63: the concealed Use records it houses behind its front (`use`), each with Use.concealment not 'none' and Use.front naming `use`; their knowledge is theirs (§2.7; §4.7's Concealed institutions) — absent: none */;
  dwelling?: Id /* the household living in a workplace (live-in), §4.7 S10b — one of its households; cleared by every event that takes that household out of the building — its relocation (§10.3: a use's move, a `relet`, §4.7's overflow pass, the capacity re-homing below) or its leaving at an epoch (the epoch's step (c), §4.11) — and by one that leaves the building no live-in use, the household staying as an ordinary one of `households` (§10.3's use that moves without it; a `liveIn` table edit, §7.6) */;
  households: Id[] /* the Household records housed (§2.7): the reverse of Household.building, kept by the writer that sets it — the generation fill (S10b's placement, written by S11 once the wings exist, §4.7), §4.11's relet, item 17's relocation (§10.3) — within the capacity bounds below; its length is the count the plan rung houses and the interior ladder reads */;
  entrances: Entrance[] /* ≥ 1 (item 29; the rules are Entrances, below); replaces the single entrance vertex */; nextEntrance: number /* the next free entrance ordinal, written only by deriveEntrances and setEntrance (Entrances rule 4) */; basement?: Basement /* the selective basement decision (Basements, below; item 29 (b)); absent: none */;
  heights: Heights /* the building's max over its wings; with a wing standing on another, the stack's envelope measured from its least ground wing's baseCm, floors = 1 + the highest storey level any wing reaches (V02 §3.15.2) */;
  roof: RoofSpec /* the model's default roof construction; a style sheet may override the construction, never the heights (§8.2) */;
  material: { walls: string; roof: string } /* from MaterialRow; setAttr-overridable; a rendering attribute only (below) */; condition: 'kept'|'worn'|'neglected' /* item 31 rung 1: the fabric's wear — a rendering-class driver like material (§8.2: wear, patched roofs), never a shape input and not an existence state (§2.8); stepped down by §4.11's ladder, restored by renovation */;
  knownTo: 'public'|'local'|'secret' /* item 30: defaults from its plot's exposure and knownTo; a dossier fact for a dossier-backed institution's buildings (§7.7); read by §9.2 and the reader, never by geometry */; predecessor?: Id /* item 8: the cleared trace or ruin this building was raised on (§4.11's reuse … build; the trace's address passes by succession, §6.3) */; reusedAs?: 'garden'|'orchard'|'field' /* item 8: what a reused trace became (existence reused, §2.8) — the trace keeps its L4 face and is drawn as that kind (§8.2); written only by §4.11's reuse conversion or its convert by hand (§7.1); absent on every other building (J-A8.22) */;
  works?: Id /* item 67: the Works (§2.7) running on it; its stage at a week is derived by §4.11, never stored; cleared when the Works finishes, is cancelled or is retired */;
  description?: TextRef; openingHours?: OpeningRow[];
  subLocations: Id[] /* SubLocation records, from the class table */;
  declaredRooms?: { role: RoomRole; count: number; storey?: number }[] /* item 101's declaration — rooms the author declares this building must hold; setAttr path declaredRooms (T9 shape); read by the plan rung as hard programme rooms (V03 §3.2 A2 (7)); in the leaf digest */;
  composition?: Composition /* stage 3: lazily generated rung by rung (the elaboration record and cache, §2.8, §2.9), stored only when edited — the first composition or plan edit stores it (§7.1); its streams derive from the building's lineage with each rung's own reroll (§6.1) */;
  assignment?: AssignmentRef; drift?: DriftBounds; lifecycle: Lifecycle;   // no occupants list (J-A28.29): the housed are households (with a workplace's live-in dwelling), those who work there §10's Posting records
}
type BuildingClass = string;   // a row id of the roster's class table `roster.classes` — §10.2's BuildingClassRow.id, compiled by V11 §2.3 from V11 §3.5's town and city classes (hovel, row_house, cottage, house, town_house, manor, inn, workshop, warehouse, chapel, church, great_temple, castle, tower_house, watermill, farmstead, shack, tent, lean_to_shelter — item 70's cluster structures, named apart from the `lean_to` frontage treatment — …) and V07 §2.4's village classes, keyed `v.<id>` (V11 §2.9): the one vocabulary Building.class, BuildingInput.cls, ClassRules.pick, §4.7's Designation.cls, §4.11's build and rebuild and §7.1's RosterLine.cls name; a template family (hall, tower, mill …, V11's templateFamily) is never a class
type MassingFamilyId = 'single'|'L'|'T'|'H'|'U'|'cross'|'plotRing'|'towerHouse'|'regularCourt'|'starCourt'|'chordArc'|'rectCourt'|'gridWalk'|'row'|'template'|'axisLocked'|'baseOutline'|'shelter'|'drawn'|'stepped'|'ovalCourt';   // each family's meaning is V02 §2.1's; declared here because DriftBounds and MassingRef, which base rules read, use it
interface MassingRef {   // the fields' writers and readers are V02 §2.1's; the base reads `entrance` (Entrances rule 1) and `family` (DriftBounds)
  family: MassingFamilyId; row: string /* the CompositionRow key the resolution chain reached (V02 §3.2 step 2) */; grammar: string /* the composition.json version it read */;
  entrance: { wing: number /* a wing key */; side: number /* that wing's ring side */ } | null /* the entrance hint: the footprint side the main entrance goes on; null where the base rule alone decides (a row, a shelter, a drawn footprint) */;
  segments: number /* the path's segment count after collinear merging (V02 §3.5 M5) */;
  low?: { wing: number; end: 0 | 1 } /* axis 'fallLine' only: the main range's downhill end (V02 §3.5 M5) */;
  cupola?: { kind: 'dome'|'tip'|'pyramid'; wing: number } /* V02 §3.5 M12's roof ornament: drawn and exported, never in Heights, never a caster */;
  stack?: { shape: 'rect'|'round'|'octagon'; stairs: 'axial'|'flights'|'internal'|'none'; lowerRoof: 'flat'|'pent'; top: 'flat'|'shrine'|'roofed'; insetCm: Cm; grade: number; truncated: number } /* present exactly when family is 'stepped' (V02 §2.6) */ }
interface DriftBounds {   // declared here; read against §4.7 S11's designation template (item 19) and §7.7's Assignment; V02 §2.1 cites it
  areaPct: [number, number] /* the footprint area's allowed band around the row's target, in per cent (default [−15, 15]) */;
  floors: [number, number] /* storeys relative to the row's draw (default [−1, 1]) */;
  families?: MassingFamilyId[] /* the allowed layouts; absent: the row's. Before stage 3 registers (from M3a) only 'baseOutline', 'template', 'axisLocked', 'row', 'shelter' and 'stepped' are admitted; any other id is ignored and reported (`driftFamilyIgnored`), and read once stage 3 registers */;
  roofKinds?: RoofSpec['kind'][] /* the allowed roof kinds; absent: the row's */; classFamily?: string /* §6.3's building class family the assignment keeps */ }
type RoofSpec = { kind: 'gable'|'hip'|'shed' /* one pitch (V02 §2.1) */|'flat'|'pyramid'|'cone'|'dome'|'skeleton'|'tent'|'plain' /* the F-SKELETON downgrade: no ridge or hip lines, §3.8 */|'none' /* the roofless state the decline ladder's decay sets — derelict, and kept through ruin (§2.8 decline hooks) */;
  pitch?: number /* a ratio, not an angle */; high?: number /* shed only: the ring side at ridge height */; material?: string };
interface MaterialRow { key: { era: string; stage?: number /* FTG's per-stage default: the growth stage of the building's plot */; districtKind?: string; cls?: string /* overrides, the most specific winning: class (temples and churches stone by row), then district kind, then the stage default */;
  band?: string /* only in the optional regional-shift rows below — absent from every default row, so the default never keys a material by wealth (item 19) */ }; walls: string; roof: string; weight: number; extension?: 'regionalShift' /* §7.6's marker: a row of our optional regional shift, off by default (items 19, 23) */ }   // a rule table (§7.6): its rows are volume 11's; the rule is "Materials" below
interface OpeningRow { dayType: string; openH: number; closeH: number }
interface SubLocation { id: Id; building: Id; name: string; tags: string[] /* table, counter, stage, bed, bath, pickup, deliver, … data-defined */;
  capacities: { leisure: number; tempResidential: number; guestWorker: number; studying: number; working: number }; relax?: string[]; lifecycle: Lifecycle }   // from the class table; rooms at stage 3 refine, never replace
interface Composition { lod: ('outline'|'wings'|'rooms'|'plan')[] /* the four rungs of the building ladder: outline → wings → rooms → plan (item 28) */;
  row?: string; grammar?: string /* the composition.json row and version (V02 §2.2) */; wings: Wing[]; towers: ComposedTower[]; courts: Polygon[] /* under stage 3 derived at read from the footprint face's holes */;
  rooms?: Room[] /* the rooms rung: the principal rooms a composer emits with its wings (a hall, a tower's round room), each with its storey; the plan rung takes them as fixed rings, each less a stair bay or chimney stack it holds (the stage-3 contract, below); optional, and absent from the base's outline builder */;
  plan?: Plan /* the plan rung: every storey's rooms, walls and openings (below) */ }
interface Wing { base?: number /* the key of the base wing it composes (V02 §2.2); when set, footprint, heights, roof and spans are that wing's, read at read and never stored */;
  footprint: Polygon /* the wing's ground ring */; heights: Heights; roof: RoofSpec; dormerRows?: DormerRow[] /* below; written by volume 2's composer and setComposition (V02 §2.2, V02 §3.7) */;
  dormers?: number /* with dormerRows: derived, their counts' sum; a free count while the plan rung is absent; once a plan exists it is derived from the plan's roofed rooms with exterior demand (step 6) */;
  porch?: Porch /* at the main entrance's side and offset (item 29), so the porch and the plan's front door coincide by construction; re-read with it after every carry (rule 3) */;
  spans?: FaceRef /* item 30: the Passage face (§2.5) the wing spans — a composed wing whose ground ring follows the edge of a passage that a base wing spans takes that BaseWing.spans, every such composed wing and no other, so a composition inherits the span and never decides it. Its span ring — the part of that face under the wing: the face's ring cut by the lines that continue across it the end segments of the two wing-ring sides meeting the passage's edge (a row quad's front and rear chains), a boolean on the arrangement (§3.7), or the whole ring where the wing covers it all — is derived at read, never stored. The wing's ground ring ends at the passage's edge (the stage-3 contract reads that ring) and every storey above extends over the span ring (the wing's **extent** at level ≥ 1 is its ring ∪ the span ring); at the ground storey the plan rung adds the span ring as a seed ring and passes it as a fixed ring — the passage room (role passage, scope circulation), never cut, its two end walls carrying the passage openings (J-A30.23); read on the base wing by the capacity (below), §8.5's span mark (also §8.4's span caster) and the 3-D export (§11.1), and on the base or the composed wing by the plan rung */ }
interface DormerRow {   // one eave side's dormers on a composed wing (stage 3); declared here, V02 §2.2 cites it
  eave: 0 | 1;          // which of the wing's two eave sides: 0 the first eave side in ring order (V02 §2.4)
  count: number;        // ≥ 0; positions derived by dormerPositions (V02 §3.7), never stored
  widthCm: Cm;          // each dormer's width along the eave
  kind: DormerKind;
  edited?: true;        // set by setComposition: a fixed input to the plan rung's step 6 (V03), kept through a re-derivation
                        // of the wings rung while the wing's eave keeps its length within ± dormerEaveTol (10 %)
}
type DormerKind = 'dormer' | 'wallGable' | 'hoist' | 'entranceGable';   // declared here, V02 §2.2 cites it
  // a roof dormer set back from the eave; a gablet that breaks the eave (the wall rises through it);
  // a warehouse's loading dormer; the gable over the main entrance's bay (V02 §3.7)
interface ComposedTower { base?: number /* the key of the massing's tower or turret wing (V02 §2.2): its ring is that wing's ring, and centre (the ring's area centroid), radiusCm, heights and roof are read from it — never stored, never carried on their own */; centre: Point; radiusCm: Cm; heights: Heights; roof: RoofSpec }   // for the plan rung a round wing: one round room per storey and the spiral stair core of the wing it joins (below); the wall tower entity is §2.7's Tower
interface Room { id: Id /* room:<building id>/<level>/<i> — an address carried by its anchor, the room's centroid within its wing (§6.3) */; ring: Polygon /* world lattice points inside its wing's extent at its storey (the passage room is a span ring): a value read back from the rung's transient arena, never a plat face (§3.4; J-A28.31) */;
  wing: number /* the key of its base wing (BaseWing.key), which under the base outline builder equals the wing's index; a tower's round room names its tower wing's key; the passage room names the wing that spans it; Composition.wings is looked up by its base key, never by position */; storey: number /* Storey.level */; role: RoomRole; scope: 'unit'|'shared'|'service'|'circulation' /* §10.2's RoomRuleRow.scope: a household's own room, one the households share, the use's or the staff's, or a corridor, stair hall, landing or passage */;
  unit?: Id /* item 28 (f): the Household whose dwelling unit the room belongs to — present exactly when scope is 'unit'; edited by setRoomUnit (§7.1) */; program?: number /* index into Plan.program; absent for a generic room */;
  subLocation?: Id /* the SubLocation it hosts: rooms refine sub-locations, never replace them (below) */; hearth?: { wall: Id; at: Cm; chimney: Id }; lit: boolean /* a light at the room's spine summit (§8.5, §11.1; J-A28.32); corridors unlit */;
  concealed?: true /* item 63: a room of a concealed use's programme (steps 2 and 5): entered only by a service, yard or concealed door; drawn and read only for a viewer whose knowledge admits the concealed use (§9.2) */;
  nextFurniture: number /* the next free furniture ordinal (V03 §2.1) */; name?: string /* the author's name for the room; the role unchanged */ }
interface Plan { storeys: Storey[]; program: ProgramRoom[] /* the programme as sized and allocated (steps 2–3): what the plan owed — read by the report, §13.2's bars and the re-cut */;
  units: { household: Id; form: UnitForm; entry: Id /* the Opening that is the unit's own door, onto circulation or the street */ }[] /* item 28 (f): one per household housed */;
  cores: StairCore[]; chimneys: Chimney[]; pattern: Record<number /* storey level */, LayoutPattern>; slices: SliceRef[] /* the programme, pattern, furniture and interior-ladder rows consulted (§2.8) */;
  heads: AccessHead[] /* one per AccessPoint the building hosts, in access-id order (below) */ }
interface AccessHead {   // on Plan.heads: an access head the plan rung places (V03 §3.7.2); declared here, V03 §2.1 cites it
  access: Id; kind: AccessPoint['kind'];
  storey: number | null  /* the head's storey (V03 §3.7.2 (1)); null exactly for V03 §3.7.2 (1)'s outside door on a building with
                            neither a basement nor ground(b) (V03 §3.3), which lies on no storey */;
  room?: Id              /* the host room (V03 §3.7.2 (6)); absent exactly when storey is null */;
  door?: { wing: number /* BaseWing.key of the ground-standing wing */; side: number /* the index of that wing's ring side */;
           at: PointCm /* the door's centre on that side */ } /* present exactly when storey is null: stackAccessDoor(b, a)'s
                            wing, side and at (V03 §3.7.2 (1)) */;
  ring?: Polygon         /* the head's fixed ring — a stair or ladder bay, a shaft square or a well disc; absent for a hatch (an Opening
                            with `point`), a door (an Opening on the wall, or `door` when storey is null) and an air access (it rides a Chimney) */;
  through: number[]      /* the storeys a well's or shaft's through-ring crosses below its head (V03 §3.7.2 (3)); [] for every other head */;
  opening?: Id           /* the Opening that enters the head from its host room; absent when storey is null */;
  distCm: Cm             /* from AccessPoint.ground.at to the head's centre, or to door.at (V03 §3.7.2 (5)); reported */ }
interface Storey { level: number /* −k … −1 the basement's storeys; 0 the lowest storeyed level — the ground, except on a stack whose ground wings are solid (V02's storeyRange: a solid pyramid's shrine is level 0); 1 … n above */;
  wings: number[] /* the wings whose floors — or the basement ring — reach this level, by V02's storeyRange (a solid wing none; a stacked wing from the storey above the one it stands on) */;
  rooms: Room[]; walls: Wall[]; openings: Opening[]; windows: WindowRec[]; furniture: FurnitureItem[] /* in room order, then by ordinal (V03 §3.8) */ }
interface ProgramRoom { rule: number /* index into the list `origin` names (§10.2 RoomRuleRow for the programme) */; role: RoomRole; scope: Room['scope']; unit?: Id /* scope unit: the household it is for */;
  areaM2: [number, number, number] /* the row's min, target and max × the interior ladder row's size factor, interpolated along the occupants' value (below) */; storey: number; wing: number /* a base wing key */; concealed?: true /* item 63: a concealed use's row (§10.2's RoomRuleRow.concealed) */;
  origin: 'ladder'|'staff'|'sleepIn'|'programme'|'subLocation'|'concealed'|'declared'|'fill'|'vacant'|'access'|'sharedAccess'|'entrance'|'crypt'|'composer' /* which list of V03 §3.2 A2 made it */; subLocation?: Id /* the SubLocation it hosts; copied to Room.subLocation */;
  anchor?: { entrance: number /* an entrance's ordinal: its entrance room, one per entrance (step 3) */ } | 'core' | 'hearth' | 'passage' /* the passage room: the span ring (step 1) */ | { access: Id } /* the room holding an access head (V03 §3.7.2) */ }
interface Wall { id: Id; a: PointCm; b: PointCm; kind: 'exterior'|'party'|'partition'|'court'; left: Id | 'outside'; right: Id | 'outside' }   // exterior and court walls lie on the edges of the storey's extents (wing rings, and a span ring: the passage room's walls, J-A30.23), a party wall on the plot's party-wall edge (the stage-3 contract's fourth rung, below)
interface Opening { id: Id; wall: Id /* for a floor opening (`point` set): the host room's nearest wall, for ordering only */; at: Cm /* from a */; point?: PointCm /* a floor opening's centre — a trapdoor, a hatch, an access head's opening (V03 §3.7) */; widthCm: Cm;
  kind: 'door'|'arch'|'open'|'entrance'|'passage'|'trapdoor'; entrance?: number /* the entrance's ordinal (Entrances rule 4): every entrance opens here; the passage room's two arch openings are of kind passage and name no entrance (item 30, J-A30.23) */;
  hinge?: 0|1; swing?: Id; steps?: number /* V03 §2.1's door leaf, swing room and short-flight treads */ }
interface WindowRec { id: Id; wall: Id; at: Cm; widthCm: Cm; kind: 'window'|'slit'|'light' /* light: a basement wall's small window above ground (V03 §3.6 W2) */ }
interface StairCore { id: Id; wing: number; tower?: number /* the key of the tower wing whose round room holds this spiral — the wing its ComposedTower names by base; Composition.towers is looked up by that base key, never by position; a composed tower with no base (before stage 3) is named by its index */; bay: Polygon /* the same bay on every storey it serves */;
  levels: [number, number]; kind: 'straight'|'dogleg'|'winder'|'spiral'|'ladder'|'trapdoor' }
interface Chimney { id: Id; wing: number /* the hearth's wing */; column: PointCm; levels: [number, number] /* from the lowest hearth to the highest level of any storeyed wing whose extent contains `column` (V03 §3.3 H3) */; air?: Id[] /* the AccessPoints of role 'air' this stack also vents (V03 §3.7.2 (4)) */ }   // derived from a hearth column (a small fixed ring on the transient arena, §3.4); the roof construction draws it (§8.6)
interface FurnitureItem { id: Id /* furn:<room id>/<ordinal>: a generated item takes the next ordinal in placement order, an `instance` add Room.nextFurniture; never re-used after a remove */; room: Id; glyph: string /* a FurnitureRow key (V03 §2.4) */;
  at: PointCm /* the item's centre; a carried point (CarriedShapes) */; rotCdeg: number /* integer centidegrees 0 … 35 999, counter-clockwise from world +x */; wCm: Cm; dCm: Cm /* the row's size at this item, snapped to 10 cm */;
  wall?: Id /* the wall it stands against */; edited?: true /* set by an `instance` add, move or restyle; New random on plan.furnish keeps it */ }   // declared here; placement is V03 §3.8's
type RoomRole = string;        // data-defined by §10.2's room-programme rows (our own names: hall, chamber, solar, parlour, kitchen, buttery, common room, cooking place, staff chamber, stair hall, forge, shop, store, undercroft, nave, passage …)
type LayoutPattern = 'bisect'|'follow'|'spine'|'hall_and_parlour'|'cross_passage'|'enfilade'|'nave';   // the cut patterns (step 4); rows, not code
type UnitForm = 'house'|'dwelling'|'lodging'|'apartment'|'room';   // item 28 (f): the interior ladder's unit forms, richest first (below)
interface InteriorLadderRow {   // item 28 (f): one row of the interior ladder (below) — the interiorLadder table of roomProgram.json (§7.6, §14)
  band: string /* a FieldBands.bands id: one row per band of the set (§4.5) */; form: UnitForm /* one household's unit */;
  households: [number, number | 'capacity'] /* the range a shell of this row houses, within the capacity bounds (below): it bounds relet and the canonical chain's row steps, never the as-built count */;
  unitRooms: RoomRole[] /* scope unit */; shared: RoomRole[] /* scope shared, where the class's programme row allows */;
  staff: { count: { n: number; law: 'const'|'perPrincipalChambers' /* n rooms, or one per n principal chambers */ }; sizeShare: number /* of the owners' principal chamber's target */; placement: ('attic'|'basement'|'service')[] /* preferred first */ } | null;
  circulation: { roles: RoomRole[] /* scope circulation: stair hall, corridor */; patterns: LayoutPattern[] /* the circulation's cut patterns, preferred first */ };
  sizeFactor: number /* × the programme rows' room areas */ }
interface Entrance { vertex: VertexRef /* ('entrance', building id, i): a vertex on the footprint edge, indexed (§2.2 rule 7); i its stable ordinal (Entrances rule 4), which Opening.entrance and ProgramRoom.anchor name */;
  role: 'main'|'side'|'rear'|'yard'|'service'; faces: 'street'|'lane'|'alley'|'yard'|'court'|'passage'|'footpath'|'tunnel' /* the way or part the door opens onto; passage: an item 30 passage face; footpath: a cluster structure's path (item 70); tunnel: an underground building's frontage door onto its tunnel run, gallery or undercity walkway (II.7.3, II.7.5; V03 §3.12) */;
  concealed?: true /* item 63: a concealed use's own door (Entrances rule 2); its knowledge the concealed use's */;
  wing: number /* a base wing key */; side: number /* the wing ring's side, as Porch.side */; offsetCm: Cm /* along that side; side and offset re-read from the vertex after every carry (rule 3) */;
  storey: number | null /* derived with the entrance by deriveEntrances, never set alone, after the basement decision: the level (basement levels included — for the main entrance only where Basement.access is not 'external', whose core stops at the ground storey, step 3) whose floor at its wing meets the outside ground at its vertex within the plan's step tolerance (PlanGeometryRow.datum.maxSteps × stair.riserCm), the nearest where two meet; the main entrance 0 where none meets (opened with a stoop); null where no storeyed wing stands on the ground (Entrances rule 5's exception); with PlanGeometryRow.exposureAllStoreys false, 0 wherever a storeyed ground wing exists; the rule is V03 §3.6's */ }   // item 29; the rules are Entrances, below
interface Basement { floors: number /* storeys below ground, ≥ 0: the one stored count, which Heights.floorsBelow reads; 0 for a crawl space, which is no storey */;
  kind: 'full'|'half'|'walkout'|'crawl'|'raised' /* crawl: item 66's requested form — a void under a raised ground storey, reached by a hatch; raised: the crypt ladder's wet-ground form (V02 §3.14.5) — both below */;
  ring: Polygon /* inside the ground wings and smaller than their union (Basements, below); world lattice points, carried with the wings by rule 2 (b)'s mean-value coordinates (CarriedShapes.basement; rule 4 checks it) */;
  access: 'core'|'trapdoor'|'external' /* how the plan rung joins it; derived with the basement, a shell fact (Basements, below) */;
  crypt?: { ring: Polygon /* inside Basement.ring (equal to it for a crypt-only basement at its derivation; the rank's trim shortens only this ring, V03 §3.7.4 (3)); carried with the wings by rule 2 (b) as `ring` is */; edited?: true /* set by setAttr(basement) on basement/crypt/ring: a fixed input the rank never trims */ } /* item 109 (k) (2)'s crypt, derived with the basement (Basements, below); never written by the plan rung; absent = no crypt */ }   // item 29 (b)
interface Porch { side: number /* the side of its wing's footprint ring that it stands on, by ring index */; kind?: PorchKind /* below; V02 §2.2, V02 §3.7; absent: gabled */; offsetCm: Cm /* from that side's first vertex along the side */; widthCm: Cm; depthCm: Cm /* outward */ }   // relative to its wing: no world point, so it moves with the wing; its side and offset are the main entrance's, re-read after every carry (rule 3)
type PorchKind = 'hood'|'gabled'|'twoStorey'|'recessed'|'halfRound';   // the porch forms, declared here (V02 §2.2 and its porch rows and op cite it): halfRound a half-disc on the door's side under a half-cone roof — Fantasy Manor's commonest porch (V02 §3.7; weight 0 by default, calibrated under FM)
interface DeckContext {   // written by S11 from the plot's deck record (Plot.deck, §2.7 Deck plots); absent on every other plot; V02 §2.6 cites it
  host: Id /* the Bridge or the pier / mole / quay way whose deck carries the plot */; kind: 'bridge'|'pier'|'mole'|'quay';
  surfaceCm: Cm | null /* the deck's walking surface in terrain cm: Bridge.deckCm, or the pier's, mole's or quay's deck height (§4.8) — read by the datum (below); null exactly for a quay platform built on the bank, which is ground (the terrain datum, the ordinary basement gate and a dig floor) */;
  landmark: boolean /* a placed landmark (a mole-head or mid-mole tower or fort): its class's own rows, no deck budget */ }
interface BuildingInput { plot: Polygon /* the plot's ring */; access: Segment[]; slot: SlotPlan /* §2.5: at S11 the site plan's working hint; at a later outline() or compose() call the building's current footprint ring, resolved at the call */; ctx: ContextVector; cls: BuildingClass; assignment?: Assignment /* the resolved assignment value (§7.7), an input bundle, not a reference */; drift: DriftBounds; seed: StreamKey /* derived from the building's lineage for this call; never stored */; terrain: TerrainSampler;
  compositionRow?: string /* stage 3: the slot's CompositionRow key (V02 §3.2) */; bands?: { field: { band: string; value: number }; manifested: { band: string; value: number } } /* as ClassRules.pick receives them */;
  layer?: 'surface'|'underground' /* the plot's layer: II.7.3's sewer-front plots, II.7.5's undercity and item 109 (j) (4)'s cavern and ruin dwellings are 'underground'; absent: surface */; attached?: { key: string; count: number }[] /* stage 3: the template's attach-main structures and their drawn counts (V02) */;
  deck?: DeckContext /* the plot's deck; absent off a deck */;
  fixedWings?: BaseWing[] /* the row arrangement's clipped quads (§4.7 S11): outline() returns them with heights and roofs and never re-fits them */;
  building?: Pick<Building, 'households'|'entrances'|'basement'|'subLocations'|'use'|'assignment'|'concealed'> /* the plan rung's content inputs (item 28), resolved at the call like the footprint ring */;
  accesses?: Id[] /* every AccessPoint whose ground.host is this building or its basement, any source or cause — II.7.3's neighbourhood cellar stair and Basement accesses, a system's own entrance and the crypt join (II.7.6, V04), an undercity lifeline (II.7.5), an access edit (§7.3 item 9) and item 109 (j) (3)'s dug access — anchors of the plan (step 3; V03 §3.7.2) */;
  stage?: WorksStage /* item 67: its running Works' stage at the drawn week (§4.11), which the plan's drawing shows (below) */ }
interface BuildingGenerator {   // the stage-3 hook, split by cost (SCL-13): the base implements outline() (the base outline builder, below); volume 2 implements outline() and compose() at stage 3; volume 3 implements plan() (M6-P)
  outline(input: BuildingInput, k: Kernel): KernelResult<{ wings: BaseWing[] }>;              // every LOD, exports, shadows: cheap and deterministic
  compose(input: BuildingInput, outline: BaseWing[], lod: 'wings'|'rooms', k: Kernel): KernelResult<Composition>;   // lazy, per visible tile (V02)
  plan(input: BuildingInput, composition: Composition, k: Kernel, prior?: Plan): KernelResult<Plan>;   // the fourth rung (item 28; V03): lazy under §4.1's contract, on the click's request, on a transient arena per storey (§3.4); prior = the canonical prior a re-cut mutates (the interior ladder, below; §7.3) — never the cache
}
declare function basementDoor(doc: Document, key: PlatKey, b: Building): { side: number /* the index of a Basement.ring side */; at: PointCm /* the door's centre on that side */ } | null;   // the outside door of an `external` basement — pure, draw-free, of eager records only, null unless Basement.access is 'external'; the rule (a retaining wall's side first, else the tomb door, else the fall walk-out's lowest side; off a crypt's vault) is V03 §3.7.1's; implemented in @plat/plots; read by step 3, §13.2's T28-3 and volume 1's entrance reserve
interface ClassRules { pick(ctx: ContextVector, bands: { field: { band: string; value: number } /* the occupants' band (Plot.fieldBand) and the current field value: the specialisation and the room programme */; manifested: { band: string; value: number } /* from Plot.builtBand and FieldBands.middle by §4.11's floor rule: the geometry columns */ }, assignment?: Assignment): { cls: BuildingClass; specialisation?: string; heights: Omit<Heights, 'baseCm'>; roof: RoofSpec; template?: string } }   // a data table, not code: the class row and its designation template (§4.7 S11, item 19) — the geometry columns read at the plot's manifested band, the specialisation and the room programme at the field band (J-A19.43, J-A28.29)
// Replaceability and class change (item 31): how soon a band change may replace a building's stock is its designation template row's replaceability at the plot's builtBand (§10.2), read by §4.11's ladder; a class change at rung 2 (a mansion to a tenement, inn, workshop or chapel) is item 18's mutation and keeps the shell (§4.7 S11)
type PathShapeRow = MassingFamilyRow;   // stage 3's path-shape rows are volume 2's massing family rows (V02 §2.3); item 59's five families keep their rows and provenance (P21) under our ids regularCourt, starCourt, chordArc, rectCourt, gridWalk — §7.6's table-migration row maps the old ids one to one and rewrites a document or table naming one on load, before M6 ships any document
// The wing-carrying rule (below): pure, + − × ÷ and sqrt only (§6.5); when it runs: below.
interface CarriedShapes { wings: BaseWing[]; basement?: Basement /* item 29 (b): its ring and crypt ring carried by rule 2 (b) and checked by rule 4 */; composition?: Composition /* only when stored (an edited stage-3 composition): its wing, court and room rings and its tower centres, and with a stored plan every storey's room rings, walls' end points, stair-core bays, chimney columns and furniture points (rule 2 (b); J-P48) */ }
declare function carryWings(shapes: CarriedShapes, before: Polygon[] /* the footprint's rings before the change, outer first */, after: Polygon[] /* the same rings after it */,
  moved: (p: LatticePoint) => LatticePoint | null /* the position after the change of the footprint vertex — with spanned, of a span ring's vertex too — that stood at p; null: the change dissolved it */,
  pairing?: 'tiled' | 'overlapping' /* rule 4's pairing verdict, found from the vertex identities once per edit and reused by every halving of one step; computed when absent */,
  spanned?: { before: Polygon[]; after: Polygon[] }[] /* item 30: with a stored composition over a spanned passage, per span ring the rings of the footprint face ∪ that span ring before and after the change — the rings a stored point inside the span ring takes its mean-value coordinates in (J-P48 (2)) */): KernelResult<CarriedShapes>   // E_INVARIANT when rule 4's check fails
```

**The base outline builder.** The base ships `OutlineBuildingGenerator`: the site plan's rectangle, an L or T composed of
2–3 rectangular wings (MFCG Complex mode, FTG Dense/Gaps looks), a row's `fixedWings` passed through unchanged (below),
and — for institution classes (keep, temple, church, manor, hall, farmstead) — two further constructions behind the same
`outline()`, and from M3a (item 110) two more:
1. **Footprint templates** (COV-FTG-F16): data rows of normalised shapes fitted to the claim — cruciform church (nave,
   transept, apse), cruciform keep with corner projections, octagon, n-gon (a 9-gon theatre), 6- and 7-pointed star
   temples, U-court, ring cloister around a court. Fitting is an affine map of the template into the claim's `lir`,
   then a boolean intersection with the claim; each template is stored as its constituent rectangles and wedges so the
   wing rule below holds, each carrying a `partName` the fitted wing keeps (`BaseWing.partName`).
2. **The axis-locked composer** (COV-MFCG-G05; our own construction of MFCG's idea): take the claim's OBB axes; cut the
   axis-aligned rectangle on the axis more perpendicular to the current longest edge at a ratio drawn from U(0.4, 0.6);
   recurse until cells reach the class's minimum cell (`minCell = baseCell · 2^(2·size − 1)`, a table row); keep each
   cell with the class's `fill` probability, keeping the cell nearest the main entrance and rejecting any drop that
   disconnects the kept set; retry ≤ 3 times on the `…/attempt=n` stream, then the full rectangle (reported). U, H,
   comb, cross and ring footprints emerge — the landmark silhouettes that show at city zoom.
3. **The stacked-tier construction**: `massStepped` (V02 §3.15.1, exported by `@plat/plots`) for a
   class whose designation template's `composition` names a `stepped` row of `composition.json`, drawing on the
   building's `massing` concern with creation indices 8–9 so that stage 3's massing reproduces it byte for byte, with
   `stairTreads` (V02 §2.6); beside it `massOval` for a class whose composition row names `ovalCourt`. Both write the
   building's `MassingRef` (with its `stack` and V02 §2.6's stack migration row); `composition.json` ships at M3a with
   those rows and constants (V02 §8.5), the `massing` concern appended to the registry then with the next append-only
   u16 id (§6.1), and `DriftBounds.families`' M3a list admits `stepped`.
4. **Deck buildings**: on a deck plot, a rectangle (or the row's quad) inside V02 §3.16's deck budget
   with its storey cap and the deck's datum (below).

Every footprint is stored as **wings** (VIS-10; J-P17) of the three `BaseWing` kinds — `rect` for the outline builder's
rectangles and its L / T compositions, `quad` for a row house (below), `polygon` for a template part with a `pyramid` /
`cone` / `dome` roof. Each wing carries its ridge axis (the wing's long axis, or the short axis in a table share of wings
— NG measures ≈ 36 %), its heights and its roof; the footprint is the wings' union, so the footprint hash at city LOD
does not depend on the wing split. The roof *construction* the renderer draws is a style-sheet parameter over the stored
wings (§8.2); the model's `roof.kind` is the default the 3-D export uses, so presets change the picture, never the model.

**Row footprints are quads (J-P31, J-P39).** S11's row arrangement builds each row house's footprint by the boolean
`plot ∩ frontage band` (§4.7 S11, GEO-26), so two neighbours share one party-wall edge even on a bent or curved frontage.
That polygon is stored as one `quad` wing — its two side chains are the plot's party walls, straight or bent once where
the plot cut's bend falls inside the row depth (the side lines are bent plot cuts, §4.7 S10 (4)), its front and rear are
the clipped chains, and S11 records the four corners where the side chains meet the front and rear chains (`corners`) —
and S11 hands it to `outline()` as `fixedWings`; `outline()` adds heights and the roof and never re-fits it, so the
footprint the boolean made is the footprint the model stores (on a slope beyond `skirtMaxCm` S11 first splits it along
the contour into stepped quads, each a wing with its own corners). The quad's model ridge joins the arc-length midpoints
of the two chains its `ridgeAxis` names, so every row house has a ridge without a skeleton, and a bent party-wall chain
has one well-defined midpoint (on whichever of its two segments half its length falls). The drawn roof is chosen wing by
wing by §3.8 (the exact OBB roof for a wing that passes its convex near-rectangle test, else the validated skeleton with
its plain-roof downgrade); the per-wing fake-gable construction draws the stored ridge directly, and no reader asserts
that a party-wall side is straight. The union rule, O17 (i)'s identical footprint hash at every LOD and the stage-3
contract therefore hold for attached rows on curved frontages exactly as for rectangles (the curved-street fixtures of
§13.2).

**Wings follow their footprint — the wing-carrying rule (J-P42).** Wing rings store world lattice points, some of them
footprint vertex positions (with a stored stage-3 composition and its plan, the only entity records that do, §2.2 rule
5; a basement ring's and a crypt ring's points, all inside the footprint, are carried with them), so one pure function,
`carryWings`, keeps every building's wings on its footprint face through every change of that face's rings: a `warp` or
`moveVertex` moving a vertex of the face (the commit record's `moved` list, §3.3); a batch adding a vertex to one of its
rings (a neighbouring plot re-fitted with a corner on a shared party wall; II.1 (3)'s neighbour step splitting a kerb a
row footprint fronts; S12b's formal-garden grid line or orchard-part edge ending on a house wall, §4.9) or taking one out
(a dissolution, or that step's reversal); and S11's own insertion of the footprint, the first carry. **When it runs is
stage-agnostic (J-P47):** after every committed batch — generation or edit; derivation pool, hinterland unit or
generation worker — whose commit record lists a footprint face among the L4 faces it changed, a vertex of one among the
vertices it moved, or — for a building whose stored composition has a wing that spans a passage (`spans`) — that
passage's face among the L3 faces it changed or one of its vertices among the vertices it moved (§3.3), the batch's
writer runs `carryWings` for that building before its next batch (a passage and its front building lie in one block,
§2.5, and an edit that changes the passage face takes the building into its effective scope, as J-P48 (1)'s split faces
are, §7.3 item 1); the building's own S11 batch ends with the first carry, and a `warp` or `moveVertex` runs it inside
the step's whole-step validation (rule 4; §3.6, §7.4). The carry writes only the building's `wings` (and its basement
and crypt rings and stored composition), which belong to the writer's own faces — a district's S12b changes only its own
footprints (§4.1's laziness contract), an edit only those of its effective scope and seam exception (§7.3 item 1) — so
generation, a pool of any size, a replay and Regenerate (keep settings) run the same carries on the same rings and store
the same bytes (O9 (c)). The rule:
1. *Boundary runs are footprint runs.* The parts of a wing's ring that lie on the footprint's boundary — its **boundary
   runs** — are runs of the footprint's rings vertex for vertex, so a wing vertex on the boundary is a footprint vertex,
   identified by its lattice point (a vertex is unique per lattice point, §3.10). S11 establishes this at the first
   carry: it inserts the footprint's rings through every wing vertex that lies on the wings' union boundary — a
   collinear one included, as a shape vertex of the ring, which never dissolves (§2.2 rule 3) — and then carries the
   wings from the ring it inserted to the committed face, each input vertex matched to the vertex its insertion placed
   (`ChainInsert.placed`, §3.4; a row's quad, which the boolean on the arrangement made, already is its committed ring).
   Inside the footprint the same holds between wings: a vertex that one wing has on another wing's side — the joint of
   an L's two rectangles, a T's stem corner on its bar — is a vertex of both rings (a rect records it between its
   corners), so wings that share a side share it vertex for vertex. Every later carry keeps both properties.
2. *Carry.* For each such building, from the footprint's rings before the change and after it: (a) each boundary run is
   re-read from the rings after the change between its two end vertices, in the direction that keeps the footprint's
   interior on its left, matched by identity — an end keeps the vertex it was, wherever that vertex now stands — so a
   vertex the change added to the boundary joins every wing ring that runs along it, a dissolved one leaves it, and a
   moved one moves; a wing whose ring lies wholly on the boundary (a one-wing house, a row's quad) is re-read whole,
   from its first corner's vertex; (b) every other wing vertex — a joint where two wings meet inside the footprint, or
   the hidden corner of a wing that overlaps another — takes its mean-value coordinates with respect to the footprint's
   rings (outer and holes) before the change, applied to the rings after it with `+ − × ÷` and `sqrt` only (§6.5) and
   rounded to the lattice, so a joint two wings share maps to one point for both. The basement ring's and the crypt
   ring's points (`CarriedShapes.basement`, item 29 (b)) are carried the same way, in the same call (J-A29.23). A
   building with a wing standing on another is then re-based by the building datum pass (*Heights*, below).
3. *Kinds.* A rect's and a quad's `corners` name the same corner vertices after the carry and are re-indexed. A rect
   whose carried ring fails §3.8's convex near-rectangle test becomes a `quad` with its four corners recorded and its
   `ridgeAxis` swapped — a rect's axis 0, along side 1, is a quad's axis 1, the line joining the midpoints of sides 2
   and 4 — so the ridge keeps its direction and the roof path is re-chosen on the carried ring (§3.8, §8.6); a quad and
   a polygon wing keep their kinds. After every carry each entrance's `side` and `offsetCm` are re-read from its vertex
   — the side of its wing's ring the vertex lies on and its arc length from that side's first vertex — and a stored
   composition's porch takes the main entrance's, re-read the same way on its composed wing's ring, so the stored
   numbers never disagree with the door (§6.3's re-match reads them; J-A29.23).
4. *Check (J-P49).* Every carried ring is simple and counter-clockwise, and the union of the building's wings equals its
   footprint face (integer equality after snapping — the stage-3 contract, below). It is decided exactly, at the least
   cost, by the building's **pairing**: whether every directed edge of its wing rings, keyed by vertex identity (a
   footprint vertex, or a joint the meeting wings share), is an edge of the footprint's rings — each used once — or the
   reverse of exactly one other wing's edge. The pairing depends on identities only, so it is found once per edit and
   holds through every halving of a step, which moves vertices and never adds or removes one; a batch that adds or
   removes a vertex recomputes it. Then: (i) a building whose every wing is re-read whole by rule 2 (a) — a one-wing
   house, a row's quad — needs no union: its ring is its footprint's ring, which the step's own validation keeps simple
   (§3.6), and only rule 3's test runs, on a rect; (ii) a building whose pairing holds — tiled wings: an L, T, cross or
   U of abutting rects, a template of tiles — needs only every carried ring simple and counter-clockwise, because the
   pairing makes the wings' winding numbers sum to the footprint face's at every point off the edges, so simple
   counter-clockwise rings cover each point of the face exactly once and nothing outside it; (iii) a building whose
   pairing fails — wings that overlap, such as a T whose stem runs into its bar — is checked by the kernel's boolean
   union on the arrangement (§3.7) against the face. For a `warp` or a `moveVertex` this check is part of the step's
   whole-step validation, which halves the step when it fails (§3.6; the edit layer's record check, as for a held pin,
   §7.4); it runs after the kernel's own checks of the step pass and stops at the first failing building in address
   order, since one failure halves the step. After any other batch a building whose check fails is re-derived by S11 on
   its plot (F-REDERIVE, reported); by rule 1 that cannot happen on the boundary, whose runs follow the rings exactly,
   and a joint moves only by the sub-centimetre route changes such a batch makes (§2.2 rule 3). Every ring of a wing
   that stands on another (`BaseWing.on`) is checked in the same pass inside the ring of the wing it stands on, and the
   wings standing on one wing pairwise interior-disjoint (exact `orient2d` tests): a failure halves a
   warp's or a `moveVertex`'s step, and after any other batch the building is re-derived by S11 (F-REDERIVE,
   reported). The basement ring is checked in the same pass — simple, counter-clockwise and inside the footprint face
   (exact `orient2d` tests): an unedited basement whose carried ring fails is re-derived by the basement decision
   (below) inside the step, with no halving; an edited one fails the step's validation as a held pin does (§7.4), and
   after any other batch its edit is orphaned (§7.3 item 4) as a stored composition's is (J-P48), the basement being
   re-derived until the user re-attaches or discards the edit (J-A29.23). *Cost* (measured on a model of the rule, per
   building per validation pass, the carry and rule 3 included; Node 24 on the bench machine,
   `docs/validation/bench/fixall_pipeline_r5_wingcost.mjs` → `.out`): ≈ 0.06 µs for a row's quad, ≈ 0.4 µs for a
   one-wing rect (rule 3's test), ≈ 0.9–2.7 µs for tiled L, T, cross, U and inner-joint compositions (their check
   0.15–0.4 µs of it), and ≈ 0.3–0.9 µs once per edit for the pairing; an overlapping composition adds its union, bounded
   by S11's compound geometry share (≤ 25 µs, §12.4's S11 row; PLAUSIBLE). The per-pass and worst-step totals — on an
   assumed core mix of 55 % row quads, 25 % one-wing houses, 18 % tiled and 2 % overlapping compositions over 450
   buildings (§12.6's district ceiling, about what a 150 m brush, ≈ 7 ha, covers in a dense CITY core) — and M3a's
   measurement on that brush with its pre-decided fallback are §12.6's.
5. *Undo, replay, `moveFootprint`.* The edit's undo record keeps the former rings (§7.4), and a replay performs the same
   carry on the same geometry, so it gets the same rings. `moveFootprint` applies its rigid move to the wing rings and
   S11 re-fits the plot with them as `fixedWings` — the first-carry path.

**A stored composition is carried with its wings (J-P48).** A stage-3 `Composition` is derived lazily and stores no
position until an edit stores it (`Building.composition`; the edit kinds that do so are stage 3's and the plan events of
§7.1; a hand-built one is stored by §2.6's test); from then on its world geometry — each composed `Wing.footprint`, each
court, each room ring (the rooms rung's and, with a stored plan, every storey's), each `Wall`'s end points, each
`StairCore.bay`, each `Chimney.column`, each `Storey.furniture[].at` (re-snapped or orphaned after the carry by V03
§4.3) and each `ComposedTower`'s centre — is carried in the same `carryWings` call as the base wings, by the same rules.
Under stage 3, `Composition.courts` is derived at read from the footprint face's holes, and a composed wing or tower that
names its base wing carries nothing of its own; a stored composition's carried points are then its rooms' and its
plan's. A porch is stored relative to its wing's side (`Porch`) and takes the main entrance's side and offset after
every carry (rule 3). A designation mutation (item 18) re-matches a stored composition's and plan's rings to the target
template by role inside its event (§4.7 S11) and re-cuts a stored plan by the re-cut rule (the interior ladder, below).

* (1) The edit that stores it establishes rule 1 for it in the same batch: every point of those rings, wall ends, bays
  and columns and every tower centre that lies on the footprint face's boundary becomes a vertex of the footprint rings
  — on an L4 edge by a same-level L4 split, on a plot line (L3) or a kerb (L2) by an L4 Steiner vertex that
  `splitThrough` places, the composition's point re-read at the placed vertex (§2.2 rule 3) — and each such vertex
  carries a `('composition', buildingId, i)` vertex role row while the composition is stored, so no dissolution removes
  it (§2.2 rule 7); the row leaves with the composition when an undo removes it or it is orphaned (below). The base
  wings gain each such vertex by rule 2 (a), and a point one composed ring has on another's side is made a vertex of
  both (a data step on the record). Every face that shares a split edge — the building's own yard parts, a row
  neighbour's footprint across a party wall, a neighbouring plot's L4 face across the plot line — gains the vertex and
  is in the storing edit's effective scope, together with a row neighbour's wing rings, which its carry changes the same
  way; each ring equals its prior ring with those vertices removed (§3.3's same-level-split rule; the check of §7.3 item
  7 (ii)).
* (2) Boundary runs are re-read by identity and every other point takes its mean-value coordinates in the footprint's
  rings before the change — a stored room's point in a spanned passage's span ring (the plan's passage room's, or a
  room's above it, the rooms rung's or the plan's) in the rings of the footprint face ∪ that span ring (`carryWings`'
  `spanned`; J-A30.23) — applied after it and rounded, so a point that a wing, a court and a room share maps to one
  point for all of them, and a tower centre on the boundary, a footprint vertex, moves with it; each composed wing and
  tower is then re-based by `deriveBase` on the ground it now stands on, as the base wings are (§7.4); a building with a
  wing standing on another is re-based by the building datum pass after the carry.
* (3) A composed `Wing` has no kind to lose — its roof construction is re-chosen on the carried ring (§8.6).
* (4) The check adds every carried composition ring simple and counter-clockwise, the composed wings uniting to the
  footprint face (the stage-3 contract, by rule 4's tiers), every room ring inside the union of the face and the span
  rings of the passages the building spans (J-A30.23), a stored plan's rooms tiling each storey's extent (the contract's
  fourth rung, by §3.10's seed-tiling test) and every tower centre inside or on the face (exact `orient2d` tests).
* (5) The undo record keeps the former composition with the former wing rings (§7.4).

A failure inside a warp or `moveVertex` halves the step, as for the wings; after any other batch — where rule 1 makes it
as rare as for the wings — the stored composition's fate is **orphaned** (§7.3 item 4): the dry run lists it, the edit
that stored it stays in the log and in the document's orphan table, the record is dropped and the building composes
lazily from its carried wings until the user re-attaches or discards the edit — never silently. Wherever this document
names a building's wing rings as carried, re-based, excepted from locality or restored — §2.2 rule 5, §4.6 step 7, §5.3,
§7.3 (a) 4 and items 1 and 7 (ii), §7.4, II.1 (3), II.4 — a stored composition's rings, wings and tower centres and a
stored plan's points are included, by this rule, and the basement and crypt rings by rule 2 (b).

**Test.** "§2.6's test" — the B-EDIT fixture that exercises this rule (warps and vertex moves over L, overlapping T,
curved-row and holed footprints and a hand-built stored composition; generation equal to regeneration on a compound
whose garden edges end on the house wall) — is §13.2's (and §7.3 item 7 (vi)'s). Receipts for the carry under 0.25–8 m
displacement fields: `docs/validation/bench/fixall_pipeline_r4_wings.py` → `.out`; for the cost and the pairing's
agreement with the full edge test: `fixall_pipeline_r5_wingcost.mjs` → `.out`.

**Heights and the ground datum (owner HEIGHT ruling; AM-3; FTG-13).** Every building, wing, tower, keep, wall run, gate
and bridge carries heights; eave, ridge and tower heights are measured above `baseCm`, the floor level in terrain
centimetres. One per-entity function, `deriveBase(entity, sampler)`, computes every ground datum, and S11, S7, S1's
terrain operator (§7.3 (a)) and the edit layer after a warp or vertex move (§7.4) all call it:
* a wing that stands on another (`BaseWing.on`) has `baseCm` = that wing's deck level — its `baseCm + eaveCm`, less its
  family's `parapetCm` under a flat roof — with no plinth and no skirt, computed after the wing it stands on (in stack
  order, which a key order need not be);
* a wing of a building whose plot lies on a deck built over water (`BuildingInput.deck` with `surfaceCm` set; a quay
  built on the bank is ground, V02 §3.16 (1)) has `baseCm` = the deck's surface height (`Bridge.deckCm`, or the pier's,
  mole's or quay's deck height, §4.8), with no plinth and no skirt; the buildings on a deck are re-based in the step
  that re-bases the deck, their plots in its effective scope;
* every other wing's `baseCm` is `max(samples) + plinthCm` (table, default 30 cm), the samples taken by
  `levelledGroundCm(doc, key, p)` (§4.7: the platform datum of the levelled plot, block or ward holding `p` on the arena
  `key` its plot lies on, else the unlevelled raster there, bilinear on the refined 2.5 m raster) at the wing's vertices
  and centroid — a sample point within `terrace.wallBandCm` (250 cm, one refined raster cell; V02 §3.10.9) of a
  `RetainingWall` chain (§2.7) replaced by the point moved along the wall's normal, toward the side that holds the wing's
  centroid, until it lies `terrace.wallBandCm` from the wall's line, so the datum reads the wing's own terrace, never the
  platform across the wall — so no floor is buried; over a requested crawl space, and over the ring of a `half` basement,
  the datum adds half the class's cellar depth (*Basements*, below); the terrain gate reads the datum without this raise.
  Every other ground sample this paragraph and *Basements* read — the fall under the footprint (the skirt facts the
  basement gate reads) and the lowest sample under a raised crypt's ring — is the same reader's.

For a building with a wing that stands on another the datum is computed by **one building-level pass, `rebaseStack`**
(V02 §2.6, V02 §3.15.2): its ground wings by the rule above, then each wing standing on another in stack order from the deck
level of its support, then each stair's rise re-set to its terrace-to-terrace difference, then the building's heights by
the envelope; every path that re-bases any wing of such a building calls this pass for the whole building, never the
per-wing step. A user's edit of the `baseCm` of a wing standing on another is applied as the same change to the height
of the wing it stands on (V02 §4.6); a user-edited `baseCm` of a ground wing is kept (J-DET-24) and carries the wings
standing on it. The fall under a ground wing (`max − min`) is a foundation skirt the 3-D export extrudes down to the
terrain and projected shadows include. Where the fall across a row footprint would exceed `skirtMaxCm` (table, default
300 cm) the footprint is split along the contour into stepped wings, each within the limit — terraces step down a hill
instead of floating. Walls store their base as a knot profile along the trace (§2.2 rule 5), gates and towers their own
base from the samples under their footprints, bridges and pier decks a deck height from the two bank elevations plus a
clearance row. Shadows and the 3-D export (§11.1) read the same numbers, so they agree on any terrain; the lighting model
is §8.4's (item 68), the base populating every height and keeping the display list's shadow hook (§8.1). A building
under Works (item 67) keeps its finished heights in the record: its heights at a week are derived by §4.11's
`heightsAt` — the walls rising storey by storey, no roof before ROOF FRAMED — and a `framed` roof (rafters without
covering) is a drawn state, never a `RoofSpec.kind`. The heights acceptance bar is §13.2's.

**Materials (COV-FTG-F20; item 19; owner, 2026-09-26: "different materials for construction is only represented by a
change in texture or color. It has nothing to do with the shape").** A material is a **rendering attribute only**: it
changes the texture and colour roles the style sheet maps it to (§8.2) and never a footprint, a wing, a storey, a height
or a roof form — the same geometry renders in any material, as in FTG; shape is decided by the designation template and
prosperity alone (§4.7 S11). `MaterialRow` is a rule table read by S11 whose **default rows reproduce FTG's model**
(item 23): one default material per growth stage (`key.stage`), overridden per district kind and per building class
(temples and churches stone by row), with wealth shown through the lifestyle-banded building pools (§10.2) and the
roof-colour role by band in the style sheet (§8.2) — never by a material keyed to the prosperity band. The **optional
regional shift** — rows marked `extension: 'regionalShift'`, off by default, a preset row (D-2) — may shift materials
with the prosperity band within what the region builds with, never as a universal ladder. A district's
`materialOverride` and a building's `setAttr` override the rows; enceintes carry their own wall material (§2.7). Wear
(`Building.condition`, item 31) is a rendering class over the same geometry (§8.2); a roof is lost only in the decline
ladder's derelict state (`decay`, `RoofSpec.kind 'none'`, §2.8). Test: T19-3 (§13.2).

**A building's class (`Building.class`; `BuildingClass`, above).** One class row per building, written with the plot's
designation (`Designation.cls`, §4.7 S11) and changed only through it — the designation mutator (item 18), a `setAttr` of
a plot's class being a designation change (§4.7), and a `rebuild` or `build` naming its class (§4.11, §7.1): the
buildings of a workplace's or an institution's plot take the class of the use the designation names (`Designation.use`,
a `BuildingClassRow.id`) — a concealed use behind a front its front's, a bare hidden use its own (item 63; §4.7's
*Concealed institutions*); a residential plot's take the residential class S10b's class mix draws for the plot (item 71;
§4.7); a cluster's structures each take the structure class §4.7's *Informal clusters* draws (`shack`, `tent`,
`lean_to_shelter`; never the class mix's). Every building of a plot but a cluster's structures carries the designation's
class, its slot's `role` (§2.5) naming its part. Its readers: `ClassRules.pick` and the designation template (§10.2), the
room programme (`RoomProgramRow.for`, §10.2), `MaterialRow`'s class key (*Materials*, below), §6.3's class family, the
basement's `cellar` and `crypt` columns (*Basements*, below) and V03 §2.4's class rows.

**Descriptions, opening hours, sub-locations (COV-FTG-F21, FTG-11).** A building's description is generated by the
naming engine (§10.4) from its class, use, owner and district, persisted per entity and editable; opening hours come
from the class table and are what the simulation module reads. `SubLocation` records (named parts of a building with
tags and capacities for leisure, temporary residence, guest workers, study and work) are filled from the class table
when the building is created; stage-3 rooms refine them (a `Room` may host a sub-location) and never replace their ids.

**The stage-3 hook and its cost contract (owner-staged; DEF-17, SCL-13).** Stage 3 replaces `OutlineBuildingGenerator`
with volume 2's generator — its massing and composer, the massing family rows in place of item 59's path-shape rows
(`PathShapeRow`, above; Fantasy Manor build 890's five layout families, provenance P21), a hip block distinct from a
square tower's pyramid, and what ours adds to that model (J-A59.21: the wings in the collision set, every main door
facing its street by *Entrances* below, a metric scale) — as V02 §3.3 – V02 §3.5 state; the base keeps the interface, the
contract and the budgets. The interface is split so the city view never waits for a manor: `outline(input)` returns the
wings every LOD, every export and the shadow hook use — a row's `fixedWings` unchanged, with heights and roofs added —
and `compose(input, outline, lod)` returns wings with roofs, dormers, porches, towers, courts and rooms, lazily per
visible tile at district LOD and finer (a tile draws the outline until its compositions arrive). Their budgets — the
base `outline()` inside S11's geometry share, a stage-3 `outline()`'s admission bounds and the re-declaration of S11's
§12.4 row by the measured difference, `compose()` per building and per tile — are §12.7's.

**The stage-3 contract.** The union of the composed wings and of the composed towers' ground rings equals the outline's
union exactly (integer equality after snapping), so O17 (i)'s identical footprint hash at every LOD holds by construction
(its test: §13.2); stage 3's composer composes each wing at exactly its base wing's storeys (V02 §3.6). A composition's
wings — generated or stored, and after every composition edit — reach every storey its base wings reach, with at least
their area at each storey, so the households the capacity admits always fit its plan (F-PLAN tier 6, §5.2). The contract
reads the wings' **ground rings**: a wing that spans a passage (`spans` on the base or the composed wing, item 30)
contributes its ground ring, its span ring lying outside the union at the ground and inside the wing's extent above it.
The plan's seed rings — base or composed, clipped to tile (step 4) — stand at least `attractCm` apart except where they
share a joint, so the plan rung's transient arena inserts them unmoved (§3.4's seed contract). The seed clip (§3.4's
`tileRings`) is given the wings reaching a storey in the **clip order**: wing order, except that a wing whose extent
there lies wholly inside another's is taken after that container (two identical extents keep wing order), so a contained
wing has no piece at that storey — its floor there is its container's, and every anchor or fixed ring the plan rung
places in that wing at that storey lies in the container's piece — and no piece has a hole, which the clip refuses. The
composed towers — each a round wing to the plan rung (`Composition.towers`) — join the clip order at every storey they
reach: a tower whose ring there lies wholly inside the extent of a wing and overlaps no wing taken before the first such
wing in the clip order (its container) is taken directly after that container, towers sharing a container in
`Composition.towers` order; every other tower is taken before all the wings, in `Composition.towers` order; and no
tower's ring lies wholly inside another tower's at a storey both reach (a stair inside a tower is its spiral core,
`StairCore.tower`). So the clip order stays one order and no piece has a hole. Each tower's round room is its ring less
those of the earlier towers in the clip order that it overlaps — its own piece when it precedes the wings, each wing's
piece taking the arcs; a tower wholly inside a wing that overlaps a wing taken before that container is taken before the
wings too, the earlier wing, not wholly inside the container, carrying the tower's cut to the container's edge; a tower
that follows its container has no piece there, and its round room lies inside the container's piece. A stair core's bay
or a chimney stack that step 3 places inside a composer's room — the bay of a spiral core inside its tower's round room,
a stair or a hearth's stack inside a hall — stands against that room's wall, meeting its sides along one run and nowhere
else, or fills the room (a stair turret); step 3 filters its candidates to those that stay out of every composer's room
or stand in one so, and that leave each composer's room, less every bay and stack it holds, in one piece the transient
arena accepts beside them (§3.4: `minEdge`, clearance, simplicity); a refusal naming a vertex that a bay or stack gives
the room belongs to that bay or stack (F-PLAN tier 2, §5.2), so a refused composer's room stays the composer's bug. At
each storey where such a bay or stack lies, the plan rung passes the room less it, and no room where it fills the room,
so the room keeps no hole and meets that bay or stack only along its sides (§3.4's `transientArena`). Every composer's
room (`Composition.rooms`), a tower's round room included, lies inside one seed piece at its storey — the composer emits
it inside its own wing's or tower's extent less the extents before that wing or tower in the clip order, or inside its
container's piece where the clip order leaves it none — so every fixed ring the plan rung passes lies inside one seed
piece (§3.4's `transientArena`), and F-PLAN's abort on a refused composer's room (§5.2) marks a composer's bug. **Its
fourth rung** (item 28): per storey, the union of the plan's rooms equals the union of the **extents** of the wings that
reach the storey — a solid wing reaching none — and, at the ground storey, also the span ring of each
passage a wing of the building spans, which the plan reserves before any cut as one room of role `passage`, scope
`circulation`, its two end edges exterior walls carrying the passage's arch openings (the plan rung, below; §3.10's
seed-tiling row; J-A30.23). Every wing reference of this section — `Entrance.wing`, a porch through its wing,
`Room.wing`, `StairCore.wing` and `.tower`, `Chimney.wing`, each entry of `Storey.wings` and `ProgramRoom.wing` — holds a
base wing's key, and every writer keeps `Building.wings` in V02 §2.1's canonical order (towers and turrets by key, then
the other wings by key); the base outline builder's keys equal its indices, so nothing changes before stage 3.
* **Stage-3 intake measurement and fallback**. The stage-3 intake measures the generator's `outline()`
  time per building class on B-CITY METROPOLIS seeds. If the town-wide median exceeds §12.7's 10 µs, or the composed
  classes' median exceeds 60 µs or their p99 250 µs (V02 §6.1), the fallbacks of V02 §6.1 (a)–(b) apply first; if those
  still miss, `outline()` runs the generator's own massing step only (its wing rectangles without roofs or rooms); if
  that still exceeds the budget, the base `OutlineBuildingGenerator` keeps producing the outline and stage-3 `compose()`
  is constrained to it (its wings must union to the base outline). Diversity "from a giant manor to a small hovel" stays
  a property of `ClassRules` (data keyed by the context vector), not of the generator. The intake also runs §2.6's test
  with every fixture building's composition stored (§13.2), so a stage-3 generator is admitted only with compositions the
  base can carry and that keep the storey rule above.

**Entrances (owner, 2026-09-26: "larger buildings can have more than one entrance. there should always be a street facing
entrance. back or side entrances if an alley presents itself are optional or random but limited. back entrances in the
case of a larger court or yard is recommended"; item 29 (a); J-A29.21).** A building's doors are a set, `Building.entrances`:
each a named footprint vertex (`('entrance', building id, i)`, indexed, §2.2 rule 7) on the wing that faces its way,
carried through every change of the footprint by the wing-carrying rule (above), and derived by one per-entity function,
`deriveEntrances(building, plot, template row)`, that S11 (§4.7), the designation mutator (item 18, §4.7 S11 — a house
that becomes a shop gains its street door; a shop that closes keeps the door as a house door) and the edit layer
(`setEntrance`, §7.1, §7.4) all call, as `deriveBase` is called; its draws are the `siteplan.entrance` concern (§6.1), so
re-deriving the doors disturbs no site-plan draw. S11 derives the doors — and then, with no draw, their `storey` — after
the basement decision, whose levels and access they read; the door and basement draws keep their order on the
`siteplan.entrance` concern (§6.1, J-A29.61). The rules are defaults; the rows are the designation template's
`entrances` columns (§10.2; item 23: the parity presets give one street entrance per building with side and rear
probabilities 0 — the owner's rule (item 29) as their default, provenance `owner`, since neither the FTG client of the
25 September 2026 capture nor MFCG 12710731 models a door, the latter by inference (what each carries is §13.5's
entrance rows; J-A50.01, J-A50.21)):
1. **One main entrance, always street-facing.** Exactly one entrance has role `main`. Where the building's massing names
   an entrance hint (`Building.massing.entrance`) it stands on the part of the side that hint names which lies on the
   footprint's boundary — a wing abutting that side (a stair, a church porch) covers the rest (V02 §3.15.1 ST7) — and
   `deriveEntrances` keeps its drawn position where it already lies on that free part and moves a covered one to the
   nearest free point, with no second draw; the hint faces the plot's frontage access edge by construction (before M6 only a stepped or oval building's hint is set, so no other building's door moves). Otherwise it
   stands on the footprint side that faces the plot's frontage access edge — wherever the site plan set the front line
   (§4.7 S11's recession; flush for a row) — and faces the street; where along that side is `deriveEntrances`' draw
   (J-A50.21). A set-back building on a multi-building plot (a compound's hall behind its forecourt) puts its main
   entrance on the court or the path that leads from the plot's street gate (`PlotBound.gates` on the frontage: the plot
   itself always has a street-facing gate or door); a hidden plot's main entrance faces its access face — the court or
   the passage (item 30, §4.6); a cluster structure's faces the `footpath` it fronts (item 70; §4.7 S11), read the same
   way (J-A70.44).
2. **Side and rear doors only where an access edge presents itself.** A `side` or `rear` entrance is drawn only where the
   plot has an access edge beyond its frontage — a lane, a through-alley, a back lane or a passage face (S8's interior
   treatments and S10's alley rung, §4.6, §4.7) — with the row's probability by class × size × band and capped by the row
   (`capSide`, `capRear`: one side and one rear door for ordinary classes; hovels and row houses ≈ never; shops and inns
   often on a corner; workshops and warehouses toward the lane); `service` entrances for institution classes, one per
   court side the row allows. A concealed use (item 63) adds one `service` or `yard` door flagged `concealed` where such
   an access edge onto an alley or a passage presents itself — never the main door; with none, its concealed rooms are
   reached from the front's service side (§4.7's *Concealed institutions* (4)).
3. **A yard door is recommended.** When the plot's `yard` parts behind or beside the building reach the row's
   `yardDoorMinM2`, a `yard` entrance opens onto the yard or court by default — a kitchen or service door, never a public
   entrance.
4. **Every entrance is an addressable vertex.** Add, move and remove are building edits (`setEntrance`); the main
   entrance moves only along the footprint side rule 1 puts it on and is never removed; entrances are re-derived when the
   designation mutates, and when the ground or the stack beside them or the building's basement (its `access`, `kind` or
   `floors`) changes — their `storey` with them (V03 §3.6) — and kept where an edit fixed them (§7.2); a side, rear, yard
   or service entrance whose outside ground meets no level's floor is not derived, after its draws (V03 §3.6). Its ordinal `i` is stable: a re-derived entrance that §6.3's anchor re-matches keeps it, a new one takes
   `Building.nextEntrance`, which never decreases, and a removed one's is never re-used (J-A29.23), as
   `WaterBody.nextControl` is.
5. **The plan opens a door at every entrance** and roots its circulation at the main one — except a building with no
   storeyed wing standing on the ground (a solid stack, V02 §3.15): its main entrance is the foot of its stair chain (rule
   1 unchanged, the stair's outer side on the footprint and facing the frontage); the plan opens no door there and roots
   its circulation at the landing door of the first storeyed wing the chain reaches (V02's `landingSide`); a building with
   no storeyed wing at all (a solid monument, a sealed stack whose every wing is solid) has no plan above the ground — no
   level at or above it and no room there; its basement storeys and the heads of its hosted accesses are planned as V03
   §3.1 states — and its main entrance opens nothing; a sealed stack (V02's stair form `none`) that carries a storeyed
   tier or shrine keeps that wing's plan, reached by nothing (V03 §3.3 S6 (e), `W_TIER_UNREACHED`), and its main entrance,
   on tier 0's front side, opens nothing. Side, rear, yard and service doors are secondary roots, so a
   plan may legitimately have more than one way in (the plan rung, below); the passage room's two arch openings are the
   passage's own ways through (kind `passage`, no entrance), and a door from the building onto the passage is a side
   entrance facing `passage` (rule 2; item 30, J-A30.23).

§5.3's rows check rules 1 and 2; the test is §13.2's entrance bars on B-CITY-lite.

**Basements (owner: "selective but appropriate basements"; item 29 (b); J-A29.22, J-A29.24).** `Building.basement` is
derived by `deriveEntrances`' pass — S11's entrance and basement derivation, never rolled alone — and forced by
II.7.6 step 1's requested-mode ladder (the probability taken as 1, the terrain gate kept) for a building whose use is a
subterranean dossier institution placed on the surface (DR17; V04 §3.7 L5), from: the class row's
`cellar` columns (§10.2 — the base probability by class: cellars for inns, taverns, breweries, storehouses, manors, keeps
and temples by row, none for hovels, tents, sheds, shacks and lean-to shelters; the kind weights; the slope threshold
`slopeCm`; the rock cost; the cellar depth `depthCm`, default 220 cm, and the ring's inset `insetCm`, default 60; for a
building carrying a concealed use, the higher probability of its front's and its concealed class's rows, §4.7's
*Concealed institutions* (4), item 63), raised within the class band by the prosperity value and by the building's size
and storeys (larger and taller more likely), and gated by the **terrain**, read from §2.3's facts and the context vector
— no new raster. The **water table** is the nearest water body's surface elevation (its shore's terrain sample) plus the
freeboard `freeboardCm` (default 50) for a plot within `waterTableM` (default 40 m) of a shore, and elsewhere the height
of the drainage line: the `hydro` cell nearest the footprint's centroid whose `flowAccum` reaches `drainageAccumCells`
(ties by cell index; where no cell reaches it, no water table limits the cellar) — the three values are §10.2's
basement-gate row. Against it: **no cellar** on a deck plot built over water (V02 §3.16 — a quay built on the bank,
`DeckContext.surfaceCm` null, is ground and takes this gate like any plot), nor where the plot's `terrainClass` is `damp`
or `flood`, or where even a half-cellar's floor — the wing's `baseCm` less half the cellar depth — would lie below the
water table; a **half-cellar** where the full cellar's floor (`baseCm` less the depth) would lie below it and the
half-cellar's would not, or where `terrainClass` is `low`; a **walk-out** cellar where the fall under the footprint
exceeds the row's `slopeCm` (the same samples `deriveBase` reads — the skirt facts), or where a footprint side lies on or
within `cellar.insetCm` of a `RetainingWall`'s high side (§2.7) whose step there (§2.7's `stepProfile`) is at least
half the cellar depth; `rock` lowers the probability by the row's cost. **The crypt** (item 109 (k); built at M6-U, absent before — then a church takes its class row's ordinary basement draw): the
class row's `crypt` column (V11) decides it — `always` (the cathedral, a great temple, and any building a dossier crypt
record binds to) takes its basement by the no-refusal **crypt ladder**, in place of the class probability and of the
terrain gate's no-cellar rows: a full crypt; a half-sunk crypt where the full floor would lie below the water table or
the plot is `low`; a `raised` crypt where even a half floor would lie below it or the plot is `damp` or `flood` — its
floor at max(the lowest terrain sample under its ring, the water table + `crypt.freeboardCm`), the ground wings over the
basement's ring lifted so their ground storey clears it by `crypt.clearCm` (for a basement that is only a crypt the wings
over the crypt's ring — its seed wings, under which V03 §3.7.4 keeps a derived raised crypt; for the ground wings' whole
inset that V03 §3.7.4 gives a crypt no stair reaches, every ground wing over it; a solid tier 0 that holds the crypt
inside it keeps its height), the lift written by the basement step as those wings' `Heights.baseCm` (V02 §3.14.5), with
steps at the crypt ring's edge; on a sky island volume 5's rim-slab vault — never a refusal; it is a crypt-only basement
where its ordinary draw gives none (the ground wings' whole inset instead where a storeyed ground wing stands but over
none of the crypt's vault), its ring before the rank's trim, or the author's ring (V03 §3.7.4); `basement` holds a crypt
exactly when a full, half or walk-out basement is drawn; `never` none. The crypt ring is seeded under volume 2's
`cryptSeedWings(b)` (V02 §3.14.5 (c), exported by `@plat/plots`; else the far third), grown to V11's `cryptM2` and ranked
by V03 §3.7.4 (3) — the principal crypt (the cathedral's; else the `always` building's with the largest ring; with
neither, none) the largest, every other capped at `crypt.rankShare` × the principal's area — in a closing pass after
S11 over the settlement and again whenever the principal's area changes.

The basement lies inside the ground wings (those standing on no other wing — for a stepped building its tier 0, whatever
storeys they reach) and smaller than their union (`Basement.ring`, inset by `cellar.insetCm`), has its own storeys
(`Basement.floors`, its floor `baseCm` less the depth per storey — a `half` basement raising the ground wings over its
ring by `cellar.depthCm ÷ 2` above the datum `deriveBase` gives without the raise, as the crawl form raises its storey,
written by the basement step as those wings' `Heights.baseCm` (through the building datum pass for a building with a wing
standing on another) and kept by every later re-basing path while the basement stays `half`, so its floor lies at the
datum less half the depth, the floor the gate tests; a basement that is only a crypt raises the wings over the crypt's
ring — its seed wings where V03 §3.7.4 keeps a derived half-sunk crypt under them, a raised choir over it; the half raise ships with the basement gate at M2b, §16, so no document's datum shifts) and is
joined by the stair core, a trapdoor or an outside stair — **`Basement.access`, derived with it:**
`external` for a walk-out, or where no wing standing on no other wing is storeyed (V03 §3.3's `ground(b)` absent) — its
door then at `basementDoor(b)` (a retaining wall's side first, else the tomb door) — else the class's
programme row's `basementAccess` read at the plot's `builtBand` (§10.2), a shell fact that never moves with the occupants
and is edited with the basement (`setAttr(basement)`), which the plan rung reads (step 3). Its ring follows every change
of the footprint by the wing-carrying rule (rule 2 (b); rule 4 says what becomes of a ring that no longer fits;
J-A29.23). It is editable (`setAttr(basement)`, §7.1; an edited basement is kept through terrain changes, §7.3 (a)) and
re-derived when its terrain gate changes. **A cellar never joins a sewer as a room** (item 12: underground neighbourhoods
front sewer tunnels only; J-A12.42): a way down from a basement to an underground element — a stair, a ladder, a hatch,
or a door through the basement wall into an adjacent sewer dwelling — is an `AccessPoint` record (II.7.4, source
`basement`), made by II.7.3's *Basement accesses*: a probability by class × band × age × concealment, gated by the
basement's reach to an underground element (item 64). Emulation note: MFCG and FTG have no cellars; Dwellings' basement
share — n ÷ (n + 1), n being the storeys over the ground, taken from Dwellings itch 17195045's code and replay-confirmed
(D2) — is a descriptive baseline, never a gate (§13.5); the terrain gate and the prosperity term are our extensions (item
23). §5.3's rows: a basement other than a crawl space or a raised crypt never under the flood band or below the water
table (a raised crypt's floor lies above it by `crypt.freeboardCm`); every basement inside its ground wings and smaller
than their union.

**A requested basement (item 66; J-A66.21).** When an edit's closure needs a basement the building lacks —
`addUndergroundAccess` (§7.3 item 9; II.7.6's pieces) — the decision above runs as a request: the request overrides the
class probability, never the terrain gate, and takes the richest lawful form in a fixed order: (1) a full cellar; (2) a
half cellar where the full cellar's floor would lie below the water table, or a walk-out where the fall passes `slopeCm`;
(3) a **crawl space** where the plot is `damp` or `flood` or even the half cellar's floor would lie under the water table
— then the ground storey is raised by half the class's cellar depth (`cellar.depthCm` ÷ 2) above the datum `deriveBase`
gives, a void beneath it inside the inset ring, reached by a hatch (`kind: 'crawl'`, `floors: 0`, `access: 'trapdoor'`)
— lawful where the lowest terrain sample under the footprint lies above the water table, a `damp` or `flood` plot included
(a raised floor over a void is the wet-ground form, item 66 (a)(1)); (4) otherwise a refusal naming the gate each form
failed (F-EDIT, §5.2), never a silent substitute — on a deck plot over water every form fails at once and the request
bends (item 101 R2) to the same request on the nearest building on the ground of its plot group, else of its block, else
the nearest building on the ground (V03 §4.2), named (`bend.deck.basement`). The closure records the
basement it created (§7.3 item 9 (c)): it reverts to the derived decision once nothing that needed it remains, unless the
user edited it; the plan rung reserves the access's stair, ladder or hatch (step 3) and is marked `stale` (§2.8). A
requested basement of an `always` class keeps its crypt; a crypt ring the author edits is never trimmed by the rank (V03
§4.2); a crypt ring set by `setAttr(basement)` on a building without a basement makes a crypt-only basement by the crypt
ladder (the ground wings' whole inset where a storeyed ground wing stands but over none of that ring, V03 §3.7.4), the
building `always` for that derivation (V03 §4.2).

**The plan rung — the fourth rung of the building ladder (owner, 2026-09-26: "a coherent floor plan of the building …
taking and tailoring to the building type and function"; item 28; J-A28.21; the Dwellings synthesis,
`research/findings/dwellings-synthesis.md`, ideas only).** Stage 3's ladder is outline → wings → rooms → plan
(`Composition.lod`); the plan is the building's floor plan per storey, derived by `BuildingGenerator.plan` (volume 3,
M6-P) from the composed exterior and the building's content — never from a shape of its own. The base carries the
records above, the step's signature, the streams (§6.1), the events (§7.1), the elaboration record and cache (§2.8,
§2.9), the trigger policy (§4.1), the draw, export and budget rows (§8.5, §11.1, §12.7), F-PLAN (§5.2) and §13.2's bars;
adding the rung is a registration. It runs **function first** — the reverse of the reference's partition-then-label:
1. *Inputs — nothing is rolled.* The wings that reach each storey (a wing reaches the levels of volume 2's `storeyRange`,
   a solid wing none; V03 §3.3) (`BaseWing.ring` or the composed `Wing.footprint`, with their `spans` at level ≥ 1 and, at
   the ground storey, the spanned passage's span ring), each wing's `Heights.floors`, the basement (`Basement.ring`,
   `Basement.floors`, its crypt), the entrance set, the composed towers, courts and porch, the class and its designation
   template's `programme` row (§10.2, read at the occupants' band, Plot.fieldBand, J-A19.43), the use, assignment and
   sub-locations (one room each), the declared rooms, the concealed uses (`Building.concealed`, item 63), the accesses the
   building hosts (`BuildingInput.accesses`), the running Works' stage (item 67), the households housed
   (`Building.households`) and each spanned passage: at the ground storey its span ring is a seed ring and a fixed ring,
   the passage room (J-A30.23). A plan is therefore a pure function of the building's committed state and its own
   streams (§4.1's contract, §6.2).
2. *Programme.* From the programme row and the interior ladder (below): a `ProgramRoom` list — each household's unit at
   its ladder row's form, the shared, service and staff rooms the row allows, the class's own rooms (a smithy's forge, an
   inn's common room, a chapel's nave), one room per sub-location, each concealed use's programme rows (§10.2's
   `RoomRuleRow.concealed`, flagged `concealed`; item 63) — each sized in m² (the row's triple × the ladder row's size
   factor, interpolated along the occupants' value) with its storey rule, exterior demand, opening kind, adjacencies,
   hearth and priority; counts by the row's law (`const`, `perStorey`, `perHousehold`, `perCapacity`, `perSubLocation`; a
   fractional count drawn on `plan.program`); the list each came from is its `origin` (V03 §3.2 A2).
3. *Allocation and anchors.* Each storey's capacity is the area of the extents of the wings that reach it (the passage
   room excluded) less the row's circulation share; hard rooms go by their storey rule, soft rooms by priority until the
   capacity is met, the household units first (F-PLAN tier 0, §5.2: a unit falls to the next poorer form before anything
   is dropped, and no tier drops a unit). The **stair core** (`StairCore`: a bay of the wing the row's `stair.placement`
   names, or the composed tower as a spiral — standing against the wall of any composer's room it lies in, by the
   stage-3 contract) is placed before any cut and serves every storey of its wing, the basement as `Basement.access` says
   — `core`: the core takes a bay that lies inside `Basement.ring` as well as inside its wing's seed piece at every storey
   it serves (the placement's candidates filtered by exact containment, as §3.4 requires of a `fixed` ring; the
   container's piece where the clip order leaves the wing none); `trapdoor`, or the fallback where no candidate fits the
   ring (the core then stopping at the ground storey): a core of kind `trapdoor` serving the basement storeys and the
   ground storey, its bay inside the ring and inside one ground-storey seed, placed from the same filtered candidates —
   the fallback reported, writing no building record (`Basement.access` stays as derived; a click changes no digest,
   §6.2), and where not even that bay fits the basement is unreachable, which F-PLAN takes (§5.2, tier 1; J-A29.25);
   `external`, an outside stair (a walk-out's, or that of a building with no storeyed ground wing): the core, where one
   serves the ground, stopping at the ground storey, a door (an `Opening` of kind `door`) opens the basement at the point
   `basementDoor(b)` gives — on a side of `Basement.ring` at least two of step 4's wing-local modules long (a door's
   width) and, where the building has a crypt and a storeyed ground wing, one whose door lies off the crypt (its ring and
   capped bays): a retaining wall's side first, else, where no ground wing is storeyed, the tomb door's, else the side
   whose outside ground samples lowest on `levelledGroundCm` (ties by ring index) — and where it gives none, the basement
   is joined by the `trapdoor` fallback above, reported; the entrance rooms (one per entrance) and the
   hearth rooms are anchors fixed in their wing and side before any cut, each access the building hosts is a fixed anchor
   of its storey — its head (stair, ladder, trapdoor or door; V03 §3.7.2) placed before any cut, a crawl space's hatch an
   opening of kind `trapdoor` in the ground storey —, and the passage room is its span ring, fixed whole (step 1), so
   stairs are stacked by construction.
4. *Partition to targets.* Each wing of each storey is cut on the rung's **transient arena** (§3.4; J-A28.31) — its seed
   rings the extents of the wings that reach the storey, clipped to tile (where wings overlap, rule 4 (iii), each extent
   less the union of the extents before it in the clip order, by §3.4's seed clip, `tileRings`), and at the ground storey
   each span ring (step 1); its fixed rings the stair core's bay, the chimney stacks, the passage room (a span ring, both
   seed and fixed) and the composer's rooms, each less a bay or stack it holds (the stage-3 contract) — by the storey's
   **layout pattern** (`LayoutPattern`, a weighted row per storey class in the programme row: `bisect`, recursive cuts
   across the region's short axis from a re-entrant corner where one exists; `follow`, cuts parallel to the long sides —
   a gallery on the court or street side; `spine`, a corridor along the wing's axis with rooms off it, the lodging
   house's and the inn's upper floors; `hall_and_parlour`, one cross cut with the hearth room larger; `cross_passage`, a
   through passage at the entrance with rooms either side; `enfilade`, rooms in a row with aligned doors; `nave`, one
   room), with the remaining rooms' target areas as the stop rule and the pieces assigned to programme rooms as they are
   cut, so no room waits for a label. Cuts are planned on a **wing-local module** — V03 §2.4's `PlanGeometryRow.moduleCm` —
   in the wing's OBB frame; the planner's grid, never a second lattice — and written back as world lattice points (`Room.ring`),
   so walls are exact centimetre polylines, never cells; slivers and one-bay strips merge into circulation.
5. *Circulation and openings.* The room graph is built as a spanning tree first — priced by the programme, the pattern's
   hub (the spine, the hall, the stair hall) preferred, a bedroom's or a store's degree capped by its row — and loops are
   added by rule, never by chance (a kitchen to the yard door; a hall to the parlour and the stair; an enfilade's doors) —
   Dwellings itch 17195045 keeps half of its non-redundant extra doors at random, a loop baseline that describes the
   reference (D3) and binds nothing; a door at every entrance, rooted as *Entrances* rule 5 states, and an `external`
   basement's outside door, where step 3 opens one, the root of the basement's storeys; stair-core doors on every storey
   it serves; each unit's own entry door (the ladder, below); a `passage` opening in each end wall of the passage room
   (item 30). A concealed room (item 63) is joined only to other concealed rooms, to service rooms and to the room behind
   a concealed or service door, never to the public hub the main entrance roots, so the concealed programme is entered
   only by a service, yard or concealed door (§5.3's row). Openings and windows are records on wall segments.
6. *Exterior coherence.* Per storey the rooms tile the extents of the wings that reach it (the contract's fourth rung,
   above; a wing of fewer floors is roof at that level; a basement's outline is `Basement.ring`); chimneys are derived
   from hearth columns and rise to the roof (`Chimney`, drawn by §8.6); dormers are placed from the top storey's roofed
   rooms with exterior demand (`Wing.dormers` becomes derived, one per such room's façade bay, capped by the eave length);
   the porch sits at the main entrance; a composed tower is a round room per storey with the spiral inside (`radialSplit`
   for two), its bay against the room's wall (the stage-3 contract); windows follow each room's exterior demand, one per
   façade bay of its exterior wall (the bays of volume 2's `facadeBays`), aligned across storeys where a
   wall stacks; furniture is abstract shapes by role from the row's `furnish` columns (`Storey.furniture`, placed by V03
   §3.8), never blocking an opening or the stair bay. Materials stay texture only (above).
7. *Streams, re-rolls, edits, failure, cost.* The rung's four concerns — `plan.program`, `plan.layout`, `plan.roles`,
   `plan.furnish` — are keyed with the rung's own reroll (§6.1): New random on `plan.layout` (`regenerate` with `rung`,
   §7.1) re-partitions and keeps the wings, the entrances and the stair core; on `plan.roles` re-assigns roles and what
   hangs off them (windows, door kinds, furniture) and moves no wall — the reference's restrictive re-rolls as our own
   rule. Room roles, walls, openings, windows, the stair core and a room's unit are events scoped to the building (§7.1:
   `setRoomRole`, `moveWall`, `splitRoom`, `mergeRooms`, `setOpening`, `setWindow`, `moveStairCore`, `setRoomUnit`; a
   room is lockable on its path); the first plan edit stores the composition with its plan, whose rings and points
   `carryWings` carries with the wings (J-P48, above). A programme that does not fit is F-PLAN's (§5.2), per building,
   never whole-house. **Rooms are values**, never L4 faces, so a click changes no plat and no digest (§6.2). Cost: one
   plan per click within §12.7's row; the room graph is exported in our own schema (§11.1). A building whose running Works
   stands before FINISHED shows its plan as walls without doors, windows or furniture up to the storey its stage has
   raised, and a `decayed` or `ruined` building its fallen walls and open rooms — a drawing of the same plan, nothing
   stored; the stage counts among the rung's recorded inputs (§2.8), so a stage change marks the plan `stale` (item 67
   (h), (j)).

**Elaboration by click (owner: "once generated it is saved … until something changes in them from the simulator"; item
28 (b)–(c); J-A28.22).** When a rung is derived is the viewer's `elaborate` key (§2.9; `click`, the owner's default, or
`view` within §12's budgets — §4.1 states the policy); what it derives is fixed. Per building and per lazy rung the
**elaboration record** (§2.8, which states its states and per-rung inputs) marks what a batch changes; the cached result
stays on view with a change marker at every zoom (§8.5), and the next click re-derives a `stale` rung as a mutation from
its **canonical prior** — the stored plan where one exists, else the as-built plan carried along the interior ladder
(below) — never from the cache and never by a re-roll (§7.3); viewing never re-derives a `current` rung. Pre-assigned
plots are the eager content decision of §2.5 and §4.1: assigned at the city level, "just not generated" until the click.

**The interior ladder — the interior has no floor (owner, 2026-09-27: "following on the fact that we put a floor to the
geometry regarding prosperity, that does not mean the interior has to be … same building geometry but not the interior";
item 28 (f); J-A28.23 – J-A28.29).** Item 31's geometry floor bounds what is BUILT: a plot's shell never reads poorer
than its geometry floor by wealth change alone (§4.11). The interior reads WHO IS THERE: the plan rung's programme is
written for the **occupants' band** (Plot.fieldBand, §2.5: the plot's current prosperity field value and its band, which
is `ContextVector.prosperity` and `prosperityBand` at the plot's derivation and follows the field after it without
re-deriving the plot — never the manifested band and never the geometry floor; J-A19.43, J-A31.43, J-A28.29) and for the
household count (`Building.households`), and the plan is re-cut inside the unchanged shell as they change. So a mansion
district that grows poor keeps its big shells while their interiors fill with families; the poor of a developed town
live in re-cut interiors behind grand fronts (this rule), in the back courts behind them (item 30, §4.11 rung 2) and in
the cheap stock of the edge (item 27's shanty rule, §4.5). The rule is **one table**, keyed by the band names of §4.5's
band set (`FieldBands.bands`; its middle row is the band `FieldBands.middle` names, so the shell's floor and the
interior's middle agree per settlement), read at the occupants' band and interpolated along the value inside a row; the
per-class programme rows (§10.2) follow it and add what a class needs. Its rows are `InteriorLadderRow`s (above), the
`interiorLadder` table of `roomProgram.json` (§7.6); the default rows (our own; calibratable, §13.9; tendencies
changeable per region and era, item 23 — no reference has interiors that follow their occupants, and with no epoch every
residential building houses what §4.7's generation fill gives it within the capacity bounds, so the static baseline is
unchanged):

| band (the default set) | form of one household's unit (`UnitForm`) | households per shell (within the capacity bounds) | the unit's rooms (scope `unit`) | shared rooms (scope `shared`) | staff rooms (scope `service`): count; size as a share of the owners' principal chamber's target; placement | circulation (scope `circulation`) | room-size factor |
|---|---|---|---|---|---|---|---|
| `rich` | `house` — the whole shell | [1, 1] | hall, parlours, chambers, a solar, kitchen with hearth, buttery and stores | none | staff chambers, one per two principal chambers; 0.35; in the attic, the basement or the service wing, never beside the owners' rooms on a storey that has them | few corridors: a stair hall; `enfilade` or `hall_and_parlour` | 1.25 |
| `prosperous` | `house` | [1, 1] | hall or parlour, chambers, kitchen with hearth, a store | none | one staff chamber; 0.40; the service side or the attic | a stair hall | 1.10 |
| `comfortable` (the middle) | `dwelling` — a kitchen with hearth, a parlour and chambers | [1, 2] | kitchen, parlour, chambers | none: two households divide the shell by storey or by wing, each with its own door off the stair hall | none | a stair hall | 1.00 |
| `modest` (the lodging house) | `lodging` — a chamber and a parlour | [2, capacity] | chamber, parlour | a shared kitchen with hearth on the ground storey by the stair core; a common room where the class row allows | none | a corridor or stair hall inserted so that every unit has its own door (`spine` on the upper storeys) | 0.85 |
| `poor` (the tenement) | `apartment` — a bedroom and a small cooking place | [3, capacity] | bedroom, cooking place (a hearth where the class row allows) | shared facilities where the class row says | none | a double-loaded corridor (`spine`) on every storey, the stair core its hub | 0.65 |
| `squalid` (destitute) | `room` — a single room off the corridor | [4, capacity] | one room; no cooking place | shared facilities, or none | none | `spine` | 0.50 |

* **The dwelling unit (J-A28.25).** Every room of scope `unit` belongs to exactly one household (`Room.unit`); `Plan.units`
  lists each household's form and entry door; a household's unit is the rooms of its building's plan carrying its id
  (§2.7). **The unit-door rule:** each unit has its own entry door onto circulation — a corridor, stair hall or landing —
  or onto the street (an entrance), and never opens through another unit's room (§5.3's row; a `setRoomUnit` or plan
  edit that would break it is refused, F-EDIT, §5.2). Shared and service rooms open onto circulation. Units are given to
  households in address order by default; `setRoomUnit` overrides.
* **One capacity function (J-A28.23, J-A28.28).** `capacity(b) = min(households.max of the designation template at the
  plot's builtBand (§10.2), max(1, floor(Σ over the storeys s at or above the ground of (A(s) × (den − num) − den × R(s))
  ÷ (2 · den · minRoomCm2))))` for a residential building (a tiny residential shell houses one household), and 0
  for a building S11 builds for a slot without `houses` (§10.2, §4.7; `BuildingSlot.unhoused`), which is non-residential
  — the slot's typing, like the template row, a fact of what the shell was built as, never of its occupants. `A(s)` is
  the exact integer twice-area (`area2`, §3.2 (6)) of the union of the extents of the building's base wings
  (`Building.wings`, with their `spans`) that reach storey `s` — a wing reaches the storeys volume 2's `storeyRange`
  gives: a solid wing none, a wing standing on another from the storey above the one it stands on, every other wing
  `[0, floors − 1]`; an `arcade` wing no ground storey — never a composition's wings, stored or
  derived, so neither a click nor a stored composition moves it (§6.2): at the ground the footprint face's `area2` where
  every ground wing reaches storey 0, else (a stepped building, V02 §3.15) the `area2` of the union of the extents that
  reach it (the passage room, circulation, excluded); above it the sum of the extents' `area2` where the building's
  pairing holds (rule 4: tiled wings, whose rings never overlap; a span ring lies outside every wing ring) and the
  kernel's boolean union on the arrangement (§3.7) where it fails, so overlapping wings count once. `R(s)` is 0 at the
  ground and, on every storey above it, the `area2` of a `ladder` stair bay and a landing (`PlanGeometryRow.stair.ladder`
  and `.landingCm`, V03 §2.4; shipped in the base's `roomProgram.json` at M2b), so the plan rung's
  no-abort fit ladder always houses a shell at capacity (V03 §3.9). `num/den` is the circulation share
  (`RoomProgramRow.circulation`, an integer fraction, §10.2) and `minRoomCm2` the minimum area of the `room` form's one
  room (its `RoomRuleRow.area[0]`, in cm²), both read from one row — the class's programme at the band set's first,
  poorest band (`FieldBands.bands[0]`) — so the capacity is a property of the shell alone and never moves with its
  occupants; basement storeys excluded. Every host computes the same integer. **The capacity bounds** (the one statement
  of the clamp): a residential building's `households` count lies in [1, capacity], a non-residential building's is 0.
  The generation fill (§4.7: S10b places the households on the plot; S11, which creates the building and its wings,
  writes each residential building's `Building.households` within these bounds), §4.11's `relet` and F-PLAN (§5.2) read
  this one function, so the solver and the plan never disagree on how many households a shell holds. The bound holds
  through every change: a committed change that lowers a building's capacity below its `households` count — S11's
  operator (§4.7), a rewrite of the plot's `builtBand` (J-A31.44's paths), a change of its wings' extents (the carry after
  a `warp` or a `moveVertex`, by the wing-carrying rule above, or a moved face of a passage it spans, which moves its span
  rings), a `setAttr` of its heights or its class, or a §7.6 edit of a table this function reads (the designation
  template's `households.max` or a structure's `houses` cell, the class's `liveIn`, the `circulation` share, the least
  `room`-form area in the class's programme row at the first band, `stair.ladder` or `stair.landingCm`, or the band set,
  whose first band names that row) — re-homes the households past the capacity, the last in address order passing over a
  locked or pinned one (§7.2), which keeps its building, by §4.7's overflow pass inside the causing event, each move a
  lifecycle event of it (`relocate`, §2.8); a hand edit lists the moves among its dry-run fates (§7.3 item 4) and takes
  the receiving buildings into its effective scope (§7.3 item 1), and its undo restores them (§7.4). No such change is
  refused for it, except a hand edit whose excess cannot be re-homed — its locked and pinned households alone above the
  new capacity, or — without a dossier — a household that no residential building of the district has room for (on a
  dossier-bound map every household fills the dossier's population and is re-housed by §4.7's re-provision) — which
  returns F-EDIT naming them, as a hand `relet` above the capacity does; S11's operator and an epoch's step leave a
  building whose locked or pinned households alone would exceed its new capacity unchanged, as a lock stops a rung-3
  re-cut (§4.11) and any locked entity is a fixed input (§7.2), and a household no building of the district can take in
  a generation run or an epoch is F-SITING's (§5.2, J-A28.46). The capacity is the owner's "the more rooms for more
  occupying families the richer a building gets", read on the building: a shell built richer has more rooms to let — its
  `households.max` rises with `builtBand` — while the households actually housed follow the occupants' band.
* **Never omit a household.** The count the plan must house is bounded by the capacity, which is computed with the
  smallest form, so the `room` form always fits: a unit falls to the next poorer form (`house → dwelling → lodging →
  apartment → room`) before any room is dropped, and no tier of F-PLAN omits a unit (§5.2, J-A28.51); a hand `relet`
  above the capacity is refused (F-EDIT).
* **The re-cut, both ways (J-A28.26).** A change of the occupants' band or of the household count re-cuts the plan as
  item 18's mutation applied to rooms. FIXED, each in the form the transient arena takes it (§3.4; J-A28.33): the shell
  — each storey's seed rings (the extents of the wings that reach it, clipped to tile as step 4 passes them; at the
  ground storey each span ring; below the ground `Basement.ring`), opened again unchanged as the arena's seeds; every
  entrance and its door and the hearths — anchors placed before any cut, each in its wing and on its side (step 3); and,
  passed as `fixed` rings, the stair core's bay, the chimney stacks, the passage room (the span ring, both seed and
  fixed), the composer's rooms (each less a bay or stack it holds, the stage-3 contract) and the rooms the
  least-disruption rule below keeps. RE-DERIVED: partition walls, corridors, doors, roles and units. LEAST DISRUPTION: a
  room whose seed ring — the one it lies in: its wing's extent at that storey clipped to tile as step 4 passes it, or
  `Basement.ring` — is unchanged and whose ring fits a role of the new programme (its area inside the role's [min, max],
  its storey rule met) keeps its ring and address even when its role or unit changes; a shell mutation by item 18 keeps
  nothing in a wing whose clipped seed changed — which re-cuts a wing's rooms too wherever a change to an overlapping
  wing, earlier or later in the clip order, alters that wing's clipped seed (the clip's crossing vertices included,
  §3.4). Re-uniting the households removes what the subdivision added — exactly for an unstored plan, whose canonical
  chain (below) returns the earlier plan; a stored plan's re-cut (below) keeps by least disruption the subdivided rooms
  that still fit a role, and its rings keep the `composition`-role vertices its re-cuts added (J-P48 (1)), which the
  shell's identity reads without; its undo restores it exactly (§7.4). **The canonical chain:** the plan for (band row r,
  count n) is derived from the **as-built plan** — the class's programme at the plot's `builtBand` row with the
  template's `households.built` clamped into [1, capacity], whatever that row's household range (the ranges bound `relet`
  and the chain's row steps only; J-A28.28) — by a fixed order of least-disruption steps, each a re-cut from the previous
  step as its `prior`: first the ROWS, one band at a time from the built row toward r along `FieldBands.bands`, the count
  at each step clamped into that row's household range; then the HOUSEHOLDS, one at a time from the clamped count to n.
  The result depends on (r, n) alone — never on when a click, an epoch or a `relet` reached it (§6.2, §6.5 (9); each
  step's draws keyed by its target, §6.1; the cache memoises steps, §2.9) — and a return to the as-built row and count is
  the as-built plan exactly. A STORED plan is instead re-cut inside the event that changes its inputs, around its edited
  and locked rooms, with the inverse recorded (§7.3, §7.4; J-A28.72); that re-cut establishes J-P48 (1) for its new walls
  in the same event — a same-level split that moves nothing — so the shell's identity across a re-cut is read on its
  rings with the `composition`-role vertices removed, as §7.3 item 7 (ii) reads them (§5.3, T28-14). Each step is one
  open, cut and read-back of the transient arena, counted by §12.7's plan row.
* **Staff and shared rooms (J-A28.27).** Staff rooms are dwarfed beside the owners' — their size a share of the owners'
  principal chamber's target (the row's column) — and sit where a house keeps its service: the attic, the basement or the
  service wing before a storey the owners' rooms occupy; a lodging house's shared kitchen or common room sits on the
  ground storey by the stair core, the circulation hub. Both are programme rows (`scope` `service` and `shared`), so a
  class or a culture may keep a common kitchen down to the poor row or drop it earlier.
* **Editable.** A room's unit (`setRoomUnit`), its role and walls (the plan events) and the household count by hand
  (`relet`, a `convert` on the building, §7.1) are events; the ladder's rows are §7.6 tables.
* **Bars:** §13.2's T28-13 – T28-18.
=== END ===

=== REPLACE ### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records ===
### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records

```ts
type BarrierKind = 'shore'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte';   // J-VI.3: the barrier vocabulary of a closure arc — `sheer` an island's rim (V05 §3.21), `enceinte` an earlier ring closing a later one (g item 106 (f)); V11's `walls.barriers` rows are defensibility classes keyed by these kinds
interface Enceinte { id: Id; kind: 'citadel'|'inner'|'outer'|'suburb'|'bailey'|'palisade'|'earthwork';
  trace: ChainRef /* ('wall', id): the L1 wall chain — a ring, an open chain, or, under a barrier closure, the open stretches that wall the approachable arcs */;
  closure: 'ring'|'shore'|'barrier' /* 'shore': an open chain whose enclosure is closed by the L0 shoreline; 'barrier' (g item 106 (a)): open stretches whose enclosure is closed by natural barrier edges — a shoreline, a cliff or escarpment, a gorge or ravine, deep marsh, an island's rim, an earlier ring — for every "enclosed" and "sealed" test */;
  anchors?: { end: number /* stretch k's ends are 2k and 2k + 1, in trace order */; on: 'shore'|'bank'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte'; vertex: VertexRef /* ('anchor', enceinte id, end) */ }[] /* typed end anchors of the open stretches, a tower at each (§4.8) */;
  arcs?: { from: number; to: number /* the two anchor ends it joins */; barrier: BarrierKind }[] /* g item 106 (a): the closing arcs of a 'shore' or 'barrier' closure, in trace order — written with the anchors by S5a's classification (§4.4) and re-evaluated by a shoreline change by item 22's least disruption; read by the enclosed and sealed tests, volume 1's seam typing (V01 §3.11 (7)), §11.1's `closure` LineStrings, V09's preview and the clerk */;
  waterfront: 'open'|'quay_wall'|'sea_wall' /* 'open': no wall along quays and beaches (MFCG's default; FTG's captured open chain); 'quay_wall': a wall along the waterfront, with sea gates; 'sea_wall': a full wall — open by default; `quay_wall` where the dossier's threats come by sea or on a sea-exposed port above a table size (§7.7 DR2; g item 106 (d)); `sea_wall` only by preset or request; the preset row overrides; where the water gates stand is §4.4 S5a's */;
  placement: 'aroundAll'|'aroundStage' /* aroundStage walls only a stage's new ring, anchored on the previous enceinte (FTG's "around stage lots") */;
  strips: { inner: FaceRef; outer: FaceRef } /* the two L1 wall-strip faces S7 cuts off beside the trace (§4.8): inside, band + inner setback (bounded by the setback line or the
                                                intervallum); outside, band + outer setback + glacis, or the berm up to a moat; S8 never cuts them and lanes end on them (§4.6) */;
  band: { inner: FaceRef; outer: FaceRef } /* L3 half-bands on each side of the L1 wall chain, built by bandUnion inside the strips by S10's step (0) (§4.7); nesting holds */; glacis?: { inner?: FaceRef; outer: FaceRef };
  thicknessCm: Cm; walkCm: Cm /* the wall-walk's width: written by S7 with the curtain's other values (§4.8); read by §11.1's glTF wall top */; heightCm: Cm /* the three are the full curtain's values; a graded stretch reads its class's row (stretchClass) */;
  stretchClass?: 'full'|'parapet' | ChainProfile<'full'|'parapet'> /* g item 106 (c): the stretch's defensibility grade — 'wall_class_knot' on the trace, step (§2.2 rule 5): the full curtain on open approaches, a lighter parapet on cliff tops, steep slopes and waterfronts; its thickness, height, walk and tower spacing are V11's `walls.barriers` row for the class, the enceinte's own values the 'full' row's; absent: 'full' throughout, today's uniform wall */;
  base: ChainProfile /* 'base_knot' on the trace: the wall's base elevation, one knot per trace vertex S7 places, linear between (§2.2 rule 5) */; setbackCm: { inner: Cm; outer: Cm } /* both faces unbuildable (below) */;
  intervallum?: Id /* the lane inside the wall when the era row asks for it */; material: string;
  supersededBy?: Id /* item 8: the shorter inner ring that replaced this one (§4.11's contractWall); the old ring's record stays live and its line persists as a trace */;
  pathway?: { since: number /* the week it was superseded or neglected */; cause: 'superseded'|'neglected'|'contracted'; fate: 'road'|'absorb'|'keep'; eligibleWeek: number; source: 'engine'|'edit' } /* a ring's road out of use — written by volume 6's fortification phase and by setAttr; the rules are V06 §2.7, V06 §3.7 */;
  underuseSince?: number /* the week the ring's intramural occupied-plot share first fell below V11's contract.occupiedShareMax; cleared when it rises above it; written by volume 6's fortification phase only (V06 §3.7.4) */;
  condition?: WallCondition | ChainProfile<WallCondition> /* the wall's condition by run — a stretch-state profile (§2.2 rule 5) on 'wall_state_knot'; absent: 'standing' throughout (below) */;
  conditionMaterial?: string | ChainProfile<string> /* g item 114 (b): each run's material — 'robust' (the wall's own `material`) or the key (`wallKind/id`) of the V11 `walls.patchMaterials` row it was closed with (V11 §3.25.3) — a stretch-state profile on 'wall_material_knot'; absent: 'robust' throughout (below) */;
  conditionEpoch?: number | ChainProfile<number> /* g item 114 (b): the epoch of each run's last change of condition or material (an EpochRecord's epoch; 0 the original town) — a stretch-state profile on 'wall_epoch_knot'; absent: 0 throughout (below) */;
  gates: Id[]; towers: Id[]; moat?: Id /* the wet moat WaterBody along the trace, named as `Castle.moat` is: carved at S3 for the innermost enceinte, by S5a's carve for an outer one (§4.2, §4.4); a dry ditch is residue, never this field (§4.7 S10 (0), §4.8) */; stage: number; lifecycle: Lifecycle }
type WallCondition = 'standing'|'worn'|'patched'|'breached'|'dismantled';   // g item 114 (b): the condition ladder of a run (below)
interface Gate { id: Id; enceinte: Id; junction: Id; way: Id | null /* null: a postern or water gate without an outward way */;
  kind: 'main'|'postern'|'water'|'gatehouse'|'castle'; heights: Heights; footprint: { inner: FaceRef; outer: FaceRef }; plaza?: FaceRef;
  banks?: [VertexRef, VertexRef] /* a water gate: ('gate_end', gate id, 0 | 1), its two bank vertices on the trace; the wall's edge between them lies across the water (§2.2 rule 7); held under a warp unless fromLevel = 0, as a Bridge's deck ends are (§3.6) */;
  mouth?: true /* g item 106 (e): a walled port's harbour-mouth chain — a `water` gate across the harbour entrance, its banks the two mole or breakwater heads (or the shores), a tower at each; S7 furniture (§4.8), drawn raised or lowered by the era row (§8.2) */; lifecycle: Lifecycle }
interface Tower { id: Id; enceinte: Id; vertex: VertexRef /* ('tower', id) */; radiusCm: Cm; heights: Heights; kind: 'round'|'square'|'bastion'|'octagonal'; footprint: { inner: FaceRef; outer: FaceRef }; lifecycle: Lifecycle }   // a wall tower; a composition's tower is §2.6's ComposedTower
interface Castle { id: Id; plot: Id; reservation: Id; curtain: Id /* its own Enceinte, kind 'bailey', closed by the same closure kinds (g item 106 (f)) */; cityWeld?: [VertexRef, VertexRef] /* ('weld', castle id, 0 | 1): ends of the shared wall stretch (one edge carrying both enceintes' 'wall' roles) when on the enceinte */;
  keep: Id; keepShape: 'rect'|'square'|'octagon'|'round'|'cruciform'; keepAt: 'opposite_gate'|'highest'|'centre'; innerWard?: FaceRef; gatehouse: Id /* one town-side gate, sited at S3 on the bailey side facing the plaza by least cost (§4.2 S3) */;
  paths: Id[] /* keep ↔ gate ↔ wall stairs, 'path' ways inside the bailey */; bailey: FaceRef; moat?: Id /* the castle moat WaterBody */;
  surround: 'none'|'esplanade'|'park'|'plaza'|'cliff' /* the surround row (§4.8): esplanade, park with a perimeter path, plaza, cliff skirt; a moat is the separate `moat` field */; siteScore: number; template: string; lifecycle: Lifecycle }
interface Bridge { id: Id; state: 'site' | 'built' /* site: two pinned bank vertices, no span, no way, no furniture, not drawn; built: a way's span laid through them */;
  way: Id | null /* the way whose L1 edge between the two deck ends is the span; null while a site */;
  deck: [VertexRef, VertexRef] /* ('deck_end', bridge id, 0 | 1): the pinned bank-to-bank deck, perpendicular to the local flow or channel; once built, its span carries the structural `deck` role (§2.2 rule 7); held under a warp unless fromLevel = 0 (§3.6) */;
  over: 'river'|'moat'|'castle_moat'|'canal'|'carve'|'added' /* who emitted the deck: S1, S3, S5a, a carve edit, or the one L0 shore-split batch of a deck no site offered on standing water (§4.2 S1 (5)); a deck F-ROUTE's extra-bridge rung sites inside S1's water operator or a carve takes the value of that operator's other decks */;
  spanCm: Cm; deckCm?: Cm; kind?: 'stone'|'timber'|'draw'|'ford'; piers?: number /* deckCm, kind and piers are set by S7 when the bridge is built (§4.8) */; lifecycle: Lifecycle }
interface RaisedWayRecord {   // g item 110 (b): on Way.raised (§2.4) — a way on a ground arena part ≥ 1 (§2.1), one record for every volume
  kind: RaisedKind; reason?: RaisedReasonKey /* generated ways only (below); the reason WORD readers and exports show is derived: viaduct → 'drop', elevated → 'link', aqueduct → 'water' (J-VI.2) */;
  underuseSince?: number /* written by volume 6's pass (V06 §3.19) */;
  feet: [RaisedFoot, RaisedFoot] /* the deck's two ends in spine order, where its ramps or stairs meet ground part 0 (below; §3.4) */;
  supports: { key: number /* minted once in order along the deck, never reused: a pier's identity with its way's lineage */; ring: Polygon /* its footprint on ground part 0, a point attribute (§2.2 rule 5) */; state?: 'ruined'|'cleared' /* V06's decline (V06 §3.19.2; the DeclineOp raised members, §4.11) */ }[];
  spans: { a: number; b: number /* the bounding piers' keys, a before b along the deck */; use: 'open'|'vault'; reason: 'way'|'water'|'flood'|'clear'|'tall'|'low'|'slope'|'country'|'chance'|'cap'|'land'|'user' /* the span rule's step (below) */;
    soffitCm: Cm /* derived: the deck's level at the span's crown less `raisedWays.structure.span.deckDepthCm` */; held?: true /* a user's setAttr on spans/<a>-<b>/use: an input override every regeneration keeps (§7.2) */; state?: 'ruined'|'cleared' }[];
  terminal?: { kind: 'basin'|'cistern'|'fountain' /* 'cistern' only under a conduit house the roster or dossier holds (J-VI.9) */; at: PointCm; building?: Id /* its conduit house */ } /* an aqueduct's */;
  feeds?: Id[] /* an aqueduct's: the public fountains it supplies */;
  waterUse?: Id /* an aqueduct's terminal use when a dossier-bound conduit house took it (V08 §2.6b (1) (e)): the use's closure leaves the aqueduct dry and disused, its ruin ruins the arches by least disruption, its infrastructure impairment applies the condition steps; removing the use never removes the aqueduct */;
  clearanceCm?: Cm /* held once a user edits it (V09); absent: derived (below) */; spanSpacingCm?: Cm /* held once edited; absent: drawn (below) */ }
type RaisedKind = 'viaduct'|'elevated'|'aqueduct';   // a raised way's kind and the reason vocabulary item 110 (f) records (drop, link, water need); declared here — V06 §2.13 and V11 §2.8c cite it
interface RaisedReasonKey { kind: RaisedKind; a: Id; b?: Id }   // a generated raised way's reason and its derivation unit (§4.3); declared here, V06 §2.13 cites it
  // viaduct: a = the carried way's lineage, b = the crossed ravine or valley feature (the terrain's lineage and the feature's ordinal in Terrain.features);
  // elevated: a, b = its two endpoints' lineages (a high ward's district, a terrace district, the citadel's or a great temple's reservation), in address order;
  // aqueduct: a = the settlement root, b = the source (a spring as S1 records it, or a river WaterBody's lineage).
  // Address: 'raisedReason:' + hash64(kind, a, b) (§6.3).
interface RaisedFoot {   // foot i of a raised way: one vertex in each of the two parts it joins, as an UndergroundLink's ends (§3.4)
  ground: { part: 0; at: VertexRef /* ('raised_foot', way id, i) on ground part 0: where the ramp or stair meets the ground */ };
  deck: { part: number /* the way's own part, its Identity.key.part */; at: VertexRef /* ('raised_foot', way id, i): the spine's end on that part */ } }
  // placed by the raised-way generator and by a declared or drawn way's operator, each end by a transaction on its own part; re-placed by the way's
  // re-derivation, one transaction per part (§3.4); read by the support step and the span rule (the deck runs between the feet), §4.6's ramp-or-stair
  // rule at each end, §3.4's resolve and §3.10's stored-reference and arena-isolation rows; persisted as the two parts' role rows; undone with the event
  // that placed them; a raised way carries them from its first commit (item 110 (b)), so no document holds one without them
interface RetainingWall {   // g item 110 (a): one record for every volume — never an Enceinte: no gate, no circuit, no barrier closure
  id: Id; chain: ChainRef /* on the arena whose terrain it levels — the ground's, or a sky island's (V05 §3.22 (4)) */;
  highSide: 'left'|'right' /* resolved at the dry run when drawn without it; generated: the side the district holds (§4.7 S10's district-edge source) */;
  closed: boolean /* a platform, high side inside */; material: string /* a V11 MaterialRow key: dry stone, earth bank, timber crib … */;
  buttresses?: …; towers?: … /* decorative, a V11 table row */; source: 'generated'|'declared';
  state?: RetainingState | ChainProfile<RetainingState> /* a stretch-state profile (§2.2 rule 5) on 'retaining_state_knot'; absent: 'standing' throughout */; lifecycle: Lifecycle }
type RetainingState = 'standing'|'decayed'|'ruined';
declare function stepProfile(wall: RetainingWall): { atCm: Cm; stepCm: Cm }[];   // a derived view, never stored (V01 §2.3): computed on read from the committed levels on each side — levelledGroundCm for ground (§4.7), a way's level where a way bounds it — read by §8's shadow, §11.1's exports and the VTT threshold, volume 4's buried floor, §2.6's walk-out and basementDoor(b)
type InstanceOverride = { seq: number /* the instance event */; at?: PointCm /* the current position of a move's `to` or an add's `point` */; recorded?: PointCm /* a line layout's recorded generated point */ };   // the uniform instance-override field: written when the instance event applies, moved only by a warp or vertex move (§7.4); model data, hashed with the entity; every kind that carries an `instances` mark has it (§2.8's registry)
interface Greenery { id: Id; kind: 'park'|'garden'|'formal_garden'|'orchard'|'green'|'commons'|'avenue'|'street_trees'|'churchyard'|'market_green'|'esplanade'|'grove'
    |'wood'|'coppice'|'meadow'|'hedgerow'|'shore_band'|'ambient'|'yard_planting';
  face?: FaceRef; line?: ChainRef /* ('green_line', id): hedgerows, a role on L3 field boundaries */;
  along?: { way?: Id /* absent only for the rim walk's row, whose trees run along the rim strip's inner setback line (V01 §3.10.3) */; strip: FaceRef /* one half-corridor strip on the planting district's own side, or the rim strip */; offsetCm: Cm } /* avenues and street trees: a row derived along the strip; no plat edge (§4.9) */;
  fedBy?: Id /* item 111: an oasis grove's spring-fed WaterBody (§2.3) */;
  owner?: Id | 'commons'; rule: string; density: number;
  species: { kind: string; inner: number; outer: number; leafType?: 'deciduous'|'evergreen' /* read by §8.2's season rows; deciduous when absent */ }[] /* shares per species kind (§4.9) */;
  layout?: 'fan'|'semi_fan'|'grid'|'free' /* parks and groves, §4.9 */; paths?: FaceRef /* L3 path faces of a park layout (§4.9) */;
  overrides?: InstanceOverride[]; lifecycle: Lifecycle }
  // tree instances are generated at render and never stored (§8.1, §8.10); overrides are `instance` events (§7.1) whose current positions `overrides` holds (§7.4)
interface LandUse { id: Id; kind: 'arable'|'strip_field'|'meadow'|'pasture'|'commons'|'orchard'|'vineyard'|'coppice'|'wildwood'|'quarry'|'claypit'|'mine'|'lumber'|'fishery'|'saltpan'|'marsh'|'reserve'|'garden' /* item 111: an oasis's irrigated garden */;
  face: FaceRef /* L3 faces — inside the hinterland's blocks: furlongs and woods (§4.9; the outside plots are Plot records) — and wherever a reclaim or a course shift leaves land, in the town too (§2.3) */; owner?: Id; furrowAxisCdeg?: number; crop?: string /* from the era / region crop table */; livestock?: string; rotation?: { scheme: string; slot: number };
  reclaimed?: { from: 'marsh'|'foreshore'; epoch: number } /* item 25: ground won from water by a reclaim conversion (§2.3, §4.11) — a trace the style sheet may draw */;
  source?: Id /* a `fallen_island` decoration whose rubble this `quarry` works (V05 §3.16): a surface rubble working that sources no underground quarry system, no mine–cavern breach and no dig-down draw (II.7.6) */;
  fedBy?: Id /* item 111: a garden's spring-fed WaterBody (§2.3) */; lifecycle: Lifecycle }
interface SiteResources { cellCm: Cm; ore: Float32Array; stone: Float32Array; timber: Float32Array; fish: Float32Array; clay: Float32Array; fertile: Float32Array;
  wellYield: Float32Array /* item 111 (b): the well yield, from the ground class by V11's water table — written by S1 (10) with the other rasters; read by S3's water pull (§4.2 S3 (6)), §4.5's water term, S10b's well and public-fountain classes (§4.7 *Water in dry country*) and the decoration rows' well or pump (§4.7); absent in an older document: computed from the site's terrain and ground class by S1 (10)'s rule when first read */ }   // S1 output on the terrain grid, 0..1 per cell (§4.2)
interface Decoration { id: Id; kind: string /* pond, copse, stone circle, ruin, wayside shrine, boundary stone, gallows hill, fallen_island (V05 §3.16), … data-defined */; face?: FaceRef; point?: Point /* moves with its host face under a warp or a vertex move (§7.4) */;
  trail?: FaceRef /* the L3 path face to the nearest way corridor (§4.9) */; keepClearCm: Cm; rule: string;
  members?: DecorationMember[] /* what a fallen island covers, drawn with the ruin program (V05 §3.16 (5)); volume 6's clearance writes it, volume 4's closures read it */; source?: Id /* the fallen island */; name?: NameRef; lifecycle: Lifecycle }
type DecorationMember = Id /* a plot, land use, reservation, way or retaining wall */ | { raised: Id; span: [number, number] /* the span between two support keys (RaisedWayRecord's a and b) */ } | { raised: Id; support: number /* a support key */ };
  // a raised member's keys are minted once and never reused, so a member names the same pier or span for its raised way's whole lineage — never volume 6's batch-local SpanRef; its geometry is resolved at read through the raised way's record: a span's deck band in plan, a support's ring
interface Pin { id: Id; kind: 'well'|'fountain'|'large_tree'|'cross'|'market_cross'|'shrine'|'pump'|'gallows'|'statue'|'monument'|'bandstand'|'campfire'|'fire_pit'|'stall'|'trough'|'lamp'|'notice' /* item 82: a notice post, a landmark a named-feature claim may name (§7.7) */|'stocks'|'maypole' /* (V07 §3.10) */;
    point: Point /* moves with its host face under a warp or a vertex move (§7.4) */; host: Id /* the yard, square, corridor or plot face */;
    light?: Id /* item 68: an emitting pin's LightSource (lamp, campfire, fire_pit; §4.7's Light sources) */; rule: string; lifecycle: Lifecycle }   // in the entity registry (§2.8) from M1; placed by §4.7 S11 / §4.9 rules and by stage 2 (II.3)
interface HoodPlace {   // a named local place (V01 §3.7.1) — declared with its registry row at M1, no producer before M5 (volume 1's creation and naming passes)
  id: Id; kind: 'square'|'green'|'yard'|'court'|'opening';
  subtype?: 'sinkhole'|'mouth'|'collapsed_shaft'|'ruin_entrance'|'catacomb' /* 'opening' only: a public opening's AccessPoint kind, or 'catacomb' for a catacomb entrance — selected by the host's record fields, never by its kind alone */;
  host: Id /* the Block (the square, green or yard block itself, or the block whose court residue it names — never a footprint's court, which is only its building's yard part); for 'opening', the AccessPoint */;
  courtOrdinal?: number /* 'court' only: the court's ordinal among the block's court residues (§4.7 S10 (6)) */; name?: NameRef /* absent between the creation pass and the naming pass of S13a; a catacomb opening reads its catacomb's name and holds none of its own */;
  knownTo: 'public'|'local'|'secret' /* default by V01's `hood.placeKnowledge`; an opening's is its AccessPoint's; a dossier fact or a setAttr otherwise */; lifecycle: Lifecycle }
// Labels are the model records LabelEntity and QuarterNode of §9.1
interface Institution { id: Id; kind: string; plots: Id[]; buildings: Id[]; faction?: Id /* the module's materialised Faction, when it exists (§10.1) */; roster: RosterRef; name: NameRef; reservation?: Id;
  knownTo?: 'public'|'local'|'secret' /* item 30: a dossier fact (§7.7) or an edit, defaulting from its plots' exposure; a local or secret institution prefers hidden plots (§4.7 S10b) and, underground, a cellar stair (II.7.3) */;
  concealment?: 'none'|'front'|'hidden'|'underground' /* item 63: the dossier's fact, or the mode its concealed use resolved (§4.7's Concealed institutions (1)); absent: none */;
  powers?: { power: string /* a PowerStanding key (§7.7 layer 2) */; weight: number }[] /* item 79: the powers it answers to, weights Σ = 1 (below) */; lifecycle: Lifecycle }
interface Use { id: Id /* the address: moves with the use when it relocates (§6.3); a building keeps its own */; cls: string /* the roster class it is (§10.2's BuildingClassRow.id) */;
  specialisation?: string /* the designation template's discrete row at the band (§4.7 S11, item 19), or a culture specialisation of V11 §3.24.3 drawn once at the use's first building (item 110 (c)) and held once set */;
  plot: Id; buildings: Id[] /* the building(s) it occupies — several for a compound or a joined plot */; assignment?: AssignmentRef; owner?: Id /* household | business | institution */; pinned: boolean /* item 17 (d): stays under an epoch, the town adapts around it (§7.7) */;
  branchOf?: Id /* g item 105 (h): a split site's shop — the works' Use it is a branch of: one institution, one dossier binding, two buildings; written by S10b's split placement (§4.7), which creates both as one item; a state, closure or removal of the institution reaches both (item 14's spread), relocation moves each by its own rows, undo restores both, a merge back onto one plot clears it; read by V02 §3.14.3 (the split.shop family), V03 §3.2 (the half's programme), the reader and the exports; absent: no split (migration) */;
  concealment?: 'none'|'front'|'hidden'|'underground' /* item 63: a concealed use's mode, resolved when it is first placed (§4.7's Concealed institutions (1)) and re-resolved only when a dossier event withdraws the dossier's mode (concealmentSource, next); absent: none, an open use */;
  concealmentSource?: 'assignment'|'class'|'edit' /* the map-side origin of a mode the dossier did not set — written with the mode by §4.7's placement rule (Concealed institutions (1)) and by setAttr(concealment) (`edit`); absent while the dossier sets it. A dossier event that sets the mode clears it (an `edit` it displaces is reported and orphaned, §7.7 item 5; J-A20.73); one that withdraws the dossier's mode re-resolves it from the map-side sources and re-places the use by §4.7's Concealed institutions (1), writing their source here (J-A63.22). Whether the mode is a dossier fact is factTier's (§2.8); a mode the dossier set is dossier-owned, so a map setAttr of it is refused (§7.7 items 7, 11; J-A20.77, J-A63.22). Read by §11.2's `why` on the use's `concealment`, under the caller's key */;
  front?: Id /* item 63: the front's Use — the working business whose building (Building.use) it hides in; absent for a bare hidden or underground use */; knownTo?: 'public'|'local'|'secret' /* item 63: a concealed use's own knowledge, 'secret' by default; absent on an open use, which the reader reads through its building and institution (§9.2) */;
  opened: { epoch: number; seq: number }; closed?: { epoch: number; seq: number };
  strain?: { kind: 'demand'|'supply'; sinceWeek: number /* the epoch week the condition began */ } /* file f item 429: the use step's memory (V06 §3.9.2) — set by §4.11's use step when the class's demand ratio falls below its closing share (`demand`) or a hard supply edge fails (`supply`), its kind updated and `sinceWeek` kept when the other condition takes over, cleared when neither holds, each write a setAttr inside the epoch (so its undo is the epoch's); a user's setAttr clears it ("give this shop time"); read by the use step's close rule (closeAfterYears or starveAfterYears of §10.2's UseRuleRow, V06 §3.9.3), the surplus order (V06 §3.9.4), volume 6's `use` explainer (V06 §4.5) and the CSV and GeoJSON exports (`plat:strain`); model data in the use's leaf digest; absent: no strain */;
  lifecycle: Lifecycle }   // item 17: a use is separate from the building that houses it — it opens, closes and relocates (§4.11's use step; §7.1's openUse / closeUse / relocateUse) while the building persists, vacant or re-let; Building.use points at it (§2.6)
interface MaterialLedger { rows: { epoch: number; material: string; m3: number; from: Id /* the robbed, cleared, dismantled or demolished entity */; to?: Id /* the build or repair it fed */ }[] }   // item 8 (d): one per document, changed only by §4.11's salvage events, so inside the model digest; its only effect on the map is to weight clearance toward nearby building (§4.11)
interface Household { id: Id /* the address: stable across re-derivation of its plot (§6.3); people are keyed by it */; plot: Id; building: Id /* its dwelling unit is the rooms of that building's plan carrying its id (Room.unit, §2.6; item 28 (f)); its interior is cut for the plot's field band, not for `wealth` (J-A28.24) */; members: number /* size; people derived lazily */; wealth: number; tableVersion: string /* person tables at creation */;
  transit?: { cause: DisplaceCause; since: number /* the week it was displaced */ } /* file f item 335: epoch-local — written by the batch of an epoch event that displaces the household (the ledger's `displace`, V06 §2.1), cleared by the `relocate` that places it (V06 §3.8.1), never present after the epoch's last batch, so never in a snapshot, a saved model or an export; read by the epoch's siting (V06 §3.8.1), the occupancy readers (§10.3) and §5.3's Works row */;
  lifecycle: Lifecycle }
type DisplaceCause = 'fire'|'flood'|'topple'|'contraction'|'works'|'island'|'void'|'clearance'|'redevelopment'|'destruction';   // why an epoch's op emptied a household's dwelling without housing it — 'destruction' the history replay's destruction epoch (V06 §3.20.5 (2)); declared here, V06 §2.1's ledger cites it
interface Person { id: Id; key: { household: Id; ordinal: number; bornEpoch: number; bornWeek?: number /* a successor's birth week — its predecessor's death week (§10.3; V06 §3.14), its bornEpoch then held as 0; absent on a founding member */ }; status: 'worker'|'unemployed'|'retired'|'student'|'dependent';
  role: string; workplace?: Id; carer?: Id /* dependent → the person whose schedule it follows */; derived: true; pinned?: Partial<PersonFields> /* only by an explicit edit — or, for a dossier-backed notable (item 88; below), pinned whole by the port */; lifecycle: Lifecycle }
type PersonFields = Omit<Person, 'id'|'key'|'derived'|'pinned'|'lifecycle'>;   // the person's pinnable fields
interface Faction { id: Id; kind: 'guild'|'religion'|'lordship'|'company'|'criminal'|'council'|'military'|'arcane' /* item 79: military and arcane for the dossier's power categories (the port's category-and-name rows, §7.7 layer 2) */; seats: Id[]; turf?: Id[];
  influence: number /* the module's reading of its power's standing (§10.3; the base's standings are §7.7's PowerStanding) */; secret: boolean /* a hidden power keeps its kind and sets it (below) */;
  goals: { id: string; method: string; progress: number }[]; roles: { name: string; criteria: string; count: number }[]; template: string; lifecycle: Lifecycle }
interface Government { kind: 'crown'|'seigneurial'|'ecclesiastical'|'chartered_commune'|'merchant_oligarchy'; seat: Id /* the institution */; offices: { name: string; seatClass: string; count: number }[] }
interface Religion { id: Id; name: NameRef; deities: { name: NameRef; domain: string }[]; practiceShare: number; clergyPerThousand: number; temples: Id[]; faction: Id; lifecycle: Lifecycle }
// The relation store (FTG-9; when it is materialised and persisted: §10.1, §10.3)
interface FamilyUnit { id: Id; kind: 'couple'|'parents_children'|'single_parent'|'extended'; members: Id[]; households: Id[]; lifecycle: Lifecycle }
interface Relation { id: Id; a: Id; b: Id; kind: 'partner'|'parent'|'sibling'|'carer'|'friend'|'rival'|'business'|'religious'|'affair'; since: number; lifecycle: Lifecycle }
interface Membership { id: Id; person: Id; faction: Id; role: string; since: number; lifecycle: Lifecycle }
interface Posting { id: Id; workplace: Id; profession: string; filledBy?: Id; lifecycle: Lifecycle }
```

```ts
// The staged layers' records (II.6, II.7): schema-complete and empty in the base (§2.1); each built by its volume
// — the sky island (volume 5, M6-sky): `SkyIsland`, `UndersideProfile` and `ShadeBasis` are declared in @plat/model as V05 §2.1 gives
//   them, and `SkyAccess` as V05 §2.2 gives it (the rules are V05's); the base reads of them: SkyIsland.key (a sky part, §2.1), `slot` (the count law's
//   1–3), `rim: ChainRef` ('rim', island id) and `land: FaceRef` — the island arena's own ring, no stored position (§2.2 rule 5) —, `anchor`
//   (the one world translation of the island's local frame), `elevationCm` read as groundRefCm + altitudeCm, `state` ('floating'|'waning'|'settled'|
//   'fallen'|'removed'; II.6's lifecycle over epochs, §4.11), `shadeBasis` (the island as the field's shade last read it, written only by a shade
//   evaluation, in the model digest; read on load, §2.9), `removed` and `removedAccesses` (the suppression's island form, §2.8),
//   `supply` (item 10's S_town and S_carried), `districts`, `allocation`, `reason`, `institution`, `terrain`, `terrainEcho` and `lifecycle`; and
//   SkyAccess.top ('sky_access', access id), `ground.at` (a point attribute carried with its host, §7.4), `state` and `knownTo`
// — the sewer network and the underground's other systems (volume 4, M6-U; items 11, 12, 65; II.7): each in its own arena part (§2.1, §2.2 rule 1)
interface Tunnel { id: Id; kind: 'drain'|'main'|'culvert'|'passage' /* a walkable side passage of the network — not item 30's surface passage face (§2.5) */; centreline: ChainRef /* ('tunnel', id) in part 0 */;
  widthCm: Cm /* the bore; the corridor half-width is widthCm ÷ 2 + the profile row's wall thickness (II.7.2, §3.7) */; headroomCm: Cm /* II.7.2's profile row */; navigable: boolean /* derived from widthCm and headroomCm against II.7.2's thresholds when the tunnel is made or edited, and stored: what may carry underground plots (item 12) */;
  invert: ChainProfile /* 'invert_knot' on the centreline, below ground (§2.2 rule 5) */; depthOffsetCm?: Cm /* a hand offset added to the derived invert at every knot; absent 0; setAttr only */;
  follows?: Id /* way */; outfall?: Outfall /* §2.3; re-seated when its shore moves (II.7.2) */; serves: Id[] /* the plots drained, sorted by address; a plot's buildings drain through it */;
  chambers?: FaceRef /* a view: the wedges of its end junctions whose Junction.chamber is set, never stored separately */; name?: NameRef /* a trunk's or a culvert's name (S13a); a setAttr protects it (§2.8) */;
  grilles?: Cm[] /* a view, never stored: the stations along the centreline where the run crosses a wall_strip, a quay wall or a sea wall (item 106) */; rule: string;
  closure?: 'collapsed'|'sealed' /* item 11: how a ruined tunnel closed (§4.11's tunnel ladder) */; lifecycle: Lifecycle /* its condition — in use, neglected, caved in, collapsed, sealed — is a reading of existence and closure through II.6's condition table (whose open column says whether plots may front it, II.7.3), never a second stored state; a setAttr on the condition is the matching convert (§7.1; J-A11.21) */ }
interface UndergroundSystem { id: Id; kind: 'sewer'|'catacomb'|'cavern'|'quarry'|'vaults'|'buried'|'dug'|'ruin' /* one system per kind (II.7.6); dug: the private passages an access edit makes (item 66); ruin: item 109 (b)'s ruins of an older civilisation */;
  variant?: 'fissure' /* a cavern of ordinary rock at hilly or mountainous relief (item 109 (a) (2)) */; name?: NameRef /* its label's text (V04 §5.4) */;
  part: number /* its arena part (Identity.key.part): 0 for the sewer, the next unused at creation for the others (§2.1 Arena parts) */;
  sources: Id[] /* what explains it (II.7.6): the cemetery, churchyard or religious institution a catacomb lies under, the stone stock a quarry fed, the blocks or districts a `raiseGrade` buried (its `region`) or, at generation, the growth-stage-1 districts a `fire` or `flood` scar buried (J-A88.42), the building whose access edit dug a passage (`addUndergroundAccess`, item 66), the building of a subterranean dossier institution whose passage the connection stage dug, or the undercity neighbourhood's District whose lifeline closure dug one (§7.3 item 9 (d)) */;
  depthM: [number, number] /* its row's depth range below the ground datum */; rule: string; lifecycle: Lifecycle }   // part 0's margin role is the underground pseudo-district's (§2.2 rule 1)
interface Gallery { id: Id; system: Id; centreline: ChainRef /* ('gallery', id) in its system's part */; widthCm: Cm; wallCm: Cm /* the kerb at widthCm ÷ 2 + wallCm (§3.7) */; headroomCm: Cm; elevationCm: Cm /* its floor */;
  water?: true /* below the local water table: it carries water (II.7.6) */; walkway?: true /* an undercity's street (II.7.5) */; closure?: 'collapsed'|'sealed'|'flooded' /* how it closed, read through II.6's condition table */; knownTo?: 'public'|'local'|'secret';
  reusedBy?: { system: Id; since: number } /* an element another system adopted (item 109 (d)) */; rule: string; lifecycle: Lifecycle }
type ChamberKind = 'ossuary'|'hall'|'breakdown'|'workings'|'cistern'|'streetVault'|'bridgeVault'|'archVault'|'square'|'storey'|'market'|'cellar'|'storage'|'temple'|'court'|'tomb'|'vault'|'room'|'gate';   // ossuary (catacomb); hall, breakdown (cavern); workings (quarry); cistern, streetVault, bridgeVault, archVault — the walled-in arch of a raised way's span, at grade (vaults); square, storey (buried); market (the undercity's carved main chamber); cellar, storage (dug); temple, court, tomb, vault, room, gate (ruin; hall and cistern also serve a ruin) — V04 §2.2
interface Chamber { id: Id; system: Id; kind: ChamberKind; outline: ChainRef /* ('chamber_wall', id): its closed L1 chain */; floor: FaceRef /* L1 */; elevationCm: Cm /* its floor */; ceilingCm: Cm /* clear height above the floor: caps what stands in it (II.7.5) */;
  closure?: 'collapsed'|'sealed'|'flooded'; knownTo?: 'public'|'local'|'secret'; reusedBy?: { system: Id; since: number };
  span?: { raised: Id; a: number; b: number } /* an arch vault's span — the raised way and its two bounding piers' keys (II.7.6's Vaults) */;
  monument?: { host: 'temple'|'hall'|'tomb'; lay: TierLay; standing: number; moundCm: Cm; count?: number } /* a ruin chamber's stepped monument (item 110 (c)), laid by volume 2's layTiers and decayed from the top (V04 §3.5.0a) */; rule: string; lifecycle: Lifecycle }
interface TierLay { wings: LaidWing[] /* ST7's order */; stairs: 'axial' | 'flights' | 'internal' | 'none' /* the form laid */; aspect: number /* the laid tier-0 aspect (a rect stack) */; truncated: number; entrance: { wing: number; side: number } | null /* ST7's hint, by index */ }   // a stepped stack as volume 2's layTiers lays it (V02 §3.15.1); a ruin chamber's monument holds one; declared here, V02 §2.6 cites it
interface LaidWing { ring: PointCm[]; kind: 'rect' | 'polygon'; role: 'tier' | 'shrine' | 'stair'; on: number | null /* index in the lay's order */; solid: boolean; floors: number; eaveCm: Cm; ridgeCm: Cm; roof: RoofSpec }   // one wing of a TierLay; declared here, V02 §2.6 cites it
interface UndergroundLink { id: Id; a: { part: number; element: Id; at: VertexRef /* ('link_end', link id, 0) */ }; b: { part: number; element: Id; at: VertexRef /* ('link_end', link id, 1) */ };
  kind: 'open'|'gated'|'secret'|'collapsed'|'flooded'; via: 'breach'|'stair'|'shaft'|'door'; knownTo: 'public'|'local'|'secret';
  cause: 'proximity'|'overlap'|'mineBreach'|'reuse'|'lifeline'|'edit'|'dig'|'dossier'|'crypt'|'legacy' /* why it exists — item 109's "breach" is via 'breach' and its "reuse" is cause 'reuse' */; rule: string; lifecycle: Lifecycle }   // item 65 (d): a connection between elements of two parts, never guaranteed and never a shared vertex (II.7.6; J-A65.31); the links to the surface are AccessPoints
// AccessPoint — a stair, ladder, hatch, door, shaft, well, cellar stair, grating or mouth linking the ground and an underground part by entity ids, with its state, knowledge and source (items 64–66) — is declared with its mechanism in II.7.4 and listed in §2.8's entity registry; its underground-side vertex carries the `access_point` role on its element's kerb or wall (§2.2 rule 7)
// Works and lights (items 67, 68)
interface Works { id: Id; kind: 'build'|'extend'|'demolish'|'repair'|'convert'|'decay'|'clear';
  target: { building?: Id; plots?: Id[] } /* the building it works on, or the plots a join or a split re-draws (§4.11's Works (7)) */;
  startWeek: number; durationWeeks: number /* integer working weeks: its WorksTable row's range drawn on `works` (§6.1) × the band's labour factor (§4.11) */; row: string /* the WorksTable row it reads */;
  cause: { seq: number /* the event that decided the change */; mutation?: number /* index into that event's mutations: the MutationRecord whose parts it shows, in order (§4.7 S11) */ };
  before?: { parts: { ring: Polygon; heights: Heights; roof: RoofSpec['kind'] }[] /* the parts the change subtracted, drawn through the demolition stages */; bounds: { line: PointCm[]; treatment: PlotBound['treatment'] }[] /* the boundary lines it removed, drawn until the clearing stage */ } /* world lattice points that are no vertex (§2.2 rule 5): carried with the target's plot face — the building's plot, or for a join or a split the target plot whose face holds the point — under a warp or a vertex move by §7.4's mean-value rule, never re-seated or orphaned (a drawn trace keeps no clearance); the undo record keeps the former rings and lines (J-A67.22) */;
  lifecycle: Lifecycle }   // item 67: a physical change with its timetable — model data in the model digest (§6.2); its stage at a week derived by §4.11, never stored; retired by the epoch after it has stood finished for works.retainWeeks
interface LightSource { id: Id; kind: string /* a light-rule row's kind: torch, lantern, lamp post, brazier, fire pit, campfire, magical orb, shrine lamp … data (§4.7's LightRule) */; source: 'fire'|'magic';
  point: Point /* moves with its host under a warp or a vertex move (§7.4) */; host: Id /* the building, way, square, gate, bridge, castle, pin, decoration (a wayside shrine), tunnel, gallery, chamber or access point it belongs to — for a hand-placed light, the entity `placeLight` names or finds under its point (§7.1); its arena is its Identity.key's */; entrance?: number /* a door light: its building's entrance ordinal */;
  heightCm: Cm /* above the host's surface */; intensityCd: number /* candela */; radiusCm: Cm /* the smooth cutoff of §8.4's falloff */; sizeCm: Cm /* the flame's or orb's own radius, which sets §8.4's penumbra — written at placement from its kind's light-table row (§4.7) */; colour: string /* sRGB: fire warm, magic cool — its row's, written at placement (§4.7), the colour the light pass lights with (§8.4 (c)); the vector rung's glyph and glow take §8.2's roles instead */;
  flicker?: true /* a fire light flickers — written at placement from its row (§4.7): §8.4 (f) animates it as a pure function of its render key and the view's time (§6.1; J-A68.61), never drawn or stored; absent: steady */; rule: string; lifecycle: Lifecycle }   // item 68: a point light placed by rule (§4.7's Light sources) or by hand (placeLight, §7.1); lit windows, the plan rung's room lights and light shafts are derived sources, never records (§8.4; J-A28.32); unlit while its host is abandoned, decayed or under Works before FINISHED — a reading, never a stored state
// The dossier's staged records (item 88; volume 8, the SettlementForge stage; §2.1): the port fills them (§7.7 item 8, §14)
interface ConditionOverlay { id: Id; key: string /* its binding key, cond:<id> (§7.7 item 12) */; archetype: string; severity: number /* 0–1 */; sinceWeek: number; untilWeek?: number; lifecycle: Lifecycle }   // a condition standing between epochs, no geometry: §8.2's thematic overlay, §4.11's Works share and the clerk read it
interface DepositSite { id: Id; key: string /* res:<key>, or res:uid:<localUid> for a custom resource */; family: string /* ore, stone, clay, salt … data */; state: 'available'|'depleted'|'removed'|'discovered'; bearingCdeg: Cdeg /* its bearing from the centre */; landUse?: Id /* the quarry, mine or claypit LandUse it anchors (§4.9) */; lifecycle: Lifecycle }   // a state change converts the land use it anchors (§4.11)
interface PowerRelation { id: Id; key: string /* its two powers' binding keys (§7.7 item 12) joined in address order — unordered, no key form of its own */; a: string; b: string /* PowerStanding keys (§7.7 layer 2) */;
  kind: string /* the neutral kind of tables/dossier/relations: ally, dependent, subordinate, rival, tense, corrupt, neutral */; sign: -1 | 0 | 1 /* attraction or repulsion for §4.5's typing */; hidden: boolean /* never named on a public view (DR20) */; strength: number /* 0–1, the row's strength × its trend factor */; lifecycle: Lifecycle }   // read by §4.5's typing as a soft adjacency row and by item 72 (a)(2)'s political component
interface CustomChainRecord { id: Id; key: string /* chain:<chainId> */; label: string; active: boolean; nodes: { role: 'resource'|'processor'|'output'; key?: string; name: string }[] /* flow order */;
  endpoints: { flow: 'import'|'export'; label: string; partner?: string }[]; volume: 'minor'|'moderate'|'major'|'backbone'; crossLinks: { from: string; to: string; via: 'requires'|'produces'|'requiredInstitution'|'requiredResources' }[]; lifecycle: Lifecycle }   // g item 104: filled only by `dossierRecord`; the fields' rules and readers are V08 §2.8's; retired when the dossier no longer lists the chain
interface CustomServiceRecord { id: Id; key: string /* svc:uid:<localUid> */; name: string; serviceCategory: string; provider?: string /* the provider institution's binding key */; lifecycle: Lifecycle }   // V08 §2.8
interface HistoryHint {   // Recipe.history (§2.9): the dossier's pre-creation history, written once by the port's creation (V08 §3.15); standalone, the blueprint's history option fills `peak` (§4.2 S0)
  ageYears: number /* the settlement's age at creation — never advanced by the host's weeks, whose clock is §4.11's */;
  scars: { type: string /* fire, flood, siege, plague … data */; yearsAgo: number; severity: number /* 0–1 */ }[] /* one per history event, by V08's `historyScars` row */;
  // item 113's fields (V08 §3.15 (2) reads them in)
  founding?: { yearsAgo: number } /* history.founding.age, else history.age; absent both: the midpoint of the tier's AGE_BY_TIER range by V08's `tiers` row, noted history_gap */;
  events: { key: string /* V08's `historyEvents` row's neutral key */; type: string /* the line's type word */; yearsAgo: number;
    severity: number /* V08's `historyScars` severity words: minor 0.3, major 0.6, catastrophic 0.9, else 0.5 */; name: string }[] /* every history event, oldest first (DR37) */;
  tiers: { from: string; to: string; direction: 'promotion'|'demotion'; yearsAgo?: number /* from the outcome id's week suffix */ }[] /* tierHistory, oldest first */;
  population: { yearsAgo: number; population: number }[] /* populationHistory, oldest first, each tick read as (week − tick) ÷ 52 years ago */;
  calamities: { yearsAgo: number; type: string; deaths: number; exodus: number; severity: 'minor'|'moderate'|'major'|'catastrophic' }[] /* calamityHistory before the creation week (DR36's losses; DR37's events) */;
  lifecycle?: { died: boolean; resettled: boolean; yearsAgo?: number /* the resettlement's tick, else the current settlement's founding */ } /* DR38 */;
  ancientFall?: { name: string; yearsAgo: number /* the founding's yearsAgo + its years before the founding */ } /* DR38's ancient "Fall of" event on the site */;
  peak?: { tier: string; population?: number; symbolic: boolean; evidence: string[] /* the evidence kinds present, strongest first */ } /* DR36's input (V08 §3.15 (3)) */ }
  // readers: S2's growth-stage count (`ageYears`, `scars`; §4.2 S2), II.7.6's catacomb age (`ageYears`) and, for a `fire` or `flood` scar, its buried old town (J-A88.42);
  // item 113's fields by §7.7's DR36–DR39, §4.11's history-first generation (V06 §3.20's replay) and II.7.6's buried former settlement. Declared here, V08 §3.15 (2) cites it;
  // a recipe written before item 113 reads its fields absent or empty, so no replay runs
interface HistoryRecord {   // g item 113 (a): the history replay's record — one per document, as the MaterialLedger is, written once at generation by the replay (V06; §4.11), model data in the digest; read by the clerk and the reader (the story, "the walls were built when this was a city of twelve thousand"), §7.7's history rows and the exports
  peak?: { rung: Rung; population: number; symbolic: boolean /* g item 113 (f): the effective peak, sized at its tier range's table cell and marked symbolic */; evidence: string[] /* the evidence fields used, strongest first (§7.7) */ };
  epochs: { epoch: number; fromYearsAgo: number; toYearsAgo: number; events: { type: string; yearsAgo: number; severity: number }[] /* the history events §7.7's event → epoch rows mapped to it */ }[] /* the coarse epochs the replay ran, oldest first */;
  refounded?: { yearsAgo: number; cause: string }[] /* g item 113 (b): destructions the new settlement was generated over */;
  buried?: Id[] /* g item 113 (c): the `buried` systems derived from the former settlement's own geometry (II.7.6) */ }
```

People are derived, and never materialised in the document unless an explicit edit pins them (§10.3); which people a
user has opened is per-user view state (§2.9), outside every digest. Content references geometry by id and never the
reverse, so the map can be regenerated without deleting content and content re-solved without moving the map.

**Both faces of a wall are unbuildable (MFP-9).** `setbackCm.inner` and `setbackCm.outer` are both unbuildable bands; the
invariant "footprints ∩ (band ⊕ setback) = ∅ on both faces" is hard (§5.3), and ribbon plots start beyond the outer
setback (§4.4). How S5a lays open traces, barrier closures, waterfronts and stage rings is §4.4's; how S7 cuts the wall
strips and builds bands, towers, gatehouses, the harbour-mouth chain and the castle is §4.8's; how bridges are sited,
built and kept as sites is §4.2 S1 (5)'s and §4.8's (COV-FTG-G09, COV-FTG-G10, FTG-8). The arc classification reads V11's
`walls.barriers` (`WallBarrierRow`) and `walls.waterfront` (`WaterfrontThreatRow`) rows (V11 §2.7, V11 §3.16).

**An enceinte's condition by run (file f item 575; g item 114).** `condition` is a stretch-state profile (§2.2 rule 5):
values `standing` (the wall whole, in its own robust material) · `worn` (weathered, its parapet broken; still a wall) ·
`patched` (a former gap closed in a cheaper material than the wall's own — timber hoarding, wattle or hurdles, an earth
bank or dry-stone infill in a masonry wall; odd stakes, hurdles or brush in a palisade) · `breached` (a gap with rubble) ·
`dismantled` (its stone taken; a gap for good), knot role `wall_state_knot`, default `standing`. Each run also records its
**material**, `conditionMaterial` (knot role `wall_material_knot`, default `robust`, the wall's own `material`; else the
`walls.patchMaterials` row it was closed with, V11 §3.25.3), and the **epoch of its last change**, `conditionEpoch` (knot
role `wall_epoch_knot`, default 0); the three are written over the same stretch in one batch. A `worn` or `patched` run is
wall and a `breached` or `dismantled` run a gap for every reader that draws or exports a run (the towers and gates drawn
with their run; a battle-map export, item 114 (f)), while the enclosed and sealed tests read the trace and its closure
whatever a run's condition (§4.4), so a breach opens no enclosure. *Writers:* `DeclineOp`'s `breach` (→ `breached`) and
`dismantle` (→ `dismantled`) over their `stretch`, the whole trace when they name none; `wearWall` (a `standing` run →
`worn`; §7.1, V06 §2.8); volume 5's landfall over the walls it covers (→ `breached`); `repairWall` with its material
(§7.1, V06 §2.8: a `breached` run → `standing` when robust or `patched` with a patch row; a `worn` or `patched` run →
`standing` robust, a patch row named there bent to robust at the dry run, item 101 R2, as V09 §4.21.4 offers only robust;
on a `dismantled` run it bends as V06 §2.8 states; with no stretch it lifts the ring's `neglect`) —
volume 6 issuing these over epochs by need and means (V06 §3.7.7); at generation with no history replay, S3 and S7 —
and VS3 for a village palisade (V07 §3.4 (8)) — by §7.7's DR41 (the item-114 row: the dossier's defence readiness and
the wealth, at V11 §3.25.3's shares; item 114 (d)), every run's epoch 0, and with the replay the replay's own epochs
(V06 §3.20). Every writer sets `conditionEpoch` to the epoch in force at its event over the stretch it changes; only
`repairWall` and the generation row set a material, the decay ops keeping the run's (a `breached` patch keeps its patch
row until a repair writes another: the patch gave way). The record's `lifecycle` stays the ops': `abandoned` on
`neglect`, until volume 6's no-stretch `repairWall` lifts it — back to the pre-neglect existence when every run is
`standing`, else `decayed`; `decayed` while any run is not `standing`; back to its former state when `repairWall` leaves
every run `standing` (V06 §2.8; J-V6.115). *Readers:* §8.2's state rows and legend (each value, a `patched` run in its
patch row's `look`; item 114 (e)); §11.1's wall LineStrings split per run of equal condition and material, each carrying
its enceinte's `id` and `run`, its ordinal from the trace's first vertex in vertex order, `condition` absent when
standing and `material` absent when robust; volume 6's transitions (V06 §3.7.7: patches rebuilt oldest first by
`conditionEpoch`, ties in chain order); volume 9's repair tool and legend; volume 10's story of each run; volume 12
merges the runs by the enceinte's `id` (V12 §2.2, T-V12-4). *Undo:* the writing op's undo record restores the three
profiles. *Migrate:* a document without them reads `standing`, `robust` and epoch 0 throughout.

**Raised ways (g item 110 (b); J-VI.2, J-VI.15, J-VI.21, J-VI.27).** A raised way is a `Way` whose deck
lives in its own ground arena part ≥ 1 (§2.1), so the ground's planar rule is untouched: it crosses the ways beneath
without a junction, its two ends ramps or stairs joined to ground vertices, and its piers footprints on ground part 0.
* **The support step**, run for every raised way — generated, declared or drawn — after its course and deck level are
  fixed and before the span rule, from ground part 0 only: (1) the deck's centre-line between its two feet (where its
  ramps or stairs meet part 0) has length L m; the pitch p is `spanSpacingCm` ÷ 100 where held, else one uniform on
  `raised.reason` (§6.1) keyed by (the way's lineage, `pitch`) inside the `raisedWays.structure.pierSpacingM` band of the
  way's material (drawn by the `material` row by band; an aqueduct never timber); (2) n = max(1, round(L ÷ p)) spans, the
  n − 1 interior stations evenly spaced at L ÷ n; (3) a station whose pier would meet an **obstacle** — a part-0 way's
  corridor (a bridge's, a pier's, a mole's or a quay's deck among them), a water face (a river's, a canal's, a moat's and
  an oasis's water among them), a square (a `square` block, §2.5) or a reservation, an enceinte's wall strip
  (`Enceinte.strips`), or an oasis's grove (a `grove` `Greenery` with `fedBy`) — slides along the deck to the nearest
  clear position at which both neighbouring spans stay ≤ `raisedWays.structure.slideMaxFactor` × the band's upper
  bound, else it is omitted and the merged span is `open` by the span rule's step (2), which opens a span over every such
  obstacle; a merged clear span longer than `raisedWays.structure.maxClearSpanM` for the way's material class (masonry or
  timber, as `pierSpacingM` is keyed; V11 §3.24.2) — a crossing too wide for one arch, as a broad river or a wide square
  is — drops a generated course (`raised_too_long`, which waits as `raised_too_tall` does, V06 §3.19 (5)) and makes a
  declared one's dry run bend it to the nearest course whose clear spans fit (item 101 R2), so a river is spanned within
  that bound and `viaduct.maxSpanM` both (§4.3); (4) each pier's `ring` is a rectangle centred on its station, across the deck of the deck's width
  and along it of max(`pierWidthShare` × the realised span, `pierMinCm` ÷ 100) m; a pier higher than `maxPierM[kind]`
  (the deck's level less `levelledGroundCm` at its station) drops a generated course (`raised_too_tall`) and makes a
  declared one's dry run bend it to the nearest course the pier heights admit (item 101 R2); (5) keys are minted in order
  along the deck and never reused: an unchanged course re-derives the same stations from the same stream key and so keeps
  its keys; a changed course keeps the key of every station within p ÷ 2 of a former one and mints the rest after the
  largest key the way has held.
* **The clearance.** Over each crossed part-0 way the deck stands at least `clearanceCm` + `span.deckDepthCm` above that
  way's levelled ground, `clearanceCm` the held value or, absent, V11's `raisedWays.structure.clearanceCm` for the crossed
  class (cart or foot); the course solver reads it as the deck's lower bound there (the cells bound the deck's level,
  never set it), and a held value below the crossed class's is bent up to it (`bend.raised.clearance`).
* **The span rule**, run eagerly at the end of the raised way's generation (after §4.6's cut) for every raised way —
  generated, declared or drawn, the user's operator running it on a new way — from ground part 0 only: (1) the under-deck
  strip is the deck's plan outline between the two piers' inner faces; (2) the span is `open` where the strip meets a
  part-0 way's corridor (`way`), a water face (`water`), a flood cell (`flood`) or another of the support step's
  obstacles — a square, a reservation, a wall strip, an oasis's grove (`clear`: ground that stays open) —, where `soffitCm` less
  `levelledGroundCm` at the span's axis midpoint exceeds `span.maxHeightCm` (`tall`) or falls below `span.minHeadroomCm`
  (`low`), where `levelledGroundCm` under the strip falls more than `span.maxFallCm` (`slope`), or where the strip lies
  wholly on hinterland land-use faces — field, meadow, common, pasture, wood — at every rung (`country`: country arcades
  stand open; J-C4, the realism tiebreaker); (3) otherwise one uniform on `raised.reason` (§6.1) keyed by (the
  way's lineage, `a`, `b`) decides it against `span.vaultShare[kind]` × V11's `era.raisedVaultM` × `culture.raisedVaultM`,
  capped at 1: `vault` (`land`) below it, else `open` (`chance`); (4) at most `span.vaultCap[rung]` spans are `vault` in the
  settlement, counted in the order the raised ways were founded (their creation event, then address) and along each deck,
  the rest `open` (`cap`); (5) a `setAttr` on a span's `use` is a held user edit (`user`). `span.supportFoundationCm` is
  each pier's depth below the levelled ground, which the underground's foundation rule reads (V04 §3.5.0). Every cell
  named here is V11 row 80's `raisedWays.structure` (V11 §2.8c, V11 §3.24.2). Each span the record marks `vault` holds one
  arch vault at grade (a `Chamber` of kind `archVault`, II.7.6's Vaults), built with the underground layer (M6-U).
* **Readers.** The piers are read by volume 1's crossings and under-deck strip, volume 4's arch vaults and foundations,
  volume 5's access siting, volume 6's decay and clearance, volume 7's obstacles, volume 9's **Deck height** and **Arch
  spacing** steppers and the exports (§11.1).
* **Source and lifecycle.** A raised way's **source** is derived at read, never stored: `declared` when the way's
  lifecycle cause is an edit or a skeleton file, else `generated` (V06 §3.19.1 (2)); there is no `carried` value — a
  reader that says "carried down from year N" reads the lifecycle and the epochs' rungs (V06 §4.5) — and no stored
  founding rung (the founding epoch's `EpochRecord` holds it). Generated ways re-derive with their reason key; declared
  ways are held; a removal of a generated way is a suppression (§2.8); undo is the log's; migration: absent `raised` is a
  ground way. The aqueduct's need test, delivery points (`terminal.at`, `feeds`) and the cistern rule's reading of them
  are §4.3's (the need test) and II.7.6's (the cistern rule, which reads the delivery points).

**Retaining walls (g item 110 (a)).** A line record on the arena whose terrain it levels, holding level
ground on its high side; its step profile is the derived view `stepProfile` (above), never stored, so a re-derivation of
the district on one side writes no record of the other (V01 §3.11 (7)). *Sources:* the generator raises one where a
block, a plot or a ward is levelled on ground steeper than `terrace.slopeMin` and the step exceeds `terrace.stepMinCm`
(S10 and S11's levelling, and S10's district-edge source along a terraced district's edge, §4.7); the author draws one
with T3 `wall` in its `retaining` kind or as the edge of a T2 `ground` terrace stroke (§7.1); on a sky island the
island's unit run generates it, T3 `retaining` or a T2 terrace stroke with the island's `key` draws it, never on the rim
strip. A way that crosses it becomes a stair or a ramp by its slope (a way-class rule, never a gap in the wall). *State*
is a stretch-state profile (§2.2 rule 5): values `standing` · `decayed` · `ruined`, knot role `retaining_state_knot`,
default `standing`; *writers* volume 6's retaining `DeclineOp` (`breach` → `decayed`, `dismantle` → `ruined`),
`repairRetaining` (a `decayed` run back to `standing`; V06 §2.8), volume 5's landfall (`decayed` over its covered length,
V05 §3.16 (4)), and volume 7's house-platform walls through volume 6's pool (V07 §3.12); a generated wall re-derived where
an epoch levels keeps its profile while it is not restored (V06 §3.19.4 (1), (6)), and the restoration writes `standing`
over the re-levelled length; *readers* the pool and the restoration rule (V06 §3.19.4), volume 4's footings (a footing
stands where the wall stands), the renderer (each run drawn by its state row, §8.2), §11.1's export (per run) and the
clerk. *Lifecycle:* generated walls re-derive with their terrain; drawn ones are held; a removal of a generated wall is a
suppression (§2.8); undo is the log's; a document without them has none; on a sky island the wall is tombstoned with the
island at a fall (V05 §3.16 (7)). Rendered as a wall line with its shadow on the low side (heights feed §8.4).

**Deck plots (g item 110 (d)).** A deck plot is a `Plot` whose `deck` names its host: `deck.host` a
`Bridge` for a bridge deck and a `pier` or `quay` way for a mole, pier or quay platform; `surfaceCm` null for a quay
platform built on the bank (ground); `landmark` for a mole's head or mid-mole slot or a bridge's mid-span slot. S11 copies
it to `BuildingInput.deck` (§2.6's `DeckContext`). A `Bridge` of kind `ford` or `draw`, or with no `deckCm`, offers no
deck plot, nor does a moat deck at a gate — a bridge `over` a `moat` or `castle_moat` whose way is a `Gate.way` (§4.7:
the gate's approach stays clear); a raised way's deck carries none. The landmark slots are a mole's head and midpoint and, on a bridge whose
deck span is at least V11's `deck.landmarks/bridgeMid/minSpanM`, one mid-span slot, offered to a tower or fort class only;
registry path `deck/landmarks/<head|mid>`. Budget and admission are V11's `deck` rows and `deckOk` column. A deck's
condition is its host's lifecycle existence: volume 6's `breach` makes the host `decayed`, `ruin` makes it `ruined` and
`repairRaised` restores its former existence from the op's undo record (V06 §3.19.5 (4); §4.11's `DeclineOp` deck member); `Bridge.state` (`site`|`built`)
is untouched, a ruined bridge's crossing closed by its way's existence. Removing or ruining the deck ruins what stands on
it by least disruption; rebuilding it re-offers the plots (item 110 (d)). A removal of a generated deck plot is a
suppression keyed by its deck host's id and its slot ordinal along the deck (§2.8).

**At the frame (the combinations of item 110's pieces with §3.2 (9)'s frame).** A raised way's course never leaves the
ground's frame plus margin: its part's arena is sized to that extent, as an underground part's is, and grows with it
(§3.2 (9)); an aqueduct whose source lies beyond the frame is laid up to the arena's outer ring, its deck ending there
without a ramp — the source recorded as a bearing, as a through road's is — and a declared course drawn beyond the frame
bends to the ring (item 101 R2). A retaining wall's chain meeting the outer ring ends on it, as any open chain does. A
deck slot whose face would cross the outer ring is not offered (left out and reported), and an epoch's frame growth
re-offers it. Tests: §13.2's T110-1 (a retaining wall ending on the outer ring), T110-2 (a raised part at the frame) and T110-5 (a
deck slot left out and re-offered).

**What the content records settle.** `Faction` gains goals, named roles with member criteria and a secret flag
(COV-FTG-B12), and the kinds `military` and `arcane` (item 79, below); `Government` is a blueprint circumstance whose
offices force seats (COV-FTG-B13, §10.2); `Religion` carries a generated pantheon, practice share and clergy rate
(COV-FTG-B14); `Person` carries a status and a carer (COV-FTG-C08); the relation store holds family units, relations,
memberships and postings (FTG-9, COV-FTG-C04). `SiteResources` makes raw-resource availability a site property
(COV-FTG-B09), `LandUse` carries crop and livestock (COV-NG-VS27), `Greenery.species` the species mix (COV-FTG-I11),
`Decoration` the hinterland decoration table's output (COV-FTG-I12), and `Pin` the complete furniture vocabulary: statue,
monument, bandstand, market cross, campfire, fire pit, stall (COV-FTG-J02, COV-NG-XB23, COV-NG-CR23, COV-MFCG-I01,
COV-FTG-J05, COV-FTG-E07), the notice post (item 82) and the village's stocks and maypole. The placement rules are in §4.7
S11 and §4.9; the point lights' are §4.7's *Light sources*, their lighting §8.4's (item 68).

**The powers an institution answers to (item 79; J-A79.21 – J-A79.23).** The base types the settlement's powers as
**standings**, never as entities: each power is a `PowerStanding` of §7.7's circumstance slice — its key, its kind, its
share of standing and the value the dials last applied — and `Faction` stays the module's materialised record (§10.1,
J-9). `Institution.powers` is the partition item 72 (d5) needs. Absent, the institution answers to its class's powers
(§10.2's `BuildingClassRow.powers` and `RosterTables.powerLinks`, item 72 (d″)(1)). Present, it is the dossier's override:
the port writes it from the powers' controlled-institution lists (`controlledInstitutions`, resolved by the key law of
§7.7 item 12) and moves it only at an epoch past the dials' hysteresis (§4.11), two powers that control one institution
sharing it by their relative standing (§4.5 (7)); the dossier's declared link lists would enter, were they ever present,
before that partition — controls at full weight, funds at 0.6, staffs at 0.5 and protects at 0.4. A `powers` the
dossier set is a dossier fact (§2.8's fact tiers); otherwise `setAttr` overrides it (§7.1). An `arcane` power is a dossier
fact, or, standalone, exists only under the `magic` circumstance (§7.7 layer 2; D-3); a hidden power keeps its kind and
sets `secret` — `PowerStanding.secret` in the base (§7.7 layer 2), `Faction.secret` when the module materialises it
(§10.1; J-A79.23).

**The staged layers (AM-2, DEF-7; items 10–15, 65).** `SkyIsland` and `Tunnel` give the owner-staged layers their data
model now: an island exists **only where prosperity supplies it** (items 10, 13, 15 — II.6's supply law, its two
reasons, its echoed terrain and its waning, settling and falling as its supply fails are II.6's and V05's) and has no
relation to the underground layer; a
tunnel records what it drains (`serves`), where it falls (its invert profile), where it discharges (`outfall`), whether
it is navigable and how it closed — the underground fades like the walls, caving in or being sealed, never demolished by
the engine (item 11); the underground neighbourhoods along navigable tunnels are ordinary blocks, plots and buildings in
part 0 (II.7.3; §2.2 rule 1), reached through `AccessPoint` records (II.7.4). The underground layer's other systems
(item 65) — `UndergroundSystem`, `Gallery`, `Chamber` and `UndergroundLink`, each in its system's arena part, and the
undercity's neighbourhoods as `undercity` districts (§2.5) — are the same kind of hook, a `dug` system included: the base
carries the access edit `addUndergroundAccess` and its closure rule (§7.3 item 9 (d)), whose underground pieces run once
the layer's stages exist (II.7.4; item 66). A void whose every open path to the surface closes is **lost** (g item 113
(e)): access counts only through open links; the state belongs to volume 4's access-state set (V04 §2.2) —
remembered as once known, drawn faded like an unexcavated void, until it is refound — and a lost void's dwellings empty by
the vacancy rules. Their rules are II.6's, II.7's and volumes 4 and 5's.

**The dossier's staged records (item 88; J-A88.21, J-A88.22).** `ConditionOverlay`, `DepositSite`, `PowerRelation`,
`CustomChainRecord`, `CustomServiceRecord` and `HistoryHint` (on the recipe, §2.9), with the dossier-backed `Person`,
give every optional input of the dossier a home now (§2.1's staged records): the port fills them at the
SettlementForge stage (§7.7 item 8), and their readers — §4.11's Works share and land-use conversions, §4.5's typing, item
72's political component, S2's stage count (§4.2 S2), II.7.6's catacomb age and buried old town, the supply web's chains
(g item 104) — read nothing until then. A dossier-backed `Person` is a notable the dossier names: pinned whole (never
derived away by a re-roll), carrying `Identity.dossier`, housed by rule in the district of its institution or its power's
seat, with a `Posting` at its named institution and a `Membership` in its named power; a successor re-binds to its record
through the receipt §7.7 item 12 names. The `HistoryRecord` is written by the history replay at generation (g item 113;
V06), its fields traced to §7.7's history rows; with no history replay it is absent.
=== END ===

=== REPLACE ### 2.8 Identity, lifecycle, provenance, the entity registry ===
### 2.8 Identity, lifecycle, provenance, the entity registry

Every entity record has five parts — and a kind with lazily derived rungs (a building, a stage-2 close-up) a sixth, its
elaboration record (below; item 28): an **identity** (what it is and where its random numbers come from — persisted, in
the model digest), a **lifecycle** (does it exist, and what has the user fixed about it — persisted, in the digest), its
**attributes and geometry references** (the model content of §2.2–§2.7; geometry is reached through the kernel's owner
and role tables, never through stored slots), a **derivation record** (the inputs of its derivation — persisted for the
kinds whose stage declares one, outside the model digest), and a **provenance** record (how it was last derived —
rebuilt by every derivation, never persisted, never in the model digest; LC-25). An entity that carries a generated name
also persists that name's **naming record** (the naming inputs of its last draw — outside the model digest). The
persisted derivation and naming records form the snapshot's **records digest** (§6.2), checked at every in-window load
and by the verification replay (§2.9 step 3).

```ts
// @plat/model
type Hash64 = [number, number]; type Hash128 = [number, number, number, number];   // u32 lanes
type LineageHash = Hash64;
type PointCm = LatticePoint; type Point = PointCm; type VecCm = PointCm;             // one point shape (§2.2), three names
type Polygon = PointCm[] /* one ring */; type PolygonCm = PointCm[][] /* outer ring, then holes */;
type M = number /* metres: a derived or reported length, never an arena coordinate */; type Cdeg = number /* i32 centidegrees */; type CmArray = Int32Array /* integer centimetres per element */;   // unit-branded types (§2.1)
type NameRef = string;          // a name's text: drawn by §10.4's engine (its NamingRecord below), claimed, dossier-given or edited (the fact tiers below)
type TextRef = string;          // a description line written by §10.4's engine, regenerated when its inputs change unless edited
type PlotUse = string;          // the roster class id of the plot's designation (§4.7's Designation.use), or 'vacant' for a vacant frontage run (§4.7 S10 (8))
type RosterRef = string;        // the key of the row of §10.2's RosterTables an institution was materialised from
type AssignmentRef = Id;        // the address of an Assignment (§7.7): the one form every record field that points at an assignment takes
type EditRef = { seq: number }; // the log event (§7.1) that caused a change
type RuleRef = { rule: string /* the rule's home: a stage (§4), §4.11's ladder row or conversion kind, a DR row (§7.7) */ };
interface Identity { id: Id /* address id, §6.3 */; kind: string; parent?: Id /* containment parent: a field, never parsed from the id */;
  key: PlatKey /* the arena: layer and part, §2.2 — one per entity: every entity's geometry lies in one part — save an `UndergroundLink`, whose two `link_end` vertices lie one in each part its ends name (§3.4), its address keyed on end `a`'s part, and a raised way, whose two feet each hold a `raised_foot` vertex on ground part 0 beside the one on its own part (`RaisedWayRecord.feet`, §2.7), its address keyed on its own part — and a record that joins parts names the other part's records by id (§3.4; J-A65.31) */; lineage: LineageHash /* stream identity, §6.3 */; reroll: number /* reroll count of this entity as a derivation unit, §6.1 */;
  dossier?: DossierRef /* item 20: the dossier element this entity exists for (below: Dossier refs) */ }
type FactTier = 'dossier'|'declared'|'map';   // who holds an attribute's value (Fact tiers, below)
declare function factTier(entity: Id, path: string): FactTier;   // pure, derived at read, never stored (Fact tiers, below)
type Existence = 'generated'|'built'|'altered'|'converted'|'abandoned'|'decayed'|'ruined'|'cleared'|'reused'|'demolished';   // cleared and reused: item 8's traces (the decline hooks, below; J-A8.46)
interface LifecycleFlags { locked: boolean; pinned: boolean; edited: boolean; assigned: boolean;
  lockedPaths?: string[] /* attribute-level locks (§7.2); absent = the whole entity */; editedPaths?: string[] /* attributes the user set; each is implicitly pinned (§7.2) */ }
interface Lifecycle { existence: Existence; flags: LifecycleFlags; since: { epoch: number; seq: number } /* the event that last changed `existence` */ }
interface LifecycleEvent { id: Id; seq: number /* the causing EditEvent's seq; 0 for the generation run */; epoch: number;
  kind: Existence | 'lock'|'unlock'|'pin'|'unpin'|'edit'|'assign'|'unassign'|'reparent'|'carry'|'supersede'|'resurrect'
    | 'open'|'close'|'relocate' /* item 17: a Use opened, closed or relocated — and a Household moved to another building (§10.3's relocation: §4.7's overflow pass, §2.6's capacity bounds, a re-letting); detail.from / to name the buildings */ | 'mutate' /* item 18: a designation mutation; detail.mutation names its record */
    | 'reject'|'lapse'|'place' /* item 20: a placement rejection, its lapse, a positive placement (§7.7) */ | 'relet' /* item 31 rung 1: the household count changed (§4.11); the plan rung goes stale */;
  cause: EditRef | RuleRef | 'generation' | `convert:${string}` /* a conversion's cause names its ConversionOp or EvolveOp kind (§4.11) — convert:siltReach, convert:retypeLand …; an EditRef reaches its event's dossierChange (§7.1, §7.7 item 13; item 75), so a lifecycle entry and the disruption report say why */;
  detail?: { from?: Id; to?: Id; lineageFrom?: LineageHash; lineageTo?: LineageHash; path?: string; mutation?: number /* index into the causing event's mutations (EditBase.mutations, §7.1): the MutationRecord of §4.7 S11 */;
    works?: { startWeek: number; durationWeeks: number } /* item 67: the timetable of the Works that carried this change, kept here when the Works record retires (§4.11) */;
    why?: { row: string; family: string; share: number; good?: string; other?: Id }[] /* ≤ 5 — the rows that pulled a use's opening, relocation or closing, a circuit's conditions, or a raised way's reason, its values and its gate; written by the evolution engine (V06 §3.9.7, V06 §3.7.1, V06 §3.19) and by the base's raised-way generator at creation; model data in the identity layer, read by the explanation providers */;
    suppress?: { kind: 'raised'|'harbourChain'|'quayWall'|'retaining'|'deckPlot'; key: string; reason?: RaisedReasonKey; enceinte?: Id; water?: Id; chain?: string; host?: Id; slot?: number } /* the suppression (below) */ } }
interface Tombstone { id: Id; kind: string; lineage: LineageHash; supersededBy?: Id; seq: number; last: Uint8Array /* the compressed last record: orphan reports, resurrection (§6.3) */ }
interface DerivationRecord {            // the one definition: persisted with plots, blocks and buildings (the kinds whose stage declares it); outside the model digest, inside the records digest (§6.2)
  ctx: Hash64 /* digest of the context vector read */; fields?: { prosperity?: number; density?: number; greenery?: number }; band?: string /* the band the derivation read (below: three band memories) */;
  allocationRow?: number /* the Allocation row the entity filled (§4.5 S7b) */; epoch: number /* the epoch of the derivation that wrote it */;
  params: Hash64 /* digest of the effective parameters read */; slices: SliceRef[] /* the table slices consulted */;
  placements?: PlacementOrder[] /* S10b, for each use placed on this plot — the event whose run placed it, its index in that run's order and its pass (V10 §2.13); read only by the solver's explanation */ }
type PlacementOrder = { use: Id; seq: number /* the event whose S10b run placed it; 0 at generation */; k: number /* its index in that run's order: claims first, then item 105 (f)'s anchors first */; pass: 1 | 2 /* 2: moved by item 105 (f)'s relaxation pass */ };
interface NamingRecord {                // persisted with every generated name S13a draws; outside the model digest, inside the records digest (§6.2) and hashed with provenance; handed to a successor with the name (§6.3); dormant while the name is protected (below)
  slices: SliceRef[] /* the naming slices the last draw consulted: the grammar rows and weight vectors of the effective naming table, and, for every culture or ancestry row that chose a grammar or a corpus for it (§10.4), one slice per field of that row the draw read — kind 'row', key '<rowKey>/<field>', hashed over the field's value and, for a corpus field, the named corpus's content hash (§7.6) */;
  salt: number /* the naming salt the last draw used: the town salt, or the per-entity salt of the ids-scoped rerollLayer that drew it (§6.3) */; epoch: number }
interface Provenance {                  // derived: rebuilt by every derivation and by replay; stored as columns; never persisted, never in the model digest
  run: StageRunRef;                     // index into the stage-run table { stage, outputVersion, tablePins } — interned once per stage run, not copied per entity
  attempt: number;                      // the failure ladder's attempt that committed it (§5.1)
  rules: SliceRef[];                    // every table slice the derivation consulted (§7.4, §7.6)
  deps: Handle[];                       // u32 handles of the entities it read (the locality audit, §7.3)
  symbolic?: true }                     // g item 113 (f): laid by the history replay under a symbolic peak (§2.7's HistoryRecord.peak) — the clerk says its exact size is not recorded
interface SliceRef { table: TableId; version: string; kind: 'row'|'weights'|'bracket'|'thresholds'|'match'; key: string /* a row key; '<rowKey>/<field>' for a slice that is one field of a row (§7.6) */; hash: Hash64 }
```

* **Dossier refs (item 20).** `Identity.dossier` names the dossier element an entity exists for (§7.1's `DossierRef`,
  set by the host door, §11.4): its `element` the binding key of §7.7 item 12 (item 74), its `version` the SettlementForge
  line the port read; persisted identity in the model digest. It is carried by the entity the element is — its `Use`
  (§2.7), a dossier institution's `Institution`, and for an element that is neither (a named feature: a bridge, a well, a
  gate, a way, a quay, a pin — set by a named-feature claim, §7.7 item 16, item 82) the feature the assignment placed —
  and moved with it on every re-placement; a building or a plot, which only houses a use, never carries it, a
  building-granularity assignment's placed member included (a rejectSite relocates the use, item 17; J-A20.22). An
  `Assignment` keeps its binding in its own `Assignment.dossier` (§7.7), while a `District` carries none — its dossier
  name and identity are reached through the assignment that targets it (J-A20.24). Such an entity is never removed by a
  map edit, only rejected from a site (§7.7). The binding rows themselves are document data (`Document.dossier`, §2.9),
  never an entity.
* **Fact tiers — the dossier's, the author's, the map's (item 20 (h) (i), item 101 (a); J-A20.23).** Every attribute of
  every record is held by one of three tiers, and `factTier(entity, path)` says which — **derived at read, never stored**,
  from the entity's dossier ref, the registry's dossier paths, `Document.dossier.carried` and the lifecycle flags:
  `dossier` when three things hold — the entity carries a dossier ref (`Identity.dossier`; on an `Assignment` its own
  `Assignment.dossier`; on a `District`, for its `name` and `identity`, the ref of the dossier-backed `neighbourhood`
  assignment that targets it, a district-defining institution's or a naming claim matched to it, §7.7 item 16), the path
  belongs to its kind's **dossier paths** (below), and the dossier supplies a value for it (the carried facts under that
  ref's binding key hold that field, §7.7 item 12); `declared` when an author's declaration set it — the path is among
  `flags.editedPaths`, or it is the existence or the position that a declaring event, which made, placed or shaped the
  entity, pinned (§7.2's *declared means held*, whose other attributes re-derive; item 101's R13); `map` otherwise —
  whatever the map's rules derive. A dossier fact is immutable on the map and changes only by a dossier event; a declared
  value holds against generation and every re-roll until its author changes it; a `map` value is the map's to regenerate
  (§7.7 items 9–11). §7's edit rules refuse an edit of a `dossier` path as `dossier-owned` (§7.1), and §9.2's reader,
  §11's exports (`plat:tier`) and the tool API through which any clerk reads (§11.2) show each value's tier. The tier is
  not provenance: `Provenance` says how a value was last derived and is never persisted; the tier says who holds it, and
  follows from what is persisted. A document with no dossier has no `dossier` tier: a user's roster, the dossier's
  stand-in, is declared (item 101's `roster`).
* **One existence state plus orthogonal flags** (LC-26). A pin followed by an assignment leaves the entity both pinned
  and assigned; no code tests a single state value. `existence` moves through: `generated` (made by the pipeline);
  `built` (created by a user or an epoch: `build`, `drawFootprint`, drawn features); `altered` (a structural edit or a
  transformation changed it: split, join, densify, a re-cut by F-REDERIVE); `converted` (retyped: wall → ring road,
  gate → junction); `abandoned`, `decayed`, `ruined`, `cleared` and `reused` (decline and its traces — the hooks below);
  `demolished` (removed; the record becomes a tombstone).
* **The decline and regrowth hooks** (owner's decline instruction; item 8; COV-NG-XA36, COV-VG-VN-090 —
  STAGED-BY-OWNER). One existence state serves every kind, and §4.11's ladders map their plain names onto it per kind
  (J-A8.46, J-A8.21): *buildings* occupied → vacant (`abandoned`) → derelict (`decayed`, roofless: `RoofSpec.kind
  'none'`) → ruin (`ruined`) → robbed or cleared (`cleared`: a footprint trace — the face persists, the heights are
  zeroed in the record and its material is credited to the `MaterialLedger`, §2.7) → reused (`reused`: the trace keeps
  its face and is worked as a garden, orchard or field — `Building.reusedAs`, §2.6, drawn as that kind, §8.2 — or a
  successor is raised on the old foundations, `Building.predecessor`, §2.6; J-A8.22); *walls and gates* in use →
  neglected (`abandoned`) → breached or partly dismantled (`decayed`; by run, `Enceinte.condition`, §2.7, whose `worn`
  and `patched` runs — item 114 — wear and mend a ring in use or neglected alike) →
  superseded by a shorter inner ring (`Enceinte.supersededBy`, §2.7 — a link, not a state); *tunnels* in use → silted
  (`abandoned`) → caved in (`decayed`) → collapsed or sealed (`ruined` with `Tunnel.closure`, §2.7; item 11 — their
  condition reading and its `open` column are II.6's); *ways on ground part 0 of the land classes* (`through`,
  `primary`, `secondary`, `lane`, `alley`, `cul_de_sac`, `track`, `path`) at a village rung: in use → disused
  (`abandoned`: a **hollow way**, retired from the network — no router, tracker or merge test reads it; its disuse epoch
  the lifecycle's `since.epoch`) → effaced (`decayed`), reopened to `built` by regrowth first (V07 §3.12) — by
  `DeclineOp`'s `retireWay`, `effaceWay` and `reopenWay` (§4.11), the decline step's street candidate striking at the
  `street` layer's persistence rate (§4.11's decline table) per year (§4.11 *The clock* (5)); retirement is not volume
  6's `downgradeWay`, whose
  primaries never downgrade at any rung; the crossing and water classes (`bridge`, `pier`, `quay`, a mole) and every
  raised part never become hollow ways — a bridge, pier, mole or quay deck is struck to `decayed` or `ruined` by volume
  6's deck candidate, a raised way declines by stretch with its supports persisting (§2.7) — a `ford` retires with its
  carried way and is never a hollow way, and a deck's plots fall with it; *retaining walls* by stretch
  (`RetainingWall.state`, §2.7); *islands* `SkyIsland.state` (§2.7). Which conversion (`ConversionOp`, §4.11) moves which
  state is a data table, its inverse the undo record's (§7.4); every state exists in the base schema and can be applied by
  hand (§7.1); a cleared or reused building is a **live record** at its address until `demolish` or a successor takes it
  (J-A8.42), never a tombstone; a ruined building keeps its footprint and heights and draws with the ruin program (§8.2).
  `Building.condition` (§2.6: kept, worn, neglected — item 31's wear) is not an existence state but an attribute of an
  occupied building; a sealed passage's plots (item 30) enter the ladder as vacant (§4.11). The underground layer's
  galleries and chambers (item 65) flood, collapse or are sealed (`closure`, §2.7) through II.6's condition table, as
  tunnels do. The stages a `decay` or `repair` Works draws (item 67) are this ladder's drawn stages, no new existence
  value (§4.11's *Works*; J-A8.46 stands). A dossier-listed ruin (item 80) is its assignment's `state: 'ruined'` (§7.7)
  over a building whose existence is `ruined` — no field of its own on the `Use` or the `Building`. A light (item 68)
  follows its host: removed with a demolished host, unlit — a reading, never a state — on an abandoned or decayed one. When
  and where the evolution program applies the ladders is §4.11's; the closure and decline states of the several kinds
  stay separate ladders (they differ in scope, values, transitions and writers), the stretch-state profiles alone
  being one mechanism (§2.2 rule 5).
* **Suppression (J-VI.14).** One suppression rule for re-adding generators,
  in two record forms. (1) `LifecycleEvent.detail.suppress`, written by the `delete` operator when it removes an entity
  whose lifecycle cause is a generation or epoch rule of a re-adding generator: a raised way (keyed by its
  `RaisedReasonKey`, §2.7), a harbour-mouth chain or a quay wall (item 106), a retaining wall (keyed by its chain's
  lineage address) or a deck plot (keyed by its deck host's id and its slot ordinal along the deck). Every such generator
  derives the suppressed set from the log's live removals, skips the key and counts it as filled against its caps; the
  re-derivation of walls where an epoch levels and the deck-face tier skip a suppressed key and count it as held
  (V06 §2.13, V06 §3.19.3 – V06 §3.19.5). The `delete`'s dry run names the suppression in plain words (V09's
  `info.remove.holds`, and `info.remove.holds.deck` for a deck plot; §7.1). (2) Islands and sky accesses keep volume 5's record form and are never written to
  `detail.suppress`: `SkyIsland.removed` and `.removedAccesses`, written by `convert removeIsland` and by the fold of an
  access's `delete`, read through `removedSlots(doc)` (V05 §2.1, V05 §3.15 (5)) — an island's removal holds a count-law slot
  counted as filled and keeps an archived arena part and its households for undo (J-V5.62), which a key on a delete event
  cannot hold. **One lift rule for both forms:** only the removal's undo, or the user's own re-add serving the same key; a
  cap increase opens only new keys. Beside it (§7.7 item 3), generated content no dossier record binds is deleted as any
  generated content, and the deletion holds through regeneration, every absorb and every epoch.
* **The elaboration record — a sixth part, per lazy rung, outside both digests** (item 28 (c); J-A28.22 with J-A28.62).
  A building carries one record per lazily derived rung — `wings`, `rooms`, `plan` — and, at stage 2, a district one for
  its close-up (`closeup`, II.4):

  ```ts
  interface ElaborationRecord { entity: Id /* the building, or for closeup the district */; rung: 'closeup'|'wings'|'rooms'|'plan'; state: 'absent'|'current'|'stale'|'edited';
    inputs: Hash64 /* the digest of the rung's recorded inputs, per rung. The plan rung's — and every rung's of a building before stage 3 registers —: its leaf digest (wings, heights, entrances, basement, class, use, assignment, sub-locations, declared rooms, the wings' spans), the leaf digest of each spanned Passage (its face's ring, which the span rings are cut from, §2.6), the occupants' band (Plot.fieldBand) and value (the value at §7.2's τ), the accesses it hosts, each with its kind, state and knowledge, the outside ground — the digest of the RetainingWalls within cellar.insetCm + door.mainCm of the footprint, of the surface samples V03 §3.6 W2 reads outside each exterior wall (the values levelledGroundCm returned there, and its deck, water and roof samples) and, for a building below ground, of its host chamber's ring and grade faces (V03 §3.12 (9)) —, its running Works' stage at the drawn week (item 67 (j)) and the households housed in address order (item 28 (f)), and the slices below. Under stage 3 the wings rung's: exactly volume 2's wingsInputs (V02 §3.11) and its slices; the rooms rung's: wingsInputs, the occupants' band and value, the household count, the class programme's hall row and its slices */;
    slices: SliceRef[] /* the table slices the rung consulted — programme, pattern, furniture and interior-ladder rows, and for the wings and rooms rungs the composition.json rows (V02); §7.6 invalidates by slice */; epoch: number; since: { epoch: number; seq: number } }   // no reroll here: a rung's reroll count is what the log's regenerate events with rung give it (§6.1, §7.1)
  ```

  `absent`: never derived, or evicted — nothing is lost, a rung is a pure function; `current`: the cached result's input
  digest equals the digest of the inputs now; `stale`: an input **of that rung** changed — for the plan rung (and every
  rung before stage 3) a designation, an assignment, the band, the storeys, the wing rings or a spanned passage's face,
  the households, a concealed use, an access it hosts, its crypt, a retaining wall, the terrain or a levelled platform's
  datum, a deck or the host chamber beside it, its Works' stage, a slice, a dossier event of items 18, 22 or 31; for the
  wings and rooms rungs only what their lists name — marked by the batch that changed it, with no derivation run (a
  retaining wall drawn beside a house stales its plan, never its `wings` or `rooms` rung); `edited`: a stored composition
  with plan events in the log. The state is recomputed from `inputs` against the current digest at load and after every
  batch that touches the entity. The record and the cached result live in the document's non-canonical blocks (§2.9) —
  outside the model digest and outside the records digest — because a click logs nothing and writes nothing a replay must
  reproduce (§6.2, §6.5 (9)); what a click derives enters a digest only when an edit stores it (§2.6).
* **History lives outside the entity** (SCL-20). The document keeps one **lifecycle event block** keyed by id and
  ordered by `seq` — each entry's `seq` is the causing event's (0 for the generation run); an entity holds only its
  `Lifecycle`. The block is not append-only (J-DET-33): an `undo` removes the entries whose `seq` is its target's, and a
  `redo` re-inserts them in `seq` order (the re-applied target's events cite the target's `seq`, §7.4); neither writes an
  entry of its own. So the block is always the block of the log with its undone pairs left out — the identity the
  unshared-document truncation relies on (§7.4, §6.5 (9)). Demolished and superseded entities move to the **archive** as
  tombstones: out of the working set, the spatial indexes and the display list; their ids and `supersededBy` links stay
  in the identity subtree of the model digest (§6.2) so an id is never minted twice (§6.3); a tombstone carries its
  causing event's `seq`, so an `undo` returns its target's tombstones to live and a `redo` archives them again. *Growth
  budget:* the working set grows only with live entities; the document grows by at most the bytes of new or changed
  records plus 64 B per lifecycle event (its M4 epoch test: §13.2). *Pre-decided fallback:* the archive and the lifecycle
  event block are held compressed in memory and decompressed only for an orphan report, a resurrection or an export —
  output-neutral.
* **Derivation records** (LC-12). A plot, block or building persists the inputs of its derivation — context and
  parameter digests, field samples, band, the table slices consulted, and a plot its placement order — so "Regenerate
  (keep settings)" reproduces it from what it was made from, across saves, epochs and field edits elsewhere (§7.3 item 5).
  The record is excluded from the model digest (it is hashed with provenance and in the records digest; the placement
  order's bytes entered it once, a declared one-time shift of the records digest's goldens at the milestone that landed
  them, the model digest unmoved, and an older document without them answers `asNow` with `exact: false`, V10 §2.14).
  Every derivation that changes the entity's leaf digest (§6.2) rewrites it; a re-derivation that reproduces the leaf
  digest exactly keeps the old record, as the dependency-graph route, which never touches it, does — so the record never
  depends on which route re-derived the entity (§7.3 items 6–7). **Three band memories, kept apart** (items 31, 28 (f)):
  `DerivationRecord.band` is the band the last derivation read — in the records digest, rewritten by every derivation that
  changes the leaf; `Plot.builtBand` is the band the stock was built for and `Plot.fieldBand` the band the plot's
  occupants live at — both in the model digest, their writers stated at §2.5's fields; a document written before these
  attributes existed gets `builtBand` and `fieldBand` from `DerivationRecord.band` and `builtProsperity` from the recorded
  sample (§7.5). A plot's record may also cite the designation-template and compatibility slices item 18's mutator read
  (`slices`).
* **Naming records.** Every time S13a draws a generated name it writes the name's `NamingRecord`: the naming slices the
  draw consulted and the salt it used. The record travels with the name when the address passes to a successor (§6.3),
  is rewritten by every draw, and is what §6.3's draw case (4) and §7.6's invalidation by slice compare with the current
  effective slices to find the names whose naming inputs changed. It is persisted, like a derivation record and unlike
  provenance, so a rebased document — whose provenance no replay can rebuild — still knows which names drew from a
  changed grammar row or corpus (J-DET-41). It is stored as offsets into the deduplicated slice-reference pool (below):
  ≈ 4–8 slices per name, ≈ 20–40 B raw per name, ≈ 0.1 MB raw for the ≈ 3 500 names of a CITY before compression,
  counted in §2.9's per-building document budget. **A protected name keeps its record dormant** (J-DET-46): while the
  name is protected — a `setAttr` on it, a lock on its path (a whole-entity lock included) or an assignment that sets it
  (§7.7) — its record stays in place, and no draw case reads, compares or rewrites it; it still travels with the address
  to a successor. The event that ends the protection returns the name to unedited with the record of its last draw and
  runs §6.3's case (4) for it, the event's undo record keeping the former name and record. An entity whose name was never
  drawn has no record and nothing to re-draw.
* **Provenance is compact and outside the digest** (LC-25, SCL-5). Version stamps live once in the stage-run table, not
  in each entity; `rules` are offsets into a deduplicated slice-reference pool; `deps` are u32 handles into a pool; all of
  it is stored as struct-of-arrays columns per kind (target ≤ 64 B per entity at CITY, measured at M1 with the
  entity-memory test of §12; *pre-decided fallback:* `deps` are recorded per derivation unit — per block, per plot —
  instead of per entity, which makes the audit coarser, never unsound). Provenance, derivation records and naming records
  share the provenance digest, used only by the locality audit (§2.9 *Canonical form and digests*; §6.2).
* **Rules cite slices, not rows** (LC-21). A derivation records every table slice it consulted, by the slice's hash: the
  whole weight vector for a weighted draw or a deck, both bracketing rows for an interpolated rule, the threshold set for
  a band lookup, the row for a direct lookup — for a naming draw, one slice per culture or ancestry field it read (§7.6) —
  and the table's match predicate set for a rule that selects rows by predicate. §7.6 invalidates on slice-hash change.
* **The entity registry** (`@plat/model`) declares per entity type: generator stage and **lineage unit** (§6.3);
  **anchor encoding, hysteresis radius and class family** (§6.3); **digest encoding** (§6.2); **invariant scopes**
  (§5.3); renderer symbols per LOD; export mapping per format; persistence encoding (§2.9), the naming record included
  for a named kind; pick behaviour; **edit kinds with their undo path and lifecycle row** (§7.1, §7.4), and per editable
  attribute path a display `label` (a message-catalogue key) and a `help` anchor in `@plat/docs`, read by the reference
  UI's generated context panel (V09 §4.4) and the guide; **its explainer** — the `WhyProvider` that
  answers §11.2's `why` for the kind (V10 §2.13, V10 §3.9), the base's kinds by the defaults of V10 §3.9 and each staged
  layer's by its own registration; each readable path marked `purpose: boolean` — true where the value names or implies
  the entity's purpose (its class, use, function, sector, powers, a crypt or catacomb path) — and the knowledge filter
  keeps only `purpose: false` paths for a withheld entity; a registry of **section providers** (`WhySectionProvider`, V10
  §2.13), whose rows the facade appends to every `why` after the kind's provider, in registration order, and filters
  generically; a **generic provider** answering any registered kind without a specific one (its readable paths, its
  latest lifecycle event and derivation record, its history); an address whose prefix is `room:`
  resolves to the kind `room`, whose provider (V03 §4.6) resolves it through its building's plan — stored, cached or
  derived into the cache as the `plan` query does — so plan parts need no registry entry (§6.2);
  migration hooks (§7.5); **dossier paths** (below; item 20 (h)); and **closure generators** per edit kind — the pieces an
  edit's missing prerequisites need, in dependency order (§7.3 item 9; item 66). Its completeness test — a CI test that
  fails when a type is missing from any of those paths, the label, help and explainer included, and checks a specific
  provider or section provider only for the kinds and sections V10 §3.9's owed table lists, naming the owing volume — is
  §13.2's (O11 a; §7.1, owner amendment 5). **The registered kinds** beyond the records of §2.2–§2.7: `Use` (lineage unit
  the creating event or the epoch's use step, anchor the plot's address and role), `Passage` (§2.5), `MaterialLedger`
  (§2.7, one per document), `HistoryRecord` (§2.7, one per document; written by the history replay, no edit kind; absent
  without a history), `Rejection` (declared with its mechanism in §7.7: model data in the digest, keyed by element
  and site, with its lapse and its migration hook), `AccessPoint` (II.7.4), the underground plots' and buildings' fields
  (II.7.3), the plan's `Room` with its `unit` (anchored by its centroid within its wing), a building's `Entrance` and
  `Basement` sub-records and its base wings' `spans`, a site-plan slot's `unhoused`, the plot's `builtBand`,
  `builtProsperity` and `fieldBand` with their migration hook (§7.5), the tunnel's `navigable`, `headroomCm` and
  `closure`, and the elaboration record's cache path (§2.9); `Works` (lineage unit its target's lineage with its start
  week, §6.3; its `works` draws keyed as §6.1 states; edit kinds `startWorks`, `cancelWorks` and `setAttr` on its start
  and duration; retired by an epoch), `LightSource` (anchor its host's address, rule row and ordinal; `placeLight`,
  `setAttr`, `delete`, `lock`), `UndergroundSystem`, `Gallery`, `Chamber` and `UndergroundLink` (keyed in their
  system's part; `drawTunnel` with a system, `drawChamber`, `addLink`, `setAttr`, `delete`, the closure conversions;
  their part counter §2.1's), the staged `ConditionOverlay`, `DepositSite`, `PowerRelation`, `CustomChainRecord` and
  `CustomServiceRecord` (anchor their binding key; dossier facts with no map edit kind; absent = empty); `SkyIsland`
  with the fields of V05 §2.1, their edit kinds (V05 §4.2) and migration hook (V05 §2.6), and `SkyAccess` (lineage unit
  its island, anchor its island's address, role and ordinal; `placeSkyAccess`, `setAttr`, `delete`, `lock`); `HoodPlace` (V01; from M1, no producer before M5); `RetainingWall`, a way's `raised` record with its supports and
  spans, and a plot's `deck` (§2.7; item 110's edit kinds, §7.1; §7.4's rows); `MutationPlan` (lineage unit its plot,
  anchor the plot's address; `setAttr` of a step's `dueWeek`, `delete`), `Enceinte.pathway` (`setAttr`),
  `Enceinte.underuseSince` (engine only), `Way.formerClass` (the engine and the `fallIsland` convert; never a hand
  `setAttr` target — a `setAttr` of `class` clears it), `Use.strain` (`setAttr`), `Household.transit` (engine only and epoch-local, never persisted; §2.7),
  `Enceinte.conditionMaterial` and `conditionEpoch` (written with `condition` by its writers, no edit kind of their own;
  §2.7), a raised way's `feet` (placed with the way; §2.7), `Plot.platformCm` and `Block.platformCm` (derived by the
  levelling; §2.5), `Terrain.mining` (derived by S1; §2.3) and `BuildingShadeMask` (one per arena —
  the ground's and each live island's — engine only); `VillagePlan` (stage VS1, lineage unit the town
  root), `VillageEnd` (VS8, its anchor's lineage and kind) and `VillageField` (the hinterland unit, its seed furlong),
  registered by `@plat/village` and absent from a base-only build (V07 §2.6, V07 §4.4, V07 §5.4); and on
  existing kinds `Use.concealment`, `front` and `knownTo` and `Institution.concealment` and `powers` (`setAttr`,
  dossier-owned where the dossier set them), `Use.concealmentSource` (written with `concealment`; no edit kind of its
  own), `Use.branchOf` (S10b's split; a merge edit clears it), `Building.concealed` and `works` (derived links),
  `Room.concealed` and `Entrance.concealed` (each written by its own deriver: the plan rung, `deriveEntrances`),
  `Basement.kind` `crawl`, `Plot.tenure` (derived, `setAttr` an override; a plot without it derives it at first load,
  §7.5), `District.identity` (`setAttr` an override), `pressure` and `nameHistory` (written by epochs and renames only),
  `character` and `bandRange` (derived, no edit kind), `parent` and `core` (written by the undercity's stage) and
  `outskirts` (written by the connection stage), `Pin.light` and the `notice` pin, `RegionGroup` (§9.1: made by `group`,
  renamed by `setAttr`, removed by `delete`), `LabelEntity.displayText` (§9.1: `setAttr`, cleared by `revert`; the map's
  display over a name, never a dossier path), `Faction.kind`'s `military` and `arcane`, `Terrain.geology` (S1's; `setAttr`
  an override, §7.1's terrain row), `WaterBody.spring` and the oasis's `fedBy` links (T2 `ground`'s spring flag; item
  111), and the `AccessPoint`'s `state`, `knownTo` and `source` (II.7.4; `setAttr` on the first two); the authoring
  toolkit's sugar events (item 101: `placeGate`, `quarter`, `roster`, `group`, §7.1) are listed with the kinds their
  expansions make, so the completeness test reaches them. Every new attribute has its edit kind or is declared derived
  (§7.1), and each enters §13.2's path-completeness test.
* **Dossier paths (item 20 (h); J-A20.23).** The registry names, per kind, the attribute paths a dossier may own — each
  with the carried field that supplies it — and no other path is ever `dossier`: an `Institution`'s `name`, `kind`,
  `knownTo`, `concealment` and `powers` (the powers' controlled-institution lists, item 79); a dossier element's `Use` —
  its `cls` (from the element's kind by the port's class rows, §7.7 item 12), `concealment`, `front` and `knownTo`; an
  `Assignment`'s `state`, `name`, `knownTo`, `concealment` and `front` (§7.7; items 30, 63, 80); a `District`'s `name`
  from a matched naming claim (item 82) and its `identity` from a district-defining institution or a claim's kind (item
  72), each under the ref of the assignment that targets the district; a named feature's `name` — a bridge, a well, a
  gate, a way, a quay, a pin (item 82); every attribute the port writes on the staged `ConditionOverlay`, `DepositSite`, `PowerRelation`,
  `CustomChainRecord`, `CustomServiceRecord` and dossier-backed `Person` (item 88; g item 104). The settlement's own facts — its name, tier word and population
  — and the typed circumstance slices are carried in `Document.dossier` and `Recipe.circumstances` and read there (§7.7),
  on no entity; the other dossier inputs the model holds are `Way.to`'s trade-partner key (item 77), `Recipe.seed` (item
  85) and `Recipe.history` (item 88); a plot's or a building's `knownTo` and an oasis a dossier's `oasis_water` makes (item 111) are written by the
  port's derivations (§7.7), map-tier values on entities that carry no dossier ref. **Every SettlementForge field reaches
  the model through the port** (V08, §7.7): each
  is consumed by a named mechanism — through these paths, `Document.dossier` or `Recipe` — or is on §7.7 item 1's
  never-read list (item 86); none reaches a record by another route.
=== END ===

=== REPLACE ### 2.9 The document and serialisation ===
### 2.9 The document and serialisation

A document is **a base plus an ordered log**: the base is either the canonical recipe (the town replays from its seed)
or, after a rebase, a materialised state; the log is every event since the document was created, in `seq` order.
Everything else in the file is the canonical style state, input recorded for replay (setting-pack content, host
outputs), a verified cache, or per-user state.

```ts
interface Document {
  docId: Uuid;                  // minted at creation by @plat/api (outside the model packages), or given by the host to `generate` (§11.2); kept on save; re-minted on clone and save-as (§6.3)
  schemaVersion: string;        // the file format (§7.5)
  outputVersion: string;        // the model packages whose output this document replays under (§6.4)
  base: Base;
  log: EditEvent[];             // the single source of truth for every edit, lock, assignment, table edit, epoch, rebase, upgrade, undo and redo (§7.1, §7.4); a rebase never removes events
  nextSeq: number;              // the seq the next event takes; never decreases — also when an unshared document truncates an undone pair (§7.4)
  nextUndergroundPart: number;  // item 65: the part the next underground system takes (1 at creation, part 0 being the sewer's)
  nextSkyPart: number;          // the part the next sky island takes (1 at creation)
  nextGroundPart: number;       // g item 110 (b): the part the next raised way's deck takes (1 at creation, part 0 being the ground)
                                // the three part counters (§2.1 Arena parts: allocated once, never reused) never decrease, as nextSeq — an undone, truncated, fallen or removed arena's number stays spent;
                                // the record stores it (UndergroundSystem.part, SkyIsland.key, the raised way's Identity.key), as does its address, so an event that creates an
                                // arena after generation carries the number in the address it records — a closure's ClosureRecord.created (§7.3 item 9), a raiseGrade
                                // conversion's buried system (II.7.6), an island's creation — and a replay reads it there, never recomputes it; the arenas made at generation
                                // take theirs in their stages' order (II.7.6, V05, §4.3)
  packs: PackData[];            // the content of every non-shipped pack of the pack set (the pack-set rule below) — canonical, outside the model digest
  hostContent: HostContent[];   // outputs of host-registered providers, keyed for replay (§6.5, §11.4) — canonical, outside the model digest
  dossier?: { binding: DossierBinding; carried: CarriedFacts };   // the dossier block (below) — canonical, outside the model digest; absent without a dossier
  style: StyleState;            // sheet id@version (a non-shipped sheet's content included), style row operations, ground-cover regions (§8.2) — canonical, outside the model digest
  model?: Snapshot;             // the materialised model at the log head: a cache checked against its own model and records digests and verified by replay (load step 3); always written on save
  view?: ViewState;             // per-user and shared view keys (below), the stored authoring `session` included — never in a digest
  derived?: { report: GenerationReport; stats: StatisticsRecord; epochs: EpochRecord[]; locks: Id[]; orphans: OrphanRecord[];
              features: Features /* II.7.4: the resolved feature set (sewers by tier; underground while any system exists, items 65–66) — recomputed on load with the report; every dependant reads it from the model, never from a layer's visibility (item 14) */;
              tradeFlow?: TradeFlow /* item 77: the settlement's derived trade flow (§4.3) — recomputed at creation, at each epoch and on load */;
              elaborations: ElaborationRecord[] /* §2.8: one per entity and lazy rung, derived from the cache below against the current digests (item 28) */ };   // caches rebuilt from base + log; never canonical
  undo?: UndoRecord[];          // the session's undo records carried across a reload (their cap: §7.4), with the truncated targets its redo stack holds; never canonical
  elaborations?: ElaborationChunk[];   // the elaboration cache (below), kept across zoom-outs and sessions so that "once generated it is saved" holds without storing derived rungs in the model (item 28); never canonical
}
type StatisticsRecord = Record<string, number>;   // the named statistics `stats(doc)` computes (§13.2's bench statistics; D-32), derived, never canonical
type OrphanRecord = { seq: number /* the log event left without a target */; target: Id; reason: string };   // the orphan table's row (§7.3 item 4: an edit fate `orphaned`), derived from the log, never canonical
type Base =
  | { kind: 'recipe'; recipe: Recipe }                                                     // replay = G(outputVersion, recipe), then fold the log
  | { kind: 'rebased'; recipe: Recipe; state: Snapshot; seq: number; reason: RebaseReason }; // replay starts from `state` — checked against its root of record (load step 3) — and folds the events after `seq` (= the rebase event's `at`, §7.1); a `rebase` event is a no-op in the fold of a client whose base it already is (a bridged client that holds another base installs it, load step 4); the town is not seed-reproducible before `seq`
type Seed = number;             // a u32, 0 … 2³² − 1: records write it as its decimal string (§13.3), permalinks in base 36 (§6.4); the D-5 panel seeds are H32 values (§13.6 (2))
interface Recipe {              // the canonical recipe: every model-affecting input and nothing else (§6.2; LC-15)
  seed: Seed /* for a dossier-bound document the port's one-way derivation from the dossier's own seed (§14; item 85) — never the host's seed itself */;
  rung: Rung /* §1.1's type, widened by the village rows: the replay runs the stage set of the product that registered the rung; a reader without that product refuses to replay, naming it (§7.5) */; tablePins: Record<TableId, string>;
  product?: 'town'|'hood' /* absent reads 'town'; 'hood' a standalone neighbourhood document (V01 §3.10.1) */; hood?: HoodRecipe /* present exactly when product is 'hood' (below; its rules V01 §3.10.1) */;
  packs: { id: string /* a selected user corpus: 'user:<content hash, base 32>' */; version: string; hash: Hash128 /* of the pack's canonical JSON */; shipped: boolean /* in the shipped set of the output version that wrote the entry — informative only: a load resolves each pack by hash (below), the link rule reads the link's output version (§6.4), and an upgrade to a version that stops shipping it copies its content into `packs` (§7.5 (2)); always false for a user corpus */ }[];   // setting packs and selected user corpora (§7.6, §10.4)
  params: ParamDelta;           // the full effective delta over the pinned shipped defaults — pack, preset, user-global and document overrides folded in at creation (§7.6)
  presetId?: string;            // provenance only: the delta already holds the preset's values, so an edited preset elsewhere cannot change this town; read by the generation report's recipe line (§5.4) and the reader's recipe panel (V09), which name the preset the town was made from
  intent: Intent /* §7.7 layer 1's outcome targets */; districtIntent: DistrictIntent[] /* §7.7 layer 2: the per-district intent — a town-wide default and each district's override; the input a district is generated from, never item 72's derived CharacterVector (J-A72.21, J-A72.41) */;
  history?: HistoryHint;        // item 88, g item 113: the pre-creation history (§2.7) — the dossier port's at creation (V08 §3.15) or the blueprint's history option (§4.2 S0) — a recipe input; absent without either
  circumstances?: CircumstanceTimeline;   // schedules epoch events (the app proposes them); never applied except through `epoch` events (§7.1)
  entryMode: 'contentFirst'|'layoutFirst';  // S10b's entry point (§4.7) — a recipe field, not session state (LC-30)
  salts: Record<RerollableConcern, number> }   // initial salts of the rerollable concerns only (normally 0), keyed by §6.1's registry-generated type; the schema refuses any other key, so a geometry concern can never carry a salt; rerollLayer events in the log advance them (§6.1)
interface HoodRecipe {   // Recipe.hood (item 272): a standalone neighbourhood document's recipe — declared here, V01 §2.6 cites it; its rules are V01 §3.10.1's
  outline: { template: OutlineTemplateId } | { polygon: PolygonCm /* a drawn outline: simple, ≥ 3 vertices, snapped as §7.1 draws */ } | 'auto' /* by the fabric (V01 §3.10.1 step 1) */;
  size?: 'small'|'medium'|'large' /* the chips: `buildings` ≈ 85, 700, 1 050 (NG's bands) */; areaHa?: number /* absent: from `buildings`, else the kind row's band */;
  buildings?: number /* a building-count target, wins over areaHa (V01 §3.10.1) */;
  kind?: DistrictKind /* absent: drawn from `hood.kinds` */; fabric: FabricStrategyId | 'auto';
  leafy?: boolean /* greenery 0.9 and court greening × 1.5 (NG's `leafy`) */; secular?: boolean /* no landmark anchors, manorBlockShare 0 (NG's `secular`) */;
  contextRung: 'TOWN'|'CITY'|'METROPOLIS' /* whose rung-scaled rows the hood reads; default 'CITY' */;
  intent: DistrictIntent /* wealth, density, planned, greenery …; absent fields derived */;
  edges?: { water?: { bearingCdeg: Cdeg; body: 'river'|'sea'|'canal' }; wall?: { bearingCdeg: Cdeg };
    slope?: { bearingCdeg: Cdeg /* downhill */; pct: number /* the mean fall in percent; default hood.hillsidePct */ } /* T1's hillside edge (V01 §3.10.1 step 2) */ } /* optional context edges */ }
  // written by T1 `intend` with product 'hood', a skeleton file or the API; read by the unit run's S0–S2 and the layer defaults (V01 §3.10.1 (7)); persisted in the recipe
type OutlineTemplateId = string;   // a row key of the outline templates §4.2 S1 (2)'s closed-outline routine draws a standalone or sky outline from — star, star_round, street_strip, plaza_frame, disc, D-shape, lozenge, crescent, spindle; the standalone rows V01 §3.10.2's
interface PackData { id: string; version: string; hash: Hash128; author: string; content: SettingPack /* §10.4, schema-validated */ }
interface HostContent { provider: string; version: string; inputHash: Hash128; output: unknown }   // read on replay instead of calling the host (§11.4)
interface Snapshot { seq: number /* the log head it materialises */; chunks: ChunkRef[] /* content-addressed, below */;
  digest: Hash128 /* the model's Merkle root, §6.2 — recomputed from the decoded state at every in-window load (step 3), under the model packages of the output version that recorded it, and compared */;
  recordsDigest: Hash128 /* the root of the records tree over the persisted derivation and naming records, §6.2 — recomputed at every in-window load and by the verification replay (step 3), and compared */ }
interface ElaborationChunk { entity: Id; rung: ElaborationRecord['rung']; inputs: Hash64; hash: Hash128; bytes: Uint8Array }   // item 28 (c): the elaboration cache — a derived Composition, Plan (with its PlanReport, V03 §2.3) or close-up, or one memoised step of a re-cut chain (§2.6), keyed by (entity, rung, inputs digest); content-addressed and non-canonical: checked by hash, dropped on mismatch or eviction (§12.8), never a base, never in a digest (§6.2)
interface ChunkRef { block: 'geometry'|'entities'|'archive'|'history'|'fields' /* fields: the field rasters and one BuildingShadeMask per arena — the ground's and each live island's (V06 §2.6): model data, in the digest, written only by an epoch's field phase */; partition: string /* PlatKey and 'L0-1' (the level-≤ 1 routes) or a static-index partition (§3.3) — or, under the size fallback below, a block group — or 'town' */; hash: Hash128 }
interface ViewState { keys: Record<string, { value: unknown; lamport: number; session: string }> }   // the keys of "View state" below, `session` included; each key last-writer-wins by (Lamport counter, session id)
interface EpochRecord { epoch: number; seq: number; inputs: EpochInputs; postDigest: Hash128 }   // derived from the log's epoch events (§7.1); its week is inputs.week (§4.11). The document's current week is derived too — the week of the last folded event that carries one (§4.11's clock) — never a stored counter; the `week` view key (below) reads it
type RebaseReason = 'keptSnapshot'|'drawnConstraintsRebuilt'|'frozenImport';   // keeping the old model at an upgrade needs no rebase: the document stays at its own output version (§7.5), so no reason names it
interface UndoRecord { session: string; of: number /* the seq of the event this record undoes */; record: Uint8Array /* its §7.4 undo record, compressed */;
  redo?: EditEvent /* an unshared document's truncated target held on this session's redo stack (§7.4): the event itself with its original seq, so a redo after a reload re-appends it; the packs it names stay by the pack-set rule */ }
```

* **One source of truth** (LC-24). Locks, assignments, table and preset edits (including tables a host supplies, which
  arrive as `editTable` / `editPreset` / `setStyle` events whose content is copied into the log with provenance `host`),
  epochs, undo and redo exist only as log events; their current effect lives in the entity records (flags, attributes)
  and in `derived` caches rebuilt from the base and the log. The blueprint's own assignments and edits enter as the log's
  first events (§7.7); dossier events enter the log through the host door as §7.7 states — so the log is the ordered
  dossier history the map is a function of (§6.2), every map edit lives here and never in the dossier, and the module
  never writes the dossier (§11.3); the report, the statistics and the timings are §5.4's. A rebase never deletes events:
  the events before it stay in the log as history and as the rebase's undo path (§7.4), and the fold skips them while the
  base is the rebased state.
* **The dossier block (items 20 (h) (v), 74, 87; J-A74.71).** `Document.dossier` holds what the map knows of its dossier:
  the binding rows — each dossier key bound to the address that carries its `Identity.dossier` (§2.8) — the facts carried
  under those keys, their hash, and every absorbed state's hash (`DossierBinding`, `CarriedFacts`, declared with their
  mechanism in §7.7 item 12). It is canonical, and the model digest never hashes it, as with `hostContent`: the port
  writes it at creation and at each absorb, the fold rebuilds it from the log's dossier events, and a load checks the
  stored block against that rebuild (§6.2, §7.5). It is what `factTier` reads (§2.8), what an incoming dossier is diffed
  against (§7.7 item 1) and where a host's undo finds the earlier state it converges to (`absorbed`, §7.7 item 5). It is
  counted beside the host content, outside the per-building budget below. A document with no dossier has none.
* **The skeleton file (item 101).** A skeleton is a document's declared subset as a file of its own — the ordered
  declarations, the creation prefix's and every event whose entities `factTier` reads `declared` (§2.8), with the
  recipe's seed, rung and pins — exported from any document and imported as a new document's creation prefix (§7.7's one
  path; its format §11.1's, its round trip §6.5 (9)'s).
* **Model inputs that are not in the recipe's parameters; the pack set (J-DET-35, J-DET-50).** Every setting pack is
  identified by id, version and content hash. The document's **pack set** is every pack that the base recipe's `packs`
  names or that the `value` of any `adjust` of the pack list in the log (`param: 'packs'`, §7.6) names — an undone,
  superseded or deselected selection included, because its event stays in the log and every replay folds it. When a
  document is created — or an `adjust` adds a pack (§7.6) — the content of every pack of the pack set that is not in the
  output version's shipped set is copied into `packs`, and it **stays there while the base recipe or any event of the log
  names the pack, or a truncated event held on a saved redo stack (`UndoRecord.redo`, §7.4) does**: its content leaves
  `packs`, at the next save, only once none names it — a truncation (§7.4) removed the last logged event naming it, and
  the redo entry holding that event was cleared by a new event from its session or left the `undo` section's cap. A pack a
  new output version stops shipping is copied into `packs` by the upgrade (§7.5 (2)). **A user-uploaded corpus is a pack
  like any other** (§10.4): selecting it wherever a corpus is chosen is an `adjust` of the recipe's pack list (§7.6) that
  enters it as `{ id: 'user:<content hash, base 32>', version: '1', hash, shipped: false }` with its content in `packs` —
  the corpus and the keyed row operation that binds it to the culture or ancestry row the user chose, so the binding is
  part of its content hash (§7.6); deselecting it is a second `adjust`, and its content stays saved because the first
  still names it — so a replay of the log always resolves it, and a town that has selected a user corpus can never emit a
  link that replays with other names (§6.4); an uploaded corpus outside the pack set is not a model input and is not
  saved. A host provider's outputs are copied into `hostContent` as they are produced (§11.4). On load each pack of the
  pack set is resolved by hash, first from `packs`, then from the library's shipped packs; a missing pack or a hash
  mismatch opens the document read-only with a message naming the pack, never a replay with other content. So a document
  replays on a machine that has neither the pack nor the host. Pack data and host content are counted outside the
  per-building budget below and **capped at 2 MB gzipped together**: a pack (a user corpus included) that would pass the
  cap is refused when it is added, with a message; a host provider's output that would pass it is refused at the provider
  call — nothing is recorded in `hostContent` — and the edit that requested it returns an **F-EDIT conflict** (§5.2)
  naming the provider and the size: an `ApplyResult` `conflict` through the API and, for an edit that came over the
  bridge, `doc.rejected { reason: 'invalid', conflicts }` (§11.2, §11.3). So nothing is ever committed with content a
  replay could not read.
* **Load.**
  1. A `schemaVersion` newer than the library's opens **read-only** with a message: view and export only. A document
     whose canonical form fails its schema — a `Recipe.salts` key that is not a rerollable concern among them — opens
     read-only with a message naming the field, never replayed.
  2. An `outputVersion` outside the retention window (§6.4) opens as a **frozen view** from `model`: view and export;
     the one edit offered is `rebase` (reason `frozenImport`), after which the document edits under the current version
     and records that it is not seed-reproducible before the rebase. **A frozen view is never checked against its
     recorded model root** (J-DET-44): that root was computed by its own output version's model packages — their leaf
     encoding and field drivers among them — which the browser no longer holds. The view checks each chunk against its
     content hash, which depends on the bytes alone, and is labelled "made with o<k>; not verified by this version"
     beside the CLI command that replays and checks it under its own output version (§6.4). A chunk whose bytes miss
     their content hash is reported as damage ("part of the saved copy is damaged"), its partitions drawn marked, and the
     `frozenImport` rebase is refused — a damaged copy is never a base — with the same CLI command. The `frozenImport`
     rebase decodes the state under the current version — its fields recomputed from their drivers and the stroke list
     (below), never from the Uint8 display copy —, checks its records root against `model.recordsDigest` (the records'
     encoding is the file schema's, so any version can check it, §6.2; a mismatch refuses the rebase as damage), records
     the model root the current version computes as its `stateDigest`, with `version` = the current output version
     (§7.1), and re-draws the names whose naming inputs changed as §7.4's rebase row states; it resolves the pack set as
     a load does, and a pack that neither `packs` nor the current version's shipped packs hold refuses the rebase with a
     message naming the pack and the CLI command that installs the document's own output version, copies the pack's
     content into `packs` (the cap above applies) and rebases. A document without `model` outside the window (only the
     CLI writes one, below) cannot be shown as a frozen view: the app says so and shows the CLI command that replays it
     under its own output version (§6.4), and offers to open its recipe under the current version as a new document with
     §6.4's notice.
  3. Otherwise the document's output version is the current one or a retained N−1 or N−2 (§6.4), and everything below
     runs under **that version's model packages** — its decoder, its field drivers and its digest leaf encoding, the ones
     that recorded the roots it checks.
     * **Decode and check.** The load decodes `model` — each chunk checked against its content hash, the arena rebuilt
       (§3.9), the entity columns decoded, the fields recomputed from their drivers and the stroke list (below) — and
       displays it at once. Before the decoded state accepts its first edit, the load recomputes its digest tree — every
       leaf and interior node of §6.2, one full recomputation from the decoded state, within §6.2's bar — and compares
       its root with `model.digest`; in the same pass it builds the records tree over the decoded derivation and naming
       records (§6.2) and compares its root with `model.recordsDigest`. The trees it builds are the working state's
       maintained trees from then on: every edit updates them at commit (§6.2 "Maintenance").
     * **Corrupt cache.** A model root or a records root that differs, a chunk whose bytes miss their content hash, or
       geometry the kernel's load cannot rebuild — a chunk that fails to decode or a lattice-point reference that finds
       no vertex (§3.9) — is a **corrupt cache**: the report says so ("the saved copy of this town does not match its own fingerprint; it is
       being rebuilt from its recipe and edits"), the decoded picture stays on screen read-only and marked as damaged,
       and the document loads by replay (step 5), the replay's state becoming the working state when it reaches the log
       head; a corrupt cache is never verified, never a base and never offered as the saved town.
     * **A rebased base.** A rebased document's `base.state` is checked the same way when a replay starts from it: its
       records root against `base.state.recordsDigest`, and its model root, computed under the packages the replay runs
       under, against **its root of record for that output version** — the `stateDigest` of the `rebase` that installed
       it when that event's `version` is the replay's version, else the `baseDigest` of the later `upgrade` whose `to` is
       (every `upgrade` of a rebased document records one, §7.5 (2)). The document's output version is always the
       `version` of its latest rebase or the `to` of its latest upgrade, so an ordinary load always finds a root of
       record for its version, and the undo of an upgrade, replaying under `from`, finds the one recorded before it; a
       base kept under o5 and upgraded to o6 is therefore checked under o6 against the root o6 computed at the upgrade,
       never against o5's. A mismatch there opens the document read-only with a message, because no replay can rebuild
       a state that is not seed-reproducible.
     * **Working state and verification replay.** On a matching root the decoded `model` is at once the **working
       state**: the user edits it immediately, and each edit is dry-run, logged and applied to it exactly as in a
       verified session, at §12.6's edit cost — no edit waits for the verification replay. In parallel a **verification
       replay** folds (base, log) up to `h₀`, the log head `model` materialises (`model.seq`), in replay mode — every
       model stage at its event's log position exactly as in the session, S13a's scoped delta included; only the view
       stages S14 and S13b suppressed (§7.3) — and compares its model root and its records root at `h₀` with
       `model.digest` and `model.recordsDigest`. It runs in a pool worker on its own arena, its own per-district stages
       with pool size 0 on that worker — the same overlay-and-merge path, identical digests by construction (§3.3 pool step 5),
       each freeze it reaches first rebuilding the partitions its folded edits left dirty (§3.3 pool step 1) — so **no copy
       is frozen while it runs**, and §12.8 counts the replay's model in place of the pool's frozen arena copies: every
       edit made meanwhile runs its per-district stages (S10, S10b, S11, S12b) in the generation worker by the
       pool-size-0 path (§3.3 pool step 5), which gives the digests the pool gives by construction, so the replay's worker is
       never contended and the working set stays on its counted line; an edit whose scope spans several districts costs
       its single-worker figure (§12.4) until verification ends. With pool size 0 the replay runs in the generation
       worker, on its own arena beside the working state, and yields to each user edit at its next batch boundary
       (J-I14).
     * **Edits held for provenance.** `editTable` and `editPreset`, whose invalidation reads recorded slices (§7.6),
       need provenance, which only the replay rebuilds (the snapshot does not store it): they are held until the replay
       reaches `h₀` and hands its provenance to the working state (for every entity the edits made meanwhile did not
       re-derive), and every event after a held one waits behind it, so the fold keeps log order. An `Adjust` made
       meanwhile uses tree scoping, which §7.3 items 6–7 prove output-identical to the dependency-graph route.
     * **Verified.** The working state is verified only when both model roots equal `model.digest` and both records
       roots equal `model.recordsDigest` — the decoded state's, checked before its first edit (or under §6.2 (iii)), and
       the replay's at `h₀`; the edits made meanwhile are then verified with it, because they were applied to a state
       proven equal to the replay's at `h₀`.
     * **Records mismatch (J-DET-52).** When the replay's model root at `h₀` equals `model.digest` while its records
       root does not — as when a writer stored a wrong derivation or naming record and hashed what it wrote — no model
       changes and nothing is asked: the replay's state at `h₀`, records included, replaces the working state, and every
       event logged after `h₀` is re-applied to it in log order as "take the replayed town" re-applies them (step 4),
       because an edit made meanwhile may have read a wrong record (Regenerate (keep settings) reads derivation records,
       and case (4) naming records and their salts, §6.3); their fates and renames are recomputed and differences
       reported, the report says "the saved copy's derivation or naming records differed from what its recipe gives and
       were rebuilt", and the working state is then verified.
     * **Trust the saved town.** The user may end the wait by choosing "trust the saved town", which keeps the saved
       town as in step 4. It is offered only once the decoded state's own model and records roots have matched; when that
       is, and what waits for the recomputation meanwhile, is §6.2 (iii)'s.
     * **Budget and measurement (M2a; METROPOLIS at M2b).** **Open-to-editable** — from the file's bytes in memory to
       the working state accepting its first edit — is ≤ the time §12.5's law gives to generate a town of the document's
       building count with the pool, T(B) (at CITY ≤ 60 ms + 60 µs × B: 330–420 ms at the default request), so opening
       a saved town is never slower than generating it; on the reference 300-edit CITY document, with pool size ≥ 1, an
       edit made 100 ms after the state becomes editable applies within its §12.6 cost + 10 ms; with pool size 0, within
       its cost + the longest replay batch at the rung (reported); the picture is on screen before the state is editable
       (S14 from the decoded model). *Pre-decided fallbacks:* if the recomputation passes §6.2's bar, it leaves the edit
       path by §6.2 (iii); if open-to-editable then still passes T(B), the kernel rebuilds each L2–L4 static index
       partition at the first query that reads it instead of at load (§3.9) — output-neutral, because every query
       result is sorted by its canonical key whichever structure holds an item (§3.3) — and if the bar still fails it
       is restated at the measured value as a declared budget amendment in the release notes and the judgment table,
       reported for the owner's veto, the picture still appearing at once; if the pool-size-≥ 1 edit bar fails for CPU
       contention, the verification replay pauses while an edit is applied and while the user has edited within the
       last 2 s, then resumes — scheduling only, never a model change. The load-verification fixtures (corrupt
       snapshots, a forced §6.2 (iii), an altered naming record) are §13.2's.
  4. A **mismatch is never silent** and is resolved once, by the user's choice (J-DET-38). **Keep the saved town**
     (offered only once the saved copy's own roots have matched, step 3): the base becomes the rebased state `model` at
     `h₀` (`Base.seq = h₀`) and a `rebase` event with `at = h₀`, `stateDigest = model.digest` and `version` = the
     document's output version (reason `keptSnapshot`) is appended at the head (`EditEngine.rebase(doc, 'keptSnapshot',
     h₀)`, §14); the edits made during verification already stand on that state and stay as they are. **Take the
     replayed town:** the replay's state at `h₀` (its arena and entity columns, transferred to the generation worker)
     replaces `model`, and every event logged after `h₀` is re-applied to it in log order through the ordinary fold —
     they are log events, so this is their replay; each one's confirmed fates are recomputed and a difference is
     reported as §7.3 item 4 requires, and their undo records are rebuilt by the re-application. Either way the document
     is consistent after the choice, the next load does not report it again, and undo below a rebase uses the rebased
     state, never a replay from the seed. A rebase fills in, from the rebased state, the derivation record of every
     entity of a kind that declares one (§2.8) and lacks it, so Regenerate (keep settings) stays defined for every such
     entity. **In a document attached to a host bridge** (J-DET-42) the policy — which client may keep the saved town,
     and what every other client does, reports, records and keeps meanwhile — is §11.3's ("Bridged load verification");
     what follows is the install mechanics. A client that receives a `rebase` with reason `keptSnapshot` whose `at`
     lies behind its log head and whose `stateDigest` differs from its own root at `at` **installs that base**: it
     decodes `model` from the `doc.load` bytes it kept (§11.3) and checks it as in step 3, makes it the rebased base
     (`Base.seq = at`), re-applies every event after `at` through the ordinary fold — their fates recomputed and
     differences reported (§7.3 item 4), their undo records rebuilt — and tells its user that the owner kept the saved
     town. A client whose verification is still running when that `rebase`
     arrives stops it, because the base is settled; a client whose root at `at` equals the `stateDigest` changes
     nothing; any other `rebase` whose `at` lies behind the head (possible only in a hand-built log) is a reported no-op,
     identically everywhere. A client that loads a document whose log already holds a `keptSnapshot` rebase with `at =
     model.seq` and `stateDigest = model.digest` — the host kept serving the bytes from before the owner's choice — takes
     `model` as that rebased base after step 3's check, without a verification replay and without asking, since the
     owner has chosen; the next owner save writes the base in its rebased form. So every client of a bridged document
     reaches the owner's state, as §11.3's convergence rule requires. The mismatch fixtures are §13.2's, and §11.3's
     convergence test includes a forced mismatch settled by an owner's keep.
  5. A document without `model` inside the window loads by replay — as does a corrupt cache (step 3); `model` is a
     cache, never the only copy of anything. So does a document of the running output version written by M1's
     generated-town format, before the records digest existed (§16): nothing recorded a records root for it, so the
     schema transform that adds `recordsDigest` (§7.5) drops its `model`, and the load regenerates the town from its
     recipe and its empty log, never reporting it verified — a *preview* file (§13.3) loses nothing by it (J-I19). M1's
     reader never root-checks a document of another output version: it opens as step 2's frozen view (§16 M1).
* **What the snapshot holds** (FTG-21, SCL-11). Geometry is stored **once**: per arena (`PlatKey`) every boundary — a
  shore, a kerb, a plot line, a party wall — is written once with its birth level, and faces, twins and parents are
  rebuilt on load (§3.9); every level is present, so a frozen view needs no pipeline code of its own version. Entities
  are stored as columns (identity, lifecycle, attributes, derivation records and naming records, §2.8); **provenance is
  not stored** — verification replays rebuild it. The **prosperity, density and greenery fields are not stored** at full
  resolution: an editable document recomputes them from their drivers and the stroke list on load (§4.5, §7.2) — the one
  sky input that recomputation reads is each island's persisted `SkyIsland.shadeBasis` (V05 §2.1), from which the
  islands' shade strips are rebuilt, never the island as it now stands, so the shade's lag behind an island edit (item
  102 (e)) survives a save, a load and a replay; an island without a basis — raised or declared since the last shade
  evaluation — casts and receives none, and the load never computes a basis from its absence (a document
  older than the basis gets one per island not fallen or removed by §7.5's island-basis step) —; the snapshot carries only
  a Uint8 copy of each field at 32 m (≈ 40 KB at CITY), used for thematic display if the document is ever opened as a
  frozen view. Neither digest tree is stored: the snapshot holds the two roots, `digest` and `recordsDigest`, and the load
  recomputes both trees (step 3).
* **Content-addressed chunks; one copy of a rebased state (J-DET-36, J-DET-19).** A snapshot is serialised as chunks,
  each keyed by its 128-bit content hash and written once in the container however many snapshots reference it. The
  geometry chunks — one per arena for its level-≤ 1 routes and one per static-index partition (one per district plus one
  outside districts, §3.3; the same units as §7.4's copy-on-write checkpoints) — are laid out by §3.9: what each holds,
  how a chunk names geometry another chunk holds (by lattice point) and which edits rewrite which chunks. Entity columns
  are chunked per partition; the archive, the lifecycle history and the field cache are town chunks. A rebased document's
  `model` therefore shares every unchanged chunk with `base.state`: while the post-rebase log is empty `model` is only a
  chunk list naming `base.state`'s chunks (the same digest), and after edits only the chunks those edits rewrote are
  stored twice.
* **Size budget.** TOWN ≤ 0.6 MB, CITY ≤ 3 MB, METROPOLIS ≤ 8 MB gzipped, and **≤ 320 B per building at CITY**, counted
  over the unique chunks plus the manifest, measured against FTG's 593 KB for 2 798 buildings with their population (≈
  212 B per building; PLAT also stores plots, yards, heights, lifecycle and the naming records of §2.8, and derives
  people); pack data, host content and the dossier block are counted separately (above). This section holds the document
  budget (§12 carries memory, not the document). *Measurement:* a document-size test per rung in B-CITY-lite at M1, and
  at M2a one on a CITY document rebased by keeping the saved town, after 20 edits (≤ 1.25 × the unrebased document;
  §16). *Pre-decided fallback if CITY exceeds 320 B per building:* the vertex stream switches to second-order
  (predictive) delta coding — each vertex stored as its difference from the straight-line continuation of the previous
  two along its first edge — with x and y in separate streams; the change is lossless and output-neutral, so no golden
  moves. *Pre-decided fallback if the rebased document exceeds 1.25 ×:* the L2–L4 geometry and entity chunks are cut per
  **block group** instead of per district — a district's blocks grouped by the 200 m world-grid cell that holds each
  block's lowest-leftmost vertex, so an edit rewrites only the groups whose blocks it touched — and the test re-runs; if
  the ratio still exceeds 1.25 ×, the bar is restated at the measured ratio as a declared budget amendment in the release
  notes and the judgment table, reported for the owner's veto, while the rung's absolute budget above (CITY ≤ 3 MB) stays
  the hard bar for rebased documents too. Both steps are output-neutral: chunking changes bytes on disk, never the model
  or its digest.
* **Formats.** Canonical: a `.plat` container = a JSON manifest (schema-validated, human-diffable: versions, `docId`,
  `nextSeq`, base recipe, log, pack data, host content, style, the snapshot chunk lists) + binary blocks (the chunks, by
  hash) as typed arrays. Saving from the app or the API **always writes `model`**; only the CLI's `--recipe-only` export
  writes a document without it (test fixtures and files made from links), and it refuses a rebased base, whose state its
  recipe cannot rebuild. The compact twin for embeds, and exports, are §11.1's (O11 c; exports carry address ids plus a
  supersedes table, §6.3).
* **Canonical form and digests.** The canonical document is `docId`, `schemaVersion`, `outputVersion`, `nextSeq`, the
  three part counters (`nextUndergroundPart`, `nextSkyPart`, `nextGroundPart`), `base`, `log`, `packs`, `hostContent`,
  `dossier` (when present), `style` and `model` (when present); `view`, `derived`, `undo` and `elaborations` are never
  canonical. Four digests: the **model digest** and the **records digest** (§6.2), the **provenance digest**
  (provenance, derivation records and naming records, §2.8 — the locality audit only), and the **document digest** (over
  the canonical bytes — save → load → save identity). The bridge's concurrency token `logHead` is §11.3's.
* **View state** (FTG-12, LC-16): time, location, favourites, notes and public notes, view pins, layer choices,
  `stylePreset` (a per-viewer preset that never writes `setStyle`, §11.3), `elaborate` (`click` or `view`: when a lazy
  rung is derived, never what — §4.1, item 28; `click` by default), `storey` (the storey the building band draws; its
  default is §8.5's, J-A28.82), `roomNumbers` (`'off'|'storey'|'building'`: the plan's room numbers, V03 §4.5), `depthBand` (the underground depth band the cut-away draws; its default is §8.4's, J-A12.81), `plotsOnly` (the
  cadastral plots-only view; §8.5, item 28), `knowledge` (item 30: `{ tier: 'public'|'local'|'secret'; places: Id[] }` —
  the viewer's tier and the addresses of the places it has learned, which §9.2's label policy, the reader (§11.2) and
  every picture and interchange export (§11.1) admit by §9.2's table; its default by role and who may set it are §11.3's,
  J-A30.82; every golden is taken at tier `public` with no places), `week` (item 67: the week drawn — by default the
  document's current week (above); a host sets its campaign week there, a user scrubs it, §4.11's *Works* (9)), `light`
  (item 68: `'day'|'night'|'time'`, default `'day'`; `'time'` follows the `time` key's hour through the path sun),
  `sunMode` (`'cursor'|'fixed'|'path'`, default `'cursor'` where a pointer exists), `sunHeight` (s ≥ 1, default 1: the
  cursor sun stands over the pointer at 1 and recedes toward a near-parallel sun as it rises, §8.4 (d)), `handLantern`
  (underground only; off by default) — the pointer's position itself a transient input, never a view key, never stored,
  logged or shared (§8.4) —, `showUnexcavated` (underground only; per viewer; off by default: draw the caverns and ruins
  nobody in town has found in V04's unexcavated style — honoured only for a key of tier `secret`, read as `false` by any
  other; V09 §4.17.1), `underlay` (item 101: an image the viewer traces over — the image, held by the
  viewer's app and never embedded in the canonical document, its opacity 0–1 (default 0.5) and its frame, a world-cm
  affine placement; never exported, never read by the model; §9.5 draws it), the year position with its follow flag, the festival display and
  the colour-vision variant (`yearWeek`, `seasonFollow`, `festival`, `cvdVariant`; below), weather, frame, map rotation,
  compass, legend and emblem settings, `exportAnchor` (§11.1), `thematic` (per viewer: the thematic view shown — `none`,
  `wealth`, `shade`, `links`, `quarters`, `uses`, `knowledge`, `coverage`, `voids`, `supplyChains`; V09 §5.4),
  `workingLayer` (per viewer: the layer the tools act on — ground, a sky island's `PlatKey`, or an underground depth band;
  V09 §4.2), `restore/<id>` (shared, one key per restore point: `{ seq, name, auto?, createdAt, session }`, written to
  `null` to delete; V09 §2.8), and the people a user has opened live in `view`, outside every digest;
  the document's `style` stays canonical; each key is last-writer-wins by (Lamport counter, session id), so a viewer
  never writes the model. Which keys travel per viewer and which are shared across a bridge is §11.3's. The key
  `session` holds an unshared document's authoring session (§7.4 "Sessions"); a client attached to a host bridge takes
  its session from `doc.load` instead and never writes this key (§11.3).
* **The year position, festivals and colour vision (g items 117, 118, 112).** Four per-viewer keys (never over a bridge,
  §11.3), outside every digest and never read by the model, its stages or its hash — so one document hashes identically
  in every week, with decorations on or off and in every variant (items 117 (a), 118 (a)):
  * `yearWeek` (0–51; item 117 (b)) — **the year position**: the week of the year the map is dressed for, spring first on
    SettlementForge's grid; `yearWeek` + 1 is `CalendarRow`'s week of the year (§4.11 *The clock* (3)). Default: under
    `seasonFollow`, §7.7's DR42 (the campaign week mod 52); otherwise midsummer, week 19. Written by V09's Season control
    (V09 §4.21.7) and, under `seasonFollow`, by DR42 at open and at each absorb; read by §8.2's season rows (water and
    ice, the growing year, leaves, snow by climate, the view sun's default height), DR43's festival window, §11's
    picture and battle-map exports (the season named and recorded) and volume 10's explanation of a seasonal look. A
    stored value outside 0–51 is clamped into it.
  * `season` — a reading of `yearWeek` through the calendar row's seasons (§4.11 *The clock* (3): 13 weeks each from
    spring, so weeks 0–12 spring, 13–25 summer, 26–38 autumn, 39–51 winter), never stored, for every reader that names a
    season; a named season picked is its middle week (6, 19, 32, 45). A `season` key an older document stored is read
    at load as that season's middle week into `yearWeek`, and never written again.
  * `seasonFollow` (boolean; item 117 (c)) — **"follow SettlementForge"**: default true when the document holds a dossier,
    false and not offered without one; while true the year position is DR42's, and with a dossier that carries no week
    it keeps its own (midsummer by default). A pick of a week or a season sets it false; the control's **Follow
    SettlementForge** sets it true and takes DR42's week at once.
  * `festival` (item 118 (b)) — **the festival display**: `{ mode: 'follow'|'off'|'preview'; id?: string }`, default
    `{ mode: 'follow' }`. `follow` draws a festival's decorations while `yearWeek` lies in its window (§7.7's DR43);
    `off` draws none; `preview` draws the festival `id` names whatever the week — a dossier tradition's `trad:` key
    (V08 §3.16 (5)) or, standalone, a `festival.generic` row's key (V11 §3.25.7). Written by V09's festival list
    (V09 §4.21.8); read by §8.2's festival decoration rows, §11's picture exports (the festival named) and volume 10; a previewed
    `id` no longer listed after an absorb reads `follow`.
  * `cvdVariant` (`'none' | CvdVariant`, §8.2; item 112) — the colour-deficiency variant of the style sheet drawn;
    absent or unknown, V09's machine default `AppPrefs.cvdDefault` (`'none'` until the user sets it). Written by V09's
    Colour vision chip (V09 §4.21.2); read by §8.2's variant selection, which joins it to the tile key, §9.5's legend and
    the picture exports.
  The `week` key (item 67, above) stays a different key: the absolute week the Works are drawn at, a campaign's under a
  host; `yearWeek` is a look only.
* **Permalinks** are §6.4; **migrations** are §7.5; the **edit log's replay semantics**, undo and redo are §7.4; the
  export → import → export round trip over the canonical form is a hard test (§13.2).
=== END ===
