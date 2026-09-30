# Coherence verify — model part (§2 domain model and schemas), round 0 (seat r0s)

PROGRESS: complete — inputs read; every removal hunk of the word diff reviewed (602 hunks, 3 395 words); all 609 inventory
ids checked; the 88 routed f items checked against their BCR texts in the archived volumes; g items 105–119 (with the
2026-09-30 dated rulings); 14 conflicts, 5 elegance rulings, 7 wiring gaps, 44 open findings, 12 agreement subjects,
7 edges and combinations; cross-part notes to model from the 17 other rewrite reports; references, ids, terms, deferral
wording; doc checks. 37 issues (1 blocker, 15 major, 21 minor). Result saved to
docs/validation/coherence/results/coherence_verify-model-r0s.json.

Lane key: coherence/verify-model-r0s. Verifier (Opus). Scope: base `## §2 ` after coherence/assemble-r0.

## 1. Inputs

| input | what was read |
|---|---|
| live §2 | docs/ARCHITECTURE.md (md5 4571b44e…) lines 477–3057 (2 581 lines, 53 256 words by wc); identical to the rewrite's output docs/validation/coherence/new/base/model/01-domain-model-and-schemas.md (md5 68b3e30d…) but for assemble-r0's six G-cite fixes (`V03 §3.7.4`, `V02 §3.15.2`, `V11 §3.16`, `V11 §3.24.2`, `V06 §3.7.1`, `V06 §3.19`, `V05 §3.15 (5)`) |
| archived §2 | docs/archive/ARCHITECTURE-pre-coherence-2026-09-28.md (md5 01fea21f…) lines 469–2451 (1 983 lines, 41 761 words by wc; 42 526 by the inventory's count) |
| inventory | docs/validation/coherence/inventory-model.json — 609 items, 12 conflicts, 13 broken references, 14 restatement clusters, 5 wiring observations |
| canon | canon.json (units.model: 496 state, 77 reference, 88 f items, 6 g parts, 14 conflicts, 7 wiring, 5 elegance, 44 open findings, 12 agreement subjects, the G-lot and G-shadows terms, edges); canon.md's dated rulings of 2026-09-30 (g items 114–116, 117, 118, 119) |
| rewrite report | rewrite-model.md (judgment calls J-RM1–J-RM16, f-item placement table, mapping table of 609 ids, cross-part notes) |
| f / g | docs/AMENDMENTS-2026-09-28f.md items 202–278, 286, 303, 313, 333, 362, 371, 459, 510, 575, 576, 578 (and 309, 335, 429 whose §2 parts other units' texts cite); every BCR they apply as written, extracted from docs/archive/volumes-pre-coherence-2026-09-28/*.md §10; docs/AMENDMENTS-2026-09-28g.md items 102–119 |
| edges | edges.json (model: 15 DEFINED, 3 UNDEFINED, 1 UNTESTED; combinations C-raised-frame, C-retaining-frame, C-deckplot-frame; named combinations touching model) |
| other units | cross-part notes to model in rewrite-V01 … V12, -kernel, -pipeline, -determinism, -rendering, -scope; the live base §3, §4, §5, §7, §8, §10–§14, II.1, II.6, II.7 and the live volumes where a note or reference lands |

## 2. Method

1. **Loss and change, every word.** A word-level diff (difflib over whitespace tokens) of archived §2 against live §2:
   3 395 words removed in 602 hunks, 15 033 added. Every removal hunk was read with its context and classified —
   rephrased in place, moved within §2, cut as a restatement of a home that states it (the home read), an f or g item or
   canon ruling applied, or lost. Where a cut pointed at a home, the home was read (II.1, II.6, II.7.2, II.7.3, §3.3,
   §4.1's S1 and S3 rows, §4.3, §4.6, §7.7, §11.1, §12.6, §13.2, V02, V05, V11, the rationale).
2. **Every inventory id.** The mapping table's disposition of each of the 609 ids was checked against the diff review;
   a token probe (every backticked name, dotted field and number of each item's statement searched in live §2, else in
   the base and volumes) flagged 70 ids, each read by hand (formatting false positives: `3,000 m` vs `3 000 m`,
   `Plot.owner` as a field line; genuine: the ids in §3's exceptions).
3. **f and g items as written.** For each routed f item the BCR texts it applies were extracted from the archived
   volumes' §10 and every new text, field and clause located in live §2; the dated g rulings' model parts were checked.
4. **Canon rulings, wiring, edges, agreement.** Each ruling routed to model was checked at §2 and, for wiring, at the
   other end (the writer's and reader's sections).
5. **Cross-part notes** addressed to model in the 17 other rewrite reports were each checked in live §2 and against the
   texts that cite §2.
6. **Terms, references, ids, deferral.** Every retired-term pattern of the canon glossary was run over §2; every
   `§x.y`, `Vnn §x.y` and decision id cited in §2 was resolved (headings and numbered bold paragraphs of the base,
   rationale and volumes); a deferral-wording sweep; doc checks.

## 3. Inventory check (every id)

**Result: 553 PRESENT, 41 REFERENCED (home read and found to state the fact), 15 with an issue.** The rewrite kept every
subsection number (§2.1–§2.9), rule number (§2.2 rules 1–8, *Entrances* rules 1–5) and id; no id was renumbered.

Exceptions (each an issue in §5):

| inventory id | finding |
|---|---|
| MODEL-0302 | the carry cost's assumed core mix (55 % row quads, 25 % one-wing houses, 18 % tiled, 2 % overlapping) and the 150 m brush ≈ 7 ha basis cut to a pointer at §12.6, which does not state them — VM-R0S-01 |
| MODEL-0403 | `Enceinte.waterfront`'s value meanings (open: no wall along quays and beaches; quay_wall: a wall along the waterfront; sea_wall: a full wall) gone from §2.7 and from §4.4 — VM-R0S-02 |
| MODEL-0173 | `District.fabric` / `FabricStrategyId` declared twice with different meanings — VM-R0S-17, VM-R0S-18 |
| MODEL-0018, MODEL-0024 | the part-numbering home (§2.1 *Arena parts*, `PlatKey`) omits ground parts ≥ 1 and `nextGroundPart` — VM-R0S-06 |
| MODEL-0053, MODEL-0417, MODEL-0609 | retired 'lot' kept for the hinterland (J-RM2) against §4.1/§4.9's 'outside plots' — VM-R0S-30; MODEL-0417 also VM-R0S-12 |
| MODEL-0402 | `Enceinte.walkCm`'s named readers partly one-ended — VM-R0S-23 |
| MODEL-0524 | `Recipe.presetId`'s named readers absent at §5.4 and V09 — VM-R0S-24, VM-R0S-25 |
| MODEL-0184 | `Block.depthClass`'s writer (§4.6) and reader (§13.5) never name it — VM-R0S-26, VM-R0S-27 |
| MODEL-0472 | `EditRef`/`RuleRef` declared twice with different shapes; stray `//` — VM-R0S-07, VM-R0S-22 |
| MODEL-0446 | `HistoryHint` lacks the item-113 fields V08 says §2.7 carries — VM-R0S-11 |
| MODEL-0418 | `SiteResources` lacks the well-yield raster S1 (10) writes — VM-R0S-10 |
| MODEL-0427 | `Household` lacks f item 335's `transit` — VM-R0S-09 |

The full per-id table (609 rows):

| id | old home | disposition (rewrite mapping) | verdict |
|---|---|---|---|
| MODEL-0001 | §2 (plain words) | stated at §2 (plain words) | PRESENT |
| MODEL-0002 | §2 (plain words) | stated at §2 (plain words) | PRESENT |
| MODEL-0003 | §2 (plain words) | stated at §2 (plain words) | PRESENT |
| MODEL-0004 | §2.1 | stated at §2.1 | PRESENT |
| MODEL-0005 | §2.1 | reference → §3.2 (5), (6) (pointer kept in §2.1 Units) | REFERENCED — home checked, states it |
| MODEL-0006 | §2.1 | stated at §2.1 | PRESENT |
| MODEL-0007 | §2.1 | stated at §2.1 | PRESENT |
| MODEL-0008 | §2.1 | stated at §2.1 | PRESENT |
| MODEL-0009 | §2.1 | stated at §2.1 | PRESENT |
| MODEL-0010 | §2.1 | stated at §2.1 | PRESENT |
| MODEL-0011 | §2.1 | stated once at §2.1 Layers (cluster 002; §2.7 cites §2.1) | PRESENT |
| MODEL-0012 | §2.1 | glossary term, stated at §2.1 | PRESENT |
| MODEL-0013 | §2.1 | stated at §2.1 | PRESENT |
| MODEL-0014 | §2.1 | reference → §6.3 (pointer in §2.1 Ids) | REFERENCED — home checked, states it |
| MODEL-0015 | §2.1 | stated at §2.1 | PRESENT |
| MODEL-0016 | §2.1 | stated at §2.1 | PRESENT |
| MODEL-0017 | §2.1 | reference → II.7 (compact pointer in §2.1 Arena parts) | REFERENCED — home checked, states it |
| MODEL-0018 | §2.1 | stated once at §2.1 Arena parts (cluster 001; all other places cite §2.1) | COHESION → VM-R0S-06 |
| MODEL-0019 | §2.1 | reference → §7.3 item 9 (d), II.7.4 (pointer in §2.1 Arena parts) | REFERENCED — home checked, states it |
| MODEL-0020 | §2.1 | stated at §2.1 | PRESENT |
| MODEL-0021 | §2.1 | stated at §2.1 | PRESENT |
| MODEL-0022 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0023 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0024 | §2.2 | stated at §2.2 | COHESION → VM-R0S-06 |
| MODEL-0025 | §2.2 | home kept at §2.2 (canon reference not applied: §3 cites §2.2 rule 5 for slots; kept) | PRESENT |
| MODEL-0026 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0027 | §2.2 | home kept at §2.2 (canon reference not applied: only §2.2 states it (Plat.frame comment)) | PRESENT |
| MODEL-0028 | §2.2 | home kept at §2.2 (canon reference not applied: LatticeSpec declared here; §3.2 cites it) | PRESENT |
| MODEL-0029 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0030 | §2.2 | home kept at §2.2 (canon reference not applied: §3.4 pinVertices cites §2.2 rule 3 (b) as the release rule) | PRESENT |
| MODEL-0031 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0032 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0033 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0034 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0035 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0036 | §2.2 | home kept at §2.2 (canon reference not applied: the hash tables are declared only here (J-K22)) | PRESENT |
| MODEL-0037 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0038 | §2.2 | home kept at §2.2 (canon reference not applied: LevelIndex declared here; §3.3 states its use) | PRESENT |
| MODEL-0039 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0040 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0041 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0042 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0043 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0044 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0045 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0046 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0047 | §2.2 | reference → §4.1's S1 row (pointer in §2.2 rule 1 L0) | REFERENCED — home checked, states it |
| MODEL-0048 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0049 | §2.2 | reference → §4.1's S3 row (pointer in §2.2 rule 1 L1) | REFERENCED — home checked, states it |
| MODEL-0050 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0051 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0052 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0053 | §2.2 | stated at §2.2 | TERM → VM-R0S-30 |
| MODEL-0054 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0055 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0056 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0057 | §2.2 | reference → II.7.2 (L0–L2) and II.7.3 (L3–L4, U1–U3) for what the stage writes; the level mapping line kept in | REFERENCED — home checked, states it |
| MODEL-0058 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0059 | §2.2 | home kept at §2.2 (canon reference not applied: II.7.6 does not state the further parts' level mapping) | PRESENT |
| MODEL-0060 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0061 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0062 | §2.2 | home kept at §2.2 (canon reference not applied: only §2.2 states the face walk) | PRESENT |
| MODEL-0063 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0064 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0065 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0066 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0067 | §2.2 | home kept at §2.2 (canon reference not applied: splitThrough's effect on the level model; §3.6 states placemen | PRESENT |
| MODEL-0068 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0069 | §2.2 | glossary term, stated at §2.2 | PRESENT |
| MODEL-0070 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0071 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0072 | §2.2 | home kept at §2.2 (canon reference not applied: only §2.2 states it) | PRESENT |
| MODEL-0073 | §2.2 | reference → §3.3's clear-region rules (pointer in §2.2 rule 3) | REFERENCED — home checked, states it |
| MODEL-0074 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0075 | §2.2 | home kept at §2.2 (canon reference not applied: §3.4 removeEdges cites "dissolves by §2.2 rule 3") | PRESENT |
| MODEL-0076 | §2.2 | glossary term, stated at §2.2 | PRESENT |
| MODEL-0077 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0078 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0079 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0080 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0081 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0082 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0083 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0084 | §2.2 | home kept at §2.2 (canon reference not applied: the bar is stated only here) | PRESENT |
| MODEL-0085 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0086 | §2.2 | home kept at §2.2 (canon reference not applied: first clause referenced (§3.3 "No item changes in place"); the | PRESENT |
| MODEL-0087 | §2.2 | home kept at §2.2 (canon reference not applied: rule 4 is a §2.2 rule; its mechanics referenced to §3.4, §3.6) | PRESENT |
| MODEL-0088 | §2.2 | home kept at §2.2 (canon reference not applied: the owner inheritance clause only here) | PRESENT |
| MODEL-0089 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0090 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0091 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0092 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0093 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0094 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0095 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0096 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0097 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0098 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0099 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0100 | §2.2 | home kept at §2.2 (canon reference not applied: the bar is stated only here) | PRESENT |
| MODEL-0101 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0102 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0103 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0104 | §2.2 | home kept at §2.2 (canon reference not applied: resolveVertexAt's binding order stated only here (§3.4 declare | PRESENT |
| MODEL-0105 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0106 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0107 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0108 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0109 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0110 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0111 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0112 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0113 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0114 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0115 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0116 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0117 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0118 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0119 | §2.2 | home kept at §2.2 (canon reference not applied: rule 8 is a §2.2 rule citing §3.3, §3.10) | PRESENT |
| MODEL-0120 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0121 | §2.2 | home kept at §2.2 (canon reference not applied: 38.4 B/item referenced to §3.3; the finished-CITY count and 19 | PRESENT |
| MODEL-0122 | §2.2 | stated at §2.2 | PRESENT |
| MODEL-0123 | §2.2 | home kept at §2.2 (canon reference not applied: Map rebuild costs only here) | PRESENT |
| MODEL-0124 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0125 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0126 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0127 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0128 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0129 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0130 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0131 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0132 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0133 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0134 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0135 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0136 | §2.3 | home kept at §2.3 (canon reference not applied: CITY timing is also §12.4's; the METROPOLIS, TOWN and frame-on | PRESENT |
| MODEL-0137 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0138 | §2.3 | reference → §4.2 S1 (3), §12.4 (pointer kept, §2.3) | REFERENCED — home checked, states it |
| MODEL-0139 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0140 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0141 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0142 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0143 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0144 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0145 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0146 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0147 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0148 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0149 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0150 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0151 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0152 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0153 | §2.3 | reference → §2.6 Basements (pointer, §2.3) | REFERENCED — home checked, states it |
| MODEL-0154 | §2.3 | stated at §2.3 | PRESENT |
| MODEL-0155 | §2.4 | stated at §2.4 | PRESENT |
| MODEL-0156 | §2.4 | stated at §2.4 | PRESENT |
| MODEL-0157 | §2.4 | stated at §2.4 | PRESENT |
| MODEL-0158 | §2.4 | reference → §4.4 (comment pointer, §2.4) | REFERENCED — home checked, states it |
| MODEL-0159 | §2.4 | stated at §2.4 as changed by the flowToward item (V04 BCR-2): no longer stored — the reading `wayFall`; an old | PRESENT |
| MODEL-0160 | §2.4 | stated at §2.4 | PRESENT |
| MODEL-0161 | §2.4 | stated at §2.4 | PRESENT |
| MODEL-0162 | §2.4 | stated at §2.4 | PRESENT |
| MODEL-0163 | §2.4 | stated at §2.4 | PRESENT |
| MODEL-0164 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0165 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0166 | §2.5 | reference → II.1 (District.seams comment, §2.5) | REFERENCED — home checked, states it |
| MODEL-0167 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0168 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0169 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0170 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0171 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0172 | §2.5 | home kept at §2.5 (canon reference not applied: the District fields are base fields (V04 §2.1 reads them as ba | PRESENT |
| MODEL-0173 | §2.5 | stated at §2.5 | CONFLICT → VM-R0S-17; CONFLICT → VM-R0S-18 |
| MODEL-0174 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0175 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0176 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0177 | §2.5 | glossary term, stated at §2.5 | PRESENT |
| MODEL-0178 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0179 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0180 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0181 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0182 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0183 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0184 | §2.5 | stated at §2.5 | WIRING → VM-R0S-26; WIRING → VM-R0S-27 |
| MODEL-0185 | §2.5 | reference → §4.6, §4.8 (comment pointer, §2.5) | REFERENCED — home checked, states it |
| MODEL-0186 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0187 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0188 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0189 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0190 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0191 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0192 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0193 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0194 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0195 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0196 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0197 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0198 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0199 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0200 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0201 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0202 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0203 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0204 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0205 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0206 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0207 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0208 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0209 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0210 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0211 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0212 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0213 | §2.5 | glossary term, stated at §2.5 | PRESENT |
| MODEL-0214 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0215 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0216 | §2.5 | stated at §2.5, widened to 'sky' (MC-05) | PRESENT |
| MODEL-0217 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0218 | §2.5 | glossary term, stated at §2.5 | PRESENT |
| MODEL-0219 | §2.5 | reference → §8 (one clause, §2.5) | REFERENCED — home checked, states it |
| MODEL-0220 | §2.5 | reference → §4.7 (pointer, §2.5) | REFERENCED — home checked, states it |
| MODEL-0221 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0222 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0223 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0224 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0225 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0226 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0227 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0228 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0229 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0230 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0231 | §2.5 | stated once at §2.5 (Plot.builtBand comment; cluster 008) | PRESENT |
| MODEL-0232 | §2.5 | stated at §2.5 (Exposure, passages and knowledge; field details at the fields) | PRESENT |
| MODEL-0233 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0234 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0235 | §2.5 | stated at §2.5 | PRESENT |
| MODEL-0236 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0237 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0238 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0239 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0240 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0241 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0242 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0243 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0244 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0245 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0246 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0247 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0248 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0249 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0250 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0251 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0252 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0253 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0254 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0255 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0256 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0257 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0258 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0259 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0260 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0261 | §2.6 | reference → V11's rows (MaterialRow interface kept in §2.6; values V11's) | REFERENCED — home checked, states it |
| MODEL-0262 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0263 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0264 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0265 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0266 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0267 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0268 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0269 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0270 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0271 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0272 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0273 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0274 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0275 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0276 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0277 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0278 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0279 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0280 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0281 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0282 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0283 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0284 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0285 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0286 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0287 | §2.6 | reference → §8.2 (compressed pointer, §2.6) | REFERENCED — home checked, states it |
| MODEL-0288 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0289 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0290 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0291 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0292 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0293 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0294 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0295 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0296 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0297 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0298 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0299 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0300 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0301 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0302 | §2.6 | reference → §12.6 for the per-pass and worst-step totals; per-building costs kept (§2.6 rule 4; §12 does not s | NUANCE-LOST → VM-R0S-01 |
| MODEL-0303 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0304 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0305 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0306 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0307 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0308 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0309 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0310 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0311 | §2.6 | reference → §13.2 (§2.6 Test) | REFERENCED — home checked, states it |
| MODEL-0312 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0313 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0314 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0315 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0316 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0317 | §2.6 | reference → §8.4 (pointer, §2.6 Heights) | REFERENCED — home checked, states it |
| MODEL-0318 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0319 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0320 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0321 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0322 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0323 | §2.6 | reference → §13.2 T19-3 (§2.6 Materials) | REFERENCED — home checked, states it |
| MODEL-0324 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0325 | §2.6 | reference → V02 §3.3–§3.5 (§2.6 stage-3 hook) | REFERENCED — home checked, states it |
| MODEL-0326 | §2.6 | reference → V02 §2.3, §3.3 (PathShapeRow = MassingFamilyRow) | REFERENCED — home checked, states it |
| MODEL-0327 | §2.6 | reference → V02 §3.3–§3.5 (J-A59.21 named) | REFERENCED — home checked, states it |
| MODEL-0328 | §2.6 | reference → V02 §2.3 (`type PathShapeRow = MassingFamilyRow`, §2.6) | REFERENCED — home checked, states it |
| MODEL-0329 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0330 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0331 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0332 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0333 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0334 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0335 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0336 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0337 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0338 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0339 | §2.6 | home kept at §2.6 (canon reference not applied: file f item 223 rewrites the intake paragraph in §2.6 (f > can | PRESENT |
| MODEL-0340 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0341 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0342 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0343 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0344 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0345 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0346 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0347 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0348 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0349 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0350 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0351 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0352 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0353 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0354 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0355 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0356 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0357 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0358 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0359 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0360 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0361 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0362 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0363 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0364 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0365 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0366 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0367 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0368 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0369 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0370 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0371 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0372 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0373 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0374 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0375 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0376 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0377 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0378 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0379 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0380 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0381 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0382 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0383 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0384 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0385 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0386 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0387 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0388 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0389 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0390 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0391 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0392 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0393 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0394 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0395 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0396 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0397 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0398 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0399 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0400 | §2.6 | stated at §2.6 | PRESENT |
| MODEL-0401 | §2.6 | reference → §13.2 T28-13 – T28-18 | REFERENCED — home checked, states it |
| MODEL-0402 | §2.7 | stated at §2.7 | WIRING → VM-R0S-23 |
| MODEL-0403 | §2.7 | stated at §2.7 | LOST → VM-R0S-02 |
| MODEL-0404 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0405 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0406 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0407 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0408 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0409 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0410 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0411 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0412 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0413 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0414 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0415 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0416 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0417 | §2.7 | stated at §2.7 | TERM → VM-R0S-30; CONFLICT → VM-R0S-12 |
| MODEL-0418 | §2.7 | stated at §2.7 | WIRING → VM-R0S-10 |
| MODEL-0419 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0420 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0421 | §2.7 | reference → §9.1 | REFERENCED — home checked, states it |
| MODEL-0422 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0423 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0424 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0425 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0426 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0427 | §2.7 | stated at §2.7 | F-MISSING → VM-R0S-09 |
| MODEL-0428 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0429 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0430 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0431 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0432 | §2.7 | reference → V05 §2.1 (SkyIsland declared there; §2.7 names the fields the base reads; `outline` replaced by `r | REFERENCED — home checked, states it |
| MODEL-0433 | §2.7 | home kept at §2.7 (canon reference not applied: V04 §2.1 reads Tunnel as base-declared; f 247 edits the base l | PRESENT |
| MODEL-0434 | §2.7 | home kept at §2.7 (canon reference not applied: V04 §2.1 reads it as base-declared; f 248 edits the base line) | PRESENT |
| MODEL-0435 | §2.7 | home kept at §2.7 (canon reference not applied: V04 §2.1 reads it as base-declared; f 249 edits the base line) | PRESENT |
| MODEL-0436 | §2.7 | home kept at §2.7 (canon reference not applied: V04 §2.1 reads it as base-declared; f 247, 249, 250 edit the b | PRESENT |
| MODEL-0437 | §2.7 | home kept at §2.7 (canon reference not applied: V04 §2.1 reads it as base-declared; f 249 edits the base line) | PRESENT |
| MODEL-0438 | §2.7 | reference → II.7.4 (comment pointer, §2.7) | REFERENCED — home checked, states it |
| MODEL-0439 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0440 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0441 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0442 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0443 | §2.7 | home kept at §2.7 (canon reference not applied: no volume declares ConditionOverlay) | PRESENT |
| MODEL-0444 | §2.7 | home kept at §2.7 (canon reference not applied: no volume declares DepositSite) | PRESENT |
| MODEL-0445 | §2.7 | home kept at §2.7 (canon reference not applied: no volume declares PowerRelation (f 257 edits the base line)) | PRESENT |
| MODEL-0446 | §2.7 | stated at §2.7 | CONFLICT → VM-R0S-11 |
| MODEL-0447 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0448 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0449 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0450 | §2.7 | reference → §4.4, §4.8, §4.2 S1 (5) | REFERENCED — home checked, states it |
| MODEL-0451 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0452 | §2.7 | reference → §4.7 S11, §4.9, §8.4 | REFERENCED — home checked, states it |
| MODEL-0453 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0454 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0455 | §2.7 | stated at §2.7 | PRESENT |
| MODEL-0456 | §2.7 | reference → II.6 and V05 (island rules; §2.7 staged layers trimmed) | REFERENCED — home checked, states it |
| MODEL-0457 | §2.7 | home kept at §2.7 (canon reference not applied: the tunnel hook summary is the base's (V04 reads base)) | PRESENT |
| MODEL-0458 | §2.7 | home kept at §2.7 (canon reference not applied: the underground hook summary is the base's) | PRESENT |
| MODEL-0459 | §2.7 | home kept at §2.7 (canon reference not applied: the base hook summary; V08 §3.11 fills the records) | PRESENT |
| MODEL-0460 | §2.7 | home kept at §2.7 (canon reference not applied: the dossier-backed Person's base rule; V08 §3.11 fills it) | PRESENT |
| MODEL-0461 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0462 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0463 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0464 | §2.8 | glossary term, stated at §2.8 | PRESENT |
| MODEL-0465 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0466 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0467 | §2.8 | reference → §7.7 item 12 (binding key), §7.1 DossierRef (Dossier refs bullet, §2.8) | REFERENCED — home checked, states it |
| MODEL-0468 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0469 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0470 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0471 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0472 | §2.8 | stated at §2.8 | CONFLICT → VM-R0S-07; NEW-PROBLEM → VM-R0S-22 |
| MODEL-0473 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0474 | §2.3 | resolved (MC-04): `LifecycleEvent.cause` gains `convert:<kind>` (§2.8) | PRESENT |
| MODEL-0475 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0476 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0477 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0478 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0479 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0480 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0481 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0482 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0483 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0484 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0485 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0486 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0487 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0488 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0489 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0490 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0491 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0492 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0493 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0494 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0495 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0496 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0497 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0498 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0499 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0500 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0501 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0502 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0503 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0504 | §2.8 | stated at §2.8 | PRESENT |
| MODEL-0505 | §2.8 | reference → §7.7 (pointer, §2.8 Dossier paths) | REFERENCED — home checked, states it |
| MODEL-0506 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0507 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0508 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0509 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0510 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0511 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0512 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0513 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0514 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0515 | §2.9 | reference → §7.7 item 12 (types; Document.dossier comment points to the block bullet) | REFERENCED — home checked, states it |
| MODEL-0516 | §2.9 | reference → §8.2 (Document.style comment) | REFERENCED — home checked, states it |
| MODEL-0517 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0518 | §2.9 | reference → §11.3, V09 (view keys; which travel is §11.3) | REFERENCED — home checked, states it |
| MODEL-0519 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0520 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0521 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0522 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0523 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0524 | §2.9 | stated at §2.9 | WIRING → VM-R0S-24; WIRING → VM-R0S-25 |
| MODEL-0525 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0526 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0527 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0528 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0529 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0530 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0531 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0532 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0533 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0534 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0535 | §2.9 | reference → §7.7 (dossier events via the host door) | REFERENCED — home checked, states it |
| MODEL-0536 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0537 | §2.9 | reference → §7.7 item 12 (declared there; bullet kept as the block's home) | REFERENCED — home checked, states it |
| MODEL-0538 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0539 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0540 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0541 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0542 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0543 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0544 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0545 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0546 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0547 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0548 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0549 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0550 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0551 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0552 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0553 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0554 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0555 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0556 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0557 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0558 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0559 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0560 | §2.9 | reference → §13.2 | REFERENCED — home checked, states it |
| MODEL-0561 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0562 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0563 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0564 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0565 | §2.9 | reference → §13.2, §11.3 | REFERENCED — home checked, states it |
| MODEL-0566 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0567 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0568 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0569 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0570 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0571 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0572 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0573 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0574 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0575 | §2.9 | reference → §11.1, §6.3 (Formats bullet) | REFERENCED — home checked, states it |
| MODEL-0576 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0577 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0578 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0579 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0580 | §2.9 | stated at §2.9 | PRESENT |
| MODEL-0581 | §2 (plain words) | glossary term, stated at §2 (plain words) | PRESENT |
| MODEL-0582 | §2.1 | glossary term, stated at §2.1 | PRESENT |
| MODEL-0583 | §2.2 | glossary term, stated at §2.2 | PRESENT |
| MODEL-0584 | §2.2 | glossary term, stated at §2.2 | PRESENT |
| MODEL-0585 | §2.2 | glossary term, stated at §2.2 | PRESENT |
| MODEL-0586 | §2.5 | glossary term, stated at §2.5 | PRESENT |
| MODEL-0587 | §2.5 | glossary term, stated at §2.5 | PRESENT |
| MODEL-0588 | §2.5 | glossary term, stated at §2.5 | PRESENT |
| MODEL-0589 | §2.6 | glossary term, stated at §2.6 | PRESENT |
| MODEL-0590 | §2.6 | glossary term, stated at §2.6 | PRESENT |
| MODEL-0591 | §2.6 | glossary term, stated at §2.6 | PRESENT |
| MODEL-0592 | §2.8 | glossary term, stated at §2.8 | PRESENT |
| MODEL-0593 | §2.8 | glossary term, stated at §2.8 | PRESENT |
| MODEL-0594 | §2.8 | glossary term, stated at §2.8 | PRESENT |
| MODEL-0595 | §2.9 | glossary term, stated at §2.9 | PRESENT |
| MODEL-0596 | §2.9 | glossary term, stated at §2.9 | PRESENT |
| MODEL-0597 | §2.7 | glossary term, stated at §2.7 | PRESENT |
| MODEL-0598 | §2.6 | glossary term, stated at §2.6 | PRESENT |
| MODEL-0599 | §2.3 | glossary term, stated at §2.3 | PRESENT |
| MODEL-0600 | §2.6 | glossary term, stated at §2.6 | PRESENT |
| MODEL-0601 | §2.2 | glossary term, stated at §2.2 | PRESENT |
| MODEL-0602 | §2.8 | glossary term, stated at §2.8 | PRESENT |
| MODEL-0603 | §2.5 | glossary term, stated at §2.5 | PRESENT |
| MODEL-0604 | §2.5 | glossary term, stated at §2.5 | PRESENT |
| MODEL-0605 | §2.7 | glossary term, stated at §2.7 | PRESENT |
| MODEL-0606 | §2.2 | glossary term, stated at §2.2 | PRESENT |
| MODEL-0607 | §2.8 | glossary term, stated at §2.8 | PRESENT |
| MODEL-0608 | §2.7 | glossary term, stated at §2.7 | PRESENT |
| MODEL-0609 | §2.5 | resolved (MC-01): `lot` replaced by `plot` outside quotations; `BuildingInput.plot` | TERM → VM-R0S-30 |

## 4. Routed items

### 4.1 File f items (88 routed to model, and the §2 parts of three routed elsewhere)

| items | verdict |
|---|---|
| 202 | no §2 text (its homes §1.1, §4.11, §4.12, §7.7, PART III) — checked |
| 203, 204 | applied (sky parts ≥ 1, `nextSkyPart`, the sky part's levels in rule 1 with the void face, `rim`, `sky_access`) |
| 205, 206, 207, 208, 209 (b), 210, 211, 212, 213 | applied as written (§2.3–§2.5, §2.8's `core`/`outskirts` writers); 209 (a) is §4.11's |
| 214 | the `village` kind applied; its district-kind row ('every village class's affinity 1', one quarter, `village-ways`) is in no table — VM-R0S-16 (V11) |
| 215–243 | applied as written (wing roles and keys, massing, composed wing and tower bases, porch kinds, `shed`, the stage-3 contract and admission bounds, the entrance hint and its free-part revision, keys under stage 3 incl. `StairCore.tower`, the raised crypt and half raise, stacked and solid wings, the outline builder's constructions, rule 5's solid stack, the wall-side datum, the plan records, `R(s)`, `partName`, declared rooms, floor openings, hosted accesses, `Basement.crypt`, the tunnel frontage, `storeyRange`, `Entrance.storey`, the walk-out at a wall, the forced basement); 226's milestone note left as narration — VM-R0S-29 |
| 244, 245, 246 | applied (the raised-way record, support step, clearance, span rule with `country`, readers, source and lifecycle; `RetainingWall` with the stretch-state profile and `stepProfile`; deck plots and `DeckContext`); values cited to V11 (J-RM14, agreeing with V11 §3.24.2's name map); a stale '(cross-part note)' and a wrong home — VM-R0S-20, VM-R0S-19 |
| 247–259 | applied as written (tunnels, chambers, `ChamberKind` with `archVault`, systems' `ruin`/`variant`/`name`, link `cause`, `reusedBy`, span and monument, the island block citing V05 §2.1–§2.2, `fallen_island` and `fall`, `LandUse.source`, `pathway`/`underuseSince`, pin kinds, custom chain and service records, `PowerRelation` sign/hidden, the arc-classification rows, the culture specialisation) |
| 260 | applied (two record forms, one lift rule); the dry-run quote disagrees with V09's `info.remove.holds` — VM-R0S-33; the retired lead phrase — VM-R0S-37 |
| 261–265, 267, 269–278 | applied as written (per-rung inputs and `stale`, `room:` addresses, the outside ground, the registry additions, `why`, the village kinds, label/help, explainer, placement order, `product`/`hood`, `PlanReport`, the shade basis on load, the fields block, `Recipe.rung`, the view keys, `showUnexcavated`) |
| 266 | no §2 text (§4.11's paragraph) — checked |
| 268 | (a) applied but its rate clause dropped — VM-R0S-35; (b) (§4.11's `DeclineOp` members) not applied by pipeline — VM-R0S-24 |
| 286, 303, 313, 333, 362, 371, 459, 576, 578 | their §2 parts applied (`handedFrom`; `BuildingInput` fields and the court hole; `Greenery.along.way?`; stacked-wing check; `aqueduct` class; `storeyRange`, `Storey.level`, the ground wings, widened `external`; `docId`; `dist` at territory rungs; `basementDoor`) |
| 510 | no §2 text (§14 item 7's list) — checked |
| 575 | applied (E-01's stretch-state profile); g item 114's extension missing — VM-R0S-17 |
| 309 (pipeline), 335 (determinism), 429 (pipeline) | their §2 fields not applied: `Plot/Block.platformCm` — VM-R0S-20; `Household.transit` — VM-R0S-19; `Use.strain` — VM-R0S-06 |

### 4.2 File g items

| item | model part | verdict |
|---|---|---|
| 105 | `Use.branchOf` | present |
| 106 | closure `barrier`, anchors by stretch, `arcs`, `stretchClass`, `Gate.mouth`, `BarrierKind` | present (value meanings of `waterfront` lost — VM-R0S-02) |
| 109 | `ruin`, `variant`, link `cause`, `reusedBy` | present; `Terrain.mining` (g 109 (a) (2)) cited to §2.3 by §4.2 but undeclared — VM-R0S-20 |
| 110 | retaining walls, raised ways, deck plots, stacked/solid wings, ground parts ≥ 1 | present in §2.4–§2.7 and §2.9; the numbering home omits ground parts — VM-R0S-06; the raised way's feet undeclared — VM-R0S-22 |
| 111 | the oasis (spring, grove, garden, `fedBy`) and its lifecycle | present; the garden kind's name conflicts with §4.9 — VM-R0S-07; the well-yield raster — VM-R0S-20 |
| 112 | none routed | `cvdVariant` missing from §2.9's key list — VM-R0S-14 |
| 113 | `HistoryRecord`, `Provenance.symbolic`, the lost void | present; `HistoryHint`'s item-113 inputs — VM-R0S-21 |
| 114 | `Enceinte.condition`'s five values, each run's material and last-change epoch | **absent** — VM-R0S-17 |
| 115, 116, 119 | none named by the dated rulings | checked: no model part |
| 117 | §2.9 view state: the year position (week 0–51), the 'follow SettlementForge' flag | **absent** — VM-R0S-18 |
| 118 | §2.9 view state: festival display follow / off / preview | **absent** — VM-R0S-03 |

### 4.3 Canon rulings

* **Conflicts (14).** KXC-03 applied (rule 6). MC-01 applied except J-RM2's hinterland 'lots' (VM-R0S-30). MC-02 applied
  (every entity interface shows `lifecycle`; checked by script — the plan sub-records `Room`, `Wall`, `Opening`,
  `WindowRec`, `StairCore`, `Chimney`, `FurnitureItem` are no registry entities). MC-03, MC-04, MC-05, MC-06, MC-07,
  MC-08, MC-09, MC-10, MC-12 and V07-XCONF-2 applied. MC-11 applied at §2 (`Segment`, `Outfall`, `TypedBoundary`,
  `FabricStrategyId`, `DriftBounds`; V01, V02, V04 no longer declare them; V10's conversation record renamed
  `ClerkSegment`), but `FabricStrategyId` is re-declared at §4.12 (VM-R0S-26, VM-R0S-27) and `TableId` is declared nowhere (VM-R0S-13).
* **Elegance (5).** E-01 UNIFY — every item of its equivalence list found at §2.2 rule 5 and §2.7 (canonical form,
  write, read, regenerate with `retaining.settings.stateSnapCm`, cut/join, undo, migrate; the retaining wall's values,
  role, writers, restoration and readers; the enceinte's values, role, writers, lifecycle rules and §8.2 / §11.1
  readers); no nuance lost. The pre-existing gap of knot ordinals on a mid-chain write is VM-R0S-23. E-02 KEEP APART,
  E-15 UNIFY (`Cdeg` the one angle unit; every stored angle named `…Cdeg`), E-37 UNIFY (the 25-word `Unit` with V11's
  `lvl`/`weight`; V11 and V12 subsets), E-39 KEEP APART — applied.
* **Wiring (7).** W-HOOK-02, W-FLD-04, KWG-09 (E-15), MW-05 closed. W-FLD-05 closed at §2 but two of its named readers
  never read the field (VM-R0S-08). W-FLD-06 and W-FLD-13 closed at §2 only; the other ends are missing (VM-R0S-09,
  VM-R0S-10, VM-R0S-11, VM-R0S-12).
* **Open findings (44).** MODEL-RESTATEMENTCLUSTERS-001–014 each stated once with the others citing (001 at §2.1 once
  ground parts are added, VM-R0S-06); MC-01–12 as above; MW-01–05 closed; MB-01 ('(R12)') removed; MB-02–MB-13 declared
  (`EditRef`/`RuleRef` conflict with §4.12 — VM-R0S-05).
* **Agreement (12).** `FabricStrategyId` (VM-R0S-26), `TypedBoundary`, `DriftBounds` cited by V01/V02; `BaseWing`,
  `BuildingInput.plot` (no `lot` left in any volume); `PathShapeRow` = V02's `MassingFamilyRow`; `SkyIsland` (V05 §2.1
  declares it with `rim`/`land`); `ContextVector.arena` `'sky'` (V05 §1b cites it); `TableId` (VM-R0S-13).
* **Retired terms.** 35 patterns run: G-lot 4 hits (two quotations kept, two hinterland 'lots' — VM-R0S-30); G-suppress
  1 (VM-R0S-37); G-unitinput, G-standalone, G-stairway hits are the kept senses; G-shadows 0 (the shadow pass now
  'projected shadows'); all others 0.

### 4.4 Edges and combinations routed to model

| edge | verdict |
|---|---|
| M-model-943-E5 (ways: missing, empty, contradictory data) | DEFINED at §2.4 *Missing and contradictory data*; tested by T77-1's removed-partner clause (§13.2) |
| M-model-943-E8 (ways: save, load, undo, redo, regenerate, migrate) | DEFINED; tested by §13.2 *Document tests*' registry path test (O11 a) |
| EI-MC-05 (a sky plot's arena) | DEFINED (`ContextVector.arena` `'sky'`) |
| EI-MC-09 (capacity 0 vs the ≥ 1 clamp) | DEFINED (capacity bounds; `unhoused`) |
| C-raised-frame, C-retaining-frame, C-deckplot-frame | DEFINED (§2.7 *At the frame*) and TESTED (T110-1, T110-2, T110-5) |
| new: a stretch-state write inside an existing run (knot ordinals vs §3.10's hard ordinal-order row) | UNDEFINED — VM-R0S-23 |

### 4.5 Cross-part notes addressed to model

| from | note | verdict |
|---|---|---|
| V01 | §2.5 declares `TypedBoundary`, `FabricStrategyId`, `BlockKind`, `SquareType`, `SeamRun` | closed |
| V02 | deck-plot landmark and deck-plot suppression at the base homes | closed |
| V03 | §2.6 step 4 cites V03 §2.4's `moduleCm` without the value | open — VM-R0S-35 |
| V05 | no text change (the block cites V05 §2.1–§2.4) | closed |
| V06 | (a) `Use.strain`, `Household.transit`; (b) g 114 values; (c) `HistoryHint.peak`; (d) `spring.flow`'s writers; §2.8 quote cites `info.remove.holds`; `repairWall`'s no-op | (a) open — VM-R0S-06, VM-R0S-19; (b) VM-R0S-17; (c) VM-R0S-21; (d) §2.3 names 'volume 6's failing spring' (closed); the quote — VM-R0S-15; the `repairWall` no-stretch no-op is V06 §2.8's (checked; §2.7 states the lift) |
| V07 | g 114 values | open — VM-R0S-17 |
| V08 | `HistoryHint` item-113 fields | open — VM-R0S-21 |
| V10 | g 117/118 view keys | open — VM-R0S-18, VM-R0S-03 |
| V11 | `Unit` includes `lvl`, `weight` | closed |
| determinism | oasis records in §2.3; closure generators for `drawChamber { newKind }` and the fountain; `nextSkyPart`'s migration default; custom records | closed (the closure pieces are §7.3 item 9's `ClosureRecord`, the migration default §7.5's table) |
| kernel | 1 rule 4 as pointer; 2 KXC-03; 3–4 ground parts in `PlatKey` and rule 1; 5 the raised way's feet; 6 knot renumbering; 7 E-15; 8 §2.6 homes; 9 `LatticeSpec` values | 1, 2, 7, 8, 9 closed (rule 4 is one sentence with its pointer); 3–4 open — VM-R0S-06; 5 open — VM-R0S-22; 6 open — VM-R0S-23 |
| pipeline | `Terrain.mining`, `WaterBody.spring`, a well-yield raster; `Plot/Block.platformCm`, `compactnessMin`'s reader, `venueMix`'s producer, `dist` at villages; `slopeP95`, `surface`; `BuildingInput` fields; `HistoryHint` peak, `symbolic`, `Person.key.bornWeek`, `Use.strain`, `garden_irrigated`, `SkyIsland.slot` | spring, `dist`, `slopeP95`, `surface`, `BuildingInput`, `symbolic`, `slot` closed; `compactnessMin` and `venueMix` declared (their reader/producer lines are pipeline's); mining, well yield, platform datums, `bornWeek` — VM-R0S-20; `HistoryHint` — VM-R0S-21; `Use.strain` — VM-R0S-06; the garden name — VM-R0S-07 |
| rendering | `cvdVariant`, `showUnexcavated`, `roomNumbers`, `docId`; `walkCm`'s reader §11.1 glTF | `cvdVariant` open — VM-R0S-14; `walkCm` — VM-R0S-08; the rest closed |
| scope | `Rung` at §1.1, T77-1's clause, T110 frame clauses, the registry path test's cases | closed (`type Rung` at §1.1; T77-1; T110-1/2/5; §13.2 *Document tests*) |

## 5. Issues

| id | severity | kind | owner | claim | required change |
|---|---|---|---|---|---|
| VM-R0S-01 | blocker | NUANCE-LOST | model | §2.6 rule 4 (*Check*, the carry's cost) cut the archived sentence 'On an assumed core mix — 55 % row quads, 25 % one-wing houses, 18 % tiled, 2 % overlapping — 450 buildings, §12.6's district ceiling and about what a 150 m brush (≈ 7 ha) covers in a dense CITY core, cost ≈ 0.4 ms per pass and ≈ 3.6 ms in the worst case of a step and eight halvings, inside §12.6's warp Apply budget, which counts it' to 'The per-pass and worst-step totals on an assumed core mix … are §12.6's'. §12.6's warp line states 0.4 ms / 3.6 ms and 450 buildings 'on an assumed core mix' but not the mix (55/25/18/2 %) nor the 150 m brush ≈ 7 ha basis; the constants are now stated nowhere in the set (grep over the base, rationale and volumes). | Restore the assumed core mix in §2.6 rule 4's cost sentence: 'The per-pass and worst-step totals — on an assumed core mix of 55 % row quads, 25 % one-wing houses, 18 % tiled and 2 % overlapping compositions over 450 buildings (§12.6's district ceiling, about what a 150 m brush, ≈ 7 ha, covers in a dense CITY core) — and M3a's measurement with its pre-decided fallback are §12.6's' (or have §12.6's warp line state the mix and the brush basis and keep the pointer). |
| VM-R0S-02 | major | LOST | model | §2.7 `Enceinte.waterfront`'s comment lost the meaning of its three values: the archive's 'open (MFCG's default and FTG's captured open chain: no wall along quays and beaches), quay_wall (a wall along the waterfront) or sea_wall (a full wall)' became g item 106 (d)'s derivation only ('open by default; quay_wall with sea gates where …; sea_wall only by preset or request'). §4.4 S5a's live text lost the same definitions, so what a quay_wall and a sea_wall build is stated nowhere in the set (grep 'a full wall', 'wall along the waterfront', 'no wall along quays' over base and volumes: 0 hits). The mapping table marks MODEL-0403 'stated at §2.7'. | §2.7 `Enceinte.waterfront` comment: keep g item 106 (d)'s derivation and restore the value meanings — "'open': no wall along quays and beaches (MFCG's default; FTG's captured open chain); 'quay_wall': a wall along the waterfront, with sea gates; 'sea_wall': a full wall; open by default, quay_wall where … (§7.7 DR2; g item 106 (d)), sea_wall only by preset or request; the preset row overrides; where the water gates stand is §4.4 S5a's" (§4.4 then cites §2.7 for the meanings). |
| VM-R0S-03 | major | F-MISSING | model | g item 114's model part is absent from §2.7: `type WallCondition = 'standing'\|'breached'\|'dismantled'` lacks `worn` and `patched`, and no run records its material (robust or a patch row) or the epoch of its last change. The canon's dated ruling routes to model: '§2.7 Enceinte.condition — the values standing · worn · patched · breached · dismantled on item 575's knot profile; each run's material (robust or a patch row) and the epoch of its last change'. | §2.7, as new design at build depth: `type WallCondition = 'standing'\|'worn'\|'patched'\|'breached'\|'dismantled'` with each value's meaning (g 114 (b): worn weathered, parapet broken, still a wall; patched a former gap closed in a patch material; breached a gap with rubble; dismantled a gap for good); per-run material and last-change epoch as stretch-state data on the same knot mechanism (§2.2 rule 5) — e.g. `conditionRuns?: { material: 'robust' \| string /* a V11 patch row key by wall kind and culture */; sinceEpoch: number }[]` keyed by the `wall_state_knot` ordinals, or a second step profile `conditionMaterial` on its own knot role with the epoch — with writers (V06 §3.7's transitions, `repairWall`'s material, §7.7's generation-time derivation row from readiness and wealth, item 113's replay), readers (§8.2's state rows, §11's exports, V10's story, V09's legend), persistence, regeneration, undo and migration (absent reads 'robust', epoch unknown = the document's first epoch); §2.2 rule 5's stretch-state profile list and *An enceinte's condition by stretch* updated (worn and patched count as standing for the enclosed and sealed tests; breached and dismantled as gaps). |
| VM-R0S-04 | major | F-MISSING | model | g item 117's model part is absent from §2.9's view state: the view keys list only `season` (the four named seasons) and `week` (item 67's drawn campaign week); there is no year position (a week of the year 0–51, spring first, SettlementForge's grid) and no 'follow SettlementForge' flag. The canon routes to model: '§2.9 view state (the year position, week 0–51; the "follow SettlementForge" flag)'. | §2.9 *What the snapshot holds* view keys: add `yearWeek` (0–51, spring first, SettlementForge's calendar grid; the four `season` names are picks of their middle weeks; standalone default midsummer) and `seasonFollow` (boolean; default true when a dossier from a campaign is attached: the year position then reads the dossier's current week through §7.7's derivation row; a user pick sets it false; 'follow SettlementForge' sets it true), per viewer, outside every digest, never read by the model (g 117 (a)); state how `season` and `yearWeek` relate (season derived from the year position, kept as a key only for migration: an older document's `season` maps to its middle week) and that item 67's `week` (the Works' drawn week) is a different key. |
| VM-R0S-05 | major | F-MISSING | model | g item 118's model part is absent from §2.9's view state: no festival display key (follow / off / preview a festival id). The canon routes to model: '§2.9 view state (festival display: follow / off / preview a festival id)'. | §2.9 view keys: add `festival` = `{ mode: 'follow' \| 'off' \| 'preview'; id?: string /* a festival id from the dossier's `traditions` or, standalone, a generic festival row */ }` — default 'follow' (decorations show while the year position falls in a scheduled festival's window, g 118 (b)), per viewer, outside every digest, never read by the model or its hash; name its readers (§8.2's decoration rows, §11's exports, V09's festival switch). |
| VM-R0S-06 | major | COHESION | model | §2.1 *Arena parts* — which the `PlatKey` comment names as the numbering home ('numbering: §2.1 Arena parts') — lists the ground, the underground's parts and the sky's parts and names only `nextUndergroundPart` and `nextSkyPart` as the never-decreasing counters; it omits g item 110 (b)'s ground arena parts ≥ 1 (a raised way's deck, 'allocated once and never reused, as the underground's and sky's parts are') and `Document.nextGroundPart`, which §2.4, §2.7, §2.9 and §3.4 rely on. The `PlatKey` comment likewise reads 'part 0 = the ground' with no ground parts ≥ 1, and §2.2 rule 1 ('The other arenas take the same five views') and rule 2 (the arenas that never share topology) name no raised ground part, so the home disagrees with the rest of §2 and with J-RM3's claim that §2.1 and §2.2 carry it. §3.2 (9) cites '§2.2 rule 1: … each raised part of the ground layer, §3.4' for the parts whose outer ring is the frame with its margin and whose `margin` rows sit on their own record, and §3.4 cites '§2.2's `PlatKey`' for the numbering — both land on text that names no raised part (the kernel's cross-part notes 3 and 4 asked for exactly these lines). | §2.1 *Arena parts*: add 'and, on the ground layer, one part per raised way's deck from 1 (g item 110 (b); §2.7 *Raised ways*): ground part 0 is the ground itself' and name the three counters `nextUndergroundPart`, `nextSkyPart`, `nextGroundPart` in the never-reused sentence; `PlatKey` comment: 'ground part 0 = the ground; ground parts ≥ 1 = one arena per raised way's deck (§2.7)'; §2.2 rule 1 gains a bullet *A raised ground part* (g item 110 (b)): L0 its outer ring — the ground's frame plus its context margin, `margin` rows on the raised way's own record, growing with the frame by §3.2 (9) — and the land face inside it; L1 the deck's spine (`way`); L2 its band by `corridorUnion` (§3.7), as §3.4 states; no L3–L4 and rule 2 names raised ground parts among the arenas that share no topology (as §3.10's arena-isolation row already does). |
| VM-R0S-07 | major | CONFLICT | pipeline | `EditRef` and `RuleRef` are declared twice in the base with different shapes: §2.8 (the home MB-12/MB-13 give model) `type EditRef = { seq: number }` and `type RuleRef = { rule: string /* the rule's home: a stage, §4.11's ladder row or conversion kind, a DR row */ }`, and §4.12 `type EditRef = { seq: number … }; type RuleRef = SliceRef /* the rule row that caused it, §2.8 */`. `LifecycleEvent.cause`, `DesignationMutator.mutate`'s cause and V06's `MutationPlan.cause` read one type; the persisted lifecycle cannot have two shapes for it. | §4.12: delete its `type EditRef` and `type RuleRef` declarations and cite §2.8 ('EditRef, RuleRef (§2.8)'); if the pipeline needs the rule row's slice, it states that as `RuleRef` plus the provenance's `SliceRef`, not a second RuleRef. |
| VM-R0S-08 | major | F-MISSING | model | File f item 429's part (a) edits the `Use` record in §2.7 ('insert before `lifecycle` V6 §2.9's `strain?: { kind: 'demand'\|'supply'; sinceWeek: number }` (model data; written by the use step and by `setAttr`)'), and its part (c) makes §4.11's use step close a use by 'its `strain` (§2.7)'. The canon routed the item to pipeline (its §10.2 section), so no rewrite applied the §2.7 part: the live `interface Use` has no `strain`, while §2.8's registry already lists `Use.strain` (`setAttr`) — a registered path with no field. | §2.7 `interface Use`: add before `lifecycle` `strain?: { kind: 'demand'\|'supply'; sinceWeek: number } /* item 17's use step memory (V06 §2.9): written by §4.11's use step and by setAttr; read by the use step's close rule (closeAfterYears / starveAfterYears, §10.2's UseRuleRow); absent: no strain (migration) */`. |
| VM-R0S-09 | major | F-MISSING | model | File f item 335's part (a) adds to §2.7's `Household` the optional field `transit?: { cause: 'fire'\|'flood'\|'topple'\|'contraction'\|'works'\|'island'\|'void'\|'clearance'\|'redevelopment'; since: number /* week */ }` (epoch-local, never in a snapshot); the canon routed the item to determinism (§5.3), whose Works row now reads `Household.transit`, but no rewrite applied the §2.7 part: the live `interface Household` has no `transit`, so §5.3's stage-end check reads an undeclared field. | §2.7 `interface Household`: add `transit?: { cause: …as BCR-V6-17 lists…; since: number /* week */ } /* epoch-local: written by the batch of an epoch event that displaces the household, cleared by the batch that places it, never present after the epoch's last batch — so never in a snapshot or a saved model (V06 §2.1's ledger; §5.3's Works row) */`. |
| VM-R0S-10 | major | WIRING | model | Other base parts write and read fields they cite to §2 that §2 does not declare (dangling inputs): `Terrain.mining` ('S1 records it as `Terrain.mining` (§2.3), which II.7.6's cavern rule reads'); the `SiteResources` well-yield raster ('well yield (item 111 (b))' among S1 (10)'s rasters, read by S3's water pull, §4.5's water term and S10b's wells — §2.7's `SiteResources` holds only ore, stone, timber, fish, clay, fertile); `Plot.platformCm` and `Block.platformCm` ('A levelled unit is a platform datum (`Plot.platformCm`, `Block.platformCm`, §2.5)', read by `levelledGroundCm`); `Person.key.bornWeek` (§10.3: 'a successor's with its `bornWeek` (§2.7…)'; §2.7's `Person.key` is `{ household; ordinal; bornEpoch }`). Each is persisted model data with a writer and readers but no schema field, lifecycle or migration row. | Declare each at its §2 home with writer, readers, lifecycle and migration: §2.3 `Terrain.mining: boolean /* item 109 (a) (2): written by S1 (10) with the resources, read only by II.7.6's cavern rule; false on a sky island and in the parity presets; absent reads false */`; §2.7 `SiteResources.wellYield: Float32Array /* item 111 (b): 0..1 per cell from the ground class by V11's water table — S1 (10); read by S3's water pull, §4.5's water term, S10b's wells */`; §2.5 `Plot.platformCm?: Cm` and `Block.platformCm?: Cm /* item 110 (a): the levelled unit's platform datum — written by S10 (block, ward) and S11 (plot), read by levelledGroundCm (§4.7); absent: not levelled */`; §2.7 `Person.key` gains `bornWeek?: number /* a successor's birth week (§10.3); a founding member's absent */`. |
| VM-R0S-11 | major | CONFLICT | model | V08 §3.15 (2) types item 113's additions to `HistoryHint` — `founding?`, `events`, `tiers`, `population`, `calamities`, `lifecycle?`, `ancientFall?`, `peak?` — 'which model §2.7 carries', and the port writes them into `Recipe.history`; but §2.7's `HistoryHint` still declares only `ageYears` and `scars`. The record's home (§2.7, 'filled by V08' per W-HOOK-02) and the volume disagree on its fields, and §4.11's history-first generation and DR36–DR39 read fields the base record lacks (the pipeline and V06 cross-part notes ask the same). | §2.7 `HistoryHint`: add V08 §3.15 (2)'s fields (or one line 'plus the item-113 fields V08 §3.15 (2) types: founding, events, tiers, population, calamities, lifecycle, ancientFall, peak') with their writer (the port's creation; standalone, S0's history option fills `peak`) and readers (DR36–DR39, §4.11's history-first generation, II.7.6's buried former settlement), and keep `ageYears` and `scars` with their readers. |
| VM-R0S-12 | major | CONFLICT | pipeline | The oasis's irrigated garden has two names for one land-use kind: §2.7 declares `LandUse.kind` `'garden' /* item 111: an oasis's irrigated garden */` (with `fedBy`), while §4.9 has S12a site '`garden_irrigated` land-use faces (§2.7)'. A face written as `garden_irrigated` fails §2.7's enumeration, and §2.3's oasis paragraph, §8.2 and the exports read `garden`. | §4.9: write the kind as §2.7 declares it — 'irrigated gardens — `garden` land-use faces with `fedBy` (§2.7)' — and drop `garden_irrigated` wherever the pipeline part uses it. |
| VM-R0S-13 | major | WIRING | model | §3.4 makes a raised way's two feet the second record that joins two parts ('a raised way's two feet, where its ramps or stairs meet part 0, each a vertex on part 0 and one on the raised part … Each end names its part (`{ part; at }`), so `resolve` reads it with that part's key') and §3.10's stored-references row checks 'a raised way's two feet each in the part its end names'. §2 declares no such ends: `RaisedWayRecord` (§2.7) has no feet field, §2.2 rule 7's registry has no vertex role for a foot (only `link_end` for `UndergroundLink`), §2.2 rule 2's list of cross-arena links omits it, and §2.8's `Identity.key` comment names only `UndergroundLink` as the entity whose vertices lie in two parts. The kernel resolves and checks references §2 never defines (a dangling input). | §2.7 `RaisedWayRecord`: add `feet: [{ part: 0; at: VertexRef /* ('raised_foot', way id, 0) */ }, { part: number; at: VertexRef /* ('raised_foot', way id, 1) on the raised part */ }]` (or the pairwise form §3.4 states), written by the raised-way generator and by a declared way's operator, re-placed by the way's re-derivation one transaction per part (§3.4); §2.2 rule 7: add the indexed vertex role `raised_foot` (as `link_end`); §2.2 rule 2 and §2.8's `Identity.key` comment: name the raised way's feet beside `UndergroundLink` as the records whose vertices lie in two parts. |
| VM-R0S-14 | major | EDGE-UNDEFINED | model | §2.2 rule 5's stretch-state *Write* places a knot at each end of a written stretch, which on an existing profile falls between existing knots, but never says which ordinal the new knot rows take or how the later knots are renumbered; §3.10 checks as a hard invariant at stage end and save that 'every ChainProfile's knots lie on its chain in ordinal order', and `splitThrough` asserts an indexed row carries its ordinal. A mid-chain write (a breach of one run of a wall, a landfall over part of a retaining wall) therefore has no defined ordinal outcome and can fail the check (E_INVARIANT). | §2.2 rule 5, *Write*: 'the writer adds its knots by `splitThrough` (or on the existing vertex it lands on) and drops knots by `removeEdges` on their `VertexRef` (§3.4), then, in the same batch, renumbers the record's knot rows from 0 in chain order (strip and re-add, as J-K23's `rekey` renumbers), so §3.10's ordinal order holds after every write'; add the case to the E-01 test bar (a write inside an existing run, T-… in §13.2). |
| VM-R0S-15 | major | F-MISSING | pipeline | File f item 268 (b) adds to §4.11's `DeclineOp` the member `{ op: 'retireWay' \| 'effaceWay' \| 'reopenWay'; way: Id }` (a land-class way on ground part 0 at a village rung; never on a deck, a ford or a raised part). §2.8's decline hooks (applied from 268 (a)) and §7.1's village `convert` list cite 'DeclineOp's retireWay, effaceWay and reopenWay (§4.11)', but §4.11's `type DeclineOp` has no such member, so the hollow-way ladder's writer is undeclared. | §4.11 `type DeclineOp`: add after the retaining and deck members '\| { op: 'retireWay' \| 'effaceWay' \| 'reopenWay'; way: Id }   // a way of a land class on ground part 0 at a village rung (V07 §3.12): retire — in use → abandoned (a hollow way); efface — abandoned → decayed; reopen — a hollow way back to built, regrowth first; issued through the product's epoch rows (V06's ProductDeclEpoch.rows) or by hand through convert; never on a deck, a ford or a raised part'. |
| VM-R0S-16 | major | F-MISSING | V11 | File f item 214 adds the `village` district kind (applied: §2.5's `DistrictKind` list) 'and the district-kind table gains its row: every village class's affinity 1, `fabric: 'village-ways'`, one quarter'. The district-kind rows live in V11 §3.9 (`roster.districtKinds`, row 18), which has no `village` row; 'affinity 1' for the village classes is stated nowhere in the set (grep 'affinity 1': 0 hits in the base, V07, V11), so S7b (1)'s and §4.5's affinity reads have no row for the village district. | V11 §3.9: add the `village` row — relations none; `affinity` weight 1 for every village class tag (V07 §2.2's classes); its label and icon — with a note that V07 §3.7 (VS5) sets its one quarter and `fabric: 'village-ways'` on the district; §2.5's kind comment then cites V11 §3.9's row. |
| VM-R0S-17 | minor | CONFLICT | model | `FabricStrategyId` is declared twice in the base with different meanings: §2.5 (MC-11's home) `type FabricStrategyId = string; // a row key of V01's hood.templates table: 'bent-cut' …, 'street', …, 'park'`, and §4.12 `type FabricStrategyId = 'bent-cut' \| string /* the registered fabrics: BentCutFabric; V01's TemplateFabric rows; V07's 'village-ways' */`. The village district's `fabric` is `'village-ways'` (V07 §3.7, f item 214's district-kind row), which is no hood.templates row, so §2.5's definition (and `District.fabric`'s comment 'a hood.templates row id') contradicts V07 and §4.12; §14's `DistrictContext` comment repeats §2.5's narrower reading ('FabricStrategyId is a row key of hood.templates (V01 §2.1)'); §2.5's closing clause 'a later row is a registration' leaves open whether V07's registered `FabricStrategy` counts as a hood.templates row. | §2.5: define `FabricStrategyId` as the id of a registered `FabricStrategy` — 'bent-cut' (the base's own), each row key of V01's `hood.templates` (list kept) and V07's 'village-ways' — and make `District.fabric`'s comment 'a registered fabric id: a hood.templates row (V01 §2.2) or V07's village-ways'; pipeline removes §4.12's second declaration and cites §2.5; scope's §14 comment cites §2.5 (see the pipeline and scope issues). |
| VM-R0S-18 | minor | CONFLICT | pipeline | §4.12 re-declares `type FabricStrategyId` (line after `RuleRef`) although MC-11 made §2.5 its one home; two declarations of one type break principle (1) and currently disagree (see the model issue on §2.5's definition). | §4.12: delete the `type FabricStrategyId = …` line and, where the interfaces use it, cite 'FabricStrategyId (§2.5)'. |
| VM-R0S-19 | minor | BROKEN-REFERENCE | model | §2.7 *Raised ways*, *Source and lifecycle*: 'The aqueduct's need test, delivery points (`terminal.at`, `feeds`) and the cistern rule's reading of them are §4.5's and II.7.6's.' The need test is stated at §4.3 (S4 Backbone: 'an aqueduct (water) where the city's water need … is unmet') and II.7.6's Vaults bullet cites it as '(§4.3)'; §4.5 (S6 districts, S7b) holds none of it. | Replace '§4.5's and II.7.6's' with '§4.3's (the need test) and II.7.6's (the cistern rule, which reads the delivery points)'. |
| VM-R0S-20 | minor | NEW-PROBLEM | model | §2.7 *At the frame* ends 'Tests: item 110 (f)'s bars in §13.2 carry the frame clause for each (cross-part note).' — rewrite-lane disposition talk left in the design text (principle (5)); §13.2 now carries the clauses (T110-1, T110-2, T110-5). | Replace the sentence with 'Tests: §13.2's T110-1 (a retaining wall ending on the outer ring), T110-2 (a raised part at the frame) and T110-5 (a deck slot left out and re-offered).' |
| VM-R0S-21 | minor | BROKEN-REFERENCE | V12 | V12's register row for V04's span-rule constants reads '(row 80; V11 §3.24.2's name map; their values in §2.7, item 244, from V04's request BCR-V4-45)'; after the coherence rewrite §2.7 cites the cells without numbers (J-RM14) and V11 §3.24.2 states the values once ('the base and V04 cite the cells'). | V12: 'their values in V11 §3.24.2 (row 80; the base's §2.7 support step and span rule and V04 cite the cells)'. |
| VM-R0S-22 | minor | NEW-PROBLEM | model | §2.8's new declaration line `type RuleRef = { rule: string /* … */ };   //` ends with an empty `//` comment — a stray fragment left by the rewrite in normative code. | Drop the trailing `//` on the `RuleRef` line. |
| VM-R0S-23 | minor | WIRING | model | §2.7 `Enceinte.walkCm`'s comment names its ends as 'written by S7 (§4.8); read by §11.1's VTT and glTF wall tops and §8.3's close-up wall symbol', but only §11.1's 3-D (glTF) row reads it ('a curtain wall's top carrying its walk (`Enceinte.walkCm` wide)'); §11.1's VTT row, §8.3 and §4.8 never name the field, so two of the three named readers and the writer are one-ended claims (W-FLD-05 asks both ends written). | §2.7: name only ends that exist — 'written by S7 from the era row (§4.8); read by §11.1's glTF wall tops' — or, if the VTT wall and §8.3's close-up symbol are meant to read it, have rendering add `Enceinte.walkCm` to §11.1's VTT row and §8.3's close-up wall symbol and pipeline add it to S7's writes in §4.8 (the other ends of W-FLD-05). |
| VM-R0S-24 | minor | WIRING | determinism | §2.9 `Recipe.presetId` now names its readers 'the generation report's recipe line (§5.4) and the reader's recipe panel (V09)', but §5.4's `GenerationReport` has no recipe line and never names `presetId` (no 'recipe' or 'preset' in §5.4): the base end of W-FLD-06 is missing, so the field stays an orphan. | §5.4: add to `GenerationReport` a recipe line — e.g. `recipe: { presetId?: string /* Recipe.presetId (§2.9): 'made from preset …' */; rung: Rung; seed: … }` — and name `Recipe.presetId` as its source (the other end of J-RM13). |
| VM-R0S-25 | minor | WIRING | V09 | §2.9 names V09's recipe panel as a reader of `Recipe.presetId`, but V09 never names `presetId` (grep over V09: 0 hits), so the volume end of the link is missing. | V09's recipe panel (the section that lists the map's recipe) gains the line 'made from preset <name>', read from `Recipe.presetId` (§2.9), absent when the recipe names none. |
| VM-R0S-26 | minor | WIRING | pipeline | §2.5 `Block.depthClass` is now 'S8's deep-interior test (§4.6) … written with `interior`', but §4.6's deep-interior rule never names `depthClass` (the field appears nowhere in the base but its declaration), so its writer end is missing. | §4.6 *The deep-interior rule*: 'S8 writes `Block.depthClass` — `deep` where, as recursion stops, the block's local thickness exceeds twice its band's plot depth, else `standard` — with `interior` (§2.5)'. |
| VM-R0S-27 | minor | WIRING | scope | §2.5 `Block.depthClass` names '§13.5's keep-test (the court share of deep blocks within band per class)' as its reader, but §13.5 never names `depthClass`, so the reader end of W-FLD-13 is missing. | §13.5's court-share keep-test: 'over the blocks whose `Block.depthClass` is `deep` (§2.5), the share whose `interior` is `court` lies within the band row's target per class'. |
| VM-R0S-28 | minor | BROKEN-REFERENCE | model | Five volume citations in §2 continue with a bare §x.y, which the set's citation rule (G-cite: 'Vnn §x.y …; the base is bare §x.y') reads as a base section, so each lands on the wrong base section: `Porch.kind` '(V02 §2.2, §3.7; …)' (base §3.7 is the kernel's booleans; V02 §3.7 is meant); `Enceinte.pathway` '(V06 §2.7, §3.7)'; the registry's explainer '(V10 §2.13, §3.9)'; the village kinds '(V07 §2.6, §4.4, §5.4)'; the stage-3 hook 'as V02 §3.3–§3.5 state'. | Write each volume section in full: 'V02 §2.2, V02 §3.7'; 'V06 §2.7, V06 §3.7'; 'V10 §2.13, V10 §3.9'; 'V07 §2.6, V07 §4.4, V07 §5.4'; 'V02 §3.3 – V02 §3.5'. |
| VM-R0S-29 | minor | NEW-PROBLEM | model | §2.6 *Basements* carries change-request application narration inside a normative sentence: '… a raised choir over it; BASE with the basement gate — applied before the milestone that builds it, no document shifts, else one declared shift, J-S23.2)'. 'Applied before the milestone' describes how the request is applied to the text, not the design (principle (5)), and J-S23.2 is a seam-critique id (docs/volumes/critique/seam-stage2-3-r*.md) that resolves in no design or rationale file. | Replace the clause with the design fact: '… a raised choir over it); the half raise ships with the basement gate (M2b; §16), so no document's datum shifts' — the declared-shift alternative, if kept, goes to §13.3's declared-shift list, not §2.6 — and drop the J-S23.2 citation. |
| VM-R0S-30 | minor | TERM | model | §2.2 rule 1's L3 line keeps 'the hinterland's furlongs, lots, woods, driveways and trails' and §2.7 `LandUse.face` 'furlongs, lots, woods (§4.9)' under judgment call J-RM2 ('a hinterland holding (§4.9's weighted-Voronoi lots), not G-lot's building parcel'). But §4.9 calls the weighted-Voronoi outputs 'outside plots' (buildings stand on them: 'The unit's S10b places the allocated outside classes … on the outside plots'), pipeline's §4.1 rewrote its own copy of the list to 'the hinterland's furlongs, plots, driveways, trails, orchards', and the canon's G-lot count for model (line 593 among them) included this line. The retired 'lot' survives and §2 now disagrees with §4.1 on the same list. | §2.2 rule 1: 'the hinterland's furlongs, outside plots, woods, driveways and trails' (as §4.1 and §4.9 read); §2.7 `LandUse.face`: 'L3 faces — inside the hinterland's blocks: furlongs and woods (§4.9; the outside plots are Plot records) — …'; withdraw J-RM2 from the rewrite's record. |
| VM-R0S-31 | minor | BROKEN-REFERENCE | determinism | MC-11 rules 'every type a base record uses is declared in the base: … TableId (§7.6)'. `TableId` is used by §2.8's `SliceRef.table`, §2.9's `Recipe.tablePins`, §7.1's `editTable` and §10's `tablePatch`, but no `type TableId` exists anywhere in the base or the volumes (grep 'TableId *=' and 'type TableId': 0 hits). | §7.6: declare `type TableId = string /* a table's registry id (the table registry of §7.6; V11 §2.1's rows): the key every SliceRef, tablePin and editTable names */` beside the table registry, and have V07 and V11 cite it (MC-11's cross-part note). |
| VM-R0S-32 | minor | COHESION | model | §2.9's *What the snapshot holds* is the list of view keys ('the keys of "View state" below'), but it omits `cvdVariant`, the per-viewer colour-deficiency variant key §8.2 and §13.2 read (g item 112; rendering's cross-part note asks §2.9 to list it). | §2.9 view keys: add `cvdVariant` (`'none'\|'protan'\|'deutan'\|'tritan'`, per viewer, default 'none': the checked colour-deficiency variant of the sheet, §8.2; g item 112). |
| VM-R0S-33 | minor | CONFLICT | model | §2.8's suppression bullet quotes the delete dry run as '"The city will not rebuild this aqueduct; undo brings it back"', §7.1 quotes 'the town will not rebuild this aqueduct; undo brings it back', and the message's home, V09's catalogue key `info.remove.holds`, reads 'The town won't {rebuild \| raise} this {kind}; undo brings it back.' Three texts for one message; §2.8's says 'city'. | §2.8: replace the quote with a pointer — 'The delete's dry run names the suppression in plain words (V09's `info.remove.holds`, `info.remove.holds.deck` for a deck plot; §7.1)'. |
| VM-R0S-34 | minor | RESTATEMENT | model | §2.6 plan rung step 4 restates the wing-local module's value — 'a table row, default 50 cm' — whose one home the canon gives V03 §2.4's `PlanGeometryRow.moduleCm` ('every other place cites it'; V03's rewrite note asks §2.6 to cite it without the value). | §2.6 step 4: 'Cuts are planned on a wing-local module — V03 §2.4's `moduleCm` — …' (value dropped). |
| VM-R0S-35 | minor | F-MISSING | model | §2.8's decline hooks carry f item 268 (a)'s hollow-way ladder but drop its clause '… by `DeclineOp`'s `retireWay`, `effaceWay` and `reopenWay` (§4.11), the decline step's street candidate striking at the street layer's rate per year (§4.11 *The clock* (5))' — the rate at which ways are retired is stated nowhere in §2.8 (grep 'street candidate', 'street layer's rate': 0 hits in the base). | §2.8 decline hooks, after '(§4.11)': ', the decline step's street candidate striking at the street layer's rate per year (§4.11 *The clock* (5))' — and pipeline confirms §4.11 *The clock* (5) states that rate. |
| VM-R0S-36 | minor | NEW-PROBLEM | model | Change-request and critique ids remain in §2's design text, against the rewrite's own rule J-RM16 and principle (5): `RaisedWayRecord.supports.state` '/* V06's decline (BCR-V6-26) */' and §2.7 *Deck plots* '`repairRaised` restores its former existence from the op's undo record (V06 BCR-V6-26)'. BCR-V6-26 is a request id (file f item 291 carries it), not a home. Likewise `District.fabric`'s comment ends '(V1C-39)' and `Block.overrides`' '(…; V1C-20)', volume-critique ids introduced by the rewrite (the archive's §2 cites no V1C id). | Cite homes instead: '/* V06's decline (V06 §3.19.2; the DeclineOp raised members, §4.11) */' and '(V06 §3.19.5 (4); §4.11's DeclineOp deck member)'. Drop '(V1C-39)' and 'V1C-20' (the homes V01 §2.2 and §7.1, §8.10 are already cited). |
| VM-R0S-37 | minor | TERM | model | The canon retires 'Removals that hold (in design prose)' for 'suppression' (G-suppress; V09-TERM-4, J-VI.14), but §2.8's bullet keeps it as its lead: '**Removals that hold — suppression (J-VI.14).**' — the one surviving occurrence of the retired phrase in the base. | §2.8: lead the bullet '**Suppression (J-VI.14).**' (the text below already says 'One suppression rule for re-adding generators'). |

## 6. Sizes, references, doc checks

* **Words** (wc): 41 761 → 53 256 (+27.5 %; the rewrite's count 42 526 → 54 155). The shrink band (25–40 % fewer,
  canon goal 25 516–31 894 words) is not met: file f's 88 items and six g items added build-depth records the base had not
  absorbed (≈ 12 600 and ≈ 900 words by the rewrite's attribution, which the diff review agrees with); of the original
  text 3 395 words were removed (restatement, narration, one duplicated mechanism, verbose prose). Not a defect
  (principle (9)); no part shrank by more than half, so no nuance audit was triggered — the one constant a restatement
  cut lost is VM-R0S-01.
* **References.** Every bare `§x.y` in §2 resolves to a base heading; every `Vnn §x.y` resolves to a heading or a
  numbered bold paragraph of that volume; five list forms land on the wrong base section (VM-R0S-28 … see VM-R0S-32); 119
  decision ids cited, all defined in the rationale or a volume except J-S23.2, a seam-critique id (VM-R0S-33); tests
  cited (T19-3, T19-4, T28-3, T28-13–T28-18, T77-1, T-V12-4) exist.
* **Ids.** §2 mints no test or decision id and renumbers none; the new roles (`retaining_state_knot`, `wall_state_knot`,
  `wall_class_knot`, `rim`, `sky_access`) are unique in rule 7's registry.
* **Deferral wording.** None ('later' occurs only as time).
* **Doc checks** (`python3 docs/validation/bench/doc_checks.py --sections 2`): exit 0 — C1 5/0, C2 1/0, C3 370/0, C4 1/0,
  S1 0/0, S2 139/0 (hits/unreviewed). **PROVISIONAL:** the tool warned 'reference corpus INCOMPLETE (missing: captures,
  research/patreon, research/devlogs, research/ftg-docs, research/external) — clean-room results are NOT authoritative'.

## 7. Result

37 issues: 1 blocker, 15 major, 21 minor. Owners: model 26, pipeline 5, determinism 2, scope 1, V09 1, V11 1, V12 1.
The design files are untouched. CONFIRMED (executed): the word diff and its hunk review, the token probes, the BCR
extraction and application checks, the term, reference, id and deferral sweeps, the doc checks. PLAUSIBLE: that no
change inside an added (insert-only) hunk silently alters an archived rule — insertions were read against their f / g
source, not diffed against a prior text, since none existed.
