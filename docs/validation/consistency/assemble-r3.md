# Assemble — consistency pass, round 3 (the four repair-r3 files applied to `docs/ARCHITECTURE.md`)

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/assemble-r3`, 2026-09-26. Status: COMPLETE. This is a mechanical seat. The blocks were applied by a
script (`docs/validation/consistency/assemble-r3.py`, which is `assemble-r2.py` with only its header and its input glob
changed). References were resolved with r0's resolver (`docs/validation/consistency/assemble-r0-refs.py`, unchanged).
No section text was hand-edited.

## Outcome

All 7 repair blocks of the four `docs/validation/consistency/repair-r3-*.md` files are applied to
`docs/ARCHITECTURE.md`: 7 REPLACE, 0 INSERT AFTER and 0 skipped. Every target heading was found exactly once, and no two
ranges overlap. The whole-document diff is 7 hunks, 36 lines out and 36 in. Each hunk is exactly the change
`validate.md` §8 requires for V-FIN-01 to V-FIN-07. The document goes from 1 121 206 to 1 121 342 bytes (+136). It stays
at 9 668 lines, so no line number anywhere in the document moves. It is 76.7 % of the pre-pass document.

Every internal reference resolves: 0 are broken. The same 2 external pointers remain as in r0, r1 and r2, at the same
lines. No renumbering fix was needed.

The document checks exit 0 on both key sets in the final run (20:24–20:27). Getting there took 66 new reviewed allow
rows. The first is the row `validate.md` §9 (1) prescribes. The other 65 are false positives created by corpus growth,
not by this round:

* The dwellings research lane was writing `research/findings/dwellings-posts.md`, `profile-dwellings.md` and
  `dwellings-exports.md`, plus `captures/dwellings/`, throughout this lane.
* Evaluated against one corpus load, the r2 and r3 documents raise identical hit sets. The blocks neither add nor remove
  a hit (§5).

CONFIRMED by executed runs:

* the apply script, run on a copy, twice, and on the live file, all with identical output;
* an independent re-implementation giving the same bytes;
* the whole-document diff and a word diff of every hunk;
* the r0 → r1 → r2 → r3 chain rebuilt byte for byte;
* the resolver on both documents;
* `doc_checks.py`: seven official runs of both key sets, and two one-load comparisons.

* **Before:** sha256 `d9d509faedfb6ac08a8eac887a7c3f81df2dff9ca98a66cd53370d81e7d97a5d`. This is assemble-r2's
  "after" and the hash `validate.md` read. The **undo path** is `assemble-r0.py` → `assemble-r1.py` →
  `assemble-r2.py`, re-run here. It gives `ddd48f07…` (r1) and then `d9d509fa…` (r2), byte for byte, and
  `assemble-r3.py` on that output gives the landed file. The tree is not under version control.
* **After:** sha256 `7a4e19dbae731d3ea655e21a4fc97e3eaa2fd852017176a1bb4cc5e15d4ec762`. Reproduce it with
  `python3 docs/validation/consistency/assemble-r3.py <before> <out> <log.json>`.
* **Inputs:** sha256 of the four repair files:
  * determinism `115ea764…`
  * pipeline `db6d44a8…`
  * rendering `60645dc6…`
  * scope `ac02d6fc…`

## 1. Blocks applied

**Rule.** This is the lane brief as coded, identical to r1 and r2. A block runs from its `=== REPLACE <heading> ===`
line to the next `===` line or to the end of the file. None of the four files has text before its first `===` line.
A block replaces its heading's subsection, which runs up to the next heading of the same or a higher level; headings
inside fenced code do not count. The range's own trailing blank lines are kept.

All ranges were located on the input before any block was applied, and the blocks were spliced in from the bottom up.
The script also checks four things:

* each block begins with its target heading;
* no block holds a heading of its target's level or higher;
* every block's fences close;
* no two ranges overlap.

The independent implementation applies the blocks one at a time in file order and re-parses the document after each.
It gave byte-identical output.

| # | repair file (block line) | heading replaced | document lines | lines before → after | hunks | lines changed (old / new) | bytes | fixes |
|---:|---|---|---|---|---:|---|---:|---|
| 1 | `determinism` (l. 1) | 5.2 Failure classes: detection, ladder, test | 3997–4024 | 28 → 28 | 1 | 1 / 1 | +7 | V-FIN-03 |
| 2 | `determinism` (l. 30) | 6.1 RNG and stream design | 4114–4201 | 88 → 88 | 1 | 5 / 5 | +72 | V-FIN-04 |
| 3 | `pipeline` (l. 1) | 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, … | 2632–2946 | 315 → 315 | 1 | 1 / 1 | −5 | V-FIN-07 |
| 4 | `rendering` (l. 1) | 9.5 Furniture, framing and tools | 6557–6601 | 45 → 45 | 1 | 1 / 1 | −23 | V-FIN-06 |
| 5 | `rendering` (l. 47) | 12.6 Edits, regeneration, replay and warp, as functions of scope (SCL-9) | 7316–7358 | 43 → 43 | 1 | 2 / 2 | +8 | V-FIN-01 |
| 6 | `scope` (l. 1) | 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT | 7645–7790 | 146 → 146 | 1 | 25 / 25 | +23 | V-FIN-02 |
| 7 | `scope` (l. 148) | §16 Build plan — calibration and spikes first, … | 8620–8705 | 86 → 86 | 1 | 1 / 1 | +54 | V-FIN-05 |
| | **7 blocks** | | | | **7** | **36 / 36** | **+136** | |

**Checks on the output.**

* No block is a no-op, and none adds, drops or renames a heading. The 140 heading lines are unchanged and in the same
  order.
* Fences stay balanced (88 fence lines).
* The document holds exactly one "PENDING FABLE REVIEW" line, the banner under the title (l. 3).
* The engine id `plat-arrangement@` still appears once (l. 2323).

**The seven hunks.** A word diff of every hunk shows exactly one substitution each, and every other word is identical:

* **l. 2658 (V-FIN-07):** "(TOWN 5 m, CITY 8 m, METROPOLIS 10 m)" → "(at §2.3's resolution per rung)".
* **l. 4009 (V-FIN-03):** "[§4.2 S1]" → "[§4.2 S1, §8.2]".
* **l. 4177–4181 (V-FIN-04):** "keyed by a constant entity key — the four 32-bit-lane finalisers (as for the seed key)
  over the words (…) —, with `STAGE_VIEW` …". The five-line span is re-wrapped five to five.
* **l. 6562 (V-FIN-06):** " — the seed key alone" is deleted.
* **l. 7330–7331 (V-FIN-01):** "…, and the view stages run once at the end (§7.3 item 2)".
* **l. 7687–7711 (V-FIN-02):** "walled share in band" → "walled share inside its rung band, §4.2 S2". The bullet's
  tail is re-wrapped 25 to 25 lines, and every continuation line keeps its three-space indent.
* **l. 8645 (V-FIN-05):** "the `lit` export beside a moving `path` sun (§12.7);" is inserted after the
  light-passes-and-crown-bake criterion. The row keeps its cell count (S1 0 hits).

Each hunk is also the change its lane's landing note in `docs/lane-events.log` claims (19:18, 19:26, 19:30, 19:47).
The whole-document diff lines are those notes' lines.

## 2. Cross-lane dependencies, checked in the assembled text

Each pointer a block introduces or keeps was read against its target. All hold, and no value disagrees.

* **§4.2 S1 (1)** now points to §2.3 for the per-rung resolution. §2.3 l. 656 states "TOWN 5 m, CITY 8 m, METROPOLIS
  10 m", and D-19 already names §2.3 as the home. The value is now stated once.
* **F-CONTOUR's bracket "[§4.2 S1, §8.2]"** names both computing sections:
  * the coast construction, §4.2 S1 (2), which points on at l. 2678 to "§8.2's relief tier (F-CONTOUR, §5.2)";
  * the clip at §8.2, l. 5719–5722.
* **§6.1's `render.stampTiles` entry, "(as for the seed key)",** lands on the seed key's "four 32-bit-lane finalisers
  with distinct salts" (l. 4117–4118). §8.10's pointer to "§6.1's registry entry" (l. 6261) is unchanged and now lands
  on a key whose derivation is stated.
* **§9.5's compass, "(§6.1, §14 `TOWN_ROOT`)",** now reads only the home. §6.1 defines the town root's entity key at
  l. 4120–4123 as "the seed key mixed with the fixed town lineage …, so they depend on the recipe alone and never on
  `docId`". §14's `TOWN_ROOT` comment (l. 8292) points to §6.1. The compass and the emblem are keyed by the same rule.
* **§12.6's "(§7.3 item 2)"** lands on §7.3 item 2's replay-mode paragraph, "S14 and S13b run once at the end"
  (l. 4866–4870).
* **§13.2's "inside its rung band, §4.2 S2"** lands on §4.2 S2's stage rows per rung (l. 2786–2791). §4.4 S5d
  (l. 3124) and F-BUDGET-STAGE (l. 4012) keep their "§13.2's B-CITY `wealthLevel` sweep" pointers, which land on
  l. 7687.
* **§16's M2b exit "(§12.7)"** lands on §12.7's "from M2b, where `lit` ships, a `lit` export of a CITY while a `path`
  sun advances one step per frame" (l. 7410–7414).

## 3. Sizes

A section's size here is its text from its heading line up to the next `#` or `##` heading.

| section | r2 (bytes) | r3 (bytes) | change |
|---|---:|---:|---:|
| §4 Generation pipeline | 156 183 | 156 178 | −5 |
| §5 Failure handling — no whole-map discard-and-retry | 35 036 | 35 043 | +7 |
| §6 Determinism | 50 553 | 50 625 | +72 |
| §9 Labels and map furniture | 26 422 | 26 399 | −23 |
| §12 Performance budgets | 48 486 | 48 494 | +8 |
| §13 Testing and verification | 83 237 | 83 260 | +23 |
| §16 Build plan | 31 588 | 31 642 | +54 |
| every other top-level section (26) | unchanged | unchanged | 0 |
| **whole document** | **1 121 206** (9 668 lines) | **1 121 342** (9 668 lines) | **+136** |

The pre-pass document (`docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`) was 1 461 981 bytes, and the
document is now 76.70 % of it (r2: 76.69 %). Adding `docs/ARCHITECTURE-RATIONALE.md` (279 900 bytes, which this round
did not touch) gives 1 401 242 bytes, or 95.85 %.

## 4. References

**Broken: 0.** The resolver checks every `§x`, `§x.y` and `§x.y.z` reference, including continuation lists. It also
checks every `D-n`, `J-…`, `II.n` and `III.n` reference, code comments included. Its targets are the 134 numbered
headings, the 35 `**D-n —` decisions and the 276 judgment-index rows. Its output is identical before and after this
round. The two unresolved pointers are external, at the same lines as in r2:

* l. 2036: `os-geometry.md` §2.1.4 (a findings file);
* l. 6826: RFC 7946 §3.1.6 (the GeoJSON standard).

**Mechanical fixes: none needed.** No block renames or renumbers a heading, and no repair-r3 file carries a renumbering
note (the files hold blocks only). doc_checks S2 agrees, with 0 hits.

The resolver does not check sub-labels such as "S1 (2)" or "item 2". The new pointers' sub-labels were checked by hand
in §2.

## 5. Document checks

The command is `python3 docs/validation/bench/doc_checks.py --sections "<keys>"`, run from the project root with the
allow file `docs/validation/doc-checks-allow.tsv`. As in r0 to r2, two key sets were run:

* **(a)** All 33 top-level heading keys: `ARCHITECTURE,The whole design,0,PART I,1,…,17,PART II,II.1,…,II.6,PART
  III,Delegated decisions,Judgment calls,Staged,Appendix A`. The parent keys span their children, so a hit there counts
  twice.
* **(b)** The eight `#` headings, which partition the document.

**The corpus was live.** The dwellings research lane recorded `captures/dwellings/` (6 998 → 9 623 JSON files) and
edited `research/findings/dwellings-posts.md`, `profile-dwellings.md` and `dwellings-exports.md` (last at 20:19)
throughout this lane. Each run therefore saw a larger corpus, and each new batch of unreviewed hits was reviewed before
the next run.

| run (start) | corpus: JSON files / C3 3-grams | C1 | C2 | C3 (a) | C3 (b) | C4 (a) / (b) | S1 | S2 | exit (a) / (b) |
|---|---|---|---|---|---|---|---|---|---|
| 1 (19:51) | 6 998 / 671 992 | 5 / 0 | 0 / 0 | 1 025 / 77 | 526 / 39 | 14 / 0, 7 / 0 | 0 / 0 | 0 / 0 | 1 / 1 |
| 2 (19:58) | 8 298 / 722 458 | 5 / 0 | 0 / 0 | 1 042 / 26 | 535 / 14 | 14 / 0, 7 / 0 | 0 / 0 | 0 / 0 | 1 / 1 |
| 3 (20:02) | 8 485 / 778 092 | 5 / 0 | 0 / 0 | 1 042 / 0 | 535 / 0 | 14 / 0, 7 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| 4 (20:10) | 8 999 / 816 157 | 5 / 0 | 0 / 0 | 1 054 / 16 | 541 / 9 | 14 / 0, 7 / 0 | 0 / 0 | 0 / 0 | 1 / 1 |
| 5 (20:14) | 9 499 / 819 178 | 5 / 0 | 0 / 0 | 1 054 / 0 | 541 / 0 | 14 / 0, 7 / 0 | 0 / 0 | 0 / 0 | 0 / 0 |
| 6 (20:20) | 9 623 / 820 328 | 5 / 0 | 0 / 0 | 1 068 / 4 | 548 / 2 | 14 / 0, 7 / 0 | 0 / 0 | 0 / 0 | 1 / 1 |
| **7, final (20:24)** | **9 623 / 820 508** | **5 / 0** | **0 / 0** | **1 068 / 0** | **548 / 0** | **14 / 0, 7 / 0** | **0 / 0** | **0 / 0** | **0 / 0** |

Cells read hits / unreviewed. Between runs 5 and 6, a scratch dump (20:16) found the 7 runs of the fourth review
batch, which were reviewed before run 6. Pre-repair reference, from `validate.md` §3 on run (b) at 19:09: C3 495 / 1.

**The blocks change no hit.** A scratch variant of `doc_checks.py` loads the corpus once and evaluates several
documents against it; its logic is otherwise unchanged. At 20:27, on the final corpus of 820 508 3-grams, the r2
document and the r3 document raise identical hit multisets:

* run (a): 1 087 hits (C1 5, C3 1 068, C4 14);
* run (b): 560 hits (C1 5, C3 548, C4 7);
* 0 unreviewed on both documents.

An earlier one-load comparison at 20:05 agreed. Every new hit is therefore a corpus-growth hit, and none sits on a
changed word.

**What was reviewed.** 66 distinct C3 runs, each located and read in context in the assembled text (`locate.py`). Each
was also attributed with the doc_checks tokenisation (`attrib2.py`), which records which files hold each 3-gram of the
run, whether any single file holds the whole run contiguously, and which 3-grams occur only in files modified after
assemble-r2 landed (18:05). Findings:

* **Every one of the 66 runs** needs at least one 3-gram found only in the three new dwellings findings files. The
  dwellings JSON captures completed none of them.
* **64 of the 66 occur contiguously in no corpus file.** They are stitched from common 3-grams of several files.
* **The other two are ordinary citations or phrases.**
  * "2026 09 25 readme md" is our capture citation `captures/mfcg/exports-sweep-2026-09-25/README.md` (4 places).
    `dwellings-exports.md` cites `captures/mfcg/exports-2026-09-25/README.md`.
  * "a replay of the same" is an ordinary five-word phrase that `profile-dwellings.md` also uses.

The runs fall into these kinds:

* 27 pointer or measured-number runs, such as "(rule 4; §3.6, §7.4). The", the §1.1 rung-table values and §12.7's PNG
  timings;
* 30 ordinary English phrases of our own text;
* 7 of our own statements of a measured or stated reference behaviour (§17.1 (6)), such as "MFCG fails a requested
  river in 7 of 10 attempts at size 80" and "scene 6.4–7.0 s after the click";
* the capture citation;
* `validate.md`'s row.

None is a list, table row, grammar or palette. One run, "2 6 7 3 a" (l. 7691, "(§2.6, §7.3 (a))"), lies in the §13.2
lines the scope block re-wrapped. Its words are unchanged, and the one-load comparison shows the re-wrap adds no hit.

**Rows added.** `docs/validation/doc-checks-allow.tsv` goes from 700 to 771 lines: five `# block: consistency/assemble-r3`
comment lines and 66 rows, each giving its section and a short quote of our own text.

* The first row is `validate.md` §9 (1)'s, `C3 | docs amendments 2026 09 25`, with its reason verbatim. The attribution
  confirms `dwellings-posts.md` supplies both of its new 3-grams.
* No allow row was dropped. The file was only appended to; the copy taken before the first append was diffed and its
  700 lines are unchanged.

**Stale allow rows are kept.** 220 of the 753 reviewed rows now match no hit (213 C3, 6 C4, 1 S2). They are:

* the 206 carried from r0 to r2;
* 13 older rows whose runs the corpus growth lengthened. Their text still stands, and a longer row of this lane now
  reviews it; for example, "is placed in the emptiest corner" became "1 it is placed in the emptiest corner" and "it
  is the union of" became "3 it is the union of";
* 1 of this lane's own rows, "4 5 8 4 the", superseded within the lane by "6 2 1 2 3 2 7 4 5 8 4 the".

The brief allows dropping rows only where they point at text this pass removed, and none of these does. Review is by
exact text, so a kept row cannot hide a different hit.

**C4 determinism.** No new C4 hit appeared, although the C4 list corpus grew from 383 to 452 lists. The C4 tie-break is
lexicographic (the manager's fix recorded in `doc_checks.py`), so the result does not depend on `PYTHONHASHSEED`.

Receipts are in the session scratchpad, `a3/`:

* the `dc1`–`dc8` run outputs;
* `attrib*.json` and `.txt`, and `locate*.json` and `.txt`;
* `multi.json` and `multi3.json`, from `dc_multi.py`;
* `doc.diff`, `log-landed.json`, `refs-*.json`, and the `chain/` rebuild.

## 6. Could not place / left for the closing seat

* **Could not place: nothing.** All 7 of 7 blocks were applied, and no reference needed a fix.
* **Closing duties are not this seat's.** `validate.md` §9 assigns them to the closing lane:
  * the 35 `A-`/`B-consistency` queue rows, plus this lane's;
  * the review line of every file of this pass;
  * the document's banner;
  * `SUMMARY.md`;
  * §9 (2): mark the canon's queue row REVIEWED-CORRECTED, noting that MODEL-157 and PIPELINE-059 were one fact
    (V-FIN-07), and the rationale-file row REVIEWED-CONFIRMED.
* **The live corpus is a standing hazard for the next doc_checks seat.** The dwellings lane was still active when this
  lane ended: `captures/dwellings/` grew until about 20:16, and `profile-dwellings.md` was last edited at 20:19. Any
  later edit of its findings can raise new stitched C3 runs over unchanged text. The next seat that runs doc_checks
  should review the hits of its own run, as the scope repair lane advised, or run after the dwellings lane lands.
* **Size: 76.7 %** against the 55–65 % target. `validate.md` §7 ruled that no further compression pass is needed; the
  assembler cannot compress text.
* **The audit-id tag convention is unchanged,** as in r2. The ids await the document-wide ruling.
