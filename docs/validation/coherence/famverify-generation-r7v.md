# Family verify after the fix pass — generation and regeneration (coherence/famverify-generation-r7v)

> Seat `coherence/famverify-generation-r7v`, 2026-10-02. One of the six family-focused checks run on the design that
> `assemble-r7v` assembled (J144: the raised-way × wall family alone, until these six seats find no major). This lens is
> the generation pipeline in the order it runs — S3's gate routes and boundary, S4's routes and viaducts, S5a's trace
> and pull, S5b's spawned primaries, S6's elevated roads and aqueducts, S7's strips, towers and gates, S10's band — and
> then a regeneration under a raised way it keeps, with its routes re-solved. Grading is J141's standard as the owner
> applies it in J146 and J151, and as `adjudication-r7v.md` applies it to design text a builder builds (a pipeline
> step, a catalogue line or a bar whose literal outcome breaks a law-1 invariant is major; a worked example's slip, a
> citation or a case a fixture may not hold is minor). Nothing J150 hands to round 8 is reported (the two-axis lock and
> its readers outside the family — §7.2's *Declared means held*, §7.3 item 4's fates, §7.4's lock column, §5.3's
> declared row, the support step's "declared ways are held" among them — and a lock's behaviour under undo, redo, a
> re-grade or value edit within a standing meeting, or a repair). No design text was changed; no git state was changed.

**Read.** The brief, whole. `adjudication-r7.md`: Part L whole (terms, laws 1–4, the check, the seven corrections, the
restated veto list), R7-03, Part H's head and the pipeline ENDs (E-P9's history: PRB7B-12's "each widened as its *Line
and band* says", then its J149 and pass-6 rewrites), Part P passes 6–8 where they touch this lens. `adjudication-r7v.md`
whole (its 50 decisions, P1–P7, M8, M11 / END-L2, D4, D6, S1, S8, the builders' choices and the held list).
`famverify-generation-r7.md` whole. The live design, `docs/ARCHITECTURE.md`: §2.7's support step (1)–(7) with (0) the
laws and the worked examples (l. 2534–3382); §4.1's S5 and S7 rows (l. 5710, 5712); §4.2 S3 (4)–(13) (l. 6153–6372);
§4.3 *Lattice and costs*, *Routes*, *Raised ways* with *The slot* and *Where it may not go* (l. 6385–6507); §4.4
S5a–S5d (l. 6549–6721); §4.6's holes (l. 7204–7222); §4.7 S10 (0) (l. 7520–7532); §4.8's lead, *Wall strips*, *Gates*,
*Towers*, the harbour mouth (l. 8344–8404); §4.11's carve way rule (l. 8941–8950); §4.13's raised-way column (l.
9704–9718); §5.2's F-ROUTE, F-WALL, F-CASTLE and F-REDERIVE rows (l. 9850–9869); §5.3's way-and-trace, water, law-1,
gate and distance rows (l. 9936–9951); §5.4's `warnings`, `reshaped` and `changes` (l. 9982–10047); §7.2 and §7.3's
operator rows (l. 11460–11600, read for the family's readers only); §13.2's T106-3, T110-2 (1)–(8) and T110-4 (l.
19172–19604). V06 §3.7.6 (5) and its tests' rows (V06 l. 1601–1625, 4184, 4220, 4246).

## Part 1 — the round-7 findings of this lens, re-checked against the live text

| id | r7 grade · ruling | verdict | evidence (live `docs/ARCHITECTURE.md` unless a volume is named) |
|---|---|---|---|
| VF7-GEN-01 (VF7-TBL-02 merged) | major · FIX (P1; ENDs M8, V6-7) | **partly fixed — the major persists** (below) | §4.4 S5a *Trace* (2) (l. 6601) now names "where an aqueduct's channel runs above the wall's top (its crossing there over), its standing supports and the strip of each span whose soffit does not clear the wall's top". V06's five restatements read "over where its channel runs above the wall's top and every span over the band clears it, merged where its channel runs within the wall's height" (V06 l. 1610, 2856; T-V6-11, -47, -73 at l. 4184, 4220, 4246). *beneath*'s list (l. 3080–3082) widens the supports and the low spans' strips so that "the band's half at most touches the ring or that strip, *the edge*". S5a's list — which *beneath* names as its own ("the list §4.4 S5a *Trace* (2) gives", l. 3077) and which V06 §3.7.6 (5) takes "each widened as it says" (V06 l. 1605–1608) — widens neither. So the line is kept off a low span's strip, but its band still reaches under one (law 1 (2)), the very case M8 widened *beneath* for. |
| VF7-GEN-02 | major · FIX (P2) | **fixed** | S3 (8) (l. 6243): "(every raised way standing before the stage — a creation prefix's declared ones and, at a regeneration, each one it keeps where it stands (§2.7's laws, law 2 *Newer*) —, the raised stretches of (5)'s routes at S3, …". S3 (10) (l. 6297): "a creation prefix's declared one and, at a regeneration, one it keeps where it stands". (S3 (10)'s "at generation, besides" is VF7v-GEN-07, a minor.) |
| VF7-GEN-03 | major · FIX (P3) | **fixed** | S3 (9)'s **Test** (l. 6279): "and along a barrier reach or a stretch F-WALL's raised-way rung re-pulled round a raised way (§5.2; §2.7's laws, law 2 (c)), each of which departs by at most `wall.barrierReachM`". §5.3's distance row (l. 9951) cites S3 (9). |
| VF7-GEN-04 | minor · FIX (P4; END D6) | **fixed** | S5b (l. 6650): "a crossing on a raised deck no gate, and one on a ramp, stair or foot, pinned beyond the foot, one of them where that pin is lawful — S5a *Trace* (2); §2.7's laws, law 1 (4), law 2 *Not yet built*; its worked example the way-and-channel table's row (d); a carried way standing before the stage one of them …". §5.3's gate row (l. 9950): "where the boundary crosses its ground course or ends". |
| VF7-GEN-05 | minor · FIX, VALID CHOICE PICKED (P5) | **fixed** (the pick applied) | S3 (7) (l. 6226): "or with its gate's footprint in a strip where law 1 (5) bars it, or the band or wall strips there over the ends (law 1 (1), (4), (5))". |
| VF7-GEN-06 | minor · VALID CHOICE LISTED | **closed by a ruling** | `adjudication-r7v.md` l. 68 and its builders' choices (l. 710–713): the stage-1 carried way's gate `main` (not counted in N) or `water`; no design text written, by the ruling. |
| VF7-GEN-07 | minor · FIX (D4; END S8) | **fixed** | §5.2's F-WALL detection (l. 9852): "a fixed place the trace lays with no clear point in reach (a harbour-mouth chain S7 lays being not laid, `W_RAISED_MEETING`: …)". T106-3 (l. 19173–19174): "save one §2.7's laws leave out for a raised way, reported (`W_RAISED_MEETING`; law 2 (c))". |
| VF7-GEN-08 | minor · FIX (P6) | **fixed** | §4.1's S7 row (l. 5712): "met by §2.7's laws (law 1 (1)–(9); its worked example the crossing table's *beneath*; §4.8's lead)". §4.8 *Gates* (l. 8390): "meet by §2.7's laws (law 1 (1); its worked example the crossing table)". |
| VF7-GEN-09 | minor · FIX (S1) | **fixed** | T110-2 (6) (l. 19523–19531) runs a skeleton's placement-locked raised road regenerated (keep) and given New random over three runs: the gate beside the N main gates, decked and counted; the deck-only crossing kept; and the re-route by law 2 (b). (Its third run's seed condition is part of VF7v-GEN-04, a minor.) |

Eight of the nine are fixed or closed by their rulings. VF7-GEN-01 persists as a major in a narrower case. It keeps
its id.

## Part 2 — the laws attacked through this lens

I applied laws 1–4 to every op, path and state of the lens:
* S3 (4)–(13): picks, gate routes and their re-solve, `T`, the boundary, the carried way's gate, the castle filter, the
  pull with its anchors and water gates, the moat and canals, the harbour route;
* S4: its routes and the viaducts it lays;
* S5a: the boundary, pull, pins and outer moats;
* S5b: `c` and its spawned primaries;
* S5c and S5d;
* S6's end: elevated roads and aqueducts;
* S7: towers, gatehouses, strips, intervallum, castle paths and the chain;
* S10 (0)'s band;
* §5.2's rungs, §5.3's rows and §5.4's counts;
* a generation from a creation prefix;
* Regenerate (keep), New random and a re-derivation from a stage, under a kept raised way and under a kept wall, with
  the routes re-solved (W3; *Order* as END-L2 left it).

The laws give one lawful outcome, or a valid choice, almost everywhere on these paths. Part 3 lists those cases. Nine
findings follow: VF7-GEN-01 (persisting) and eight new, VF7v-GEN-01 – -08. Two are major and seven minor; none is a
blocker.

### VF7-GEN-01 (persists) · major · TWO READINGS (law 1 (2)) · owner pipeline

**S5a's list keeps the pulled LINE off an over crossing's standing supports and low spans. Law 1 (2) keeps the BAND off
them. *beneath*'s list, which names itself as S5a's list, widens both. S5a's does not.**

*What the laws say.* Law 1 (2) (l. 2705–2715) gives the **over** form "where its channel there lies above the wall's
top — no standing support in the band there and every span above the band clearing the wall's top". A crossing that
fits neither form is unlawful. The band is the wall's section, wider than its line (*the band*, l. 2599–2606). Law 2 (a)
(l. 2810–2813) has a pull "search only shapes law 1 admits".

*What the two lists say.*
* **§4.4 S5a *Trace* (2)** (l. 6601) gives "the impassables §2.7's laws give a trace (law 1 (2)–(4), law 1 (9) and (10))
  impassable to it". These are impassable to "a cost-surface path", the line. The list widens one item: "a standing
  raised way's ramps, stairs and feet widened by the wall strips' width there". For the over form it has "its standing
  supports and the strip of each span whose soffit does not clear the wall's top", with no widening.
* ***beneath*** (l. 3077–3085) calls its list "the list §4.4 S5a *Trace* (2) gives". There the same items are "each
  widened so that the band's half at most touches the ring or that strip, *the edge*".
* **V06 §3.7.6 (5)** (V06 l. 1605–1608): the epoch cost field takes "the list §4.4 S5a *Trace* (2) gives the pull, each
  widened as it says". It inherits S5a's reading.

*History.* `adjudication-r7.md`'s PRB7B-12 (l. 2942) and E-P9 (l. 2144) gave S5a "the widened impassables in place of
the unwidened list ... each widened as its *Line and band* says". The J149 rewrite of E-P9 dropped the widening,
because supports were then "no obstacle". Pass 6 (PRB7F-GEN-03) restored supports as impassable without restoring it.
P1 of `adjudication-r7v.md` added the low spans to S5a, also unwidened. Its note says "a span the line does not cross
puts no band beneath it" (l. 222–228). Yet its M8 widened the same span strip in *beneath* because "a band crossing
through a `cleared` ring between a clearing span and a low one would otherwise reach under the low one" (l. 172–178).

*Two readings.*
* **Builder 1** builds S5a's list as written. The line passes 1 m from a standing support's ring, or under a clearing
  span 1 m from the next span, which is low. The band, half its width each side, then lies over the ring or under the
  low span. Law 1 (2) is false at the stage end, and §5.3's law-1 row (l. 9940) raises `E_INVARIANT`. This happens on
  every pulled trace across a standing aqueduct:
  * New random and Regenerate under a kept aqueduct;
  * a generation from a creation prefix holding one;
  * every epoch circuit and contraction (V06's cost field);
  * a hand `contractWall`.
  T110-2 (6) asserts "no standing support in the band and every span over it clearing the ring's top" (l. 19506), so
  the bar rejects the build S5a's words lead to.
* **Builder 2** builds *beneath*'s list, or law 2 (a) as one resolver, and keeps the band off.

Two texts naming one list give two outcomes, and one breaks law 1. This is major, as the fix pass graded this list's
first omission (VF7-TBL-02's regrade).

**Required change** (pipeline, §4.4 S5a *Trace* (2), l. 6601):

> "where an aqueduct's channel runs above the wall's top (its crossing there over), its standing supports and the strip
> of each span whose soffit does not clear the wall's top (law 1 (2): a crossing that fits neither form unlawful),"

→

> "where an aqueduct's channel runs above the wall's top (its crossing there over), its standing supports and the strip
> of each span whose soffit does not clear the wall's top, each widened so that the band's half at most touches the
> ring or that strip (*the edge*; law 1 (2): a crossing that fits neither form unlawful),".

V06 §3.7.6 (5) ("each widened as it says") and *beneath* then read one list and need no words.

### VF7v-GEN-01 · major · TWO READINGS (law 1 (4), (10)) · owner pipeline

**The same list keeps only the line off two more things whose band and wall strips the laws bar: a raised way's strip,
which law 1 (4) lets the band enter only to cross, and a shape-locked raised way's `vault`-use spans, which law 1 (10)
keeps every line, band and wall strip off.**

*What the laws say:*
* Law 1 (4) (l. 2721–2723): "its band lies in a raised way's strip only to cross its deck line — entering on one long
  side, leaving by the other, meeting the deck line once there".
* Law 1 (10) (l. 2739–2743): no op makes "a wall-like line, band or strip newly across the strip of a `vault`-use span
  of" a shape-held raised way. The lock sentence (l. 2942–2944) and *beneath* (l. 3119–3121) say the same: "no
  wall-like line, band or strip".
* A held building's strip, the case beside it in law 1 (9), is defined already "widened all round by the meeting wall's
  strips' width" (l. 2642–2643). No such widened term exists for a shape-locked span.

*What S5a's list says* (l. 6601): "its strip but to cross its deck line once" and "a shape-locked raised way's
`vault`-use spans' strips". Both are impassable to the line alone; only the ramps are widened.

*beneath*'s list has the same two items unwidened. It covers them by its *Line and band* sentence (l. 3067–3073), "every
keep-clear this table states for a trace's line holds for its band and wall strips", and the bent group widens its strip
by "the band's half". S5a has no such sentence.

*Two readings.*
* **Builder 1** builds S5a's list. A pulled line that runs beside a raised way's strip within half the band's width,
  before or after its one crossing, lays its band in the strip without crossing there: law 1 (4) is false.
* A line crossing under the span next to a shape-locked `vault`-use span keeps its line off that span's strip. Its band
  and wall strips still lie across it (the wall strips run along the deck for the band's half plus the wider setback at
  a crossing): law 1 (10) is false.

§5.3's law-1 row raises `E_INVARIANT` at the stage end on a regeneration, a New random, a generation from a creation
prefix and (through V06's cost field) an epoch circuit. T110-4 (c) runs exactly these paths with a shape-locked raised
way, from the milestone that carries the shape lock. Builder 2 builds the laws. The outcome breaks law 1, so this is
major.

S5a (1)'s anchor rule, "never in a standing raised way's strip" (l. 6585), is closed by the same widening, since an
anchor ends the pulled line.

**Required change** (pipeline, §4.4 S5a *Trace* (2), l. 6601), two phrases in the list VF7-GEN-01 edits:
1. "its strip but to cross its deck line once," → "its strip, widened each side by the band's half there, but to cross
   its deck line once (law 1 (4)),".
2. "every held building's strip and a shape-locked raised way's `vault`-use spans' strips)" → "every held building's
   strip and a shape-locked raised way's `vault`-use spans' strips, each widened all round by the wall strips' width
   there (law 1 (10): no line, band or wall strip across one))".

V06 §3.7.6 (5) reads them by "each widened as it says". *beneath* needs no words, since its *Line and band* already holds.

### VF7v-GEN-02 · minor · EXAMPLE (law 1 (10)) · owner model

**The bent-group sentence's lawful crossing keeps only the line off a shape-locked raised way's `vault`-use span. Law 1
(10) keeps the band and wall strips off it too.**

The bent-group sentence (l. 3183–3189) says a lawful crossing has "its band and wall strips never on the ends (law 1
(4)), and its line never in a held building's widened strip nor newly across a shape-locked raised way's `vault`-use
span's strip (law 1 (9), (10))". The held building's strip is widened by definition. The shape-locked span's strip is
not, so a crossing under the next span lays its band and wall strips across it, against law 1 (10) (l. 2741–2742).

The bent group is an example (VS3's palisade, hand stretches, a re-traced run, W14). The laws govern, and §5.3's row
with T110-4 (c)'s shape-locked runs catches a wrong build, so this is minor: correct the example.

**Required change** (model, §2.7's bent-group sentence, l. 3188–3189): "and its line never in a held building's widened
strip nor newly across a shape-locked raised way's `vault`-use span's strip (law 1 (9), (10))" → "its line never in a
held building's widened strip, and neither its line nor its band nor its wall strips newly across a shape-locked raised
way's `vault`-use span's strip (law 1 (9), (10))".

### VF7v-GEN-03 · minor · VALID CHOICE (law 2 (a), (c)) · owner pipeline

**S5a moves a pin, at stage k ≥ 2 and through S3 (9) at stage 1, only in two cases: its crossing falls ON a ramp, stair
or foot, or its gate's footprint meets an under-deck strip. The fix pass picked a wider trigger for S3 (7)'s gates,
which also covers a crossing NEAR the foot and a pin whose band or wall strips lie over another raised way's ends.**

S5a *Trace* (2) (l. 6602) says only: "one whose crossing falls on a ramp, stair or foot pins its gate on its ground
course at the first point beyond the foot" and "a pin whose gate's footprint ... meets a raised way's under-deck strip
where §2.7's laws bar a gate ... moves along its arterial until that footprint is clear". S3 (7)'s picked trigger (l.
6226; VF7-GEN-05) also has "nearer its foot than the first point beyond the foot" and "the band or wall strips there
over the ends".

Take an arterial crossing the stage's boundary a metre past a viaduct's foot, inside the wall strips' width, or a pin
whose wall strips cover another raised way's ramp. That pin is not moved. No lawful line passes through it (law 1 (4)),
so F-WALL's raised-way rung re-pulls with the pins fixed and leaves the stage unwalled. Law 2 (a) would instead move the
pin along its arterial ("a gate the op's own wall lays on a standing way, along that way", law 3).

Both outcomes keep law 1 — an unwalled stage is law 2 (c)'s — and pass §5.3's rows. T110-2 (3)'s ramp variant puts the
crossing ON the ramp (l. 19342–19345), so no named test runs the near miss. This is a valid choice, and aligning it with
S3 (7)'s pick costs a few words.

**Required change** (pipeline, §4.4 S5a *Trace* (2), l. 6602):
* "one whose crossing falls on a ramp, stair or foot pins its gate" → "one whose crossing falls on a ramp, stair or foot,
  or nearer its foot than the first point beyond the foot, pins its gate";
* "meets a raised way's under-deck strip where §2.7's laws bar a gate (law 1 (5): any but under an aqueduct's arch that
  clears it) moves along its arterial until that footprint is clear" → "meets a raised way's under-deck strip where
  §2.7's laws bar a gate (law 1 (5): any but under an aqueduct's arch that clears it), or whose band or wall strips
  there would lie over a raised way's ends (law 1 (4)), moves along its arterial until both are clear".

Alternatively, list the two outcomes in fix-list.md's builders' choices.

### VF7v-GEN-04 · minor · VALID CHOICE / TESTS (law 2 *Carried way*, (a), (b)) · owner pipeline; END scope

**At stage 1, two texts give a carried way's barred gate two outcomes, and the bar's fixture may not hold its case.**
* **S3 (7)** (l. 6226): "where §2.7's laws give it no lawful gate, the way is re-routed through one of the stage's gates
  (§2.7's laws, law 2 *Carried way*, (a), (b))".
* **S5a's pin rule**, which S3 (9) runs for stage 1 ("stage 1: S3's gates", l. 6602), first moves "a carried way's pin"
  whose gate footprint meets a strip along its way within the pull's search band. Only then is it "re-routed as §2.7's
  laws, law 2 *Carried way*, says".

So builder A re-routes at S3 (7) as soon as the crossing point is barred. Builder B keeps the gate and lets (9) move it
along the way (law 2 (a) before (b), as *Carried way* has it: "law 2 (a) leaves the way no lawful gate in it",
l. 2790). Both keep law 1 and pass §5.3's gate row; they differ in whether the user's road keeps its own gate.

T110-2 (6)'s third run (l. 19528–19531) asserts the re-route on a seed "searched so that §2.7's laws admit no gate for
that way where the boundary crosses its ground course". Read at the crossing point, that seed can still leave builder
B's moved gate lawful, and then the bar rejects the build the laws give. The fix pass meant to exclude this
(`adjudication-r7v.md` S1's note, l. 359–361), but the words still read at the point. This is a case a fixture may not
hold, which `adjudication-r7v.md` grades minor.

**Required change.**
* (pipeline, §4.2 S3 (7), l. 6226) "where §2.7's laws give it no lawful gate, the way is re-routed through one of the
  stage's gates" → "its pin moved along the way within (9)'s search band where its gate's footprint meets a strip (§4.4
  S5a *Trace* (2)), and where §2.7's laws give it no lawful gate so, the way is re-routed through one of the stage's
  gates".
* END (scope, T110-2 (6), l. 19528–19529): "whose seed is searched so that §2.7's laws admit no gate for that way where
  the boundary crosses its ground course" → "whose seed is searched so that §2.7's laws admit no gate for that way where
  the boundary crosses its ground course nor at any point of that way within the pull's search band".

### VF7v-GEN-05 · minor · VALID CHOICE (law 2 (a), (c)) · owner pipeline

**A gate route through a pick has no lawful re-solve where every route through that pick first reaches `T = t_1` in a
standing road deck's strip or on its ramp. S3 (7) sends it to F-ROUTE's ladder, whose rungs do not fit the case.**

S3 (7) (l. 6226) re-solves a barred gate route "whole as (5) solves it" — through its pick — "a search over the routes
whose first point at `T = t_1` §2.7's laws admit". It says "a route the re-solve cannot serve takes F-ROUTE's ladder".
F-ROUTE's rungs (l. 9850) are another site, an extra bridge, the slope, then "keeps its gate at the re-solved route's
first point at `T = t_1`, its outward arterial unserved". They treat a route that cannot reach its destination, not a
pick with no lawful crossing.

The case needs a creation prefix's or a regeneration-kept road deck across the stage-1 edge, and a pick under its strip
where `T` passes `t_1` inside that strip. That is plausible on a valley site, where picks favour valley exits (S3 (4)).
S3 (4)'s own rule for a pick that "gives no gate" — "re-drawn from its next candidate (≤ 3 attempts), then dropped and
reported" (l. 6227–6228) — names only closed arcs and coincident gates.

The lawful outcomes are two:
* F-ROUTE's last rung, its search still over lawful first points: a gate beside the strip, the route ending at the
  nearest reachable junction, unserved and reported;
* the pick re-drawn as a closed arc's is (law 2 (a): "a siting's candidates"), then dropped and reported (law 2 (c)).

Keeping the barred gate would break law 1 (5), but that reading drops the search's own constraint, so it is no reading
of the text. Both lawful outcomes pass §5.3's rows; F-ROUTE's bar counts "reported". This is a valid choice.

**Required change** (pipeline, §4.2 S3 (7), l. 6226): "and a route the re-solve cannot serve takes F-ROUTE's ladder
(§5.2), reported" → "and a route the re-solve cannot serve takes F-ROUTE's ladder (§5.2), reported — save one whose pick
no route crosses `T = t_1` from where §2.7's laws admit a gate, whose pick is re-drawn as a pick on a closed arc is (≤ 3
attempts, then dropped and reported; §2.7's laws, law 2 (a), (c))". Alternatively, list the two outcomes in fix-list.md's
builders' choices.

### VF7v-GEN-06 · minor · READERS (law 2 *Carried way*) · owner pipeline

**S5a's outer moat decks only arterials. At stage k ≥ 2 a carried way's lawful pin is one of the stage's gates (S5a
*Trace* (2), l. 6602; S5b's `c`, l. 6650), and the carve's way rule may cut that way at its own gate.**

S5a *Outer moats* (l. 6632–6642): "Its way rule meets only arterials here — each just outside one of the stage's gates
… — so every way is kept with a deck and nothing is cut: the L1 batch places each deck's two pinned bank vertices on its
arterial". §4.11's way rule (l. 8941–8948) keeps with a deck only `through` and `primary` ways and a sole connection,
and cuts every other class. A carried way of a declared raised road of a lower class is cut outside its gate. At stage
1, S3 (10) decks it explicitly: "at a carried way's gate (7) ... where ... the carried way ... crosses the channel" (l.
6297).

Two builds result, decked or cut. Both keep law 1, and §5.3's gate row still counts the gate. This is a minor reader
omission.

**Required change** (pipeline, §4.4 S5a *Outer moats*, l. 6633–6636): "Its way rule meets only arterials here — each just
outside one of the stage's gates, the stage's secondaries not yet grown — so every way is kept with a deck and nothing is
cut: the L1 batch places each deck's two pinned bank vertices on its arterial" → "Its way rule meets only arterials and a
carried way standing before the stage here — each just outside one of the stage's gates, the stage's secondaries not yet
grown — so every way is kept with a deck and nothing is cut, a carried way decked at its gate as at stage 1 (§4.2 S3
(10); §2.7's laws, law 2 *Carried way*): the L1 batch places each deck's two pinned bank vertices on its arterial or
carried way".

### VF7v-GEN-07 · minor · READERS (law 2 *Not yet built*) · owner pipeline

**S3 (10) reads the raised stretches of (5)'s routes only "at generation". S3 (7) has S3 (10)'s channels read them on
every run that re-solves those routes, a regeneration among them.**

* S3 (10) (l. 6297): "a creation prefix's declared one and, at a regeneration, one it keeps where it stands (…); at
  generation, besides, the raised stretches of (5)'s routes, their stations and spans read as §4.2 S3 (7) reads them".
* S3 (7) (l. 6226): "their stations and spans read, from S3 (10) on (S3 (10)'s channels, S3 (11)'s harbour route, S4's
  own routes), as the support step will place them at S4's commit".
* W3·C2 (l. 3342): a regeneration re-solves those routes. In the laws' words "at generation" and "a regeneration" are
  two paths (law 2 (c), l. 2827).

A builder may carve a regeneration's city moat through a (5) route's future ramp or support instead of stopping it at
the under-deck strip (row (e)). The count of `W_RAISED_CROSSING` differs, and no law-1 invariant is crossed (law 1 (8)'s
reading follows either way). This is minor.

**Required change** (pipeline, §4.2 S3 (10), l. 6297): "at generation, besides, the raised stretches of (5)'s routes" →
"at generation and at a regeneration, besides, the raised stretches of (5)'s routes".

### VF7v-GEN-08 · minor · READERS (warnings; law 2 (c)) · owner determinism

**§5.4's `W_RAISED_MEETING` list and §5.2's F-CASTLE row omit the castle outcome that law 2 (c) and the fixed-place
sentence give at generation.**
* Law 2 (c) (l. 2827–2829) gives "a castle's claim passed for the siting's next candidate, then F-CASTLE's ladder".
* The fixed-place sentence (l. 3249–3251) adds "F-CASTLE's ladder from its re-site rung (§5.2: re-sited, reported, else
  kept without a bailey, reported)".
* §5.2's F-CASTLE row (l. 9853) detects only "compactness below §4.8's floor; the claim overlaps water or the plaza".
* §5.4 (l. 9982) gives `W_RAISED_MEETING` as "each outcome of §2.7's laws, law 2 (c), at generation …" but lists four
  outcomes without the castle's.

One builder enters F-CASTLE and counts `W_RAISED_MEETING` for a castle a raised way bars at every candidate. Another
does neither, or only F-CASTLE's report. No bar counts it, and both are lawful. This is a list omitting an outcome its
rule names: minor.

**Required change** (determinism):
* §5.4 (l. 9982): "; a harbour-mouth chain not laid, §4.8)" → "; a harbour-mouth chain not laid, §4.8; a castle §4.2 S3
  (8)'s filter rejects at every candidate, re-sited or kept without a bailey by F-CASTLE's ladder)".
* §5.2's F-CASTLE detection (l. 9853): "the claim overlaps water or the plaza" → "the claim overlaps water or the plaza;
  no candidate §4.2 S3 (8)'s filter admits for a raised way (§2.7's laws, law 2 (c); its worked example the fixed-place
  sentence), entering at the re-site rung".

## Part 3 — cases of this lens the laws decide (no finding)

* **S3 (5)–(7).** The gate routes are re-solved where law 1 bars the gate (VF7-GEN-05's pick). Their raised stretches,
  dated S3 (7), stand after the trace (S3 (6)), so the trace keeps off their deck lines (law 1 (3)). Their feet and
  strips keep "beyond the foot" off the boundary. A carried way standing before the stage takes a gate beside `N₁`, else
  it is re-routed (VF7v-GEN-04 aside). The (5) stretches' supports are placed at S4 from what stands at S3 (10) (*Not yet
  built*).
* **S3 (8).** The castle is sited off every standing road deck's zone and an aqueduct's strip but under clearing arches
  (VF7-GEN-02 fixed). Its curtain is a wall line law 1 governs: dated by its claim, it passes beneath a prefix's deck,
  and no (5) route crosses the claim.
* **S3 (9).** The pull keeps the impassables of law 1 (2)–(4), (9) and (10) (VF7-GEN-01 and VF7v-GEN-01 aside). Anchors
  and water gates lie off the zone, a pulled trace's place set by its own cost (M4). With none in reach, F-WALL's
  raised-way rung runs, its widened stretch excepted from the 40 m Test (VF7-GEN-03 fixed).
* **S4.** Its own viaducts are dated after the stage-1 trace and come down before it through a gate beyond the foot (law
  1 (3); *beyond the foot* carries the wall strips). A support slides off the band, never off a setback.
* **S5a, k ≥ 2.** The trace passes beneath S4's and earlier S5b's decks, dated before its boundary pick. It keeps off its
  own S5b decks' lines. A deck crossing stays under the deck. A pin on a ramp sits beyond the foot, and a pin in a strip
  moves within the band, else the rung runs (VF7v-GEN-03 aside). S5d's top-up keeps every crossing between its pins.
* **S5b.** `c` counts ground part 0 only, a lawful ramp pin and a carried way's lawful pin (VF7-GEN-04 fixed). Spawned
  viaducts come down before the picked boundary, each primary a main gate.
* **S6's end.** An aqueduct crosses each standing wall at its level, over (every span over the band clearing the top) or
  merged. It plans round gates and fixed places (Tier 1) and is never merged into a shape-locked wall. A course that
  cannot is dropped and reported. An elevated road with fixed ends is not built across a trace.
* **S7.** Towers by spacing or turn take law 3's nearest lawful point (pass 8's pick). Gatehouses are built as their pins
  read them. Plazas, quays, the intervallum and castle paths cross by row (a). A chain with no lawful heads is not laid,
  reported (VF7-GEN-07 fixed).
* **S10 (0).** The band is laid as anywhere, through a road deck's support and round a merged pier. The stopped moat's
  gap is typed as dry. Chambers come from the vaults step, from which law 1 (8)'s chamber clause holds (END-L1: a span
  too small holds none lawfully).
* **Regeneration.** A kept structure keeps its date. A re-derived line takes the regeneration event's place (END-L2:
  *Order* and *Newer* now agree), so a ring re-derived under a kept road deck passes beneath it (law 1 (3)). A kept wall
  makes a re-laid deck come down before it through a standing gate. A kept generated deck's route is solved again and
  crosses by row (a). T110-2 (6)'s byte identity now reads the model digest, with `laidAt` in the records digest. W3·C2
  – C13 are held by T110-2 (6) and (6)·S.
* **Gate counts, checks and warnings.** §4.8's "exactly N", S3 (11), §4.3 *Routes* and §5.3's gate row count the harbour
  gate and a carried way's gate alike; the kind of the stage-1 carried way's gate is VF7-GEN-06's listed choice.
  `W_RAISED_CROSSING` counts a trace laid after a raised way and a stopped channel, never an S6 aqueduct's creation.
  §5.3's law-1 row checks (1)–(11) at every stage end. T110-4 (c) runs generation from a prefix, Regenerate (keep) and
  New random, unlocked, placement-locked and shape-locked. Every law-1 invariant on this lens's paths has a bar.

## Held for round 8 (outside the family)

None new. `adjudication-r7v.md`'s held list stands: S3 (9)'s Test against F-WALL's non-raised rung; the (5) route's
re-crossing of `T = t_1`; S3 (5)'s raised stretch over a canal dropped at S4.

## Verdict for this lens

The fix pass closed eight of this lens's nine round-7 findings:
* S3 (8)'s and S3 (10)'s lists now name a creation prefix's raised ways;
* S3 (9)'s Test excepts F-WALL's raised-way rung;
* S5b's `c` and §5.3's gate row name the ramp pin and the carried way's "or ends";
* S3 (7)'s trigger is the picked one;
* the chain's law 2 (c) outcome reaches F-WALL's detection and T106-3;
* the two readers cite the laws;
* T110-2 (6) runs the carried way's gate at a regeneration.

The ninth, VF7-GEN-01, is only half closed. S5a's pull list — the one list that *beneath*, V06's epoch cost field and a
hand `contractWall` all take — now names a low span's strip. But it still keeps only the LINE off what law 1 bars the
BAND and wall strips from:
* an over crossing's supports and low spans (law 1 (2));
* a raised way's strip but to cross (law 1 (4));
* a shape-locked `vault`-use span (law 1 (10)).

Meanwhile *beneath*, naming that list as its own, widens the first two. A builder who builds S5a's words lays a band over
a support, under a low arch, along a strip or across a locked vault on every pulled trace at a standing aqueduct, and
§5.3's row then fails it: VF7-GEN-01 and VF7v-GEN-01, **two majors** at one site, closed by four widenings in one
sentence. The other seven findings are minors: a bent-group example, three valid choices, two readers and a warning list.
Each leaves law 1 whole and passes every bar. The laws themselves give one lawful outcome or a valid choice on every
generation and regeneration path I ran, and every law-1 invariant on those paths is checked by §5.3's row and T110-4.
This lens finds the family **not yet free of majors**.
