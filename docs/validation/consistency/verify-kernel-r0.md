# Verify — consistency pass, round 0: the KERNEL part (§3 geometry kernel)

> Fable-reviewed 2026-09-26: CONFIRMED — docs/validation/consistency/validate.md

Lane `consistency/verify-kernel-r0`, 2026-09-26. Status: COMPLETE. Verifies `## §3 Geometry kernel` of the assembled
`docs/ARCHITECTURE.md` (l. 1526–2504) against the archive (`docs/archive/ARCHITECTURE-pre-consistency-2026-09-26.md`
§3, l. 2123–3352, read in full), `inventory-kernel.json` (386 items + 13 conflicts), `canon.json` (Part KERNEL, the 16
conflicts touching §3, SCOPE-C09, CANON-C02/C03, the three routed open items, the 41 other-part restatements of kernel
homes), the whole mapping table of `rewrite-kernel.md` (386 rows, none sampled) and the cross-part notes of the other five
rewrite reports. Scratch work: the session scratchpad (worksheet joining inventory, canon and mapping per id).

## 1. Outcome

§3 is sound. All 386 inventory ids are accounted for. 376 are OK at their mapped place (for a reference, the pointer
is present and the target states the fact). The other 10 carry one of nine issues. Four more issues concern §3 as a
whole or its neighbours: the tag style, the S1 reader, §5.4's warnings comment and §13.1's op name. That makes 13
issues in all, every one **minor**, none blocking. The three open
items VK5-1, VK5-2 and VK5-3 are **fixed** (VK5-3's bench re-run is byte-identical to the committed output). All 16 canon
conflicts touching §3 are resolved as the canon rules. No deferral wording, no round narration and no per-section review
marker remains in §3. The assembled §3 is byte-identical to the rewrite's section file (one trailing blank line apart).

Six issues are losses against the pass's "nothing lost" rule. Each one is a detail another part's restatement or the
archived §3 carried that no longer appears in the document:

* the outer-moat carve fixture;
* S9's per-district M0 bar;
* the engine id `plat-arrangement@<version>`;
* `resolve`'s debug-build version assertion;
* the anchor-key uniqueness guarantee;
* the stretch fixture's "every other role unchanged".

The other seven issues are:

* one receipt pointer broken by reordering;
* one unrecorded value change (the nightly run's pool sizes);
* one stale role list (`composition`);
* the tag-style mismatch with the other parts;
* the unconfirmed S1 `spine` reader;
* one broadened report comment (§5.4 warnings);
* one stale op name in §13.1.

**CONFIRMED vs PLAUSIBLE.** Presence and absence of every cited fact was checked by grep and by reading, which counts as
CONFIRMED. The VK5-3 bench re-run is CONFIRMED. The judgment that no other meaning shifted in the compressed prose is
PLAUSIBLE: it rests on one full reading of the old and new §3 side by side, with no second reader.

## 2. Issues (each with its owning part)

| id | sev | kind | owner | claim (evidence) | required change |
|---|---|---|---|---|---|
| VK-R0-1 | minor | lost | scope | The M3a carve fixture "an outer moat at S5a" (KERNEL-123) is gone: the archive stated it only in §3.3 rule 3 (l. 2399); §3.3 now points to "the carve fixtures of §13.1–§13.2", and neither §13.1 (l. 7542–7560), §13.2 nor §16's M3a row lists an outer moat. The canon's home SCOPE-125 never had it (its detail-gap heuristic is numeric only). | Add the archive's "an outer moat at S5a" to §13.1's carve fixtures, under the same bars the other carve fixtures carry (footprint byte identity, prepared contacts only, roles unique per ordinal, no contact name left). |
| VK-R0-2 | minor | lost | kernel | S9's M0 bar "one district ≤ 3 ms on reference hardware" (KERNEL-318; archive l. 3128) is stated nowhere. §3.7 still says M0 (ii) measures S9 "over the CITY face set **and per district**" against "the kernel rows of §12.4" (l. 2327), but §12.4's S9 row holds only the CITY 25 ms (l. 7209). The canon mapped KERNEL-318 to RENDERING-524, the S10–S11 row. Canon rule R8 keeps a bar that is stated only at its subject section, with its own measurement and fallback, at that section. | Restore "and one district ≤ 3 ms" in §3.7's M0 (ii). Alternatively, rendering adds it to §12.4's S9 row and §3.7 keeps the pointer (one place only). |
| VK-R0-3 | minor | lost | kernel | The engine id `plat-arrangement@<version>` is gone from the whole document. §3.7 says "the generation report names the engine that ran (§5.4)" (l. 2322), and §5.4's schema now says `engine: string /* the engine id, §3.7 */` (l. 4090), so the two pointers are circular. The archive stated the id in §3.7 (l. 3123) and in §5.4 (l. 5216). | State the id once in §3.7, as the archive did ("the arrangement engine, `plat-arrangement@<version>`"); §5.4 keeps its pointer. |
| VK-R0-4 | minor | conflict | kernel | Model note 2 (MODEL-093 → home KERNEL-204) is not reflected. The archive's "references … valid until the next commit (a debug build asserts the version)" (l. 767) was removed from §2.2 and pointed to §3.4, but `resolve`'s comment reads only "current slots, stamped with the arena version" (l. 1972). "Debug build asserts the version" now appears nowhere. | Change §3.4's `resolve` comment to "current slots, stamped with the arena version — valid until the next commit (a debug build asserts the version)". |
| VK-R0-5 | minor | conflict | kernel | Model note 2 (MODEL-126 → home KERNEL-118) is not reflected. The archive's §2.2 rule 7 (l. 883) stated that kernel allocation guarantees "no two vertices ever carry one anchor key and §3.10's one-vertex-per-ordinal check holds". §2.2 now defers the allocation to §3.3 rules 2–3, and §3.3 rule 2 (l. 1733–1736) does not state the guarantee. | Add to §3.3 rule 2: "so no two vertices carry one anchor key (§3.10's one-vertex-per-ordinal check)". |
| VK-R0-6 | minor | conflict | kernel | Model note 3 (NP5-1, model decision D7) is not reflected. §2.2 rule 7 now registers `composition` as an **indexed** vertex role (l. 580–584). §3.10's stored-reference row enumerates the indexed roles as "(attach, anchor, weld, deck end, gate end, gate opening)" (l. 2493), and §3.9's roles bullet lists the same set (l. 2434–2435), both without `composition`. The model's note claims §3.10 covers it; the list says otherwise. | Add `composition` to both lists, or replace both enumerations with "every role §2.2 rule 7's registry marks indexed". |
| VK-R0-7 | minor | broken-reference | kernel | Reordering pool step 1 broke a receipt. The step-(0) rebuild sentence citing `fixall_kernel_r3_bench.out` A now precedes the copy-size sentence, whose "(≈ 4.6 ms for three, measured, **same file A**)" (l. 1822–1823) therefore reads as r3_bench A. That section is the step-(0) rebuild, which has no copy timing. The copy timings are in `fixall_kernel_r4_bench.out` A (lines 10–14; §12.4's merge row cites that file). | Replace "same file A" by "`fixall_kernel_r4_bench.out` A". |
| VK-R0-8 | minor | conflict | kernel | Scope note 1 and determinism note 10 are not reflected. §3 keeps 67 fix-round tags (VK-n, VK2-n…VK5-n, VD2-n, VP2-n, NP3-n, NP4-n, NF-…, K4-1) and 41 audit tags. Determinism and scope dropped all fix-record tags; rendering dropped fix-round tags and kept audit ids. §3 is the only part that keeps fix-round history markers, against the pass's rule that history leaves the normative text. | Drop §3's fix-round tags and keep J-ids and receipts. Keep or drop the audit ids (GEO-, SCL-, DEF-, COV-, G-R/G-P, O-) by the one document-wide convention the validator or Fable picks. |
| VK-R0-9 | minor | changed | scope | The nightly cross-platform golden run's pool sizes changed without a record. The archived §3.2 (4) said "pool sizes 0–3" (l. 2236) and the archived §13.3 said "0 and 3" (l. 9636). The canon folded KERNEL-084 into SCOPE-240 without listing a conflict, and §3.2 (4) now points to §13.3 (l. 1614), so the kernel's statement silently became "0 and 3". §13.2's stage-contract tests keep 0–3 across engines (l. 7651–7652), and the kernel rewrite flagged this (its note 6). | Record the resolution (home §13.3 wins: nightly 0 and 3; full 0–3 in §13.2's contract tests). Optionally have §13.3 say that it samples 0 and 3 and that §13.2 covers 0–3. |
| VK-R0-10 | minor | lost | scope | The stretch fixture's assertion "and every other role unchanged" (KERNEL-228; archive l. 2755–2756) is absent from its home SCOPE-145 in §13.1, which keeps "the rest of each chain unchanged and every remaining profile sample within 10⁻⁹ cm" (l. 7564–7567). | Append the archive's "and every other role unchanged" to §13.1's stretch fixture. |
| VK-R0-11 | minor | conflict | pipeline | §3.8 now lists S1's coast-simplicity clamp as a `spine` reader whose M0-fallback downgrade is the sampled medial axis (l. 2371–2372, 2419–2422). This goes beyond the canon's KERNEL-C05 reader list, as a reconciliation that makes "the readers above are the only readers" true. §4.2 S1 says only "the base shape's medial axis, from its straight skeleton" (l. 2668–2670) and names no `skeleton` use or downgrade (kernel note 9, not answered by the pipeline rewrite). PLAUSIBLE intended. | Pipeline confirms in §4.2 S1 that the clamp reads `skeleton(rings, 'spine')` and takes §3.8's sampled-medial-axis downgrade (a pointer). Otherwise §3.8 drops S1 and names S1's own downgrade. |
| VK-R0-12 | minor | changed | determinism | §5.4's `kernel.warnings` comment now reads "per §3.1 warning code" (l. 4090). The archive listed the seven codes the report counts (W_ATTRACTED, W_STRETCH_SHARED, W_WEDGE_ROUTED, W_SNAP_PASSES, W_ACUTE_CORNER, W_SLIVER_RETYPED, W_HEIGHT_CLAMPED; l. 5216). The canon folded DETERMINISM-128 into KERNEL-062, whose home does not say which codes the report counts. The new wording reads as all eleven, and `W_DOWNGRADE` would then be counted beside `downgrades`. | State in §5.4 which codes the report counts: restore the seven, or deliberately "every §3.1 code except W_DOWNGRADE, which `downgrades` counts". |
| VK-R0-13 | minor | conflict | scope | §13.1's property "`insetFace` empties monotonically" (l. 7599) names an op that does not exist; §3.4's uniform inset is `insetRing` (l. 1980). This predates the pass (archive l. 9357) and is not in the canon. | Rename to `insetRing` in §13.1. |

## 3. Open items routed to this part

| item | verdict | evidence |
|---|---|---|
| VK5-1 | **FIXED** | §3.3 "No item changes in place" carries the required case verbatim (l. 1892–1903), including "a regroup leaves both partitions dirty, so the next freeze rebuilds both". The tombstone definition reads "moved to another level or partition" (l. 1921). §3.10's freshness row reads "deleted, re-levelled, changed or moved to another partition" (l. 2495). §3.9's chunk holds "the vertices that belong to it by §3.3's rebuild rule" (l. 2449). §2.9 now defers the layout to §3.9 (l. 1483). §13.1 carries the `drawBoundary` A→B fixture (l. 7582–7583). J-K34's index row names re-partitioned items. |
| VK5-2 | **FIXED** | `insertChain`'s `opts.pinned` is defined as decimation exemption that "does not set the kernel pinned flag, which only pinVertices sets" (l. 1945). §3.6 step 1 reads "unless its index is in `opts.pinned` or it is a knot" (l. 2060). `pinVertices` is "the only writer … released only as §2.2 rule 3 (b) states" (l. 1970). `CommitRecord.unflagged` names "a pin released by §2.2 rule 3 (b)" (l. 1665). §2.2 rule 3 (b) and the flags comment read "other than knot rows" (l. 344, 469). §13.1 carries the width-knot deck fixture (l. 7557–7558). |
| VK5-3 | **FIXED** | The §2.2 sentence reads "by construction for any number of later same-level vertices" (l. 490–491). `fixall_kernel_r5_checks.py` drops column (iii), with the reason stated in its header and in a printed line. **CONFIRMED (executed):** re-run in 15.5 s, output byte-identical to the committed `.out`. Table A keeps the 0.54–0.66 % refusals and table B the drifts 1.232 / 1.364 / 1.487 / 1.438 cm. |

## 4. Conflicts touching §3 (canon)

Every canon conflict touching §3 is resolved as the canon rules; each row was checked in the new text:

* **KERNEL-C01.** Stated once in §3.7 (l. 2307–2309, 2333–2342). §3.1's row says "shipped only under §3.7's fallback".
  The other halves were checked: §1.7 (l. 289), §17.4 (l. 8853), D-14 and §14 no longer say "never shipped".
* **KERNEL-C02.** `W_PLACED` is defined once, for both events (l. 2109–2111), and §3.1 points to it.
* **KERNEL-C03 and KERNEL-C04.** §3.6's chain classes (l. 2137–2144).
* **KERNEL-C05.** One reader list in §3.8, with each downgrade. S1 was added; see VK-R0-11.
* **KERNEL-C06 and KERNEL-C12.** Stated in §3.3 (l. 1872–1875, 1929–1933). §4.1 points to §3.3 (l. 2608), and J-K6's
  index row and rationale row are amended.
* **KERNEL-C07.** §3.2 (2) gives the value and the class pointer; `LatticeSpec` no longer says "soft".
* **KERNEL-C08.** §3.2 (2) and §3.10's closing line; §5.3's class-floor row agrees.
* **KERNEL-C09.** The §3.3 exception points to §3.6 (b).
* **KERNEL-C10.** The gable ridge lies on `ridgeAxis` (l. 2390–2393), which agrees with §2.6's `ridgeAxis` comment.
* **KERNEL-C11.** No `attract =` is left.
* **KERNEL-C13.** §3.1's Delaunay row; §17.4 agrees.
* **CANON-C04.** "§11.2's `E_ENGINE_UNAVAILABLE`"; §11.2 says "not a kernel result".
* **MODEL-C01.** §3.6 "The `split` flag under moves" (b) and (b′) with both consequences; §2.2 points to it.
* **MODEL-C02.** "The convex near-rectangle test" is named in §3.8 and cited by §2.6.
* **CANON-C02.** §2.1 points to §3.2 (5).
* **CANON-C03.** §3.2 (9) says "squares … at the default aspect". §12.2's header qualifies its "(2 × 2 km)" cells the same way.
* **SCOPE-C09.** No change, correctly.

Also checked, not raised:

* **Unions under canon rule R13.** KERNEL-020 (1.36 / 1.49 cm), -118 ("whose 0 and 1 name an open trace's ends"), -143
  (≈ 0.5 MB home column) and -320 (the Clipper2 stage list) are present.
* **E_SCOPE wording.** The comment and §3.10's pool-scope row now say "scope" instead of "face set". This is a
  within-part reconciliation toward the rule's home (pool step 3). It is correct, but it is not in the canon's list, so
  it should be recorded there for Fable.
* **Engine change.** §3.7's engine change now resolves to §6.5 (7)'s "output-version bump" instead of the archive's
  "generator-version bump". The home wins: the canon homes KERNEL-316 at DETERMINISM-289, and determinism note 1
  confirmed the contradiction.

## 5. Cross-part notes addressed to the kernel

| from | note | verdict |
|---|---|---|
| model 1 | Keep the drift figures and receipts in §3.6 / §3.10; keep the title "The `split` flag under moves" and MODEL-075's consequences | reflected (l. 2114–2120, 2232–2244) |
| model 2 | §3.3 names cited from §2.2 (No item changes in place; rules 1–3; pool steps 1 and 5; the same-level-split rule) | reflected, except two items: rule 2's "no two vertices carry one anchor key" → **VK-R0-5**, and §3.4's `resolve` "valid until the next commit (a debug build asserts the version)" → **VK-R0-4** |
| model 3 | The `composition` indexed role is serialised like the other rows; §3.10's check covers it | not reflected in either list → **VK-R0-6** |
| pipeline K-1 | KERNEL-150 → §4.5; -151 → §4.1; -236 → §4.6 step 8; -122 → §4.11 (4) | reflected; every target states the fact (margin band 2 m; hinterland unit; ladder with work limits; "a carve therefore costs its footprint, not the town") |
| determinism 1 | §3.7: "output-version bump"; carry the Clipper2 shift-record stage list "with cascade records downstream (§13.3)" | reflected by pointer to §6.5 (7) and by the stage list in §3.7. The cascade clause is judged already covered and not raised: every declared golden shift carries cascade records by §13.3's protocol (l. 4529, 7770), and §6.5 (10) cites §13.3 |
| determinism 10 / scope 1 | Tag style | valid, not reflected → **VK-R0-8** |
| rendering (kernel) | §3.7 points to §11.2 for `E_ENGINE_UNAVAILABLE`; §3.1's stamp-tile, instance and budget rows point to §8.10 / §12.7 | reflected. §3.1 points to §8.1 (2) and §8.10 and restates no budget; the ≤ 1 µs budget is at §12.7 |
| scope 5 | §3.2 (2) must keep D-19's values (minimum edge, attraction, plot width and angle) | reflected (l. 1597–1602) |
| scope (open items table) | VK5-1 and VK5-2 fixtures in §13.1 | present |

The kernel's own outgoing notes were also checked where §3 depends on them:

* Note 7 (§12.4's S9 per-district bar) was not taken up → VK-R0-2.
* Note 9 (S1) was not answered → VK-R0-11.
* Note 12 (§5.4 keeps `plat-arrangement@<version>`) was invalidated by the determinism rewrite → VK-R0-3.
* Note 5 (J-DET-36 has no row text for KERNEL-357) is kept as an observation for scope. The passage survives verbatim in
  rationale F.2, under a heading that still carries the instruction "append it to J-DET-36 or give it its own row".

## 6. Mechanical checks (executed)

* **Assembled text.** The assembled §3 differs from `new/kernel/01-geometry-kernel.md` only by one trailing blank line
  (`diff`).
* **Review markers.** Zero "PENDING FABLE REVIEW" lines in §3; the document holds exactly one banner (l. 3).
* **Deferral and narration.** No deferral wording and no round narration in §3. "Future" appears only in the pre-decided
  fallback for a failing `robust-predicates` upgrade.
* **References.** Every qualified reference in §3 resolves to a target that states it. The 97 distinct forms include
  II.1 (3), §13.7 O14 (e), §2.6 rule 4, §2.9 steps 2–3, §4.6 (8) and step 7, §4.7 S10 (0)/(4), §4.11 step 4 and
  batches (1)/(3), §5.2 F-PLOT/F-NUM, §6.5 (2)/(7)/(9)/(10), §7.3 (b) 2–4/3/8 and items 1/2, §8.1 (2)/(5) and §9.3. The
  48 qualified references from other parts into §3 also resolve, including "§3.3's same-level-split rule",
  "§3.6 (5)/(6)" and "§3.3 'No item changes in place'". The single exception is VK-R0-7.
* **J-ids.** All 31 cited in §3 exist in the judgment index, and every kernel rationale passage is in
  `docs/ARCHITECTURE-RATIONALE.md` F.2 §A. The history clauses KERNEL-063, -218, -366 and the history halves of -075,
  -080, -087, -092, -223, -261 and -338 are in F.2 §B.
* **Numeric presence.** An independent script checked every number of every kernel home item. The only misses are the
  history figures (1.34 %, the 1 024-term flush) and the ≤ 320 B bar, which is referenced to §2.9 and present there.
* **Other-part restatements.** All 41 restatements of kernel homes were compared with the new §3. Detail was lost only
  in MODEL-093 (VK-R0-4) and MODEL-126 (VK-R0-5), plus DETERMINISM-128's engine id and warning list (VK-R0-3,
  VK-R0-12). MODEL-051's "no lane or corridor meets it" survives as §5.3's NF-P5 invariant.
* **Observations, not raised.** §3 is at 75 % of its size against the pass's 55–65 % target (the rewrite gives its
  reason). §3.3's title still says "indexes rebuilt at stage end", which is true but incomplete. §2.2 rule 3 carries two
  "(b)" labels (split-flag clause and demotion step), both older than this pass.

## 7. Checked list — every inventory id

Verdicts: **OK** means the same meaning was found at the mapped place (for a reference, the pointer is present and the
target states the fact; for rationale and history, the passage is present in the rationale file). Otherwise the verdict
is an issue id from §2. Line numbers are in the new `docs/ARCHITECTURE.md`.

| id | kind | canon action | where now (mapping) | verdict | note |
|---|---|---|---|---|---|
| KERNEL-001 | rule | state | §3 intro (plain words) + §3.1 typed results | OK | §3 intro + §3.1 `KernelResult` |
| KERNEL-002 | rule | state | §3 intro; §3.3 intro paragraph | OK |  |
| KERNEL-003 | decision | state | §3.1 table, lattice row | OK |  |
| KERNEL-004 | rule | state | §3.2 (7) | OK | §3.2 (7) "in every build — not only in debug" |
| KERNEL-005 | number | state | §3.2 (2) value (name `attractCm`, KERNEL-C11) | OK | `attractCm = 26 cm` (KERNEL-C11) |
| KERNEL-006 | rule | state | §3.6 step 2 (merged with KERNEL-248) | OK | §3.6 step 2 incl. the endpoint rule |
| KERNEL-007 | rule | state | §3.6 step 3 (merged with KERNEL-251) | OK |  |
| KERNEL-008 | rule | state | §3.6 placement rule (merged with KERNEL-255) | OK |  |
| KERNEL-009 | mechanism | state | §3.6 step 4 (merged with KERNEL-252) | OK | §3.6 step 4 (≤ 3 passes, `W_SNAP_PASSES`) |
| KERNEL-010 | rule | state | §3.2 (2) last sentence (merged with KERNEL-080) | OK |  |
| KERNEL-011 | decision | state | §3.1 table, exact-predicates row (J-K36 tag) | OK | 3.0.3, Unlicense, registry, §17.4 checker, BigInt fallback |
| KERNEL-012 | rule | state | §3.2 (3) | OK |  |
| KERNEL-013 | rule | state | §3.1 table, exact-predicates row (merged with KERNEL-070) | OK | "never on the topology path" |
| KERNEL-014 | rule | state | §3.2 (6) (merged with KERNEL-088) | OK |  |
| KERNEL-015 | decision | state | §3.1 table, planar-subdivision row | OK | 385–561 k / 147–213 k (G-R7) |
| KERNEL-016 | defined-term | reference-section | referenced to §2.2 (section restatement; the §3.1 row names §2.2) | OK | §3.1 row "(§2.2)"; §2.2 `Plat`, `LevelFaces` (stage, parent, holes), role and owner tables |
| KERNEL-017 | rule | state | §3.3 intro paragraph | OK |  |
| KERNEL-018 | rule | state | §3.6 step 1 | OK |  |
| KERNEL-019 | rule | state | §3.6 slivers (merged with KERNEL-268) | OK | §3.6 slivers; structural edge never deleted |
| KERNEL-020 | rule | state | §3.10 placement-bound row (the invariant) + §3.6 paragraph after the placement rule (later d… | OK | §3.10 row + §3.6 drift para; union MODEL-067 (1.25 / 1.36 / 1.49 cm, r4 A, r5 B) |
| KERNEL-021 | rule | state | §3.3 kept content (merged with KERNEL-105) | OK |  |
| KERNEL-022 | rule | reference (§2.2 rule 3) | referenced to §2.2 rule 3 (promotion, MODEL-069); the kernel's attraction use stays in §3.6 … | OK | §3.6 points to §2.2 rule 3; Promotion para (l. 434–443) + "a coarser chain never shares a finer edge" (l. 457) |
| KERNEL-023 | rule | reference (§2.2 rule 3 demotion) | referenced to §2.2 rule 3 (demotion, MODEL-076); §3.4 removeEdges points there | OK | §3.4 `removeEdges` points; §2.2 rule 3 demotion (a)/(c) |
| KERNEL-024 | interface | reference (§2.2 types) | referenced to §2.2 rule 5 / types (MODEL-040); op semantics in §3.4 Stretches | OK | §3.4 Stretches "(§2.2 rule 5)"; `StretchRef` type l. 376 |
| KERNEL-025 | decision | state | §3.7 Decision (merged with KERNEL-300/301) | OK |  |
| KERNEL-026 | decision | state | §3.1 table, booleans row (licences) + §3.7 oracles (shipping status, KERNEL-C01) | OK | §3.1 row + §3.7 (KERNEL-C01) |
| KERNEL-027 | rule | state | §3.7 Decision (integer coordinates, fill rule per call, empty → E_DEGENERATE `empty`) + §3.7… | OK | §3.7 decision (integer I/O, fill rule, `empty`) + oracles split |
| KERNEL-028 | mechanism | state | §3.7 Decision (merged with KERNEL-302) | OK | §3.7 decision + kerb para; §3.4 `offsetFace` |
| KERNEL-029 | rule | state | §3.7 kerb paragraph (`insetRing`: convexity checked exactly, E_NON_CONVEX, collapsed → E_DEG… | OK | §3.7 kerb para (`insetRing`) |
| KERNEL-030 | decision | state | §3.8 numeric contract + convex near-rectangles (merged with KERNEL-329, 332–335) | OK | §3.8 numeric contract, validator, exact path |
| KERNEL-031 | rule | state | §3.8 readers and their downgrades (KERNEL-C05); spine definition referenced to §9.3 | OK | §3.8 readers (KERNEL-C05); spine = max-clearance spanning tree stated in §9.3 (l. 6487–6490); S1 addition → VK-R0-11 |
| KERNEL-032 | decision | state | §3.1 table, straight-skeleton row | OK | §3.1 skeleton row |
| KERNEL-033 | rule | state | §3.8 numeric contract (pre-clean, holes) + validator/downgrades (merged with KERNEL-342) | OK | §3.8 contract (5°, holes) + validator/downgrades; fixtures §13.1 |
| KERNEL-034 | decision | state | §3.1 table, OBB row | OK |  |
| KERNEL-035 | rule | state | §3.1 table, OBB row (GEO-7 contract) | OK |  |
| KERNEL-036 | decision | state | §3.1 table, Delaunay row (routing lattice removed, KERNEL-C13) | OK | "the routing lattice" removed (KERNEL-C13) |
| KERNEL-037 | decision | state | §3.1 table, Poisson row | OK |  |
| KERNEL-038 | mechanism | reference (§8.10) | referenced to §8.10 (RENDERING-284) | OK | §8.10 Tiles / One construction / shipped asset: r₀ = 400 cm, four tiles + band (creation index 4), `plat/tools/stamptiles/`, stored hash |
| KERNEL-039 | mechanism | reference (§8.1 (2) §8.1 item 2) | referenced to §8.1 (2), §8.10 (RENDERING-022) | OK | §8.1 (2) + §8.10 Stamp (s = spacing ÷ 400 cm; point-in-polygon) |
| KERNEL-040 | budget | reference (§12.7) | referenced to §12.7 (RENDERING-564) | OK | §12.7 Trees "placement ≤ 1 µs per instance"; §3.1 no longer mentions the budget (mapping names §12.7; §3.1 points to §8.1 (2)/§8.10) |
| KERNEL-041 | rule | state | §3.1 table, Poisson row | OK |  |
| KERNEL-042 | decision | state | §3.1 table, noise row | OK |  |
| KERNEL-043 | decision | state | §3.1 table, curves row | OK |  |
| KERNEL-044 | rule | state | §3.4 `pinVertices` comment (+ §3.6 held-vertices bullet names gates, junctions, portals) | OK | `pinVertices` comment + §3.6 held vertices (gates, junctions, portals) |
| KERNEL-045 | rule | state | §3.6 whole-step validation (merged with KERNEL-288) | OK | §3.6 whole-step validation |
| KERNEL-046 | rule | state | §3.4 `simplify` comment (merged with KERNEL-213) | OK | §3.4 `simplify` comment |
| KERNEL-047 | rule | state | §3.1 table, curves row | OK |  |
| KERNEL-048 | decision | state | §3.1 table, spatial-index row (decision) + §3.3 spatial indexes (partitions, KERNEL-C06) and… | OK | §3.1 row → §3.3 (KERNEL-C06, C12) |
| KERNEL-049 | rule | state | §3.3 pool step 1 (merged with KERNEL-137) | OK |  |
| KERNEL-050 | rule | state | §3.3 what each level's index holds (merged with KERNEL-158/161) | OK |  |
| KERNEL-051 | rule | state | §3.3 no item changes in place + tombstones and rebuilds (merged with KERNEL-162/166) | OK | VK4-5 + VK5-1 case |
| KERNEL-052 | rule | state | §3.3 pool step 1 + rebuild moment (3) (merged with KERNEL-138) | OK |  |
| KERNEL-053 | rule | state | §3.3 queries (merged with KERNEL-164) | OK |  |
| KERNEL-054 | decision | state | §3.1 table, marching-squares row | OK |  |
| KERNEL-055 | decision | state | §3.1 table, path-search row | OK |  |
| KERNEL-056 | decision | state | §3.1 table, triangulation row | OK |  |
| KERNEL-057 | decision | reference (§6.5 (2)) | referenced to §6.5 (2) (DETERMINISM-280); §3.1 dmath row keeps the build decision with (J-11) | OK | §3.1 → §6.5 (2) "the vetted fdlibm port (§3.1; D-23)"; fdlibm 5.3, Sun's notice, no `@stdlib` in D-23 (l. 9256) and §17.4 (l. 8852) |
| KERNEL-058 | rule | reference (§6.5 (2)) | referenced to §6.5 (2); the `ratio()` rule stays in §3.2 (8) | OK | §6.5 (2)–(3) (sqrt allowed; allowlist); `ratio()` stays §3.2 (8) |
| KERNEL-059 | decision | reference (§6.1) | referenced to §6.1 (DETERMINISM-135); §3.1 RNG row | OK | §6.1 Engine: xoshiro128**; 128-bit seed key (l. 4117) |
| KERNEL-060 | type | state | §3.1 `KernelResult` | OK |  |
| KERNEL-061 | type | state | §3.1 `KernelError` (E_BELOW_MIN_EDGE triggers point to §3.6, KERNEL-C03) | OK | 18 codes; E_BELOW_MIN_EDGE → §3.6 (C03); E_SCOPE "scope" (within-part reconciliation to pool step 3) |
| KERNEL-062 | type | state | §3.1 `Warning` (W_PLACED defined in §3.6, KERNEL-C02) | OK | 11 codes; W_PLACED → §3.6 (C02); see VK-R0-12 for §5.4's restatement |
| KERNEL-063 | history | drop-history | dropped from the normative text (history) → rewrite-kernel-rationale.md §B | OK | rationale F.2 §B |
| KERNEL-064 | decision | rationale | rationale J-11 → rewrite-kernel-rationale.md §A (tag (J-11) left in §3.1) | OK | rationale F.2 §A J-11; index row J-11 |
| KERNEL-065 | decision | rationale-new | rationale J-K36 (new row) → rewrite-kernel-rationale.md §A (tag left in §3.1) | OK | rationale F.2 §A J-K36; Part A row J-K36 (new); index row |
| KERNEL-066 | interface | state | §3.2 `Frame` interface | OK |  |
| KERNEL-067 | rule | state | §3.2 (1) | OK |  |
| KERNEL-068 | number | state | §3.2 (1) | OK | all figures (905 097 / 1 402 000 cm, 153.6 km², 6× / 9×) |
| KERNEL-069 | rule | state | §3.2 (1) | OK |  |
| KERNEL-070 | rule | state | §3.1 table, exact-predicates row (merged with KERNEL-013) | OK |  |
| KERNEL-071 | rule | state | §3.2 (2) | OK |  |
| KERNEL-072 | number | state | §3.2 (2) | OK |  |
| KERNEL-073 | number | state | §3.2 (2) (name `attractCm`, KERNEL-C11) | OK | "minEdge plus 1 cm of lattice slack"; 25.29 cm |
| KERNEL-074 | number | state | §3.6 existing geometry wins (merged with KERNEL-250/259) | OK | §3.6 "Existing geometry wins" (√2 · attractCm ≈ 36.8 cm) |
| KERNEL-075 | evidence | state | §3.6 existing geometry wins, measurement (merged with KERNEL-261); first-written-rule clause… | OK | §3.6 measurement; 1.34 % history → F.2 §B |
| KERNEL-076 | number | state | §3.2 (2) value only; its class stated in §3.10 (KERNEL-C07) | OK | 5° (500 cdeg) + class pointer §3.10 (KERNEL-C07) |
| KERNEL-077 | number | state | §3.2 (2) | OK | 2.5 m, 12°, p95 22.9°, minCorridor (SCOPE-C09 unchanged) |
| KERNEL-078 | rule | state | §3.2 (2) | OK |  |
| KERNEL-079 | rule | state | §3.2 (2) (KERNEL-C08 wording) | OK | KERNEL-C08 wording |
| KERNEL-080 | decision | state | §3.2 (2) last sentence; the 'former 5 cm weld' clause → rewrite-kernel-rationale.md §B | OK | "There is no weld tolerance"; 5 cm weld → F.2 §B |
| KERNEL-081 | rule | state | §3.2 (3) | OK |  |
| KERNEL-082 | rule | state | §3.2 (3) | OK |  |
| KERNEL-083 | rule | reference-section | referenced to §6.5 (section restatement); §3.2 (4) keeps the kernel's part | OK | §3.2 (4) "§6.5's policy"; §6.5 (1),(2),(5)–(7),(9); float01 `(u32 >>> 8) · 2⁻²⁴` in §6.1 (l. 4187) |
| KERNEL-084 | test | reference (§13.3) | referenced to §13.3 (SCOPE-240) | VK-R0-9 |  |
| KERNEL-085 | rule | state | §3.2 (5) | OK |  |
| KERNEL-086 | mechanism | state | §3.2 (6) | OK | flush 2⁵², terms < 2⁴⁸ / 2⁴³, twice-area < 2⁴⁹, `area2Big` |
| KERNEL-087 | evidence | state | §3.2 (6) receipt; the former-flush clause → rewrite-kernel-rationale.md §B | OK | receipt kept; former-flush clause → F.2 §B |
| KERNEL-088 | rule | state | §3.2 (6) | OK |  |
| KERNEL-089 | rule | state | §3.2 (7) | OK |  |
| KERNEL-090 | rule | reference (§2.3 Heights) | referenced to §2.3 (MODEL-168); pointer in §3.2 (7) | OK | §3.2 (7) "(… own check, §2.3.)"; §2.3 "clamps and reports" (l. 676) |
| KERNEL-091 | interface | state | §3.2 (8) | OK |  |
| KERNEL-092 | rule | state | §3.2 (9) (CANON-C03: 'squares at the default aspect') | OK | "squares of 2, 5 and 8 km at the default aspect" (CANON-C03) |
| KERNEL-093 | rule | state | §3.2 (9) | OK |  |
| KERNEL-094 | rule | reference (§2.2 rule 1) | referenced to §2.2 rule 1 (MODEL-046); pointer in §3.2 (9) | OK | "the margin and border chains of §2.2 rule 1"; §2.2 rule 1 l. 389–395 (L0 margin, L1 border, Terrain) |
| KERNEL-095 | decision | rationale | rationale J-K13 → rewrite-kernel-rationale.md §A (tag left in §3.2 (6)) | OK | rationale F.2 §A J-K13; index row |
| KERNEL-096 | interface | state | §3.3 `KernelTx` | OK |  |
| KERNEL-097 | rule | state | §3.3 `KernelTx.rederivesFrom` comment | OK | `rederivesFrom` comment |
| KERNEL-098 | rule | state | §3.3 `KernelTx.clearRegion` / `prepared` comments + clear regions | OK |  |
| KERNEL-099 | rule | state | §3.3 `KernelTx.workLimit` comment | OK |  |
| KERNEL-100 | type | state | §3.3 `BatchScope` | OK |  |
| KERNEL-101 | interface | state | §3.3 `CommitRecord` (unflagged: pin released by §2.2 rule 3 (b), VK5-2) | OK | `unflagged`: "a pin released by §2.2 rule 3 (b)" (VK5-2) |
| KERNEL-102 | mechanism | state | §3.3 intro paragraph | OK | §3.3 intro; dry-run commit → §5.3 |
| KERNEL-103 | rule | state | §3.3 one level per transaction | OK | "bounded" dropped before "Steiner vertices" — §2.2 rule 3 carries the bound |
| KERNEL-104 | rule | state | §3.3 one level per transaction | OK |  |
| KERNEL-105 | rule | state | §3.3 kept content (exception points to §3.6 candidate (b), 'ends on or joins', KERNEL-C09) | OK | exception → §3.6 (b) "ends on or joins" (KERNEL-C09) |
| KERNEL-106 | rule | state | §3.6 moves ('a move batch keeps nothing'; merged with KERNEL-276) + §3.6 after-step paragrap… | OK | §3.3 "a move keeps nothing (§3.6)" + §3.6 moves + after-step para |
| KERNEL-107 | rule | state | §3.3 kept content | OK |  |
| KERNEL-108 | rule | state | §3.3 kept content | OK | reasons by pointer (§4.7 S10 (0), §4.8, §4.9); §3.7 restates the band order |
| KERNEL-109 | acceptance-bar | reference (§13.2) | referenced to §13.2 (SCOPE-185) | OK | §13.2 "0 `E_KEPT` on the one-click path over B-CITY" (l. 7668) |
| KERNEL-110 | rule | reference (§7.1 dry run) | referenced to §7.1 dry run (DETERMINISM-377) | OK | §7.1 l. 4780–4783 (offered resolution) |
| KERNEL-111 | rule | reference (§7.3 (2)) | referenced to §7.3 item 2 (DETERMINISM-402) | OK | §7.3 item 2 "Shared-edge parts" (own side; other side never written) |
| KERNEL-112 | rule | state | §3.3 'a batch's faces are the faces it names or creates' | OK |  |
| KERNEL-113 | rule | state | §3.3 kept content | OK |  |
| KERNEL-114 | mechanism | state | §3.3 clear regions and prepared contacts | OK |  |
| KERNEL-115 | rule | state | §3.3 clear regions and prepared contacts | OK | "(§4.11 …; §7.3 (b) 2–4 …)"; (b) 3 and (b) 4 declare it (§7.3) |
| KERNEL-116 | rule | state | §3.3 clear-region rule 1 | OK |  |
| KERNEL-117 | rule | state | §3.3 clear-region rule 2 | OK |  |
| KERNEL-118 | rule | state | §3.3 clear-region rule 2 (union with MODEL-126: 0 and 1 of an enceinte name an open trace's … | VK-R0-5 | union MODEL-126 (0 and 1); MODEL-126's anchor-key guarantee missing → VK-R0-5 |
| KERNEL-119 | rule | state | §3.3 clear-region rule 2 | OK |  |
| KERNEL-120 | rule | state | §3.3 clear-region rule 2 | OK |  |
| KERNEL-121 | rule | state | §3.3 clear-region rule 3 (the promotion's effects stated once in §3.6 candidate (c)) | OK | promotion effects stated once in §3.6 candidate (c) |
| KERNEL-122 | rule | reference (§4.11 (4)) | referenced to §4.11 step 4 / §7.3 (b) 8 (PIPELINE-344); one pointer clause in rule 3 | OK | §4.11 step (4) + "A carve therefore costs its footprint, not the town" (l. 3860) |
| KERNEL-123 | test | reference (§13.1) | referenced to §13.1–§13.2 (SCOPE-125) | VK-R0-1 | home SCOPE-125 in §13.1 lacks the outer moat at S5a |
| KERNEL-124 | decision | state | §3.3 clear regions, pre-decided fallback | OK |  |
| KERNEL-125 | rule | state | §3.3 two op forms | OK |  |
| KERNEL-126 | rule | state | §3.3 two op forms | OK |  |
| KERNEL-127 | test | reference (§13.1) | referenced to §13.1 (SCOPE-156) | OK | §13.1 properties "any permutation of its ops" |
| KERNEL-128 | rule | state | §3.3 two op forms, callback | OK |  |
| KERNEL-129 | test | move-in | moved to §13.2 (scope MOVE IN); pointer '(the issue-order test: §13.2)' in §3.3 | OK | §13.2 stage contract tests (two runs, slot-renumbered, pool 0–3; no op permutation) |
| KERNEL-130 | rule | state | §3.3 no output depends on slot numbers | OK |  |
| KERNEL-131 | test | move-in | moved to §13.1 (scope MOVE IN); pointer in §3.3 | OK | §13.1 properties "renumbering the arena's slots" |
| KERNEL-132 | rule | state | §3.3 work limits instead of clocks | OK |  |
| KERNEL-133 | rule | state | §3.3 the commit record | OK |  |
| KERNEL-134 | budget | reference (§6.2) | referenced to §6.2 (DETERMINISM-199) | OK | §6.2 Bars (≤ 5 %, ≤ 5 ms); §12.4 assumptions |
| KERNEL-135 | rule | reference (§5.3) | referenced to §5.3 (DETERMINISM-082) | OK | §3.3 intro "see §5.3"; §5.3 l. 4030–4031 |
| KERNEL-136 | mechanism | state | §3.3 derivation pool intro | OK |  |
| KERNEL-137 | rule | state | §3.3 pool step 1 | OK |  |
| KERNEL-138 | rule | state | §3.3 pool step 1 | OK | "(none on the one-click path …)" kept in pool step 1 |
| KERNEL-139 | number | state | §3.3 pool step 1 + rebuild moment (2) | OK |  |
| KERNEL-140 | evidence | state | §3.3 pool step 1 | OK | ≈ 2 / 10 / 6 / 59 ms (r4 bench B) |
| KERNEL-141 | mechanism | state | §3.3 pool step 1 | OK |  |
| KERNEL-142 | rule | reference (§11.2) | referenced to §11.2 (RENDERING-457); 'No SharedArrayBuffer is used (§11.2)' | OK | "No SharedArrayBuffer is used (§11.2)"; §11.2 l. 6948–6949 (no cross-origin isolation) |
| KERNEL-143 | budget | state | §3.3 pool step 1, copy size (union with MODEL-136: ≈ 0.5 MB home column after edits) | VK-R0-7 | union MODEL-136 (≈ 0.5 MB); receipt "same file A" now misread |
| KERNEL-144 | decision | state | §3.3 pool step 1 | OK |  |
| KERNEL-145 | budget | state | §3.3 pool step 1 | OK | ≈ 9 000 items, ≈ 26 partitions, 2.3 / 5.8 ms (r3 bench A) |
| KERNEL-146 | rule | state | §3.3 pool step 2 | OK |  |
| KERNEL-147 | rule | state | §3.3 pool step 2 | OK |  |
| KERNEL-148 | rule | state | §3.3 pool step 3 | OK |  |
| KERNEL-149 | rule | state | §3.3 pool step 3 | OK |  |
| KERNEL-150 | number | reference (§4.5) | referenced to §4.5 (PIPELINE-195); pool step 3 names the margin band | OK | "margin band (§4.5)"; §4.5 states 2 m per side, unbuildable L3 part, backland / headland |
| KERNEL-151 | rule | reference (§4.1) | referenced to §4.1 / §4.9 (PIPELINE-046); pool step 3 names the hinterland unit | OK | "(§4.1, §4.9)"; §4.1 "its faces are the hinterland's L2 blocks, disjoint from every district's" |
| KERNEL-152 | rule | state | §3.3 pool step 3 | OK |  |
| KERNEL-153 | mechanism | state | §3.3 pool step 4 | OK |  |
| KERNEL-154 | budget | state | §3.3 pool step 4 | OK |  |
| KERNEL-155 | rule | state | §3.3 pool step 5 | OK |  |
| KERNEL-156 | decision | state | §3.3 spatial indexes | OK | per district + one outside (KERNEL-C06) |
| KERNEL-157 | number | state | §3.3 spatial indexes | OK | 25 / 10 / 5 m |
| KERNEL-158 | rule | state | §3.3 what each level's index holds | OK |  |
| KERNEL-159 | rule | state | §3.3 what each level's index holds | OK | "(§3.6's placement bound; J-K32)" for the old "(§2.2 rule 3; J-K32)" |
| KERNEL-160 | evidence | state | §3.3 what each level's index holds | OK |  |
| KERNEL-161 | rule | state | §3.3 what each level's index holds | OK |  |
| KERNEL-162 | rule | state | §3.3 no item changes in place (VK5-1 case added) | OK | VK5-1 case added |
| KERNEL-163 | mechanism | state | §3.3 queries | OK |  |
| KERNEL-164 | rule | state | §3.3 queries | OK |  |
| KERNEL-165 | evidence | state | §3.3 queries | OK |  |
| KERNEL-166 | defined-term | state | §3.3 tombstones and rebuilds ('or partition', VK5-1) | OK | "moved to another level or partition" (VK5-1) |
| KERNEL-167 | rule | state | §3.3 tombstones and rebuilds | OK |  |
| KERNEL-168 | number | state | §3.3 tombstones and rebuilds (2 B/slot, ≈ 0.5 MB) + pool step 1 (≈ 0.2 MB at the one-click f… | OK | 2 B/slot; ≈ 0.5 MB; ≈ 0.2 MB in pool step 1 |
| KERNEL-169 | decision | rationale | rationale J-K34 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K34 first clause |
| KERNEL-170 | rule | state | §3.3 tombstones and rebuilds ('three moments', KERNEL-C12) | OK | three moments (KERNEL-C12) |
| KERNEL-171 | evidence | state | §3.3 tombstones and rebuilds (evidence) | OK | 0.24 / 2.3 / 4.9 ms; ≈ 7 ms; 1.9 s / 13.4 s |
| KERNEL-172 | budget | state | §3.3 tombstones and rebuilds (the 5 ms budget referenced to §12.6) | OK | "§12.6's plot-edit budget"; §12.6 "≤ 5 ms of model work" |
| KERNEL-173 | test | reference (§13.2) | referenced to §13.2 (SCOPE-168) | OK | §13.2 "Index work is fitted against commits × level size (§3.3)"; the fail condition is stated at §3.3 |
| KERNEL-174 | rule | state | §3.3 the commit record (commit granularity) | OK |  |
| KERNEL-175 | budget | reference (§12.4) | referenced to §12.4 (RENDERING-519); §3.7 no-WASM-kernel names the measurement | OK | §12.4 S5 row "≤ 8 µs per insertion … (the first M0 measurement)"; §16 M0 exit |
| KERNEL-176 | decision | rationale | rationale J-K6 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K6; Part A row amended (C06, C12) |
| KERNEL-177 | decision | rationale | rationale J-K14 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K14 |
| KERNEL-178 | decision | rationale | rationale J-K24 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K24 |
| KERNEL-179 | decision | rationale | rationale J-K15 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K15 |
| KERNEL-180 | decision | rationale | rationale J-K16 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K16 |
| KERNEL-181 | decision | rationale | rationale J-K25 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K25 |
| KERNEL-182 | decision | rationale | rationale J-K33 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K33 |
| KERNEL-183 | decision | rationale | rationale J-K34 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K34 |
| KERNEL-184 | rule | state | §3.4 code header | OK |  |
| KERNEL-185 | interface | state | §3.4 `insertChain` (opts.pinned defined, VK5-2) | OK | `opts.pinned` defined (VK5-2) |
| KERNEL-186 | interface | state | §3.4 `ChainInsert` | OK |  |
| KERNEL-187 | interface | state | §3.4 `splitThrough` (anchor-ordinal allocation stated once in §3.3 rule 2) | OK | ordinal allocation → §3.3 rule 2 |
| KERNEL-188 | interface | state | §3.4 `removeEdges` | OK | dissolution conditions by pointer; §2.2 rule 3 "Dissolution" states them (l. 445–447) |
| KERNEL-189 | interface | state | §3.4 `clearFiner` | OK | "subject to kept content and … clear-region rule 1 (§3.3)" |
| KERNEL-190 | interface | state | §3.4 `retypeEdges` | OK |  |
| KERNEL-191 | interface | state | §3.4 `setOwner` | OK |  |
| KERNEL-192 | interface | state | §3.4 `splitFace` | OK |  |
| KERNEL-193 | interface | state | §3.4 `connectHole` | OK |  |
| KERNEL-194 | interface | state | §3.4 `mergeFaces` | OK |  |
| KERNEL-195 | interface | state | §3.4 `absorbSliver` | OK |  |
| KERNEL-196 | interface | state | §3.4 `claimSubFace` | OK |  |
| KERNEL-197 | interface | state | §3.4 `radialSplit` | OK |  |
| KERNEL-198 | interface | state | §3.4 `ringBand` | OK |  |
| KERNEL-199 | interface | state | §3.4 `corridorUnion` | OK | "the corridor use of bandUnion" |
| KERNEL-200 | interface | state | §3.4 `bandUnion` | OK |  |
| KERNEL-201 | interface | state | §3.4 `warp` | OK | "semantics §3.6" |
| KERNEL-202 | interface | state | §3.4 `pinVertices` (release referenced to §2.2 rule 3 (b); only writer of the flag, VK5-2) | OK | VK5-2: only writer; release → §2.2 rule 3 (b) "other than knot rows" |
| KERNEL-203 | rule | state | §3.4 services header | OK |  |
| KERNEL-204 | interface | state | §3.4 `resolve` | VK-R0-4 | MODEL-093's "valid until the next commit (a debug build asserts the version)" not carried |
| KERNEL-205 | interface | state | §3.4 `resolveVertexAt` | OK |  |
| KERNEL-206 | interface | state | §3.4 `signature` | OK |  |
| KERNEL-207 | interface | state | §3.4 `sampleProfile` | OK |  |
| KERNEL-208 | interface | state | §3.4 `kerb` (definition in §3.7) | OK | "§3.7's kerb" |
| KERNEL-209 | interface | state | §3.4 `booleans` | OK |  |
| KERNEL-210 | interface | state | §3.4 `buffer` | OK |  |
| KERNEL-211 | interface | state | §3.4 `offsetFace`, `insetRing` | OK | `insetRing` (§3.7); §13.1 still says `insetFace` → VK-R0-13 |
| KERNEL-212 | interface | state | §3.4 `skeleton` (readers listed in §3.8, KERNEL-C05) | OK | readers in §3.8 (KERNEL-C05) |
| KERNEL-213 | interface | state | §3.4 `simplify` | OK | merged with KERNEL-046 |
| KERNEL-214 | interface | state | §3.4 `hexLattice` (KERNEL-C13) | OK | KERNEL-C13 |
| KERNEL-215 | interface | state | §3.4 geometry services | OK |  |
| KERNEL-216 | rule | state | §3.4 doors paragraph | OK |  |
| KERNEL-217 | rule | state | §3.4 doors paragraph | OK |  |
| KERNEL-218 | history | drop-history | dropped (history) → rewrite-kernel-rationale.md §B; 'corridorUnion is the corridor use of ba… | OK | F.2 §B; "corridor use of bandUnion" kept in the comment; `refine` is §2.2 rule 6's pure function (not a kernel op; §3.4 is the complete list) |
| KERNEL-219 | rule | state | §3.4 second paragraph | OK |  |
| KERNEL-220 | rule | state | §3.4 second paragraph | OK |  |
| KERNEL-221 | rule | state | §3.4 second paragraph | OK |  |
| KERNEL-222 | rule | state | §3.4 second paragraph | OK |  |
| KERNEL-223 | rule | state | §3.4 second paragraph; the 'former ordinalOffset' clause → rewrite-kernel-rationale.md §B | OK | ordinalOffset clause → F.2 §B |
| KERNEL-224 | rule | reference (§2.2 rule 5 Stretches) | referenced to §2.2 rule 5 Stretches (MODEL-095); §3.4 Stretches keeps the op semantics | OK | "(§2.2 rule 5)"; §2.2 rule 5 Stretches lists the users and the ring direction (l. 518–526) |
| KERNEL-225 | rule | state | §3.4 Stretches | OK |  |
| KERNEL-226 | rule | state | §3.4 Stretches | OK |  |
| KERNEL-227 | rule | state | §3.4 Stretches | OK | "(… given without an ordinal, §3.3 rule 2)" |
| KERNEL-228 | test | reference (§13.1) | referenced to §13.1 (SCOPE-145) | VK-R0-10 | home SCOPE-145 lacks "every other role unchanged" |
| KERNEL-229 | rule | state | §3.5 table (answers now point to their homes) | OK | §3.5 row (§3.6, §3.10) |
| KERNEL-230 | rule | state | §3.5 table (answers now point to their homes) | OK | §3.5 row (§3.6, §4.6) |
| KERNEL-231 | rule | state | §3.5 table (answers now point to their homes) | OK | §3.5 row "one OBB contract (§3.1)" |
| KERNEL-232 | rule | state | §3.5 table (answers now point to their homes) | OK | §3.5 row "attractCm (26 cm)" |
| KERNEL-233 | rule | reference (§2.2 rule 5) | referenced to §2.2 rule 5 (MODEL-091); §3.5 row points there | OK | §3.5 row "(§2.2 rule 5)"; §2.2 rule 5 l. 502–517 (role and owner tables, nothing goes stale) |
| KERNEL-234 | rule | state | §3.5 table (answers now point to their homes) | OK |  |
| KERNEL-235 | rule | state | §3.5 table (answers now point to their homes) | OK |  |
| KERNEL-236 | rule | reference (§4.6 (8)) | referenced to §4.6 (8) (PIPELINE-241); §3.5 row points there | OK | §3.5 row "(§4.6 (8))"; §4.6 step 8 ladder (a)–(d) "each rung under an operation-count work limit" |
| KERNEL-237 | rule | state | §3.5 table (answers now point to their homes) | OK |  |
| KERNEL-238 | rule | state | §3.5 table (answers now point to their homes) | OK | kerb formula stated once in §3.7 |
| KERNEL-239 | rule | state | §3.5 table (answers now point to their homes) | OK | "convex near-rectangles" |
| KERNEL-240 | rule | state | §3.5 table (answers now point to their homes) | OK |  |
| KERNEL-241 | rule | state | §3.5 table (answers now point to their homes) | OK |  |
| KERNEL-242 | rule | state | §3.6 attraction (candidates (a)–(c); KERNEL-C09 canonical) | OK | candidates (a)–(c); (c) examples at §3.3 rule 2 |
| KERNEL-243 | rule | state | §3.3 clear-region rule 3 (deck span) + §3.6 attraction ('never shares a finer edge') | OK | §3.3 rule 3 (deck span) + §3.6 "never shares a finer edge (§3.3 rule 2)" |
| KERNEL-244 | rule | state | §3.6 attraction (promotion effects) | OK |  |
| KERNEL-245 | rule | state | §3.3 kept content / clear-region rule 3 (E_KEPT / E_LEVEL); §3.6 attraction points there | OK | §3.6 "returns E_KEPT or E_LEVEL (§3.3)"; which one: §3.3 rule 3 |
| KERNEL-246 | rule | state | §3.6 attraction (run by run) | OK |  |
| KERNEL-247 | algorithm-step | state | §3.6 step 1 ('its index is in opts.pinned', VK5-2) | OK | "unless its index is in `opts.pinned` or it is a knot" (VK5-2) |
| KERNEL-248 | algorithm-step | state | §3.6 step 2 | OK |  |
| KERNEL-249 | test | state | §3.6 step 2 (worked example; the fixture is §13.1's) | OK | worked example kept; fixture in §13.1 |
| KERNEL-250 | number | state | §3.6 existing geometry wins | OK |  |
| KERNEL-251 | algorithm-step | state | §3.6 step 3 | OK |  |
| KERNEL-252 | algorithm-step | state | §3.6 step 4 | OK |  |
| KERNEL-253 | rule | state | §3.6 step 4 (second E_BELOW_MIN_EDGE trigger, KERNEL-C03) | OK | second E_BELOW_MIN_EDGE trigger (KERNEL-C03) |
| KERNEL-254 | algorithm-step | state | §3.6 step 5 | OK |  |
| KERNEL-255 | rule | state | §3.6 placement rule | OK |  |
| KERNEL-256 | rule | state | §3.6 placement rule | OK |  |
| KERNEL-257 | evidence | state | §3.6 placement rule | OK |  |
| KERNEL-258 | rule | state | §3.6 placement rule (W_PLACED defined for both events, KERNEL-C02) | OK | W_PLACED both events (KERNEL-C02) |
| KERNEL-259 | rule | state | §3.6 existing geometry wins | OK |  |
| KERNEL-260 | rule | state | §3.6 existing geometry wins | OK |  |
| KERNEL-261 | evidence | state | §3.6 existing geometry wins (evidence); history clauses → rewrite-kernel-rationale.md §B | OK | measurements kept; history → F.2 §B |
| KERNEL-262 | test | reference (§13.1) | referenced to §13.1 (SCOPE-124) | OK | §13.1: all ten constructive fixtures present |
| KERNEL-263 | rule | state | §3.6 chain classes (no precision error left; §3.1's non-precision codes, KERNEL-C04) | OK | "no precision error is left, only §3.1's non-precision codes" (KERNEL-C04) |
| KERNEL-264 | rule | state | §3.6 chain classes (both E_BELOW_MIN_EDGE triggers, KERNEL-C03) | OK | both E_BELOW_MIN_EDGE triggers (KERNEL-C03) |
| KERNEL-265 | rule | state | §3.10 clearance row (definition) + §3.6 clearance (how it is maintained) | OK | definition §3.10 row; maintenance §3.6 Clearance |
| KERNEL-266 | rule | state | §3.6 clearance | OK |  |
| KERNEL-267 | rule | state | §3.6 roles on shared stretches, and slivers | OK |  |
| KERNEL-268 | rule | state | §3.6 roles on shared stretches, and slivers | OK |  |
| KERNEL-269 | rule | state | §3.6 splitFace contact semantics, preamble and 1 | OK |  |
| KERNEL-270 | rule | state | §3.6 splitFace 2 | OK |  |
| KERNEL-271 | rule | state | §3.6 splitFace 3 | OK |  |
| KERNEL-272 | rule | state | §3.6 splitFace 4 | OK |  |
| KERNEL-273 | rule | state | §3.6 splitFace 5 | OK |  |
| KERNEL-274 | rule | state | §3.6 splitFace 6 | OK |  |
| KERNEL-275 | rule | state | §3.6 moves | OK |  |
| KERNEL-276 | rule | state | §3.6 moves | OK |  |
| KERNEL-277 | rule | state | §3.6 held vertices | OK |  |
| KERNEL-278 | rule | state | §3.6 held vertices | OK |  |
| KERNEL-279 | rule | state | §3.6 held vertices | OK |  |
| KERNEL-280 | rule | state | §3.6 slides | OK |  |
| KERNEL-281 | number | reference (§7.1) | referenced to §7.1 (DETERMINISM-316: default fromLevel); §3.6 slides points there | OK | "§7.1's default fromLevel"; §7.1 warp event "1 by default" (l. 4631) |
| KERNEL-282 | test | move-in | moved to §13.1 (scope MOVE IN); pointer '(fixture: §13.1)' in §3.6 slides | OK | §13.1 attraction and moves (l. 7531–7532) |
| KERNEL-283 | rule | state | §3.6 re-seats | OK |  |
| KERNEL-284 | evidence | state | §3.6 re-seats | OK |  |
| KERNEL-285 | rule | state | §3.6 order within a step | OK |  |
| KERNEL-286 | evidence | state | §3.6 order within a step | OK |  |
| KERNEL-287 | rule | state | §3.6 the split flag under moves (rule-3 (b)/(b′) wording, MODEL-C01) | OK | rule-3 (b)/(b′) wording + consequences (MODEL-C01) |
| KERNEL-288 | rule | state | §3.6 whole-step validation | OK | wing-carrying rule's definition by pointer to §2.6 (rule 4) |
| KERNEL-289 | number | state | §3.6 whole-step validation | OK | ≤ 8 halvings |
| KERNEL-290 | rule | state | §3.6 whole-step validation | OK |  |
| KERNEL-291 | rule | state | §3.6 after-step paragraph | OK |  |
| KERNEL-292 | rule | state | §3.6 after-step paragraph (moveVertex: §3.4) | OK |  |
| KERNEL-293 | decision | rationale | rationale J-K2 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K2 |
| KERNEL-294 | decision | rationale | rationale J-K17 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K17 |
| KERNEL-295 | decision | rationale | rationale J-K18 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K18 |
| KERNEL-296 | decision | rationale | rationale J-K26 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K26 |
| KERNEL-297 | decision | rationale | rationale J-K30 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K30 |
| KERNEL-298 | decision | rationale | rationale J-K27 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K27 |
| KERNEL-299 | decision | rationale | rationale J-K35 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K35 |
| KERNEL-300 | decision | state | §3.7 decision | OK |  |
| KERNEL-301 | algorithm-step | state | §3.7 decision | OK |  |
| KERNEL-302 | mechanism | state | §3.7 decision | OK |  |
| KERNEL-303 | rule | state | §3.7 the kerb, defined once | OK |  |
| KERNEL-304 | rule | state | §3.7 the kerb, defined once | OK |  |
| KERNEL-305 | rule | state | §3.7 the kerb, defined once | OK |  |
| KERNEL-306 | rule | state | §3.7 the kerb, defined once | OK |  |
| KERNEL-307 | test | reference (§13.2) | referenced to §13.2 (SCOPE-178); '(tested, §13.2)' | OK | §13.2 "S8's working block equals S9's committed block (Hausdorff 0; §3.7)" |
| KERNEL-308 | rule | state | §3.7 the kerb, defined once | OK |  |
| KERNEL-309 | rule | state | §3.7 the kerb, defined once | OK |  |
| KERNEL-310 | rule | state | §3.7 the kerb, defined once | OK |  |
| KERNEL-311 | rule | state | §3.7 the kerb, defined once | OK |  |
| KERNEL-312 | decision | state | §3.7 oracles (never shipped unless the M0 speed fallback fires, KERNEL-C01) | OK | "unless the M0 speed fallback below fires" (KERNEL-C01) |
| KERNEL-313 | acceptance-bar | state | §3.7 oracles | OK |  |
| KERNEL-314 | acceptance-bar | state | §3.7 oracles | OK |  |
| KERNEL-315 | acceptance-bar | reference (§13.1) | referenced to §13.1 (SCOPE-155) | OK | §13.1 "reporting both shares per operation and drawing ≥ 10⁵ unattracted cases per operation" |
| KERNEL-316 | rule | reference (§6.5 (7)) | referenced to §5.4 (engine name) and §6.5 (7) (DETERMINISM-289) | VK-R0-3 | §6.5 (7) states the version bump; the engine id `plat-arrangement@<version>` is gone (§5.4 → §3.7 → §5.4) |
| KERNEL-317 | acceptance-bar | state | §3.7 confirmation at M0, criterion (i) | OK |  |
| KERNEL-318 | budget | reference (§12.4) | referenced to §12.4 (RENDERING-524); §3.7 names what M0 (ii) measures | VK-R0-2 | §12.4 S9 row has the CITY 25 ms only; "one district ≤ 3 ms" stated nowhere; S11 3 / 25 µs in §12.4 |
| KERNEL-319 | defined-term | state | §3.7 confirmation at M0 (S11's geometry share defined) | OK | definition kept; 5 / 40, 3 / 25, 2 / 15 µs in §12.4's S10–S11 row (l. 7213) |
| KERNEL-320 | decision | state | §3.7 pre-decided fallback (KERNEL-C01; host error referenced to §11.2, CANON-C04; stage list… | OK | KERNEL-C01; CANON-C04 (§11.2); stage list from DETERMINISM-303 |
| KERNEL-321 | decision | state | §3.7 no WASM kernel | OK |  |
| KERNEL-322 | budget | reference (§12.4) | referenced to §12.4 (RENDERING-519); §3.7 names the measured loops | OK | §12.4 S5 row ≤ 8 µs; S8 row ≈ 12 µs per cut |
| KERNEL-323 | rule | state | §3.7 what a miss triggers | OK |  |
| KERNEL-324 | rule | reference (§6.5 (10)) | referenced to §6.5 (10) (DETERMINISM-302); §3.7 keeps 'the TypeScript loop stays in every bu… | OK | §6.5 (10) (accelerator byte-identical); §16 M0 exit "≤ 8 µs per proposal, or §3.7's …" |
| KERNEL-325 | decision | rationale | rationale J-K4 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K4 |
| KERNEL-326 | decision | rationale | rationale J-K8 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K8 |
| KERNEL-327 | decision | rationale | rationale J-K19 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K19 |
| KERNEL-328 | decision | rationale | rationale J-K20 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K20 |
| KERNEL-329 | decision | state | §3.8 decision | OK | reason at §3.1 skeleton row; §3.8 "built in-house (§3.1)" |
| KERNEL-330 | rule | state | §3.8 decision | OK | "a roof, a label or one stage's partition" (KERNEL-C05) |
| KERNEL-331 | rule | state | §3.8 decision + readers (KERNEL-C05) | OK | `regions` reader, downgrade = reflex pre-cut partition (§4.7, §5.2 F-PLOT) |
| KERNEL-332 | rule | state | §3.8 numeric contract | OK |  |
| KERNEL-333 | rule | state | §3.8 numeric contract | OK |  |
| KERNEL-334 | number | state | §3.8 numeric contract | OK |  |
| KERNEL-335 | rule | state | §3.8 convex near-rectangles (the named 'convex near-rectangle test', MODEL-C02 canonical) | OK | "the convex near-rectangle test" (MODEL-C02); "from the OBB in the OBB's own frame" dropped for C10's quad ridge |
| KERNEL-336 | evidence | state | §3.8 convex near-rectangles (the named 'convex near-rectangle test', MODEL-C02 canonical) | OK |  |
| KERNEL-337 | rule | state | §3.8 convex near-rectangles (gable ridge on the ridgeAxis line, KERNEL-C10) | OK | gable ridge on `ridgeAxis` line (KERNEL-C10) |
| KERNEL-338 | test | state | §3.8 convex near-rectangles (notch example); the old-test clause → rewrite-kernel-rationale.… | OK | notch example kept; old-test clause → F.2 §B |
| KERNEL-339 | rule | state | §3.8 convex near-rectangles (KERNEL-C10) | OK | quad gable = stored ridge via `ridgeAxis` (KERNEL-C10) |
| KERNEL-340 | rule | state | §3.8 readers (KERNEL-C05) | OK | reader list (KERNEL-C05); S1 added → VK-R0-11 |
| KERNEL-341 | rule | state | §3.8 post-condition validator | OK |  |
| KERNEL-342 | rule | state | §3.8 post-condition validator | OK |  |
| KERNEL-343 | test | move-in | moved to §13.1 (scope MOVE IN); '§13.1's skeleton fixtures' in §3.8 | OK | §13.1 straight-skeleton fixtures (all seven kinds + corpus) |
| KERNEL-344 | acceptance-bar | state | §3.8 confirmation at M0 | OK |  |
| KERNEL-345 | decision | state | §3.8 pre-decided fallback (each reader's downgrade, KERNEL-C05) | OK | each reader's downgrade named (KERNEL-C05); S1 → VK-R0-11 |
| KERNEL-346 | decision | rationale | rationale J-K5 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K5 |
| KERNEL-347 | decision | rationale | rationale J-K21 → rewrite-kernel-rationale.md §A | OK | rationale F.2 §A J-K21 |
| KERNEL-348 | rule | state | §3.9 block | OK |  |
| KERNEL-349 | interface | state | §3.9 block | OK |  |
| KERNEL-350 | interface | state | §3.9 block | OK |  |
| KERNEL-351 | interface | state | §3.9 block | VK-R0-6 | role list lacks `composition` (model D7 / NP5-1) |
| KERNEL-352 | interface | state | §3.9 block | OK |  |
| KERNEL-353 | rule | state | §3.9 chunks ('the vertices that belong to it by §3.3's rebuild rule', VK5-1) | OK | "the vertices that belong to it by §3.3's rebuild rule" (VK5-1) |
| KERNEL-354 | rule | state | §3.9 chunks | OK |  |
| KERNEL-355 | algorithm-step | state | §3.9 chunks | OK |  |
| KERNEL-356 | rule | state | §3.9 chunks | OK | + "(an item whose partition changes, §3.3, rewrites both chunks)" (VK5-1 consequence) |
| KERNEL-357 | decision | rationale | rationale → rewrite-kernel-rationale.md §A (for J-DET-36; the rule itself stays in §3.9) | OK | rationale F.2 "J-DET-36 — addition"; Part A J-DET-36 row lacks it (scope observation) |
| KERNEL-358 | decision | reference (§2.9 Size budget) | referenced to §2.9 (MODEL-422) | OK | "§2.9's block-group fallback"; §2.9 size fallback (200 m cell) |
| KERNEL-359 | algorithm-step | state | §3.9 load | OK |  |
| KERNEL-360 | rule | reference (§2.9 load step 3) | referenced to §2.9 steps 2–3 (MODEL-387); '§3.9: no per-level digest is stored' | OK | "(§2.9 steps 2–3)"; §2.9 step 3 (root vs `model.digest`, own output version), step 2 (frozen view unchecked) |
| KERNEL-361 | decision | state | §3.9 load (pre-decided fallback) | OK |  |
| KERNEL-362 | rule | reference (§2.2 rule 5) | referenced to §2.2 rule 5 (MODEL-091) | OK | "Entities carry no slots (§2.2 rule 5)"; §2.2 rule 5 names the wing-ring / composition exception |
| KERNEL-363 | test | move-in | moved to §13.1 (scope MOVE IN); pointer in §3.9 load | OK | §13.1 properties "save → load → save byte-identical …" |
| KERNEL-364 | rule | reference (§11.1) | referenced to §11.1 (RENDERING-404) | OK | "(§11.1)"; §11.1 compact twin row (CBOR, typed-array tags) |
| KERNEL-365 | number | state | §3.9 block (column sizes; the 320 B bar referenced to §2.9) | OK | 0.45 MB kept; ≤ 320 B in §2.9 Size budget |
| KERNEL-366 | history | drop-history | dropped (history) → rewrite-kernel-rationale.md §B | OK | rationale F.2 §B |
| KERNEL-367 | invariant | state | §3.10 table | OK |  |
| KERNEL-368 | invariant | state | §3.10 table | OK |  |
| KERNEL-369 | invariant | state | §3.10 table | OK |  |
| KERNEL-370 | invariant | state | §3.10 table | OK |  |
| KERNEL-371 | invariant | state | §3.10 table | OK |  |
| KERNEL-372 | invariant | state | §3.10 table | OK |  |
| KERNEL-373 | invariant | state | §3.10 table | OK | later-change clause by pointer to §3.6 |
| KERNEL-374 | invariant | state | §3.10 table | OK |  |
| KERNEL-375 | invariant | state | §3.10 table | OK |  |
| KERNEL-376 | invariant | state | §3.10 table | OK |  |
| KERNEL-377 | invariant | state | §3.10 table | OK |  |
| KERNEL-378 | invariant | state | §3.10 table | OK |  |
| KERNEL-379 | invariant | state | §3.10 table | VK-R0-6 | indexed-role list lacks `composition` |
| KERNEL-380 | invariant | state | §3.10 table | OK |  |
| KERNEL-381 | invariant | state | §3.10 table, freshness row ('or moved to another partition', VK5-1) | OK | "… or moved to another partition" (VK5-1) |
| KERNEL-382 | invariant | state | §3.10 table, pool-scope row ('scope', aligned with pool step 3) | OK | "scope" (aligned with pool step 3) |
| KERNEL-383 | invariant | state | §3.10 table (canonical class of minFaceAngle, KERNEL-C07) | OK | canonical class (KERNEL-C07) |
| KERNEL-384 | invariant | state | §3.10 table | OK |  |
| KERNEL-385 | rule | state | §3.10 closing paragraph | OK |  |
| KERNEL-386 | rule | state | §3.10 closing paragraph → §3.2 (2) (KERNEL-C08) | OK | → §3.2 (2) (KERNEL-C08) |
