## Reconciliation round 6 (volumes/reconcile-V10-r6, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V10-r6; covered by the whole-design retrovalidation (J84).

Reconciled in place against `docs/volumes/critique/seam-surfaces-r5.md` (raised on V10 `c5aa04a6…`).
The four issues addressed to this volume — three majors and one minor — are fixed: 4 fixed, 0 invalid, 0 on the fix
list. SR5-02 and SR5-06 (a) are one contract, how the clerk's card reads a row's buttons and what a tool button carries,
and were applied together against V09's paired SR5-01 and SR5-07 (a), routed as CVR-V10-20. New here: decisions
J-V10.106 – J-V10.109 and cross-volume request CVR-V10-20; J-V10.101, -103 and -104 amended in their reasons. No new
test or change-request number: T-V10-4, -7, -16, -20 and -44 and group C's what-if grader gain or change clauses. The
build plan's estimates are unchanged (two optional fields on one action kind, one more mapping row, an optional form
argument checked as a link is, and one answer moved to the card's close, all inside C3 – C5); V10 §8 now names V09's AP8
(1–1.25 pw) as the rest of M3c's price, outside this volume's total.

| issue | severity | what changed | where |
|---|---|---|---|
| SR5-02 | major | (a) `useTool` gains `mode?` (a `ToolModeRow.id`) and `ids?` (selected first); the dispatch row runs the tool in `mode` (else as last used) on that mode's working layer, `ids` selected first; `bend.under.noAccess`'s **Add a way down** is `useTool { tool: 'place', mode: 'access' }` (T6's Below access mode, V09 §4.5's *Mode ids*), and T-V10-4 asserts the mode; (b) moves are selections: the `dossier` row's (1) is a `propose` through the request's anchor, else a `select` of the way or wall (its handles, V09 §4.6); (3) is "Move {thing}", and (3) and (5) are `select`s of the address the forms `[[do:refuse:dossier:<id>]]` and `[[do:refuse:dossier:count:<id>]]` name, the `<id>` checked as a link is; with no `<id>` (3) and (5) are not offered, (4) — a `useTool` of `name` in mode `rename` — stands, and a `dossier:count` form without one reads as the `dossier` form; prompt rules 6 and 10, step 4's `refuse` bullet, T-V10-7 and T-V10-16 follow; (c) J-V10.104's reason drops the `useTool` moves; (d) `refusals.actions` is `{ kind; msg?; tool?; mode?; format? }[]`, the picture row's (1) `tool: 'dress'` and (2) `format: 'png'` | §1b.2, §2.6, §2.10, §3.3, §3.13, §3.16, T-V10-4, T-V10-7, T-V10-16, T-V10-44, J-V10.104, J-V10.107 |
| SR5-03 | major | (a) prompt rule 17 ends a what-if answer with `[[do:fork:<seq>]]` alone — a copy from just before the event, where the user locks the thing and advances the copy; (b) `[[do:rerun:<seq>]]` only when the user asks to re-run the town's history, never as a what-if; (c) group C's what-if grader: a `fork` block at the seq before the dismantling epoch event, V09 §3.9's words, no `rerun` block, nothing declared; T-V10-16's `rerun` clause kept; J-V10.103's reason reads "V06 §4.4 gives the clerk the what-if fork" | §3.3, §7.3, J-V10.103, J-V10.108 |
| SR5-05 | major | V10 §3.17: a host proposal is answered once, when its card closes — Accept → `accepted` (the fresh preview's `seqs` after staleness), Drop → `stale` when the card had turned stale, else `dropped`, superseded → `dropped`, no variation left → `failed`; turning stale posts nothing; V10 §3.11's host sentence adds "answered when it closes"; V10 §2.6's host card follows; T-V10-20's clause reads "a moved town turns the card stale; its Drop answers `stale`, its Accept `accepted`" | §2.6, §3.11, §3.17, T-V10-20, J-V10.109 |
| SR5-06 | minor | (a) V10 §3.5 step 3 reads a row's buttons from V09 §2.9's `MsgRow.buttons` by `does`: `commit` → `propose` (a dry-run action, one per alternative, one per unplaced element, or the row's one event), `why` → `why`, `show` → `select`, `tool` → `useTool` with `mode` and a `subject` button's first admitted address, `drop` → the card's **Drop** or `check_draft`'s `drop`; "by what the canvas's button does" and "every button … falls in one class" replaced; class (a)'s examples lose **Show a different name on this map**; where the request carried the words, the `setAttr displayText` `propose` stands in for **Show a different name** under that button's words; the why target reads the button's own `page` first; §3.16's intro and `rule` row, §1b.1's label row and a new `MsgRow.buttons` wiring row, §5.4, T-V10-4 and J-V10.101's superseded-in-part note follow; (b) step 1 says an action form is step 4's and never a link; (c) step 4's closing names `undo` and `rebuild` (previewed first) as the form's only map-changing buttons, and J-V10.103 follows; (d) the bends paragraph closes the alternatives parenthesis after the dug-access case and states the `select`, `why` and `useTool` mappings and the examples ("Draw a road to its foot", "Stairs along the front") as sentences of their own; **Keep {building}** is named a `drop` button; (e) V10 §8's total names V09's AP8 (1–1.25 pw) as the rest of M3c's price | §1b.1, §3.5, §3.13, §3.16, §5.4, §8, T-V10-4, J-V10.101, J-V10.103, J-V10.106 |

Found in passing and fixed, not deferred. A host card closed with the harness's `close` while still open had no answer,
so the host's assistant would never learn what the DM chose; it now answers as its **Drop** would (V10 §3.17,
T-V10-20, J-V10.109). With SR5-02 (b)'s rule that (5) is offered only with an `<id>`, a `dossier:count` form with no
address would have given a card with no button, against V10 §2.9's at-least-one rule; such a form now reads as the
`dossier` form, whose (4) stands (V10 §3.13 step 4, §3.16, J-V10.107). A `subject` button of a contextual tool (T9,
T10) with no admitted address would open a tool that acts on nothing; it is not offered (V10 §3.5 step 3). Aligned to V09's live text,
found while this lane ran: V09's round-6 lane wrote `MsgButton` (V09 §2.9) with more than SR5-01's fields — `each` (one
alternative's words where a card lists every alternative, `button.putAt`, `button.digDownFrom`), `event` (an event form
of V09 §4.9), `when` (drawn only for the owner, or only for a name) and a sixth class `app` that no dry-run row carries —
and wrote `refuse.dossierRemove`'s **Move it** as a `show` (a selection the user drags), **Not here** as an event form,
the lock row as **Unlock** and **Show me why** only, and T6's Below access mode as `access`, T11's display-name mode as
`rename`. V10 §3.5 step 3 now reads those (labels by V09 §2.9's *Words*, `each` included; buttons V9 does not draw not
offered; `refuse.stale`'s `show(preview)` as the card's `focus`), and V10 §3.16 follows: **Move it** a `select`, **Not
here** a `propose` of `rejectSite`, the `dossier` row's own (2) retired (the element picker's own button words each
element, so a second key would never be shown), the lock row's closest alternative retired (the canvas's card no longer
offers it), (4) opening T11 in `rename`, the key numbers kept (`<n>` a number in the column). Routed, not deferred:
CVR-V10-20 to V09's round-6 lane, in flight when this round began (V09
`9274c4bc…`) and met in its live text at 14:17 (`7e590a61…`), marked **Met**; if that lane's landing changes a cited
place, the row reopens.

