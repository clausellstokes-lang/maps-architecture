# Family verify — round 7y, hand edits, locks and the interface (raised way × wall)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/famverify-hand-r7y; covered by the
> whole-design retrovalidation (J84).

PROGRESS (lane `coherence/famverify-hand-r7y`, 2026-10-02, the live design after assemble-r7y; HEAD `61a493b`, whose
design files are assemble-r7y's install — the later commit touches only the log and the briefs; `docs/ARCHITECTURE.md`
sha256 `c13613c5…`, V09 `1394a5ee…`, V10 `cb4d9cff…` (byte-equal to round 7x's), V07 `a93d1f64…`)
- [x] H1 read whole: the brief; `adjudication-r7.md` Part A (J147's and J150's hand-off), Part L (terms, laws 1–4, the
  check, corrections 1–7, the restated veto list) and Part P passes 7–8 with their re-checks; `adjudication-r7v.md`,
  `-r7w.md`, `-r7x.md` and `-r7y.md` whole (the decisions, the class rulings and forms F1 – F6, class (B)'s
  enumeration, Part H by unit, the builders' choices, the held notes); `famverify-hand-r7x.md`; PROGRESS J144, J147,
  J148; the live §2.7 support step (6): the laws (l. 2579–2891) and the worked examples (l. 2893–3390)
- [x] H2 the lens's live text by grep and range: §7.1 (the warp l. 11113–11124, *Raised ways* l. 11151–11180, *Delete*
  l. 11227–11235, the edit targets l. 11254–11281, the dry run's lead and outcome table l. 11283–11366, the binding
  l. 11407–11421); §7.2 (l. 11473–11542) and §7.4's lock column (read for J144 and J150 only); §7.3's operator table
  (l. 11602–11614), (b) 2–3 (l. 11683–11716) and item 4 (l. 11758–11772); §7.4 *Application* and *Independence*
  (l. 12021–12045), *Warp and what stands on the ground* (l. 12096–12127), the family rows (l. 12142–12145); §4.11
  `wallToWay`, the carve and *Other crossings* (l. 8939–8972); §5.2's F-WALL (l. 9862) and F-REDERIVE (l. 9879); §5.3's
  law-1 row (l. 9950); §5.4's `reshaped` and `ReshapeChange` (l. 10013–10014); `EditFate` (l. 10994); T110-2's lead,
  (1)–(8) and T110-4 (l. 19230–19729); V09 §3.5's handles (l. 1161–1213), §4.5's T3, T4, T9 and T10 rows
  (l. 1816–1823), §4.9's family rows (l. 1983, 1997, 2009, 2033, 2102–2107, 2148, 2170–2171), §4.20.2 (l. 3002–3077),
  §4.20.3 (l. 3082–3135), §4.20.6 (l. 3190–3236), §4.20.7 (l. 3238–3253), §5.5 (l. 3962–3977), T-V9-13 and T-V9-52
  (l. 4393, 4432); V10's fates (l. 585), raised-way read (l. 1686), refusal categories (l. 2412), encoders
  (l. 2757–2830); V07 §3.5a (1), (4) (V07 l. 1575–1634) and T-V7-48 (V07 l. 3715); V04 T-V4-63 and T-V4-80 (V04
  l. 3164, 3181); V06 §2.8's conversions (V06 l. 710–735)
- [x] H3 re-check: VF7x-HND-01 – -03 against the live text — all three fixed (section 1); r7y's class-(A) sites of this
  lens (D4, D8 – D10, V9-4) written in F6; the round-7, 7v and 7w fixes of this lens still stand
- [x] H4 attack: every hand op of the lens — T3's `drawWall` in both forms, a moved trace vertex, a re-anchored stretch,
  `placeGate` and a gate's grip, the castle's keep and bailey grips, the retaining wall's chain grip, the `convert`s
  (`breach`, `dismantle`, `wearWall`, `neglect`, `gateToJunction`, `wallToWay`, `absorbWall`, `contractWall`,
  `repairWall`), a re-section by `setAttr`; T4's raised roads and aqueducts (the carried way's gate by D6's order), a
  re-shape, a ramp end's drag, Arch spacing, Deck height, width and class, a span's `use`, `repairRaised`, a `split` or
  `merge`, a warp and a `revert` that move either side; carves, moved rivers and terrain strokes in `follow` mode;
  deletes and Build it again; their dry runs, bend keys, lines, fates and effects; undo and redo; canvas and clerk —
  under laws 1–4, J144, J147 – J149, item 110 (b), (f), item 114 and item 101 R2; nothing reported that J150 hands to
  round 8 (the two-axis lock itself and its readers — §7.1's lock row, §7.2's *Declared means held* and *Drawn
  constraints*, §7.3 item 4's fates, §7.4's lock column, §5.3's declared row, V09's and V10's lock tools — and a lock's
  behaviour under an undo, a redo, a re-grade or value edit within a standing meeting, or a repair)
- [x] H5 graded by J141 under J146 and J151; written; result saved; LANDED

Grading used (the brief's, as the four fix passes apply it): MAJOR only where the laws, or the design text written from
them, give a case no lawful outcome, an outcome breaking an owner rule or a law-1 invariant, leave a law-1 invariant
checked by no bar, or make a check or a named test fail a correct build; where every outcome keeps law 1 and the owner
rules, passes the check and fails no named test, a minor (a VALID CHOICE, J151). A reader that restates a step another
text runs narrower or wider than that text and the laws it cites, a citation, a catalogue line, an example's slip and a
test gap whose wrong build keeps law 1 are minors (`adjudication-r7y.md`'s grading; VF7v-EPO-05's and VF7x-TST-02's
grades). Line numbers are the live files' at HEAD `61a493b` (`docs/ARCHITECTURE.md` unless a volume is named).

## 1. The round-7x findings of this lens, re-checked against the live text

| id (owner, round-7x grade · ruling) | what it asked | live text now | verdict |
|---|---|---|---|
| VF7x-HND-01 (V09; minor · FIX V9-1) | a line form for a gate a hand stretch makes for a ground way and moves along that way | V09 l. 2104, `bend.wall.raisedCrossing`'s line cell: "— and, for a gate the stretch makes for a ground way moved along that way to where §2.7's laws admit it (law 1 (5), law 2 (a), law 3; its worked example the bent-group sentence (iv)), "The gate for {road} stands {m} m along it, where a gate can stand; the wall passes through it." — `{road}` the ground way's name, else its class's word" | **fixed** |
| VF7x-HND-02 (determinism; minor · FIX D5) | §7.3 (b) 3 to cite law 2 in its order, with F-REDERIVE's raised-way rung, at both its raised-way citations | l. 11704–11707: "(the raised way met by §2.7's laws, law 2, in its order — a run with no lawful shape taking F-REDERIVE's raised-way rung (§5.2) —; its worked example the crossing table's row W2; §4.11 *Other crossings*)"; l. 11713–11715: "which a re-traced run meets by §2.7's laws, law 2, in its order; its worked example the crossing table's *beneath*, row W2" | **fixed**; F-REDERIVE's raised-way rung stands at l. 9879 ("**A wall run with no lawful shape at a raised way** … by hand, `refuse.raised.meeting` (§7.1); at an epoch, the water op … waiting") |
| VF7x-HND-03 (determinism; END V09; minor · FIX D6, V9-2) | the raised road's gate in §7.1 *Raised ways* and V09 §4.20.2 (4) resolved by law 2 in its order, not by the shape-lock trigger alone; a drawn ground road's crossing of a wall beneath a deck | §7.1 l. 11154–11160: "its ends where §2.7's laws admit them (law 1, read with its terms; chiefly (3), (4)), and passes through the gate its ground way makes there — in a placement-locked wall too, the fate *reshaped* (law 4's (G2)); a gate §2.7's laws bar there (law 1, read with its terms; chiefly (5), (10): a shape-locked wall's among them) resolved by those laws, law 2, in its order: (a) the way's crossing of the wall moved to the nearest place they admit its gate, (b) else the way re-routed through the nearest gate of that wall a way of its class may pass, (c) else refused (law 2 *Carried way*, law 3) —"; V09 l. 3017–3021 (the same in its words) and l. 3031–3034 ("its crossing of a wall's trace beneath the deck moved to the nearest at which §2.7's laws admit its gate (law 1, read with its terms, chiefly (5); law 2 (a), law 3; its worked example the way-and-channel table's row (b))") | **fixed** — both sites now read as law 2 *Carried way* does |

`adjudication-r7y.md`'s class-(A) sites in this lens stand in F6: F-WALL's detection (l. 9862: "a fixed place the trace
lays with no point in reach that §2.7's laws admit") and F-REDERIVE's water gate (l. 9879) (D4); §7.1's
`bend.wall.raisedCrossing` cause (l. 11351: "where §2.7's laws bar a gate there (law 1, read with its terms; chiefly
(5)) … whose claim §2.7's laws bar there (law 1, read with its terms; chiefly (6))") (D8); the `refuse.raised.meeting`
cause (l. 11352: "a fixed place with no point in reach that §2.7's laws admit") (D9); the `bend.raised.underSpan` cause
(l. 11353: "law 1, read with its terms, chiefly (1), (5), (8)") (D10); V09 §4.20.2 (4)'s wall stroke and gate (l. 3027–3030)
and the two source cells (l. 2104, 2105) (V9-4); T-V9-52's slid gate and the wall along beneath (l. 4432) (V9-3).

The round-7w and round-7v fixes of this lens still stand: §7.1's `bend.wall.raisedCrossing` outcome as the nearest
lawful shape (l. 11351; T110-2 (4)'s margin case, l. 19451–19457) (VF7w-HND-01); `bend.raised.wall`'s keep-clear form
and `bend.wall.raisedCrossing`'s crossing form (V09 l. 2102, 2104) (VF7w-HND-02); `bend.wall.aqueductArch`'s
"placement-locked or not, a shape-locked one never merged into" (V09 l. 2103) (VF7w-HND-03); T110-2 (4)'s placed and
slid gate (l. 19484–19487) and T-V9-52 (V09 l. 4432) (VF7w-HND-04); §7.4 *Independence* (l. 12033–12037), §7.1's undo
row (l. 11319) and T110-2 (4)'s refused undo (l. 19460–19463) (VF7v-HND-02); "placement-locked" at §7.1 l. 11156,
V09 l. 3021–3022 and l. 3037–3038 and V09 §5.5 (l. 3965–3966) (VF7v-HND-03); F-WALL's hand clause (l. 9862) and W1's last column
(l. 3346) (VF7v-HND-04); the hand castle's cause, line and bar (l. 11351; V09 l. 2104; T110-2 (3) l. 19422–19426)
(VF7v-HND-05). VF7-RDR-07 and VF7v-RDR-05 stay listed builders' choices.

**J144 at the lens's sites.** No text of the lens makes a placement lock or a pin refuse, skip or alter a meeting of a
wall and a raised way: §7.1's bend rows read "either side locked, pinned or neither" (l. 11351, 11353) and
`refuse.raised.meeting` offers "never `unlock`" (l. 11352; V09 l. 2107; V10 l. 2412); the raised road's gate is made in
a placement-locked wall with the fate *reshaped* and in a shape-locked one never, the way re-routed by law 2 (b), else
refused (l. 11155–11160; T110-2 (2) l. 19368–19371); §7.2 *Protection* holds a wall, a raised way or an arch vault "in
its placement only: its shape where they meet decided by §2.7's laws, law 2" (l. 11476–11477); §7.3's S7 operator inserts
a declared way's gate "on the run's standing line, the run neither re-traced nor moved" and meets each standing raised
way "by §2.7's laws (law 2, in its order …)" (l. 11609); §4.11 *Other crossings* makes a standing raised way, "locked,
pinned or neither", no conflict, "a shape lock honoured (law 1 (10))" (l. 8971); §7.4's family rows hold placement
and leave shape to the laws (l. 12142–12145); §5.4's `reshaped` and `ReshapeChange` (l. 10013–10014), `EditFate`
(l. 10994), V09's `fate.reshaped` with its six change forms (V09 l. 2033) and the fates sheet (V09 l. 3962–3977) show each
reshape of a placement-locked thing. The clerk sends the canvas's events (V10 l. 2787–2791: `drawWall`, `placeGate`,
`drawWay` with `raised: true`; other kinds passed through as events, V10 l. 2762), renders the same catalogue rows
(V10 l. 2412), counts *reshaped* among its fates (V10 l. 585) and tells a span the laws read `open` as the panel does
(V10 l. 1686; V09 §4.20.6 (2)); T-V9-13 holds the canvas's events byte-equal to the clerk's and T110-4 (c) runs hand ops
"both as the canvas's scripted gestures and as the clerk's calls", one model and one records digest on two hosts
(l. 19704–19706). So no gesture's outcome splits by surface.

## 2. Findings

### VF7y-HND-01 — minor — READERS (a hand bend's citation narrower than F4) — owner determinism

**Claim.** §7.1's outcome table, its last row ("every other infeasible declaration (item 101 R2) | bent | the nearest
lawful declaration, named in one line —", l. 11354), lists among what it bends "the course an aqueduct drawn across a
standing wall takes over or through it by its level (§2.7's laws, law 1 (2), (5))". The same bend's operator text, §7.1
*Raised ways* (l. 11161–11163), reads "a course §2.7's laws do not admit bent to the nearest course they admit, else
refused (item 363; §2.7's laws, law 1 (2)–(6), (9)–(11); law 2 (a), (c), law 3 …)", and V09's key for it,
`bend.wall.aqueductArch` (V09 l. 2103), cites "law 1 (2)–(6), (9)–(11), law 2 (a), law 3". `adjudication-r7x.md`'s F4
writes a hand bend as "bent to the nearest lawful shape §2.7's laws give (law 1 (2)–(6), (9)–(11), law 2 (a), law 3)",
and `adjudication-r7y.md`'s F1 paragraph rules that "a citation that sets a narrower set than F1 for a line is conformed
to F1"; this row was swept by neither pass. A builder taking the row's set bends the aqueduct's course for its level and
for a gate or tower (law 1 (5)) but not off a raised way's ends under a band (4), a fixed place (6), a held building's
strip (9), a shape-locked wall's merge (10) or a Tier-1 footprint (11); §7.1 *Raised ways*, which runs the bend, decides
the case and §5.3's law-1 row rejects any other build at the commit — a reader narrower than the step it names, minor
(`adjudication-r7y.md`'s class grade).

**Required change.** §7.1's outcome table, the row "every other infeasible declaration (item 101 R2)" (l. 11354): "the
course an aqueduct drawn across a standing wall takes over or through it by its level (§2.7's laws, law 1 (2), (5))" →
"the course an aqueduct drawn across a standing wall takes over or through it by its level (§2.7's laws, law 1
(2)–(6), (9)–(11), law 2 (a), law 3; `bend.wall.aqueductArch`)".

### VF7y-HND-02 — minor — CATALOGUE (a hand bend whose cause no row names) — owner determinism, END at V09

**Claim.** A warp and a `revert` each move a wall's trace by hand and are bent by §2.7's laws where the moved stretch
meets a standing raised way: §7.1's warp paragraph resolves "each meeting the warp makes of a wall-like structure and a
raised way … by §2.7's laws (law 2 *A warp*), the raised way the older where it moved both" (l. 11121–11123); law 2 (a)
gives "a warp's result" "the lawful shape law 3 picks nearest it" (l. 2810–2811); *Order* names "a re-shape, a warp, a
`revert`" among the ops that date what they move (l. 2682–2683); law 4's list holds "a warp, a revert" (l. 2862); and
§7.1's lead names every bend "in one line" (l. 11301–11303). The raised way's side of these ops has its cause —
`bend.raised.wall`'s source cell, "a raised way's own edit bent where it meets a wall-like structure or a held building
(…; its worked example the crossing table's C13)" (V09 l. 2102), C13 naming "a `warp` that moves it, a `revert`"
(l. 3312). The wall's side has none: §7.1's `bend.wall.raisedCrossing` row lists "a hand `drawWall`, a moved trace
vertex, a re-anchored stretch, `repairWall`'s new stretch on a dismantled run, a run a hand carve or moved river re-traces
or a run a hand `setAttr` re-sections on its kept trace, … or a `placeGate` or a gate's slid crossing …, or a castle
sited or resized by hand" (l. 11351), and V09's source cell "a hand stretch across or beneath a standing raised way"
(V09 l. 2104) reads W2's list (l. 3347), which names no warp or `revert`; the warp's own catalogue rows are the kernel's
halving (`bend.warp.halved`, V09 l. 1999) and a held record's refusal (`refuse.warp`, V09 l. 1996). One builder names a
warped or reverted stretch's moves in `bend.wall.raisedCrossing`'s line (reading "a moved trace vertex" to take in the
vertices a warp or a `revert` moves), another in the last row's catch-all line or none. The geometry is the laws' in
every build and no bar counts lines — the class of VF7x-HND-01 and VF7w-HND-02: minor.

**Required change.**
1. §7.1's outcome table, the `bend.wall.raisedCrossing` row, its cause (l. 11351): "a hand `drawWall`, a moved trace
   vertex, a re-anchored stretch," → "a hand `drawWall`, a moved trace vertex (a `moveVertex`, or a stretch a `warp` or a
   `revert` moves: §2.7's laws, law 2 *A warp*, law 4), a re-anchored stretch,".
2. END at V09, §4.9's `bend.wall.raisedCrossing`, its source cell (V09 l. 2104): "§7.1's outcome row for a hand stretch
   across or beneath a standing raised way," → "§7.1's outcome row for a hand stretch across or beneath a standing
   raised way (a stretch a `warp` or a `revert` moves among them),".

### VF7y-HND-03 — minor — TESTS (a hand cell's outcome its named test does not set up) — owner scope

**Claim.** Row W14 — "a hand `setAttr` of a stretch's grade (`profile/<arc ordinal>/grade`) or of the enceinte's kind,
re-derived by §7.3's S7 operator (H)" — gives in its C2 cell, for every column it reaches, "its standing towers and
gates kept, a re-section whose new footprint of one would lie where law 1 (5) bars it, or whose new top would leave one
in a crossing law 1 (5) bars (an aqueduct's arch no longer clearing the wall), having no lawful shape there (law 2 (c))"
and names "T110-2 (4) (H), T-V7-48 (E)" (l. 3359); its last column gives the hand outcome "(G3)", i.e.
`refuse.raised.meeting` (§7.1, l. 11352). T-V7-48 runs only the epoch's REPLACEMENT wait ("on a variant whose palisade
gate stands under the declared aqueduct's arch, the arch clearing the palisade and the gate but not the stone wall's top,
the REPLACEMENT [waiting]", V07 l. 3715). T110-2 (4)'s two hand re-sections set up no kept gate: "a hand `setAttr`
re-grading a `light` stretch of the hand `drawWall` above to `full` under the aqueduct — its wider band kept to a lawful
crossing, re-traced locally where it would not cross lawfully, part of its bend" (l. 19488–19491) and "a hand `setAttr`
of the hand `drawWall`'s kind, under the aqueduct, to a kind whose band is wider (W14), as the grade change"
(l. 19541–19543). So the hand refusal is run by no bar: a build that keeps the old section on the stretch under the arch,
or refuses with another key, keeps law 1 and passes T110-4 (c) (l. 19693–19719) and every other bar. A build that moves
the gate or leaves its footprint under the arch fails §5.3's law-1 row (law 1 (11), (5)). A test gap whose wrong build
keeps law 1, the class of VF7x-TST-02: minor.

**Required change.** §13.2's T110-2 (4) (l. 19541–19543): after "a hand `setAttr` of the hand `drawWall`'s kind, under
the aqueduct, to a kind whose band is wider (W14), as the grade change;" insert " and, on a variant whose hand `drawWall`
makes its gate for a ground way under the aqueduct's arch in an over crossing whose span clears the wall's top and the
gatehouse (§2.7's laws, law 1 (5)), that `setAttr` to a kind whose gatehouse or top that span would no longer clear —
refused `refuse.raised.meeting`, nothing of either written, the gate unmoved (§2.7's laws, law 1 (5), (11), law 2 (c);
its worked example row W14);".

### VF7y-HND-04 — minor — READERS (the shape lock restated wider than law 1 (10)) — owner V09

**Claim.** V09 §4.20.2 (4) ends its list of the hand ops that bring a wall and a raised way together — a raised road, an
aqueduct, a T3 stroke, a placed or slid gate, "a **Change over time** breach, dismantle or delete of a wall beneath a
deck", a ground road and a carve — with "each the same with either side placement-locked, pinned or neither, a
placement-locked thing's change shown as the fate *reshaped* (a shape-locked one's never made: §2.7's laws, law 1 (10))"
(V09 l. 3037–3039). Read as written, a shape-locked thing's change is never made. Law 1 (10) bars less: "no op makes or
deepens (*commit*) a meeting with a shape-held thing that changes it: a wall-like line, band or strip newly across the
strip of a `vault`-use span of it, an aqueduct merged into it, a soffit lowered over a run of it, a gate made in it"
(l. 2741–2743), its first half holding outline and size (l. 2739–2740), and *The soft readings* follow what stands "at
every step — whichever side's op puts something across a strip or takes the last thing off it" (l. 2776–2779). So a hand
delete of a wall beneath a shape-locked raised way's `vault` span lays its chamber again (W11·C8 "as W11·C2": "V04 lays
again an arch vault the run stood over", l. 3356; Part P pass 8, PRB7H-LCK-02: "a hand `delete`, `wallToWay` or
`dismantle` of the wall under a shape-locked aqueduct's `open`-read span … apply"). A build of V09's words that refuses
that delete, or keeps the chamber off, departs from the laws; the step is run by §7.1's *Delete* and V04's reconcile,
which the laws decide, and T110-2 (4)'s shape-locked C8 run of W11 over the state sweep (l. 19479–19496, 19289–19290)
with §5.3's law-1 row (law 1 (8)) catches either build. A reader wider than the laws it cites, minor
(`adjudication-r7y.md`'s class grade). J150's hand-off does not reach it: a delete is no undo, redo, re-grade or repair
(PRB7H-LCK-02).

**Required change.** V09 §4.20.2 (4) (V09 l. 3038–3039): "a placement-locked thing's change shown as the fate
*reshaped* (a shape-locked one's never made: §2.7's laws, law 1 (10))" → "a placement-locked thing's change shown as the
fate *reshaped*, and no meeting made or deepened that changes a shape-locked one, its readings otherwise following what
stands (§2.7's laws, law 1 (10); *The soft readings*)".

## 3. Held for round 8 (outside the family, not graded)

* Base §7.3 (b) 3 (l. 11703) × §4.11's carve (l. 8961): "it cuts every other way the new channel ⊕ bank setback meets"
  names no exception for a raised way whose deck passes over a moved river's new channel, where a carve keeps it by the
  way-and-channel table's row (e) — raised way × water (`adjudication-r7y.md`'s held note 4, persisting).
* V09 §4.9's `refuse.undo.dependent` (V09 l. 2009: "Later changes by {authors} depend on this. Undo those first.") ×
  §7.1's undo row (l. 11319: the dependents "to undo first — never an event of session `host:port`, so a target one of
  them depends on stays as it is") and §7.4 *Independence* (l. 12038–12041): an undo whose only dependent is a port
  event is refused with a line that asks the user to undo what no session may undo, and no form says that the target
  stays — undo × dossier, no wall meeting needed.

## 4. Verdict for this lens

All three round-7x findings of this lens are fixed in the live text — the gate-for-a-road line form (VF7x-HND-01),
§7.3 (b) 3's law 2 in its order with F-REDERIVE's rung (VF7x-HND-02), and the raised road's gate in §7.1 *Raised ways*
and V09 §4.20.2 (4) resolved by *Carried way*'s order (VF7x-HND-03) — and r7y's F6 sites in the lens and the round-7,
7v and 7w fixes still stand. Attacking laws 1–4 through every hand op of the lens — T3's strokes in both forms,
vertices, re-anchors, gates and grips, the castle, the retaining wall's chain and the `convert`s; T4's raised strokes and
their carried way's gate, re-shapes, ramp ends, measures, spans, repairs, splits, merges, warps and `revert`s; carves,
moved rivers, deletes and Build it again; undo and redo; by canvas and clerk — finds every case a lawful outcome, nothing
against J144, J147 – J149, item 110 (b), (f), item 114 or item 101 R2, every law-1 invariant under §5.3's row and
T110-4, and one event and one catalogue row for each gesture on either surface. **No major remains in this lens.** Four
minors change no built outcome that a bar or the runtime row does not hold: §7.1's catch-all line citing a narrower set
than F4 for the aqueduct's course (VF7y-HND-01); a warp's and a `revert`'s wall bend named by no row's cause
(VF7y-HND-02); W14's hand refusal run by no bar (VF7y-HND-03); and V09 §4.20.2 (4) restating the shape lock wider than
law 1 (10) (VF7y-HND-04). Nothing is reported that J150 hands to round 8.
