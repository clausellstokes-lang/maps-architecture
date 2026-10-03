
## 2 Data model

### 2.1 The island record

`SkyIsland`, `UndersideProfile` and `ShadeBasis` are declared in `@plat/model` as given here (§2.7 names the fields the
base reads; item 251); every length is integer cm, every value on the field's [0, 1] scale.

```ts
interface SkyIsland {
  id: Id                          /* 'sky<part>/island:<token>' (§6.3) */;
  slot: 1 | 2 | 3                 /* the count law's ordered slot it fills (V05 §3.2); a fallen island frees it; a removed one holds it closed until `removed.releasedBy` is set (V05 §3.2 (6)) */;
  key: PlatKey                    /* { layer: 'sky', part }: part taken from Document.nextSkyPart at creation, never reused */;
  anchor: PointCm                 /* world position of the arena's local origin: an island-arena point p stands over the ground at anchor + p */;
  rim: ChainRef                   /* ('rim', island id): the closed structural L0 chain bounding its land (V05 §3.8) */;
  land: FaceRef                   /* its L0 land face(s) inside the rim */;
  areaHa: number                  /* the target area the rim is sized to — the supply law's A or an edited value; the land face's area within ± 1 % of it (V05 §3.6, §3.15) */;
  altitudeCm: Cm                  /* the surface datum above groundRefCm — the law's altitude floored by the rim, the root and the clearance (V05 §3.9 (4)), or an edited value */;
  groundRefCm: Cm                 /* above the ground datum: the greatest, under the projected solid, of the terrain height plus the caster ceiling there (V05 §3.9 (3)) — fixed at SKY, before the plots are cut; raised only by SKY-F's clearance check, `reclearIsland` (V05 §3.15 (7)) or a ground edit beneath (V05 §4.3) */;
  // elevationCm is derived at read: groundRefCm + altitudeCm — the surface datum of the island's terrain and the `z` base of every sky mark (§8.1, §8.4)
  underside: UndersideProfile     /* the rock beneath (V05 §3.9; J98) */;
  terrain?: Terrain               /* §2.3: its own, key = this island's; datumCm = the ground datum + elevationCm, kept in step (V05 §3.8) */;
  terrainEcho?: { river?: Id /* the ground river it echoes */; relief: 'echo'|'own'|'none';
    reliefClass?: 'plain'|'rolling'|'hilly'|'mountainous' /* §4.2 S0's classes: the class SKY drew for an `own` relief (V05 §3.8 (3)); absent for `echo` and `none` */ };
  river?: Id                      /* its conjured WaterBody on its own arena (V05 §3.8 (4)) */;
  districts: Id[]; allocation: Id /* its S7b (5) sky Allocation */;
  reason: 'prosperity'|'institution'; institution?: Id /* the Institution it carries */;
  placement: { over: 'water'|'fields'|'outskirts'|'core'; byAssignment: boolean };
  occlusion?: 'opaque'|'ghost'|'offset'   /* a per-island override of the sky LayerSpec's (§8.4); absent: the layer's */;
  supply: { town: number; carried: number } /* S_town and S_carried at the last evaluation (V05 §3.3) */;
  field: { prosperity: number /* the gradient's mean (V05 §3.11); a setAttr makes it a declared target the gradient is shifted to */; density: number; greenery: number };
  shadeBasis?: ShadeBasis         /* the island as the field's shade last read it (item 102 (e)); written only by a shade evaluation (V05 §3.19 (6)), never by an island edit; ABSENT on an island raised or declared since the last evaluation, which casts and receives no strip until the next writes it (J-V5.72) */;
  accesses: Id[] /* its SkyAccess records, in ordinal order */;
  name?: NameRef;
  state: 'floating'|'waning'|'settled'|'fallen'|'removed' /* 'removed': an author removed it (`convert removeIsland`, V05 §4.2): nothing drawn, its arena archived */; stateSince: { epoch: number; week: number }; dwellUntilWeek?: number /* waning and settled only: the week its dwell ends (V05 §3.15) */;
  removed?: { seq: number /* the removeIsland event */; generated: boolean /* its lifecycle cause was a rule (a slot draw, an epoch's raise), not a declaration; read by the clerk's held-slot line (V05 §4.5) */; releasedBy?: number /* the seq of the T5 `sky` declaration that re-filled its slot when no slot was free (item 260's re-add serving that key); never an `adjust('islands.count')`; absent: the slot held closed (V05 §3.2 (6)) */ };
  removedAccesses: number[]        /* the ordinals of generated accesses an author deleted, held absent at every re-siting (V05 §3.10 (1)); [] by default */;
  landfall?: Id                   /* fallen only: the ground Decoration its fall laid (V05 §3.16) */;
  declared?: { outline?: true; position?: true; altitude?: true; area?: true; field?: true } /* the paths a declaring event holds (V05 §4.2; §7.2) */;
  lifecycle: Lifecycle }
```

```ts
interface UndersideProfile {      // the island's rocky root (owner, 2026-09-28: "cast an appropriate shadow related to their size, shape and the angle of the global light"; J98)
  kind: 'cone'|'bowl'|'root'|'flat' /* the radius ratio ρ(z) at depth fraction z ∈ [0, 1] below the rim's base: cone 1 − z; bowl √(1 − z²); root (1 − z)², a stalactite; flat: no root, the rim slab only */;
  rimThicknessCm: Cm             /* the cliff face at the rim: the rim's base lies this far below elevationCm */;
  depthCm: Cm                    /* the root's depth below the rim's base, to its apex; 0 for flat */;
  apexOffset: VecCm              /* local: where the apex hangs relative to the land face's centroid; (0, 0) for flat */;
  tiers: number                  /* the root's underside tiers below tier 0 (the rim slab) that the shadow and the offset view read (V05 §3.9 (2)); 0 for flat */;
  roughness: number              /* 0–1: the displacement share of each tier's ring (V05 §3.9 (2)) */;
  source: 'rule'|'edit' }         /* 'edit' once a setAttr set any field: then held by resizes, which scale depthCm only by the area's square-root ratio */

interface ShadeBasis {           // the one sky input a field recomputation reads (§2.9, item 274) — a copy, never a vertex (§2.2 rule 5's precedent: Works.before)
  epoch: number; by: 'generation'|'rederive'|'epoch'|'update' /* the evaluation that wrote it; 'update' is Update shade now (V05 §4.2) */;
  anchor: PointCm; elevationCm: Cm; groundRefCm: Cm;
  surfaceTopCm: Cm               /* underside tier 0's top as that evaluation read it (V05 §3.9 (4)): the terrain's surface at generation and at a re-derivation, the full surface top at an epoch and at Update shade now */;
  underside: UndersideProfile    /* a copy */;
  rim: PointCm[]                 /* the rim chain's lattice points in the island's local frame, in chain order from its lowest-(y, x) vertex, ≤ `shade.basisVertexCap`: a longer chain is reduced by the kernel's simplification at a 1 m tolerance (§3.4), which moves no strip bit at the 32 m cell (T-V5-20) */ }
```

**Local coordinates, one world anchor.** An island's arena is laid in its own local frame centred on (0, 0) (V05 §3.8),
and the island stands over the ground plan by one integer translation, `anchor`. A move is one attribute (V05 §4.2);
nothing on the island is re-snapped, re-keyed or re-derived by it. Every reader that meets the ground converts by that
translation alone — S14 (marks and label candidates, V05 §5.1), the slab list (V05 §5.3), exports (V05 §5.5), placement
and the landing points (V05 §3.7, §3.10) — and every logged position on the island is local (V05 §4.2), so a later move
never invalidates it. No rotation: an integer translation keeps every lattice point a lattice point (§3.2 (7)), and a
turned island is a reshaped one (a `warp` on its key, V05 §4.2).

**`removedSlots(doc)`** (`@plat/sky`, draw-free, derived, never stored) — `{ island: Id; slot: 1|2|3; name?: NameRef;
seq: number; generated: boolean; accesses: number[] }[]`: every island record in state `removed` whose slot is still
held, and every island's `removedAccesses`, in slot order; read by V09's `info.remove.holds` card and history row and by
the clerk (V05 §4.5).

**`Document.nextSkyPart: number`** (§2.9, item 203) — the part the next island takes (1 at creation), never decreasing;
an event that creates an island records the part in the island's address, so a replay reads it there. The slot (1–3) is
the count law's; the part is identity. A fallen island's part stays spent.

### 2.2 The access record

`SkyAccess` is declared in `@plat/model` as given here, with its §2.8 registry row (item 251).

```ts
interface SkyAccess {
  id: Id                          /* 'sky<part>/skyaccess:<token>' — keyed in its island's arena, where its top vertex lies */;
  island: Id; kind: 'hoist'|'ropeway'|'stair'|'lightBridge';
  top: VertexRef                  /* ('sky_access', access id): its vertex on the island's rim chain (§2.2 rule 7) */;
  topLanding: Id                  /* the island-side landing Reservation, kind 'landing' (V05 §3.10 (5)) */;
  ground: { at: PointCm /* world: the foot, a point attribute (§2.2 rule 5) carried with its host under a warp (§7.4) */; plot?: Id /* the ground landing plot, once placed */ };
  role: 'main'|'service'|'guarded';
  state: 'open'|'closed'          /* stored: a hand closure only; the readings `unserved` (island waning past half its dwell, or settled) and `ruined` (island fallen) are derived, never stored */;
  knownTo: 'public'|'local'|'secret'; rule: string /* the SkyAccessRow it took */; lifecycle: Lifecycle }
```

**No access is a way** (J-V5.61). A `SkyAccess` is never a way, an arena edge between arenas or a portal, and carries no
deck plots (item 110 (d)'s plots stand on way decks); a raised way never reaches an island (V05 §3.22 (3)). Its foot
stands on ground part-0 land only — never on a deck face, a raised-way pier or under a raised deck (V05 §3.10 (4);
J-V5.60).

Derived at read, never stored: the run (`hoist` and `stair`: the vertical drop from the rim base to the foot's ground;
`ropeway` and `lightBridge`: the 3-D length from the top to the foot), the slope, and the foot's ground height. A row's
`maxRunM` limits the **horizontal** distance from the top's world point to the foot, for both slanted kinds (V05 §2.4). A
`stair`'s path is a helix of radius `stair.radiusM` about the vertical through its foot, from the foot's ground to the rim
base, rising `stair.stepM` per step with a landing every `stair.landingM` of rise, its last turn ending at the top; the
marks and the glTF steps are laid along it (V05 §5.1, §5.5). The ground landing of a `secret` access carries the access's
`knownTo`: its `sky_landing` use is fronted by item 63's `front` mode (a warehouse or a stable, the `sky_landing` row's
`front` column) and withheld from every key that does not admit it (§9.2's `admit`), as the access itself is.

### 2.3 The island's unit inputs (a derived view; never persisted)

```ts
// @plat/sky exports skyUnitInput(doc, island): SkyUnitInput — draw-free, assembled from committed state; its one caller is
// volume 1's unit runner (V01 §3.10.3) when the NeighbourhoodRequest it serves has layer 'sky'
interface SkyUnitInput {
  island: Id; key: PlatKey; land: FaceRef /* L0 */; rimStrip: FaceRef /* L1, never cut, never plotted */;
  claims: Id[]                    /* the institution's Reservation (an institution island) and every landing Reservation — holes the fabric cuts around */;
  landings: { reservation: Id; attach: VertexRef /* ('attach', reservation, 0): the vertex a way must end at */; access: Id; role: SkyAccess['role'] }[];
  river?: Id                      /* its crossing sites are §4.2 S1 (5)'s on the island (V05 §3.8 (4)), qualified and spanned by the unit run (V01 §3.10.3 (4)) */;
  allocation: Id                  /* the S7b (5) sky Allocation the unit runner splits over its districts (V01 §3.10.3 (4)) */;
  field: { raster: { cellCm: number /* 3 200 */; origin: PointCm /* local */; w: number; h: number; values: Float32Array /* the island's prosperity before the brush strokes, V05 §3.11 */ };
    mean: number; density: number; greenery: number } /* what the unit runner's field step reads — never recomputed from h(S_carried) */;
  context: { reason: SkyIsland['reason']; institutionKind?: string;
    districtKind: string /* 'sky-island' on a prosperity island's faces; the institution row's `districtKind` on the claim's face (V05 §2.4) */;
    districtHa: number /* IslandRule.districtHa: the land per island district the runner's count reads (V05 §3.12) */;
    fabricHint: FabricStrategyId /* a PRIOR for S7c on every island district: the hinted template's weight × fabricPrior, never a forced strategy */;
    fabricPrior: number /* IslandRule.fabricPrior */ } }
```

SKY builds, per island, the `NeighbourhoodRequest` of V01 §2.4 — `district` the island's sky pseudo-district, `key` its
arena, `layer: 'sky'`, `boundary` the land face's runs (every rim run a hard `sky` seam, no portal), `laid` empty (so the
mode is `unit`), `strategy` absent (S7c picks it per island district, reading `fabricHint` as a prior) — and calls
`NeighbourhoodStrategy.generate`; `SkyStrategy.place` returns the inputs as `unitInputs` (II.6). The unit runner reads
`skyUnitInput(doc, island)` for everything the request does not carry; the view is re-assembled from the committed
record, arena and allocation whenever the unit runner runs (generation, `raiseIsland`, New random on the island;
V01 §3.10.3 (6)). **The partition is volume 1's:** the island's district count and its cut are V01 §3.10.3 (2)'s — this
volume neither counts districts nor seeds them (J-V5.28): k is `skyDistrictCount(plotLandM2, districtHa)` (V01 §3.16),
called with `context.districtHa` in place of the town's mean district area, and its share is volume 1's
`hood.constants.sky.plotShare` (V01 §3.14), never a copy here (J-V5.45).

### 2.3a The shade strip (derived with the prosperity field; item 102)

```ts
// @plat/sky exports islandShadeStrip(doc, island, samples, onto): IslandShadeStrip — pure and draw-free (V05 §3.19)
interface IslandShadeStrip {
  island: Id                      /* the caster */;
  onto: 'ground' | Id             /* the receiver: the ground's field raster, or a lower island's local 32 m lattice (V05 §3.11) */;
  basis: Hash64                   /* §6.2's hash of the caster's `shadeBasis` (and, onto an island, the receiver's), the sampler's digest and the receiver terrain's version under the window — the hash of the UNLEVELLED heights there (V05 §3.19 (3); J-V5.65) — the strip reads nothing of the live island */;
  evaluated: { epoch: number; by: 'generation'|'rederive'|'epoch'|'update' } /* the evaluation that computed it; read by the clerk's "the ground last took this shade" (V05 §4.5) */;
  window: { i0: number; j0: number; w: number; h: number } /* in the receiver's 32 m cells: the field raster's (§4.5) or the island lattice's */;
  bits: number                    /* per cell: the sampler's sample points × its sun positions (§4.5 *Fields*' sampler) */;
  mask: Uint8Array                /* w × h cells, row-major, ⌈bits ÷ 8⌉ bytes each; bit (point · suns + sun) set where the ray from that sample point toward that sun meets this island's solid — §4.5's layout, which V06's building shade mask shares (V06 §2.6) */;
  cells: number                   /* cells with any bit set; a strip with cells 0 gives the island no entry in the daylight term's per-island attribution (V05 §4.5) and no outline in the shade view (V05 §5.1) */ }
```

**Where it lives.** The strips of every live island onto the ground are held with the prosperity field's rasters
(§4.5), beside the daylight term's per-sample mask they are OR-ed into, and hashed exactly as those rasters are (§6.2);
the strips onto an island are held with that island's field values (V05 §3.11). The strips' readers, all reading the
strips held for the evaluation (computed once, at the first read, V05 §3.19 (6)): the field's composition; the sky
receivers' context values; volume 1's S9b manor sun factor, its close-up hood pins' shade gate and
`DistrictContext.shade.islandShare` (V01 §3.5.5, §3.8.2, §2.3) — on an island the same readers through `shadeSky`, with
S7c's `shade` term through `DistrictContext.shade.meanShare` (V01 §2.3; J-V1.87); the clerk's reader; and the shade map
view. Nothing edits a strip (J-V5.30). An island without a `shadeBasis` (V05 §2.1) casts no strip and receives none.
**A strip is a pure function of its caster's `shadeBasis`, the receiver** (the ground's committed terrain as the field
reads it — S1's raster with the T2 terrain strokes, unlevelled, item 309 — or the receiving island's `shadeBasis` and
terrain) **and the sampler** — never of the live island — so the load path, a replay and every field recomputation
rebuild the same bits (§2.9, item 274); only the shade view's pending outline and the clerk's "has the ground caught up"
read the live island (V05 §3.19 (8)). The strips are computed at every shade evaluation whatever `w_sun` is (0
included): the fold multiplies them by the weight, and the shade view reads the held strips (V05 §5.1).

### 2.3b The access obstacles (for item 110's raised ways)

```ts
// @plat/sky exports skyAccessObstacles(doc): SkyAccessObstacle[] — pure and draw-free, from the committed accesses; world cm above the ground datum
type SkyAccessObstacle =
  | { kind: 'column'; access: Id; at: PointCm /* the foot (a hoist's: its landing yard's centre) */; radiusCm: Cm /* a hoist: the yard's half-diagonal; a stair: stair.radiusM + 1 m */;
      floorCm: Cm /* the foot's ground */; topCm: Cm /* the rim base, elevationCm − rimThicknessCm */ }
  | { kind: 'segment'; access: Id; a: Point3Cm /* the top's world point at the rim base */; b: Point3Cm /* the foot at its ground height */;
      clearCm: Cm /* IslandRule.accessSiting.lineClearM */ };
```

One entry per open or `unserved` access of every island that is not fallen or removed: a `hoist` or `stair` a column (its
cage or its helix rises through open air), a `ropeway` or `lightBridge` a segment. Its callers (V05 §3.22 (3); §4.3,
item 290 (5)) are the raised-way course solver, for every raised part laid after SKY — an epoch's raised-way pass; no
generation stage lays one after SKY (§4.3, item 290 (1)) — and T4 `road`'s `raised` dry run: a deck, its parapet and its
raised-way piers stay outside every column, and a deck crossing under a segment keeps `clearCm` below it. The list is
rebuilt from committed state on every call; nothing stores it. Its length is the count of live accesses: generated ones
at most `accessCount.max` per island, hand-placed ones bounded by the rim (each top's yard takes `landing.yardWidthM` of
it and each foot keeps `footGapM` from every other, V05 §4.2), and the solver's cost is linear in it (V05 §6).

### 2.4 The rule tables (data, editable by `editTable`, §7.6; every cell `{value, unit, provenance, calibratable}`)

`IslandRule` — one row per rung that admits islands, in `@plat/tables` (`islands.json`, V11 §3.1's registry row, written
by this volume; item 546):

```ts
interface IslandRule {
  rung: 'CITY'|'METROPOLIS';
  chance: [number, number, number]                    /* the slot chances; defaults II.6 (4)'s */;
  townSupply: { v: number; h: number }[]               /* S_town → h_town, piecewise linear on the absolute value (V05 §3.3) */;
  carriedSupply: { v: number; h: number }[]            /* S_carried → h_carried, likewise */;
  areaHaMax: number; minAreaHa: number; altitudeM: [number, number] /* E_min, E_max */; clearanceM: number;
  casterAllowanceM: number                             /* the caster ceiling where no taller caster is known at SKY (V05 §3.9 (3)) */;
  surfaceTopPercentile: number                         /* the island's surface top: this percentile, over the land face, of its terrain plus eaves (V05 §3.9 (4)) */;
  shade: { ringMaskM: number; stepM: number; basisVertexCap: number } /* the strip's tier-ring masks, its ray step, the basis rim's vertex cap (V05 §3.19, §2.1) */;
  routing: { transferM: number }                       /* the route distance's allowance per access ridden (V05 §3.20) */;
  underside: { kinds: { kind: UndersideProfile['kind']; weight: number }[]; rimThicknessM: number; depthPerRadius: number; maxDepthM: number; apexOffsetShare: number; tiers: number; roughness: number };
  placement: { prefs: { over: 'water'|'fields'|'outskirts'|'core'; weight: number }[]; gapM: number; frameInsetM: number; nearM: number; latticeM: number; topK: number };
  outline: { templates: { template: 'disc'|'d_shape'|'lozenge'|'crescent'|'spindle'; weight: number }[]; detail: string /* a detail row of §4.2 S1 (2) */ };
  frameMarginM: number                                 /* the island arena's frame margin beyond its grown outline (V05 §3.8 (1)) */;
  terrain: 'none'|'echo'|'own'; echo: { amplitudeShare: number; domeM: number; domePerRadius: number; tiltPerMille: number };
  river: { chance: number; minAreaHa: number; flowShare: number; widthM: [number, number]; widthMinorShare: number; springPondChance: number;
    sourceShare: number /* the source's place on the long axis, from its upstream end */; pondShare: number /* the spring pond's area ÷ A */ };
  institutions: IslandInstitution[]; access: SkyAccessRow[];
  accessCount: { perHa: number; max: number }          /* a prosperity island's generated accesses: min(max, 1 + ⌊areaHa ÷ perHa⌋) (V05 §3.10 (1)) */;
  accessSiting: { footGapM: number; turnStepCdeg: number; turnMaxCdeg: number; deckGapM: number; lineClearM: number } /* feet apart; F-SKY-ACCESS's direction steps; a foot's and a yard's gap to a raised deck's plan; a slanted access's clearance over a raised deck or raised-way pier (V05 §3.10, §3.17, §3.22 (3)) */;
  stair: { radiusM: number; stepM: number; landingM: number } /* the floating stair's helix (V05 §2.2) */;
  landing: { yardWidthM: number; yardDepthM: number; rimStripM: number; wayReachM: number };
  fill: { batchShare: number; householdCapDistricts: number; coverageOvershoot: number } /* V05 §3.5 (2)–(3) */;
  institutionFit: { fitFactor: number; areaCapShare: number; prisonMarginM: number; siteLatticeM: number } /* V05 §3.4 (2), §3.5, §3.10 (5) */;
  cryptFloorM: number                                  /* an island crypt's floor above the rim slab's base (V05 §3.10 (5)) */;
  districtHa: number                                   /* the land per island district volume 1's count reads (V05 §3.12) */;
  fabricPrior: number; fabricRingHa: number            /* S7c's prior on the hinted template; a prosperity island's hint is `ring` from this area, else `bent-cut` (V05 §3.12) */;
  field: { epsilonShare: number; epsilonWavelengthM: number; greeneryBonus: number; rank: { elevation: number; view: number }; bandInset: number } /* V05 §3.11 */;
  carry: CarryRule                                     /* what the sky fill never carries, carries by share, or may split across arenas (V05 §3.5 (3)) */;
  node: { bonus: number }                              /* the magical node's term added to h_town (V05 §3.3; II.6 (3)) */;
  hysteresis: number; dwellYears: { waning: [number, number]; settled: [number, number] }; growthPerYear: number; altitudeRateMPerYear: number;
  redrawPerYear: number                                /* the empty slot's per-year redraw; default II.6 (4)'s */;
  landfall: { coverShare: number; stoneM3PerM2: number }; landingKernel: { weight: number; radiusM: number };
  naming: { lowBelowM: number; highFromM: number }     /* the altitude classes S13a reads (V05 §3.14) */;
  export: { gltfRingPoints: number; mistM: number }    /* V05 §5.5 */ }
interface CarryRule {                                  // item 23: a default, never a law — every list is editable
  never: { balance: string[] /* item 107 (a)'s balance profiles */; emitsTopStep: ('smell'|'smoke'|'waterPollution')[] /* item 103 (a)'s EMITS at the profile scale's top step */;
    chainRoles: ('resource'|'processing')[] /* of an active chain — custom (item 104 (b)) or the dossier's activeChains[] (item 105 (i)) — the island's own institution excepted */;
    hardNeeds: string[] /* a hard NEEDS row naming one of these features */ };
  share: { balance: string[]; splitShop: boolean /* the shop part of an item 105 (h) split class may go up by share, its works staying on the ground */ } }
interface IslandInstitution {
  kind: string /* palace, cathedral, prison … data */; tags: string[] /* the roster class tags it takes, in preference order */; requirementBand: string; areaHa: number;
  staffHouseholds: number; weight: number; requires: { government?: string[]; magic?: ('low'|'high')[] /* the `magic` circumstance the row needs */ };
  districtKind: string /* a `sky-*` district kind */; fabricHint: FabricStrategyId /* S7c's prior (V05 §3.12) */;
  archetypes?: { id: string /* a SettlementForge scene archetype, item 104 (a) (2) */; landmarkOnly: boolean }[] /* a custom institution whose resolved profile carries one counts as an instance of this row (V05 §3.4) */;
  handover: { tags: string[] /* who takes an S3 reservation this row's instance leaves on the ground: the first tag the roster demands on the ground, its largest instance */; else: 'park'|'none' } /* V05 §3.5 */;
  accesses: ('main'|'service'|'guarded')[]; near?: 'plaza'|'precinct'|'richest' /* the purpose term's target (V05 §3.7 (3)) */; far?: 'plaza'; nearM: number; overWeights?: Partial<Record<'water'|'fields'|'outskirts'|'core', number>> }
interface SkyAccessRow { kind: SkyAccess['kind']; magic: ('none'|'low'|'high')[]; weight: number; maxAltitudeM?: number; maxRunM?: number /* the horizontal top-to-foot distance (V05 §2.2) */; needsLandBelow: boolean; extension: true }
```

**Default rows** — our own values (provenance `own`, `extension`: no reference has islands, II.6 (8)), each calibratable;
the three marked ⟨P0⟩ are set by M6-sky's P0 run before the table lands, with the measurement and fallback of V05 §3.3
and §3.9 (5), and their provenance notes name that run. Every calibratable cell, those three included, takes its
calibration register entry from V12 §3.11's default line, written by the seat landing P1 (V05 §8; J-V5.80):

| row | CITY | METROPOLIS | note |
|---|---|---|---|
| `townSupply` ⟨P0⟩ | (0.45, 0) (0.58, 0.5) (0.70, 1) | same | absolute field values |
| `carriedSupply` ⟨P0⟩ | (0.55, 0) (0.85, 1) | same | a rich-band household in a modest town reads ≈ 0.75 (V05 §3.3) |
| `areaHaMax` / `minAreaHa` | 10 / 1.5 | 20 / 1.5 | one ground district at CITY is ≈ 12–16 ha of built land |
| `altitudeM` / `clearanceM` | [60, 160] / 25 | [80, 220] / 25 | a tall spire is ≈ 100–150 m: an island floats "overlooking the land" |
| `underside` | kinds cone 0.30, bowl 0.25, root 0.40, flat 0.05; rim 10 m; depth 0.45 × the equivalent radius, ≤ 110 m; apex offset ≤ 0.25 × radius; 6 tiers; roughness 0.15 | same | J98 (V05 §3.9) |
| `placement.prefs` | water 1.0, fields 0.8, outskirts 0.6, core 0 | same | II.6's default placement |
| `placement` | gap 80 m, frame inset 50 m, near 600 m, lattice 40 m, top 5 | same | |
| `outline.templates` | disc 0.25, d_shape 0.15, lozenge 0.20, crescent 0.10, spindle 0.30; detail `rough` | same | §4.2 S1 (2)'s rows |
| `terrain` / `echo` | `echo`; amplitude 0.25 of the ground's relief class, dome 6 m + 0.02 × radius, tilt 8 ‰ | same | |
| `river` | chance 0.75, ≥ 3 ha, flow share 0.02, width [3 m, 0.08 × the minor axis], spring pond 0.5; source at 0.15 of the long axis from its upstream end; spring pond 0.015 of `A` | same | V05 §3.8 (4) |
| `landing` | yard 12 × 14 m, rim strip 6 m, way reach 60 m | same | |
| `field` | ε share 0.05, ε wavelength 120 m, greenery bonus + 0.10; rank 0.6 × elevation + 0.4 × view; band inset 0.1 of each band's width | same | V05 §3.11 (J-V5.18) |
| dynamics | hysteresis 0.05, dwell waning [5, 15] y, settled [10, 40] y, growth 0.05 of area per year, altitude 4 m per year; the redraw rate II.6 (4)'s | same | per year, §4.11 (5) |
| `landfall` | cover share 0.5, stone 3 m³ per m² | same | |
| `landingKernel` | weight 0.05, radius 150 m | same | field pass 2 (V05 §3.10 (6)) |
| `surfaceTopPercentile` | 95 | same | a lone tall eave does not set the rim slab's top (V05 §3.9 (4)) |
| `frameMarginM` | 40 m | same | the arena's context margin beyond the grown outline (V05 §3.8 (1)) |
| `accessCount` / `accessSiting` | one access per 5 ha, at most 3 / feet ≥ 30 m apart, turns of 30° up to ± 90° | same | V05 §3.10, §3.17 |
| `accessSiting` (item 110's cells) | deck gap 4 m; line clearance 8 m | same | a yard's carts and a hoist's swinging cage keep 4 m from an arch's deck; a rope line's sag and swing keep 8 m over a deck and its parapet (V05 §3.22 (3)) |
| `stair` | helix radius 6 m, 0.5 m per step, a landing every 20 m of rise | same | a stepped stone stair round a column of air (V05 §2.2) |
| `fill` | batch 1 % of the band's demand (≥ 1 household), cap 3 × `H_d`, coverage overshoot 1.05 | same | V05 §3.5 (2)–(3) |
| `institutionFit` | fit 1.3 × the row's area, island cap 2.5 × the row's area, prison yard margin 20 m, claim site lattice 10 m | same | V05 §3.4 (2), §3.5, §3.10 (5) |
| `cryptFloorM` | 1 m | same | at least a metre of rock under a crypt's floor (V05 §3.10 (5)) |
| `districtHa` | 3.5 ha | 4.5 ha | about one Neighbourhood patch of land per island district; a full island is two or three districts (V05 §3.12; J-V5.45) |
| `fabricPrior` / `fabricRingHa` | 3 / 6 ha | same | V05 §3.12 |
| `carry` | never: balance `heavy-processor`, `wholesale-storage`; smell, smoke and water pollution at the top step; chain `resource` and `processing` nodes; hard needs `running_water`, `river_bank`, `harbour`, `gate`, `quay` · by share: balance `everyday`, `specialist`; split shops on | same | items 103 (a), 105 (h), 107 (a) (V05 §3.5 (3)) |
| `shade` | ring masks 4 m, ray step 8 m, basis vertex cap 256 | same | a quarter of the field cell's half-width (V05 §3.19); V05 §2.1 |
| `casterAllowanceM` ⟨P0⟩ | 30 m | 40 m | a five-storey house with its roof ≈ 22 m, a tall tree's crown ≤ 30 m; the measurement and fallback are V05 §3.9 (5)'s |
| `routing` | transfer 100 m | same | the wait and the loading at a landing, in metres of walking (V05 §3.20) |
| `node` | bonus 0.25 | same | a quarter of the supply's range: a middling town on a node supplies like a rich one without it (V05 §3.3) |
| `naming` | low below 90 m, high from 150 m | same | V05 §3.14 |
| `export` | glTF rings 64 points; mist quad 30 m | same | V05 §5.5 |

| institution row | tags | band | area | staff households | weight | requires | district kind / fabric hint | accesses | placement | custom archetypes (item 104) | hand-over of an S3 reservation |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `palace` | `palace` | `rich` | 3.0 ha | 40 | 0.35 | government `crown` or `seigneurial` | `sky-palace` / `street` (an axial avenue from the landing to the forecourt) | main, service | near the plaza, 1 000 m | `martial-keep`, landmark only | `town_hall`, `guildhall`; else `park` (the palace gardens) |
| `cathedral` | `cathedral`, `great_temple` | `prosperous` | 1.5 ha | 20 | 0.25 | — | `sky-temple` / `landmark` | main, service | near the precinct where one is reserved, else the plaza, 800 m | `sacred-sanctuary`, landmark only | `church`, `temple`, `chapel`; else `park` |
| `prison` | `prison` | `prosperous` | 1.2 ha | 15 | 0.20 | — | `sky-prison` / `square` | guarded | far from the plaza (≥ 1 000 m); water 1.5 | — | none (sited by S10b; no S3 reservation) |
| `tower` | `mage_tower` (its lowest-ordinal instance), `mages_guild` | `prosperous` | 0.6 ha | 4 | 0.20 | `magic` low or high | `sky-tower` / `square` | main | far from the plaza (≥ 600 m); fields 1.2 | `exotic-tower`, any level | none (sited by S10b) |

The `tower` row is the owner's "unique institution" read for an arcane tower "on its own ground, apart" (item 104 (a)
(2)'s wording for that archetype): it takes a catalogue instance of `mage_tower` (the lowest roster ordinal that is not a
member of a collective record, item 108) or the town's `mages_guild`, or a custom kind of that archetype, and only where
the world has magic (J-V5.31). The cathedral row's second tag is the great temple of a town whose religion row names one
(V11's `great_temple`, "as cathedral"), so a non-default religion's seat floats as the cathedral does (J-V5.58). A
prison's band is its paymaster's: the town's rulers keep it aloft, so it reads `prosperous`, not its inmates' band. A
hand-over tag is taken by the **largest** instance of that class the roster demands on the ground — the greatest planned
plot area at its band (§4.2 S2), ties by roster ordinal — so the cathedral's close passes to the town's greatest parish
church, which becomes the mother church in the old close (V05 §3.5; J-V5.43).

| access row | magic | weight | limits | land below |
|---|---|---|---|---|
| `hoist` | none, low, high | 1.0 | altitude ≤ 400 m | yes |
| `ropeway` | none, low, high | 0.8 | horizontal run ≤ 350 m | no (chosen where the ground below the rim is water) |
| `stair` | low, high | 0.3 at `low`, 0.4 at `high` | altitude ≤ 120 m | yes |
| `lightBridge` | high | 0.5 | horizontal run ≤ 600 m | no |

**The landing classes** (facts this volume fixes; their full class rows are V11's, §10.2's schema): `sky_landing` on the
ground — a yard plot of 150–400 m² fronting a way (or reached by a trail), one building by kind: a two-storey hoist house
under a gantry (6 × 8 m), a rope-line tower (6 × 6 m, 18 m), a stair's foot arch, a light bridge's plinth; staffed by
two `modest` households, allocated to its host district or the hinterland (V05 §3.10 (4)); a `front` column for a secret
access's landing. `sky_landing_top` on the island — the landing yard's plot on the rim with its winch house and crane
arm (8 × 10 m), rope-line tower, stair terrace or bridge pylon; no households of its own. **District kinds:**
`sky-island` for a prosperity island's districts; `sky-palace`, `sky-temple`, `sky-prison` and `sky-tower` from the
institution rows on the claim's face (§10.2's district-kind rows, item 213; keyed apart from the ground's `temple` and
every other ground kind, so the table has one row per key). Volume 1's unit runner types the island's faces with these
kinds (V05 §3.12); each row carries the affinities of its ground counterpart for S7b's split and S7c (`sky-island` those
of the town's richest ground kind), rows V11's.

**The landing classes' siting facts** (item 103 (a)'s profile columns; the rows V11 writes carry them): `sky_landing` —
sited by its access, never by a pull (its allocation row is positioned, V05 §3.10 (4)), so its NEEDS row is satisfied by
construction (a way frontage or a trail); EMITS heavy traffic at the middle of the profile scale and noise at its lowest
non-zero step (the winch, the carts at the yard), so the classes SENSITIVE-TO those keep a little away; CLIENTELE
town-wide; SUPPLY none of its own — it is the island's gate for the route distance (V05 §3.20); ALIGNMENT neutral, except
a `guarded` landing, which takes its prison's law-and-enforcement alignment, so crime keeps its distance from a prison's
hoist; COVERAGE none. `sky_landing_top` — the same facts on the island arena.

### 2.5 Identity

| kind | lineage unit and creation index | address | anchor (§6.3) |
|---|---|---|---|
| `SkyIsland` | the town; its slot at generation; at an epoch the town, the slot and the epoch component (J-A8.61); a declared island its declaring event's `seq` | `sky<part>/island:…` | its slot (base) |
| its `Terrain`, its river, its arena's L0 and L1 pieces | the island's `SKY` run, by §6.3's canonical order | `sky<part>/…` | the base rows of their kinds |
| `SkyAccess` | the island; its ordinal in siting order (V05 §3.10); a hand-placed one its event's `seq` | `sky<part>/skyaccess:…` | (its island's address, its role, its ordinal); same island (§6.3, item 476) |
| landing `Reservation` (island side) | the island; the access's ordinal | `sky<part>/reservation:…` | its access's address |
| ground landing plot | an ordinary ground plot (its block); its use `sky_landing` names the access | ground | the plot's base anchor |
| landfall `Decoration` | the fallen island (its address) | ground | its island's address |

The unit run's districts, blocks, plots and buildings on the island are ordinary entities of the island's arena under
§6.3's rules, their lineage continuing the island's (volume 1).

### 2.6 The lifecycle of every field this volume adds or writes

Each row is the field's one home: its producer (*create*), its consumers (*read*), and how it persists, regenerates,
undoes and migrates; the field cell names its base hook. The shade-evaluation moments a *create* cell cites are V05
§3.19 (6)'s.

| field (base hook) | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| the `SkyIsland` record as a whole (§2.7, item 251) | `SkyStrategy.place` (V05 §3.6–§3.10), `raiseIsland`, a T5 `sky` declaration (V05 §4.2) | S14's marks, the slab list, labels, exports, `IslandEpochStep`, the clerk's reader | model digest | per field, below | the creating event's undo | per field, below |
| `slot` | S7b (5)'s slot draw; a declaration takes the lowest free slot, or the lowest held slot when none is free (V05 §3.2 (6)) | the epoch redraw, `raiseIsland`, the anchor match | model digest | kept by succession (slot anchor); a slot a `removed` record holds is never drawn or filled at any re-derivation or epoch | restored from the undo record | — (new) |
| `key`; `Document.nextSkyPart` (§2.2, §2.9, item 203) | island creation takes `nextSkyPart` and bumps it | every island reader; `PlatKey.part`, the `sky<n>/` prefix | model digest; the counter in the document | a successor keeps its predecessor's key (§6.3) | the counter never decreases (spent) | older documents: `nextSkyPart` = 1 + the highest sky part present, 1 if none |
| `anchor` | placement (V05 §3.7) or a declaration | S14, slabs, exports, landings, the reader | model digest | kept by a scoped regeneration; recomputed only by Re-derive from S7b | inverse `setAttr` | a record with the base's world `outline` gets as anchor the outline's area centroid rounded to the lattice, and its polygon less the anchor as the rim (below), so the local frame centres on the island |
| `rim`, `land` and the arena's L0 — the outer ring, the void, the water faces (§2.2 rule 1, item 204) | `SKY`'s L0 batch (V05 §3.8 (2)) | the unit run (its land face), the rim draw, exports, the rim resize | geometry (the arena) | re-derived by New random on the island; kept by regenerate-keep | the batch's undo record | the base's `outline: Polygon` becomes the rim chain by one `insertChain` in a fresh arena |
| `areaHa` | the supply law or an edit | resize, the fill, the reader | model digest | the law re-evaluates only at an epoch | inverse | — |
| `altitudeCm`, `groundRefCm` | V05 §3.9 (3)–(4) at SKY (the caster ceiling, item 110's raised parts included), before field pass 2; SKY-F's clearance check; `reclearIsland` (V05 §3.15 (7)); `setAttr`; a move; V05 §4.3's ground edits beneath (a raised way, retaining wall or building added included) | `elevationCm`, the island's terrain datum, the slab list, marks, access runs, the shade basis, SKY-F's clearance check | model digest | kept; a raise of `groundRefCm` (SKY-F, a ground edit beneath) keeps `elevationCm` and sets `altitudeCm` = `elevationCm` − the new `groundRefCm`, raising `elevationCm` only where V05 §3.9 (4)'s floor then fails (a listed fate); New random re-checks the floor after re-drawing the underside (V05 §3.9 (5), §4.2) | inverse | base `elevationCm` → `altitudeCm` = `elevationCm` − `groundRefCm` recomputed |
| `underside` (`UndersideProfile`) | `SKY` (V05 §3.9 (1)) from the rule row and `island.place`; `setAttr(underside.*)` | `undersideTiers` (the slab list, the offset view's silhouette, glTF's underside), the model's smooth tiers (the shade strip, V05 §3.19), the altitude floor, the clearance | model digest | re-scaled by a resize; re-drawn by New random unless `source: 'edit'` | inverse | a base record without it gets the rule's default profile, drawn on its slot's key; a `flat` profile carries `depthCm` 0 and `tiers` 0 |
| `terrain`, `river` (§2.3; the river's `fall`, item 252) | `SKY` (V05 §3.8 (3)–(4)), by S1's machinery on the island key | `ContextVector.slope`, `.terrainClass`, `.upstream`, `.dist.water` on the island; the surface layer; glTF; the island's crossing sites (V01 §3.10.3 (4)); the waterfall mark; exports | model digest (the terrain raster in the arena's chunk) | New random on the island re-derives; T2 edits on the island key | inverse | — |
| `terrainEcho` (`river`, `relief`, `reliefClass`) | `SKY` (V05 §3.8 (3)–(4)): the ground river echoed, the mode by the rule row, and for an `own` relief the class drawn on `island.place` (index `relief`) | the island's terrain; volume 1's `terraceState` on the island's districts (V01 §3.17.7 (2)) and so the unit run's levelling (V05 §3.22 (4)); the unit run's context vector; exports; T-V5-31 (e) | model digest | re-drawn by New random on the island with the terrain; kept by every other edit (a T2 stroke changes heights, never the class) | inverse | an `own` island without `reliefClass` re-draws the class on its `island.place` key (index `relief`) at load, written and reported |
| `districts` | SKY-F, from the unit run's `NeighbourhoodResult.districts` (V01 §2.4) | reader, labels, epochs | model digest | rewritten by SKY-F after every unit run — generation, a raise, New random, a Re-derive (V01 §3.10.3 (6)); otherwise succession | inverse | — |
| `reason`, `institution` | S7b (5) (V05 §3.4) or an assignment; `IslandEpochStep`'s re-reasoning (V05 §3.15 (1b)) | the fill, the unit inputs, labels | model digest | Re-derive from S7b | inverse | — |
| `placement` | V05 §3.7 | the reader, the report | model digest | kept by scoped regeneration | inverse | — |
| `occlusion` | absent; `setAttr` | S14, §8.4 | model digest | kept | inverse | — |
| `supply` | every evaluation (V05 §3.3) | the report, epochs, the reader | model digest | recomputed at S7b and each epoch only | restored | — |
| `field` (the mean, density, greenery) and the island's gradient (V05 §3.11; `ContextVector`, §2.5, item 213) | `SKY`: the gradient from the carried bands' shares, its mean written; `setAttr(field.prosperity)` a declared target mean (`declared.field`); island brush strokes (`setField` with `key`, V05 §4.2) | the context vector on the island (through `SkyUnitInput.field`), S10a's band capacity on the island, the clerk | model digest (the three values); the gradient raster is never stored — rebuilt on load from the island's terrain, rim, allocation, the cuts and the stroke list, as §2.9 rebuilds the ground's fields | recomputed at an epoch (V05 §3.15) and by a re-derivation from S7b; a declared target and the strokes are held | inverse | older records: the mean is their uniform value, no strokes |
| `ContextVector.arena 'sky'` (§2.5, item 213) | the unit run's context read | every arena-keyed row | derivation record | recomputed | — | — |
| `shadeBasis` (§2.7, item 251; §2.9, item 274; §7.5) | every shade evaluation for every live island (V05 §3.19 (6)), Update shade now for its island (`by: 'update'`, the document's current epoch) — from the island as it then stands; absent on an island that an epoch's `raiseIsland` (after S6), a T5 declaration or a hand `convert raiseIsland` created since the last evaluation, until the next | every strip (onto the ground and onto islands) on generation, load, replay and every field recomputation — an island without one casts and receives none; the strip's `basis`; the clerk | model digest (≤ 2.5 KB per island; nothing when absent) | rewritten only at those evaluations; kept by every island edit, every scoped regeneration of an island and SKY-F (item 102 (e); J-V5.27) | restored by the undo record of the event whose evaluation rewrote it (absent again where that event wrote the first) | a document whose `schemaVersion` predates the island-basis step of §7.5's schema chain: that step computes, once, the basis of every island not fallen or removed from the island as stored; at or after that version an absent basis is never computed at load — it is an island raised or declared since the last evaluation (J-V5.72) |
| `IslandShadeStrip` onto the ground (V05 §2.3a; §4.5 *Fields*, item 296) | at every shade evaluation (V05 §3.19 (6)), at its first read — volume 1's S9b at S10a's `afterDrivers` hook where registered, else field pass 2 — and each epoch's S6 re-evaluation, whatever `w_sun` is; none from an island without a `shadeBasis` | the field's daylight composition; volume 1's S9b sun factor, hood pins' shade gate and `DistrictContext.shade.islandShare` (the same held strips); the clerk's reader; the shade map view (V09's accessor reads the held strips); the GeoJSON and CSV exports; T-V5-19 – T-V5-21 | held with the field's rasters, rebuilt on load and replay from `shadeBasis` and the committed ground terrain's unlevelled heights (item 309) — never from the live island; never in the log | recomputed only at those moments; kept by every island edit and every scoped regeneration (item 102 (e); J-V5.27) | restored with the field's former state from the undo record of the event that recomputed it | a document whose tables predate item 102 reads `w_sun` = 0 (item 102 (g)'s no-op pin), so the strips it computes change no value |
| `IslandShadeStrip` onto an island; the sky receivers' `shadeSky` (V05 §3.11) | SKY's last step, after every island's own steps; a re-derivation starting after SKY, at S10a's start after the bases; each epoch (V05 §3.15) — from the caster's and the receiver's `shadeBasis` (none where either is absent); at an epoch OR-ed with V06's building mask on the island's lattice (V05 §3.19 (7)) | that island's context vector (`prosperity`); volume 1's sky-arena readers — S7c's `shade` term (through `DistrictContext.shade.meanShare`), S9b's manor sun factor, the close-up hood pins' shade gate and `DistrictContext.shade.islandShare` (V01 §2.3, §3.5.5, §3.8.2; J-V1.87) | derived: rebuilt on load with that island's field from the two `shadeBasis` values | with the strips onto the ground | as above | — |
| `IslandShadeStrip.bits` and the mask layout | with the strip | the field's composition, the clerk, the view | with the strip | a sampler digest that differs from the strip's basis recomputes it whole (as V06 §3.4 (5) does for its mask) | with the strip | — (re-derived on load, never migrated) |
| `accesses`; `SkyAccess.*` (§2.7, §2.8, item 251; §6.3's anchor, item 476) | V05 §3.10 or `placeSkyAccess` | S14 marks, lights, exports, the ground landing row, landings, the reader, `skyAccessObstacles` | model digest | tops re-seated on a re-derived rim by New random (V05 §4.3), and on a resized or reshaped one with their feet re-landed as a move re-lands them (V05 §4.2) | inverse | — |
| the rim strip (its `setback` line and `rim_strip` face) and the island's claims — each island landing `Reservation` (kind `landing`) and the institution claim (§2.5 `Block.interior`, `Reservation`, item 213) | `SKY`'s island L1 batch (V05 §3.10 (5)) | the unit run through `SkyUnitInput.rimStrip`, `.claims` and `.landings` (the outline less the strip, the claims as holes; V01 §3.10.3 (2)); S10b (the top landing plot, the institution); the rim walk by volume 1's `plantRimWalk` (V01 §3.10.3 step 4); the rim lights (V05 §3.13); SKY-F's checks (V05 §3.12) | geometry (the island's arena); the reservations in the model digest | re-laid by one island L1 batch at a resize and a rim reshape — the strip `rimStripM` inside the new rim, each yard re-claimed at its re-seated top, the institution claim kept or re-searched inside its district (V05 §4.2) — and with SKY's island steps at New random on the island and at a Re-derive from SKY or earlier; a yard claimed by `placeSkyAccess` and released by an access's delete | the undo record of the event (or the batch) that re-laid them restores the strip line, the yards and the claim as they stood | — (new; a migrated base island's fresh arena is laid by the same batch) |
| the ground landing yards — `landing` reservations under the data key `reservations.landing` (§2.5, item 213; §4.1, item 282) | `SKY`'s ground L1 batch (V05 §3.10 (4)); re-claimed by a move or a re-landing (V05 §4.2) | S8 (a hole; its attach a destination, item 299); S10a with its hook S9b (V01 §3.1's read-set); S12a; `SkyAccess.ground` | geometry (the ground arena); the reservations in the model digest | re-claimed with their access at every re-siting (Re-derive from S7b or SKY) | the event's or the batch's undo record | — |
| the ground landing allocation row `{ cls: 'sky_landing', at, access }` under `allocations.landing` (§2.5 `Allocation`, item 213) | `SKY`'s access step (V05 §3.10 (4)) — never a rewrite of a row S7b wrote | S10a, which reads it with S7b's `allocations` and takes its staff households from the host district's `modest` demand; S10b, or the hinterland unit's S12a (a plot on a way or a trail); S11 (the landing house); field pass 2's landing kernel (V05 §3.10 (6)) | model digest (the allocation) | recomputed with the access | inverse | — |
| `name` (§9.1, §10.4) | S13a (V05 §3.14) | the island's `QuarterNode` root and its `quarter` `LabelEntity`, the gazetteer, exports | model digest with its naming record | §6.3's naming cases | inverse | — |
| `state`, `stateSince`, `dwellUntilWeek`, `landfall` (§4.11, item 320) | `IslandEpochStep` or a hand `convert` (`removeIsland` among them, V05 §4.2) | epochs, §8.2's state rows, the reader | model digest | never by a re-derivation | the conversion's undo record | — |
| `declared` | a declaring event | every re-derivation (held) | model digest | held | inverse | — |
| `removed` (`seq`, `generated`, `releasedBy`) (§2.8, item 260) | `convert removeIsland` (T10 `hold`'s delete on an island — V09's delete row — or the clerk); `releasedBy` by a later T5 `sky` declaration that re-fills the slot when no slot is free — never by an `adjust('islands.count')`, whose integer counts held slots as filled and opens only free slots (J-VI.14; item 260) | S7b (5)'s slot chain at every re-derivation, V05 §3.15 (5) at every epoch, the report, the clerk's held-slot line (`generated` naming who made the island), `removedSlots(doc)` | model digest | held: never drawn, filled or re-opened by a re-derivation or an epoch (J-V5.62) | the `removeIsland` undo restores the island whole (its arena from the archive, its households, its accesses and landing uses); undoing the releasing event clears `releasedBy` | absent in an older document: no removal |
| `removedAccesses` (§2.8, item 260) | the fold of a `delete` whose target is a generated `SkyAccess`: its ordinal appended | V05 §3.10's siting at every re-derivation that re-sites accesses (Re-derive from S7b or SKY); the `main` succession; the clerk; `removedSlots(doc)` | model digest | held: the ordinal is skipped and counted, the lowest surviving generated ordinal taking `main` | the delete's undo removes the ordinal and restores the access | absent: `[]` |
| island `RetainingWall`s (§2.7, item 245) | volume 1's unit run on the island (item 110 (a)'s levelling at S10, S11); T3 `retaining` and T2 terrace strokes with the island's `key` | the island's marks (in its frame, displaced with it) and labels, the surface top, SKY-F's crypt re-test, the `sky` export collection, the fall's tombstones | geometry (the island's arena) | generated ones re-derive with the island's terrain and plots (item 110 (a)'s rule); drawn ones held | the batch's or the event's undo record | none before item 110 |
| `Reservation.owner`, `.handedFrom` of an S3 reservation an institution island leaves (§2.5, item 286) | S7b (5), when the slot's institution holds the reservation: the owner becomes the hand-over instance, or `commons` with the kind re-typed `park` (V05 §3.5) | S10b (the hand-over instance's placement), S12b (a park), the reader, the clerk | model digest | re-made by a re-derivation from S7b; kept by every island edit | the event's undo record | absent `handedFrom`: no hand-over |
| the island cathedral's crypt site (V05 §3.10 (5)) | SKY's claim site search with the crypt-floor test | the cathedral's basement crypt (volumes 2 and 3's `Basement` record, which persists it); the fate list; the reader | not stored by this volume: the building's basement record holds the crypt | re-tested with every re-claim (a resize, a rim reshape, New random; a move leaves it standing) and at SKY-F's levelled datum | with the claim | — |
| `Decoration.name`, `.source` (§2.7, item 252) | `fallIsland` | labels, the reader | model digest | never | inverse | — |
| `Decoration.members` (`DecorationMember[]`, §2.7, item 252) | `fallIsland` (V05 §3.16 (5)): the covered plots, land uses, reservations, ways and retaining walls by `Id`; the covered raised spans and raised-way piers by their raised way and item 244's support keys | §8.2's `fallen` row (its rubble over each member's face or band — a span's deck band in plan, a support's `ring`; item 408), V06's landfall candidate (V06 §3.5.2), V04's access closures (V04 §3.10), the clerk (V05 §4.5), the per-landfall CSV (V05 §5.5) | model digest | never by a re-derivation of its own; shrunk only by V06's member-leaving `setAttr` of `members` (V06 §3.5.2; J-V6.108) in the batch of whichever op ends a member's cover — a landfall strike, `repairRetaining`, the quarry face's `retypeLand`, `repairRaised`, `dismantle`, or any op that tombstones a member (a raised member whose key its live raised way no longer holds among them); the decoration is tombstoned in the batch that removes the last | the `fallIsland` undo removes the decoration with its list; the writing event's undo restores the prior list | an older list of `Id`s reads as it stands (every `Id` is a member form); absent = none |
| `LandUse.source` of the landfall's quarry (§2.7, item 253) | `fallIsland` (V05 §3.16 (4)) | V04's quarry rules (a `quarry` with a `source` sources nothing underground), the reader, the salvage | model digest | never | the `fallIsland` undo | absent: no landfall source |
| `Way.formerClass` — V06's field, its lifecycle row V06 §2.12 | this volume writes it in `fallIsland` (V05 §3.16 (4)): a covered way's class before it drops to `track`, only where the way carries none | V06 §2.12's row | V06 §2.12's row | V06 §2.12's row | V06 §2.12's row | V06 §2.12's row |
| `Enceinte.condition`, `RetainingWall.state` — the stretch-state profiles of §2.2 rule 5 (items 575, 245) | this volume writes them in `fallIsland` (V05 §3.16 (4)): `breached` over each covered wall stretch's covered length extended over each covered tower's and gate's footprint chord; `decayed` over each covered retaining wall's covered length | §2.7's rows (items 575, 245) | §2.2 rule 5 | §2.2 rule 5 | the `fallIsland` undo restores the prior profiles and `lifecycle` (absent again where the fall wrote the first) | §2.2 rule 5 |
| the `IslandRule` and `IslandInstitution` cells V05 §2.4 adds (`archetypes`, `tags`, `handover`, the `tower` row, `casterAllowanceM`, `shade`, `routing`, `node`, `carry`, `districtHa`, `fabricPrior`, `fabricRingHa`, `cryptFloorM`, `frameMarginM`, `field`'s cells, `surfaceTopPercentile`, `river.sourceShare`, `.pondShare`, `accessCount`, `accessSiting`, `stair`, `fill`, `institutionFit`, `naming`, `export`) (§7.6; V11 §3.1's `islands.json` row) | the table defaults (V05 §2.4) | the mechanisms V05 §1b names per table, and V05 §3.3–§3.21 where each is cited | the table (§7.6) | an `editTable` re-derives from the first reader stage (§7.6's rule; S7b for `node`, `carry`, `fill`, `institutionFit`, `districtHa`; SKY for the arena, access, crypt and shade cells; S7c for `fabricPrior`; S13a for `naming`; none for `export`) | `editTable`'s inverse | a table version without them reads the defaults |
