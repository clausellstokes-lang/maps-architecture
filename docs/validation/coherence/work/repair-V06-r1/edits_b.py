# §2 data model
EDITS = [
# ---- §2.1: VAT0-05 (EvolutionStrategy is §4.11's), VAT0-16 (DisplaceCause and Household.transit are §2.7's, 'destruction' included)
('VAT0-05+VAT0-16 §2.1 lead',
 r'''These are the declarations §4.11 names as this volume's (file f item 317).''',
 r'''These are the declarations §4.11 names as this volume's (file f item 317). `EvolutionStrategy` itself is §4.11's (its
phase rule is V06 §3.1 (4)'s); `DisplaceCause` — every cause a household enters the ledger with, `destruction` (the
replay's destruction epoch, V06 §3.20.5 (2)) among them — and `Household.transit` are §2.7's (file f item 335).'''),
('VAT0-05 delete EvolutionStrategy',
 r'''interface EvolutionStrategy { id: string; phases: EpochPhase[] /* one per step it implements, in EpochStep order; a step with no phase runs nothing (V06 §3.1) */ }
''',
 r''''''),
('VAT0-16 delete DisplaceCause',
 r'''type DisplaceCause = 'fire'|'flood'|'topple'|'contraction'|'works'|'island'|'void'|'clearance'|'redevelopment';
''',
 r''''''),
('VAT0-16 transit cited',
 r'''  block(block: Id): number /* the per-block maximum left this epoch */ }
// on §2.7's Household (file f item 335): epoch-local, never in a snapshot
transit?: { cause: DisplaceCause; since: number /* the week it was displaced */ }
```''',
 r'''  block(block: Id): number /* the per-block maximum left this epoch */ }
// DisplaceCause and Household.transit (epoch-local, never in a snapshot) are §2.7's; the ledger above writes and clears transit
```'''),
('VAT0-16 transit prose',
 r'''`Household.transit` is written by the batch that displaces a household (the ledger's `displace`) and cleared by the batch''',
 r'''`Household.transit` (§2.7) is written by the batch that displaces a household (the ledger's `displace`) and cleared by the batch'''),
# ---- §2.2 table: VK0-21 and the same bare V06 citations in the table (S7)
('VK0-21+S7 §2.2 (§3.6)', r'''(§3.6) |''', r'''(V06 §3.6) |''', 7),
('VK0-21 l522', r'''| `hazards` | V06 §2.4's rows | the hazard operators (§3.11) |''', r'''| `hazards` | V06 §2.4's rows | the hazard operators (V06 §3.11) |'''),
('S7 §2.2 shade', r'''a ruin's caster height as a share of its eave (§3.4);''', r'''a ruin's caster height as a share of its eave (V06 §3.4);'''),
('S7 §2.2 mutation', r'''the years after a plan's creation at which each later step falls due, drawn once per plan (§3.10) |''', r'''the years after a plan's creation at which each later step falls due, drawn once per plan (V06 §3.10) |'''),
# ---- VV56-19: the grove's span is land.scrubAfterYears
('VV56-19 §2.2 spring row',
 r'''| `spring.gardenMinFlow` · `spring.groveMinFlow` | 0.5 · 0.25 | below these flows, held `land.fallowAfterYears`, an oasis's gardens turn `commons` and its grove thins (V06 §3.12.1) |''',
 r'''| `spring.gardenMinFlow` · `spring.groveMinFlow` | 0.5 · 0.25 | below these flows — held `land.fallowAfterYears` — an oasis's gardens turn `commons`, and — held `land.scrubAfterYears` — its grove thins (V06 §3.12.1) |'''),
# ---- VV56-07 (item 119 (a2)), VV56-21, VV56-22: the estimate's rows
('VV56-07 §2.2 advance.maxEpochs',
 r'''| `advance.maxEpochs` | 200 | the most epochs one `advance` expands to; above it the cadence bends (V06 §3.3.2) |''',
 r'''| `advance.maxEpochs` | 200 | the most epochs one `advance` expands to; above it the cadence bends (V06 §3.3.2) — at the reference cost rows the comfort estimate binds first (V06 §6.8) |'''),
('VV56-07+21+22 §2.2 cost and budget rows',
 r'''| `replay.epochCostMs` | TOWN and the village rungs 140 · CITY 420 · METROPOLIS 1 300 | the per-epoch cost the replay's estimate sums, by the epoch's rung (V06 §3.20.4, V06 §6.7) |
| `replay.budgetMs` | TOWN and below 5 000 · CITY 20 000 · METROPOLIS 40 000 | the replay's budget by the peak's rung; above it the epochs coarsen (V06 §3.20.4, V06 §6.7) |''',
 r'''| `epoch.costMs` | TOWN and the village rungs 150 · CITY 430 · METROPOLIS 1 310 | the per-epoch cost both comfort estimates sum — an `advance`'s and the history replay's — by the rung of the epoch's target: V06 §6.1's total with V06 §6.2's participants, rounded up to the next 10 ms (V06 §6.7, V06 §6.8) |
| `epoch.islandMs` | TOWN and CITY 230 · METROPOLIS 260 | added per epoch for each island that may stand: one resize with its generated accesses' tops and feet (V06 §6.2's worst case) (V06 §6.8) |
| `epoch.handAccessMs` | 60 | added per epoch for each hand-placed access standing at the request: its top's and its foot's placements at V05 §6's 30 ms each, at its island's resize (V06 §6.2, V06 §6.8) |
| `epoch.stageMs` · `epoch.stageMsPerBuilding` | 6 · 0.06 | the growth stages in the estimate: per epoch whose target rises, plus per building the rises add (§12.6's scoped law; V06 §6.2, V06 §6.8) |
| `advance.budgetMs` | 9 000 | an `advance`'s share of item 119's ten-second comfort level; above it the cadence coarsens (V06 §3.3.2, V06 §6.8) |
| `replay.budgetMs` | TOWN and below 9 000 · CITY 8 500 · METROPOLIS 7 000 | the replay's share of the comfort level by the peak's rung — the ten seconds less the peak's generation and first map at the rung's band top (§12.3, §12.5) and a 500 ms reserve; above it the epochs coarsen (V06 §3.20.4, V06 §6.7, V06 §6.8) |'''),
('VV56-07 §2.2 not calibratable',
 r'''**Not calibratable** (J-V6.111). Sixteen columns and one row set carry `calibratable: false` in their `ColumnSpec`
(V11 §2.1), so V12 §3.11's lint asks no register entry of them and no run may name them (V12 §3.7.2 (1)): the cost and
recording bounds `advance.maxEpochs`, `history.checkpointStride`, `uses.openCandidates`, `uses.moveWhyRows`,
`replay.maxEpochs`, `replay.detailRetainYears`, `replay.epochCostMs`, `replay.budgetMs` and the `chronicle.*` shares (they shape the cost or the non-canonical
report, never a history's meaning);''',
 r'''**Not calibratable** (J-V6.111). Twenty-one columns and one row set carry `calibratable: false` in their `ColumnSpec`
(V11 §2.1), so V12 §3.11's lint asks no register entry of them and no run may name them (V12 §3.7.2 (1)): the cost and
recording bounds `advance.maxEpochs`, `history.checkpointStride`, `uses.openCandidates`, `uses.moveWhyRows`,
`replay.maxEpochs`, `replay.detailRetainYears`, the comfort estimate's `epoch.costMs`, `epoch.islandMs`,
`epoch.handAccessMs`, `epoch.stageMs`, `epoch.stageMsPerBuilding`, `advance.budgetMs` and `replay.budgetMs`, and the
`chronicle.*` shares (they shape the cost, the cadence a long run takes under item 119's comfort level, or the
non-canonical report, never a history's rules);'''),
# ---- VV56-02 + VV910-04: the device defaults, homed at V09 §5.12
('VV56-02+VV910-04 §2.2 device settings',
 r'''V11's (V06 §2.14). The history store's memory and frame settings are per-device app settings (V09 §9), outside the recipe,
the log and every digest: they change what is cached, never what is drawn.''',
 r'''V11's (V06 §2.14). The history store's memory and the frames kept in memory are per-device app settings — V09 §5.12's,
by default 256 MB on the desktop tier, 96 MB on the low-end tier and 8 frames (V09 §2.11's `AppPrefs.history`) — outside
the recipe, the log and every digest: they change what is cached, never what is drawn.'''),
# ---- §2.10: VAT0-09 (the afterGrowth case), VV56-07 (the cadence chosen reported)
('VAT0-09 §2.10 undergroundVacated',
 r'''undergroundVacated: number /* vacated by under.undercity's re-read, a foundation collapse or a void made lost, and re-housed inside the participant (V06 §3.18.1 (4), (6)) */;''',
 r'''undergroundVacated: number /* vacated by under.undercity's re-read, a foundation collapse or a void made lost after `siting`, and re-housed inside the participant (V06 §3.18.1 (4), (6)) */;'''),
('VV56-07 §2.10 replay and advance sections',
 r'''  replay?: { index: number; of: number; events: number; refounded: boolean; buried: number /* BuriedFormer.lay systems laid */; detail: 'model'|'full' /* V06 §3.20.4 */ } /* a replay epoch only (V06 §3.20) */;''',
 r'''  replay?: { index: number; of: number; events: number; refounded: boolean; buried: number /* BuriedFormer.lay systems laid */; detail: 'model'|'full' /* V06 §3.20.4 */;
    epochYears: number /* the plan's epoch length (ReplayPlan.epochYears) */; coarsened: boolean /* longer than history.epochYears (V06 §3.20.1 (3), V06 §6.8) */ } /* a replay epoch only (V06 §3.20) */;
  advance?: { index: number; of: number; cadenceWeeks: number /* the cadence the group folds at */; requestedWeeks: number /* the cadence asked, after advance.maxEpochs' bend */;
    estimateMs: number /* V06 §6.8's estimate at cadenceWeeks */ } /* an advance group's epochs (V06 §3.3.2): the cadence chosen reported, coarsened when cadenceWeeks > requestedWeeks */;'''),
# ---- §2.12
('VAT0-13 §2.12 Way.surface', r'''(V06 §3.4 (9): a `setAttr`, author `engine`, cause `rule:field`,''', r'''(V06 §3.4 (9): a `setAttr`, author `epoch`, cause `rule:field`,'''),
('VV56-15 l820', r'''`locate`, the frame builder and a group's undo after a reload (V06 §3.15.2, §4.1) |''', r'''`locate`, the frame builder and a group's undo after a reload (V06 §3.15.2, V06 §4.1) |'''),
('VV910-04 §2.12 device row', r'''| the device's history settings (store MB, frames) | V09's settings panel (V09 §9) |''', r'''| the device's history settings (store MB, frames) | V09's settings panel (V09 §5.12; V09 §2.11's `AppPrefs.history`) |'''),
('VDC0-25 §2.12 uniform', r'''| a reason key's uniform | the base's raised-way stream, keyed by the `RaisedReasonKey`, epoch component 0 (V06 §3.16) |''', r'''| a reason key's uniform | `raised.reason` (§6.1), keyed by the `RaisedReasonKey`, epoch component 0 (V06 §3.16) |'''),
# ---- §2.13: VAF-R0S-06 (RaisedKind and RaisedReasonKey are §2.7's)
('VAF-R0S-06 §2.13',
 r'''type RaisedKind = 'viaduct'|'elevated'|'aqueduct';
interface RaisedReasonKey { kind: RaisedKind; a: Id; b?: Id }
  // viaduct:''',
 r'''// RaisedKind and RaisedReasonKey { kind: RaisedKind; a: Id; b?: Id } are §2.7's (beside RaisedWayRecord); this volume's readings fill a and b:
  // viaduct:'''),
# ---- §2.14: VV56-20 (destroy's threshold), VV56-07 (the epoch length chosen)
('VV56-07 §2.14 coarsened',
 r'''  coarsened: boolean /* the span needed more than replay.maxEpochs epochs of history.epochYears, so the epoch length grew (V06 §3.20.1) */ }''',
 r'''  epochYears: number /* the epoch length the plan runs at: history.epochYears, or the coarsened length (V06 §3.20.1 (3)) */;
  coarsened: boolean /* epochYears > history.epochYears: the span needed more than replay.maxEpochs epochs, or the estimate exceeded replay.budgetMs (V06 §3.20.1 (3), V06 §6.8) */ }'''),
('VV56-20 §2.14 severityScale',
 r'''  severityScale: [number, number] /* the effect's scale at severity 0 and 1, linear between */ }''',
 r'''  severityScale: [number, number] /* the effect's scale at severity 0 and 1, linear between; for effect 'destroy', the first end is the severity at or above which the event destroys, below it recorded only (V11 §3.25.2) */ }'''),
]
