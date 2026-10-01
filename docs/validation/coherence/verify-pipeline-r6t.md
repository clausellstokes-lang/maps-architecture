# Verify — pipeline (base §4, §10, PART II, PART III) after repair round 6

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-pipeline-r6t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-pipeline-r6t`, 2026-10-01, cloud checkout)
- P0 brief read whole (incl. ROUND-6 NOTES and ORCHESTRATION NOTES); resume check: no output, no LANDED line — fresh start: done
- P1 inputs: verify-pipeline-r5t (2 findings), adjudication-r6 (How to read, Summary, R6-01, R6-02 whole with (P1)–(P14), the two
  tables, the attacks and the equivalence; R6-03 whole; R6-10; Part H · pipeline and every END naming pipeline; Part P; Part I),
  assemble-r6 (pipeline: 9/9 blocks, 25 hunks, its census of open hand-offs), repair-r6-pipeline header, repair-r6-determinism's
  HAND-OFFS, the landed r6t results of the other seats (to keep ids apart): done
- P2 diff of the live base (sha256 f39f1c30…, = assemble-r6's output) against assemble-r5's (2d84eac2…, commit 52a16b0): 25
  hunks in scope — §4.1, §4.3 (4), §4.4 (6), §4.5, §4.8 (4), §4.9, §4.11 (5), §4.13 (2), II.7.6; none in §10 or PART III: done
- P3 round-5 findings re-checked against the live text, with every END line's second end: done (both fixed)
- P4 every round-6 hunk re-read whole in its subsection; R6-02 (6) (b) (i)–(iii); R6-03's held clause; sweeps for retired
  machinery; the untouched §4 texts the new tables now govern (§4.2 S3 (5)–(10), §4.3 *Routes*, §4.7 S10 (0), §4.11 *Other
  crossings*): done
- P5 result file, LANDED: done

## Method

* Live text read at every site (line numbers are the live base's, `docs/ARCHITECTURE.md`, 23 140 lines). Old text from
  `git show 52a16b0:docs/ARCHITECTURE.md` (assemble-r5's base, which every round-6 repair file was written against).
* Word-level diff of each of the 25 in-scope hunks; each hunk then read whole in its paragraph, and its subsection read for
  what the new words now govern.
* R6-02's model home read whole at §2.7 (l. 2557–2711: (6)'s lead, the way-and-channel table l. 2568–2586, the crossing
  table l. 2591–2710), so each citation is checked against what stands, not against the ruling's draft.
* Grades by J141's SEVERITY STANDARD and R6-01's grading note.

## Part 1 — round-5 findings (re-checked against the live text)

| id | r5 grade | adjudication-r6 | verdict now | evidence |
|---|---|---|---|---|
| VPC-R5-01 | major | MERGED into VM-R5T-01 (FIX per R6-02, amended: the strips run on) | **FIXED** | §4.1's S7 row (l. 5051) is (P1) word for word; §4.8's lead (l. 7692) is (P6), the report clause narrowed as repair-r6-pipeline says (the meaning of *over the band*'s "unreported" kept), the tower rule present ("no tower or gate in its under-deck strip … moved clear of it"); §4.13's `wall` cell (l. 9060) is (P11); §4.4 *Outer moats* (l. 5989) is (P3). Second ends: §7.3's S7 row (l. 10927) is (D10); V06 W68 (V06 l. 351) and V06 §3.7.1 (V06 l. 1464–1465) and §3.7.6 (5) (V06 l. 1594–1609) cite the crossing table with no stopped strip. 0 hits for "strips stopped/stopping" in the base and volumes (the only "stopped at the under-deck strip" hits are channels, row (e)). |
| VPC-R5-02 | major | FIX per R6-02, amended (P9) | **FIXED** (a new edge on the new text: VPC-r6-02) | §4.11 `wallToWay` (l. 8282) is (P9), with the one wording change repair-r6-pipeline records ("meets it as a way laid after it"; meaning unchanged); no kept stretch anywhere in scope. Second ends: V06 §3.7.6 (5)'s bullet (V06 l. 1601–1603) (V6-10); T-V6-47 (V06 l. 4170) runs `wallToWay` of the CITY ring and of the METROPOLIS circuit with "the ring road crossing each under-deck strip under a span §4.3 admits, else ended at the strip's edges" (V6-21); T110-2 (8) (l. 18615 ff.) is (S1) (8). |

## Part 2 — the round-6 blocks in scope, hunk by hunk

Every binding text R6-02 (P1)–(P14) and R6-03 (1), (4) gives pipeline is written at its site, and the three END lines under
Part H · pipeline (P5, P10, §4.9's drawing-group switch) are written. Written as given except the two wording changes
repair-r6-pipeline records ((P9)'s "meets it as", (P6)'s report clause), both meaning-preserving (checked against the
crossing table's *over the band* "unreported" and *beneath*'s "Reported once per crossing … with that raised way's deck line").

| site (live l.) | text | verdict |
|---|---|---|
| §4.1 S7 row (5051) | (P1) | ok |
| §4.3 *Lattice and costs* (5743, 5745) | (P14), both edits | ok |
| §4.3 *Lattice and costs* (5749) | the seat's sweep: ladders → row a | ok (row (a)'s ladder cell holds each one) |
| §4.3 *Where it may not go* (5846) | (P2) | written as ruled; see VPC-r6-01 (the S3 gate routes it does not reach) |
| §4.4 S5a *Trace* (2) (5946, 5948) | (P12) | ok (VEW-r6-01, edges-world's, is the unpinned-crossing gap here; not re-raised) |
| §4.4 S5a *Outer moats* (5989) | (P3) | ok; its "reported" reading is VDC6-02 (a), carried as VPC-r6-05 |
| §4.4 S5b (6002) and its Test (6005) | (P4) | ok |
| §4.4 S5c (6037) | the seat's sweep: impassable set → §4.3, row a | ok |
| §4.5 casters (6232) | (P5) | ok |
| §4.8 lead (7692) | (P6) | ok |
| §4.8 *Condition at generation* (7722) | (P7) | ok |
| §4.8 *Gates* (7729–7730, 7739) | (P8), three edits | ok; the gate-plaza sentence stands, every main gate on ground part 0 |
| §4.9 (8010) | END of VAT-r5-04 | ok (`StyleSheet.groups.trees` resolves at §8.2, l. 12601) |
| §4.11 `wallToWay` (8282) | (P9) | written; see VPC-r6-02 |
| §4.11 carve (8300) | (P13) | ok |
| §4.11 *The clock* (1) (8510) | R6-03 (1) | ok |
| §4.11 *The clock* (4) (8531) | R6-03's Decision text | ok — word for word, nothing held in the binding; VEL6-r6-03 (V08's) holds an END here |
| §4.11 frame batches (8566) | (P10) | ok |
| §4.13 river, coast, moat (9058) | (P11) | ok |
| §4.13 wall (9060) | (P11) | rung column — VPC-r6-06 (= VAL-R6-07) |
| II.7.6 *Vaults* (21819) | the seat's sweep: a `vault` span under a wall read `open` | ok |

### R6-02 round-6 note (6) (b)

* **(i) each cell my scope reads gives one outcome and names a test.** W1 (S3's and S5a's traces with S7's strips, towers and
  gates, S10's band; S5d's re-run arc), W3 (a regeneration's S3–S7), W7 (`wallToWay`) and rows (a), (c), (d), (e): one outcome
  per cell (W1·C1 one per kind: an aqueduct *over the band*, a road deck *down before the wall*), each naming T110-2 (1)–(8),
  T110-3, T-V6-47, T-V7-48 or T-V4-63, all of which exist (T110-2 l. 18522 ff., clauses (1)–(8)). Two events in scope reach no
  working cell: S3 (5)/(7)'s gate routes (*down before the wall* names S4's viaduct, but S3 solves those routes before any
  boundary and S4 commits them unsolved — VPC-r6-01), and a carve's or a moved river's re-traced run (no row; its dry run
  refuses what *beneath* passes — VPC-r6-03).
* **(ii) no restatement and no retired machinery.** 0 hits in scope for "crossing station", "raised gate", "wall opening",
  "held stretch", "wall arch", "arch in the curtain", "gate's line", "support step (3)", "(6) (a)", "(6) (b)", "(6) (d)",
  "built against", "taken into", "free-standing", "station on the band", "stopped at the under-deck" (wall sense). §4.3
  *Where it may not go* carries (P2)'s own longer wording, the ruling's binding text, not the seat's restatement. The one
  "layer toggle" left (II.6, l. 21009) is a model layer's (§2.1), not the trees switch.
* **(iii) every citation names an outcome or row that exists.** Each of the 25 citations of the two tables and of the support
  step in scope (l. 5051, 5743, 5749, 5817, 5846, 5946, 5948, 5989, 6002, 6037, 6232, 7692, 7729, 7739, 8282, 8300, 8566, 9058,
  9060, 21819) names *beneath*, *over the band*, *down before the wall*, row a, c, d or e, or support step (6) or (7), each
  present at §2.7.

### R6-03

§4.11 *The clock* (4) is R6-03's Decision text; (1) is VEL5-r5-01's. In scope: 0 hits for `lateCalamities`, "held late",
"last folded"; the only "held in the binding" reads "nothing is held in the binding". No held-calamity clause stands in scope.

### Seen, owned elsewhere, not re-raised

* VEW-r6-01 (edges-world, major, pipeline): S5a's pull crossing an arterial on its ground course beyond a foot with no pin.
  Confirmed on the live text (l. 5946–5948); not re-raised.
* VEL6-r6-03 (edges-life, major, V08) holds an END at §4.11 *The clock* (4) ("a condition naming it (V08 §3.16 (7) (d))").
* VDC6-02 (determinism, minor) names pipeline ends at S3 (10) and S5a *Outer moats*; they are this seat's VPC-r6-05, one fix.
* VAL-R6-07 (agree-layers, minor, pipeline) is §4.13's `wall` rung; this seat's VPC-r6-06, one fix.

## Part 3 — new findings (round 6)

### VPC-r6-01 · major · EDGE-UNDEFINED · owner pipeline — a viaduct on S3's gate route meets the stage-1 trace with no outcome

R6-02 removed the raised gate that carried "an S4 viaduct across S3's ring" (§4.8 *Gates*' old raised-gate clause and its
paragraph, (P8)) and made every road deck come down before a trace standing when its course is laid (§4.3 *Where it may not
go*, l. 5846: "a deck priced in a route's solve comes down to a ground vertex before the trace … (at S5b the stage's picked
boundary counting as standing …)"; §2.7 *down before the wall*, l. 2606–2614, "S4's or S5b's viaduct"). But S4's gate routes
are solved at **S3 (5)**, before any boundary exists — "the gate routes are solved first, the stage-1 boundary is the
travel-cost level set over them" (l. 5451) — with S4's cost function, so CITY and METROPOLIS spans are priced there (§4.3 *The
rung gate*, l. 5833; S3 (9) (a), l. 5604–5605, names "a viaduct over it" on a (5) route). S3 (7) then places each gate at "the
**first point at which its solved route, walked outward from its plaza, reaches `T = t_1`**" (l. 5564–5565), which may lie on a
priced span; S4 "commits the gate routes solved at S3 … without re-solving" (l. 5755), re-solving only a stretch a moat crosses
(l. 5758–5761); and the stage-1 trace is committed only at S5a after S4 (§4.1's S5 row, l. 5049: "k = 1 — S5a L1: S3's trace").
Nothing makes S3 (5)'s solve or S4's commit bring that deck down: the exclusion counts only "at S5b the stage's picked
boundary". Builders differ: one keeps the gate on the deck (against §4.8 *Gates*, l. 7729, "on ground part 0", *beneath*'s "No
gate on the deck", and S5a *Trace* (2)'s "an arterial crossing the boundary on a raised deck pins no gate there", which S3 (9)
applies — so N₁ − 1 gates); another re-solves the route at S4 as for a moat stretch; a third reads the S3 trace as not yet
standing at S4 and lays the trace after the deck (*beneath*). T110-2 (2) (l. 18549) asserts "a CITY whose S4 route's best
course crosses a valley at S3's gate, its deck down before the trace and its route through the gate on ground part 0", which no
mechanism produces. The path is a common one at CITY and METROPOLIS on valley sites (and at every regeneration that re-lays S4's
viaducts, W3·C1).

**Required change.** §4.2 S3 (7), after "on the boundary by construction; the gate keeps the pick's identity, ordinal, bearing
and route." add: "A route whose first point at `T = t_1` lies on a raised stretch of its solved course (a viaduct (5)'s solve
priced, §4.3) is re-solved whole as (5) solves it, every deck edge across the stage-1 boundary excluded (the boundary counting
as standing, §4.3 *Where it may not go*; §2.7's crossing table, *down before the wall*), and its gate is the re-solved route's
first point at `T = t_1`, on ground part 0; `T` and the boundary keep (5)'s routes and are not re-derived; a route the re-solve
cannot serve takes F-ROUTE's ladder (§5.2), reported." §4.3 *Where it may not go* (l. 5846): "(at S5b the stage's picked
boundary counting as standing;" → "(at S3 (7) the stage-1 boundary, from S3 (9) on its trace, and at S5b the stage's picked
boundary counting as standing;". END at model: §2.7 *down before the wall* (l. 2607) "— at S5b the stage's picked boundary
counting as standing;" → "— at S3 (7) the stage-1 boundary, from S3 (9) on its trace, and at S5b the stage's picked boundary
counting as standing;".

### VPC-r6-02 · major · EDGE-UNDEFINED · owner pipeline — `wallToWay`'s re-route reads a `vault` span under the old wall both ways

(P9) (l. 8282) re-routes the ring road "in the dry run … to cross under the nearest span §4.3's crossing rule admits", and in
the same commit "V04 lays again the arch vault of a `vault` span the old wall stood over". The crossing rule bars "a `vault`
span's under-deck strip", but reads "a `vault` span under a wall … `open`" (way-and-channel table lead, l. 2576–2578), and
*beneath* reads it `open` "while that band or strip lies there" (l. 2640–2645). In `wallToWay`'s dry run the band and strips
still lie there; they go only with the op (l. 8278–8281). Under *beneath* the old line itself crosses an aqueduct's deck line
under a span (l. 2618–2620), which may be a `vault` span. One builder reads the pre-op state: the span is `open`, the crossing
admitted, the ring road kept on the old line under it — then V04's reconcile (V04 l. 328, 867: "the commit of every enceinte
band or wall strip … removed over a `vault` span's under-deck strip … `wallToWay`") lays the arch vault's chamber at grade
across the new road, failing T110-2 (8)'s and T-V6-47's "0 way corridors over … a `vault` span's strip" (T110-2's lead counts
"`vault` spans no wall stands over"). Another reads the post-op state and re-routes the road under another span. H-AQUA's
aqueduct carries `vault` spans (T-V6-47 breaches one), so T-V6-47's `wallToWay` runs reach the case.

**Required change.** §4.11 `wallToWay` (l. 8282): "to cross under the nearest span §4.3's crossing rule admits" → "to cross
under the nearest span §4.3's crossing rule admits, each `vault` span the old wall stood over read `vault` (no band or strip
lies there once the op commits; §2.7's crossing table, *beneath*)". END at model: the way-and-channel table's row (c) outcome
(l. 2584) "the same, the old line being where it is laid" → "the same, the old line being where it is laid and a `vault` span
the old wall stood over read `vault`". END at scope: §13.2 T110-2 (8) adds "and the same on a fixture whose old line passed
under a `vault` span of a standing aqueduct — the ring road re-routed under another span, the arch vault laid again with no
way corridor over its strip".

### VPC-r6-03 · major · CONFLICT · owner pipeline — a carve's re-traced run refuses what *beneath* passes

§4.11 *Other crossings* (l. 8302–8312): the run of a wall a carve crosses is re-traced by S7's operator; "Every way the
re-traced run's new strips … will meet, other than a kept way through a gate of the run …, takes the `cut` fate", and "A
locked or pinned way, wall or finer entity, or a reservation, inside `S` or inside a new strip returns to the dry run as an
F-EDIT conflict". §7.3 (b) 3 (l. 11027–11029) says the same for S1's water operator. A raised way's supports, ramps, stairs,
feet and `vault`-span strips are "a **reservation** on ground part 0" (§2.7's support step (6), l. 2565–2567), and a raised
way is a way. Before round 6 the new strips stopped at the under-deck strip's edges, so they held none of these; round 6 runs
the strips (and the band, through a road deck's support) on beneath the deck (§2.7 *beneath*; M1: "a support may stand" in the
setback and glacis). Now §4.11 refuses the carve (or cuts the raised way) where §7.3's S7 operator meets the raised way "by
§2.7's crossing table (*beneath*) — nothing of the raised way re-derived" (l. 10927), *beneath* lays the strips "as anywhere",
and §7.1's lock row (D5) says a lock never refuses "a carve or a wall stretch passing beneath a locked or pinned raised way's
deck". The crossing table has no row for this event (W2 names "a hand `drawWall`, a moved trace vertex or a re-anchored
stretch"), and *beneath*'s bent group does not list it. Two outcomes for one case: MAJOR (R6-01).

**Required change.** §4.11 *Other crossings* (l. 8307–8312): "other than a kept way through a gate of the run (whose corridor
ends each strip, §4.8)," → "other than a kept way through a gate of the run (whose corridor ends each strip, §4.8) and a raised
way, whose deck passes over the run,"; and after "returns to the dry run as an F-EDIT conflict (lock > drawn geometry; Re-derive
from S3 offered for a reservation, §5.2), as for S1's water operator." add "A standing raised way — locked, pinned or neither —
and its reservation are no conflict: the re-traced run meets it by §2.7's crossing table (*beneath*, row W2), bent locally where
*beneath* says, each bend a fate, nothing of the raised way changed (§7.1's lock row)." END at determinism: §7.3 (b) 3 (l.
11027–11029) "or a reservation there — returns to the dry run (§7.1's outcome table)" → "or a reservation there (never a
standing raised way or its reservation, which a re-traced run meets by §2.7's crossing table, *beneath*) — returns to the dry
run (§7.1's outcome table)". END at model: the crossing table's W2 event cell (l. 2699) "a hand `drawWall`, a moved trace
vertex or a re-anchored stretch" → "a hand `drawWall`, a moved trace vertex, a re-anchored stretch, or a run a carve or a moved
river re-traces (§4.11 *Other crossings*; §7.3 (b) 3)"; *beneath*'s bent-group list (l. 2628–2629) adds "a run a carve or a
moved river re-traces". END at scope: T110-2 (5) adds "a hand carve of a canal across a ring beneath which a standing locked
aqueduct passes, the re-traced run's strips meeting its supports: no F-EDIT conflict, the run *beneath*, the aqueduct
unchanged".

### VPC-r6-04 · minor · WIRING · owner pipeline — row (e)'s "as on a dry stretch (§4.7 S10 (0))" points at a list without the case

The way-and-channel table's row (e) (l. 2586) and T110-2 (3) (l. 18564–18565) say a moat stopped at an under-deck strip leaves
"the wall's outer strip closed across the under-deck strip as on a dry stretch (§4.7 S10 (0))". S10 (0) (l. 6871–6874) types
`ditch` "along a moat's dry stretches, §4.2 S3 (10)" — S3 (10)'s water-level stretches only — and §4.8 *Wall strips*
(l. 7699–7701) bounds the outer strip "by the moat's inner bank" wherever "a moat runs along the wall", naming no stopped gap.
A builder of S7 and S10 (0) reading the cited homes types that gap `glacis`; row (e) says dry-stretch (`ditch`). The home
states the outcome; the cited sections omit it.

**Required change.** §4.7 S10 (0) (l. 6873–6874): "and along a moat's dry stretches, §4.2 S3 (10))" → "and along a moat's dry
stretches, §4.2 S3 (10), and across an under-deck strip where a moat is stopped, §2.7's way-and-channel table, row (e))";
§4.8 *Wall strips* (l. 7700–7701): "— or, where a moat runs along the wall, by the moat's inner bank, the strip then being the
band's half plus the berm." → "— or, where a moat runs along the wall, by the moat's inner bank, the strip then being the band's
half plus the berm; across an under-deck strip where the moat is stopped (§2.7's way-and-channel table, row (e)) by the glacis
line, as on a dry stretch."

### VPC-r6-05 · minor · WIRING · owner pipeline — S3 (10)'s moat at a regeneration, and S5a's report (one fix with VDC6-02)

repair-r6-determinism's hand-off to pipeline (assemble-r6 §2.1: "not written by either seat this round") is open: S3 (10)
(l. 5621–5651) carves the city moat and canals with no raised-way text, though at a regeneration a held raised way stands before
it (§2.7 (6)'s lead) and row (e) names "a moat (S3 (10)'s …)" and reports a stopped one; and §4.4 *Outer moats* (l. 5989)
"the trace meeting it … (*beneath*) and the channel … (row e), reported (`W_RAISED_CROSSING`)" can be read as S5a reporting the
trace crossing that §4.8's lead (l. 7692) has S7 report, against *beneath*'s "Reported once per crossing" (l. 2656–2657).
Bookkeeping only; nothing built changes.

**Required change** (VDC6-02's pipeline ends, as it words them). §4.4 S5a *Outer moats*: "the trace meeting it by §2.7's
crossing table (*beneath*) and the channel by its way-and-channel table (row e), reported (`W_RAISED_CROSSING`)" → "the trace
meeting it by §2.7's crossing table (*beneath*; its crossings S7's to count, §4.8) and the channel by its way-and-channel table
(row e), a channel stopped there counted in S5a's `W_RAISED_CROSSING`"; §4.2 S3 (10), after "Every deck has S1 (5)'s form and
its two states." add "A raised way standing when this step carves — at a regeneration, one held (§2.7's support step (6)) —
meets the moat and the canals by §2.7's way-and-channel table (row (e)), each channel stopped at its under-deck strip counted in
S3's `W_RAISED_CROSSING`." (§5.4's comment is determinism's, VDC6-02.)

### VPC-r6-06 · minor · CONFLICT · owner pipeline — §4.13's `wall` cell gives no rung for a deck not built (one fix with VAL-R6-07)

(P11)'s cell (l. 9060) ends "*Rung:* — (defined)" (no failure), while *down before the wall* (l. 2606–2614) leaves a road deck
"not built, reported" at generation and waiting at an epoch, and bends a hand course (`bend.raised.wall`); the same row's river
cell states its rung. The crossing table governs; nothing built changes.

**Required change** (VAL-R6-07's words). §4.13's raised-way `wall` cell: "*Rung:* — (defined)" → "*Rung:* leave out and report
(a road deck that cannot come down before a standing trace, at generation; at an epoch it waits, V06 §3.19 (5)); simpler shape
(declared, bent: `bend.raised.wall`, `bend.wall.aqueductArch`)".

## Part 4 — size (principle (9))

Round 6 left the unit at 116 351 → 116 417 words (+66, +0.06 %; repair-r6-pipeline's count, consistent with the 25 hunks):
ruled additions (*down before the wall*'s lattice exclusion, S5b's coming down and its Test, S5a's impassable parts and ramp pin,
`wallToWay`'s re-route, the late calamity's uncarried path) against restatement removed (§4.3's ladders, S5c's impassable set,
§4.8's raised-gate paragraph, §4.11's carve and §4.13's cells now citing the tables). No unit shrank by more than half, so no
whole-unit nuance audit is due; each removal was checked against R6-02's equivalence list (the gate law on ground part 0 at
§4.8 *Gates* and S5b; a part-0 way's own ground gate at S5a *Outer moats*; the quay's corridor still an obstacle at (3)) — no
nuance lost.

## Totals

Round-5 findings: 2 re-checked, 2 FIXED (one through VM-R5T-01). New: 6 — 0 blocker, 3 major (VPC-r6-01, -02, -03), 3 minor
(VPC-r6-04, -05, -06; -05 and -06 one fix each with VDC6-02 and VAL-R6-07).
