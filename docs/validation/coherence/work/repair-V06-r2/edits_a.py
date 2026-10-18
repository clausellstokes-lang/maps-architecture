"""edits_a — V06 §1.1, §1.2, §1.3, §1b, §2.3, §2.9, §2.10, §2.12, §2.14 (tags: the issue or ruling each edit applies)."""


def apply(sub, after_line):
    # ---- §1.1 ------------------------------------------------------------------------------------------------------
    sub('VV56-r1-01 §1.1 (14)',
        "14. **Budgets** — the targets for an epoch and a century per rung, and the ten-second comfort level that `advance` and the\n"
        "    history replay each keep in total by one estimate that coarsens their cadence (item 119 (a), (a2); V06 §6).",
        "14. **Budgets** — the targets for an epoch and a century per rung, and the ten-second comfort level that `advance`, the\n"
        "    history replay and a dossier catch-up's epochs each keep in total by one estimate that coarsens their cadence\n"
        "    (item 119 (a), (a2); V06 §6).")
    sub('G122-V06 G123-V06 §1.1 (29)-(30)',
        "28. **The grandeur ceiling across a rung change** (item 115 (e)): lifted for new and rebuilt buildings when a village\n"
        "    becomes a town; the grander buildings of a town handed down kept as they stand (V06 §3.8.5).",
        "28. **The grandeur ceiling across a rung change** (item 115 (e)): lifted for new and rebuilt buildings when a village\n"
        "    becomes a town; the grander buildings of a town handed down kept as they stand (V06 §3.8.5).\n"
        "29. **Crisis looks handed over to the epoch path** (item 122 (a)): what a crisis leaves reaches the map only through the\n"
        "    next epoch; the growth frontier as a pure query for the refugee camp (`frontierFor`); a disaster's ruined look\n"
        "    yielding, building by building, to the rebuild's Works (V06 §3.22).\n"
        "30. **The decay level of a building lineage** (item 123 (b)): derived from its existence state and the years since its\n"
        "    decay began, lowered by restoration, the reading item 123's damage layer compares with each element's threshold\n"
        "    (V06 §3.23).")

    # ---- §1.2 ------------------------------------------------------------------------------------------------------
    sub('R2-12 §1.2 AccessPassStrategy',
        "`QuarryWorkings.extend`, `AccessPass.run`, `UndercityEpoch.reread` (V04 §1b.2, V04 §3.10)",
        "`QuarryWorkings.extend`, `AccessPassStrategy.run` (II.7.6's slot), `UndercityEpoch.reread` (V04 §1b.2, V04 §3.10)")
    sub('VV56-r1-01 §1.2 comfort row',
        "the comfort estimate that coarsens an `advance`'s cadence and the replay's epoch length (V06 §6.8) |",
        "the comfort estimate that coarsens an `advance`'s cadence, the replay's epoch length and a dossier catch-up's epochs (V06 §6.8) |")
    after_line('G122-V06 G123-V06 §1.2 hook rows',
               "| §12's targets and its ten-second comfort level for one-time waits",
               "| item 122's base parts — `ConditionOverlay` read for the look, §7.7's DR44, §10.2's crisis look table, §8.2's look rows; "
               "V01's `campLand` | §2.7, §7.7, §10.2, §8.2; V01 | the hand-over: the aftermath through the next epoch, `frontierFor` for the "
               "refugee camp, the disaster look yielding to the rebuild's Works (V06 §3.22) |\n"
               "| item 123's damage layer over the same plan and its keyed thresholds (`plan.damage`); V11's decay rates by material and "
               "default age | §2.6 step 7, §6.3, §6.1; V11 | the decay level each element's threshold is compared with (V06 §3.23) |")

    # ---- §1.3 ------------------------------------------------------------------------------------------------------
    sub('R2-26 (d) §1.3 the strip',
        "the deck buildings and stepped tiers volume 2's, the terraced wards and\n"
        "  the under-deck strip volume 1's, the island clearance volume 5's.",
        "the deck buildings and stepped tiers volume 2's, the terraced wards\n"
        "  volume 1's, the under-deck strip §4.6 S8's (its one margin `raisedWays.structure.stripMarginM`, V11 §3.24.2), the island\n"
        "  clearance volume 5's.")
    sub('G122-V06 G123-V06 §1.3 scope',
        "  time\" (item 101 R2; V06 §4.1; V09's `bend.*` row and V10's bend row carry the line).",
        "  time\" (item 101 R2; V06 §4.1; V09's `bend.*` row and V10's bend row carry the line).\n"
        "* **Crisis looks and the damage layer** (items 122, 123) — the crisis look table, its placement, drawing, switch and\n"
        "  preview, and a ruined plan's damage over the same plan with its keyed thresholds — are the base's (§2.7, §7.7's DR44,\n"
        "  §10.2, §8.2, §11; §2.6 step 7, §6.3) and their volumes'. This volume holds only the hand-over to the epoch path\n"
        "  (V06 §3.22) and the decay level the damage reads (V06 §3.23).")

    # ---- §1b -------------------------------------------------------------------------------------------------------
    sub('VPC-R1-05 VV34-r1-05 R2-12 §1b W46',
        "`DigRule`, `OpeningRow`, `LinkRule` (V04) |", "`DigRule`, `UnderOpeningRow`, `LinkRule` (V04) |")
    sub('VV56-r1-01 §1b W91 title',
        "| W91 | the comfort estimate and the cadence it chooses — `advance` and the history replay each inside the ten-second comfort level in total",
        "| W91 | the comfort estimate and the cadence it chooses — `advance`, the history replay and a dossier catch-up each inside the ten-second comfort level in total")
    sub('VV56-r1-01 §1b W91 producers',
        "| an `advance` request's epochs (V06 §3.3.2's expansion) or the replay plan's (V06 §3.20.1); the rung of each epoch's target;",
        "| an `advance` request's epochs (V06 §3.3.2's expansion), the replay plan's (V06 §3.20.1) or a dossier catch-up's crossed year ends (V08's catch-up rule; §4.11 *The clock* (4)); the rung of each epoch's target;")
    sub('VV56-r1-01 §1b W91 consumers',
        "| the cadence an `advance` group folds at (its epochs' weeks, W4) and the replay's epoch length (W83);",
        "| the cadence an `advance` group folds at (its epochs' weeks, W4), the replay's epoch length (W83) and the coarse step of a catch-up the port folds (V06 §6.8 (6); V08's catch-up rule, V09's `progress.dossier` row);")
    after_line('G122-V06 G123-V06 §1b W92-W94', "| W91 |",
               "| W92 | `frontierFor` — the growth frontier as a query (item 122 (a); V06 §3.22 (2)) | the model the view draws (the head, or a "
               "history frame, V06 §3.15.2); the roster's next ordinals (§10.2); the growth decision's rules and `growth.*` rows (V06 §3.6); "
               "S5a's boundary rule on `T` (§4.4); `overflow.tentBeltM` (V06 §2.2) | §10.2's refugee-camp placement, which ranks V01's "
               "`campLand` faces by their distance to the answer; T-V6-75 | §10.2 (the crisis look table's placement); §4.4 S5a |\n"
               "| W93 | the crisis hand-over — the aftermath through the next epoch and `crisisLookYields` (item 122 (a); V06 §3.22 (1), (3)) | "
               "the dossier's calamities (DR28: `EpochInputs.events`), population (the epoch's target) and conditions (`ConditionOverlay`, "
               "its `sinceWeek`; the `reconstruction` archetype's Works share, V08's archetype row); a building's Works and their weeks "
               "(`Building.works`, §2.6; the lifecycle once a record retires, §4.11 *Works* (9)) | the `hazards`, `siting`, `growth` and "
               "`works` phases (the model's real aftermath); §8.2's disaster look row, V02's ruined exterior and V03's look damage (the "
               "yield); T-V6-75 | §2.7 `ConditionOverlay`; §7.7 DR28, DR44; §4.11 *Works* (10) |\n"
               "| W94 | `decayLevel` and `decayPeak` — the decay level of a building lineage (item 123 (b); V06 §3.23) | the lineage's "
               "lifecycle events (§2.8) at their effective weeks (V06 §2.11); a restoring `repair` Works' progress (§4.11 *Works* (2)); "
               "`Building.material.walls` (§2.6); V11's decay rates by material and default age (item 123) | V03's damage layer — the "
               "plan, its drawing, its exports, the panel lines; V02's exterior; V04's cellars, crypts and underground buildings; §8.6's "
               "drawing and §11.1's battle maps; V09's and V10's lines; a ruined district's look, drawn at the higher of its `lookLevel` "
               "and this level (item 122 (d)); T-V6-76 | §2.6 step 7; §6.3's `plan.damage` thresholds |")
    sub('VV56-r1-02 R2-40 §1b dossier trace population',
        "| the population at a week | `populationHistory[]` / the dossier's population at `calendar.elapsedWeeks` | DR7, DR23 |",
        "| the population at a week | `populationHistory[]` at its ticks, and the dossier's present population at the present week (§4.11 *The clock* (1); item 125 (b)) | DR7, DR23 |")
    sub('VV56-r1-02 R2-40 §1b dossier trace week',
        "| the week | `calendar.elapsedWeeks` | DR21 |",
        "| the week | the dossier's own stamped ticks — each change's dating rung, the present week its latest tick (§4.11 *The clock* (1)–(2); item 125 (a), (b)); never the campaign's calendar | DR21 |")
    sub('G122-V06 §1b dossier trace calamities',
        "`EpochInputs.events` typed by the calamity table → the `hazards` phase (V06 §3.11), the targets struck in place;",
        "`EpochInputs.events` typed by the calamity table → the `hazards` phase (V06 §3.11), the targets struck in place — a crisis's aftermath (V06 §3.22 (1));")
    sub('G122-V06 §1b dossier trace conditions',
        "| the `ConditionOverlay` (the `works` phase, V06 §3.13 (6)); a plague condition's burials",
        "| the `ConditionOverlay` (the `works` phase, V06 §3.13 (6), the `reconstruction` archetype's share among them); a `disaster` condition's `sinceWeek` for the look's hand-over (V06 §3.22 (3)); a plague condition's burials")

    # ---- §2.1 (self-found: `DocView` is declared nowhere in the set; the base's `Document`, §2.9, is the type) -------------
    sub('self-found §2.1 DocView', "doc: DocView /* the epoch's transaction view", "doc: Document /* the epoch's transaction view")

    # ---- §2.3 ------------------------------------------------------------------------------------------------------
    sub('VPC-R1-20 R2-13 §2.3',
        "// on EpochInputs (file f item 343): the epoch's wealth level and an advance-appended epoch's provenance\n"
        "wealthLevel?: number /* the intent wealth level at the epoch: a dossier's wealth.label through tables/dossier/wealth (DR6), or the trajectory's; absent: the level in force (V06 §3.3.5) */;\n"
        "advance?: { group: string; index: number; of: number /* the planned count */;\n"
        "  stoppedAt?: number /* on the group's last epoch only, when Stop ended it early: the count actually folded */; trajectory?: Trajectory /* index 0 only */ }",
        "// EpochInputs.wealthLevel and EpochInputs.advance are §4.11's (file f item 343); this volume writes them (V06 §3.3.5, V06 §3.3.2)")

    # ---- §2.9 ------------------------------------------------------------------------------------------------------
    sub('VM-R1T-06 R2-13 §2.9',
        "### 2.9 `Use.strain` — the use step's memory\n\n"
        "```ts\n"
        "// on §2.7's Use (file f item 429)\n"
        "strain?: { kind: 'demand'|'supply'; sinceWeek: number /* the epoch week the condition began */ }   // written by the use phase only; cleared when the condition ends; model data\n"
        "```",
        "### 2.9 `Use.strain` — the use step's memory\n\n"
        "`Use.strain` is §2.7's (file f item 429): set by the use phase (V06 §3.9.2) and cleared by it or by a user's `setAttr`.")

    # ---- §2.10 -----------------------------------------------------------------------------------------------------
    sub('VM-R1T-09 R2-26 (b) §2.10 raised.waited',
        "or one item 244's support step dropped as `raised_too_tall` (V06 §3.19 (5))",
        "or one item 244's support step dropped as `raised_too_tall` or `raised_too_long` (V06 §3.19 (5))")
    sub('VV56-r1-01 §2.10 advance section',
        "} /* an advance group's epochs (V06 §3.3.2): the cadence chosen reported, coarsened when cadenceWeeks > requestedWeeks */;",
        "} /* an advance group's epochs (V06 §3.3.2), and a coarsened dossier catch-up's (V06 §6.8 (6): index and of among the catch-up's coarse epochs, requestedWeeks the port's 52): the cadence chosen reported, coarsened when cadenceWeeks > requestedWeeks */;")

    # ---- §2.12 -----------------------------------------------------------------------------------------------------
    after_line('VV56-r1-01 G122-V06 G123-V06 §2.12 rows', "| `ReplayPlan` (V06 §2.14) |",
               "| a dossier catch-up's coarse epochs (V06 §6.8 (6)) | the port's catch-up (V08's rule), one epoch per k crossed year ends at "
               "the cadence the estimate chooses | the fold | log (the port's `epoch` events at their weeks) | — | no undo, redo or "
               "revert target (§7.4 *Replay semantics*) | a catch-up folded before the coarsening keeps its epochs as they stand |\n"
               "| `frontierFor`'s answer (V06 §3.22 (2)) | derived at each call over the model the view draws | §10.2's refugee-camp "
               "placement | never (memoized per model digest and count, in memory) | re-derived over the new state | re-derived: an undone "
               "epoch's state answers again | — |\n"
               "| `crisisLookYields` (V06 §3.22 (3)) | derived from a building's Works weeks and the overlay's `sinceWeek` | §8.2's disaster "
               "look row; V02's ruined exterior; V03's look damage | never | — | re-derived: an undone Works yields no more | — |\n"
               "| the decay level and its peak (`decayLevel`, `decayPeak`; V06 §3.23) | derived from the lineage's lifecycle events at their "
               "effective weeks, a restoring Works' progress and V11's rates | W94's readers | never | re-read: a re-derivation keeps the "
               "lifecycle, so the same level; a rebuild's new plan reads 0 | re-read: an undone epoch's events gone, the earlier level | "
               "every building before E2 lands reads the default-age form of its state (V06 §3.23 (4)) |")

    # ---- §2.14 -----------------------------------------------------------------------------------------------------
    sub('VPC-R1-20 R2-13 §2.14',
        "// on EpochInputs (beside `advance`, V06 §2.3): a replay epoch's provenance\n"
        "replay?: { index: number; of: number; fromYearsAgo: number; toYearsAgo: number; events: ReplayEventRef[];\n"
        "  destruction?: ReplayEpoch['destruction']; refound?: ReplayEpoch['refound'] }",
        "// EpochInputs.replay is §4.11's (item 113); ReplayEventRef and ReplayEpoch are declared above")
