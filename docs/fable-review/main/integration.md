# Fable review — lane fable-review/main/integration (the mechanics of the passes: integrations, routes, assemblies, the pass-b validator and closing seat, the hand-fix apply)

Reviewer: Fable (claude-fable-5-1), 2026-09-27 22:06 onward. Rows: every PENDING row of `docs/FABLE-REVIEW-QUEUE.md`
whose id matches A-fixall/integrate-r1…r5, B-fixall/index, B-amendments-b/route, B-amendments-b/assemble-r0…r3,
A-amendments-b/validate, A-amendments-b/closing, B-handfix-b/apply, B-handfix-b/assemble-r1…r2, B-amendments-c/route —
17 rows, listed by grep at the start (no A-handfix-b/close row exists: the hand-fix close seat ran on Fable and landed at
21:45 without a queue row). Sections judged: `docs/validation/consistency/canon.md` (home rules R1–R13, read whole with
the gaps, routing and judgment sections), the changelog `docs/ARCHITECTURE-VALIDATION.md` (§R1–§R5, §Ab, §Ab.1–§Ab.4)
and the archives `docs/archive/*` (the pre-states the assemblies name). Live design at the start of this review:
`docs/ARCHITECTURE.md` sha256 1c23190f…, 13 026 lines; `docs/ARCHITECTURE-RATIONALE.md` 0be40dfd…, 2 053 lines — the
post-close text (handfix-b/close, Fable, 21:45). Owner rules read whole first: `docs/OWNER-INSTRUCTIONS-2026-09-25.md`,
`docs/AMENDMENTS-2026-09-25b.md` items 8–32, `docs/DEFINITION.md`, and items 63–72 / 20 (h) of
`docs/AMENDMENTS-2026-09-27c.md` as the route rows need them. Scratch:
`/private/tmp/claude-502/-Users-cstokes-Desktop-Maps/c0d81c15-f08e-4364-97ca-c6b05aa13811/scratchpad/fable-review/`.
Blocks: `docs/fable-review/main/blocks-integration.md`.

**Checkpoint 1 (2026-09-27 22:30; written at roughly 550 k tokens of context).** Ten of the seventeen rows are done
(the six fix-all rows, the amendments-b route, the validator, the closing seat, assemble-r0); the first unreviewed row is
**B-amendments-b/assemble-r1**. The continuation seat starts there: the PROGRESS table names what each remaining row needs,
the fidelity receipts for every assembly are already computed (`spotcheck2.py` in the scratch directory, its output
recorded in the rows' ledger cells below and in the assemble-r0 section), and the archives' sha256 chain is recorded in the
assemble-r0 section. The blocks file holds one block (J-Fintegration-1) and the design impacts and CONFIRMED-versus-PLAUSIBLE
sections below cover the ten rows done; the continuation appends to both.

## PROGRESS

| row | planned | done |
|---|---|---|
| B-fixall/index | index.md whole; count the 299 against the red-team files and the critics' rulings by script; the 27 duplicate links and the contested cross-area owners; DEF-16/17; MFP-5 vs MN-1 | done (CONFIRMED) |
| A-fixall/integrate-r1 | r1 log whole; §R1 counts by script; C-1/J-I1, C-11/J-I5, C-2/C-4/J-I2 against the current text; coherence of the 22 conflicts | done (CONFIRMED) |
| A-fixall/integrate-r2 | r2 log whole; §R2 counts; C-1/C-3/C-7/J-I9, C-4/J-I10, C-5/J-I11 and the 251 ms re-sum | done (CONFIRMED) |
| A-fixall/integrate-r3 | r3 log whole; §R3 counts; C-1/J-I12 across the six readers, C-2/J-I13, VK2-1/J-K25 and NR-1/D-18 | done (CONFIRMED) |
| A-fixall/integrate-r4 | r4 log whole; §R4 counts; C-2/J-I16 with J-P46 and the margin-line readers; C-4/J-I17; C-1/J-I15 | done (CONFIRMED) |
| A-fixall/integrate-r5 | r5 log whole; §R5 counts; C-1/J-I18, C-2/J-I19 with VD4-1/VD4-6; J-S43, J-DET-46, J-S42 | done (CONFIRMED) |
| B-amendments-b/route | route.md whole; every home against R1–R13; the six contested homes; SATISFIED 9; the flagged rulings | done (CORRECTED) |
| B-amendments-b/assemble-r0 | assemble-r0.md whole; ≥ 3 blocks against pre-amendments-b archive and pre-repair-r1; allow rows | done (CONFIRMED) |
| B-amendments-b/assemble-r1 | assemble-r1.md whole; ≥ 3 blocks pre-repair-r1 → pre-repair-r2; hand-off swaps; 57 allow rows | planned — receipt ready: spotcheck2.py 3 MATCH (§2.2, §2.3, §2.5) and §2.6 differing from repair-r1-model.md by one line (the `subLocation?` comment) — confirm it is the rendering seat\'s one-string substitution named in assemble-r1.md\'s hand-off |
| B-amendments-b/assemble-r2 | assemble-r2.md whole; ≥ 3 blocks pre-repair-r2 → pre-repair-r3; the 10 C3 rows; §8 notes | planned — receipt ready: spotcheck2.py 4/4 MATCH (§2.5, §2.6, §2.8, §2.9) |
| A-amendments-b/validate | validate.md whole; VD2-01/02 widened ruling vs items 17 (d) and 20; VAL-02; V-MAB2-01 | done (CONFIRMED) |
| B-amendments-b/assemble-r3 | assemble-r3.md whole; ≥ 3 blocks pre-repair-r3 → pre-handfix-b; the swap; §Ab.3 mapping; §8 notes | planned — receipt ready: spotcheck2.py 4/4 MATCH (§2.6, §2.8, §4.1, §4.6) |
| A-amendments-b/closing | closing-report.md §3 every ruling vs the owner's items and the current text; SUMMARY.md claims | done (CORRECTED: one block on §7.7, J-Fintegration-1; a note appended to SUMMARY.md) |
| B-handfix-b/apply | apply.md whole; the touched subsections on the current text; anchors; 9 joined soft breaks; 6 allow rows | planned |
| B-handfix-b/assemble-r1 | assemble-r1.md whole; hand-off id sets and H1/H2; the 2 allow rows; §8 PLAUSIBLE items | planned — receipt ready: spotcheck2.py 3/3 MATCH (§2.5, §2.6, §7.1) |
| B-handfix-b/assemble-r2 | assemble-r2.md whole; hand-off id sets and P1; J-A28.26 hits; §9 PLAUSIBLE items | planned — receipt ready: spotcheck2.py 3/3 MATCH (§2.6, §5.2, §7.4) |
| B-amendments-c/route | route.md whole; every home against R1–R13; items 63–67 homes and rulings; §C.2 owner table; §C.4 held parts | planned |
| blocks file, design impacts, LANDED | write; log | blocks file written (1 block, J-Fintegration-1); design impacts and CONFIRMED/PLAUSIBLE written at checkpoint 1; LANDED at the end of the continuation |

## Verdict table

| row | verdict | one-line reason | corrections (where) |
|---|---|---|---|
| B-fixall/index | CONFIRMED | 299 ids re-derived by script: the 163 red-team ids equal the seven findings files' ids exactly (0 missing either way); 108 coverage items = 96 gaps + the 12 added (FTG 54+2, MFCG 18, VG 8+9, NG 16+1); 17 DEF, 7 AM, 4 MN; 27 duplicates → 272 distinct; owners 21/47/128/64/39; the MFP-5 vs MN-1 premise note was acted on (MN-1 FIXED: the 15 392-building size-80 city is the options-confounded one) | none |
| A-fixall/integrate-r1 | CONFIRMED | §R1.1 counts re-derived (282 FIXED, 17 STAGED-BY-OWNER, 0 INVALID; 299 ids once); J-I1, J-I5, J-I2 stand on the live text (§4.5 quarters, §4.2 S3 (6) + §12.4 S5 row, §12.5's declared miss); the C-16 arithmetic re-derived (17.53 × 8.76 km = 153.6 km²; 0.8 × 17.53 km = 1.402 × 10⁶ cm; ≈ 6× under 2²³) | none |
| A-fixall/integrate-r2 | CONFIRMED | §R2.1 counts re-derived (99 FIXED, ids once); J-I9's exact pool scope (§3.3 step 3), the margin band (§4.5, §4.7, §12.4) and the invariant that polices it (§7.3 item 7 (v)) agree; J-I10's three clear-region rules and fallback, J-I11's `split` flag (§2.2 rule 3 (a)–(c)) stand; the 251 ms is superseded by later rounds — the live §12.4 sums to 255 ms by script | none |
| A-fixall/integrate-r3 | CONFIRMED | §R3.1 counts re-derived (56); J-I12 read at its six readers (§2.2 rule 7, §3.3 rule 3, §3.6 (c), §4.2 S1 (5), §4.11 (2), §7.3 (b) 4): one deck structure, no L0 edge across water; J-I13's one preparation list is complete for every finer edge an L0 batch can meet (decks, `gate_end`, border contact names, other-edge anchors, quays cut back, reservations refused); J-K25's freeze assertion and D-18's declared miss present | none |
| A-fixall/integrate-r4 | CONFIRMED | §R4.1 counts re-derived (43); J-I16 with J-P46 read at every margin-line reader (§2.2 rule 1, §3.2 (9), §3.3 rules 2–3 and step 3, §4.1 S1 row, II.1's one-sided `frame` seam): the L0 outer ring is consistent everywhere; J-I17's sites (§7.3 (b) 2, 4, 9) and J-I15's naming (§2.2 rule 7 with the ordinal rule "from 2 on an enceinte") stand | none |
| A-fixall/integrate-r5 | CONFIRMED | §R5.1 counts re-derived (36); J-I18's writer split read across §2.2 rules 3 (c) and 7, §4.1's S1/S4 rows, §7.3 (b) 4 and §5.2 F-ROUTE; J-I19 present at §2.9 step 5 with the VS5-1 narrowing; the owner-visible moves stand (J-DET-46, J-S42 rows; the 153–204 pw figure superseded by amendments b's 166–220, and §16's cut total 149–192 = 166–220 − the listed 17–28 pw, re-derived) | none |
| B-amendments-b/route | CORRECTED | every home follows the canon's R1–R13 (the six contested homes re-derived: 16 → §4.7 by R3/CANON-C05, 17 → §4.11, 18 → §4.7 S11, 20 → §7.7 by R6, 23 → §7.6, 28/29 → §2.6 by the stage-3-interface precedent; 30's two homes by R3 + R7; 31 → §4.11), the seven rule families are right and item 9's SATISFIED holds; but item 21 was routed on the owner's 2026-09-25 GPL-3 intent, which the owner superseded on 2026-09-27 (PRIVATE for now) — its section and its six stale-text rows would now send a verifier against the ruled text | appended review section on `docs/validation/amendments-b/route.md` withdrawing item 21's routing and stale-text rows (the live text already carries the ruling: §17.3, §17.1 (1), §17.4, D-22 unchanged; J-A21.01/.31/.81) |
| A-amendments-b/validate | CONFIRMED | every owner-fidelity verdict of §2 re-read against the owner's words and the live text; the widened VD2-01/VD2-02 ruling (a dossier-backed use relocates and never closes inside an epoch; item 17 (d)'s "or close" yields to item 20 for dossier content) is the right reconciliation of two owner rules — the owner's own "close down here but reopen over there" is a relocation, and item 20 (h) makes the dossier the sole immutable truth; VAL-02's rung-and-density scaling honours "city and metropolis bands higher than town"; V-MAB2-01's no-refusal re-homing was PLAUSIBLE and the closing round refined it (locked and pinned passed over); 53 = 3 + 7 + 8 + 11 + 6 + 3 + 15 re-counted; NOT YET CLEAN was the right verdict | none |
| A-amendments-b/closing | CORRECTED | §1's 53 FIXED accepted on its probe method (spot-read at V-MAB2-10, VD2-04, VS2-11 on the live text); §3's rulings stand — 3.2 (locked and pinned passed over; S11 leaves a protected shell unchanged) follows §7.2 and item 18 (d); 3.3 (capacity on base wings) keeps a click out of the model; V-MAB3-04's schema narrowing over a reading rule is structural prevention; VR3-01's headroom rule and VD3-04's undo refusal follow the realism tiebreaker and item 20 (a)/(c); but ruling 3.1's "always places" is true at generation and silent for a district every plot of which a user has locked after the city is built, where §7.7's precedence (lock > dossier existence) leaves the `dossier` request no site — ruled here (J-Fintegration-1); and the owner SUMMARY's item 14 says the sewer switch "never creates or removes" a network, while at TOWN the same control is a model feature (`auto` / `on` / `off`, II.7.1, J-A14.42) | one block (APPEND TO SECTION §7.7 + J-ROWS + RATIONALE-A, J-Fintegration-1) in `blocks-integration.md`; review sections appended to `closing-report.md` and `SUMMARY.md` |
| B-amendments-b/assemble-r0 | CONFIRMED | fidelity re-derived by script: the first five REPLACE blocks of `blocks-model.md` (§2.2–§2.6) equal their subsections in the post-r0 archive (87d89692…) line for line ignoring blank lines and differ from the pre-r0 archive (1dbfd9d4…); the four CARRIED APPEND bodies (§4.2 assignments #4; §4.11 assignments #5, emulation-hidden #9, evolution-islands #1) are present exactly once in the post-r0 archive; the archive chain's hashes match the reports (1dbfd9d4 → 87d89692 → 365e19f2 → 831efd42 → 1a861c72 → 5d752c9b → e9c0b828 → 357c02f2 → live 1c23190f); 451 allow rows, 14 sampled of the dwellings-synthesis category are our own record names and phrases, the two C4 rows chance matches | none |

## Row sections

(one section per row, appended as each is finished)

### B-fixall/index — CONFIRMED

Read: `docs/validation/fix-all/index.md` whole (the prose, §1–§3 and §5 in full; the master table §4 by script and by
reading its owner and duplicate columns), `index.json`, the seven `docs/validation/redteam-*.md` findings tables and the
four `coverage-audit-*.md` files by script. Re-derived: (1) the red-team ids — a script extracted every finding id from
the seven files' tables: 163 ids (ftg 22, geometry 42, improve 16, lifecycle 31, mfcg 12, scale 22, visual 18) and the
index's 163 red-team items are the same set, nothing missing either way; (2) the 299 = 163 + 108 coverage + 7 AM + 4 MN
+ 17 DEF, every id distinct; the coverage 108 decomposes exactly as the index claims (FTG 54 gaps + OBS1 + OBS5 = 56,
MFCG 18, VG 8 + VN-002/003/090/156 + WC1–WC5 = 17, NG 16 + OBS3 = 17); (3) owners 21 / 47 / 128 / 64 / 39 and 27
`duplicate_of` links, 299 − 27 = 272 distinct defects; (4) the 19 staged ids of the index against §R1.1's 17
STAGED-BY-OWNER: the two missing (COV-NG-N27, COV-NG-XB23) are duplicates that took their primaries' FIXED — coherent,
not a defect. Judged by reading: the contested owner calls (LC-2 pipeline, SCL-6 rendering, VIS-8 pipeline, GEO-15
kernel, VIS-11 determinism through §5.2's ladder, AM-3 pipeline) follow the lane's owner rule (the area whose sections
the fix changes) and the canon's later home rules agree with them; the duplicate calls I re-derived (COV-VG-VN-090 →
COV-NG-XA36, DEF-1 → IMP-6, COV-NG-OBS3 → MFP-8, COV-FTG-N07 → DEF-12, FTG-1 → LC-2) are the same defect each time;
DEF-16 (the in-text §4.1 pool deferral) and DEF-17 (§16's stage-3 compositions) were real deferrals the Deferrals list
omitted, and §R1.1 disposes of both (DEF-16 FIXED by the pool as primary, DEF-17 STAGED-BY-OWNER with the hook). The
MFP-5 versus MN-1 note (§5.1) was the right call and was honoured: §R1.1 records MFP-5 FIXED by re-anchoring the speed
bars at matched building counts and MN-1 FIXED with the finding that the 15 392-building size-80 city was the
options-confounded one. The critics' rulings the index had to respect are the fix-all's own verifiers (r1-verify-*), not
research/findings/_critic*.md, which post-date it. No correction.

### A-fixall/integrate-r1 — CONFIRMED

Read: `r1-integration-log.md` whole; §R1 of `docs/ARCHITECTURE-VALIDATION.md` (header, §R1.2, §R1.3 read; §R1.1
counted by script: 299 rows, 282 FIXED, 17 STAGED-BY-OWNER, 0 INVALID, no duplicate id). The three items the row asks
for, judged on the live design: (1) C-1 / J-I1 — §4.5 "Quarters" carries one merge tree built by S6 with one cost
(combined area, + 1 000 ha across kind families, + 10 000 ha across a wall or water barrier), cut at min(N_q, L) with
N_q = round(1.37 · B^0.267) from MFCG's size sweep; §9.1's `QuarterNode.cityCut` and §9.4's quarter rung read the same
tree. One definition of a quarter serving the count law and the zoom stops is the right resolution; realism and
legibility are untouched. (2) C-11 / J-I5 — §4.2 S3 (6) computes the one field `T` (multi-source Dijkstra with the road
multiplier) and §12.4's S5 row states "later boundaries are level sets of S3's one travel-cost field, re-settled
incrementally — no per-stage field". The log's claim that measuring from the previous boundary equals `T − t_(k−1)` while
costs are unchanged is exact: a constant offset does not change a level-set family, and where S5b's roads change the
costs the field is re-settled, which the text states. The rationale's note "amended by NF-P1" (computed at S3, not after
S4) matches the text. (3) C-2 / C-4 / J-I2 — §4.1 ("No rung shows a preview"), §8.5 (J-R7), §12.5 (the miss above
≈ 14 200 buildings declared for the owner's veto, the single-worker knee at ≈ 11 400) and the one-page summary agree;
the dependence on M1's pool measurement is stated in §12.5 with its fallback. The owner's item 28 (b) (eager footprints
at city zoom, not bare plots) is consistent with a finished first picture. Re-derived besides: the C-16 range bound —
the 120 000 cap's 153.6 km² at aspect 2 is 17.53 × 8.76 km, plus 30 % margin a side gives |x| ≤ 0.8 × 17.53 km =
1.402 × 10⁶ cm, 2²³ ÷ 1.402 × 10⁶ ≈ 6.0 (§3.2 (1) says ≈ 6×). The 22 conflicts each name a home that the canon later
confirmed (C-5's one `DerivationRecord` in §2.8, C-6/C-10's kernel refs and lineage keys in §2.2 rule 5 and §6.1, C-19's
`shoreClass`, C-20's one label schema in §9.1). No correction.

### A-fixall/integrate-r2 — CONFIRMED

Read: `r2-integration-log.md` whole; §R2 (header, §R2.2, §R2.3 read; §R2.1 by script: 99 rows, 99 FIXED, ids once).
(1) C-1 / C-3 / C-7 / J-I9 on the live text: §3.3 pool step 3 defines the scope exactly as the log says (faces of the
set, edges with the set on both sides, vertices wholly inside, and for a split only a boundary edge whose other side no
overlay writes — water, the arena's outer ring); the shared L1 edges are never written in the pool — a spine by its
corridors, a wall trace by step (0)'s parts, every other shared edge by §4.5's 2 m margin band, and the hinterland unit
is one more overlay. §4.1 (line 3264), §4.7 S10 (0), §7.3 item 2 (a regeneration re-lays its own side's part) and
§12.4's row carry it, and §7.3 item 7 (v) asserts at every merge that "every L1 edge two face sets share without
corridors carries a margin band on both sides and no other edge" — so an unbanded shared edge is a test failure, not a
silent hazard. Does any shared non-spine edge escape? Shores are written by no overlay (splits allowed), reservation
boundaries carry a `reserve` seam with the band (II.1), wall traces are step (0)'s, the frame is L0 — none escapes.
(2) C-4 / J-I10: §3.3's three clear-region rules (clearing whole finer faces only; preparation places every contact;
contact only at prepared vertices) with the plain rule as the pre-decided fallback and M3a's fixtures; §4.11's carve
and §7.3 (b)'s operator both declare the footprint as `KernelTx.clearRegion`. (3) C-5 / J-I11: §2.2 rule 3 states the
`split` flag with its three clearing cases and "a chain's own shape vertices never carry it", and §3.4's dissolution
reads it — a removed lane restores its edge exactly and cannot straighten a spine. The ≈ 251 ms figure was re-summed by
later rounds; the live §12.4 sums to 255 ms by my script (rows 2 + 25 + 16 + 10 + 40 + 17 + 4 + 20 + 25 + 8 + 1 + 5 + 48
+ 13 + 12 + 4 + 5). All three resolutions are PLAUSIBLE design reasoning until M0/M1, as the log says, each with its
measurement and fallback stated. No correction.

### A-fixall/integrate-r3 — CONFIRMED

Read: `r3-integration-log.md` whole; §R3 (header, §R3.2, §R3.3; §R3.1 by script: 56 rows, 56 FIXED, ids once).
(1) C-1 / J-I12 read together at the six places the row names, on the live text: §2.2 rule 7 "The deck" (the way's own
L1 edge between two `deck_end` bank vertices; no L0 edge crosses water, no deck splits a water body's L0 faces), §3.3
rule 3 (the kept way's straight L1 edge between its two promoted bank vertices "now lies across the new water as the
Bridge's deck span … the structure S1, S3 and S4 build at generation"), §3.6 candidate (c) (contact only at prepared
vertices), §4.2 S1 (5) (S1's L0 batch inserts a site's two `deck_end` vertices into the shores), §4.11 batch (2) and
§7.3 (b) 4 (the L0 batch "adds none" and promotes the prepared vertices). One structure, at generation and after every
edit; edge promotion is gone (`W_PROMOTED` remains only for prepared-vertex promotion). The judgment is right: it is what
generation builds, L0 stays land and water, and one promotion kind fewer. (2) C-2 / J-I13: §3.3 rule 2's list (deck
bank vertices on kept ways; `gate_end` on re-traced wall runs; the `border` prepared at its bank points and kept closed;
`anchor` contact names at the two bank points of every other crossed finer edge that is no way, the stretch between
removed; quays and landings cut back and extended after the water; a way cut back beyond its bank setback needs no
contact) is mirrored by §7.3 (b) 3 and §4.11 (1); a reservation in the channel's way is F-EDIT (refused, not
unprepared). I looked for an L1 edge an L0 batch could meet unprepared: a wall strip's intervallum lies inside the strip
and leaves with a re-traced run's strip lines (§7.3 (b) 3, §4.8); corridor kerbs are S9's and re-derived inside the
footprint; the sewer arena is separate (§7.3's staged-layer row). None found. (3) VK2-1 / J-K25: §3.3 step 1 states the
step-(0) partition rebuild and the freeze assertion "every level's dynamic grid and every partition's tombstone set
empty", with the measured rebuild costs cited to the bench files; NR-1 / D-18: §12.5 declares the O3 (d) miss for the
owner's veto and D-18 is cited at §12.3's fallback path. No correction.

### A-fixall/integrate-r4 — CONFIRMED

Read: `r4-integration-log.md` whole; §R4 (header, §R4.2, §R4.3; §R4.1 by script: 43 rows, 43 FIXED, ids once).
(1) C-2 / J-I16 with J-P46 — every reader of a margin line checked on the live text: §2.2 rule 1 (L0 = the rock bounded
by the arena's outer ring carrying the structural `margin` role), §3.2 (9) (the outer ring and the frame rectangle are
the `margin` and `border` chains), §3.3 rule 2 (only the border is prepared; "the arena's outer ring is L0, so new water
meets it at its own level"), §3.3 step 3 (a split is allowed on the outer ring because no overlay writes it), §4.1's S1
row (L0: first the outer ring), and II.1's seam type (`border` or `margin` → `frame`, a one-sided run with `sides: [Id,
null]`) — which reads both roles and is valid for an L0 edge because L0 edges are inherited at every finer level. The
hinterland's faces are bounded by the outer ring and the unit's plot and furlong lines may end on it under step 3's
split rule. Consistent everywhere. (2) C-4 / J-I17 — §7.3 (b) 2 matches an old unused `site` like a deck, (b) 4 places
each unused new site's two `deck_end` vertices "as S1's L0 batch places a site's (§4.2 S1 (5))", (b) 9 removes every deck
and site left over land; since the operator uses S1's own siting rule on the changed reach, an edited river carries the
sites a regenerated one would — PLAUSIBLE by construction, as the log labels it. (3) C-1 / J-I15 — §2.2 rule 7's
`gate_end` under a fresh `Gate` named by `Gate.banks`, and the transient contact name whose entity is "the first row of
the edge's own birth level" with the kernel allocating the smallest free `anchor` ordinal "from 2 on an enceinte, whose 0
and 1 name an open trace's ends" (§3.3 rule 2) — the collision J-I15's rationale feared is closed in the text. No
correction.

### A-fixall/integrate-r5 — CONFIRMED

Read: `r5-integration-log.md` whole; §R5 (header, §R5.2, §R5.3; §R5.1 by script: 36 rows, 36 FIXED, ids once).
(1) C-1 / J-I18 — the writer split read across §2.2 rule 3 (c) (a deck left over land takes its way's level at once
when its `deck_end` rows are L1, keeps L0 with no L0 edge while they are L0, until F-REDERIVE removes the rows), rule 7
(which batch places them at which level is §4.2 S1 (5)'s), §4.1's S1 and S4 rows (S4 "L0, only when F-ROUTE's
extra-bridge rung fires on standing water"), §7.3 (b) 4 (L1 rows for a deck a carve, outer moat or earlier water edit
prepared, an F-ROUTE deck sited inside one of these included; L0 rows for S1, S3, S4's or an edit's added deck on standing
water, or an edit's new site) and §5.2 F-ROUTE (S5b at stages k ≥ 2 and in every epoch). Every deck a later water edit
can leave over land is named with the level its rows have; the consistency pass's amendment (S5b's batch among the L0
writers, CF-PIPE-10) is in the index row. (2) C-2 / J-I19 with VD4-1 / VD4-6 — §2.9 step 5 carries the rule with
VS5-1's narrowing (a document of the running output version only; another version opens as step 2's frozen view) and
§2.9 states the two roots the snapshot holds and that both trees are recomputed at load; the reasoning (nothing recorded a
records root, a root computed at the transform would check the records against themselves, a preview file loses nothing
by regeneration) is sound. (3) The owner-visible moves: J-DET-46 and J-S42 are index rows with their homes; J-S43's
153–204 pw is history — amendments b re-priced the estimate to 166–220 pw (J-A16.01, +13–16 itemised), and I re-derived
§16's cut total: 166–220 minus the listed cuts (8–14 + 3–5 + 2–3 + 4–6 = 17–28) = 149–192, as the text says. No
correction.

### B-amendments-b/route — CORRECTED

Read: `docs/validation/amendments-b/route.md` whole (the reading guide, the summary table, items 8–31 with 28 (f), the
rule families, the cross-cutting duties, the stale-text table, the item-28 reading list and the CONFIRMED/PLAUSIBLE
section, 2 630 lines), against `docs/validation/consistency/canon.md`'s home rules R1–R13 and the owner's items as they
now stand in `docs/AMENDMENTS-2026-09-25b.md`. **Homes.** Every home is the canon's: stage rules and the evolution hook to
§4 (R3: items 8, 10–15 in II.6 as PART II is the pipeline's, 16 at S10b, 17, 18 at S11, 19, 24–27, 30, 31); record types
and the stage-3 interface to §2.6 (R1: 28, 29 — the plan rung is a rung of the building ladder whose hooks already live
in §2.6, so the route's precedent is the document's own); assignments and the dossier contract to §7.7 (R6: 20, 22),
the editable-tables principle to §7.6 (R6: 23), the label policy's second home to §9.2 (R7: 30), the licence to §17.3
(R10: 21). The six choices the route itself marked PLAUSIBLE I re-derived and confirm: 16 in §4.7 rather than §7.7
because the one solver is S10b's mechanism and CANON-C05 gives a stage's mechanism to §4, with §7.7 the referencing
caller; 17 in §4.11 rather than §2.7 because the `Use` record is a type (model, referencing) and relocation is epoch
behaviour; 18 at S11 rather than §7.3 because the mutator is S11's derivation with a prior — the same code path the
click re-derivation of item 28 (c) uses — while §7.3 lists the edit kinds that call it; 20 in §7.7 rather than §11.4
because the bridge's missing command is a door (§11), the existence authority and rejection are assignment semantics;
23 in §7.6 rather than §1.4 because the defaults layer is a table rule and §1.4 is a summary that carries only canonical
figures (R11); 28 and 29 in §2.6 rather than §4.1 / §4.7 by the stage-3 precedent, with the click trigger a referencing
line in §4.1's laziness contract. **Families.** Assignments (16–19), evolution (8, 11, 17, 22, 25, 31), islands (10, 13,
15), sewers (11, 12, 14), dossier (20, 22), emulation (23–27), floor plan (28, 29) — each shares one table or operator,
as stated. **Item 9 SATISFIED**: the quoted §1.1 and §13.6 (3) rules stand in the live text (§3.2 (9) also scales the
frame by population, "item 9"). **The flagged rulings** were raised at the right place and were later ruled and recorded
(D-3's two settings J-A15.41; the growth centre against an off-centre market §4.2 S3 (12); J33 against the owner's
bare plots J-A28.42; the passage's planarity and the corpus id kept out J-A30.*; 31's contradiction with §4.11's
survivors rule, the J-DET-2 lineage exception and the war wording J-A31.47) — the validator and closing rows below judge
those rulings; the route's job was to surface them, and it did.

**The correction.** Item 21 was routed on 2026-09-26 as "Licence: this module is GPL-3" — state PARTIAL, home §17.3,
consequences (a)–(e) including TownGeneratorOS "consultable and adaptable with attribution" and a stale-text table
naming §17.3 / D-22 / J-S10's proprietary default, the summary's and §1.7's permissive-licence sentences, §17.1 (1)'s
"No code from TownGeneratorOS", §17.4's "Nothing GPL, AGPL or LGPL is linked" and §3.1 / D-14's CGAL rejection as text
"the verifiers must find gone". On 2026-09-27 the owner ruled "then lets stay private for now" and the amendments file's
item 21 now reads PRIVATE FOR NOW, SATISFIED by the current text, with J23's permission WITHDRAWN and the clean-room
chain absolute. The route was never updated, so a reader following its stale-text rows would flag the ruled text as
stale and could re-admit the withdrawn permission. The design as it stands carries the ruling (read on the live text):
§17.3 unchanged ("proprietary … All rights reserved", J-S10, flagged for the owner's veto); §17.1 (1) "No code from
TownGeneratorOS (GPL-3) … is read for implementation, ported or paraphrased (J-A21.01)"; §17.4 "Nothing GPL, AGPL or
LGPL is linked or bundled"; D-22 unchanged; J-A21.01 ("the GPL-3 intent of 2026-09-25 withdrawn; §17.3, D-22 and J-S10
stand; TownGeneratorOS an idea source only"), J-A21.31 (CGAL rejected on the licence under the private closure and on
the stack grounds), J-A21.81 (the arm's-length bridge kept on design grounds); §0.2's row 21 says SATISFIED by the ruling.
So the design needs no block; the file needs a correction: an appended section "## Fable review (2026-09-27) —
B-amendments-b/route" on `route.md` withdraws item 21's routing and its stale-text rows and directs any later reader to
the amendments file's item 21. Chose to leave the original section in place and append (the block protocol forbids
editing existing text there) over rewriting it, because the route is the record of how the pass was routed, and the
pass-b editors did in fact follow the ruling, not the route (§17.3 byte-identical to the archive, the validator's §2
row 21). CONFIRMED: the live licence text and the three J-A21 rows quoted above; the sha of the archive the route read
(7a4e19db…) is not among the kept archives, so its quotations are accepted on the route's word.

### A-amendments-b/validate — CONFIRMED

Read: `docs/validation/amendments-b/validate.md` whole (§1–§9, every issue of §6), against the owner's items 8–31 and
28 (f) and the live design. **The widened VD2-01 / VD2-02 ruling.** Two owner rules meet: item 17 (d) — an assigned
business "may relocate or close under the same rules unless the assignment is PINNED" — and item 20 (b)–(c) — everything
the dossier specifies exists on every map, only a dossier instruction removes it. The validator ruled that a dossier-backed
use relocates and never closes inside an epoch, item 17 (d) keeping its full meaning for the map's own assignments. That is
the right reconciliation: the owner's sentence behind item 17 is "a shop may close down here but reopen over there
organically" — a relocation, not a disappearance — and item 20 (h) (2026-09-27) makes the dossier the sole immutable truth
on the map, so a dossier smithy that simply closed would be a map-side deletion. The list of epoch paths (the use step,
redevelopment, `vacate`, `demolish`, a carve, `wallToWay`, `contractWall`, a terrain-and-water repair, `fallIsland`, a
tunnel's closing, `sealPassage`) is a judgment of completeness, as the validator says; the installed §4.11 paragraph states
the rule generally ("before any other step would empty or remove the building …"), so an unlisted path is still bound.
**VAL-02.** The owner's item 30 (b) says "city and metropolis bands higher than town"; a per-band target that ignored the
rung would contradict it, and the reach weights already scale by rung and density — the validator's fix makes the target
and the weights agree. Sound. **V-MAB2-01.** "No such change is refused for it" was the validator's reading; the closing
round's V-MAB3-01 refined it (locked and pinned households passed over; a hand edit whose excess cannot be re-homed
refused), which is how a repair round should work. **Counts** re-derived: 71 carried − 1 withdrawn − 22 merged = 48, + 5
new = 53; §6 holds 3 majors + model 7 + pipeline 8 + determinism 11 + kernel 6 + rendering 3 + scope 15 = 53. **Item 21**
in §2: "§17.3 and §17.4 byte-identical to the pre-pass archive" agrees with my own read of the live text (the route row).
**The recorded readings** (J-A15.41 two switches; J-A28.42 eager footprints at city zoom over the owner's "plots without
buildings" — the emulation-first ruling makes MFCG's city-zoom look the default and the owner's purpose, load on demand, is
met by the lazy rungs; J-A28.23 the capacity reading of 28 (f)'s last sentence; J-A31.47 rung 3's triggers generic) are
each vetoable and each recorded where the owner will find them. No correction.

### A-amendments-b/closing — CORRECTED

Read: `closing-report.md` whole (§1's 53-row table, §2's 31 required changes, §3's rulings, §4) and `SUMMARY.md` whole,
against the owner's items and the live text. **§1.** The 53 FIXED verdicts rest on a probe for each issue's new text; I
spot-read three on the live text (V-MAB2-10's `Basement.access` derivation, VD2-04's "shell subtrees, so read", VS2-11's
`RungProfile` comment) — present. **§3's rulings against the owner's items.** 3.2: a locked or pinned household keeps its
building and S11 leaves a shell unchanged when its protected households alone exceed the new capacity — §7.2's lock
semantics and item 18 (d) ("locked parts are never subtracted"); right. 3.3: the capacity reads the base wings only —
otherwise a click (a derived composition) could change a model quantity against §6.2; right. V-MAB3-04 (a): narrowing
`basementAccess` to `'core' | 'trapdoor'` so the table cannot state the contradiction is structural prevention over a
reading rule; right. VR3-01 / J-A30.25: a passage's clear height is the ground storey of the wing over it, every spanning
wing at least two floors — the owner's passage under a house, the realism tiebreaker; a passage with nothing above it is
an alley; right. VD3-04: refusing the undo of a dossier event and of an epoch that carried one — item 20 (a) and (c), and
20 (h); right. VK3-01, VD3-09, VD3-10, VS3-02: mechanical and consistent. **3.1 — the correction.** The ruling re-houses a
dossier household inside its district by the `dossier` request "which always places", over dropping it (forbidden by item
20 (b), (e)) or widening to the town (which would make a lazily derived district depend on the order districts are
placed). At generation "always places" holds: no lock exists before the first map, and §7.7's closest-option rule places
with the failed hard rows reported (J-A20.71). After the city is built the same §7.7 paragraph puts the lock above
dossier existence — "a dossier-backed element is … never placed on a locked entity — it takes the best unlocked site" —
so a district every plot of which a user has locked leaves the request no site, and §4.7's sentence and §5.2 F-SITING's
"which always places" are silent about it, while J-A20.43 already widens an epoch's forced use relocation to the town in
that case. I ruled it as J-Fintegration-1 (the block in `blocks-integration.md`, an APPEND to §7.7, the precedence's
home): a hand edit's request returns F-EDIT to its author naming the locks; a dossier event's request returns the same
F-EDIT to the host, which unlocks first (J-DET-11); an epoch's request widens to the town in J-A20.43's order; never a
dropped household, never a written lock. Chose an APPEND at §7.7 over a REPLACE of §4.7 or §5.2 because the rule belongs
to the precedence's home and those subsections are the pass-c editors' to align (design impact below). **SUMMARY.md.**
Its claims are true against the live text with one overstatement: item 14's "The sewer switch only shows or hides the
network. It never creates or removes one." — at CITY and METROPOLIS yes, but at TOWN the one *Sewers* control is a model
feature (`auto` / `on` / `off`, II.7.1, J-A14.42), so a town's user can force a network on or off; the six-step interior
ladder is right (six band rows, its five bullets merging `rich` and `prosperous`); 329 = 131 + 94 + 58 + 46; 13 026
lines; 166–220 pw. A review section with the item-14 note and the 3.1 qualification is appended to `SUMMARY.md` and to
`closing-report.md`.

### B-amendments-b/assemble-r0 — CONFIRMED

Read: `assemble-r0.md` whole; §Ab of `docs/ARCHITECTURE-VALIDATION.md`; the block files' marker lines. **Fidelity,
re-derived by script** (`spotcheck2.py`, saved in the scratch directory; it parses the amendments-b block files' convention
— a new `=== ` marker closes the block before it, only the last block carries `=== END ===` — and compares each REPLACE
body with the heading's subsection in the after-archive, ignoring blank lines): the first five REPLACE blocks of
`blocks-model.md` (§2.2, §2.3, §2.4, §2.5, §2.6) MATCH their subsections in
`docs/archive/ARCHITECTURE-pre-amendments-b-repair-r1-2026-09-27.md` (sha256 87d89692…, the post-r0 state) and each
differs from the pre-r0 archive (1dbfd9d4…). The four CARRIED APPEND bodies the report names (§4.2 assignments #4; §4.11
assignments #5, emulation-hidden #9, evolution-islands #1) are present exactly once in the post-r0 archive, whole
(1 333 / 3 874 / 4 842 / 11 548 normalised characters), so the assembler's refusal to re-apply them was right and the
seats' notes asking for re-application were indeed superseded. **The archive chain** (shasum on disk) matches every
report's hashes: 1dbfd9d4 (pre-amendments-b) → 87d89692 (pre-repair-r1) → 365e19f2 (pre-repair-r2) → 831efd42
(pre-repair-r3) → 1a861c72 (pre-handfix-b) → 5d752c9b (pre-handfix-repair-r1) → e9c0b828 (pre-handfix-repair-r2) →
357c02f2 (pre-handfix-close) → live 1c23190f; the rationale chain 5f80e197 → 3f39b2de → 50a94f2d → f2c2a1ca → 8a24a5a7 →
61477508 → dcabf14b → 9575f26c → live 0be40dfd. **The 451 allow rows.** The block holds 451 rows; a random sample of
fourteen of the dwellings-synthesis category reads as our own record names and phrases ("the room graph is built as a",
"kind full half walkout ring polygon inside the ground storey", "cores staircore chimneys chimney pattern record number
storey", "per storey the union of the rooms equals the union of the rings") — restatements of the program's own Fable
synthesis, not a reference's room-name list, tag list or palette; the two C4 rows are five generic nouns of our own §2.5
and §5.3 sentences matched against a 44-word place-name list — chance. **The applier's rules** (a block located on the
document as it stands; a REPLACE body that opens with a different same-level heading retitles it, reported — §0.2) and the
changelog's item-to-block proxy (explicit item mentions; the report says so) are honest. The spot-checks of the later
assemblies (for the continuation seat) are in the PROGRESS table. No correction.

## Design impacts

* {pipeline, §4.7 "Households per building" and §5.2 F-SITING's ladder cell say the dossier household's re-provision
  "always places"; when those subsections are next replaced (pass c), read them with §7.7's new paragraph
  (J-Fintegration-1): at generation always; after the city is built, F-EDIT for a hand edit or a dossier event, the town
  for an epoch, where the district holds no unlocked site.}
* {determinism, the block of this review is an APPEND to §7.7 (the precedence's home); the assembler applies it; nothing
  else in §5–§7 changes.}
* {scope, the owner SUMMARY (`docs/validation/amendments-b/SUMMARY.md`) overstates item 14 for towns; the appended review
  section corrects it in plain language; no design text changes.}
* {scope, the amendments-b route's item 21 section is superseded by the owner's 2026-09-27 ruling (appended review section
  on `route.md`); the live §17.3, §17.1 (1), §17.4 and D-22 are the ruled text and must stand — any later reader of the
  route must not treat them as stale.}
* {scope, none of the ten rows reviewed contradicts pass c's items 20 (h), 32–72 as far as read; the amendments-c route
  itself is a pending row (its homes and the OWNER RULE items 63–67 are for the continuation seat).}

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (executed or read on disk, this review):** the 299 index ids against the seven red-team files (163 = 163) and
the four coverage audits' decomposition (108 = 96 + 12); §R1.1–§R5.1's dispositions by script (282 / 17 / 0; 99; 56; 43;
36; each id once); the live §12.4 p50 column summing to 255 ms; §16's cut total 149–192 = 166–220 − (17–28); the C-16
arithmetic (17.53 × 8.76 km = 153.6 km²; 0.8 × 17.53 km = 1.402 × 10⁶ cm; ≈ 6× under 2²³); the text of every
integration decision at its live home (§2.2 rules 1, 3, 7; §3.2 (9); §3.3 clear regions and pool steps 1 and 3; §4.2 S3
(6); §4.5 quarters and margin band; §7.3 (b) 2–4, 9; §2.9 step 5; §12.5; II.1's `frame` seam); the live licence text
(§17.3, §17.1 (1), §17.4, D-22, J-A21.01 / .31 / .81) and §0.2's row 21; the interior ladder's six band rows; II.7.1's
TOWN control as a model feature; §7.7's precedence paragraph ("never placed on a locked entity"); the archive sha256 chain;
the spot-checks of every assembly's REPLACE blocks (assemble-r0 5/5; r1 3 MATCH + one §2.6 line to confirm; r2 4/4; r3
4/4; handfix r1 3/3; handfix r2 3/3) and the four carried APPEND bodies present once; the 451-row count and the sampled
allow rows.

**PLAUSIBLE (judgment):** that each conflict resolution of rounds 1–5 is the right design (each stands on reasoning until
M0 / M1 / M3a, as the logs say, with its measurement and fallback stated); that the home choices of the route follow the
canon where two sections could host an item (re-derived by reading R1–R13); that the validator's and closing's readings of
the owner's words are the ones the owner meant (each is recorded and vetoable); that the fully locked district is the only
case where "always places" fails (J-Fintegration-1 covers a district with no unlocked site, whatever locked it); that the
allow rows not sampled are false positives too (the assembler's attribution method is sound, and no sampled row was a
reference list).
