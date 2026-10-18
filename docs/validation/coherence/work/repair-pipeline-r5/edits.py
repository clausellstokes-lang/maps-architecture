# edits.py — the edits of lane coherence/repair-pipeline-r5, read by gen.py (exec). E(head, old, new, *ids): `old` must
# occur exactly once in the live subsection whose heading starts with `head`; R(head, start, end, new, *ids): the unique
# span from `start` through the first `end` after it is replaced (base sha256 5f34cceb…, assemble-r4's output). Ids name
# the issue or END line each edit closes (P1 – P12 are R5-02's pipeline ends; "sweep" names R5-01 (2)'s own-unit sweep).

# ───────────────────────────── §4.1 ─────────────────────────────
# S7's row: the support step's last run is gone (R5-02 supersedes it); the S7 parts beside a raised way standing before
# the trace give way to it (P3).
E(H41, " · after the last enceinte's batches and before S7b, §2.7's support step once more on every raised way (§4.8's lead), where a station can be neither slid nor omitted the S7 part it meets cut round its ring or ended at it in one L1 batch (§2.7's support step (6) (a))",
       " · beside a raised way standing before the trace, its strips stopped at the under-deck strip, a gate plaza cut round the raised way's supports and no pier or mole rooted on them (§4.8's lead; §2.7's support step (6))",
  'P3 (END of R5-02, VEW-r4-03)')
# S5's row restates the gate pin: an arterial crossing on a raised deck pins no gate (P4's rule).
E(H41, "S5a L1: the trace with every arterial crossing as a gate;",
       "S5a L1: the trace with every arterial crossing on ground part 0 as a gate (§4.4 S5a *Trace* (2));",
  'sweep (P4)')

# ───────────────────────────── §4.3 ─────────────────────────────
# Lattice and costs: R5-02's P1, one text for VM-R4T-06, VV12-r4-03 and the ends of VM-R4T-01 and VAL-R4-02.
R(H43, "A standing\nraised way's support rings, ramps, stairs and feet",
       "and stage 2's ways (V01 §3.17.3 (3)) keep.",
       "A raised way is held from the commit that creates it\n"
       "(§2.7's support step (6)): its support rings, ramps, stairs and feet (`RaisedWayRecord.feet`), and once the span rule\n"
       "has run (its one eager run, after §4.6's cut) the under-deck strips of its `vault` spans, are impassable to every route\n"
       "and growth proposal on ground part 0 laid after it, at generation as after it; the rest of its under-deck strip (§4.6)\n"
       "is crossed only under a span — an `open` one once the span rule has run — whose clear width between the supports'\n"
       "rings is at least the way's width + `raisedWays.structure.clearWidthM` and whose soffit meets §2.7's *The clearance*\n"
       "for the crossed way, within ± `raisedWays.structure.squareDeg` of square to the deck (V11 §3.24.2), never along the\n"
       "strip. A route's crossing shifts along the strip to the nearest crossing these admit, else the route takes another\n"
       "course by F-ROUTE's ladder (§5.2). S5c's proposals (§4.4), stage 2's ways (V01 §3.17.3 (3)), V07's village trackers\n"
       "(V07 §3.5a (3)) and S7's quays, intervallum and castle paths keep the same crossing rule, each with its own ladder\n"
       "(S5c's deflection along the strip or its end there; V01's F-TEMPLATE rungs and §4.6's lane ladder; the tracker's turn;\n"
       "S7's way ending at the strip as at a reservation; §2.7's support step (6) (a)).",
  'VM-R4T-06', 'VV12-r4-03', 'P1 (END of VM-R4T-01, VAL-R4-02)')
# The slot: P2.
E(H43, "After S7's batches and before S7b, §2.7's support step runs once more\n"
       "  on every raised way, its keys kept (§2.7's support step (5), (6) (a)). So S7b's capacity",
       "Its stations and spans are placed at that commit and held\n"
       "  from then (§2.7's support step (6)), so S7b's capacity",
  'P2 (END of R5-02)')
# Where it may not go: the course's crossing of a moat or wall is of one standing when it is laid; one laid after it meets
# the raised way by (6) (b), (d) (the same split P12 writes at §4.13's `wall` cell).
E(H43, "crosses a moat or a city wall only as the aqueduct's wall\n"
       "  arch or on a gate's line,",
       "crosses a moat or a city wall standing when it is laid only as the\n"
       "  aqueduct's wall arch or on a gate's line (a wall laid after the raised way runs on beneath its deck, and a moat laid\n"
       "  after it passes beneath it or stops at its under-deck strip; §2.7's support step (6) (b), (d)),",
  'sweep (P12)')

# ───────────────────────────── §4.4 ─────────────────────────────
# S5a Trace (2): P4 (VEW-r4-04, amended: no pin on the deck).
E(H44, "S5b arterial) and an `on_enceinte` castle",
       "S5b arterial) — on ground part 0: an arterial crossing the boundary on a raised deck pins no gate there, the deck\n"
       "   passing over the trace (§2.7's support step (6) (d)), and a pin inside a raised way's under-deck strip moves along its\n"
       "   arterial to the nearest point clear of it — and an `on_enceinte` castle",
  'VEW-r4-04 (P4)')
# S5a Outer moats: P5.
R(H44, "The carve clears no raised-way support: §2.7's support step (6) (a) re-sites one first in the",
       "(S7 lays both, §4.8 *Gates*).",
       "The carve clears no raised-way support: a raised way standing before the trace is held (§2.7's support\n"
       "step (6)) — the trace runs on beneath its deck, the berm stops at the under-deck strip's edges and the channel passes\n"
       "beneath only where its crossing meets no support, ramp, stair, foot or `vault` span, else stops there too, reported\n"
       "(`W_RAISED_CROSSING`); a raised arterial passing over the trace takes no gate and no part-0 deck, and a part-0 way\n"
       "beneath it takes its own ground gate clear of the under-deck strip by §4.2 S3 (4)'s gate law (§4.8 *Gates*).",
  'P5 (END of R5-02)')
# S5b's count: P6.
E(H44, "so they cross\nthe new boundary `c` times;",
       "so they cross\nthe new boundary `c` times on ground part 0 (a crossing on a raised deck no gate, S5a *Trace* (2));",
  'P6 (END of R5-02)')
E(H44, "An outer enceinte never gets fewer gates than arterials\ncross it;",
       "An outer enceinte never gets fewer gates than arterials\ncross it on ground part 0;",
  'P6 (END of R5-02)')
# S5c's legality restates §4.3's impassable set: held from creation, no generation/held split (P1's rule).
E(H44, "(its supports, ramps, stairs, feet\n"
       "  or a `vault` span's strip where it is held; else, at generation, its ramps, stairs and feet)",
       "(its supports, ramps, stairs and feet,\n"
       "  and once the span rule has run a `vault` span's strip)",
  'sweep (P1)')

# ───────────────────────────── §4.5 ─────────────────────────────
# The daylight term's casters: P7.
E(H45, "walls, gatehouses, the castle and great towers",
       "walls (a run beneath a raised way's span to its soffit, §2.7's support step (6) (d)), gatehouses, the castle and great towers",
  'P7 (END of R5-02)')

# ───────────────────────────── §4.7 ─────────────────────────────
# The class floors' heading: two canon conflict ids in design text (VAL-R4-10).
E(H47, "without values; DXC-06, KXC-02).**",
       "without values).**",
  'VAL-R4-10')

# ───────────────────────────── §4.8 ─────────────────────────────
# The lead: P8 (VM-R4T-03, amended; VEW-r4-03's §4.8 end).
R(H48, "After S7's batches and\nbefore S7b, §2.7's support step runs once more",
       "(6) (a)), reported.",
       "A raised way standing before a trace is held (§2.7's support step (6)):\n"
       "the strips S7 cuts beside that trace stop at its under-deck strip's edges, their setback, glacis and berm closed along\n"
       "them, reported (`W_RAISED_CROSSING`); a gate plaza is cut round its supports, ramps, stairs and feet; a quay, the\n"
       "intervallum or a castle path crosses its under-deck strip by §4.3's crossing rule, else ends at the strip as at a\n"
       "reservation; and no pier, mole or breakwater is rooted on its supports, ramps, stairs or feet, a root moved along the\n"
       "shore to the nearest clear one. A raised way created across a standing trace kept its piers out of the strip S7 cuts\n"
       "there and out of the quay S7 lays along a `quay` bank (§2.7's support step (3)).",
  'VM-R4T-03 (P8)', 'P8 (END of VEW-r4-03)')
# Gates: P9.
E(H48, "Main gates are where S4's and S5b's arterials cross the trace:",
       "Main gates are where S4's and S5b's arterials cross the trace on ground part 0,\n"
       "or at a raised gate where the arterial's raised way was created across the standing trace (§2.7's support step (3)) — a\n"
       "deck passing over a stretch laid after it is no crossing (§2.7's support step (6) (d)):",
  'P9 (END of R5-02)')
E(H48, "so roads leaving each walled stage = its gate count",
       "so roads leaving each walled stage, so counted, = its gate count",
  'P9 (END of R5-02)')
R(H48, "**A trace across a standing raised way** (at generation",
       "by §4.2 S3 (4)'s gate law.",
       "**A raised way created across a standing trace** (§2.7's support step (3): at generation an S4 viaduct across S3's\n"
       "ring, or an elevated road or aqueduct at S6's end across any ring; at an epoch V06 §3.19's founding across a standing\n"
       "curtain; by hand an aqueduct, §7.1) takes the crossing as furniture, at generation as at an epoch, in the form V06\n"
       "§3.7.6 (5) gives it: for an aqueduct a **wall opening** — an arch in the curtain under the deck, no gate (no portal, no\n"
       "gate law); for a viaduct or an elevated road a **raised gate** at deck level — a gate whose tower carries the deck, its\n"
       "portal on the raised part only — the part-0 way beneath, if any, taking its own ground gate by §4.2 S3 (4)'s gate law.\n"
       "A stretch laid after a raised way takes no crossing furniture: it runs on beneath the deck, which passes over it with no\n"
       "gate (§2.7's support step (6) (d)).",
  'P9 (END of R5-02)')

# ───────────────────────────── §4.11 ─────────────────────────────
# wallToWay: VDC4-05's text as written (P11).
E(H411, "towers are\nremoved; gates become junctions with a `square` option.",
        "towers are\nremoved; gates become junctions with a `square` option — save the stretch held under a raised way's crossing station\n"
        "while its deck stands (a raised gate with its tower, the curtain under an aqueduct's arch), which stays as a free-standing\n"
        "gate tower or arch carrying the deck, the new ring road taking no junction with the raised way (§2.7's support step (3);\n"
        "V06 §3.7.6 (5) gives its form).",
  'VDC4-05 (P11)')
# The carve's way rule: P10.
R(H411, "A raised way the\n  channel passes under keeps its course;",
        "(6) (b)).",
        "A raised way keeps its course and\n"
        "  every station: the channel passes beneath it only where its crossing of the under-deck strip meets no support, ramp,\n"
        "  stair, foot or `vault` span, else stops at the strip's edges, ending against the ground as against a berm, reported —\n"
        "  a hand carve's crossing first moved along the deck to the nearest that passes (§2.7's support step (6) (b); §7.1's\n"
        "  `bend.raised.underSpan`).",
  'P10 (END of R5-02)')
# The clock (4): R5-03's text (VAT4-r4-01; VPC-R4-02 merged).
R(H411, "A newly carried\n   calamity dated at or before the last epoch's week folds no epoch at its own week:",
        "it folds no epoch and its dated changes apply finished, noted.",
        "A newly carried\n"
        "   change dated at or before the last epoch's week `W₀` is **late**: it never folds at a week before `W₀`, so the\n"
        "   document's current week ((1)) never falls back. A late **calamity** folds no epoch at its own week and is never lost:\n"
        "   where the absorb's week `W₁` is after `W₀` it rides the first epoch this absorb folds (`DossierPort.absorb`; with none,\n"
        "   the port folds one at `W₁` for it), its `EpochInputs.events` entry at that epoch's first week `W₀` + 1 and its F5\n"
        "   targets' dossier events in that epoch's `EpochInputs.dossier` at the same week; where `W₁` is not after `W₀` (a second\n"
        "   absorb in the last epoch's own week, or a clock turned back) this absorb folds no epoch — the calamity's F5 targets'\n"
        "   dossier events apply now at `W₀` as element events, finished (no Works), and the calamity is held in the binding\n"
        "   (`DossierBinding.lateCalamities`, §7.7) until the first epoch a later absorb folds, which it rides at that epoch's\n"
        "   first week. Either way its own tick stays in its receipt, its hazard strikes and its deaths reach the burial need.\n"
        "   Every other late change folds after the last epoch at `W₀` + 1 where `W₁` is after `W₀`, else at `W₀`, applied\n"
        "   finished (no Works), noted (`unreceipted_change`'s `late` variant, V08 §4.6); a population move carried by an absorb\n"
        "   whose week is not after `W₀` crosses at the next absorb whose week passes `W₀` (V08 §3.6 (3)).",
  'VAT4-r4-01', 'VPC-R4-02')
# The rung at an epoch: a frame growth's deck extension keeps the old deck's stations (R5-02's support step (7)).
E(H411, "extends a deck ending on the old ring to the new ring and\nre-places both ends",
        "extends a deck ending on the old ring to the new ring, the old\ndeck's stations kept (§2.7's support step (7)), and re-places both ends",
  'sweep ((7))')

# ───────────────────────────── §4.13 ─────────────────────────────
# The raised-way column's `wall` and `river, coast, moat` cells: P12.
E(H413, "crosses a town enceinte only on a gate's line or as the aqueduct's arch; no support in a wall strip but the crossing's station on the band (§2.7's support step (3), (6)); a village palisade abuts its supports, the deck passing over with no gate (V07 §3.5a (4)).",
        "created across a standing enceinte, crosses it only on a gate's line or as the aqueduct's arch, no support in its wall strip but the crossing's station on the band (§2.7's support step (3)); a wall stretch laid after it — a village palisade's among them — runs on beneath its deck, built against the supports, ramps, stairs, feet and `vault` spans in its band, no gate on the deck, its strips stopped at the under-deck strip (§2.7's support step (6) (d); V07 §3.5a (4)).",
  'P12 (END of VEW-r4-02, VAL-R4-03)')
E(H413, "and one laid after the course stopped at the under-deck strip where it cannot pass under the deck, the course kept (§2.7's support step (6); `W_RAISED_CROSSING`)",
        "and one laid after the course passing beneath only where it meets no support, ramp, stair, foot or `vault` span, else stopped at the under-deck strip, the course kept (§2.7's support step (6) (b); `W_RAISED_CROSSING`)",
  'P12 (END of VEW-r4-02, VAL-R4-03)')

# ───────────────────────────── §10.2 ─────────────────────────────
# The disaster look's units, never 'district' alone (VRC4T-09; VAL-R4-08 merged).
E(H102, "lookLevel?: [number, number] /* the disaster row only: item 123's decay level its districts' buildings draw at severity 0 and 1, linear between */;",
        "lookLevel?: [number, number] /* the disaster row only: item 123's decay level the buildings it stands over draw ((f)) at severity 0 and 1, linear between */;",
  'VRC4T-09')
E(H102, "and its districts' tone,",
        "and its units' tone (§8.2's `ruinTone`),",
  'VRC4T-09', 'VAL-R4-08')

# ───────────────────────────── II.7.3 ─────────────────────────────
# Order, seed and locality: the pseudo-district's labels are candidates while the view draws the layer (VAL-R4-06).
E(HII73, "its\nlabels drawn only when the layer is visible —",
         "its\nlabels candidates only while the view draws the layer (visible, or Below the view's working layer; §9.2, §8.4) —",
  'VAL-R4-06')
