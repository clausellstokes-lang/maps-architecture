# Assemble — consistency pass, round 2 (the six repair-r2 files applied to `docs/ARCHITECTURE.md`)

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/assemble-r2`, 2026-09-26. Status: COMPLETE. This is a mechanical seat. The blocks were applied by a
script (`docs/validation/consistency/assemble-r2.py`, which uses r1's block rules unchanged). References were resolved
with r0's resolver (`docs/validation/consistency/assemble-r0-refs.py`, unchanged). No section text was hand-edited.

## Outcome

All 15 repair blocks of the six `docs/validation/consistency/repair-r2-*.md` files are applied to `docs/ARCHITECTURE.md`:
15 REPLACE, 0 INSERT AFTER and 0 skipped. Every target heading was found exactly once, and no two ranges overlap. The
document goes from 1 121 179 to 1 121 206 bytes (+27) and from 9 670 to 9 668 lines. It is 76.7 % of the pre-pass
document. No post-assembly edit was made, because no repair-r2 lane named one for the assembler (§5).

Every internal reference resolves: 0 are broken, and the same 2 external pointers remain as in r0 and r1. The document
checks exit 0 on the first run, with no correction and no new allow row. The hit set equals the pre-repair document's
minus one reviewed C3 hit, which left with the sentence the pipeline block removed.

CONFIRMED by executed runs: the apply script (run twice with identical output), an independent re-implementation giving
the same bytes, a whole-document `diff`, the resolver, the labelled-pointer scan, and `doc_checks.py` on the landed file.

* **Before:** sha256 `ddd48f07099bdfeecd42f2d467e7b3ec21edb2676b71fcc7a44a14068cd5ebb1`. This equals assemble-r1's
  "after". It is byte-identical (`cmp`) to a fresh run of `assemble-r0.py` followed by `assemble-r1.py`, which is the
  undo path, since the tree is not under version control.
* **After:** sha256 `d9d509faedfb6ac08a8eac887a7c3f81df2dff9ca98a66cd53370d81e7d97a5d`. Reproduce it with
  `python3 docs/validation/consistency/assemble-r2.py <before> <out> <log.json>`.

## 1. Blocks applied

**Rule.** This is the lane brief as coded, identical to `assemble-r1.py`. A block runs from its `=== REPLACE <heading> ===`
line to the next `===` line or to the end of the file. Text before a file's first `===` line is ignored; this covers the
model file's title and note. A block replaces its heading's subsection, which runs from the heading line up to the next
heading of the same or a higher level; headings inside fenced code do not count. Each block begins with its target
heading line, and the range's own trailing blank lines are kept.

All ranges were located on the input document before any block was applied, and the blocks were then spliced in from
the bottom up. The script also checks four things: each block's first line is its target heading, no block holds a
heading of its target's level or higher, every block's fences close, and no two ranges overlap. An independent
implementation gave byte-identical output. It applies the blocks one at a time in file order and re-parses the document
after each.

| # | repair file (block line) | heading replaced | document lines (before) | lines before → after | hunks | lines changed (old / new) | bytes |
|---:|---|---|---|---|---:|---|---:|
| 1 | `determinism` (l. 1) | 5.1 Principles and the seven tiers (G-P7) | 3926–3997 | 72 → 72 | 1 | 1 / 1 | +15 |
| 2 | `determinism` (l. 74) | 5.2 Failure classes: detection, ladder, test | 3998–4025 | 28 → 28 | 1 | 1 / 1 | +159 |
| 3 | `determinism` (l. 103) | 7.3 Locality — effective scope, local operators, edit fates, recorde… | 4836–5078 | 243 → 243 | 1 | 2 / 2 | +14 |
| 4 | `kernel` (l. 1) | 3.3 The transaction protocol — batches, one level each, canonical or… | 1646–1938 | 293 → 293 | 1 | 1 / 1 | −5 |
| 5 | `model` (l. 12) | 2.6 Buildings, heights and ground datum, wings, materials, sub-locat… | 807–1056 | 250 → 250 | 1 | 1 / 1 | +11 |
| 6 | `pipeline` (l. 1) | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations,… | 2632–2946 | 315 → 315 | 1 | 3 / 3 | −22 |
| 7 | `pipeline` (l. 317) | 4.4 S5 Growth stages — boundary and wall first, main roads, then FTG… | 2999–3147 | 149 → 148 | 1 | 2 / 1 | −110 |
| 8 | `pipeline` (l. 466) | 4.8 S7 Fortification furniture (per enceinte) · the castle · water f… | 3530–3614 | 85 → 85 | 1 | 1 / 1 | −7 |
| 9 | `rendering` (l. 1) | 8.10 Decoration instances (trees, scatter, crowns, roof detail) | 6228–6352 | 125 → 124 | 1 | 3 / 2 | −129 |
| 10 | `rendering` (l. 126) | 12.6 Edits, regeneration, replay and warp, as functions of scope (SC… | 7318–7360 | 43 → 43 | 1 | 3 / 3 | −71 |
| 11 | `rendering` (l. 170) | 12.7 Labels, trees, exports (SCL-8, SCL-10, SCL-14) | 7361–7427 | 67 → 67 | 2 | 8 / 8 | +68 |
| 12 | `rendering` (l. 238) | 12.8 Memory (what is counted, per rung) | 7428–7501 | 74 → 73 | 1 | 7 / 6 | −76 |
| 13 | `scope` (l. 1) | 0.2 Where the seven late owner rules (docs/AMENDMENTS-2026-09-25.md) land | 97–111 | 15 → 15 | 1 | 1 / 1 | +21 |
| 14 | `scope` (l. 17) | 1.2 The one-click default, stated once | 192–204 | 13 → 13 | 1 | 8 / 8 | +11 |
| 15 | `scope` (l. 31) | 13.2 Per-stage invariants, statistics, cost-model tests, contract te… | 7648–7792 | 145 → 146 | 1 | 22 / 23 | +148 |
| | **15 blocks** | | | | **16** | **64 / 62** | **+27** |

No block is a no-op, and none adds, drops or renames a heading. The document's 140 heading lines are unchanged and in
the same order. Code fences stay balanced (88 fence lines). The document holds exactly one "PENDING FABLE REVIEW" line,
the banner under the title (l. 3). The engine id `plat-arrangement@` still appears once (l. 2323, §3.7).

The whole-document `diff` has 16 hunks, 64 lines out and 62 in, which equals the per-block totals. The change is
therefore confined to the 15 ranges. Every hunk was read, and each is the substitution its lane's landing note in
`docs/lane-events.log` claims:

* kernel: " (K4)" dropped at l. 1695;
* model: §2.6 l. 963 changed only;
* determinism: exactly 4 lines, at l. 3989, 4019 and 5053–5054;
* pipeline: 3 / 3, 2 / 1 and 1 / 1 lines;
* scope: 1 table line, §1.2's 8-line paragraph tail, and the B-EDIT bullet going from 22 to 23 lines;
* rendering: −208 bytes and −2 lines. The lane's "4 hunks" counts §12.7's two nearby hunks as one unified-diff hunk.

## 2. Cross-lane dependencies, checked in the assembled text

Each pointer a block introduces was read against its target in the assembled document. All hold, and no value disagrees.

* §4.4 S5d's "§13.2's B-CITY `wealthLevel` sweep" and §5.2's F-BUDGET-STAGE row both land on §13.2 l. 7687. That line
  reads "`wealthLevel` ∈ {0, 0.5, 1} (population ± 5 % on ≥ 95 % of seeds, walled share in band)".
* §5.2's F-SKELETON row names "S1's coast simplicity clamp (§4.2 S1 (2))". §4.2 S1 (2) still reads it as "§3.8's `spine`
  reader, with its sampled-medial-axis downgrade" (l. 2669). §3.8 names the `spine` and `regions` readers
  (l. 2370–2372), and F-PLOT exists (l. 4015).
* §4.2 S1 (2)'s pointer to "§8.2's relief tier (F-CONTOUR, §5.2)" lands on §8.2's clip (l. 5721–5722) and on the
  F-CONTOUR row (l. 4009).
* §7.3 item 7 (ii) reads "each face and wing ring §2.6's composition rule (1) adds to its scope". This matches §2.6 rule
  (1), "together with a row neighbour's wing rings" (l. 978–988).
* §2.6's "(≤ 25 µs, §12.4's S11 row; PLAUSIBLE)" lands on §12.4's S11 row, "compound ≤ 40 µs" (l. 7229).
* §12.7's "§12.4's S11 row; the kernel's M0 bar, §3.7" lands on the "≤ 3 µs" in the same row. §3.7's M0 (ii) measures
  "S11's geometry share against its §12.4 row" (l. 2328).
* §12.6's "§7.3 item 2's replay mode" lands on §7.3 item 2's "**Replay mode** (…)" paragraph and its "S14 and S13b run
  once at the end" (l. 4866–4870).
* §8.10's "`render.stampTiles` key and components of §6.1's registry entry" lands on §6.1's entry (l. 4176).
* §12.8's "(a set is §12.7's 160 sprites)" lands on §12.7 l. 7373.
* §13.2's B-EDIT forced-§6.2 (iii) case ends "the mismatch withdraws the keep", which is the rule stated once at §6.2
  (iii) l. 4314–4315.
* §1.2's "(124–145 ms across the target's building range, §1.1; §12.1)" lands on §1.1's TOWN row (1 200–1 500) and on
  §12.5's TOWN law (124–145 ms).
* §0.2 row 4's "§12.2 (matched reference sizes and the band ends in buildings)" is the scope verifier's own offered
  wording (O-R1-3). §12.2 states that a band's ends are its population ends at 3.4 persons per building.

## 3. Sizes

| section | r1 (bytes) | r2 (bytes) | change |
|---|---:|---:|---:|
| §0 Provenance | 3 508 | 3 529 | +21 |
| §1 Scope, product shape, fusion thesis, stack | 27 414 | 27 425 | +11 |
| §2 Domain model and schemas | 141 221 | 141 232 | +11 |
| §3 Geometry kernel | 111 169 | 111 164 | −5 |
| §4 Generation pipeline | 156 323 | 156 184 | −139 |
| §5 Failure handling — no whole-map discard-and-retry | 34 863 | 35 037 | +174 |
| §7 Editing and regeneration locality — everything is editable | 104 146 | 104 160 | +14 |
| §8 Rendering and the style system | 92 571 | 92 442 | −129 |
| §12 Performance budgets | 48 566 | 48 487 | −79 |
| §13 Testing and verification | 83 090 | 83 238 | +148 |
| every other top-level section (23) | unchanged | unchanged | 0 |
| **whole document** | **1 121 179** (9 670 lines) | **1 121 206** (9 668 lines) | **+27** |

The pre-pass document was 1 461 981 bytes, and the document is now 76.7 % of it (r1: 76.7 %). Adding
`docs/ARCHITECTURE-RATIONALE.md` (279 900 bytes, which this round did not touch) gives 1 401 106 bytes, or 95.8 %.

## 4. References

**Broken: 0.** The resolver checks every `§x`, `§x.y` and `§x.y.z` reference, including continuation lists. It also
checks every `D-n`, `J-…`, `II.n` and `III.n` reference, code comments included. Its targets are the 134 numbered
headings, the 35 `**D-n —` decisions and the 276 judgment-index rows. The two unresolved pointers are external and the
same as in r0 and r1:

* l. 2036: `os-geometry.md` §2.1.4 (a findings file);
* l. 6826: RFC 7946 §3.1.6 (the GeoJSON standard). This pointer was at l. 6828; it moved up because §4.4 lost a line
  and §8.10 lost one.

**Mechanical fixes: none needed.** No block renames or renumbers a heading, and no repair-r2 file carries a renumbering
note. doc_checks S2 agrees, with 0 hits.

**Labelled-pointer scan.** This is r1's scratch check that a `§n` followed by a quoted or italic label finds that label
in the target section. It gives 19 labelled pointers and the same 13 unresolved matches before and after. All 13 are
code comments (`/* … */` read as italic), not pointers. The r2 blocks' new named pointers are plain-text forms, so
§2 checked each of them by hand.

## 5. Document checks

The command is `python3 docs/validation/bench/doc_checks.py --sections "<keys>"`, run on the landed file with the allow
file `docs/validation/doc-checks-allow.tsv`. As in r0 and r1, two key sets were run:

* **(a)** All 33 top-level heading keys: `ARCHITECTURE,The whole design,0,PART I,1,…,17,PART II,II.1,…,II.6,PART
  III,Delegated decisions,Judgment calls,Staged,Appendix A`. The parent keys ARCHITECTURE, PART I and PART II span
  their children, so C3 and C4 hits there count twice.
* **(b)** The eight `#` headings, which partition the document exactly.

| check | pre-repair (a): hits / unreviewed | r2 first run = final run (a) | r2 (b) |
|---|---|---|---|
| C1 identifiers | 5 / 0 | 5 / 0 | 5 / 0 |
| C2 colours | 0 / 0 | 0 / 0 | 0 / 0 |
| C3 3-grams | 964 / 0 | 962 / 0 | 494 / 0 |
| C4 lists | 14 / 0 | 14 / 0 | 7 / 0 |
| S1 tables | 0 / 0 | 0 / 0 | 0 / 0 |
| S2 pointers | 0 / 0 | 0 / 0 | 0 / 0 |
| exit status | 0 | **0** | **0** |

* **No correction and no new allow row were needed.** A scratch copy of the script dumps every hit. It gives 481
  distinct (check, text) hits against 482 before. The one that left is the reviewed C3 run "0 0 5 1 and", from §4.4's
  removed sentence "sweeps `wealthLevel` ∈ {0, 0.5, 1} and asserts …". It counted twice in run (a) (PART I spans §4),
  hence 964 → 962, and once in run (b) (495 → 494), which matches the pipeline lane's note. No new hit appears.
* **Stale allow rows are kept.** 206 of the 687 reviewed rows now match no hit (199 C3, 6 C4, 1 S2): the 205 carried
  from r0 and r1, plus "C3 | 0 0 5 1 and". r0 and r1 kept them for two reasons. The removed text lives on in the
  rationale file and the archive. And review is by exact text, so a kept row cannot hide a different hit. The brief
  allows dropping such rows, but one convention for all rounds keeps the allow file's history whole.

## 6. Could not place / left for the validator

* **Could not place: nothing.** All 15 of 15 blocks were applied.
* **Two optional additions were declined (vetoable).** Each was offered by a verifier or a repair lane as "may". The
  assembler writes no text, and both findings are closed by their required changes.
  * **§16's M2b exit.** VR-R1-1's required change is the §12.7 edit, which is applied. The verifier added that "Scope
    may add" "the `lit` export beside a moving sun (§12.7)" beside "the light passes and the crown bake". The rendering
    lane forwarded this to scope or assemble, and scope's block landed without it. §16 and §12.7 do not disagree: §16's
    M2b exit is silent on the test, and §12.7 is its home. If wanted, one scope REPLACE block of §16 adds the pointer.
  * **§13.2's walled share.** The pipeline lane (P1-2) said scope "may write 'its rung band'" at §13.2, whose "walled
    share in band" carries the qualifier through §4.2 S2's stage rows per rung.
* **Residual the pipeline lane named for model.** The values agree. §2.3 l. 688 keeps "clipped to the land faces (§4.2
  S1 (2), §8, §11)", and its §4.2 target now points on to §8.2. The chain is two hops, and it is not a broken reference.
* **Tag style: unchanged.** The audit ids still occur 377 times: COV 109, GEO 71, FTG 46, SCL 45, LC 39, MFP 33, DEF 19,
  IMP 9 and MN 5, plus the bare VS27 in §8.3. They await the document-wide convention. The kernel block removed the last
  "(K4)", a round-3 note id.
* **Size target: 76.7 %** against the 55–65 % target. This is unchanged, because the assembler cannot compress text.
* **Owner items untouched,** as in r0 and r1: RULING-1 and the evening amendments of `docs/AMENDMENTS-2026-09-25b.md`.
