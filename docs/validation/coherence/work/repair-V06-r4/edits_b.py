# Count-asserted substitutions for repair-V06-r4, part B: §3.19, §3.20, §3.21, §3.23
H319 = "### 3.19 Item 110 over epochs — raised ways, retaining walls and decks (item 110 (a), (b), (d); J-V6.82–J-V6.95)"
H320 = "### 3.20 The history replay at generation (item 113)"
H321 = "### 3.21 Edges — every mechanism at its limits (principle (11))"
H323 = "### 3.23 The decay level of a building lineage (item 123)"

EDITS_B = [
# ---- §3.19 lead: END of VEW-r3-01 (pipeline) — the route re-solves' and the growth's crossing cite §4.3
(H319, "END VEW-r3-01 (3.19 lead)",
 "path's operator (V06 §3.1 (4)), so its dry run, locality and undo are the hand path's.",
 "path's operator (V06 §3.1 (4)), so its dry run, locality and undo are the hand path's. A standing raised way is held\n(§2.7's support step (6) (b)): only an op that names it — its hand edits, this section's ops, a landfall, a frame\ngrowth's extension of its deck (§3.2 (9)) — changes it, and a later wall trace crosses it only through one of its\nstations (V06 §3.7.6 (5)); an epoch's growth (V06 §3.6 (4)) and every route an epoch re-solves cross it by §4.3's rule — its support rings, ramps,\nstairs and feet and the under-deck strips of its `vault` spans impassable on ground part 0, the rest of its under-deck\nstrip crossed only under an `open` span, a route's crossing shifting along the strip to the nearest such crossing,\nelse the route taking another course by F-ROUTE's ladder (§5.2).", 1),
# ---- §3.19.2 (3): END of VEW-r3-04 — the salvage dismantle never takes a crossing station
(H319, "END VEW-r3-04 (3.19.2 (3))",
 "so a ruined aqueduct stands for\n     centuries as a row of piers;",
 "so a ruined aqueduct stands for\n     centuries as a row of piers — never a crossing station's: its support is the wall's band, read from its stretch's\n     `condition`, which once both spans have fallen decays as the wall's (V06 §3.7.7 (2)) and is never dismantled as a\n     support (§2.7's support step (3));", 1),
# ---- §3.19.2 (4): END of VEW-r3-04 — the topple never takes it; a landfall over it
(H319, "END VEW-r3-04 (3.19.2 (4) topple)",
 "4. **Hazards** (V06 §3.11): `topple` takes a support, weighted by its height, and breaks both spans beside it; an",
 "4. **Hazards** (V06 §3.11): `topple` takes a support, weighted by its height, and breaks both spans beside it — never\n   a crossing station's (§2.7's support step (3); V06 §3.11.4); an", 1),
(H319, "END VEW-r3-04 (3.19.2 (4) landfall)",
 "a landfall ruins the spans and supports it covers whatever their state — that is the island's law (V05\n   §3.16),",
 "a landfall ruins the spans and supports it covers whatever their state, and over a crossing station breaches its\n   stretch and ruins the spans beside it (§2.7's support step (3)) — that is the island's law (V05 §3.16),", 1),
# ---- §3.19.2 (5): END of VEW-r3-04 — the repair beside a fallen stretch
(H319, "END VEW-r3-04 (3.19.2 (5))",
 "`repairRaised` (V06 §2.8) on each ruined span (its\n   ruined supports with it), then on the way itself",
 "`repairRaised` (V06 §2.8) on each ruined span (its\n   ruined supports with it; beside a crossing station whose stretch is `breached` or `dismantled`, a `repairWall` of that\n   stretch first, in the same batch, in item 114's patch material — the row V06 §3.7.7 (3) draws, a `dismantled`\n   stretch taking the op's bend, a new stretch drawn on its line (V06 §2.8) — so no deck stands on a fallen wall, §2.7's\n   support step (3)), then on the way itself", 1),

# ---- §3.20.2: VAT3-r3-10 per R4-07 (c)
(H320, "VAT3-r3-10 (3.20.2)",
 "the epoch whose span `(toYearsAgo, fromYearsAgo]` holds its years ago; one before the start is not replayed",
 "the epoch whose span `(toYearsAgo, fromYearsAgo]` holds its years ago, an event or a calamity at the present (0 years\nago) in the last epoch, at `W_p`; one before the start is not replayed", 1),

# ---- §3.21 dossier-bound row: VV56-r3-01; the batch (R4-16 sweep)
(H321, "VV56-r3-01 (3.21 dossier-bound)",
 "one whose dossier events alone pass the catch-up's budget (V06 §6.8 (6)),",
 "one where even one epoch over the span with its dossier events' absorb term passes the catch-up's budget (V06 §6.8 (6)),", 1),
(H321, "R4-16 sweep (3.21 dossier-bound)",
 "the coarsened catch-up of V06 §6.8 (6): one epoch per k crossed year ends, every dossier event at its own week, a calamity",
 "the coarsened catch-up of V06 §6.8 (6): one epoch per k crossed year ends, every dossier event at its own week, the events each epoch's span holds absorbed as one batch (V08 §6's absorb-with-epochs row), a calamity", 1),
# ---- §3.21 decline row: VEL3-r3-01 text 2
(H321, "VEL3-r3-01 (3.21 decline edge)",
 "a leaving household that is locked or pinned, or a locked or pinned dwelling's last; every rung;",
 "a leaving household that is locked or pinned, or a locked or pinned dwelling's last; a rise after a fall that held a household; every rung;", 1),
(H321, "VEL3-r3-01 (3.21 decline outcome)",
 "the dwelling kept at one household or more (V06 §3.5.1 (1), (4), (5)); the village rows at a village rung;",
 "the dwelling kept at one household or more (V06 §3.5.1 (1), (4), (5)); the households that left in its place return first, the held one never added twice and counted toward the target where it stands above it (V06 §3.5.1 (1)); the village rows at a village rung;", 1),
# ---- §3.21 replay row: VAT3-r3-10 per R4-07 (c)
(H321, "VAT3-r3-10 (3.21 replay edge)",
 "an event before the start; an unknown event type;",
 "an event before the start; an event or a calamity at the present week; an unknown event type;", 1),
(H321, "VAT3-r3-10 (3.21 replay outcome)",
 "coarsened, reported; not replayed; row `none`, reported;",
 "coarsened, reported; not replayed; replayed in the last epoch at `W_p`; row `none`, reported;", 1),
# ---- §3.21 decay row: VV56-r2-06 per R4-03
(H321, "VV56-r2-06 (3.21 decay edge)",
 "a restored building re-cut or extended; a `reused` trace at level 1;",
 "a restored building re-cut or extended; a `reoccupy` whose re-cut is made while its `repair` Works runs past its epoch's week; a `reused` trace at level 1;", 1),
(H321, "VV56-r2-06 (3.21 decay outcome)",
 "the added elements drawn as built, the kept ones patched; level and peak 0 from its week",
 "the added elements drawn as built, the kept ones patched; the minted elements drawn as built throughout the repair, the kept ones leaving the damage and patched; level and peak 0 from its week", 1),

# ---- §3.23: VV56-r2-06 per R4-03 — the signature's comment and (3)
(H323, "VV56-r2-06 (decayPeak comment)",
 "since: number /* the element's entry week into the plan, V03 §5.6 */): number   // the highest decayLevel over [since, week] ((3))",
 "since: number /* the element's entry week into the plan, V03 §5.6 (2) (b) — for an element a restoring event's re-cut mints, the week that restoration ends ((3)) */): number   // the highest decayLevel over [since, week] ((3)); 0 for a week before `since`", 1),
(H323, "VV56-r2-06 (3)",
 "or a wing an `extend` adds at that change's effective week — so an element added after its\n   building's damage left is never drawn repaired, and an element a re-cut keeps keeps its peak.",
 "or a wing an `extend` adds at that change's effective week — save that an element a restoring event's re-cut\n   mints (V03 §3.11: the new occupants' partitions, doors and furniture) enters the plan, for its damage, at the week\n   that restoration ends: its `repair` Works' FINISHED week, or the week a decay run that begins before then starts ((2):\n   such a run starts from the level the restoration left); with no Works, the event's effective week. Before that week\n   it is drawn as built — no level the restoration lowers damages it or is its peak — so a restoration's new elements are\n   neither damaged nor repaired by it, and a kept element keeps its entry week and peak; from that week on it reads the\n   building's level as every element does. So an element added after its building's damage left is never drawn\n   repaired, and an element a re-cut keeps keeps its peak.", 1),
]
