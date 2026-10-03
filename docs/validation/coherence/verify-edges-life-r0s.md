# verify-edges-life-r0 — edge cases and combinations across time, the host, the tools and the tables (principle (11))

Lane `coherence/verify-edges-life-r0` (cloud continuation, 2026-10-03; first edge check after the rewrite). Members:
determinism (§5–§7), scope (§0, §1, §13–§17), V06, V08, V09, V10, V11, V12. Text checked: the live set as assembled by
`coherence/assemble-r0` (docs/ARCHITECTURE.md, docs/volumes/V*.md). Catalogue: docs/validation/coherence/edges.md and
edges.json.

## PROGRESS

- P0 inputs located (catalogue entries extracted per member; edges sections found): done
- P1 determinism: done (§5.1–§7.8 read whole; 33 U + 4 T + 39 combinations + the named one checked; 2 issues)
- P2 scope: done (§13.3, §13.5–§13.9 read; 8 U checked; 0 issues)
- P3 V06: done (§3.21 read whole, §3.3, §4.1–§4.4 read; T-V6-23, -70, -73, -74 checked; the catalogue closed; EL-08 and EL-10 from the lane-wide walks)
- P4 V08: done (§3.15 read whole; every cited test read; 2 issues)
- P5 V09: done (§3.16 read whole, §3.8 read; T-V9-17, -74, -76 read; 2 issues)
- P6 V10: done (§3.23 read whole, §4.1–§4.2, §6.3 read; T-V10-47–49 read; 0 issues)
- P7 V11: done (§3.26 read whole, §2.1's ColumnSpec, §4.1 read; T-V11-40 read; 1 issue)
- P8 V12: done (§3.15 read whole, §3.6b's levels read; T-V12-47, -48 read; 1 issue)
- P9 owner-named combinations and lane-wide walks (time, host, tools, tables): done (EL-08, EL-10 added; the rest routed to the member sections)
- P10 issue list, results JSON, LANDED: done

## Method

For each member: the catalogue's UNDEFINED and UNTESTED entries and its owned combinations (edges.json) were listed; the
member's edge subsection (or, for the base parts, the sections the rewrite report names) and the CURRENT text of every
mechanism an entry names were read whole; each entry was checked for (1) a defined outcome, (2) a rung on §5's ladder
(never a whole-map retry) and (3) a test id that targets it, the test's own text checked to hold the case (wiring both
ways). Then each member's mechanisms were walked at the lane's limits — growth from THORP to the cap and decline to
nothing, epochs undone after a save, save / load / undo / redo / regenerate / migrate at every state, an empty, maximal
or self-contradicting dossier, a dossier event against a pin or a lock, edits against locks, everything locked and
regenerated, the clerk at its limits, every toggle and preset combination, table rows at their range ends — for edges
the catalogue missed (CATALOGUE-GAP). A finding is raised only where the current text gives no outcome, no rung or no
test, or two of its rules give different outcomes for one case.

## Findings by member

### determinism (§5–§7)

**Catalogue entries.** All 33 UNDEFINED, 4 UNTESTED and 39 owned combinations are closed in the current text:
- E4-degenerate for §5.1, §6.1–§6.3, §6.5, §7.2–§7.5, §7.7: §5.1 (9) (E-GEN-1) states the one rule, its test in §13.1's
  ladder-coverage fixtures (one degenerate input of each kind per class — confirmed at §13.1); §6.3's anchors add
  coincident and zero-size anchors (refused before matching).
- E6-rungs for §5.3, §5.4, §6.1, §6.3–§6.5, §7.1, §7.2, §7.4, §7.5: §5.1 (10) (rung independence, §6.5 (9)'s per-rung
  fixtures with the METROPOLIS-cap fixture); §5.3's closing paragraph (a row whose subject a rung lacks holds vacuously,
  count 0).
- E5 §5.4: the report's empty lists (`[]`, never absent) with the schema test (§13.2).
- §6.4 E2: the one-line link, the one-event-log link and the 2 000-character link in §6.4's CI.
- §6.5 E3: the METROPOLIS fixture at the population cap.
- §7.2 E1/E2/E5/E8 (UNTESTED): §7.2's tests paragraph (a wholly masked stroke, one `placeAt` through regenerate / New
  random / re-application, a lock, pin and declaration through save → load → undo → redo → regenerate → migrate).
- §7.8 E1: a control with nothing to act on at a rung disabled with its reason row, the registry test failing a
  reasonless disabled state.
- EI-001 (bug abort): §5.1 (8), with its fault-injection test. EI-002 (variations when advances run out): §7.3 item 10.
  EI-003 (reroll at the user cap): §6.1's reroll component and §5.1 (6)'s test. EI-004 (empty warp), EI-006 (empty
  `setAttrMany`, `roster`, `group`, `fill` / `regenerate` scope): §7.1 *Empty edits*, B-EDIT test. EI-005 (`drawBoundary`
  covering no cell by half): §7.1 *Drawing at the authoring boundary* (bent to the cell it covers most; a zero-area
  polygon to the cell under its first point). EI-007 (no `DisruptionBudgetRow`, budget 0): §7.7 item 5 (every kind has
  its row by a schema test; budget 0's outcome for a dossier event and a positive placement). EI-008 (a dossier value
  over a user's): §7.7 item 5 (superseded, the user's event kept as history, listed with `why`). EI-009 (a single undo
  record above the cap): §7.4 *Records on other clients* (not saved; rebuilt by replay).
- The 39 combinations (cliff, steep ground, river, coast, harbour, wall, moat, bridge, raised way, retaining wall, deck
  plot, square, hinterland, oasis, frame × edit, lock, undo, save and load, regenerate): §7.4's *Every kind at the edit
  boundary* table, one row per kind, with its B-EDIT fixture per kind and rung.
- The owned named combination "a dossier removing what an edit pinned": §7.7 item 4 (a positive placement persists
  until the dossier removes the element) and item 5 (an edit no longer honoured is reported and orphaned), cited by
  V08 §3.15's closing line; §7.2's test holds the re-application case.

**Walk at the lane's limits — two gaps.**
1. *A dossier event against a lock* (EL-01, BLOCKER). §7.7's precedence puts the lock above dossier existence and every
   dossier-owned value, and §7.1's first outcome row refuses any edit that targets a locked entity or path ("a host that
   must override a lock sends an unlock first"); but nothing states what happens when a dossier change — a removal, a
   `ruined` state, a rename, a kind or class change, a re-designation, a `knownTo` change — targets a dossier-backed
   element, or its building, that the user has locked. The port sends no `unlock` (V08 has no such rule), the change
   is no map event the outcome table can refuse with actions, and a refusal leaves the map contradicting the dossier
   (§5.3's stage-end coherence row: a hard invariant, whose failure aborts the batch). Two of the base's rules give two
   outcomes for one case: an aborted absorb (a lost dossier change) or a silently broken lock. V08 §3.15's "locality
   (4.3)" row covers only a placement whose neighbours are all locked, and its closing line only the pin.
2. *Stream-key components at their caps* (EL-02, MAJOR, CATALOGUE-GAP). §6.1 packs the epoch component as u16 and
   reserves its upper half (`0x8000 + r`) to the history replay, and the salt as u16, but states no bound for a
   document's live epoch index (each `advance` may add up to `advance.maxEpochs` = 200 epochs, without a document-wide
   cap) nor for a town-wide salt that `rerollLayer` bumps; past 0x7FFF a live epoch's keys equal a replay epoch's
   (contradicting "no replay draw can equal a live epoch's"), and past 0xFFFF either component would wrap onto earlier
   draws — a silent collision §6.1's distinctness test does not reach. The reroll component has its cap (32 767, with
   its `no_alternative` outcome); these two do not.

### scope (§0, §1, §13–§17)

All 8 UNDEFINED entries are closed: §13.3 E6 (the base's three rungs in the goldens, B-CITY's sweep 1 500 to the cap,
the village rungs by V07's B-VILLAGE); §13.5 E8 (append-only baseline, a missing row stops the CLI, reproducible
reports — T-RIG-1, T-RIG-2); §13.6 E4/E8 (a degraded pair, an undecodable capture, a short panel; the record written
once — T-RIG-3); §13.7 E4 (empty or degenerate units skipped and counted, `notApplicable` never a pass — T-RIG-4);
§13.8 E1/E5 (empty suites fail, contradictory records fail naming both — T-RIG-5); §13.9 E1 (no admissible frame —
T-RIG-6); T-RIG-1 – T-RIG-6 scheduled in §13.8's table (PR, M1, T-RIG-6 at M-CAL). The walk found no further gap in the
scope part's own mechanisms (the CI tiers, the golden protocol, the parity rig and the calibration interface).

### V06 (evolution)

**Catalogue entries.** The 48 UNDEFINED and 64 UNTESTED entries, both inventory edges and the 42 owned combinations are
closed by V06 §3.21: its general rule (E-GEN-1 applied to the phases: the op rolled back alone, the phase continuing,
never a whole-epoch retry), one row per mechanism (§2.1, §2.3–§2.6, §2.8, §2.10, §2.13, §3.1–§3.20, §4.2–§4.5, §5) with
outcome, rung and test, and a combinations table (the owner's two named combinations, the terrain features, Works, the
built forms, the close-up, the underground, the sky, light, locks, save and load, exports). Every cited clause exists:
T-V6-73 (a)–(q) and T-V6-74 (a)–(f) name each row's cases; T-V6-23 (h) holds EI-V06-EDGE-1's degenerate requests and
(i) EI-V06-EDGE-2's undo after a save and reload, in a shared copy and with dependants; T-V6-70 (a)–(k) the replay's.
- *Growth from a founding to the cap and decline to nothing:* V06 §3.3.2 clamps every target to the union of the
  registered ladders ([1 500, 120 000] with the town product alone, [0, 120 000] with V07's, where 0 is V07 §3.12's
  deserted outcome), each clamp reported; the product hand-off band (1 575 / 1 425) with T-V6-51; a `rate` with
  `perYear ≤ −1` empties the town at the first epoch; H-DESERT is the fixture.
- *An epoch undone after a save* (owner-named): V06 §4.1 (2) (rebuild by replay from the nearest keyframe, then
  truncation; redo re-folds the stored `EpochInputs`), (3) in a shared document; T-V6-23 (i).
- *A settlement that grows over a sealed void* (owner-named): V06 §3.18.1 (2); T-V6-35, T-V6-74 (a).
- *Locks across the history:* filtered before any draw (V06 §3.1, §4.3); T-V6-4, T-V6-74 (f).

**Walk.** Two gaps the catalogue missed are V06's and are given under the lane-wide walks: an `advance` job cut off
or edited during (EL-08) and the evolution table's divisor and count rows without a range (EL-10). The stream-key bound
for a document's live epoch index is a base mechanism (§6.1) and is raised once, at its home (EL-02).

### V08 (SettlementForge)

**Catalogue entries.** V08 §3.15's rules (a)–(d) and its 29-row table give every catalogued mechanism (§2.1–§5.5) a
defined outcome and a B-row rung, and rules (i)–(iii) define the 62 owned combinations (a dossier fact meets a feature
only through a derivation row; custom content as its resolved class; the players' view by §9.2's admission), with
T-V8-51's three fixtures. The empty dossier (`E_RUNG_UNAVAILABLE` `.empty` at creation; population 0 at an absorb
routes to THORP with V07 registered), the dossier above the cap (B7 `.cap`), the duplicate key (`duplicate_key`), a
range with `lo > hi` and the history fields absent or malformed are all defined.

**Gaps.**
1. *Cited tests that do not hold their row's cases* (EL-03, MAJOR, EDGE-UNTESTED). V08 §3.15's test column names a test
   for each row, but for these rows the named test's text does not contain the row's cases, so a regression of the
   outcome would pass CI: the embed (3.1) → T-V8-1 (no zero-size mount or resize to zero); the refresh queue (3.4) →
   T-V8-12 (no empty queue, one map, a record the host no longer holds, a refused dossier, a restore during a refresh);
   the ladders (3.5.1) → T-V8-44 (no `lo > hi`, top 0, open top above V11's cap); the history read (2.6c) → T-V8-49 (no
   negative `yearsAgo`, a `peakTier` that is no tier word, a resettlement with no former tier); custom content (2.8,
   3.13) → T-V8-25 (no record with no category, tags or tokens, two records of one `localUid`, an unknown scene token, a
   dossier with no custom content); the village hand-off (3.10) → T-V8-19 (no tier word that disagrees with the
   population, negative or non-integer population, epoch across products then undo, document made before the product
   registered); the host actions (4.2) → T-V8-47 (no "Make a new map" at population 0, no village rung); locality (4.3) →
   T20-8 (the base's T20-8 tests only the disruption set, not an element whose every neighbour is locked); the host clerk
   (4.4) → T-V8-27 / T-V8-47 (no headless session with no map open, second preview replacing the pending one, malformed
   query, proposal across a reload); custom content under editing (4.5) → T-V8-25 (no declaration whose `localUid`
   leaves the dossier, its undo, its reload); the DM's view (4.6) → T-V8-14 (the case is held by T-V8-47's history-line
   clause, not T-V8-14); the Map tab (5.1) → T-V8-17 (no "no record and no thumbnail yet", no player's tab with no set);
   pictures (5.3) → T-V8-16 (no key that admits no named place, no undo after a thumbnail); no new declaration (4.1) →
   T-V8-37 (no user's or clerk's `dossierRecord` refusal, no undo re-opening the slot).
2. *A dossier change against a lock* (EL-04, MAJOR, EDGE-UNDEFINED at V08's side of EL-01). V08 §3.15's "locality (4.3)"
   row and its closing combination line cover a placement among locked neighbours and a pinned element only; the case of
   a dossier change whose target the user has locked has no row, so once §7.7 states the outcome (EL-01) V08 has no
   row citing it and no fixture holding it.

### V09 (application)

**Catalogue entries.** V09 §3.16 closes the 94 UNDEFINED, 67 UNTESTED and EI-V09-EDGE-1 by four class rules —
(a) degenerate geometry (four draft rules of its own; the engine refuses the rest), (b) rungs (no rung-specific code,
the unoffered shown disabled with its reason, the METROPOLIS costs with their fallbacks, a THORP's one-row panels),
(c) toggles and presets (view state never changes a digest; a declared thing holds under every preset), (d) save, load,
undo, redo, regenerate, migrate (session-transient state never outlives a load, a gone subject reads its default,
every list rebuilt from the log) — a 30-row table (e) by mechanism, J-VI.4 (f)'s hoist bend and a 25-row combinations
table (g) that holds all 25 owned combinations; the mechanism sections the table does not list (§3.3, §3.14, §4.3,
§4.5, §4.12, §4.16, §4.17, §4.20.1–§4.20.8, §5.1, §5.2) carry only E4 / E6 / E8 entries, which rules (a), (b) and (d)
close, or E1–E3 entries the item-110 row closes (no point, one point, a tier count of 1 or at the cap, a Delete with no
effects, a hit stack of one). T-V9-74 runs the table, T-V9-76 the combinations.
- *Everything locked and regenerated:* "nothing derived in scope" → `info.reroll.nothing` (table (e), variations row),
  with §7.1's empty edit underneath.
- *Edits against locks:* the outcome table's refusal rows, each with **Unlock** and **Show me why**.

**Gaps.**
1. *One town open in two tabs* (EL-05, BLOCKER, CATALOGUE-GAP). The standalone app keeps every town in one IndexedDB
   database per origin (V09 §2.11: `docs`, `journal`, `drafts`), journals every commit there and replaces
   `LocalDocRecord.snapshot` at compaction (V09 §3.8), and an unshared document has one stored session whose undo is
   linear (§7.4). Nothing states what happens when the same town is opened in a second tab or window: both tabs'
   engines append to their own in-memory logs, both write `journal` entries against their own `logHead`, and each
   tab's compaction replaces the other's snapshot. Recovery then meets a mismatch and quarantines "later changes"
   (§3.8 (3)) — committed edits of one tab lost from the town — and no rule, rung or test covers it.
2. *T-V9-74's own row is narrower than the section that cites it* (EL-06, MINOR). V09 §3.16 says "T-V9-74 runs every row
   of (a)–(f)" and gives T-V9-74 clauses in rules (a)–(d) (one degenerate input of each kind per gesture kind; the four
   first-five-minutes tasks and each mode's gesture on each rung; each tool's gesture with every layer off and under each
   parity preset; each panel's state after save, reload, undo, redo, regenerate and an `upgrade`), while T-V9-74's row in
   §7 reads "every row of V09 §3.16's per-mechanism table" only — two statements of one test's scope.

### V10 (clerk)

V10 §3.23 closes the 51 UNDEFINED, 14 UNTESTED, EI-V10-EDGE-1 and the 8 owned combinations: 33 mechanism rows (the
package, sessions, drafts, findings and refusals, tables, tool inputs, the turn, the request, the prompt and map block,
schemas, running the tools, the resolver, creation, rosters, the oracle, the underground and water-and-past answers,
critique, the guard, grounding, transcripts, refusals, the host seam, the meter, failures, safety, determinism,
encoders, locality, what is not an edit, marks, exports, the drawer) each with outcome and rung, and a combinations table
(steep ground, a moat's deck slot, a square, the frame, a sewer, an access, an arch vault, a custom element, a dossier
change or an epoch while a proposal waits); T-V10-47 runs every row at THORP, VILLAGE, TOWN, CITY and METROPOLIS,
T-V10-48 the combinations, T-V10-49 the replaced empty-state town (whose undo regenerates it from the kept blueprint,
V10 §4.2 (3), J-V10.116). **The clerk at its limits:** the brief's per-rung token cap with its fallbacks (landmarks by
significance, vocabulary rows dropped and listed, V10 §6.3), the segment roll-over on length, the route's `maxTokens`
with one retry, the month's cap (`budget`), more than three variations, more findings than `limits.members`, a
1 000-event proposal (V09's drawer row) — each defined and tested. No gap found.

### V11 (content)

V11 §3.26's five rules (data compiled, geometry the reading stages', rungs, toggles and presets, lifecycle), its 21
mechanism rows and its 21 combination rows close the 52 UNDEFINED, 12 UNTESTED, EI-V11-EDGE-1 (a cart crossing beyond
1.5 × `rampMaxGrade`: `W_STEP_LOWERED`) and EI-V11-EDGE-2 (`per` and `target` ranges refused at compile); T-V11-40 (a)–(c)
holds both tables on B-EDGE fixtures. A table edit outside a declared range is clamped and a dangling `ref` refused
(V11 §4.1).

**Gap.** *Numeric columns without a declared range* (EL-09, MAJOR, CATALOGUE-GAP). `ColumnSpec.range` is optional
(V11 §2.1), and the clamp of V11 §4.1 and the compile check of rule (a) act only on a declared range, so a numeric cell
of a column that declares none — V06 §2.2's `advance.maxEpochs`, `replay.maxEpochs`, `history.checkpointStride`,
`uses.openCandidates`, `uses.moveWhyRows` among them — takes 0, a negative or an arbitrarily large value from
`editTable`, a pack or an override with no outcome stated; for a divisor (`advance.maxEpochs` in V06 §3.3.2's
`⌈spanYears × 52 ÷ advance.maxEpochs⌉`, `history.checkpointStride` as a keyframe period) the rule then has no finite
value. "Table rows at their range ends" needs every numeric column to have ends.

### V12 (calibration)

V12 §3.15's four general rules (no whole retry; degenerate geometry dropped and counted on reference inputs, a defect of
ours on our own; rungs; lifecycle), its 22 mechanism rows with T-V12-47 (a)–(o), and its preset-combination table with
T-V12-48 close the 40 UNDEFINED, 11 UNTESTED and the 17 owned combinations (a calibration range with `lo = hi`, a
collapsed range after an owner-stamped minimum, a panel of one pair, an empty corpus, a corpus frame under 20 maps, an
empty register — all defined).

**Gap.** *The population range of the harness contradicts the village rungs* (EL-07, MAJOR, EDGE-UNDEFINED). Rule (c) of
V12 §3.15 says every mechanism runs THORP to the METROPOLIS cap, the village rungs under V07's generator from V-M4, "and
a population outside [1 500, 120 000] is `notApplicable`"; V12 §3.6b (with the levels table and V12 §1b's population
row) calls [1 500, 120 000] "the port's range (§12.2)". But every THORP, HAMLET and VILLAGE fixture lies below 1 500, so
read literally the village rungs are never measured even after V-M4 — against V12's own combination table ("every rung
(THORP – VILLAGE under `VG`)") and T-V12-48; and the port's range is §7.7 item 15's, which reaches below 1 500 once the
village product is registered (§12.2 states no port range). One case, two outcomes.

### Lane-wide walks (time, the host, the tools, the tables)

- *An advance group cut off, and edits during one* (EL-08, MAJOR, CATALOGUE-GAP; owner V06). V06 §4.1 appends an
  `advance` as one `group` of epochs, one at a time, in a background job; **Stop** leaves a shorter group with
  `stoppedAt` on its last epoch, and the group undoes as one step "while its last epoch is the latest live event". Two
  cases have no outcome: (1) the tab is closed or the app crashes mid-group — the folded epochs survive through V09
  §3.8's journal, but the group's last epoch carries neither `stoppedAt` nor `index + 1 = of`, and nothing says whether
  the next open resumes the job, reads the group as stopped, or shows anything; (2) a hand edit, a clerk acceptance or an
  undo on the same document while the job runs — V06 §6 says the job never blocks "an edit on another document", so an
  edit on this one would land between the group's epochs, breaking the group's contiguity and its one-step undo, and no
  rule says whether the tools wait (as V09 §3.9's "going back" makes them wait) or the job stops first.
- *A dossier event against a pin or a lock*: EL-01 (determinism), EL-04 (V08).
- *One town in two tabs*: EL-05 (V09).
- *Edits against locks; everything locked and regenerated; growth from THORP to the cap and decline to nothing; an
  epoch undone after a save; save, load, undo, redo, regenerate and migrate at every state; the clerk at its limits;
  every toggle and preset combination*: defined and tested at the homes named in the member sections above.
- *Table rows at their range ends*: EL-09 (V11); EL-10 (V06's own rows).
- *Stream-key components at their caps*: EL-02 (determinism).

## Issues (the returned list)

**Totals:** 10 issues — 2 BLOCKER (EL-01, EL-05), 7 MAJOR, 1 MINOR; by owner: determinism 2, V06 2, V08 2, V09 2, V11 1,
V12 1; scope and V10 0. Every catalogued UNDEFINED and UNTESTED entry and every owned combination of the eight members
is closed in the current text except where an issue below names it; the owner-named combinations owned here ("a
settlement that grows over a sealed void", "an epoch undone after a save", "a dossier removing what an edit pinned")
are defined, ruled and tested.

| id | severity | kind | owner | short claim |
|---|---|---|---|---|
| EL-01 | BLOCKER | EDGE-UNDEFINED | determinism | a dossier change against a lock on its own target has two outcomes (refused vs applied) |
| EL-02 | MAJOR | CATALOGUE-GAP | determinism | the epoch and salt stream-key components have no bound (u16 wrap; live epoch = replay key) |
| EL-03 | MAJOR | EDGE-UNTESTED | V08 | V08 §3.15 rows cite tests that do not hold their cases (14 rows) |
| EL-04 | MAJOR | EDGE-UNDEFINED | V08 | V08 §3.15 has no row for a dossier change against a DM's lock |
| EL-05 | BLOCKER | CATALOGUE-GAP | V09 | one town open in two tabs: interleaved journals and snapshots lose committed edits |
| EL-06 | MINOR | EDGE-UNTESTED | V09 | T-V9-74's row is narrower than the scope V09 §3.16 gives it |
| EL-07 | MAJOR | EDGE-UNDEFINED | V12 | V12's [1 500, 120 000] notApplicable rule excludes every village rung; wrong citation |
| EL-08 | MAJOR | CATALOGUE-GAP | V06 | an advance job cut off, and edits on the document during a job, have no outcome |
| EL-09 | MAJOR | CATALOGUE-GAP | V11 | numeric table columns may declare no range, so their cells have no ends |
| EL-10 | MAJOR | CATALOGUE-GAP | V06 | V06 §2.2's divisor and count rows declare no range |

### EL-01 — BLOCKER, EDGE-UNDEFINED, owner determinism

**Claim.** A dossier change whose target the user has locked has no defined outcome. §7.7's precedence (lock > dossier existence > assignment > …) and §7.1's first outcome row (an edit targeting a locked entity or path is refused; 'a host that must override a lock sends an unlock first') meet §7.7 items 2, 11 and 14 (the dossier is the sole immutable truth; a listed ruin is present as its ruin; dossier-owned values change only by dossier events) when a dossier removal, a `ruined` state, a rename, a kind or class change, a re-designation or a `knownTo` / concealment change targets a dossier-backed element, or its building, that the user locked; likewise in an epoch, DR28's calamity F5 targets are 'struck in place, never relocated' while §4.11's hazard exemptions say 'a locked or pinned entity is never struck'. The port sends no unlock (V08 has no such rule), the change is no map event the outcome table can answer with actions, and refusing it leaves the map contradicting the dossier, which §5.3's stage-end coherence row (a hard invariant) aborts — a lost dossier change — while applying it silently breaks the user's lock. Two rules, two outcomes, no rung, no test.

**Required change.** In §7.7, directly after the precedence paragraph, add the one statement: '**A dossier change meets a lock or a pin on its own target** (items 20, 22). A lock or a pin binds map events, placements and an epoch's own steps, never a dossier fact: a dossier change — standalone or carried by an epoch (§7.7 item 6), a calamity's F5 targets (DR28) among them — whose target is a dossier-backed element, its building or a dossier-owned path of it (§7.7 item 11) that the user locked or pinned is applied as its least-disruption mutation (§7.7 item 5), changing only what the fact requires (a removal closes the use and leaves the building standing vacant; a `ruined` state ruins the building in place; a rename, kind, class or knowledge change sets the value). Each lock and pin it overrides is kept on whatever the change leaves standing, orphaned (§7.4's orphan table) where its target goes, and listed in the event's `DisruptionReport.why` with the rule `lockOverridden`, never silently; §4.11's exemption that a locked or pinned entity is never struck holds for the engine's own hazards only. The precedence line stands for placement: a dossier element is never placed on a locked entity.' Add `lockOverridden` to the rule words V09 §4.9 renders for `DisruptionReport.why`. Add to §13.2's *Derivation fills every gap* list: '(T20-14) on B-DOSSIER-lite, a dossier removal, a `ruined` state, a calamity F5 strike in an epoch, a rename and a re-designation of a locked element, and of a pinned one, are each applied, the lock or pin listed `lockOverridden` and kept or orphaned as stated, and the coherence rows pass (§5.3)'.

### EL-02 — MAJOR, CATALOGUE-GAP, owner determinism

**Claim.** Two stream-key components have no bound and no outcome at their cap (§6.1). The epoch component is packed as u16 with its upper half reserved to the history replay (`0x8000 + r`, 'so no replay draw can equal a live epoch's'), but a document's live epoch index has no stated bound: each `advance` adds up to `advance.maxEpochs` (200) epochs and nothing caps a document's total, so past 0x7FFF a live epoch's keys equal a replay epoch's and past 0xFFFF the component wraps onto epoch 0's draws. The salt is packed as u16 and bumped by every town-wide `rerollLayer`, with no bound either. The reroll component has its cap (32 767, `no_alternative`); these two do not, and §6.1's distinctness test cannot reach the case — a silent stream collision.

**Required change.** In §6.1's components list: (epoch) 'pack the epoch component as u32 — the packed components take one more 32-bit lane in the stream key's finaliser round —, key the history replay's coarse epochs `0x8000_0000 + r`, and bound a document's live epoch index at 0x7FFF_FFFF: an `epoch` event past it is an empty edit with the reason `epochCap` (§7.1 *Empty edits*), and an `advance` that would pass it bends to the epochs that fit, said in one line'; (salt) 'a town-wide salt is bounded at 0xFFFF: a `rerollLayer` whose concern's salt stands at the bound reports `no_alternative` and appends nothing (§7.1 *Empty edits*)'. Update J-A113.61's row to the new replay base. Add to §6.1's *Distinctness* test: 'and on a fixture whose live epoch index stands at the bound and whose `naming` salt stands at 0xFFFF, the next epoch and the next `rerollLayer(naming)` take the stated outcomes, and no live epoch's key equals a replay epoch's'.

### EL-03 — MAJOR, EDGE-UNTESTED, owner V08

**Claim.** V08 §3.15's test column names, for these rows, a test whose text does not hold the row's cases, so a regression of the stated outcome passes CI: the embed (3.1) → T-V8-1; the refresh queue (3.4) → T-V8-12; the ladders (3.5.1) → T-V8-44; the history read (2.6c) → T-V8-49 (only the absent age, an event without `yearsAgo` and no evidence are held); custom content (2.8, 3.13) → T-V8-25; the village hand-off (3.10) → T-V8-19; the host actions (4.2) → T-V8-47; locality (4.3) → T20-8 (the base's T20-8 tests only the disruption set); the host clerk (4.4) → T-V8-27 / T-V8-47; custom content under editing (4.5) → T-V8-25; the DM's view (4.6) → T-V8-14 (the case sits in T-V8-47's history-line clause); the Map tab (5.1) → T-V8-17; pictures (5.3) → T-V8-16; no new declaration (4.1) → T-V8-37 (no `dossierRecord` refusal, no undo re-opening the slot).

**Required change.** Extend T-V8-50 with one clause per row, each asserting its row's outcome, and point each row's test cell at its clause: (k) a mount element of zero size boots and waits for a size with the thumbnail shown, a frame resized to zero pauses drawing and keeps the session [3.1]; (l) an empty refresh queue resolves at once with no frame, one map takes one frame, a record the host no longer holds is skipped, a refused dossier is held while the queue moves on, a restore during a refresh makes its commit `stale` and discards its snapshot [3.4]; (m) a range `(lo-hi)` with `lo > hi` reads `[hi, lo]` noted `unmapped_word`, a top of 0 reads `[1, 1]`, an open top above V11's cap stops at the cap, reported [3.5.1]; (n) a negative `yearsAgo` reads 0, a `peakTier` that is no tier word is carried noted `unmapped_word` with no evidence, a resettlement with no recorded former tier gives DR38's refounding with no peak [2.6c]; (o) a custom record with no category, tags or tokens resolves `generic-other` with `custom_resolved` naming the rung, two records of one `localUid` stay apart by dossier order with `duplicate_key`, an unknown scene token is dropped with `unmapped_word`, a dossier with no custom content is byte-identical to one without the keys [2.8, 3.13]; (p) a tier word that disagrees with the population draws the population's rung titled by the word, a negative or non-integer population is refused `E_UNKNOWN_SHAPE`, an epoch crossing products is no undo target, a document made before the product registered reads its product from the fold [3.10]; (q) 'Make a new map from the record' at population 0 is refused `E_RUNG_UNAVAILABLE` `.empty`, and at a village rung offered with the product registered, else B7 `.village` [4.2]; (r) one dossier element whose every neighbour is locked is placed at the least-disruptive site and reported over budget [4.3]; (s) a host clerk call with no map open runs a headless session, a second preview replaces the pending one, a malformed query answers `query.result { error }`, a proposal waiting across a reload answers `clerk.proposal { status: 'stale' }` [4.4]; (t) a declaration whose `localUid` leaves the dossier is orphaned and reported, undone as any edit, and kept across a reload and a regeneration keyed `inst:uid:<localUid>` [4.5]; (u) the Map tab with no record and no thumbnail shows `host.status.opening` over an empty container, a player's tab with no set the public thumbnail with `host.party.notOpened` [5.1]; (v) a picture key that admits no named place draws the ground, the ways and the unnamed marks only, and an undo after a thumbnail is followed by the next commit re-making the thumbnails [5.3]; (w) a user's or clerk's `dossierRecord` is refused `dossier-owned`, and the undo of a generated raised way's removal re-opens its slot [4.1]. The DM's view row (4.6) names T-V8-47's clause 'a place whose binding row is gone is named by its key with no target'.

### EL-04 — MAJOR, EDGE-UNDEFINED, owner V08

**Claim.** V08 §3.15 has no row for a dossier change whose target the DM has locked or pinned: its 'locality (4.3)' row covers only a placement whose every neighbour is locked, and its closing combination line only 'a dossier removing what an edit pinned' (the pin reported orphaned). V08 §4.1 says every map edit — 'a move, a lock …' — 'survives every absorb', which, read with §7.7's precedence, contradicts the dossier's authority when the absorb's change targets the locked thing itself (the base side is EL-01).

**Required change.** Add a V08 §3.15 row 'protection under an absorb (4.1, 4.3)': edge 'a dossier removal, `ruined` state, rename or re-designation of an element, or of its building, that the DM locked or pinned'; outcome 'applied by §7.7's rule for a dossier change meeting a lock or a pin on its own target (EL-01's statement), the lock listed `lockOverridden` in the absorb's group of the DM's view (V08 §4.6) and kept on what stands or orphaned'; rung B12; test T-V8-50 (x), which asserts it on `town-1` with a locked institution building removed, ruined and renamed by test-side dossier versions. In V08 §4.1 read 'every map edit … survives every absorb, except a lock or pin on a target a dossier change itself names, which §7.7 rules'. Extend the closing combination line to name the lock beside the pin.

### EL-05 — BLOCKER, CATALOGUE-GAP, owner V09

**Claim.** Nothing defines one town open in two tabs or windows of the standalone app. Every town lives in one IndexedDB database per origin (V09 §2.11: `docs`, `journal`, `drafts`), every commit is journalled there against the tab's own `logHead`, compaction replaces `LocalDocRecord.snapshot` (V09 §3.8), and an unshared document has one stored session whose undo is linear (§7.4). Two tabs editing one town each fold their own log, interleave journal entries and overwrite each other's snapshot; at the next open recovery meets the first `logHeadAfter` mismatch and quarantines the 'later changes' (§3.8 (3)) — committed edits lost from the town — with no rule, rung or test.

**Required change.** Add V09 §3.8 item 7, '**One tab writes a town.** Opening a town for editing takes the Web Locks API lock `plat-doc:<docId>` (`navigator.locks.request`, mode `exclusive`, held for the tab's life); a second tab or window that opens the town while the lock is held opens it read-only — it writes no journal entry and runs no compaction, every tool is disabled, and the banner `info.openElsewhere` ("This town is open in another tab.") carries `button.editHere`, which asks the holder over `BroadcastChannel('plat-doc')` to finish its pending journal write, compact and release; the asking tab then takes the lock and re-opens from the new snapshot. A browser without Web Locks uses a lease in `LocalDocRecord` (`leaseTab`, `leaseUntil`, renewed every 5 s and expired after 15 s) with the same outcome; a holder killed mid-write releases its lock with the tab, and recovery runs as item 3 states. In host mode the host is the store (§11.3) and no lock is taken.' Add `leaseTab` and `leaseUntil` to V09 §2.11's `LocalDocRecord` with their lifecycle row, the two keys to V09 §4.9's catalogue, a row to V09 §3.16 (e) ('autosave and recovery: the same town opened in a second tab → read-only with **Edit here**; rung check'), and to T-V9-17: 'two tabs on one town: the second opens read-only and writes nothing; after **Edit here** every edit the first tab committed is in the snapshot the second opens (0 lost edits); a killed holder's lock passes to the waiting tab'.

### EL-06 — MINOR, EDGE-UNTESTED, owner V09

**Claim.** V09 §3.16 says 'T-V9-74 runs every row of (a)–(f)' and gives T-V9-74 clauses inside rules (a)–(d) (one degenerate input of each kind per gesture kind; the four first-five-minutes tasks and each mode's gesture on each rung's fixture; each tool's gesture with every layer off in turn and under each parity preset; each panel's state after save, reload, undo, redo, regenerate and an `upgrade`), while T-V9-74's own row in V09 §7 reads only 'every row of V09 §3.16's per-mechanism table' — two statements of one test's scope.

**Required change.** Reword T-V9-74's row: 'the edges (V09 §3.16): rules (a)–(d) with the clauses each names — one degenerate input of each kind per gesture kind of V09 §2.3; the four first-five-minutes tasks and each tool mode's one gesture on each rung's fixture; each tool's gesture with every layer off in turn and under each parity preset; each panel's state after save, reload, undo, redo, regenerate and an `upgrade` — and every row of tables (e) and (f), on its fixture: the stated outcome on its stated rung of the failure ladder; across the suite 0 crashes, 0 hangs past 10 s, 0 lost edits and 0 whole-map retries'.

### EL-07 — MAJOR, EDGE-UNDEFINED, owner V12

**Claim.** V12's population range contradicts its own village rungs. V12 §3.15 rule (c) says every mechanism runs THORP to the METROPOLIS cap, the village rungs under V07's generator from V-M4, 'and a population outside [1 500, 120 000] is `notApplicable`'; V12 §3.6b's *Levels that cannot run* (with V12 §3.12's level row and V12 §1b's population row) calls [1 500, 120 000] 'the port's range (§12.2 …)'. Every THORP, HAMLET and VILLAGE fixture lies below 1 500, so read literally the village rungs are never measured even after V-M4 — against V12 §3.15's own combination table ('every rung (THORP – VILLAGE under `VG`)') and T-V12-48 — and the port's range is §7.7 item 15's, which reaches below 1 500 once the village product is registered (§12.2 states no port range). One case, two outcomes, and a citation that does not hold its value.

**Required change.** V12 §3.15 rule (c)'s last clause reads 'a population outside the registered products' union (§7.7 item 15; V06 §3.3.2: [1 500, 120 000] with the town product alone, [1, 120 000] once V07's village product is registered) is `notApplicable`'. In V12 §3.6b's *Levels that cannot run* and its item-108 (f) row, V12 §3.12's level row and V12 §1b's population row, 'the port's range [1 500, 120 000] (§12.2 …)' reads 'the town product's range [1 500, 120 000] (§1.1)', scoped to item 108 (f)'s town-ladder sweep, whose levels below 1 500 are `notApplicable` for that sweep only. T-V12-47 (k) gains: 'from V-M4 a THORP and a VILLAGE fixture are measured, never `notApplicable` for their population'.

### EL-08 — MAJOR, CATALOGUE-GAP, owner V06

**Claim.** Two cases of an `advance` job have no outcome (V06 §4.1, §6). (1) A job that ends without Stop — the tab closed, the app or the worker killed: the epochs already folded survive through V09 §3.8's journal, but the group's last epoch carries neither `stoppedAt` nor `index + 1 = of`, and nothing says whether the next open resumes the job, reads the group as stopped, or tells the user. (2) An edit, a clerk acceptance or an undo on the same document while the job folds epochs: V06 §6 says the job never blocks 'an edit on another document', so an edit on this one would land between the group's epochs, breaking the group's contiguity and its one-step undo ('while its last epoch is the latest live event'), and no rule says whether the tools wait or the job stops first.

**Required change.** Add to V06 §4.1, after *Undo*: '**A job cut off.** An `advance` job that ends without Stop leaves the epochs already folded as a shorter group, as Stop does: at the next open the app writes nothing, reads a group whose last epoch has `index + 1 < of` and no `stoppedAt` as stopped at `index + 1`, never resumes the job by itself, and the history panel shows "Advanced {n} of {m} years — stopped" with **Continue**, which starts a new `advance` for the remaining span from the document's week. **Edits during a job.** While a job folds epochs on a document, every tool, the clerk's Accept and undo on that document wait — the rail and the drawer show the job's progress, as V09 §3.9's going back does — until Stop or the job's end; edits on other documents never wait.' Add T-V6-23 clause (j): 'a 100-epoch job killed after epoch 37: the reopened document holds 37 epochs read as stopped at 37, no job resumes, **Continue** appends a new group for the remaining span; during a job the tools and Accept on that document are disabled and a queued undo waits for the job's end'. Add the two cases to V06 §3.21's `advance` rows.

### EL-09 — MAJOR, CATALOGUE-GAP, owner V11

**Claim.** A numeric table column may declare no range, so its cells have no ends: `ColumnSpec.range` is optional (V11 §2.1), and V11 §4.1's clamp and rule (a)'s compile check act only on a declared range. A numeric cell of a column with none — V06 §2.2's `advance.maxEpochs`, `replay.maxEpochs`, `history.checkpointStride`, `uses.openCandidates` among them — takes 0, a negative or an arbitrarily large value from `editTable`, a pack, an override or a calibration run with no outcome stated; for a divisor (`⌈spanYears × 52 ÷ advance.maxEpochs⌉` in V06 §3.3.2; the keyframe period) the rule then has no finite value.

**Required change.** In V11 §2.1, make `ColumnSpec.range` required for `type: 'number'` and `'integer'` (a count or divisor column's lower bound at least 1); V11 §3.2.1 step 4 refuses a numeric column without one, naming it; T-V11-3 gains 'every number and integer column of every registry table declares its range, and every count or divisor column's lower bound is at least 1'; V11 §3.26 rule (a) adds 'an edit, a pack, an override or a calibration run is clamped into its column's declared range (V11 §4.1; V12 §3.7), so no runtime reader meets a value outside it'.

### EL-10 — MAJOR, CATALOGUE-GAP, owner V06

**Claim.** V06 §2.2's numeric evolution rows declare no range (V06 states only their `calibratable: false` flag), so `advance.maxEpochs`, `replay.maxEpochs`, `history.checkpointStride` and `uses.openCandidates` — divisors and iteration counts of V06 §3.3.2, §3.20.2, §3.15.2 and §3.9.6 — can be edited to 0 or below with no outcome (the volume-side half of EL-09).

**Required change.** Give every numeric row of V06 §2.2's table its declared range (`ColumnSpec.range`) in the table, with a lower bound of 1 for `advance.maxEpochs`, `replay.maxEpochs`, `history.checkpointStride` and `uses.openCandidates`, and add V06 §3.21 row 'parameters and the evolution table (V06 §2.2): a tables-editor edit of a count or divisor row to 0 or below → clamped to the range's lower bound with its line (V11 §4.1); rung repair locally' with T-V6-73 clause (r) asserting it for each of the four rows.
