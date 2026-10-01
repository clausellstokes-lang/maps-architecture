# edits.py — the edits of lane coherence/repair-pipeline-r4, read by gen.py (exec). Each E(head, old, new, *ids):
# `old` must occur exactly once in the live subsection whose heading starts with `head` (base sha256 593c657d…,
# assemble-r3's output). Ids name the issue or END line each edit closes; "sweep" names R4-01 (2)'s own-unit sweep.

# ───────────────────────────── §4.1 ─────────────────────────────
# S7's batches gain the support step's last run at generation (sweep of VEW-r3-02's END; R4-09 (6) (a)).
E(H41, "| S7, per enceinte | L1: setback and glacis lines (the wall strips), the intervallum, gate-plaza claims, castle paths and inner-ward trace, quays, piers and moles | F-WALL, F-CASTLE |",
       "| S7, per enceinte | L1: setback and glacis lines (the wall strips), the intervallum, gate-plaza claims, castle paths and inner-ward trace, quays, piers and moles · after the last enceinte's batches and before S7b, §2.7's support step once more on every raised way (§4.8's lead), where a station can be neither slid nor omitted the S7 part it meets cut round its ring or ended at it in one L1 batch (§2.7's support step (6) (a)) | F-WALL, F-CASTLE |",
  'VEW-r3-02 (END, sweep)')

# ───────────────────────────── §4.3 ─────────────────────────────
# A standing raised way is held: impassable to routes and proposals, crossed only under a qualifying open span
# (VEW-r3-01 per R4-09; the crossing rule's home moves here from V01 §3.17.3 (3), its two cells V11's).
E(H43, """no relaxation reaches takes F-ROUTE's last rung (`unserved`, reported). At
epoch 0""",
"""no relaxation reaches takes F-ROUTE's last rung (`unserved`, reported). A standing
raised way's support rings, ramps, stairs and feet (`RaisedWayRecord.feet`) and the under-deck strips of its `vault`
spans are impassable to every route and growth proposal on ground part 0 once generation has ended, and at generation
where the raised way is locked or pinned (held, §2.7's support step (6) (b)); elsewhere its under-deck strip (§4.6) is
crossed only under an `open` span whose clear width is at least the way's width + `raisedWays.structure.clearWidthM` and
whose soffit meets §2.7's *The clearance* for the crossed way, within ± `raisedWays.structure.squareDeg` of square to
the deck (V11 §3.24.2), never along the strip. At generation, before the span rule has run, a later stage's way keeps
off an unlocked raised way's ramps, stairs and feet and crosses its strip only where the deck's soffit meets *The
clearance* for it, never along the strip, and the support step's last run (*The slot*, below) slides the supports off
it ((6) (a)). A route's crossing shifts along the
strip to the nearest crossing these admit, else the route takes another course by F-ROUTE's ladder (§5.2) — the one
rule S5c's proposals (§4.4) and stage 2's ways (V01 §3.17.3 (3)) keep. At
epoch 0""", 'VEW-r3-01')

# The slot: the support step's last run at generation (END of VEW-r3-02, R4-09).
E(H43, """  reading S6's typed wards and pass-1 prosperity. So S7b's capacity (§4.5), which subtracts each district's under-deck""",
"""  reading S6's typed wards and pass-1 prosperity. After S7's batches and before S7b, §2.7's support step runs once more
  on every raised way, its keys kept (§2.7's support step (5), (6) (a)). So S7b's capacity (§4.5), which subtracts each
  district's under-deck""", 'VEW-r3-02 (END)')

# ───────────────────────────── §4.4 ─────────────────────────────
# Outer moats: (6) (a)'s stop rung at generation, in R4-09's words (VM-R3T-04, amended: no walk of boundary nodes);
# an epoch stage's trace and moat across a standing raised way by (6) (b) (sweep).
E(H44, """treats the moat as water. The carve clears no raised-way support: §2.7's support step (6) re-sites one first in the same
commit; a stage gate""",
"""treats the moat as water. The carve clears no raised-way support: §2.7's support step (6) (a) re-sites one first in the
same commit, and where a crossing's spans or piers cannot keep their bounds, or the berm or channel would meet a ramp, a
stair or a foot, the berm and channel stop at the under-deck strip's edges, reported (`W_RAISED_CROSSING`); after
generation, or across a locked or pinned raised way, the trace passes through its station on the deck at its level nearest where it would
cross, and the berm and channel pass under the deck only where the span is `open` and no other support, ramp, stair or
foot stands in them, else stop alike (§2.7's support step (6) (b));
a stage gate""", 'VM-R3T-04', 'sweep')

# S5c's legality: a proposal meets a standing raised way's strip as a reservation, crossing only under a qualifying
# open span (VEW-r3-01 per R4-09).
E(H44, """a proposal meeting a
  shore or a reservation at ≥ 30° ends there (a street arriving at the quay). A wall is never crossed""",
"""a proposal meeting a
  shore or a reservation at ≥ 30° ends there (a street arriving at the quay). A standing raised way is crossed only as
  §4.3 *Lattice and costs* states: a proposal meeting what that rule makes impassable (its supports, ramps, stairs, feet
  or a `vault` span's strip where it is held; else, at generation, its ramps, stairs and feet), or meeting its under-deck strip
  anywhere else than where that rule admits a crossing, is deflected along the strip to the nearest crossing it admits,
  or ends at the strip as at a reservation. A wall is never crossed""", 'VEW-r3-01')

# ───────────────────────────── §4.8 ─────────────────────────────
# The lead: the support step's last run at generation (END of VEW-r3-02, R4-09).
E(H48, """enceinte; its geometry at L3 and L4 is built inside the wall strips by S10 and S11 after S9.
""",
"""enceinte; its geometry at L3 and L4 is built inside the wall strips by S10 and S11 after S9. After S7's batches and
before S7b, §2.7's support step runs once more on every raised way, its keys kept (§2.7's support step (5), (6) (a)):
where a station can be neither slid nor omitted, the S7 part it meets gives way round its ring (§2.7's support step
(6) (a)), reported.
""", 'VEW-r3-02 (END)')

# Condition at generation: the band's stretch under a crossing station (VM-R3T-08).
E(H48, """(V11 §3.25.3), a `patched` run's material from `walls.patchMaterials` by the enceinte's kind and culture — along an""",
"""(V11 §3.25.3), a `patched` run's material from `walls.patchMaterials` by the enceinte's kind and culture, a `breached`
draw on the band's stretch under a raised way's crossing station read as `worn` while its deck stands (§2.7's support
step (3)) — along an""", 'VM-R3T-08')

# Gates: the trace across a raised way at generation and after it (END of VEW-r3-05, R4-09).
E(H48, """the strip's inner edge. **A trace across a standing raised way** (a later stage's trace across an S4 viaduct, elevated
road or aqueduct, its crossing station put on the trace by §2.7's support step (6)) takes the crossing as furniture, at""",
"""the strip's inner edge. **A trace across a standing raised way** (at generation a stage's trace across an S4 or S5b
viaduct, the stage's own included, its crossing station put on the trace by §2.7's support step (6) (a); after
generation any trace across a standing raised way, through one of its stations by (6) (b)) takes the crossing as
furniture, at""", 'VEW-r3-05 (END)')

# Gates: the gate law cited at its home (VPC-R3-06).
E(H48, """part-0 way beneath, if any, taking its own ground gate by the gate law (§4.4 *Outer moats*).""",
"""part-0 way beneath, if any, taking its own ground gate (§4.4 *Outer moats*) by §4.2 S3 (4)'s gate law.""",
  'VPC-R3-06')

# ───────────────────────────── §4.11 ─────────────────────────────
# Delta demand read over the households the town holds after a held fall (END of VEL3-r3-01).
E(H411, """§10.2 — prefix-stable, so no
survivor's use is withdrawn by arithmetic)""",
"""§10.2 — prefix-stable, read over
the households the town holds where a fall held one (V06 §3.5.1 (1)) — so no
survivor's use is withdrawn by arithmetic)""",
  'VEL3-r3-01 (END)')

# The carve and a raised way's support (END of R4-09's sweep).
E(H411, """channel passes under keeps its course; a support the channel meets is re-sited by §2.7's support step (item 244).""",
"""channel passes under keeps its course; a support the channel meets is re-sited at generation by §2.7's support step
  (6) (a); after generation the channel passes under an `open` span, its course bent at the dry run (§2.7's support step
  (6) (b)).""", 'R4-09 (END)')

# The clock (4): a calamity carried late rides the absorb's first epoch (VAT3-r3-01 per R4-08).
E(H411, """   one number §7.7 item 3's lapse reads too), and at the week of each newly carried calamity that no other epoch falls on
""",
"""   one number §7.7 item 3's lapse reads too), and at the week of each newly carried calamity dated after the last
   epoch's week that no other epoch falls on
""", 'VAT3-r3-01')
E(H411, """   dossier event still at its own week; a calamity then riding the coarse epoch that holds its week). No epoch
""",
"""   dossier event still at its own week; a calamity then riding the coarse epoch that holds its week). A newly carried
   calamity dated at or before the last epoch's week folds no epoch at its own week: it rides the first epoch folded by
   the absorb that carries it (`DossierPort.absorb`; with none, the port folds one at the absorb's week for it), its
   `EpochInputs.events` entry at that epoch's first week (the last epoch's week + 1), its own tick kept in its receipt,
   so its hazard strikes and its deaths reach the burial need; with the absorb's week itself before the last epoch's
   (V08 §3.6's degenerate row) it folds no epoch and its dated changes apply finished, noted. No epoch
""", 'VAT3-r3-01')

# The rung at an epoch: part 0's two L0 batches and the raised parts' re-derivation (VKr3-01).
E(H411, """, an L0 batch replacing the `margin` chain, an
L1 batch replacing the `border` chain""",
""",
an L0 batch replacing the `margin` chain (on part 0 two, a raised way's ring-end foot moved between them, §3.2 (9)), an
L1 batch replacing the `border` chain""", 'VKr3-01')
E(H411, """`corridorUnion` (§3.7), which draws nothing); every face outside the region""",
"""`corridorUnion` (§3.7), which draws nothing; on each raised part of the ground layer §3.2 (9) grows, its raised way's
re-derivation (§3.4) for that part's cleared faces, which also extends a deck ending on the old ring to the new ring and
re-places both ends of that foot (§2.7 `RaisedFoot`)); every face outside the region""", 'VKr3-01')

# ───────────────────────────── §4.13 ─────────────────────────────
# EP-27: a barrier across a way (VPC-R3-03 per R4-06); a camp smaller than one household (VV56-r3-03).
E(H413, """a headcount of 0 or none given; an unmapped""",
"""a headcount of 0 or none given; a refugee camp of two heads (fewer than one household); an unmapped""", 'VV56-r3-03')
E(H413, """arriageway holding only a barricade |""",
"""arriageway holding only a barrier across it (§10.2 (d)) |""", 'VPC-R3-03')

# The combination table's raised-way cells: a village palisade (END of VAL-R3-02, R4-09); a moat laid after the course
# (sweep: R4-09 (6) (a) drops no generated course for a later stage).
E(H413, """| wall | crosses only on a gate's line or as the aqueduct's arch; no support in a wall strip but the crossing's station on the band (§2.7's support step (3)). *Rung:* — (defined) |""",
"""| wall | crosses a town enceinte only on a gate's line or as the aqueduct's arch; no support in a wall strip but the crossing's station on the band (§2.7's support step (3), (6)); a village palisade abuts its supports, the deck passing over with no gate (V07 §3.5a (4)). *Rung:* — (defined) |""",
  'VAL-R3-02 (END)')
E(H413, """never out over the sea (its ends are ground vertices); a moat spanned outside its wall strip. *Rung:*""",
"""never out over the sea (its ends are ground vertices); a moat spanned outside its wall strip, and one laid after the course stopped at the under-deck strip where it cannot pass under the deck, the course kept (§2.7's support step (6); `W_RAISED_CROSSING`). *Rung:*""",
  'sweep')

# ───────────────────────────── §10.2 ─────────────────────────────
# Crisis looks' lead: the hand-over before V06's E2 (VPC-R3-02 per R4-04 (d)).
E(H102, """by nearness to its gate (V06 §3.22 (2) (d)'s no-frontier answer); at the
  village rungs""",
"""by nearness to its gate (V06 §3.22 (2) (d)'s no-frontier answer);
  until V06's E2 (M6-E) a building leaves the `disaster` look by the yield read directly over the base's records
  (`Building.works`, §2.6; the lifecycle's weeks once a record retires, §4.11 *Works* (9)) — V06 §3.22 (3)'s rule: a
  Works other than a `decay` Works begun on it by the view's week and not finished before the overlay's `sinceWeek`,
  never for a preview — so §8.2's `ruinTone`, the buildings' damage and V09's rows read one answer from the look's
  first milestone; at the
  village rungs""", 'VPC-R3-02')

# (c): the neighbourhoods place's count (VV1112-r3-02 per R4-13).
E(H102, """V01 §3.16 (5)'s count, one rule for every place at
  every rung. **By headcount**""",
"""V01 §3.16 (5)'s count, one rule for every place at
  every rung; the `neighbourhoods` place then draws at least every matched target (max(k, |`matched`|), k that count)
  and, by fire, stops where its order ends, the shortfall reported (V01 §3.16 (5)).
  **By headcount**""", 'VV1112-r3-02')

# (d): a barrier across a way (VPC-R3-03 per R4-06; closes VAL-R3-07).
E(H102, """and on a way's carriageway only a
  `barricade` across it ((f)'s `raiders` barricaded roads and `rebellion` street barricades, §8.2's `blockade`
  barricade; item 122 (b)) — never a camp or any other part;""",
"""and on a way's carriageway only a
  barrier across it — a `barricade` ((f)'s `raiders` barricaded roads and `rebellion` street barricades, §8.2's
  `blockade` barricade), `beast`'s `stakes` where the edge crosses a way, and the quarantine's `cordon` where it crosses
  a way into its quarter; item 122 (b) — never a camp or any other part;""", 'VPC-R3-03', 'VAL-R3-07')

# (d) `approachRoads`: campLand's verges cited at their clause (VV12-r3-05; closes VPC-R3-07).
E(H102, """leaving the settlement (V01 §3.16 (2)), one camp per road""",
"""leaving the settlement (V01 §3.16's `campLand` (2)), one camp per road""", 'VV12-r3-05', 'VPC-R3-07')

# (d) `approachByGate`: h at least 1 (VV56-r3-03).
E(H102, """else its camped ground ÷ `areaPerHeadM2`): where the next
    growth would seat""",
"""else its camped ground ÷ `areaPerHeadM2`), at least 1, so a
    camp smaller than one household is seated where the next household would be:
    where the next growth would seat""",
  'VV56-r3-03')

# (d) `neighbourhoods`: the look's units and the buildings it stands over (VV12-r3-05 per R4-04; closes VAL-R3-08).
E(H102, """at THORP, HAMLET and VILLAGE V07's
    ends (V07). Every building of a returned district draws item 123's damage at the row's `lookLevel` by severity, or at
    its own decay level where that is higher (V02, V03, V04; nothing stored) — no second, per-building share.""",
"""at THORP, HAMLET and VILLAGE V07 §5.6 (3)'s
    units (`villageDisasterUnits`: its ends, or an end-less thorp's toft groups). Every building of a returned unit — a
    district's, or one on a returned unit's plots (`villageUnitPlots`) — draws item 123's damage at the row's `lookLevel`
    by severity, or at its own decay level where that is higher (V02, V03, V04; nothing stored), while the look stands
    over it ((f)) — no second, per-building share.""", 'VV12-r3-05', 'VAL-R3-08')

# (f) `quarantine`: the cordon closing the quarter (VPC-R3-03 per R4-06).
E(H102, """marked doors and a cordon in the `affectedQuarter`.""",
"""marked doors and a cordon closing the
  `affectedQuarter` — along its boundary on the quarter's side of each bounding way's corridor, across each way that
  enters it.""", 'VPC-R3-03')

# (f) `disaster`: the base's statement of "a building a disaster look stands over" (sweep, R4-04 (b)).
E(H102, """`disaster`: (d)'s
  `neighbourhoods`, each building leaving the look in the week V06 §3.22 (3)'s `crisisLookYields` turns true on it (a
  Works other than a `decay` Works begun on it), a building no such Works reaches keeping it until its condition ends,
  so no week draws both on a building.""",
"""`disaster`: (d)'s
  `neighbourhoods`; the look **stands over** a building of one of its units until V06 §3.22 (3)'s `crisisLookYields`
  turns true on it — a Works other than a `decay` Works begun on it by the view's week, unless finished before the
  overlay's `sinceWeek` — the building leaving the look in that week; a building no such Works reaches stays under it
  until its condition ends, and a preview never hands over (every building of its units under it), so no week draws both
  on a building.""", 'sweep')

# (g): the design home, not the unit key (VM-R3T-10).
E(H102, """(model §2.9; the limit's stop 0 where nothing fits,""",
"""(§2.9's *The crisis framing*; the limit's stop 0 where nothing fits,""", 'VM-R3T-10')

# (h): the camp smaller than one household (VV56-r3-03, EP-27's new fixture).
E(H102, """a headcount of 0 or
  none: (c);""",
"""a headcount of 0 or
  none: (c); a camp smaller than one household: by the gate, `approachByGate`'s `h` at least 1
  ((d));""", 'VV56-r3-03')
