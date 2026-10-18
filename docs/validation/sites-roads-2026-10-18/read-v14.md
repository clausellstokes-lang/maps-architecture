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

