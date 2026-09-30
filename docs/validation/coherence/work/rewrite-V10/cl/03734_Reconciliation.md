## Reconciliation round 1 (volumes/reconcile-V10-r1, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V10-r1; covered by the whole-design retrovalidation (J84).

Reconciled in place against `docs/volumes/critique/seam-surfaces-r0.md` (the seam of the application, the clerk and the
host). Thirteen issues were this volume's: 13 fixed, 0 invalid, 0 on the fix list. New here: decisions J-V10.80 –
J-V10.86 (J-V10.34 superseded), test T-V10-44, change requests item 572 and item 571, cross-volume requests
CVR-V10-15 and CVR-V10-16. The build plan's estimates are unchanged: `admitAs` is a parameter the facade already has
the filter for, and the dispatch table moves no work into the harness.

| issue | severity | what changed | where |
|---|---|---|---|
| SS-09 | major | one `ClerkAction` dispatch table: the harness runs `propose`, `undo`, `rebuild`; the application runs `select`, `openSettings`, `useTool`, `export`, `fork` (`forkAt`) and `rerun` (`rerunFrom`); `run` rejects any other kind; T-V10-44 | §2.6, §1b.2, §1.2, J-V10.82, CVR-V10-15 |
| SS-10 | major | the session key is the effective key, the view's key lowered to its View as, re-read on a change of either and passed to the facade as `admitAs`; a lowered key clears the session, a raised one closes the segment; T-V10-6 and T-V10-24 gain the View as cases | §2.3, §1b.1, §3.2, §3.12 (1), (4), (6), §4.2 (1), §0, item 572, J-V10.83, CVR-V10-15 |
| SS-12 | major | a place by a locus or wherever the rules like emits V09's one-line `roster` (the engine mints the assignment id); the canvas-minted `assign` sentence removed; an unnamed line has the empty name; on a dossier-bound map the line is the dossier's, a new place of the user's own going on a plot as the refusal's alternative | §4.1, §1b.3, §3.3 rule 6, §3.13, §3.16, T-V10-4, T-V10-7, item 571, J-V10.80, J-V10.81 (J-V10.34 superseded) |
| SS-14 | major | `reroll` and `layer` dropped from `HoldInput`, from §3.4 (1)'s enumeration list and from §4.1's rows; the `hold` description and prompt rule 5 no longer offer a layer re-roll | §2.12, §3.3, §3.4, §4.1, T-V10-1, J-V10.84 |
| SS-17 | major | item 110's named bends reach the model and the card as the item's `bent` line with their alternatives as `propose` actions; no refusal category is used; integration note IN-V10-1 corrected to match | §3.16, IN-V10-1, T-V10-29 |
| SS-18 | minor | K17 reads the two crypt bend keys only | §3.10, T-V10-17 |
| SS-19 | minor | the mid-bridge slot cites V11's `deck.landmarks/bridgeMid/minSpanM` | §4.1 |
| SS-20 | minor | `MapBrief.walls[].open[].barrier` typed as J-VI.3's six kinds | §2.13 |
| SS-21 | minor | `WhyLink.chain` typed with its id, the two statuses `impaired` and `vulnerable` and an optional `entrepot` end, cited by V09's `LinkRow` | §2.13, CVR-V10-15 |
| SS-24 | minor | "Assistant (AI)" as the user-facing noun in §0, the refusal templates, the data notice, the labelling, the entries, "What the assistant sees" and the transcript export; "clerk" stays the internal name | §0, §3.1, §3.3, §3.11, §3.16, §3.19, §3.20, §5.3, §5.4, J-V10.86 |
| SS-25 | minor | §5.4 cites `info.remove.holds` without restating its text and places `info.raised.suppressed` | §5.4 |
| SS-26 | minor | acceptance's re-check compares the effects' kinds and counts too; a difference makes the proposal stale | §4.2 (1), T-V10-11 |
| SS-27 | minor | `shape`'s `siting` form gains `weights`, encoded into the same `siting.declared` upsert | §2.12, §4.1, T-V10-4, T-V10-33, J-V10.85, CVR-V10-16 |

Found in passing and routed, not fixed here: V11 names the family-weights cell `familyWeights` while V09 writes
`weights`.

