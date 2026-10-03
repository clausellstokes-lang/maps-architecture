# repair-model-r4 edits, executed by gen.py (its helpers in scope). Each substitution is count-asserted on the joined
# text of its line range; the issue ids each edit closes are in the comment above it. Binding: adjudication-r4.md.
APPLIED = 0

# ==== §2.6 ===========================================================================================================
S26 = lambda: section(H26)

# VM-R3T-01: one term for the plan rung's Works input — a build Works' stage; a `decay` or `repair` Works is none.
inline(S26(), "stage?: WorksStage /* item 67: its running Works' stage", [
    ("its running Works' stage at the drawn week (§4.11), which the plan's drawing shows (below)",
     "its running build Works' stage at the drawn week (§4.11; a `decay` or `repair` Works is none, step 7), which the "
     "plan's drawing shows (below)", 1),
])
APPLIED += 1

rewrap(S26(), "building hosts (`BuildingInput.accesses`), the running Works' stage (item 67)",
       "streams (§4.1's contract, §6.2).", '   ', '   ', [
    ("the running Works' stage (item 67),",
     "the running build Works' stage (item 67; a `decay` or `repair` Works is none, step 7),", 1),
])
APPLIED += 1

rewrap(S26(), "the room graph is exported in our own schema (§11.1). A building whose running",
       "(§2.8), so a stage change marks the plan `stale` (item 67 (h), (j)).", '   ', '   ', [
    ("A building whose running build Works stands before FINISHED",
     "A building whose running build Works — a Works of any kind but `decay` and `repair` (§2.7's `Works.kind`) — "
     "stands before FINISHED", 1),
])
APPLIED += 1

# Step 7's damage layer:
# * END of VV56-r2-06 (R4-03): an element a restoring event's re-cut minted is neither damaged by that restoration nor
#   drawn repaired (V06 §3.23 (3) holds its entry week).
# * VAT3-r3-08: the replay's decay run ages from the week its change shows in that replay epoch (V06 §3.23 (4)).
# * VM-R3T-07 per R4-04 (also VAL-R3-08's model end): the buildings a disaster look stands over — its units at every
#   rung, and the per-building hand-over (`crisisLookYields`), a preview never handing over.
rewrap(S26(), "a `reoccupy` back into use; a repair) lowers it", "§11.1's; bars T123-1 – T123-7 (§13.2).",
       '   ', '   ', [
    ("an element that entered the plan after its damage left never drawn repaired (V06 §3.23 (3))",
     "an element that entered the plan after its damage left, or that a restoring event's re-cut minted, never drawn "
     "damaged by that restoration nor repaired (V06 §3.23 (3))", 1),
    ("one item 113's replay abandons or ruins ages from that replay epoch's week",
     "one item 113's replay abandons or ruins ages from the week its change shows in that replay epoch (V06 §3.23 (4): "
     "the epoch's week where it starts no Works)", 1),
    ("A building of a district a disaster look ruins (item 122 (d))",
     "A building a disaster look stands over (item 122 (d); §10.2 (d)'s `neighbourhoods` and (f): a building of one of "
     "its units — a district, at THORP, HAMLET and VILLAGE a unit of V07 §5.6 (3) on the plots `villageUnitPlots` gives "
     "it — until V06 §3.22 (3)'s `crisisLookYields` turns true on it, a preview never handing over)", 1),
])
APPLIED += 3

# ==== §2.7 ===========================================================================================================
S27 = lambda: section(H27)

# VEW-r3-04 (R4-09): a crossing station's support entry carries no state of its own (the record's comment points to (3)).
inline(S27(), "supports: { key: number /* minted once in order along the deck", [
    ("state?: 'ruined'|'cleared' /* V06's decline (V06 §3.19.2; the DeclineOp raised members, §4.11) */ }[];",
     "state?: 'ruined'|'cleared' /* V06's decline (V06 §3.19.2; the DeclineOp raised members, §4.11); never on a "
     "crossing station, which reads its wall stretch's `condition` (the support step (3), below) */ }[];", 1),
])
APPLIED += 1

# VKr3-04: the frame growth's foot batch is the RaisedFoot's first writer at a ring-end foot (§3.2 (9)).
rewrap(S27(), "// placed by the raised-way generator and by a declared or drawn way's operator",
       "so no document holds one without them.", '  // ', '  // ', [
    ("re-placed by the way's re-derivation, one transaction per part (§3.4); read by",
     "re-placed by the way's re-derivation, one transaction per part (§3.4), a ring-end foot's ground end moved first "
     "by a frame growth's foot batch (§3.2 (9); below); read by", 1),
], width=158)
rewrap(S27(), "// At a deck end on the arena's outer ring — an aqueduct sourced beyond the frame",
       "re-placing both ends of that foot on the new rings, one transaction per part (§3.4)", '  // ', '  // ', [
    ("A frame growth (§3.2 (9)) extends the deck to the new ring as §4.11 continues a through-road,",
     "A frame growth (§3.2 (9)) first moves the foot's ground end onto the new ring (its foot batch, between part 0's "
     "two L0 batches), then extends the deck to the new ring as §4.11 continues a through-road,", 1),
], width=158)
APPLIED += 2

# VAT3-r3-02 per R4-07 (closes VM-R3T-02 and VPC-R3-05, both MERGED): one bound for everything the creation carries —
# up to and including the present at creation. Sweep (R4-01 (2)): the hint's head, `population`'s week, and
# Recipe.history (§2.9, below) name the same bound.
inline(S27(), "interface HistoryHint {   // Recipe.history (§2.9): the dossier's pre-creation history", [
    ("the dossier's pre-creation history, written once",
     "the dossier's history up to and including the present at creation (§4.11 *The clock* (1)), written once", 1),
])
inline(S27(), "ageYears: number /* the settlement's age at creation", [
    ("the settlement's age at creation — never advanced by §4.11's clock",
     "the settlement's age at the present at creation (§4.11 *The clock* (1)) — never advanced by §4.11's clock", 1),
])
inline(S27(), "population?: { yearsAgo: number; population: number }[]", [
    ("each tick read as (week − tick) ÷ 52 years ago",
     "each tick read as (week − tick) ÷ 52 years ago, the week the present at creation", 1),
])
inline(S27(), "calamities?: { yearsAgo: number; type: string; deaths", [
    ("calamityHistory before the creation week (DR36's losses; DR37's events)",
     "calamityHistory up to and including the present at creation (§4.11 *The clock* (1)) — every calamity the "
     "creation carries (DR36's losses; DR37's events)", 1),
])
APPLIED += 4

# The support step, (3) and (6) — R4-09 (binding text), closing:
# * VAL-R3-02: (3)'s village-palisade clause; (6) (b) (iv).
# * VEW-r3-04: (3)'s crossing-station support (no state of its own; the support ops pass over it; the landfall's breach
#   ruins the spans beside it — folded into (3)'s landfall clause; `repairRaised` repairs a fallen stretch first).
# * VEW-r3-02, VEW-r3-03, VEW-r3-05, VM-R3T-06 (amended): (6) (a) and (b).
i, j, text = joined(S27(), "`viaduct.maxSpanM` both (§4.3); a course across an enceinte's trace",
                    "one whose crossing fits, item 101 R2) — a standing raised way is never dropped for a wall (T110-2).",
                    '  ', '  ')
OLD6 = "; (6) a trace or moat laid across a standing raised way"
assert text.count(OLD6) == 1
pre, old6 = text.split(OLD6)
assert old6.endswith("— a standing raised way is never dropped for a wall (T110-2).")
pre = subst(pre, [
    ("the only crossings §4.3 allows — has one **crossing station**",
     "the only crossings §4.3 allows — (a village map's palisade, `VillagePlan.palisade`, is no crossing: its trace "
     "abuts each support standing in its band, never moving it, and passes beneath every span, with no crossing "
     "station and no gate; V07 §3.5a (4)) has one **crossing station**", 1),
    ("the wall's own masonry (no pier raised, no pier-height test),",
     "the wall's own masonry (no pier raised, no pier-height test; at a standing station a later trace takes, the "
     "pier's former ring with it, (6) (b) (iii)),", 1),
    ("a landfall over it breaches it and ruins the deck there by V05's landfall table —",
     "a landfall over it breaches it and ruins the spans beside it (V05 §3.16's landfall table) —", 1),
    ("it is an ordinary run (§13.2's item-114 group); (4) each other pier's",
     "it is an ordinary run (§13.2's item-114 group); a crossing station's `supports` entry carries no `state` of its "
     "own — it reads its stretch's `condition`, `standing`, `worn` or `patched` a standing support and `breached` or "
     "`dismantled` a ruined one — and the raised way's support ops pass over it: V06 §3.19.2 (3)'s salvage `dismantle` "
     "and (4)'s `topple` never take it, its stretch decaying as the wall's once both spans have fallen (above); a "
     "`repairRaised` of a span beside a station whose stretch is `breached` or `dismantled`, whether V06 §3.19.2 (5)'s "
     "or a hand Repair, first repairs that stretch by `repairWall` in the same batch, in item 114's patch material (the "
     "row V06 §3.7.7 (3) draws; on a `dismantled` stretch the op's bend, V06 §2.8: a new stretch drawn on its line), so "
     "no deck stands on a fallen wall; (4) each other pier's", 1),
])
pre += "; (6) **later work across a raised way**, at generation and after it:"

SIX_A = (
    "(a) *At generation.* A stage's S5a trace and outer moat across an earlier raised way — S4's, or an S5b viaduct, the "
    "stage's own included — re-run (1)–(5), and then the span rule, on it in the same commit: the crossing station on "
    "the trace (the nearest interior station on the deck at its level, never on a ramp or a stair, within p ÷ 2 moved "
    "there, keeping its key, else one added; where the trace would meet the raised way on a ramp or a stair, the trace "
    "is bent along the deck through the nearest station at the deck's level, as in (b) (iii)), the stations in the new "
    "berm or channel slid or omitted by (3) (those in the strips' setbacks and glacis, which S7 cuts, by the run after "
    "S7, below). Where a clear span on either side of that station would then pass `maxClearSpanM`, or a pier "
    "`maxPierM`, or the berm or channel would meet a ramp, a stair or a foot, the stage's berm and channel — and S7's "
    "setback and glacis after them — are not laid under the deck: they stop at the edges of the under-deck strip and of "
    "the ramp or stair, the channel ending against the ground as against a berm (§4.2 S3 (10)) and the strip lines "
    "closed along it, reported (`W_RAISED_CROSSING`), so the spans either side clear only the band's half. After S7's "
    "batches and before S7b the support step runs once more on every raised way, its keys kept by (5) and its span rule "
    "then running at its eager time, with every obstacle then standing (S5b's and S5c's ways; S7's strips, gate plazas, "
    "castle paths, quays, piers and moles); a station this run can neither slide nor omit within `maxClearSpanM` and "
    "`maxPierM` keeps the place the earlier run gave it, and the S7 part it meets gives way in that batch — a strip, "
    "plaza or square cut round its ring, a quay, pier, mole or castle path ending at the ring and resuming beyond it — "
    "reported (`W_RAISED_CROSSING`). A locked or pinned raised way — its deck and piers a fixed input of the run (§7.2; "
    "§7.4's lock column) — is crossed at generation as a standing one ((b)), and the run after S7 moves none of its "
    "stations, every S7 part one meets giving way as above. No generated course is dropped for a later stage (T110-2)."
)
SIX_B = (
    "(b) *A standing raised way is held.* After generation nothing laid later re-runs this step on a raised way, moves, "
    "adds or omits a station, mints a key or re-rules a span; only an op that names the raised way changes it (its "
    "edits, V06 §3.19's ops, a landfall, a frame growth's extension of its deck, §3.2 (9)), and none drops it. Its "
    "supports, its ramps, stairs and feet (`RaisedWayRecord.feet`) and the under-deck strip of each `vault` span are a "
    "reservation on ground part 0 for every later way, trace, strip, berm, channel, plot, square and reservation; the "
    "rest of its under-deck strip is crossed only so: (i) a part-0 way under an `open` span, by §4.3's rule; (ii) a "
    "moat's or a carve's channel under an `open` span, never through a support; (iii) an enceinte's trace through one "
    "station on the deck at its level — the one nearest where the trace would cross, the trace bent along the deck to "
    "pass through it, the station never moved — which becomes its crossing station by (3), its key kept and its support "
    "the band's stretch under the deck together with the pier's former ring (the pier built into the wall, so no clear "
    "span grows), written in the trace's commit and restored by its undo; the trace's setback, glacis, berm and channel "
    "pass under the deck between that station and each neighbour only where that span is `open` and no other support, "
    "ramp, stair or foot stands in them, and otherwise stop as in (a), reported (V06's wall report at an epoch; the dry "
    "run's line for a hand edit); (iv) a village palisade (`VillagePlan.palisade`) abuts each support standing in its "
    "band and passes beneath every span, with no crossing station and no gate (V07 §3.5a (4)). The later work gives "
    "way, never the raised way: S5c's proposal is deflected along the strip or ends there as at a reservation (§4.4); a "
    "route re-solve takes another course by F-ROUTE's ladder (§4.3); a circuit, contraction or re-anchored stretch takes "
    "(iii) (V06 §3.7.6 (5)); S8 holes its plots round the reservation (§4.6); a square or reservation is cut round it; "
    "a hand `drawWay`, a moved way, a carve, a `drawWall` or a moved trace vertex is bent at its dry run (§7.1's outcome "
    "table). A lock or pin on the raised way holds what (b) holds; a crossing station's support taking the band's "
    "stretch is the wall's arch (item 110 (b)), so a locked or pinned raised way is crossed as an unlocked one "
    "is (§7.4's lock column; T110-2)."
)
new = wrap(pre, '  ', '  ') + wrap(SIX_A, '  * ', '    ') + wrap(SIX_B, '  * ', '    ')
splice(i, j, new)
APPLIED += 3

# ==== §2.9 ===========================================================================================================
S29 = lambda: section(H29)

# VAT3-r3-02's sweep (R4-01 (2)): Recipe.history names the hint's bound.
inline(S29(), "history?: HistoryHint;        // item 88, g item 113: the pre-creation history (§2.7)", [
    ("the pre-creation history (§2.7)",
     "the history up to and including the present at creation (§2.7; §4.11 *The clock* (1))", 1),
])
APPLIED += 1

# VRC3T-02 per R4-02: the layers shown are no view key; the working layer is drawn whatever its visibility.
inline(S29(), "* **View state** (FTG-12, LC-16): time, location", [
    ("view pins, layer choices,", "view pins,", 1),
])
rewrap(S29(), "`null` to delete; V09 §2.8), and the people a user has opened live",
       "its session from `doc.load` instead and never writes this key (§11.3).", '  ', '  ', [
    ("outside every digest; the document's `style` stays canonical;",
     "outside every digest. The layers shown are no view key: `LayerSpec.visible` is the document's style state, set "
     "by a logged `setLayer` (§8.4, §7.1; §11.3); the per-viewer `workingLayer` (above) is drawn whatever its "
     "visibility (§8.4). The document's `style` stays canonical;", 1),
])
APPLIED += 2
