# verify-edges-life-r0 — edge cases and combinations across time, the host, the tools and the tables (principle (11))

Lane `coherence/verify-edges-life-r0` (cloud continuation, 2026-10-03; first edge check after the rewrite). Members:
determinism (§5–§7), scope (§0, §1, §13–§17), V06, V08, V09, V10, V11, V12. Text checked: the live set as assembled by
`coherence/assemble-r0` (docs/ARCHITECTURE.md, docs/volumes/V*.md). Catalogue: docs/validation/coherence/edges.md and
edges.json.

## PROGRESS

- P0 inputs located (catalogue entries extracted per member; edges sections found): done
- P1 determinism: done (§5.1–§7.8 read whole; 33 U + 4 T + 39 combinations + the named one checked; 2 issues)
- P2 scope: done (§13.3, §13.5–§13.9 read; 8 U checked; 0 issues)
- P3 V06: pending
- P4 V08: pending
- P5 V09: pending
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

## Issues (the returned list)
