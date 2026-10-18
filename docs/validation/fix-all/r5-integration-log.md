# Fix-all round 5 — integration log (lane fixall/integrate-r5)
> PENDING FABLE REVIEW — written by opus standing in for the Fable seat fixall/integrate-r5 (2026-09-25); queued in docs/FABLE-REVIEW-QUEUE.md.

**In plain words.** After round 4, the five checkers accepted every round-4 fix (43 of 43) and listed 35 new things the
rewrite had broken or exposed; the determinism area found one more while fixing them — 36 items. The five area
architects fixed theirs in drafts; this seat merged the five drafts into `docs/ARCHITECTURE.md`, made every change one
area asked another to make, and settled two places where the drafts did not fit together, both found at integration:
which bridges get their bank points placed before their water exists (the kernel's list had not seen the pipeline's new
rule for a bridge added while a river is being moved), and how a file saved by the first milestone opens once a later
milestone adds a second fingerprint to saved files (it is rebuilt from its recipe). The one owner-visible number that
moved: the effort estimate, 150–200 → **153–204 expert person-weeks**. Result: all 36 items FIXED, none INVALID, none
staged (NP4-2 is stage-3 subject matter whose hook is now concrete, so it is FIXED under the governing rule), none
deferred; the per-item record is `docs/ARCHITECTURE-VALIDATION.md` §R5.

Status: COMPLETE (2026-09-26).

## 1. Method

1. **Blocks (step 1).** Every `=== REPLACE` / `=== INSERT AFTER` block of `r5-{kernel,determinism,pipeline,rendering,scope}.md`
   (52 blocks: 42 whole-section replacements, 9 row-level replacements, the judgment-call preamble and 1 row insertion)
   was applied to `docs/ARCHITECTURE.md` by `r5i/apply_blocks.py` (session scratchpad), adapted from round 4's script:
   each block's heading matched exactly and asserted unique, the section's own lines replaced up to the next heading,
   area by area in the order kernel → determinism → pipeline → rendering → scope, dry-run first on a copy (identical to
   the real run, byte for byte), progress logged after each area (§2). The pre-integration file (10 723 lines, md5
   `2661eb6826ea537ddcd524941c003e14` — the file every round-5 draft was built from; unchanged since `integrate-r4`) is
   kept as `r5i/ARCHITECTURE.pre-r5.md`. No two drafts replaced the same section. Each block's banner became
   `> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r5); drafted by fixall/draft-<area>-r5; …`
   (the rendering drafts' "earlier: revised by opus stand-in (…)" normalised to "earlier revision …"). Before anything
   was applied, every block was word-diffed against the section it replaces (`r5i/diffblocks.py`, 5 diff files, every
   hunk read) and each draft's parts 0, 1, 3 and 4–5 read in full; that is how the conflicts of §4 and the folded
   companion texts of §3 were found. After application, every heading block was compared with the integrated section
   line for line (0 mismatches).
2. **Cross-area requests (step 2).** All 55 request rows were read against the integrated text and against the
   receiving draft's own record of what it folded; §3 gives each row's fate. Every edit is section-scoped,
   whitespace-tolerant and asserted to match exactly once (`r5i/p1_kernel.py`, `p2_det.py`, `p3_pipe.py`, `p4_rend.py`,
   `p5_scope.py`, `p6_judgments.py`, `p7_doc.py`); the chain was dry-run on a copy and the real file compared byte for
   byte with the dry run (identical).
3. **Coherence (step 3).** Beyond the requests, the integrated text was checked for places the drafts could not see in
   one another: the two conflicts (§4); stale wording outside the replaced sections, each grepped (`Steiner bound`,
   `Steiner invariant`, `keptOldModel`, `gates = N`, `roads leaving = N`, `one union per building`, `tile index`,
   `a typical run`, `31–34 ms`, `digest tree (`, `per light direction`, `drawn through that row`, `harbour gate when`,
   `carryWings(wings`, `Confirm(token, fates)`, `fates equal`, `recipe-only`): the live ones fixed (§5), the rest
   confirmed as MFCG descriptions, historical judgment reasons or ordinary phrasing. Scripted checks (`r5i/checks.py`):
   every cited judgment id has a row (269 of 269) and every cited decision id (35 of 35); every `§n.m` and `II.n`
   pointer resolves (the only non-matching one is the external `proposal-product.md` §16.2); chapter numbering
   contiguous (0.1–0.11, 1.1–1.7, …, 17.1–17.4, II.1–II.6); every changed heading carries the round-5 banner (62 of
   62); a deferral-language scan of the 1 994 added or changed lines (57 hits, every one ordinary sequence — "a later
   batch", "whose water is not yet inserted", "a later corpus change" — a negation such as "none deferred", or an
   owner-staged subject). The paragraphs this seat's edits had lengthened were re-wrapped at 120 columns
   (`r5i/p9_rewrap.py`; 34 paragraphs; the document's words are identical before and after, checked).
4. **Document checks (step 4).** `python3 docs/validation/bench/doc_checks.py --sections "<the 62 changed section keys>"`
   (the keys are in `r5i/keys.txt`), the check §17.1 (2) binds every seat that writes the document to, now with S1's
   cell count (VS4-1) (§5).
5. **Validation record (step 5).** §R5 of `docs/ARCHITECTURE-VALIDATION.md` was written from the five drafts'
   disposition tables and the integrated text: 36 of 36 ids, each once (checked by script), 2 conflict rows, the
   harmonisations, the changelog.

## 2. Progress by area (step 1 — blocks)

| area | blocks applied | architecture lines after the area |
|---|---|---|
| kernel | 7 REPLACE (§2.2, §3.1, §3.3, §3.4, §3.6, §3.9, §3.10) | 10 826 |
| determinism | 13 REPLACE (§2.8, §2.9, §5.2, §5.3, §6.2, §6.3, §6.4, §6.5, §7.1, §7.3, §7.4, §7.5, §7.6) | 11 006 |
| pipeline | 7 REPLACE (§2.6, §2.7, §4.1, §4.2, §4.3, §4.4, II.4) | 11 125 |
| rendering | 11 REPLACE (§8.2, §8.3, §8.4, §8.8, §8.9, §8.10, §9.2, §11.1, §12's opening, §12.6, §12.7) | 11 296 |
| scope | 14 (§13.6, §14, §16, §17.1; rows D-20, D-29; the judgment-call preamble; rows J-15, J-S6, J-S37, J-S38; J-S39 – J-S43 inserted after J-S38; rows J-I14, J-I15) | 11 355 |
| after steps 2–4 | requests, conflicts, coherence edits, summary, §0.11, staged list, banners, paragraph re-wrap, II.2's quoted phrase | 11 477 (`wc -l`) |

(The per-area counts are the script's line count, one more than `wc -l`, which does not count a last line without a
newline.)

## 3. Cross-area requests (step 2)

A row is *applied* when this seat edited the text, *applied over folded text* when the receiving area's block already
carried its own version of the companion sentence and the owning area's wording replaced it (the drafts said "the
owning lane's wording governs"), *absorbed* when the receiving block already carries the request (phrase-checked in
place by the scripts, so it was not applied twice), and *alignment* when the row asked only that the integrator align
folded text to the owner's wording — satisfied through the owner's own request.

| from → to | rows | applied | applied over folded text | absorbed by the receiving draft | alignment notes satisfied |
|---|---|---|---|---|---|
| kernel → determinism (X-D1–X-D4) | 4 | X-D4 (a), (b) (§2.9 chunks) | X-D1 (§7.3 (b) 4, amended by C-1: the outer moat and the rung's deck among the L1 preparers, "on standing water" for the added deck), X-D2 (§7.3 (b) 9), X-D3 (§5.3 kernel row, with VK4-5's index freshness) | — | — |
| kernel → pipeline (X-P1–X-P3) | 3 | X-P1 (§4.4), X-P2 (§2.7 `Gate.banks`), X-P3 (II.1 (3)) | — | — | — |
| kernel → scope (X-S1, X-S2) | 2 | X-S1 (a)–(c) (§13.1), X-S2 (J-K18, J-K26, J-K28, J-K29, J-K32 amended; J-K34, J-K35 added) | — | X-S2's preamble sentence (merged into the scope's preamble block) | — |
| kernel → rendering (X-R1) | 1 | X-R1 (§12.8) | — | — | — |
| determinism → kernel (KR5-1, KR5-2) | 2 | KR5-1 (§3.9 load paragraph) | — | — | KR5-2 (through kernel X-D1, X-D2, X-D3) |
| determinism → pipeline (PR5-1–PR5-3) | 3 | PR5-1 (a), (b) (§10.4; (c) asked for no change) | — | — | PR5-2 (through pipeline X-D1), PR5-3 (through pipeline X-D2, X-D3, X-D4; the `Composition` naming) |
| determinism → rendering (RR5-1–RR5-5) | 5 | RR5-1 (a)–(d) (§11.2 and J-R33), RR5-2 (a)–(c) (§11.3), RR5-3 (a), (b) (§9.6), RR5-5 (§12.8) | — | RR5-4 (§12.6, the rendering block) | — |
| determinism → scope (SR5-1–SR5-4) | 4 | SR5-1 (a), (b) (§13.2), SR5-4 (J-DET-35 restated, J-DET-44 – J-DET-51 added) | — | SR5-2 (§16), SR5-3 (§14), SR5-4's preamble sentence | — |
| pipeline → kernel (X-K1–X-K3) | 3 | X-K1 (§2.2 rule 5), X-K2 (§2.2 rule 7; extended by C-1 into rule 3's writer list), X-K3 (§3.6) | — | — | — |
| pipeline → determinism (X-D1–X-D6) | 6 | X-D5 (§7.3 item 7 (ii)), X-D6 (§5.3 wing row) | X-D1 (§5.2 F-ROUTE), X-D2 (§5.2 F-WALL; the folded trailing tag dropped), X-D3 (§5.2 F-REDERIVE detection, ladder, test; with kernel X-D2's pin clause), X-D4 (§7.4 warp paragraph; the warp row aligned) | — | — |
| pipeline → rendering (X-R1) | 1 | — | — | X-R1 (§12.6, the rendering block) | — |
| pipeline → scope (X-S1–X-S7) | 6 | X-S1 (§13.2 B-EDIT), X-S2 / X-S3 (§13.2 harbour fixtures), X-S4 (§13.5), X-S6 (§13.2, the staged list), X-S7 (J-P35, J-P42, J-P44, J-P45 restated; J-P47 – J-P49 added) | — | X-S5 (§16 M3a), X-S7's preamble sentence | — |
| rendering → kernel (K1) | 1 | K1 (§3.1 Poisson row) | — | — | — |
| rendering → determinism (D1, D2) | 2 | D1 (§6.1 registry) | D2 (§6.5 (3), both sentences) | — | — |
| rendering → scope (SC-1–SC-9) | 9 | SC-1 (§13.3), SC-2 (§13.2), SC-3 (§13.8), SC-6 (the one-page summary), SC-7 (§15.1 B19), SC-8 (J-R42 restated, J-R50 – J-R54 added) | — | SC-4 (§14), SC-5 (§16 M1, M2b, M3a), SC-9 (= VS4-1, the scope's J-I15 block), SC-8's preamble sentence | — |
| scope → pipeline (PS5-1) | 1 | PS5-1 (II.2) | — | — | — |
| scope → determinism (alignment note) | 1 | — | — | — | the §7.1 `rebase` comment carries `E_REBASE_AT` in the determinism block (checked) |
| scope → rendering (RS5-1) | 1 | RS5-1 (§12.8) | — | — | — |
| **total** | **55** (kernel 10, determinism 14, pipeline 16, rendering 12, scope 3) | **35** | **8** | **8** | **4** |

(43 rows edited here: 35 applied plus 8 applied over folded text. The scope draft's integrator tasks, its §3.5, were
done: its folded requests were phrase-checked and not applied again; the integration seat's own J-I rows were added
to the preamble before "(the record is"; the document checks were run over every changed section key.)

## 4. Conflicts resolved

| # | areas | the disagreement | resolution (and where) | judgment |
|---|---|---|---|---|
| C-1 | kernel × pipeline (found at integration), with the determinism draft's folded text | **Which decks get L0 and which L1 `deck_end` rows.** The kernel's VK4-1 (§2.2 rule 3) listed "S4's or an edit's added deck" among the L0 writers — a deck over land keeping L0 until F-REDERIVE — while the pipeline's VD4-10 made F-ROUTE's extra-bridge rung only *site* its deck inside S1's water operator or a carve, its bank vertices placed on the new route by the operator's **L1** batch and promoted by its L0 batch. Neither draft saw the other's rule. The determinism draft's folded §7.3 (b) 4 also named S5a an L0 writer, which the kernel's own round-5 reading corrected (S5a's outer moat places L1 rows) | the added deck is an L0 writer **on standing water** only; a deck the rung sites inside a water operator or a carve has L1 rows, its operator's preparation batch placing them: §2.2 rule 3's writer list gains "on standing water" and the rung's deck; §7.3 (b) 4 carries the kernel's X-D1 text with the outer moat and the rung's deck among the L1 preparers and "on standing water" for the added deck; §2.2 rule 7 carries the pipeline's X-K2 ("on water that already stands", the rung's deck sited inside an operator); §5.2 F-ROUTE carries the pipeline's X-D1 | J-I18 (new) |
| C-2 | scope × determinism (found at integration) | **How a file saved by M1's generated-town format opens once M2a adds the records digest.** The scope's VS4-3 builds the `.plat` writer and reader at M1 and says (§16) that M2a's reader opens an M1 file "by the same regeneration"; the determinism's VD4-6 makes `recordsDigest` a snapshot field checked at every load (§2.9 steps 3–4), and §2.9 had no rule for a file without one — a reader could have treated it as a schema failure (step 1: read-only, never replayed) or checked the records against a root nothing recorded | §2.9 step 5: the schema transform that adds `recordsDigest` (§7.5) drops such a file's `model`, whose records root nothing recorded, and the load regenerates the town from its recipe and its empty log, never reporting it verified — a *preview* file (§13.3) loses nothing | J-I19 (new) |

Harmonised without a conflict (each draft had folded companion text of another area's item and deferred to the owning
lane's wording): §7.3 (b) 9 and §5.2 F-REDERIVE take the kernel's "and clears their kernel pins"; §5.3's kernel row takes
the kernel's X-D3 (placement bound, level consistency, index freshness); §5.2's F-ROUTE, F-WALL and F-REDERIVE rows take
the pipeline's X-D1–X-D3 (the carve added to the rung's exception; the roads leaving each walled stage counted; a site's
own detection, ladder and test clause); §7.4's warp paragraph takes the pipeline's X-D4, and the warp row now says
"stored compositions"; §6.5 (3) takes the rendering area's D2 lint-closure wording. The rendering draft's §12.6 carries
determinism RR5-4 and pipeline X-R1 verbatim, and the scope draft's §14 and §16 carry determinism SR5-2 and SR5-3,
pipeline X-S5 and rendering SC-4 and SC-5 — each phrase-checked in place.

## 5. Document-level work

* **Summary (the one page).** SC-6 applied ("19 runs in 20"); kept true to the revised design in plain words: a street
  list chosen for one culture renames only its streets, and a name you had renamed or locked is offered its list's new
  name, for confirmation, when you undo or unlock it (VD4-3, VD4-5); keeping the saved copy waits for the fingerprint
  check (VD4-2); a town made by a version the browser no longer keeps opens for viewing, labelled as not re-checked by
  this one (VD4-1); a town kept from its saved copy is shared as its file, never as a link (VD4-8). The summary names no
  effort figure, so VS4-6 changes nothing there; §0.11 states the moved estimate in plain words.
* **Title revision note and §0.11** (new): the round-5 record in the architecture, the owner-visible effort move stated.
* **"Staged by the owner's roadmap"** (the former "Deferrals" section, converted in round 1) re-checked: it lists only
  the seven roadmap subjects, each with the sections that carry its hooks; this round's hook was added to the stage-3
  row (a stored composition's rings and tower centres carried by `carryWings`, the union test run at the stage-3 intake
  on stored compositions — pipeline X-S6); the intro names §R5. No other former deferral reappears; round 5 staged
  nothing.
* **Judgment calls.** 244 → 269 rows: the drafts' 23 new rows (J-K34–J-K35, J-DET-44–J-DET-51, J-P47–J-P49,
  J-R50–J-R54, J-S39–J-S43) and this seat's J-I18–J-I19; J-K18, J-K26, J-K28, J-K29, J-K32, J-DET-35, J-P35, J-P42,
  J-P44, J-P45, J-R42, J-S37 and J-S38 restated; J-15, J-S6, J-R33 (RR5-1 (c)) and J-I14 amended; J-I15's pipe escaped;
  the preamble (the scope's merged block) names the integration seat's rows and J-R33.
* **Coherence edits this seat made** (none asked for by a request; each where two drafts' texts met): §2.2 rule 3's
  writer list and §7.3 (b) 4 (C-1); §2.9 step 5 (C-2); §3.9's "no vertex positions except …" sentence names a stored
  stage-3 composition (NP4-2); §10.4's user-corpus pack "sets the chosen corpus field" of the row (VD4-5, matching
  §7.6); §11.2's `confirm(h, token, fates, renames)` sentence, "the same fates and renames", and the call table's
  `confirm` row (VD4-4); §6.2's measured ≈ 31–34 ms named as the model tree's, the records tree ≈ 4 ms more (VD4-6);
  §7.4's warp row "stored compositions" (NP4-2); §5.2 F-WALL's duplicated trailing `(NP4-5)` dropped; II.2's quoted
  template phrase ("seed geometry plus …", flagged by C3) put in our own words.
* **Scripted document checks** (`docs/validation/bench/doc_checks.py --sections` over the 62 changed section keys;
  ≈ 42 s per run): first run C1 5 / 0 unreviewed, C2 0, C3 506 / 52, C4 9 / 1, **S1 0** (the new cell count passes the
  whole document: J-I15 escaped by the scope block, every new row two cells), S2 2 / 0. The 52 C3 runs and the C4 line
  were each read in context in the integrated text (`r5i/unrev_ctx.txt`): 28 runs of this round's own phrasing and
  pointers, 1 pre-existing quoted phrase in II.2 reworded away (the only run that was a quotation), and 23 pre-existing
  runs in sections first scanned this round (§13.5's reference measurements quoted as calibration targets or descriptive
  bands, II.2's own template descriptions); the C4 line is §3.1's spatial-index row, technical prose. 50 entries were
  appended to `docs/validation/doc-checks-allow.tsv` under a `fixall/integrate-r5` header with reasons. None is a
  copied list, table, grammar or palette. **Final run: C1 5 / 0, C2 0 / 0, C3 504 / 0, C4 9 / 0, S1 0 / 0, S2 2 / 0 —
  0 unreviewed, exit 0.**

## 6. Changed sections of docs/ARCHITECTURE.md

Every heading below carries `> PENDING FABLE REVIEW — revised by opus stand-in (fixall/integrate-r5)` (62 headings,
computed by comparing every section with the pre-integration file and checked by script). Sections this seat edited on
top of an area block (requests, conflicts, coherence): §2.2, §2.7, §2.9, §3.1, §3.6, §3.9, §4.4, §5.2, §5.3, §6.2,
§6.5, §7.3, §7.4, Judgment calls, Delegated decisions (banner).

* **kernel** (7): 2.2 The plat; 3.1 Build-versus-adopt, per primitive; 3.3 The transaction protocol; 3.4 Kernel
  operations the pipeline needs; 3.6 Insertion, contact and move semantics; 3.9 Geometry in the document; 3.10 Kernel
  invariants.
* **determinism** (13): 2.8 Identity, lifecycle, provenance, the entity registry; 2.9 The document and serialisation;
  5.2 Failure classes; 5.3 The invariant suite; 6.2 What a seed determines, and the model digest; 6.3 Identity: address
  ids, lineage keys, carry-over; 6.4 Permalinks, version axes, retention and goldens; 6.5 Floating-point policy,
  determinism lint, determinism tests; 7.1 Edits are ordered events on addresses; 7.3 Locality; 7.4 Lifecycle of every
  edit kind; 7.5 Migration and upgrade; 7.6 The override layer and editable tables.
* **pipeline** (7): 2.6 Buildings, heights and ground datum, wings …; 2.7 Walls, gates, towers, castle, bridges …; 4.1
  Stage graph …; 4.2 S0–S3; 4.3 S4 Backbone; 4.4 S5 Growth stages; II.4 The render tier, the workflow and the
  close-up's persistence status.
* **rendering** (11): 8.2 Style sheets as data; 8.3 Symbol catalogue and draw-style census; 8.4 Layers, shadows,
  heights; 8.8 Tiles, zoom stops, print and the canvas budget; 8.9 Backends, text, threads and the worker boundary; 8.10
  Decoration instances; 9.2 Placement (S13b); 11.1 Formats; §12 Performance budgets (its opening); 12.6 Edits,
  regeneration, replay and warp; 12.7 Labels, trees, exports.
* **scope** (4 + row blocks): 13.6 The owner's side-by-side protocol; §14 Package and module layout; §16 Build plan;
  17.1 The clean-room chain; and, row-level, Delegated decisions (D-20, D-29) and Judgment calls (the preamble, J-15,
  J-S6, J-S37, J-S38, J-S39 – J-S43, J-I14, J-I15).
* **integration only** (18): the title (revision note); The whole design in one page; 0.11 Fix-all round 5 (new); 6.1
  RNG and stream design (D1); 9.6 Names (RR5-3); 10.4 Names, descriptions and setting packs (PR5-1 and the field
  coherence edit); 11.2 The embedding API (RR5-1); 11.3 The host bridge (RR5-2); 12.8 Memory (kernel X-R1, RR5-5,
  RS5-1); 13.1 Kernel property tests (kernel X-S1); 13.2 Per-stage invariants … B-EDIT (SR5-1, pipeline X-S1, X-S2 /
  X-S3, X-S6, SC-2); 13.3 Seed goldens (SC-1); 13.5 Reference-parity metrics (pipeline X-S4); 13.8 CI tiers (SC-3); 15.1
  Parity matrix (SC-7); II.1 The district → neighbourhood interface (kernel X-P3); II.2 Templates as fabric strategies
  (PS5-1 and the reworded phrase); Staged by the owner's roadmap (X-S6 and the intro).

## 7. Counts

| measure | value |
|---|---|
| items handled in round 5 | 36 (kernel 6, determinism 11, pipeline 8, rendering 6, scope 5) — the 35 new findings of the five round-4 verifications (VK4-1–VK4-6, VD4-1–VD4-10, NP4-1–NP4-7, NR4-1–NR4-6, VS4-1–VS4-6; every round-4 item was accepted) and D5-1, found by the determinism area |
| by severity | 1 major (VD4-1), 35 minor; 0 blocker |
| FIXED | 36 (NP4-2 a stage-3 subject whose hook is now concrete) |
| STAGED-BY-OWNER | 0 |
| INVALID | 0 |
| deferred | 0 |
| blocks applied | 52 (kernel 7, determinism 13, pipeline 7, rendering 11, scope 14) |
| cross-area request rows | 55 — 35 applied here, 8 applied over a draft's folded companion text, 8 absorbed by the receiving draft, 4 alignment notes satisfied |
| conflicts resolved | 2 (C-1, C-2), both found at integration |
| new or amended judgment calls | 2 new (J-I18, J-I19); J-R33 amended (RR5-1 (c)); 269 rows in the table |
| dangling `§` pointers | 0 (the external `proposal-product.md` §16.2 excepted, as before) |
| sections carrying the round-5 banner | 62 |
| scripted document checks | 0 unreviewed hits (C1 5, C2 0, C3 504, C4 9, S1 0, S2 2 — all reviewed; 50 entries added to the allow file this round) |
| `docs/ARCHITECTURE.md` | 10 723 → 11 477 lines (`wc -l`), md5 `bac60dd7ecb828b0f7926a06efa36c74` |
| `docs/ARCHITECTURE-VALIDATION.md` | §R5 appended: 36 disposition rows, 2 conflict rows, harmonisations, changelog (974 → 1 122 lines) |

## 8. CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed in this lane):** every block landed at its named heading (script log per area; no heading missing
or duplicated; each heading block equal to its integrated section line for line); every request edit matched exactly
once in its section (the scripts assert it; the chain was dry-run on a copy and the real file compared byte for byte
with the dry run); the folded requests found by phrase in the receiving blocks (RR5-4, pipeline X-R1, SR5-2, SR5-3,
X-S5, SC-4, SC-5 — 14 phrases, 0 missing); 36 of 36 ids in §R5, each once; 269 of 269 cited judgment ids and 35 of 35
cited decision ids have rows; 0 dangling section pointers besides the known external one; contiguous numbering; 62 of
62 changed headings carry the round-5 banner; the scripted document checks exit 0 over the 62 changed section keys, with
S1's new cell count passing the whole document; §R5's tables have their headers' cell counts; the re-wrap changed no
word of the document; no deferral wording in the 1 994 added or changed lines. **PLAUSIBLE (this seat's reasoning):**
the two conflict resolutions — that splitting the deck writers by the water they stand on (C-1) matches every path that
places `deck_end` rows (S1, S3, S4 at generation and in edits, S5a's moat, a carve, S1's water operator, a drawn bridge),
and that dropping an M1 file's `model` at the schema transform (C-2) is the right migration for a preview file; and
that the coherence edits of §5 say only what the drafts' mechanisms already imply. No engine exists; each rides on the
confirming measurements and pre-decided fallbacks its sections already carry (§13.1's kernel fixtures, §13.2's B-EDIT
and water fixtures, §16's milestone exits).

## 9. What a Fable reviewer should re-check first

1. **C-1 / J-I18 with VK4-1 and VD4-10 — the deck writers.** Read §2.2 rules 3 and 7, §7.3 (b) 2–4 and 9, §5.2 F-ROUTE
   and F-REDERIVE, §4.1's S4 and edits rows, §4.2 S1 (5) and §2.7's Bridges paragraph together, and check that every
   deck a later water edit can leave over land is named with the level its `deck_end` rows really have.
2. **C-2 / J-I19 with VD4-1 and VD4-6 — roots and files across versions.** The version-pinned model roots (two new
   persisted fields, `rebase.version` and `upgrade.baseDigest`), the records digest encoded by the file schema rather
   than the output version, and this seat's rule that an M1 file loses its `model` at the schema transform — whether every
   path that decodes a snapshot or a rebased base finds a root it may compare against.
3. **The owner-visible moves of the round** — the effort estimate 153–204 pw (J-S43, D-20), the confirmation a freed name
   now asks for on undo or unlock (J-DET-46), and the `void` default of the `square` template (J-S42, II.2) — each an
   owner-veto candidate.
