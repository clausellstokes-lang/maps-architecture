# Repair round 2 — V07 (the village product) — lane coherence/repair-V07-r2

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V07-r2; covered by the whole-design retrovalidation (J84).

# §8 total: 30.5–43 pw (was 30.25–42.5) — V-M3 gains item 122's crisis looks at the village rungs, + 0.25–0.5 pw (R2-06 (c)).
#
# Block file per the BLOCK PROTOCOL (docs/validation/amendments-c/apply-blocks.py): text before the first "=== " line is
# ignored. One FILE line (docs/volumes/V07-village.md), then 21 blocks: 20 REPLACE of leaf subsections and one APPEND TO
# SECTION "## 5 Rendering, labels and exports" carrying the new "### 5.6". 0 RULING REQUEST blocks. Source: the live V07 as
# assemble-r1 installed it (sha256 02f8dbb439bce4ae…; unchanged since). Each REPLACE body is the live subsection with
# count-asserted substitutions — generator docs/validation/coherence/work/repair-V07-r2/build.py with edits_a.py … edits_d.py
# (86 substitutions, each tagged with its issue ids or ruling; edits.log, diff.txt); every untouched line is verbatim;
# `python3 build.py` there reproduces the blocks and V07.new.md (sha256 cb663d471ad61b32…).
#
# PROGRESS
# - P0 brief read whole (13 issues incl. G122-V07; ROUND-2 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); adjudication-r2's
#   TOC row, Part H · V07 and R2-03, R2-05, R2-06, R2-08 – R2-12, R2-14, R2-19, R2-26, R2-28, R2-29, R2-32, R2-34 – R2-37
#   read whole: done
# - P1 issue sources (round2-work/V07.json with every also_reported version), file g item 122 with (h)–(i), the canon's
#   routings (J135, J138) and its adjudication-r2 entry, the landed round-2 shapes this part cites (model §2.7/§2.9, pipeline
#   §10.2 *Crisis looks* and EP-27, determinism DR44, rendering §8.2 *Crisis looks* and the place table, V01 §2.3/§3.16's
#   `DisasterUnit`, `disasterSource` and `campLand`, V06 §3.22, V09 §4.21.12, V12 §3.15.12) and every V07 section concerned,
#   whole: done
# - P2 the count-asserted edit set over the live V07: done (86 substitutions, 21 blocks)
# - P3 dry run on a copy, references, doc_checks, the report, the result, LANDED: done
#
# DISPOSITIONS — 12 issues FIXED in the text (one fix closing three ids), 1 INVALID by ruling; 0 ruling requests
# - VAH-r1-16 (FIX per R2-10): V07 §4.5's village `WhyProvider` answers "in `asPlaced` and `asNow` modes (§11.2's
#   `WhyAnswer`)". No other moved reader type is cited in V07 (a census of the fourteen names: 0 left at V10).
# - VAH-r1-20 (FIX per R2-11): W80 cites "§7.7's DR42 (the dossier's week)", W81 "§7.7's DR43 (window, staging)". The same
#   ruling at every other named row: W77, V07 §3.4 (8), V07 §3.11, T-V7-62 and J-V7.135 cite "§7.7's DR41" (the item-114 row);
#   the dossier trace reads DR41, DR42, DR43 and (new) DR44. 0 "calendar row", "traditions row" or "item-11n row" left.
# - VAL-R1-03 = VPC-R1-06 = VV78-r1-03 (ONE FIX per R2-12): W46's hook column "V04's `DigRule.classRow`, `UnderOpeningRow`";
#   V07 §3.16 (3) (iii) "V04 §3.5.7 (e)'s candidates and V11 §3.23.7's `UnderOpeningRow` chances (V04 §2.3's record; …)".
#   0 bare `OpeningRow` left in V07.
# - VAL-R1-09 (FIX per R2-26 (d)): V07 §3.5a (5) reads "The **under-deck strip** — §4.6 S8's: the deck's ground projection
#   over its piers and spans, widened each side by `raisedWays.structure.stripMarginM` (V11 §3.24.2) — holds no toft yard
#   part and no building" (the cell named, no value restated: canon S2); `stripClearM` leaves V07 §2.2a's `raised` cells and
#   defaults row (both lines the issue cites as "§2.2a l. 555; §2.2 l. 592" are V07 §2.2a's), each now naming the base's cell
#   "read, never copied"; V07 §12's PLAUSIBLE list reads "the support clearance". What the strip holds at a village (no toft
#   yard part, no building; crofts, closes and fields pass beneath) stays this volume's rule (J-V7.83 unchanged).
# - VAL-R1-10 (FIX per R2-34): V07 §5.5 (3) reads the required text verbatim — a dwelling in a cavern or ruin (V07 §3.16 (5))
#   glows on Below and is a ghost pin on Ground (V04 §5.1); an access is no Find target (V05 §5.6 (1)).
# - G122-V07 (NEW DESIGN per R2-37 (4), R2-35 (T122-5, T122-6), R2-36): the new V07 §5.6 *Crisis looks at the village
#   rungs* — (1) the village tiers' scale (V11's THORP/HAMLET/VILLAGE `scale` cells read as item 122 (c)'s "a hamlet gets a
#   war band's camp"; no siege line at THORP and HAMLET; a force beyond the frame to §8.8's ring; every share of a place's
#   units counted as V01 §3.16 (5) counts the disaster's, never rounding to nothing at a positive share); (2) §10.2 (d)'s
#   places read on the village's records (the main approach road by DR3's partner weight; `beyondWalls`, `approachRoads`,
#   `approachByGate` at `frontierFor`'s village answer, `outside`, `affectedQuarter` a unit of (3), `fields`, `edge`,
#   `outlyingFarms`, `gatesAndKeep`, `streets`, `neighbourhoods`), V01's `campLand` read at the perimeter, the fallow course
#   and the entries' ways, and DR18's informal clusters kept apart from the refugee look; (3) the disaster's units in V01
#   §2.3's `DisasterUnit` shape — `villageDisasterUnits` (the ends, or an end-less thorp's toft groups, every field of the
#   shape defined) and `villageUnitPlots` — for V01's `disasterSource`, whose one rule picks among them; (4) the hand-over
#   through the village's epochs (V06 §3.22), desertion included, and a look across a hand-off; (5) bands, families and
#   framing (the painterly sheet resolving §8.2's crisis roles); (6) words, Find and exports; (7) its edges (no palisade,
#   green, market, entry, outlying farmstead, arable face or end; a THORP of one house; a removed end; a preview; a look and a
#   festival in one week; the lifecycle); (8) cost and build. Its ends at the volume's homes: V07 §1 (scope, the base side,
#   the siblings' parts, cross-volume fact (15)), W74, W79 and the new W84 with the dossier trace, V07 §2.6's derived row,
#   V07 §3.17's edge row and four combination rows, V07 §4.5's crisis line (`info.crisis.ruinedFor` on a ruined end and a
#   bare field), V07 §5.1's roles sentence, V07 §5.2's widened limit, V07 §5.4's exports, V07 §5.5's crisis section, V07 §6's
#   cost, the new T-V7-69 (takes T122-5's and T122-6's village clauses; R2-35 leaves T122-1, T122-2 and T122-7 to V12, V09 and
#   V06, so T-V7-69 re-runs none of them), T-V7-60 (h), V07 §8's V-M3 line, price and risk (14), J-V7.146, V07 §12. Every
#   also_reported version is satisfied under R2-37's names, save where R2-37 or R2-35 governs: no camp on the green (R2-37
#   (5)'s `campLand` is the outskirts' commons and fallow), and the hash, weeks and no-op clauses stay V12's T-V12-54 (V12
#   §3.15.12 runs them on the village fixtures). The head's owner-item range is the assembler's (NOTE FOR ASSEMBLE below).
# - VAP-r1-01 (FIX per R2-08, R2-09): T-V7-62 – T-V7-67 name in their heads the bars they take ("takes T114-1 – T114-8's
#   village clauses", T115-1 – T115-4, T116-1 – T116-4, T117-1 – T117-8, T118-1 – T118-6, T119-2 – T119-4); T-V7-63 gains the
#   T115-4 clause with its `item115.off` registration in R2-09's form. V07 §7's head reads "each test naming in its head the
#   bars it takes over" and that every pin states its registration in one clause. R2-08 and R2-35 at the other ends: T-V7-68
#   "takes T120-1's and T120-4's village clauses"; T-V7-59 takes T114-9's village clause (R2-27 (d); scope writes T114-9).
#   R2-09 at every V07 pin V12 §2.13 lists: T-V7-33 (`item105.web`), T-V7-38 (`item109.underground`), T-V7-58
#   (`item111.water`), T-V7-59 (`item113.history`), T-V7-62 (`item114.condition`), T-V7-63 (`item115.off`), T-V7-65
#   (`item117.season`), T-V7-66 (`item118.festival`), T-V7-68 (`item120.find`), each "— the `<pin>` registration of the
#   village (or palisade) goldens on V12 §3.7.8's engine (V12 §2.13), written by the <milestone> seat"; T-V7-52 keeps its
#   own registration sentence (item 110's switches, which V12 restructures this round, VV1112-r1-03).
# - VAT1-04 (FIX per R2-19): V07 §3.12's two sentences read the required text verbatim ("(no event of the port's session
#   `host:port` — a port epoch with or without a dossier change, a dossier event — is an undo target, §7.4 *Replay
#   semantics*; the host restores, item 87)" and "(a port epoch never is, §7.4 *Replay semantics*)"). R2-19's "every
#   restating sentence cites §7.4 *Replay semantics*" at the three V07 §2.6 lifecycle cells with the same narrower form and at
#   V07 §3.12's absorb sentence.
# - VV78-21: INVALID by R2-03 (V07-RESTATE-1 superseded by file f item 202; canon amended) — closed, no block.
# - VV78-r1-01 (FIX per R2-14): J-V7.136 reads "'specified' read as V08 §3.16 (3) reads it, or the author's placement"; W78's
#   producer "a dossier's specification (V08 §3.16 (3))", its dossier column R2-14's one gloss with "(V08 §3.16 (3))"; the
#   dossier trace's "a manor or hall record" (the retired "hall" reading) reads R2-14's gloss; T-V7-63 reads "when specified
#   (V08 §3.16 (3))" and its fixtures name a manor record and, at a HAMLET, a `castle` or `tower_house` record — the case
#   the issue found J-V7.136 missing.
# - VV78-r1-02 (FIX): V07 §8's price paragraph reads "§16's village line and INDEX §1 carry it"; l. 3555's "INDEX §4 carry
#   the same slot" stays.
# Receiving ends this round (Part H · V07): R2-28 (a) — V07 §3.16 (1) reads "where the site holds mining (`Terrain.mining`,
#   §4.2 S1 (10))", the restated test gone; R2-29 (b) — V07 §5.1's *The village through the year* and *Festivals* cite §8.2's
#   *Seasons* rows and *Festival decorations* (rendering's round-2 text, with the village readings in its place table and
#   cover rows) and keep only the village's own: which records each row reads (the great fields by rotation slot, the strips'
#   offset, the crofts and closes among the green and lawn faces, the toft yard parts among the garden yard parts, the
#   palisade and yard walls among the wall lines, the ponds, moat and leat by ice kind, the leat's take-off an open lead), the
#   village tiers' decoration kinds and the church lane (equivalence: every restated fact now lives in §8.2's rows; one
#   restated fact had no home there — creepers on the churchyard wall, which §8.2's creeper rule (buildings only) does not
#   reach — and falls to the base's rule by the ruling); R2-32 — T-V7-68 at the later of V-M3 and M5, V07 §8's V-M3 exit
#   and risk (13) likewise; R2-09 — T-V7-68's `item120.find` registration.
#
# JUDGMENT CALLS (vetoable; J122 where new design)
# (1) The main approach road at a village rung is the `through` entry whose bearing is DR3's partner of greatest weight,
#     else the `through`, then the `neighbour` entry nearest the heart by walking distance (§4.3's `TradeFlow` is a town's).
# (2) No siege line at THORP and HAMLET: item 122 (c)'s "a hamlet gets a war band's camp, a city a full siege line".
# (3) `affectedQuarter` at a village rung is a unit of V07 §5.6 (3) — `disasterSource`'s first `matched`, else the densest
#     — so the marked doors stand in one end, never over the whole village.
# (4) The units' `neighbours` read a district's seam at the plots: two ends facing across one way segment are neighbours.
# (5) Every share-of-units look at the village rungs counts as V01 §3.16 (5) counts districts (round(s × n) in [1, n] where s
#     > 0), since §10.2 (c) states no count and a village's places hold few units.
#
# NOTE FOR ASSEMBLE (R2-07; the level-1 title block, which a subsection block cannot reach): in docs/volumes/V07-village.md's
# head (l. 10), "items 1–120 the owner's, items 200 and" → "items below 200 the owner's, items 200 and" (one occurrence above
# the first `## ` heading; a list meaning every owner item states no upper number). Asked by G122-V07's verify-vol-V07-V08
# version ("the head's owner range"), in R2-07's form.
#
# HAND-OFFS (R2-05 (3): ends no ruling names, for round 3's verifiers; V07's side is written)
# - V01 §3.16 (1): the village rungs' units are `villageDisasterUnits` (V07 §5.6 (3)), their land `villageUnitPlots`; V01's
#   (3)'s "at the village rungs, V07's unit holding it" is V07 §5.6 (3)'s target rule.
# - pipeline §10.2 *Crisis looks*: (c) states no count for a share of a place's units — V01 §3.16 (5)'s count (V07 §5.6 (1))
#   would serve every rung; (d)'s places read at the village rungs as V07 §5.6 (2) states (the main approach road,
#   `affectedQuarter` a unit); (f)'s siege line is drawn at VILLAGE and above only (V07 §5.6 (1)); (d) keeps every look off a
#   way's carriageway while §8.2's `blockade`, `raiders` and `rebellion` barricades stand across ways — one of the two to name
#   the exception.
# - V06 §3.22 (2)'s village case ("the through road's entry") reads V07 §5.6 (2)'s main approach road.
# - V09 §4.21.12 (4): the facts row "of a field a famine leaves bare" is, at a village rung, the `VillageField` answer's row
#   (V07 §4.5) — shown once.
# - V11: the THORP, HAMLET and VILLAGE `scale` cells of `crisis.looks` encode V07 §5.6 (1)'s reading.
# - V12 §3.15.12 and T-V12-54's "V07's village test" is T-V7-69.
# - scope (§13.2's take-over table, V07 row): T114-9's village clause (T-V7-59), T120-1 and T120-4 (T-V7-68), T122-5 and
#   T122-6 (T-V7-69); §16's village line and INDEX §1: 30.5–43 pw (R2-06 (b)).
#
# CHECKS (executed)
# - Dry run: docs/validation/amendments-b/apply-blocks.py (assemble's applier) over the live V07 with this file's blocks
#   (its FILE line stripped, as assemble's router does): 21 found, 21 applied, 0 skipped, audit 0 not OK; headings 57 → 58;
#   fences balanced (16 → 18 fence lines); title block unchanged; the output byte-identical to V07.new.md (sha256
#   cb663d471ad61b32…); the rationale untouched.
# - References (work/repair-V07-r1/tools/refs7.py, V07FILE=V07.new.md): V07 3 464 resolved, 20 external, 0 ambiguous, 23
#   unresolved — every one a target a round-2 seat writes by ruling and not yet assembled: V06 §3.22 (8, landed in
#   repair-r2-V06.md), V09 §4.21.12 (5, landed in repair-r2-V09.md), T122-5, T122-6, T120-1, T120-4 (R2-35) and T114-9
#   (R2-27 (d)), written by scope this round.
# - doc_checks.py (docs/validation/bench/; WARNING printed: the reference corpus is INCOMPLETE in this checkout — captures,
#   research/patreon, research/devlogs, research/ftg-docs, research/external — so the result is NOT authoritative,
#   provisional): C1 0, C2 0, C4 1 (reviewed), S1 0; C3 363 hits against the live text's 349 — 13 new runs, every one
#   ordinary words or a pointer's digits (ALLOW rows below).
# - Words (wc -w): 94 314 → 97 881 (+3 567). Shrink sources: RESTATEMENT −561 (V07 §5.1 by R2-29 (b), V07 §3.16 (1) by
#   R2-28 (a)); NARRATION, DUPLICATED MECHANISMS, VERBOSE PROSE 0. The growth is new design (item 122's part, ≈ 3 300 words
#   across §5.6, §7, §9, §1, §1b, §3.17) and R2-08/R2-09's take-over heads and registration clauses (≈ 350); no rule, case,
#   value, bar, field, lifecycle row, test or decision was dropped.
#
# DOCUMENT CHECKS: the 13 new C3 runs, reviewed — each "# ALLOW " line below (prefix stripped; TAB-separated) may be
# appended to docs/validation/doc-checks-allow.tsv.
# ALLOW C3	2 7 2 9 s	repair-V07-r2 (2026-10-01): V07 §1's "(§2.7), §2.9's `crises` key" — section pointers' digits
# ALLOW C3	committed state and the view	repair-V07-r2 (2026-10-01): V07 §5.6 (7)'s and V07 §3.17's "re-derived from the committed state and the view" — ordinary words
# ALLOW C3	farthest from the heart the	repair-V07-r2 (2026-10-01): V07 §5.6 (2)'s "farthest from the heart" — ordinary words
# ALLOW C3	it to the town and	repair-V07-r2 (2026-10-01): V07 §5.2's "widens it to the town and its camps" — ordinary words
# ALLOW C3	of a village with no	repair-V07-r2 (2026-10-01): V07 §5.6 (3) and T-V7-69's "the toft groups of a village with no end" — ordinary words
# ALLOW C3	pass over the district s	repair-V07-r2 (2026-10-01): V07 §5.6 (8) and V07 §6's "one pass over the district's plots" — ordinary words
# ALLOW C3	shares an edge with a water	repair-V07-r2 (2026-10-01): V07 §5.6 (3)'s "a face of its plots shares an edge with a water face" — ordinary words
# ALLOW C3	stands in the view s	repair-V07-r2 (2026-10-01): V07 §5.6's "stands in the view's week" — ordinary words
# ALLOW C3	the walls and the edge the	repair-V07-r2 (2026-10-01): J-V7.146's "as the walls and the edge" — ordinary words
