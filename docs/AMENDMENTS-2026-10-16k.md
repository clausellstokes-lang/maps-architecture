# Amendments k — the world, sites, encounters and 2.5D volumes' base change requests, consolidated (2026-10-17)

> PENDING FABLE REVIEW — written by the session's integration seat volumes/_integrate-world-sites under the owner's delegation (J339); covered by the whole-design retrovalidation (J84).

Numbered from **600** (file f ended at 585; file j's items 131–141 are the owner's rules this file serves). **NOT
APPLIED** — the coherence pass (`workflows/18-coherence.js`) applies these items to `docs/ARCHITECTURE.md` and to the
named volumes as it applies files f and g, after both and after file j's rules are read; nothing here edits the base.
Source: the `## 10` sections of `docs/volumes/V13-world.md` (BCR-V13-1 – BCR-V13-29; its §10.2 to V14) and
`docs/volumes/V14-sites.md` (BCR-V14-1 – BCR-V14-25; its §10.2 to the siblings) as landed by their reconciliation
round 0 and corrected by the integration lane (`docs/volumes/_integrate-world-sites.md`; the volumes' "Integration
notes (2026-10-17)").

**This file supersedes file j's BCR table.** File j's rows BCR-j1 – BCR-j15 were a forecast written before the
volumes existed ("the base change requests the coherence pass applies when the world-and-sites volume lands"); the
items below are the requests as the volumes make them. Where the forecast named a change no volume requests, the row
says so and names the volume section that carries the mechanism instead. The mapping:

| BCR-j row | its items here | note |
|---|---|---|
| BCR-j1 (§1 scope, §14; the identity statement of item 131 (b)) | 600, 634 | the identity statement is V13 §2.1's (the two regimes) and no volume asks for a base sentence; the §14 chain and §1.1's world row are requested |
| BCR-j2 (§2.3 terrain: datum, S1's input record, the carve delta, water surfaces) | 603, 610 | as forecast |
| BCR-j3 (§2.4 water table → groundwater with springs; one accessor) | 605, 603 | the base's paragraph stands in §2.6 *Basements* (SW-23), not §2.4; the springs are V13 §3.5.4's and the frame's step V13 §3.12.3's |
| BCR-j4 (§2.1 arenas, §2.8 identity: placement record, namespace, adoption) | 601, 602, 604, 608, 611, 616 | adoption is V14 §3.9 (e)'s over §7.5's address mapping and §2.5's reservation; no base mechanism beyond the `worldSite` reservation and the namespace segment is requested |
| BCR-j5 (§2.7 / V04: anchor, access flag, attached documents, admissibility) | 606, 620, 621, 636, 637, 640 | as forecast; the admissibility table lands as a registry table (§7.6), not a §2.7 record |
| BCR-j6 (§2.8 lifecycle, V06: card and states, condition transforms, two verbs, promotion) | 607, 612, 614, 617, 619, 641 | the card's lifecycle set is V14 §2.2's beside §2.8's `Lifecycle`, `Existence` unchanged (BCR-V14-16) |
| BCR-j7 (§4.2 S1, §5: the water class test, route classes, barrier tops, per-storey, the two verbs, the cascade, locks) | 605, 610, 613, 617, 618, 638, 640 | the classifier and the cascade are V13 §3.13 and §3.14 (no base text restates them); the base gains the readers, the verb, the rows and the invariant's construction-week reading |
| BCR-j8 (§7 editing: field locks, validated deltas, the fork, invalidation, the reason record read by the clerk) | 617, 618, 645 | field-level locks are §7.2's existing locks (no request); the fork reuses `forkAt` (§11.2, no request); the reason record is 607's and the clerk's modes 645's |
| BCR-j9 (§9.2, §11.2 knowledge: DM-only / revealed / discovered; submergence feeding discoverability) | 626, 627, 629, 636 | as forecast; discoverability is V14 §2.3's derived flag (no base field) |
| BCR-j10 (§11.1 VTT: crop scope, stable grid origin, the version pin) | 628, 629 | as forecast |
| BCR-j11 (§12 budgets, §8 styles: per-regime budgets, extents, exaggeration, LOD by tier) | 623, 624, 625, 630, 631, 632 | as forecast |
| BCR-j12 (§7.7 / V08 port: the derived-facts port, the charter per campaign, the settlement-map record) | 621, 643 | as forecast |
| BCR-j13 (§6 determinism: per-stage seeding, the version table, no randomness in comparators) | 615, 608, 633 | per-stage seeding is §6.1's existing rule applied by V13 §3.17 (the world's concerns and stage ids are the request); the version table is `WorldRecipe.snapshot` (608); the comparator lint is T-V13-1's CI row (633) |
| BCR-j14 (§3 kernel, M1 API pass: only the gate's kernel rows) | 601, 602, 609, 611, 615 | confirmed: no request touches the kernel beyond K1 (a `Layer` value), K5 (a role), K6 (concerns and stage ids), K9 (the transient arena's lifetime); no domain primitive is asked for |
| BCR-j15 (§8 rendering, §2 records: the 2.5D projection family, z-completeness, the raise-or-lower edit, vertical ends) | 606, 607, 608, 617, 619, 622, 623, 625, 636 | as forecast |

**How to read an item.** Each item names the base's (or the volume's) exact heading, quotes the current text **once**
(the fragment the request quotes; every quote below was verified by fragment search against `docs/ARCHITECTURE.md` or
the named volume on 2026-10-17 — three differ only in markup or wrapping, noted inline), and gives the new text in
full where several requests were merged into one text, or the mechanism to add with the request that holds the full
text (single source: the volume's BCR is the one statement; this file never copies a text it can cite). *Requests*
lists the BCR ids; *Gate* names the row of item 140 (K1 … K13, M1 … M11) the item corresponds to where one exists;
*BCR-j* the forecast row it fulfils; *Needed by* the volumes whose text cites the request. **BASE** means the change is
built inside the base's milestones, with the milestone named — the gate's rows at M1's API pass (item 140: "the model
rows are recorded as M1 items"), a schema field reserved then and read as absent by every earlier reader (J-RF1.3's
rule, as file f's item 226 reads it); **STAGED** means the change is applied to the design now and built with the named
staged milestone (V13 §8: M-W0h after M4, M-W0 – M-W4 after M-SF; V14 §8: M-ENC after M1, M-SITE-A after M6-U,
M-SITE-F after M-W1, M-25D after M4). Order: the base's section order, then the cross-volume items in volume order;
within a section one item, consolidated.

**Four rules bind every item** (the integrator's rulings in `_integrate-world-sites.md` §1, applying the chief
architect's rulings J-V13.51–62 and J-V14.49–55): **(R-a) one union text** for `Recipe.product` and
`StrategyRegistry.products` (J-V13.61; items 608, 611); **(R-b) one text per shared line** of §13.2, §16 and V06 §3.23
(2) (SW-29, SW-30; items 633, 635, 641); **(R-c) no random or jitter term in siting** (J-V13.53); **(R-d) V13 owns the
suitability slot, V14 its purpose terms** (J-V13.51). Item 101 R2 (file f's R-a) holds: every "refused" below is a
dossier fact's or a lock's; every other infeasible declaration is bent and named (V14 §3.2's `bend.site.kind`, V13's
`W_PLACE_*` offers).

**CONFLICT items:** none. The one open mechanism disagreement (R1-1, `_integrate-world-sites.md` §1.4: the import's
markers — V13's `SitingProposal`s with `demand: 'import'` against V14's `dropSite` per marker raised by the adapter)
touches no base text; it is the coherence pass's to read with reconciliation round 1's result and binds item 621's
`WorldPort` only in that the adapter writes no event into the world document under V13's reading.

*Not items* (listed so nothing is re-found): V14 §10.2's effects on **V01** (an access of source `site` is never a
`HoodPlace` and is skipped by the opening pass; `promoteEncounter` `as: 'place'` makes a `HoodPlace` of kind `place`)
are carried by item 636's II.7.4 text and V14 §3.13 (d), read by V01 through the base; on **V05** (no site below an
island, SC5; R3 (5)'s island slabs by a registry lookup) by V14 §3.14 and §5.6. V13 §10.2 (R-V14-1 – 12) and V14 §10.2's
V13 row are requests between the two volumes, confirmed in `_integrate-world-sites.md` §1, not base changes.

---


### 1.1 What is built, in what order; the two size ladders

**600.** **The world row** (BCR-V13-20). *Current text* (the SettlementForge row of the staged table):
> `| the SettlementForge connection | the host client, the port leader and adapters, persistence in the host, the players' view | volume 8 (§7.7, §11.2–§11.4, §14's `@plat/port`) | M-SF (SF0 – SF7, VH) |`
*New text:* a row appended after it, as BCR-V13-20 writes it — the world regime, placement and hydrology: the world
document (W0–W9), the placement of settlements (P1–P5), the charter, the water state at both scales, the two verbs and
the cascade, the world port, the ecosystem-shaped exports and the adapter | volume 13 (§2.3, §2.4, §2.8, §2.9, §4.2 S1,
§6.1, §6.3, §7.1, §7.3, §7.7, §8.4, §9.5, §11.1, §14) | M-W0h after M4; M-W0 – M-W4 after M-SF. *Note for the pass:*
volume 14 requests no §1.1 row; the pass may add one in the same form from V14 §1.1's table (world sites, encounter
crops, the 2.5D view; §2.1, §2.2, §2.7–§2.9, §3.4, §4.12, §6.1, §7.1, §8.2, §8.4, §9.2, §11.1–§11.2, §14; M-ENC,
M-SITE-A, M-SITE-F, M-25D) so the table names every staged subject (INDEX §1 does). *Requests:* BCR-V13-20. *BCR-j:* j1.
*Needed by:* V13. **STAGED (M-W0h; M-W0 – M-W4).**


### 2.1 Layers, coordinates, units, ids

**601.** **The fourth `Layer` value** (BCR-V14-3, its §2.1 part). *Current text:*
> `layer ∈ {underground, ground, sky}` is a field on every geometric entity and every display-list item
*New text (mechanism):* `layer ∈ {underground, ground, sky, site}` — `site`: a world site's levels, one part per level
numbered by `Document.nextSitePart` from 1 (no part 0), addresses `site<n>/kind:token`, the level mapping §2.2 rule 1's
underground mapping, drawn by §8.4's underground view on its own `LayerSpec` (item 624); the kernel's `Layer` type
(`types/ids.ts`) **appended**, K1's append-only test the bar (Part E bar 1, T-V14-32). *Requests:* BCR-V14-3. *Gate:*
**K1** (appended, no path assuming `'ground'` is the root; every existing digest byte-identical). *BCR-j:* j4, j14.
*Needed by:* V14, V13 (its address examples), V04 (the overlap test over `site` parts, item 640). **BASE (M1's API
pass: the value appended; its parts exist only from M-SITE-A).**


### 2.2 The plat — one arena per layer, five refinement levels as views, roles instead of stored indices

**602.** **`PlatKey` on a `site` part; the `passage` edge role** (BCR-V14-3's §2.2 part; BCR-V14-24). *Current text*
(rule 7's role table, the roles listed):
> `tunnel`, `gallery`, `chamber_wall`, `access_point`, `link_end`, `invert_knot`, `margin`
*New text (mechanism):* `PlatKey.part` on the `site` layer round-trips as on any (K2 unchanged; a site part's level
mapping is rule 1's underground mapping); rule 7's table gains the edge role **`passage`** — structural, non-indexed,
on `site` parts, the tunnel role's twin, its half-width answered by the site kernel's `SpineWidths` callback
(`passage.widthCm[widthClass] ÷ 2 + wallCm`, V14 §1.1) so `corridorUnion` reads a site's widths as the sewer's;
`chamber_wall`, `access_point`, `link_end` and `margin` are reused on `site` parts; appended without digest change.
*Requests:* BCR-V14-3, BCR-V14-24. *Gate:* **K5** (the role registry append-only, `LINEAR_PARTS` extensible per
transaction). *BCR-j:* j14. *Needed by:* V14. **BASE (M1's API pass: the role appended; read only from M-SITE-A).**


### 2.3 Terrain and water

**603.** **`Terrain`: the carve delta, the surfaces, the groundwater field, the datum and the wind behind one accessor
each** (BCR-V13-2; the consolidated record of item 140's M2–M4). *Current text:*
> `datumCm: Cm /* the elevation that height 0 represents, relative to mean sea level; one per document (per island for sky terrain); set by S1 (§4.2) */;`
> `seaLevelCm: Cm /* in the datum frame */; wind: { bearingCdeg: number; strength: number }; features: SiteFeature[] /* hill, spur, valley, terrace, cliff, ravine */;`
*New text:* BCR-V13-2's in full (V13 §10): `datumCm` set by S1 and by nothing else, read only through `datumOf(doc)`
(on a placed frame the world's DEM at the placement's origin through `Document.worldRef`, a derived reading, never
written — C13-01); `wind` read only through `windOf(doc)`; the fields `carveDeltaCm: Map<number, Cm>` (per hydro cell,
`preCarveHeightAt(doc, p) = heightAt(p) − carveDeltaCm[cell(p)]`; empty on an older document, reported),
`surfaces: WaterSurface[]` (one generation-time surface per `WaterBody` plus every dated surface; never carved into the
heightfield) and `groundwater: GroundwaterField` (read only through `waterTableAt(doc, p, when?)`). The record forms
are V13 §2.2's (`WaterSurface`, `GroundwaterField`). *Requests:* BCR-V13-2. *Gate:* **M2** (the carve delta
recoverable; water surfaces separate from the heightfield), **M3** (the datum behind one accessor), **M4** (the water
table behind one function). *BCR-j:* j2, j3. *Needed by:* V13, V14 (G6), V04 (item 640), V02 (item 638). **BASE (M1's
API pass) for the three fields' declaration and the two accessors over S1's values — absent fields read as absent,
`datumOf` and `windOf` answering S1's values on a standalone frame; STAGED (M-W0h) for the surface step, the
groundwater step and the readers' switch (V13 §3.12.1, §3.12.3).**


### 2.5 Districts, quarters, blocks, plots — the PLOT MODEL, reservations, allocations and the context vector

**604.** **A world site as a reservation** (BCR-V14-13, its §2.5 half; the §4.12 half is item 611). *Current text*
(the reservation kinds):
> `kind: 'castle'|'plaza'`
*New text (mechanism):* `Reservation.kind` gains `'worldSite'` with `site: Id` — claimed first as the castle's is
(§4.2 S3 (2), (8)) at a host-founded settlement over a free-standing site, the site's enclosure, buildings, plots, ways
and terrain pre-edit entering the creation prefix as drawn constraints (§7.2; V14 §3.9 (e) (1), C14-16), and at an
`inFrame` drop (V14 §3.9 (g)) by §7.3's reservation operator. *Requests:* BCR-V14-13. *BCR-j:* j4. *Needed by:* V14,
V07 (item 642), V13 (`FrameCharter.sites`). **STAGED (M-SITE-A for the `inFrame` claim; M-SITE-F for adoption).**


### 2.6 Buildings, heights and ground datum, wings, materials, sub-locations, the stage-3 interface

**605.** ***Basements*: the water table is the groundwater function** (BCR-V13-3). *Current text:*
> The **water table** is the nearest water body's surface elevation — a moat's the one level §4.2 S3 (10) derives from its `flowFrom` source, every other body's shore terrain sample — plus the freeboard `freeboardCm` (default 50) for a plot within `waterTableM` (default 40 m) of a shore, and elsewhere the height of the drainage line: the `hydro` cell nearest the footprint's centroid whose `flowAccum` reaches `drainageAccumCells` (ties by cell index; where no cell reaches it, no water table limits the cellar) — the three values are §10.2's basement-gate row.
*New text:* BCR-V13-3's in full — the table is `waterTableAt(doc, p, when?)` (V13 §3.12.3) sampled at the footprint's
lowest terrain sample plus `freeboardCm`; `waterTableM` and `drainageAccumCells` retired from the basement-gate row;
`when` the building's construction week (V13 §3.13.5); the cellar's class after construction the shared test's result
stored on the building (item 638). *Requests:* BCR-V13-3. *Gate:* **M4**. *BCR-j:* j3, j7. *Needed by:* V13, V04
(item 640), V02, V03 (a crypt's depth reads the same function). **STAGED (M-W0h; until it lands the paragraph's
nearest-body rule stands and V04's readers keep it, the switch reported as the version's shift at M-W0h's landing —
BCR-V13-21's order clause).**


### 2.7 Walls, gates, towers, castle, bridges; greenery, land use, decorations, pins; labels; content entities; the staged layers' records

**606.** **The anchor and the card as staged records; `verticalEnds`; links across layers** (BCR-V14-1, BCR-V14-6,
BCR-V14-11's §2.7 half). *Current text* (the staged records listed in §2.7 and the link's definition):
> `HistoryHint`
> a link between elements of different parts
*New text (mechanism):* (a) `SiteAnchor` and `WorldSite` (V14 §2.2, §2.3) join the staged layers' records,
schema-complete and empty until M-SITE-A, with registry rows (item 607); (b) the derived reading
`verticalEnds(id): { a: { elevationCm; at }; b: { elevationCm; at } }` declared here for `AccessPoint` (the terrain or
floor at `ground.at` — the anchor's storey floor for source `site`; the element's floor at `under.at`, or
`SiteReach.floorCm` for source `site`, so the host never opens the site document), `UndergroundLink` (its two
elements' floors), V03's stair core (its two storeys' bases) and V14's `VerticalLink` (its stored ends), read by §8's
renderers, §11.1's VTT portals and the clerk; (c) an `UndergroundLink`'s ends may lie on an `underground` part and a
`site` part (the address keyed on end `a`'s part as today). *Requests:* BCR-V14-1, BCR-V14-6, BCR-V14-11. *Gate:* **M7**
(the anchor record reserved), **M10** (an elevation at both ends of every vertical link). *BCR-j:* j5, j15. *Needed
by:* V14, V04 (item 640), V03 (item 639). **BASE (M1's API pass) for the two records' reservation and `verticalEnds`'s
declaration over the base's own kinds; STAGED (M-SITE-A) for their producers.**


### 2.8 Identity, lifecycle, provenance, the entity registry

**607.** **The reason record; the `ZDecl` column; the world's and the site's registry rows** (BCR-V13-17, BCR-V14-5,
BCR-V13-28, BCR-V14-1's rows, BCR-V14-16's lifecycle note). **Consolidated.** *Current text* (the record kinds
sentence):
> a **derivation record** (the inputs of its derivation — persisted for the kinds whose stage declares one, outside the model digest), and a **provenance** record (how it was last derived — rebuilt by every derivation, never persisted, never in the model digest; LC-25).
*New text:* (a) BCR-V13-17's sentence in full — a **reason record** (item 140 M8; V13 §2.2's one declaration: the
rule row, the inputs with their values, the numbers and a `MsgRef`; written by every stage of V13 and V14 and by the
cascade for every fact it creates or changes, superseding the former; outside the model digest, inside the records
digest; read by the clerk's `why`, `whatCaused`, `whatChanged`, `whatIf`) stands between the derivation record and
the provenance record. (b) Every registry row of a drawable kind carries **`z: ZDecl`** — `{ base: Reading; top:
Reading } | { surface: Reading } | { flat: true; reason: string }`, `Reading` a path or a derived function name — the
table of V14 §5.4 the shipped rows; a drawable kind without one fails the registry's CI test (T-V14-16); the
display-list columns are item 622's. (c) The registry gains one row per world kind — `Reach`, `WaterSurface`,
`Watershed`, `Territory` (and its provinces), `WorldRoute`, `SitingProposal`, `ResourceSite`, the spring, `Placement`,
`FrameCharter`, `TerrainTrace`, `SurfaceTrace`, `ReasonRecord`, the `coast` record and the `zone` and `importHint`
records — each with every column the completeness test reads and its `z` (`{ surface: 'dem' }` for the rasters,
routes, borders, glyph marks and `TerrainTrace`; `{ base: 'bed', top: 'elevationCm' }` for `WaterSurface` and
`SurfaceTrace`; `{ flat, reason: 'furniture' }` for a label candidate; V13 §5.7); `EntityKind` gains the lineage units
`'placement'` and `'territory'`. (d) The rows for `anchor` and `site` (BCR-V14-1): the anchor's `z` flat with reason
"furniture", the card's none (no geometry), their lifecycle rows V14 §2.9's. (e) `Existence` is unchanged: the card's
`WorldSiteLifecycle` stands beside §2.8's `Lifecycle` with V14 §3.8's mirror rule (BCR-V14-16). *Requests:*
BCR-V13-17, BCR-V13-28, BCR-V14-1, BCR-V14-5, BCR-V14-16. *Gate:* **M8** (a reason record reserved per generated
fact), **M9** (z-completeness: the gap list is V14 §5.4's table, complete at landing), **M6** (the `Placement` row).
*BCR-j:* j6, j8, j15. *Needed by:* V13, V14, V10 (item 645), V04 (its kinds' `z` rows), V05 (its island row). **BASE
(M1's API pass) for the reason record's reservation and the `z` column with the base's own rows (V14 §5.4's table
over the base's kinds); STAGED (M-W0h for the frame-side reason writers; M-W1 for the world kinds' rows; M-SITE-A for
the site rows; M-25D for the lint).**


### 2.9 The document and serialisation

**608.** **`Document`, `Recipe` and the view state: the world and site products, `worldRef`, `charter`, `namespace`,
`nextSitePart`, the view keys** (BCR-V13-5, BCR-V14-3's §2.9 part, BCR-V14-7, BCR-V14-19). **Consolidated; one merged
union text (R-a).** *Current text:*
> `product?: 'town'|'hood' /* absent reads 'town'; 'hood' a standalone neighbourhood document (V01 §3.10.1) */; hood?: HoodRecipe /* present exactly when product is 'hood' (below; its rules V01 §3.10.1) */;`
> the three part counters (`nextUndergroundPart`, `nextSkyPart`, `nextGroundPart`)
*New text (the merged line and the mechanism):*
> `product?: 'town'|'hood'|'world'|'site' /* absent reads 'town'; 'hood' a standalone neighbourhood document (V01 §3.10.1); 'world' a world document (V13); 'site' a world-site document (V14 §3.1) */; hood?: HoodRecipe /* present exactly when product is 'hood' (below; its rules V01 §3.10.1) */; world?: WorldRecipe /* present exactly when product is 'world' (V13 §2.2) */;`
> `charter?: FrameCharter /* a placed frame's one boundary record (item 140 M5; V13 §2.2): a recorded input of S0 and S1, in the records digest, never the model digest */;`
`Document` gains, after `nextUndergroundPart`, `worldRef?: { world: Uuid; placement: Id }` (written only by the frame's
own `charter` event, author `world`), `namespace: string` (the address namespace segment, item 616; minted once,
kept on clone and save-as) and `nextSitePart` (the canonical form's fourth part counter, never decreasing); a world
document's `base` holds its rasters as `fields` chunks and its records in the entities block, its log V13 §4.1's
events; a site document's creation prefix holds its drop and charter (V14 §3.1). The view keys: per viewer
`worldZoom` (0–3, default 1), `worldLayer` (default `relief`), `showTraces` (default false), `surfaceDate` (a `Week`,
default the document's week), the world document's `week` set by the season control or `view.set { week }` (V13
§2.1); per viewer `projection` (V14 §2.6; default `{ family: 'flat' }` — the flat map is the default, item 141; never
in a digest, an export's model or the log) and `siteOpen`; **shared** `encounter` (one open encounter per document,
last-writer-wins by Lamport and session) and `party: { tier; places }` (the document's party knowledge when no host is
bound, a mirror of `MapRecord.party` when one is, written by the owner and editor roles, read by `ViewOpts.viewAs`'s
key form — C14-17). *Requests:* BCR-V13-5, BCR-V14-3, BCR-V14-7, BCR-V14-19. *Gate:* **M5** (`Recipe.charter` as S1's
input record), **M6** (`worldRef` naming the placement the world document holds), **M11** (the projection as view
state outside the hash), K10 (`WorldRecipe.snapshot`, V13 §2.7, names every version). *BCR-j:* j4, j11, j13, j15.
*Needed by:* V13, V14, V01 (the `hood` value stands), V07 (the `village` product is §4.12's, item 611), V09 (the view
keys), V08 (`party`). **BASE (M1's API pass) for the union values, `worldRef`, `charter`, `namespace`, `nextSitePart`
and the `projection` key's reservation (each absent before its producer); STAGED (M-W1 for the world's keys and
`week`; M-ENC for `encounter`; M-SITE-A for `siteOpen` and `party`; M-25D for `projection`'s renderer).**


### 3.4 Kernel operations the pipeline needs (complete list)

**609.** **The transient arena with no owner document** (BCR-V14-4). *Current text:*
> `type TransientKey = { transient: true; owner: Id /* the entity whose derivation opened it */; n: number /* per call, never persisted */ }`
> opened for one derivation call and gone at its end
*New text (mechanism):* `owner: Id` **unchanged** (no kernel type change beyond K1–K13): an owner-less arena's `owner`
is an `Id` of the form `view:<hash64>` naming no entity; the contract gains its **lifetime** — opened by a view (an
encounter), it lives while the view does, released by `encounter.close` and never at a derivation call's end — and
stays never persisted, digested or frozen; the seed is one ring and the model's faces enter as `fixed` rings (§3.4's
existing forms); the kernel's stub row (`API.md` §8) builds the form at M6-P. *Requests:* BCR-V14-4. *Gate:* **K9** (the
stub's designed contract admits an arena with no owner document). *BCR-j:* j14. *Needed by:* V14 (E2, E4), V03 (the
same arena cuts its storeys). **BASE (M1's API pass: the contract's lifetime clause; the stub itself at M6-P as
planned); STAGED (M-ENC) for its first view owner.**


### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace

**610.** **S1 reads the charter as its one input record; `frameOf`; the surface and groundwater steps** (BCR-V13-4;
BCR-V13-29's S1 (1) sentence is this item's). *Current text:*
> (1) **Heightfield:** 5-octave fBm (VG's measured character, `_critic-vg-ng.md` V7) with a low base frequency and a relief-character amplitude (metres by S0's relief class), plus **authored site primitives** from the request (hill, spur, valley along the river bearing, terrace, cliff, ravine, hollow for a lake or an oasis — VG's idea of authored mount, hollow and ridge primitives). Heights are stored in §2.3's range and datum; S1 sets `datumCm` to sea level on a coastal site and to the site's base elevation otherwise (a 3 000 m relief is ordinary).
*New text:* BCR-V13-4's in full — with `Recipe.charter` present and `source: 'world'`, the charter is S1's one input
record beside the seed and the tables: the field blended inward over the margin to meet `charter.edges` (V13 §3.11.2's
smoothstep), the fBm lattice position-keyed on `charter.worldSeed` and the cell's world position (item 615's §6.1 row),
`datumCm` = `charter.datumCm`; (2)'s coast from `charter.outlines.coast`, lakes and the sea's level from the charter;
(3)'s border head `charter.downstreamHeadCm` except at `in` crossings, accumulation seeded by `seedCells = round(Q ÷
r_cell)`, the descent guided by `charter.outlines.reaches`, the width law calibrated to the inlet's `widthCm`
(`W_CHARTER_WIDTH_CLAMPED`), an `out` crossing a required exit (`W_CHARTER_RIVER_MISSED`); S0's size step
`frameOf(size, aspect)` a pure table reading callable without a document; after (3) the **surface step** writes
`Terrain.surfaces` and `carveDeltaCm` and the **groundwater step** writes `Terrain.groundwater`, both re-run after
every terrain or water operator (§7.3). A standalone frame is unchanged. *Requests:* BCR-V13-4, BCR-V13-29 (its S1
sentence). *Gate:* **M5** (S1's terrain and water parameters as one input record — the charter's landing). *BCR-j:*
j2, j7. *Needed by:* V13, V14 (a site frame's S1, the crop frame), V04. **STAGED (M-W0h for the surface and groundwater
steps and `frameOf`; M-W1 for the charter's reading).**


### 4.12 The strategy interface, stage registration by declared I/O, and the stage-2 seam (pointer)

**611.** **The `world` and `site` products; `coordinateRegime`; `txForm: 'records'`; the `worldSite` destination**
(BCR-V13-7, BCR-V14-13's §4.12 half). **Consolidated; one merged union text (R-a).** *Current text:*
> `→ { product: 'base' | 'village', rung }` to the village product registered in `StrategyRegistry.products` (§4.12;
*New text:*
> `→ { product: 'base' | 'village' | 'world' | 'site', rung }` to the village product, by `Recipe.product: 'world'` to the world product (V13 §3.0: stages W0–W9, each a `StageDecl` with `txForm: 'records'`; the placement operators P1–P5 are §7.3 local operators, not stages), or by `Recipe.product: 'site'` to the `site` product (V14 §3.1's G1–G8, registered by `@plat/sites`; never by population), all registered in `StrategyRegistry.products` (§4.12;
`ProductDecl` gains `coordinateRegime: 'frame'|'world'` (V13 §2.1), read by the view's transform and the exports;
`StageDecl.txForm` gains `'records'` (a stage that writes records and rasters and no arena: no kernel transaction, no
K12 entry; the world's own `WorldCommitRecord` stands in, V13 §3.0); the `site` product's G- stages register by
declared I/O in `@plat/layout`'s registry with the concern `site` (item 615). `Destination` (`type Destination = { id;
kind: string …}`, the typed destinations of S3 (13)) admits `kind: 'worldSite'` for **S4 after adoption only** — the
adopted site's gate as a frame-scale destination inside the settlement's frame; V13's siting reads the card's
`attraction` and `routed`, never a destination (C14-04). *Requests:* BCR-V13-7, BCR-V14-13. *Gate:* **K6** (the stage
registry gains the world's and the site's stage ids without renumbering, item 615; `txForm`'s new value a model
field), K7 (the rank function over two stage registries holds: the products' stage sets are separate). *BCR-j:* j1,
j4. *Needed by:* V13, V14, V07 (the registration's form is item 202's). **BASE (M1's API pass) for the union values
and the two `Decl` fields; STAGED (M-W1 for the `world` product; M-SITE-A for `site`).**


### 5.2 Failure classes: detection, ladder, test

**612.** **F-WORLD, F-GW, F-PLACE and F-SITE** (BCR-V13-18's §5.2 part, BCR-V14-16's class). *Current text* (the
staged layers' table intro):
> **The staged layers' classes** are rows of the same table, each built with its layer, marked † with the volume section that states its detection, rungs, report and tests (the rows here are its pointers):
*New text (rows appended):* BCR-V13-18's row — `F-WORLD, F-GW, F-PLACE† [V13 §3.16] | W0–W9, the groundwater step at
both scales, P1–P5 | V13 §3.16's | V13 §3.16's, each ending in a reported clamp, default, offer or refusal;
`E_WORLD_SINK` and `E_GW_CAP` are bug aborts | T-V13-3, 5, 13, 14, 22, 23, 24` — and the row `F-SITE† [V14 §3.14] |
G1–G8, E1–E4, R2, R4 | V14 §3.14's table | §5.1's four tiers (bend, the stage's ladder, leave out and report, refuse
with the alternatives); never a whole-site or whole-crop retry | T-V14-26, T-V14-27`. *Requests:* BCR-V13-18,
BCR-V14-16. *BCR-j:* j6. *Needed by:* V13, V14, V12. **STAGED (M-W0h/M-W1; M-ENC/M-SITE-A).**


### 5.3 The invariant suite, by scope (SCL-1)

**613.** **The basement row reads the construction week** (BCR-V13-27). *Current text* (the base's §2.6 *Basements*
closing reference to §5.3's row; the quote wraps across a line in the base):
> §5.3's rows: a basement other than a crawl space or a raised crypt never under the flood band or below the water table
*New text:* BCR-V13-27's — "… below the water table **at its construction week** (`waterTableAt(doc, p,
constructionWeek(building))`, V13 §3.13.5); a present-week violation under a lawful `setSurface` or placement is a
`lockedBelowTable` report in the cascade's change list, never an invariant failure (item 137 (c))";
`constructionWeek(entity)` the derived reading of V13 §3.13.5 (the week of the epoch named by
`Lifecycle.since.epoch`, week 0 at generation) in `@plat/model`. *Requests:* BCR-V13-27 (with BCR-V13-21's third part
for V04's three tests, item 640). *BCR-j:* j7. *Needed by:* V13, V04, V02, V03. **STAGED (M-W0h).**


### 5.4 The generation report

**614.** **The world's and the site's codes** (BCR-V13-18's §5.4 part, BCR-V14-16's codes). *Current text* (the
`warnings` comment names the base's codes; `ReportCode` is a closed union). *New text (mechanism):* `stages[].warnings`
admits the world's codes of V13 §7.5's table (`W_WORLD_*`, `W_HEIGHT_CLAMPED`, `W_GW_*`, `W_SITING_*`,
`W_ROUTE_NO_PATH`, `W_POLITY_SEAT_MOVED`, `W_PLACE_*`, `W_PLACEMENT_OVERLAP`, `W_CHARTER_*`, `W_BLEND_CLIPPED`,
`W_SURFACE_*`, `W_CASCADE_TRUNCATED`, `W_IMPORT_*`, `W_MIGRATE_NO_CARVE`; the bug aborts `E_WORLD_SINK`, `E_GW_CAP`) and
the site's (`W_SITE_CONTEXT_BENT`, `W_SITE_VECTOR_MISSED`, `W_SITE_ENVELOPE_SHRUNK`, `W_SITE_NO_ACCESS`,
`W_SITE_NO_LEVEL`, `W_SITE_NEAR_VOID`, `W_SITE_WATER_PROVISIONAL`, `W_SITE_IMPORT_KIND`, `W_CROP_EXTENT_CLAMPED`,
`W_CROP_INCOMPLETE`, `W_Z_FLAT_UNDECLARED`); `ReportCode` is untouched — the refusals (`refuse.world.*`, `refuse.place.*`,
`refuse.charter.dossier`, `refuse.surface.date`, `refuse.import.*`, `refuse.site.*`, `refuse.encounter.noWorld`,
`refuse.raise.flat`) are §7.1 outcome keys rendered by V09's catalogue, never report codes (C13-53). *Requests:*
BCR-V13-18, BCR-V14-16. *BCR-j:* j6. *Needed by:* V13, V14, V09, V10. **STAGED (with each code's stage).**


### 6.1 RNG and stream design

**615.** **The world's concerns and stage ids; the `site` concern and the G-/E- stage ids; position-keyed noise on a
placed frame** (BCR-V13-8, BCR-V14-14, BCR-V13-29's §6.1 row). **Consolidated.** *Current text:*
> `| concern | cap | keyed by — and read by |`
> Town-level draws — S0's feature draws, terrain noise and the per-document furniture (the compass and the emblem, §9.5) — use the **town root's** entity key
*New text (mechanism):* (a) the concern table gains BCR-V13-8's rows — `world.recipe` (W0's template draw by the world
root and the op ordinal; W1's noise by the op index and the cell position), `world.climate` (W3's moisture start jitter
by the coarse row), `world.resources` (W5's per-cell draws by the rule ordinal and the cell), and the **reserved ids,
not streams** `world.siting` (siting draws nothing: V13 §3.7 (6)'s tie-break, R-c), `world.polity`, `place.search`;
`water.delta`'s row appends "W4's distributary shares, keyed by the reach's lineage" and `naming`'s "W9's world names
with the world's culture context"; (b) the concern **`site`** (the site pipeline's draws, V14 §3.15: G2's age, G4's
rule choice, G5's cave field, agents, lode and lattice jitter, G8's access candidate; G1, G3, G6, E1–E3 and R1–R4 draw
nothing); (c) the stage registry gains `W0` … `W9` (with `W6a`, `W6b`, `W7a`, `W7b`), `WORLD_PLACE`, `WORLD_CASCADE`,
`G1` … `G8`, `E1` … `E4` and `R1` … `R4` — **appended**, no `P1` … `P5` ids, no existing key moves; (d) the town-level
draws sentence reads BCR-V13-29's: terrain noise uses the town root's key **on a standalone frame**; on a placed frame
(`Recipe.charter` with `source: 'world'`) S1 (1)'s fBm lattice is **position-keyed on the world** — each octave's
lattice value at a cell the mixer's draw keyed by (`charter.worldSeed`, the octave, the cell's world x and y through
`toWorld(charter.placement, ·)`) with the world root as the derivation unit, the frame's seed keying only its authored
primitives and its water draws — so two frames whose margins overlap sample one field and agree there (item 135 (c);
T-V13-13's two-frame fixture, expected-fail until this item is applied: V13 §12's one declared deviation).
*Requests:* BCR-V13-8, BCR-V13-29, BCR-V14-14. *Gate:* **K6** (concern and stage registries append-only without
renumbering; new streams independent). *BCR-j:* j13, j14. *Needed by:* V13, V14, V12 (the goldens' stability). **BASE
(M1's API pass) for the ids' appending; STAGED (M-W1 for the world's streams and the position-keyed lattice; M-SITE-A
for `site`).**


### 6.3 Identity: address ids, lineage keys, carry-over (and the scope of stability, stated)

**616.** **The namespace segment; the world's anchors** (BCR-V13-6; BCR-V13-28's anchor-table rows). *Current text:*
> Every entity has two identities: an **address** that everything points at (edits, locks, assignments, pins, labels, households, exports, the host) and a **lineage** that keys its random streams. They start equal and separate only when an entity is re-derived.
*New text:* BCR-V13-6's in full (as corrected for SW-21) — every address carries a leading namespace segment, eight
base-32 characters of the first 40 bits of `H128(docId)` at the document's creation, kept on clone and save-as
(`Document.namespace`, item 608; V13 §2.5), so two documents merged into one package never collide (bar 7); a
reference form without the segment resolves inside its own document (the base's forms unchanged), with it across
documents (V14's `SiteReach`, the world's `Placement.subject`; a document's own references, the anchor's among them,
stay bare — V14 §2.8); adoption rewrites the segment to the settlement's (V14 §3.9 (e)). The anchor table of §6.3
gains V13 §2.5's rows — a reach by course overlap ≥ 50 % within one fine cell, a territory by its seat, a placement by
its subject, a surface by its body and date, a route by its ends — and V14 §2.8's lineage parents (the card as a site
document's town root). The sentence "The **derivation unit** is the entity whose derivation run created this one,
declared per stage in the registry" (the base's §6.3; the quote's capital and line break differ) stands, the registry
rows of item 607 declaring the world's and the site's units. *Requests:* BCR-V13-6, BCR-V13-28. *Gate:* **M1** (a
namespace segment in the address form). *BCR-j:* j4. *Needed by:* V13, V14 (T-V14-7, T-V14-22). **BASE (M1's API
pass: the segment minted at creation, read from `docId` on an older document at load, item 608); STAGED (M-W1 for the
world's anchors; M-SITE-A for the site's).**


### 7.1 Edits are ordered events on addresses; the named actions; the edit targets; dry-run validation

**617.** **The verb on `EditBase`; the author `world`; the world's, the site's and the raise-or-lower edit kinds; the
conversions; the outcome rows** (BCR-V13-9, BCR-V14-9, BCR-V14-15). **Consolidated.** *Current text:*
> `interface EditBase { seq: number /* from the document's nextSeq; never reset; survives rebase; an event an epoch carries in `EpochInputs.dossier` takes its seq when the epoch is appended (§7.7 item 6; J-A22.76) */; author: 'user'|'host'|'epoch'|'migration';`
*New text:* BCR-V13-9's `EditBase` in full — `author` gains `'world'` (an event the world's placement fold writes into
a frame's log); `verb?: 'happened'|'alwaysSo'` on every terrain and water edit (`happened` default; an older event
reads `alwaysSo`; ignored on every other kind, a placement and V14's remove/destroy included — SW-28). The `EditEvent`
union gains (a) V13 §4.1's variants — `worldRecipe`, `setSurface` (its `surface` admitting a site level's `{ kind:
'site'; body; level }`, SW-06), `rerouteReach`, `requestCharter`, `bindPlacement`, `placeFrame`, `setPlacement`,
`mirrorFrame`, `worldWins` with `ids?`, `unplaceFrame`, `setSeats`, `deleteTrace`, `addEvent`, `fork`, `discardFork`,
`commitFork`, the frame's `charter` — with `setField.key` admitting `'world'`, `date?` on `setField(terrain)`,
`rerouteReach` and `moveCourseKnot` (≤ the document's week; forbidden under `alwaysSo`, SW-27), `adjust.param` the
world params with `fromStage` `'W0'|'W3'|'W5'`, `EditScope` `{ kind: 'world'; stage; box? }`; (b) V14 §4.2's —
`dropSite`, `setSiteRequest`, `promoteEncounter`, `adoptSite`; (c) `raiseLower { id; target; deltaCm; mapped }` (V14
§4.6: the dry run maps the drag to the one attribute the model stores, the fold runs the mapped base event; a target
with no elevation path refused `refuse.raise.flat`); `ConversionOp` gains `destroySite`, `occupySite`, `vacateSite`,
`damageSite`, `restoreSite`, `repurposeSite`, `expandSite`, `collapseUnit`, `breachUnit`, `floodSite`, `drainSite` (the
last two folding to `setSurface`); the `setAttr` paths of V14 §4.2 and V13 §1b.3; `ConflictAction.kind` gains
`'keep'|'takeOffer'|'accept'|'cancel'` with `offer?: number`; the dry-run outcome table gains V13 §4.1's and V14 §4.9's
rows (the refusals as `refuse.*` keys, the bends as `bend.*`). *Requests:* BCR-V13-9, BCR-V14-9, BCR-V14-15. *BCR-j:*
j6, j7, j8, j15. *Needed by:* V13, V14, V09 (item 644), V10 (item 645), V06 (the `terrainWater` op's verb). **BASE
(M1's API pass) for `verb` and `author`'s value; STAGED for each kind with its volume's milestone (M-W0h the water
edits' verb and `setSurface`; M-W1 the placement kinds; M-ENC `promoteEncounter`; M-SITE-A the site kinds; M-25D
`raiseLower`).**


### 7.3 Locality — effective scope, local operators, edit fates, recorded inputs, the oracle (G-P3)

**618.** **The cascade's rows and the placement's row** (BCR-V13-10). *Current text:*
> `| edit reaches | local operator | pinned | beyond it (declared, never presented as local) |`
*New text (rows appended):* BCR-V13-10's two rows — a water surface, a terrain stroke or a reach course at either
scale (with `verb`): the cascade (V13 §3.14.2: terrain or surface → flow, flats, accumulation → surfaces → the table →
the consumers → one level up, each a local operator over the dirty watersheds with the border pinned; S1's water and
terrain operators its first step at the frame), pinned the dirty set's border cells and their surfaces, every dated
surface, every lock; a sea-level change declared whole-coast; a placement (`placeFrame`, `setPlacement`, `mirrorFrame`,
`worldWins`, `unplaceFrame`): P1–P5 then W9, W7–W8 over the landmass, pinned the frame's arenas, plots, buildings and
locks and other placements, `worldWins`'s Re-derive from S1 declared. V14 §4.7's rows (a drop's, an adoption's, a
conversion's) read these and §7.3's existing reservation and assignment rows and add none. *Requests:* BCR-V13-10.
*BCR-j:* j7, j8. *Needed by:* V13, V14, V04, V06. **STAGED (M-W0h at the frame; M-W1 at the world).**


### 7.4 Lifecycle of every edit kind (create · read · persist · regenerate · undo · migrate) — G-P8

**619.** **The lifecycle rows of the new kinds; the second reserved session** (BCR-V13-9's §7.4 part, BCR-V14-9,
BCR-V14-15). *Current text* (the table's rows per kind; the sessions rule naming the reserved session `host:port`).
*New text (mechanism):* the table gains V13 §2.6's rows for the world's kinds (the recipe, surfaces, reaches, the
placement and charter rows, traces, seats, the fork, `addEvent`) and V14 §4.2–§4.6's rows (`dropSite`,
`setSiteRequest`, `moveAnchor` as a `setAttr`, the delete as **Remove**, the conversions as **Destroy** and the
`siteState` ops, `promoteEncounter`, `adoptSite`, `raiseLower` folding as the mapped event); §7.4's sessions rule
names the **second reserved session `world:place`** beside `host:port` — the world's placement fold writes a frame's
`charter` event there (author `world`, no group, in no user's undo stack; undone only with the world's placement edit,
V13 §4.4). *Requests:* BCR-V13-9, BCR-V14-9, BCR-V14-15. *BCR-j:* j6. *Needed by:* V13, V14, V09. **STAGED (with each
kind's milestone).**


### 7.6 The override layer and editable tables (G-P12; owner amendment 5)

**620.** **The site tables; the world's tables** (BCR-V14-10; V13 §2.3's tables through V11, item 646). *Current text*
(the registry's rows are V11's; no site or world table exists). *New text (mechanism):* the registry gains
`tables/sites/*` (V14 §2.5: `admissibility`, `kinds`, `grammar`, `extent`, `purpose`, `lifecycle`, `occupancy`, `crop`,
`embed`, `damage`, `view25`), editable by `editTable` with §7.6's validation, the admissibility row's `context` keys
fixed and every other cell by its schema (the grammars and lifecycle rows `calibratable: false`); V13 §2.3's fourteen
tables (`world.sizes`, `world.recipeOps` with `world.templates`, `world.climate`, `world.hydro`, `world.groundwater`,
`world.biomes`, `world.resources`, `world.suitability`, `world.routes`, `world.polity`, `world.labels`, `world.glyph`,
`place.coherence`, `water.class`, `water.flood`; the style rows `style.world`) join V11's registry as rows with every
cell `{value, unit, provenance, calibratable}` (item 646). *Requests:* BCR-V14-10. *BCR-j:* j5. *Needed by:* V14, V13,
V11, V12. **STAGED (each table with its first reader's milestone; V14 §8's register check at every exit).**


### 7.7 Intent, character, constraints, assignments, the forms catalogue (O10; the ASSIGN hook)

**621.** **The world port; `Assignment.site`** (BCR-V13-11, BCR-V14-12). **Consolidated.** *Current text:*
> `dossier?: DossierRef /* set by the dossier port (`@plat/port`, §14) on every event a dossier change generates through the host door (§11.4): the element's binding key, opaque to the module (§7.7 item 12) */;`
> `interface Assignment` — `{ id; granularity; target?; dispersed?; criteria? … }`
*New text:* the §7.1 line unchanged; §7.7's port paragraph gains BCR-V13-11's **world port** paragraph in full
(`@plat/port/world`, one adapter folder per host line, V13 §3.11.6: outbound `derivedFacts(world, placement) →
SettlementMapRecord`, `charter(world, campaign) → FrameCharter`, `proposals(world, demand) → SitingProposal[]`,
`routes(world) → WorldRoute[]`; inbound `seats(world, seeds)` and `costLaw(world, law)` as recorded inputs, and the
seventh method `events(world, events: WorldEvent[])` delivering the host's dated events as dossier-tier facts for the
world's event index (V13 §2.2; SW-07); the host reads derived facts and never an arena, the map writes no dossier fact
except through this door as a derived fact — bar 9; the view command `clock(world, week)`); V08's unions gain the
messages (item 643). `Assignment.site?: Id` — the card whose programme rides as the building's programme (the surface
exception, item 133 (c)); V03's A1 reads it first (item 639); S11's mutator and `ClassRules.pick` read the card's
`storeysAbove` and `levelsBelow` as `editedPaths`-style overrides kept by every later run. *Requests:* BCR-V13-11,
BCR-V14-12. *BCR-j:* j5, j12. *Needed by:* V13, V14, V08, V03. **STAGED (M-W1 for the port's three outbound calls and
`events`, M-W2 for `seats`, `costLaw` and `routes`; M-SITE-A for `Assignment.site`).**


### 8.1 The display list (renderer-independent, columnar, incremental)

**622.** **`baseCm` and `topCm` columns** (BCR-V14-5's §8.1 part). *Current text* (the display-list item's columns name no
elevation). *New text (mechanism):* the display-list item gains `baseCm` and `topCm`, filled from the kind's `ZDecl`
(item 607) — unused by the flat renderer, read by R2–R3's projected tile build (V14 §5.5–§5.6). *Requests:* BCR-V14-5.
*Gate:* **M9**. *BCR-j:* j15. *Needed by:* V14. **BASE (M1's API pass: the two columns reserved, 0 before M-25D);
STAGED (M-25D).**


### 8.2 Style sheets as data: roles, contrast, symbolisation, paint programs, layer order, presets (G-R2)

**623.** **`StyleSheet.projection`, `StyleSheet.vtt.squareM`, the `style.world` rows** (BCR-V14-7's §8.2 part,
BCR-V14-8's style field, BCR-V13-13's style table). *Current text* (`StyleSheet` has no projection rows and no `vtt`
field; the style table has no world rows). *New text (mechanism):* `StyleSheet.projection: ProjectionStyleRow[]` — one
row per family (V14 §5.6 (7): the key light's azimuth and elevation at the fixed sun, `sideStep`, the edge stroke, the
roof's tone, the terrain's slope darkening, the default `exaggeration` 1.5 (`bw-print` 1.25), the cutaway's ghost alpha
0.35), resolved by §8.2's slot resolution in every shipped sheet (the loader refuses none); `StyleSheet.vtt: { squareM:
1.5 /* or 1 */ }` — the crop's grid cell and the export's default, set by the export dialog's "remember" as a
`setStyle`, never a view key (C14-39); the style table gains `style.world` (V13 §5.1's rows: the relief ramp, the biome
colours, `riverDrawM3s` per stop, `ghostDepthCm`, the band ramps — V11 writes the rows, item 646). *Requests:*
BCR-V14-7, BCR-V14-8, BCR-V13-13. *BCR-j:* j11, j15. *Needed by:* V14, V13, V11, V09. **STAGED (M-25D; M-ENC; M-W1).**


### 8.4 Layers, shadows, heights

**624.** **The world layers; the sun from the placement; the `site` layer's `LayerSpec`** (BCR-V13-13, BCR-V14-3's §8.4
reading). *Current text:*
> `latitudeDeg: number /* path mode; the view's default is the latitude in force — the recipe's `Intent.latitudeDeg` (g item 102; DR29), else 50 — while the model-side sampler reads the recipe's latitude itself (§4.5) (file f items 296, 391) */ };`
*New text:* BCR-V13-13's line in full — on a placed frame the placement's latitude and bearing (mirrored: reflected)
through the one view-side accessor `sunAt(doc, week, hour)`, a derived reading through `worldRef` (V13 §3.11.5); else
the recipe's `Intent.latitudeDeg`, else 50; the model-side sampler keeps the recipe's latitude (a placement never moves
a model output, C13-01). `LayerSpec` admits the `world` product's layers of V13 §5.1 (the raster layers as tile sets,
the vector layers through the display list), the frame's three overlays (`waterClass`, `flood`, `traces`), and the
`site` layer drawn by §8.4's underground view on its own `LayerSpec` (`underView` admitted: `cutaway` over the ground's
ghost where the site has a ground, `solo` where it has none; V14 §5.2). *Requests:* BCR-V13-13, BCR-V14-3. *BCR-j:*
j11. *Needed by:* V13, V14, V09. **STAGED (M-W1; M-SITE-A).**


### 8.8 Tiles, zoom stops, print and the canvas budget

**625.** **The 2.5D tile key** (BCR-V14-7's §8.8 part). *Current text* (the tile key carries §8.8's view-state
switches). *New text (mechanism):* the tile key gains the projection, the exaggeration and the cutaway for the **2.5D
tile set** (a separate set, V14 §5.5; the flat set's key unchanged, so the flat view is byte-identical before and
after: T-V14-21's `item141.flat` pin); the world's stops are V13 §5.2's four, read by `Lod25Row`'s world rows. *Requests:*
BCR-V14-7. *Gate:* **M11**. *BCR-j:* j15. *Needed by:* V14, V13. **STAGED (M-25D).**


### 9.2 Placement (S13b): font metrics, zoom stops, the global greedy evaluated locally — *The knowledge filter* (item 30)

**626.** **The three secret states on one admission function** (BCR-V14-21's §9.2 sentence). *Current text* (the three
tiers and the key's `places`; no DM-only / revealed / discovered wording). *New text:* one sentence — a place's
`SecretState` (V14 §2.3: `dmOnly`, `revealed`, `discovered`) is read through `knownTo` and the key's `places` by the
same admission function: `dmOnly` is a `secret` place absent from every party key's `places` (neither drawn, listed,
counted, named nor exported); `revealed` puts its address in the party's `places` (the host's reveal, V08 §3.14, or the
DM's `setAttr`); `discovered` raises `knownTo` to `local`. *Requests:* BCR-V14-21. *BCR-j:* j9. *Needed by:* V14, V08,
V09. **STAGED (M-SITE-A).**


### 9.5 Furniture, framing and tools

**627.** **The compass derived from the placement; the legend's second cue** (BCR-V13-16, BCR-V14-21's §9.5 clause).
*Current text:*
> * **Compass (XB08):** a procedural 8-ray design with ink and paper halves, rerollable per town:
*New text:* BCR-V13-16's — "… rerollable per town, **whose north is the frame's +y on a standalone frame and the
world's north on a placed one — the rose turned by the placement's bearing (mirrored: reflected), derived presentation
that never rotates the arena (V13 §3.11.5)**:"; the legend lists the secret cue of each state while one is drawn
("DM only · revealed to the party · discovered by the party"; V14 §5.1: the dashed ring with the eye-slash, the open
ring, the filled ring — a second cue beside colour, g item 112). *Requests:* BCR-V13-16, BCR-V14-21. *BCR-j:* j9.
*Needed by:* V13, V14, V09. **STAGED (M-W1; M-SITE-A).**


### 11.1 Formats

**628.** **The world's formats; the VTT crop scope, the stable grid origin, the multi-floor convention, the `plat` object;
the hour-free lights** (BCR-V13-12, BCR-V14-8, BCR-V14-23). **Consolidated.** *Current text:*
> `| **GeoJSON** (RFC 7946) | two declared variants (N-14, below):`
> * **Scope:** a rectangle or a district chosen by the user — by default the current view snapped to whole grid squares (the quote's bold differs from the request's)
> every `LightSource` lit at the export's drawn week and every lit window at the export's hour (§10.3)
*New text:* (a) BCR-V13-12's rows after the table — **ecosystem-shaped JSON** (world; the adapter folder's
version-pinned schema file, V13 §3.15, §5.4, the one place its property names appear; export → import → export
byte-identical on the shared keys), **GeoJSON** (world; one FeatureCollection per world layer), **16-bit heightmap**
(PNG and `.r16` with a sidecar; round-trips through the `image` op), **world CSV**; the GeoJSON row gains "a world
document exports one FeatureCollection per world layer, V13 §5.4"; the JSON schema's unit records gain `waterClass`
(V13 §2.4's result) and the document's `surfaces`. (b) BCR-V14-8's — `ExportOpts.vtt.crop?: { key: EncounterAddress }`
(the open encounter's crop as the scope, its scene set `EncounterCrop.scenes`, the `site` level form added to `scene`'s
union); for every VTT export `resolution.map_origin` the scope's south-west corner in grid units from the arena's
origin on the **world grid** (cells of `StyleSheet.vtt.squareM` from the arena's origin; for V13's regime the crop
frame's transient placement whose `originCm` is the click's `WorldPointCm` snapped to the grid, V14 §3.12 (5)) — the
origin derived from the address, never from the view; a multi-scene export writes one image and one JSON per scene
named `<base>.<ordinal>.dd2vtt` (0 the ground, then each storey or level in elevation order) with the scene's
elevation and name in the `plat` object; the `plat` object gains `waterStamp` (V13 §2.7's `surfaceSetDigest`),
`difficultTerrain` (the wading and swimming faces; the rooftops as the walkable set under a flood stage) and the
optional namespaced `sites` vendor block (`ExportOpts.vtt.vendorBlock`, default false; V14 §11 Q4); the profile's
version pinned by item 136 (c)'s re-verification before M-ENC's SE2. (c) BCR-V14-23's `lights` clause — "every
`LightSource` lit at the drawn week and every room whose `lit` holds by its role or an edit (V03 §5.6) — no hour"; the
`light` key's `time` read as `day` by a battle-map export, the bend named (`bend.encounter.noHour`); the lights set a
pure function of the week (T-V14-3). *Requests:* BCR-V13-12, BCR-V14-8, BCR-V14-23. *BCR-j:* j10. *Needed by:* V13,
V14, V09, V12. **STAGED (M-W3 for the world's exporters; M-ENC's SE2 for the crop scope, the origin and the lights
clause; M-W0h for `waterClass` and `surfaces` in the JSON schema).**


### 11.2 The embedding API and the worker boundary (SCL-6)

**629.** **`PlatApi.encounter.*`; the `encounter` query kind; knowledge at the API** (BCR-V14-25, BCR-V14-21's §11.2
clause). *Current text* (the API's members: `generate`, `edit`, `query`, `export`, `scratch`, …). *New text (mechanism):*
`encounter.open(h, address): Promise<Encounter>`, `encounter.items(h, key, ops: ItemOp[])`, `encounter.crop(h, key):
Promise<EncounterCrop>`, `encounter.close(h, key)` and the `query` kind `encounter` — the resolve, the completion, the
crop, the transient arena and its items in the generation worker behind the boundary, `EncounterService` in
`@plat/app` their client, the bridge's vocabulary (§11.3) gaining them; §11.2's *Knowledge* paragraph reads the secret
states through the one admission function (item 626: the icon, the site, the crop and every answer withheld below the
viewer's key); the world's reader kinds and the four `ask` modes are V13 §4.7's through V10 (item 645); `forkAt`
serves the counterfactual fork unchanged (V13 §4.5). *Requests:* BCR-V14-25, BCR-V14-21. *BCR-j:* j9, j10. *Needed by:*
V14, V09, V10, V08. **STAGED (M-ENC).**


### 12.4 CITY per-stage split (SCL-3)

**630.** **S1's row: the surface and groundwater steps** (BCR-V13-14's §12.4 part; the §12.3 laws stand). *Current text*
(§12.3's laws, quoted to state that they stand):
> TOWN ≤ 20 ms + 60 µs × buildings; CITY ≤ 40 ms + 50 µs × buildings; METROPOLIS ≤ 100 ms + 52 µs × buildings
*New text:* the laws stand unchanged (C13-09); §12.4's S1 row gains "+ the surface step (≤ 3 ms) and the groundwater
step (≤ 30 ms at METROPOLIS), V13 §3.12" inside its p95 (SP-W5's lazy-first-read fallback pre-decided for the low
tier). *Requests:* BCR-V13-14. *BCR-j:* j11. *Needed by:* V13, V12. **STAGED (M-W0h; measured at M-W4, T-V13-20).**


### 12.8 Memory (what is counted, per rung)

**631.** **The world document's line** (BCR-V13-14's §12.8 part). *Current text* (the per-rung lines; no world line).
*New text:* "**World document, all threads, excluding canvases:** ≤ 300 MB on the high tier (the `continent` rung
refused below it, V13 §6: ≈ 285 MB resident during W4 by the distance fields on demand, `landmass` and `territory` as
Uint16, `discharge` sparse, `flatRank` dropped after W4)"; the 2.5D tile set's memory is V14 §6's rule under the
existing per-rung cap (the two sets together ≤ the line + 0.3 × the flat view's city-and-district bands; C14-42), no
new line. *Requests:* BCR-V13-14, BCR-V14-17 (its memory row). *BCR-j:* j11. *Needed by:* V13, V14, V12. **STAGED
(M-W1; M-25D).**


### 12.10 The budget register

**632.** **`WORLD-1` … `WORLD-10`; `R12-V14-1` … `R12-V14-6`** (BCR-V13-14's §12.10 part, BCR-V14-17). *Current text*
(the register's rows `R12-1` …). *New text (mechanism):* the register gains V13 §6's rows — `WORLD-1` the one-click
totals per rung (900 / 3 000 / 7 000 ms; the noise cap pre-decided), `WORLD-2` the placement edit ≤ 250 ms, `WORLD-3`
`nearestLawful` ≤ 600 ms, `WORLD-4` the frame's additions inside S1's row (the pooled-law amendment pre-decided should
S1's row miss at M-W4), `WORLD-5` memory ≤ 285 MB resident at the continent rung, `WORLD-6` the document ≤ the size
row's `docMb`, `WORLD-7` the cascade at a frame ≤ 1.5 × S1's water operator's budget, `WORLD-8` the world's first frame
≤ 400 ms, `WORLD-9` a transient `charterFor` ≤ 10 ms, `WORLD-10` a caller's score pass ≤ W6a's law over its disc — and
V14 §6's — `R12-V14-1` the crop's first frame ≤ 100 ms and complete ≤ 300 ms p95, `R12-V14-2` the first open per
kind, `R12-V14-3` the projected tile build ≤ 1.6 × the flat and the GPU frame inside R12-9's bounds, `R12-V14-4` the
settle after a projection switch, `R12-V14-5` hit testing ≤ 0.5 ms, `R12-V14-6` the comfort level over every one-time
wait (≤ 10 s) — each with its home, measurement, pass bar and pre-decided change. *Requests:* BCR-V13-14, BCR-V14-17.
*BCR-j:* j11. *Needed by:* V13, V14, V12. **STAGED (each row with its volume's measuring step).**


### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT

**633.** **The two volumes' test families, corpus, fixtures and pins** (BCR-V13-15, BCR-V14-22). **Consolidated; one
merged text (R-b, SW-29).** *Current text:*
> (T-V1-n … T-V12-n, each volume's §7), run by the same benches and tiers.
*New text:*
> (T-V1-n … T-V14-n, each volume's §7), run by the same benches and tiers; volume 13 adds the **B-WORLD** corpus (200 seeds × three rungs × six templates, B-WORLD-lite its first 10 per rung; V13 §7) and its eighteen model-drift tests (T-V13-21, one per row of V13 §3.14.3's table) to the PR tier, with the comparator lint (no randomness in a sort key, T-V13-1's CI row); volume 14 adds the fixtures `B-SITE`, `B-CROP`, `B-25D` and the no-op pins `item132.none`, `item141.flat` on V12 §3.7.8's engine (V14 §7) — one T- row per Part E bar, the other volume's half a cited clause (SW-33: bars 1, 2, 6, 7, 11, 12, 14–17 → T-V14 rows; 3, 4, 5, 8, 9, 10, 13 → T-V13 rows).
*Requests:* BCR-V13-15, BCR-V14-22. *BCR-j:* j13. *Needed by:* V13, V14, V12 (item 647). **STAGED (with each volume's
first milestone: the rows enter at M-W0h / M-ENC).**


### §14 Package and module layout, key interfaces, dependency rules, extension points

**634.** **`@plat/world` enters the chain with the lifted hydro core; `@plat/sites`; `@plat/render/projection`; the
encounter module** (BCR-V13-1, BCR-V14-18). **Consolidated.** *Current text* (the site package's line):
> `@plat/site     S1 terrain, hydrology, coast / lake / island outline routine, rivers by descent, islands, bank classes, water faces`
*New text:* BCR-V13-1's two lines in full — `@plat/world` inserted before `@plat/site` (the world regime: W0–W9, the
placement operators `place/`, the rasters and records, the lifted hydro core `hydro/` — the site package's field
module with `HydroField`, its priority flood with lake typing by threshold, `resolveFlats`, `d8` and `accumulate`, moved
with their tests under the same names —, `groundwater/`, `water/` (the water class test), `siting/`, `glyph/` (the
`toWorld` placing of marks only), `why/`; depends on `@plat/tables` and `@plat/kernel`), and `@plat/site`'s line
amended (its river surface, trace, course and carve stay, importing `@plat/world/hydro`'s field type; the carve gains
its delta map; the surface and groundwater steps; depends on `@plat/world`); the dependency rule gains "`@plat/world`
imports nothing from `@plat/site`, `@plat/layout`, `@plat/plots` or `@plat/content`; `@plat/port/world` is one adapter
folder of `@plat/port`; `@plat/export` reads `@plat/world`'s records" (T-V13-7). BCR-V14-18's — `@plat/sites` after
`@plat/under` and `@plat/world` with V14 §1.1's rule (depends on `@plat/kernel`, `@plat/model`, `@plat/tables`,
`@plat/site`, `@plat/layout`, `@plat/plots`, `@plat/buildings`, `@plat/under`, `@plat/evolve`, `@plat/hood`,
`@plat/world`; never on `@plat/render`, `@plat/export` or `@plat/app`); the encounter module in `@plat/app`;
`@plat/render/projection`. *Requests:* BCR-V13-1, BCR-V14-18. *BCR-j:* j1. *Needed by:* V13, V14, V04 (`@plat/under`'s
reuse on `site` parts). **STAGED (M-W0h for the lift — its only new dependency M4's render tier; M-W1 for the package;
M-ENC / M-SITE-A / M-25D for V14's).**


### §16 Build plan — calibration and spikes first, then a viewable town, then editing, then parity, then stage 2

**635.** **The world, encounter, site and 2.5D milestones** (BCR-V13-19, BCR-V14-20). **Consolidated; one merged text
(R-b, SW-29).** *Current text:*
> The design volumes' milestones follow in the order the owner's delegation fixed (J122): the village's tracker spike right after M0, the built-in clerk beside M3b, and after M4 four streams side by side.
*New text:*
> The design volumes' milestones follow in the order the owner's delegation fixed (J122): the village's tracker spike right after M0, the built-in clerk beside M3b, and after M4 four streams side by side; **the water state at the frame M-W0h after M4 beside M5 (V13 §8; SW-14), the world milestones M-W0 – M-W4 (V13 §8: 28–36 pw as one staged row) after M-SF, the encounter crop M-ENC after M1, the attached sites M-SITE-A after M6-U, the free sites M-SITE-F after M-W1 and the 2.5D renderer M-25D after M4 (V14 §8); the host's own changes a parallel track on the owner's schedule (V13 §11 Q2)** — the one merged text both volumes cite (SW-29).
§16's staged table gains the rows as this sentence places them — M-W0h (≈ 4 pw; before M6-U's U3b), M-W0 – M-W4 (one
row, 28–36 pw), M-ENC (4.25–5.75 pw with SE0; its interiors with V03's P1, its occupancy with M4b), M-SITE-A (after
M6-U's U3b and V01's W15 at M5; may run beside M6-P and M-W1), M-SITE-F (after M-W1; beside M-W2), M-25D (7.75–11 pw;
beside M5; its world rows after M-W1) — with V14 §8's starts, companions, exits and prices (V14's total 25.75–36.25 pw
as one line, item 568's rule); §16's two totals are recomputed once by the pass (file f item 568). *Requests:*
BCR-V13-19, BCR-V14-20. *Needed by:* V13, V14, INDEX. **STAGED (the roadmap).**


### II.7.4 The hook interfaces and the base's part

**636.** **`AccessPoint` reaches a site document; its knowledge flag; its vertical ends** (BCR-V14-2, BCR-V14-6's
`AccessPoint` reading). *Current text:*
> `under: { part: number /* the underground part it reaches (§3.4; 0 the sewer network) */; element: Id …; at: VertexRef … }`
> `source: 'neighbourhood'|'basement'|'system'|'lifeline'|'edit'|'dig'|'opening'|'overlap'|'crypt'|'dossier'`
*New text (mechanism):* `under: { part; element; at } | SiteReach` (V14 §2.3: `{ site; unit; level; at; floorCm }`,
the first two written whole with the site document's namespace), `ground.storey?: number` for source `site` (the
anchor's storey — V14 §3.9 (a)'s head rule: a `hatch` in that room's floor or a concealed door, descending by a V03
stair core of kind `secret`, item 639), `source` gains `'site'`, `AccessCause.rule` gains `'site'` (V04 §2.2's
union); `state` unchanged; the stored `knownTo` read by every reader through `effectiveKnownTo(access)` (V14 §2.3:
`secret` while the anchor is `dmOnly`, at least `local` once `discovered`); an access of source `site` is never a
`HoodPlace`, skipped by V01's opening pass and V04's excavation reading; its ends through `verticalEnds` (item 606).
*Requests:* BCR-V14-2, BCR-V14-6. *Gate:* **M10**. *BCR-j:* j5, j9. *Needed by:* V14, V04, V03, V01. **BASE (M1's API
pass) for the union values and the `SiteReach` form's reservation; STAGED (M-SITE-A).**


### II.7.6 Catacombs, caverns and quarries; depth bands and the connection graph (item 65)

**637.** **The connection graph and the overlap test over `site` parts; `siteEnvelopes`** (BCR-V14-11's II.7.6 half).
*Current text* (the connection graph and the overlap test run over the underground's parts). *New text (mechanism):*
the connection graph admits a link whose ends lie on an `underground` part and a `site` part; V04's U-ACCESS overlap
test and the excavation reading read the `site` parts **of the same document** (an adopted or `inFrame` site's; its
units start `accessible` through their entrances) as parts, and read an **attached** card's `envelope` and level bands
through `siteEnvelopes(doc)` (item 640) as an obstacle (`blockedBy: 'site'`, `W_SITE_NEAR_VOID`), never breaching it;
`Chamber.system` and `Gallery.system` on a `site` part name the part's `SiteLevel`; `ChamberKind` **unchanged** (a
site's chambers take `hall`, `breakdown`, `room`, `workings`, `storey`). *Requests:* BCR-V14-11. *BCR-j:* j5. *Needed
by:* V14, V04. **STAGED (M-SITE-A).**


---

## The cross-volume items (requests to the earlier volumes; each volume's architect applies them in its text)

### Volume 2 — V02 §2.2's building record

**638.** **The per-storey water class; the storey ranges for `raiseLower`** (BCR-V13-23; V14 §10.2's V02 row).
*Current text:*
> `storeys: { groundCm: Cm; upperCm: Cm };     // the class's HeightsRow storeyCm (massStepped, the tiers op, the mutator) or TierCells.heights (V04)`
*New text:* the line kept and `waterClass?: WaterClassResult[]` added after it — one per storey from the basement up,
the last result of the shared test (V13 §3.13.4), re-written by the cascade, absent on a dry building (V13's C13-56
note: the results move to a `derived` cache outside the model digest in the next revision of BCR-V13-23, or the
migration writes them under a declared shift — the pass chooses, T-V13-29 the bar); V02 states the lawful ranges of
`storeys/groundCm` and `storeys/upperCm` that `raiseLower`'s storey row maps into (V14 §4.6; every upper storey
together, the bend named). *Requests:* BCR-V13-23, V14 §10.2 (V02). *Needed by:* V13, V14. **STAGED (M-W0h; M-25D).**


### Volume 3 — V03 §3.2 A1, §3.3 S4, §3.7

**639.** **A1's first match on `Assignment.site`; the head rule and the `secret` stair core** (V14 §10.2's V03 row).
*Current text* (A1 resolves the programme by the class-id rows; S4's stair kinds are the class row's with no `secret`;
§3.7.3's "secret head" gives a concealed back room, not a core). *New text (mechanism):* A1 reads `Assignment.site`
first — the card's `programme.rooms` (the grammar's units mapped: `core` → the class row's main room, `cell` → its named
rooms, `hub` → `hall`, `secret` → a concealed room by V03's concealed rule, `verticalLink` → the stair core) before the
class-id rows; **S4's stair kinds gain `secret`** (a request, not a V03 fact; SW-36): a core S4 places like any, its
openings concealed by §3.6 O6's rule, its head room §3.7.3's concealed back room; a `site`-sourced access heads on
`ground.storey` as a `hatch` in that room's floor or a concealed door in its wall and descends by that core to the
lowest storey's ordinary head (§3.7.2), the storeys between re-cut (§3.11), the storey count in `requestedVsBuilt`, the
anchor bent to the lowest storey where no core fits (`bend.site.storey`); the plan's per-storey scene path serves a
site building. *Requests:* V14 §10.2 (V03), BCR-V14-12's A1 clause. *Needed by:* V14. **STAGED (M-SITE-A; the
programme override from M6-P).**


### Volume 4 — V04 §2.6 *Basements*, §3.5.2, §3.5.7, §3.8, §5.5

**640.** **The water readers call the shared function; `siteEnvelopes`; `site` parts as parts; the records and
programs reused** (BCR-V13-21; V14 §10.2's V04 row). **Consolidated.** *Current text:*
> water table reads it — a moat's the derived level of §4.2 S3 (10), every other body's terrain height at the shore,
> **its floor lies `hallDryCm` above the local water table** (the quote wraps across a line in V04)
*New text:* BCR-V13-21's in full — `waterTableAt(doc, at)` with a moat's level among the surfaces; the cave hall's
floor `hallDryCm` above `waterTableAt(doc, hallCentre, constructionWeek(hall))`; every element's `flood` admission,
its class after construction and its route from the entrance by `classifyWater` and `routeClass` over the element as a
`WaterUnit` (floor, chamber height, passages) with the connected-set rule and the `lined` attribute
(`liner.headLimitCm`), V04's `hallDryCm`, `freeboardCm` and burial depths staying V04's cells; **third part:** T-V4-12,
T-V4-20 and T-V4-23 read the table at the element's construction week, a present-week violation a `lockedBelowTable`
report; **the II.6 condition** (SW-31): `flooded` holds exactly when the class is `wading`, `swimming` or `submerged`;
**order** (SW-14): the readers switch at M-W0h, the nearest-body rule kept until then and the switch reported as the
version's shift. V14's: the overlap test, the excavation reading and the per-band exports over the `site` parts of the
same document (item 637's V04 side); **`siteEnvelopes(doc)`** — a `foundationObstacles`-style reading of every
attached card's `envelope` and level bands, read by catacomb growth, the sewer's extension and U-DIG's connector as an
obstacle (`blockedBy: 'site'`, `W_SITE_NEAR_VOID`); the records and programs reused on `site` parts (`Gallery`,
`Chamber` with `hall`, `breakdown`, `room`, `workings`, `storey`, the quarry program, the light rows); the dig generators
called as functions by `SiteAttach.attach` whatever the presets; the buried step's adoption of a robbed site's levels
by `reusedBy`. *Requests:* BCR-V13-21, V14 §10.2 (V04), BCR-V14-11. *BCR-j:* j3, j5, j7. *Needed by:* V13, V14.
**STAGED (M-W0h for the readers; M-SITE-A for the rest).**


### Volume 6 — V06 §3.23 (2), §2.8, §3.5

**641.** **The decay rate: the unit's material and the waterlogged factor; `decayLevel` over a card; robbing; the
epoch's calls** (BCR-V13-22; V14 §10.2's V06 row). **Consolidated; one merged sentence (R-b, SW-30).** *Current text:*
> `r` is V11's decay rate per year for the building's walls material (`Building.material.walls`, read for time only, as §4.11's `WorksTable` reads it): timber and thatch faster than stone.
*New text:*
> `r` is V11's decay rate per year for the building's walls material (`Building.material.walls`, read for time only, as §4.11's `WorksTable` reads it): timber and thatch faster than stone, **or, for a world site's carved and natural units, the unit's material rate (`SiteDamageRow.ratePerYear`, V14 §2.5: rock 0.002, timber 0.05, masonry 0.01 per year); a lineage whose ground storey or lowest unit is `submerged` or `swimming` under the present surface (V13 §3.13.4) decays at `r × waterloggedFactor` (V11's cell, default 3) toward the `submerged ruin` state, and one later exposed keeps its state and resumes `r`** — the one merged sentence both volumes cite (SW-30).
And V14's: `decayLevel(doc, lineage: card, week)` over the card's `WorldSiteLifecycle` events (`condition.since` the
run's `A`), Works-less (§3.23 (3)'s no-Works branch), `decayPeak` per element with `since` the element's layer's age;
the robbing relation over an adopted or near ruin (§3.5's ledger credited; the underground's elements never robbed);
the epoch's call of G7 with cause `epoch` over an adopted or `inFrame` site; the host building's lifecycle events
reaching the cards anchored in it (cause `rule:host`); a `siteState` op's place in the hand forms. *Requests:*
BCR-V13-22, V14 §10.2 (V06). *BCR-j:* j6. *Needed by:* V13, V14. **STAGED (M-W0h for the waterlogged rate at the
frame; M-SITE-A for the card's lineage; M6-E for the epoch's calls).**


### Volume 7 — V07 §3 (siting), §3.12 (hand-offs)

**642.** **The `worldSite` reservation read by the village's siting; the hand-offs carry cards and anchors** (V14 §10.2's
V07 row). *Current text* (the village's siting reads the castle reserve's claim; the hand-offs carry the records V07
§3.12 lists). *New text (mechanism):* V07's siting reads a `Reservation` of kind `worldSite` (item 604) as it reads a
castle's — a thorp placed by V13 over a fort claims the fort's envelope first, its tofts growing outside the glacis
(V14 §3.9 (f)); the hand-offs up and down carry a settlement's `WorldSite` cards and `SiteAnchor`s unchanged in both
directions (V14 §3.1; T-V14-7 (c)); a village frame is placed as a town frame is (V13 §1.4). *Requests:* V14 §10.2
(V07). *Needed by:* V14, V13. **STAGED (M-SITE-F; the hand-offs with the village product).**


### Volume 8 — V08 §2.2, §2.5, §2.6a, §3.14

**643.** **The world port's messages; the site's host record** (BCR-V13-11's V08 half; V14 §10.2's V08 row).
**Consolidated.** *Current text* (V08 §2.2's host → PLAT and PLAT → host unions; the dossier row sets; §3.14's party
knowledge). *New text (mechanism):* the unions gain one type per world-port method — outbound `derivedFacts`, `charter`,
`proposals`, `routes`; inbound `seats`, `costLaw`, `events` — with the world's format version in the envelope (V13
§2.7), plus the view command `clock(world, week)` (V13 §2.1; a host that does not speak them reads the ecosystem-shaped
JSON export); the digest's `site.latitudeDeg` and `presentWeek` stand, DR29's latitude the dossier's on a dossier-bound
frame and the placement's a reported difference (V13 §3.11.4). V14's: a site's host record (`WorldSiteRecord`:
existence, kind, name, owner or faction, status, position in V13's regime; the form of V14 §2.2's `WorldSiteHost` and
V08 §2.8's custom records) in the dossier row sets with the new derivation row **DR-V14-1**; the party's reach as a
host event; the reveal of an anchor through the party's `places` (§3.14) mirrored into the shared `party` key (item
608); a site's derived capacity as a derived fact; the status words' normalisation (V14 §3.8's table; an unmapped word
`unmapped_word`). *Requests:* BCR-V13-11, V14 §10.2 (V08). *BCR-j:* j12. *Needed by:* V13, V14. **STAGED (M-W1 – M-W2
for the world messages, the host's side on the owner's schedule — V13 §11 Q2; M-SITE-A for the site record — V14 §11
Q2).**


### Volume 9 — V09 §4.3, §4.2, §4.8, §4.9, §5.5

**644.** **The world's tool rows; the site and encounter tools; the projection switch; the fates sheet; the catalogue
keys** (BCR-V13-25; V14 §10.2's V09 row). **Consolidated.** *Current text:*
> `| event kind (target) | the mode (§7.1's home tool) | the gesture | also from | source |`
*New text (rows appended):* BCR-V13-25's — `worldRecipe` → T2 `ground`'s recipe editor; `setSurface` → T2's level
slider; `setField(terrain)` on the world → T2's brush; `rerouteReach` → T2's reach drag; `placeFrame`, `setPlacement`,
`mirrorFrame`, `worldWins`, `unplaceFrame` → T6 `place`'s Place-a-settlement mode (with *Charter here* for
`requestCharter`); `setSeats` → T6's seat pins; `deleteTrace`, the world `setAttr`s, `addEvent` → T9 `shape`; `fork`,
`commitFork`, `discardFork`, the world `regenerate` → T10 `hold`; `adjust` of the world keys → T1 `intend`'s world
dialog; the `verb` toggle on T2's options strip; the water class overlay on T9's inspector (T-V9-12 checks the rows
against the union). V14's — T6 **Drop a site** as a one-click drop with the panel after (the dialog the long form;
C14-45), **Encounter here** and the crop's palette (`promoteEncounter`'s **Keep this**), the `projection` switch (flat
the default), the Site working layer and the level chip, the site panel, the icon's hit entry, `siteOpen`'s document
switch, **the delete gesture on a card opening a fates sheet (§5.5) with Remove and Destroy** (C14-46), T10's **Adopt
into the town** and the `adoptSite` raised on `world.placed` (SW-10), T9's vertical drag for `raiseLower` in a 2.5D
view, the catalogue keys of V14 §4.9 (`info.site.*`, `info.unit.*`, `info.encounter.*`, `bend.site.*`,
`bend.encounter.noHour`, `refuse.site.*`, `refuse.encounter.noWorld`, `refuse.raise.flat`) and V13 §4.1's
(`refuse.place.*`, `refuse.charter.dossier`, `refuse.surface.date`, `refuse.world.*`, `refuse.import.*`, the
`W_PLACE_*` warnings' actions). *Requests:* BCR-V13-25, V14 §10.2 (V09). *Needed by:* V13, V14. **STAGED (with each
tool's milestone).**


### Volume 10 — V10 §3.9, §3.9a

**645.** **The three `ask` modes; the `site` and `encounter` sections** (BCR-V13-24; V14 §10.2's V10 row). *Current
text:*
> `query({ kind: 'why', id, path?, mode?, historyPage?, view? })`
*New text:* BCR-V13-24's — `query({ kind: 'why', id, path?, mode?, ask?: 'why'|'whatCaused'|'whatChanged'|'whatIf'
/* default 'why' */, since?: Week, edit?: EditEvent, historyPage?, view? })`, `mode` kept and passed through to the
kind's provider, the three new asks answered by `@plat/world/why`'s readers over the reason records (V13 §4.7; item
607) for every kind that carries one, the generic provider's "chain incomplete" answer where a record is missing; the
world's `WhyProvider` kinds (`Reach`, `WaterSurface`, `Watershed`, `Territory`, `WorldRoute`, `SitingProposal`,
`Placement`, the springs) and the `world` `WhySectionProvider`; V14's `site` and `encounter` `WhySectionProvider`s and
the `WorldSite`, `SiteAnchor`, `Unit`, `Encounter` `WhyProvider`s (V14 §4.9) with their rows and the chain test (bar
10: T-V13-10 the owner row, T-V14-18 its site and encounter clause); the clerk's `placeAt` proposal on the world as
`nearestLawful` rendered (V13 §4.7). *Requests:* BCR-V13-24, V14 §10.2 (V10). *BCR-j:* j8. *Needed by:* V13, V14.
**STAGED (M-W0h for the readers over frame-side records; M-W1; M-SITE-A; M-ENC).**


### Volume 11 — V11 §2.8, §3.1, §3.20, §3.24.0, §3.25.10

**646.** **Two climate rows; the world's and the site's registry rows; the naming slices; the damage rows; the two switch
rows** (BCR-V13-26; V13 §2.3's tables; V14 §10.2's V11 row). **Consolidated.** *Current text* (V11's `ClimateRow.biome`
keys):
> `temperate-deciduous`, `temperate-coniferous`, `mixed`, `maritime`, `arid`, `cold`
*New text:* BCR-V13-26's — the key set gains `tropical` (for `savanna`, `tropicalSeasonal`, `rainforest`: a long hot
wet season, no frost, a monsoon's weather rows) and `wetland` (a `maritime` variant with standing water: a high damp
share, fog rows, a short dry season), each with its dry, season and weather cells as V11's table defines them (V13
§2.3's mapping table names each biome's stand-in key until they land); the registry gains V13 §2.3's rows (`world.*`,
`place.*`, `water.*`; `style.world`'s cells `riverDrawM3s`, `ghostDepthCm`, the ramps; the next free row numbers
assigned at M-W1's landing) and V14 §2.5's `tables/sites/*` rows with their schema and shipped values (provenance
`own`, calibratable unless marked; item 620); the naming slice `site` (and W9's world names through the naming service
with the world's culture context); the decay ranges and material rates of `SiteDamageRow` adopted beside §3.25.10's
`states` rows (a `rock` material row; C14-13); the kind rows' `icon` glyphs in the symbol catalogue; **two switch-table
rows** (§3.24.0's form) for V12's no-op pins: `sites.none` (no card dropped, no encounter open) and `view.projection`
(`flat`), with their off forms (C14-57). *Requests:* BCR-V13-26, V14 §10.2 (V11). *Needed by:* V13, V14, V12.
**STAGED (the climate rows at M-W1's content step; the site rows with V14's steps; the switch rows with M-ENC).**


### Volume 12 — V12 §2.4, §2.6, §3.6b, §3.7.8, §3.9.1, §3.10.5, §3.11

**647.** **The fixtures, the panel, the no-op pins, the measures, the register entries, the corpus stage** (V14 §10.2's
V12 row; V13 §1b.1's register row and §8's `M-CAL/world`). *Current text* (V12's fixtures, panels, pins and register as
landed). *New text (mechanism):* the fixtures `B-SITE`, `B-CROP`, `B-25D` (V14 §7) and the corpus `B-WORLD` with
B-WORLD-lite (V13 §7; seed i `H32("bworld/<rung>/<template>/<i>")` by §2.4's collision rule); the panel V14-P's
`PanelSpec` (§3.9.1: SOLO 24 at SE6's exit on `legibility`, `realism`, `playability`; SOLO 12 at V4's exit); the
no-op pins `item132.none` and `item141.flat` on §3.7.8's engine with their off-state sets per rung read from V11's two
switch rows (item 646); the measures `site.vector.*` and `crop.firstFrameMs`; every calibratable column of V13 §2.3 and
V14 §2.5 registered at its step (§2.6's `CalibrationEntry`; V14 writing no register line of its own, J-V14.35: the
default line, `--defaults --milestone <step>`); the corpus stage `M-CAL/world` (§3.10.5) for V13's cells and `M-CAL/sites`
for V14's steps landing after M-CAL (`fixed` closing with "no admissible frame" where no reference exists); the bar
map's rows for T-V13-n and T-V14-n (§3.6b; item 633). *Requests:* V14 §10.2 (V12), V13 §1b.1 and §8. *Needed by:* V13,
V14. **STAGED (each entry at its volume's exit; the corpus stages at M-CAL or after).**

---

**Census.** 48 items (600–647): 38 base items under 38 base sections (600–637) and 10 cross-volume items (638–647);
54 requests carried (BCR-V13-1 – 29, BCR-V14-1 – 25), every one cited by an item, none uncited, no item citing an
undefined request; 0 CONFLICT items; 1 open mechanism issue outside the base (R1-1). Gate rows touched: K1 (601), K5
(602), K6 (611, 615), K9 (609); M1 (616), M2–M4 (603, 605), M5 (608, 610), M6 (607, 608), M7 (606), M8 (607), M9 (607,
622), M10 (606, 636), M11 (608, 625) — K2, K3, K4, K7 (confirmed held by 611), K8, K10 (608's snapshot), K11, K12
(the world's `WorldCommitRecord` stands in for stages of `txForm: 'records'`, 611) and K13 (no request reads an
elevation in the kernel; V14 §5.5's transform is view space) are unchanged. Every "current text" quote verified by
fragment search on 2026-10-17 (`_integrate-world-sites.md` §2).
