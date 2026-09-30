## Reconciliation round 6 (volumes/reconcile-V08-r6, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V08-r6; covered by the whole-design retrovalidation (J84).

Reconciled in place against the four seam issues owned by this volume in `docs/volumes/critique/seam-settlements-r5.md`
(SR5-01, major; SR5-06, SR5-07, SR5-08, minors): **4 FIXED**, 0 ruled invalid, 0 left on the fix list.

| issue | what changed (where) |
|---|---|
| SR5-01 | V08 §3.5.1 (c) gains *A pair that meets over time* in three cases. (1) The greater's thing is the lesser's — every COUNT, QUARTER, GUILD and SIZE step and the REPLACEMENT rows whose V11 §3.12 reading keeps it (`graveyard` over `burial_ground`, `wizard_s_tower` over `hedge_wizard`, `mages_guild` over `wizard_s_tower`, `professional_city_watch` over `town_watch`, and `cathedral_10_000_only` over `parish_church`): the old re-key, unchanged. (2) A `@none` or `@office` lesser re-binds nothing; its key aliases the greater as at a first reading. (3) Every other REPLACEMENT greater is placed new in the absorb or epoch that brings it — a building by DR9's `assign`, at a village rung through V07 §3.12 *Records at a village epoch* item 4; a `@wall` greater by the fortification path, at a village rung V07 §3.11's palisade REPLACEMENT — and the lesser's key binds as at a first reading by one `rebind`: an alias on the fish market's hall (the fishmonger's shop keeping its use, unbound), the churchyard `cross` at a village rung or an alias on the church at a base rung (the old roadside pin standing, unbound), an alias on the enceinte the fortification path yields (no binding on a superseded palisade). (c)'s pin-lesser branch reads "laid by V07 §3.10's pin-record rule at a village rung — VS8 at generation, `village.records` at an epoch or an absorb", and its first reading includes the absorb or epoch that brings the pair over time. (d): a promotion receipt keeps the record's one key (F15; the line keeps the old `catalogId`); in case (3) the greater is placed new under it, the key's row re-pointed to it and the lesser's former thing left standing, unbound, a kept pin (the churchyard `cross`) laid for the record with no binding row of its own (J-V8.114); a lesser leaving the list as its greater arrives is read by the same three cases. The diff table's institution row (added greater; the upgrade receipt) says the same. §2.3's binding-row life, §1b's ladder row (V07's item 4, the fortification path, V6 §3.9.11) and `ladder_promoted`'s words ("… and the map now follows the two as one record") follow. T-V8-44's promotion clause is split by case; T-V8-46's VH clauses gain the receipt-promoted shrine hamlet (one `v.parish_church` on the record's key, one churchyard `cross` laid for it with no binding row, the roadside shrine unbound), the no-receipt shrine-to-church hamlet (the shrine's key on the cross), the fish-market village (the market's key on one rim hall, the fishmonger's its alias), the palisade-to-town-walls village and a `town-1` hedge-wizard promotion (the house re-bound, no second building). J-V8.111 amended; J-V8.113, J-V8.114 new. |
| SR5-06 | V08 §3.6 (5)'s `assign` parenthesis reads "(§7.7 One path: placed by S10b's `dossier` request, the least-disruption order — at a rung of a product that declares a records placement, that placement first, V6 §2.1's `ProductDeclEpoch.records`, V07 §3.12 *Records at a village epoch*)". The events the port emits do not change. |
| SR5-07 | V08 §4.6's `unmapped_kind` `class` cell reads "the `label` cell (V11 §2.3, BCR-V9-8; SR5-03) of the class that builds the record at the document's rung — at a village rung the class V07 §3.11 steps 2–4 give (… the tag fallback, whose `market` entry names V11's `market` class, the open space's market) — or, for a pin kind a cell names, the pin kind's word in the legend's symbol key (§9.5, generated from the registry, O12 d); read after the fold"; `custom_resolved` cites it (the market cross by its symbol-key word); §1b's two `PortNote` rows name the words' producers; T-V8-46 reads "`v.alehouse`'s `label` cell" and "the market cross by its symbol-key word". J-V8.115 new. |
| SR5-08 | V08 §13's X22 is **CLOSED**, citing V07 §3.10's pin-record rule, V07 §3.11 step 4, V11 §3.11's `@pin:<kind>` reading and V11 §3.12's `parish_church` row (reconcile-V11-r5 landed 12:51, reconcile-V07-r5 13:07), read live at 14:06; V08 §12's round-5 PLAUSIBLE sentence moves to CONFIRMED, dated, with the same citations. |

**Beyond the seam's text (vetoable, J-V8.113 and J-V8.114).** Two refinements go past the required change as written.
First, `cathedral_10_000_only` over `parish_church` joins the seam's four "keeps the lesser's thing" rows, and QUARTER
joins COUNT, GUILD and SIZE. V11's reading of the cathedral row is "the lesser absorbed", V6 §3.9.11 converts the church
in place with its crypt, and the seam's own census (critique §4 (C)) reads the cathedral as absorbing its lessers. A
quarter's members are the lesser's buildings. Second, the seam's receipt fixture says the promoted record's key binds the
churchyard `cross`. A receipt keeps one key, and that key must bind the church, or the church's later state (a ruin, a
closure, **Show**) would land on the cross. So the key binds the church, and the cross is laid for the record with no
binding row of its own. Where two keys meet, the shrine's key binds the cross as the seam asks, and T-V8-46 tests both.

**New rows.** J-V8.113, J-V8.114 and J-V8.115; J-V8.111 amended in place. §13 closes X22 and adds X23 (V07: the
one-key reading in item 4 and T-V7-13), X24 (V06: V6 §3.9.11's exception named by V08's cases, not by template family)
and X25 (V11: the class `label` cell, SR5-03, present in that running lane's checkpointed text). The hand-offs to V07
and V06 were written to `docs/lane-events.log` at 14:06; reconcile-V07-r6 had landed at 14:05, so X23 waits for V07's
next lane, and V07's item 4 and T-V7-13 meanwhile read "the shrine record's key binding it" — true where two keys meet,
and refuted for the receipt case by T-V8-46. §12 closes the round-5 PLAUSIBLE point and gains "Added by reconciliation round 6". No
bar is new: T-V8-44 and T-V8-46 are widened. No base change request is needed, since F15 already keeps the row. Counts
now are 115 J-V8, 32 BCR-V8 (BCR-V8-9 withdrawn), 47 T-V8 and 5 owner questions. Effort is unchanged: the three cases
are rows of the digest's ladder step and the placement calls V07 and V06 already own, inside SF3's range.

