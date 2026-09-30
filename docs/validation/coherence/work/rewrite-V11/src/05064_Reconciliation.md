## Reconciliation round 1 (volumes/reconcile-V11-r1, 2026-09-29)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/reconcile-V11-r1; covered by the whole-design retrovalidation (J84).

Reconciled in place against the 31 seam issues this volume owns in `docs/volumes/critique/seam-settlements-r0.md` (SS-*)
and `docs/volumes/critique/seam-content-calibration-r0.md` (SCC-*): 1 blocker, 21 majors, 9 minors — **31 FIXED, 0
INVALID, 0 on the fix list** (F-V11-4 records only the halves that live in V07's own text). The pre-round text is kept at
`scratchpad/volumes/rcV11/V11-pre-reconcile.md` (md5 954192b3…). What changed, by issue:

| id | severity | disposition | where |
|---|---|---|---|
| SS-01 | blocker | FIXED — V07's village rows keyed `v.<id>` in `roster.classes`; `villageForm` names only `v.` keys; the compiler refuses any other target and any unprefixed V07 row | §2.3, §2.9, §3.1 row 17, §3.5.1 (church-family), §3.5.7 (the town watchtower's own row), §3.5.8, §3.5.14, §3.22, §3.23.7, §3.23.8, T-V11-3, W62, BCR-V11-1 amendment, J-V11.58, J-V11.68 |
| SS-02 | major | FIXED — a class with no village form plays itself; the tag fallback only after `unmapped_kind`; the routing order restated as V07's four steps | §3.11's routing order, §3.22 |
| SS-03 | major | FIXED — only `town_hall` → `v.reeve_house`; `guildhall` plays itself; the guildhall archetype's village reading moved to its `village` cell | §3.22, §3.13.2 |
| SS-05 | major | FIXED — `citizen_militia` → `@none`; the `town_watch` note; `guard_post` → `v.watchtower` | §3.11, §3.12, §3.22, T-V11-37, J-V11.59 |
| SS-06 | major | FIXED — `GovernmentRow.villageSeat`, filled from V07 §3.11 DR11 (crown `v.manor_house`) and bound by `@seat` at village rungs | §2.8, §3.11's `@seat`, §3.21.1, W63, BCR-V11-8 amendment, J-V11.60 |
| SS-07 | major | FIXED — a COUNT of pins sets a floor over the pins' coverage count; `multiple_water_sources` reads "at least 2" | §3.12, T-V11-17, J-V11.61 |
| SS-09 | major | FIXED — the archetypes' `village` cell (`ArchetypeVillageCell`: class, elseClass, pin, delta, composition, ruin) filled from V07 §2.4, read before `villageForm`; V08's shape cites the type | §2.8, §3.13.2, W64, X-V11-1, BCR-V11-9, J-V11.62; V08 §2.6 (edited) |
| SS-13 | major | FIXED (the seam's recommended side, vetoable) — `aqueduct.dossierFactor` withdrawn; the record's met need, cap step and terminal stay; (3)'s letters kept | §2.8c, §3.24.2, §3.24.7 (3) (b), J-V11.48 revised, X-V11-11, X-V11-12; V06 §1b, §3.19 (3), §3.19, §3.19.6 and V12 §1b, §3.11, J-V12.55 (edited) |
| SS-15 | major | FIXED with SCC-01 — `arcKind` column; closure feature = closes ∧ wall `none`; the village water rule; IN-V11-6 replaced | §2.7, §3.16.1, IN-V11-6, T-V11-19, T-V11-37, W65, BCR-V11-5 amendment, J-V11.63 |
| SS-17 | major | FIXED — `endpointStore` at village rungs is V07's entry store, no new warehouse | §3.13.4 |
| SS-18 | major | FIXED — `naming.villageEnd`, `naming.field`, the village features of `naming.settlement`, the `anchorLane` guard of `naming.way`, their corpora | §3.1 row 68, §3.20.1, §3.20.5, W66, J-V11.67 |
| SS-24 | major | FIXED — registry row 63 gains the twelve V08 row sets | §3.1 row 63 |
| SS-25 | major | FIXED — `GoodWordRow` declared as V11's own shape; row 65 and §3.13.5 say so | §2.8, §3.1 row 65, §3.13.5, BCR-V11-4 amendment |
| SS-26 | major | FIXED — `parish_burial_grounds` COUNT over `graveyard`, `burial_ground`; `graveyard` REPLACEMENT over `burial_ground`; the chain across 1 500 | §3.12, T-V11-2, T-V11-17, J-V11.66 |
| SCC-01 | major | FIXED with SS-15 (SCC-01's mapping chosen for `steepSlope`: `cliff`) | as SS-15 |
| SCC-02 | major | FIXED — the item-110 export properties are file f item 447's; `exportWhy` writes `cls`, `family`, `specialisation`, `significance` and the top three why ids (file f item 456's note was already applied by the BASE-F lane) | §5 (3), BCR-V11-23 |
| SCC-06 | major | FIXED — `calibratable: false` on every column of registry rows 63–66 and 77, stated in §3's, §3.1's, §3.11's, §3.12's and §3.13's preambles | §3, §3.1, §3.11, §3.12, §3.13, T-V11-37, J-V11.65; V12 §3.11's item-108 row (edited) |
| SCC-08 | major | FIXED — the register green at every content milestone's exit; C6 audits | §8 (C0–C8 and "The register at every exit"), J-V11.69; V12 §1b, §3.11, X-V12-3 (edited) |
| SCC-09 | major | FIXED — `presets.FM` resolves the stepped and deck families off | §3.24.0, T-V11-21; V12 IN-V12-2 (edited) |
| SCC-10 | major | FIXED — the butcher's and brewery's splits name template families; T-V11-3 refuses any other | §3.5.4, T-V11-3 |
| SCC-11 | major | FIXED — the `arena` row: footprint the claim's, plot 2 500 / 4 000 / 6 000 / 9 000 m², stands main share 1, gates inside the stands; the "until" sentence dropped | §3.6.1, §3.6.5, X-V11-9 |
| SCC-13 | major | FIXED — `deckOk` read per use (an effective `always` crypt gives `[]`) | §3.24.4, T-V11-35 |
| SS-31 | minor | FIXED — a specialisation row applies at village rungs to the class that plays its `cls`; the cap is V07's per settlement; `villageCap` dropped | §2.8c, §3.24.3, X-V11-2, BCR-V11-8 amendment |
| SS-34 | minor | FIXED — the palisade pointer reads V07 §3.4 step 5; the village reach cap cited | §1b W11, §3.16.1 |
| SS-36 | minor | FIXED — `@absent:<class>[+<class>]`; `access_to_external_mill` → `@absent:watermill+windmill` | §3.11, W35, BCR-V11-9 |
| SS-44 | minor | FIXED — `gates_if_walled` → `@none` (SettlementForge makes a wall its prerequisite) | §3.11, T-V11-37, J-V11.64 |
| SCC-16 | minor | FIXED — the J-VI.4 bends named: V02's storey bend, V09's T6 landward bend, V09's uphill-aqueduct bend to a well, "a class not admitted" | W52, W56, §3.1 row 85, §3.24.4, §3.24.6, X-V11-13 |
| SCC-17 | minor | FIXED — M6-U | §8 C8, T-V11-24 |
| SCC-18 | minor | FIXED — V12 §3.4.2's model metric `retaining.onFlatM` | W49, T-V11-34 |
| SCC-19 | minor | FIXED — `retainingReachM`, `flatDepthM`, `coverShare` as `TerraceRow` columns; `flatDepthM ≥ minTerraceDepthM` | §2.8c, §3.1 row 78, §3.24.1, T-V11-32 (a), IN-V11-2, X-V11-13 |
| SCC-25 | minor | FIXED — the stepped family's off form is every `roster.specialisations` `chance` 0 | §3.24.0; V12 §2.13 (edited) |

**Also in this round.** SS-08's V11 sentence (the village-rung ranges, V07 §2.4's rows else V11's unscaled) is cited in
§3.12; the §2.10 lifecycle row for the round's fields; the new compile bar T-V11-37; wiring rows W62–W66; the BCR
amendments before §10b; decisions J-V11.58 – J-V11.69 and J-V11.48 revised.

**Other volumes' halves.** V12 (no lane open at 03:57; its lane opened at 03:56 and was told by note): 9 marked edits.
V06 (its lane landed 03:57): the four readings of the withdrawn factor, 4 marked edits. V08 (its lane landed 03:53): the
archetypes' `village` cell cites V11 §2.8, 1 edit. V07 (its lane open): by lane-events note and X-V11-2, no edit (F-V11-4).
Each edit is an exact-string replacement from the file's current state, with a backup under `scratchpad/volumes/rcV11/`.

