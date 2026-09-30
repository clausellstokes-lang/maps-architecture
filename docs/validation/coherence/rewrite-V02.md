# Rewrite V02 — the coherence, cohesion, wiring and elegance pass over volume 2 (buildings)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V02; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V02`, 2026-09-29 – 2026-09-30)
- P1 inputs gathered (canon unit V02, 10 conflicts, 4 wiring gaps, E-24/E-27, ID-WX/ID-DUPDEF, 14 hand-offs received, 47 + 21 edges, 28 combinations, 40 open findings, f items): done
- P2 volume read and rewritten part by part (`work/rewrite-V02/parts/`, 00-head … 28-s13; resumed in the cloud checkout on 2026-09-30 at §4): done
- P3 assembly to `new/volumes/V02-buildings.md` (`work/rewrite-V02/assemble.py`): done
- P4 sweeps (retired terms, citation form, narration and review ids, deferral wording, ids, self / base / other-volume references, token coverage, doc_checks): done
- P5 mapping table, report, results JSON, LANDED: done

**Output:** `docs/validation/coherence/new/volumes/V02-buildings.md` — the same title line, the one marker line, the
same sections §0–§13 and *Integration notes*, plus the new **§3.18 Edges** (principle (11)); the reconciliation-round and
finalization logs are removed (narration, S9; V02-NARR-9).

## 1 Sizes

Words by the canon's counting (whitespace tokens per line; the canon's baseline 103 630 for V02):

| section | before | after | change | what moved |
|---|---|---|---|---|
| title, marker, ledgers | 1 439 | 137 | −90.5 % | nine banner lines → one marker (NARR-1); the revision, fold and round ledgers out (NARR-2) |
| §0 | 1 756 | 1 651 | −6.0 % | inline narration, citation form |
| §1 | 7 218 | 6 918 | −4.2 % | restated base values cited (RESTATE-1); §1b's dossier rows name their DR rows (W-DOS-10b) |
| §2 | 8 591 | 7 755 | −9.7 % | base §2.6 declarations cited (MC-11, the REFERENCE ids) |
| §3 | 33 356 | 35 512 | +6.5 % | **+2 555 for the new §3.18 (edges)**; without it −1.2 % |
| §4 | 4 841 | 4 625 | −4.5 % | §7.4's row cited; IN-V02-2 (c), IN-V02-3, IN-V02-4 folded; bend ids named |
| §5 | 3 387 | 3 353 | −1.0 % | §5.6's export rows merged into §5.5; the NG sentence cited (RESTATE-3); style cells named (WGAP-1); edge sentences added |
| §6 | 1 753 | 1 628 | −7.1 % | §1.1's counts and §12.5's times cited (RESTATE-4) |
| §7 | 5 955 | 6 331 | +6.3 % | **+354 for T-V2-54 – T-V2-57**; T-V2-7 cites V11 (RESTATE-5) |
| §8 | 2 818 | 2 558 | −9.2 % | one effort statement (ICONF-2, -4); J122's order (DEFER-1) |
| §9 | 8 537 | 7 952 | −6.9 % | revision narration out of 108 rows (NARR-3); E-24's marks |
| §10 | 9 988 | 898 | −91.0 % | 42 requests → one pointer table to the applied f items (NARR-4) |
| §11 | 412 | 127 | −69.2 % | one answered question (CANON-C03, MISSING-1) |
| §12 | 2 252 | 1 061 | −52.9 % | one current CONFIRMED / PLAUSIBLE list with a census line (NARR-5) |
| §13 | 3 633 | 2 034 | −44.0 % | per-round paragraphs out (NARR-6); X rows as closed hand-offs; the received hand-offs table added (+368) |
| Integration notes | 430 | 117 | −72.8 % | notes folded at their homes; one pointer line each |
| Reconciliation rounds, Finalization | 7 264 | 0 | −100 % | NARR-9 |
| **total** | **103 630** | **82 657** | **−20.2 %** | 622.2 KB → 482.6 KB |

**Sources of the removed words** (gross ≈ 24 600, of which ≈ 3 600 were added back as required new content): narration
≈ 56 % (the ledgers, the round logs, §12's and §13's per-round text, the inline review ids and revision markers);
restatement ≈ 40 % (§10's request texts, now base text by file f; restated base and V11 values in the body);
duplicated mechanisms ≈ 1 % (E-27's one `valleyReach`; E-24's superseded rows as marks); verbose prose ≈ 4 %.
**Below the band (25–40 %), and why.** The volume is at build depth: §3's constructions (M0–M14, ST0–ST8, W1–W10, the
composer and the roofscape), §3.10's default rows at four anchors, the §1b wiring table (principle (7)), 108 reasoned
decisions and 57 bars are content the guard keeps whole; and this pass added required content — the §3.18 edge section
(principle (11)), four bars and the received hand-offs, about 3 600 words. Without the additions the cut is 23.6 %. No
part shrank by more than half except the narration and pointer sections named above (§10, §11, §12, the ledgers, the
logs, the IN notes), whose content is at its homes (the mapping table below).

## 2 Mapping table — every inventory id of V02 → where it now lives

Roles are the canon's (`canon.json → by_inventory_id`): home 380, reference 45, bcr-pointer 44, handoff 33, glossary 23,
index-row 10, history-out 6 — **541 mapped, 0 unmapped**. A token coverage check (every code identifier, id and
number-with-unit of every inventory statement, searched in the new volume, or in the rewritten base for a pointer) found
2 325 tokens, 21 absent, each intended: `minEdge`'s and `attractCm`'s values (RESTATE-1, -2), `halfSpanCm` (E-27's one
definition reads the roof's run), §12.5's first-map time and §12.8's per-storey line (RESTATE-4), the superseded effort
figures (ICONF-2), J-V2.61's figure at a withdrawn grade (history), `rcV2` (a scratch path, BREF-1).

| id | role | old § | now |
|---|---|---|---|
| V02-0001 | home | 0 | V02 §0 |
| V02-0002 | home | 0 | V02 §0 |
| V02-0003 | home | 0 | V02 §0 |
| V02-0004 | home | 0 | V02 §0 |
| V02-0005 | home | 1a | V02 §1a |
| V02-0006 | home | 1a | V02 §1a |
| V02-0007 | home | 1a | V02 §1a |
| V02-0008 | home | 1b | V02 §1b |
| V02-0009 | home | 1b | V02 §1b |
| V02-0010 | home | 1b | V02 §1b |
| V02-0011 | home | 1b | V02 §1b |
| V02-0012 | home | 1b | V02 §1b |
| V02-0013 | home | 1b | V02 §1b |
| V02-0014 | home | 1b | V02 §1b |
| V02-0015 | home | 1b | V02 §1b |
| V02-0016 | home | 1b | V02 §1b |
| V02-0017 | home | 1b | V02 §1b |
| V02-0018 | home | 1b | V02 §1b |
| V02-0019 | home | 1b | V02 §1b |
| V02-0020 | home | 1b | V02 §1b |
| V02-0021 | home | 1b | V02 §1b |
| V02-0022 | home | 1b | V02 §1b |
| V02-0023 | home | 1b | V02 §1b |
| V02-0024 | home | 1b | V02 §1b |
| V02-0025 | home | 1b | V02 §1b |
| V02-0026 | home | 1b | V02 §1b |
| V02-0027 | home | 1b | V02 §1b |
| V02-0028 | home | 1b | V02 §1b |
| V02-0029 | home | 1b | V02 §1b |
| V02-0030 | home | 1b | V02 §1b |
| V02-0031 | home | 1b | V02 §1b |
| V02-0032 | home | 1b | V02 §1b |
| V02-0033 | home | 1b | V02 §1b |
| V02-0034 | home | 1b | V02 §1b |
| V02-0035 | home | 1b | V02 §1b |
| V02-0036 | home | 1b | V02 §1b |
| V02-0037 | home | 1b | V02 §1b |
| V02-0038 | home | 1b | V02 §1b |
| V02-0039 | home | 1b | V02 §1b |
| V02-0040 | home | 1b | V02 §1b |
| V02-0041 | home | 1b | V02 §1b |
| V02-0042 | home | 1b | V02 §1b |
| V02-0043 | home | 1b | V02 §1b |
| V02-0044 | home | 1b | V02 §1b |
| V02-0045 | home | 1b | V02 §1b |
| V02-0046 | home | 1b | V02 §1b |
| V02-0047 | home | 1b | V02 §1b |
| V02-0048 | home | 1b | V02 §1b |
| V02-0049 | home | 1b | V02 §1b |
| V02-0050 | home | 1b | V02 §1b |
| V02-0051 | home | 1b | V02 §1b |
| V02-0052 | home | 1b | V02 §1b |
| V02-0053 | home | 1b | V02 §1b |
| V02-0054 | home | 1b | V02 §1b |
| V02-0055 | home | 1b | V02 §1b |
| V02-0056 | home | 1b | V02 §1b |
| V02-0057 | home | 1b | V02 §1b |
| V02-0058 | home | 1b | V02 §1b |
| V02-0059 | home | 1b | V02 §1b |
| V02-0060 | home | 1b | V02 §1b |
| V02-0061 | home | 1b | V02 §1b |
| V02-0062 | home | 1b | V02 §1b |
| V02-0063 | home | 1b | V02 §1b |
| V02-0064 | home | 1b | V02 §1b |
| V02-0065 | home | 1b | V02 §1b |
| V02-0066 | home | 1b | V02 §1b |
| V02-0067 | home | 1b | V02 §1b |
| V02-0068 | home | 1b | V02 §1b |
| V02-0069 | home | 1b | V02 §1b |
| V02-0070 | home | 1b | V02 §1b |
| V02-0071 | home | 1b | V02 §1b |
| V02-0072 | home | 1b | V02 §1b |
| V02-0073 | home | 1b | V02 §1b |
| V02-0074 | home | 1b | V02 §1b |
| V02-0075 | home | 1b | V02 §1b |
| V02-0076 | home | 1b | V02 §1b |
| V02-0077 | home | 1b | V02 §1b |
| V02-0078 | home | 1b | V02 §1b |
| V02-0079 | home | 1b | V02 §1b |
| V02-0080 | home | 1b | V02 §1b |
| V02-0081 | index-row | 1c | V02 §1c (index row ) |
| V02-0082 | index-row | 1c | V02 §1c (index row ) |
| V02-0083 | index-row | 1c | V02 §1c (index row ) |
| V02-0084 | index-row | 1c | V02 §1c (index row ) |
| V02-0085 | index-row | 1c | V02 §1c (index row ) |
| V02-0086 | index-row | 1c | V02 §1c (index row J-V2.79) |
| V02-0087 | index-row | 1d | V02 §1d (index row ) |
| V02-0088 | index-row | 1d | V02 §1d (index row ) |
| V02-0089 | index-row | 1d | V02 §1d (index row ) |
| V02-0090 | reference | 2 | V02 §2 (cites §2.1, §3.2, §2.8, §2.9, §7.6) |
| V02-0091 | reference | 2.1 | declared at §2.6 (item 216); V02 §2.1 keeps each role's meaning |
| V02-0092 | reference | 2.1 | declared at §2.6 (item 221); V02 §2.1, §3.3 keep the families |
| V02-0093 | reference | 2.1 | declared at §2.6 (item 216); V02 §2.1 keeps writers and readers |
| V02-0094 | reference | 2.1 | declared at §2.6 (item 217); V02 §2.1 keeps writers and readers |
| V02-0095 | reference | 2.1 | declared at §2.6 (item 385, MC-11); V02 §2.1 keeps its reading |
| V02-0096 | reference | 2.1 | cites V03 §2.5 and item 234 (V02 §2.1) |
| V02-0097 | reference | 2.1 | declared at §2.6 (item 222); V02 §2.1 keeps its meaning |
| V02-0098 | home | 2.1 | V02 §2.1 |
| V02-0099 | reference | 2.1 | §2.6 (item 225); V02 §2.1 cites it |
| V02-0100 | reference | 2.2 | §2.6 (item 218); V02 §2.2 keeps the composer's reading |
| V02-0101 | reference | 2.2 | §2.6 (items 218–219); V02 §2.2 |
| V02-0102 | reference | 2.2 | §2.6 (item 220); V02 §2.2 |
| V02-0103 | home | 2.2 | V02 §2.2 |
| V02-0104 | home | 2.3 | V02 §2.3 |
| V02-0105 | home | 2.3 | V02 §2.3 |
| V02-0106 | reference | 2.3 | §2.6 (item 221); V02 §2.3 declares the row it reads |
| V02-0107 | home | 2.3 | V02 §2.3 |
| V02-0108 | home | 2.3 | V02 §2.3 |
| V02-0109 | home | 2.4 | V02 §2.4 |
| V02-0110 | home | 2.4 | V02 §2.4 |
| V02-0111 | home | 2.5 | V02 §2.5 |
| V02-0112 | home | 2.5 | V02 §2.5 |
| V02-0113 | home | 2.5 | V02 §2.5 |
| V02-0114 | home | 2.5 | V02 §2.5 |
| V02-0115 | home | 2.5 | V02 §2.5 |
| V02-0116 | home | 2.5 | V02 §2.5 |
| V02-0117 | home | 2.5 | V02 §2.5 |
| V02-0118 | home | 2.5 | V02 §2.5 |
| V02-0119 | home | 2.6 | V02 §2.6 |
| V02-0120 | reference | 2.6 | §2.6 (item 227); V02 §2.6 keeps the stack's meaning |
| V02-0121 | reference | 2.6 | §2.6 (items 217, 229); V02 §2.6 |
| V02-0122 | home | 2.6 | V02 §2.6 |
| V02-0123 | home | 2.6 | V02 §2.6 |
| V02-0124 | home | 2.6 | V02 §2.6 |
| V02-0125 | reference | 2.6 | §2.6 (item 305); V02 §2.6, §3.16 |
| V02-0126 | home | 2.6 | V02 §2.6 |
| V02-0127 | home | 2.6 | V02 §2.6 |
| V02-0128 | home | 2.6 | V02 §2.6 |
| V02-0129 | home | 2.6 | V02 §2.6 |
| V02-0130 | home | 2.6 | V02 §2.6 |
| V02-0131 | home | 2.6 | V02 §2.6 |
| V02-0132 | home | 3.1 | V02 §3.1 |
| V02-0133 | home | 3.1 | V02 §3.1 |
| V02-0134 | home | 3.2 | V02 §3.2 |
| V02-0135 | home | 3.2 | V02 §3.2 |
| V02-0136 | home | 3.2 | V02 §3.2 |
| V02-0137 | home | 3.2 | V02 §3.2 |
| V02-0138 | home | 3.3 | V02 §3.3 |
| V02-0139 | home | 3.3 | V02 §3.3 |
| V02-0140 | home | 3.4 | V02 §3.4 |
| V02-0141 | home | 3.5 | V02 §3.5 |
| V02-0142 | home | 3.5 | V02 §3.5 |
| V02-0143 | home | 3.5 | V02 §3.5 |
| V02-0144 | home | 3.5 | V02 §3.5 |
| V02-0145 | home | 3.5 | V02 §3.5 |
| V02-0146 | home | 3.5 | V02 §3.5 |
| V02-0147 | home | 3.5 | V02 §3.5 |
| V02-0148 | home | 3.5 | V02 §3.5 |
| V02-0149 | home | 3.5 | V02 §3.5 |
| V02-0150 | home | 3.5 | V02 §3.5 |
| V02-0151 | home | 3.5 | V02 §3.5 |
| V02-0152 | home | 3.5 | V02 §3.5 |
| V02-0153 | home | 3.5 | V02 §3.5 |
| V02-0154 | home | 3.5 | V02 §3.5 |
| V02-0155 | home | 3.5 | V02 §3.5 |
| V02-0156 | home | 3.5 | V02 §3.5 |
| V02-0157 | home | 3.5 | V02 §3.5 |
| V02-0158 | home | 3.5 | V02 §3.5 |
| V02-0159 | home | 3.5 | V02 §3.5 |
| V02-0160 | home | 3.5 | V02 §3.5 |
| V02-0161 | home | 3.5 | V02 §3.5 |
| V02-0162 | home | 3.5 | V02 §3.5 |
| V02-0163 | home | 3.5 | V02 §3.5 |
| V02-0164 | home | 3.5 | V02 §3.5 |
| V02-0165 | home | 3.5 | V02 §3.5 |
| V02-0166 | home | 3.5 | V02 §3.5 |
| V02-0167 | home | 3.5 | V02 §3.5 |
| V02-0168 | home | 3.5 | V02 §3.5 |
| V02-0169 | reference | 3.5 | V02 §3.5 M14 (the rungs), cited by §5.2's F-MASSING row (item 328); V02 §3.13 |
| V02-0170 | home | 3.6 | V02 §3.6 |
| V02-0171 | reference | 3.7 | V02 §3.7 (facadeBays; valleyReach unified, E-27); §2.6 cites it |
| V02-0172 | home | 3.7 | V02 §3.7 |
| V02-0173 | home | 3.7 | V02 §3.7 |
| V02-0174 | home | 3.7 | V02 §3.7 |
| V02-0175 | home | 3.7 | V02 §3.7 |
| V02-0176 | home | 3.7 | V02 §3.7 |
| V02-0177 | home | 3.8 | V02 §3.8 |
| V02-0178 | home | 3.8 | V02 §3.8 |
| V02-0179 | home | 3.8 | V02 §3.8 |
| V02-0180 | home | 3.8 | V02 §3.8 |
| V02-0181 | home | 3.9 | V02 §3.9 |
| V02-0182 | home | 3.9 | V02 §3.9 |
| V02-0183 | home | 3.9 | V02 §3.9 |
| V02-0184 | home | 3.9 | V02 §3.9 |
| V02-0185 | home | 3.9 | V02 §3.9 |
| V02-0186 | home | 3.9 | V02 §3.9 |
| V02-0187 | home | 3.9 | V02 §3.9 |
| V02-0188 | home | 3.9 | V02 §3.9 |
| V02-0189 | home | 3.10 | V02 §3.10 |
| V02-0190 | home | 3.10.1 | V02 §3.10.1 |
| V02-0191 | home | 3.10.2 | V02 §3.10.2 |
| V02-0192 | home | 3.10.3 | V02 §3.10.3 |
| V02-0193 | home | 3.10.3 | V02 §3.10.3 |
| V02-0194 | home | 3.10.3 | V02 §3.10.3 |
| V02-0195 | home | 3.10.4 | V02 §3.10.4 |
| V02-0196 | home | 3.10.4 | V02 §3.10.4 |
| V02-0197 | reference | 3.10.5 | V02 §3.10.5 is the home; V07 cites it (V02-ICONF-1) |
| V02-0198 | home | 3.10.6 | V02 §3.10.6 |
| V02-0199 | reference | 3.10.6 | V02 §3.10.6 cites V11 §2.8 and V11 §3.6.4 (items 427, 435) |
| V02-0200 | home | 3.10.7 | V02 §3.10.7 |
| V02-0201 | reference | 3.10.8 | V02 §3.10.8 (the FM cells; §7.6's override layer, items 376–377, cited) |
| V02-0202 | home | 3.10.9 | V02 §3.10.9 |
| V02-0203 | home | 3.10.9 | V02 §3.10.9 |
| V02-0204 | home | 3.10.9 | V02 §3.10.9 |
| V02-0205 | home | 3.10.9 | V02 §3.10.9 |
| V02-0206 | home | 3.10.9 | V02 §3.10.9 |
| V02-0207 | reference | 3.10.10 | V02 §3.10.10 (cites V12 §3.11) |
| V02-0208 | home | 3.10.10 | V02 §3.10.10 |
| V02-0209 | home | 3.10.10 | V02 §3.10.10 |
| V02-0210 | home | 3.11 | V02 §3.11 |
| V02-0211 | reference | 3.11 | V02 §3.11 (the lists; item 261 writes them into §2.8, cited) |
| V02-0212 | home | 3.11 | V02 §3.11 |
| V02-0213 | reference | 3.12 | V02 §3.12 (item 341 registers the concerns in §6.1; the creation indices stay here) |
| V02-0214 | home | 3.12 | V02 §3.12 |
| V02-0215 | reference | 3.12 | V02 §3.12 (cites §6.5) |
| V02-0216 | reference | 3.13 | V02 §3.13 (cites §5.2's rows, item 328) |
| V02-0217 | home | 3.14 | V02 §3.14 |
| V02-0218 | home | 3.14.1 | V02 §3.14.1 |
| V02-0219 | home | 3.14.2 | V02 §3.14.2 |
| V02-0220 | home | 3.14.3 | V02 §3.14.3 |
| V02-0221 | home | 3.14.4 | V02 §3.14.4 |
| V02-0222 | home | 3.14.5 | V02 §3.14.5 |
| V02-0223 | home | 3.14.5 | V02 §3.14.5 |
| V02-0224 | home | 3.14.5 | V02 §3.14.5 |
| V02-0225 | home | 3.14.6 | V02 §3.14.6 |
| V02-0226 | home | 3.15 | V02 §3.15 |
| V02-0227 | home | 3.15.1 | V02 §3.15.1 |
| V02-0228 | home | 3.15.1 | V02 §3.15.1 |
| V02-0229 | home | 3.15.1 | V02 §3.15.1 |
| V02-0230 | home | 3.15.1 | V02 §3.15.1 |
| V02-0231 | home | 3.15.1 | V02 §3.15.1 |
| V02-0232 | home | 3.15.1 | V02 §3.15.1 |
| V02-0233 | home | 3.15.1 | V02 §3.15.1 |
| V02-0234 | home | 3.15.1 | V02 §3.15.1 |
| V02-0235 | home | 3.15.1 | V02 §3.15.1 |
| V02-0236 | home | 3.15.1 | V02 §3.15.1 |
| V02-0237 | reference | 3.15.2 | V02 §3.15.2 (rebaseStack declared at §2.6, item 370; the calling paths here) |
| V02-0238 | home | 3.15.3 | V02 §3.15.3 |
| V02-0239 | home | 3.15.3 | V02 §3.15.3 |
| V02-0240 | home | 3.15.4 | V02 §3.15.4 |
| V02-0241 | home | 3.15.4 | V02 §3.15.4 |
| V02-0242 | home | 3.15.5 | V02 §3.15.5 |
| V02-0243 | reference | 3.15.6 | V02 §3.15.6 (V04's call; X19) |
| V02-0244 | home | 3.16 | V02 §3.16 |
| V02-0245 | home | 3.16 | V02 §3.16 |
| V02-0246 | home | 3.16 | V02 §3.16 |
| V02-0247 | home | 3.16 | V02 §3.16 |
| V02-0248 | home | 3.17 | V02 §3.17 |
| V02-0249 | home | 3.17 | V02 §3.17 |
| V02-0250 | reference | 3.17 | V02 §3.17 (e) (the fixture's own bars V12's, X25) |
| V02-0251 | reference | 4.1 | V02 §4.1 kept as home (the base §7.1 cites V02 §4.1 for MassingOp and CompositionOp) |
| V02-0252 | home | 4.1 | V02 §4.1 |
| V02-0253 | home | 4.2 | V02 §4.2 |
| V02-0254 | home | 4.2 | V02 §4.2 |
| V02-0255 | home | 4.2 | V02 §4.2 |
| V02-0256 | home | 4.2 | V02 §4.2 |
| V02-0257 | home | 4.3 | V02 §4.3 |
| V02-0258 | reference | 4.4 | V02 §4.4 cites §7.4's setMassing / setComposition row (item 351) and keeps only its remainder |
| V02-0259 | reference | 4.4 | V02 §4.4 kept as home (§7.4's row cites V02 §4.4 for re-attach and discard) |
| V02-0260 | reference | 4.5 | V02 §4.5 kept (the handle contract; V09 §3.5 draws it) |
| V02-0261 | reference | 4.5 | V02 §4.5 kept (the provider's rows; V10 §3.9 lists the provider) |
| V02-0262 | reference | 4.6 | V02 §4.6 kept (§7.1 cites V02 §4.1's ops) |
| V02-0263 | home | 4.6 | V02 §4.6 |
| V02-0264 | home | 4.6 | V02 §4.6 |
| V02-0265 | home | 4.6 | V02 §4.6 |
| V02-0266 | home | 4.6 | V02 §4.6 |
| V02-0267 | home | 4.6 | V02 §4.6 |
| V02-0268 | home | 4.6 | V02 §4.6 |
| V02-0269 | reference | 4.6 | V02 §4.6 (7) (cites V09 §4.20.6 for the controls; V10, X22) |
| V02-0270 | reference | 5.1 | V02 §5.1 (cites §8.5's bands) |
| V02-0271 | reference | 5.2 | V02 §5.2 kept (§8.2 and §8.6 cite V02 §5.2 for the roofscape; item 406) |
| V02-0272 | home | 5.2 | V02 §5.2 |
| V02-0273 | home | 5.2 | V02 §5.2 |
| V02-0274 | home | 5.2 | V02 §5.2 |
| V02-0275 | reference | 5.3 | V02 §5.3 kept (§8.2 cites V02 §5.3's programs; item 406); cells named (V02-WGAP-1) |
| V02-0276 | reference | 5.3 | V02 §5.3 (§8.10 rows; row cells named) |
| V02-0277 | home | 5.4 | V02 §5.4 |
| V02-0278 | reference | 5.5 | V02 §5.5 kept (§11.1 cites V02 §5.5; item 449) |
| V02-0279 | home | 5.6 | V02 §5.6 |
| V02-0280 | reference | 5.6 | V02 §5.5 (the stack rows merged into §5.5's table) |
| V02-0281 | reference | 6 | V02 §6 (cites §1.1's counts and §12.5's times; V02-RESTATE-4) |
| V02-0282 | home | 6.1 | V02 §6.1 |
| V02-0283 | home | 6.2 | V02 §6.2 |
| V02-0284 | home | 6.3 | V02 §6.3 |
| V02-0285 | home | 6.4 | V02 §6.4 |
| V02-0286 | home | 6.5 | V02 §6.5 |
| V02-0287 | reference | 7 | V02 §7 (cites §13, §13.8, §13.2; item 522) |
| V02-0288 | home | 7.1 | V02 §7.1 |
| V02-0289 | home | 7.2 | V02 §7.2 |
| V02-0290 | home | 7.2 | V02 §7.2 |
| V02-0291 | home | 7.2 | V02 §7.2 |
| V02-0292 | home | 7.2 | V02 §7.2 |
| V02-0293 | home | 7.2 | V02 §7.2 |
| V02-0294 | home | 7.2 | V02 §7.2 |
| V02-0295 | home | 7.2 | V02 §7.2 |
| V02-0296 | home | 7.2 | V02 §7.2 |
| V02-0297 | home | 7.2 | V02 §7.2 |
| V02-0298 | home | 7.2 | V02 §7.2 |
| V02-0299 | home | 7.3 | V02 §7.3 |
| V02-0300 | home | 7.4 | V02 §7.4 |
| V02-0301 | home | 7.4 | V02 §7.4 |
| V02-0302 | reference | 7.5 | V02 §7.5 kept (§13.6 cites V02 §7.5; item 499) |
| V02-0303 | home | 7.6 | V02 §7.6 |
| V02-0304 | home | 7.7 | V02 §7.7 |
| V02-0305 | home | 7.7 | V02 §7.7 |
| V02-0306 | home | 7.7 | V02 §7.7 |
| V02-0307 | home | 7.7 | V02 §7.7 |
| V02-0308 | home | 7.7 | V02 §7.7 |
| V02-0309 | home | 7.7 | V02 §7.7 |
| V02-0310 | home | 7.7 | V02 §7.7 |
| V02-0311 | home | 7.7 | V02 §7.7 |
| V02-0312 | index-row | 8.1 | V02 §8.1 (index row ) |
| V02-0313 | home | 8.2 | V02 §8.2 |
| V02-0314 | home | 8.3 | V02 §8.3 |
| V02-0315 | home | 8.3 | V02 §8.3 |
| V02-0316 | home | 8.3 | V02 §8.3 |
| V02-0317 | home | 8.4 | V02 §8.4 |
| V02-0318 | home | 8.5 | V02 §8.5 |
| V02-0319 | home | 8.5 | V02 §8.5 |
| V02-0320 | home | 9 | V02 §9 J-V2.1 |
| V02-0321 | home | 9 | V02 §9 J-V2.2 |
| V02-0322 | home | 9 | V02 §9 J-V2.3 |
| V02-0323 | home | 9 | V02 §9 J-V2.4 |
| V02-0324 | home | 9 | V02 §9 J-V2.5 |
| V02-0325 | home | 9 | V02 §9 J-V2.6 |
| V02-0326 | home | 9 | V02 §9 J-V2.7 |
| V02-0327 | home | 9 | V02 §9 J-V2.8 |
| V02-0328 | home | 9 | V02 §9 J-V2.9 |
| V02-0329 | home | 9 | V02 §9 J-V2.10 |
| V02-0330 | home | 9 | V02 §9 J-V2.11 |
| V02-0331 | home | 9 | V02 §9 J-V2.12 |
| V02-0332 | home | 9 | V02 §9 J-V2.13 |
| V02-0333 | home | 9 | V02 §9 J-V2.14 |
| V02-0334 | home | 9 | V02 §9 J-V2.15 |
| V02-0335 | home | 9 | V02 §9 J-V2.16 |
| V02-0336 | home | 9 | V02 §9 J-V2.17 |
| V02-0337 | home | 9 | V02 §9 J-V2.18 |
| V02-0338 | home | 9 | V02 §9 J-V2.19 |
| V02-0339 | home | 9 | V02 §9 J-V2.20 |
| V02-0340 | home | 9 | V02 §9 J-V2.21 |
| V02-0341 | home | 9 | V02 §9 J-V2.22 |
| V02-0342 | home | 9 | V02 §9 J-V2.23 |
| V02-0343 | home | 9 | V02 §9 J-V2.24 |
| V02-0344 | home | 9 | V02 §9 J-V2.25 |
| V02-0345 | home | 9 | V02 §9 J-V2.26 |
| V02-0346 | home | 9 | V02 §9 J-V2.27 |
| V02-0347 | home | 9 | V02 §9 J-V2.28 |
| V02-0348 | home | 9 | V02 §9 J-V2.29 |
| V02-0349 | home | 9 | V02 §9 J-V2.30 |
| V02-0350 | home | 9 | V02 §9 J-V2.31 |
| V02-0351 | home | 9 | V02 §9 J-V2.32 |
| V02-0352 | home | 9 | V02 §9 J-V2.33 |
| V02-0353 | home | 9 | V02 §9 J-V2.34 |
| V02-0354 | home | 9 | V02 §9 J-V2.35 |
| V02-0355 | home | 9 | V02 §9 J-V2.36 |
| V02-0356 | home | 9 | V02 §9 J-V2.37 |
| V02-0357 | home | 9 | V02 §9 J-V2.38 |
| V02-0358 | home | 9 | V02 §9 J-V2.39 |
| V02-0359 | home | 9 | V02 §9 J-V2.40 |
| V02-0360 | home | 9 | V02 §9 J-V2.41 |
| V02-0361 | home | 9 | V02 §9 J-V2.42 |
| V02-0362 | home | 9 | V02 §9 J-V2.43 |
| V02-0363 | home | 9 | V02 §9 J-V2.44 |
| V02-0364 | home | 9 | V02 §9 J-V2.45 |
| V02-0365 | home | 9 | V02 §9 J-V2.46 |
| V02-0366 | home | 9 | V02 §9 J-V2.47 |
| V02-0367 | home | 9 | V02 §9 J-V2.48 |
| V02-0368 | home | 9 | V02 §9 J-V2.49 |
| V02-0369 | home | 9 | V02 §9 J-V2.50 |
| V02-0370 | home | 9 | V02 §9 J-V2.51 |
| V02-0371 | home | 9 | V02 §9 J-V2.52 |
| V02-0372 | home | 9 | V02 §9 J-V2.53 |
| V02-0373 | home | 9 | V02 §9 J-V2.54 |
| V02-0374 | home | 9 | V02 §9 J-V2.55 |
| V02-0375 | home | 9 | V02 §9 J-V2.56 |
| V02-0376 | home | 9 | V02 §9 J-V2.57 |
| V02-0377 | home | 9 | V02 §9 J-V2.58 |
| V02-0378 | home | 9 | V02 §9 J-V2.59 |
| V02-0379 | home | 9 | V02 §9 J-V2.60 |
| V02-0380 | home | 9 | V02 §9 J-V2.61 |
| V02-0381 | home | 9 | V02 §9 J-V2.62 |
| V02-0382 | home | 9 | V02 §9 J-V2.63 |
| V02-0383 | home | 9 | V02 §9 J-V2.64 |
| V02-0384 | home | 9 | V02 §9 J-V2.65 |
| V02-0385 | home | 9 | V02 §9 J-V2.66 |
| V02-0386 | home | 9 | V02 §9 J-V2.67 |
| V02-0387 | home | 9 | V02 §9 J-V2.68 |
| V02-0388 | home | 9 | V02 §9 J-V2.69 |
| V02-0389 | home | 9 | V02 §9 J-V2.70 |
| V02-0390 | home | 9 | V02 §9 J-V2.71 |
| V02-0391 | home | 9 | V02 §9 J-V2.72 |
| V02-0392 | home | 9 | V02 §9 J-V2.73 |
| V02-0393 | home | 9 | V02 §9 J-V2.74 |
| V02-0394 | home | 9 | V02 §9 J-V2.75 |
| V02-0395 | home | 9 | V02 §9 J-V2.76 |
| V02-0396 | home | 9 | V02 §9 J-V2.77 |
| V02-0397 | home | 9 | V02 §9 J-V2.78 |
| V02-0398 | home | 9 | V02 §9 J-V2.79 |
| V02-0399 | home | 9 | V02 §9 J-V2.80 |
| V02-0400 | home | 9 | V02 §9 J-V2.81 |
| V02-0401 | home | 9 | V02 §9 J-V2.82 |
| V02-0402 | home | 9 | V02 §9 J-V2.83 |
| V02-0403 | home | 9 | V02 §9 J-V2.84 |
| V02-0404 | home | 9 | V02 §9 J-V2.85 |
| V02-0405 | home | 9 | V02 §9 J-V2.86 |
| V02-0406 | home | 9 | V02 §9 J-V2.87 |
| V02-0407 | home | 9 | V02 §9 J-V2.88 |
| V02-0408 | home | 9 | V02 §9 J-V2.89 |
| V02-0409 | home | 9 | V02 §9 J-V2.90 |
| V02-0410 | home | 9 | V02 §9 J-V2.91 |
| V02-0411 | home | 9 | V02 §9 J-V2.92 |
| V02-0412 | home | 9 | V02 §9 J-V2.93 |
| V02-0413 | home | 9 | V02 §9 J-V2.94 |
| V02-0414 | home | 9 | V02 §9 J-V2.95 |
| V02-0415 | home | 9 | V02 §9 J-V2.96 |
| V02-0416 | home | 9 | V02 §9 J-V2.97 |
| V02-0417 | home | 9 | V02 §9 J-V2.98 |
| V02-0418 | home | 9 | V02 §9 J-V2.99 |
| V02-0419 | home | 9 | V02 §9 J-V2.100 |
| V02-0420 | home | 9 | V02 §9 J-V2.101 |
| V02-0421 | home | 9 | V02 §9 J-V2.102 |
| V02-0422 | home | 9 | V02 §9 J-V2.103 |
| V02-0423 | home | 9 | V02 §9 J-V2.104 |
| V02-0424 | home | 9 | V02 §9 J-V2.105 |
| V02-0425 | home | 9 | V02 §9 J-V2.106 |
| V02-0426 | home | 9 | V02 §9 J-V2.107 |
| V02-0427 | home | 9 | V02 §9 J-V2.108 |
| V02-0428 | home | 10 | V02 §10 |
| V02-0429 | bcr-pointer | 10 | V02 §10 row BCR-V2-01 → item 216 (base text) |
| V02-0430 | bcr-pointer | 10 | V02 §10 row BCR-V2-02 → item 217 (base text) |
| V02-0431 | bcr-pointer | 10 | V02 §10 row BCR-V2-03 → item 218 (base text) |
| V02-0432 | bcr-pointer | 10 | V02 §10 row BCR-V2-04 → item 219 (base text) |
| V02-0433 | bcr-pointer | 10 | V02 §10 row BCR-V2-05 → item 220 (base text) |
| V02-0434 | bcr-pointer | 10 | V02 §10 row BCR-V2-06 → item 221 (base text) |
| V02-0435 | bcr-pointer | 10 | V02 §10 row BCR-V2-07 → item 222 (base text) |
| V02-0436 | bcr-pointer | 10 | V02 §10 row BCR-V2-08 → item 385 (base text) |
| V02-0437 | bcr-pointer | 10 | V02 §10 row BCR-V2-09 → item 426 (base text) |
| V02-0438 | bcr-pointer | 10 | V02 §10 row BCR-V2-10 → item 341 (base text) |
| V02-0439 | bcr-pointer | 10 | V02 §10 row BCR-V2-11 → item 346 (base text) |
| V02-0440 | bcr-pointer | 10 | V02 §10 row BCR-V2-12 → item 351 (base text) |
| V02-0441 | bcr-pointer | 10 | V02 §10 row BCR-V2-13 → item 261 (base text) |
| V02-0442 | bcr-pointer | 10 | V02 §10 row BCR-V2-14 → item 376, 377 (base text) |
| V02-0443 | bcr-pointer | 10 | V02 §10 row BCR-V2-15 → item 406 (base text) |
| V02-0444 | bcr-pointer | 10 | V02 §10 row BCR-V2-16 → item 328 (base text) |
| V02-0445 | bcr-pointer | 10 | V02 §10 row BCR-V2-17 → item 332 (base text) |
| V02-0446 | bcr-pointer | 10 | V02 §10 row BCR-V2-18 → item 505 (base text) |
| V02-0447 | bcr-pointer | 10 | V02 §10 row BCR-V2-19 → item 522 (base text) |
| V02-0448 | bcr-pointer | 10 | V02 §10 row BCR-V2-20 → item 524, 568 (base text) |
| V02-0449 | bcr-pointer | 10 | V02 §10 row BCR-V2-21 → item 449 (base text) |
| V02-0450 | bcr-pointer | 10 | V02 §10 row BCR-V2-22 → item 223 (base text) |
| V02-0451 | bcr-pointer | 10 | V02 §10 row BCR-V2-23 → item 224 (base text) |
| V02-0452 | bcr-pointer | 10 | V02 §10 row BCR-V2-24 → item 303 (base text) |
| V02-0453 | bcr-pointer | 10 | V02 §10 row BCR-V2-25 → item 499 (base text) |
| V02-0454 | bcr-pointer | 10 | V02 §10 row BCR-V2-26 → item 427 (with V11's item 435) (base text) |
| V02-0455 | bcr-pointer | 10 | V02 §10 row BCR-V2-27 → item 225 (base text) |
| V02-0456 | bcr-pointer | 10 | V02 §10 row BCR-V2-28 → item 226 (base text) |
| V02-0457 | bcr-pointer | 10 | V02 §10 row BCR-V2-28 → item 226 (base text) |
| V02-0458 | bcr-pointer | 10 | V02 §10 row BCR-V2-29 → item 304 (base text) |
| V02-0459 | bcr-pointer | 10 | V02 §10 row BCR-V2-30 → item 402 (base text) |
| V02-0460 | bcr-pointer | 10 | V02 §10 row BCR-V2-31 → item 227 (base text) |
| V02-0461 | bcr-pointer | 10 | V02 §10 row BCR-V2-32 → item 370 (base text) |
| V02-0462 | bcr-pointer | 10 | V02 §10 row BCR-V2-33 → item 371 (base text) |
| V02-0463 | bcr-pointer | 10 | V02 §10 row BCR-V2-33 → item 371 (base text) |
| V02-0464 | bcr-pointer | 10 | V02 §10 row BCR-V2-34 → item 305 (base text) |
| V02-0465 | bcr-pointer | 10 | V02 §10 row BCR-V2-35 → item 333 (base text) |
| V02-0466 | bcr-pointer | 10 | V02 §10 row BCR-V2-36 → item 419 (base text) |
| V02-0467 | bcr-pointer | 10 | V02 §10 row BCR-V2-37 → item 525, 568 (base text) |
| V02-0468 | bcr-pointer | 10 | V02 §10 row BCR-V2-38 → item 228 (base text) |
| V02-0469 | bcr-pointer | 10 | V02 §10 row BCR-V2-39 → item 229 (base text) |
| V02-0470 | bcr-pointer | 10 | V02 §10 row BCR-V2-40 → item 318 (base text) |
| V02-0471 | bcr-pointer | 10 | V02 §10 row BCR-V2-41 → item 230 (base text) |
| V02-0472 | bcr-pointer | 10 | V02 §10 row BCR-V2-42 → item 231 (base text) |
| V02-0473 | home | 11 | V02 §11 (answered: not now, J122, J121) |
| V02-0474 | history-out | 12 | removed (per-round evidence; validation records); §12 is one current list |
| V02-0475 | history-out | 12 | removed (per-round evidence; validation records); §12 is one current list |
| V02-0476 | history-out | 12 | removed (per-round evidence; validation records); §12 is one current list |
| V02-0477 | history-out | 12 | removed (per-round evidence; validation records); §12 is one current list |
| V02-0478 | history-out | 12 | removed (per-round evidence; validation records); §12 is one current list |
| V02-0479 | history-out | 12 | removed (per-round evidence; validation records); §12 is one current list |
| V02-0480 | home | 13 | V02 §13 (opening line; the per-round paragraphs removed) |
| V02-0481 | handoff | 13 | V02 §13 X1 (closed at its destination) |
| V02-0482 | handoff | 13 | V02 §13 X2 (closed at its destination) |
| V02-0483 | handoff | 13 | V02 §13 X3 (closed at its destination) |
| V02-0484 | handoff | 13 | V02 §13 X4 (closed at its destination) |
| V02-0485 | handoff | 13 | V02 §13 X5 (closed at its destination) |
| V02-0486 | handoff | 13 | V02 §13 X6 (closed at its destination) |
| V02-0487 | handoff | 13 | V02 §13 X7 (closed at its destination) |
| V02-0488 | handoff | 13 | V02 §13 X8 (closed at its destination) |
| V02-0489 | handoff | 13 | V02 §13 X9 (closed at its destination) |
| V02-0490 | handoff | 13 | V02 §13 X10 (closed at its destination) |
| V02-0491 | handoff | 13 | V02 §13 X11 (closed at its destination) |
| V02-0492 | handoff | 13 | V02 §13 X12 (closed at its destination) |
| V02-0493 | handoff | 13 | V02 §13 X13 (closed at its destination) |
| V02-0494 | handoff | 13 | V02 §13 X14 (closed at its destination) |
| V02-0495 | handoff | 13 | V02 §13 X15 (closed at its destination) |
| V02-0496 | handoff | 13 | V02 §13 X16 (closed at its destination) |
| V02-0497 | handoff | 13 | V02 §13 X17 (closed at its destination) |
| V02-0498 | handoff | 13 | V02 §13 X18 (closed at its destination) |
| V02-0499 | handoff | 13 | V02 §13 X19 (closed at its destination) |
| V02-0500 | handoff | 13 | V02 §13 X20 (closed at its destination) |
| V02-0501 | handoff | 13 | V02 §13 X21 (closed at its destination) |
| V02-0502 | handoff | 13 | V02 §13 X22 (closed at its destination) |
| V02-0503 | handoff | 13 | V02 §13 X23 (closed at its destination) |
| V02-0504 | handoff | 13 | V02 §13 X24 (closed at its destination) |
| V02-0505 | handoff | 13 | V02 §13 X25 (closed at its destination) |
| V02-0506 | handoff | 13 | V02 §13 X26 (closed at its destination) |
| V02-0507 | handoff | 13 | V02 §13 X27 (closed at its destination) |
| V02-0508 | handoff | 13 | V02 §13 X28 (closed at its destination) |
| V02-0509 | handoff | 13 | V02 §13 X29 (closed at its destination) |
| V02-0510 | handoff | 13 | V02 §13 X30 (closed at its destination) |
| V02-0511 | handoff | 13 | V02 §13 X31 (closed at its destination) |
| V02-0512 | handoff | 13 | V02 §13 X32 (closed at its destination) |
| V02-0513 | handoff | 13 | V02 §13 X33 (closed at its destination) |
| V02-0514 | home | IN | V02 §3.15.3, §3.17 (a), §4.2 step 2, §4.3 (items 371, 242); pointer in *Integration notes* |
| V02-0515 | home | IN | V02 §4.6 (7); pointer in *Integration notes* |
| V02-0516 | home | IN | V02 §4.6 (no-refusal rule), §3.15 (the tier contract, J-VI.5); pointer in *Integration notes* |
| V02-0517 | home | RC1-RC5 | removed (narration, S9); normative parts at J-V2.88, J-V2.91, J-V2.104, J-V2.107 |
| V02-0518 | home | Finalization | J-V2.108; V02 §3.14.5 (c)–(d); T-V2-36 |
| V02-0519 | glossary | 2.1 | V02 §2.1 |
| V02-0520 | glossary | 2.2 | V02 §2.2 |
| V02-0521 | glossary | 2.1 | V02 §2.1 |
| V02-0522 | glossary | 2.1 | V02 §2.1 |
| V02-0523 | glossary | 2.1 | V02 §2.1 |
| V02-0524 | glossary | 2.1 | V02 §2.1 |
| V02-0525 | glossary | 3.3 | V02 §3.3 |
| V02-0526 | glossary | 3.2 | V02 §3.2 |
| V02-0527 | glossary | 3.15 | V02 §3.15 |
| V02-0528 | glossary | 3.7 | V02 §3.7 |
| V02-0529 | glossary | 5.2 | V02 §5.2 |
| V02-0530 | glossary | 2.6 | V02 §2.6 |
| V02-0531 | glossary | 2.6 | V02 §2.6 |
| V02-0532 | glossary | 2.6 | V02 §2.6 |
| V02-0533 | glossary | 1b | V02 §1b |
| V02-0534 | glossary | 2.6 | V02 §2.6 |
| V02-0535 | glossary | 3.14.5 | V02 §3.14.5 |
| V02-0536 | glossary | 3.16 | V02 §3.16 |
| V02-0537 | glossary | 1b | V02 §1b |
| V02-0538 | glossary | 4.4 | V02 §4.4 |
| V02-0539 | glossary | 3.13 | V02 §3.13 |
| V02-0540 | glossary | 7 | V02 §7 |
| V02-0541 | glossary | 3.11 | V02 §3.11 |

## 3 Elegance rulings applied (routed: E-24, E-27)

**E-24 — one mark on a superseded or amended decision row** (home: each volume's §9). V02 §9's rows carry: J-V2.46
*Amended by J-V2.108* (the lift's wings); J-V2.56 *Amended by J-V2.96* (the keys); J-V2.73 and J-V2.76 *Superseded by
J-V2.79*; J-V2.58 *Retired* (a process choice with no design content, kept as a row); §9's opening line states the mark
rule. Equivalence list: ☑ no row dropped (108 rows, J-V2.1 – J-V2.108, sorted by id — TERM-2); ☑ the governing row keeps
the reason (J-V2.79 now carries J-V2.73's reason — "the nesting and the stair chain read only the wings with `on`, so
ground wings break neither" — and J-V2.76's — "a sealed stack, as the early stepped royal tombs, is a lawful building
whose unreached tiers V03 flags"; J-V2.96 and J-V2.108 keep theirs).

**E-27 — one `valleyReach(X, Y, mode)`** (home V02 §3.7; declared in V02 §2.4; read by `facadeBays` in `'int'` mode and by
V02 §5.2 step 2 in `'float'` mode). Equivalence list: ☑ the integer form's byte identity (floored integer centimetres by
§6.5's arithmetic; T-V2-13); ☑ the float form's view-only status (float64, the roofscape's view data). **Nuance
recorded:** for a `gable` or `hip` `Y` the two former expressions were one quantity; for a `shed` `Y` they disagreed (the
integer form read half the span, the float form the roof plane's whole run). The unified form reads the shed's full run
in both modes, as the roof plane does — the resolution of an internal contradiction, not a change of a defined
behaviour — and T-V2-54 tests it.

No other unification was made.

## 4 Conflicts resolved (10)

| conflict | ruling applied at |
|---|---|
| MC-01 (lot retired; `BuildingInput.plot`) | no `lot` outside a quotation; V02 reads `BuildingInput`'s fields by their base names (§2.6) |
| MC-11 (every base-record type declared in the base) | `DriftBounds` declared at §2.6 (item 385), cited at V02 §2.1 and §1b |
| V01-ICONF-4 and V02-XCONF-1 (the soffit bound over a crossed way) | V02 §3.17 (b) and J-V2.89 cite item 244's clearance rule (the way's held `clearanceCm`, else V11's per class) |
| V02-ICONF-1 (`composition.classFamily`'s home) | V02 §3.10.5 is the home and the one source; V07 cites it (V02 §3.10.5, J-V2.56, J-V2.96, X13) |
| V02-ICONF-2 (the effort as a running history) | V02 §8.3 states it once: the volume 22.5–32.5 pw; M6 18.25–27.5; M3a's part 2–2.75; spikes 2.25 |
| V02-ICONF-3 (R5's refusal) | R5's last rung holds the warp's step at the last lawful fraction for that building, named — never a refusal (V02 §8.4) |
| V02-ICONF-4 (round 1's increment placed twice) | the 0.25–0.5 pw inside M6; the hole sentence's cost inside M3a-V2 (V02 §8.3) |
| V09-XAGREE-3 (bend ids) | V02 §1b's bend set is the one set; V02 §4.3 and §4.6 now name `bend.room.host`, `bend.tiers.form`, `bend.tiers.top`, `bend.tier.height` and `bend.deck.floors` beside the rest; V09 §4.9 holds one row per id |
| CANON-C03 (open owner questions) | V02 §11 is the answered table (Q-V2-1: not now, J122; J121) |

## 5 Renumberings and id rulings

None. **ID-WX:** V02's rows (X1 – X33, the W-steps, the IN notes) stay volume-local; another volume's rows are cited as
"V06 X3", "V09 XV-V9-8" (V02 §13's received table). The IN notes' content is at its homes; *Integration notes* keeps one
pointer line per note — the brief keeps the notes, the canon folds their content (ID-WX, S9); both hold. **ID-DUPDEF:**
one definition per id — the decision table sorted by id (J-V2.77 and J-V2.78 now before J-V2.79); every `J-V2`, `T-V2`,
`X` and `BCR-V2` id defined once and every cited one defined (the census line of V02 §12). New ids: T-V2-54 (the valley's
reach), T-V2-55 (every rung), T-V2-56 (edges), T-V2-57 (combinations).

## 6 File f and file g

**File f items cited as base text (61):** 216–231, 234, 238, 242, 244–246, 259–261, 270, 303–305, 309, 318, 328,
332–333, 341, 346, 351, 370–371, 376–377, 385, 402, 406, 419, 426–427, 432, 435–436, 447, 449, 483, 499, 505, 522,
524–525, 567–568, 578. V02 §10 is the pointer table from each of its 42 requests to its item. Three items the canon routes
to V02 were not yet cited and now are: item 260 (a removed deck plot's held removal, V02 §3.16 (7)), item 483 (T28-1 and
T28-2 on the storey-less plan, T-V2-45), item 567 (M6-P, V02 §8.1). **File g:** items 102–110 at their homes as the
volumes pass integrated them (V02 §3.14, §3.15–§3.17); items 111–113 route no part to V02 (canon, *File g*); V02 reads
item 111's oasis as water through the base (V02 §3.18 (f)).

## 7 Wiring gaps closed (4)

| gap | closed at |
|---|---|
| W-DOS-10b | V02 §1b's dossier table names each row's derivation row (DR24, DR15, DR10, DR17, DR6, DR7) |
| W-IF-06 | V02 §1b's `terrace.wallBandCm` row names its consumer (the wing datum's wall-side sample); V03's walk-out reads its own band |
| W-HOOK-02 | V02 §3.1 registers `ComposedBuildingGenerator` (`BuildingGenerator.compose`'s implementer; the plan is V03's) |
| V02-WGAP-1 | V02 §5.3 and §5.6: every weight, size and pitch a cell of its program's entry in the sheet's `programs` (§8.2) or of its §8.10 row (`ridgeWeight`, `hipWeight`, `outlineWeight`, `pitchPx`, `lineWeight`, `sideGapShare`, `minTreadPx`, `stoneM`, `pitchM`) |

## 8 Hand-offs

**Sent (X1 – X33):** every row states what its destination carries and is closed there by that unit's editor (the canon's
hand-off rule); V02 keeps one line each, with its build-order stand-in where one exists (X4, X6, X7, X10, X14, X16, X17,
X21, X22, X24, X29). DEFER-3's three conditionals are gone: X7 runs from M6-U; X27 reads V11's `arena` plot row; X28's
bridge mid-span slot is item 246's rule (V11's `deck.landmarks/bridgeMid/minSpanM`). **Received (14), each closed in
V02:** V06 X3 (V02 §3.14.5 (c)), V06 X24 (V02 §3.16 (3)), V08 X6 (X17; V02 §3.2), V09 XV-V9-6 (V02 §3.14.5 (d), §4.5,
§4.6 (7), §3.16), V09 XV-V9-8 (V02 §8.3's M6c names AP10, counted on §16's line for V09's staged screens), V10 CVR-V10-8
(V02 §4.6 (7)), V11 X-V11-5 (V02 §3.2; X17), X-V11-7 (V02 §3.16 (2)), X-V11-9 (V02 §3.10.2), V12 X-V12-2 (V02 §7.5),
X-V12-11 (T-V2-50), X-V12-12 (V02 §8.5), X-V12-15 (V02 §3.10.10), X-V12-18 (V02 §3.10.10, as written).

## 9 Open findings routed to V02 (40) — each fixed in the text

| finding | fixed at |
|---|---|
| VOL-V01-V02-RESTATEMENTS-007, -008; V02-RESTATE-1, -2 | V02 §1c and M13 cite `LatticeSpec` without values |
| VOL-V01-V02-RESTATEMENTS-009; V02-RESTATE-4 | V02 §6 cites §1.1 and §12.5 |
| VOL-V01-V02-RESTATEMENTS-010; V02-RESTATE-5 | T-V2-7 reads the cathedral and church `HeightsRow`s (V11 §3.6.4) |
| VOL-V01-V02-RESTATEMENTS-011; V02-RESTATE-3 | V02 §5.3 and X14 cite V01 §7 |
| V02-ICONF-1 – -4, V02-XCONF-1 | §4 above |
| V02-ELEG-1 | E-27 (§3 above) |
| V02-WGAP-1 | §7 above |
| V02-MISSING-1 | V02 §11 |
| V02-TERM-1 | `Vnn §x.y` throughout, list continuations prefixed with their volume; 674 self-references and 255 other-volume references resolve |
| V02-TERM-2 | V02 §9 sorted by id |
| V02-TERM-3 | T-V2-36 reads "the ground wings over the basement's ring", V02 §3.14.5's key (J-V2.108) |
| V02-DEFER-1, -2 | V02 §8.1, §8.3, J-V2.32 (J122's order), J-V2.71 (no "later owner rule") |
| V02-DEFER-3 | X7, X27, X28 |
| V02-NARR-1 – -9 | the marker line; ledgers, round logs and in-body markers out; §9, §10, §11, §12, §13 rewritten; IN notes folded |
| V02-BREF-1 | the receipts cited at `docs/validation/coherence/receipts/V02/` (re-executed; README there) |
| V02-AMBIG-1 | V02 §3.13: the porch-meets-own-wing case under (2), and (4) with its identity composition |
| IN-V02-1 – -5 | X20; V02 §3.15.3, §3.17 (a), §4.2 step 2, §4.3; V02 §4.6 (7); V02 §4.6, §3.15; item 246 |

## 10 Edges (principle (11)) — 47 UNDEFINED, 21 UNTESTED, 28 combinations

All 96 are defined in V02 §3.18: four class rules — (a) degenerate geometry, (b) rungs, (c) toggles and presets, (d)
save, load, undo, redo, regenerate, migrate — a per-mechanism table (e) and a combination table (f), each row with its
outcome, its rung on §5's ladder and its test; the new bars T-V2-55 (every rung), T-V2-56 (the edge sub-fixture) and
T-V2-57 (the combination sub-fixture) hold what no existing bar held. Beyond the catalogue, (f) carries the owner's named
combinations that touch V02: a settlement growing over a sealed void, a deck plot on a bridge over a moat, a dossier
removing what an edit pinned, an epoch undone after a save.

| catalogue id | status | mechanism | defined at |
|---|---|---|---|
| M-V02-529-E5-data | UNDEFINED | V02 §2.2 | V02 §3.18 (e) the stored composition |
| M-V02-658-E5-data | UNDEFINED | V02 §2.4 | V02 §3.18 (e) the derived functions |
| M-V02-875-E6-rungs | UNDEFINED | V02 §3.1 | V02 §3.18 (b) |
| M-V02-894-E4-degenerate | UNDEFINED | V02 §3.2 | V02 §3.18 (a); (e) the row a building reads |
| M-V02-956-E4-degenerate | UNDEFINED | V02 §3.3 | V02 §3.18 (a) |
| M-V02-989-E4-degenerate | UNDEFINED | V02 §3.4 | V02 §3.18 (a); (e) fitting |
| M-V02-989-E5-data | UNDEFINED | V02 §3.4 | V02 §3.18 (e) fitting |
| M-V02-1015-E1-none | UNTESTED | V02 §3.5 | V02 §3.18 (e) the massing |
| M-V02-1015-E2-one | UNTESTED | V02 §3.5 | V02 §3.18 (e) the massing |
| M-V02-1015-E3-cap | UNTESTED | V02 §3.5 | V02 §3.18 (e) the massing |
| M-V02-1015-E4-degenerate | UNTESTED | V02 §3.5 | V02 §3.18 (a); (e) the massing |
| M-V02-1015-E5-data | UNTESTED | V02 §3.5 | V02 §3.18 (e) the massing |
| M-V02-1015-E6-rungs | UNTESTED | V02 §3.5 | V02 §3.18 (b) |
| M-V02-1015-E7-toggles | UNTESTED | V02 §3.5 | V02 §3.18 (c) |
| M-V02-1361-E1-none | UNTESTED | V02 §3.6 | V02 §3.18 (e) the composer |
| M-V02-1361-E2-one | UNTESTED | V02 §3.6 | V02 §3.18 (e) the composer |
| M-V02-1361-E4-degenerate | UNDEFINED | V02 §3.6 | V02 §3.18 (a); (e) the composer |
| M-V02-1361-E5-data | UNDEFINED | V02 §3.6 | V02 §3.18 (e) the composer |
| M-V02-1379-E4-degenerate | UNDEFINED | V02 §3.7 | V02 §3.18 (a); (e) the composer |
| M-V02-1379-E6-rungs | UNDEFINED | V02 §3.7 | V02 §3.18 (b) |
| M-V02-1469-E4-degenerate | UNDEFINED | V02 §3.8 | V02 §3.18 (a); (e) the rooms rung |
| M-V02-1469-E6-rungs | UNDEFINED | V02 §3.8 | V02 §3.18 (b) |
| M-V02-1521-E4-degenerate | UNDEFINED | V02 §3.9 | V02 §3.18 (a); (e) the mutation |
| M-V02-1521-E6-rungs | UNDEFINED | V02 §3.9 | V02 §3.18 (b) |
| M-V02-2029-E4-degenerate | UNDEFINED | V02 §3.11 | V02 §3.18 (a); (e) elaboration |
| M-V02-2029-E6-rungs | UNDEFINED | V02 §3.11 | V02 §3.18 (b) |
| M-V02-2065-E4-degenerate | UNDEFINED | V02 §3.12 | V02 §3.18 (a); (e) determinism |
| M-V02-2065-E5-data | UNDEFINED | V02 §3.12 | V02 §3.18 (e) determinism |
| M-V02-2117-E4-degenerate | UNDEFINED | V02 §3.14 | V02 §3.18 (a); (e) the owner's rules |
| M-V02-2117-E6-rungs | UNDEFINED | V02 §3.14 | V02 §3.18 (b) |
| M-V02-2201-E6-rungs | UNDEFINED | V02 §3.15 | V02 §3.18 (b) |
| M-V02-2428-E4-degenerate | UNDEFINED | V02 §3.16 | V02 §3.18 (a); (e) deck buildings |
| M-V02-2428-E6-rungs | UNDEFINED | V02 §3.16 | V02 §3.18 (b) |
| M-V02-2481-E4-degenerate | UNDEFINED | V02 §3.17 | V02 §3.18 (a); (e) item 110's rest |
| M-V02-2519-E1-none | UNTESTED | V02 §4.1 | V02 §3.18 (e) the ops |
| M-V02-2519-E2-one | UNTESTED | V02 §4.1 | V02 §3.18 (e) the ops |
| M-V02-2519-E4-degenerate | UNDEFINED | V02 §4.1 | V02 §3.18 (a); (e) the ops |
| M-V02-2519-E8-lifecycle | UNTESTED | V02 §4.1 | V02 §3.18 (d) |
| M-V02-2608-E1-none | UNTESTED | V02 §4.3 | V02 §3.18 (e) setComposition |
| M-V02-2608-E5-data | UNTESTED | V02 §4.3 | V02 §3.18 (e) setComposition |
| M-V02-2608-E6-rungs | UNDEFINED | V02 §4.3 | V02 §3.18 (b) |
| M-V02-2608-E8-lifecycle | UNTESTED | V02 §4.3 | V02 §3.18 (d) |
| M-V02-2629-E2-one | UNTESTED | V02 §4.4 | V02 §3.18 (d); (e) the skeleton file |
| M-V02-2629-E5-data | UNTESTED | V02 §4.4 | V02 §3.18 (d); (e) the skeleton file |
| M-V02-2629-E6-rungs | UNDEFINED | V02 §4.4 | V02 §3.18 (b) |
| M-V02-2629-E8-lifecycle | UNTESTED | V02 §4.4 | V02 §3.18 (d) |
| M-V02-2647-E4-degenerate | UNDEFINED | V02 §4.5 | V02 §3.18 (a); (e) the skeleton file; (e) the ops |
| M-V02-2647-E5-data | UNDEFINED | V02 §4.5 | V02 §3.18 (e) the skeleton file; (e) the ops |
| M-V02-2647-E6-rungs | UNDEFINED | V02 §4.5 | V02 §3.18 (b) |
| M-V02-2647-E8-lifecycle | UNDEFINED | V02 §4.5 | V02 §3.18 (d) |
| M-V02-2683-E4-degenerate | UNDEFINED | V02 §4.6 | V02 §3.18 (a); (e) editing stacks |
| M-V02-2803-E1-none | UNTESTED | V02 §5.1 | V02 §3.18 (e) drawing |
| M-V02-2803-E2-one | UNDEFINED | V02 §5.1 | V02 §3.18 (e) drawing |
| M-V02-2803-E6-rungs | UNDEFINED | V02 §5.1 | V02 §3.18 (b) |
| M-V02-2821-E4-degenerate | UNDEFINED | V02 §5.2 | V02 §3.18 (a) |
| M-V02-2821-E6-rungs | UNDEFINED | V02 §5.2 | V02 §3.18 (b) |
| M-V02-2897-E1-none | UNDEFINED | V02 §5.3 | V02 §3.18 (e) drawing |
| M-V02-2897-E6-rungs | UNDEFINED | V02 §5.3 | V02 §3.18 (b) |
| M-V02-2936-E4-degenerate | UNDEFINED | V02 §5.5 | V02 §3.18 (a); (e) exports |
| M-V02-2936-E6-rungs | UNDEFINED | V02 §5.5 | V02 §3.18 (b) |
| M-V02-2936-E7-toggles | UNDEFINED | V02 §5.5 | V02 §3.18 (c) |
| M-V02-2936-E8-lifecycle | UNDEFINED | V02 §5.5 | V02 §3.18 (d) |
| M-V02-2947-E1-none | UNTESTED | V02 §5.6 | V02 §3.18 (e) drawing |
| M-V02-2947-E2-one | UNDEFINED | V02 §5.6 | V02 §3.18 (e) drawing |
| M-V02-2947-E4-degenerate | UNDEFINED | V02 §5.6 | V02 §3.18 (a); (e) drawing |
| M-V02-2947-E5-data | UNDEFINED | V02 §5.6 | V02 §3.18 (e) drawing |
| M-V02-2947-E6-rungs | UNDEFINED | V02 §5.6 | V02 §3.18 (b) |
| M-V02-2947-E7-toggles | UNTESTED | V02 §5.6 | V02 §3.18 (c) |
| C-cliff-composed | UNDEFINED (combination) | — | V02 §3.18 (f): a cliff and a composed building |
| C-steep-composed | UNDEFINED (combination) | — | V02 §3.18 (f): steep ground and a composed building |
| C-steep-tiers | UNDEFINED (combination) | — | V02 §3.18 (f): steep ground and tiers |
| C-steep-crypt | UNDEFINED (combination) | — | V02 §3.18 (f): steep ground and a crypt |
| C-river-crypt | UNDEFINED (combination) | — | V02 §3.18 (f): a river … and a crypt |
| C-coast-composed | UNDEFINED (combination) | — | V02 §3.18 (f): a coast or an oasis and a composed building |
| C-coast-crypt | UNDEFINED (combination) | — | V02 §3.18 (f): a river … and a crypt |
| C-harbour-composed | UNDEFINED (combination) | — | V02 §3.18 (f): a harbour and a composed building |
| C-moat-composed | UNDEFINED (combination) | — | V02 §3.18 (f): a moat, a square or the map frame … |
| C-moat-tiers | UNDEFINED (combination) | — | V02 §3.18 (f): a moat, a square or the map frame … |
| C-moat-crypt | UNDEFINED (combination) | — | V02 §3.18 (f): a river, a coast, a moat or an oasis and a crypt |
| C-bridge-composed | UNDEFINED (combination) | — | V02 §3.18 (f): a bridge … and a composed building |
| C-raised-composed | UNDEFINED (combination) | — | V02 §3.18 (f): a raised way and … |
| C-raised-tiers | UNDEFINED (combination) | — | V02 §3.18 (f): a raised way and … |
| C-raised-crypt | UNDEFINED (combination) | — | V02 §3.18 (f): a raised way and … |
| C-square-composed | UNDEFINED (combination) | — | V02 §3.18 (f): a moat, a square or the map frame … |
| C-square-crypt | UNDEFINED (combination) | — | V02 §3.18 (f): a moat, a square or the map frame and a composed building, tiers or a crypt |
| C-oasis-composed | UNDEFINED (combination) | — | V02 §3.18 (f): a coast or an oasis and a composed building |
| C-oasis-tiers | UNDEFINED (combination) | — | V02 §3.18 (f): a moat, a square or the map frame … (the spring pool is water outside the plot) |
| C-oasis-crypt | UNDEFINED (combination) | — | V02 §3.18 (f): a river, a coast, a moat or an oasis and a crypt |
| C-frame-composed | UNDEFINED (combination) | — | V02 §3.18 (f): a moat, a square or the map frame … |
| C-frame-tiers | UNDEFINED (combination) | — | V02 §3.18 (f): a moat, a square or the map frame … |
| C-frame-crypt | UNDEFINED (combination) | — | V02 §3.18 (f): a moat, a square or the map frame and a composed building, tiers or a crypt |
| C-hood-composed | UNDEFINED (combination) | — | V02 §3.18 (f): a stage-2 neighbourhood (V01) and a composed building |
| C-terraced-ward-composed | UNDEFINED (combination) | — | V02 §3.18 (f): a terraced ward (V01) and … |
| C-terraced-ward-crypt | UNDEFINED (combination) | — | V02 §3.18 (f): a terraced ward (V01) and … |
| C-composed-lock | UNDEFINED (combination) | — | V02 §3.18 (f): a lock and a composed building |
| C-crypt-undo | UNDEFINED (combination) | — | V02 §3.18 (f): a crypt and undo |

## 11 Checks run (P4)

* Retired terms: no `lot` outside a quotation, no "first paint"; citation form `Vnn §x.y` (no `V2 §`, `V1-`, "volume n").
* Narration and review ids: none in the body (no round, revision, fold, seam or review-id marker; no scratchpad path; no
  canon or finding id).
* Deferral wording: none ("later" occurs only as time — a later epoch, a later S11 run).
* Ids and references: `work/rewrite-V02/assemble.py` asserts J-V2.1 – J-V2.108, T-V2-1 – T-V2-57, X1 – X33 and BCR-V2-01 –
  BCR-V2-42 each defined once and every cited id defined; 674 `V02 §` references resolve to a heading or a numbered
  label; 255 references into V01 and V03 – V12 resolve in those volumes; bare `§` references resolve in the rewritten base.
* `docs/validation/bench/doc_checks.py` on the new volume: **C1 0, C2 0, S1 0** (no reference identifier or colour; tables
  well formed); C3 555 hits (537 unreviewed; the old volume 705 / 669) — generic prose three-grams and number runs; C4 1
  hit, reviewed (on the allow list); S2 259 (147 with `--heads docs/ARCHITECTURE.md`) — each a `V02 §` or `Vnn §` pointer
  the checker reads as a base section. **The script warns that the reference corpus is incomplete in this checkout
  (captures/, research/patreon, research/devlogs, research/ftg-docs, research/external are absent): the clean-room result
  is NOT authoritative and is provisional until re-run on the owner's machine.**

## 12 CROSS-PART NOTES

1. V09: V02 §1b's bend ids are the one set (V09-XAGREE-3); V02 §4.3 and §4.6 now also name `bend.room.host`, `bend.tiers.form`, `bend.tiers.top`, `bend.tier.height` and `bend.deck.floors` — V09 §4.9 needs one catalogue row per id, T-V9-59 and V09 §4.20.5 re-pointed.
2. V01: V02 no longer states the NG parity sheet's roof-construction sentence (V02 §5.3 and X14 cite V01 §7) — V01 §7 carries it whole (VOL-V01-V02-RESTATEMENTS-011).
3. V03: T-V2-36 is keyed on the ground wings over the basement's ring (J-V2.108); X18 and X30 are recorded as closed at V03, whose editor carries them; T-V2-45 cites the base's T28-1 and T28-2 on the storey-less plan (item 483).
4. V11: X16's stand-in constants are read only while V11's `deck` table is unregistered (V02 §3.16 (2); X-V11-7 closed); X27 reads V11 §3.6.1's `arena` plot row with no fallback wording; X7's columns are item 436's (base §10.2).
5. scope (§16 and INDEX): V02's effort is stated once — the volume 22.5–32.5 pw; M6 18.25–27.5 (+ 2.25 of spikes = §16's 20.5–29.75); M3a's part 2–2.75; `facadeBays` built first, as its own item before V03's P0 (J122), its cost inside M6b; T-V2-36 from M6-U; V09's AP10 priced on §16's staged-screens line and built with M6c.
6. scope §13.2: V02's new bars T-V2-54 – T-V2-57 fall under item 522's pointer row to V02 §7; no base row is needed.
7. model (§2.7, §2.8): V02 §3.16 reads item 246's deck-plot `landmark` (a bridge's mid-span slot where its span reaches V11's `deck.landmarks/bridgeMid/minSpanM`) and item 260's held removal of a deck plot keyed by its host's id and slot ordinal — both should read so at their base homes.
8. V10: the registry paths `massing/stack` and `deck/landmarks/<head|mid>` are stated at V02 §4.6 (7) (IN-V02-3, CVR-V10-8); V10's providers and V09's panels read them there.
9. V07: `composition.classFamily` (V02 §3.10.5) is the one source of the village classes' composition keys; V07 cites it and names no second source (V02-ICONF-1); T-V2-55 runs on V07's B-VILLAGE at the village rungs.
10. V12: T-V2-50 is a `NoOpPin` on V12 §3.7.8's engine (X-V12-11); the stage-3 panel is a `PanelSpec` on V12 §3.9's engine with `'FM'` pairs (X-V12-2); T-V2-54 – T-V2-57 are hard conformance bars with no register line.
11. Integration notes: V02 keeps the heading with one pointer line per IN note (the brief keeps the notes); their content is folded at its homes as ID-WX rules — assemblers and verifiers should read the section as applied, not as open notes.
12. canon REFERENCE near-matches kept as V02 homes because the rewritten base cites V02 for them: V02-0251, -0259, -0260, -0261, -0262, -0271, -0275, -0276, -0278, -0280, -0302 (base §7.1, §7.4, §8.2, §8.6, §11.1 and §13.6 point to V02 §4.1, §4.4, §5.2, §5.3, §5.5, §7.5).
13. E-27's shed case: the unified `valleyReach` reads a shed's full run in both modes (the former integer form read half the span) — an internal contradiction resolved, tested by T-V2-54; for the E-27 equivalence verifier.
14. The `VG` preset and `massing.composed`: V11 §2.2 zeroes an `extension` to 0 under `VG` absent an entry, so whether village buildings compose under `VG` depends on V11's entry (V02 §12, PLAUSIBLE); V11 and V07 should state whether `VG` carries a `massing.composed` entry.
15. doc_checks here is provisional (the reference corpus is absent in the cloud checkout): C1 0, C2 0, S1 0; re-run on the owner's machine before any freeze.
