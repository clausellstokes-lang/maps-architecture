E=[
("""   `WingRoleRow.hipInset × span` (0.5 — the plan hip at equal pitches — for ranges; a block's `FM` entry — V02 §3.10.8's measured-rate cell, 0.25 until calibrated (reconciliation round 1,
   SCC-R0C-4) — keeps a ridge half its short side long, never a pyramid; the hip facets' own pitch then follows from the inset and the rise),""","""   `WingRoleRow.hipInset × span` (0.5 — the plan hip at equal pitches — for ranges; a block's `FM` entry — V02 §3.10.8's
   measured-rate cell, 0.25 until calibrated — keeps a ridge half its short side long, never a pyramid; the hip facets' own
   pitch then follows from the inset and the rise),"""),
("""   `valley` extends it into `Y` by `e = (X.ridgeCm − Y.eaveCm) ÷ Y.slope`, the plan distance at which `X`'s ridge meets
   `Y`'s near roof plane (`slope` = the roof's rise per centimetre across); `gable`""","""   `valley` extends it into `Y` by `valleyReach(X, Y, 'float')` (V02 §3.7), the plan distance at which `X`'s ridge meets
   `Y`'s near roof plane; `gable`"""),
("""column — so a lower tier's stack carried up through the tiers above (V03, V3C-68 (2)) rises""","""column — so a lower tier's stack carried up through the tiers above (V03) rises"""),
("""  roof, turned to the settlement's prevailing wind where the site states one, else to `+y`; `smokeStack` — V02 §3.14.6's
  added decorative stacks; and, **only in the `FM` building look**, `stepStones` (a stone path from the main door to the
  frame's access side, stones 0.5–0.8 m at 1 m pitch) and `wallGrass` (grass tufts at re-entrant corners); with the `FM`
  look's per-building roof hue (`weathering` on hue at `w` 0.15, §8.2) and cone facets doubled for drawing only.""","""  roof, turned to the settlement's prevailing wind where the site states one, else to `+y`; `smokeStack` — V02 §3.14.6's
  added decorative stacks; and, **only in the `FM` building look**, `stepStones` (a stone path from the main door to the
  frame's access side, its stone size and pitch the §8.10 row cells `stepStones.sizeM` [0.5, 0.8] and
  `stepStones.pitchM` 1) and `wallGrass` (grass tufts at re-entrant corners); with the `FM` look's per-building roof hue
  (`weathering` on hue at `w` 0.15, §8.2) and cone facets doubled for drawing only.
* **The style-sheet cells this volume adds (§8.2; V02-WGAP-1)** — each a cell of the shipped sheets, edited in the
  tables editor like any style value, our values: `roofscape.ridgeWeight` ½ and `roofscape.hipWeight` ⅓ (of the band's
  building outline weight), `fm.hatchPitchPx` 0.9 (paper pitch at 1×, the `FM` look), `stairFlight.treadWeight` ⅓,
  `stairFlight.treadInsetShare` 0.1 (of the flight's width, each side) and `stairFlight.minTreadPx` 2; the programs below
  and above read them by these names."""),
("""  P24); then the lines of V02 §5.2 step 5 in `ink` at ½ the building outline weight of the band (ridges and seams), ⅓ (hips
  and valleys).""","""  P24); then the lines of V02 §5.2 step 5 in `ink` at `roofscape.ridgeWeight` of the band's building outline weight
  (ridges and seams) and `roofscape.hipWeight` (hips and valleys)."""),
("""* **V01's NG draw-style bars** (the `hatched` family's two tapers per wing, §13.5): from M6a the NG parity sheet keeps
  `fakeGablePerWing`; at M6b the NG bars are re-measured on `roofscape` and the sheet switches to it when they pass, else
  keeps `fakeGablePerWing`, reported — the one sentence V01's V1-7 and X14 share.""","""* **V01's NG draw-style bars** (the `hatched` family's two tapers per wing, §13.5): the NG parity sheet's construction
  from M6a and its switch at M6b are V01 §7's rule (X14); this volume supplies the `roofscape` construction it is
  re-measured on."""),
("""  per roofscape facet; the `FM` look hatches parallel to the eave at a fixed paper pitch (0.9 px at 1×, our value).""","""  per roofscape facet; the `FM` look hatches parallel to the eave at the fixed paper pitch `fm.hatchPitchPx`."""),
("""`WingRole`, authored in V11's naming tables, V02 §13's cross-volume item: "the main range",""","""`WingRole`, authored in V11's naming tables (X6): "the main range","""),
("""  tone rule (its slope lit by `faceLight` like any facet), with tread lines across the flight, perpendicular to its climb, by `stairTreads` (V02 §2.6): `n − 1` lines at
  `goingCm` intervals from the foot, in `ink` at ⅓ of the building outline weight, stopping short of each side by a tenth of
  the flight's width; below 2 px of plan per tread the lines are omitted and the shaded facet reads as a ramp.""","""  tone rule (its slope lit by `faceLight` like any facet), with tread lines across the flight, perpendicular to its
  climb, by `stairTreads` (V02 §2.6): `n − 1` lines at `goingCm` intervals from the foot, in `ink` at
  `stairFlight.treadWeight` of the building outline weight, stopping short of each side by `stairFlight.treadInsetShare`
  of the flight's width; below `stairFlight.minTreadPx` of plan per tread the lines are omitted and the shaded facet reads
  as a ramp."""),
("""  parapet lines and its seating ring's shed facets falling toward the floor, which is drawn as a court (a yard part). Neighbourhood and building bands: V02 §5.1's, the plan per storeyed tier
  (V03).""","""  parapet lines and its seating ring's shed facets falling toward the floor, which is drawn as a court (a yard part).
  Neighbourhood and building bands: V02 §5.1's, the plan per storeyed tier (V03)."""),
]
