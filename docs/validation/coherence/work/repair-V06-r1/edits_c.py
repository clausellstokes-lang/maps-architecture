# §3 generation
EDITS = [
# ---- §3.1 (4): VAT0-05 (the EvolutionStrategy comment's rule, here)
('VAT0-05 §3.1 (4)',
 r'''   strategy's**; a step for which neither registers a phase runs nothing — then,''',
 r'''   strategy's** (one phase per step the strategy implements, in `EpochStep` order — §4.11's `EvolutionStrategy.phases`);
   a step for which neither registers a phase runs nothing — then,'''),
# ---- §3.2 row 11
('VV56-15 l975', r'''steps that fall due | V06 §3.8.4, §3.10 |''', r'''steps that fall due | V06 §3.8.4, V06 §3.10 |'''),
# ---- §3.3.2: VV56-07 (item 119 (a2)) — the advance's cadence under the comfort level
('VV56-07 §3.3.2 comfort',
 r'''runs in 130-week steps") — item 101 R2's bend, never a refusal. With `W0` the document's week''',
 r'''runs in 130-week steps") — item 101 R2's bend, never a refusal. **Then the comfort level** (item 119 (a2), the owner's
"Total"; J132; J-V6.135): V06 §6.8's estimate of those epochs, their targets by the rules below, is compared with
`advance.budgetMs`; above it the cadence
becomes the smallest whole number of weeks, tried upward from the cadence so far, whose epochs' estimate fits — fewer,
longer epochs, as V06 §3.20.1 (3) coarsens the replay; one epoch at the span's end always fits (V06 §6.8 (3)) — and the
card and the clerk say so in the same one line with the cadence chosen ("a century runs in 5-year steps to finish within
ten seconds"): a bend, never a refusal and never a shorter span. The estimate reads the request and the document at the
request only, never a measured time, so the cadence is deterministic and a replay of the log folds the same epochs; every
epoch of the group reports the cadence it folds at and the one asked (`EpochReport.advance`, V06 §2.10). `cadenceWeeks`
below is the cadence so chosen. With `W0` the document's week'''),
('VV56-07 §3.3.2 progress',
 r'''as a cancellable background job whose progress is visible and whose completed epochs stand if it is stopped (V06 §4.1).''',
 r'''as a cancellable background job whose progress shows past one second (V09 §4.21.9's progress view, counting the epochs at
the cadence chosen) and whose completed epochs stand if it is stopped (V06 §4.1).'''),
('VV56-07 §3.3.3 start small',
 r'''(default 200 years at 52-week cadence) follows as its first group.''',
 r'''(default 200 years at 52-week cadence, coarsened under the comfort level as any `advance`; the founding's generation,
§12.3's law at the ladder's floor, fits inside `advance.budgetMs`'s one-second reserve, V06 §6.8) follows as its first
group.'''),
# ---- §3.4 (9): VAT0-13
('VAT0-13 §3.4 (9)', r'''`surface`, the phase writes one `setAttr` of `Way.surface` (author `engine`, cause `rule:field`);''', r'''`surface`, the phase writes one `setAttr` of `Way.surface` (author `epoch`, cause `rule:field`);'''),
# ---- §3.6 (1): S7
('VV56-15 l1328', r'''placement (V04 §3.4, §3.10) seat them''', r'''placement (V04 §3.4, V04 §3.10) seat them'''),
# ---- §3.7.7 (4): VAP-18 (a), (b)
('VAP-18 §3.7.7 (4)',
 r'''4. **Neutral values** (the no-op pin): `walls.condition.meansLow` 0 (MEANS never `low`), `wearChancePerYear` null (a
   neglected `standing` stretch breaches directly at `walls.breachChancePerYear`) and `needReturnYears` 0 reproduce the
   rules before item 114 byte for byte (T-V6-73; V12 registers the pin).''',
 r'''4. **Neutral values** (the no-op pin): V11 §3.24.0's `walls.condition` off form — `atGeneration` false (every run
   `standing` at generation), `meansLow` 0 (MEANS never `low`), `wearChancePerYear` null (a neglected `standing` stretch
   breaches directly at `walls.breachChancePerYear`) and `needReturnYears` 0 — reproduces the rules before item 114 byte
   for byte (T-V6-73); V06's E3 seat registers H-100 and H-WALLS on V12 §2.13's `item114.condition` (V12 §3.7.8's
   engine).'''),
# ---- §3.8.2 tier (2): VAT0-10 (V02 X23)
('VAT0-10 §3.8.2 (2)',
 r'''* (2) `reoccupy` derelict ones (a repair, a ledger debit);''',
 r'''* (2) `reoccupy` derelict ones (a repair, a ledger debit) — a building with no storeyed wing (V02 §3.15's solid
  monument, every wing `solid`) takes no roof step: its decay removes no roof it lacks and a repair (`reoccupy` from
  derelict) adds none, so a solid monument is never re-roofed (V02 X23);'''),
# ---- §3.8.5: VPC-05
('VPC-05 §3.8.5', r'''The ceiling on dwelling grandeur by rung (§4.2 S10b,''', r'''The ceiling on dwelling grandeur by rung (§4.7 S10b,'''),
# ---- §3.9.2: VAT0-13
('VAT0-13 §3.9.2', r'''Each write is a `setAttr` op on `Use.strain` (author `engine`), so it has the epoch's undo''', r'''Each write is a `setAttr` op on `Use.strain` (author `epoch`), so it has the epoch's undo'''),
# ---- §3.12.1: VV56-19 (the grove's draws), VAP-18 (c) (the spring-less clause is a conformance clause)
('VV56-19 §3.12.1 grove',
 r'''     below `spring.groveMinFlow` for its drawn `land.scrubAfterYears`: its rows tombstoned (cause `rule:spring`); a thinned
     grove is re-laid on the shore by S12b's grove rule (§4.9), keyed by the spring's lineage, once the flow has stood at
     or above the threshold for its drawn `land.fallowAfterYears`;''',
 r'''     below `spring.groveMinFlow` for its drawn `land.scrubAfterYears` (drawn once on `stream(EVO_TERRAIN, water body)`
     keyed with the epoch the flow fell below): its rows tombstoned (cause `rule:spring`); a thinned grove is re-laid on
     the shore by S12b's grove rule (§4.9), keyed by the spring's lineage, once the flow has stood at or above the
     threshold for its drawn `land.fallowAfterYears` (drawn likewise, keyed with the epoch it rose);'''),
('VAP-18 §3.12.1 (5)', r'''   (no op and no draw — T-V6-72's no-op pin).''', r'''   (no op and no draw — T-V6-72's spring-less-site clause).'''),
# ---- §3.13 (1): VAT0-10 (V02 X23)
('VAT0-10 §3.13 (1)',
 r'''   before the present creates no Works: its changes apply finished (V06 §3.20.4).''',
 r'''   before the present creates no Works: its changes apply finished (V06 §3.20.4). A building with no storeyed wing (V02
   §3.15's solid monument, every wing `solid`) takes no roof step: its decay removes no roof it lacks and a repair
   (`reoccupy` from derelict) adds none — a solid monument is never re-roofed (V02 X23).'''),
# ---- §3.15.2: VV910-04 (the settings' home)
('VV910-04 §3.15.2 frames', r'''1. a cached `HistoryFrame` (LRU, the device's frame setting, V09 §9);''', r'''1. a cached `HistoryFrame` (LRU, the device's frame setting, V09 §5.12);'''),
('VV910-04 §3.15.2 store', r'''past the device's store setting (V09 §9) they''', r'''past the device's store setting (V09 §5.12) they'''),
# ---- §3.16: VDC0-25 (raised.reason), VV56-09 (the replay's epoch component)
('VDC0-25 §3.16 stage ids', r'''§3.19; its gate draws stay the base's raised-way stream's, keyed by the reason key — *Identity* below), in that order.''', r'''§3.19; its gate draws stay `raised.reason`'s (§6.1), keyed by the reason key — *Identity* below), in that order.'''),
('VV56-09 §3.16 keys',
 r'''A replay epoch keys as any epoch, its epoch component its place in the log (V06 §3.20.3).''',
 r'''A replay epoch r (r = 1 … R, V06 §3.20.3) keys its draws with §6.1's replay epoch component for r — the upper half of
the epoch component's range, reserved to the history replay (J-A113.61) — so no replay draw equals a live epoch's.'''),
('VDC0-25 §3.16 identity', r'''Its gate draw is one uniform per reason key on the base's raised-way stream with epoch''', r'''Its gate draw is one uniform per reason key on `raised.reason` (§6.1) with epoch'''),
# ---- §3.17 (5): VV56-07
('VV56-07 §3.17 (5)',
 r'''a degenerate `advance` request bends or is a no-op by V06 §3.3.2's rules;''',
 r'''a degenerate `advance` request bends or is a no-op by V06 §3.3.2's rules, and one whose estimate exceeds `advance.budgetMs`
   coarsens its cadence by them (V06 §6.8), never shortened or refused;'''),
# ---- §3.18 lead: S7
('VV56-15 l2406-2407',
 r'''Volume 4 owns the underground's systems, their rules and tables and their build-depth algorithms (V04 §2.2–§2.3, §3.5,
§3.8, §3.10:''',
 r'''Volume 4 owns the underground's systems, their rules and tables and their build-depth algorithms (V04 §2.2–V04 §2.3,
V04 §3.5, V04 §3.8, V04 §3.10:'''),
# ---- §3.18.1 (2a): VAT0-01
('VAT0-01 §3.18.1 (2a)',
 r'''      `scope.basementGrown` that stands over a cavern or ruin element: its **one uniform per (building lineage, `dig`,
      void kind)** on the `sewer` concern is fixed by its key — never re-drawn — and compared with the building's chance
      (the class row × the basement factor × the depth factor, capped), so an access appears when a building is built over
      a void, or later when its chance rises above its draw (a basement added, a deeper cellar), and a building never draws
      twice for one kind: `reoccupy`, `relet` and a repair change nothing, while a rebuild on a trace (a successor lineage,
      §6.3) and every new stage's buildings bring new draws.''',
 r'''      `scope.basementGrown` that stands over a cavern or ruin element: its **one uniform per (building lineage, `dig`,
      void kind)**, its key carrying the wing key of a wing V02's mutator adds (V04 §3.5.7 (d); J-VI.17 H2), on the
      `sewer` concern is fixed by its key — never re-drawn — and compared with the building's chance (the class row × the
      basement factor × the depth factor, capped), so an access appears when a building is built over a void, or later
      when its chance rises above its draw (a basement added, a deeper cellar). A building draws once per void kind, plus
      once for each wing V02's mutator adds over a void (a `MutationPlan` step or a rung-3 op, in `scope.basementGrown`):
      `reoccupy`, `relet` and a repair change nothing, while a rebuild on a trace (a successor lineage, §6.3) and every new
      stage's buildings bring new draws.'''),
# ---- §3.18.1 (4): VAT0-09
('VAT0-09 §3.18.1 (4) afterGrowth',
 r'''   `under.voidsLost`. A `lost` void holds no dwelling until an open path exists again;''',
 r'''   `under.voidsLost`. A cluster turned `lost` in an `afterGrowth` participant's commit (`under.extend`'s
   `Foundations.apply` or `ArchVaults.reconcile`, `under.access`, `under.undercity`) has its dwellings vacated in that
   batch and its households re-housed inside that participant by the in-participant rule below, never through the ledger
   (whose pool `siting` has already drained); chronicled and counted the same. A `lost` void holds no dwelling until an
   open path exists again;'''),
('VAT0-09 §3.18.1 (4) whose households',
 r'''a hand-down's bound 0)
   and those on a floor a foundation collapses ((6)) are **re-housed inside the participant**,''',
 r'''a hand-down's bound 0),
   those on a floor a foundation collapses ((6)) and those of a cluster turned `lost` after `siting` (above) are
   **re-housed inside the participant**,'''),
# ---- §3.18.2 (3a): VAT0-04
('VAT0-04 §3.18.2 (3a)',
 r'''   ties by source address; another complex becomes the primary only''',
 r'''   ties by rank (V04 §3.5.1 (5): the formation order, rank 1 at generation); another complex becomes the primary only'''),
# ---- §3.19: VDC0-25, VAT0-17, VAT0-13
('VDC0-25 §3.19 (3)', r'''   the base's raised-way stream with epoch component 0 — the same draw generation makes''', r'''   `raised.reason` (§6.1) with epoch component 0 — the same draw generation makes'''),
('VDC0-25 §3.19 (5)', r'''so its pitch is the one uniform the step draws on the raised-way stream keyed by the way's lineage''', r'''so its pitch is the one uniform the step draws on `raised.reason` (§6.1) keyed by the way's lineage'''),
('VAT0-17 §3.19 (7)', r'''(the deck's width plus `raised.stripMarginM` each side)''', r'''(the deck's width plus V01 §3.14's `raised.stripMarginM` each side)'''),
('VAT0-17 §3.19 rows',
 r'''and METROPOLIS only), never a cell. The one row not V11's is `raised.stripMarginM` (1 m), the base's under-deck strip row
(§4.3).''',
 r'''and METROPOLIS only), never a cell. The strip margin is V01 §3.14's `raised.stripMarginM` (V01 §3.17.3 (2)'s under-deck
strip).'''),
('VAT0-13 §3.19.2 (2)', r'''is set to the epoch's week by a `setAttr` (author `engine`) when the condition''', r'''is set to the epoch's week by a `setAttr` (author `epoch`) when the condition'''),
# ---- §3.20: VV56-07, VV56-20, VV56-09, VAT0-20, VAP-18
('VV56-07 §3.20.1 (3)',
 r'''`coarsened` set and reported. Each epoch's''',
 r'''`coarsened` set and the length chosen reported (`ReplayPlan.epochYears`; the report's `replay.epochYears`). Each epoch's'''),
('VV56-20 §3.20.2 destroy',
 r'''* `destroy` — the destruction path (V06 §3.20.5), where the row's severity threshold is met;''',
 r'''* `destroy` — the destruction path (V06 §3.20.5), where the event's severity is at or above the row's threshold, the
  first end of its `severityScale` (V06 §2.14; V11 §3.25.2); an event below it is recorded only;'''),
('VV56-09 §3.20.3 replay',
 r'''* `replay` — V06 §2.14's provenance.''',
 r'''* `replay` — V06 §2.14's provenance; the epoch's draws are keyed with §6.1's replay epoch component for its index
  (V06 §3.16).'''),
('VV56-07 §3.20.4 lead',
 r'''one-click budgets (§12.3, §12.5) are the path without a known history, and a history-first generation's are these:''',
 r'''one-click budgets (§12.3, §12.5) are the path without a known history, and a history-first generation's — the whole wait,
the start's generation, the replay and the first map, inside item 119's ten-second comfort level (item 119 (a2); V06 §6.8)
— are these:'''),
('VV56-07 §3.20.4 estimate',
 r'''* **The estimate** — `Σ replay.epochCostMs[rung of the epoch's target]` over the plan's epochs (V06 §6.7's per-epoch
  costs), a function of the plan only, so the coarsening it decides is deterministic; when it exceeds
  `replay.budgetMs[the peak's rung]` (V06 §6.7), the epoch length grows (V06 §3.20.1 (3)) until it fits. The measured time
  is a bar (T-V6-71), never an input.''',
 r'''* **The estimate** — V06 §6.8's estimate over the plan's epochs (`epoch.costMs` by the rung of each epoch's target, the
  islands that may stand, the growth stages), a function of the plan and the recipe only, so the coarsening it decides is
  deterministic; when it exceeds `replay.budgetMs[the peak's rung]` — the comfort level's share left after the peak's
  generation and the first map (V06 §6.8 (2)) — the epoch length grows (V06 §3.20.1 (3)) until it fits. The measured
  time is a bar (T-V6-24, T-V6-71), never an input.'''),
('VAT0-20 §3.20.5 (4) former fabric',
 r'''   destruction ruined, or the ruins one district's decline left in one epoch (its ruined buildings, its ways effaced to
   traces, its dismantled enceinte stretches and ruined gates) — whose years''',
 r'''   destruction ruined, or the ruins one district's decline left in one epoch (its ruined buildings, its ways retired or
   effaced to traces, its enceinte runs whose condition is `dismantled` — and, for a destruction's fabric, the runs
   V06 §3.20.5 (2) left `breached` — with the towers and gates drawn on them; a tower or a gate carries no state, file f
   item 575) — whose years'''),
('VAP-18 §3.20.7 pin',
 r'''no-op pin; V12 registers it).''',
 r'''no-op pin `item113.history`, registered by V06's E9 seat on V12 §3.7.8's engine).'''),
# ---- §3.21: VK0-16, S7, VV56-07
('VK0-16 §3.21', r'''(`E_DEGENERATE`, `E_BELOW_MIN_EDGE`, `E_NON_SIMPLE` …)''', r'''(`E_DEGENERATE`, `E_BELOW_MIN_EDGE`, `E_SELF_INTERSECT`, `E_INVARIANT` …)'''),
('VV56-15 l3148', r'''| the building shade mask (V06 §2.6, §3.4) |''', r'''| the building shade mask (V06 §2.6, V06 §3.4) |'''),
('VV56-15 l3152', r'''| the runner and the phase order (V06 §3.1–§3.2) |''', r'''| the runner and the phase order (V06 §3.1–V06 §3.2) |'''),
('VV56-15 l3190', r'''| no clock: the bend (V06 §1.3, §4.1);''', r'''| no clock: the bend (V06 §1.3, V06 §4.1);'''),
('VV56-07 §3.21 advance row',
 r'''`perYear` below −1; an overflowing rate; a negative target; every epoch clamped | V06 §3.3.2's *Degenerate requests*: a no-op with its line, one week, a floored cadence with its line, sorted points (the last kept, past ones dropped), −1 read, the ladder top, the clamp; time still passes when the population holds | repair locally (bend or no-op) | T-V6-23 |''',
 r'''`perYear` below −1; an overflowing rate; a negative target; every epoch clamped; an estimate above `advance.budgetMs` at the cadence asked | V06 §3.3.2's *Degenerate requests*: a no-op with its line, one week, a floored cadence with its line, sorted points (the last kept, past ones dropped), −1 read, the ladder top, the clamp; time still passes when the population holds; the cadence coarsened to the smallest that fits, one epoch at the span's end the floor (V06 §6.8 (3)), its line naming the cadence chosen | repair locally (bend or no-op); simpler shape (coarser epochs) | T-V6-23; T-V6-24 |'''),
]
