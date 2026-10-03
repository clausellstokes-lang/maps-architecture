# Count-asserted substitutions for repair-V06-r4, part C: §6, §7, §9, §12
H6 = "## 6 Performance budgets"
H7 = "## 7 Tests and acceptance bars"
H9 = "## 9 Decisions (each \"chose X over Y because Z\"; vetoable)"
H12 = "## 12 CONFIRMED versus PLAUSIBLE"

EDITS_C = [
# ---- §6.8's lead: VV56-r3-01
(H6, "VV56-r3-01 (6.8 lead)",
 "whatever span they are given, a\ncatch-up whose dossier events alone pass its budget excepted ((6)):",
 "whatever span they are given, a\ncatch-up where even one epoch over the span with its dossier events' absorb term passes its budget excepted ((6)):", 1),
# ---- §6.8 (1): R4-16 sweep — the events' term counts V08 §6's catch-up batch (per epoch folded and per event)
(H6, "R4-16 sweep (6.8 (1) formula)",
 "`E = Σ_i (epoch.costMs[r_i] + I_i × epoch.islandMs[r_i] + H × epoch.handAccessMs) + epoch.stageMs × g +",
 "`E = Σ_i (epoch.costMs[r_i] + I_i × epoch.islandMs[r_i] + H × epoch.handAccessMs + b) + epoch.stageMs × g +", 1),
(H6, "R4-16 sweep (6.8 (1) N, a, b)",
 "   * `N` is a catch-up's dossier events (0 for an `advance` and the replay), each folded at its own week and never\n     coarsened ((6)), and `a` V08 §6's per-event absorb bound at the document's rung — 30 ms at TOWN and CITY (a village\n     rung reading TOWN's), 45 ms at METROPOLIS — the other part a coarser cadence does not shrink.",
 "   * `N` is a catch-up's dossier events (0 for an `advance` and the replay), each folded at its own week and never\n     coarsened ((6)); `b` and `a` are V08 §6's catch-up batch costs at the document's rung (its absorb-with-epochs row:\n     the events one epoch's span holds absorbed as one batch) — `b` per epoch folded, 150 ms at TOWN and CITY (a village\n     rung reading TOWN's) and 500 ms at METROPOLIS, `a` per event, 3 ms at TOWN and CITY and 3.5 ms at METROPOLIS —\n     both 0 for an `advance` and the\n     replay; `a × N` is the other part a coarser cadence does not shrink.", 1),
# ---- §6.8 (3): VV56-r3-01
(H6, "VV56-r3-01 (6.8 (3))",
 "a catch-up's fits its budget but where its\n   dossier events alone pass it ((6)).",
 "a catch-up's fits its budget but where even one\n   epoch over the span with its dossier events' absorb term passes its budget ((6)).", 1),
# ---- §6.8 (6): R4-16 (END of VV56-r2-04) — the batch cited; the over-budget clause
(H6, "R4-16 sweep (6.8 (6) one epoch fits)",
 "— so one epoch over the span still fits it before the\n   events' term (≈ 5.3 s ≤ 6 310 ms at the cap).",
 "— so one epoch over the span, its batch's per-epoch\n   cost included, still fits it before the events' per-event term (≈ 5.8 s ≤ 6 310 ms at the cap).", 1),
(H6, "R4-16 (6.8 (6) coarse epochs' batches)",
 "every dossier event still at its own week (§4.11 *The clock* (2)), a\n   calamity entering",
 "every dossier event still at its own week (§4.11 *The clock* (2)), the\n   events each coarse epoch's span holds absorbed as one batch (V08 §6's absorb-with-epochs row), a calamity entering", 1),
(H6, "END VV56-r2-04 (6.8 (6) over-budget clause)",
 "the cadence reported in `EpochReport.advance` and the port's report. Where even one epoch over\n   the span with its events' term passes the budget (a catch-up of many dossier events: ≈ 10 a CITY year, V08 §6), the\n   catch-up folds that one epoch, every dossier event still at its own week — never a coarser or shortened result\n   (§12.1) — and the wait completes past the comfort level, reported F-BUDGET-TIME, §12.10's R12-31 charging the miss to\n   its owning path, the per-event absorb of V08 §6's rows. So no catch-up is refused or shortened (item 101 R2;\n   J-V6.136).",
 "the cadence reported in `EpochReport.advance` and the port's report. The events' term is\n   this path's own pre-decided change under §12.10's R12-31 (V08 §6's absorb-with-epochs row): the dossier events one\n   epoch's span holds are absorbed as one batch, so the term grows with the epochs folded, not with the events, and\n   T-V6-24's three catch-up fixtures fit the catch-up's budget at CITY and at the METROPOLIS cap. Where even one epoch\n   over the span with its events' term passes the budget (a catch-up of many more dossier events than T-V6-24's\n   fixtures carry), the catch-up folds that one epoch, every dossier event still at its own week — never a coarser or shortened\n   result (§12.1) — and the wait completes past the comfort level, reported F-BUDGET-TIME; one of T-V6-24's three\n   catch-up fixtures doing so fails the release until that path is changed again, never a declared miss (§12.10's\n   R12-31). So no catch-up is refused or shortened (item 101 R2; J-V6.136).", 1),
# ---- §6.9: R4-03 sweep — the memo's entry weeks
(H6, "R4-03 sweep (6.9)",
 "its extends' weeks), read only for the buildings a",
 "its extends' weeks, a restoring re-cut's minted elements its restoration's end week, V06 §3.23 (3)), read only for the\nbuildings a", 1),

# ---- §7's lead: END of VM-R3T-05/VCS-r3-06 (T110-2's epoch clauses) and the take-over row's T114 text (scope's §13.2)
(H7, "END VM-R3T-05/VCS-r3-06 + T114 (7 lead)",
 "T81-1, T108-4 over\nepochs, T111-1 – T111-5's epoch form, T113-1 – T113-3, T113-6, T113-7, T114-1 – T114-5, T114-8's epoch clause, T114-10's epoch clause,\nT115-1",
 "T81-1, T108-4 over\nepochs, T110-2's epoch clauses (4) and (5), T111-1 – T111-5's epoch form, T113-1 – T113-3, T113-6, T113-7, T114-1 – T114-5 save\nT114-3's landfall clause, T114-8's and T114-10's epoch clauses,\nT115-1", 1),
# ---- §7's table: T110-2 row added
(H7, "END VM-R3T-05/VCS-r3-06 (table row)",
 "| T108-4, over epochs | T-V6-45 | a promotion or a demotion by least disruption |",
 "| T108-4, over epochs | T-V6-45 | a promotion or a demotion by least disruption |\n| T110-2, its epoch clauses (4) and (5) | T-V6-47 | on H-AQUA, an epoch circuit across a standing aqueduct and one across a standing timber elevated road, each run again locked, through one station on the deck at its level; an epoch stage and route re-solve crossing a standing raised way only under an `open` span |", 1),
# ---- §7's table: T114 row (VAP-r3-06; scope's take-over row)
(H7, "VAP-r3-06 (table row)",
 "| T114-1 – T114-5, T114-8, T114-10's epoch clause (item 114 (g)) | T-V6-73 | the transitions over epochs on H-WALLS; the welded stretch over 10 epochs; the `item114.condition` pin |",
 "| T114-1 – T114-5 save T114-3's landfall clause, T114-8's and T114-10's epoch clauses (item 114 (g)) | T-V6-73 | the transitions over epochs on H-WALLS; the crossing stations over 20 epochs on H-AQUA; the welded stretch over 10 epochs; the `item114.condition` pin |", 1),
# ---- T-V6-11: VM-R3T-03 — the release on both spans fallen tested
(H7, "VM-R3T-03 (T-V6-11)",
 "a curtain the aqueduct crosses by its opening set to `absorb` likewise);",
 "a curtain the aqueduct crosses by its opening set to `absorb` likewise) and, on a second run of each, from the epoch after both spans beside its crossing station have fallen (a scripted `topple` of the support next to the station on either side), never before (§2.7's support step (3));", 1),
# ---- T-V6-24: END of VV56-r2-04 (R4-16) — the fixtures within budget by the batch; the over-budget branch on its own fixture
(H7, "END VV56-r2-04 (T-V6-24 what)",
 "and of 100 years carrying 20 (a quiet span) — timed inside",
 "and of 100 years carrying 20 (a quiet span), and for the over-budget branch of 100 years carrying 5 000 at the METROPOLIS cap — timed inside", 1),
(H7, "END VV56-r2-04 (T-V6-24 bar)",
 "every wait's p95 ≤ 10 000 ms, its measured time at most its estimate plus its reserve (else the cost rows rise, V06 §6.7's fallback) — a catch-up's wherever its estimate fits the catch-up's budget, and where it does not (one epoch over the span with its events' term passing it) the one-epoch fold, every dossier event at its own week, with its F-BUDGET-TIME report (the miss §12.10's R12-31 charges to V08 §6's per-event absorb);",
 "every wait's p95 ≤ 10 000 ms but the over-budget fixture's (below), its measured time at most its estimate plus its reserve (else the cost rows rise, V06 §6.7's fallback) — a catch-up's, on the three catch-up fixtures at CITY and at the METROPOLIS cap, within the catch-up's budget on an open map and inside an open from SettlementForge, its events absorbed one batch per epoch (V08 §6's absorb-with-epochs row, this path's own change under §12.10's R12-31), a fixture past it failing the release until that path is changed again, never a declared miss (§12.10's R12-31); on the over-budget fixture (one epoch over the span with its events' term passing the budget) the one-epoch fold, every dossier event at its own week, with its F-BUDGET-TIME report, never coarser or shortened;", 1),
# ---- T-V6-47: END of VM-R3T-05/VCS-r3-06 and R4-09's crossing text
(H7, "END VM-R3T-05/VCS-r3-06 + R4-09 (T-V6-47)",
 "| T-V6-47 | hook | barrier closure on a new circuit: H-CLIFF's new circuit has zero wall edges on sheer arcs and its stretches end on tower anchors; the river loop is walled at its neck only; on H-AQUA an aqueduct crosses both a new circuit and a later contraction: each trace crosses it at one crossing station, its pier the wall's band, 0 supports in the new strip's setback, glacis, berm or channel, with one wall opening each; a viaduct crossed by a trace gets one raised gate; `wallToWay` of a crossed ring leaves the raised way standing with no junction to the ring road | 0 sheer-arc edges; 0 supports in the strip; exactly one opening or raised gate per crossing; exact |",
 "| T-V6-47 | hook | barrier closure on a new circuit: H-CLIFF's new circuit has zero wall edges on sheer arcs and its stretches end on tower anchors; the river loop is walled at its neck only; on H-AQUA an aqueduct crosses both a new circuit and a later contraction: each trace crosses it through one of its stations on the deck at its level, the trace bent to it, that crossing station's support the wall's band, 0 supports in the new strip's setback, glacis, berm or channel, with one wall opening each; a viaduct crossed by a trace gets one raised gate; `wallToWay` of a crossed ring leaves the raised way standing with no junction to the ring road; **later work across a standing raised way** on H-AQUA (takes T110-2's epoch clauses): an epoch circuit across its standing aqueduct and one across a standing timber elevated road, each run again with the raised way locked — the trace through one station on the deck at its level, its strips stopped where a support stands in them, each stop counted in `walls.raisedCrossings`, no trace waiting, every station, key, span and state of the raised way unchanged but the crossing station's support (§2.7's support step (6) (b)); an epoch growing a stage over the aqueduct's land and an epoch route re-solved under a viaduct — 0 way corridors over a support ring, ramp, stair, foot or `vault` span, every crossing under an `open` span (§4.3) | 0 sheer-arc edges; 0 supports in the strip; exactly one opening or raised gate per crossing; 0 stations moved, added or omitted and 0 keys minted on a standing raised way, locked or not; 0 way corridors over a support ring, ramp, stair, foot or `vault` span; exact |", 1),
# ---- T-V6-70 (f): VEL3-r3-01 text 3
(H7, "VEL3-r3-01 (T-V6-70 (f))",
 "no `relet` taking the protected dwelling below one household (V06 §3.5.1 (1), (4), (5));",
 "no `relet` taking the protected dwelling below one household (V06 §3.5.1 (1), (4), (5)); then a rise past the held households' ordinals — no household id added twice, the passed-over households back, the town's households the roster's prefix to the new target, the members summing to it within the roster tolerance (DR7's bar) — and, run again with a rise that stops below them, the held households counted toward its target, the members summing to it within the roster tolerance (V06 §3.5.1 (1));", 1),
# ---- T-V6-71: VAT3-r3-10 per R4-07 (c)
(H7, "VAT3-r3-10 (T-V6-71)",
 "a history with a founding after its present replays nothing, reported;",
 "a history with a founding after its present replays nothing, reported; on H-HISTORY with a fire calamity at the present week (its tick the dossier's latest, 0 years ago) and a history event of 0 years ago, both replayed in the last epoch at `W_p`, none dropped (V06 §3.20.2);", 1),
# ---- T-V6-73: VAP-r3-06 — the head and the crossing-station clause (with scope's T114-3 text)
(H7, "VAP-r3-06 (T-V6-73 head)",
 "(item 114; V06 §3.7.7; takes T114-1 – T114-5, T114-8 and T114-10's epoch clause), on H-WALLS:",
 "(item 114; V06 §3.7.7; takes T114-1 – T114-5 save T114-3's landfall clause, and T114-8's and T114-10's epoch clauses), on H-WALLS:", 1),
(H7, "VAP-r3-06 (T-V6-73 clause)",
 "decayed and patched on the town ring's draws and λ (V06 §3.7.7; T114-10's epoch clause);",
 "decayed and patched on the town ring's draws and λ (V06 §3.7.7; T114-10's epoch clause); **under a crossing station**: on H-AQUA's ring held neglected and poor over 20 epochs — its masonry aqueduct through the wall arch, its viaduct on a raised gate — the stretch under each crossing station is never `breached` or `dismantled` while its deck stands, every other stretch decaying through `worn` to `breached`, and a crossing station whose spans have both fallen keeps its stretch as a wall run, never dismantled as a support (V06 §3.7.7 (2); V06 §3.19.2 (3); §2.7's support step (3); T114-3's crossing clause);", 1),
# ---- T-V6-76 (b): VV56-r2-06 per R4-03
(H7, "VV56-r2-06 (T-V6-76 (b))",
 "a `reoccupy` from derelict with a re-cut, and an `extend` after a repair: 0 added elements drawn repaired, every kept element keeping its peak;",
 "a `reoccupy` from derelict with a re-cut, and an `extend` after a repair: 0 added elements drawn repaired, every kept element keeping its peak; a `reoccupy` from derelict whose `repair` Works is still running at its epoch's week: every element its re-cut mints drawn as built in every week of the Works, and from the Works' FINISHED week reading the level as any element;", 1),

# ---- §9: J-V6.91 (R4-09 sweep: a trace never waits for a raised way)
(H9, "R4-09 sweep (J-V6.91)",
 "with continuity a hard rule and a trace that cannot keep it waiting, over routing",
 "with continuity a hard rule (the trace bent through one of the raised way's stations on the deck at its level, what cannot pass under the deck stopped at its under-deck strip's edges and reported, never a trace waiting; §2.7's support step (6) (b)), over routing", 1),
# ---- §9: J-V6.114, J-V6.140 (VM-R3T-03)
(H9, "VM-R3T-03 (J-V6.114)",
 "from the epoch after that raised way is removed or its crossing span `dismantled`, after `wallToWay` as after `absorbWall`",
 "from the epoch after that raised way is removed or the spans on both sides of its crossing station fallen (§2.7's support step (3)), after `wallToWay` as after `absorbWall`", 1),
(H9, "VM-R3T-03 (J-V6.140)",
 "from the epoch after the aqueduct is removed or its crossing span `dismantled` (V06 §3.7.6 (5))",
 "from the epoch after the aqueduct is removed or the spans on both sides of its crossing station fallen (§2.7's support step (3); V06 §3.7.6 (5))", 1),
# ---- §9: J-V6.136 (R4-16 sweep)
(H9, "R4-16 sweep (J-V6.136 price)",
 "— its dossier events priced at V08 §6's per-event absorb bound —",
 "— its dossier events priced at V08 §6's catch-up batch costs, per epoch folded and per event —", 1),
(H9, "R4-16 sweep (J-V6.136 over-budget)",
 "where even one epoch over the span with its events passes the budget, that one epoch is folded and the wait, past the comfort level, is reported F-BUDGET-TIME (§12.1: never a coarser or shortened result), §12.10's R12-31 charging the miss to the per-event absorb of V08 §6's rows — so no catch-up is refused or shortened",
 "where even one epoch over the span with its events' absorb term passes the budget, that one epoch is folded and the wait, past the comfort level, is reported F-BUDGET-TIME (§12.1: never a coarser or shortened result), V08 §6's catch-up batch — the events one epoch's span holds absorbed as one batch — being this path's own change under §12.10's R12-31, so one of T-V6-24's catch-up fixtures past its budget fails the release, never a declared miss — so no catch-up is refused or shortened", 1),
# ---- §9: J-V6.139 (R4-03)
(H9, "VV56-r2-06 (J-V6.139)",
 "the highest level since the element entered the plan for item 114's patched elements,",
 "the highest level since the element entered the plan for item 114's patched elements (an element a restoring event's re-cut mints entering when that restoration ends, so a restoration neither damages nor repairs its own new elements),", 1),
(H9, "VV56-r2-06 (J-V6.139 because)",
 "a per-element peak never draws as repaired an element the damage never reached,",
 "a per-element peak never draws as repaired an element the damage never reached, nor draws damaged one a restoration minted,", 1),

# ---- §12 PLAUSIBLE (1): R4-16 sweep
(H12, "R4-16 sweep (12 (1))",
 "its dossier events priced at V08 §6's per-event bound (V06\n   §6.8 (6)),",
 "its dossier events priced at V08 §6's catch-up batch\n   costs (V06 §6.8 (1), (6)),", 1),
]
