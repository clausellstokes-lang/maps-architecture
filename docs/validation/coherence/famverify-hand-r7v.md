# Family verify — round 7v, hand edits, locks and the interface (raised way × wall)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/famverify-hand-r7v; covered by the
> whole-design retrovalidation (J84).

PROGRESS (lane `coherence/famverify-hand-r7v`, 2026-10-02, the live design after assemble-r7v, HEAD `7fda090`)
- [x] H1 read: the brief whole; adjudication-r7.md Part L (the laws, the seven corrections, the restated veto list),
  Part A (J147's and J150's hand-off), Part H's head, Part P's rows this lens turns on (PRB7C-LCK-05, PRB7D-LCK-17,
  PRB7G-LCK-01); adjudication-r7v.md whole (50 decisions, Part H by unit, the builders' choices, the held notes);
  famverify-hand-r7.md (VF7-HND-01 – -03, VPC-r6-03); the live §2.7 support step (6) — the laws (l. 2579–2891) and the
  worked examples (l. 2893–3357)
- [x] H2 the lens's live text by grep and range: §7.1 (*Raised ways* l. 11141–11150, the warp l. 11103–11115, *Delete*,
  the dry-run validation l. 11270–11291, the outcome rows l. 11295–11341, the edit targets and the T3/T4 binding);
  §7.2 (read only for J150's line); §7.3's S7 row (l. 11596) and (b) 2–3 (l. 11662–11701); §7.4 (*Application*,
  *Independence* l. 12019–12045, the family rows l. 12124–12129); §4.11 *Other crossings* (l. 8940–8960); §4.13's wall
  cell; §5.2 F-WALL (l. 9852) and F-REDERIVE (l. 9869); §5.3's gate and law-1 rows (l. 9936, 9940); §5.4's `reshaped`
  (l. 10003–10004); T110-1, T110-2 (1), (2), (4), (5), (7), T110-4 (l. 19207–19604); V04 §3.5.4 (d), UC18, T-V4-62,
  -63, -80; V07 T-V7-48; V09 §3.5's grips, §4.5's T3/T4 rows, §4.9's family rows (l. 2033, 2100–2107, 2148), §4.20.2,
  §4.20.3, §4.20.6, §5.5, T-V9-13, T-V9-52; V10's read row (l. 1686), refusal categories (l. 2405–2450), encoders
  (l. 2787–2789)
- [x] H3 re-check: the four round-7 findings of this lens against the live text — all four fixed (section 1)
- [x] H4 attack: every hand op of the lens (T3's walls, gates and grips, `placeGate`, `moveVertex`, re-anchoring, the
  castle's grips and the `convert`s; T4's raised roads and aqueducts, re-shape, ramp-end drag, Arch spacing and Deck
  height; carves, moved rivers, deletes, the warp; their dry runs, bend keys and fates; undo and redo) under laws 1–4,
  J144 and J147 – J149; nothing reported that J150 hands to round 8 (the two-axis lock itself and its readers — §7.1's
  lock row, §7.2's *Declared means held* and *Drawn constraints*, §7.3 item 4's fates, §7.4's lock column, §5.3's
  declared row, V09's and V10's lock tools, UC18's lock refusals — and a lock's behaviour under an undo, a redo, a
  re-grade or value edit within a standing meeting or a repair)
- [x] H5 graded by J141 under J146 and J151; written; result saved; LANDED

Grading used (the brief's): MAJOR only where the laws or the design text written from them give a case no lawful
outcome, an outcome that breaks an owner rule or a law-1 invariant, leave a law-1 invariant checked by no bar, or make a
check or a named test fail a correct build; where every outcome keeps law 1 and the owner rules, passes the check and
fails no named test, a minor (a VALID CHOICE, J151); an example's slip, a citation, a catalogue line or a wording a
minor. Line numbers are the live files' at HEAD `7fda090` (`docs/ARCHITECTURE.md` unless a volume is named).

## 1. The round-7 findings of this lens, re-checked against the live text

| id (owner, round-7 grade) | what it asked | live text now | verdict |
|---|---|---|---|
| VF7-HND-01 (determinism; ENDs V09, scope; major) | §7.1's bend rows to move a placed, slid or road-made gate only where law 1 (5) bars it, to the nearest point the laws admit; a fixed place moved along its tie; V09's lines; a bar for a hand road under a clearing arch | §7.1's `bend.wall.raisedCrossing` row (l. 11338): cause "a `placeGate` or a gate's slid crossing where §2.7's laws bar a gate there (law 1 (5))", outcome "a fixed place it lays moved along its tie to the nearest place §2.7's laws admit it (law 1 (6))" and "a placed or slid gate moved along the trace to the nearest point at which §2.7's laws admit its footprint (law 1 (5)) — a `placeGate`'s gate to the nearer such point, a slid one back to the first such point on the side its grip came from"; the `bend.raised.underSpan` row (l. 11340): "crossing an enceinte's trace where §2.7's laws bar its gate there … its crossing of a trace to the nearest at which §2.7's laws admit its gate"; V09 l. 2104 ("No gate can stand there beneath {way} …"), l. 2105 ("{name} crosses {wall} where a gate can stand …", its source cell citing the laws); T110-2 (5) l. 19476–19479 (the hand road under a clearing arch, its gate made, and on a second run moved to "the nearest crossing at which §2.7's laws admit its gate") | **fixed** — one residue in a worked example, row (b) of the way-and-channel table, taken as VF7v-HND-01 (minor) |
| VF7-HND-02 (determinism; ENDs V09, scope; major) | §7.1 and V09 to read an aqueduct crossing by level (over only under a clearing span, never through a standing support; merged within the wall's height), the hand aqueduct bent else refused; bars | §7.1's `bend.wall.raisedCrossing` row (l. 11338): "an aqueduct's deck line crossed once in the form its level there gives — over, under a span that clears the wall's top and never through a standing support, where its channel runs above that top; merged where it runs within the wall's height —"; §7.1 *Raised ways* (l. 11146–11150): "a course that cannot cross so — an over crossing whose span over the band would not clear the wall's top, a gate, postern, tower or fixed place its arches would not clear — bent to the nearest course that can, else refused (… law 2 (a), (c) …)"; V09 §4.20.2 (4) (V09 l. 3019–3024): "merged into it where its channel runs within the wall's height … a course that cannot cross so bent to the nearest course that can, else refused"; T110-2 (1) l. 19303–19306 (the low-span hand aqueduct bent with `bend.wall.aqueductArch`, else refused); T110-2 (4) l. 19431–19433 ("over where its channel runs above the ring's top, every span over the band clearing it, merged where it runs within the ring's height") | **fixed** |
| VPC-r6-03 (determinism; END scope; major, persisting) | §7.3 (b) 3's cut list to except a standing raised way a moved river's re-traced run meets; a bar | §7.3 (b) 3 (l. 11689–11693): "and every way but a kept way at a gate and a standing raised way, whose deck passes over the run, that the new strips will meet (the raised way met by §2.7's laws, law 2 (a); its worked example the crossing table's row W2; §4.11 *Other crossings*)"; its conflict clause (l. 11698–11701) unchanged and agreeing; T110-2 (5) l. 19486–19488 ("a hand `moveCourseKnot` moving the river of that fixture so that S1's water operator re-traces a run of the ring beneath the same aqueduct — the run meeting it by §2.7's laws, no F-EDIT conflict and no `cut`, every station, key, span and state of the aqueduct unchanged (§7.3 (b) 3)") | **fixed** (the new channel's own cut of a raised way over it is raised way × water: held note 1) |
| VF7-HND-03 (V09; END determinism; minor) | V09 lines for a crossing moved along a deck and for a raised way's own edit bent at a wall or a held building; §7.1's catch-all naming them | V09 `bend.raised.wall` (l. 2102): "for a raised way's own re-shape bent back along its drag, "{way} cannot cross {wall} there, so your change stops {m} m short."; for its Arch spacing, Deck height or width bent to the nearest lawful value, "{way}'s {measure} is {v}, the nearest that {wall} allows."", its source cell citing law 2 (a), law 3 and C13; `bend.wall.raisedCrossing` (l. 2104): "for a crossing moved along {way} to the nearest lawful one …, "The wall crosses {way} {m} m from your line, where it can pass.""; §7.1's catch-all (l. 11341): "and its own edits bent where they meet a wall or a held building (`bend.raised.wall`)" | **fixed** |

The sibling seats' fixes that land in this lens's sites were read with them and hold: VF7-TST-02 (T-V9-52, V09
l. 4428), VF7-RDR-06 (`fate.reshaped`'s `reshape`, V09 l. 2033), VF7-RDR-08 (the V09 source cells, l. 2102–2106),
VF7-RDR-10 (`effect.vault.removed`, l. 2148), VF7-RDR-02's chamber clause at the hand path (the badge, V09 l. 3061; V10
l. 1686). VF7-RDR-07 stays a listed builders' choice.

**J144 at the lens's sites.** No text of the lens makes a placement lock or a pin refuse, skip or alter a meeting of a
wall and a raised way: §7.1's bend and refuse rows read "either side locked, pinned or neither" and offer no Unlock
(`refuse.raised.meeting`, l. 11339; V09 l. 2107; V10's `rule` category, l. 2412); the raised road's gate is made in a
placement-locked wall with the fate *reshaped* (l. 11145–11146; T110-2 (2) l. 19319–19322); §7.3's S7 row inserts it on
the standing line (l. 11596); §4.11 *Other crossings* makes a standing raised way no conflict (l. 8961); §5.4's
`reshaped` entry and §7.1's `EditFate` carry `met` and the six `ReshapeChange`s (l. 10003–10004, 10984), V09's
`fate.reshaped` words each (l. 2033) and the fates sheet counts them (V09 §5.5). The clerk sends the canvas's events
(V10 l. 2787–2789: T3 `wall`, `gate`; T4 `road` with `raised`) and renders the same catalogue rows, the raised-way read
telling a span the laws read `open` as the canvas does (V10 l. 1686; V09 §4.20.6 (2)), so no gesture's outcome splits by
surface. One hand gesture gives one outcome but for the wording and keys below; none of them changes what is built.

## 2. Findings

### VF7v-HND-01 — minor — EXAMPLE (contradicts the laws) — owner model (§2.7's way-and-channel table)

**Claim.** The way-and-channel table's row (b), its gates cell (l. 2914), still moves a hand way's crossing of a trace
"to the nearest crossing clear of the strip": "a way crossing a trace makes its gate there on ground part 0 (§7.3's S7
row), never where these laws bar a gate (law 1 (5): …): such a crossing of the trace is moved along the deck to the
nearest crossing clear of the strip (`bend.raised.underSpan`, its wall form)". The laws admit the gate under an
aqueduct's arch in an over crossing whose spans clear it (law 1 (5), l. 2724–2725) and take a stroke's value to the
nearest lawful shape (law 2 (a), l. 2810–2811; law 3, l. 2844–2852); §7.1's row, which VF7-HND-01 rewrote, now reads
"its crossing of a trace to the nearest at which §2.7's laws admit its gate" (l. 11340), as T110-2 (5) does (l.
19478–19479). Where the nearest admitted crossing lies inside the strip (a gate clearing its arch where the levelled
ground falls along the span), the example and the laws differ. A worked example is non-normative and the outcome table
and the bar carry the laws, so nothing built or tested changes: minor, the example corrected.

**Required change.** §2.7's way-and-channel table, row (b), its gates cell (l. 2914): "such a crossing of the trace is
moved along the deck to the nearest crossing clear of the strip (`bend.raised.underSpan`, its wall form)" → "such a
crossing of the trace is moved along the deck to the nearest crossing at which these laws admit its gate (law 1 (5),
law 2 (a), law 3; `bend.raised.underSpan`, its wall form)".

### VF7v-HND-02 — minor — READERS (law 4's undo refusal has no home in §7.1's outcome table or §7.4) — owner determinism (§7.1, §7.4), END at scope

**Claim.** Law 4 (l. 2864–2867): "An undo or a redo is its event's exact inverse or re-application, never bent: where
law 1 would not then hold it is refused (§7.4 *Independence*: `refuse.undo.dependent`), naming each later live event
whose structure or lock it would meet to undo first, else what it would meet". The two homes a builder of undo reads do
not carry it:
* §7.4 *Independence* (l. 12019–12022) holds a later event dependent only where "the later event's touched set and
  effective-scope faces are disjoint from the target's touched set and from the target's effective-scope faces dilated
  by one ring of adjacent faces at the coarsest level either touches" fails, and through the input layer (l.
  12030–12040); it then says "the state after a permitted undo is the fold of the log without its target" (l. 12041);
* §7.1's undo row (l. 11306), "the one home of every refusal, conflict and bend cause of a dry run" (l. 11280), names
  only "an `undo` or `redo` whose target has dependent live events (§7.4 *Independence*)".

Part P's PRB7D-LCK-17 (adjudication-r7.md l. 3122; probe-r7d-locks.md l. 513–536) found the case these miss and refined
law 4, writing only T110-4's assertion (E-S13): a user deletes a declared aqueduct whose spans are all `open`, then
draws a wall through where its supports stood, and the owner undoes the delete (V09 §4.20.3 (4)'s **Undo this**) — the
touched sets disjoint (each support ring a point attribute, no `vault` span's reservation), so §7.4 permits the undo,
and its exact inverse stands supports in the wall's band (law 1 (2) broken where the channel runs above the wall's
top). The dry run validates §5.3's invariants on every event (l. 11270–11271), so §5.3's law-1 row (l. 9940) returns
`E_INVARIANT` and nothing commits — law 1 holds whichever way it is built — but no row of the outcome table maps that
failure: one build refuses it `refuse.undo.dependent` naming the `drawWall` and V09 offers **Build it again** (V09
l. 3101), another returns an unmapped invariant failure (at most `refuse.bug`, l. 11328) naming nothing. No bar runs it:
T110-4 (c) asserts the rule (l. 19590–19592) but undoes each hand op at once ("each hand op undone, and then redone, on
a second run", l. 19581), with no later live event between. Every outcome keeps law 1 and passes the check, so minor;
the laws' outcome is written at its homes. (A lock's part of the dependence is J150's and is left out.)

**Required change.**
1. §7.4 *Independence* (l. 12020–12022): "disjoint from the target's touched set and from the target's effective-scope
   faces dilated by one ring of adjacent faces at the coarsest level either touches." → "disjoint from the target's
   touched set and from the target's effective-scope faces dilated by one ring of adjacent faces at the coarsest level
   either touches, and its structure is none that the target's exact inverse or re-application would meet where §2.7's
   laws would not then hold (§2.7's laws, law 4)."
2. §7.1's undo row (l. 11306): "an `undo` or `redo` whose target has dependent live events (§7.4 *Independence*)" → "an
   `undo` or `redo` whose target has dependent live events (§7.4 *Independence*; among them each later live event whose
   structure its exact inverse or re-application would meet where §2.7's laws would not then hold, §2.7's laws, law 4)".
3. END at scope, T110-2 (4) (l. 19385–19386): after "and a hand `delete` of a run beneath a standing viaduct — the
   viaduct unchanged, no bend, the run back on its undo;" insert " an owner's `undo(h, of)` of a hand `delete` of the
   clause's standing aqueduct, after a later hand `drawWall` through where its supports stood with its channel there
   above the wall's top — refused `refuse.undo.dependent` naming the `drawWall`, nothing restored (§2.7's laws, law 4);".

### VF7v-HND-03 — minor — READERS ("held" and "locked" read without J147's shape axis) — owner determinism (§7.1), END at V09

**Claim.** The laws' *held* is "locked, on the axis named, and nothing else (J147)" (l. 2653–2656), and law 1 (10) bars
any meeting that changes a shape-held thing — "an aqueduct merged into it, … a gate made in it" (l. 2739–2743); the
lock sentence and correction 6 read the examples' "locked", "pinned" or "held" at a meeting as placement-locked. Five
hand-path sites of the design text still say "held" or "locked" where only a placement-locked thing takes the outcome
they give:
* §7.1 *Raised ways* (l. 11145–11146): the raised road's gate "— in a held wall too, the fate *reshaped* (§2.7's laws,
  law 2 *Carried way*, law 4's (G2)) —", where *Carried way* gives a shape-locked wall no gate (l. 2790–2793); and its
  aqueduct clause cites law 1 (2), (5), (6) but not (10) (l. 11149);
* §7.1's `bend.wall.raisedCrossing` row (l. 11338): "an arch vault in a `vault` span under it removed (one of the edit's
  consequences; a held one's the fate *reshaped*, law 4's (G2))";
* V09 §4.20.2 (4) (V09 l. 3019): "an aqueduct drawn across a standing wall, held or not, crosses it … merged into it
  where its channel runs within the wall's height"; and (l. 3033–3034) "each the same with either side locked, pinned or
  neither, a held thing's change shown as the fate *reshaped*";
* V09 §5.5 (V09 l. 3962): the fates sheet opens for "an edit whose meeting of a wall and a raised way reshapes a locked
  one".
Read with J147's *held*, each gives a shape-locked wall a gate or a merge (law 1 (10) broken). No hand op can make a
shape lock before round 8 designs the op (adjudication-r7.md Part A), so nothing built or tested changes now: minor,
each site written "placement-locked" with law 1 (10) cited. (The lock op, its axes and its readers outside the
family's meetings are J150's and are not reported.)

**Required change.**
1. §7.1 *Raised ways* (l. 11145–11146): "— in a held wall too, the fate *reshaped* (§2.7's laws, law 2 *Carried way*,
   law 4's (G2)) —" → "— in a placement-locked wall too, the fate *reshaped*, and in a shape-locked one none, the way
   re-routed through the nearest gate of that wall a way of its class may pass, else refused (§2.7's laws, law 2
   *Carried way*, law 1 (10), law 4's (G2)) —"; and (l. 11149) "(item 363; §2.7's laws, law 1 (2), (5), (6); law 2 (a),
   (c);" → "(item 363; §2.7's laws, law 1 (2), (5), (6), (10); law 2 (a), (c);".
2. §7.1's `bend.wall.raisedCrossing` row (l. 11338): "a held one's the fate *reshaped*, law 4's (G2)" → "a
   placement-locked one's the fate *reshaped*, law 4's (G2)".
3. END at V09: §4.20.2 (4) (V09 l. 3019): "an aqueduct drawn across a standing wall, held or not, crosses it" → "an
   aqueduct drawn across a standing wall, placement-locked or not, crosses it"; (V09 l. 3033–3034): "each the same with
   either side locked, pinned or neither, a held thing's change shown as the fate *reshaped*" → "each the same with
   either side placement-locked, pinned or neither, a placement-locked thing's change shown as the fate *reshaped* (a
   shape-locked one's never made: §2.7's laws, law 1 (10))"; §5.5 (V09 l. 3962): "reshapes a locked one" → "reshapes a
   placement-locked one".

### VF7v-HND-04 — minor — WORDING (two readings of a hand op's F-WALL clause) — owner determinism (§5.2), END at model

**Claim.** Law 2 (c) is by path (l. 2825–2836): "**By hand:** refused, `refuse.raised.meeting`", while "**At
generation, a regeneration and a village derivation**" a stage's raised-way rung runs, "re-laid once with law 1's
exclusions impassable and its search band widened to `wall.barrierReachM`"; law 2 (a) bounds a pull by "the pull's
search band" (l. 2808–2809). Part P decided it so (PRB7C-LCK-05, adjudication-r7.md l. 2980: "a hand op is refused …
once its own re-pull fails; F-WALL's raised-way rung … runs at generation, a regeneration and a village derivation
only"). §5.2's F-WALL row (l. 9852) places the hand clause after the rung's description — "the boundary re-pulled once
… its search band widened to `wall.barrierReachM` … → that stage left unwalled …; a hand op that runs F-WALL — a hand
`contractWall`, a terrain stroke's cliff re-anchor — is refused `refuse.raised.meeting` once its own re-pull fails,
never a stage left unwalled" — and W1's last column repeats "a hand op refused once its own re-pull fails" (l. 3340).
Read there, "its own re-pull" is the rung's widened re-pull: a hand `contractWall` whose pull finds no lawful shape in
its band is laid by one build through a band widened to `wall.barrierReachM` and refused by another. Both keep law 1
and the owner rules, and no bar sets the case up (T110-2 (4)'s hand `contractWall`, l. 19407, crosses lawfully), so
minor; the clause written as the laws give it.

**Required change.**
1. §5.2's F-WALL row (l. 9852): "a hand op that runs F-WALL — a hand `contractWall`, a terrain stroke's cliff re-anchor
   — is refused `refuse.raised.meeting` once its own re-pull fails, never a stage left unwalled (§2.7's laws, law 2 (c))"
   → "a hand op that runs F-WALL — a hand `contractWall`, a terrain stroke's cliff re-anchor — takes no rung of it: it
   is refused `refuse.raised.meeting` once its own pull, within its own search band, finds no lawful shape, its band
   never widened and never a stage left unwalled (§2.7's laws, law 2 (a), (c))".
2. END at model, the crossing table's W1, its last column (l. 3340): "a hand op refused once its own re-pull fails,
   never a stage left unwalled (law 2 (c))" → "a hand op refused once its own pull, within its own search band, finds
   no lawful shape, its band never widened and never a stage left unwalled (law 2 (a), (c))".

### VF7v-HND-05 — minor — CATALOGUE (a castle bent by hand for a raised way has no row cause and no line) — owner V09, END at determinism

**Claim.** The fixed-place sentence gives a castle sited or resized by hand one outcome: "by hand a castle sited or
resized (`setAttr(castle, 'site' | 'baileyArea')`, T3) is sited so, its claim moving whole to the nearest lawful site —
or, for a bailey edit, its area to the nearest lawful value —, measured back along the drag, else refused (law 2 (a): a
given value, law 3 picking the nearest; (c))" (l. 3251–3254). §7.1's refuse row names the refusal (l. 11339), but no
bend row names the bend: the `bend.wall.raisedCrossing` row's causes (l. 11338) list strokes, re-traces, re-sections
and gates, and the catch-all (l. 11341) lists "a place's site" among unrelated bends, so the key a builder emits — and
V09's words for it — are unstated: `bend.place.site` ("{name} fits best {m} m away: {reason}.", V09 l. 1974) is S10b's,
with a **Put it here anyway** button no castle has. The outcome is the laws'; only the key and the line differ (VF7-HND-03's
class): minor.

**Required change.**
1. END at determinism, §7.1's `bend.wall.raisedCrossing` row (l. 11338), its cause: after "or a `placeGate` or a gate's
   slid crossing where §2.7's laws bar a gate there (law 1 (5))," insert " or a castle sited or resized by hand
   (`setAttr(castle, 'site' \| 'baileyArea')`) whose claim §2.7's laws bar there (law 1 (6))," (the cell's `\|` the
   design text's `|`, as the refuse row writes it, l. 11339); its outcome: after "its
   stub or way following, the trace unchanged;" insert " a castle's claim moved whole to the nearest lawful site, or its
   bailey to the nearest lawful area, measured back along the drag (§2.7's laws, law 2 (a), law 3; its worked example
   the fixed-place sentence);".
2. V09 §4.9's `bend.wall.raisedCrossing` (V09 l. 2104): after its fixed-place form "for a fixed place moved, "The
   {anchor \| water gate} keeps clear of {way}, {m} m along the {edge}."" add " — and, for a castle moved or resized by
   hand clear of {way}, "The castle keeps clear of {way}, {m} m from where you put it.""; and in its source cell, after
   "or a `placeGate` or a gate's slid crossing inside its under-deck strip where no gate may stand (law 1 (5))," insert
   " or a castle sited or resized by hand (the fixed-place sentence),".

## 3. Held for round 8 (outside the family, not graded)

* Base §7.3 (b) 3 (l. 11689–11690): "it cuts every other way the new channel ⊕ bank setback meets" names no exception
  for a raised way whose deck passes over a moved river's new channel, where a carve keeps a raised way's course and
  every station and meets it by the way-and-channel table's row (e) (§4.11, l. 8951) — raised way × water.

## 4. Verdict for this lens

The family's hand path now carries the laws: all four round-7 findings of this lens are fixed in the live text —
§7.1's bend rows move a placed, slid or road-made gate and a hand fixed place only to the nearest place the laws admit
(VF7-HND-01), §7.1 and V09 read an aqueduct crossing by its level, bent else refused (VF7-HND-02), §7.3 (b) 3 no longer
cuts a raised way a moved river's re-traced run meets (VPC-r6-03), and V09 has lines for a crossing moved along a deck
and a raised way's own edit bent (VF7-HND-03), each with a bar. Attacking laws 1–4 through every hand op of the lens —
T3's strokes, gates, grips, re-anchors, castle and `convert`s, T4's raised strokes, re-shapes, ramp ends and measures,
carves, moved rivers, deletes, the warp, undo and redo — finds no case without a lawful outcome, no outcome against
J144, J147 – J149 or item 110 (b), (f), 114, every law-1 invariant under §5.3's row and T110-4, and no named test failing
a correct build; canvas and clerk send one event and render one catalogue row. Five minors remain, none changing what is
built: an example's "clear of the strip" (VF7v-HND-01), law 4's undo refusal missing from §7.4 and §7.1's undo row
(VF7v-HND-02), "held" and "locked" read without J147's shape axis at five hand sites (VF7v-HND-03), F-WALL's hand
clause readable as the widened rung (VF7v-HND-04), and no key or line for a castle bent by hand (VF7v-HND-05). **No
major in this lens.** Nothing is reported that J150 hands to round 8.
