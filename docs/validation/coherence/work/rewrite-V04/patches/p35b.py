F_TEXT = """they are foundation obstacles (V04 §3.5.0).
* **(f) Grade faces (J-VI.17 H12).** `gradeFaces(chamberId): GradeFace[]` (`@plat/under/sys`; derived, never stored)
  names the sides of a chamber that stand at grade and open to ground part 0:
  ```ts
  interface GradeFace { side: number /* the index of the side in the chamber's outline ring, from its first vertex */;
    seg: [PointCm, PointCm] /* the side as laid, after the inset */;
    onto: { kind: 'way'; way: Id } | { kind: 'open' } /* what its archDoorStripM strip holds most: a part-0 way, else open ground */ }
  ```
  Only an `archVault` has grade faces: each of its two open faces whose `archDoorStripM` strip holds a part-0 way or open
  ground (no footprint, no water) — the same test (d) 1's door reads, so a face that gives no door gives no grade face
  and a walled-up arch has none. Every other chamber returns `[]`: a street or bridge vault lies wholly below its street
  (its floor `vaultBelowCm` under it), entered by its stair. Readers: V03 §3.12 (9) (windows, the frontage entrance with
  `faces` `street`, `lane` or `alley` by the way's class for `way` and `yard` for `open` — never `tunnel` — and the face
  flue on a grade face), V03's `ElaborationRecord.inputs` and the reader (§11.2). Recomputed with its chamber at every
  reconcile; tested by T-V4-62."""
B_OLD = """**3.5.5 A buried old town (J-V4.20).** II.7.6's rule, with its region the growth-stage-1 districts;"""
B_NEW = """**3.5.5 Buried settlements — the old town and the former settlement (J-V4.20; g item 113 (c)).** Both lie in the
settlement's one `buried` system (II.7.6).

**(a) A buried old town.** II.7.6's scar rule, with its region the growth-stage-1 districts;"""
C_OLD = """`portal` rows for the exports. The same builder serves `raiseGrade` at an epoch or by hand (II.7.6), over the raised region's records."""
C_NEW = """`portal` rows for the exports. The same builder serves `raiseGrade` at an epoch or by hand (II.7.6), over the raised region's records, and the former settlement ((b))."""
D_OLD = """with no wall inside the region nothing changes. A buried town is reachable by construction — the raised town's cellars open into its old storeys — so its excavation reading is always `accessible` (J-V4.62)."""
D_NEW = """with no wall inside the region nothing changes. A buried old town is reachable by construction — the raised town's cellars open into its old storeys — so it takes no excavation reading and is always reachable (J-V4.62).

**(b) The buried former settlement (g item 113 (c); J-V4.123).** `BuriedFormer.lay(doc, epoch, former: Id[])` is called
by V06's history replay (§4.11 *History-first generation* (5)) inside the batch of the coarse epoch whose age first passes
the burial threshold for a former fabric (`history.burialYears` × the fabric's burial factor, V11's history rows).
`former` lists the surface records of that fabric the same batch clears — the ruined buildings, the traced or ruined
ways, the enceinte stretches with their gates and towers, the square faces and blocks — read on their last live state,
as `raiseGrade`'s region is (a).
1. **The rise.** The ground stood over the fabric by
   `rise = clamp(formerRiseCmPerCentury × ageYears ÷ 100 ÷ b, formerRiseMinCm, formerRiseMaxCm)`, `ageYears` the fabric's
   age at the present (the replay's years since its destruction or abandonment), `b` its burial factor (below 1 where
   floods, silt and rebuilding bury faster, above 1 on bare rock). Each element's floor is `levelledGroundCm` on the
   fabric's last live state less `rise`: its old ground level, point by point, a tombstoned `RetainingWall` of the fabric
   a step as in (a).
2. **The elements** (keys (`former`, the burial epoch, the former record's lineage), V04 §2.5): a gallery along each
   former way's spine stretch of at least `formerMinGalleryM`, the old way's width, `wallCm` 30, headroom `rise − 50`;
   a `storey` chamber for each former building whose footprint reaches `formerStoreyMinM2` (a smaller one is rubble, not
   laid), ceiling min(its storey height, `rise − 50`); a `square` chamber for each former square face or block; along each
   former enceinte stretch a **wall band** — a gallery of width `formerWallCm`, `wallCm` 0, closure `sealed`, rule
   `buried.formerWall`, drawn as masonry (V04 §5.2) and never a void, a capacity or a U-FADE candidate — and at each former
   gate a `gate` chamber of `formerGateM2` across the band, joined to the gallery of the way through it. One L1 and one L2
   `corridorUnion` batch on the `buried` part (created at the first, §2.9).
3. **Older than the town above.** Like a ruin (V04 §3.5.0), an element under a present footprint or within
   `foundationClearM` of a present basement ring or foundation obstacle is created `collapsed`, cause `foundation`; a
   later epoch's footings reach it through `Foundations.apply`. An element whose floor lies below the water table is
   created `flooded`.
4. **Reach.** Its clusters take the excavation reading (V04 §3.5.7 (g)), starting `unexcavated`: access to them follows
   item 109 (j) — U-ACCESS's dig from above, public openings and breaches, run at the epoch by `under.access` over the
   new elements — and is lost when its last open link closes (item 113 (e)).
5. **Return.** `{ system }` (the `buried` system's id, which V06 writes into `HistoryRecord.buried`), or `null` with
   `W_BURIED_FORMER_SKIPPED` when no element can be laid (no former way stretch, building, square or wall reaches its
   minimum). Deterministic from the seed and the history, with no draw: a replay of the same seed and history lays the
   same records byte for byte (T-V4-78). Its lifecycle is V04 §2.6's row; it is never torn down, and fades by U-FADE.
   Under a standalone neighbourhood document, or with the replay off (`history.replay` false, the parity presets), it is
   never called."""
P=[(("they are foundation obstacles (V04 §3.5.0)."), F_TEXT),(B_OLD,B_NEW),(C_OLD,C_NEW),(D_OLD,D_NEW),
   ("Floors at `scarBaseCm + scarGainCm × severity` below the present grade;","Floors at II.7.6's scar depth below the present grade;")]
