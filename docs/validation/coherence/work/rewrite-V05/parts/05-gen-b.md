
### 3.8 The island arena: frame, land, rim, terrain, the conjured river (SKY)

1. **Frame.** Computed after the outline (V05 §3.6 (3)): a square centred on the local origin of side 2 × `r_max` × √1.5
   + 2 × `frameMarginM`, rounded up to 10 m, `r_max` the outline's greatest distance from its centroid — so the outline
   grown to 1.5 × its area by the buffer resize (V05 §4.2) stays inside whatever its template and aspect, a spindle as
   surely as a disc; a declared or edited area past that grows the frame by §3.2 (9)'s single-level batches.
2. **L0 batch.** The arena's outer ring (the `margin` role on the island's `Terrain`), then the rim — the outline as one
   closed chain carrying the structural `rim` role on the island (§2.2 rule 7, item 203) — making two faces: the
   **void**, L0 kind `sky`, between the ring and the rim (§2.2 rule 1, item 204); and the **land**, owner the island.
   Every later batch on this arena lies inside the land face.
3. **Terrain.** The island's own `Terrain` (§2.3): the ground's terrain cell; a `hydro` grid at half the ground's hydro
   cell (12.5 m at CITY, 16 m at METROPOLIS: an island's catchments are small); `geology: 'ordinary'`. Heights: a dome
   `(domeM + domePerRadius · R) · (1 − (r ÷ R)²)`, clamped at 0 (`R` the equivalent radius √(A ÷ π), `r` the distance
   from the centroid); plus, for `echo`, §4.2 S1 (1)'s fBm at the ground's relief class with its amplitude ×
   `amplitudeShare`, for `own` the same at a class drawn by S0's relief weights on `island.place` (index `relief`), which
   SKY writes to `terrainEcho.reliefClass`, for `none` nothing; the noise on `terrain.noise` keyed by the island's
   `Terrain`. Where a conjured river is drawn, the surface tilts by `tiltPerMille` along its bearing, downhill toward its
   fall. Void cells hold 0 and are masked. The terrain's `datumCm` is the ground's datum plus the island's `elevationCm`,
   rewritten whenever that changes (V05 §3.9).
4. **The conjured river** (the owner's "magically conjured river"). Where the ground has a river, `A` ≥
   `river.minAreaHa` and a draw on `island.place` (index `river`) is below `river.chance`: the source is the point on the
   long axis at `river.sourceShare` of its length from its upstream end (upstream: against the ground river's flow); the
   course is traced and carved by §4.2 S1 (3)'s rivers by descent on the island's `hydro` grid until it meets the rim; its
   width is `w0 · (flowShare · acc)^0.4` — the ground's width law, `acc` the ground river's accumulation at its reach
   nearest the island's anchor — clamped to [`widthM[0]`, `widthMinorShare` × the outline's minor axis]. Its water face
   enters L0 with `shore` edges, bank kinds by §4.2 S1 (7)'s table; where it meets the rim the short stretch between its
   two banks carries both `rim` and `shore`, and the `WaterBody` carries `fall: true` (§2.3, item 252) — its outfall is
   the waterfall. Its crossing sites are §4.2 S1 (5)'s, on the island, built by volume 1's unit run (V01 §3.10.3 (4);
   §4.8, item 580); a bridge there may carry deck plots by item 110 (d)'s base mechanism like any bridge, and they fall
   with the island (V05 §3.22 (6)). No raised part stands on an island (V05 §3.22 (3)). With no ground river, a **spring
   pond** (`pond`, `river.pondShare` × `A`, at the terrain's highest basin, ties by lattice y then x) by a draw below
   `springPondChance`. `terrainEcho` records the ground river, the relief mode and, for `own`, the drawn class.
   **The island's water is its own (item 111).** The oasis, the arid site's water chances and the oasis's grove and
   gardens are S0's and S1's features of the ground arena (§4.2 S0–S1): SKY draws none on an island, whose water is this
   river or this pond alone, and an island's river echoes a ground river only (an oasis has no bearing to echo). Item
   111's water pull acts on the ground's growth field (§4.2 S3, §4.4), the ground's prosperity field (§4.5's water term)
   and the ground's wells and fountains (§4.7 S10b) only: the island has no growth field, its gradient takes no water term
   (V05 §3.11), and its unit run's S10b reads no well-yield weight and no arid coverage factor (an island has no water
   table; both read neutral). Item 111 (c)'s climate cell multiplies the ground's `w_sun` only (V05 §3.11). So item 111's
   cells at any value leave an island's arena, terrain, river, gradient and context vector as they are for the same
   inputs (T-V5-9 (h)).
5. **F-SKY-TERRAIN** (V05 §3.17) when the descent stalls.

### 3.9 The underside, the ground reference and the altitude (the owner's J98)

1. **The underside profile** (SKY): `kind` drawn by the rule's weights on `island.place` (index `underside.kind`);
   `rimThicknessCm` the rule's; for every kind but `flat`, `depthCm = min(maxDepthM, depthPerRadius · R) · (0.8 + 0.4 ·
   u)`, `u` a uniform on `island.place` (index `underside.depth`), `apexOffset` a uniform point in the disc of radius
   `apexOffsetShare · R` (index `underside.apex`), pulled toward the centroid until the apex lies over the land face, and
   `tiers` the rule's; for `flat`, `depthCm` 0, `apexOffset` (0, 0) and `tiers` 0 with no draw on `underside.depth` or
   `underside.apex` (so a flat island's altitude floor counts no root); `roughness` the rule's; `source: 'rule'`.
2. **The underside tiers** — a pure function `undersideTiers(island)` (`@plat/sky`), view data computed by S14, never
   stored: for tier i = 1 … n (`n = tiers`; none for `flat`) at depth fraction `z_i = i ÷ n`, the ring is the rim eroded
   by `R · (1 − ρ(z_i))` — the kernel's buffer on a transient arena (§3.4, §3.7), integer — translated by
   `apexOffset · z_i` and each vertex moved radially by `roughness · R ÷ n` × a `dmath` noise keyed by the island's render
   key and the tier; tier i spans from `elevation − rim − depth · z_(i−1)` down to `elevation − rim − depth · z_i` (`rim`
   the rim thickness). Underside tier 0 is the rim slab: the rim itself, from the island's **surface top** (below) down
   to `elevation − rim`. A tier whose ring falls below 1 % of the land's area ends the stack; the last tier then runs to
   the apex. So the solid is a stack of nested prisms whose silhouette follows the profile: a `root` hangs a narrow
   stalactite, a `bowl` a rounded belly, a `cone` a straight taper, a `flat` a thin slab.
3. **The ground reference** (SKY, before any plot is cut): `groundRefCm` = the greatest, over the ground's 32 m field
   cells (§4.5) whose centres lie under the island's projected land face or any projected underside-tier ring, of the
   terrain height at the cell centre plus the cell's **caster ceiling** — the greatest of `casterAllowanceM`; the top of
   every caster already placed whose footprint meets the cell (a wall's band, a tower, a gate of any kind, the castle, a
   bridge or pier deck — S5's and S7's, §8.4's casters — and **every raised part committed before SKY, whatever stage
   committed it: its deck top with its parapet, or an aqueduct's channel wall, over the deck's plan, and its raised-way
   piers**, with any retaining wall and levelled platform committed before SKY at its high-side top); and the `towerCm` of
   the heights row of every class with a tower (a church, a keep; §4.7 S11) allocated to the district holding the cell
   (the hinterland's allocation outside the districts) — above the ground datum. It reads only what exists at SKY, so the
   altitude is final before S10a reads the island's shade (V05 §3.19 (6); J-V5.29).
4. **The altitude** `altitudeCm = max(E, rim + depth + clearanceM)` — the law's altitude, raised where a deep root needs
   it so the apex clears the tallest thing beneath by `clearanceM` (J-V5.6) — or the edited value, which the same floor
   bounds (F-EDIT below it). `elevationCm` is `groundRefCm + altitudeCm`. The island's **surface top** — the
   `surfaceTopPercentile` percentile over the land face of its height at each point: the levelled ground there,
   `levelledGroundCm` on the island's key (§4.7, item 309: the platform datum where item 110 (a) levelled the plot or
   block, else the terrain), plus the eave of the building standing there — for a stepped building the eave of the
   **highest massing tier over that point** (its wing's `baseCm + eaveCm`, V02 §3.15.2), so a stepped temple has one
   eave per massing tier — is computed with the underside tiers (underside tier 0's top). The model's strip (V05 §3.19)
   reads underside tier 0's top from the terrain alone at generation and at a re-derivation, and from the full surface top
   at an epoch and at Update shade now, since item 102 (b) lets buildings cast the daylight term only across epochs.
5. **The clearance check** (SKY-F, after the pool's merge and the unit runs): where a caster placed after SKY under the
   projected solid — a building's ridge or tower (a stepped building's top from V02 §3.15.2's stack envelope), a tree's
   crown, a raised part committed after SKY (its deck top with its parapet or channel wall, its raised-way piers), a
   retaining wall's high-side top, or the levelled ground itself where S10 or S11's levelling raises a platform under the
   solid by fill (`levelledGroundCm` above the raster) — stands above `groundRefCm`, `groundRefCm` is raised to its top
   **keeping `elevationCm`** — `altitudeCm` becomes `elevationCm` − the new `groundRefCm` — and only where (4)'s floor
   then fails is `elevationCm` raised to meet it (a listed fate), so an island whose clearance already holds does not
   climb; SKY-F never writes `shadeBasis`, so the island's strip keeps its pass-2 basis until the next shade evaluation,
   across saves and loads, reported `shade basis behind: clearance` (F-SKY-CLEAR, V05 §3.17). **Measurement (P0):** over
   1 000 islands at CITY and METROPOLIS, with item 110's terrace, raised-way and deck-plot rows on (their defaults), the
   share raised here ≤ 1 %. **Pre-decided fallback:** `casterAllowanceM` becomes the measured 99.9th percentile of the
   caster tops found under islands (the same caster set), rounded up to 5 m, and is re-measured once. The clearance also
   holds after every epoch (V05 §3.15 (7)).

### 3.10 Access — the tops, the feet, the landing claims (SKY)

1. **How many.** A prosperity island: `min(accessCount.max, 1 + ⌊areaHa ÷ accessCount.perHa⌋)`, the first `main` and the
   rest `service`; an institution island: its row's `accesses`. **A removed ordinal holds** (J-V5.62): at every re-siting
   (a Re-derive from S7b or SKY) the ordinals in `SkyIsland.removedAccesses` are skipped — no top, no foot, no claims —
   and counted toward the number, so no replacement is sited; the lowest surviving generated ordinal takes `main` (an
   institution row's `guarded` role kept by its own ordinal), the rest `service`.
2. **Directions.** `d_1` is the bearing from the island's world centroid to the nearest ground district's centroid;
   `d_k = d_1 + (k − 1) · 360° ÷ n`. Each top is the point where the ray from the centroid at `d_k` last leaves the land
   face.
3. **The kind at each top**, among the access rows admitted by the recipe's `magic` circumstance (a `guarded` access is a
   `hoist` only): `hoist` or `stair` where the top's world point lies on ground land in an admissible face — a district's
   L1 face that is no reservation, claim or wall strip, or a hinterland L1 face, less every raised-way pier footprint,
   every raised deck's plan dilated by `accessSiting.deckGapM` and every item 110 (d) deck face (V05 §3.7 (2); J-V5.60) —
   and the altitude is within the row's limit; `ropeway` or `lightBridge` where an admissible land point lies within the
   row's horizontal run of the top (the point nearest the town's main plaza for a rope line; the highest ground for a light
   bridge; ties by lattice y, then x). One weighted draw among the admitted kinds on `island.place` (index `access:k`).
   **A slanted access over a raised part:** a `ropeway` or `lightBridge` whose straight segment from its top to its foot
   passes over a raised part's deck or a raised-way pier keeps `accessSiting.lineClearM` above its top (the deck with its
   parapet or channel wall, the pier's head) along the whole crossing; failing that, the candidate foot is refused and
   F-SKY-ACCESS takes its next direction step.
4. **The foot.** A `hoist` or `stair` foot is the top's world point; a `ropeway` or `lightBridge` foot the chosen land
   point. Feet keep `accessSiting.footGapM` apart: a later foot inside the gap of an earlier one moves to the nearest
   admissible point outside it (ties by lattice y, then x). A foot and its landing yard stand on part-0 land only: never
   on a deck face, a raised-way pier or inside a raised deck's plan dilated by `deckGapM` — a yard that would meet one is
   slid along the spine to the nearest position clear of it, else the foot moves as a gap violation does. **"The nearest
   way"** here and in V05 §3.12 is a **walkable part-0 way**: a raised part's deck counts only at the ground vertex of its
   ramp or stair foot, an aqueduct never (it carries water, not traffic). **In a district**, the foot is moved along the
   perpendicular to the nearest L1 way spine within `wayReachM` — or for a vertical access the landing yard is stretched
   from the foot to that spine — and SKY's ground L1 batch claims the landing yard (`claimSubFace`, `yardWidthM ×
   yardDepthM`, touching the spine) as a ground `Reservation` of kind `landing` (data key `reservations.landing`, V05
   §3.1) with its attach vertex on the spine. **Where no spine lies within `wayReachM`** (at SKY only S3–S7's arterials,
   boundary ways and gate plazas exist), the yard is claimed at the foot itself, its attach vertex on the yard's side
   facing the nearest way, and the attach is registered as a **destination** S8 must reach (§4.6, item 299): S8's first
   cut in that face runs from the attach to the nearest way by §4.6's lane rule, as a gate's attach is reached, and SKY-F
   checks that a way meets it (V05 §3.12). Either way SKY writes, under its data key `allocations.landing` (V05 §3.1),
   the positioned row `{ cls: 'sky_landing', band: 'modest', count: 1, claim, at: foot, access }` for that district — a
   row of its own beside the district's `Allocation`, never a rewrite of a row S7b wrote; its two staff households are the
   row's, and S10a takes them from the district's own `modest` residential demand when it reads `allocations` and
   `allocations.landing` together. **In the hinterland**, the landing is an outside site: the same row under
   `allocations.landing` for the hinterland's `Allocation`, sited by S12a at the foot and given its trail to the nearest
   way by the hinterland unit, as a decoration's trail is (§4.9). A `secret` access's ground landing is fronted (V05 §2.2).
5. **The top.** One `splitThrough` at L0 on the rim places the access's `('sky_access', id)` vertex, pinned; SKY's island
   L1 batch then lays the **rim strip** — a closed L1 line `rimStripM` inside the rim carrying the `setback` role on the
   island, its strip face typed as a block interior `rim_strip` (§2.5, item 213) — and claims each top's **landing yard**
   (`yardWidthM × yardDepthM`, from the rim inward across the strip) as an island `Reservation` of kind `landing` with its
   attach vertex on the yard's inner side, and, for an institution island, the **institution claim**: one `claimSubFace`
   of the row's `areaHa` (§4.5 S7b (3)'s compact claim shape) on the land face less the rim strip and the landing yards,
   searched over the sites of an `institutionFit.siteLatticeM` lattice (the claim's centre) whose claim fits there, by a
   named score: a **palace** the greatest mean terrain height under the claim among the sites on the half of the land
   facing `d_1` (the site's projection on `d_1` from the centroid ≥ 0; the whole land if none fits there); a **cathedral**
   and a **tower** the least distance from the site to the land face's centroid; a **prison** the least distance to the
   centroid among the sites whose claim dilated by `institutionFit.prisonMarginM` still fits. Ties break by lattice y,
   then x (J-V5.12's rule for every search here).
   **The crypt test** (item 109 (k) (2), J111; J-V5.43). The crypt lies **under the building's lowest massing tier,
   inside underside tier 0 (the rim slab)** (J-V5.66): a stepped cathedral or great temple of V02's `stepped` rows keeps
   its crypt beneath massing tier 0. For an instance whose class carries a crypt `always` (V11's crypt column: the
   cathedral and the great temple), a site passes only if, at every point of the claim, the island's terrain height less
   the full basement depth (220 cm, V02's basement form) lies at least `cryptFloorM` above the rim slab's base,
   `elevationCm − rimThicknessCm` — so the crypt, the settlement's largest, is a vault cut into underside tier 0, which
   exists for every underside kind, `flat` included. With the default rim this holds wherever the terrain lies above
   −6.8 m, so it excludes only an `own` relief's deep basin. If no site passes, the best site by score is taken and the
   crypt takes the half-sunk form (V02's basement ladder, full → half → raised), listed as a fate ("the rock is too thin
   for a full crypt here") and reported by F-SKY-CRYPT (V05 §3.17). The crypt is part of the cathedral's building — its
   basement record, whose rooms V03 plans — never an `UndergroundSystem` part, never an item 109 (j) (3b) link and never
   a catacomb source (V05 §3.5; item 2). Every later re-claim (a resize, a rim reshape, New random, a terrain edit on the
   island) re-runs the test, a change of form listed as a fate. **After levelling:** the claim is searched at SKY on the
   terrain; SKY-F re-runs the test on the cathedral's plot at its levelled platform datum (`levelledGroundCm`, item 309)
   where the unit run's S10 or S11 levelled it, since a platform cut into a slope lowers the floor — a form change listed
   as a fate, F-SKY-CRYPT's ladder as before.
6. **The ground's field** gains, at field pass 2 (S10a), a positive kernel at each ground landing (`landingKernel`; §4.5,
   item 295): the land by a landing trades with the island above.
7. **F-SKY-ACCESS** (V05 §3.17) where a top has no admitted kind.

### 3.11 The island's field and its context vector

**An institution island** is uniform: its prosperity is `v(requirementBand)` of its row (one building and its staff).
**A prosperity island** carries a **gradient** that gives each carried band a share of the island's land equal to its
share of the carried plot land, the richest on the best ground (J-V5.18; the owner's "prosperity is a gradient and a
band"). On the island's 32 m lattice (the cells whose centres lie in the land face less the rim strip), SKY computes

`P_I(x) = smooth(Q(r(x)) + ε(x)) − w_sun · shadeSky(x) + brush(x)`, clamped once to [0, 1] and banded by the town's
`FieldBands` cuts (the island belongs to the town's band set):

1. **The site rank** `r(x)` ∈ [0, 1]. Each cell's elevation rank `e` (the percentile of its terrain height among the
   cells) and view rank `v` (the percentile of `view(x) = (1 − d_rim(x) ÷ R) · (1 + cos(θ(x) − θ_town)) ÷ 2`, `d_rim` the
   distance to the rim, `R` the equivalent radius, `θ(x)` the bearing from the land centroid to the cell and `θ_town` the
   bearing from the land centroid's world point to the town's main plaza) are combined as `field.rank.elevation · e +
   field.rank.view · v` and re-ranked to `r`, ties by lattice y, then x: the high ground and the rim that looks over the
   city rank first. On a `none` terrain every `e` ties and the view decides.
2. **`Q`** maps rank to value by the carried bands' shares. With the carried bands `b_1` (richest) … `b_m` and their
   shares `s_j` of the carried plot land (Σ `plotArea(c, b_j)` × count over each band's rows, V05 §3.5 (2)), the ranks
   from `1 − Σ_{i ≤ j} s_i` to `1 − Σ_{i < j} s_i` map linearly onto band `b_j`'s inner range `[lo_j + ι, hi_j − ι]`,
   `lo_j` and `hi_j` its two cuts on the absolute value (the lowest band's lower cut 0, the top band's upper cut 1) and
   `ι` = `field.bandInset` × `(hi_j − lo_j)`, so ε and the smoothing move a cell within its band far more often than
   across a cut.
3. **ε** — the base's low-frequency fBm (§4.5) on `field.chance` keyed by the island, wavelength
   `field.epsilonWavelengthM`, share `epsilonShare`; **smooth** — the ground field's Gaussian of one block width (§4.5's
   O(N) three-box blur) over the lattice.
4. **`shadeSky`(x)** — the share of the model sampler's samples (§4.5) in which a higher island's solid blocks the sun at
   x (the OR, sample by sample, of the strips onto this island, V05 §3.19), and, after an epoch, the island's own
   buildings (V06's building shade mask run on the island's lattice, V05 §3.19 (7)); the island's gentle relief casts
   nothing on itself (J-V5.33). `w_sun` is item 102's weight as filed: item 111 (c)'s climate cell, which multiplies it
   on the ground (§4.5), does not apply on an island (V05 §3.8 (4)).
5. **`brush`(x)** — the island's prosperity brush strokes (`setField` with `key`, V05 §4.2) as §7.2's stroke overrides; a
   declared target mean (`setAttr(field.prosperity)`, `declared.field`) adds one uniform shift so the lattice mean of
   `smooth(Q + ε)` equals it.

The gradient takes no water term: item 111 (b)'s term is the ground field's (§4.5; V05 §3.8 (4)). With ε, the shade and
the brush at 0, each carried band holds exactly its carried share of the lattice cells (within the smoothing's boundary
cells), so §4.7 S10a's band capacity on the island houses every carried band on its own ground and its band-range step
re-homes none of them (T-V5-9). `SkyIsland.field` records `prosperity` = the lattice mean of `P_I` (for the reader and
the report), `density` = the mean of the ground's density field over the cells whose prosperity band is one of the
carried bands, and `greenery` = the same mean of the greenery field plus `greeneryBonus`; `SkyUnitInput.field` carries the
raster before the brush (the unit run applies the strokes as the ground's field step does). The raster is never stored:
it is rebuilt on load from the island's terrain, rim and allocation, the cuts and the stroke list, as §2.9 rebuilds the
ground's fields.

**The context vector** on the sky arena (§2.5, item 213: `arena: 'sky'`) reads: `prosperity` = `P_I` at x (bilinear on
the lattice); `density` and `greenery` as `field` gives them; `dist.centre` to the land's centroid; `dist.plaza` and
`dist.market` to the institution claim on an institution island, else the route distance (V05 §3.20) to the ground's
plaza and to its nearest market; `dist.gate` to the nearest landing attach (a landing is the island's gate); `dist.wall`
to an author's island wall (V05 §3.21), else none; `dist.water` to the conjured river or pond; `dist.shore` to the rim;
`slope`, `aspect`, `upstream` and `terrainClass` from the island's terrain (`high`, but `damp` within 10 m of island
water); `upwind` from the ground's wind; `growthStage` 1; `arena: 'sky'`. Volume 1's field step on the island (V01
§3.10.3 (3)) reads these values through `skyUnitInput` — they replace a character offset from `h(S_carried)`, since a
supply fraction is not a prosperity value.

### 3.12 The unit inputs, and what the unit run must honour

SKY builds each island's `sky` request (V05 §2.3) and calls the unit runner; the runner reads `skyUnitInput(doc,
island)` — the claims, the landings, the river, the allocation, the field and the context. **The fabric hint is a
prior, never a strategy** (J-V5.48): on every island district, S7c's template draw multiplies the weight of the hinted
template by `fabricPrior` and chooses as it does anywhere; the hint is a prosperity island's `ring` from `fabricRingHa`
and `bent-cut` below it, and an institution island's row's (`street` for a palace — an axial avenue from the main landing
to the forecourt; `landmark` for a cathedral; `square` for a prison or a tower), always a valid `FabricStrategyId`
(V01 §2.1). The unit run (V01 §3.10.3, which states each of these as its own step) writes only the island's arena; never
cuts or plots the rim strip, which it plants as a rim walk once, after its districts' S12b, by `plantRimWalk` (V01
§3.10.3 step 4; §4.9's rim-walk row, item 313; J-V5.26); reaches every landing attach with a way (the island's gates);
cuts the institution claim as a hole and places its institution there by S10b; uses the river's crossing sites as V01
§3.10.3 (4) qualifies and builds them (a site whose far bank no street reaches stays a `site`, reported in
`requestedVsBuilt`); splits the allocation over its districts; reads the island's field from the unit inputs; measures
every pull to a class on another arena by the route distance (V05 §3.20); levels island ground by item 110 (a)'s
thresholds as the ground's S10 and S11 do, laying each retaining wall it raises on the island's arena and never on the
rim strip or along the rim (V05 §3.22 (4)); leaves `SeamReport.portalsTotal` 0; and returns its district ids, which
SKY-F writes to `SkyIsland.districts`. The seven inputs this volume owns — the call, no S1 on the island, the field, the
claims with the rim strip, the `sky-*` kinds, the fabric prior and the district count — are V01 §3.10.3's steps 1–4 as
written there.

**SKY-F checks** that every landing yard holds a `sky_landing_top` plot, that a way meets every island attach, and that a
walkable part-0 way meets every ground landing attach after S8 (the destinations of V05 §3.10 (4)); that no island
`RetainingWall` stands on the rim strip or along the rim (V05 §3.22 (4)); and it re-runs the crypt test at the levelled
datum (V05 §3.10 (5)). A missing island way is repaired by one island L1 batch laying the shortest lane from the attach
to the fabric (S8's lane width), a missing ground way by one ground L1 batch in the landing's district doing the same
(the district's own lane rule), and an unreachable landing is reported by F-SKY-ACCESS's last rung. A unit run that
returns no district (an outline face below one district's size, V01 §3.10.3 (2)) hands its whole allocation to
F-SKY-UNIT (V05 §3.17).

### 3.13 Lights (SKY-F; the sky rows of §4.7's light table, item 307)

| host | what | defaults (own, `extension`) |
|---|---|---|
| `rim` | magical orbs along the rim strip's outer edge | every 40 m, 2.5 m high, 60 cd × `h_carried`, radius 18 m, orb 30 cm, cool, steady |
| `keel` | one downward magical source at the root's apex (a `flat` island's: the rim slab's base under the land centroid): the glow beneath the island | 4 000 cd × `h_carried`, radius the apex's clearance + the row's `radiusMarginM` (30 m), size 3 m, cool, steady |
| `skyAccess` | a lantern at each top | 25 cd, 3 m, radius 12 m, fire, flicker |

The island's ordinary fabric — its ways, doors, squares — takes the ground rows (arena `ground`) as any district does;
each ground landing's lantern is its `sky_landing` class's `door` row. The `magic` circumstance gates no sky row: the
island is the magic that holds it up (J-V5.9). A waning island's magical lights scale with its `h_carried` at each epoch;
a settled island's are 0; a fallen or removed island has none (its `LightSource` records are tombstoned with its arena,
V05 §3.16 (7), §4.2). An island whose `h_carried` is 0 at SKY-F (a declared island held against its supply, J-V5.10)
lays its rim and keel rows at 0 cd — present, unlit — and its access lanterns, which do not scale.

### 3.14 Names

S13a draws each island's name on its `naming` stream (§6.3's cases), reading the features: the reason and the
institution's kind; the echoed river's name; the name of the ground district nearest below (ties by district address);
the altitude class (low below `naming.lowBelowM`; high from `naming.highFromM`); the town's culture row (§10.4). The
grammar rows are V11's (the slice `naming.island`). Each island is the root of its own `QuarterNode` (members its
districts, `cityCut` true), named with the island's name, so its `quarter` label draws at the city band at CITY and
METROPOLIS alike; an institution's own name is its `landmark` label; a landfall's `place` label takes the grammar's
fallen form of the island's name (V05 §3.16). With no river echoed or no district below (an island over water or
fields), those features are absent and the grammar's rows that need them are skipped; a renamed island (T11) keeps its
name through every re-derivation by §6.3's naming cases.
