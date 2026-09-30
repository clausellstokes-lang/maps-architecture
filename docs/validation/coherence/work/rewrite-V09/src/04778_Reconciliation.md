## Reconciliation round 2, continuation (volumes/reconcile-V09-r2, second brief, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V09-r2; covered by the whole-design retrovalidation (J84).

Reconciled in place against the seven seam issues that the continuation of `docs/volumes/critique/seam-surfaces-r1.md`
(its §7, SR-22 – SR-36, against the live text of 09:15) assigns to this volume. The lane's first brief (SR-06 – SR-16)
landed at 05:16 and is the "Reconciliation round 2" note above; this is a second brief under the same lane key. Every
issue is fixed; none is invalid; nothing is added to the fix list (V9 §13).

| issue | severity | what changed |
|---|---|---|
| SR-22 | major | V9 §2.8's `HistoryRow` gains `lines?` (derived sub-lines, each with Show when it has targets) and `dossierGroup?`; V9 §4.10's table gains the absorb head (`host.group.absorb` or `.absorbUndated`, `{n}` the ledger event's `changes` count, `{week}` its `absorbed` week; its lines the event's notes) and the creation head (`history.dossierFacts.creation`, "Made from SettlementForge's record"), and the dossier-event row takes its report entries as lines; a new paragraph *The dossier groups* sets membership (the port's `host:port` events after a ledger event: V08 §3.6 step 6 gives them no `group`, so the issue's "same group" is read as the session, J-V9.107), V08 §4.6's order, the head's toggle and Show, the filters (All and SettlementForge; Over time lists the epochs alone), the note lines' keys resolved by `query({ kind: 'entity', dossierKey })` at the effective key (new BCR-V9-36; J-V9.108) with a withheld target dropping the line, and the report-entry lines; V9 §4.9 gains `history.dossierFacts.creation`, `report.moved.<kind>` (one per `ReportEntry.kind`) and `report.dossier.<state>` (one per placement state), since the report's words had no rows (J-V9.109); V9 §5.7's report panel lists `GenerationReport.dossier` by those rows, then `GenerationReport.dossierNotes` under `host.group.standing`; V9 §6.3's line budget; §1b (two rows and a dossier-trace row), §2.12; T-V9-15 extended; T-V9-69 new (M-SF, AP5b) |
| SR-30 | major | V9 §4.9 gains `refuse.assignment.noSite` ("No plot here suits {thing} as it is assigned. The closest places are marked.") with **Put it at {site}** — the same declaration at the refusal's first `moveTo` target: an `assign` retargeted, or a `rejectSite` grouped with `placeAt` (J-V9.111) — and **Show me why**, its code the F-EDIT file f item 582 keeps; IN-V09-16's last sentence names it among the refusals that stay; T-V9-13 and T-V9-15 extended |
| SR-27 | minor | a way's `split` and `merge` homed on T9 in V9 §4.3; T4's modes drop **Split here** and **Join these**; T9's way controls gain them with the mapper (`split { id, cut: [p] }` at the nearest centre-line point by V10 §4.1's T9 rule, CVR-V10-18 (b); `merge { ids: [first, second] }`); J-V9.104 extended; T-V9-12 reads it |
| SR-29 | minor | T11's mapper states each scope's bytes — these: `ids`, `salt: 0`; this quarter: the quarter and every non-withheld gazetteer row of its district, read at `effectiveKey()` (V9 §2.7's band-less rule and volume 10's J-V10.95, not the role's key the issue named; J-V9.110), `ids` in address order; the town: the concern's current salt + 1 (`DisplayList.salts`), no `ids`, through the fates sheet; T12's **New emblem** and a new **New compass** control (V9 §4.19; the base's `style.compass` re-roll had none) write the concern's current salt + 1, as **New trees**; V9 §4.3's T12 row and AP4 follow; T-V9-12 extended |
| SR-34 | minor | XV-V9-24 and XV-V9-26 marked **Met** with V08's citations; V9 §12's two PLAUSIBLE clauses moved to CONFIRMED |
| SR-35 | minor | V9 §4.15 cites `EntityCard.anchor` (V10 §3.6 rule 1) without the list; V9 §5.4, §5.15 and §1b cite V08 §5.2's row without its legend rule; XV-V9-26 cites V08 §5.2 |
| SR-36 | minor | `bend.under.accessOpening` loses "Dig from a building instead" (its buttons **Show the way in** and **Show me why**); **Use another building** re-previews `[addUndergroundAccess { building }, the declaration]` from the next building of `PreviewResult.alternatives`, which BCR-V9-22 now has the dry run fill with the further qualifying buildings (at most three), the access's target set by BCR-V9-22's new grouped-access rule (J-V9.112); V9 §4.17.4, §1b; XV-V9-27 to volume 4; T-V9-38 extended |

**Other sides.** V08 (reconcile-V08-r2's second brief, running beside this one): its SR-23 (`GenerationReport.dossierNotes`
by BCR-V8-8), SR-24 (the effective key on note lines) and SR-25 (a chain hidden whole past the key) are present in its
live text and are what V9 §4.10, §5.4 and §5.7 now read; its X18 names exactly this lane's rows and can be marked met,
with one difference to note: the group is bounded by the port's session, not by `EditEvent.group` (J-V9.107). V10
(reconcile-V10-r2's second brief): CVR-V10-18 (a) – (c) are applied here (the this-quarter read at the effective key,
Split here's centre-line point cited from V10 §4.1, `ids` in address order); its §3.16 carries **Use another building**
as a `propose` with the events above, and `refuse.assignment.noSite` reaches it through its `rule` row with no change
there. The base record (file f): BCR-V9-36 is new (the `entity` input `dossierKey`), and BCR-V9-22 gains two sentences
(the dug-access alternatives and the grouped-access target); both need file f to carry them (lane note to the base
record's reconciler). Volume 4: XV-V9-27. Volume 6: XV-V9-28 — found beside SR-22: V08 §4.6 item 3 draws one
`info.raised.suppressed` line per raised-way reason that fired at a closed slot, which no V09 row carried; V9 §4.10's
`epoch` row now carries it as a line from `EpochReport.raised.suppressedFired` (J-V9.113; T-V9-69's variant).


