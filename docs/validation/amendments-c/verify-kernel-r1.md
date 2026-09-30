# verify-kernel-r1 — lane amendments-c/verify-kernel-r1 (verifier of the KERNEL part, §3, after repair round 1)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-kernel-r1).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> ITEM 39: planned §3.5 NG row (unchanged in r1) | done — PRESENT
> ITEM 45: planned §3.4 regularFit, §3.1 row (unchanged in r1) | done — PRESENT
> ITEM 53: planned §3.1 rows (§3.1 REPLACEd in r1) | done — PRESENT
> ITEM 65: planned §3.4, §3.7, §3.10 (REPLACEd in r1) and the r0 issues VKC-01/03/05/06/07 | done — PRESENT (was PARTIAL)
> R0 ISSUES VKC-01..20 re-checked | done — all 20 resolved
> CHECKS single-source, stale, cross-part, deferral, broken-reference, new-problem | done — 6 new issues, all minor (§4)
> QUEUE ROW + LANDED | done

Lane `amendments-c/verify-kernel-r1`, 2026-09-28. Status: COMPLETE. Verified on the design installed by assemble-r1,
`docs/ARCHITECTURE.md` sha256 `024c57dabc6b93c8…` (17 050 lines; §3 at lines 2449–3674), and rationale
`33b21ca8cdc15789…`. The before-text is `docs/archive/ARCHITECTURE-pre-amendments-c-repair-r1-2026-09-28.md`
(`7f4c0e25…`). This lane edited no design file.

## 1 Outcome

All four items routed to the kernel are now PRESENT. Item 65 moves from PARTIAL to PRESENT, because repair round 1
fixed its five defects (VKC-01, -03, -05, -06, -07). All twenty r0 issues are resolved, in the kernel and in the parts
that owned the other thirteen. A word diff of §3 against the pre-repair archive shows only the edits the repair report
claims: five REPLACE blocks (§3.1, §3.2, §3.4, §3.7, §3.10) with no stray change.

The repair's one departure is sound, and I concur with it. VKC-02 asked for two batches that strip the old chains. The
repair grows the frame by three single-level batches over one clear region instead (J-A81.31). Two-batch deletion would
join finer faces across the ring, because the levels are views of one arena (§2.2 rule 2). And a new rectangle inside
the old arena would cross finished finer faces. Both are CONFIRMED by reading §2.2 rules 2–3, §3.3 and §3.10. The
memory arithmetic is CONFIRMED by recomputation: 393.2 km² at 5 m is 15.73 M cells, or 62.9 MB. So are the 1.6-times
bound and the CITY→METROPOLIS example.

Six new issues, all **minor**: kernel 2, pipeline 2, model 1, scope 1. None blocks. They are pointer and bar
alignments that the new frame growth exposed (§4). There is no deferral wording, no unresolved J id (45 of 45 cited in
§3 have an index row and a Part A entry) and no reference identifier in §3. `doc_checks --sections "3"` exits 0: C1
5/0, C2 0/0, C3 96/0, C4 0/0, S1 0/0, S2 0/0.

## 2 Per item

| item | ruling routed here | verdict | where, quoted |
|---|---|---|---|
| 39 | §3.5 NG row | **PRESENT** (unchanged since r0) | §3.5: "the NG 1.2.2 build's silent rotated-frame retries and its hole-aware bisector's two logged loops … (NG RA-3; P7)" → "its first rung re-plans in a turned frame a bounded number of times, and no rung restarts anything above the face". §4.6 step 8 (c)'s `W_CUT_SLID` is now declared in §3.1's `Warning` union (VKC-04 fixed). |
| 45 | §3.4 `regularFit` beside `obb` / `lir`, `dmath` trigonometry (J-A45.31) | **PRESENT** (unchanged) | §3.4 `regularFit(ring: Ring): KernelResult<RegularFit>` and "The regular fit (item 45; J-A45.31)"; §3.1 row "best-fit regular polygon … **build** `regularFit`". §4.8 (1)–(2) now read "its area centroid — `regularFit`'s `centre` (§3.4)" (VKC-15 fixed). |
| 53 | §3.1 Poisson, marching-squares and path-search rows | **PRESENT** (§3.1 REPLACEd; rows byte-identical in the word diff) | Poisson: "each drawn in §8.10's candidate annulus (`poisson.annulus`) … on a torus … (P14; … its "warp" is the tile's wrap-around)"; path search: "… first-in-first-out searches with no heuristic — not reproduced; J-A53.31". |
| 65 | §3.4 / §3.10 one arena part per system, links as cross-arena records; §3.7 `corridorUnion` over galleries from the gallery record | **PRESENT** (was PARTIAL) | §3.4: "Every entity's faces, chains and vertices lie in the one part its `Identity.key` names (§2.8) … — with one exception, a link between two parts (II.7.6's `UndergroundLink`, §2.7), whose two `link_end` vertices lie one in each part it joins, each end naming its part (`{ part; at }`) …" and "… never one entity with faces or chains in two arenas"; the far ends: "… byte-identical (§3.10's arena-isolation row) but for the `link_end` vertices of the links that end on it: the connection stage (II.7.6) re-derives those links, placing, keeping or stripping each far end by one transaction on each part it touches …"; the example "a quarry's workings beneath a catacomb's galleries". §3.7: "another system's gallery's, `Gallery.widthCm ÷ 2 + Gallery.wallCm` (§2.7; their defaults from its system's row, II.7.6)", "from the half-width its `Gallery` record declares (the kerb above)", "carrying the structural `chamber_wall` role (§2.2 rule 7)", "the sewer network's part of the underground layer (part 0, §3.4)". §3.10: "(a link's two `link_end` ordinals each in the part its end names, §3.4)". J-A65.31 index row and Part A: "(a link's two ends excepted, one vertex in each part)"; Part A: "… beyond its links' far ends". J-A65.32 row and Part A read "from their `Gallery` records" and "their `Gallery` record". |

**The repair's wording extensions, each checked against the design (all sound).**
* "faces or chains" in place of "geometry" (VKC-01). Without it, §3.4 would contradict its own exception.
* "placing, keeping or stripping". II.7.6 (2) places new links and keeps surviving ones.
* "unless other geometry has met the vertex since". This matches §2.2 rule 3: dissolution needs a degree-2,
  split-flagged vertex with no role and no pin, and clearing (b) drops the flag on a move or a broken run.
* "that part's L1 faces" and "that part's built blocks" (VKC-06).

## 3 The r0 issues (verify-kernel-r0 §4) — all resolved

| r0 id | owner | now |
|---|---|---|
| VKC-01, -03, -05, -06, -07 | kernel | fixed in §3.4, §3.7, §3.10, J-A65.31, J-A65.32 (quoted in §2) |
| VKC-02 | kernel | fixed by the three-batch departure: §3.2 (9) "Frame growth at an epoch (item 81 (b); J-A81.31)" and the J-A81.31 row and Part A (§1) |
| VKC-04 | kernel | §3.1 `… \| 'W_DOWNGRADE' \| 'W_CUT_SLID'` plus its comment; §5.4's `kernel.warnings` list names it (VD0-22) |
| VKC-08 | pipeline | §4.11 *The rung at an epoch* now points to §3.2 (9)'s batches (J-A81.31) and states only the pipeline's part: S4's through-roads, S12a, the owners' re-derivation. J-A81.41's row and Part A are restated. One residual: VKC1-04. |
| VKC-09 | model | §2.2 `frame: Frame /* §3.2 (9): set at creation; replaced only by the frame growth … which only grows it */` |
| VKC-10 | pipeline | II.7.6: "each new record a fresh entity of the `buried` part, minted from the conversion event's `seq` …, the cleared records keeping their addresses on the ground"; J-A65.46 restated |
| VKC-11 | pipeline | II.7.6: "Inside one part every plan crossing is a junction (§3.4), so no rule lays an element across another of its part without meeting it …"; the J-A65.47 Part A clause |
| VKC-12 | model | §2.8 `Identity.key`: "save an `UndergroundLink`, whose two `link_end` vertices lie one in each part its ends name (§3.4), its address keyed on end `a`'s part" |
| VKC-13 | pipeline | J-A12.45 row and Part A: "(amended for systems by J-A65.31 …)" |
| VKC-14 | pipeline | §4.11: "the rekey moves the far part's role rows, knot rows and vertex role rows and no record (§3.4)" |
| VKC-15 | pipeline | §4.8 (1), (2): the area centroid, `regularFit`'s `centre` |
| VKC-16 | pipeline | II.7.5: "… but for the far `link_end` vertices of its links, which the connection stage re-derives by one transaction on each such part (§3.4)" |
| VKC-17 | determinism | §7.3 staged-layers row, both columns; §5.3's row also says "places, keeps or strips" |
| VKC-18 | rendering | §8.4: the systems list with "the undercity in the part of its void (II.7.5)"; "`z` ordering the bands across the underground layer's parts" |
| VKC-19 | scope | §13.2 T65-6: "each placed, kept or stripped by one transaction on its own part — a stripped one restoring the edge it split unless other geometry has met the vertex since (§3.4)" |
| VKC-20 | scope | §13.2 T81-1 aligned to the region (the kernel repair's note 3). VKC1-06 adds the raster clause. |

## 4 The checks, and the six new issues

* **SINGLE-SOURCE.**
  * The frame growth is stated once, at §3.2 (9). §4.11, J-A81.41, §2.2 `frame` and §13.2 T81-1 point to it and do
    not restate it; §4.11's raster clause keeps a looser gloss (VKC1-04).
  * The link exception is stated once, at §3.4. §2.2 rule 7, §2.8, §3.10, §5.3, §7.3, II.7.5, II.7.6 and T65-6
    reference it.
  * §3.3 is the home of the clear-region protocol. Its definition does not yet name the growth as a user (VKC1-03).
* **STALE.** None in §3. The task's stale-rule list does not occur in §3: the frame now scales and grows with the
  population, and the only licence text is the owner's (§3.1's skeleton row). Outside §3, "the underground arena"
  survives in the sewer's own sections (II.7.2, II.7.3, §13.1 bars), where it means part 0 correctly; I found none
  that contradicts §3.4.
* **CROSS-PART.** The notes addressed to the kernel this round:
  * The model repair's note on VKC-01, that J-A65.31 *may* name end `a`'s part as the link's key: optional, not
    taken. §3.4 and §2.8 agree without it, so this is not an issue.
  * The pipeline repair's note 5 (J-A81.31 must land): landed.
  * The scope repair's note 3 (above-cap dossiers refused at absorb): consistent with §3.2 (9)'s "taken at most at
    the cap, as §1.1 clamps a request", because §1.1 clamps only a request without a dossier.
  * The kernel repair's own note 1 (§4.11's "every old cell unchanged"): not applied (VKC1-04).
* **DEFERRAL-WORDING.** None in §3. "later" occurs only in its temporal sense.
* **BROKEN-REFERENCE.** J ids: 45 of 45 resolve (J-A81.31 included). Every section pointer in the new text resolves
  except §3.2 (9)'s "(II.7.3)", which names a subsection that says nothing about the outer ring (VKC1-01).
* **NEW-PROBLEM.** The growth's new underground clause, raster clause and region expose four small gaps: VKC1-02,
  VKC1-03, VKC1-05 and VKC1-06.

Anchors that wrap across a line break in the design, which a repairer matches across the newline:
* VKC1-01: "whose / outer ring";
* VKC1-02: "`UndergroundSystem` / record";
* VKC1-03: "S1's water operator / re-carving" and "the re-carved / reach)";
* VKC1-06: "re-parented where its parent was joined (§3.2 (9); / J-A81.31)".

Every anchor occurs once in the section named, and every other anchor occurs once in the whole document. The exception
is VKC1-06's "re-parented where its parent was joined", which also occurs in §3.2 (9); only §13.2's T81-1 occurrence
changes.

| id | owner | sev | kind | issue | required change |
|---|---|---|---|---|---|
| VKC1-01 | kernel | minor | broken-reference | §3.2 (9) reads "Every underground part whose outer ring is the frame with its margin (II.7.3) grows by (a) and (b)". II.7.3 says nothing about an outer ring. The sewer part's ring is stated in II.7.2 ("bounded by the arena's outer ring (the ground's frame plus its context margin, §3.2 (9))"), and every other part's ring in §2.2 rule 1. Because of the conditional, it is also unclear which parts grow. | Replace "Every underground part whose outer ring is the frame with its margin (II.7.3) grows by (a) and (b) on its own key" with "Every underground part — its outer ring the frame with its margin (the sewer's, II.7.2; every other part's, §2.2 rule 1) — grows by (a) and (b) on its own key". Apply together with VKC1-02. |
| VKC1-02 | model | minor | missing | §2.2 rule 1, *The underground layer's further parts*: "**L0** its rock face, bounded by the part's outer ring (the `margin` role on its `UndergroundSystem` record, §2.7, written by the system's stage before any gallery)". It never says what the ring is. §3.2 (9) grows a part only if its ring is the frame with its margin. The sewer's ring is (II.7.2), and II.7.6 lays the other systems on "the frame's rock", "the frame's stone cells" and "the frame's grid", so the frame-wide ring is the design's evident intent, but it is unstated. | Replace "bounded by the part's outer ring (the `margin` role on its `UndergroundSystem` record, §2.7, written by the system's stage before any gallery)" with "bounded by the part's outer ring — the ground's frame plus its context margin (§3.2 (9)), as the sewer's is (II.7.2), so every part grows with the frame — (the `margin` role on its `UndergroundSystem` record, §2.7, written by the system's stage before any gallery)". |
| VKC1-03 | kernel | minor | conflict | §3.3's *Clear regions and prepared contacts* names its users ("§4.11's carve of a canal, moat or basin, §4.4's outer moat, S1's water operator re-carving a reach (§7.3 (b))"). It defines the region as "the edit's **footprint**" (buffered chains ∪ the L1 cells the way rule touches). §3.2 (9)'s growth uses "§3.3's declared sequence of single-level batches sharing one clear region", but its region is different: whole L1 faces beside a lapsing stretch or under the new rectangle. §3.3 neither lists that user nor admits that region. | §3.3: replace "S1's water operator re-carving a reach (§7.3 (b)) — would under the plain rule" with "S1's water operator re-carving a reach (§7.3 (b)), an epoch's frame growth (§3.2 (9)) — would under the plain rule". Replace "(§4.11 for the carve and the outer moat; §7.3 (b) 2–4 for the re-carved reach)" with "(§4.11 for the carve and the outer moat; §7.3 (b) 2–4 for the re-carved reach; for the frame growth, the whole L1 faces §3.2 (9) names instead)". |
| VKC1-04 | pipeline | minor | conflict | §4.11 *The rung at an epoch* says "each raster growing by whole cells as §3.2 (9) states, every old cell unchanged". §3.2 (9) keeps every stored height, but it recomputes the `hydro` fields (flow direction, flat rank, accumulation) over the grown grid, because an old edge cell gains neighbours. So old `hydro` cells may change. The kernel repair's cross-part note 1 asked for this alignment. | Replace "each raster growing by whole cells as §3.2 (9) states, every old cell unchanged." with "each raster growing by whole cells as §3.2 (9) states, every stored height unchanged and the flow fields recomputed over the grown grid." |
| VKC1-05 | pipeline | minor | missing | §3.2 (9) grows every underground part whose ring is the frame by (a) and (b). Batch (a) clears the finer content of that part's L1 faces beside the old ring: part 0's outer tunnel bands' half-corridor strips on the ring side, the rock blocks, and the frontage plots there. Its "§4.11's stages … re-derive them" relies on §4.11 naming the re-derivers. §4.11 names the ground's owners only: "(the hinterland unit for the hinterland's, a district's S8–S12b for a district's)". | §4.11: replace "(the hinterland unit for the hinterland's, a district's S8–S12b for a district's)" with "(the hinterland unit for the hinterland's, a district's S8–S12b for a district's; on each underground part §3.2 (9) grows, that part's stages for its cleared faces — part 0's network stage its bands by `corridorUnion` (II.7.2) and II.7.3's stage its plots, each other system's stage its own part (II.7.6))". |
| VKC1-06 | scope | minor | partial | §13.2 T81-1 tests the growth's addresses and faces, but not its raster clause. §3.2 (9) promises "every old cell keeps its place and every stored height its value", with the `hydro` fields recomputed over the grown grid, and J-A81.31 records the choice. No bar proves it. | T81-1: after "re-parented where its parent was joined" insert ", every raster keeping its `cellCm` with every old cell in its place and every stored height unchanged, and the `hydro` fields equal to a fresh computation over the grown grid". |

## 5 Held parts (gate (a)) — so nothing is lost

No item routed to the kernel has a part marked HOLD — PLAUSIBLE:
* items 39, 45 and 53 are CONFIRMED by Fable's evidence gate;
* item 65 is an owner rule.

The pass's held parts are unchanged, and none touches §3 (assemble-r1 §8; grep on the installed design: no "visibly
differ", no "160 / 162"):
* **52**: the references' visibly different session-reached maps;
* **35 (support)**: the position check on 160 of 162 faces;
* **60 (support)**: the 16-cell hand-off support;
* **68 (g)**: "MFCG draws no cast shadows", which appears only as our preset's behaviour;
* **68 (support)**: VG 1.6.9's shadow and night-light layers, and Dwellings' shading and occlusion.

Released parts stand as applied: 37 (labelled), 58 (f) (labelled) and 59's timing. Item 49's deletion stays rejected.

## 6 Receipts

* §3 re-read whole, lines 2449–3674. Word diff against the pre-repair archive:
  `scratchpad/vk1-s3.wdiff` (65 runs, all of them the repair report's §2–§3 edits).
* Read whole, because they cite or are cited by the repaired text:
  * §2.2, rules 1–3 and 7, `Plat.frame` and `lattice`;
  * §2.3's rasters;
  * §2.7's underground records;
  * §2.8 `Identity.key`;
  * §1.1's rung table and the ends of the ladder;
  * §4.1's S1 and S3 batch rows;
  * §4.11 *The rung at an epoch*;
  * II.7.2's level paragraph, II.7.5's locality sentence and II.7.6 whole;
  * §5.3's staged rows, §7.3's staged row and §8.4's underground paragraph;
  * §13.2's T65-6 and T81-1;
  * §12.8's working-set line (METROPOLIS ≤ 260 MB);
  * J-A81.31, J-A81.41, J-A65.31, J-A65.32, J-A65.46, J-A65.47 and J-A12.45 (index rows and Part A).
* J ids cited in §3: 45, every one with an index row and a Part A entry. assemble-r1 reports the resolver at 2 broken,
  the baseline's two external citations.
* `python3 docs/validation/bench/doc_checks.py --sections "3" --allow docs/validation/doc-checks-allow.tsv` exits 0,
  with C1 5/0, C2 0/0, C3 96/0, C4 0/0, S1 0/0 and S2 0/0. The corpus is 9 626 JSON files and 916 788 3-grams. Output:
  `scratchpad/vk1-dc3.out`.

CONFIRMED versus PLAUSIBLE:
* CONFIRMED by reading the installed design:
  * every quoted text;
  * every PRESENT verdict;
  * every r0 resolution;
  * every statement that two texts disagree.
* CONFIRMED by recomputation: the three-batch arithmetic.
* PLAUSIBLE and vetoable: the exact wording of the six required changes and the design choices they imply,
  chiefly VKC1-02's frame-wide ring for every underground part and VKC1-05's list of re-derivers.
