## Reconciliation round 2 (volumes/reconcile-V09-r2, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V09-r2; covered by the whole-design retrovalidation (J84).

Reconciled in place against the nine seam issues `docs/volumes/critique/seam-surfaces-r1.md` assigns to this volume.
Every one is fixed; none is invalid; nothing is added to the fix list (V09 §13).

| issue | severity | what changed |
|---|---|---|
| SR-06 | major | item 464's `viewAs` takes a key form `{ tier: 'public' \| 'local'; places: Id[] }` beside a tier, admitting what both the view's key and `viewAs` admit (item 572's reading, per volume 10's 05:03 note); V09 §2.10 states `effectiveKey()`'s rule (the form when its tier is the lower, the places both lists hold otherwise) and makes it the shell's one computation; V09 §4.8 adds a host's players' view (set by the embed's bridge handler through `setViewOpts`), the menu entry "What the players know" with the others disabled (`info.viewAs.host`), and the host's strip standing for the banner; §1b and §2.12 rows; J-V9.85; XV-V9-20 |
| SR-08 | major | V09 §2.7: every band-less `query` the application makes for a view — `why`, `entity`, `sites`, `links`, `gazetteer`, `people`, `whereIs`, `relations` — passes `admitAs` = `effectiveKey()`, cached answers re-asked on `onEffectiveKey`; the application's own dry runs stay at the role's key (consent); V09 §4.8 and V09 §5.10: the export dialog defaults to the effective key; item 453's `ExportOpts.knowledge` takes the key form; new bar T-V9-66; J-V9.86; XV-V9-19 (c) |
| SR-09 | major | V09 §3.3 step 4: a point-dropped `placeAt` is written `plot: ''` with `from: { points: [p] }`, the dry run deriving the plot (item 367; V10 §4.1's `where.at`), "this plot only" writing the plot under the point (`where.plot`); V09 §4.20.4 (1): the dry run finds the deck plot under the point; T-V9-12 checks the bytes; J-V9.87 |
| SR-10 | major | V09 §4.5's T6 row: with a dossier connected a locus drop previews the one-line `roster`, and its refusal card is the new row `refuse.roster.dossier` with the element picker of V09 §4.16 (5) and **Put it at {site}** — `placeAt` on the first candidate with no hard fails of a `sites` query narrowed by the locus; T-V9-13 extended; J-V9.88; XV-V9-19 (b) |
| SR-12 | major | V09 §4.11: **How do I …?** in the drawer's menu, sending on V10's `help` entry with the answer's `useTool` drawn as its button; V09 §5.9: the same in Help; V09 §4.5's T7 row and V09 §4.11: **Ask the assistant to place these** under T7's box, sending on the `roster` entry; each shown only with a clerk configured and on; T-V9-40 extended; J-V9.89 |
| SR-13 | major | V09 §3.12: the import dialog runs a finding's `propose` fix itself through V09 §3.3's pipeline, committed as the user's declaration with no `proposedBy`, clerk or none — V10 §2.6's table's one exception; §1b row; T-V9-40 asserts a Fix with no clerk configured; J-V9.90; XV-V9-19 (a) |
| SR-14 | minor | V09 §3.14's clerk row cites V10 §3.16's `refuse.clerk.offline`, `.key.<keyState>` and `.budget` and the actions V10's row offers, quoting nothing; the row `clerk.key.refused` is deleted; `clerk.cap.reached` is the meter's foot line only |
| SR-15 | minor | the §4.20 constants table, §4.20.4 (7), item 246 and T-V9-55 name volume 11's cell `deck.landmarks/bridgeMid/minSpanM` (V11 §3.24.4) with no number; XV-V9-13's deck clause is marked met; §12's second-round list and IN-V09-8 note the move |
| SR-16 | minor | `HostSlots.banner` renders the frame's own strips (V08 §5.1's "Showing what the players see", the held and frozen-view notices of V08 §5.2); `historyFilter` cites §11.3's viewer role for a generic host, SettlementForge setting none; V09 §1.3 drops "the viewer's filtered history"; §1b's `HistoryRow` row follows |

**Other sides.** V08's SR-05 (the players' view as `viewAs`) and V10's item 572 are the counterparts of SR-06 and SR-08;
XV-V9-19 asks volume 10 for the dispatch table's exception, the one `sites` query of the dossier alternative, the scope of
item 572's last sentence and the key form's corner rule; XV-V9-20 asks volume 8 for the `setViewOpts` route and the
banner slot's contents. For file f: item 464 (item 464) is now needed by V08 too, and item 453 (item 453) carries the
key form. The build plan's estimates are unchanged (V09 §12).

