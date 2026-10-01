"""edits_a — V06 §1.1, §1b, §2 (tags: the issue, ruling or END line each edit applies)."""


def apply(sub):
    # ---- §1.1 (14) — VV56-r2-04: a catch-up whose dossier events alone pass its budget ----------------------------
    sub('VV56-r2-04 §1.1 (14)',
        "14. **Budgets** — the targets for an epoch and a century per rung, and the ten-second comfort level that `advance`, the\n"
        "    history replay and a dossier catch-up's epochs each keep in total by one estimate that coarsens their cadence\n"
        "    (item 119 (a), (a2); V06 §6).",
        "14. **Budgets** — the targets for an epoch and a century per rung, and the ten-second comfort level that `advance`, the\n"
        "    history replay and a dossier catch-up's epochs each keep in total by one estimate that coarsens their cadence\n"
        "    (item 119 (a), (a2); V06 §6), a catch-up whose dossier events alone pass its budget completing past it, reported\n"
        "    (V06 §6.8 (6)).")

    # ---- §1b W91 — VV56-r2-04: the estimate's events term and the open's own path --------------------------------
    sub('VV56-r2-04 W91 head',
        "| W91 | the comfort estimate and the cadence it chooses — `advance`, the history replay and a dossier catch-up each "
        "inside the ten-second comfort level in total (item 119 (a2); V06 §3.3.2, V06 §3.20.4, V06 §6.8) |",
        "| W91 | the comfort estimate and the cadence it chooses — `advance`, the history replay and a dossier catch-up each "
        "inside the ten-second comfort level in total, a catch-up whose dossier events alone pass its budget completing past "
        "it, reported (item 119 (a2); V06 §3.3.2, V06 §3.20.4, V06 §6.8) |")
    sub('VV56-r2-04 W91 inputs',
        "the rises in the targets; `epoch.costMs`, `epoch.islandMs`, `epoch.handAccessMs`, `epoch.stageMs`, "
        "`epoch.stageMsPerBuilding`, `advance.budgetMs`, `replay.budgetMs` (V06 §2.2) |",
        "the rises in the targets; a catch-up's dossier events at V08 §6's per-event absorb bound by the document's rung, and "
        "inside an open from SettlementForge the open's own path (V08 §6's cached frame boot; §12.5's T(B)); "
        "`epoch.costMs`, `epoch.islandMs`, `epoch.handAccessMs`, `epoch.stageMs`, `epoch.stageMsPerBuilding`, "
        "`advance.budgetMs`, `replay.budgetMs` (V06 §2.2) |")
    sub('VV56-r2-04 W91 outputs',
        "V09's progress view, counting the epochs at that cadence; T-V6-23, T-V6-24, T-V6-71 |",
        "V09's progress view, counting the epochs at that cadence; a catch-up's F-BUDGET-TIME report past the comfort "
        "level (§12.1); T-V6-23, T-V6-24, T-V6-71 |")

    # ---- §1b W94 — VV56-r2-05 (R3-06 (a)): the Works' start weeks; VV56-r2-06 (R3-08 (b)): each element's entry week
    sub('VV56-r2-05 VV56-r2-06 W94 inputs',
        "| the lineage's lifecycle events (§2.8) at their effective weeks (V06 §2.11); a restoring `repair` Works' progress "
        "(§4.11 *Works* (2));",
        "| the lineage's lifecycle events (§2.8) at the weeks their changes show — the start weeks of the Works they started "
        "(`Building.works`, §2.6; the lifecycle once a record retires, §4.11 *Works* (9)), else their effective weeks "
        "(V06 §2.11); each element's entry week into the plan (V03 §5.6's `since`); a restoring `repair` Works' progress "
        "(§4.11 *Works* (2));")

    # ---- §1b dossier trace — R3-09's source word in the conditions row; VDC2-14 (R3-22 (b)) the latitude row ----------
    sub('R3-09 trace conditions row',
        "a `disaster` condition's `sinceWeek` for the look's hand-over (V06 §3.22 (3));",
        "the `sinceWeek` of a condition drawing the `disaster` look — a calamity's linked condition (V08 §3.16 (7) (b), "
        "(d)) — for the look's hand-over (V06 §3.22 (3));")
    sub('VDC2-14 trace latitude row',
        "| the realm latitude | the realm block's latitude | DR29 |",
        "| the site latitude | `site.culture` through `tables/dossier/cultures`, else 50° N — `Intent.latitudeDeg`, a map "
        "fact the user may edit (item 125 (b)) | DR29 |")

    # ---- §2 lead — VAT2-r2-04 (R3-18) ----------------------------------------------------------------------------
    sub('VAT2-r2-04 §2 lead',
        "Units follow §2.1: weeks are signed integers (§4.11 *The clock*; a replayed past lies before the creation week, V06\n"
        "§3.20.3),",
        "Units follow §2.1: weeks are signed integers (§4.11 *The clock*; a replayed past lies between the creation week and\n"
        "the present, V06 §3.20.3),")

    # ---- §2.10 — VEL2-r2-01 text 4 (R3-19): EpochReport.households.heldByLock -----------------------------------------
    sub('VEL2-r2-01 §2.10 heldByLock',
        "    backlog: number /* housed by the overflow ladder at the epoch's end */; inTransit: 0 /* always 0 at the close; asserted */ };",
        "    heldByLock: number /* leaving households a lock or pin kept, or a protected dwelling's last household kept, under a fall with no dossier population, that no other household could replace — the fall's shortfall (V06 §3.5.1 (1), (4)) */;\n"
        "    backlog: number /* housed by the overflow ladder at the epoch's end */; inTransit: 0 /* always 0 at the close; asserted */ };")

    # ---- §2.12 — VV56-r2-05, VV56-r2-06: the decay level's inputs ------------------------------------------------
    sub('VV56-r2-05 VV56-r2-06 §2.12 decay row',
        "| the decay level and its peak (`decayLevel`, `decayPeak`; V06 §3.23) | derived from the lineage's lifecycle events "
        "at their effective weeks, a restoring Works' progress and V11's rates |",
        "| the decay level and its peak (`decayLevel`, `decayPeak`; V06 §3.23) | derived from the lineage's lifecycle events "
        "at the weeks their changes show (V06 §3.23 (1)), each element's entry week, a restoring Works' progress and V11's "
        "rates |")
