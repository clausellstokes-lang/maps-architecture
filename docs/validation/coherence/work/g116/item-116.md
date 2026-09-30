116. **OWNER RULE — Building materials come from terrain, resources and trade, paired with prosperity; a material that is
     not native arrives only by trade with a named settlement that has it (owner, 2026-09-30 ~01:05, refined ~01:10; the
     trade partners ~01:15).** Owner: "oh and material for buildings is determined by terrain, resoucres, and trade. paired
     with prosperity. Think about it. if you are in a river nearby a forrest for timber but no quarry, then most building
     material is going to be wood based. That is not to say that they can't have stone buildings, that would come from trade
     and be reserved for teh very rich as they are exotic and expensive to transport. Pairing all of this with neighborhood
     prosperity, if a town has both a quarry and timber, the richer areas will have buidlings mostly made out of the more
     expensive material stone, the middling areas will have buildings mixed btween wood and stone or individual buildings
     that is a combination of the two. Expand this to all relevant pieces. What do you think?" / "also to say that material
     not native requires trade which means isoalted settlements cant have non nattive materials or grow to have them until
     and unless they trade specifcially with another settlement that has that material." / On which partners count, after
     the program's recommendation (every neighbour SettlementForge names counts, supplying the materials its named exports,
     goods or resources show; a settlement with no named neighbour is native-only whatever its access; one port-side partner
     record, because SettlementForge is reworking trade): "note that we are reworking trade as we speak. but for now its
     your recomendation". Bundled with items 114 and 115 into the coherence pass's Rewrite phase (owner, ~01:12). **What
     exists (CONFIRMED by reading the coherence pass's base files and the volumes):** a material is a rendering attribute
     only (§2.6, item 19; the owner, 2026-09-26: "different materials for construction is only represented by a change in
     texture or color. It has nothing to do with the shape"); `MaterialRow`'s default rows reproduce FTG's model (item 23):
     one share mix per growth stage, overridden by district kind and by class (churches stone by row), "never by a material
     keyed to the prosperity band", with an optional regional shift off by default; `Building.material` is one
     `{ walls; roof }` pair, `RoofSpec.material` a second roof home with no writer; nothing reads terrain, resources or
     trade for a material; `TradePartner` carries no goods, the dossier's trade links are read only as a count, and the
     supply web serves every material good by a generic `import` with no partner; retaining walls, raised ways and bridges
     already key their material by band; the salvage ledger is keyed by a free string and is "never a hard constraint"; the
     underground's quarry voids are sized by all the stone the town is built of; three thresholds say "there is stone or
     clay here" (V04 0.5, V07 0.4, V11 none); V07 cites a "geology row" that does not exist. Program's interpretation
     (vetoable; J122; the working notes are docs/validation/coherence/work/g116/):

     **(a) THE WORDS AND THE VOCABULARY.** A settlement's **material supply** states, for each **family**, whether it is
     **native** — the owner's word: its source lies within reach, by `land` (the site's own quarry, woods, clay, reed or
     straw, slate, lead ore or ground) or by `ruins` (the salvage ledger's unspent stock, per site) — **traded** (only
     through a named partner that supplies it, (c)) or **unavailable**. The owner's "isolated settlement" is, in the design,
     a **native-only** settlement: one no partner supplies. V07's road form `isolated` and SettlementForge's access key
     `isolated` keep their meanings, and neither alone makes a settlement native-only or not. The families
     (`MaterialFamily`) are `stone`, `slate`, `fired_clay`, `timber`, `earth`, `thatch`, `lead`. SettlementForge's
     `materialFamily` token is the same concept in its words, mapped onto ours by V08's `materials` row. The materials
     (`MaterialDef`, V11's rows; every id is a texture and colour role, §8.2) — base cost in cost units, "masonry", "timber"
     and "earth" their mass class (h), the factors cost multipliers where 0 means "not built there":

     | id | requires | slots | mass | base cost | factors (defaults; V11 states the full rows) |
     |---|---|---|---|---|---|
     | `ashlar` | stone | walls, enceinte, bridge, harbour, raised, retaining, lining | masonry | 5.0 | — |
     | `rubble` | stone | the same | masonry | 3.0 | — |
     | `dry_stone` (dry-laid or clay-bonded fieldstone) | stone, native only | walls, retaining, enceinte (village) | masonry | 1.6 | — |
     | `brick` | fired_clay | walls, enceinte, bridge, harbour, raised, retaining, lining | masonry | 3.5 | era c12 × 1.4, c13 × 1.2, c15 × 0.9 |
     | `timber_frame` | timber | walls | timber | 2.0 | — |
     | `log` (new) | timber, native only | walls | timber | 1.8 | cold × 0.9, temperate-coniferous × 1.0, mixed × 1.3, else 0 |
     | `timber` (sawn boards) | timber | walls (shacks, sheds, deck buildings), enceinte (palisade), bridge, harbour, raised (never an aqueduct), lining (shoring) | timber | 1.5 | — |
     | `timber_crib` | timber, native only | retaining (steps ≤ 150 cm), harbour | timber | 1.5 | — |
     | `wattle_daub` | timber and earth, native only | walls | timber | 1.2 | — |
     | `cob` | earth, native only | walls | earth | 1.0 | arid 0 |
     | `adobe` (new; sun-dried earth brick) | earth, native only | walls | earth | 1.0 | arid only |
     | `earth_bank` | earth, native only | retaining (steps ≤ 150 cm), enceinte (rampart), harbour (mole) | earth | 0.8 | — |
     | `turf` | earth, native only | roof: pitched, pitch 0.3–0.8 | — | 0.8 | arid 0 |
     | `mud` (new; the flat earthen roof) | earth, native only | roof: flat | — | 0.8 | arid only |
     | `thatch` (reed or straw) | thatch | roof: pitched, pitch ≥ 0.8 | — | 1.0 | — |
     | `shingle` | timber | roof: pitched ≥ 0.5, cone, pyramid | — | 2.0 | — |
     | `clay_tile` | fired_clay | roof: pitched ≥ 0.3, dome | — | 3.0 | era as `brick` |
     | `stone_slate` (new) | stone | roof: pitched ≥ 0.5 | — | 3.5 | — |
     | `slate` | slate | roof: pitched ≥ 0.4, cone, pyramid | — | 4.0 | — |
     | `lead` | lead | roof: every kind but `tent` | — | 8.0 | — |
     | `canvas` | nothing (carried) | roof: `tent` only | — | 0.5 | — |

     "Pitched" is `gable`, `hip`, `shed`, `pyramid` and `cone`; `skeleton` and `plain` read as the kind they downgrade from;
     `none` takes no covering. A material marked **native only** (`MaterialDef.nativeOnly`) is never drawn from a partner:
     fieldstone, logs, wattle rods and earth are not worth carrying, so it is a candidate only where its families are native
     (dry stone by land or by ruins). The roof FORM (the climate row and the class, §4.9, §4.7 S11) chooses which coverings
     may be drawn — shape decides the covering, never the reverse. `timber` stays one id for sawn boards, whether a board
     wall or a deck. Cost factors also come from the climate row, the culture row (keyed by `site.culture`, our own rows,
     clean-room: no reference or SettlementForge prose copied), the era row and a region pack's rows ((m)). `Way.surface`
     gains `brick` ((i)).

     **(b) NATIVE — THE LAND AND THE RUINS.** Distances are measured from the frame's origin (0, 0), which is fixed before
     S2 and lies within a sixth of the frame of S3's centre, so the supply never depends on siting. A family is native by
     land when (thresholds are V11 cells, one per family, and every reader uses them — V04's stone cells, V07's village
     classes and V11's `req` gates included):

     | family | native by land when | a dossier deposit (wins over the raster) | the standalone toggle that clamps it |
     |---|---|---|---|
     | stone | `SiteResources.stone` ≥ 0.5 on a cell within 2 000 m — II.7.6's `reachM`, so "stone is native" holds exactly when V04 finds a stone cell | `stone_quarry` | `quarries` |
     | timber | `SiteResources.timber` ≥ 0.4 over ≥ 20 ha within 5 000 m; at an epoch, the standing coppice, lumber, wild and managed wood within 5 000 m ≥ 20 ha | `managed_forest`, `mountain_timber`, `shipbuilding_timber` (`ancient_grove` is a reserve and is never felled) | `logging`, `forests` |
     | fired_clay | `SiteResources.clay` ≥ 0.4 on a cell within 2 000 m AND kiln fuel is native: timber native, a marsh within 3 000 m (peat) or a coal deposit | `river_clay`; `coal_deposits` for the fuel | — |
     | thatch | reed: a marsh (a `marsh` land use or bank kind, S0's marsh) within 3 000 m; or straw: `fertile` ≥ 0.4 over ≥ 10 ha within 3 000 m — at an epoch, the standing arable within 3 000 m ≥ 10 ha | `marshlands` | `fertileLand` (straw only) |
     | slate | `Terrain.slate` | none (the relief draw decides on a dossier map too) | the site request's `slate` |
     | lead | `Terrain.lead` | `precious_metals` | the site request's `lead` |
     | earth | always — the floor: every settlement can dig its own ground; its costs × 1.5 where no cell within 2 000 m has clay ≥ 0.2 or fertile ≥ 0.4 | — | — |

     **The deposit rule:** for a family the dossier lists, a deposit `available` (or `discovered`, from the next epoch)
     makes it native whatever the raster (S1 raises the raster's floor as a landscape toggle does); a family whose listed
     deposits are all `depleted` or `removed` is not native by land whatever the raster or the terrain row; a family the
     dossier does not list reads the raster, as standalone — which is also the rule for a dossier that names no resources
     (the derived default from terrain and climate). **Slate and lead:** S0's site request gains `slate` and `lead`
     (`'auto'|'on'|'off'`, default `auto`), resolved by S1 (10) beside the geology flag on two uniforms appended to
     `blueprint.features` after every draw that row already lists (slate, then lead), each drawn whether or not its toggle
     is set, recorded in `autoResolved`: P(slate) by relief plain 0 · rolling 0.05 · hilly 0.25 · mountainous 0.4; P(lead)
     0.3 where `Terrain.mining` holds, else 0; stored as `Terrain.slate` and `Terrain.lead` (booleans, §2.3), editable on
     the terrain row as `geology` is; a dossier's `precious_metals` sets lead `on` while available; a sky island's terrain
     takes both false. **The ruins basis:** a family is native by ruins AT A SITE while the ledger's unspent credit of that
     family from sources within the haul radius (250 m, §4.11) covers the pick's debit (the class row's `salvageM3` for that
     material); the ledger is keyed by family ((j)). **What never licenses:** no rung, population, prosperity, era, epoch
     count or growth makes a family native or traded — only the land, the ruins or a partner.

     **(c) TRADED — ONLY BY A NAMED PARTNER THAT HAS IT.** One record carries trade into the rule, the one the port and the
     blueprint already fill (§7.7 layer 2):

     ```ts
     interface TradePartner { key: string; mode: 'road'|'river'|'sea' /* the route; (e) prices it */; weight: number; bearingCdeg: Cdeg; relationship?: string;
       source: 'dossier'|'derived'|'realm'|'declared' /* 'declared': a standalone partner the user declared (V09) */;
       supplies: { family: MaterialFamily; from: 'exports'|'resources'|'link'|'declared' }[] /* item 116: the families this partner has; [] for
         every derived partner; filled by DR3 from the dossier, by the declaration standalone */;
       distanceM?: number /* the realm block's distance, when the host sends one */ }
     ```

     A family is traded when some partner with weight above 0 lists it in `supplies`. **From a dossier** (DR3, amended; V08
     writes the rows): the generation neighbour's `primaryExports`, resolved through V11's `goodWords` to goods whose new
     `material` column names a family (`from: 'exports'`); its supply chains' `resourceKey`, through V08's `deposits` row's
     new family column (`from: 'resources'`); an `import` trade link's good — its `goodId` through a goods-id row, or its
     `good` label through `goodWords` — on the partner it names (`from: 'link'`; an export link licenses nothing); a
     `neighbourNetwork` link names a partner, which supplies what those records show for the same name, else nothing.
     `DossierDigest.economy.partners[]` gains `exports?: string[]` (our good ids), `resources?: string[]` (deposit keys) and
     `access?: string` (the neighbour's access key), and §7.7 item 1's never-read list admits exactly
     `neighborRelationship.primaryExports`, `.activeChains[].resourceKey` and `.tradeRoute`. **Standalone:** the recipe's
     partner list, empty by default (Surprise me declares none), each declared partner with a name, a route and its supplies
     (V09's Trade control). **Never:** a `derived` partner (DR3's per-through-route partners that weigh the gates for
     `TradeFlow`), a partner of weight 0 (hostile, or a suppressed economy), the label lists (`primaryImports`,
     `necessityImports`, `transit`), `tradeDependencies`, a magical transit path, a `realm` partner beyond the dossier
     partner of its key (the realm block adds a bearing and `distanceM`, never supplies), and the supply web's generic
     `import` (k). **The route:** DR3's `mode` fill gains a first step — a partner whose own access key the dossier gives
     takes the mode of the pair (this site's harbour and the neighbour's `port` → `sea`; this site's navigable river and the
     neighbour's `river` or `port` → `river`; else `road`); the rest keep DR3's water-fraction fill. **The adapter:**
     SettlementForge is reworking trade (the owner); DR3's supplies fill is the only place that reads its trade fields, and
     the material rule reads only `TradePartner`. When the reworked model lands, V08 re-points DR3's inputs through the
     port's migration and change envelope (J121); nothing downstream changes. The row is complete for today's dossier. **The
     consequence, stated plainly:** SettlementForge names a neighbour with goods rarely (one birth in 155 carries a trade
     link), so most dossier maps are native-only at creation and gain a traded family only when a partner arrives (receipt
     F14, at the next epoch); a port, river, crossroads or road town with no named partner imports no material.

     **(d) THE SUPPLY — ONE RECORD, DERIVED.**

     ```ts
     type MaterialFamily = 'stone'|'slate'|'fired_clay'|'timber'|'earth'|'thatch'|'lead';
     interface MaterialSupply {   // §2.7; item 116 — Document.derived.materialSupply: derived, never canonical, outside every digest
       epoch: number;
       families: Record<MaterialFamily, {
         status: 'native'|'traded'|'unavailable' /* the town-wide summary: native by land, else traded, else unavailable; the ruins basis is per site ((b)) */;
         land?: { reasons: string[] /* the facts, as §5.4 reason codes: native_raster, native_deposit, native_toggle, native_flag, native_woods, native_floor */; tau: number /* (e)'s native factor at the nearest source */ };
         partners: { key: string; route: 'road'|'river'|'sea'; tau: number }[] /* every partner that licenses it, cheapest tau first */;
         ruinsM3: number /* the ledger's unspent stock of the family, town-wide */ }> }
     ```

     **Producer:** a new step S1 (11), after the resources and the terrain flags and before S2; and §4.11's epoch prelude
     (V06 §3.2 row 1), after the epoch's slice, deposit states and `TradeFlow` apply and before any build; recomputed on
     load (like `TradeFlow`). **Consumers:** S2 (producer demand and the web's material goods, (k)); S7 (enceintes, gates,
     towers, the castle curtain, bridges, harbour works); S10's levelling (retaining walls); S10a (way surfaces, V01's
     rule); S11 (buildings); §4.9 (the land uses that follow native sources; the timber shortfall); §4.11 (builds, rebuilds,
     refurbishments, fire rebuilds, the ruins stock); II.7.2 (tunnel linings); II.7.6 (quarry voids); the raised-way support
     step; V05, V07, V09's view and panels, V10's why, V12's measures, §11.1's exports. Each family entry is a derivation
     slice (§2.8's `DerivationRecord.slices`), so a change of the supply re-derives exactly the entities whose picks read a
     changed family (§7.6's slice rule).

     **(e) COST.** A candidate material m's cost at this settlement, for a pick at a site:
     `c(m) = baseCost(m) × climate(m) × culture(m) × era(m) × region(m) × τ`, τ the cheapest basis available at the site
     (for a material requiring two families, the dearer family's τ): native by land `τ = 1 + haul × bulk × d / R` (haul 0.1;
     R the family's radius in (b); d the frame origin's distance to the nearest source cell; at most 1.3); native by ruins
     `τ = salvageFactor` (0.8: reused stone is cheaper than quarried); traded
     `τ = importPremium × (1 + routeRate[route] × bulk × dist)` with importPremium 1.5 (margins, tolls and risk), routeRate
     sea 0.3 · river 0.45 · road 1.5, `dist = clamp(distanceM / refLegM, 0.5, 3)` with refLegM 30 000, 1 when the distance
     is unknown. `bulk` is the family's good's `ResourceRow.bulk` (stone, slate, fired clay, timber 3; thatch and lead 2);
     earth is never traded and its τ is 1, its poor-ground factor aside. So water carriage is far cheaper than land, a port
     cheapest, a road dearest, and stone or timber brought by road costs several times its native price.

     **(f) MEANS — PAIRED WITH PROSPERITY.** A builder's **means** M is the cost level it can pay. For a plot: the value its
     new fabric is built for — `Plot.builtProsperity` as the build writes it; at generation the field value — first clamped
     into its district's band range `[floor, ceiling]` (item 72 (d‴): the neighbourhood's bounds), then read on the band row
     `[lo, hi]` of the band it falls in, interpolated along the value between that band's cuts (§4.5's continuous rule), ×
     `rungMeans[rung]`:

     | band | squalid | poor | modest | comfortable | prosperous | rich |
     |---|---|---|---|---|---|---|
     | means `[lo, hi]` | 0.6–0.9 | 0.9–1.3 | 1.3–2.3 | 2.3–3.2 | 3.2–4.5 | 4.5–10 |

     `rungMeans` THORP 0.5 · HAMLET 0.6 · VILLAGE 0.75 · TOWN 1.0 · CITY 1.15 · METROPOLIS 1.3. **`means.top`** is the `hi`
     of item 114's highest allowed band — 10, the `rich` row's, where no ceiling binds. **Which prosperity reads which:**
     the plot's built value sets its place in the cost order; the district's band range bounds it (a squalid street holds no
     ashlar house by derivation); the plot's field band, its occupants, never moves a standing material (a decline leaves
     the stone house standing, its condition falling). **Institutions:** a class whose `MaterialPreference` row gives a
     `prestige` reads `M = means.top × prestige × patronage × rungMeans` (patronage J-A72.45's [1, 2]) and is not clamped by
     its district's range — an institution builds with its own purse, not its street's (chapel 0.8; church, monastery, town
     hall, guildhall 1.0; tower house 0.9; mage tower 1.2; cathedral, castle, keep, palace 1.5). **Works:** a public or
     lordly work reads `W = means.top × rungMeans × works[kind]` — walls 1.0, castle curtain 1.5, bridge 0.8, harbour 0.8,
     raised way 1.0, a retaining wall on a civic face 0.8, lining 0.5, paving 0.6. **Item 114** (its (b)–(c): the ceiling
     caps the band, never the field value): the town's wealth reaches the means only through the bands the
     field and the ceiling leave — a plot banded at the highest allowed band reads that band's row along its value up to its
     `hi` (the band's upper cut reading 1), a district's range is lowered to the ceiling before it clamps, and institutions
     and works read `means.top`, so the ceiling limits how much dear material can appear by construction; this item adds no
     wealth term of its own (one mechanism, item 114's). **Item 115:** a floating island's plots read their own bands; the
     high economy item 115 requires makes island fabric dearer, from the same supply ((i)).

     **(g) THE PICK — ONE FUNCTION FOR EVERY CONSUMER.** `pickMaterial(consumer, slot, M)`: (1) **candidates** — the
     materials the consumer's `MaterialPreference` row admits for the slot, that the roof form admits (a covering), that are
     not zeroed by a factor, and whose every required family is native (by land, or by ruins at this site) or traded (a
     material marked native only: native); (2) their costs by (e), in cost order, materials within `tieBand` (5 %) of each
     other counting as one place whose members share it by the preference row's weights; (3) **affordable** — the dearest
     place with `c ≤ M`, else the cheapest; **next** — the next dearer place, with
     `t = clamp((M − c_next × (1 − blend)) / (c_next × blend), 0, 1)`, blend 0.2; (4) draws on concern `material`, keyed by
     the consumer's lineage and the slot, always drawn in full (four for a building's walls, two for its roof, two for a
     structure): `u₀ < t` takes next, else affordable; `u₁` chooses within the place by the weights; for a building's walls,
     `u₂ < mix × 4t(1 − t)` (mix 0.5) makes it mixed ((h)) and `u₃` chooses the part. So the poor take the cheapest, the
     rich the dearest they can pay, the middling mix exactly where two materials meet, and nothing is taken above one's
     means save a partial take within 20 % below the next price. With fixed draws the pick is monotone in M, so a richer
     rebuild never picks a cheaper material. **Worked, at TOWN, temperate, the quarry and the woods 1 km out:** cob 1.0,
     wattle ≈ 1.3, dry stone ≈ 1.8, timber frame ≈ 2.1, rubble ≈ 3.45, ashlar ≈ 5.75; with the woods, no quarry and a river
     partner that has stone, rubble ≈ 10.6 (by sea ≈ 8.6, by road ≈ 24.8), so only rich plots with means ≥ 8.5 reach it, and
     a parish church at prestige; by road no house and no parish church does; with no partner, none at all. The resulting
     wall shares per band (≈ % of each band's buildings; the defaults' outcome, which V12 calibrates and T116-4 and T116-6
     bound):

     | case | squalid | poor | modest | comfortable | prosperous | rich |
     |---|---|---|---|---|---|---|
     | quarry and woods native | cob | cob 60 · wattle 40 | wattle 35 · fieldstone 28 · timber frame 37 | timber frame 66 · rubble 16 · mixed 18 | rubble 96 · timber frame 4 | ashlar 88 · rubble 12 |
     | woods native, no quarry, a river partner with stone | cob | cob 60 · wattle 40 | wattle 61 · timber frame 39 | timber frame | timber frame | timber frame 80 · rubble 10 · mixed (stone ground storey) 10 |
     | woods native, no quarry, no partner | cob | cob 60 · wattle 40 | wattle 61 · timber frame 39 | timber frame | timber frame | timber frame |

     **(h) MIXED CONSTRUCTION — "INDIVIDUAL BUILDINGS THAT IS A COMBINATION OF THE TWO".** `Building.material` becomes:

     ```ts
     interface BuildingMaterial {   // §2.6; a rendering attribute only: texture and colour, never shape
       walls: string /* the wall material of every part `mix` does not name */; roof: string /* the one roof covering: RoofSpec.material is retired */;
       mix?: { part: 'upper'|'gable'|'outshots'; walls: string /* the named part's wall material; at most two wall materials per building */ };
       origin: { walls: MaterialOrigin; roof: MaterialOrigin; mix?: MaterialOrigin } }
     type MaterialOrigin =   // where a built material came from, recorded when it was built or set (the epoch §4.11 numbers; 0 at generation)
       | { kind: 'native'; basis: 'land'|'ruins'; epoch: number }
       | { kind: 'traded'; partner: string /* TradePartner.key */; route: 'road'|'river'|'sea'; epoch: number }
       | { kind: 'dossier'|'edit'|'rows' /* rows: the parity MaterialRow, (n) */; epoch: number };
     ```

     WHETHER a building is mixed is decided by cost (the blend zone of (g), peaking where two materials meet — the middling
     streets); WHERE each material goes is decided by mass for `upper` and `gable` (heavier below and at the gable: masonry
     over earth over timber) and by cost for `outshots`. `upper` — the ground storey takes the heavier, every storey above
     the lighter (a stone or brick ground storey under timber-framed upper storeys; a stone plinth storey under adobe);
     `gable` — the gable ends of the main wing, with every chimney stack of the building, take the heavier, the other walls
     the lighter (a stone chimney gable on a timber house); `outshots` — the main range takes the dearer, the wings of role
     `back` or `service` the cheaper. Eligibility is read from facts S11 holds: `upper` needs at least two floors, `gable` a
     gabled main wing, `outshots` a base wing of role `back` or `service`; the part is drawn by the pair's
     `MaterialMixRow { lower; upper; parts }` (V11: masonry over timber and masonry over earth — upper 0.6, gable 0.3,
     outshots 0.1; earth over timber — upper 0.5, outshots 0.5; a pair of one mass — outshots only), renormalised over the
     eligible parts, and none eligible leaves the building single. A building's chimney stacks draw in its heaviest masonry
     or earth wall material, else in the roof tone as today. One roof covering per building. A mixed building's massing,
     composition, plan, heights and datum are byte-identical to the same building unmixed (item 19).

     **(i) EVERY PIECE.** Each piece calls the pick with its slot and its means; a structure's KIND follows the picked
     material's mass, and its material within the kind is texture and colour only.
     * **Roofs** — thatch where reed or straw is native, slate where slate, clay tile where clay and kiln fuel, shingle
       where timber, stone slates where stone, lead for the rich and for churches (prestige), turf and mud as the floor;
       every covering admitted by its roof's form ((a)).
     * **Town walls, gates, towers and the castle** (S7, §4.8) — the enceinte's `material` by the pick at the works means
       over masonry, `timber` (a palisade) and `earth_bank` (a rampart): stone where it is affordable, brick where clay is
       native and stone is not, else timber, else earth — earth is always native, so the pick never fails here. Gates and
       towers take their enceinte's material; the castle curtain reads the castle factor; the keep is a building of prestige
       1.5. The trace, closure and grading are item 106's, untouched: material never moves a wall.
     * **Bridges** (S7) — `Bridge.material` (new) by the pick at the bridge means; `Bridge.kind` `'stone'` for a masonry
       material, `'timber'` for timber; `draw` and `ford` as today. A crossing with neither: S7's ford where the river
       admits one, else the crossing stays a `site`, reported `bridge_no_material`, and the route takes F-ROUTE's
       `no_crossing` rung.
     * **Harbour works** (S7) — quays, moles and breakwaters: `Way.material` (new, with `materialOrigin`) over masonry,
       `timber_crib` and `earth_bank`; piers and jetties over `timber` and masonry, a pier with neither omitted, reported
       `pier_no_material`; a deck building reads the `deck` preference row (light materials: timber frame, boards, brick).
     * **Retaining walls and raised ways** (item 110) — V11 §3.24.1's and §3.24.2's band rows become preference rows (the
       admitted materials and their weights), the band entering through the means: a private terrace reads its high side's
       plot, a civic face at CITY and METROPOLIS the civic works means; `earth_bank` and `timber_crib` only for steps ≤ 150
       cm; a raised way's picked mass sets its structure kind, which sets `pierSpacingM` (item 110 (b)'s rule, a structural
       kind like a bridge's, never a material's look); an aqueduct admits masonry only. The raised way's material is stored
       as `Way.material` once built. A step above 150 cm with no masonry available is split by the levelling's terrace rung,
       else left unlevelled, reported `retaining_no_material`; a raised way with no admitted material is not raised,
       reported `raised_no_material`.
     * **Paving and market surfaces** (V01's `way.surface` rule, S10a's end) — the table keeps its structure and its band
       reads; each surface needs its family: `paved` (setts) stone, `cobble` stone or a river or beach within 3 000 m (its
       pebbles), `brick` (new) fired clay native from c14, `planks` timber; a traded family only where the paving works
       means reaches it; the fallback order paved → cobble → brick → planks (quays, piers and bridges, and ways fronted at
       comfortable or above) → dirt. The era row's `market paved` chance applies only where `paved` is admitted.
     * **The underground** — `Tunnel.lining?: string` with `liningOrigin?` (II.7.2; new): masonry, `timber` shoring, or
       absent (unlined earth, or rock-cut where the ground class is rock), by the pick at the lining works means, texture
       only — the section is the profile row's; V04's own dug passages follow the same rule; catacomb galleries and caverns
       are rock and carry none. **Quarry voids** (II.7.6, V04 §3.5.3) count only fabric whose origin is native stone by land
       — buildings by their stone parts, enceintes and towers by `materialOrigin` — so traded or robbed stone lays no local
       working and a stoneless site lays none.
     * **Islands** (V05) — an island's buildings read the settlement's supply with their own plots' means; the island's
       rock, its conjured water and its magical structures (the floating stair, a bridge of light) are neither a source nor
       a material; a landfall's rock credits the ledger as `stone` (native by ruins within the haul radius).
     * **The village** (V07) — the same rows and rule at the village rungs through `rungMeans`, the `v.` classes with their
       own preference rows; the prime case: a standalone village with no declared partner is native-only.
     * **Interiors** (V03) — the plan's exterior walls take their storey's material (ground or upper), a gable segment and
       the stacks the gable part's; wall thickness, openings and stair kinds never read a material.
     * **Institutions** — prestige ((f)): a stave church in a timber town with no stone partner; a brick church or cathedral
       where clay is native and stone is not; a stone church brought by river where the partner ships it and the purse
       reaches it; never a material the supply lacks.
     * **Culture and era** — cost factors only (the culture row's building block and the era row, V11), never a material
       outside the supply.
     * **Names** — V01's naming features gain `material`: a district whose buildings are ≥ 60 % one wall family different
       from the town's dominant family may take a name feature from it ("Stone Row", "Brick Lane"; words ours, V11).

     **(j) OVER TIME (V06; §4.11).** The owner's "can't have … or grow to have" governs construction. (1) **Standing fabric
     keeps its material and origin** whatever the supply later does; a repair (`reoccupy` from derelict, a `repair` Works)
     is in kind. (2) **Building re-picks** at the epoch's supply: a new build, a `rebuild`, a `reuse … build`, a fire
     rebuild, and a **completed upward refurbishment** (the `mutate` that raises `builtBand`, §4.11) — which re-picks at the
     new built value and keeps its material when the new pick would be cheaper, so a quarter grown rich is rebuilt over time
     in dearer materials and a refurbishment never downgrades. (3) **A partner arrives** with the first epoch whose slice
     lists it (a dossier trade receipt F14 enters the next epoch's slice; a timeline entry declares one standalone): its
     families are traded for that epoch's builds. **A partner leaves** (or turns hostile, weight 0) with the first epoch
     whose slice no longer licenses it: its families are unavailable to that epoch's builds; buildings raised with them keep
     them; new building falls back to the pick over what remains. (4) **Native sources open and end**: a deposit
     `discovered` (from the next epoch) or put `available`, a landscape toggle turned on in a timeline slice, woods regrown
     past the test; a deposit `depleted` or `removed` (receipt F13), a toggle turned off, or the standing woods cleared
     below the timber test by V06's conversions. (5) **Ruins**: `robStone`, `clear`, `dismantle`, `demolish`, a ruined span
     and a landfall credit the ledger BY FAMILY (V11 §3.18's yields per material: timber frame's "timber 8, infill 4"
     credits timber 8; earth credits nothing reusable); a build of a family native only by ruins debits it and is built only
     while the stock within 250 m covers the debit, else the pick falls back (`ruins_stock_short`) — the ledger never
     creates a material (J-A8.45 amended); for a family native by land or traded it stays a flow record. A mixed building
     credits each part by its share. (6) **Fire** (V06 §3.11.2 (4)): the rebuild shift reads the supply — for
     `fire.rebuildYears` after a fire a rebuild on a burnt plot takes the least flammable covering and wall material among
     the candidates within `fire.ordinanceStretch` (1.25) × its means, the historical ordinances; none available leaves the
     pick unchanged, reported `fire_rebuild_unavailable`. Flammability and flood collapse read a building's `walls` — for
     every mix part, the ground storey's and main range's material. (7) **The history replay** (item 113): each coarse epoch
     reads the present partner set (the dossier names no dated partner, and none is invented for the past) and treats a
     deposit listed `depleted` or `removed` today as available in every replay epoch before the last, so a peak city is
     built in the stone it once quarried; remnants keep their materials; a refounded settlement builds from its ruins' stock
     while it lasts. (8) **Decline** leaves fabric standing in its material, its condition stepping down. (9) **The
     chronicle** names each cause ("1410: rebuilt in timber; no stone came up the river after Kellmoor's trade ended";
     "1352: the quarry at Hollins worked out").

     **(k) PRODUCERS AND THE SUPPLY WEB.** V11's goods table gains a `material?: MaterialFamily` column (`stone` → stone;
     `logs`, `timber`, `planks` → timber; `reed` → thatch; `clay`, `bricks` → fired_clay) and two goods: `slate` (site, bulk
     3) and `lead` (made from ore, bulk 2), with good words `slate`, `slates`, `lead`, and `marble`, `granite`, `limestone`,
     `sandstone` → stone. A good with a `material` family is served only by a native provider (its land use or producing
     class), by the store at the gate or quay facing a partner that supplies the family (the endpoint store, V11 §3.13.4),
     or not at all — never by the web's generic `import` substitute; an unserved edge is reported `material_unsupplied`,
     soft as every web edge is. Every other good keeps the generic import. S2 demands a producer class only where its family
     is available: `quarry` and `lime_kiln` where stone is native by land, `lumber_camp` and `sawmill` where timber is
     native, `claypit` and `brickworks` where fired clay is native, `thatcher` where thatch is available, `mason_yard` and
     `timber_yard` where their family is available; §4.9 sites quarries, clay pits and lumber only on native sources. **The
     timber shortfall** (§4.9): the managed wood is laid up to what the frame holds; the rest is served by a partner that
     supplies timber through its store, else reported `timber_short` — never a generic import, never a failure (J-A26.42
     amended).

     **(l) OVERRIDES AND THE DOSSIER.** Dossier facts never move: the partners, their relationships and listed goods, and
     the deposits and their states are dossier facts; the supply and every material are map facts derived from them (item 20
     (h)). A dossier-declared material — a custom record's `materialFamily` (V08's `materials` row → family and id), or a
     record whose `kinds` row declares a material — is honoured on that element (origin `dossier`), reported
     `material_dossier`, and licenses nothing else. A `setAttr` of a building's `material.walls`, `.roof` or `.mix` (T12
     `dress`; `paint` gains the targets `roofMaterial` and `wallMaterial`), of a structure's `material` (its row's home
     tool) or of a district's `materialOverride` (T5; retyped
     `{ walls?: Record<string, number>; roof?: Record<string, number> }`, whose shares its buildings draw directly) WINS:
     origin `edit`, implicitly pinned, held through regeneration, licensing nothing; outside the supply it is reported
     `material_edit_unsupplied` and the clerk's critique names it; standalone, the edit's alternatives line offers "say
     {town} trades with a place that has {material}". Standalone, a partner is declared in V09's Trade control: into the
     creation slice as an `Adjust` whose re-derivation is scoped by the supply's family slices ((d)) — the picks (a
     building's moves no geometry; a structure whose kind changes is re-derived by its stage's operator) and S2's producer
     demand for the changed family, placed or withdrawn by §7.7 item 5's least disruption — or into a timeline entry for an
     epoch. On a dossier map a map-side partner is refused `dossier-owned`, its alternatives the material edit and the
     dossier.

     **(m) ITEMS 19 AND 23 — THE CONFLICT, STATED AND RULED.** Item 19 (owner-approved default) says wealth shows "through
     the lifestyle-banded building pools and the roof-colour role by band … never by a material keyed to the prosperity
     band", with `MaterialRow.key.band` "absent from every default row"; item 23 makes FTG's per-stage rows the default. The
     owner's newer rule pairs material with neighbourhood prosperity and with terrain, resources and trade, so **item 116
     supersedes, as the DEFAULT, item 19's band clause and item 23's FTG-reproducing material rows**: the default material
     is the pick of (g) over the supply of (d). **Kept:** item 19's "texture and colour only, never shape" — extended to
     every structure's material within its kind — and the lifestyle-banded pools; item 23's emulation where a parity preset
     asks for it ((n)). **The regional shift is retired and folded**, one mechanism for one concept: its "shift with the
     band within what the region builds with" is now the default; its rows become `MaterialDef` region cost rows (a region
     pack's); `MaterialRow.key.band` and `extension: 'regionalShift'` go; D-2's region preset carries the region's cost
     rows; `EraRow.region` keys them and `EraRow.materialRows` keys the parity rows. J-A19.21 is superseded by J-A116.21;
     J-A19.41–J-A19.43 stand (materials are not template columns; built things read the built band); J-A19.81 stands under
     the FTG preset; J-A8.45, J-A26.42 and J-A65.45 are amended as (j), (k) and (i) state.

     **(n) THE SWITCH AND THE PRESETS.** One cell, `materials.supply.enabled` (an `extension` option over both references;
     default on; `presets`: `MFCG`, `FTG`, `VG` and `NG` off; `FM` zeroes none, as §7.6 states), carrying
     `provenance.ownerRule: 116`. Off, S11 reads the kept parity `MaterialRow` — FTG's per-stage rows with their district
     and class overrides, the band and regional-shift rows removed, our own rows (clean-room) — with origin `rows`, and
     every structure keeps its pre-116 rule: byte-identical to the base (the no-op pin). The `lit` family's default sheet
     colours a roof by its covering's role; its band-tint rows move to the FTG parity sheet (J-A19.81 kept there), since
     under the owner's rule the material already carries wealth and a band tint would paint a rich thatched roof "the
     deepest clay". `ink` keeps MFCG's one roof role at the town and city bands and draws the roof family as an ink pattern
     at the building band and the close-up; the `MFCG` sheet draws none; `hatched` keeps NG's two tones under `NG` and
     otherwise takes the roof material's role; V07's painterly palette reads `Building.material.roof` (VG keeps its own
     weighted list under `VG`). A document written before this item lacks the cell and reads it off, so it replays byte for
     byte; turning it on is an `Adjust` from S1 (11) that re-picks every material, re-derives the producer classes and the
     structure kinds the supply changes, and keeps every edit — no building's geometry moves.

     **(o) THE EDGES.** Each has a defined outcome, its fallback on §5's ladder where it can fail, and a test.

     | edge | outcome | fallback (§5 tier) | test |
     |---|---|---|---|
     | nothing native but earth, no partner | earth walls (cob, adobe where arid; wattle needs timber); thatch where straw, else turf or mud | the floor, tier 5 `material_floor`; never tier 6 for a building | T116-15 |
     | everything native | the full cost order; the dearest family's share rises with the band | — | T116-16 |
     | a native-only place (no partner supplies) | no traded material at any epoch; grows only in what it has | none needed | T116-3, T116-25 |
     | a desert (item 111) | adobe walls and mud roofs; stone where native; an oasis grove is no timber source | the floor | T116-17 |
     | a marsh or delta | reed thatch; wattle where timber; brick where clay and peat; cob | the floor | T116-18 |
     | a mountain town | rubble and ashlar, slate where drawn, log in cold and coniferous rows | — | T116-19 |
     | a coastal port | a sea partner's families cheapest; without a named partner, native-only | — | T116-20 |
     | a thorp, a metropolis | `rungMeans` 0.5 and 1.3: a thorp's road-borne stone reaches no house | — | T116-21 |
     | item 114's ceiling | no means above `means.top`, the highest allowed band's `hi`, for plots, institutions and works alike | — | T116-22 |
     | islands (item 115) | the settlement's supply; island rock no source | — | T116-23 |
     | a history replay whose peak built in stone | remnants keep their material; ruins stock serves the refounding | `ruins_stock_short` → the pick | T116-24 |
     | a candidate set empty (a building) | preference row → the class family's generic row → the floor | tier 5 `material_floor` | T116-15 |
     | a masonry structure with no masonry | its timber kind → its earth kind (walls, moles) | tier 5 `material_kind_substituted`; bridge, pier, raised way, step > 150 cm: tier 6 with their codes | T116-27 |
     | a declared material outside the supply | honoured on its element | tier 0, `material_dossier` / `material_edit_unsupplied` | T116-30 |

     **(p) WIRING.** **Records and their lifecycle** — `MaterialSupply` (derived: S1 (11), each epoch's prelude, load);
     `BuildingMaterial` and `MaterialOrigin` (S11 and §4.11's builds; setAttr; in the building's leaf digest, outside its
     geometry subtree; undo is the log's); `Enceinte.materialOrigin`, `Bridge.material` and `materialOrigin`, `Way.material`
     and `materialOrigin` (harbour works and raised ways), `RetainingWall.materialOrigin`, `Tunnel.lining` and
     `liningOrigin` (their stages and their rows' setAttr); `TradePartner.supplies`, `distanceM`, `source 'declared'`
     (recipe data: the creation slice and timeline entries); `Terrain.slate`, `Terrain.lead` (S1 (10); the terrain row);
     `MaterialLedger.rows[].material: MaterialFamily`. **Migration (§7.5, at first load):** `Building.material` without
     origin → origin `rows` at epoch 0 for each part, no mix; `RoofSpec.material` → dropped (no writer ever set it);
     structures' `materialOrigin` → `rows`; `Bridge.material` → `rubble` for kind `stone`, `timber` for `timber`, absent for
     `draw` and `ford`; `District.materialOverride` → its old walls and roof shares; ledger rows → the family of their
     material id (`stone` → stone); `TradePartner.supplies` → `[]`; `Terrain.slate`, `.lead` → false; the switch → off.
     **Streams (§6.1):** concern `material` — a building draws four uniforms for its walls and two for its roof, keyed by
     its lineage and the slot, always; a structure two, keyed by its lineage (a retaining wall's and a raised way's on their
     stages' own streams, as item 110 keys them); `blueprint.features` appends the slate and lead uniforms. **Failure
     (§5.2):** a new class **F-MATERIAL** — where: S11, S7, S10's levelling, S10a's surfaces, II.7.2, §4.11's builds;
     detection: an empty candidate set, a ruins-only candidate the stock cannot cover, a declared material outside the
     supply; ladder: the preference row → the class family's generic row → the floor (tier 5) for a building; for a
     structure its kinds in the order of (i) → tier 6 with its code; a declared material is honoured (tier 0, reported);
     test T116-15, T116-27. **Report codes (§5.4):** `material_floor`, `material_kind_substituted`, `material_dossier`,
     `material_edit_unsupplied`, `material_unsupplied`, `timber_short`, `ruins_stock_short`, `bridge_no_material`,
     `pier_no_material`, `raised_no_material`, `retaining_no_material`, `fire_rebuild_unavailable`, `partner_no_supplies` (a
     named partner whose records show no material), and the supply's reason codes of (d). **The clerk's why** (§11.2's `why`
     on `material.*`; V10's `material` section): the material and its family; its origin (the native fact with its DR row —
     raster, deposit and state, toggle, flag or floor — or the partner, its route and the good that licensed it, or the
     ruins, the dossier record or the edit); the means, the band range that bounded it and the district; the candidates with
     their costs at the build epoch and today's supply ("Stone would need a trade partner that has it; none does"). **The
     legend** (§9.5; V09's Materials view): only the families drawn, each with its origin words — "from the land", "brought
     from {partner}", "reused from ruins", "from SettlementForge", "yours". **Export** (§11.1): GeoJSON buildings carry
     `material_walls`, `material_roof`, `material_mix_part`, `material_mix` and `material_origin`; enceintes, bridges, ways,
     retaining walls and tunnels their `material` and origin; glTF names wall surfaces by storey or part and roofs by
     covering; CityJSON as attributes. **Budgets** (§12): the supply ≤ 5 ms at CITY per derivation; the pick ≤ 2 ms per 10
     000 buildings.

     **(q) BARS (§13.2; the volumes cite them and add their own).** T116-1 **no-op pin**: with the switch off every
     material, the model digest and every golden are byte-identical to the base. T116-2 **texture only**: any change of
     supply, pick, mix or override leaves every building's geometry subtree of the digest unchanged, and a structure's
     geometry changes only through its kind (T19-3 extended; V02's T-V2-25). T116-3 **the licence**: across the fixtures and
     200 seeds, 0 materials with origin `traded` whose partner did not supply the family at the build epoch, 0 materials
     outside the supply other than origins `dossier`, `edit` and `rows`, and 0 traded materials on a native-only settlement
     at every epoch (exact bound 0). T116-4 **both native** (a river town with woods and a quarry): the share of buildings
     with stone in their walls or mix is non-decreasing across the bands; rich ≥ 70 % stone walls; ≥ 15 % of comfortable
     buildings mixed or of the other family; squalid and poor ≥ 80 % in the two cheapest native materials. T116-5 **woods,
     no quarry, no partner**: 0 stone fabric; walls of timber mass ≥ 85 %. T116-6 **the same with a river partner that has
     stone**: stone only on plots whose means reach 0.8 × its cost — at TOWN only `rich` houses and prestige institutions —
     ≤ 3 % of houses; every stone building's origin names the partner. T116-7 **the reverse** (stone native, timber by sea):
     stone-family walls ≥ 75 %; traded timber only in `rich`; every church masonry. T116-8 **cost**: for one family and
     partner, sea < river < road; τ monotone in distance; native τ ≤ 1.3; ruins τ 0.8. T116-9 **monotone pick**: with the
     draws fixed, a higher means never picks a cheaper place. T116-10 **mixed**: exactly two wall materials; the heavier on
     the ground storey or the gable; the mixed share highest in the comfortable and prosperous bands; 0 mixed where one
     candidate stands. T116-11 **one native test**: stone native exactly when V04 has a stone cell within `reachM` of the
     origin; V07's and V11's gates agree with the supply on every fixture. T116-12 **deposits**: an available deposit forces
     native; all-depleted or removed prevents land whatever the raster; discovered opens at the next epoch; no resources →
     the raster rule. T116-13 **partners (DR3)**: a partner supplies a family only when its records show it; derived and
     hostile partners supply none; a dossier with no named neighbour has no licensing partner, whatever its access key; the
     access-pair route. T116-14 **web and producers**: 0 material goods served by the generic import; no `mason_yard` where
     stone is unavailable, no `quarry` where it is not native; the timber shortfall only through a partner, else
     `timber_short`. T116-15 **earth only**: every building has walls and a covering; F-MATERIAL never reaches tier 6 for a
     building. T116-16 **everything native**: ≥ 4 wall materials drawn; the dearest family's share non-decreasing across the
     bands. T116-17 **desert**: ≥ 90 % earth-family walls where stone and timber are not native; 0 coverings a roof form
     does not admit. T116-18 **marsh**: thatch ≥ 60 % of roofs where reed is native and slate is not; brick only with clay
     and fuel. T116-19 **mountain**: with no native timber, stone-family walls ≥ 80 %; with native coniferous timber, both
     drawn; slate only with `Terrain.slate`; log only in cold and coniferous rows. T116-20 **port and route**: on one
     fixture the traded share at `rich` by sea ≥ by river ≥ by road. T116-21 **rungs**: at one supply the top band's dearest
     share at METROPOLIS ≥ CITY ≥ TOWN ≥ VILLAGE ≥ THORP; a THORP with a road partner that has stone has 0 stone houses.
     T116-22 **item 114**: no plot's means above `means.top` × `rungMeans`, and no institution's or work's above `means.top`
     × its factors; the traded share non-increasing as the ceiling lowers. T116-23 **islands**: island materials ⊆ the
     settlement's supply; no family native by island rock. T116-24 **history**: remnants keep their materials; a refounded
     fixture builds stone from ruins only while the stock covers it; no partner invented for a replay epoch. T116-25 **a
     link over epochs** (V06's H-TRADE): no traded fabric before the link's epoch, no new traded fabric after it ends, every
     standing traded building keeps its material and origin until struck; repairs in kind. T116-26 **sources over epochs**
     (H-QUARRY, H-WOODS): a discovered quarry is native from the next epoch, a depleted one lays no new land stone, woods
     cleared below the test end native timber. T116-27 **structures**: every enceinte, bridge, harbour work, raised way,
     retaining wall and lining material is in the supply or carries its substitution code; an aqueduct only in masonry.
     T116-28 **paving**: `paved` and `cobble` only with their sources; `brick` only with fired clay native; the fallback
     order holds. T116-29 **institutions**: a church in a native-only timber town is timber, with clay and fuel brick, with
     a river partner that has stone stone at its prestige; houses never outside their district's range, institutions not
     bound by it. T116-30 **overrides and the dossier**: a `setAttr` material holds through regeneration with origin `edit`
     and changes no other building's pick; a `materialOverride` wins in its district; a declared `materialFamily` is
     honoured on its building only; a map-side partner on a dossier map is refused `dossier-owned` with its alternatives.
     T116-31 **determinism and load**: six uniforms per building on `material`; adding an unrelated partner changes only
     picks whose candidates changed; the supply recomputed on load equals the derivation's; the replay byte-stable. T116-32
     **why, legend, export, compile**: every drawn family appears in the Materials legend with its origin; the why names
     basis or partner, means and costs; exports carry every field of (p); V11's compile proves every `MaterialDef` complete
     and every consumer resolving a material over every supply case, the earth-only case included.

     **(r) THE UNITS — what each STATES (the one canonical home of each shared decision) and what it only REFERENCES.**
     Landed units (the base model, kernel, pipeline, determinism and rendering parts; V03 and V04) apply their part in a
     short late rewrite seat; the rest in their Rewrite.

     | unit | STATES | REFERENCES |
     |---|---|---|
     | base **model** (§2) | §2.6's *Materials* rule rewritten — the owner's words, (a)'s terms, (e)'s cost, (f)'s means, (g)'s pick and (h)'s mix as formulas, item 19's shape clause kept, (m)'s supersession; the types `MaterialFamily`, `MaterialDef` (with `nativeOnly`), `MaterialPreference` (with `prestige`), `MaterialMixRow`, the narrowed parity `MaterialRow`, `BuildingMaterial`, `MaterialOrigin`; `RoofSpec.material` retired; §2.7's `MaterialSupply`, `MaterialLedger.rows[].material: MaterialFamily`, `Enceinte.materialOrigin`, `Bridge.material`/`materialOrigin`, `RetainingWall.material` as a material id with `materialOrigin`, `Tunnel.lining`/`liningOrigin`; §2.4's `Way.material`/`materialOrigin` and `surface` `'brick'`; §2.5's `materialOverride` retyped; §2.3's `Terrain.slate` and `.lead`; §2.9's `Document.derived.materialSupply` | the producers (§4), the edits and DR rows (§7), the roles (§8), the rows and values (V11) |
     | base **kernel** (§3) | no part: a material is never geometry and no kernel call reads one | — |
     | base **pipeline** (§4, §10, PART II, PART III) | S0's `slate` and `lead` requests; S1 (10)'s two draws; **S1 (11)**, the supply's derivation with (b)'s tests; S2's producer gate and the web's refusal of the generic import for material goods; S7's enceinte, gate, tower, castle, bridge and harbour picks and kinds; S10's retaining pick; S10a's surface gate (V01's table); S11's building pick, institutions' prestige, deck buildings; §4.9's native land uses and timber shortfall; §4.11's prelude, re-picks, refurbishment, fire, repairs in kind, ledger by family, ruins stock (J-A8.45 amended), sources over epochs, the replay's partners and deposits; §10.2's `salvageM3` by material id and the corrected sentence on which rows name a material; II.7.2's lining pick; II.7.6's quarry voids from native land stone | the pick and types (§2.6), the cells (V11), V06's engine |
     | base **determinism** (§5–§7) | §5.2's F-MATERIAL; §5.4's codes; §6.1's `material` keying and the appended `blueprint.features` uniforms; §6.2's leaf-digest note; §7.1's edit paths (T12 `dress`, `paint`'s two targets, T5's `materialOverride`, the terrain row's `slate` and `lead`, each structure's `material` under its row's tool, the dossier-map partner refusal); §7.5's migration rows; §7.6's switch cell, its presets, the retired regional shift and the reading rule's exception (item 23's material default superseded); §7.7's `TradePartner` fields, layer 2's supplies fill and route step, DR3 amended (covers gain the families each partner supplies; inputs gain the neighbour's exports, chains' resource keys and access key, the import links' goods and the network's names; rule gains (c)'s fill and route step; bar gains "a partner supplies a family only when its records show it; derived and hostile partners supply none; no partner is invented"), DR15 amended (inputs gain DR41's supply, the plot's built value and its district's band range, the class's prestige and patronage, a declared `materialFamily`; rule gains (g); bar gains "no material outside the supply but origins `dossier`, `edit` and `rows`"), **DR41** (the material supply: inputs `site.terrain`, `site.deposits` with state, `site.culture`, the biome, DR3's partners, the ledger at epochs; rule S1 (11) and §4.11's prelude; chance `blueprint.features`; bar: every native family traced to a site fact, no listed depleted or removed deposit's family native by land, no traded family without a partner whose records show it), item 1's never-read list amended, item 9's tiers (a partner's supplies dossier-derived facts; every material a map fact); §7.8's registry rows (the Trade control, the slate and lead toggles, the Materials view) | V08's fill, V09's controls |
     | base **rendering** (§8, §9, §11, §12) | §8.2's roles `wall.<id>` and `roof.<id>` for every `MaterialDef` id with their palette rows in `ink`, `lit` and `hatched` and their contrast rows; `lit`'s roof by covering (band tint to the FTG sheet); `ink`'s pattern at the building band and close-up; ten new texture tiles (brick, timber frame, wattle and daub, cob and adobe, log, slate, stone slate, lead, turf, mud); the mixed parts drawn per facet and the stacks; the Materials `ThematicRow` with item 112's second cue (the family's pattern); §9.5's Materials legend; §11.1's export fields; §11.2's `why` on `material.*`; §12's two budgets | V02's facets, V03's plan, V09's view |
     | base **scope** (§0, §1, §13, §14, §16, D-n, register) | §0's row for 116 and item 19's row amended; §1's buildings row ("item 116's supply model by default; FTG's under the FTG preset"); §13.2's T116-1 – T116-32; §14's `DossierDigest.economy.partners[]` fields; §16's milestones (J-A116.01: the supply, the pick, the rows and the record at M1 with V11's C1; the mixed facets, the edit paths and the standalone Trade control at M3a; the exports at M3b; the plan at M6-P; linings and quarry voids at M6-U; the epoch parts at M6-E; the dossier fill at M-SF; the why at M3c with the clerk); D-2 amended; the register's J-A116.01 (milestones), .21 (the default model; J-A19.21 superseded), .41 (which prosperity reads which), .42 (institutions outside the band range), .43 (the ledger never creates a material; J-A8.45 amended), .44 (the timber shortfall; J-A26.42 amended), .45 (quarries of native stone; J-A65.45 amended), .61 (the streams), .81 (the `lit` roof by covering; J-A19.81 kept under FTG) | every other unit |
     | **V11** content | every row and cell: `MaterialDef` (ids, requires, native only, slots, mass, base costs, coverings, climate, culture, era and region factors); `MaterialPreference` rows for classes (with `prestige`), district kinds, `v.` classes, clusters and structures (item 110's retaining and raised rows re-keyed as preferences; `deck`); `MaterialMixRow`; the `materials.*` cells (means rows, `rungMeans`, `blend`, `mix`, `tieBand`, `haul`, `salvageFactor`, `importPremium`, `routeRate`, `refLegM`, the works factors, the native thresholds and reaches, the poor-ground factor, `supply.enabled`); the relief rows' P(slate) and P(lead); `ResourceRow.material` (V11 §2.5's type) and the goods column, `slate`, `lead` and the good words; the parity `MaterialRow`; §3.18's salvage by id and family; the producer gates; the culture rows' material factors; the compile totality test; register lines; C1 | the formulas (§2.6), the partner record (§7.7) |
     | **V02** buildings | the mix parts' facets (`upper` every storey above the ground storey, a stacked tier above tier 0; `gable` the main wing's gable-end facets and every stack; `outshots` the `back` and `service` wings); the roofscape and façade programs per part (§5.2, §5.3, the band-tint line replaced); §1b's trace rows for the supply's inputs; the mutator keeps the material (§3.9); deck buildings' row; T-V2-25 extended and a bar that the heavier part is below | the record (§2.6), the pick (§4.7 S11) |
     | **V03** interiors | the exterior-wall fill per storey and per gable segment; stacks in the heavier material; thickness, openings and stairs never read material; an underground building keeps its host styling | `BuildingMaterial` (§2.6) |
     | **V04** underground | §3.5.3's volume law over native-land stone by origin, measured from the frame origin; a stoneless site lays no workings; its dug passages' linings; an ancient culture's ruins credit the ledger when robbed | the lining pick (II.7.2), the supply (§2.7) |
     | **V05** sky | the landfall credit as family `stone`; island buildings on the settlement's supply; the island's rock, conjured water and magical structures are no source and no material; item 115's gate unchanged | the supply, the pick |
     | **V06** evolution | (j)'s mechanics in the engine: the prelude re-derivation, re-picks, the refurbishment rule, the fire rebuild over the supply with `fire.ordinanceStretch` (1.25) in its fire row beside `fire.rebuildShift` (V6 §2.2), flood and fire by `walls`, arrivals and closures, sources, ruins stock, the replay's partners and deposits, the chronicle lines; fixtures H-TRADE, H-NATIVE, H-QUARRY, H-WOODS; T-V6-16 stratified by supply | §4.11's rules, the cells (V11) |
     | **V07** village | the village application through `rungMeans`; `v.` preference rows; `roof.palette` reads `Building.material.roof` (VG's list under `VG`); both "geology row" citations replaced by (b)'s tests; the `inner` circuit and its REPLACEMENT in the available masonry, else a `palisade` or `earthwork` kind (J-V7.15 and T-V7-32 amended); the entry store as the arrival point; `roads: isolated` a road form only; a village bar that a standalone village with no partner is native-only at every rung and epoch | the pick, the supply |
     | **V08** settlementforge | the rows of DR3's supplies fill from the four sources of (c) and the port's fill of §14's new partner fields; the access-pair route's key rows; the `deposits` row's family column and its `precious_metals` → lead flag; the `materials` row → family and id; the consequence statement; the rework adapter (J121) | `TradePartner` and DR3, DR41 (§7.7), the digest fields (§14) |
     | **V09** application | the Materials view in the Show menu and its legend's words; the About tab's material with its origin chip and "Why this material?"; the standalone Trade control (partners, route, supplies) and the site card's slate and lead toggles; the dossier map's read-only trade panel and the refusal's alternatives; the `paint` tool's two material targets in its UI; catalogue keys (`bend.material.*`, the legend words) | the records, the why |
     | **V10** clerk | the `material` why section; critique row K19 ("{n} buildings in {material}, which {town} has no source for"); creation mode (a description naming a material the site lacks proposes a partner, else reports); chronicle answers | §11.2's `why`, V06's chronicle |
     | **V12** calibration | bar-map rows for T116-3, -4, -6, -7, -10, -21, -25 with their owners (V11, V02, V06); register lines for every new cell (`panel`, then `corpus`); the switch's preset resolution; the known-city fixtures' stated supply; `MeasureInput` gains building material records | the bars (§13.2) |
     | **V01** neighbourhoods | the paving gate, the `brick` surface row and the fallback order; the `hatched` roof colour by covering (NG's two tones under `NG`); the `material` naming feature; the lone neighbourhood's supply from its hood recipe's partners, native-only by default | the pick, the supply |

     **HOMES:** §2.3, §2.4, §2.5, §2.6 (the rule, the vocabulary, the pick, the mix), §2.7 (`MaterialSupply`, the ledger,
     the structures' fields), §4.2 S0–S1 (the flags, S1 (11)), §4.2 S2 and §10.2 (producers, the web's material goods), §4.7
     S10–S11, §4.8, §4.9, §4.11, II.7.2, II.7.6, §5.2, §5.4, §6.1, §7.1, §7.5, §7.6, §7.7 (`TradePartner`, DR3, DR15, DR41),
     §7.8, §8.2, §9.5, §11.1, §11.2, §12, §13.2, §14, §16, D-2. Volumes: V11 (every row and cell), V02 (the mix at the
     building), V06 (materials over time), V07 (the village), V04 (quarry voids, linings), V05 (islands and landfall), V03
     (the plan's walls), V01 (surfaces, roof colour, names), V08 (the partners' supplies from the dossier), V09 (the view,
     the panels, the Trade control), V10 (the why, the critique), V12 (the bars). *Scope:* BASE (the record, the supply, the
     pick, the structures, the edits, the dossier rows); STAGED with evolution for (j), with stage 3 for the mixed facets
     and the plan, with the underground for linings and voids. *Routing:* bundled with items 114 and 115 (owner, ~01:12);
     applied IN the coherence pass's Rewrite phase by every unit named in (r), the landed units in a short late seat; the
     owner's refinement binds every part.
