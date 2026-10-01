"""edits_b — V06 §3.3, §3.5, §3.7, §3.10 (tags: the issue, ruling or END line each edit applies)."""


def apply(sub):
    # ---- §3.3.1 — VAT2-r2-02, amended per R3-17: cite the cadence's home, list no trigger -----------------------------
    sub('VAT2-r2-02 (R3-17) §3.3.1',
        "**3.3.1 Dossier-bound.** The port folds epochs by §4.11's cadence (a 52-week boundary, or a population move past the\n"
        "roster tolerance; a catch-up whose epochs at that cadence would pass the comfort level folds coarser, V06 §6.8 (6)) with\n"
        "the week, the target,",
        "**3.3.1 Dossier-bound.** The port folds epochs (at §4.11 *The clock* (4)'s cadence; a catch-up whose epochs at that\n"
        "cadence would pass the comfort level folds coarser, V06 §6.8 (6), a calamity then riding the coarse epoch that holds its\n"
        "week) with the week, the target,")

    # ---- §3.5.1 — VEL2-r2-01 texts 1–3 (R3-19; closes VPC-R2-07) --------------------------------------------------------
    sub('VEL2-r2-01 §3.5.1 lead',
        "When the epoch's target lies below the manifest, the roster's\n"
        "suffix leaves in reverse ordinal order (§4.11) — that fixes WHO leaves.",
        "When the epoch's target lies below the manifest, the roster's\n"
        "suffix leaves in reverse ordinal order (§4.11), a locked or pinned household passed over by (1) — that fixes WHO leaves.")
    sub('VEL2-r2-01 text 1 §3.5.1 (1)',
        "1. For each band `b` in the band order (poorest first; §4.5's cuts), `L_b` = the leaving households of band `b`,\n"
        "   `n_b = |L_b|`.",
        "1. For each band `b` in the band order (poorest first; §4.5's cuts), `L_b` = the leaving households of band `b` — the\n"
        "   roster's suffix in reverse ordinal order (§4.11), each locked or pinned household passed over for the next household\n"
        "   below it in that order that is neither (§7.2: a locked household is a fixed input, a pinned one keeps its\n"
        "   existence). Under a dossier population fall that the unlocked and unpinned households cannot meet, the locked and\n"
        "   pinned ones leave too, in the suffix order, each lock or pin reported orphaned (§7.7's precedence; T20-16). Under any\n"
        "   other fall a locked or pinned household never leaves, and a fall the others cannot meet is met short by it, counted\n"
        "   `households.heldByLock` — `n_b = |L_b|`.")
    sub('VEL2-r2-01 text 2 §3.5.1 (4)',
        "When its band has no emptying dwelling to refill from, the\n"
        "   household still leaves and the protected building keeps one household fewer (a `relet` down, never a `vacate` of a\n"
        "   protected building's last household by this step), counted `uses.heldByProtection` in the report.",
        "When its band has no emptying dwelling to refill from, under a\n"
        "   dossier population fall the household still leaves and the protected building keeps one household fewer (a `relet`\n"
        "   down, to 0 at its last household; §7.7's precedence); under any other fall it leaves only while the building keeps\n"
        "   another household (a `relet` down), and the building's last household stays — passed over as (1) passes a locked\n"
        "   household, the next household below it in the suffix's order that is neither locked, pinned nor such a last\n"
        "   household leaving in its place (its dwelling let down by one, `vacate`d at its last, (5)), else the fall met short by\n"
        "   it (`households.heldByLock`) — so the building keeps at least one household (§2.6's clamp); counted\n"
        "   `uses.heldByProtection` in the report in either case.")
    sub('VEL2-r2-01 text 3 §3.5.1 (5)',
        "`relet` down where a building keeps households, `vacate` at the last —\n"
        "   never at a locked or pinned building, whose last household (4) lets out by a `relet` down to 0, the building keeping\n"
        "   its state (§7.7's precedence);",
        "`relet` down where a building keeps households, `vacate` at the last —\n"
        "   never at a locked or pinned building: a dossier population fall lets its last household out by a `relet` down to 0,\n"
        "   the building keeping its state (§7.7's precedence); any other fall never takes it ((4));")

    # ---- §3.7.1 — END of VEW-r2-01 (model; R3-25 (c)) ------------------------------------------------------------------
    sub('END VEW-r2-01 §3.7.1',
        "`t_k` (§4.4 S5a) is raised on those arcs until the lattice distance from every existing footprint to\n"
        "the boundary is at least the strip's width + `growth.ringBlockM` (one block depth) — the built-face legality then never\n"
        "binds on the trace;",
        "`t_k` (§4.4 S5a) is raised on those arcs until the lattice distance from every existing footprint to\n"
        "the boundary is at least the strip's width + `growth.ringBlockM` (one block depth), the supports of a raised way the\n"
        "trace crosses excepted within one strip width of the crossing (§2.7's support step (6) re-sites them, V06 §3.7.6 (5))\n"
        "— the built-face legality then never binds on the trace;")

    # ---- §3.7.6 (5) — END of VEW-r2-01 (R3-25 (c)) -------------------------------------------------------------------
    sub('END VEW-r2-01 §3.7.6 (5) footprint bullet',
        "   * a raised way's **support footprint is a footprint** for V06 §3.7.1's strip rule and is **impassable** in V06 §3.7.4\n"
        "     (2)'s cost field (it is never demolished for a wall);",
        "   * a raised way's **support footprint is a footprint** for V06 §3.7.1's strip rule (but within one strip width of a\n"
        "     crossing, V06 §3.7.1) and is **impassable** in V06 §3.7.4 (2)'s cost field (it is never demolished for a wall);")
    sub('END VEW-r2-01 §3.7.6 (5) crossing bullet',
        "   * a trace crosses a raised way **only under a span over land**, never through a support, and never along its\n"
        "     under-deck strip;",
        "   * a trace crosses a raised way at one **crossing station** on the trace (§2.7's support step (3), (6): the nearest\n"
        "     interior station within half a pitch moved there, keeping its key, else one added; the stations in the new strip's\n"
        "     setback, glacis, berm or channel re-sited), never along its under-deck strip;")
    sub('END VEW-r2-01 §3.7.6 (5) continuity bullet',
        "   * **continuity is a hard rule**, like water access: a trace that cannot cross every raised way it meets under a span\n"
        "     retraces by the margin rule (V06 §3.7.4 (3)) and then **waits** for a later epoch, reported (`walls.waited`) — never\n"
        "     forced (J-V6.58's form);",
        "   * **continuity is a hard rule**, like water access: a trace that cannot cross every raised way it meets so — where\n"
        "     §2.7's support step (6) cannot keep each span within `maxClearSpanM` and each pier within `maxPierM` — retraces by\n"
        "     the margin rule (V06 §3.7.4 (3)) and then **waits** for a later epoch, reported (`walls.waited`) — never forced\n"
        "     (J-V6.58's form);")

    # ---- §3.7.7 (2) — END of VM-R2T-03 (model; R3-25 (d)) -------------------------------------------------------------
    sub('END VM-R2T-03 §3.7.7 (2)',
        "   * both low (a neglected ring while MEANS is `low`): the neglect chances × `walls.condition.bothLowFactor` — the fastest.\n",
        "   * both low (a neglected ring while MEANS is `low`): the neglect chances × `walls.condition.bothLowFactor` — the fastest.\n"
        "   The breaches pass over a stretch under a crossing station while its deck stands (§2.7's support step (3)), as V06\n"
        "   §3.7.6 (5)'s dismantling does — its `worn` or `patched` → `breached` draw not taken, filtered before the draw\n"
        "   (J-V6.7) — so the band carrying the deck never breaches under it; it may still wear, and a repair writes it as any run.\n")

    # ---- §3.7.7 (3) — VAT2-r2-08 -------------------------------------------------------------------------------------
    sub('VAT2-r2-08 §3.7.7 (3)',
        "`EpochRecord.week` of its `conditionEpoch`",
        "`EpochRecord.inputs.week` of its `conditionEpoch`")

    # ---- §3.10 — R3-18 (one name each): the plan's creation week, never the document's ---------------------------------
    sub('R3-18 §3.10.1 dueWeek',
        "(its `dueWeek` the creation week)",
        "(its `dueWeek` the plan's creation week)")
    sub('R3-18 §3.10 due weeks',
        "The due weeks are the creation week + `round(52 × y)`",
        "The due weeks are the plan's creation week + `round(52 × y)`")
