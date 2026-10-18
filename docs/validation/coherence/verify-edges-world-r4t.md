# Verify — edge cases and combinations across the physical world, round 4 (coherence/verify-edges-world-r4t)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-edges-world-r4t; covered by the
> whole-design retrovalidation (J84).

> PROGRESS (kill-safe ledger)
> - P0 resume check (no output, no LANDED line): fresh start — done
> - P1 brief whole; r3t report (5 issues); adjudication-r4 R4-01, R4-09 and Part H (scope, model, pipeline, determinism, V01, V05, V06, V09, V11); assemble-r4 (live sha256 = its "after" column) — done
> - P2 the 5 round-3 findings re-checked against the live text (with END lines' second ends) — done (5 of 5 fixed)
> - P3 the round-4 blocks in scope walked whole for new edge problems (word diffs against HEAD `96bdae26`) — done (4 new)
> - P4 owner items 111–126 parts (mention counts never fall in any member) and phone census (item 126's own lines only) — done
> - P5 report, result JSON, LANDED — done. Design files untouched.

Members: model, kernel, pipeline, rendering, V01, V02, V03, V04, V05, V07. Design files untouched; this seat writes no
design text.

## Method

* **The round-3 findings.** Each of the five ids of `results/coherence_verify-edges-world-r3t.json` was re-checked at every
  home its Part H disposition and its END lines name (adjudication-r4 Part H under scope, model, pipeline, determinism,
  V01, V05, V06, V09 and V11). Where Part H says "per R4-09", R4-09's binding text was the bar, not my round-3 wording.
* **The round-4 blocks in scope.** Line and word diffs of the base, V01–V07, V09 and V11 against HEAD `96bdae26` (scratch
  `scratchpad/coherence/edw4/`). The changed physical subsections were then read whole at their limits:
  * base: §2.6 step 7 and the Works stage; §2.7 `RaisedWayRecord`, `RaisedFoot`, `HistoryHint`, the support step (3)
    and (6) (a)–(b), *The clearance*, the span rule; §3.2 (9) (the `attractCm` threshold of a frame growth); §4.1's S7
    row; §4.3 *Lattice and costs*, *The slot*, *Where it may not go*; §4.4 S5a *Trace*, *Outer moats*, S5b, S5c's
    legality; §4.8's lead, *Condition at generation*, *Gates*, *Water furniture*; §4.11's carve, the frame growth's
    batches and *The clock* (4); §4.13 EP-27 and the raised-way rows (`river, coast, moat`, `wall`); §5.3's invariants;
    §7.1's three raised-way outcome rows and *Delete*; §13.2 T110-2, the item-114 group, T76-1's calamity fixtures;
  * volumes: V01 §3.16, §3.17.3; V02 and V03's look-unit hunks; V04 §1b, §3.5.0 *At an epoch*, §3.10, T-V4-63; V05
    §3.16 (the landfall table and record) and T-V5-14's raised-gate fixture; V07 §3.5a (1)–(10), §5.6 (2); V06 §3.6 (4),
    §3.7.1, §3.7.6 (5), §3.19's lead, §3.19.2 (3)–(5) and J-V6.108 (read where a member's edge meets them).
  * The new rules were crossed with the raised way's own limits (one span, ramps and stairs, a fallen deck, a `vault`
    span), with the S7 parts the last support run meets (strips, plazas, quays, piers, moles), with the village palisade,
    and with S5a's pinned gates. That is where the four new findings lie.
* **The catalogue.** `edges.json`'s combinations for these members were read (C-wall-raised, C-river-raised,
  C-harbour-raised, C-raised-history, C-vault-village, C-raised-edit among them). They are coarse pairs; each new finding
  below is a finer case inside one of them, so each is also a CATALOGUE-GAP.
* **Owner items.** Every member's mentions of items 111–126 (and their T-ids) were counted before and after the round;
  no count falls. A phone census (phone, mobile, handset, narrow class, 390 ×, bottom sheet) over the base, V01–V05 and
  V07 finds only item 126's own statements (base l.94, l.265, l.313–314, l.18660, l.20227, l.22858).
* **Peers.** The fourteen landed r4t result files were read first (67 issues), so that none is repeated here. Findings in
  this lane's ground that peers already carry are cross-referenced, not raised again:
  - VM-R4T-01 = VPC-R4-01: the last support run's missing rung for an S5b or S5c way (and the intervallum lane);
  - VM-R4T-02: a locked raised way at a Re-derive, untested;
  - VM-R4T-06: §4.3's "before the span rule has run" regime after (6) (a)'s S5a re-run;
  - VDC4-03: `bend.raised.underSpan` with no `open` span that holds the way or channel;
  - VDC4-04 and VDC4-05: a hand `delete` of the enceinte, and §4.11's `wallToWay`, under a crossing station;
  - VAL-R4-02: V07's trackers under a span; VAL-R4-03: a crossing station carried down onto the palisade;
  - VAL-R4-04 = VV34-r4-01: a frame growth's deck extension moving the old piers.
  - VEW-r4-03 differs from VM-R4T-01/VPC-R4-01: theirs is a way the last run's rung does not name; this one is the S7
    way parts the rung does name, whose "ending at the ring and resuming beyond it" leaves the way's connectivity open.
  - VEW-r4-02 differs from VAL-R4-02/03: theirs are trackers and a carried-down station; this one is the palisade laid
    across a `vault` span.
* **No document checks were run** (this seat writes no design text).

## Round-3 findings re-checked (P2)

Live text: each member file equal to assemble-r4's "after" sha256 (base `5f34cceb…`, V01 `a0c15b71…`, V02 `2579cb16…`,
V03 `9af5ffd5…`, V04 `6aebc1e1…`, V05 `ef99abd9…`, V06 `ef22171a…`, V07 `a55c4d08…`, V09 `b49c6014…`, V11 `47b14d9f…`).
The pre-round text for the diffs is HEAD `96bdae26` (each file equal to assemble-r4's "before" column). All five ids are
FIX or FIX per R4-09 in adjudication-r4 Part H (none MERGED or INVALID); the bar was R4-09's text where Part H says so.

| id | owner | Part H | verdict | where it stands now |
|---|---|---|---|---|
| VEW-r3-01 | pipeline | FIX per R4-09, BLOCKER | **fixed** (every end) | §4.3 *Lattice and costs* (l.5623–5634: rings, ramps, stairs, feet and `vault` strips impassable after generation and where held; the crossing under an `open` span with `clearWidthM`, *The clearance* and `squareDeg`; the shift-else-F-ROUTE ladder); §4.4 S5c's legality (l.5931–5935); V01 §3.17.3 (3) (l.2471–2478) by §4.3's rule; V06 §3.6 (4) (l.1433–1436) and §3.19's lead (l.2736–2742); V09 §4.9 `bend.raised.underSpan` (l.2094); V11 §3.24.2 (l.709, l.3958–3962); §7.1's row (l.10594); T110-2 (5) (l.18418–18420). The generation half (§4.3 l.5629–5632) leans on the last support run sliding a pier off a later way; that run's missing rung for a way is peers' VM-R4T-01 = VPC-R4-01, and the hand bend with no `open` span that holds the way is VDC4-03 — cross-referenced, not re-raised. |
| VEW-r3-02 | model | FIX per R4-09 | **fixed** (every end) | §2.7 (6) (a) (l.2586–2594: the run after S7's batches, before S7b, keys kept, every S7 obstacle listed, the S7 part giving way where a station can neither slide nor omit); §4.1's S7 row (l.4932); §4.3 *The slot* (l.5701–5702); §4.8's lead (l.7590–7593); T110-2 (3) (l.18412–18413). |
| VEW-r3-03 | model | FIX per R4-09 | **fixed** (every end) | §2.7 (6) (a) (l.2577–2586: a crossing station on the deck at its level, never on a ramp or a stair; a trace meeting a ramp or stair bent to the nearest station at deck level; berm and channel stopped at the strip's and the ramp's edges) and (b) (iii) (l.2601–2608); §4.4 *Outer moats* (l.5876–5881); V06 §3.7.1 (l.1462) and §3.7.6 (5)'s second and continuity bullets (l.1596–1606); T110-2 (2) (l.18410–18412). |
| VEW-r3-04 | model | FIX | **fixed** (every end) | §2.7 (3) (l.2562–2568) and the `supports` comment (l.2292); V06 §3.19.2 (3) (l.2919–2923), (4) (l.2929–2934), (5) (l.2939–2943); V05 §3.16's pier row (l.1342) and l.1353; §13.2's item-114 group T114-3 (l.18469–18472). |
| VEW-r3-05 | model | FIX per R4-09 | **fixed** (every end) | §2.7 (6) (a) "S4's, or an S5b viaduct, the stage's own included" (l.2576–2577); §4.8 *Gates* (l.7643–7646); T110-2 (2)'s stage-2 S5b fixture (l.18410–18411). |

All five close. The adjacent raised-way gaps that peers' r4t seats already carry are listed under *Peers* in the Method
and are not raised again here.

## Round-4 blocks walked (P3): checked and holding

* **The raised way held after generation (§2.7 (6) (b)).** Ways cross only under an `open` span by §4.3's rule (clear width,
  *The clearance*, `squareDeg`), the shift-else-F-ROUTE ladder giving every generated route an outcome. S5c deflects or
  ends at the strip. S8 holes its plots. A moat's or a carve's channel passes only under an `open` span (§4.11's carve,
  l.8212–8214). A V06 circuit or a hand trace is bent through a station on the deck at its level; its strips stop where a
  support, ramp, stair or foot stands in them or the span is `vault`. The station's support takes the pier's former ring,
  so no clear span grows. V04's vaults follow by one trigger (V04 §1b, §3.5.0, §3.10, T-V4-63). Gaps: VEW-r4-01 (no
  untaken station at deck level) and peers' VDC4-03.
* **The last support run at generation (§2.7 (6) (a)).** It runs after S7's batches, keys kept, every S7 obstacle read; an
  S7 strip, plaza or square is cut round a kept station. Gaps: the way parts (VEW-r4-03); peers' VM-R4T-01 for S5b/S5c ways.
* **The crossing station's support (§2.7 (3)).** It reads its stretch's `condition`; salvage and topple pass over it. A
  landfall breaches it and ruins the spans beside it (V05 §3.16's wall and pier rows; the station is not a landfall
  member, l.1353). `repairRaised` beside a fallen stretch repairs it first by `repairWall`, in patch material, a
  `dismantled` stretch taking the op's bend; the repair ends the members' cover (J-V6.108). T114-3's landfall clause runs
  it (V05 T-V5-14).
* **A trace through a station whose spans have already fallen.** (b) (iii) makes it a crossing station, and by (3) it is
  an ordinary run from the next epoch, so the outcome is defined. A part-0 way under a fallen `open` span crosses as under
  any `open` span; the rubble lies at the span's foot (§8.2's raised row), and V06 §3.19.2's filter reads only the way the
  deck carries.
* **A span set to `vault` over a street.** V09 §4.20.6 (2) (l.3180–3184) disables the chip with its reason ("A street
  passes under this arch"), so no vault is laid over a way by the app.
* **Frame growth (§3.2 (9)).** The `attractCm` threshold keeps the current frame or arena where a growth would move a side
  out by at most `attractCm`. The frame is centred and of fixed aspect, so the kept case only defers a small growth; the
  growth with no arena growth is peers' VKr4-01. A ring-end foot moves in its own batch between part 0's two L0 batches,
  then the deck is extended. The piers' fate under that extension is peers' VAL-R4-04.
* **EP-27 and §4.13's raised-way rows.** A carriageway holds only a barrier across it. A refugee camp of two heads is
  defined. The `wall` row names the palisade (whose `vault` case is VEW-r4-02).
* **Item 114 at a crossing station.** S7's generation row reads a `breached` draw as `worn` there, and `DeclineOp`, V06's
  decay and a hand op pass over it (`bend.wall.held`). The delete is peers' VDC4-04.
* **V07's village camps (§5.6 (2)).** Every place falls back to a nearest `campLand` face, else §10.2 (d)'s ring marks.

## Issues

### VEW-r4-01 — MAJOR, EDGE-UNDEFINED (CATALOGUE-GAP: C-wall-raised × C-raised-history), owner model

**A trace crossing a standing raised way that has no untaken station on the deck at its level.**

(b) (iii) (l.2601–2605) makes an enceinte's trace cross a standing raised way "through one station on the deck at its
level — the one nearest where the trace would cross, the trace bent along the deck to pass through it, the station never
moved". The same holds for a locked or pinned one at generation (l.2592–2593). Its readers say the same with no else:
* §7.1's `bend.wall.raisedCrossing` row (l.10593);
* V06 §3.7.6 (5)'s second bullet (V06 l.1596–1598);
* V09's line.

Two reachable cases have no such station:
1. **No interior station at deck level.** (2) gives n = max(1, round(L ÷ p)) spans and n − 1 interior stations
   (l.2533–2534). So a raised way shorter than 1.5 p has none: under 12–22 m masonry, under 6–12 m timber (V11
   §3.24.2). Examples are a drawn footbridge-like raised way, a short elevated link, or a short viaduct. Nor does one whose
   every interior station stands on a ramp or a stair, which (6) never takes.
2. **The nearest station already taken.** It may already be another enceinte's crossing station. Examples are an epoch's
   contraction or re-anchored stretch, or a second hand `drawWall`, within p ÷ 2 of a standing crossing. (3)'s "each
   taking the nearest interior station not yet taken" (l.2548–2550) holds only at generation. (iii) has no such clause, so
   two bands would share one support, whose `supports` entry "reads its stretch's `condition`" — of two stretches.

(b) forbids adding a station, and the alternatives are barred too:
* the ramps, stairs and feet are a reservation;
* only a way or a channel may pass under a span;
* V06 says "a trace never waits for a raised way" (V06 l.1603).

So builders would add a station, pass the wall under a span, refuse, or share the station. No bar runs either case:
T110-2 (4) and T-V6-47 cross multi-span raised ways at one crossing.

**Required change.** In §2.7's support step (6) (b) (iii), after "the one nearest where the trace would cross", add:

> "and not already another trace's crossing station; where the raised way holds no such station — a single span (n = 1),
> every interior station on a ramp or a stair, or every one taken — the trace takes none: it is bent past the nearer
> foot (`RaisedWayRecord.feet`; the other where that foot lies on the arena's outer ring), clear of its ramp or stair and
> the under-deck strip, and crosses the part-0 way that leaves that foot, where one does, at a ground gate by §4.2 S3
> (4)'s gate law. The raised way stands wholly on one side of the trace, nothing of it changed, reported (V06's wall
> report at an epoch; the dry run's line for a hand edit)."

At generation, (a)'s "else one added" stands.

Ends:
* **determinism:** §7.1's `bend.wall.raisedCrossing` outcome cell adds "; where it holds no untaken station on the deck at
  its level, the trace bent past its nearer foot, a ground gate on the way beyond it (§2.7's support step (6) (b) (iii))".
* **V06:** §3.7.6 (5)'s second bullet adds the same clause.
* **V09:** `bend.wall.raisedCrossing` gains the words for the bend past the foot, ending with `button.showWhy`.
* **scope:** T110-2 (4) adds: "a hand `drawWall` across a declared one-span masonry viaduct, and an epoch contraction
  whose new ring meets an aqueduct within p ÷ 2 of the old ring's crossing station:
  - the first bent past the nearer foot, with a ground gate on the way beyond it;
  - the second through the next untaken station;
  - in both, every station, key, span and state of the raised way unchanged but that station's support".

### VEW-r4-02 — MAJOR, CONFLICT (CATALOGUE-GAP: C-vault-village), owner model

**A village palisade across a `vault` span: two texts, two outcomes.**

(b) makes "the under-deck strip of each `vault` span … a reservation on ground part 0 for every later way, trace, strip
…", and lists the palisade among the ways of crossing "the rest of its under-deck strip" (l.2597–2600). Yet (iv) says the
palisade "abuts each support standing in its band and passes beneath every span" (l.2608–2609). V07 §3.5a (4) agrees with
(iv): "The trace passes beneath a span as an ordinary stretch" (V07 l.1600–1601). §4.13's `wall` row names only supports
(l.8981).

A `vault` span stands at the village rungs in two ways:
* `span.vaultCap` is 10 at THORP, HAMLET and VILLAGE (V11 l.3975), so a declared raised way may hold one.
* V07 §3.5a (7) registers V04's arch-vault source at every village rung.

A span crossing the perimeter's band is not "wholly on hinterland faces", so the span rule's `country` does not keep it
open. Each `vault` span "holds one arch vault at grade" (l.2635–2636): a chamber with walled-up arch mouths.

So VS3's palisade, laid at a village derivation around a declared raised way (V07 §3.5a (1)), has two outcomes on one
case:
* it runs through the arch vault's chamber (base (iv), V07 (4));
* or it stops at a reserved strip, leaving the line open (base (b)'s reservation).

No text says which, and T-V7-48 ("the palisade abuts each standing support in its band") runs no `vault` span.

**Required change.** §2.7's support step (6) (b) (iv) reads:

> "(iv) a village palisade (`VillagePlan.palisade`) abuts each support standing in its band and each arch vault of a
> `vault` span there — the trace ending at the vault's two walled-up arch mouths, the chamber kept whole and closing the
> line between them — and passes beneath every `open` span, with no crossing station and no gate (V07 §3.5a (4))".

Ends:
* **V07:** §3.5a (4)'s "The trace passes beneath a span as an ordinary stretch" reads "The trace passes beneath an `open`
  span as an ordinary stretch and abuts a `vault` span's arch vault at its two arch mouths, never laid through the
  chamber (§2.7's support step (6) (b) (iv))".
* **pipeline:** §4.13's `wall` row reads "a village palisade abuts its supports and its `vault` spans' arch vaults, the
  deck passing over with no gate".
* **V07 (T-V7-48):** adds "a declared viaduct with a `vault` span standing in the planned palisade's band: the palisade
  ending at the vault's arch mouths, the chamber whole, 0 palisade stretches inside an arch vault's footprint and no gap
  in the line".

### VEW-r4-03 — MAJOR, EDGE-UNDEFINED (CATALOGUE-GAP: C-river-raised × C-harbour-raised), owner model

**The last support run's give-way for S7's way parts leaves the way cut or whole.**

R4-09's (6) (a) (l.2589–2591) applies where a station "this run can neither slide nor omit within `maxClearSpanM` and
`maxPierM`". That station "keeps the place the earlier run gave it, and the S7 part it meets gives way in that batch — a
strip, plaza or square cut round its ring, a quay, pier, mole or castle path ending at the ring and resuming beyond it". A
strip, plaza or square is a face, so "cut round its ring" defines it. A quay, pier or mole is a way: "`quay` ways along
the waterfront … piers as `pier` ways … moles, breakwaters, quays and piers are `pier` / `quay` ways in S7's L1 batch"
(§4.8 l.7717–7723). A castle path is a `path` way (l.2281). "Ending at the ring and resuming beyond it" does not say
whether the way stays one connected way:
* routed round the ring inside its platform; or
* split into two antenna ends either side of a pier, which may cut a quay plot's or a pier head's only path (§5.3's
  network invariant).

The case is common:
1. A generated viaduct or aqueduct crossing a `quay`-banked river or canal in town sets its bank stations as near the
   water as (3) allows. The river's clear span is held at or under `maxClearSpanM` (masonry 30 m, timber 20 m); a
   generated course past it drops.
2. S7 then lays the `quay` ways along those banks.
3. The last run finds each bank station in a quay's corridor. It cannot slide landward without passing `maxClearSpanM`
   over the river, nor slide into the water, nor be omitted. So "the S7 part gives way".

§4.8's lead ("gives way round its ring", l.7592–7593) and §4.1's S7 row ("cut round its ring or ended at it", l.4932)
add no rule for the way. T110-2 (3) counts "0 piers in a … quay, pier or mole" but no connectivity. Peers' VM-R4T-01 and VPC-R4-01 rule S5b
and S5c ways and the intervallum lane, and keep this wording.

**Required change.** In §2.7's support step (6) (a), the phrase "a quay, pier, mole or castle path ending at the ring and
resuming beyond it" reads:

> "a quay's, pier's or mole's platform cut round its ring as a strip is, and its way — or a castle path — bent round the
> ring inside its own face, its corridor beside the ring no narrower than its class's least width, so the way stays one
> connected way; where that face cannot hold the bend, the way ends at the ring on the water side and re-joins its
> shore's nearest way on the land side by the shortest lawful link in that batch, so every plot, pier head and gate
> keeps a path (§5.3's network invariant)".

Ends:
* **pipeline:** §4.8's lead and §4.1's S7 row read "the S7 part it meets cut or bent round its ring (§2.7's support step
  (6) (a))".
* **scope:** T110-2 (3) adds: "a CITY masonry viaduct across a `quay`-banked river at its clear-span bound: both bank
  stations kept, each quay cut round its ring, each quay's way one connected way round the ring, and every quay plot
  and water gate reached (§5.3)".

### VEW-r4-04 — MINOR, WIRING, owner pipeline

**S5a pins a raised arterial's gate where (6) (a) bends the trace away.**

§4.4 S5a *Trace* (2) pins the gates "where the arterials cross the boundary (… k ≥ 2: every crossing of an S4,
earlier-S5b or this stage's S5b arterial)". Step 3 keeps them "never moving" (l.5832–5838). A stage gate on a raised
arterial is its raised gate (*Outer moats*, l.5882–5883).

§2.7's support step (6) (a) (l.2578–2580) bends the trace along the deck through the nearest station at deck level, where
"the trace would meet the raised way on a ramp or a stair". T110-2 (2)'s fixture (l.18410–18412) is exactly a boundary
falling on an S4 viaduct's ramp. The pin step neither cites (6) (a) nor says the pin is the crossing station. The bar
fixes the outcome (the crossing station on the deck at its level), so a builder reconciles the two; nothing built
changes.

**Required change.** §4.4 S5a *Trace* (2) adds, after the pinned-gate parenthesis: "— on a raised arterial the gate is its
crossing station, pinned at the deck's station that §2.7's support step (6) (a) gives the crossing (never on a ramp or a
stair, the pin moved along the deck to it before smoothing)".

## Counts

4 issues: **0 blocker, 3 major, 1 minor**.

* **Round-3 findings:** 5 of 5 closed (VEW-r3-01 – VEW-r3-05), every END line's second end written. VEW-r3-01, round 3's
  blocker, is fixed at all nine homes.
* **New this round:** 4. All come from R4-09's held raised way and its last support run, at the raised way's own limits
  and at the S7, village and S5a parts it meets.
  * VEW-r4-01, major: (b) (iii) with no untaken station at deck level; owner model, with ends at determinism, V06, V09
    and scope.
  * VEW-r4-02, major: the village palisade across a `vault` span; owner model, with ends at V07 and pipeline.
  * VEW-r4-03, major: the S7 way parts a kept station meets; owner model, with ends at pipeline and scope.
  * VEW-r4-04, minor: S5a's pin of a raised gate; owner pipeline.
* **By owner:** model 3, pipeline 1. **By kind:** EDGE-UNDEFINED 2, CONFLICT 1, WIRING 1 (three also CATALOGUE-GAPs).
* **Peers' duplicates not re-raised:** VM-R4T-01, VM-R4T-02, VM-R4T-06, VPC-R4-01, VDC4-03, VDC4-04, VDC4-05, VAL-R4-02,
  VAL-R4-03, VAL-R4-04, VV34-r4-01.
* **Words:** this seat changes no design text, so none are counted here.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (read):**
* The live hashes equal assemble-r4's "after" column (base, V01–V07, V09, V11).
* Each quoted sentence at its cited line, and the word diffs against HEAD `96bdae26`.
* (2)'s n = max(1, round(L ÷ p)) and n − 1 interior stations, and (iii)'s station rule with no else; (3)'s "not yet
  taken" only at generation; §7.1's and V06's rows likewise without an else.
* V11's `span.vaultCap` at the village rungs (10 each), V07 §3.5a (4) and (7), and the base's (b) reservation beside (iv).
* §4.8's quays, piers and moles as `quay` and `pier` ways laid by S7, after every generated raised part is committed
  (S4, S5b, S6's end).
* V11's bounds: `slideMaxFactor` 1.5, `maxClearSpanM` masonry 30 and timber 20, `pierSpacingM` masonry 8–15 and timber
  4–8.
* No §5.3 invariant reads a support against a way's corridor.
* Owner-item counts and the phone census (executed over the files).

**PLAUSIBLE:**
* How often each new edge arises:
  - a short or all-ramp raised way crossed by a later trace (mostly drawn ones);
  - a declared or carried-down raised way with a `vault` span in a village palisade's band;
  - a generated river viaduct whose bank stations meet S7's quays, likely wherever a CITY river with `quay` banks takes a
    generated viaduct.
* Each is a reachable configuration of the text as written, and the outcomes given follow from its direct reading.
