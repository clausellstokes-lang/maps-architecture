# Coherence rewrite of volume 8 — the SettlementForge stage

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V08; covered by the whole-design retrovalidation (J84).

**Output:** `docs/validation/coherence/new/volumes/V08-settlementforge.md` (the complete new text; same title line and
section structure, one marker line; new subsections §2.6c and §3.15). Working files: `work/rewrite-V08/` (inputs,
transform script, parts, mapping).

## 1 Sizes (principle (9)'s shrink goal)

| measure | words (wc) |
|---|---|
| before (`docs/volumes/V08-settlementforge.md`) | 82 775 (the canon's count 84 356) |
| after | 69 322 |
| net change | −13 453 (−16.3 %) |
| new design written at build depth (g items 111 and 113, W-DOS-01b's field table, the export bundle route, the edge catalogue §3.15, T-V8-48 – T-V8-55, J-V8.116 – J-V8.128, the new wiring and lifecycle rows, the diff's three new rows, the controls' keys) | ≈ 8 800 |
| carried text after (after − new design) | ≈ 60 500: −27 % against the text before |
| bytes | 545 534 → ≈ 447 000 |

Words removed, by source (≈ 22 250): **narration** ≈ 16 200 — the eight stacked banner lines, the revision note, the
PROGRESS and REVISION ledger (NARR-1, NARR-2), the ten reconciliation-round notes and the finalization note (NARR-8),
§12's per-lane reading records (NARR-6), §13's fix-list history and its closed hand-off table (NARR-7), the history
dividers of §1b (V08-TERM-1), the estimate history of §8.2 (NARR-4), the decision rows' revision histories (NARR-5), the
ladder re-check's disagreement list (NARR-3) and the provenance ids in the body (C8-n, SS-n, SRn-n, seam and round
names); **restatement** ≈ 5 600 — §10's 32 full request texts (a pointer table now), the derivation-row tables DR29,
DR30–DR32, DR33, DR34 and DR35 (§7.7's), the `DossierBinding`, `PortResult`/`PortNote`, `RealmBlock.cell.latDeg` and
extended-message blocks, `CustomChainRecord`/`CustomServiceRecord` and the key-law additions (§2.7, §7.7's), `Assignment.custom`'s
type, §1b's fact-trace paragraphs (replaced by §2.4's field table, the one list), V11's chain-status weights (S2);
**duplicated mechanisms** ≈ 150 — the toll-bridge rule's second shape folded into one rung table (E-31; V07 cites it), the
"host computes nothing" rule stated once (§3.7); **verbose prose** ≈ 300. No rule, case, value, bar, record field,
lifecycle row, test or reasoned decision was dropped.

**Why the net shrink is below the band (25–40 %).** The carried text shrank by ≈ 27 %, inside the band; the net figure
is held above it by ≈ 8 800 words of design this pass had to add at build depth — g item 111's and g item 113's V08
parts (routed, F-MISSING if absent), W-DOS-01b's adapter field table, V08-XCONF-5's export-bundle route, the 61 edges
and 62 combinations of the edge catalogue (principle (11)), and their tests and decisions. What remains is irreducible
content: §9's 128 reasoned decisions (8 700 words), §7's 55 bars (6 400), the dossier row sets' vocabularies (§2.6,
4 300), the wiring table (3 650) and the lifecycle table (2 300).
