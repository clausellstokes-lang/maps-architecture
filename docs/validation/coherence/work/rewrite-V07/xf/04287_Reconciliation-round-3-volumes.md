## Reconciliation round 3 (volumes/reconcile-V07-r3, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V07-r3; covered by the whole-design retrovalidation (J84).

This volume was reconciled in place against its ten round-2 seam issues (`docs/volumes/critique/seam-time-r2.md` TT-08;
`docs/volumes/critique/seam-settlements-r2.md` SR2-02, SR2-03, SR2-07, SR2-08, SR2-11 – SR2-15;
`docs/volumes/critique/seam-content-calibration-r2.md` SCC-62): 0 blockers, 3 majors, 7 minors, all **fixed**, none
invalid, none on the Fix list. Decisions J-V7.111 – J-V7.115 (vetoable). What changed, by issue:

| issue | severity | what changed (where) |
|---|---|---|
| SR2-02 | major | BCR-V7-36 (b) widened: at territory rungs `dist.market` is measured to the reservation carrying the principal market rank (the open space, or the flanking square), else the first nucleus's open space, else the heart, the fair field never counted; `dist.harbour` to the wharf's `quay` way where one is laid, else absent, "at a port" reading "a wharf is laid" (V07 §2.4's context paragraph); V07 §3.6 (4) defines a dossier market record (V11's `market` family — `market`, `market_hall`, `fair_ground`, `slave_market` — or a `mercantile-market` custom record); V07 §3.6 (4b) the fair field: an extramural secondary `market` reservation laid by VS5 by the through road's perimeter crossing nearest the heart, `rules.market.fairHa` 1.5 ha and `fairAspect` 2 (own, calibratable; `rules.market` now `{ law, fairHa, fairAspect }`), claimed as common by S12a (V07 §3.9 (4)) through `extraInputs`; F-V-FAIR (V07 §3.13); V07 §3.11's chain placement cites V11 §3.13.4 (`stepInward`, `finalSeller` reading `dist.market`); V07 §3.0's VS5 row (`roster` in, `reservations.fair` out) and writer order; V07 §1b W12, W23, W64, W66 and the trace; V07 §2.6's row; V07 §4.3, §4.5, §5.3, §5.4; T-V7-13's fish-market, port and fair fixtures; V-M2's content; J-V7.111. |
| SR2-03 | major | `rules.claimArea` (V07 §2.2a): `cloister` plot 3 000 / 4 500 / 6 000 / 8 000 m² by band with the `church` family's footprint p50 by reference; `marketHall` coverage 0.8, aspect 1.5, depth share 0.5 (own, calibratable); V07 §2.4's class-column paragraph; V07 §3.6 (4a) the market halls' claims cut from the market's open space at its rim, the space grown by their areas, no toft slot; V07 §3.8's join law and VS6's estimate read the cells; V07 §1b W65; T-V7-13's monastery fixture; T-V7-42's compile check (a finite plot area for every self-playing class at the three village rungs); J-V7.112. |
| SCC-62 | major | `rules.ladders.ranges` `calibratable: false` — a derivation rule of the port (item 20 (h)), changed only as a table fix reviewed with V08 (V07 §2.4's range prose, V07 §2.2a's `ladders` row, V07 §12); J-V7.114. |
| TT-08 | minor | (a) V07 §3.12's reopening reads "by V06 §3.8.2 tier (5′) and its placement rule (TT-01)"; (b) V07 §1 dependency (9)'s V06 fallback deleted; (c) V07 §3.16 (4) keeps the working and `mine.workingDepthM` and cites V04 §3.5.7 (a) *The village working* (J-V4.113), the restated test removed. |
| SR2-07 | minor | (a) V07 §2.4: "V08's next round" dropped (V08 §3.5.1 (b) reads it so); (b) V07 §1 dependency (9): each companion marked landed with its place, V11 §3.12's wording the one pending (SR2-06), the moot fallbacks deleted; (c) V07 §13's FL-2 and FL-3 marked closed by IN-V07-2 (J-VI.16). |
| SR2-08 | minor | V07 §3.11 DR9 and V07 §2.4's guild row: a GUILD record's hall is bound into a guild COUNT record of its `categories` family by V08 §3.5.1 (c) (J-V8.83), never a further hall; one of another family keeps its own hall; T-V7-35's guild clause follows. |
| SR2-11 | minor | V07 §2.4's *Item 104 at village rungs* keeps only what no cell holds (the ruined landmark's ruin source and marker; the mercantile-market pin and stalls on the market's open space) and cites V11 §3.13.2's `village` cells (`ArchetypeVillageCell`, SS-09), read before `villageForm`; V07 §3.11's item-104 bullet and V07 §1b's trace follow. |
| SR2-12 | minor | V07 §3.11 step 4's drink test names its keys: `brewer`, `brewery` (family `food-works`), `tavern`, `alehouse` (family `lodging`); any other `food` record goes on down the list. |
| SR2-13 | minor | V07 §3.11 DR9: a `town_watch` record's `v.watchtower` member carries the assignment's own soft row `near` → `open:green`, `open:square` 80 soft 0.8 (id `pc/…`); V07 §2.4's ladder cell cites it; V07 §1b's trace; T-V7-13's town-watch clause. |
| SR2-14 | minor | V07 §2.4's forced seats: a forced seat stands even where an `@absent:` record zeroes the class its `with` or `×` cell names, its rows naming that class neutral (the hard one included); V07 §3.11 DR11's pointer; T-V7-13's ecclesiastical fixture; J-V7.113. |
| SR2-15 | minor | `RungProfile.splitSites` withdrawn: V11 §3.7.4's `siting.web.splitEnabled` is the generated split's one off switch; BCR-V7-24 keeps its declared-split and never-merged clauses; V07 §1's scope, W40 (withdrawn), V07 §2.1, V07 §2.4's potter row, V07 §2.6 (row removed), V07 §3.12, V07 §3.15 ("the supply web's off form (V11 §3.7.4's `web.off`) … and the same-kind spacing at 0"), V07 §4.1, J-V7.30 annotated; J-V7.115. |

Also in this round: V07 §1 dependency (8)'s round-1 companions are marked landed with their places and their fallbacks
withdrawn (each found at its place by grep; the same stale form as (9)); V07 §12's PLAUSIBLE rows on the companions and on
V04's second round note the landings. V07 §10's quotes re-checked (BCR-V7-24's file g quote and BCR-V7-36's two base quotes
and three headings, each once; receipt `scratchpad/volumes/rcV7r3/quotes.out`). **Hand-offs:** file f item 310 carries
BCR-V7-24 in its reduced form and item 576 BCR-V7-36 with (b) as widened here (SR2-01, the BASE-F lane's); V11 §3.12's
range sentence (SR2-06) is V11's. Checks: every table's column count by script (0 rows off their header's count); every
`v.` id used is one of the 25 rows; doc_checks against the pre-round copy — C1, C2, S1 0; C4 one new unreviewed hit, the
T-V7-13 row naming seven common institution nouns (chapel, church, fair, hall, house, market, mill) on one line, no list
copied; S2 three new cross-volume pointers only (V11 §2.9, V11 §3.22; V06 §3.19); 18 new unreviewed C3 runs, all number runs
from section, band and table numbers or generic phrases (none from the reference corpus's content).

*After LANDED (same lane, 06:22):* V6 X36 (volume 6's round-3 note of 06:17, TT-01's V07 companion) applied — V07 §3.12's
*Village siting* head: every placement in the tiers, a house platform's rebuild included, follows V06 §3.8.2's placement
rule (a toft on a hollow way is placed only after `reopenWay` restores it and any hollow way on its path, in the same
batch); the disuse test unchanged.

