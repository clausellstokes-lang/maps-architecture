# read-v14 — V14 (sites) read whole for J393 (sites, roads, autocorrect)

- **Lane:** `sites-roads/read-v14` (opus; J390, Fable-checked). A reader: this file records what V14 says, with line
  numbers; it judges nothing.
- **Started:** 2026-10-18 05:12 UTC.
- **Files read:**
  - `docs/volumes/V14-sites.md` — 3,208 lines, md5 `a1c6d7c2bf08595776b1f913765cf1cb` at 05:12 UTC (read whole
    from a byte-identical snapshot taken at that moment; md5 re-checked at the end, see the footer).
  - `docs/validation/sites-roads-2026-10-18/README.md` — 29 lines, md5 `eabd68cd5eec8bb1a35539c4a08e1bfd`.
- **Cite form:** `V14:<line>` means `docs/volumes/V14-sites.md` line <line> at md5 `a1c6d7c2…`. J392 is editing V14
  while this lane reads; the apply step must re-verify every fragment.

## Facts, in the order found

### Header, revision notes, how to read (V14:1–112)

1. V14 is marked "PENDING FABLE REVIEW", written under J339 (V14:3). Revision 1 (V14:5–33) lists C14-04 as "the
   siting terms as this volume's `SuitabilityTerm` plug-ins over V13's rasters, `attraction` and `routed` on the kind
   row and the card, no random term, BCR-V14-13 narrowed (§2.5, §3.4; J-V14.43)" (V14:10–12); C14-08 as "the world crop
   as a crop frame on the transient arena (§3.10 (4), §6; J-V14.44)" (V14:16); C14-15 as "V13's `setPlacement` rows
   (§1b.3, §3.4, §4.1, §4.7, §4.8)" (V14:21); C14-16 "adoption's ground as drawn constraints (§3.9 (e))" (V14:22).
2. Reconciliation r0 (V14:35–62): SW-01 "the seventeen purpose terms defined once against V13's `SuitabilityTerm` /
   `SuitabilityContext` and registered through `terms.register(term)`; the term named `destination` and the constant
   `reach.siteKm` everywhere" (V14:38–40); SW-03 "no random or jitter term: §3.1's G3 row matches §3.4, V13's
   deterministic tie-break cited" (V14:42–43); SW-04 the import's markers and zones as G1 candidates (V14:43–44); SW-08
   glyph marks through `glyphOf` / `world.glyph` (V14:44–45); SW-10 "adoption is `adoptSite` raised by the application
   on V13's `placed` outcome, V13 never calling V14" (V14:46–47); SW-11 "the card holds `placementRef` only, the
   `Placement` in the world document, a site document's digest never moving with its placement" (V14:47–48); SW-12
   "integer `WorldPointCm` everywhere, the crop frame's `originCm` the click" (V14:49–50); SW-19 "`worldWins` on a site
   a re-materialization (§3.4, §10.2 (8))" (V14:52–53).
3. Coherence l (V14:64–69): file l items 655–658 (VTT cells, §5.3, T-V14-11, §12); no siting content.
4. Citation convention: "items below 200 the owner's rules (items 131–141 file j's)" (V14:99–101). Naming: the base's
   *site* is the settlement's ground; the owner's places are **world sites**; records `WorldSite`, `WorldSiteHost`,
   `Site*` (V14:103–110). "the world regime (W0–W9), placement (P1–P5), the frame charter, the water class test and
   `ReasonRecord` are V13's … nothing of V13 is restated" (V14:110–112).

### §0 In plain words (V14:114–201)

5. The world-map crop "is derived from what the world says of that point — its ground, its climate, the road or river,
   whose land it is, what has lately happened there — once the world regime (volume 13) exists" (V14:127–129).
6. "Out in the country a site is **free-standing**, placed in the world (volume 13's placement), sited by the same
   suitability score the settlements use with purpose weights of its own (a fort wants overlook and road control, a mine
   ore and a stream, a hidden temple concealment and one hard approach, a tower solitude), and it is a **destination**
   the settlement siting score reads." (V14:171–175)
7. "When a settlement later forms around it … its ground claims first, as a castle's does today, and its arenas are
   **adopted** into the settlement's document … An admissibility table says what kinds may be dropped where — urban
   surface, urban below or inside, hinterland near or far from the enclosure, open country — and is editable like every
   rule table." (V14:175–179)
8. In town "the town map holds only an **anchor** … and **one access record** (the trapdoor, stair, shaft or door that
   leads in …)"; the anchor "draws as a **clickable icon only in the view whose context contains it**" (V14:164–171).
   A free-standing site's ground is composed from "the countryside's fields and tracks for the ground round it"
   (V14:141).

### §1.1–§1.2 Scope and base hooks (V14:203–263)

9. G-SITE row: "the ground of a free-standing site by the hinterland unit, S7's enclosure, S11's site plans and the plan
   rung … `SiteAnchor` and the access record; adoption into a settlement document" (V14:213).
10. Hook row: "S3's siting score and `Destination`; `Reservation` kinds … | G3 reads V13's suitability score with V14's
    purpose weights; a free-standing site is a `Destination` of kind `worldSite` and a `Reservation` of kind
    `worldSite` at adoption (BCR-V14-13)" (V14:236).
11. Hook row: "S12a's hinterland siting and the hinterland unit, S12b greenery | G5's ground materializer for a
    free-standing site's frame (fields, tracks, woods round the site)" (V14:238).
12. Hook row (V13): "the world regime, placement (`placeFrame`, `setPlacement`, `unplaceFrame`, `charterFor`), the frame
    charter, `SuitabilityTerm` with its `SuitabilityContext`, `score` and `terms.register(term)` (the plug-in registry),
    `ReasonRecord`, `classifyWater` / `routeClass` … the two edit verbs and the cascade | V13 §1b.2, V13 §2.2, V13 §2.4,
    V13 §2.5, V13 §3.7, V13 §3.11, V13 §3.13, V13 §3.14, V13 §4" (V14:256).
13. Hook row: the `AccessPoint` "the one access record of an attached site (source `site`, `under` reaching a site
    document, BCR-V14-2); a free-standing site's own openings" (V14:232).

### §1.3 The owner's rules as V14 quotes them (V14:265–293), verbatim rows

14. V14:267 header: "| item | the rule (the owner's words are the authority; file j's consequences are cited, never
    restated) | where it lands |". The rows for 132, 133, 134, 135, 136, 137, 141, verbatim:

```
269 | 132 (a) | "two types of encounter maps: 1. transient … 2. Persistent location" — one operation, two retention policies, promotion | V14 §3.10 (one operation), V14 §3.13 (promotion), J-V14.2 |
270 | 132 (b) | "a user as a DM could click anywhere … it will produce an appropriately scaled encounter map" — transient is not random: keyed by address and time, derived | V14 §3.10 E1, V14 §3.15 (determinism), T-V14-1 |
271 | 132 (c) | "The shops nearby where i clicked get generated (as appropriate) … complete with the interior" — in town nothing nearby is generated, only completed; the occupancy abstraction, never individuals | V14 §3.11 E2, V14 §2.4 (`OccupancySummary`), J-V14.4 |
272 | 132 (d) | "appropriately scaled" — extent by table | V14 §3.12 E3, V14 §2.5 (`EncounterExtentRow`) |
273 | 132 (e) | "a place clicked such as on the road or wilderness from the world map … matching the area it was clicked, terrain, biome, recent battle" — the world-map case waits on the world regime | V14 §3.10 E1 (the `world` context), V14 §1b.6, V14 §11 Q1 |
274 | 132 (f) | "some combination of using elements from the hinterlands generator, buildings generator, etc" — a persistent site is a card, not a generator | V14 §3.6 G5 (the composition), J-V14.6 |
275 | 132 (g) | "to match a list of selections a user might wnat" — the request record resolved by derive before invent into a programme whose complexity is a vector with units | V14 §3.3 G2, V14 §2.2 (`ComplexityVector`), J-V14.8 |
276 | 132 (h) | "built into the simulator where appropriate" — an institution-like host record outside a settlement; consequences as dossier events | V14 §3.8 G7, V14 §4.6, V14 §1b.6 |
277 | 133 (a) | "a clickable iconography or something … that persists in whatever location we drop it" — the anchor record | V14 §2.3 (`SiteAnchor`), BCR-V14-1 |
278 | 133 (b) | "if in an urban setting is not added to the city map rather accessible or it pops up from a clickable iconography" — attached sites are separate documents with one anchor and one access record | V14 §3.9 G8, V14 §2.3, J-V14.10 |
279 | 133 (c) | (file j's consequence of the above) the surface exception through the assignment path | V14 §3.9 G8 (c), BCR-V14-12 |
280 | 133 (d) | "it shows only once we access that interior and specific floor of the house … if it is in the sewers, it only shows once we access the sewers" — visibility by context | V14 §5.1 (the context rule), T-V14-12 |
281 | 133 (e) | "These are DM secrets btw toggled secret on and off" — DM only / revealed / discovered on `knownTo` and the admission function, with a second cue beside colour | V14 §2.3 (`SecretState`), V14 §5.1, J-V14.12 |
282 | 133 (f) | "A user should be able to set the number of floors and basements … shape terrain, etc" — floors, basements, shape and terrain from the request; the existing storey and stair model; terrain shaping a terrain edit before siting | V14 §2.2 (`SiteRequest`), V14 §3.4 G3 (the terrain pre-edit), V14 §3.6 G5 (built) |
283 | 133 (g) | "dungeons as well" — topology first, embedded on the kernel; the technique placement; the rejections | V14 §3.5 G4, V14 §3.6 G5, J-V14.14 – J-V14.20 |
284 | 133 (h) | "and of course everythign editable" — free on PLAT arenas; programme edits rematerialized locally; the card materialized lazily on first open; two deletion verbs | V14 §4.1–V14 §4.4, J-V14.22 |
285 | 134 (a) | "we will filter out of the selection what is possible in urban vs country" — the admissibility table by context, the edge of town by distance from the enclosure | V14 §3.2 G1, V14 §2.5 (`SiteAdmissibilityRow`), BCR-V14-10 |
286 | 134 (b) | "they can evolve depending on whether occupied or vacant or damaged or pristine depending on the flow of things" — condition is a transform over a persisted plan, never a reroll | V14 §3.8 G7, J-V14.24 |
287 | 134 (c) | "certain generated locations from the country persisted category can be prime locations for a new settlement" — sites as destinations; the relation both ways | V14 §3.4 G3 (d), V14 §3.9 G8 (e) |
288 | 134 (d) | (file j's consequence) adoption of a site's parts into the settlement document keeping every identity and lock | V14 §3.9 G8 (e), V14 §4.5, T-V14-7 |
289 | 135 (a)–(e) | "make sure that scaling is completely scaled according to encounter, city, and world" — three regimes, one chain of refinement; the handoff as boundary conditions; deterministic refinement; edits stored at their scale; per-regime tables | the crop refines the town (E1–E3 read, never rewrite); a site's frame takes V13's charter; V14 §6's per-regime rows; V14 §3.14 |
290 | 136 (a) | "time of day is not a parameter" — no hour anywhere; fixtures export as fixtures | V14 §2.4 (no hour in `Encounter`'s key), V14 §5.3, T-V14-3 |
291 | 136 (b) | "This all needs to be compatible with VTT (the encounter maps)" — the crop scope and the stable grid origin per address | V14 §3.12 E3 (the origin rule), V14 §5.3, BCR-V14-8, T-V14-11 |
292 | 137 (f), (g) | the water class test per unit; surface things | V14 §3.7 G6 calls V13's classifier; nothing restated |
293 | 141 (a)–(e) | "what if we want the whole architecture to have a 2.5 mode?" and "i'm not replacing 2d with 2.5d. i want both" — the model is already 2.5D; a projection family; the limits; the gate rows K13, M9–M11; the bars; 2D the default | V14 §5.4–V14 §5.8, BCR-V14-5, -6, -7, -9, T-V14-14 – T-V14-17 |
```

15. V14 §1.3 quotes items 132, 133, 134 only as the fragments above (each sub-item's quoted words, then a dash and
    V14's design gloss); it does not quote any item whole. Items 131, 138, 139 and 140 have no §1.3 row; 137 appears
    only as "137 (f), (g)" with no quoted words; 135 is quoted in one phrase (V14:265–293).

### §1.4 Out of scope (V14:295–335)

16. "**The world regime** — the world document, its rasters, surfaces, climate, hydrology, biomes, suitability, routes,
    politics, labels, placement P1–P5 and the frame charter — is V13's. This volume reads V13's `Placement` for a
    free-standing site, V13's suitability score for G3 and V13's charter for a site frame's boundary conditions"
    (V14:297–300). The world-map encounter case "lands only after V13's M-W1 (its W1–W5 stages; V14 §8)" (V14:300–301).
17. V13's `verb` is read on terrain and water edits only (SW-28) (V14:305–307).
18. "Volume 11's rows for the new tables this volume registers (V14 §2.5) — the kind rows, grammars, size presets,
    purpose weights … — have their schema here and their shipped values here with provenance `own`, calibratable"
    (V14:330–333).

### §1b.1–§1b.2 Wiring (V14:337–410)

19. `WorldSite` feeds "V13's W6 (a destination), V07's and V13's adoption" (V14:348).
20. "`WorldSite.attraction`, `.routed` (V14 §2.2; C14-04) | the kind row's columns, copied to the card at the drop and
    editable by `setAttr` | V13 W6's `destination` term (the pull within `reach.siteKm`) and W7's seats (a routed site)
    | the card" (V14:357).
21. "`Reservation.kind: 'worldSite'`, `Destination.kind: 'worldSite'` | G8 (e)'s and (g)'s adoption (the reservation);
    after adoption the site's gate as S4's destination | S3's siting and claims (a site claims ground first); S4's router
    inside the settlement's frame only | §2.5, §4.12 (BCR-V14-13)" (V14:377).
22. "the `SuitabilityTerm` plug-ins of V14 §2.5 (C14-04) | `@plat/sites/siting`, each a `SuitabilityTerm` registered
    through V13's `terms.register(term)` | G3's score with the purpose weights | V13 §1b.2's registry (SW-01)" (V14:378).
23. G3's interface: "`SiteSiting.site(world: WorldDocument /* V13 */, request, weights: SitePurposeWeightRow): {
    placement: Placement /* V13 */; score; reasons }` (G3) | … | a free-standing `dropSite` with no point ("somewhere
    fitting"); V13's W6 when the host asks for sites" (V14:392).
24. The world crop frame: "V13's `charterFor(world, placement)` at a transient placement, S1, the roads as way bands,
    S12a's cover, on the crop's transient arena | `@plat/sites/cropFrame` in the generation worker | E1's `world`
    context" (V14:393).
25. The seventeen plug-ins listed: "`overlook`, `relief`, `slopeFlat`, `waterNear`, `shoreNear`, `routeNear`,
    `roadControl`, `settlementNear`, `settlementFar`, `territoryBorder`, `floodSafe`, `ore`, `stone`, `wood`,
    `solitude`, `concealment`, `oneApproach` | `@plat/sites/siting`, each a `SuitabilityTerm { id; compute(cell, ctx:
    SuitabilityContext) }`" (V14:397).
26. `SiteAdopt.adopt(...)` "raised by the application (V09's tool) on the `placed` outcome V13's P4/P5 emit over a site —
    V13 never calls this volume (SW-10) —, by V07's siting at a village rung, or by hand" (V14:401).
27. `SiteContext.of(doc, address): SiteContext` (G1) feeds `dropSite`'s dry run, E1, the site dialog's kind list
    (V14:390). The ground materializer `GroundComposer.lay` calls "S12a's hinterland unit" (V14:396).
28. `SitePolicy` is "`SiteKindRow.policy` resolved by G2", home `tables/sites/kinds.json` (V14:367).

### §1b.3–§1b.6 Edit kinds, entities, host facts, V13 dependencies (V14:412–487)

29. Edit kind row: "V13's `setPlacement` / `placeFrame` / `unplaceFrame` with a `site` subject (C14-15) | V13's T6
    `place` on the world document | V13 §2.6's placement row; V14 §4.7's row (the site's arenas byte-identical, its
    charter stale) | V13's" (V14:423). `moveAnchor` is `setAttr` on `anchor/address` (V14:418). `adoptSite` "T10 `hold`
    on a free-standing site under a settlement's frame" (V14:422). `drawTunnel` / `drawChamber` / `addLink` /
    `placeAccess` on a `site` part through "T4 `road` / T6 `place` with Site the working layer (V09)" (V14:427).
30. Entity row: "a site's ground `Plot`, `Building`, `Enceinte`, `LandUse`, `Way` | the base's | the base's | the base's
    | the site document's ground part" (V14:444) — a free-standing site's document carries the base's `Way` on its ground
    part. `WorldSite` free-standing exports "GeoJSON point (… a feature with its placement, kind, state, measured
    vector)" (V14:437).
31. Host fact row: "a placement the host fixes | the record's world position (V13's regime) | DR-V14-1 through V13's
    `Placement` | G3 (a fixed placement, never re-sited)" (V14:458).
32. Host fact row: "a settlement founded at a site | the host's new settlement record whose placement lies over a
    site's frame | V13's P1–P5 and V08's creation | G8 (e) adoption" (V14:460).
33. Host fact row: recent events near a world point through "`worldFactsAt(world, wCm, sinceWeek)` (V13 §2.2, §2.4;
    SW-07) (**V13**) | V13's | E1's `world` context" (V14:461). Until V08 lands, "a site has no host-owned facts and every
    field is the map's own" (V14:450–452); "a removed record leaves the card as `map`-tier … never torn down (item 11;
    J-V14.25)" (V14:465–466).
34. V13 dependency row: "the world document and its facts at a point (terrain class, biome, route, territory, recent
    events) | V13 §2 `WorldDocument`, `WorldRaster`, `WorldRoute`, `Territory`; W2–W8 | E1's `world` context; G3's siting
    inputs | E1 refuses a world click with `refuse.encounter.noWorld` (V09 §4.9's catalogue); G3 sites only within a
    settlement's frame (hinterland contexts)" (V14:472).
35. V13 dependency row: the frame charter "(edge elevation profiles, datum, water edges, climate, water table, biome,
    resources, territory) | V13 §2 `FrameCharter`; P4 | G5 (f) (the ground composer's S1 inputs); G6 | a free-standing
    site document takes a flat charter with the base's S1 defaults, reported" (V14:473). The listed charter contents do
    not name roads or routes.
36. V13 dependency row: "placement in the world regime | V13 §2 `Placement`; P1–P5 | G3 (a free-standing site's
    placement); G8 (e) … | free-standing sites wait (V14 §8)" (V14:474).
37. V13 dependency row: "the `SuitabilityTerm` interface (`{ id; compute(cell, ctx: SuitabilityContext): number }`), the
    `SuitabilityContext` a term reads (the raster, the coast, the reaches, the surfaces, the routes, the placements, the
    sites, the resources, the springs, `territories: Territory[]`, the wet-season spread and the stage), `score` and
    `terms.register(term)` … the `destination` term's read of `WorldSite.attraction` within `reach.siteKm` | V13 §1b.2,
    §2.2, §3.7 (1) | G3 registers V14 §2.5's terms; the kind row's `attraction` and `routed` on the card | a
    free-standing drop takes a point only" (V14:475).
38. V13 dependency row: "W7's seats reading `WorldSite.routed` from the card | V13 §3.8 (1) | G3 (d) | —" (V14:476).
39. V13 dependency row: "`charterFor(world, placement)` for a transient, non-settlement placement at a point (a 100 m
    frame) that records no `Placement` | V13 §3.11.4, §3.11.6 (the form `WorldPort.charter` nearly gives) | E1 (4)'s
    crop frame | the world click is refused" (V14:477).
40. V13 dependency row: "`setPlacement` with a `site` subject leaving the site's arenas byte-identical and marking its
    charter stale | V13 §3.11.5, §4.3 | V14 §4.7's row" (V14:480). Glyph row: "`glyphOf` and the `world.glyph` message
    a site's marks are posted through (SW-08) | V13 §3.10, §5.1 | V14 §3.9 (d), §5.1" (V14:481).
41. V13 dependency row: "the charter for a free-standing site (what a site frame must carry to be placed) | V13 §2's
    `FrameCharter` as read by V13 P4 for a non-settlement frame | G3 (c)" (V14:486).
42. **Catalogue use #1:** "`refuse.encounter.noWorld` (V09 §4.9's catalogue)" (V14:472) — the catalogue here is V09
    §4.9's refusal/message key catalogue.

### §2.1–§2.2 Data model (V14:489–712)

43. V13's records read as declared: "`WorldDocument`, `WorldRaster`, `WaterSurface`, `FrameCharter`, `Placement`,
    `WorldRoute`, `Territory`, `ReasonRecord` and the water classifier's result record" (V14:504–506); the base's
    `Reservation`, `Destination` among the read records (V14:497–498).
44. `WorldSiteKind` (21 values): "'fort'|'tower'|'temple'|'shrine'|'manor'|'guildhall'|'ruin'|'cave'|'mine'|'hideout'|
    'crypt'|'cellarComplex'|'sewerLair'|'dungeon'|'camp'|'battlefield'|'graveyard'|'watchpost'|'hermitage'|'bridgeFort'|
    'tollhouse'; // SiteKindRow.kind (V14 §2.5); data, extensible by a row" (V14:521–522).
45. `SiteAttachment = 'free'|'attached'|'inFrame'|'ground'|'surface'` with: "free — a document of its own placed in V13's
    world, never inside a settlement's frame (J-V14.41); attached — a document of its own (levels only) behind an anchor
    in a host document; inFrame — a site with a ground policy inside a settlement's frame, adopted at the drop into the
    host document (V14 §3.9 (g); C14-01); ground — a marker-like card on a ground face with no document (a camp, a
    battlefield, a graveyard; V14 §3.9 (h); C14-09); surface — a building on a plot through the assignment path"
    (V14:523–527).
46. `SiteContextKind = 'urbanSurface'|'urbanInside'|'urbanBelow'|'urbanSky'|'hinterlandNear'|'hinterlandFar'|'country'|
    'world'` (V14:528). The card's `context`: "the context G1 read at creation; re-read on moveAnchor" (V14:533).
47. `placementRef?: { world: Uuid; placement: Id }` — "a free-standing site: the mirror of the site document's
    `worldRef` (V13 §2.2), set by the world's `charter` fold; the `Placement` itself lives in the world document (V13
    §2.7) and is read through it; never in any digest (SW-11; T-V14-31); absent attached or surface" (V14:534).
48. "`attraction: number; routed: boolean; // the kind row's columns copied at the drop, editable: V13's `destination`
    term reads `attraction` (0–1) within `reach.siteKm`; W7 seats a `routed` site (C14-04)`" (V14:540).
49. Declared vs derived: "`kind`, `purpose`, `attachment`, `context`, `anchor`, `building`, `request`, `attraction`,
    `routed`, `lifecycle` …, `knowledge` (but `discoverable`), `host`, `name` and the identity are declared — in the model
    digest, moved only by events. `programme`, … `placementRef` (a reading of the world document, SW-11) … are G2–G8's
    products: they live in the host document's **derived block**" (V14:553–557).
50. `WorldSiteHost.holder`: "on a host-bound world the polity facts' site holder and garrison band govern and the DM's
    entry is refused"; `garrisonBand` "for the sway's claim point (V13 §3.9 (10))" (V14:560).
51. `SiteRequest.terrain`: "'none'|'level'|'raise'|'cut'|'moat'|'cliffFace' — a terrain pre-edit run before siting (V14
    §3.4 G3 (b))" (V14:569); `TerrainShaping.amountCm` "≤ EmbedRule.terrain.maxShapeCm" (V14:580). No request field
    names roads, access to a road, or a route.
52. `SiteRequest.devotion`: "`stated` only — G2 never derives it"; offered "in the DM's map feed for the host to adopt by
    its own command … (V13 §3.11.6)" (V14:577, 582–587).
53. `SiteProgramme.envelope.datumCm`: "the site's datum: the ground height at the anchor or the frame's charter datum"
    (V14:594); `entrances: { count; side: 'approach'|'any'|'hidden'; hidden }` (V14:596).
54. `SitePolicy`: "`ground: 'hinterland'|'none'; // a free-standing site's ground part: S12a's hinterland unit over the
    frame, or none (attached)`"; `enclosure: 'wall'|'palisade'|'none'`; `buildings`; `above: 'plan'|'none'`; `below`;
    `ruination`; `occupants` (V14:602–608). The policy has no road or way field.
55. `entrances` vector entry measured as "the units in `UnitGraph.entrances` that carry an access record or an opening in
    the envelope's exterior (an `AccessPoint`, a gate, a cave mouth) (C14-36)" (V14:687).

### §2.3 Anchor and access (V14:714–770)

56. `SiteAnchor.access?`: "the one AccessPoint of source 'site' (below), headed on the anchor's storey by V14 §3.9 (a)'s
    head rule; absent only while G8 (a) found no head (`W_SITE_NO_ACCESS`) or for a `ground` card without levels"
    (V14:722). `AnchorAddress` variants: ground host face; ground building storey room; underground/site element; sky
    (V14:726–730).
57. `SiteReach = { site; unit; level; at; floorCm }`; "AccessPoint.source gains 'site'; AccessCause.rule gains 'site'.
    Its `state` and condition (bricked, collapsed while its unit is closed) are II.7.4's" (V14:737–740);
    `effectiveKnownTo` formula (V14:742); "A `site`-sourced access is never a `HoodPlace`" (V14:743–745).
58. The word "access" in §2.3 means the `AccessPoint` (a trapdoor, stair, shaft or door into an attached site's
    document) — not road access (V14:736–745).

### §2.4 Derived transients (V14:772–819)

59. `EncounterAddress.at: PointCm | WorldPointCm /* V13 §2.1's integer world point, under { world: true } (SW-12) */`;
    the key carries `week` and `logHead`, never an hour (V14:776–783).
60. `Encounter.water.routes: RouteClassResult[] /* V13's routeClass over the crop's ways */` (V14:788).
61. `EncounterCrop.scenes` admits `{ raisedWay: Id }` (V14:796); `waterStamp` (V14:797).
62. `TransientItem.kind` includes "'patrol' /* a road patrol passing that week (V13 §3.9 (14)) */" (V14:803).
63. `WaterClassReport.access: 'walkable'|'wading'|'swimming'|'diving'|'none'` (V14:808) — here "access" is the water
    access class of the site's entrances, not road access.
64. "an `Encounter` at a point with nothing resolvable (open water of the world, the frame's margin) still returns a crop
    with its profile `open`" (V14:815–816); T-V14-26 (a) tests totality (V14:819).

### §2.5 Rule tables (V14:821–1080)

65. Provenance: "Every value below is **our own** (provenance `own`, `extension` …)", calibratable unless marked
    (V14:823–829).
66. `SiteAdmissibilityRow { context; kinds; attachment /* the modes admitted, the first the default */; note? }` and
    `SiteAdmissibilityRule.edge { nearM 400; farM 1 500 ("beyond this, inside the frame, the context is 'country';
    outside every frame the context is 'world' (G1 rule 1)"); enclosure: 'outermostEnceinte'|'perimeter' }`
    (V14:832–836).
67. Admissibility rows (V14:839–848), verbatim cells: `urbanSurface` — "tower, temple, shrine, manor, guildhall, watchpost
    → `surface` (the assignment path; BCR-V14-12); camp, battlefield, graveyard → `ground` (C14-09)" (V14:841);
    `urbanInside` — "crypt, cellarComplex, hideout, shrine, dungeon" `attached` (V14:842); `urbanBelow` — "crypt,
    cellarComplex, hideout, sewerLair, dungeon, cave, temple" `attached` (V14:843); `urbanSky` — "shrine, tower, hideout,
    watchpost → `inFrame` …; camp, graveyard → `ground`; a cave or crypt under an island's buildings → `attached`"
    (V14:844); `hinterlandNear` — "cave, hideout, crypt, hermitage (its cell) → `attached` (levels only, anchored on the
    hinterland face); shrine, graveyard, watchpost, camp, battlefield, mine, ruin, tower, manor, fort, temple → `inFrame`
    (adopted at the drop, V14 §3.9 (g)); camp, battlefield, graveyard → also `ground`" (V14:845); `hinterlandFar` —
    "every kind but cellarComplex, sewerLair, guildhall … never `free` inside a frame (C14-01; J-V14.41)" (V14:846);
    `country` — "every kind but cellarComplex, sewerLair, guildhall, manor | `free` (a cave attached to a terrain
    feature: `free` with its `placementRef` naming V13's feature, J-V14.11); camp, battlefield, graveyard also `ground`
    on V13's regime through a crop frame's promotion only" (V14:847); `world` — "as `country` | `free`" (V14:848).
68. Mode classes: "a kind whose policy has `ground: 'none'` and no `buildings` (cave, hideout, crypt, cellarComplex,
    sewerLair, dungeon; a hermitage's cell) is **level-only** and takes `attached`; every kind with a ground policy or
    buildings takes `inFrame` inside a frame and `free` outside one; `camp`, `battlefield` and `graveyard` are
    **marker-like** and take `ground` wherever a ground face exists" (V14:850–853).
69. Edge distance: "the plan distance from the click to the nearest point of the enclosure line, by the ground's static
    index (one query)"; `farM` capped by the frame's edge where the frame is smaller (V14:855–858).
70. `SiteKindRow` interface fields: `kind`, `purposes`, `grammar`, `presets`, `policy`, `defaults { floorsAbove;
    levelsBelow; footprint; condition; ageYears; secrecy; entrances }`, `envelopeM2PerUnit`, `history`,
    `buildingClass?`, "`icon: string /* the anchor icon's glyph id (V14 §5.1) */`", "`importKinds: string[] /* the map
    import's marker words this kind answers to (V13 §3.15 (3); V14 §3.2's import candidates; SW-04); calibratable: false
    */`" (V14:861–867). The interface block itself does not list `attraction` or `routed`; they are stated as "Two more
    kind-row columns" in prose at V14:902. The row has no road-access, access-class, `extent`, approach or road column.
71. Shipped kind rows (V14:874–896), columns: kind · purposes · medium vector (units · loops · chokepoints · entrances ·
    defensiveDepth · openShare · concealedShare · storeysAbove · storeysBelow · historicalLayers) · policy (ground ·
    enclosure · buildings · above · below · ruination · occupants) · defaults (floorsAbove, levelsBelow, footprint,
    condition, age yr, secrecy, entrances) · m² per unit (V14:874). Per kind, policy `ground` and default entrances:
    fort hinterland, 2 (V14:876); tower hinterland, 1 (V14:877); temple hinterland, 1 (V14:878); shrine none, 1
    (V14:879); manor hinterland, 2 (V14:880); guildhall none, 1 (V14:881); ruin hinterland, 2 (V14:882); cave none, 1
    (V14:883); mine hinterland, 1 (V14:884); hideout none, "2 (one a bolt-hole)" (V14:885); crypt none, 1 (V14:886);
    cellarComplex none, 2 (V14:887); sewerLair none, 1 (V14:888); dungeon none, 1 (V14:889); camp hinterland, 2
    (V14:890); battlefield hinterland, 0 (V14:891); graveyard hinterland, 1 (V14:892); watchpost none, 1 (V14:893);
    hermitage hinterland, 1 (V14:894); bridgeFort none, 2 (V14:895); tollhouse none, 2 (V14:896).
72. Enclosures in the shipped rows: fort wall; manor palisade; ruin wall; camp palisade; watchpost palisade; bridgeFort
    wall; tollhouse palisade; the rest none (V14:876–896).
73. The shipped kind table carries no `icon`, `buildingClass` or `importKinds` cell values; it carries no extent column
    (V14:874–896). (The crop extent is a separate table keyed by location profile, not by kind: V14:936–966.)
74. The `attraction` / `routed` table, verbatim (V14:902–916): "Two more kind-row columns feed V13's siting (C14-04;
    `SiteKindRow.attraction: number` 0–1 and `.routed: boolean`, own, calibratable), copied to the card at the drop
    (`WorldSite.attraction`, `.routed`) and read by V13's `destination` term within its `reach.siteKm` and by W7's
    seats:" — fort, bridgeFort 0.6 yes "protection and a toll draw settlement and roads"; tollhouse 0.3 yes "a toll on
    the road between two powers draws a stop, an inn, a hamlet"; watchpost 0.2 no "a garrison's post, no market"; mine
    0.5 yes "ore is traded"; manor, guildhall 0.3 yes "a market in small"; temple, shrine, graveyard, hermitage 0.15
    "temple yes, the rest no" "pilgrims"; ruin 0.1 no "stone to rob"; camp 0.05 no "transient"; "cave, hideout,
    cellarComplex, sewerLair, dungeon, crypt, battlefield, tower | 0 | no | unknown to siting, or a solitude that repels
    (a tower's `solitude` term already keeps settlements off)".
75. `routed: yes` kinds therefore: fort, bridgeFort, tollhouse, mine, manor, guildhall, temple (V14:908–913); every other
    kind `no` (V14:910, 913–916).
76. `EncounterExtentRow` (crop extent by location profile) includes `road` — "| `road` | hinterland, country, world |
    within 15 m of a way or route | [60, 100] | click | — | ground |" (V14:961); `bridge` (V14:949); `gate` (V14:948);
    `site.level` and `site.ground` (V14:964–965); rows tried in order, first match wins (V14:968–969).
77. `SitePurposeWeightRow { purpose; terms: Partial<Record<SiteTerm, number>> /* … a negative weight repels */; hard?:
    SiteTerm[] /* terms whose zero refuses the candidate */ }` (V14:977); `SiteTerm` the 17 ids (V14:978).
78. The plug-in definitions verbatim for the road-bearing ones (V14:982, 985, 986): "`routeNear  — exp(−d_route ÷ 300),
    d_route the distance to the `route` layer;  roadControl — routeNear × min(1, crossings within 300 m ÷ 2) ×
    overlook`"; "`solitude — settlementFar × (1 − routeNear)`"; "`concealment — 1 − max(overlook, routeNear) (the
    inverse of being seen from routes and heights; J-V14.36);  oneApproach — 1 when exactly one low-cost approach (a
    route-cost basin under V13's cost law reaches the cell from one direction within 2 × its cost to the nearest
    route), 0.5 for two, 0 beyond`". Others: overlook (radius 300, norm 40), relief (norm 120), slopeFlat (slopeMax
    0.25), waterNear (400), shoreNear (600) (V14:980–981); settlementNear (2 000), settlementFar, territoryBorder (1 000)
    (V14:983); floodSafe, ore, stone (200 m → 0 at 1 000 m) (V14:984); wood (300 m) (V14:985). "every output in [0, 1];
    constants own, calibratable" (V14:979).
79. Purpose weights (V14:989–1000), verbatim: defence "overlook 3, roadControl 3, waterNear 1, floodSafe 2, slopeFlat 1,
    territoryBorder 2" hard floodSafe; watch "overlook 4, roadControl 2, solitude 1" hard overlook; worship "overlook 1,
    solitude 1, waterNear 1, settlementNear 1, relief 1" hard —; burial "settlementNear 2, slopeFlat 1, floodSafe 2"
    hard floodSafe; dwelling "waterNear 2, slopeFlat 2, wood 1, settlementNear 1, floodSafe 2" hard floodSafe;
    extraction "ore 4, stone 2, waterNear 2, routeNear 1, relief 1" hard "ore (a mine), stone (a quarry)"; concealment
    "concealment 4, oneApproach 3, settlementFar 1, wood 1" hard oneApproach; storage "routeNear 2, settlementNear 2,
    floodSafe 2" hard floodSafe; solitude "solitude 4, overlook 2, settlementFar 2, waterNear 1" hard solitude; trade
    "routeNear 4, settlementNear 2, shoreNear 1, slopeFlat 1" hard routeNear.
80. Terms reading roads: `routeNear` weighted in extraction 1, storage 2, trade 4 (hard in trade); `roadControl` in
    defence 3, watch 2; `concealment` and `solitude` (each built from `1 − routeNear`-type factors) in concealment 4,
    solitude 4, watch 1, worship 1 (V14:991–1000). No negative weight is shipped (V14:989–1000).
81. "V13 owns the score, its own terms (`habitability`, `discharge`, `lowland`, `coastType`, `resource`, `spring`,
    `destination`, `connectivity`), the interface, the context and the registry; nothing is asked of V13 but the
    context's two added fields (V14 §10.2 (1)). Equal candidates fall to V13's deterministic tie-break (the lowest cell
    index, then the lexicographic id); this volume draws nothing for siting (C14-04; SW-03)." (V14:1004–1008)
82. `CropRule.lookItems` patrol row: "a patrol passing that week (V13's `WorldFacts.polity.patrols`, `patrolAt`) →
    patrol 1 per road edge, its `wCm` 300 / 500 / 800 for a seasonal / monthly / weekly cadence (own, PLAUSIBLE)"
    (V14:1038); `recentEventWeeks` 104 (V14:1036).
83. `EmbedRule.terrain: { maxShapeCm 600; moatWidthM 6; cliffMinCm 400 }` (V14:1051).
84. `SiteLifecycleRow` causes `'host'|'dm'|'epoch'|'water'|'promotion'` (V14:1012); no lifecycle cause or transform
    concerns placement, roads or routes (V14:1014–1025).

### §2.6–§2.9 (V14:1091–1194)

85. G3's reason record names "the placement: V13's score terms with the purpose weights, the candidates considered, the
    terrain pre-edit"; G1's "the enclosure line read, the distance, the row matched"; G8's "the anchor's host, the
    access's dig, an adoption's mapping" (V14:1111–1117).
86. Identity: "The site document's town root is the card (its lineage the dropSite event's seq, or the placement's stamp
    for a host-placed site)" (V14:1131–1133); creation key "the card (host-placed, a free-standing site the host's record
    creates) | the host's binding key hashed as the unit | (`site`, the record's key)" (V14:1139); "the hinterland unit's
    faces | the card | S12a's keys with the card as the town root" (V14:1153); "the site's enclosure, gates, towers | the
    card | S7's keys" (V14:1152). The identity table has no row for a way, track or road of a site's ground part
    (V14:1136–1159).
87. Lifecycle row `SiteAnchor`: "on a deleted host face moved to the nearest admitted face of the same context and
    reported (never silently dropped)" (V14:1182).
88. Lifecycle row access record: "re-dug by `moveAnchor`; its state by II.7.4's rules and V14 §3.9's closures (an
    entrance whose unit's class is `wading` or worse reads `flooded`; SW-31) | … | absent: dug at the next open,
    reported `W_SITE_NO_ACCESS`" (V14:1183).
89. Lifecycle row `Reservation` of kind `worldSite`: "G8 (e)'s adoption | S3's claims, S4's destinations | the settlement
    document's reservations | kept (a declared claim)" (V14:1193).
90. The site document's `week`: "V13 §3.12.4's campaign week for a free site in a world" (V14:1179).

### §3.1 The site pipeline (V14:1196–1269)

91. Site document: "for a free-standing site, V13's charter record as S1's input (V13 §2's `FrameCharter`, M5's one input
    record)"; "no S0–S15 run on a site document"; "`ground` part 0 only for a free-standing site (the frame V13's
    placement gives it; its terrain from S1 under the charter)" (V14:1208–1216). "A free-standing site's frame is G3
    (c)'s" (V14:1226–1227).
92. "G3 runs there [the dry run] for a free-standing drop with a point, and on the worker for a drop with no point"
    (V14:1244–1245).
93. G1 row: reads "the clicked address; the host document's enceintes, perimeter, districts, buildings, plans,
    underground parts, islands (read); V13's world facts for a world point; `SiteAdmissibilityRule`" — "none (no draw)"
    (V14:1249).
94. G3 row verbatim: "| G3 | siting `SiteSiting.site` and the terrain pre-edit | V13's world document and score;
    `SitePurposeWeightRow`; the request's `terrain`; the host's placement | the site document's `worldRef` and the card's
    `placementRef` (the `Placement` V13 writes in the world document); the site document's frame and charter; the
    terrain pre-edit as a `setField` of the site document's creation prefix | none of its own: equal candidates fall to
    V13's deterministic tie-break (the lowest cell index, then the lexicographic id; SW-03) | the card | F-SITE |"
    (V14:1251).
95. G5 row reads "V13's charter (a free-standing site's ground)" and writes "the site document's `ground` part (a
    free-standing site)", streams "`plot.*`, `siting`, `siteplan`, `heights`, `pin.light` for the ground's buildings (the
    base's own concerns, the card as the town root)" (V14:1253). No G-stage row names a way, road or route as read or
    written (V14:1249–1256).
96. G8 row reads "a settlement's placement over a site (adoption)" and writes "`AdoptResult`, the re-addressed parts, the
    `worldSite` reservation" (V14:1256).
97. Eager sequence: "G2 (re-run …), G3 where the site has no placement yet, G4, G5, G6, G8 (a) …; G7 runs on events only;
    G1 runs only at creation and at `moveAnchor`" (V14:1258–1260).

### §3.2 G1 — admissibility, the context, the edge of town (V14:1271–1310)

98. Context rules in order (V14:1273–1289): 1 `world` — "the address is in V13's regime with no settlement frame under
    it (V13 W0's extent; a frame's placement covers a point when V13's `Placement` maps the point inside the frame's
    rectangle)"; 2 `urbanInside`; 3 `urbanBelow`; 4 `urbanSky`; 5 `urbanSurface` (a face owned by a district not
    `hinterland`/`underground`/`undercity`, region `R`); 6 `hinterlandNear` — "within `edge.nearM` of the **enclosure
    line**: the outermost enceinte's outer strip … else S6's settlement perimeter"; 7 `hinterlandFar` — "farther than
    `nearM` and within `farM`, and inside the frame"; 8 `country` — "beyond `farM` **inside** a frame (a point outside
    every frame is `world` by rule 1; C14-48)".
99. "A site document's own ground reads `siteGround` for E3 and `country` for G1 (a site inside a site's frame is a
    free-standing site of its own, J-V14.11)" (V14:1291–1292).
100. Bend: "A `dropSite` whose kind the context does not admit is **bent** (J-VI.4) to the nearest admitted kind of the
     same purpose … and the bend named in the dry run (`bend.site.kind`; V09 §4.9's catalogue), or, where no kind shares
     a purpose, refused `refuse.site.context` with the context's row listed (F-SITE's refusal rung)" (V14:1295–1298).
     **Catalogue use #2:** "V09 §4.9's catalogue" — the message-key catalogue (V14:1297).
101. "inside a frame `free` is never admitted … one ground has one owner, so a site inside a settlement's frame is the
     settlement's content from the drop (V14 §3.9 (g))" (V14:1299–1302). "An `editTable` on the rule re-reads nothing
     already placed: existing cards keep their context (a card is declared); the table governs new drops and
     `moveAnchor`" (V14:1302–1304).
102. Edge of town: "a town that builds a new ring moves its edge outward at the epoch that founds it (V06 §3.7), and a
     card dropped in the old hinterland keeps its context — only new drops read the new line" (V14:1306–1309).
103. G1's admissibility test is by context and kind only; it reads no road, route or way (V14:1273–1310).

### §3.2 (cont.) Import candidates (V14:1312–1324)

104. Import markers reach V14 "as V13's `SitingProposal` records with `demand: 'import'`"; G1 lists them as candidate
     drops in a **From the import** tab, each kind from `importKinds`; "an unmatched word a `camp` of attachment `ground`
     (the kind row's fallback), reported `W_SITE_IMPORT_KIND`"; "**The DM's acceptance of a proposal is the `dropSite`
     of item 133 (h)** … with the proposal's kind, position and name as the request's stated fields … a proposal the DM
     never accepts stays a proposal — no card exists for it, and the world document's digest moves only on the DM's
     act" (V14:1312–1324).

### §3.3 G2 (V14:1326–1395)

105. A1: "where a stated field is impossible in the context … it is bent to the nearest lawful value and the bend named
     (J-VI.4)" (V14:1329–1332).
106. A2 `purpose.context`: "`country` within `roadControl` reach of a route (V13's term ≥ 0.5) → `defence` for a fort,
     `watch` for a tower" (V14:1341) — the text calls `roadControl` "V13's term" here (§2.5 V14:978–982 lists it as one of
     V14's seventeen plug-ins).
107. A2 `terrain.kind`: "a `fort` or `manor` on ground sloping ≥ 8 % across the envelope → `level`; a `fort` of purpose
     `defence` on flat damp ground → `moat`; a `cave` on a slope ≥ 30 % → `cliffFace`; else `none`" (V14:1353).
108. A2 `levels.water` / `levels.wet` read V13's water table and the charter's biome `wetland` (V14:1348–1349).
109. A3 the available envelope: "`hinterlandNear` (attached) — the hinterland face clicked; `hinterlandFar`, `country`,
     `world` (free) — unbounded but by the preset" (V14:1376–1377). (§2.5 admits no `free` in `hinterlandFar`: V14:846.)
110. A4: `mine` only "where V13's or S1's resources give ore or stone within the envelope" (V14:1382–1383).

### §3.4 G3 whole (V14:1397–1456)

111. (a) The placement, verbatim: "A free-standing `dropSite` with a point takes that point as its placement origin and
     the request's bearing (default: the approach side faces the nearest route, by V13's route field, else north); V13's
     P1–P5 produce the `Placement` and the frame charter for the site's frame (V13 §3's placement, run for a
     non-settlement frame as V13 §2's charter admits, V14 §1b.6)." (V14:1399–1402)
112. (a) The no-point drop and the score, verbatim: "A drop **with no point** ("a fort somewhere on the pass") runs V13's
     `score` over the world document with this volume's seventeen plug-ins (… registered through V13's
     `terms.register(term)`; SW-01) weighted by `SitePurposeWeightRow` — the row's weight multiplying each plug-in's
     value, a `hard` term's zero refusing the candidate — beside V13's own terms at V13's weights; equal candidates fall
     to **V13's deterministic tie-break** (the lowest cell index, then the lexicographic id): no draw, no random or jitter
     term enters the score or follows it (C14-04; SW-03); the best candidate is the placement, the top five kept in the
     reason record as "the other sites considered" (V09's **Why here?** reads them)." (V14:1402–1409)
113. (a) "The `Placement` V13's P1–P5 write lives in the world document (V13 §2.7); the site document carries V13's
     `worldRef` and the card the mirror `placementRef` (V14 §2.2), and the site document's digest never moves with its
     placement (T-V13-2's bar read here; SW-11)." (V14:1409–1411)
114. (a) The host-placed rule, verbatim: "A host-placed site (its record's position) is never re-sited." (V14:1411–1412)
115. (a) Moving a site, verbatim: "**Moving a site (C14-15)** is V13's `setPlacement` (or `placeFrame` / `unplaceFrame`)
     with a `site` subject on the world document: every arena of the site stays byte-identical (bar 3), its charter is
     marked stale by V13's stamp rule, a `worldWins` on a site is the DM's explicit **re-materialization** of its ground
     and levels (G3 (c), G5 (f)) under the new charter with carry-over (there is no S1 to re-derive from; SW-19), the
     hinterland decoration, the world glyph and V13's W6/W7 re-run, and the card's `context` is re-read — a placement
     that lands inside a settlement's frame adopts by V14 §3.9 (g)'s rule." (V14:1412–1417)
116. (a) contains no coherence check, coherence cost, `nearestLawful`, `PlacementAnomaly`, or refusal on a site's
     placement point; a point drop takes the point as given (V14:1399–1417).
117. (b) The terrain pre-edit, verbatim in part: "the request's `terrain` becomes one `setField { field: 'terrain',
     stroke }` in the site document's creation prefix (§7.4's read-ahead), dated "this happened" at the construction
     layer's year under V13 §4's first verb (`setField.date`, V13 §4.1; SW-27)"; `level`, `raise`/`cut`, `moat` ("then
     V13's cascade fills it from the nearest body whose level reaches it, else it stays a dry ditch"), `cliffFace`;
     "The stroke's `water` is `locked` (§7.1). The prefix event replays with the document" (V14:1419–1427).
118. (c) The frame, verbatim: "The site document's frame is V13's placement's rectangle: `max(envelope's radius × 4, 120
     m)` on a side for a site whose policy's `ground` is `hinterland`, the envelope's rectangle plus 20 m otherwise,
     clamped to V13's frame limits. S1 runs on it under the charter (V13's edge elevation profiles, datum, water edges,
     climate, water table, biome, resources: M5's one input record), giving the site's terrain and water; the hinterland
     unit (S12a, S12b; §4.9) lays fields, tracks, woods and land use over the frame with the site's envelope as its
     "settlement perimeter" (the envelope ring stands in for S6's perimeter; its outside sites are the kind row's
     `buildings` with `arrangement` `cluster` where the policy names them outside the envelope, else none), so a tower
     stands in its own closes and a fort in its glacis. Until V13 lands, a free-standing site document takes a flat
     charter with the base's S1 defaults and reports it (V14 §1b.6)." (V14:1429–1437)
119. (c) The charter list V14 names for S1 does not include roads or the world route entering the frame; the "tracks"
     are laid by the hinterland unit (V14:1431–1434).
120. (d) A site as a destination, verbatim: "Every free-standing site carries `attraction` (0–1) and `routed` from its
     kind row (V14 §2.5's table; editable on the card): V13 W6's `destination` term sums the `attraction` of the sites
     within its `reach.siteKm` into a settlement candidate's score, and W7 seats a `routed` site among the route graph's
     seats, so a road is drawn to a fort or a mine as to a settlement. A hideout, a cave or a crypt has `attraction` 0
     and is unknown to siting." (V14:1439–1443)
121. (d) adoption: "A settlement the host founds over a site's frame adopts it (V14 §3.9 G8 (e)): the site is older and
     so prior in the layout — its envelope becomes a `Reservation` of kind `worldSite` that S3 claims first, as a castle
     reserve does (§4.2 S3 (2), (8)) … after adoption the site's gate is a `Destination` of kind `worldSite` for S4's
     router inside the settlement's frame (BCR-V14-13's one remaining clause)." (V14:1443–1447)
122. (d) "The relation runs both ways": a fort adopted is garrisoned; a ruin adopted is robbed for stone, lifecycle
     `cleared` with cause `rule:robbed`, levels "the ruin beneath the village" (V14:1449–1456).
123. (d) speaks of "Every free-standing site"; it names no rule for `inFrame`, `attached`, `ground` or `surface` sites'
     `attraction`/`routed` (V14:1439–1447).

### §3.5–§3.7 G4, G5, G6 (V14:1458–1755)

124. G4 rule 7: entrances attach "by an `open` edge to the periphery node … With `hiddenEntrance` the last entrance's
     edge is a `secretDoor` … a `hideout`'s second entrance is always so (the bolt-hole)" (V14:1499–1502). Entrance
     placement in G4 is graph-only (no plan position, no road) (V14:1464–1518).
125. Grammar mapping: "`tollhouse` → `fort.defence` at its smallest preset, the gatehouse astride the road" (V14:1567) —
     the only kind-specific text in the grammars that names a road.
126. G5 (b) 2 target points: "the entrance at the mouth — the point of `E`'s boundary nearest the approach side (a cliff
     face from the terrain pre-edit, the host element for an attached site, else the side facing the nearest route) —
     and the rest by a breadth-first spiral from it over a `hexLattice` of `(unit.minM2[role] ÷ π)^½ × 2` spacing with
     jitter `spacing ÷ 4`" (V14:1603–1607). (The text names a "jitter" in G5's target-point layout; it does not state its
     stream key in this sentence.)
127. G5 (c) rock-cut: "the entrance unit at the end nearest the approach side" (V14:1639–1640).
128. G5 (d) mine: ore field "V13's resources for a free-standing site, S1's `Terrain.mining` cells … inside a settlement's
     frame; with neither, a synthetic lode"; "the shaft unit at the entrance (a head-frame above ground on the ground part
     for a vertical shaft; an adit at a cliff face for a `cliffFace` terrain)" (V14:1653–1657).
129. G5 (e) enclosure: "`EnceinteStrategy.trace` (§4.12) over the envelope ring as the boundary, the entrance units'
     points as its `GateSite`s (`forced: true`), no reservations, the frame's terrain and water, policy `aroundAll`"
     (V14:1670–1672). No sentence in (e) joins a gate to a way, track or road (V14:1668–1689).
130. G5 (f) verbatim: "**(f) The ground composer `GroundComposer.lay`** — a free-standing site's frame under V13's
     charter (V14 §3.4 (c)): S1 (terrain and water from the charter), the terrain pre-edit (G3 (b)), S12a and S12b with
     the envelope as the perimeter, then (e); an attached site has no ground." (V14:1691–1693)
131. Technique table: "rooms above ground | the plan programme (V03), S11's site plans, S7's enceinte, S12a's hinterland |
     G5 (e), (f) | composition, no second generator (J-V14.6, J-V14.19)" (V14:1724).
132. G6: the aggregate's "access state by the route class from each entrance" (V14:1747) — "route class" here is V13's
     water route class (`routeClass`), not a road.

### §3.8 G7 (V14:1757–1837)

133. G7 stone robbing: "A `ruined` or `cleared` site within V06's robbing reach of a settlement that builds (an adopted
     site, or a free-standing site within `edge.farM` of a settlement's frame whose epoch runs) credits V06's salvage
     ledger" (V14:1794–1797) — `edge.farM` reused as a reach for a free-standing site.
134. `destroy` on a free-standing site: "a free-standing site's ground gains a `ruin` decoration … at the envelope's
     centre" (V14:1778–1779). No G7 transform touches a road, way or route (V14:1770–1806).
135. Host words table: "expanded, enlarged | `shape` expanded | a programme edit"; "repurposed, converted | `shape`
     repurposed; `purpose` changed" (V14:1821–1822) — none re-sites or re-reads `routed`/`attraction`.
136. Host building's fate: host `cleared`/`demolished` → "the access reads `collapsed` … and the anchor re-hosts to the
     trace's face … the icon drawing on the ground at that face; a successor building … re-heads the access by V14 §3.9
     (a)'s rule" (V14:1824–1833).

### §3.9 G8 (V14:1839–1950)

137. (a) The access record, verbatim core: "An attached site has exactly one `AccessPoint` of source `site` in the host
     document, dug by `SiteAttach.attach` from the anchor to the site's entrance unit: its `ground` is the anchor's host
     with `ground.storey` the anchor's storey (BCR-V14-2) — **the head rule (C14-02; J-V14.45; the V03 request of V14
     §10.2):** a `site`-sourced access heads **on its anchor's storey**, a `hatch` in that room's floor … or a concealed
     `door` in the room's wall …, and its descent to the building's lowest storey is a V03 stair core of the **new** kind
     `secret` (the V03 request of V14 §10.2, designed as granted …; SW-36)" (V14:1841–1847).
138. (a) Host forms: "A tunnel or chamber host → a `door` in its wall at the anchor's `at` …; a ground face → a `stair`,
     `shaft` or `hatch` by II.7.3's kinds; an island's yard → a `stair`" (V14:1852–1854); state `open` (or `locked` where
     secrecy `secret`); `knownTo` by secrecy; cause `{ rule: 'site', system: the card, event: the seq }`; "never a
     `HoodPlace`" (V14:1855–1860).
139. (a) The dig: "V04 §3.8's generators where the way in needs a connector (… the connector is a passage unit of the
     site document's first level, not a `dug` system of the host — the host document gains no geometry, J-V14.10)"
     (V14:1860–1862).
140. (a) No admissible head: "the anchor is bent to the nearest admissible point of the same context within 5 m, the bend
     named, else the access is left unmade and reported `W_SITE_NO_ACCESS` (the site stays reachable to the DM through
     its icon)" (V14:1863–1865).
141. (a) concerns attached sites only: the access record joins the host's ground/storey/tunnel to the site's entrance;
     the text does not join the access head to a street, way or route of the host (V14:1841–1865).
142. (b) The anchor: "`dropSite` writes the `SiteAnchor` at the clicked address …, its `at` the click snapped to the host
     face's interior, its `secret` `dmOnly` …. The icon is its rendering (V14 §5.1), map furniture over a canonical
     anchor: nothing else in the host document changes (bar 6 …)" (V14:1867–1870).
143. (c) Surface exception: `dropSite` expands into an `assign` "placed by S10b's solver at the event's position as any
     positive placement (§4.7 S10b; `placeAt` with `from` the click, item 20 (g))" (V14:1872–1876). (A surface site is a
     building on a plot, so it fronts the settlement's streets as any plot does — the text states the plot path, not a
     road rule: V14:1872–1887.)
144. (d) The icon's record verbatim: "**(d) The icon's record** is the anchor; a free-standing site's world glyph is made
     by `@plat/sites` running V13's `glyphOf` over the site document (V13 §3.10's frame-side marks: level 0 one `glyph`
     mark whose `class` is the kind's icon id — the level-0 kind glyph of V13's generalized `Glyph` record (V13 §3.10
     (4)) —, level 1 the dot and a `ring` at the envelope, level 2 the envelope's `outline` and its enclosure as `wall`
     marks, level 3 as level 2) into the site document's `derived.glyph` with its model digest, and posted to the world
     through V13's `world.glyph` message as any frame's (R-V14-8; …; C14-53; SW-08), and an `inFrame` site inside a
     settlement's frame carries a `Decoration` of kind `worldSite` on its reservation's face … so the hinterland shows the
     site at the city band (C14-50)." (V14:1889–1896)
145. (e) Adoption trigger, verbatim: "When a settlement is placed over a free-standing site's frame — the application
     (V09's tool) raises this volume's `adoptSite` (V14 §4.5) on the `placed` outcome V13's P4/P5 emit, naming the sites
     the placement covers, **automatically only when the placement's stamp is `world`** (a settlement generated from the
     world's charter; on a `settlement` stamp the dry run lists the covered sites with adopt, move the site —
     preselected — or cancel, so a settlement made before its placement never changes but by the DM's word; V13 §3.11.5
     (1)); V13 never calls this volume (SW-10)" (V14:1898–1902).
146. (e)(1) "the site's enclosure (as `drawWall` strokes with its kind), its buildings (`drawFootprint` …), its plots, its
     ways and its terrain pre-edit (`setField`, dated) enter the settlement's creation prefix as **drawn constraints**
     (§7.2; V13's `charter.sites` row names them so), locked and pinned …; the site's hinterland land use is **not**
     carried" (V14:1903–1910) — the one place V14 names a site's **ways** being carried into a settlement.
147. (e)(3) "the card moves into the settlement's entities block with `attachment` `free` still and its `placementRef` now
     the settlement's `worldRef` (the site's own `Placement` folded into the settlement's, V13 §2.6 …)" (V14:1914).
     "The reverse never happens by rule" (V14:1919).
148. (f) "V13's W6 reads every free-standing site as a destination (G3 (d)); a settlement founded there adopts it by (e);
     a thorp "in front of or surrounding an abandoned or occupied fort" is V07's village placed by V13 with the fort's
     reservation claimed first …; the fort joins the thorp's sway when its holder … is the thorp's own seat or its liege,
     and is otherwise an occupation mark inside it (V13 §3.9 (10))" (V14:1922–1928). The quoted words "in front of or
     surrounding an abandoned or occupied fort" are attributed by quotation marks but no item number at this line.
149. (g) `inFrame`: "the card lives in the host document (`attachment` `inFrame`, no site document, no placement); its
     envelope … becomes a `Reservation` of kind `worldSite` …; G5 (e) runs on the host's `ground` part 0 inside the
     reservation …; the hinterland unit is not run (the host's S12a fields stand, re-derived locally round the
     reservation by §7.3's S12 row) …; its icon is the `worldSite` decoration on the reservation's face (d). A free site
     never stands inside a frame: a `setPlacement` that moves one inside a frame adopts it by G8 (e) (C14-15)."
     (V14:1930–1941). No clause joins the `inFrame` site's gates to the host's ways (V14:1930–1941).
150. (h) `ground` cards: "no site document, no levels, no reservation and no access record" (V14:1943–1949).

### §3.10 E1 (V14:1951–1994)

151. E1 is "a **view operation**: it writes no event, no record and no digest" (V14:1955–1956); the memo is invalidated
     "by V13's cascade whose dirty set reaches its rectangle (V13 §3.14.2 step 5's "V14's E3 cache"; …)" (V14:1957–1961).
152. E1 (2) the profiles include "a road" (V14:1966–1969).
153. E1 (4) The world case, verbatim: "A `world` context reads V13's facts at the point — terrain class, biome, the route
     or river within the rectangle, the seat territory and the polity at the point and the encounter's week
     (`WorldFacts.polity`: … the patrols with their colours and whether one passes that week, a fight there — V13 §2.4),
     and the `WorldEvent`s V13's world document indexes near the point (`worldFactsAt(world, wCm, sinceWeek)`'s `recent`,
     V13 §2.4; SW-07) within `CropRule.recentEventWeeks` — and the profile from `road`, `creek`, `wood`, `shore` or
     `open`. Its ground is a **crop frame**: a transient materialization on the crop's owner-less transient arena (E4's,
     keyed by the address) of (i) V13's `charterFor(world, placement)` at a transient placement whose `originCm` is the
     clicked `WorldPointCm` (SW-12) — a 100 m frame, no settlement, no `Placement` recorded (the V13 request of V14
     §10.2; the form `WorldPort.charter` nearly gives) —, (ii) S1's terrain and water under that charter (… item 135 (c):
     the coarse fact, the position and the seed, so two adjacent crops agree at their shared edge), (iii) the charter's
     `roads` as way bands of their class (`corridorUnion` over the route's polyline at its class width), (iv) S12a's land
     use over the frame (the biome's cover: wood, scrub, pasture, marsh; no tofts, no fields unless a route's verge row
     says so), all as `fixed` faces of the arena (E4 (a)) so `line_of_sight` …, the road band, the water face and the
     VTT scene exist; never persisted, released with the encounter." (V14:1975–1989)
154. E1 (4) "Until V13 lands the world click is refused `refuse.encounter.noWorld` (V14 §1b.6)" (V14:1991–1992). E1 (4)'s
     world facts list does not name a world site near the point (the site list it reads is none; V14:1975–1980); E1 (3)'s
     resolved set names "a site's units where the click lies in a site document" (V14:1974).
155. E1 (5): "the encounter never writes into the world" (V14:1993–1994).

### §3.12 E3 (V14:2027–2067)

156. E3 (5) for V13's regime the grid origin is "the crop frame's transient placement, whose `originCm` is the click's
     `WorldPointCm` snapped to the grid; SW-12" (V14:2048–2049).
157. E3 (6) scenes include "a deck scene (§11.1's per-raised-way)" (V14:2053–2054).
158. E3 (7): "`routeClass` over the crop's ways (V13 §3.13.3)" (V14:2064–2067) — water route class over ways.

### §3.13 E4 (V14:2069–2120)

159. E4 (a): "a world crop's frame faces the same way, E1 (4)" — `fixed` rings owned by their entities (V14:2071–2076).
160. E4 (b) derived items: "`streets`: along the way corridors at even stations"; "a `world` context's polity gives
     `patrol` (a party in the power's colours at the crop's road edge when a patrol passes that week by `patrolAt`, its
     width by the cadence, V14 §2.5), `barricade` (at a border post in the crop) and `debris` … — keyed by (the address,
     the week), never a roll" (V14:2085–2097).
161. E4 (d) promotion `as: 'site'`: kind and attachment derived — "a `camp` look or camp items → `camp`, `ground`; a
     `siege` look or barricades → `battlefield`, `ground`, then `camp`; a battle in V13's events → `battlefield`,
     `ground`; a place on `urbanSurface` → … `surface` …, else `camp`, `ground`; a hinterland place → `manor` or the
     place's kind as `inFrame`; an underground chamber → `hideout` or `cave` …, `attached`; a site level → an expansion
     of that site … — every derived pair admitted by V14 §2.5's table, so "keep this" at a street corner is never refused
     or bent into a building" (V14:2103–2116). "the anchor stands at the crop's centre in the crop's context"
     (V14:2114–2115). No E4 (d) clause names a `world`/`country` promotion to a `free` kind other than through these rows
     (V14:2103–2120); §2.5 row `country` says "camp, battlefield, graveyard also `ground` on V13's regime through a crop
     frame's promotion only" (V14:847).

### §3.14 Failure handling (V14:2122–2190+)

162. F-SITE tiers: "(1) bend to the nearest lawful form, named; (2) the ladder of the stage; (3) leave out and report;
     (4) refuse with the reason and the alternatives" (V14:2124–2126).
163. G3 siting failure row verbatim: "| G3 siting | no candidate passes the hard terms; a free-standing drop with no point
     before V13 lands | the hard terms relaxed one at a time in the row's order → refused with the terms; refused
     `refuse.site.noWorld` (C14-49) | the terms failed |" (V14:2133).
164. G3 terrain pre-edit failure row: "the stroke's Δ exceeds `maxShapeCm` or crosses water | clamped to the limit; a
     stroke over water bent to the shore (§7.1's terrain rules) | the clamp" (V14:2134).
165. G8 rows: "G8 access | no admissible head within 5 m | the anchor bent → the access unmade | `W_SITE_NO_ACCESS`"
     (V14:2148); "G8 surface | S10b finds no plot | … the drop bent to `attached` below the nearest building, named"
     (V14:2149). No failure row covers a free-standing or `inFrame` site lacking a road connection, or a point-drop
     placement that is incoherent (V14:2128–2157).
166. SE9: "G3 (V14 §3.4) | E1: no world → hinterland contexts only; E5: a `cliffFace` on flat ground makes a cut of
     `cliffMinCm` (a quarry face) | the terms | T-V14-8" (V14:2175). SE7: "a click on water reads the nearest land face's
     context" (V14:2173). SE11: "an envelope beyond the frame is clipped to it (a free-standing site's frame grows, V14
     §3.4 (c))" (V14:2177).
167. SC1: "a site × a cliff, steep ground, a coast, a moat, a bridge, an oasis, the frame | the envelope never crosses
     water (`A3`'s cap; a `cliffFace` site's mouth on the face); steep ground levels by the pre-edit where the kind asks
     …; the frame clips the envelope | T-V14-27 (a)" (V14:2189).

### §3.14 rest, §3.15 Determinism (V14:2191–2222)

168. SC6: "a free-standing site runs no epoch unless the host's event says so" (V14:2194). SC7: "a thorp placed over a
     fort adopts it" (V14:2195).
169. §3.15: "G3 nothing (no random or jitter term in or beside the score: equal candidates fall to V13's deterministic
     tie-break, V13 §3.7 (6); SW-03)" (V14:2205); G5's "the hex lattice's jitter (`site`, the card, the layer,
     `lattice`)" is a listed keyed draw (V14:2207–2208); "G1, G6, E1–E3, R1–R4 and the tactical check draw nothing"
     (V14:2214); "every search breaks ties by address, key or index" (V14:2216).

### §4 Editing (V14:2224–2435)

170. §4.1 `dropSite` points form: "one point (the anchor) — T6's **Drop a site** drops at once with the context row's
     first kind and an empty request …; a free-standing drop with no point ("somewhere fitting") takes none"; the dry run
     derives "G3 for a free-standing drop (the placement's rectangle)"; handles "the anchor's point; the envelope's
     corners (a `polygon` footprint); the bearing" (V14:2238).
171. §4.1 `moveAnchor`: "G1 on the new address (… a context whose row no longer admits the kind is bent to the nearest
     admitted address of the old context, named); the access re-dug by G8 (a)" (V14:2240).
172. §4.1 row verbatim: "| V13's `setPlacement` / `placeFrame` / `unplaceFrame` with a `site` subject (C14-15) | V13's
     points form on the world document | V13's placement dry run; the site's arenas untouched, its charter stale, its
     context re-read (adoption where the new placement lies inside a frame) | V13's |" (V14:2243).
173. §4.1 "A dry run shows the derived shape as a ghost with its fates; accepted, the shape is stored resolved and no
     later derivation moves it (declared means held, §7.2)" (V14:2248–2249).
174. §4.2 event `dropSite { at?: PointCm | WorldPointCm …; key?: PlatKey | { world: true }; … placement?: Placement /*
     V13; a free-standing drop's proposal, which V13's P1–P5 write into the world document — the card holds only
     `placementRef` (SW-11) */; fates }` (V14:2254–2256). `setAttr` paths added: `anchor/address`, `anchor/secret/state`,
     `site/name`, `site/host/*`, `unit/*`, `link/*` (V14:2261) — no `site/attraction` or `site/routed` path is listed,
     though V14:540 and V14:357 say both are "editable by `setAttr`".
175. §4.2 `convert` ops added: `destroySite`, `occupySite`, `vacateSite`, `damageSite`, `restoreSite`, `repurposeSite`,
     `expandSite`, `collapseUnit`, `breachUnit`, `floodSite`, `drainSite` (V14:2262) — none moves or re-sites a site.
176. §4.3 Remove: "an adopted or `inFrame` site's parts are **tombstoned** … the terrain untouched (the DM's terrain
     pre-edit stays as the ground's own dated event …)"; "a `delete` of a host-created card returns F-EDIT
     `dossier-owned`" (V14:2292–2304). Destroy: "the ruin decoration on a free-standing site's ground" (V14:2305–2309).
177. §4.5 adoption: "the DM raises it by hand with T10 `hold`'s **Adopt into the town** for a free-standing site whose
     placement lies under a settlement's frame (V13's `Placement` of both) that no earlier `adoptSite` took (an older
     site placed after the settlement, say)" (V14:2336–2338).
178. §4.7 locality row verbatim: "| `dropSite` (free) | the site document (created on first open); V13's W6 `destination`
     term and W7's seats read the card's `attraction` and `routed` at their next run (a settlement already placed never
     moves: a term is read at placement only) | the host documents; every other site |" (V14:2372).
179. §4.7 locality row verbatim: "| `setPlacement` / `placeFrame` / `unplaceFrame` on a site (V13's events; C14-15) |
     V13's: the placement, the charter marked stale, the glyph, W6/W7's re-run; here the card's `context` and, inside a
     frame, G8 (e)'s adoption | every arena of the site (bar 3) |" (V14:2375).
180. §4.7 `dropSite` (`inFrame`): "the reservation's faces and the blocks they touch: §7.3's reservation operator, S7's
     trace, S10/S11 on those faces, V03's plans …; §7.3's S12 row round the reservation" (V14:2373). `adoptSite`: "the
     settlement's S3 reservation operator and the merged ground's local re-derivation (§7.3's S12 row for the hinterland
     faces the site's ground replaces)" (V14:2386). Neither row names the host's ways or S4's router re-running
     (V14:2373, 2386).
181. §4.7 "an `editTable` on `tables/sites/*` | new drops and the next materialization; … existing cards keep their
     context, programme and geometry (a card is declared)" (V14:2391) — an edit of the kind rows' `attraction`/`routed`
     columns reaches existing cards only through this row (the card holds its own copy, V14:540).
182. §4.8 Undo: "a `setPlacement`'s undo is V13's (the site's arenas untouched either way)"; "A `creation` event (a site
     document's `dropSite` copy, its charter, its terrain pre-edit) is no undo target" (V14:2404–2407).
183. §4.9 **Catalogue use #3:** "Every word is a catalogue key (V09 §4.9): `info.site.*`, `info.unit.*`,
     `info.encounter.*`, `bend.site.*` (`bend.site.kind`, `bend.site.storey`, `bend.site.levels`,
     `bend.site.removeAdopted`), `bend.encounter.noHour`, `refuse.site.*` (`refuse.site.context`,
     `refuse.site.transition`, `refuse.site.noWorld`, `refuse.site.clock`), `refuse.encounter.noWorld`,
     `refuse.raise.flat`" (V14:2423–2426). The `site` why section answers "the siting's terms and weights, the other
     sites considered" (V14:2418–2419).

### §5 Rendering (V14:2437–2727)

184. §5.1 icon verbatim: "one mark of semantic `site.icon` (role `pin`, §8.2's pin rows) at `SiteAnchor.at`, its glyph
     the kind row's `icon` (a keep, a tower, a temple, a cave mouth, a pick, a mask for a hideout, a slab for a crypt, a
     stair for a cellar complex, a grating for a sewer lair, a skull for a dungeon, a tent, crossed swords, a cross), 24
     CSS px at the building band and 16 px at the neighbourhood band" (V14:2441–2444) — the icon list (13 glyphs) is
     given in prose, not per kind row.
185. §5.1 "**Two rules by attachment (C14-50):** an **anchor's** icon (`attached`, `surface` with levels, `ground`) draws
     at the neighbourhood and building bands only …; a **free** or **`inFrame`** site's `worldSite` decoration (V14 §3.9
     G8 (d)) draws at every band, and a free site's world glyph on V13's world view by W9's levels" (V14:2444–2448).
186. §5.1 the context rule table (V14:2450–2458): ground face at neighbourhood/building band; a building's storey only
     with "that building's plan is open at exactly that `storey`"; underground/site element when Below/Site is drawn at
     the band holding its floor; sky island when the island's part is drawn. "Outside its context the anchor draws
     nothing and is not hit-testable; Find's listing … still lists an admitted card with **Go there**, which sets the
     view keys … — view keys only, no event" (V14:2460–2462).
187. §5.1 "Opening a site": the site document's view "opens at its ground (free-standing) or its first level (attached)"
     (V14:2472–2475). §5.2 a site document draws "its ground part through §8's ground rows (the hinterland, the
     enclosure, the buildings …)" (V14:2479–2480) — ways are not named among the ground rows listed.
188. §5.3 VTT: "the ground scene with `line_of_sight` from the footprints, walls, cliffs and retaining walls …, portals
     at the entrances and gates" (V14:2529–2532). No §5 clause concerns roads beyond the draped way bands in 2.5D: "a
     way's band draped along its spine's heights" (V14:2654–2655) and the world's "routes and territory borders draped"
     (V14:2698).
189. §5.4 ZDecl row: "way, corridor, kerb band, square, plaza | surface (draped)" (V14:2578); "V13's world kinds
     (`WorldRaster`, `WaterSurface`, `SurfaceTrace`, `TerrainTrace`, `WorldRoute`, `Territory`, the glyph marks, the
     labels) | V13's own rows" (V14:2606); `SiteAnchor` icon flat "furniture" (V14:2598).

### §6 Budgets (V14:2729–2797)

190. E1 (4) crop frame budget: "V13's transient `charterFor` (≤ 10 ms, V13's `WORLD-9` row; SW-32), S1 on a 100 m frame
     (≈ 4 ms …), the roads as bands (≤ 3 ways, ≈ 1 ms), S12a's cover (≈ 3 ms), the arena's `fixed` faces (≈ 2 ms) | … |
     20 · 26 ms" (V14:2744).
191. G3 (free-standing) budget: "V13's score over its candidates (V13's `WORLD-10` row; SW-32); the terrain pre-edit …
     | V13 §6 | V13's row + 5 ms" (V14:2758); first open free-standing "≤ 140 · 220 · 120 ms p50; ≤ 300 · 500 · 300 ms
     p95 (+ V13's siting row for a drop with no point)" (V14:2768). No budget row for a site's road join or a coherence
     check (V14:2738–2773).

### §7 Tests (V14:2799–)

192. `B-SITE` fixture: "a fort and a mine in the country, a tower and a manor in the hinterland, a temple and a guildhall
     on the surface, a crypt under the cathedral, …, a cave under the hills, a dungeon of four layers" (V14:2802–2806).
193. T-V14-2 (G1): "`hinterlandNear` ⇔ within `edge.nearM` of the enclosure line …; `country` beyond `farM` or the frame;
     every point's reason record names the line and the distance; an `editTable` of `nearM` changes new drops' contexts
     and no existing card's" (V14:2827).
194. T-V14-7 (adoption): "the site's enclosure, buildings, plots, ways and terrain pre-edit entering the settlement as
     drawn constraints of its creation prefix (locked, pinned, keyed by the site's tokens; the site's land use not
     carried; C14-16)" (V14:2832).
195. T-V14-8 (siting) verbatim: "on V13's world fixture (from V13's M-W1 landing): each of V14 §2.5's seventeen
     `SuitabilityTerm` plug-ins is a pure function of V13's rasters in [0, 1] (a fixture cell per term with its expected
     value); a fort with no point lands on a candidate whose `overlook` and `roadControl` plug-ins exceed the frame's
     median and whose `floodSafe` is non-zero; a mine on ore; a hidden temple at a candidate with `oneApproach` 1; no
     random term enters or follows the score (two runs are bit-identical, V13's tie-break deciding equal candidates;
     SW-03); the reason record lists the five candidates considered; the card's `attraction` and `routed` reach V13's
     `destination` term and W7 (a routed fort gains a road); a host-placed site never moves; until V13 lands, a
     free-standing drop without a point is refused `refuse.site.noWorld` (C14-04, C14-49) | nightly (from V13's W1)"
     (V14:2833). "a routed fort gains a road" is the only test clause about a site getting a road.
196. T-V14-9 (locality): "a town regenerated locally around a new free-standing site (an `adoptSite` over a CITY)…; an
     `inFrame` watchpost and manor (C14-01) the reservation's faces and the blocks they touch, the host's new `site` parts
     and nothing else" (V14:2834).
197. T-V14-25: "a free site moved by V13's `setPlacement` keeps every per-part digest unchanged (C14-15)" (V14:2850).
198. Parity: "the survey's parity rows … the one-click drop (its §6.1 (4); T-V14-5)" (V14:2812–2815); T-V14-4 (e) "in
     town nothing nearby is generated" (V14:2829).

### §8 Build plan (V14:2868–2940)

199. "**M-SITE-F**, free-standing sites with their ground, siting, destinations and adoption, after V13's M-W1 (the
     charter, placement and the W6 score)" (V14:2875–2876). SE6 content: "G3 whole over V13's score with this volume's
     seventeen `SuitabilityTerm` plug-ins and the purpose weights (C14-04), the terrain pre-edit under V13's verbs, the
     frame and the charter, G5 (e)'s ground composition (S1, S12a/S12b, S7, S10/S11, V03 on the site's ground) and (f);
     the `worldSite` decoration and destination (BCR-V14-13); G8 (e) adoption …; G3 (d)'s `attraction` and `routed` on
     the card; the robbing relation with V06; the world-map encounter context (E1's `world`) over V13's facts"; exit
     "T-V14-7, T-V14-8, T-V14-9 (bar 6), T-V14-10 (c), T-V14-27 (a), T-V14-4's world clause …"; est. 3.5–5 pw
     (V14:2890).
200. Dependencies: "SE6 waits on V13's M-W1 (the charter, placement and its W6 score) — until M-W1 lands a free-standing
     drop takes a point only" (V14:2905–2906). (§1b.6 V14:474 says "free-standing sites wait"; V14:475 "a free-standing
     drop takes a point only".)
201. Risk (5): "V13's score lacking the two terms (V14 §11 Q2; the fallback: concealment as 1 − overlook, one approach
     from the route count — both readable from V13's distance fields)" (V14:2927–2928). Risk (8): "The host's site record
     (V14 §11 Q2's second half): until SettlementForge carries one, every site is map-tier" (V14:2930–2931).
202. Content step: "the catalogue's `info.site.*`, `info.unit.*`, `info.encounter.*`, `bend.site.*`, `refuse.*` lines
     (English, own), the icons' glyphs" (V14:2896) — **Catalogue use #4** (V09 §4.9's message catalogue).
203. Register: "SE3 `sites.admissibility`, `sites.kinds`; … SE6 `sites.purpose`" (V14:2916–2918).

### §9 Decisions touching siting, roads, placement, the world (V14:2942–3005)

204. J-V14.3: a site as a `Document` of product `site` "because the city's plots must never move for a site (item 133
     (b))" (V14:2952).
205. J-V14.10: attached site separate document, one anchor, one access; "the host document must gain no geometry for a
     site (item 133 (b))" (V14:2959).
206. J-V14.11: "chose a cave attached to a terrain feature in the country as a free-standing site whose placement names
     V13's feature, and a site inside a site's frame as a site of its own, over a third attachment mode" (V14:2960).
207. J-V14.27: locality — "the city's plots never move for a site" (V14:2976).
208. J-V14.29 verbatim: "chose a free-standing site's frame as V13's placement rectangle (the envelope's radius × 4, at
     least 120 m, for a site with a ground policy) under V13's charter with the envelope standing in for S6's perimeter in
     the hinterland unit, over a site with no ground or a full settlement frame, because a tower stands in its closes and
     a fort in its glacis, and the hinterland unit already lays fields round a perimeter" (V14:2978).
209. J-V14.36 (amended by J-V14.43): `concealment` = 1 − max(overlook, routeNear); `oneApproach` the count of low-cost
     approach directions under V13's cost law (V14:2985). J-V14.37 superseded by J-V14.43: "replaced by the kind row's
     `attraction` and `routed` read by V13's `destination` term and W7" (V14:2986).
210. J-V14.38: world-map case "refused until V13's M-W1 …, because … a crop that invented terrain the world will later
     contradict would break item 135 (a)" (V14:2987).
211. J-V14.41 verbatim in part: "chose **adoption at the drop** (`inFrame`) for every site with a ground policy inside a
     settlement's frame … and never a `free` site inside a frame, over a second document in the frame, because one ground
     has one owner (item 135 (a): one geometry refined three times)" (V14:2990).
212. J-V14.43 verbatim in part: "chose the seventeen siting terms as this volume's plug-ins … with the kind row's
     `attraction` and `routed` read from the card by V13's `destination` term (within `reach.siteKm`) and W7, and no
     random or jitter term in or beside the score (equal candidates fall to V13's deterministic tie-break) … because V13
     owns the interface, the context and the registry and this volume owns the terms (C14-04; SW-01, SW-03)" (V14:2992).
213. J-V14.44: "the world-map crop as a **crop frame** — V13's charter at a transient placement, S1 and S12a over 100 m
     and the charter's roads as bands … because a crop needs faces for line of sight, roads and water" (V14:2993).
214. J-V14.50 (SW-04, R1-1): import candidates as V13 `SitingProposal`s; "the world's digest moves only on the DM's act"
     (V14:2999). J-V14.51 (SW-08) glyph via `glyphOf`/`world.glyph` (V14:3000). J-V14.52 (SW-10) adoption raised by the
     application on V13's `placed` outcome (V14:3001). J-V14.53 (SW-11, SW-12) `placementRef` only; integer `WorldPointCm`
     (V14:3002). J-V14.55: "to make a `worldWins` on a site a re-materialization (G3 (c), G5 (f))" (V14:3004).
215. No J-V14 decision addresses a site's road access, a site's join to the road network beyond W7 seating, or
     placement coherence/autocorrection of a site (V14:2948–3005).

