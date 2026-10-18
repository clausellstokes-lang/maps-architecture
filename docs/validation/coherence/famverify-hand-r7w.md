# Family verify — round 7w, hand edits, locks and the interface (raised way × wall)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/famverify-hand-r7w; covered by the
> whole-design retrovalidation (J84).

PROGRESS (lane `coherence/famverify-hand-r7w`, 2026-10-02, the live design after assemble-r7w, HEAD `1965be7`; every
live file's sha256 equal to assemble-r7w's install — base `561d5541…`, V09 `e76c3c2c…`, V10 `cb4d9cff…`)
- [x] H1 read whole: the brief; `adjudication-r7.md` Part L (terms, laws 1–4, the check, corrections 1–7, the restated
  veto list), Part A (J147's and J150's hand-off), R7-01; `adjudication-r7v.md` and `adjudication-r7w.md` whole (the
  decisions, the class ruling S0 – S11, Part H by unit, the builders' choices, the held notes);
  `famverify-hand-r7v.md` and its result (VF7v-HND-01 – -05); `assemble-r7w.md`'s outcome; the live §2.7 support step
  (6): the laws (l. 2579–2891) and the worked examples (l. 2893–3383)
- [x] H2 the lens's live text by grep and range: §7.1 (the warp l. 11106–11117, *Raised ways* l. 11144–11155,
  *Delete* l. 11219–11227, the edit targets l. 11246–11273, the dry run and its outcome rows l. 11275–11346, the
  T3/T4 binding l. 11399–11404); §7.2 (read for J144 and J150 only); §7.3's S7 row (l. 11601), (b) 3 (l. 11690–11706; its cut list l. 11695–11698)
  and item 4 (read for J150 only); §7.4 *Independence* (l. 12024–12037), *Warp and what stands on the ground*
  (l. 12087–12096), the family rows (l. 12133–12136); §4.11 *Other crossings* (l. 8964); §5.2 F-WALL (l. 9855) and
  F-REDERIVE (l. 9872); §5.3's gate and law-1 rows (l. 9939, 9943); §5.4's `reshaped` and `ReshapeChange`
  (l. 10006–10007); `EditFate` (l. 10987); T110-2 (1)–(8) and T110-4 (l. 19228–19650); V04 UC18 (l. 2467), T-V4-80;
  V07 §3.5a (4) (l. 1612–1634); V09 §3.5's grips (l. 1161–1200), §4.5's T3/T4 rows (l. 1816–1817), §4.9's family rows
  (l. 2009, 2033, 2100–2107, 2148), §4.20.2 (l. 3002–3060), §4.20.3 (4) (l. 3099–3110), §4.20.6 (l. 3186–3232), §5.5
  (l. 3958–3970), T-V9-13, T-V9-52 (l. 4389, 4428); V10's reads (l. 1681–1686), refusal categories (l. 2410–2412),
  encoders (l. 2785–2810), T-V10-40 – -41
- [x] H3 re-check: VF7v-HND-01 – -05 against the live text — all five fixed (section 1); the round-7 fixes of this lens
  (VF7-HND-01 – -03, VPC-r6-03) still stand
- [x] H4 attack: every hand op of the lens (T3's `drawWall`, a moved trace vertex, a re-anchored stretch, `placeGate`
  and a gate's grip, the castle's grips, the retaining wall's chain grip, the `convert`s; T4's raised roads and
  aqueducts, a re-shape, a ramp end's drag, Arch spacing and Deck height, width and class; carves, moved rivers,
  deletes, the warp; their dry runs, bend keys and fates; undo and redo; canvas and clerk) under laws 1–4, J144 and
  J147 – J149; nothing reported that J150 hands to round 8 (the two-axis lock itself and its readers — §7.1's lock row,
  §7.2's *Declared means held* and *Drawn constraints*, §7.3 item 4's fates, §7.4's lock column, §5.3's declared row,
  V09's and V10's lock tools, UC18's lock — and a lock's behaviour under an undo, a redo, a re-grade or value edit within
  a standing meeting, or a repair)
- [x] H5 graded by J141 under J146 and J151; written; result saved; LANDED

Grading used (the brief's): MAJOR only where the laws or the design text written from them give a case no lawful
outcome, an outcome that breaks an owner rule or a law-1 invariant, leave a law-1 invariant checked by no bar, or make a
check or a named test fail a correct build; where every outcome keeps law 1 and the owner rules, passes the check and
fails no named test, a minor (a VALID CHOICE, J151); an example's slip, a citation, a catalogue line or a wording a
minor. As `adjudication-r7v.md` and `adjudication-r7w.md` apply it: §7.1's outcome table is what a builder builds, so a
row whose literal outcome passes a nearer lawful place breaks item 101 R2's "nearest lawful one" as the program reads it
(PRB7H-LCK-03; VF7-HND-01's case (b)) and is no valid choice. Line numbers are the live files' at HEAD `1965be7`
(`docs/ARCHITECTURE.md` unless a volume is named).

## 1. The round-7v findings of this lens, re-checked against the live text

| id (owner, round-7v grade · ruling) | what it asked | live text now | verdict |
|---|---|---|---|
| VF7v-HND-01 (model, minor · MERGED into VF7v-TBL-01, M1) | the way-and-channel table's row (b) to move a hand way's gate "to the nearest crossing at which these laws admit its gate" | row (b)'s gates cell (l. 2914): "such a crossing of the trace is moved along the deck to the nearest crossing at which these laws admit its gate (law 1 (5), law 2 (a), law 3; `bend.raised.underSpan`, its wall form)"; W2's last column, M1's second half (l. 3341): "a gate it makes for a ground way where law 1 (5) bars one placed along that way at the nearest point these laws admit it (law 2 (a), law 3), the stretch bent through it" | **fixed** (by its merge). M1's reason said "§7.1's row … already say[s] so"; §7.1's `bend.wall.raisedCrossing` row still moves the stretch's gate "clear of" the strip — a design-text site this finding did not name: VF7w-HND-01 |
| VF7v-HND-02 (determinism; END scope; minor · FIX D2, S10) | law 4's undo refusal written at §7.4 *Independence* and §7.1's undo row; a bar | §7.4 *Independence* (l. 12024–12028): "… and its structure is none that the target's exact inverse or re-application would meet where §2.7's laws would not then hold (§2.7's laws, law 4)"; §7.1's undo row (l. 11311): "(§7.4 *Independence*; among them each later live event whose structure its exact inverse or re-application would meet where §2.7's laws would not then hold, §2.7's laws, law 4)"; T110-2 (4) (l. 19406–19409): "on a variant whose standing aqueduct's spans all read `open`, an owner's `undo(h, of)` of a hand `delete` of that aqueduct after a later hand `drawWall` through where its supports stood, its channel there above the wall's top — refused `refuse.undo.dependent` naming the `drawWall`, nothing restored (§2.7's laws, law 4)"; V09 l. 2009, 3101 and V10 l. 2412 (`rule`: "an undo's dependence") render it | **fixed** |
| VF7v-HND-03 (determinism; END V09; minor · FIX D3, V9-3) | five hand sites to read "placement-locked", law 1 (10) cited | §7.1 *Raised ways* (l. 11148–11150): "in a placement-locked wall too, the fate *reshaped*, and in a shape-locked one none, the way re-routed through the nearest gate of that wall a way of its class may pass, else refused (… law 1 (10), law 4's (G2))", and (l. 11154) "law 1 (2), (5), (6), (10)"; §7.1's `bend.wall.raisedCrossing` row (l. 11343): "a placement-locked one's the fate *reshaped*"; V09 §4.20.2 (4) (V09 l. 3019, 3033–3035): "placement-locked or not", "a placement-locked thing's change shown as the fate *reshaped* (a shape-locked one's never made: §2.7's laws, law 1 (10))"; V09 §5.5 (V09 l. 3962): "reshapes a placement-locked one" | **fixed** at its five sites; a sixth site of its class, V09's `bend.wall.aqueductArch` source cell, kept "held or not": VF7w-HND-03 |
| VF7v-HND-04 (determinism; END model; minor · FIX D4, M7) | F-WALL's hand clause and W1 read as the hand op's own pull, never the widened rung | §5.2's F-WALL row (l. 9855): "a hand op that runs F-WALL — … — takes no rung of it: it is refused `refuse.raised.meeting` once its own pull, within its own search band, finds no lawful shape, its band never widened and never a stage left unwalled (§2.7's laws, law 2 (a), (c))"; W1's last column (l. 3340): the same words | **fixed** |
| VF7v-HND-05 (V09; END determinism; minor · FIX V9-1, D6) | a castle sited or resized by hand: a cause and outcome in §7.1's row, a V09 line | §7.1's `bend.wall.raisedCrossing` row (l. 11343): cause "or a castle sited or resized by hand (`setAttr(castle, 'site' \| 'baileyArea')`) whose claim §2.7's laws bar there (law 1 (6))", outcome "a castle's claim moved whole to the nearest lawful site, or its bailey to the nearest lawful area, measured back along the drag (§2.7's laws, law 2 (a), law 3; its worked example the fixed-place sentence)"; V09 l. 2104: "for a castle moved or resized by hand clear of {way}, "The castle keeps clear of {way}, {m} m from where you put it."", its source cell citing law 1 (6), law 2 (a), law 3 | **fixed** |

The round-7 findings this lens re-checked in round 7v still stand in the live text: VF7-HND-01 (§7.1 l. 11343's placed
or slid gate and fixed place, l. 11345's `bend.raised.underSpan` "to the nearest at which §2.7's laws admit its gate";
V09 l. 2104–2105; T110-2 (5) l. 19507–19510), VF7-HND-02 (§7.1 l. 11151–11155 and l. 11343's aqueduct forms; V09
§4.20.2 (4); T110-2 (1) l. 19316–19326, (4)), VPC-r6-03 (§7.3 (b) 3 l. 11695–11698; T110-2 (5) l. 19517–19519) and
VF7-HND-03 (V09 l. 2102, 2104; §7.1 l. 11346). VF7-RDR-07 and VF7v-RDR-05 stay listed builders' choices.

**J144 at the lens's sites.** No text of the lens makes a placement lock or a pin refuse, skip or alter a meeting of a
wall and a raised way: §7.1's bend rows read "either side locked, pinned or neither" (l. 11343, 11345) and
`refuse.raised.meeting` offers "never `unlock`" (l. 11344; V09 l. 2107; V10's `rule` category, l. 2412); the raised
road's gate is made in a placement-locked wall with the fate *reshaped* and in a shape-locked one never (l. 11148–11150;
T110-2 (2)); §7.3's S7 row inserts it on the standing line (l. 11601); §4.11 *Other crossings* makes a standing raised
way, "locked, pinned or neither", no conflict (l. 8964); §7.2 *Protection* (l. 11467–11469) and §7.4's rows
(l. 12133–12136) hold placement and leave shape to the laws; §5.4's `reshaped` (l. 10006–10007), `EditFate`
(l. 10987), V09's `fate.reshaped` (l. 2033) and the fates sheet (V09 l. 3962) show each reshape of a placement-locked
thing. The clerk sends the canvas's events (V10 l. 2787–2791, T-V10-40) and renders the same catalogue rows (V10
l. 2410–2412), its raised-way read telling a span the laws read `open` as the panel does (V10 l. 1686; V09 §4.20.6 (2);
T-V10-41), so no gesture's outcome splits by surface. The one hand gesture that gives two outcomes is a stretch's gate
and crossings in §7.1's own row (VF7w-HND-01).

## 2. Findings

### VF7w-HND-01 — major — TWO READINGS (law 1 (2)–(5), law 2 (a), law 3; item 101 R2) — owner determinism (§7.1), END at scope

**Claim.** §7.1's outcome table is "the one home of every refusal, conflict and bend cause of a dry run" (l. 11285).
Its `bend.wall.raisedCrossing` row (l. 11343) — a hand `drawWall`, moved vertex, re-anchored stretch, `repairWall`'s new
stretch, a re-traced or re-sectioned run — states the stretch's outcome in its own words at three places where the
laws, the worked examples and the bars now say otherwise:

1. **The gate a stretch makes for a ground way** — "a gate it makes for a ground way inside the under-deck strip moved
   along that way clear of it (none that stands under an aqueduct's arch in an over crossing whose spans clear it, law
   1 (5))". Law 1 (5) (l. 2724–2725) bars a footprint in a strip "but in an aqueduct's crossing law 1 (2) reads over
   whose every span over it clears its top"; the strip is "the deck's plan between its feet widened each side by
   `raisedWays.structure.stripMarginM`" while a span's strip is the deck's plan between its piers "without that margin"
   (l. 2614–2617), so in an over crossing a footprint beside the deck, in the margin, lies under no span and is admitted;
   law 2 (a) (l. 2810–2813) gives a stroke "the lawful shape law 3 picks nearest it", and law 3 (l. 2848–2850) measures
   "a gate the op's own wall lays on a standing way, along that way". The worked examples were conformed to it — W2's
   last column (l. 3341, adjudication-r7w M1): "a gate it makes for a ground way where law 1 (5) bars one placed along
   that way at the nearest point these laws admit it (law 2 (a), law 3)"; the bent-group sentence's (iv) and *No gate
   and no tower* (l. 3137–3146, 3206–3209): "placed at the nearest lawful point"; *Nearest points* (l. 2997–3003) — and
   §7.1's own rows for a placed or slid gate (l. 11343: "to the nearest point at which §2.7's laws admit its footprint")
   and for a ground way's gate (l. 11345: "to the nearest at which §2.7's laws admit its gate") say the same. Only this
   clause still carries the gate "clear of" the strip. **Case:** a hand `drawWall` across a standing aqueduct whose
   channel there runs above the wall's top (over); a ground way crosses under one of its spans by §4.3's crossing rule
   and meets the new trace under that span's deck; the span's soffit clears the wall's top but not the gatehouse's (a
   gatehouse stands above its wall). The laws move the gate along the way until its footprint leaves the deck's plan —
   its footprint still meeting the under-deck strip in its margin, under no span; §7.1's row carries it a further
   `stripMarginM` (1 m as shipped, V11 l. 863) to clear the strip, and the stretch is bent through the farther gate.
   Two builders, two maps from one gesture; the §7.1 build passes a nearer lawful place — the outcome Part P's pass 8
   ruled against item 101 R2 as the program reads it (PRB7H-LCK-03, adjudication-r7.md l. 3990) and
   `adjudication-r7v.md` graded major in this very row (VF7-HND-01, l. 78: "against item 101 R2's nearest lawful
   place"; its round-7 claim judged this clause "conformed", famverify-hand-r7.md l. 95). No bar holds the case:
   T110-2 (4) asserts "a gate the wall makes for a ground way laid clear of the under-deck strip, or under an aqueduct's
   arch that clears it" (l. 19402–19404) on fixtures whose stated geometry does not put a ground way's crossing under a
   span that fails to clear the gate, so T110-2's lead (S0, l. 19256–19263) cannot make it assert the laws' place, and a
   build of §7.1's row passes every bar.
2. **A road deck's lawful crossing** — "under a road deck's span or beyond its foot through a gate there, whichever law
   3 finds nearer". Law 1 (3) (l. 2716–2720) builds the band "through each of the deck's supports it meets"; the
   bent-group sentence's lawful crossing (l. 3184) is "of a road deck under its span or at its support (the band laid
   through the support)", its (i) (l. 3199–3200) "the first lawful crossing under its deck"; T110-2 (4)'s ramp clause
   was rewritten for exactly this — "bent to that crossing, under the deck's first span or at a support clear of the
   ramp" (l. 19416–19417), adjudication-r7w S1 noting that "naming the span alone would pin a form the laws choose". The
   row still names the span alone: where the first lawful crossing clear of a ramp (or clear of a held building's
   widened strip) falls at a support, the row's builder passes it for the next span.
3. **An aqueduct's over crossing** — "over, under a span that clears the wall's top and never through a standing
   support". Law 1 (2) (l. 2707–2709) reads "each span's soffit standing or fallen", and the examples were conformed by
   adjudication-r7w M2 (l. 3061–3063, 3180–3182): "or through a `cleared` support's ring … where every span above the
   band, standing or fallen, clears that top". A `cleared` ring is no span's strip (l. 2616), so the row's builder bends
   a lawful stroke drawn through it (W2·C5, l. 3341) to the nearest span.

Each is a restatement of the laws narrower than they are (R7-01 (3): cite, never restate), and each gives a literal
build that passes a nearer lawful place; place 1 alone grades the finding MAJOR (a defined hand outcome against item 101
R2, run by no bar), places 2 and 3 being the same row's same defect, fixed in the same words.

**Required change.**
1. §7.1's outcome table, the `bend.wall.raisedCrossing` row (l. 11343), its outcome: "an unlawful crossing moved to the
   nearest lawful one (an aqueduct's deck line crossed once in the form its level there gives — over, under a span that
   clears the wall's top and never through a standing support, where its channel runs above that top; merged where it
   runs within the wall's height —, law 1 (2); under a road deck's span or beyond its foot through a gate there,
   whichever law 3 finds nearer)" → "an unlawful crossing moved to the nearest lawful one (an aqueduct's deck line
   crossed once in the form its level there gives — over, under a span that clears the wall's top or through a
   `cleared` support's ring where every span above the band, standing or fallen, clears that top, never through a
   standing support, where its channel runs above that top; merged where it runs within the wall's height —, law 1 (2);
   a road deck's under a span or at a support, the band laid through it, or beyond its foot through a gate there,
   whichever law 3 finds nearer, law 1 (3), (4); its worked example the bent-group sentence's lawful crossing and (i))".
2. The same row, its outcome: "a gate it makes for a ground way inside the under-deck strip moved along that way clear
   of it (none that stands under an aqueduct's arch in an over crossing whose spans clear it, law 1 (5))" → "a gate it
   makes for a ground way where §2.7's laws bar one there (law 1 (5)) moved along that way to the nearest point at which
   they admit its footprint (law 2 (a), law 3: in an aqueduct's over crossing it may lie inside the under-deck strip,
   under no span that fails to clear it; its worked example the crossing table's row W2)".
3. END at scope, §13.2's T110-2 (4) (l. 19402–19404): "a gate the wall makes for a ground way laid clear of the
   under-deck strip, or under an aqueduct's arch that clears it (§2.7's laws, law 1 (5), law 2 (a))" → "a gate the wall
   makes for a ground way laid at the nearest point along that way at which §2.7's laws admit its footprint (§2.7's
   laws, law 1 (5), law 2 (a), law 3) — and, on a run of the hand `drawWall` across the standing aqueduct whose seed is
   searched so that a ground way crossing under a span over level ground meets the new trace under that span's deck,
   the channel there above the wall's top and the span's soffit clearing the wall's top but not the gatehouse's, that
   gate moved along the way only until its footprint leaves the deck's plan, the footprint still meeting the
   under-deck strip beside the deck, the stretch bent through it, part of its bend —".

### VF7w-HND-02 — minor — CATALOGUE (two family bends whose line no form words) — owner V09

**Claim.** §7.1's rows give each bend its key and V09's line takes "its form by what was drawn or moved" (V09 l. 2104)
or "by what was edited" (V09 l. 2102). Two hand bends of the lens reach a form whose trigger does not name them:
* `bend.wall.raisedCrossing`'s crossing form (V09 l. 2104) is "for a crossing moved along {way} to the nearest lawful
  one (under an arch that clears the wall, or beyond a road deck's foot through a gate there)". A crossing bent from a
  road deck's ramp to the deck's first lawful crossing (the bent-group sentence's (i), l. 3197–3202; T110-2 (4)
  l. 19413–19418), and an aqueduct crossing moved to a nearer merged crossing by its level (law 1 (2), law 3; adjudication-r7w's
  class member C1: "along the bend's reach a merged crossing may lie nearer"), are neither; one builder words them in this form, another in the keep-clear form.
* A raised or aqueduct stroke whose strip would hold a standing wall's band without crossing its line — drawn along a
  town wall's inside — is barred by law 1 (4) (l. 2721–2723: "its band lies in a raised way's strip only to cross its
  deck line") and bent off by law 2 (a) and law 3 under §7.1's catch-all key (l. 11346: "a raised way's … wall …
  strokes … (`bend.raised.wall`)"); `bend.raised.wall`'s forms (V09 l. 2102) are a road deck coming down before a wall,
  a re-shape stopped short and a measure bent, and `bend.wall.aqueductArch`'s (V09 l. 2103) an over and a merged
  crossing — none words a stroke kept off a wall it never crosses.
The outcome is the laws' in every build; only the shown words differ (VF7-HND-03's and VF7v-HND-05's class): minor.

**Required change.**
1. V09 §4.9's `bend.wall.raisedCrossing` (V09 l. 2104), its line cell: "for a crossing moved along {way} to the nearest
   lawful one (under an arch that clears the wall, or beyond a road deck's foot through a gate there)" → "for a crossing
   moved along {way} to the nearest lawful one (§2.7's laws, law 1 (2)–(4), law 3; its worked example the bent-group
   sentence (i))".
2. V09 §4.9's `bend.raised.wall` (V09 l. 2102), its line cell: after "for its Arch spacing, Deck height or width bent to
   the nearest lawful value, "{way}'s {measure} is {v}, the nearest that {wall} allows."" add " — and, for a raised or
   aqueduct stroke bent off a wall whose band its strip would hold without crossing its line, "{way} keeps clear of
   {wall}, {m} m off your line.""; its source cell: after "(§2.7's laws, law 2 (a), law 3; its worked example the
   crossing table's C13)" add "; a raised or aqueduct stroke bent off a wall it would run along (§2.7's laws, law 1 (4),
   law 2 (a), law 3)".

### VF7w-HND-03 — minor — READERS ("held or not" without J147's axis; VF7v-HND-03's class) — owner V09

**Claim.** VF7v-HND-03's fix wrote V09 §4.20.2 (4) "an aqueduct drawn across a standing wall, placement-locked or not,
crosses it" (V09 l. 3019); the catalogue row that names the same bend still reads, in its source cell, "file f item
363: an aqueduct drawn across a standing wall, held or not (§7.1's *Raised ways, aqueducts and retaining walls*; §2.7's
laws, law 1 (2), (5), (6), (10), law 2 (a) …)" (`bend.wall.aqueductArch`, V09 l. 2103), whose line's second form is "The
wall is built up round the aqueduct". Read with J147's *held* (l. 2653–2656) it merges into a shape-locked wall, which
law 1 (10) bars (l. 2741–2743); the cell cites (10), and no hand op makes a shape lock before round 8 designs it, so
nothing built or tested changes: minor, the sixth site of VF7v-HND-03's class (R7-01 (2)'s sweep missed it).

**Required change.** V09 §4.9's `bend.wall.aqueductArch` (V09 l. 2103), its source cell: "an aqueduct drawn across a
standing wall, held or not" → "an aqueduct drawn across a standing wall, placement-locked or not, a shape-locked one
never merged into".

### VF7w-HND-04 — minor — TESTS (two bars name "clear of the strip" for a gate an aqueduct's over crossing may hold in its strip) — owner scope (§13.2), END at V09

**Claim.** Under law 1 (5) a gate's footprint in an aqueduct's over crossing is admitted wherever no span over it fails
to clear its top — beside the deck in the strip's margin among those places (VF7w-HND-01, place 1). Two hand bars gloss
the lawful places as two:
* T110-2 (4) (l. 19430–19431): "the placed gate moved along the trace to the nearest place §2.7's laws admit it (§2.7's
  laws, law 1 (5): clear of the strip, or under an aqueduct's arch that clears it)";
* T-V9-52 (V09 l. 4428): "a road drawn across that wall there — on a variant whose aqueduct crosses merged there, or
  whose arch over the road clears the wall but not the gate's top — crosses it clear of the strip, with
  `bend.raised.underSpan` in its wall form" — on the second variant the nearest crossing at which the laws admit the
  gate may leave its footprint in the margin, as §7.1's row (l. 11345) and row (b) (l. 2914) give it.
T110-2's lead (S0, l. 19256–19263) makes each bar assert the laws' outcome where its words differ, so no correct build
fails: minor, the words conformed.

**Required change.**
1. §13.2's T110-2 (4) (l. 19430–19431): "(§2.7's laws, law 1 (5): clear of the strip, or under an aqueduct's arch that
   clears it)" → "(§2.7's laws, law 1 (5): clear of the strip, or, in an aqueduct's over crossing, where no span over it
   fails to clear it)".
2. END at V09, T-V9-52 (V09 l. 4428): "— crosses it clear of the strip, with `bend.raised.underSpan` in its wall form,"
   → "— crosses it at the nearest point at which §2.7's laws admit its gate (law 1 (5), law 2 (a), law 3; clear of the
   strip on the merged variant), with `bend.raised.underSpan` in its wall form,".

## 3. Held for round 8 (outside the family, not graded)

* Base §7.3 (b) 3 (l. 11695): "it cuts every other way the new channel ⊕ bank setback meets" still names no exception
  for a raised way whose deck passes over a moved river's new channel, where a carve keeps it by the way-and-channel
  table's row (e) (§4.11, l. 8951) — raised way × water; persisting as `adjudication-r7w.md`'s held note 3.

## 4. Verdict for this lens

All five round-7v findings of this lens are fixed in the live text — row (b)'s gate and W2 (VF7v-HND-01, by its merge),
law 4's undo refusal at §7.4 and §7.1 with its bar (VF7v-HND-02), "placement-locked" at the five hand sites
(VF7v-HND-03), F-WALL's hand clause (VF7v-HND-04) and the hand castle's cause, outcome and line (VF7v-HND-05) — and the
round-7 fixes still stand. Attacking laws 1–4 through every hand op of the lens — T3's strokes, vertices, re-anchors,
gates, grips, castle and `convert`s, T4's raised strokes, re-shapes, ramp ends and measures, carves, moved rivers,
deletes, the warp, undo and redo, by canvas and clerk — finds no case without a lawful outcome, nothing against J144,
J147 – J149, item 110 (b), (f) or item 114, every law-1 invariant under §5.3's row and T110-4, and canvas and clerk one
event and one catalogue row. **One major remains:** §7.1's `bend.wall.raisedCrossing` row, the home of a hand stretch's
bend, still moves the gate a stretch makes for a ground way "clear of" an aqueduct's strip and names a road deck's
lawful crossing "under a span" and an aqueduct's over crossing without the `cleared` ring — narrower than the laws,
which the examples and the sibling rows now follow, so that a build of the row passes a nearer lawful place (item 101
R2) on a hand gesture no bar holds (VF7w-HND-01). Three minors change no outcome: two bends with no line form
(VF7w-HND-02), a "held or not" source cell (VF7w-HND-03) and two bars' glosses of the gate's lawful places
(VF7w-HND-04). Nothing is reported that J150 hands to round 8.
