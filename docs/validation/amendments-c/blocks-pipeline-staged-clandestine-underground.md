Block file of seat D (pipeline-staged-clandestine-underground), amendments c + d + e bundled pass. Blocks only below; text before the first block header is ignored.
=== REPLACE ## II.2 Templates as fabric strategies (NG B2, B7, B8) ===
## II.2 Templates as fabric strategies (NG B2, B7, B8)

`RingFabric` (COV-NG-N12): concentric `secondary` ring roads inside the boundary at a radius law (a table) are the template's
only seed geometry — no template radials. **The ring courses (default; item 58 (a); provenance `ref:NG 1.2.2 ring courses
(code)`, P19).** The radius law's default row lays the rings from the district's ring centre (its area centroid)
outward: the first spacing is the district's lower block extent `e_lo` (§4.6 step 1) plus a uniform share of the radius
that remains to the boundary's inset, and each further spacing is the previous one × (1 + f), `f` the folded
four-uniform bell of §4.6 step 1 (a per-ring factor in [1, 2)), so the rings widen outward; a ring whose course would
leave the boundary's inset is not laid, and the outermost band runs to the boundary. Each ring is a hexagon at its
radius — every ring of the district sharing one phase drawn once per district, each vertex's radius moved by a centred
bell of `ringJitter` × the ring's spacing — smoothed by `ringPasses` corner-cutting passes (each corner replaced by the
points at one quarter and three quarters of its two edges; three passes take the hexagon to 48 vertices). The draws are
on `cut.arc`, keyed by the district and the ring's ordinal (§6.1; no new concern). An **uncut centre** — the face inside
the innermost ring — is laid out, at equal odds, as a square, as a green block or as a manor block; where the district's
greenery rows allow no greens and no trees, the ring nearest the centre is closed instead as a loop around a plaza. `ringJitter` (0.15, provenance `own`)
and `ringPasses` (3, provenance `ref:NG 1.2.2 ring courses (code)`, P19) are the `ring` template row's values, settable
per district through `fabricParams` by `setAttr` like every fabric parameter (II.4); the jitter's share is recalibrated
on M5's NG ring pairs (J-S34). For scale only: the medium area template of NG 1.2.2 spans ≈ 525 m, read through its
export scale (0.35 of a metre for each model unit) — descriptive, an inference that Fable's evidence gate released as such (item 58 (f)); no default of
ours is derived from it. The bands are processed **outside-in**, one hole-aware bent-cut recursion per
annulus (§4.6's slit and holed position law): the band's **first cut is a slit** that opens the annulus without
splitting it, and its later cuts are its radial streets, arriving at the ring roads at right angles by the recipe's
perpendicular departure and arrival; each band draws its cuts from its own sub-stream, so radials are **staggered band
to band**, never one straight line through all rings (NG RA-2, RA-4, PF-1). Radials of the outermost band that reach the
boundary use II.1 rule (3)'s seam amendment. `SquareFabric`: `mode: 'carved'` places a rectangular or round plaza face at
the district's centroid or at a portal, sized from population, frontages typed `square`, then the bent cut on the
remainder; `mode: 'void'` (COV-VG-VN-179) carves nothing — the plots whose frontages face a chosen open area are left
unbuilt, so the square is the irregular void their omission forms; in both modes a centrepiece pin (monument, statue or
fountain; COV-NG-XB23) sits at the square's nexus. The `square` template row's default is `mode: 'void'` (J-S42) — so a
district opened with `square` and no mode, and every `square` pair of the D-5 panel against NG (§13.6 (2)), gets the
void; `carved` is the row's other value, recorded as `fabricParams.squareMode = 1` (0 or absent is `void`, since
`fabricParams` holds numbers, §2.5) and set by `setAttr` like any fabric parameter (II.4). `StreetFabric`: a main street
between two portals with plots directly on it, bent cuts on the deeper faces. **Template road widths (COV-NG-N20):** ring
roads and template streets take fixed per-district widths drawn once from the district's stream (NG 1.2.2 draws them as
its per-map maximum), while cut streets follow §4.6's width law. A template is its seed geometry plus the number of
sub-areas it hands to the bisector (CA-2 via the parity judge) — a data row plus a strategy class. The **`area` template
is the base's own bent-cut fabric** (`FabricStrategyId` `bent-cut`, §4.6), the default, opened as a `refine` close-up.
Templates chosen by context (stage-2 feature S4) read the district context (a quay district gets a quay-parallel street;
an intramural district a ring near the wall; a stepped street on a slope).

=== REPLACE ## II.3 Block content dispatch, pins, local identities (stage-2 feature S2: context features) ===
## II.3 Block content dispatch, pins, local identities (stage-2 feature S2: context features)

A stage-2 table maps `(block area, spacing to the nearest green, spacing to the nearest landmark or manor block, district
kind, prosperity band)` → the weighted choice among ordinary, manor, empty and green blocks that NG 1.2.2 also makes
(CONFIDENCE B6). NG 1.2.2 greens a court whenever its frontage ring is complete, so its green share follows block and
lot sizes (23–58 % of ordinary blocks) — ours has a target per band, from §4.9's rules (item 58 (b)); a **minimum
landmark spacing** row keeps landmark and manor blocks apart (NG 1.2.2: "kept apart from each other"; COV-NG-XA07).
**Pins** of the neighbourhood tier (wells, fountains, large trees, statues, monuments, bandstands) are placed in yards and
squares by a probability gate per kind and band, with the chosen kind's weight divided by 10 for the rest of the block's
picks, so one block rarely repeats a kind (item 58 (c); provenance `ref:NG 1.2.2 pin decay (code)`, P20; drawn on
`pin.decor`, keyed by the block and the pick's ordinal), as refine-mode presentation detail; the base's own pins (§4.7
S11) are model entities and appear at every LOD. **Local street identities** (names, surfaces, widths) come from the way
records and the naming grammar; context features (stage-2 feature S2: quays, the intervallum along the wall, stepped
streets, bridge approaches) are constraints available inside the boundary. A manor compound's enclosure wall and gate
are the base's `PlotBound` treatments (§2.5, §4.7 S11), so the close-up draws a compound's enclosure from model data
(ours, an `extension`; the manors of NG 1.2.2 stand unenclosed; COV-NG-N27, item 44).

The prosperity band the dispatch reads is the block's **manifested band** — §4.11's block-level reading of its plots'
geometry floor (item 31; J-A31.43): what stands there — while a pin's probability gate reads the field band.

=== REPLACE # PART III — What a later village product needs from the base (one page; the hooks are concrete) ===
# PART III — What a later village product needs from the base (one page; the hooks are concrete)

*In plain words.* The village generator is a separate product the owner stages after the town, with its own ladder (thorp →
hamlet → village). This page lists what it would take from the base, the hooks the base carries for it now, and confirms
nothing here stands in its way; the base does not pay for it.

**What it would reuse unchanged:** the kernel and plat (§2–§3); the site model — descent-traced rivers with a carved field,
level-set ponds, the coast routine (§4.2) — and, for VG's own order, a `RiverStrategy` that lays a terrain-independent
spline course first (VG's live course runs through 6–7 control points laid before its terrain; COV-VG-WC2) and asks S1 to
carve the field to it, which S1's carve step already does; the sequential roster and lazy people (§10); the frontage-first
plot machinery and the designation templates (§4.7 S11, §10.2), which already contain cottage, farmstead and
detached-in-yard classes; the
hinterland presets incl. the VG sector look, orchards and commons (§4.9); the `palisade` enceinte kind (§2.7); the display
list, style sheets, the base's relief tier (hillshade, contour and hachure marks) and the reserved `painterly` preset slot
(§8.2); the document, edits, exports and the API (§7, §11).

**What it would add behind hooks the base now carries (DEF-15):**
1. **A density stage before its network (COV-VG-VN-002).** The pipeline is the topological order of declared stage I/O
   (§4.1, §4.12), so a `VillageStrategy` registers a density `StageDecl` whose output the network stage declares as an input;
   VG computes its density before its roads, and the base's S6 order does not bind it.
2. **A palisade before its roads (MN-4, COV-VG-VN-003).** On VG 1.6.9 (itch 19365073) the palisade is built before the
   roads — the hull of the populated points of a 10 × 10 lattice over the density field, cleaned and smoothed — and the road
   trackers consult it at every step (VG 1.6.9's code confirms the order; its steering is a per-type terrain weight plus
   terms for water, for the destination's pull and for the wall's push — reader-tier, for the village rung's calibration; provenance row D5, item 61), gates falling where they
   meet it (`profile-village.md` New-build addendum N2, P1). The
   village registers an `EnceinteStrategy` that builds exactly that from its density stage, and its tracker-steered
   `NetworkStrategy` receives the result through the `enceintes` input every network strategy takes (§4.12).
3. **A tracker-steered network** (VG's roads are steered trackers, not A\* — `_critic-vg-ng.md`) with one through-road and
   partial driveways, and a **"houses along ways" `FabricStrategy`** with no block cutting.
4. **One district (COV-VG-WC4).** A village is modelled as **one district** of kind `village` (one quarter) covering the
   settlement; its blocks are the large faces between ways and its plots line the ways, so the containment invariant building
   ⊂ plot ⊂ block ⊂ district holds unchanged and nothing in §2–§4 needs a village exception.
5. **A size ladder below TOWN.** Rung rows THORP ≈ 20–80, HAMLET ≈ 80–400, VILLAGE ≈ 400 up to (not including) 1 500
   inhabitants (our own rows, calibratable; VG spans ≈ 130–1 700); a request of 1 500 or more is a base TOWN and below 1 500
   `LadderRouter` routes to the village product (§1.1, D-33). A village request's default is not a walled circle (walls are a
   rule keyed on rung); VG's independent tree stream is a keyed sub-stream (already the design); VG's spotlight vignette and
   grass-tuft look are `painterly` programs — the hillshade, contour and hachure marks are the base's relief tier (§8.2), built
   at M2b (§16), so the village adds none of them (COV-VG-VN-029).

**Not-precluded checks** (the parity judge's 44 / 44): the strategy registry admits every strategy above; the level model
tolerates nearly empty L2 / L3; model time is near-linear in building count; every VG rendering row has a program or a
preset slot; terrain-and-water-as-one-picture is the base's own model. **What the base does not pay for:** tracker steering,
the palisade construction, VG's spotlight and painterly look, the palisade look, VG's grammar and its tag vocabulary.

**Placement and designation (items 16–19).** The village reuses the one placement solver with the relation templates and
supply edges, the designation templates and the designation mutator (§4.7 S10b, S11; §10.2), whose rows already carry the
village classes — cottage, farmstead, mill, smithy, chapel, inn — and the `Use` record with its relocation path (§2.7,
§4.11); a village adds rows, not code.

**Emulation baselines, markets and hidden plots at the village rungs (items 24–27 and 30).** The village rung rows carry
a hidden-share target of 0 and reach weights of `open` only (§4.6; VG's and MFCG's every-house-on-a-way), a `market` row
of `min` 0 with at most one market — a green or a widened street, sited by §4.2 S3 (12)'s score with the plaza kind absent
— the farm mode `fill` (§4.9), and the band set's cuts computed per village from its own roster shares over its one
district (§4.5); §4.11's terrain and water conversions apply unchanged. A concealed institution (§4.7's *Concealed
institutions*, item 63) placed at a village rung takes the `front` mode: the hidden share is 0 and no sewer exists, so
its fallback chain ends at a front — a working business on an ordinary plot. Each is a table row a village supplies, not
code.

**Layers at the village rungs (AM-13).** The village ladder's `RungProfile` rows carry `layers.islands = 'none'` (§1.1), so
II.6's island rule admits no island below TOWN whatever the prosperity or the model setting; a village request never
creates a sky allocation.

**No sewers below TOWN (item 14; II.7.1).** The village rung rows carry `layers.sewers.existence = 'never'`: a village
registers neither the network stage nor the underground stage, a request's `toggles.sewers` is reported as not applicable
in `requestedVsBuilt`, and its drainage is gutters and pits — the class table's `drain` column is read by nothing there.
**No derived underground below TOWN (items 65 and 66; II.7.5, II.7.6).** The village rows carry
`layers.undercity.existence = 'never'` (II.7.5) and derive no catacomb, cavern, quarry, vaults or buried-town system (every
system row of II.7.6 is gated to TOWN and above), so a village's underground layer is empty unless a user asks for an
access: `addUndergroundAccess` (§7.3 item 9's closure, item 66) then digs a private passage of kind `dug` from the
building's basement to the most plausible outlet (II.7.6's closure pieces) — the one underground a village can hold,
which makes the layer present without a network (sewers stay `never`). Nothing in II.7 stands in a village's way: every
hook is a rung row or a field it leaves empty.

=== APPEND TO SECTION ### 4.7 S9 Corridors · S10a Block allocation · S10 Plots · S10b Placement · S11 Site plans and footprints — the plot model ===

**Concealed institutions — a front and a hidden function (item 63; owner: "some criminal like institutions or buildings
have to be clandestine meaning there are certain lots and assignments that have two functions. A front which can be
anything and a second function").** A clandestine institution does not parade itself: its building stands on the map
like any other, and what it is, is withheld. This paragraph is the one statement of how such an institution is resolved,
placed and built; the records are §2.6–§2.7's, the knowledge filter §9.2's and the underground allocations II.7's.
1. **The value and its resolution (J-A63.41).** An institution, a use and an assignment carry
   `concealment: 'none'|'front'|'hidden'|'underground'` (`Institution.concealment`, `Use.concealment`, §2.7;
   `Assignment.concealment` with an optional named front, `Assignment.front`, §7.7), `none` by default. It is resolved
   once, when the institution is first placed, from the first source that gives one: the dossier's fact (a mode, and
   optionally a named front); an assignment's value; the class table's default-mode weights — `BuildingClassRow.concealment`
   (§10.2), rows only for the classes our tables mark clandestine (a thieves' den, an assassins' house, a smugglers' store,
   a forbidden cult, a black market, a spy ring … our own rows), read at the plot band's row and the district kind and
   drawn on `siting` keyed by the institution's lineage (§6.1; no new concern); else `none`. The resolved mode and its
   source are stored on the concealed use; a map edit sets it by `setAttr` (§7.1) and a dossier value outranks a map
   override as it does for `knownTo` (§7.7 item 7).
2. **Feasibility and the fallback chain (J-A63.41).** A mode is feasible where its ground exists: `underground` where an
   underground allocation exists — II.7.3's sewer-front pseudo-district (S7b (6), which needs a navigable run, not only a
   network, J-A14.43) or an undercity neighbourhood (II.7.5, S7b (7)); `hidden` where the district holds a plot whose
   `exposure` is `hidden` (item 30, §4.6); `front` where a cover of the cover table has a plot whose hard rows pass. The
   chain is fixed — `underground` → `front` → `hidden`; `hidden` → `front`; `front` → `hidden` — and where none is
   feasible the front's closest options are F-SITING's (§5.2): a clandestine institution is never placed openly by a
   fallback and never dropped, and every step down the chain is reported with its reason in `requestedVsBuilt`, never
   silent (J-A16.43).
3. **FRONT — one item, two uses (J-A63.42).** The front is a cover class drawn from the cover table
   (`RosterTables.covers`, §10.2: for each concealed class, weighted plausible covers per band — a tavern, a funeral
   parlour, a fencing hall, an apothecary, a warehouse, a bathhouse, a tailor … our own rows; several per class, since a
   front "can be anything") on `siting` keyed by the concealed use's lineage, unless the dossier or an assignment names one;
   a named front is honoured where its hard rows pass, else F-SITING's closest options are offered for it — never a silent
   substitute. S10b's solver places the pair as ONE item (J-A16.41): its hard rows are the FRONT's, so the front is
   plausible where it stands (a tavern on a street, a warehouse at the docks); its soft rows are the true class's relation
   rows and supply edges (near its targets and markets, the waterfront, alleys, passages, an outfall) plus an `exposure` row
   preferring `alley`, `court` and `hidden` plots, at the true class's weights; both classes' band rows apply, so
   prosperity shapes which fronts and which districts are used. The placed building then carries two `Use` records: the
   FRONT's — `Building.use`, a working business with its households, opening hours, label and description — and the
   CONCEALED one (`Use.concealment`; `Use.front` names the front's use; listed in `Building.concealed`, §2.6–§2.7), whose
   `knownTo` is `secret` by default (item 30's values).
4. **S11 builds the front (J-A63.42).** S11 reads the FRONT's designation template row at the plot's band: class,
   footprint, site plan, labels and public room programme are the front's, so at every public zoom the building reads as
   the front. The concealed use adds three things only, each flagged `concealed` and carrying the concealed use's
   knowledge: (a) a **concealed programme** — the concealed class's room-programme rows marked `concealed` (§10.2's
   `RoomRuleRow.concealed`: back rooms, a strongroom, a cellar room, a hidden stair), which the plan rung (§2.6, stage 3)
   places away from the main entrance and off the public circulation hub, reached only through a service, yard or
   concealed door (`Room.concealed`, §2.6); (b) a **concealed entrance** (`Entrance.concealed`, §2.6) — where the plot has
   an access edge beyond its frontage onto an alley or a passage (§2.6's entrance rule 2's condition), `deriveEntrances`
   adds one `service` or `yard` door there on `siteplan.entrance`, flagged, never the `main` door; with no such edge there
   is none and the concealed programme is reached from the front's service side; (c) a **way down** — the basement decision
   (§2.6) reads the higher of the front's and the concealed class's `cellar.prob` at the band (the terrain gate unchanged),
   and over an underground element within reach the building's access lottery takes the concealed class's
   `accessMultiplier` (II.7.3's *Basement accesses*, item 64).
5. **HIDDEN.** The institution goes to a plot whose `exposure` is `hidden` (item 30's plots behind a passage or in a back
   court) — the `exposure` row is hard for this mode — with a front drawn by its class row's `hiddenWithFront` share on
   `siting` (a back-court workshop that also sells something), or bare, its building then of its true class with
   `knownTo: 'secret'`.
6. **UNDERGROUND.** The institution joins an underground allocation: a sewer-front dwelling of II.7.3 (U1–U3; the
   allocation's (b)) or, where one exists, a building of the undercity (II.7.5; its clandestine institutions prefer it),
   there with a front by the same `hiddenWithFront` share; its `knownTo` is `secret`.
7. **Mutation (items 17 and 18; J-A63.43).** A change of the front's designation — an `assign`, the front use's closing,
   a rung-3 rebuild — runs S11's designation mutator on the front: the concealed use persists, its concealed door is
   re-derived with the new entrance set where its access edge survives, and its concealed programme is re-fitted when the
   plan rung, marked `stale`, is next viewed. A relocation of the concealed use (item 17's use step; a dossier event) moves
   it by S10b's request like any use and leaves the front standing as an ordinary business: the building's
   `concealed` list loses it, its concealed door stays as an ordinary `service` door (the flag cleared) and its concealed
   rooms return to the front's programme at the next plan re-cut. The front and the concealed use are two records, so
   either can close without the other.
8. **The dossier stays the authority (items 20 and 22).** The dossier says that the institution exists and is
   clandestine; the map places it and never reveals it on its own. An exposure — a raid, a discovery — arrives as a dossier
   change and is applied as a least-disruption mutation (§7.7): the concealed use may relocate with its mode re-resolved,
   the front close, a passage be sealed (item 30). A map delete of such a place relocates it by `rejectSite` (§7.7 item 3),
   as for any dossier-backed element.
9. **Knowledge, not geometry.** The building's mass and every public part are always on the map (J-A30.83); the concealed
   use, its concealed rooms, its concealed door and its way down carry the concealed use's `knownTo`, so §9.2's filter
   draws them only for a view whose knowledge admits the concealed use (the rendering part's refinement of J-A30.83 for
   concealed parts), and every export and the reader withhold them (§11.1, §11.2) — the public sees the front's label,
   description and rows.
10. **Emulation (item 23; J-A63.44).** No reference has concealment: the non-`none` weights of the `concealment` column and
    the cover table are `extension` rows scaled by `placement.extensionWeight`, so the parity presets (weight 0) resolve
    every class to `none` and place every institution openly; with no clandestine class in the roster nothing here runs.
§5.3 holds the check rows (every clandestine institution in an allowed mode or a reported fallback; concealed rooms
reached only from a concealed door or the front's service side; the `underground` mode never without an underground
allocation) and §13.2's T63 group the bars.

=== REPLACE ### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values) ===
### 10.2 Roster (data-driven, replaceable; sequential and prefix-stable; our values)

```ts
interface RosterTables { classes: BuildingClassRow[]; districtKinds: DistrictKindRow[] /* the relation templates of the neighbourhood kinds (item 16 (a)) */;
  resources: ResourceRow[] /* {id, kind: 'site'|'made'|'import'} — the resource ids the supply edges name (grain, malt, hides, import …), our own rows */;
  institutions: InstitutionRow[]; government: GovernmentRow[] /* offices and seat classes per government kind */; religions: ReligionRow[];
  households: HouseholdRow[] /* size distributions by class */; professions: ProfessionRow[]; farm: FarmTable /* §4.9 */;
  roomProgram: RoomProgramRow[] /* item 28: the room programmes, below */; basementGate: BasementGateRow /* item 29 (b): the basement's terrain-gate values, one row, below */;
  covers: CoverRow[] /* item 63: the fronts a concealed class may take, below */;
  classMix: ClassMixRow[] /* item 71: the class mix inside a band, with its prestige rows */; clusters: ClusterRow[]; tenure: TenureRow[] /* item 70: the informal cluster's rows and the tenure defaults by band */;
  quarterIdentities: QuarterIdentityRow[]; powerLinks: PowerLinkRow[]; sectorLinks: SectorLinkRow[]; bandRanges: BandRangeRow[] /* item 72: a neighbourhood's identities, dials and band range */;
  sectors: SectorRow[] /* item 78: the sector set the economy slice is keyed by (§7.7 item 2) */; portRows: PortRows /* item 88: the staged rows the dossier port will fill — schema-complete, empty, extension */;
  names: NamePack; provenance: Provenance }   // the row types of items 70–72, 78, 79, 82 and 88 are declared, with their default rows, in the paragraphs that close this subsection
interface BuildingClassRow { id: string; use: string; perCapita: [number, number]; perOther?: { class: string; ratio: number }; min: number; max: number; firstAtPopulation: number;
  requires: ('water'|'coast'|'route'|'farmland'|'ore'|'stone'|'timber'|'fish'|'clay')[] /* the site-resource gates S2 reads from SiteResources (§4.2) */;
  outside: boolean; liveIn: boolean; cluster?: string; noxious: boolean; lifestyleBand: string; shopProb: number; priority: number;
  relations: RelationRule[] /* the class's relation template (item 16 (a)) */; produces: string[] /* resource ids */; supply: SupplyEdge[] /* its supply chain (item 16 (b)) */;
  template: DesignationTemplateRow[] /* one row per band: the designation template S11 reads (item 19; §4.7) */; useRules: UseRuleRow /* catchment, inertia and closing rows (item 17; §4.11) */;
  secondaryChance?: number /* market rows: the TOWN chance of a secondary market (§4.2 S2) */; salvageM3: Record<string, number> /* item 8: the material yield and debit §4.11's ledger reads (below) */;
  drain: 'none'|'pit'|'channel'; underground: 'never'|'allowed'|'preferred'; undercity: 'never'|'allowed'|'preferred' /* item 65 */;
  undergroundAccess: { prob: Record<string, number> /* item 64: per band row, interpolated along the value — the chance that a basement within reach of an underground element holds an access (II.7.3) */ } /* II.7's columns (below) */;
  concealment?: ConcealmentRow[] /* item 63: the default-mode weights of a class our tables mark clandestine; absent: never concealed unless the dossier or an assignment says so (below) */;
  distribution: 'district-defining'|'dispersed'|'singular'; significance: number; powers: { kind: string; weight: number }[]; sectors: { sector: string; weight: number }[] /* items 72, 78 and 79: how the class spreads over the town, its weight in a neighbourhood's reading, its association with the power kinds and the sectors (weights summing to 1 per column) — read by §4.5's neighbourhood character (below) */;
  subLocations: SubLocationRow[]; openingHours: OpeningRow[]; tags: string[] }
interface RelationRule {   // one row of a class's or a neighbourhood kind's relation template; read by the placement solver (§4.7 S10a, S10b) and, for district kinds, by §4.5's typing scorer
  kind: 'adjacent'|'near'|'far'|'sameStreet'|'clustered'|'avoid'                                  // to another class, cluster tag or feature class
      | 'upwind'|'downwind'|'upstream'|'downstream'|'nearWater'|'highGround'|'lowGround'|'dry'   // environmental: ContextVector.upwind, upstream, terrainClass, dist.water (§2.5)
      | 'frontage'|'nearGate'|'nearMarket'|'nearHarbour'|'nearCentre'|'extramural'|'intramural'  // access: roadClass, dist.* (the nearest of N markets, item 24)
      | 'plotArea'|'plotShape'|'frontageM'                                                        // capacity: areaM2, shape, frontageM, against the template's size budget
      | 'band'|'exposure';                                                                        // the prosperity band; Plot.exposure and knownTo (item 30)
  to?: string; withinM?: number; beyondM?: number; min?: number; max?: number; values?: string[]; falloff?: 'step'|'linear'|'smoothstep';
  strength: 'hard'|'soft'; weight: number /* soft rows: the score at full satisfaction; hard rows: 0 */; extension: boolean /* true: a row the references lack, scaled by placement.extensionWeight (§4.7 S10b) */ }
interface SupplyEdge { resource: string; maxDistanceM: number; mode: 'street'|'river'|'sea'|'road'; strength: 'hard'|'soft'; weight: number;
  perConsumers: number /* S2's need propagation: one provider per this many consumers (§4.2 S2) */; substitutes?: string[] }
interface DesignationTemplateRow {   // one per band of §4.5's band set; continuous columns interpolate along the prosperity value, discrete ones switch at the cut (§4.7 S11)
  band: string; specialisation?: string /* discrete: the designation's variant in this band; drives the use's specialisation, its description and its room programme (item 28) */;
  plotAreaM2: [number, number] /* the size budget a join is asked for (§4.7 S10 (7)) */; footprintM2: [number, number, number] /* p10, p50, p90 */; floors: [number, number]; heights: string /* the class heights row */;
  structures: { role: string; count: [number, number]; footprintShare: number; required: boolean; houses: boolean /* item 28 (f): a residential slot — its building houses households by §4.7's generation fill; a live-in class's (BuildingClassRow.liveIn) main slot is one whatever this cell holds (its flag read as true), unless §4.7's fill finds it no household (BuildingSlot.unhoused, §2.5) — its building houses the live-in household, Building.dwelling (§4.7 S10b) — so the two columns never disagree */ }[] /* the slot list: main building, workshop, forge, yard, court, stables, store, dwelling, journeymen's rooms … data-defined roles */;
  arrangement: 'row'|'compound'|'detached'|'hovel'|'tents'|'cluster' /* item 70: an informal cluster's many structures on one plot (§4.7 S11) */|'institution'; coverage: number; densityShift: number;
  jitter: { maxM: number; minM: number } /* m — item 43: the front-line recession's cap and floor (§4.7 S11's law); maxM interpolated along the value; minM's declared range ≥ attractCm + 1 cm; defaults maxM 0.4 / 0.7 / 1.0 / 1.5 m by band and minM 0.3 m, each an option extension over MFCG (the MFCG preset's values are §7.6's); maxM 0 in the institution, tents and cluster rows, unmarked */; separation: 'party_wall'|'slot'|'passage';
  frontage: 'none'|'lean_to'|'stall'|'shopfront'|'arcade'|'gate'|'wall' /* discrete: the main slot's frontage treatment; the entrance set is §2.6's */;
  yard: { part: string; share: number }[] /* court, garden, formal_garden, forecourt, orchard, midden, pen … (§2.5 YardPart) */; bounds: 'none'|'fence'|'hedge'|'wall'|'railing' /* the compound rows' 'wall' (prosperous, rich) is an extension (option) the parity presets set to 'fence' (item 44; §4.7 S11) */;
  programme: string /* item 28: the key of a RoomProgramRow (below), which the plan rung of §2.6 reads */; underSize: 'compact'|'refuse' /* what the mutator does when the plot cannot be joined to the size budget (§4.7 S11) */;
  replaceability: 'immediate'|'short'|'long'|'ruin_only' /* item 31: read at the plot's builtBand row — how soon §4.11's wealth ladder may replace the stock */;
  works?: string /* item 67: the key of the WorksTable row (§4.11) whose stages and durations this designation's builds, demolitions, repairs and decays read; absent: the class's default row */;
  households: { built: number; max: number } /* item 31: the households the design is built for, and the most it holds when let out (rung 1's relet) */;
  entrances: { side: number; rear: number; service: number; capSide: number; capRear: number; yardDoorMinM2: number } /* item 29: the probability of a side, rear or service door given an access edge beyond the frontage, their caps, and the yard or court area that recommends a yard door — §2.6's entrance rules read them */;
  cellar: { prob: number; kinds: { full: number; half: number; walkout: number }; slopeCm: Cm; rockCost: number; depthCm: Cm /* default 220: a full cellar's floor below the ground storey's baseCm */; insetCm: Cm /* default 60: the basement ring's inset inside the ground-storey wings */ } /* item 29 (b): the base probability §2.6's basement decision starts from, the kind weights, the fall under the footprint past which the decision turns to a half or walk-out cellar, the rock cost that lowers the probability, and the cellar's depth and inset; the terrain gate is §2.6's, its values the basementGate row below */; }
interface UseRuleRow { serviceRadiusM: number; closeShare: number; closeAfterEpochs: number; starveAfterEpochs: number; inertia: number; moveChance: number }   // §4.11's use step (item 17)
interface DistrictKindRow { kind: string; relations: RelationRule[] /* read by §4.5's typing scorer and S7b's affinity rows, and by the solver for a whole-neighbourhood assignment (§7.7) */ }
interface ConcealmentRow {   // item 63: one row of a clandestine class's default-mode weights (§4.7's Concealed institutions); our own rows, extension
  band?: string /* absent: every band; rows interpolate along the value like every band row (§4.5) */; districtKind?: string /* absent: every kind */;
  weights: { none: number; front: number; hidden: number; underground: number } /* the mode draw's weights; the non-none weights are extension, scaled by placement.extensionWeight (0 in the parity presets) */;
  hiddenWithFront: number /* the share of hidden and undercity placements that also take a front, drawn on siting */;
  accessMultiplier: number /* item 64: × the access probability of a surface building that carries this concealed use (II.7.3's Basement accesses); default 6 */ }
interface CoverRow {   // item 63: the plausible fronts of one concealed class; our own rows, extension
  trueCls: string /* the concealed class (BuildingClassRow.id) */; band?: string /* absent: every band */;
  covers: { cls: string /* a front class whose designation template has a row at the band */; weight: number }[] /* weighted, several per class: a front "can be anything" plausible */ }
```

**The sequential roster (FTG-14; J-P20).** FTG's documented *shape* (`ftg-docs-params.md` §3.3), none of its 209 types, 80
nodes, 299 professions or 323 items. A **virtual population** advances on a fixed grid of Δ = 10 people up to the rung's
maximum. At each grid point the target count of every class is a monotone step function of the virtual population —
`perCapita` or `perOther` ratios converted to per-person ratios, core versus shop pools, lifestyle-banded pools with rare
outliers (weights ours), hard `min` / `max`, **size gates** (`firstAtPopulation`), **resource gates** read from
`SiteResources` (no farmland → no farms, shops instead) — and every class below its target receives its next building, in
class-priority then class-id order. Every draw is keyed by the building's ordinal (`roster/<class>/<ordinal>`: shop or
core, lifestyle outlier), so the n-th chandler is the same chandler at any population. The run records each building's
**appearance population**; the manifest for population P is every (class, ordinal) that appeared at or below P. Hence
manifest(P₂) ⊇ manifest(P₁) whenever P₂ > P₁ (property test on 1 000 seeds, §13.2), an epoch's delta demand is exactly the
suffix, a population fall selects the suffix in reverse order, negative deltas arise only from declared circumstance
events, and §7.8's population control is monotone by construction. **Mode (COV-FTG-B06):** `rosterMode:
'minimiseUnemployment'` (default: at each grid point, when the unemployed share of the virtual population exceeds a table
threshold, the workplace class with the largest weighted job deficit receives one extra building) or `'matchRatios'` (the
configured ratios only, FTG's alternative); both are grid-sequential, so both are prefix-stable.

**Output:** demand per class with area / frontage requirement classes, district affinities, cluster tags, live-in flags,
outside flags and wealth bands; the **town-level character** shifts the ratios — read from the economy slice's sector
shares (`circumstances.economy`, §7.7 item 2) through each class's `sectors` weights, so one input drives both the roster
and the neighbourhoods' economy dial (items 72 and 78; an even mix, the neutral default, shifts nothing). **Government (COV-FTG-B13):** the blueprint's `government` circumstance selects a `GovernmentRow` whose
offices force seats — a crown seat a royal castle or palace, a seigneurial lordship a lord's castle or keep, an
ecclesiastical lordship a bishop's palace beside the cathedral, a chartered commune a town hall and guild halls, a merchant
oligarchy a merchants' hall — plus a military share (guard posts per 1 000 inhabitants; barracks at CITY and above near the
castle or the gates); the castle toggle `auto` reads it. **Religion (COV-FTG-B14):** religions come from `ReligionRow`s with
worshipper shares (shifted by the town-level character), a practice share and clergy per 1 000; temples per religion are
proportional to its practising worshippers; each religion has a faction (§2.7). S7b then allocates the demand and S10b
places it (§4.5, §4.7); where capacity is short, placement's reconcile and F-SITING's ladder decide, and surplus capacity is
typed as yards, greens or vacant plots (§4.7 S10b); population is honoured within tolerance and reported (O7 a, e).

**Relation templates, supply edges, designation templates and use rules (items 16, 17 and 19; rows are data, §7.6,
re-signed by the corpus phase, §13.9).** A class's `relations` are the rows the placement solver filters and scores by
(§4.7 S10a, S10b); its `produces` and `supply` are the resource and dependency graph S2's need propagation walks (§4.2 S2)
and the solver measures distance on; a neighbourhood kind's rows serve §4.5's typing scorer and a whole-neighbourhood
assignment (§7.7). Default rows are the references' placement rules where a reference has one and soft tendencies where it
has none (item 23; `extension: true`, scaled by §4.7 S10b's `placement.extensionWeight`) — for instance a tannery
`downstream` hard, `nearWater` hard and `extramural` soft, with supply `hides` 800 m by street and `bark` 2 000 m by road;
a brewery with supply `malt` 1 000 m by street (hard) and `nearWater` soft; a maltings with supply `grain` 3 000 m by
road; a bakery with supply `flour` 600 m by street; a warehouse `nearHarbour` 150 m hard with supply `import` by sea; an
inn `frontage` primary or through hard and `nearGate` 150 m soft; a market hall `nearMarket` 60 m hard; a trade group's
shops `sameStreet` and `clustered` soft; a mill `nearWater` hard with a fall (its outside row, §4.9). The `template` rows
are S11's (§4.7); the `useRules` are §4.11's use step's; the `produces` of the outside classes — grain, timber, fuel,
stone, ore, fish — are the hinterland's food, fuel and timber rows (§4.9, item 26). No row of this table names a
material: a material is a rendering attribute (§2.6), and §4.11's `WorksTable` alone reads it, for durations — time,
never shape (item 67).

**Markets, wealth bands and the countryside's rows (items 24, 26 and 27).** The `market` class row demands the markets by
size — `min` 1 (the principal), `firstAtPopulation` 10 000 and `perCapita` one per 12 000 inhabitants for the secondaries,
`secondaryChance` 0.15 at TOWN (our own rows; §4.2 S2; §13.5's anchors are MFCG's secondary plazas and FTG's two market
squares) — and the market hall's and the market trades' rows cite the market they serve by rank (`nearMarket`, the
principal by default). `HouseholdRow.band` and every class row's `lifestyleBand` name a band of §4.5's band set; the
household shares' default weights are FTG's captured lifestyle distribution (§4.5's table; provenance `ref:FTG lifestyle
distribution`), shifted by the town-level character, and every band-keyed row set of this table may omit bands, which
interpolate (§4.5, item 27). The farm table's fuel and timber rows, the farm modes and the outside classes' seeding rows
are §4.9's.

**Under a fall (AM-8).** A population fall selects the suffix in reverse ordinal order, as above, and its households leave
by §4.11's step (c) — a `relet` down, `vacate` at a building's last household — and it never removes a building by
arithmetic: the standing stock follows with §4.11's dwell lag, and a later rise reoccupies the same suffix
first. `BuildingClassRow.salvageM3` is the class's material yield when robbed, cleared or dismantled, and the debit of a
build or repair of that class — read by §4.11's ledger.

**Replaceability, households, entrances, cellars and the room programme (items 28, 29 and 31; J-A28.43, J-A29.41).**
`DesignationTemplateRow` — one per band of each `BuildingClassRow` — carries them in its `replaceability`, `households`,
`entrances` and `cellar` columns (above); `RosterTables.roomProgram` holds the room programmes and
`RosterTables.basementGate` the basement's terrain-gate values:

```ts
interface RoomProgramRow { for: { cls: BuildingClass; band: string; use?: string; era?: string } /* the designation and its band (item 19's rows) */; rooms: RoomRuleRow[] /* the programme */;
  pattern: Record<'basement'|'ground'|'upper'|'top', { weight: number; pattern: LayoutPattern }[]> /* §2.6's layout patterns, weighted per storey class */; circulation: { num: number; den: number } /* integers: the share num/den of a storey given to halls and corridors — §2.6's capacity reads it exactly */;
  stair: { placement: 'by_entrance'|'rear'|'centre'|'tower'; kind: StairCore['kind'] } /* the stair core §2.6 places before any cut */; basementAccess: 'core'|'trapdoor' /* the access §2.6's basement decision derives into Basement.access for a cellar that is no walk-out, read at the plot's builtBand — never external, which only a walk-out's fall derives; the plan rung reads Basement.access */; furnish: { density: number; wallBias: number } /* item 28's abstract furniture by role */ }
interface RoomRuleRow { role: RoomRole /* §2.6: data-defined */; scope: 'unit'|'shared'|'service'|'circulation' /* item 28 (f): a room of one household's dwelling unit, one the households share (a kitchen, a common room), the use's or the staff's rooms (a forge, a shop, a store, a staff chamber), or a corridor or stair hall — §2.6's interior ladder says which scopes a band's row allows */; count: { n: number; law: 'const'|'perHousehold'|'perStorey'|'perCapacity'|'perSubLocation' /* per household: item 31's relet; per capacity: a sub-location's */; capacity?: string; tag?: string };
  area: [number, number, number] /* m²: min, target, max */; storey: 'any'|'ground'|'upper'|'top'|'basement' /* the storey rule */; exterior: 'none'|'some'|'max' /* windows */; door: 'door'|'arch'|'open' /* the opening kind */; maxDoors?: number;
  adjacency: { kind: 'hard'|'soft'; to: 'core'|'entrance:main'|'entrance:yard'|RoomRole; via?: 'direct'|'corridor'|'under' }[]; priority: 'hard'|'soft'; hearth?: boolean;
  concealed?: boolean /* item 63: a room of a concealed use's programme — placed by §2.6's plan rung away from the main entrance and off the public circulation hub, reached only through a service, yard or concealed door (§4.7's Concealed institutions) */;
  furnish: { density: number; wallBias: number; glyphs: string[] } }
interface BasementGateRow {   // item 29 (b): the values §2.6's basement gate reads; one row per table version
  waterTableM: M /* default 40: within this distance of a shore the water table is the nearest water body's surface plus the freeboard */;
  freeboardCm: Cm /* default 50 */; drainageAccumCells: number /* default 100: the flowAccum at which a hydro cell is the drainage line elsewhere (§2.3; our own, calibratable) */ }
```

The **room programme** lists the rooms a building of that class, use and band must and may have — each with its
size band in m², its storey, its openings, its adjacencies and how many — a fixed number, a number per storey, one for each household of
item 31's `relet`, or a sub-location's capacity — which §2.6's plan rung writes first and then cuts the walls
to fit (item 28), so rooms are never cut before the programme is known. The programme rows follow §2.6's **interior
ladder** (item 28 (f)): the ladder's row for the occupants' band gives the cross-class structure — how many households
the shell holds, each unit's rooms, the shared rooms, the staff rooms and their size beside the owners' rooms, the
circulation form and how large the rooms may be — and a class's programme row adds what a smithy, an inn or a chapel needs; the
`programme` row is read at the occupants' band (the field band, J-A19.43) and the `households` column at the plot's
`builtBand` (the shell's capacity, §2.6), so the interior has no floor while the shell keeps its own (§4.11).
`LayoutPattern`, `StairCore` and `RoomRole` are §2.6's, the role names our own data rows (hall, chamber, solar, parlour,
kitchen, buttery, common room, cooking place, staff chamber, corridor, stair hall, forge, shop, store, undercroft,
chapel, nave, passage …). The plan rung's `plan.program` stream draws the fractional part of a count law (§6.1), as
`plot.join` draws a join (§7.7). Households per building follow the roster's households — where a dossier exists, the households that
fill its population, map facts derived from its population and circumstances (§7.7's derivation table; item 20 (h)) —
and item 17's relocation (§10.3); the `households` row and the shell's floor area bound the ladder's
`relet` through §2.6's one capacity function, which the generation fill (§4.7: S10b's placement, S11's clamped write),
`relet` and F-PLAN (§5.2) all read; with no epoch every residential building houses what §4.7's generation fill gives it — at
least one household and never above its capacity — so the static baseline is unchanged (item 23).
Every column is data with provenance, editable and calibratable (§7.6, §13.9). The entrance rows default to one street
entrance per building — the owner's rule (item 29; provenance `owner`): the FTG client of the 2026-09-25 capture sends no
door, its road-facing anchor being a night light (item 50), and MFCG 12710731's model, read in full, carries no door
record (an inference) — with side, rear and service doors as our tendencies (`extension`, 0 in the parity presets,
item 23); the cellar rows are item 29 (b)'s class rows, whose extensions §2.6's emulation note names; the reference's
basement share is a descriptive baseline only (§13.5).

**The `drain`, `underground`, `undercity` and `undergroundAccess` columns (II.7; items 12, 14, 64 and 65).**
`BuildingClassRow.drain` is the class's drainage need: `none` (tents, sheds, hovels), `pit` (households and most
workplaces: a cess pit or the street gutter of their own), `channel` (the trades and institutions that discharge foul
water: tanners, dyers, fullers, brewers, slaughterhouses, baths, hospitals, monasteries); `underground` names which
classes a sewer-front underground neighbourhood may hold or prefers (II.7.3); `undercity` names which classes the
undercity may hold or prefers (II.7.5) — `preferred` for its microcosm: the black market, a fence's hall, a criminal
guild's seat, a tavern, a forbidden shrine, a fighting pit, a healer; `allowed` for the dwellings of the squalid and poor
bands and the small trades that serve them; `never` for the rest; and `undergroundAccess.prob` is, per band row
interpolated along the value, the chance that a surface building of the class whose basement reaches an underground
element holds an access down to it (II.7.3's *Basement accesses*) — higher for breweries, bathhouses, warehouses and inns
(0.15–0.30 by band), low for houses (0.02, raised with the plot's age by II.7.3's age term), 0 for a barracks, a
courthouse and a temple; a user adds an access to any building by item 66's edit (§7.3 item 9). Which plots a network
connects, what a class does when none exists, and how the underground rows are used are II.7.1's, II.7.3's and II.7.5's
rules; the columns are data like every other, our own rows, and every non-`never`, non-zero cell is an `extension`
(no reference has an underground).

**The `concealment` column and the cover table (item 63).** `BuildingClassRow.concealment` gives, for a class our tables
mark clandestine — a thieves' den, an assassins' house, a smugglers' store, a forbidden cult, a black market, a spy ring —
its default-mode weights per band and district kind (`ConcealmentRow`: `front`, `hidden` and `underground` weighted
against `none`; the default rows weight `front` highest in every band, `hidden` next in the poor and squalid bands,
`underground` where an underground allocation may exist), the share of hidden and undercity placements that also take a
front, and the multiplier on the building's access lottery; `RosterTables.covers` gives each concealed class its weighted
plausible fronts per band (`CoverRow`: an assassins' house behind a tavern, a fencing hall or an apothecary; a smugglers'
store behind a warehouse or a chandler's; a thieves' den behind a tavern, a pawnshop or a bathhouse; a forbidden cult
behind an almshouse, a bathhouse or a bookbinder's …), and `RoomRuleRow.concealed` marks the rooms of a concealed
programme. Every row is our own and an `extension`, so the parity presets conceal nothing; how they are read is §4.7's
*Concealed institutions*.

=== REPLACE ## II.6 The staged layers — floating islands and sewers: the hooks the base carries now ===
## II.6 The staged layers — floating islands and sewers: the hooks the base carries now

*In plain words.* The owner stages both layers after the city is mastered; whether a layer exists is a
model rule (the island rule below; II.7.1's tier row), and its layer toggle shows it. Nothing here is built in the base, but
every record and interface they need exists now, so adding them later is a registration, not a redesign.

**Floating islands (AM-2; DEF-7).** A settlement has 0–3 islands by the island rule below — with the model setting on,
the rung, the count slots and the supply decide them, and the view toggle only shows them. **Why an island exists** is one of two reasons, by
rule or by assignment: `prosperity` — the island carries a very prosperous neighbourhood or set of neighbourhoods: by rule — where
the model setting `recipe.layers.islands` is on, the rung admits islands and a count slot opens (the island rule below,
(1)–(4)) — S7b (5) allocates the roster's richest demand to that slot's sky pseudo-district under the supply law (5), so
the population stays whole; `institution` — the island carries one
unique institution chosen from an `IslandInstitution` row (a palace overlooking the land, a cathedral, a prison isolating
criminals) or named by an assignment. **What it is:** a `SkyIsland` (§2.7) with an organic oval outline from §4.2's
routine (an outline template of §4.2 S1 (2)), an altitude from the supply law (5), and optionally its own terrain from S1 run on
the sky plat with an *echo* request — its relief `echo` or `own`, and a conjured river that takes the ground river's bearing
and width law; its districts are laid by the ordinary pipeline through a `NeighbourhoodRequest` with `layer: 'sky'` (no
portals, no roads in or out; II.1 (5)). **Where it floats:** a placement rule reads the ground plan — over water, fields or
outskirts by default, over the built core only by assignment (`SkyIsland.placement`, §2.7); the occlusion mode (opaque,
ghost the covered ground, offset view) is a rendering choice (§8.4). **What it does not do:** it has no relation to the
underground layer; it exports as its own layer (§11). **Its light and shadow (item 68).** In §8.4's lighting model an
island casts shadow from above — an occluder slab with a top and an underside, so its shadow falls from its underside onto
whatever lies below and the ground under it is shaded from above yet lit from the side; its magical lights are the sky
rows of §4.7's light table (`LightRule`, context `arena` sky), their strength scaled by the island's supply
`h(S_carried)` (below) — magic is the resource that keeps it aloft, so a waning island's lights fade with it. Its hook interfaces, `IslandRule` and `SkyStrategy`, have one declaration each, after the island rule below.

**Sewers (DEF-7).** A `SewerStrategy` registers as a stage after S11 (declared inputs: ways with `flowToward`, the drainage
raster and outfalls of §2.3, plots and buildings with their class table's `drain` column, the underground plat; output:
`Tunnel` records, §2.7). Its rule families are data: `follow-streets` (mains under the ways, falling with `flowToward` to the
outfalls), `drainage-lines` (along the natural drainage), `mixed`; which buildings need drains is the class table's column;
two presets — `historical` (restrained: open gutters, a few culverted mains, cess pits by class) and `navigable` (the fantasy
preset: large vaulted mains with chambers). It renders through the ground by §8.4's cut-away or overlay and exports as the
underground layer.

```ts
interface SewerStrategy { derive(doc: Document, rules: { family: 'follow-streets'|'drainage-lines'|'mixed'; preset: 'historical'|'navigable' }, ctx: StageContext, k: Kernel): KernelResult<Tunnel[]> }
```

**The island rule — existence, count and the supply law (owner: "Floating islands are also a product of prosperity …
magic … a resource that needs to constantly be supplied"; "limited only to cities and metropolises"; "not all cities or
Metropolis have floating islands"; AM-10, AM-13, AM-15).** One rule decides whether a settlement has islands, how many and
how large; the toggle only shows them. Its rows are band rows of the family that coverage, plot granularity and greenery
belong to (§4.7, §4.9): they interpolate along the prosperity value and read the same field (§4.5).
1. **Two settings, not one.** `recipe.layers.islands ∈ {'off', 'on'}` is a MODEL setting — off by default, the named
   fantasy toggle of D-3, so the realism base has no island and its ground model is byte-identical to the realism
   golden; changing it is an `adjust` of the recipe that re-derives from S7b (§7.6, §7.7; its control row is §7.8's).
   The sky layer's `LayerSpec.visible` (§8.4) is the VIEW toggle the owner speaks of: it shows the islands a settlement
   has and creates none; a hidden island still exists and still carries its households, and hiding or showing the
   layer leaves the model digest unchanged (J-A15.41).
2. **The gate — rung.** Islands are possible only where the rung's row allows them: `RungProfile.layers.islands` (§1.1)
   is `none` at TOWN and at every village rung (PART III) and `possible` at CITY and METROPOLIS. The rung is the one the
   request's population chooses at generation and, in an epoch, the one the epoch's population target chooses (§4.11),
   so a settlement that leaves the CITY band can no longer sustain islands and one that enters it may gain them
   (J-A13.41).
3. **The supply.** Magic is a supplied resource, so an island's existence and size are functions of two prosperity values
   read from §4.5's field: `S_town`, the area-weighted mean of the prosperity value over the settlement's built land (one
   scalar per town, recomputed per epoch), and `S_carried`, the mean band value of the households the island carries
   (S7b (5) fills it from the richest band down, so `S_carried` is high where the town has a rich band and modest where it
   has none). The supply function `h(v)` is a band row per rung interpolated along the value: 0 up to the threshold τ —
   the lower cut that the town's own `FieldBands` record for the `thresholdCut` band, the prosperous band by default —
   rising to 1 at the rich band's top. No island exists where `h(S_town) = 0`, the owner's "if there is no prosperity, there is
   no floating islands", and none is carried where `h(S_carried) = 0`. An `institution` island reads the same gate: it
   exists only where `h(S_town) > 0`, its `S_carried` being its institution's requirement band (J-A10.41).
4. **The count.** How many islands the settlement has, 0–3, is drawn once per town on the `island.place` stream (§6.1),
   before any allocation, from three ordered slots: slot k opens with probability `chance_k · h(S_town)` and only if slot
   k − 1 opened (defaults 0.6 for the first slot, 0.5 for the second and 0.35 for the third), so a poor city has none, a
   rich one may have none or several, and the count depends on the seed and on prosperity, never on the toggle
   (J-A15.42). An epoch re-draws the slots
   with the epoch component, each slot at the per-year rate `redrawPerYear` (default 0.1, our own) converted to the
   epoch's span as 1 − (1 − `redrawPerYear`)^years, the power by `dmath.pow` (§6.5 (3); §4.11's per-year rule under the weekly clock, item 67; J-A67.40), so
   a weekly epoch re-decides a slot no more often per year than a decade-long one: a slot that opens raises a new island
   only where the supply admits one (§4.11's `raiseIsland`), and a slot that closes is read by the decline ladder, never
   as an instant removal.
5. **Size and altitude.** For an open slot the SUPPORTED AREA is `A = areaHaMax(rung) · h(S_carried) · h(S_town)` and the
   altitude `elevationCm = E_min + (E_max − E_min) · h(S_town)` — area from both prosperities, altitude from the city's
   alone: a rich neighbourhood in a poor city floats low and small, a rich one in a rich city high and large (J-A10.43).
   S7b (5) fills the island's allocation from the richest band down until the plot land of `A` (× the dense core's plot
   share, §4.2 S2) is used or three districts' worth of households are allocated, recomputing `S_carried` and `A` as it
   adds — `A` falls as poorer households join, so the fill converges — and makes no allocation for a slot whose `A` is 0.
   `SkyStrategy` then sizes each outline to its allocation's area and floats it at its altitude (below).
6. **Over epochs** (§4.11): the supply is re-evaluated each epoch; an island whose `A` shrinks by more than the
   hysteresis (0.05 of its area) is resized, one whose `h(S_town)` or `h(S_carried)` falls to 0 wanes, settles and falls,
   and regrowth re-floats a settled island before raising a new one — the program's proposed response, adopted as
   conversion kinds and vetoable (J-A10.42). An island's lifecycle state is `SkyIsland.state` (§2.7).
7. **Editable.** The count, each island's area and altitude and its state are attributes under `setAttr` and `lock`
   (§7.1, §7.2); `resizeIsland`, `settleIsland`, `fallIsland`, `refloatIsland` and `raiseIsland` are `convert` events a
   user may apply by hand; every draw is on `island.place`, so an edited island survives regeneration by §6.3's rules.
8. **Emulation note.** No reference has islands: the rule is our extension, and with the model setting off nothing of it
   runs.

```ts
interface IslandRule {                      // one row per rung that admits islands; read by S7b (5) and by SkyStrategy; a rule table (§7.6)
  rung: 'CITY'|'METROPOLIS'; chance: [number, number, number] /* the three ordered slots, each × h(S_town) */;
  thresholdCut: 'prosperous'|'rich' /* τ = the lower cut the town's FieldBands give this band */; supply: { band: string; h: number }[] /* h(v) per band row, interpolated along the value */;
  areaHaMax: number; elevationCmBand: [Cm, Cm]; placement: ('water'|'fields'|'outskirts')[]; terrain: 'none'|'echo'|'own';
  institutions: IslandInstitution[] /* { kind, requirementBand, areaHa }: the unique-institution rows a slot may carry by rule or by assignment */;
  hysteresis: number /* share of area; default 0.05 */; dwellYears: [number, number] /* waning → settled, settled → fallen (§4.11's dwell bands) */;
  redrawPerYear: number /* item 67: the per-year rate at which an epoch re-draws a slot, applied as 1 − (1 − r)^years over the epoch's span (4); default 0.1 */ }
interface SkyStrategy { place(doc: Document, rule: IslandRule, allocations: Allocation[] /* S7b (5)'s sky allocations: the open slots with A > 0, each with its supported area and altitude */, ctx: StageContext, k: Kernel): KernelResult<SkyIsland[]> }
// a Stage registered after S7b by declared I/O: inputs the sky allocations and the ground plan; outputs the islands (outline sized to the
// allocation's area, placement by rule), their arenas and their districts, which run the ordinary pipeline through a NeighbourhoodRequest
```

**The underground fades like the walls (owner: "Sewer systems and the underground like the walls fade slowly, rather some
tunnels simply cave in or become decommissioned rather than intentionally taken down by populations"; AM-11).** A tunnel's
lifecycle is a ladder like a wall's, moved only by §4.11's lottery at the underground's persistence rate — after streets
and walls, before terrain and water: the slowest fabric but the ground itself (J-A11.42) — and by hand: in use →
neglected, silted (`abandoned`) → partly caved in (`decayed`) → collapsed or decommissioned, sealed (`ruined`, with
`Tunnel.closure ∈ {'collapsed', 'sealed'}`, §2.7); the conversions `silt`, `caveIn` and `seal` act on one tunnel record,
and `reopen` undoes them. A conversion given a `stretch` first widens it, at both ends, out to the first centreline vertex at or beyond that end
whose station no underground plot's frontage straddles on either side of the tunnel (a plot's frontage read as the
interval of centreline stations its frontage edges project onto) — a vertex where the frontages break on both sides, a
junction or the tunnel's end — so that no plot fronts two records (U1, II.7.3), the widening shown by the dry run and
reported with the event's fates; it then splits the tunnel at the stretch's two ends, handing the
stretch (and, for an interior stretch, the part beyond it) to new `Tunnel` records by `retypeEdges`' `rekey` on their
`StretchRef`s (§3.4), as a cut way hands its far part to a new way (§4.11's carve), so that the stretch changes
condition alone: each part keyed by §6.3's SPLIT rule for a tunnel record, each keeping the record's attributes on its
own stretch (its invert knots, the outfall at its end, the plots and buildings whose connections meet it, its chambers
(`Tunnel.chambers`) and the access points whose vertex lies on it (`AccessPoint.under.element`, II.7.4)), the
`Frontage` records of the underground blocks along it (§2.5) split wherever one spans a stretch end, all in the one step that splits the tunnel (a record spanning both ends of an interior stretch in three parts) — each part beyond an end a new record, its kerb edges' `('frontage', id)` rows moved to it by `retypeEdges`' `rekey` (§3.4), each part's `lengthCm` its own, every part keyed by §6.3's rule for a split `Frontage` — and each re-pointed (`Frontage.way`) to the part it fronts; an `undo` restores the one tunnel record and each split `Frontage`'s one record (§7.4; J-A11.43). Each run the condition table names, and the tunnel run of II.7.3's frontage and lifecycle
rules, is one `Tunnel` record. **The condition table** — the one statement of a tunnel's condition, which §2.7's
`Tunnel`, §2.8's decline hooks and II.7.3 read:

| condition | `existence` (§2.8) | `Tunnel.closure` | `open` — may carry frontage plots (II.7.3) | reached by |
|---|---|---|---|---|
| in use | `generated`, `built`, `altered` or `converted` | — | yes | generation or a drawn tunnel; `reopen` from any other condition |
| neglected, silted | `abandoned` | — | yes | `silt` on a run in use |
| partly caved in | `decayed` | — | no | `caveIn` on a run in use or neglected |
| collapsed | `ruined` | `collapsed` | no | `caveIn` on a partly caved-in run |
| sealed (decommissioned) | `ruined` | `sealed` | no | `seal` on a run in any other condition |
| flooded — galleries and chambers of II.7.5 and II.7.6 only (item 65) | `ruined` | `flooded` | no | `flood` on an element whose floor lies below the water table (§2.6's gate values) |

The condition is this reading of `existence` and `closure`, never a second stored state (J-A11.21): it changes only by
these conversions — a hand change of a tunnel's condition is the matching `convert` event (§7.1) — and its `open` column
is what II.7.3's frontage rule and its lifecycle read. **The same table serves the whole layer (items 64 and 65).** Every
gallery and chamber of the underground layer's other systems (II.7.6) and of the undercity (II.7.5) takes this ladder,
these conversions and this table (`Gallery.closure` and `Chamber.closure`, §2.7), the `flooded` row theirs alone and
undone by `reopen` as the others are, and a chamber closes its plots as a tunnel run closes its frontage plots
(II.7.5). An **access point's state follows its element** (item 64): it reads `collapsed` while the element it
reaches is partly caved in or collapsed and `bricked` while that element is sealed — derived readings, never stored by
the conversion, so a `reopen` gives back the access's own stored state (`open`, `locked` or `bricked`, II.7.4); a link
of the connection graph (II.7.6) reads `collapsed` or `flooded` by the same rule. No epoch rule ever demolishes a tunnel: the engine's plan may not contain `demolish` on a tunnel record (a
hook test lints it), while a user's `delete` stays available, because everything is editable (J-A11.41). A closed tunnel
persists as an underground ruin — its record live at its address, its centreline and invert kept, drawn by §8.2's silted,
caved-in and sealed classes through the underground layer's cut-away (§8.4) — and later growth reopens it (`reopen`;
regrowth-first: a closed tunnel on the network's line is reopened before a new one is dug) or reuses it: AM-12's
underground plots front a reopened tunnel as they front any navigable one. Decline follows the surface's drivers and lag: a
tunnel's exposure is the exposure of the ground it runs under, and its dwell bands are two steps slower than a building's
(§4.11's table). Emulation note: no reference has sewers or time; with the network absent nothing of it runs.

**Where the rest of the sewer layer is stated (items 12, 14, 64 and 65).** Existence by tier and the toggle-as-visibility
rule, the `drain` connection rule, the network stage's gate, its levels on the underground arena, the tunnel profile with
its wall thickness, depth and outfalls, the underground neighbourhoods along navigable tunnels and the basement accesses
are II.7.1–II.7.4's; the undercity is II.7.5's; the underground layer's other systems, their depths, the connection graph
and the pieces an access edit generates are II.7.6's; this section keeps the islands, the network stage's declaration,
its rule families and presets, and the lifecycle of every underground element.

=== INSERT AFTER ## II.7 The sewer layer — existence by tier, the network stage, the underground neighbourhoods (staged, with its base hooks) ===

*The underground layer as a whole (owner, 2026-09-27: "the central piece is a derived sewer system … catacombs
(underneath cemeteries or churches for example), cavernous tunnels, sewer dwellings and networks, and an undercity. Those
are all options that exist in the same level with varying degrees of connections and access between them (not always)";
item 65).* The sewer network below is the central piece of one underground layer that also holds catacombs, caverns,
quarries and mine voids, cisterns and vaults, a buried old town where history made one, the private passages an access
edit digs, and the undercity — each system its own arena part (the sewer part 0; J-A65.31), all drawn and edited as one
layer by depth band, joined to one another and to the surface by typed links that exist by rule and chance, never by
guarantee. II.7.1–II.7.4 state the sewer, its neighbourhoods and the basement accesses; II.7.5 the undercity; II.7.6 the
other systems, their depths, the connection graph and the pieces an access edit generates. Like the sewer, all of it is
staged by the owner's roadmap: the base carries the rows, fields, interfaces, invariants and tests these subsections name.

=== REPLACE ### II.7.3 The underground neighbourhoods (item 12): the owner's three rules as invariants, the occupants, the cut, the surface constraint, access, depth, lifecycle, order ===
### II.7.3 The underground neighbourhoods (item 12): the owner's three rules as invariants, the occupants, the cut, the surface constraint, access, depth, lifecycle, order

**The owner's rules, as hard invariants (their §5.3 check rows are the determinism part's).** U1–U3 are the sewer
network's rules: they hold on its arena, part 0 of the underground layer (J-A65.42) — the owner's "there are no sewer
alleys" stays true in the sewer — while the undercity (II.7.5) and the layer's other systems (II.7.6) are other parts with
rules of their own.
* **U1 — frontage on one tunnel, doors onto it.** Every underground plot's `frontage` rows lie on the kerb (the external
  wall) of exactly one navigable, open tunnel run, and its `access` rows are a subset of its `frontage` rows (§2.5): a door
  opens only onto the tunnel.
* **U2 — no sewer alleys.** The underground L1 carries `tunnel` chains only; no `way` chain, no `alley` face and no S8 lane
  exists underground, so no tunnel exists to give access alone. F-PLOT's alley rung is skipped on the underground arena
  (§5.2): a plot that cannot front a tunnel is not a plot but residue.
* **U3 — flush against the outer wall.** Every underground building's frontage side lies on its plot's frontage edge; the
  footprint is `plot ∩ the frontage band of the row depth` (§4.7 S11's boolean), so the room's wall is the tunnel's wall
  by construction.

**Who lives there, from the same tables and field (J-A12.44).** The underground is a **pseudo-district**
(`District.kind = 'underground'`, one per settlement, its `faces` the underground built blocks, its `allocation` an S7b
record), as the hinterland and the sky pseudo-districts are (§4.5, II.6). **S7b (6)** — after the sky pseudo-districts (5)
and before the districts (1) — creates its `Allocation` when `Features.sewers` is on and the preset yields navigable mains
(the `navigable` preset always; `historical` when the trunk law of II.7.2 gives at least one navigable run of `minRunM` =
60 m, predicted at S7b from the arterials' and main roads' served areas, which exist by then, since the mains follow
them): (a) households of the **poorest** band, a share `undergroundShare` of that band's demand (defaults TOWN 0.02, CITY
0.04, METROPOLIS 0.06 — the crowded, cheap, hidden stock); (b) the classes whose class-table row carries
`underground: 'preferred'` (crypts, cold stores, the cellar workshops of brewers and vintners, guild vaults) at their table
share, plus the clandestine institutions whose concealment mode is `underground` (§4.7's *Concealed institutions*,
item 63) — where an undercity exists they go to it first (II.7.5, S7b (7)), and where no underground allocation can take
them the mode falls back to a front (§4.7) — and any assigned or dossier institution whose `knownTo` is `secret` (item
30) for which the assignment templates prefer underground plots; (c) in an epoch, the evolution engine's crowding hook: a share `crowdingShare` (II.7.4) of the
poorest band's households in the epoch's residual demand — what §4.11's regrowth-first steps (0)–(5) leave — goes
underground before the boundary widens (§4.11 (6); J-A12.47) — the owner's "crowding on the surface pushes growth
underground",
staged with the engine. The allocation is capped by the predicted capacity — 2 sides × the navigable run length ÷ the
poorest band's mean frontage, less the excluded ground below — and the ground's districts receive the remainder, so the
population stays whole; a miss between the prediction and the built network is absorbed by S10b's plan–fit–reconcile and
F-SITING's ladder, reported, never re-rolled. **The prosperity underground is the ground's field, shifted:** a plot's
`ContextVector.prosperity` is the ground raster sampled at the plot's frontage midpoint plus `undergroundOffset` (default
−0.25, a table value), clamped to [0, 1] and banded by the town's own `FieldBands` (§4.5), so a vault under the cathedral
close reads richer than a cell under the tanners' lane; the density and greenery fields are read the same way, and
`ContextVector.arena = 'underground'` keys the arena-specific rows. The granularity table (§4.7 S10 (2)) then does what the
owner asked without a new law: the poor band's rows give many small cells, the institution row few large vaults; `UndergroundRule`
(II.7.4) scales their depth by `depthScale` 0.35 (a plot one or two rooms deep: poor 4–7 m, modest 6–10 m, institution
8–15 m) and sets the vacancy-run share to `vacancyRunShare` 0.25 (long bare stretches of wall), and on the underground arena
S11 admits only its `arrangements` — the designation templates' `row` and `institution` (§10.2's `arrangement`, read with
`ContextVector.arena`) — so no compound, detached, hovel, tents or cluster stands along the sewer (the undercity's
chambers admit hovels and informal clusters by their own rows, II.7.5; item 70).

**The cut is the ground's cut (J-A12.41).** On each underground built block the underground stage runs S9's and S10's own
machinery with the underground context (`PlotStrategy`, `SitePlanStrategy` and `BuildingGenerator.outline` unchanged,
§14): (1) a kerb edge is a frontage when its tunnel is `navigable` and open (the `open` column of II.6's condition table) —
drains, culverts and closed runs are not frontages, so a block bounded by drains alone holds only residue; the frontage's
`class` is the tunnel's `kind`; (2)–(3) as §4.7, claims first for the vaults; (4) per-frontage regions by the block's
straight skeleton, the depth capped by the underground depth band, so a plot's rear line is its region's rear line and
**no plot reaches a second tunnel by construction** — two tunnels close together share the medial line between their
regions, never a kerb; (5) corner plots at junctions as on the ground; (6) residue typed `rock`; (7) joins and splits under
the same law; (8) vacancy runs at the underground share; (9) no alleys (U2); (10) every plot gets its context vector, its
derivation record and access rows ⊆ frontage rows (U1). Then S10b places the allocation by the same scorer and S11 lays
`row` cells end to end along the wall with party walls, and vaults on their claims — the row boolean gives U3. Everything
is cut inside the sewer network's arena (part 0 of the underground layer): the stage writes only that arena — every
transaction it opens is keyed to part 0 (§3.4's isolation), and §13.2's reroll-isolation fixture proves the ground and
every other part byte-identical — while the ground's static index partitions are read, never touched.

**The surface constrains the underground — by reads, never by copied geometry (J-A12.42, J-A12.43).** Before a plot is
committed its ring is tested on the ground arena through `pointLocate` and `resolve` on the ground's `PlatKey` (§2.2 rule 1,
through §3.4's services: no cross-arena write, no ground ring copied into the underground) at its vertices, its frontage midpoint and
a 1 m sample of its rear line. A sample is **excluded** when it lies in: any L0 water face; a cell whose `terrainClass` is
`damp` or `flood` (the water table: low, damp ground stays empty, item 12 (c)); a `wall_strip` block's band, setback,
glacis or ditch part, a tower's or a gatehouse's footprint (§4.8); the castle's reservation; the main footprint of a
`precinct` reservation (the cathedral's foundations); and **every other L4 footprint** — a room under a surface building
is that building's own basement (item 29, §2.6), a record of the ground building that never opens onto a tunnel, never an
underground frontage plot (J-A12.42). Public ground (corridors, squares, gate plazas), yard parts, greens, residue and
vacant plots are allowed. An excluded sample steps the plot down the **F-UNDER ladder** (its §5.2 row is the determinism
part's; the rungs are these): the band's depth → the band's lower depth → the class minimum depth → the run is typed
`vacant` (a bare stretch of wall); the ladder is deterministic from the plot's stream and each use is counted in the
report. A rear line that stops a metre short of the house above is invisible underground, which is why the test is a
sample and not a boolean against ground rings (J-A12.43).

**Access, air and light (item 12 (d)).** An **`AccessPoint`** (II.7.4; in §2.7's entity registry) links the arenas by
entity ids — a kind (`stair`, `shaft`, `well`, `cellar_stair`, `grating`), a role (`access`, `air`, `light`), a ground
point with the host it opens in (the corridor, square, yard or building, resolved on the ground by `pointLocate`, never a
ground face slot) and a vertex on the tunnel's kerb — and is placed after the plots: every **underground
neighbourhood** — a connected component of open navigable tunnel edges carrying at least one plot — gets at least one
`access` point, at the nearest allowed ground point above its tunnels in a declared order: a street stair in a corridor
strip or a square; a well shaft in a yard or a square; a `cellar_stair` in a surface building whose class row's
access probability at its band is above zero (§10.2's `undergroundAccess.prob`: inns, warehouses and guildhalls by
default) or whose plot is `knownTo: 'secret'` (item 30) —
a stair to the tunnel from a basement that stays the building's own room (item 29; J-A12.42). Air and light shafts
(`grating`) are placed every `shaftSpacingM` of navigable tunnel that carries plots (60 m historical, 40 m navigable) on
public ground only; where none lies within reach the spacing doubles once, then the run has none, reported.
`AccessPoint.ground.at` moves with its host face under a warp as a pin's point does (§7.4). Every `grating`, well shaft
and street stair — every access that breaks the surface — is a light shaft for §8.4's lighting: a column of daylight by
day, of faint moonlight by night, on the floor below (item 68 (d′)). **The sewer's light rows (item 68 (d′)).** The
underground layer has no global light and near-zero ambient; along the sewer the rows of §4.7's light table (`LightRule`,
context `arena` underground and the system `sewer`) put a light at every sewer-front dwelling's door and window and at the
tunnels' junctions and access points only, the tunnels between them dark, the fuel by the settlement's circumstances.

**Basement accesses (item 64; owner: "some buildings that have basements have accesses to the sewer grid or a dwelling
in a sewer grid where appropriate. higher chances if they are criminal as described above"; J-A64.41, J-A64.42).** Beside
the neighbourhood rule above, a surface building may hold its own way down — decided per building by the connection
stage (II.7.6), after the underground plots and the layer's other systems, never because a neighbourhood needs one.
1. **The gate.** The building has a basement (§2.6, item 29) and its `Basement.ring` lies within `accessReachM` (5 m;
   `UndergroundRule.access`, II.7.4) in plan of an open navigable tunnel's kerb (part 0), of an underground building's side
   or rear wall (a sewer dwelling — never its frontage, which is the tunnel's — or an undercity building), or, where they
   exist, of an open gallery or chamber of another system (II.7.6) or an undercity walkway (II.7.5); the test is a read
   through the kernel's services on each part by key (J-A12.32; no cross-arena write), the nearest element first, ties by
   address. The cellar stays a cellar (J-A12.42): the building gains an access record, never a room of the tunnel.
2. **The probability.** `p = min(accessCap, prob × (1 + ageGain × age) × multiplier × crime)` — `prob` the
   `undergroundAccess.prob` of the building's class at the plot's band, interpolated along the value (§10.2; the front's
   class where the building carries a concealed use), `age` ∈ [0, 1] the plot's growth-stage rank (1 for the first stage, 0 for
   the last: the "old houses"; `ageGain` 1), `multiplier` the concealed class's `accessMultiplier` where the building
   carries a concealed use (§4.7's *Concealed institutions*, item 63; default 6) and 1 otherwise, `crime` the staged crime
   term where the dossier port fills it (item 88's row, §10.2; 1 until then), `accessCap` 0.9 — one draw on `sewer`
   keyed by the building's lineage (§6.1; no new concern). A class row of 0 (a barracks, a courthouse, a temple) never
   draws; a user adds an access to any building by item 66's edit (§7.3 item 9; II.7.6).
3. **The kind** follows the drop from the basement's floor to the element's floor: a `door` through the basement wall
   where the element is an underground building's wall and the drop is within `doorDropCm` (60); a `stair` within
   `stairDropCm` (300); a `ladder` beyond; a `hatch` — the basement plan's trapdoor over a ladder — instead of a stair or
   ladder where the building carries a concealed use or its basement's own access is a trapdoor.
4. **State and knowledge.** `state` is `open`, `locked` or `bricked` by the row's weights (0.6 / 0.3 / 0.1 — a bricked-up
   door is the trace of an old one) or an edit, and reads `collapsed` or `bricked` while its element is closed (II.6);
   `knownTo` is `secret` where the building carries a concealed use (item 63), else `local` — a brewery's cellar door to the
   sewer is known to its street (item 30's values).
5. **Its uses.** The access is a fixed anchor of the basement storey that the plan rung reserves — a stair, ladder,
   trapdoor or door in the basement plan (§2.6, item 28) — and a node of the connection graph (II.7.6): a lifeline where
   its element is the undercity's (II.7.5). The neighbourhood rule above keeps its cellar-stair case as the fallback for
   a neighbourhood that no basement access reaches.
§5.3's rows (no access without a basement and a reachable element; a concealed building's access `secret`) and §13.2's
T64 bars (the access rate by class within its row; a clandestine building over a network at least at its row's rate)
prove it.

**Depth and ceiling, drawn on their own level (item 12 (g); J-A12.45).** Every underground building's `Heights` (§2.6) is
populated as on the ground: `baseCm` = the tunnel's invert at the plot's frontage midpoint + `floorAboveInvertCm` (30,
above the flow); `floors` = 1, or 2 for a vault class in the `navigable` preset where the headroom row allows; `eaveCm` =
the ceiling = min(the class's storey height, the tunnel's `headroomCm` + `vaultAllowanceCm` (a table value: 80 for vaults,
0 for cells)); `ridgeCm = eaveCm`, roof kind `flat` (a vault is a style program over the flat kind, §8.2); `elevationCm`
(§2.1) = `baseCm`, the entity's depth below the ground datum. The sewer network is **one arena** (`PlatKey` part 0 of the
`underground` layer, §2.2), not one per depth: depth is per entity inside it (J-A12.45), so tunnels at different depths
keep their one topology, while the layer's other systems are parts of their own (II.7.6; J-A65.31, which amends J-A12.45
for systems). The view groups every part's items into **depth bands** of `depthBandCm` (250) for §8.4's cut-away and for
§11's virtual-tabletop scenes — one scene per depth band with its elevation — so a building sits on its own level.

**Lifecycle follows the tunnel (item 12 (f); the tunnel's states are item 11's, II.6).** When a tunnel run's condition
closes — the `open` column of II.6's condition table turns false: caved in, collapsed or sealed — every plot whose frontage rows lie on
it takes `existence: 'abandoned'` with cause `rule:tunnel-closed`, and its buildings step through §2.8's decline states by
§4.11's tendency table at the underground's rate (the persistence order places the underground after streets and walls
and before terrain, item 8); a closed run's plots keep their ids, rings and derivation records. Reopening — the `reopen` conversion, by the engine
or by hand (§7.1) — `resurrect`s (§2.8) the plots whose rings still exist, so nothing is
re-rolled. A tunnel deleted by a user (allowed: everything is editable) takes its plots with it as any way's deletion takes
the plots that fronted it (§7.3), and the underground blocks it bounded re-derive.

**Order, seed and locality (item 12 (h); J-A12.46).** The `UndergroundStrategy` registers after the network stage by declared
I/O — inputs `under.tunnels`, the ground plat (read), the three field rasters, the underground `Allocation` and the
tables; outputs `under.blocks`, `under.plots`, `under.buildings`, `under.access` — so the owner's order holds: city →
network → underground plots and buildings. It runs eagerly on the generation worker after the pool's merge, never in the
pool (it reads every district's committed L3 and L4 and writes another arena). It keys its streams from the underground
pseudo-district's lineage through the ordinary concerns (`plot.width`, `plot.join`, `plot.vacancy`, `siting`, `siteplan`,
`heights`; the network's own draws use `sewer`; §6.1); a seed therefore reproduces its underground exactly, and it names its
entities with S13a's naming engine for its own pseudo-district — a leaf of §9.1's quarter tree in a family of its own, its
labels drawn only when the layer is visible — as the hinterland unit runs its own stages (§4.1). The sewer-front blocks on
the tunnel runs that lead into an undercity are its **outskirts** (II.7.5): they keep every rule of this subsection and
belong, for naming, description and counts, to the undercity neighbourhood that lists them (`District.outskirts`, §2.5). **Locality:** the stage's
spatial reads are declared (§7.3's audit): each underground block records the ground cells over it, so an edit whose clear
region covers those cells re-derives those blocks by tree scoping onto the dependent arena, a tunnel edit re-derives the
blocks its edges bound, and a New random of the underground pseudo-district writes only the `under` arena (part 0) — the
ground and every other part are byte-identical (the reroll-isolation fixture, §13.2). **Editable like everything:** underground plots and buildings are
ordinary plots and buildings on the `under/` arena (§2.1's address prefix), so every edit kind, lock, pin, assignment and
label of §7 applies unchanged; tunnels and access points have their own edit-target rows (§7.1). **Stage 2:** the
underground pseudo-district opens as II.1's underground close-up (`layer: 'underground'`).

**Emulation note (item 23).** Neither MFCG nor FTG has sewers or an underground; the whole layer is our extension, staged
by the owner, hidden by default, and with `undergroundShare` 0 and the layer hidden a CITY reads exactly as the references'
city. Nothing stands in a village's way: the village rows carry `never` (PART III).

=== REPLACE ### II.7.4 The hook interfaces and the base's part ===
### II.7.4 The hook interfaces and the base's part

```ts
interface SewerExistenceRow { existence: 'never'|'law'|'always'; law?: { base: number; populationWeight: number; wealthWeight: number; cap: number } }   // RungProfile.layers.sewers (§1.1); II.7.1's law
interface Features { sewers: boolean /* resolved at S0 from the request and the rung row; re-derived on replay (§2.9); read by every dependant */;
  underground: boolean /* items 65 and 66: true while any underground system exists — the sewer network, a system of II.7.6, or a dug passage alone (II.7.6's closure pieces); derived from the model on every replay (§2.9); the underground layer's presence, its exporters and the reader read it, never a view */ }
interface TunnelProfileRow { kind: Tunnel['kind']; preset: 'historical'|'navigable'; widthCm: Cm | { base: Cm; exp: number; band: [Cm, Cm] }; headroomCm: Cm | { base: Cm; exp: number; band: [Cm, Cm] }; wallCm: Cm;
  coverCm: Cm; minGradient: number; navigableMinWidthCm: Cm; navigableMinHeadroomCm: Cm }   // II.7.2's table; the kernel reads widthCm ÷ 2 + wallCm as the corridor half-width (§3.7)
interface AccessPoint { id: Id; kind: 'stair'|'ladder'|'hatch'|'door'|'shaft'|'well'|'cellar_stair'|'grating'|'mouth' /* ladder, hatch and door: item 64's basement accesses; mouth: an opening in outside ground — a cave mouth, a dug passage's outlet (II.7.6) */; role: 'access'|'air'|'light';
  ground: { at: PointCm /* moves with its host face under a warp (§7.4) */; host: Id /* the corridor, square, yard, building (for a basement access, its basement) or outside face it opens in */ };
  under: { part: number /* the underground part it reaches (§3.4; 0 the sewer network) */; element: Id /* the tunnel, gallery, chamber or underground building (a sewer dwelling's side or rear wall: item 64's door) */; at: VertexRef /* ('access_point', id) on that element's kerb or wall, §2.2 rule 7 */ };
  state: 'open'|'locked'|'bricked' /* item 64 (c): stored, set by the rule's row or an edit; it reads collapsed or bricked while its element is closed (II.6), a derived reading, never stored */;
  knownTo: 'public'|'local'|'secret' /* item 64 (c), item 30's values: public for a stair, shaft or grating on public ground, local in a yard or a building, secret where the building carries a concealed use or stands on a secret plot (II.7.3; §4.7's Concealed institutions) */;
  source: 'neighbourhood'|'basement'|'system'|'lifeline'|'edit' /* the rule that made it: II.7.3's neighbourhood rule or its basement accesses, a system's own entrance (II.7.6), an undercity lifeline (II.7.5) or an edit (§7.1; §7.3 item 9's closure) */; lifecycle: Lifecycle }   // §2.8's entity registry; II.7.3
interface UndergroundRule { undergroundShare: Record<Rung, number>; crowdingShare: number /* II.7.3 (c): the share of an epoch's residual poorest-band households the crowding hook sends underground (§4.11 (6)); default 0.10, our own, calibratable with the staged engine */; undergroundOffset: number; depthScale: number; vacancyRunShare: number; minRunM: number; floorAboveInvertCm: Cm; vaultAllowanceCm: Cm; depthBandCm: Cm;
  arrangements: DesignationTemplateRow['arrangement'][] /* default ['row', 'institution']: the arrangements S11 admits along the sewer, part 0 (II.7.3) */;
  access: { reachM: number /* 5 */; ageGain: number /* 1 */; cap: number /* 0.9 */; doorDropCm: Cm /* 60 */; stairDropCm: Cm /* 300 */; state: { open: number; locked: number; bricked: number } /* 0.6 / 0.3 / 0.1 */ } /* item 64: II.7.3's Basement accesses; our own values, extension */;
  shaftSpacingM: Record<'historical'|'navigable', number>; excluded: ('water'|'damp'|'flood'|'wall_strip'|'tower'|'gatehouse'|'castle'|'precinct_main'|'footprint')[];
  connection: { reachM: Record<'historical'|'navigable', number>; pitShareByBand: Record<'historical'|'navigable', Record<string, number>> } }   // II.7.1's and II.7.3's tables as one editable rule record (§7.6)
interface UndergroundStrategy { derive(doc: Document, tunnels: Tunnel[], allocation: Allocation /* the underground pseudo-district's, S7b (6) */, rules: UndergroundRule, ctx: StageContext, k: Kernel):
  KernelResult<{ blocks: Block[]; plots: Plot[]; buildings: Building[]; access: AccessPoint[] }> }
// a Stage registered after the network stage by declared I/O: inputs under.tunnels, the ground plat (read), the fields, the underground Allocation; outputs under.blocks, under.plots, under.buildings, under.access;
// runs S9 → S10 → S10b → S11 on the underground arena with the underground context; the StrategyRegistry's `underground` map (§14)
```

**The base's part, for the staged row (*Staged by the owner's roadmap*):** `RungProfile.layers.sewers` and
`Features.sewers` with S0's draw, and `Features.underground`; the underground `LayerSpec` hidden by default; the class
table's `drain`, `underground`, `undercity`, `undergroundAccess` and `concealment` columns and the cover table (§10.2);
`Tunnel.navigable`, `Tunnel.headroomCm` and the profile table with its wall thickness; the `AccessPoint` record with its
state and knowledge; `ContextVector.arena`; `UndergroundRule`'s depth scale, vacancy share, crowding share, arrangement
restriction and access row; the undercity's existence row and rule (II.7.5); the system rows, the link rule and the
`raiseGrade` kind (II.7.6); the records `UndergroundSystem`, `Gallery`, `Chamber` and `UndergroundLink` and the
district's `parent` and `outskirts` links (§2.5, §2.7), schema-complete and empty; the `UndergroundStrategy`,
`UndercityStrategy`, `UndergroundSystemStrategy` and `UndergroundLinkStrategy` registration slots; the U1–U3 invariants,
F-UNDER's ladder row, §5.3's rows for the accesses, the concealed modes and the undercity, and §13.2's hook tests (T12,
T63–T66); and the closure rule with `addUndergroundAccess` (§7.3 item 9, §7.1), whose underground pieces run once the
layer's stages exist. Staged by the owner's roadmap and not built here: the stages themselves — the network, the
sewer-front neighbourhoods, the void systems, the undercity and the connection stage.

=== APPEND TO SECTION ### II.7.4 The hook interfaces and the base's part ===

### II.7.5 The undercity (item 65): what it requires, existence and the 1–3 bound, a shadow of the settlement

*In plain words.* The owner asked what an undercity would require. Not more dwellings along the sewer walls — those stay
standoffish — but a place with the four things that make any town a town: a void big enough to live in, its own square
and streets, its own institutions, and lifelines to the surface. It is one to three neighbourhoods at most, each the
underside of a real quarter above, peopled by the settlement's own poorest and outlawed, trading the town's goods — a
shadow of the settlement, never a second one.

**What an undercity requires — its existence test (item 65 (b); J-A65.41).** The undercity stage tests four conditions
before it builds anything, each a rule with its values in `UndercityRule` (below; our own, calibratable, `extension`):
1. **A void large enough to live in** — chambers from a source that explains them (II.7.6): a cavern hall, a quarry's
   gallery system, a catacomb, cisterns and vaults, or a buried old town (the settlement's own earlier street level under
   a raised grade, II.7.6's `raiseGrade`). A void's **capacity** is the floor area of one connected cluster of its chambers
   and galleries ÷ `m2PerHousehold` (40 m² with its walkways).
2. **Its own public space and streets** — a chamber of at least `mainChamberM2` (400 m²) to be its plaza and black
   market, and galleries or walkways joining its chambers: its streets, independent of the sewer's water channel.
3. **Its own institutions** — the microcosm: at least `minInstitutions` (2) institutions of `undercity: 'preferred'`
   classes placed (§10.2: the black market first, a fence's hall, a criminal guild's seat, a tavern, a forbidden shrine,
   a fighting pit, a healer), beside its warren of dwellings.
4. **Lifelines to the surface** — food, water and air: at least one access to the surface (a stair, a basement access of
   II.7.3 or a link to a system that has one), one air shaft surfacing at a well, a grate, a chimney or a ruin (an
   `AccessPoint` of role `air`), and water from the river, a cistern or a well; and a route to the outside where the site
   offers one (an outfall, a cave mouth beyond the walls).
A neighbourhood whose void, square, institutions or lifelines fail steps down the ladder below; the sewer-front dwellings
of II.7.3 along the tunnels that lead into it are its outskirts, and its core is the void.

**Existence and the 1–3 bound (item 65 (c); owner: "the undercity is at most 1-3 neighborhoods to keep it simple and
consistent"; J-A65.41).** One rule: an undercity exists in cities and metropolises, and in a large town only where a void
source exists — rarely; never below TOWN. The rung row `RungProfile.layers.undercity` (§1.1; `UndercityExistenceRow`,
below) reads `never` at THORP, HAMLET and VILLAGE (PART III); `law` at TOWN with `maxNeighbourhoods` 1, `minPopulation` 6 000
(the large town) and `chance` 0.2 (rare: one draw on `sewer`); `law` at CITY with 2; `law` at METROPOLIS with 3. Under
`law` it exists when (i) the rung admits it (and, at TOWN, its draw comes up), (ii) a void source with capacity for one
neighbourhood exists or is predicted, (iii) its household demand H (below) reaches `minHouseholds` (20) and (iv)
conditions 2–4 can be met; where the dossier port supplies the fact (an optional
input, §7.7), a dossier may require one — it then exists at TOWN and above with at least one neighbourhood, in the vaults
under the oldest district where no other void is found — or forbid one, and the dossier's word outranks the rule. It is
never more than three neighbourhoods; the sewer-front dwellings elsewhere in the network are not part of it and do not
count against the bound.

**The size law.** The household demand is `H = min(N × u × (P ÷ P_ref) × (1 + g × disorder), maxBandShare × N_poor)` —
`N` the settlement's households; `u` the undercity share at the reference poverty by rung (TOWN 0.01, CITY 0.02,
METROPOLIS 0.03); `P` the poverty share, the share of households in the `squalid` and `poor` bands (§4.5), and `P_ref`
0.022 the default roster's; `disorder` the circumstance slice's scalar in [0, 1] (§7.7 item 2; 0 where absent) with gain
`g` 1, and the staged crime term (item 88's row) as one more factor when the port fills it; `N_poor` the households of
those two bands and `maxBandShare` 0.6, so the surface keeps poor households of its own — the H households taken from the
squalid band first, then the poor band. To them join the roster's `undercity: 'preferred'` institutions at their table
counts and the clandestine institutions whose mode is `underground` (§4.7). The neighbourhood count is
`n = clamp(⌈H ÷ householdsPerNeighbourhood⌉, 1, maxNeighbourhoods)` (120 households), none when `H < minHouseholds`; the
void's capacity caps both (n falls first, then H). At the default roster and the `navigable` preset a city holds one
neighbourhood and a metropolis two, a poorer or more disordered one up to the bound — so the undercity grows with population, poverty and disorder and
shrinks with prosperity and order, as the owner asked. **Realism or toggle (D-3; J-A65.43).** Under the sewer's
`historical` preset (realism, the default) the undercity is a modest warren: at most one neighbourhood at any rung, its
void sources vaults, catacombs, quarries and a buried old town only, its shares `u` × 0.5; the full microcosm with the
1 / 1–2 / ≤ 3 bound and cavern towns rides on the `navigable` preset, D-3's fantasy toggle.

**The allocation (S7b (7), §4.5).** Where an undercity exists — predicted at S7b, when every void source is predictable:
caverns from S1's geology flag, catacombs from the religious rows and their sources' ages, quarries from the stone
resource and the roster's predicted stone stock, vaults from the arterials and bridges S4 laid, a buried town from the
log — S7b creates its `Allocation` after (6) and before (1): the H households of the size law, the squalid band's first and
then the poor band's, the `undercity: 'preferred'` classes, and the clandestine institutions whose mode is `underground`, which prefer the
undercity over a sewer dwelling where both exist; capped by the predicted capacity; the ground's districts receive the
remainder, so the population stays whole — nobody is added by the underground (c′ (1)). A miss between the prediction and
the voids as built is absorbed by S10b's plan–fit–reconcile and F-SITING's ladder, reported, never re-rolled.

**A shadow, not a second city (item 65 (c′); owner: "while it is called an undercity, it is simply the less than savory
shadow and extension of the full settlement, not independent of it"; J-A65.44).**
1. **Its people and institutions are the settlement's own** — the roster's households and institutions (the dossier's
   where one exists); the settlement's population totals include them.
2. **Each neighbourhood shadows a surface district.** A neighbourhood is a pseudo-district (`District.kind = 'undercity'`,
   §2.5) in its void's part (below), with a `parent` link to the surface district above the largest share of its main
   chamber in plan (ties by address) — the district that feeds it: poor, dockside, market, the old core. It joins §9.1's
   quarter tree under its parent's quarter node and is named as the underside of that quarter by §10.4's grammar, never as
   a rival town; its prosperity is the parent's field sampled at each plot, shifted by `undercityOffset` (−0.35) and
   banded by the town's own `FieldBands` (II.7.3's pattern).
3. **Its economy is the surface's shadow.** Its black market trades the town's goods and its trades serve the town: S10b's
   supply edges run to the surface markets, docks and outfalls, measured from each undercity plot along its walkways to
   its nearest lifeline and on from the lifeline's ground point (the solver's `street` mode through the lifeline).
4. **It has nothing of its own to govern it** — no government, walls, gates, rung or identity of its own; the
   settlement's circumstances (disorder, crime, government) drive it.
5. **It changes as the settlement above changes.** At each epoch its size law is re-read, a change taking effect only past
   `hysteresis` (0.1 of H) and a new neighbourhood opening only in its void's free capacity; its blocks follow their
   parent's due marks through §4.11's wealth ladder (item 31); its chambers and galleries flood, collapse or are sealed
   by II.6's condition table, a chamber's plots following it as II.7.3's follow their tunnel; and the conversion
   `clearUndercity` (below; the authorities' clearance, by an epoch or by hand) vacates one neighbourhood's plots — its
   households leaving by §4.11's step (c), its institutions relocating by the use step — while its chambers stay.

**Where it lives, and its streets, plots and buildings (item 65 (e); J-A65.44).** An undercity neighbourhood lives in the
arena part of its void source (a cavern, quarry, catacomb, vaults or buried-town part, II.7.6) — never in the sewer's
part 0, where U1–U3 hold, and never in a part of its own, because its chambers are its source's: nothing is copied between
parts (J-A12.43; J-A65.31). The undercity stage runs S9–S11 on that part by the kernel's one cut (J-A65.32): its streets
are `gallery` chains of its own — walkways laid across a chamber's floor and the source's galleries it adopts — banded by
`corridorUnion`; a chamber's floor is cut by S10's frontage-first machinery on those walkways' kerbs and on the chamber
wall (plots may end on the `chamber_wall`); the main chamber stays unplotted as its plaza, the black market's stalls its
pins (§4.7's market pins). S11 admits the arrangements `row`, `hovel`, `cluster` (item 70's informal clusters: the
shanty structures of the destitute, §4.7's *Informal clusters*) and `institution` (`UndercityRule.arrangements`), carved
rooms and repurposed vaults being `row` cells against the chamber wall; heights are ceiling-capped — `eaveCm` = min(the
class's storey height × its floors, the chamber's `ceilingCm` − `ceilingClearCm` (30)), one floor or more where the ceiling
allows, roof kind `flat`, no sky. Every district, plot and building is an ordinary record on its part, editable by every
edit kind of §7.

**Its outskirts.** The sewer-front blocks of II.7.3 whose tunnel runs lead into the undercity — within `outskirtsReachM`
(150 m) along open tunnels from a link that joins it — belong to its neighbourhoods: each undercity district lists them
(`District.outskirts`, §2.5), a link between records in two parts (J-A65.31); their plots, geometry and allocation stay
part 0's under U1–U3, and they are named, described and counted with the neighbourhood.

**Lifelines and light.** The connection stage (II.7.6) realises the undercity's lifelines before any lottery: the nearest
candidate access, air shaft and water link are made (`open`, or `secret` by the row) first; a neighbourhood left without
one fails condition 4 and is dropped, its allocation re-placed by the reconcile, and with none left there is no undercity
— each drop reported. **Light (item 68 (d′); owner: "the undercity and near dwellings underground has to have a lot of
light sources. they don't have the sun or moon").** The underground layer has no global light and near-zero ambient; the
undercity's rows of §4.7's light table (`LightRule`, context `arena` underground and the system `undercity`) are the
densest of the layer — a light at every door and window, along walkways at a spacing tighter than any surface street,
clustered in the market chamber and around its institutions, braziers and fire pits in the larger chambers — the fuel by
the settlement's circumstances (tallow and pitch, lamp oil; magical lights only where the `magic` circumstance admits
them), and every lifeline that breaks the surface is a light shaft (§8.4), so its brightest spots at noon lie under its
shafts.

**Emulation (item 65 (f)).** No reference generator has an underground: every row here is an `extension`, and the parity
presets set `maxNeighbourhoods` to 0.

**Order, seed and locality.** `UndercityStrategy` registers after the void systems and the sewer-front neighbourhoods and
before the connection stage, by declared I/O — inputs: the void systems' parts, the ground plat (read), the three field
rasters, the undercity `Allocation` and the rows; outputs: its districts, blocks, plots, buildings and walkways — and runs
eagerly on the generation worker after the pool's merge, as II.7.3's stage does (J-A12.46). Its existence and size draws
are on `sewer`, keyed by the settlement's lineage; each neighbourhood's streams derive from its district's
lineage, itself from its parent's (§6.3), through the ordinary concerns (`plot.*`, `siting`, `siteplan`, `heights`; §6.1,
no new concern); it writes only its void's part, so a New random of an undercity neighbourhood leaves the ground and every
other part byte-identical.

```ts
interface UndercityExistenceRow { existence: 'never'|'law'; maxNeighbourhoods: 0|1|2|3; minPopulation?: number; chance?: number /* TOWN: 0.2 */ }   // RungProfile.layers.undercity (§1.1); the rule above
interface UndercityRule {   // II.7.5's values as one editable rule record (§7.6); our own, calibratable, extension (the parity presets: maxNeighbourhoods 0)
  share: Partial<Record<Rung, number>> /* u: TOWN 0.01, CITY 0.02, METROPOLIS 0.03 */; povertyRef: number /* 0.022 */; maxBandShare: number /* 0.6 */; disorderGain: number /* 1 */; householdsPerNeighbourhood: number /* 120 */; minHouseholds: number /* 20 */;
  m2PerHousehold: number /* 40 */; mainChamberM2: number /* 400 */; minInstitutions: number /* 2 */; undercityOffset: number /* −0.35 */; ceilingClearCm: Cm /* 30 */;
  outskirtsReachM: number /* 150 */; hysteresis: number /* 0.1 of H */;
  arrangements: DesignationTemplateRow['arrangement'][] /* default ['row', 'hovel', 'cluster', 'institution'] */;
  presets: Record<'historical'|'navigable', { maxNeighbourhoods: 0|1|2|3 /* a cap on the rung row: 1 and 3 */; sources: UndergroundSystem['kind'][] /* historical: vaults, catacomb, quarry, buried; navigable: all */; shareScale: number /* 0.5 and 1 */ }> }
interface ClearUndercity { kind: 'clearUndercity'; district: Id /* one undercity neighbourhood */ }   // a conversion kind (§4.11's union names it): its plots vacated, households leaving by step (c), institutions relocating by the use step; chambers kept
interface UndercityStrategy { derive(doc: Document, systems: UndergroundSystem[], allocation: Allocation /* S7b (7)'s */, rules: UndercityRule, ctx: StageContext, k: Kernel):
  KernelResult<{ districts: District[]; blocks: Block[]; plots: Plot[]; buildings: Building[]; walkways: Gallery[] }> }
// a Stage registered after the void systems and II.7.3's stage by declared I/O; runs S9 → S10 → S10b → S11 on each neighbourhood's void part; the StrategyRegistry's `underground` map (§14)
```

### II.7.6 Catacombs, caverns and quarries; depth bands and the connection graph (item 65)

**One layer, several systems (item 65 (a); J-A65.31, J-A65.42).** The underground layer holds the derived sewer network —
the central piece, system kind `sewer`, part 0 (II.7.1–II.7.4) — and beside it the systems below, each an
`UndergroundSystem` record (§2.7) with its kind, its source, its arena part and its depth range: `catacomb`, `cavern`,
`quarry` (quarries and mine voids), `vaults` (cisterns, street and bridge vaults), `buried` (a buried old town) and `dug`
(the private passages an access edit digs, item 66). Each is its own arena part of the `underground` layer (§3.4): the
sewer keeps part 0, and every further system takes the next unused part number when it is first created — at generation
in the stage order below, one system per kind; a `buried` system when a `raiseGrade` first makes one; a `dug` system at the
first access edit that needs one — stored on the record (`UndergroundSystem.part`), counted by the document's
`nextUndergroundPart` (§2.9) and never renumbered or reused, because the number is part of its entities' keys and
addresses (§6.3). One system per kind: two catacomb complexes that meet join, as galleries of one kind may; what passes
over or under without meeting belongs to another kind and so to another part. A system's elements are **galleries**
(`Gallery`, §2.7: a chain at the part's L1 with `widthCm`, `wallCm` and `headroomCm` from its system row below, banded by
`corridorUnion` as a tunnel is, §3.7) and **chambers** (`Chamber`, §2.7: a void wider than a band — an ossuary, a cavern
hall, a quarry room, a cistern — a closed outline chain carrying the `chamber_wall` role, its floor an L1 face;
J-A65.32), each with its floor `elevationCm` and its `ceilingCm`.

**Depth bands.** Every gallery and chamber keeps its own depth, laid inside its system row's `depthM` range (catacombs 3–10
m, vaults 3–8 m, quarries 10–30 m, caverns 5–60 m following the rock, a buried town at its old grade, dug passages 2.5–6 m)
and never above the ground less its system's `coverM`; inside one part depth is per entity (J-A12.45), and systems in
different parts pass over and under one another. The view groups every part's items into the depth bands of
`depthBandCm` (II.7.3), so the layer draws and exports as one (§8.4, §11.1), a crossing of two parts drawn over and under.

**The derivations.** Each system is a registered stage with declared I/O (§4.12) — `UndergroundSystemStrategy`, below —
running after the network stage in the order catacombs, caverns, quarries, vaults, each reading the ground and part 0
through the services only (J-A12.32) and writing its own part; every draw is on `sewer`, keyed by the system's lineage
and the element's source (§6.1; no new concern). Every system is gated to TOWN and above (PART III) and by its row's chance
per rung; the chances are 0 in the parity presets.
- **Catacombs** — from cemeteries' and churchyards' sources: the churchyard parts of church and temple plots (§4.9's
  churchyard row), the crypted classes (`underground: 'preferred'`: crypts, §10.2) and the religious precincts and
  monasteries. A source qualifies when its ground is not `damp` or `flood` (the water table of §2.6's gate values) and its
  age reaches `minAgeYears` (100) — at generation `(K − k + 1) × yearsPerStage` for a source built in growth stage k of K
  (§4.4; `yearsPerStage` 50), replaced by the staged `HistoryHint.ageYears` when the port fills it (item 88) and by the
  log's years since its use opened after epochs — and holds a catacomb with the row's chance by source kind and rung
  (crypted church 0.6; churchyard 0.25 at TOWN, 0.4 at CITY, 0.5 at METROPOLIS; precinct 0.4). Its extent is its
  ossuary need, `A = Σ_years servedPopulation × burialRate ÷ 1 000 × ossuaryShare × m2PerBurial` — the population its
  source serves (the town's population history × the source's share of its religion's temples, §10.2; at generation each
  growth stage's population at its built share), `burialRate` 30 per 1 000 a year, `ossuaryShare` 0.1, `m2PerBurial` 0.05 —
  laid as galleries on a grid of `gridM` (6 m) under and beside the source within `reachM` (80 m), an ossuary chamber at
  every fourth crossing, and an entrance stair from the source's building (an `AccessPoint` of source `system`); so a
  catacomb is as large as its town's dead and as old as its church.
- **Caverns** — from geology: where S1's geology flag (`Terrain.geology`, §2.3, written by S1, §4.2) is `soluble` or
  `volcanic`, over the frame's rock (S1's `rock`, `high` and `mid` terrain classes), a cavern system exists with the row's
  chance (soluble 0.7, volcanic 0.4). Soluble rock: galleries along the terrain's drainage lines beneath the rock (§2.3's
  `hydro` cells whose `flowAccum` passes the row's threshold), at the local water table — a gallery below it carries water
  (`Gallery.water`) — with a hall where two galleries meet under high relief; volcanic rock: one to three tubes descending
  from high ground along the steepest descent, with breakdown chambers. The extent is capped at `maxRockShare` (0.1) of the
  rock area, and a gallery that meets a slope's face or a bank opens there as a cave mouth (an `AccessPoint` of kind
  `mouth`).
- **Quarries and mine voids** — from S1's stone resource and the town's stone stock: the volume taken is the stone the town
  is built of — the wall volume of the stock whose material is stone (§2.6's material rule, read here as a quantity of
  stone, never as a shape; J-A65.45) and of the enceinte's walls and towers — × `wasteFactor` (1.6); the workings are laid on
  the frame's stone cells (`SiteResources.stone` ≥ 0.5) ranked by stone value, then nearness to the town, within `reachM`
  (2 km), under the town first where its own ground holds the stone (as the old quarries lay under Paris), as
  room-and-pillar galleries on a `roomM` (5 m) grid leaving `pillarShare` (0.35) of the rock, the area = volume ÷
  `headroomCm` (250); a working whose cover would be under `minCoverM` (6 m) is left to the hinterland's surface quarry
  (§4.9) and laid nowhere underground; a shaft opens at each working's centre (an `AccessPoint` of kind `shaft`). Mine
  voids read `SiteResources.ore` the same way, only where the roster holds a mining class.
- **Vaults** — cisterns and street and bridge vaults: under every bridge approach whose way rises over the ground beyond
  the banks, under way segments on slopes steeper than `vaultSlope` (0.12) where a street is carried on arches, and a
  cistern under the oldest precincts and the castle where `dist.water` exceeds `cisternDistM` (400 m) — each a chamber or a
  short run of vaults under its way or precinct, under public ground only (II.7.3's surface constraint applies).
- **A buried old town** — the settlement's own earlier street level under a raised grade (b (1)'s last source; item 65
  ruling 5; J-A65.46): the conversion kind `raiseGrade` (below; §4.11's union names it) is applied by an epoch (the
  evolution engine, staged) or by hand (a `convert`, §7.1). S1's terrain operator raises the region's ground by `raiseCm`
  (≥ 200 cm, a storey); the region's ways, plots and buildings at the old grade end on the ground (their existence `cleared`,
  §2.8) and their successors are the `buried` system's elements — each old way's centreline a gallery, each old building's
  ground storey a chamber, each new record succeeding its predecessor by §6.3's succession — while the ground above is
  re-derived on the new grade from the old centrelines (regrowth-first, §4.11: the streets keep their lines, the buildings
  rise on their plots). So an undercity in it walks the old town's streets under the new. None exists at generation
  unless the staged `HistoryHint` names such a scar when the port fills it (item 88).
- **Dug passages** — item 66's pieces (below).

**The connection graph (item 65 (d); J-A65.47).** A link (`UndergroundLink`, §2.7) joins two elements of different parts —
each end one vertex in its part carrying the `link_end` role (§2.2 rule 7), never a vertex two parts share (J-A65.31) —
with a `kind` (`open`, `gated`, `secret`, `collapsed`, `flooded`), a `via` (`breach`, `stair`, `shaft`, `door`) and a
`knownTo`; the surface links are `AccessPoint`s (II.7.4). The **connection stage** (`UndergroundLinkStrategy`, below)
runs last, after the undercity: (1) the undercity's lifelines (II.7.5) first; (2) for every pair of elements of different
systems within `linkReachM` (10 m) in plan and `linkDepthM` (8 m) in depth — found by reads across parts — one link per
pair within `linkSpacingM` (60 m), existing with the row's chance for the pair of kinds (sewer–vaults 0.6, catacomb–quarry
0.5, any–buried 0.5, sewer–catacomb 0.3, sewer–quarry 0.3, cavern–quarry 0.3, sewer–cavern 0.2, others 0.2; our own), so a
catacomb may meet the sewer or not; (3) its kind drawn by the row's weights (open 0.3, gated 0.25, secret 0.25, collapsed
0.15, flooded 0.05 — `flooded` only below the water table); (4) its `knownTo` `secret` for a `secret` link or a link into a
building with a concealed use, else `local`; (5) II.7.3's basement accesses (item 64). A link's kind follows the elements
it joins (II.6), and every link is an edit target (add, delete, `setAttr` on `kind` and `knownTo`, §7.1).

**The same engine, and the rest of the family's rules (item 65 (e)).** Every system is laid by the kernel's one cut
(J-A65.32): galleries as chains banded by `corridorUnion`, chambers as closed outline chains. Plots and buildings exist
only where a system hosts people — the sewer's frontage (II.7.3) and the undercity (II.7.5); a catacomb's, cavern's,
quarry's or vault's chambers carry none unless the undercity takes them. Every element is an edit target (draw, move,
delete, `setAttr` on kind, depth, width, state and `knownTo`; II.6's conversions and `flood`), every rule is a data row
(§7.6), the seed survives edits (§6.3), the dossier stays the authority for institutions (item 20), and every element
fades by II.6's condition table. **Light (item 68 (d′)):** catacombs are dark but for their shrine and ossuary lamps at the
chamber altars, caverns dark but where lived in (a glowing-fungus row only where the `magic` circumstance or the biome
allows), quarries and vaults dark but at their shafts and where lived in — §4.7's light table, context `arena`
underground and the system kind; every access or cave mouth that breaks the surface is a light shaft (§8.4).

**The pieces an access edit generates (item 66; owner: "if a user edits a building to have an access to the underground,
it generates all the necessary pieces"; the closure rule — one event, one transaction, the record of what it created,
exact undo, shared pieces kept — is §7.3 item 9's; J-A66.41).** `addUndergroundAccess(building, target?)` (§7.1) calls
these generators in dependency order at its dry run, each drawing on `sewer` keyed by the building's lineage, the
target's and the event's `seq` (§6.1; minted as J-A18.43 mints), so the same edit on the same seed gives the same pieces:
1. **The basement** — §2.6's basement decision with its probability forced: the request overrides the chance, never the
   terrain gate — a full cellar where the gate allows, else a half cellar or a walk-out on a slope, else a hatch to a
   crawl space under a raised floor (§2.6's requested-mode ladder), else a refusal naming the gate (F-EDIT, §5.2), never
   silent (J-A29.22 stands).
2. **The target** — the named element; else the most plausible reachable one: an open navigable sewer tunnel or an
   underground building's wall within `accessReachM` (II.7.3's targets), then within `digReachM` (60 m) the nearest open
   gallery or chamber of a catacomb, cavern, quarry or vaults, or an undercity walkway — ties by plan distance, then address.
3. **The connector** — when the target lies beyond `accessReachM`: a `dug` passage, a gallery chain in the `dug` system's
   part, routed by the kernel's path search (§3.1) on the frame's grid from the basement ring to the target — its cost
   infinite within `foundationClearM` (0.5 m) of every other building's footprint and basement ring and wherever the water
   table (§2.6's gate values) lies above the passage's floor, rising with the rock class — inside the `dug` row's depth
   range, below the street's services (the network's `coverCm`, II.7.2) and above the water table; a route longer than
   2 × `digReachM` is a refusal with the reason.
4. **The system itself** — where no underground element lies within `digReachM` (a town without sewers, a village): the
   minimal private underground, the `dug` system with one passage to the most plausible outlet by the building's outlet
   row (default: another cellar of the same owner within reach, a catacomb or cave the site has, the riverbank, the shore,
   beyond the outermost enceinte; where the building carries a concealed use: beyond the walls, the riverbank, the shore, a
   catacomb or cave) — its outer end an `AccessPoint` of kind `mouth`, or a door into the other cellar. The settlement's
   sewer rows are unchanged — a dug passage is no network and `Features.sewers` is untouched — while `Features.underground`
   turns true (II.7.4).
5. **The access point** — II.7.4's record, its kind by the drop (II.7.3's *Basement accesses* (3)), `state` `open`,
   `knownTo` `secret` where the building carries a concealed use, else `local`, `source` `edit`.
6. **The plan** — the plan rung reserves the stair, ladder or hatch in the basement plan (§2.6, item 28), and the
   building's plan rung is marked `stale`.
7. **The links** — the connection graph gains the new links, typed (`open` at a dug passage's two ends).
The same generators serve the closure's other instances (§7.3 item 9 (d)): a concealed front's missing concealed door
(§4.7's *Concealed institutions* (4)) and an undercity entrance's missing lifeline (II.7.5). The bars are §13.2's T66
group.

```ts
interface UndergroundSystemRow {   // one per system kind; II.7.6's rules as data (§7.6); our own values, extension (every chance 0 in the parity presets)
  kind: 'catacomb'|'cavern'|'quarry'|'vaults'|'buried'|'dug'; chance: Partial<Record<Rung, Record<string /* source kind */, number>>> /* absent: none; never below TOWN */;
  depthM: [number, number]; coverM: number; gallery: { widthCm: Cm; wallCm: Cm; headroomCm: Cm } /* the kerb reads widthCm ÷ 2 + wallCm (§3.7) */; chamber: { minM2: number; ceilingCm: Cm };
  params: Record<string, number> /* the kind's own values named above: minAgeYears, yearsPerStage, burialRate, ossuaryShare, m2PerBurial, gridM, reachM; maxRockShare; wasteFactor, roomM, pillarShare, minCoverM; vaultSlope, cisternDistM; digReachM, foundationClearM */;
  outlets?: { use: 'default'|'concealed'; order: ('cellar'|'void'|'riverbank'|'shore'|'beyondWalls')[] }[] /* dug only: the outlet rows of item 66's step 4 */ }
interface LinkRule { linkReachM: number /* 10 */; linkDepthM: number /* 8 */; linkSpacingM: number /* 60 */; chance: Record<string /* the sorted pair of system kinds, 'catacomb|sewer' … */, number>;
  kinds: Record<UndergroundLink['kind'], number> /* the kind weights */ }
interface RaiseGrade { kind: 'raiseGrade'; region: Id[] /* the blocks or districts raised */; raiseCm: Cm /* ≥ 200 */; cause: 'fire'|'flood'|'rebuild'|'hand' }   // a conversion kind (§4.11's union names it): the buried old town above
interface UndergroundSystemStrategy { derive(doc: Document, row: UndergroundSystemRow, ctx: StageContext, k: Kernel): KernelResult<{ system: UndergroundSystem; galleries: Gallery[]; chambers: Chamber[]; access: AccessPoint[] }> }
interface UndergroundLinkStrategy { link(doc: Document, rule: LinkRule, access: UndergroundRule['access'], ctx: StageContext, k: Kernel): KernelResult<{ links: UndergroundLink[]; access: AccessPoint[] }> }
// Stages registered after the network stage by declared I/O (§4.12): the systems in the order catacomb, cavern, quarry, vaults, each writing its own part; then II.7.3's and II.7.5's stages; then the connection stage last, which writes link records and access points and no geometry but their link_end and access_point vertices, one part per transaction; the StrategyRegistry's `underground` map (§14)
```

=== J-ROWS ===
| J-A58.41 | stage 2's ring courses by default: one-phase hexagons with bell-jittered vertices smoothed by three corner-cutting passes, spacing from `e_lo` plus a uniform share of the remainder and widening by 1 + a folded bell per ring; an uncut centre a square, green or manor at equal odds, a plaza loop where the district has no greens or trees | II.2 |
| J-A58.42 | stage 2 keeps its per-band green target (the greens of NG 1.2.2 follow completed frontage rings) and adopts the pin weight decay — the chosen kind's weight ÷ 10 for the rest of the block's picks | II.3 |
| J-A58.43 | the ≈ 525 m hood span of NG 1.2.2 stated as a descriptive scale only, an inference; no default derived from it | II.2 |
| J-A61.41 | the village hooks name VG 1.6.9 (itch 19365073) and record its code-confirmed palisade-first order and steering terms qualitatively, as reader-tier observations for the village rung; no base change | PART III |
| J-A63.41 | `concealment` resolved dossier → assignment → the class's default-mode weights → `none`; the fixed fallback chain underground → front → hidden (hidden → front; front → hidden; then F-SITING's closest options), never placed openly or dropped, every step reported | §4.7 |
| J-A63.42 | a front and its concealed function are one solver item (the front's hard rows, the true class's soft rows and an alley-court-hidden preference) and two `Use` records; S11 builds the front, the concealed use adding only a concealed programme, a concealed service or yard door and a way down | §4.7, §10.2 |
| J-A63.43 | the front drives the designation mutator and the concealed use persists; a relocated concealed use leaves the front as an ordinary business, its door kept as a service door and its rooms returned at the next plan re-cut | §4.7 |
| J-A63.44 | concealment and the cover table are `extension` rows, so the parity presets place every institution openly; a village's concealed institution takes a front | §4.7, §10.2, PART III |
| J-A64.41 | a basement access decided per building: a gate (a basement within 5 m of an open navigable tunnel, an underground building's side or rear wall, or another system's element) and a lottery by class × band × age × the concealed multiplier, capped at 0.9; the neighbourhood rule's cellar stair kept as the fallback; the cellar stays a cellar | II.7.3, §10.2 |
| J-A64.42 | the concealment multiplier on the concealed class's row (default 6), not on the building's class; accesses are map facts, a user's `addUndergroundAccess` the override | II.7.3, §10.2 |
| J-A64.43 | `AccessPoint` gains a stored `state` (open, locked, bricked), `knownTo` and a general `under` (part, element, vertex); collapsed or bricked while its element is closed is a derived reading; its kind follows the drop (door, stair, ladder, hatch) | II.7.4, II.7.3, II.6 |
| J-A65.41 | the undercity's four requirements are its existence test; one existence rule (cities and metropolises; a large town rarely; never below TOWN) and a size law of population, poverty share and disorder inside the 1 / 1–2 / ≤ 3 bound | II.7.5 |
| J-A65.42 | U1–U3 are the sewer network's rules on part 0; the undercity's streets are gallery chains in its void's part | II.7.3, II.7.5 |
| J-A65.43 | catacombs, caverns, quarries, vaults and a buried town are realism by rule; the undercity is a modest warren under `historical` and the full microcosm under `navigable`, D-3's toggle | II.7.5, II.7.6 |
| J-A65.44 | an undercity neighbourhood lives in its void source's part, a pseudo-district with a parent surface district, under its parent's quarter node, named as its underside, its prosperity the parent's field shifted lower; its outskirts are a list on the district | II.7.5 |
| J-A65.45 | quarries sized by the stone the town is built of — material read as a quantity of stone, never as a shape | II.7.6 |
| J-A65.46 | a buried old town is the `raiseGrade` conversion: the old grade's records end on the ground and their successors become the `buried` system's galleries and chambers; the ground above is re-derived on the new grade | II.7.6 |
| J-A65.47 | one system per kind, part numbers in creation order; links by proximity and a chance per pair of kinds, never guaranteed, the undercity's lifelines realised first; a link's kind follows its elements | II.7.6 |
| J-A65.48 | every underground gallery and chamber takes II.6's condition table, with a `flooded` row of their own | II.6 |
| J-A66.41 | the access edit's pieces: a forced but terrain-gated basement, the target in a fixed order, a dug connector by path search, a minimal private `dug` system to the most plausible outlet where none exists — `Features.underground` true, the sewer rows untouched | II.7.6, PART III |
| J-A67.40 | the island slots are re-drawn at an epoch at a per-year rate (`redrawPerYear` 0.1) applied over the epoch's span | II.6 |

=== RATIONALE-A ===
| J-A58.41 | Chose to give stage 2's `RingFabric` a default ring-course construction restated from NG 1.2.2's code (P19) — every ring a hexagon at its radius, all rings of a district sharing one phase, each vertex's radius moved by a centred bell of `ringJitter` × the ring's spacing, smoothed by three corner-cutting passes to 48 vertices; the first spacing the district's lower block extent plus a uniform share of the radius that remains, each further spacing × (1 + the folded four-uniform bell of §4.6), so the rings widen outward; the uncut centre a square, a green or a manor block at equal odds, and a plaza loop where the district's greenery rows give neither greens nor trees — over leaving "a radius law (a table)" unspecified, because the code reading showed what that law is, because M5's panel compares five seeded pairs per NG template (J-S34) and a ring district built by another law would fail that comparison for a reason of our own making, and because the construction is data (`ringJitter`, `ringPasses` in the `ring` template row, settable per district through `fabricParams`); the jitter's share (0.15) is ours, since the amendment gives none, and is recalibrated on those pairs (II.2; item 58 (a); amendments-c, pipeline seat D). |
| J-A58.42 | Chose to keep stage 2's per-band green target and correct only what the design said NG does — NG 1.2.2 greens a court whenever its frontage ring is complete, so its green share (23–58 % of ordinary blocks) follows block and lot sizes rather than being a target-less draw — and to adopt NG 1.2.2's pin weight decay (the chosen kind's weight divided by 10 for the rest of the block's picks, P20) inside our own per-kind, per-band probability gate, over reproducing NG's pins only on empty blocks, because the owner's greenery rule asks for greens "where appropriate to prosperity", which a per-band target expresses and a by-product of lot sizes does not, while the decay is a cheap, sourced way to stop one block repeating a kind and changes nothing else in the gate (II.3; item 58 (b), (c); amendments-c, pipeline seat D). |
| J-A58.43 | Chose to state NG 1.2.2's medium hood span (≈ 525 m, its medium area template's 1 500 model units read through the export scale of 0.35 per unit) as a descriptive scale in II.2 and to derive no default from it, over leaving it out or calibrating stage 2's district sizes to it, because Fable's evidence gate released the figure only as a labelled inference (J-Fcode-2) — useful to a reader who compares a close-up with NG's — while stage 2's sizes come from the base's own districts (II.2; item 58 (f); amendments-c, pipeline seat D). |
| J-A61.41 | Chose to name VG 1.6.9 (itch 19365073) in PART III's palisade hook and to add, qualitatively, that its code confirms the palisade-first order and steers its roads by a per-type terrain weight plus water, target and wall terms — reader-tier observations for the village rung's own calibration (provenance row D5) — over copying its constants into the base or leaving the build unnamed, because the critic's R5 lets a code constant reach the design only attached to a design decision of ours, and the village is the owner's separate product with no design decisions taken yet; the base changes nothing (PART III; item 61; amendments-c, pipeline seat D). |
| J-A63.41 | Chose to make concealment a value (`none`, `front`, `hidden`, `underground`) resolved once per institution from the dossier, then an assignment, then the class table's default-mode weights (drawn on `siting`), then `none`, with a fixed fallback chain — underground, then front, then hidden; hidden to front; front to hidden; then F-SITING's closest options — that never places a clandestine institution openly and never drops it, each step reported, over a boolean "criminal" flag or a free choice left to placement, because the owner named exactly three ways of hiding ("a front … the hidden places … the underground sewer building/network"), because the underground mode needs a navigable run (J-A14.43) and the hidden mode a hidden plot, which not every settlement has, and because "a hard row is never relaxed silently" (J-A16.43) applies to a hiding place as much as to a tannery (§4.7; item 63 (a), (b); amendments-c, pipeline seat D). |
| J-A63.42 | Chose to place a front and its concealed function as ONE item of the placement solver — the front's hard rows (so the front is plausible where it stands), the true class's soft rows and supply edges plus a preference for alley, court and hidden plots — and to record them as TWO `Use` records on one building (the front as `Building.use`, a working business; the concealed use listed in `Building.concealed`, `secret` by default), S11 building the front's template and the concealed use adding only a concealed programme, a concealed service or yard door where an alley or passage offers an access edge, and a way down (the higher cellar probability of the two rows; the access multiplier), over a building of the true class relabelled for the public or one use carrying two designations, because the owner's "would obviously not parade itself" means the whole public reading — shape, site plan, label, rooms — must be the front's, because `Use` is already a record separate from its building (J-A17.21) so a second use needs no new mechanism, because one mutation path stays (the front drives S11, J-A18.41), and because the existing knowledge filter (J-A30.83) can withhold a separate secret record's name, purpose and parts without touching the building's geometry (§4.7, §10.2; item 63 (a)–(c); amendments-c, pipeline seat D). |
| J-A63.43 | Chose that a change of the front's designation runs S11's mutator on the front while the concealed use persists (its door re-derived where its access edge survives, its concealed programme re-fitted when the stale plan is next viewed), and that relocating the concealed use leaves the front as an ordinary business — its concealed door kept as an ordinary service door and its concealed rooms returned to the front's programme at the next plan re-cut — over moving or closing the two together, because a front "can be anything" and outlives what it hid (a tavern stays a tavern when the guild moves out), because items 17 and 18 already let a use close or move while its building persists, and because keeping the door as a service door is the least-disruption reading of item 22 (§4.7; item 63 (e); amendments-c, pipeline seat D). |
| J-A63.44 | Chose to mark the concealment column's non-`none` weights and the cover table as `extension` rows, so the parity presets resolve every class to `none` and place every institution openly, and to have a village's concealed institution take a front (its hidden share is 0 and it has no sewer), over a concealment always on or a special village rule, because no reference has concealment (item 23's emulation-first) and the fallback chain already yields the front where the other modes have no ground (§4.7, §10.2, PART III; item 63 (f); amendments-c, pipeline seat D). |
| J-A64.41 | Chose to decide a basement access per building — a gate (the building has a basement and its ring lies within `accessReachM`, 5 m, of an open navigable tunnel's kerb, of an underground building's side or rear wall, or of another system's open element, tested by reads on each part) and a lottery `min(0.9, prob × (1 + age) × multiplier × crime)` from the class's per-band row, the plot's growth-stage age, the concealed class's multiplier and the staged crime term, drawn on `sewer` — keeping the neighbourhood rule's cellar stair as the fallback and the cellar a cellar (J-A12.42), over the old boolean column or an access in every basement over a network, because the owner's "selectively … where appropriate … higher chances if they are criminal" is exactly a physical gate plus a weighted chance, because "old houses" and breweries, bathhouses, warehouses and inns are more likely by the item's own list, and because a door into a sewer dwelling must stand beside the basement, never under a footprint, where II.7.3's surface constraint keeps dwellings out (II.7.3, §10.2; item 64 (a), (b), (d); amendments-c, pipeline seat D). |
| J-A64.42 | Chose to put the concealment multiplier on the concealed class's row (`ConcealmentRow.accessMultiplier`, default 6) rather than on the building's own class row as `{ prob; concealedMultiplier }`, and to treat accesses as map facts that no dossier supplies, over the route's per-class multiplier and a dossier override, because it is the concealed function that wants a way down — an assassins' house wants one behind any front, while a tavern that fronts nothing does not — so one row per clandestine class serves every cover, and because under item 20 (h) whatever the dossier does not give the map derives, a user adding an access anywhere by item 66's edit (II.7.3, §10.2; item 64 (b); amendments-c, pipeline seat D). |
| J-A64.43 | Chose to give `AccessPoint` a stored `state` (open, locked, bricked — set by the row's weights 0.6 / 0.3 / 0.1 or an edit), a `knownTo` (secret for a building with a concealed use, local otherwise, public for a stair or grating on public ground) and a general `under` (part, element, vertex), with `collapsed` or `bricked` while its element is closed as a derived reading never stored by the conversion, and its kind following the drop (a door within 60 cm to a building's wall, a stair within 3 m, a ladder beyond, a hatch for a concealed building), over storing every state change or keeping `under` a tunnel only, because a derived reading keeps `reopen` an exact inverse (as J-A11.21 keeps a tunnel's condition), because the owner's second target — "a dwelling in a sewer grid" — and the layer's other systems need a general target, and because the kind by drop is the physical reading of how one gets down (II.7.4, II.7.3, II.6; item 64 (a), (c); amendments-c, pipeline seat D). |
| J-A65.41 | Chose to answer the owner's question "what would that require?" with four conditions the stage tests before it builds — a void large enough to live in, its own plaza and streets, its own institutions, and lifelines for food, water and air — and to decide existence by one rule (cities and metropolises; a large town of 6 000 or more rarely, a 0.2 draw; never below TOWN) with a size law `H = min(N × u × (P ÷ P_ref) × (1 + disorder), 0.6 × the squalid and poor households)` inside the owner's 1 / 1–2 / ≤ 3 bound, over a fixed undercity per rung or a count drawn without inputs, because the owner asked for a place, not more sewer-front dwellings, and bounded it at one to three neighbourhoods, because the item ties its size to population, poverty and disorder, and because the cap on the poor bands keeps the surface's own poor on the surface; at the default roster a city holds one neighbourhood and a metropolis two, which Fable's single-rule reading of item 65 (c) confirms (II.7.5; item 65 (b), (c); amendments-c, pipeline seat D). |
| J-A65.42 | Chose to state U1–U3 as the sewer network's rules on its part (part 0) and to give the undercity streets of its own — gallery chains in its void's part, walkways across its chambers — over forbidding the undercity streets by U2's letter or relaxing U2 in the sewer, because the owner's "there are no sewer alleys" was said of the sewer, where it stays true, while an undercity "is still part of a sewer network or cavern or catacomb" yet needs streets to be a town (II.7.3, II.7.5; item 65 ruling 2; amendments-c, pipeline seat D). |
| J-A65.43 | Chose to read D-3 so that catacombs, caverns, quarries, vaults and a buried old town are realism, existing by rule and hidden with the layer, while the undercity is a modest warren under the sewer's `historical` preset (at most one neighbourhood, vaults, catacombs, quarries or a buried town as its void, half the shares) and the full microcosm with the 1 / 1–2 / ≤ 3 bound under the `navigable` preset, D-3's fantasy toggle, over one undercity for both presets, because the sources are historically attested (the Paris quarries, bridge and street vaults, buried street levels) while a city of the riffraff in a cavern reads as fantasy, and D-3 keeps fantasy behind a named toggle; the scope part records D-3's clause (II.7.5, II.7.6; item 65 ruling 3; amendments-c, pipeline seat D). |
| J-A65.44 | Chose to put each undercity neighbourhood in the arena part of its void source — never in the sewer's part 0 and never in a part of its own — as a pseudo-district with a `parent` surface district (the one above the largest share of its main chamber), joined to its parent's quarter node and named as that quarter's underside, its prosperity the parent's field shifted by −0.35, its outskirts the sewer-front blocks listed on it, admitting rows, hovels, informal clusters and institutions under ceiling-capped heights, over its own part with copied chambers or the sewer pseudo-district's "family of its own", because a chamber copied into a second arena would be stored twice (J-A12.43, J-A65.31), because the owner's undercity is "simply the less than savory shadow and extension of the full settlement" — a shadow belongs under the quarter it shadows — and because the kernel's J-A65.31 makes a grouping across parts a link between records (II.7.5; item 65 (c′), (e), ruling 4; amendments-c, pipeline seat D). |
| J-A65.45 | Chose to size quarries by the stone the town is built of — the wall volume of the stock whose material is stone and of the enceinte, × 1.6 for waste — reading material here as a quantity of stone, never as a shape, over ignoring the stock or sizing quarries by population, because the item derives the voids from "the town's stone building stock" (the stone came from somewhere) and the owner's materials rule ("only represented by a change in texture or color … nothing to do with the shape") concerns a building's shape, which this reading never touches (II.7.6; item 65 (a); amendments-c, pipeline seat D). |
| J-A65.46 | Chose to make a buried old town the conversion `raiseGrade { region; raiseCm; cause }`, by an epoch or by hand: the region's ground is raised by S1's terrain operator, its records at the old grade end on the ground (`cleared`) and their successors become the `buried` system's galleries (the old streets) and chambers (the old ground storeys) by §6.3's succession, while the ground above is re-derived regrowth-first on the old centrelines, over copying the old town into the underground or deriving buried towns at generation, because no geometry may live in two arenas at once (J-A12.43), because succession keeps each old place's history addressable, and because "the evolution log supplies it" — a settlement without that history has none, unless the staged port names such a scar (II.7.6; item 65 (b)(1), ruling 5; amendments-c, pipeline seat D). |
| J-A65.47 | Chose one system per kind, each taking the next part number at its creation (catacomb, cavern, quarry, vaults at generation; buried and dug when first made), and a connection graph drawn by proximity (10 m in plan, 8 m in depth, one link per 60 m) and a chance per pair of kinds, its kind by weights and following its elements' condition, the undercity's lifelines realised before any lottery, over one part per complex or guaranteed links, because the owner said the systems connect "with varying degrees of connections and access between them (not always)", because two complexes of one kind that meet should join as galleries do, and because an undercity without a lifeline could not live (II.7.6; item 65 (a), (d); amendments-c, pipeline seat D). |
| J-A65.48 | Chose to let every gallery and chamber of the undercity and the other systems take II.6's tunnel condition table and conversions, adding one row — `flooded`, for an element below the water table — over a second ladder for voids, because the owner said the underground fades "like the walls … some tunnels simply cave in or become decommissioned", which holds for every void, and one table keeps one reading for the renderer, the reader and the locality rules (II.6; item 65 (c); amendments-c, pipeline seat D). |
| J-A66.41 | Chose the generators the access edit's closure calls — the basement by §2.6's decision with the probability forced but the terrain gate kept (a half cellar, a walk-out or a hatch to a crawl space before a stated refusal), the target in a fixed order (the sewer or a sewer dwelling within reach, then another system's element or an undercity walkway within 60 m), a dug connector by the kernel's path search around foundations and cellars and above the water table, and, where nothing lies within reach, a minimal private `dug` system to the most plausible outlet by the building's outlet row — `Features.underground` turning true while the sewer rows stay untouched — over a stair to nowhere or a refusal wherever no network exists, because the owner asked that the edit "generates all the necessary pieces", because a user's request "overrides the probability, not the physics" (J-A29.22 stands), and because a smugglers' tunnel is not a sewer network (II.7.6, PART III; item 66 (a); the closure rule itself is the determinism part's §7.3 item 9; amendments-c, pipeline seat D). |
| J-A67.40 | Chose to re-draw the island slots at an epoch at a per-year rate, `redrawPerYear` 0.1 applied as 1 − (1 − r)^years over the epoch's span, over re-drawing every slot at every epoch, because under the weekly clock of item 67 a per-epoch draw would re-decide the islands fifty-two times a year and make them flicker, which the route's ruling 2 for item 67 corrects for every per-epoch row; the rate is ours, near one re-decision a decade, and calibratable with the staged engine (II.6; item 67 ruling 2 as it reaches II.6's slots; amendments-c, pipeline seat D). |

=== END ===
