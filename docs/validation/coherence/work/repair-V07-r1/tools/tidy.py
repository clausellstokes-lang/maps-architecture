# Re-wrap the lines the substitutions left ragged (no word changed).
def apply(d):
    d.sub("""   item 309), which the ground datum (§2.6's `deriveBase`), §8.4's shadows and V04's foundation reach (V04 §3.5.0) read.
   Below the
   threshold the platform follows the ground and the base's plinth and skirt carry the fall.""",
          """   item 309), which the ground datum (§2.6's `deriveBase`), §8.4's shadows and V04's foundation reach (V04 §3.5.0) read.
   Below the threshold the platform follows the ground and the base's plinth and skirt carry the fall.""", tag='tidy §3.8a')
    d.sub("""wood; the rest wildwood (and waste above the tree line or on rock). Faces beneath a raised way are claimed as any other, the
standing supports (V07 §3.5a (2)) cut out as holes (V07 §3.5a (6)). **The request's forest** (`forest`): `many` doubles the wood claim, `some` leaves
it, `grove` reverses it (the woods only in the ring nearest the perimeter, the far bands open ground).""",
          """wood; the rest wildwood (and waste above the tree line or on rock). Faces beneath a raised way are claimed as any other, the
standing supports (V07 §3.5a (2)) cut out as holes (V07 §3.5a (6)). **The request's forest** (`forest`): `many` doubles the
wood claim, `some` leaves it, `grove` reverses it (the woods only in the ring nearest the perimeter, the far bands open
ground).""", tag='tidy §3.9')
    d.sub("""  stay possible) and the oasis exactly when `oasis_water` is listed (DR40; V08 §2.6's `site` row). A bridge-implying record
  (`Toll bridge`)
  applies V08 §2.6b (3)'s rule at the village rung (V07 §3.1 (1)). `site.culture` → `cultureForms` (V07 §2.2) and the
  longhouse factor.""",
          """  stay possible) and the oasis exactly when `oasis_water` is listed (DR40; V08 §2.6's `site` row). A bridge-implying record
  (`Toll bridge`) applies V08 §2.6b (3)'s rule at the village rung (V07 §3.1 (1)). `site.culture` → `cultureForms` (V07 §2.2)
  and the longhouse factor.""", tag='tidy DR1')
    d.sub("""landing clause at the draw): struck by V06 §3.5.2's strike pool at the `street` persistence row (its weight
`E(x) · rate · u`, under the district's `fabric` churn cap scaled by the epoch's years), it takes **`retireWay`** to the `abandoned` existence (the ways' decline ladder, item 268), its
`Lifecycle.since.epoch` the disuse epoch: a **hollow way**, drawn sunken (V07 §5.1), skipped by the trackers' merge test and""",
          """landing clause at the draw): struck by V06 §3.5.2's strike pool at the `street` persistence row (its weight
`E(x) · rate · u`, under the district's `fabric` churn cap scaled by the epoch's years), it takes **`retireWay`** to the
`abandoned` existence (the ways' decline ladder, item 268), its `Lifecycle.since.epoch` the disuse epoch: a **hollow way**,
drawn sunken (V07 §5.1), skipped by the trackers' merge test and""", tag='tidy decline')
    d.sub("""4. The epoch's residual grows by the base's path from S5 on (§4.4), as V06 §3.6's growth states: the stage-k boundary is grown from the
   village perimeter as the previous stage's boundary,""",
          """4. The epoch's residual grows by the base's path from S5 on (§4.4), as V06 §3.6's growth states: the stage-k boundary is
   grown from the village perimeter as the previous stage's boundary,""", tag='tidy step 4')
    d.sub("""forest mode with its clearances (V07 §3.9; `vg.fieldOneHouse`, `vg.orchardOnHouse`, `vg.forestMode`), the woods' crowns on
the `render.instances` stream (re-rolled by T12 `dress`'s `rerollLayer('render.instances')`); the empty-road prune (V07 §3.5 finish); item 110's rows off
— no platform levelling (`rules.terrace.enabled` false), `deck.headChance` 0, and no raised way but a declared one (the""",
          """forest mode with its clearances (V07 §3.9; `vg.fieldOneHouse`, `vg.orchardOnHouse`, `vg.forestMode`), the woods' crowns on
the `render.instances` stream (re-rolled by T12 `dress`'s `rerollLayer('render.instances')`); the empty-road prune (V07 §3.5
finish); item 110's rows off — no platform levelling (`rules.terrace.enabled` false), `deck.headChance` 0, and no raised
way but a declared one (the""", tag='tidy §3.15')
    d.sub("""Every base format exports a village (§11.1): SVG and PNG by band and family, framed within the zoom-out limit and drawing the
chosen season and the festival shown, both named (items 116, 117, 118), and Find as shown with its chips in the legend (item
120 (i); V07 §5.5); GeoJSON in metres; VTT scenes (one at the district band — the palisade and buildings as
walls, gates as doors, a `patched` run a wall and a `breached` one an opening (item 114 (f)), ice walkable only in a severe
winter (item 117 (h)), a festival's decorations in the image only, never walls or obstacles (item 118 (g)), Find off unless asked (item 120
(i)) — and one at the
city band); glTF / OBJ with heights; CityJSON; the `.plat` document; the skeleton file""",
          """Every base format exports a village (§11.1): SVG and PNG by band and family, framed within the zoom-out limit and drawing the
chosen season and the festival shown, both named (items 116, 117, 118), and Find as shown with its chips in the legend
(item 120 (i); V07 §5.5); GeoJSON in metres; VTT scenes (one at the district band — the palisade and buildings as walls,
gates as doors, a `patched` run a wall and a `breached` one an opening (item 114 (f)), ice walkable only in a severe winter
(item 117 (h)), a festival's decorations in the image only, never walls or obstacles (item 118 (g)), Find off unless asked
(item 120 (i)) — and one at the city band); glTF / OBJ with heights; CityJSON; the `.plat` document; the skeleton file""", tag='tidy §5.4')
    d.sub("""118 + 1–1.5, item 116 inside §8.8's limit + 0.25, the `WhyProvider` and the edge suite + 0.25–0.5, item 119's one-time waits + 0.25, item
120's Find at the village rungs + 0.25–0.5); §16's village line and INDEX §4
carry it (item 568 computes the totals once).""",
          """118 + 1–1.5, item 116 inside §8.8's limit + 0.25, the `WhyProvider` and the edge suite + 0.25–0.5, item 119's one-time
waits + 0.25, item 120's Find at the village rungs + 0.25–0.5); §16's village line and INDEX §4 carry it (item 568 computes
the totals once).""", tag='tidy §8 total')
