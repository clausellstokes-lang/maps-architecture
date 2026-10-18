# handfix-b/repair-rendering-r2 — the RENDERING part's round-2 hand-fix issue, repaired as blocks

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat handfix-b/repair-rendering-r2; queued in docs/FABLE-REVIEW-QUEUE.md.

PROGRESS (kill-safe ledger; a seat that continues this lane reads it first)
ITEM read: planned verify-model-r1 (VHM1-05, §3 sweeps), closing-report §2 #7 #14 and §3, live §8.2 whole, §8.3, §8.4, §8.5 whole, §11.1 passage rows, §2.4 passage note, §2.5 `Passage`, §2.6 `BaseWing.spans`, J-A30.26 / J-A30.84 rows | done
ITEM sweep: planned every arch-glyph text in both files | done (§2 below: 1 changed, 6 read and left)
ITEM compose: planned REPLACE §8.2 (the one row) | done (scratchpad handfix/rr2/compose.py; 1 block, file sha256 69a226bd…)
ITEM verify: planned apply-blocks on copies (alone, combined), probes, refs.py, doc_checks three copies | done (§4; its document-check table was left as the placeholder DOCCHECKS-TABLE, filled by the Fable continuation from the stand-in's own outputs)
ITEM close-out: planned queue row, LANDED line | done (by the Fable continuation, 2026-09-27: queue row A-handfix-b/repair-rendering-r2 appended, produced-by 'opus stand-in, finished by fable'; LANDED line written)
ITEM fable-continuation (Fable 5.1, 2026-09-27, before assemble-r2): planned re-read the block against VHM1-05 and the live §8.2, confirm the claim's reader list, re-read the sweep's seven texts in place, check closing-report §3, judge the two PLAUSIBLE items, collision check with all six r2 files, re-execute the receipts on copies (rr2f), fill the DOCCHECKS-TABLE, append the continuation section, queue row, LANDED line | done (§ Fable continuation)

Lane `handfix-b/repair-rendering-r2`, 2026-09-27, an opus stand-in for the Fable seat. Base: `docs/ARCHITECTURE.md`
sha256 `e9c0b828…` and `docs/ARCHITECTURE-RATIONALE.md` `dcabf14b…`, unchanged through the lane. This seat edited no
design file. Output: `docs/validation/amendments-b/handfix/repair-r2-rendering.md`, which holds 1 block and no preamble
(sha256 `69a226bd…`).

## Outcome

VHM1-05 is fixed with the verifier's required text, verbatim. It is not ruled invalid. The block replaces §8.2, the
smallest subsection that holds the row, because §8.2 has no lower heading. Only the passage-arch row changes, and every
other line of §8.2 is byte-identical. No new ruling is made, so the block file has no J-ROWS or RATIONALE-A. J-A30.26
already records the rule the row now states: every reader of the span, the arch glyph among them, keys on `spans` or on
`frontBuilding`. There is nothing for the assembler to hand off.

| issue | where | fixed by | as required? |
|---|---|---|---|
| VHM1-05 | §8.2 symbolisation table, the passage-arch row | REPLACE §8.2; only that row changes | yes, verbatim |

## 1 The text

The row's rule now reads: "an arch glyph on the front building's outline (`Passage.frontBuilding`; none while the
passage has none, §2.6's `BaseWing.spans`) at each end of the face — where it meets its way and its court — 3 px wide at
1×, never below 2 px; …". The rest of the row is unchanged, including the floor in `road` and the city-band clause.

**Why this closes the claim.** The row, the home of the arch glyph, is now keyed on the same field as the other readers
of the span: §8.5 (2)'s span mark, §8.4's span caster, §8.3's census row and §11.1's glTF and CityJSON rows. After a
`robStone`, `clear` or `demolish` of the front building, that event clears `frontBuilding` (§2.6's `BaseWing.spans`,
§7.3 item 1). The cleared trace still stands on the front plot, but no glyph is drawn on its outline. This matches
§2.6's "no span mark, span caster or arch glyph drawn over it". The undo restores `frontBuilding`, so the glyph returns
with it. A successor that S11 raises writes `frontBuilding` again.

## 2 Considered, not changed

Every other arch-glyph text in both files was read in place.

* **§8.2's paint-program list** reads "`symbol(glyph)` (a point symbol … for each end of a `passage` face (an arch,
  §8.3) …)". It names the program that draws the glyph, not when the glyph is drawn. The symbolisation row is the rule,
  and the row now carries the condition. Adding the condition here as well would restate it in a second place.
* **§8.2's `states` row for a `sealed` passage** reads "override: the arch glyph at each end drawn closed". An
  `override` row lays its changes over the entity's own programs (§8.2, "an `override` row lays its changes over
  them"). A passage with no `frontBuilding` draws no arch, so the row has nothing to close. A sealed, uncovered passage
  therefore draws its face and no glyph, as §2.6 says. §8.3's states census asks only that the row resolves, and it
  still does.
* **§8.2's tunnel note**, "a `passage` as a `main` with arch glyphs at its ends", is about `Tunnel.kind` (II.7), not
  the `Passage` face. It is out of this issue's reach.
* **§8.3's census row for passages** already reads "every passage with a `frontBuilding`". It needs no change.
* **§8.5 (2)** already opens with "A building over a passage (`Passage.frontBuilding`, §2.5)". Its "under its arch
  glyphs (§8.2)" sits inside that condition. No change.
* **§2.4's note** ("reached as an access face and drawn with an arch glyph (§8.3)") is a model-owned summary of the
  covered case, item 30 (c)'s normal state. It points to the rendering home, which now states the exception, and §2.6
  states it as well. It is not re-filed.
* **J-A30.84**, both its index row and its Part A entry, records the original drawing choice. J-A30.26 records the
  amendment for an uncovered passage, and the index cites §8.2 for both. No restatement is needed.

## 3 Sibling round-2 files

`repair-r2-model.md`'s §2.6 block keeps `BaseWing.spans` and its sentence "no span mark, span caster or arch glyph drawn
over it" (checked in the combined copy: once). That is the target of this row's pointer. No other round-2 file touches
§8.2.

## 4 Receipts (scratch: `handfix/rr2/` under the session scratchpad)

* **Composition.** `compose.py` asserts the document hash. It takes §8.2 from its heading to the line before §8.3's,
  and asserts that the old text occurs exactly once in the document and once in §8.2, and the new text zero times.
* **Applied alone.** 1 of 1 block applied, audit not-OK 0.
  * Headings 145 → 145, fences balanced (108 fence lines), title block unchanged.
  * Document 13 021 → 13 021 lines, 1 636 552 → 1 636 637 bytes. The diff is one line, l. 7756 (the row).
  * The rationale file is byte-identical.
* **Applied combined** with the sibling round-2 files as they stood during this lane: `repair-r2-determinism.md`
  `ce62542d…`, `-kernel.md` `3362e9c9…`, `-model.md` `67fa25da…` and `-pipeline.md` `1881785f…`.
  * 13 of 13 blocks applied, audit not-OK 0, headings 145 → 145.
  * The combined copy differs from the siblings-only copy by this one row (l. 7758 there). The rationale is identical.
* **Probes** (whitespace-normalised). In both the alone and the combined copy the new text occurs once and the old text
  0 times, and §2.6's "no span mark, span caster or arch glyph drawn over it" occurs once.
* **References** (`refs.py`). Live, mine and combined each show headings 139, D 35, J 472 and 2 broken references. The
  2 are the pre-existing external citations `os-geometry.md` §2.1.4 and RFC 7946 §3.1.6.
* **Document checks** (`doc_checks.py --sections "8"`, one corpus snapshot of 9 626 JSON files and 911 940 C3
  3-grams): see the table below.

| run | copy | allow file | C1 | C2 | C3 | C4 | S1 | S2 | unreviewed | exit |
|---|---|---|---|---|---|---|---|---|---|---|
| untouched, before (14:55) | live `e9c0b828…` | default | 5 | 0 | 65 | 0 | 0 | 0 | 0 | 0 by the script's rule (not captured) |
| mine (14:58) | live + REPLACE §8.2 (`7a56bae4…`) | default | 5 | 0 | 65 | 0 | 0 | 0 | 0 | same |
| combined (15:02) | live + the r2 determinism, kernel, model and pipeline files as they then stood | default | 5 | 0 | 65 | 0 | 0 | 0 | 0 | same |
| untouched (15:05) | live | empty | 5 | 0 | 65 | 0 | 0 | 0 | 70 | 1 (every raw hit unreviewed) |
| mine (15:07) | live + REPLACE §8.2 | empty | 5 | 0 | 65 | 0 | 0 | 0 | 70 | same |
| untouched, after (15:09) | live | default | — | — | — | — | — | — | — | cut off: the session ended during the run (696 lines, no summary) |

(The placeholder above stood as `DOCCHECKS-TABLE` when the stand-in's session ended; the Fable continuation filled it on 2026-09-27 from the stand-in's own outputs in `handfix/rr2/`, which it did not re-run. Raw hits with the empty allow file, mine against untouched, by (check, text) with the location dropped: 0 added, 0 removed. The "after" run was cut, so the stand-in's corpus check is open; the continuation's runs below bracket the corpus again and close it.)

## 5 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (executed). The following were run and match §4:

* the block parses and applies, alone and combined;
* the one-line diff;
* the probes;
* the references;
* the document checks.

Every quoted live text was read in place.

**PLAUSIBLE** (reasoning, for Fable):

* that the `sealed` override row needs no wording of its own (§2);
* that the pointer "§2.6's `BaseWing.spans`" names the right home, since `Passage.frontBuilding`'s own comment defers
  its clearing to it.


## Fable continuation (2026-09-27)

Seat: Claude Fable 5.1, finishing the opus stand-in's lane. State at this seat: the round-2 block files were NOT yet
assembled (no `handfix-b/assemble-r2` line in `docs/lane-events.log`), so a correction would have gone into the block file,
the block regenerated whole. Live hashes at this seat: `docs/ARCHITECTURE.md` `e9c0b828…`, `docs/ARCHITECTURE-RATIONALE.md`
`dcabf14b…` — the stand-in's base, unchanged, checked again before the last write of the lane. This seat edited no design
file and changed no byte of the block file (sha256 still `69a226bd…`). Scratch: `handfix/rr2f/` under the session
scratchpad. The stand-in's ledger had left the close-out in progress (no queue row, no LANDED line) and §4's document-check
table as a placeholder; both are completed here.

### What was re-checked

* **The block (REPLACE §8.2) against VHM1-05 and the live §8.2** (l. 7629–7962, read whole). A line diff of the block body
  against the live subsection: 333 lines each, one line differs — body l. 128 = live l. 7756, the passage-arch row — and the
  change is the verifier's required substitution verbatim (old string once in the document, new string zero times before,
  once after). Nothing else in the body differs by a byte.
* **The claim's reader list, in the live text.** §8.5 (2) (l. 8131) opens "A building over a passage (`Passage.frontBuilding`,
  §2.5)"; §8.4 (l. 8051) casts "a building over a passage … its span marks", which exist only under that condition; §11.1
  (l. 9163–9164) extrudes "each wing that spans a passage" (`BaseWing.spans`); §8.3's census row (l. 8015) counts "every
  passage with a `frontBuilding`". §8.2's row was the one reader keyed on the passage face alone; with the block it keys on
  `frontBuilding`, so J-A30.26's Part A sentence — every reader of the span, the arch glyph among them, "keys on `spans` or
  on `frontBuilding`" — is true of every reader it names.
* **The pointer's target.** `Passage.frontBuilding`'s comment (§2.5 l. 876) defers its clearing to "§2.6's BaseWing.spans",
  whose comment (l. 959) holds the rule and the sentence "no span mark, span caster or arch glyph drawn over it". The round-2
  §2.6 block that lands in the same assembly (`repair-r2-model.md`, now `fa0154b9…`, changed since the stand-in's run)
  carries that sentence once, so the pointer still lands after the assembly (probe below: once in every copy).
* **The stand-in's sweep (§2), each text re-read in place:** the `symbol(glyph)` program clause (l. 7781–7782), the tunnel
  note (l. 7784–7785, `Tunnel.kind`, II.7), the `sealed` states row (l. 7871), §8.3's census row (l. 8015), §8.5 (2)
  (l. 8131–8138), §2.4's note (l. 823) and J-A30.84 (index l. 12909, Part A l. 450). The sweep is complete — a grep of both
  files for "arch glyph", "an arch" and "arch, §8.3" finds no other — and none of the seven needs a change (verdicts below).
* **Closing-report §3.** No ruling concerns the arch glyph: "arch glyph", "frontBuilding" and "BaseWing.spans" occur in the
  closing report only in §2's rows 7 and 14. VHM1-05 is a round-1 verifier finding, so the only text to honour is the
  verifier's required change, which the block carries verbatim.
* **Collision.** The six r2 files replace §5.2 and §7.4 (determinism), §3.4 (kernel), §2.6 (model), §4.7 and §10.2
  (pipeline), §8.2 (this file) and §13.2 (scope); none other touches §8.2, and in the combined assembly the only hunk
  between §8's heading (l. 7512) and §9's (l. 8541) is this lane's row (l. 7760 after the earlier sections' growth of
  4 lines).

### Verdicts on the stand-in's PLAUSIBLE items, and one more

| item | verdict | evidence |
|---|---|---|
| the `sealed` override row needs no wording of its own | sound; left as it stands (JUDGMENT 1) | an `override` row "lays its changes over" the entity's resolved programs (§8.2, the states paragraph); its change is to the arch glyph, which the symbolisation row now draws only while the passage has a `frontBuilding`, so for an uncovered passage there is no glyph to close and the row is vacuous, not wrong; the `sealed` bit itself stands (§2.6: "its face, its `sealed` bit and its plots' access unchanged") for the plots' exposure (§4.6) and for the glyph's return with a successor; §8.3's census row is already scoped to passages with a `frontBuilding`, so its "drawn closed where `Passage.sealed`" asks nothing of an uncovered one |
| "§2.6's `BaseWing.spans`" names the right home | sound | `Passage.frontBuilding`'s own comment (§2.5) sends the reader there for the clearing; §7.1 (l. 6546) and §7.3 item 1 (l. 6692) cite the same pair "(§2.5's `Passage`, §2.6's `BaseWing.spans`)"; and it is the verifier's text |
| (Fable's) the row's city-band clause, "none at the city band, where the spanning building's mass covers it", for an uncovered passage | needs no change (JUDGMENT 2) | the clause's reason is the covered case's; for an uncovered passage the glyph is absent at every band by the new parenthesis, and the row's `bands` column (district, neighbourhood) never reaches the city band, so no reader is misled |
| (Fable's) what an uncovered passage draws | consistent; noted, not changed | at the district band and finer its floor in `road` (the row's second clause, unconditional, matching §2.6's "its face … unchanged"); at the city band no span mark (§8.5 (2)) and no mass over the cleared trace (§8.2's `cleared` row: "no mass at the city band"), so the passage reads as the open cut it now is |

JUDGMENT 1: left the `sealed` states row without a condition of its own, over adding "where an arch glyph is drawn", because
an override over an undrawn glyph changes nothing, the model section states the rule once and the rendering home now
carries it once, and a third copy would be a second place to keep in step — say "veto" to flip it (the change would be one
REPLACE of §8.2 in this block file, before assemble-r2).

JUDGMENT 2: kept the verifier's required text verbatim and did not touch the city-band clause, because the clause states
the covered case's reason and the new parenthesis already removes the glyph for the uncovered one — say "veto" to flip it.

### Corrections to the block file

None. The block is right and complete against VHM1-05 and the live text, so it was not regenerated.

### Receipts re-executed (`handfix/rr2f/`)

* **Alone** (this file only): 1 of 1 applied, audit not-OK 0; headings 145 → 145, fences balanced, title block unchanged;
  document 13 021 → 13 021 lines, 1 636 552 → 1 636 637 bytes, sha256 `7a56bae4…` — byte-identical to the stand-in's dry
  run; the rationale byte-identical to live. `diff` against live: 1 hunk, l. 7756 (the row).
* **Combined with all six r2 files as they stand now** — determinism `ce62542d…`, kernel `3362e9c9…`, model
  `fa0154b9…`, pipeline `3bdc244e…`, rendering `69a226bd…`, scope `04d0945c…`: 14 of 14 applied, audit not-OK 0
  (the six DUPLICATE-ID notes are the siblings' restated-row hand-offs, none this lane's), headings 145 → 145, document
  13 028 lines. **Siblings only:** 13 of 13. `diff` siblings-only against combined: 1 hunk, l. 7760 (the row); the two
  rationale outputs byte-identical.
* **Probes** (whitespace-normalised counts, live / mine / combined / siblings-only): the new row text 0 / 1 / 1 / 0; the old
  row text 1 / 0 / 0 / 1; §2.6's "no span mark, span caster or arch glyph drawn over it" 1 / 1 / 1 / 1; `Passage.frontBuilding`'s
  "cleared as §2.6's BaseWing.spans states" 1 / 1 / 1 / 1; §8.3's "every passage with a `frontBuilding`" 2 / 2 / 2 / 2 (the
  census row and T30-4); §8.5 (2)'s opener, the `sealed` override row, the `symbol(glyph)` passage clause and J-A30.84's
  index citation "§8.2 (the row)" 1 / 1 / 1 / 1 each.
* **References** (`docs/validation/amendments-b/refs.py`), live, mine, combined: headings 139, D ids 35, J ids 472, broken 2
  each — the pre-existing external citations `os-geometry.md` §2.1.4 (l. 2705) and RFC 7946 §3.1.6 (l. 9192; 2709 and 9196
  in the combined copy).
* **Document checks** (`doc_checks.py --sections "8"`; one corpus snapshot — the six runs launched together at
  18:43:22, done at 18:46:59; the untouched copy run again after, done at 18:48:52; every run
  reports `sections=8 identifiers=36 colours=41 json_files=9626 c3_corpus_3grams=911940 c4_lists=478`; colour_files 10095 (live1, mine, comb, live-noallow, mine-noallow, comb-noallow), 10096 (live2)` — the C2 colour-file census grew by one file during the runs while the JSON, 3-gram and list corpora held still, and C2 has 0 hits in every run):

| run | copy | allow file | C1 | C2 | C3 | C4 | S1 | S2 | unreviewed | exit |
|---|---|---|---|---|---|---|---|---|---|---|
| untouched, before | live `e9c0b828…` | default | 5 | 0 | 65 | 0 | 0 | 0 | 0 | 0 |
| mine | live + REPLACE §8.2 (`7a56bae4…`) | default | 5 | 0 | 65 | 0 | 0 | 0 | 0 | 0 |
| combined | live + all six r2 files (`fe078a2f…`) | default | 5 | 0 | 65 | 0 | 0 | 0 | 0 | 0 |
| untouched | live | empty | 5 | 0 | 65 | 0 | 0 | 0 | 70 | 1 (raw hits, all unreviewed) |
| mine | live + REPLACE §8.2 | empty | 5 | 0 | 65 | 0 | 0 | 0 | 70 | 1 |
| combined | live + all six r2 files | empty | 5 | 0 | 65 | 0 | 0 | 0 | 70 | 1 |
| untouched, after | live | default | 5 | 0 | 65 | 0 | 0 | 0 | 0 | 0 |

  The seven summaries are identical (C1 5, C3 65, every other check 0; every hit reviewed under the default allow file), so
  the corpus held still and neither copy adds or loses a hit. Raw hits with the empty allow file, compared by (check, text)
  with the location field dropped: mine against untouched 0 added / 0 removed; combined
  against untouched 0 added / 0 removed (70 raw hits in each).

### CONFIRMED versus PLAUSIBLE (this seat)

**CONFIRMED** (executed today): the one-line diff of the block body against live §8.2; the alone, combined and siblings-only
assemblies and their diffs; the probes; the references; the seven document-check runs and the raw-hit comparison; the
stand-in's DOCCHECKS-TABLE filled from its own outputs; the design files' hashes before and after the lane's writes.

**PLAUSIBLE** (reasoning): JUDGMENT 1 and JUDGMENT 2 above — both vetoable, each a one-block change in this file before
assemble-r2.
