"""edits_c — V06 §3.20, §3.21, §3.22, §3.23, §4.3 (tags: the issue, ruling or END line each edit applies)."""
import os

LIVE = '/home/user/maps-architecture/docs/volumes/V06-evolution.md'


def live_section(head, next_head):
    t = open(LIVE, encoding='utf-8').read()
    i = t.index(head + '\n')
    j = t.index('\n' + next_head + '\n', i)
    return t[i:j].rstrip('\n')


NEW_323 = r"""### 3.23 The decay level of a building lineage (item 123)

Item 123's damage layer — one plan, never redrawn, each element shown damaged while the building's decay level is above
0 and at least its keyed threshold (§6.3 *Plan damage*'s comparison; §2.6 step 7; V03, V02 and V04 draw it) — reads its
level here. The level is derived and never stored (J-V6.139):

```ts
// @plat/evolve — pure over the lineage's lifecycle events (§2.8) at the weeks their changes show ((1)), its Works and V11's item-123 rows
decayLevel(doc: Document, lineage: Id, week: number): number   // in [0, 1]
decayPeak(doc: Document, lineage: Id, week: number, since: number /* the element's entry week into the plan, V03 §5.6 */): number   // the highest decayLevel over [since, week] ((3))
```

1. **The decay run.** A building lineage is in a decay run at week `w` from the week `A` at which the lifecycle event
   that took it from a standing state into `abandoned`, `decayed` or `ruined` shows — a `vacate`, a fire's `burn`
   (`decayed`, drawn CHARRED), a flood's or a topple's `ruin` (V06 §3.5, V06 §3.11) — until a restoring event (3). The week
   a change shows is the start week of the Works the event started (V06 §3.13 (2): a hazard's change at the hazard's week,
   a `vacate`'s `decay` Works at its drawn offset in the epoch's span), read from `Building.works` (§2.6) and, once the
   record retires, from its lifecycle event's weeks (§4.11 *Works* (9)); else the event's effective week (V06 §2.11's
   `EffectiveWeek`: an engine op's is its epoch's week). So the plan's damage and the exterior's stage agree at every
   week, inside a yearly epoch and a coarse one alike (T123-5). Its state `s` at `w` is the existence the last such event
   dated so at or before `w` set — the strike pool's and the hazards' ops move it (V06 §3.5.2, V06 §3.11), the level never
   does.
2. **The level in a run.** `decayLevel = min(hi(s), max(lo(s), r × (w − A) ÷ 52))`. Each state owns a third of the
   range — `abandoned` [0, 1/3], `decayed` [1/3, 2/3], `ruined` [2/3, 1] — so item 123 (c)'s look of each state holds
   whatever the years, V11's range for each element kind lying inside the shares of the states whose looks item 123 (c)
   gives it (V11 §3.25.10's `states`; the upper floor's across `decayed` and `ruined`). `r` is V11's decay rate per year
   for the building's walls material (`Building.material.walls`, read for time only, as §4.11's `WorksTable` reads it):
   timber and thatch faster than stone. Years only add and the ladder only climbs, so the level never falls while the run
   lasts (item 123 (b)). A run that begins before a restoration has finished starts from the level that restoration left:
   its level is the larger of the formula and that level. Outside a run, a standing building's level is 0.
3. **Restoration** (item 123 (b)'s "reused" — the building put back to use, a `reoccupy` from vacant or derelict, V06
   §3.8.2 — and a repair; J-V6.141). A `reoccupy` from vacant or derelict (V06 §3.8.2 (1)–(2)) or a hand repair lowers the
   level, shown by the `repair` Works it starts (§4.11 *Works* (4)–(5)): from that Works' start week `S` the level is
   `L × (1 − f(w))`, `L` the level at the week before `S` and `f` the Works' working-week fraction (§4.11 *Works* (2)), 0
   at FINISHED; with no Works (an undated hand edit, the parity presets, `works.enabled` false) it is 0 from the event's
   effective week. As the level falls past each threshold that element leaves the damage, so the damage leaves in reverse
   threshold order, the highest first. `decayPeak` is read per element: the highest level since the element entered the
   plan — the as-built plan's elements at the lineage's build, the elements a re-cut makes (V03 §3.11, a restoring
   event's included) or a wing an `extend` adds at that change's effective week — so an element added after its
   building's damage left is never drawn repaired, and an element a re-cut keeps keeps its peak. An element whose
   threshold lies above the present level and at or below its peak is drawn repaired, in patch material (item 114's
   patchwork; V03's drawing), until the plan itself changes — a `rebuild`, a demolition, or a successor raised on the
   trace (§6.3: its own lineage and plan, level and peak 0). §2.8's `reused` state — the cleared trace worked as a
   garden, orchard or field — like `cleared` and a demolition holds no plan: its level and peak read 0 from the event's
   effective week, its damage leaving with the building.
4. **A building first met decayed, and the replay's ruins.** A building generated `abandoned`, `decayed` or `ruined` —
   its log holding no event that took it there from a standing state — reads its state as a decay run begun `D` years
   (V11's default age) before the week it is first met so: `A` = that week − 52 × `D`, for a building generated so the
   creation week (the week of the document's `generate` event, §4.11 *The clock* (1)) — so it reads `D` years when first
   met and ages by (2) from then on as any run (item 123 (b): damage only accumulates as decay goes on); its plan is the
   one it had when built, then that damage (item 123 (a); V03 §3.11 (c)). A building item 113's replay abandons or ruins
   (its decline, its hazards, V06 §3.20.5's destruction epoch) has its decay run in the creation prefix from the week (1)
   gives its change in that replay epoch — the epoch's week where the epoch runs at model level and starts no Works (V06
   §3.20.4) — so the present and every scrubbed week show its replayed years (item 123 (a); (5)), over the plan V03 §3.11
   gives it (the replay derives none). Until this volume's E2 lands (M6-E) every reader reads every building by its
   existence state alone at V11's default age. While V11's item-123 rows are not shipped, `r` and `D` read 0 and the level
   is its state's floor, `lo(s)`; a material with no row reads V11's default row.
5. **Reads.** Every reader passes its week — the head's current week, a scrubbed frame's (V06 §3.15.2), an export's drawn
   week, a replay epoch's (a negative week is read as any week) — so scrubbing the history shows one plan aging (item 123
   (a)). The level is a reading, never an input of an epoch rule: no op, draw or digest reads it, so it changes no model,
   replay or hash (the `item123.damage` pin is V03's and V12's).
6. **Lifecycle, edges, bar.** Derived (V06 §2.12): a reload, a regeneration and an undo re-read it, an undone epoch's
   events gone. Its edges are V06 §3.21's row; T-V6-76 is the bar."""


def apply(sub):
    # ---- §3.20.3 — VAT2-r2-04 (R3-18): the present at creation and the creation week -------------------------------------
    sub('VAT2-r2-04 §3.20.3 week',
        "* `week` = `W_p − round(52 × toYearsAgo)`, `W_p` the present — the document's creation week (§4.11 *The clock* (1)) —\n"
        "  so the replayed past lies before it in signed weeks and the last replay epoch's week is `W_p`; the `generate` event\n"
        "  stands at `W_p − round(52 × start.yearsAgo)`;",
        "* `week` = `W_p − round(52 × toYearsAgo)`, `W_p` the present at creation (§4.11 *The clock* (1): the dossier's present\n"
        "  week, a standalone document's week 0) — so the replayed past lies before it in signed weeks and the last replay\n"
        "  epoch's week is `W_p`; the `generate` event stands at `W_p − round(52 × start.yearsAgo)` — the document's creation\n"
        "  week (`HistoryIndex.creationWeek`, V06 §2.11), which the first replay epoch's `prevWeek` and `years` read (V06 §3.1\n"
        "  (3));")

    # ---- §3.20.4 Cancel — END of VEL2-r2-03 (V09) -----------------------------------------------------------------------
    sub('END VEL2-r2-03 §3.20.4 Cancel',
        "* **Cancel** — cancelling a history-first generation leaves no document; its dialog offers \"Generate without its history\"\n"
        "  (the one-click path with `history.replay` false, the parity presets' setting).",
        "* **Cancel** — cancelling a standalone history-first generation leaves no document; its dialog offers \"Generate without\n"
        "  its history\" (the one-click path with `history.replay` false, the parity presets' setting). A host creation offers no\n"
        "  cancel; its replay is coarsened to fit the comfort level (V06 §6.8; V09 §4.21.9).")

    # ---- §3.21 (a) rows -------------------------------------------------------------------------------------------------
    sub('VV56-r2-04 §3.21 dossier-bound row',
        "| dossier-bound epochs (V06 §3.3.1, V06 §6.8 (6)) | a dossier catch-up of many years | the coarsened catch-up of V06 "
        "§6.8 (6): one epoch per k crossed year ends, every dossier event at its own week, a calamity at its week inside the "
        "coarse epoch that holds it, the last epoch at the dossier's week; one epoch over the span the floor | simpler shape "
        "(coarser epochs) | T-V6-24 |",
        "| dossier-bound epochs (V06 §3.3.1, V06 §6.8 (6)) | a dossier catch-up of many years; one whose dossier events alone "
        "pass the catch-up's budget (V06 §6.8 (6)), on an open map or inside an open from SettlementForge | the coarsened "
        "catch-up of V06 §6.8 (6): one epoch per k crossed year ends, every dossier event at its own week, a calamity at its "
        "week inside the coarse epoch that holds it, the last epoch at the dossier's week; one epoch over the span the floor; "
        "one epoch over the span, every dossier event still at its own week, the wait completing past the comfort level and "
        "reported F-BUDGET-TIME, never coarser or shortened (§12.1) | simpler shape (coarser epochs); report | T-V6-24 |")
    sub('VEL2-r2-01 text 5 §3.21 decline row',
        "a building whose `decay` Works was retired; a leaving household that is a locked or pinned dwelling's last; every "
        "rung; an undone decline epoch; a save and load between epochs | nothing struck, the cap unused; one `relet`; the rest "
        "wait in key order; its span read from its lifecycle block; a `relet` down to 0, never a `vacate`, the building keeping "
        "its state (V06 §3.5.1 (5));",
        "a building whose `decay` Works was retired; a leaving household that is locked or pinned, or a locked or pinned "
        "dwelling's last; every rung; an undone decline epoch; a save and load between epochs | nothing struck, the cap "
        "unused; one `relet`; the rest wait in key order; its span read from its lifecycle block; passed over for the next "
        "unlocked household; under a dossier fall taken last and reported orphaned, a protected dwelling's last household let "
        "out by a `relet` to 0, never a `vacate`, the building keeping its state (T20-15, T20-16); under any other fall held, "
        "counted `households.heldByLock`, the dwelling kept at one household or more (V06 §3.5.1 (1), (4), (5));")
    sub('VV56-r2-10 VV78-r2-07 END VEW-r2-03 §3.21 frontier row',
        "| the growth frontier (V06 §3.22 (2)) | zero households; a count below the quantum; a frame with no reachable land "
        "left; a next stage the wall decision would wall; a village rung; a standalone neighbourhood document; a scrubbed "
        "frame; the camp's ground built on by an epoch | none; the overflow belt along the busiest arterial by its gate; that "
        "belt; the unwalled frontier (the query draws nothing); the belt by the through road's entry; that belt; the frontier "
        "of the frame's model; the next frontier out |",
        "| the growth frontier (V06 §3.22 (2)) | zero households; a count below the quantum; one below the quantum with a rich "
        "part; a frame with no reachable land left; a next stage the wall decision would wall; a camp with a rich part and a "
        "stage; a stage S5a seats only in part; a village rung; a standalone neighbourhood document; no arterial leaving the "
        "settlement (S3 (9) (a)'s unserved mesa); a scrubbed frame; the camp's ground built on by an epoch | none; the "
        "overflow belt along the busiest arterial by its gate; that belt and the rich ribbon's plots; that belt; the unwalled "
        "frontier (the query draws nothing); the stage's land and the rich ribbon's plots along its arterial; the stage's land "
        "and the belt for the households it cannot seat; the belt by the entry of V07 §5.6 (2)'s main approach road; the belt "
        "by the busiest arterial's gate or boundary crossing; the belt's faces nearest the boundary point closest to the "
        "growth centre; the frontier of the frame's model; the next frontier out |")
    sub('VAT2-r2-09 (R3-10) §3.21 hand-over row',
        "one already under Works when the condition began; an overlay with no `untilWeek` | nothing left, the look ending "
        "with it; the real change, no look; the look until its condition ends; the Works' stage from its start, never both; "
        "the look kept, the higher level drawn; the Works' stage, no look; the look while the overlay stands |",
        "one already under Works when the condition began; an overlay with no `untilWeek`; a preview over a building under a "
        "rebuild Works | nothing left, the look ending with it; the real change, no look; the look until its condition ends; "
        "the Works' stage from its start, never both; the look kept, the higher level drawn; the Works' stage, no look; the "
        "look while the overlay stands; the look drawn (a preview never hands over) |")
    sub('VAT2-r2-05 VAT2-r2-06 VV56-r2-05 VV56-r2-06 §3.21 decay row',
        "| the decay level (V06 §3.23) | a standing building; a building at level 1; a building generated ruined or first met "
        "so in the replay; no V11 row for its material, or none shipped; a rate of 0; a fire's CHARRED; a restoration from "
        "level 1; a restoration with no Works; a `reused` trace at level 1; a decay run beginning during a repair; a rebuild "
        "or a successor on the trace; a scrub across a restoration; an epoch undone; negative weeks | 0; every element "
        "damaged; V11's default age; V11's default row, else the state's floor; the state's floor at every week; the decayed "
        "third from the fire's week; down to 0 over the repair Works, the elements leaving from the highest threshold, each "
        "then patched; 0 at the event's week; level and peak 0 from its week, no plan drawn;",
        "| the decay level (V06 §3.23) | a standing building; a building at level 1; a building generated ruined; one the "
        "replay ruined; no V11 row for its material, or none shipped; a rate of 0; a fire's CHARRED; a `vacate` inside a "
        "yearly or a coarse catch-up epoch; a restoration from level 1; a restoration with no Works; a restored building "
        "re-cut or extended; a `reused` trace at level 1; a decay run beginning during a repair; a rebuild or a successor on "
        "the trace; a scrub across a restoration; an epoch undone; negative weeks | 0; every element damaged; V11's default "
        "age `D` at the week it is first met so, aging from then (read after 50 years of epochs, `D` + 50 years, "
        "non-decreasing); its replayed years, from the replay epoch that ruined it; V11's default row, else the state's floor; "
        "the state's floor at every week; the decayed third from the fire's week; the level from its `decay` Works' start "
        "week, the plan's damage and the exterior's stage agreeing at every week; down to 0 over the repair Works, the elements "
        "leaving from the highest threshold, each then patched; 0 at the event's week; the added elements drawn as built, the "
        "kept ones patched; level and peak 0 from its week, no plan drawn;")
    sub('END VEL2-r2-03 §3.21 replay row',
        "an event before the start; an unknown event type; cancel | the one-click path; no replay, reported; no peak; the "
        "cap; one epoch; coarsened, reported; not replayed; row `none`, reported; no document, the offer to generate without "
        "history |",
        "an event before the start; an unknown event type; cancel; a host creation | the one-click path; no replay, reported; "
        "no peak; the cap; one epoch; coarsened, reported; not replayed; row `none`, reported; no document (standalone), the "
        "offer to generate without history; no cancel offered, the replay coarsened to fit (V06 §3.20.4) |")

    # ---- §3.21 (b) rows -------------------------------------------------------------------------------------------------
    sub('VEL2-r2-01 text 5 §3.21 history × locks row',
        "a `rerunFrom` keeps the locks of its prefix; a fall whose leaving household is a locked or pinned dwelling's last "
        "lets it out by a `relet` down to 0, the building keeping its state (V06 §3.5.1 (5)) |",
        "a `rerunFrom` keeps the locks of its prefix; a fall whose leaving households hold a locked or pinned household or a "
        "locked or pinned dwelling's last: passed over for the next unlocked household; under a dossier fall taken last and "
        "reported orphaned, a protected dwelling's last household let out by a `relet` to 0, the building keeping its state "
        "(T20-15, T20-16); under any other fall held, counted `households.heldByLock`, the dwelling kept at one household or "
        "more (V06 §3.5.1 (1), (4), (5)) |")
    sub('VAT2-r2-08 §3.21 recovery × replay row',
        "(`EpochRecord.week`, §6.1)",
        "(`EpochRecord.inputs.week`, §6.1)")
    sub('VAT2-r2-05 VAT2-r2-06 VV56-r2-06 §3.21 ruined plans row',
        "a successor on the trace a new plan; the replay's ruins at their replayed years; a building generated ruined at "
        "V11's default age |",
        "a successor on the trace a new plan; the replay's ruins at their replayed years, a scrub across the replayed past "
        "showing each plan aging; a building generated ruined at V11's default age at creation, aging from then; the elements "
        "a restoration's re-cut or an `extend` adds drawn as built |")

    # ---- §3.22 — VAT2-r2-09 (R3-10), VV56-r2-10 (R3-14 (7)), VV78-r2-07 (R3-14 (5)), END of VEW-r2-03 (R3-14 (6)) --------
    sub('VAT2-r2-09 §3.22 signature',
        "crisisLookYields(doc: Document, building: Id, overlay: Id /* a ConditionOverlay whose look ruins the building */, week: number): boolean",
        "crisisLookYields(doc: Document, building: Id, overlay: Id | null /* the ConditionOverlay whose look ruins the building; null: a preview */, week: number): boolean")
    sub('VV56-r2-10 §3.22 (2) c.',
        "The answer is the hinterland `LandUse`\n"
        "      faces (§2.7) that land covers, in address order.",
        "The answer is the hinterland `LandUse`\n"
        "      faces (§2.7) that the stage's land and, where (b) gives a rich part, the rich ribbon's plots along its arterial\n"
        "      cover, in address order; a stage S5a seats only in part adds (d)'s belt for the households it cannot seat.")
    sub('VV78-r2-07 END VEW-r2-03 VV56-r2-10 §3.22 (2) d.',
        "      item 122 (b)'s approach road by a gate (at a village rung, the through road's entry). Zero households answer none.",
        "      item 122 (b)'s approach road by a gate (at a village rung, the entry of V07 §5.6 (2)'s main approach road); with no\n"
        "      arterial leaving the settlement (S3 (9) (a)'s unserved mesa), the belt's faces nearest the boundary point closest\n"
        "      to the growth centre (S3's root reservation, §4.2). Below the quantum with a rich part ((b)), the answer adds the\n"
        "      rich ribbon's plots of (c). Zero households answer none.")
    sub('VAT2-r2-09 §3.22 (3) preview',
        "So no week draws both the ruined look and the rebuild's\n"
        "   scaffolding, and a building no rebuild reaches keeps the look until its condition ends. A `decay` Works never ends the\n"
        "   look:",
        "So no week draws both the ruined look and the rebuild's\n"
        "   scaffolding, and a building no rebuild reaches keeps the look until its condition ends. A preview (`overlay` null)\n"
        "   never hands over: `crisisLookYields` is false for it, so a previewed ruin draws over every building of its units\n"
        "   whatever their Works, and ends with the preview. A `decay` Works never ends the look:")
    sub('VAT2-r2-09 §3.22 (4) edges',
        "a camp over ground an epoch builds on, every rung — are V06 §3.21's rows",
        "a camp over ground an epoch builds on, a preview over a rebuild, every rung — are V06 §3.21's rows")

    # ---- §3.23 whole — END of R3-04; VV56-r2-05, VAT2-r2-05, VAT2-r2-06, VV56-r2-06, VV56-r2-01, VV1112-r2-15 ---------------
    old_323 = live_section('### 3.23 The decay level of a building lineage (item 123)',
                           '## 4 Editing — the declarations, the edit events, locality, undo and the clerk\'s view')
    sub('R3-04 R3-06 R3-08 §3.23 whole', old_323, NEW_323)

    # ---- §4.3 — VEL2-r2-01 (R3-19): the dossier exception names the locked household too ---------------------------------
    sub('VEL2-r2-01 (R3-19) §4.3 protection first',
        "A dossier event is the one exception,\n"
        "  by §7.7's precedence: a lock or pin on what it changes is superseded and reported orphaned, and a population fall\n"
        "  reaches a locked or pinned dwelling by a `relet`, never a `vacate` of its last household (V06 §3.5.1 (4)–(5)).",
        "A dossier event is the one exception,\n"
        "  by §7.7's precedence: a lock or pin on what it changes is superseded and reported orphaned, and a dossier population\n"
        "  fall the unlocked households cannot meet takes locked and pinned households too (V06 §3.5.1 (1)) and lets a locked or\n"
        "  pinned dwelling's last household out by a `relet` down to 0, never a `vacate` (V06 §3.5.1 (4)–(5)) — no other fall\n"
        "  does either.")
