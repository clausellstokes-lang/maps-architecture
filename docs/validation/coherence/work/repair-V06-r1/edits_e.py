# §7 tests: VAP-01 + VV56-23 (the take-over), VAP-18 (the pins), VAT0-01 (T-V6-34), VV56-07 (T-V6-23, -24, -71)
TAKEOVER = r'''pin; nightly the rest; the statistics bench weekly on 200 seeds (§13.8).

**The base bars these tests take** (§13.2's take-over table, the evolution row; each test names the bar and the clause it
takes there too):

| base bar | taken by | the clause it takes |
|---|---|---|
| T8-1 | T-V6-70 (f) | every `DeclineOp` kind the strike pool applies over H-100's decline undone with its epoch to byte identity |
| T8-2 | T-V6-7 | the regrowth-first fixture over epochs: no new face while the old plan holds capacity, each band's vacancy share kept |
| T8-3 | T-V6-3 | over H-100's epochs every ruin, trace and superseded ring keeps its address; no cleared building tombstoned unless demolished or succeeded; a front building made a trace or demolished frees its passage |
| T8-4 | T-V6-5 | the exposure field monotone in each driver's weight, its chance share the table's |
| T8-5 | T-V6-6 | the salvage ledger's credits equal the yields of the robbed and the cleared, never negative, every shortfall reported |
| T8-6 | T-V6-30 | a CITY fallen below 10 000 inhabitants loses its islands over their dwell spans, never in one epoch |
| T8-7 | T-V6-5 | after a fall no building with a surviving household reads `vacant`; every `relet` down stales an unstored plan and re-cuts a stored one inside its event |
| T17-2 | T-V6-4; T-V6-13 | a pinned assignment never moves under an epoch (T-V6-4); the `use` row of the churn cap holds (T-V6-13) |
| T17-3 | T-V6-2 | one seed with one circumstance timeline replays to one digest of openings, closings and moves |
| T18-1 – T18-4, the epoch-spread form | T-V6-15 | each `MutationPlan` step keeps the kept parts byte-identical, touches nothing outside its scope and never subtracts a locked part; the return applies the inverse; the steps in full equal the one-shot mutation of the same record |
| T20-2, its epoch clause | T-V6-27 | a rejection lapses at the first epoch past the roster tolerance and on no drift inside it; the undo of a lapsing epoch with no dossier event restores the hold |
| T20-6, its epoch clause | T-V6-27; T-V6-4 | a dossier-backed use never closed, its building emptied or removed only after it moved (T-V6-4, T-V6-27); an `undo` naming an epoch that carried a dossier event F-EDIT (T-V6-27) |
| T25-1 | T-V6-18 | an epoch's `reclaim` and `siltReach` byte-identical outside their footprint and undone exactly with the epoch |
| T31-2, T31-3, T31-9 – T31-11 | T-V6-29 | granularity within each band's target; the churn caps per kind, district and block; the floor's bars — at every epoch of the soak |
| T31-8 | T-V6-26 | every class's replaceability and every ladder row's durations present, as the ladder phase reads them |
| T31-12 | T-V6-1 | with no epoch, `builtBand` the generation band and the geometry band the field band |
| T67-1, T67-3 | T-V6-21 | the stage drawn at week w a pure function of the Works and w; the old boundary shown until clearing |
| T67-2, T67-4, T67-6 | T-V6-19 | access at every week; rehousing before a demolition's first stage; the epoch's Works share and a decay Works' dwell band |
| T67-5 | T-V6-1; the parity paragraph below | no Works at generation and none under the parity presets |
| T70-1 – T70-4, over epochs | T-V6-32 | every informal cluster the overflow ladder or a stage makes over epochs |
| T72-1 – T72-9, their epoch clauses | T-V6-29 | the character step's output after every epoch of the soak |
| T76-1, its per-year clause | T-V6-25 | per-year rates give equal expected firings at 13-, 52- and 520-week cadence |
| T81-1 | T-V6-50 | a rung-crossing epoch grows the frame by §3.2 (9)'s batches, every address and ring outside the growth kept |
| T108-4, over epochs | T-V6-45 | a promotion or a demotion by least disruption |
| T111-1 – T111-5, the epoch form | T-V6-72 | a failing spring weakens its pull over epochs; the `item111.water` pin on H-100 |
| T113-1 – T113-3, T113-6, T113-7 | T-V6-71 | the city-to-village fixture; one digest per seed and history on the five engines; the refounded fixture; a symbolic peak only with evidence; the `item113.history` pin |
| T114-1 – T114-5, T114-8 (item 114 (g)) | T-V6-73 | the transitions over epochs on H-WALLS; the `item114.condition` pin |
| T115-1, T115-2, across a rung change | T-V6-74 | no grand dwelling but the one manor at a village epoch, the manor only with a lord or a dossier record, across H-RUNG's rung changes |

| id | family | what | bar |'''

EDITS = [
('VAP-01+VV56-23 §7 opening',
 r'''## 7 Tests and acceptance bars

Families as §13 names them:''',
 r'''## 7 Tests and acceptance bars

They take over the base's evolution bars as §13.2 names them (the take-over table, the evolution row: T8-1 – T8-7, T17-2,
T17-3, T18-1 – T18-4's epoch-spread form, T20-2's and T20-6's epoch clauses, T25-1, T31-2, T31-3, T31-8 – T31-12,
T67-1 – T67-6, T70-1 – T70-4 over epochs, T72-1 – T72-9's epoch clauses, T76-1's per-year clause, T81-1, T108-4 over
epochs, T111-1 – T111-5's epoch form, T113-1 – T113-3, T113-6, T113-7, T114-1 – T114-5 and T114-8's epoch clause, and
T115-1 and T115-2 across a rung change), each test naming the bar and the clause it takes; the table after the fixtures
maps them. Families as §13 names them:'''),
('VAP-01 §7 take-over table',
 r'''pin; nightly the rest; the statistics bench weekly on 200 seeds (§13.8).

| id | family | what | bar |''', TAKEOVER),
# ---- clauses the take-over adds (VAP-01)
('VAP-01 T-V6-1',
 r'''(both applied at step (e), the lapse, character and Works steps run) | byte-identical model digest to the M4 golden on every M4 fixture and on the catch-up fixture's log |''',
 r'''(both applied at step (e), the lapse, character and Works steps run); with no epoch every plot's `builtBand` equals its generation band and its geometry band its field band, a town and a metropolis each resolving their own middle band (T31-12) | byte-identical model digest to the M4 golden on every M4 fixture and on the catch-up fixture's log; exact (T31-12) |'''),
('VAP-01 T-V6-2',
 r'''a failure at an epoch recurs identically at replay (V06 §3.17) | 0 mismatches over H-100 and 50 random trajectories |''',
 r'''a failure at an epoch recurs identically at replay (V06 §3.17); one seed with one circumstance timeline replays to one digest of openings, closings and moves (T17-3) | 0 mismatches over H-100 and 50 random trajectories |'''),
('VAP-01 T-V6-3',
 r'''an epoch with an empty touched set records its week and report and changes nothing else | 0 violations over H-100 |''',
 r'''an epoch with an empty touched set records its week and report and changes nothing else; over H-100 every ruin, trace and superseded ring keeps its address, no cleared building is tombstoned unless demolished or succeeded, and a front building the pool makes a footprint trace or demolishes leaves its passage with no `frontBuilding` and no base wing spanning it (T8-3's epoch form) | 0 violations over H-100 |'''),
('VAP-01 T-V6-4', r'''holding one entity changes no other entity's draws | 0 violations;''', r'''holding one entity changes no other entity's draws (T17-2; T20-6's epoch clause) | 0 violations;'''),
('VAP-01 T-V6-5',
 r'''extramural and flood-band dwellings empty first; a core dwelling can still empty | on 200 seeds: emptied-minus-kept mean `E` ≥ 0.1; core share of emptied > 0 in ≥ 5 % of seeds |''',
 r'''extramural and flood-band dwellings empty first; a core dwelling can still empty; the exposure field is monotone in each driver's weight and its chance share equals the table's (T8-4); after each fall of H-100 no building with a surviving household reads `vacant`, and every `relet` down marks an unstored plan rung `stale` and re-cuts a stored plan inside its own event (T8-7's epoch form) | on 200 seeds: emptied-minus-kept mean `E` ≥ 0.1; core share of emptied > 0 in ≥ 5 % of seeds; exact (T8-4, T8-7) |'''),
('VAP-01 T-V6-6',
 r'''the shares order use > building > plot boundary > street > wall | ordered, each adjacent pair within a declared tolerance of 0.01 absolute, in ≥ 90 % of seeds over a 60-year decline |''',
 r'''the shares order use > building > plot boundary > street > wall; the salvage ledger's credits equal the yields of the robbed and the cleared at every epoch, are never negative, and every shortfall is reported (T8-5) | ordered, each adjacent pair within a declared tolerance of 0.01 absolute, in ≥ 90 % of seeds over a 60-year decline; exact (T8-5) |'''),
('VAP-01 T-V6-7', r'''each band keeping its turnover share vacant |''', r'''each band keeping its turnover share vacant (T8-2's epoch form) |'''),
('VAP-01 T-V6-13', r'''the `use` cap holds per district |''', r'''the `use` cap holds per district (T17-2's churn-cap clause) |'''),
('VAP-01 T-V6-15',
 r'''a step due before the plan's creation clamps to it | exact |''',
 r'''a step due before the plan's creation clamps to it; each step keeps every kept part byte-identical, touches nothing outside its event's effective scope and never subtracts a locked part, and the steps applied in full give the design the one-shot mutation of the same record gives, byte-identical (T18-1 – T18-4's epoch-spread form) | exact |'''),
('VAP-01 T-V6-18',
 r'''the rates over 1 000 seed-centuries lie within ± 30 % of the table's | exact; within tolerance |''',
 r'''the rates over 1 000 seed-centuries lie within ± 30 % of the table's; every epoch-applied `reclaim` and `siltReach` is byte-identical outside its footprint, in the carve fixtures' form, and undoes exactly with its epoch (T25-1's epoch form) | exact; within tolerance |'''),
('VAP-01 T-V6-19',
 r'''no Works leaves a plot without access (T67-2) | KS p > 0.01; exact |''',
 r'''no Works leaves a plot without access (T67-2); a demolition's households are rehoused before its first stage (T67-4); on the hook fixture an epoch's share of buildings in works lies within ± 3 s.e. of growth × mean duration ÷ span, and a decay Works within its dwell band (T67-6) | KS p > 0.01; exact; within ± 3 s.e. |'''),
('VAP-01 T-V6-21',
 r'''a frame drawn after an undo and after a reload equals the replayed prefix's | exact |''',
 r'''a frame drawn after an undo and after a reload equals the replayed prefix's; the stage drawn at week w is a pure function of the Works record and w, reached directly or by scrubbing, and no model digest moves (T67-1); a merge or a split shows the old boundary until its clearing stage (T67-3) | exact |'''),
('VAP-01 T-V6-25', r'''cadence independence (item 76 (5)):''', r'''cadence independence (item 76 (5); T76-1's per-year clause):'''),
('VAP-01+VV56-07 T-V6-26',
 r'''every `EvolutionTable` row is read by a phase (a source scan);''',
 r'''every `EvolutionTable` row is read by a phase or V06 §6.8's estimate (a source scan), every class carrying a replaceability and every ladder row a duration per direction and replaceability as the ladder phase reads them (T31-8);'''),
('VAP-01 T-V6-27',
 r'''no dossier-backed use closes or goes unplaced at any batch (§5.3's row) | 0 violations on H-DOSSIER |''',
 r'''no dossier-backed use closes or goes unplaced at any batch (§5.3's row); a rejection lapses at the first epoch whose population target has moved past the roster tolerance (± 5 %) from the one it recorded, a drift inside it lapsing nothing, and an undo of a lapsing epoch that carried no dossier event restores the hold (T20-2's epoch clause); an `undo` naming an epoch that carried a dossier event returns F-EDIT and changes nothing (T20-6's epoch clause) | 0 violations on H-DOSSIER |'''),
('VAP-01 T-V6-29',
 r'''the digest is stable across replays | 0 violations |''',
 r'''the digest is stable across replays; at every epoch granularity lies within each band's target ± tolerance and the churn caps hold per kind, district and block (T31-2, T31-3); the floor's bars hold over the soak — no rung-1 or rung-2 event moves a plot's frontage edge or shrinks a shell toward a poorer band, `builtBand` is the new stock's after a building rung 3 and the kept member's after an `amalgamate` that builds nothing, and a rich → poor → rich run with no rung-3 event leaves rings and shells byte-identical (T31-9 – T31-11); the character step's output after every epoch passes T72-1 – T72-9's epoch clauses — the vector recomputed from the saved model equal, a name changed only past the hysteresis or by a rename, every building's prosperity-driven state inside its district's band range, every household an epoch places inside its district's written range | 0 violations |'''),
('VAP-01 T-V6-30',
 r'''the island and underground laws' ops commit in their step (V05 §3.15, V04 §3.10) | exact |''',
 r'''the island and underground laws' ops commit in their step (V05 §3.15, V04 §3.10); on the sky fixture a CITY dropped below 10 000 inhabitants loses its islands over their dwell spans — waning, settled, fallen — never in one epoch (T8-6) | exact |'''),
('VAP-01 T-V6-32',
 r'''houses everyone (tent belt) and reports it | 0 unhoused |''',
 r'''houses everyone (tent belt) and reports it; every informal cluster the overflow ladder or a stage makes over epochs gives each structure its own door on a footpath reaching an access edge, keeps the fire-gap minimum and the households per structure within its row and capacity, and stands on no plot whose geometry floor is the middle band or above, in no district whose band range excludes the squalid band and in no wall strip (T70-1 – T70-4 over epochs) | 0 unhoused; 0 violations |'''),
('VAP-01 T-V6-45', r'''the fishmonger's key is its alias and its shop keeps its use, unbound | 0 violations |''', r'''the fishmonger's key is its alias and its shop keeps its use, unbound (T108-4 over epochs) | 0 violations |'''),
('VAP-01 T-V6-50',
 r'''turns them on at that epoch at any cadence | 100 % of seeds; exact |''',
 r'''turns them on at that epoch at any cadence; an epoch whose target crosses a band upward changes the rung's row and grows the frame by §3.2 (9)'s batches, every entity outside the growth's region keeping its address and every face outside it its ring, owner and nested faces (T81-1) | 100 % of seeds; exact |'''),
('VAP-01 T-V6-70 (f)',
 r'''(f) decline with no candidate, one leaver and a spent cap, undone and reloaded;''',
 r'''(f) decline with no candidate, one leaver and a spent cap, undone and reloaded, and every `DeclineOp` kind the pool applies over H-100's decline undone with its epoch to byte identity (T8-1's epoch form);'''),
# ---- the pins (VAP-18)
('VAP-18 T-V6-12',
 r'''`w_sun` = 0, or item 111 (c)'s climate cell 0, leaves the field and the town byte-identical to a history without the mask;''',
 r'''`w_sun` = 0, or item 111 (c)'s climate cell 0, leaves the field and the town byte-identical to a history without the mask (the no-op pin `item102.sun`: H-100, registered by V06's E5 seat on V12 §3.7.8's engine);'''),
('VAP-18 T-V6-44',
 r'''| T-V6-44 | goldens | the web's no-op pin: with V11 §3.7.4's web off form applied an epoch is byte-identical to the history without item 105 | byte-identical |''',
 r'''| T-V6-44 | goldens | the web's and the spread's no-op pins, `item105.web` and `item107.spread` (H-100, registered by V06's E4 seat on V12 §3.7.8's engine): with V11 §3.7.4's web off form applied an epoch is byte-identical to the history without item 105, and with T107-4's cells at 0 too, to the history without items 105 and 107 | byte-identical |'''),
('VAP-18+T111 T-V6-72 head', r'''**springs and oases over epochs** (item 111 (b); V06 §3.12.1),''', r'''**springs and oases over epochs** (item 111 (b); V06 §3.12.1; takes T111-1 – T111-5's epoch form),'''),
('VAP-18 T-V6-72 pin',
 r'''shows no change (the no-op pin: byte-identical with the springs' rules removed on a spring-less site) | exact; byte-identical |''',
 r'''shows no change (a conformance clause: byte-identical with the springs' rules removed on a spring-less site); the no-op pin `item111.water` (H-100, registered by V06's E5 seat on V12 §3.7.8's engine): with V11 §3.24.0's `climate` dry cells off, H-100 is byte-identical to its off-state set | exact; byte-identical; byte-identical |'''),
('VAP-18 T-V6-73 head', r'''**walls by need and means** (item 114; V06 §3.7.7),''', r'''**walls by need and means** (item 114; V06 §3.7.7; takes T114-1 – T114-5 and T114-8),'''),
('VAP-18 T-V6-73 pin',
 r'''the item-114 cells at their neutral values reproduce the rules before item 114 byte for byte (the no-op pin) |''',
 r'''V11 §3.24.0's `walls.condition` off form reproduces the rules before item 114 byte for byte (the no-op pin `item114.condition`: H-100 and H-WALLS, registered by V06's E3 seat on V12 §3.7.8's engine) |'''),
('VV56-23 T-V6-74 head', r'''**the grandeur ceiling across a rung change** (item 115 (e); V06 §3.8.5),''', r'''**the grandeur ceiling across a rung change** (item 115 (e); V06 §3.8.5; takes T115-1 and T115-2 across a rung change),'''),
# ---- T-V6-71 (VV56-23, VAP-18, VV56-07)
('VV56-23 T-V6-71 head', r'''**the history replay at generation** (item 113; V06 §3.20): on H-HISTORY,''', r'''**the history replay at generation** (item 113; V06 §3.20; takes T113-1, T113-2, T113-3, T113-6 and T113-7): on H-HISTORY,'''),
('VV56-23 T-V6-71 engines', r'''two runs of the same seed and history are byte-identical, epoch by epoch;''', r'''two runs of the same seed and history are byte-identical, epoch by epoch, on the five engines (T113-2);'''),
('VAP-18+VV56-07 T-V6-71 pin and budget',
 r'''the no-op pin, V12's registration); the estimate stays within `replay.budgetMs` by coarsening, and the measured time within the budget on the reference hardware | exact; byte-identical; the reuse share above the baseline on 50 seeds; within budget (or re-declared, D-18) |''',
 r'''the no-op pin `item113.history`: the history fixtures, registered by V06's E9 seat on V12 §3.7.8's engine); the estimate stays within `replay.budgetMs` by coarsening, the epoch length chosen reported (`ReplayPlan.epochYears`, `replay.epochYears`), and the whole wait inside the comfort level (T-V6-24) | exact; byte-identical; the reuse share above the baseline on 50 seeds; within the comfort level |'''),
# ---- T-V6-23 and T-V6-24 (VV56-07)
('VV56-07 T-V6-23',
 r'''the preview's end state equals the committed end state | exact |''',
 r'''the preview's end state equals the committed end state, and an accept on an unchanged head takes the preview's folded state byte-identical to a re-fold; **the comfort level** (V06 §3.3.2, V06 §6.8): a request whose estimate exceeds `advance.budgetMs` folds at the smallest cadence that fits — the same cadence on every host and in a replay of the log, its epochs' weeks at it — its one line naming the cadence chosen and every epoch's `EpochReport.advance` carrying it and the cadence asked; a 500-year METROPOLIS request with three islands and the hand-placed cap folds, never refused or shortened | exact |'''),
('VV56-07 T-V6-24',
 r'''| T-V6-24 | performance | V06 §6's rows on the reference hardware, V06 §6.7's replay budget included | each row within budget or re-declared (D-18) |''',
 r'''| T-V6-24 | performance | V06 §6's rows on the reference hardware as targets (item 119 (f): its bars T119-1 – T119-5, §13.2, are taken by V12's T-V12-50 and V09's T-V9-79; this test is the volume's own measurement, read beside them): each row reported target met or target miss, a slower row only with its recorded gain, the interactive rows of V06 §6.4 unchanged; **the comfort level** (V06 §6.8): an `advance` of 1, 10, 100 and 500 years — held, growing 1 % a year and falling 1 % a year — and a history-first generation of H-HISTORY, H-REFOUND and a metropolis grown from its founding over 300 years, each at every rung's band top and at the metropolis cap, the sky layer off and on, timed from the click to the complete result (V12's `wait.advanceTime`, `wait.historyReplay`) | every row reported against its target (a miss a declared target miss, D-18); every wait's p95 ≤ 10 000 ms, its measured time at most its estimate plus its reserve (else the cost rows rise, V06 §6.7's fallback); progress within 1 000 ms of the click for every wait over one second |'''),
# ---- T-V6-34 (VAT0-01)
('VAT0-01 T-V6-34',
 r'''a lineage draws its dig once in its life across replays | monotone (V12's trend bar); 100 % causes; exactly one draw per (lineage, void kind) |''',
 r'''a lineage draws its dig once per void kind in its life across replays, plus once for each wing V02's mutator adds over a void | monotone (V12's trend bar); 100 % causes; exactly one draw per (lineage, void kind, added-wing key) |'''),
]
