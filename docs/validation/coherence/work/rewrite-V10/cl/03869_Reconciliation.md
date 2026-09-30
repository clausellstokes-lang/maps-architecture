## Reconciliation round 2, second brief (volumes/reconcile-V10-r2, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V10-r2; covered by the whole-design retrovalidation (J84).

Reconciled in place against the continuation of `docs/volumes/critique/seam-surfaces-r1.md` (its §5 – §9: SR-22 – SR-36,
raised 09:15 on V09 `94ce6753…`, V10 `2bcc431b…`, V08 `3d6de46b…`). Round 2's first brief (landed 05:03) is history; this second brief under the same lane key covers the four issues the
continuation addressed to this volume, and re-checks TR-25, which the re-issued brief lists again: 5 fixed (TR-25
verified as landed), 0 invalid, 0 on the fix list. New here: decisions J-V10.95 – J-V10.97, cross-volume request
CVR-V10-18 and `MapBrief.salts` (carried by item 468's existing text, file f item 468). No new test or change request
number: T-V10-1, -4, -8 and -25 gain clauses. The build plan's estimates are unchanged: the new forms are encoder rows over
events the canvas already writes, and the salts are a field the facade already derives for `DisplayList`.

| issue | severity | what changed | where |
|---|---|---|---|
| TR-25 | minor | verified in the live text: `MapBrief.raised[].source` is `'generated'\|'declared'` (file f item 244's derived value) with `carriedSince?`; `'carried'` survives only as `RaisedOutcome`'s outcome, unchanged | §2.13 (no edit) |
| SR-26 | major | `NameInput.newNames` reads `{ scope } \| { quarter } \| { town: true }`: scope and quarter write `rerollLayer { concern: 'naming', ids, salt: 0 }` (named entities, address order; the quarter's list as V09 §4.5's T11 row states it, read at the session's effective key), the town `rerollLayer { concern: 'naming', salt: MapBrief.salts.naming + 1 }` with no `ids`, its renames on the card and never applied at once; `DressInput.restyle` is a display re-roll of one of V09 §4.3's T12 concerns (`style.compass`, `naming.emblem`, `render.instances`), written `rerollLayer { concern, salt: MapBrief.salts[concern] + 1 }`; `MapBrief.salts` (§6.1's effective salts, unfiltered, kept by the host projection, not rendered in the map block); prompt rule 5 and the `name` and `dress` descriptions; §4.5 counts a layer re-roll as scoped by its layer; T-V10-4 compares each with V09's New names (these, this quarter, the town), the compass re-roll, New emblem and New trees byte for byte; T-V10-8 checks `brief.salts` against `DisplayList.salts` | §2.12, §2.13, §1b.1, §3.3, §3.4, §3.17, §4.1, §4.5, §6.1, T-V10-4, -8, -25, J-V10.95, J-V10.96, item 468, CVR-V10-18 |
| SR-28 | major | `ShapeInput.split` is `{ through } \| { at }` and `join` serves both kinds; §4.1's T9 row selects by the target's registry kind — a plot's `split { cut: [p1, p2] }` and `join`, a way's `split { id, cut: [p] }` (the resolved point taken to the nearest centre-line point) and `merge { ids: [target, ...join] }`, as V09's Split here and Join these; a mismatched form or another kind is an `is_error` naming each kind's form; the `shape` description tells the model which form a way takes; `ShapeInput.merge`'s comment separates item 105 (h)'s keep-together from the way `merge` event; §3.6 rule 7 names the one snap; T-V10-1's T9 enumeration holds `split` and `merge`; T-V10-4 compares a way split and a way join byte for byte | §2.12, §3.4, §3.6, §4.1, T-V10-1, T-V10-4, J-V10.97, CVR-V10-18 (b) |
| SR-31 | minor | "Add a hoist instead" replaced by "Draw a road to its foot" (`bend.raised.island`; V09 §4.20.2 (6); J-VI.4 (d)) in §3.16's *The dry run's bends* and in IN-V10-1 | §3.16, IN-V10-1 |
| SR-33 | minor | CVR-V10-17 and CVR-V10-3 marked **Met** with their citations (V09 §4.9's family row, T-V9-15, V09 §4.20.2 (5), landed 08:54; V08 §3.1's `connect-src`, T-V8-27's list, V08 §4.4 (4)); CVR-V10-14's V08 part marked met (V08 §4.6, X11, T-V8-45), V05's and V07's parts open; §13's "Until it lands …" sentence reads "It landed 08:54 (V09 `94ce6753…`)" | §10.2, §13 |

Found in passing and fixed: the clerk had no read of a concern's current salt, so SR-26's "current salt + 1" had no
source — `MapBrief.salts` supplies it (J-V10.96; item 468's parenthesis names it); the this-quarter scope's read had no
budget — a §6.1 row (our own, calibrate-later) measured by T-V10-8; SR-29's own text reads the this-quarter names "at the
role's key", which V09 §2.7's band-less read rule (J-V9.86) contradicts and which would make the canvas and the clerk
differ under View as — CVR-V10-18 (a) asks V09 to read it at the effective key, as the clerk does (J-V10.95); the
centre-line point **Split here** writes is stated once in V10 §4.1 and cited by V09; the scoped names'
order (address order) is stated for both surfaces. Routed, not fixed here: CVR-V10-18, announced to
V09's next reconcile lane by a lane note; and item 468's added `salts`, announced to the base record's reconciler (file f
item 468).

