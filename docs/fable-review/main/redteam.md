# Fable review — lane fable-review/main/redteam (2026-09-27)

Reviewer: Fable 5.1 — the Fable touch the seven red-team rows waited for. Rows: A-redteam:geometry, A-redteam:mfcg,
A-redteam:lifecycle, A-redteam:ftg, A-redteam:scale, A-redteam:visual, A-redteam:improve (every PENDING row of
docs/FABLE-REVIEW-QUEUE.md whose id matches `A-redteam:`; grep run at the start, seven matches). The lens files are the
stand-in red team's findings against the PRE-FIX design (2026-09-25 15:xx); the CURRENT design is docs/ARCHITECTURE.md
at sha256 1c23190f… (13 026 lines, after the hand-fix close of 2026-09-27 21:45) with docs/ARCHITECTURE-RATIONALE.md at
0be40dfd… (2 053 lines). Each row is judged as the Fable red-teamer would: (a) were the severities right; (b) was
anything ruled INVALID that is real; (c) what the lens MISSED against the current consolidated design — a real missed
problem is fixed here by a block in docs/fable-review/main/blocks-redteam.md (BLOCK PROTOCOL), with a J-ROWS line and
a RATIONALE-A entry per ruling; (d) a verdict per row. The fix-round dispositions of the findings are read from
docs/ARCHITECTURE-VALIDATION.md (§R1–§R5) and re-checked against the live text at the cited sections.

Standalone and clean-room rules kept: nothing outside /Users/cstokes/Desktop/Maps was opened; no captured bundle was
opened (this seat is not the code-readings seat). Scratch: /private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/fable-review/
(val-rows.txt: the validation record's rows for every red-team id; per-lens extracts and re-derivation scripts named in
each row's section). Queue statuses and the `> PENDING FABLE REVIEW` marker lines are the reconciler's to change.

## PROGRESS ledger (one line per row)

| row | state |
|---|---|
| A-redteam:geometry | done |
| A-redteam:mfcg | done |
| A-redteam:lifecycle | done |
| A-redteam:ftg | planned |
| A-redteam:scale | planned |
| A-redteam:visual | planned |
| A-redteam:improve | planned |

**Checkpoint (2026-09-27, about 400k tokens of context):** rows geometry, mfcg and lifecycle are done below; the first unreviewed row is **A-redteam:ftg**, then scale, visual, improve. The continuation seat starts there and extends the Design impacts and CONFIRMED-versus-PLAUSIBLE sections at the end of this file; further blocks go below B-1 in docs/fable-review/main/blocks-redteam.md with their own J-ROWS and RATIONALE-A blocks.

## Verdict table

| row | verdict | one-line reason | corrections made |
|---|---|---|---|
| A-redteam:geometry | CORRECTED | All 42 findings stand and every one is FIXED in the live text at the sections the record names (re-checked by grep and by reading §2.2, §3.3, §3.6, §3.10, §4.6, §4.8 whole); the two blockers were rightly blockers (GEO-1's repair changed the level model — J-K1; GEO-2 contradicted the cross-cutting determinism guarantee and its repair touched eleven sections and D-27); the S8/S10/S11 majors are rightly majors; nothing was ruled INVALID; the six executed numbers re-derive to the decimal. One miss against the current text: §4.6 step 8 (c), "the always-succeeding cut", is refused by §3.6's contact rule when its interior passes within `attractCm` of a shallow reflex vertex or an antenna, and rung (d)'s "cut by (c) again" repeats the identical cut, so the ladder can end in F-WORK with the face uncut. | block B-1 (APPEND TO §4.6: rung (c) slides its foot along the run until the contact rule passes; J-Fredteam-1) |
| A-redteam:mfcg | CORRECTED | All 12 findings stand and every one is FIXED at the sections the record names (re-checked in §1.2, §1.4, §4.4, §4.8, §8.5, §12.2–§12.3, §13.5); MFP-1 was rightly a blocker (its repair set the city-band figure-ground contract AND redefined the one-click first paint as the complete city band, a cross-cutting change); MFP-2 and MFP-6 pushed the defaults toward MFCG's measured behaviour, which the owner's later item 23 (emulation-first) makes the rule, not a tiebreaker violation; nothing was ruled INVALID; the quarter law re-derives against the size sweep. Corrected: MFP-5's premise "MFCG size 80 is 13 349–36 480 buildings" conflated profile counts from option sets (shanty on, river and coast) with the plain size — the sweep gives 5 242 at size 80 (1 475 / 13 091 at 40 / 130) — so the finding's direction (a mis-anchored bar) was right and its 4–7× magnitude wrong; the design already records this (§12.2) and declares 1.8× at TOWN. | review section appended to docs/validation/redteam-mfcg.md; no block |
| A-redteam:lifecycle | CONFIRMED | All 31 findings stand and every one is FIXED at its home (re-checked: §2.9's document and load steps, §6.3's succession table, §7.4's rebase and undo rows, §5.3's dossier row; three fixes present under renamed terms — the `preview` flag, `SliceRef`, the records digest); LC-1 and LC-2 were rightly blockers (the id model and the stage decomposition changed: `kind:token` addresses over lineage keys with anchor succession; the laziness contract with the eager S7b / S10a allocation before the pooled stages); the replay cluster's one ordered fold with epochs as events and the `rebase` event is the right single decision and is carried in depth; nothing was ruled INVALID; the two lifecycle paths a Fable lens adds — a kept-snapshot rebase against the dossier's existence guarantee, and an epoch carrying dossier events against undo — check sound (batch-local existence invariant; J-A22.76 is item 20 (c)'s consequence). | none; one design impact for pass c (item 20 (h) (v)'s binding table through §2.9, §7.5, the `frozenImport` decode and clone) |

---

## A-redteam:geometry — GEOMETRY ROBUSTNESS (docs/validation/redteam-geometry.md, 1 174 lines, read whole)

**Scope as found.** 42 findings (2 blocker, 28 major, 12 minor) against the pre-fix design (2 200 lines). The fix rounds
dispositioned every one FIXED (docs/ARCHITECTURE-VALIDATION.md §R1.1 rows 113–137, 181–198, 309–312, 373; restated in
§R2–§R5 for GEO-3, GEO-5, GEO-35), none INVALID, none STAGED. The lens's own out-of-scope rulings are its §4 keep-list
("per-layer plats … no problem", S2/S3 "compute no plat geometry", S6 "merges membership, not geometry") and its
deferrals paragraph (only GEO-9 touched a listed deferral, and rightly argued the deferral did not cover a runtime
fallback).

**(a) Severities.** Right, including the three the queue asked about.
1. *GEO-1 as a blocker.* The lens's criterion was "cannot meet a stated goal AND the repair changes the core structure".
   Both held: the exact nesting invariant (hard, abort, 0 per 1 000 cities) failed on essentially every batch under five
   separate DCELs, and the repair was the level model itself — J-K1's one arena per layer with the five levels as views
   (§2.2 rule 2), `splitThrough`'s Steiner vertices (rule 3) and the level-n route. A tolerance-based nesting check (the
   queue's alternative) was the option J-K1 rejected, correctly: it would have given up J-6's "containment proofs are
   trivial" and re-imported the epsilon geometry the kernel was chosen to remove. The blocker stands.
2. *GEO-2 as a blocker.* Not "one line to delete": F-BUDGET-TIME's "coarser parameters" rung, the kernel's `E_TIMEOUT`
   and F-SKELETON's timeout detection all changed the model with the clock; the repair reaches §5.1 (5), §5.2 (F-WORK,
   F-BUDGET-TIME as reporting only), §5.4, §6.2, §6.5, §7.8, §3.1 (`E_WORK_LIMIT`), §4.1, §12, §13.2, §14 and D-27
   (work limits). The live text carries it (§3.3 "Work limits instead of clocks"; §5.2 row F-BUDGET-TIME "never a model
   change"; §6.2 "no wall clock"). A contradiction of the design's first guarantee is a blocker by the lens's rule.
3. *The S8/S10/S11 cluster (GEO-20–GEO-26).* Majors, rightly: each is one stage's primitive or interface (one kerb
   function, cut ends to the spine, sides as runs, the reflex pre-cut, per-frontage regions, lanes decided in S8, row
   footprints by clipping). The bent cut being M0's riskiest item is a schedule fact, not a severity criterion; none of
   the seven contradicts a cross-cutting guarantee. J-P13, J-P14, J-P15, J-P16 and J-P32 carry the repairs.

**(b) INVALID rulings.** None was made, so nothing real was dismissed. I also checked the lens's four "keep" claims
against the live text: per-layer plats are now per-arena isolation with a debug-build stamp check (§3.10 "arena
isolation"); S3 gained the basin, moat and canal reservations GEO-19 asked for (§4.2 heading, §4.8 "Harbour"); S6's
no-hole rule survives (§4.5); S12's strips inherit GEO-35's one `minEdge` (§3.10 row 2). All hold.

**(c) What the lens missed against the current design — and what I checked and found sound.**
- *Checked sound — the pool scope at the wall.* A Fable geometry lens would probe whether a pooled plot line ending on
  a wall strip's setback or glacis line (an L1 edge) can be an `E_SCOPE` write: §3.3 pool step 3 admits a split on the
  set's boundary only where "no overlay writes" the other side, while S12b (pooled) plants the setback and glacis residue.
  It is sound because §4.8 makes S7 cut **two** strips and "strip faces inherit their district from the faces they were
  cut from": the inner setback line has the intramural district on both sides, the glacis line the extramural district
  on both, and the wall chain the two strips share is banded eagerly on both sides at once by S10's step (0) before the
  freeze (§3.3 pool step 1; J-I9, J-P29). No two overlays write one edge.
- *Checked sound — iterated snap rounding versus clearance.* §3.6 step 4 commits an unconverged third pass with
  `W_SNAP_PASSES`; the clearance invariant (§3.10) still holds because the placement rule's (iii) tests the re-routed
  segments against every vertex and falls back to the edge's endpoint ("the loop ends within the work limit").
- *Checked sound — the exact `area2`.* J-K13's magnitude-triggered flush at 2⁵² (each bbox-relative term < 2⁴⁹) keeps
  the sum exact for any vertex count; GEO-32's two bounds re-derive (10 984 and 64).
- **MISSED — a real gap, fixed by block B-1 (minor).** §4.6 step 8 rung (c) is "the always-succeeding cut — a straight
  cut perpendicular to the longest run through its midpoint, clipped to F's own component by boolean intersection (a
  clipped line cannot make four crossings)", and rung (d) adds "a larger face reaching (d) is cut by (c) again". The
  clipping answers the four-crossing failure only. §3.6's contact rule 2 refuses a cut "passing through or within
  `attractCm` of a boundary vertex, grazing a reflex vertex" or touching an antenna; the reflex pre-cut removes only
  reflex vertices deeper than the band's plot depth, so a shallow jog stays, and the midpoint perpendicular passes within
  26 cm of it with probability ≈ 52 cm ÷ the face's width per such vertex (≈ 1 % at 50 m). When it does, (c) fails,
  (d) repeats the identical cut, and the ladder ends in F-WORK with the face uncut — bounded and reported (the residue
  share), so not silent, but contradicting "always-succeeding". The fix costs a sentence: (c) slides its foot along the
  run in steps of 2 · `attractCm`, alternating sides of the midpoint, until the contact rule passes — at most 2k
  candidates fail for k shallow reflex vertices, and a run of a block-band width (≥ 12 m) holds hundreds — so rung (c)
  is always-succeeding in fact and rung (d)'s "(c) again" is the same slide. Written as APPEND TO SECTION §4.6 (the
  rule's home; pass c's items 33–41 will restate the steps and can fold the sentence in), with J-Fredteam-1 and its Part A
  entry. Disposition: FIXED (block B-1).
- *Considered, not a finding.* Warp's eight deterministic halvings; the `split`-flag rules under moves; the
  `RoleHeadTable` layout never reaching an output (lookups only); `orient2d`'s 2⁴⁹ bound; the transient arena's seed
  tiling checked by `area2` at `readBack`. Each holds as written.

**Re-derived (CONFIRMED, my script `geo_rederive.py` → `geo_rederive.out` in the scratch directory, 2026-09-27):**
GEO-1's lattice arithmetic (gcd = 1 share 0.608 against the lens's 0.610; snapped foot off the edge 0.9978 against
0.9977; offset p50 0.23 / p90 0.46 / max 0.70 cm, identical; re-routing triangle > 1 cm² 0.996, identical); GEO-3's dead
band (Chaikin ×2 segment p50 7.85 m against 7.9; P(endpoint in the 5–25 cm band) 0.056 against 0.052; per two-ended
cut 0.109 against 0.101 — the same order, the difference being my heading-noise model); GEO-8's Pitot share (0.333
against 0.334; |a + c − b − d| p90 1.41 cm against 1.4); GEO-32's bounds (10 984 vertices; 64); GEO-15's 327.67 m;
GEO-12's 2⁻²⁴. Every design-deciding number of this lens reproduces. **Accepted on quoted evidence (PLAUSIBLE here):**
the reference facts quoted from the critic and findings files (MFCG 87882877 / 98918904 / 61026228, FTG 133016301 /
153121107 / 157283634, NG's 361 / 361 junctions), which this seat did not re-open; the kernel bench figures the live text
cites (`docs/validation/bench/fixall_kernel_r2_attract.out`, `_r3_checks.out`, `_r4_checks.out`, `_r5_checks.out`,
`bench_index.out`) — the files exist on disk (listed below) and their numbers are the fix rounds' executions, not this
lens's claims.

**Verdict: CORRECTED** — the row stands as written; one block corrects the current text (B-1).

---

## A-redteam:mfcg — MFCG-CLASS PARITY WITHIN THE FUSED BASE (docs/validation/redteam-mfcg.md, 480 lines, read whole)

**Scope as found.** 12 findings (1 blocker, 6 major, 5 minor), all FIXED in round 1 (docs/ARCHITECTURE-VALIDATION.md §R1.1
rows 168, 208–215, 340–341, 378), none INVALID. The lens's own out-of-scope rulings are its "deliberately not re-raised"
list (twelve items carried by coverage rows or GEO findings at a severity it accepts) and its §4 keep-list.

**(a) Severities.**
1. *MFP-1 as a blocker.* Right. The plot model's yards (10–20 m paper bands at 3–6 px) against 2–5 m lanes did make the
   `ink` city band unreadable as written, and the repair was not confined to one stage's mechanism: §8.5's figure-ground
   contract (blocks in `ground`, footprints as masses closed across gaps < 1.5 px, streets and squares the only `road`
   voids, the recoverability metric with kerb hairlines as the pre-decided fallback, J-R5) **and** the one-click path's
   definition — the first paint is the complete city band, never an S9 preview (SCL-4, J-R7; §1.2, §8.5 "First paint").
   The lens's option (a) was taken with (b) as fallback; that is the right order, because a ground tone is MFCG's own
   role rule (roads, bridges and squares share one colour) while hairlines would add a mark MFCG never draws.
2. *MFP-2 and MFP-6.* Rightly majors; the fixes moved the defaults toward MFCG — walled regimes grow only
   district-scale secondaries (separation 120 / 160 / 200 m) and every intramural lane comes from the bent cut (§4.4 S5c,
   J-P4); the walled share ≈ 0.88–0.9 per rung from MFCG's measured 0.87–0.92 with shanty off (§4.2 S2, J-P5; §13.5's
   row); the ribbon regime the default extramural fabric, the FTG suburb only by preset, era row or the shanty toggle
   (§4.4's regime table). The queue asked whether this "pushes the fusion back toward MFCG" against the tiebreaker. It
   does not: the owner's item 23 (2026-09-26) rules that every default reproduces what MFCG or FTG does where they have
   the behaviour, and the realism tiebreaker decides MFCG-versus-FTG conflicts toward the constraint-based, historically
   faithful option — a compact walled town with faubourgs along the approach roads is the faithful default for the
   12th–15th-century centre of gravity (D-2); the rows are calibratable, so the corpus phase can move them without code.
3. *MFP-5.* Rightly a major — the CITY bar was anchored on a size with a different building count — but see (c) below:
   its numbers were partly wrong.

**(b) INVALID rulings.** None made. I checked the lens's keep-claims: keyed sub-streams (§6.1), per-area reroll keeping
type and shape (§7.3), the casing law and curved labels as data (§8.2, §9), exact gate counts by construction (§4.8
"Gates — exactly N"), the coast bearing and river-through-the-core siting (§4.2). All present.

**(c) Corrections to the lens, and what a Fable lens would have checked.**
- **CORRECTED — MFP-5's premise.** The finding states "MFCG size 80 is 13 349–36 480 buildings … 7.6–12 µs per building"
  and concludes PLAT is "4–7× slower at equal output". Those counts are the MFCG profile's size-80 runs under option
  sets (shanty towns, river and coast — the lens's own EXP city 777001 has 15 392 buildings *with* shanty and 70 % of
  them extramural), not the plain size. The size sweep (captures/mfcg/exports-sweep-2026-09-25, `stats.json`, read by
  this seat) gives **1 475 buildings and 9 districts at size 40, 5 242 and 12 at size 80, 13 091 at size 130** (411 at
  size 24). J19 and J20 re-anchored the design on those (docs/fable-review/main/manager-corpus.md re-derived them), and
  the live §12.2 says so in as many words: "13 349–36 480 size-80 counts of the MFCG profile belong to such option sets
  and are stress comparisons, not the CITY bar" (line 9536). The finding's direction stands — the pre-fix §12 compared
  CITY with a size of another building count — but the 4–7× magnitude does not; the declared trade is 1.8× model time at
  TOWN (§12.3: 76 / 100 ms against MFCG's 57 ms) with §12.9's reason. Recorded in the review section appended to the lens
  file.
- **Checked sound — the one-click default (§1.2).** An MFCG lens reads it first: features at *auto*, drawn per seed from
  S0's probability table (MFCG's per-seed features); walls on at every rung is R6, an extension the `MFCG` parity preset
  switches off by item 23's mechanism (§7.6); the `ink` style with MFCG's raised under-copy on. Nothing contradicts MFCG's
  defaults; item 54 (pass c) will change the raised under-copy's class dependence — noted below.
- **Checked sound — the quarter law (MFP-10's fix).** §4.5's `N_q = round(1.37 · B^0.267)` "fitted on MFCG's district
  counts on its size sweep": re-derived here, 9.6 at B = 1 475 against the sweep's 9 districts, 13.5 at 5 242 against
  12, 6.8 at 411 against 6, 17.2 at 13 091 — a fit within ± 1.5 quarters at every anchor (`quarter law re-derivation`
  in the scratch output). The 17 districts the lens counted on city 777001 are the shanty-and-sprawl case.
- **Checked sound — §8.5's masses against MFCG's alley texture.** Closing gaps below 1.5 px hides 2–3 m alleys at the
  CITY stop (≈ 3.3 m per px) unless they are access-critical, where MFCG's lots-as-buildings show a hairline texture.
  This is exactly the generalisation MFP-1 (b) asked for ("footprints unioned across gaps ≤ the slot width, minimum
  mapping unit ≥ 2 px"), and the street-edge recoverability metric is measured against MFCG's own renders at M-1 with the
  hairline fallback pre-decided; not a finding.
- *Considered, not a finding.* MFCG's sizes above 130 (the 120 000-population cap with a report, §12.2); the `greens`
  toggle's table mapping and the castle esplanade row (§4.9, line 4897); live-in rows (§4.7 S10b, `Building.dwelling`);
  feature-named kinds (§2.5, §4.5). Each present.

**Re-derived (CONFIRMED, this seat):** the sweep's building and district counts per size and the quarter-law fit
(above); the design's carriage of every MFP fix by grep at the cited lines (walled share §4.2 S2 / §13.5; 4.00 m per unit
§1.4 line 294; the MFCG signature rows §4.4 line 3980; the matched-count speed table §12.2 lines 9519–9521 and §12.3
line 9549; live-in §4.7 line 4497; feature-named §4.5 line 4046; esplanade §4.9 line 4897). **Accepted on quoted
evidence (PLAUSIBLE here):** the lens's five-city EXP measurements (orientation coherence R4 0.84–0.97 / 0.58–0.88 /
0.32–0.68, wall alignment 84–92 % ≤ 15° within 40 m, ribbon shares 71–85 %, castle 2.61–3.36 ha at compactness
0.78–0.82, plaza 3 580–5 373 m²) — the lens states its rules but its scratchpad "is not kept", so they cannot be re-run
byte for byte; the design's baselines now come from the later size sweep (B20, re-derived by the evidence-captures Fable
review: 4.000 m per unit, the walled shares) and agree with the EXP ranges where they overlap; the 4.00 m unit itself
(three files, 3.9998 / 3.9998 / 3.9991) is CONFIRMED by that review, not re-run here.

**Design impacts (pass c, no block from this row):** items 45 (§4.8's castle repair "equalise ≤ 20 iterations, then
bloat in 5 % steps … MFCG's census baseline of 178 equalise passes and 11 bloats" — the target and order will be restated
from the code reading), 46 (§4.2 S3 (4)'s gate law gains its coastal factor), 47 (§4.5's grower rates), 48 (§1.4 and
§13.5's MFCG population figure), 54 (§8.4's raised under-copy as a class-dependent front; §1.2 names it), 71–72 (§4.5's
district mix and naming); each is a current text pass c will change, none contradicts an owner rule today.

**Verdict: CORRECTED** — the row stands; one correction to the lens's record (MFP-5's premise), no block.

---

## A-redteam:lifecycle — DETERMINISM AND STATE LIFECYCLE (docs/validation/redteam-lifecycle.md, 878 lines, read whole)

**Scope as found.** 31 findings (2 blocker, 18 major, 11 minor), all FIXED in round 1 (docs/ARCHITECTURE-VALIDATION.md
§R1.1 rows 139–160, 199–203, 313–315, 374) and restated in later rounds for LC-7 and LC-17 (rows 538, 546); none INVALID.
The lens's three deferral checks (LC-11 the M4 path, LC-15 no `&doc=` without a resolver, LC-31 the bridge's
persistence) argued rightly why the deferrals did not cover them; the design now defers nothing, so the question is
closed.

**(a) Severities.**
1. *LC-1 as a blocker.* Right. The repair changed the id model: §6.3's address id `kind:token`, the token a hash of the
   lineage key, never reused, tombstoned on supersession, separated from the lineage key that keys every stream; survival
   keeps both, succession hands only the address to the anchor-matched successor within the kind's hysteresis radius and
   class family (§6.3's table, plots 0.5 m along the frontage, buildings 0.5 m, rooms 0.5 m in the wing's frame). The
   owner's assignment hook and item 20's `Identity.dossier` (carried by the entity the element is, J-A20.22) stand on
   it. The queue's alternative — hierarchical ids with a re-parenting rule — was rightly rejected: a path-encoded string
   cannot both follow an entity across parents and stay unique under a restarted counter, and keying streams by it turns
   every carried-over entity into a re-roll.
2. *LC-2 as a blocker.* Right. The repair changed the stage decomposition, not a parameter: the laziness contract (§4.1;
   ten mentions in the live text), the eager S7b allocation and S10a block allocation before the pooled S10 / S10b / S11
   / S12b, two declared field passes, and the derived-complete digest checked over random district orders (§13.2, line
   10168). J-12's derivation pool and §12.4's budgets are built on that eager allocation, so "a smaller change" would
   have left the METROPOLIS budget resting on an order-dependent model.
3. *The replay cluster (LC-10, LC-11, LC-13 with GEO-11).* One ordered fold for every event (J-DET-6, amended by
   amendments b for the creation prefix's one declared read-ahead, J-A22.72 / J-A22.74), epochs as `{t: 'epoch'}` events
   whose `seq` survives a rebase (§7.1 `EditBase`), and the `rebase` event (J-DET-7; reasons `keptSnapshot`,
   `drawnConstraintsRebuilt`, `frozenImport`; `keptOldModel` removed by J-DET-51 because keeping the old model at an
   upgrade needs no rebase). The right single decision, and the live text carries it to the depth this lens asked:
   §2.9's load steps and the rebased base's root of record, §7.4's "Rebases" paragraph (undo restores the previous base,
   a whole-town event undoable only as the latest live event, checkpoints before every epoch, rebase and upgrade), §11.3's
   other clients. Every major and minor is at its stated severity.

**(b) INVALID rulings.** None made. I checked the lens's keep-list against the live text: named sub-streams per concern
(§6.1), retries keyed by (entity, attempt) with the user's `reroll` a separate key component (109 mentions), the
recipe-plus-log document with a digest-verified snapshot (§2.9), version axes in the permalink and the preview flag
(§6.4), stage-isolated goldens with cascade records (§6.3, §13.3), anchors and succession (§6.3), the named actions with
dry-run fates (§7.1, §7.3), lazy people from lineage keys (§10.3), headless hash = UI hash (§13.2). All present.

**(c) What a Fable lifecycle lens adds against the current design — checked, and one impact.**
- *Checked sound — a kept-snapshot rebase against the dossier's existence guarantee (item 20 (b)).* The base a
  `keptSnapshot` rebase installs is the saved model that the same fold produced, dossier events included, and §5.3's row
  "every dossier-backed element is live and placed on every map" is **batch-local**, so every batch that built the
  snapshot passed it; the events after `h₀` fold on top of the base; and a dossier event is never an `undo`, `redo` or
  `revert` target of a map event (§7.4, line 6975), so no rebase, undo or revert can remove dossier content. The
  `frozenImport` rebase decodes the state under the current version and checks its digest before installing it.
- *Checked sound — an epoch that carries dossier events against undo.* J-A22.76 makes such an epoch no undo target
  (its carried events "are never undo targets, and the epoch that carries them is none either"). That is item 20 (c)'s
  consequence — undoing the epoch would undo dossier facts — not a lifecycle gap; an epoch without dossier events undoes
  from the checkpoint written before it (§7.4, line 7082).
- *Checked sound — the elaboration cache's path independence (item 28 (c)).* A click re-derives a stale rung "from its
  canonical prior — for a plan the stored plan, else the as-built plan carried along §2.6's interior ladder … never from
  the cache" (§8.5, J-A28.71; `Document.elaborations` outside both digests), so two users' click histories cannot yield
  two plans for one building.
- *Considered, not a finding — the `Rejection` record under a user `split` of its site.* `Rejection` is keyed by
  (element, site plot) with the epoch and population target in force (§7.7, line 7351); a `split` of that plot leaves the
  address on the anchor part (§3.6 rule 5, §6.3), so the new child is not rejected and a later re-placement could choose
  it. The owner's words ("the immediate effect should be that that place is not there") are met for the surviving plot,
  the rejection lapses at the first epoch in any case (item 20 (b)), and re-placements happen only on dossier events or
  rejections — at most cosmetic, so no block; recorded here so it is not re-found.
- **Design impact for pass c (item 20 (h) (v)).** The binding table from dossier names to map record ids is a new piece
  of persistent state: its lifecycle must be traced through §2.9 (the document; content-addressed chunks), §7.5 (the
  upgrade's `MigrationMap` and the re-rooting of a rebased base), the `frozenImport` decode (§2.9 step 2), clone
  (`docId` re-minted, bindings kept) and the dossier change feed (re-bind on rename, disambiguation by the dossier's own
  order). The pass-c editors design (i)–(v); this row names the paths so none ghosts.

**Re-derived (CONFIRMED):** LC-27's clamp arithmetic (0.9 + 0.3 clamps to 1.0; 1.0 − 0.3 = 0.7 ≠ 0.9); the presence of
every LC fix at its home by grep and by reading §2.9's rebase and load text, §6.3's succession table, §7.4's rebase row
and §5.3's dossier row (2026-09-27). The findings themselves are contradictions built from quoted pre-fix rules and are
CONFIRMED by their quotations; the pre-fix text is archived and was not re-read (the fixes were judged on the live text).
**Accepted on quoted evidence (PLAUSIBLE here):** the reference facts (FTG 65223067 / 66499838, `_critic-vg-ng.md` V25,
`useSettlements__settings.md` lines 15–40, ftg-posts-c §2.20), not re-opened.

**Verdict: CONFIRMED** — the row stands as written; no correction, no block.

---

## Design impacts (as they stand at the checkpoint; the continuation seat extends this table)

| part | impact |
|---|---|
| pipeline | Block B-1 appends the rung (c) slide rule to §4.6; pass c's items 33–41 restate the bent cut's steps and should fold that sentence into step 8's rung (c) inline (SINGLE SOURCE: one statement, at step 8). Items 45 (§4.8's castle repair order and its MFCG census baseline), 46 (§4.2 S3 (4)'s gate law), 47 (§4.5's grower rates) and 48 (§1.4 / §13.5's MFCG population figure) change current texts named in the mfcg row; none contradicts an owner rule today. |
| determinism | Item 20 (h) (v)'s binding table (dossier name → map record id): trace create, persist (§2.9 chunks), replay, upgrade (§7.5 `MigrationMap`, the rebased base's re-rooting), the `frozenImport` decode, clone (`docId` re-minted, bindings kept) and the change feed's re-bind; the derivation table of §7.7 gains its row. |
| rendering | Item 54 (pass c) changes §8.4's raised under-copy to a class-dependent front; §1.2 names "MFCG's raised under-copy on" and must read the same after it. (The visual row is pending.) |
| model | none from these three rows |
| kernel | none — the pool scope at the wall strips (§3.3 step 3 with §4.8's "strip faces inherit their district") and the snap-rounding-versus-clearance interplay (§3.6 step 4 with the placement rule's (iii)) were checked and hold |
| scope | §13.5's MFCG rows should cite the size sweep (B20) as their baseline source and treat the red team's five-city EXP figures as superseded where the two overlap — record hygiene for the evidence seat, no rule changes. |

## CONFIRMED versus PLAUSIBLE (as they stand at the checkpoint)

**CONFIRMED (executed or read in this seat, 2026-09-27):** the six executed numbers of the geometry lens re-derived by
`geo_rederive.py` (gcd share, off-edge share and offsets, the dead band, the Pitot share, the 2⁵³ bounds, 327.67 m,
2⁻²⁴); the MFCG size sweep's building and district counts per size and the quarter-law fit; the presence of every GEO,
MFP and LC fix in the live design at the cited lines (greps and whole-section reads of §1.2, §2.2, §3.3, §3.6, §3.10,
§4.4, §4.6, §4.8, §8.5, with §2.9, §5.3, §6.3, §7.4 and §12.2 by targeted reads); the validation record's dispositions
(170 rows, 166 FIXED plus 4 duplicates, 0 INVALID); §4.8's strip-ownership sentence and §3.3's pool scope; the gap in
§4.6 step 8 (c) against §3.6's contact rule 2 (a reading of two live rules, CONFIRMED as a contradiction in the text).

**PLAUSIBLE (reasoning, or accepted on quoted evidence):** every reference fact the lenses quote from the critic and
findings files (not re-opened); the red team's five-city MFCG EXP measurements (scratchpad not kept); the kernel bench
figures the live text cites (the fix rounds' executions, files present on disk); how often rung (c)'s contact refusal
fires in a built town (≈ 1 % per shallow reflex vertex at 50 m, my estimate); the size of the derivation-pool copies
and every other figure the design itself marks PLAUSIBLE until M0 / M1.
