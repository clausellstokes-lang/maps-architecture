# §8 – §13, Integration notes
J118 = r'''| J-V6.118 | chose to price every island event an epoch runs — a raise at `raiseIsland`'s parts (bounded by V05 §6's "declaring an island after generation" row); a `resizeIsland` growing or shrinking at every rung where an island stands (a wane's shrinks at TOWN included) at V05 §6's "a resize, a rim reshape" row with its yards' top placements, re-cut plots, re-landed feet and scoped re-derivations; a fall at its row; a wane, settle and refloat inside the step's per-island row — per event outside the `sky.islands` row's cells, the row citing V05 §6's rows by name and restating no figure, and to derive the century's worst case from those rows on an island's generated accesses (≤ `accessCount.max`: every island resized at every epoch with every yard's top placed and every foot re-landed — a fall needs a resize-free settled dwell of ≥ 10 years, and V05 §4.2's re-landing rule bounds nothing below one re-landing per foot per resize over plots ≥ 3 m wide), each hand-placed access (≤ `accessCount.handMax`) priced beside it as the user's edit at 60 ms a resize of its island, the century's sums at the port's cadence the targets (TOWN ≈ 25.4 s, CITY ≈ 113.3 s, METROPOLIS ≈ 211.9 s) and the same worst case charged per epoch by V06 §6.8's comfort estimate where islands may stand (J-V6.135), over excluding the island events from the century, raising the `sky.islands` row to the worst case, keeping a typical-case figure (a resize one epoch in five), pricing every island at the nine-access worst case, or asking volume 5 to defer its re-landings, because what a user waits for is the comfort level (item 119 (a2)) and only the worst case is proved by the rows, a per-epoch row at the worst case would overstate every epoch without an island, a hand-placed access is the user's own edit (J-V5.82) whose cost the estimate charges only where it stands, and the re-landing is volume 5's rule (J-V5.81) |
'''
J135 = r'''| J-V6.135 | chose, for item 119's comfort level on long runs of time (the owner's "Total", J132), one deterministic estimate for both waits — `epoch.costMs` by the rung of each epoch's target (the replay's per-epoch rows, renamed as both estimates now read them, re-summed with V07's participants), the islands that may stand at V06 §6.2's worst case, the hand-placed accesses standing at the request, and the growth stages at §12.6's law — that coarsens an `advance`'s cadence to the smallest whole number of weeks, and the replay's epoch length to the smallest whole number of years, whose estimate fits `advance.budgetMs` (9 s) or `replay.budgetMs` by the peak's rung (9 / 8.5 / 7 s: the ten seconds less the peak's generation and first map at the rung's band top and a reserve), the cadence chosen reported and the accept adopting the preview's fold on an unchanged head (V06 §3.3.2, V06 §3.20.4, V06 §4.1, V06 §6.8), over a fixed cadence with the ten seconds a target only, a comfort level per visible step, an adaptive cadence timed on the running machine, or refusing a long request, because the owner chose a total wait, a cadence timed on the machine would fold different epochs on different hosts (a replay and §6.5's engines must agree), an estimate charging the worst case keeps the ten seconds a ceiling on the reference hardware, and one epoch over the whole span always fits, so no request is refused or shortened (item 101 R2) |'''
EDITS = [
# ---- §8: VV56-07 (price, items, E0/E6/E9, register, risks), VAT0-01 (bar.T-V6-34), VPC-05, VAP-18 (the pins)
('VV56-07 §8 head', r'''Priced below at **29.5–41.75
person-weeks**, the owner's items 111 and 113–115 included''', r'''Priced below at **29.75–42.25
person-weeks**, the owner's items 111, 113–115 and 119 included'''),
('VV56-07 §8 E0', r'''a coarse replay epoch's cost at each rung (V06 §6.7) | T-V6-24 (first cut) | 1–1.5 |''', r'''a coarse replay epoch's cost at each rung (V06 §6.7); the history images' capture and compression per epoch; the `epoch.*` cost rows set from the measured costs (V06 §6.8) | T-V6-24 (first cut) | 1–1.5 |'''),
('VV56-07 §8 E6', r'''the exports (item 447's raised-way properties) | T-V6-21–23, 53 | 3–4.25 |''', r'''the exports (item 447's raised-way properties); the comfort estimate and the coarsened cadence of an `advance` with its one line, the report's `advance` section and the accept's adoption of the preview's fold (item 119 (a2); V06 §6.8) | T-V6-21–24, 53 | 3.25–4.75 |'''),
('VV56-07 §8 E9', r'''the budget, its coarsening and lazy detail, destruction and refounding,''', r'''the budget — the comfort level's share, its coarsening reported (item 119 (a2); V06 §6.8) — and lazy detail, destruction and refounding,'''),
('VV56-07 §8 E9 tests', r'''the replay's frames and the story's reads, the no-op pin | T-V6-71 | 2.5–3.5 |''', r'''the replay's frames and the story's reads, the no-op pin | T-V6-71; T-V6-24's replay clause | 2.5–3.5 |'''),
('VV56-07 §8 total', r'''| **total** | | | **29.5–41.75** |''', r'''| **total** | | | **29.75–42.25** |'''),
('VV56-07 §8 register', r'''`history.checkpointStride` at E6, the `replay.*` rows at E9).''', r'''`history.checkpointStride`, the `epoch.*` rows and `advance.budgetMs` at E6, the `replay.*` rows at E9).'''),
('VAP-18 §8 pins',
 r'''A seat whose line names a bar it has not registered fails V12's lint (T-V12-20) and does
not exit.''',
 r'''A seat whose line names a bar it has not registered fails V12's lint (T-V12-20) and does
not exit.

**The no-op pins** (E-20; V12 §2.13): each seat registers its pins' suites on V12 §3.7.8's engine in the change that lands
its exit, each `NoOpPin` reading its off form from V11 §3.24.0 where V11 states it — E1 `item110.raised`, `.terrace`,
`.deck` and `.stepped` (H-100, H-AQUA, H-TERRACE, H-DECK; T-V6-65), E3 `item114.condition` (H-100, H-WALLS; T-V6-73),
E4 `item105.web` and `item107.spread` (H-100; T-V6-44), E5 `item102.sun` and `item111.water` (H-100; T-V6-12, T-V6-72),
E9 `item113.history` (the history fixtures; T-V6-71).'''),
('VAT0-01 §8 bar.T-V6-34', r'''one draw per (lineage, void kind) (none, share, count) |''', r'''one draw per (lineage, void kind, added-wing key) (none, share, count) |'''),
('VPC-05 §8 l3851', r'''E2's ceiling part needs §4.2 S10b's ceiling''', r'''E2's ceiling part needs §4.7 S10b's ceiling'''),
('VV56-07 §8 risk 1', r'''fallback: the per-class batched re-binding, then the re-score rotation of V06 §6.1, for the owner's veto.''', r'''fallback: the per-class batched re-binding, then the re-score rotation of V06 §6.1 — a declared target miss inside the
comfort level (D-18), V06 §6.8's coarsening absorbing it.'''),
('VV56-07 §8 risk 9', r'''fallback: V06 §6.7's (fewer full epochs, then
coarser ones), for the owner's veto.''', r'''fallback: V06 §6.7's (fewer full epochs, then
coarser ones) — the wait inside the comfort level by V06 §6.8, only its grain coarser.'''),
# ---- §9: J-V6.118 (VV56-08, VV56-07), J-V6.135 (VV56-07)
('VV56-07+08 J-V6.118', ('BETWEEN', '| J-V6.118 |', '| J-V6.119 |'), J118),
('VV56-07 J-V6.135', '\n\n## 10 Base change requests', '\n' + J135 + '\n\n## 10 Base change requests'),
# ---- §10: VPC-05, item 119
('VPC-05+VV56-07 §10',
 r'''Items 111, 113, 114 and 115 of file g are applied to the base by the coherence pass at their homes (§2.3's
`WaterBody.spring`; §4.11 *History-first generation*, §7.7's DR36–DR40, §2.7's `HistoryRecord`, §2.8's
`Provenance.symbolic`; §2.7's `Enceinte.condition` ladder and §7.7's condition row; §4.2 S10b's ceiling and §10.2's
table); this volume holds only their epoch halves (V06 §3.7.7, V06 §3.8.5, V06 §3.11.7, V06 §3.12.1, V06 §3.20).''',
 r'''Items 111, 113, 114, 115 and 119 of file g are applied to the base by the coherence pass at their homes (§2.3's
`WaterBody.spring`; §4.11 *History-first generation*, §7.7's DR36–DR40, §2.7's `HistoryRecord`, §2.8's
`Provenance.symbolic`; §2.7's `Enceinte.condition` ladder and §7.7's condition row; §4.7 S10b's ceiling and §10.2's
table; §12's targets and comfort level); this volume holds only their epoch halves (V06 §3.7.7, V06 §3.8.5, V06 §3.11.7,
V06 §3.12.1, V06 §3.20, V06 §6.8).'''),
# ---- §11
('VV56-07 §11 Q1', r'''It is priced at 29.5–41.75 person-weeks (V06 §8),''', r'''It is priced at 29.75–42.25 person-weeks (V06 §8),'''),
# ---- §12: S7, VV56-07, VV56-03/08
('VV56-15 l4069', r'''V08 §3.5.1 (c)–(d) and §3.6's
`CalamityRef`;''', r'''V08 §3.5.1 (c)–(d) and V08 §3.6's
`CalamityRef`;'''),
('VV56-15 l4070', r'''V11's cells this volume reads (§2.3's `split.threshold`,''', r'''V11's cells this volume reads (V11 §2.3's `split.threshold`,'''),
('VV56-07 §12 CONFIRMED', r'''`BenchBarDef`, `CalibrationRun` kinds and register lint as V06 §8 names them.''', r'''`BenchBarDef`, `CalibrationRun` kinds and register lint as V06 §8 names them; file g's item 119 (a) and (a2) as V06 §6.8
applies them.'''),
('VV56-07+03 §12 PLAUSIBLE 1-2',
 r'''1. every budget of V06 §6 — the per-epoch rows, §6.2's century bounds (TOWN ≤ 25 s, CITY ≤ 115 s, METROPOLIS ≤ 215 s,
   derived by hand from V05 §6's rows with an island's buildings ≤ 5 % of the default request's), V06 §6.7's replay budget,
   the history image size per epoch at CITY and METROPOLIS, the way-surface re-lay under a millisecond, and one early
   return per scoped participant costing nothing measurable — until E0 and E9 time them;
2. that §6.2's worst case (every island resized at every epoch, every foot re-landed) bounds every history;''',
 r'''1. every budget of V06 §6 — the per-epoch rows (the targets), V06 §6.2's century sums at the port's cadence (TOWN ≈ 25.4 s,
   CITY ≈ 113.3 s, METROPOLIS ≈ 211.9 s, derived by hand from V05 §6's rows with an island's buildings ≤ 5 % of the default
   request's and its generated accesses), V06 §6.8's cost rows and budgets — that its estimate bounds the measured waits on
   the reference hardware —, the history image size per epoch at CITY and METROPOLIS, the way-surface re-lay under a
   millisecond, and one early return per scoped participant costing nothing measurable — until E0 and E9 time them;
2. that V06 §6.2's worst case (every island resized at every epoch, every foot re-landed, each hand-placed access priced
   beside it) bounds every history;'''),
# ---- §13 and the Integration notes: S7
('VV56-15 l4098', r'''defaults, each with its protocol and pre-decided fallback (V06 §6, §8).''', r'''defaults, each with its protocol and pre-decided fallback (V06 §6, V06 §8).'''),
('S7 Integration notes', r'''| J-VI.12 — "Open a copy from here" (a `forkAt`) | V06 §4.1; §5.1 |''', r'''| J-VI.12 — "Open a copy from here" (a `forkAt`) | V06 §4.1; V06 §5.1 |'''),
('VV56-15 l3764', r'''(registry row 60; V06 §2.2, §2.4, V06 §3.9.9)''', r'''(registry row 60; V06 §2.2, V06 §2.4, V06 §3.9.9)'''),
('VV56-15 l3771', r'''(V12 §3.7.1 (b), §3.9), each entry's history row''', r'''(V12 §3.7.1 (b), V12 §3.9), each entry's history row'''),
('VV56-15 l4079', r'''3. every default of V06 §2.2's table, §2.4's hazard and calamity rows''', r'''3. every default of V06 §2.2's table, V06 §2.4's hazard and calamity rows'''),
]
