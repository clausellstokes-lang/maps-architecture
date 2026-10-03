
### 3.23 Edges — every mechanism at its limits, and where the sky meets the other units (principle (11))

Every mechanism of V05 §2–§5 has a defined outcome at the limits of its inputs, a rung on §5's failure ladder (check,
repair locally, retry that piece, simpler shape, substitute, leave out and report — never a whole-map retry) and a test.
Four rules cover whole edge classes; the tables give every other case, each row naming its home.

**(a) Degenerate geometry.** Every step of this volume that commits geometry — SKY's L0 and L1 batches, the rim's
resize and reshape, the landing claims, the institution claim, the landfall's knots — commits through kernel
transactions: a degenerate result (zero-length, zero-area, self-touching, collinear, coincident) is refused by the kernel
(§3.1's `E_DEGENERATE` family; §5.1's general rule) and taken by the step's class on its ladder (F-OUTLINE, F-SKY-PLACE,
F-SKY-ACCESS, F-SKY-CRYPT; V05 §3.17). The pure functions (`undersideTiers`, `islandShadeStrip`, `skyRoute`,
`skyAccessObstacles`, `removedSlots`) meet degenerate geometry only as input and return a defined empty result: a tier
ring narrower than a mask cell blocks nothing, a strip with no blockable cell has an empty window and `cells` 0, a route
with no admitted access is ∞, a list with no live access is empty. The view's derivations (marks, slabs, labels,
exports) skip a degenerate mark and never fail a tile (V05 §5.1). Tests: T-V5-6, T-V5-33 (a).

**(b) Rungs.**

| rung | the sky |
|---|---|
| THORP, HAMLET, VILLAGE (the village product) | no island ever: `RungProfile.layers.islands` admits none (§1.1); S7b (5) and SKY register and write nothing; a T5 `sky` declaration is bent to a ground quarter (`bend.island.rung`); the village product has no sky stage (V07) |
| TOWN | the same at generation; an island carried down by a rung crossing (V05 §3.15 (6)) wanes, settles and falls over its dwells by the same laws, its landfall's rules rung-free (V05 §3.16), its marks and labels drawn as at CITY until it falls |
| CITY | the sky whole: the CITY rows of `IslandRule`, `districtHa` 3.5 ha, the field's 32 m lattice, the marks, labels and exports |
| METROPOLIS, to its population cap | the sky whole on the METROPOLIS rows; at the cap still at most three islands (the slots), the fill capped at `fill.householdCapDistricts` × `H_d`, the strips and the route on V05 §6's METROPOLIS rows |
| a standalone neighbourhood document | no sky (V01 §3.10.1's layers); a sky unit run is only SKY's call |

Tests: T-V5-1, T8-6, T-V5-14, T-V5-33 (b).

**(c) Toggles and presets.**

| toggle or preset | the sky |
|---|---|
| `recipe.layers.islands` off (the default) | nothing of this volume runs; the ground model byte-identical to the realism golden (T13-1); both landing data keys empty (T-V5-32) |
| `MFCG`, `FTG` | islands held off (J-V5.25); every shipped sheet still resolves the sky semantics (V05 §5.1) |
| `NG`, `VG`, `FM` | the sky by the recipe's own setting (`VG` at village rungs has none, (b)) |
| the sky layer hidden (§8.4's `LayerSpec.visible`) | no sky mark, label or slab drawn — so no island shadow on the ground — and no sky label a candidate; the model, the strips and the field unchanged (II.6 (1)); exports follow §11.1's layer selection, the `.plat` record always kept |
| the occlusion modes, the style's `shadows` | V05 §5.2, §5.3; with `shadows` off no slab is drawn, the strips (model data) unchanged |
| `w_sun` 0; item 102's rows off | the strips still computed and held; the field byte-identical to the run without the island term (T-V5-19 (c)) |
| item 106's `barrier` closure and profile off | an author's island wall is the base's ring (T-V5-27) |
| item 110's rows off | V05 §3.22 (9)'s no-op pin (T-V5-15) |
| item 111's cells at any value | the island unchanged (V05 §3.8 (4); T-V5-9 (h)) |
| items 105 and 107's weights 0; coverage weight 0 | no-op pins (T-V5-22 (b), (k)) |

**(d) Save, load, undo, redo, regenerate, migrate.** Every stored field's six cells are V05 §2.6's and every event's
§7.4's (item 375); every derived view — `SkyUnitInput`, the strips, `shadeSky`, the gradient raster, `removedSlots`,
`skyAccessObstacles`, the route, the underside tiers, the marks — is recomputed on load, undo, redo and regenerate from
committed state and never stored, so none goes stale in a save; the strips rebuild from the persisted `shadeBasis` alone
(§2.9, item 274). A snapshot whose sky fields contradict each other — an `areaHa` off its land face by more than 1 %, a
`slot` outside 1–3 or held by two live islands, a `key` part at or above `nextSkyPart`, an `accesses` id that resolves to
no `SkyAccess` — fails the load's verification and is a corrupt cache: the document loads by replay from its log (§2.9
step 3), which re-derives the island; in a session the same contradictions are §5.3's sky invariants (item 331). Tests:
T-V5-15, T-V5-16, T-V5-21 (h), T-V5-29, T-V5-33 (d).

**(e) Per mechanism** — no input (E1), one item (E2), the maximum and its caps (E3), missing, empty or contradictory data
(E5), and the degenerate cases with an outcome of their own (E4):

| mechanism (home) | edge | outcome | rung | test |
|---|---|---|---|---|
| the island record (V05 §2.1) | a migrated base island without `terrain` or `underside` | `terrain` written by SKY's terrain step (V05 §3.8 (3)) on its slot's key, `underside` the rule's default profile drawn on its slot's key (V05 §2.6), both reported | substitute | T-V5-33 (d) |
| the access record (V05 §2.2) | its `rule` names no row of the current table (a release removed the row) | it keeps its kind and reads the kind's current row; with no row for its kind (a table without `lightBridge`), it keeps its geometry and reads `closed`, reported (§7.5's table-row migration) | substitute; leave out and report | T-V5-33 (d) |
| the access record (V05 §2.2) | a ground edit turns its foot or yard to water, removes its landing plot, or covers it by a landfall | re-landed in that edit's commit by V05 §3.10 (4)'s rule, a new yard claimed, as a move re-lands it; else dropped by F-SKY-ACCESS's last rung (closed, reported; an island with none reported `unreachable`) | repair locally; leave out and report | T-V5-14, T-V5-33 (e) |
| the unit inputs (V05 §2.3) | an island whose land is all rim strip and claims; an allocation with no row | the unit run returns no district (V01 §3.10.3 (2)) and F-SKY-UNIT re-places every household on the ground; an empty allocation lays an island of strip, claims and landings only, its fabric empty, reported | substitute; leave out and report | T-V5-9 (i) |
| the shade strip (V05 §2.3a, §3.19) | no `shadeBasis`; a sampler digest that differs; a receiver above the caster; an empty window | no strip; recomputed whole; no bits; `cells` 0 and no attribution, outline or export feature | check | T-V5-19, T-V5-21 (h) |
| the rule tables (V05 §2.4) | value-keyed rows not strictly increasing in `v`, an `h` outside [0, 1], `minAreaHa` above `areaHaMax`, a reversed `altitudeM`, every weight of a draw 0, a missing cell | V11's table compiler refuses the table (its validity check), so none loads and `editTable`'s dry run names the cell; a missing cell reads its default (V05 §2.6) | check | T-V5-33 (c) |
| the supplies (V05 §3.3) | no built cell (every district cell in water or an excluded reservation) | `S_town` = 0, so `h_town` 0 and no island, reported `no supply`; at TOWN and the village rungs never computed (the gate first); recomputed at S7b and each epoch only, never by an edit (V05 §2.6) | check | T-V5-3 (d) |
| the reason draw (V05 §3.4) | no candidate; exactly one | the slot closes, reported `no supply` or `nothing to carry`; the one candidate is taken (a weighted choice of one draws nothing new) | leave out and report | T-V5-4 |
| the fill (V05 §3.5) | a band whose demand is one household; the cap; zero rows | one batch of one household; the fill stops at `fill.householdCapDistricts` × `H_d`, its batches bounded by 1 ÷ `fill.batchShare` per eligible band; a carried row whose count rounds to 0 is dropped; the allocation is re-made only by a re-derivation from S7b and an epoch's delta fill | check | T-V5-4 |
| the shape (V05 §3.6) | a declared lasso that self-touches; two to four corners collinear or coincident; an area below `minAreaHa` | F-OUTLINE repairs the lasso (§5.2's rungs, the kernel's simple hull last), bent at the dry run; collinear or coincident corners give no hull and the declaration is bent to a disc of the kind's area at their centroid; an area below `minAreaHa` is bent up to it (`bend.island.floor`) | repair locally; simpler shape | T-V5-6, T-V5-16 |
| placement (V05 §3.7) | a ground frame smaller than the outline plus `frameInsetM`; one candidate; a missing purpose target (no plaza, no precinct, no district with a prosperity mean) | no candidate, so F-SKY-PLACE's ladder (shrink `A`, then close the slot); the one candidate is taken; a missing target gives no purpose term (the precinct falling back to the plaza first) | simpler shape; leave out and report | T-V5-5 |
| the arena (V05 §3.8) | a ground relief class missing; a `hydro` grid of one cell; no ground river | `plain`; the descent stalls and F-SKY-TERRAIN gives no river; the spring pond's draw | substitute | T-V5-7 |
| the underside (V05 §3.9) | a crescent whose land centroid lies outside its land face; every tier ring below 1 % of the land; an altitude floor above `E_max` | the apex pulled toward the land face's point nearest the centroid; the stack ends at the first such tier (a `flat`-like island); the floor wins over `E_max` — no cap binds it — and an island above every access row's limit is reported `unreachable` by F-SKY-ACCESS | repair locally; leave out and report | T-V5-10, T-V5-33 (e) |
| access (V05 §3.10) | the cap; one access; a hand-placed access beyond the rim's yards | generated accesses ≤ `accessCount.max`; one access is `main`; V05 §4.2's `bend.access.rimFull` | check; bend | T-V5-8 |
| the field (V05 §3.11) | one carried band; a lattice of one cell | every rank maps onto that band's inner range; the one cell takes rank 1 (the richest band) | check | T-V5-9 |
| the unit inputs' contract (V05 §3.12) | the district count's bound | k is V01's `skyDistrictCount`; the fill bounds the plot land at `plotShare · A` ≤ `plotShare · areaHaMax`, so k ≤ ⌈`plotShare` · `areaHaMax` ÷ `districtHa`⌉ per rung | check | T-V5-9 |
| lights (V05 §3.13) | `h_carried` 0 at SKY-F; a fallen or removed island | the rim and keel rows laid at 0 cd, the access lanterns lit; none (tombstoned with the arena) | check | T-V5-11 |
| names (V05 §3.14) | no echoed river, no district below | those features absent and the grammar's rows that need them skipped | substitute | T-V5-11 |
| the epoch laws (V05 §3.15) | a target above 0 but below `minAreaHa`; a target below the institution's floor | the resize stops at `minAreaHa`, or at the claim's floor (V05 §4.2), listed in the epoch's report; a target of 0 wanes | check | T-V5-14 |
| the landfall (V05 §3.16) | a footprint wholly over water; a covered entity of zero area; a footprint partly beyond the ground frame | a decoration with no member and the one fate "sank in <water body>"; never covered (its share undefined counts 0); the part beyond covers nothing, reported "fell beyond the map" | leave out and report | T-V5-14 |
| determinism (V05 §3.18) | one island; a removed slot | slot 1's indices alone; the skip leaves every other draw unchanged | check | T-V5-15, T-V5-29 |
| the rim as a barrier (V05 §3.21) | an island with no live access; a zero-length wall stroke | the barrier circuit with no stretch; no wall (T3's dry run bends it to nothing, its line naming the stroke) | leave out and report | T-V5-27 |
| item 110 on the island (V05 §3.22 (4)) | a retaining stroke wholly inside the rim strip whose moved points coincide | bent to nothing (`bend.retaining.rim`) | leave out and report | T-V5-27 |
| the declarations and events (V05 §4.1, §4.2) | a T5 `sky` declaration at TOWN or a village rung; a reshape making the rim non-simple; a resize to 0; a move into another island's gap | `bend.island.rung` (a ground quarter); the drag bent back to its last simple position; `bend.island.floor`; `bend.island.move` | bend | T-V5-16 |
| locality (V05 §4.3) | a ground edit touching an island's footprint at a point only | no meet (the footprint test reads cell overlap); the island untouched | check | T-V5-16 |
| the dossier (V05 §4.4) | many `magical_node` deposits; more eligible dossier institutions than slots; a dossier rung below CITY | one addend; at most three islands, the rest on the ground (the reason draw picks among them); DR27 resolves `gated: rung` | check | T-V5-25, T-V5-1 |
| the dossier (V05 §4.4) | a dossier event's undo; a save between an absorb and the next epoch | a dossier event has no undo target (§7.4), so the island's re-reasoning is the epoch's and undone with it; the "awaiting a new purpose" island persists as its record stands (reason `institution`, `institution` absent) | check | T-V5-14 |
| the clerk (V05 §4.5) | no island; a key that admits none of an island's accesses | the island rows are absent; the withheld accesses unnamed, the route reported through the admitted ones only | check | T-V5-33 (f) |
| marks (V05 §5.1) | a user sheet missing a sky semantic; an island at TOWN after a crossing | the loader refuses the sheet, naming the semantic (§8.2's slot resolution); drawn as at CITY | check | T-V5-12 |
| light (V05 §5.3) | no island; a fixed sun at the zenith; the sky layer hidden | no slab and no second base; the shadow under the footprint (reach 0); no slab drawn | check | T-V5-13 |
| labels (V05 §5.4) | an island too small for its spine | a point label at the land centroid, or none where that collides | substitute | T-V5-12 |
| exports (V05 §5.5) | no island; a hoist or stair whose top and foot share one plan point; the sky layer hidden; an export after an undo | no sky container; the access exported as a Point with `topElevationM` and `footElevationM`, never a two-point LineString on one point; §11.1's layer selection, the `.plat` record kept; byte-identical to the export before the undone event | check | T-V5-17 |

**(f) Where the sky meets the other units** — the cross-unit combinations this volume owns (the later-built unit or the
feature's own unit), at CITY and METROPOLIS:

| combination | outcome | rung | test |
|---|---|---|---|
| a raised way under an island's shade (the owner's named combination) | a caster to the island's clearance (V05 §3.22 (1)) — `groundRefCm` rises, the island never the city (J-V5.68) — and a caster of §4.5's daylight term (item 290) OR-ed with the island's strip, a cell under both counted once | check | T-V5-31 (a), (b), (g) |
| a cliff, steep ground, a coast, a harbour, a moat, a bridge or an oasis under an island's shade | the strip's receivers are the field raster's cells at the unlevelled terrain height (V05 §3.19 (3)), whatever the feature: water cells (sea, harbour basin, moat, oasis) take bits with no plot to move, bridge cells the ground's height (never the deck's); the corridor's `g_min`/`g_max` bound covers any relief; on an arid site the ground's weight is the climate row's (§4.5, item 111 (c)) — 0 or toward shade — so a strip over an oasis may raise the field there | check | T-V5-34 (a) |
| a retaining wall, a terraced ward or a deck plot under an island's shade | receivers unlevelled (J-V5.65): a terrace platform's datum and a deck's surface are never receiver heights; a deck plot reads the field cell it stands over; retaining walls cast by §4.5's daylight term (item 290), OR-ed with the strip | check | T-V5-21 (h), T-V5-34 (a) |
| an access foot by a moat, on a terraced ward, at the frame's edge or over a vault | a foot inside a moat's band or beyond the ground frame is no admissible point (water; no raster cell); a foot whose nearest way lies across a moat reaches it over a bridge by the lane rule or takes F-SKY-ACCESS's repair lane, else drops; on a terraced ward the run is measured to `levelledGroundCm` at the foot and a yard straddling a retaining wall's chain slides along the spine clear of it, as a deck does; a vault below the foot is nothing to the access (the underground is neither caster nor receiver, item 2) | repair locally; leave out and report | T-V5-34 (b) |
| a landfall over a cliff, steep ground, a coast, a moat, a square, a terraced ward, a composed building, a planned building or the frame's edge | V05 §3.16 (4)'s table by covered kind, rung-free: the terrain is untouched (a barrier arc is a chain role, no entity); a part over the sea or a moat sinks; a square is a covered reservation; a terraced ward's retaining walls `decayed`; a composed or planned building demolished with its composition and plan records tombstoned with it (V02, V03); the part beyond the frame covers nothing | leave out and report | T-V5-14, T-V5-34 (c) |
| a neighbourhood close-up holding a ground landing | the access symbol drawn by V01 §3.8.8 | check | T-V1-33 |
| a vault or the underground under an island | no relation (item 2): an island reads nothing of the underground and casts no shade on it; the strips set bits on the ground's field only | check | T-V5-26 |
| a lock or pin under a strip | the field moves; the locked plot's content is held as any lock holds it (§7.2), its value reported | check | T-V5-34 (d) |
| Update shade now undone | the former basis, strips and field cells restored from the undo record (§7.4's row) | check | T-V5-16 |
| a landfall saved and reloaded | the decoration, its members, the quarry's `source`, every `formerClass`, `condition` and retaining `state` persist in the model digest; the fall's undo record survives the reload within §7.4's carried undo records, so an undo after the reload restores the model byte for byte | check | T-V5-34 (e) |

**(g) The four observed edges** are defined at their homes: a locked island whose institution the dossier removes (V05
§3.15 (1b)); a landfall over another island's landing (V05 §3.16 (4)); the maximum of hand-placed accesses (V05 §2.3b,
§4.2); the clearance against a lock (V05 §3.15 (7)).
