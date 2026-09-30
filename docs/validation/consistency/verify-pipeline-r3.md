# Verify — pipeline part, consistency pass round 3 (§4, §10, PART II, PART III)

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/verify-pipeline-r3`, 2026-09-26. Status: COMPLETE. This report re-verifies the pipeline part of
`docs/ARCHITECTURE.md` after repair round 3: `## §4 Generation pipeline` (l. 2504–3915), `## §10 Simulation and content
layer` (l. 6618–6789), `# PART II` with `## II.1`–`## II.6`, and `# PART III` (l. 8901–9169). It checks them against the
archive `docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`, `inventory-pipeline.json` (449 items plus 10 internal
conflicts), `canon.json`, the mapping table in `rewrite-pipeline.md`, the four `repair-r3-*.md` files, `validate.md`,
`assemble-r3.md` and this lane's earlier report, `verify-pipeline-r2.md`.

## 1. Outcome

Round 3 fixed everything it claimed to fix, in this part and elsewhere, and it introduced nothing new here. **This
report raises no issue.**

* **V-FIN-07 is FIXED. It is the part's only change** (§5). §4.2 S1 (1) now points to §2.3 for the height raster's
  per-rung resolution instead of repeating it. The values (TOWN 5 m, CITY 8 m, METROPOLIS 10 m) are stated once, at §2.3
  l. 656, and nothing of PIPELINE-059 is lost.
* **V-FIN-02 is FIXED.** It is this lane's round-2 finding P2-1, and the scope repair fixed it at §13.2 with "walled share
  inside its rung band, §4.2 S2". PIPELINE-187 is whole again.
* **V-FIN-03 is FIXED** and agrees with this part: F-CONTOUR's bracket now names §8.2 beside §4.2 S1.
* **The other four fixes** (V-FIN-01, V-FIN-04, V-FIN-05 and V-FIN-06) lie outside this part. Each one appears as
  `validate.md` §8 required, and none of them changes a fact that this part states or points to (§8).
* **The open items this part owns are still FIXED:** NP5-1, NP5-2, NP5-3, NP5-4 and VD5-6 (§6). **None is UNFIXED.**
* **The scans of the part are clean:**
  * no review marker, round narration, open-item tag or deferral wording (the counts equal round 2's);
  * 0 broken references;
  * `doc_checks` on the part exits 0 with 0 unreviewed hits, and the round-2 and round-3 documents raise the same 153 hits
    on one corpus snapshot;
  * every heading is unchanged.
* **One gap that predates this pass was found (O-R3-1, recorded as an observation, not an issue of this pass).** In §4.2
  S1 (4), the river-island branch "rejoins it after k cells", and no section gives k a value. The archive has the same
  words (l. 3610), so the consolidation did not cause the gap. As with GAP-1, fixing it means adding a design number,
  which belongs to the next design pass.

**CONFIRMED vs PLAUSIBLE.** CONFIRMED by execution:
* the r0 → r1 → r2 → r3 rebuild: its sha256 values equal assemble-r3's "before" and "after", and the landed file is
  identical (`cmp`);
* the whole-document diff, the part diff and the word diffs;
* the resolver;
* `doc_checks`, with every hit dumped from one corpus snapshot;
* the anchor comparison;
* each quoted line.

PLAUSIBLE (reading only): that none of the six hunks outside this part changes the meaning of a fact this part points to
(§8). Each hunk was read once, and there was no second reader. O-R3-1's routing is also a judgement.

## 2. What round 3 changed in this part (receipts)

* **The rebuild.** `assemble-r0.py`, `assemble-r1.py`, `assemble-r2.py` and `assemble-r3.py` were run into this lane's
  scratch directory (`cvp3/`). The results hash as follows:
  * r0 `ee314f23…afed175`;
  * r1 `ddd48f07…ebb1`;
  * r2 `d9d509fa…7a5d`, which is assemble-r3's "before";
  * r3 `7a4e19db…c762`, which is assemble-r3's "after".

  r3 is byte-identical to the landed `docs/ARCHITECTURE.md`. The whole-document diff has 7 hunks, 36 lines out and 36 in.
  The document stays at 9 668 lines, so no line number moves.
* **This part** has 1 853 lines before and after, and goes from 201 283 to 201 278 bytes (−5, assemble-r3's §4 row).
  `diff` shows one hunk:

  | line | subsection | fix | change (the word diff shows one substitution) |
  |---|---|---|---|
  | 2658 | §4.2 S1 (1) Heightfield | V-FIN-07 (PIPELINE-059 / MODEL-157) | "the stored raster (TOWN 5 m, CITY 8 m, METROPOLIS 10 m) is its bilinear refinement …" → "the stored raster (at §2.3's resolution per rung) is its bilinear refinement …" |

* **The replaced block.** The pipeline repair block (`repair-r3-pipeline.md`, sha256 `db6d44a8…`) equals the landed §4.2
  line for line (314 lines). It differs from round 2's §4.2 only on l. 2658. S0, S1 (2)–(10), S2 and S3 (1)–(13) are
  byte-identical.
* **Numbers.** Every value the old line held still has a home.
  * The 32 m fBm grid, the bilinear refinement with one fine octave inside the built extent, and the 2.5 m slope queries
    stay here (l. 2657–2659).
  * The per-rung resolutions are stated at §2.3 l. 656: "a resolution set per size class (TOWN 5 m, CITY 8 m, METROPOLIS
    10 m …)".
  * D-19 (l. 9268) and §12.4's S1 row ("§4.2 S1 (1), (3); hydrology grid §2.3", l. 7218) already cite §2.3.

  "CITY 8 m" now occurs once in the document.

## 3. Method

1. **191 of the 459 records were re-checked:**
   * **88 ids** whose text or pointer lies in §4.2 (PIPELINE-052 … 139). §4.2 is the one subsection of this part that
     round 3 replaced.
   * **85 ids elsewhere in the part** that fall into one of three groups:
     * the id's pointer lands in §4.2;
     * its pointer lands in a subsection another round-3 block replaced: §5.2 (every F-row name counts), §6.1, §9.5,
       §12.6, §13.2 or §16 (every milestone name counts);
     * its test is also scheduled in §13.2's re-wrapped lines.
   * **13 ids** that a pointer inside a replaced subsection lands on. Examples: F-CASTLE's "§4.8's castle acceptance",
     F-REDERIVE's "§4.11 (1)", §6.1's "(§10.2)" and §16's "§4.11, D-25".
   * **The 5 conflict records** whose places those blocks hold: CF-PIPE-01, -03, -04, -09 and -10.

   The other 268 keep their round-2 verdict, recorded in `verify-pipeline-r2.md` §10 (and through it the r1 and r0
   records). A bare "B-CITY" does not count as a pointer into §13.2, because the harness line that defines the runs
   (l. 7649) lies outside the re-wrapped lines.
2. **Every pointer line was listed by script.**
   * **From this part, 75 lines** point into the other replaced subsections:
     * §5.2: 29 lines (25 F-row names and 13 "§5.2");
     * §6.1: 6 lines;
     * §9.5: 1 line;
     * §12.6: 2 lines;
     * §13.2: 18 lines, 9 of them with an explicit "§13.2";
     * §16: 24 lines, milestone names included.

     A further 44 lines point into §4.2 from elsewhere in the part.
   * **Into this part,** the replaced subsections hold 32 pointers from §5.2, 3 from §6.1, 6 from §13.2 and 8 from §16.
     §9.5 and §12.6 hold none.

   Each line was mapped to its id, first by a locator restricted to the id's section and then by reading. Each target was
   then read in the round-3 text.
3. **Word diffs.** All seven hunks were word-diffed. Each is exactly one substitution, the one `validate.md` §8
   required, and the 25-line §13.2 re-wrap changes no other word. Every §13.2 target this part names therefore reads as
   before: the nine explicit pointers, plus the tests §13.2 also schedules (the walled coastal harbour fixtures, the trace
   test, the wall-strip and S7b-claim tests, the drawn-bridge and epoch cases, the canal across the perimeter, the seam
   typing).
4. **Anchors.** Headings (140), numbered markers, first table cells and bold labels were compared across the whole
   document (1 945 against 1 944). The two differences are expected:
   * F-CONTOUR's row key now ends "[§4.2 S1, §8.2]";
   * round 2 seemed to have a "(11)" marker, but it was the second half of "§4.2 S3 (11)", split across two §13.2 lines;
     the re-wrap joined it.

   Every sub-anchor the part uses still names the same item.
5. **Scans.**
   * The part gives the same counts as in round 2:
     * 0 PENDING;
     * 0 "round N", fix-round or open-item tags;
     * "later" 26, "open" 17 and "pending" 1 (the design term "pending claims").

     The R-ids are unchanged rule or requirement ids (NG's R1 and R3, G-R1, J-R7, R8, R14).
   * The resolver (`assemble-r0-refs.py`) finds 0 broken references on r2 and on r3. The same 2 external pointers remain
     (l. 2036 and 6826, outside the part).
   * `doc_checks.py --sections "4,10,PART II,II.1,…,II.6,PART III"` exits 0 on r2, on r3 and on the landed file: C1 5/0,
     C2 0/0, C3 147/0, C4 1/0, S1 0/0, S2 0/0.
   * A scratch copy of the script that also dumps every hit shows r2 and r3 raising the same 153 hits on one corpus
     snapshot (820 747 3-grams). C3 is 147 here against 141 in round 2 because the corpus grew (the dwellings lane's
     findings). The assembler's allow rows review those hits.

   Receipts are in the scratch directory (`cvp3/`).

## 4. Issues (each with its owning part)

None. After round 3 the part has no LOST, CHANGED, UNFIXED, CONFLICT, BROKEN-REFERENCE, DEFERRAL-WORDING or NEW-PROBLEM
finding.

## 5. The seven repair-round-3 fixes, re-checked

| fix (also raised as) | owner / repair | where, now | verdict | effect on this part |
|---|---|---|---|---|
| V-FIN-07 | pipeline / repair-r3-pipeline | §4.2 S1 (1) l. 2658 "(at §2.3's resolution per rung)"; §2.3 l. 656 holds the values | FIXED | PIPELINE-059 FIXED; MODEL-157 is now the one statement; nothing lost |
| V-FIN-02 (= P2-1 = V-SCOPE-R2-02) | scope / repair-r3-scope | §13.2 l. 7687–7688 "(population ± 5 % on ≥ 95 % of seeds, walled share inside its rung band, §4.2 S2)" | FIXED | PIPELINE-187 is whole again. The new pointer lands on §4.2 S2's stage rows per rung (l. 2786–2791). §4.4 S5d (l. 3124) and F-BUDGET-STAGE (l. 4012) keep their pointers |
| V-FIN-03 (= VDR2-1 = VR-R2-3) | determinism / repair-r3-determinism | §5.2 l. 4009 "F-CONTOUR† a contour crosses a shore [§4.2 S1, §8.2]" | FIXED | agrees with §4.2 S1 (2), which gives the coast construction and then "§8.2's relief tier (F-CONTOUR, §5.2)", and with §8.2 l. 5719–5722 |
| V-FIN-04 (= VR-R2-1) | determinism / repair-r3-determinism | §6.1 l. 4177–4181: the `render.stampTiles` key names "the four 32-bit-lane finalisers (as for the seed key) over the words (…)" | FIXED | none: §4.9's trees row names the per-entity `render.instances` stream, which is a different key |
| V-FIN-05 (= V-SCOPE-R2-01) | scope / repair-r3-scope | §16 M2b exit l. 8645 "the `lit` export beside a moving `path` sun (§12.7);" | FIXED | none: the M2b row still lists the pool rule and the relief tier this part cites (l. 2629, 9163) |
| V-FIN-06 | rendering / repair-r3-rendering | §9.5 l. 6562 "(§6.1, §14 `TOWN_ROOT`)" | FIXED | none: II.4 cites §9.5 only for the title's emptiest corner (l. 6577), which is unchanged |
| V-FIN-01 (= V-MODEL-R2-01 = VR-R2-2) | rendering / repair-r3-rendering | §12.6 l. 7330–7331 "…, and the view stages run once at the end (§7.3 item 2) — …" | FIXED | none: II.5 cites §12.6 for the per-district budget (≤ 30 ms, l. 7318), which is unchanged |

## 6. Open items owned by this part

| item | re-check against the round-3 text | verdict |
|---|---|---|
| NP5-1 | §4.1's S11 row (l. 2597) is unchanged. §2.6 rule (1) (l. 983–989) and §7.3 item 7 (ii) (l. 5050–5054) are untouched by round 3. §13.2's union-rule fixtures with bent party-wall chains lie in the re-wrapped lines, with the same words | FIXED |
| NP5-2 | §4.2 S1 (5) is byte-identical in the replaced block. F-ROUTE's "where" ("S4; S5b at stages k ≥ 2 and in every epoch …", l. 4011) is byte-identical in the replaced §5.2. §4.1's S5 row (l. 2589), the L0-writer sentence (l. 2603), §4.4 S5b (l. 3065–3068) and J-I18's index row (l. 9630) are unchanged. §13.2's drawn-bridge case keeps the same words | FIXED |
| NP5-3 | §10.4 (l. 6759–6761: "re-draws exactly the unedited names drawn from that field, listed for confirmation (§6.3 case (4)), and never the row's other names") and §7.4 are untouched | FIXED |
| NP5-4 | §2.6's `ComposedTower`, `Room` and `Porch` (l. 842–844) and §2.7's wall `Tower` (l. 1074) are untouched. The part names none of them | FIXED |
| VD5-6 | §10.4's pointers to "§2.9's pack-set rule" (l. 6762, 6778–6779) resolve, and §2.9 is untouched | FIXED |

GAP-1 stands as ruled: `validate.md` §5 routed it, with a recommended value, to the next design pass
(`workflows/09-amendments-b.js`).

## 7. Conflicts whose places round 3 replaced

| conflict | re-check | verdict |
|---|---|---|
| CF-PIPE-01 | §4.2 S3 (12) is byte-identical in the replaced block; §4.1 (c) and §4.5 S7b (3) are unchanged | RESOLVED |
| CF-PIPE-03 | §4.1's S11 row is unchanged; §13.2's party-wall fixtures were only re-wrapped | RESOLVED |
| CF-PIPE-04 | F-SITING's row is byte-identical in the replaced §5.2; §4.7 S10b and §10.2 are unchanged | RESOLVED |
| CF-PIPE-09 | §4.2 S1 (2)'s outline-template list is byte-identical; II.1 (l. 8933, 8992) and II.6 (l. 9102) still point to it | RESOLVED |
| CF-PIPE-10 | §4.2 S1 (5) and F-ROUTE's "where" are byte-identical; §4.1's S5 row and §4.4 S5b are unchanged | RESOLVED |
| CANON-C05 (mechanism in §4, budget in §12.4) | The canon names PIPELINE-059 among the mechanisms §4 states once. §4.2 S1 (1) still states the mechanism; only the per-rung resolution, a value of the Terrain record, now points to §2.3. §12.4's S1 row points to "§4.2 S1 (1), (3); hydrology grid §2.3" | RESOLVED |
| MODEL-C11, DETERMINISM-C-5 | §4.2 S1 (5)'s deck-before-water list and drawn-bridge rule are byte-identical | RESOLVED |
| KERNEL-C05 | F-SKELETON's row is byte-identical in the replaced §5.2; §4.2 S1 (2)'s `spine` reader is byte-identical | RESOLVED |

These conflict records have no place in a round-3 hunk, so their round-2 verdicts hold: CF-PIPE-02, -05, -06, -07 and
-08, MODEL-C04, KERNEL-C12, DETERMINISM-C-8, CANON-C01, CANON-C07, CANON-C09, SCOPE-C09 and NEW-PIPE-1.

## 8. Other parts' round-3 changes that this part points into

| changed place (repair) | what changed | effect on this part |
|---|---|---|
| §5.2 l. 4009 (determinism) | F-CONTOUR's bracket "[§4.2 S1, §8.2]" | agrees with §4.2 S1 (2) (PIPELINE-065, -066). The part's other lines that name an F-row or §5.2 land on byte-identical rows: F-ROUTE, F-RIVER, F-WALL, F-SITING, F-BUDGET-STAGE, F-SKELETON, F-CASTLE, F-EDIT, F-PLOT and F-CUT |
| §6.1 l. 4177–4181 (determinism) | the stamp-tile key's derivation | none. The part's six §6.1 pointers (the lineage-keyed streams, the naming concerns, `render.instances`) land on unchanged entries |
| §9.5 l. 6562 (rendering) | compass: "— the seed key alone" dropped | none (II.4's title pointer is unchanged) |
| §12.6 l. 7330–7331 (rendering) | the replay sentence's verb | none (II.5's per-district budget is unchanged) |
| §13.2 l. 7687–7711 (scope) | "walled share inside its rung band, §4.2 S2"; the bullet re-wrapped | fixes P2-1. The §13.2 targets the part names read as before (§3, point 3) |
| §16 l. 8645 (scope) | the M2b exit gains "the `lit` export beside a moving `path` sun (§12.7);" | none. The part's 24 lines that name a milestone or §16 land on unchanged text, and M2b's row still carries the pool rule (l. 2629) and the relief tier (l. 9163) |

## 9. Observations (not raised)

* **O-R3-1 — the river-island branch length has no value. The gap predates this pass and is for the design pass.**
  * §4.2 S1 (4) (l. 2707–2710, PIPELINE-075) reads: "a `river: { islands: n }` request adds a branch that leaves the
    course and rejoins it after k cells". No section gives this k a value, a table row or a draw.
  * §5.3's "within k segments" (GAP-1) is a different k.
  * The archive has the same words (l. 3609–3610), and so did every fix round (the pipeline files of fix-all r1 to r4).
    This pass did not cause the gap, and none of this pass's issue kinds fits it.
  * Fixing it adds a design number, which this pass may not do. It should go to `workflows/09` together with GAP-1, by
    the canon's GAP rule: "the validator lists it for the owner / Fable".
  * The closing seat or Fable can carry it forward, and this lane's queue row repeats it.
* **O-R3-2 — the rewrite's mapping table is historical for four ids.** `rewrite-pipeline.md` §6 still maps
  PIPELINE-059 to "§4.2 S1 (1)" alone and PIPELINE-187 to "§4.4 S5d". The repairs have since moved the per-rung
  resolution to §2.3 (V-FIN-07) and the sweep's statement to §13.2 (P1-2 and V-FIN-02). PIPELINE-066 and PIPELINE-295
  likewise changed form in round 2. The checked list below records where each id now lives, which is what the pass's
  principle (2) asks. The mapping file is a record of the pass, so no edit is proposed.
* **Round-2 observations.**
  * O-R2-1 (§2.3's contour chain) and O-R2-3 (tests stated at a §4 home and again in §13.2) are settled by `validate.md`
    §3 (ii) and (i).
  * O-R2-2 (F-SKELETON's "where" omits S10) and O-R2-4 (the short l. 2679) are unchanged.
  * r1's O-1, O-2, O-3 and O-5 are unchanged (`verify-pipeline-r1.md` §9).
* **For the closing seat (not this lane's duty):** `validate.md` §9 (2) asks it to mark the canon's queue row
  REVIEWED-CORRECTED, because MODEL-157 and PIPELINE-059 were one fact.

## 10. Checked list — every inventory id of the part (459; none sampled)

Verdicts:
* **FIXED** — a finding from r0, r1, r2 or the validation, resolved at the place shown.
* **OK / RESOLVED — re-checked** — the id was re-read in the round-3 text, for one of three reasons:
  * its text or pointer lies in §4.2, which round 3 replaced;
  * its pointer lands in a subsection another round-3 block replaced;
  * a pointer inside such a subsection lands on it.
* **OK / RESOLVED / FIXED — not touched by round 3** — round 3 changed neither its text nor its targets, so the round-2
  verdict holds (`verify-pipeline-r2.md` §10).

Totals:
* 437 OK;
* 12 FIXED: P0-1 … P0-8, P1-1, P1-3, P1-2 together with P2-1 (= V-FIN-02), and V-FIN-07;
* 10 RESOLVED;
* 0 ISSUE.

Of the 459 records, 191 were re-checked this round and 268 hold their round-2 verdict.

| id | kind | now (the rewrite's mapping) | r2 | r3 verdict |
|---|---|---|---|---|
| PIPELINE-001 | rule | §4 intro | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-002 | mechanism | §4.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-003 | interface | §4.12 `StageDecl` (the field list); §4.1 now reads "each stage registers a `StageDecl` (§4.12)… | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-004 | rule | §4.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-005 | rule | §4.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-006 | rule | §4.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-007 | rule | §4.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-008 | rule | §4.1 "Why this order" (a) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-009 | rule | §4.1 "Why this order" (b) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-010 | rule | §4.1 "Why this order" (c) — "large institutions" are now S7b claims, pointer to §4.2 S3 (12) a… | OK | OK — target re-read: §4.2 S3 (12) byte-identical in round 3's replaced block; §4.5 S7b (3) untouched (CF-PIPE-01) |
| PIPELINE-011 | rule | §4.1 "Why this order" (d); the construction itself §4.2 S3 intro and (4)–(10) | OK | OK — target re-read: §4.2 S3 intro and (4)–(10) byte-identical in round 3's replaced block |
| PIPELINE-012 | rule | §4.1 "Why this order" (e) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-013 | rule | §4.1 laziness contract | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-014 | rule | §4.1 laziness contract | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-015 | rule | §4.1 laziness contract | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-016 | rule | §4.1 laziness contract | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-017 | rule | referenced to §5.2 F-CUT (moved out; §4.6 step 8 (d) reads the allocation's pending claims) | OK | OK — target re-read: §5.2's F-CUT row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) |
| PIPELINE-018 | rule | referenced to §6.3 (DETERMINISM-224) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-019 | rule | referenced to §9.1 (RENDERING-330) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-020 | rule | §4.1 one-click first paint | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-021 | rule | §4.1 one-click first paint | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-022 | budget | referenced to §12.5 (RENDERING-538) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-023 | rule | referenced to §6.2 (DETERMINISM-597) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-024 | test | referenced to §6.5 (9) (DETERMINISM-293) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-025 | rule | referenced to §3.3 (KERNEL-103) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-026 | mechanism | §4.1 batch table, S1 row | OK | OK — target re-read: §4.2 S1 (5) (the crossing sites' deck_end vertices) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-027 | mechanism | §4.1 batch table, S3 row | OK | OK — target re-read: §4.2 S3 (12) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-028 | mechanism | §4.1 batch table, S4 row (NP5-2 context: S5b row added beside it) | OK | OK — target re-read (NP5-2): §4.2 S1 (5) byte-identical in round 3's replaced block; F-ROUTE's (extra-bridge rung, 'where') row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) |
| PIPELINE-029 | mechanism | §4.1 batch table, S5 row — adds "k ≥ 2 — S5b L0 … two same-level shore splits before S5b's L1 … | OK | OK — target re-read (NP5-2): §4.2 S1 (5) byte-identical in round 3's replaced block; F-ROUTE's (its 'where' names S5b at k ≥ 2) row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) |
| PIPELINE-030 | mechanism | §4.1 batch table, S6 row | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-031 | mechanism | §4.1 batch table, S7 row | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-032 | mechanism | §4.1 batch table, S7b row and S12a/S10a/S10b row | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-033 | mechanism | §4.1 batch table, S8 and S9 rows | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-034 | mechanism | §4.1 batch table, S10 row (step (0) contents point to §4.7 S10 (0)) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-035 | mechanism | §4.1 batch table, S11 row — corrected: "a row's party wall is the plot's shared L3 side line c… | OK | OK — re-read (NP5-1): §4.1's S11 row unchanged; §13.2's union-rule fixtures (bent party-wall chains, l. 7697–7699) lies in round 3's re-wrapped §13.2 lines (l. 7687–7711), words identical (word diff: the one substitution is V-FIN-02's); §2.6 rule (1) and §7.3 item 7 (ii) untouched by round 3 |
| PIPELINE-036 | mechanism | §4.1 batch table, S12b row + the carry sentence under the table | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-037 | mechanism | referenced to §7.3 (section restatement) | OK | OK — target re-read: "decks as §4.2 S1 (5)" lands on the byte-identical S1 (5); §7.3 untouched by round 3 |
| PIPELINE-038 | rule | §4.1 sentence under the batch table — L0 writers now "S1, S3, S4 and S5b (F-ROUTE's extra brid… | OK | OK — target re-read (NP5-2): F-ROUTE's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) |
| PIPELINE-039 | decision | rationale → J-P46 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P46)" left at §4.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-040 | rule | §4.1 sentence under the batch table | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-041 | rule | referenced to §3.3 step 1 (KERNEL-138) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-042 | rule | referenced to §5.1 (5) (DETERMINISM-015) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-043 | mechanism | referenced to §8.9 (RENDERING-241) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-044 | mechanism | §4.1 workers bullet | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-045 | rule | §4.1 workers bullet | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-046 | mechanism | §4.1 workers bullet (hinterland unit) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-047 | rule | §4.1 workers bullet | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-048 | measurement | referenced to §12.3 (RENDERING-509) | OK | OK — target re-read: "measured at M1 and M2b by §12.3's rule" (l. 2629) — §16's M1 and M2b exits still carry the pool rule (M2b: "the pool rule, the model max clause … (§12.3, §12.8)"); round 3 only added the `lit`-export criterion to M2b; §12.3 untouched |
| PIPELINE-049 | fallback | referenced to §12.3 (RENDERING-500) | OK | OK — target re-read: the single-worker fallback's measurement at M1 and M2b — §16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit) |
| PIPELINE-050 | decision | rationale → J-P10 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P10)" left at §4.1 | OK | OK — target re-read: "(J-P10)" and the M1 / M2b measurement sentence unchanged; §16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit) |
| PIPELINE-051 | decision | rationale → J-P27 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P27)" left at §4.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-052 | type | §4.2 S0 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-053 | rule | referenced to §7.7 (1) (DETERMINISM-564) | OK | OK — re-checked: its pointer in §4.2 S0 ("… are §7.7's") byte-identical; §7.7 untouched by round 3 |
| PIPELINE-054 | rule | referenced to §7.7 (DETERMINISM-575) | FIXED (P0-5) | FIXED (P0-5) — re-checked: its pointer in §4.2 S0 byte-identical; §7.7 untouched by round 3; the P0-5 fix holds |
| PIPELINE-055 | rule | referenced to §1.1 (SCOPE-063) | OK | OK — re-checked: its pointer in §4.2 S0 ("(§1.1; AM-4)") byte-identical; §1.1 untouched by round 3 |
| PIPELINE-056 | mechanism | §4.2 S0 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-057 | rule | §4.2 S0 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-058 | mechanism | §4.2 S1 (1) | OK | OK — re-checked: byte-identical (l. 2653–2657); the hunk on l. 2658 changed only PIPELINE-059's resolution parenthetical |
| PIPELINE-059 | number | §4.2 S1 (1) | OK | FIXED (V-FIN-07) — §4.2 S1 (1) (l. 2657–2659) now reads "the fBm is evaluated on a 32 m grid over frame + margin; the stored raster (at §2.3's resolution per rung) is its bilinear refinement plus one fine octave inside the built extent; slope queries at 2.5 m go through the `TerrainSampler`'s on-demand interpolation (§2.3)"; the per-rung values TOWN 5 m, CITY 8 m, METROPOLIS 10 m are stated once, at §2.3 l. 656 (MODEL-157; D-19, l. 9268, points there too); every element of the item survives with its meaning (the mechanism here, the values at the model's record — the inventory's own recommended action; validate.md §3 (iii) ruled the canon's two facts one); CANON-C05 still holds (the mechanism stated once in §4) |
| PIPELINE-060 | mechanism | §4.2 S1 (2) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-061 | mechanism | §4.2 S1 (2) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-062 | rule | §4.2 S1 (2) | FIXED (P0-7) | FIXED (P0-7) — re-checked: byte-identical; F-SKELETON's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) — its `spine` readers still name S1's coast simplicity clamp |
| PIPELINE-063 | rule | §4.2 S1 (2) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-064 | test | referenced to §13.2 (SCOPE-183) | OK | OK — target re-read: the pointer "(property test: §13.2)" (l. 2674) byte-identical; §13.2's 10 000-outline property test (l. 7683–7684) lies before round 3's re-wrapped lines, unchanged |
| PIPELINE-065 | rule | §4.2 S1 (2) | OK | OK — re-checked: the coast construction (its home, l. 2675–2677) byte-identical; F-CONTOUR's ladder starts from "the coast construction of §4.2 S1" and its bracket now also names §8.2 (V-FIN-03) — agrees |
| PIPELINE-066 | rule | referenced to §8.2; the clip-to-land rule (GEO-14) kept at §4.2 S1 (2) with the pointer | FIXED (P1-1) | FIXED (P1-1) — re-checked: §4.2 S1 (2) byte-identical (l. 2677–2679, "their extraction and clip to the land faces are §8.2's relief tier (F-CONTOUR, §5.2)"); V-FIN-03 made F-CONTOUR's bracket "[§4.2 S1, §8.2]" (l. 4009), so the † row names both places its rungs are computed — the coast construction here and the vector-space clip at §8.2 (l. 5719–5722, unchanged); agrees, nothing lost |
| PIPELINE-067 | mechanism | §4.2 S1 (2) | OK | OK — re-checked: byte-identical; its golden-suite fixtures (§13.3) untouched by round 3 |
| PIPELINE-068 | mechanism | §4.2 S1 (2) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-069 | mechanism | §4.2 S1 (3) (flat resolution and lake typing unioned from §2.3) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-070 | mechanism | §4.2 S1 (3) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-071 | number | §4.2 S1 (3) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-072 | rule | §4.2 S1 (3) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-073 | number | §4.2 S1 (3) | OK | OK — re-checked: byte-identical; F-RIVER's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) |
| PIPELINE-074 | mechanism | §4.2 S1 (3) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-075 | rule | §4.2 S1 (4) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-076 | interface | §4.2 S1 (5) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-077 | number | §4.2 S1 (5) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-078 | rule | §4.2 S1 (5) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-079 | rule | §4.2 S1 (5) | OK | OK — re-checked: byte-identical; §13.2's river-town case (0 site furniture, every built bridge's span the way's own L1 edge) lies in round 3's re-wrapped §13.2 lines (l. 7687–7711), words identical (word diff: the one substitution is V-FIN-02's) |
| PIPELINE-080 | rule | §4.2 S1 (5) bullet "A site no way uses" ("not drawn, named, labelled or exported" unioned from… | OK | OK — re-checked: byte-identical; F-ROUTE's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket); §13.2's unused-sites and epoch cases lies in round 3's re-wrapped §13.2 lines (l. 7687–7711), words identical (word diff: the one substitution is V-FIN-02's) |
| PIPELINE-081 | rule | §4.2 S1 (5) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-082 | rule | §4.2 S1 (5) bullet "A deck where no site stands" — standing-water list adds S5b (NP5-2); "ever… | OK | OK — re-checked: byte-identical (NP5-2's standing-water list); F-ROUTE's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) (its 'where' still names S5b); §13.2's drawn-bridge 15 m / 30 m case lies in round 3's re-wrapped §13.2 lines (l. 7687–7711), words identical (word diff: the one substitution is V-FIN-02's) |
| PIPELINE-083 | rule | §4.2 S1 (5) bullet "A deck placed before its water exists" — now the canonical list (carve, ou… | OK | OK — re-checked: byte-identical (MODEL-C11's canonical list); F-ROUTE's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket); §7.3 and §3.3 untouched by round 3 |
| PIPELINE-084 | mechanism | §4.2 S1 (6) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-085 | rule | §4.2 S1 (7) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-086 | rule | §4.2 S1 (8) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-087 | number | §4.2 S1 (8) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-088 | mechanism | §4.2 S1 (9)-(10) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-089 | rule | referenced to §5.2 F-RIVER; "restart-free" sentence kept at §4.2 S1 with the pointer | OK | OK — re-checked: the "restart-free" sentence byte-identical; F-RIVER's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) |
| PIPELINE-090 | mechanism | §4.2 S2 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-091 | rule | §4.2 S2 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-092 | rule | §4.2 S2 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-093 | rule | §4.2 S2 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-094 | number | §4.2 S2 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-095 | decision | rationale → J-P6 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P6)" left at §4.2 S2 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-096 | measurement | §4.2 S2 | OK | OK — re-checked: byte-identical; M1 (§16) and the golden shift (§13.3) untouched in substance by round 3 (§16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit)) |
| PIPELINE-097 | number | §4.2 S2 | OK | OK — re-checked: byte-identical (l. 2786–2791); now also the target of §13.2's new "walled share inside its rung band, §4.2 S2" (V-FIN-02) — the per-rung stage rows and walled shares (≈ 0.9 at TOWN, ≈ 0.88 at CITY and METROPOLIS) stated here are the bands that test means; agrees |
| PIPELINE-098 | decision | rationale → J-P5 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P5)" left at §4.2 S2 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-099 | type | §4.2 S2 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-100 | rule | §4.2 S3 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-101 | mechanism | §4.2 S3 (1) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-102 | mechanism | §4.2 S3 (1) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-103 | rule | §4.2 S3 (1) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-104 | number | §4.2 S3 (2) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-105 | rule | §4.2 S3 (2) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-106 | number | §4.2 S3 (2) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-107 | rule | §4.2 S3 (3) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-108 | rule | §4.2 S3 (4) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-109 | mechanism | §4.2 S3 (4) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-110 | rule | §4.2 S3 (4) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-111 | rule | §4.2 S3 (4) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-112 | measurement | §4.2 S3 (4) | OK | OK — re-checked: byte-identical; "every §13.2 walled coastal fixture" lands on §13.2's walled coastal harbour fixtures (l. 7700–7707), which lies in round 3's re-wrapped §13.2 lines (l. 7687–7711), words identical (word diff: the one substitution is V-FIN-02's); M1 untouched |
| PIPELINE-113 | rule | §4.2 S3 (4) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-114 | mechanism | §4.2 S3 (5) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-115 | mechanism | §4.2 S3 (6) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-116 | rule | §4.2 S3 (6) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-117 | rule | §4.2 S3 (7) | OK | OK — re-checked: byte-identical; F-WALL's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) |
| PIPELINE-118 | rule | §4.2 S3 (7) | OK | OK — re-checked: byte-identical; F-WALL's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) |
| PIPELINE-119 | rule | §4.2 S3 (7) | OK | OK — re-checked: byte-identical; M1's harbour-pick measurement (§16 M1) untouched by round 3 |
| PIPELINE-120 | mechanism | §4.2 S3 (8) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-121 | rule | §4.2 S3 (8) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-122 | mechanism | §4.2 S3 (9) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-123 | test | §4.2 S3 (9) | OK | OK — re-checked: byte-identical at its home (§4.2 S3 (9)); §13.2's schedule entry for the same test (l. 7692–7694) lies in round 3's re-wrapped §13.2 lines (l. 7687–7711), words identical (word diff: the one substitution is V-FIN-02's) — the pair validate.md §3 (i) ruled not a defect (R9) |
| PIPELINE-124 | evidence | dropped (history; validation record) — one receipt pointer kept at §4.2 S3 (9) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-125 | mechanism | §4.2 S3 (10) | OK | OK — re-checked: byte-identical; §13.2's `on_enceinte`-with-water case (l. 7709–7711) lies in round 3's re-wrapped §13.2 lines (l. 7687–7711), words identical (word diff: the one substitution is V-FIN-02's) |
| PIPELINE-126 | number | §4.2 S3 (10) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-127 | number | §4.2 S3 (10) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-128 | rule | §4.2 S3 (10) | OK | OK — re-checked: byte-identical; §13.2's `on_enceinte`-with-water case (0 trace–water crossings off a river's water gate) lies in round 3's re-wrapped §13.2 lines (l. 7687–7711), words identical (word diff: the one substitution is V-FIN-02's) |
| PIPELINE-129 | number | §4.2 S3 (10) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-130 | mechanism | §4.2 S3 (11) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-131 | test | referenced to §13.2 (SCOPE-191) | OK | OK — target re-read: the pointer "Its fixtures are §13.2's walled coastal harbour fixtures" (l. 2932–2933) byte-identical; §13.2's fixture list (l. 7700–7707) lies in round 3's re-wrapped §13.2 lines (l. 7687–7711), words identical (word diff: the one substitution is V-FIN-02's); every clause of the item there (harbour served, 0 non-gate ways reaching the trace, way–moat crossings on decks, roads leaving = N + harbour gate, route ≤ 1.5 × L*) |
| PIPELINE-132 | rule | §4.2 S3 (12) | OK | OK — re-checked: byte-identical (CF-PIPE-01's resolution; §4.1 (c) and §4.5 S7b (3) point here) |
| PIPELINE-133 | term | §4.2 S3 (13) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-134 | rule | §4.2 S3 (13) | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-135 | decision | rationale → J-P26 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P26)" left at §4.2 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-136 | decision | rationale → J-P35 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P35)" left at §4.2 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-137 | decision | rationale → J-P44 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P44)" left at §4.2 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-138 | decision | rationale → J-P45 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P45)" left at §4.2 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-139 | decision | rationale → J-P36 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P36)" left at §4.2 | OK | OK — re-checked: its block (§4.2) was replaced in round 3; this text is byte-identical (the part's one hunk is l. 2658, PIPELINE-059's) and its pointers resolve |
| PIPELINE-140 | rule | §4.3 | OK | OK — target re-read: §4.2 S3 (3) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-141 | mechanism | §4.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-142 | rule | §4.3 | OK | OK — target re-read: §4.2 S1 (5) and S3 (2) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-143 | rule | §4.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-144 | rule | §4.3 | OK | OK — target re-read: §4.2 S3 (5) and (7) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-145 | rule | §4.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-146 | rule | §4.3 | OK | OK — target re-read: §4.2 S3 (13) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-147 | rule | §4.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-148 | mechanism | §4.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-149 | rule | §4.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-150 | rule | §4.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-151 | rule | referenced to §5.2 F-ROUTE; "decks are fixed graph edges" kept at §4.3 | OK | OK — target re-read: F-ROUTE's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket); the extra bridge "placed as §4.2 S1 (5) states" lands on the byte-identical S1 (5) |
| PIPELINE-152 | rule | §4.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-153 | test | §4.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-154 | rule | §4.3 | OK | OK — target re-read: F-ROUTE's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) |
| PIPELINE-155 | mechanism | referenced to §7.3 operator table (DETERMINISM-412) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-156 | rule | §4.4 | OK | OK — target re-read: §4.2 S3 (6)–(9) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-157 | mechanism | §4.4 S5a | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-158 | number | §4.4 S5a | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-159 | rule | §4.4 S5a | OK | OK — target re-read: §4.2 S3 (6) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-160 | rule | §4.4 S5a | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-161 | test | referenced to §13.5 (B-REF anisotropy row); calibration target kept at §4.4 S5a | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-162 | mechanism | §4.4 S5a | OK | OK — target re-read: §4.2 S3 (9) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-163 | rule | §4.4 S5a | OK | OK — target re-read: §4.2 S0 (the citadel) and S3 (8) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-164 | rule | §4.4 S5a "Water and the waterfront" (§3.3 rule 3 promotion unioned) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-165 | rule | §4.4 S5a "Water and the waterfront" (anchoring on shore/bank/cliff/enceinte and the enclosed/s… | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-166 | rule | §4.4 S5a | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-167 | rule | referenced to §5.2 F-WALL; the pull cap kept at §4.4 S5a | OK | OK — target re-read: F-WALL's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket); the pull cap kept here unchanged |
| PIPELINE-168 | mechanism | §4.4 S5a | OK | OK — target re-read: §4.2 S3 (10) (the innermost enceinte's moat) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-169 | rule | §4.4 S5b — routes under S4's F-ROUTE ladder incl. extra bridge; L0 batch before its L1 batch (… | OK | OK — target re-read (NP5-2): §4.2 S3 (4)'s gate law and S1 (5) byte-identical in round 3's replaced block; F-ROUTE's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) |
| PIPELINE-170 | rule | §4.4 S5b | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-171 | test | §4.4 S5b | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-172 | mechanism | §4.4 S5c | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-173 | rule | §4.4 S5c | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-174 | acceptance | referenced to §13.5 table (SCOPE-263) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-175 | decision | rationale → J-P4 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P4)" left at §4.4 S5c | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-176 | mechanism | §4.4 S5c | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-177 | evidence | §4.4 S5c | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-178 | rule | §4.4 S5c | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-179 | rule | §4.4 S5c | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-180 | rule | §4.4 S5c | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-181 | rule | §4.4 S5c | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-182 | rule | §4.4 S5c | OK | OK — target re-read: §4.2 S1 (5) (a `site`'s bank vertex) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-183 | number | §4.4 S5c | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-184 | rule | §4.4 S5c | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-185 | mechanism | §4.4 S5d | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-186 | rule | §4.4 S5d | OK | OK — target re-read: F-SITING's and F-BUDGET-STAGE's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket); F-BUDGET-STAGE's test cell still "§13.2's B-CITY `wealthLevel` sweep" |
| PIPELINE-187 | test | §4.4 S5d test ("on ≥ 95 % of seeds" unioned from §5.2 F-BUDGET-STAGE) | ISSUE P2-1 | FIXED (P1-2; P2-1 = V-FIN-02) — §4.4 S5d (l. 3124): "**Test:** §13.2's B-CITY `wealthLevel` sweep."; §13.2 (l. 7686–7688) now reads "a B-CITY sweep over `wealthLevel` ∈ {0, 0.5, 1} (population ± 5 % on ≥ 95 % of seeds, walled share inside its rung band, §4.2 S2)" — the archive's qualifier (archive l. 4111–4112) restored, with a pointer to the per-rung shares (l. 2786–2791); every element of the item is stated once, at the test's home by R9 (validate.md §3 (i)); F-BUDGET-STAGE (l. 4012) points there too |
| PIPELINE-188 | number | §4.4 table | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-189 | rule | §4.4 table | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-190 | test | §4.4 table | OK | OK — re-checked: byte-identical at its home (§4.4 table); §13.2's `ringed` entry (l. 7686–7687) partly lies in round 3's re-wrapped §13.2 lines (l. 7687–7711), words identical (word diff: the one substitution is V-FIN-02's) — validate.md §3 (i)'s pair |
| PIPELINE-191 | decision | rationale → J-P4 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P4)" left at §4.4 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-192 | acceptance | §4.4 | OK | OK — target re-read: §16's M0 row (the fusion gate) — §16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit) |
| PIPELINE-193 | fallback | §4.4 | OK | OK — target re-read: M0-b and M1 with their fallbacks (§16) — §16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit) |
| PIPELINE-194 | rule | §4.5 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-195 | rule | §4.5 "Perimeter and margin band" — the margin band's one statement (perimeter and shared reser… | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-196 | mechanism | §4.5 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-197 | rule | §4.5 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-198 | rule | referenced to §2.5 (section restatement) | FIXED (P0-2) | FIXED (P0-2) — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-199 | mechanism | §4.5 Quarters | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-200 | rule | §4.5 Quarters (receipts kept as pointers) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-201 | evidence | dropped (history; validation record) — receipts kept at §4.5 Quarters | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-202 | rule | referenced to §9.4; "S13a names every node of the tree" kept at §4.5 Quarters | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-203 | decision | rationale → J-P28 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P28)" left at §4.5 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-204 | decision | rationale → J-P2 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P2)" left at §4.5 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-205 | rule | §4.5 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-206 | rule | §4.5 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-207 | mechanism | §4.5 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-208 | number | §4.5 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-209 | rule | §4.5 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-210 | rule | §4.5 Fields, Bands bullet ("`setAttr` … re-derives every block whose band changes" unioned fro… | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-211 | rule | referenced to §7.2; "a field brush never moves FieldBands" kept at §4.5 Bands | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-212 | rule | §4.5 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-213 | rule | §4.5 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-214 | rule | §4.5 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-215 | rule | §4.5 S7b | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-216 | mechanism | §4.5 S7b (1) | OK | OK — target re-read: §6.1's lineage-keyed stream rule unchanged (round 3's §6.1 change is the `render.stampTiles` entry only) |
| PIPELINE-217 | rule | §4.5 S7b (2) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-218 | rule | §4.5 S7b (3) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-219 | rule | §4.5 S7b (3) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-220 | decision | rationale → J-P41 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P41)" left at §4.5 S7b (3) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-221 | test | §4.5 S7b (3) | OK | OK — re-checked: its §13.2 entry "0 S7b claims meeting a wall strip" (l. 7694–7695) lies in round 3's re-wrapped §13.2 lines (l. 7687–7711), words identical (word diff: the one substitution is V-FIN-02's); its home §4.5 S7b (3) untouched |
| PIPELINE-222 | rule | §4.5 S7b (4) | OK | OK — reference re-read: §6.1's note "`alloc.district` also draws S7b's edge-green-or-orchard choice per district, and `island.place` the sky allocations' areas (§4.5 S7b (4)–(5))" (l. 4182–4183) is byte-identical in round 3's §6.1 block and lands on this unchanged text |
| PIPELINE-223 | rule | §4.5 S7b (5) | OK | OK — target re-read: §4.2 S2's dense-core plot share 0.62 byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical); §6.1's `island.place` note (§4.5 S7b (4)–(5), l. 4183) byte-identical in round 3's §6.1 block |
| PIPELINE-224 | rule | §4.6 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-225 | rule | §4.6 | OK | OK — target re-read: §13.2's contract test "S8's working block equals S9's committed block (Hausdorff 0; §3.7)" (l. 7679) lies outside round 3's re-wrapped lines, unchanged |
| PIPELINE-226 | test | §4.6 | OK | OK — re-checked: its §13.2 schedule entry "0 lanes crossing a wall strip and 0 L3 band faces split or cleared (NF-P5)" (l. 7694) lies in round 3's re-wrapped §13.2 lines (l. 7687–7711), words identical (word diff: the one substitution is V-FIN-02's); home §4.6 untouched (a validate.md §3 (i) pair) |
| PIPELINE-227 | rule | §4.6 | OK | OK — target re-read: "M0 (b)'s face set is §16's" — §16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit) |
| PIPELINE-228 | test | referenced to §16 M0 (b) (moved out; §4.6 "Sides" points) | OK | OK — target re-read: §16's M0 (b) face set — §16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit) |
| PIPELINE-229 | rule | §4.6 (1) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-230 | number | §4.6 (2) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-231 | rule | §4.6 (3) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-232 | rule | §4.6 (4) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-233 | measurement | §4.6 (4) | OK | OK — target re-read: M0 (b) (§16) — §16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit) |
| PIPELINE-234 | rule | §4.6 (5) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-235 | number | §4.6 (6) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-236 | rule | §4.6 (7) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-237 | rule | §4.6 (7) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-238 | rule | §4.6 (7) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-239 | rule | referenced to §7.3 item 1; one-sentence summary and pointer at §4.6 step 7 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-240 | decision | rationale → J-P32 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P32)" left at §4.6 (7) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-241 | rule | §4.6 step 8 ("each rung under an operation-count work limit; ≤ 3 candidates in all" unioned fr… | OK | OK — reference re-read: F-CUT† [§4.6] (l. 4005) byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket); its ladder is the one stated here (step 8) |
| PIPELINE-242 | acceptance | §4.6 (8) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-243 | rule | §4.6 (9) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-244 | rule | §4.6 (10)-(11) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-245 | decision | rationale → J-P11 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P11)" left at §4.6 (10) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-246 | rule | §4.6 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-247 | number | §4.6 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-248 | rule | §4.6 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-249 | interface | §4.6 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-250 | interface | §4.6 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-251 | mechanism | referenced to §3.7; S9's per-district / hinterland runs and the strip's L2 kept at §4.7 S9 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-252 | rule | §4.7 S9 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-253 | mechanism | §4.7 S10a | OK | OK — target re-read: §6.1's lineage-keyed streams (`alloc.block`) unchanged by round 3's §6.1 block |
| PIPELINE-254 | rule | §4.7 S10a | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-255 | rule | §4.7 S10 (0) (margin bands by pointer to §4.5) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-256 | number | referenced to §12.4 (RENDERING-523) | FIXED (P0-4) | FIXED (P0-4) — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-257 | rule | referenced to §7.3 item 2; the castle-curtain and hinterland-recipe clauses stay at §4.7 S10 (… | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-258 | mechanism | §4.7 S10 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-259 | number | §4.7 table | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-260 | rule | §4.7 S10 (3) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-261 | rule | §4.7 S10 (4) | OK | OK — target re-read: F-SKELETON's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) — its `regions` reader (S10) still takes F-PLOT's ladder, whose first rung is this reflex pre-cut partition |
| PIPELINE-262 | test | referenced to §13.2 (SCOPE-183) | OK | OK — target re-read: §13.2's "plots on concave, notched and curved blocks" (l. 7684) outside round 3's re-wrapped lines, unchanged |
| PIPELINE-263 | rule | §4.7 S10 (5)-(6) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-264 | rule | §4.7 S10 (7) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-265 | rule | §4.7 S10 (8) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-266 | rule | §4.7 S10 (9)-(10) | OK | OK — reference re-read: F-PLOT† [§4.7] (l. 4015) byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket); its test (every plot ≥ 1 access edge, NG's 42 % baseline) matches this text |
| PIPELINE-267 | rule | §4.7 S10 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-268 | rule | §4.7 S10 | OK | OK — target re-read: §4.2 S1 (8)'s shore setback byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-269 | rule | §4.7 S10 | OK | OK — target re-read: F-BUDGET-STAGE's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) |
| PIPELINE-270 | rule | §4.7 S10b | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-271 | rule | §4.7 S10b | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-272 | rule | §4.7 S10b | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-273 | rule | §4.7 S10b — "never gives up" now reads "never silently", with F-SITING's last rung (CF-PIPE-04) | OK | OK — target re-read: F-SITING's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) (CF-PIPE-04) |
| PIPELINE-274 | number | §4.7 S10b | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-275 | rule | §4.7 S10b | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-276 | rule | §4.7 S11 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-277 | number | §4.7 S11 table | OK | OK — reference re-read: F-SITEPLAN† [§4.7 S11] (l. 4017) byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket); its arrangement rungs are this table's; §2.6 untouched by round 3 |
| PIPELINE-278 | rule | referenced to §2.5 `PlotBound`; the streetwall-continuity and export clauses kept at §4.7 S11,… | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-279 | rule | §4.7 S11 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-280 | rule | §4.7 S11 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-281 | rule | §4.7 S11 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-282 | number | §4.7 pins | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-283 | rule | referenced to §8.5 (RENDERING-180) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-284 | rule | §4.8 | OK | OK — target re-read: §4.2 S3 (6)–(9) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-285 | number | §4.8 wall strips | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-286 | rule | §4.8 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-287 | decision | rationale → J-P29 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P29)" left at §4.8 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-288 | rule | §4.8 | OK | OK — target re-read: §4.2 S3 (7)'s harbour gate byte-identical; F-WALL's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) |
| PIPELINE-289 | rule | §4.8 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-290 | number | §4.8 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-291 | mechanism | §4.8 castle (surround named as `Castle.surround`, moat as `Castle.moat`, per MODEL-C04) | OK | OK — target re-read: §4.2 S3 (8) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-292 | rule | §4.8 castle | OK | OK — target re-read: §4.2 S3 (10) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-293 | decision | rationale → J-P36 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P36)" left at §4.8 castle | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-294 | rule | §4.8 castle | OK | OK — target re-read: §4.2 S3 (10) byte-identical; F-CASTLE's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) ("— never a restart (§5.2)" still lands on its ladder) |
| PIPELINE-295 | acceptance | §4.8 castle acceptance ("0 ways through reservations" and MFCG census baseline unioned from §5… | FIXED (P1-3) | FIXED (P1-3) — reference re-read: F-CASTLE's test cell "§4.8's castle acceptance; O8 (d)" (l. 4014) byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) and lands on this unchanged acceptance |
| PIPELINE-296 | rule | §4.8 | OK | OK — target re-read: §4.2 S0 (up to two castles) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-297 | rule | §4.8 water furniture (deck list unioned from §2.7) | FIXED (P0-6) | FIXED (P0-6) — target re-read: its pointers "(§4.2 S3 (2), (10))" and to §4.2 S1 (5) land on round 3's byte-identical §4.2 block; the P0-6 fix holds |
| PIPELINE-298 | rule | referenced to §6.3 (bridge address); the re-base and gate-passage clauses kept at §4.8 | OK | OK — target re-read: "The F-WALL ladder's last rung is §5.2's" — F-WALL's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket); §6.3 untouched |
| PIPELINE-299 | number | §4.8 water | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-300 | rule | referenced to §5.3 (crossing invariant); the harbour-works list kept at §4.8 water furniture | OK | OK — re-checked: §13.2's harbour-works fixture (two-arm mole, detached breakwater, l. 7699–7700) lies in round 3's re-wrapped §13.2 lines (l. 7687–7711), words identical (word diff: the one substitution is V-FIN-02's); §5.3 untouched |
| PIPELINE-301 | rule | §4.8 water | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-302 | rule | §4.9 S12a | OK | OK — target re-read: §4.2 S3 (10) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-303 | rule | §4.9 S12a | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-304 | mechanism | §4.9 S12a | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-305 | number | §4.9 S12a | OK | OK — target re-read: §4.2 S1 (8) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-306 | rule | §4.9 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-307 | test | §4.9 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-308 | mechanism | §4.9 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-309 | rule | §4.9 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-310 | mechanism | §4.9 | OK | OK — target re-read: §4.2 S3 (10) byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-311 | rule | §4.9 S12b | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-312 | rule | §4.9 S12b | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-313 | number | §4.9 table | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-314 | rule | §4.9 table | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-315 | number | §4.9 table | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-316 | number | §4.9 table | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-317 | rule | §4.9 table | FIXED (P0-1) | FIXED (P0-1) — target re-read: §6.1's `render.instances` concern unchanged; round 3's §6.1 change states the stamp-tile library's own key at its home (V-FIN-04) — a separate key from the per-entity instance stream this row names, so no disagreement; §8.10's layouts untouched |
| PIPELINE-318 | rule | §4.9 | OK | OK — target re-read: §4.2 S0's feature table byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-319 | rule | §4.9 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-320 | rule | §4.9 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-321 | acceptance | §4.9 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-322 | rule | referenced to §8.5; the `grove` tag / dramatic-forest options and the layer toggle kept at §4.… | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-323 | rule | §4.9 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-324 | rule | §4.10 — names drawn "in §6.3's cases" (CF-PIPE-05) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-325 | rule | referenced to §9.1 (RENDERING-330) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-326 | rule | referenced to §8.1 (section restatement) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-327 | mechanism | §4.11 | OK | OK — reference re-read: §16's M4 row ("… wall → ring road as `retypeEdges`; §4.11, D-25", l. 8648) byte-identical; round 3's one §16 change is M2b's exit |
| PIPELINE-328 | rule | §4.11 | OK | OK — target re-read: §4.2 S1 (5) byte-identical; §13.2's "an epoch whose growth builds a site" (l. 7705) lies in round 3's re-wrapped §13.2 lines (l. 7687–7711), words identical (word diff: the one substitution is V-FIN-02's) |
| PIPELINE-329 | rule | §4.11 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-330 | rule | §4.11 | OK | OK — reference re-read: §16's M4 row ("… wall → ring road as `retypeEdges`; §4.11, D-25", l. 8648) byte-identical; round 3's one §16 change is M2b's exit |
| PIPELINE-331 | test | §4.11 | OK | OK — target re-read: M4 (§16) — §16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit) |
| PIPELINE-332 | type | §4.11 | FIXED (P0-8) | FIXED (P0-8) — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-333 | rule | §4.11 | OK | OK — reference re-read: §16's M4 row ("… wall → ring road as `retypeEdges`; §4.11, D-25", l. 8648) byte-identical; round 3's one §16 change is M2b's exit |
| PIPELINE-334 | rule | §4.11 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-335 | rule | §4.11 | OK | OK — reference re-read: §16's M3a row ("the water operator in §4.11's order", l. 8646) byte-identical; round 3's one §16 change is M2b's exit |
| PIPELINE-336 | rule | §4.11 | OK | OK — reference re-read: F-REDERIVE's "(§4.11's rule)" for a kept way (l. 4023) byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) and lands on this kept-way rule |
| PIPELINE-337 | rule | §4.11 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-338 | rule | part-specific use kept at §4.11 "Other crossings" (the carve's wall-run rule, J-I13); the shar… | OK | OK — target re-read: §5.2's F-EDIT row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket); §7.4 untouched |
| PIPELINE-339 | rule | §4.11 | OK | OK — target re-read: the §16 M3a fixtures — §16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit); F-PLOT's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) |
| PIPELINE-340 | test | referenced to §13.1 (SCOPE-126) | OK | OK — target re-read: "The wall-crossing fixtures are §13.1's and §13.2's" lands on §13.2's B-EDIT canal-across-a-wall and river-move case (l. 7753–7754), outside round 3's re-wrapped lines, unchanged |
| PIPELINE-341 | mechanism | §4.11 batch (1) | OK | OK — reference re-read: F-REDERIVE's "a carve (§4.11 (1))" (l. 4023) byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) |
| PIPELINE-342 | mechanism | §4.11 batch (2) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-343 | mechanism | §4.11 batch (3) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-344 | rule | §4.11 batch (4) ("a carve costs its footprint, not the town" unioned from §3.3) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-345 | test | referenced to §13.2; the result stated once in §4.11 batch (4) with the fixture pointer | OK | OK — target re-read: §13.2's canal across the settlement perimeter, "0 district faces outside the perimeter" (l. 7708–7709), lies in round 3's re-wrapped §13.2 lines (l. 7687–7711), words identical (word diff: the one substitution is V-FIN-02's) |
| PIPELINE-346 | rule | referenced to §7.3 item 1; the carve's neighbour-step clause kept at §4.11 batch (4) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-347 | rule | §4.11 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-348 | decision | rationale → J-P30 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P30)" left at §4.11 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-349 | decision | rationale → J-P34 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P34)" left at §4.11 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-350 | decision | rationale → J-P43 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P43)" left at §4.11 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-351 | decision | rationale → J-P40 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P40)" left at §4.11 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-352 | rule | §4.11 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-353 | rule | §4.11 evolution hooks (user-applied by hand, ruined-building drawing, engine rule table unione… | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-354 | interface | §4.11 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-355 | rule | §4.11 | OK | OK — target re-read: M4 (§16) — §16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit) |
| PIPELINE-356 | interface | §4.12 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-357 | interface | §4.12 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-358 | interface | §4.12 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-359 | rule | §4.12 | OK | OK — target re-read: milestone 1 (§16 M1) — §16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit) |
| PIPELINE-360 | rule | §10 intro | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-361 | rule | §10.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-362 | rule | §10.1 | OK | OK — target re-read: "from M1" (§16) — §16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit) |
| PIPELINE-363 | rule | §10.1 | OK | OK — target re-read: "M4b, §16; never gating milestone 1" — §16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit) |
| PIPELINE-364 | rule | §10.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-365 | decision | rationale → J-9 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-9)" left at §10.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-366 | rule | §10.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-367 | decision | rationale → J-P21 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P21)" left at §10.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-368 | interface | §10.2 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-369 | mechanism | §10.2 | OK | OK — reference re-read: §6.1's ordinal-keyed roster draws "(§10.2)" (l. 4160–4162) byte-identical in round 3's §6.1 block and land on this sequential, prefix-stable roster |
| PIPELINE-370 | test | §10.2 | OK | OK — target re-read: §13.2's roster manifest property test on 1 000 seeds (l. 7685–7686) outside round 3's re-wrapped lines, unchanged |
| PIPELINE-371 | rule | §10.2 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-372 | rule | §10.2 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-373 | rule | §10.2 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-374 | rule | §10.2 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-375 | rule | §10.2 Output paragraph — the reconcile sentence points to §4.7 S10b and F-SITING (CF-PIPE-04) | OK | OK — target re-read: F-SITING's row byte-identical in round 3's §5.2 block (its one change is F-CONTOUR's bracket) (CF-PIPE-04) |
| PIPELINE-376 | rule | §10.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-377 | rule | §10.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-378 | rule | §10.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-379 | number | §10.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-380 | interface | §10.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-381 | rule | §10.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-382 | rule | §10.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-383 | mechanism | §10.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-384 | mechanism | §10.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-385 | mechanism | §10.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-386 | budget | referenced to §12.7 (RENDERING-578) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-387 | rule | §10.3 calendar ("logs no event" unioned from §11.3) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-388 | rule | §10.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-389 | interface | §10.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-390 | interface | §10.3 | OK | OK — target re-read: "from M1" (§16) — §16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit) |
| PIPELINE-391 | rule | referenced to §11.2 (RENDERING-450) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-392 | mechanism | §10.4 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-393 | rule | referenced to §6.3 (DETERMINISM-224) | OK | OK — target re-read: §6.1's naming concerns (`naming`, `naming.quarter`, `naming.emblem`) unchanged by round 3's §6.1 block; §6.3 untouched |
| PIPELINE-394 | rule | §10.4 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-395 | rule | §10.4 per-culture paragraph — the re-draw clause in NP5-3 (a)'s order, pointer to §7.6 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-396 | rule | referenced to §7.6; one clause kept at §10.4 in NP5-3 (a)'s order | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-397 | rule | referenced to §2.9 pack set bullet (MODEL-374) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-398 | interface | §10.4 | OK | OK — reference re-read: §16's "setting packs have their format (§10.4)" (l. 8704) byte-identical; round 3's one §16 change is M2b's exit |
| PIPELINE-399 | rule | §10.4 setting packs paragraph — retention is now a pointer to §2.9's pack-set rule (VD5-6, CF-… | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-400 | rule | referenced to §7.6; the pack patch form (`baseRowHash`, `baseVersion`, orphans) kept briefly a… | FIXED (P0-3) | FIXED (P0-3) — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-401 | rule | §10.4 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-402 | rule | PART II intro — `area` = the base's bent-cut fabric (CF-PIPE-07) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-403 | interface | II.1 | OK | OK — target re-read: "from milestone 1" (§16 M1) — §16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit) |
| PIPELINE-404 | interface | II.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-405 | interface | II.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-406 | interface | II.1 `NeighbourhoodRequest` (comment: `bent-cut` is NG's `area` template; CF-PIPE-07) | OK | OK — target re-read: §4.2 S1 (2)'s outline-template list byte-identical in round 3's replaced block; §6.1's lineage-keyed streams unchanged |
| PIPELINE-407 | interface | II.1 | OK | OK — target re-read: the `Pin` comment's "from M1" (§16) — §16 unchanged there (round 3's one §16 change adds the `lit`-export criterion to M2b's exit) |
| PIPELINE-408 | rule | II.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-409 | rule | II.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-410 | rule | II.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-411 | rule | II.1 (1) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-412 | rule | II.1 (2) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-413 | rule | II.1 (3) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-414 | rule | II.1 (3) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-415 | rule | II.1 (3) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-416 | test | referenced to §13.1 (SCOPE-142) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-417 | acceptance | II.1 rule (3) and II.5 — spelled "stage-2 feature S1" (CF-PIPE-08) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-418 | rule | II.1 rule (4) (its persistence clause now points to II.4) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-419 | rule | II.1 rule (5) (outline list is a pointer to §4.2 S1 (2)) | OK | OK — target re-read: §4.2 S1 (2)'s outline-template list and closed-outline routine byte-identical in round 3's replaced block |
| PIPELINE-420 | rule | II.1 (6) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-421 | decision | rationale → J-P33 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P33)" left at II.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-422 | decision | rationale → J-P37 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P37)" left at II.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-423 | decision | rationale → J-P38 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-P38)" left at II.1 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-424 | mechanism | II.2 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-425 | rule | II.2 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-426 | decision | rationale → J-S42 in docs/ARCHITECTURE-RATIONALE.md (index); "(J-S42)" left at II.2 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-427 | rule | II.2 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-428 | rule | II.2 — "the `area` template is the base's own bent-cut fabric … opened as a `refine` close-up"… | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-429 | rule | II.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-430 | rule | II.3 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-431 | budget | referenced to §8.2 / §8.6; the stage-2-tier additions (road programs, hood title, instanced ha… | OK | OK — target re-read: §9.5's title "placed in the emptiest corner" (l. 6577) unchanged; round 3's §9.5 change is the compass bullet only |
| PIPELINE-432 | rule | II.4 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-433 | rule | II.4 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-434 | rule | II.4 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-435 | rule | II.5 | OK | OK — target re-read: §6.1's per-district lineage streams, §12.6's per-district budget (a district of ≤ 450 buildings in ≤ 30 ms), §16's M1 and M5 and §4.2's outline templates all unchanged in substance by round 3 (§6.1: the stamp-tile entry; §12.6: the replay sentence; §16: M2b's exit) |
| PIPELINE-436 | acceptance | II.5 | OK | OK — target re-read: §16's M1 exit unchanged; §13.2's "every seam edge typed, a way-less shared reservation boundary typed `reserve` (II.5)" (l. 7711) lies in round 3's re-wrapped §13.2 lines (l. 7687–7711), words identical (word diff: the one substitution is V-FIN-02's) |
| PIPELINE-437 | acceptance | II.5 | OK | OK — target re-read: §12.6's per-district ≤ 30 ms and §16's M5 exit unchanged (round 3 changed §12.6's replay sentence and §16's M2b exit only) |
| PIPELINE-438 | rule | II.6 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-439 | rule | II.6 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-440 | rule | II.6 — "an outline template of §4.2 S1 (2)" (CF-PIPE-09) | OK | OK — target re-read: §4.2 S1 (2)'s outline-template list byte-identical in round 3's replaced block (CF-PIPE-09) |
| PIPELINE-441 | interface | II.6 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-442 | interface | II.6 | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-443 | rule | PART III | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-444 | rule | PART III | OK | OK — target re-read: §4.2's coast routine byte-identical in round 3's replaced §4.2 block (its one change is S1 (1)'s resolution parenthetical) |
| PIPELINE-445 | rule | PART III (1) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-446 | rule | PART III (2) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-447 | rule | PART III (3)-(4) | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| PIPELINE-448 | number | PART III (5) | OK | OK — target re-read: "the base's relief tier (§8.2), built at M2b (§16)" — M2b's row still lists the relief tier; round 3 only added the `lit`-export exit criterion |
| PIPELINE-449 | acceptance | PART III | OK | OK — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| CF-PIPE-01 | conflict | resolved at §4.1 "Why this order" (c) (§3 above) | RESOLVED | RESOLVED — re-checked: §4.2 S3 (12) byte-identical in round 3's replaced block; §4.1 (c) and §4.5 S7b (3) unchanged |
| CF-PIPE-02 | conflict | resolved: §4.1 points to §4.12 `StageDecl` | RESOLVED | RESOLVED — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| CF-PIPE-03 | conflict | resolved with NP5-1 at §4.1 S11 row | RESOLVED | RESOLVED — re-checked: §4.1's S11 row unchanged; §13.2's bent-party-wall-chain fixtures re-wrapped by round 3, words identical |
| CF-PIPE-04 | conflict | resolved at §4.7 S10b and §10.2 (pointers to F-SITING) | RESOLVED | RESOLVED — re-checked: F-SITING's row byte-identical in round 3's §5.2 block; §4.7 S10b and §10.2 unchanged |
| CF-PIPE-05 | conflict | resolved: "in §6.3's cases" | RESOLVED | RESOLVED — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| CF-PIPE-06 | conflict | resolved with VD5-6: pointers to §2.9 | RESOLVED | RESOLVED — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| CF-PIPE-07 | conflict | resolved with VS5-2: `area` = bent-cut | RESOLVED | RESOLVED — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| CF-PIPE-08 | conflict | resolved: "stage-2 feature S<n>" in text; two heading renames for the assembler | RESOLVED | RESOLVED — not touched by round 3; r2 verdict holds (verify-pipeline-r2.md §10) |
| CF-PIPE-09 | conflict | resolved: II.6 points to §4.2 S1 (2) | RESOLVED | RESOLVED — re-checked: §4.2 S1 (2)'s outline-template list byte-identical in round 3's replaced block; II.1 and II.6 still point to it |
| CF-PIPE-10 | conflict | resolved with NP5-2 (canon ruling, option 1) | RESOLVED | RESOLVED — re-checked: §4.2 S1 (5) byte-identical in round 3's replaced block; F-ROUTE's 'where' byte-identical in round 3's §5.2 block; §4.1's S5 row and §4.4 S5b unchanged |
