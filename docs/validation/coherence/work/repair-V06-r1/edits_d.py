# §3.19.2 (1), §4, §6
EDITS = [
# ---- the binding: the engine's way and raised-way hand edits are T9 `shape`'s (VAT-17, VV56-10)
('VV56-10 §3.19.2 (1)', r'''landfall, and the user repairs it by hand (T4's inspector, "repair").''', r'''landfall, and the user repairs it by hand (T9 `shape`'s inspector, **Repair**; V06 §4.2).'''),
('VAT-17+VV56-10 §4.2 lane',
 r'''| let a lane go, bring it back | T4 `road`'s class chip on a way (`path` ↔ its former class) |''',
 r'''| let a lane go, bring it back | T9 `shape`'s class chip on a selected way (`path` ↔ its former class; §7.1's binding, V09 §4.3) |'''),
('VV56-10 §4.2 repair raised',
 r'''| repair a raised way or a deck by hand | T4's inspector on a raised way ("repair"), on a bridge or pier ("rebuild the deck") |''',
 r'''| repair a raised way or a deck by hand | T9 `shape`'s inspector on a raised way (**Repair**), on a bridge or pier (**Rebuild the deck**; §7.1's binding, V09 §4.3) |'''),
# ---- §4.1: VV56-07 (the cadence chosen; progress; the accept's wait)
('VV56-07 §4.1 appends',
 r'''* **What it appends.** One `group` (§7.4) of `epoch` events, one per cadence step (V06 §3.3.2), each folded before the
  next is built and each carrying `EpochInputs.advance`; the trajectory rides on the first. The app runs it as a
  cancellable background job in the generation worker with a progress bar over the epochs;''',
 r'''* **What it appends.** One `group` (§7.4) of `epoch` events, one per step of the cadence V06 §3.3.2 chooses (the comfort
  level's coarsening included, V06 §6.8), each folded before the next is built and each carrying `EpochInputs.advance`;
  the trajectory rides on the first. The app runs it as a cancellable background job in the generation worker, the
  progress view (V09 §4.21.9) counting its epochs past one second;'''),
('VV56-07 §4.1 preview',
 r'''document (item 101's three-variations rule applied to time). Above `advance.maxEpochs` the card bends the cadence and
  says so (V06 §3.3.2).''',
 r'''document (item 101's three-variations rule applied to time). Where `advance.maxEpochs` or the comfort level needs a
  coarser cadence, the card bends it and says so with the cadence chosen (V06 §3.3.2); each variation's run takes its own
  estimate's cadence (V06 §6.8), the first shown as it completes. **Accept** appends the chosen variation's epochs: while
  the document's head is still the preview fork's base, the commit takes the fork's folded state with its history images
  and reports — the same events folded from the same state give the same bytes (§6.5), and the verification replay
  re-checks them off the path (V06 §3.15.2) — so the accept's wait is its commit; otherwise the epochs fold again under
  the estimate the preview ran with.'''),
# ---- §4.5: S7
('S7 §4.5', r'''`rerunFrom` and the hand forms of 4.2 as ghosts;''', r'''`rerunFrom` and the hand forms of V06 §4.2 as ghosts;'''),
# ---- §6 head: VV56-07 (targets, the comfort level, no veto)
('VV56-07 §6 head',
 r'''on the golden TOWN, B-CITY and METROPOLIS seeds with a scripted 100-year history (+1 % a year, then −1 %, then +1 %);
every miss re-declares its row for the owner's veto with the fallback stated (D-18).''',
 r'''on the golden TOWN, B-CITY and METROPOLIS seeds with a scripted 100-year history (+1 % a year, then −1 %, then +1 %).
Every row below is a **target** — as fast as possible (item 119 (a)); the two waits a user sits through once that this
volume makes, an `advance` and a history-first generation, each finish inside §12's ten-second **comfort level** in total,
whatever their span, by V06 §6.8's estimate and coarsening (item 119 (a2); J132). A row E0 measures above its target is a
declared target miss inside the comfort level (D-18), with its pre-decided fallback stated; a step runs slower than its
target only for a recorded measured gain (item 119 (b); §12.10); the interactive rows of 6.4 keep their budgets (item 119
(d)).'''),
('VV56-07 §6.1 fallback', r'''declared shift for the owner's veto); then the move re-score''', r'''declared shift by §13.3's protocol, the miss it answers a declared target miss inside the comfort level); then the move re-score'''),
# ---- §6.2: VV56-22 (V07's participants), VV56-03 + VV56-08 (the century's derivation and its access bound), VV56-07
('VV56-22 §6.2 intro', r'''these are the sums this volume's century bound assumes, PLAUSIBLE until E0):''', r'''these are the sums this volume's century targets and V06 §6.8's `epoch.costMs` assume, PLAUSIBLE until E0):'''),
('VV56-22 §6.2 rows',
 r'''| `sky.clearance` (≤ 3 islands) | 3 | 3 | 3 | ≤ 1 ms per island (V05 §6) |
| **participants total** (the per-event island work excluded) | **≤ 34** | **≤ 75** | **≤ 151** | |''',
 r'''| `sky.clearance` (≤ 3 islands) | 3 | 3 | 3 | ≤ 1 ms per island (V05 §6) |
| `village.plan` (scope: a village rung) | 0 | 0 | 0 | V07 §6: no ops at TOWN and above — its gate's one early return |
| `village.density` (scope: a superseded `VillagePlan`, under any product) | 6 | 6 | 6 | V07 §6: ≤ 6 ms p95 at a base-product epoch while a superseded `VillagePlan` stands (VS2's raster over the old core's box); 0 without one |
| `village.pins` (scope: a village rung) | 0 | 0 | 0 | V07 §6: no ops at TOWN and above (≤ 2 ms inside a village epoch) |
| **participants total** (the per-event island work excluded) | **≤ 40** | **≤ 81** | **≤ 157** | |

A village-rung epoch is V07 §6's (≤ 60 ms at the VILLAGE target, its participants inside), below TOWN's row, which bounds
it in V06 §6.8's estimate.'''),
('VV56-03+08+07 §6.2 century',
 ('BETWEEN', '**A century** (100 epochs at the port\'s 52-week cadence', '**6.3 Replay and load.**'),
 r'''**A century** (100 epochs at the port's 52-week cadence at a town growing 1 % a year, growth stages and participants
included; hand edits during the span excluded — each is an edit at its own row; item 110's rows add ≈ 0.7 / 1.3 / 2.6 s of
epoch work and at most one course solve per founding, ≤ 4 per century at METROPOLIS):
* **The sky's island events**, derived from V05 §6's rows (their home; J-V6.118), the CITY / METROPOLIS columns, a TOWN
  reading CITY's (its islands no larger): "a resize, a rim reshape" — ≤ 5 ms + §12.6's scoped regeneration of each
  receiving district and of the district whose institution claim is re-searched (at most k ≤ 3 in all) + §12.6's
  scoped-regeneration law once over the plots the event re-cuts outside those districts + 30 ms per re-claimed landing
  yard's top placement (one per access) + 30 ms per re-landed foot's placement; "`fallIsland`" ≤ 80 / 110 ms; a raise at
  `raiseIsland`'s parts, bounded by "declaring an island after generation" ≤ 120 / 160 ms. With an island's buildings
  ≤ 5 % of the town's (V05 §6's unit-run row: ≈ 2–5 % of the town's plots) at the default request's buildings (§12.5's
  table: ≈ 1 500 at TOWN, ≈ 6 000 at CITY, ≈ 15 000 at METROPOLIS), ≤ 300 / 750 at CITY / METROPOLIS, §12.6's law
  (≤ 3 ms + 60 µs × the buildings in scope, plus ≤ 3 ms of deltas, once per district) gives a growing resize re-deriving
  all three of its districts ≈ 3 × 6 ms + 60 µs × 300 / 750 ≈ 36 / 63 ms, and a shrink re-deriving at most the claim's
  district (a third of the island) ≈ 12 / 21 ms; the plots re-cut outside those districts, one scope, are a growing
  resize's yards' (≤ 3 plots a yard by V05 §6's basis, ≤ 9 buildings: ≈ 7 ms) and a shrink's rim ring (its eroded band
  ≤ 0.025 · r a year, below; at most a third of the island: ≈ 12 / 21 ms). **The access bound:** the century is priced
  on an island's **generated** accesses, at most `accessCount.max` (3; V05 §2.4) — each yard's top placed and each foot
  re-landed, 3 × 30 ≈ 90 ms for the tops and as much for the feet — so a growing resize costs ≈ 5 + 36 + 7 + 90 + 90 ≈
  228 ms at CITY and ≈ 5 + 63 + 7 + 90 + 90 ≈ 255 ms at METROPOLIS, a shrink ≈ 5 + 12 + 12 + 90 + 90 ≈ 209 ms and
  ≈ 5 + 21 + 21 + 90 + 90 ≈ 227 ms. **Each hand-placed access** (at most `accessCount.handMax`, 6 an island; V05 §4.2,
  J-V5.82) is the user's own edit, priced beside the bound at V05 §6's row: 30 ms for its top and 30 ms for its foot at
  each resize of its island, ≈ 60 ms a resize (its yard's ≤ 3 plots inside the rounding) — at the cap + 360 ms a resize
  (≈ 588 ms for a growing resize at CITY), so an island with six hand-placed accesses resized at every epoch adds
  ≈ 36 s to a century at the port's cadence; V06 §6.8's estimate charges it for the accesses that stand
  (`epoch.handAccessMs`).
* **V05 §4.2's re-landing rule bounds nothing below one re-landing per foot per resize.** A vertical access's foot
  re-lands only when its top's move leaves its landing plot (a slanted one only past its run), but a resize moves the rim
  by the buffer distance, at most `growthPerYear` · years · A ÷ P ≤ 0.025 · years · r for the disc of the island's area
  (the least perimeter for an area; V05 §2.4's dynamics row), ≈ 4.5 m a year at CITY's `areaHaMax` and ≈ 6.3 m at
  METROPOLIS's, while a ground plot may be 3 m wide (§15.2's O5 (b)), and a top moves along its ray at least as far as the
  rim does, so one resize can carry a foot off its plot; over a century the rim can travel 2.5 · r (≈ 450 / 630 m),
  ≈ 150 / 210 least plot widths, more than the century's 100 resizes; and a target that moves back and forth carries a
  foot across the same plot line at every resize. So the worst case is every island resized at every epoch with every
  yard's top placed and every foot re-landed. **A fall does not raise it:** a fall ends a settled dwell of at least 10
  years in which the island is not resized (V05 §3.15 (3)–(4); V05 §2.4's dynamics row), and a fall with a raise in one
  epoch (≈ 80 + 120 / 110 + 160 ms) costs less than the ten resizes the dwell forgoes. So, at worst: **CITY** 3 × 100 ×
  228 ms ≈ 68.4 s; **METROPOLIS** 3 × 100 × 255 ms ≈ 76.5 s; **TOWN**, whose rung row admits no island (V05 §3.15 (1): the
  target 0, and no slot re-opens), each of ≤ 3 carried or declared islands waning once — a shrink at each of ≤ 15 epochs of
  the longest waning dwell — then settling and falling: 3 × (15 × 209 + 80) ms ≈ 9.6 s. In a history whose islands resize
  one epoch in five or fewer (V05's hysteresis 0.05 against a target that follows a town growing 1 % a year), the sky's
  share is about a fifth of these.
* **The growth stages** at §12.6's law (V06 §6.1): ≤ one stage an epoch at ≤ 6 ms each plus 60 µs × the buildings the
  century adds (≈ 1.7 × the default request: ≈ 2 500 / 10 000 / 25 000) ≈ 0.75 / 1.2 / 2.1 s.
* **The sum** — the century's cost at the port's cadence, the target its rows add up to: TOWN 100 × (103 + 40) ms +
  0.7 s + 9.6 s + 0.75 s ≈ 25.4 s; CITY 100 × (343 + 81) ms + 1.3 s + 68.4 s + 1.2 s ≈ 113.3 s; METROPOLIS 100 × (1 150 +
  157) ms + 2.6 s + 76.5 s + 2.1 s ≈ 211.9 s, each hand-placed access adding its 60 ms a resize beside them. No user waits for
  these sums: an `advance` of a century folds at the cadence V06 §6.8's estimate admits, inside the ten-second comfort level
  in total — in steps of several years where these sums say a year at a time would not fit (V06 §6.8 (4)).
The century runs as a background job with progress past one second (V09 §4.21.9), never blocking the picture or an edit
on another document; the map redraws each epoch's `DisplayDelta` as it folds (the user watches the town grow).
`advance.maxEpochs` bounds one request's epochs; a longer span bends its cadence (V06 §3.3.2).

'''),
('VV56-07 §6.3', r'''§6.2's CITY century bound after load (its island events included),''', r'''§6.2's CITY century sum after load (its island events included),'''),
('VV56-02+VV910-04 §6.5', r'''**6.5 Memory.** The history store ≤ the device's setting (V09 §9) in memory,''', r'''**6.5 Memory.** The history store ≤ the device's setting (V09 §5.12: 256 MB desktop, 96 MB low-end; V06 §2.2) in memory,'''),
# ---- §6.7 rewritten, §6.8 new: VV56-07, VV56-21, VV56-22
('VV56-07+21+22 §6.7 and §6.8',
 ('BETWEEN', '**6.7 The history replay at generation**', '## 7 Tests and acceptance bars'),
 r'''**6.7 The history replay at generation** (item 113; V06 §3.20.4). A coarse replay epoch costs about one epoch of 6.1 and
6.2 at its rung — its phases run once however many years it spans, only its deltas growing — plus its stage at §12.6's
law, and less at model level (no Works, no lazy rung, no images). The per-epoch cost rows `epoch.costMs` (our own, not
calibratable: a cost bound; read by both of V06 §6.8's estimates) are TOWN and the village rungs 150 ms, CITY 430 ms,
METROPOLIS 1 310 ms — 6.1's total with 6.2's participants (≤ 143 / 424 / 1 307 ms), rounded up to the next 10 ms; the
replay's share of the comfort level, `replay.budgetMs` by the peak's rung, is TOWN and below 9 s, CITY 8.5 s,
METROPOLIS 7 s (V06 §6.8 (2)). So, at the owner's decade (V11's `history.epochYears`), the sky layer off: a town's
history of 300 years (30 epochs at TOWN, ≈ 4.5 s, with its growth's stages ≈ 4.8 s) fits whole; a city-to-village history
like H-HISTORY's (25 epochs, about ten of them at CITY: ≈ 4.3 + 2.3 ≈ 6.6 s) fits whole; a metropolis grown from its
founding over 300 years — about ten epochs each at TOWN, CITY and METROPOLIS, ≈ 18.9 s, and its 35 000 buildings' stages
≈ 2.1 s — runs in 50-year epochs (six, ≈ 5.9 s); with the sky layer on, every epoch from the first at CITY also charges
three islands' resizes (V06 §6.8 (1)), coarsening a city's or a metropolis's history further. The peak's generation
(S0–S13a) is §12.3's one-click cost at the peak's size, before the replay, and the present's first map §12.5's, after it
— both inside the ten seconds by `replay.budgetMs`'s derivation. The replay runs with progress in the generation worker
before the first map (V06 §3.20.4); PLAUSIBLE until E0 times the three golden histories of T-V6-71 (a city-to-village
history, a refounded one, a metropolis in decline), the measured wait a bar (T-V6-24), never an input. *Pre-decided
fallback:* `replay.detailRetainYears` halves (fewer full epochs), then the per-epoch cost rows rise to the measured costs,
coarsening further — the history's events and targets kept, only its grain coarser.

**6.8 The comfort level — `advance` and the history replay in total** (item 119 (a), (a2): the owner's "Total",
2026-10-01; J132; J-V6.135). §12's ten-second comfort level binds each of this volume's two one-time waits, from the click
to the complete result — the map's final complete frame — on §12.1's reference hardware, at every rung to the metropolis
cap: an **`advance`** (the time card's Accept, the clerk's, the CLI's; V12's `wait.advanceTime`) and a **history-first
generation** (the start's generation, the replay and the present's first map; V12's `wait.historyReplay`). The rows of
6.1–6.7 stay the targets; this is how both waits stay inside the ten seconds whatever span they are given:
1. **The estimate** — one function for both, of the epochs it is given and of the document (an `advance`) or the recipe
   (the replay) at the request, never of a measured time, so the cadence it decides is deterministic and a replay of the
   log folds the same epochs:
   `E = Σ_i (epoch.costMs[r_i] + I_i × epoch.islandMs[r_i] + H × epoch.handAccessMs) + epoch.stageMs × g +
   epoch.stageMsPerBuilding × ΔB`, where
   * `r_i` is the rung of epoch i's target by the registered products' ladders (§1.1's router; a village rung reads TOWN's
     row);
   * `I_i` is the islands that may stand at epoch i: V05's three slots (V05 §3.2) at every epoch from the first whose rung
     is CITY or METROPOLIS while the recipe's `layers.islands` is on — islands carried below CITY wane, settle and fall over
     later epochs (V05 §3.15) — and before it the islands standing at the request: an `advance`'s document's, none in a
     replay (a start below CITY generates none, II.6 (2)); each may resize at every epoch (V06 §6.2's worst case);
   * `H` is the hand-placed accesses standing at the request (an `advance` only; a replay runs before any edit), each
     re-landed at each resize of its island (V06 §6.2's edit-borne cost);
   * `g` is the epochs whose target rises above the previous one (each may grow a stage) and `ΔB` the buildings the rises
     add, Σ max(0, target_i − target_{i−1}) ÷ 3.4 (§12.2's persons a building) — §12.6's scoped law for the stages
     (V06 §6.2's growth term), the one part a coarser cadence does not shrink.
2. **The budgets.** `advance.budgetMs` (9 000 ms) leaves one second of the ten for the expansion and the estimate, the
   last epoch's redraw (§12.5's settle, ≤ 250 ms at METROPOLIS) and the group's commit; `replay.budgetMs` by the peak's
   rung (TOWN and below 9 000, CITY 8 500, METROPOLIS 7 000 ms) leaves the start's generation and the present's first map
   at the rung's band top (§12.5's T(B): 246 / 589 / 2 290 ms) and a 500 ms reserve for the `HistoryRecord`, the report
   and the commit. The history images an epoch writes (V06 §3.15.2) are captured in its commit as copy-on-write
   references and compressed into the store after the wait completes, at background priority, so no image costs the
   wait (the store is non-canonical; until compressed, a frame reads the references).
3. **The coarsening.** An `advance`'s cadence (V06 §3.3.2) becomes the smallest whole number of weeks, tried upward from
   the cadence asked (after `advance.maxEpochs`' bend), whose epochs' `E` is at most `advance.budgetMs`; the replay's
   epoch length (V06 §3.20.1 (3)) the smallest whole number of years, tried upward from `history.epochYears`, whose
   epochs' `E` is at most `replay.budgetMs[the peak's rung]` and whose count is at most `replay.maxEpochs`. One epoch over
   the whole span always fits: its `E` is at most 1 310 + 3 × 260 + 18 × 60 + 6 + 0.06 × 35 000 ≈ 5.3 s at the metropolis
   cap with the hand-placed cap on three islands, inside both budgets — so no request is refused and no span shortened
   (item 101 R2). The cadence chosen is reported: the card's and the clerk's one line, `EpochReport.advance`,
   `ReplayPlan.epochYears` and the report's `replay.epochYears` (V06 §2.10, V06 §2.14); V09's progress view counts the
   epochs at it.
4. **What a user sees** (at the reference rows; PLAUSIBLE until E0): a century held at its size, the sky layer off, folds
   at TOWN in 87-week steps (60 epochs, ≈ 9.0 s), at CITY in 5-year steps (20, ≈ 8.6 s) and at METROPOLIS in ≈ 17-year
   steps (6, ≈ 7.9 s); with the sky layer on, at CITY in 12½-year steps (8) and at METROPOLIS in 25-year steps (4); a
   growing century coarser by its stages' share; a ten-year advance at TOWN keeps its yearly cadence (≈ 1.5 s); the
   replay as 6.7's examples.
5. **Progress and Stop** — past one second, the progress view (V09 §4.21.9): an `advance`'s epochs ("Year {year} of
   {years}", at the cadence chosen), each epoch's `DisplayDelta` drawn as it folds; the replay's ("Replaying the town's
   past: {year}"); Stop ends an `advance` after the running epoch (V06 §4.1); a cancelled history-first generation leaves
   no document (V06 §3.20.4).
6. **Slower only for a measured gain; the low tier; the dossier's clock** (item 119 (b), (e)). This volume declares no
   step slower than its target for a gain; a cost row E0 raises (the fallbacks of 6.1 and 6.7) coarsens the cadence further,
   inside the comfort level, never relaxing it. The low tier aims at the same ten seconds; a size it cannot reach is
   declared per device (§12.1). A dossier-bound document's epochs are the port's cadence (§4.11 *The clock*) and are never
   coarsened — the host's clock owns its time (item 20) — each priced at 6.1–6.2 inside §12's waits for a dossier change
   and an open from SettlementForge.

'''),
]
