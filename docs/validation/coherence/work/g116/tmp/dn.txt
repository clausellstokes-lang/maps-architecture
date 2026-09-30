# Draft notes — OWNER RULE item 116 (building materials by terrain, resources and trade, paired with prosperity)

Architect's working notes, 2026-09-30. Every decision the item pins, with its reason, so a reviewer can veto one without
re-deriving the rest. The item text is `item-116.md` beside this file. Inputs read whole: `read-base.md`, `read-sf.md`,
`read-vols.md`, `read-owner-decision.md`; g items 102, 105, 106, 107, 110, 111, 113; file b items 19 and 23; the base
sections the readers cite (§2.6 Building, RoofSpec, MaterialRow and the Materials rule; §2.7 Enceinte, Bridge,
RetainingWall, RaisedWayRecord, MaterialLedger, DepositSite, Tunnel, LandUse, SiteResources; §4.2 S0, S1 (10), S3 (1);
§4.7 S11; §4.8 S7's bridges and harbour; §4.9 S12a, the farm table, fuel and timber; §4.11's salvage, decline table and
Works; §5.1–§5.2; §6.1's concern table; §7.6's emulation and preset rules; §7.7 layer 2, `CircumstanceSlice`,
`TradePartner`, DR1–DR40; §8.2's roles, palette and *Materials* paragraph, texture set) and V11 §2.5, §3.5.9–§3.5.10,
§3.7.1–§3.7.4, §3.17–§3.19, §3.24.1–§3.24.2, V06 §3.11.2–§3.11.3, V02's `WingRole`, V07's `RoadTopology`.

## 0. Binding inputs and two facts to flag

- **The owner's words** (verbatim in the item): the rule (~01:05), the refinement (~01:10), and the adoption of the
  program's recommendation on which partners count ("note that we are reworking trade as we speak. but for now its your
  recomendation"). The adopted recommendation is binding: every neighbour SettlementForge NAMES counts, supplying what
  its named exports, goods or resources show; no named neighbour = NATIVE-ONLY whatever the access key; no unnamed
  "region" partner; the named link's route sets the transport cost; one port-side partner record, filled today by a
  derivation row and re-pointed when SettlementForge's reworked trade lands; standalone, the recipe's partner list,
  empty by default.
- **Flag 1 (time).** `read-owner-decision.md` dates the adoption ~01:15; `docs/lane-events.log` line 1869 says ~01:33.
  The item cites ~01:15 (the binding decision file). The final seat should reconcile the one number.
- **Flag 2 (id collision risk).** The item claims derivation row **DR41** (the material supply). Items 114–115 are drafted
  in parallel; their draft as read at ~02:15 (`work/g114-115/items-114-115.md`) amends DR6, DR7, DR9, DR13 and DR27 and
  claims no new row, so DR41 is free; if a later draft claims it, the bundle's canon ruling renumbers one. Nothing else in
  116 can collide: its tests are `T116-*`, its failure class `F-MATERIAL`, its judgments `J-A116.*`, its cells
  `materials.*` (V11 registry row 49, the existing `materials` table).
- **Consistency with item 114 (read at ~02:15).** Item 114's draft caps the BAND, never the field value: a highest allowed
  band, cuts above it reading 1, named-band reads (an institution's, a template row's) read the highest allowed band, and
  each district's `bandRange` lowered to it. Item 116 therefore defines `means.top` as the `hi` of the highest allowed
  band (10 with no ceiling) and reads institutions and works from it; a plot at the highest allowed band interpolates up
  to that band's `hi` along its value (its upper cut reading 1); the district clamp uses the range as item 114 lowers it.
  No wealth term is added. Item 115 gates islands only; island plots read their own bands (T116-23).

## 1. Terms (one term per concept)

| decision | reason |
|---|---|
| D1. The three states are **native**, **traded**, **unavailable** (`MaterialSupply` status). | "Native" is the owner's word; the task's "LOCAL" is the same concept, so one word is kept, the owner's. |
| D2. A native family has a **basis**: `land` (the site's own source) or `ruins` (the salvage ledger's unspent stock within the haul radius). | The task rules "stone robbed from ruins is LOCAL"; it is on the site and needs no partner, so it is native by a second basis, finite and per site. |
| D3. The owner's "isolated" is named **native-only** in the design. | "Isolated" already means V07's road form (`RoadTopology 'isolated'`, a VG parity value) and SettlementForge's access key; neither implies anything about partners. Renaming VG's value would break parity rows; a new word for the new concept keeps one term per concept. |
| D4. **Family** (`MaterialFamily`) = what the land yields or a partner ships: `stone`, `slate`, `fired_clay`, `timber`, `earth`, `thatch`, `lead`. **Material** = a built id (`ashlar`, `thatch` …). SettlementForge's `materialFamily` token is the same concept in its vocabulary, mapped by V08's `materials` row. | Availability is decided per family (a quarry yields ashlar and rubble alike), price and look per material. Seven families are the fewest that separate every owner example (stone, timber, clay/brick, reed/straw, slate, lead, earth). |
| D5. **Means** = the cost level a builder can pay; **works means** = a public or lordly work's. **Origin** = the recorded source of a built material. **Mix** = a two-material building. | New concepts get new words; none collides with an existing base term ("rung", "tier", "grade", "band" are all taken, so the cost order has no named places: the pick's "affordable" place and its "next"; "reach" stays the distance radius (`reachM`) and "ladder" stays §5's and the interior's). |

## 2. Availability

| decision | reason |
|---|---|
| D6. The supply is **derived**, never stored: `Document.derived.materialSupply`, recomputed at creation (new step S1 (11)), at each epoch's prelude and on load, exactly like `TradeFlow`. | It is a pure function of model and recipe data (rasters, terrain flags, deposits' states, standing land uses, the ledger, the slice's partners); storing it would create a second truth. What must not move — a built material and where it came from — is stored on the entity (D16). |
| D7. Distances (each family's radius R) are measured from the **frame origin** (0, 0), not from S3's centre. | S2 needs the supply (producer demand) and S2 runs before S3; the centre lies in the frame's middle third (§4.2 S3 (1)), so the origin is within a sixth of the frame of it — far inside every reach — and the supply never depends on siting (no loop). |
| D8. One native test per family, one threshold each: stone `SiteResources.stone ≥ 0.5` on a cell within 2 000 m (II.7.6's `reachM`, so "stone is native" ⇔ V04 finds a stone cell); timber ≥ 0.4 over ≥ 20 ha within 5 000 m (at an epoch: the standing wood land uses); clay ≥ 0.4 within 2 000 m (V07's 0.4) plus kiln fuel; reed a marsh within 3 000 m or straw fertile ≥ 0.4 over ≥ 10 ha (at an epoch, the standing arable — not the farm table's demand, which S2 computes after S1 (11)); slate and lead by two terrain flags; earth always. | Three readers use three thresholds today (V04 0.5, V07 0.4, V11's `req` none). Pinning one per family, and V04's for stone, makes the underground, the village classes and the supply agree by construction. |
| D9. **Earth is native on every land site** (the floor), dearer (× 1.5) where no clay or loam lies within 2 km. | Totality: every building always has a wall and a roof covering it can lawfully take (cob or adobe; turf or mud), so F-MATERIAL never omits a building. Realistic: every settlement can dig its own ground; the poor-ground factor keeps cob rare in rocky uplands. |
| D10. Slate and lead get S0 site-request toggles (`'auto'|'on'|'off'`), resolved by S1 (10) on two uniforms appended to `blueprint.features`, stored as `Terrain.slate` and `Terrain.lead`. Dossier: lead from a listed `precious_metals` deposit; slate by the relief draw (SettlementForge has no slate word). | Slate and lead are regional, not implied by relief alone (a deterministic "hilly ⇒ slate" over-produces slate). The geology flag (item 65) is the exact precedent: an appended draw moves no other draw, the flag is editable on the terrain row, and the dossier fills what it states. |
| D11. A dossier deposit **wins over the raster** for its family: listed `available` (or `discovered`, from the next epoch) → native; listed only `depleted` or `removed` → not native by land whatever the raster; not listed → the raster decides. | read-sf F2: the dossier's deposit list is a terrain-conditioned truth; a worked-out quarry must not be re-granted by hills. A dossier that names no resources reads the standalone rule (the task's "derived default from terrain and climate"). |
| D12. **Traded** only through a `TradePartner` whose `supplies` lists the family and whose weight is above 0. `derived` partners (the per-through-route partners DR3 makes for `TradeFlow`) supply nothing; a `hostile` partner nothing; no partner is invented. The generic `import` substitute of the supply web never serves a building-material good. | The owner's refinement and the adopted recommendation, word for word. The web's generic import is exactly the "generic trade access" the task forbids. Other goods (iron, wine, lime, firewood) keep it: they are not building materials in the owner's sense (visible walls and coverings). |
| D13. `TradePartner` gains `supplies: { family; from: 'exports'|'resources'|'link'|'declared' }[]`, `distanceM?`, and `source` gains `'declared'` (a standalone partner). DR3 fills `supplies` from the digest; the material rule reads only this record. | The owner: "ONE port-side input record … The material rule itself never reads SettlementForge's trade fields directly." `TradePartner` already is the port-filled, blueprint-filled partner record (§7.7 layer 2), so extending it keeps one record; re-pointing to SettlementForge's reworked trade touches DR3's fill only (J121). |
| D14. The dossier's evidence for a partner's supplies: the generation neighbour's `primaryExports` (through `goodWords`) and its chains' `resourceKey` (through the deposits row's family column); an `import` trade link's good (through `goodWords` or a goods-id row); a `neighbourNetwork` link by name, supplying what the same partner's other records show, else nothing. `DossierDigest.economy.partners[]` gains `exports?`, `resources?`, `access?`; §7.7 item 1's never-read list admits those three `neighborRelationship` fields. | The owner's adopted list. The digest's closed rule means a field must be named to be read. The neighbour's own access key gives the route pair (D15). |
| D15. Route: the pair of access keys when the neighbour's is given (both ports → sea; this site's navigable river and the neighbour's river or port → river; else road); otherwise DR3's water-fraction fill as today. | The owner: "the route of a named link (sea, river, road; SettlementForge's access key and gates where given) sets the transport cost". Using DR3's fill for the rest keeps one `mode` field (one term) and `TradeFlow` unchanged where no key is given. |

## 3. Cost, means and the pick

| decision | reason |
|---|---|
| D16. Built materials record their **origin** (`MaterialOrigin`: native land or ruins, traded with partner and route, dossier, edit, rows) with the epoch; buildings per part, structures in `materialOrigin`. | Needed exactly: V04's quarry volume counts native-by-land stone only; the clerk says "brought from Kellmoor when that trade ran" after the link closed; the legend marks origin; bar T116-3 checks licences at the build epoch. Re-deriving past supplies on load would need past model states. |
| D17. **Cost** `c = baseCost × climate × culture × era × region factors × τ`; τ native-land `1 + haul × bulk × d/R` (≤ 1.3); native-ruins `salvageFactor` 0.8; traded `importPremium × (1 + routeRate[route] × bulk × distance factor)`, importPremium 1.5, routeRate sea 0.3 · river 0.45 · road 1.5, the bulk the family's good's `ResourceRow.bulk`. | The owner: "the link's route sets the transport cost: water carriage far cheaper than land". Reusing the goods table's `bulk` keeps one source of truth. The premium stands for margins, tolls and risk; without it a sea-borne timber frame undercuts local ashlar and the "very rich" rule fails (worked below). Reused stone is cheaper than quarried (spolia), historically. |
| D18. **Means** per band `[lo, hi]` interpolated along the value inside the band (squalid 0.6–0.9 · poor 0.9–1.3 · modest 1.3–2.3 · comfortable 2.3–3.2 · prosperous 3.2–4.5 · rich 4.5–10), × `rungMeans` (THORP 0.5 … METROPOLIS 1.3). | Bands are per-town quantiles ("rich" is relative); the rich band's wide top is "the very rich". The rung factor: a metropolis's rich outspend a thorp's; without it a thorp with a stone partner imports stone like a city. |
| D19. **Which prosperity reads which.** The plot's **built value** (`Plot.builtProsperity`, the value the new fabric is built for — at generation the field value) sets the means; the **district's band range** (item 72 (d‴)) clamps that value first (the neighbourhood's bounds). Institutions with a `prestige` read `means.top × prestige × patronage` (`means.top` = the `hi` of item 114's highest allowed band) and are not clamped by their district's range. Public works read the works means. No separate town-wealth term. | Material is what is BUILT, so it reads the manifested/built memory (J-A19.43's split: geometry and fabric read what was built; occupants read the field). The owner's item 72 (d‴) words bind "what any building inside of it can be" — the clamp is that. A church is funded by its institution, not its street (the task's "institutions funded above their neighbourhood"). Town wealth reaches the means only through the bands the field and item 114's ceiling leave: one mechanism (item 114's), no double count. |
| D20. **The pick**: candidates in cost order (within 5 % count as one, preference weights sharing it); **affordable** = the dearest place the means covers (else the cheapest); **next** = the next dearer; `t = clamp((M − c_next(1 − blend)) / (c_next × blend), 0, 1)`, blend 0.2; draw `u₀ < t` → next, else affordable. Four uniforms for walls, two for a roof, on concern `material`, keyed by the building's lineage and slot, always drawn. | The owner's model is "the richer take the more expensive material". A cost order with a blend at each step gives: the poor the cheapest, the rich the dearest they can afford, the middling a mix exactly where two materials meet — and nothing beyond one's means except a partial take within 20 % below the next price. Fixed draw counts keep every other entity's draws stable (§6.1). With fixed draws the pick is monotone in the means, so a richer rebuild never picks cheaper. |
| D21. Structures use the same pick with **works means** = `means.top` × rungMeans × a works factor (walls 1.0, castle 1.5, bridge 0.8, harbour 0.8, raised 1.0, civic retaining 0.8, lining 0.5, paving 0.6); a structure's KIND (bridge stone or timber, raised masonry or timber, V07's circuit kind) follows the picked material's mass. | "Stone where it is affordable, else earth and timber" (the task) needs a purse; the town's top purse, scaled per work, is the simplest one and bows to item 114's ceiling automatically. A structure's kind is structural (item 110 already makes pier spacing a function of masonry vs timber); its material within the kind stays texture and colour — item 19 kept. |

### Worked defaults (the owner's examples at TOWN, temperate, quarry and woods 1 km out)

- **Both local.** Walls (native τ: quarry 1 km → 1.15, woods 1 km → 1.06): cob 1.0 · wattle ≈ 1.27 · dry stone ≈ 1.84 ·
  timber frame ≈ 2.12 · rubble ≈ 3.45 · ashlar ≈ 5.75. Squalid cob; poor cob 60 / wattle 40; modest wattle 35 / fieldstone
  28 / timber frame 37; **comfortable** timber frame 66 / rubble 16 / mixed 18 (the step at rubble starts at 2.76);
  prosperous rubble 96; rich ashlar 88 / rubble 12. "Richer areas mostly stone, middling mixed, poor cheapest" holds; the
  share of buildings with any stone is non-decreasing across the bands (0, 0, 28, 34, ≈ 98, 100), which T116-4 pins.
  Dry stone was first limited to village and outside classes; that made a stone town's modest band cob, which is
  unhistorical (clay-bonded fieldstone was the poor's wall in stone country), so it is admitted for every house row.
- **Timber local, no quarry, a river partner with stone.** Rubble 3 × 1.5 × (1 + 0.45 × 3) ≈ 10.6. Only rich plots with
  means ≥ 8.5 reach it — the top ≈ 28 % of the rich band's span, giving rich ≈ timber 80 / rubble 10 / mixed (stone
  ground storey, timber upper) 10, ≈ 2 % of built land in all; ashlar (≈ 17.6) none. A parish church
  (prestige 1.0, patronage ≥ 1.06) is stone; by road (rubble ≈ 24.8) no house and no parish church is, a cathedral only at
  full patronage. By sea (≈ 8.6) about half the rich band. Without the partner: none at all.
- **Stone local, timber by sea.** Timber frame 2 × 2.85 = 5.7: only the rich reach it (the reverse of the case above, as
  the task states). With the defaults it falls within `tieBand` of local ashlar (5.75), so the rich share one place by the
  house row's weights — V11 may weight masonry higher there; T116-7 bounds only "traded timber only in rich". Churches
  stay masonry because their preference row admits masonry (D25). Without the premium (1.9 → 3.8) the prosperous would
  take imported timber: that is why the premium exists.

## 4. Mixed construction

| decision | reason |
|---|---|
| D22. `BuildingMaterial.mix?: { part: 'upper'|'gable'|'outshots'; walls }` — at most two wall materials; one roof covering per building; `RoofSpec.material` retired (no writer ever set it). | The owner: "individual buildings that is a combination of the two". Two materials is the owner's number. The chimney stack is folded into `gable` (the masonry chimney gable of a timber house is the historical form of "a stone gable or chimney stack"); a separate `stack` part would need the lazy composition at S11, or make material add a chimney (a shape change item 19 forbids). |
| D23. The **heavier mass takes the lower part and the gable** (masonry > earth > timber); `outshots` gives the dearer to the main range. Which pair is mixed is decided by cost (the blend zone, `mix` 0.5 × 4t(1 − t)); where each goes, by physics. | A timber ground storey under stone upper storeys is structurally absurd, and in the "stone local, timber traded" case the dearer material is the timber. Separating "whether" (cost) from "where" (mass) keeps both the owner's pairing and realism. |
| D24. Eligibility at S11 from facts S11 has: `upper` needs ≥ 2 floors; `gable` a gabled main wing; `outshots` a base wing of role `back` or `service`. Chimney stacks draw in the building's heaviest masonry or earth wall material, else in the roof tone as today. | No dependence on the lazy composition; no material ever adds or moves geometry. |

## 5. Institutions, pieces, over time

| decision | reason |
|---|---|
| D25. `MaterialPreference` rows replace V11's fixed class and district material shares: they ADMIT materials with tie weights and give institutions a `prestige`; they never name a material the settlement lacks. | "Temples always stone" is FTG's per-class law; under the owner's rule a stone church needs stone. A stave church in a timber town and a brick cathedral where clay is local and stone is not follow from the same ladder. |
| D26. Roof coverings are chosen **by the roof form** (`MaterialDef.covers`: kinds and minimum pitch): thatch ≥ 0.8, shingle and stone slate ≥ 0.5, slate ≥ 0.4, clay tile ≥ 0.3, turf 0.3–0.8, mud and lead on flat, canvas on tents; the floor (turf on pitched, mud on flat) ignores the bounds. | Shape decides the covering, never the reverse (item 19). An arid flat roof never takes thatch. |
| D27. New ids `adobe`, `log`, `stone_slate`, `mud`; new surface `brick`; `timber` stays one id for sawn boards (board walls and decks). | The realism tiebreaker: arid and cold sites need their own earth and timber walls; the owner names stone slates; brick streets are the Low Countries' answer where clay is local and stone is not. Boards are one material in two uses, so one id. |
| D27b. `MaterialDef.nativeOnly`: dry stone, log, wattle-and-daub, timber crib and every earth material are never drawn from a partner. | Low-value, bulky materials were never carried: without the flag, wattle-and-daub in a stone country with sea-borne timber costs 1.2 × 2.85 ≈ 3.4, ties with local rubble and half the prosperous would build imported wattle — absurd. Dry stone may still be native by ruins (robbed rubble). |
| D28. Over time: standing fabric keeps its material and origin; a repair is in kind; a **rebuild, a new build, a completed upward refurbishment and a fire rebuild** re-pick at the epoch's supply; a refurbishment never picks cheaper than it stands. A link acts from the first epoch whose slice lists it and ends with the first epoch whose slice no longer licenses it (a dossier receipt F14 enters the next epoch's slice). A native source opens or ends by a deposit's state, a timeline toggle, or (timber) the standing woods falling below the test. | The owner: "can't have … or grow to have them" governs construction; demolishing stone houses when a link closes is least-disruption-hostile (item 22) and unhistorical. The refurbishment rule gives "rebuilding in dearer materials as a quarter grows richer" through the base's existing upward refurbishment (§4.11), with no new op. |
| D29. The fire rebuild shift reads the supply and extends to walls (an ordinance stretch of the means × 1.25), reported `fire_rebuild_unavailable` when nothing less flammable is available. | The historical ordinances after great fires required masonry and tile; availability bounds them (no brick where there is no clay and no partner). |
| D30. The ledger is keyed by **family**; a ruins-only family is built only while the stock within 250 m covers the debit (J-A8.45 amended: the ledger never creates a material; for a native-by-land or traded family it stays a flow record). | The owner's refinement forbids a reported shortfall standing in for a material; the flow-record rule stays where a real source exists. |
| D31. The history replay reads the present partner set for every replay epoch (the dossier states no dated partner) and treats a deposit listed `depleted` or `removed` today as available in the replay's epochs before the last. | No partner is invented for the past; a worked-out quarry was worked once, so the peak city's stone and its robbed ruins are explained without trade. |
| D32. V04's quarry volume law counts only fabric whose origin is native-by-land stone; tunnels gain a `lining` (masonry, `timber` shoring, or none). | Traded stone makes no local working (read-vols F7 (1)); the owner's "all relevant pieces" includes the underground's linings, which today have no material. |
| D33. Paving: V01's surface table keeps its structure; `paved` needs stone, `cobble` stone or river or beach pebbles, `brick` fired clay native (from c14), `planks` timber; fallback paved → cobble → brick → planks (quays, piers, bridges and comfortable+) → dirt. | Street surfaces are the most visible material of all; setts were local stone. |

## 6. Items 19 and 23, presets, overrides

| decision | reason |
|---|---|
| D34. **Item 19's default clause** ("never by a material keyed to the prosperity band"; `band` absent from every default row) and **item 23's FTG-reproducing default rows** are superseded AS THE DEFAULT by item 116, the newer owner rule. Item 19's "texture and colour, never shape" stays and is extended to every structure's material within its kind. | The standing rule: a newer owner rule prevails where they conflict; the owner wrote 116 knowing FTG's model. The shape clause is not in conflict. |
| D35. One switch, `materials.supply.enabled` (an `extension` option cell, default on; `MFCG`, `FTG`, `VG`, `NG` off; `FM` zeroes none). Off → S11 reads the kept parity `MaterialRow` (FTG's per-stage rows, band and regional-shift rows removed), byte-identical to the base (the no-op pin). An older document's recipe lacks the cell and reads off, so it replays byte-identically. Turning it on is an `Adjust` from S1 (11): buildings' geometry never moves, but producer classes and structure kinds (a bridge's stone or timber, a raised way's pier spacing, V07's circuit kind) may, so T116-2 pins buildings and lets structures change only through their kind. | Emulation where a parity preset asks (item 23 kept for the presets); a user can still choose FTG's model; old documents never shift silently. |
| D36. The `lit` default sheet colours roofs by the **roof material's** role; the band tint rows move to the FTG parity sheet (J-A19.81 kept there). `ink` shows the roof family as an ink pattern at the building band and the close-up only; MFCG's sheet shows none. | Under 116 the material already carries wealth; a band tint as well double-encodes it and paints a rich thatched roof "the deepest clay". The default look (`ink`, D-1) would otherwise never show the owner's rule. |
| D37. The regional shift is **retired and folded**: its rows become `MaterialDef.factors.region` cost rows; `key.band` goes (band enters through the means); `extension: 'regionalShift'` goes (the switch replaces it); D-2's region preset carries the region's cost rows; `EraRow.region` keys them; `EraRow.materialRows` keys the parity rows. | One concept, one mechanism: "shift with band within what the region builds with" IS the new default. |
| D38. `setAttr` of a material and a district's `materialOverride` **win** (origin `edit`), hold through regeneration, license nothing; the clerk's critique reports them; standalone, the edit's alternatives line offers the partner declaration. A dossier-declared material (`materialFamily`, a kind row that declares one) is honoured on that element only (origin `dossier`). A map-side partner on a dossier map is refused `dossier-owned`. | The task: setAttr and materialOverride still win; item 20 (h): dossier facts never move and a user's edit of a map fact is theirs (§7.7 item 11); the owner's refinement binds derivation and growth, not an author's explicit act, which the critique makes visible. The partner set is a dossier fact. |
| D39. Standalone partner declaration: V09's Trade control writes `source: 'declared'` partners into the creation slice (an `Adjust` whose re-derivation is scoped by the supply's family slices: the picks and S2's producer demand for a changed family), or into a timeline entry's slice for an epoch. | §7.6's slice rule already re-derives exactly the entities citing a changed slice; making the supply's families slices gives least disruption with no new mechanism. |

## 7. What was considered and not chosen

- **A town-wealth factor on the means** (`wealthLevel`): rejected — item 114 is the owner's mechanism for town wealth;
  adding a second would double-count and could disagree with it.
- **Band-share tables per material** (the regional-shift form): rejected as the default — they cannot express "stone only
  where a partner ships it, and only for the very rich" without a table per supply case; the cost ladder does it with one
  formula and a handful of cells.
- **A free-form "trade access" import** for ports and river towns without a named partner: forbidden by the owner.
- **Reading SettlementForge's `resourceAnalysis`, `nearbyResourcesNative[]` or campaign ledgers**: not in the adopted
  list; `…Native` has no established meaning (read-sf §3.4); the ledgers are on the never-read list.
- **Culture prose** (`culturalIdentity.builtForm`): never parsed; culture enters only as our own cost rows keyed by the
  culture key (clean-room).
- **Re-picking standing fabric when a link closes**: rejected (D28).
- **A `stack` part and per-wing roof coverings**: rejected (D22).

## 8. Bars → test ids (all §13.2, cited by the volumes)

T116-1 no-op pin · T116-2 texture only · T116-3 licence invariant · T116-4 both local · T116-5 timber, no stone · T116-6
timber with a stone partner · T116-7 the reverse · T116-8 cost function · T116-9 monotone pick · T116-10 mixed ·
T116-11 one native test · T116-12 dossier deposits · T116-13 partners (DR3) · T116-14 supply web and producers · T116-15
earth only · T116-16 everything native · T116-17 desert · T116-18 marsh or delta · T116-19 mountain · T116-20 port and
route · T116-21 thorp to metropolis · T116-22 item 114 · T116-23 islands (item 115) · T116-24 history replay · T116-25
a link over epochs · T116-26 sources over epochs · T116-27 structures · T116-28 paving · T116-29 institutions ·
T116-30 overrides and the dossier · T116-31 determinism and load · T116-32 why, legend, export, compile totality.
