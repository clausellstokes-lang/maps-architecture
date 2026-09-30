# Validate — final validation of the consolidated `docs/ARCHITECTURE.md` (consistency pass, Fable seat)

Lane `consistency/validate`, 2026-09-26. Status: COMPLETE. Seat: Fable (`claude-fable-5-1`), the pass's Fable seat — not a
stand-in. Inputs read in full: `docs/ARCHITECTURE.md` (all 9 668 lines, sha256 `d9d509fa…` = assemble-r2's landed version),
`docs/validation/consistency/canon.md`, `assemble-r0.md` (§5), `assemble-r1.md`, `assemble-r2.md` (the last assemble log),
the six `verify-*-r2.md` files (outcome, issues, open items, observations) with their r0 and r1 predecessors by script
(§2), `docs/OWNER-INSTRUCTIONS-2026-09-25.md`, the outline of `docs/AMENDMENTS-2026-09-25b.md`, `still-open-r5.json`,
J27–J33 of `docs/PROGRESS.md`, and `docs/ARCHITECTURE-RATIONALE.md` by structure, id cross-check and the seven amended rows.
Receipts are under the session scratchpad, `val/` (`coverage.py`, `coverage2.py`, `notes.md`, `r2-observations.txt`,
`r2-openitems.txt`, `doc_checks.out`).

## 1. Verdict

**PASS WITH MINOR REPAIRS.** The consolidated design is coherent end to end; every verifier covered every inventory id;
no deferral wording, no review marker but the one banner, no "round N" narration remains; the first milestones (M0, M1)
can be built from the text; the size is usable. **Seven issues, all minor** (0 blocker, 0 major): five are the r2
verifiers' open findings, confirmed on the current text and de-duplicated (the eight listed are three pairs and two
singles), and two are new (§8 below). A repair round follows (rendering 2, scope 2, determinism 2, pipeline 1); the
closing duties are therefore left to the closing lane, with the extra instruction in §9. Nothing is deferred: every item
below is either an issue with an exact change, a ruling, or a decision routed to the pass that owns it.

## 2. Verifier coverage — every inventory id, per part and round

Method (executed, `scratchpad/val/coverage.py`, `coverage2.py`): for each part, the item ids of `inventory-<part>.json`
were compared with the ids that appear in the "Checked list — every inventory id" section of each `verify-<part>-r{0,1,2}.md`;
each checked-list row's verdict cell was located by its header and counted; the inventories' conflict records (`…-C01`,
`CF-PIPE-nn`) were looked for anywhere in the file, since they are handled in the verify files' conflict sections, not the
checked lists.

| part | inventory items (+ conflict records) | r0 rows / verdicts | r1 rows / verdicts | r2 rows / verdicts | conflicts mentioned r0 / r1 / r2 |
|---|---:|---|---|---|---|
| determinism | 601 (+0; its conflicts are the canon's C-1…C-10) | 601 / OK 576, 25 tied to VDC-n | 601 / OK 599, VDR1-1, VDR1-3 | 601 / OK 600, VDR2-1 | — |
| kernel | 386 (+13) | 386 / OK 376, 10 tied to VK-R0-n | 386 / OK 386 | 386 / OK 386 | 13 / 3 / 5 (r1–r2 re-check only the conflicts whose places changed) |
| model | 431 (+12) | 431 / OK 420, 11 tied to V-MODEL-nn | 431 / OK 428, 3 tied to V-MODEL-R1-nn | 431 / OK 431 | 12 / 10 / 8 |
| pipeline | 449 (+10) | 449 / OK 441, ISSUE 8 | 449 / OK 438, FIXED 8, ISSUE 3 | 449 / OK 438, FIXED 11 | 10 / 10 / 10 |
| rendering | 599 (+8) | 599 / OK 589, 10 tied to VR-R0-n | 599 / OK 595, 4 tied to VR-R1-n | 599 / OK 598, VR-R2-1 | 8 / 8 / 8 |
| scope | 828 (+11) | 828 / OK 819, 9 tied to V-SCOPE-nn | 828 / OK 473, "as r0" 353, 2 tied to V-SCOPE-R1-nn | 828 / OK 287, "as r1" 539, 2 tied to V-SCOPE-R2-nn | 11 / 11 / 11 |

Result: **no verifier sampled.** Every one of the 3 294 item ids has a verdict row in all three rounds of its part (0 missing,
0 extra, 0 empty verdict cells). Round 1 and 2 files carry an unchanged verdict forward explicitly ("as r0" / "as r1", or
"OK" with the re-check scope named) for ids whose text no repair touched, and re-check the ids in the replaced
subsections; that is a stated carry-forward, not a sample. The 3 294 = 601 + 386 + 431 + 449 + 599 + 828 items match the
canon's "inventory records merged" count. Every conflict record is discussed in its part's r0 file; r1 and r2 revisit only
those whose places a repair block replaced (each file says so). — DONE


## 3. End-to-end coherence findings

Read as one design, the parts agree with each other; each check below was made at the places named, on the current text.

* **Stage contracts ↔ data model ↔ kernel.** §4.1's batch table (which stage writes which level, and the L0 writers S1,
  S3, S4, S5b's extra bridge and S5a's outer moat) agrees with §4.2 S1 (5), §4.4 S5a–S5b, §5.2 F-ROUTE's "where" and
  J-I18. The deck and water-gate rules are the same rule at every place that uses it: §2.2 rule 7 (the deck is the way's
  own L1 edge between two `deck_end` vertices; `gate_end` on a fresh `Gate`), §3.3 rules 1–3 (clear regions, prepared
  contacts), §3.6 candidate (c), §4.11 batches (1)–(2), §7.3 (b) 3–4, §5.3's crossing invariant. Promotion, demotion,
  the `split` flag and dissolution agree across §2.2 rule 3, §3.4 (`removeEdges`, `clearFiner`), §3.6 ("split flag under
  moves"), §3.10 (level consistency) and §6.2 (per-level digests read current birth levels).
* **Determinism ↔ editing ↔ content.** §6.3's four draw cases are what §7.4's rows, §7.6, §10.4 and §2.8's naming record
  implement; the confirmation-version rule of §7.3 item 4 is what §7.5's `changedConfirmations` and §6.5 (9)'s tests
  exercise; VD5-1 … VD5-5 are one mechanism seen from four sections.
* **The load path.** §2.9 steps 2–5, §6.2 (iii), §11.3's bridged verification, §12.6's law V, §12.8's counting of the
  replay's model and §16 M2a's exit describe one procedure with one set of numbers (open-to-editable ≤ T(B); ≤ 60 ms +
  60 µs × B = 330–420 ms at CITY, equal in §1.2, §2.9 and §12.5).
* **Rendering ↔ determinism.** §8.10's instance function is under §6.5 (3)'s lint and §13.3's five-engine GeoJSON test;
  the light step is one thing in §8.4, §8.8's tile keys, §8.9's `TileRasterOpts.lightStep`, §11.1's export request and
  §12.7 / §12.8 (NR5-1 applied consistently).
* **Budgets.** §12.4's critical path (≈ 255 ms p50) is §12.3's CITY p50; §12.5's first map = model law + F(B) (265–340 +
  65–80 = 330–420 ms at the default CITY request, as §1.2 states); §12.9's ratios 1.8× / 2.3× / 5.1× are what §13.5's
  generation-time row bounds (≤ 2.5× / ≤ 5.5×) and D-18 declares; the one-page summary's figures (under 1 s up to ≈ 48 000
  people, ≈ 2.3 s at the cap; the O3 (d) bars up to ≈ 4 500 / 17 700 / 58 800 people; 153–204 pw) are §12.3's, §12.5's
  and §16's exactly. The quarter law of §4.5 (N_q = round(1.37 · B^0.267)) gives 10 / 13 / 17 at MFCG's 1 475 / 5 242 /
  13 091 buildings, inside §9.4's "± 1 of 9 / 12 / 18" (arithmetic checked).
* **Build plan.** Every M0 exit (a)–(f) points to a stated bar (§13.1, §3.7, §3.8, §13.2, §4.4's fallback, §12.4's
  spike, §13.8); every M1 exit criterion has a home (§12.5, §12.3, §8.3, §8.5, §9.4, §13.5, §13.2, §2.9, §8.9, §8.10,
  §4.2 S3, §12.8, §9.2, §12.7); the milestone rows sum to D-20's total. §16 is placement plus pointers, as R10 asks — with
  one gap, the M2b `lit`-export run (V-FIN-05).
* **The 72 canon conflicts** are resolved as ruled; each was seen applied while reading (among them MODEL-C01/C05/C07/
  C08/C10/C11/C12, KERNEL-C01–C13, CF-PIPE-01/02/03/05/08/10, DETERMINISM-C-1–C-10, RENDERING-C01–C08, SCOPE-C01/C03/C04/
  C06/C07/C11, CANON-C01–C10). SCOPE-C09 was rightly ruled INVALID (a floor and a bar are two facts).
* **The 20 still-open round-5 items** are FIXED, as the r2 verifiers state per item; fourteen were also spot-checked on the
  text here (NR5-1/2/3, VK5-1/2/3, NP5-1/2/3/4, VD5-1/2/5/6, VS5-1/2/3, VD5-7 via §16 M2a).
* **`docs/ARCHITECTURE-RATIONALE.md`.** Its Part A holds exactly the 276 judgment ids the document's index lists, and the
  document references exactly those 276 (0 missing either way); the seven rows the pass amended (J-K6, J-DET-20, J-S4,
  J-S34, J-S40, J-I18, J-I19) carry their amendments with the "*(amended by the consistency pass …)*" marker (9 markers).
  The file states it is not normative and that the document wins on any difference.
* **Residual restatements whose values agree — ruled, not raised.** (i) A stage's own "Test:" line and §13.2's schedule
  entry for the same test (§4.2 S3 (9)'s trace test; §4.4's `ringed` fixture; F-SITING's last rung at §4.7 S10b): the
  pipeline verifier asked for a document-wide R9 ruling. **Ruling:** R9 stands as the home rule, and these pairs are not
  defects of this pass — the stage line is the test's definition beside its mechanism and §13.2's line its schedule, both
  carrying the same numbers; a pass that rewrites either place reduces the stage's copy to a pointer. (ii) Restatements
  that sit beside a pointer to their home (§3.3 pool step 1's "≈ 2.3 ms … carried in §12.4"; §10.4's naming-re-draw
  sentence ending "(§7.6)"; §2.3's "(§4.2 S1 (2), §8, §11)" contour chain, which resolves in one hop through §8): not
  defects. (iii) One restatement without a pointer, whose two statements the canon itself holds as two facts (MODEL-157
  and PIPELINE-059): raised as V-FIN-07; the canon's merge missed that pair — a note for the queue's canon row.
* **Owner rules present** (docs/OWNER-INSTRUCTIONS-2026-09-25.md): the plot model and granularity (§2.5, §4.7); greenery by
  prosperity (§4.9); prosperity as a gradient and a band (§4.5); everything editable (§7.1's table); the two ladders
  (§1.1, PART III, D-33); heights (§2.6); sewers and islands as hooks (II.6); assignments (§7.7); the evolution and
  decline hooks (§2.8, §4.11); the design tiebreaker (§1.4); emulation-first defaults (§1.2); the no-defer rule (the
  Staged section). Amendments 8–28 of `docs/AMENDMENTS-2026-09-25b.md` are the next pass's (J32), so RULING-1 is not an
  issue here.
* **Clean room.** 0 occurrences of `partitioned/`, `settlement-engine` or `map-corpus` (the corpus is named only as
  "outside this folder", §13.9); the reference code is cited only as failure evidence. `doc_checks.py` on the eight
  `#` keys (executed here, `val/doc_checks.out`): C1 5 / 0, C2 0 / 0, C4 7 / 0, S1 0 / 0, S2 0 / 0 unreviewed, and **C3 495
  hits with 1 unreviewed** — `docs amendments 2026 09 25`, the file-name citation in §0.2's heading, which now matches
  the corpus because `research/findings/dwellings-posts.md` (written after assemble-r2, 22:56) cites
  `docs/AMENDMENTS-2026-09-25b.md`. A false positive of §17.1 (2)'s "pointer into another document" kind and not a
  document defect; the repair round's assembler enters the allow row (§9).

## 4. Open issues the repair rounds left, re-checked against the current text

| listed id | same as | place (current line) | on the text | disposition |
|---|---|---|---|---|
| V-MODEL-R2-01 | VR-R2-2 | §12.6 l. 7329–7331 "…, the view stages once at the end (§7.3 item 2) — …" | CONFIRMED: no verb | V-FIN-01 |
| P2-1 | V-SCOPE-R2-02 | §13.2 l. 7687–7688 "walled share in band" | CONFIRMED: no rung qualifier; "inside its rung band" has 0 hits | V-FIN-02 |
| VDR2-1 | VR-R2-3 | §5.2 l. 4009 "F-CONTOUR† … [§4.2 S1]"; the clip computed only at §8.2 l. 5719–5722 | CONFIRMED | V-FIN-03 |
| VR-R2-1 | — | §6.1 l. 4176–4181: no mixing function named for the `render.stampTiles` key; the four-lane finalisers named only for the seed key (l. 4117–4118) | CONFIRMED | V-FIN-04 |
| V-SCOPE-R2-01 | — | §16 M2b exit l. 8645 lists every other M2b-scheduled §12 run but not §12.7's `lit` export beside a moving `path` sun (l. 7410–7414) | CONFIRMED; ruled required (R10) | V-FIN-05 |

## 5. Owner rulings, deferral wording, review markers

* **Deferral wording:** none. A whole-document scan for TBD / to be decided / open question / deferred / postponed /
  "for now" / round-N narration finds only the Staged section's own sentences ("defers nothing"), §0.1's provenance line
  and the summary's "nothing else is postponed"; the kernel verifier's "a future version fails the checker" is a
  dependency contingency with a pre-decided fallback.
* **Review markers:** exactly one "PENDING FABLE REVIEW" line, the banner under the title (l. 3).
* **Fix-record tags:** stay as evidence pointers by J30; their spread is not an issue.
* **Decisions this pass may not make, routed (not deferred):** GAP-1 — `k` in §5.3's "no branch re-joins its parent
  within k segments (§4.4)" has no value; GAP-2 — §9.2's default kind ranking gives `wood` and `annotation` labels no
  place. Both add a design number and belong to the next design pass (`workflows/09-amendments-b.js`, J32), which
  applies them with the rest of the design changes. **Recommendations for that pass** (PLAUSIBLE defaults, so it need
  not re-decide): k = 3 segments (at S5c's 25–40 m secondary step, ≈ 75–120 m, one block-depth band plus the regime's
  separation, §4.4; confirmed by the M0 fusion gate's junction statistics); `wood` ranked after `water` and before
  `landmark` (an area label, like water); `annotation` labels are user-placed and enter the pin pass of §9.2 as pinned
  placements, so they need no rank. RULING-1 (GPL-3) is the same pass's item 21.

## 6. Can M0 and M1 be built from the text

Yes. M0 (a) — the kernel — is specified to the level of data layout (§2.2), numeric policy (§3.2), the transaction
protocol with its op forms and pool overlays (§3.3), the complete op list with semantics (§3.4, §3.6), the arrangement
booleans with their oracle rule (§3.7), the skeleton's contract, validator and downgrades (§3.8), storage (§3.9) and the
invariant table (§3.10), with the fuzz families and fixtures of §13.1 and the bars of §3.7 and §3.8. M0 (b)–(e) have
their recipes and numbers in §4.6, §4.3–§4.4 (with the fusion gate and both fallbacks), §6.1–§6.2 and §6.5, and §4.2 S1
with §4.5 and §12.4's spike. M1's content is S0–S11 and S13a as §4.2–§4.7 and §4.10 state them, the `ink` bands of §8.2,
the tile pyramid of §8.8–§8.9, the `.plat` reader of §2.9 and §3.9 (with VS5-1's frozen-view rule), the goldens of
§13.3 and the harness of §13.2, each exit criterion with its home. What a builder must still produce that the text
deliberately leaves to the build: the authored content (roster rows, grammar, palette — §16 names the ≈ 3–4 pw), and the
measurements every PLAUSIBLE figure waits for (Appendix A). Nothing an M0 or M1 implementer needs is missing or stated
in two disagreeing ways after the seven repairs below.

## 7. Size and usability judgment

Sizes: the pre-pass document was 1 461 981 bytes / 11 477 lines; the consolidated document is 1 121 206 bytes /
9 668 lines (76.7 %); `docs/ARCHITECTURE-RATIONALE.md` is 279 900 bytes / 1 857 lines; together 95.8 % of the pre-pass
bytes. The pass's 55–65 % target is not met, and the assembler could not meet it.

**Judgment: the document is usable as it stands, and a further compression pass is not worth its risk.** What makes it
usable is structure, not byte count: every section opens in plain words; every subsection is self-contained and points,
with resolving references (0 broken), to the one home of each fact; a builder reads the sections a milestone names
(§16) and follows pointers, and never reads the file front to back. What remains large is legitimately load-bearing —
the interface code blocks, §13.1–§13.2's fixture lists (which are the test plan), §15's matrices (the acceptance
contract) and §16's milestone cells — plus executed-evidence receipts kept as short parentheses. Reaching 65 % would mean
cutting ≈ 170 KB from exactly those places. The pass's own record shows the risk: 49 repair hunks (r1) produced 12
minor findings and 15 hunks (r2) produced 5, most of them pointer reductions that dropped a qualifier or a verb; a cut
of hundreds of paragraphs would seed tens of such regressions in a text that is otherwise consistent, for a reduction no
implementer asked for. Ruling: no further compression pass; the next passes compress only the places they rewrite
anyway, under the same single-source rule, and the fixture lists of §13.1–§13.2 become the test files' own documentation
when M0 and M1 write those tests.

## 8. Issues raised (each with its owning part and exact required change)

All seven are minor. The repair lanes are rendering (V-FIN-01, V-FIN-06), scope (V-FIN-02, V-FIN-05), determinism
(V-FIN-03, V-FIN-04) and pipeline (V-FIN-07). Every change is a substitution inside one sentence or table row; nothing
else in the touched subsection changes.

| id | severity | kind | owner | claim | required change |
|---|---|---|---|---|---|
| V-FIN-01 (= V-MODEL-R2-01 = VR-R2-2) | minor | new-problem | rendering | §12.6 "Replay and load verification" (l. 7329–7331) lost its verb in repair round 2: "A replay (§7.3 item 2's replay mode) folds the log on the model through the session's code path, the view stages once at the end (§7.3 item 2) — …"; "stages" now reads as a verb. Values unchanged; §7.3 item 2 (l. 4869–4870) is the target and reads "S14 and S13b run once at the end". | §12.6: "… folds the log on the model through the session's code path, and the view stages run once at the end (§7.3 item 2) — S13a's scoped delta at each event that re-derives names costs ≤ 3 ms per such event." Nothing else changes. |
| V-FIN-02 (= P2-1 = V-SCOPE-R2-02) | minor | lost | scope | The walled-share qualifier of the `wealthLevel` sweep (archive §4.4 S5d: "the walled share inside its rung band", PIPELINE-187 → SCOPE-184) is stated nowhere: §4.4 S5d (l. 3124) and F-BUDGET-STAGE (l. 4012) point to §13.2, whose line (l. 7687–7688) says only "walled share in band". Walled shares are per rung (§4.2 S2, l. 2786–2790), and elsewhere "walled share … band" means MFCG's 0.87–0.92 band (§13.5, O8 (e), §16 M1); in a sweep that moves wealth a bare "in band" is ambiguous. R13 puts a restatement's qualifier at the home. | §13.2 "Stage property tests": change "… `wealthLevel` ∈ {0, 0.5, 1} (population ± 5 % on ≥ 95 % of seeds, walled share in band)" to "… `wealthLevel` ∈ {0, 0.5, 1} (population ± 5 % on ≥ 95 % of seeds, walled share inside its rung band, §4.2 S2)". §4.4 S5d and F-BUDGET-STAGE keep their pointers. |
| V-FIN-03 (= VDR2-1 = VR-R2-3) | minor | broken-reference | determinism | §5.2's † convention says the bracket names the section that states how a row's rungs are computed. F-CONTOUR† (l. 4009) reads "[§4.2 S1]", but after P1-1 §4.2 S1 (2) (l. 2677–2678) only points on to §8.2 for the clip, which is computed at §8.2 l. 5719–5722 (RENDERING-084). The bracket reaches the second rung one hop short. Nothing lost. | §5.2 F-CONTOUR row: "F-CONTOUR† a contour crosses a shore [§4.2 S1, §8.2]". Nothing else in the row changes. |
| V-FIN-04 (= VR-R2-1) | minor | lost | determinism | The stamp-tile library's key derivation is stated nowhere: the archive's §8.10 (l. 7744–7746, RENDERING-286) gave "§6.1's four-lane finaliser over the words (…)"; round 2 reduced §8.10 to "under the `render.stampTiles` key and components of §6.1's registry entry (J-R42)" (l. 6260–6262), and §6.1's entry (l. 4176–4181) says only "keyed by a constant entity key over (stamp-tile domain, decoration class index, the reference spacing 400 cm, creation index …)"; §6.1 names the four 32-bit-lane finalisers only for the seed key (l. 4117–4118). The function on which the shipped tiles' hashes depend is missing. | §6.1, the `render.stampTiles` registry entry: change "keyed by a constant entity key over (stamp-tile domain, decoration class index, the reference spacing 400 cm, creation index — 0–3 for the class's four tiles, 4 for their shared border band), with `STAGE_VIEW` and …" to "keyed by a constant entity key — the four 32-bit-lane finalisers (as for the seed key) over the words (stamp-tile domain, decoration class index, the reference spacing 400 cm, creation index — 0–3 for the class's four tiles, 4 for their shared border band) —, with `STAGE_VIEW` and …". §8.10 keeps its pointer and changes nothing. |
| V-FIN-05 (= V-SCOPE-R2-01) | minor | new-problem | scope | §12.7 (l. 7410–7414) schedules "from M2b, where `lit` ships, a `lit` export of a CITY while a `path` sun advances one step per frame" — the only executed check of NR5-1's fix — but no §16 exit lists it: M2b's exit (l. 8645) lists every other M2b-scheduled §12 measurement (the moving-sun step budget, the light passes and crown bake, the METROPOLIS SVG budget, the export-time peak and memory, the first-map runs, the pool rule and max clause). R10: §16 places work in milestones and points to the criteria's homes; without the pointer the run gates no milestone. Ruled required (vetoable). | §16 M2b exit: after "the light passes and the crown bake of a `path` sun in `lit`, with §8.3's light-step row (§8.4, §12.7);" add "the `lit` export beside a moving `path` sun (§12.7);". Nothing else changes. |
| V-FIN-06 (new) | minor | conflict | rendering | §9.5's compass (l. 6561–6563) says its stream "is keyed from the town root's entity key (§6.1, §14 `TOWN_ROOT` — the seed key alone)". §6.1 (l. 4120–4123), the home, defines the town root's entity key as "the seed key mixed with the fixed town lineage (ground arena, no parent, creation epoch 0, index 0)"; §14's `TOWN_ROOT` comment (l. 8292) now only points to §6.1 (the archive's §14 comment that explained the mix, archive l. 10097, left with the move). Read as an appositive, "the seed key alone" names a different key from §6.1's, and a builder keying the compass from the raw seed key would draw a different stream from the emblem's (l. 6588, keyed by §6.1's rule). J-S27's meaning was "depends on the seed key alone (never on `docId`)", which §6.1 states. The canonical home wins; the restatement goes. | §9.5 compass bullet: change "(§6.1, §14 `TOWN_ROOT` — the seed key alone)" to "(§6.1, §14 `TOWN_ROOT`)". Nothing else changes. |
| V-FIN-07 (new) | minor | conflict | pipeline | The height raster's per-rung resolution is stated in full at two homes: §2.3 l. 656 "TOWN 5 m, CITY 8 m, METROPOLIS 10 m" (MODEL-157, the model's Terrain record, which D-19 names as the home: "the terrain resolution per rung (§2.3)") and §4.2 S1 (1) l. 2657–2658 "the stored raster (TOWN 5 m, CITY 8 m, METROPOLIS 10 m) is its bilinear refinement …" (PIPELINE-059), with no pointer between them. The values agree; the canon holds them as two facts, so no rewriter reduced the second. Principle 1: one home, a pointer elsewhere. | §4.2 S1 (1): change "the stored raster (TOWN 5 m, CITY 8 m, METROPOLIS 10 m) is its bilinear refinement plus one fine octave inside the built extent" to "the stored raster (at §2.3's resolution per rung) is its bilinear refinement plus one fine octave inside the built extent". Nothing else changes. |

## 9. CONFIRMED vs PLAUSIBLE, and closing duties

**CONFIRMED (executed or read at the place):** the coverage table of §2 (scripts over the six inventories and eighteen
verify files); the document's hash equals assemble-r2's landed hash; `doc_checks.py` as reported in §3; the 276 = 276 =
276 judgment-id cross-check and the seven amended rationale rows; every claim of §4 and §8 (each issue's lines were read
on the current text and the archive where cited); the clean-room greps; the wording scans of §5; the arithmetic of §3
(the budget chain, the quarter law). **PLAUSIBLE (reading and judgment):** that no further restatement without a pointer
exists beyond V-FIN-07 (the verifiers' per-id checks stand for that); the buildability judgment of §6; the size ruling of
§7; the recommendations of §5 for the next pass.

**Closing duties: not performed here, because issues are raised.** After the repair round and its re-verification, the
closing lane performs them (queue rows `A-consistency/*` and `B-consistency/*` — 35 rows — to REVIEWED-CONFIRMED or
REVIEWED-CORRECTED; the "> PENDING FABLE REVIEW" line of every file of this pass under `docs/validation/consistency/`;
the document's banner; `SUMMARY.md` for the owner). Two instructions for those seats: (1) the repair round's assembler,
when it re-runs `doc_checks.py`, enters the reviewed allow row `C3 | docs amendments 2026 09 25` with the reason "a
pointer into another document (`docs/AMENDMENTS-2026-09-25.md`, §0.2's heading); matched since
`research/findings/dwellings-posts.md` (2026-09-26 22:56) cites `docs/AMENDMENTS-2026-09-25b.md`" — the hit is not a
document defect; (2) the closing seat marks the canon's queue row REVIEWED-CORRECTED with the note that MODEL-157 and
PIPELINE-059 were one fact (V-FIN-07), and the rationale-file row REVIEWED-CONFIRMED.
