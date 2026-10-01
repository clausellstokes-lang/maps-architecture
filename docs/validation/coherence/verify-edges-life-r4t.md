# Coherence verify — edges and combinations across time, the host, the tools and the tables (round 4)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-edges-life-r4t; covered by the
> whole-design retrovalidation (J84).

Lane: `coherence/verify-edges-life-r4t` (opus seat). Members: determinism, scope, V06, V08, V09, V10, V11, V12.

> PROGRESS
> - [x] inputs read: the brief whole (with its ROUND-4 NOTES and ORCHESTRATION NOTES); round 3's report and result
>   (`verify-edges-life-r3t.md`, `results/coherence_verify-edges-life-r3t.json`); `adjudication-r4.md` (R4-01, R4-15,
>   R4-16, Part H for determinism, V06, V08, V09, V10, V11, V12, and the scope and pipeline END lines);
>   `repair-r4-V06.md` and `repair-r4-V08.md` (their issues, END lines, judgments and hand-offs); `assemble-r4.md`
> - [x] live text checked = assemble-r4's after hashes (base `5f34cceb…`, V06 `ef22171a…`, V08 `4675c05e…`, V09
>   `b49c6014…`, V10 `3fd16e69…`, V11 `47b14d9f…`, V12 `2db3c8c9…`)
> - [x] round-3 findings re-checked (VEL3-r3-01, VEL3-r3-02) with their END lines
> - [x] round-4 blocks in scope re-checked: word diffs of 96bdae26 → 6c640e5 for the six member volumes and the base's
>   §0–§1, §5–§7 and §13–§16, each changed subsection read whole where it states a mechanism at a limit
> - [x] peers' landed r4t issues read (68 across fifteen seats) and the four running seats' files searched; overlaps not
>   re-raised
> - [x] report and result written

## 1. Round-3 findings re-checked against the live text

| id | disposition (adjudication-r4 Part H) | verdict | where, in the live text |
|---|---|---|---|
| VEL3-r3-01 (V06) | FIX | **FIXED** | V06 §3.5.1 (1) l. 1230–1237: a held household — a locked or pinned one passed over or met short, or (4)'s protected last household — keeps its place and its roster ordinal; every later delta demand is read over the households the town holds, those that left in a held household's place first (§10.2's AM-8), a held household above the target counting toward it in the place of the last household the rise would add, never added twice. The repair's judgment 1 (the count clause for a rise stopping below a held ordinal) keeps DR7's bar exact and agrees with the required text wherever the rise passes every held ordinal. §3.6 (1) l. 1388 reads `R₀` over the same set. §3.21's decline row (l. 3280) carries the edge and its outcome; T-V6-70 (f) (l. 4178) runs the rise past the held ordinals and the rise stopping below them. **END (pipeline):** base §4.11 l. 7963–7964 reads "prefix-stable, read over the households the town holds where a fall held one (V06 §3.5.1 (1))". |
| VEL3-r3-02 (V08) | FIX per R4-15 (a) | **FIXED** | V08 §3.5's diff l. 1674–1683: at an absorb a field that takes its field-table fallback (its path absent, or a value of no form its row reads) makes no change, the carried fact standing; `population`, `name`, `tier` and an `institutions` that is no list named; every carried institution key held; one `field_fallback` note "the map kept its record's last value"; an empty list a value; the fallback values serve a creation. §2.4's lead (l. 626–627) and the `name`, `tier`, `population` and `institutions[]` cells (l. 635–637, 649) add "at an absorb, the carried value (V08 §3.5)". J-V8.134 (l. 3559) adds the absorb clause and its reason. §3.17's digest-and-diff row (l. 2672) and one-input row (l. 2686) carry the case. T-V8-61 (a) (l. 3291) runs `city-1`'s absorb with `population` emptied and `institutions` an object: no epoch, no `remove`, no `rename`, the model digest unchanged, the next readable dossier absorbing as usual. **END (determinism):** §7.7 item 10 l. 12028 reads "— at an absorb a field that takes its fallback changes nothing, the carried fact standing (V08 §3.5)". W98 (l. 325) and §14's `field_fallback` comment (l. 19606) agree. |

Both round-3 issues are closed. Their END lines are written at both ends.

## 2. Round-4 blocks in scope — re-checked for new problems

Each changed subsection was read whole where it states a mechanism at a limit. Peers' landed round-4 issues already cover
several new problems at these sites, so they are not raised again here:

* the clock at `W₁` = `W₀` — VPC-R4-02 and VAT4-r4-01 (pipeline);
* late non-calamity changes — VV78-r4-04;
* record sub-fields under the absorb rule — VV78-r4-03;
* the catch-up batch row's wording — VV78-r4-05;
* the over-budget fixture's wording — VV56-r4-03;
* a wall delete under a crossing station — VDC4-04;
* `wallToWay` against V06 — VDC4-05;
* `bend.raised.underSpan` with no `open` span — VDC4-03;
* the weather press's fade — VDC4-02 and VDC4-07;
* the look read with a non-building — VV910-r4-04;
* the minted settlement key at §14 — VDC3-03.

What the walk found, member by member:

* **V06.** The changed parts are:
  - the held households (above);
  - R4-03's entry week for a restoring re-cut's elements (§3.23 (3), `decayPeak`'s `since`, §3.21's decay row,
    T-V6-76 (b));
  - the standing raised way held at epochs (§3.6 (4), §3.7.1, §3.7.6 (5), §3.19's lead, §3.19.2 (3)–(5), T-V6-11,
    T-V6-47, T-V6-73);
  - R4-16's batch in §6.8 (1), (3) and (6), with T-V6-24's three catch-up fixtures and its over-budget fixture.

  Each has a defined outcome at its limits:
  - a decay run that begins before the restoration's Works finish sets the entry week;
  - with no Works, the entry week is the event's week;
  - a week before `since` reads 0;
  - the batch's estimate counts `b` per epoch folded and `a` per event, both 0 for an advance and the replay;
  - the over-budget branch has its own fixture, outside R12-31's release targets. V12 §3.15.9's T119-2 times its own
    history and dossier fixtures.

  A one-span raised way that a later trace meets has no interior station. verify-model-r4t considered that case and
  found it defined (V06's cost field), so it is not raised.
* **V08.** The changed parts are:
  - the absorb rule (above);
  - the catch-up batch (## 6, J-V8.137, T-V8-63);
  - the late calamity (§3.6 (3), §3.17, §4.6's `late` variant, T-V8-49 (g));
  - the population cap at every absorb (B7, T-V8-49 (f));
  - `select`'s two refusals (B3, B5);
  - `MapSession.setLayer`.

  One new combination has no single outcome: the absorb rule against §3.6 (3)'s cadence. See **VEL4-r4-01**.
* **V09.** The changed parts are:
  - R4-02's working layer, drawn whatever its visibility, with Find's **Go there** writing nothing;
  - R4-10's settle rule;
  - R4-12's Find at a drawn week;
  - the disaster look's units and hand-over;
  - the weather press;
  - the three new `bend.*` rows.

  The working layer drawn regardless of visibility makes its value decide what the view draws (§8.4; §8.8's tile key).
  The case where its value names an island or a network the document no longer holds has no outcome. See **VEL4-r4-02**.
* **V10.** The view-bound why, with no view, is row 14. The look read asked with a building is row 34. Neither leaves an
  edge open beyond VV910-r4-04.
* **V11.**
  - `raisedWays.structure.clearWidthM` [0, 3] m and `.squareDeg` [10°, 45°] carry their ranges, their pinned-version
    defaults (1 m, 30°) and their edit rule (a standing crossing a raised bound now refuses is kept and listed).
  - The weather `hours` band is whole hours [0, 23], with a > b wrapping midnight and edits outside the range clamped
    (V11 §4.1). A non-integer is a type error, refused.
  - A row delete of a table's named row is refused (`refuse.table.required`).
* **V12.**
  - `patchesOldestFirst` orders by the week of the last-change epoch. Replay epochs come before live ones, and ties go
    in chain order (V06 §3.7.7 (3)).
  - `crisis.scale`'s second count reads R4-13's max(k, |`matched`|).
  - `crisis.blocked` reads R4-06's three barriers.
* **determinism.**
  - §6.1's press while a spell is in force (peers' VDC4-02, VDC4-07).
  - §6.3's roofless case.
  - §7.1's three new outcome rows (peers' VDC4-03, VDC4-04).
  - §7.3's S7 row: the crossing station is in the effective scope.
  - §7.4's raised-way lock column.
  - §7.7 items 10 and 12.
  - Each change is defined where it touches time, locks and lifecycle.
* **scope.** These agree with the volumes' clauses:
  - §13.1's frame kept through a decline and a re-crossing;
  - T76-1's late-calamity fixture;
  - T110-2 (1)–(5);
  - T114-3 and T114-4;
  - T121-7's settle;
  - T122-2's knowledge;
  - T124-9's replay inputs;
  - §14's key and note comments.

Totals: round 3's 2 issues closed. **2 new issues: 0 blocker, 2 major, 0 minor.**

## 3. Issues

### VEL4-r4-01 — major · EDGE-UNDEFINED · owner V08

**Claim.** R4-15 (a) made a field that takes its fallback at an absorb change nothing. V08 §3.5's diff (l. 1674–1683)
states that rule.

`digest` is pure and knows no carried state. Its step 3 (l. 1605–1611) still fills an empty, negative, fractional or
non-numeric `population` with its field-table fallback. That fallback is the default request of the tier word's rung,
else the one-click default's 5 000 (§2.4, l. 637). The diff then compares nothing for that field.

The epoch cadence reads the population separately. V08 §3.6 (3) (l. 1853–1867) does two things with it:
* it folds an epoch "at the first week the population leaves the last epoch's `populationTarget` ± 5 % (read from
  `populationHistory`; with none, at `W₁` when the new population is outside it)";
* it sets each epoch's target "linear between the target at `W₀` and the new population at `W₁`" where no
  `populationHistory` entry covers the week.

Read as written, "the new population" is the digest's, which here is the fallback value. On a bound CITY of 20 000 whose
dossier arrives with its `population` emptied, a builder of §3.6 (3) would do one of two things:
* fold an epoch at `W₁` toward 5 000, or toward the tier rung's default. That is a silent fall the absorb rule forbids.
* where the span crosses a year end (an ordinary sync after time passed in SettlementForge), interpolate the year-end
  epoch's target toward the fallback.

A builder who reads §3.5 first takes the carried population. So the set gives two behaviours.

T-V8-61 (a)'s fixture is an absorb on `city-1` right after its creation. It crosses no year end and adds no history, so
the year-end interpolation is untested. §3.17's rows name the absorb case without the cadence. The ladder router's own
read is already settled ("keeps the carried population at an absorb", §3.17's village row, l. 2678).

**Required change.**
1. V08 §3.6 (3), after "else linear between the target at `W₀` and the new population at `W₁`, rounded to a person", add:

   > — where this absorb's `population` took its field-table fallback (V08 §3.5's diff), the new population is the
   > carried one wherever this step reads it (this linear target, and the crossing tested at `W₁` with no
   > `populationHistory`), the digest's fallback value never entering an epoch's target or a crossing test;
   > `populationHistory`'s readable entries date and size the crossings and targets as usual

2. V08 §3.17's "the digest and the diff" row: after "an absorb whose `population`, `name` or `tier` is empty or
   unreadable, or whose `institutions` is no list: the carried value kept, no change, noted `field_fallback` (V08 §3.5)",
   add:

   > ; and where such an absorb's span crosses a year end, the epoch there targets the carried population, no epoch
   > folding toward the fallback (V08 §3.6 (3))

3. T-V8-61 (a), after "and the next readable dossier absorbs as usual", add:

   > ; on `city-1` an absorb whose `population` is emptied and whose present week lies past the next year end, with no
   > `populationHistory` entry after the last epoch, folds the one year-end epoch with the carried population as its
   > `populationTarget` and no epoch at `W₁`, the households unchanged by the fallback

### VEL4-r4-02 — major · EDGE-UNDEFINED · owner V09

**Claim.** Under R4-02 the view draws its working layer whatever that layer's `LayerSpec.visible`:
* base §8.4 l. 13580–13585;
* §2.9 l. 3396;
* V09 §4.2 l. 1652–1656.

The per-viewer key `workingLayer` (V09 §2.4: `{ layer: 'sky'; key: PlatKey }` names one island) now decides three things:
* what the view draws;
* what §8.8's tiles key on;
* which arena every tool acts on (V09 §4.20.9: "the chosen island's arena with its `key`").

No text says what happens when that value names something the document no longer holds. Ordinary edits that cause it:
* a user on Sky creates an island (T5 `quarter` with `sky`) and undoes it;
* the user deletes the island;
* an epoch's landfall drops it (row 80 gives the remains to Ground but says nothing of the working layer);
* T1 `intend` turns the islands setting off;
* Below's last tunnel, cavern or ruin is undone.

The existing rules do not reach this case:
* V09 §3.16 row 21 (l. 1526) disables the Sky and Below switches "at a rung without islands" and "with no network",
  which is the switch's state at rest, not its current value.
* §2.12's row (l. 974) reads "an unknown value" as `ground`, and a well-formed key of a removed island is no unknown
  value.

Builders would do one of three things: reset to Ground, keep Sky drawing nothing with every tool's dry run refused on a
dangling key, or crash on the missing arena. A redo and a load of a document whose saved view names the island raise the
same question. This is an edge on a normal path (an undo on the working layer) with no defined outcome.

**Required change.**
1. V09 §4.2, after "a layer's own visibility is §7.8's layer controls, T12 `dress`'s logged `setLayer`.", add:

   > A working layer naming what the document no longer holds — Sky with an island `key` no standing island carries
   > (its creation undone, the island deleted or fallen in a landfall, the islands setting off) or Below with no
   > network, cavern or ruin left — reads as Ground: at the `doc.changed` that removes it, and at a load, the view key
   > becomes `{ layer: 'ground' }` (a view key, nothing written, no event), the switch shows Ground with Sky or Below
   > disabled by its reason, and a draft on that layer re-previews and is refused as any draft whose target is gone; a
   > redo that restores the island leaves the working layer Ground. At a drawn week whose frame lacks the island the
   > key stands and the view draws the frame's layers (§8.4).

2. V09 §2.12's `workingLayer` row, last cell, add:

   > ; a Sky key no standing island carries, or Below with no network, cavern or ruin, reads `ground` (V09 §4.2)

3. V09 §3.16 row 21:
   - add the edge "the working layer's island, or Below's last network, cavern or ruin, removed while it is the working
     layer (an undo, a delete, a landfall, the islands setting off)";
   - add the outcome "the working layer Ground, nothing written, the switch disabled with its reason (V09 §4.2)".

4. T-V9-80 (21) adds:

   > Sky the working layer on an island just created, its creation undone: the working layer Ground, 0 events logged,
   > the Sky switch disabled with its reason, a redo leaving it Ground; a document saved with Sky on an island since
   > deleted, reloaded: Ground

## 4. Checks

* Live files equal assemble-r4's after hashes (sha256 prefixes above); no design file written by this seat.
* No review id is written into any required change; every citation names a design home.
* `doc_checks.py` was not run: this seat writes no design text. The reference corpus is absent in this checkout, so any
  run would be provisional.
