# Verify — edge cases and combinations across time, the host, the tools and the tables, round 3 (coherence/verify-edges-life-r3t)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-edges-life-r3t; covered by the whole-design retrovalidation (J84).

> **PROGRESS** — [x] brief read whole · [x] resume check (no output, no LANDED line: fresh start) · [x] live hashes = assemble-r3's after column · [x] round-2 findings re-checked (3 of 3) with their END lines · [x] round-3 blocks in scope read (word diffs `920d280d..HEAD`, changed subsections read whole) · [x] peers' r3t results read (15 landed, 122 issues; 3 seats' reports in progress read) · [x] issues written · [x] result saved · [x] LANDED

## Scope and method

**Members:** determinism (base §5–§7), scope (the title, the one-page summary, §0, §1, §13–§17, the decisions, the
judgment index, Appendix A, INDEX.md), V06, V08, V09, V10, V11 and V12.

**The text checked** is the live text after assemble-r3. Each file's sha256 equals assemble-r3.md §1's "after" column:

| file | sha256 (16) |
|---|---|
| ARCHITECTURE.md | `593c657d34849302` |
| ARCHITECTURE-RATIONALE.md | `e7b59eac90a75327` |
| V06 | `8f92dd3809e03132` |
| V08 | `bf9fa7be4ae8c3b9` |
| V09 | `cfe4df195892ff4f` |
| V10 | `382ea60eedc48fa9` |
| V11 | `1671da41b1f28eed` |
| V12 | `90a61a9c9232f349` |
| INDEX.md | `90e2844ab4c9884d` |

This seat wrote no design text.

**Round-2 findings.** Each of this seat's three round-2 ids was re-checked against the live text at the home that
adjudication-r3.md Part H names:
- VEL2-r2-01: FIX per R3-19, which also closes VPC-R2-07. Its second end is V07, under VAT2-r2-07 as amended.
- VEL2-r2-02: FIX.
- VEL2-r2-03: FIX. Its END line is under V06 (§3.20.4's *Cancel*).

**Round-3 blocks.** A word diff `git diff --word-diff 920d280d HEAD` was mapped hunk by hunk to the members' subsections:
- the base: 11 determinism hunks (§6.1, §6.3, §6.5, §7.1, §7.7) and 36 scope hunks (§1.1, §13.2, §13.4, §13.8, §14,
  §16, the judgment index, Appendix A);
- V06: 56; V08: 57; V09: 75; V10: 43; V11: 34; V12: 42;
- V07: 11, read for VEL2-r2-01's second end.

Every changed subsection in my lane was read whole, in particular:
- V06 §3.5.1, §3.20.4, §3.21's rows, §3.22, §3.23, §4.3 and §6.8;
- V08 §2.4 (the field table and *Selection*), §3.5 (the digest steps and the diff), §3.16 (7), §3.17's rows and
  J-V8.133 – J-V8.136;
- V09 §2.12's rows, §3.16 rows 21 and 87–94, §4.21.7, §4.21.9, §4.21.10 (7)–(8), §4.21.12 – §4.21.14 and T-V9-79,
  T-V9-83 – T-V9-87;
- V10 §3.5 (the filtered `confirm`), §3.9a, §3.9b (5), (7), (8) and §3.23 rows 32–35;
- V11 §2.1, §3.25.9 – §3.25.11, §3.26 and §4.1;
- V12 §2.13 and §3.15.10 – §3.15.15;
- base §6.1 *The weather stream*, §6.3 *Plan damage*, §7.7's DR44 and item 1, §2.9's `week` key with §11.3's view
  commands (read for R3-21), §4.11's step (c) and delta demand, and §10.2's AM-8 (read for VEL3-r3-01).

Each was walked at its limits for a defined outcome, a rung on §5's ladder and a test. The combinations walked were:
- a fall against locks, then a rise;
- an absorb carrying an unreadable value;
- a host creation's replay;
- a table row deleted;
- Find, the looks and the weather at a drawn week;
- a catch-up over its budget;
- the clerk under a withholding key.

**Catalogue.** The catalogue entries (edges.md, edges.json) whose mechanisms no round-3 block touched keep their earlier
verdict. The entries for the mechanisms the blocks rewrote were walked again with them, as listed above.

**Peers.** The 15 landed r3t results (122 issues) were read before writing, and so were the in-progress reports of
agree-proof, agree-tools and edges-world. A candidate a peer already raised is listed below and not raised again.

`doc_checks.py` was not run: this seat writes no design text, and assemble-r3's provisional run covers the live files.

## Round-2 findings re-checked

**All three are fixed, both ends included.**

| id | owner | ruling | verdict | evidence in the live text |
|---|---|---|---|---|
| VEL2-r2-01 | V06 | FIX per R3-19 (closes VPC-R2-07) | FIXED | see below |
| VEL2-r2-02 | V11 | FIX | FIXED | see below |
| VEL2-r2-03 | V09 | FIX (V06's END line) | FIXED | see below |

**VEL2-r2-01 (V06) — the texts.** The repair wrote the required texts at these places:
- V06 §3.5.1's lead and (1) (l.1220-1229) pass over locked and pinned households. A dossier population fall that the
  others cannot meet takes them too, each reported orphaned. Any other fall holds them, counted `households.heldByLock`.
- (5) (l.1248-1250) never vacates a locked or pinned building.
- `EpochReport.households.heldByLock` (l.748) is declared.
- §3.21's decline row (l.3254) and its *history × locks* row (l.3300) read the two cases.
- T-V6-70 (f) (l.4137) runs both fixtures: on H-DOSSIER, a `relet` to 0 with no `vacate`; on H-100, the held
  households, the next unlocked ones leaving in their place, and the shortfall counted `heldByLock`.
- §4.3 (l.3554-3557) agrees with these.

**VEL2-r2-01 (V06) — (4).** Step (4) (l.1240-1247) words the standalone case more precisely than the ruled text:
- A protected building's household leaves only while the building keeps another household.
- Its last household is passed over as (1) passes a locked one.
- Otherwise the fall is met short.

This agrees with R3-19's decision: no fall but a dossier fall empties a locked or pinned dwelling. It also agrees with
(1), with the §3.21 rows and with T-V6-70 (f)'s "each held and the next unlocked households leaving in their place". The
fix is therefore read as made.

**VEL2-r2-01 (V06) — the second end.** V07 l.2544-2547 and T-V7-16 (l.3621) carry R3-19's two cases: with 0 households
under a dossier fall, with its last household under any other. VPC-R2-07 closes with it.

**VEL2-r2-02 (V11).** All four parts of the required change are written:
- V11 §2.1's `TableSchema.totality` comment (l.286-288) gives row 107 `crisis.looks` and row 109 `damage.elements`
  their `coversEnum` rules, with T-V11-46 (b) and T-V11-47 (a) as their compile form.
- V11 §4.1 (l.4823-4830) refuses the delete of a `crisis.looks` row for its `CrisisLookKind` and of a
  `damage.elements` row for its `DamageElementKind`. It also refuses the delete of a table's named row (`settings`,
  `structure`, `festival.staging`'s `fallback`), with `refuse.table.required` naming the readers.
- EI-V11-EDGE-3, EI-V11-EDGE-4 and EI-V11-EDGE-5 (l.4769-4771) carry the delete.
- T-V11-45 (s) (l.5031) runs the deletes of `siege`, `roofBay` and `crisis.looks`' `settings`, each refused with the
  tables unchanged.

The ends the round left at E-07 and at V09's catalogue row are open as VV1112-r3-04 and VV1112-r3-05 (peers).

**VEL2-r2-03 (V09).** Both ends are written:
- V09 §4.21.9 (2) offers Stop on the replay "standalone only: in host mode a creation from a dossier (V08 §3.3) shows
  the strip with no **Stop**, its replay coarsened to fit the comfort level … so every editor's creation stays
  identical (T-V8-3)". The citation reads "(§11.2)", as the ruling's note asks.
- V09 §4.21.9 (5) adds the edge.
- T-V9-79 adds the host clause on V08's host harness, at M-SF.
- V06 §3.20.4's *Cancel* (l.3168-3170) reads the END line's text. So do V06 §3.21's replay row and §6.8 (5).

## Round-3 blocks — what the repairs made, at their limits

**Checked and holding at their limits:**
- **V06 §3.5.1 within one epoch:** the held households, the substitute's dwelling (`relet` down, `vacate` at its last),
  a target of 0 at a village rung (V07's desertion), and a save, load and undo between epochs (`EpochReport` is
  rebuilt by replay).
  - Outcome open across epochs: VEL3-r3-01.
- **V06 §3.20.4 and §6.8 (5):**
  - Stop: only on a standalone creation.
  - A Re-derive's replay: stopped, it commits nothing.
  - Host mode: no cancel on a host creation, its coarsening a pure function of the plan, so every editor's frame
    folds the same epochs.
- **V06 §6.8 (6), the catch-up's budget:**
  - The rung is the document's at the request ((1)), and a village rung reads TOWN's.
  - Inside an open from SettlementForge, `advance.budgetMs` less the cached boot and T(B): one epoch still fits it
    before the events' term (≈ 5.3 s ≤ 6 310 ms at the cap).
  - Past it, the one-epoch fold with F-BUDGET-TIME, never coarser or shortened.
  - The words of the exception in the restatements are peers' findings (VV56-r3-01, VV56-r3-02).
- **V06 §3.23 (1), (4):**
  - The run starts at its Works' start week, else at the effective week. After the record retires, the start is read
    from the lifecycle.
  - A building first met decayed reads a run begun `D` years before.
  - An undone epoch reads the earlier level.
  - Negative weeks are read like any other week.
  - The restoring re-cut's peak is a peer's blocker (VV34-r3-01).
- **V08 §2.4 *Selection* (R3-20 (1)):**
  - The bound line, the single accepting adapter or the newest registered line, with `line_differs` as a report.
  - An empty stamp, at a creation and at an absorb.
  - A minted key at every later absorb (T-V8-61 (a)).
  - The absorb-time fallbacks of the other rows are open: VEL3-r3-02.
- **V08 §3.16 (7) (b):**
  - One look per calamity, with the earliest-triggered condition and ties by condition id.
  - A calamity linked to no condition draws no look.
  - A stressor and a condition of one look kind draw the condition's look, and the stressor's look resumes when the
    condition no longer stands.
  - Every case is in §3.17's row and in T-V8-59.
- **V09 §4.21.7 and §2.9 (R3-21 (b)):**
  - A host's `view.set { week }` moves only the drawn week, leaving `yearWeek` and the follow switch.
  - A week after the last epoch draws the current model (V06 §3.15.2's `locate`).
  - Row 94 and T-V9-77 agree.
- **V09 §4.21.10 (7)–(8) and V10 §3.9b (7):**
  - At a drawn week whose frame is not the head, each chip counts 0 there and the chips are unchanged.
  - The index is rebuilt at a week change.
  - The clerk's read is priced with the frame's build (V10 §6.1).
  - The Use-record and Below ends are peers' findings (VRC3T-01, VAL-R3-05).
- **V09 §4.21.14 and §6.1 *The weather stream*:**
  - A moment with no live kind: no gap spent, no spell, the button disabled with `settings.weather.noneNow`.
  - A rate that changes mid-gap: the drawn E is kept.
  - The press while a spell is in force, the hours band's end and the `light` switch are peers' findings (VDC3-01,
    VV1112-r3-06, VDC3-09).
- **V10 §3.5's filtered `confirm`:**
  - A key withholding a fate or a rename confirms on the scratch with the answer's own lists, while the card keeps
    the filtered ones.
  - A differing projection, or a confirmation that does not answer `ok`, refuses the item.
  - Acceptance previews unfiltered (V10 §4.2 (1)).
  - The budget gains one preview (V10 §6.1).
  - T-V10-11 bars it.
- **V10 §3.23 rows 32–35:** a session with no view (`looks` empty), a `none`-row condition below `secret`, a range at
  `lo` = 0, a replayed ruin, and any building before M6-E.
- **V11 §4.1 and §3.25.10 – §3.25.11:**
  - The named rows are refused.
  - `defaultAgeYears` at 0 reads its state's floor, aging from then.
  - The terrace inequalities are clamped, including the new `stepMinCm < stepMaxCm ÷ 2`.
  - A weather band's live hours under `light: 'time'`, and every hour admitted under the other `light` values.
- **V12 §3.15.10 – §3.15.15:**
  - The step scripts of `find.held` and `crisis.*` now run save, load, undo, redo, regenerate, advance and migrate.
  - The required-keys dossier runs at every rung, the village rungs through V07's product.
  - Each 0-by-rule statistic has a planted fault.
- **Owner rules:** no file-g owner rule was undone. The look items (122, 124) write nothing to the model, the
  document, its hash or the log, with one exception: R3-21's layer switch, open as a peer's blocker (VAL-R3-01,
  VAT-r3-01). No phone clause is left in the members (item 126 (a2)).

**New problems the repairs or new designs made (raised):**
- **A rise after a fall that held households** (VEL3-r3-01, V06; CATALOGUE-GAP).
  - V06 §3.5.1 (1) and (4) now pass over locked and pinned households and a protected dwelling's last household. The
    next household below leaves in its place, under a standalone fall, and under a dossier fall the unlocked
    households can meet (§7.7).
  - After such a fall the town's households are no longer the roster's prefix.
  - §4.11's delta demand is "the suffix of the sequential roster between the old and the new population" (l.7880),
    and §10.2's AM-8 says "a later rise reoccupies the same suffix first" (l.15301-15302). Read as written, the next
    rise re-adds a held household that still stands and never returns the households that left in its place.
  - No unit says which set the rise adds, and no test runs the decline-then-rise sequence.
- **An absorb whose `population` or `institutions` the port cannot read** (VEL3-r3-02, V08; EDGE-UNDEFINED).
  - Round 3 replaced the refusal with the creation fallback: the tier word's default population, and "read as absent".
  - V08 §3.5's diff then turns the fallback into dossier changes on a bound map: an epoch to the default population,
    and a `remove` of every carried institution.
  - The same subsection holds every carried institution key when a quarantined record's key cannot be formed, "until
    a readable dossier arrives".
  - Only the `id` row states an absorb-time fallback.

**New problems in the members that peers raised first (concurred, not raised again):**
- Find's Go there and the working-layer switch writing `setLayer` (VAL-R3-01, VAT-r3-01; blocker).
- A host's `setLayer` with no `MapSession` call (VV78-r3-04).
- The catch-up exception's two wordings and the progress view's "within it" (VV56-r3-01, VV56-r3-02).
- A calamity carried late (VAT3-r3-01).
- A calamity at the present week (VAT3-r3-02, VAT3-r3-10).
- Recovery's oldest-first order across the replay (VAT3-r3-03, VAT3-r3-04).
- E-07 and V09's row without the named-row delete (VV1112-r3-04, VV1112-r3-05) — VEL2-r2-02's other ends.
- `select` refusing a missing key `E_LINE_UNSUPPORTED` (VV78-r3-01).
- A population above the cap taking the fallback (VV78-r3-02).
- The minted key against §7.7 item 12 (VDC3-03).
- Start a shower now while a spell is in force (VDC3-01).
- A weather kind's `hours` band end (VV1112-r3-06).
- Find at a drawn week over Use records and on Below (VRC3T-01, VAL-R3-05).
- The restoring event's own re-cut (VV34-r3-01; blocker).
- The support step's re-run on a locked raised way (VM-R3T-06).
- The `why` with no view for the village provider's crisis row (VAT-r3-02).
- The crisis card's re-read triggers (VAT-r3-03).

## Outcome

**2 issues: 0 blocker, 2 major, 0 minor.**
- One EDGE-UNDEFINED and one CATALOGUE-GAP.
- By owner: V06 1, V08 1.

**The round-2 state.** All three round-2 ids are FIXED on the live text, both ends included:
- VEL2-r2-01 per R3-19, closing VPC-R2-07, with V07's desertion and T-V7-16;
- VEL2-r2-02 at V11 §2.1, §4.1, the edge rows and T-V11-45 (s);
- VEL2-r2-03 at V09 §4.21.9 (2), (5) and T-V9-79, and at V06 §3.20.4.

**The lane's state.** The round-3 blocks in these members hold at their limits, with two exceptions, both new edges
made by this round's repairs:
- across epochs, the held households;
- at an absorb, the new fallbacks.

## Issues

### VEL3-r3-01 — MAJOR CATALOGUE-GAP (owner: V06)

* **Claim.** A rise after a fall that held a household has no defined arrivals.
  - **What V06 now states.** V06 §3.5.1 (1) (l.1223-1229) passes over each locked or pinned household "for the next
    household below it in that order that is neither". (4) (l.1240-1247) passes over a protected dwelling's last
    household under any fall that is not a dossier fall, "the next household below it in the suffix's order … leaving
    in its place". §7.7's precedence (base l.11718-11723) passes over the same households under a dossier fall that the
    unlocked households can meet.
  - **What follows.** After such a fall the town holds the roster's households up to the target, less those that left
    in a held household's place, plus the held ones above the target.
  - **What the base says of the next rise.** §4.11's delta demand is "the suffix of the sequential roster between the
    old and the new population, §10.2 — prefix-stable" (l.7879-7881). §10.2's AM-8 says "a population fall selects the
    suffix in reverse ordinal order … and a later rise reoccupies the same suffix first" (l.15300-15302). Both assume
    the town holds a prefix.
  - **The result, read as written.** A rise past a held household's ordinal adds that household a second time while
    it still stands. The households that left in its place lie below the old population, so no suffix ever returns
    them. A builder who reads the delta demand as a set (the roster's households up to the new population that the
    town does not hold) builds a different town.
  - **Neither is stated.** V06 §3.6 (1) reads "the delta demand's households" without one. §3.21's decline row,
    T-V6-5, T-V6-6 and T-V6-70 (f) run the fall and stop there.
  - **Why it is common.** A locked or pinned building on the decline path of a standalone `advance` that falls and
    then rises, or a dossier that falls and recovers, is an ordinary path since round 3. A household added twice is a
    silent wrong count of the population the bars of DR7 hold.
  - **Not in the catalogue.** No catalogue entry or combination names the sequence. V06's E8 lifecycle entries
    (M-V06-1227-E8, M-V06-1368-E1/E2) cover each phase alone.
* **Required change.**
  1. **V06 §3.5.1 (1)** adds after "`households.heldByLock` —": "A household held so keeps its place and its roster
     ordinal: the town then holds the roster's households up to the met count less those that left in a held
     household's place, plus the held ones. At every later epoch the delta demand (§4.11's suffix between the old and
     the new population) is read over that set — the roster's households up to the epoch's target that the town does
     not hold, in ordinal order, those that left in a held household's place first (§10.2's AM-8: the same suffix back
     first). A held household that still stands is never added twice, so the town holds exactly the roster's prefix
     to the target once the target reaches every held household's ordinal."
  2. **V06 §3.21's decline row** adds the edge "a rise after a fall that held a household" with the outcome "the
     households that left in its place return first, the held one never added twice (V06 §3.5.1 (1))".
  3. **T-V6-70 (f)** adds, on H-100: "then a rise past the held households' ordinals — no household id added twice,
     the passed-over households back, the town's households the roster's prefix to the new target, the members
     summing to it within the roster tolerance (DR7's bar)".
  4. **END for pipeline:** §4.11's delta-demand parenthesis (l.7880) reads "the suffix of the sequential roster between
     the old and the new population, §10.2 — prefix-stable, read over the households the town holds where a fall held
     one (V06 §3.5.1 (1)) — so no survivor's use is withdrawn by arithmetic".

### VEL3-r3-02 — MAJOR EDGE-UNDEFINED (owner: V08)

* **Claim.** An absorb whose dossier carries a `population` or an `institutions` value the port cannot read has no safe
  outcome on a bound map.
  - **What round 3 did.** It turned both values from a refusal (`E_UNKNOWN_SHAPE`, before R3-20) into the creation
    fallback:
    - V08 §2.4's `population` row (l.634): "empty, or no such integer → the default request of the tier word's rung
      …, else the one-click default's 5 000";
    - its `institutions[]` row (l.646): "a value that is no list (read as absent, noted)";
    - J-V8.134 (l.3527) and §3.5 step 3 (l.1600-1605).
  - **Only `id` distinguishes an absorb.** The `id` row (l.631) does: "at an absorb the bound document's settlement
    key". `population`, `institutions[]`, `name` and `tier` state only the creation value.
  - **The diff then acts on the fallback.** V08 §3.5's diff (l.1665-1675) compares the carried facts with the new
    digest:
    - the settlement row's `population` → `population` makes an epoch whose target is the tier word's default (a
      CITY of 30 000 falling to its rung's default request at once, households leaving, stock stepping down);
    - every carried institution key now absent makes `remove` with fate `vanished`, closing every dossier-bound use,
      locked buildings' included (§7.7 item 14);
    - `name` → `rename`.
  - **Nothing undoes it.** A port epoch is no undo, redo or revert target (V08 §2.7, l.1291). The next readable
    dossier then raises the population back and reopens each institution (F6) by least disruption. One unreadable
    value, from a host glitch or a line's malformed write, rewrites the map twice.
  - **The same subsection gives the opposite outcome.** When a quarantined record's key cannot be formed, "every
    carried institution key absent from the new digest is held — no `remove` — … until a readable dossier arrives"
    (l.1666-1668). So a bad record holds every institution, while a bad list removes every one.
  - **What the owner's rule asks.** Item 125 (b) asks for "the generator's own choice, exactly as on a map made without
    a dossier". On a bound map made without a dossier, nothing changes the population or the institutions.
  - **Not covered elsewhere.** §3.17's rows (l.2643, l.2657), T-V8-61 and §7.7 item 10 state the fallback without the
    absorb case.
* **Required change.**
  1. **V08 §3.5's diff**, after the quarantine sentence, adds: "At an absorb, a value of a required key that took its
     field-table fallback — `population`, `name` or `tier` empty or unreadable, an `institutions` that is no list
     (V08 §2.4) — makes no change: the carried fact stands. The settlement row compares nothing for that field, and
     every carried institution key is held, no `remove`, as a quarantined record's are. One `field_fallback` note names
     the field with 'the map kept its record's last value', until a readable value arrives. The field table's fallback
     values serve a creation."
  2. **V08 §2.4's `population`, `name`, `tier` and `institutions[]` rows** each add to their fallback cell "— at an
     absorb, the carried value (V08 §3.5)".
  3. **J-V8.134** adds "at an absorb the carried value stands for every such field, as the `id` row's bound key does".
  4. **§3.17's "the digest and the diff" row and "the one input and its fallbacks" row** add the case "an absorb whose
     `population`, `name`, `tier` or `institutions` is empty or unreadable", with the outcome "the carried value kept,
     no change, noted `field_fallback`".
  5. **T-V8-61 (a)** adds: "on `city-1` after its creation, an absorb whose `population` is emptied and whose
     `institutions` is an object keeps the carried population and every institution — no epoch, no `remove`, no
     `rename`, the model digest unchanged — each noted `field_fallback`, and the next readable dossier absorbs as
     usual".
