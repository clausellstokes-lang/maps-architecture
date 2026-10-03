
## 4 Editing

### 4.1 The declarations — item 101's twelve tools, no thirteenth

Every island edit is an existing tool with at most one new parameter (§7.1's elegance rule); each event's home tool is
§7.1's binding table (E-04), which this table follows:

| tool | on the sky | the events it emits |
|---|---|---|
| T1 `intend` | the islands setting (off / on) and the count (`auto`, 0–3) | `adjust('layers.islands')`, `adjust('islands.count')` — both Re-derive from S7b with their fate report (§7.8) |
| T2 `ground` | an island's terrain, water and rim, with the `key` parameter naming the island; a terrace stroke on the island, whose edge lays an island `RetainingWall` (V05 §3.22 (4)) | `setField(terrain)`, `drawWater`, `moveCourseKnot` on its river, `warp` on its key (`fromLevel 0` moves the rim); item 110 (a)'s terrace form with `key` |
| T3 `wall` | a wall on an island, with the `key` parameter: in an enclosure kind a barrier-closure enceinte walling only the landing yards (V05 §3.21); in the `retaining` kind an island `RetainingWall`, bent inward past the rim walk when drawn on or along the rim (V05 §3.22 (4)) | `drawWall` with `key` (its kind item 110 (a)'s) |
| T4 `road` | a stroke from a ground point to an island's rim; with `raised`, bent into an access; with the aqueduct class, ended at its last ground vertex outside the footprint; on an island's key, `raised` dropped and the aqueduct class made a fountain pin (bends, J-VI.4 (d)–(e); V05 §4.2, §3.22 (3)) | `placeSkyAccess` (the kind from the stroke's class, or chosen by the dry run by V05 §3.10's rules); a bend emits the bent declaration |
| T5 `quarter` | a floating quarter: the `sky` parameter | `quarter` with `sky` — a sugar event expanding to `convert raiseIsland` (declared), an `assign` of the kind to its district and `setAttr(name)` |
| T6 `place` | an institution onto an island | `assign` with `criteria.sky` (and optionally the island) |
| T8 `fill` | the prosperity, density and greenery brushes on an island, with the `key` parameter | `setField` with `key` — stroke overrides on the island's lattice (§7.2) |
| T9 `shape` | the island's altitude, area, position, occlusion, underside and field (a target mean); an access's kind, role, state, knowledge and foot; the rim's handles; the island conversions by hand | `setAttr`; `moveVertex` on rim vertices; `convert` (`resizeIsland`, `waneIsland`, `settleIsland`, `fallIsland`, `refloatIsland`, `raiseIsland`) |
| T10 `hold` | the island or its paths; New random on the island; **Update shade now**; an island's or an access's delete (V09's delete row; the clerk) | `lock`, `pin`, `revert`, `regenerate` with the island's scope; `regenerate` with the scope `shade` and the island; `delete` — on an island folded as `convert removeIsland`, on a generated access appending its ordinal to `removedAccesses` |
| T11 `name` | the island's name and label | `setAttr(name)`, `moveLabel`, `hideLabel` |
| T12 `dress` | the sky layer's visibility and occlusion | `setLayer('sky', …)` |
| no tool — its producer | the epoch's clearance re-check | `reclearIsland`, returned by the participant `sky.clearance` only |

Every declared thing is held (§7.2's declared means held): a declared island's outline and position, a declared altitude
or area, a placed access.

**No tool for the shade or the route.** The strips, the sky receivers' shade and the route distance are derived and
carry no edit kind. Item 102's `w_sun` and this volume's `shade`, `routing` and `casterAllowanceM` cells are table values
(`editTable`, §7.6, re-deriving from their first reader stage — SKY for `casterAllowanceM`, S10a for `shade`, S10b for
`routing`); T8 `fill`'s prosperity brush (`setField`) overrides the field beneath an island as it does anywhere (item 102
(f)); and **Update shade now** (V05 §4.2) brings the ground under one island's old and new strips up to date at once.

### 4.2 The events and their semantics (§7.1, item 356)

```ts
| { t: 'placeSkyAccess'; island: Id; top: PointCm /* local; snapped to the rim at the dry run */; foot: PointCm /* world */; kind?: SkyAccess['kind']; role?: SkyAccess['role'] }
// `quarter` gains   sky?: { altitudeCm?: Cm; institution?: string /* an IslandInstitution kind */ }   — its points are world points: the island's projected outline or seed
// the point-form events gain   key?: PlatKey   (default the ground): drawWay, drawWater, drawGreen, drawBoundary, drawFootprint, drawWall, placeLight, setField (terrain, prosperity, density, greenery)
//   — their points are in that arena's frame; the tool converts a world point by the island's anchor at the dry run, so a later move never invalidates the event
// `regenerate` gains the scope   { kind: 'shade'; island: Id }   — Update shade now (below; §7.1's EditScope)
// ConversionOp's island kinds (§4.11):
| { op: 'resizeIsland'; island: Id; areaHa: number; altitudeCm: Cm }
| { op: 'waneIsland' | 'settleIsland' | 'fallIsland' | 'refloatIsland'; island: Id }
| { op: 'raiseIsland'; allocation?: Id; declared?: { ring: PolygonCm /* local */; anchor: PointCm; kind: string; altitudeCm?: Cm } }
| { op: 'removeIsland'; island: Id }   // an author's removal: the record kept at its address in state 'removed', holding its slot (V05 §3.2 (6))
| { op: 'reclearIsland'; island: Id; groundRefCm: Cm; altitudeCm: Cm; elevationRaisedCm: Cm }   // the epoch's clearance re-check (V05 §3.15 (7)); returned by `sky.clearance` only
```

* **Pointing at an island.** Every sky hit test and every tool point on the sky layer converts the pointer's world point
  to the island's frame by the anchor — and, under `offset` occlusion, first un-displaces it (the world point less the
  island's `elevation × offsetPerMetre` offset vector, §8.4) — so a click on a lifted island's drawn house selects that
  house and a stroke drawn over the lifted island lands where it is drawn. The hit stack that applies it is V09 §4.20.8's.
* **Moving an island** (`setAttr(anchor)`, T9's drag). The arena is untouched. The dry run re-reads `groundRefCm` and the
  altitude floor at the new position, re-checks V05 §3.7's gap and frame, and re-lands every access: a vertical access's
  foot follows its top's new world point; a slanted one keeps its foot while it stays within the row's run, else is
  re-sited by V05 §3.10 (4). A foot that leaves its landing plot closes that plot's `sky_landing` use (item 17's
  `closeUse`, the house left vacant) and opens one on the plot under the new foot by a positive placement (§7.7's
  `placeAt`, the designation mutator on that plot). The fates list both plots. `placement.byAssignment` becomes true. A
  move outside the frame inset or into another island's gap is bent to the nearest admissible anchor (`bend.island.move`).
* **Resizing** (`setAttr(areaHa)` or `resizeIsland`). The rim is eroded or dilated by the kernel's buffer (§3.7) on the
  island's arena to the new area within 1 % (bisection on the distance, ≤ 12 steps), keeping its shape — never re-drawn
  from the stream (J-V5.7); a growth past 1.5 × `areaHaMax` first grows the frame (V05 §3.8 (1)). The tiers re-scale
  (`depthCm` by the square-root ratio of the areas).
  **The rim's L1 pieces follow the rim in the same commit** (J-V5.77). One island L1 batch re-lays the rim strip
  `rimStripM` inside the new rim and re-claims each landing yard at its top, the top re-seated where its direction ray
  `d_k` now leaves the land face (V05 §3.10 (2), (5)) and its foot re-landed as a move re-lands it (above). Each
  re-claimed yard is served in the same commit: its `sky_landing_top` plot re-cut on the new yard (the old one tombstoned)
  and its use opened there by a positive placement (§7.7's `placeAt`), the plots the yard covers re-derived by §7.3's
  local operator on the island's arena, and SKY-F's checks and repairs (V05 §3.12) run on the island, so a way meets
  every attach. The institution claim is kept where it still fits the land face less the re-laid strip and yards; else it
  is re-searched by V05 §3.10 (5)'s score and crypt re-test over the sites inside the district that holds it — so every
  district keeps its kind (V05 §3.12) — and that district is re-derived by its scoped re-derivation from S8 with the new
  claim a hole and the old claim's land its own (V01 §3.10.3 (6) (c)'s claim re-search, which releases the institution
  from V01 §3.9's fixed inputs), whose S10b places the institution on the new claim: its use relocated there (a
  dossier-backed one by the solver's `dossier` request, V05 §4.4), its old building demolished, a listed fate. That
  district is re-derived whether or not it receives a band face, and once where it does. **A resize never leaves the
  claim without a site:** the area is floored at the least area (the same bisection) at which some site in that district
  still fits; a hand request below the floor is bent to it (`bend.island.floor`; J-VI.4), and an epoch's `resizeIsland`
  (V05 §3.15 (2)–(3)) stops at it, listed in the epoch's report. A request below `minAreaHa` is bent to `minAreaHa` by
  the same line; a request at or above 1.5 × `areaHaMax` grows the frame first.
  **Shrinking:** every plot that loses at least half its face to the eroded rim, the re-laid strip or a re-claimed yard
  is cleared (its households relocated on the island first, then to the ground), the rest re-cut with their neighbours
  fixed (§4.7 S10 (7)); every way that crosses the re-laid strip line is cut back to it (the strip is never cut, V05
  §3.12); no district is re-derived but the claim's where the claim is re-searched (above); and the rim walk is re-laid on
  the re-laid strip by volume 1's `plantRimWalk` (V01 §3.10.3 step 4) in the same commit.
  **Growing:** the land between the old and the new strip lines — with whatever an old yard held that its re-claim does
  not, less the re-claimed yards — is cut into faces by extending, in the same L1 batch, each district boundary way that
  meets the old strip line across the band to the new one along the band's normal there (the same class); each face joins
  the district of its nearest rim stretch (ties by district address), and every district that receives a face is
  re-derived by its own scoped re-derivation from S8 (V01 §3.10.3 (6) (c)) — never a unit run, which would re-cut every
  district, and never a change of the island's district count; volume 1's `plantRimWalk` then re-plants the rim walk
  whole, once for the resize, since the walk is one island-level pair that no district's re-derivation writes.
* **Altitude** (`setAttr(altitudeCm)`): the record alone; a value below V05 §3.9 (4)'s floor is bent to the floor
  (`bend.island.altitude`; J-VI.4).
* **Underside and occlusion** (`setAttr(underside.*)`, `setAttr(occlusion)`): the record alone (`underside.source`
  becomes `edit`); an underside change that would break the floor raises the altitude, listed as a fate.
* **Field** (`setAttr(field.prosperity)` — a declared target mean, `declared.field`: the gradient shifted uniformly to
  meet it, V05 §3.11 (5); `setAttr(field.density)`, `setAttr(field.greenery)`; and the island brushes, `setField` with
  `key` and a prosperity, density or greenery stroke, as §7.2's stroke overrides on the island's lattice over the
  gradient): the island's plots whose value crosses a cut past τ re-derive (§7.2's rule for a field brush), on the island
  only.
* **Reshaping the rim** (`moveVertex` on a rim vertex, `warp` on the island's key with `fromLevel 0`): §7.3's local
  operator on the island's arena moves the rim, and the rim's L1 pieces follow it as a resize's do (above; J-V5.77) — the
  strip re-laid inside the new rim, each landing yard on a moved stretch re-claimed at its top (a pinned `sky_access`
  vertex never moves), the institution claim kept or re-searched inside its district; a reshape that would leave the claim
  no site there is bent back along each moved vertex's drag to the furthest position that keeps one (bisection, ≤ 12
  steps; `bend.island.rimStop`; J-VI.4). Each stretch that moved outward is a growing resize's band — its faces, cut at the
  extended district boundary ways, joining the district of their nearest rim stretch (ties by district address), every
  district that receives a face re-derived by its own scoped re-derivation from S8 — and each that moved inward a
  shrinking resize's, which gives no face and re-derives no district (the claim's aside, re-derived where its claim is
  re-searched, above; V01 §3.10.3 (6) (c)); volume 1's `plantRimWalk` then re-plants the rim walk whole, once for the
  reshape; `areaHa` is rewritten to the new land area. A reshape that would make the rim cross itself is refused by the
  kernel (§3.1's `E_SELF_INTERSECT`) and the drag bent back to its last simple position.
* **New random on the island** (`regenerate` with the island's scope, `newRandom`): the outline's displacement, the
  terrain (with an `own` relief's class), the underside (unless edited) and the river re-derived under the next reroll,
  SKY's island steps re-run (the rim strip, the landing yards and the institution claim re-laid, V05 §3.10 (5)), the
  island's districts re-laid by volume 1's unit run (V01 §3.10.3 (6) (a)–(b); each district's template kept where its
  lineage is, V01 §3.3.4), then SKY-F (V05 §3.12), which rewrites `SkyIsland.districts`; the anchor, the area, the
  altitude, the allocation and every access's foot kept; each vertical access's top re-seated at the new rim's point
  nearest above its foot, and where the new rim no longer overhangs it the access becomes a `ropeway` from the rim point
  nearest the foot. The altitude floor (V05 §3.9 (4)) is re-checked after the underside is re-drawn: a deeper root that
  breaks it raises `elevationCm` to the floor (a listed fate), as an underside edit does. The ground is byte-identical
  (the seam exception is empty); `shadeBasis` is untouched (the shade follows at the next evaluation).
* **Declaring an island** (T5 with `sky`). At its dry run: the gate (V05 §3.2 (1)) and `h_town > 0` must hold — a
  declaration where the town cannot supply magic is allowed only with the fate `held against its supply` confirmed
  (J-V5.10); a declaration on a dossier-bound document whose `site.magic` resolves `none` is the one refusal (F-EDIT
  `dossier-owned`, V05 §4.4; J-V5.19). The points form gives the projected outline (a lasso), a disc of the kind's area at
  one point, or the routine fitted to two to four corners; the slot is the lowest free (the lowest held slot when none is
  free, released by this event, V05 §3.2 (6)); a fourth island is bent to join the nearest one as a district on it
  (`bend.island.count`); the fill is V05 §3.5's, taken by **relocating** the richest households from the ground (never
  re-deriving it) — each household moved up is a relocation, its ground building left vacant — all listed as fates; V05
  §3.8–§3.14 then run on the new island, which has no `shadeBasis` until the next shade evaluation (V05 §2.1): it casts
  and receives no strip meanwhile, and Update shade now on it writes one at once. In the creation prefix the declaration
  is read ahead by S7b (5) as a forced slot (V05 §3.2 (3)), so no relocation is needed.
* **Placing an institution on an island** (T6: `assign` with `criteria.sky`): the solver places it on the island named,
  else on the island whose reason is `institution` and whose row matches, else the dry run offers T5's declaration. A
  custom kind is named by its `localUid` (item 104 (a) (1): the map-side declaration, stored in the map document, never in
  the dossier); where it is a resource or processing node of an active chain, the dry run lists the fate "this chain now
  crosses the hoist" and the route lengths of its links before and after (V05 §3.20 (9) (e)).
* **Accesses.** `placeSkyAccess`'s dry run checks the kind against the `magic` circumstance and the row's limits (a kind
  that does not fit is bent to the nearest admitted kind in V05 §3.10's order, `bend.access.kind`; J-VI.4 (b)), inserts
  the top vertex on the rim, claims the island's landing yard (the plots it covers re-derived by §7.3's local operator on
  the island's arena, V01 §3.10.3 (6) (c)) and opens the ground landing by a positive placement on the plot under the
  foot. A top whose yard cannot be claimed where it is drawn (the rim stretch held by other yards or the institution
  claim) slides along the rim to the nearest position whose yard fits; a rim with no such position bends the stroke into
  the re-landing of the nearest existing access at the drawn foot (`bend.access.rimFull`), so an island holds at most as
  many accesses as its rim holds yards. `delete` of an access reverses all three; deleting an island's last access is bent
  into a move to the next admissible site (`bend.access.last`; J-VI.4 (c)), with "Place a different access" as the
  alternative. **A deleted generated access stays deleted:** the delete's fold appends its ordinal to
  `SkyIsland.removedAccesses`, which every later re-siting skips and counts (V05 §3.10 (1)); where it was the `main`
  access, the lowest surviving generated ordinal takes `main` in the same event (a listed fate), so an island always has a
  main access while it has any; the delete's undo removes the ordinal. A placed access's delete leaves no ordinal (it was
  declared, and nothing re-sites it). The foot of a placed or moved access meets the standing raised parts by V05 §3.22
  (3) (a)–(b) at its dry run, a foot they block moving to the nearest admissible foot (`bend.access.deck`; J-VI.4 (b)).
  **`setAttr(kind)`** on an access re-runs the same check — the `magic` circumstance, the row's altitude and
  horizontal-run limits, a `guarded` access a `hoist` only — a kind that does not fit bent as above; an admitted change
  re-seats nothing but the landing buildings (the top's and the foot's use rows take the new kind's building).
  **`setAttr(ground.at)`** re-lands the access as a move does: the old landing plot's `sky_landing` use closed, a new one
  opened by a positive placement on the plot under the new foot, both plots listed as fates, the horizontal run
  re-checked. An island wall's circuit follows every access change (V05 §3.21 (3)).
* **The shade beneath follows** (item 102 (e); J-V5.27). Every event that changes what an island's strip would read — a
  move, an altitude, a resize, a rim reshape, an underside, New random on the island, a declaration, a delete, a `convert`
  — leaves `shadeBasis`, the ground's field and every strip where they were: its dry run lists the fate "The ground
  beneath will catch up the next time the town changes over time. Update it now?", and the shade map view draws the new
  strip as pending (V05 §5.1). A Re-derive from S10a or an earlier stage recomputes the bases and the strips with
  everything else.
* **Update shade now** (`regenerate` with the scope `{ kind: 'shade', island }`; T10, and the fate's own button). One
  shade evaluation for that island alone (V05 §3.19 (6)): its `shadeBasis` is written from the island as it stands, with
  `by: 'update'`, the document's current epoch and the full surface top (as an epoch's); its strips onto the ground and
  onto the islands beneath it are recomputed — and, where it had no basis (V05 §2.1), the strips onto it from the islands
  above it — and the ground's field is recomputed over the union of the old and new strip windows — the cells of the other
  islands' strips re-read from their unchanged bases — with the blocks there whose value crosses a cut past τ re-derived
  by §7.2's rule, their fates listed. It is the one event besides the evaluations of V05 §3.19 (6)'s other moments that
  writes a basis, and only its island's. On a fallen or removed island it is offered nothing (no basis is written for an
  island that casts nothing). The prosperity brush stays for hand changes.
* **Deleting an island** (T10 `hold`'s delete — V09's delete row — or the clerk; J-V5.62). The dry run turns the delete
  into **`convert removeIsland`**: the island is removed without a landfall — its households relocated to the ground by
  §4.7's overflow pass (in an epoch's history, as any hand conversion, inside the event), its landing uses closed, its
  arena archived as `fallIsland` archives it, a split shop's use relocated to the ground (V05 §3.20 (11)) — and its record
  stays live at its address in state `removed`, `removed` written (`seq`, `generated` from its lifecycle cause) and its
  `slot` held closed (V05 §3.2 (6)). It draws, labels and exports nothing but its `.plat` record (V05 §5.1, §5.5). Where
  the ground cannot house its households, the dry run offers instead `adjust('islands.count')`, a Re-derive from S7b. The
  fate list says it in V09's `info.remove.holds` words ("The town won't raise this island again; undo brings it back").
  `convert fallIsland` is the ruinous alternative. A removed island is undone only by the removal's undo; a T5 `sky`
  declaration re-fills its slot with a new island only when no slot is free (V05 §3.2 (6)), never resurrecting it, and no
  `adjust('islands.count')` re-opens it. A floating, waning or settled island may be removed; a `fallen` one may not — its
  slot is already free and its landfall is ground content, which the ground's own edits clear — and a delete on a fallen
  island's record is bent to deleting nothing, the line naming its landfall (`bend.island.fallen`).
* **Bringing an island down** (`convert fallIsland`, T9's context action; the clerk's "bring it down"). The dry run lists
  V05 §3.16's fates, one per covered entity; a covered way's reads "rubble; a track until the town clears it (was
  <class>)", `<class>` the class the fall writes to `Way.formerClass`, or the one the way already holds there (V05 §3.16
  (4)). The event's undo restores each way's class, surface and prior `formerClass` (V05 §3.16 (8)).
* **A raised or aqueduct stroke to an island** (J-V5.61). A T4 stroke that ends on an island's rim with `raised` or the
  aqueduct class never makes a way (II.1: no roads in or out). Its dry run answers with a bend (J-VI.4 (d); item 101 R2
  refuses only a dossier fact or a lock) — `bend.raised.island` — and makes, in the stroke's place, `placeSkyAccess` with
  the stroke's ends as top and foot and the kind V05 §3.10's rules admit there: a `ropeway` for a slanted stroke, a
  `hoist` where the foot lies under the rim, a `lightBridge` where `magic` admits it. An aqueduct stroke ending on a rim
  ends at its last ground vertex outside the island's footprint (`bend.aqueduct.island`). A `raised` or aqueduct stroke
  wholly on an island's key is bent — `raised` dropped, the way drawn on the island's ground; the aqueduct made a fountain
  pin at its end (J-VI.4 (e); `bend.raised.onIsland`, `bend.aqueduct.onIsland`). A `raised` stroke on the ground whose
  course would cut an access's column or pass within `lineClearM` under its rope line is re-routed by the dry run through
  `skyAccessObstacles`, or, where no re-route exists, ended at its last ground vertex before the column
  (`bend.raised.hoist`; J-VI.4 (f); V05 §3.22 (3)).
* **A retaining wall or terrace on an island:** V05 §3.22 (4) — laid on the island's arena; on or along the rim bent
  inward past the rim walk (`bend.retaining.rim`; J-VI.4 (g)).
* **A wall on an island** (T3 with `key`): V05 §3.21 (3) (`bend.wall.rim`).

**The bend lines** (item 101 R2; J-VI.4): every refusal of this volume but the dossier-owned one (a bound dossier whose
`site.magic` resolves `none`, J-V5.19) and a lock is a bend. Each line is this volume's words; its message row is V09
§4.9's `bend.*` row and its clerk explanation V10's `bend` category (J-VI.4), the keys these:

| key | line | event |
|---|---|---|
| `bend.island.count` | "At most three islands float here; this quarter joins {island}." | a fourth declared island (V05 §3.2 (3)); an integer `islands.count` below the forced count, raised to it (V05 §3.2 (4)) — "{n} islands are drawn by hand; the count is raised to {n}." |
| `bend.island.rung` | "Islands float only over cities; this quarter is laid on the ground." | a T5 `sky` declaration at TOWN or a village rung (the rung gate is absolute, J-V5.10) |
| `bend.island.move` | "{island} floats clear of {other}; moved {m} m." | a move into another island's gap or outside the frame inset |
| `bend.island.altitude` | "{island} floats at least {m} m up, clear of what stands beneath." | an altitude below the floor (V05 §3.9 (4)) |
| `bend.island.floor` | "{island} keeps room for its {institution}; shrunk to {area} ha." | a resize below the claim's floor or below `minAreaHa` |
| `bend.island.rimStop` | "{island} keeps room for its {institution}; the rim stops here." | a reshape that would leave the claim no site |
| `bend.island.fallen` | "{island} has fallen; its rubble is the ground's to clear." | a delete on a fallen island's record |
| `bend.access.kind` | "A {kind} cannot serve here; {kinds} can." | `placeSkyAccess` or `setAttr(kind)` with a kind that does not fit |
| `bend.access.deck` | "The foot moves clear of {deck}." | a foot on a deck face, a raised-way pier or within `deckGapM` of a raised deck |
| `bend.access.rimFull` | "{island}'s rim holds no more landings; {access} now lands here." | `placeSkyAccess` on a rim with no free yard |
| `bend.access.last` | "An island keeps one way up; moved to {site}." | deleting an island's last access |
| `bend.raised.island` (V09's row) | "A road cannot reach a floating island; a hoist, rope line, stair or bridge of light can." | a T4 `raised` stroke to a rim |
| `bend.aqueduct.island` (V09's row) | "An island's water is its own; the aqueduct ends here." | an aqueduct stroke to a rim |
| `bend.raised.onIsland` (V09's row) | "An island carries no raised way; its bridges cross its river on their own decks." | a `raised` stroke on an island's key |
| `bend.aqueduct.onIsland` (V09's row) | "An island's water is its own; a fountain stands where the aqueduct would end." | an aqueduct stroke on an island's key |
| `bend.raised.hoist` | "This would cut {island}'s hoist; it ends here." | a raised course that cannot re-route around an access |
| `bend.retaining.rim` (V09's row) | "The rim walk stays level; the wall stands inside it." | a retaining or terrace stroke on or along the rim |
| `bend.wall.rim` | "The drop is the wall here." | an island wall stroke along the rim away from a landing |

### 4.3 Locality and undo

| edit | effective scope | outside it, byte-identical |
|---|---|---|
| altitude, occlusion, underside, field and the island brushes, name, terrain and water on the island, a wall on the island, New random on the island | the island's arena and record | the ground and every other island (seam exception empty) |
| a resize, a rim reshape | the island's arena and record, plus the ground landing plots its re-landed feet name (their designations only) and the ground buildings that take the households a shrink relocates | everything else; every other island |
| an access placed, moved or deleted; an island moved; an island deleted | the island's arena and record, plus the ground landing plots its fates name (their designations only) | everything else |
| an island declared after generation | the new island's arena, plus the ground buildings its relocations vacate and the landing plots | everything else |
| a ground edit whose effective scope meets an island's projected footprint — a raised way, a retaining wall or a building added, raised or removed beneath it included (its dry run reading `skyAccessObstacles`, V05 §3.22 (3)) | the ground edit's own scope, plus that island's `groundRefCm` and, where V05 §3.9 (4)'s floor requires it, its `altitudeCm` (a listed fate); a removal beneath never lowers the island — its `elevationCm` kept, `altitudeCm` re-read | the island's arena |
| `fallIsland` | V05 §3.16's covered set (raised spans and raised-way piers, retaining walls and deck plots included), the re-landed accesses of other islands, and the island's arena | everything else |
| `removeIsland` | the island's arena and record, plus the ground buildings that take its households and its landing plots (their designations only) | everything else; the other islands' slots and draws |
| `reclearIsland` (an epoch's) | the island's record (`groundRefCm`, `altitudeCm`, `elevationCm` where raised) | everything else, the island's arena and `shadeBasis` included |
| Update shade now | the island's `shadeBasis`; the ground's field over the union of the island's old and new strip windows and the blocks there that cross a cut past τ; the strips onto the islands beneath it and, where it had no basis, the strips onto it | everything else, every other island's basis included |

No island edit writes the ground's field or any `shadeBasis`: the strips keep their basis (V05 §3.19 (6)), so every row
above holds for the field's rasters as for the ground's geometry, before and after a save and a load (§2.9, item 274);
Update shade now is not an island edit but a scoped shade evaluation. Every event undoes by its inverse through §7.4's
fold; the lifecycle rows of `placeSkyAccess`, `regenerate` with the scope `shade`, `convert removeIsland` and
`reclearIsland` are §7.4's (item 375). `Document.nextSkyPart` never decreases, so an undone island's part stays spent.

### 4.4 The dossier — derivation row DR27 and coherence (§7.7, item 387)

| row | subject | dossier inputs | rule | chance | totality bar |
|---|---|---|---|---|---|
| DR27 | floating islands: the gate, count, reason, size, altitude and access kinds; what the sky fill carries of a chain; the shares it may not take | the population (the rung, DR23); `wealth.label` (DR6: the field, so `S_town`); the households' bands (DR7: `S_carried`); the institutions (DR9, DR24: a palace, cathedral, great temple, prison or mage's instance; a custom institution by its resolved scene archetype and `landmarkLevel`, item 104 (a)); the institution ladder records by their step type (item 108 (a): only a singular or SIZE record may go up; COUNT, GUILD and QUARTER members counted across both arenas); the district-defining records (item 72: their raised shares never taken by the fill); `government` (DR11: a palace's eligibility); `site.magic` (the `magic` circumstance: the gate and the access kinds); `site.deposits` (a `magical_node`: the node term of `h_town`, V05 §3.3); the active reviewed custom chains (item 104 (b)) and `activeChains[]` (item 105 (i)): the nodes the fill keeps on the ground, V05 §3.5 (3), and the links' status | V05 §3.2–§3.10, §3.15 (1b), §3.20 (9)–(12) | `island.place` | every bound CITY or METROPOLIS map with the setting on has its gate resolved, its node term traced to a deposit or to none, each island's reason traced to a DR7 or DR9 fact, and no ladder pair counted twice across the arenas |

The row is DR27 (ID-DR; J-V5.40); the setting itself is the map's declared choice, never a dossier path. **Coherence:**
where the dossier's `site.magic` resolves to `none`, turning the setting on is refused (F-EDIT `dossier-owned`: "the
dossier's world has no magic"; §7.7's coherence row, item 387), and a dossier change to `none` at an absorb makes every
island's target 0 at the next epoch — they wane, never vanish (item 22). A dossier institution on an island stays a
dossier fact: a fall, a delete or a resize that removes its building first relocates it (§4.11's *Dossier content
across epochs*). **The reverse** — the dossier removes the institution an island carries (a palace, a cathedral, a custom
tower) — removes the institution at once (item 20 (h): its building vacated, its uses closed), leaves the island
standing, and re-reasons the island at the next epoch by V05 §3.15 (1b): the next instance of its row's tags or
archetype, else a prosperity island, else a wane (J-V5.53); a lock on the island holds it without its institution until
the unlock (V05 §3.15 (1b)). Until an epoch runs (a document without history), the absorb's report lists the island as
"awaiting a new purpose", and the clerk offers T6 (another institution onto it) or T5's kind change as ghosts. A
`magical_node` deposit that turns `depleted` or `removed` at an absorb drops the node term at the next epoch's evaluation
— the islands' supply falls by the law and they wane, never vanish; one that turns `discovered` adds it at the next epoch
(V05 §3.3). Every DR27 input reaches its dependants through the change envelope and the next epoch's fold (§7.7,
items 22, 75, 76): the population and `wealth.label` through the epoch's rung and field (V05 §3.15 (1)), the
institutions through (1b), `government` through the next reason draw at a re-derivation from S7b, `site.magic` through
the gate (V05 §3.2 (1)) and the access rows' `magic` column at the next re-siting, the chains through V05 §3.20 (9) (e).

### 4.5 The clerk's view

**Registration.** `@plat/sky` registers one `WhyProvider` (V10 §2.13) with `kinds` `SkyIsland`, `SkyAccess` and the
`fallen_island` decoration, answering from the committed model and the report, filtered by the caller's key (§9.2's
`admit`). The prosperity field's `drivers()` (V10's `FieldDrivers`) gives the daylight term one entry as the base
defines it and, beside it, one attribution per island whose strip covers the point (a strip with `cells` 0 none):
`{ driver: 'daylight', delta, sources: { caster: Id | 'terrain' | 'walls' | 'buildings'; samples: number }[] }`, each
source's `samples` the sample bits it blocks at the point and the entry's `delta` the OR-ed total × `w_sun` ÷ `bits` (a
sample blocked by a hill and an island is listed under both and counted once, J-V5.38) — the `sources` list is this
volume's field of V10's `FieldDrivers.terms`. Pulls across arenas reach `PlacementSolver.explain` (V10's
`Explanation.terms`) with the access `skyRoute` returned, so every cross-arena term names its landing.

The reader (§11.2's `query`) lists each island in the gazetteer with its name, reason, state, area, altitude, supply and
accesses. **The `island` section's rows** (V10's `WhySectionProvider` rows for these kinds; CVR-V10-14):

| on | `why` answers |
|---|---|
| an island | its gate, its slot's draw against `chance · h_town`, its reason's candidates and weights (a custom institution's matched archetype named), its fill's bands and their shares of its land, its stop cause, the trades it left on the ground by `carry` (each with its reason: heavy works, noxious, a need an island cannot meet, a chain's working step) and the split shops it carried, the coverage instances it took per island district, the S3 reservation it handed over and to whom ("the old cathedral close — now the mother church"), its cathedral's crypt ("cut into the island's rock; the largest crypt in the town"; half-sunk where the rock is too thin), its placement's class shares, its reachability and score, its underside's kind, and its strip — how many hectares of ground it shades for at least one, three and five of the nine samples, and whether the field still reads it where it hung (the basis, V05 §3.19 (8)), with "the ground last took this shade at {year}, by {an epoch \| a re-derivation \| Update shade now}" from the strip's `evaluated` |
| a ground plot or quarter under an island | each island whose strip covers it and for how many samples, the term's share of the plot's value, and whether the ground has caught up |
| a use on an island, or a ground use pulled by one | the rows and the links that pulled it — the good, the bound provider or consumers, the orientation (item 105 (j)) — and the landing each cross-arena pull or link went through with its route length (V05 §3.20 (8), (10)); on a split shop, its works below and the route between them (V05 §3.20 (11)); on a node of a chain that crosses an island, the chain, the node's step in its flow, the landing its link crosses and why its working steps stayed on the ground (V05 §3.20 (9)) |
| an island's rim with no wall | "the drop is the wall here" (V05 §3.21) |
| a landfall | the island that fell, when, and what it broke (the walls breached, the ways buried, the arches and raised-way piers ruined, the terrace walls broken, the shops that fell with their bridge, the fountain an aqueduct no longer feeds, the accesses re-landed) with the clearance still owed |
| a removed island or access | "removed by you" with the event — "the town raised it" or "you drew it", from `removed.generated` — and what alone would re-open its slot (undo, or a new island drawn when no other slot is free — never a new island count) |
| an island the clearance raised | "raised clear of the aqueduct" (or of the viaduct, the terrace wall, the stepped temple) naming the caster and the epoch |
| an island held without its institution | "held without its {institution} by your lock" (V05 §3.15 (1b)) |
| a road that could not reach an island; a bent terrace or wall stroke; a resize or reshape held by the claim | the bend and its line (V05 §4.2's table), and the access it made |
| the town supply | the `magical_node` deposit when the node term acts — "the node beneath the old ruins" when the report's `ruin.node` line names the deposit (V04 §3.5.0a (9); V05 §3.3) |

Every answer is filtered by the caller's key (a `secret` service hoist to a prison is withheld). A clerk's proposals are
these events as ghosts: "a floating palace over the river" is T5 with `sky` and the palace kind; "raise it higher" T9's
`setAttr(altitudeCm)`; "let the ground catch up" Update shade now; "bring it down" `convert fallIsland` with V05 §3.16's
fates. It never writes a dossier fact and meets DR27's refusal as any author does.
