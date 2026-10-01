"""edits_b — V06 §3.2, §3.3, §3.5, §3.6, §3.7, §3.13, §3.15, §3.17, §3.18, §3.19, §3.20, §3.21 and the new §3.22–§3.23."""

S322 = """### 3.22 Crisis looks and the epoch path — the hand-over (item 122)

A crisis look (item 122) is drawn by §8.2's look rows through §7.7's DR44 and §10.2's crisis look table while its
`ConditionOverlay` stands in the view's week (§2.7). It is a look only: it never adds, moves or removes anything and
writes no op, event or record, so no epoch reads it. This section is the engine's side of the item, where the look meets
the history (J-V6.137, J-V6.138):

```ts
// @plat/evolve — pure services over the model the view draws; no stream advanced, no op, nothing stored (memoized per model digest)
frontierFor(doc: DocView /* the head, or a history frame (V06 §3.15.2) */, households: number): FaceRef[]
crisisLookYields(doc: DocView, building: Id, overlay: Id /* a ConditionOverlay whose look ruins the building */, week: number): boolean
```

1. **The aftermath is the next epoch's.** What a crisis leaves reaches the model only by the epoch path, in the epoch
   that holds its week: the calamity as an `EpochInputs.events` entry (DR28) that the `hazards` phase runs at its F5
   targets, struck in place (V06 §3.11.1) — the burned quarter and the ruined institutions; the deaths and the exodus
   through the epoch's population target (the departures, V06 §3.5.1), the `deaths` also into the burial need (V06
   §3.18.2 (3)); the newcomers who stay through the target's rise, seated by `siting` and `growth` (V06 §3.8, V06 §3.6);
   a condition's weight on building through the `works` phase (V06 §3.13 (6)). A condition with no calamity and no
   population change leaves nothing, and its look ends with it. A crisis preview (V09's switch) has no condition and no
   aftermath.
2. **The camp at the growth frontier.** `frontierFor(doc, households)` answers where the `growth` phase would seat that
   many more households next, by its own rules over the model the view draws, drawing nothing:
   a. **Who.** The roster's next `households` ordinals above the present population (§10.2's sequential roster, as S2's
      delta demand reads them), taken as the phase's residual (V06 §3.6 (1)): the regrowth-first tiers are not offered
      them — newcomers the standing plan can hold settle inside at the epoch, and the camp's ground stays as it was.
   b. **Whether a stage grows.** V06 §3.6 (2)'s decision on them (no draw), with the backlog `B` and the crowding `C` as
      the model stands: their part above `growth.crowdBands` takes the rich ribbon's land; the rest with `B` take a stage
      when they reach the quantum `q`.
   c. **Where.** A stage takes the land S5a's boundary rule (§4.4) adds beyond the outermost boundary — the level set of
      `T` as it stands, sized to the households at their bands' plot areas — under the regime V06 §3.6 (3) gives an
      unwalled stage of that size. The query runs no wall decision (V06 §3.7.1 draws), so a stage the next epoch walls may
      take its ring's land instead and the camp stands at the unwalled frontier. The answer is the hinterland `LandUse`
      faces (§2.7) that land covers, in address order.
   d. **No frontier.** Below the quantum (the overflow ladder would hold them, V06 §3.6 (2)), on a frame with no reachable
      land left (S5a's cap), at a village rung (V07's growth override, V06 §3.1) and on a standalone neighbourhood document
      (no S5, V06 §1.3), the answer is the ground of the overflow ladder's last rung: the belt of `overflow.tentBeltM`
      outside the outermost boundary along the busiest arterial, by the gate or boundary crossing it leaves through —
      item 122 (b)'s approach road by a gate (at a village rung, the through road's entry). Zero households answer none.

   §10.2's refugee-camp placement reads it, ranking V01's `campLand` faces by their distance to the answer, so the
   newcomers who stay become the next epoch's suburb where the camp stood. The answer follows the committed state: once an
   epoch builds on the camp's ground, the next call answers the next frontier out, and the camp is drawn there while its
   condition stands.
3. **Reconstruction as Works — the look yields.** The `reconstruction` archetype reaches the model as every condition
   does, through the `works` phase's share (V06 §3.13 (6); V08's archetype row), and the rebuilds after a disaster are
   the epochs' own ops — tier (3) on burned plots, a repair, a clearance (V06 §3.8, V06 §3.11.2). The look hands over
   building by building: `crisisLookYields(doc, building, overlay, week)` is true when a Works on the building other
   than a `decay` Works has started by `week` and did not finish before the overlay's `sinceWeek` — read from
   `Building.works` (§2.6) and, once a record retires, from its lifecycle event's weeks (§4.11 *Works* (9)). §8.2's
   disaster look row, V02's ruined exterior and V03's look damage draw a building's ruin only while it is false; from
   then on the building draws its Works' stage and its own state. So no week draws both the ruined look and the rebuild's
   scaffolding, and a building no rebuild reaches keeps the look until its condition ends. A `decay` Works never ends the
   look: a building the aftermath emptied draws the higher of the look's level and its own decay level (item 122 (d);
   V06 §3.23).
4. **Lifecycle and edges.** `frontierFor`'s answer and `crisisLookYields` are derived and never stored (V06 §2.12): a
   reload, a regeneration and an undo re-derive them. Their edges — a look standing when its aftermath epoch folds, a
   condition with no calamity, the aftermath epoch undone on a what-if copy, a replay epoch, a port epoch carrying the
   calamity, a camp over ground an epoch builds on, every rung — are V06 §3.21's rows; T-V6-75 is the bar.

### 3.23 The decay level of a building lineage (item 123)

Item 123's damage layer — one plan, never redrawn, each element shown damaged when the building's decay level reaches
its keyed threshold (§2.6 step 7; §6.3's `plan.damage`; V03, V02 and V04 draw it) — reads its level here. The level is
derived and never stored (J-V6.139):

```ts
// @plat/evolve — pure over the lineage's lifecycle events (§2.8) at their effective weeks (V06 §2.11), its Works and V11's item-123 rows
decayLevel(doc: DocView, lineage: Id, week: number): number   // in [0, 1]
decayPeak(doc: DocView, lineage: Id, week: number): number    // the highest decayLevel since the lineage's plan was built, at or before week
```

1. **The decay run.** A building lineage is in a decay run at week `w` from the effective week `A` (V06 §2.11's
   `EffectiveWeek`: an engine op's is its epoch's week) of the lifecycle event that took it from a standing state into
   `abandoned`, `decayed` or `ruined` — a `vacate`, a fire's `burn` (`decayed`, drawn CHARRED), a flood's or a topple's
   `ruin` (V06 §3.5, V06 §3.11) — until a restoring event (3). Its state `s` at `w` is the existence that the last such
   event at or before `w` set; the strike pool alone moves it (V06 §3.5.2), never the level.
2. **The level in a run.** `decayLevel = min(hi(s), max(lo(s), r × (w − A) ÷ 52))`. Each state owns a third of the
   range — `abandoned` [0, 1/3], `decayed` [1/3, 2/3], `ruined` [2/3, 1] — so item 123 (c)'s look of each state holds
   whatever the years, V11's element-kind ranges read against these thirds. `r` is V11's decay rate per year for the
   building's walls material (`Building.material.walls`, read for time only, as §4.11's `WorksTable` reads it): timber
   and thatch faster than stone. Years only add and the ladder only climbs, so the level never falls while the run lasts
   (item 123 (b)). A run that begins before a restoration has finished starts from the level that restoration left: its
   level is the larger of the formula and that level. Outside a run, a standing building's level is 0.
3. **Restoration** (item 123 (b): `reused`, a repair). A `reoccupy` from vacant or derelict (V06 §3.8.2 (1)–(2)) or a
   hand repair lowers the level, shown by the `repair` Works it starts (§4.11 *Works* (4)–(5)): from that Works' start
   week `S` the level is `L × (1 − f(w))`, `L` the level at the week before `S` and `f` the Works' working-week fraction
   (§4.11 *Works* (2)), 0 at FINISHED; with no Works (an undated hand edit, the parity presets, `works.enabled` false) it
   is 0 from the event's effective week. As the level falls past each threshold that element leaves the damage, so the
   damage leaves in reverse threshold order, the highest first. `decayPeak` keeps the highest level since the plan was
   built: an element whose threshold lies above the present level and at or below the peak is drawn repaired, in patch
   material (item 114's patchwork; V03's drawing), until the plan itself changes — a `rebuild`, a demolition, or a
   successor raised on the trace (§6.3: its own lineage and plan, level and peak 0). `reused` — the trace worked as a
   garden, orchard or field (§2.6) — like `cleared` and a demolition leaves no plan to damage: its level and peak read 0
   from the event's effective week, and its damage leaves with the building.
4. **No decay run in the log.** A building generated `abandoned`, `decayed` or `ruined`, or first met so in item 113's
   replay, reads its state at V11's default age `D`: (2) with `w − A = 52 × D`, its plan the one it had when built, then
   that damage (item 123 (a); V03). Every reader reads every building so until this volume's E2 lands (M6-E): the
   existence state alone at V11's default age. While V11's item-123 rows are not shipped, `r` and `D` read 0 and the level
   is its state's floor, `lo(s)`; a material with no row reads V11's default row.
5. **Reads.** Every reader passes its week — the head's current week, a scrubbed frame's (V06 §3.15.2), an export's drawn
   week, a replay epoch's (a negative week is read as any week) — so scrubbing the history shows one plan aging (item 123
   (a)). The level is a reading, never an input of an epoch rule: no op, draw or digest reads it, so it changes no model,
   replay or hash (the `item123.damage` pin is V03's and V12's).
6. **Lifecycle, edges, bar.** Derived (V06 §2.12): a reload, a regeneration and an undo re-read it, an undone epoch's
   events gone. Its edges are V06 §3.21's row; T-V6-76 is the bar."""


def apply(sub, after_line):
    # ---- §3.2 ------------------------------------------------------------------------------------------------------
    sub('R2-12 §3.2 under.access row',
        "| `afterGrowth` | 20 | `under.access` | `@plat/evolve` (adapter) | V04's `AccessPass.run` over the epoch's scope:",
        "| `afterGrowth` | 20 | `under.access` | `@plat/evolve` (adapter) | V04's U-ACCESS, `AccessPassStrategy.run(doc, rules, ctx, k, scope)` (II.7.6), over the epoch's `EpochScope`:")

    # ---- §3.3 ------------------------------------------------------------------------------------------------------
    sub('VV56-r1-01 §3.3.1',
        "**3.3.1 Dossier-bound.** The port folds epochs by §4.11's cadence (a 52-week boundary, or a population move past the\n"
        "roster tolerance) with the week,",
        "**3.3.1 Dossier-bound.** The port folds epochs by §4.11's cadence (a 52-week boundary, or a population move past the\n"
        "roster tolerance; a catch-up whose epochs at that cadence would pass the comfort level folds coarser, V06 §6.8 (6)) with\n"
        "the week,")

    # ---- §3.5 ------------------------------------------------------------------------------------------------------
    sub('VEL1-04 R2-18 (a) §3.5.1 (5)',
        "5. **Ops.** `relet` down where a building keeps households, `vacate` at the last (§4.11's `LadderOp`/`DeclineOp`); a\n"
        "   dossier-backed use in an emptying building is relocated first (*Dossier content across epochs*). Departures take no\n"
        "   churn cap: the population is the truth, and a fall's households leave at once (item 8 (f)).",
        "5. **Ops** (§4.11's `LadderOp`/`DeclineOp`). `relet` down where a building keeps households, `vacate` at the last —\n"
        "   never at a locked or pinned building, whose last household (4) lets out by a `relet` down to 0, the building keeping\n"
        "   its state (§7.7's precedence); a dossier-backed use in an emptying building is relocated first (*Dossier content\n"
        "   across epochs*). Departures take no churn cap: the population is the truth, and a fall's households leave at once\n"
        "   (item 8 (f)).")
    sub('G123-V06 §3.5.2 pointer',
        "so a ruin beyond any\n  building stands (the owner's \"occasional old decrepit buildings or ruins\").",
        "so a ruin beyond any\n  building stands (the owner's \"occasional old decrepit buildings or ruins\"). Over these states a building's plan shows\n"
        "  its damage at its decay level (V06 §3.23).")

    # ---- §3.6 ------------------------------------------------------------------------------------------------------
    sub('G122-V06 §3.6 (6)',
        "while `C` stays below `growth.crowdShareMax × H`. The rich do not crowd.",
        "while `C` stays below `growth.crowdShareMax × H`. The rich do not crowd.\n"
        "6. **The frontier as a query.** `frontierFor` (V06 §3.22 (2)) answers, drawing nothing, where (1)–(4) would seat a given\n"
        "   residual next — the reading item 122's refugee camp is placed by.")

    # ---- §3.7 ------------------------------------------------------------------------------------------------------
    sub('R2-26 (c) VEW-r1-03 §3.7.6 (5) the wall opening',
        "V06\n"
        "     §3.7.2 (2)'s dismantling never takes the stretch that holds a **raised gate whose deck stands** — the deck's support,\n"
        "     its run left as it stands, drawn by its `condition` — and takes it, by the same draw, from the first epoch after that\n"
        "     raised way is removed or its crossing span `dismantled` — after `wallToWay` as after `absorbWall`, the fortification\n"
        "     loop keeping the record while such a stretch stands; a **wall opening** under an aqueduct is no support (the\n"
        "     aqueduct's span passes over it) and goes with its stretch (J-V6.114).",
        "V06\n"
        "     §3.7.2 (2)'s dismantling never takes the stretch that holds a **raised gate whose deck stands** or a **wall\n"
        "     opening** under a standing aqueduct — the deck's station on the trace, the gate's tower or the curtain under the arch\n"
        "     carrying the deck, its pier the wall's band (§2.7's support step (3)) — its run left as it stands, drawn by its\n"
        "     `condition`, and takes it, by the same draw, from the first epoch after that raised way is removed or its crossing\n"
        "     span `dismantled` — after `wallToWay` as after `absorbWall`, the fortification loop keeping the record while such a\n"
        "     stretch stands (J-V6.114; J-V6.140).")
    sub('VAT1-05 R2-20 R2-27 (e) §3.7.7 (3) oldest patch first by week',
        "oldest patch first (by the run's last-change epoch, ties in chain order),",
        "oldest patch first (by the week of the run's last-change epoch — `EpochRecord.week` of its `conditionEpoch`, generation's\n"
        "     epoch 0 first, a replay epoch's week before every live epoch's, §6.1 — ties in chain order),")
    sub('R2-27 (a) VEW-r1-02 §3.7.7 the welded stretch',
        "   V06 §3.7.5's renewed-threat and ring-in-use repairs are the NEED-`high` rows above: robust with the means, patched\n"
        "   without them.",
        "   V06 §3.7.5's renewed-threat and ring-in-use repairs are the NEED-`high` rows above: robust with the means, patched\n"
        "   without them.\n"
        "   **The welded stretch** (§2.7). Along an `on_enceinte` castle's `Castle.cityWeld` the town enceinte's profiles are the\n"
        "   stretch's one condition, material and epoch, the bailey's mirroring them in the same batch: (2) and (3) decay and\n"
        "   repair that stretch on the town ring's draws, λ and order only, never on the bailey's, whichever enceinte an op names.")

    # ---- §3.13 -----------------------------------------------------------------------------------------------------
    sub('G122-V06 §3.13 (6) reconstruction',
        "   (the base's staged rule, read as it states).",
        "   (the base's staged rule, read as it states) — the `reconstruction` archetype's repair share among them (V08's archetype\n"
        "   row), whose Works end a disaster's look on each building they start on (V06 §3.22 (3)).")

    # ---- §3.15 -----------------------------------------------------------------------------------------------------
    sub('VV56-r1-03 §3.15 the upgrade request',
        "(`HostContext`'s upgrade request, V08)",
        "(the host's upgrade request: the owner's **Update the map engine**, V08 §4.2, an `upgrade` event over\n  the bridge)")

    # ---- §3.17 -----------------------------------------------------------------------------------------------------
    sub('VM-R1T-09 R2-26 (b) §3.17 item 9',
        "item 244's support step drops (`raised_too_tall`,\n   V06 §3.19 (5))",
        "item 244's support step drops (`raised_too_tall` or\n   `raised_too_long`, V06 §3.19 (5))")

    # ---- §3.18 -----------------------------------------------------------------------------------------------------
    sub('VPC-R1-05 R2-12 §3.18 head',
        "`AccessPass`, `CatacombGrowth`, `UndergroundFade`, the `DigRule`, `OpeningRow`, `LinkRule`, `RuinRule` and",
        "`AccessPassStrategy` (II.7.6), `CatacombGrowth`, `UndergroundFade`, the `DigRule`, `UnderOpeningRow`, `LinkRule`, `RuinRule` and")
    sub('R2-12 §3.18.1 (2) the access pass',
        "(`under.access`, order 20; V04's `AccessPass.run` over the epoch's scope)",
        "(`under.access`, order 20; V04's `AccessPassStrategy.run(doc, rules, ctx, k, scope)`, II.7.6, over the epoch's\n   `EpochScope`)")
    sub('VPC-R1-05 R2-12 §3.18.1 (2d)',
        "V04's `OpeningRow` draws", "V04's `UnderOpeningRow` draws")

    # ---- §3.19 -----------------------------------------------------------------------------------------------------
    sub('VM-R1T-09 R2-26 (b) §3.19 (5)',
        "and a course one of whose piers stands higher\n"
        "   than `maxPierM` for its kind is dropped (`raised_too_tall`, volume 11) and the candidate **waits** (`raised.waited`; its\n"
        "   `u` unchanged).",
        "and a course one of whose piers stands higher\n"
        "   than `maxPierM` for its kind (`raised_too_tall`) or whose merged clear span exceeds `maxClearSpanM` for its material\n"
        "   (`raised_too_long`, §2.7's support step; both cells V11 §3.24.2's) is dropped and the candidate **waits**\n"
        "   (`raised.waited`; its `u` unchanged).")
    sub('R2-26 (d) §3.19 (7) the strip',
        "(the deck's width plus V01 §3.14's `raised.stripMarginM` each side)",
        "(the deck's width plus `raisedWays.structure.stripMarginM` each side, V11 §3.24.2 — §4.6 S8's one strip)")
    sub('R2-26 (d) §3.19 rows read',
        "The strip margin is V01 §3.14's `raised.stripMarginM` (V01 §3.17.3 (2)'s under-deck\nstrip).",
        "The strip margin is `raisedWays.structure.stripMarginM` (V11 §3.24.2), the one margin of §4.6\nS8's under-deck strip, which V01 §3.17.3 (2) reads too.")

    # ---- §3.20 -----------------------------------------------------------------------------------------------------
    sub('VV56-r1-02 R2-40 (1) §3.20.3 W_p',
        "`W_p` the present — the creation week the base gives (`HostContext.week` or 0) —",
        "`W_p` the present — the document's creation week (§4.11 *The clock* (1)) —")

    # ---- §3.21 -----------------------------------------------------------------------------------------------------
    sub('VEL1-04 §3.21 (a) decline',
        "| decline (V06 §3.5) | no candidate; one leaving household; the cap spent; a building whose `decay` Works was retired; every rung;",
        "| decline (V06 §3.5) | no candidate; one leaving household; the cap spent; a building whose `decay` Works was retired; a leaving household that is a locked or pinned dwelling's last; every rung;")
    sub('VEL1-04 §3.21 (a) decline outcome',
        "its span read from its lifecycle block; the village rows at a village rung; the epoch's undo; the keys re-derived identically | check |",
        "its span read from its lifecycle block; a `relet` down to 0, never a `vacate`, the building keeping its state (V06 §3.5.1 (5)); the village rows at a village rung; the epoch's undo; the keys re-derived identically | check |")
    after_line('VV56-r1-01 §3.21 (a) catch-up', "| epoch inputs (V06 §3.3) |",
               "| dossier-bound epochs (V06 §3.3.1, V06 §6.8 (6)) | a dossier catch-up of many years | the coarsened catch-up of V06 §6.8 (6): "
               "one epoch per k crossed year ends, every dossier event at its own week, a calamity at its week inside the coarse epoch "
               "that holds it, the last epoch at the dossier's week; one epoch over the span the floor | simpler shape (coarser epochs) | "
               "T-V6-24 |")
    after_line('G122-V06 G123-V06 §3.21 (a) rows', "| the replay (V06 §3.20) |",
               "| the growth frontier (V06 §3.22 (2)) | zero households; a count below the quantum; a frame with no reachable land left; a "
               "next stage the wall decision would wall; a village rung; a standalone neighbourhood document; a scrubbed frame; the "
               "camp's ground built on by an epoch | none; the overflow belt along the busiest arterial by its gate; that belt; the "
               "unwalled frontier (the query draws nothing); the belt by the through road's entry; that belt; the frontier of the "
               "frame's model; the next frontier out | substitute (the belt) | T-V6-75 |\n"
               "| the crisis hand-over (V06 §3.22 (1), (3)) | a condition with no calamity; a calamity with no condition; a building the "
               "look ruins with no Works since its condition began; one whose rebuild Works starts; one under a `decay` Works; one "
               "already under Works when the condition began; an overlay with no `untilWeek` | nothing left, the look ending with it; "
               "the real change, no look; the look until its condition ends; the Works' stage from its start, never both; the look "
               "kept, the higher level drawn; the Works' stage, no look; the look while the overlay stands | — | T-V6-75 |\n"
               "| the decay level (V06 §3.23) | a standing building; a building at level 1; a building generated ruined or first met so "
               "in the replay; no V11 row for its material, or none shipped; a rate of 0; a fire's CHARRED; a restoration from level "
               "1; a restoration with no Works; a decay run beginning during a repair; a rebuild or a successor on the trace; a scrub "
               "across a restoration; an epoch undone; negative weeks | 0; every element damaged; V11's default age; V11's default "
               "row, else the state's floor; the state's floor at every week; the decayed third from the fire's week; down to 0 over "
               "the repair Works, the elements leaving from the highest threshold, each then patched; 0 at the event's week; the larger "
               "of the run's level and what the repair left; a new plan, level and peak 0; the level and peak at the frame's week; the "
               "earlier history's level; read as any week | substitute (the floor) | T-V6-76 |")
    sub('VEL1-04 §3.21 (b) the history × locks',
        "the replay runs before any lock exists; a `rerunFrom` keeps the locks of its prefix | T-V6-4; T-V6-22 |",
        "the replay runs before any lock exists; a `rerunFrom` keeps the locks of its prefix; a fall whose leaving household is a locked or pinned dwelling's last lets it out by a `relet` down to 0, the building keeping its state (V06 §3.5.1 (5)) | T-V6-4; T-V6-22; T-V6-70 (f) |")
    after_line('VAT1-05 G122-V06 G123-V06 §3.21 (b) rows', "| the history × save and load |",
               "| item 114's recovery × the history replay | runs patched in replay epochs and in live epochs: the rebuild takes them oldest "
               "first by the week of each run's last change (`EpochRecord.week`, §6.1), every replay epoch's week before every live "
               "one's (V06 §3.7.7 (3)) | T-V6-73 |\n"
               "| crisis looks × the history | a look writes nothing and its aftermath arrives at the next epoch (V06 §3.22 (1)); a look "
               "standing when its aftermath epoch folds draws over the real change at the higher of the two levels; a camp whose ground "
               "an epoch builds on is drawn at the next frontier out; a disaster look yields per building to the first Works of its "
               "rebuild; a replay epoch carries no condition (the history's calamities reach it as events, V06 §3.20.2); a port epoch "
               "carrying the calamity is no undo target (§7.4 *Replay semantics*); the aftermath epoch undone on a what-if copy leaves "
               "the look over the restored buildings; a crisis preview has no aftermath | T-V6-75 |\n"
               "| ruined plans × the history | one plan through decay, restoration and decay again, its damage at the decay level and "
               "its repaired elements patched until a rebuild (V06 §3.23); a successor on the trace a new plan; the replay's ruins at "
               "their replayed years; a building generated ruined at V11's default age | T-V6-76 |")
    after_line('G122-V06 G123-V06 new §3.22 §3.23', "| the history × export |", "\n" + S322)
