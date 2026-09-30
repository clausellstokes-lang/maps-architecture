## Reconciliation round 3 (volumes/reconcile-V10-r3, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V10-r3; covered by the whole-design retrovalidation (J84).

Reconciled in place against `docs/volumes/critique/seam-surfaces-r2.md` (the application, the clerk and the host, round
2). Five issues were this volume's: 5 fixed, 0 invalid, 0 on the fix list. New here: decisions J-V10.91 – J-V10.93
(J-V10.67 revised) and `ClerkTranscript` version 3. No new test, change request or cross-volume request: T-V10-4, -6,
-7, -34 and -44 gain clauses, and item 572's last sentence is rewritten (file f item 572 points to this volume's text
and quotes none). The build plan's estimates are unchanged: the key order is a pure two-key function, the transcript's
part is a store key, and the dossier alternative runs the one `sites` query the canvas already runs.

| issue | severity | what changed | where |
|---|---|---|---|
| SR2-05 | minor | "Roles and keys" reads: a generic host's viewer session holds the viewer role and the key the host gives it, so its clerk reads what that key admits and cannot preview; SettlementForge mounts no viewer frame, and a player's assistant reads the stored party gazetteer on SettlementForge's side (V08 §3.14, V08 §4.4 (1)) | §3.17 |
| SR2-08 | major | `ClerkTranscript` version 3 records `key: Admission` (the effective key in `admitAs`'s form) in place of `tier`; the key order `admitsAll(a, b)` defined once (tier at least and places a superset, `secret` above both) and read by the listing and opening of stored transcripts and by §3.12 (6), where a change that does not only add to what the key admits counts as lowered; versions 1 and 2 read as `key: 'secret'` (J-SS2.5); a raised change carries the transcript's key up, a lowered one ends the transcript and the next turn opens a new part (store key: document, session, part); §5.3's export records `key`; T-V10-6 gains the party-places transcript case and the form-to-form lowering, T-V10-34 the version-2 case | §2.3, §2.7, §2.14, §1b.1, §3.12 (6), (8), §3.15, §3.20, §5.3, T-V10-6, T-V10-34, J-V10.67, J-V10.91, J-V10.92 |
| SR2-10 | major | §4.1's `where.locus` row states V09 §4.5's query — `query({ kind: 'sites', cls, near: the locus target's EntityCard.anchor, district: the target's id when the locus is in a quarter, k: 3 }, { admitAs })`, the first candidate with no `hardFails`, encoded as `where.plot`, not offered when none is free of hard fails; a line with no locus omits `near` and `district`; §3.16's row cites it (stated once); T-V10-4 gains the equality with T-V9-13's **Put it at {site}**, T-V10-7 the no-candidate case | §4.1, §3.16, T-V10-4, T-V10-7, J-V10.93 |
| SR2-12 | minor | the `dossier` row's roster and locus case renders V09's `refuse.roster.dossier` (text written once, in V09's catalogue), `{thing}` the line's name or class label and `{locus}` the locus in V09's words or the settlement's name; `ClerkRefusal.msg`'s comment and §1b.1's `ClerkRefusal` row list the key | §3.16, §2.9, §1b.1, T-V10-7, J-V10.93 |
| SR2-17 | minor | (a) the dispatch table's `propose` row notes V09 §3.12's import-dialog **Fix** as the one application-run `propose` (J-V9.90), T-V10-44's dispatch clauses unchanged; (b) item 572's last sentence: the built-in clerk passes `admitAs` on its band-less reads and dry runs, an application on its band-less reads, its own confirmed dry runs staying at the role's key (V09 §2.7); (c) §4.3, §2.6's `rebuild` comment and dispatch row and §1b.2 cite `ClerkMount.rebuildEvents(seq)` (a new §1b.2 row names it, with `attach.newMap`'s); (d) §3.1 (4) reads `attach.newMap`; (e) CVR-V10-16's trailing clause deleted and §12's V09-second-round bullet moved to CONFIRMED | §2.6, §10.1 item 572, §4.3, §1b.2, §1.2, §3.1, §10.2, §12, T-V10-38, T-V10-44 |

Found in passing and fixed: V09 §2.10's `rebuildEvents` answers `[]` when nothing can be built, so the harness sets
`ProposalView.rebuild` only while the answer holds an event, asked at each later group (§4.3); T-V10-44 asserts that
**Put it back** previews exactly the events `rebuildEvents(seq)` returns. Received from V09's third round by its 06:22
lane note and applied: XV-V9-22 (a) and (b) are SR2-17 (c) and (d) above; its (c) makes both creation-mode conditions of
§3.1 (4) standalone's — in host mode no turn enters creation mode (§3.1 (4); T-V10-20).

