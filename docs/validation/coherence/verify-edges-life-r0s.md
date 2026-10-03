# verify-edges-life-r0 — edge cases and combinations across time, the host, the tools and the tables (principle (11))

Lane `coherence/verify-edges-life-r0` (cloud continuation, 2026-10-03; first edge check after the rewrite). Members:
determinism (§5–§7), scope (§0, §1, §13–§17), V06, V08, V09, V10, V11, V12. Text checked: the live set as assembled by
`coherence/assemble-r0` (docs/ARCHITECTURE.md, docs/volumes/V*.md). Catalogue: docs/validation/coherence/edges.md and
edges.json.

## PROGRESS

- P0 inputs located (catalogue entries extracted per member; edges sections found): done
- P1 determinism: done (§5.1–§7.8 read whole; 33 U + 4 T + 39 combinations + the named one checked; 2 issues)
- P2 scope: done (§13.3, §13.5–§13.9 read; 8 U checked; 0 issues)
- P3 V06: done (§3.21 read whole, §3.3, §4.1–§4.4 read; T-V6-23, -70, -73, -74 checked; 0 issues)
- P4 V08: done (§3.15 read whole; every cited test read; 2 issues)
- P5 V09: done (§3.16 read whole, §3.8 read; T-V9-17, -74, -76 read; 2 issues)
- P6 V10: pending
- P7 V11: pending
- P8 V12: pending
- P9 owner-named combinations and lane-wide walks (time, host, tools, tables): pending
- P10 issue list, results JSON, LANDED: pending

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

**Walk.** No further gap in V06's own mechanisms; the stream-key bound for a document's live epoch index is a base
mechanism (§6.1) and is raised once, at its home (EL-02).

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

## Issues (the returned list)
