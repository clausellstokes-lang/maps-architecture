## Reconciliation round 3, continuation (volumes/reconcile-V09-r3, second brief, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V09-r3; covered by the whole-design retrovalidation (J84).

Reconciled in place against the four seam issues that the continuation of `docs/volumes/critique/seam-surfaces-r2.md`
(its §9, SR2-20 – SR2-29, against the live text of 10:02) assigns to this volume. The lane's first brief landed at 06:25 and is the "Reconciliation round 3" note above; this is a second brief
under the same lane key. Every issue is fixed; none is invalid; nothing is added to the fix list (V09 §13).

| issue | severity | what changed |
|---|---|---|
| SR2-23 | major | V09 §2.2's `HostSlots.historyLines` reads `{ list(key: ViewState['knowledge']): HostHistoryLine[]; onChange(h): () => void }`, with the comment that the shell calls `list(effectiveKey())` each time it draws the group (so again on each `onChange` and each `onEffectiveKey`) and the provider names and targets only the places that key admits, keeping no View-as state of its own (J-V9.114); V09 §4.10's host-lines paragraph re-lists with `effectiveKey()` on each `onChange` and each `onEffectiveKey`; V09 §2.10's effective-key paragraph names the host's lines among its readers; V09 §2.12's lifecycle row and §1b's `HostSlots` and `ViewOpts.viewAs` rows follow; T-V9-28's host clause gains the View as re-list (a spy on `list`, a `local` place dropped under "What anyone knows" and restored, the same for "See what the players see"); XV-V9-29 (new) records SR2-24 (a)'s text in volume 8, **Met** in its live text |
| SR2-26 | minor | T12 gains **New decoration** — one `group` of `rerollLayer { concern: 'style.jitter', salt: current + 1 }` then `rerollLayer { concern: 'style.crowns', salt: current + 1 }`, in registry order, one undo step, display only (J-V9.115) — in V09 §3.7, V09 §4.3's T12 row (kinds and gesture), §4.5's T12 row (modes and mapper), §5.7's Dress panel and a new §1b row; V09 §4.10's `rerollLayer` template gains "New decoration" (the group one row) and, found beside it, "New emblem" and "New compass"; T-V9-6 and T-V9-12 (the bytes, and every rerollable concern of §6.1's registry written by a control) extended; AP4 lists it. Volume 10's `restyle 'decoration'` (V10 §4.1's T12 row, J-V10.99) already writes the same bytes |
| SR2-27 | minor | V09 §4.10's report-entry lines and V09 §5.7's "What moved" and placement lists render their `{ id }` arguments under `effectiveKey()` by V09 §2.7's band-less rule — an `entity` read with that `admitAs`, a withheld address as its `kind.<registry kind>` word and left out of the targets, re-rendered on `onEffectiveKey`, never at the role's key (J-V9.116); V09 §2.9's `MsgRef` comment separates engine-built messages (the caller's key) from panel-built lines (the view's key); V09 §6.3's line budget counts the names' reads; §1b's two dossier rows; T-V9-69's View as clause gains the `secret` element named by its kind word |
| SR2-28 | minor | V09 §2.12's `HistoryRow` row reads its consumers as "the history panel, the context panel's History tab, `HostSlots.historyFilter` (V09 §1b)", matching §1b; the clerk reads no `HistoryRow` |

**Other sides.** V08 (its lane on the re-issued brief, running beside this one): SR2-24 (a) — V08 §3.1 step 7 (b)'s party
lines named at the key `list` is called with, the handler keeping no subscription — is in V08's live text (read 10:41,
with its per-key answer cache, J-V8.109), recorded as XV-V9-29 **Met**; V08's X20 is met by V09 §2.2, V09 §4.10 and T-V9-28
as they now read. V10: SR2-25 (d) is already in its live text (`restyle.concern`'s closed
set with `'decoration'`, J-V10.99), and its §12 bullet on New decoration's bytes can move to CONFIRMED against V09 §4.5's
T12 row as it now reads. No base change request is added or changed.


