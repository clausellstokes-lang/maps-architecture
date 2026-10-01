# repair-model-r3 edits, executed by gen.py (its helpers in scope). Each substitution is count-asserted on the joined
# text of its line range; the issue ids each edit closes are in the comment above it.
APPLIED = 0

# ---- §2.6 step 7 ---------------------------------------------------------------------------------------------------
# VM-R2T-01 (one term: a build Works' stage is the plan rung's input; a `decay` or `repair` Works is none, below)
rewrap(section(H26), 'A building whose running Works', "stage change marks the plan `stale` (item 67 (h), (j)).",
       '   ', '   ', [
    ('A building whose running Works stands before FINISHED',
     'A building whose running build Works stands before FINISHED', 1),
])
APPLIED += 1

# VM-R2T-01 (1) per R3-07; VM-R2T-02 per R3-06 (binding text, carrying R3-04, R3-07, R3-08 (a)-(b); closes VDC2-07,
# VRC2T-14; the END lines of VV56-r2-01, VV56-r2-06, VAT2-r2-05, VAT2-r2-06); VAF-R2T-01 per R3-05 (the roofless case).
OLD_PLAN = ("re-cuts no plan — the plan in force stands, the stored plan, else the one re-derived from its canonical prior "
            "at the building's built band and era (the as-built plan, below; V03 §3.11's vacant re-cut is a standing "
            "building's only) — and a building first met")
NEW_PLAN = ("re-cuts no plan — the plan in force when its decay run began (V06 §3.23 (1)) stands: the stored plan, else "
            "the one re-derived from its canonical prior at the occupant inputs it held in the week before that run "
            "began (V03 §3.11 *Decay re-cuts no plan*: the plan it was last lived in, its as-built plan (below) when "
            "never re-let); V03 §3.11's vacant re-cut is a standing building's only — and a building first met")
OLD_LEVEL = ("the building's **decay level** — V06's `decayLevel(doc, lineage, week)` in [0, 1], derived and never "
             "stored, from its existence state, the years since the week of the epoch whose op set it `abandoned` (its "
             "lifecycle events, §2.8) and V11's rate by material (timber faster than stone), read at the drawn week "
             "(§2.9's `week`) — shows damaged every element whose t it has reached (level ≥ t), the one comparison "
             "every reader makes. The level never falls while the building stays abandoned, decayed or ruined, so "
             "damage only accumulates and never moves (a higher level's damaged set contains a lower's); a restoration "
             "(`reused`, `reoccupy`, a repair) lowers it, and the damage leaves in reverse threshold order, a repaired "
             "element drawn in item 114's patch material. A building with no abandonment epoch (generated ruined; first "
             "met in item 113's replay) — and every building before V06's level lands (M6-E) — reads its existence "
             "state at V11's default age.")
NEW_LEVEL = ("the building's **decay level** — V06 §3.23's `decayLevel(doc, lineage, week)` in [0, 1], derived and "
             "never stored, from its decay run (from the week the change that took it from a standing state into "
             "`abandoned`, `decayed` or `ruined` — a `vacate`, a `burn`, a `ruin` — shows; its lifecycle events, §2.8), "
             "its state and V11's rate by material (timber faster than stone), read at the drawn week (§2.9's `week`) "
             "— shows damaged every element whose t it has reached while above 0 (§6.3 *Plan damage*'s one "
             "comparison: a level of 0 damages nothing). "
             "One case has no threshold: while a building is `decayed` or `ruined` — however V06 §3.23 reads its "
             "level, its existence state alone before that level lands (M6-E) included — every roof bay over a room "
             "of a wing whose `RoofSpec.kind` is `none` (the decline's roofless state, a fire's charred shell) is "
             "damaged whatever its t, so the plan's open ceilings are the roof the exterior lacks (item 123 (d)); once "
             "its state has reached `decayed`, each such bay counts as reached for the repaired-element rule (V03 §5.6 "
             "(2) (b)); nesting holds, the bays damaged from the week its state reaches `decayed` and staying so while "
             "the state only climbs; a standing wing an author roofed `none` keeps its plan unchanged. V03 §5.6 (2) "
             "(c) and V02 §5.7 (2) cite this. "
             "The level never falls while the building stays abandoned, decayed or ruined, so damage only accumulates "
             "and never moves (a higher level's damaged set contains a lower's); a restoration (item 123 (b)'s "
             "\"reused\": a `reoccupy` back into use; a repair) lowers it, and the damage leaves in reverse threshold "
             "order, a repaired element drawn in item 114's patch material — an element that entered the plan after "
             "its damage left never drawn repaired (V06 §3.23 (3)). A building generated abandoned, decayed or ruined "
             "reads V06 §3.23 (4)'s run, V11's default age at the week it is first met so and aging from then; one item "
             "113's replay abandons or ruins ages from that replay epoch's week; every building before V06's level "
             "lands (M6-E) reads its existence state alone at V11's default age.")
rewrap(section(H26), '**The damage layer — the plan built, never redrawn', 'bars T123-1 – T123-7 (§13.2).',
       '   ', '   ', [(OLD_PLAN, NEW_PLAN, 1), (OLD_LEVEL, NEW_LEVEL, 1)])
APPLIED += 2

# ---- §2.7 ----------------------------------------------------------------------------------------------------------
# VM-R2T-03 (the writers' home points to the hold, so no writer reads past it)
rewrap(section(H27), "the wealth, at V11 §3.25.3's shares; item 114 (d)), every run's epoch 0",
       '`repairWall` and the generation row set a material', '', '', [
    ("and with the replay the replay's own epochs (V06 §3.20). Every writer sets",
     "and with the replay the replay's own epochs (V06 §3.20). A stretch of the band under a raised way's crossing "
     "station is held from these writers while its deck stands (*Raised ways*, below: the support step (3)). Every "
     "writer sets", 1),
])
APPLIED += 1

# VM-R2T-10, amended (Part H): cite V06 §3.7.7 (3), restate no order
rewrap(section(H27), "*Readers:* §8.2's state rows and legend", 'and epoch 0 throughout.', '', '', [
    ("volume 6's transitions (V06 §3.7.7: patches rebuilt oldest first by the week of each run's `conditionEpoch` — "
     "its `EpochRecord.week`, so a replay epoch's patch before every live one's (§6.1) —, ties in chain order);",
     "volume 6's transitions (V06 §3.7.7 (3), which orders the patches' rebuilding);", 1),
])
APPLIED += 1

# VM-R2T-03 per R3-25 (d): the band under a crossing station held while the deck stands;
# VEW-r2-01 per R3-25 (c): (6) a trace or moat laid across a standing raised way
HOLD = ("and the clear-span bound reads the spans on either side of that station (T110-2); while the deck stands, the "
        "stretch of the band under a crossing station is held by it — no writer of its condition but a landfall leaves "
        "it `breached` or `dismantled`: S7's generation row (§4.8 *Condition at generation*) reads a `breached` draw "
        "there as `worn`, and `DeclineOp`'s `breach` and `dismantle` and V06 §3.7.7 (2)'s decay pass over it in chain "
        "order as V06 §3.7.6 (5)'s dismantling does (a hand op's dry run bending its stretch round it, item 101 R2); "
        "it may wear, and a repair writes it as any run; a landfall over it breaches it and ruins the deck there by "
        "V05's landfall table — and from the first epoch after the raised way is removed or the spans on both sides "
        "of the station have fallen (`ruined` or `cleared`) it is an ordinary run (§13.2's item-114 group); (4) each "
        "other pier's")
SIX = ("and mints the rest after the largest key the way has held; (6) a trace or moat laid across a standing raised "
       "way — a later stage's S5a trace and outer moat at generation, an epoch's circuit, contraction or re-anchored "
       "stretch (V06 §3.7.6 (5)), a hand `drawWall` — re-runs (1)–(5), and then the span rule, on that raised way in "
       "the same commit (the trace's undo restoring them): (3) sets the crossing station on the new trace (the station "
       "it moves keeping its key, (5)) and slides or omits the stations the new strips' setbacks, glacis, berm or "
       "channel meet; where a clear span on either side of the station would then pass `maxClearSpanM`, or a pier "
       "`maxPierM`, the trace gives way (S5a: its stage trace takes the next lattice boundary node off that span, "
       "reported; V06: it retraces and waits, `walls.waited`; a hand `drawWall`: its dry run bends the trace to the "
       "nearest one whose crossing fits, item 101 R2) — a standing raised way is never dropped for a wall (T110-2).")
rewrap(section(H27), '* **The support step**, run for every raised way', 'largest key the way has held.', '', '  ', [
    ("and the clear-span bound reads the spans on either side of that station (T110-2); (4) each other pier's", HOLD, 1),
    ("and mints the rest after the largest key the way has held.", SIX, 1),
])
APPLIED += 2

# ---- §2.8 ----------------------------------------------------------------------------------------------------------
# VM-R2T-01 (2) per R3-07
i_inputs = find_line(section(H28), "inputs: Hash64 /* the digest of the rung's recorded inputs, per rung.")
_t = lines[i_inputs]
_old = "its running Works' stage at the drawn week (item 67 (j))"
assert _t.count(_old) == 1
lines[i_inputs] = _t.replace(_old, "its running build Works' stage at the drawn week (item 67 (j); a `decay` or `repair` "
                                   "Works is none, §2.6 step 7)")
rewrap(section(H28), '`absent`: never derived, or evicted', 'reproduce (§6.2, §6.5 (9)); what a click derives', '  ',
       '  ', [
    ("its Works' stage, a slice, a dossier event of items 18, 22 or 31;",
     "its build Works' stage, a slice, a dossier event of items 18, 22 or 31; for a building in a decay run (V06 "
     "§3.23 (1)) its occupant inputs — use, assignment, sub-locations, concealed use, the households housed and the "
     "occupants' band and value — are those of the week before its run began (V03 §3.11), so neither the leaving nor "
     "a later move of the field stales its plan;", 1),
])
APPLIED += 2

# ---- §2.9 ----------------------------------------------------------------------------------------------------------
# VRC2T-16 (the ring's massed marks in the bounds of town and camps); VM-R2T-08 (the default export frame and the
# export cut change with them; "only these framings")
rewrap(section(H29), '* **The crisis framing (g item 122 (i); J138).**', "drawn as §8.8's massed marks on the ring.",
       '', '  ', [
    ("(the union of `bounds`, §8.1's `DisplayList.bounds`, and every camp the looks place, §10.2's placement inside the "
     "frame and its margin)",
     "(the union of `bounds`, §8.1's `DisplayList.bounds`, every camp the looks place — §10.2's placement inside the "
     "frame and its margin — and the ring's massed camp marks beyond it, §8.8's *The surrounding ring*)", 1),
    ("the opening view (§9.5's *Framing* circle, widened to contain every camp)",
     "the opening view (§9.5's *Framing* circle, widened to contain every camp, and with it the default export frame "
     "that circle sets; every export frame cut to those bounds, §8.7)", 1),
    ("When no look stands, all three return to item 116's,", "When no look stands, each returns to item 116's,", 1),
    ("Only the opening view, Fit and the limit change: a view the user has moved is never re-framed (item 122 (i)).",
     "Only these framings change: a view the user has moved is never re-framed (item 122 (i)).", 1),
])
APPLIED += 2
