# Rewrite — base part §5 failure handling, §6 determinism, §7 editing (lane coherence/rewrite-determinism)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-determinism; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-determinism`, 2026-09-29)
- P1 inputs read (my part whole, the inventory, the canon's unit section and rulings, f items 327–404, 570–584 and the touching items, every BCR they cite, g items 102–113, the edge catalogue, V09 §4.3 and §4.9, the volumes' DR rows): done
- P2 §5 written (`new/base/determinism/01-s5-failure-handling.md`): done
- P3 §6 written (`02-s6-determinism.md`): done
- P4 §7 written (`03-s7-editing.md`): done
- P5 coverage checks (token check and sentence-overlap check against the pre-coherence text; 9 dropped details restored): done
- P6 this report (sizes, mapping table, rulings, f and g items, conflicts, renumberings, cross-part notes): done

## Outcome

The three top-level sections are rewritten in full, each file starting with its heading line exactly as today; every
subsection number is kept (no renumbering). Every routed f item (97, plus 7 items routed elsewhere whose text lands in
§5–§7) and every g part routed here (102–106, 108–111, 113) is applied; the 28 conflicts are resolved as the canon rules;
the 10 elegance rulings are applied with their equivalence lists kept; the 11 wiring gaps are closed; the 87 open
findings are closed (FIX); the 33 UNDEFINED and 4 UNTESTED edges and the 39 owned combinations have their outcome, rung
and test. **Size: the unit GREW, 63 117 → 74 098 words (+17.4 %).** The shrink goal (a third fewer) is not met; the
irreducible content that holds it is listed under *Sizes* below (≈ 12 800 words of ruled additions against ≈ 1 850 words
removed). No rule, case, value, bar, record field, lifecycle row, test, owner rule or reasoned decision was dropped.

## Sizes (principle (9))

| section | words before | words after | KB before | KB after |
|---|---|---|---|---|
| §5 | 11 083 | 11 178 | 65.3 | 66.3 |
| §6 | 12 912 | 13 952 | 79.5 | 84.6 |
| §7 | 39 122 | 48 968 | 240.0 | 300.5 |
| **unit** | **63 117** | **74 098** | **384.9** | **451.4** |

**Words removed, by source (estimates; PLAUSIBLE — measured by block, not by a word-level diff):** restatement ≈ 1 300
(the 45 REFERENCE items made pointers; the 20 internal duplications given one home each; F-EDIT's detection and action
lists replaced by the outcome table's citation; §5.3's rows cut to check and scope by E-11; F-PLAN, F-UNDER, F-VOID,
F-LABEL, F-LIGHT, F-CUT, F-CASTLE, F-SKELETON citing their homes; §6.1's decoration, labels and stamp-tile keying;
the per-level digest and the settings values W-SET-01 moves to V11); narration ≈ 250 (DIC-12's "appended by the
amendments of …", "retired by the same amendments", "amended so", "Fable review 2026-09-27", "should-have … must-have
hook", "the ten rows the survey's verification corrected", "as it did before item 31"); duplicated mechanisms ≈ 150 (E-08's
one `Rename`; E-11's one statement of the no-undo-target rule and of the dossier-owned refusal; E-06's merged extra-readers
paragraph); verbose prose ≈ 150.

**Words added, by source (measured blocks where named):** the staged layers' failure rows (f 327–331) 422; §5.1 (8)–(10)
(DWG-01, E-GEN-1, every rung) 392; the report codes and new report fields (DIC-03, f 337–339, 390, 470) 205; the dry-run
outcome table (E-07, f 582, J-VI.4's bends) 1 453; the event → tool binding (E-04) 540; the catacomb bend (f 361) 211; raised
ways, aqueducts and retaining walls (f 362–364, g 110) 426; delete and empty edits (f 260, 368; edges 004–006) 275; the
combinations table (the edge catalogue's 39 combinations) 573; DR26–DR40 and the replay record (f 383–398, g 105, 108,
109, 111, 113) 1 523; and, unmeasured as blocks, ≈ 6 800 more: the event union's new members and fields (f 349–368, 571,
g 111), the edit-target table's new rows (f 353–362, 264, 272, 356, 357, 360), §7.4's volume lifecycle rows (f 351, 353,
358, 373–375, 209, 555), §7.6's presets, provenance, pinning hash, reference cells and document-only tables (f 376–382,
581, 584, E-30, V12-XCONF-2, g 102, 103), §6.1's volume concerns, stage ids, `raised.reason`, fixed-key draws and the
history replay (f 340–345, E-03, g 113), §6.3's new anchor rows (f 346, 347, 476, DWG-05), §5.3's stage-3 and sky rows
(f 332, 333, 331), §7.3's dwelling closure and generation-time generators (f 372, 561), §7.7's never-read list and
closed-digest rule (W-DOS-01a), the contract's new fields (f 389–397), §7.8's new controls (f 402–404, 356, 515, 549).
**Why the band is not met:** file f moves ≈ 100 volume requests into their base homes (home rule S1), so the base
receives the text the volumes' §10 blocks drop; the canon's tables (E-04, E-06, E-07, E-10) and the edge and wiring
closures add definitions that did not exist. Set-wide, the volumes' §10 blocks become one-line pointers, so the move is
a net shrink for the set; the unit's own restatement and narration were small (45 references, 12 narration phrases).

## Mapping table (every inventory id → its new home)

A row's "same subsection" means the fact is stated in the same numbered subsection of the new text (the numbers are
kept); "referenced →" means the fact's home is elsewhere and the new text points to it; the E-rulings name where a fact
moved inside the unit.

| inventory id | kind | old place | new home |
|---|---|---|---|
| DETERMINISM-0001 | rule | §5 | §5 (same subsection) |
| DETERMINISM-0002 | rule | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0003 | provenance | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0004 | rule | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0005 | rule | §5.1 | referenced → pipeline §4.2 (a pointer at §5.1) |
| DETERMINISM-0006 | rule | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0007 | rule | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0008 | type | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0009 | interface | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0010 | type | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0011 | rule | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0012 | rule | §5.1 | referenced → kernel §3.1 (a pointer at §5.1) |
| DETERMINISM-0013 | number | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0014 | bar | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0015 | rule | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0016 | rule | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0017 | mechanism | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0018 | term | §5.1 | §5.1 (term; same home; glossary) |
| DETERMINISM-0019 | number | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0020 | rule | §5.1 | referenced → V02 (its section) (a pointer at §5.1) |
| DETERMINISM-0021 | test | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0022 | rule | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0023 | table | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0024 | rule | §5.1 | §5.1 (same subsection) |
| DETERMINISM-0025 | term | §5 | §5 (term; same home; glossary) |
| DETERMINISM-0026 | table | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0027 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0028 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0029 | number | §5.2 | referenced → pipeline §4.6 (a pointer at §5.2) |
| DETERMINISM-0030 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0031 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0032 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0033 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0034 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0035 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0036 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0037 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0038 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0039 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0040 | number | §5.2 | referenced → pipeline §4.7 (a pointer at §5.2) |
| DETERMINISM-0041 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0042 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0043 | failure-class | §5.2 | referenced → V03 §5.2 (a pointer at §5.2) |
| DETERMINISM-0044 | failure-class | §5.2 | referenced → V04 V04 §3.4 (a pointer at §5.2) |
| DETERMINISM-0045 | failure-class | §5.2 | referenced → V04 V04 §3.6 (a pointer at §5.2) |
| DETERMINISM-0046 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0047 | failure-class | §5.2 | referenced → rendering §9.4 (a pointer at §5.2) |
| DETERMINISM-0048 | failure-class | §5.2 | referenced → rendering §8.4 (a pointer at §5.2) |
| DETERMINISM-0049 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0050 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0051 | failure-class | §5.2 | §7.1 outcome table (E-07); §5.2 F-EDIT row cites it |
| DETERMINISM-0052 | failure-class | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0053 | number | §5.2 | §5.2 (same subsection) |
| DETERMINISM-0054 | rule | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0055 | rule | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0056 | rule | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0057 | invariant | §5.3 | referenced → kernel §3.10 (a pointer at §5.3) |
| DETERMINISM-0058 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0059 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0060 | invariant | §5.3 | referenced → V02 §2.6 (a pointer at §5.3) |
| DETERMINISM-0061 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0062 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0063 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0064 | invariant | §5.3 | referenced → V03 §2.6 (a pointer at §5.3) |
| DETERMINISM-0065 | invariant | §5.3 | referenced → V03 §2.6 (a pointer at §5.3) |
| DETERMINISM-0066 | invariant | §5.3 | referenced → model §2.6 (a pointer at §5.3) |
| DETERMINISM-0067 | invariant | §5.3 | referenced → model §2.6 (a pointer at §5.3) |
| DETERMINISM-0068 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0069 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0070 | invariant | §5.3 | referenced → V06 §4.11 (a pointer at §5.3) |
| DETERMINISM-0071 | invariant | §5.3 | referenced → V06 §4.11 (a pointer at §5.3) |
| DETERMINISM-0072 | invariant | §5.3 | referenced → V04 II.6 (a pointer at §5.3) |
| DETERMINISM-0073 | invariant | §5.3 | referenced → V04 II.7.3 (a pointer at §5.3) |
| DETERMINISM-0074 | invariant | §5.3 | referenced → V04 II.7.5 (a pointer at §5.3) |
| DETERMINISM-0075 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0076 | invariant | §5.3 | referenced → model §2.6 (a pointer at §5.3) |
| DETERMINISM-0077 | invariant | §5.3 | referenced → pipeline §4.7 (a pointer at §5.3) |
| DETERMINISM-0078 | invariant | §5.3 | referenced → pipeline §4.7 (a pointer at §5.3) |
| DETERMINISM-0079 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0080 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0081 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0082 | term | §5.3 | §5.3 (term; same home; glossary) |
| DETERMINISM-0083 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0084 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0085 | invariant | §5.3 | referenced → model §2.6 (a pointer at §5.3) |
| DETERMINISM-0086 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0087 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0088 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0089 | invariant | §5.3 | referenced → model §2.7 (a pointer at §5.3) |
| DETERMINISM-0090 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0091 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0092 | invariant | §5.3 | referenced → model §2.1 (a pointer at §5.3) |
| DETERMINISM-0093 | invariant | §5.3 | referenced → kernel §3.10 (a pointer at §5.3) |
| DETERMINISM-0094 | invariant | §5.3 | referenced → pipeline §4.2 (a pointer at §5.3) |
| DETERMINISM-0095 | invariant | §5.3 | referenced → pipeline §4.2 (a pointer at §5.3) |
| DETERMINISM-0096 | invariant | §5.3 | referenced → pipeline §4.6 (a pointer at §5.3) |
| DETERMINISM-0097 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0098 | invariant | §5.3 | referenced → pipeline §4.4 (a pointer at §5.3) |
| DETERMINISM-0099 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0100 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0101 | invariant | §5.3 | referenced → rendering §9.6 (a pointer at §5.3) |
| DETERMINISM-0102 | invariant | §5.3 | referenced → pipeline §4.5 (a pointer at §5.3) |
| DETERMINISM-0103 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0104 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0105 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0106 | invariant | §5.3 | referenced → model §2.9 (a pointer at §5.3) |
| DETERMINISM-0107 | invariant | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0108 | rule | §5.3 | referenced → rendering §9.4 (a pointer at §5.3) |
| DETERMINISM-0109 | rule | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0110 | rule | §5.3 | §5.3 (same subsection) |
| DETERMINISM-0111 | interface | §5.4 | §5.4 (same subsection) |
| DETERMINISM-0112 | list | §5.4 | referenced → kernel §3.1 (a pointer at §5.4) |
| DETERMINISM-0113 | type | §5.4 | §5.4 (same subsection) |
| DETERMINISM-0114 | interface | §5.4 | §5.4 (same subsection) |
| DETERMINISM-0115 | rule | §5.4 | §5.4 (same subsection) |
| DETERMINISM-0116 | rule | §5.4 | §5.4 (same subsection) |
| DETERMINISM-0117 | rule | §5.4 | §5.4 (same subsection) |
| DETERMINISM-0118 | rule | §5.4 | §5.4 (same subsection) |
| DETERMINISM-0119 | rule | §5.4 | §5.4 (same subsection) |
| DETERMINISM-0120 | rule | §5.4 | §5.4 (same subsection) |
| DETERMINISM-0121 | rule | §5.4 | §5.4 (same subsection) |
| DETERMINISM-0122 | term | §5.3 | §5.3 (term; same home; glossary) |
| DETERMINISM-0123 | term | §5.3 | §5.3 (term; same home; glossary) |
| DETERMINISM-0124 | term | §5.2 | §5.2 (term; same home; glossary) |
| DETERMINISM-0125 | defect | §5.4 | §5.4 (same subsection) |
| DETERMINISM-0126 | rule | §6 | §6 (same subsection) |
| DETERMINISM-0127 | mechanism | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0128 | rule | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0129 | mechanism | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0130 | rule | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0131 | mechanism | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0132 | number | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0133 | term | §6.1 | §6.1 (term; same home; glossary) |
| DETERMINISM-0134 | rule | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0135 | rule | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0136 | rule | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0137 | rule | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0138 | rule | §6.1 | §6.1 concern table (E-06) |
| DETERMINISM-0139 | number | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0140 | rule | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0141 | rule | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0142 | rule | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0143 | rule | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0144 | rule | §6.1 | referenced → rendering §9.2 (a pointer at §6.1) |
| DETERMINISM-0145 | rule | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0146 | rule | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0147 | table | §6.1 | §6.1 concern table (E-06) |
| DETERMINISM-0148 | rule | §6.1 | referenced → rendering §8.10 (a pointer at §6.1) |
| DETERMINISM-0149 | rule | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0150 | rule | §6.1 | §6.1 concern table (E-06) |
| DETERMINISM-0151 | rule | §6.1 | §6.1 concern table (E-06) |
| DETERMINISM-0152 | rule | §6.1 | §6.1 concern table (E-06) |
| DETERMINISM-0153 | test | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0154 | interface | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0155 | rule | §6.1 | referenced → rendering §8.10 (a pointer at §6.1) |
| DETERMINISM-0156 | mechanism | §6.1 | §6.1 (same subsection) |
| DETERMINISM-0157 | rule | §6.1 | referenced → scope §1 (a pointer at §6.1) |
| DETERMINISM-0158 | rule | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0159 | term | §6.2 | §6.2 (term; same home; glossary) |
| DETERMINISM-0160 | rule | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0161 | rule | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0162 | bar | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0163 | rule | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0164 | term | §6.2 | §6.2 (term; same home; glossary) |
| DETERMINISM-0165 | mechanism | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0166 | mechanism | §6.2 | referenced → kernel §3.3 (a pointer at §6.2) |
| DETERMINISM-0167 | mechanism | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0168 | rule | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0169 | mechanism | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0170 | term | §6.2 | §6.2 (term; same home; glossary) |
| DETERMINISM-0171 | mechanism | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0172 | number | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0173 | rule | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0174 | bar | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0175 | rule | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0176 | mechanism | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0177 | rule | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0178 | rule | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0179 | rule | §6.2 | §6.2 (same subsection) |
| DETERMINISM-0180 | term | §6.2 | §6.2 (term; same home; glossary) |
| DETERMINISM-0181 | rule | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0182 | mechanism | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0183 | table | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0184 | term | §6.3 | §6.3 (term; same home; glossary) |
| DETERMINISM-0185 | mechanism | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0186 | rule | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0187 | rule | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0188 | rule | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0189 | term | §6.3 | §6.3 (term; same home; glossary) |
| DETERMINISM-0190 | rule | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0191 | rule | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0192 | rule | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0193 | rule | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0194 | table | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0195 | rule | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0196 | bar | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0197 | mechanism | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0198 | number | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0199 | rule | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0200 | rule | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0201 | rule | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0202 | rule | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0203 | rule | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0204 | rule | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0205 | test | §6.3 | §6.3 (same subsection) |
| DETERMINISM-0206 | rule | §6.4 | §6.4 (same subsection) |
| DETERMINISM-0207 | rule | §6.4 | §6.4 (same subsection) |
| DETERMINISM-0208 | rule | §6.4 | §6.4 (same subsection) |
| DETERMINISM-0209 | rule | §6.4 | §6.4 (same subsection) |
| DETERMINISM-0210 | rule | §6.4 | §6.4 (same subsection) |
| DETERMINISM-0211 | rule | §6.4 | §6.4 (same subsection) |
| DETERMINISM-0212 | term | §6.4 | §6.4 (term; same home; glossary) |
| DETERMINISM-0213 | interface | §6.4 | §6.4 (same subsection) |
| DETERMINISM-0214 | rule | §6.4 | §6.4 (same subsection) |
| DETERMINISM-0215 | rule | §6.4 | §6.4 (same subsection) |
| DETERMINISM-0216 | test | §6.4 | §6.4 (same subsection) |
| DETERMINISM-0217 | rule | §6.4 | §6.4 (same subsection) |
| DETERMINISM-0218 | bar | §6.4 | §6.4 (same subsection) |
| DETERMINISM-0219 | rule | §6.4 | §6.4 (same subsection) |
| DETERMINISM-0220 | term | §6.4 | §6.4 (term; same home; glossary) |
| DETERMINISM-0221 | rule | §6.5 | referenced → kernel §3.2 (a pointer at §6.5) |
| DETERMINISM-0222 | rule | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0223 | rule | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0224 | rule | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0225 | rule | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0226 | rule | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0227 | rule | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0228 | rule | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0229 | rule | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0230 | rule | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0231 | test | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0232 | test | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0233 | test | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0234 | test | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0235 | test | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0236 | test | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0237 | test | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0238 | rule | §6.5 | §6.5 (same subsection) |
| DETERMINISM-0239 | term | §6.5 | §6.5 (term; same home; glossary) |
| DETERMINISM-0240 | rule | §7 | §7 (same subsection) |
| DETERMINISM-0241 | interface | §7.1 | §7.1; the rule stated once at §7.4 Replay semantics (E-11) |
| DETERMINISM-0242 | type | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0243 | type | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0244 | type | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0245 | type | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0246 | type | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0247 | type | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0248 | interface | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0249 | type | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0250 | type | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0251 | type | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0252 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0253 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0254 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0255 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0256 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0257 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0258 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0259 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0260 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0261 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0262 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0263 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0264 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0265 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0266 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0267 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0268 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0269 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0270 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0271 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0272 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0273 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0274 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0275 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0276 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0277 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0278 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0279 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0280 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0281 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0282 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0283 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0284 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0285 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0286 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0287 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0288 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0289 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0290 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0291 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0292 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0293 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0294 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0295 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0296 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0297 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0298 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0299 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0300 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0301 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0302 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0303 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0304 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0305 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0306 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0307 | edit-kind | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0308 | type | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0309 | type | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0310 | type | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0311 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0312 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0313 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0314 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0315 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0316 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0317 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0318 | mechanism | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0319 | table | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0320 | number | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0321 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0322 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0323 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0324 | rule | §7.1 | §7.1; the refusal stated once at §7.7 item 11 (E-11) |
| DETERMINISM-0325 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0326 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0327 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0328 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0329 | table-row | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0330 | table-row | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0331 | table-row | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0332 | table-row | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0333 | table-row | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0334 | table-row | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0335 | table-row | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0336 | table-row | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0337 | table-row | §7.1 | §7.1; the refusal stated once at §7.7 item 11 (E-11) |
| DETERMINISM-0338 | table-row | §7.1 | §7.1; the refusal stated once at §7.7 item 11 (E-11) |
| DETERMINISM-0339 | table-row | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0340 | table-row | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0341 | table-row | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0342 | table-row | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0343 | table-row | §7.1 | §7.1; the refusal stated once at §7.7 item 11 (E-11) |
| DETERMINISM-0344 | table-row | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0345 | mechanism | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0346 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0347 | rule | §7.1 | §7.1; the refusal stated once at §7.7 item 11 (E-11) |
| DETERMINISM-0348 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0349 | table | §7.1 | §7.1 toolkit table + binding table (E-04) |
| DETERMINISM-0350 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0351 | mechanism | §7.1 | §7.1; the refusal stated once at §7.7 item 11 (E-11) |
| DETERMINISM-0352 | mechanism | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0353 | number | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0354 | rule | §7.1 | §7.1 (same subsection) |
| DETERMINISM-0355 | term | §7.1 | §7.1 (term; same home; glossary) |
| DETERMINISM-0356 | rule | §7.2 | §7.2 (same subsection) |
| DETERMINISM-0357 | rule | §7.2 | §7.2 (same subsection) |
| DETERMINISM-0358 | rule | §7.2 | §7.2 (same subsection) |
| DETERMINISM-0359 | rule | §7.2 | §7.2 (same subsection) |
| DETERMINISM-0360 | rule | §7.2 | §7.2 (same subsection) |
| DETERMINISM-0361 | rule | §7.2 | §7.2 (same subsection) |
| DETERMINISM-0362 | mechanism | §7.2 | §7.2 (same subsection) |
| DETERMINISM-0363 | number | §7.2 | §7.2 (same subsection) |
| DETERMINISM-0364 | mechanism | §7.2 | §7.2 (same subsection) |
| DETERMINISM-0365 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0366 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0367 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0368 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0369 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0370 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0371 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0372 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0373 | table-row | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0374 | table-row | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0375 | table-row | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0376 | table-row | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0377 | table-row | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0378 | number | §7.3 | referenced → pipeline §4.7 (a pointer at §7.3) |
| DETERMINISM-0379 | table-row | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0380 | table-row | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0381 | table-row | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0382 | table-row | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0383 | table-row | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0384 | table-row | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0385 | term | §7.3 | §7.3 (term; same home; glossary) |
| DETERMINISM-0386 | table-row | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0387 | table-row | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0388 | table-row | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0389 | mechanism | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0390 | number | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0391 | mechanism | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0392 | mechanism | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0393 | step | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0394 | step | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0395 | step | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0396 | step | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0397 | step | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0398 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0399 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0400 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0401 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0402 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0403 | test | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0404 | test | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0405 | test | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0406 | number | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0407 | test | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0408 | test | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0409 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0410 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0411 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0412 | rule | §7.3 | §7.3; the refusal stated once at §7.7 item 11 (E-11) |
| DETERMINISM-0413 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0414 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0415 | interface | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0416 | term | §7.3 | §7.3 (term; same home; glossary) |
| DETERMINISM-0417 | rule | §7.3 | §7.3 (same subsection) |
| DETERMINISM-0418 | rule | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0419 | rule | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0420 | rule | §7.4 | §7.4; the rule stated once at §7.4 Replay semantics (E-11) |
| DETERMINISM-0421 | rule | §7.4 | §7.4; the rule stated once at §7.4 Replay semantics (E-11) |
| DETERMINISM-0422 | term | §7.4 | §7.4 (term; same home; glossary) |
| DETERMINISM-0423 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0424 | lifecycle-row | §7.4 | §7.4; the refusal stated once at §7.7 item 11 (E-11) |
| DETERMINISM-0425 | lifecycle-row | §7.4 | §7.4 world-point table (E-10) |
| DETERMINISM-0426 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0427 | number | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0428 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0429 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0430 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0431 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0432 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0433 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0434 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0435 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0436 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0437 | lifecycle-row | §7.4 | §7.4; the rule stated once at §7.4 Replay semantics (E-11) |
| DETERMINISM-0438 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0439 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0440 | lifecycle-row | §7.4 | §7.4; the refusal stated once at §7.7 item 11 (E-11) |
| DETERMINISM-0441 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0442 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0443 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0444 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0445 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0446 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0447 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0448 | number | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0449 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0450 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0451 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0452 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0453 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0454 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0455 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0456 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0457 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0458 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0459 | lifecycle-row | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0460 | rule | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0461 | rule | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0462 | rule | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0463 | rule | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0464 | rule | §7.4 | §7.4; the rule stated once at §7.4 Replay semantics (E-11) |
| DETERMINISM-0465 | mechanism | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0466 | term | §7.4 | §7.4 (term; same home; glossary) |
| DETERMINISM-0467 | rule | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0468 | rule | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0469 | test | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0470 | rule | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0471 | number | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0472 | rule | §7.4 | §7.4; the rule stated once at §7.4 Replay semantics (E-11) |
| DETERMINISM-0473 | mechanism | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0474 | bar | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0475 | test | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0476 | mechanism | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0477 | mechanism | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0478 | rule | §7.4 | §7.4 world-point table (E-10) |
| DETERMINISM-0479 | rule | §7.4 | §7.4 world-point table (E-10) |
| DETERMINISM-0480 | table | §7.4 | §7.4 (same subsection) |
| DETERMINISM-0481 | rule | §7.5 | §7.5 (same subsection) |
| DETERMINISM-0482 | rule | §7.5 | §7.5 (same subsection) |
| DETERMINISM-0483 | rule | §7.5 | §7.5 (same subsection) |
| DETERMINISM-0484 | rule | §7.5 | §7.5 (same subsection) |
| DETERMINISM-0485 | rule | §7.5 | §7.5 (same subsection) |
| DETERMINISM-0486 | number | §7.5 | referenced → model §2.9 (a pointer at §7.5) |
| DETERMINISM-0487 | rule | §7.5 | §7.5 (same subsection) |
| DETERMINISM-0488 | rule | §7.5 | §7.5 (same subsection) |
| DETERMINISM-0489 | rule | §7.5 | §7.5 (same subsection) |
| DETERMINISM-0490 | interface | §7.5 | §7.5 (same subsection) |
| DETERMINISM-0491 | test | §7.5 | §7.5 (same subsection) |
| DETERMINISM-0492 | rule | §7.5 | §7.5 schema-transform table (E-10) |
| DETERMINISM-0493 | rule | §7.5 | §7.5 schema-transform table (E-10) |
| DETERMINISM-0494 | rule | §7.5 | §7.5 (same subsection) |
| DETERMINISM-0495 | mechanism | §7.6 | §7.6 (same subsection) |
| DETERMINISM-0496 | term | §7.6 | §7.6 (term; same home; glossary) |
| DETERMINISM-0497 | rule | §7.6 | §7.6 (same subsection) |
| DETERMINISM-0498 | rule | §7.6 | §7.6 (same subsection) |
| DETERMINISM-0499 | rule | §7.6 | V11 §3.1 registry (E-05); §7.6 cites it |
| DETERMINISM-0500 | table | §7.6 | §7.6 (same subsection) |
| DETERMINISM-0501 | rule | §7.6 | §7.6 (same subsection) |
| DETERMINISM-0502 | rule | §7.6 | §7.6 (same subsection) |
| DETERMINISM-0503 | rule | §7.6 | §7.6 (same subsection) |
| DETERMINISM-0504 | rule | §7.6 | §7.6 (same subsection) |
| DETERMINISM-0505 | rule | §7.6 | §7.6 (same subsection) |
| DETERMINISM-0506 | rule | §7.6 | §7.6 (same subsection) |
| DETERMINISM-0507 | rule | §7.6 | §7.6 (same subsection) |
| DETERMINISM-0508 | rule | §7.6 | §7.6 (same subsection) |
| DETERMINISM-0509 | rule | §7.6 | §7.6 (same subsection) |
| DETERMINISM-0510 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0511 | term | §7.7 | §7.7 (term; same home; glossary) |
| DETERMINISM-0512 | mechanism | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0513 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0514 | table | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0515 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0516 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0517 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0518 | mechanism | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0519 | term | §7.7 | §7.7 (term; same home; glossary) |
| DETERMINISM-0520 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0521 | mechanism | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0522 | number | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0523 | mechanism | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0524 | mechanism | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0525 | number | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0526 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0527 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0528 | interface | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0529 | interface | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0530 | type | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0531 | interface | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0532 | interface | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0533 | interface | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0534 | interface | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0535 | interface | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0536 | interface | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0537 | interface | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0538 | interface | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0539 | interface | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0540 | interface | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0541 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0542 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0543 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0544 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0545 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0546 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0547 | mechanism | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0548 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0549 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0550 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0551 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0552 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0553 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0554 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0555 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0556 | rule | §7.7 | §7.7; the rule stated once at §7.4 Replay semantics (E-11) |
| DETERMINISM-0557 | rule | §7.7 | §7.7; the rule stated once at §7.4 Replay semantics (E-11) |
| DETERMINISM-0558 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0559 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0560 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0561 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0562 | term | §7.7 | §7.7 (term; same home; glossary) |
| DETERMINISM-0563 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0564 | table-row | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0565 | table-row | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0566 | table-row | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0567 | table-row | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0568 | table-row | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0569 | table-row | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0570 | table-row | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0571 | table-row | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0572 | table-row | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0573 | table-row | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0574 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0575 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0576 | table | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0577 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0578 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0579 | table | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0580 | table | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0581 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0582 | number | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0583 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0584 | number | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0585 | rule | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0586 | table | §7.7 | §7.7 (same subsection) |
| DETERMINISM-0587 | mechanism | §7.8 | §7.8 (same subsection) |
| DETERMINISM-0588 | rule | §7.8 | §7.8 (same subsection) |
| DETERMINISM-0589 | bar | §7.8 | §7.8 (same subsection) |
| DETERMINISM-0590 | rule | §7.8 | §7.8 (same subsection) |
| DETERMINISM-0591 | mechanism | §7.8 | §7.8 (same subsection) |
| DETERMINISM-0592 | number | §7.8 | §7.8 (same subsection) |
| DETERMINISM-0593 | rule | §7.8 | §7.8 (same subsection) |
| DETERMINISM-0594 | number | §7.8 | §7.8 (same subsection) |
| DETERMINISM-0595 | rule | §7.8 | §7.8 (same subsection) |
| DETERMINISM-0596 | term | §7.8 | §7.8 (term; same home; glossary) |
| DETERMINISM-0597 | term | §7.3 | §7.3 (term; same home; glossary) |
| DETERMINISM-0598 | term | §7.3 | §7.3 (term; same home; glossary) |
| DETERMINISM-0599 | term | §7.3 | §7.3 (term; same home; glossary) |
| DETERMINISM-0600 | term | §7.1 | §7.1 (term; same home; glossary) |
| DETERMINISM-0601 | term | §7.1 | §7.1 (term; same home; glossary) |
| DETERMINISM-0602 | term | §7.2 | §7.2 (term; same home; glossary) |
| DETERMINISM-0603 | term | §5.1 | §5.1 (term; same home; glossary) |
| DETERMINISM-0604 | term | §5.1 | §5.1 (term; same home; glossary) |
| DETERMINISM-0605 | term | §6.5 | §6.5 (term; same home; glossary) |
| DETERMINISM-0606 | term | §6.2 | §6.2 (term; same home; glossary) |
| DETERMINISM-0607 | term | §7.4 | §7.4 (term; same home; glossary) |
| DETERMINISM-0608 | term | §7.4 | §7.4 (term; same home; glossary) |
| DETERMINISM-0609 | term | §7.4 | §7.4 (term; same home; glossary) |
| DETERMINISM-0610 | term | §7.4 | §7.4 (term; same home; glossary) |
| DETERMINISM-0611 | term | §7.3 | §7.3 (term; same home; glossary) |
| DETERMINISM-0612 | term | §6.4 | §6.4 (term; same home; glossary) |
| DETERMINISM-0613 | term | §7.6 | §7.6 (term; same home; glossary) |
| DETERMINISM-0614 | term | §7.6 | §7.6 (term; same home; glossary) |
| DETERMINISM-0615 | term | §7.7 | §7.7 (term; same home; glossary) |
| DETERMINISM-0616 | term | §7.7 | §7.7 (term; same home; glossary) |
| DETERMINISM-0617 | term | §7.7 | §7.7 (term; same home; glossary) |
| DETERMINISM-0618 | term | §7.7 | §7.7 (term; same home; glossary) |
| DETERMINISM-0619 | term | §7.7 | §7.7 (term; same home; glossary) |
| DETERMINISM-0620 | term | §7.7 | §7.7 (term; same home; glossary) |
| DETERMINISM-0621 | term | §7.7 | §7.7 (term; same home; glossary) |
| DETERMINISM-0622 | term | §7.7 | §7.7 (term; same home; glossary) |
| DETERMINISM-0623 | term | §7.3 | §7.3 (term; same home; glossary) |
| DETERMINISM-0624 | term | §7.1 | §7.1 (term; same home; glossary) |
| DETERMINISM-0625 | term | §7.7 | §7.7 (term; same home; glossary) |
| DETERMINISM-0626 | term | §5.1 | §5.1 (term; same home; glossary) |
| DETERMINISM-0627 | term | §5.3 | §5.3 (term; same home; glossary) |
| DETERMINISM-0628 | term | §7.7 | §7.7 (term; same home; glossary) |
## Elegance rulings applied (principle (9)), equivalence lists ticked

* **E-03 UNIFY — the fixed-key draw.** Stated once at §6.1 (*Fixed-key draws*); the `sewer` row cites it. ☑ catacomb
  source re-compared when the chance rises (the pattern's "compared at each moment its site names against the chance
  then in force"); ☑ overlap shaft's own key and chance row, ☑ crypt join's own/other split, ☑ the dig's persistence and
  "appears when the chance later rises", ☑ the public opening's candidate order — each site keeps its own key parts,
  chance, moments and persistence (V04's text); ☑ V04 §3.12's exception list stays V04's (cross-note).
* **E-04 UNIFY — the event → tool binding.** One table at §7.1 keyed by (event kind, target class or path); §7.4's
  create cells cite tools by id. ☑ every EditEvent kind has a row (the base's and the volumes': `terrace`, `declareEnd`,
  `placeSkyAccess`, `setHearth`, `setMassing`, `setComposition`, `dossierFacts`, `dossierRecord` included); ☑ history
  kinds marked with their producer (the "no tool — its producer" row); ☑ V09's per-target homes kept (split/merge at T5
  for districts, T9 for ways and plots; delete at T10, and T9 for access points and catacomb galleries; instance at T6,
  T8, T9); ☑ T-V9-12 checks completeness over the pairs (V09-ICONF-2).
* **E-05 UNIFY — the table registry.** §7.6's enumeration moves to V11 §3.1; §7.6 cites it. ☑ every table the old
  enumeration named must be a registry row (T-V11-1; cross-note to V11 with the archived list); ☑ readers per table as
  V11 §3.1 states them; ☑ the base's settings values get a row (W-SET-01).
* **E-06 UNIFY — the concern registry.** One table at §6.1 (concern | cap | keyed by — and read by; kind, rerollability
  and retirement in the cell). ☑ each concern's keying sentence kept as its cell (the "also draws" readers merged into
  their concern's row); ☑ retired ids (`cut.side`, `cut.farSideAlt`) reserved and listed; ☑ every attempt cap as an index
  without changing a number of draws (DIC-02); ☑ the amendment narration removed.
* **E-07 UNIFY — refusal and bend causes.** One outcome table at §7.1 (cause | outcome | action or bend target | key);
  §5.2's F-EDIT row cites it. ☑ each case's offered alternative its own row; ☑ refusals only for a dossier fact or a lock
  among declarations (non-declaration conflicts — the undo dependency, `E_KEPT`, the staged layer, the caps — kept as
  conflicts or refusals with their actions, as before); ☑ f item 582's three bends as rows; ☑ V09's `bend.*` and
  `refuse.*` keys map one to one.
* **E-08 UNIFY — `Rename`.** One type in §7.1; §5.4's `ReportEntry` rename variant is `{ kind: 'rename' } & Rename`. ☑
  same fields and meaning.
* **E-09 KEEP APART** — `DisruptionReport.moved { use, from, to | null }` and `ReportEntry` relocate `{ use, from?, to? }`
  kept separate (the `null` meaning "vacated" commented in §7.1).
* **E-10 UNIFY — two tables in disguise.** §7.4's world-point records as a table (record | host face | clearance | when
  re-seating fails); §7.5's schema transforms as a table (record or field | an older document | at first load | item).
  ☑ the door light's ring-edge fraction rule a row; ☑ Works' rings never re-seated a row; ☑ "none is invented" cases
  rows.
* **E-11 UNIFY — restated rules.** The dossier-owned refusal stated once (§7.7 item 11), the no-undo-target rule once
  (§7.4 *Replay semantics*), and §5.3's rows cut to their check and scope with the rule's home cited. ☑ §5.3's scope and
  check columns stay §5.3's.
* **E-30 UNIFY — reference cells.** Lifted into §7.6 for every table. ☑ the compile check (a dangling or unit-mismatched
  reference fails the table compile); ☑ `editTable`'s inverse restores the reference (its undo); ☑ V07's references
  (V11 §3.6.1, §3.24.1, §3.24.4) expressed in the one form (cross-note to V07 §2.2a).

## f items applied

At their home subsections: **§5.2** 327 (F-TEMPLATE, F-DISPATCH, F-UNIT), 328 (F-MASSING, F-COMPOSE), 329 (the stair's
kind continuation and the no-abort fit ladder inside F-PLAN, citing V03 §3.3, §3.9), 330 (F-NET; F-UNDER's last clause
moved into it), 331 (the ten F-SKY rows); **§5.3** 332, 333 (stage-3 wing invariants, stacked wings), 334 (the unit
reached through circulation), 335 (households in transit), 331 (the sky invariants), 226 and 371 (the raised crypt and
the ground wings in the basement row); **§5.4** 337 (`aqueduct_no_source`, `toll_bridge_dry`), 338 (a stage's own
warnings), 339 (the epoch reports), 390 (`dossierNotes`), 470 ((c) F-EDIT's `MsgRef`s; (d) the `prefix` list); **§6.1**
340 ((a) the three V01 concerns reserved at M1; (b) the standalone neighbourhood's town-root index 1), 341, 342, 344,
345 (`S8.seed`), 476 (`island.place`'s draws); 343's fields are recorded inputs at §6.2 (their declaration is §4.11's,
cross-note); **§6.2** 340 (c) (the `closeups` node); **§6.3** 345, 346, 347, 203, 459, 476 (the sky access anchor);
**§7.1** 582, 348, 349, 350, 351, 352, 353, 354, 355 (with J-VI.4's "bent to the cover limit"), 356, 357, 358, 359, 360,
361, 362, 363, 364, 365, 366, 367, 368, 570, 571, 264 ((c) the mutation-plan row), 272 ((b)–(d): `closeup`, the toolkit,
the close-ups row), 245 (the retaining-wall rows and state profile's lifecycle), 260 (the delete's suppression);
**§7.3** 369, 370, 363, 372, 561; **§7.4** 351, 353, 358, 373, 374, 375, 209 (the `EvolveOp` row cause `convert:<op>`),
555 (AccessPoint.state, V04-ICONF-1), 371 (d) (the basement's ground wings in the warp check), 370 (the building datum
pass); **§7.6** 376, 377, 581, 584, 378, 379, 380, 381, 382, 556, 510 (the dossier row sets' pointer); **§7.7** 383–401,
202 (the records placement in *One path*; §7.7 item 15's registered-product clauses), 256 (the key law's rows; item 8's
records), 260 (BCR-V8-31 in §7.7 item 3), 511 (DR24's custom inputs; item 1's description clause); **§7.8** 402, 403, 404,
515, 549, 356.

Not applied here, cross-noted to their text's home: **336** (BCR-V6-18 amends §4.11's *Regrowth-first* paragraph — file
f lists it under §5.3, but its text is §4.11's); **343**'s `EpochInputs.wealthLevel` and `advance` declarations (with
V06-ICONF-3's `stoppedAt?`) are §4.11's; §6.2 records them as inputs.

## g items applied (items 102–110 as f items; 111 and 113 as new design at build depth)

* **102** — §7.6: `w_sun` a registry row (and its climate cell, item 111 (c)); §7.7: `Intent.latitudeDeg` (DR29).
* **103** — §7.6: the siting tables in the registry, their provenance ("general historical knowledge, not
  corpus-witnessed" where nothing witnesses them).
* **104** — §7.7 item 1: the port reads the custom record and the optional definition fields (`HostContext.customLibrary`);
  DR24's custom inputs.
* **105** — §7.7: `activeChains[]` as DR33's input; `siting.linkEdits` a document-only table (§7.6).
* **106** — §5.2 F-WALL: every open stretch anchored on a closure-arc barrier or an enceinte (J-VI.3's six kinds); DR2's
  waterfront from circumstances and the harbour-mouth chain bar.
* **108** — §7.7 DR9: the ladder step types, the ladder rows pinned to the port's baseline, the `kinds` rows for the
  unnumbered qualifiers (research's mapping table T9, cited by its row-set name per ID-TOOL).
* **109** — §7.7: DR30 (the ruin's existence evidence: `ancient_ruins`, `magical_node`, the history events) and DR31 (the
  mining deposits and `mountain`), DR17's ruin and void sources.
* **110** — §5.3: the deck invariant revised ("… a ground-part-0 deck only over water; a raised part's deck may span land
  and ways"); §7.1: T3's `retaining` kind, T4's `raised` flag and the `aqueduct` class, the `terrace` sugar, deck plots
  un-staged; §7.4: their lifecycle.
* **111** (new design) — §7.1: T2 `ground`'s lake point-and-level form with `PointsForm.spring` (an oasis added by
  hand; removed by `delete` of its water body with its spring, grove and gardens); §7.4: its lifecycle row (in the draw
  row, the "Every kind" table's oasis row) and its undo; §7.7: DR40 (`oasis_water` makes an oasis exist; the site DR1's);
  §7.5: an older event has no `spring`.
* **113** (new design) — §7.7: DR36 (the peak, the effective `symbolic` peak and its evidence order), DR37 (the replay's
  epochs and event mapping), DR38 (destruction and refounding), DR39 (burial past the threshold), and the replay's record
  for the clerk (W-DOS-09); §6.1: the replay's streams — its coarse epochs keyed with the epoch component `0x8000 + r`,
  the upper half of the u16 range reserved to it, no concern of its own; §6.2: the history as one more delivered fact;
  §6.5 (9): the replay byte-stable per seed and history.

## Conflicts resolved (28)

DIC-01 (`'load'` scope, §5.4); DIC-02 (the attempt cap an index, §6.1; the tier table "attempt cap 2"; F-CUT, `style.random`
and every tier-3 geometric concern read cap 2 — `siteplan.mutate`, `siteplan.entrance`, `plan.layout`, V02's `massing`,
whose ladders are tier 3's three attempts; V01's `hood.template` keeps 3, its own attempts 1–3 after 0; naming keeps 8
(§9.6's `attempt=n (≤ 8)`); every "cap 0" keeps 0); DIC-03 (the report codes table, `FailureClass`); DIC-04 (DR21's chance
cell "`works` (§6.1)"); DIC-05 / ID-ITEM (`§7.7 item n` and `§7.3 item n` for a section's own items); DIC-06 / SCOPE-C11 /
ID-TOOL (a tool id written with its word at first use per paragraph or table row); DIC-07 / ID-LAYER (the toolkit
layers "L0 INTENT … L4 FINISH"); DIC-08 (the convert row's migrate cell); DIC-09 (`PolygonCm`); DIC-10 (the two text
defects); DIC-11 (the forms catalogue as built); DIC-12 (the narration removed); DXC-01 / KXC-01 (F-NUM keeps
`E_OUT_OF_RANGE` in its optional-chain use, citing §3.1); DXC-02 / KXC-04 (F-SKELETON cites §3.8's four post-conditions,
`W_DOWNGRADE`); DXC-03 / KXC-05 (`kernel.warnings` a count per §3.1 code; `downgrades` counts `W_DOWNGRADE`); DXC-04
(the binding table); DXC-05 (the registry's home V11 §3.1; `reroll.maxAdvance` and `crossing.searchBandM` cells of the
base settings row, no value stated); DXC-06 / KXC-02 (F-PLOT, F-CORRIDOR and §5.3 cite §4.7's class-floor row without
values); RXC-02 (F-LIGHT cites §8.4 (g)'s and §8.8's triggers); SCOPE-C01 (§7.7 item 15: the small-dossier refusal only
while no village product is registered; absorb at 0 → THORP; creation below 1 refused); V04-ICONF-1 (AccessPoint.state's
lifecycle in §7.4's underground row); V09-ICONF-2 (the binding keyed by (kind, target)); V12-XCONF-2 (the pinning hash at
§7.6 excludes the whole provenance block).

## Wiring gaps closed (11)

W-DOS-01a (§7.7 item 1: the never-read list completed and the closed-digest rule); W-DOS-01b (item 1 names V08 §2.4's
field table as the list — V08 writes it); W-DOS-02 (DR6 reads `EpochInputs.wealthLevel` by receipt F9 through V08 §3.5's
diff row — V08 writes the row); W-DOS-09 (DR36–DR39 and the replay record); W-EDIT-01 (the binding table); DWG-01 (§5.1
(8), `bugs`); DWG-02 (`Diff` at §5.4; `UpgradeDiff` at §7.5); DWG-03 / W-SET-01 (the base settings row cited); DWG-04
(`attempts` defined and read); DWG-05 (anchor rows: yard part, `Frontage`, `Corridor`, castle, decoration, institution).
**Also closed on the way:** the raised-way generator's stream had no registered concern — `raised.reason` registered
(§6.1), read by DR34 and DR35 and by V06's `EVO_RAISED`; `ClosureRecord.piece` gains `chamber` and `fountain` for the two
new closures (a `newKind` chamber, an aqueduct's terminal fountain).

## Edges defined (principle (11))

§5.1 (9) states E-GEN-1 once; §5.1 (10) states rung-independence with the per-rung tests; §5.3 closes vacuous rows at a
rung lacking their subject; §5.4's empty lists; §6.1 the user reroll cap reached; §6.3 coincident and zero-size anchors;
§6.4 the window with fewer than three versions and the link cases (one-line, one-event, at the limit); §6.5 (9) the
METROPOLIS-cap fixture; §7.1 an empty warp, an empty drawBoundary cover (bent), the empty edits; §7.2's tests (E1, E2, E5,
E8); §7.3 item 10's variations when advances run out; §7.4 a record larger than the undo cap, the "Every kind at the edit
boundary" table for the 39 combinations (cliff, steep ground, river, coast, harbour, moat, bridge, raised way, retaining
wall, deck plot, square, oasis, frame × edit, lock, undo, save and load, regenerate); §7.7 item 5 a missing or zero
budget row, a dossier value superseding a user's; §7.8 a disabled control's reason. The owner-named combination "a
dossier removing what an edit pinned" is §7.7 item 5's supersession and orphaning; "an epoch undone after a save" §7.4's
epoch row with the saved undo section.

## Renumberings and new ids

No subsection renumbered. Derivation rows: DR26–DR35 numbered (ID-DR; the working names retired), DR36–DR39 (history)
and DR40 (the oasis) new. New registry id: concern `raised.reason`. New types: `FailureClass`, `ReportCode` (§5.4 table),
`Diff`, `UpgradeDiff`. New `EditScope` member `{ kind: 'shade'; island }` (V05). No test or decision id minted; the
decisions below are recorded here for the index.

## Decisions taken under J122 (vetoable; for the Judgment-calls index)

1. The history replay keys its coarse epochs with the epoch component `0x8000 + r` (§6.1), reserving the u16 range's
   upper half, so no replay draw equals a live epoch's — over a separate stage-id family, because the replay runs the
   same stages and concerns as a live epoch.
2. The raised-way generator's stream is registered as `raised.reason` (cap 0) rather than left unnamed, because §7.7's
   totality test requires every chance cell to name a registered concern.
3. DIC-02's reading for the tier-3 concerns stated "attempt cap 3" (above): their ladders are the tier table's three
   attempts, so cap 2; hood.template keeps its own four.
4. `village.track` is kept rerollable as file f item 344 rules, as the one geometry exception, its `rerollLayer` dry-run
   as a Re-derive from VS4 with the fate report, so no geometry changes without a fate list.
5. Plan-edit refusals (a room below its minimum, a unit without a door), a `relet` above capacity, a passage below two
   storeys, a table cell out of range and a roster line the rules cannot honour are bends (J-VI.4 "R2 governs every tool";
   V09 §4.9's `bend.*` rows); capacity re-homing that cannot place its excess and a Works edit that strands a plot stay
   conflicts, because no lawful form exists to bend to.
6. An empty edit appends nothing (reported through the existing `ok` result with nothing changed), over appending a no-op
   event, so digests and `nextSeq` never move for nothing.

## Cross-part notes (what another unit must change; not edited here)

* **scope (§13, §14, §16, index):** add to §13.1 the bug-abort fault-injection fixtures and the "`bugs` empty" CI bar, and
  one degenerate input per failure class (§5.1 (8)–(9)); run §6.5 (9)'s cross-host, replay = session and truncation tests
  on one fixture per base rung plus a METROPOLIS-cap fixture; list in §13.2 the empty-edit fixtures (§7.1), §7.2's tests,
  the "Every kind at the edit boundary" fixtures (§7.4), the report-schema test (§5.4), the budget-row schema test (§7.7
  item 5) and the disabled-control registry test (§7.8); §14's `migrate` returns `{ doc, diff: UpgradeDiff }` (§7.5); cite
  tools with their words (ID-TOOL) in §13.8 and §16; enter decisions 1–6 above as index rows if kept.
* **kernel:** §3.1 states `E_OUT_OF_RANGE`'s two uses (a mandatory chain's bug; an optional chain's F-NUM); §3.8 names
  F-SKELETON beside `W_DOWNGRADE`; §3.3 cites the dynamic grid's cell sizes as cells of V11's base settings row
  (W-SET-01).
* **pipeline:** §4.7 carries the class-floor row (DXC-06); §4.6 step 8 (a) states F-CUT's constants (the 36° turns, the
  area bound, the six-call bound, the residue band) and §4.8 the castle repair constants and the harbour-work definition
  (§5.2, §5.3 now cite them); §4.2 S1 (5) cites `crossing.searchBandM` as the V11 cell, no value; §4.11 applies file f
  item 336 (BCR-V6-18's *Regrowth-first* text) and declares `EpochInputs.wealthLevel` and `advance` (item 343, with
  `stoppedAt?`); the raised-way generator (§4.3, §4.6; item 290) draws on `raised.reason` (§6.1); §4.2 S0's history option
  and §4.11's replay use the replay epoch component (§6.1); §4.2 S1's oasis construction is the target of T2's
  `spring` form; the readers' sections (§4.5, §4.11, II.2, II.3, II.7) cite §6.1's concern rows for keying rather than
  restating it (DETERMINISM-RESTATEMENTS-019); §4.5's two numbered lists (S7b's and item 72's) are now cited by name from
  §5–§7 (DBR-01) — keep their names stable.
* **model:** §2.3 declares the oasis's spring flag, grove and garden rows S1 writes (g 111's wiring consequence; §7.1 and
  §7.4 cite "§2.3"); §2.8's registry closure generators for `drawChamber { newKind }` and the aqueduct terminal's fountain
  (`ClosureRecord.piece` `chamber`, `fountain`); `Document.nextSkyPart`'s migration default (1 + the highest sky part);
  `CustomChainRecord`, `CustomServiceRecord` in §2.7 (item 256).
* **rendering:** §8.4 (g) and §8.8 own F-LIGHT's triggers and §9.4 F-LABEL's; §8.10 owns the stamp-tile and decoration
  keying §6.1 now cites; §11.2's empty-edit preview is `ok` with nothing changed; §11.1's skeleton writer carries
  `proposedBy` (item 365).
* **V01:** §3.13's three rows now live at base §5.2 (cite them); DR-V1.1 is DR26; its §4.4 rows are §7.4's stage-2 row;
  its concerns are §6.1 rows.
* **V02:** F-MASSING and F-COMPOSE at §5.2; the stage-3 invariants at §5.3; §4.4's rows at §7.4; `massing` and `compose.*`
  at §6.1 (`massing` cap 2); the `FM` preset at §7.6.
* **V03:** F-PLAN's tiers at §5.2, §3.9 keeps the step-to-tier mapping; the plan-edit bends are base outcome rows.
* **V04:** F-NET, F-UNDER, F-VOID at §5.2; §3.12's fixed-key draws cite §6.1's pattern and keep only their parts and
  exceptions (E-03); §2.6 drops its own AccessPoint.state row for §7.4's (V04-ICONF-1); DR17, DR30–DR32.
* **V05:** §3.17's rows at §5.2 (cite them); the sky invariants at §5.3; DR-SKY is DR27; the sky lifecycle rows at §7.4.
* **V06:** "the base's raised-way stream" is `raised.reason` (W59, §2.13, §3.16); the replay engine keys coarse epochs with
  `0x8000 + r`; DR-V6.1 is DR28; the strike pool term.
* **V07:** `rerollLayer('forest')` (§4.1's T10 row, §4.3) names a concern the base does not register as rerollable — tree
  crowns alone are `style.crowns` (T12 `dress`); change it, or request a registry row; §2.2a's reference cells cite §7.6
  (E-30); `declareEnd` and walk rows are §7.4's.
* **V08:** write V08 §2.4's adapter field table (W-DOS-01b) and V08 §3.5's `wealth` diff row (W-DOS-02); DR-V8.1–DR-V8.8
  are DR29–DR35 (DR-V8.6 = DR28); the F-V8 receipt rows are named in §7.7 item 13.
* **V09:** §4.3 keeps screen and gesture columns and cites §7.1's binding (E-04); §4.9's `refuse.*` and `bend.*` rows map
  to §7.1's outcome table (E-07); add a message row for an empty edit ("nothing to apply").
* **V10:** §3.5's encoders cite §7.1's binding.
* **V11:** §3.1 holds every table the pre-coherence §7.6 enumeration named (the archived text) and the base settings row
  (`reroll.maxAdvance`, `crossing.searchBandM`, the dynamic grid's cell sizes; W-SET-01); §3.2.1 step 7 computes the
  pinning hash without the provenance block; the compiler resolves reference cells for every table (E-30).
* **V12:** §2.10 cites §7.6's pinning hash (V12-XCONF-2).

## CONFIRMED versus PLAUSIBLE

CONFIRMED (executed): the three files exist with their exact heading lines; the word and byte counts above; every one of
the 628 inventory ids is mapped (script); a token check finds every distinctive token of the unit's home items (identifiers,
J-/D-/T- ids, numbers with units) present in the new text except the six values ruled to other homes (36°, 12°, ≈ 17 ms,
2 MB × 2) — a sentence-overlap check over 2 326 old sentences found 55 below 0.6 overlap and 119 between 0.6 and 0.78, each
reviewed: all intentional moves or references except nine dropped details, restored. PLAUSIBLE (reasoning only): the
split of removed words by source; that the volumes' pointers make the move a net shrink for the set; that the edge
outcomes chosen here agree with the volume editors' parallel texts.
