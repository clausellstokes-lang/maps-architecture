# Family check, round 7v — the laws and their examples (coherence/famverify-table-r7v)

> Seat `coherence/famverify-table-r7v`, 2026-10-02, after round 7's family fix pass (`adjudication-r7v.md`, the twelve
> `repair-r7v-*.md` files, `assemble-r7v.md`). Lens: §2.7's support step (6) — the laws as the design now states them
> (terms, laws 1–4 with law 1 (1)–(11), the tiers, the check), then the worked examples (the way-and-channel table, the
> crossing table, the lock, bent-group and fixed-place sentences, *Strips, zones and nearest points*, the four outcomes,
> the columns, *Paths and tests*), with the support step's own rules (1)–(7) and the span rule. Graded by J141 as the
> owner applies it to this family (J146, J151): MAJOR only for no lawful outcome, an outcome breaking an owner rule or a
> law-1 invariant, a law-1 invariant no bar checks, or a check or named test failing a correct build; where every
> outcome is lawful so, a minor VALID CHOICE; an example that differs from the laws a minor; a case missing from the
> examples no finding. Nothing here concerns what J150 hands to round 8 (a lock under undo, redo, a re-grade or value
> edit within a standing meeting, or a repair; the two-axis lock and its readers outside the family). Line numbers are
> `docs/ARCHITECTURE.md` unless a volume is named; "Part L l. n" is `adjudication-r7.md`.

**Read whole:** the brief; `adjudication-r7.md` Part L (l. 307–813: terms, laws 1–4, the check, corrections 1–7, the
restated veto list), R7-02's banner, owner-rule checks, record veto list and attack (l. 815–963, 1374–1452), Part A's
hand-offs; `adjudication-r7v.md` whole (50 decisions; Part H by unit, END-L1 and END-L2; the builders' choices; the held
notes); `famverify-table-r7.md`; `assemble-r7v.md`'s outcome; PROGRESS J144 and J147 – J151; item 110 (b), (f); the live
§2.7 support step (l. 2534–3407) whole; §5.3's gate and law-1 rows (l. 9936, 9940); §13.2's T110-1 – T110-4 (l.
19207–19600); §7.1's `bend.raised.underSpan` row (l. 11340); V04 §3.5.4 (d); V06 §2.10 and its T-V6-11 / -47 / -73;
V07 T-V7-48 and §3.5a (4).

**Method.** (1) Each round-7 finding of this lens re-checked against the live text. (2) Part L l. 332–652 word-diffed
against the live laws l. 2581–2891 after normalising whitespace: every difference is a dropped "(J146, PRB7…)" or bare
owner-id marker (Part H's head), "§2.7's support step (6)" read "(6)'s lead", "§2.7's span rule (1)" read "the span
rule's (1), below", law 1 (2)'s "as the program reads it" read "the program's reading, J122", law 2 (c)'s added "V06
§2.10; (7)", the bar named "§13.2's **T110-4**", the J150 hand-off parentheses left in Part L (round 8's, not reported),
and the fix pass's END-L1 (law 1 (8)'s chamber clause) and END-L2 (*Order*'s "a regeneration's" struck) — so the design
states the laws as Part L gives them with `adjudication-r7v.md`'s supersessions. (3) Laws 1–4 applied to every wall event
W1–W14 and the events no row lists (a burial, a warp, a `revert`, a `split` / `merge`, a castle grip, a water op's
re-trace, an absorb with no epoch), every column C1–C13, every path (G, R, E, V, H, a replay) and every lock (none,
placement, shape; wall side and raised-way side), asking for two readings, no outcome, owner-rule clashes, readers that
restate or cite what does not exist, and invariants no bar checks; each cell's outcome, records and writing op, gate
counts, bend key and dry-run fate, and undo read as a builder would build them.

## 1. The round-7 findings in this lens, re-checked against the live text

| id | sev | verdict | evidence in the live text |
|---|---|---|---|
| VF7-TBL-01 | minor | fixed | the four parentheticals now read as Part L's: l. 2635 "(J148: the owner's rule and choice; the tier texts the program's)", l. 2653 "(J147)", l. 2706 "(J149)", l. 2743 "(J147, J150)" |
| VF7-TBL-02 | minor → major (merged into VF7-GEN-01) | fixed | *beneath*'s impassables, l. 3080–3082: "where an aqueduct's channel runs above the wall's top, its standing supports and the strip of each span whose soffit does not clear the wall's top (each widened so that the band's half at most touches the ring or that strip, *the edge*; law 1 (2): a crossing that fits neither form unlawful)"; §4.4 S5a *Trace* (2), l. 6601, the same; V06's five sites (V06 l. 1610–1611, 2856, T-V6-11 l. 4184, T-V6-47 l. 4220, T-V6-73 l. 4246): "over where its channel runs above the wall's top and every span over the band clears it, merged where its channel runs within the wall's height" |
| VF7-TBL-03 | minor | fixed | W7's last column, l. 3346: "gates become junctions (none under a road deck; one under an aqueduct's arch that clears it a junction there, as W6·C2)" |
| VF7-TBL-04 | minor | fixed | *Paths and tests*, l. 3326–3328: "nothing reported but each reshape of a placement-locked wall law 4's (G2) shows (a merge round the new aqueduct's arch or pier, or a gate *down before the wall* makes by hand …)"; W1·C1 and W3·C1 (l. 3340, 3342): "each reshape of it shown (law 4's (G2))"; *over the band*, l. 3028: "a merge round the aqueduct's arch or pier shown by law 4's (G2)" |
| VF7-TBL-05 | minor | fixed | the fixed-place sentence, l. 3235–3241: "clear of the zone: a trace by the pull or a cost field … its own cost choosing among the rest (law 2 (a)), and a place an event or costless rule sets (a stroke's crossing or anchor) at the nearest point clear of it (law 2 (a), law 3)"; *Nearest points*, l. 2998–3000: "(law 2 (a): a place an event or costless rule sets, a pull's or cost field's place being its own cost's; …)" |
| VF7-TBL-06 | minor | fixed | (3), l. 2545–2546: "(these laws' *what stands of a wall*; its worked example the crossing table, row W8)" |
| VF7-TBL-07 | minor | fixed | (6)'s lead, l. 2565 "**Kept from its creation; later work gives way.**", l. 2569 "it is **kept**"; (7), l. 3364 "the way being kept ((6))"; the laws' *held*, l. 2659–2660, and *Newer*, l. 2763–2764, read (6)'s keeping as no hold; no "held from its creation" remains in the set |

All seven are fixed; none persists.

## 2. Findings

### VF7v-TBL-01 — row (b) and W2's last column move a gate "clear of the strip" where the laws move it to the nearest point they admit

* **Severity:** minor · **Kind:** example contradicts law 1 (5) with law 2 (a) and law 3 · **Owner:** model
* **Claim.** The way-and-channel table's row (b), its gates cell (l. 2914): "a way crossing a trace makes its gate there
  on ground part 0 (§7.3's S7 row), never where these laws bar a gate (law 1 (5): in a road deck's under-deck strip, or
  in an aqueduct's unless its arches there clear the gate and the wall and the way passes the strip by the crossing
  rule): such a crossing of the trace is moved along the deck to the nearest crossing clear of the strip
  (`bend.raised.underSpan`, its wall form)". Row W2's last column (l. 3341): "a gate it makes for a ground way where law
  1 (5) bars one placed along that way clear of the strip, the stretch bent through it". Law 1 (5) (l. 2724–2725) admits
  a gate in an aqueduct's over crossing wherever every span over its footprint clears its top; law 2 (a) (l. 2803–2813)
  moves what the op lays or places along its line no further than the nearest clear points, and law 3 (l. 2846–2852)
  picks the least displacement. So under an aqueduct whose arch over the drawn crossing does not clear the gate, the
  laws put the moved crossing under the nearest arch that does — inside the strip — and the cell puts it outside the
  strip; along a way W2's stretch gates, the laws stop the gate where no span over its footprint fails to clear it,
  which may still lie in the strip's margin. The fix pass conformed §7.1's `bend.raised.underSpan` row (l. 11340: "its
  crossing of a trace to the nearest at which §2.7's laws admit its gate"), V09's line and T110-2 (5)'s second run (l.
  19476–19479: "moved along the deck to the nearest crossing at which §2.7's laws admit its gate (§2.7's laws, law 1 (5),
  law 2 (a), law 3)") (VF7-HND-01, S9, V9-3); these two cells kept the pre-J149 words. A build from row (b) fails T110-2
  (5)'s second run; the laws govern (J146), so: minor.
* **Required change (model).** Row (b)'s gates cell: "such a crossing of the trace is moved along the deck to the
  nearest crossing clear of the strip (`bend.raised.underSpan`, its wall form)" → "such a crossing of the trace is moved
  along the deck to the nearest crossing at which these laws admit its gate (law 1 (5), law 3; `bend.raised.underSpan`,
  its wall form)". Row W2's last column: "a gate it makes for a ground way where law 1 (5) bars one placed along that
  way clear of the strip, the stretch bent through it" → "a gate it makes for a ground way where law 1 (5) bars one
  placed along that way at the nearest point these laws admit it (law 2 (a), law 3), the stretch bent through it".

### VF7v-TBL-02 — an over crossing "through a `cleared` support's ring" stated with no condition on the fallen spans either side

* **Severity:** minor · **Kind:** example contradicts law 1 (2) · **Owner:** model
* **Claim.** *beneath*'s *Where the line crosses* (l. 3060–3063): "over where its channel runs above the wall's top —
  under a span that clears the wall's top, or through a `cleared` support's ring (open ground: both its spans fallen,
  C5), never through a standing support"; the bent-group sentence's **lawful crossing** (l. 3184–3186), which (i) moves
  every unlawful crossing to: "over where its channel runs above the wall's top, under a span that clears it or through
  a `cleared` support's ring (open ground, C5), its band's half at most touching a standing support's ring". Law 1 (2)
  (l. 2705–2712) reads the aqueduct's levels "from the records, each span's soffit standing or fallen" and admits over
  only with "every span above the band clearing the wall's top", "a crossing that fits neither form" unlawful. A
  `cleared` support's two spans have fallen (C5, l. 3271–3272), and a band wider than the ring (a pier's ring is
  max(`pierWidthShare` × span, `pierMinCm`) along the deck, (4)) lies under them; where either's recorded soffit is below
  the wall's top, a band through the ring fits neither form. *beneath*'s own impassables were widened for exactly this
  case by the fix pass (l. 3080–3082, M8: "each widened so that the band's half at most touches the ring or that
  strip"; `adjudication-r7v.md` M8's note: "a band crossing through a `cleared` ring between a clearing span and a low
  one would otherwise reach under the low one"); the two sentences that define the lawful crossing a hand stroke, VS3's
  palisade and a re-section take were not. A bent-group move to such a ring breaks law 1 (2) and fails §5.3's law-1 row
  (l. 9940) at the commit, so a wrong build is caught: minor.
* **Required change (model).** *Where the line crosses*: "or through a `cleared` support's ring (open ground: both its
  spans fallen, C5)," → "or through a `cleared` support's ring (open ground: both its spans fallen, C5) where every span
  above the band, standing or fallen, clears that top,". The bent-group sentence: "under a span that clears it or through
  a `cleared` support's ring (open ground, C5)," → "under a span that clears it or through a `cleared` support's ring
  (open ground, C5) where every span above its band, standing or fallen, clears it,".

### VF7v-TBL-03 — two sentences admit an anchor in an aqueduct's strip under an arch that clears it

* **Severity:** minor · **Kind:** example contradicts law 1 (4) (correction 7 not applied) · **Owner:** model
* **Claim.** The fixed-place sentence, *A raised way created after the wall* (l. 3259–3262): "plans round every fixed
  place (law 2 (a)): a road deck keeps each outside its zone and an aqueduct each out of its strip but under arches that
  clear it, and either keeps each off its ramps, stairs and feet widened by the strip margin (law 1 (4), (6))";
  *beneath*'s *No gate and no tower* (l. 3155–3159): "A gate or tower whose place the wall's own law fixes — a river's
  water gate, an anchor's tower, a harbour-mouth chain, a castle's town-side gate and vertex towers (these laws' fixed
  places) — never moves along: whichever is laid later keeps it out of a road deck's zone, and out of an aqueduct's
  strip but under arches that clear it (law 1 (6); the fixed-place sentence)". An anchor ends its stretch's line on its
  barrier (*fixed place*, l. 2627–2629), and law 1 (4) (l. 2721–2723) lets an enclosing wall's band lie in a raised way's
  strip "only to cross its deck line — entering on one long side, leaving by the other", so no anchor lies in an
  aqueduct's strip whatever its arches clear. Part L's correction 7 (Part L l. 697–700: a fixed place under the aqueduct
  "only in an over crossing whose spans clear it, …, never an anchor (law 1 (4) …)") and the restated veto list's item 7
  (Part L l. 742–743: "an anchor, which ends its wall's line, under none") say so, as Part P closed it (PRB7F-GEN-08,
  `adjudication-r7.md` l. 3687: "an anchor ends its wall's line, so none stands in any raised way's strip"), and the bars
  run it — T110-2 (1)'s
  variant (l. 19307–19310: "its course bent so that the anchor lies outside its under-deck strip and the water gate and
  the weld vertex outside it save under an arch that clears them") and T110-2 (4)'s refusal of "a hand stretch whose
  anchor lies inside its under-deck strip" (l. 19461–19463). The two sentences, the second naming the anchor's tower,
  admit it under a clearing arch; §5.3's law-1 row catches a build from them: minor.
* **Required change (model).** The fixed-place sentence: "and an aqueduct each out of its strip but under arches that
  clear it," → "and an aqueduct each out of its strip but under arches that clear it, an anchor out of it always (law 1
  (4)),". *No gate and no tower*: "and out of an aqueduct's strip but under arches that clear it (law 1 (6); the
  fixed-place sentence)" → "and out of an aqueduct's strip but under arches that clear it, an anchor's tower out of it
  always (law 1 (4), (6); the fixed-place sentence)".

### VF7v-TBL-04 — law 1 (5)'s "never on a support's ring": a `cleared` support's ring read two ways (VALID CHOICE)

* **Severity:** minor (VALID CHOICE, J151) · **Kind:** two readings of a law-1 clause, every outcome lawful · **Owner:**
  model (fix-list.md)
* **Claim.** Law 1 (5) (l. 2724–2725): "no gate's, postern's or tower's footprint lies in a strip, under a standing span
  or a fallen one, but in an aqueduct's crossing law 1 (2) reads over whose every span over it clears its top, never on
  a support's ring". The terms (l. 2618–2619) define "a **standing support** one whose `state` is absent or `ruined`; a
  `cleared` one's ring is open ground", law 1 (2)'s over form bars only a "standing support in the band", and *Where the
  line crosses* lets a band pass "through a `cleared` support's ring". Law 1 (5) names no state, so a gate, postern or
  tower whose footprint falls on a `cleared` support's ring in an over crossing whose spans clear it is (a) lawful —
  the ring open ground, as the terms read it — or (b) barred — every support's ring — so that S7's tower by spacing,
  S5a's pin, a `placeGate` or a slid gate there stands in (a) and is moved along the trace to the nearest lawful point
  in (b) (law 2 (a), law 3). Each keeps law 1 as it reads it and every owner rule (J148: neither moves a standing gate or
  tower; J149: over with the gate under a clearing arch); a later hand repair of that support raises a new part whose
  supports (1)–(5) place off the band (C10, l. 3291–3296), and `repairRaised` raises only a `ruined` part (V06 l. 726), so
  neither reading leaves a later op without an outcome; no named test places a footprint on a `cleared` ring (the state
  sweep asserts "no gate's or tower's footprint in the under-deck strip but where §2.7's laws, law 1 (5), admit one", l.
  19278–19279). A valid choice.
* **Required change.** VALID CHOICE (J151): fix-list.md's builders' choices list "§2.7's laws, law 1 (5)'s 'never on a
  support's ring' — read of every support (a gate, postern or tower never on a `cleared` support's ring, moved along the
  trace to the nearest lawful point, law 2 (a), law 3) or of a standing one (a `cleared` ring open ground, the footprint
  lawful there in an over crossing whose spans clear it)"; the builder picks one. No design text changes.

### VF7v-TBL-05 — a run re-sectioned under an older aqueduct: counted in `walls.raisedCrossings` or not (VALID CHOICE)

* **Severity:** minor (VALID CHOICE, J151) · **Kind:** two examples give two counts · **Owner:** model (fix-list.md)
* **Claim.** Row W14's last column (l. 3353): "at an epoch each crossing counted in `walls.raisedCrossings`"; the
  bent-group sentence (l. 3212–3214), which W14's C2 makes the re-sectioned run's rule: "at an epoch the stretch's
  crossings of the deck line are counted in `walls.raisedCrossings` as *Reported* says"; *Reported* (l. 3164–3168):
  "once per crossing of a trace laid after a raised way with that raised way's deck line"; *Paths and tests* (l.
  3328–3330): "`W_RAISED_CROSSING` and `walls.raisedCrossings` count only a trace laid after a raised way crossing its
  deck line"; V06 §2.10's field (V06 l. 756): "crossings of a trace this epoch laid or re-sectioned with a standing raised
  way's deck line, counted as the crossing table's *Reported* says". A re-section keeps its line's order (*Order*, l.
  2683–2684: "every other op keeps it — a re-section on its kept trace"), so a palisade an aqueduct was created across
  (C1, *over the band*) — the carried-down CITY ring a village REPLACEMENT rebuilds in stone among them (T-V7-48) — is (a)
  counted at the REPLACEMENT's epoch (W14; V06's "or re-sectioned") or (b) not counted (*Reported*: no trace laid after
  the raised way). No law-1 invariant, no clause of the check and no named test reads the count (T-V6-47 counts new
  circuits and contractions only, V06 l. 4220; T-V7-48's REPLACEMENT clauses count nothing). A valid choice.
* **Required change.** VALID CHOICE (J151): fix-list.md's builders' choices list "§2.7's crossing table, row W14 at an
  epoch: a run re-sectioned on a trace older than the raised way it crosses — each crossing counted in
  `walls.raisedCrossings` at the re-section's epoch (W14; V06 §2.10's 'laid or re-sectioned'), or counted only where the
  run was laid after the raised way (*Reported*)"; the builder picks one. No design text changes.

## 3. What was attacked and closed with no finding

* **The laws as stated.** Part L's words but for markers, citations and the two END-L lines (method (2)); law 1 (1)–(11)
  each checked by §5.3's law-1 row (l. 9940: "its clauses (1)–(11) as the laws state them", once per commit, the stored
  `laidAt` and `courseAt`, what the commit made newly or moved) and by T110-4 (l. 19564–: every family fixture, the state
  sweep, 200 random ops on 32 seeds over every path, unlocked, placement- and shape-locked, two hosts on the model and
  records digests) — no invariant unchecked. END-L1's law 1 (8) agrees with V04 §3.5.4 (d) (1)–(3) (V04 l. 1695–1718:
  a chamber in each `vault` span read `vault`, none in one too small or read `open`), with the span rule's last sentence
  (l. 3404–3407) and with T-V4-62 / -63 as conformed. END-L2's *Order* agrees with *Newer* at a regeneration (its stages
  at the event's place, after every structure it keeps) and with W3·C2; a village Regenerate is a regeneration by W3's
  path list and the *commit* term's three kinds (generation, a regeneration, a village derivation), so *Order*'s "a
  village derivation's steps" is a village product's first derivation and a derivation an epoch runs is that epoch's
  (*commit*: "an epoch — a replay's, a village's and a derivation it runs among them"). A warp's newly made crossing
  is dated by *Order*'s address tie for the two lines it moves (one outcome; *Newer*'s "the raised way is the older"
  decides who bends, not law 1 (3)'s dates).
* **Every wall event** (W1–W14, and a burial, a warp, a `revert`, a `split` / `merge`, a castle grip, a water op's
  re-trace, an absorb with no epoch): law 4 re-checks each; law 2 (a)–(c) gives each an outcome on each of its paths —
  an absorb's dossier wall at a village rung runs VS3's form "where no user runs it", so law 2 (c)'s generation branch
  (F-V-RAISED) holds it; the frame growth, the one op that cannot wait, keeps its old end span where a wall crosses it
  and lays new stations only on ground the grown frame reveals.
* **Every raised-way state** (C1–C13): the aqueduct's form read from recorded soffits standing or fallen; a support's
  own derivation keeps every new pier off a standing band ((3); C1, C10's new part, C12), so a merge at C1 is at an arch;
  `repairRaised` raises only `ruined` parts and a hand repair of a `cleared` support bends to a new part slid off the band,
  so C10's "over a strip this table kept clear" holds; C13's Deck height edit of an aqueduct that would turn an over
  crossing with a gate under it into a merged one, or into neither form, is bent to the nearest lawful value, else
  refused (law 1 (2), (5), law 2 (a), (c)).
* **Every lock.** Placement either side: soft readings, *Carried way*'s gate by hand, (G2) shown, no refusal (law 2
  *Entry*). Shape on the raised way: no wall-like line, band or strip newly across a `vault`-use span's strip (the
  pull's impassables, the bent group's crossings, the retaining-wall sentence, W2·C8, W3·C8), a merge round its pier or
  under an `open`-use span and a cap of the newer wall's own top lawful, a junction's square or a ring road across an
  already-`open` span no wall-like meeting (law 1 (10)'s list; the way-and-channel table's lead). Shape on the wall: no
  merge, no gate (*Carried way* re-routes, else law 2 (c)), no lowered soffit (C13 bent), an over crossing lawful. No
  finding concerns a lock under undo, redo, a re-grade or a repair (J150).
* **The cells.** Every row of both tables has its 15 and 5 cells; every "as Wn·Cm" and row citation resolves (W1·C1,
  W1·C2, W1·C9, W1·C11, W2·C2 … W14·C2, W8·C1; rows (a)–(e), W8, W13, W14); each cell gives one built form, its writing
  op and records, its gates on ground part 0, its bend key or fate by law 4 and its undo — where a cell omits one, law 4
  and law 1 (8) supply it (no finding) — but for VF7v-TBL-01's and VF7v-TBL-05's cells. The named tests hold their cases
  where checked (W1·C8 → T110-4 (c)'s village rung; row (d) → T110-2 (2), (3); W3·C2 → T110-2 (6)'s carried-way runs;
  W8·C1 / C2 → T-V6-11; W2·C2 → T-V4-63; the C9 column → T-V7-48's hand-off, Regenerate, REPLACEMENT and hand clauses).
* **The support step's own rules against the outcomes.** (3)'s obstacles and slide bound and the span rule's step (2)
  agree with *over the band* (supports off the band, its own derivation), *down before the wall* (no road deck across a
  standing trace, (7)'s extension and a repair excepted as no course laid), *beneath* (the band through a road deck's
  support, round a merged arch or pier, at *the edge* of an over crossing's) and *unchanged meeting*; (6)'s lead defers
  walls to the laws; (7)'s branches are law 2 (c)'s word for word.
* **Owner rules.** Item 110 (b) (no junction; ends at ramps; "crossing the wall through an arch" as over or merged) and
  (f) (zero junctions; a removed one stays removed, W3·C7, T110-3); item 114 (law 1 reads runs whatever their condition;
  W4, W5, W10, W12; the merged arch the aqueduct's own); item 101 R2 (law 2 (a), law 3, (G3)'s alternatives); J144 (law 2
  *Entry*; the lock sentence); J147 (*held*; law 1 (10)); J148 (Tier 1 never moved, law 1 (11); a user's own placement or
  slide the op's own edit); J149 (over and merged by level; beneath left out as its "if they help" allows) — none
  contradicted.
* **Readers inside the lens.** Every citation in the support step outside the laws names a law before its example (the
  fix pass's VF7-TBL-06 the last); no §2.7 text outside step (6) cites the tables. (Outside this lens and noted only:
  V06 §3.2, V06 l. 1048–1050, still restates law 1 (8)'s pre-END-L1 chamber clause, "every `vault` span they read
  `vault` has its chamber" — `assemble-r7v.md` left it open for the readers check.)

## 4. Verdict for this lens

The laws at §2.7's support step (6) are Part L's laws in Part L's words with the fix pass's two END-L supersessions, and
they decide every case this lens ran — every wall event, every raised-way state, every path and every lock axis on either
side — with a lawful outcome, no owner rule crossed and every law-1 invariant checked by §5.3's law-1 row and T110-4.
All seven round-7 findings of this lens are fixed. Five minors remain: three worked examples still say less or other
than the laws — a gate moved "clear of the strip" where an aqueduct's clearing arch admits it (VF7v-TBL-01), an over
crossing through a `cleared` ring with no condition on the fallen spans beside it (VF7v-TBL-02), an anchor admitted under
a clearing arch (VF7v-TBL-03), each caught by the check or a bar — and two valid choices for fix-list.md, a footprint on
a `cleared` support's ring (VF7v-TBL-04) and the epoch count of a run re-sectioned under an older aqueduct
(VF7v-TBL-05). **No major and no blocker in this lens: five minors (two of them valid choices).**
