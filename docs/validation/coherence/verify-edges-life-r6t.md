# Coherence verify — edges and combinations across time, the host, the tools and the tables (round 6)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-edges-life-r6t; covered by the
> whole-design retrovalidation (J84).

Lane: `coherence/verify-edges-life-r6t` (opus seat). Members: determinism, scope, V06, V08, V09, V10, V11, V12.

> PROGRESS
> - [x] inputs read: the brief whole (with its ROUND-6 NOTES and ORCHESTRATION NOTES); round 5's report and result
>   (`verify-edges-life-r5t.md`, `results/coherence_verify-edges-life-r5t.json`); `adjudication-r6.md` (R6-01, R6-02
>   whole with its tables and Ends, R6-03 whole, Part H for my members, Part P); `assemble-r6.md`
> - [x] live text = assemble-r6's after hashes (base `f39f1c30…`, V06 `9653164e…`, V08 `83382cac…`, V09 `046b6610…`,
>   V10 `1014b64c…`, V11 `0e2767c1…`, V12 `006b8ef1…`)
> - [ ] round-5 findings re-checked (VEL5-r5-01 – 04) with their END lines
> - [ ] round-6 blocks in scope re-checked (R6-02's family at my members; R6-03's late calamity; the other rulings' sites)
> - [ ] peers' landed r6t issues read; overlaps not re-raised
> - [ ] report and result written

## 1. Round-5 findings re-checked against the live text

| id | disposition (adjudication-r6 Part H) | verdict | where, in the live text |
|---|---|---|---|
| VEL5-r5-01 (pipeline) | FIX per R6-03 | **FIXED** | §4.11 *The clock* (1) (base l. 8510): "The document's current week is derived — the greatest week the folded events carry, so an event folded after one of a later week (a late change at `W₀` + 1 or `W₀`, (4); a dossier change dated before an event an earlier absorb folded) never moves it back — never a stored counter (§2.9)" — the text as written. **ENDs:** (model) §2.9's `EpochRecord` comment (l. 3239) "the greatest week the folded events carry (§4.11's clock)"; (scope) J-A67.45's index row (l. 22853) "(the greatest folded week, §4.11 *The clock* (1))", and the rationale's Part A row (l. 631) the same; (scope) T76-1 (l. 18301–18303) "the document's current week never before it nor before the week of any event an earlier absorb folded"; (V08) T-V8-49 (g) (V08 l. 3316) carries the `W₀` + 3 Works clause word for word. All closed. |
| VEL5-r5-02 (V08) | FIX per R6-03, amended (PRB6-15, PRB6-18, PRB6-19) | **FIXED** (by the ruling's form) | `DossierBinding.lateCalamities` is gone from the set (grep: 0 hits in the base and the twelve volumes). The no-epoch path is now ruled by R6-03 step 3 and tested: T-V8-49 (g) (V08 l. 3316) "and on a copy, that next absorb carrying no year end, no crossing and no other calamity — an epoch folded at its week for the calamity, the same strike", the `unchanged` variant, the standing `lateDeferred` note's write-once-and-clear, and the turned-back clock (PRB6-19). V08 §3.6 (3) (l. 1872–1877), §3.6 (4) (l. 1904–1928: the event's members `{ changes, quarantined, notes, notesCleared }`, the deferral as an `unchanged` digest) and §3.2 (l. 1530–1531) carry R6-03's texts. |
| VEL5-r5-03 (V08) | FIX per R6-03, amended (PRB6-18) | **FIXED** | V08 §3.8's line-change bullet (l. 2046–2050): "and each `quarantined` entry's `key` by the same entry in that absorb, before the diff, the absorb's `dossierFacts` event carrying the list under the new keys (V08 §3.6 (4)); a key the entry does not map keeps its key". V08 §2.7's `DossierBinding.quarantined` row (l. 1291) migrate cell: "; a line migration re-keys it by the `fromLines` entry (V08 §3.8)". T-V8-11 (l. 3278) runs the re-keyed quarantined record and the uncarried calamity carried after the migration under the new key, struck once. The binding's third list, `notes`, needs no re-key: a standing note is cleared by "the identities of the binding's standing notes this run no longer writes" (V08 §3.6 (4), l. 1913–1915), so a `lateDeferred` note written under line A's key is cleared by the first run that does not write it, whatever its key. |
| VEL5-r5-04 (determinism) | FIX per R6-02 | **FIXED** | (1) §7.1's lock row (base l. 10631): "— a drawn way across a locked entity (never a ground way, a carve or a wall stretch passing beneath a locked or pinned raised way's deck, which changes none of its parts: §2.7's crossing and way-and-channel tables, bent by the rows below as beneath an unlocked one)" — (D5) word for word. (2) `bend.wall.raisedCrossing`'s row (l. 10674) "locked, pinned or neither (§2.7's crossing table, *beneath*, row W13)" and `bend.raised.underSpan`'s row (l. 10675) "a standing raised way's — locked, pinned or neither — supports" — (D7), (D8). (3) T110-2 (4) (l. 18564–18567: "each run again with the raised way locked and with it pinned: no `refuse.locked`") and (5) (l. 18593–18598: "each hand case run again with the raised way locked and with it pinned … no `refuse.locked`"). The way-and-channel table's lead (l. 2578–2580) adds "A lock or pin on the raised way never refuses any row". |

All four round-5 issues are closed.

## 2. Round-6 blocks in scope — re-checked for new problems

Method: word diffs of `b3f83a0` → `db26bb9` (assemble-r6) for V06, V08, V09, V10, V11, V12 and the base's §5–§7, §13–§16
and the index. Each changed subsection was read whole where it states a mechanism at a limit. Where a change rests on a rule
outside my members, that rule was read whole too: §2.7's crossing table and way-and-channel table (l. 2572–2711), §4.11
*The clock* (1)–(4), §6.1 *The weather stream*, §10.2 (d)–(h), V04 §3.5.4 (d) and §3.11's UC18, V08 §3.16 (7), and
V06 §3.7.4–§3.7.6, §3.11.1 and §3.15.2.

**R6-02 at my members (round-6 note (6) (b)).**
* (ii) No leftovers. A grep of the base, V06, V08–V12 and INDEX for crossing station, raised gate, wall opening, held
  stretch, `bend.wall.held`, `lateCalamities`, "support step (6) (d)", "(6) (a)", "(6) (b)" and "an arch in the
  curtain" finds only T-V6-47's bar "0 crossing stations" (R6-02's own (V6-21) words, a bar that asserts none). Every
  restatement in §5.3, §5.4, §7.1, §7.3, V06 W64/W65/W68/W79, §3.6 (4), §3.7.1, §3.7.2, §3.7.4, §3.7.6 (5), §3.11.4,
  §3.19, §3.19.2, V09 §4.9 and §4.20.2 (4), and V11 §3.24.2 and row 80 is reduced to a citation.
* (iii) Every citation of the two tables in my members names an outcome (*over the band*, *down before the wall*,
  *beneath*, *unchanged meeting*), a row (W1–W13, (a)–(e)) or a cell (W1·C12, C12) that exists. assemble-r6's
  `tablerefs.py` agrees.
* (i) The cells my members' tests run. W1 and W2 are covered by T110-2 (1)–(5), (7) and (8), with T-V6-47, T-V6-73 and
  T-V9-52. W4, W5 and W8 are covered by T114-3, T-V6-73 and T-V6-11, and W13 by T110-2 (4). **W3's cells C3–C6 (and
  C10–C13) name T110-2 (6), which regenerates only standing held raised ways.** So S3's and S5a's pull, S4's crossing
  rule and S10's band reading a support's `state` at a regeneration are reached by no bar. See **VEL6-r6-02**.
* §7.1's lock row and the bend rows (VEL5-r5-04) are written as ruled (§1). Every hand case of T110-2 (4) and (5) runs
  again locked and pinned.
* VDC6-01 (verify-determinism) raises the reverse case: an aqueduct drawn across a locked wall. Not raised again here.
* **Lifecycle.**
  - A hand `drawWall` removes an arch vault in its commit, and its undo restores the vault with the same id (W2's last
    column; V04's key law (`arch`, the way's lineage, `a`, `b`)).
  - `wallToWay`, `absorbWall` and a `delete` lay the vault again by the same key, and their undo removes it again
    (W7, W8, W11).
  - An epoch's reconcile runs over `EpochScope.raised` (V6-3). Its port epochs are no undo target.
  - The "read `open`" state is derived and never stored, so save, load and migration need nothing.
  - A user's held `vault` on a span a wall later comes over keeps its record and is read `open` (M11). It reads `vault`
    again once the wall goes, so no hold is lost.
* **A locked arch vault under a wall.** At an epoch, a regeneration or a dossier-admitted circuit, V04's UC18 (keep it)
  and *beneath* (no arch vault under a wall) give two outcomes. It is the open hand-off of repair-r6-V04. **VAL-R6-01**
  (verify-agree-layers) raises it with an exact change, so it is not raised again here. V06's two summaries fall under
  that issue's ends: W65 and §3.2's "the reconcile is the epoch-side guarantee that no chamber stands … under a wall".
* **The span's `use` under a wall.**
  - VAL-R6-03 raises §11.1's GeoJSON row.
  - The clerk's read row (V10 l. 1686) is the other reader R6-02's sweep missed. It reads each span's use "from the base's
    span record". See **VEL6-r6-01**.
  - V09 §4.20.6 (2) is consistent: its panel, badge and why card read the span `open`, and "Walled up as a vault" is
    disabled.
* **A hand wall stretch that meets an aqueduct's support without crossing its deck line** (one drawn along beneath it,
  or ended at a pier). *beneath* gives no outcome for it. See **VEL6-r6-04**.
* Defined at their limits:
  - W13's `placeGate`, with no `refuse.locked` on a locked raised way;
  - the `W_RAISED_CROSSING` count per crossing of a deck line (its stage bookkeeping is VDC6-02's);
  - the frame growth's C12 and the raised way's own edits C13;
  - `item110.*`'s pin on H-AQUA without its two raised-way edits (V06 §8 E1 line and V12 §2.13 agree);
  - V11's `stripMarginM`, `clearWidthM`, `squareDeg` and `maxClearSpanM`. A `maxClearSpanM` edited below the band's span
    drops or waits the aqueduct by the support step's bound, and a hand one is bent, else not built and reported.

**R6-03 — the late calamity (round-6 note (6) (c)).** No held-calamity clause stands anywhere: `lateCalamities` has 0
hits in the base and the twelve volumes. The rest of the life is defined:
* **The sequence.**
  - A deferral that finds nothing else changed answers `unchanged`, with its note in the host's report. The host stores
    the new `lastOffer` (V08 §3.2), so that dossier is not offered again. The next dossier version, which carries a later
    present week, carries the calamity.
  - With other changes, the `lateDeferred` note is `standing`. It is written once and cleared by the first run that no
    longer writes it (V08 §3.6 (4)'s `notesCleared`), whatever key a line migration gave it.
  - A turned-back clock and an absorb with no epoch past `W₀` are run by T-V8-49 (g).
  - A copy forked meanwhile never receives the calamity (V06 §4.4).
  - Two late calamities sharing a target strike in their events order, and the shared target is counted by both
    (V06 §3.11.1; T-V6-27).
* **No later-week events before it.** The first absorb past `W₀` carries the deferred calamity. No absorb past `W₀`
  folded events before it, so the deferral puts no strike at `W₀` + 1 behind events of later weeks.
* **The current week** is the greatest folded week. Hand edits carry no week (§7.1's `EditBase`), so the rule reads
  only epochs, dossier events and `generate`. An undo of a standalone `grow` epoch un-folds it, so the week rightly falls
  back.
* **Gap: which conditions wait.** Step 2 makes "a condition naming it" wait with the calamity. A SettlementForge
  condition names no calamity: `activeConditions[]` carries `id`, `archetype`, `label`, `severity`, `severityBand`,
  `status`, `triggeredAt.tick`, `triggeredAt.sourceEventType` and `duration` (V08 l. 665). Its only link is V08 §3.16 (7)
  (d)'s week rule. So which conditions wait is undefined, and a carried one links to an earlier calamity. See
  **VEL6-r6-03**.

**The other rulings at my members.**
* R6-04: T120-6, `time.findGlow`, T-V12-52 and V12 §3.15.10 agree on the drawn-week timing, the frame never waiting
  (§12.5).
* R6-05 and R6-06:
  - V09 §2.7's re-ask of a view-bound answer and T-V9-65 are defined.
  - V10's `look` read with `field` covers its edges: a field naming none, gone or sown; both a building and a field; an
    unreturned address. These are row 34, T-V10-50 (33) and T-V10-52.
  - At the village rungs, V07 §4.5's provider tells the famine row. "The read adding none" concerns the telling.
* R6-07: the "under no disaster look" condition is written at every V11 and V12 restatement. A disaster look standing
  with `crises` off only narrows `item123.damage`'s scope, and T-V9-85's on-and-off clause bars a look drawn with the
  switch off.
* R6-08: §7.7 l. 12111 and §14's `field_fallback` comment agree with V08 §3.5.
* R6-10: V09's 10 s rule (row 89, §4.21.11, T-V9-84) agrees with §8.8 l. 14428–14433. The Dress panel's Trees and Pins
  switches stop at V10's `dress` tool; that is VAT-r6-05's (verify-agree-tools).
* R6-11:
  - `DossierFixtureRow`'s `derived` kind;
  - T-V8-61 (a)'s reopen on the lit `city-1` pair;
  - T-V12-57's kept weather gap, which agrees with §6.1 l. 9615–9630 ("the drawn E kept");
  - V06's E1 pin line.
* R6-09: E3's T-V6-11 sky clause is placed at the later of E3 and V05's P6.

**Checked and not raised.**
* V06 §3.15.2's frames show a between-epoch event from the previous epoch's week, not from its own. The text states this
  explicitly ("Events between two epochs are in the prefix at their log positions"), it predates round 6, and no
  round-6 block changed it.
* A standing note an `unchanged` run cannot clear (no event is written) is V08 §3.6 (4)'s general rule for every
  standing note, and also predates round 6.

Totals: round 5's 4 issues are closed. **4 new issues: 0 blocker, 4 major, 0 minor.**

## 3. Issues

(in progress)
