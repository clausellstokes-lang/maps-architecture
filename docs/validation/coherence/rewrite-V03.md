# Rewrite V03 — the coherence, cohesion, wiring and elegance pass over volume 3 (interiors)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/rewrite-V03; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/rewrite-V03`, 2026-09-29 – 2026-09-30)
- P1 inputs gathered (canon unit V03: 6 conflicts, 3 elegance rulings, 2 id rulings, 2 wiring gaps, 48 f items concerning it and 34 request pointers, 13 hand-offs to close, 7 agreement disagreements, edges 29 UNDEFINED + 26 UNTESTED + 6 combinations, 36 open findings, inventory 513 ids; no g 111+ part routed): done
- P2 the volume read whole (3 855 lines): done
- P3–P8 new text part by part (`work/rewrite-V03/parts/` 00-head-s0 … 15-s10-13; paused at the owner's two-lane cap at 16:26, resumed; cut by an API usage limit at 16:48, resumed at 18:54): done
- P9 assembly to `new/volumes/V03-interiors.md` (byte-identical to the parts), sweeps (ids, references, terms, tags, deferral wording), nuance audit: done
- P10 checks re-run on the master; report (sizes, mapping table, elegance, conflicts, renumberings, cross-part notes), result file (`results/coherence_rewrite-V03.json`), LANDED: done

**Output:** `docs/validation/coherence/new/volumes/V03-interiors.md` — the same title line, one marker line, the same
sections §0–§13 and *Integration notes*, plus the new **§3.13 Edges at their limits** (principle (11)); the ten
reconciliation-round records and the finalization record are removed (narration; V03-NARR-11). Sources: the volume
`docs/volumes/V03-interiors.md`, its inventory (`inventory-vol-V03-V04.json`, ids V03-0001 – V03-0513), the canon
(`canon.md`/`canon.json` → `units.V03`), the base sections it cites (the rewritten parts under `new/base/`), file f,
file g and `docs/volumes/INDEX.md` with its rewritten parts under `new/index/`. Working parts:
`docs/validation/coherence/work/rewrite-V03/parts/` (with `routing.md` and `tools/clean.py`).

## 1 Sizes

Words by the canon's counting (whitespace tokens; the canon's baseline 82 788 for V03):

| part | before | after | change | what moved |
|---|---|---|---|---|
| title, marker, ledgers | 1 880 | 114 | −93.9 % | eight stacked banners → one marker line (V03-NARR-1); the PROGRESS, revision and round ledgers out (V03-NARR-2) |
| §0 | 1 199 | 1 148 | −4.3 % | inline narration out; citation form |
| §1 | 2 216 | 2 093 | −5.6 % | the room-label range, the plan row and the cache line cited (§9.4, §12.7, §12.8; RESTATEMENTS-001, -002); IN-V03-3 folded |
| §1b | 3 301 | 2 992 | −9.4 % | one *Derived pieces* list (V03-DUP-1) and one readers home (V03-DUP-2); the `plan` and `crypt` section providers added (V03-WGAP-1); provenance tags out (V03-NARR-3) |
| §2 | 14 269 | 13 174 | −7.7 % | base-declared records cited at §2.6 (item 232); `Entrance.storey`'s type comment → a reference (V03-DUP-4); E-28's `PlanReport.notes`; tags out (V03-NARR-4) |
| §3 | 18 927 | 20 520 | +8.4 % | **+1 116 for the new §3.13**; the crypt-edit dry runs (V09-XAGREE-2), the wet-ground rule (V10-XAGREE-4), the drop no step reaches (J-V3.131) and `doorRunPoint` (E-29) added; the storey-less rule's one home (V03-DUP-3); vault, capped bays and stair-entered defined once (V03-DUP-5); without §3.13 +2.5 % |
| §4 | 3 665 | 4 205 | +14.7 % | the one edit table (tool, semantics, §7.4 row, undo; V03-DUP-6); the section providers with their keys (+237; IN-V03-1); §14's key precedence cited (V04-XCONF-2); edge sentences |
| §5 | 2 304 | 2 413 | +4.7 % | the stops cite §8.8; edge sentences added; §5.3 kept as the export content's home (base §11.1 cites it) |
| §6 | 887 | 869 | −2.0 % | the budget rows cite §12.7 and §12.8 |
| §7 | 5 114 | 5 867 | +14.7 % | **+≈ 700 for T-V3-36** (the edge bar, clauses (a)–(s)); T-V3-11 (v), T-V3-12's section providers, T-V3-23 (g) citing T-V4-50; tags and "unbuilt" remarks out (V03-NARR-6) |
| §8 | 2 049 | 1 942 | −5.2 % | J122's decided order (V03-DEFER-3); the critique's recomputation out (V03-NARR-7); §16 computes the totals |
| §9 | 9 224 | 8 097 | −12.2 % | round labels and layers out of J-V3.111 – J-V3.129 (V03-NARR-9); E-24's marks; J-V3.110 withdrawn (V03-NARR-8); **+321 for J-V3.130 – J-V3.132** |
| §10 | 6 326 | 576 | −90.9 % | 33 request blocks → one pointer table (each request is base text by file f) |
| §11 | 274 | 164 | −40.1 % | the one answered question (CANON-C03, V03-MISSING-1) |
| §12 | 3 020 | 681 | −77.5 % | one current CONFIRMED / PLAUSIBLE list; the per-round receipts out (V03-NARR-11, V03-BREF-1) |
| §13 | 3 066 | 942 | −69.3 % | the per-round hand-offs out; one live hand-off table (V03-DUP-7) with the 13 received hand-offs |
| Integration notes | 258 | 119 | −53.9 % | notes folded at their homes; one pointer line each |
| Reconciliation rounds 1–6 (with three second briefs), Finalization | 4 809 | 0 | −100 % | V03-NARR-11 |
| **total** | **82 788** | **65 916** | **−20.4 %** | 493.9 KB → 379.0 KB |

**Sources of the removed words** (gross ≈ 20 500, of which ≈ 3 600 were added back as required new content):
narration ≈ 68 % (≈ 13 900: the canon's narration ranges, 12 761 words — the banners, the ledgers, the round and
finalization records, §12's receipts and §13's per-round text — and 928 inline provenance tags with their seam and round
wording); restatement ≈ 26 % (≈ 5 300: §10's 33 request texts, now base text by file f, and the 31 REFERENCE items);
duplicated mechanisms ≈ 3 % (≈ 600: V03-DUP-1 – -6 and E-29's door run); verbose prose ≈ 3 % (≈ 700).

**Below the band (25–40 %; the canon's band 49 673 – 62 091 words), and why.** The volume is at build depth: §2.4's 29
rule tables with their default rows at every band (the data a builder ships as `roomProgram.json`), §2.1's typed
records, §3's derivation (A1–A6, S1–S6, H1–H4, E1–E2, the cut machine, O1–O5, W1–W4, the ways down and the crypt), 132
reasoned decisions and 36 bars are content the guard keeps whole. This pass added required content — §3.13 and T-V3-36
(principle (11)), J-V3.130 – J-V3.132, the crypt-edit dry runs, the wet-ground rule, the drop no step reaches, the door-run
helper, the section providers and the received hand-offs, ≈ 3 600 words; without the additions the cut is ≈ 24.7 %. The
nuance audit gave back to eleven decisions (J-V3.115 – J-V3.127) the reasons and rejected alternatives a first compaction
had thinned (J-V3.127's seven refinements now stand at V03 §3.7.4, V03 §3.7.6, V03 §3.7.1 and V03 §3.9's table), and to
§12 three PLAUSIBLE claims and two test pointers. No part shrank by more than half except the narration and pointer parts
named above (the ledgers, §10, §12, §13, the IN notes, the records), whose content is at its homes (the mapping table
below); the unit as a whole shrank by 20.4 %, so the more-than-half nuance audit does not apply.

## 2 Mapping table — every inventory id of V03 → where it now lives

Roles are the canon's (`canon.json → by_inventory_id`): home 375, index-row 47, bcr-pointer 33, reference 31, glossary
20, handoff 6, answer-J121-J122 1 — **513 mapped, 0 unmapped**. Each statement was placed by the overlap of its
identifiers and words with the new text's sections: 465 at their old section (≥ 0.5 of their tokens there), 44 by word
overlap, 4 weak and placed by hand (V03-0082, §1b's outside-ground row, `RetainingWall` renamed; V03-0108, V03 §2.1 as
declared at §2.6; V03-0169, V03 §3.2 A2; V03-0486, §13's V04 row). Every `V03 §x` target resolves to a section of the new
volume.

**Token coverage.** Every code identifier, id and number-with-unit of every inventory statement (2 063 tokens) was
searched in the new volume (homes, index rows, hand-offs) or in the new volume, the rewritten base and file f
(references, pointers): 33 absent, in 25 items, each intended —
* renamed to the base's record or the one spelling: `RetainingWalls` → `RetainingWall` (§2.7; V03-0082, -0083, -0231,
  -0315), `AccessPoints` → `AccessPoint` (V03-0108), `ProgramRooms` → `ProgramRoom` (V03-0169), `splitFaces` →
  `splitFace`s (V03-0198, -0204), `moduleCm2` → `moduleCm²` (V03-0202, -0473), `RoomProgramRow.for` → the extended
  `RoomProgramRow`'s `for.cls` and `for.use` cells (V03 §2.4; V03-0128, -0451);
* restatements cut to a citation: the room-label range's 5 px and 9 px (§9.4; V03-0034, -0291, -0306), the cache
  line's 4 KB (§12.8; V03-0039, -0300), 3.3 cm per CSS px at 1:125 (§8.8; V03-0288);
* provenance ids replaced by section references: J-V2.90 and J-V2.92 (V02 §2.6, V02 §2.4; V03-0050), BCR-V2-13 and
  BCR-V2-18 (items 261 and 505, read as base text; V03-0231, -0490, -0491);
* figures inside ranges the tokenizer reads whole: 0.25, 2.25, 2.75, 4.5 and 25.25 pw (V03 §8 and V03 §12: "M2b
  (0.25)", "PE's split of 0.25 and 0.5–0.75 pw", "2.25–2.75", "3.25–4.5", "18.5–25.25"; V03-0315, -0317, -0485); 5.5 pw
  is the critique's recomputation, removed as narration (V03-NARR-7; V03-0316);
* `stageReaders` — V11's field; the closed hand-off X-V11-16 now names row 38's readers themselves (V03 §2.4; V03-0487).

| inventory id | role | old § | where it now lives | note |
|---|---|---|---|---|
| V03-0001 | home | 0 | V03 §0 |  |
| V03-0002 | home | 0 | V03 §0 |  |
| V03-0003 | home | 0 | V03 §0 |  |
| V03-0004 | home | 0 | V03 §0 |  |
| V03-0005 | home | 0 | V03 §0 |  |
| V03-0006 | home | 1 | V03 §1 |  |
| V03-0007 | reference | 1 | V03 §1 — a pointer to §2.6 | restatement → reference |
| V03-0008 | index-row | 1 | V03 §1 (its hooks row) → §2.6 | index row citing the base home |
| V03-0009 | index-row | 1 | V03 §1 (its hooks row) → §2.6 | index row citing the base home |
| V03-0010 | index-row | 1 | V03 §1 (its hooks row) → §2.6 | index row citing the base home |
| V03-0011 | index-row | 1 | V03 §1 (its hooks row) → §2.6 | index row citing the base home |
| V03-0012 | index-row | 1 | V03 §1 (its hooks row) → §2.8/§2.9 | index row citing the base home |
| V03-0013 | index-row | 1 | V03 §1 (its hooks row) → §2.8 | index row citing the base home |
| V03-0014 | index-row | 1 | V03 §1 (its hooks row) → §3.4 | index row citing the base home |
| V03-0015 | index-row | 1 | V03 §1 (its hooks row) → §3.2 (8) | index row citing the base home |
| V03-0016 | index-row | 1 | V03 §1 (its hooks row) → §3.8 | index row citing the base home |
| V03-0017 | index-row | 1 | V03 §1 (its hooks row) → §3.10 | index row citing the base home |
| V03-0018 | index-row | 1 | V03 §1 (its hooks row) → §4.1 | index row citing the base home |
| V03-0019 | index-row | 1 | V03 §1 (its hooks row) → §4.12 | index row citing the base home |
| V03-0020 | index-row | 1 | V03 §1 (its hooks row) → §4.7 | index row citing the base home |
| V03-0021 | index-row | 1 | V03 §1 (its hooks row) → §4.7/item 63 | index row citing the base home |
| V03-0022 | index-row | 1 | V03 §1 (its hooks row) → §4.11 | index row citing the base home |
| V03-0023 | index-row | 1 | V03 §1 (its hooks row) → §5.2 | index row citing the base home |
| V03-0024 | index-row | 1 | V03 §1 (its hooks row) → §5.3 | index row citing the base home |
| V03-0025 | index-row | 1 | V03 §1 (its hooks row) → §6.1 | index row citing the base home |
| V03-0026 | index-row | 1 | V03 §1 (its hooks row) → §6.3 | index row citing the base home |
| V03-0027 | index-row | 1 | V03 §1 (its hooks row) → §7.1 | index row citing the base home |
| V03-0028 | index-row | 1 | V03 §1 (its hooks row) → §7.2-§7.4 | index row citing the base home |
| V03-0029 | index-row | 1 | V03 §1 (its hooks row) → §7.6/§14 | index row citing the base home |
| V03-0030 | index-row | 1 | V03 §1 (its hooks row) → §7.7 | index row citing the base home |
| V03-0031 | index-row | 1 | V03 §1 (its hooks row) → §8.2/§8.5/§8.6 | index row citing the base home |
| V03-0032 | index-row | 1 | V03 §1 (its hooks row) → §8.8 | index row citing the base home |
| V03-0033 | index-row | 1 | V03 §1 (its hooks row) → §8.4 | index row citing the base home |
| V03-0034 | index-row | 1 | V03 §1 (its hooks row) → §9.4 | index row citing the base home |
| V03-0035 | index-row | 1 | V03 §1 (its hooks row) → §10.2 | index row citing the base home |
| V03-0036 | index-row | 1 | V03 §1 (its hooks row) → §10.3/§2.7 | index row citing the base home |
| V03-0037 | index-row | 1 | V03 §1 (its hooks row) → §11.1 | index row citing the base home |
| V03-0038 | index-row | 1 | V03 §1 (its hooks row) → §11.2 | index row citing the base home |
| V03-0039 | index-row | 1 | V03 §1 (its hooks row) → §12.7/§12.8 | index row citing the base home |
| V03-0040 | index-row | 1 | V03 §1 (its hooks row) → §13.2/§13.7 | index row citing the base home |
| V03-0041 | index-row | 1 | V03 §1 (its hooks row) → §14 | index row citing the base home |
| V03-0042 | index-row | 1 | V03 §1 (its hooks row) → II.7.3-II.7.6 | index row citing the base home |
| V03-0043 | index-row | 1 | V03 §1 (its hooks row) → §2.6/§4.7 | index row citing the base home |
| V03-0044 | index-row | 1 | V03 §1 (its hooks row) → §2.7/§4.7 | index row citing the base home |
| V03-0045 | index-row | 1 | V03 §1 (its hooks row) → §2.7/II.7.6 | index row citing the base home |
| V03-0046 | index-row | 1 | V03 §1 (its hooks row) → §2.6/§4.7 S11 | index row citing the base home |
| V03-0047 | index-row | 1 | V03 §1 (its hooks row) → §2.6 | index row citing the base home |
| V03-0048 | index-row | 1 | V03 §1 (its hooks row) → §6.3 | index row citing the base home |
| V03-0049 | index-row | 1 | V03 §1 (its row of what it reads from V01) | index row citing each home |
| V03-0050 | index-row | 1 | V03 §1 (its row of what it reads from V02) | index row citing each home |
| V03-0051 | index-row | 1 | V03 §1 (its row of what it reads from V04) | index row citing each home |
| V03-0052 | index-row | 1 | V03 §1 (its row of what it reads from V05/V07/V10/V11) | index row citing each home |
| V03-0053 | home | 1 | V03 §1 |  |
| V03-0054 | index-row | 1 | V03 §1 (its row of what it reads from V02/V04/V11) | index row citing each home |
| V03-0055 | index-row | 1 | V03 §1 (its row of what it reads from V02/V04/V05/V06/V11/base) | index row citing each home |
| V03-0056 | home | 1b | V03 §1b |  |
| V03-0057 | home | 1b | V03 §1b |  |
| V03-0058 | home | 1b | V03 §1b |  |
| V03-0059 | home | 1b | V03 §1b |  |
| V03-0060 | home | 1b | V03 §1b |  |
| V03-0061 | home | 1b | V03 §1b |  |
| V03-0062 | home | 1b | V03 §1b |  |
| V03-0063 | reference | 1b | V03 §1b — a pointer to §4.12 | restatement → reference |
| V03-0064 | home | 1b | V03 §1b |  |
| V03-0065 | home | 1b | V03 §1b |  |
| V03-0066 | home | 1b | V03 §1b |  |
| V03-0067 | home | 1b | V03 §1b |  |
| V03-0068 | home | 1b | V03 §1b |  |
| V03-0069 | home | 1b | V03 §1b |  |
| V03-0070 | home | 1b | V03 §1b |  |
| V03-0071 | home | 1b | V03 §1b |  |
| V03-0072 | reference | 1b | V03 §1b — a pointer to V04 §1b.1 | restatement → reference |
| V03-0073 | home | 1b | V03 §1b |  |
| V03-0074 | home | 1b | V03 §1b |  |
| V03-0075 | reference | 1b | V03 §1b — a pointer to §2.6 | restatement → reference |
| V03-0076 | home | 1b | V03 §1b |  |
| V03-0077 | home | 1b | V03 §1b |  |
| V03-0078 | reference | 1b | V03 §1b — a pointer to §2.6 | restatement → reference |
| V03-0079 | home | 1b | V03 §1b |  |
| V03-0080 | home | 1b | V03 §1b |  |
| V03-0081 | home | 1b | V03 §1b |  |
| V03-0082 | home | 1b | V03 §1b; V03 §3.6 W2 |  |
| V03-0083 | home | 1b | V03 §1b |  |
| V03-0084 | home | 1b | V03 §1b |  |
| V03-0085 | reference | 1b | V03 §1b — a pointer to V04 §3.5.4 (d) (`archVault` chambers) and V04 §3.5.4 (f) (`gradeFaces`); the rule at V03 §3.12 (9) | restatement → reference (DEFER-2: the grade faces are V04's derived reading) |
| V03-0086 | reference | 1b | V03 §1b — a pointer to V02 §1b | restatement → reference |
| V03-0087 | home | 1b | V03 §1b |  |
| V03-0088 | home | 1b | V03 §1b |  |
| V03-0089 | home | 1b | V03 §1b |  |
| V03-0090 | home | 1b | V03 §1b |  |
| V03-0091 | home | 1b | V03 §1b |  |
| V03-0092 | reference | 1b | V03 §1b — a pointer to §2.6 | restatement → reference |
| V03-0093 | reference | 1b | V03 §1b — a pointer to V02 §9 | restatement → reference |
| V03-0094 | home | 1b | V03 §1b |  |
| V03-0095 | home | 1b | V03 §1b |  |
| V03-0096 | home | 1b | V03 §4.1 (the one edit table: tool, events, semantics, §7.4 row, undo) | moved: one home (V03-DUP-6); V03 §1b cites |
| V03-0097 | home | 1b | V03 §1b |  |
| V03-0098 | home | 1b | V03 §1b |  |
| V03-0099 | reference | 1b | V03 §1b — a pointer to §7.7 | restatement → reference |
| V03-0100 | reference | 1b | V03 §1b — a pointer to V11 §3.13.4 | restatement → reference |
| V03-0101 | reference | 1b | V03 §1b *Dossier trace* — pointers to V08 §2.6a (DR9), V11 §3.11, V04 §2.3a; the binding rule at V03 §3.7.4 | restatement → reference |
| V03-0102 | reference | 1b | V03 §1b — a pointer to §2.8 | restatement → reference |
| V03-0103 | home | 2.1 | V03 §2.1 |  |
| V03-0104 | home | 2.1 | V03 §2.1 (declared in §2.6 by item 232); ids V03 §2.2; lifecycle V03 §2.5 | record cited, not restated |
| V03-0105 | home | 2.1 | V03 §2.1 |  |
| V03-0106 | home | 2.1 | V03 §2.1 |  |
| V03-0107 | home | 2.1 | V03 §2.1 |  |
| V03-0108 | home | 2.1 | V03 §2.1 (declared in §2.6); V03 §3.7.2 (4), V03 §3.12 (3) | record cited, not restated |
| V03-0109 | home | 2.1 | V03 §2.1 (declared in §2.6); V03 §1b; V03 §3.2 A2 | record cited, not restated |
| V03-0110 | home | 2.1 | V03 §2.1 |  |
| V03-0111 | home | 2.1 | V03 §2.1 |  |
| V03-0112 | home | 2.1 | §2.6 `Entrance.faces` (item 239); V03 §3.12 (4) | base text by file f |
| V03-0113 | reference | 2.1 | V03 §2.1 — a pointer to §2.6 | restatement → reference |
| V03-0114 | reference | 2.1 | V03 §2.1 — a pointer to §2.6 | restatement → reference |
| V03-0115 | home | 2.1 | V03 §1b *Derived pieces* (the one list; V03 §2.1 cites it) | moved: one home (V03-DUP-1) |
| V03-0116 | home | 2.2 | V03 §2.2 |  |
| V03-0117 | home | 2.2 | V03 §2.2 |  |
| V03-0118 | home | 2.2 | V03 §2.2 |  |
| V03-0119 | home | 2.2 | V03 §2.2 |  |
| V03-0120 | home | 2.3 | V03 §2.3 |  |
| V03-0121 | home | 2.3 | V03 §2.3 |  |
| V03-0122 | home | 2.4 | V03 §2.4 |  |
| V03-0123 | home | 2.4 | V03 §2.4 |  |
| V03-0124 | home | 2.4 | V03 §2.4 |  |
| V03-0125 | home | 2.4 | V03 §2.4 |  |
| V03-0126 | home | 2.4 | V03 §2.4 |  |
| V03-0127 | home | 2.4 | V03 §2.4 |  |
| V03-0128 | home | 2.4 | V03 §2.4 |  |
| V03-0129 | home | 2.4 | V03 §2.4 |  |
| V03-0130 | home | 2.4 | V03 §2.4 |  |
| V03-0131 | home | 2.4 | V03 §2.4 |  |
| V03-0132 | home | 2.4 | V03 §2.4 |  |
| V03-0133 | home | 2.4 | V03 §2.4 |  |
| V03-0134 | home | 2.4 | V03 §2.4 |  |
| V03-0135 | home | 2.4 | V03 §2.4 |  |
| V03-0136 | home | 2.4 | V03 §2.4 |  |
| V03-0137 | home | 2.4 | V03 §2.4 |  |
| V03-0138 | home | 2.4 | V03 §2.4 |  |
| V03-0139 | home | 2.4 | V03 §2.4 |  |
| V03-0140 | home | 2.4 | V03 §2.4 |  |
| V03-0141 | home | 2.4 | V03 §2.4 |  |
| V03-0142 | home | 2.4 | V03 §2.4 |  |
| V03-0143 | home | 2.4 | V03 §2.4 |  |
| V03-0144 | home | 2.4 | V03 §2.4 |  |
| V03-0145 | home | 2.4 | V03 §2.4 |  |
| V03-0146 | reference | 2.4 | V03 §2.4 — a pointer to §4.12 | restatement → reference |
| V03-0147 | home | 2.4 | V03 §2.4 |  |
| V03-0148 | home | 2.4 | V03 §2.4 |  |
| V03-0149 | home | 2.5 | V03 §2.5 |  |
| V03-0150 | home | 2.5 | V03 §2.5 |  |
| V03-0151 | home | 2.5 | V03 §2.5 |  |
| V03-0152 | home | 2.5 | V03 §2.5 |  |
| V03-0153 | home | 2.5 | V03 §2.5 |  |
| V03-0154 | home | 2.5 | V03 §2.5 |  |
| V03-0155 | home | 2.5 | V03 §2.5 |  |
| V03-0156 | home | 2.5 | V03 §2.5 |  |
| V03-0157 | home | 2.5 | V03 §2.5 |  |
| V03-0158 | home | 2.5 | V03 §2.5 |  |
| V03-0159 | reference | 2.5 | V03 §2.5 — a pointer to §2.6 | restatement → reference |
| V03-0160 | home | 2.5 | V03 §2.5 |  |
| V03-0161 | home | 2.5 | V03 §2.5 |  |
| V03-0162 | reference | 3.1 | V03 §3.1 — a pointer to §2.6 | restatement → reference |
| V03-0163 | home | 3.1 | V03 §3.1 |  |
| V03-0164 | home | 3.1 | V03 §3.1 |  |
| V03-0165 | home | 3.2 | V03 §3.2 |  |
| V03-0166 | home | 3.2 | V03 §3.2 |  |
| V03-0167 | home | 3.2 | V03 §3.2 |  |
| V03-0168 | home | 3.2 | V03 §3.2 |  |
| V03-0169 | home | 3.2 | V03 §3.2 A2 |  |
| V03-0170 | home | 3.2 | V03 §3.2 |  |
| V03-0171 | home | 3.2 | V03 §3.2 |  |
| V03-0172 | home | 3.2 | V03 §3.2 |  |
| V03-0173 | home | 3.2 | V03 §3.2 |  |
| V03-0174 | home | 3.2 | V03 §3.2 |  |
| V03-0175 | home | 3.2 | V03 §3.2 |  |
| V03-0176 | home | 3.2 | V03 §3.2 |  |
| V03-0177 | home | 3.2 | V03 §3.2 |  |
| V03-0178 | home | 3.2 | V03 §3.2 |  |
| V03-0179 | home | 3.2 | V03 §3.2 |  |
| V03-0180 | home | 3.2 | V03 §3.2 |  |
| V03-0181 | home | 3.2 | V03 §3.2 |  |
| V03-0182 | home | 3.2 | V03 §3.2 |  |
| V03-0183 | home | 3.2 | V03 §3.2 |  |
| V03-0184 | home | 3.2 | V03 §3.2 |  |
| V03-0185 | home | 3.2 | V03 §3.2 |  |
| V03-0186 | home | 3.3 | V03 §3.3 |  |
| V03-0187 | home | 3.3 | V03 §3.3 |  |
| V03-0188 | home | 3.3 | V03 §3.3 |  |
| V03-0189 | home | 3.3 | V03 §3.3 |  |
| V03-0190 | home | 3.3 | V03 §3.3 |  |
| V03-0191 | home | 3.3 | V03 §3.3 |  |
| V03-0192 | home | 3.3 | V03 §3.3 |  |
| V03-0193 | home | 3.3 | V03 §3.3 |  |
| V03-0194 | home | 3.3 | V03 §3.3 |  |
| V03-0195 | home | 3.3 | V03 §3.3 |  |
| V03-0196 | home | 3.3 | V03 §3.1 step 2 (the rule's one home; S6, A5 (b), V03 §3.4a, V03 §3.7, V03 §3.9 cite it) | moved: one home (V03-DUP-3) |
| V03-0197 | home | 3.3 | V03 §3.3 |  |
| V03-0198 | home | 3.3 | V03 §3.3 |  |
| V03-0199 | home | 3.3 | V03 §3.3 |  |
| V03-0200 | home | 3.3 | V03 §3.3 |  |
| V03-0201 | home | 3.3 | V03 §3.3 |  |
| V03-0202 | home | 3.4 | V03 §3.4 |  |
| V03-0203 | home | 3.4a | V03 §3.4a |  |
| V03-0204 | home | 3.5 | V03 §3.5 |  |
| V03-0205 | home | 3.5 | V03 §3.5 |  |
| V03-0206 | home | 3.5 | V03 §3.5 |  |
| V03-0207 | home | 3.5 | V03 §3.5 |  |
| V03-0208 | home | 3.5 | V03 §3.5 |  |
| V03-0209 | home | 3.5 | V03 §3.5 |  |
| V03-0210 | home | 3.5 | V03 §3.5 |  |
| V03-0211 | home | 3.5 | V03 §3.5 |  |
| V03-0212 | home | 3.6 | V03 §3.6 |  |
| V03-0213 | home | 3.6 | V03 §3.6 |  |
| V03-0214 | home | 3.6 | V03 §3.6 |  |
| V03-0215 | home | 3.6 | V03 §3.6 |  |
| V03-0216 | home | 3.6 | V03 §3.6 |  |
| V03-0217 | home | 3.6 | V03 §3.6 |  |
| V03-0218 | home | 3.6 | V03 §3.6 |  |
| V03-0219 | home | 3.6 | V03 §3.6 |  |
| V03-0220 | home | 3.6 | V03 §3.6 |  |
| V03-0221 | home | 3.6 | V03 §3.6 |  |
| V03-0222 | home | 3.6 | V03 §3.6 |  |
| V03-0223 | reference | 3.6 | V03 §3.6 — a pointer to §2.6 | restatement → reference |
| V03-0224 | home | 3.6 | V03 §3.6 |  |
| V03-0225 | reference | 3.6 | V03 §3.6 — a pointer to V02 §9 | restatement → reference |
| V03-0226 | home | 3.6 | V03 §3.6 |  |
| V03-0227 | home | 3.6 | V03 §3.6 |  |
| V03-0228 | home | 3.7.1 | V03 §3.7.1 |  |
| V03-0229 | home | 3.7.1 | V03 §3.7.1 |  |
| V03-0230 | reference | 3.7.1 | V03 §3.7.1 — a pointer to §2.6 | restatement → reference |
| V03-0231 | home | 3.7.1 | V03 §3.7.1 |  |
| V03-0232 | home | 3.7.1 | V03 §3.7.1 |  |
| V03-0233 | home | 3.7.1 | V03 §3.7.1 |  |
| V03-0234 | home | 3.7.2 | V03 §3.7.2 |  |
| V03-0235 | home | 3.7.2 | V03 §3.7.2 |  |
| V03-0236 | home | 3.7.2 | V03 §3.7.2 |  |
| V03-0237 | home | 3.7.2 | V03 §3.7.2 |  |
| V03-0238 | home | 3.7.2 | V03 §3.7.2 |  |
| V03-0239 | home | 3.7.2 | V03 §3.7.2 |  |
| V03-0240 | home | 3.7.2 | V03 §3.7.2 |  |
| V03-0241 | home | 3.7.2 | V03 §3.7.2 |  |
| V03-0242 | home | 3.7.3 | V03 §3.7.3 |  |
| V03-0243 | reference | 3.7.4 | V03 §3.7.4 — a pointer to §2.6 | restatement → reference |
| V03-0244 | home | 3.7.4 | V03 §3.7.4 |  |
| V03-0245 | home | 3.7.4 | V03 §3.7.4 |  |
| V03-0246 | home | 3.7.4 | V03 §3.7.4 |  |
| V03-0247 | home | 3.7.4 | V03 §3.7.4 |  |
| V03-0248 | home | 3.7.5 | V03 §3.7.5 |  |
| V03-0249 | home | 3.7.6 | V03 §3.7.6 |  |
| V03-0250 | home | 3.7.6 | V03 §3.7.6 |  |
| V03-0251 | home | 3.7.6 | V03 §3.7.6 |  |
| V03-0252 | home | 3.7.7 | V03 §3.7.7 |  |
| V03-0253 | home | 3.8 | V03 §3.8 |  |
| V03-0254 | home | 3.8 | V03 §3.8 |  |
| V03-0255 | home | 3.9 | V03 §3.9 |  |
| V03-0256 | home | 3.9 | V03 §3.9 |  |
| V03-0257 | home | 3.10 | V03 §3.10 |  |
| V03-0258 | home | 3.10 | V03 §3.10 |  |
| V03-0259 | home | 3.11 | V03 §3.11 |  |
| V03-0260 | home | 3.12 | V03 §3.12 |  |
| V03-0261 | home | 3.12 | V03 §3.12 |  |
| V03-0262 | reference | 3.12 | V03 §3.12 — a pointer to V04 §3.5.0a | restatement → reference |
| V03-0263 | home | 4.1 | V03 §4.1 |  |
| V03-0264 | home | 4.2 | V03 §4.2 |  |
| V03-0265 | home | 4.2 | V03 §4.2 |  |
| V03-0266 | home | 4.2 | V03 §4.2 |  |
| V03-0267 | home | 4.2 | V03 §4.2 |  |
| V03-0268 | home | 4.2 | V03 §4.2 |  |
| V03-0269 | home | 4.2 | V03 §4.2 |  |
| V03-0270 | home | 4.2 | V03 §4.2 |  |
| V03-0271 | home | 4.2 | V03 §4.2 |  |
| V03-0272 | home | 4.2 | V03 §4.2 |  |
| V03-0273 | reference | 4.2 | V03 §4.2 — a pointer to V02 §3.17 | restatement → reference |
| V03-0274 | home | 4.2 | V03 §4.2 |  |
| V03-0275 | home | 4.3 | V03 §4.3 |  |
| V03-0276 | home | 4.3 | V03 §4.3 |  |
| V03-0277 | home | 4.3 | V03 §4.3 |  |
| V03-0278 | home | 4.3 | V03 §4.3 |  |
| V03-0279 | home | 4.3 | V03 §4.1's edit table (undo column); V03 §4.3 | moved: one home (V03-DUP-6) |
| V03-0280 | home | 4.4 | V03 §4.4 |  |
| V03-0281 | home | 4.5 | V03 §4.5 |  |
| V03-0282 | home | 4.5 | V03 §4.5 |  |
| V03-0283 | home | 4.5 | V03 §4.5 |  |
| V03-0284 | home | 4.5 | V03 §4.5 |  |
| V03-0285 | home | 4.5 | V03 §4.5 |  |
| V03-0286 | home | 4.6 | V03 §4.6 |  |
| V03-0287 | home | 4.6 | V03 §4.6 |  |
| V03-0288 | reference | 5.1 | V03 §5.1 — a pointer to §8.8 | restatement → reference |
| V03-0289 | home | 5.1 | V03 §5.1 |  |
| V03-0290 | home | 5.1 | V03 §5.1 |  |
| V03-0291 | home | 5.1 | V03 §5.1 |  |
| V03-0292 | home | 5.1 | V03 §5.1 |  |
| V03-0293 | home | 5.2 | V03 §5.2 |  |
| V03-0294 | reference | 5.3 | V03 §5.3 — a pointer to §11.1 | restatement → reference |
| V03-0295 | reference | 5.3 | V03 §5.3 — a pointer to §11.1 | restatement → reference |
| V03-0296 | reference | 5.3 | V03 §5.3 — a pointer to §11.1 | restatement → reference |
| V03-0297 | reference | 5.3 | V03 §5.3 — a pointer to §11.1 | restatement → reference |
| V03-0298 | reference | 5.3 | V03 §5.3 — a pointer to §11.1 | restatement → reference |
| V03-0299 | home | 5.4 | V03 §5.4 |  |
| V03-0300 | home | 6 | V03 §6 |  |
| V03-0301 | home | 6 | V03 §6 |  |
| V03-0302 | home | 7 | V03 §7 |  |
| V03-0303 | home | 7 | V03 §7 |  |
| V03-0304 | home | 7 | V03 §7 |  |
| V03-0305 | home | 7 | V03 §7 |  |
| V03-0306 | home | 7 | V03 §7 |  |
| V03-0307 | home | 7 | V03 §7 |  |
| V03-0308 | home | 7 | V03 §7 |  |
| V03-0309 | home | 7 | V03 §7 |  |
| V03-0310 | home | 7 | V03 §7 |  |
| V03-0311 | home | 7 | V03 §7 |  |
| V03-0312 | home | 7 | V03 §7 |  |
| V03-0313 | home | 7 | V03 §7 |  |
| V03-0314 | home | 8 | V03 §8 |  |
| V03-0315 | home | 8 | V03 §8 |  |
| V03-0316 | home | 8 | V03 §8 |  |
| V03-0317 | home | 8 | V03 §8 |  |
| V03-0318 | home | 8 | V03 §8 |  |
| V03-0319 | home | 8 | V03 §8 |  |
| V03-0320 | reference | 8 | V03 §8 — a pointer to §16 | restatement → reference |
| V03-0321 | home | 9 | V03 §9 J-V3.1 |  |
| V03-0322 | home | 9 | V03 §9 J-V3.2 |  |
| V03-0323 | home | 9 | V03 §9 J-V3.3 |  |
| V03-0324 | home | 9 | V03 §9 J-V3.4 |  |
| V03-0325 | home | 9 | V03 §9 J-V3.5 |  |
| V03-0326 | home | 9 | V03 §9 J-V3.6 |  |
| V03-0327 | home | 9 | V03 §9 J-V3.7 |  |
| V03-0328 | home | 9 | V03 §9 J-V3.8 |  |
| V03-0329 | home | 9 | V03 §9 J-V3.9 |  |
| V03-0330 | home | 9 | V03 §9 J-V3.10 |  |
| V03-0331 | home | 9 | V03 §9 J-V3.11 |  |
| V03-0332 | home | 9 | V03 §9 J-V3.12 |  |
| V03-0333 | home | 9 | V03 §9 J-V3.13 |  |
| V03-0334 | home | 9 | V03 §9 J-V3.14 |  |
| V03-0335 | home | 9 | V03 §9 J-V3.15 |  |
| V03-0336 | home | 9 | V03 §9 J-V3.16 |  |
| V03-0337 | home | 9 | V03 §9 J-V3.17 |  |
| V03-0338 | home | 9 | V03 §9 J-V3.18 |  |
| V03-0339 | home | 9 | V03 §9 J-V3.19 |  |
| V03-0340 | home | 9 | V03 §9 J-V3.20 |  |
| V03-0341 | home | 9 | V03 §9 J-V3.21 |  |
| V03-0342 | home | 9 | V03 §9 J-V3.22 |  |
| V03-0343 | home | 9 | V03 §9 J-V3.23 |  |
| V03-0344 | home | 9 | V03 §9 J-V3.24 |  |
| V03-0345 | home | 9 | V03 §9 J-V3.25 |  |
| V03-0346 | home | 9 | V03 §9 J-V3.26 |  |
| V03-0347 | home | 9 | V03 §9 J-V3.27 |  |
| V03-0348 | home | 9 | V03 §9 J-V3.28 |  |
| V03-0349 | home | 9 | V03 §9 J-V3.29 |  |
| V03-0350 | home | 9 | V03 §9 J-V3.30 |  |
| V03-0351 | home | 9 | V03 §9 J-V3.31 |  |
| V03-0352 | home | 9 | V03 §9 J-V3.32 |  |
| V03-0353 | home | 9 | V03 §9 J-V3.33 |  |
| V03-0354 | home | 9 | V03 §9 J-V3.34 |  |
| V03-0355 | home | 9 | V03 §9 J-V3.35 |  |
| V03-0356 | home | 9 | V03 §9 J-V3.36 |  |
| V03-0357 | home | 9 | V03 §9 J-V3.37 |  |
| V03-0358 | home | 9 | V03 §9 J-V3.38 |  |
| V03-0359 | home | 9 | V03 §9 J-V3.39 |  |
| V03-0360 | home | 9 | V03 §9 J-V3.40 |  |
| V03-0361 | home | 9 | V03 §9 J-V3.41 |  |
| V03-0362 | home | 9 | V03 §9 J-V3.42 | *amended by j-v3.121* (E-24's one mark) |
| V03-0363 | home | 9 | V03 §9 J-V3.43 |  |
| V03-0364 | home | 9 | V03 §9 J-V3.44 |  |
| V03-0365 | home | 9 | V03 §9 J-V3.45 |  |
| V03-0366 | home | 9 | V03 §9 J-V3.46 |  |
| V03-0367 | home | 9 | V03 §9 J-V3.47 | *amended by j-v3.130* (E-24's one mark) |
| V03-0368 | home | 9 | V03 §9 J-V3.48 |  |
| V03-0369 | home | 9 | V03 §9 J-V3.49 |  |
| V03-0370 | home | 9 | V03 §9 J-V3.50 |  |
| V03-0371 | home | 9 | V03 §9 J-V3.51 |  |
| V03-0372 | home | 9 | V03 §9 J-V3.52 |  |
| V03-0373 | home | 9 | V03 §9 J-V3.53 |  |
| V03-0374 | home | 9 | V03 §9 J-V3.54 |  |
| V03-0375 | home | 9 | V03 §9 J-V3.55 |  |
| V03-0376 | home | 9 | V03 §9 J-V3.56 |  |
| V03-0377 | home | 9 | V03 §9 J-V3.57 |  |
| V03-0378 | home | 9 | V03 §9 J-V3.58 |  |
| V03-0379 | home | 9 | V03 §9 J-V3.59 |  |
| V03-0380 | home | 9 | V03 §9 J-V3.60 |  |
| V03-0381 | home | 9 | V03 §9 J-V3.61 |  |
| V03-0382 | home | 9 | V03 §9 J-V3.62 |  |
| V03-0383 | home | 9 | V03 §9 J-V3.63 |  |
| V03-0384 | home | 9 | V03 §9 J-V3.64 |  |
| V03-0385 | home | 9 | V03 §9 J-V3.65 |  |
| V03-0386 | home | 9 | V03 §9 J-V3.66 |  |
| V03-0387 | home | 9 | V03 §9 J-V3.67 |  |
| V03-0388 | home | 9 | V03 §9 J-V3.68 |  |
| V03-0389 | home | 9 | V03 §9 J-V3.69 |  |
| V03-0390 | home | 9 | V03 §9 J-V3.70 |  |
| V03-0391 | home | 9 | V03 §9 J-V3.71 |  |
| V03-0392 | home | 9 | V03 §9 J-V3.72 |  |
| V03-0393 | home | 9 | V03 §9 J-V3.73 |  |
| V03-0394 | home | 9 | V03 §9 J-V3.74 |  |
| V03-0395 | home | 9 | V03 §9 J-V3.75 |  |
| V03-0396 | home | 9 | V03 §9 J-V3.76 |  |
| V03-0397 | home | 9 | V03 §9 J-V3.77 |  |
| V03-0398 | home | 9 | V03 §9 J-V3.78 |  |
| V03-0399 | home | 9 | V03 §9 J-V3.79 |  |
| V03-0400 | home | 9 | V03 §9 J-V3.80 |  |
| V03-0401 | home | 9 | V03 §9 J-V3.81 |  |
| V03-0402 | home | 9 | V03 §9 J-V3.82 |  |
| V03-0403 | home | 9 | V03 §9 J-V3.83 |  |
| V03-0404 | home | 9 | V03 §9 J-V3.84 |  |
| V03-0405 | home | 9 | V03 §9 J-V3.85 |  |
| V03-0406 | home | 9 | V03 §9 J-V3.86 |  |
| V03-0407 | home | 9 | V03 §9 J-V3.87 |  |
| V03-0408 | home | 9 | V03 §9 J-V3.88 |  |
| V03-0409 | home | 9 | V03 §9 J-V3.89 |  |
| V03-0410 | home | 9 | V03 §9 J-V3.90 |  |
| V03-0411 | home | 9 | V03 §9 J-V3.91 | *amended by j-v3.117* (E-24's one mark) |
| V03-0412 | home | 9 | V03 §9 J-V3.92 |  |
| V03-0413 | home | 9 | V03 §9 J-V3.93 |  |
| V03-0414 | home | 9 | V03 §9 J-V3.94 |  |
| V03-0415 | home | 9 | V03 §9 J-V3.95 |  |
| V03-0416 | home | 9 | V03 §9 J-V3.96 |  |
| V03-0417 | home | 9 | V03 §9 J-V3.97 |  |
| V03-0418 | home | 9 | V03 §9 J-V3.98 |  |
| V03-0419 | home | 9 | V03 §9 J-V3.99 |  |
| V03-0420 | home | 9 | V03 §9 J-V3.100 |  |
| V03-0421 | home | 9 | V03 §9 J-V3.101 |  |
| V03-0422 | home | 9 | V03 §9 J-V3.102 |  |
| V03-0423 | home | 9 | V03 §9 J-V3.103 |  |
| V03-0424 | home | 9 | V03 §9 J-V3.104 |  |
| V03-0425 | home | 9 | V03 §9 J-V3.105 |  |
| V03-0426 | home | 9 | V03 §9 J-V3.106 |  |
| V03-0427 | home | 9 | V03 §9 J-V3.107 |  |
| V03-0428 | home | 9 | V03 §9 J-V3.108 |  |
| V03-0429 | home | 9 | V03 §9 J-V3.109 |  |
| V03-0430 | home | 9 | V03 §9 J-V3.110 — withdrawn (a process record); its design content at J-V3.109 and V03 §4.2's deck bend | V03-NARR-8 |
| V03-0431 | home | 9 | V03 §9 J-V3.111 | round labels and layers out (V03-NARR-9) |
| V03-0432 | home | 9 | V03 §9 J-V3.112 | round labels and layers out (V03-NARR-9) |
| V03-0433 | home | 9 | V03 §9 J-V3.113 | round labels and layers out (V03-NARR-9) |
| V03-0434 | home | 9 | V03 §9 J-V3.114 | round labels and layers out (V03-NARR-9) |
| V03-0435 | home | 9 | V03 §9 J-V3.115 | round labels and layers out (V03-NARR-9) |
| V03-0436 | home | 9 | V03 §9 J-V3.116 | round labels and layers out (V03-NARR-9) |
| V03-0437 | home | 9 | V03 §9 J-V3.117 | round labels and layers out (V03-NARR-9) |
| V03-0438 | home | 9 | V03 §9 J-V3.118 | *amended by j-v3.123* (E-24's one mark) |
| V03-0439 | home | 9 | V03 §9 J-V3.119 | round labels and layers out (V03-NARR-9) |
| V03-0440 | home | 9 | V03 §9 J-V3.120 | round labels and layers out (V03-NARR-9) |
| V03-0441 | home | 9 | V03 §9 J-V3.121 | round labels and layers out (V03-NARR-9) |
| V03-0442 | home | 9 | V03 §9 J-V3.122 | round labels and layers out (V03-NARR-9) |
| V03-0443 | home | 9 | V03 §9 J-V3.123 | round labels and layers out (V03-NARR-9) |
| V03-0444 | home | 9 | V03 §9 J-V3.124 | round labels and layers out (V03-NARR-9) |
| V03-0445 | home | 9 | V03 §9 J-V3.125 | round labels and layers out (V03-NARR-9) |
| V03-0446 | home | 9 | V03 §9 J-V3.126 | *amended by j-v3.127* (E-24's one mark) |
| V03-0447 | home | 9 | V03 §9 J-V3.127 | round labels and layers out (V03-NARR-9) |
| V03-0448 | home | 9 | V03 §9 J-V3.128 | round labels and layers out (V03-NARR-9) |
| V03-0449 | home | 9 | V03 §9 J-V3.129 | round labels and layers out (V03-NARR-9) |
| V03-0450 | home | 10 | V03 §10 |  |
| V03-0451 | bcr-pointer | 10 | V03 §10's row BCR-V3-1 → item 428 at §10.2, §14 | request applied by file f; its text is base text |
| V03-0452 | bcr-pointer | 10 | V03 §10's row BCR-V3-2 → item 232 at §2.6, §12.8 | request applied by file f; its text is base text |
| V03-0453 | bcr-pointer | 10 | V03 §10's row BCR-V3-3 → item 352 at §7.1 (§0.2, §13.2, §14) | request applied by file f; its text is base text |
| V03-0454 | bcr-pointer | 10 | V03 §10's row BCR-V3-4 → item 374 at §7.1 | request applied by file f; its text is base text |
| V03-0455 | bcr-pointer | 10 | V03 §10's row BCR-V3-5 → item 457 at §11.2 | request applied by file f; its text is base text |
| V03-0456 | bcr-pointer | 10 | V03 §10's row BCR-V3-6 → item 420 at §8.8 (§8.5, §8.2, §2.9) | request applied by file f; its text is base text |
| V03-0457 | bcr-pointer | 10 | V03 §10's row BCR-V3-7 → item 450 at §11.1 | request applied by file f; its text is base text |
| V03-0458 | bcr-pointer | 10 | V03 §10's row BCR-V3-8 → item 273 at §2.9 | request applied by file f; its text is base text |
| V03-0459 | bcr-pointer | 10 | V03 §10's row BCR-V3-9 → item 482 at §13.2 (§8.3) | request applied by file f; its text is base text |
| V03-0460 | bcr-pointer | 10 | V03 §10's row BCR-V3-10 → item 329 at §5.2 | request applied by file f; its text is base text |
| V03-0461 | bcr-pointer | 10 | V03 §10's row BCR-V3-11 → item 334 at §5.3 | request applied by file f; its text is base text |
| V03-0462 | bcr-pointer | 10 | V03 §10's row BCR-V3-12 → item 233 at §2.6 | request applied by file f; its text is base text |
| V03-0463 | bcr-pointer | 10 | V03 §10's row BCR-V3-13 → item 234 at §2.6 | request applied by file f; its text is base text |
| V03-0464 | bcr-pointer | 10 | V03 §10's row BCR-V3-14 → item 483 at §13.2 | request applied by file f; its text is base text |
| V03-0465 | bcr-pointer | 10 | V03 §10's row BCR-V3-15 → item 235 at §2.6 (§2.8) | request applied by file f; its text is base text |
| V03-0466 | bcr-pointer | 10 | V03 §10's row BCR-V3-16 → item 353 at §7.1 (§7.4) | request applied by file f; its text is base text |
| V03-0467 | bcr-pointer | 10 | V03 §10's row BCR-V3-17 → item 236 at §2.6 | request applied by file f; its text is base text |
| V03-0468 | bcr-pointer | 10 | V03 §10's row BCR-V3-18 → item 451 at §11.1 | request applied by file f; its text is base text |
| V03-0469 | bcr-pointer | 10 | V03 §10's row BCR-V3-19 → item 237 at §2.6 (§2.8) | request applied by file f; its text is base text |
| V03-0470 | bcr-pointer | 10 | V03 §10's row BCR-V3-20 → item 238 at §2.6 | request applied by file f; its text is base text |
| V03-0471 | bcr-pointer | 10 | V03 §10's row BCR-V3-21 → item 239 at §2.6 | request applied by file f; its text is base text |
| V03-0472 | bcr-pointer | 10 | V03 §10's row BCR-V3-22 → item 262 at §2.8 | request applied by file f; its text is base text |
| V03-0473 | bcr-pointer | 10 | V03 §10's row BCR-V3-23 → item 324 at §4.12 | request applied by file f; its text is base text |
| V03-0474 | bcr-pointer | 10 | V03 §10's row BCR-V3-24 → item 354 at §7.1 | request applied by file f; its text is base text |
| V03-0475 | bcr-pointer | 10 | V03 §10's row BCR-V3-25 → item 240 at §2.6 | request applied by file f; its text is base text |
| V03-0476 | bcr-pointer | 10 | V03 §10's row BCR-V3-26 → item 241 at §2.6 | request applied by file f; its text is base text |
| V03-0477 | bcr-pointer | 10 | V03 §10's row BCR-V3-27 → item 242 at §2.6 | request applied by file f; its text is base text |
| V03-0478 | bcr-pointer | 10 | V03 §10's row BCR-V3-28 → item 263 at §2.8 | request applied by file f; its text is base text |
| V03-0479 | bcr-pointer | 10 | V03 §10's row BCR-V3-29 → items 346, 347 at §6.3 | request applied by file f; its text is base text |
| V03-0480 | bcr-pointer | 10 | V03 §10's row BCR-V3-30 → item 567 at §16 | request applied by file f; its text is base text |
| V03-0481 | bcr-pointer | 10 | V03 §10's row BCR-V3-31 → item 505 at §14 | request applied by file f; its text is base text |
| V03-0482 | bcr-pointer | 10 | V03 §10's row BCR-V3-32 → item 578 at §2.6, §13.2 | request applied by file f; its text is base text |
| V03-0483 | bcr-pointer | 10 | V03 §10's row BCR-V3-33 → item 585 at §13.7 | request applied by file f; its text is base text |
| V03-0484 | answer-J121-J122 | 11 | V03 §11 — answered: yes (J122); order in V03 §8 | CANON-C03, V03-MISSING-1 |
| V03-0485 | home | 12 | V03 §12 |  |
| V03-0486 | handoff | 13 | V03 §13's live hand-off table, row V04 | closed at the destination |
| V03-0487 | handoff | 13 | V03 §13's live hand-off table, row V11 | closed at the destination |
| V03-0488 | handoff | 13 | V03 §13's live hand-off table, row V06 | closed at the destination |
| V03-0489 | handoff | 13 | V03 §13's live hand-off table, row V01 | closed at the destination |
| V03-0490 | handoff | 13 | V03 §13's live hand-off table, row V02 | closed at the destination |
| V03-0491 | handoff | 13 | V03 §13's live hand-off table, row V09, V10 | closed at the destination |
| V03-0492 | home | IN | V03 §4.6 and V03 §1b (the `crypt` and `plan` section providers with their keys); pointer line IN-V03-1 under *Integration notes* | folded at its home (V03-WGAP-1, CVR-V10-2, CVR-V10-9) |
| V03-0493 | home | IN | V03 §4.2 (every plan edit bent by its dry run; `bend.deck.basement`); pointer line IN-V03-2 under *Integration notes* | folded at its home |
| V03-0494 | glossary | 3.3 | V03 §3.3 | glossary term, defined here |
| V03-0495 | glossary | 3.3 | V03 §3.3 | glossary term, defined here |
| V03-0496 | glossary | 3.7.4 | V03 §3.7.4 | glossary term, defined here |
| V03-0497 | glossary | 3.7.1 | V03 §3.7.1 | glossary term, defined here |
| V03-0498 | glossary | 3.7.4 | V03 §3.7.4 | glossary term, defined here |
| V03-0499 | glossary | 3.7.4 | V03 §3.7.4 | glossary term, defined here |
| V03-0500 | glossary | 3.7.4 | V03 §3.7.4 | glossary term, defined here |
| V03-0501 | glossary | 3.7.1 | V03 §3.7.1 | glossary term, defined here |
| V03-0502 | glossary | 3.7.2 | V03 §3.7.2 | glossary term, defined here |
| V03-0503 | glossary | 3.3 | V03 §3.1 step 2; `PlanReport.notes` (V03 §2.3) | E-28: a note, not a warning code |
| V03-0504 | glossary | 3.4a | V03 §3.4a | glossary term, defined here |
| V03-0505 | glossary | 3.3 | V03 §3.3 | glossary term, defined here |
| V03-0506 | glossary | 3.6 | V03 §3.6 | glossary term, defined here |
| V03-0507 | glossary | 3.6 | V03 §3.6 | glossary term, defined here |
| V03-0508 | glossary | 3.7.1 | V03 §3.7.1 | glossary term, defined here |
| V03-0509 | glossary | 3.7.2 | V03 §3.7.2 | glossary term, defined here |
| V03-0510 | glossary | 2.4 | V03 §2.4 | glossary term, defined here |
| V03-0511 | glossary | 3.2 | V03 §3.2 | glossary term, defined here |
| V03-0512 | glossary | 3.5 | V03 §3.5 | glossary term, defined here |
| V03-0513 | glossary | 3.12 | V03 §3.12 | glossary term, defined here |

## 3 Elegance rulings applied (routed: E-24, E-28, E-29)

**E-24 — one mark on an amended or superseded decision row** (home: each volume's §9). V03 §9's opening line states the
rule ("an amended row carries one mark naming the row that amends it, which keeps the reason"); the rows carry: J-V3.42
*Amended by J-V3.121*; J-V3.47 *Amended by J-V3.130*; J-V3.91 *Amended by J-V3.117*; J-V3.118 *Amended by J-V3.123*;
J-V3.126 *Amended by J-V3.127*. The former in-row layers ("*Amended (round 5; SCC-91)*", "*Noted (round 6)*", "Refinements
of the seam's text, recorded", "No shipped output moves") are gone (V03-NARR-9). Equivalence list:
☑ no row dropped — 132 rows, J-V3.1 – J-V3.132, in id order; J-V3.110 stays as a one-line *Withdrawn* row (its process
content out, V03-NARR-8; its id stays defined because file f and `docs/ARCHITECTURE-FULL.md` cite it);
☑ the governing row keeps the reason — J-V3.117, J-V3.121, J-V3.123 and J-V3.130 each state "chose … over … because …";
J-V3.127 keeps its three rejected alternatives with their reasons and the realism tiebreaker, and its seven former
refinements are design text at their homes (the vault's "shares area — never an edge alone" and the step-2 ring of the
region a crypt-only basement would take, V03 §3.7.4; the author's ring on a building without a basement, V03 §3.7.4;
the join "from the basement's tree (O2 (i), (ii))" and the flight's bay under the largest level-0 room, V03 §3.7.6 and
V03 §3.9's table; the door point off the vault, V03 §3.7.1; the whole basement's access by the programme row, V03 §3.7.4).

**E-28 — notes split from warnings** (home V03 §2.3). `PlanReport.warnings.code` holds W_ codes only —
`W_TIER_UNREACHED`, `W_STACK_ACCESS`, `W_DECK_ACCESS`, `W_ENTRANCE_NO_STOREY`, `W_CHURCH_CATACOMB_HEAD`,
`W_GRADE_FACE_TUNNEL` and the new `W_STOREY_RUN` (EI-V03-EDGE-1); `PlanReport.notes` carries `shrineOneRoom`,
`solidMonument` and `stackCarried` (information, no failure). Equivalence list:
☑ same producer and readers — produced by V03 §3.1 step 2, V03 §3.2 A5 (b), V03 §3.3 S6 and H4 and V03 §3.9's rows; read
by the panel's plain words (V03 §4.5), volume 10's why causes and the `plan` section (V03 §4.6, by the same ids; CVR-V10-9)
and T28-1's no-tier listing (§13.2);
☑ the three conditions reported as notes, not lost — V03 §3.1 step 2 (`solidMonument`), V03 §3.3 H4 (`stackCarried`),
V03 §3.9's table (`shrineOneRoom`, `solidMonument`), V03 §2.3's comment (a room `shrineOneRoom` drops keeps its tier in
`owed`).

**E-29 — one door run** (home V03 §3.7.1). `doorRunPoint(run, target, admit)` is stated once: a door run is a straight
stretch of a ring side at least two `moduleCm` long; the point nearest `target`, ties toward the run's first vertex, whose
two-module span lies within the run and passes `admit`, else `null`; pure, draw-free, in `@plat/plots`.
`basementDoor(b)` and `stackAccessDoor(b, a)` call it and keep their own rules. Equivalence list:
☑ `basementDoor`'s three ordered rules (the wall walk-out, the tomb door, the fall walk-out), its crypt-vault clause from
M6-U (on a church, `admit` refuses a span over the crypt's vault), `null` unless `Basement.access` is `external`
(V03 §3.7.1), with J-V3.131's drop no step reaches added as an edge;
☑ `stackAccessDoor`'s approach-strip clearance (`admit` = the span at least one `moduleCm` from stair 0's approach
strip), its preference for a non-stair ground-standing wing and its reported fallback (`fallback: true`) (V03 §3.7.2 (1));
☑ both pure, draw-free, of eager records, in `@plat/plots` (re-exported by `@plat/buildings`), built at M3a (V03 §8's
PE), read by volume 1's entrance reserve (V01 §3.8.2 step 5), T28-3 and the exports (V03 §3.7.1, V03 §3.7.2 (1)).

No other unification was made.

## 4 Conflicts resolved (6)

| conflict | ruling applied at |
|---|---|
| MC-01 (`lot` retired; `BuildingInput.plot`) | V03 has no `lot` outside a quotation; it reads `BuildingInput.accesses`, `BaseWing` and the wings by their base names (§2.6) and never names `BuildingInput.lot`; the agreement matrix's `BaseWing` and `BuildingInput` rows with V02 and model agree |
| V04-XCONF-2 (PageUp / PageDown) | V03 §4.5: the keymap rows `plan.storeyUp` and `plan.storeyDown`, their precedence over the underground layer's band keys stated in §14's keymap (which states it: a building's plan open → the storey; else the depth band) |
| V04-XCONF-3 (T-V3-23 (g)'s model-level twin) | T-V3-23 (g) cites T-V4-50, which holds the elaboration-independence clause from the join's side (checked in `new/volumes/V04-underground.md`); V03 §13's V04 row closed there |
| V09-XAGREE-2 (the crypt bends) | V03 §3.7.4's crypt-edit dry runs: the cathedral's crypt kept at its smallest lawful size (`bend.crypt.cathedral`, its `{m2}`); another crypt's enlargement bent to `crypt.rankShare` × the principal's area (`bend.crypt.largest`, "stops at {share} of the cathedral's"); the crypt join's closing listed among the fates; a dossier-bound crypt's removal refused as a dossier fact; J-V3.130 (J-V3.47 *Amended by J-V3.130*); T-V3-11 (v); XV-V9-5 closed |
| V10-XAGREE-4 (a church on wet ground) | V03 §3.7.4's wet-ground rule: an `always` class takes the raised-choir crypt; any other church no crypt, with ledger slabs in the chancel floor (J-V3.44); `info.crypt.none.wet` (V03 §4.6); G-floorvault: no "floor vault" left in V03 |
| CANON-C03 (open owner questions) | V03 §11 is the table of decisions: Q1 answered yes (J122), with the order V03 §8 carries; the rest follows SettlementForge where it applies (J121) — this volume decides nothing that does |

## 5 Renumberings and id rulings

**ID-BCR:** V04's bare `BCR-29` and `BCR-30` are cited as BCR-V4-29 and BCR-V4-30 (V03 §1's volume 4 reads, V03 §2.4's
`AccessHostRow` comment); V01's "its BCR-43" as BCR-V1-43 (V03 §1's volume 1 reads, beside `stepProfile(wall)`); no bare
`BCR-n` remains (V03 cites none of V04's BCR-45 or BCR-46).
**ID-DUPDEF:** one definition per id — T-V3-1 – T-V3-36 each defined once in V03 §7; J-V3.1 – J-V3.132 each once in V03
§9, in id order; BCR-V3-1 – BCR-V3-33 each once in V03 §10's table, the former second-round amendment notes folded into
the request's one row (now base text by file f); every cited `T-V3`, `J-V3` and `BCR-V3` id is defined; the 266 foreign
ids cited (other volumes' `T-`, `J-`, `BCR-` and `X` ids, the base's `T28-`, `J-A`, `D-` ids, `J-VI.` rows) are each an
id of its unit. **New ids:** T-V3-36 (the edge bar); J-V3.130 (the crypt-edit dry runs, V09-XAGREE-2), J-V3.131 (a door
side over a drop no step reaches, an edge of `basementDoor(b)`), J-V3.132 (J122's order: P3's parts that read P2's heads
and crypt land with P2, P1's composition clauses with M6). **Withdrawn:** J-V3.110 (V03-NARR-8). No renumbering.

## 6 File f and file g

**File f items cited as base text.** V03 §10 is the pointer table from each of its 33 requests to its item and base
section (34 pointers; BCR-V3-29 → items 346 and 347): items 232–242, 262, 263, 273, 324, 329, 334, 346, 347, 352–354, 374,
420, 428, 450, 451, 457, 482, 483, 505, 567, 578 and 585. The other volumes' requests that concern V03 (the canon's list)
are read as base text at their sections: items 218, 219, 225, 226, 228, 230 and 231 (BCR-V2-03, -04, -27, -28, -38, -41,
-42 at §2.6), 370 (BCR-V2-32), 309 (BCR-V5-30), 432 and 436 (BCR-V11-1, -13), 270 (BCR-V10-3), each cited by its request
id at its base section; item 229 (the base outline builder, §2.6), item 351 (the two event kinds and key paths, §7.1,
§7.4), items 524 and 568 (the M6 row and the staged lines, §16) through their sections; item 305 among §13's notes. None
is restated.

**File g.** Items 102–110 stand at their homes as the volumes pass integrated them: item 109's crypt and catacomb rule
(as revised ~20:05, J111) at V03 §3.7 and §2.6's *Basements*; item 110 (a)–(f) (as revised ~23:40) at V03 §3.3,
V03 §3.4a, V03 §3.6, V03 §3.7.2 and V03 §3.12. Items 111–113 route no part to V03 (canon `units.V03.g_parts` is empty);
J122's item 112 is applied through V03 §11 and V03 §8.

## 7 Wiring gaps closed (2)

| gap | closed at |
|---|---|
| W-HOOK-02 (`BuildingGenerator.plan` and the plan records name their builder) | V03 §1's scope line ("`BuildingGenerator.plan` (§2.6, which names this volume its builder)") and V03 §1b's interfaces row (`BuildingGenerator.plan` → this volume's rung in `@plat/buildings` (§14) → the elaboration cache on a click, the exports, the clerk); the base end is §2.6 (the model rewrite) |
| V03-WGAP-1 (the crypt section provider lived only in IN-V03-1) | V03 §1b's interfaces row (`WhySectionProvider` `plan` and `crypt`, V03 §4.6; V10 §3.9a) and V03 §4.6 with the keys `info.crypt.presence.*`, `.form.*`, `.rank.*`, `.join`, `.none.<row|wet>` and `info.plan.cause.*`; T-V3-12 extended (both providers answer on every church-class fixture, one key per value, none for a withheld building); IN-V03-1 folded |

V03 §1b's tables name each piece's producer and consumers (principle (7)): records, derived pieces (the one list),
interfaces, stage outputs, edits (by the one edit table of V03 §4.1), exports and tests; no orphan, dangling input or
one-ended hook is left.

## 8 Hand-offs

**Made here (V03-0486 – V03-0491 and the base).** V03 §13's one live table keeps one row per destination, with the rule
stated at the V03 section cited and the destination that carries it: V04 (the crypt join reads `Basement.crypt`; the
chapel's catacomb head; `tunnel` frontages, `ruinColumns`, `gradeFaces`; the join set independent of elaboration; the
crypt derivation in U4) — closed at V04 §3.5.7 (c), V04 §2.3a, V04 §3.5.1 (9), V04 §3.5.0a, V04 §3.5.4 (f), T-V4-50,
V04 §8; V11 — closed at V11 §2.3, V11 §2.8, V11 §3.5, V11 §3.6.2; V06 — closed at V06 §3.18.3 (2)–(3); V01 — closed at
V01 §3.7.1, V01 §3.8.1, V01 §3.8.2 step 5, V01 §3.8.3; V02 — closed at V02 §3.13, V02 §5.2, V02 §4.6, V02 §1b, V02 §8;
V09 and V10 — closed at V09 §4.17.5, V10 §3.9, V10 §3.9a; V05, V07, V12 — standing rules, nothing owed; the base — every
request of V03 §10 at its section. The superseded per-round copies of these rows are gone (V03-DUP-7).

**Made of this volume (13), each closed in V03:**

| from | closed at |
|---|---|
| V02 X11 (wings by key; dormer rows; choir stairs over the raised crypt; the `gatehall` role) | V03 §3.1, V03 §3.6 W4, V03 §3.7.6 (c), V03 §2.4 |
| V06 X3 (the rank inside each epoch op; a trim shortens `Basement.crypt.ring` only) | V03 §3.7.4 (3), V03 §2.5's `Basement.crypt` row |
| V06 X18 (the outside digest inside an epoch) | V03 §2.5's outside-ground row; T-V3-30 |
| V09 XV-V9-5 (the crypt bends of V09 §4.17.5 (e)) | V03 §3.7.4's crypt-edit dry runs (J-V3.130); T-V3-11 (v) |
| V09 XV-V9-15 (the crypt ladder for `setAttr(basement/crypt/ring)` without a basement) | V03 §4.2 |
| V10 CVR-V10-2 (the `crypt` section provider and its keys) | V03 §4.6, V03 §1b; T-V3-12 |
| V10 CVR-V10-9 (a key per item-110 room cause) | V03 §4.6 (`info.plan.cause.*`; the deck cause `deckNoCellar`) |
| V11 X-V11-16 (registry row 38's readers; T-V3-35's `stages`) | V03 §2.4's register lines |
| V12 X-V12-4 (V3-P6's `PanelSpec`) | V03 §8's P6, as V12 §3.9.1 states it |
| V12 X-V12-15 (T-V3-35 as a `BenchBarDef`) | V03 §2.4 (the P1 seat) |
| V12 X-V12-16 (`plat calibrate register --check` at every exit landing a calibratable cell) | V03 §8's PE, P1, P2 and P6 exits |
| V12 X-V12-17 (the `--milestone` ids; `M-CAL/M6-P`) | V03 §2.4's register lines; V03 §8 |
| V12 X-V12-18 (hand tuning at V3-P6 by `--defaults --milestone V3-P6`; rows-added cells rows) | V03 §2.4's register lines |

## 9 Open findings routed to V03 (36) — each fixed in the text

| finding | fixed at |
|---|---|
| VOL-V03-V04-RESTATEMENTS-001 (the room-label range) | V03 §1's hooks row and V03 §5.1 cite §9.4's range without values |
| VOL-V03-V04-RESTATEMENTS-002 (the plan row and the cache line) | V03 §1 and V03 §6 cite §12.7 and §12.8 |
| VOL-V03-V04-RESTATEMENTS-003; V03-RESTATE-1 (the wing-local module) | V03 §2.4's `moduleCm` cell is the value's one home (50 cm); V03 cites §2.6 step 4 for its use; the base's own restatements go to the model and rendering editors (§12 below) |
| VOL-V03-V04-RESTATEMENTS-004 (the trapdoor fallback) | stated once at §2.6 step 3: V03 §3.7.1 and V03 §3.9's row cite it; V03 §3.7.7 reads `basementDoor(b)` and its `null` without restating it |
| V03-DUP-1 (the derived list twice) | V03 §1b's *Derived pieces*, "the one list of them" (the §2.1-only members added); V03 §2.1 cites it |
| V03-DUP-2 (the reader lists twice) | V03 §1b is the one home of each piece's readers; V03 §2.5's lifecycle rows cite it |
| V03-DUP-3 (the storey-less rule four times) | V03 §3.1 step 2, "this is the rule's one home"; S6, A5 (b), V03 §3.4a, V03 §3.7 and V03 §3.9 cite it |
| V03-DUP-4 (the `Entrance.storey` derivation twice) | the rule at V03 §3.6; V03 §2.1's comment reads "`Entrance.storey`'s rule is V03 §3.6's" |
| V03-DUP-5 (vault, capped bays, stair-entered) | defined once at V03 §3.7.4; V03 §3.7.1, V03 §2.1 and V03 §1b cite |
| V03-DUP-6 (the edit table three times) | V03 §4.1's one table (tool, semantics, §7.4 row, undo); V03 §1b, V03 §2.5 and V03 §4.3 cite it |
| V03-DUP-7 (hand-offs per round) | V03 §13's one live table (§8 above) |
| V03-ELEG-1 | E-28 (§3 above) |
| V03-ELEG-2 | E-29 (§3 above) |
| V03-EDGE-1 (the storey-height rule's degenerate inputs) | V03 §3.3: a run below one riser per storey, `E ≤ 0` included, is planned as a solid wing, its rooms to the other wings, `W_STOREY_RUN` (F-PLAN tier 4, simpler shape); `G + (n − 1) × U` = 0 and a basement under ground wings of different `baseCm` stated there; T-V3-36 (a) |
| V03-WGAP-1 | §7 above |
| V03-MISSING-1 | V03 §11: Q1 answered yes (J122); V03 §8's branches replaced by the decided order |
| V03-DEFER-1, V03-DEFER-4 (`'*'` rows until V11 names class ids) | ruled final: volume 11 carries the stepped forms as specialisation values (V11 §3.6.2), so V03 §2.4's `'*'` rows are keyed by specialisation for good (J-V3.93) |
| V03-DEFER-2 (grade faces "until volume 4 records its marks") | V03 §3.12 (9): the grade faces are volume 4's derived reading `gradeFaces(chamberId)` (V04 §3.5.4 (f)) — a definition, no conditional |
| V03-DEFER-3 (§8 branching on Q1) | V03 §8's order (J122; J-V3.132), agreeing with §16's M6-P row and INDEX §3–§4 |
| V03-NARR-1, -2 | one marker line; the ledgers out |
| V03-NARR-3, -4, -6 | 0 provenance tags left (the sweep of §11 below); T-V3-34's "unbuilt" remark out |
| V03-NARR-5 | the "moves no golden" sentence out; J-V3.90 keeps the reasoning |
| V03-NARR-7 | the critique's recomputation out of V03 §8 |
| V03-NARR-8 | J-V3.110's process content out; the row kept as one *Withdrawn* line (E-24: no row dropped; the id is cited by file f) |
| V03-NARR-9 | J-V3.111 – J-V3.129 each its final decision (chose X over Y because Z), round labels and layers out; the nuance audit restored every reason and rejected alternative |
| V03-NARR-10 | V03 §10: one line per request (subject, item, base section) |
| V03-NARR-11 | the round and finalization records out; §12 one current list; §13 one live table; IN notes folded |
| V03-BREF-1 (receipts in a session scratchpad) | no receipt reference remains; §12's CONFIRMED list states what was checked against which text |
| IN-V03-1 | V03 §4.6 and V03 §1b (the `crypt` and `plan` section providers, `deckNoCellar` a fact of the deck) |
| IN-V03-2 | V03 §4.2 (every plan edit bent by its dry run; `bend.deck.basement`) |
| IN-V03-3 | V03 §1 and V03 §3.3 S6 (e) (the tier facts as volume 2 landed them; `W_TIER_UNREACHED`) |

The volume's own Fix list (V03 §13) keeps no open item: "Open items: none."

## 10 Edges (principle (11)) — 29 UNDEFINED, 26 UNTESTED, 6 combinations

Every edge is defined at its section, with its failure rung on F-PLAN's ladder (never a whole-map retry), and tested;
V03 §3.13 is the table and T-V3-36 (a)–(s) its bar. No edge's outcome is a crash, a hang, lost data, a silent wrong result
or a whole-map retry.

| catalogue edges (U = UNDEFINED, T = UNTESTED) | V03 §3.13 row | rung | test |
|---|---|---|---|
| M-V03-445-E5 (U) — record fields | record fields (V03 §2.1): V03 §2.5's migrate cell; a dangling part re-derived or orphaned and reported; a cell outside its type refused at load (§7.6) | repair locally; leave out and report | T-V3-36 (d) |
| M-V03-535-E5 (T) — part identity | part identity (V03 §2.2): the re-match column | leave out and report | T-V3-36 (i) |
| M-V03-1032-E1, -E2, -E5 (T) — the derivation | the derivation (V03 §3.1): step 2; one room; A1's fallback | substitute | T-V3-29, T-V3-36 (q), T-V3-1 |
| EI-V03-EDGE-1 (U) — storey heights | storey heights (V03 §3.3): `W_STOREY_RUN` | simpler shape | T-V3-36 (a) |
| M-V03-1372-E1 (T), -E2 (U), -E4 (U) — seed pieces | seed pieces (V03 §3.4) | leave out and report | T-V3-36 (b) |
| M-V03-1384-E1 (T), -E4 (U), -E8 (U) — roof terraces | roof terraces (V03 §3.4a; V03 §2.5's terrace row: derived, re-derived at read, nothing to migrate) | none (no failure) | T-V3-36 (c), T-V3-29 |
| M-V03-1497-E4 (U) — openings | openings (V03 §3.6): O1 (a); W2; O5, else tier 1 | retry that piece; leave out and report | T-V3-36 (e) |
| M-V03-1497-E6, M-V03-1636-E6, M-V03-1921-E6, M-V03-2223-E6, M-V03-2295-E6, M-V03-2369-E6 (U) — every rung | every mechanism of V03 §3.2–§5.4 at every rung: rung-independent per building; no `always` building → no principal crypt and no trim; `view.planCap`; V03 §6's crypt row | none (no failure) | T-V3-36 (f) |
| M-V03-1921-E1 (T), -E2 (U), -E4 (U), -E5 (T) — furnishing | furnishing (V03 §3.8): `n` = 0, 1; no free floor; no `FurnitureRow` | leave out and report | T-V3-36 (g), T-V3-8 |
| M-V03-1945-E4 (U) — failure handling | failure handling (V03 §3.9): the step's row | per the row | T-V3-17, T-V3-36 (b) |
| M-V03-1988-E1, -E2 (U) — determinism | determinism (V03 §3.10): no draw; one draw | none (no failure) | T-V3-20, T-V3-36 (h) |
| M-V03-2008-E4 (U) — re-cuts | re-cuts (V03 §3.11) | leave out and report | T-V3-9, T-V3-36 (i) |
| M-V03-2030-E1, -E2, -E5, -E8 (T), -E4 (U) — below ground | below ground (V03 §3.12): no basement; one grade face; none; a face shorter than a bay or a door run; the raised way removed | leave out and report | T-V3-24, T-V3-32, T-V3-36 (j) |
| M-V03-2075-E8 (T), M-V03-2091-E4 (U) — the edits | the edits (V03 §4.1, V03 §4.2): V03 §2.5's rows; the degenerate bend, never refused, never partly committed | repair locally | T-V3-11, T-V3-36 (k) |
| M-V03-2183-E4 (U) — carries | carries (V03 §4.3) | leave out and report | T-V3-36 (l) |
| M-V03-2223-E1, -E2, -E5, -E8 (T), -E4 (U) — the click and the panel | the click and the panel (V03 §4.5); the frame clamped to `view.frameStops` | none (no failure) | T-V3-36 (m) |
| M-V03-2268-E1, -E5 (T), -E2, -E8 (U) — the clerk's queries | the clerk's queries (V03 §4.6) | none (no failure) | T-V3-12, T-V3-36 (n) |
| M-V03-2295-E1, -E2, -E5 (T), -E4 (U); M-V03-2360-E1 (U); M-V03-2369-E1, -E2, -E5, -E7 (T), -E4 (U) — the draw and the exports | the draw, the picture and scene exports (V03 §5.1–§5.3); `interiors` off and on | leave out | T-V3-13, T-V3-14, T-V3-36 (o) |
| M-V03-2417-E2 (U) — concealment | concealment (V03 §5.4): one concealed room; a storey all concealed | none (no failure) | T-V3-12, T-V3-14, T-V3-36 (p) |
| C-cliff-plan | the plan × a cliff: V03 §3.6's exposure gates; V03 §3.7.1's drop no step reaches (J-V3.131) | leave out and report | T-V3-36 (r) |
| C-steep-plan | the plan × steep ground: V03 §3.7.1 rule 3; entrance storeys, the stoop, `W_ENTRANCE_NO_STOREY` | repair locally | T-V3-30 |
| C-coast-plan, C-moat-plan, C-oasis-plan | the plan × the coast, a moat or an oasis: no door onto water; the wet-ground rule; the deck rules (V03 §3.7.2 (0)) | none (no failure) | T-V3-31, T-V3-36 (r) |
| C-frame-plan | the plan × the frame: every sample within the frame's context margin (§3.2 (9)); frame growth moves no sample; the re-grid fallback stales or re-cuts inside the epoch event | none (no failure) | T-V3-36 (s) |

Counts: 29 UNDEFINED (M-V03-445-E5; 1372-E2, -E4; 1384-E4, -E8; 1497-E4, -E6; 1636-E6; 1921-E2, -E4, -E6; 1945-E4;
1988-E1, -E2; 2008-E4; 2030-E4; 2091-E4; 2183-E4; 2223-E4, -E6; 2268-E2, -E8; 2295-E4, -E6; 2360-E1; 2369-E4, -E6;
2417-E2; EI-V03-EDGE-1) and 26 UNTESTED (535-E5; 1032-E1, -E2, -E5; 1372-E1; 1384-E1; 1921-E1, -E5; 2030-E1, -E2, -E5,
-E8; 2075-E8; 2223-E1, -E2, -E5, -E8; 2268-E1, -E5; 2295-E1, -E2, -E5; 2369-E1, -E2, -E5, -E7), all closed; the 6
combinations V03 owns closed. The owner's named combinations route no row to V03; V03 §3.7.1's drop no step reaches
serves "a retaining wall on a cliff edge" from the plan's side.

## 11 Checks run (P9, re-run on the master at P10)

* **Parts and master:** the parts 00–15 concatenate byte for byte to `new/volumes/V03-interiors.md` (383 871 characters,
  388 139 bytes); each part ends cleanly.
* **Ids:** T-V3-1 – T-V3-36, J-V3.1 – J-V3.132 and BCR-V3-1 – BCR-V3-33 each defined once, none missing in its range;
  every cited V03 id defined; 266 foreign ids, each of its unit.
* **References:** 1 549 `§` references — the base 527, V03 809, other volumes 213 (V01 20, V02 65, V04 39, V05 2, V06 3,
  V07 5, V08 2, V09 7, V10 13, V11 32, V12 25) — resolve against the base's headings (the original and the rewritten
  parts), V03's own and each volume's (original and rewritten); 0 unresolved; every list continuation carries its unit
  prefix, and a range's end takes its start's (six ranges, e.g. "V03 §3.1–§3.11").
* **Terms and narration:** 0 provenance tags; 0 retired terms (`lot`, "first paint", "floor vault", the short volume
  forms `Vn §` and `Vn-3.x`, bare `BCR-n`, "volume n §"); deferral words: none (the one "pending" is the marker line);
  "later" 12 hits, each content (a village class added later, the register's later-line rule, a later re-cut,
  "calibrate-later at P6"), none an unresolved choice; "as revised ~20:05" and "~23:40" name the owner's revised texts of
  items 109 (k) and 110 (citations, not V03's history).
* **Token coverage:** 2 063 tokens, 33 absent, each intended (§2 above).
* **Cohesion:** V03 §8's order and price agree with §16's M6-P row (P0, P1, P3 after M4; P2 once volume 4's access
  records exist; the rest after M6; 17.75–24.25 pw; PE inside M2b and M3a), with INDEX §3–§4 (the dependency graph's
  M6-P rows) and INDEX §6 (Q1 answered, J122); §14's keymap states the PageUp / PageDown precedence V03 §4.5 cites;
  T-V4-50 carries the elaboration-independence clause.
* **doc_checks** (`docs/validation/bench/doc_checks.py`; **provisional** — the reference corpus is absent in this
  checkout, and the tool warns: "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs,
  research/ftg-docs, research/external) - clean-room results are NOT authoritative; re-run on the machine that holds the
  corpus before any freeze"): C1 0, C2 0, C4 1 hit (0 unreviewed, allow-listed), S1 0; C3 314 hits (299 unreviewed) against
  the original's 505 (467); S2 run with the base's headings (`--heads`: the original base with its rewritten parts) 41
  hits, each a volume-prefixed `Vnn §x` pointer S2 reads as a base pointer, all resolved by the reference sweep above (the
  original had 66).

## 12 CROSS-PART NOTES

* **model (§2.6 step 4):** the wing-local module's value (50 cm) has its one home at V03 §2.4's `moduleCm` cell
  (VOL-V03-V04-RESTATEMENTS-003, V03-RESTATE-1); §2.6 step 4's "a table row, default 50 cm" should cite V03 §2.4 without
  the value.
* **rendering (§12.7, row R12-23):** the fallback "(50 → 100 cm)" restates the same cell; it should read "the class's
  wing-local module row doubles (V03 §2.4's `moduleCm`)".
* **scope (§13.2, T28-1):** "(V03 §3.1 step 2, §3.2 A5 (b), §2.3)" — the list continuations are V03's and should carry
  the prefix ("V03 §3.2 A5 (b), V03 §2.3"); `solidMonument` there is a `PlanReport.notes` id (E-28), not a warning.
* **V09 (§4.17.5 (a), (e); the bend catalogue):** `bend.crypt.largest` words "stops at {share} of the cathedral's" and
  `bend.crypt.cathedral` names the kept area `{m2}` (V03 §3.7.4's crypt-edit dry runs, J-V3.130); the crypt join's closing
  is a listed fate; a dossier-bound crypt's removal is refused as a dossier fact; the crypt line drops "floor vaults (wet
  ground)" and cites V03 §3.7.4's wet-ground rule (V10-XAGREE-4); XV-V9-5 and XV-V9-15 are closed at V03.
* **V10 (§3.9, §3.9a; its §1b row "WhySection rows underground and crypt"):** the `crypt` and `plan` section providers
  are registered at V03 §4.6 with the keys `info.crypt.presence.<always|basement|never|dossier>`,
  `info.crypt.form.<full|half|raised|rimVault>`, `info.crypt.rank.<principal|trimmed>`, `info.crypt.join`,
  `info.crypt.none.<row|wet>` and `info.plan.cause.<cause>` (eleven causes; the deck cause is `deckNoCellar`), and the
  notes `shrineOneRoom`, `solidMonument`, `stackCarried` by the same ids; V10's texts follow those keys (CVR-V10-2,
  CVR-V10-9 closed); its wet-ground row reads "no crypt: ledger slabs in the chancel floor".
* **V04:** nothing owed — T-V4-50 and V04 §3.5.7 (c) hold the join set's independence of elaboration (checked in
  `new/volumes/V04-underground.md`); V03 §3.12 (9) reads `gradeFaces(chamberId)` at V04 §3.5.4 (f) (DEFER-2 ruled).
* **V11:** the stepped forms are specialisation values (V11 §3.6.2), so V03 §2.4's `'*'` rows are final (J-V3.93;
  DEFER-1, -4); `crypt.rankShare` (default 0.8) is V11's cell, read by V03 §3.7.4's rank and the crypt bends; row 38's
  readers are named at V03 §2.4 (X-V11-16 (d)).
* **V12:** X-V12-4, -15, -16, -17 and -18 are closed at V03 §2.4's register lines and V03 §8 (T-V3-35 registered by the
  P1 seat; `--milestone M2b | M3a | V3-P0 … V3-P6`; `M-CAL/M6-P` for a column first compiled after M-CAL's record).
* **V01, V02:** `basementDoor(b)` and `stackAccessDoor(b, a)` keep their names, signatures and rules; both now call
  V03 §3.7.1's `doorRunPoint` (E-29), so no reader changes; V02's X11 and X30 are closed at V03 (V03 §3.1, V03 §3.6 W4,
  V03 §3.7.6 (c), V03 §2.4).
* **V06:** X3 and X18 are closed at V03 §3.7.4 (3) and V03 §2.5's outside-ground row (T-V3-30).
* **INDEX / assemble:** V03 §11 Q1 answered (J122); M6-P's order and price agree with §16 and INDEX §3–§4 and §6; shrink
  82 788 → 65 916 words (−20.4 %, below the band; §1 above says what holds it); doc_checks provisional (C1 0, C2 0, C4 1
  allowed, S1 0).
* **Integration notes:** V03 keeps the heading with one pointer line per IN note (the brief keeps the notes; the canon
  folds their content) — assemblers and verifiers should read the section as applied, not as open notes.
* **For the adjudicator:** J-V3.110 is kept as a one-line *Withdrawn* row rather than deleted as V03-NARR-8 proposed — its
  process content is out, and the id stays defined because file f and `docs/ARCHITECTURE-FULL.md` cite it (E-24: no row
  dropped).
