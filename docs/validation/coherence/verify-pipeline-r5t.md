# Verify — pipeline (base §4, §10, PART II, PART III) after repair round 5

> Lane `coherence/verify-pipeline-r5t` · opus verifier · 2026-10-01 · live base `docs/ARCHITECTURE.md` sha256 `2d84eac2…`
> (assemble-r5's output). Design files untouched.

PROGRESS
- P0 brief read whole (incl. ROUND-5 NOTES, NEW OWNER RULES 114–116, ORCHESTRATION NOTES); resume check (no output, no LANDED): done
- P1 inputs: round-4 findings (verify-pipeline-r4t, 3 issues), adjudication-r5 (R5-01 – R5-10; R5-02 and R5-03 whole; Part H · pipeline and every END line naming this unit or my round-4 ids), `work/round5-work/pipeline.json` (11 issues), repair-r5-pipeline (10 REPLACE, 25 edits, its sweep and 2 hand-offs), assemble-r5 (pipeline 10/10 applied; base `5f34cceb…` → `2d84eac2…`): done
- P2 every round-4 finding re-checked against the live text, with each END line's second end: done — 3 of 3 FIXED
- P3 the pipeline unit's 11 round-5 dispositions and 4 END lines (P1 – P12) re-checked; the 25 in-scope hunks word-diffed against assemble-r4's text (commit `3310b538`) and read in their subsections with the homes they cite: done — 2 new problems
- P4 references, ids, retired terms, review ids, phone clauses and doc_checks on the touched sections: done
- P5 findings, result file (`results/coherence_verify-pipeline-r5t.json`), LANDED: done

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

Read in their subsections, each against assemble-r4's text and the homes they cite (§2.7's support step (3), (6) (a)–(d),
(7), *The clearance* and the span rule; §4.6's under-deck strip; §4.7 S10's step (0); §4.8 *Wall strips*; §7.1's raised and
wall rows; §7.7's binding; V06 §3.7.6 (5); V08 §3.6 (3)–(4); J-V8.54): §4.1's S5 and S7 rows; §4.3 *Lattice and costs*,
*The slot*, *Where it may not go*; §4.4 S5a whole (*Boundary*, *Trace* (1)–(3), *Water and the waterfront*, *Outer
moats*), S5b and S5c's legality; §4.5's casters; §4.7's class-floor heading; §4.8's lead, *Wall strips*, *Condition at
generation*, *Gates*; §4.11's `wallToWay`, the carve, *The clock* (1)–(5), *The rung at an epoch*; §4.13's raised-way
column; §10.2's `CrisisLookRow` and (d)–(f); II.7.3 *Order, seed and locality*.

Agreeing and closed: the stage order (a stage k ≥ 2 lays its trace right after its own S5b, §4.4 l. 5803–5804, 5829–5830,
so T110-2 (2)'s "stage-2 S5b viaduct crossed by stage 2's own moated ring" is later work as R5-02 rules); the span rule's
one eager run after §4.6's cut against S5a's, S5c's and S7's crossings before it (§4.3 P1, §4.4 S5c, P5); S5b's count and
§4.8's gate count on ground part 0 with §5.3's row (D4); R5-03's clock against V08 §3.6 (3)–(4), §3.17 and §7.7 (a held
calamity keeps its carried fact, J-V8.54, so a later absorb cannot leave its key without a fact). Retired terms (the
canon's 35 patterns), deferral wording, review ids, canon conflict ids, verifier ids and phone clauses in the 80 changed
lines of the unit: none (the one "later" hit is "a later absorb", a defined event). Ids: none added, removed or colliding
in scope. References: assemble-r5's resolver found none broken (56 169 checked); by hand every new citation in scope
resolves to text that says what it is cited for (V07 §3.5a (3)'s tracker turn, V08 §4.6's `late` variant, §7.1's
`bend.raised.underSpan` and `bend.raised.around` row, §8.2's `ruinTone`, §8.4 and §9.2's working layer, §10.2 (f)'s
**stands over**). No stale crossing-station or last-run wording in the base, the rationale or any volume. Document checks
on the ten sections (`--sections 4.1,4.3,4.4,4.5,4.7,4.8,4.11,4.13,10.2,II.7.3`, the shared allow file): exit 0 — C1 5/0,
C2 1/0, C3 169/0, C4 1/0, S1 0/0, S2 287/0 unreviewed (before the round: the same, S2 272/0) — **PROVISIONAL**: the tool
warns the reference corpus is incomplete in this checkout (captures, research/patreon, research/devlogs, research/ftg-docs,
research/external absent).

New findings (fresh ids):

* **VPC-R5-01 (major, CONFLICT; pipeline).** R5-02's P8 at §4.8's lead (l. 7610–7612) reads "the strips S7 cuts beside
  that trace stop at its under-deck strip's edges, their setback, glacis and berm closed along them"; P3 at §4.1's S7 row
  (l. 4952) "its strips stopped at the under-deck strip"; P12 at §4.13's `wall` cell (l. 9017) "runs on beneath its deck
  … its strips stopped at the under-deck strip". A wall strip is the band's half plus the setback inside, or the setback
  and glacis (or the berm) outside (§4.8 *Wall strips* l. 7618–7625; §2.7 (3)'s obstacle "its band's half, setback and
  glacis"), and S10's step (0) builds the enceinte's half-band only inside the strip blocks S7 cuts, `Enceinte.band` being
  their union (§4.7 l. 6785–6796). So, as written, no band is built beneath the deck: the curtain is open under every
  raised way a later wall meets. The canonical home, §2.7's support step (6) (d) (l. 2603–2616), stops only "the
  stretch's setback, glacis and berm" there and runs the wall on beneath the deck — each support, ramp, stair, foot or
  `vault` span in its band taken into the line, beneath every other span "an ordinary run whose top is no higher than
  that span's soffit", read by §4.5's casters, §8.4's casters and heightfield and §11.1's glTF wall — and T110-2's lead
  and (4) bar that run. Two builders of S7: one cuts no strip under the deck (no band, the curtain breached), the other
  builds the band there. The same sentence of §4.8's lead also omits (6) (d)'s tower rule (no tower in the under-deck
  strip, one moved along the trace clear of it), which S7's tower spacing must apply, and §4.1's row names only the
  supports where §4.8 names supports, ramps, stairs and feet and adds breakwaters. The same loose wording stands at §7.3's
  S7 row (l. 10883, determinism) and V06's W68 (l. 351) and §3.7.1 (l. 1462–1463).
* **VPC-R5-02 (major, EDGE-UNDEFINED; pipeline).** §4.11's `wallToWay` (l. 8214–8221) retypes the wall chain as the ring
  road's spine "on the same edges", excepting only "the stretch held under a raised way's crossing station while its deck
  stands …, which stays as a free-standing gate tower or arch carrying the deck, the new ring road taking no junction with
  the raised way" (VDC4-05's text, this round). Two meetings with a standing raised way have no outcome for the road: (1)
  that kept stretch stands on the old wall's line, so the road's spine on the same edges runs into the free-standing gate
  tower or the curtain under the arch (a raised gate's portal is on the raised part only, §4.8 l. 7672–7673); (2) since
  R5-02, a wall stretch laid after a raised way runs on beneath its deck with each support, ramp, stair, foot or `vault`
  span in its band taken into its line and no crossing station (§2.7 (6) (d)), so the save clause does not reach it and
  the road's spine passes through those parts — a support standing in a road, or a road through an arch vault's chamber
  (II.7.6). §2.7 (6) (a) makes every part-0 way laid after a raised way cross its under-deck strip only by §4.3's crossing
  rule, else end at the strip, but `wallToWay` neither cites nor applies it, nor does V06 §3.7.6 (5)'s bullet ("leave
  standing every raised way that crosses the old line; the new ring road takes no junction with it"). The path is an
  ordinary one at growing CITY and METROPOLIS epochs (a superseded ring's `road` end, V06 §3.7.2 (3); case (1) is
  H-AQUA's own CITY ring under its founded aqueduct, case (2) T110-2's lead fixture once its stage-2 ring is superseded).
  Two builders: the road through the supports or the kept stretch, or the road re-routed or ended at the strip. Untested:
  T-V6-47's `wallToWay` clause checks only that the raised way and its station stand.

## Issues (round 5)

| id | severity | kind | owner | claim (short) | required change |
|---|---|---|---|---|---|
| VPC-R5-01 | major | CONFLICT | pipeline | §4.8's lead, §4.1's S7 row and §4.13's `wall` cell stop the whole wall strips (the band's halves with them) at the under-deck strip, so S10's step (0) builds no band beneath the deck; §2.7 (6) (d) stops only the setback, glacis and berm and runs the wall on beneath it | §4.8's lead l. 7611–7612: "the strips S7 cuts beside that trace stop at its under-deck strip's edges, their setback, glacis and berm closed along them, reported (`W_RAISED_CROSSING`);" → "the strips S7 cuts beside that trace run on beneath its deck as the band's halves only — their setback, glacis and berm stopped at its under-deck strip's edges and closed along them, reported (`W_RAISED_CROSSING`), S10's step (0) building the band there as §2.7's support step (6) (d) lays the run — and no tower stands in the under-deck strip, one the spacing would place there moving along the trace to the nearest point clear of it;". §4.1's S7 row l. 4952: "its strips stopped at the under-deck strip, a gate plaza cut round the raised way's supports and no pier or mole rooted on them" → "its strips' setback, glacis and berm stopped at the under-deck strip (the band running on beneath the deck), a gate plaza cut round the raised way's supports, ramps, stairs and feet and no pier, mole or breakwater rooted on them". §4.13's `wall` cell l. 9017: "its strips stopped at the under-deck strip" → "its setback, glacis and berm stopped at the under-deck strip". END at determinism: §7.3's S7 row l. 10883 "and its strips stopped at the under-deck strip's edges" → "and its setback, glacis and berm stopped at the under-deck strip's edges". END at V06: W68 l. 351 "its strips stopped at the under-deck strip's edges" → "its setback, glacis and berm stopped at the under-deck strip's edges"; §3.7.1 l. 1462–1463 "its strips stopping there" → "its setback, glacis and berm stopping there" |
| VPC-R5-02 | major | EDGE-UNDEFINED | pipeline | `wallToWay` lays the ring road on the old wall's edges with no outcome where they meet a standing raised way: the kept crossing-station stretch stands on that line, and a run laid after the raised way has its supports, ramps, stairs, feet and `vault` spans taken into it (§2.7 (6) (d)); §2.7 (6) (a)'s crossing rule is not applied; untested | §4.11 `wallToWay` l. 8221, after "(§2.7's support step (3); V06 §3.7.6 (5) gives its form).": add "Where the old line meets a standing raised way — at that kept stretch, or where a run laid after the raised way ran on beneath its deck (§2.7's support step (6) (d)) — the ring road is a part-0 way laid after the raised way (§2.7's support step (6) (a)): in the dry run its spine there is re-routed by §7.3's S4 local operator, between its nearest nodes on either side of the under-deck strip, to cross under the nearest span §4.3's crossing rule admits, else it ends at the strip's edges as at a reservation, reported; the kept stretch and every part of the raised way the old run took into its line stand untouched." END at V06: §3.7.6 (5)'s bullet "the new ring road takes **no junction** with it" adds "and crosses its under-deck strip as a way laid after it (§4.11's `wallToWay`)"; T-V6-47's `wallToWay` clause adds "the ring road crossing the aqueduct's under-deck strip under a span §4.3 admits, clear of the kept stretch, else ended at the strip; and, on a fixture this test names, `wallToWay` of a ring laid after a standing viaduct with a support in its band — 0 way corridors over a support ring, ramp, stair, foot or `vault` span" |

Totals: 2 issues — 0 blocker, 2 major (pipeline 2), 0 minor. Round-4 findings: 3 of 3 FIXED, every END line's second end
written; the pipeline unit's 11 dispositions and 4 END lines (P1 – P12) closed. Nothing NUANCE-LOST: the unit grew, no
elegance ruling or shrink cut touched it, and every sentence the round replaced is R5-02's or R5-03's ruled supersession
(principle (3) (b)) with its equivalence list's pipeline items in place (the give-way rungs → §4.3's crossing rule at
§4.8's lead; the ring's gate on a raised arterial → none, S5a *Trace* (2) and S5b's count; S5b and S5c ways → §4.3 P1;
the palisade's clause → §4.13's `wall` cell; the lock clause → held from creation). Both findings are new problems of
the round's own text (P8, P3, P12; VDC4-05's clause meeting R5-02's (6) (d)).

## Size

The unit (base §4, §10, PART II, PART III): 115 854 words before round 5 → 116 351 after (+497, +0.4 %), all ruled content
(R5-02's held raised way and the wall that runs on beneath it at P1 – P12; R5-03's late change; VDC4-05's kept stretch;
the narration "DXC-06, KXC-02" removed). Against the pre-coherence archive (85 919 words) the unit is +35.4 %: the owner's
file g items 102–126 (new design at build depth) arrived after the archive, so the shrink band is not measurable on this
unit alone; nothing here shrank by more than half, so no nuance audit was triggered.
