# Verify — coherence pass, round 1: volumes V07 (village) and V08 (SettlementForge) after repair round 1

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-vol-V07-V08-r1t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V07-V08-r1t`, 2026-10-01, cloud checkout; scratch `scratchpad/coherence/v78r1/`)
- P0 resume check (no LANDED line, no output): fresh start — done
- P1 inputs read (brief whole; round-0 findings VV78-01 – VV78-23; assemble-r1; repair-r1-V07 and repair-r1-V08 preambles and the V07 ruling request; canon dated rulings for items 114–125; file g items 119, 120, 122, 122 (h)–(i), 125) — done
- P2 every round-0 finding re-checked against the live text — done
- P3 every hunk of the two whole-volume REPLACE blocks (pre-round-1 → live, word diff; 78 substantive V07 hunks, 59 V08, plus 55 and 28 prefix-only) read in its whole subsection, each moved or cut fact traced to its new home — done
- P4 other units' repairs at the V07 / V08 seams (base §1.1, §2.5, §4.1, §7.7, §8.2, §13.2, §14, §16, INDEX; V04, V05, V06, V09, V11 ends) — done
- P5 owner items: 114–119 parts not undone; G120 parts against item 120 (a)–(k); G121–G125 parts routed here — done
- P6 ids, references, terms, deferral, narration, sizes, doc_checks — done
- P7 this report, the result file, LANDED — done

Live files checked: `docs/volumes/V07-village.md` sha256 `02f8dbb4…` (3 917 lines), `docs/volumes/V08-settlementforge.md` `b96e79d8…` (3 440 lines), base `137ecc0e…`, INDEX `9efc19e3…` — each equal to assemble-r1's "after" hash. The pre-round text is HEAD `3f0e02b2d7b9` (V07 `4c802a46…`, V08 `5a91bfa8…`).

## Outcome

**Not clean: 10 issues — 0 blockers, 6 major, 4 minor.** By owner: V07 5, V08 3, V11 1, scope 1.

- **Round-0 findings (23).** 20 are fixed in the live text. Three stay open:
  - VV78-04: V07 and V08 now agree on what "specified" reads, but V11's round-1 repair restated V08's old reading ("a seigneurial government's forced manor") at V11 W83 and V11 §3.25.4. That leaves out the crown seat V08 now admits.
  - VV78-12: V07's repair raised its price to 30.25–42.5 pw (items 119 and 120). §16 and INDEX §1 still carry the earlier 29.75–41.75.
  - VV78-21: re-raised for the adjudicator. V07 wrote a RULING REQUEST, which the assembler skipped by rule.
- **New problems from the repairs (3, all minor, all V07):**
  - J-V7.136 and W78 restate "specified" more narrowly than V08 §3.16 (3) (VV78-r1-01).
  - V07 §8 says INDEX §4 carries its price. INDEX §4 states no price (VV78-r1-02).
  - V07 still writes `OpeningRow`, which V04 renamed `UnderOpeningRow`. V04's hand-off was not closed, and the base's `OpeningRow` is now the opening-hours row (VV78-r1-03).
- **Owner items:**
  - Parts 114–119 stand: none was undone, and item 119's V07 part is now written.
  - G120-V07 and G120-V08 are present at build depth.
  - G122-V07, G122-V08, G122h-V08 and G125-V08 are absent, as expected: no round-1 repair carried items 121–125.
  - Items 121, 123 and 124 name neither volume.
- **Nuance:** none was lost in the moves the repairs made. ProductDecl's epoch members went to V06 §2.1 and V06 §3.2. `RaisedRead` went to base §4.1. The territory measures went to base §2.5. The dig, well and opening rules went to V04 §3.5.7 (d)–(f). The patch line styles went to base §8.2. Each was traced and is stated whole at its new home.
- **Covered elsewhere:** base §13.2's take-over ranges still read T-V7-1 – T-V7-66 and T-V8-1 – T-V8-57, missing T-V7-67, T-V7-68 and T-V8-58. verify-scope-r1t's VCS-10 already carries this, so it is not raised again here.

### Sizes

| volume | archive (r0 counter) | before round 1 | live | round 1 | against the archive | more than half? |
|---|---|---|---|---|---|---|
| V07 | 104 422 | 92 729 | 96 143 | +3.7 % | −7.9 % | no |
| V08 | 84 356 | 77 159 | 79 800 | +3.4 % | −5.4 % | no |

The growth comes from new owner design and the round-0 fixes:
- V07: item 119's one-time waits and item 120's Find at the village rungs (≈ 2 600 words), the restored decision clauses (≈ 230) and `PresenceWhen` (≈ 90).
- V08: item 120's dossier entries (≈ 1 840 words) and the field table's per-reason rows (≈ 330).

Both volumes stay short of the 25–40 % shrink band. They are held by irreducible content: owner items 111–120 at build depth. No unit shrank by more than half.

### doc_checks (provisional)

`docs/validation/bench/doc_checks.py --doc <volume> --heads docs/ARCHITECTURE.md` exits 1 on both volumes. It warned: **"reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) — clean-room results are NOT authoritative; re-run on the machine that holds the corpus before any freeze."**

| file | C1 | C2 | C3 (hits / unreviewed) | C4 | S1 | S2 (hits / unreviewed) |
|---|---|---|---|---|---|---|
| V07-village.md | 0 | 0 | 349 / 318 (r0: 370 / 348) | 1 / 0 | 0 | 339 / 0 |
| V08-settlementforge.md | 0 | 0 | 164 / 158 (r0: 182 / 178) | 2 / 0 | 0 | 209 / 8 |

- The unreviewed C3 hits are ordinary phrases and section-number digit runs, as in round 0, and none is a copied text.
- V08's 8 unreviewed S2 hits are false positives: the same volume-prefixed pointers as in round 0 (`V09 §5.7` ×6, `V09 §5.12`, `V11 §3.24`).
- The assembler's resolver reports 0 ambiguous and 0 broken references in both volumes.

## 1. Round-0 findings against the live text

| id | verdict | where / why |
|---|---|---|
| VV78-01 | FIXED | V08 §2.6b (3)'s village column now restores all four archived cases (archive V07 l.1366–1374): <br>• S0's water draw is in the trigger, and "a flowing type drawn or given keeps its type". <br>• The realm-block exception for the bearings is back. <br>• The estuary is again "at the brook's width class, its exit the sea side". <br>• The failure cell reads "at an entry — the through road's where one exists — else on the heart's approach". <br>The rule's lead and W55 name S0's draw, and V07 §3.1 (1) cites the rule. |
| VV78-02 | FIXED | Item 119's village part is written: <br>• V07 §6 *One-time waits*. <br>• The VILLAGE row and the fallback now read "a declared target miss inside item 119's comfort level". <br>• T-V7-67, J-V7.144, W82, a §3.17 (a) row and V-M3's +0.25. <br>• The head reads "items 1–120". <br>The citations V09 §4.21.9, V11 §3.25.8 and §4.1's quality budget all resolve. V06's item-119 (a2) part, which V07 cites for the epoch and the replay, exists (V06 W91, `advance.budgetMs`). |
| VV78-03 | FIXED | V07 §3.11 DR1 `desert` reads as required. It agrees with DR40 ("a dossier with `oasis_water` has an oasis"), V08 §2.6's `site` row and W60. |
| VV78-04 | **PERSISTS (V11)** | V07 §3.8 now cites V08 §3.16 (3). V08 §3.16 (3) (b), J-V8.122, W63, T-V8-53 and the §3.17 items row all admit a `villageSeat` manor, seigneurial or crown, at every village rung. V11 §3.21.1 maps both `crown` and `seigneurial` to `v.manor_house`. But V11's round-1 repair (VV1112-09) restated V08's pre-round reading: V11 W83 (l.229) and V11 §3.25.4's "Specified" bullet (l.4251) read "or a seigneurial government's forced manor". So a crown HAMLET dossier's manor is specified by V08 and V07, and not by V11. See the issue. |
| VV78-05 | FIXED | V07 §3.4 (8) now names `walls.patchMaterials`' ids exactly as V11 §3.25.3 lists them (`odd_stakes`, `hurdles`, `brush`; `brush_and_turf`, `hurdles`; V11's masonry rows). V07 §5.1 draws each patched run by its row's `look` role, and base §8.2's six patch looks are the home of those styles. W77, T-V7-62 and J-V7.135 follow. |
| VV78-06 | FIXED | `interface PresenceWhen` is declared in V07 §2.4 (l.803–807), field for field as the archive (archive l.3903–3906), with "every member stated must hold". |
| VV78-07 | FIXED | All 14 restored clauses stand in their own rows: J-V7.112, .122, .123, .124, .125, .127, .130 and .132. |
| VV78-08 | FIXED | V07 §3.17 (a) now has: <br>• the clerk row's degenerate case; <br>• the editing row's none and data cases; <br>• the rendering row's one and data cases. <br>Their tests are T-V7-22, T-V7-54, T-V7-61 and T-V7-60 (h), and (h) covers editing, the clerk, rendering, labels, exports and Find. |
| VV78-09 | FIXED | Base §14 `PortNote.kind` (l.18152–18155) includes `'frozen_fact_changed'` and `'history_gap'`. |
| VV78-10 | FIXED | Base §7.7 item 1 is now path-free and names V08 §2.4's `ignored` rows as the one list. The owner's two exceptions (`defenseProfile.readiness`; `traditions` with the custom traditions bucket) are stated. |
| VV78-11 | FIXED | Base §7.7 holds DR41 (item 114 (d)), DR42 (item 117) and DR43 (item 118). Each is also called "the item-114/117/118 row", so V07's citations by that name resolve. V08 cites DR41–DR43 by number. |
| VV78-12 | **PERSISTS (scope)** | V08's 18–24.5 pw now agrees with §16 and INDEX. V07's repair priced items 119 and 120 at V-M3 (V-M3 9.5–14.25; total **30.25–42.5**). §16 l.18743 and l.18786 and INDEX §1 l.30 still read 29.75–41.75. §16 l.18743 also still says "items 111 and 113–118". This is the same defect as verify-scope-r1t's VCS-08 and VCS-18, seen from V07. |
| VV78-13 | FIXED | The woods' trees now re-roll through T12 `dress`'s New trees, `rerollLayer('render.instances')`, at V07 §3.9 (2), §3.15, §4.1's T10 and T12 rows and §5.1. V09 J-V9.101 and V09's T12 row agree. No `forest` concern remains. |
| VV78-14 | FIXED | W57, W58, §2.6's two rows and V07 §3.8a (1) all read "the ground datum (§2.6's `deriveBase`)". |
| VV78-15 | FIXED | The field table reads `powerStructure.previousGovernments[].tick` alone, into `receipts` under the government's key (§4.11's dating rung, F11). An `ignored` row carries the rest with J-A73.06's reason. `government.previous` occurs 0 times. This agrees with J-A73.06, rationale l.791 and base l.8096. |
| VV78-16 | FIXED | The head states S7's rule. 118 V07 continuations, 3 V04 and 2 V11 now carry their prefixes. The two base sections stand bare in their own parentheses (l.2357 "minted (§6.3)"; l.2544 "from S5 on (§4.4)"). The resolver finds 0 ambiguous references. |
| VV78-17 | FIXED | The head states S7's rule, and 59 continuations now carry their prefixes. V08 §4.6 (1)'s base §5.4 stands bare in its own clause (l.2657). 0 ambiguous references. |
| VV78-18 | FIXED | T-V7-60 lists its clauses (a)–(i), each with its §3.17 rows and its milestone. |
| VV78-19 | FIXED | V07 §2.2a's `deck` comment is complete (l.556). |
| VV78-20 | FIXED | "item 110 (b)" now stands at §3.5's rung gate and in §3.5a's heading. The same narration ("as revised") is also cut at §1, §2.4's crypt paragraph and T-V7-46. |
| VV78-21 | **OPEN — ruling requested by V07** | repair-r1-V07.md l.4049–4074 asks the adjudicator to rule V07-RESTATE-1 INVALID under item 202's applied text. assemble-r1 skipped the request block by rule. Re-raised unjudged. |
| VV78-22 | FIXED | §1.1's village rows read 1.1 km² (1.1 km), 5.7 km² (2.4 km) and 19.9 km² (4.5 km), at 2.275 ha a head (l.329–331). |
| VV78-23 | FIXED | V08's head reads "items 1–120". Items 121–125 have since been filed. The range follows when V08 writes its parts (G122-V08, G125-V08). |

## 2. The round's changes read whole (P3)

Both repairs are one REPLACE of the volume's level-1 heading, so the whole of each volume was replaced. Every substantive hunk was read inside its subsection:
- V07: 78 hunks, and 55 that only add a prefix.
- V08: 59 hunks, and 28 that only add a prefix.

Where text was cut as a restatement, the fact was traced to its home:

| cut or moved in the round | the home now stating it | verdict |
|---|---|---|
| V07 §2.1 `ProductDecl`'s `phases`, `participants`, `rows`, `records` members (VAT0-18) | V06 §2.1 `ProductDeclEpoch` (l.415–417). The participants' steps, orders (10, 20, 60) and scopes are in V06 §3.2's table (l.1011–1019). The values are in V07 §3.12 *The village's registration*. | whole |
| V07 §2.4: the village measures of `dist.centre`, `.gate`, `.market` and `.harbour`, including the fair field never counted and the perimeter-crossing fallback (VAL-11) | base §2.5 *At the rungs whose frameLaw is territory* (l.1214–1222) | whole |
| V07 §2.7 `RaisedRead` (VAL-13) | base §4.1 (l.4619–4628). The supports and spans by key with their `state`, plus `origin`, `reason`, `deck`, `feet` and `channel`. | whole; V07 §3.5a (2)–(6) read "a support whose `state` is absent or `ruined`" |
| V07 §3.16 (3) (i)–(iii): the dig draw, the well reading and the opening candidates (VAL-10) | V04 §3.5.7 (d), (f) and (e) (l.1841–1875). The village's class rows stay in V07. | whole |
| V07 §5.1's six patch line styles (VV78-05) | base §8.2 *The patch looks* (l.12674–12679), by `walls.patchMaterials`' `look` | whole |
| V07 §3.12: hollow ways struck "at the street rate per year" (VAT0-08) | V06 §3.5.2's strike pool (`w = E(x)·rate·u`, the `fabric` churn cap scaled by `years`, base l.8114) | aligned to the home |
| V07 §3.17 (b): "a retaining wall on a cliff edge" now has no wall on a cliff (VEW-16) | base J-A110.43 and §4.7 S10. The cliff setback is §4.2 S1 (8)'s `cliff` row (base l.6577). | aligned to the home |
| V08 §2.4: the one `ignored` row split by reason (VAH-03) | every pre-round ignored key is present in its reason's row. Added: `mapEdits`, `fogSessions`, `worldState.spatialLedgers.*` and the derived reads. | complete |
| V08 W34's `HistoryHint` consumers (VAH-05) | V08 W39 (`Recipe.history` → S2's stage count, II.7.6) | whole |

Other references in the new text that resolve and agree:
- V11 `LadderStep` (V11 l.506)
- `W_DOSSIER_EDGE` (base l.6783; EP-26)
- the river or lake harbour (base l.4957; EP-25)
- F-V8-8 (base l.11693)
- the adapter's 2 000-institution limit (V08 l.563)
- V11 W87
- V09 §2.10's `effectiveKey`
- V09 §8.1's AP5b at M-SF
- V11 §8's C4a, C4b and C9
- V05 §3.15 (6)'s downward rung crossing
- V09 §4.9 as the message catalogue

Further checks:
- No retired term (canon glossary, 35 patterns) gained an occurrence in either volume.
- No deferral or revision narration was added.
- Ids are unique: T-V7-1 – T-V7-68; J-V7 145 rows; W1 – W83, with W40 retired by design. T-V8-1 – T-V8-58; J-V8 127 rows; W1 – W95.

## 3. Owner items (P5)

- **Items 114–119.**
  - Parts stand: V07 §3.4 (8), §3.8, §5.1, §5.2 and §6; V08 §3.16 (1)–(5). None was undone.
  - Item 119's V07 part is the round-0 F-MISSING, now written (VV78-02).
- **G120-V07 — present.** V07 §5.5 (1)–(5) covers item 120:
  - (a) A view key outside the document, kept until Clear.
  - (b) The list: the `v.` kinds with counts and V11's groups, the dossier's names first, the village, its ends, the field groups, V07 §5.3's places, and people via "Where is".
  - (e) The veil, the halo, the township-view pins and the bubbles.
  - (f) Below, Sky and the interior band; re-evaluation at every commit, epoch and hand-off.
  - (h) Knowledge.
  - (i) Show gaps with the ends as units; the clerk; exports.
  - (j) Speed.
  - (k) T-V7-68.
  - Also W83, J-V7.145, the §3.17 Find and combination rows, T-V7-60 (h), V07 §8's V-M3 price and risk (13).
- **G120-V08 — present.** V08 §3.16 (6) (a)–(g) covers:
  - the entries, their words, count and selection;
  - merged, pseudo-class and quarantined records;
  - typing; knowledge;
  - the chip's key and anchor over re-keys;
  - the dossier's other names; the host's surfaces.
  - Also W95, the §2.7 chip lifecycle row, the §3.17 Find row, T-V8-58, J-V8.127 and SF6.
  - Neither part changes the model, the document, its hash or the log.
- **Base and V09 sections for item 120.** Both parts cite base §2.9's `find` key, §8.2's veil and halo rows, §11.2's class counts and V09's panel. None of these is in the text yet (item 120 occurs 0 times in the base and in V09). The other verifiers raise them as F-MISSING against model, rendering, scope and V09.
- **G122-V07, G122-V08, G122h-V08, G125-V08 — absent.** "item 121" – "item 125" occur 0 times in either volume. V08 still reads `HostContext.week` and `HostContext.realm` as inputs: field-table l.645–646, W42, W64, §3.5's dating rungs (l.1768, l.1777), §3.11 (l.1999), §3.15 (l.2262) and §3.16 (4) (l.2354).
- **Items 121, 123 and 124** name neither volume (canon dated rulings J134, J136, J137).

## 4. Issues

### VV78-04 — major — CONFLICT — owner V11 (persists from round 0)
**Claim.** V11 restates what "specified" reads under item 115, and its restatement disagrees with the reading's home:
- V11 W83 (l.229, last column) and V11 §3.25.4's "Specified" bullet (l.4251–4252) read "a dossier-bound record of a `grandClasses` class, or a seigneurial government's forced manor".
- The home, V08 §3.16 (3) (b), and with it J-V8.122, W63, T-V8-53, V08 §3.17's items row and V07 §3.8, admits a dossier government whose `villageSeat` names the manor house, seigneurial or crown (V11 §3.21.1 maps both to `v.manor_house`), at every village rung.
- So a crown HAMLET dossier's manor is specified by V08 and V07, and not by V11.

V11's round-1 repair (VV1112-09) restated V08's pre-round text. V08's repair, which changed it, landed after V11's and handed this off to V11.

**Required change.** In V11 W83's last column and in V11 §3.25.4's "Specified" bullet, cite V08 §3.16 (3) without restating it: "'specified' is V08 §3.16 (3)'s reading". If a gloss is kept, it must read "a dossier-bound record of a `grandClasses` class, or a dossier government whose `villageSeat` names the manor house — seigneurial or crown (V11 §3.21.1)".

### VV78-12 — major — COHESION — owner scope (persists from round 0)
**Claim.** V07 §8's milestones now sum to 30.25–42.5 pw:
- V-M0 1.25–1.75, V-M1 9–11.25, V-M2 7.5–10.75, V-M2u 1–1.5, V-M3 9.5–14.25, V-M4 2–3.
- Round 1 added +0.25 for item 119's one-time waits and +0.25–0.5 for item 120's Find.

But the base and INDEX still carry the old figures:
- §16's staged-milestones row (l.18743), §16's totals table (l.18786) and INDEX §1 (l.30) read 29.75–41.75.
- §16 l.18743 names only "items 111 and 113–118 at the village rungs".
- The staged total (182.5–255.75) and the whole program (408–562.75) omit V07's +0.5–0.75.

V08's 18–24.5 pw agrees everywhere. This is the same defect as verify-scope-r1t VCS-08 and VCS-18.

**Required change.**
- §16 l.18743: "items 111 and 113–120 at the village rungs | 30.25–42.5 pw with V-M0 and V-M2u".
- §16 l.18786: "30.25–42.5".
- INDEX §1's V07 row: "30.25–42.5".
- Re-sum §16's staged total and second total with every round-1 volume price (V07 adds +0.5 / +0.75; VCS-08 lists the others).

### VV78-21 — minor — CONFLICT — owner V07 (re-raised)
**Claim.** V07-RESTATE-1's canon ruling is not applied. It says: "ProductDecl's interface lives in the base (via BCR-V7-11 at §4.12); V07 cites it and states only the 'village' entry's values". The interface is still declared in V07 §2.1, now as `interface ProductDecl extends ProductDeclEpoch`. The base cites it there (§4.12; §14's "V07 §2.1's type").

**Required change.** Either move `interface ProductDecl` (every member and comment) to §4.12 beside `StrategyRegistry.products`, with §14 citing §4.12 and V07 §2.1 keeping only the 'village' entry's values; or the adjudicator rules V07-RESTATE-1 INVALID under item 202's applied text (an f item over a base home, principle (3)). (Ruling requested by V07: see repair-r1-V07.md.)

### VV78-r1-01 — minor — CONFLICT — owner V07 (new)
**Claim.** Two V07 texts restate "specified" (item 115 (c)) more narrowly than its home:
- J-V7.136 says "'specified' meaning a dossier manor or hall record, a dossier government's `villageSeat` naming the manor, or the author's placement".
- W78 (l.274) names "a dossier's manor record or `villageSeat`" as its producer and "a manor or hall record" in its dossier column.

V08 §3.16 (3) (a) counts any dossier-bound record of a `grandClasses` class (V11 §3.25.4: `manor`, `tower_house`, `castle`, `palace`, `v.manor_house`), every placed member of a collective record included. A town class plays itself at a village rung (V07 §3.11 step 3), so a castle or tower-house record at a HAMLET is specified by V08 and not by J-V7.136. V07 §3.8, by contrast, now cites V08 §3.16 (3) correctly.

**Required change.**
- J-V7.136: replace "and 'specified' meaning a dossier manor or hall record, a dossier government's `villageSeat` naming the manor, or the author's placement" with "and 'specified' read as V08 §3.16 (3) reads it, or the author's placement".
- W78's producer column: "a dossier's specification (V08 §3.16 (3))".
- W78's dossier column: "a record of a `grandClasses` class; a government's `villageSeat` manor (V08 §3.16 (3))".

### VV78-r1-02 — minor — BROKEN-REFERENCE — owner V07 (new)
**Claim.** V07 §8 (l.3574), in the paragraph this round extended for items 119 and 120, reads "§16's village line and INDEX §4 carry it (item 568 computes the totals once)". INDEX §4 states no price ("Every milestone's price is its volume's own §8 estimate, and §16 computes the two totals"). The village's price is carried by INDEX §1's product map (l.30).

**Required change.** V07 §8 l.3574: "§16's village line and INDEX §1 carry it". l.3555's "INDEX §4 carry the same slot" stays.

### VV78-r1-03 — minor — CONFLICT — owner V07 (new)
**Claim.** V04's repair (VAL-08) renamed V04's opening record `UnderOpeningRow`. Its hand-off to V07 asked W46 and V07 §3.16 (3) (iii) to read that name, and the hand-off was not closed. V07 W46 (l.242) and V07 §3.16 (3) (iii) (l.2850, in the subsection this round rewrote) still say "`OpeningRow`". In the base, `OpeningRow` is now only the model's opening-hours row (§2.6, l.1365: `dayType`, `openH`, `closeH`). So V07's name points at a different record.

**Required change.** V07 W46 and V07 §3.16 (3) (iii): "`UnderOpeningRow`" (V04 §2.3; its chances V11 §3.23.7).

### G122-V07 — major — F-MISSING — owner V07
**Claim.** File g item 122 (crisis looks; canon dated ruling J134–J136: "V07: the village and smaller rungs") has no V07 part. "item 122" and every crisis look occur 0 times in V07.

**Required change.** Write V07's part at build depth as new design. It covers item 122 (a)–(g) at THORP, HAMLET and VILLAGE:
1. **Scale and sharing.** Each look's scale at the village rungs (item 122 (c): a hamlet gets a war band's camp, never a siege line), and the shared-outskirts priority (siege, quarantine, refugees) under the density cap within the territory frame.
2. **Placement on V07's own features.** Each look of item 122 (b) placed at village scale:
   - siege or raid at an unwalled or palisaded village: blockade camps on the approach roads, torn palisade runs, stake barricades, burned outlying farmsteads;
   - the refugee camp on the common or fallow by the main road's entry, where V07 §3.12's village growth would build;
   - the quarantine camp outside the perimeter, with marked doors in the affected end and a cordon;
   - famine's bare and withered fields, strips and meadow, overriding item 117's crop stage in V07 §5.1, with empty pens and shuttered stalls on the green;
   - a disaster's ruined tofts and ends by its pattern (fire downwind through contiguous tofts; flood on the low ground by the brook; the calamity's `targets`);
   - occupation, rebellion, boom and bust;
   - never on water, a gate's passage, a keep-out or the green's keep-outs.
3. **Hand-over.** The aftermath through V07 §3.12's epoch path, desertion included; the camp at the village growth frontier; reconstruction as Works.
4. **Zoom and families.** The looks at the township view, the district band and finer, in `painterly` and `ink`.
5. **Controls, words and exports.** Show crises and the preview at the village rungs; the village `WhyProvider`'s crisis lines (V07 §4.5); Find's listing (V07 §5.5); exports (V07 §5.4: pictures draw them, VTT in the image only).
6. **Records.**
   - a V07 §3.17 row;
   - a §1b W row;
   - a T-V7 bar for item 122 (g)'s village clauses (hash identical with crises on and off and in every week; each look exactly in its condition's weeks; no-op pin with no condition and no preview);
   - a J-V7 row, the V-M3 price and §1's scope list;
   - the head's owner range to "1–125".

### G122-V08 — major — F-MISSING — owner V08
**Claim.** File g item 122's V08 part ("every stressor type and archetype and the calamities' targets read at the baseline; the closed mapping"; J135) is absent. V08 reads `stressors`, `activeConditions` and `calamityHistory` (with `targets`) only for the conditions row, the threats row and DR28. It writes no crisis-look reading and no closed table.

**Required change.** Write V08's part:
- **Reading.** Every SettlementForge stressor type and every condition archetype, read at the pinned baseline, read-only: war_pressure, famine, plague, regional_migration_pressure, rebellion, occupation, reconstruction, boom, bust, resource_strike, vein_exhausted, the regional_* archetypes, and the simulator's PLAGUE, REFUGEE_WAVE and RAID_OR_MONSTER_ATTACK where the dossier carries them. Also the calamities' `targets`, resolved to binding keys.
- **Closed mapping.** Every type and archetype maps to its look kind or to an explicit "no look", with §7.7's derivation row (determinism's), so nothing falls through. A type the table lacks is noted `unmapped_word` and drawn as no look.
- **Knowledge.** The condition's knowledge admission.
- **Weeks.** Each look's weeks come from the carried `condition` facts' `sinceWeek` and `untilWeek`, with the week taken by item 125 (b).
- **Records.** The field-table rows, a W row, a §2.7 lifecycle row, a V08 §3.17 edge row, a T-V8 bar (every type and archetype has its row; each look shows only in its weeks), a J-V8 row, SF4's content, and the head's range "1–125".

### G122h-V08 — major — F-MISSING — owner V08
**Claim.** Item 122 (h)–(i)'s V08 part ("force, coalition and travelling-group sizes read from the dossier when present, confirmed by item 125 (d)"; J138) is absent. V08 reads no army, coalition or travelling-group size.

**Required change.**
- Read each force's headcount, each coalition's member armies and each travelling group's size from the dossier where present, into the carried facts the crisis look reads (item 122 (h): 45 m² a head, a coalition's armies each their own camp).
- Where absent, read the condition's or calamity's own counts (`exodus`, arrivals), else item 122 (b)'s severity-and-tier scale, the absence reported.
- Name these in-development fields with their fallback for the final local check (item 125 (d)).
- Add the field-table rows, a W row, a T-V8 clause and a J-V8 row.

### G125-V08 — major — F-MISSING — owner V08
**Claim.** Item 125's V08 part is absent (J139: "every digest row with its fallback column; `HostContext.week` and `.realm` retired as inputs; the week from the dossier's ticks; the final local check's brief"):
- V08 still reads `HostContext.week` and `HostContext.realm` as inputs: field table l.645–646; W42's `realmBlockFrom`; W64; §3.5's dating rungs (l.1768, l.1777); §3.11 (l.1999); §3.15 (l.2262); §3.16 (4)'s week (l.2354); §2.3's `history.atWeek` (l.515); §2.7's view row (l.1265).
- The field table has no fallback column.
- V08 writes no brief for the final check.
- V08 §3.16 (4) and (6) (g) say no host message sets the frame's view but `view.set { week }`. Item 125 (c) keeps the embedding API's view commands (a week, a layer, a selection) as commands, never inputs.

**Required change.**
1. Retire `HostContext.week` and `HostContext.realm` as inputs at every site listed above:
   - the week is the dossier's latest stamped tick (conditions' `triggeredAt`, the calamities' and history's ticks), else the user's season control (standalone midsummer);
   - the climate is the dossier's terrain with item 117 (d)'s rows;
   - latitude, realm placement and neighbours' bearings are the generator's defaults or the user's settings.
2. Give every field-table row a standalone-fallback column: the generator's own choice, reported.
3. Re-read V08 §3.16 (4) and (6) (g) under item 125 (c): view commands are commands; Find's chips are set by no host command.
4. State how `HostContext.line` and `HostContext.customLibrary` stand under item 125 (a) and (e). (e) requires the identical document and hash with and without a host context, and the library's admitted fields today become carried `custom-def` facts.
5. Write the final local check's brief (item 125 (d)): every path the port reads, its expected shape and values, its fallback, and the in-development fields to look for (item 122 (h)'s forces, coalitions and travelling groups; a current-week stamp).
6. Add T-V8 bars for item 125 (e):
   - a dossier with only the required keys generates a full map, each absent field reported with its fallback;
   - the identical document and hash with and without a host context;
   - a static check that the adapter reads only the dossier.
7. Add a J-V8 row, and set the head's range to "1–125".
