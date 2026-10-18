# repair-r7y-scope — lane coherence/repair-scope-r7y (unit scope: base §0–§1, §13–§17, the index, INDEX.md)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-scope-r7y; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored. Both blocks target docs/ARCHITECTURE.md (live target: assemble-r7x's output, sha256 03573b4f…, unchanged
# through this seat's run); the rationale file and docs/volumes/INDEX.md are not touched. The §13.2 REPLACE body is the
# live §13.2 with count-asserted edits (each old text or anchor found exactly once in the subsection, line breaks
# joined, before any edit; each new text exactly once after all; 9 edits); only the original lines an edit touches are
# re-flowed (greedy, 120 characters, the line's own indent), ending at the original line break after them or at the
# first of the next three lines where the re-flow meets an original break; every other line verbatim. The §13.8
# REPLACE body is the live §13.8 with one in-row substitution in the T110 table row (a table row stays one line). Every
# new text is checked to occur verbatim (whitespace normalised) in adjudication-r7y.md Part H · scope, so each is
# written exactly as ruled. Generator: the seat's scratch folder (scope-r7y/gen.py; not part of the set).
# Blocks: 2 REPLACE (§13.2, §13.8). Ruling requests: 0. HAND-OFFS: 0.
# Binding rulings applied: adjudication-r7y.md — its head (grading, "How to read", no review id in the design), the
# decision table, class (A)'s form F6 with its sweep rule, class (B)'s enumeration (B2, B7 and the bars S2 holds them
# by), Part H · scope S1 – S5 as written; adjudication-r7x.md (forms F1 – F5, S0 at T110-2's lead), adjudication-r7.md
# (Part L's laws as amended by END-L3; Part H's head's citation rule), adjudication-r7v.md, -r7w.md and every earlier
# adjudication where r7y supersedes nothing. J150's round-8 hand-offs: no text on a lock's behaviour under undo, redo,
# a re-grade or a repair, nor on the two-axis lock.
#
# PROGRESS
# - P0 brief read whole (4 routed issues: VF7x-TBL-04, VF7x-TST-01, -TST-02, -TST-03; FAMILY FIX PASS NOTES (1)–(5);
#   NEW OWNER RULES 114–119; ORCHESTRATION NOTES); adjudication-r7y.md read whole (head, decision table, class (A) F6,
#   class (B) B1 – B17, Part H by unit with scope's S1 – S5 and the other units' entries that S2's bars hold, builders'
#   choices, held notes): done
# - P1 issue sources read (famverify-table-r7x VF7x-TBL-04; famverify-tests-r7x VF7x-TST-01 – -05; famverify-generation-
#   r7x for the majors S2's bars hold); the live §13.2 T110 bullet read whole (l. 19211–19680) and §13.8's T110 row
#   (l. 20507) with the bar schedule's rule (l. 20481–20482); §4.2 S3 (6), §4.4 S5d, §4.8 *The harbour mouth* and
#   §2.7's laws located for every reference in the new words; the archives (docs/archive/) hold no form of a touched
#   clause, so nothing earlier is dropped: done
# - P2 10 count-asserted edits (S1 – S5) and the unit's F6 sweep (SWEEP below): done
# - P3 dry run on a copy, word-level audit, hygiene, doc_checks (CHECKS below): done
# - P4 result saved, LANDED: done
#
# DISPOSITIONS (adjudication-r7y Part H · scope) — every issue routed here is a FIX, written as Part H words it; the
# bars of four other findings written as S2 states them; 0 VALID CHOICE, 0 MERGED, 0 INVALID among the issues routed
# here.
#  S1  VF7x-TBL-04 (FIX)  §13.2's T110-4 (c): a third run on which the ring both raised ways meet is shape-locked before
#                         an aqueduct stroke and a raised road are drawn across it by hand and an aqueduct is founded
#                         across it at an epoch (law 1 (10)'s wall side). The model's half, W1·C1's test cell naming
#                         "T110-4 (c) (its shape-locked ring)", is M4 (model's).
#  S2  END + CLASS (B)    §13.2, three insertions holding the majors' fixes by a bar:
#      VF7x-GEN-03, B2    (1) T110-2 (2): a twin-town CITY merged across a ravine — the inter-nucleus route re-solved
#                         by §4.2 S3 (7) so that its deck comes down before the cross wall, crossing it at its gate on
#                         ground part 0, 0 deck lines across the cross wall; a variant with a declared viaduct across
#                         the partition line — the cross wall laid beneath its deck; and, from the shape lock's
#                         milestone, a shape-locked declared aqueduct within the cross wall's height — the cross wall
#                         not laid, `W_RAISED_MEETING`, the stage walled by its enceinte round the union (P1 – P3, D3).
#      VF7x-GEN-06        (2) T110-2 (6)'s fifth run: the carried way's moat deck perpendicular to the channel, the way
#                         re-routed between its gate and its next pinned node where it would meet the channel more than
#                         10° off its normal (P8's pick).
#      VF7x-GEN-01, -02   (3) T110-2 (6): a sixth and seventh run — a gate barred by law 1 (9) alone (a held building
#                         in the raised road's arch vault) moved along the way at stage 1 and at a stage-2 boundary,
#                         F-WALL's raised-way rung not run (P1, P4, P5) — and (1)'s c15 fixture regenerated with
#                         `wealthLevel` raised so that S5d's top-up arc meets the placement-locked aqueduct with no
#                         lawful shape: the arc kept, its shortfall moved on (F-BUDGET-STAGE), the stage walled,
#                         F-WALL's raised-way rung not run (P6, D1, D2).
#  S3  VF7x-TST-01 (FIX)  §13.8's T110 row: "(4)'s hand rows W4, W5, W6, W8 and W10 (M4; V06's E3, which builds
#                         `absorbWall`)" — the W6 and W8 rows moved past their providers with W4, W5 and W10.
#  S4  VF7x-TST-02 (FIX)  the finding's items 1, 3 and 4: T110-2 (3)'s walled port with a declared shore viaduct whose
#                         fixed-place zone holds a harbour-mouth head (the chain at the nearest lawful heads, else not
#                         laid, `W_RAISED_MEETING`); T110-2 (1)'s hand stroke ending under a wall's band or wall strips
#                         and running along within them (bent with `bend.raised.wall`'s keep-clear form, else
#                         refused); T110-2 (1)'s S7 tower in the aqueduct's under-deck strip beside its deck under no
#                         span, standing there. The finding's items 2 and 5 are V06's (V6-1).
#  S5  VF7x-TST-03 (FIX)  (a) T110-2 (3)'s ramp run: "no raised way's ends under the band or its wall strips (… law 1
#                         (4) …), the channel meeting the raised way by §2.7's laws (law 1 (1), (8); … row (e))";
#                         (b) T110-2 (3)'s second castle: "on its next side whose gate §2.7's laws admit (law 1 (5),
#                         (6))". The finding's (c) is V06's (V6-2), its (d) V09's (V9-3).
#
# SWEEP (adjudication-r7y class (A), "The sweep stands with this form": each seat greps its own unit for "bar",
#  "barred", "admit" and "law 1 (" and every parenthesis "(law 1 (…)" that follows a bar or admit test, writes each bar
#  test it finds in F6, and leaves pointers as they are). Searched, line breaks joined, in the base's title block,
#  one-page summary, §0 – §1 (l. 1–517), §13 – §17 (l. 18277–21795), the delegated decisions, the judgment index, the
#  staged and appendix pages (l. 23079–24192) and docs/volumes/INDEX.md, for "law 1 (", "law 1,", "§2.7's laws",
#  "these laws", "the laws admit", "laws bar", "bar", "barred" and "admit" in a family sentence. Found: 73 lines in
#  §13.2's T110 bullet and T110-related bars (l. 19215–19720), §13.5's towers-and-gates metric row (l. 20189: "a deck
#  passing over a trace is no crossing, §2.7's laws, law 1 (1)") and §15.1's O9 row (l. 21388: "its shape where they
#  meet as §2.7's laws give it: law 1 (10), law 2"); INDEX.md holds no family text. Every hit is a pointer F6 keeps:
#  in §13.2 each clause number sits in a bar's expected outcome or seed condition (T110-2's lead and its state sweep's
#  C8, C10 and per-run outcome list among them — "a bar's expected outcome or seed condition … is a pointer and stays");
#  §13.5's and §15.1's are an acceptance metric's and a matrix row's reason. No builder text that decides a bar test
#  lies in this unit, so the sweep writes no F6 edit; Part H · scope lists none.
#
# REFERENCES in the new words, each resolved in the live base: §2.7's laws, law 1 (1)–(6), (8)–(10), law 2 (a), (b),
#  (c), law 3, these laws' *ends*, the held building's strip, the fixed-place zone and the under-deck strip (§2.7's
#  support step (6) and its terms); the way-and-channel table's row (e) (l. 2917); §4.2 S3 (6) (the merge, `T`'s
#  partition line, the cross wall and the inter-nucleus route, l. 6219–6222) and S3 (7); §4.4 S5a *Trace* (2) and the
#  pull's search band; §4.4 S5a *Outer moats*; §4.4 S5d (l. 6711); §4.8 *The harbour mouth* (l. 8401); F-WALL's
#  raised-way rung and F-BUDGET-STAGE (§5.2); `W_RAISED_MEETING` (§5.4); `refuse.raised.meeting` (§7.1);
#  `bend.raised.wall` (§2.7's *down before the wall*, l. 3049; V09 §4.9); `wealthLevel` (the intent's, §7.7; S5d's own test is §13.2's B-CITY `wealthLevel` sweep);
#  `raisedWays.structure.span.deckDepthCm`; `absorbWall` (V06 §2.8's `EvolveOp`; §4.11), V06's E3, M4; J147, J150.
#  The new bars assert outcomes other units write this round from their own Part H entries — P1 – P3 (the merged
#  pair's re-solve and cross wall), P4 – P6 and P8 (the pin rule, S5b's count, S5d's kept arc, the perpendicular moat
#  deck) at pipeline; D1 – D3 (F-WALL's top-up exception, F-BUDGET-STAGE's kept arc, the cross wall in §5.4's
#  `W_RAISED_MEETING` list) at determinism — each as S2 states the bar for it.
#
# HAND-OFF: none. Each other unit's half of these findings is that unit's own Part H entry: M4 (model) for VF7x-TBL-04;
#  V6-1 (V06) for VF7x-TST-02's items 2 and 5; V6-2 (V06) and V9-3 (V09) for VF7x-TST-03 (c) and (d). Schedule: S3
#  writes the one §13.8 change the findings ask; every other new run sits in a clause §13.8's T110 row already
#  schedules — S2 (1)'s twin-town runs in (2) at M3a, its shape-locked variant from the shape lock's milestone as its
#  own words say (J147, J150); S2 (3)'s sixth and seventh runs in (6), an arch-vault clause of (6), at the later of M3a
#  and M6-U's U3; S2 (3)'s top-up run in (6) at M3a; S4's runs in (1) and (3) at their clauses' milestones, the
#  harbour-mouth chain's from the milestone that lands item 106 by the bar schedule's rule ("a bar's first milestone is
#  the one that lands its mechanism"); S1's third run with T110-4 (c)'s paths, its epoch founding at M6-E's E3.
#
# NOT WRITTEN (as the brief says): M4 (W1·C1's test cell), V6-1, V6-2, V9-3 — each another unit's. No VALID CHOICE
#  LISTED, MERGED or INVALID issue was routed here (VF7x-TBL-05, listed, and VF7x-TST-05, merged into VF7x-GEN-04, are
#  not this unit's). Builders' choices (adjudication-r7y: VF7x-TBL-05) go to fix-list.md by the seat that writes it,
#  not here. The held notes (adjudication-r7y *Held for the next full round*, 1–14; note 14 among them: T110-2 (6)'s
#  "that route re-solved to cross under the nearest span the rule admits") get no text.
#
# WORDS (principle (9)): §13.2 29 386 → 30 073 (+687); §13.8 3 032 → 3 037 (+5); unit +692 words. The edits add runs,
#  seed conditions and bars the binding rulings require: S2 +468 (the twin-town runs +207, the sixth, seventh and
#  top-up runs +229, the perpendicular deck +32), S4 +165, S1 +33, S3 +5; the citation edits S5 (a), (b) +24 net (a
#  restatement replaced by the laws' citation, with row (e) named for the channel). 0 words removed from content (no
#  rule, case, value, bar, record field, lifecycle row or test dropped). The unit grows, as a fix pass that adds bars
#  must; nothing in the touched text is narration or a duplicated mechanism.
#
# CHECKS
#  (1) Dry run (apply-blocks.py on copies of the live base, sha256 03573b4f…, and rationale, 7e172500…): 2 blocks
#      found, 2 applied, 0 skipped; audit 2 OK (not OK 0); headings 153 → 153; fences balanced (140 → 140); title
#      block unchanged; PENDING FABLE REVIEW lines 0 → 0; index 805 rows and Part A 805 rows, no duplicate id; document
#      24 192 → 24 228 lines (3 209 864 → 3 213 945 bytes, sha256 e2c6ce59…); rationale unchanged. A line diff of the
#      output against the live base shows 9 hunks, 8 inside §13.2's T110 bullet (l. 19302 – 19650) and 1 in §13.8's
#      T110 row (l. 20507), each an edit listed above; a word-level diff shows only the quoted words changed (each old
#      text once before, each new text once after); no re-flowed line over 120 characters and none opening with a list,
#      table, heading or quote marker.
#  (2) Hygiene of the added text: no review id (VF7, PRB7, R7-, VPC-), no deferral wording (no "TBD", no "open" or
#      "later" as a choice — "at the later of their milestone" is the schedule's rule), no narration; every § pointer
#      resolves (REFERENCES above).
#  (3) docs/validation/bench/doc_checks.py --sections "13.2,13.8", on the live base and on the dry-run output.
#      WARNING (recorded as the orchestration notes ask): "reference corpus INCOMPLETE (missing: captures,
#      research/patreon, research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT
#      authoritative" — provisional. Live: C1 5/0, C2 1/0, C3 81/0, C4 0/0, S1 0/0, S2 317/0 (hits/unreviewed), exit 0.
#      Output: C1 5/0, C2 1/0, C3 81/0, C4 0/0, S1 0/0, S2 317/0, exit 0 — no new hit.
#  (4) Combined check: no other repair-r7y block file targets §13.2 or §13.8 (model §2.7, pipeline §4, determinism §5.2,
#      §5.4, §7.1, §7.3, §7.7; V05, V06, V07, V09 their volumes), so these REPLACE bodies apply unchanged after them in
#      name order; a combined dry run with the base seats' block files as they stood at this seat's close
#      (determinism 5 blocks, model 0, pipeline 5, scope 2): 12 found, 12 applied, 0 skipped, audit 12 OK, headings
#      153 → 153, fences balanced, title block unchanged, rationale unchanged. The seat's scratch work sits in its own
#      folder (scratchpad/coherence/scope-r7y).

=== REPLACE ### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT ===
### 13.2 Per-stage invariants, statistics, cost-model tests, contract tests, B-EDIT

* **Invariants.** The §5.3 suite runs by scope — batch-local invariants per batch, stage-end invariants per stage,
  save / load invariants per document, CI-only invariants (§5.3's digest-maintenance oracle among them, on every
  B-CITY-lite city) in the harness — on B-CITY: 1 000 seeds × the 4 `WaterSetting`s of §13.3 × 3 rungs — seed i of a setting
  `H32("bcity/<rung>/<water>/<i>")`, B-CITY-lite its first 50, rehashed by V12 §2.4's collision rule, and every
  measurement family disjoint from them by that rule — in the nightly tier, 50 seeds per rung in the PR tier (§13.8), all three rungs from M1 (§1.1). Each invariant has an id, a severity,
  a count in the report and a CI threshold: hard = 0 per 1 000 cities; soft within its band.
* **The statistics record.** The **core record** is O(n) and is emitted by every generation within 4 ms at CITY
  (§12.4): counts per entity kind and class; areas per class and band; fixed-bin histograms per district and band of
  plot area, frontage, depth, footprint area and storeys; way length per class; the junction-degree histogram; turning
  per 100 m on ways resampled at 10 m; the walled share and built extent; ladder uses per cause and rung; every
  requested feature's delivery tier (§5.1 principle 7); stage timings. The **bench metrics** — detour index over sampled
  destination pairs, Moran's I, KS distances, junction-to-junction runs, orientation coherence and wall alignment,
  figure-ground metrics on renders (§8.5), tree nearest-neighbour and pair-correlation statistics computed from §8.10's
  stamped scatter — run through `stats(doc, { level: 'bench' })` on demand or in the bench, never on the one-click path.
* **Cost-model tests.** Each stage is timed on **nine sizes — three per rung: the band's bottom, its target and its
  top** — 1 500, 5 000 and 9 900 (TOWN); 10 000, 20 000 and 29 900 (CITY); 30 000, 50 000 and 120 000 (METROPOLIS)
  inhabitants, five seeds each, nightly (the METROPOLIS sizes reported from M1, gating from M2b). A stage's log-log
  slope of time against its declared work measure (its work-limit laws, §5.1 (5), §14) must not exceed **1.15** for a
  stage declared linear and **1.25** for one declared n log n; §12.3's per-rung cost laws are fitted on the same runs.
  **Work limits follow population:** each run reports, per stage, the F-WORK hit rate (work cuts per 1 000 batches), and
  CI fails when the rate at the top of a band exceeds the rate at its bottom by more than 1 per 1 000 — §5.1 (5)'s
  pre-decided coefficient fallback then applies and the sweep re-runs. **Index work** is fitted against commits × level
  size (§3.3). **Batch cost:** every commit record's `work` and its `edgesAdded`, `edgesRemoved`, `steinerAdded` and
  `steinerDissolved` counts stay within a constant × the batch's touched faces — §3.10's O(touched) claim (SCL-1) — and a
  count that grows with the arena fails. The budgets these runs time, and their measurement rules, are §12's: the per-edit cost and validation
  flatness across rungs (§12.6), the memory test per rung (§12.8), the first map by size (§12.5), the pan-and-zoom run
  during an A2 300-dpi export (§12.7), the model max clause judged on re-timed outliers (§12.3), the simulation module's
  occupancy test at M4b (§12.7), all taken in §12.1's timing phase.
* **Document tests.** The entity registry's path test fails when a type is missing from any path — generation, digest,
  render, export, persistence, edit, undo, migration (O11 a) — its cases include `HistoryRecord`, `WaterBody.spring`
  and the `fedBy` links, `Enceinte.arcs` and `stretchClass`, `Gate.mouth` (§2.3, §2.7) and the `Way` and `Junction`
  lifecycles under §2.4's missing and contradictory data; export → import → export is byte-identical over the
  canonical form (O9 a, O11 c); the **document-size test** per rung holds ≤ 320 B per building at CITY (§2.9); the
  schema tests of the generation report (§5.4: a derivation meeting missing or empty inputs gives a whole report, its
  lists `[]`, never absent) and of the disruption budgets (§7.7 item 5: every request kind has its row), and the control
  registry test (§7.8: a disabled state without its reason row fails).
* **Stage contract tests.** The same inputs and stream give the same digest on Node x86 / arm64, Chromium, Firefox and
  WebKit, with workers on and off and pool sizes 0–3 and no merge raising `E_SCOPE` (§3.3 pool step 3, §3.10's
  pool-scope row), beside §6.5 (9)'s determinism tests (each on one fixture per base
  rung and a METROPOLIS fixture at the population cap). **Op-order determinism:** a
  declared batch's ops permuted give the same result (§13.1); a callback-form stage run twice, on a slot-renumbered
  arena and inside the pool at sizes 0–3 gives identical digests (issue order; op permutation does not apply to it,
  §3.3). S8's working block equals S9's committed block (Hausdorff 0; §3.7). The stored `market.siting` cell `portRef` equals the median port demand fraction recomputed by running S0–S2 alone on every B-CITY harbour seed, from M1, where the scripted pass first sets it (§4.2 S3 (12); J-A24.43); a differing value fails. The per-stop placement digests of §13.3
  are the contract test of S13b; a stop placed whole and placed one unit per step gives identical placement digests
  (§8.3, §9.2). The stamp-tile asset's hash and rebuild tests and the view-data contracts are §8.3's; the shipped stamp
  tiles pass §8.3's seam check (§8.10). **The host-content door (door 4, §11.4; J-S46):** a fixture `ContentProvider`
  registered after §11.4's double-run check replaces the roster, the siting and the people derivation at their call
  points (§4.2 S2, §4.7 S10b, §10.3), its outputs recorded in the document; the document replays to its digest with the
  provider unregistered, from the recorded outputs, and a provider whose two runs differ is refused registration.
* **Stage property tests.** 10 000 coast / island / fjord / sky outlines per intent → 0 self-intersections and 0 untyped
  loops; 0 overlapping or self-intersecting plots on concave, notched and curved blocks before any fallback; attached
  and party-wall shares on curved-street blocks inside the dense band; roster `manifest(P₂) ⊇ manifest(P₁)` for P₂ > P₁
  on 1 000 seeds; the stage-3 contract (the union of composed wings equals the outline, §2.6); the `ringed` fixture (≥ 3
  closed rings, radius CV ≤ 10 %); a B-CITY sweep over `wealthLevel` ∈ {0, 0.5, 1} (population ± 5 % on ≥ 95 % of seeds,
  walled share inside its rung band, §4.2 S2); the derived-complete digest identical across district orders; opening a
  person leaves the digest, the log and the undo stack unchanged; **heights** on 100 % of buildings, wings, towers and
  wall runs, and on hilly golden seeds and after every terrain stroke 0 wings whose `baseCm` differs from the highest
  terrain sample under the wing plus the plinth, user-edited bases excepted (§2.6, §7.3 (a)); **0 `E_KEPT` on the
  one-click path** over B-CITY (a stage whose domain overlaps an earlier stage's kept content is a pipeline bug); every
  gate and weld vertex on its trace, and stage 1's trace within 40 m of its boundary except along an `on_enceinte`
  castle's shared stretch; 0 lanes crossing a wall strip and 0 L3 band faces split or cleared (NF-P5); 0 S7b claims
  meeting a wall strip; the seam exception (NF-P6) on New random of 20 districts per B-CITY-lite city; the union rule
  (composed wings = outline) on curved-street row fixtures with `quad` wings, including rear lines oblique to the
  frontage — bent party-wall chains, `corners` recorded, the ridge at the arc-length midpoints; decks on 100 % of
  way–water crossings, moats and canals included; harbour fixtures with a two-arm mole and a detached breakwater pass
  the crossing invariant as harbour works, and a `quay` way drawn across a river without a deck fails it (§5.3); the
  walled coastal harbour fixtures of §4.2 S3 (11) — the harbour outside the stage-1 region, with and without
  `moat: 'inner'`, sealed with `N = 0`, and a polycentric coastal town whose nucleus nearest the harbour has no unforced
  pick left — each with the harbour served, 0 non-gate ways reaching the trace, every way–moat crossing on a deck, roads
  leaving = the N main gates plus a harbour gate of §4.2 S3 (7) where one was placed, the harbour route at most 1.5 ×
  the plaza ↔ harbour least-cost lattice path with the wall ignored, and one main gate on the harbour side (§4.2 S3
  (4)); a river town whose growth leaves crossing sites unused — 0 site furniture and 0 site marks in the display list,
  every built bridge's span the way's own L1 edge; an epoch whose growth builds a site; a drawn bridge 15 m from a site
  builds that site, and one 30 m from every site adds a deck by one L0 shore-split batch, §5.3's crossing invariant
  holding throughout (§4.2 S1 (5)); a canal across the settlement perimeter — 0 district faces outside the perimeter,
  the land on both banks the hinterland's; `castle: 'on_enceinte'` with water in reach, with and without a city moat — 0
  trace–water crossings off a river's water gate, the outer-arc channel beside the shared stretch, the town side
  dry-ditched or plain by its row; every seam edge typed, a way-less shared reservation boundary typed `reserve` (II.5).
* **The edge suite B-EDGE** — one fixture per row of §4.13's edge table (its EP rows) and per cell of its combination
  table, at every rung the row names and under every preset (the parity presets, each layer on and off): the home's
  stated outcome, hard, 0 per 1 000.
* **The rendering, label and export edges** — the T-ER rows of §8.11, §9.7 and
  §11.6: census rows of §8.3's kind, each fixture holding the outcome and ladder rung its row defines; their bars are
  those rows, scheduled by §13.8.
* **B-EDIT and the locality oracle.** §7.3 item 7 (i)–(iii) and (v), and (iv)'s byte identity of Regenerate (keep
  settings), run **once per sequence** — at its end and at one seeded random position — never per edit. Fixtures: §7.1's
  empty-edit forms, each leaving `nextSeq` and both digests unchanged; §7.2's lock, pin and declaration fixtures; §7.4's
  *every kind at the edit boundary* fixtures — each kind edited, locked, undone, saved and loaded, and regenerated at
  every rung where it exists; the re-parenting set (`drawBoundary`, district merge and split, `outskirtToDistrict`, regenerate around a lock, the
  id-recycling case); terrain-brush sequences in both water modes, and course-knot, drawn-water and drawn-bridge
  sequences with §7.3 item 7 (v)'s assertions and its water-edit fixtures; table weight edits and row insertions; drawn
  features mixed with later attribute edits; epochs and rebases; an epoch after 20 edits and a Re-derive from S10 after
  20 edits, each at pool sizes 0 and 3 with identical digests, every freeze finding every dynamic grid and tombstone set
  empty after its rebuild (§3.3 pool step 1) and no merge failing with `E_SCOPE` (§3.3 pool step 3, §3.10's pool-scope
  row); undo and redo from several sessions and §6.5 (9)'s truncation, naming and
  version-pinned cases (§7.4); an undo after a reload of an unshared document undoing the pre-reload event (§7.4); New
  random on minimal scopes (§5.1 (6)); the naming-collision replay fixture (§7.3 item 7 (i)); the B-EDIT-lite identity
  fixtures (≥ 99.9 % of addresses kept under 1 cm perturbation, §6.3); §7.3 item 7 (vi)'s shared-edge identity, and
  Regenerate (keep settings) of a block holding a rich compound whose yard has a formal-garden grid and an orchard part
  with edges ending on the house wall — byte-identical to the one-click result, the wing rings after generation already
  carrying those wall vertices (§2.6); a warp over a square keeping its fountain, over a yard keeping a user-moved tree,
  and one halved by a pinned pin (§7.4); a warp and a `moveVertex` over a lit street with an inn — every street light,
  the inn's door light, a hand-placed light on a pin and a junction light on a tunnel carried in their host faces by
  §7.4's rule, the door light keeping its fraction of the footprint ring's edge nearest it and never re-seated, through two successive warps, the second starting from its lattice-rounded point off that edge, and passing §5.3's light row after each, a
  light pushed inside its `sizeCm` clearance re-seated, one whose inset empties re-placed when generated and orphaned
  and reported when hand-placed; an access point's opening carried in its ground host; a building under a demolition
  Works whose kept rings take their mean-value images unre-seated; undo restoring every former point byte for byte and
  a replay reproducing them (§7.4; J-A68.73); **§2.6's test** — a warp and a `moveVertex` over a built block with an L house,
  an overlapping T, a curved row of quads and a holed footprint: after each, every wing union equal to its footprint
  face (integer equality), every carried ring simple, every roof line inside its footprint, de-rectangled rects turned
  quads, a neighbouring plot re-fitted onto a shared party wall adding its corner to the wing ring along that wall, undo
  restoring every ring byte for byte and a replay reproducing them; and a building with a hand-built stored
  `Composition` — its composed wings the base wings each cut in two, a court on the footprint's hole, a tower centred on
  a corner and one inside, rooms in one wing — whose composed wings unite to the moved footprint face after each move,
  its rooms inside, its tower centres inside or on it and its wings reaching every storey the base wings reach with at least their area at each (the storey rule of §2.6's stage-3 contract), undo restoring it byte for byte — the stage-3 intake runs the
  same test with every fixture building's composition stored (§2.6); **load verification** — an edit within 100 ms of
  the state becoming editable on an edited CITY document, with a mismatch forced by a snapshot whose one moved footprint
  has its recorded digest recomputed to match, each choice taken in turn: the edit applies at once, and after either
  choice the session's digest equals the digest a fresh load of the saved document replays to, and that load reports no
  mismatch; the open-to-editable time against T(B); a snapshot with one moved footprint and an unchanged `model.digest`
  — its chunk hash rewritten, and not — reported as a corrupt cache and loaded by replay, never verified and never
  offered as the saved town, the session's digest after the replay equal to a fresh replay's (§2.9 steps 3–4); the same
  snapshot under a forced §6.2 (iii): "trust the saved town" and a save wait for the recomputation, the mismatch
  withdraws the keep, and the snapshot is never kept; a snapshot with one altered naming record — a corrupt cache when
  its `recordsDigest` is left as written; rewritten to match, loaded, reported by the replay as a records mismatch, the
  edits made meanwhile re-applied, then verified, and a corpus selection made afterwards renames exactly what a session
  that never saved renames; an Adjust made during load verification in an epoch-grown town, saved and reloaded, reports
  no records mismatch; a `drawBoundary` that moves surviving blocks, saved and reloaded, reports no corrupt cache;
  **naming inputs** (§6.3) — a selected user corpus and an edited naming row rename exactly the unedited names citing
  the changed slices, listed in the fate report and stored in the event, in a fresh and in a rebased document, every
  other name and naming record byte-identical, 0 duplicate ids and 0 silent re-binds; a bridge re-sited afterwards keeps
  its new name; an `editTable` of one naming grammar row renames exactly the unedited names citing it; a culture row
  with a street corpus and a district-name corpus, the street corpus replaced — every district and quarter name and
  naming record byte-identical; a frozen fixture whose naming row changed imports with its renames listed, and a New
  random made afterwards renames nothing outside its scope; a canal carved across a wall and a river move whose bank
  cuts a glacis line, each committing with 0 NF-P5 violations, and a lane drawn across a wall strip refused (§5.3); the
  20-epoch test — a TOWN with ≈ 30 % churn per epoch keeps its heap ≤ 1.3 × and its document ≤ 2 × those of a freshly
  generated town with the same live entities (M4); and **the thirteen MFCG asks of §7.4** as scripted scenarios, each
  reporting its locality share, its invariant results and its re-run cost against §12.6.
* **The faithfulness campaign (O9 c; §7.3 item 7 (iv)).** New random is judged by a campaign, not per sequence. Each
  nightly run draws **n = 800 regenerated scopes** from its B-EDIT New-random events — 400 block scopes and 400 district
  scopes, by a seeded draw; a night whose B-EDIT run holds fewer than 400 New-random events of a kind adds New random on
  seeded scopes of that kind in its B-CITY-lite towns until it has 400 — and for each generates **K = 50 from-scratch
  references** of the same scope: the same upstream state and context, rerolls 32 768 + i for i = 0 … 49, a range no user
  reroll reaches. For each of four statistics (median plot area, median frontage width, density, attached share) the
  rank r of the regenerated value among the K references counts the references below it plus a uniform draw from 0 … t
  over the t references equal to it (drawn from the campaign's own stream), so r is exactly uniform on 0 … K for a
  perfect regenerator, whatever K and however discrete the statistic. The ranks are binned into 10 bins of
  ⌊r · 10 / (K + 1)⌋ with expected counts proportional to the number of rank values each bin holds; a χ² test per
  statistic gives four p-values, and the campaign **fails when Holm's procedure rejects at family-wise 0.01** (the
  smallest p-value below 0.0025). Cost ≈ 40 800 scope generations (800 × 51), ≈ 12.5 CPU-min at §12.6's block and
  district costs (20 400 × ≈ 6.6 ms + 20 400 × ≤ 30 ms), inside the nightly budget (§13.8). **Calibration (executed,
  `docs/validation/bench/fixall_scope_r3_o9c_n800.py` → `.out`; `fixall_scope_r2_o9c_power.out`):** the four statistics
  move together, and at ρ = 0.8 a campaign of 400 scopes catches a +0.25 sd bias in only 92.2 % of nights and a 0.8 ×
  too-snug regenerator in 95.2 %, hence 800. At n = 800 a perfect regenerator fails 1.0 % of campaigns on continuous
  statistics (31 / 3 000 at ρ = 0.8, 15 / 1 500 at ρ = 0) and 1.4 % (14 / 1 000) on heavily tied, scope-varying discrete
  ones; a +0.25 sd bias and a 0.8 × too-snug regenerator are caught in 2 000 / 2 000 campaigns each at ρ = 0 and ρ =
  0.8 (95 % lower bound 99.8 %), a 0.6 × too-snug and a 1.5 × too-loose one in 500 / 500, and at ρ = 1 the bias in
  99.3 % and the snugness in 99.7 %; without the randomised tie-break a perfect regenerator fails every campaign on a
  tied statistic (`fixall_verify_scope_o9c_rank.out`). A failing statistic's histogram names the fault: a hump is too
  snug, a U too loose, a slope a bias. **A failed campaign is re-run once with the next campaign seed:** a perfect
  regenerator fails two in a row with probability ≈ 1–2 × 10⁻⁴, and a fault of the sizes above is declared on the night
  it first runs with probability ≥ 0.996 at ρ ≤ 0.8 (≥ 0.985 at ρ = 1). A second failure is a regeneration defect —
  entered in `known-defects.json`, and M3a does not exit until it is fixed (§16), because no threshold can be relaxed
  without passing a wrong regenerator.
* **Control sweeps.** §7.8's statistical monotonicity and continuity: 21 steps × 50 seeds at TOWN and CITY (nightly);
  METROPOLIS in the milestone tier. The population control's sweep also reports the F-WORK hit rate per stage, which
  must stay flat across each band as above.
* **Option-interaction matrix.** Every pair of toggles rendered and diffed; no option silently disables another (O12 c).
* **Documentation coverage.** 100 % of controls and entity kinds have a guide anchor (§14 `@plat/docs`); every in-app
  help link resolves (CI link check); the release notes list every open entry of `known-defects.json`.

* **The owner-item bars and their convention.** The bars `T⟨item⟩-⟨n⟩` of the owner items are stated once, here, and prove
  the mechanisms at the homes §0.2 names. Every group keeps one convention: (1) a bar is hard — 0 violations, or 100 % —
  unless it names a band; (2) it runs in the CI tier and from the milestone §13.8's schedule gives it; (3) a staged
  engine's bars run on hook fixtures, its conversions applied by hand, until the engine lands, when the same bars bind
  it and the volume tests the table at the end of this section names take the clauses it names; (4) a bar that meets a
  golden follows §13.3's declared-shift rule — no golden exists before M1 (D-24), so the attributes that land before it
  need none; (5) every no-op pin is a `NoOpPin` registration on V12 §3.7.8's engine, its off form the item's
  switch cells in volume 11 (V11 §3.24.0 for items 110, 111 and 113–115, V11 §3.7.4's web off form for items 105 and
  107, the cells the bar names otherwise) — a view pin's off form the view state its bar names (`view`: items 117,
  118, 120–122, 124 and 126), an input pin's the input withheld (`input`: item 125's host context) and an entity-scope
  pin's the entities its bar names (`entityScope`: item 123's never-decayed buildings under no disaster look) (V12 §3.7.8 (5)); (6) a bar that compares with a random or shuffled baseline is a `NullModelSpec` run by V12 §3.6's
  harness, §13.7's correlation row its pass rule unless the bar states its own, and a tendency bar of another shape —
  "in most placements", "at or above the floor", "at the ranked share", "at every rung", "rises with", "higher with than
  without", "rising monotonically", "differs from", "beats the baseline", "within tolerance of the base's" — a
  `StatBarSpec` run by V12 §3.6b under §13.7's tendency row (V12 §3.6b's bar map lists each); a fixture
  property is a conformance clause, listed in the harness registry's `conformance` list — items 120–126's statistics
  and pins measure such clauses (V12 §3.15); (7) a bar a register line names
  as `bar.<id>` that no `NullModelSpec` or `StatBarSpec` carries is a `BenchBarDef` (V12 §2.1; `@plat/testkit/bars`,
  §14) keyed by the bar's own id, registered by the seat landing the milestone whose exit writes the entry — the base's
  T16-4 by volume 11's C1 seat (V11 §8), T112-1 by the M3b seat, T113-1, T113-3, T113-4 and T113-6 by the M6-E and M6-U
  seats, and the bench bars of items 114–126 by the seats landing their mechanisms (§13.8's schedule). The entity registry's path
  test (above) covers every record and attribute §2.8's registry lists — `Passage` and the tunnel's `navigable`,
  `headroomCm` and `closure`, `Block.due`, `ElaborationRecord`, `Works`, `LightSource`, `UndergroundSystem`, `Gallery`,
  `Chamber`, `UndergroundLink`, each kind's dossier paths, `Plot.tenure`, `District.character`, `identity`, `pressure` and
  `nameHistory`, `Assignment.state`, `Institution.powers` and the staged records, schema-complete and empty — and the
  enumeration test every event kind of §7.1.
* **Items 8–31.**
  * *Decline and regrowth (item 8; §4.11).* (T8-1) every `DeclineOp` kind applied by hand on the golden TOWN undoes to
    byte identity; (T8-2) the regrowth-first fixture — a TOWN with 12 % of its buildings vacated, derelict or cleared by
    hand, then grown by +6 % population: 0 new S5 faces, ≥ 95 % of the delta placed inside the old plan, every
    vacancy-run share within ± 0.02 of its table share; (T8-3) 20 epochs of hand-applied decline and regrowth keep the
    address of every ruin, trace and superseded ring (100 %), and no cleared building gets a tombstone unless
    demolished or succeeded, and a front building made a footprint trace or demolished leaves its passage with no `frontBuilding` and no base wing spanning it, the undo restoring both (§2.6's `BaseWing.spans`); (T8-4) the exposure function is monotone in each driver's weight, and its chance share
    equals the table's; (T8-5) the salvage ledger's credits equal the yields of the robbed and the cleared, are never
    negative, and every shortfall is reported; (T8-6) a CITY dropped below 10 000 inhabitants loses its islands over
    their dwell spans — waning, settled, fallen — never in one epoch; (T8-7) after a −6 % population fall on a TOWN
    whose buildings are let out, no building with a surviving household reads `vacant`, and every `relet` down marks
    an unstored plan rung `stale` and re-cuts a stored plan inside its own event (item 28 (f)).
  * *Islands (items 10, 13, 15; II.6).* (T10-1) 200 CITY seeds with `recipe.layers.islands` on: a town supply below the
    threshold gives 0 islands, and the supported area is monotone non-decreasing in the town's supply and in the
    carried districts' supply over the band rows; (T13-1) TOWN and village requests never carry a sky allocation; a
    CITY with the setting off carries none, and its ground digest equals the realism golden; (T15-1) 500 CITY seeds at
    the target at each of `wealthLevel` 0.5 and 1 with the setting on: for each count 0–3 the number of seeds drawing
    it lies within ± 3 s.e. of its expectation under II.6 (4)'s slot law at each seed's own h(S_town) — with the
    defaults a count of 0 has probability 1 − 0.6 · h(S_town); on 1 000 seeds of a hook fixture whose built land lies
    wholly in the rich band every count 0–3 is observed, the sky's own bars being V05 §7's; and hiding the sky layer changes no model digest (J-A15.01).
  * *The underground (items 11, 12, 14; II.6, II.7).* (T11-1) tunnel conversions by hand undo exactly; a `caveIn` given a stretch splits the tunnel at the stretch's widened ends (II.6, §6.3; J-A11.43) — the first-vertex part keeping the address, every part continuing the lineage, the chambers and access points re-pointed, and each underground block's `Frontage` that spans an end split there (each part beyond an end a new record with its kerb edges' rows, one spanning both ends of an interior stretch split in three, each part keyed by §6.3's rule for a split `Frontage` and re-pointed to the part it fronts) — closes only the plots fronting the stretch, leaves U1 holding on every plot, and its undo restores the one tunnel record and each split `Frontage`'s one record; no
    `EvolutionStrategy` plan on the hook fixture contains a tunnel `demolish` (a lint); a sealed tunnel persists at its
    address and reopens; (T12-1) a schema fixture of one underground neighbourhood — two navigable tunnels, a junction,
    six cells, one vault, one stair, two gratings — validates and passes every row of §5.3's U1–U3 family: each
    underground plot's frontage rows on exactly one navigable open tunnel run, no `way` chain and no `alley` face on
    the underground arena, every building's frontage side on its plot's frontage edge, ≥ 1 access per neighbourhood,
    every access point in public ground, a yard or a building's basement — a `cellar_stair`, `ladder`, `hatch` or
    `door` only from the basement of a building II.7.3 admits (its neighbourhood rule's class row or a `secret` plot, or
    its *Basement accesses*, item 64) or that an access edit gave one (§7.3 item 9) —, every `grating` on public ground, 0 underground faces under an excluded ground face (also on
    B-CITY-lite with the `navigable` preset), and the underground stage's commit records holding 0 writes on the
    ground `PlatKey`; the underground reroll-isolation fixture leaves the ground byte-identical, and the cut-away or
    overlay draws one depth band at a time (§8.4); (T14-1) the TOWN
    existence draw's frequency over 1 000 seeds at three populations × three wealth levels lies within II.7.1's law
    ± 3 s.e. and never reaches 1; `Features.sewers` is true on 100 % of CITY and METROPOLIS seeds; a TOWN with `off`
    and a village request carry 0 tunnels; with the layer hidden and a parity preset (`MFCG` or `FTG`) on, a CITY's render matches, pixel for pixel, the render
    the same seed gave before the staged stages registered; under the default presets the ground differs only by the
    households and `preferred` uses S7b (6) and (7) send below, a one-time shift of the M6-U output version recorded in
    `plat/goldens/` (§13.3).
  * *Assignments (items 16–19; §4.7 S10b, S11; §4.11).* (T16-1) hard relation rows satisfied on 100 % of placed items;
    every unplaced item reported with its blocking rows and ≥ 1 closest option; soft-row satisfaction ≥ 95 % reported
    per city — O7 (b) extended: noxious trades downstream or extramural, water trades on water, the market hall at a
    tier-1 junction or gate, inns at gates; (T16-2) hard supply edges within their `maxDistanceM` on ≥ 90 % of items
    at generation, the rest reported; (T16-3) the one-solver contract — S10b's placement of a class and an `assign` of
    the same class from the same state give the same plots; (T16-4) the detour factor — block-raster distance against
    the way-graph Dijkstra within the factor's band on B-CITY at M1, the fallback a per-rung refit; (T17-1) a hand
    relocation keeps the use's address, the building persists vacant with its `formerUses`, and undo restores;
    (T17-2) a pinned assignment never moves under an epoch, and the use row of the churn cap holds; (T17-3) one seed
    with one circumstance timeline replays to a single digest of openings, closings and moves; (T18-1) a designation
    mutation keeps every kept part byte-identical (leaf digests) and leaves everything outside its event's effective scope untouched (§7.3 item 1: the plot, its joined neighbour, each displaced use's new site and the buildings and plots its capacity re-homing touches; the locality oracle); (T18-2) locked parts are never subtracted; (T18-3) A → B → A by the
    inverse mutation is byte-identical when nothing else changed, and one change from one starting state yields one
    mutation record on every host; (T18-4) S11 run as a mutation from the empty design reproduces generation
    byte-identically; (T19-1) every roster class has a designation template with every band row (registry test);
    (T19-2) the size budget is monotone along prosperity (Spearman ≥ 0.9 over B-CITY) and continuous between adjacent
    samples by §7.8's rule on the template's continuous columns — two smiths a few streets apart differ by degree;
    (T19-3) a `setAttr` material change leaves the geometry subtree of the digest unchanged; (T19-4) with no epoch
    every residential building houses at least one household and at most its capacity (§2.6's function) — the households S10b placed in its slot (one to its template row's `households.built`) clamped into [1, capacity], but for the moves §4.7's overflow pass reports — every building S11 builds for a slot without `houses` (§10.2; `BuildingSlot.unhoused`, §2.5) houses none, no plot's site plan holds a `required` structure below its least `count`, and every household S2 demanded (§4.2) is housed or reported unplaced by F-SITING (§4.7, J-A28.46); on a fixture whose district holds a live-in workshop and no household of its band or drift, the workshop's plot keeps its use and its main slot, which S11 builds without `houses` — `BuildingSlot.unhoused` set (§2.5), capacity 0 (§2.6), housing none, `Building.dwelling` absent — the typing reported (§4.7); on a dossier fixture whose squalid district's shells hold fewer households than their template rows, every household that fills the dossier's population is housed — those no building has room for in a residential slot the `dossier` request re-provides in their district —, no building exceeds its capacity, and each re-provided slot is reported (§7.7 item 2; the dossier clause, from M3a).
  * *The dossier (items 20 and 22; §7.7).* (T20-1) a map delete of a dossier-backed element re-places it coherently from
    the same seed, every plot outside the disruption set byte-identical; (T20-2) by §7.7's lapse rule, the rejection lapses at
    a dossier event touching its block (the dossier-event clause) and at the first epoch whose population target has moved
    from the one it recorded by more than the roster tolerance (± 5 %, §4.11; item 76), a drift inside it lapsing nothing
    (the epoch clause, from M4), and an undo of a lapsing epoch outside the port's session `host:port` restores the hold, while an `undo` naming a lapsing event of session `host:port` (a dossier event, or a port epoch whether or not it carried a dossier change) returns F-EDIT (§7.4 *Replay semantics*); (T20-3) a blocked positive placement returns its blocking rows and ≥ 1 closest site;
    (T20-4) generator-added filler deleted, the dossier's housing re-provided elsewhere; (T20-5) the one-way
    door (item 20 (a)) — an enumeration of the bridge's message kinds (§11.3) finds no PLAT → host message that
    addresses the dossier (`doc.changed` carries map-document events only, `report.changed` the map's report), and over a
    B-EDIT sequence `report.changed` carries every rejection, placement, lapse, relocation and mutation record the
    sequence made (§5.4's entries); (T20-6) by §7.7 item 2, a map `unassign` of a dossier-backed element, a map `setAttr` of its use or class, a hand `convert` `closeUse` of its use or `mutate` of its plot to another designation, and a plot `join` or `split` whose fate would demolish the building that houses it each return F-EDIT with `rejectSite` and `placeAt` offered and change nothing, while a `relocateUse` of it commits, and a `revert` of it skips every later event of session `host:port` that placed or re-designated it, its dossier content unchanged (§7.4 *Replay semantics*; item 20 (c)) (the refusal clause); on a B-CITY dossier fixture whose dossier-backed use stands in a declining quarter, a hand `convert` `vacate` or `demolish` of the building that houses it returns F-EDIT, and in every epoch whose use step, redevelopment, population fall or conversion reaches the use or its building the use is never closed and its building is emptied or removed only after the use has moved — a pinned use keeping its building (§4.11's *Dossier content across epochs*) — with §5.3's dossier row holding after every epoch, and an `undo` naming an epoch of session `host:port` — one that carried a dossier event in `EpochInputs.dossier`, and a year-end epoch that carried none — returns F-EDIT and changes nothing (§7.4 *Replay semantics*) (the epoch clause, from M4; J-A17.01); (T22-1) the same history from
    the same seed gives one digest; (T22-2) two histories reaching one dossier give two valid maps whose differences
    are confined to their disruption sets; (T22-3) an over-budget dossier event lands and is reported; (T22-4) a
    brand-new map from a dossier holds every dossier element from the start, and everything outside the report is
    byte-identical after any dossier event. §7.7's precedence (a dossier event is never refused by a lock or a pin; it
    supersedes the lock on what it changes, reported orphaned): (T20-14) a dossier rename on a locked name path, and a
    `ruined` and a `removed` state on an institution whose building is locked — each lands, the lock is reported
    orphaned in the event's disruption report, and every other locked entity is byte-identical; (T20-15) a dossier
    population fall over a town whose remaining households all live in locked dwellings — the population met within
    the roster tolerance by `relet`s down, every locked building's state and shell byte-identical, the emptied ones
    counted in `uses.heldByProtection` and no `vacate` emitted on a locked or pinned building; (T20-16) a fall over a
    town whose remaining households are all locked — met within the roster tolerance, the locked and pinned households
    taken in the roster's suffix order, every superseded household lock reported orphaned.
  * *Emulation (items 23, 24, 26, 27; §7.6 with §4.2, §4.9 and §4.5).* (T23-1) with the parity presets `MFCG` and
    `FTG` every `extension` cell reads 0 or off and B-REF's parity rows hold; with the default preset the extensions
    run at their table values; a registry test that every table cell has `provenance.source` and, where it extends a
    reference, its `extension` marker; (T24-1) under the defaults the principal market sits on the plaza for ≥ 90 % of
    inland walled B-CITY seeds and elsewhere for ≥ 50 % of port seeds (§13.7's row); (T24-2) the market count equals
    the roster's demand; (T24-3) no two market reservations share an edge or lie within `market.minSeparationM`;
    (T26-1) wood area lies within the fuel and timber rows' demand, the import share reported; (T26-2) the `fill`
    mode at TOWN and CITY on flat fertile fixtures and `perimeter` at METROPOLIS or on hilly fixtures; under `perimeter`
    and `rivers` no farmstead plot exists and every farm household is allocated to a town district; on an arid river
    fixture at TOWN on flat fertile land the mode is `rivers` and every field lies within `riverBandM` of a bank but
    those of the band's reported shortfall, laid beyond it as `perimeter` lays them, and on an arid fixture without a
    river the mode reads as `perimeter`; (T26-3) with
    `reserveArable` on, fertile land outside the boundary ≥ the reserve wherever the fixture makes it feasible;
    (T27-1) a schema test that the band set has one `middle`, that every band-keyed table resolves a row or an
    interpolation for every band, and that the parity preset's household shares equal FTG's captured distribution;
    (T27-2) the shanty fixture — an average band of poor gives a shanty kind once half the stages have run, the
    extramural share reported.
  * *Terrain and water (item 25; §4.11).* (T25-1) a hand `reclaim` and a hand `siltReach` are byte-identical outside their
    footprint, in the carve fixtures' form (§13.1), and undo exactly.
  * *The plan rung and elaboration (item 28; §2.6 beside §2.8's record, §2.9's cache and §4.1's policy) — the B-PLAN fixtures.* 24 fixture
    buildings (rectangles, L and T shapes, a court closed by a U, a quad from a curved row, a rectangle carrying a round tower, a rectangle holding a round tower wholly inside it, a rectangle carrying two round towers whose rings overlap, a T of two overlapping wings whose second wing holds a round tower that also overlaps the first, a rectangle carrying a stair turret (a round tower whose spiral core's bay fills its round room), a
    manor of three wings at unequal storey counts), each in six classes and three bands with one to four storeys, the
    entrance sets of item 29 and a cellar wherever the class row gives one; from M6-P's intake, the plans of every clicked
    building of B-CITY-lite as well. Hard: (T28-1) each room the programme marks hard is present, and soft rooms are
    delivered, folded into a neighbour or dropped, each with its tier in the report — except on a building with no
    storeyed wing, where a room, hard or soft, whose storey rule admits none of its basement storeys is dropped under
    the plan report's note `solidMonument` (E-28) and listed in the report with no tier (V03 §3.1 step 2, V03 §3.2 A5 (b),
    V03 §2.3); (T28-2) starting at the main entrance — on a building whose every ground wing is solid, at the landing door of the
    first storeyed wing its stair chain reaches (§2.6 *Entrances* rule 5; V03 §3.3 S6), and a building with no
    storeyed wing has no room above the ground to test, its basement storeys, where it has a basement, reached from the
    room its outside door at `basementDoor(b)` opens into (V03 §3.1 step 2) — and, for a basement whose
    `Basement.access` is `external`, at its outside door where step 3 opens one (§2.6 step 3), openings and stair cores
    lead to every room of every storey but a structural face's (roles `stack`, `shaft`, `column`, V03 §2.4) — a
    concealed room, for a key that admits its use, from its concealed entrance where it has one (item 63), a lifted
    chancel through its choir flights (V03 §3.7.6), and a wing standing on another through the exterior flights of
    its stair chain and its landing door, terrace exit or terrace door (V03 §3.3 S6); each entrance gives onto a room; a passage can be
    entered from either of its ways; (T28-3) stairs stacked — a stair core occupies one bay through all the storeys it
    serves, and the basement is entered by that core, through a trapdoor — the one `Basement.access` names, or the `trapdoor` core the plan reports where no bay of the core fits the basement ring or, for an external access, where `basementDoor(b)` gives no door (§2.6's fallback, step 3; J-A29.25) — or, for any other external access (a walk-out, or a building with no storeyed ground wing), by its outside stair at `basementDoor(b)` (V03 §3.7.1); (T28-4) the outer walls
    coincide with the wings: on each storey the rooms together cover exactly the extents of the wings reaching that level
    plus the span ring of each passage a wing spans, at the ground storey only — the passage room (§2.6's fourth rung) —,
    each exterior wall segment sits along the edge of such an extent or span ring, each room's ring is simple and lies
    within its wing's extent at its storey (the passage room within its span ring), each composed tower's round room at each storey the tower reaches — with any spiral core's bay (`StairCore.tower`) or chimney stack standing in it, or that bay alone where it fills the room (a stair turret) — covers exactly the tower's ring there less those of the earlier towers in the clip order that the tower overlaps (§2.6's stage-3 contract), and no gap or overlap remains between rooms (§3.10's seed-tiling row per storey); (T28-5) each chimney rises from a hearth's
    column, and a dormer exists only where a roofed room needs light; (T28-6) one building state, one plan, host after
    host (§6.5 (9) applied at the building band); re-rolling the layout preserves the stair core, the wings and the
    entrances bit for bit, and re-rolling the roles keeps every ring and every opening's position bit for bit; (T28-7) no edit or
    re-roll of a plan touches anything beyond its own building; (T28-8) `plan()` meets §12.7's row at its median per
    building, one plan for each click, and the cache stays within §12.8's line; (T28-19) the JSON `plan` block validates against its schema
    and round-trips, and every storey scene's portals equal the plan's openings and entrances (§11.1). Every T-V3
    test (V03 §7) runs on the same fixtures from M6-P's intake, T-V3-23 (a)–(d), (f) and (g) also at the model level
    from the crypt's landing (M6-U; file f item 238). Soft bands, reported: no unit room used as a
    passage (its door count within its row's cap); corridors never doubled in parallel; the share of each storey given
    to circulation, by class and band; room areas ordered as their rows' target areas; unit and service rooms no shallower in the door
    graph than the shared and circulation rooms of their storey; a loop in the door graph only when a row calls for one (§13.7's row). Elaboration: (T28-9) click order
    changes no digest — one document elaborated in two orders has identical model, records and derived-complete
    digests, and the cache holds byte-identical results per (entity, rung, input digest); (T28-10) a `stale` rung
    re-derived by mutation keeps every surviving room's address, and viewing never re-derives a `current` rung;
    (T28-11) an evicted cache re-derives to the same bytes, and a corrupt cache chunk is dropped and re-derived, never
    trusted; (T28-12) clicking a neighbourhood makes its buildings' `wings` rung `current`; clicking a building does
    the same for `plan`, after `wings` where that is still absent.
  * *Stage 3 (V02 §7).* Every T-V2 test (V02 §7) and the B-MASS fixtures, in the tiers V02 §7.6 and V02 §7.7 name — the
    bars of V02 §7.7 whose subject a base item lands before M6 run from that item's milestone (T-V2-44 – T-V2-47,
    T-V2-50 and T-V2-51 at M3a; T-V2-52 at M2b).
  * *The interior ladder (item 28 (f); §2.6).* (T28-13) the owner's bar — when a building's occupants' band falls two
    rows, the re-cut plan houses every household of the building (`Building.households`, §2.6) with its own door off a
    corridor or stair hall, within unchanged wing rings and around an unmoved stair core; (T28-14) the shell stays
    byte-identical through any interior re-cut — its wings, entrances, heights, roof and basement — checked by the
    shell's leaf digest before and after the re-cut, a stored plan's rings read with the `composition`-role vertices its
    re-cut adds removed (§2.6's bar, §5.3's interior-ladder row), with §3.10's seed-tiling row proving the re-cut rooms
    tile that unchanged shell; (T28-15) re-uniting the households restores the earlier plan where nothing else changed — exactly for an unstored plan (§2.6's canonical chain); for a stored plan, every household's unit with its own door, the shell read without the `composition`-role vertices (§2.6, J-P48 (1)), and the subdividing event's undo restoring the plan byte for byte (§7.4) (item 18 (e)'s
    inverse); (T28-16) a schema test that every band of the band set maps to an interior row, and that every row names
    its unit, shared, staff, circulation and size columns; (T28-17) the owner's concern — after a district's two-band
    fall every roster household is housed without a new plot, bounded by each shell's capacity (the housing clause — in
    the base on a hook fixture, the `relet`s applied by hand), and no F-PLAN tier drops a household unit, a unit
    falling to the next poorer form first (the F-PLAN clause, from M6-P's intake); (T28-18) a hand `relet` above §2.6's
    capacity returns F-EDIT (the `relet` clause), and a `setRoomUnit` that would leave a unit without its own door
    returns F-EDIT (the `setRoomUnit` clause, from M6-P's intake); on a B-EDIT fixture a `setAttr` of a tenement's heights, a `moveVertex` that shrinks its footprint, a moved face of a passage it spans and a §7.6 edit of its template's `households.max` each lower its capacity below its households, and each edit's dry run lists the households past the capacity (the last in address order, a locked or pinned one passed over) with their `relocate` moves and holds that building and the receiving buildings in its effective scope; after commit no building houses more households than its capacity (§5.3); the undo of each returns every household to its former building byte-identically; a prosperity-brush stroke that lowers the tenement's plot `builtBand`, bringing its capacity below its households, re-homes its excess the same way, and the stroke's undo returns every household to its former building byte-identically (§7.4's setField row); a `setAttr` of the tenement's plot use to a class that leaves it no residential slot (capacity 0, §2.6) re-homes every household it houses the same way, and its undo returns the tenement's design and every household to its former building byte-identically (§4.7 S11 rule 5; §7.4's Application); and an edit whose excess cannot be re-homed — its locked and pinned households alone above the new capacity, or a household that fills no dossier's population that no residential building of the district has room for — returns F-EDIT; on B-EDIT dossier fixtures whose district has no residential room for the excess and whose tenement holds no locked or pinned household — one whose re-provision moves a use, one whose re-provision joins two plots — each of these edits, the brush stroke among them, commits, the households past the capacity that fill the dossier's population housed in the residential slots the `dossier` request re-provides inside the district (§4.7), its dry run listing each such slot with the use its re-provision displaces or the plots it joins (§7.3 item 4) and holding the plots that request touches — each site with its joined neighbour or the displaced use's new site — in its effective scope (§7.3 item 1), and its undo restoring those plots and every household byte-identically (§7.4; §2.6's capacity rule; the re-homing clause).
  * *Entrances and basements (item 29; §2.6).* (T29-1) each building has one main entrance and only one, facing its
    street, its court or passage, or — a cluster structure — its footpath (§2.6 rule 1) (100 %; O5 (f)'s doorless count stays 0); (T29-2) no side or rear entrance without an access
    edge beyond the frontage, and the caps per class hold; (T29-3) no cellar under the flood band or on the water
    table's damp ground; (T29-4) every basement inside its ground-floor footprint and smaller, with its storey in
    `Heights` and its access by one of the three ways §2.6 gives it — the stair core, a trapdoor or, for an `external` access (a walk-out, or a building with no storeyed ground wing), an outside stair; the entrance row of §13.5, class C — the owner's rule (item 50) — stands for the main door; (T29-5) a VTT portal at every
    entrance of the set, and glTF and CityJSON basements below `baseCm` that validate (§11.1).
  * *Hidden plots (item 30; §4.6, §9.2).* (T30-1) every hidden plot is reachable by a chain of access edges — alley,
    court and passage faces — from a public way, 100 %; a sealed plot reads `sealed`, is reported, is never landlocked,
    and reopens; (T30-2) the hidden share per district lies within its target ± 0.03 — §4.6's band rows interpolated at the district's area-weighted mean prosperity value and scaled by its rung and density factors (§13.7); (T30-3) no label
    of a local or secret place appears at the settlement band without the viewer's knowledge key, and no secret name
    enters an export made under a view state without it; (T30-4) the parity presets and the village rungs produce 0
    hidden plots, and a hidden court passes §8.5's figure-ground metrics, reading as a court behind buildings; every passage with a `frontBuilding` has its `headroomCm` written and equal to §2.5's rule, after a heights edit of a spanning wing too, each base wing spanning it has at least two floors and an eave above that headroom, and a heights edit that would leave a spanning wing below two floors returns F-EDIT;
    (T30-5) by §11.2's knowledge rule, on a document holding a `secret` institution, `query` of every kind (`gazetteer`,
    `people`, `whereIs`, `relations`, `hit`, `inView`, `why`) and hover list its row with `withheld: true` at the `public` tier
    — a view-bound kind (`hit`, `inView`, hover) at every band coarser than the building band, the one band §9.2's table
    admits it at; a person working there naming it by its address only; the band-less kinds and a GeoJSON export
    withholding it as at the city band — and its name at `secret`; a `why` on the withheld place answers at `public` with
    its address and kind only, `withheld: true`, and no rule, input or alternative, and on T63-2's front fixture the front's
    `why` is the front's own and a `why` on a concealed part answers empty, no answer naming the concealed function; and at
    `public` a `why` on another building whose relation rows, supply edges or alternative sites include the withheld place
    gives that place by its address and kind only, `withheld: true` (§11.2's oracle rules (1)–(4)); a viewer's `preview` of
    any event returns `status: 'refused'`, `reason: 'role'`, with no fates, renames, counts or shape, and an `editor`'s
    `preview` of the same event returns its dry run (§11.2's *Knowledge*);
    `export` of `.plat` and of a permalink under a
    `public` key fails with `E_KNOWLEDGE_TIER` and succeeds under `secret`; a bridged `export.request` for `.plat` from a client whose key is `public` is answered by `export.refused` carrying `E_KNOWLEDGE_TIER`, and never by `export.ready`; and by §9.5 a withheld place gets no number,
    letter or row in the legend.
  * *Prosperity change (item 31; §4.11).* (T31-1) after a re-cut every plot keeps ≥ 1 access edge and the class
    minimums, and party walls agree on both sides; (T31-2) granularity lies within the band's target ± tolerance;
    (T31-3) the churn cap holds for each kind, in each district and each block; (T31-4) no occupied building is
    removed by a band change — a redevelopment first vacates — and a plot `join` or `split` that would remove an
    occupied building returns F-EDIT ('vacate first') unless the user confirms the demolition as a fate, while one that
    keeps the building through S11's mutator commits (§7.1); (T31-5) generation-then-mutation equals the same history replayed; (T31-6) an undo of a
    fusion or a split restores rings, records and `builtBand` exactly, and a resurrected member takes `builtBand` from
    the event; (T31-7) a direct `setAttr` of `builtBand` is refused; a brush sets `builtBand` in its scope, and with
    no epoch the static base's digest is unchanged; (T31-8) a schema test that every class has a replaceability and
    every ladder row a duration per direction and replaceability. The floor's bars: (T31-9) across any run of epochs, no
    rung-1 or rung-2 event changes a plot's frontage edge or shrinks or re-cuts a shell of its buildings toward a poorer
    band — every change of its ring or its buildings' shells (read, as §5.3's epoch row reads them, without the `composition`-role vertices a stored plan's re-cut adds, §2.6, J-P48 (1)) matched to a lifecycle event the epoch recorded (§5.3's
    epoch row: a rung-3 event, rung 1's yard buildings, rung 2's back court, a designation or renovation mutation, a
    conversion — `wallToWay` and `contractWall` among them — or the growth step's regrowth builds, `demolish` and
    corridor re-cuts) — and its geometry band is at or above its floor; (T31-10) after a rung-3 event that builds, `builtBand` is the band of the new stock, and after an `amalgamate` that builds nothing it is the `builtBand` of the member whose frontage anchor the joined plot keeps (§4.11, J-A31.44); (T31-11) a rich → poor →
    rich run with no rung-3 event leaves rings and shells byte-identical, a stored plan's shell read without the `composition`-role vertices its re-cuts add (§2.6, J-P48 (1)), and returns the rung-1 and rung-2 attributes
    to the rich manifestation within the ladder's durations; (T31-12) with no epoch `builtBand` equals each plot's
    generation band and the geometry band equals the field band; a town and a metropolis each resolve their own middle
    band; every band set names its middle band.

* **The code-reading items 33–62.** The mechanisms restated from the references' code change no golden, and the
  reference numbers they reproduce stay §13.5's rows (J-A41.01, J-A41.02).
  * *The bent cut (items 34–41; §4.6).* (T34-1) every block S8 commits has an OBB minor extent below the `τ` drawn for
    its face and every face it cut one at or above it, replayed from the `cut.stop` draws; over 10 000 faces the mean of
    `g` lies within 7/30 ± 3 s.e.; (T36-1) the start A draws nothing — a face planned with a different `cut.t` stream
    keeps its A — and lies on the run most nearly parallel to the working major axis (ties: the earlier run); (T37-1)
    every kept corner K lies at least `o` from both ends of its first leg, or at `λ / 2` when `λ < 2o`; every second leg
    meets its far run square within the lattice tolerance; under `flatten` no kept corner's triangle A–K–foot is lower
    than `max(cut.flattenM, 0.02 × |A–foot|)`; under the `MFCG` preset every cut whose first leg meets its run within
    `asin(√0.99)` of perpendicular, and passes step 8's checks, is straight; no cut bends twice; (T38-1) fillets on lane and street
    cuts only, never on a plot cut; each arc touching both legs tangentially and curving the shorter leg from end to end, its chords no shorter
    than `w_min` or the lattice minimum edge; the filleted share on NG's recorded face shapes within §13.5's fillet bar;
    (T39-1) rung (a) plans at most three frames per face, each turned 36° from the last, and never restarts anything
    above the face; a face every frame fails reaches rung (b), reported; (T40-1) inside one district lane widths are
    non-decreasing in the lane's length, inside the class's width band, and never narrower than a lower class; (T41-1) a
    registry test — `cut.stop` registered with its reader, `cut.side` and `cut.farSideAlt` reserved ids that no reader
    draws (§6.1); and §13.5's bent-cut signature row, its fillet share included, on NG's recorded shapes at M0 (b).
  * *Plots (items 43, 44; §4.7 S11).* (T43-1) every plot's `frontJitterCm` is 0 or in [`jitter.minM`, min(√(plot
    area)/3, `jitter.maxM`)] at its interpolated columns, and over the plots whose depth does not bind, the share of
    receded main slots per band row lies within ± 0.05 of the law's expectation — the mean over those plots of max(0,
    1 − `jitter.minM` ÷ cap), cap = min(√(plot area)/3, `jitter.maxM`); (T43-2) on bent and curved frontages every row
    footprint's front chain lies at `h` from its frontage along the normal (within the 0.71 cm hot pixel) and every party
    wall is its plot side line; (T43-3) no recession lies in (0, `attractCm` + 1 cm), and an `editTable` or `editPreset`
    setting `jitter.minM` below that bound is refused naming it (F-EDIT); (T43-4) under the `MFCG` preset the recessions
    follow 4.8 m and 2 m, and the institution, tents and cluster rows draw none under every preset; (T43-5) a designation
    mutation that keeps the main slot keeps its `frontJitterCm`, and Regenerate (keep settings) reproduces every front;
    (T44-1) under the default preset every prosperous or rich set-back compound carries a `wall` PlotBound with a gate on
    each access edge, and under the parity presets none carries a wall.
  * *Walls, gates and districts (items 45–47; §4.8, §4.2 S3 (4), §4.4, §4.5).* (T45-1) a thin castle claim — its nearest
    boundary vertex within `castle.minInnerM` of its centroid — is bloated before any equalise pass; a repaired claim
    reaches compactness ≥ 0.75 with an `on_enceinte` claim's weld vertices and, once fixed, its gate side's ends unmoved;
    a claim the repair cannot bring to the gate goes to re-site with a report and never restarts anything; (T46-1) on
    walled B-CITY seeds whose pick contour follows a sea or lake shore over at least a `gate.waterfrontShare` share of it, the main gates equal §4.2 S3 (4)'s reduced `N₁` exactly unless N was requested, and every trace is smoothed by
    exactly `wall.smoothPasses` passes with its gates, welds and shore vertices unmoved; (T47-1) districts seeded at a
    gate, the castle or a bridgehead have a median area below the town's median district area on ≥ 90 % of B-CITY seeds,
    and a scoped regroup (§7.3's S6 row) replays the same turns by seed lineage (J-A47.01).
  * *The hinterland (item 57; §4.9).* (T57-1) under the sector-look preset in `demand` mode no field cell is more distant from the settlement's edge than a non-field cell of the preset's admissible land (the outward order); under `fill`
    the field land equals the mode's; the farmstead count equals the farm table's under both sector variants.
  * *Drawing and labels (items 54, 55; §8.2, §9.3).* (T54-1) under `ink` every footprint's raised under-copy is swept by
    the sheet's base offset times its class's ratio — house 1, landmark 2, farm building 0.6 —, on 100 % of footprints;
    (T55-1) the horizontal spine is the first candidate of every area label whose tree has ≤ 64 leaves, and the candidates depend on the model alone — identical under every view rotation and zoom, as §6.2 requires of hashed label
    candidates.

* **The owner rules 20 (h) and 63–72.**
  * *Clandestine institutions (item 63; §4.7).* (T63-1) every clandestine institution is placed in one of its allowed
    modes — front, hidden or underground — or in its reported fallback (underground → front → hidden); (T63-2) at the
    `public` tier every view, label, query answer and export shows only the front — the true function, its concealed
    rooms, door and link withheld (T30-5's enumeration, run on a fixture holding a front with its hidden function) — and
    at `secret` both; (T63-3) the B-PLAN fixtures confirm that a front's concealed rooms are reachable only from its
    concealed entrance or its service side (from M6-P's intake; in the base the schema fixture carries the flag and the door);
    (T63-4) over 1 000 seeds the `underground` mode is never chosen without an underground allocation (II.7.3), and the
    parity presets place no concealment.
  * *Basement access (item 64; II.7.3).* (T64-1) an access point stands only where a basement lies within the access reach
    of a tunnel or a sewer dwelling; (T64-2) over 500 CITY seeds on the layer's hook fixture the access rate of each class lies
    within its row's probability ± 3 s.e.; (T64-3) clandestine buildings over a network carry an access at least at their
    row's rate times the concealment multiplier. T12-1's clause on where an access point stands is the amendments-b
    group's (public ground, a yard or a building's basement).
  * *The underground family and the undercity (item 65; II.7.5, II.7.6; the geology flag, §4.2 S1).* (T65-1) an undercity exists only where a void
    source exists and at least one lifeline reaches it; (T65-2) on 500 seeds per rung its neighbourhoods stay within
    `RungProfile.layers.undercity` (§1.1) — none on the village rungs, at most one at TOWN and only above that row's
    population floor, at most two at CITY and three at METROPOLIS — and the circumstance `require` gives one at TOWN and
    above while `forbid` gives none; (T65-3) every building under a ceiling is capped by it (its eave below the chamber's
    ceiling less the row's clearance); (T65-4) every connection link is typed (open, gated, secret, collapsed, flooded)
    and knowledge-gated; (T65-5) the population stays whole — the settlement's households are the same set with and
    without an undercity; (T65-6) U1–U3 hold on the sewer's part with an undercity present, and re-deriving one
    underground system leaves the ground and every other part byte-identical but for the far `link_end` vertices of its
    links, each placed, kept or stripped by one transaction on its own part — a stripped one restoring the edge it split
    unless other geometry has met the vertex since (§3.4) (the per-part twin of T12-1's reroll isolation; §3.10's row);
    (T65-7) with `geology: 'auto'` and each relief class set by the site request's `relief` toggle (§4.2 S0), over 1 000
    seeds per class the shares S1 resolves to `soluble` and `volcanic` lie within ± 3 s.e. of the feature table's geology
    row at that class, each resolution recorded in `autoResolved`; with `relief: 'auto'`, over 1 000 seeds per rung the
    classes' shares lie within ± 3 s.e. of the rung's relief row, and a digest whose `site.terrain` is given — a
    test-side edit of a fixture's digest — takes the class §7.7 DR1 maps it to; setting either toggle moves no other S0
    draw (§6.1); and every run under the parity presets, and a sky island's terrain (from M4, on the islands' hook
    fixture, II.6), reads `ordinary` (§4.2 S1 (10); J-A65.49, J-A65.02); (T65-8) on a TOWN hook fixture with the
    undercity forbidden, a test-side `HistoryHint` (item 88) carrying one `fire` scar of severity 0.6 makes one `buried`
    system at generation — its region the districts of growth stage 1, its galleries their way centrelines 320 cm below
    the present grade, its chambers their buildings' ground storeys — and the log records no `raiseGrade`; a scar of
    severity 0.4, an empty hint and the parity presets make none; and the ground arena's digest is the same in the 0.6
    and 0.4 runs and in a run whose hint keeps their `ageYears` and no scar (II.7.6's *A buried old town*; J-A65.46,
    J-A88.42).
  * *The closure rule (item 66; §7.3 item 9).* (T66-1) `addUndergroundAccess` on a building without a basement gives a
    lawful basement — full, half or a hatch to a crawl space, by the terrain gate — or a stated refusal, never a silent
    change; (T66-2) every generated connector is reachable end to end and lies inside its depth band, and a target within
    `digReachM` whose route is longer than 2 × `digReachM` is refused with its reason, and so is an enclosed basement — its
    ring within `foundationClearM` of other footprints, basement rings or dug passages on every side, and, apart, the
    water table above every floor between it and the target: the dry run refuses with `E_NO_PATH`'s reason naming the
    blocking building or the water table (F-EDIT), the basement of step 1 is not laid and nothing else changes (II.7.6
    step 3); (T66-3) its undo
    restores the document byte for byte; (T66-4) a second access sharing a connector survives the first one's deletion,
    and the last one's deletion removes only the pieces nothing else uses; (T66-5) the closure's first base instance
    (J-A66.01): a `setAttr` that sets a placed use's `concealment` to `front`, its `front` another use of that building
    (§4.7's *Concealed institutions* (1); `Use.front`), on a building whose plot
    has an access edge beyond its frontage onto an alley or a passage, adds the concealed door by §2.6's entrance rules in
    the same event (*Concealed institutions* (4) (b)), its closure record naming the door, and its undo removes exactly
    that door; with no such edge it adds none, the concealed programme reached from the front's service side (§4.7's *Concealed institutions* (4) (b)); (T66-6) a `drawBoundary` that adds an undercity neighbourhood no lifeline reaches, and a `split` of one that leaves a part no lifeline reaches, each adds that neighbourhood's nearest lifeline by II.7.6's target, connector, access-point and link steps in the same event, its closure record naming them and, where it digs a connector, the dug system's `sources` naming the neighbourhood's `District`; its undo removes exactly them (§7.3 item 9 (d); J-A66.72).
  * *The underground layer built (M6-U).* Every T-V4 test (V04 §7), run from M6-U's steps; the hook tests above
    run on its generated output.
  * *Works and the weekly clock (items 67, 76; §4.11).* (T67-1) the stage drawn at week w is a pure function of the
    Works record and w: reached directly or by scrubbing forward and back, every drawing is byte-identical and no model
    digest moves; (T67-2) no Works leaves a plot without an access edge at any week; (T67-3) a merge or a split shows the
    old boundary until its clearing stage; (T67-4) a demolition's households are rehoused (item 17) before its first
    stage; (T67-5) no Works at generation and none under the parity presets, the goldens unchanged; (T67-6) on the hook
    fixture an epoch's share of buildings in works lies within ± 3 s.e. of growth × mean duration ÷ span, and a decay
    Works within its dwell band; (T76-1) its cadence clauses (from M3a, on the port's `EpochInputs`) — an epoch folds at
    each 52-week boundary, at a population move past the roster tolerance and at the week of each newly carried calamity
    no other epoch falls on (one dated at or before the last epoch's week folding none at its own week: it rides, at
    that epoch's first week, the first epoch its absorb folds where the absorb's week is after the last epoch's (one
    folded at the absorb's week where no other is), else, carried by no absorb whose week is not after the last epoch's,
    by the first later absorb whose week passes it, by the same rule; §4.11 *The clock* (4)), none on a 2 % drift, with
    `years` = Δweeks ÷ 52 — on fixtures adding a calamity carried at a mid-year week with no population crossing (one
    epoch at its week, the calamity in its `EpochInputs.events`), one at a week-52 boundary (no second epoch), one
    inside a coarsened catch-up (riding the coarse epoch that holds its week, V06 §6.8 (6); from M6-E), a calamity
    carried one year late, riding the absorb's first epoch, its event at that epoch's first week, and one dated in the
    last epoch's own week reaching a second absorb in that week — no epoch and nothing of it carried, then carried by
    the next absorb past that week, riding its first epoch at that epoch's first week with its targets struck in place,
    its deaths in that epoch's burial need (that clause from M6-E's E8, V06 §3.18.2 (3)); and a late non-calamity change
    in an absorb whose week is after the last epoch's — folded at the last epoch's week + 1, the document's current week
    never before it nor before the week of any event an earlier absorb folded —; its per-year clause (from M4, with the
    epochs) — per-year rates give equal expected firings under a weekly and a decade cadence.
  * *Light (item 68; §8.4, §4.7).* (T68-1) a spot lit from every side by several point lights carries no shadow;
    (T68-2) no shadow climbs a taller roof; (T68-3) a shadow falling on a lower roof is shortened by that roof's height
    and continues beyond that roof onto the next building or the ground; (T68-4) on the CPU reference the lighting is
    byte-identical for the same model, lights, view and time on the five engines (§6.5 (9)); (T68-5) at night every way
    class × band reaches its light rows' target minimum illuminance on the CPU reference, interpolated along the value;
    (T68-6) no light stands on a hidden, sealed or clandestine plot unless a row places one; (T68-7) the GPU pass lies
    within §13.4's tolerance of the CPU reference; (T68-8) with the GPU lighting unavailable (no GPU, a lost context) the
    next rung of §8.4's ladder is drawn and reported, never an error (§5.2); (T68-9) no light on a building in Works
    before it is finished (item 67).
  * *Informal clusters (item 70; §4.7 S11).* (T70-1) every structure has its own door on a footpath that reaches an access
    edge of its plot; (T70-2) the fire-gap minimum holds between structures; (T70-3) the households per structure
    lie within the row and within each structure's capacity; (T70-4) no cluster stands on a standing plot whose geometry
    floor is the middle band or above, none in a district whose band range excludes the squalid band, and no structure in
    a wall strip; (T70-5) under the parity presets the shanty districts draw FTG's tents row and MFCG's hovel (T27-2's
    shanty fixture extended); (T70-6) at generation every `informal` plot is one that §4.7 S11's *Informal clusters* (2)
    gives the cluster row, so none lies outside a shanty-typed district, and no class-mix draw (§4.7 S10b) yields a
    cluster structure's class — `shack`, `tent` or `lean_to_shelter` (§10.2; *Informal clusters* (1)–(2); J-A70.49).
  * *The class mix inside a band (item 71; §4.7 S10b).* (T71-1) inside a band row the manor share rises monotonically
    with the prosperity value, reaching 1 at the extreme of the table; (T71-2) at equal relative position a wealthier town shifts
    the share in the declared direction; (T71-3) in mixed blocks the largest classes stand on the highest-prestige
    frontages at a share above a shuffled-placement baseline by §13.7's margin (V12 §3.6's harness, the spec `T71-3`:
    block scope, 20 permutations, the margin rule); (T71-4) manors on joined plots and houses
    on standard ones within one block.
  * *The neighbourhood's character (item 72; §4.5).* (T72-1) the character vector is a pure function — recomputed from a
    saved model it is equal; (T72-2) a district's name changes only past the hysteresis or by a rename; (T72-3) value,
    not volume — the owner's fixture: many lodgings never outweigh a few churches, and three churches or one cathedral
    alone make the religious quarter; (T72-4) one district per district-defining dossier instance, its defining trade at
    the row's share and not on every plot; (T72-5) dispersed classes spread, none gathered into one district by rule;
    (T72-6) every building's prosperity-driven state lies inside its district's band range, an institution's excess
    raising the district's pressure; (T72-7) a shared building's total amplification and contribution never exceed a
    single-power building's of equal significance; (T72-8) the economy dial is proportional to the sector's share with no
    rank bonus, and an even mix is neutral; (T72-9) after S10a every household it distributes to blocks has its band inside
    its district's written band range (a household no admitting district has room for housed in the district whose range
    lies nearest its band and has room, its band read at that range's end — a derived band, reported —, so none is left
    unplaced for its band, F-SITING meeting only one outside a dossier's population that no capacity holds, T19-4), each household S10a
    moved from S7b's provisional allocation is reported, and no record holds the
    provisional range (a schema test); its dossier clause (from M3a, with T19-4's): on a dossier fixture whose written
    ranges exclude households S7b allocated and whose other districts lack the capacity for them, every household that
    fills the dossier's population is housed in its own district by §4.7's re-provision (§4.5 (5); J-A72.50).
  * *Derivation fills every gap (item 20 (h); §7.7 items 9–11).* On the dossier fixtures of the port's group below and,
    standalone, on blueprints (J-A20.06): (T20-7) no derived fact contradicts a dossier fact — every derivation row's bar
    holds, counted by §5.3's coherence rows; (T20-8) a dossier change re-derives exactly its disruption set — the rows
    whose inputs it changed — and nothing else; (T20-9) a map edit of a dossier-owned value (a dossier name or kind, a
    dossier-set `knownTo`, concealment, front or state, a count outside its range, the population) returns F-EDIT
    `dossier-owned` and changes nothing; (T20-10) the totality test — every map-fact family of §2.8's registry is covered
    by a derivation row, and every row's chance is a registered §6.1 concern or none (one test with T73-10; J-A83.01);
    (T20-11) a schema test that every door and `HostContext` field beyond the dossier's content is optional; (T20-12) from
    M1 the rows run on the frozen fixtures and, as the stand-in dossier, on a blueprint's own roster, T20-7 and T20-10
    holding on both (T22-1's purity and T20-5's one-way bar stand); (T20-13) on the fixtures and on a blueprint,
    `factTier` (§2.8; J-A20.23, J-A20.24) reads `dossier` on exactly the paths §2.8's three conditions give — a dossier
    ref, a registry dossier path and a carried value —, `declared` on exactly the paths an author's declaration set
    (`flags.editedPaths`, and the existence and position a declaring event pinned; item 101), and `map` on every other
    path, a blueprint with no dossier reading no `dossier` tier; §9.2's reader, every export (`plat:tier`) and the tool
    API (§11.2) show that tier (J-A20.82).
* **The dossier port (items 73–88): B-DOSSIER-lite and the port's bars.** The frozen dossier fixtures (item 84; J-A84.01,
  J-A84.02) live in `plat/tests/fixtures/dossier/` — inside `plat/` by §17.1 (3)'s path rule, and never under `research/`
  or `captures/`, whose JSON the document checks read as corpus. They are cut only from runs of the named SettlementForge
  line — the first `fp/integration-2026-09-23` at commit `5d699cc68` (J86 Q1) — never from an on-disk working tree, and
  are re-cut by the same scripts when the owner names another line; the build copies them at M1. Their `manifest.json`
  holds one row per file, and one per derived fixture a volume names — a run-time, test-side mutation of one file, never
  written as a file (V12 §1b's `<dossier>@pop×k` levels; V08 §7.1's crisis, force and required-keys fixtures):

```ts
// @plat/testkit — the dossier fixtures' manifest (items 83, 84)
interface DossierFixtureRow { file: string; sfLine: string; commit: string; generatorVersion: string; seed: string /* the synthetic seed the file was generated from */;
  config: string; generatedBy: { lane: string; date: string }; kind: 'birth'|'after-events'|'after-ticks'|'world-state'|'derived'; pairsWith?: string /* the file it pairs with */;
  derivedFrom?: { file: string; mutation: string /* the mutation as its volume names it — '@pop×k', or the V08 §7.1 fixture's name */ } /* kind 'derived' only: its source row's file; the harness makes it at run time */;
  population: number /* persons */; tierWord: string; ourRung: Rung | 'refused'; notes: string;
  neverPublish: ('seed'|'config')[] /* the host's seed and config fields inside the file: kept for re-cutting, never carried by an export or a document (item 85) */ }
```

  The set: nine at-rung births — town-1 Berghafen (2 130 people, TOWN), town-2 Novaorum (3 174), town-3 Glenford
  (2 492), sample-mossgate (4 155), town-nb-1 Novasaltus (4 921; the one set of partner-level trade links), town-cc-1
  Großmark (4 196; a custom-content record keyed by its local uid), city-1 Pianopagus (23 178, CITY), sample-blackcrag
  (18 911, CITY) and metropolis-2 Ventovicus (47 734, METROPOLIS); three refusal births — culture-latin Collevilla
  (1 287), sample-cnocby (767) and village-1 Lipopol (782); the totality-only files — the twelve culture towns,
  metropolis-1 and metropolis-3; and the pairs for the absorb half — the probe town before and after seven events with
  its per-event record; town-1 and city-1 after one week, one season and one year under the birth default and after a
  lit year, each with its world state; the probe town after a plain and a lit year; village-1 after its years.
  **B-DOSSIER-lite** runs each at-rung birth × 5 seeds (the fixture's derived seed, then four `rerollLayer` salts) through
  `digest`, `creation` and `generate`, and holds:
  * *the creation bars* (M1): (T73-1) every dossier record placed — 0 tier-6 omissions; (T73-2) the population within
    ± 5 %; (T73-3) the residential building count inside the housing record's range; (T73-4) every collective record's
    count inside its range; (T73-5) walls exactly when the walls bucket holds a record, the number of gates inside the access
    row's range; (T73-6) every quarter name on exactly one district, or reported waiting (§7.7 item 16); (T73-7) the
    population-weighted mean household band within one band of the wealth row's mapped band; (T73-8) the cross-engine
    digest, stated in §6.5 (9) and scheduled here; (T73-9) while no village product is registered, the three refusal
    fixtures refused with `E_RUNG_UNAVAILABLE` naming the village product, at birth and after their ticks (§1.1, §7.7
    item 15); with volume 7's `ProductDecl` registered they route to its rungs (V08's T-V8-19 on V07's rows); (T73-10) the vocabulary totality — every enumeration
    value of the fixtures has a table row or the declared fallback, the port's `unmapped_word` notes 0 and its
    `unmapped_kind` notes equal to the M1 class gap, listed (one test with T20-10; J-A83.01);
  * *the absorb bars* (M3a), on the pairs: (T75-1) every `DossierChange` dated by a rung of §4.11 or reported
    `unreceipted_change`; (T75-2) every removed element's plot vacant and every ruined one present as its ruin; (T75-3)
    the seven-event pair's disruption within its budget or reported over it; (T75-4) the host's undo — the before-dossier
    fed after the after-dossier — converging with `state_matches_absorbed`, its residue reported; (T75-5) a rename with
    a receipt re-bound, one without reported as a removal plus an addition;
  * *the typed slices and the rung* (M1, M2b, M3a and M4): (T77-1) its slice clause (from M1) — a partner's bearing,
    drawn on its own key when the dossier gives none, does not move when an unrelated fact changes, and a partner the
    slice no longer holds keeps its road, bearing and key, weighed 0 by `TradeFlow` (§2.4) —; its weight clauses
    (from M2b) — `TradeFlow`'s gate weights sum to one, a harbour town's harbour carries the sea share, a way's trade
    weight equals the sum of the gate weights routed over it, and `TradeFlow`'s S3 (7) values — the gate weights, the
    harbour's share and the dominant bearing — equal their values after S4, S3 (12)'s principal-market score reading
    those gate weights (§4.3; J-A77.42); (T81-1) (from M4) an epoch whose population target crosses
    a band upward changes the rung's row and grows the frame by §3.2 (9)'s batches, every entity outside the growth's
    region keeping its address, and every face outside that region and beside no deleted stretch of the old margin or
    border keeping its ring, its owner and its nested faces, re-parented where its parent was joined, every raster keeping
    its `cellCm` with every old cell in its place and every stored height unchanged, the `hydro` fields equal to a fresh
    computation over the grown grid and every river's traced course inside the old arena unchanged — or, where M4's
    memory measurement took §3.2 (9)'s pre-decided re-grid, each raster at the new rung's `cellCm`, every standing
    entity keeping its stored `baseCm` and the report naming the re-grid (§3.2 (9);
    J-A81.31); (T81-2) a digest built from the town-1 fixture with its population set to 150 000 — a test-side edit of
    the digest, never a fixture file — is refused `E_RUNG_UNAVAILABLE` naming the population cap by `creation` (the
    creation clause, from M1) and by `absorb` against the document town-1 made (the absorb clause, from M3a), nothing
    absorbed (§1.1; J-A81.01); (T88-1) with the staged rows and records empty (`PortRows`, §10.2; `Recipe.history`'s
    `HistoryHint`, §2.9; every `PowerRelation`, §2.7) the staged readers of J-A88.41 and J-A88.42 (S2's stage count at
    §4.2, the typing row, the alliance spill and the dials at §4.5, the crime term at §4.6 with its readers at II.7.3 and
    II.7.5, the import share at §4.9, and the catacomb age and the buried old town at II.7.6) change nothing: on the golden suite the model
    digest equals the one a test build gives with each reader replaced by its base value, each reader from the milestone
    that lands its stage; (T88-2) (from M2b) on a dossier fixture whose `PortRows.impairments`, filled test-side, holds a
    non-physical row (`physical: false`), a visible impairment of that type on one dossier institution
    (`DossierInstitution.impairments`, §14) lowers that institution's own dial term by §4.5's rule and changes no other
    institution's term and no district's dial (J-A88.42);
  * *the seam's bars* (item 85; M1): (T85-1) CI runs hostile names — markup, script, event attributes, entities and
    control characters, very long and right-to-left strings — through every exporter as dossier names, display names and
    user renames, and every output is well-formed and inert by §11.1's bar; (T85-2) a dossier-bound document, its
    snapshot, its permalinks and every export hold no occurrence of the host's seed, and the recipe's seed equals
    `H32("plat:sf-seed" ‖ that seed)`; (T85-3) from M3a, display names reach only the export they were given to — the
    document and the next export are unchanged.
* **The SettlementForge stage (V08 §7).** Every T-V8 test (V08 §7) on the host harness `plat/tools/hostharness/`, with the
  frozen fixtures and test-side mutations only.
* **The authoring toolkit (item 101; §7.1, §14): elegance bars and fixtures.** (T101-1) at most twelve tools — a
  registry test that every tool maps to its declaration kinds in §7.1's binding, so a thirteenth tool fails it (a new
  capability is a parameter of a tool); (T101-2) each tool is one declaration kind with one dry run, one fate report and
  one undo step (an enumeration over the binding); (T101-3) the same declaration made on the canvas (a scripted gesture),
  through the tool API and in a skeleton file gives one event, byte for byte; (T101-4) a map's declared subset exported
  as a skeleton and re-imported under its seed reproduces its model digest; a skeleton exported from a hand map on which
  a raised road was declared and a wall then drawn beneath it, and from one on which the wall came first and the road
  was brought down before it, each re-imported to its source's model digest (§2.7's laws, law 2 *Newer*: a creation
  prefix meets in its log order), and a clerk's transcript of tool calls, replayed, gives the session's digest (§6.5
  (9)); (T101-5) no declaration contradicts a dossier fact or a lock without a refusal (a meeting of a wall and a raised
  way contradicting no placement lock: §2.7's laws, law 2 *Entry*; its worked example the crossing table's lock
  sentence) carrying its reason and at least one closest alternative; (T101-6) J78's acceptance fixture and item 110
  (e)'s second fixture (M3a) — each an original skeleton with a known city's structure and our own names, its brief,
  structure list, seed and golden in V12 §3.14 — each authored three ways: as a skeleton file, by hand through the
  scripted canvas, and through the tool API from a clerk's recorded transcript — at M3a a scripted transcript of
  tool-API calls for each fixture, from M3c the built-in clerk's cassettes for their descriptions and rosters (V10
  §3.15, V10 §7.3 group A) —; the skeleton file and the hand-authored map share one model digest under one seed, and all
  three meet its fixture's structure list (every declared quarter by kind and name, both enceintes with their gates,
  every named place in its declared quarter); (T101-7) points in, shape out — a two-point wall over the ridge fixture
  follows the ridge and closes when its ends meet; a seed quarter never crosses a block and its boundary lies on street
  centre-lines, water, walls or ridges; a level lake's shoreline equals the terrain's contour at that level; (T101-8)
  declared means held — a New random over a quarter holding declared entities moves no declared entity, the fates list
  naming each one held; (T101-9) the count badge of a quarter, a fill or a roster equals the plots, households and
  buildings its committed event makes.
* **File g's items.**
  * *Sunlight (item 102; §4.5).* (T102-1) with `w_sun` = 0 and item 111's climate cell at its temperate value the field and
    the town are byte-identical to a build without the term (a `NoOpPin`); (T102-2) on a fixture with an island over a
    uniform district, the island's shade strip averages lower prosperity than the sunlit remainder by the declared weight
    within tolerance — volume 5's T-V5-19, with T-V5-20 and T-V5-21, from M6-sky, and volume 6's drift fixture (T-V6-12)
    its epoch form; (T102-3) the term alone moves no plot across two bands (volume 11's T-V11-30: `w_sun` at its default
    against 0 under common random numbers on B-CITY, 0 plots); (T102-4) the term's computation within its per-rung budget
    (§12.4).
  * *The siting rulebook (item 103; §10.2, §4.7 S10b).* (T103-1) the siting statistics suite: each family's effect shows
    as a measured shift against a random-placement baseline across seeds — tanneries downstream in most river towns (at
    0.80 of towns), a nuisance's sensitive members farther from its emitters, the thieves' den farther from the law,
    shops nearer the market — never as a guarantee (volume 11's T-V11-12, one Holm family; volume 5's T-V5-22 on its
    island seeds); (T103-2) the share of districts a coverage class serves above its random-placement baseline by 0.1
    (volume 11's T-V11-13); (T103-3) with the coverage weight at 0, placement byte-identical to the build without the
    coverage rows (a `NoOpPin`).
  * *Custom content (item 104; §7.7, §10.2).* (T104-1) fixtures of custom institutions carrying only a category; a
    category and tags; a scene archetype; the optional definition fields; and an active reviewed chain — each resolves,
    sites and reports as §10.2 specifies, with zero placement failures; (T104-2) a chain's nodes closer together than a
    random baseline across seeds (volume 11's T-V11-16; volume 5's T-V5-23 on islands); (T104-3) the flow order — the
    resource farther from the market than the final seller — in most placements (at 0.75), a compatible chain's in-town
    nodes within their links' comfortable distances in most placements, and a chain toggled off and on returning its nodes
    to their sites where nothing else changed (volume 5's T-V5-24 on islands); (T104-4) a revision re-sites with least
    disruption.
  * *The supply web (item 105; §4.7 S10a–S10b).* (T105-1) across seeds a multi-output producer sits nearer its dominant
    output's consumers, consumers of a shared provider nearer it, source-oriented classes nearer their inputs and
    market-oriented classes nearer their demand than a random baseline (volume 11's T-V11-14); (T105-2) a loop fixture
    settles within the relaxation cap, its second pass moving fewer members than its first, byte-stable across runs;
    (T105-3) the share of districts holding a dispersed class within 0.05 of the base's (J-A72.46 holds; volume 11's
    T-V11-18), and split pairs for split classes past the threshold, never under the parity presets; (T105-4) with the
    web's weights at 0 — V11 §3.7.4's off form — placement byte-identical to the base (a `NoOpPin`).
  * *Walls that use natural barriers (item 106; §4.2 S3 (9), §4.4 S5a, §4.8).* (T106-1) a river-loop fixture walls only
    the neck and is sealed; a cliff-backed coastal fixture anchors on the cliff and the shore with zero wall edges along
    sheer arcs; (T106-2) 100 % of quays reachable through a gate or an open front; (T106-3) a sea-threat dossier gets a
    quay wall with sea gates and a peaceful one an open front, and every walled port gets its harbour-mouth chain, save
    one §2.7's laws leave out for a raised way, reported (`W_RAISED_MEETING`; law 2 (c));
    (T106-4) F-WALL's check extended — every open stretch's ends anchored on a barrier or an enceinte (§5.2); (T106-5) with
    `barrier` closure and the stretch profile off, byte-identical to the base (a `NoOpPin`); volume 11's T-V11-19 checks
    its rows.
  * *Spread and pull in balance (item 107; §10.2, §4.7 S10a–S10b).* (T107-1) a coverage class's served-district share
    above its random baseline with the web's weights on — the pull never defeats coverage; (T107-2) a spaced class's
    nearest-member distance above its baseline; (T107-3) consumer-to-provider distance within `comfortM` in most
    placements (at 0.70; volume 11's T-V11-14); (T107-4) with `comfortM` and spacing at 0, byte-identical to items 103
    and 105 alone (a `NoOpPin`).
  * *Institution ladders (item 108; §7.7, §10.2, §4.2 S2).* (T108-1) on the surveyed dossiers every COUNT, QUARTER and
    GUILD record shows members inside its range, rising monotonically across a population sweep (× 0.5, 0.75, 1, 1.5, 2;
    a level outside [1 500, 120 000] `notApplicable`; volume 11's T-V11-17); (T108-2) no ladder pair double-counted;
    (T108-3) a SIZE record is one building, and the `kinds` row set's rows for the unnumbered qualifiers read as §7.7's DR9 extends them;
    (T108-4) a promotion or demotion changes the member count by least disruption.
  * *Caverns, ruins and catacombs (item 109; §4.2 S1, II.7.5, II.7.6).* (T109-1) across seeds cavern frequency rises with
    relief and is higher with mining than without, per relief class (volume 4's T-V4-55), and every mine–cavern breach
    lies within `breachM`; (T109-2) a dossier carrying `ancient_ruins` gets a ruin system or a reported reason, its
    surface marker linked; ruin plans beat the cavern baseline on the structure test (right angles, straight walls) and
    differ from the town above on block size, grid regularity and orientation (volume 4's T-V4-44, T-V4-45; volume 6's
    T-V6-37); every ruin link obeys the connection graph; an undercity takes a ruin void over a cavern when both qualify,
    at the ranked share (volume 4's T-V4-58); (T109-3) a system growing through a sealed void at a shared depth yields a
    breach and makes it accessible; across METROPOLIS seeds the sealed share of voids deeper than `dig.reachM` stays at or
    above the row's floor (volume 4's T-V4-54; volume 6's T-V6-36); caverns and ruins occur at every rung (volume 4's
    T-V4-43); the share of voids with an access rises with the buildings over them across a growth sweep (volume 4's
    T-V4-49; volume 6's T-V6-34); no dwelling in a void without an access, and every access carries its cause; (T109-4)
    at most one catacomb at TOWN, the counts at CITY and METROPOLIS within the table bound, the largest under the largest
    cemetery, every catacomb under a cemetery or a quarry ossuary and none under a church, the cathedral always with a
    crypt (volume 4's T-V4-50; volume 6's T-V6-40; volume 11's T-V11-25); (T109-5) a catacomb's extent non-decreasing
    over every epoch sequence (a property test), its growth per epoch within the cap, a stagnant catacomb's ossuary fill
    rising while its extent holds, and its sources only those item 109 (k) (2) admits (volume 4's T-V4-51, T-V4-52;
    volume 6's T-V6-38, T-V6-39); (T109-6) with the ruin chance 0 and the relief, boost and fissure rows at the base's
    values, byte-identical to the base (a `NoOpPin`).
  * *Retaining walls, raised ways, stepped massing, deck plots (item 110; §2.7, §4.3, §4.6, §4.7 S10–S11, §5.3).*
    (T110-1) retaining walls on terraced slopes above the thresholds and nowhere flat, every way crossing one a stair
    or a ramp, and one meeting the frame's outer ring ending on it, and a T3 `retaining` wall drawn across a standing
    viaduct's under-deck strip through one of its supports — levelling no ground inside the strip, laid through the
    support, every station, key and span unchanged (§2.7's laws, law 1 (2), law 2; its worked example the crossing
    table's lock sentence's retaining wall); the same stroke drawn across a `vault` span of a standing aqueduct — the
    span read `open` while the line lies there, its arch vault removed by V04's reconcile (one of the stroke's
    consequences, law 4), and laid again with its id when the stroke is deleted (§2.7's laws, law 1 (8)); on a second
    run with a declared placement seated in that vault and locked by the user, the stroke moved along the deck to cross
    under the nearest span whose chamber seats none, or at a support, part of its bend (§2.7's laws, law 1 (9), law 4),
    the building, its chamber and its door unchanged, and on a one-span way refused `refuse.raised.meeting` naming the
    building, no Unlock offered (§2.7's laws, law 2 (c)); and an aqueduct drawn across a standing retaining wall — no
    arch vault in a `vault` span over its line (§2.7's laws, law 1 (8); its worked example the crossing table's
    *beneath*); (T110-2) a raised way crosses ground ways with zero junctions and its parts never share a planar
    arrangement with part 0 — at the frame (§2.7 *At the frame*), its part sized to the ground's frame plus margin and
    growing with it, an aqueduct sourced beyond the frame laid to the outer ring without a ramp, and the same aqueduct
    through an epoch's frame growth — §3.10's stored-references row passing at every stage end of the epoch, no part-0
    vertex left with a row and no edge, and after §4.11 both ends of its ring-end foot on the new rings (§2.7
    `RaisedFoot`, §3.2 (9)) and every station of the old deck at its key, position and ring after the growth (§2.7's
    support step (7)) and, on the same aqueduct with its end span on the old ring `ruined` by its lapse and, on a second
    run, with that span's `use` held by a user's `setAttr`, every span the extension lays `ruined` and, on the second
    run, carrying the held `use` — no fallen arch standing again and no hold lost; and a fixture whose stage-2 ring
    crosses a declared viaduct's end span at the frame: the frame growth's extension keeping the deck's course and that
    end span as it stood, laid on from the old foot's point (§2.7's support step (7)), its new supports off the band,
    the deck reaching the new ring, the run beneath capped at the soffits (§2.7's laws, law 1 (7), law 2 (c); its worked
    example the crossing table's W1·C12), and the same with that ring drawn by hand (W2·C12); and, on a variant whose
    grown frame reveals across the aqueduct's course a river wider than `raisedWays.structure.maxClearSpanM` and, on a
    second run, a valley deeper than its `maxPierM` — first with a fitting course in reach, then with none — the
    extension bent to the nearest course whose clear spans and piers fit, both ends of its ring-end foot on the new
    rings, and, with none, kept on its course with its support in the water and its pier past the bound, each counted in
    `raised.extendedPastBound`, the aqueduct kept and nothing waiting (§2.7's support step (7)), and, on a variant whose
    fitting course crosses a standing ring, that course crossing it at the aqueduct's level as a course laid then
    (§2.7's laws, law 1 (2), law 2 (a); its worked examples the crossing table's C12 and *over the band*) —, a declared
    course drawn beyond the frame bent to the ring; the support step's obstacles and bounds (§2.7): a viaduct over a
    square and an aqueduct over an oasis's grove, 0 piers in either, each span over one `open` with reason `clear`; a
    generated viaduct and aqueduct over a 200 m river dropped (`raised_too_long`, the epoch candidate waiting as
    `raised_too_tall`'s does), a declared one bent to a course whose clear spans fit
    `raisedWays.structure.maxClearSpanM`, no support in water but a frame growth's extension with no fitting course
    (above); **the wall and later work** (§2.7's laws, laws 1–4; their worked examples the crossing and way-and-channel
    tables, with the crossing table's lock, bent-group and fixed-place sentences; every count below of way corridors
    over a support ring or a `vault` span's strip reading standing rings and `vault` spans as the crossing table's
    *beneath* reads them (§2.7's laws, law 1 (8)); every clause of T110-1, T110-2 and T110-4, and every bar of the base
    or a volume that takes one of them or cites §2.7's laws (§8.11's T-ER-12 among them), asserting the outcome those
    laws give its fixture — a place a stroke, a drag
    or a costless rule sets where law 3 picks it, a pulled, cost-field or searched op's where its own cost does (law 2
    (a)), an aqueduct's crossing in the form its level there gives (law 1 (2)), a chamber laid again only once nothing
    lies across its span's strip (law 1 (8)), and a fixture's state as the epoch's own step order leaves it at the
    clause's op (V06 §3.2) —, naming a particular place, form, chamber or state only where its fixture's stated geometry
    fixes it (its seed searched so where the clause says so), and, where a clause's words and that outcome differ, the
    bar asserting the outcome; **the state sweep** — where a clause runs over it, the clause's case
    run once more for each of these states of its raised way, each on its own run of the clause's fixture, the state
    made by scripted ops before the clause's wall event — at an epoch clause, and on a clause whose wall events run over
    several epochs, the raised way locked by the script once its state is made, so that no epoch repairs, strikes or
    releases it (V06 §3.1) and the state holds, its meeting the unlocked cell's but for the `reshaped` entries law 4's
    (G2) writes for a placement-locked thing (§2.7's laws, law 2 *Entry*, law 4), save a clause whose event is a hazard
    or a landfall on the raised way (T-V5-14), which a lock keeps off it (§2.7's laws, law 2 *Entry*), that clause
    making each state inside its own epoch with the raised way unlocked —: C3, a span over the wall's line `ruined` by a
    `DeclineOp` `breach` and, on a second run, `cleared` by its `dismantle` after it; C4, every span over the line
    `ruined`; C5, the support nearest the line `cleared` — both its spans `ruined` first, then its `dismantle` (V06
    §3.19.2 (3)) — and, on a second run, `ruined` by a `topple` (V06 §3.11; it and both its spans, V06 §3.19.2 (4)) — on
    a raised way the clause locks, the state made before the lock (by the `topple`, or by hand `convert`s: a `breach` of
    both spans, then a `dismantle` of the support), a lock keeping both a hazard and the user's own ops off it (§2.7's
    laws, law 2
    *Entry*) —; C6, a `vault` span over the line breached — with its arch vault where no wall of the clause stood over
    the span before the event, else with none, the span read `open` — (the fixture's seed searched so that one reads
    `vault`); C8, the raised way placement-locked (a pin is one) and, from the milestone that carries the shape lock
    (J147, J150), on a second run shape-locked; on a third, an arch vault in a `vault` span over the line locked by the
    user before any wall of the clause stood over it; in a clause whose event lays a trace, on a fourth, a declared
    placement seated in that vault and locked by the user before the event; C10, C3's `ruined` span repaired by
    `repairRaised`, and, in a clause whose event lays a trace, the C3 run once more with that span repaired after the
    event — no gate, tower or fixed place under it but where §2.7's laws admit it (law 1 (4)–(6)) — and once more with
    that span `cleared` by its `dismantle` and repaired by hand after the event: a new span on the way's line over the
    run, its supports off the band, no gate, tower or fixed place under it but as §2.7's laws, law 1 (4)–(6), admit;
    C12, the deck extended by a frame growth (on the clause's variant whose raised way ends on the frame's outer ring,
    §2.7 *At the frame* — on a clause whose fixture names none, a variant whose raised way is declared to end there, as
    the aqueduct of T110-2's frame clause does —, the frame grown by an epoch before the event); C13, the raised way's
    Arch spacing edited, on a second run its Deck height, on a third its course re-shaped by a hand `moveVertex`. Each
    run takes its cell of §2.7's crossing table (the shape-locked C8 run its cell as §2.7's laws, law 1 (10), leave it:
    the later wall or raised way bent clear of what the lock holds, else refused, waiting or not built): the event's own
    records only, nothing of the raised way written by the clause's wall events but a chamber the table removes or lays
    again (`collapsed` where its span or a bounding support has fallen), the run's top read by *beneath* for that state
    (§2.7's laws, law 1 (7)), no gate's or tower's footprint in the under-deck strip but where §2.7's laws, law 1 (5),
    admit one, each reshape of a placement-locked thing shown (§2.7's laws, law 4; its worked example the lock
    sentence's (G2)), and every station, key, span and state the event does not name unchanged): (1) *over the band* — a
    CITY c15 town with a moated ring and an intervallum whose masonry aqueduct, laid at S6's end, crosses S3's ring with
    its channel there above the ring's top (§2.7's laws, law 1 (2): over): its supports off the band and out of the
    moat's water, every span over the band clearing the ring's top, the span over the band ruled with no reading of the
    wall (its `use` and `reason` those the span rule gives the same course with no ring there), a `vault` one read
    `open` with no chamber (§2.7's laws, law 1 (8)), and within every bound, the run beneath at its own top (§2.7's
    laws, law 1 (7)), no station, gate or opening, the ring's gates and strips as without it, a tower S7's spacing
    places under it standing there only where every span over it clears the tower's top, else laid along the trace at
    the nearest point the laws admit it (§2.7's laws, law 1 (5), law 2 (a), law 3), nothing reported, and, its seed
    searched so that S7's spacing places a tower in the aqueduct's under-deck strip beside its deck under no span, that
    tower standing there (§2.7's laws, law 1 (5), read with its terms); on a variant whose
    aqueduct's channel runs within the ring's height at the crossing, the crossing merged — the band built up to and
    around the aqueduct's arch there at the ring's own top, the water passing through it, no gate, postern or tower in
    it, nothing of either record written (§2.7's laws, law 1 (2), (5)); the same aqueduct founded by V06 §3.19 at a CITY
    epoch across the ring where its run is `breached` and, on a second run, `dismantled` (the ring placement-locked by
    the script once its run is so, so that the epoch's `fortification` step, which runs before its `raisedWays` step,
    repairs no run of it: V06 §3.1, V06 §3.2, V06 §3.7.5; a lock decides no meeting, §2.7's laws, law 2 *Entry*) — the
    gap left
    a gap beneath
    the arch, no `repairWall`; on a third run across a ring drawn by hand and placement-locked by the user — crossing it
    at the aqueduct's level (§2.7's laws, law 1 (2); its worked example *over the band*), no wait, nothing of the ring
    written (V06 §3.19 (5)); on a fourth across a retaining wall drawn by hand and placement-locked by the user — passed
    over, a support on its line built against it, nothing of it written (§2.7's laws, law 1 (2), law 2; its worked
    example the lock sentence's retaining wall; V06 §3.19 (5)); and a hand aqueduct drawn across a standing wall, its
    course bent clear of a tower whose top its arches would not clear (§2.7's laws, law 1 (5), law 2 (a)), with
    `bend.wall.aqueductArch` — and the same across a wall drawn by hand, which holds nothing unless locked (§2.7's laws'
    *held*), and across one the user placement-locked, no `refuse.locked` and nothing of the wall written (§2.7's laws,
    law 2 *Entry*; its worked example the lock sentence), and across a wall where no course keeps its supports off the
    band within `raisedWays.structure.maxClearSpanM`, refused (`refuse.raised.meeting`), nothing of either built; and
    one whose stroke ends under the wall's band or wall strips and, on a second run, runs along within them — its course
    bent to the nearest course §2.7's laws admit, its ends off the band and wall strips (law 1 (4), law 2 (a), law 3),
    with `bend.raised.wall`'s keep-clear form, else refused `refuse.raised.meeting`; and
    one whose channel at the wall runs above the wall's top by less than the deck's depth
    (`raisedWays.structure.span.deckDepthCm`), so that its span over the band would not clear it, its course bent to the
    nearest crossing law 3 picks in a form its level there gives — over, under a span that clears the wall's top, or
    merged, where its channel runs within the wall's height —, with `bend.wall.aqueductArch` in that form, else refused
    `refuse.raised.meeting` (§2.7's laws, law 1 (2), law 2 (a), (c), law 3) —;
    (1)'s aqueduct at S6's end on a variant whose recipe places a ring anchor, a river's water gate and an `on_enceinte`
    castle's weld vertex within one span of its best course — its course bent so that the anchor lies outside its
    under-deck strip and the water gate and the weld vertex in it only where §2.7's laws admit them (law 1 (4)–(6), law
    2 (a); its worked example the fixed-place sentence), S7's anchor tower standing at its anchor;
    (2) *down before the wall* — a CITY whose S4 route's best course crosses a valley at S3's gate, its deck down before
    the trace and its route through the gate on ground part 0 — S3's gate route, whose first point at `T = t_1` lay on
    its priced deck, re-solved by §4.2 S3 (7) with no deck across the stage-1 boundary, the gate on ground part 0 and S4
    committing the re-solved route, and the same on a variant whose route's first point at `T = t_1` lies past its
    deck's foot but nearer it than the first point beyond the foot (§4.2 S3 (7); §2.7's laws' terms) —; a twin-town CITY
    whose two nuclei S3 (6) merges under one enceinte across a ravine between them, its seed searched so that the
    inter-nucleus route's best course crosses the cross wall's line on a viaduct — that route re-solved by §4.2 S3 (7)
    so that its deck comes down before the cross wall and the route crosses it at its gate on ground part 0, beyond the
    foot, 0 deck lines across the cross wall (§2.7's laws, law 1 (1), (3), law 2 (a)) —, and, on a variant whose
    skeleton declares a viaduct across the partition line, the cross wall laid beneath its deck, its band built through
    each support in it and no raised way's ends under its band or wall strips (§4.2 S3 (6); §2.7's laws, law 1 (3), (4),
    law 2 (a)), and, from the milestone that carries the shape lock (J147, J150), on a variant whose declared aqueduct,
    shape-locked and running wholly inside the union, crosses the partition line with its channel within the cross
    wall's height wherever that line may be re-laid, the cross wall not laid, `W_RAISED_MEETING` reported and the stage
    walled by its enceinte round the union (§4.2 S3 (6); §2.7's laws, law 1 (2), (10), law 2 (c)); an elevated road
    whose course would cross a standing ring, not built and reported;
    on volume 6's engine an H-AQUA variant whose viaduct reading's `A` lies inside the CITY ring and `B` beyond it — not
    founded, `raised.waited` at each CITY and METROPOLIS epoch while the CITY ring's trace stands — and the same with
    the ring's run at the crossing `breached`; and a stage-2 primary S5b spawns whose best course is raised across its
    picked boundary, down before it — the stage's `N_k` gates all on ground part 0; 0 road decks across a trace standing
    when laid; a hand raised road drawn across a wall drawn by hand and placement-locked by the user where no gate
    stands on its ground course — brought down before it, its ground way's gate made in the placement-locked wall with
    the fate *reshaped* naming it (§2.7's laws, law 2 *Carried way*, law 4; its worked example the lock sentence), its
    course beyond the wall a ground way on ground part 0 to the stroke's end, the undo restoring the wall; a
    regeneration (keep) of a CITY whose stage-1 ring was drawn by hand and placement-locked by the user, an S4 route
    priced on a deck across it — the deck down before the ring and the route through one of the ring's standing gates,
    no gate made, the ring's gate count unchanged — and an epoch route priced on a deck across a standing ring, through
    a standing gate likewise (§2.7's laws, law 1 (3), law 2 *Carried way*; its worked example the crossing table's *down
    before the wall*; §5.3's gate row); an epoch on that CITY fixture growing a walled stage whose S5b spawned primary's
    best course crosses a valley at the stage's picked boundary on a priced deck — the deck down before the boundary,
    the primary's main gate on ground part 0 made by the stage's gate law, the stage's gates exactly `N_k` (§2.7's laws,
    law 1 (3), law 2 *Carried way*; its worked examples the crossing table's *down before the wall* and the
    way-and-channel table's row (d)); (3) *beneath* at generation — a CITY c14 fixture whose S4 viaduct over a valley is
    crossed by stage 2's moated ring: the ring on its course, its band laid through each support in it, no raised way's
    ends under its band or wall strips (§2.7's laws, law 1 (4); these laws' *ends*), its setback, glacis and berm as
    anywhere, a run
    beneath each standing span capped at its soffit and across each support built into it at the lowest soffit of the
    standing spans it bears and, beneath a span whose soffit stands above the ring's top, at its own top with the arch
    open above it, no gate or tower in the under-deck strip and no gate on the deck, the arterial on the deck pinning no
    gate and S5b's count read on ground part 0, the channel passing beneath only where it meets no support, ramp, stair,
    foot or `vault` span's strip, else stopped at the strip's edges (`W_RAISED_CROSSING`), its intervallum (the c14
    fixture's era row laying one) crossing under a span §4.3 admits or ending at the strip, the inner strip then bounded
    across it by its inner setback line, every station, key and span as S4's commit laid them; the same with
    `moat: 'all'` at the widest moat row — the channel stopped at the under-deck strip's edges, the outer strip closed
    across it as on a dry stretch, `W_RAISED_CROSSING` reported, no support in water; and a stage-2 ring whose boundary
    falls on an S4 viaduct's ramp at a valley rim — the arterial's gate pinned on its ground course beyond the foot and
    the trace laid through it, no raised way's ends under the band or its wall strips (§2.7's laws, law 1 (4); these
    laws' *ends*), the channel meeting the raised way by §2.7's laws (law 1 (1), (8); its worked example the
    way-and-channel table's row (e)), the stage's `N_k` gates on
    ground part 0; the same on a variant whose boundary crosses
    that arterial past the ramp's foot but nearer it than the first point beyond the foot and, on a second run, where
    its pin's band or wall strips would lie over the ends of a second S4 viaduct — the pin moved along its arterial to
    the nearest place §2.7's laws admit it within the pull's search band, the trace laid through it and the stage walled
    with its `N_k` gates on ground part 0 (§4.4 S5a *Trace* (2); §2.7's laws, law 1 (4), law 2 (a), law 3) —; and, on a
    third run whose seed is searched so that those laws admit that arterial's gate at no point of it within the pull's
    search band while S4's router can re-route it, between its nearest unmoved nodes, through a lawful gate of the
    stage, the arterial so re-routed, the stage walled with its `N_k` gates on ground part 0 and F-WALL's raised-way
    rung not run (§4.4 S5a *Trace* (2); §2.7's laws, law 2 (b)); a variant whose picked boundary crosses that deck
    within the pull's
    search band of the valley's rim — the pulled trace crossing it under the deck and never on its ground course beyond
    the foot, the stage's gates exactly `N_k`, 0 non-gate crossings (§4.4 S5a *Trace* (2)); a stage-2 ring whose
    boundary crosses the river under an S4 viaduct's span and, on a second run, is anchored on that river's bank inside
    the viaduct's fixed-place zone — the river crossing with its water gate, and the anchor with its tower, moved along
    the river clear of the zone, the trace laid to them; a spur town whose gorge-side stretch would anchor on the rim
    where a gate route's priced viaduct crosses the gorge — the anchor, laid after that viaduct (§4.2 S3 (9) after (5)),
    moved along the rim clear of its fixed-place zone with its tower — and, on a second run, where a viaduct on an S4
    route of its own would cross there, that viaduct, laid after the stage-1 trace, keeping the anchor outside its
    fixed-place zone; and a stage-2 ring anchored on that rim after the viaduct, the anchor moved along the rim clear of
    the zone with its tower; an `on_enceinte` castle sited at generation beside a gate route's viaduct, its weld
    vertices outside the viaduct's fixed-place zone (§4.2 S3 (8)'s filter); a castle sited at a regeneration (keep)
    beside an aqueduct the user placement-locked whose under-deck strip, under arches that do not clear the castle's
    walls, holds its first candidate's weld vertex and, on a second run, the midpoint of its least-cost side — the first
    claim passed over for the siting's next candidate, the second castle's town-side gate fixed on its next side whose
    gate §2.7's laws admit (law 1 (5), (6)), no weld vertex or gate moved
    after siting (§2.7's laws, law 1 (5), (6), law 2 (a)); and on that
    fixture a castle sited by hand (`setAttr(castle, 'site')`) so that a weld vertex of its claim falls in that strip —
    the claim moved whole to the nearest lawful site, measured back along the drag, with `bend.wall.raisedCrossing`'s
    castle line, and, on a second run with no lawful site within the drag's reach, refused `refuse.raised.meeting`
    (§2.7's laws, law 1 (6), law 2 (a), (c), law 3; its worked example the fixed-place sentence); 0 fixed places — water
    gates, anchors with their towers, weld vertices and castles' town-side gates, each with its footprint — where §2.7's
    laws, law 1 (4)–(6), bar one, and 0 gates' or towers' footprints where law 1 (5) bars one (§2.7's laws, law 1 (5),
    (6); its worked examples the fixed-place sentence and *Strips, zones and nearest points*);
    a CITY fixture holding a declared masonry aqueduct the user placement-locked across a corner of a castle's bailey,
    crossing its curtain at the aqueduct's level (§2.7's laws, law 1 (2); its worked example *over the band*),
    regenerated (keep), so that S7 lays the castle's internal paths (keep ↔ gatehouse ↔ wall stairs, §4.8) after it:
    each path crossing the under-deck strip under a span §4.3 admits or ending at the strip as at a reservation, 0 path
    corridors over a support ring, ramp, stair, foot or `vault` span's strip (§2.7's laws, law 1 (1), (8); its worked
    example the way-and-channel table's row (a)); and in every case of this clause each crossing of the ring's trace
    with a deck line counted once in S7's `W_RAISED_CROSSING` and each stopped channel once in S3's or S5a's (§5.4); on
    a variant of the river ring above whose `raisedWays.structure.stripMarginM` a table edit widens so that the S4
    viaduct's fixed-place zone holds every point of the river within the pull's search band — F-WALL's raised-way rung:
    the boundary re-pulled once, its search band widened to `wall.barrierReachM`, its river crossing and water gate
    clear of the zone, and, on a second run where the river within that reach lies inside the zone too, the stage left
    unwalled and `W_RAISED_MEETING` reported, nothing of the viaduct changed (§5.2; law 1 (6), law 2 (c); its worked
    example the crossing table's (G3)); a walled port whose skeleton declares a viaduct along its harbour's shore, a
    head of its harbour mouth in that viaduct's fixed-place zone — S7's chain laid at the nearest heads or shore points
    along the entrance whose gate and towers §2.7's laws admit, and, on a second run with none, not laid,
    `W_RAISED_MEETING` reported (§4.8 *The harbour mouth*; §2.7's laws, law 1 (5), (6), law 2; its worked example the
    fixed-place sentence); (4) *beneath* by hand and at an epoch — an epoch circuit across a standing
    aqueduct and one across a standing timber elevated road, an epoch contraction across an aqueduct, a hand `drawWall`
    across a standing aqueduct with a `vault` span in its line and one across a declared one-span masonry viaduct, each
    run again with the raised way placement-locked and with it pinned: no `refuse.locked`, the `vault` span's arch vault
    removed in the wall's commit (one of the hand op's consequences in its dry run, the fate *reshaped* on the locked
    and pinned runs, the hand undo restoring it with the same id; §2.7's laws, law 1 (8), law 4), a gate the wall makes
    for a ground way laid at the nearest point along that way at which §2.7's laws admit its footprint (§2.7's laws, law
    1 (5), law 2 (a), law 3) — and, on a run of the hand `drawWall` across the standing aqueduct whose seed is searched
    so that a ground way crossing under a span over level ground meets the new trace under that span's deck, the channel
    there above the wall's top and the span's soffit clearing the wall's top but not the gatehouse's, that gate moved
    along the way only until its footprint leaves the deck's plan, the footprint still meeting the under-deck strip
    beside the deck, the stretch bent through it, part of its bend —, every station, key, span and state of the raised
    way unchanged, the hand cases naming
    `bend.wall.raisedCrossing`; and a hand `delete` of a run beneath a standing viaduct — the viaduct unchanged, no
    bend, the run back on its undo; on a variant whose standing aqueduct's spans all read `open`, an owner's
    `undo(h, of)` of a hand `delete` of that aqueduct after a later hand `drawWall` through where its supports stood,
    its channel there above the wall's top — refused `refuse.undo.dependent` naming the `drawWall`, nothing restored
    (§2.7's laws, law 4); and a hand `drawWall` across a standing aqueduct drawn through one of its supports —
    where its channel runs above the wall's top along the deck within the stroke's reach, bent along the deck to the
    nearest lawful crossing (law 3), under a span that clears the wall, and, on a second run whose channel runs within
    the wall's height, kept on its line, merged round the support
    (§2.7's laws, law 1 (2), law 3) — and one across a viaduct's ramp nearer the first point beyond its foot than the
    deck's first lawful crossing, each measured along the deck line (§2.7's laws, law 3) — bent beyond its foot through
    a gate on the carried way's ground course —, and, on a second run, one across that ramp nearer the deck's first
    lawful crossing than the first point beyond its foot — bent to that crossing, under the deck's first span or at a
    support clear of the ramp (§2.7's laws, law 1 (4), law 2
    (a), law 3; its worked example the bent-group sentence (i)) —, each move part of its bend, named in
    `bend.wall.raisedCrossing`'s line (§2.7's laws, law 4); a hand `drawWall` across a viaduct with a `ruined` span and
    a `cleared` support in its line — the cap read from standing spans only (§2.7's laws, law 1 (7)), the trace through
    the cleared ring as open ground, no fate; a hand `drawWall` across a standing viaduct where a ground way crosses the
    new trace under a span — that way's gate clear of the strip, the stretch bent through it, part of its bend; a hand
    `placeGate` inside a viaduct's under-deck strip — moved along the trace clear of it, `bend.wall.raisedCrossing`; and
    the viaduct's Arch spacing changed after the wall was drawn — its station in the band slid off it, the band whole
    there; the hand rows of §2.7's crossing table on this clause's standing aqueduct with a `vault` span in its line and
    on its declared viaduct — a hand `convert` `breach` and `dismantle` of the epoch circuit's run beneath (W4), a hand
    `convert` `wearWall` and `neglect` of it (W5), a `repairWall` of the breached run and of the `dismantled` one, its
    new stretch drawn on its line and meeting the raised way as a hand `drawWall` does (W10), a hand `delete` of the run
    (W11), a hand `convert` `gateToJunction` of a gate of that run beside the raised way (W6) and a hand `convert`
    `absorbWall` of its ring (W8), a hand `placeGate` inside the under-deck strip and a gate of that wall slid by its
    grip into the strip — the placed gate moved along the trace to the nearest place §2.7's laws admit it (§2.7's laws,
    law 1 (5), read with its terms) and the slid one back, on the side its grip came from, to the
    first such place, its road following, the trace unchanged, with `bend.wall.raisedCrossing`'s gate form (W13) —, a
    hand `contractWall` of the ring across the aqueduct (W1 by hand) and a hand `setAttr` re-grading a `light` stretch
    of the hand `drawWall` above to `full` under the aqueduct — its wider band kept to a lawful crossing, re-traced
    locally where it would not cross lawfully, part of its bend (§2.7's laws, law 2 (a), law 3, law 4; its worked
    examples the bent-group sentence and row W14) —, together with the epoch circuit and the hand `drawWall` above (W1,
    W2), each run over the state sweep: each its cell's outcome, no `refuse.locked` with the raised way placement-locked
    or pinned, an arch vault a delete lays again `collapsed` where its span has fallen; each hand row run again on the
    hand `drawWall`'s run (drawn and not locked, so changed as an unlocked run: the cell's outcome) and on a run the
    user locked (§7.1's lock row: `refuse.locked`, nothing written) (§2.7's laws, law 2 *Entry*; its worked example the
    lock sentence's reach); a hand `drawWall` drawn along beneath a standing aqueduct through two of its supports, one
    entering and leaving its under-deck strip on one side, and one ending at a support — each such part moved to the
    strip's edge on its entry side, its band outside the under-deck strip, part of its bend, named in
    `bend.wall.raisedCrossing`'s line, every station, key and span unchanged (§2.7's laws, law 1 (4), law 2 (a), law 3;
    its worked example the bent-group sentence); an epoch circuit across a standing aqueduct whose `vault` span holds an
    arch vault the user placement-locked (the fixture's seed searched so that the circuit's line crosses the deck line
    under that span and no way, square or channel — an intervallum among them — is laid across that span's strip while a
    wall of this clause stands over it; §2.7's laws, law 1 (8), law 2 (a)) — the circuit crossing under that span, its
    chamber not laid while the wall
    stands, its lock and id kept, a `reshaped` entry naming it, and after a hand `delete` of that run the chamber laid
    again, locked, with the same id; the same by a hand `drawWall`, with the fate *reshaped*; on a second run with a
    declared placement seated in that vault and locked by the user — the circuit crossing the deck line clear of that
    span's strip at the aqueduct's level, the building, its chamber and its door unchanged, 0 footprints in a band or
    setback, no band or wall strip of a crossing at the neighbouring span over its span's strip, and a hand `drawWall`
    across that span moved along the deck line to the nearest lawful crossing (law 3), clear of the held building's
    strip and in the form the aqueduct's level there gives, part of
    its bend, named in `bend.wall.raisedCrossing`'s line, the building, its chamber and its door unchanged, and on a
    one-span way the same stroke refused `refuse.raised.meeting` naming the building, no Unlock offered (§2.7's laws,
    law 1 (2), (9), law 2 (c), law 3); and, on a CITY fixture whose standing ring was drawn by hand and placement-locked
    by the user, a standing aqueduct's course re-shaped by hand so that a stretch of it crosses the ring — that stretch
    crossing the ring at the aqueduct's level, its supports off the band (§2.7's support step (3)), over where its
    channel runs above the ring's top, every span over the band clearing it, merged where it runs within the ring's
    height, and its under-deck strip clear
    of the ring's gates, towers and fixed places but where §2.7's laws admit them (law 1 (2), (4)–(6), law 2 (a); its
    worked example *over the band*) — and a standing declared viaduct's course re-shaped so that a
    stretch of it would newly cross the ring — the drag bent back along itself until no stretch newly crosses the ring,
    else refused `refuse.raised.meeting`, and a 3 m nudge of a stretch already passing over the ring keeping that
    crossing, the ring beneath (§2.7's laws, *Order*, law 2 (a), law 3) —, no `refuse.locked` (§2.7's laws, law 2
    *Entry*; its worked examples the crossing table's C13 and lock sentence); on a variant whose standing aqueduct and
    declared viaduct cross the epoch circuit's planned line with their under-deck strips within the ring's band's width
    of each other, the epoch circuit and a hand `drawWall` across both — each crossing lawful for both deck lines, every
    tower, gate and fixed place where §2.7's laws admit it against each raised way (§2.7's laws, law 1 (4)–(6)), one
    moved out of either's strip or zone stopping at the nearest such place, none moved into a strip or zone that bars
    it, nothing of either raised way written (§2.7's laws' terms; its worked example *Several raised ways*); the
    standing aqueduct with a declared placement seated in a `vault` span and locked by the user, its course re-shaped by
    hand and, on a second run, its Arch spacing edited so that the held building's strip would take in the epoch
    circuit's standing line — the edit bent to the nearest lawful course or spacing (law 3), which keeps the line out of
    it, the building, its chamber and its door unchanged, and, where none does, refused `refuse.raised.meeting` naming
    the building, no Unlock offered (§2.7's laws, law 1 (9), law 2 (a), (c)); an epoch circuit and, on a second run, an
    epoch contraction whose planned water gate and anchor fall in the declared viaduct's fixed-place zone — each moved
    along the river or the barrier's edge clear of the zone with its tower, the trace laid to it, the move counted in
    neither `walls.waited` nor `walls.raisedCrossings` (each crossing of the viaduct's deck line the trace makes counted
    as §2.7's laws give it, law 4; its worked example *beneath*'s *Reported*) (§2.7's laws, law 1 (6), law 2 (a)); a
    hand `drawWall` whose end snaps to
    a shore inside that zone with a clear point within `wall.barrierReachM` — the anchor moved along the shore clear of
    it with its tower, part of its bend, named in `bend.wall.raisedCrossing`'s line in its fixed-place form; a hand
    `setAttr` of the hand `drawWall`'s kind, under the aqueduct, to a kind whose band is wider (W14), as the grade
    change; on a variant whose `raisedWays.structure.pierSpacingM` band a table edit narrows so that no span of the
    standing aqueduct over the circuit's planned line clears the ring's band, its channel running above the ring's top
    wherever the circuit's search band and the strokes' reach meet the aqueduct (§2.7's laws, law 1 (2): over, never
    merged), an epoch circuit across the standing aqueduct waiting
    (`walls.waited`), and a hand `drawWall` across it and a hand stretch whose anchor lies inside its under-deck strip
    with no clear point within `wall.barrierReachM`, each refused `refuse.raised.meeting` with the nearest lawful
    declarations, nothing of either written (§2.7's laws, law 1 (2), (4), law 2 (c)); on a variant whose only lawful
    crossing of the standing aqueduct by a hand `contractWall` of the ring lies beyond the pull's search band but within
    `wall.barrierReachM`, that `contractWall` refused `refuse.raised.meeting`, its search band never widened (§5.2's
    F-WALL row; §2.7's laws, law 2 (a), (c)); and, on a fixture whose river
    crosses the ring beside a viaduct over the river, an epoch `shiftCourse` that would carry the ring's river crossing
    into the viaduct's fixed-place zone — its water gate placed along the river clear of the zone within the run its own
    law re-traces, every tower and gate outside that run unmoved, and, on a second run where no clear point lies within
    that run (§2.7's laws, law 1 (11), law 2 (c)), the shift not made that epoch and counted in `walls.waited`, the
    river, the ring and the viaduct unchanged (F-REDERIVE's raised-way rung, §5.2); (5) ways and channels — on the CITY
    and METROPOLIS fixtures, 0 supports in a moat's water, a gate plaza, a quay's corridor, a pier, a mole or a way's
    corridor, and none in the band of a wall standing at the raised way's creation — among them a CITY masonry viaduct
    across a `quay`-banked river at its clear-span bound (both bank stations behind the quays' corridors, each quay one
    connected way passing under its span) and a CITY S4 timber viaduct crossed by a `through` S5b road and an S5c
    street, each crossing under a span clear of its supports; an H-AQUA epoch growing a stage over a standing aqueduct's
    land, an epoch route re-solved under a viaduct, a hand road drawn across one, a hand road drawn across one where a
    wall runs beneath it, crossing the trace under the deck — moved along the deck to cross the trace clear of the
    under-deck strip at a gate (`bend.raised.underSpan`); a hand road drawn across a wall under a standing aqueduct's
    arch that clears the gate and the wall, square to the deck and passing the strip by §4.3's crossing rule — its gate
    made there, no bend — and, on a second run where that arch does not clear the gate, moved along the deck to the
    nearest crossing at which §2.7's laws admit its gate (§2.7's laws, law 1 (5), law 2 (a), law 3), a hand road wider
    than every `open` span's clear width drawn
    across one, a hand carve of a canal across a standing viaduct whose drawn crossing meets a support and one wider
    than the clear width between every two of its supports, a hand carve of a canal across a generated ring beneath
    which a standing aqueduct passes, its re-traced run's new strips meeting the aqueduct's supports — the run meeting
    it by §2.7's laws (§2.7's laws, law 1 (2), (4); its worked examples the crossing table's *beneath* and row W2), bent
    where the bent-group sentence says (§2.7's laws, law 2 (a), law 3), no F-EDIT conflict (§4.11 *Other crossings*) —,
    a hand `moveCourseKnot` moving the river of that fixture so that S1's water operator re-traces a run of the ring
    beneath the same aqueduct — the run meeting it by §2.7's laws, no F-EDIT conflict and no `cut`, every station, key,
    span and state of the aqueduct unchanged (§7.3 (b) 3) —,
    and the same carve across a ring the user placement-locked — refused by §7.1's lock row (`refuse.water`), nothing
    written (§2.7's laws, law 2 *Entry*; its worked example the lock sentence's reach) —, each hand case run again with
    the raised way placement-locked and with it pinned — 0 way corridors over a support ring, ramp, stair, foot or
    `vault` span's strip, every way crossing under a span §4.3 admits (`bend.raised.underSpan`; the wide road round the
    raised way, `bend.raised.around`), the first carve moved along the deck to the nearest crossing that meets none of
    these and passing beneath with no support in water (`bend.raised.underSpan`), the second stopped at the under-deck
    strip's edges, both ends against the ground as against a berm (`bend.raised.around`), no `refuse.locked`, every
    station, key and span unchanged; (6) regeneration — (1)'s c15 fixture, its aqueduct crossing every S4 route under a
    span §4.3's crossing rule admits, with its aqueduct placement-locked, regenerated (keep): the routes, the ring, its
    strips, band, towers and gates byte-identical in the model digest (§6.2), the ring's `laidAt` taking the
    regeneration's order (§2.7's laws' *Order*, *Newer*); a variant whose aqueduct crosses an S4 route obliquely,
    regenerated:
    that route re-solved to cross under the nearest span the rule admits, the ring re-derived from the new routes, every
    meeting by §2.7's laws (§2.7's laws, law 1; its worked example *beneath*); then given New random, its seed searched
    so that the new ring's boundary meets one of the aqueduct's supports and its channel runs above the ring's top
    wherever S3's pull's search band meets the aqueduct — the trace crossing the deck line under a span, never at a
    support, S3's pull searching only the shapes §2.7's laws admit (law 1 (2): over; law 2 (a); its worked example the
    crossing table's *beneath*; §4.4 S5a *Trace* (2)), no standing support in the band and every span over it clearing
    the ring's top, and on (1)'s variant, its channel within the ring's height wherever that search band meets the
    aqueduct, the crossing merged wherever the trace crosses the deck line
    (§2.7's
    laws, law 1 (2)), every station, key and span of the aqueduct unchanged; and (3)'s `moat: 'all'` fixture re-derived
    from S4 with its viaduct placement-locked — stage 2's ring and moat meeting it as in (3), no station moved, added or
    omitted and no key minted, 0 S5b or S5c way corridors over a support ring, ramp, stair or foot; and (1)'s c15
    fixture with its aqueduct placement-locked, regenerated (keep) and given New random over the state sweep (row W3),
    New random's seed searched so that the new ring's trace crosses the deck line through the `cleared` support's former
    ring, both its fallen spans' recorded soffits clearing the ring's top, and, on the `topple` run, so that its
    boundary meets the `ruined` stump — the trace through the cleared ring as open ground (§2.7's laws, law 1 (2): every
    span above the band, standing or fallen, clearing its top) and crossing the deck line
    clear of the stump as of a standing support, the band whole across each former footprint, the run at its own top
    beneath each fallen span, no chamber in the breached `vault` span, each S4 route the regeneration re-solves crossing
    the deck under a span §4.3 admits, its clear width read between standing rings, every station, key, span and state
    of the aqueduct unchanged (§2.7's laws, law 1 (2), (7), (8); its worked example row W3); a CITY whose stage-1 ring
    was drawn by hand and placement-locked by the user, regenerated (keep) and given New random — the ring held before
    every stage, (1)'s S6 aqueduct crossing it at the aqueduct's level with its supports off the band and its strip
    clear of the ring's standing towers, gates and fixed places but where §2.7's laws admit them (law 1 (2), (4)–(6);
    its worked example *over the band*), an S4 route priced on a deck across it brought down before it
    through a standing gate (§2.7's laws, law 1 (3), law 2 *Carried way*), nothing of the held ring changed but by the
    lock sentence (§2.7's laws, law 2; its worked example the lock sentence); a CITY whose skeleton declares a raised
    road (T4 `road` with `raised`) over the valley beside S3's ring, placement-locked by the user, regenerated (keep)
    and given New random, its seed searched so that the stage-1 boundary crosses the raised road's ground course beyond
    its foot and, on a second run, only its deck — the first run's gate beside the N main gates on ground part 0, decked
    where the city moat is wet and counted among the roads leaving the stage, the second run's trace crossing beneath
    the deck with no gate and its pull never moving the crossing onto the ground course, and, on a third run whose seed
    is searched so that §2.7's laws admit no gate for that way where the boundary crosses its ground course nor at any
    point of that way within the pull's search band, where law 2 (a) would move it (§4.4 S5a *Trace* (2)), the way
    re-routed by law 2 (b) through the nearest of the stage's gates a way of its class may pass (§2.7's laws, law 2
    *Carried way*, (a), (b); §5.3's gate row); on a fourth run whose seed is searched so that §2.7's laws bar that way's
    gate where the stage-1 boundary crosses its ground course (law 1 (4) or (5)) but admit one at a point of that way
    within the pull's search band, the gate moved along the way to the nearest such point and the trace pulled through
    it, the way not re-routed (§4.2 S3 (7); §2.7's laws, law 2 (a)); and on a fifth whose seed is searched so that a
    stage-2 boundary with a wet outer moat crosses the raised road's ground course beyond its foot, the way's gate a
    lawful pin of S5a and the way kept across the outer moat on a deck at that gate, perpendicular to the channel — the
    way re-routed between its gate and its next pinned node beyond the channel where it would meet the channel more than
    10° off its normal —, never cut (§4.4 S5a *Outer moats*; §2.7's laws, law 2 *Carried way*); on a sixth whose
    skeleton seats a building in the arch vault of the raised road's `vault` span nearest its foot and locks it, its
    seed searched so that the stage-1 boundary crosses the way's ground course where the trace's line there would lie in
    that held building's strip (law 1 (9)) and §2.7's laws admit a gate at a point of that way within the pull's search
    band — the gate moved along the way to the nearest such point and the trace pulled through it, the stage walled and
    F-WALL's raised-way rung not run — and on a seventh the same at a stage-2 boundary, the way's pin so moved (§4.2 S3
    (7); §4.4 S5a *Trace* (2); §2.7's laws, law 1 (9), law 2 (a), law 3); and (1)'s c15 fixture with its aqueduct
    placement-locked, regenerated (keep) with `wealthLevel` raised so that stage 2's S5d top-up fires, its seed searched
    so that the top-up's arc between two pinned gates must cross the aqueduct where its channel runs above the ring's
    top by less than the deck's depth (`raisedWays.structure.span.deckDepthCm`) wherever that arc's search band meets it
    — that arc not re-traced, kept as it stood, its shortfall moved to the next stage's quota and reported
    (F-BUDGET-STAGE), the stage walled, F-WALL's raised-way rung not run and nothing of the aqueduct changed (§4.4 S5d;
    §2.7's laws, law 2 (c)); and (3)'s table-edit variant regenerated
    (keep) with its viaduct placement-locked by the user — the same rung; (7) parts going — after (4)'s epoch circuit
    ran beneath the standing aqueduct, a span over the band `ruined`, then the span beyond one of its supports `ruined`
    and that support, both its spans fallen, `cleared` and a `vault` span
    over the trace breached by scripted `DeclineOp`s (as its lapse's salvage would, V06 §3.19.2 (3)); and, on a second
    run, the aqueduct deleted by hand: the run whole across each former footprint and at its own top throughout, 0 gaps
    in its band and the enceinte's closure unchanged, the delete's undo restoring the aqueduct and, where its crossing
    is merged, the band built round its arch and piers again (§2.7's laws, law 1 (2), (7)); then the lapsed span
    repaired by `repairRaised` — the span over the run again, the run at its own top, no wall op; and, in the cells' own
    order, an epoch circuit laid across the aqueduct after a span over its planned band fell `ruined` and after a
    support there was `cleared`, both its spans fallen first (their recorded soffits clearing the ring's top, the seed
    searched so that the circuit's line crosses the deck line through that support's former ring: §2.7's laws, law 1
    (2)), the aqueduct then placement-locked by the script so that
    no epoch's `raisedWays` step
    repairs it before the circuit is laid (§2.7's laws, law 2 *Entry*: a lock decides no meeting) — the run at its own
    top beneath the fallen span, the trace through the cleared ring as open ground — and an epoch contraction laid after
    a support by its planned line was `cleared`, both its spans fallen first (their recorded soffits clearing the ring's
    top, the seed searched so that the contraction's line crosses the deck line through that support's former ring:
    §2.7's laws, law 1 (2)), the aqueduct then placement-locked by the
    script so that no epoch's
    `raisedWays` step repairs it before the contraction is laid (§2.7's laws, law 2 *Entry*: a lock decides no meeting)
    — the trace through its former ring; (8) `wallToWay` of (3)'s stage-2 ring once superseded, its fate set to `road` —
    the ring road crossing the viaduct's under-deck strip under a span §4.3 admits, re-routed by §7.3's S4 operator,
    else ended at the strip's edges; 0 way corridors over a support ring, ramp, stair, foot or `vault` span's strip, no
    junction with the raised way; the same on a fixture whose old line passed under a `vault` span of a standing
    aqueduct with no other way or channel under it — the dry run reading that span `vault` (the state the op leaves),
    the ring road re-routed under another span, the arch vault laid again with its id in the commit, 0 way corridors
    over its strip (§2.7's laws, law 1 (8); its worked example the way-and-channel table's row (c)); on a second run
    with the intervallum also passing under that span — the span read `open` while the intervallum lies there, no
    chamber over the lane, the ring road crossing under it by the crossing rule, a hand `delete` of the intervallum
    leaving the span read `open` while the ring road lies across its strip, and a hand `delete` of the ring road then
    laying the chamber again with its id (§2.7's laws, law 1 (8); its worked example *beneath*); on a third with the
    moat passing under it — the span read `open` while
    its water lies there, no chamber in the water (§2.7's laws, law 1 (8); its worked example the crossing table's
    *beneath*); and (3)'s `wallToWay` run over the state sweep, its viaduct placement-locked and pinned among them — the
    ring road by row (c) read at that state, a re-laid vault `collapsed` where its span has fallen, no `refuse.locked`;
    (T110-3) generated raised ways only at CITY and METROPOLIS, each with its reason recorded (`drop`, `link` or
    `water`), within the rung's cap, and a removed one still removed after regeneration — with the tendency specs
    `T110b.viaduct`, `T110b.aqueduct`, `T110b.elevated.prosperity` and `T110b.elevated.landmarks` (volume 12 §3.6b's bar
    map); (T110-4) **the family's laws** (§2.7's laws; J146): §5.3's law-1 row passes after every commit — (a) on every
    fixture of T110-1 – T110-3, T114-3, T-V4-63, T-V4-80, T-V5-14, T-V6-11, T-V6-47, T-V6-48 (with a declared viaduct
    along its harbour's shore whose fixed-place zone holds a head of its harbour mouth before the chain is laid, its
    course kept off the basin and the mouth by §4.3 *Where it may not go*), T-V6-71, T-V6-73, T-V7-32, T-V7-48 and
    T-V9-52, and on T110-2 (6)'s New random of (1)'s
    merged variant, its seed searched so that the new ring's trace crosses the kept aqueduct's deck line at one of its
    supports where its channel runs within the ring's height, the ring crossing the aqueduct merged there (a pier in the
    band) run with W4, W5,
    W10 and W12 — decay, a breach, a
    dismantling, a landfall and a repair each applying, the form unchanged (§2.7's laws, law 1 (2)); (b) on each of
    those clauses' raised ways over the state sweep (T110-2's lead); and (c) on a randomised sequence of 200 ops on each
    of 32 fixed seeds — CITY and METROPOLIS maps with at least two raised ways (an aqueduct with a `vault` span seating
    a building the user locked, and a road deck, one of the two placement-locked and, on a second run, shape-locked,
    and, on a third, the ring both meet shape-locked before an aqueduct stroke and a raised road are drawn across it by
    hand and an aqueduct is founded across it at an epoch — the shape-locked runs from the milestone that carries the
    shape lock, J147, J150) and a village rung holding a declared viaduct and aqueduct, one of them placement-locked —
    its ops drawn from law 4's list on every path, an `editTable` or `adjust` of a cell §2.7's laws read among them
    (`raisedWays.structure.stripMarginM`, §4.8's band and setback rows, `palisade.bandM`,
    `raisedWays.structure.span.deckDepthCm` and a `walls.barriers` height row): a generation from a creation prefix (a
    skeleton), Regenerate (keep), New random, an epoch run of 20 epochs with the hazards and the landfall on, a village
    derivation and its epochs, a history replay (a village refounded in it over a former CITY's aqueduct among them), a
    village dossier's absorb with no epoch adding a wall record across a declared aqueduct, and hand ops sent both as
    the canvas's scripted gestures and as the clerk's calls, each hand op undone, and then redone, on a second run; and
    on every run: each op's outcome one model digest and one records digest on two hosts; no meeting refused, skipped or
    altered for a placement lock; each reshape of a placement-locked structure, part or way other than the op's own
    target, and of a placement-locked part of the op's own (an arch vault), shown (an `EditFate` *reshaped* by hand, a
    `reshaped` report
    entry otherwise); every locked structure's placement, and every shape-locked one's outline and size, unchanged by
    every op that does not name it, no op making or deepening a meeting that changes a shape-locked one (§2.7's laws,
    law 1 (10); its behaviour under an undo, a redo, a re-grade or value edit within a standing meeting and a repair
    outside this bar, J150), and no gate, postern, tower or fixed place moved for a meeting, locked or not (§2.7's laws,
    law 1 (11)); nothing held because it was drawn or declared (J147); each undo and each redo restoring the prior
    digest or re-applying its event's, or refused `refuse.undo.dependent` with its reason where §2.7's laws would not
    then hold (§2.7's laws, law 4; a lock's behaviour under either outside this bar, J150); and each
    skeleton exported and re-imported reproducing its source's model digest where no declaration on the source met a
    generated structure laid before it (T101-4), and otherwise its meetings as §2.7's laws' law 2 *Newer* gives a
    creation prefix, its own re-export reproducing the re-import's digest; (T110-5) deck plots within the deck's width
    and budget, falling with the deck, and a deck slot whose face would cross the outer ring left out, reported and
    re-offered by a frame growth; a walled, moated fixture with stone moat bridges holds 0 deck plots on a bridge over a
    `moat` or `castle_moat` whose way is a `Gate.way`; (T110-6) both known-city fixtures pass (T101-6); (T110-7) with
    the terrace, raised-way and deck-plot rows off — V11 §3.24.0's switches — byte-identical to the base (a `NoOpPin`;
    volume 2's T-V2-50, volume 6's T-V6-65, volume 7's village pin and volume 11's T-V11-31 register theirs on the same
    engine); (T110-8) a stepped building's tiers nest and cast one shadow each. Volume 6 runs T110-2's epoch clauses
    (4), (5), (7) and (8) on its engine (T-V6-47; (4)'s arch-vault circuit by T-V4-80 (i)), and (1)'s foundings across a
    decayed ring and across a ring and a retaining wall drawn by hand and placement-locked, and (2)'s founded viaduct
    across a standing ring, its epoch route through a standing gate and its epoch walled stage's spawned primary
    (T-V6-73).
  * *Water in dry country (item 111; §4.2 S0–S1, §4.2 S3, §4.4, §4.5, §4.7 S10b).* (T111-1) on arid seeds the share of
    households within walking distance of water — the coverage radius of volume 11's water-supply family — exceeds the
    non-arid baseline (a `StatBarSpec`, higher-with); (T111-2) an oasis stands only on an arid site unless drawn (T2
    `ground`'s spring flag) or supplied by a dossier's `oasis_water`, and an oasis reads as water for every rule that reads
    water (conformance); (T111-3) arid sites still draw rivers, lakes and coasts at the arid row's chances (a rate
    `StatBarSpec` per water kind under §13.7's tendency row); (T111-4) on arid seeds the richest band's mean distance to water below the
    middle band's in most towns (a `StatBarSpec`); (T111-5) with item 111's climate dry cells at V11 §3.24.0's off
    form — the oasis chance, the water pull, the water prosperity term and the well yield weight 0, the sun cell and the
    well coverage factor 1 — byte-identical to the base (a `NoOpPin`). Volume 7 runs them at the village rungs
    (T-V7-58), volume 6 over epochs, a failing spring weakening its pull (T-V6-72), volume 8 the port's clauses
    (T-V8-50), volumes 10 and 11 T111-5's registration on their goldens and sites (T-V10-45, T-V11-38) and volume 12 the
    specs, the pin and the register lines (T-V12-44).
  * *Colour-blind-safe maps and the trial (item 112; §8.2, §9).* (T112-1) the style check: in every checked variant (`StyleSheet.variants`' `protan`, `deutan` and `tritan`, selected
    per viewer by the view key `cvdVariant`, §8.2) of every shipped family, every pair of categories a legend distinguishes (district tints, prosperity, ownership,
    knowledge, the underground's systems, water and ground classes) passes the simulated-deficiency contrast check —
    protanopia, deuteranopia and tritanopia simulated on the legend's swatches — at or above §8.2's deficiency-contrast
    threshold (a table value), and each such category carries its second cue (a pattern, line style, label or shape) at
    the legend-bearing zoom stops and in the thematic views; (T112-2) the game-master trial's report exists before the
    public release (§16's release gate), its findings entered in volume 12's calibration record and the fix list.
    Volume 9 runs T112-1 on its thematic views and T112-2's trial (T-V9-72) and volume 12 the style line (T-V12-45).
  * *History at generation (item 113; §4.2 S0, §4.11, §7.7, II.7.6).* (T113-1) a "city to village" history fixture shows
    walls and street lines beyond the present fabric and an oversized church, while the dossier's present facts match
    exactly; (T113-2) the replay is byte-stable per seed and history — one digest on the five engines; (T113-3) a refounded
    fixture reuses the old roads, gate gaps, bridges and foundations wherever the route cost admits them for the new
    plan's destinations; (T113-4) buried ruins appear only past the burial threshold and match the former geometry — its
    streets, walls and major buildings at their old ground level; (T113-5) closing a void's last open link makes it LOST
    and reopening restores it, its dwellings emptied by the vacancy rules and returning with access; (T113-6) a symbolic
    peak only with evidence of a higher tier, sized inside that tier (by default at its range's lower quartile) and
    marked `symbolic`, and no peak without evidence; (T113-7) with history replay off, byte-identical to the base (a
    `NoOpPin`). Volume 6 runs them on its replay engine (T-V6-71), volume 4 T113-4 and T113-5 on the underground's output
    (T-V4-77, T-V4-76), volume 7 the village halves of T113-1 and T113-3 (T-V7-59), volume 8 the dossier's history
    (T-V8-51), volume 11 T113-7's registration (T-V11-39), volume 12 their register lines, T113-7's pin and the
    replay's budget (T-V12-46).
  * *Walls that decay and recover (item 114; §2.7, §5.3, §7.1, §7.4, §7.7, §8.2, §11).* (T114-1) a poor, threatened fixture —
    the need sustained high, the means sustained low — shows its breached runs `patched`, each in a patch row of its wall
    kind and culture, and no robust rebuild; (T114-2) a rich, threatened one rebuilds its breached and patched runs
    robust, inside the `fabric` cap; (T114-3) a safe one decays through `worn` to `breached`, no run going from
    `standing` to `breached` in one change, and on a neglected, poor CITY ring over 20 epochs with a masonry aqueduct
    over it, the run beneath the aqueduct decays through `worn` to `breached` as every other run, the deck standing on
    its own supports throughout (§2.7's laws, law 1 (2), law 4; its worked example the crossing table's *unchanged
    meeting*); its landfall clause, on volume 5's landfall (V05 §3.16): a landfall over an aqueduct's span and the run
    beneath it — the run `breached` by the wall row and the span and the supports it covers `ruined` by theirs, then
    each repaired by its own op (`repairWall`, `repairRaised`), neither waiting on the other, the landfall's undo
    restoring both; (T114-4) recovery replaces patches oldest first, by the week of each run's last-change epoch
    (`EpochRecord.inputs.week` of its `conditionEpoch`; generation's epoch 0 first, every replay epoch's week before
    every live one's — §6.1, V06 §3.7.7 (3)), never the epoch's number (volume 12's spec `T114g.oldestFirst`); (T114-5)
    no run changes its condition without a driver sustained over its table window — a driver alternating across its
    threshold every epoch changes no run (`T114g.sustained`); (T114-6) every state is told from every other in greyscale
    — T112-1's contrast check on luma alone, at §8.2's threshold — at every band where both of a pair draw, `worn` at
    the district band and finer (a `BenchBarDef`); (T114-7) with no replay, every run's generation-time condition
    derives from the dossier's readiness and the wealth by §7.7's DR41 at its table shares — a vulnerable poor fixture
    shows patched and breached runs, a fortified rich one stands whole — each fixture of the readiness × wealth grid
    within one run's length of its row's shares (a `BenchBarDef`); (T114-8) with the need and the means at their neutral
    values, every run at generation `standing` and V06 §3.7.3's neglect and V06 §3.7.5's repair reproduced over epochs,
    byte-identical to the build without item 114 (a `NoOpPin`, `item114.condition`); (T114-9) a way crosses an enceinte
    at a gate or at an opening of item 114 and nowhere else: a refounded village's tracker crossing a ruined former
    enceinte at a `breached` run and at a gate gap commits with 0 violations of §5.3's wall-crossing row, and a TOWN
    epoch beside a `breached` run grows no way through the breach (§5.3; §4.4 S5c's legality); (T114-10) on a CITY
    fixture with an `on_enceinte` castle at a vulnerable, poor town's generation shares and over 10 epochs, the town
    enceinte's and the bailey's three profiles along `Castle.cityWeld` are equal at every commit (§2.7's welded
    stretch), §8.2 draws one state there, and §11.1's battle-map export gives one wall-or-opening answer per edge. The
    hand forms — T3 `wall`'s repair with a material and `wearWall` — are §7.4's fixtures of each kind in B-EDIT. Volume
    6 runs T114-1 – T114-5 save T114-3's landfall clause, T114-8's and T114-10's epoch clauses on its engine, T114-4's
    replay case on its history-first fixture (T-V6-73), volume 5 T114-3's landfall clause on its landfall fixture
    (T-V5-14), volume 7 the palisade's (T-V7-62) and T114-9's village clause on its replay fixture (T-V7-59), volume 8
    the readiness from the dossier (T-V8-52), volume 9 the repair tool and the legend (T-V9-74), volume 10 the story
    told (T-V10-47), volume 11 the rows and T114-8's registration (T-V11-40) and volume 12 the specs, the pin and the
    register lines (T-V12-47).
  * *The grandeur ceiling (item 115; §4.7 S10b, §10.2).* (T115-1) rich THORP, HAMLET and VILLAGE fixtures at the wealth
    maximum hold no dwelling with an `H` or `U` plan, a court, a tower or a turret but the manor, every other dwelling at
    most `single`, `L` or `T`, a richer settlement moving its dwellings only along their capped rows (`bldg.grandeur`,
    reported nightly at every rung); (T115-2) the manor count by rung: no manor at THORP or HAMLET unless specified —
    V08 §3.16 (3): a dossier-bound record of a class in `grandeur.ceiling`'s `settings.grandClasses` (V11 §3.25.4), or a
    dossier government whose `villageSeat` names the manor house, seigneurial or crown (V11 §3.21.1); a seigneurial
    government alone admits none — and at VILLAGE at most one, only with a lord (a seigneurial government) or when
    specified; the manor count never rises with the wealth (§4.7 S10b (3); V11's `grandeur.ceiling` rows); (T115-3) a grand building the dossier specifies (V08
    §3.16 (3)) and one the user places or reshapes by hand keep their full design above the ceiling, never
    refused (item 101 R2); (T115-4) TOWN rungs and above byte-identical to the build without the ceiling table (the rung
    pin `item115.ceiling`), and with every ceiling row's `enabled` false — V11 §3.24.0's off form — every rung
    byte-identical to the base (a `NoOpPin`). In the base they run on S10b's class mix and S11's site plans at the village
    rungs' ceiling rows on hook fixtures; volume 7 runs them at its rungs (T-V7-63), volume 2 on composed shapes
    and the rung pin on B-MASS (T-V2-58), volume 6 across a rung change (T-V6-74), volume 8 what "specified" reads (T-V8-53), volumes 9
    and 10 T115-3's hand and clerk forms (T-V9-75, T-V10-48), volume 11 the table and T115-4's registrations (T-V11-41) and volume 12 the statistic
    and the pins (T-V12-48).
  * *The zoom-out limit (item 116; §8.8, §9.5, §12.5).* (T116-1) at every rung from THORP to the METROPOLIS cap the view
    at the zoom-out limit shows the whole `bounds` — while a crisis look stands, the bounds of town and camps (item 122
    (i)) —, or is stop 0 where the bounds are wider than the window at stop 0 (§8.8), no stop beyond the limit is reachable in the view and the pyramid
    draws no tile past it — B-ZOOM over B-CITY-lite's seeds of every rung and volume 7's village fixtures (`view.limitStop`
    0); (T116-2) the first view is the one it was without the limit; (T116-3) a change that grows the bounds — an epoch
    (from M4), a Re-derive by a rung change or an Adjust of the population (from M2a) — moves the limit with them, and one
    that keeps them moves nothing; (T116-4) every export frames within the limit bounds (§8.7: the whole bounds — town and camps while a crisis look
    stands — at most), at any window size and with none; at the METROPOLIS cap a whole-bounds PNG, print and SVG export
    frames the whole bounds. T-ER-08's
    restatement — every rung draws every stop from its limit inward — is §8.11's. Volume 7 runs them at its rungs
    (T-V7-64), volume 9 the view controls (T-V9-76) and volume 12 the statistic (T-V12-48).
  * *Seasons (item 117; §2.9, §7.7, §4.2 S0, §10.2, §8.2, §11, §12.5).* (T117-1) the same document hashes identically in
    all 52 weeks — its model, its digests and its save (the pin `item117.season`); (T117-2) an autumn fixture shows at
    least five distinct crown colours across its deciduous trees at the leaf-colour weeks' middle week (a `BenchBarDef`),
    and the leaf cover on its ground deepens week by week through the leaf-fall weeks (volume 12's spec
    `T117i.leafCover`); (T117-3) every climate's season rows cover all 52 weeks with no gap (volume 11's compile check,
    T-V11-42); (T117-4) an arid fixture draws no ice and no snow in any of its 52 weeks (`T117i.arid`); (T117-5) on a
    cold fixture every still water's first ice week is at or before every flowing water's, and no ice is drawn on a mill
    race's or a weir's water (`T117i.ice`); (T117-6) a dossier-bound map opens on its present week — the dossier's latest stamped
    tick (§4.11 *The clock*; item 125) — at `week mod 52` under the follow flag (DR42), and a map with no stamped tick
    opens at midsummer; (T117-7) each season's look passes
    T112-1's contrast and colour-blind checks at each season's middle week (`T117i.styles`); (T117-8) switching the
    season re-skins the cached tiles within §12.5's budget (`time.reskin`, in the timing phase). Volume 7 runs them at its
    rungs (T-V7-65), volume 5 the islands through the year (T-V5-34), volume 8 the dossier's week and climate (T-V8-54), volume 9 the season control (T-V9-77), volume 10
    the explanations (T-V10-49), volume 11 the rows (T-V11-42) and volume 12 the specs and the pin (T-V12-49).
  * *Festival decorations (item 118; §2.9, §7.7, §10.2, §8.2, §11, §12.5).* (T118-1) the same document hashes
    identically with decorations on and off and in every week, and with no traditions and no preview its tiles are
    byte-identical to the base (the pin `item118.festival`, a `NoOpPin`); (T118-2) a festival shows exactly in its
    window's weeks, a window across the year's end wrapping; (T118-3) the same festival draws identically in the view and
    in every export, its tiles byte-stable per seed; (T118-4) each tier's fixture shows its tier's decoration kinds and
    none of a larger tier's; (T118-5) staging lands on the dossier's named place or the keyword table's place, else on
    the festival kind's fallback; (T118-6) no decoration stands in a gate's passage or over a label's keep-out
    (`festival.blocked` 0). T118-2 – T118-6 are `BenchBarDef`s on the festival fixtures. Volume 7 runs them at its rungs
    (T-V7-66), volume 8 the dossier's `traditions` (T-V8-55), volume 9 the festival list (T-V9-78), volume 10 the
    explanations (T-V10-49), volume 11 the tables (T-V11-43), volume 5 the sky islands' pennants (T-V5-35) and volume 12 the bench bars and the pin (T-V12-49).
  * *As fast as possible (item 119; §12, §1.1).* (T119-1) §12's target laws — §12.3's model budgets and §12.5's
    first-map law — measured at every rung's bottom, default and top and reported as *target met* or *target miss*, a
    miss gating nothing by itself (D-18); (T119-2) every one-time wait — generate, regenerate, open from SettlementForge,
    a dossier change applied, advance time, the history replay, an export, a migration — timed from the click to the
    complete result within 10 000 ms at p95 on §12.1's reference hardware, at every rung's top and at the metropolis cap
    (a `BenchBarDef`; V12 §3.15.9's runs); (T119-3) for every wait over one second, progress — the stage by name and the
    map filling in — within 1 000 ms of the click, and no frame of the wait an empty screen; (T119-4) every §12.10 row
    that declares a step slower than its target names its measured gain — a bar or a register entry — and the release's
    runs show it; (T119-5) no interaction row of §12.10 — frame, pan, zoom, drag, preview, hover, inspect, undo, the
    season and festival switches — relaxed against the previous release. The low tier's sizes that miss the comfort level
    are declared per device (§12.1). Volume 9 runs the progress view (T-V9-79), volume 12 the timer and the register
    check (T-V12-50), and each layer's volume its own waits: volume 1 the stage-2 waits (T-V1-29), volume 2 the stage-3
    waits (T-V2-22, T-V2-24), volume 3 the plan's (T-V3-37: T119-2 – T119-5), volume 4 the underground's (T-V4-32), volume 5 the
    islands' (T-V5-18) and volume 7 the village's (T-V7-67).
  * *Find (item 120; §2.9, §8.2, §9.5, §11.1, §11.2, §12.5) — a view, never a change; built at M5.* (T120-1) the model
    digest, the document's hash, its saved bytes and its edit log are identical with Find on and off, and turning every
    chip off — Clear, or closing the panel — restores byte-identical tiles (the pin `item120.find`, a `NoOpPin` of kind
    `view`); (T120-2) each chip's matches equal §11.2's gazetteer match listing at the viewer's effective key, by class,
    area and layer (`find.matches` 0); (T120-3) under a player view on T-V9-66's canary fixture no withheld thing appears
    in a suggestion, a count, a glow, a pin, a ghost pin, a gap outline or a legend chip (`find.leaks` 0); (T120-4) the
    chips survive every band and layer change and every commit, advance, undo, redo, regenerate, load and migration,
    re-evaluated at once, and a chip whose last match goes stays in the set at count 0, dark (`find.held` 0); (T120-5) at
    the city band every match has a pin or is counted in a bubble (`find.pins` 0), and every chip has its second cue — its
    glyph on its pins and its dash pattern on its halo's outline (`find.cues` 0; item 112); (T120-6) at the METROPOLIS
    cap on §12.1's reference hardware, suggestions within ≈ 50 ms of a key and a chip's glow within ≈ 100 ms of its
    click, and at a drawn week whose frame is not the head the chips re-evaluated within ≈ 100 ms of that frame being
    drawn, the frame never waiting for them (§12.5; that clause from the later of M5 and V06's E6, V06 §3.15.2's frames)
    (`time.findSuggest`, `time.findGlow`, in the timing phase; §12.5). Volume 9 runs T120-2 – T120-5's interface clauses
    on its app harness (T-V9-83), volume 12 the pin, the statistics and the timings (T-V12-52: T120-1, T120-6), volume 1
    the town's areas and gaps (T-V1-59: T120-2 and T120-4), volume 3 the interior band (T-V3-38: T120-4), volume 4 Below
    (T-V4-81: T120-4 and T120-5), volume 5 Sky (T-V5-36: T120-1's registration, T120-4 and T120-5), volume 7 the village
    rungs (T-V7-68: T120-1's registration and T120-4), volume 8 the dossier's entries (T-V8-58: T120-2) and volume 10
    the clerk's "show me" (T-V10-51: T120-2's clerk clause).
  * *The resolution adjuster (item 121; §8.8, §8.4 (g), §12.1, §12.5, §12.8) — device state and drawing only; built at
    M4.* (T121-1) Auto is the level on a fresh install (`AppPrefs.resolution` absent); (T121-2) no level change while a
    pan, zoom or drag is in progress — a change lands only while the view is settled (§8.8): at once when no gesture
    runs, at the gesture's settle otherwise — and on a fixture loaded at its threshold at
    most one change per 10 s, with no oscillation (`resolution.changes` 0); (T121-3) Auto holds §12.5's frame budget at
    p95 on the reference and the low-end device over §12.5's reference viewports (`resolution.p95`); (T121-4) a manual level
    is drawn as chosen or, where the device cannot hold its canvas need, the nearest level that fits with item 121 (f)'s
    line — never a refusal or a crash; (T121-5) labels, text, the chrome and every overlay are drawn at the device's full
    pixel ratio at every level (a pixel test, `resolution.textPx` 0); (T121-6) every picture, print and battle-map export,
    and the document and its hash, byte-identical across every setting (the pin `item121.display`, kind `view`, its
    `exports` clause); (T121-7) a change of the device pixel ratio re-evaluates the level at once; (T121-8) native 4K, lit
    at full precision, holds on the ultra tier within its 512 MB canvas ceiling (§8.8, §12.8; `resolution.ultra4k`).
    Volume 9 runs T121-1, T121-4 and T121-7 on its app harness, where T121-5's captures are taken (T-V9-84), and volume
    12 T121-2, T121-3, T121-5, T121-6 and T121-8 (T-V12-53).
  * *Crisis looks (item 122, with (h)–(i); §2.7, §2.9, §7.7's DR44, §10.2, §8.2, §8.8, §11, §12.5) — a look, never a
    change; built at M3b, the dossier's reading at M-SF.* (T122-1) the same document hashes identically — its model, its
    digests and its save — with crises on, off and under every preview and in every week (the pin `item122.crises`, kind
    `view`); (T122-2) each look shows exactly in its condition's weeks — while §2.9's `week` lies in [`sinceWeek`,
    `untilWeek`), or from `sinceWeek` on while an overlay with no `untilWeek` stands (§2.7) — at every key for a
    look-bearing condition (`public`, DR44) and for no `none`-row one (`crisis.weeks` 0); (T122-3) a look draws identically in the view and in
    every picture export, its tiles byte-stable per seed (`crisis.stable` 0); (T122-4) every SettlementForge stressor
    type, condition archetype and crisis event at the pinned baseline has its row in §10.2's closed map — a look or an explicit `none`
    — and a word no row maps reads `none`, reported `unmapped_word` (a totality check over V08's census lists); (T122-5)
    the scale follows severity and tier — each tier's fixture at a low and a high severity within its look row's scale, a
    hamlet a war band's camp and a city a full siege line — and the dossier's headcounts where it gives them, at item
    122 (h)'s rates (`crisis.scale`); (T122-6) nothing stands on water, in a gate's passage or over a label's keep-out,
    and on a way's carriageway only a barrier across it (§10.2 (d)), and several crises share the outskirts by
    `priority` under `densityCap` (§10.2's placement; `crisis.blocked` 0 and `crisis.share` 0);
    (T122-7) with no condition and no preview, the tiles are byte-identical to the base (`item122.crises`, its `tiles`
    clause). Item 122 (h)–(i)'s four bars are volume 12's own (T-V12-55: the camped area by headcount, two armies twice
    one, every camp inside the opening view, Fit and the limit while a look stands, the limit restored when none stands).
    Volume 12 runs T122-1 – T122-3 and T122-5 – T122-7 (T-V12-54), volume 11 T122-4's compile check (T-V11-46) and
    volume 8 its census of the baseline's lists and T122-1 and T122-7's registration (T-V8-59), volume 9 T122-2's interface clause (T-V9-85), volume 6
    T122-1's hand-over clause (T-V6-75), volume 7 T122-5 and T122-6 at the village rungs (T-V7-69) and volume 3 the plan
    clauses of T122-1 – T122-3 and T122-7 (T-V3-40); volume 1's units and land (T-V1-60), volume 2's ruined look, with
    T122-1 and T122-7's registration (T-V2-60), volume 4's look below ground (T-V4-82 (i)), volume 8's forces (T-V8-60)
    and volume 10's explanations (T-V10-52) test
    their own parts.
  * *A ruined building's plans (item 123; §2.6 step 7, §6.3, §8.6, §11.1) — the plan as built, damaged, never redrawn;
    built with volume 3's P4 and P5, the decay level with M6-E.* (T123-1) room, wall and opening ids are identical
    between the intact and the damaged plan, and a building first met ruined — generated as a ruin, or reached by item
    113's replay — carries the plan it had when built; (T123-2) damage is monotone in the decay level: a higher level's
    damaged set ⊇ a lower's, on every element (`damage.nested` 0); (T123-3) for a seed each element breaks at one level —
    one threshold per element, keyed by lineage and element id (§6.3's `plan.damage`) — on every engine and across
    regeneration, load, undo and migration (`damage.breakLevel` 0; §6.5 (9)); (T123-4) restoring — a `reoccupy` back
    into use (item 123 (b)'s "reused") or a repair — lowers the level and removes the damage in reverse threshold order,
    each repaired element drawn in item 114's patch material; (T123-5) the exterior agrees with the plan: a roof hole over a room shows from above as an
    opening in its roof, and a fallen run of outer wall as an open stretch of the footprint's edge; (T123-6) battle-map exports' line of sight passes fallen
    wall runs, a doorless opening is a gap, and rubble heaps and floor holes are image only (§11.1); (T123-7) a
    never-decayed building under no disaster look (§6.3 *Plan damage*) keeps its plan byte for byte as it is without
    item 123 (the pin `item123.damage`, a `NoOpPin` of kind `entityScope`). Volume 3 runs the plan clauses of T123-1,
    T123-2, T123-4, T123-6 and T123-7 (T-V3-39), volume 4 T123-1, T123-2
    and T123-6 below ground (T-V4-82), volume 2 T123-5 and T123-7's exterior clause (T-V2-59), volume 6 T123-4's epoch clause (T-V6-76), determinism §6.5 (9)
    T123-3's engine clause and volume 12 T123-2, T123-3 and T123-7 (T-V12-56); volumes 9 and 10 test their lines
    (T-V9-86, T-V10-53).
  * *Light weather (item 124; §2.9, §6.1, §8.2, §8.4, §8.8, §11, §12.5) — a view layer only; built at M3b.* (T124-1)
    the document's hash and every tile are identical with the effects on and off, the tile cache untouched by a spell
    (the pin `item124.effects`, kind `view`, its `cache` clause); (T124-2) the effects' frame cost is within ≈ 1 ms a frame
    at the densest spell on §12.1's reference hardware (§12.5; `weather.frameMs`, in the timing phase); (T124-3) on an
    `arid` climate row and on every row whose winter does not freeze, no snow falls or lies in any week, a `snow` cover
    drawn `clear` there (§8.2; `weather.snow` 0); (T124-4) arid rain frequency lies within its row over a simulated year
    of the timeline (`weather.aridRain`); (T124-5) the effects are off by default on the low tier and under reduced
    motion; (T124-6) labels, the chrome and every overlay are never covered (a pixel test, `weather.cover` 0); (T124-7) no
    luminance step is faster than §8.4 (i)'s photosensitivity limit (`weather.luma` 0); (T124-8) picture, print and
    battle-map exports are byte-identical with the effects on and off (the pin's `exports` clause); (T124-9) the timeline
    replays from its session seed, clock and presses with the climate row, year position, sites, `light` mode and view
    hour in force at each moment (§6.1 *The weather stream*) — a year-position change from a week with no live kind into
    a live one and back, a press at a moment with no live kind and a view hour crossing a kind's `hours` among its
    fixtures (§6.1's `view.weather`, never a model stream; `weather.replay` 0). Volume 11
    runs T124-3's and T124-4's row clauses as compile checks (T-V11-48), volume 9 T124-5 (T-V9-87), determinism §6.5
    (9) T124-9's stream clause, and volume 12 T124-1 – T124-4 and T124-6 – T124-9 (T-V12-57).
  * *The dossier the only data input (item 125; §11.3, §11.4, §14, §7.7, §4.11, §2.9); its bars from M-SF.* (T125-1) a
    dossier holding only SettlementForge's required keys generates a full map at every rung, every field the port uses
    that it lacks reported with the fallback taken (`field_fallback`, V08 §2.4's fallback column) — with no stamped tick,
    §4.11's clock at week 0 and the year position at midsummer (`port.fallbacks` 0); (T125-2) the same dossier with and
    without a host context, and under each `HostContext` field (`audience`, `displayNames`, `line`), yields the identical
    document and hash (the pin `item125.host`, a `NoOpPin` of kind `input`); (T125-3) no code path of the port reads
    anything but the dossier — a static check of each adapter's imports and reads. Volume 8 runs T125-1 – T125-3 on its
    host harness (T-V8-61) and volume 12 T125-1 and T125-2 (T-V12-58).
  * *Tablets and desktops only (item 126 (a2); §1.1); built at M2a with the medium layout.* (T126-1) at the medium class
    every tool of V09 §4.12's list completes its canvas script under touch, with `AppPrefs.touch.editFabric` on;
    (T126-2) below the medium class the medium
    layout holds at its 600 × 480 minimum and the page scrolls, and the document, the view and the selection are
    byte-identical across a resize over the threshold (the pin `item126.resize`, kind `view`); (T126-3) no phone layout,
    screen, notice or catalogue row exists — a build-time scan of V09's layout classes and message catalogue. Volume 9
    runs them on its app harness (T-V9-22: T126-1's tablet half, T126-2 and T126-3), volume 8 T126-2's host-frame clause and
    T126-3's embed clause (T-V8-62) and volume 12 T126-1's medium-minimum clause and T126-2 (T-V12-59).
* **The volumes' tests and the base's hook bars.** A staged engine's bars bind it when it lands (the convention's (3));
  the volume family below re-runs them on the engine's output, each of its tests naming the base bar and the clauses it
  takes:

| base bars | the engine (volume, milestone) | the volume family that re-runs them |
|---|---|---|
| T8-1 – T8-7, T17-2, T17-3, T18-1 – T18-4's epoch-spread form, T20-2's and T20-6's epoch clauses, T25-1, T31-2, T31-3, T31-8 – T31-12, T67-1 – T67-6, T70-1 – T70-4 over epochs, T72-1 – T72-9's epoch clauses, T76-1's per-year clause, T81-1, T108-4 over epochs (T-V6-45), T110-2's epoch clauses (4), (5), (7) and (8) (T-V6-47; (4)'s arch-vault circuit by T-V4-80 (i)), T110-2 (1)'s foundings across a decayed ring and across a ring and a retaining wall drawn by hand and placement-locked, and (2)'s founded viaduct across a standing ring, its epoch route through a standing gate and its epoch walled stage's spawned primary (T-V6-73), T111-1 – T111-5's epoch form (T-V6-72), T113-1 – T113-3, T113-6, T113-7 (T-V6-71), T114-1 – T114-5 save T114-3's landfall clause, T114-8's and T114-10's epoch clauses (T-V6-73), T115-1 and T115-2 across a rung change (T-V6-74), T122-1's hand-over clause (T-V6-75), T123-4's epoch clause (T-V6-76) | the evolution engine (volume 6, M6-E) | every T-V6 test (V06 §7), on the H-100, H-DOSSIER and other H fixtures |
| T10-1, T13-1, T15-1, T102-2, T114-3's landfall clause (T-V5-14), T117-1 – T117-8's and T118-1 – T118-6's island clauses (T-V5-34, T-V5-35), T119-2 – T119-5's island clauses (T-V5-18), T120-1's registration and T120-4's and T120-5's sky clauses (T-V5-36) | the sky layer (volume 5, M6-sky) | every T-V5 test (V05 §7) (T102-2 by T-V5-19 – T-V5-21) |
| T11-1, T12-1, T14-1, T63-4, T64-1 – T64-3, T65-1 – T65-8, T66-1 – T66-4, T66-6, T109-1 – T109-6, T113-4 (T-V4-77), T113-5 (T-V4-76), T119-2, T119-3 and T119-5's clauses on this layer (T-V4-32), T120-4's and T120-5's underground clauses (T-V4-81), T123-1's, T123-2's and T123-6's clauses below ground (T-V4-82) | the underground layer (volume 4, M6-U) | every T-V4 test (V04 §7) |
| T28-1 – T28-8, T28-10, T28-12's `plan` clause, T28-13 – T28-15, T28-17's F-PLAN clause, T28-18's `setRoomUnit` clause, T28-19, T63-3, T119-2 – T119-5's plan clauses (T-V3-37), T120-4's interior-band clause (T-V3-38), T122-1's, T122-2's, T122-3's and T122-7's plan clauses (T-V3-40), T123-1's, T123-2's, T123-4's, T123-6's and T123-7's plan clauses (T-V3-39) | the plan rung (volume 3, M6-P) | every T-V3 test (V03 §7) |
| T29-4 on stacked and solid wings, T110-8, T110-5, T115-1's composed shapes and T115-4's rung clause on B-MASS (T-V2-58), T119-2's stage-3 clauses (T-V2-22, T-V2-24), T122-1 and T122-7's `item122.crises` registration (T-V2-60), T123-5 and T123-7's exterior clause (T-V2-59) | stage 3 (volume 2, M6; its item-110 part at M3a) | every T-V2 test (V02 §7) |
| §15.2's stage-2 letters S1–S6, T119-2 and T119-3's stage-2 clauses (T-V1-29), T120-2's and T120-4's town clauses (T-V1-59) | stage 2 (volume 1, M5) | every T-V1 test (V01 §7) |
| the village rungs' clauses of T13-1, T14-1, T30-4, T65-2, T102-1, T110-7, T111-1 – T111-5 (T-V7-58), the village halves of T113-1 and T113-3 and T114-9's village clause (T-V7-59), and the village clauses of T114-1 – T114-8 (T-V7-62), T115-1 – T115-4 (T-V7-63), T116-1 – T116-4 (T-V7-64), T117-1 – T117-8 (T-V7-65), T118-1 – T118-6 (T-V7-66), T119-2 – T119-4 (T-V7-67), T120-1 and T120-4 (T-V7-68) and T122-5 and T122-6 (T-V7-69) | the village product (volume 7) | every T-V7 test (V07 §7), with B-VILLAGE and B-VG |
| T73-1 – T73-10, T75-1 – T75-5, T77-1, T81-2, T85-1 – T85-3, T88-1, T88-2, T108-1 – T108-3, and the port's clauses of T111-1 – T111-5 (T-V8-50), T113-1 and T113-6 (T-V8-51), T114-7 (T-V8-52), T115-2 and T115-3 (T-V8-53), T117-1 and T117-6 (T-V8-54) and T118-1, T118-2 and T118-5 (T-V8-55), T120-2's dossier clause (T-V8-58), T122-4's census clause and T122-1 and T122-7's `item122.crises` registration (T-V8-59), T125-1 – T125-3 (T-V8-61) and T126-2's host-frame clause and T126-3's embed clause (T-V8-62) | the SettlementForge connection (volume 8, M-SF) | every T-V8 test (V08 §7), on the host harness |
| T101-6's clerk path, T111-5's `item111.water` registration (T-V10-45), T115-3's clerk form (T-V10-48), T120-2's clerk clause (T-V10-51) | the built-in clerk (volume 10, M3c) | V10 §7's evaluation cases and every T-V10 test (V10 §7) |
| T101-1 – T101-9 on the canvas (T101-4 by T-V9-82, T101-7 by T-V9-81), §13.4's scripted tasks and first-five-minutes test, the screens of items 111–126 (T-V9-71 – T-V9-79, T-V9-83 – T-V9-87: T112-1's thematic-view clause and T112-2 (T-V9-72), T114-6's legend, T115-3's hand form, T116-1's view controls, T117-6, T118-2 and T119-3 among them, T120-2 – T120-5's interface clauses (T-V9-83), T121-1, T121-4 and T121-7 (T-V9-84), T122-2's interface clause (T-V9-85) and T124-5 (T-V9-87)), T126-1's tablet half, T126-2 and T126-3 (T-V9-22) | the application (volume 9, inside M1–M4b; its staged screens with their layers) | every T-V9 test (V09 §7) |
| every bar's register line and its spec, the specs, pins and bench bars of items 111–126: T111-1 – T111-5 (T-V12-44); T112-1's style line (T-V12-45); T113-2, T113-5's registration and T113-7's pin (T-V12-46); T114-4 – T114-8 (T-V12-47); T115-1, T115-4 and T116-1 (T-V12-48); T117-1, T117-2, T117-4, T117-5, T117-7 and T118-1 – T118-6 (T-V12-49); T119-1, T119-2, T119-4 and T119-5 (T-V12-50); T120-1 and T120-6 (T-V12-52); T121-2, T121-3, T121-5, T121-6 and T121-8 (T-V12-53); T122-1 – T122-3 and T122-5 – T122-7 (T-V12-54), beside item 122 (h)–(i)'s four bars (T-V12-55); T123-2, T123-3 and T123-7 (T-V12-56); T124-1 – T124-4 and T124-6 – T124-9 (T-V12-57); T125-1 and T125-2 (T-V12-58); T126-1's medium-minimum clause and T126-2 (T-V12-59) | calibration (volume 12) | every T-V12 test (V12 §7) (T-V12-35 checks the bar map) |
| every content row a bar reads, the registrations of T111-5 (T-V11-38), T113-7 (T-V11-39), T114-8 (T-V11-40) and T115-4 (T-V11-41), T117-3 (T-V11-42), T122-4 (T-V11-46), T124-3's compile clause and T124-4's row clause (T-V11-48) | the content (volume 11) | every T-V11 test (V11 §7) |
=== END ===

=== REPLACE ### 13.8 CI tiers and compute budgets (SCL-18; D-34) ===
### 13.8 CI tiers and compute budgets (SCL-18; D-34)

The full verification rig costs ≈ 10–20 CPU-hours (12 000 B-CITY generations ≈ 1.6 CPU-h before the suite; 10⁵ oracle
regenerations ≈ 8 CPU-h; 10⁶ fuzz inputs × ≈ 20 primitives ≈ 0.3–5.5 CPU-h), so it cannot gate a single change. It runs
in three tiers, each with a wall-clock budget on a stated runner (a 16-core x86-64 Linux machine; timings normalised by
§12.1's calibration score):

| tier | runs | budget | contents |
|---|---|---|---|
| **PR** | every change | ≤ 15 min on 8 cores | lint (the determinism allowlist, units, dependency direction, the repository path rule), type check, unit and contract tests; B-FUZZ with 10⁴ random inputs per primitive plus the whole constructive-degeneracy set; B-CITY-lite 50 seeds per rung × 4 water settings; B-EDIT 10³ sequences with the oracle once per sequence; stage-isolated goldens and the per-stop placement digests on Node x86 (§13.3); every shipped style sheet through §8.2's slot resolution at every band and the render keys across two B-CITY-lite seeds per rung (§8.3); the stamp-tile asset's loaded hashes and its seam check (§8.3, §8.10); the licence, notices and deny-list scans; the app's scripted and accessibility tasks on Chromium |
| **nightly** | every night | ≤ 4 h on 16 cores | B-CITY 1 000 seeds × 4 water settings × 3 rungs with the invariant suite and the screen of §12.3's model max clause on every generation; B-FUZZ 10⁶ per primitive; B-EDIT 10⁴ sequences; **the O9 (c) faithfulness campaign** (n = 800 scopes × K = 50, ≈ 12.5 CPU-min, §13.2); the five-engine golden run with one PNG per LOD and preset, the placement digests, the stamp-tile asset rebuilt on the five engines and its loaded hashes in both workers, the sliced-raster and sliced-placement census rows (§8.3), and from M3a the five-engine GeoJSON with trees (§13.3); visual regression and B-ZOOM; control sweeps at TOWN and CITY; the option matrix; the B-REF parity report; and, last and alone on the runner, **§12.1's timing phase** (≤ 20 min: the cost-model sweeps with the F-WORK flatness check, the first-map runs, the in-Chrome re-measure of the model budgets and the re-timing of the max clause's flagged generations) |
| **milestone** | every milestone exit, and weekly | ≤ 12 h on 16 cores | B-EDIT 10⁵ sequences; METROPOLIS control sweeps; the 20-epoch test; the parity report at 100 of our seeds per setting against the ten-seed references (V12 §3.5.5); the D-5 renders, including every earlier panel still *provisional — not rated* (§13.6 (7)); §12.3's pool comparison in the timing phase at every rung the milestone confirms; memory and document-size tests at every rung |

A tier whose normalised wall-clock exceeds its budget by more than 10 % fails with *over budget*; the answer is to split
the job or make it faster, never to raise the cap — a budget changes only by a recorded decision. **Measurement (M0):**
the harness times each tier on the runner. **Pre-decided fallback:** if the PR tier exceeds 15 min, B-CITY-lite drops to
25 seeds per rung and the random fuzz to 5 × 10³ inputs per primitive (the constructive set is never cut), and the
nightly tier absorbs the difference.

**The bar schedule** (the one statement of when a §13.2 bar runs; §16's exits cite it). *PR* runs a bar on the golden TOWN
and CITY fixtures and its hook fixtures, *nightly* on B-CITY-lite and, for a bar that says B-CITY, on B-CITY; a
seed sweep, a cross-engine digest or a many-seed statistic runs nightly, a sweep over epochs in the milestone tier. A
bar's first milestone is the one that lands its mechanism; a clause named separately starts at its own.

| bars | tier | first milestone |
|---|---|---|
| T34-1 – T41-1 (the bent cut) | PR on the M0 (b) faces and NG's recorded shapes; T34-1's 10 000-face mean nightly | M0 (b) |
| T13-1; T14-1 but its hidden-render clause; T16-4; T23-1's registry test; T43-1 – T43-5; T45-1; T54-1; T55-1; T111-2, T111-3, T111-5 | PR; T14-1's S0 draws, T16-4, T111-3 nightly | M1 |
| T46-1, T47-1 | nightly (walled B-CITY seeds) | M1 |
| T20-7, T20-11, T20-12, T20-13; T73-1 – T73-9; T77-1's slice clause; T81-2's creation clause; T85-1, T85-2 | PR (B-DOSSIER-lite: the nine at-rung births × 5 seeds, ≈ 45 generations beside B-CITY-lite's 600); T73-8 in the nightly five-engine run | M1 |
| T88-1 (each reader from the milestone that lands its stage) | PR on the golden suite | M1 |
| T20-10, T73-10 | nightly (the totality files and the culture towns) | M1 |
| T65-7 (its sky-island clause from M4) | nightly (the relief-class sweeps) | M1 |
| T101-2, T101-3, T101-5 for T9 `shape` and T10 `hold` | PR | M2a |
| T16-1, T16-2, T19-1 – T19-3, T19-4 but its dossier clause, T23-1's parity clauses, T24-1 – T24-3, T26-1 – T26-3, T27-1, T27-2, T29-1 – T29-4, T30-1, T30-2, T30-4, T44-1, T57-1, T70-1 – T70-6, T71-1 – T71-4, T72-1 – T72-8, T72-9 but its dossier clause, T77-1's weight clauses | PR; nightly on B-CITY | M2b |
| T88-2 | PR (B-DOSSIER-lite) | M2b |
| T63-1, T63-2's views and labels, T63-4 | PR; T63-4's 1 000 seeds nightly | M2b |
| T68-1 – T68-4, T68-7, T68-8 (the day model) | PR on the golden fixtures but T68-7; T68-4 and T68-7 nightly on the five engines | M2b |
| T102-1, T102-4, T103-3, T105-4, T106-5, T107-4 (the no-op pins and the term's budget) | PR on the two PR golden seeds; the off-state suites nightly; T102-4 in the timing phase | M2b |
| T102-3 | milestone | M2b |
| T103-1, T103-2, T104-2, T104-3, T105-1, T105-3, T107-1 – T107-3, T108-1, T111-1, T111-4 | nightly (the correlation specs and the pooled statistics, volume 12's budgets) | M2b |
| T104-1, T105-2, T106-1 – T106-4, T108-2, T108-3 | PR | M2b |
| T16-3, T17-1, T18-1 – T18-4, T19-4's dossier clause, T20-1, T20-2's dossier-event clause, T20-3 – T20-5, T20-6's refusal clause, T20-8, T20-9, T22-1 – T22-4, T25-1, T30-3, T30-5, T31-1, T31-4 – T31-7, T63-2's query and export clauses, T66-5, T72-9's dossier clause, T104-4, T108-4 | PR; nightly on B-CITY | M3a |
| T28-9, T28-11, T28-12's `wings` clause, T28-16, T28-17's housing clause, T28-18's `relet` and re-homing clauses | PR (the B-PLAN fixtures) | M3a |
| T75-1 – T75-5, T76-1's cadence clauses, T81-2's absorb clause, T85-3 | nightly (the absorb pairs) | M3a (T76-1's coarsened catch-up fixture with M6-E; its second-absorb fixture's burial-need clause with M6-E's E8) |
| T101-1 – T101-5, T101-7 – T101-9 for T2 `ground` to T8 `fill` | PR | M3a |
| T101-6 (both known-city fixtures, three paths) | milestone (≤ 10 min wall) | M3a |
| T110-1 – T110-8; the specs `T110b.*` | PR; the four raised-way specs in the milestone and weekly run (≤ 20 CPU-min); T110-4 (c)'s 32 seeds nightly and its epoch and replay runs in the milestone tier (the schedule's rule above) | M3a (T110-2's epoch clauses — the frame growth, (1)'s and (2)'s foundings, (2)'s epoch route and walled stage, (4)'s and (5)'s circuits, contraction, stage growth and route re-solve, (7)'s lapse and (8)'s ring road — from M4 on the hook fixtures, those of (1), (2), (4), (5), (7) and (8) on volume 6's engine with M6-E's E2 and E3; the state sweep's `topple` runs at the later of their milestone and M6-E's E5, which builds the hazards, the state sweep's other states in a clause scheduled before them — C3 – C5 by `DeclineOp` (M4), C10 by `repairRaised` and C12 by a frame growth (M4; V06's E3) — and (4)'s hand rows W4, W5, W6, W8 and W10 (M4; V06's E3, which builds `absorbWall`) at the later of their milestone and those providers, (4)'s epoch `shiftCourse` clause at M6-E's E5, which builds the terrain candidates, and every arch-vault clause — T110-1's `vault`-span clauses, T110-2 (1)'s, (4)'s, (6)'s and (8)'s, and the sweep's C6 runs — at the later of their milestone and M6-U's U3, which lays the arch vaults (V04 §8); and every run whose arch-vault outcome follows an epoch's wall event — T-V6-11's re-lay, T-V6-47's vault bar and the sweep's epoch C6 runs among them — at the later of M6-U's U5 and M6-E's E8, which reconcile the arch vaults over `EpochScope.raised` (V04 §8; V06 §8); T110-4's runs each at the later of its path's providers — generation at M3a's raised ways, arch vaults at M6-U's U3 (and at an epoch U5), an epoch at M6-E's E3, its hazards and water ops (a silting, a `shiftCourse`) at E5 and its arch-vault reconcile at E8, a village at V07's V-M3, a history replay at M6-E's E9 (its burial with V04's `BuriedFormer.lay`), an absorb with no epoch at the later of V07's V-M3 and the milestone that carries V08's absorb, the landfall at V05's P6, a creation prefix at T101-4's milestone, hand ops and the clerk at the milestones §13.8 gives V09's and V10's tools) |
| T29-5; T68-5, T68-6 (the night view); T101-1 – T101-5 for T11 `name` and T12 `dress`; the lit-street warp fixture but its tunnel, access-point and Works clauses | PR; the warp fixture in B-EDIT | M3b |
| T112-1 (the style check) | nightly, in B-ZOOM on every checked variant | M3b (`hatched` at M5) |
| T8-1 – T8-7, T10-1, T11-1, T12-1, T15-1, T17-2, T17-3, T20-2's epoch and tolerance clauses, T20-6's epoch clause, T31-2, T31-3, T31-8 – T31-12, T64-1 – T64-3, T65-1 – T65-6, T65-8, T66-1 – T66-4, T66-6, T67-1 – T67-6, T68-9, T72's epoch clauses, T76-1's per-year clause; the lit-street warp fixture's tunnel, access-point and Works clauses; §8.3's hand-lantern row | PR on the hook fixtures; T10-1's and T15-1's CITY sweeps, T64-2's and T65-2's 500-seed sweeps nightly; the 20-epoch test, with the wealth ladder and the decline table, in the milestone tier | M4 |
| T81-1 | milestone | M4 |
| T14-1's hidden-render clause; T109-1 – T109-6; T113-4, T113-5 | PR on the layer's fixtures; the sweeps and pooled bars in the milestone and weekly run (≤ 60 CPU-min each) | M6-U (T113-4, T113-5 at the later of M6-U and M6-E) |
| T102-2 | nightly | M6-sky |
| T113-1 – T113-3, T113-6, T113-7 | PR on the history fixtures; T113-2's digest in the nightly five-engine run | M6-E |
| T28-1 – T28-8, T28-10, T28-12's `plan` clause, T28-13 – T28-15, T28-17's F-PLAN clause, T28-18's `setRoomUnit` clause, T28-19, T63-3 | PR (the B-PLAN fixtures, and the clicked buildings of B-CITY-lite nightly) | M6-P |
| T112-2 (the game-master trial) | a human trial, outside CI | the release gate (§16) |
| T114-6, T114-7, T114-8's generation clause | PR on the readiness × wealth fixture grid and the two PR golden seeds; T114-6 nightly with the render bars (V12 §6) | M2b |
| T114-1 – T114-5, T114-8's epoch clause | the milestone tier over H-100's epochs and H-AQUA's for T114-3's crossing clause on volume 6's engine, T114-3's landfall clause on volume 5's landfall fixture; T114-4's and T114-5's step scripts nightly on the wall fixtures (V12 §6) | M6-E (with V06's E3; T114-3's landfall clause with M6-sky) |
| T115-1 – T115-3 | PR on S10b's hook fixtures at the village rungs' ceiling rows; `bldg.grandeur` nightly | M2b (the village clauses with V07's V-M2, the composed shapes with M6) |
| T115-4 | PR on the two PR golden seeds; the pins' off-state suites nightly | M2b |
| T116-1, T116-2, T116-4 | PR on the golden fixtures; T116-1's sweep nightly in B-ZOOM | M1 (the village fixtures with volume 7) |
| T116-3 | PR on the hook fixtures | M2a (its epoch clause from M4) |
| T117-1, T118-1 (the pins) | PR on the two PR golden seeds (the landing gate); their suites nightly at every fourth week, all 52 weeks at milestones (V12 §6) | M3b |
| T117-2, T117-4, T117-5, T117-7; T118-2 – T118-6 | nightly on the season and festival fixtures, alternate nights (V12 §6) | M3b |
| T117-3 | PR (volume 11's compile check) | M3b |
| T117-6 | PR on B-DOSSIER-lite's births whose dossier carries a stamped tick (the week's source, item 125 (b)), and on one with none (the season control's midsummer) | M3b (the port's reading with M-SF) |
| T117-8 | §12.1's timing phase | M3b |
| T119-1, T119-2 | §12.1's timing phase | M1 (TOWN, CITY); M2b (METROPOLIS and the cap); each other wait from the milestone that lands it — M3a (a dossier change applied, a migration), M6-E (advance time and the history replay), M-SF (an open from SettlementForge) |
| T119-3 | §12.1's timing phase with the app harness's frame sampler | M3b (with volume 9's progress view) |
| T119-4, T119-5 | PR (the budget register against the previous release) | M2b |
| T20-14 (a dossier event over locks) | PR on B-DOSSIER-lite | M3a |
| T20-15, T20-16 (a dossier population fall over locked dwellings and households) | PR on B-DOSSIER-lite | M4 (with the epochs) |
| T114-9 | PR on the hook fixtures | M4 (its TOWN-epoch clause; the village clause with volume 7, T-V7-59) |
| T114-10 | PR on the CITY castle fixture at generation; its 10 epochs in the milestone tier | M2b (its epochs with M6-E's E3) |
| T120-1 (the pin) | PR on the two PR golden seeds (the landing gate); its off-state suite nightly | M5 (Find's milestone) |
| T120-2 – T120-5 | nightly on volume 9's app harness over B-CITY-lite's seeds of every rung, the village fixtures and a dossier fixture (V12 §6) | M5 (each volume's clause at the later of its step and M5) |
| T120-6 | §12.1's timing phase at the METROPOLIS cap | M5 (its drawn-week clause at the later of M5 and V06's E6) |
| T121-1, T121-4 – T121-7 | PR on volume 9's app harness; T121-6's pin suites nightly | M4 |
| T121-2, T121-3, T121-8 | §12.1's timing phase on the reference, the low-end and an ultra-tier device | M4 |
| T122-1, T122-7 (the pin) | PR on the two PR golden seeds (the landing gate); its suites nightly, every week at milestones | M3b (the dossier's crisis fixtures with M-SF) |
| T122-2, T122-3, T122-5, T122-6 | nightly on the crisis fixtures — the previews from M3b, volume 8's dossier crisis and force fixtures from M-SF (V12 §6) | M3b (the `disaster` look's district clauses from M5) |
| T122-4 | PR (volume 11's compile check over volume 8's census lists) | M-SF (with the map rows) |
| T123-1 – T123-7 | PR on B-PLAN's damage fixtures; T123-3's engine clause in the nightly five-engine run | volume 3's P4, the step that draws a decayed or ruined plan (V03 §8, inside M6-P) — the decay level read from the existence state at V11's default age until M6-E, T123-4's epoch clause with M6-E, T123-5 at the later of that step and volume 2's exterior step (M6) |
| T124-1, T124-3 – T124-5, T124-8, T124-9 | PR; the pin's suites nightly | M3b |
| T124-2, T124-6, T124-7 | §12.1's timing phase and the visual-regression run | M3b |
| T125-1 – T125-3 | PR on B-DOSSIER-lite (T125-1's required-keys dossier at every rung nightly) | M-SF |
| T126-1 – T126-3 | PR on volume 9's app harness | M2a (with the medium layout); T126-1 each tool from the milestone that lands it, every tool from M3a |
| the first-five-minutes sessions (§13.4) | human sessions, outside CI | M2a (the pipeline session), M3a (midpoint and exit), M3c (the clerk task, T-V10-26) |
| B-EDGE (§4.13's EP rows and its combination cells) | PR on its fixtures; the rung and preset sweep nightly | the milestone that lands each row's mechanism |
| the T-ER rows of §8.11, §9.7 and §11.6 (the rendering, label and export edges) | PR on their fixtures; T-ER-01 (B-CITY at the cap) and T-ER-08's stop sweep nightly; T-ER-04 and T-ER-16 in B-EDIT | the milestone that lands each row's mechanism (the village-rung fixtures with volume 7) |
| T-RIG-1 – T-RIG-6 (the rig's own edges: §13.5, §13.6 (12), §13.7, §13.8, §13.9) | PR | M1 (T-RIG-3 with M1's first panel; T-RIG-6 at M-CAL) |

The budgets above do not change: the PR tier's added work is measured at M0 with the tiers, and the fallback above
applies to it like any other over-run (J-A83.02). The palette bar (§13.4) runs with visual regression nightly.

**The volumes in the tiers.** Each volume's §7 names the tier of each of its bars inside these budgets. Volume 7 adds
`B-VILLAGE` and `B-VG` (PR: 20 seeds per rung; nightly: the full bench) and the frozen small-dossier fixtures; volume 8
its host-harness bars in the tiers its §7.1 names. Volume 12: each bar in the tier its §7.1 column states, inside
V12 §6's budgets — the harness's cost by job: B-REF, the pooled and correlation specs, the web, comfort and chain bars,
the no-op and view pins, the render bars of items 114, 117, 118 and 120–124, the underground's and the raised-way bars, the
known-city paths, the milestone parity report — with item 119's wait timing (T-V12-50) and the Find, resolution and weather timings of items 120, 121 and
124 (T-V12-52, T-V12-53, T-V12-57) inside §12.1's timing phase.
Calibration and corpus runs and the tendency bars' confirmation re-runs are runner jobs outside the tiers, never during
a timing phase (V12 §6).

**Edges.** Every job reads the whole `plat/` tree at its commit, never a diff, so a change that touches nothing a job
reads still runs the tier's lint, type check and path rule; a suite whose seed family, fixture set or baseline file is
empty or missing fails naming it, never passes vacuously; a record or file that contradicts the store — a shift record
whose seeds or digests differ from the golden store, a milestone record naming a missing report — fails the golden CLI
naming both; a job over its budget fails *over budget* by the rule above (T-RIG-5).
=== END ===
