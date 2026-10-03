# Verify — edge cases and combinations across time, the host, the tools and the tables (coherence/verify-edges-life-r0s)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-edges-life-r0s; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] inputs located (edges.md/json, canon dated rulings g 114–119, peers' r0s results) · [x] §5 failure ladders read whole · [x] determinism edges (§5, §6.1, §6.4, §7.1–§7.7 read whole) · [x] scope edges (T-RIG rows) · [x] V06 §3.21 · [x] V08 §3.17 · [x] V09 §3.16 and §4.21 · [x] V10 §3.23 · [x] V11 §3.26 · [x] V12 §3.16 · [x] owner-named combinations · [x] lane walk (growth and decline, epochs after a save, lifecycle at every state, dossier extremes, pins and locks, the clerk at its limits, toggles and presets, table range ends, g 114–119 parts) · [x] issues written · [x] result saved · [x] LANDED

Members: determinism (base §5–§7), scope (base title, summary, §0, §1, §13–§17, decisions, judgment index, staged list,
Appendix A), V06, V08, V09, V10, V11, V12 — the live text after assemble-r0.

## Method

**The catalogue.** For my members `edges.json` lists 367 UNDEFINED and 192 UNTESTED mechanism edges and 214 owned UNDEFINED
combinations: determinism 33 / 4 / 39, scope 8 / 0 / 0, V06 48 / 64 / 42, V08 41 / 20 / 62, V09 94 / 67 / 25, V10 51 / 14 / 8,
V11 52 / 12 / 21 and V12 40 / 11 / 17. I also checked the named combinations my members own or touch: a settlement growing
over a sealed void, a dossier removing what an edit pinned, and an epoch undone after a save.

**How each catalogue edge was checked.**
- **Volumes.** Each volume closes its catalogue edges in one edge section: V06 §3.21, V08 §3.17, V09 §3.16, V10 §3.23,
  V11 §3.26 and V12 §3.16. Each rewrite report maps catalogue ids to rows. A script confirmed that every catalogued id is
  mapped (V08 by the archive's line numbers): 0 unmapped edges and 0 unmapped combinations in all six volumes.
- **Rows read in full.** I read each edge section whole. Every row was checked for an outcome, a rung on §5's ladder (never
  a whole-map retry) and a test.
- **Tests.** I confirmed that each edge suite exists in its volume's §7 and has the clauses its rows cite: T-V6-70 (a)–(n)
  with T-V6-71–74, T-V8-49 (a)–(m), T-V9-80, T-V10-50, T-V11-45 (a)–(r), and T-V12-42 with T-V12-43.
- **Determinism and scope.** Neither has a per-id map. Their 41 mechanism edges and 39 combinations were checked one by
  one against the current text:
  - §5 was read whole, and §7.1–§7.7 whole.
  - §6.1's key layout and caps, and §6.4.
  - §13's T-RIG-1 – T-RIG-6 rows for scope.

**The lane walk** looked for edges and combinations that the catalogue missed. It walked the members' mechanisms at their
limits:
- **Growth and decline.** Growth from hamlet to city; decline to nothing; the hand-off band.
- **Time and the lifecycle.** An epoch undone after a save. Save, load, crash recovery, undo, redo, regenerate and migrate
  at every state: mid-advance, after a rebase, past the undo cap, at the counters' caps.
- **The dossier.** Empty, maximal and self-contradicting dossiers. A dossier event against a pin and against a lock. The
  port's epochs.
- **Edits and locks.** Edits against locks. Everything locked and then regenerated, including a rung change.
- **The clerk.** The clerk at its limits: segments, caps, staleness.
- **Toggles and presets.** Every toggle and preset, with a preset at a rung it was not built for.
- **Tables.** Table rows at their range ends, including a user's row deletes.
- **g items 114–119.** The volumes' parts of items 114–119.

Peers' landed findings (`results/*.json`, 163 issues owned by my members) were read first; none is re-raised.

## Outcome

**11 issues: 2 blocker, 9 major.** Owners: determinism 6, V09 1, V08 1, pipeline 1, V10 1, V11 1.

- **The six volumes are in good shape at their limits.** Every catalogue edge and combination they own has an outcome, a
  rung and a test. The three named combinations are closed with tests:
  - the sealed void: V06 §3.21 (b), T-V6-33–40, T-V9-38;
  - the pin the dossier removes: V08 §3.17's editing row, T-V8-49 (k), V09's orphans;
  - the epoch undone after a save: V06 §4.1, T-V6-23, T-V9-16.
- **Determinism's catalogue edges are closed by the rewrite**, three excepted:
  - the empty-edit forms (with test);
  - the bug abort (§5.1 (8));
  - E-GEN-1 (§5.1 (9)) and rung independence (§5.1 (10));
  - the user reroll cap (§5.1 (6), tested);
  - the budget-0 row (§7.7 item 5);
  - the supersession of a user's value by the dossier;
  - §7.2's tests;
  - §7.4's *Every kind at the edit boundary* table for 36 of the 39 combinations.
  - The three exceptions: the frame row's lock and undo cells (VEL0-04), the oversized undo record (VEL0-07, untested),
    and the zero-area `drawBoundary` (VEL0-03).
- **The blockers.**
  - VEL0-01: a dossier event that must change a locked element. Base §7.7 and §7.1 refuse it; base §7.7 item 5 and V08
    land it.
  - VEL0-02: an `advance` is not journalled, so crash recovery silently drops the epochs it appended.

## Issues

### VEL0-01 — BLOCKER EDGE-UNDEFINED (owner: determinism)

* **Claim.** A dossier event that must change something the user has LOCKED is given two contradictory outcomes, and no
  test covers it.
  - **The base refuses it.** §7.7's precedence (l.10870–10878) reads 'lock > dossier existence' and says every
    dossier-owned value 'sits below the lock'. It also says 'A host that must override a lock sends an unlock first'
    (J-DET-11). §7.1's outcome table, row 1 (l.9671), refuses an edit that 'targets … a locked or pinned entity or
    attribute path'.
  - **The base and V08 also land it.** §7.7 item 5 (l.10986–10989) applies a dossier event 'around' the map's
    protected entities. It orphans 'an edit it can no longer honour', and a dossier fact supersedes the user's value.
    V08 §3.3 (l.1477) says the port's events 'are never refused by map locks or pins'.
  - **The port never sends an unlock.** It diffs whole dossiers, so cases that land ON the locked thing are refused under
    the first reading: the absorb fails, and the map contradicts the dossier, against items 20 and 22. Under the second
    reading they land. The cases:
    - a rename (F15) on a locked name path;
    - a `ruined` (F5) or `removed` (F2) state for an institution whose building is locked, whose `ruin` or `closeUse`
      converts a locked building;
    - a class change (F3) on a locked class path;
    - a dossier `knownTo` on a locked path;
    - a dossier population fall over a district whose dwellings are all locked (V06 §3.1 never strikes a locked one).
  - **The catalogue and the tests miss it.** The catalogue marked C-dossier-lock DEFINED by a quote about a user's
    declaration meeting a lock — the opposite direction — so no unit wrote this case. T20-1 – T20-13 and T22-1 – T22-4
    (l.15663–15676, l.15942–15950) do not test it, and V08 §3.17's editing row covers pins only.
* **Required change.**
  - **Precedence.** In §7.7's precedence, the one statement, rule by the owner's precedence (principle (3): items 20 and
    22 first): 'A dossier event is never refused by a lock or a pin. A lock or pin on a dossier-owned value, or on a
    dossier-backed element's existence, state, name, kind or membership, holds against every map event, re-derivation
    and epoch. A dossier event that changes it supersedes it: the lock or pin is reported orphaned in the event's
    disruption report (`why`: the dossier fact) and stays in the log as history (§7.7 item 5). A lock on anything else the
    event touches is honoured, and the event is applied around it by its least-disruption order.'
  - **The population case.** State the outcome of a dossier population fall that the unlocked dwellings cannot absorb.
  - **Scope of the unlock rule.** Limit J-DET-11's sentence and §7.1's outcome row 1 to a host's map events (no
    `EditBase.dossier`).
  - **Tests.** Add to §13.2's T20 group: a dossier rename on a locked name path, and a `ruined` and a `removed` state on
    an institution whose building is locked. Each lands, the lock is reported orphaned, and every other locked entity is
    byte-identical. Add the population-fall fixture with its stated outcome.

### VEL0-02 — BLOCKER EDGE-UNDEFINED (owner: V09)

* **Claim.** Crash recovery loses an `advance` without saying so.
  - **What is journalled.** V09 §2.11's `JournalCall` (l.906–912) and §3.8 (1) (l.1225–1229) journal `edit`,
    `regenerate`, `adjust`, `undo`, `redo` and a shared `setView`.
  - **What is not.** `advance` is its own §11.2 call (l.14287). It appends a whole `group` of `epoch` events (V06 §4.1),
    and it is not journalled.
  - **Why compaction does not save it.** Compaction runs after 50 done entries, after 60 s idle 'after at least one
    entry', or on `visibilitychange` (l.1232–1236). An advance makes no entry. A tab killed after an advance, or in the
    middle of one with epochs already folded, and before the page is hidden, recovers to the snapshot with none of the
    epochs.
  - **The user is not told.** 'A clean recovery says nothing' (l.1246), so up to a century of history is lost silently.
    Any later journalled call fails its `logHeadBefore` check, so recovery stops there and quarantines the rest.
  - **Not covered.** V09 §3.16's row 16 and T-V9-17 (200-edit sessions; l.3816) do not cover it. The catalogue has no
    advance × autosave combination.
* **Required change.**
  - **Journal the call.** Add `| { api: 'advance'; req: AdvanceRequest; stoppedAfter?: number /* the epochs folded when
    Stop ended it */ }` to `JournalCall`.
  - **Phases.** §3.8 (1) lists `advance` among the journalled calls. It is written pending before the call with its
    `logHeadBefore`, and done with `logHeadAfter`, `seqs` and, when Stop ended it, `stoppedAfter`.
  - **Recovery.** Recovery re-issues the call from `logHeadBefore`. A stopped advance halts after `stoppedAfter` epochs;
    a trailing pending advance is re-issued whole.
  - **Tests.** Add to V09 §3.16's row 16 and to T-V9-17: a 100-epoch advance killed after its last epoch and before
    compaction, one killed mid-group, and one stopped at epoch 40. Each reopens at the journalled head.

### VEL0-03 — MAJOR EDGE-UNDEFINED (owner: determinism)

* **Claim.** §7.1 *Drawing at the authoring boundary* gives one input two outcomes.
  - **Empty edit.** 'a stroke that resamples to fewer than two points, or a ring to zero area, is an empty edit'
    (l.9520–9521; *Empty edits*, l.9608–9611: it appends nothing).
  - **One-cell bend.** For `drawBoundary`: 'a zero-area polygon, the cell under its first point' (l.9525). This is a
    one-cell district bend, which appends an event.
  - **Where it arrives.** V09's canvas sends no zero-area draft, and V10's encoders refuse a lasso of fewer than three
    non-collinear points. A zero-area `drawBoundary` from the API, a skeleton file or a host bridge therefore either
    appends nothing or makes a one-cell district.
  - **No test for the positive-area bend.** A polygon that covers no cell by half takes 'the cell it covers most'
    (EI-DETERMINISM-EDGESOBSERVED-005). No test exists for it in §13.2, V09 or V10.
* **Required change.**
  - In §7.1, replace '(ties by address; a zero-area polygon, the cell under its first point)' with '(ties by address); a
    zero-area polygon is an empty edit (below)'.
  - Add to *Empty edits*' B-EDIT test: 'a zero-area `drawBoundary` leaves `nextSeq` and both digests unchanged; a thin
    polygon covering no L1 cell by half commits the one-cell bend with its line, the cell being the one it covers most
    (ties by address)'.

### VEL0-04 — MAJOR EDGE-UNDEFINED (owner: determinism)

* **Claim.** No text says what happens to protected content when the frame shrinks.
  - **The table leaves it open.** §7.4's *Every kind at the edit boundary* frame row (l.10456) leaves its lock cell and
    its undo / save-and-load cells as '—'. For regenerate it says only 'fixed by the rung; a rung change is a Re-derive
    from S0'. The catalogue's C-frame-lock and C-frame-regen therefore stay undefined.
  - **The frame can shrink.** §3.2 (9) promises that a frame never shrinks only 'where §4.11 grows it at an epoch'
    (l.3203–3208). A Re-derive from S0 or S2 recomputes the frame by `frameLaw`, where A ∝ population (l.3194–3196):
    - a rung change from T1's size chips;
    - an Adjust of the population (§7.1, l.9485–9489).
  - **The outcome is missing.** Nothing says what happens to locked, pinned or declared entities, or to drawn
    constraints (locked by default, §7.2), left outside the smaller frame:
    - a lock cannot be *kept* outside the arena;
    - carry-over has no successor for them;
    - §7.1 clips a drawn feature to the frame.

    The fate list would have to invent a fate for a protection.
* **Required change.**
  - **The lock cell of §7.4's frame row.** 'Locked, pinned and declared entities and every drawn constraint are fixed
    inputs of the frame. A re-derivation whose frame law gives a frame that does not enclose them takes the smallest frame
    of the rule (at the frame's `aspect`, centred on (0, 0)) that does, named in the dry run's one line
    (`bend.frame.held`) — never an *orphaned* fate for a protection.'
  - **The undo cell.** 'The Re-derive's undo (a whole-town event, undoable while latest).'
  - **The save-and-load cell.** 'The frame is the recipe's and the log's, re-derived identically.'
  - **§3.2 (9).** Add: 'a re-derivation never shrinks the frame below its protected content'.
  - **Test.** A B-EDIT fixture: CITY → TOWN with a locked building and a drawn wall beyond TOWN's frame keeps both, the
    frame held and reported.

### VEL0-05 — MAJOR EDGE-UNDEFINED (owner: determinism)

* **Claim.** An owner can undo a port epoch that the base means to protect.
  - **The rule.** §7.4 *Replay semantics* (l.10248–10256) excludes from `undo`, `redo` and `revert`:
    - the `creation` events;
    - every event with `EditBase.dossier` set;
    - 'an `epoch` that carried one in `EpochInputs.dossier`'.
  - **Port epochs can fall outside it.** The port's cadence epochs (V08 §3.6 (3), l.1757–1767) fall at every year end in
    an absorb's span, at each population crossing and at each calamity week. They carry the dossier's population target
    and slices.
    - **No dossier event.** An epoch at a week with no element change carries no `EpochInputs.dossier`.
    - **No envelope.** `EditBase.dossierChange` holds one change (V08 §3.6 (5)), so a year-end epoch of a catch-up has no
      change of its own to carry, and its `EditBase.dossier` is not guaranteed.
  - **Who can reach it.** Such an epoch is a live event of session `host:port`. The user's undo key skips it, since no
    user stack holds it. Two paths can still target it:
    - an owner's `undo(h, of)` (§7.4 *Targets*, l.10333–10334; §11.2);
    - V09's 'Go back to here' (V09 §3.9, l.1262–1265), which stops only at 'the latest one that is not undoable'.
  - **The effect.** Undoing it rolls back a dossier population and a year of the host's clock without a dossier
    instruction. That is exactly the reason §7.4 gives for the rule (item 20 (c)). V06 §4.1 (l.3246–3247) says 'a
    dossier-bound history is undone only by the host'.
* **Required change.**
  - **One rule.** In §7.4 *Replay semantics*, replace the clause 'every later dossier event (`EditBase.dossier` set) — …
    — is likewise no `undo`, `redo` or `revert` target of a map event, and neither is an `epoch` that carried one in
    `EpochInputs.dossier`' with: 'every event of the port's reserved session `host:port` (§7.1; V08 §3.6 (6)) —
    dossier events, `dossierFacts`, `dossierRecord` and the port's epochs alike — is no `undo`, `redo` or `revert` target
    of a map event'.
  - **The outcome row.** §7.1's `refuse.undo.dossier` row names 'an event of session `host:port`'.
  - **Test.** A B-EDIT fixture: an owner's `undo(h, of)` naming a port year-end epoch with no dossier event returns
    F-EDIT and changes nothing.

### VEL0-06 — MAJOR EDGE-UNDEFINED (owner: determinism)

* **Claim.** Two counters in §6.1's stream key have no cap or outcome at their maximum.
  - **The epoch component.** It is u16 (l.8571). Live epochs are numbered from 1, and the history replay's coarse epochs
    take `0x8000 + r` 'so no replay draw can equal a live epoch's' (l.8621–8623).
  - **What breaks at live epoch 32 768.** Nothing states a cap or an outcome for live epoch 0x8000 and above, which keys
    into the replay's half. On a document generated from its history, live epoch 0x8000 + r draws the same streams as
    replay epoch r.
  - **It is reachable.** Two routes lead there over centuries of map time:
    - a standalone town advanced repeatedly at one week, each request bent only within itself by `advance.maxEpochs`
      (V06 §3.3.2);
    - a long campaign with frequent population crossings (V08 §3.6 (3)).
  - **The salt.** The u16 `salt`, bumped by every town-wide `rerollLayer` (l.8624), has no cap or wrap rule either. The
    reroll has one: 32 767 (l.8612–8615).
* **Required change.**
  - **Widen the epoch.** In §6.1, widen the epoch component to u32: (stage id u16, concern id u16, reroll u16, attempt
    u8, epoch u32, salt u16) is 104 bits, inside the key's four 32-bit words. The replay keys its coarse epochs
    `0x8000_0000 + r`, and the textual form is unchanged.
  - **Cap the salt.** 'A salt at 0xFFFF is not advanced; `rerollLayer` reports `no_alternative` with the cap named, as a
    reroll at its cap does (§5.1 (6))'.
  - **Test.** §6.5 (9) gains a fixture folding live epochs across 0x8000 on a replayed document, none equal to a replay
    epoch's key.

### VEL0-07 — MAJOR EDGE-UNTESTED (owner: determinism)

* **Claim.** The base defines the oversized undo record, but nothing tests it.
  - **The defined outcome.** §7.4 *Records on other clients and after a reload* (l.10377–10383): 'a single record larger
    than the cap is not saved, and its target's undo after a reload rebuilds it'. This is the case of
    EI-DETERMINISM-EDGESOBSERVED-009, now defined.
  - **No test.** §7.4's measurements (l.10398–10403), the enumeration test and §13.2's B-EDIT list name no oversized
    record. The same is true of the rebase or redo record past the cap, which is 'withdrawn with a notice'
    (l.10306–10310).
  - **The risk.** A regression would lose the undo after a reload: an epoch undone after a save, the owner-named
    combination, at METROPOLIS.
* **Required change.** Add to §7.4 *Checkpoints*' measurements, or to §13.2's B-EDIT list: '(M2a) a METROPOLIS district
  re-derivation and a METROPOLIS epoch whose undo record exceeds 20 MB are saved without the record. After a reload, each
  undo rebuilds the record by replay and gives the pre-edit digest. A rebase whose previous base passes the cap withdraws
  its undo with the notice.'

### VEL0-08 — MAJOR EDGE-UNDEFINED (owner: V08)

* **Claim.** V08 contradicts the owner rule that no dossier element is omitted.
  - **V08 drops the record.** V08 §3.17 (b), row 'river, coast, harbour' (l.2418): 'a harbour record on a site with no
    coast or river has no admissible site, so S10b's F-SITING rung leaves it out and reports it'.
  - **The base forbids that.** Four places say the element is never omitted:
    - §7.7 item 2 (l.10940–10944): 'F-SITING never drops it';
    - §5.2's F-SITING row (l.8367): 'a dossier element that no plot satisfies takes its first closest option … never
      omitted';
    - §5.3's dossier-existence row (l.8417), a hard batch-local, stage-end and save invariant;
    - items 20 and 22.
  - **The effect.** A self-contradicting dossier — a harbour institution on an inland site with no water word — is
    omitted by V08's rule and placed by the base's. The map then fails §5.3's hard row.
* **Required change.**
  - **The row.** In V08 §3.17 (b), replace the harbour clause with: 'a harbour record on a site with no coast or river
    takes F-SITING's dossier rung — its first closest option (the plot nearest water, else nearest the main gate), the
    water hard row it fails reported — never omitted (§7.7 item 2; §5.2 F-SITING). No harbour basin is drawn on dry land.'
  - **Test.** T-V8-49 (m) asserts it.

### VEL0-09 — MAJOR CATALOGUE-GAP (owner: pipeline)

* **Claim.** No outcome is defined for an absorb, between epochs, whose dossier adds more dossier-backed singular records
  than the current map can seat. The verdict is UNDEFINED.
  - **The rule.** §7.7 item 2 (l.10940–10944) requires every dossier element live and placed on every map.
  - **No growth between epochs.** S2's eager land claim for dossier elements runs at creation only (§7.7 *One path*,
    l.10884–10886).
  - **S10b's order.** S10b's `dossier` request (§4.7, l.6420–6449) seats an element on a vacant or under-used plot. Else
    it displaces one use, one level deep. Else it joins plots. Else it places the element 'at its first closest option'.
  - **When no seat exists.** Suppose every candidate holds a dossier-backed use, which cannot be closed (§7.7 item 2) and
    can move only one level. The closest option then gives one of two results:
    - two dossier-backed uses on one plot, which is undefined because a building holds one use;
    - an unplaced element, against items 20 and 22 and §5.3's hard dossier row.
  - **It is reachable.** A DM can add a few dozen custom institutions (item 104) to a THORP or HAMLET dossier, or
    SettlementForge can list a hamlet with more institutions than plots.
  - **Not covered.** V08 §3.17's 'cap' class (l.2370) and its rows do not name this case, and the catalogue lists no such
    edge.
* **Required change.**
  - **The last rung.** §4.7 S10b's `dossier` request gains a last rung, stated once: 'when no plot of the current map
    passes for a dossier-backed element — at displacement depth 1 and after a join — the element takes a new plot cut
    from the hinterland face nearest its affinity district along the busiest arterial (the overflow ladder's edge-belt
    rule, V06 §3.6 (2) (iii)). Its building comes from S11's template, reported `dossier_edge`. The hinterland always has
    ground, so the rung never fails. The next epoch's siting may move the element inward by the least-disruption order.'
  - **V08's row.** V08 §3.17 (a)'s digest row names the case.
  - **Test.** A T-V8-49 (f) fixture: a THORP dossier with 40 custom institutions absorbed at once places every one, none
    omitted, with the report naming each edge plot.

### VEL0-10 — MAJOR EDGE-UNDEFINED (owner: V10)

* **Claim.** The clerk has no defined outcome at the limit of a long session.
  - **The memory block is unbounded.** V10 §3.2 (l.1226–1232): a new segment carries forward 'the referents with their
    names … and one line per earlier turn of the session'. The referents are capped (32, l.782); the turn lines have no
    cap.
  - **What happens.** Once a session's turn lines approach `cache.segmentTokenLimit` (80 000, l.767), every new segment
    opens at or over the limit. It closes again (`length`) after its first request. Later the opening request passes the
    model's context, and the API refuses it (row 21's 'bad request').
  - **Not covered.** V10 §3.23 has no row for it.
* **Required change.**
  - **A new cell.** Add `memoryTokens` to `clerk.content.limits` (l.750, l.782), default 4 000, its range below
    `cache.segmentTokenLimit` less the brief.
  - **§3.2.** 'The memory block carries the referents and the lines of the newest turns that fit
    `limits.memoryTokens`. Older turns are counted in one harness-written line ("{n} earlier turns: {a} accepted, {d}
    dropped"), so a new segment always opens below its limit.'
  - **The edge row.** V10 §3.23 gains: '| 31 | segments (V10 §3.2) | a session whose turn lines exceed `memoryTokens` |
    the newest lines that fit and the count line | simpler shape | T-V10-50 (30) |'.

### VEL0-11 — MAJOR CATALOGUE-GAP (owner: V11)

* **Claim.** No outcome is defined for deleting a table row that the readers depend on. The verdict is UNDEFINED.
  - **The edit rule.** V11 §4.1 (l.4464–4473) refuses a table edit only for a dangling `ref`, a type error or an owner
    rule.
  - **The fallback rule.** V11 §3.26's general rule (l.4387–4389) and its row M-V11-599-E5 (l.4399) say a reader meeting
    an absent row reads the table's declared default: era `c14`, biome `temperate-deciduous`, religion `faith`, the
    recipe's default government kind.
  - **The undefined deletes.** No outcome is defined when an `editTable` row `delete` or a pack's patch removes any of:
    - the default row itself;
    - a `TotalityRule.allowFallback` target, such as `generic-<family>` (l.258–260);
    - the only row covering a `coversEnum` value, such as a `landuse` row for a live `LandUse.kind`;
    - every row of a table.
  - **Not covered.** §3.2.3 (c) (l.1078–1080) covers only a pack that deletes a `ref` target. The empty-table rule
    (l.274–279) covers tables shipped empty. The catalogue lists no such edge.
  - **The effect.** The reader is left with no row and no default — a crash or a silent arbitrary value.
* **Required change.**
  - **§4.1's edit rule** adds: 'a row `delete` — by `editTable` or a pack's patch — of a row the schema names as a
    reader's declared default, as a `TotalityRule.allowFallback` target, or as the only row covering a `coversEnum`
    value, is refused as a dangling reference (F-EDIT, `refuse.tableRequired`). The refusal names the readers and offers
    the alternative "edit its cells". A delete that would leave a registry table empty is refused the same way.'
  - **The edge row and test.** V11 §3.26 gains the row, and T-V11-45 gains the clause '(s) each such delete refused
    naming its readers; a cell edit of the same row applies'.
  - **V09** carries the key (V09 §4.9).

## Checked and holding

**determinism.**
- **§5.**
  - §5.1 (6): New random at the user cap (EI-003), tested.
  - §5.1 (8): the bug abort (EI-001).
  - §5.1 (9)–(10): E-GEN-1 and rung independence, which cover the scan's E4 and E6 entries for §5–§7.
  - §5.3: the vacuous rows at a rung that lacks their subject.
  - §5.4: the empty lists, with the schema test.
- **§6.4.** The links: one-event and at-limit (E2).
- **§7.1.**
  - *Empty edits* (EI-004, EI-006), with the B-EDIT test.
  - The outcome table (E-07): lock, dossier and undo refusals, and the bends.
  - The authoring toolkit's T101 bars.
- **§7.2.** Its four untested edges now carry *Tests* (a masked stroke, `placeAt` kept, a refused drawn way, the
  lifecycle chain).
- **§7.3.**
  - Item 10: variations run out (EI-002), tested at V09 §3.16 row 14 / T-V9-80 (14).
  - The independence check through the input layer, with fixtures.
- **§7.4.**
  - *Every kind at the edit boundary*: 36 of the 39 combinations, with one B-EDIT fixture per kind and rung.
  - Truncation; the advance group's undo after a reload.
- **§7.5.** The upgrade's packs, its undo and its tests.
- **§7.7.**
  - Item 5: budget 0 and a missing row (EI-007; 'every request kind has its row (a schema test)'); a dossier value
    superseding the user's (EI-008).
  - Item 15: refusals and desertion.
  - F22: a host's undo.
  - An absorb whose week is behind the last epoch's.

**scope.** The 8 UNDEFINED edges are closed by §13.3 and §13.5–§13.9 with T-RIG-1 – T-RIG-6, scheduled at §13.8 (l.16749).

**V06.** §3.21 holds (a) 35 mechanism rows and (b) 17 combination rows, all mapped (154 ids). T-V6-70 (a)–(n) and T-V6-71 –
T-V6-74 carry them.
- **Growth and decline.**
  - Decline to nothing: §3.3.2 clamps to the ladder union, 0 admitted with the village product as V07's desertion.
  - Growth from hamlet to city: the hand-off band 1 575 / 1 425 (§3.1 (3)); T-V6-74 tests the ceiling across it.
  - The overflow ladder never fails (§3.6 (2) (iii)).
- **Time and the lifecycle.**
  - An epoch undone after a save, in unshared and shared documents (§4.1, T-V6-23).
  - Forks and re-runs at their ends (§4.4, T-V6-22).
  - Degenerate `advance` requests (§3.3.2).
- **Protection.** Locks before any draw (§3.1, T-V6-4).
- **g item 114's run condition** at neutral drivers (T-V6-73).

**V08.** §3.17 (a) has 29 rows and (b) 14 feature rows; every one of the 61 edges and 62 combinations is mapped and tested
by T-V8-49 (a)–(m).
- **Dossier extremes.** An empty dossier; population 0 and above 10⁷; above the cap (§7.7 item 15).
- **Contradictory words.** Reversed and `(0-0)` ranges; duplicate keys; a tier word against the population; a host clock
  turned back.
- **g items 117 and 118.** A festival window wrapping past week 51, one of 52 weeks or more, and one unreadable (§3.16
  (5)); the climate frozen; no week means midsummer.
- **The named combination.** A dossier removing what an edit pinned (the pin yields; T-V8-49 (k)).

**V09.** §3.16 has 85 rows; T-V9-80 runs one fixture per clause.
- **Locks and history.** New random over an all-locked scope is disabled with `edge.allKept` (row 15). A history × tools
  row and a dossier × tools row exist.
- **g items 116–119.**
  - Item 116: the zoom-out limit (§4.21.6 (4), T-V9-76).
  - Item 117: no week, an unknown stored week, and 52 identical hashes (§4.21.7 (5), T-V9-77).
  - Item 118: overlapping festivals, a previewed festival unlisted after an absorb, and no traditions (§4.21.8 (4),
    T-V9-78).
  - Item 119: the progress view (§4.21.9 (5), T-V9-79).

**V10.** §3.23 has rows 1–30 and C1–C8, run by T-V10-50.
- **Staleness and segments.** A proposal across an undo or an upgrade goes stale. Segments close on `length`, `key`,
  `tables`, `delta` and `user`.
- **Budget and offline.** The budget cap refuses the next request; offline keeps every tool.
- **A degenerate encoder input** returns `is_error`.

**V11.** §3.26 holds 64 edges and 21 combinations under T-V11-45 (a)–(r). It covers:
- the compile's range and totality refusals;
- run-time defaults for an absent key;
- a pack's dangling `ref` falling to `allowFallback`;
- range ends excluded by the columns' ranges.

**V12.** §3.16.1 has 30 rows, under T-V12-42. §3.16.2 runs the features under every parity preset, under T-V12-43.

**Toggles and presets.** A preset at a rung it was not built for — `MFCG` at a village rung, `VG` after a hand-up —
resolves by §7.6's one order (its own entry, else zero for an extension cell, else the default). V07 §3.15 and V06 §3.1
read it at every epoch.

**Shared documents.** An `advance` in a shared document whose epoch meets `doc.rejected { stale }` is covered by §11.3's
convergence rule: the client applies the pending events and re-runs its own. No finding is made.

**Peers' edge findings, confirmed and not re-raised.**
- **determinism:** VDC0-11 (a plan edit leaving a room unreachable) and VDC0-12 (missing schema-transform rows);
  VK0-08 (F-REDERIVE's stored-reference route).
- **scope:** VK0-24 (the expectations mechanism untested).
- **F-MISSING base parts of g items 114–119:** VDC0-04/05/06, VCS-01 – VCS-06 and VV56-07. Their edges cannot be checked
  until those parts are written, so the repair round's verifier must check the new parts at their limits.

## Counts

| severity | determinism | V09 | V08 | pipeline | V10 | V11 | total |
|---|---|---|---|---|---|---|---|
| blocker | 1 | 1 | 0 | 0 | 0 | 0 | 2 |
| major | 5 | 0 | 1 | 1 | 1 | 1 | 9 |
| minor | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

By kind: EDGE-UNDEFINED 8, EDGE-UNTESTED 1, CATALOGUE-GAP 2. Read whole: base §5, §6.4 and §7, plus §6.1's key layout and
caps. Edge sections read whole: V06 §3.21, V08 §3.17, V09 §3.16, V10 §3.23, V11 §3.26 and V12 §3.16. Also read whole:
- V06 §3.1–§3.3, §3.6 and §4.1–§4.4;
- V08 §3.3, §3.6 and §3.16;
- V09 §3.8, §3.9 and §4.21.6–§4.21.9;
- V10 §3.2;
- V11 §3.2.3 and §4.1–§4.2;
- V07 §3.15.

The catalogue checked: 559 mechanism edges and 214 owned combinations, all mapped in the six volumes.
