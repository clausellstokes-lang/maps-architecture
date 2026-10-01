# Verify — pipeline (base §4, §10, PART II, PART III) after repair round 4

> Lane `coherence/verify-pipeline-r4t` · opus verifier · 2026-10-01 · live base `docs/ARCHITECTURE.md` sha256 `5f34cceb…`
> (assemble-r4's output; HEAD `b4a2bfc`), volumes at assemble-r4's hashes. Design files untouched.

PROGRESS
- P0 brief read whole (incl. ROUND-4 NOTES, NEW OWNER RULES 114–116, ORCHESTRATION NOTES); resume check (no output, no LANDED): done
- P1 inputs: round-3 findings (verify-pipeline-r3t, 7 issues), adjudication-r4 (R4-01 – R4-16; Part H · pipeline and every END line naming this unit or my round-3 ids), repair-r4-pipeline (7 REPLACE + 1 RATIONALE-A, 5 END lines, its sweep and 3 hand-offs), assemble-r4 (189/189 applied; only pipeline's blocks land in this scope): done
- P2 every round-3 finding re-checked against the live text, with each END line's second end: done — 7 of 7 FIXED
- P3 the pipeline unit's 15 round-4 dispositions and 5 END lines re-checked; every round-4 block in scope word-diffed against assemble-r3's text (scratch `vp4/secs/wd-*.txt`) and read whole subsection by subsection: done
- P4 references, ids, retired terms, review ids and doc_checks on the touched sections: done
- P5 findings, result file, LANDED: done

## Sources

- Live: `docs/ARCHITECTURE.md` `5f34cceb…`; before the round: assemble-r3's text at commit `96bdae2` (`593c657d…`).
- Round 4: `adjudication-r4.md` (R4-01, R4-04, R4-06 – R4-09, R4-13 whole; Part H · pipeline; the END lines under scope,
  model, rendering, V01, V06, V07, V08, V09, V11, V12 that close my round-3 ids or the pipeline unit's), `repair-r4-pipeline.md`,
  `assemble-r4.md`, `work/round4-work/pipeline.json`.
- Round 3: `verify-pipeline-r3t.md`, `results/coherence_verify-pipeline-r3t.json`.
- In scope this round only repair-r4-pipeline's seven REPLACE blocks changed text (§4.1, §4.3, §4.4, §4.8, §4.11, §4.13,
  §10.2); PART II and PART III are byte-identical to assemble-r3's (a range comparison of the two texts confirms it).

## Part 1 — round-3 findings re-checked (7 of 7 FIXED)

| id | owner | disposition (adj-r4) | verdict | evidence (live text) |
|---|---|---|---|---|
| VPC-R3-01 | scope | FIX per R4-08 | FIXED | §13.2 T76-1 (l. 18168–18175): three triggers, the late calamity riding the absorb's first epoch (§4.11 *The clock* (4)), the mid-year, week-52, coarsened catch-up and one-year-late fixtures |
| VPC-R3-02 | pipeline | FIX per R4-04 (d) | FIXED | §10.2 *Crisis looks*' lead l. 15609–15613: before E2 the yield read over `Building.works` and §4.11 *Works* (9), never for a preview; `ruinTone`, the damage and V09's rows read one answer |
| VPC-R3-03 | pipeline | FIX per R4-06 | FIXED, every end | §10.2 (d) l. 15645–15648 (barricade, `beast`'s `stakes`, the quarantine's `cordon`); (f) l. 15708–15710 (the cordon's course); EP-27 l. 8969; §8.2 l. 13116–13119; T-ER-27 l. 14704 (the barrier fixture, the quarantine fixture whose quarter ways enter); T122-6 l. 18603–18605; V12 l. 1208, 2338, 2713, 2879, 3167 |
| VPC-R3-04 | V07 | FIX | FIXED | V07 §5.6 (2) l. 3423–3424: `beyondWalls` and `approachRoads` read `campLand`, the ground and the armies divided as §10.2 (d) states |
| VPC-R3-05 | model | MERGED into VAT3-r3-02 | FIXED | §2.7 l. 2458 "calamityHistory up to and including the present at creation (§4.11 *The clock* (1))"; `ageYears` l. 2450 |
| VPC-R3-06 | pipeline | FIX | FIXED | §4.8 l. 7650 "its own ground gate (§4.4 *Outer moats*) by §4.2 S3 (4)'s gate law" — both homes cited |
| VPC-R3-07 | pipeline | MERGED into VV12-r3-05 | FIXED | §10.2 (d) l. 15664 "(V01 §3.16's `campLand` (2))"; V01 l. 2375 is that clause |

## Part 2 — the pipeline unit's round-4 dispositions re-checked

Every id of Part H · pipeline is closed in the live text as ruled: VAT3-r3-01 (§4.11 *The clock* (4) l. 8441–8451, R4-08's
text; V08 §3.6 (3) l. 1859–1864 and its §3.17 row cite it; T76-1's fixture), VEW-r3-01 (BLOCKER; §4.3 *Lattice and costs*
l. 5623–5634 in R4-09's words with the ramps, stairs and feet, `clearWidthM` and `squareDeg` read from V11 §3.24.2 (V11
W50, l. 3958); §4.4 S5c's legality l. 5931–5935; ends written at V01 §3.17.3 (3) l. 2471–2477, §7.1's
`bend.raised.underSpan` l. 10594, V06 l. 1433 and 2738, V09 l. 2094, T110-2 (5)), VKr3-01 (§4.11 *The rung at an epoch*
l. 8475 and 8485–8487, agreeing with kernel §3.2 (9); rationale J-A81.41 l. 639), VM-R3T-04 (§4.4 *Outer moats* l.
5876–5881, R4-09's stop rung, no walk), VM-R3T-08 (§4.8 *Condition at generation* l. 7623–7625), VM-R3T-10 (§10.2 (g)
"§2.9's *The crisis framing*"), VV12-r3-05 (`approachRoads` reference; `neighbourhoods` in R4-04's words, l. 15688–15694),
VV56-r3-03 (`approachByGate`'s `h` at least 1; (h); EP-27; T-ER-27's END), VV1112-r3-02 (§10.2 (c) l. 15633–15635 in
R4-13's words, agreeing with V01 §3.16 (5) and V12's `crisis.scale`), VPC-R3-02, -03, -06 (Part 1); the MERGED ids
(VAL-R3-07, VAL-R3-08, VPC-R3-07) close with them, VAL-R3-08's model end by §2.6 step 7 (l. 2107). The five END lines under
pipeline are written verbatim: VEL3-r3-01 (§4.11's delta demand), VAL-R3-02 (§4.13's `wall` row), VEW-r3-02 (§4.3 *The slot*
and §4.8's lead), VEW-r3-05 (§4.8 *Gates*' parenthesis — exact for generation: S5a's traces meet only S4's and S5b's
viaducts, the elevated roads and aqueducts committing at S6's end), R4-09's carve sweep (§4.11 l. 8211–8214). The seat's own
sweep additions (§4.1's S7 row, §4.3's generation half, §4.4's epoch case, §4.13's `river, coast, moat` row, §10.2 (f)'s
**stands over**) agree with §2.7's support step (6) and R4-04 (b) except where the two findings below say otherwise.

## Part 3 — round-4 blocks in scope: new problems

Read whole: §4.3, §4.4, §4.8, §10.2 *Crisis looks* and the changed passages of §4.1, §4.11 (the carve, *The clock*, *The
rung at an epoch*) and §4.13 (EP-27, the raised-way column), each against its assemble-r3 text word by word, with the
homes they cite (§2.7's support step and *The clearance*, §3.2 (9), V01 §3.16, V07 §5.6, V08 §3.6 and §3.17, V11 §3.24.2).
Retired terms, deferral wording, review ids (`R1-nn` – `R4-nn`, verifier ids, unit keys as homes) and phone clauses in the 93
changed lines of the unit: none. Ids: none added, removed or colliding in scope. References: assemble-r4's resolver found
none broken (55 885 checked); by hand every new citation resolves, one to the wrong part (VPC-R4-02's). Document checks on
the seven sections: exit 0 — C1 5/0, C2 1/0, C3 93/0, C4 0/0, S1 0/0, S2 272/0 unreviewed — **PROVISIONAL**: the tool warns
the reference corpus is incomplete in this checkout (captures, research/patreon, research/devlogs, research/ftg-docs,
research/external absent).

New findings (fresh ids):

* **VPC-R4-01 (major, EDGE-UNDEFINED; model).** The support step's last run at generation (§2.7 (6) (a), l. 2586–2591)
  treats S5b's and S5c's ways as obstacles, and "a station this run can neither slide nor omit within `maxClearSpanM` and
  `maxPierM` keeps the place the earlier run gave it, and the S7 part it meets gives way" — no outcome for an S5b or S5c way
  it meets. §4.3's new generation half (l. 5629–5632) lets a later stage's way cross an unlocked raised way's strip anywhere
  its soffit meets *The clearance* — keeping off only ramps, stairs and feet, not the earlier run's pier rings — and states
  that the last run "slides the supports off it", unconditionally; §4.8's lead (l. 7590–7593) and §4.1's S7 row (l. 4932)
  name only the S7 part. So a stage's S5c street or S5b road under an S4 or S5b viaduct, where the pier can be neither slid
  (both neighbouring spans ≤ 1.5 × the band's top: 12 m timber) nor omitted (merged clear span ≤ 20 m timber, 30 m masonry,
  V11 §3.24.2) — a wide corridor under a timber viaduct, or two ways close together — leaves the pier in the way's corridor
  or bends the way, as two builders choose. The bar does not catch it: T110-2 (3) (l. 18412–18413) counts no pier in a way
  corridor, and its clause (5) covers epochs only. repair-r4-pipeline's hand-off 1 names this gap for this round.
* **VPC-R4-02 (major, CONFLICT; pipeline).** §4.11 *The clock* (4) (l. 8447–8451): a calamity carried late rides the
  absorb's first epoch, "with none, the port folds one at the absorb's week for it", and "with the absorb's week itself
  before the last epoch's (V08 §3.6's degenerate row) it folds no epoch". V08 §3.6 (3) (l. 1862–1863), its §3.17 row (l.
  2674) and T-V8-49 (g) make the no-epoch case "`W₁` not after `W₀` (a clock turned back, or no week past the last
  epoch's)". At an absorb in the week of the last epoch — a second sync in the week the first one folded an epoch (a
  population move folds one at `W₁`), carrying a calamity dated earlier — the base folds an epoch at `W₀` on top of the last
  one, `years` 0, its event at `W₀` + 1 outside that epoch's span (`EpochInputs.events[].week` in (the previous epoch's week,
  week], l. 8325); V08 folds none and applies it finished. Two units, two outcomes (R3-03 (b)), the base's impossible. The
  citation "V08 §3.6's degenerate row" also names a row of V08 §3.17's edge table.
* **VPC-R4-03 (minor, WIRING; determinism).** Round 4 adds the warning `W_RAISED_CROSSING`, reported by S5a's carve (§4.4
  *Outer moats*, l. 5878) and by the last support run after S7 (§2.7 (6) (a); §4.8's lead "reported"). §5.4's
  `stages[].warnings` comment (l. 9253), the list of a stage's own non-kernel warning codes, names S3's `W_WALLED_BY_BARRIERS`
  and `W_MOAT_DRY`, S10b's `W_DOSSIER_EDGE` and the underground's, not this one — a list omitting a code its own rule
  reports (R3-03's minor class).

## Issues (round 4)

| id | severity | kind | owner | claim (short) | required change |
|---|---|---|---|---|---|
| VPC-R4-01 | major | EDGE-UNDEFINED | model | the last support run names no outcome for a kept station in an S5b or S5c way's corridor; §4.3 says the run always slides it off | §2.7's support step (6) (a), after "… a quay, pier, mole or castle path ending at the ring and resuming beyond it —": add "and an S5b or S5c way whose corridor it stands in is bent in that batch round its ring to cross under the nearest span beside it whose clear width holds the way's width + `raisedWays.structure.clearWidthM` (§4.3), else ended at the under-deck strip as at a reservation (§4.4 S5c's legality), an arterial so ended re-routed by F-ROUTE's ladder (§5.2) —" (the adjudicator may rule another last rung, provided no pier stands in a way's corridor, no span or pier passes its bound and the raised way stands). END at pipeline: §4.3 l. 5631–5632 "and the support step's last run (*The slot*, below) slides the supports off it ((6) (a))" reads "and the support step's last run (*The slot*, below) slides or omits the supports off it, a way meeting one it can do neither for giving way round its ring ((6) (a))"; §4.8's lead l. 7592 and §4.1's S7 row l. 4932 read "the S7 part, or the S5b or S5c way, it meets". END at scope: T110-2 (3) l. 18412–18413 adds "or an S5b or S5c way's corridor" to its 0-pier list, with a CITY fixture whose S4 timber viaduct is crossed by a `through` S5b road and an S5c street at stations no slide or omission clears |
| VPC-R4-02 | major | CONFLICT | pipeline | §4.11 *The clock* (4): "before the last epoch's" against V08's "not after"; at an equal week the base folds an epoch whose event lies outside its span | §4.11 *The clock* (4) l. 8450–8451: "with the absorb's week itself before the last epoch's (V08 §3.6's degenerate row) it folds no epoch" reads "with the absorb's week itself not after the last epoch's (a clock turned back, or no week past it; V08 §3.17's row for V08 §3.6) it folds no epoch"; END at scope: T76-1's late-calamity fixture (l. 18174–18175) adds "and one carried by an absorb at the last epoch's own week — no epoch, its dated changes applied finished, noted" |
| VPC-R4-03 | minor | WIRING | determinism | `W_RAISED_CROSSING` (new this round) is not among §5.4's stage warning codes | §5.4 l. 9253, the `warnings` comment: after "S10b's `W_DOSSIER_EDGE` (§4.7 S10b)" add ", S5a's and S7's `W_RAISED_CROSSING` (§2.7's support step (6); §4.4 *Outer moats*; §4.8)" |

Totals: 3 issues — 0 blocker, 2 major (model 1, pipeline 1), 1 minor (determinism 1). Round-3 findings: 7 of 7 FIXED, every
END line's second end written; the pipeline unit's 15 dispositions and 5 END lines closed. Nothing NUANCE-LOST: the unit grew,
no elegance ruling or cut touched it, and every replaced sentence's facts are kept (the carve's "(item 244)" citation gives
way to the two halves of the support step (6) that now carry that item's rule).

## Size

The unit (base §4, §10, PART II, PART III): 114 795 words before round 4 → 115 854 after (+1 059, +0.9 %), all ruled content
(R4-09's crossing rule and its generation half, S5a's stop rung and epoch case, the support step's last run at §4.1, §4.3
and §4.8; R4-08's late calamity; R4-04's look units and **stands over**; R4-06's barriers and the cordon's course; R4-13's
count; VKr3-01's raised parts at a frame growth). Against the pre-coherence archive (85 919 words) the unit is +34.8 %: the
owner's file g items 102–126 (new design at build depth) arrived after the archive, so the shrink band is not measurable on
this unit alone; nothing here shrank by more than half, so no nuance audit was triggered.
