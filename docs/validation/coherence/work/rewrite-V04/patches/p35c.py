G_NEW = """* **(g) The excavation reading (g item 109 (j) (2)–(4), item 113 (e); J-V4.53, J-V4.122).** `excavation(doc, cluster)`
  is `'accessible'`, `'unexcavated'` or `'lost'` (V04 §2.2) for every cluster — a connected component of a part's open
  galleries and chambers, joined at junctions and chamber walls — of a `cavern` or `ruin` part and of the buried
  former settlement ((b) of V04 §3.5.5). **Open links only.** The connection graph's nodes are the clusters of every part
  and the surface; its edges are the **open** ways through: a link of kind `open`, `gated` or `secret` whose two end
  elements are open, and an access point in state `open` or `locked` whose element is open and whose ground host stands.
  A gate, a lock or a secret closes a way to strangers and not to the ground, so it counts; a link `collapsed` or
  `flooded`, an access `bricked` or reading collapsed (its element closed, II.6) and an access whose host building is lost
  (V04 §3.10's host closures) do not. So a cluster reached only through a secret link is `accessible` — its dwellers
  come and go — while the knowledge filter hides that way from every viewer whose key does not admit it (§9.2). A cluster
  is `accessible` when the graph joins it to the surface — transitively, so opening one void can open those beyond it;
  else it is `lost` when an element of it stands in its system's `ExcavationRecord.reached`, and `unexcavated`
  otherwise. **The record.** In the commit whose reading first makes a cluster `accessible`, U-ACCESS adds its elements
  not yet in `reached`; in the commit whose reading turns an `accessible` cluster `lost`, it writes each element's entry
  in `lostAt` with that commit's `seq`, and clears them in the commit that makes the cluster `accessible` again (V04
  §2.2). **What follows.** A cluster turning `lost` or `unexcavated` vacates its dwellings (F6's, an undercity
  neighbourhood's) by II.7.3's vacancy rules in the same commit — at an epoch returned to V06's participant for re-homing,
  at an edit listed as fates in the dry run (V04 §4.3); a cluster turning `accessible` again takes dwellings at the next
  placement (V06's relocation at the next epoch's `under.undercity`, F6 at a Re-derive), never within the edit that
  reopened it. The undercity leaves a neighbourhood whose void is `lost` by II.7.5's clearance (V04 §3.10). A part of any
  other kind is always reachable and takes no reading: the sewer, catacombs, quarries, vaults and dug passages were dug
  from the surface, and the buried old town is entered from the cellars above (J-V4.62) — a cluster of the `buried` part
  holding an element of an old town ((a) of V04 §3.5.5) is `accessible`. The reading is derived, never stored: a
  union-find over clusters, recomputed after every commit that touches an access, a link, an element's closure or a
  building over a void, for the clusters that commit touches, and cached by the underground's digest; only
  `ExcavationRecord` persists. V12's `undergroundInputOf` reads it as `state`, V09's legend and panel read `lost` with
  its `lostAt` (\"once known; its way in closed in ⟨year⟩\"), V10 tells it."""
P=[
("chambers of `forcedGridM` (8 m) pitch", "chambers of `forcedGridM` pitch"),
("at most `overlapShaftM` (6 m), a `shaft` link with `overlapShaftChance` (0.1; one uniform keyed by the pair, no epoch component).",
 "at most `overlapShaftM`, a `shaft` link where a fixed-key draw (§6.1) on `sewer` keyed by (the pair, `shaft`) falls below `overlapShaftChance`, compared at each growth that meets the pair."),
("wall lies within `breachM` (40 m) in 3-D", "wall lies within `breachM` in 3-D"),
("whose plan band lies within `breachM` (40 m) of the working's plot ring", "whose plan band lies within `breachM` of the working's plot ring"),
("`mine.workingDepthM` row (V07: open cast 10 m, shaft 30 m) below", "`mine.workingDepthM` row (V07 §3.16 (4)) below"),
("or within `accessReachM` (5 m) of one, draws once per (church, complex) pair: one uniform on `sewer` keyed by the pair (the one mixer over the church's and the complex source's lineages, as (b)'s pairs are), no epoch component, so a join first reached by an epoch's growth gives the answer a regeneration gives; its chance `cryptJoin.own` (0.7) when the complex's source is the church's own churchyard, else `cryptJoin.other` (0.3).",
 "or within `accessReachM` (II.7.6) of one, takes a fixed-key draw (§6.1) on `sewer` per (church, complex) pair, keyed by the one mixer over the church's and the complex source's lineages (as (b)'s pairs are), compared whenever the pair first meets, so a join first reached by an epoch's growth gives the answer a regeneration gives; its chance `cryptJoin.own` when the complex's source is the church's own churchyard, else `cryptJoin.other` (V11 §3.23.8)."),
("its basement floor (`baseCm` less `Basement.floors × cellar.depthCm`, §2.6) where it has a basement,",
 "its basement floor (§2.6) where it has a basement,"),
("`DigRule.planReachM` (5 m) in plan of one, draws once per void kind: one uniform on `sewer` keyed by (the building's lineage, `dig`, the void kind), in this stage, no epoch component (the building's lineage already carries the epoch that built it, §6.3). `p = min(cap, classRow(class) × basementFactor × depthFactor(d))`, `cap` 0.6, `classRow` by the building's class (V11 fills every class by its family), `basementFactor` 1.5 with a basement and 1 without, `depthFactor(d)` 1 for `d ≤ reachM` (6 m), `exp(−(d − reachM) ÷ decayM)` beyond (`decayM` 2 m) and 0 beyond `maxM` (20 m), `d` the vertical distance from the dig floor to the element's top.",
 "`DigRule.planReachM` in plan of one, takes one fixed-key draw (§6.1) per void kind on `sewer`, keyed by (the building's lineage — carrying the wing key of a wing V02's mutator adds, V02 §3.9 W6 —, `dig`, the void kind), in this stage (the building's lineage already carries the epoch that built it, §6.3). `p = min(cap, classRow(class) × basementFactor × depthFactor(d))` with `DigRule`'s cells (V11 §3.23.7): `classRow` by the building's class (V11 fills every class by its family), `basementFactor` with a basement and 1 without, `depthFactor(d)` 1 for `d ≤ reachM`, `exp(−(d − reachM) ÷ decayM)` beyond and 0 beyond `maxM`, `d` the vertical distance from the dig floor to the element's top."),
("well pin stands over the element; its head in the basement (V03's access head). The draw is evaluated at every derivation, but its value is fixed by its key: an access once made persists",
 "well pin stands over the element; its head in the basement (V03's access head). The draw is compared at every derivation; an access once made persists"),
("draws its `OpeningRow.chance`: one uniform on `sewer` keyed by (the candidate element's lineage, the opening kind), no epoch component (fixed by its key, never re-drawn).",
 "takes a fixed-key draw (§6.1) on `sewer` keyed by (the candidate element's lineage, the opening kind) against its `OpeningRow.chance` (V11 §3.23.7), compared at each derivation in the candidates' order (V04 §3.5.2, §3.5.0a, then the former settlement's), an opening once made persisting."),
("a `collapsed_shaft` over a quarry, mine or ruin chamber under a square,",
 "a `collapsed_shaft` over a quarry, mine, ruin or former-settlement chamber under a square,"),
("within `reuseM` (3 m) of it for at least 30 m,", "within `reuseM` of it for at least `reuseMinM`,"),
("a cavern or ruin element whose top lies below the building's **dig floor**",
 "a cavern, ruin or former-settlement element whose top lies below the building's **dig floor**"),
("it lies within reach of no foundation obstacle (V04 §3.5.0: basements, raised-way piers, retaining-wall footings; `foundation`);",
 "it lies within reach of no foundation obstacle (V04 §3.5.0: basements — V02's footprint and basement floor, V02 §3.14.5 (f) —, raised-way piers, retaining-wall footings; `foundation`);"),
]
