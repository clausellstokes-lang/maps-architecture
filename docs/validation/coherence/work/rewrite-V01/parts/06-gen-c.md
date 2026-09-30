### 3.6 Context features (stage-2 feature S2)

Every district gets the feature its context calls for, whatever its fabric; S2 (a)'s coverage matrix (V01 §7) reads
them. The features run in S8's district batch (§4.6's strategy slot, item 298).
1. **Waterfront** (a `water` seam run ≥ `feature.runM`). S8 lays a **bank path** — a `path`-class spine along the shore
   setback's inner line (a parallel spine at `onEdge` with the path's own width, V01 §3.4.3) — when D's kind is `docks`
   or `riverbank` or its band is ≥ `comfortable`, and no noxious water trade (a class whose profile emits water
   pollution, V11 §2.3) is allocated to D, and no quay way already runs along that run; otherwise the **rear-plot water
   rule** holds: plots whose rear line lies within `dBar` of the shore setback extend their rear to it and take a `shore`
   yard part (§4.7 S10 (6)) with the water access edge (realism: working riverbanks keep their plots to the water;
   promenades belong to richer and harbour quarters). A `quay` template's spine satisfies the feature on its run. A
   closure-only water arc (item 106 (a): deep water closing the circuit, no wall) is a `water` run like any.
2. **Wall-side** (a **walled** `wall` run ≥ `feature.runM`: a `full` or `parapet` stretch of the `ChainProfile`, item 106
   (c)). The intervallum where the era row has one and the stretch is `full` (§4.8); otherwise — a `parapet` stretch, or
   an era without intervallum — the base's own rear-plot behaviour: S8's lanes end on the inner setback line, so the
   plots back onto the wall strip — the rear-plot rule S2 (a) counts. A `wallside` template adds the wall street.
3. **Slope.** A `lane`, `alley`, `cul_de_sac` or `path` whose `slopeP95` (§2.4: the unlevelled terrain along its spine,
   never rewritten by S10–S11's levelling, re-sampled by a terrain stroke) exceeds its class's `rampMaxGrade` in volume
   11's `ways.crossing` row (item 110 (a)'s way-class rule: the grade above which a way of that class is a stair rather
   than a ramp) is a **stair-stepped way** — one threshold, stated once (J-V1.72): S14 draws it with step ticks at the
   district band and finer (V01 §5.1.2); the naming context reads its shape `stepped` (V01 §3.7.2). No model field: a
   pure function of the way's slope. A stair-stepped lane may also be carried on vaults beneath (II.7.6's `vaultSlope`
   source, the base's and volume 4's); this volume neither draws nor reads that. A way crossing a `RetainingWall` carries
   a stair or ramp **interval** at the crossing (the base's way-class rule, an attribute of the way, item 110 (a)): it
   never changes the way's `shape`, `slopeP95` or name, and S14 draws it by `way.stair` (V01 §5.1.2).
4. **Bridge approach.** The portal gap (§4.6 step 7) keeps lanes off a bridge end; S9b's `bridgehead` squares and the
   `bridgehead` template read it — a part-0 deck over water (V01 §2.3's parts table). A raised road's ramp or stair end
   takes the portal gap extended over its rise (V01 §3.17.3 (4)).
5. **Gate approach.** The base's gate plaza (§4.8); nothing added. An aqueduct's arch through a curtain wall and a raised
   gate at deck level are wall openings, not gates: no gate portal, no gate plaza and no wall-side feature reads them
   (V01 §3.17.3 (6)).
6. **Sky.** No portals but the landings' attach vertices; the outline's seams are `sky` (hard); the rim strip (volume 5)
   lies along them, and a margin band only where a run has no rim strip (V01 §3.10.3).
7. **Barrier edges** (item 106 (a), (f)). A boundary run on a barrier-closure arc is typed by its barrier kind by II.1's
   seam typing (item 541; J-VI.3's six kinds): an `enceinte` arc — an earlier ring's curtain closing a later circuit — is
   a walled run whose stretch class is that enceinte's, which (2) reads like any. A `cliff` or `marsh` run takes the
   rear-plot rule — the plots back onto its setback line as onto a wall strip — and never a wall street; the panel names
   it ("the cliff is the wall here", the clerk's line, item 106 (g)).
8. **Terraced wards** (item 110 (a)). A district whose `terrace.asks` holds (V01 §2.3) is terraced. Inside it the base's
   S10 and S11 levelling levels each plot to its fronting street, so wherever the contour series or the bent cut's lanes
   run along the contour, each block's two plot rows meet at a rear line that a **base-produced** wall holds once the step
   passes `terrace.stepMinCm` and the slope `terrace.slopeMin` (V11's `terrace` row) — **this volume produces no wall
   there** (one producer per wall line; J-V1.61). Where `slope.meanPct` lies at or above the `stepped` row's
   `slopeMeanPct` cell (V01 §3.3.3) and below 100 × `terrace.slopeMin`, the `stepped` row lays its contour streets, the
   ward takes no edge wall (`walls` is false) and the base walls only those of its levelled units steeper than
   `terrace.slopeMin`: terraced streets standing mostly without retaining walls. Along D's edge the base's district-edge
   source raises the ward-edge wall by its rule (§4.7 S10, item 302); this volume supplies its inputs (`terraceState(D)`,
   `TemplateFabric`'s `terracedEdges`, V01 §3.17.1 (4)). S2 (a)'s coverage matrix gains the row "terraced district × a
   ward-edge wall, or none with its reason (below the slope threshold, no soft backing run, no step)".

A district with no water, wall, slope, bridge or gate run takes none of (1)–(5) and reports nothing; S2 (a)'s matrix
counts only the districts a context applies to.

### 3.7 Local identities — places, street names, surfaces

#### 3.7.1 Named local places (`HoodPlace`)

S13a's **local-place step** is a registration of `@plat/hood` inside S13a in two passes around the way names: **(a) the
creation pass**, before the ways are named, creates or keeps one `HoodPlace` record — kind, host, lineage, no name — for
every block of content `square`, `green` or `yard`; every court residue of area ≥ `court.nameMinM2` — one place per
residue even where a `RetainingWall` crosses it, labelled on its largest level piece (V01 §3.17.1 (7)); and a `square` or
`park` template's or a void square's plaza (hosted by the plaza's reservation block or, for a void, the junction's
largest corner block); **(b)** S13a names the ways, reading these records (V01 §3.7.2); **(c) the naming pass** then names
each place from the naming engine (§10.4, item 444) on `naming` keyed by the place's lineage (V01 §2.8), from
`naming.place`'s rules (V11) conditioned on: the place's kind and `squareType`; its centrepiece pin kind (a square named
for its well, cross or statue); an adjacent landmark (a church's name gives a close, a forecourt a square); the dominant
trade family of the plots fronting it (σ-weighted, ≥ 0.3 share); D's identity row; a proper-name source for courts and
yards (a surname in the possessive) — never a way's name, so the passes have no cycle. Uniqueness is §9.6's, per district
per kind. Its **knowledge** defaults from `hood.placeKnowledge`: `square` and `green` `public`, `court` and `yard` `local`
— so a court's name shows to the public only at the neighbourhood band and finer (§9.2's admission), the owner's "known
only locally" (item 30) given to the places a neighbour would know. A dossier naming claim may name a place (§7.7 item
82); its name is then dossier-owned (DR14). Its `LabelEntity` is kind `place` (§9.1, item 422), `lod` the district and
neighbourhood bands for squares and greens and the neighbourhood band for courts and yards, spine candidates by §9.3's
area rule on its host face. The step is `extension` — it runs only while `fabric.extensionWeight` > 0 (V01 §3.15), so the
parity presets create no places. Its place kind `court` names a **block's court residue** (§4.7 S10 (6)) and nothing else:
a footprint's court — a hole of a footprint face, which S11 types a yard part `court` (§4.7, item 303): a manor's
enclosed court, an `ovalCourt` arena's floor — is never a `HoodPlace`; it is named only as its building's yard part.

**Openings** (item 109 (j) (3) (ii), (k) (2); J-V1.76). The underground tail (volume 4), after its systems and their
`AccessPoint`s are laid, runs this step's **opening pass**, which selects by volume 4's record fields — never by an
access's kind alone, since `mouth` is also the kind of a sewer outfall, a culvert inlet, a quarry's adit end and a
skylight: one `HoodPlace` of kind `opening` (1) per **public opening** — an `AccessPoint` of source `opening` and role
`access` (V04 §3.5.7 (e)), its subtype the access's kind: `sinkhole`, `mouth` (a cave mouth), `collapsed_shaft` or
`ruin_entrance` (II.7.4, item 554); a skylight, a `mouth` of role `light`, makes no place — and (2) per **catacomb
entrance** — an `AccessPoint` of kind `stair`, source `system`, whose `cause.system` is a `catacomb` system (V04 §3.5.1
(9)), a quarry ossuary's stair at its working's surface head included — subtype `catacomb`. No other access makes a
place: a sewer's `mouth` (source `system`, its system the sewer), a quarry's adit, a grating and a neighbourhood or
lifeline stair keep their symbols only (V01 §3.8.8, §5.1.2). A place is named from `naming.place` with the opening's kind
as a feature ("the Sinkhole", "the Old Mouth"), its `knownTo` is the AccessPoint's, and it lives as long as its host while
the step runs (V01 §2.7). **A catacomb entrance** sits only on cemetery ground (item 109 (k) (2); II.7.6, item 560): the
churchyard part of a church, temple or cathedral plot — never inside the footprint of a church-class building (V03
§3.7.1's class) —, a separate burial ground's face, a monastery's burial face, an extramural cemetery's face in the
hinterland, or, at CITY and METROPOLIS only, a quarry ossuary's surface head (its working's shaft and stair, V04 §3.5.1
(9)); its place draws no name of its own but carries its catacomb's (volume 4's label rule), and its knowledge is the
AccessPoint's. **No crypt gets a place or a pin**, the cathedral's included: a crypt is `Basement.crypt`, a basement fact
(V03 §3.7.4; §2.6, item 238; J-VI.17 H33), and a crypt joined to a catacomb by a (3b) link adds no second entrance. A
building's dug access (a cellar stair, a shaft, a well that broke through, (j) (3) (i)) gets no place: hosted by the
building or its basement it draws no surface symbol — the building's plan draws its head (V03 §3.7.2 (5)) — and opening
in a yard it is a symbol on its plot (V01 §3.8.8). An unexcavated void puts nothing on the surface. A town with no
underground layer (the layer off) runs no opening pass and has no opening place.

**A place made by hand.** T11's name tool on an unnamed court residue, yard or square creates its `HoodPlace` with the
typed name: a `setAttr(name)` on a new place minted from the event's `seq` (V01 §2.8); its lifecycle row and undo are
`HoodPlace`'s (V01 §2.7).

#### 3.7.2 Local street names — the way-naming context (item 444)

S13a names every way (§4.10); this volume fixes what the grammar is conditioned on, so a lane's name says what is on it.
For each way S13a builds a `WayNamingContext` (V01 §2.3): `shape` — `ring` for a ring course, `stepped` for a
stair-stepped way (V01 §3.6 (3)), `curved` when a fillet arc spans ≥ `name.curvedShare` of its length, `bent` when it
keeps a corner of ≥ `name.bentDeg`, else `straight`; `to` — the kind of the node or place it leads to (a gate, a market,
a bridge, a church's forecourt, the castle, the harbour, a named square or well), read from `Way.from` / `Way.to` and the
`HoodPlace` records at its ends (created by the creation pass before the ways are named, V01 §3.7.1); `landmark` — a
reservation of σ ≥ 5 within `name.landmarkM` of its frontage; `trade` — the class family of ≥ `name.tradeShare` of the
σ-weighted uses fronting it (§4.5 (1)) — the way a chain's street takes its trade's name, never a quarter (items 104 (h)
(3), 107 (e)); `band` — the band of its fronting plots; `districtIdentity`; `water`; `slopePct`; `placeOnIt`;
`terraceIndex` for a contour street (V01 §3.4.3), on which V11's `naming.way` rows may guard "Upper / Middle / Lower
Terrace" by weight. Ways are read by V01 §2.3's parts table: a raised road takes `shape`, `to`, `landmark` and `raised`
(its kind, for `naming.way`'s guard) only, its kind word the base's; an aqueduct takes no context. A crossing's stair or
ramp interval never changes `shape` (V01 §3.6 (3)), so retaining walls cause no name shift (V01 §8.1). The grammar's rows
(volume 11) guard on these features with weights — a street to the gate for its gate, a lane of tanners for its trade, a
crooked lane for its shape, a stair-stepped alley as steps, a row for a straight lane of one terrace, a proper name
otherwise — so no feature is a strict priority, and two lanes of one trade in one district get distinct names by §9.6's
uniqueness. The context is derived at S13a from eager records, so names stay eager model data (§4.10). The features land
at M1 (V01 §8.1); the squares and places S9b and S13a add at M5 give some ways a new `to` or `placeOnIt`, a declared M5
shift of those ways' names (V01 §8.1, §13.3's shift record). A way with no feature (no destination, landmark, trade or
place) takes a proper name.

#### 3.7.3 Way surfaces (item 207)

At S10a's end, after field pass 2, every way without an edited `surface` takes the `way.surface` table's value for its
class, the era row and the band of its **fronting blocks** (the area-weighted pass-2 value of the blocks whose frontages
lie on it, both sides). Default rows (ours): `through`, `primary` — `paved` (setts) at `comfortable` and above in eras
from the high medieval, else `cobble`; `secondary` — `cobble` at `modest` and above, else `dirt`; `lane`, `alley`,
`cul_de_sac` — `cobble` at `comfortable` and above, else `dirt`; `track`, `path` — `dirt`; `quay` — `paved`; `pier` —
`planks`; `bridge` — `paved` for a stone bridge, `planks` for a timber one (`Bridge.kind`, §2.7); `ford` — `dirt`. A way
with no fronting block (a way through the hinterland, a ford) reads the row at the pass-2 value at its midpoint. A raised
road has no fronting blocks, so it takes the base's value from its record (masonry `paved`, timber `planks`, by its
material row, volume 11's `raisedWays.structure`), never this rule; an aqueduct has no surface (V01 §2.3's parts table).
The `hatched` family's road programs read the surface (V01 §5.1.2); the `MFCG` preset draws none of it. An epoch
re-derives surfaces on ways whose fronting band changes past the hysteresis (§4.5), run by V06 §3.4 (9) as the `field`
phase's last act, an edited `surface` kept and a `setAttr` (cause `rule:field`) written where the value changes. A way
bounding a re-derived district reads both sides, so its surface and its naming record belong to that district's seam
exception (§7.3 item 1, item 369): a replace dry run lists each shared way whose surface or name changes among its fates.

#### 3.7.4 The district's naming features (item 444)

§10.4's district naming (V11's `naming.district`) reads, beside its existing features, the neighbourhood's own: `fabric`
(the `hood.templates` row), `hasManorBlock`, `hasGreenBlock`, `ringCentre` (`square` | `green` | `manor`, the ring
centre's content), `terraced` (D's `terrace.asks`, V01 §2.3) and `small` (D's area below the lower third of the town's
district areas; for a standalone neighbourhood document, the `small` chip). V11's rows guard on them with weights, never
as a strict priority — a rings district may be named for its rings, a square district for its square, as Neighbourhood
names a hood by its template (NG D1) — and T-V1-24 checks name–feature consistency.

### 3.8 The refine close-up — what opening a district derives

#### 3.8.1 Trigger

§4.1's policy: under `elaborate: 'click'`, a click on a district (at the city or district band) derives its close-up and
raises its buildings' `wings` rung (II.4); a click on a building at these bands is this click, which also selects the
building and opens its panel without deriving its rooms or plan (V03 §4.5; V02 §3.11); under `'view'`, every district
with a visible tile at the neighbourhood band derives its close-up within V01 §6's budget; the outline close-up
(V01 §3.8.9) derives those of the districts and hinterland faces an outline meets **and raises the `wings` rung of every
building inside the outline, centre-out from the outline's centroid**, as a district click does (V02 §3.11's trigger) — a
cemetery chapel, a mill, the hinterland's farmsteads. The derivation runs in the derivation pool (or the generation worker
with the pool off), never in the tile worker, and delivers its marks as a `DisplayDelta` of group D (§8.9). Opening,
closing or reopening any number of districts leaves the model digest unchanged (II.5).

#### 3.8.2 The neighbourhood-tier pins (`HoodPin`; II.3, item 58 (c))

For each block of D in lineage order (and, in an outline close-up, each hinterland face in face order), each site drawing
on its own stream — `pin.decor` keyed by the block with the stage component `STAGE_VIEW` (§6.1) and the site's ordinal as
the pick ordinal — in the order gate, kind, size, angle:
1. **Sites**, in order: `court` — the block's court residues (residue order); `plotYard` — its plots' yard parts of kind
   `yard`, `garden`, `court` (a footprint's court, item 303 — except the floor of a building whose `MassingRef.family` is
   `ovalCourt`, an arena's floor, which takes no pin), `forecourt` or `churchyard` of area ≥ `pin.siteMinM2` (plots in
   address order, parts in order); `yardBlock`, `square` — for a `yard` or `square` block, four edge sites (its face's OBB
   corners inset `pin.edgeInsetM`) and, when no model centrepiece stands there, its pole; `green` — for a `green` block,
   its pole and the two next clearance maxima of §3.8's `spine` reader; in the hinterland, `cemetery` (a cemetery or
   burial-ground land-use face: its pole and four edge sites), `fieldEdge` (a field's two corners nearest a way) and
   `outsideYard` (an outside plot's yard parts ≥ `pin.siteMinM2`). A site's **point** is its face's pole of
   inaccessibility (the spine summit), else the next clearance maximum. A court residue a `RetainingWall` crosses is read
   as one site per level piece (the pieces its wall lines cut it into), each with its own pole, pieces below
   `pin.siteMinM2` dropped; no site lies on a deck plot or in an under-deck strip (V01 §3.17.3, §3.17.6). A block with no
   site derives no pin.
2. **Prior picks.** Before a block's first site, every model pin already in the block — §4.7 S11's decoration rows, a
   square's centrepiece, a singleton — counts as a prior pick of its kind (its decay applied, step 4); a kind S11 treats
   as a per-district singleton (bandstand, statue, monument) that stands in D as a model pin is removed from D's hood
   rows. An aqueduct terminal's outlet in or fronting a square counts as a prior pick of kind fountain there
   (V01 §3.17.8).
3. **Gate.** For the site, each `HoodPinRow` r listing its site kind gives `p_r = gate_r(band) × siteFactor × pinGate ×
   identity_r × (1 + shadeGain_r × shade(site))` — the band at the site's plot or block, interpolated (the field band,
   II.3); `siteFactor` 1 for `square`, `yardBlock` and `green` sites and `pin.courtFactor` for `court`, `plotYard` and
   the hinterland sites (J-V1.43); the identity factor from D's placed identity row; `shade(site)` item 102's share at the
   site (V01 §3.5.5; on a sky arena volume 5's `shadeSky` there, never the ground's mask) — so fountains and bandstands
   favour the sunlit squares. The site draws u and holds a pin when `u < min(pin.cap, 1 − Π_r (1 − p_r))`.
4. **Kind.** A pin's kind is a weighted pick over the rows with nonzero `p_r`, each weight `r.weight × decay_r`, where
   `decay_r` starts at 1 in each block and is **divided by 10** after r is picked (II.3's rule, provenance `ref:NG 1.2.2
   pin decay (code)`, P20; its scope `pin.decayScope`: the block by default, the district under the `NG` preset, NG's
   per-map reading, V01 §3.15), so one block rarely repeats a kind.
5. **Placement.** Size `lerp(sizeM, u)`; the pin stands at the site's point when its disc (size ÷ 2 + `clearanceM`)
   clears every footprint, every entrance reserve (below), every model pin's disc, every **drawn** ground-access symbol's
   disc (V01 §3.8.8 — only an access on a ground face outside every footprint draws one; a building-hosted access lies in
   a footprint already cleared: size ÷ 2 + the pin row's `clearanceM` — no well lands on a catacomb stair in a
   churchyard), every hood pin already placed, every way corridor, every raised-way pier footprint and under-deck strip
   (V01 §3.17.3 (5)) and every retaining-wall line (its half-width + the row's `clearanceM`); else at the site's next
   clearance maximum; else no pin (counted in the close-up's debug report only). Angle: the host face's OBB axis + 90° ×
   ⌊2u⌋. **The entrance reserve** (J-V1.75, J-V1.96). Outside each building's main entrance, and each `side`, `rear`,
   `yard` or `service` entrance (§2.6's roles; a concealed use's door among them, whose rectangle is never drawn), a
   rectangle on the entrance's footprint side at its `offsetCm`, outward — the base's eager `Entrance` records (§2.6,
   item 241), never the lazy composition — `widthM[1]` wide and `depthM[1]` deep of volume 2's porch kind rows (V02 §3.7,
   `composition.json`: for a main entrance the largest over the `PorchKindRow`s with `outside` true, for a side, rear,
   yard or service entrance the `hood` row's, the secondary porch's kind), so the reserve stands from M5 at the porches'
   own sizes before the composer draws any porch; where the building's `Basement.access` is `external`, the main
   entrance's rectangle again, outward from the footprint side nearest the point `basementDoor(b)` gives (V03 §3.7.1;
   §2.6, item 578), centred on that point's projection onto that side — none where `basementDoor(b)` is null (the base's
   trapdoor fallback, which draws no outside stair); and, for each `AccessPoint` hosted by a building with neither a
   basement nor `ground(b)` (V03 §3.3), whose head volume 3 opens as an outside door at `stackAccessDoor(b, a)` (V03
   §3.7.2 (1)), the `hood` row's rectangle outward from the footprint side on which `stackAccessDoor(b, a)` lies, centred
   on its `at` — a `well` access there opens at the well pin it stands over (V04 §3.5.7 (d)) and takes no reserve
   rectangle, and a building on a deck hosts no head (V03 §3.7.2 (0)–(1)). Both door points are V03 §3.7.1's shared door
   helper's (E-29): pure, draw-free, of eager records, in `@plat/plots` from M3a. The reserve holds the porch, the
   secondary porch, the stoop (V03 O1 (e)), the outside basement stair's steps and the stack access's outside door
   whichever rungs have been derived, so the close-up stays a pure function of committed state in any order of click,
   `wings` rung and plan (T-V1-26 measures it; *fallback*: the reserve's depth doubled, re-measured). From M6-U a church's
   crypt clause may move `basementDoor(b)`'s point once, the reserve with it — declared in M6-U's shift record (item 238).
6. **Overrides** (V01 §3.8.5) are applied last.

Default rows (ours, calibratable; `extension: true`, the parity presets zero them; the gates below are the `square`,
`yardBlock` and `green` sites', × `pin.courtFactor` at `court`, `plotYard` and hinterland sites): well (court, plotYard,
yardBlock, square, cemetery; gate 0.35 at `poor` falling to 0.10 at `rich` — 0.07 → 0.02 in a court), pump (plotYard,
yardBlock; 0.15 → 0.05), trough (square, yardBlock, fieldEdge; 0.10), fountain (square, court; 0.02 → 0.30; `shadeGain`
−0.5), large tree (court, plotYard, yardBlock, green, cemetery, fieldEdge; 0.10 → 0.35, × (0.5 + greenery)), statue
(square, court; 0 → 0.10), monument (square, cemetery; 0.05), bandstand (green, square; 0 below `prosperous`, 0.05;
`shadeGain` −0.5), cross (square, cemetery, fieldEdge; 0.05, × 3 for a religious identity), shrine (court, plotYard,
fieldEdge; 0.05, × 2 for a religious identity). The underground rows are volume 4's, which ships none (V04 §1.3,
J-V4.97), so an underground close-up draws no hood pins; the `sky` arena reads the ground rows. **Check (T-V1-31):**
pins per 100 buildings per kind and template within 3 × NG's for the default preset and within NG's band under the `NG`
preset; *fallback*: `pin.courtFactor` scales all court and yard gates by one factor to meet the ceiling.

#### 3.8.3 The cache

The derived content (`HoodPin`s and nothing else — the close-up's names, squares, greens and places are eager model data;
the ground `AccessPoint` symbols are drawn from the model) is one elaboration chunk of rung `closeup` per district, and one
per hinterland L1 face an outline close-up opens (§2.9), keyed by it and its **inputs digest**: the leaf digests of its
blocks, plots, yard parts, court residues, model pins, ground `AccessPoint`s (building-hosted ones included) and
buildings' footprints, `Entrance` records, `Basement.access`, `basementDoor(b)`'s value, each stack-hosted access's
`stackAccessDoor(b, a)` value and whether each has `ground(b)` (the entrance reserve, V01 §3.8.2 step 5), the
`PorchKindRow` slice of `composition.json` the reserve reads (cited as the `hood.pins` slice is, §7.6), every
`RetainingWall`, raised strip and pier inside or on D's faces, the deck plots D owns with their buildings (V01 §3.17.2 (3),
§3.17.6), its `CloseupRecord` (or the default params), the `hood.pins` slice cited (§7.6) and every `Block.overrides` it
holds. At most `closeup.chunkKB` per district; counted in §12.8's elaboration cache line and evicted by its LRU to
`absent` (nothing is lost: the content is a pure function). A chunk whose inputs digest mismatches on read is dropped
and re-derived; a district with no pin stores an empty chunk.

#### 3.8.4 Staleness and re-derivation

A batch that changes any input sets the district's `closeup` record `stale` (§2.8), with the change marker at the city
band (§8.5); the cached pins stay on view until the next click re-derives them — from committed state, never from the
cache (§4.1) — and a `stale` close-up opened under `'view'` re-derives on its tile request. Re-derivation is the pure
function of V01 §3.8.2 over the new state; there is no canonical prior to carry, because the only authored content is
`Block.overrides`, which V01 §3.8.5 re-applies. Undo, redo, a load and a regenerate each change inputs and so mark the
chunk stale by this rule; none writes the chunk.

#### 3.8.5 Overrides

An `instance` event on a hood pin (V01 §4.1) writes §2.7's uniform override row on its block (`Block.overrides`); its op,
ordinal (`hood:<n>` for a generated pin, `u<n>` for an `add`, §8.10's user ordinals) and style (`InstanceStyle`, with the
`pinKind` item 421 adds, so a `restyle` can turn a well into a fountain and an `add` names its kind) are the event's.
Resolution is §8.10's law, unchanged: by ordinal while the block's lineage is unchanged and the ordinal's generated
position lies within 0.5 × the spacing of the recorded point; otherwise by position to the nearest unclaimed generated pin
of the same kind within 0.5 × the spacing; else orphaned and reported — with a hood pin's **spacing** defined as
`2 × clearanceM + sizeM[1]` of its row (§8.10, item 421), and a superseded block's rows moving to its `supersededBy`
successor. A saved document reloads its overrides with its blocks; an undone `instance` event removes its row, a redo
restores it.

#### 3.8.6 Persistence (LC-18, J-P23)

The first **hood-pin edit** inside a close-up — an `instance` event on one of its hood pins, or a change of its params —
is preceded by a `closeup` event (§7.1) that writes the district's `CloseupRecord` (params and table version) into the
`closeups` block of the model digest (II.4). A later `closeup` event on the same district replaces the params (its undo
restores the former record). Every other close-up element is a base entity, edited as one with no `closeup` event (II.4
and §7.1's edit-target row, items 545, 272): a lane's name, a plot, a building, a square's centrepiece (a model pin), a
place's name. A document with no `closeups` block (no hood-pin edit ever made) derives every close-up at the default
params.

#### 3.8.7 Frame and surroundings (S2 (c))

Opening a district frames the view by §9.5's framing rule restricted to D's footprints and the decks D owns
(V01 §3.17.6 (4); an outline close-up: to the outline); the neighbours draw their base marks at the neighbourhood band
to the frame's edge, never cut (§8.6), under the style's optional `closeup.vignette` (`none` default, `fade`, `plateau` —
NG's raised patch on paper) (V01 §5.1.5). A district with no footprint frames to its boundary.

#### 3.8.8 Underground, sky, and the ground access symbols

An underground district opens as a refine close-up with no hood pins (V01 §3.8.2). A sky district opens like a ground one
on its island's arena. Neither changes the ground.

**Ground access symbols** (J-V1.74). Every ground `AccessPoint` of the underground layer whose `ground.host` is a
**ground face** — a corridor, square, yard or outside face, a catacomb entrance's burial face included — in the opened
area, and whose `ground.at` lies outside every footprint, is drawn at `ground.at` as a symbol in the `hatched` pins slot
(V01 §5.1.3 slot 10): a grating, a neighbourhood or lifeline stair, a sinkhole, a cave mouth, a sewer outfall's or
culvert's mouth, a collapsed shaft, a ruin entrance, a catacomb entrance, and a cellar stair, shaft, ladder, hatch or
broken-through well that opens in a yard — sized by its **symbol kind** (`access.<accessSymbolKind>M`) and drawn in the
form §8.2's access `states` row gives its state — its stored `state` (`locked` with a bar; `bricked` filled solid in
`wall`, the landfall's closure and a host's closure included, V04 §3.10) or, while its element is closed, the derived
reading (sealed → `bricked`; collapsed as a trace with rubble stipple; II.7.4, II.6; J-V1.93). An access whose
`ground.host` is a building or its basement (a cellar stair, a basement's ladder or hatch, a shaft dug from a cellar), or
whose `ground.at` falls inside a footprint (a catacomb stair headed in a cemetery chapel, V04 §3.5.1 (9)), draws **no
surface symbol**: its roof covers it at the neighbourhood band, and at the building band the building's plan draws its
head (V03 §3.7.2 (5), §3.7.3, §5.1; a `secret` head by §5.4) — one mark per access. An arch vault's `door` is the base's
drawing of the vault's infill and takes no symbol. §9.2's admission filters each drawn symbol by its `knownTo` — a yard's
access (`local`) at the neighbourhood band for a public key; a `secret` one only at the building band, to a key holding
the secret. An unexcavated void has no `AccessPoint`, so it puts nothing on the surface (item 109 (j) (2)). The symbols
are drawn from the model (never stored in the chunk), and the hood pins clear the drawn symbols' discs (V01 §3.8.2 step
5).

**The symbol key** (J-V1.100). A symbol is keyed by its access's **symbol kind**, not its kind, since a catacomb entrance
is an `AccessPoint` of kind `stair` (V04 §3.5.1 (9)) that draws its own symbol:
```ts
type AccessSymbolKind = Exclude<AccessPoint['kind'], 'door'> | 'catacomb';
declare function accessSymbolKind(a: AccessPoint): AccessSymbolKind;   // @plat/hood; derived, never stored
```
`accessSymbolKind(a)` is `'catacomb'` for a catacomb entrance (V01 §3.7.1's selection (2): kind `stair`, source `system`,
its `cause.system` a `catacomb` system), else `a.kind`. Its values are the base's `AccessPoint.kind` as item 554 extends
it, less `door` — an arch vault's infill, which draws no symbol and is never passed to it — plus `catacomb`: twelve,
`stair`, `ladder`, `hatch`, `shaft`, `well`, `cellar_stair`, `grating`, `mouth`, `sinkhole`, `collapsed_shaft`,
`ruin_entrance`, `catacomb`. It keys the drawing V01 §5.1.2 gives each symbol and its size column
`access.<accessSymbolKind>M` (V01 §3.14); `hood.constants`' `access.*M` columns equal this set, held by T-V1-4's registry
test (not by a `TotalityRule`, V01 §3.14), so the enum and the columns change together in one change.

#### 3.8.9 The outline close-up (§16 M5's "arbitrary boundary"; J-V1.45)

A **view action, no event, no model change**: the user draws a rectangle or a lasso, or picks a named site from the
reader's `sites` query (a cemetery, a quarry, a mill, a catacomb's source, a shrine), and the view derives the refine
close-up of every district the outline meets and, for its part outside every district, of the hinterland
pseudo-district's L1 faces inside it, raises the `wings` rung of every building inside the outline, centre-out from the
outline's centroid (V01 §3.8.1; V02 §3.11), then frames the view to the outline (V01 §3.8.7). The hinterland's close-up
is chunked per L1 face (V01 §3.8.3) and uses the `ground` rows whose sites are `cemetery`, `fieldEdge` and `outsideYard`;
a hood-pin edit there takes a `closeup` event on the hinterland pseudo-district (one `CloseupRecord`). The unit run is not
used — the ground has a base. So an extramural cemetery with its catacomb entrance (the METROPOLIS Cemetery network's
grounds first, item 109 (k) (2)), a quarry ossuary beside the town, a field shrine or a mill yard can be seen and dressed
at the neighbourhood band. An outline over a harbour opens the decks it meets with their owning districts
(V01 §3.17.6 (4)). A `quarter` declaration (V01 §3.10.4) stays the way to make a new district. A degenerate outline (fewer
than three distinct points, zero area, self-crossing lasso) opens nothing and says so in one line; an outline over no
district and no hinterland face (open water, off the map) opens nothing.

### 3.9 The replace close-up — choosing another layout for a district

Choosing a card other than the district's fabric is a **model edit** (II.4, item 545): one undo group of `setAttr(D.fabric,
r)` (and any `setAttr(D.fabricParams.k, v)`) followed by `regenerate({ ids: [D] }, 'keep')`. Its **effective scope** is
§7.3 item 1's district scope from S8 — D's faces from S8 down (tree scoping), with the seam exception (II.4) covering the
`surface` and naming record of D's bounding ways (item 369) — plus S10a (i) and S9b for D's blocks, S10a's distribution
for D (D's `Allocation` unchanged, so no other district's content moves), S10–S12b for D, the town-wide S12c (derived,
draw-free) and S13a within the scope — **plus the cross-arena consequences volumes 4 and 5 declare for a ground edit**:
V04 §4.3's ground-edit row and V05 §4.3's island re-read, cited, never restated, which the oracle predicts from those rows.
**Fixed inputs** (§7.2): locked, pinned, assigned and dossier-backed entities in D (a sky island's institution released
for one event only, by a re-searched claim, V01 §3.10.3 (6) (c)), and V01 §3.5.12's — a SIZE record's compound, a GUILD
hall, a catacomb's source cemetery with the plot of the church that owns a sourcing churchyard and the plot of its
entrance, a declared retaining wall (a line) and an under-deck strip (V01 §3.17.2–§3.17.3): their faces stay and the
template lays around them as holes (V01 §3.4.1), and S9b never types them away (J-V1.46). The dry run (§7.1) runs the
whole re-derivation on the overlay and returns: the ghost of the new ways and blocks (`live.ghost`, §8.2) with the count
badge (plots, households, buildings); the fate report (kept, carried, orphaned); the renames of case (4) (§7.3 item 4),
each shared way whose surface or name changes among them; each generated retaining wall added, removed or moved and each
declared wall kept (V01 §3.17.2 (4)); as information, each wall of a neighbouring district whose derived step changes by
≥ `terrace.profileNoticeCm` — "the terrace wall above Mill Lane is now 1.2 m higher" (V01 §3.11 (7)); when the template
fell back (V01 §3.13), its bend in one line ("Rings did not fit this district's shape; laid as a square instead"); and
**for a stagnant catacomb** (item 109 (k) (5)) whose extent lies under a plot the fates demolish or clear, the
`blockLifted` notice — `{ system, plots, cause: the event's seq }` — which volume 4 reads from the logged fate report to
resume the catacomb's growth by least disruption; and, with the underground or the sky on, the cross-arena fates of those
rows. Its successions go to `SeamReport.superseded` (II.1 (4)). Its budget is V01 §6's. A card equal to the district's
fabric is the refine close-up, no edit; a card not eligible on the committed face bends to its fallback chain with its
one line (V01 §3.13), never refused.

**A targeted edit of a catacomb's source** — retyping the churchyard's plot, demolishing the church that owns a sourcing
churchyard, turning a burial ground into houses — is allowed (item 22's least disruption; item 101 R2): its dry run lists
the source's closure among the fates and names the closed source in one line (V04 §3.5.1 (8): the complex frozen — no
growth, `fill` unchanged, every gallery kept): "The catacombs under St Anne's churchyard stop growing; their galleries
stay", since a catacomb never shrinks (item 109 (k) (4)–(5)). A refine close-up emits no notice and moves nothing.

