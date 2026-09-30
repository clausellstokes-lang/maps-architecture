# Design volume 8 — The SettlementForge stage: connecting the map to the host end to end

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/V8-settlementforge; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/revise-V8; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r1; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r2; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r3; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r4; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r5; covered by the whole-design retrovalidation (J84).
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r6; covered by the whole-design retrovalidation (J84).

> Revision note (2026-09-28/29, lane volumes/revise-V8). Revised in place against `docs/volumes/critique/V08.md` (49
> findings: 4 blockers, 23 majors, 22 minors — C8-01 – C8-40 with C8-02 as switched for the owner's ~20:05 ruling J111,
> "switch it then, cathedral also gets crypts but cemetaries get catacombs", and the item-110 addendum C8-41 – C8-49 under
> the owner's ~23:30 "they go in" and ~23:40 raised-ways revision). Players now receive stored pictures of the town as the party
> knows it, never the map file or the record; item 109's sources, the burial and crypt trace, item 105 (i)'s
> chains, item 106 (d)'s sea threats, item 108's ladders, the calamities and the corrected vocabularies are in; the host's
> store is filled from what the messages carry; item 110's dossier inputs are traced (DR34, DR35), and what
> item 110 generates is never dossier-bound, so the DM's removal holds. The disposition of every finding is appended to the critique;
> what the revision deliberately leaves, and the hand-offs to sibling volumes, are V08 §13.

PROGRESS (one line per section: planned | done)
- 0 In plain words: done
- 1 Scope and base hooks: done
- 1b Wiring table: done
- 2 Data model: done
- 3 Generation (the port pipeline): done
- 4 Editing: done
- bundle (file g items 102, 103, 104 folded into 1, 1b, 2.5–2.8, 3.5, 3.13): done
- 5 Rendering, labels, exports: done
- 6 Performance budgets: done
- 7 Tests and acceptance bars: done
- 8 Build plan: done
- 9 Decisions: done
- 10 Base change requests: done
- 11 Owner questions: done
- 12 CONFIRMED versus PLAUSIBLE: done
- 13 Fix list: done (filled by the revision)
- REVISION (lane volumes/revise-V8, against critique/V08.md):
  - R1 §0, §1, §1b (C8-06 – C8-11 wiring): done
  - R2 §2.1 – §2.5, §2.7, §2.8: done
  - R3 §2.6 row sets and §2.6a the item-109 trace: done
  - R4 §3 generation: done (§3.1 – §3.11 by the first run; §3.12 and the new §3.14 by the continuing run)
  - R4b item 110 (critique §9's addendum): done (§1, §1b, §2.6, the new §2.6b, §2.7, §4, §7, §9, §10)
  - R5 §4, §5: done
  - R6 §6, §7, §8 (bars for every fix): done
  - R7 §9 – §12 (decisions, BCRs, Q5, evidence): done
  - R8 §13 fix list and hand-offs: done
  - R9 disposition table appended to critique/V08.md: done (§10 of the critique)
- RECONCILIATION round 1 (lane volumes/reconcile-V08-r1, 18 seam issues of critique/seam-surfaces-r0.md and
  critique/seam-settlements-r0.md): done (the note "Reconciliation round 1" at the end of this file)
- RECONCILIATION round 2 (lane volumes/reconcile-V08-r2, 6 seam issues of critique/seam-surfaces-r1.md SR-03 – SR-05 and
  critique/seam-settlements-r1.md SR1-26 – SR1-28): done (the note "Reconciliation round 2" at the end of this file)
- RECONCILIATION round 3 (lane volumes/reconcile-V08-r3, 7 seam issues of critique/seam-surfaces-r2.md SR2-03, SR2-04,
  SR2-06, SR2-07, SR2-09, SR2-16 and critique/seam-settlements-r2.md SR2-04): done (the note "Reconciliation round 3" at
  the end of this file)
- RECONCILIATION round 4 (lane volumes/reconcile-V08-r4, 1 seam issue of critique/seam-surfaces-r3.md SR3-06): done (the
  note "Reconciliation round 4" at the end of this file)
- RECONCILIATION round 1, continuation (lane volumes/reconcile-V08-r1 re-run with the six findings of
  critique/seam-surfaces-r0.md §5 owned here — SS-38; the thirteen seam-settlements-r0
  issues of its first run verified in place): done (the note "Reconciliation round 1 — continuation" at the end of this
  file)
- RECONCILIATION round 2, continuation (lane volumes/reconcile-V08-r2 re-run with SR-23, SR-24, SR-25 of
  critique/seam-surfaces-r1.md §7, its continuation of 09:15; SR1-26 – SR1-28 of its first run verified in place): done
  (the note "Reconciliation round 2 — continuation" at the end of this file)
- RECONCILIATION round 3, continuation (lane volumes/reconcile-V08-r3 re-run with SR2-24 of
  critique/seam-surfaces-r2.md §9, its continuation of 10:02, and SCC-R2C-1 of critique/seam-content-calibration-r2.md
  §7.2, its continuation of 10:12; SR2-04 (DR19) of seam-settlements-r2 of its first run verified in place): done (the
  note "Reconciliation round 3 — continuation" at the end of this file)
- RECONCILIATION round 4, continuation (lane volumes/reconcile-V08-r4 re-run with SR3-13 of critique/seam-surfaces-r3.md
  §9, its continuation of 11:06, and SCC-R3C-11 of critique/seam-content-calibration-r3.md §6.2, its continuation of
  11:18; SR3-06 of its first run not in this brief): done (the note "Reconciliation round 4 — continuation" at the end
  of this file)
- RECONCILIATION round 5 (lane volumes/reconcile-V08-r5, 4 seam issues: SR4-06, SR4-07, SR4-12 of
  critique/seam-settlements-r4.md and SR4-06 of critique/seam-surfaces-r4.md): done (the note "Reconciliation round 5"
  at the end of this file)
- RECONCILIATION round 6 (lane volumes/reconcile-V08-r6, 4 seam issues of critique/seam-settlements-r5.md: SR5-01
  (major)): done (the note "Reconciliation round 6" at the end of this file)

Conventions. "The base" is `docs/ARCHITECTURE.md` with amendments c, d and e folded in (their closing pass has landed) and
file g's items 102 – 110 as the coherence pass applies them; a section sign (§) points into the base, "V08 §" into this
volume. SettlementForge (SF) field names and values are quoted freely — the owner's own project (amendments d, gate 2);
no SettlementForge code is excerpted and nothing from its map programs or map designs is used. Base change requests are
BCR-V8-n (§10 here); decisions J-V8.n (§9 here); bars T-V8-n (§7 here).

