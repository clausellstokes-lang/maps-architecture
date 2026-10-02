> **WITHDRAWN by the owner, 2026-10-02 (J143: "I think I take back what I said, keep iterating").** Kept as a record only;
> nothing below is binding. The raised-way × wall family keeps its full scope (R6-02 with adjudication-r6.md's Part P).

# Raised ways × walls — the owner's narrowing (J142, 2026-10-02)

The owner's decision, approved word for word as drafted below ("Narrow it (Recommended)", then "Approve as drafted
(Recommended)"). Adjudicate-r7 rewrites §2.7's crossing table and every reader to this scope. The scope lines are the
owner's. The exact texts that state them are the program's (J122). Behaviour this scope does not settle keeps R6-02's
form, unless a narrower form follows from the scope.

## Why

Verify round 6 found 81 issues: 0 blockers, 39 majors, 42 minors. About 30 of the majors were raised ways meeting walls.
That family has drawn new majors for six rounds and has not converged, because it touches generation, epochs, decay,
locks, hand edits and regeneration. Round 6 ruled the late calamity by removing a mechanism, and its majors fell from 6
to 1. This scope removes the parts of the raised-way family that interact with everything else.

## Stays exactly as now

Item 110 (b) as written:

* At CITY and METROPOLIS the generator raises viaducts, elevated roads and aqueducts, each with its reason and within the
  rung's cap.
* An aqueduct crosses a wall through an arch: R6-02's *over the band* form, the supports kept off the wall's band.
* A road deck comes down before a standing wall and passes through the gate on ground part 0: R6-02's *down before the
  wall* form.
* No raised way makes a junction with a ground way.
* The user may add a raised way by hand, across a wall in the same two forms, or remove one. A removal holds through
  regeneration.
* Walls laid later, at a generation stage, a regeneration or an epoch (circuit, contraction, re-anchored stretch, VS3's
  palisade), pass beneath a standing raised way: R6-02's *beneath*, reading a standing raised way only.
* A city that grows into CITY or METROPOLIS over the epochs may found new raised ways (V06 §3.19's founding), in the same
  two forms.
* Every other wall op meets a standing raised way as an *unchanged meeting*: decay of the wall, breach and dismantle,
  gate opening, `wallToWay`, `absorbWall`, the hand-off down, `repairWall` and a hand delete.

## Deferred to a later milestone

**Raised ways changing over time.** The following are deferred:

* disuse and lapse;
* the strike;
* salvage (dismantle);
* fallen spans and toppled piers;
* landfall damage to a raised way;
* repair of a raised way.

This covers V06 §3.19.2, the raised row of V05 §3.16 (4), every writer of a span's or support's `state`, `repairRaised`,
and the collapsed arch vault under a fallen span. A raised way stands as created until the user or a regeneration
removes it. The `state` fields may stay in the record, reserved and never written. Recorded in docs/PARKED-IDEAS.md §C.

## Refused by hand, with the nearest lawful alternative shown in the dry run

* A wall stretch drawn, moved (vertex) or re-anchored into a standing raised way's footprint: its supports, ramps,
  stairs, feet or under-deck strip, other than crossing it under one span.
* A gate placed (`placeGate`) or slid (a gate's grip) under a deck.
* A wall run along beneath an aqueduct, or ended at one of its piers.
* A raised way re-shaped or re-spaced (`spanSpacingCm`, its course) so that a support, ramp, stair or foot lands on a
  wall's band.

What "the nearest lawful alternative" is for each case is the adjudicator's to state, and a lock never changes the
answer. Where a single crossing under one span is lawful, that stays the hand bend R6-02 gave it
(`bend.wall.raisedCrossing`).

## What this removes

The crossing table's columns for a raised way's changed states go:

* C3: one span fallen;
* C4: every span fallen;
* C5: a support cleared or toppled;
* C6: a `vault` span breached;
* C10: repaired.

Row W12 (the landfall over a raised way) goes, and so do the hand rows' bends that defined odd geometry (W2's along and
ending cases, W13's gate under a deck, C13's re-shape onto a wall). C11, a raised way created across a breached or
dismantled run, stays: walls still decay (item 114), and founding stays.
