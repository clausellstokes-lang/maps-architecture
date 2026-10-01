# Verify — pipeline (base §4, §10, PART II, PART III) after repair round 5

> Lane `coherence/verify-pipeline-r5t` · opus verifier · 2026-10-01 · live base `docs/ARCHITECTURE.md` sha256 `2d84eac2…`
> (assemble-r5's output). Design files untouched.

PROGRESS
- P0 brief read whole (incl. ROUND-5 NOTES, NEW OWNER RULES 114–116, ORCHESTRATION NOTES); resume check (no output, no LANDED): done
- P1 inputs: round-4 findings (verify-pipeline-r4t, 3 issues), adjudication-r5 (R5-01 – R5-10; R5-02 and R5-03 whole; Part H · pipeline and every END line naming this unit or my round-4 ids), `work/round5-work/pipeline.json` (11 issues), repair-r5-pipeline (10 REPLACE, 25 edits, its sweep and 2 hand-offs), assemble-r5 (pipeline 10/10 applied; base `5f34cceb…` → `2d84eac2…`): done
- P2 every round-4 finding re-checked against the live text, with each END line's second end: done — 3 of 3 FIXED
- P3 the pipeline unit's 11 round-5 dispositions and 4 END lines (P1 – P12) re-checked; the 25 in-scope hunks word-diffed against assemble-r4's text (commit `3310b538`) and read in their subsections with the homes they cite: done — 2 new problems
- P4 references, ids, retired terms, review ids, phone clauses and doc_checks on the touched sections: pending
- P5 findings, result file, LANDED: pending

## Sources

- Live: `docs/ARCHITECTURE.md` `2d84eac2…` (assemble-r5's output); before the round: assemble-r4's text at commit `3310b538`
  (`5f34cceb…`), extracted read-only (`git show`).
- Round 5: `adjudication-r5.md` (R5-01; R5-02 and R5-03 whole; Part H · pipeline, model, determinism, scope, V06, V08 for
  every END line closing my round-4 ids or the pipeline unit's), `work/round5-work/pipeline.json`, `repair-r5-pipeline.md`
  (header, dispositions, END lines, sweep, hand-offs, receipts), `assemble-r5.md` (§1, §2, §4 – §9).
- Round 4: `verify-pipeline-r4t.md`, `results/coherence_verify-pipeline-r4t.json`.
- In scope only repair-r5-pipeline's ten REPLACE blocks changed text: 25 hunks in §4.1 (2), §4.3 (3), §4.4 (5), §4.5 (1),
  §4.7 (1), §4.8 (4), §4.11 (4), §4.13 (2), §10.2 (2), II.7.3 (1); every other line of §4, §10, PART II and PART III is
  byte-identical to assemble-r4's (line-diff of the two texts, hunks mapped to their headings).

## Part 1 — round-4 findings re-checked (3 of 3 FIXED)

| id | owner | disposition (adj-r5) | verdict | evidence (live text) |
|---|---|---|---|---|
| VPC-R4-01 | model | MERGED into VM-R4T-01 (FIX per R5-02, amended) | FIXED, every end | R5-02 replaces the last support run: §2.7's support step (6) (l. 2580–2623) holds a raised way from the commit that creates it, and (6) (a) makes every part-0 way laid after it — S5b's and S5c's among them — cross its under-deck strip only by §4.3's crossing rule, keeping off its supports, ramps, stairs and feet; §4.3 *Lattice and costs* (P1, l. 5643–5654); §4.4 S5c's legality (l. 5951–5955); T110-2 (3) (l. 18490–18491: "a CITY S4 timber viaduct crossed by a `through` S5b road and an S5c street, each crossing under a span clear of its supports") and (6) (l. 18504–18506) |
| VPC-R4-02 | pipeline | MERGED into VAT4-r4-01 (FIX per R5-03) | FIXED, every end | §4.11 *The clock* (4) l. 8475–8487 is R5-03's text word for word (late = never before `W₀`; `W₁` after `W₀`: the first epoch this absorb folds, one folded at `W₁` where none; `W₁` not after `W₀`: no epoch, the F5 targets applied at `W₀`, the calamity held in `DossierBinding.lateCalamities`); §7.7 l. 11825, §7.1's `dossierFacts` l. 10357, §7.4's row l. 11228; V08 §3.6 (3) l. 1862–1874 and (4) l. 1903–1908, §2.6's row l. 1292, §3.17's degenerate row l. 2698, T-V8-49 (g) l. 3311; T76-1 l. 18236–18246. The "V08 §3.6's degenerate row" citation is gone with the sentence |
| VPC-R4-03 | determinism | MERGED into VM-R4T-04 (FIX) | FIXED | §5.4 l. 9289: "… S10b's `W_DOSSIER_EDGE` (§4.7 S10b), S5a's and S7's `W_RAISED_CROSSING` (§2.7's support step (6); §4.4 *Outer moats*; §4.8)" |

## Part 2 — the pipeline unit's round-5 dispositions re-checked

Every id of Part H · pipeline is applied as ruled (R5-02's P-texts and R5-03's text checked verbatim against the live base,
whitespace-normalised: all present):

| id | disposition | verdict | live text |
|---|---|---|---|
| VAT4-r4-01 (+ VPC-R4-02) | FIX per R5-03 | FIXED | Part 1 |
| VDC4-05 | FIX per R5-02 (P11) | FIXED as worded ("V06 §3.7.6 (5) gives its form" closes the citation, a doc_checks false-positive dodge; same meaning) — but see VPC-R5-02 | §4.11 `wallToWay` l. 8218–8221 |
| VEW-r4-04 | FIX per R5-02, amended (P4, with P6) | FIXED | §4.4 S5a *Trace* (2) l. 5856–5858; S5b l. 5911, 5917–5918 |
| VM-R4T-03 | FIX per R5-02, amended (P8) | FIXED as ruled — but see VPC-R5-01 | §4.8's lead l. 7610–7616 |
| VM-R4T-06, VV12-r4-03 | FIX per R5-02 (P1) | FIXED | §4.3 *Lattice and costs* l. 5643–5654 |
| VRC4T-09 (+ VAL-R4-08) | FIX | FIXED, both sites | `CrisisLookRow.lookLevel` l. 15330; §10.2 (d) l. 15703 |
| VAL-R4-06 | FIX | FIXED (content as written; the gloss in parentheses) — agrees with §8.4 l. 13631 and §9.2 l. 14849 | II.7.3 l. 21366 |
| VAL-R4-10 | FIX | FIXED; assemble-r5 §8 counts 0 review ids in design text | §4.7 l. 6803–6804 |

The four END lines under pipeline are written verbatim: P1 (§4.3), P2 (§4.3 *The slot* l. 5721–5722), P3 (§4.1's S7 row
l. 4952), P5 (§4.4 *Outer moats* l. 5899–5903), P6 (S5b), P7 (§4.5's casters l. 6150), P8 (§4.8's lead), P9 (§4.8
*Gates* l. 7655–7659 and the paragraph l. 7668–7675), P10 (§4.11's carve l. 8239–8243), P12 (§4.13 l. 9015, 9017). The
seat's own sweep (§4.1's S5 row, §4.3 *Where it may not go* l. 5751–5753, §4.4 S5c's legality, §4.11 *The rung at an
epoch* l. 8522–8523) agrees with §2.7's support step (3), (6) and (7). Every support-step citation in scope (21) names the
sub-item of the new (6) that states what it is cited for ((a) a way, (b) a channel, (d) a later wall stretch, (3) a
crossing station, (7) the frame growth). No superseded word survives in scope ("once more", "last run", "re-site" of a
station, "(iii)", "through one of its stations", "station on the deck", "before the span rule", a locked or pinned
exception). The repair's hand-off 1 is settled by §7.1 l. 10441–10443 (a hand raised road comes down before a wall, so
only an aqueduct is created across one by hand: §4.8's list is whole); hand-off 2 (an S5b radial crossing its own
boundary on a deck pins no gate, so the stage may have fewer gates than `N_k`) is an outcome the text defines (S5a
*Trace* (2), §4.8 *Gates*, §5.3's ≥-crossings invariant) and is a design question, not a defect (feature freeze).

## Part 3 — round-5 blocks in scope: new problems

(pending)

## Issues (round 5)

(pending)
