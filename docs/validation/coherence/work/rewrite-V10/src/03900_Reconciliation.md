## Reconciliation round 3, second brief (volumes/reconcile-V10-r3, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V10-r3; covered by the whole-design retrovalidation (J84).

Reconciled in place against the continuation of `docs/volumes/critique/seam-surfaces-r2.md` (its §9 – §11: SR2-20 –
SR2-29, raised 10:02 on V09 `4d08c4fa…`, V10 `e737f403…`). Round 3's first brief (SR2-05, SR2-08, SR2-10, SR2-12 and
SR2-17, landed 06:25) is history; this second brief under the same lane key covers the two issues the continuation
addressed to this volume: 2 fixed, 0 invalid, 0 on the fix list. New here: decisions J-V10.98 and J-V10.99. No new test,
change request or cross-volume request number: T-V10-4 gains its clauses, BCR-V10-1's parenthesis names `dossierKey`,
and CVR-V10-18 is marked met. The build plan's estimates are unchanged: the dug-access alternatives are a second
encoding of a list the dry run already returns, and `decoration` is one more encoder row over events the base registers.

| issue | severity | what changed | where |
|---|---|---|---|
| SR2-22 | major | *The dry run's bends* reads the preview's `alternatives` in two cases: a placement bend's plots, each `placeAt { plot, designation }` by `where.plot`; `bend.under.accessDug`'s further qualifying buildings (BCR-V9-22 as reconcile-V09-r2 widened it), each a `propose` of `[addUndergroundAccess { building }, the item's declaration]` with no `target` on the access — V9 §4.17.4's **Use another building**, at most three, in the dry run's order, each labelled with the button's text and the building's name at the effective key (its withheld word otherwise); `bend.under.accessOpening`'s buttons are `select` actions; §3.5 step 3 cites the two cases; §1b.1's filtered dry-run row names the alternatives' consumer; T-V10-4 gains T-V9-38's three-building case, byte for byte with **Use another building** and no `placeAt` among them | §1b.1, §3.5, §3.16, T-V10-4, J-V10.98, §12 |
| SR2-25 | minor | (a) CVR-V10-18 marked **Met** (V9 §4.5's T11 row, J-V9.110, the T9 row, address order; landed 09:49), T-V10-4 runs the this-quarter case with View as off and on, §12's bullet moved to CONFIRMED (T-V10-4 still deciding the bytes), §13's sentence reads "it landed 09:49"; (b) §4.1's `quarter` row states the scope — the quarter and every `gazetteer` row not marked `withheld` whose district is the quarter, read at the session's effective key (V10 §6.1's row, which now names the withheld rows' exclusion) — citing V9 §4.5's T11 row as the same scope; (c) `ClerkQuery`'s `entity` member gains `dossierKey?: string` with its comment (BCR-V9-36: V09's note lines and a host reader; never the model-facing `read_map` entity input, J-V10.68), BCR-V10-1's parenthesis reads "(with `at`, `layer`, `below` and, by BCR-V9-36, `dossierKey`)", §1b.1's `EntityCard` row names the binding-key read; (d) `DressInput.restyle.concern` typed `'style.compass'\|'naming.emblem'\|'render.instances'\|'decoration'`, a closed enum (§3.4 (4)), any other value an `is_error` result; `decoration` writes `rerollLayer` `style.jitter` then `style.crowns`, each at `MapBrief.salts` + 1, one item and so one group on acceptance — SR2-26's **New decoration**; the `dress` description, prompt rule 5, §4.5's layer-scoped re-rolls and §1b.1's `MapBrief.salts` row follow; T-V10-4's restyle case adds `decoration` and the refused value | §1b.1, §2.12, §2.13, §3.3, §3.4, §4.1, §4.5, §6.1, §10.1 BCR-V10-1, §10.2 CVR-V10-18, §12, §13, T-V10-4, J-V10.99 |

Found in passing and fixed: V10 §6.1's this-quarter budget row described the read as keeping rows "where the row's
district is the quarter" and did not name the withheld rows' exclusion, which SR2-25 (b)'s stated scope needs — the row
now names it. With `decoration` every rerollable concern of §6.1's registry is written by one clerk form (`naming` by
`name.newNames`, the other five by `restyle`), which SR2-26's T-V9-12 clause states for the canvas. Not routed here, and
not deferred: V09's **New decoration** (SR2-26) and file f's items for BCR-V9-22's widened text and BCR-V9-36 (SR2-21,
SR2-20) are the siblings' own issues of the same continuation, each in its owner's lane of this round. V09's landed
10:48 (V09 `a843d0a3…`): V9 §4.5's T12 row writes New decoration as the two events `decoration` encodes (J-V9.115), so
section 12 records it as CONFIRMED text; the dug-access list's reading in file f and V04 stays PLAUSIBLE in section 12,
decided by T-V10-4's three-building case.

