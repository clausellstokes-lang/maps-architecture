# Count-asserted substitutions for repair-V06-r4, part A: §1.1, §1b, §2.1, §2.8, §2.10, §3.5, §3.6, §3.7, §3.11
H11 = "### 1.1 What this volume builds"
H1b = "## 1b Wiring table — every new piece, what feeds it and what it feeds"
H21 = "### 2.1 The engine's interfaces (`@plat/evolve`)"
H28 = "### 2.8 The new conversion kinds and `Way.formerClass`"
H210 = "### 2.10 The epoch report and the chronicle (non-canonical, rebuilt by replay)"
H35 = "### 3.5 Decline"
H36 = "### 3.6 Growth — fill first, crowd next, spread last"
H37 = "### 3.7 Fortification — new circuits, old rings, shorter rings"
H311 = "### 3.11 Hazards — fire, flood, collapse and drought"

EDITS_A = [
# ---- §1.1 (14): VV56-r3-01
(H11, "VV56-r3-01",
 "a catch-up whose dossier events alone pass its budget completing past it, reported\n    (V06 §6.8 (6)).",
 "a catch-up where even one epoch over the span with its dossier events' absorb term passes its budget\n    completing past it, reported (V06 §6.8 (6)).", 1),

# ---- §1b W64: END of VAL-R3-03 (R4-09)
(H1b, "END VAL-R3-03 (W64)",
 "every op that creates, repairs, breaches or removes a raised part; every op that levels",
 "every raised way whose `feet`, `supports` or `spans` an epoch op, a landfall, a trace's crossing station or the frame growth changed; every op that levels", 1),
# ---- §1b W68: the held raised way (R4-09 sweep; the report field that wires (6) (b) (iii)'s "reported")
(H1b, "R4-09 sweep (W68)",
 "| W68 | raised ways on every wall trace (V06 §3.7.6 (5)) | the standing raised ways' supports and spans | the trace's cost field and strip rule; a wall opening (aqueduct) or a raised gate (viaduct, elevated road) as S7 furniture; `absorbWall` and `wallToWay` leaving the raised way standing | §4.4 S5a, §4.8 S7 |",
 "| W68 | raised ways on every wall trace (V06 §3.7.6 (5)) | the standing raised ways' supports, ramps, stairs, feet and spans | the trace's cost field and strip rule; the trace bent through one station on the deck at its level, that station its crossing station, its strips stopped at the under-deck strip's edges where they cannot pass, counted `walls.raisedCrossings` (V06 §2.10); a wall opening (aqueduct) or a raised gate (viaduct, elevated road) as S7 furniture; `absorbWall` and `wallToWay` leaving the raised way standing | §4.4 S5a, §4.8 S7; §2.7's support step (3), (6) (b) |", 1),
# ---- §1b W79: the dismantling's exception named as §3.7.2 (3) now names it (VM-R3T-03 sweep)
(H1b, "VM-R3T-03 sweep (W79)",
 "a stretch under a raised gate whose deck stands excepted (V06 §3.7.6 (5))",
 "a stretch under a crossing station whose deck stands excepted (V06 §3.7.6 (5))", 1),
# ---- §1b W91: VV56-r3-01 and R4-16's batch (sweep)
(H1b, "VV56-r3-01 (W91)",
 "a catch-up whose dossier events alone pass its budget completing past it, reported (item 119 (a2);",
 "a catch-up where even one epoch over the span with its dossier events' absorb term passes its budget completing past it, reported (item 119 (a2);", 1),
(H1b, "R4-16 sweep (W91)",
 "a catch-up's dossier events at V08 §6's per-event absorb bound by the document's rung,",
 "a catch-up's dossier events and the epochs it folds at V08 §6's catch-up batch costs by the document's rung (its absorb-with-epochs row: per epoch folded and per event),", 1),

# ---- §2.1 EpochScope.raised: END of VAL-R3-03 (R4-09)
(H21, "END VAL-R3-03 (EpochScope.raised)",
 "raised: Id[] /* raised ways (item 110 (b)) any op of this epoch created, repaired, neglected, breached, dismantled or removed, or whose spans a landfall ruined (sky.islands), address order */;",
 "raised: Id[] /* every raised way (item 110 (b)) whose `feet`, `supports` or `spans` an epoch op, a landfall (sky.islands), a trace's crossing station or the frame growth changed, address order */;", 1),

# ---- §2.8 repairRaised: END of VEW-r3-04 (R4-09), the op's own comment conformed
(H28, "END VEW-r3-04 (repairRaised)",
 "a ruined span back to standing, with each ruined support at its ends (a support a topple or a landfall ruined), or,",
 "a ruined span back to standing, with each ruined support at its ends (a support a topple or a landfall ruined; beside a crossing station, whose support is the wall's band, a `repairWall` of its `breached` or `dismantled` stretch first, in the same batch, in item 114's patch material — §2.7's support step (3), V06 §3.19.2 (5)), or,", 1),

# ---- §2.10 the walls report: R4-09 (a trace never waits for a raised way; its stopped strips reported)
(H210, "R4-09 sweep (walls report)",
 "waited: number /* traces that could not keep water access or a raised way's continuity */;",
 "waited: number /* traces that could not keep water access or pass an occupied footprint, waiting for a later epoch (V06 §3.7.4 (3), V06 §3.7.6 (2)); none waits for a raised way */;\n    raisedCrossings: number /* crossings of a standing raised way at which a trace's setback, glacis, berm or channel stopped at its under-deck strip's edges (V06 §3.7.6 (5); §2.7's support step (6) (b)) */;", 1),

# ---- §3.5.1 (1): VEL3-r3-01 text 1
(H35, "VEL3-r3-01 (1)",
 "fall the others cannot meet is met short by it, counted\n   `households.heldByLock` — `n_b = |L_b|`.",
 "fall the others cannot meet is met short by it, counted\n   `households.heldByLock` — `n_b = |L_b|`. A household held so — a locked or pinned one passed over or met short, or\n   (4)'s protected last household — keeps its place and its roster ordinal: the town then holds the roster's households\n   up to the met count less those that left in a held household's place, plus the held ones. At every later epoch the\n   delta demand (§4.11's suffix between the old and the new population) is read over that set — the roster's households\n   up to the epoch's target that the town does not hold, in ordinal order, those that left in a held household's place\n   first (§10.2's AM-8: the same suffix back first), a held household standing above the target counting toward it, in the\n   place of the last household the rise would otherwise add. A held household that still stands is never added twice, so the town holds exactly the\n   roster's prefix to the target once the target reaches every held household's ordinal.", 1),

# ---- §3.6 (1): VEL3-r3-01's reading named where the delta demand is read (sweep)
(H36, "VEL3-r3-01 sweep (3.6 (1))",
 "`R₀` = the delta demand's households no tier (0)–(5″) could place,",
 "`R₀` = the delta demand's households (§4.11's suffix, read over the households the town holds where a fall\n   held one, V06 §3.5.1 (1)) no tier (0)–(5″) could place,", 1),
# ---- §3.6 (4): END of VEW-r3-01 (pipeline) — the growth's crossing of a standing raised way
(H36, "END VEW-r3-01 (3.6 (4))",
 "(§4.3) — so one epoch never exceeds a cap.",
 "(§4.3) — so one epoch never exceeds a cap. The stage's ways and S5c's proposals cross a standing raised way by §4.3's rule\n   — its support rings, ramps, stairs and feet and the under-deck strips of its `vault` spans impassable on ground part 0,\n   the rest of its under-deck strip crossed only under an `open` span, never along it — the raised way held (§2.7's\n   support step (6) (b)), and S8 holes the stage's plots round them (§4.6).", 1),

# ---- §3.7.1: END of R4-09 (adjudicator's sweep)
(H37, "END R4-09 (3.7.1)",
 "the supports of a raised way the\ntrace crosses excepted within one strip width of the crossing (§2.7's support step (6) re-sites them, V06 §3.7.6 (5))\n— the built-face legality",
 "a standing raised way's under-deck\nstrip, supports, ramps, stairs and feet excepted where the trace crosses it (its strips stop there, §2.7's support step\n(6) (b)) — the built-face legality", 1),
# ---- §3.7.2 (2): VM-R3T-03 (the release on both spans fallen); the stretch named as §2.7's (a gate or an opening)
(H37, "VM-R3T-03 (3.7.2 (2))",
 "A stretch that holds a raised gate whose deck stands is no candidate, filtered before the\n   draw (J-V6.7), until that raised way is removed or its crossing span `dismantled` (V06 §3.7.6 (5)).",
 "A stretch under a crossing station whose deck stands — a raised gate's, or a wall opening's\n   under an aqueduct — is no candidate, filtered before the draw (J-V6.7), until that raised way is removed or the spans\n   on both sides of its crossing station have fallen (`ruined` or `cleared`; §2.7's support step (3); V06 §3.7.6 (5)).", 1),
(H37, "VM-R3T-03 sweep (3.7.2 (3))",
 "until every run is `dismantled` but a stretch holding a raised gate under a standing deck (V06 §3.7.6 (5));",
 "until every run is `dismantled` but a stretch under a crossing station whose deck stands (V06 §3.7.6 (5));", 1),
# ---- §3.7.6 (5): END of R4-09 — footprint bullet (its exception conformed), crossing bullet, continuity bullet
(H37, "END R4-09 (3.7.6 (5) footprint)",
 "for V06 §3.7.1's strip rule (but within one strip width of a\n     crossing, V06 §3.7.1)",
 "for V06 §3.7.1's strip rule (but where the trace crosses it,\n     V06 §3.7.1)", 1),
(H37, "END R4-09 (3.7.6 (5) crossing)",
 "   * a trace crosses a raised way at one **crossing station** on the trace (§2.7's support step (3), (6): the nearest\n     interior station within half a pitch moved there, keeping its key, else one added; the stations in the new strip's\n     setback, glacis, berm or channel re-sited), never along its under-deck strip;",
 "   * a trace crosses a raised way through one of its stations on the deck at its level, the trace bent to it (§2.7's\n     support step (6) (b)), never along its under-deck strip — that station its **crossing station** (§2.7's support\n     step (3)), its key kept, its support the band's stretch under the deck with the pier's former ring;", 1),
(H37, "END R4-09 (3.7.6 (5) continuity)",
 "   * **continuity is a hard rule**, like water access: a trace that cannot cross every raised way it meets so — where\n     §2.7's support step (6) cannot keep each span within `maxClearSpanM` and each pier within `maxPierM` — retraces by\n     the margin rule (V06 §3.7.4 (3)) and then **waits** for a later epoch, reported (`walls.waited`) — never forced\n     (J-V6.58's form);",
 "   * **continuity**: a trace never waits for a raised way: what cannot pass under its deck stops at the under-deck\n     strip's edges, reported (§2.7's support step (6) (b); `walls.raisedCrossings`, V06 §2.10) — `walls.waited` kept for\n     the other continuity rules (the water access of (2), the occupied footprints of V06 §3.7.4 (3));", 1),
# ---- §3.7.6 (5) dismantling bullet: VM-R3T-03
(H37, "VM-R3T-03 (3.7.6 (5))",
 "and takes it, by the same draw, from the first epoch after that raised way is removed or its crossing\n     span `dismantled` —",
 "and takes it, by the same draw, from the first epoch after that raised way is removed or the spans on\n     both sides of its crossing station have fallen (`ruined` or `cleared`; §2.7's support step (3)) —", 1),

# ---- §3.11.4: END of VEW-r3-04 (R4-09) — the topple's own home conformed
(H311, "END VEW-r3-04 (3.11.4)",
 "a wall tower → `breach` of the\nwall stretch around it (up to 20 m each side); **a raised-way support** (weighted by its height like any structure) → the\nsupport `ruined` and **both spans beside it ruined** (`breach`) in the same op, their arch vaults collapsing with them\n(V06 §3.19.2 (4)).",
 "a wall tower → `breach` of the\nwall stretch around it (up to 20 m each side), passing over the stretch under a crossing station while its deck stands\n(§2.7's support step (3)); **a raised-way support** (weighted by its height like any structure) → the\nsupport `ruined` and **both spans beside it ruined** (`breach`) in the same op, their arch vaults collapsing with them\n(V06 §3.19.2 (4)) — never a crossing station's, whose support is the wall's band (§2.7's support step (3)).", 1),
]
