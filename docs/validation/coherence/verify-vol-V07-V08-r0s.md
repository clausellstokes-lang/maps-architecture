# Verify — coherence pass, round 0: volumes V07 (village) and V08 (SettlementForge)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-vol-V07-V08-r0s; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V07-V08-r0s`, 2026-09-30 → 2026-10-01, cloud checkout; scratch `scratchpad/coherence/v78/`)
- P0 resume check (no LANDED line, no output): fresh start — done
- P1 inputs read (brief whole; inventory-vol-V07-V08; rewrite-V07, rewrite-V08; canon units V07, V08; dated rulings g 114–119; assemble-r0 and its ambiguous-refs list) — done
- P2 live text against the rewrite outputs (assembler's reference fixes) — done
- P3 every inventory id token-checked at its mapped home; flagged ids read by hand — done
- P4 every changed paragraph of the body (archive → live word diff, section by section) read — done
- P5 canon rulings routed here (conflicts, elegance equivalence lists, wiring gaps, restatements) — done
- P6 g items (111–119, the dated rulings) and the f items the issues touch — done
- P7 edges (§3.17 rows of both volumes against the rewrite reports' closures; T-V7-60, T-V8-49) — done
- P8 cross-part notes addressed to V07/V08 in the other seventeen rewrite reports — done
- P9 cohesion (§8 build plans vs INDEX and §16), ids, references, terms, deferral, narration, doc_checks — done
- P10 this report, the result file, LANDED — done

## Outcome

**Not clean: 23 issues — 1 blocker, 11 major, 11 minor.** Owners: V07 13, V08 5, scope 3, determinism 2.

- The blocker, VV78-01, is a NUANCE-LOST. E-31 moved the toll-bridge watercourse rule from V07 §3.1 (1) into V08 §2.6b (3)'s village column, and that column dropped four cases of the archived rule:
  - S0's own water draw as part of the trigger;
  - the realm block's fixed course;
  - the estuary's width class and exit;
  - the failure fallback when there is no through road.
- The majors:
  - g item 119's V07 part is absent (VV78-02).
  - Four conflicts:
    - DR1's surviving pond clause (VV78-03);
    - "specified" under item 115 (VV78-04);
    - the palisade patch ids against V11's `walls.patchMaterials` (VV78-05);
    - §7.7 item 1's stale never-read list (VV78-10).
  - Two losses: `PresenceWhen` is undeclared (VV78-06), and eight decision rows were thinned past narration (VV78-07).
  - One edge gap in V07 §3.17 (VV78-08).
  - Two base wirings: the `PortNote.kind` union (VV78-09) and the §7.7 derivation rows for items 114, 117 and 118 (VV78-11).
  - The build-plan prices in §16 and INDEX (VV78-12).
- Everything else the inventory holds is at its mapped home, or was renamed or moved by a canon ruling. The confirmations are listed below.

All 23 claims are CONFIRMED by reading the live lines cited. Two issues offer the owner a choice of fix:
- VV78-13: rebind the forest re-roll, or register a `forest` concern.
- VV78-21: move `ProductDecl`, or the adjudicator rules V07-RESTATE-1 INVALID.

### Sizes

| volume | archive words | live words | change | more than half? |
|---|---|---|---|---|
| V07 | 104 422 | 92 729 | −11.2 % | no |
| V08 | 84 356 | 77 159 | −8.5 % | no |

Both volumes fall short of the 25–40 % shrink goal. Neither breaks the guard that no reasoned decision may be thinned, except where VV78-07 names a thinned row. Most of the reduction comes from the archived §10 BCR appendices and the reconciliation narration:
- V07 head −2 050 words;
- V07 §1 −1 430 words;
- V08 head −815 words.

The facts from those parts are in the body. Each restored clause from VV78-07 is short, so restoring them costs nothing against the goal.

### doc_checks (provisional)

`tools/doc_checks.py` warned: **"reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) — clean-room results are NOT authoritative; re-run on the machine that holds the corpus before any freeze."** The counts below are provisional.

| file | C1 | C2 | C3 (hits / unreviewed) | C4 | S1 | S2 (hits / unreviewed) |
|---|---|---|---|---|---|---|
| V07-village.md | 0 | 0 | 370 / 348 | 1 / 0 | 0 | 320 / 0 |
| V08-settlementforge.md | 0 | 0 | 182 / 178 | 2 / 0 | 0 | 201 / 8 |

- **C3:** the unreviewed C3 hits are generic phrases and section-number runs, such as "in our own words and", "a green or a square" and "3 5 1 4 11". They are not copied text.
- **S2:** V08's 8 unreviewed S2 hits are false positives. They are volume-prefixed pointers (`V09 §5.7`, `V09 §5.12`, `V11 §3.24`) that the check matched against base headings.
- **Reference-form defects:** the real defects are the bare list continuations in VV78-16 and VV78-17, which S2 does not catch.

## What was checked

### 1. Inventory ids (P3)

The inventory has 498 items: 333 for V07 and 165 for V08.
- **By kind:** rule 132, wiring 85, mechanism 71, table 58, test 27, decision 25, record 23, lifecycle 13, bcr 13, summary 12, plan 12, interface 8, scope 6, handoff 5, trace 2, question 2, note 2, withdrawn 1, term 1.
- **Token check:** every id was located at the home given by the mapping tables in rewrite-V07.md and rewrite-V08.md. Its distinctive tokens (identifiers, numbers, quoted terms) were then checked there. Nothing was sampled.
- **Flagged ids:** 216 ids were flagged (V07 114, V08 102), and every one was read by hand against the archived paragraph. The dispositions:
  - **Descriptive keys and number formats (false positives):** the inventory's summary words did not match the text, though the text states the fact. Examples are "class siting", "items 102-110", "1,80", "port consultation" and "stage I/O".
  - **Renamed to the canon term (one term):**
    - `stripWidthM` → `fields.stripM` with `stripRangeM` (V07 §3.9);
    - `maxGrade[class]` → `rules.grade[class]` (V07 §2.2a, §3.5);
    - `rules.firstView` → §2.2a's `firstView` row;
    - V08's `onCommit`, `onSnapshot` and `onThumbnail` callbacks → the client's store calls (V08 §3.7, `MapStore`).
  - **Retired by a ruling:**
    - `territory.haPerHead` → the area per head derived by E-38 (V07 §3.9 (1)), with no register entry (V12's cross-part note);
    - `RungProfile.splitSites` withdrawn (J-V7.115; `siting.web.splitEnabled`);
    - W40 withdrawn by design.
  - **Moved to the single home:**
    - the campaign's frozen `spatialDigest` → base §7.7 (l.10935);
    - the history cells `reuseCost` and `symbolicQuantile` → V11;
    - the cut-message rules and `dossierRecord` semantics → base §11.3.
  - **Narration that left with the archived §10 BCR pointer tables and the reconciliation appendices:** each fact found in the body.
  - **Ids tied to issues:**
    - V07-0094 and V07-0178 → VV78-22;
    - V07-0142 and V07-0331 → VV78-06;
    - V07-0163 and V07-0220 → VV78-14;
    - V07-0177 and V07-0235 → VV78-01;
    - V07-0322 to V07-0324 → VV78-07.

### 2. Body diffs (P2, P4)

Every section of both volumes was word-diffed, archive against live, and every changed paragraph was read. That covers:
- V07: the head, §0, §1, §1b, §2.1–§2.7, §3.0–§3.17, §4, §5, §6, §7, §8, the appendix and J-V7;
- V08: the head, §0, §1, §1b, §2.1–§2.8, §3.1–§3.17, §4–§8 and J-V8.

The decision rows were compared clause by clause, archive against live. For V07 these are J-V7.1–J-V7.133; J-V7.134–J-V7.143 are new. The thinned rows beyond narration are VV78-07. The other thinning is seam and critique ids and "amended by round N" narration, as principle (5) asks.

Verified:
- **V07 §1b and V08 §1b:** every W row is present. V07 has W1–W81 with W40 retired; V08 has W1–W94. Each row's producer and reader agree with the body, with the exception of VV78-14.
- **V08 §2.4's adapter field table:** it covers all 51 top-level dossier keys.
- **V08 §3.15–§3.16 and V07 §3.12a:** both are at build depth.
- **DUP-1 and DUP-2:** the records placement is at V07 §3.12. The pins and decorations values are at §2.2a, with their rules at §3.10 and §3.9 (6).
- **Truncation and narration:** the rewrite truncated one interface comment (VV78-19), and the "~23:40" narration survives in two places (VV78-20).

### 3. Canon rulings (P5)

The rulings routed to V07:
- **Conflicts:** DIC-06, MC-11, V02-ICONF-1, V07-ICONF-1 to -5, V07-XCONF-1 and -2, CANON-C01, -C03 and -C04.
- **Elegance:** E-01, E-24, E-30, E-31 and E-38.
- **Wiring:** W-IF-02, W-FLD-08, V07-WGAP-1 and -2.
- **Restatement:** V07-RESTATE-1.

The rulings routed to V08:
- **Conflicts:** SCOPE-C07, V08-XCONF-1 to -9.
- **Elegance:** E-17, E-24 and E-31.
- **Wiring:** W-DOS-01a, -01b, -02, -05, -07, -08 and -09, and W-HOOK-02.

Each ruling was checked in the live text. All are applied as ruled except four:
- **E-31:** the village column lost nuance (VV78-01).
- **V07-RESTATE-1:** not applied; the rewriter left it for the adjudicator (VV78-21).
- **E-38:** applied in V07, but base §1.1's frame values still use the retired 2.3 ha (VV78-22).
- **W-DOS-05:** V08 keeps a reader for the dropped `previousGovernments` (VV78-15).

Also confirmed:
- **E-30:** the reference cell is at base §7.6.
- **E-38:** the derivation stands at V07 §3.9 (1).
- **V08-XCONF-5:** the bundle call is at V08 §5.4, and base §11.4 cites it.
- **V08-XCONF-6:** the interface language comes from SettlementForge's setting on `doc.load` (V08 §5.5).
- **INDEX §6:** it marks V08 Q1–Q5 decided.

### 4. f and g items (P6)

Owner rules come first by precedence. The g items were routed by canon.md's dated rulings.

| g item | V07 part | V08 part | result |
|---|---|---|---|
| 111 (arid water) | V07 §3.1 (1)'s arid row | §2.6's `site` row | applied; DR1's pre-111 pond clause contradicts it (VV78-03) |
| 113 (history events) | the epoch under a replay | `Recipe.history`, neutral event keys | applied |
| 114 (palisade patches; readiness and wealth) | V07 §3.4 (8) | V08 §3.16 (2) | present; patch ids disagree with V11 (VV78-05); §7.7 never-read list and derivation row stale or absent (VV78-10, VV78-11) |
| 115 (class mix ceiling; "specified") | V07 §2.4, §3.8, J-V7.136 | V08 §3.16 (3), J-V8.122 | present; the two readings of "specified" conflict (VV78-04) |
| 116 (township view) | V07 §5.2 | — | applied |
| 117 (calendar, seasons, climate) | V07 §5.1, W80 | V08 §3.16 (4) | present; §7.7's item-117 row absent (VV78-11) |
| 118 (traditions) | V07 §5.1, W81 | V08 §3.16 (5) | present; §7.7 still lists `traditions` as never read and has no item-118 row (VV78-10, VV78-11) |
| 119 (one-time waits) | V07 §6's village budgets | (none; head range) | **absent from V07 (VV78-02)**; V08 head says 1–118 (VV78-23) |

The f items, checked where the volumes cite them:
- **item 576 (a):** `PresenceWhen` is cited by base §10.2 but declared nowhere (VV78-06).
- **item 202:** ProductDecl's home (VV78-21).
- **item 508:** `PortNote`'s home is §14, and its union lacks V08's two kinds (VV78-09).

### 5. Edges (P7)

- **V07 §3.17:** its tables were checked against the edge closures in rewrite-V07.md. Five closed classes have no clause in the rows (VV78-08).
- **T-V7-60:** it names clause letters it never defines (VV78-18).
- **V08 §3.17:** it defines clauses (a)–(m), and T-V8-49 runs each of them. No V08 edge issue.

### 6. Cross-part notes (P8)

The notes addressed to V07 or V08 were read in all seventeen other rewrite reports.

Applied:
- **V02:** note 9, on `composition.classFamily`.
- **V04:** note 7, the span rule's `country` reason; note 8, V08 §2.6a's ruin evidence.
- **V06:** the V08 history row.
- **V09:** note 10 (V08 §5.5).
- **V11:** notes 3, 4 and 10.
- **V12:** note 8, on `haPerHead`.
- **kernel:** note 33, item 279 at V07 §3.2 (9).
- **model:** V08 §2.8 cites `CustomChainRecord` and `CustomServiceRecord`.
- **rendering:** V08 §5.4's bundle call.
- **determinism:** V08's field table and `wealth` diff row.

Not applied:
- **V06's patch-row note:** VV78-05.
- **The determinism note on `forest`:** VV78-13.
- **The pipeline note on ProductDecl and PART III:** VV78-21.
- **Scope's note on `previousGovernments`:** VV78-15.

V02's note 14 (whether `VG` composes village buildings) is marked PLAUSIBLE by its own author and addressed to V11 and V07 together. It is left to them.

### 7. Ids, references, terms, deferral, cohesion (P9)

- **Id sequences:** T-V7, J-V7, T-V8, J-V8 and the W rows run without gaps or duplicates.
- **Ambiguous references:** the assembler's ambiguous-refs list has 125 V07 rows and 63 V08 rows, all read.
  - Most are volume list continuations that S7 reads as base sections (VV78-16, VV78-17).
  - Three are base references that each volume's own head rule misreads.
  - The head rule itself disagrees with V10's, so the set has two rules. S7 should be the only one.
- **Terms:** no CHANGED term remains outside the renames above.
- **Deferral wording:** no deferral defect found.
- **Prices (cohesion):** V07 §8 and V08 §8.2 price higher than §16 and INDEX §1 (VV78-12).

### 8. Overlap with the other verifiers

The results of verify-scope, -model, -rendering and -kernel were read so that no issue is raised blind twice. The overlaps:
- **VV78-12:** the same defect as VCS-08 and VCS-18.
- **VV78-22:** the same defect as VCS-11.
- **VV78-15:** the same defect as VCS-16.

Each of these is kept here because the volumes' side must move with the base.

The other verifiers' issues in this area were read: VCS-10, VM-R0S-03/04/05/11/15/31, VRC0S-01 to -06 and -14, and VPC-15. They concern base or other-unit text and are not repeated here.

## Issues

| id | severity | kind | owner | one line |
|---|---|---|---|---|
| VV78-01 | blocker | NUANCE-LOST | V08 | E-31's village column lost four cases of the toll-bridge watercourse rule |
| VV78-02 | major | F-MISSING | V07 | g item 119's V07 part (§6 one-time waits) absent |
| VV78-03 | major | CONFLICT | V07 | DR1's 'a pond only with oasis_water' contradicts item 111's arid row |
| VV78-04 | major | CONFLICT | V08 | 'specified' manor: V08 seigneurial at VILLAGE only vs V07 any villageSeat at every rung |
| VV78-05 | major | CONFLICT | V07 | palisade patch ids disagree with V11 walls.patchMaterials |
| VV78-06 | major | LOST | V07 | interface PresenceWhen declared nowhere (cited by base §10.2) |
| VV78-07 | major | LOST | V07 | eight J-V7 decision rows thinned beyond narration |
| VV78-08 | major | EDGE-UNDEFINED | V07 | five closed edge classes missing from V07 §3.17 |
| VV78-09 | major | WIRING | scope | §14 PortNote.kind lacks frozen_fact_changed and history_gap |
| VV78-10 | major | CONFLICT | determinism | §7.7 item 1 still lists defenseProfile and traditions as never read |
| VV78-11 | major | WIRING | determinism | §7.7 has no item 114/117/118 derivation rows that V07 and V08 read |
| VV78-12 | major | COHESION | scope | §16 and INDEX prices disagree with V07 §8 and V08 §8.2 |
| VV78-13 | minor | CONFLICT | V07 | rerollLayer('forest') names an unregistered concern under T10 |
| VV78-14 | minor | WIRING | V07 | deriveBase replaced by 'the levelled ground' as its own reader |
| VV78-15 | minor | WIRING | V08 | previousGovernments → government.previous has phantom readers |
| VV78-16 | minor | BROKEN-REFERENCE | V07 | 125 V07 bare list continuations; two mean the base; garbled head example |
| VV78-17 | minor | BROKEN-REFERENCE | V08 | 63 V08 bare list continuations; l.2584 means the base |
| VV78-18 | minor | ID | V07 | T-V7-60 defines no clauses (a)–(i) |
| VV78-19 | minor | NEW-PROBLEM | V07 | V07 §2.2a deck comment truncated |
| VV78-20 | minor | NEW-PROBLEM | V07 | 'as revised ~23:40' narration in V07 |
| VV78-21 | minor | CONFLICT | V07 | V07-RESTATE-1 not applied (ProductDecl home) |
| VV78-22 | minor | CONFLICT | scope | §1.1 frame values use the retired 2.3 ha per head |
| VV78-23 | minor | COHESION | V08 | V08 head says items 1–118 |

### VV78-01 — blocker — NUANCE-LOST — owner V08

**Claim.** E-31 moved V07's toll-bridge watercourse rule to V08 §2.6b (3)'s village column, which lost four cases of the archived V07 §3.1 (1) (archive l.1366-1374; inventory V07-0177, V07-0235): (a) at a village the trigger includes S0's own water draw — 'when terrain, access, the realm cell and this draw give none (`none`, or a still water)' and 'a flowing type drawn or given keeps its type'; V08's condition list (terrain, access, water words, realm cell) omits the draw, so a village whose S0 drew a stream is told to force a brook; (b) 'either way, unless the realm block fixes the course's line' the entry and exit bearings go on the two arcs — the realm-block exception is gone; (c) the estuary 'at the brook's width class, its exit the sea side' became 'an estuary between the same two arcs'; (d) the failure fallback 'the toll house stands at an entry (else on the heart's approach)' became 'at a village rung, at the through road's entry' — with a fixed `none` access there is no through road, so the rung is undefined. E-31's equivalence list did not carry these.

**Required change.** In V08 §2.6b (3)'s table, village column: 'the forced course' row → '`water: brook` when terrain, access, the water words, the realm cell and S0's water draw give no flowing water (`none` or a still water); a flowing type drawn or given keeps its type; in either case, unless the realm block fixes the course's line, its entry and exit bearings lie on the two frame arcs the through road's entries divide; the road topology raised to `through` at V07 §3.1 step 3 unless the access word fixes it'; 'on a coastal site' row → 'an estuary at the brook's width class, its exit the sea side, between the same two arcs'; failure row's village wording → 'the toll house at the through road's entry, else on the heart's approach'. V07 §3.1 (1) keeps citing.

Status: CONFIRMED (live lines read).

### VV78-02 — major — F-MISSING — owner V07

**Claim.** g item 119's V07 part ('V07: §6's village budgets', canon dated ruling J130) is absent: V07 §6 has no ten-second comfort level for the village's one-time waits (generate, regenerate, open from SettlementForge, a dossier change applied, an epoch and the history replay of V07 §3.12a, an export, a migration), no 'slower than its target only for a recorded measured gain' rule, no pointer to the progress view past one second (V09 §4.21.9), no statement that the edit, frame and switch budgets are interaction budgets item 119 (d) leaves unchanged; the VILLAGE row and the pre-decided fallback still re-declare a missed bar 'for the owner's veto (D-18's form)', which item 119 (a) turns into a declared TARGET miss inside the comfort level; no bar, decision, W row or price; the head reads 'items 1–118 the owner's'.

**Required change.** Add V07 §6 *One-time waits* (item 119 (a)–(d), (f) at THORP–VILLAGE: the laws above stay the targets; every one-time wait listed ≤ 10 s from click to complete result on §12.1's reference machine; a step slower than its target only with its recorded measured gain (V11's `perf.qualitySpend` row); progress past 1 s by V09 §4.21.9; the edit and switch budgets are interaction budgets, unchanged); change the VILLAGE row's and the fallback's 'for the owner's veto (D-18's form)' to 'a declared target miss inside item 119's comfort level'; add T-V7-67 (every one-time wait at every village rung within 10 s, progress past 1 s, every slower-than-target step tied to its recorded gain), a J-V7.144 row, a §1b W82 row and its V-M3 price in §8; the head's 'items 1–118' → 'items 1–119'.

Status: CONFIRMED (live lines read).

### VV78-03 — major — CONFLICT — owner V07

**Claim.** V07 §3.11 DR1 (l.2083-2084) reads '`desert` → the arid row (V07 §3.1 (1)'s arid water weights), an oasis with `oasis_water` (DR40), and a pond only with it' — the pre-item-111 clause 'a pond only with `oasis_water`' survives beside item 111's arid weights. V07 §3.1 (1) says an arid village 'still draws a river, a pond or a coast at the arid row's chances'; V08 §2.6's `site` row (l.757-758) 'a river, a lake and a coast all stay possible'; DR40 makes the oasis itself 'a spring-fed pond or small lake'. A dossier desert village's pond is allowed by one statement and forbidden by the other.

**Required change.** V07 §3.11 DR1: replace '`desert` → the arid row (…), an oasis with `oasis_water` (DR40), and a pond only with it' by '`desert` → the arid row: S0's water weights re-weighted by V07 §3.1 (1) (a brook, stream, river, pond or coast at the arid row's chances) and the oasis exactly when `oasis_water` is listed (DR40; V08 §2.6's `site` row)'.

Status: CONFIRMED (live lines read).

### VV78-04 — major — CONFLICT — owner V08

**Claim.** What the dossier 'specifies' under item 115's ceiling disagrees between units: V08 §3.16 (3) (b) and J-V8.122 admit only 'a seigneurial government's forced manor … at VILLAGE the one manor the ceiling admits', while V07 §2.4's `v.manor_house` row ('forced by DR11 when a dossier government's `villageSeat` names it (seigneurial, crown) … — "specified", at every rung'), V07 §3.8 ('a dossier government whose `villageSeat` names the manor (DR11's forced seat)'), J-V7.136 and V11 W83 ('a `villageSeat`') count any dossier government whose `villageSeat` is `v.manor_house` — crown included (V11 §3.21.1) — at every village rung (J-V7.104's forced seat). A crown HAMLET dossier keeps a manor by V07 and has none by V08; V07 §3.8 says the reading is V08's.

**Required change.** V08 §3.16 (3) (b) → 'a dossier government whose `villageSeat` names the manor house — seigneurial or crown (V11 §3.21.1) — V07's manor forced as the seat at every village rung (DR11; J-V7.104), at VILLAGE the one manor the ceiling admits'; J-V8.122 likewise ('or a dossier government's forced manor'); V07 §3.8's 'Unless specified' sentence cites V08 §3.16 (3) for the dossier cases instead of restating them.

Status: CONFIRMED (live lines read).

### VV78-05 — major — CONFLICT — owner V07

**Claim.** V07 §3.4 (8)'s village patch rows disagree with their home, V11 §3.25.3's `walls.patchMaterials` (V11 l.4155-4166): V07 `earthwork` — `brush`, `turf`; V11 `earthwork` — `brush_and_turf`, `hurdles`; V07 `inner` — `timber_hoarding`, `dry_stone`; V11's masonry rows (`inner` among their kinds) — `timber_hoarding`, `wattle_fence`, `earth_bank`, `dry_stone_infill`, `mudbrick_infill` (culture-gated); V07 §5.1's line styles name `turf` and `dry_stone`, while V11's rows carry `look` roles (`patch.stakes`, `patch.wattle`, `patch.brush`, `patch.earth`, `patch.timber`, `patch.drystone`); V07 never names the table `walls.patchMaterials` (registry row 96). T-V7-62 tests 'its kind's patch rows'.

**Required change.** V07 §3.4 (8): cite `walls.patchMaterials` (V11 §3.25.3) and its ids — `palisade`: `odd_stakes`, `hurdles`, `brush`; `earthwork`: `brush_and_turf`, `hurdles`; `inner`: V11's masonry rows — instead of the six ids written there; V07 §5.1 *The run conditions*: draw each patched run by its row's `look` role (§8.2's patch roles), naming no id of its own.

Status: CONFIRMED (live lines read).

### VV78-06 — major — LOST — owner V07

**Claim.** `interface PresenceWhen` is declared nowhere in the set: base §10.2 (l.13530) types `presence?: { member?; when?: PresenceWhen; law: PLaw }[]` and says 'PLaw and PresenceWhen are V07 §2.2's and §2.4's' (item 576 (a)); V07 §2.2 declares `PLaw` (l.427), but V07 §2.4 (l.797-808) gives only prose readings. The typed block lived in archived V07 §10's BCR-V7-36 text (archive l.3903-3906: `gov?: string[]; with?: string; without?: string; site?: 'flowing'|'millSeat'|'water'; noSite?: …; resource?: { key: 'ore'|'stone'|'timber'|'fish'|'clay'|'fertile'; min: number }; road?: string[]; defenceMin?: number; threat?: boolean`, 'every member stated must hold'), which left with the §10 pointer table (inventory V07-0142, V07-0331).

**Required change.** Declare `interface PresenceWhen` in V07 §2.4 beside its readings, as the archived block states it (field names and types, `defenceMin` for 'defence ≥ v', the resource key enumeration, and 'every member stated must hold').

Status: CONFIRMED (live lines read).

### VV78-07 — major — LOST — owner V07

**Claim.** Decision rows were thinned beyond narration (principle (9): no reasoned decision dropped or thinned for the shrink goal; inventory V07-0322 – V07-0324): J-V7.130 lost 'a forced pin … would otherwise stand with a provenance naming a record the dossier no longer holds' and 'keeping the rank would keep a market the dossier no longer holds and our law would not derive (items 20, 22)'; J-V7.125 lost '(its last rung the base's `dossier` request's closest option), since a declined one would take the S7b claim the village never runs'; J-V7.124 lost 'most cells they bear on are columns of `roster.classes` already bound by V12's lines (the items 103–108 line among them); a V-M2 miss is repaired in the landing change, which the default line's entry does not record (its first history row is M-CAL's)' and 'so one change writes every entry once'; J-V7.123 lost 'and could not land; the rule (VG's code-read behaviour, else the `MFCG` entry's value, `fixed:`) asks no new judgement of that seat'; J-V7.122 lost '`village.json`'s readers stay the village stages, V06 §3.16's fifteen ids gain none'; J-V7.127 lost 'while the forced one belongs to its record'; J-V7.132 lost 'without the hooks the records placement's and the pins' failures return on the village's own milestones'; J-V7.112 lost which classes ('a monastery, a market hall, a slave market') and 'not an abbey's precinct'.

**Required change.** Restore each listed clause in its row (seam and critique ids left out), wording as quoted.

Status: CONFIRMED (live lines read).

### VV78-08 — major — EDGE-UNDEFINED — owner V07

**Claim.** V07 §3.17's rows omit edge classes the rewrite reports as closed: M-V07-3052-E4-degenerate (the clerk; routed UNDEFINED — the clerk row states only data and lifecycle), M-V07-3036-E1-none and M-V07-3036-E5-data (§4.4's edit lifecycle; routed UNTESTED — the editing row names no none or data case, so T-V7-60, which runs the rows' clauses, tests none), M-V07-3189-E5-data (labels; UNTESTED — the rendering row has no data clause), M-V07-3207-E2-one (exports; UNTESTED — no one-item clause).

**Required change.** In V07 §3.17 (a): the clerk row gains 'degenerate: a `why` on a zero-area end or a field with no face answers its anchor's or system's line'; the editing row gains 'none: an undo with no village edit in the log changes nothing; data: an edit whose target a dossier absorb removed is a dry-run F-EDIT naming the absorb'; the rendering row gains 'data: a dossier title word absent → the rung's word; one: a one-dwelling THORP exports every format'; T-V7-60 covers each clause.

Status: CONFIRMED (live lines read).

### VV78-09 — major — WIRING — owner scope

**Claim.** V08 §2.4 (l.571-573) adds two port note kinds, `frozen_fact_changed` and `history_gap` (report class; V08 §4.6 rows; W38; J-V8.102, J-V8.125; T-V8-56), but §14's `PortNote.kind` union (base l.17055-17059, the type's home by item 508) lists neither, and no cross-part note routed them: the port emits notes its own type does not admit.

**Required change.** §14's `interface PortNote`: add `'frozen_fact_changed'|'history_gap'` to the `kind` union (their class and meaning V08 §4.6's, as the union's comment says).

Status: CONFIRMED (live lines read).

### VV78-10 — major — CONFLICT — owner determinism

**Claim.** Base §7.7 item 1 (l.10925-10927) still lists `defenseProfile` whole and `traditions` among the never-read keys and names V08 §2.4's field table as 'the list', while that table reads `defenseProfile.readiness.label`, `.score` (item 114; V08 §3.16 (2)) and `traditions[]` with `customContentRoster.traditions` (item 118, which supersedes the ignore-list entry by the owner's rule, canon J129; V08 §3.16 (5)).

**Required change.** §7.7 item 1: '`defenseProfile` (copies of …)' → '`defenseProfile` all but `readiness` (item 114; V08 §3.16 (2))'; drop `traditions` from the never-read list (item 118; V08 §3.16 (5)).

Status: CONFIRMED (live lines read).

### VV78-11 — major — WIRING — owner determinism

**Claim.** Dangling inputs of V07 and V08's g-item parts at §7.7: V07 §3.4 (8), §3.11 and W77 read '§7.7's readiness-and-wealth derivation row (item 114 (d))'; V07 §5.1, W80 and V08 §3.16 (4) read '§7.7's item-117 row' (week mod 52 by the `calendar` row; the climate's source order; the height correction); V07 §5.1, W81 and V08 §3.16 (5) read '§7.7's item-118 row' (window and staging); none exists in the live §7.7 (no 'item 114/117/118' text in the base) — the canon's dated rulings route these rows to determinism.

**Required change.** Write in §7.7 the three derivation rows as V07 and V08 read them: item 114 (readiness band and wealth → each run's generation-time condition at V11 §3.25.3's shares; the need fold max(threat, readiness weight)), item 117 (HostContext.week → year position `week mod 52` by the `sf445` calendar row; climate: `site.climate`, else the `climates` row's terrain column, else the user's; the height correction), item 118 (carried `tradition` facts → the windows in `sf445` weeks and the staging keys, decorations shown while the view's week lies inside a window).

Status: CONFIRMED (live lines read).

### VV78-12 — major — COHESION — owner scope

**Claim.** The build-plan prices disagree (same defect as verify-scope VCS-08 and VCS-18, seen from the volumes): V07 §8's total is 29.75–41.75 pw (V-M1 9–11.25, V-M2 7.5–10.75, V-M3 9–13.5), V08 §8.2's 18–24.5 pw (SF4 5.75–7.75), while §16's staged-milestones row and totals and INDEX §1's product map still read 26.5–36.5 (V07) and 15.75–21.5 (V08).

**Required change.** §16 and INDEX §1 (and INDEX §4's totals): the village line 29.75–41.75 pw and the M-SF line 18–24.5 pw, as V07 §8 and V08 §8.2 state them.

Status: CONFIRMED (live lines read).

### VV78-13 — minor — CONFLICT — owner V07

**Claim.** `rerollLayer('forest')` names a concern the base does not register and binds it to the wrong tool: V07 §3.9 (2) (l.1907), §3.15 (l.2759), §4.1's T10 row (l.2955) and §5.1 (l.3129) bind it to T10 `hold`, but §6.1's registry (l.8629, l.8700) has no `forest` concern and §7.1 (l.9761) binds `render.instances` and `style.crowns` re-rolls to T12 `dress`; the determinism rewriter's cross-part note asked V07 to change it or request a registry row (V09 l.1651 repeats V07's binding).

**Required change.** In those four places name a registered concern under its bound tool — the woods' crowns by `rerollLayer('style.crowns')` (or `render.instances`) under T12 `dress` — or, if the woods must re-roll alone, add a `forest` row to §6.1's registry bound in §7.1 under one tool and cite it; V09's row follows.

Status: CONFIRMED (live lines read).

### VV78-14 — minor — WIRING — owner V07

**Claim.** The ground-datum consumer of the levelled ground (`deriveBase`, base §2.6, which reads `levelledGroundCm`, §4.7) was replaced by the levelled ground itself (inventory V07-0163, V07-0220): W57 lists 'the levelled ground' among its readers, W58 'the levelled ground (§4.7)', §2.6's generated-wall row 'the levelled ground' and its platform row 'the levelled ground (§4.7)' as readers of the levelled ground, and V07 §3.8a (1) says 'which the heights (§2.2's datum) … read' — base §2.2 is the plat's arena, the datum is §2.6's.

**Required change.** In W57, W58, §2.6's two rows and V07 §3.8a (1) name the reader as 'the ground datum (§2.6's `deriveBase`)'.

Status: CONFIRMED (live lines read).

### VV78-15 — minor — WIRING — owner V08

**Claim.** V08 §2.4's field table maps `powerStructure.previousGovernments[]` → `government.previous` → 'V06's chronicle; V10's history answer', but no V06 or V10 text reads it, the base dropped the field (J-A73.06; canon W-DOS-05) and lists the path as never read; scope's cross-part note asked V08 to drop it (same defect as verify-scope VCS-16).

**Required change.** Move `powerStructure.previousGovernments` to the field table's `ignored` row with §7.7 item 1's reason and drop `government.previous` wherever V08 names it.

Status: CONFIRMED (live lines read).

### VV78-16 — minor — BROKEN-REFERENCE — owner V07

**Claim.** 125 bare list continuations after a volume prefix (the assembler's ambiguous-refs.tsv, V07 rows) read by S7 (bare § = base) as base sections that do not state the facts — e.g. l.89 'V07 §2.4, §3.8, §3.11' (base §3.8/§3.11 are kernel sections), l.144 'V04 §3.1, §3.10', l.3546 'V07 §2.2 and §2.4'; two of them mean the BASE and are misread by V07's own head rule ('a list after a volume prefix stays in that volume'): l.2345 '(… §6.3)' in a V06 §3.9.6 clause (base §6.3, addresses) and l.2530 '(V06 §3.6's growth, §4.4)' (base §4.4, S5; V06 §4.4 is 'Editing the past'); the assembler's G-cite fix also garbled the head's example into '(`V06 §2.1, V06 §3.5.2` is two sections of V06)'. V10 declares the opposite list rule, so the set has two.

**Required change.** Prefix each of the 123 volume continuations (`Vnn §x`), write l.2345's and l.2530's base sections in their own parentheses ('(§6.3)', '(§4.4)'), and replace the head's citation sentence by S7's: every volume section carries its prefix, a bare § is always the base's.

Status: CONFIRMED (live lines read).

### VV78-17 — minor — BROKEN-REFERENCE — owner V08

**Claim.** 63 bare list continuations after a volume prefix (ambiguous-refs.tsv, V08 rows — e.g. l.105 'V08 §3.2–§3.4', l.2938 '(V08 §5.1, §4.6, §3.9)', the §11 table's cells at l.3285-3287) read by S7 as base sections that do not state the facts; l.2584 '(§5.4's `changes`…' after 'V09 §4.10's' means the base's §5.4 generation report and is misread by V08's own head rule ('a list after a volume prefix stays in that volume').

**Required change.** Prefix each volume continuation (`Vnn §x`), leave l.2584's base §5.4 bare in its own clause, and restate the head's citation sentence as S7 (every volume section prefixed; a bare § is the base's).

Status: CONFIRMED (live lines read).

### VV78-18 — minor — ID — owner V07

**Claim.** T-V7-60's clause letters are undefined: V07 §3.17's test column cites 'T-V7-60 (a)' … '(h)' and the moat combination row 'T-V7-60 (i)', but T-V7-60 (l.3427) defines no clauses — it calls §3.17's mechanism rows '(a)–(h)' (whereas §3.17's (a) and (b) are its two tables) and its milestone column names only '(g) at V-M2u'. (V08's T-V8-49 defines its (a)–(m).)

**Required change.** T-V7-60 lists its clauses (a)–(i) with the §3.17 rows each runs ((a) records, request block, pipeline; (b) S0, VS1, VS2; (c) VS3, VS4, raised way; (d) open space, VS5, VS6, levelling; (e) hinterland, wharf, deck plots; (f) dossier readings, epochs, ladders; (g) underground; (h) editing, rendering; (i) the combination rows) and the milestone of each.

Status: CONFIRMED (live lines read).

### VV78-19 — minor — NEW-PROBLEM — owner V07

**Claim.** The rewrite truncated V07 §2.2a's `deck` comment (l.560): 'parapetM: M }; // V07 §3.10a (item 110 (d)); the least deck-plot depth is V11 §3.24.4's' — the archived '`minPlotDepthM` by deck kind: no village cell' is cut off mid-clause (the table row l.597 still states it).

**Required change.** l.560's comment → '… the least deck-plot depth is V11 §3.24.4's `minPlotDepthM` by deck kind (no village cell)'.

Status: CONFIRMED (live lines read).

### VV78-20 — minor — NEW-PROBLEM — owner V07

**Claim.** Revision-time narration survives in normative text (principle (5)): '(item 110 (b) as revised ~23:40; J-V7.83)' in §3.5a's heading (l.1543) and 'item 110 (b) as revised ~23:40' in the rung-gate paragraph (l.1511).

**Required change.** Read 'item 110 (b)' in both places.

Status: CONFIRMED (live lines read).

### VV78-21 — minor — CONFLICT — owner V07

**Claim.** V07-RESTATE-1's canon ruling ('ProductDecl's interface lives in the base (via BCR-V7-11 at §4.12); V07 cites it and states only the 'village' entry's values') is not applied: the interface stays in V07 §2.1 and the base cites it there (§4.12 l.8141, §14 l.17021 'V07 §2.1's type'); the rewriter marked it for the adjudicator under item 202's applied text, leaving the finding open.

**Required change.** Either move `interface ProductDecl` (every member and comment) to §4.12 beside `StrategyRegistry.products`, §14's comment citing §4.12 and V07 §2.1 keeping only the 'village' entry's values — or the adjudicator rules V07-RESTATE-1 INVALID under item 202's applied text (f item over base home, principle (3)).

Status: CONFIRMED (live lines read).

### VV78-22 — minor — CONFLICT — owner scope

**Claim.** §1.1's village rows (l.318-320) still give the frame at the target as THORP 1.2 km², HAMLET 5.8 km², VILLAGE 20 km² (the retired `territory.haPerHead` 2.3), while E-38 derives 2.275 ha per head and V07 §3.2 (1)'s law gives 1.1, 5.7 and 19.9 km² (same defect as verify-scope VCS-11; inventory V07-0094, V07-0178).

**Required change.** §1.1's rows: THORP 1.1 km² (1.1 km), HAMLET 5.7 km² (2.4 km), VILLAGE 19.9 km² (4.5 km), citing V07 §3.9 (1)'s derived area per head.

Status: CONFIRMED (live lines read).

### VV78-23 — minor — COHESION — owner V08

**Claim.** V08's head (l.10) reads 'items 1–118 the owner's', but file g runs to item 119, an owner rule (no V08 part, but an owner item the set cites).

**Required change.** V08's head: 'items 1–119 the owner's'.

Status: CONFIRMED (live lines read).
