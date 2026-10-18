# Verify — consistency pass, round 1: the KERNEL part (§3 geometry kernel) after repair round 1

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/verify-kernel-r1`, 2026-09-26. Status: COMPLETE. Re-verifies `## §3 Geometry kernel` of
`docs/ARCHITECTURE.md` (l. 1525–2503, sha256 `ddd48f07…`, the assemble-r1 output) against the archive
(`docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`), `inventory-kernel.json` (386 items + 13 conflicts),
`canon.json`, `rewrite-kernel.md`'s mapping table, the six `repair-r1-*.md` files, `assemble-r1.md` and my round-0
report (`verify-kernel-r0.md`, cited as r0). Method: the round-0 document was rebuilt (`assemble-r0.py`, sha256
`ee314f23…` = assemble-r1's "before") and diffed against the current one, so every change round 1 made anywhere in
the document was read (114 hunks, 49 of them in §3); every inventory id whose home or pointer target lies in a
replaced subsection was re-checked, and the rest carry their r0 verdict. Scratch work:
`scratchpad/vk1/` of this session.

## 1. Outcome

§3 is sound after repair round 1. All 386 inventory ids are accounted for: 385 are OK, and one (KERNEL-112) is OK in
substance but carries the one new issue. **Every issue raised against §3 in round 0 is fixed**: the 13 of r0
(VK-R0-1 … VK-R0-13, whichever part owned them) and the model verifier's two kernel-owned issues (V-MODEL-01 = VK-R0-4,
V-MODEL-11 = VK-R0-6). The **one new issue is minor** (VK-R1-1): one fix-round tag, "(K4)" in §3.3, survived VK-R0-8's
tag removal, because r0's tag count missed it. It is fix-all round 3's pipeline→kernel note id, not an audit id. The
open items VK5-1, VK5-2 and VK5-3 stay fixed. Every canon conflict touching §3 (19) stays resolved. Two of them
(KERNEL-C05's S1 reader and CANON-C03's frames) are now also reflected on the other part's side. No deferral wording, no round
narration, no broken pointer and no new cross-part conflict appeared.

What round 1 changed in §3: the eight replaced subsections (§3.2–§3.4, §3.6–§3.10) equal the kernel repair blocks
byte for byte, and they differ from r0 in 49 hunks. 42 hunks only delete fix-round tags; 7 change text, one per fix
(§7). §3 intro, §3.1 and §3.5 are unchanged. 349 ids were re-checked: those with a home or a pointer target in a
replaced subsection, the rationale rows (the Judgment-calls index was replaced) and the ids of the fixed issues. The
other 37 carry their r0 verdict.

**CONFIRMED vs PLAUSIBLE.** CONFIRMED by execution: the rebuilt r0 document and the diff, block-for-block identity,
presence and absence of every cited fact (grep and reading), the reference resolver (0 internal breaks), `doc_checks`
on §3 (exit 0), the J-id check and the rationale-file rebuild (2 changed lines). PLAUSIBLE: the judgment that the 7
text changes in §3 and the other parts' 65 hunks shift no kernel meaning beyond the fixes. It rests on one full reading
of every hunk, with no second reader.

## 2. Issues (each with its owning part)

| id | sev | kind | owner | claim (evidence) | required change |
|---|---|---|---|---|---|
| VK-R1-1 | minor | conflict | kernel | Residual of VK-R0-8. §3.3 l. 1695 still reads "**A batch's faces are the faces it names or creates** (K4)". `K4` is fix-all round 3's pipeline→kernel cross-part note id: `docs/validation/fix-all/r3-pipeline.md` l. 1816 asks for exactly this sentence, and `r3-integration-log.md` l. 71 lists it with K1–K8. It is not an audit id; the document's audit repairs are hyphenated K-1–K-6 (§0, §6.1). The repair dropped the r0 tags ("(K4, VK2-11)" became "(K4)") but kept K4 as a "K-n audit id". r0's tag count (67) did not include it. No other fix-round tag is left in §3 (grep: 0 of the 52 distinct tags r0 had; the remaining ids are audit ids, J-ids, the critic-file citations `C2` / `V7` and NG's audit id `RA-3`). | Delete " (K4)" after "the faces it names or creates**" in §3.3 (l. 1695). |

## 3. Issues the repairs claimed to fix

| issue | owner | fixed by | verdict | evidence (current line numbers) |
|---|---|---|---|---|
| VK-R0-1 (outer-moat carve fixture) | scope | repair-scope-r1 (V-SCOPE-05) | **FIXED** | §13.1 l. 7576–7578: "an outer moat carved at S5a (§4.4) — every face outside its footprint byte-identical less the seam exception, attraction onto exactly its prepared vertices, every indexed role unique per ordinal and no contact name left". Its decks are held by §5.3's crossing invariant (l. 4047) and §13.2's "decks on 100 % of way–water crossings, moats and canals included" (l. 7700). §16 M3a (l. 8648) now points to "the carve fixtures of §13.1–§13.2 (§3.3's clear regions)", matching §3.3 (l. 1757). With this, all five of KERNEL-123's fixtures are in §13.1. |
| VK-R0-2 (S9's per-district M0 bar) | kernel | repair-kernel-r1 (+ repair-rendering-r1, VR-R0-3) | **FIXED** | §3.7 M0 (ii) l. 2326–2328: "S9's corridor bands over the CITY face set against §12.4's S9 row and **one district ≤ 3 ms on reference hardware**". §12.4's S9 row (l. 7227) reads "per district: the kernel's M0 bar (§3.7)", with 25 ms p50 (the archive's "≤ 25 ms p50"). The bar is stated once. |
| VK-R0-3 (engine id) | kernel | repair-kernel-r1 (+ VDC-1 and the assembler's post-edit) | **FIXED** | §3.7 l. 2323: "names the engine that ran — the arrangement engine, `plat-arrangement@<version>` (§5.4)". §5.4 l. 4091 reads `engine: string /* the engine id, §3.7 */`. The id occurs exactly once in the document (grep count 1). The circular pointer is gone. |
| VK-R0-4 = V-MODEL-01 (`resolve`'s debug assertion) | kernel | repair-kernel-r1 | **FIXED** | §3.4 l. 1972: "current slots, stamped with the arena version — valid until the next commit (a debug build asserts the version)". §2.2 rule 5 (l. 513) points here. |
| VK-R0-5 (anchor-key uniqueness) | kernel | repair-kernel-r1 | **FIXED** | §3.3 rule 2 l. 1735–1736: "… so in the batch's canonical op order (below), and no two vertices carry one anchor key (§3.10's one-vertex-per-ordinal check)". §2.2 (l. 369, 602, 607) points to §3.3 rules 2–3. |
| VK-R0-6 = V-MODEL-11 (`composition` indexed) | kernel | repair-kernel-r1 | **FIXED** | §3.9 l. 2433–2436: "the rows of every role §2.2 rule 7's registry marks indexed, the knot roles among them". §3.10 l. 2492: "every indexed role of §2.2 rule 7's registry other than a knot role finds exactly one vertex or edge set per ordinal". The registry (§2.2 rule 7, l. 583–584) marks `attach`, `anchor`, `weld`, `deck_end`, `gate_end`, `composition`, `gate_opening` and the knot roles indexed. So the checked set is the old six plus `composition`, the set V-MODEL-11 asked for, and it cannot go stale. No other enumeration of indexed roles remains in the document (grep). |
| VK-R0-7 (receipt "same file A") | kernel | repair-kernel-r1 | **FIXED** | §3.3 pool step 1 l. 1822–1823: "(≈ 4.6 ms for three, measured, `fixall_kernel_r4_bench.out` A)". That file's section A holds the copy timings (12 MB: 1.11 ms, 15 MB: 1.67 ms per copy), and §12.4's merge row cites the same file (l. 7233). |
| VK-R0-8 (fix-round tags) | kernel | repair-kernel-r1 | **FIXED except one residual → VK-R1-1** | All 67 tag occurrences (52 distinct) that r0 counted are gone; the J-ids and receipts are kept. The audit ids are kept "pending the document-wide convention", and every other part keeps its audit ids too (e.g. §2.1 "G-R14", §4.2 "GEO-13", §6.5's heading "G-P10"), so the convention is de facto uniform. |
| VK-R0-9 (nightly pool sizes) | scope | repair-scope-r1 (resolution recorded) | **FIXED** | `repair-r1-scope.md` records the resolution under "Resolutions recorded": the home §13.3 wins; the nightly run samples pool sizes 0 and 3, and §13.2's contract tests cover 0–3. §13.3 l. 7874–7875 states both. §6.5 (9)'s cross-host test now also names "pool sizes 0–3" (l. 4574–4575, V-SCOPE-09), which agrees with it and with §3.3 pool step 5 (l. 1869–1870). |
| VK-R0-10 (stretch fixture) | scope | repair-scope-r1 (V-SCOPE-04) | **FIXED** | §13.1 l. 7591–7594: "… every remaining profile sample within 10⁻⁹ cm of its value before and every other role unchanged (`fixall_kernel_r4_checks.out` C)". |
| VK-R0-11 (S1 `spine` reader) | pipeline | repair-pipeline-r1 (P0-7) | **FIXED** | §4.2 S1 (2) l. 2669–2670: "the clamp reads it through `skeleton(rings, 'spine')` (§3.4) as §3.8's `spine` reader, with its sampled-medial-axis downgrade". This matches §3.4's signature (l. 1981) and §3.8's reader list (l. 2370–2371). |
| VK-R0-12 (§5.4 warnings) | determinism | repair-determinism-r1 | **FIXED** | §5.4 l. 4091: `warnings … /* W_ATTRACTED, W_STRETCH_SHARED, W_WEDGE_ROUTED, W_SNAP_PASSES, W_ACUTE_CORNER, W_SLIVER_RETYPED, W_HEIGHT_CLAMPED (§3.1) */`. These are the archive's seven codes, each in §3.1's `Warning` union; `W_DOWNGRADE` is left to `downgrades`. |
| VK-R0-13 (`insetFace`) | scope | repair-scope-r1 (V-SCOPE-06) | **FIXED** | §13.1 l. 7626: "`insetRing` empties monotonically". "insetFace" occurs nowhere in the document. |

Other fixes that touch §3's statements, all checked in the text:

* **P0-4 / VR-R0-2.** §12.4's S10 (0) row (l. 7230) now reads "≈ 3 ms for the bands … + ≈ 2.3 ms for the L3 partition
  rebuild of the ≈ 9 000 items it made (§3.3 pool step 1; …)". §3.3's "carried in §12.4's S10 (0) row" (l. 1811–1812)
  is therefore true, and the values agree.
* **VDC-15.** §5.2 F-SKELETON no longer cites §3.8 for the 1 000-holed-polygon run; §13.1's ladder coverage states it
  (l. 7645–7646).
* **V-MODEL-09.** §2.2 rule 3's promotion now reads "(it lies within the hot pixel of the route it was placed on,
  §3.6)" (l. 437–438). This agrees with §3.6's placement rule (l. 2093–2096) and §3.10's placement-bound row ("when it is
  placed").
* **V-SCOPE-10.** This was r0's observation on KERNEL-357 (§4). J-DET-36's Part A row in `docs/ARCHITECTURE-RATIONALE.md`
  now carries the passage (l. 136), the F.2 heading no longer carries the instruction (l. 1106), and the index row reads
  "keyed by their route edge's endpoints" (l. 9447).
* **P0-2.** §4.5 (l. 3172–3174) now cites "§3.3 pool step 3" for a district's faces. Pool step 3 (l. 1840) states "A
  district's face set is its L1 faces and every face nested in them". See §8 for a note on the same sentence's "(§2.8)".

## 4. Open items routed to this part (VK5-1, VK5-2, VK5-3)

| item | verdict | evidence |
|---|---|---|
| VK5-1 | **FIXED** (unchanged by round 1 apart from tags) | §3.3 "No item changes in place" (l. 1892 ff., tag dropped), the tombstone definition (l. 1920 ff.), §3.10's freshness row (l. 2494, tags dropped), §3.9's chunk rule (l. 2449, tag dropped), §2.9's deferral to §3.9 (§2.9 changed only in step 4), §13.1's `drawBoundary` A→B fixture (l. 7609–7610). |
| VK5-2 | **FIXED** (unchanged apart from tags) | `opts.pinned` (l. 1945), §3.6 step 1, `pinVertices` "the only writer … released only as §2.2 rule 3 (b) states" (l. 1970), `CommitRecord.unflagged` (l. 1664), §2.2's flags comment and rule 3 (b) "other than knot rows" (l. 344, 469), §13.1's width-knot deck fixture (l. 7584–7585). |
| VK5-3 | **FIXED** (unchanged) | §2.2 l. 490–491: "… by construction for any number of later same-level vertices on that route". The receipt script and output (`fixall_kernel_r5_checks.py` / `.out`) are unchanged since r0's byte-identical re-run (r0 §3). |

## 5. Canon conflicts touching §3

Every canon conflict touching §3 stays resolved as the canon rules: r0's 16 (§4 of r0) plus SCOPE-C09, CANON-C02 and
CANON-C03. Round 1 touched the text of four of them; the rest are unchanged, or changed only by a dropped tag.

* **KERNEL-C05.** §3.8's reader list is unchanged, and §4.2 S1 (2) now names the `spine` use and its downgrade
  (VK-R0-11).
* **CANON-C03.** §3.2 (9) is unchanged. §12.2 (l. 7104–7105) now gives the rungs' frame areas by pointer ("§1.1's rung
  table (frames: §3.2 (9))") instead of the "(2 × 2 km)" cells. Its cap row keeps "a frame ≤ 153.6 km²" (l. 7112), the
  figure §3.2 (1) cites.
* **KERNEL-C01.** §3.7's oracle and fallback statements are unchanged. The M0 paragraph was re-worded only for VK-R0-2,
  and the fallback's shift-record stage list is kept.
* **CANON-C04.** "§11.2's `E_ENGINE_UNAVAILABLE`" (l. 2336). §11.2 still says "not a kernel" result (l. 6966).
* **Unchanged:** KERNEL-C02, C03, C04, C06, C07, C08, C09, C10, C11, C12, C13; MODEL-C01 (§2.2 rule 3 changed only in
  the promotion clause); MODEL-C02; CANON-C02 (§2.1 l. 311–313 still points to §3.2 (5), (6) and (9)); SCOPE-C09.
* **Other-part restatements.** The 41 other-part restatements of kernel homes (canon) were re-checked where round 1
  replaced their section (§2.1, §2.2, §2.9, §5.2, §5.3, §5.4, §6.5, §7.1, §7.2, §7.3). Only DETERMINISM-128 (§5.4,
  now agreeing, VK-R0-12), MODEL-093 and MODEL-126 (now reflected, VK-R0-4 and VK-R0-5) and MODEL-066/-069's
  hot-pixel clause (V-MODEL-09, agreeing) changed. None disagrees with §3.

## 6. Pointers from §3 into sections that round 1 replaced

§3 holds ≈ 147 qualified pointers into subsections that round 1 replaced outside §3. For each target section, the
round-1 hunks there were read against what §3's pointers need.

| target | §3 pointers | what round 1 changed there | verdict |
|---|---:|---|---|
| §2.2 | 44 | rule 3's promotion clause only (V-MODEL-09) | OK — every rule §3 cites (1, 3 incl. (b), 4, 5, 6, 7, *Size*, types) is unchanged or agrees |
| §2.9 | 8 | step 4's install mechanics, which now point to §11.3 | OK — steps 2–3, chunks, size budget (l. 1488), block-group fallback (l. 1498) and the size tests are unchanged |
| §4.2 | 1 | S1 (2) now names §3.8's `spine` reader | OK (VK-R0-11) |
| §4.5 | 2 | the Grower's containment sentence | OK — margin band (l. 3156) and `wall_strip` unchanged |
| §4.8 | 2 | the bridge list in water furniture | OK — the wall's band parts unchanged |
| §4.9 | 4 | the trees-at-render row | OK — the hinterland unit, the L3 content and the density-noise edges (l. 3630) unchanged |
| §4.11 | 7 | the `build` op's footprint type | OK — batches (1) and (3), step 4 and "a carve therefore costs its footprint" (l. 3861) unchanged |
| §5.2 | 2 | the test cells of F-NUM, F-OUTLINE, F-BUDGET-STAGE, F-CASTLE and F-SKELETON; F-SITING's ladder and test | OK — F-NUM's ladder (for optional chains) and F-PLOT unchanged |
| §5.3 | 2 | the METROPOLIS clause | OK — the dry-run commit and the suite unchanged |
| §5.4 | 1 | the `kernel.warnings` comment | OK (VK-R0-12); the engine comment keeps the pointer |
| §6.1 | 4 | the stamp-tile stream row | OK — engine, sub-streams and float01 unchanged |
| §6.2 | 2 | "in-window load" wording | OK — digest leaves and the Bars (l. 4290–4291) unchanged |
| §6.5 | 7 | (9) cross-host "pool sizes 0–3", and a replay fixture | OK — (2), (7), (9) and (10) state what §3 cites |
| §7.1 | 5 | the bridge `drawWay` and the registry sentence | OK — dry run, `E_LOCKED` conflicts, warp `fromLevel` default 1 (l. 4637) and the brushes unchanged |
| §7.2 | 2 | the field-brush τ sentence | OK — locks and pins unchanged |
| §7.3 | 10 | replay mode, and item 7 (ii)'s composition clause | OK — item 1 (seam exception), item 2 (l. 4852) and (b) 2–4 and 8 unchanged |
| §7.4 | 4 | the draw-bridges row | OK — undo records unchanged |
| §8.1, §8.10 | 4 | tag deletions only | OK |
| §11.2 | 2 | tag deletions ("confirm") | OK — no `SharedArrayBuffer` (l. 6962–6963) and `E_ENGINE_UNAVAILABLE` (l. 6966) unchanged |
| §12.2 | 1 | the ladder table now points to §1.1 and §3.2 (9) | OK — 153.6 km² kept (l. 7112) |
| §12.4 | 9 | S9 row (VK-R0-2), S10 (0) row (P0-4), S2/S3 tag | OK — S5 ≤ 8 µs (l. 7223), S8 ≈ 12 µs (l. 7226), pooled row (l. 7231) and merge row (l. 7233) unchanged |
| §12.6 | 1 | tag deletion | OK — plot-edit budget unchanged |
| §12.8 | 2 | digest-tree and crown-set sentences | OK — "one frozen arena copy per pool worker" (l. 7439) and the pool-shrinking step (l. 7497) unchanged |
| §13.1 | 11 | fixtures added (VK-R0-1, -10), `insetRing` (VK-R0-13), hill-acropolis site | OK — every fixture §3 points to is present |
| §13.2 | 6 | seam-check pointer, §2.6 composition and load-verification tests | OK — 0 `E_KEPT` (l. 7694), op-order / issue-order (l. 7680–7682), index-work fit (l. 7670), Hausdorff 0 (l. 7682) |
| §13.7 | 1 | O13 (a) only | OK — O14 (e) unchanged |
| §16 | 2 | M3a now points to §13.1–§13.2; the Staged paragraph | OK — M0 exit and the fusion-gate path unchanged |
| Judgment calls | 31 J-ids | J-DET-36 and J-S43 rows | OK — all 31 J-ids §3 cites exist in the index and in the rationale file |

The one `§2.1` match in §3 is external (`os-geometry.md` §2.1.4, l. 2036).

## 7. Mechanical checks (executed)

* **Round-0 document rebuilt.** `python3 docs/validation/consistency/assemble-r0.py` wrote 1 118 472 bytes with sha256
  `ee314f239f31a24bbf6773e7443e4fd78c4f30b63f87c4eb8ba6f6ea3afed175`, equal to assemble-r1's "before". The current
  document's sha256 is `ddd48f07099bdfeecd42f2d467e7b3ec21edb2676b71fcc7a44a14068cd5ebb1`, equal to its "after", so no
  later edit exists. A word-level diff gives 114 hunks (258 lines out, 290 in).
* **§3 hunks (6–54 of the 114).** 42 delete fix-round tags only. 7 change text:
  * 14: §3.3 rule 2, anchor-key clause;
  * 19: §3.3 pool step 1, receipt;
  * 28: §3.4 `resolve`;
  * 43: §3.7, engine id;
  * 44: §3.7 M0 (ii), plus two tags;
  * 49: §3.9, roles;
  * 54: §3.10, stored-reference row, plus the tags of the next two rows.

  The other lines of the 8 replaced subsections are byte-identical to r0. §3 intro, §3.1 and §3.5 have no hunk.
* **Blocks.** Each of `repair-r1-kernel.md`'s 8 REPLACE blocks equals its subsection in the document, trailing blank
  lines aside (script: 8 × IDENTICAL). No other repair file has a block inside §3.
* **Tags.** Fix-round tags in §3: 67 in r0, 0 in r1 by r0's pattern. "(K4)" remains (VK-R1-1).
* **References.** `assemble-r0-refs.py docs/ARCHITECTURE.md` reports 134 headings, 35 D-ids and 276 J-ids. Its only 2
  unresolved pointers are the external ones r0 and assemble-r1 list (`os-geometry.md` §2.1.4, RFC 7946 §3.1.6).
* **`doc_checks.py --sections 3`.** Exit 0: C1 5 / 0 unreviewed, C2 0, C3 59 / 0, C4 0, S1 0, S2 0.
* **J-ids.** All 30 of the form J-11 / J-K… / J-I… that §3 cites, plus J-DET-36, have an index row and a rationale
  entry (script: 0 missing). So do the J-rows of the 26 rationale ids, J-K20 included, which §3 does not cite (26 of
  26).
* **Rationale file.** A scratch copy of the rewrite-scope seat's builder (its output paths redirected; the real file was
  never written) rebuilt the pre-edit `ARCHITECTURE-RATIONALE.md`. Diffed against the current file, only 2 lines
  differ: the J-DET-36 row (l. 136) and the F.2 heading (l. 1106). This confirms repair-scope-r1's "nothing else in
  that file changed".
* **Deferral and narration.** No "TBD", "TODO", "open item", "deferred", "pending", "round n", "fix-all", "formerly",
  "previously" or review marker in §3. Every "later" means a later batch or op, and "future" does not occur.
* **Size.** §3 is 111 169 bytes, 75.1 % of the archived §3 (147 958 bytes). r0 measured 75 % (§8).

## 8. Observations (not raised)

* **§12.4's S10 (0) row restates KERNEL-145's ≈ 2.3 ms.** Its home is §3.3 pool step 1 (canon). The row points there,
  the values agree, and the budget table's job is to show the time its 5 ms assumes, so this is not a conflict.
  Replacing the figure by "the L3 partition rebuild (§3.3 pool step 1)" would make it one place. That is the rendering
  part's call.
* **§4.5's new "through `parent` (§2.8)" for how finer faces inherit their district** (pipeline's P0-2 fix, l. 3173).
  §2.8's `parent` is an entity's containment parent (`Identity.parent`, l. 1168). The face nesting that §3.3 pool
  step 3 and §3.10's nesting row use is §2.2's `LevelFaces.parent` (l. 355). Both readings give the same containment,
  so no meaning is at risk. The pipeline verifier may prefer "§2.2's `LevelFaces.parent`".
* **Audit-id convention.** Every part keeps its audit ids. Once VK-R1-1 is applied, §3 keeps no fix-round tag, and
  assemble-r1 counted none elsewhere. The "document-wide ruling" the kernel and rendering repairs left to the validator
  or Fable is therefore de facto uniform. §4.6's "(NG's substitution rule, K6)" is not a fix-round tag: it dates from
  `docs/design/proposal-kernel.md` l. 532.
* **Carried from r0 (unchanged by round 1):**
  * §3's size, now 75.1 % against the 55–65 % target;
  * §3.3's title "indexes rebuilt at stage end", true but incomplete;
  * §2.2 rule 3's two "(b)" labels, older than the pass;
  * the within-part `E_SCOPE` "scope" reconciliation, which is still to be recorded in the canon's list for Fable.

## 9. Checked list — every inventory id

Columns: the r0 verdict (from `verify-kernel-r0.md` §7); the r1 scope ("re-checked" = home or pointer target in a
subsection round 1 replaced, a rationale row, or an id of a fixed issue; "carried" = r0's verdict stands, its home and
targets untouched by round 1); the r1 verdict; the note. Line numbers are in the current `docs/ARCHITECTURE.md`.
"(VK-R0-8; hunks in §7)" means that the id's text differs from r0 at most by a deleted fix-round tag or a re-flowed line.

| id | kind | r0 verdict | r1 scope | r1 verdict | note |
|---|---|---|---|---|---|
| KERNEL-001 | rule | OK | carried | OK | carried: §3 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-002 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-003 | decision | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-004 | rule | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-005 | number | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-006 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-007 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-008 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-009 | mechanism | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-010 | rule | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-011 | decision | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-012 | rule | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-013 | rule | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-014 | rule | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-015 | decision | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-016 | defined-term | OK | re-checked | OK | §2.2 re-checked: round 1 changed only rule 3's promotion clause (hunk 3); `Plat`, `LevelFaces`, role and owner tables unchanged |
| KERNEL-017 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-018 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-019 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-020 | rule | OK | re-checked | OK | §3.6, §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-021 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-022 | rule | OK | re-checked | OK | §2.2 rule 3 promotion now '(it lies within the hot pixel of the route it was placed on, §3.6)' (l. 437–438) — agrees with §3.6's placement rule and §3.10's placement bound |
| KERNEL-023 | rule | OK | re-checked | OK | §2.2 rule 3 demotion unchanged |
| KERNEL-024 | interface | OK | re-checked | OK | §2.2 rule 5 / `StretchRef` unchanged; tag (VK3-9) dropped in §3.4 |
| KERNEL-025 | decision | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-026 | decision | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-027 | rule | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-028 | mechanism | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-029 | rule | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-030 | decision | OK | re-checked | OK | §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-031 | rule | OK | re-checked | OK — VK-R0-11 FIXED | §3.8 readers unchanged; §4.2 S1 (2) l. 2669–2670 now reads the medial axis 'through `skeleton(rings, 'spine')` (§3.4) as §3.8's `spine` reader, with its sampled-medial-axis downgrade' |
| KERNEL-032 | decision | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-033 | rule | OK | re-checked | OK | §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-034 | decision | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-035 | rule | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-036 | decision | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-037 | decision | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-038 | mechanism | OK | re-checked | OK | §8.10 re-checked: round 1 dropped one tag there (hunk 89); tiles, r₀ = 400 cm, shipped asset and stored hash unchanged |
| KERNEL-039 | mechanism | OK | re-checked | OK | §8.1 (2) unchanged (round 1 touched (5)'s tag only); §8.10 stamp unchanged |
| KERNEL-040 | budget | OK | carried | OK | carried: §12.7 not replaced by round 1 (r0 note: §12.7 Trees "placement ≤ 1 µs per instance"; §3.1 no longer mentions the budget (mapping names §12.7; §3.1 points to §8.1 (2)/§8.10)) |
| KERNEL-041 | rule | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-042 | decision | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-043 | decision | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-044 | rule | OK | re-checked | OK | §3.4, §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-045 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-046 | rule | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-047 | rule | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-048 | decision | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-049 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-050 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-051 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-052 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-053 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-054 | decision | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-055 | decision | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-056 | decision | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-057 | decision | OK | re-checked | OK | §6.5 (2) unchanged (round 1 touched (9) only) |
| KERNEL-058 | rule | OK | re-checked | OK | §6.5 (2)–(3) unchanged |
| KERNEL-059 | decision | OK | re-checked | OK | §6.1 engine unchanged (round 1 touched the stamp-tile stream row only) |
| KERNEL-060 | type | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-061 | type | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-062 | type | OK | re-checked | OK — VK-R0-12 FIXED | §3.1 `Warning` (11 codes) unchanged; §5.4 l. 4091 counts W_ATTRACTED, W_STRETCH_SHARED, W_WEDGE_ROUTED, W_SNAP_PASSES, W_ACUTE_CORNER, W_SLIVER_RETYPED, W_HEIGHT_CLAMPED (§3.1) — the archive's seven, each in §3.1's union |
| KERNEL-063 | history | OK | carried | OK | carried: rationale F.2 §B unchanged by round 1 |
| KERNEL-064 | decision | OK | re-checked | OK | J-11: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-065 | decision | OK | re-checked | OK | J-K36: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-066 | interface | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-067 | rule | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-068 | number | OK | re-checked | OK | §3.2 (1) unchanged; its '§12.2: 153.6 km²' still stated (l. 7112) |
| KERNEL-069 | rule | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-070 | rule | OK | carried | OK | carried: §3.1 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-071 | rule | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-072 | number | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-073 | number | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-074 | number | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-075 | evidence | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-076 | number | OK | re-checked | OK | §3.2, §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-077 | number | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-078 | rule | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-079 | rule | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-080 | decision | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-081 | rule | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-082 | rule | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-083 | rule | OK | re-checked | OK | §6.5 (1), (2), (5)–(7), (9) and §6.1's float01 present; (9) gained 'pool sizes 0–3' |
| KERNEL-084 | test | VK-R0-9 | re-checked | OK — VK-R0-9 FIXED | resolution recorded (repair-r1-scope.md, 'Resolutions recorded'): the home §13.3 wins — nightly run at pool sizes 0 and 3, §13.2's contract tests 0–3 (l. 7874–7875); §6.5 (9)'s cross-host test now names 0–3 (l. 4574–4575, V-SCOPE-09), consistent |
| KERNEL-085 | rule | OK | re-checked | OK (CANON-C02) | §2.1 l. 311–313 still points to §3.2 (5), (6), (9) |
| KERNEL-086 | mechanism | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-087 | evidence | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-088 | rule | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-089 | rule | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-090 | rule | OK | carried | OK | carried: §2.3 not replaced by round 1 (r0 note: §3.2 (7) "(… own check, §2.3.)"; §2.3 "clamps and reports" (l. 676)) |
| KERNEL-091 | interface | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-092 | rule | OK | re-checked | OK (CANON-C03) | §3.2 (9) unchanged; §12.2 (l. 7104–7105) now gives the frame areas by pointer to §1.1 and §3.2 (9) |
| KERNEL-093 | rule | OK | re-checked | OK | §3.2 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-094 | rule | OK | re-checked | OK | §2.2 rule 1 unchanged |
| KERNEL-095 | decision | OK | re-checked | OK | J-K13: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-096 | interface | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-097 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-098 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-099 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-100 | type | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-101 | interface | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-102 | mechanism | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-103 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-104 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-105 | rule | OK | re-checked | OK | §3.3, §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-106 | rule | OK | re-checked | OK | §3.3, §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-107 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-108 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-109 | acceptance-bar | OK | re-checked | OK | §13.2 l. 7694 '0 `E_KEPT` on the one-click path' |
| KERNEL-110 | rule | OK | re-checked | OK | §7.1 dry run unchanged (round 1 touched the bridge `drawWay` and the registry sentence) |
| KERNEL-111 | rule | OK | re-checked | OK | §7.3 item 2 'Shared-edge parts' (l. 4852) unchanged (round 1 touched replay mode and item 7) |
| KERNEL-112 | rule | OK | re-checked | OK in substance; VK-R1-1 | text unchanged; tag (VK2-11) dropped but the round-3 cross-part note tag '(K4)' remains (l. 1695) |
| KERNEL-113 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-114 | mechanism | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-115 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-116 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-117 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-118 | rule | VK-R0-5 | re-checked | OK — VK-R0-5 FIXED | §3.3 rule 2 l. 1735–1736 'and no two vertices carry one anchor key (§3.10's one-vertex-per-ordinal check)'; union with MODEL-126 complete; tag (VK4-6 (b)) dropped |
| KERNEL-119 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-120 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-121 | rule | OK | re-checked | OK | §3.3, §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-122 | rule | OK | re-checked | OK | §4.11 l. 3861 'A carve therefore costs its footprint, not the town' (round 1 touched the build op's type only) |
| KERNEL-123 | test | VK-R0-1 | re-checked | OK — VK-R0-1 FIXED | §13.1 l. 7576–7578: an outer moat carved at S5a (§4.4) with footprint identity less the seam exception, attraction onto exactly its prepared vertices, roles unique per ordinal, no contact name left; decks by §5.3's crossing invariant and §13.2's 'decks on 100 % of way–water crossings, moats and canals included'; §16 M3a (l. 8648) now points to §13.1–§13.2 |
| KERNEL-124 | decision | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-125 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-126 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-127 | test | OK | re-checked | OK | §13.1 properties l. 7634–7635 |
| KERNEL-128 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-129 | test | OK | re-checked | OK | §13.2 l. 7680–7682 (two runs, slot-renumbered, pool 0–3) |
| KERNEL-130 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-131 | test | OK | re-checked | OK | §13.1 l. 7635–7636 |
| KERNEL-132 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-133 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-134 | budget | OK | re-checked | OK | §6.2 Bars l. 4290–4291 unchanged |
| KERNEL-135 | rule | OK | re-checked | OK | §5.3 dry-run commit unchanged (round 1 touched the METROPOLIS clause only) |
| KERNEL-136 | mechanism | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-137 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-138 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-139 | number | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-140 | evidence | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-141 | mechanism | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-142 | rule | OK | re-checked | OK | §11.2 l. 6962–6963 unchanged (round 1 touched two tags) |
| KERNEL-143 | budget | VK-R0-7 | re-checked | OK — VK-R0-7 FIXED | receipt now '`fixall_kernel_r4_bench.out` A' (l. 1823), whose section A holds the copy timings (12 MB 1.11 ms, 15 MB 1.67 ms per copy); union with MODEL-136 intact; tag (VK3-6) dropped |
| KERNEL-144 | decision | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-145 | budget | OK | re-checked | OK | §3.3 pool step 1 unchanged; its 'carried in §12.4's S10 (0) row' is now true — the row (l. 7230) gives ≈ 3 ms bands + ≈ 2.3 ms rebuild of ≈ 9 000 items, pointing here (P0-4 / VR-R0-2) |
| KERNEL-146 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-147 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-148 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-149 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-150 | number | OK | re-checked | OK | §4.5 margin band (l. 3156, 2 m a side) unchanged (round 1 touched the Grower sentence) |
| KERNEL-151 | rule | OK | re-checked | OK | §4.1 not replaced; §4.9 hinterland unit unchanged (round 1 touched the trees row) |
| KERNEL-152 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-153 | mechanism | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-154 | budget | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-155 | rule | OK | re-checked | OK | pool step 5 unchanged; 'the golden suite's pool-size test (§6.5, §13.2)' — §6.5 (9) now names pool sizes 0–3 (l. 4575), §13.2 l. 7679–7681 |
| KERNEL-156 | decision | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-157 | number | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-158 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-159 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-160 | evidence | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-161 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-162 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-163 | mechanism | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-164 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-165 | evidence | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-166 | defined-term | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-167 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-168 | number | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-169 | decision | OK | re-checked | OK | J-K34: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-170 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-171 | evidence | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-172 | budget | OK | re-checked | OK | §12.6 plot-edit budget unchanged (one tag dropped) |
| KERNEL-173 | test | OK | re-checked | OK | §13.2 l. 7670 |
| KERNEL-174 | rule | OK | re-checked | OK | §3.3 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-175 | budget | OK | re-checked | OK | §12.4 S5 row l. 7223 unchanged |
| KERNEL-176 | decision | OK | re-checked | OK | J-K6: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-177 | decision | OK | re-checked | OK | J-K14: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-178 | decision | OK | re-checked | OK | J-K24: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-179 | decision | OK | re-checked | OK | J-K15: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-180 | decision | OK | re-checked | OK | J-K16: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-181 | decision | OK | re-checked | OK | J-K25: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-182 | decision | OK | re-checked | OK | J-K33: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-183 | decision | OK | re-checked | OK | J-K34: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-184 | rule | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-185 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-186 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-187 | interface | OK | re-checked | OK | §3.3, §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-188 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-189 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-190 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-191 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-192 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-193 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-194 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-195 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-196 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-197 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-198 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-199 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-200 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-201 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-202 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-203 | rule | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-204 | interface | VK-R0-4 | re-checked | OK — VK-R0-4 FIXED | `resolve` l. 1972 '— valid until the next commit (a debug build asserts the version)' (also V-MODEL-01); §2.2 rule 5 l. 513 points here |
| KERNEL-205 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-206 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-207 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-208 | interface | OK | re-checked | OK | §3.4, §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-209 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-210 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-211 | interface | OK | re-checked | OK — VK-R0-13 FIXED | §3.4 `insetRing` unchanged; §13.1 l. 7626 now '`insetRing` empties monotonically'; 'insetFace' occurs nowhere |
| KERNEL-212 | interface | OK | re-checked | OK | §3.4, §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-213 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-214 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-215 | interface | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-216 | rule | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-217 | rule | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-218 | history | OK | carried | OK | carried: rationale F.2 §B unchanged by round 1 |
| KERNEL-219 | rule | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-220 | rule | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-221 | rule | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-222 | rule | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-223 | rule | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-224 | rule | OK | re-checked | OK | §2.2 rule 5 Stretches unchanged |
| KERNEL-225 | rule | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-226 | rule | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-227 | rule | OK | re-checked | OK | §3.4 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-228 | test | VK-R0-10 | re-checked | OK — VK-R0-10 FIXED | §13.1 l. 7591–7594 stretch fixture '… and every other role unchanged' |
| KERNEL-229 | rule | OK | carried | OK | carried: §3.5 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-230 | rule | OK | carried | OK | carried: §3.5 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-231 | rule | OK | carried | OK | carried: §3.5 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-232 | rule | OK | carried | OK | carried: §3.5 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-233 | rule | OK | re-checked | OK | §2.2 rule 5 unchanged |
| KERNEL-234 | rule | OK | carried | OK | carried: §3.5 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-235 | rule | OK | carried | OK | carried: §3.5 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-236 | rule | OK | carried | OK | carried: §4.6 (8) not replaced by round 1 (r0 note: §3.5 row "(§4.6 (8))"; §4.6 step 8 ladder (a)–(d) "each rung under an operation-count work limit") |
| KERNEL-237 | rule | OK | carried | OK | carried: §3.5 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-238 | rule | OK | carried | OK | carried: §3.5 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-239 | rule | OK | carried | OK | carried: §3.5 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-240 | rule | OK | carried | OK | carried: §3.5 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-241 | rule | OK | carried | OK | carried: §3.5 not replaced; pointers into replaced sections re-checked (§6) |
| KERNEL-242 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-243 | rule | OK | re-checked | OK | §3.3, §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-244 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-245 | rule | OK | re-checked | OK | §3.3, §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-246 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-247 | algorithm-step | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-248 | algorithm-step | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-249 | test | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-250 | number | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-251 | algorithm-step | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-252 | algorithm-step | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-253 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-254 | algorithm-step | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-255 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-256 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-257 | evidence | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-258 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-259 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-260 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-261 | evidence | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-262 | test | OK | re-checked | OK | §13.1 constructive fixtures: round 1 only added fixtures |
| KERNEL-263 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-264 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-265 | rule | OK | re-checked | OK | §3.6, §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-266 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-267 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-268 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-269 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-270 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-271 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-272 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-273 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-274 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-275 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-276 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-277 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-278 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-279 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-280 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-281 | number | OK | re-checked | OK | §7.1 l. 4637 'fromLevel: 0 \| 1 /* 1 by default */' |
| KERNEL-282 | test | OK | re-checked | OK | §13.1 attraction and moves l. 7553–7566 |
| KERNEL-283 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-284 | evidence | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-285 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-286 | evidence | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-287 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-288 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-289 | number | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-290 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-291 | rule | OK | re-checked | OK | §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-292 | rule | OK | re-checked | OK | §3.4, §3.6 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-293 | decision | OK | re-checked | OK | J-K2: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-294 | decision | OK | re-checked | OK | J-K17: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-295 | decision | OK | re-checked | OK | J-K18: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-296 | decision | OK | re-checked | OK | J-K26: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-297 | decision | OK | re-checked | OK | J-K30: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-298 | decision | OK | re-checked | OK | J-K27: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-299 | decision | OK | re-checked | OK | J-K35: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-300 | decision | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-301 | algorithm-step | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-302 | mechanism | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-303 | rule | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-304 | rule | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-305 | rule | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-306 | rule | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-307 | test | OK | re-checked | OK | §13.2 l. 7682 (Hausdorff 0; §3.7) |
| KERNEL-308 | rule | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-309 | rule | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-310 | rule | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-311 | rule | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-312 | decision | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-313 | acceptance-bar | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-314 | acceptance-bar | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-315 | acceptance-bar | OK | re-checked | OK | §13.1 l. 7633 (both shares, ≥ 10⁵ unattracted cases) |
| KERNEL-316 | rule | VK-R0-3 | re-checked | OK — VK-R0-3 FIXED | §3.7 l. 2323 'the arrangement engine, `plat-arrangement@<version>` (§5.4)'; §5.4 l. 4091 keeps 'the engine id, §3.7' (assembler's post-edit); the id occurs once in the document; engine change §6.5 (7) |
| KERNEL-317 | acceptance-bar | OK | re-checked | OK | hunk 44 re-flowed (i); meaning unchanged |
| KERNEL-318 | budget | VK-R0-2 | re-checked | OK — VK-R0-2 FIXED | §3.7 l. 2327 'one district ≤ 3 ms on reference hardware'; §12.4's S9 row l. 7227 'per district: the kernel's M0 bar (§3.7)', 25 ms p50 = the archive's ≤ 25 ms p50; S11 3 / 25 µs in §12.4's pooled row l. 7231; tag (VK-5) dropped |
| KERNEL-319 | defined-term | OK | re-checked | OK | definition unchanged (re-flowed, l. 2328–2332); 'against its §12.4 row' = S11's single row (l. 7231: 5 / 40, 3 / 25, 2 / 15 µs) |
| KERNEL-320 | decision | OK | re-checked | OK | fallback unchanged; stage list kept, tag (VK-13) dropped; §11.2's `E_ENGINE_UNAVAILABLE` (l. 6966, 'not a kernel' result) |
| KERNEL-321 | decision | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-322 | budget | OK | re-checked | OK | §12.4 S5 (l. 7223) and S8 (l. 7226) rows unchanged |
| KERNEL-323 | rule | OK | re-checked | OK | §3.7 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-324 | rule | OK | re-checked | OK | §6.5 (10) unchanged; §16 M0 exit unchanged by round 1 |
| KERNEL-325 | decision | OK | re-checked | OK | J-K4: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-326 | decision | OK | re-checked | OK | J-K8: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-327 | decision | OK | re-checked | OK | J-K19: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-328 | decision | OK | re-checked | OK | J-K20: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-329 | decision | OK | re-checked | OK | §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-330 | rule | OK | re-checked | OK | §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-331 | rule | OK | re-checked | OK | §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-332 | rule | OK | re-checked | OK | §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-333 | rule | OK | re-checked | OK | §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-334 | number | OK | re-checked | OK | §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-335 | rule | OK | re-checked | OK | §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-336 | evidence | OK | re-checked | OK | §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-337 | rule | OK | re-checked | OK | §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-338 | test | OK | re-checked | OK | §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-339 | rule | OK | re-checked | OK | §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-340 | rule | OK | re-checked | OK — VK-R0-11 FIXED | reader list (KERNEL-C05) and §4.2 S1 (2) now agree (l. 2370–2371, 2669–2670) |
| KERNEL-341 | rule | OK | re-checked | OK | §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-342 | rule | OK | re-checked | OK | §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-343 | test | OK | re-checked | OK | §13.1 skeleton fixtures l. 7617–7620 |
| KERNEL-344 | acceptance-bar | OK | re-checked | OK | §3.8 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-345 | decision | OK | re-checked | OK — VK-R0-11 FIXED | each reader's downgrade named; S1's is §4.2's pointer to the sampled medial axis |
| KERNEL-346 | decision | OK | re-checked | OK | J-K5: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-347 | decision | OK | re-checked | OK | J-K21: index row present in the Judgment calls (round 1 changed only the J-DET-36 and J-S43 rows) and entry present in ARCHITECTURE-RATIONALE.md (round 1 changed only J-DET-36; script, 26 of 26) |
| KERNEL-348 | rule | OK | re-checked | OK | §3.9 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-349 | interface | OK | re-checked | OK | §3.9 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-350 | interface | OK | re-checked | OK | §3.9 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-351 | interface | VK-R0-6 | re-checked | OK — VK-R0-6 FIXED | §3.9 l. 2433–2436 'the rows of every role §2.2 rule 7's registry marks indexed, the knot roles among them'; §2.2 rule 7 l. 583–584 marks attach, anchor, weld, deck_end, gate_end, composition, gate_opening and the knot roles indexed — the old list plus `composition` |
| KERNEL-352 | interface | OK | re-checked | OK | §3.9 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-353 | rule | OK | re-checked | OK | §3.3, §3.9 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-354 | rule | OK | re-checked | OK | §3.9 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-355 | algorithm-step | OK | re-checked | OK | §3.9 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-356 | rule | OK | re-checked | OK | §3.9 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-357 | decision | OK | re-checked | OK | rationale Part A row J-DET-36 now carries the passage (ARCHITECTURE-RATIONALE.md l. 136, 'Amended by the consistency pass'); the F.2 heading (l. 1106) no longer carries the instruction; index row l. 9447 'keyed by their route edge's endpoints' — r0's observation resolved |
| KERNEL-358 | decision | OK | re-checked | OK | §2.9 block-group fallback (200 m cell, l. 1498) unchanged (round 1 touched step 4) |
| KERNEL-359 | algorithm-step | OK | re-checked | OK | §3.9 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-360 | rule | OK | re-checked | OK | §2.9 steps 2–3 unchanged |
| KERNEL-361 | decision | OK | re-checked | OK | §3.9 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-362 | rule | OK | re-checked | OK | §2.2 rule 5 unchanged |
| KERNEL-363 | test | OK | re-checked | OK | §13.1 l. 7639 |
| KERNEL-364 | rule | OK | carried | OK | carried: §11.1 not replaced by round 1 (r0 note: "(§11.1)"; §11.1 compact twin row (CBOR, typed-array tags)) |
| KERNEL-365 | number | OK | re-checked | OK | §2.9 ≤ 320 B (l. 1488) unchanged |
| KERNEL-366 | history | OK | carried | OK | carried: rationale F.2 §B unchanged by round 1 |
| KERNEL-367 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-368 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-369 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-370 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-371 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-372 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-373 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-374 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-375 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-376 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-377 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-378 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-379 | invariant | VK-R0-6 | re-checked | OK — VK-R0-6 FIXED | §3.10 l. 2492 'every indexed role of §2.2 rule 7's registry other than a knot role' = the old six plus `composition` (V-MODEL-11's list); knots keep their own clause |
| KERNEL-380 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-381 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-382 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-383 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-384 | invariant | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-385 | rule | OK | re-checked | OK | §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
| KERNEL-386 | rule | OK | re-checked | OK | §3.2, §3.10 replaced by round 1; the text differs from r0 at most by dropped fix-round tags or a re-flow (VK-R0-8; hunks in §7) — meaning unchanged |
