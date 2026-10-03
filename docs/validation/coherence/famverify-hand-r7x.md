# Family verify — round 7x, hand edits, locks and the interface (raised way × wall)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/famverify-hand-r7x; covered by the
> whole-design retrovalidation (J84).

PROGRESS (lane `coherence/famverify-hand-r7x`, 2026-10-02, the live design after assemble-r7x; HEAD `d94c4fa`, whose
design files are byte-equal to assemble-r7x's install at `6b9a9b1` — the two later commits touch only `HANDOFF.md`, the
log and the readers check's own files; `docs/ARCHITECTURE.md` sha256 `03573b4f…`, V09 `da502c0a…`, V10 `cb4d9cff…`)
- [x] H1 read whole: the brief; `adjudication-r7.md` Part A (J147's and J150's hand-off) and Part L (terms, laws 1–4,
  the check, corrections 1–7, the restated veto list); `adjudication-r7v.md`'s and `adjudication-r7w.md`'s decisions,
  class ruling, builders' choices and held notes; `adjudication-r7x.md` whole (the 27 decisions, the root-cause ruling
  and its forms F1 – F5, Part H by unit, the held notes); `famverify-hand-r7w.md`; the live §2.7 support step (6): the
  laws (l. 2579–2892) and the worked examples (l. 2893–3416)
- [x] H2 the lens's live text by grep and range: §7.1 (the warp l. 11103–11115, *Raised ways* l. 11141–11151, *Delete*
  l. 11215–11222, the edit targets l. 11233–11269, the dry run and its outcome table l. 11271–11343, the binding
  l. 11395–11404); §7.2 and §7.4's lock column (read for J144 and J150 only); §7.3's S7 row (l. 11597), (a) 4
  (l. 11624–11634) and (b) 3 (l. 11682–11702); §7.4 *Application* and *Independence* (l. 12008–12032), *Warp and what
  stands on the ground* (l. 12083–12093), the family rows (l. 12129–12132); §4.11 the carve and *Other crossings*
  (l. 8938–8963); §5.2's F-WALL (l. 9852) and F-REDERIVE (l. 9869); §5.3's law-1 row (l. 9940); §5.4's `reshaped` and
  `ReshapeChange` (l. 10003–10004); `EditFate` (l. 10984); T110-2's lead, (1), (2), (4), (5) and T110-4 (l. 19240–19676);
  V09 §3.5's handles (l. 1161–1213), §4.5's T3, T4 and T9 rows (l. 1816–1822), §4.9's family rows (l. 1996–2009, 2033,
  2102–2107, 2148), §4.20.2 (l. 3002–3077), §4.20.3 (l. 3078–3131), §4.20.6 (l. 3186–3233), §5.5 (l. 3958–3970),
  T-V9-13 and T-V9-52 (l. 4389, 4428); V10's reads (l. 1681–1686), refusal categories (l. 2412), encoders
  (l. 2775–2815); V07 §3.5a (4) and the REPLACEMENT (V07 l. 1612–1631, 2305–2320); V04 T-V4-63 (V04 l. 3164)
- [x] H3 re-check: VF7w-HND-01 – -04 against the live text — all four fixed (section 1); the round-7 and round-7v fixes
  of this lens still stand
- [x] H4 attack: every hand op of the lens (T3's `drawWall` in both forms, a moved trace vertex, a re-anchored stretch,
  `placeGate` and a gate's grip, the castle's keep and bailey grips, the retaining wall's chain grip, the `convert`s —
  `breach`, `dismantle`, `wearWall`, `neglect`, `gateToJunction`, `wallToWay`, `absorbWall`, `contractWall`,
  `repairWall` —, a re-section by `setAttr`; T4's raised roads and aqueducts, a re-shape, a ramp end's drag, Arch
  spacing, Deck height, width and class, a span's `use`, `repairRaised`, a `split` or `merge`, a warp that moves either
  side; carves, moved rivers and terrain strokes in `follow` mode; deletes and Build it again; their dry runs, bend keys,
  lines and fates; undo and redo; canvas and clerk) under laws 1–4, J144, J147 – J149, item 110 (b), (f), item 114 and
  item 101 R2; nothing reported that J150 hands to round 8 (the two-axis lock itself and its readers — §7.1's lock row,
  §7.2's *Declared means held* and *Drawn constraints*, §7.3 item 4's fates, §7.4's lock column, §5.3's declared row,
  V09's and V10's lock tools, a retaining wall "declared and held" by its drag — and a lock's behaviour under an undo, a
  redo, a re-grade or value edit within a standing meeting, or a repair)
- [x] H5 graded by J141 under J146 and J151; written; result saved; LANDED

Grading used (the brief's): MAJOR only where the laws, or the design text written from them, give a case no lawful
outcome, an outcome that breaks an owner rule or a law-1 invariant, leave a law-1 invariant checked by no bar, or make a
check or a named test fail a correct build; where every outcome keeps law 1 and the owner rules, passes the check and
fails no named test, a minor (a VALID CHOICE, J151); an example's slip, a citation, a catalogue line or a wording a
minor. As the three fix passes apply it: a text a builder builds whose literal outcome breaks law 1 or an owner rule as
the program reads it is major (VF7w-HND-01, VF7w-TBL-01, VF7w-GEN-01); a text that omits a case the laws it cites
decide, its wrong build caught by §5.3's row, is a minor (VF7v-EPO-05, VF7w-GEN-03); a text of the root-cause class
that still restates law 2's order with a step missing is written in `adjudication-r7x.md`'s forms F1 – F5. Line numbers
are the live files' at HEAD `d94c4fa` (`docs/ARCHITECTURE.md` unless a volume is named).

## 1. The round-7w findings of this lens, re-checked against the live text

| id (owner, round-7w grade · ruling) | what it asked | live text now | verdict |
|---|---|---|---|
| VF7w-HND-01 (determinism; END scope; major · FIX D1, S1) | §7.1's `bend.wall.raisedCrossing` row to name the outcome as the laws' nearest lawful shape — a stretch's gate for a ground way to the nearest point law 1 (5) admits (an over crossing's strip margin among them), a road deck's crossing under a span or at a support, an over crossing through a `cleared` ring where admitted; a bar for the margin case | the row (l. 11339): "the op's own stroke, drag or edit bent to the nearest lawful shape §2.7's laws give (law 1 (2)–(6), (9)–(11), law 2 (a), law 3, read with their terms; its worked examples the bent-group sentence and its lawful crossing, the fixed-place sentence and the crossing table's rows W2 and W13) — the stretch's crossings, a gate it makes for a ground way, a fixed place it lays, a placed or slid gate and a castle's claim or bailey each moved only as law 2 (a) moves it, to the place law 3 picks; where law 2 (a) leaves none, law 2 (b), then (c) (the row below) —"; the lawful crossing it names as worked example (l. 3183–3187) cites law 1 (2)–(4), (9), (10) with *Where the line crosses* (l. 3058–3070: over "under a span that clears the wall's top, or through a `cleared` support's ring … where every span above the band, standing or fallen, clears that top"; "a road deck's deck line under a span or at a support"); T110-2 (4) (l. 19416–19422): "a gate the wall makes for a ground way laid at the nearest point along that way at which §2.7's laws admit its footprint … — and, on a run of the hand `drawWall` across the standing aqueduct whose seed is searched so that a ground way crossing under a span over level ground meets the new trace under that span's deck, … that gate moved along the way only until its footprint leaves the deck's plan, the footprint still meeting the under-deck strip beside the deck, the stretch bent through it, part of its bend —" | **fixed** — all three places read as the laws do, and the margin case has its bar. The row's sibling *Raised ways* (l. 11147–11151, D3) is read below (VF7x-HND-03) |
| VF7w-HND-02 (V09; minor · FIX V9-2) | two family bends with no line form: a crossing bent to a road deck's first lawful crossing or a nearer merged one; a raised or aqueduct stroke kept off a wall it would run along | V09 l. 2104, `bend.wall.raisedCrossing`: "for a crossing moved along {way} to the nearest lawful one (§2.7's laws, law 1 (2)–(4), law 3; its worked example the bent-group sentence (i)), "The wall crosses {way} {m} m from your line, where it can pass.""; V09 l. 2102, `bend.raised.wall`: "for a raised or aqueduct stroke bent where §2.7's laws, law 1 (4), bar it (along a wall, or an end under its band or wall strips), "{way} keeps clear of {wall}, {m} m off your line."", its source cell "a raised or aqueduct stroke bent off a wall it would run along or end under (§2.7's laws, law 1 (4), law 2 (a), law 3)" | **fixed**. A third hand move of the same row still has no form: VF7x-HND-01 |
| VF7w-HND-03 (V09; minor · FIX V9-3) | `bend.wall.aqueductArch`'s source cell to read "placement-locked or not, a shape-locked one never merged into" | V09 l. 2103: "file f item 363: an aqueduct drawn across a standing wall, placement-locked or not, a shape-locked one never merged into (§7.1's *Raised ways, aqueducts and retaining walls*; §2.7's laws, law 1 (2)–(6), (9)–(11), law 2 (a), law 3; its worked example *over the band*)" | **fixed** |
| VF7w-HND-04 (scope; END V09; minor · FIX S5, V9-4) | T110-2 (4) and T-V9-52 to stop glossing a gate's lawful places in an aqueduct's strip as "clear of the strip, or under an arch" | T110-2 (4) (l. 19449–19452): "the placed gate moved along the trace to the nearest place §2.7's laws admit it (§2.7's laws, law 1 (5), read with its terms) and the slid one back, on the side its grip came from, to the first such place"; T-V9-52 (V09 l. 4428): "crosses it at the nearest point at which §2.7's laws admit its gate (law 1 (5), law 2 (a), law 3), with `bend.raised.underSpan` in its wall form" | **fixed**. The other "clear of the strip" words left in T110-2 (4) (l. 19441–19442) and T110-2 (5) (l. 19529–19530) are a viaduct's, where law 1 (5) admits no footprint in the strip, so they state the laws' place |

The round-7v fixes of this lens still stand in the live text: VF7v-HND-02 (§7.4 *Independence* l. 12020–12026; §7.1's
undo row l. 11307; T110-2 (4) l. 19424–19427, the refusal naming the `drawWall`; V09 l. 2009 and V10 l. 2412's "an
undo's dependence"), VF7v-HND-03 (§7.1 *Raised ways* l. 11146 "in a placement-locked wall too, the fate *reshaped*";
V09 l. 3019, 3034–3035; V09 §5.5 l. 3962 "reshapes a placement-locked one"), VF7v-HND-04 (F-WALL l. 9852: "a hand op
that runs F-WALL … is refused `refuse.raised.meeting` once its own pull, within its own search band, finds no lawful
shape, its band never widened"; W1's last column l. 3338), VF7v-HND-05 (the castle's cause in §7.1's row l. 11339; V09
l. 2104's castle form; T110-2 (3)'s hand castle siting, its refusal run among them); and the round-7 fixes VF7-HND-01 –
-03 and VPC-r6-03 with them. VF7-RDR-07 and VF7v-RDR-05 stay listed builders' choices.

**J144 at the lens's sites.** No text of the lens makes a placement lock or a pin refuse, skip or alter a meeting of a
wall and a raised way: §7.1's bend rows read "either side locked, pinned or neither" (l. 11339, 11341) and
`refuse.raised.meeting` offers "never `unlock`" (l. 11340; V09 l. 2107; V10 l. 2412); the raised road's gate is made in
a placement-locked wall with the fate *reshaped* and in a shape-locked one never (l. 11146–11148; T110-2 (2)
l. 19340–19344); §7.3's S7 row inserts it on the standing line and meets each standing raised way "by §2.7's laws (law
2, in its order …)" (l. 11597); §4.11 *Other crossings* makes a standing raised way, "locked, pinned or neither", no
conflict (l. 8961–8963); the warp (l. 11111–11114) and §7.4's family rows hold placement and leave shape to the laws;
§5.4's `reshaped` (l. 10003–10004), `EditFate` (l. 10984), V09's `fate.reshaped` (l. 2033: "keeps its place but changes
shape where walls and raised ways meet") and the fates sheet (V09 l. 3962) show each reshape of a placement-locked thing.
The clerk sends the canvas's events (V10 l. 2787–2789; T-V9-13's byte-equal clause; T110-4 (c) "hand ops sent both as the
canvas's scripted gestures and as the clerk's calls", one digest on two hosts) and renders the same catalogue rows (V10
l. 2412), and its raised-way read tells a span the laws read `open` as the panel does (V10 l. 1686; V09 §4.20.6 (2)), so no
gesture's outcome splits by surface.

## 2. Findings

### VF7x-HND-01 — minor — CATALOGUE (a hand bend whose line no form words) — owner V09

**Claim.** §7.1's `bend.wall.raisedCrossing` row moves, among the parts of a hand stretch's bend, "a gate it makes for a
ground way … moved only as law 2 (a) moves it, to the place law 3 picks" (l. 11339) — along that way (law 3, l. 2849:
"a gate the op's own wall lays on a standing way, along that way"; the bent-group sentence's (iv), l. 3207–3210: "one
the stretch makes for a ground way crossing it there along that way, the line bent through it by (i)'s path"; W2's last
column, l. 3339), and two bars run it (T110-2 (4) l. 19416–19422, the aqueduct's margin case, and l. 19440–19441, "a hand
`drawWall` across a standing viaduct where a ground way crosses the new trace under a span — that way's gate clear of the
strip, the stretch bent through it, part of its bend"), each naming `bend.wall.raisedCrossing`. V09's line for that key
(V09 l. 2104) takes "its form by what was drawn or moved", and none of its seven forms is this move: the gate form is
"for a gate dropped or slid inside the under-deck strip … (§2.7's laws, law 1 (5); T3's **Gate**, a gate's grip)" and
says the gate "moves {m} m along {wall}", where this gate moves along the ground way; the keep-clear, crossing,
fixed-place and castle forms name other moves. One builder words it in the gate form (a wrong direction in the words),
another in the keep-clear or crossing form. The geometry is the laws' in every build and no bar counts lines — the
class of VF7w-HND-02 and VF7-HND-03: minor.

**Required change.** V09 §4.9's `bend.wall.raisedCrossing` (V09 l. 2104), its line cell: after "and, for a crossing
moved along {way} to the nearest lawful one (§2.7's laws, law 1 (2)–(4), law 3; its worked example the bent-group
sentence (i)), "The wall crosses {way} {m} m from your line, where it can pass."" insert " — and, for a gate the stretch
makes for a ground way moved along that way to where §2.7's laws admit it (law 1 (5), law 2 (a), law 3; its worked
example the bent-group sentence (iv)), "The gate for {road} stands {m} m along it, where a gate can stand; the wall
passes through it." — `{road}` the ground way's name, else its class's word".

### VF7x-HND-02 — minor — READERS (law 2 cited without its order; `adjudication-r7x.md`'s F3, the D6 sweep's residue) — owner determinism

**Claim.** `adjudication-r7x.md` ruled that every family text naming how an op that meets a raised way resolves the
meeting cites "§2.7's laws, law 2, in its order" (F3), and D6 so rewrote §7.3's S7 operator row ("the meeting by §2.7's
laws (law 2, in its order; its worked example the crossing table's *beneath*)", l. 11597); §4.11 *Other crossings*
already reads "bent where they say (law 2, in its order, law 3 …) … a run with no lawful shape giving way (law 2 (c))"
(l. 8961–8963). The water operator's own batch, §7.3 (b) 3 — the step that re-traces a wall run a moved river (by hand
`moveCourseKnot`, `drawWater`, a `follow` terrain stroke) crosses — still cites law 2 (a) alone, twice:
* l. 11692–11694: "every way but a kept way at a gate and a standing raised way, whose deck passes over the run, that the
  new strips will meet (the raised way met by §2.7's laws, law 2 (a); its worked example the crossing table's row W2;
  §4.11 *Other crossings*)";
* l. 11699–11702: "What the chain may not move — … (never a standing raised way or its reservation, which a re-traced run
  meets by §2.7's laws, law 2 (a); its worked example the crossing table's *beneath*, row W2) — returns to the dry run".
A run with no lawful shape at the raised way takes law 2 (c) — by hand `refuse.raised.meeting`, at an epoch the water op
waiting (F-REDERIVE's raised-way rung, l. 9869; §7.1's refuse row, l. 11340: "a stretch with no lawful crossing (a run a
carve or a moved river re-traces among them)") — which these two citations leave out. The outcome rows and F-REDERIVE give
it, so every build keeps law 1 and §5.3's row catches any other: minor, the citation conformed.

**Required change.** §7.3 (b) 3:
1. (l. 11692–11694) "(the raised way met by §2.7's laws, law 2 (a); its worked example the crossing table's row W2;
   §4.11 *Other crossings*)" → "(the raised way met by §2.7's laws, law 2, in its order — a run with no lawful shape
   taking F-REDERIVE's raised-way rung (§5.2) —; its worked example the crossing table's row W2; §4.11 *Other
   crossings*)".
2. (l. 11700–11702) "which a re-traced run meets by §2.7's laws, law 2 (a); its worked example the crossing table's
   *beneath*, row W2" → "which a re-traced run meets by §2.7's laws, law 2, in its order; its worked example the
   crossing table's *beneath*, row W2".

### VF7x-HND-03 — minor — READERS (a gate's resolution restated with a trigger missing; F3) — owner determinism (§7.1), END at V09

**Claim.** Law 2 *Carried way* (l. 2790–2792): "Where the wall is shape-locked, **or law 2 (a) leaves the way no lawful
gate in it**, the carried way — a Tier-3 way, unless itself shape-locked — is re-routed by law 2 (b) from the first point
beyond the foot through the nearest gate of that wall that a way of its class may pass …, else the op takes law 2 (c)".
Two hand texts restate the raised road's gate with only the first trigger, or none:
* §7.1 *Raised ways* (l. 11145–11149): "a course meeting an enceinte's trace comes down to a ground vertex before it, its
  ends where §2.7's laws admit them (law 1 (3), (4)), and passes through the gate its ground way makes there — in a
  placement-locked wall too, the fate *reshaped*, and in a shape-locked one none, the way re-routed through the nearest
  gate of that wall a way of its class may pass, else refused (§2.7's laws, law 2 *Carried way*, law 1 (10), law 4's
  (G2)) —";
* V09 §4.20.2 (4) (V09 l. 3016–3019): "a raised road or viaduct whose course meets an enceinte's trace ramps down to a
  ground vertex before it and passes through the gate the ground way makes there (§2.7's laws, law 1 (3), law 2 *Carried
  way*; …)"; and, for a drawn ground road, V09 l. 3029–3030 "crosses under the nearest span §4.3 admits, a road no span
  admits going round it", with no word of the gate it makes in a wall beneath the deck, which §7.1's
  `bend.raised.underSpan` row moves "to the nearest at which §2.7's laws admit its gate" (l. 11341; row (b), l. 2914).
**Case:** a hand raised road whose carried way, beyond its foot, crosses an unlocked enceinte at a point under a second
standing raised way — a viaduct, or an aqueduct whose span there does not clear the gatehouse —, so that law 1 (5) bars
the gate there (l. 2724–2725). The laws: law 2 (a) first (the carried way, the op's own, re-laid locally so its crossing
takes the nearest place they admit its gate, law 3), else (b)'s re-route through the nearest gate, else (c). The two
texts state the gate made "there" unconditionally but for a shape lock. Each cites *Carried way*, which decides the case,
and a build of the bare words makes a gate §5.3's law-1 row rejects at the commit, so every shipped build reaches the
laws' outcome or a caught failure: an omission of a case the cited law decides, minor (VF7v-EPO-05's grade), but one
more member of `adjudication-r7x.md`'s class, which D3 rewrote in this sentence for the aqueduct and the road deck's
ends and left here.

**Required change.**
1. §7.1 *Raised ways, aqueducts and retaining walls* (l. 11146–11149): "and passes through the gate its ground way makes
   there — in a placement-locked wall too, the fate *reshaped*, and in a shape-locked one none, the way re-routed through
   the nearest gate of that wall a way of its class may pass, else refused (§2.7's laws, law 2 *Carried way*, law 1 (10),
   law 4's (G2)) —" → "and passes through the gate its ground way makes there — in a placement-locked wall too, the fate
   *reshaped* (law 4's (G2)); a gate §2.7's laws bar there, a shape-locked wall's among them, resolved by those laws, law
   2, in its order: (a) the way's crossing of the wall moved to the nearest place they admit its gate, (b) else the way
   re-routed through the nearest gate of that wall a way of its class may pass, (c) else refused (§2.7's laws, law 1 (5),
   (10), law 2 *Carried way*, law 3) —".
2. END at V09, §4.20.2 (4):
   * (V09 l. 3017–3019) "ramps down to a ground vertex before it and passes through the gate the ground way makes there
     (§2.7's laws, law 1 (3), law 2 *Carried way*; its worked example *down before the wall*; `bend.raised.wall`)" →
     "ramps down to a ground vertex before it and passes through the gate the ground way makes there, a gate §2.7's laws
     bar there (a shape-locked wall's among them) resolved by those laws, law 2, in its order — the crossing moved, else
     the way re-routed through the nearest gate of that wall, else refused (§2.7's laws, law 1 (3), (5), (10), law 2
     *Carried way*; its worked example *down before the wall*; `bend.raised.wall`)";
   * (V09 l. 3029–3030) "crosses under the nearest span §4.3 admits, a road no span admits going round it," → "crosses
     under the nearest span §4.3 admits — its crossing of a wall's trace beneath the deck moved to the nearest at which
     §2.7's laws admit its gate (law 1 (5), law 2 (a), law 3; its worked example the way-and-channel table's row (b)) —,
     a road no span admits going round it,".

## 3. Held for round 8 (outside the family, not graded)

* Base §7.3 (b) 3 (l. 11690–11691): "it cuts every other way the new channel ⊕ bank setback meets" names no exception
  for a raised way whose deck passes over a moved river's new channel, where a carve keeps it by the way-and-channel
  table's row (e) (§4.11, l. 8951) — raised way × water; persisting as `adjudication-r7x.md`'s held note 5.

## 4. Verdict for this lens

All four round-7w findings of this lens are fixed in the live text — §7.1's `bend.wall.raisedCrossing` row now names the
laws' nearest lawful shape for every part of a hand stretch's bend, with the over crossing's margin case run by T110-2
(4) (VF7w-HND-01), the two missing line forms written (VF7w-HND-02), the "placement-locked" source cell (VF7w-HND-03) and
the two bars' gate glosses replaced by citations (VF7w-HND-04) — and the round-7 and round-7v fixes still stand. Attacking
laws 1–4 through every hand op of the lens — T3's strokes in both forms, vertices, re-anchors, gates and grips, the
castle, the retaining wall's chain and the `convert`s; T4's raised strokes, re-shapes, ramp ends, measures, spans,
repairs and warps; carves, moved rivers, deletes and Build it again; undo and redo; by canvas and clerk — finds every case
a lawful outcome, nothing against J144, J147 – J149, item 110 (b), (f), item 114 or item 101 R2, every law-1 invariant
under §5.3's row and T110-4, and one event and one catalogue row for each gesture on either surface. **No major remains
in this lens.** Three minors change no built outcome: a hand bend with no line form (VF7x-HND-01), and two residues of
`adjudication-r7x.md`'s root-cause class — §7.3 (b) 3 citing law 2 (a) without law 2's order (VF7x-HND-02), and the raised
road's gate restated in §7.1 *Raised ways* and V09 §4.20.2 (4) with *Carried way*'s second trigger missing
(VF7x-HND-03). Nothing is reported that J150 hands to round 8.
