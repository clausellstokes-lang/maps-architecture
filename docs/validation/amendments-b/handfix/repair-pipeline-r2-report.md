# handfix-b/repair-pipeline-r2 — report of the pipeline part's repair blocks (round 2)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat handfix-b/repair-pipeline-r2; queued in docs/FABLE-REVIEW-QUEUE.md.

PROGRESS (kill-safe ledger; the block file's preamble carries the same ledger)
ITEM inputs: planned verify-pipeline-r1 (VPH1-01, VPH1-02), repair-pipeline-r1 report, closing-report §2/§3, apply-blocks.py, assemble-r1-handoff.py | done (doc e9c0b828… / rationale dcabf14b…)
ITEM read: planned §4.7, §10.2 whole; §2.5 Plot/SitePlan/BuildingSlot, §2.6 Building + capacity, §10.3, T19-4, §7.1 registry rows, J-A28.46 index + Part A | done
ITEM blocks: planned REPLACE §4.7, REPLACE §10.2, J-ROWS + RATIONALE-A J-A28.46 restated, hand-off §2.5 substitution | done (docs/validation/amendments-b/handfix/repair-r2-pipeline.md)
ITEM checks: planned simulated assembly + swap + substitution, word diff, refs, deferral, doc_checks three copies | done (§3, §4)
ITEM close-out: planned report, queue row, LANDED line | done
ITEM fable-continuation: planned re-read every block against VPH1-01 and the live text, correct and regenerate, re-execute receipts (alone + combined with the six r2 files, swap, hand-off, probes, refs, deferral, doc_checks three copies), append the continuation section, queue row check, LANDED line | done (block file regenerated whole, sha256 3bdc244e…; two completions, both vetoable; receipts clean; queue row A-handfix-b/repair-pipeline-r2 present, PENDING line kept)

Lane `handfix-b/repair-pipeline-r2`, 2026-09-27, opus standing in for Fable. Base: `docs/ARCHITECTURE.md` sha256
`e9c0b828…` and `docs/ARCHITECTURE-RATIONALE.md` sha256 `dcabf14b…` (handfix-b/assemble-r1's output, which
verify-pipeline-r1 judged). This seat edited no design file.

## Outcome

VPH1-01 is fixed by four blocks and one hand-off substitution. Every one of the verifier's five sub-changes is applied;
three are refined, and one addition closes a lifecycle gap the filed text left. All are recorded below as vetoable calls.

| sub-change | where | status |
|---|---|---|
| (1) | §4.7 *Households per building* (REPLACE §4.7; one line changes) | applied, refined (a) and (c) |
| (2) | §10.2 `structures.houses` comment (REPLACE §10.2; one line changes) | applied, with a pointer to the new field (c) |
| (3) | J-A28.46 index row (J-ROWS, restated) | applied, refined (b) and (c) |
| (4) | J-A28.46 Part A (RATIONALE-A, restated) | applied as filed |
| (5) | J-A28.46 Part A, closing sentence | applied, refined (a) and (c) |
| hand-off (2) | §2.5 `BuildingSlot` (model part), one new field `unhoused` | new (c) |

## 1 Refinements and the one addition (each vetoable)

* **(a) A workplace's main slot, required or not.** The filed text covered "a required residential slot on a
  workplace's plot (a live-in class's main slot among them)". Nothing in the document makes a main slot `required`,
  so a template whose main structure is not `required` would still drop a live-in main slot under the drop rule, and
  with it the building the use stands in. The same holds for a non-live-in workplace whose main structure has `houses`.
  The applied text reads "a residential slot on a workplace's plot that is its main slot (a live-in class's among them)
  or within a `required` structure's least `count`". The "neither dropped" of the filed text now does the work for that
  case.
* **(b) The index row's vacant clause.** The row read "a plot whose required residential slots it cannot all fill typed
  vacant". After the fix, a workplace's plot is never typed vacant this way, so the row states the rule wrongly for
  it. It now reads "a residential plot whose …", followed by the workplace case. The where column stays `§4.7, §10.2`:
  adding `§2.5` made a pointer digit run that the document checks flag (C3 "2 5 4 7 10 2"), and the row text names the
  field anyway.
* **(c) The typing is stored: `BuildingSlot.unhoused` (§2.5).** The filed outcome, "S11 builds it as a slot without
  `houses`", is decided by the generation fill and cannot be read from the template, whose cell (or `liveIn`) says the
  slot is residential. The persisted site plan (`Plot.sitePlan.slots`) records only a slot's role, entrance edges and
  frontage. VPH1-02 (the model seat's round-2 file adopts it as filed) gives "a building S11 builds for a slot without
  `houses` (§10.2, §4.7)" capacity 0. After generation, a later reader would therefore have no stored input that tells
  the building apart from a residential one. Those readers are `relet` at an epoch, a heights edit's re-homing, §5.3's
  capacity row and an undo. The capacity would then be either unevaluable or not "a property of the shell alone"
  (§2.6).
  * **The field.** It is `unhoused?: true` on `BuildingSlot`, present only on such a slot.
  * **Who writes it.** Every run of the fill writes it (generation and every re-derivation).
  * **Who clears it.** The designation mutator clears it, and the mutator's undo restores it with the former parts.
    Post-build, a mutated slot is therefore an ordinary residential slot, which `relet` may let.
  * **Its readers.** Every reader of a slot's `houses` (§4.7 S11, §2.6's capacity, T19-4) reads it as a slot without
    `houses`.
  * **How it is applied.** §2.5 is model-owned, and a whole-§2.5 REPLACE from this seat could collide with the model
    seat's file. So the line goes as a one-string substitution in the block file's hand-off (2), in the form
    assemble-r1-handoff.py ran for the model's H1 and H2. The old string occurs once, inside §2.5. The model's round-2
    file replaces §2.6 only, so the substitution applies after it (checked).

## 2 Considered and ruled not defects

* **T19-4 stays unchanged.** Its clause "every building S11 builds for a slot without `houses` (§10.2) houses none"
  reaches the new case through §10.2's "unless §4.7's fill finds it no household" and the field. Its clause "every
  residential building houses at least one household" stays exact. verify-scope-r1 (§4) reached the same finding.
* **The overflow pass never fills an unhoused slot.** An overflow household of the slot's band could in principle have
  lived there. But a live-in household is sited first at its workplace (§4.7 *Live-in*), so an unhoused live-in slot
  means the district's demand of that band and drift was spent. Letting the pass re-type a built slot would also add a
  second typing path to S11's one batch per block. The outcome is defined and consistent. No change.
* **Post-build paths run no fill.** These are an `assign`, a relocation (§10.3) and a `rebuild`. The flag is never set
  there. A residential slot the mutator adds may stand unlet, as any building decline empties does. T19-4 and "never an
  empty residential building" bind the generation fill ("with no epoch"). No change.
* **§7.1's registry.** `BuildingSlot`'s fields are S11-derived site-plan state. §7.1 lists no edit kind for them; the
  item-19 field `frontage` is not listed there either, and the new field follows it. No registration.
* **Item 20.** The fix drops no use and no household: the workplace, its use and every dossier element stand. The
  dossier re-provision builds a residential slot, never an unhoused one. Owner rules hold.
* **VPH1-02's texts agree with this file's.** The model seat's round-2 file states "A building S11 builds for a slot
  without `houses` (§10.2, §4.7) has capacity 0". The flag is that rule's stored input. On the combined copy, both
  texts are present once and consistent.

## 3 Receipts (scratchpad `handfix/rp2/`)

* **Generation.** `gen.py` builds the block file from the live text. Every old string is asserted once, and every new
  string absent before and once after; every other line is verbatim.
* **Simulated assembly of this file alone** (`sim.py`: apply-blocks.py, then the r1 `swap_restated` unchanged, then the
  hand-off (2) substitution, checked as assemble-r1-handoff.py checks H1 and H2):
  * 4 of 4 blocks applied, audit 0 not-OK. The only notes are the expected "DUPLICATE ID inserted" for J-A28.46.
  * Swaps: 1 in the index and 1 in Part A (J-A28.46). The hand-off applied at l. 879.
  * Line counts unchanged (13 021 / 2 053); headings 145 → 145; fences balanced; title block unchanged.
  * `wdiff.py`: only §2.5 l. 879, §4.7 l. 4676, §10.2 l. 8910, the index at l. 12972 and Part A at l. 513 change, each
    by the texts above.
* **Combined.** The five round-2 files present at close were applied together: determinism, kernel, model, pipeline
  and rendering.
  * 13 of 13 blocks applied, 0 skipped, audit 0 not-OK.
  * Swaps: index J-A28.23, J-A28.26, J-A28.46; Part A J-A20.74, J-A28.23, J-A28.26, J-A28.34, J-A28.46.
  * The hand-off applied, and every new text of this file is present once.
* **References (`refs.py`).** Live, mine and combined each give 139 headings, 35 D ids, 472 J ids and 2 broken, the
  pre-existing external pair (`os-geometry.md` §2.1.4, RFC 7946 §3.1.6). 0 new.
* **Deferral probe.** The new texts give 0 hits.
* **Document checks:** see §4.

## 4 Document checks

The runs used one corpus snapshot: 9 626 JSON files and 911 940 corpus 3-grams in every run. The untouched copy was run
before and after the others and gave identical output both times.

| keys | untouched (live) | mine | combined (5 round-2 files) |
|---|---|---|---|
| subsections: 2.5, 4.7, 10.2, Judgment calls | exit 0 · C1 5 / C2 0 / C3 106 / C4 2 / S1 0 / S2 0, 0 unreviewed (run twice) | exit 0, identical hit list | exit 0, identical hit list |
| top-level: 2, 4, 10, Judgment calls | exit 0 · C3 595 / C4 4, 0 unreviewed | exit 0, identical hit list | — |
| rationale Part A (`--heads` the document) | C3 283 / C4 6 / S2 17, the rationale's standing unreviewed set | identical hit list (diff 0 lines) | — |

A first draft put `§2.5` into J-A28.46's where column. That made one new C3 hit, the pointer digit run "2 5 4 7 10 2".
The where column was restored to `§4.7, §10.2`, and the re-run above adds 0 hits. This lane needs no allow row.

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed on scratch copies): the blocks apply cleanly, the rows swap into place, the substitution applies
once inside §2.5, the word diff holds only the intended texts, and there are 0 new broken references, 0 deferral hits
and 0 new document-check hits (three copies, one corpus snapshot). **PLAUSIBLE** (vetoable): refinements (a) to (c), in particular the new stored field. A later verifier should
re-read §4.7's *Households per building*, §10.2's `houses` comment, §2.5's `BuildingSlot` and J-A28.46 once the round
is assembled, together with the model's §2.6 capacity sentence.

## Fable continuation (2026-09-27)

Seat: Claude Fable 5.1, finishing the opus stand-in's lane. State at this seat: the round-2 block files were NOT yet
assembled (no `handfix-b/assemble-r2` line in `docs/lane-events.log`), so the corrections below went into the block file,
regenerated whole from the live text by `handfix/frp2/gen-f.py` (the stand-in's `gen.py` with this seat's texts; every old
string asserted once, every other line verbatim). Live hashes at this seat: `docs/ARCHITECTURE.md` `e9c0b828…`,
`docs/ARCHITECTURE-RATIONALE.md` `dcabf14b…`, asserted by the generator and checked again after the lane's last write.
This seat edited no design file. The block file's sha256 moved from the stand-in's `ffbe0d87…` to `3bdc244e…`. Scratch:
`handfix/frp2/` under the session scratchpad; the stand-in's file is kept there as `block-standin.md`.

### What was re-checked

* **Blocks 1 and 2 (REPLACE §4.7, REPLACE §10.2) against VPH1-01 (1), (2) and the live subsections read whole**
  (l. 4359–4690 and l. 8881–9029). `blockdiff.py` line-diffs each block body against the live subsection: §4.7 331 lines
  against 331 with one changed line (l. 4676), §10.2 148 against 148 with one changed line (l. 8910); every other line is
  verbatim. The filed texts are inside the changed lines, word for word, with the stand-in's refinements.
* **Blocks 3 and 4 (J-ROWS, RATIONALE-A, J-A28.46 restated) against (3)–(5) and the live rows** (index l. 12972,
  rationale l. 513): the word diffs show exactly the filed deltas — "always one" → "one wherever a household fills it",
  "that a household fills" — plus the stand-in's vacant-clause and closing-sentence refinements.
* **Hand-off (2) against §2.5 read whole** (l. 826–942): the old string occurs once in the live document, inside §2.5, and
  still once after all six round-2 files' blocks (none of them replaces §2.5); the new string is absent before.
* **Refinement (a) — the main slot, required or not.** §4.7's drop rule protects a slot only "where the structure is
  `required`", and nothing in §10.2's `structures` row makes a main structure required, so under the filed text a
  non-required live-in main slot that no household fills would have been dropped, and with it the building the use stands
  in. The widening is right.
* **Refinement (b).** §4.7's live sentence types "a residential plot" vacant; the index row now says so. Right.
* **Refinement (c), the stored field `BuildingSlot.unhoused` — the queue row's first check.** Necessary, CONFIRMED by
  reading: after generation an unhoused slot's building and a vacated shop-house — `households` empty, `dwelling` absent,
  the `houses` cell true or the class `liveIn` — are the same stored state, so the ruled typing "a building S11 builds for
  a slot without `houses`" (VPH1-02's capacity 0, T19-4's "houses none", §4.7's "every other building's list is empty")
  could not be evaluated by its later readers without a stored bit: `relet` at an epoch (§4.11 rung 1 and step (f)), the
  capacity re-homing (§2.6), §5.3's capacity row, the mutator's undo. Its home is right: `BuildingSlot` is reached from
  `Building.slot` (l. 962) and already carries item 19's persisted slot attribute `frontage`; the model's round-2 §2.6
  (`repair-r2-model.md`, `fa0154b9…`) words the same fact as "the slot's typing, like the template row, a fact of what the
  shell was built as, never of its occupants". Its lifecycle is complete: written by every run of the fill — generation,
  Regenerate (keep settings), New random, `Adjust` and a brush's re-derivation past τ all re-run S10b and S11 —; read by
  S11, §2.6's capacity and T19-4; cleared by the designation mutator, which every mutation of the plot runs (an `assign`,
  a `setAttr` on use or class, a relocated use, a dossier re-designation, the ladder's `mutate` steps), and restored by
  the mutator's undo with the former parts (§4.7 item 5); absent from a slot the fill never typed (one a mutation adds, a
  re-cut's or a `rebuild`'s new site plan); an optional field, so no migration. The delivery as a preamble substitution in
  round 1's H1/H2 form is right because §2.5 is model-owned; mechanically a whole-§2.5 REPLACE would not have collided
  this round (the model's file replaces §2.6 only), and the preamble now gives ownership, not collision, as the reason.
* **Agreement with the model's round-2 file as it stands** (`fa0154b9…`, the model seat's own Fable continuation): its
  capacity-0 sentence is generic ("a slot without `houses`"), and its `Building.dwelling` comment's clearing events —
  §10.3's relocation, §4.7's overflow pass, the capacity re-homing, an edit that leaves the building no live-in use — are
  consistent with NEW1's "`Building.dwelling` absent". The two files touch no common text.
* **T19-4 needs no change**, as the verifier and the stand-in found: `repair-r2-scope.md`'s REPLACE of §13.2 carries
  T19-4's two live lines identically, and its clause "every building S11 builds for a slot without `houses` (§10.2) houses
  none" reaches the new case through §10.2's "unless §4.7's fill finds it no household" and the field.
* **Collision sweep.** The six round-2 files replace §5.2 and §7.4 (determinism), §3.4 (kernel), §2.6 (model), §4.7 and
  §10.2 (this file), §8.2 (rendering) and §13.2 (scope); only this file touches §4.7, §10.2, J-A28.46 and §2.5's one line.

### Corrections to the block file (regenerated whole)

1. **The case set reads "a workplace's or an institution's plot"** — in §4.7 ("the workplace or institution and its use
   stand"), the §2.5 hand-off comment, the index row and the Part A entry ("typing the plot vacant"). The document lists
   institutions apart from workplaces (S7b l. 4121 "institutions, then large workplaces"; S10a's steps (i) and (iii)),
   and institutions are claims with designation templates (S10 (3): "the requirement is the designation template's size
   budget"), so a claim's `houses` structure — an almshouse's dwellings — fell in the same gap: a claim is no residential
   plot, so the vacant rule never reached it, and the drop rule protects a required least count only.
   JUDGMENT: widened the case set to institutions over keeping the verifier's "a workplace's plot", because the gap is the
   same and the word "workplace" excludes institutions where the document allocates them — say "veto" to flip it (four
   texts lose "or an institution's"; one gen-f.py run).
2. **The Part A entry records the overflow-pass alternative**: "and over letting S11's overflow pass let such a slot — a
   second typing of one slot in one derivation, after S11's batch — the slot being let, once a designation change
   re-derives it, by a relocated use's household or a later `relet`". The stand-in ruled this in its report §2 only, and
   its reason ("the district's demand of that band and drift was spent") does not preclude an overflow household of that
   band — one a clamp left on a residential plot placed earlier — so the case is reachable and a verifier reading the
   design would have found it unruled. The ruling itself stands.
   JUDGMENT: kept one typing path per derivation over letting the overflow pass let an unhoused slot, because the second
   path would re-type a built slot after S11's batch, set `dwelling` to a household the workplace never sited, and need
   §2.6's "built as" wording and T19-4's clause adjusted in two other seats' files, for a case that a designation change
   resolves — say "veto" to flip it (a §4.7 clause in the overflow pass, the §2.5 comment's clearing events, the Part A
   entry, and model and scope hand-offs).
3. **Preamble.** The PROGRESS ledger records the continuation; the hand-off (2) lines carry the new comment verbatim (the
   transcription check's form); the reason for the substitution form is stated as ownership.

Everything else is byte-identical to the stand-in's file: the §10.2 text, refinements (a)–(c), the index row's other
clauses, the block structure (4 blocks, the same hand-off).

### Receipts re-executed (`handfix/frp2/`)

* `gen-f.py`: six substitutions and the hand-off, each old string once, each new string absent before and once after; the
  live hashes asserted; the hand-off's old and new lines verbatim in the preamble.
* `blockdiff.py` on the regenerated file: as in "What was re-checked" above (one changed line per REPLACE; the rows'
  deltas as listed).
* **Alone** (`rp2/sim.py`, this file only): 4 of 4 applied, audit not-OK 0; swaps index {J-A28.46}, Part A {J-A28.46};
  the hand-off applied at l. 879; 13 021 / 2 053 lines unchanged; headings 145 → 145; fences balanced; title block
  unchanged.
* **Combined with the six round-2 files as they stand** — determinism `ce62542d…`, kernel `3362e9c9…`, model `fa0154b9…`,
  pipeline `3bdc244e…`, rendering `69a226bd…`, scope `04d0945c…`: 14 of 14 applied, audit not-OK 0; swaps index
  {J-A28.23, J-A28.26, J-A28.46}, Part A {J-A20.74, J-A28.23, J-A28.26, J-A28.34, J-A28.46}; the hand-off applied at
  l. 879; 13 025 / 2 053 lines.
  Re-hashed after the determinism seat's 18:36 landing (`docs/lane-events.log` l. 402): all six files unchanged, and a second
  combined assembly (`comb2-doc.md`, `comb2-rat.md`) is byte-identical to the first, this file's five texts once each on it.
* `wdiff.py` live → alone: document l. 879, 4676, 8910 and 12972, rationale l. 513 — the texts above and nothing else.
* `probes-f.py`: the 4 new document texts and the Part A text 0 live / 1 alone / 1 combined; the 5 retired document texts
  and the 2 retired Part A texts 1 live / 0 alone / 0 combined; J-A28.46 has one index row and one Part A row on both
  copies. ALL OK.
* `refs.py` on live, alone and combined: 139 headings, 35 D ids, 472 J ids, 2 broken — the pre-existing external pair
  (`os-geometry.md` §2.1.4, RFC 7946 §3.1.6). 0 new.
* Deferral probe (the verifier's word list) on the five new texts: 0 hits.
* **Document checks** (`doc_checks.py`; one corpus snapshot in every run: 9 626 JSON files, 911 940 corpus 3-grams; the untouched copy run before and after the others, identical both times, so the corpus held still):

| comparison | untouched | this seat's copy | hit lists |
|---|---|---|---|
| subsections 2.5, 4.7, 10.2, Judgment calls — untouched run 1 vs alone | C1 5 / C2 0 / C3 106 / C4 2 / S1 0 / S2 0; unreviewed 0; exit 0 | C1 5 / C2 0 / C3 106 / C4 2 / S1 0 / S2 0; unreviewed 0; exit 0 | 0 vs 0 listed hits; identical after normalising line numbers |
| the same keys — untouched run 1 vs combined (six r2 files) | C1 5 / C2 0 / C3 106 / C4 2 / S1 0 / S2 0; unreviewed 0; exit 0 | C1 5 / C2 0 / C3 106 / C4 2 / S1 0 / S2 0; unreviewed 0; exit 0 | 0 vs 0 listed hits; identical after normalising line numbers |
| the same keys — untouched run 1 vs untouched run 2 (the bracket) | C1 5 / C2 0 / C3 106 / C4 2 / S1 0 / S2 0; unreviewed 0; exit 0 | C1 5 / C2 0 / C3 106 / C4 2 / S1 0 / S2 0; unreviewed 0; exit 0 | 0 vs 0 listed hits; identical after normalising line numbers |
| top-level 2, 4, 10, Judgment calls — untouched vs alone | C1 5 / C2 0 / C3 595 / C4 4 / S1 0 / S2 0; unreviewed 0; exit 0 | C1 5 / C2 0 / C3 595 / C4 4 / S1 0 / S2 0; unreviewed 0; exit 0 | 0 vs 0 listed hits; identical after normalising line numbers |
| rationale whole (--heads the document) — untouched vs alone | C1 0 / C2 0 / C3 399 / C4 6 / S1 0 / S2 17; unreviewed 274; exit 1 | C1 0 / C2 0 / C3 399 / C4 6 / S1 0 / S2 17; unreviewed 274; exit 1 | 274 vs 274 listed hits; identical after normalising line numbers |
| top-level 2, 4, 10, Judgment calls — untouched vs combined (six r2 files) | C1 5 / C2 0 / C3 595 / C4 4 / S1 0 / S2 0; unreviewed 0; exit 0 | C1 5 / C2 0 / C3 595 / C4 4 / S1 0 / S2 0; unreviewed 0; exit 0 | 0 vs 0 listed hits; identical after normalising line numbers |
| rationale whole (--heads the document) — untouched vs combined | C1 0 / C2 0 / C3 399 / C4 6 / S1 0 / S2 17; unreviewed 274; exit 1 | C1 0 / C2 0 / C3 403 / C4 6 / S1 0 / S2 17; unreviewed 278; exit 1 | 274 vs 278 listed hits; DIFFER: only in the combined copy wall and the room is section from l. N; in the middle of the room section from l. N; ring with a hole a section from l. N; a spiral stair in a round tower section from l. N; hall keep ring stair tower wall well l. N; only in the untouched keep ring stair tower wall well l. N — every one in the model's restated J-A28.26 Part A row (the one hit only in the untouched copy is the old row's), that lane's text for assemble-r2's review, none of this file's (the alone copy is identical to the untouched) |
| subsections, EMPTY allow file — untouched vs combined | C1 5 / C2 0 / C3 106 / C4 2 / S1 0 / S2 0; unreviewed 113; exit 1 | C1 5 / C2 0 / C3 106 / C4 2 / S1 0 / S2 0; unreviewed 113; exit 1 | 113 vs 113 listed hits; identical after normalising line numbers |
| subsections, EMPTY allow file (every hit listed) — untouched vs alone | C1 5 / C2 0 / C3 106 / C4 2 / S1 0 / S2 0; unreviewed 113; exit 1 | C1 5 / C2 0 / C3 106 / C4 2 / S1 0 / S2 0; unreviewed 113; exit 1 | 113 vs 113 listed hits; identical after normalising line numbers |

  The change adds 0 hits and needs no allow row. The empty-allow runs list every hit (so their exit is 1 by construction) and show the same 113 hits on both copies, none on the changed lines; the rationale's standing unreviewed set (exit 1 on both copies, as every seat of this pass found) is unchanged.

### CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed or read on disk at this seat): the block bodies' identity with the live text except at the five
intended places; the filed texts (1)–(5) present word for word inside them; the alone and combined assemblies, the swaps,
the hand-off, the probes, the references, the deferral probe and the document checks as tabulated; the live hashes
unchanged through the lane; that an unhoused slot's building and a vacated shop-house share one stored state without the
new field (the argument reads `Building` l. 962–974, §2.6's capacity function and §10.3's relocation); that `Building.slot`
reaches the slot; that `repair-r2-scope.md` carries T19-4 unchanged and `repair-r2-model.md` (`fa0154b9…`, landed 18:12)
touches no text of this file.
**PLAUSIBLE** (reasoning, vetoable): the two completions — the institution widening and the recorded overflow ruling —
and the stand-in's refinements (a)–(c) as design choices; the reachability of the unhoused case itself (the verifier's
own label); that no institution row in the shipped tables actually carries a `houses` structure (if none does, the
widening is dormant, not wrong). A later verifier should re-read §4.7's *Households per building*, §10.2's `houses`
comment, §2.5's `BuildingSlot` and J-A28.46 once assemble-r2 has run, together with §2.6's capacity sentence.

### Queue row and closing

The queue row `A-handfix-b/repair-pipeline-r2` exists (docs/FABLE-REVIEW-QUEUE.md l. 251, produced by "opus stand-in")
and is left for workflows/05; its "check first" items are answered above (refinement (c) necessary and its delivery
right; refinement (a) right). Its "what" column describes the stand-in's texts; this section is the delta. The PENDING
line at the top of this report stays. No design file was edited; assemble-r2 applies this file with the five siblings.
