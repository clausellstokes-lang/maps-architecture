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

(in progress)

## 3. Issues

(in progress)
