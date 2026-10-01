# Verify — edge cases and combinations across the physical world, round 3 (coherence/verify-edges-world-r3t)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-edges-world-r3t; covered by the
> whole-design retrovalidation (J84).

> PROGRESS (kill-safe ledger)
> - P0 resume check (no output, no LANDED line): fresh start — done
> - P1 brief whole; r2t report and result (6 issues); adjudication-r3 (R3-01 – R3-03, R3-14, R3-25 – R3-27, Part H of every member, scope and V06); assemble-r3 (live sha256 = its "after" column) — done
> - P2 the 6 round-2 findings re-checked against the live text (with END lines' second ends) — done (6 of 6 fixed)
> - P3 the round-3 blocks in scope walked whole for new edge problems (word diffs against HEAD `920d280d`) — done (5 new)
> - P4 owner items 111–126 parts (mention counts never fall in any member) and phone census (item 126's own lines only) — done
> - P5 report, result JSON, LANDED — done. Design files untouched.

Members: model, kernel, pipeline, rendering, V01, V02, V03, V04, V05, V07. Design files untouched; this seat writes no
design text.

## Method

* **The round-2 findings.** Each of the six ids of `results/coherence_verify-edges-world-r2t.json` was re-checked at every
  home that its required change, its Part H disposition and its END lines name. The ruling's text was the bar where it
  differs from my round-2 wording (R3-14 (2), (6); R3-25 (c)).
* **The round-3 blocks in scope.** Word diffs of the base, V01–V05, V06, V07, V11 and V12 against HEAD `920d280d`
  (scratch `scratchpad/coherence/edw3/`). Then the changed physical subsections, read whole at their limits:
  * base: §2.6 step 7; §2.7 (the castle's weld, the raised ways' support step (3) and (6)); §2.8; §3.2 (9); §4.2 S1;
    §4.3; §4.4 (S5a, *Outer moats*, S5b, S5c); §4.6; §4.8 (*Gates*, *Condition at generation*); §4.11 *The clock*;
    §4.13 (EP-22, EP-27, the combination table); §6.3 *Plan damage*; §7.1; §8.2; §8.4; §8.6; §8.8; §8.11; §10.2 *Crisis
    looks*; §11.1; §13.2 (T110-2, the item-114 group, T116-4, T123); II.7.2;
  * volumes: V01 §3.4.1, §3.6 (7), §3.16, §3.17.3, §3.18; V02 §2.4, §3.18, §5.7; V03 §3.13, §5.1, §5.6; V04 §3.2, §3.11,
    §5.1, §5.6; V05 §3.16, §3.22; V06 §3.2, §3.7.1, §3.7.6 (5), §3.19 (read where a member's edge meets it); V07 §3.2,
    §3.12.
  * The new rules were crossed with the generation order (S4 → S5b/S5a per stage → S5c → S6 → S7 → S7b → S8), with V06's
    epoch order (`raisedWays` 10a before `growth` 14) and with the landfall, the topple, the salvage and the repair. That
    is where the five new findings lie.
* **Owner items.** Every member's mentions of items 111–126 were counted before and after the round, and no count falls.
  A phone census (phone, mobile, handset, narrow class, 390 ×, bottom sheet) over the base, V01–V05 and V07 finds only
  item 126's own statements (base l.94, l.265, l.313–314, l.18459, l.22655).
* **Peers.** The fourteen landed r3t result files were read first (101 issues), so that none is repeated here.
  * Findings in this lane's ground that peers already carry are cross-referenced, not raised again:
    - VM-R3T-03: the station's release, V06's "crossing span `dismantled`";
    - VM-R3T-04 and VM-R3T-05: S5a's give-way, undefined and untested;
    - VM-R3T-06: a locked raised way under (6);
    - VAL-R3-02: a village palisade;
    - VAL-R3-03: arch vaults under re-sited stations;
    - VKr3-01 – 03: the frame growth's foot;
    - VDC3-05, VDC3-07 and VM-R3T-09: (6)'s bends and §7.3's locality;
    - VPC-R3-06: the gate law's citation;
    - VAF-R3T-01: `campLand`'s "outermost enceinte";
    - VV34-r3-02: §8.6's floor rows;
    - VPC-R3-03 and VAL-R3-07: barriers on carriageways.
  * VEW-r3-04 differs from VM-R3T-03: that finding is the release condition's two texts; this one is the station's
    support entry against the wall's `condition` under the raised way's own salvage, topple, landfall and repair.
* **No document checks were run** (this seat writes no design text).

## Round-2 findings re-checked (P2)

Live text: each member file equal to assemble-r3's "after" sha256 (base `593c657d…`, V01 `8260b2a8…`, V02 `4696951c…`,
V03 `f4458cf4…`, V04 `0e3bcacd…`, V05 `cc1dfa61…`, V06 `8f92dd38…`, V07 `285e2f6f…`, V11 `1671da41…`). The pre-round text
for the diffs is HEAD `920d280d`'s (each file equal to assemble-r3's "before" column).

| id | owner | Part H | verdict | where it stands now |
|---|---|---|---|---|
| VEW-04 | pipeline | FIX (closes VM-R2T-06) | **fixed** | §4.13 EP-22 (base l.8869) carries the hill-town plot beside a wet moat reading the moat's derived level + `freeboardCm`, never its bank top, and its outcome cell names §2.6's water table; §2.6 (l.1901–1903) reads the moat's one derived level. |
| VEW-r2-01 | model | FIX per R3-25 (c), BLOCKER | **fixed** (every end) | §2.7 support step (6) (l.2559–2567); §4.4 S5a *Outer moats* (l.5809–5812: the carve clears no support, the raised gate, no part-0 deck); §4.8 S7 *A trace across a standing raised way* (l.7562–7569); V06 §3.7.1's exception (V06 l.1449–1450), §3.7.6 (5)'s crossing-station and continuity bullets (V06 l.1583–1593), T-V6-47 (V06 l.4114); §13.2 T110-2's c14 fixture and epoch circuit (l.18228–18231). |
| VEW-r2-02 | scope | FIX | **fixed** | §13.2 T116-4 (l.18323–18325) reads the limit bounds at any window size and with none, the cap's whole-bounds PNG, print and SVG; the stop-0 clause stays in T116-1 only. |
| VEW-r2-03 | pipeline | FIX per R3-14 (6) | **fixed** (every end) | §10.2 (d) (l.15527–15546): the reference point, `approachByGate` and `outside` measured from it; (h) (l.15587); EP-27 (l.8874); T-ER-27's mesa fixture (l.14581); V06 §3.22 (2) d. (V06 l.3348) and its edge row (V06 l.3272), T-V6-75 (c). |
| VEW-r2-04 | V04 | FIX | **fixed** | V04 §3.2 N2 (V04 l.986–997): the D8 path over land only, a path entering water passed over, every path entering water → gutter and pit, unsewered; UC19 (l.2448), the edge row (l.2356), T-V4-2, T-V4-80 (j)'s mill-intake fixture, J-V4.129. Sinks are filled (§4.2 S1 (3)), so every path not entering water reaches beyond the strip before the frame. |
| VEW-r2-05 | pipeline | FIX per R3-14 (2) | **fixed** (every end) | §10.2 (d)'s town enceintes (no `bailey`; `Castle.cityWeld`), the outer envelope for rings not nested, no part on a building footprint, the siege line broken at an extramural building (l.15513–15526); (f) and (h) read "no standing town enceinte" (l.15571, l.15584–15586); EP-27; T-ER-27's four fixtures and bar. |

All six close. No VEW id was ruled INVALID or MERGED away; assemble-r3 skipped no block.

## Round-3 blocks walked: checked and holding

* **The crossing station's held band (§2.7 (3)).** S7's generation row reads a `breached` draw as `worn`. `DeclineOp` and
  V06 §3.7.7 (2) pass over the stretch in chain order, and a hand op bends round it. A landfall breaches it and ruins the
  deck there, consistently with V05 §3.16's wall and pier rows. T114's group carries the fixture. The station's release
  is peer VM-R3T-03; its support entry against the raised way's own ops is VEW-r3-04.
* **(6) across a standing raised way.** V06 §3.7.1's footprint exception and §3.7.6 (5)'s bullets read as R3-25 (c)
  rules. T-V6-47 and T110-2 carry the crossing. §4.8 and §4.4 lay the raised gate and the wall opening. The undo is the
  trace's. Gaps: VEW-r3-02 (the S7 obstacles at generation), VEW-r3-03 (a ramp or foot) and VEW-r3-05 (the enumeration).
* **The field outfall over land (V04 §3.2 N2).** Sinks are filled by §4.2 S1 (3)'s priority flood, so a D8 path that
  enters no water reaches the frame, and the outermost strip lies inside the frame. So "the first cell outside `R` and
  beyond the outer strip" always exists on such a path, and the last fallback (every path enters water) is gutter and
  pit, reported. II.7.2 and UC19 agree.
* **The camp places at their limits (§10.2 (d), (f), (h)).**
  - The reference point is defined at the unserved mesa. Before V06's E2 the fallback chain ("else nearest the
    reference point") still gives an answer.
  - The town enceintes exclude `bailey`, and the outer envelope covers rings that are not nested.
  - No part stands on a building footprint. The siege line is broken at an extramural building.
  - A carriageway holds only a barricade.
  - The cordon and the stakes at village way crossings are peers' VPC-R3-03 and VAL-R3-07.
* **The damage layer at its physical limits.**
  - A roofless wing's bays are damaged while `decayed` or `ruined` (§2.6 step 7). A crypt whose ring holds no cell
    centre has one `cryptVault` keyed by its room. A room below level 0 has no roof bay, its vault being V04's.
  - An underground building is in no look's unit. A storey below 0 under a look draws the building's level; its
    battle-map walls, portals and lights stay at the own level. A `cellarWall` or `cryptWall` run keeps its
    line-of-sight segment.
  - A deck building falls with its deck.
* **The weather over the underground view (§8.8; V04 §5.1).** Nothing is drawn while the layer shows, and the timeline
  runs on (T-ER-29).
* **V01's cliff band (§3.4.1, §3.6 (7)).** A band crossing a face from boundary to boundary cuts it. A district wholly in
  the band has no template face, and F-TEMPLATE ends at `bent-cut`.
* **S1's mining flag with no cavern row (§4.2 S1).** The ore clause reads false and the flag rests on the roster and
  dossier clauses. §7.6's slice invalidation re-derives it when the row lands.
* **An unwalled k ≥ 2 stage across a land barrier (§4.4).** Routes cross where the class grade admits an edge, else
  they are F-ROUTE's `unserved`, reported.
* **Item 116 at the cap (T116-4).** Every export frames within the limit bounds, at any window size and with none.

## Issues

### VEW-r3-01 — BLOCKER, EDGE-UNDEFINED, owner pipeline

CATALOGUE-GAP (raised ways x part-0 ways laid after them; the catalogue pairs raised with edit and epoch only by keyword). Once a raised way stands, a part-0 way laid across its under-deck strip has no rule keeping it off the piers or out of a `vault` span. §2.7's support step (3) slides piers off 'a part-0 way's corridor' (base l.2528-2529) and the span rule opens a span over a way (l.2575-2577) only for the ways standing when they run, and nothing re-runs them for a later way: only (6) for a trace or moat and §4.11's carve for a channel (l.8128). The later ways carry no support obstacle: §4.3's lattice costs (l.5559-5563: water, reservation, wall, existing fabric, land value, the class grade limit) name none; S5c's legality (l.5855-5860: spines, shores, wall setback bands, reservations, the stage boundary, walls, water) none; §7.1's ground `drawWay` (l.10295-10297) and E-07 have no bend or refusal for a pier (V09's `bend.raised.*` keys cover raised strokes only). V06 runs `raisedWays` (step 10a) before `growth` (step 14; V06 l.1004, l.1008), and the growth's S5-S13 on new faces re-runs no support step. Only a raised course (V06 §3.19 (5), l.2797), a new trace (V06 §3.7.6 (5), l.1581-1582), stage 2's own laying (V01 §3.17.3 (3), l.2469-2477: 'never along the strip, never through a pier') and S8's holes (§4.6 l.6375-6379) keep off the piers. So an epoch growing a stage over a standing aqueduct's or viaduct's land (H-AQUA's case), an epoch route re-solve, or a hand road drawn across a viaduct lays a street over pier rings or through an arch-vault chamber. Masonry piers stand every 8-15 m, each 0.2 of its span wide (V11 l.3949), so most such crossings meet one. Nothing catches it: §5.3 holds no support invariant, T110-2's 'zero junctions' passes, and S8's holes keep only plots out. A street through a masonry pier is an impossible result on a CITY epoch's common path, the same class as 'a support standing in water'.

**Required change.** Pipeline: §4.3 *Lattice and costs* adds: 'A standing raised way's support rings and the under-deck strips of its `vault` spans are impassable to every route and growth proposal on ground part 0. Its under-deck strip is crossed only under an `open` span whose clear width holds the way's corridor + `raisedWays.structure.clearWidthM` and whose soffit meets §2.7's clearance for the crossed class, within ± `raisedWays.structure.squareDeg` of square to the deck. The route's crossing shifts along the strip to the nearest such span, else the route takes another course by F-ROUTE's ladder.' §4.4 S5c's legality adds: 'a proposal meeting a standing raised way's strip anywhere else is deflected along it to the nearest such span, or ends at the strip as at a reservation.' This is the one rule V01 §3.17.3 (3) states for stage 2. Its two cells move to V11 §3.24.2's `raisedWays.structure` (`clearWidthM` 1 m, `squareDeg` 30°), and V01 §3.17.3 (3) cites §4.3 (principle (9): one mechanism; equivalence: V01's crossing rule, ladder and values unchanged). Ends (R3-01): determinism §7.1, a ground `drawWay` or a moved way crossing a standing raised way's strip elsewhere is bent at its dry run to the nearest such span (E-07's row; V09 §4.9 `bend.raised.underSpan`); V06 §3.6 and §3.19 cite §4.3 for the growth and route re-solves; scope §13.2 T110-2 adds 'an H-AQUA epoch growing a stage over a standing aqueduct's land, an epoch route re-solved under a viaduct, and a hand road drawn across one: 0 way corridors over a support ring or a `vault` span, every crossing under an `open` span'. At generation, VEW-r3-02's re-run slides the piers off the ways S5b and S5c grew.

### VEW-r3-02 — MAJOR, EDGE-UNDEFINED, owner model

CATALOGUE-GAP (the support step x S7 at generation). At generation the support step reads obstacles that later stages lay. It runs 'after its course and deck level are fixed' (§2.7 l.2523-2524), and the raised parts commit at S4 (viaducts), S5b (a stage's viaducts) and S6's end (elevated roads and aqueducts) (§4.3 *The slot* l.5634-5636; §4.1's stage table). S7 comes after S6. It cuts the wall strips (`Enceinte.strips`, 'the two L1 wall-strip faces S7 cuts off', l.2255) and writes the band's thickness (`thicknessCm` 'written by S7', l.2258; a `parapet` run's by S7's `stretchClass`). It also claims the gate plazas and lays the quays, piers and moles (l.7515-7527, l.7557, l.7635-7640). S5c grows the secondaries round an S4 or S5b viaduct before then. So (3)'s obstacles do not yet exist when the step runs: 'an enceinte's wall strip (`Enceinte.strips`)', 'the strip's setback and glacis parts, the berm' (l.2530-2531, l.2545-2546), 'a part-0 way's corridor (… a pier's, a mole's or a quay's deck among them)', and 'a square … or a reservation'. No text runs the step again after S7. (6), new this round, re-runs it 'in the same commit' as an S5a trace (l.2559-2563) and slides 'the stations in the new strips' setbacks, glacis, berm or channel', but S7 has not cut those strips; only the channel S5a carves exists. Two builders differ. One leaves the piers where the commit put them: in the setback and glacis, in a gate plaza, under a quay, against T110-2's '0 piers in a setback, glacis, berm or moat' (l.18225-18231), with no §5.3 invariant to catch it. Another derives the strips early from values S7 has not written.

**Required change.** §2.7's support step adds: 'At generation the support step runs once more on every raised way after S7's batches and before S7b (1), its span rule then running at its eager time, each station keeping its key by (5). The obstacles then standing include S5b's and S5c's ways and S7's wall strips, gate plazas, castle paths, quays, piers and moles. The run at a raised part's commit (S4, S5b, S6) and (6)'s run at an S5a trace read the obstacles standing then, the channel S5a carves among them; the strips are taken at this later run.' Pipeline end (R3-01): §4.3 *The slot* and §4.8's lead state 'after S7, §2.7's support step re-runs on every raised way, its keys kept (§2.7 (5))'. T110-2's CITY masonry aqueduct and its c14 viaduct fixtures already run at generation and then bar it.

### VEW-r3-03 — MAJOR, EDGE-UNDEFINED, owner model

CATALOGUE-GAP (a trace meeting a raised way's ramp or foot; opened by this round's (6)). (6) defines a trace that crosses a standing raised way between its feet at deck level. Nothing defines a trace, its strips or its moat that meet the raised way's ramp or a foot. The feet are ground vertices where the ramps or stairs meet part 0 (§2.7 `RaisedWayRecord.feet`, l.2287; §4.6 l.6617-6618, ramps at the class grade). Nothing ties the trace's place to them. At generation a later stage's boundary on the S3 lattice may fall at a valley's rim, where an S4 viaduct comes down. At an epoch V06 §3.7.1's widening counts supports as footprints but no foot or ramp (V06 l.1448-1450), and V06 §3.7.6 (5)'s cost field makes only the supports impassable (l.1581-1582). Three outcomes follow. (6)'s crossing station is then 'one added' on the ramp: a raised gate whose tower carries a deck a metre above the ground. The strip's setback and glacis, or the berm and the channel S5a carves 'outside the outer half-band and a berm' (l.5805-5806), take the ramp and the foot. S5a's *Outer moats* adds 'no part-0 deck' for a raised gate because 'the deck itself' crosses the channel (l.5809-5812). So a part-0 arterial leaving a foot between the band and the channel's outer bank meets the channel with no deck, against §5.3's hard invariant 'a way crosses water only on a deck' (l.9114), or the foot's ground vertex lies in the water face itself. (6)'s give-way names only a clear span past `maxClearSpanM` or a pier past `maxPierM`.

**Required change.** §2.7's support step (6) adds: 'A crossing station stands where the deck is at its level, never on a ramp or a stair. Where the new trace, its strips or its moat channel would meet a ramp, a stair or a foot of the raised way (`RaisedWayRecord.feet`), the trace gives way as for a span past its bound. S5a: its stage trace takes the next lattice boundary node off the ramp, reported. V06: it retraces by the margin rule and waits (`walls.waited`). A hand `drawWall`: its dry run bends the trace clear of it (item 101 R2). So no foot, ramp or stair stands in a setback, glacis, berm or channel, and the part-0 way beyond a foot never meets the channel.' Ends (R3-01): §4.4 S5a *Outer moats* (pipeline) cites it beside 'no part-0 deck added for it'. V06 §3.7.6 (5)'s continuity bullet adds the ramp and the foot to what makes a trace retrace and wait. §13.2 T110-2 (scope) adds 'a stage-2 moated ring whose lattice boundary falls on an S4 viaduct's ramp at a valley rim: the trace moved off the ramp, reported, the foot and ramp outside the strips and the channel, the raised way kept'.

### VEW-r3-04 — MAJOR, CONFLICT, owner model

A crossing station's support is the wall. (3) makes 'that station's support `ring` … the band's stretch under the deck, the wall's own masonry (no pier raised, no pier-height test)' (l.2543-2545), and round 3 holds that stretch while the deck stands (l.2546-2553). The raised way's own support ops still treat that `supports` entry as a pier, with no rule tying them to the stretch's `condition`. (a) V06 §3.19.2 (3)'s salvage takes 'a support both of whose spans are ruined or cleared … → `dismantle` on the support (cleared)' (V06 l.2900-2901). At a station that is the wall's masonry under the deck. §2.7 (3) instead makes the stretch 'an ordinary run' from the first epoch after both spans have fallen, decaying by V06 §3.7.7. So the same masonry has two outcomes: taken as the raised way's salvage, or kept as a wall run. (b) V06 §3.19.2 (4)'s `topple` 'takes a support, weighted by its height, and breaks both spans beside it' (l.2908). A station has no pier height, and a toppled station leaves its support `ruined` while the held stretch's `condition` stays `standing`. (c) A landfall breaches the stretch and ruins the support (V05 §3.16's wall and pier rows, V05 l.1338 and l.1342; §2.7 (3)). V06 §3.19.2 (5)'s `repairRaised` then re-stands the spans beside it, 'its ruined supports with it' (l.2917). No text repairs the stretch, so the repaired deck stands on a `breached` gate tower, or on a stretch that the ordinary run's decay (V06 §3.7.7 (2)) dismantled meanwhile. Two units state two outcomes for one case: MAJOR by R3-03 (b).

**Required change.** §2.7's support step (3) adds: 'A crossing station's `supports` entry carries no `state` of its own. It reads its stretch's `condition`: `standing`, `worn` or `patched` is a standing support; `breached` or `dismantled` is a ruined one. The raised way's support ops pass over it: V06 §3.19.2 (3)'s salvage `dismantle` and (4)'s `topple` never take it, and its stretch decays as the wall's once both spans have fallen. A landfall's breach of the stretch ruins the spans beside it (V05 §3.16). A `repairRaised` of a span beside a station whose stretch is `breached` or `dismantled`, whether V06 §3.19.2 (5)'s or a hand Repair, first repairs that stretch by `repairWall` in the same batch, in item 114's patch material, so no deck stands on a fallen wall.' Ends (R3-01): V06 §3.19.2 (3)-(5) cite it, the salvage and topple candidates excluding a station and the repair naming its wall step. V05 §3.16's raised-way pier row adds '(a crossing station's support is its wall stretch, §2.7: the wall row's breach)'. §13.2's item-114 group (scope) adds 'a landfall over a raised gate, then the deck's repair: the stretch repaired with the deck, never a deck on a breached run; a station whose spans have both fallen keeps its stretch as a wall run, never dismantled as a support'.

### VEW-r3-05 — MINOR, EDGE-UNDEFINED, owner model

The enumerations of what (6) covers are narrower than its rule. (6)'s 'a later stage's S5a trace and outer moat at generation' (l.2560-2561) and §4.8's '(a later stage's trace across an S4 viaduct, elevated road or aqueduct …)' (l.7562-7563) both miss one case. Stage k's S5b may raise a viaduct (l.5824). That viaduct is committed before stage k's own S5a trace (§4.1's S5 row: S5b's L1 batch, then S5a's), and the trace can cross it, but stage k's trace is not 'a later stage's'. And at generation an elevated road or an aqueduct is laid at S6's end, after every trace (l.5634-5636), so no generation trace crosses one standing. (6)'s governing clause ('a trace or moat laid across a standing raised way') covers the case, so a builder reaches it. Only the lists and T110-2's fixtures name less.

**Required change.** §2.7 (6): 'a stage's S5a trace and outer moat at generation across an S4 viaduct or a viaduct an S5b laid before it, the stage's own included'. Pipeline end, §4.8: '(at generation a stage's trace across an S4 or S5b viaduct; at an epoch, or by a hand `drawWall`, any trace across a standing raised way, its crossing station put on the trace by §2.7's support step (6))'. Scope's T110-2 adds 'a stage-2 S5b viaduct crossed by stage 2's own moated ring'.

## Counts

5 issues: **1 blocker, 3 major, 1 minor**.

* **Round-2 findings:** 6 of 6 closed (VEW-04, VEW-r2-01 – VEW-r2-05), every END line's second end written. VEW-r2-01,
  round 2's blocker, is fixed at all seven homes.
* **New this round:** 5. All come from the raised ways where round 3's (6) and held band meet the generation order, V06's
  epoch order and the raised way's own decline and repair.
  * VEW-r3-01, BLOCKER: part-0 ways laid after a standing raised way; owner pipeline, with ends at determinism, V06 and
    scope.
  * VEW-r3-02, major: S7's obstacles at generation; owner model, with a pipeline end.
  * VEW-r3-03, major: a trace at a ramp or foot; owner model, with ends at pipeline, V06 and scope.
  * VEW-r3-04, major: the station's support against the wall's condition; owner model, with ends at V06, V05 and scope.
  * VEW-r3-05, minor: (6)'s enumeration; owner model, with ends at pipeline and scope.
* **By owner:** model 4, pipeline 1. **By kind:** EDGE-UNDEFINED 4 (VEW-r3-01 – 03 not in the catalogue), CONFLICT 1.
* **Words:** this seat changes no design text, so none are counted here.

## CONFIRMED versus PLAUSIBLE

**CONFIRMED (read):**
* The live hashes equal assemble-r3's "after" column (base, V01–V07, V11).
* Each quoted sentence at its cited line, and the word diffs against HEAD `920d280d`.
* The stage order, read in §4.1's stage table and §4.3 *The slot*:
  - S4's and S5b's viaducts, then S5c, S6's elevated roads and aqueducts, then S7's strips, plazas, quays, piers and
    moles;
  - `thicknessCm` is written by S7.
* V06's epoch order: `raisedWays` (10a) runs before `growth` (14).
* Supports are impassable only to these:
  - a raised course (V06 §3.19 (5));
  - a trace (V06 §3.7.6 (5));
  - stage 2's laying (V01 §3.17.3 (3));
  - S8's holes.
* No support obstacle appears in §4.3's lattice, S5c's legality or §7.1's ground `drawWay`.
* V06 §3.19.2 (3)–(5): the salvage, topple and repair texts.
* V11's pier pitch and width (l.3949).

**PLAUSIBLE:**
* How often each new edge arises:
  - a street crossing a standing arcade at an epoch, which meets a pier at most offsets, given the masonry pitch and pier
    width;
  - a stage boundary at a viaduct's ramp, which needs the ring to fall at a valley rim;
  - a landfall or a topple at a raised gate.
* Each is a reachable configuration of the text as written, and the outcomes given follow from its direct reading.
