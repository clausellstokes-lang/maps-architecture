# Design volume 9 — The application: the map editor a casual user opens, and the authoring toolkit as screens and flows

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/V9-application; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — revised by opus standing in for the Fable seat volumes/revise-V9; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — revised (second round, item 110) by opus standing in for the Fable seat volumes/revise-V9; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 1) by opus standing in for the Fable seat volumes/reconcile-V09-r1; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 2) by opus standing in for the Fable seat volumes/reconcile-V09-r2; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 3) by opus standing in for the Fable seat volumes/reconcile-V09-r3; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 4) by opus standing in for the Fable seat volumes/reconcile-V09-r4; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 1, continuation: seam-surfaces-r0 SS-29 – SS-46) by opus standing in for the Fable seat volumes/reconcile-V09-r1; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 2, continuation: seam-surfaces-r1 SR-22 – SR-36) by opus standing in for the Fable seat volumes/reconcile-V09-r2; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 3, continuation: seam-surfaces-r2 SR2-23) by opus standing in for the Fable seat volumes/reconcile-V09-r3; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 4, continuation: seam-surfaces-r3 SR3-12) by opus standing in for the Fable seat volumes/reconcile-V09-r4; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 5: seam-surfaces-r4 SR4-05) by opus standing in for the Fable seat volumes/reconcile-V09-r5; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — reconciled (round 6: seam-surfaces-r5 SR5-01) by opus standing in for the Fable seat volumes/reconcile-V09-r6; covered by the whole-design retrovalidation (J84).

> Revision note (revise-V9, 2026-09-28). Revised in place against `docs/volumes/critique/V09.md` (50 findings: 4 blockers,
> 22 majors, 24 minors; folded for the owner's ~20:05 switch, J111: "switch it then, cathedral also gets crypts but
> cemetaries get catacombs"). The why card now projects volume 10's `WhyAnswer`; the drawer is volume 10's view model;
> the map-side siting, link and split declarations are volume 11's document-only tables; item 109 has its screens
> (hidden voids for the game master, ruins and systems on the Below layer, how a way down came about, dwellings only
> after a way in, catacombs under cemeteries and crypts under churches). Every change is listed against its finding in
> the disposition table appended to the critique. Decisions J-V9.33 on, requests item 278 on and bars T-V9-33 on are the
> revision's; withdrawn items keep their numbers and say so.

> Revision note (revise-V9, second round, 2026-09-29). Revised in place against the item-110 addendum of
> `docs/volumes/critique/V09.md` (its §12: 31 findings, V9C-51 – V9C-81 — 2 blockers, 14 majors, 15 minors) under the
> owner's ~23:30 "they go in" and ~23:40 "i think raised ways for cities is fair for the genertor to generate adn then a
> user can decide to add or remove". Item 110's tools are designed in the new V09 §4.20: retaining walls and terraces,
> raised ways and aqueducts, removing and re-adding them, decks and their landmark slots, stepped tiers, what else a
> change does, reaching what lies under a deck, and the Sky layer. Plots on a bridge deck are no longer staged. Decisions
> J-V9.58 on, requests item 362 on, cross-volume requests XV-V9-10 on and bars T-V9-51 on are this round's; the
> disposition is appended to the critique as its §13.

PROGRESS (one line per section: planned | done)
- 0 In plain words: done (revised; second round for item 110)
- 1 Scope, base hooks, out of scope: done (revised; second round for item 110)
- 1b Wiring table: done (revised; second round for item 110)
- 2 Data model: done (revised; second round for item 110)
- 3 Generation (the app's runtime flows): done (revised; second round for item 110)
- 4 Editing (every screen's declarations, the tool binding table, the clerk's view): done (revised; second round for item 110)
- 5 Rendering, labels, exports (the screens, the dialogs): done (revised; second round for item 110)
- 6 Performance budgets: done (revised; second round for item 110)
- 7 Tests and acceptance bars: done (revised; second round for item 110)
- 8 Build plan: done (revised; second round for item 110)
- 9 Decisions: done (revised; second round for item 110)
- 10 Base change requests: done (revised; second round for item 110)
- 11 Owner questions: done (revised; second round for item 110)
- 12 CONFIRMED versus PLAUSIBLE: done (revised; second round for item 110)
- 13 Fix list: done (revised; second round for item 110)
- Reconciliation round 1 (seam-surfaces-r0 SS-06/07/08/11/13/15/16/22/23): done
- Reconciliation round 2 (seam-surfaces-r1 SR-06/08/09/10/12/13/14/15/16): done
- Reconciliation round 3 (seam-surfaces-r2 SR2-01/02/11/13/14/15/18): done
- Reconciliation round 4 (seam-surfaces-r3 SR3-01/02/03/04/05): done
- Reconciliation round 1, continuation (second brief; seam-surfaces-r0 SS-29/30/31/32/34/35/40/41/46): done
- Reconciliation round 2, continuation (second brief; seam-surfaces-r1 SR-22/27/29/30/34/35/36): done
- Reconciliation round 3, continuation (second brief; seam-surfaces-r2 SR2-23/26/27/28): done
- Reconciliation round 4, continuation (second brief): done
- Reconciliation round 5 (parts (a) – (d)): done
- Reconciliation round 6: done

Revision ledger (revise-V9; planned | done)
- R0 header and ledger: done
- R1 V09 §0–§1b: done
- R2 V09 §2: done
- R3 V09 §3: done
- R4 V09 §4.1–§4.16: done
- R5 V09 §4.17–§4.19 (new): done
- R6 V09 §5: done
- R7 V09 §6–§7: done
- R8 V09 §8–§13: done
- R9 the critique's disposition table: done

Revision ledger (revise-V9, second round — item 110; planned | done)
- Q0 header and ledger: done
- Q1 V09 §0–§1b: done
- Q2 V09 §2: done
- Q3 V09 §3: done
- Q4 V09 §4.1–§4.19 rows: done
- Q5 V09 §4.20 (new): done
- Q6 V09 §5: done
- Q7 V09 §6–§7: done
- Q8 V09 §8–§13: done
- Q9 the critique's disposition table (critique §13): done

Conventions. "The base" is `docs/ARCHITECTURE.md` with amendments c, d and e folded in (their closing pass has landed,
`docs/lane-events.log` 2026-09-28 16:13) and file g's items 102–109 (`docs/AMENDMENTS-2026-09-28g.md`, item 109 (k) as revised ~20:05, J111) as the
coherence pass applies them; a section sign (§) points into the base, "V09 §" into this volume, and the other design volumes are
cited by their file (V01 `docs/volumes/V01-neighbourhoods.md` … V08 `docs/volumes/V08-settlementforge.md`) with their own
section forms. Decisions are J-V9.n (V09 §9), base change requests BCR-V9-n (V09 §10), bars T-V9-n (V09 §7). Every word the
application shows a user is quoted here in "double quotes"; those strings are the message catalogue's default English rows
(V09 §2.9) and are data, not code. Nothing in this volume is taken from a reference program's code, word lists, palettes or
screens: the reference generators' and the surveyed tools' behaviour enters only as described behaviour, cited by file and
section (`research/ux/tool-survey.md`, `research/findings/visual-spec.md`), and the application's colours, words and
layout are our own (§17.1).

