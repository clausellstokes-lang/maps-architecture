# Fix-all round 4 — integration log (lane fixall/integrate-r4)
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/integrate-r4 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

**In plain words.** After round 3, the five checkers accepted every round-3 fix but one half-item and listed 39 new
things the rewrite had broken or exposed; the kernel and scope areas found three more while fixing them — 43 items. The
five area architects fixed theirs in drafts; this seat merged the five drafts into `docs/ARCHITECTURE.md`, made every
change one area asked another to make, and settled four places where the drafts did not fit together. The biggest: when a
moved river crosses a town wall or a district edge, it now names those points exactly as a dug canal does (the kernel's
naming, over the determinism draft's), and the map's outer edge is drawn with the land and water while the printed frame
line is drawn with the first streets (the pipeline's levels, which the kernel text now follows). A smaller one this seat
found itself: the new "unused bridge site" state had to be carried through the moved-river edit, or a moved river would
have lost the unused crossing places a regenerated river keeps and left old ones standing on dry land. Result: all 43 items FIXED, none INVALID, none staged, none deferred; the per-item
record is `docs/ARCHITECTURE-VALIDATION.md` §R4.

Status: COMPLETE (2026-09-26).

## 1. Method

1. **Blocks (step 1).** Every `=== REPLACE` / `=== INSERT AFTER` block of `r4-{kernel,determinism,pipeline,rendering,scope}.md`
   (55 blocks: 51 whole-section replacements, 3 row-level replacements, 1 row insertion) was applied to
   `docs/ARCHITECTURE.md` by a script (`r4i/apply_blocks.py` in the session scratchpad) that matched each block's heading
   exactly (asserted unique) and replaced the section's own lines up to the next heading, area by area in the order
   kernel → determinism → pipeline → rendering → scope, dry-run first on a copy, logging after each area (§2). The
   pre-integration file (9 546 lines, md5 `a8c2de844218f98444f1479ffb2b292a`, the same file every draft was built from) is
   kept in the scratchpad as `r4i/ARCHITECTURE.pre-r4.md`. No two drafts replaced the same section. Each block's banner
   became `> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r4); drafted by fixall/draft-<area>-r4; …`.
   Blocks went in before requests, because a request aimed at another area's section would otherwise be overwritten by
   that area's block. Before any block was applied, every block was word-diffed against the section it replaces
   (`r4i/diffblocks.py`) and every diff read, which is how the conflicts of §4 were found.
2. **Cross-area requests (step 2).** All 83 request rows were read against the integrated text and each receiving
   draft's record of what it folded; §3 gives each row's fate. Every applied edit is section-scoped, whitespace-tolerant
   and asserted to match exactly once (scripts `p1_kernel.py` … `p6_judgments.py`); the chain was dry-run on a copy and
   the real file compared byte for byte with the dry run after each step.
3. **Coherence (step 3).** Beyond the requests, the integrated text was checked for places the drafts could not see in
   one another: the four conflicts (§4); stale wording outside the replaced sections (§10.4's pack paragraph against
   VD3-3's pack set; §11.1's GeoJSON row against NP3-4's sites; `slot hint`, `Enceinte.ditch`, `Recipe.packs`, `per
   session` stamp tiles, `TileBackend.raster`, `(class, spacing)` — each grepped, the live ones fixed); §12.4 re-summed
   from its rows (255 ms). Scripted checks: every cited judgment id has a row (244 of 244) and every cited decision id
   (35 of 35); every `§n.m` and `II.n` pointer resolves (the only non-matching one is the external
   `proposal-product.md` §16.2); chapter numbering contiguous (0.1–0.10, 1.1–1.7, …, 17.1–17.4, II.1–II.6); a
   deferral-language scan of the 2 561 added or changed lines (45 hits, every one ordinary sequence such as "a later
   edit", a statement that nothing is deferred, or an owner-staged subject: "the later sewer rules", "the evolution engine
   (much later)", D-6's "setting packs later"). The paragraphs this seat's edits had joined into one long line were
   re-wrapped at 120 columns (`p9_rewrap.py`; 49 paragraphs; the document's words are identical before and after).
4. **Document checks (step 4).** `python3 docs/validation/bench/doc_checks.py --sections "<the 71 changed section keys>"`,
   the check §17.1 (2) binds every seat that writes the document to (§5).
5. **Validation record (step 5).** §R4 of `docs/ARCHITECTURE-VALIDATION.md` was written from the five drafts' disposition
   tables, with the items the conflict resolutions reshaped (VK3-2, VK3-8, VD3-5, NP3-4, VS3-1) written to the integrated
   text: 43 of 43 ids, each once (checked by script).

## 2. Progress by area (step 1 — blocks)

| area | blocks applied | architecture lines after the area |
|---|---|---|
| kernel | 7 REPLACE (§2.2, §3.1, §3.3, §3.4, §3.6, §3.9, §3.10) | 9 787 |
| determinism | 10 REPLACE (§2.8, §2.9, §5.3, §6.1, §6.2, §6.3, §6.4, §7.3, §7.4, §7.6) | 9 994 |
| pipeline | 13 REPLACE (§2.5, §2.6, §2.7, §4.1–§4.8, §4.11, II.1) | 10 222 |
| rendering | 12 REPLACE (§8.1, §8.3, §8.9, §8.10, §9.1, §9.2, §11.1, §12.1, §12.3, §12.7, §12.8, §12.9) | 10 442 |
| scope | 9 REPLACE (the one-page summary, §1.1, §13.1, §13.2, §13.6, §14, §15.1, §16, §17.1); 3 row-level REPLACE (the judgment-call preamble, J-S32, J-I14); 1 INSERT (J-S33–J-S38 after J-S32) | 10 592 |
| after steps 2–4 | requests, conflicts, coherence edits, summary, §0.10, staged list, banners, paragraph re-wrap | 10 723 |

## 3. Cross-area requests (step 2)

Every request row of the five drafts' request sections was read against the integrated text and the receiving draft's
own record of what it folded. A row is *absorbed* when the receiving block already carries it (phrase-checked by script,
53 phrases, 0 missing: `r4i/folded_check.py`), *applied* when this seat edited the text (scripts `p1_kernel.py`,
`p2_det.py`, `p3_pipe.py`, `p4_rend.py`, `p5_scope.py`, `p6_judgments.py` in the session scratchpad; every edit is
section-scoped, whitespace-tolerant and asserted to match exactly once; the whole chain was dry-run on a copy and the
real file then compared byte for byte with the dry run), *amended* when a conflict resolution (§4) changed what was
applied, and *superseded* when a resolution replaced it.

| from → to | rows | absorbed by the receiving draft | applied at integration | amended or superseded (conflict) |
|---|---|---|---|---|
| kernel → pipeline (X-P1–X-P5) | 5 | X-P1 (§2.7 `Gate.banks`, §4.4), X-P2 (§4.11 batches (1)–(3)), X-P3 (§4.1, §4.11), X-P4 (II.1 (3), §4.6 step 7), X-P5 (both contracts met by the pipeline's VK3-8 fix; the rule-1 edit it offered is pipeline X-K1 (b)) | — | X-P5 is C-2's adopted form |
| kernel → determinism (X-D1–X-D7) | 7 | — | X-D1 (§7.3 (b) 3), X-D2 (§7.3 (b) 4, merged with the determinism draft's own demotion clause), X-D3 (§7.4 *Application* and the warp row), X-D4 (§6.2), X-D5 (§2.9 chunks), X-D6 (§2.9 step 3, merged with VD3-5's sentence), X-D7 (§7.4 table) | X-D1 amended by C-1 (entity wording) and C-2 (the `border` line only) |
| kernel → rendering (X-R1, X-R2) | 2 | X-R1 (c) (§12.3 p50 column), X-R2 (§12.8) | X-R1 (a), (b) (§12.4 merge row 13 ms, critical path 255 ms, METROPOLIS 609 ms, the round-4 note) | — |
| kernel → scope (X-S1–X-S3) | 3 | X-S1 (§13.1), X-S3 (§13.2) | X-S2 (J-K28–J-K33 added; J-K11, J-K16, J-K25, J-K26, J-I11, J-I13 amended) | X-S2's J-I13 amended by pipeline X-K1 (f) (C-2) |
| determinism → kernel (KR4-1–KR4-4) | 4 | KR4-3 (the kernel's VK3-3 demotion and VK3-9 `StretchRef` blocks) | KR4-1 (§3.9: the load's recomputation, the lazy-partition fallback), KR4-4 (§3.3 pointer "(b) 2 … (b) 3 and (b) 4 both declare it") | KR4-2 superseded by C-1 (the kernel's `gate_end` and contact names) |
| determinism → pipeline (PR4-1–PR4-5) | 5 | PR4-2 (§2.6), PR4-3 (§4.11; §7.3 (b) aligned through pipeline X-D4), PR4-4 (§4.2 S1 (5); §5.2 through pipeline X-D5), PR4-5 (§4.1) | PR4-1 (a)–(c) (§10.4), with the same paragraph's pack-set wording aligned to VD3-3 (coherence, §5) | — |
| determinism → rendering (RR4-1–RR4-4) | 4 | RR4-4 (§12.8, folded by the rendering draft) | RR4-1 (§9.6), RR4-2 (§11.3 roles, convergence, M3a test), RR4-3 (§12.6) | RR4-4 amended by scope R-1 (C-3: M2a) |
| determinism → scope (SR4-1–SR4-5) | 5 | SR4-1 (§13.2), SR4-2 (§16, with J-S37's two timing corrections), SR4-3 (§14 `rebase(…, at?)`), SR4-5 (the one-page summary) | SR4-4 (J-DET-23, J-DET-35, J-DET-37–J-DET-39 restated; J-DET-40–J-DET-43 added) | SR4-4's J-I14 replaced by the scope draft's merged row (C-3) |
| pipeline → kernel (X-K1–X-K6) | 6 | — | X-K1 (a)–(e) (§2.2 rules 1 and 7, §3.2 (9), §3.3 rules 2–3 and pool step 3) and (f) (J-I13), X-K2 (§2.2 rule 5, §3.9), X-K3 (`ChainInsert` defined in §3.4), X-K4 (`warp`'s `recordCheck`, §3.6 whole-step validation), X-K5 (§3.3 footprint and confirmation list), X-K6 (§2.2 rule 7, sites and added decks) | X-K1 is C-2's adopted form |
| pipeline → determinism (X-D1–X-D8) | 8 | — | X-D1 (§7.4 warp paragraph, replacing the determinism draft's folded summary), X-D2 (§7.3 items 1 and 7 (ii)), X-D3 (§5.3 wing row), X-D4 (§7.3 (b) 2, (iii), (b) 3, (b) 7), X-D5 (§5.2 F-ROUTE, F-WALL), X-D6 (§5.3 gate and bridge rows), X-D7 (§7.4 "draw bridges"), X-D8 (§7.3 (b) 9, as its own clause) | X-D4 and X-D8 extended by C-4 (sites in the water operator) |
| pipeline → rendering (X-R1, X-R2) | 2 | — | X-R1 (§8.2), X-R2 (§8.6) | — |
| pipeline → scope (X-S1–X-S5) | 5 | X-S1, X-S2, X-S3 (§13.1, §13.2, §16), X-S5 (§14) | X-S4 (J-P34, J-P35 restated; J-P41–J-P46 added) | — |
| rendering → kernel (K1) | 1 | — | K1 (§3.1 Poisson row) | — |
| rendering → determinism (D1, D2) | 2 | — | D1 (§6.1 registry entry), D2 (§6.1 decoration bullet) | — |
| rendering → pipeline (P1–P3) | 3 | P1, P2 (§4.1, folded by the pipeline draft) | P3 (§4.10) | — |
| rendering → scope (S1–S15) | 15 | S1, S2, S3, S15 (§14), S4, S5 (§13.2), S10 (§15.1), S11 (§16) | S6 (§13.3), S7 (§13.4), S8 (§13.7), S9 (§13.8 nightly, milestone and PR rows), S12 (D-18), S13 (D-11), S14 (J-R17, J-R38, J-R40, J-R42 restated; J-R44–J-R49 added; J-P10, J-R18, J-10 amended) | — |
| scope → rendering (R-1–R-3) | 3 | — | R-1 (§12.8, M1 → M2a), R-2 (§12.1), R-3 (§12 plain words, §12.9) | R-1 is C-3's adopted form |
| scope → determinism (DR-1–DR-3) | 3 | — | DR-1 (M2a wherever the determinism requests said M1 — through R-1 and the merged J-I14; a grep finds no other load-verification memory figure at M1), DR-2 (§2.9 step 4 names `EditEngine.rebase(doc, 'keptSnapshot', h₀)`), DR-3 (§2.9 size budget at M2a) | — |
| **total** | **83** (kernel 17, determinism 18, pipeline 21, rendering 21, scope 6 — counted from the tables' rows) | **32** | **50** (5 of them amended or extended by a conflict resolution) | **1** superseded (KR4-2) |

The scope draft's integrator tasks (its §3.4) were done: the folded requests were phrase-checked and not applied twice,
the judgment rows were applied in one pass with the eight ids the scope rows cite (J-K28, J-K33, J-DET-40, J-DET-43,
J-P41, J-P46, J-R44, J-R49), DR-2 and DR-3 were applied after the determinism §2.9 block and R-1 after the folded RR4-4,
and the scripted document checks were run (§5).

## 4. Conflicts resolved

| # | areas | the disagreement | resolution (and where) | judgment |
|---|---|---|---|---|
| C-1 | kernel × determinism | **How the water operator names the points where new water meets a wall or a boundary.** The determinism draft's §7.3 (b) 3 (and its KR4-2) gave a re-traced run's water-gate bank vertices persistent `('anchor', enceinte, k)` rows at the enceinte's next free ordinals, and each crossed boundary an `anchor` row on "the lower-id district" or, on the perimeter, "the hinterland pseudo-district"; the kernel draft (VK3-2, J-K29) named a water gate's bank vertices `('gate_end', gate, 0 \| 1)` under a fresh `Gate` whose new `banks` field names them, and every other bank point a *transient* `anchor` contact name whose entity is the edge's first own-level row in registry order (on the perimeter: the first in id order of the inner district and the hinterland pseudo-district), stripped by the promotion that uses it | the kernel's form, which owns §2.2 rule 7 (the determinism draft itself deferred to the owning lane's wording): §7.3 (b) 3 now carries X-D1's `gate_end`, `StretchRef` and contact-name text with the kernel's entity rule written out; (b) 4 lists `deck_end`, `gate_end` and contact-name vertices and strips the names at promotion (X-D2); (b) 7's `Gate` "names in `banks` the two `gate_end` vertices (3) placed"; item 7 (v)'s fixture asserts every indexed role unique per ordinal, `Gate.banks` on its `gate_end` vertices and no contact name left; KR4-2 superseded | J-I15 (new) |
| C-2 | kernel × pipeline × determinism | **The frame lines.** The kernel draft kept "the frame's `border` and `margin` lines" closed across new water as two L1 lines prepared at their bank points (§2.2 rule 7, §3.3 rules 2–3, J-I13's restatement) and cited them in J-K33's reason; the pipeline draft (VK3-8, J-P46) made the arena's outer ring one **L0** chain carrying `margin`, written first by S1, and only the frame rectangle an **L1** `border` chain written in S3's L1 batch; the determinism draft's X-D1 text still prepared both lines | the pipeline's levels — the kernel's own X-P5 contract (ii) required an outer ring that water reaches at generation to be L0 — with pipeline X-K1 applied in full: §2.2 rule 1 gains the outer ring as an L0 chain and drops the context margin from the L1 list, rule 7's contact-name list names only the map's `border` (entity: the arena's `Terrain`), §3.3 rule 2 prepares only the border ("the arena's outer ring is L0, so new water meets it at its own level"), rule 3 keeps "the border's edge" as the closed frame, pool step 3 reads "the arena's outer ring", §3.2 (9) states both chains; §7.3 (b) 3 prepares "the map's `border` line"; J-I13 restated with the border only; J-K33's inline reason restated (S3 stays the first L1 writer, so the list it rejects would still have been right — its reason is now that every such list must be re-checked whenever a writer moves) | J-I16 (new); J-I13 and J-K33's inline text amended |
| C-3 | determinism × rendering × scope | **When load-verification memory is measured.** The determinism draft (VD3-5, RR4-4, SR4-2) and the rendering draft's §12.8 (RR4-4 folded verbatim) put the memory measurement "with a district regeneration and a Re-derive from S3 made during" load verification at **M1**, and SR4-2 put the naming-input re-draws at M2a; the scope draft (VS3-1, S4-2, J-S37) put the first at **M2a** and the second at **M3a**, because M1 builds no document, log or load verification and M2a no table edits, packs or upgrades | the scope draft's milestones: R-1 moves §12.8's measurement, its PLAUSIBLE line and its fallback trigger to M2a (M1 keeps generated towns), R-2 adds the case to §12.1's confirming milestones, DR-1 is satisfied (a grep finds no other M1 figure for it), J-I14 is the scope draft's merged row (determinism's amendment with M2a), §16 carries both (folded) | J-S37 (the scope draft's), J-I14 as merged |
| C-4 | pipeline × determinism (found at integration) | **Crossing sites inside S1's water operator.** The pipeline's NP3-4 made every emitted crossing a `Bridge` in state `site` (two pinned bank vertices, no span) that becomes `built` only when a way uses it, and asked for a site left over land to be removed (X-D8); the determinism draft's §7.3 (b), written against the round-3 text, sited crossings on the changed reach and built a deck "at every site a route uses" but said nothing of the others — neither of an old unused site on the reach nor of a new site no route uses | integration text in §7.3 (b): (2) an old deck on the reach "— a built bridge or an unused `site` —" is matched to its successor site, and every other new site "stays a `site` … which (4) inserts with the shores"; (4) each unused new site's two `deck_end` vertices are placed on the new shores as S1's L0 batch places a site's, and "the old decks' and sites' bank vertices" leave with their shores; (9) carries X-D8 as its own clause; §11.1's GeoJSON row exports built bridges only ("a crossing `site` is not exported, §2.7") | J-I17 (new) |

Harmonised without a conflict (each draft had deferred to the owning lane's wording): §7.4's "Warp and what stands on the
ground" takes the pipeline's X-D1 sentence in place of the determinism draft's folded summary (the carry now names both
rings, drops the slot hint, and routes the check through `warp`'s `recordCheck`); §7.3 (b) 2 (iii), (b) 3 and (b) 7 take
the pipeline's X-D4 wording of the strip-line stretches and their feet (PR4-3); §7.4's "draw bridges" row takes X-D7's
site-or-new-deck text over the determinism draft's (PR4-4); §2.9 step 3 carries both the kernel's X-D6 (the replay's own
per-district stages at pool size 0 on its worker) and the determinism draft's VD3-5 (edits during verification at pool
size 0 in the generation worker), which are compatible — nothing freezes a copy while verification runs.

## 5. Document-level work

* **Summary (the one page).** Kept true to the revised design, in plain words, on top of the scope draft's block (which
  already carried NP3-9, VS3-2 and determinism's SR4-5): a river is bridged wherever a road crosses it, at the narrow
  places the ground offers (NP3-4); a walled port has a gate on its harbour side (NP3-7); a moved river or dug canal
  changes nothing outside the blocks it names "even where the new water passes through a town wall" (NP3-2); the warp
  brush carries every building's outline and roof wings (NP3-1); a large print is made in the background without holding
  up the map (NR3-6).
* **Title revision note and §0.10** (new): the round-4 record in the architecture.
* **"Staged by the owner's roadmap"** (the former "Deferrals" section, converted in round 1) re-checked: it lists only the
  seven roadmap subjects, each with the sections that carry its hooks; this round's hooks were added to three rows — the
  neighbour step's exact reversal by demotion (stage 2), `carryWings` and its union test (stage 3), epochs building the
  crossing sites generation left unused (the evolution engine) — and the intro names §R4. No other former deferral
  reappears; round 4 staged nothing.
* **Judgment calls.** 213 → 244 rows: the drafts' 28 new rows (J-K28–J-K33, J-DET-40–J-DET-43, J-P41–J-P46,
  J-R44–J-R49, J-S33–J-S38) and this seat's J-I15–J-I17; J-DET-23, J-DET-35, J-DET-37–J-DET-39, J-P34, J-P35, J-R17,
  J-R38, J-R40, J-R42 and J-S32 restated; J-K11, J-K16, J-K25, J-K26, J-10, J-P10, J-R18, J-I11, J-I13 and J-I14 amended;
  the preamble names the integration seat's rows.
* **§12.4 / §12.3.** Kernel X-R1 applied: the merge row 13 ms (8 merge + 5 copies of ≤ ≈ 15 MB); the critical path
  re-summed from the rows — 2 + 25 + 16 + 10 + 40 + 17 + 4 + 20 + 25 + 8 + 1 + 5 + 48 + 13 + 12 + 4 + 5 = **255 ms p50**
  (p95 ≤ 300 ms unchanged); METROPOLIS ≈ 609 ms; single worker ≈ 334 ms and TOWN ≈ 76 ms unchanged (all PLAUSIBLE until
  M0 / M1); §12.3's p50 column (folded by the rendering draft) and J-P27 in §4.1 (≈ 267 ms) agree with it.
* **Scripted document checks** (`docs/validation/bench/doc_checks.py --sections` over the 71 changed section keys; the
  keys are in the scratchpad's `r4i/keys.txt`; ≈ 42 s per run): first run C1 5 hits / 0 unreviewed, C2 0, C3 525 / 105
  unreviewed (93 distinct runs), C4 11 / 1 (one line this seat's edits had joined to 1 163 characters, holding five
  generic words — gone once the paragraph was re-wrapped), S1 0, S2 2 / 0. The 93 C3 runs were each read in context in the
  integrated text and appended to `docs/validation/doc-checks-allow.tsv` under a `fixall/integrate-r4` block: 63 ordinary
  phrasing of our own text, 22 numbers, pointers and ids with or without ordinary words, 1 file-path pair (our own
  findings cited as evidence), 1 reference measurement quoted as a calibration target (NG's corner at 0.5 ± 0.1, §0 and
  Appendix A.3), 1 reference behaviour named as the anti-pattern PLAT avoids (a parameter-space tolerance, §3.2 (2)), 1
  published formula in our notation (the shoelace sum), 1 our own API name, 1 a date in this document's history, 2 new
  plain-words sentences of this round. None is a copied list, table, grammar or palette. **Final run: C1 5 / 0, C2 0 / 0,
  C3 525 / 0, C4 10 / 0, S1 0 / 0, S2 2 / 0 — 0 unreviewed, exit 0.**

## 6. Changed sections of docs/ARCHITECTURE.md

Every heading below carries `> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r4)` (71 headings: 51
sections replaced by area blocks, the judgment-call section changed by row blocks and here, 18 sections changed at
integration only, and the new §0.10; the list is computed by comparing every section with the pre-integration file,
`r4i/banners.log`). Sections this seat edited on top of a block (requests, conflicts, coherence): §2.2, §2.9, §3.1, §3.3,
§3.4, §3.6, §3.9, §5.3, §6.1, §6.2, §7.3, §7.4, §11.1, §12.1, §12.8, §12.9, the one-page summary, the judgment calls.

* **kernel** (7): 2.2 The plat; 3.1 Build-versus-adopt, per primitive; 3.3 The transaction protocol; 3.4 Kernel
  operations the pipeline needs; 3.6 Insertion, contact and move semantics; 3.9 Geometry in the document; 3.10 Kernel
  invariants.
* **determinism** (10): 2.8 Identity, lifecycle, provenance, the entity registry; 2.9 The document and serialisation; 5.3
  The invariant suite; 6.1 RNG and stream design; 6.2 What a seed determines, and the model digest; 6.3 Identity: address
  ids, lineage keys, carry-over; 6.4 Permalinks, version axes, retention and goldens; 7.3 Locality; 7.4 Lifecycle of every
  edit kind; 7.6 The override layer and editable tables.
* **pipeline** (13): 2.5 Districts, quarters, blocks, plots; 2.6 Buildings, heights and ground datum, wings; 2.7 Walls,
  gates, towers, castle, bridges …; 4.1 Stage graph …; 4.2 S0–S3; 4.3 S4 Backbone; 4.4 S5 Growth stages; 4.5 S6 · S7b; 4.6
  S8 Infill; 4.7 S9–S11; 4.8 S7 Fortification furniture; 4.11 Incremental mode, transformations and conversions; II.1 The
  district → neighbourhood interface.
* **rendering** (12): 8.1 The display list; 8.3 Symbol catalogue and draw-style census; 8.9 Backends, text, threads and
  the worker boundary; 8.10 Decoration instances; 9.1 What is model and what is view; 9.2 Placement (S13b); 11.1 Formats;
  12.1 Reference hardware and how budgets are measured; 12.3 Model budgets on the one-click path; 12.7 Labels, trees,
  exports; 12.8 Memory; 12.9 Reference comparisons and the declared trade.
* **scope** (9 + row blocks): The whole design in one page; 1.1 What is built, in what order; 13.1 Kernel property tests;
  13.2 Per-stage invariants … B-EDIT; 13.6 The owner's side-by-side protocol; §14 Package and module layout; 15.1 Parity
  matrix; §16 Build plan; 17.1 The clean-room chain; and, row-level, Judgment calls (the preamble, J-S32, J-S33–J-S38,
  J-I14).
* **integration only** (18 + §0.10): the title (revision note); 0.10 Fix-all round 4 (new); 3.2 Numeric policy (§3.2 (9):
  the two frame chains); 4.10 S13 · S14 · S15 (rendering P3); 5.2 Failure classes (pipeline X-D5); 8.2 Style sheets as data
  (pipeline X-R1); 8.6 Stage-2 render tier and stage-3 LOD (pipeline X-R2); 9.6 Names (RR4-1); 10.4 Names, descriptions
  and setting packs (PR4-1 and the pack-set alignment); 11.3 The host bridge (RR4-2); §12 Performance budgets, its plain
  words (R-3); 12.4 CITY per-stage split (kernel X-R1); 12.6 Edits, regeneration, replay and warp (RR4-3); 13.3 Seed
  goldens (rendering S6); 13.4 Visual regression, B-ZOOM (S7); 13.7 Thresholds without a reference source (S8); 13.8 CI
  tiers (S9); Delegated decisions (D-11, D-18); Staged by the owner's roadmap.

## 7. Counts

| measure | value |
|---|---|
| items handled in round 4 | 43 (kernel 8, determinism 8, pipeline 9, rendering 7, scope 11) — the 39 new findings of the five round-3 verifications (VK3-1–VK3-9, VD3-1–VD3-8, NP3-1–NP3-9, NR3-1–NR3-7, VS3-1–VS3-6), VS2-8's half judged UNRESOLVED by the round-3 scope verification, and K4-1, S4-1, S4-2, found by the areas |
| by severity | 5 major (VK3-1, VD3-1, VD3-2, NP3-1, NP3-2), 38 minor; 0 blocker |
| FIXED | 43 |
| STAGED-BY-OWNER | 0 |
| INVALID | 0 |
| deferred | 0 |
| blocks applied | 55 (kernel 7, determinism 10, pipeline 13, rendering 12, scope 13) |
| cross-area request rows | 83 — 32 absorbed by the receiving draft, 50 applied here (5 of them amended or extended by a conflict resolution), 1 superseded (KR4-2) |
| conflicts resolved | 4 (C-1–C-4) |
| new or amended judgment calls | 3 new (J-I15, J-I16, J-I17); J-I13 and J-K33's inline reason amended for C-2; 244 rows in the table |
| dangling `§` pointers | 0 (the external `proposal-product.md` §16.2 excepted, as before) |
| sections carrying the round-4 banner | 71 |
| scripted document checks | 0 unreviewed hits (C1 5, C2 0, C3 525, C4 10, S1 0, S2 2 — all reviewed; 93 C3 runs reviewed into the allow file this round) |
| `docs/ARCHITECTURE.md` | 9 546 → 10 723 lines |
| `docs/ARCHITECTURE-VALIDATION.md` | §R4 appended: 43 disposition rows, 4 conflict rows, changelog (828 → 974 lines) |

## 8. CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed in this lane):** every block landed at its named heading (script log per area; no heading missing
or duplicated); every request edit matched exactly once in its section (the scripts assert it; the chain was dry-run on a
copy and the real file compared byte for byte with the dry run); 53 folded requests found by phrase in the receiving
blocks, 0 missing; 43 of 43 ids in §R4, each once; 244 of 244 cited judgment ids and 35 of 35 cited decision ids have
rows; 0 dangling section pointers besides the known external one; contiguous numbering; 71 round-4 banners; the scripted
document checks exit 0 over the 71 changed section keys; 0 broken table rows; the §12.4 critical-path sum (255 ms p50,
computed from the table's rows); the re-wrap changed no word of the document; no deferral wording in the 2 561 added or
changed lines. **PLAUSIBLE (this seat's reasoning):** the four conflict resolutions — that the kernel's contact-name and
`gate_end` naming serves the water operator exactly as it serves the carve (C-1); that no reader of the frame lines
still assumes the outer ring at L1 once it is an L0 chain (C-2: grep found II.1's `frame` seam type, which reads both
roles and stays valid because L0 edges are inherited at every finer level); the milestone placement of C-3; and that
carrying sites through S1's water operator (C-4) gives a moved river the sites a regenerated one would have. None is
measured until M0 / M1 / M3a; each rides on the confirming measurements and pre-decided fallbacks its sections already
carry (§3.3's clear-region fixtures and fallback, §13.1's and §13.2's river and carve fixtures, §16's milestone exits).

## 9. What a Fable reviewer should re-check first

1. **C-2 / J-I16 with J-P46 — the frame lines' levels.** The arena's outer ring is now an L0 `margin` chain and the map
   border an L1 `border` chain laid across land and water in S3's L1 batch; only the border is prepared at bank points
   and kept closed across new water. Read §2.2 rules 1 and 7, §3.2 (9), §3.3 rules 2–3 and pool step 3, §4.1's S1 and S3
   rows and §7.3 (b) 3 together, and check II.1's `frame` seam type, §3.3's scope check and the hinterland's margin
   fields against an L0 outer ring.
2. **C-4 / J-I17 — sites inside S1's water operator.** An integration addition neither draft wrote: old unused sites
   matched like decks, unused new sites inserted with the new shores, sites over land removed. Check it against §4.2 S1
   (5), §6.3's bridge row and §7.4's "draw bridges" row, and whether a regenerated river really would have the same
   sites.
3. **The round's new persisted or level-changing mechanisms** — the kernel's demotion and `split`-flag retention (VK3-3,
   J-K28) and the naming record with its pack-carried row binding (VD3-2, J-DET-41, PR4-1 (c)) — each flagged by its own
   draft as its top risk; and the declared O3 (d) miss (NR-1, D-18), whose two knees (VS3-2) are an owner-veto item.



