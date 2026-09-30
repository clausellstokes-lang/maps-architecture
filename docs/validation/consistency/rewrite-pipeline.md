# Rewrite — pipeline part (§4 generation pipeline, §10 simulation and content, PART II stage 2, PART III village readiness)

> Fable-reviewed 2026-09-26: CORRECTED — docs/validation/consistency/validate.md

Status: COMPLETE (2026-09-26). Lane key `consistency/rewrite-pipeline`. Inputs read in full: the part's text in
`docs/ARCHITECTURE.md` (l. 3353–5024, 8203–8396, 10770–11073), `inventory-pipeline.md/.json`, `canon.md` (home rules, every
conflict touching this part, the Part PIPELINE section, the routing table, the gaps, the judgment index and detail gaps) and
`canon.json` (facts, `by_inventory_id`), the section headings of every other part, `docs/OWNER-INSTRUCTIONS-2026-09-25.md`,
`docs/DEFINITION.md`, and NP5-1…NP5-4 and VD5-6 in `docs/validation/fix-all/still-open-r5.json` with their verify rows in
`r5-verify-pipeline.md` and `r5-verify-determinism.md`.

## 1. Outcome

The part is rewritten as ten section files in `docs/validation/consistency/new/pipeline/`, each starting with its
heading line exactly as it stands today. Every one of the 449 inventory items is mapped (§6); none is lost. Every fact the
canon homes here is stated once, with its value; every restatement of another part's fact is a pointer; the 13 conflicts
routed to this part are resolved as the canon rules; the five routed open items (NP5-1, NP5-2, NP5-3 (a), VD5-6 and the
pipeline half of VS5-2) are fixed; NP5-4 needs no text here (no sentence of this part names the composition's `Tower`,
`Room` or `Porch`; the §2.6 edit is the model rewriter's). One further disagreement the canon did not list was found and
resolved by the canonical home (NEW-PIPE-1, §4). All 23 per-section review markers, all fix-round ids, the round narration
and 29 inline judgment passages are gone; the passages are kept verbatim in §9 for the rationale file.

**Size.** The part is 237 257 bytes today and 201 011 bytes after (85 %; the kernel part, also home-heavy, landed at 75 %). The part is dense normative content — algorithm steps,
tables, interfaces, numbers and tests — so its reduction comes from the review markers (≈ 4.6 KB), the inline rationale
(≈ 18 KB), the round and fix-id narration, and the restatements now reduced to pointers; cutting further would drop
facts or their calibration anchors. The document-wide 55–65 % target is carried by the parts whose bulk is history and
rationale (§0's round records, the Judgment-calls section moving to the rationale file). Recorded, not hidden.

| section file | heading placed by | bytes before | bytes after |
|---|---|---|---|
| `01-s4-generation-pipeline.md` | `## §4 Generation pipeline` | 186 779 | 155 954 (83 %) |
| `02-s10-simulation-and-content.md` | `## §10 Simulation and content layer (FTG parity, with restraint)` | 19 225 | 16 998 (88 %) |
| `03-part-ii.md` | `# PART II — STAGE 2: …` (intro only) | 825 | 851 |
| `04-ii1-district-neighbourhood-interface.md` | `## II.1 …` | 12 100 | 10 477 |
| `05-ii2-templates-as-fabric-strategies.md` | `## II.2 …` | 2 689 | 2 488 |
| `06-ii3-block-content-dispatch.md` | `## II.3 …` | 1 376 | 1 287 |
| `07-ii4-render-tier-workflow-persistence.md` | `## II.4 …` | 3 411 | 2 785 |
| `08-ii5-base-carries-for-stage-2.md` | `## II.5 …` | 2 586 | 2 463 |
| `09-ii6-staged-layers.md` | `## II.6 …` | 3 978 | 3 599 |
| `10-part-iii-village.md` | `# PART III — …` | 4 289 | 4 109 |
| **total** | | **237 257** | **201 011 (85 %)** |

**Numbering.** Every subsection number other parts cite is kept: §4.1–§4.12, §10.1–§10.4, II.1–II.6; S1 (1)–(10); S3 1–13;
§4.5 S7b 1–5; §4.6 steps 1–11; §4.7 S10 (0)–(10); §4.11 batches 1–4; II.1 rules (1)–(6). Nothing is renumbered.

**Heading renames for the assembler (CF-PIPE-08).** The files start with today's headings so they can be placed; after
placing, replace two headings so `S<n>` names only pipeline stages:

| today | becomes |
|---|---|
| `## II.3 Block content dispatch, pins, local identities (S2 context features)` | `## II.3 Block content dispatch, pins, local identities (stage-2 feature S2: context features)` |
| `## II.4 The render tier, the workflow and the close-up's persistence status (S5, S6)` | `## II.4 The render tier, the workflow and the close-up's persistence status (stage-2 features S5, S6)` |

## 2. Open items fixed

| item | where | how |
|---|---|---|
| NP5-1 (this part's half) | §4.1 batch table, S11 row | "a row's party wall is the plot's shared L3 side line carrying the `party_wall` rows, §4.7" (was "one shared L4 edge"); §4.7 S10 and S11 already agree. The §2.6 rule (1) edit is the model rewriter's (canon routing). |
| NP5-2 | §4.1 S5 row and L0-writer sentence; §4.2 S1 (5); §4.3 decks and Result; §4.4 S5b | Canon ruling CF-PIPE-10 (option 1): S5b routes with S4's router under S4's F-ROUTE ladder, extra-bridge rung included; S5 row "k ≥ 2 — S5b L0, only when F-ROUTE's extra-bridge rung fires on standing water: two same-level shore splits before S5b's L1 batch"; L0 writers "S1, S3, S4 and S5b (F-ROUTE's extra bridge only) and S5a"; the standing-water list of S1 (5) adds "in S5b at stages k ≥ 2 and in every epoch". Companions: §5.2 F-ROUTE "where" (determinism), J-I18 (scope) — §8 notes D-1, S-1. |
| NP5-3 (a) | §10.4 | "re-draws exactly the unedited names drawn from that field, listed for confirmation (§6.3 case (4)), and never the row's other names", with the slice rule a pointer to §7.6. (b) is §7.4's (determinism). |
| NP5-4 | — | Verified by search: no text of this part names `Tower`, `Room`, `Porch` or the composition's carried set; nothing to change here. |
| VD5-6 | §10.4 | Both retention sentences are now pointers to §2.9's pack-set rule (CF-PIPE-06; canon routing chose the pointer over restating the corrected sentence). |
| VS5-2 (pipeline half) | II.2; PART II intro; II.1 `NeighbourhoodRequest` comment | "The `area` template is the base's own bent-cut fabric (`FabricStrategyId` `bent-cut`, §4.6), the default, opened as a `refine` close-up." |

GAP-1 (the branch re-join constant k): as the canon rules, this part states no value; the validator lists it.

## 3. Conflicts resolved (the canonical home wins unless the canon ruled otherwise)

| conflict | resolution in the new text |
|---|---|
| CF-PIPE-01 | §4.1 "Why this order" (c): S3 reserves only §4.2 S3 (12)'s list; "large institutions" are S7b claims (§4.5 S7b (3)). |
| CF-PIPE-02 | §4.1: "Each stage registers a `StageDecl` (§4.12)"; the op-form assignment stays; `StageDecl.txForm` comment points back. |
| CF-PIPE-03 | §4.1 S11 row corrected (with NP5-1). |
| CF-PIPE-04 | §4.7 S10b: placement never gives up *silently*; what it cannot place goes to F-SITING, whose last rung reduces the manifest (lowest-priority classes first) and reports it; §10.2 points to §4.7 S10b and F-SITING. |
| CF-PIPE-05 | §4.1, §4.10, §10.4: "drawn only in §6.3's cases". |
| CF-PIPE-06 | §10.4: pointers to §2.9's pack set (VD5-6). |
| CF-PIPE-07 | PART II intro and II.2: `area` = bent-cut (VS5-2). |
| CF-PIPE-08 | "stage-2 feature S1/S2/S4/S5/S6" in II.1–II.5 text; the two headings are renamed by the assembler (table above). |
| CF-PIPE-09 | II.6: "an outline template of §4.2 S1 (2)". |
| CF-PIPE-10 | NP5-2 above. |
| KERNEL-C12 | §4.1: "Static index partitions are rebuilt as §3.3 states" (no "only at stage end"). |
| MODEL-C11 | §4.2 S1 (5) bullet "A deck placed before its water exists" is the canonical list: a carve's kept way, an outer moat's arterial (a carve, §4.4), a kept way of S1's water operator, and a deck F-ROUTE's rung sites inside one of these. |
| CANON-C05 | Each mechanism a §12.4 budget assumes is stated once in its stage section (§4.2 S1 (1)/(3), §4.5 Fields, §4.7 S10b, §4.9 split), marked "*Mechanism (budget: §12.4)*"; S10b's "one linear distance transform per class" was unioned from §12.4. |
| MODEL-C04 (alignment only) | §4.8 names the surround row as `Castle.surround` (esplanade, park with perimeter path, plaza, cliff skirt, or none) and the moat as `Castle.moat`. |
| DETERMINISM-C-5, CANON-C09, SCOPE-C09 | Unchanged here: §4.2 S1 (5) is already the canonical deck/snap rule; §4.7 S11 points to §13.5 for FTG's entrance distance; the plot-width floor and bar are two facts. |

## 4. New disagreement found (not in the canon) — NEW-PIPE-1

`sea_wall` water gates. §4.4 S5a (the canonical home of the waterfront fact, PIPELINE-165) and §4.8 (PIPELINE-288) say
that under a `quay_wall` **or** `sea_wall` waterfront a water gate stands at every quay access, so every quay stays reachable;
§2.7 "Open traces and the waterfront" (MODEL-308, l. 1621) says `sea_wall` is "a full wall with water gates only at the
harbour mouth". Resolved by the canonical home: the new §4.4 S5a states "`quay_wall` (a wall along the waterfront) or
`sea_wall` (a full wall); under either wall a water gate stands at every quay access". Confidence: CONFIRMED that the texts
disagree; PLAUSIBLE that the home's reading is the intended design. The model rewriter should make §2.7's bullet a
pointer to §4.4 S5a (note M-1). **Fable should re-check this first.**

## 5. Moves

* **MOVE IN:** MODEL-164 → §4.2 S1 (3) (carve bed monotone to the outfall, no repeated flood; D8 on the carved corridor and
  neighbours, accumulation once, ≈ 2 ms at CITY). MODEL-167 → §4.2 S1 (1) (`datumCm`: sea level on a coastal site, the base
  elevation otherwise; 3 000 m relief ordinary).
* **MOVE OUT:** PIPELINE-017 (F-CUT's substitution rung reads the allocation) → §5.2; PIPELINE-228 (M0 (b)'s face set) →
  §16. Both are pointers here now.
* **Unions at the home (canon rule R13)** — details another part's restatement carried, now stated here: MODEL-170 (flat
  resolution, lake typing) → §4.2 S1 (3); MODEL-315 ("not drawn, named, labelled or exported") and MODEL-316 ("every bridge
  has one structure") → §4.2 S1 (5); MODEL-308 (anchors on shore, bank, cliff or another enceinte; the enclosed / sealed
  test) and MODEL-129 (§3.3 rule 3 promotion) → §4.4 S5a; MODEL-213 (`setAttr` re-derives every block whose band changes) →
  §4.5; KERNEL-236 (each rung under an operation-count limit) → §4.6 step 8; MODEL-334 (decline kinds by hand; a ruined
  building's drawing; the engine's rule table) → §4.11; KERNEL-122 ("a carve costs its footprint, not the town") → §4.11
  batch (4); DETERMINISM-053 (0 ways through reservations; MFCG's census baseline) → §4.8 castle acceptance;
  F-BUDGET-STAGE's "on ≥ 95 % of seeds" → §4.4 S5d; RENDERING-467 ("logs no event") → §10.3; §12.4's distance-transform
  mechanism → §4.7 S10b.

## 6. Mapping table — every inventory id of this part

"now" names where the item lives after the rewrite. A plain section anchor means the item is stated there once (its
canonical home, numbering unchanged). "referenced to §x (FACT)" means the item restated a fact homed in another part and is
now a pointer to it (the canon's REFERENCE list). "rationale → J-x" means the "because" text left for
`docs/ARCHITECTURE-RATIONALE.md` and "(J-x)" was left beside the rule. The ten internal conflicts follow the items.

| inventory id | kind | stated today at | now |
|---|---|---|---|
| PIPELINE-001 | rule | §4 intro | §4 intro |
| PIPELINE-002 | mechanism | §4.1 | §4.1 |
| PIPELINE-003 | interface | §4.1 | §4.12 `StageDecl` (the field list); §4.1 now reads "each stage registers a `StageDecl` (§4.12)" and keeps the op-form assignment (CF-PIPE-02) |
| PIPELINE-004 | rule | §4.1 | §4.1 |
| PIPELINE-005 | rule | §4.1 | §4.1 |
| PIPELINE-006 | rule | §4.1 | §4.1 |
| PIPELINE-007 | rule | §4.1 | §4.1 |
| PIPELINE-008 | rule | §4.1 | §4.1 "Why this order" (a) |
| PIPELINE-009 | rule | §4.1 | §4.1 "Why this order" (b) |
| PIPELINE-010 | rule | §4.1 | §4.1 "Why this order" (c) — "large institutions" are now S7b claims, pointer to §4.2 S3 (12) and §4.5 S7b (3) (CF-PIPE-01) |
| PIPELINE-011 | rule | §4.1 | §4.1 "Why this order" (d); the construction itself §4.2 S3 intro and (4)–(10) |
| PIPELINE-012 | rule | §4.1 | §4.1 "Why this order" (e) |
| PIPELINE-013 | rule | §4.1 | §4.1 laziness contract |
| PIPELINE-014 | rule | §4.1 | §4.1 laziness contract |
| PIPELINE-015 | rule | §4.1 | §4.1 laziness contract |
| PIPELINE-016 | rule | §4.1 | §4.1 laziness contract |
| PIPELINE-017 | rule | §4.1 | referenced to §5.2 F-CUT (moved out; §4.6 step 8 (d) reads the allocation's pending claims) |
| PIPELINE-018 | rule | §4.1 | referenced to §6.3 (DETERMINISM-224) |
| PIPELINE-019 | rule | §4.1 | referenced to §9.1 (RENDERING-330) |
| PIPELINE-020 | rule | §4.1 | §4.1 one-click first paint |
| PIPELINE-021 | rule | §4.1 | §4.1 one-click first paint |
| PIPELINE-022 | budget | §4.1 | referenced to §12.5 (RENDERING-538) |
| PIPELINE-023 | rule | §4.1 | referenced to §6.2 (DETERMINISM-597) |
| PIPELINE-024 | test | §4.1 | referenced to §6.5 (9) (DETERMINISM-293) |
| PIPELINE-025 | rule | §4.1 | referenced to §3.3 (KERNEL-103) |
| PIPELINE-026 | mechanism | §4.1 | §4.1 batch table, S1 row |
| PIPELINE-027 | mechanism | §4.1 | §4.1 batch table, S3 row |
| PIPELINE-028 | mechanism | §4.1 | §4.1 batch table, S4 row (NP5-2 context: S5b row added beside it) |
| PIPELINE-029 | mechanism | §4.1 | §4.1 batch table, S5 row — adds "k ≥ 2 — S5b L0 … two same-level shore splits before S5b's L1 batch" (NP5-2, CF-PIPE-10) |
| PIPELINE-030 | mechanism | §4.1 | §4.1 batch table, S6 row |
| PIPELINE-031 | mechanism | §4.1 | §4.1 batch table, S7 row |
| PIPELINE-032 | mechanism | §4.1 | §4.1 batch table, S7b row and S12a/S10a/S10b row |
| PIPELINE-033 | mechanism | §4.1 | §4.1 batch table, S8 and S9 rows |
| PIPELINE-034 | mechanism | §4.1 | §4.1 batch table, S10 row (step (0) contents point to §4.7 S10 (0)) |
| PIPELINE-035 | mechanism | §4.1 | §4.1 batch table, S11 row — corrected: "a row's party wall is the plot's shared L3 side line carrying the `party_wall` rows, §4.7" (NP5-1, CF-PIPE-03) |
| PIPELINE-036 | mechanism | §4.1 | §4.1 batch table, S12b row + the carry sentence under the table |
| PIPELINE-037 | mechanism | §4.1 | referenced to §7.3 (section restatement) |
| PIPELINE-038 | rule | §4.1 | §4.1 sentence under the batch table — L0 writers now "S1, S3, S4 and S5b (F-ROUTE's extra bridge only) and S5a" (NP5-2, CF-PIPE-10) |
| PIPELINE-039 | decision | §4.1 | rationale → J-P46 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P46)" left at §4.1 |
| PIPELINE-040 | rule | §4.1 | §4.1 sentence under the batch table |
| PIPELINE-041 | rule | §4.1 | referenced to §3.3 step 1 (KERNEL-138) |
| PIPELINE-042 | rule | §4.1 | referenced to §5.1 (5) (DETERMINISM-015) |
| PIPELINE-043 | mechanism | §4.1 | referenced to §8.9 (RENDERING-241) |
| PIPELINE-044 | mechanism | §4.1 | §4.1 workers bullet |
| PIPELINE-045 | rule | §4.1 | §4.1 workers bullet |
| PIPELINE-046 | mechanism | §4.1 | §4.1 workers bullet (hinterland unit) |
| PIPELINE-047 | rule | §4.1 | §4.1 workers bullet |
| PIPELINE-048 | measurement | §4.1 | referenced to §12.3 (RENDERING-509) |
| PIPELINE-049 | fallback | §4.1 | referenced to §12.3 (RENDERING-500) |
| PIPELINE-050 | decision | §4.1 | rationale → J-P10 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P10)" left at §4.1 |
| PIPELINE-051 | decision | §4.1 | rationale → J-P27 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P27)" left at §4.1 |
| PIPELINE-052 | type | §4.2 S0 | §4.2 S0 |
| PIPELINE-053 | rule | §4.2 S0 | referenced to §7.7 (1) (DETERMINISM-564) |
| PIPELINE-054 | rule | §4.2 S0 | referenced to §7.7 (DETERMINISM-575) |
| PIPELINE-055 | rule | §4.2 S0 | referenced to §1.1 (SCOPE-063) |
| PIPELINE-056 | mechanism | §4.2 S0 | §4.2 S0 |
| PIPELINE-057 | rule | §4.2 S0 | §4.2 S0 |
| PIPELINE-058 | mechanism | §4.2 S1 (1) | §4.2 S1 (1) |
| PIPELINE-059 | number | §4.2 S1 (1) | §4.2 S1 (1) |
| PIPELINE-060 | mechanism | §4.2 S1 (2) | §4.2 S1 (2) |
| PIPELINE-061 | mechanism | §4.2 S1 (2) | §4.2 S1 (2) |
| PIPELINE-062 | rule | §4.2 S1 (2) | §4.2 S1 (2) |
| PIPELINE-063 | rule | §4.2 S1 (2) | §4.2 S1 (2) |
| PIPELINE-064 | test | §4.2 S1 (2) | referenced to §13.2 (SCOPE-183) |
| PIPELINE-065 | rule | §4.2 S1 (2) | §4.2 S1 (2) |
| PIPELINE-066 | rule | §4.2 S1 (2) | referenced to §8.2; the clip-to-land rule (GEO-14) kept at §4.2 S1 (2) with the pointer |
| PIPELINE-067 | mechanism | §4.2 S1 (2) | §4.2 S1 (2) |
| PIPELINE-068 | mechanism | §4.2 S1 (2) | §4.2 S1 (2) |
| PIPELINE-069 | mechanism | §4.2 S1 (3) | §4.2 S1 (3) (flat resolution and lake typing unioned from §2.3) |
| PIPELINE-070 | mechanism | §4.2 S1 (3) | §4.2 S1 (3) |
| PIPELINE-071 | number | §4.2 S1 (3) | §4.2 S1 (3) |
| PIPELINE-072 | rule | §4.2 S1 (3) | §4.2 S1 (3) |
| PIPELINE-073 | number | §4.2 S1 (3) | §4.2 S1 (3) |
| PIPELINE-074 | mechanism | §4.2 S1 (3) | §4.2 S1 (3) |
| PIPELINE-075 | rule | §4.2 S1 (4) | §4.2 S1 (4) |
| PIPELINE-076 | interface | §4.2 S1 (5) | §4.2 S1 (5) |
| PIPELINE-077 | number | §4.2 S1 (5) | §4.2 S1 (5) |
| PIPELINE-078 | rule | §4.2 S1 (5) | §4.2 S1 (5) |
| PIPELINE-079 | rule | §4.2 S1 (5) | §4.2 S1 (5) |
| PIPELINE-080 | rule | §4.2 S1 (5) | §4.2 S1 (5) bullet "A site no way uses" ("not drawn, named, labelled or exported" unioned from §2.7) |
| PIPELINE-081 | rule | §4.2 S1 (5) | §4.2 S1 (5) |
| PIPELINE-082 | rule | §4.2 S1 (5) | §4.2 S1 (5) bullet "A deck where no site stands" — standing-water list adds S5b (NP5-2); "every bridge has one structure" unioned |
| PIPELINE-083 | rule | §4.2 S1 (5) | §4.2 S1 (5) bullet "A deck placed before its water exists" — now the canonical list (carve, outer moat as a carve, S1's water operator, F-ROUTE's rung inside them; MODEL-C11) |
| PIPELINE-084 | mechanism | §4.2 S1 (6) | §4.2 S1 (6) |
| PIPELINE-085 | rule | §4.2 S1 (7) | §4.2 S1 (7) |
| PIPELINE-086 | rule | §4.2 S1 (8) | §4.2 S1 (8) |
| PIPELINE-087 | number | §4.2 S1 (8) | §4.2 S1 (8) |
| PIPELINE-088 | mechanism | §4.2 S1 (9)-(10) | §4.2 S1 (9)-(10) |
| PIPELINE-089 | rule | §4.2 S1 | referenced to §5.2 F-RIVER; "restart-free" sentence kept at §4.2 S1 with the pointer |
| PIPELINE-090 | mechanism | §4.2 S2 | §4.2 S2 |
| PIPELINE-091 | rule | §4.2 S2 | §4.2 S2 |
| PIPELINE-092 | rule | §4.2 S2 | §4.2 S2 |
| PIPELINE-093 | rule | §4.2 S2 | §4.2 S2 |
| PIPELINE-094 | number | §4.2 S2 | §4.2 S2 |
| PIPELINE-095 | decision | §4.2 S2 | rationale → J-P6 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P6)" left at §4.2 S2 |
| PIPELINE-096 | measurement | §4.2 S2 | §4.2 S2 |
| PIPELINE-097 | number | §4.2 S2 | §4.2 S2 |
| PIPELINE-098 | decision | §4.2 S2 | rationale → J-P5 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P5)" left at §4.2 S2 |
| PIPELINE-099 | type | §4.2 S2 | §4.2 S2 |
| PIPELINE-100 | rule | §4.2 S3 | §4.2 S3 |
| PIPELINE-101 | mechanism | §4.2 S3 (1) | §4.2 S3 (1) |
| PIPELINE-102 | mechanism | §4.2 S3 (1) | §4.2 S3 (1) |
| PIPELINE-103 | rule | §4.2 S3 (1) | §4.2 S3 (1) |
| PIPELINE-104 | number | §4.2 S3 (2) | §4.2 S3 (2) |
| PIPELINE-105 | rule | §4.2 S3 (2) | §4.2 S3 (2) |
| PIPELINE-106 | number | §4.2 S3 (2) | §4.2 S3 (2) |
| PIPELINE-107 | rule | §4.2 S3 (3) | §4.2 S3 (3) |
| PIPELINE-108 | rule | §4.2 S3 (4) | §4.2 S3 (4) |
| PIPELINE-109 | mechanism | §4.2 S3 (4) | §4.2 S3 (4) |
| PIPELINE-110 | rule | §4.2 S3 (4) | §4.2 S3 (4) |
| PIPELINE-111 | rule | §4.2 S3 (4) | §4.2 S3 (4) |
| PIPELINE-112 | measurement | §4.2 S3 (4) | §4.2 S3 (4) |
| PIPELINE-113 | rule | §4.2 S3 (4) | §4.2 S3 (4) |
| PIPELINE-114 | mechanism | §4.2 S3 (5) | §4.2 S3 (5) |
| PIPELINE-115 | mechanism | §4.2 S3 (6) | §4.2 S3 (6) |
| PIPELINE-116 | rule | §4.2 S3 (6) | §4.2 S3 (6) |
| PIPELINE-117 | rule | §4.2 S3 (7) | §4.2 S3 (7) |
| PIPELINE-118 | rule | §4.2 S3 (7) | §4.2 S3 (7) |
| PIPELINE-119 | rule | §4.2 S3 (7) | §4.2 S3 (7) |
| PIPELINE-120 | mechanism | §4.2 S3 (8) | §4.2 S3 (8) |
| PIPELINE-121 | rule | §4.2 S3 (8) | §4.2 S3 (8) |
| PIPELINE-122 | mechanism | §4.2 S3 (9) | §4.2 S3 (9) |
| PIPELINE-123 | test | §4.2 S3 (9) | §4.2 S3 (9) |
| PIPELINE-124 | evidence | §4.2 S3 (9) | dropped (history; validation record) — one receipt pointer kept at §4.2 S3 (9) |
| PIPELINE-125 | mechanism | §4.2 S3 (10) | §4.2 S3 (10) |
| PIPELINE-126 | number | §4.2 S3 (10) | §4.2 S3 (10) |
| PIPELINE-127 | number | §4.2 S3 (10) | §4.2 S3 (10) |
| PIPELINE-128 | rule | §4.2 S3 (10) | §4.2 S3 (10) |
| PIPELINE-129 | number | §4.2 S3 (10) | §4.2 S3 (10) |
| PIPELINE-130 | mechanism | §4.2 S3 (11) | §4.2 S3 (11) |
| PIPELINE-131 | test | §4.2 S3 (11) | referenced to §13.2 (SCOPE-191) |
| PIPELINE-132 | rule | §4.2 S3 (12) | §4.2 S3 (12) |
| PIPELINE-133 | term | §4.2 S3 (13) | §4.2 S3 (13) |
| PIPELINE-134 | rule | §4.2 S3 (13) | §4.2 S3 (13) |
| PIPELINE-135 | decision | §4.2 | rationale → J-P26 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P26)" left at §4.2 |
| PIPELINE-136 | decision | §4.2 | rationale → J-P35 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P35)" left at §4.2 |
| PIPELINE-137 | decision | §4.2 | rationale → J-P44 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P44)" left at §4.2 |
| PIPELINE-138 | decision | §4.2 | rationale → J-P45 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P45)" left at §4.2 |
| PIPELINE-139 | decision | §4.2 | rationale → J-P36 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P36)" left at §4.2 |
| PIPELINE-140 | rule | §4.3 | §4.3 |
| PIPELINE-141 | mechanism | §4.3 | §4.3 |
| PIPELINE-142 | rule | §4.3 | §4.3 |
| PIPELINE-143 | rule | §4.3 | §4.3 |
| PIPELINE-144 | rule | §4.3 | §4.3 |
| PIPELINE-145 | rule | §4.3 | §4.3 |
| PIPELINE-146 | rule | §4.3 | §4.3 |
| PIPELINE-147 | rule | §4.3 | §4.3 |
| PIPELINE-148 | mechanism | §4.3 | §4.3 |
| PIPELINE-149 | rule | §4.3 | §4.3 |
| PIPELINE-150 | rule | §4.3 | §4.3 |
| PIPELINE-151 | rule | §4.3 | referenced to §5.2 F-ROUTE; "decks are fixed graph edges" kept at §4.3 |
| PIPELINE-152 | rule | §4.3 | §4.3 |
| PIPELINE-153 | test | §4.3 | §4.3 |
| PIPELINE-154 | rule | §4.3 | §4.3 |
| PIPELINE-155 | mechanism | §4.3 | referenced to §7.3 operator table (DETERMINISM-412) |
| PIPELINE-156 | rule | §4.4 | §4.4 |
| PIPELINE-157 | mechanism | §4.4 S5a | §4.4 S5a |
| PIPELINE-158 | number | §4.4 S5a | §4.4 S5a |
| PIPELINE-159 | rule | §4.4 S5a | §4.4 S5a |
| PIPELINE-160 | rule | §4.4 S5a | §4.4 S5a |
| PIPELINE-161 | test | §4.4 S5a | referenced to §13.5 (B-REF anisotropy row); calibration target kept at §4.4 S5a |
| PIPELINE-162 | mechanism | §4.4 S5a | §4.4 S5a |
| PIPELINE-163 | rule | §4.4 S5a | §4.4 S5a |
| PIPELINE-164 | rule | §4.4 S5a | §4.4 S5a "Water and the waterfront" (§3.3 rule 3 promotion unioned) |
| PIPELINE-165 | rule | §4.4 S5a | §4.4 S5a "Water and the waterfront" (anchoring on shore/bank/cliff/enceinte and the enclosed/sealed test unioned from §2.7; `sea_wall` quay-access gates — NEW-PIPE-1) |
| PIPELINE-166 | rule | §4.4 S5a | §4.4 S5a |
| PIPELINE-167 | rule | §4.4 S5a | referenced to §5.2 F-WALL; the pull cap kept at §4.4 S5a |
| PIPELINE-168 | mechanism | §4.4 S5a | §4.4 S5a |
| PIPELINE-169 | rule | §4.4 S5b | §4.4 S5b — routes under S4's F-ROUTE ladder incl. extra bridge; L0 batch before its L1 batch (NP5-2) |
| PIPELINE-170 | rule | §4.4 S5b | §4.4 S5b |
| PIPELINE-171 | test | §4.4 S5b | §4.4 S5b |
| PIPELINE-172 | mechanism | §4.4 S5c | §4.4 S5c |
| PIPELINE-173 | rule | §4.4 S5c | §4.4 S5c |
| PIPELINE-174 | acceptance | §4.4 S5c | referenced to §13.5 table (SCOPE-263) |
| PIPELINE-175 | decision | §4.4 S5c | rationale → J-P4 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P4)" left at §4.4 S5c |
| PIPELINE-176 | mechanism | §4.4 S5c | §4.4 S5c |
| PIPELINE-177 | evidence | §4.4 S5c | §4.4 S5c |
| PIPELINE-178 | rule | §4.4 S5c | §4.4 S5c |
| PIPELINE-179 | rule | §4.4 S5c | §4.4 S5c |
| PIPELINE-180 | rule | §4.4 S5c | §4.4 S5c |
| PIPELINE-181 | rule | §4.4 S5c | §4.4 S5c |
| PIPELINE-182 | rule | §4.4 S5c | §4.4 S5c |
| PIPELINE-183 | number | §4.4 S5c | §4.4 S5c |
| PIPELINE-184 | rule | §4.4 S5c | §4.4 S5c |
| PIPELINE-185 | mechanism | §4.4 S5d | §4.4 S5d |
| PIPELINE-186 | rule | §4.4 S5d | §4.4 S5d |
| PIPELINE-187 | test | §4.4 S5d | §4.4 S5d test ("on ≥ 95 % of seeds" unioned from §5.2 F-BUDGET-STAGE) |
| PIPELINE-188 | number | §4.4 table | §4.4 table |
| PIPELINE-189 | rule | §4.4 table | §4.4 table |
| PIPELINE-190 | test | §4.4 table | §4.4 table |
| PIPELINE-191 | decision | §4.4 | rationale → J-P4 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P4)" left at §4.4 |
| PIPELINE-192 | acceptance | §4.4 | §4.4 |
| PIPELINE-193 | fallback | §4.4 | §4.4 |
| PIPELINE-194 | rule | §4.5 | §4.5 |
| PIPELINE-195 | rule | §4.5 | §4.5 "Perimeter and margin band" — the margin band's one statement (perimeter and shared reservation boundaries); §4.1 and §4.7 S10 (0) point here |
| PIPELINE-196 | mechanism | §4.5 | §4.5 |
| PIPELINE-197 | rule | §4.5 | §4.5 |
| PIPELINE-198 | rule | §4.5 | referenced to §2.5 (section restatement) |
| PIPELINE-199 | mechanism | §4.5 | §4.5 Quarters |
| PIPELINE-200 | rule | §4.5 | §4.5 Quarters (receipts kept as pointers) |
| PIPELINE-201 | evidence | §4.5 | dropped (history; validation record) — receipts kept at §4.5 Quarters |
| PIPELINE-202 | rule | §4.5 | referenced to §9.4; "S13a names every node of the tree" kept at §4.5 Quarters |
| PIPELINE-203 | decision | §4.5 | rationale → J-P28 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P28)" left at §4.5 |
| PIPELINE-204 | decision | §4.5 | rationale → J-P2 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P2)" left at §4.5 |
| PIPELINE-205 | rule | §4.5 | §4.5 |
| PIPELINE-206 | rule | §4.5 | §4.5 |
| PIPELINE-207 | mechanism | §4.5 | §4.5 |
| PIPELINE-208 | number | §4.5 | §4.5 |
| PIPELINE-209 | rule | §4.5 | §4.5 |
| PIPELINE-210 | rule | §4.5 | §4.5 Fields, Bands bullet ("`setAttr` … re-derives every block whose band changes" unioned from §2.5) |
| PIPELINE-211 | rule | §4.5 | referenced to §7.2; "a field brush never moves FieldBands" kept at §4.5 Bands |
| PIPELINE-212 | rule | §4.5 | §4.5 |
| PIPELINE-213 | rule | §4.5 | §4.5 |
| PIPELINE-214 | rule | §4.5 | §4.5 |
| PIPELINE-215 | rule | §4.5 S7b | §4.5 S7b |
| PIPELINE-216 | mechanism | §4.5 S7b (1) | §4.5 S7b (1) |
| PIPELINE-217 | rule | §4.5 S7b (2) | §4.5 S7b (2) |
| PIPELINE-218 | rule | §4.5 S7b (3) | §4.5 S7b (3) |
| PIPELINE-219 | rule | §4.5 S7b (3) | §4.5 S7b (3) |
| PIPELINE-220 | decision | §4.5 S7b (3) | rationale → J-P41 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P41)" left at §4.5 S7b (3) |
| PIPELINE-221 | test | §4.5 S7b (3) | §4.5 S7b (3) |
| PIPELINE-222 | rule | §4.5 S7b (4) | §4.5 S7b (4) |
| PIPELINE-223 | rule | §4.5 S7b (5) | §4.5 S7b (5) |
| PIPELINE-224 | rule | §4.6 | §4.6 |
| PIPELINE-225 | rule | §4.6 | §4.6 |
| PIPELINE-226 | test | §4.6 | §4.6 |
| PIPELINE-227 | rule | §4.6 | §4.6 |
| PIPELINE-228 | test | §4.6 | referenced to §16 M0 (b) (moved out; §4.6 "Sides" points) |
| PIPELINE-229 | rule | §4.6 (1) | §4.6 (1) |
| PIPELINE-230 | number | §4.6 (2) | §4.6 (2) |
| PIPELINE-231 | rule | §4.6 (3) | §4.6 (3) |
| PIPELINE-232 | rule | §4.6 (4) | §4.6 (4) |
| PIPELINE-233 | measurement | §4.6 (4) | §4.6 (4) |
| PIPELINE-234 | rule | §4.6 (5) | §4.6 (5) |
| PIPELINE-235 | number | §4.6 (6) | §4.6 (6) |
| PIPELINE-236 | rule | §4.6 (7) | §4.6 (7) |
| PIPELINE-237 | rule | §4.6 (7) | §4.6 (7) |
| PIPELINE-238 | rule | §4.6 (7) | §4.6 (7) |
| PIPELINE-239 | rule | §4.6 (7) | referenced to §7.3 item 1; one-sentence summary and pointer at §4.6 step 7 |
| PIPELINE-240 | decision | §4.6 (7) | rationale → J-P32 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P32)" left at §4.6 (7) |
| PIPELINE-241 | rule | §4.6 (8) | §4.6 step 8 ("each rung under an operation-count work limit; ≤ 3 candidates in all" unioned from §3.5) |
| PIPELINE-242 | acceptance | §4.6 (8) | §4.6 (8) |
| PIPELINE-243 | rule | §4.6 (9) | §4.6 (9) |
| PIPELINE-244 | rule | §4.6 (10)-(11) | §4.6 (10)-(11) |
| PIPELINE-245 | decision | §4.6 (10) | rationale → J-P11 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P11)" left at §4.6 (10) |
| PIPELINE-246 | rule | §4.6 | §4.6 |
| PIPELINE-247 | number | §4.6 | §4.6 |
| PIPELINE-248 | rule | §4.6 | §4.6 |
| PIPELINE-249 | interface | §4.6 | §4.6 |
| PIPELINE-250 | interface | §4.6 | §4.6 |
| PIPELINE-251 | mechanism | §4.7 S9 | referenced to §3.7; S9's per-district / hinterland runs and the strip's L2 kept at §4.7 S9 |
| PIPELINE-252 | rule | §4.7 S9 | §4.7 S9 |
| PIPELINE-253 | mechanism | §4.7 S10a | §4.7 S10a |
| PIPELINE-254 | rule | §4.7 S10a | §4.7 S10a |
| PIPELINE-255 | rule | §4.7 S10 (0) | §4.7 S10 (0) (margin bands by pointer to §4.5) |
| PIPELINE-256 | number | §4.7 S10 (0) | referenced to §12.4 (RENDERING-523) |
| PIPELINE-257 | rule | §4.7 S10 (0) | referenced to §7.3 item 2; the castle-curtain and hinterland-recipe clauses stay at §4.7 S10 (0) |
| PIPELINE-258 | mechanism | §4.7 S10 | §4.7 S10 |
| PIPELINE-259 | number | §4.7 table | §4.7 table |
| PIPELINE-260 | rule | §4.7 S10 (3) | §4.7 S10 (3) |
| PIPELINE-261 | rule | §4.7 S10 (4) | §4.7 S10 (4) |
| PIPELINE-262 | test | §4.7 S10 (4) | referenced to §13.2 (SCOPE-183) |
| PIPELINE-263 | rule | §4.7 S10 (5)-(6) | §4.7 S10 (5)-(6) |
| PIPELINE-264 | rule | §4.7 S10 (7) | §4.7 S10 (7) |
| PIPELINE-265 | rule | §4.7 S10 (8) | §4.7 S10 (8) |
| PIPELINE-266 | rule | §4.7 S10 (9)-(10) | §4.7 S10 (9)-(10) |
| PIPELINE-267 | rule | §4.7 S10 | §4.7 S10 |
| PIPELINE-268 | rule | §4.7 S10 | §4.7 S10 |
| PIPELINE-269 | rule | §4.7 S10 | §4.7 S10 |
| PIPELINE-270 | rule | §4.7 S10b | §4.7 S10b |
| PIPELINE-271 | rule | §4.7 S10b | §4.7 S10b |
| PIPELINE-272 | rule | §4.7 S10b | §4.7 S10b |
| PIPELINE-273 | rule | §4.7 S10b | §4.7 S10b — "never gives up" now reads "never silently", with F-SITING's last rung (CF-PIPE-04) |
| PIPELINE-274 | number | §4.7 S10b | §4.7 S10b |
| PIPELINE-275 | rule | §4.7 S10b | §4.7 S10b |
| PIPELINE-276 | rule | §4.7 S11 | §4.7 S11 |
| PIPELINE-277 | number | §4.7 S11 table | §4.7 S11 table |
| PIPELINE-278 | rule | §4.7 S11 | referenced to §2.5 `PlotBound`; the streetwall-continuity and export clauses kept at §4.7 S11, stroke rule → §8.2 |
| PIPELINE-279 | rule | §4.7 S11 | §4.7 S11 |
| PIPELINE-280 | rule | §4.7 S11 | §4.7 S11 |
| PIPELINE-281 | rule | §4.7 S11 | §4.7 S11 |
| PIPELINE-282 | number | §4.7 pins | §4.7 pins |
| PIPELINE-283 | rule | §4.7 | referenced to §8.5 (RENDERING-180) |
| PIPELINE-284 | rule | §4.8 | §4.8 |
| PIPELINE-285 | number | §4.8 | §4.8 wall strips |
| PIPELINE-286 | rule | §4.8 | §4.8 |
| PIPELINE-287 | decision | §4.8 | rationale → J-P29 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P29)" left at §4.8 |
| PIPELINE-288 | rule | §4.8 | §4.8 |
| PIPELINE-289 | rule | §4.8 | §4.8 |
| PIPELINE-290 | number | §4.8 | §4.8 |
| PIPELINE-291 | mechanism | §4.8 castle | §4.8 castle (surround named as `Castle.surround`, moat as `Castle.moat`, per MODEL-C04) |
| PIPELINE-292 | rule | §4.8 castle | §4.8 castle |
| PIPELINE-293 | decision | §4.8 castle | rationale → J-P36 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P36)" left at §4.8 castle |
| PIPELINE-294 | rule | §4.8 castle | §4.8 castle |
| PIPELINE-295 | acceptance | §4.8 castle | §4.8 castle acceptance ("0 ways through reservations" and MFCG census baseline unioned from §5.2 F-CASTLE) |
| PIPELINE-296 | rule | §4.8 | §4.8 |
| PIPELINE-297 | rule | §4.8 water | §4.8 water furniture (deck list unioned from §2.7) |
| PIPELINE-298 | rule | §4.8 water | referenced to §6.3 (bridge address); the re-base and gate-passage clauses kept at §4.8 |
| PIPELINE-299 | number | §4.8 water | §4.8 water |
| PIPELINE-300 | rule | §4.8 water | referenced to §5.3 (crossing invariant); the harbour-works list kept at §4.8 water furniture |
| PIPELINE-301 | rule | §4.8 water | §4.8 water |
| PIPELINE-302 | rule | §4.9 S12a | §4.9 S12a |
| PIPELINE-303 | rule | §4.9 S12a | §4.9 S12a |
| PIPELINE-304 | mechanism | §4.9 S12a | §4.9 S12a |
| PIPELINE-305 | number | §4.9 S12a | §4.9 S12a |
| PIPELINE-306 | rule | §4.9 | §4.9 |
| PIPELINE-307 | test | §4.9 | §4.9 |
| PIPELINE-308 | mechanism | §4.9 | §4.9 |
| PIPELINE-309 | rule | §4.9 | §4.9 |
| PIPELINE-310 | mechanism | §4.9 | §4.9 |
| PIPELINE-311 | rule | §4.9 S12b | §4.9 S12b |
| PIPELINE-312 | rule | §4.9 S12b | §4.9 S12b |
| PIPELINE-313 | number | §4.9 table | §4.9 table |
| PIPELINE-314 | rule | §4.9 table | §4.9 table |
| PIPELINE-315 | number | §4.9 table | §4.9 table |
| PIPELINE-316 | number | §4.9 table | §4.9 table |
| PIPELINE-317 | rule | §4.9 table | §4.9 table |
| PIPELINE-318 | rule | §4.9 | §4.9 |
| PIPELINE-319 | rule | §4.9 | §4.9 |
| PIPELINE-320 | rule | §4.9 | §4.9 |
| PIPELINE-321 | acceptance | §4.9 | §4.9 |
| PIPELINE-322 | rule | §4.9 | referenced to §8.5; the `grove` tag / dramatic-forest options and the layer toggle kept at §4.9 acceptance |
| PIPELINE-323 | rule | §4.9 | §4.9 |
| PIPELINE-324 | rule | §4.10 | §4.10 — names drawn "in §6.3's cases" (CF-PIPE-05) |
| PIPELINE-325 | rule | §4.10 | referenced to §9.1 (RENDERING-330) |
| PIPELINE-326 | rule | §4.10 | referenced to §8.1 (section restatement) |
| PIPELINE-327 | mechanism | §4.11 | §4.11 |
| PIPELINE-328 | rule | §4.11 | §4.11 |
| PIPELINE-329 | rule | §4.11 | §4.11 |
| PIPELINE-330 | rule | §4.11 | §4.11 |
| PIPELINE-331 | test | §4.11 | §4.11 |
| PIPELINE-332 | type | §4.11 | §4.11 |
| PIPELINE-333 | rule | §4.11 | §4.11 |
| PIPELINE-334 | rule | §4.11 | §4.11 |
| PIPELINE-335 | rule | §4.11 | §4.11 |
| PIPELINE-336 | rule | §4.11 | §4.11 |
| PIPELINE-337 | rule | §4.11 | §4.11 |
| PIPELINE-338 | rule | §4.11 | part-specific use kept at §4.11 "Other crossings" (the carve's wall-run rule, J-I13); the shared re-trace rule referenced to §7.3 (b) 2 |
| PIPELINE-339 | rule | §4.11 | §4.11 |
| PIPELINE-340 | test | §4.11 | referenced to §13.1 (SCOPE-126) |
| PIPELINE-341 | mechanism | §4.11 batch (1) | §4.11 batch (1) |
| PIPELINE-342 | mechanism | §4.11 batch (2) | §4.11 batch (2) |
| PIPELINE-343 | mechanism | §4.11 batch (3) | §4.11 batch (3) |
| PIPELINE-344 | rule | §4.11 (4) | §4.11 batch (4) ("a carve costs its footprint, not the town" unioned from §3.3) |
| PIPELINE-345 | test | §4.11 (4) | referenced to §13.2; the result stated once in §4.11 batch (4) with the fixture pointer |
| PIPELINE-346 | rule | §4.11 (4) | referenced to §7.3 item 1; the carve's neighbour-step clause kept at §4.11 batch (4) |
| PIPELINE-347 | rule | §4.11 | §4.11 |
| PIPELINE-348 | decision | §4.11 | rationale → J-P30 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P30)" left at §4.11 |
| PIPELINE-349 | decision | §4.11 | rationale → J-P34 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P34)" left at §4.11 |
| PIPELINE-350 | decision | §4.11 | rationale → J-P43 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P43)" left at §4.11 |
| PIPELINE-351 | decision | §4.11 | rationale → J-P40 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P40)" left at §4.11 |
| PIPELINE-352 | rule | §4.11 | §4.11 |
| PIPELINE-353 | rule | §4.11 | §4.11 evolution hooks (user-applied by hand, ruined-building drawing, engine rule table unioned from §2.8) |
| PIPELINE-354 | interface | §4.11 | §4.11 |
| PIPELINE-355 | rule | §4.11 | §4.11 |
| PIPELINE-356 | interface | §4.12 | §4.12 |
| PIPELINE-357 | interface | §4.12 | §4.12 |
| PIPELINE-358 | interface | §4.12 | §4.12 |
| PIPELINE-359 | rule | §4.12 | §4.12 |
| PIPELINE-360 | rule | §10 intro | §10 intro |
| PIPELINE-361 | rule | §10.1 | §10.1 |
| PIPELINE-362 | rule | §10.1 | §10.1 |
| PIPELINE-363 | rule | §10.1 | §10.1 |
| PIPELINE-364 | rule | §10.1 | §10.1 |
| PIPELINE-365 | decision | §10.1 | rationale → J-9 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-9)" left at §10.1 |
| PIPELINE-366 | rule | §10.1 | §10.1 |
| PIPELINE-367 | decision | §10.1 | rationale → J-P21 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P21)" left at §10.1 |
| PIPELINE-368 | interface | §10.2 | §10.2 |
| PIPELINE-369 | mechanism | §10.2 | §10.2 |
| PIPELINE-370 | test | §10.2 | §10.2 |
| PIPELINE-371 | rule | §10.2 | §10.2 |
| PIPELINE-372 | rule | §10.2 | §10.2 |
| PIPELINE-373 | rule | §10.2 | §10.2 |
| PIPELINE-374 | rule | §10.2 | §10.2 |
| PIPELINE-375 | rule | §10.2 | §10.2 Output paragraph — the reconcile sentence points to §4.7 S10b and F-SITING (CF-PIPE-04) |
| PIPELINE-376 | rule | §10.3 | §10.3 |
| PIPELINE-377 | rule | §10.3 | §10.3 |
| PIPELINE-378 | rule | §10.3 | §10.3 |
| PIPELINE-379 | number | §10.3 | §10.3 |
| PIPELINE-380 | interface | §10.3 | §10.3 |
| PIPELINE-381 | rule | §10.3 | §10.3 |
| PIPELINE-382 | rule | §10.3 | §10.3 |
| PIPELINE-383 | mechanism | §10.3 | §10.3 |
| PIPELINE-384 | mechanism | §10.3 | §10.3 |
| PIPELINE-385 | mechanism | §10.3 | §10.3 |
| PIPELINE-386 | budget | §10.3 | referenced to §12.7 (RENDERING-578) |
| PIPELINE-387 | rule | §10.3 | §10.3 calendar ("logs no event" unioned from §11.3) |
| PIPELINE-388 | rule | §10.3 | §10.3 |
| PIPELINE-389 | interface | §10.3 | §10.3 |
| PIPELINE-390 | interface | §10.3 | §10.3 |
| PIPELINE-391 | rule | §10.3 | referenced to §11.2 (RENDERING-450) |
| PIPELINE-392 | mechanism | §10.4 | §10.4 |
| PIPELINE-393 | rule | §10.4 | referenced to §6.3 (DETERMINISM-224) |
| PIPELINE-394 | rule | §10.4 | §10.4 |
| PIPELINE-395 | rule | §10.4 | §10.4 per-culture paragraph — the re-draw clause in NP5-3 (a)'s order, pointer to §7.6 |
| PIPELINE-396 | rule | §10.4 | referenced to §7.6; one clause kept at §10.4 in NP5-3 (a)'s order |
| PIPELINE-397 | rule | §10.4 | referenced to §2.9 pack set bullet (MODEL-374) |
| PIPELINE-398 | interface | §10.4 | §10.4 |
| PIPELINE-399 | rule | §10.4 | §10.4 setting packs paragraph — retention is now a pointer to §2.9's pack-set rule (VD5-6, CF-PIPE-06) |
| PIPELINE-400 | rule | §10.4 | referenced to §7.6; the pack patch form (`baseRowHash`, `baseVersion`, orphans) kept briefly at §10.4 |
| PIPELINE-401 | rule | §10.4 | §10.4 |
| PIPELINE-402 | rule | PART II intro | PART II intro — `area` = the base's bent-cut fabric (CF-PIPE-07) |
| PIPELINE-403 | interface | II.1 | II.1 |
| PIPELINE-404 | interface | II.1 | II.1 |
| PIPELINE-405 | interface | II.1 | II.1 |
| PIPELINE-406 | interface | II.1 | II.1 `NeighbourhoodRequest` (comment: `bent-cut` is NG's `area` template; CF-PIPE-07) |
| PIPELINE-407 | interface | II.1 | II.1 |
| PIPELINE-408 | rule | II.1 | II.1 |
| PIPELINE-409 | rule | II.1 | II.1 |
| PIPELINE-410 | rule | II.1 | II.1 |
| PIPELINE-411 | rule | II.1 (1) | II.1 (1) |
| PIPELINE-412 | rule | II.1 (2) | II.1 (2) |
| PIPELINE-413 | rule | II.1 (3) | II.1 (3) |
| PIPELINE-414 | rule | II.1 (3) | II.1 (3) |
| PIPELINE-415 | rule | II.1 (3) | II.1 (3) |
| PIPELINE-416 | test | II.1 (3) | referenced to §13.1 (SCOPE-142) |
| PIPELINE-417 | acceptance | II.1 (3) | II.1 rule (3) and II.5 — spelled "stage-2 feature S1" (CF-PIPE-08) |
| PIPELINE-418 | rule | II.1 (4) | II.1 rule (4) (its persistence clause now points to II.4) |
| PIPELINE-419 | rule | II.1 (5) | II.1 rule (5) (outline list is a pointer to §4.2 S1 (2)) |
| PIPELINE-420 | rule | II.1 (6) | II.1 (6) |
| PIPELINE-421 | decision | II.1 | rationale → J-P33 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P33)" left at II.1 |
| PIPELINE-422 | decision | II.1 | rationale → J-P37 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P37)" left at II.1 |
| PIPELINE-423 | decision | II.1 | rationale → J-P38 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P38)" left at II.1 |
| PIPELINE-424 | mechanism | II.2 | II.2 |
| PIPELINE-425 | rule | II.2 | II.2 |
| PIPELINE-426 | decision | II.2 | rationale → J-S42 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-S42)" left at II.2 |
| PIPELINE-427 | rule | II.2 | II.2 |
| PIPELINE-428 | rule | II.2 | II.2 — "the `area` template is the base's own bent-cut fabric … opened as a `refine` close-up" (VS5-2, CF-PIPE-07); "stage-2 feature S4" (CF-PIPE-08) |
| PIPELINE-429 | rule | II.3 | II.3 |
| PIPELINE-430 | rule | II.3 | II.3 |
| PIPELINE-431 | budget | II.4 | referenced to §8.2 / §8.6; the stage-2-tier additions (road programs, hood title, instanced hatching, ≈ 25 canvas ops per wing) kept at II.4 until §8.2/§8.6 carry them (cross-part note R-3) |
| PIPELINE-432 | rule | II.4 | II.4 |
| PIPELINE-433 | rule | II.4 | II.4 |
| PIPELINE-434 | rule | II.4 | II.4 |
| PIPELINE-435 | rule | II.5 | II.5 |
| PIPELINE-436 | acceptance | II.5 | II.5 |
| PIPELINE-437 | acceptance | II.5 | II.5 |
| PIPELINE-438 | rule | II.6 | II.6 |
| PIPELINE-439 | rule | II.6 | II.6 |
| PIPELINE-440 | rule | II.6 | II.6 — "an outline template of §4.2 S1 (2)" (CF-PIPE-09) |
| PIPELINE-441 | interface | II.6 | II.6 |
| PIPELINE-442 | interface | II.6 | II.6 |
| PIPELINE-443 | rule | PART III | PART III |
| PIPELINE-444 | rule | PART III | PART III |
| PIPELINE-445 | rule | PART III (1) | PART III (1) |
| PIPELINE-446 | rule | PART III (2) | PART III (2) |
| PIPELINE-447 | rule | PART III (3)-(4) | PART III (3)-(4) |
| PIPELINE-448 | number | PART III (5) | PART III (5) |
| PIPELINE-449 | acceptance | PART III | PART III |
| CF-PIPE-01 | conflict | §4.1 / §4.2 S3 (12) / §4.5 S7b (3) | resolved at §4.1 "Why this order" (c) (§3 above) |
| CF-PIPE-02 | conflict | §4.1 / §4.12 | resolved: §4.1 points to §4.12 `StageDecl` |
| CF-PIPE-03 | conflict | §4.1 S11 row / §4.7 | resolved with NP5-1 at §4.1 S11 row |
| CF-PIPE-04 | conflict | §4.7 S10b / §10.2 / §5.2 | resolved at §4.7 S10b and §10.2 (pointers to F-SITING) |
| CF-PIPE-05 | conflict | §4.1 / §4.10 / §10.4 | resolved: "in §6.3's cases" |
| CF-PIPE-06 | conflict | §10.4 / §2.9 | resolved with VD5-6: pointers to §2.9 |
| CF-PIPE-07 | conflict | PART II intro / II.2 / II.1 | resolved with VS5-2: `area` = bent-cut |
| CF-PIPE-08 | conflict | II.1–II.4 | resolved: "stage-2 feature S<n>" in text; two heading renames for the assembler |
| CF-PIPE-09 | conflict | II.6 / §4.2 S1 (2) | resolved: II.6 points to §4.2 S1 (2) |
| CF-PIPE-10 | conflict | §4.1 / §4.4 S5b / §5.2 | resolved with NP5-2 (canon ruling, option 1) |

## 7. Verification (executed)

* **Numbers:** a script extracts every number from the statement of each of the 365 facts homed here (and the two moved
  in) and looks for it in the new files — **0 missing** (`numcheck.py` in the session scratchpad; re-run after the last edit).
* **Identifiers:** every code identifier of a home fact's statement is present — **0 missing** after restoring
  `LayerSpec.occlusion`, `baseRowHash` / `baseVersion` and VG's `createMount/Hollow/Ridge`. Identifiers of the old text no
  longer in the new: `FaceRef` (§2.5 pointer), `gate_opening` (§2.5 `PlotBound`), `naming.quarter` / `naming.emblem` (§6.1's
  registry), `workLimit` (now `StageDecl.workLimits`), `builtBlockShare` (J-P6 rationale), `log.md` (history).
* **Pointers:** each of the 29 judgment ids the canon's RATIONALE OUT names appears as "(J-x)" in the new text.
* **Scans:** no "PENDING FABLE REVIEW", no fix-round id (NF-, VP, NP, VK, VD, NR, VS, X-), no "TBD" in the section files; the
  word "later" appears only as ordinary English or for owner-staged subjects (the village product, the evolution engine,
  "setting packs later" D-6).
* **CONFIRMED vs PLAUSIBLE.** CONFIRMED by execution: every number and identifier of every home fact survives, and every
  inventory id is mapped. PLAUSIBLE (by reading, not execution): that each compressed sentence keeps its meaning, and
  NEW-PIPE-1's reading.

## 8. Cross-part notes (edits other parts' canonical text must make; this lane edited none of their files)

Model (§2)
* **M-1** §2.7 "Open traces and the waterfront": make the `waterfront` rows a pointer to §4.4 S5a — `sea_wall` "water gates
  only at the harbour mouth" contradicts the canonical home (NEW-PIPE-1).
* **M-2** §2.3 hydrology grid (MODEL-164), Heights `datumCm` (MODEL-167) and Flats (MODEL-170): pointers to §4.2 S1 (3) / (1).
* **M-3** §2.2 rule 7 (deck), rule 3 (c) and §2.7 Bridges (MODEL-312–316): the role definitions stay; who places a deck and
  a site's two states point to §4.2 S1 (5) (MODEL-C11), bridge furniture to §4.8.
* **M-4** §2.7 Open traces (MODEL-308), Castles (MODEL-311, per MODEL-C04), Nesting and build order (MODEL-310), staged layers
  (MODEL-318): pointers to §4.4 S5a, §4.8 and II.6.
* **M-5** §2.8 decline hooks (MODEL-334): pointer to §4.11 (its details are now stated there).
* **M-6** §2.5 FieldBands prose (MODEL-213), Seams (MODEL-212), vacant frontage runs (MODEL-216), site-plan prose (MODEL-205):
  pointers to §4.5, II.1, §4.7 S10 (8), §4.7 S11; §2.5 keeps the record fields.
* **M-7** §2.7 relation-store comment (MODEL-301) and people paragraph (MODEL-305): pointers to §10.1 and §10.3.
* **M-8** NP5-1 rule (1) and NP5-4 (`Room`, relative `Porch`, `ComposedTower`) stay the model rewriter's (§2.6).

Kernel (§3)
* **K-1** §3.3 step 3's margin band (KERNEL-150) → pointer to §4.5; the hinterland unit's overlay (KERNEL-151) → §4.1;
  §3.5's bent-cut ladder (KERNEL-236) → §4.6 step 8; §3.3 rule 3's carve cost (KERNEL-122) → §4.11 batch (4).

Determinism (§5–§7)
* **D-1** §5.2 F-ROUTE "where": add S5b at stages k ≥ 2 and in every epoch (NP5-2).
* **D-2** §5.2 F-SITING's last rung: "reduce the manifest, lowest-priority classes first, and report `unplaced`" (the order
  §10.2 used to state; CF-PIPE-04 union).
* **D-3** §5.2 F-CASTLE's test column repeats §4.8's castle acceptance (the canon homes it at §4.8): keep one statement.
* **D-4** §7.3 item 1 is now the only full statement of the seam exception (§4.6 step 7 and II.4 summarise and point): it must
  keep every element — bounding ways' chains and `Corridor` records; strips on both sides and wedges at the vertices the
  district's batches insert or remove; on the neighbour's side only II.1 (3)'s neighbour step; the neighbouring cells, plots,
  footprints and wing rings through those vertices, each equal to its prior ring with them removed and a promoted vertex
  returning to its level when the lane goes; the `Seam` records the district is party to.
* **D-5** §7.2 field brushes: keep the re-derivation threshold (τ = 0.01 of the field range, samples in the plots'
  `DerivationRecord`, the same τ in replay, strokes surviving epochs as Δ); §4.5 points there.
* **D-6** §7.7: keep "≈ 200 internal parameters", "assignments **and edits** at log positions 0…k" and the recipe field
  `entryMode` (PIPELINE-053/054 details).
* **D-7** §7.4 / §7.6: NP5-3 (b) and the VD5-6 companion pointers to §2.9 are determinism's.

Rendering (§8–§12)
* **R-1** §12.4: drop "§4 follows it" from the header (CANON-C05); keep S10 (0)'s split of ≈ 3 ms bands + ≈ 2.3 ms L3
  partition rebuild (PIPELINE-256) when the round narration under the table goes.
* **R-2** §12.3: keep "the pool's p95 within the pooled law + 10 %" and "the golden suite runs pool sizes 0–3" (PIPELINE-048/049).
* **R-3** §8.2 / §8.6 `hatched`: add the stage-2-tier details only II.4 now holds (cobbles / tiles / outlined / dashed road
  programs, the hood title in the emptiest corner, instanced hatching, ≈ 25 canvas ops per wing); II.4 then becomes a bare
  pointer.
* **R-4** §8.2 relief tier: state that contours are clipped to the land faces in vector space before emission (GEO-14).
* **R-5** §8.5: keep greenery restraint at city zoom (area fill → crowns → lobed trees by LOD; avenues not drawn at the city
  band).
* **R-6** §12.5: keep "no rung shows a preview", < 1 s to ≈ 14 200 buildings, ≈ 2.3 s at the cap, the single-worker knee
  ≈ 11 400 buildings; the part used "the 120 000 cap" (people) where §12.5 says "the 35 000-building cap" — one unit.
* **R-7** §8.2's boundary-treatment row is the stroke rule §4.7 S11 now points to.

Scope (§1, §13–§17, rationale)
* **S-1** J-I18: add S5b's extra-bridge L0 batch to the L0 `deck_end` writers (NP5-2).
* **S-2** §16 M0 (b): "curved, round-joined, triangular, C-shaped and holed faces; the NG signature re-measured on them before
  calibration" (PIPELINE-228 moved in).
* **S-3** §13.1: the neighbour-step fixture covers a footprint corner as well as a plot-line end and requires the block's,
  the plot's and the wing rings equal to those before the step (PIPELINE-416's detail beyond SCOPE-142).
* **S-4** §1.1: "a rung without a population takes the rung's target; a population outside the requested rung's band is an
  F-EDIT conflict offering the right rung" (PIPELINE-055's detail beyond SCOPE-063).
* **S-5** §14 `Stage<I,O>`: keep only its extra fields and point to §4.12 `StageDecl` (CF-PIPE-02).
* **S-6** §13.6 (2), the D5Pair NG comment and J-S34: VS5-2's wording.
* **S-7** Rationale file: union the verbatim passages of §9 into their J rows where the row is shorter (J-P2 with J-I1; J-P4
  with J-3 and the six rejected alternatives; J-P5; J-P6; J-P11; J-P21; J-P36's dry-ditch default; J-9; J-S42).
* **S-8** Index rows: this part's text now carries "(J-x)" pointers for J-P1–J-P16, J-P19–J-P47 as used; an index row's
  "names" column may add the new place.

## 9. Rationale passages removed from the normative text (verbatim, for `docs/ARCHITECTURE-RATIONALE.md`)

Each passage below left the part; the rule it justifies stays in the new text with "(J-x)". Ids from the canon's
RATIONALE OUT: plot counts → J-P6; walled share → J-P5; bent cut inside / FTG outside and the rejected alternatives → J-P4
(+ J-3); quarter level → J-P2 (+ J-I1); continuation prohibition → J-P11; dry-ditch default → J-P36; D-7 widening → J-9;
relation store → J-P21; square default → J-S42; the rest name their row.

- (§4) *Judgment J-P46:* chose the arena's outer ring as an L0 chain written first by S1 and the map border as an L1 chain written first by S3's L1 batch, over both at L1 — every L0 face needs a boundary and the sea and the rivers run out to the arena's edge — and over the border at L0, which is land and water only and would split every water body the frame crosses; laid after S3's L0 batch, the border meets no generation L0 insertion — S4's shore splits keep `attractCm` from it (§4.2 S1 (5)) — and an outer moat's carve and an edit prepare it as §3.3 rule 2 states); S10 never writes L1 — a rear or back lane is decided by S8's deep-interior rule (§4.6), and a lane a user adds later is a `drawWay` edit through §7.3's S5 operator, whose tree scoping re-derives every finer level under it (GEO-25). Static spatial indexes are rebuilt at stage end, never per batch, and S10's eager step (0) ends like a stage: it rebuilds the L3 partitions it touched before the pool's freeze, so the frozen copy carries the static partitions of L0–L3 and every dynamic grid is empty at the freeze (§3.3 pool step 1, §3.10; VK2-1); a freeze after edits first rebuilds every partition the edits left dirty, at every pool size (VK3-5); each stage's `workLimit` counts kernel operations, never milliseconds, and the wall-clock watchdog lives in `@plat/api`'s worker host and only reports (§5.2 F-BUDGET-TIME).

- (§4) *Judgment (J-P10, reconciled with J-R18 at integration):* chose the pool as the primary configuration, measured at M1 with the single worker as the pre-decided fallback, over single-worker-first, because after the eager allocation the per-district stages share no writes, and by the laws the pool keeps CITY's p95 within 300 ms up to ≈ 5 200 buildings (a single worker: ≈ 3 770) and moves METROPOLIS's one-second knee from ≈ 11 400 to ≈ 14 200 buildings (§12.3, §12.5).

- (§4) *Judgment (J-P27):* chose to run the hinterland unit on the otherwise idle generation worker as one more overlay of disjoint faces over keeping the field partition as an eager L1 stage before S8, which would add its ≈ 12 ms to CITY's p50 critical path (§12.4's sum, ≈ 255 ms with round 4's counted index copies, to ≈ 267 ms; NP3-8), because the fields are L3 content of the hinterland's own blocks and the generation worker waits for the pool anyway.

- (§4) *Judgment:* chose plot counts per band with a measured plot share over the synthesis seat's single area per class with `builtBlockShare = 1 − 0.38`, because FTG's 38 % is footprint over lot, not plots over land, and one area per class ignores the 11× plot-size spread across bands. **Measurement:** M-1 #5 (FTG face recovery) measures FTG's plot share; M1 measures B-CITY's own per regime. **Fallback:** if S5d's top-up fires on more than 10 % of B-CITY seeds at a rung, the `plotShare` rows are refitted from B-CITY's measured share per regime by one scripted pass, with a declared golden shift (§13.3).

- (§4) *Judgment:* chose MFCG's walled share over the synthesis seat's 0.35–0.5 (an addition to D-2, not the owner's era default) because a mostly-extramural default reproduces MFCG's size-80 shanty case, the wall is the town's signature silhouette (R6), and a compact walled town with ribbons on its approach roads is the historically constrained medieval pattern; FTG's ≈ 20 % walled preset stays reachable as a preset row, and the corpus phase recalibrates the rows. Output: `Roster` (demand by class with area / frontage requirement classes, district affinities, wealth bands) and `StageQuotas[]` (plot counts per class × band, land area, regime per stage: dense core → gapped rings → ribbon, plus the optional suburb; FTG's zonal gradient, R4).

- (§4) *Judgment (J-P26; NF-P1):* chose to solve the gate routes at S3 and take the stage-1 boundary, the gates, the castle weld and the moat from one travel-cost construction over the two alternatives the verifier named — a provisional boundary on straight corridors along the bearings, which still differs from the routed arterials by their bends, and sliding the gates at S5a, which leaves a moat carved at S3 on a line the wall no longer follows or forces water into L0 after the arterials exist — because a moat must enter L0 before any L1 edge (§2.2 rules 3 and 6), and it can follow the real wall only if the real wall is known then; the plaza-rooted Dijkstra and the field are the work S4 and S5a already did, moved earlier (§12.4).

- (§4) *Judgment (J-P35; VP2-2):* chose to solve the harbour route after the trace and the moat, through the serving gate and outside `T`'s road set, over keeping it among the (5) routes that shape `T`, because whether it must leave through a gate depends on the boundary `T` produces — a route in `T`'s road set would make the boundary depend on a route whose form depends on the boundary — and over adding a gate for it beyond N, which would break MFCG's gate law and "roads leaving = N"; a sealed town (`N = 0`) is the one case that gets a harbour water gate, because no gate exists to serve it — and the detour guard, where M1's measurement of the harbour pick fails or where the harbour's nucleus has no unforced pick left to force (4), (7). This changes `T` slightly on harbour towns whose harbour route used to lower it (a declared design change; no golden exists yet).

- (§4) *Judgment (J-P44; NP3-4):* chose to emit every crossing site as a `site` — two pinned bank vertices and a record, no span — that becomes a built bridge only when a way uses it, with the town bridge the one site S3 makes a destination, over making every emitted site a destination (which would line a river with roads to dozens of bridges) and over emitting no site until a route needs one (which would leave growth, epochs and drawn bridges to place decks after L1 exists every time), because FTG turns only crossing proposals into bridges and MFCG draws one per street crossing, so a bridge should stand where a road needs it; and chose one L0 batch of two same-level shore splits for a deck where no site stands over widening the carve's preparation path to it, because nothing is inserted into the water, so there is no clear region to declare and the only contact is the two shore points; and, inside S1's water operator or a carve, where the water is being inserted, chose to let the rung only site its deck and the operator's own batches place it, over splitting the old shores, which that operator's L0 batch removes (VD4-10).

- (§4) *Judgment (J-P45; NP3-7):* chose to force one of the N picks at the point where the plaza ↔ harbour least-cost path leaves the pick contour, with the detour guard's harbour water gate as the pre-decided fallback, over letting the harbour's bearing only score the picks (a jitter or a terrain term could still move the pick away, leaving the detour unbounded) and over always adding a harbour gate beyond N (J-P35's objection: it breaks MFCG's gate law), because the forced pick's gate route runs along that least-cost path's own prefix, so the harbour road leaves on the harbour side by construction and N is kept; this is a declared design change to `T` and the gates of harbour towns (no golden exists yet). Where the harbour's nucleus has no unforced pick left (NP4-4), chose the detour guard unconditionally over raising that nucleus's `N₁` by one, which breaks the gate law and the nested-pick prefix, and over releasing one of its polycentric forced picks, which cuts the gate-to-gate route §4.3 joins the nuclei by, because the guard's harbour gate is already the declared exception to N and bounds the detour by the same 1.5 × `L*` test.

- (§4) *Judgment (J-P36; VP2-10):* chose to carve an `on_enceinte` castle's moat only along its outer arc, joined to the city moat where there is one, with a dry ditch or nothing on its town side, over a ring band around the whole bailey, because the town wall arrives at each weld vertex from outside the bailey and so must cross a ring band — against §4.4's rule that the trace crosses water only at a river's water gate — while the outer arc is the stretch that faces the field, and the town side, where the castle gate opens, needs no water; the hard filter of (8) keeps every solved route off a planned castle moat, so no castle moat needs a deck except at a ring moat's castle gate.

- (§4) *Judgment:* chose the bent cut for the intramural fabric and FTG growth outside the walls over FTG growth everywhere, because MFCG's intramural signature (coherence, wall alignment, the connected three-valent alley mesh) comes from recursion on the district polygon and the tiebreaker favours the measured construction, while FTG's staged growth along roads is the historically constrained form of extramural expansion.

- (§4) **Alternatives rejected (written, as required).** 1 *Partition seeded from a grown skeleton via Voronoi cells around the arterials*: cell edges are again widthless, classless "streets"; fails the tiebreaker and O4 (a)–(c). 2 *Pure FTG growth including infill*: the 15°-clamp fabric and "vaguely circular" sameness; loses the NG signature R3 requires; a queue cannot guarantee block-size bands. 3 *Pure MFCG partition with FTG plots inside*: no destinations, no growth (the evolution hook needs it), no metres, restart-prone water. 4 *Urban Places' base mesh*: street geometry becomes a function of mesh resolution, which the precision tiebreaker forbids; its warp/edit affordances are obtained by the vertex arena and `warp`. 5 *Least-cost connectors instead of growth for the secondaries* (the pipeline proposal's default): defensible under the tiebreaker, but it leaves FTG's organic staged accretion and the measured suburb signature on the shelf, and the owner asked for the best of both. 6 *Walls traced after growth* (this document's first version): streets grown before the wall must then be cut or gated, and the fabric cannot inherit the wall's direction (GEO-18, MFP-2).

- (§4) *Judgment (J-P28):* chose the cut at `min(N_q, L)` over flooring the district count at N_q, because the floor moves the matched TOWN from 8 to 10 labels — no closer to MFCG's 9 — and would shrink TOWN's districts below MFCG's own size; S13a names every node of the tree, and a zoom stop between the city and district bands may use a finer cut (view data, §9.4).

- (§4) *Judgment:* chose a quarter level over thinning district labels by priority, because thinning leaves named districts unlabelled at the view the owner compares with MFCG, whereas MFCG labels every one of its (larger) districts; and chose one merge tree whose city cut is fixed by the count law over two mechanisms (a flat grouping here and a label-side tree in §9), so the model and the label ladder can never disagree about what a quarter is (integration record C-1).

- (§4) *Judgment (J-P41; VP2-3, NP3-8):* chose to exclude the strips from the claim candidates over letting a claim take strip ground, because a reservation there would site an institution or park where nothing may stand. Test: 100 % of institutions and parks larger than one block placed at their requirement (O18 f), and 0 S7b claims meeting a wall strip.

- (§4) *Judgment (J-P32):* chose a portal gap that slides a planned end away from an existing portal over letting two districts' lane ends share one boundary vertex, because a shared vertex is the crossroads across a district boundary that step 10 forbids and would bind either district's reroll to the other's lane.

- (§4) *Judgment:* chose the prohibition over a two-district transaction because per-district batches, the worker merge rule and per-district reroll isolation all rest on districts never writing each other's faces, and the crossroads it forgoes is rare by design.

- (§4) *Judgment (J-P29; NF-P5):* chose to cut the strips off as L1 faces at S7 and build the band inside them after S9 over subtracting band ⊕ setback inside `kerb(F)` while committing the band at L3 before S8, because an L3 face committed before S8 and S9 must then be cleared or split by their L1 and L2 batches (§2.2 rule 6, §3.10 nesting), whereas an L1 strip boundary makes the wall a barrier for the lane cutter by the same mechanism as a reservation.

- (§4) *Chose `dry_ditch` as the town-side default over `none`, because a castle on the wall keeps its defences toward its own town, and a dry ditch shows that separation on sites without water, at the cost of one residue kind.* The 0.75 compactness gate (MFCG's threshold, kept as a *shape check*) is checked when S3 sites the bailey, before the trace welds to it, and **repaired in place first**, in MFCG's order: equalise the claim polygon's angles toward the regular polygon's (≤ 20 iterations), then bloat it about its centroid in 5 % steps up to its area band's top; only then re-site to the next candidate (reported), and last a keep without a bailey (reported) — never a restart (F-CASTLE, §5.2). The claim polygon is the target of the `warp` `equalize` and `bloat` edits (MFCG's documented castle-resize workflow). Acceptance: castle area and compactness inside the band on ≥ 99 % of seeds with a castle requested; every re-sited castle reported. Several enceintes (citadel, inner, outer, suburb, bailey, palisade, earthwork) are stage rows in the table; up to two castles (§4.2 S0). Every wall carries a lifecycle for wall → ring road conversion (§4.11's `wallToWay`, a `retypeEdges` on the wall's role set).

- (§4) *Judgment (J-P30):* chose a way rule by class — decks for arterials and for sole connections, cuts for the rest — over re-routing every way around the new water, because a town keeps its through-roads across a new moat or canal by bridging them, while lanes that simply end at a new bank are what a carve does to a street pattern.

- (§4) *Judgment (J-P34; VP2-1, NP3-2):* chose one footprint — every L1 cell the channel's buffer (`attractCm` + bank setback) meets or the way rule touches, a crossed wall's old strip lines and new strips included, and nothing else — over the buffer alone, because a pruned remainder, a replaced arterial stretch, a merged cell and a re-traced wall run's strip lines reshape whole L1 cells beyond the buffer, so a check on the buffer alone fails by construction and its fallback would make every carve a town-wide re-derivation; and over the buffer united with those cells, because a cell the buffer's 26 cm fringe meets loses faces to the clear and must be re-derived whole. The cells cost a few blocks beyond the buffer — about 70–120 m of wall and its strips where the channel crosses a wall — and the dry run already computes them when it runs the way rule.

- (§4) *Judgment (J-P43; NP3-3):* chose to give each land face of the footprint the district, hinterland or strip typing of the pre-edit cell holding the larger part of its area, after the water is in, over the merge rule alone ("a cell merged across a removed boundary joins the larger part's district"), because a boundary removed under new water is re-separated by the water itself, and the merge rule then hands the countryside on both banks of a canal across the perimeter to a district, against §4.5's rule that every face outside the perimeter is the hinterland's.

- (§4) *Judgment (J-P40; VP2-1, with VK2-3):* chose the deck span to be the kept way's own L1 edge between its two promoted bank vertices, carrying `deck` beside `way`, over a separate L0 deck edge inserted with the channel, because the way then stays one chain through every batch, the water body stays one L0 face, and §7.3 (b)'s river operator builds its decks the same way, so a dug canal and a moved river leave identical bridge structures.

- (§10) The product proposal's D-7 widening (schedules and the calendar in the base module) is rejected as more than J-S allows for the first release.

- (§10) *Judgment:* chose a relation store whose schema is in the base and whose data the module materialises once and then persists, over relations re-derived on every read, because a re-derivation after any scoped regeneration would reshuffle relations town-wide; the one-click path still never pays for it.

- (PART II) *Judgment (J-P33):* chose one `Seam` record per boundary run, read by both districts, over a contract copied into each district, because one record cannot disagree with itself and a district's re-derivation then changes the seams it is party to rather than its neighbour's district record.

- (PART II) *Judgment (J-P37; VK2-10):* chose a `reserve` seam type over forbidding two districts to meet along a reservation boundary without a way, because the grower's `validateEdge` stops at reservation boundaries by design, so a plaza's or precinct's edge is exactly where districts meet, and the margin band S10 already lays there is the shared geometry the type names.

- (PART II) *Judgment (J-P38; VK2-11):* chose one `corridor_split` insertion into the neighbour's half-corridor strip over re-running `corridorUnion` on the neighbour's whole L1 face, because `corridorUnion` re-derives that face's built blocks and §3.3 keeps only the content of stages before the one re-derived, so it would clear and re-derive every plot of the face, while the strip holds no finer content and the one edge gives the same structure a from-scratch S9 builds at that vertex.

- (PART II, II.2 → J-S42) "(COV-VG-VN-179) … (NG 1.1.0's square, IMPR S4's "keep NG's square as a void")" and "The `square` template row's default is `mode: 'void'` — NG's own square, which IMPR S4 keeps — …" (J-S42; VS4-4).

- (§4.2 S1 (3), moved, not rationale) "VG's live course is a different one, a terrain-independent spline through 6–7 control points laid before its terrain (COV-VG-WC2)" — stated once in PART III.
