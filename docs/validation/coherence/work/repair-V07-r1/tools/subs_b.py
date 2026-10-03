# §3 — repair-V07-r1
def apply(d):
    # §3.0: the key's type (VAL-12/VAL-13)
    d.sub("""and `raised` (item 110 (b)'s parts from 1, V07 §2.7;
item 290)""", """and `raised` (item 110 (b)'s parts from 1, §4.1's `RaisedRead`;
item 290)""", tag='VAL-13 §3.0')

    # §3.4 (8): the patch rows are walls.patchMaterials' (VV78-05)
    d.sub("""   The village kinds' patch rows are V11's patch table's rows for these kinds (by wall kind and culture; V11 holds the
   values): `palisade` — `odd_stakes` (mismatched posts driven into the gap), `hurdles` (woven wattle panels lashed between
   posts), `brush` (a dead hedge of thorn and cut brush); `earthwork` — `brush` on the bank crest, `turf` (a re-cut turf bank
   without its ditch); `inner` — `timber_hoarding`, `dry_stone` infill (as a town wall's). A patch is a condition of a run""",
          """   The village kinds' patch rows are `walls.patchMaterials`' (V11 §3.25.3: by wall kind and culture, drawn by weight among
   the rows admitted for the kind and culture, V06 §3.7.7 (3); V11 holds the values): `palisade` — `odd_stakes` (mismatched
   posts driven into the gap), `hurdles` (woven wattle panels lashed between posts), `brush` (a dead hedge of thorn and cut
   brush); `earthwork` — `brush_and_turf` (brush and re-cut turf on the bank's crest, without its ditch), `hurdles`; `inner` —
   V11's masonry rows, as a town wall's. A patch is a condition of a run""", tag='VV78-05 §3.4')

    # §3.5: the rung gate's narration (VV78-20)
    d.sub("""**The rung gate on the router** (item 110 (b) as revised ~23:40: generated raised ways""",
          """**The rung gate on the router** (item 110 (b): generated raised ways""", tag='VV78-20 §3.5')

    # §3.5a: heading (VV78-20); the key and the support state (VAL-13)
    d.sub("""### 3.5a A raised way on a village map (item 110 (b) as revised ~23:40; J-V7.83)""",
          """### 3.5a A raised way on a village map (item 110 (b); J-V7.83)""", tag='VV78-20 §3.5a heading')
    d.sub("""**(2) The data key.** `raised` (V07 §2.7's `RaisedRead`): the ground arena's parts from 1 read as one key — per raised way
its deck strip, supports, two feet, spans with their state and, for an aqueduct, its channel — published by the declaration
layer (V07 §3.0). VS3, VS4, VS5, VS6, S10, S12a, the hinterland unit and VS8 declare it as an input (V07 §3.0's table). No
village stage writes a part from 1.""",
          """**(2) The data key.** `raised` (§4.1's `RaisedRead`): the ground arena's parts from 1 read as one key — per raised way
its deck strip, its supports and spans by their keys with their `state`, two feet and, for an aqueduct, its channel —
published by the declaration layer (V07 §3.0). VS3, VS4, VS5, VS6, S10, S12a, the hinterland unit and VS8 declare it as an
input (V07 §3.0's table). No village stage writes a part from 1. **A support stands for the village while its `state` is
absent or `ruined`** (a ruined pier is a stump of masonry): such a support is an obstacle ((3)), a stretch the palisade abuts
((4)) and a hole in the faces beneath ((5), (6)); a `cleared` support (taken down in V06 §3.19.2's decline, its stone
credited) is none of these, its ground free at the next derivation.""", tag='VAL-13 §3.5a (2)')
    d.sub("""* **Supports are obstacles.** A support's footprint grown by `raised.supportClearM` (1 m) is an obstacle, looked up in a
  uniform grid index of the supports (cell 10 m). When a step would enter one, the heading turns by `raised.turnStepCdeg`
  (15°) steps — first to the side nearer the tracker's target, else to the side of higher density, alternating sides — up""",
          """* **Supports are obstacles.** A support whose `state` is absent or `ruined`, its footprint grown by
  `raised.supportClearM` (1 m), is an obstacle, looked up in a uniform grid index of those supports (cell 10 m). When a
  step would enter one, the heading turns by `raised.turnStepCdeg` (15°) steps — first to the side nearer the tracker's
  target, else to the side of higher density, alternating sides — up""", tag='VAL-13 §3.5a (3)')
    d.sub("""**(4) VS3 — the palisade.** A support standing in the planned palisade's band is taken into the stretch: the stretch abuts
its two faces (town walls were built against aqueduct piers); the support is never moved and never a gate, and a gate VS4
would make within `raised.supportClearM` of it moves along the trace to the nearest clear point.""",
          """**(4) VS3 — the palisade.** A support whose `state` is absent or `ruined` standing in the planned palisade's band is
taken into the stretch: the stretch abuts its two faces (town walls were built against aqueduct piers); the support is
never moved and never a gate, and a gate VS4 would make within `raised.supportClearM` of it moves along the trace to the
nearest clear point.""", tag='VAL-13 §3.5a (4)')
    d.sub("""quotas are allocated over the raceable slots only, so `N_v` stays exact. Crofts, closes (a reached close included) and
paddocks may pass beneath, the supports cut out as holes (§3.6's hole rule). The perimeter is not changed by a raised way.""",
          """quotas are allocated over the raceable slots only, so `N_v` stays exact. Crofts, closes (a reached close included) and
paddocks may pass beneath, the supports whose `state` is absent or `ruined` cut out as holes (§3.6's hole rule). The
perimeter is not changed by a raised way.""", tag='VAL-13 §3.5a (5)')
    d.sub("""**(6) S12a and the hinterland unit.** Field, meadow, common, pasture and wood faces pass beneath, the supports as holes
(fields under arches are the historical sight); a furlong's strips run through; no hedge, headland or field line follows a
deck; V07 §3.9's outward claim and suitability ignore the deck.""",
          """**(6) S12a and the hinterland unit.** Field, meadow, common, pasture and wood faces pass beneath, the supports whose
`state` is absent or `ruined` as holes (fields under arches are the historical sight); a furlong's strips run through; no
hedge, headland or field line follows a deck; V07 §3.9's outward claim and suitability ignore the deck.""", tag='VAL-13 §3.5a (6)')

    # §3.8: the ceiling's base home (VPC-06); "specified" cited at V08 (VV78-04's V07 half)
    d.sub("""§4.2 S10b's rung ceiling on the class mix""", """§4.7 S10b's rung ceiling on the class mix""", tag='VPC-06 §3.8')
    d.sub("""**"Unless specified"** (item 115 (c)): a manor or other grand building a dossier names
— a manor, hall or similar record, or a dossier government whose `villageSeat` names the manor (DR11's forced seat) — or one
the author places or reshapes by hand (T6 `place`, V07 §4.1) keeps its full design: the ceiling is a default, never a
refusal (item 101 R2), and the clerk says the building exceeds the tier's usual (V07 §4.5). What the dossier's words count
as "specified" is V08's reading.""",
          """**"Unless specified"** (item 115 (c)): a manor or other grand building the dossier
specifies (V08 §3.16 (3)'s reading; DR11's forced seat among its cases) or one the author places or reshapes by hand (T6
`place`, V07 §4.1) keeps its full design: the ceiling is a default, never a refusal (item 101 R2), and the clerk says the
building exceeds the tier's usual (V07 §4.5).""", tag='VV78-04 (V07 half) §3.8')

    # §3.8a (1): the datum's reader (VV78-14); (2): no wall on a cliff (VEW-16)
    d.sub("""   item 309), which the heights (§2.2's datum), §8.4's shadows and V04's foundation reach (V04 §3.5.0) read. Below the""",
          """   item 309), which the ground datum (§2.6's `deriveBase`), §8.4's shadows and V04's foundation reach (V04 §3.5.0) read.
   Below the""", tag='VV78-14 §3.8a (1)')
    d.sub("""   wings. Two adjoining platforms share one wall on their common edge (V07 §2.5's owner rule), its step the difference of
   their datums.""",
          """   wings. Two adjoining platforms share one wall on their common edge (V07 §2.5's owner rule), its step the difference of
   their datums. **No wall on a cliff** (§4.7 S10's hard-line rule, J-A110.43, read at the village rungs): an interval of a
   platform's edge that runs along a bank of kind `cliff`, a closure arc of kind `cliff` or `sheer` (§4.4) or a cliff inside
   the district (§4.7) takes no `RetainingWall`, whatever its step — the cliff face holds the ground; the platform, clipped to
   its toft, keeps the cliff setback S10's regions keep (§4.2 S1 (8)'s `cliff` row; §4.7), so no platform is levelled across
   a cliff.""", tag='VEW-16 §3.8a (2)')

    # §3.9: standing supports as holes (VAL-13); the woods' re-roll (VDC0-15, VV78-13)
    d.sub("""Faces beneath a raised way are claimed as any other, the
supports cut out as holes (V07 §3.5a (6)).""", """Faces beneath a raised way are claimed as any other, the
standing supports (V07 §3.5a (2)) cut out as holes (V07 §3.5a (6)).""", tag='VAL-13 §3.9')
    d.sub("""their crowns are drawn on the `render.instances` stream
and rerollable alone by `rerollLayer('forest')`, bound to T10 `hold` beside `rerollLayer('village.track')`.""",
          """their crowns are drawn on the `render.instances` stream
and re-rolled by T12 `dress`'s New trees (`rerollLayer('render.instances')`, town-wide and display only; §6.1, §7.1; V09 §4.5).""", tag='VDC0-15 §3.9')

    # §3.9 (1): the farm table's meadow and pasture cells named (VAL-14's V07 half; pipeline r1 lands them on §4.9's FarmTable)
    d.sub("""1.2 ha per head including fallow (`arableHaPerCapita`), meadow 0.15, pasture and commons 0.6, fuel 1.0 m³ per head and year
against coppice at 4 m³ per ha and year (0.25 ha), timber 0.15 m³ against 2 m³ per ha (0.075 ha) — the base's fuel and""",
          """1.2 ha per head including fallow (`arableHaPerCapita`), meadow 0.15 (`meadowHaPerCapita`), pasture and commons 0.6
(`pastureHaPerCapita`), fuel 1.0 m³ per head and year against coppice at 4 m³ per ha and year (0.25 ha), timber 0.15 m³
against 2 m³ per ha (0.075 ha) — the base's fuel and""", tag='VAL-14 (V07 half) §3.9 (1)')
    # §3.11 DR1: the arid water (VV78-03)
    d.sub("""`desert` → the arid row (V07 §3.1 (1)'s arid
  water weights), an oasis with `oasis_water` (DR40), and a pond only with it. A bridge-implying record (`Toll bridge`)""",
          """`desert` → the arid row: S0's
  water weights re-weighted by V07 §3.1 (1) (each type at its class's arid chance — a brook, stream, river, pond or coast all
  stay possible) and the oasis exactly when `oasis_water` is listed (DR40; V08 §2.6's `site` row). A bridge-implying record
  (`Toll bridge`)""", tag='VV78-03')

    # §3.12: which path runs, the registration's values (VAT0-12, VAT0-18)
    d.between("""**Which path runs.** An epoch's product and rung""", """table reads are VS1's and VS2's (V11 §3.1 row 61's readers, recorded by T-V11-1 (b)); no stage id or concern is added.""",
              WHICH_NEW, tag='VAT0-12, VAT0-18 §3.12')
    # §3.12 (b): the base's §6.3 in its own parentheses (VV78-16)
    d.sub("""cause `demand` for a roster member, minted as V06
  §3.9.6 mints an opening (the town root as derivation unit, the placing phase's stage id, the epoch and its ordinal in that
  phase's opening order, §6.3);""", """cause `demand` for a roster member, minted (§6.3)
  as V06 §3.9.6 mints an opening (the town root as derivation unit, the placing phase's stage id, the epoch and its ordinal
  in that phase's opening order);""", tag='VV78-16 l.2345')
    # §3.12 pins: the registration cited (VAT0-18); the author (VAT0-14)
    d.sub("""VS8 is a generation stage; at a village epoch its rows run through the
participant `village.pins`, registered by `@plat/village` at `afterGrowth`, order 60 (after V06's participants, V06 §3.2's
table), stage `VS8`, acting at a village rung only (at any other rung its run returns no ops), over what the epoch changed
and by least disruption, in this order:""", """VS8 is a generation stage; at a village epoch its rows run through the
participant `village.pins` (*The village's registration* above), over what the epoch changed and by least disruption, in
this order:""", tag='VAT0-18 §3.12 pins')
    d.sub("""the pin records VS8 writes (author `engine`, cause `rule:village.pins`)""",
          """the pin records VS8 writes (author `epoch`, cause `rule:village.pins`)""", tag='VAT0-14 §3.12')
    # §3.12 decline: the strike pool (VAT0-08)
    d.sub("""landing clause at the draw): struck at V06 §3.5.2's street rate per year over the epoch's span (`1 − (1 − p)^years`, §4.11
*The clock* (5)), it takes **`retireWay`**""", """landing clause at the draw): struck by V06 §3.5.2's strike pool at the `street` persistence row (its weight
`E(x) · rate · u`, under the district's `fabric` churn cap scaled by the epoch's years), it takes **`retireWay`**""", tag='VAT0-08 §3.12')
    # §3.12 hand-off up step 2 (VAT0-18) and step 4 (VV78-16 l.2530)
    d.sub("""registered as participants of the base product (`village.density` at `afterField`, order 20, stage `VS2`, V06 §3.2), so""",
          """registered as participants of the base product (`village.density`, *The village's registration* above), so""", tag='VAT0-18 §3.12 step 2')
    d.sub("""4. The epoch's residual grows by the base's path from S5 on (V06 §3.6's growth, §4.4): the stage-k boundary""",
          """4. The epoch's residual grows by the base's path from S5 on (§4.4), as V06 §3.6's growth states: the stage-k boundary""", tag='VV78-16 l.2530')

    # §3.15: the woods' re-roll (VDC0-15)
    d.sub("""the woods on the
`render.instances` stream rerollable by `rerollLayer('forest')`; the empty-road prune""", """the woods' crowns on
the `render.instances` stream (re-rolled by T12 `dress`'s `rerollLayer('render.instances')`); the empty-road prune""", tag='VDC0-15 §3.15')

    # §3.16 (3): V04's rules cited, the village's rows and readings kept (VAL-10)
    d.between("""* **(i) Dug from above.** Every village building standing over""", """`v.pound` and `v.charcoal_pit` 0 (no floor to dig from).""",
              DIG_NEW, tag='VAL-10 (i)')
    d.sub("""* **(ii) Wells.** Every VS8 `well` or `pump` pin whose shaft passes through a chamber or gallery is an access (a well that broke
  through), by V04's well reading in T2b (V04 §3.5.7 (f)); an oasis's spring is the base's water, never a well.""",
          """* **(ii) Wells** — V04 §3.5.7 (f)'s well reading over VS8's `well` and `pump` pins: a well that broke through is an access; an
  oasis's spring is the base's water, never a well.""", tag='VAL-10 (ii)')
    d.sub("""* **(iii) Public openings** by V04's `OpeningRow`: a sinkhole under no footprint (a field, the green, a common), a cave mouth
  where a gallery meets a slope's face anywhere in the territory, a collapsed shaft under a field face or the green, a ruin
  entrance at its surface marker — each by V11 §3.23.7's `OpeningRow` chances, the ruin entrance's 1 where the dossier makes the
  ruin known.""",
          """* **(iii) Public openings** — V04 §3.5.7 (e)'s candidates and V11 §3.23.7's `OpeningRow` chances (the ruin entrance's 1 where
  the dossier makes the ruin known), at the village's places: a sinkhole under a field, the green or a common; a cave mouth
  anywhere in the territory; a skylight; a collapsed shaft under a field face or the open space (V04's cover bound); a ruin
  entrance at its surface marker ((6)).""", tag='VAL-10 (iii)')
    d.sub("""**(7) Over time.** Every building V07 §3.12's village siting adds over a void draws once, so""",
          """**(7) Over time.** Every building V07 §3.12's village siting adds over a void takes (i)'s draw, so""", tag='VAL-10 (7)')

    # §3.17 (a): the omitted edge classes (VV78-08), the editing row's tests, the new rows; (b): rungs and the cliff (VEW-21, VEW-16)
    d.sub(EDIT_OLD, EDIT_NEW, tag='VV78-08 editing row')
    d.sub(CLERK_OLD, CLERK_NEW, tag='VV78-08 clerk row')
    d.sub(REND_OLD, REND_NEW + '\n' + WAITS_ROW + '\n' + FIND_ROW, tag='VV78-08 rendering row; VV78-02, G120 rows')
    d.between("""**(b) Combinations** (two units' features meeting at their limits):""",
              """| the zoom-out limit at a village that grows its frame | the limit moves with the bounds (item 116 (d); V07 §5.2) | T-V7-64 |""",
              COMB_NEW, tag='VEW-21, VEW-16 §3.17 (b)')


WHICH_NEW = """**Which path runs.** An epoch's product and rung are the fold's of V07 §2.1 (§4.11 *The rung at an epoch* and *The product
at an epoch*, items 322 and 317; V06 §3.1 (3)–(4)), never the target's own rung (the hand-off band: a village passes to the
town product only at 1 575 and back only below 1 425; J-V7.68); with the village product registered the engine's target
clamp admits [0, 120 000] (V06 §3.1 (4)). While the fold gives the village product the epoch runs the village's phases; the
base product, the base's. **The village's registration** — the values of V06 §2.1's `ProductDeclEpoch` members on
`ProductDecl('village')` (V07 §2.1; item 202), each participant's step, order, stage and scope V06 §3.2's tables':
* `phases` — the village's `siting` and `growth` (*Village siting* and *Village growth phase* below), which the runner takes
  in place of the engine's at a village rung (item 317);
* `participants` — `village.plan` (stage `VS1`: it re-runs VS1's plan read, at `afterField`, so the plan exists before the
  siting phase reads it), `village.density` (stage `VS2`: VS2's density raster on the old core's recorded inputs, while a
  superseded `VillagePlan` stands, under any product, so a re-derived old core runs the village fabric; J-V7.67) and
  `village.pins` (stage `VS8`: *Pins over epochs* below; J-V7.126), each run at every epoch and acting only where its scope
  admits (V06 §2.1; J-V6.124); their draws key by those stages (§6.1) on the concerns V07 §3.14 names, and their table reads
  are VS1's, VS2's and VS8's (V11 §3.1 row 61's readers, recorded by T-V11-1 (b)); no stage id or concern is added (V06
  §2.1's `EpochParticipant.stage`, V06 §3.16; J-V7.122);
* `rows` — `village.json`'s `epoch.rows` cell (V07 §2.2), typed V06 §2.1's `ProductEpochRows`: the decline step's
  persistence multipliers and way ops and the hinterland step's slack, order and per-epoch cap (V06 §3.5.2, V06 §3.5.3);
* `records` — `village.records`, stage `S10b` (*Records at a village epoch* below; J-V7.125, J-V7.129, J-V7.130).

Every other step of V06 §3.2's order (V06 §3.1 (4); the participants at their steps) is the engine's — the field step with
item 102's building shade mask (V06 §3.4) among them — reading the village's `epoch.rows` cell where it states a village row
and otherwise unchanged. **Before M6-E** the base's `grow-by-stage` path takes the same two overrides, its dossier step (e)
calls `village.records` as the engine's does, and the participants run on M4's grow path — all at the call points item 202
adds to §4.11's order (a)–(j), at the places V06 §3.2's table gives the same steps, with the `ProductEpochContext` the grow
path fills (V06 §2.1); on that path the extension V06's E1 adds is absent — the siting override's tier (0) reads an empty
pool and step (m)'s roster joins take the base's churn cap (§4.11 *Churn*) — and what the path cannot run before M6-E is
V07 §8's risk (10) (J-V7.132). No stored flag decides (V07 §2.1): a village that grew into a town runs the base's path, a
town that shrank into a village the village's."""

DIG_NEW = """* **(i) Dug from above** — V04 §3.5.7 (d)'s draw, at every village building, with **the village classes' rows** of
  `DigRule.classRow` (this volume's, in V04's table; own): `v.parish_church`, `v.chapel` 0.5 (a religious house); a mining
  class's pithead 0.5; `v.manor_house` 0.35 (a great house); `v.inn`, `v.alehouse` 0.3 (a cellar); `v.smithy`, `v.potter`,
  `v.tannery`, `v.bakehouse`, `v.watermill`, `v.windmill`, `v.wood_yard`, `v.landing`, `v.shop` 0.15 (a workshop); `v.farmstead`,
  `v.yeoman_house`, `v.cottage`, `v.longhouse`, `v.parsonage`, `v.reeve_house`, `v.tithe_barn`, `v.watchtower` 0.12 (an ordinary
  house); `v.hovel` 0.03; `v.pound` and `v.charcoal_pit` 0 (no floor to dig from). The buildings V07 §3.12's (6v)–(9v) and the
  dossier's absorb add at epochs are village buildings like the rest."""

EDIT_OLD = """| editing (V07 §4.1–§4.4) | degenerate: a zero-length stroke (T4 `road`'s walk mode, T3 `wall`, a lasso of zero area in `declareEnd`) is a dry-run F-EDIT refusal of shape, never an event; one: a lasso holding one plot declares a one-plot end; rungs: every tool at every village rung; lifecycle: every edit kind's V07 §4.4 row | check | T-V7-19 – T-V7-21, T-V7-60 (h) |"""
EDIT_NEW = """| editing (V07 §4.1–§4.4) | none: an undo with no village edit in the log changes nothing; one: a lasso holding one plot declares a one-plot end; degenerate: a zero-length stroke (T4 `road`'s walk mode, T3 `wall`, a lasso of zero area in `declareEnd`) is a dry-run F-EDIT refusal of shape, never an event; data: an edit whose target a dossier absorb removed is a dry-run F-EDIT naming the absorb; rungs: every tool at every village rung; lifecycle: every edit kind's V07 §4.4 row | check | T-V7-22, T-V7-54, T-V7-60 (h) |"""
CLERK_OLD = """| the clerk (V07 §4.5) | data: a `why` on a superseded `VillagePlan` answers from its record with the "when this was a village" line; a village with no end answers the one district; lifecycle: the provider reads committed records only | check | T-V7-61 |"""
CLERK_NEW = """| the clerk (V07 §4.5) | degenerate: a `why` on a zero-area end or a field with no face answers its anchor's or system's line; data: a `why` on a superseded `VillagePlan` answers from its record with the "when this was a village" line; a village with no end answers the one district; lifecycle: the provider reads committed records only | check | T-V7-61, T-V7-60 (h) |"""
REND_OLD = """| rendering, labels, exports (V07 §5) | none: a village with no palisade, green or field draws the rest; degenerate: a label on a zero-area end is dropped by §9's rules; rungs: every rung, `painterly` and `ink`; lifecycle: every export re-derived from the committed model | leave out | T-V7-25, T-V7-60 (h) |"""
REND_NEW = """| rendering, labels, exports (V07 §5.1–§5.4) | none: a village with no palisade, green or field draws the rest; one: a one-dwelling THORP exports every format; degenerate: a label on a zero-area end is dropped by §9's rules; data: a dossier title word absent → the rung's word; rungs: every rung, `painterly` and `ink`; lifecycle: every export re-derived from the committed model | leave out | T-V7-25, T-V7-60 (h) |"""
WAITS_ROW = """| the one-time waits (V07 §6) | cap: every one-time wait at P = 1 499 on the largest frame, an epoch and the history replay included, within the comfort level, the target misses declared; a wait past one second shows its progress; rungs: every village rung on the reference machine, the low tier's unreachable sizes declared per device (item 119 (e)) | check | T-V7-67 |"""
FIND_ROW = """| Find at the village rungs (V07 §5.5) | none: no chip on, the view unchanged; one: a class with one member glows once, its count 1; data: a chip whose end or field an epoch, an edit or a hand-off removed stays at count 0, dark, until removed or revived; rungs: THORP with no end (the village itself the one area and gaps unit), HAMLET, VILLAGE, under `VG`; lifecycle: the `find` key never in the document — saved in view pins only, untouched by undo, redo, regenerate and migrate, re-evaluated at every commit | check | T-V7-68, T-V7-60 (h) |"""

COMB_NEW = """**(b) Combinations** (two units' features meeting at their limits; the rung is a failure ladder's where the outcome is one,
"—" where it is a rule):

| combination | defined outcome | rung | test |
|---|---|---|---|
| a village that grows over a sealed cavern or ruin | each building the epoch adds over the void takes V04 §3.5.7 (d)'s draw (V07 §3.16 (7)); dwellings only after access | — | T-V7-38 |
| a raised way over the palisade | the stretch abuts the standing supports (a `cleared` one none), no gate under the deck (V07 §3.5a (4)) | — | T-V7-52 |
| a raised way beside the fair field | the fair field slides clear of the strip and the standing supports | F-V-FAIR's ladder | T-V7-13 |
| a deck plot on a bridge over a moat | none at a village rung: the manor's moat is a yard part, never water a bridge crosses (V07 §3.8) | — | T-V7-60 (i) |
| a retaining wall on a cliff edge | no house platform's wall stands along a cliff bank, a cliff or sheer arc or a cliff inside the district: the cliff face holds the ground and the platform keeps the cliff setback (V07 §3.8a (2)); the palisade's barrier closure treats the cliff as a barrier, never the wall | — | T-V7-47, T-V7-31 |
| an oasis inside the palisade's reach | its shore is a barrier (V07 §3.4 step 5 a); the palisade never fences it | — | T-V7-58 |
| an oasis village with an arid climate cell | the sun terms at the climate cell (0 or toward shade), the water pull carrying the crowding (V07 §3.3) | — | T-V7-58 |
| a dossier removing what an edit pinned | the dossier wins (item 20); the pin lapses by §7.7's lapse rule, reported | leave out and report | T-V7-13 |
| an epoch undone after a save | the undo record in the saved log restores it on load (§2.9, §7.4) | — | T-V7-14 |
| a patched palisade at the hand-off up | the runs keep their condition and material (V07 §3.12 step 1); the town's walls step governs from TOWN | — | T-V7-62 |
| a manor specified at a HAMLET by a dossier | kept with its full design (item 115 (c)); a second manor never generated | — | T-V7-63 |
| a refounded village over a ruined town wall | trackers cross at its gate gaps and breaches (V07 §3.12a (4) (d)) | — | T-V7-59 |
| a village over a buried former city and a well that meets it | the well is an access (V07 §3.16 (3) (ii)); the buried system in maintenance mode | — | T-V7-59, T-V7-38 |
| the zoom-out limit at a village that grows its frame | the limit moves with the bounds (item 116 (d); V07 §5.2) | — | T-V7-64 |
| a Find chip on an end at the hand-off up | the end superseded, the chip kept at count 0; the hand-off down revives the end at its address and the chip lights again (V07 §5.5) | — | T-V7-68 |"""
