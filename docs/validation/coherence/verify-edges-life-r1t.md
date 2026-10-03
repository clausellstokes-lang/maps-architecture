# Verify — edge cases and combinations across time, the host, the tools and the tables, round 1 (coherence/verify-edges-life-r1t)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-edges-life-r1t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (fresh start) · [x] round-0 findings VEL0-01–11 re-checked against the live text · [x] repaired subsections in scope re-checked (base §5–§7, §13; V06, V08, V09, V10, V11, V12 round-1 hunks) · [x] items 120–125 parts (G120/G121/G122/G123/G124/G122h/G125) · [x] lane walk of the new text at its limits · [x] peers' r1t results read (no duplicate raised beyond my own round-0 ids) · [x] issues written · [x] result saved · [x] LANDED

Members: determinism (base §5–§7), scope (base title, summary, §0, §1, §13–§17, decisions, judgment index, staged list,
Appendix A), V06, V08, V09, V10, V11, V12. This is the live text after assemble-r1. Each file's sha256 equals assemble-r1.md §1's
"after" column: ARCHITECTURE.md `137ecc0e4fe12c44…`, V06 `771887caa2d6ff6c…`, V08 `b96e79d8a7d84deb…`, V09 `c2dc5b806ac1fedf…`,
V10 `f8f591b329d79c6f…`, V11 `9481453bcd0fd757…`, V12 `996dee3b5baba28b…`. Design files are untouched by this seat.

## Method

- **Round-0 findings.** I re-checked each of VEL0-01 – VEL0-11 against the current text, wherever its owner put the fix.
  I compared each with the owner's repair file and with the hand-offs the repair seats wrote for other units.
- **Repaired subsections.** `git diff 3f0e02b2d7b9 HEAD` (assemble-r1's before-commit) was mapped hunk by hunk to the
  members' subsections:
  - the base: 502 hunks, of which §5–§7 had 120 and 351 changed lines and §13 had 23 KB;
  - V06: 138 hunks (a whole-volume REPLACE);
  - V08: 87 hunks;
  - V09: 233 hunks;
  - V10: 160 hunks;
  - V11: 122 hunks;
  - V12: 76 hunks.

  Every changed line was read. I then read whole the mechanisms whose edges the changes touch:
  - base §7.7's precedence, §7.4's replay and frame rows, §6.1's key, §2.6's clamp, §4.11 step (c) and the strike pool;
  - V09 §2.11 and §3.8;
  - V06 §3.3.2, §3.5.1, §4.1 and §6.8;
  - V08 §3.16;
  - V10 §3.2 and §3.23;
  - V11 §4.1 and §3.26;
  - V12 §3.12 and §3.16.

  Each changed subsection was checked for a defined outcome at its limits, a fallback on §5's ladder and a test.
- **Items 120–125.** Canon's dated rulings for items 120, 121–123, 124, 122 (h)–(i) and 125 name each unit's part. For every
  member named, I searched the live file for the item and its mechanisms, and read the parts that exist:
  - item 120 in V08 §3.16 (6), V10 §3.9b (7) and §3.23 row 32, V11's lexicon, and V12 §3.15.10;
  - items 121–125 are absent from every member, as the brief expected.
- **Peers.** The other r1t results (355 issues) were read. A new candidate that a peer had already raised is listed below
  and not raised again. My own round-0 ids are kept where they persist, even when a peer reports the same remainder.
- `doc_checks.py` was not run: this seat writes no design text, and assemble-r1's provisional run covers the live files.

## Round-0 findings re-checked

| id | round-0 owner | verdict | evidence in the live text |
|---|---|---|---|
| VEL0-01 | determinism | PARTLY FIXED | §7.7's precedence (l.11371-11386) and §7.1 row 1 (l.10116) define the outcome: a dossier event is never refused by a lock and supersedes it, reported orphaned; the population fall is stated. Not written: §13.2's T20 group has none of §7.7's fixtures, and Part A's J-DET-11 and J-A20.71 still read the unlimited rule. Kept open, owner scope (same remainder as VDC1-17, VDC1-19). |
| VEL0-02 | V09 | FIXED | `JournalCall` has `advance` with `stoppedAfter` (l.916). §3.8 (1)-(3) journals the advance, compacts at once after its done write, and re-issues it at recovery. §3.16 row 16 and T-V9-17 carry the three kill fixtures. The Stop re-issue's timed `cancelAdvance` can race; VV910-r1-02 (vol-V09-V10-r1t) raised that, so it is not re-raised here. |
| VEL0-03 | determinism | FIXED | §7.1 l.9968-9969: a zero-area polygon is an empty edit. *Empty edits*' B-EDIT test names the zero-area `drawBoundary` and the thin-polygon bend (l.10056-10057). |
| VEL0-04 | determinism | FIXED | §7.4's frame row (l.10930) gains its lock, undo and save cells. §7.1 has the `bend.frame.held` row (l.10156). §3.2 (9) never shrinks the frame below its protected content (l.3403-3405). The CITY → TOWN fixture is at l.10933-10934, and V09 §4.9 has the key (l.1931). |
| VEL0-05 | determinism | FIXED | §7.4 *Replay semantics* (l.10718-10724) makes every `host:port` event no undo target, with the fixture. §7.1 rows (l.10126-10127) and §7.7 item 3 (l.11476-11477) follow. Three texts still state the old rule and were not updated: §13.2's T20-2 and T20-6, V06 §4.1, and T-V6-27 with its take-over rows. Peers raised them (VDC1-17; VAT1-03), so they are not re-raised here. |
| VEL0-06 | determinism | PARTLY FIXED | §6.1 widens the epoch component to u32 (l.8996), keys the replay `0x8000_0000 + r`, caps live epochs (l.9047-9050) and caps the salt (l.9063-9066). §6.5 (9) tests it (l.9746-9748). The judgment index's J-A113.61 (l.21356) and its Part A row (rationale l.805) are stale, and V06 §3.16 cites J-A113.61. Kept open as minor, owner scope (same remainder as VDC1-16, VPC-R1-26). |
| VEL0-07 | determinism | FIXED | §7.4 *Checkpoints*' M2a measurement (l.10870-10873) covers the over-cap METROPOLIS record rebuilt after a reload and the withdrawn rebase and redo. |
| VEL0-08 | V08 | FIXED | V08 §3.17 (b)'s row (l.2490) takes F-SITING's dossier rung, never omitted and with no basin on dry land. T-V8-49 (m) asserts it (l.3045). |
| VEL0-09 | pipeline | FIXED | §4.7 S10b's last rung (l.6778-6785) cuts a new outside plot on the hinterland face, `W_DOSSIER_EDGE`. §4.13 EP-26 (l.8621), V08 §3.17's digest row (l.2460) and T-V8-49 (f) carry it. |
| VEL0-10 | V10 | FIXED | `limits.memoryTokens` (l.767, l.798), §3.2's bounded memory block with its count line (l.1150-1157), §3.23 row 31 with T-V10-50 (30), and J-V10.124 are all in place. |
| VEL0-11 | V11 | PARTLY FIXED | V11 §4.1 (l.4543-4550), EI-V11-EDGE-3 (l.4497), §4's lifecycle row (l.4604) and T-V11-45 (s) refuse the delete with `refuse.table.required`. V09 §4.9 has no row for that key, and §7.1's E-07 table has no producing row. Kept open, owner V09; the §7.1 half is raised as VEL1-03 (determinism). |

**Summary.**
- 8 are fixed: VEL0-02, -03, -04, -05, -07, -08, -09 and -10.
- 3 are partly fixed and kept open with their ids: VEL0-01 (owner scope), VEL0-06 (owner scope, now minor) and VEL0-11
  (owner V09).
- None of my findings drew a RULING REQUEST, and assemble-r1 skipped none of their blocks.

## Repaired subsections — what the repairs made, at their limits

**New problems the repairs made (raised).**
- **The protected dwelling emptied by a dossier fall** (VEL1-01 model, VEL1-02 pipeline, VEL1-04 V06). The VEL0-01 fix
  gives a locked or pinned dwelling's last household a `relet` down, and says the building is 'never `vacate`d'. Three texts
  disagree:
  - §2.6's one statement of the clamp holds every residential building in [1, capacity];
  - §4.11 step (c) and the strike pool vacate at every last household;
  - V06 §3.5.1 (5) does the same, against its own (4).
- **The required-row delete has no outcome row.** V11's new refusal `refuse.table.required` has no row in §7.1's one
  statement (VEL1-03, determinism) and no row in V09's catalogue (VEL0-11, V09).

**New problems the repairs made (already raised by a peer, not raised again).**
- §13.2's T20-2 and T20-6 bars, V06 §4.1, T-V6-27 and its take-over rows still state the narrower no-undo rule that VEL0-05
  replaced. Raised as VDC1-17 (scope) and VAT1-03 (V06, blocker).
- V06 §4.1's Accept 'otherwise the epochs fold again under the estimate the preview ran with' (VV56-r1-04). This also
  breaks J-V9.137's premise that a journalled advance is 'the deterministic result of the request at its head': an Accept
  after the head moved folds at a cadence that V09 §3.8's re-issue at `logHeadBefore` would not choose. VV56-r1-04's change
  (re-estimate on the current head) closes both.
- V09 §3.8 (3)'s Stop re-issue by a timed `cancelAdvance` (VV910-r1-02).
- J-A113.61 (VDC1-16, VPC-R1-26) and Part A's J-DET-11 and J-A20.71 (VDC1-19) are the remainders of my VEL0-06 and VEL0-01.
  They are kept under those ids.

**Checked and holding at their limits.**
- **Base §5:** F-SITING's dossier rung; the `Invariant` record; the `walls.condition` key row.
- **Base §6.1:** epoch u32 with the live cap; salt cap.
- **Base §7.1:** the table-edit, frame, warp, capacity, Works, host-cap, upgrade-cap and bug rows; *The returned kinds*;
  the points-form bytes.
- **Base §7.4:** the wall-condition lifecycle row (no-op wear and repair, the dismantled-run bend); the epoch row; the
  migration rows for item 114.
- **Base §7.7:** DR41–DR43 at their ends (no readiness; `atGeneration` off; a festival window wrapping past week 51; an
  unscheduled tradition; two festivals in one week).
- **Base §13.2 and §13.8:** the item 114–119 bars, including oscillation (T114-5), every rung (T116-1), all 52 weeks
  (T117-1) and the comfort level (T119-2).
- **V06:**
  - §3.3.2 and §6.8's deterministic estimate: one epoch over the span always fits, about 5.3 s at the metropolis cap with
    the hand-placed cap;
  - §3.21's advance and hazard rows (out-of-span events clamped);
  - §3.7.7's neutral values;
  - T-V6-70 – T-V6-74.
- **V08:** §3.16 (1)–(6), with Find's entries at the adapter's 2 000-record cap, re-key and anchor, and a removed record
  going dark (row of §3.17, T-V8-58); §3.17's no-seat and harbour rows.
- **V09:** §3.8's compaction after an advance; §3.16 rows 16, 61–83; §4.9's rows for every new E-07 key except
  `refuse.table.required`; §4.21.9's Stop for a history-first generation.
- **V10:** §3.2's memory block, with a device limit below an opening; §3.23 rows 31–32 and C9.
- **V11:** §4.1's clamps and the required-row rule; §3.26's M-V11-599-E5.
- **V12:** §3.12's item-119 and item-120 failure rows; §3.16 row 31.

The repairs' renumbering broke no citation in these sections (assemble-r1: 0 broken of 49 788), and no file-g owner rule
was undone.

## Items 120–125 — the members' parts

| item | members the ruling names | present | F-MISSING raised |
|---|---|---|---|
| 120 (J133) | scope, V08, V09, V10, V11, V12 | V08 §3.16 (6) with T-V8-58; V10 §3.9b (7), §3.23 row 32, C9, T-V10-51; V11's lexicon and groups; V12 §3.15.10, T-V12-52 | G120-scope, G120-V09 (both repairs began before the filing) |
| 121 (J134) | scope, V09, V12 | none | G121-scope, G121-V09, G121-V12 |
| 122 (J135) | determinism, scope, V06, V08, V09, V10, V11, V12 | none | G122-determinism, -scope, -V06, -V08, -V09, -V10, -V11, -V12 |
| 123 (J136) | determinism, scope, V06, V09, V10, V11, V12 | none | G123-determinism, -scope, -V06, -V09, -V10, -V11, -V12 |
| 124 (J137) | determinism, scope, V09, V11, V12 | none | G124-determinism, -scope, -V09, -V11, -V12 |
| 122 (h)–(i) (J138) | V08, V09, V11, V12 | none | G122h-V08, -V09, -V11, -V12 |
| 125 (J139) | determinism, scope, V08, V09, V12 | none | G125-determinism, -scope, -V08, -V09, -V12 |

Each F-MISSING names the parts the item's text assigns that unit. In this lane's terms it also names the edge rows and
tests the item's own limits need, for example:
- item 121 (f)'s nearest level that fits, never a refusal or a crash;
- item 122's unknown archetype, read as 'no look';
- item 124's hard rules at every week;
- item 125's dossier with no stamped tick.

## Outcome

**41 issues: 0 blocker, 39 major, 2 minor.**

By kind: EDGE-UNDEFINED 6; EDGE-UNTESTED 1; F-MISSING 34.

By owner: V09 8; scope 8; V12 6; determinism 5; V11 4; V06 3; V08 3; V10 2; model 1; pipeline 1.

**The lane's state.** No edge in the members is left as a crash, a hang, lost data or a whole-map retry.
- The two round-0 blockers are fixed: the dossier event against a lock is now defined, and the advance is now journalled.
- The open edge issues have two sources:
  - texts that did not follow a repaired rule: the protected dwelling, the required-row key, and the stale index and
    Part A rows;
  - owner items 120–125, whose parts are absent as the brief expected (34 F-MISSING).

## Issues

### VEL0-01 — MAJOR EDGE-UNTESTED (owner: scope)

* **Claim.** Partly fixed. The outcome is now defined: §7.7's precedence (l.11371-11386) says a dossier event is never refused by a lock or a pin and supersedes the lock on what it changes, reported orphaned, and a population fall empties locked dwellings by a `relet` down. §7.1's outcome row 1 (l.10116) limits the refusal to map events. Two parts of the round-0 change are still unwritten, both in scope's text. (a) §7.7's fixtures cite '§13.2's T20 group' (l.11383), but §13.2's T20 group (l.16666-16679) lists none of them. They have no id and no §13.8 tier row, so no CI tier runs them. (b) Part A still records the unlimited rule. J-DET-11 (rationale l.111, R25 l.1886) reads 'a host that must override a lock sends an unlock first', and J-A20.71 (rationale l.327) reads 'J-DET-11 already makes a host unlock before it overrides a lock'. Both contradict §7.7. Determinism-r1t's VDC1-17 and VDC1-19 report the same remaining defect.

* **Required change.** §13.2's T20 group gains two bars. (T20-14) A dossier rename on a locked name path, and a `ruined` and a `removed` state on an institution whose building is locked: each lands, the lock is reported orphaned in the event's disruption report, and every other locked entity is byte-identical. (T20-15) A dossier population fall over a town whose remaining households all live in locked dwellings: the population is met within the roster tolerance, every locked building's state and shell is byte-identical, and the emptied ones are counted in `uses.heldByProtection`. §13.8 schedules both in PR on B-DOSSIER-lite from M3a, T20-15 from M4 with the epochs. §7.7's fixture line then cites T20-14 and T20-15. Rationale Part A J-DET-11 (l.111) and R25 (l.1886) read '… a host's map event that must override a lock sends an unlock first, which the log records; a dossier event is never refused by a lock — it supersedes the lock on what it changes, the lock reported orphaned (§7.7's precedence; items 20, 22)'. J-A20.71 (l.327) reads '… while J-DET-11 makes a host's map event unlock before it overrides a lock, a dossier event superseding the locks on what it changes (§7.7)'.

### VEL0-06 — MINOR EDGE-UNDEFINED (owner: scope)

* **Claim.** Partly fixed. §6.1 now does all the round-0 change asked: it widens the epoch component to u32, keys the replay `0x8000_0000 + r`, caps live epochs at 2³¹ − 1 and caps the salt at 0xFFFF with `no_alternative` (l.8996, l.9047-9050, l.9063-9066). §6.5 (9) tests it across 0x8000 (l.9746-9748). The judgment index row J-A113.61 (base l.21356) and its Part A row (rationale l.805) still read '`0x8000 + r`, the u16 range's upper half'. V06 §3.16 (l.2383-2384) now cites J-A113.61 for the replay's component instead of restating the value, so that citation leads to the superseded key. Determinism-r1t's VDC1-16 and pipeline-r1t's VPC-R1-26 report the same remaining defect.

* **Required change.** Change J-A113.61's index row to read 'the history replay keys its coarse epochs with the epoch component `0x8000_0000 + r`, the u32 range's upper half (live epochs 1 … 2³¹ − 1), so no replay draw equals a live epoch's | §6.1'. Change its Part A row to read 'Chose the replay's coarse-epoch component `0x8000_0000 + r` over a separate stage-id family, because the replay runs the same stages and concerns as a live epoch and the u32 range's upper half keeps its draws apart.'

### VEL0-11 — MAJOR EDGE-UNDEFINED (owner: V09)

* **Claim.** Partly fixed. V11 now refuses a delete of a row that readers fall back to, with the key `refuse.table.required`. It is stated in V11 §4.1 (l.4543-4550), §3.26's EI-V11-EDGE-3 (l.4497), §4's lifecycle row (l.4604) and T-V11-45 (s). The other end the round-0 change named, 'V09 §4.9 carries the key', is not written. V09 §4.9 holds `refuse.table.rung`, `.ownerRule`, `.invalid` and `.knowledge` (l.1944-1947) but no `refuse.table.required`. So the tables editor has no words, no button and no producer row for this refusal, and T-V9-15 ('every code the engine can emit has a catalogue row') fails on it. V11's repair handed this to V09; it was not applied.

* **Required change.** V09 §4.9 gains the row '| `refuse.table.required` | "{row} is what {readers} fall back to, so it stays; edit its cells instead." — `{readers}` the reading stages or tables V11 §4.1 names | `button.showWhy` why | §7.1's table-edit row for a row readers fall back to (V11 §4.1: a `defaultRow`, an `allowFallback` target, a totality rule's only cover, the last row of a table not `mayEmpty`), the row marked in the tables editor (V09 §4.14) |'. T-V9-15's fixtures include a delete of `era`'s default row `c14` from the tables editor, which shows this row.

### VEL1-01 — MAJOR EDGE-UNDEFINED (owner: model)

* **Claim.** A repair this round created a new conflict at an edge. The VEL0-01 fix (§7.7's precedence, l.11379-11382) lets a dossier population fall empty a locked or pinned dwelling by a `relet` down: 'even a protected dwelling's last household, its building then standing empty but never `vacate`d, so it keeps its state, shell, existence and every locked path'. §2.6's one statement of the clamp (l.2110-2111) says 'a residential building's `households` count lies in [1, capacity]' and that 'the bound holds through every change'; §4.11's `relet` reads that clamp. The edge now has two outcomes. Under §7.7, a building that is not vacant holds 0 households, which §2.6 forbids. Under §2.6, the clamp keeps 1 household, so the dossier's population is not met, against item 8 (f) and §7.7. No text defines how the readers of `Building.households` treat a non-vacant residential building with no household. Those readers are S11's fill, F-PLAN and the plan rung, V06's ledger and departures, and §10.3.

* **Required change.** §2.6's clamp (l.2110-2111) reads: 'a residential building's `households` count lies in [1, capacity] — 0 only for a `vacant` building (§4.11's `vacate`) and for a locked or pinned dwelling a dossier population fall has emptied (§7.7's precedence), which keeps its occupancy state, shell and every locked path and is let again by regrowth's `relet` up like any standing shell — and a non-residential building's is 0'. F-PLAN and the plan rung read that case as a vacant shell's plan (no unit housed), and the generation fill never produces it. §5.3's capacity row gains the lower bound with the same exception.

### VEL1-02 — MAJOR EDGE-UNDEFINED (owner: pipeline)

* **Claim.** A repair this round created a new conflict at an edge. §4.11's epoch step (c) (l.7804-7806) says 'a building whose household count falls but not to zero takes a `relet` down … and `vacate` fires only when its last household leaves'. The strike pool (l.8262-8263) says 'a `relet` down while households remain, `vacate` at a building's last household (J-A28.45)'. Neither has an exception, and §4.11's `LadderOp` `relet` (l.7860) bounds its `households` 'within §2.6's capacity', which §2.6 clamps to [1, capacity]. The VEL0-01 fix in §7.7's precedence (l.11379-11382) says a locked or pinned dwelling's last household leaves under a dossier fall by a `relet` down, and the building is 'never `vacate`d'. An epoch that follows §4.11 vacates a locked building and so changes a locked state, which §7.7 forbids. An epoch that follows §7.7 emits a `relet` to 0, which `LadderOp` does not admit.

* **Required change.** §4.11 step (c) reads '… and `vacate` fires only when its last household leaves — except at a locked or pinned dwelling, whose last household leaves by a `relet` down to 0 and which is never vacated (§7.7's precedence)'. The strike pool's sentence reads '… `vacate` at a building's last household, a locked or pinned one excepted (§7.7's precedence)'. `LadderOp`'s `relet` comment reads 'within §2.6's bounds (0 only at a locked or pinned dwelling a dossier fall emptied, §7.7)'. The population-fall fixture §7.7 names asserts that no `vacate` is emitted on a locked or pinned building.

### VEL1-03 — MAJOR EDGE-UNDEFINED (owner: determinism)

* **Claim.** This round, V11 §4.1 (l.4543-4550; VEL0-11) refuses a row `delete` of a row that readers fall back to: a `defaultRow`, an `allowFallback` target, a totality rule's only cover, or the last row of a table not `mayEmpty`. The refusal is 'a dangling reference (F-EDIT, `refuse.table.required`)'. §7.1's outcome table has no such row, although E-07 makes it the one statement of every dry-run outcome and its key. Its table-edit row (l.10151) names a dangling `ref` or a type error, keyed `refuse.table.invalid`, and does not mention the required-row delete. V09 §4.9 requires every `refuse.*` row to name 'an outcome row of §7.1 … or a gate V09 §4.9's lead lists', and V11 §4.1 is not one of those gates. So the refusal V11 produces has no producing row in the one statement, and V09's row has nothing to cite. Determinism's own cross-unit list handed the row on; it was not written.

* **Required change.** §7.1's outcome table gains the row '| an `editTable` row `delete`, or a pack's patch, removing a row readers fall back to — the schema's `defaultRow`, a `TotalityRule.allowFallback` target, the only row covering a value a totality rule requires, or the last row of a table not `mayEmpty` (V11 §4.1) | refused F-EDIT, naming the readers | editing the row's cells | `refuse.table.required` |'. A pack's such op is refused at load, the row standing (V11 §3.2.3). E-07's *The returned kinds* returns the catalogue key alone for it.

### VEL1-04 — MINOR EDGE-UNDEFINED (owner: V06)

* **Claim.** V06 §3.5.1 has two clauses that read differently on one edge. (4) (l.1219-1221) says a protected building's last household leaves by 'a `relet` down, never a `vacate` of a protected building's last household by this step'. (5) (l.1222), which states the ops, reads '`relet` down where a building keeps households, `vacate` at the last', with no exception. Read on its own, (5) vacates a protected building whose last household (4) let go. That is the outcome §7.7's precedence (l.11379-11382) forbids.

* **Required change.** V06 §3.5.1 (5) reads '`relet` down where a building keeps households, `vacate` at the last — never at a locked or pinned building, whose last household (4) lets out by a `relet` down to 0, the building keeping its state (§7.7's precedence)'.

### G120-scope — MAJOR F-MISSING (owner: scope)

* **Claim.** Item 120 (J133; canon's 'File g item 120 routed') assigns scope '§13.2 (the bars of item 120 (k)); the judgment index row'. Neither is in the base. The base has no 'item 120', no T120 bar and no J-A120 row. §13.2's owner-item convention still reads 'items 8–119' (l.16587). V08's T-V8-58, V10's T-V10-51 and V12's T-V12-52 all take the item-120 bars, but no base bar exists for them to take.

* **Required change.** §13.2 gains Find's bars, with the scope widened to 'items 8–125'. (T120-1) The document hashes identically with Find on and off, and turning every chip off restores byte-identical tiles. (T120-2) Each chip's matches equal the gazetteer query's rows at the viewer's effective key. (T120-3) On T-V9-66's canary fixture under a player view, no withheld thing appears in a suggestion, count, glow, pin or ghost pin. (T120-4) The filter survives every band and layer change and every commit, advance, undo and load. A chip whose last match is removed stays in the set at count 0, dark. (T120-5) At the city band every match has a pin or a count bubble, and every chip has its second cue. (T120-6) The interaction budgets hold at the metropolis cap: suggestions within 50 ms of a key and a chip's glow within 100 ms of the click. §13.8 schedules each bar, and the take-over table names V09's, V10's T-V10-51, V08's T-V8-58 and V12's T-V12-52. The judgment index gains J-A120's row: Find is a per-viewer view key, outside the document, its hash and the log; Coverage is folded into Show gaps; knowledge admission applies to every suggestion, count, glow and pin.

### G120-V09 — MAJOR F-MISSING (owner: V09)

* **Claim.** Item 120 assigns V09 the Find panel, type-ahead, chip grid, results list, the `live.find` overlay provider, Coverage folded into Show gaps (§5.4's table and cue column amended), behaviour across bands and layers, the phone bottom sheet and its tests. V09 has none of it: 'item 120' appears 0 times and `live.find` 0 times. §5.4 (l.3430-3431, l.3483) still keeps **Coverage** with its `live.coverage` provider as a separate view, which item 120 (i) forbids ('so the two never coexist'). V08 §3.16 (6), V10 §3.9b (7), V10's W rows and V12 §3.15.10 all read 'V09's Find panel' and its `live.find` provider, so those readers point at a panel and provider that V09 does not define.

* **Required change.** V09 writes Find at build depth, with these parts. (a) The panel, listing what the town holds at the effective key from §11.2's gazetteer query (dossier names first, by V08 §3.16 (6)). (b) Type-ahead over V11 §2.3's lexicon, following item 120 (c)'s matching rules. (c) The chip grid: union, colours with second cues past eight chips, Clear. (d) The results list with Go to, Next and Previous. (e) The `live.find` overlay provider: the veil at α 0.55, the halo, the outline, and pins and count bubbles under ≈ 6 px at the city band. (f) Ghost pins and '2 more Below' with Go there for other layers, and room glow at the interior band. (g) Show gaps replacing Coverage: §5.4's row and cue column and `live.coverage` retired, every Coverage behaviour kept. (h) The phone bottom sheet. (i) The `find.*` and `find.group.<key>` catalogue rows. (j) The §2.12 lifecycle row for the view key `find`. (k) A §3.16 edge row: no match, a chip whose class leaves the town (count 0, dark), a withheld kind never offered, a re-key followed by its anchor, the metropolis cap within item 120 (j)'s budgets. (l) A T-V9 bar taking T120-1 to T120-6's interface clauses.

### G121-scope — MAJOR F-MISSING (owner: scope)

* **Claim.** Item 121 (J134; canon's 'File g items 121, 122 and 123 routed') assigns scope '§13.2 (the bars of item 121 (h)); the judgment index row'. Neither exists in the base: 'item 121' appears 0 times, and there are no T121 bars and no J-A121 row.

* **Required change.** §13.2 gains item 121 (h)'s bars. (T121-1) Auto is the default on a fresh install. (T121-2) No level changes during a gesture, and at most one change happens per 10 s on a fixture loaded at its threshold (no oscillation). (T121-3) Auto holds the frame budget's p95 on the reference and low devices over §12.5's reference views. (T121-4) A manual level is honoured, or the nearest level that fits is drawn with its explanation, never a refusal or a crash. (T121-5) Labels, chrome and overlays draw at the device pixel ratio at every level (a pixel test). (T121-6) Exports are byte-identical across settings, and the document and its hash are unchanged by any setting. (T121-7) A device-pixel-ratio change re-evaluates at once. (T121-8) Native 4K, lit at full precision, holds on the ultra tier within 512 MB. §13.8 places each bar, and the take-over table names V09's and V12's bars. The judgment index gains J-A121's row: Auto by default, the 4K live-view ceiling, the ultra tier, and device state only.

### G121-V09 — MAJOR F-MISSING (owner: V09)

* **Claim.** Item 121 assigns V09 'Settings › Display › Resolution, `AppPrefs.resolution`, the view-status chip and its why, the message of item 121 (f), its tests'. V09 has none of them: 'item 121' appears 0 times, §2.11's `AppPrefs` has no `resolution`, and §5.12's Settings has no Display › Resolution.

* **Required change.** V09 writes these parts. (a) Settings › Display › Resolution: Auto (default) · 4K · 1440p · 1080p (HD) · 720p, held in `AppPrefs.resolution` as device state, never in the document, its hash or the log, with a §2.12 lifecycle row. (b) Levels above the screen's resolution are greyed ('your screen is 1440p'). (c) The view-status chip ('Auto · 1440p'), with a tooltip saying why Auto chose that level. (d) A manual choice turns Auto off. A level the device cannot hold draws the nearest level that fits, with item 121 (f)'s message ('4K needs more graphics memory than this device has; showing 1440p'), never a refusal or a crash. (e) A change of the device pixel ratio re-evaluates at once, and a level change waits for the view to settle. (f) §4.9's rows for these words. (g) §3.16 edge rows: a level above the screen; a level the device cannot hold; a monitor change mid-gesture; Auto at its lowest rung. (h) A T-V9 bar taking T121's interface clauses.

### G121-V12 — MAJOR F-MISSING (owner: V12)

* **Claim.** Item 121 assigns V12 'the bars and how each is measured' (item 121 (h)). V12 has no item-121 part: 'item 121' appears 0 times, and §3.15 covers items 111–120 only.

* **Required change.** V12 §3.15 gains item 121's measurements, each with its fixture, tier and fallback. (a) The no-oscillation bar on a fixture loaded at its threshold: at most one change per 10 s and none during a gesture. (b) Auto's frame-time p95 on the reference and low devices over §12.5's reference views. (c) The manual-level-honoured-or-explained check. (d) The labels-and-chrome-at-device-pixel-ratio pixel test at every level. (e) Byte-identical exports across settings. (f) The re-evaluation after a pixel-ratio change. (g) Native 4K lit at full precision on the ultra tier within 512 MB. It adds a T-V12 bar and §3.16 edge rows (a device below the low tier; a screen above 4K drawn at the 4K-equivalent DPR).

### G122-determinism — MAJOR F-MISSING (owner: determinism)

* **Claim.** Item 122 (J135) assigns determinism '§7.7 (the derivation row: every stressor type and condition archetype → its look kind or "no look"; knowledge admission of a condition)'. §7.7 has no such row. 'item 122' and 'crisis' appear 0 times in the base, the derivation table stops at DR43, and `ConditionOverlay` feeds only §4.11's Works share (l.8492, l.8529).

* **Required change.** §7.7 gains DR44, the crisis look, a look only and never in the model or its hash. (a) Inputs: the `ConditionOverlay`s standing in the view's week (item 117's year position), with archetype, severity, sinceWeek and untilWeek, plus the calamities' `targets`. (b) A closed table, one row for every SettlementForge stressor type and condition archetype (V08's census), each mapped to its look kind or to 'no look' (the regional_* pressures), so nothing falls through. An unknown archetype reads 'no look', reported. (c) Readers: §10.2's crisis look table and §8.2's look rows. (d) Knowledge: a condition the viewer's key withholds is not drawn (§11.2's admission; View as). (e) Bar: the same document hashes identically with crises on and off and in every week.

### G122-scope — MAJOR F-MISSING (owner: scope)

* **Claim.** Item 122 assigns scope '§13.2 (the bars of item 122 (g)); the judgment index row'. Neither exists in the base: 'item 122' appears 0 times, and there are no T122 bars and no J-A122 row.

* **Required change.** §13.2 gains item 122 (g)'s bars. (T122-1) The same document hashes identically with crises on and off and in every week. (T122-2) Each look shows exactly in its condition's weeks. (T122-3) Looks are byte-stable per seed across views and exports. (T122-4) Every SettlementForge stressor type and archetype has its row (the closed table). (T122-5) Looks scale with tier and severity. (T122-6) Nothing is drawn on water, in a gate's passage or over a label's keep-out. (T122-7) With no condition and no preview, output is byte-identical to the base (a no-op pin). §13.8 schedules them, and the take-over table names V06's, V08's, V09's, V10's, V11's and V12's bars. The judgment index gains J-A122's row: a look only, the aftermath through the epoch path.

### G122-V06 — MAJOR F-MISSING (owner: V06)

* **Claim.** Item 122 assigns V06 'the hand-over (aftermath through the epoch path; the camp at the growth frontier; reconstruction as Works)'. V06 has no item-122 part: 'item 122' and 'crisis' appear 0 times, and §3.11 (hazards), §3.6 (growth) and §3.13 (Works) do not mention a crisis look.

* **Required change.** V06 writes the hand-over at build depth. (a) What a crisis leaves (deaths, ruined institutions, a burned quarter, settled newcomers) reaches the map only through the next epoch's inputs: the calamity through `EpochInputs.events` and the hazard phase (§3.11), and the population change through growth. A look never adds, moves or removes anything. (b) The refugee camp's site is where §3.6's growth frontier would build next, so newcomers who stay become the next epoch's suburb on that ground. If growth has taken the site before the look ends, the camp moves to the next frontier site. (c) A disaster's ruined look gives way to `reconstruction`'s Works scaffolding (§3.13) from the epoch that starts it. (d) A §3.21 edge row: a look ending inside an epoch, a camp over a site the epoch builds on, a disaster look over a quarter the epoch rebuilds, every rung, undo of the epoch. (e) A T-V6 bar.

### G122-V08 — MAJOR F-MISSING (owner: V08)

* **Claim.** Item 122 assigns V08 'every stressor type and archetype and the calamities' targets read at the baseline; the closed mapping'. V08 has no item-122 part: 'item 122' appears 0 times. §3.16 covers items 111, 114, 115, 117, 118 and 120 only, and the port writes `ConditionOverlay` only for item 67's Works share.

* **Required change.** V08 §3.16 gains the port side of item 122. (a) Every `stressors` type (fifteen; fourteen seen in the census) and every `activeConditions` archetype is read at the pinned baseline, with severity, status, tick and duration, together with the calamities' `targets`. The field table (§2.4) lists each path. (b) The closed mapping assigns each type and archetype a look kind or 'no look', and an unknown one reads 'no look', reported with `unmapped_word`. (c) sinceWeek and untilWeek come from the condition's tick and duration on the `sf445` calendar. (d) A §3.17 edge row: no condition, a condition with no duration, overlapping conditions, an unknown archetype, a condition whose target the map lacks. (e) A T-V8 bar.

### G122-V09 — MAJOR F-MISSING (owner: V09)

* **Claim.** Item 122 assigns V09 'Show crises, the preview, the why lines, Find's listing'. V09 has no item-122 part: 'item 122' and 'crisis' appear 0 times.

* **Required change.** V09 writes these parts. (a) A **Show crises** switch (on by default) as view state, with its §2.12 lifecycle row. (b) The manual crisis preview for a map without a dossier (as item 118 (b)), never in the document or its hash. (c) The why lines ('Refugee camp: the Northmarch migration, weeks 12–20') and their §4.9 rows. (d) Find's listing of crisis looks (item 120). (e) View-as admission: a withheld condition is not drawn. (f) A §3.16 edge row: no condition, several crises at once, a crisis ending while shown, a preview on a dossier map. (g) A T-V9 bar.

### G122-V10 — MAJOR F-MISSING (owner: V10)

* **Claim.** Item 122 assigns V10 'the explanations' (item 122 (f): the clerk names the crisis and its weeks). V10 has no item-122 part: 'item 122' appears 0 times, and §3.9b covers items 111–120.

* **Required change.** V10 §3.9b gains the crisis explanations. A `why` on a crisis look names the condition, its archetype and its weeks ('Refugee camp: the Northmarch migration, weeks 12–20'), and says it is a look that changes nothing on the map, under the key's admission (a withheld condition is never named). A §3.23 row covers no condition and a withheld one, and a T-V10 bar tests both.

### G122-V11 — MAJOR F-MISSING (owner: V11)

* **Claim.** Item 122 assigns V11 'the look, symbol, scale and placement tables'. V11 has no item-122 part: 'item 122' appears 0 times, and §3.25 covers items 111 and 113–119.

* **Required change.** V11 §3.25 gains the crisis tables, with §2.8d row types and §3.1 catalogue entries. (a) The look per archetype: siege, migration, plague, famine, beast, raiders, disaster, occupation, rebellion, boom and bust, with the regional_* pressures as 'no look'. (b) Symbols per style family. (c) Scale by severity and tier. (d) Placement rules and priorities: siege camp, then quarantine camp, then refugees; never on water, a gate's passage or a keep-out. (e) The density cap. Every enumeration column is `calibratable: false`. A §3.26 edge row covers an unknown archetype and a scale at severity 0 and 1, and T-V11 gets a clause.

### G122-V12 — MAJOR F-MISSING (owner: V12)

* **Claim.** Item 122 assigns V12 the bars (item 122 (g)). V12 has no item-122 part: 'item 122' appears 0 times.

* **Required change.** V12 §3.15 gains item 122's measurements. (a) The no-op pin with no condition and no preview, registered on §3.7.8's engine. (b) The hash identity in every week, with crises on and off. (c) The look-in-its-weeks check. (d) Byte-stability across views and exports. (e) Closed-table coverage. (f) Tier and severity scaling as a statistic. (g) The nothing-on-water, gate-passage or keep-out count. It adds a T-V12 bar and a §3.16 edge row.

### G123-determinism — MAJOR F-MISSING (owner: determinism)

* **Claim.** Item 123 (J136) assigns determinism '§6.3 (one keyed threshold per plan element by lineage and element id; no new ids; monotone in the decay level)'. §6.3 has no such rule: 'item 123', 'damage layer' and 'decay level' appear 0 times in the base, and §6.1 registers no concern for it.

* **Required change.** §6.3 gains the damage thresholds. Each plan element (each wall run, floor area, door, window, stair, roof bay over a room, furniture piece) draws one threshold in [0, 1) on a registered concern (§6.1, e.g. `plan.damage`, non-rerollable). The draw is keyed by the building's lineage and the element's id, at epoch component 0. No new id is minted, and every room, wall and opening id is unchanged. An element shows as damaged exactly when the building's decay level is at or above its threshold. Damage is therefore monotone (a higher level's damage contains a lower level's), stays in place, and leaves in reverse order as the level falls. §6.5 (9) gains a test that the same element breaks at the same level for a given seed on every engine.

### G123-scope — MAJOR F-MISSING (owner: scope)

* **Claim.** Item 123 assigns scope '§13.2 (the bars of item 123 (f)); the judgment index row'. Neither exists in the base: 'item 123' appears 0 times, and there are no T123 bars and no J-A123 row.

* **Required change.** §13.2 gains item 123 (f)'s bars. (T123-1) Room, wall and opening ids are identical between the intact and the damaged plan. (T123-2) Damage is monotone in the decay level on every element. (T123-3) The same element breaks at the same level for a given seed. (T123-4) Restoring reverses the damage. (T123-5) The exterior agrees with the plan. (T123-6) Battle-map exports' line of sight follows fallen walls. (T123-7) A building never decayed is byte-identical to today's plan (a no-op pin). §13.8 schedules them, and the take-over table names V03's, V06's, V09's, V10's, V11's and V12's bars. The judgment index gains J-A123's row: one plan, damaged, never redrawn.

### G123-V06 — MAJOR F-MISSING (owner: V06)

* **Claim.** Item 123 assigns V06 'the decay level over time per lineage (existence state, years since abandoned) and restoration'. V06 has no item-123 part: 'item 123' and 'decay level' appear 0 times.

* **Required change.** V06 writes the decay level at build depth. (a) A derived value in [0, 1] per building lineage, computed from its existence state (abandoned, decayed, ruined, reused) and the years since it was abandoned, at V11's per-material rate (timber faster than stone). It is never stored where it can be derived, and it gets its lifecycle row (§2.12). (b) Restoration (`reused`, a repair, `reoccupy`) lowers the level so damage leaves in reverse order, a repaired element drawn in patch material (item 114). (c) A building met already ruined, by generation or by item 113's replay, gets the plan it had when built, then its level. (d) A §3.21 edge row: level 0, level 1, a reuse at level 1, a scrub back across a restoration, undo of the epoch. (e) A T-V6 bar.

### G123-V09 — MAJOR F-MISSING (owner: V09)

* **Claim.** Item 123 assigns V09 'the panel lines' (item 123 (e): 'roof fallen in over the hall; the upper floor is gone'). V09 has no item-123 part: 'item 123' appears 0 times.

* **Required change.** V09 writes the damaged plan's panel lines in §4.9's catalogue: the rooms that are unsafe, roof holes, floorless storeys and fallen walls, each worded from the damage layer's elements. The plan panel shows the decay level and its state. A §3.16 edge row covers a building never decayed (no line) and a fully ruined one (ground floor only). A T-V9 bar tests them.

### G123-V10 — MAJOR F-MISSING (owner: V10)

* **Claim.** Item 123 assigns V10 'the explanations'. V10 has no item-123 part: 'item 123' appears 0 times.

* **Required change.** V10 §3.9a (the plan's causes) gains the damage explanations. A `why` on a damaged plan names the decay level, the existence state and its years, and the elements fallen, all read from the damage layer and never invented. It answers 'why is this floor gone' from the element's threshold against the level. A §3.23 row covers level 0 and a withheld building, and a T-V10 bar tests them.

### G123-V11 — MAJOR F-MISSING (owner: V11)

* **Claim.** Item 123 assigns V11 'the thresholds' tables by material and element kind'. V11 has no item-123 part: 'item 123' appears 0 times.

* **Required change.** V11 gains the damage tables, with §2.8d row types, §3.1 entries and a §3.25 subsection. (a) Per material, the decay rate per year (timber faster than stone). (b) Per element kind (wall run, floor area, door, window, stair, roof bay, furniture), the share of the threshold range it occupies, so partitions fall before outer walls and upper floors before ground floors (item 123 (c)). (c) Cellars and crypts by their own rows. A §3.26 edge row covers a material with no row (the default row) and a rate of 0. T-V11 gets a clause.

### G123-V12 — MAJOR F-MISSING (owner: V12)

* **Claim.** Item 123 assigns V12 the bars (item 123 (f)). V12 has no item-123 part: 'item 123' appears 0 times.

* **Required change.** V12 §3.15 gains item 123's measurements: (a) the id identity between intact and damaged plans; (b) the monotone check over a level sweep; (c) the same-seed same-level check on the engines; (d) restoration reversing; (e) exterior–plan agreement; (f) line of sight in battle-map exports; (g) the no-op pin for a never-decayed building on §3.7.8's engine. It adds a T-V12 bar and a §3.16 edge row.

### G124-determinism — MAJOR F-MISSING (owner: determinism)

* **Claim.** Item 124 (J137) assigns determinism '§6.1 (the view-only, session-seeded weather stream, replayable from seed and clock, never touching the model's streams)'. §6.1 has no weather stream: 'item 124' appears 0 times in the base, and §6.1 registers no weather concern.

* **Required change.** §6.1 gains the weather stream. It is a view-only stream on `STAGE_VIEW`, a registered concern (e.g. `view.weather`, non-rerollable, never in a model digest). It is seeded per session by a session seed and keyed by the clock's minute and the climate row's week band, so a given session seed and clock replay the same spells (item 124 (b)), and tests fix both. It never reads or advances a model stream or key. A §6.5 test checks that the model digest and every tile are identical with the effects on and off, and that the timeline replays from its seed and clock.

### G124-scope — MAJOR F-MISSING (owner: scope)

* **Claim.** Item 124 assigns scope '§13.2 (the bars of item 124 (i)); the judgment index row'. Neither exists in the base: 'item 124' appears 0 times, and there are no T124 bars and no J-A124 row.

* **Required change.** §13.2 gains item 124 (i)'s bars. (T124-1) The hash and every tile are identical with the effects on and off, and a spell leaves the tile cache untouched. (T124-2) The frame cost stays within ≈ 1 ms at the densest spell. (T124-3) No falling or lying snow appears in a climate row whose winter does not freeze, at any week. (T124-4) Arid rain frequency stays within its row. (T124-5) Effects are off by default under reduced motion, on the low tier and on phones. (T124-6) Labels and chrome are never covered (a pixel test). (T124-7) No luminance step is faster than the photosensitivity limit. (T124-8) Exports are byte-identical with the effects on and off. (T124-9) The timeline replays from its seed and clock. §13.8 schedules them, and the take-over table names V09's, V11's and V12's bars. The judgment index gains J-A124's row: cover and precipitation kept apart, and a view layer only.

### G124-V09 — MAJOR F-MISSING (owner: V09)

* **Claim.** Item 124 assigns V09 'the advanced panel's switch, Start a shower now, the defaults (on with headroom; off on the low tier, phones and reduced motion)'. V09 has no item-124 part: 'item 124' appears 0 times, and neither §4.14's advanced panel nor `AppPrefs` has a weather-effects switch.

* **Required change.** V09 writes these parts. (a) **Weather effects** on/off in the advanced panel (§4.14), held in `AppPrefs` as device state with a §2.12 lifecycle row. It defaults to ON where the tier has headroom and OFF on the low tier, on phones and under reduced motion. (b) **Start a shower now** starts a spell of the season's commonest kind. In a climate whose winter does not freeze it never starts snow; in an arid week it starts the row's kind, or dust haze. (c) §4.9's words. (d) A §3.16 edge row: the switch under reduced motion, on the low tier, during a gesture, and Start a shower now in a dry month. (e) A T-V9 bar.

### G124-V11 — MAJOR F-MISSING (owner: V11)

* **Claim.** Item 124 assigns V11 'the climate row's weather columns per week band and the two hard rules'. V11 has no item-124 part: 'item 124' appears 0 times, and the climate rows of item 117 carry season columns only.

* **Required change.** V11's climate rows gain weather columns per week band: each effect kind's frequency and duration (rain, drizzle, snow, mist, fog, leaves, cloud shadows, heat shimmer, dust haze), with item 124 (c)'s defaults per climate. The compiler enforces the two hard rules: no snow, falling or lying, in a row whose winter does not freeze, and in arid country rain rare, with none in its dry months. A §3.26 edge row covers a band with no column (no effect) and a row violating a hard rule (refused at compile). T-V11 gets a clause.

### G124-V12 — MAJOR F-MISSING (owner: V12)

* **Claim.** Item 124 assigns V12 'the bars and how each is measured'. V12 has no item-124 part: 'item 124' appears 0 times.

* **Required change.** V12 §3.15 gains item 124's measurements: (a) the tile-and-hash identity on and off; (b) the frame cost at the densest spell; (c) the snow and arid-rain checks over all 52 weeks of every climate row; (d) the defaults under reduced motion, on the low tier and on phones; (e) the labels-never-covered pixel test; (f) the photosensitivity luminance-step check; (g) the export identity; (h) the replay from seed and clock. It adds a T-V12 bar and a §3.16 edge row.

### G122h-V08 — MAJOR F-MISSING (owner: V08)

* **Claim.** Item 122 (h)–(i) (J138; canon's 'File g item 122 (h)–(i) and item 125 routed') assigns V08 'force, coalition and travelling-group sizes read from the dossier when present'. V08 has no such part: 'item 122' appears 0 times, and the digest (§2.5) has no force, coalition or group field.

* **Required change.** V08 gains (a) `DossierDigest` fields for armies (headcount, allegiance), coalitions (their member armies) and travelling groups (people, kind), each read where the dossier carries it. The paths are listed in §2.4's field table as 'in development: confirmed by the final local check (item 125 (d))'. (b) Each field has a fallback: absent → item 122 (b)'s scale by severity and tier, with the calamity's or condition's own counts (`exodus`, arrivals) where it has them. (c) A §3.17 edge row: a headcount of 0, a coalition of one army, a force larger than the frame and margin can hold (the ring's massed marks, item 122 (i)), a field present with an unreadable value (the fallback, reported). (d) A T-V8 bar.

### G122h-V09 — MAJOR F-MISSING (owner: V09)

* **Claim.** Item 122 (h)–(i) assigns V09 'Fit, the opening view, the limit, the panel's numbers'. V09 has no such part: 'item 122' appears 0 times, and §4.19 and §5.6 bind Fit and the zoom-out stop to item 116's bounds only.

* **Required change.** V09 writes these parts. (a) While a crisis look stands, the opening view and **Fit** frame the town and its camps, and item 116's zoom-out limit widens to the bounds of town and camps together. When the crisis ends, both return to item 116's. A view the user has moved is never changed: only the opening view, Fit and the limit change. (b) The crisis panel's numbers ('about 24 000 besiegers, three armies'). (c) A §3.16 edge row: a crisis starting and ending while the view is moved, a force drawn as massed marks on the ring, two crises at once. (d) A T-V9 bar.

### G122h-V11 — MAJOR F-MISSING (owner: V11)

* **Claim.** Item 122 (h)–(i) assigns V11 'the rates'. V11 has no such row: 'item 122' appears 0 times.

* **Required change.** V11's crisis tables (G122-V11) gain the rates, each calibratable with its register entry: (a) camp area 45 m² a head, for armies and travelling groups alike; (b) one siege engine per 1 500 besiegers, capped by the gates and wall stretches it can face; (c) the coalition's spread round the town, each army its own camp and colours. A §3.26 edge row covers a headcount of 0 and a rate cell at its range ends.

### G122h-V12 — MAJOR F-MISSING (owner: V12)

* **Claim.** Item 122 (h)–(i) assigns V12 the bars: 'the camped area proportional to headcount within 10 %; two armies twice one; the opening view contains every camp; the limit restored when the crisis ends'. V12 has none: 'item 122' appears 0 times.

* **Required change.** V12 §3.15 gains these measurements: (a) camped area ∝ headcount within 10 %; (b) two armies' ground twice one's; (c) the opening view and Fit containing every camp while a look stands; (d) item 116's limit restored when the crisis ends; (e) a force too large for frame and margin drawn as ring marks, the frame, model and hash unchanged. It adds a T-V12 bar and a §3.16 edge row.

### G125-determinism — MAJOR F-MISSING (owner: determinism)

* **Claim.** Item 125 (J139) assigns determinism '§7.7 (DR1, DR3, DR19, DR29 and DR42 re-sourced to the dossier or the generator's fallback)'. They are not re-sourced. DR1 still reads 'the realm cell's terrain, river and coast (optional)' (l.11584). DR42 reads '`HostContext.week` (the campaign's `calendar.elapsedWeeks`, §14)' and 'the realm block's climate word' (l.11625). 'item 125' appears 0 times in the base.

* **Required change.** §7.7's rows read the dossier only, each with the generator's fallback. DR1 drops the realm cell: the site comes from `site.terrain`, `site.access`, the water deposits and `site.culture`, else the blueprint. DR3, DR19 and DR29 replace their realm inputs with the dossier's own fields, else the generator's defaults or the user's settings (latitude, realm placement, neighbours' bearings). DR42's week becomes the dossier's latest stamped tick (its conditions' `triggeredAt`, its calamities' and history's ticks) under the follow flag, else the user's season control (midsummer standalone). Its climate becomes the dossier's terrain type with our biome rules (`site.climate` only where the dossier carries it). Each missing field is reported with the fallback taken, never refused. The same dossier with and without a host context derives the identical document and hash.

### G125-scope — MAJOR F-MISSING (owner: scope)

* **Claim.** Item 125 assigns scope '§13.2 (the bars of item 125 (e)); the judgment index row'. Neither exists: 'item 125' appears 0 times in the base. §13.8's T117-6 row still reads 'PR on B-DOSSIER-lite's births with a test-side `HostContext.week`' (l.17841), an input item 125 (a) retires.

* **Required change.** §13.2 gains item 125 (e)'s bars. (T125-1) A dossier with only SettlementForge's required keys generates a full map, every absent field reported with the fallback taken. (T125-2) The same dossier with and without a host context yields the identical document and hash. (T125-3) No code path of the port reads anything but the dossier, checked statically over the adapter's imports and reads. §13.8 schedules them. T117-6's tier row reads 'PR on B-DOSSIER-lite's births whose dossier carries a stamped tick (the week's source, item 125 (b)), and on one with none (the season control's midsummer)'. The judgment index gains J-A125's row: the dossier is the only data input, the map supplies the rest, and view commands are kept as commands.

### G125-V08 — MAJOR F-MISSING (owner: V08)

* **Claim.** Item 125 assigns V08 'every digest row with its fallback column; `HostContext.week` and `.realm` retired as inputs; the week from the dossier's ticks; the final local check's brief'. None is written: 'item 125' appears 0 times, and `HostContext.week` is still read as an input in many places. They are W64 (l.278), §2.3's `history.atWeek` (l.515), §2.4's field table (l.645), §3.6's dating rungs ('`HostContext.week` is the last rung', l.1768, and the absorb's week, l.1777), the conditions' weeks (l.1999), the history's dating (l.2262) and §3.16 (4), where the client sends `view.set { week }` 'with `HostContext.week` after each `doc.load`' (l.2352-2361). §3.16 (4) also takes the climate from 'the realm block's climate word'.

* **Required change.** V08 writes these parts. (a) §2.5's digest gains a fallback column on every row: the generator's own choice, as on a map made without a dossier, reported when taken. (b) `HostContext.week` and `.realm` are retired as inputs (§1.2, §2.4, W rows); a host's `view.set { week }` stays a view command (item 125 (c)). (c) The week is the dossier's latest stamped tick (conditions' `triggeredAt`, calamities' and history's ticks), else the user's season control for the view and `W₀` for an absorb's dating. The `HostContext.week` rung is removed from W64, §2.3's `history.atWeek`, §2.4, §3.6's dating rungs, the conditions' and history's weeks, and §3.16 (4). (d) The climate is the dossier's terrain type with item 117 (d)'s rows. (e) The final local check's brief (item 125 (d)): field by field, every path the port reads exists with the shape expected, every needed but absent field has its fallback, and the in-development fields (item 122 (h)'s forces, coalitions and groups; a current-week stamp) are listed as present or absent, in a table of matches, mismatches and fixes. (f) A §3.17 edge row: a required-keys-only dossier, a dossier with no tick, a host context present and absent. (g) A T-V8 bar.

### G125-V09 — MAJOR F-MISSING (owner: V09)

* **Claim.** Item 125 assigns V09 'the season control as the week's fallback'. V09 has no item-125 part: 'item 125' appears 0 times. Its season control (item 117) follows SettlementForge's week as the host sends it, with no rule for a dossier that carries no stamped tick.

* **Required change.** V09's season control becomes the week's fallback. On a dossier map whose dossier carries a stamped tick, the follow flag reads that tick's week. With no tick, or standalone, the control's own position holds (midsummer by default), labelled as the map's choice and not SettlementForge's. A host's `view.set { week }` moves the view as a user's pick would. A §3.16 edge row covers no tick, a tick far in the past and a host command against a user's moved control. A T-V9 bar tests them.

### G125-V12 — MAJOR F-MISSING (owner: V12)

* **Claim.** Item 125 assigns V12 the bars (item 125 (e)). V12 has none: 'item 125' appears 0 times.

* **Required change.** V12 §3.15 gains item 125's measurements: (a) the required-keys-only dossier generating a full map with every fallback reported; (b) the identical document and hash with and without a host context; (c) the static import-and-read check of the port's adapter. It adds a T-V12 bar and a §3.16 edge row.
