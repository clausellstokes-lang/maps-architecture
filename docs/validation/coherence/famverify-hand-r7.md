# Family verify — round 7, hand edits, locks and the interface (raised way × wall)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/famverify-hand-r7; covered by the
> whole-design retrovalidation (J84).

PROGRESS (lane `coherence/famverify-hand-r7`, 2026-10-02, the assembled design after assemble-r7, HEAD `80a9546`)
- [x] H1 read: the brief whole; adjudication-r7.md Part L (normative; word-diffed against the live §2.7 laws, l.
  2578–2889: the same text less the file's markers), R7-02 (the lock, bent-group and fixed-place sentences, both
  tables, the attack), R7-03 – R7-07, Part A (J147's and J150's hand-off), Part H (its head; determinism, scope, V09,
  V10 and every round-6 finding of this lens), Part P passes 1–8; PROGRESS J144 – J151; assemble-r7.md; the live §2.7
  support step (6) — laws and worked examples (l. 2891–3350)
- [x] H2 the lens's live text read by grep and range: §7.1 (the outcome table's lock, bend, refuse and undo rows, *Raised
  ways*, the binding, the warp, *Delete*), §7.2, §7.3 (the S7 row, (b) 2–3, item 4), §7.4 (the draw, raised-way,
  enceinte, arch-vault and retaining rows, *Independence*), §4.11 (*Other crossings*, `wallToWay`), §4.13, §5.2's
  F-WALL and F-REDERIVE, §5.4's `reshaped`, T110-1, T110-2 (1), (2), (4), (5), (7), (8), T110-4; V04 UC18 and the
  raised-way edit row; V06 §3.19 (5), T-V6-47, T-V6-73; V07 T-V7-48; V09 §3.5, §4.3, §4.5's T3/T4 rows, §4.9, §4.20.2,
  §4.20.6, §5.5, T-V9-13, T-V9-52; V10 §3.16, §4.1's encoders, the read rows, T-V10-41
- [x] H3 re-check: the eighteen round-6 ids of this lens against the live text (section 1) — sixteen fixed, one merged
  pair fixed, VPC-r6-03 partly fixed
- [x] H4 attack: every hand op of the lens (T3's walls, gates and grips, `placeGate`, `moveVertex`, re-anchoring and the
  `convert`s; T4's raised roads and aqueducts, re-shape, Arch spacing and Deck height; carves, moved rivers, deletes;
  their dry runs, bend keys and fates; undo; the clerk's encoders) under laws 1–4, J144 and J147 – J149; nothing reported
  that J150 hands to round 8 (the two-axis lock and its readers — §7.1's lock row, §7.2's *Declared means held* and
  *Drawn constraints*, §7.3 item 4's fates, §7.4's lock column, §5.3's declared row, V09's and V10's lock tools — and a
  lock's behaviour under undo, redo, a re-grade or a repair)
- [x] H5 graded by J141 under J146 and J151; the sibling seats' results read so as not to repeat them (VF7-RDR-06,
  -07, -08; VF7-GEN-01 is this lens's VF7-HND-02 at the pull)

Grading used (the brief's): MAJOR only where the laws or the design text written from them give a case no lawful
outcome, an outcome that breaks an owner rule or a law-1 invariant, leave a law-1 invariant checked by no bar, or make a
check or a named test fail a correct build; where every outcome keeps law 1 and the owner rules, passes the check and
fails no named test, a minor (a VALID CHOICE, J151); an example's slip, a citation or wording a minor. Line numbers are
the live files' at HEAD `80a9546`.

## 1. The round-6 findings of this lens, re-checked against the live text

| id (unit, round-6 grade) | what it asked | live text now | verdict |
|---|---|---|---|
| VDC6-01 (determinism, major) | §7.1's lock row refuses no aqueduct drawn across a locked or drawn wall, no deck over a locked way; T110-2 (1) runs it | §7.1 l. 11280: "never a meeting of two similar structures — a wall and a raised way, either locked, pinned or declared, which meet with their placement held and their shape changed there … nor a raised way's deck passing over a locked or pinned ground way"; T110-2 (1) l. 19278–19283: "and the same across a wall drawn by hand … and across one the user placement-locked, no `refuse.locked` and nothing of the wall written" | **fixed** |
| VEW-r6-04 (V06, major) | V06 §3.19 (5)'s founding meets a held wall as an unheld one, held entities impassable only to supports, ramps, feet and the clearing | V06 l. 2835–2846 ("but a wall, a retaining wall and another raised way, which a course meets as unheld ones … impassable to the course's supports, ramps, stairs and feet and to its clearing"); T110-2 (1) l. 19272–19276 (third run, a ring drawn by hand and placement-locked: "no wait, nothing of the ring written"); T-V6-73 (V06 l. 4234) | **fixed** |
| VAL-R6-01 = VEW-r6-02 (model, major; merged) | a locked arch vault a wall comes to stand over: one outcome; a held building seated in it | UC18 (V04 l. 2467: "its span held and its lock kept with its key, its chamber not laid while they do — never refused `E_LOCKED`, a lock deciding no meeting"); *beneath* l. 3109–3134; T110-2 (4) l. 19394–19404; T-V4-80 (i) (V04 l. 3181) | **fixed** |
| VAP-r6-01 (scope, major) | the hand rows and `wallToWay` run with the raised way locked and pinned | W4·C8, W10·C8, W11·C8, W13·C8 name T110-2 (4)·S (l. 3332, 3338, 3339, 3341); T110-2 (4) l. 19374–19390 ("each run over the state sweep … no `refuse.locked` with the raised way placement-locked or pinned"); (8) l. 19511–19512; T-V6-47 (V06 l. 4208: "each `wallToWay` run again with the raised ways locked and with them pinned") | **fixed** |
| VAP-r6-02 (scope, minor) | the hand rows at the raised way's other states | the state sweep (T110-2's lead, l. 19229–19261) and T110-2 (4)'s "each run over the state sweep" (l. 19385–19386) | **fixed** |
| VCS-r6-01 (scope, major) | a raised way's own re-shape across a standing ring run by a bar | T110-2 (4) l. 19404–19413 (an aqueduct re-shaped across a placement-locked drawn ring crossing at its level; a declared viaduct "bent back along itself … else refused", "a 3 m nudge … keeping that crossing", "no `refuse.locked`") | **fixed** |
| VAT-r6-02 = VV910-r6-01 (model, major; merged) | a gate slid into the strip: one outcome (back along the trace), at §2.7, §7.1 and V09, run by a bar | W2 l. 3330 ("a gate's slid crossing is W13"); W13 l. 3341; §7.1 l. 11323; V09 l. 2104; T110-2 (4) l. 19378–19381; T-V9-52 (V09 l. 4427) | **fixed** — one outcome everywhere; §7.1's row did not take J149's aqueduct exception for it, a new defect (VF7-HND-01) |
| VEL6-r6-04 (model, major) | a hand stretch along beneath, entering and leaving on one side, ending at a support | the bent-group sentence's (ii)–(iii) (l. 3197–3201); §7.1 l. 11323; T110-2 (4) l. 19390–19394; T-V9-52 ("a wall drawn along beneath the viaduct moves to the strip's edge with the line's keep-clear form") | **fixed** |
| VAT-r6-04 (V09, minor) | `bend.raised.underSpan`'s wall form; T-V9-52's words | V09 l. 2105 ("… "{name} crosses {wall} at a gate clear of {way}, {m} m off your line.""); T-V9-52 ("with `bend.raised.underSpan` in its wall form") | **fixed** — its cause cell restates §7.1's stale trigger (VF7-HND-01; VF7-RDR-08) |
| VEL6-r6-01 (V10, major) | the clerk's raised-way read tells a span a wall stands over `open`, as the canvas does | V10 l. 1686 ("but a span §2.7's laws read `open` is told `open` while they read it so, with what lies under it in V09 §4.20.6 (2)'s words … and no arch vault named in it"); T-V10-41 (V10 l. 3156) | **fixed** |
| VPC-r6-02 (pipeline, major) | `wallToWay`'s dry run reads the state the op leaves | §4.11 l. 8921 ("reading the state the op leaves: each `vault` span the old wall stood over read as §2.7's laws read it once the op commits"); row (c) l. 2913; T110-2 (8) l. 19503–19510 | **fixed** |
| VPC-r6-03 (pipeline, major) | the run a carve or a moved river re-traces neither refused nor cutting at a standing raised way | §4.11 *Other crossings* l. 8946–8949: the cut exception "and a raised way, whose deck passes over the run" and "A standing raised way and its reservation … are no conflict"; §7.3 (b) 3's conflict clause l. 11681–11684 (E-D5); **but** §7.3 (b) 3's cut list for a moved river, l. 11675–11676, still "cuts … every way but a kept way at a gate that the new strips will meet" | **partly fixed** — persists for the moved river (section 2) |
| VM-R6T-02 (scope, major) | W3 over the sweep; `wallToWay`'s `vault`-span case read as after the op | T110-2 (6)·S runs (l. 19473–19480); T110-2 (8) l. 19503–19506 | **fixed** |
| VM-R6T-03 (model, minor) | W11·C2 names T-V4-63 | W11·C2 l. 3339 ("· T110-2 (4), T-V4-63") | **fixed** |
| VAL-R6-07 = VPC-r6-06 (pipeline, minor; merged) | §4.13's raised-way `wall` cell states its rung, (G3)'s refusal among it | §4.13 l. 9697 ("*Rung:* leave out and report … simpler shape (declared, bent: `bend.raised.wall`, `bend.wall.aqueductArch`), else refused (`refuse.raised.meeting` …)") | **fixed** |

J144 at the lens's sites. No text of the lens makes a placement lock or a pin refuse, skip or alter a meeting of a
wall and a raised way: §7.1's lock row (l. 11280) and its declaration row (l. 11285) exempt every such meeting, the
raised road's gate in a held wall among them; §7.1's bend and refuse rows (l. 11323–11325) read "either side locked,
pinned or neither" and offer no Unlock (`refuse.raised.meeting`, l. 11324); §7.2 *Protection* (l. 11447–11449) holds a
wall, a raised way or an arch vault "in its placement only"; §7.4's enceinte, arch-vault, raised-way and retaining rows
(l. 12109–12112) give placement held and shape at the meeting by the laws; UC18 (V04 l. 2467) refuses no meeting;
V09's lines and panels (V09 l. 2033, 2102–2107, 3016–3034, 3204–3212, 3958–3966) and V10's encoders, refusal
categories and reads (V10 l. 1686, 2405–2412, 2770–2830) say the same, the clerk sending the canvas's own events (one
byte form, T101-3) and rendering the same catalogue rows (`refuse.raised.meeting` in the `rule` category with its own
buttons, no Unlock). One hand gesture gives one event; where it gives two outcomes, the split is between §7.1's rows and
the laws (VF7-HND-01, VF7-HND-02), not between canvas and clerk.

## 2. Findings

### VF7-HND-01 — major — TWO READINGS (law 1 (5), (6); item 101 R2) — owner determinism (§7.1), ENDs at V09 and scope

**Claim.** J149's OVER lets a gate stand under an aqueduct's arch that clears it: law 1 (5) (l. 2722–2723) bars a
gate's, postern's or tower's footprint in a strip "but in an aqueduct's crossing law 1 (2) reads over whose every span
over it clears its top, never on a support's ring", and law 1 (6) (l. 2724–2725) admits a fixed place there likewise —
an aqueduct has no zone (l. 2633). Law 2 (a) keeps "the lawful shape law 3 picks nearest" a value the op set, law 3's
key (1) (l. 2843) "a shape that keeps the value the op set" first, and a thing the op places goes to the nearest place
the laws admit. The worked examples and the tests were conformed to it:
* W13 (l. 3341): "at an `at` or a slide's end where law 1 (5) bars a gate (inside a road deck's under-deck strip, or an
  aqueduct's unless its arches there clear the gate and the wall and its way passes the strip by the crossing rule),
  moved along the trace to the nearest point these laws admit";
* *Strips, zones and nearest points* (l. 3002–3003): a slid gate "to the first point at which these laws admit its
  footprint";
* the way-and-channel table's row (b) (l. 2912): a hand way's gate "never where these laws bar a gate (law 1 (5): in a
  road deck's under-deck strip, or in an aqueduct's unless its arches there clear the gate and the wall and the way passes
  the strip by the crossing rule)";
* T110-2 (4) (l. 19378–19381): "the placed gate moved along the trace to the nearest place §2.7's laws admit it (§2.7's
  laws, law 1 (5): clear of the strip, or under an aqueduct's arch that clears it) and the slid one back, on the side
  its grip came from, to the first such place";
* T-V7-48 (V07 l. 3708): "a hand `placeGate` whose `at` lies in its under-deck strip where §2.7's laws bar a gate (law 1
  (5): the span over `at` not clearing the gate) moved along the palisade to the nearest lawful point".

§7.1's outcome table — "the one home of every refusal, conflict and bend cause of a dry run" (l. 11265) — was not:
* its `bend.wall.raisedCrossing` row (l. 11323) takes as cause "a `placeGate` or a gate's slid crossing inside its
  under-deck strip" and gives "a slid gate moved back along the trace to the strip's edge its grip came from and a
  `placeGate`'s gate to the nearer edge", and keeps "a fixed place it lays … out of the fixed-place zone (law 1 (6))",
  a zone an aqueduct does not have (the same row's clause for a gate the stretch makes was conformed: "none that stands
  under an aqueduct's arch in an over crossing whose spans clear it, law 1 (5)");
* its `bend.raised.underSpan` row (l. 11325) bends a ground `drawWay` or moved way "crossing an enceinte's trace inside
  that strip … its crossing of a trace to the nearest clear of the under-deck strip", and V09's row copies the trigger
  and gives the line "{name} crosses {wall} at a gate clear of {way}" (V09 l. 2105).

Cases and outcomes: (a) a hand `placeGate` whose `at` lies under an aqueduct's arch that clears the gate and the wall,
its stub passing the strip by §4.3's crossing rule — the laws keep it at `at`; §7.1 moves it to the strip's edge; (b) a
placed or slid gate under an arch that does not clear it, a neighbouring arch that does lying nearer than the strip's
edge — the laws stop it under that arch; §7.1 carries it to the edge; (c) a hand road (T4) crossing a wall under a
clearing arch, square to the deck — the laws and row (b) make its gate there; §7.1 and V09 bend the road along the deck
off the strip; (d) a water gate a hand stretch lays under an aqueduct whose arch does not clear it — law 1 (6) moves it
along the river; §7.1's words give it no move (no zone), leaving it where law 1 (6) bars it. §7.1's outcome in (a)–(c)
bends a lawful declaration or passes a nearer lawful place, against item 101 R2's "nearest lawful one" — the pattern
Part P's pass 8 ruled not a valid choice (PRB7H-LCK-03) — and in (a)–(b) fails T110-2 (4)'s and T-V7-48's placed-gate
clauses; in (c) no bar runs the case (T-V9-52 and T110-2 (5), l. 19446–19448, run road decks), so a build of §7.1's
row passes every bar; in (d) its words give no lawful outcome. Two builders, two outcomes on a common hand gesture (a
gate placed or a road drawn through a wall an aqueduct passes over, the commonest J149 case, *J149 applied*'s
"Over").

**Required change.**
1. §7.1's `bend.wall.raisedCrossing` row (l. 11323), its cause: "or a `placeGate` or a gate's slid crossing inside its
   under-deck strip" → "or a `placeGate` or a gate's slid crossing where §2.7's laws bar a gate there (law 1 (5): inside
   a road deck's under-deck strip, or inside an aqueduct's unless its arches there clear the gate and the wall and its
   way passes the strip by §4.3's crossing rule)"; its outcome: "a fixed place it lays kept out of the fixed-place zone
   (law 1 (6))" → "a fixed place it lays placed where law 1 (6) admits it (out of a road deck's fixed-place zone, and
   out of an aqueduct's strip but under arches that clear it and the wall)"; and "a slid gate moved back along the trace
   to the strip's edge its grip came from and a `placeGate`'s gate to the nearer edge" → "a placed or slid gate moved
   along the trace to the nearest point at which §2.7's laws admit its footprint (law 1 (5): clear of the strip, or
   under an aqueduct's arch that clears it and the wall) — a `placeGate`'s gate to the nearer such point, a slid one
   back to the first such point on the side its grip came from".
2. §7.1's `bend.raised.underSpan` row (l. 11325): "or crossing an enceinte's trace inside that strip" → "or crossing an
   enceinte's trace where §2.7's laws bar its gate there (law 1 (5): inside a road deck's under-deck strip, or inside an
   aqueduct's unless its arches there clear the gate and the wall and the way passes the strip by §4.3's crossing
   rule)"; and "its crossing of a trace to the nearest clear of the under-deck strip" → "its crossing of a trace to the
   nearest at which those laws admit its gate".
3. END at V09 (one fix with VF7-RDR-08, which rewrites the same cell's citations): §4.9's `bend.raised.underSpan` row (V09
   l. 2105) takes item 2's trigger in its source cell, and its wall form "{name} crosses {wall} at a gate clear of
   {way}, {m} m off your line." → "{name} crosses {wall} where a gate can stand, {m} m off your line."; and
   `bend.wall.raisedCrossing`'s gate form (V09 l. 2104) "No gate can stand beneath {way}, so it moves {m} m along {wall}."
   → "No gate can stand there beneath {way}, so it moves {m} m along {wall}.".
4. END at scope, T110-2 (5) (l. 19446–19448): after "a hand road drawn across one where a wall runs beneath it, crossing
   the trace under the deck — moved along the deck to cross the trace clear of the under-deck strip at a gate
   (`bend.raised.underSpan`)" add "; a hand road drawn across a wall under a standing aqueduct's arch that clears the gate
   and the wall, square to the deck — its gate made there, no bend — and, on a second run where that arch does not clear
   the gate, moved along the deck to the nearest crossing at which §2.7's laws admit its gate (§2.7's laws, law 1 (5),
   law 2 (a), law 3)".

### VF7-HND-02 — major — TWO READINGS (law 1 (2); J149's forms by level) — owner determinism (§7.1), ENDs at V09 and scope

**Claim.** Law 1 (2) (l. 2703–2711) gives each crossing the form its level gives: **over** "where its channel there lies
above the wall's top — no standing support in the band there and every span above the band clearing the wall's top",
**merged** "where its channel lies within the wall's height", and "a crossing that fits neither form is unlawful". That
is the restoration Part P's pass 6 flagged as an OWNER-RULE CLASH (PRB7F-GEN-03: pass 5's "every crossing lawful
whatever the level" made a high aqueduct "merged" at a pier in the band or under a span lower than the wall, against
J149). The worked examples and the tests carry it — *over the band* (l. 3010–3024: "every span over the band clearing
the wall's top … A course that cannot cross so … a declared one bent to the nearest course that can, else refused"),
the bent group's lawful crossing (l. 3177–3179: "over where its channel runs above the wall's top, under a span that
clears it"), T110-2 (4) (l. 19363–19366: a hand `drawWall` "drawn through one of its supports — where its channel runs
above the wall's top, bent along the deck to cross under the nearest span that clears the wall"), T-V9-52 ("its spans
clearing the wall's top"). Three hand texts of the lens keep pass 5's reading:
* §7.1's `bend.wall.raisedCrossing` row (l. 11323): "an unlawful crossing moved to the nearest lawful one (an
  aqueduct's deck line crossed once anywhere, in the form its level there gives, law 1 (2); …)" — "anywhere" being
  pass 5's word;
* §7.1 *Raised ways* (l. 11131–11135): "an aqueduct crosses a standing wall at its own level, in the form that level
  there gives — over it on an arch, or merged into it —, never a gate, its course bent clear only of a gate, postern,
  tower or fixed place its arches would not clear";
* V09 §4.20.2 (4) (V09 l. 3019–3023): "over it on one of its arches where its channel there runs above the wall's top,
  its supports off the band and its spans clearing the wall, else merged into it …, its course bent clear only of a
  gate, postern, tower or fixed place its arches would not clear" — its "else merged" falling on a high channel whose
  span does not clear the wall.

The case: a hand aqueduct whose channel at the wall runs above the wall's top by less than the deck's depth
(`raisedWays.structure.span.deckDepthCm`, 150 cm, V11 l. 3980), so its span over the band does not clear the wall; and
a hand wall drawn through such an aqueduct's standing support. Outcomes: (A) the laws — the aqueduct's course bent to the
nearest course that crosses over with a clearing span, else refused (law 2 (a), (c)); the wall stroke bent along the
deck under the nearest clearing span; (B) the hand texts — no bend (only Tier-1 things bend the course; the crossing is
lawful "anywhere"), or V09's "else merged": the crossing committed in neither of J149's forms, or merged with a high
channel (the clash pass 6 restored), law 1 (2) broken and §5.3's law-1 row failing the edit with no outcome §7.1 gives
it, or the stroke refused where a lawful bend exists (item 101 R2). A (B) build fails T110-2 (4) on the wall stroke; no
bar runs the aqueduct stroke's case (T110-2 (1), l. 19278–19283, bends for a tower and refuses for supports only). The
generation member of this class is VF7-GEN-01 (the pull's list); this is the hand member.

**Required change.**
1. §7.1's `bend.wall.raisedCrossing` row (l. 11323): "(an aqueduct's deck line crossed once anywhere, in the form its
   level there gives, law 1 (2);" → "(an aqueduct's deck line crossed once in the form its level there gives — over
   where its channel runs above the wall's top, under a span that clears it and never through a standing support;
   merged where it runs within the wall's height — law 1 (2);".
2. §7.1 *Raised ways* (l. 11133–11135): "never a gate, its course bent clear only of a gate, postern, tower or fixed
   place its arches would not clear (item 363; §2.7's laws, law 1 (2), (5), (6); law 2 (a);" → "never a gate, a course
   that cannot cross so — an over crossing whose span over the band would not clear the wall's top, a gate, postern,
   tower or fixed place its arches would not clear — bent to the nearest course that can, else refused (item 363;
   §2.7's laws, law 1 (2), (5), (6); law 2 (a), (c);".
3. END at V09, §4.20.2 (4) (V09 l. 3019–3023): "over it on one of its arches where its channel there runs above the wall's
   top, its supports off the band and its spans clearing the wall, else merged into it, the wall built up round its
   arch or pier and the water passing through —, never a gate, its course bent clear only of a gate, postern, tower or
   fixed place its arches would not clear (§2.7's laws, law 1 (2), (5), (6), (10), law 2 (a);" → "over it on one of its
   arches where its channel there runs above the wall's top, its supports off the band and its spans clearing the
   wall, merged into it where its channel runs within the wall's height, the wall built up round its arch or pier and
   the water passing through —, never a gate, a course that cannot cross so bent to the nearest course that can, else
   refused (§2.7's laws, law 1 (2), (5), (6), (10), law 2 (a), (c);".
4. END at scope, T110-2 (1) (l. 19278–19280): after "its course bent clear of a tower whose top its arches would not
   clear (§2.7's laws, law 1 (5), law 2 (a)), with `bend.wall.aqueductArch`" add "— and one whose channel at the wall
   runs above the wall's top by less than the deck's depth, so that its span over the band would not clear it: its
   course bent to the nearest crossing whose span clears the wall's top, with `bend.wall.aqueductArch`, else refused
   `refuse.raised.meeting` (§2.7's laws, law 1 (2), law 2 (a), (c)) —".

### VPC-r6-03 — major (persisting; partly fixed) — CONFLICT — owner determinism (§7.3 (b) 3), END at scope

**Claim.** VPC-r6-03 found that the run a carve or a moved river re-traces is refused, or cuts a standing raised way,
where its new strips meet it (§4.11 *Other crossings*, and "§7.3 (b) 3 … says the same for S1's water operator (a moved
river)"). The carve is fixed: §4.11 l. 8946–8949 excepts "a raised way, whose deck passes over the run" from the `cut`
fate and makes "a standing raised way and its reservation … no conflict". §7.3 (b) 3 took only the conflict clause (E-D5,
l. 11681–11684: "never a standing raised way or its reservation"); its cut list for the moved river still reads "By
F-REDERIVE's way rung (§5.2) it cuts every other way the new channel ⊕ bank setback meets, and every way but a kept way at
a gate that the new strips will meet" (l. 11675–11676), with no raised-way exception. Row W2's last column (l. 3330)
sends both re-traces to the carve's rule ("a carve's or a moved river's re-trace by §4.11 *Other crossings*, a standing
raised way and its reservation no F-EDIT conflict"); *beneath* writes nothing of the raised way; law 2 (b) moves
"Never … a Tier-2 structure's line, band, supports, spans or ends" (l. 2820); J148's Tier 2 (the owner's choice: "where
they meet, the newer one bends locally"); the support step (6) "only an op that names it changes it" (l. 2569). So a
hand moved river (`moveCourseKnot`, a hand `shiftCourse`) whose re-traced run's new strips meet a standing raised way
keeps it by §4.11, W2 and the laws and cuts it by §7.3 (b) 3 — cutting the older Tier-2 structure for the newer run,
against J148. No bar runs a moved river's re-trace beneath a raised way: T110-2 (5) (l. 19449–19455) runs a carve, and
T110-2 (4)'s epoch `shiftCourse` (l. 19435–19440) asserts the viaduct unchanged only on its waiting run, so a cutting
build passes every bar.

**Required change.** §7.3 (b) 3 (l. 11675–11676): "and every way but a kept way at a gate that the new strips will
meet," → "and every way that the new strips will meet but a kept way at a gate and a standing raised way, whose deck
passes over the run and which the re-traced run meets by §2.7's laws (law 2 (a); its worked example the crossing table's
row W2; §4.11 *Other crossings*),". END at scope, T110-2 (5) (l. 19453): after "no F-EDIT conflict (§4.11 *Other
crossings*) —," add " a hand `moveCourseKnot` moving the river of that fixture so that S1's water operator re-traces a
run of the ring beneath the same aqueduct — the run meeting it by §2.7's laws, no F-EDIT conflict and no `cut`, every
station, key, span and state of the aqueduct unchanged (§7.3 (b) 3) —,".

### VF7-HND-03 — minor — CATALOGUE (wording) — owner V09, END at determinism

**Claim.** V09 §4.9 has no line that fits two hand bends the laws define (the key a builder emits for them, and its
words, are unstated; nothing built changes — VAT-r6-04's class):
* (a) the bent group's (i) — a stroke's crossing moved along the deck to the nearest lawful one, under the nearest
  span that clears the wall or beyond a road deck's foot through a gate there (l. 3192–3197; §7.1 l. 11323; T110-2 (4)
  l. 19363–19367 names `bend.wall.raisedCrossing`). The row's forms (V09 l. 2104) are the base line "The wall runs on
  beneath {way}; the raised way stays as it is." (no move, no distance; and beyond a foot the wall does not run beneath
  the deck), the merged form, the gate form, the keep-clear form for a stretch "along beneath it, entering and leaving
  it on one side, or ending under it", and the fixed-place form;
* (b) a raised way's own hand edit bent where it meets a wall or a held building — a re-shape "bent back along its
  drag" (C13, l. 3301–3303; T110-2 (4) l. 19409–19412), an Arch spacing or Deck height edit "bent to the nearest lawful
  value" (C13, l. 3303–3305; for an aqueduct its level by law 1 (2), (5)), a width or class edit, an edit bent to keep a
  held building's strip clear "in that edit's own bend line" (l. 3119). §7.1's catch-all row (l. 11326) sends them to
  "V09 §4.9's `bend.*` rows", where `bend.raised.wall` says the road "comes down before the {wall} and passes through its
  gate" (V09 l. 2102) and `bend.raised.clearance` speaks of carts under a crossed way (l. 2100).
(VF7-RDR-07 lists the separate valid choice of one line for a stroke meeting several raised ways.)

**Required change.** (a) V09 l. 2104, `bend.wall.raisedCrossing`, after its keep-clear form add: "— and, for a crossing
moved along {way} to the nearest lawful one (under an arch that clears the wall, or beyond a road deck's foot through a
gate there), "The wall crosses {way} {m} m from your line, where it can pass." —". (b) V09 l. 2102, `bend.raised.wall`,
after its line add: "— and, for a raised way's own re-shape bent back along its drag, "{way} cannot cross {wall} there,
so your change stops {m} m short."; for its Arch spacing, Deck height, width or class bent to the nearest lawful value,
"{way}'s {measure} is {v}, the nearest that keeps clear of {wall}." — `{wall}` the wall's or held building's name, else
its kind's word; `{measure}` the edited value's word —", its source cell adding "; a raised way's own edit bent where it
meets a wall-like structure or a held building (§2.7's laws, law 2 (a), law 3; its worked example the crossing table's
C13)". END at determinism, §7.1's catch-all row (l. 11326): "a raised way's clearance, ends, wall and island strokes" →
"a raised way's clearance, ends, wall and island strokes and its own edits bent where they meet a wall
(`bend.raised.wall`)".

## 3. Held for round 8 (outside the family, not graded)

* V09 T-V9-52 (V09 l. 4427): "a carve across a viaduct passes beneath clear of its piers, with
  `bend.raised.underSpan`" names the bend key for a carve the way-and-channel table's row (e) and §7.1's row bend only
  where the drawn crossing meets a support; the fixture does not say it does (a raised way × channel case).

## 4. Verdict for this lens

The family's hand path is coherent with J144 throughout: no text of the lens lets a placement lock or a pin refuse,
skip or alter a meeting; the clerk sends the canvas's events and renders its catalogue, so a gesture's outcome never
splits by surface; the laws reach every hand op of the lens (T3's walls, gates and grips, re-anchoring and conversions,
T4's raised roads, aqueducts, re-shapes and measures, carves, moved rivers, deletes, warps and undo) with one outcome, and
§5.3's law-1 row and T110-4 (hand ops sent as gestures and as clerk calls, each undone) check every invariant. Sixteen of
the eighteen round-6 ids of the lens are fixed; VPC-r6-03 persists for the moved river. Three majors remain, each a
§7.1 text the repairs did not conform to a law Part P refined late: §7.1's bend rows still push a hand gate, a hand
road's gate and a hand fixed place out of an aqueduct's strip where J149's over crossing admits them (VF7-HND-01, item
101 R2; T110-2 (4) and T-V7-48 assert the laws); §7.1 and V09 still read an aqueduct crossing pass 5's way, lawful
anywhere and bent only for Tier-1 things (VF7-HND-02, the hand member of VF7-GEN-01); and §7.3 (b) 3 still cuts a
raised way a moved river's re-traced run meets (VPC-r6-03, J148). One minor: V09's catalogue has no fitting line for
two hand bends. Each fix is a few words at one row, with a bar for the case no test ran. Nothing is reported that J150
hands to round 8.
