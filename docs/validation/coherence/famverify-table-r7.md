# Family check, round 7 — the laws and their examples (coherence/famverify-table-r7)

> Seat `coherence/famverify-table-r7`, 2026-10-02. Lens: §2.7's support step (6) — the laws as the design now states
> them (terms, laws 1–4, law 1 (1)–(11), the tiers, the check), then the worked examples (the way-and-channel table, the
> crossing table, the lock, bent-group and fixed-place sentences, *Strips, zones and nearest points*, the four outcomes,
> the columns, *Paths and tests*), with the support step's own rules (1)–(7) and the span rule. Graded by J141 as the
> owner applies it to this family (J146, J151): MAJOR only for no lawful outcome, an outcome breaking an owner rule or a
> law-1 invariant, a law-1 invariant no bar checks, or a check or named test failing a correct build; an example that
> differs from the laws is a minor; a case missing from the examples is no finding. Line numbers are
> `docs/ARCHITECTURE.md` unless a volume is named; "Part L l. n" is `adjudication-r7.md`.

**Read whole:** the brief; `adjudication-r7.md` Part L (l. 307–813), R7-02's sentences and both tables (l. 815–1453),
Part P pass 8 (l. 3904–4052), Part H's head and the model heading (l. 1663–2091); PROGRESS J144 – J151; item 110 (b),
(f); the live §2.7 support step (l. 2534–3405) whole, §5.3's law-1 and gate rows (l. 9924–9938), §13.2's T110-2 lead,
state sweep and clauses (1)–(8) and T110-4 (l. 19201–19540), and the volume sites the round-6 findings name (V04 UC18,
V06 §3.19 (5) and T-V6-11/-47/-73, V07 T-V7-48, V09 §4.9).

**Method.** (1) Part L l. 332–652 and the live laws l. 2580–2889 were word-diffed after stripping whitespace: every
difference is a dropped "(J146, PRB7…)" marker, "§2.7's laws" read "these laws", "(§2.7's support step (6))" read
"((6)'s lead)", the bar named "§13.2's **T110-4**", two added citations ("V06 §2.10; (7)"; "law 1 (11)" in (G2)), and
four attributions (VF7-TBL-01) — so the design states Part L's laws in its words but for those four. (2) R7-02's rows
W1–W14 were word-diffed against the live rows: every change applies Part L's corrections 1–7 and pass 8. (3) Each
round-6 finding in this lens was re-read against the live text. (4) Laws 1–4 were applied to every wall event W1–W14
(and the events no row lists: a burial, a warp, a `revert`, a `split`/`merge`, a castle grip, a water op's re-trace),
every column C1–C13, every path (G, R, E, V, H) and every lock (none, placement, shape; wall side and raised-way side),
looking for two readings, no outcome, owner-rule clashes, readers that restate, and invariants no bar checks.

## 1. The round-6 findings in this lens, re-checked against the live text

| id | unit · sev | verdict | evidence in the live text |
|---|---|---|---|
| VDC6-01 | determinism · major | fixed | §7.1's lock row (l. 11280) now excepts "a meeting of two similar structures — a wall and a raised way, either locked, pinned or declared, which meet with their placement held and their shape changed there"; law 2 *Entry* (l. 2756–2758) |
| VEW-r6-04 | V06 · major | fixed | V06 §3.19 (5) (V06 l. 2836–2849): a founded course meets "a wall, a retaining wall and another raised way … as unheld ones", "a standing curtain — locked, pinned, declared or not — … by §2.7's laws" |
| VAL-R6-01 | model · major | fixed (closed by R7-02's lock sentence; law 1 (8), law 2 *Entry*) | *beneath* (l. 3109–3114): a placement-locked or pinned arch vault's span held, its chamber not laid while the span reads `open`, its lock kept with its key; V04 UC18 (V04 l. 2467) conformed, "never refused `E_LOCKED`" |
| VEW-r6-02 | model · major (merged into VAL-R6-01) | fixed | as VAL-R6-01; the held building's case is *A held building in an arch vault* (l. 3114–3135) and law 1 (9) (l. 2734–2736), a building held only where the user locks it (law 1's *held*, l. 2651–2658) |
| VAP-r6-01 | scope · major | fixed | W4·C8, W7·C8, W10·C8, W11·C8, W13·C8 (l. 3332, 3335, 3338, 3339, 3341) name their clause "·S"; the state sweep's C8 (l. 19244–19247) runs the raised way placement-locked, pinned and (from the shape lock's milestone) shape-locked |
| VEL6-r6-04 | model · major | fixed | the bent-group sentence's (ii)–(iii) (l. 3197–3201); T110-2 (4) runs a stroke along beneath, one entering and leaving one side, one ending at a support (l. 19390–19393) |
| VAT-r6-02 | model · major | fixed | row W13 takes "a gate's crossing slid along the trace by its grip" (l. 3341), W2's event cell "a gate's slid crossing is W13" (l. 3330); T110-2 (4)'s slid gate (l. 19378–19382) |
| VV910-r6-01 | model · major (merged into VAT-r6-02) | fixed | as VAT-r6-02 |
| VPC-r6-03 | pipeline · major | fixed | W2's event cell takes "a run a hand carve or a moved river re-traces" (l. 3330); §4.11 *Other crossings* (l. 8949): "A standing raised way and its reservation … are no conflict" |
| VCS-r6-01 | scope · major | fixed | C13 (l. 3294–3307) over the state sweep, whose C13 runs Arch spacing, Deck height and a hand re-shape (l. 19254–19256); T110-2 (4)'s re-shape across a placement-locked ring (l. 19404–19410) |
| VAT-r6-04 | V09 · minor | fixed | row (b)'s gates cell names "`bend.raised.underSpan`, its wall form" (l. 2912); V09 §4.9's line carries "crosses {wall} at a gate clear of {way}" (V09 l. 2105) |
| VM-R6T-01 | model · major | fixed | the fixed-place sentence (l. 3216–3256): a river's water gate and an anchor with its tower placed along the river or barrier, never moved along the trace |
| VEW-r6-03 | model · major | fixed | the fixed-place sentence names anchors, weld vertices and the castle's gate and towers (l. 3216–3222); *over the band* keeps fixed places out from under a road deck and under an aqueduct only where its arches clear them (l. 3015–3021) |
| VM-R6T-03 | model · minor | fixed | W11·C2 names "T110-2 (4), T-V4-63" (l. 3339) |
| VAF-R6T-02 | model · minor | fixed | row (a)'s test cell names "T-V1-51 (c)" (l. 2911) |
| VAF-R6T-03 | scope · major | fixed | row (a)'s test cell names "T110-2 (3) (the intervallum and the castle paths)" (l. 2911); T110-2 (3) runs S7's castle paths after a declared aqueduct (l. 19343–19347) |
| VAP-r6-02 | scope · minor | fixed | the hand and conversion rows' C3–C6, C10, C12, C13 cells name their clause "·S" (l. 3332, 3335, 3338, 3339, 3341); T110-2 (4) runs the hand rows over the state sweep (l. 19372–19386) |
| VEL6-r6-02 | scope · major | fixed | W3·C3–C6 name "T110-2 (6)·S" (l. 3331); T110-2 (6) regenerates and New-randoms the aqueduct over the state sweep, through a `cleared` ring and past a `ruined` stump (l. 19474–19480) |
| VM-R6T-02 | scope · major | fixed | as VEL6-r6-02; W7·C2's vault re-lay is run by T110-2 (8) — "the arch vault laid again with its id in the commit" (l. 19502–19508) |
| VV56-r6-03 | V06 · minor | fixed | W5, W6, W8 cells name T-V6-73·S, T-V6-47·S, T-V6-11·S (l. 3333, 3334, 3336); each test runs the state sweep (V06 l. 4234, 4208, 4172) |
| VAL-R6-06 | V07 · minor | fixed | W9's cells name T-V7-48·S (l. 3337); T-V7-48 hands the CITY fixture down over the state sweep (V07 l. 3708) |
| VV78-r6-01 | V07 · minor | fixed | as VAL-R6-06; T-V7-48 reports each palisade crossing of a deck line in `W_RAISED_CROSSING` once (V07 l. 3708) |
| VAT6-r6-02 | model · major | fixed | (7) (l. 3347–3371): past a bound the extension bends to the nearest fitting course, else keeps its course, each station slid, `raised.extendedPastBound`; law 2 (c) (l. 2837–2840) |
| VM-R6T-04 | model · minor | fixed | (3): "× the `pierSpacingM` band's upper bound ((1))" (l. 2548) |
| VV56-r6-02 | model · major | fixed | W8·C2 (l. 3336): the chamber laid again "in the commit of the `dismantle` that takes the last such run, or in `absorbWall`'s own where none is left"; T-V6-11 likewise (V06 l. 4172) |
| VPC-r6-04 | pipeline · minor | fixed | row (e) (l. 2915); S10 (0) (l. 7514) and §4.8 *Wall strips* (l. 8340) type the stopped moat's gap by the glacis line as a dry stretch |

All 26 are fixed or closed by a ruling; none persists.

## 2. Findings

### VF7-TBL-01 — four laws parentheticals record the program's texts as the owner's rules

* **Severity:** minor · **Kind:** citation (the laws not stated as Part L gives them) · **Owner:** model
* **Claim.** E-M1 writes Part L "from **Terms** through **The check**, in its words", only markers dropped; J-rows may
  be written. Four live parentheticals add "the owner's rule(s)" where Part L cites the J-row bare or names the text the
  program's:
  - l. 2634 "* **The tiers** (the owner's rule, J148)." — Part L l. 387 "(J148: the owner's rule and choice; the tier
    texts the program's)", as PROGRESS J148's last cell reads ("the tier texts the program's");
  - l. 2651 "**Held** is locked, on the axis named, and nothing else (the owner's rule, J147):" — Part L l. 405
    "(J147)"; PROGRESS J147 calls exactly this sentence its "PROGRAM READING (J122, vetoable): "held" means locked, on
    the axis named, and nothing else";
  - l. 2704 "nothing of either record written (the owner's rule, J149)" — Part L l. 458 "(J149)"; PROGRESS J149: "the
    forms' texts the program's";
  - l. 2741 "a gate made in it (the owner's rules, J147, J150);" — Part L l. 496 cites J147 and J150 bare; Part P pass
    8 (l. 3938–3942) flags law 1 (10)'s "that changes it" as the program's reading of J150, vetoable; PROGRESS J150:
    "The texts are the program's (J122, vetoable)".
  Nothing built changes; the design marks four vetoable readings as the owner's.
* **Required change (model, §2.7's support step (6) (0)):** l. 2634 "(the owner's rule, J148)" → "(J148: the owner's rule
  and choice; the tier texts the program's)"; l. 2651 "(the owner's rule, J147)" → "(J147)"; l. 2704 "(the owner's rule,
  J149)" → "(J149)"; l. 2741 "(the owner's rules, J147, J150)" → "(J147, J150)".

### VF7-TBL-02 — the over form read as "channel above the wall's top" alone, where a span that does not clear the top fits neither form

* **Severity:** minor · **Kind:** example and restatements differ from law 1 (2) · **Owner:** model (ENDs: pipeline, V06)
* **Claim.** Law 1 (2) (l. 2703–2711): **over** "where its channel there lies above the wall's top — no standing support
  in the band there and every span above the band clearing the wall's top"; **merged** "where its channel lies within
  the wall's height"; "a crossing that fits neither form is unlawful". So where an aqueduct's channel runs above the
  wall's top but a span's soffit there does not clear it, no form fits and no line may cross there. *beneath*'s list of
  "the impassables these laws give a trace" (l. 3072–3079) names, for an aqueduct, only "an aqueduct's standing supports
  where its channel runs above the wall's top"; §4.4 S5a (2) restates the same list (l. 6589: "an aqueduct's standing
  supports where its channel runs above the wall's top (its crossing there over)"), and V06's cost field takes that list
  (V06 l. 1605–1607); V06 restates the form as "over where its channel runs above the wall's top, else merged" (V06 l.
  1609, l. 2847–2848, and T-V6-11 l. 4172, T-V6-47 l. 4208, T-V6-73 l. 4234), which files the neither case under over.
  The set disagrees with itself — *Where the line crosses* (l. 3056–3057), the bent group's lawful crossing (l.
  3177–3178) and T110-2 (4) (l. 19363–19364: "bent along the deck to cross under the nearest span that clears the wall")
  carry the clearing condition. The laws decide it (the pull "searches only shapes law 1 admits", l. 2810–2811), and a
  pull built from the list fails §5.3's law-1 row (l. 9928) at the stage end, so no wrong build passes: minor.
* **Required change.** (model) *beneath*, l. 3075–3077: "an aqueduct's standing supports where its channel runs above
  the wall's top (each widened so that the band's half at most touches the ring, *the edge*)" → "where an aqueduct's
  channel runs above the wall's top, its standing supports (each widened so that the band's half at most touches the
  ring, *the edge*) and each of its spans whose soffit does not clear the wall's top (law 1 (2): a crossing that fits
  neither form)". (END pipeline) §4.4 S5a (2), l. 6589: "an aqueduct's standing supports where its channel runs above
  the wall's top (its crossing there over)" → "where an aqueduct's channel runs above the wall's top (its crossing there
  over), its standing supports and each span whose soffit does not clear the wall's top". (END V06) at V06 l. 1609, l.
  2847–2848, T-V6-11, T-V6-47 and T-V6-73: "over where its channel runs above the wall's top, else merged" → "over where
  its channel runs above the wall's top and every span over the band clears it, merged where its channel runs within the
  wall's height".

### VF7-TBL-03 — W7's last column says no gate stands under a deck, against law 1 (5)'s gate under an aqueduct's clearing arch

* **Severity:** minor · **Kind:** example contradicts law 1 (5) (correction 7 not applied) · **Owner:** model
* **Claim.** W7's last column (l. 3335): "`retypeEdges`, … · gates become junctions (none under a deck); no junction with
  the raised way". Law 1 (5) (l. 2722–2723) admits a gate in "an aqueduct's crossing law 1 (2) reads over whose every
  span over it clears its top"; W6·C2 (l. 3334) opens such a gate into "a junction there, its square laid as at any gate";
  T-V6-47 runs it (V06 l. 4208). So `wallToWay` of a ring with a gate under an aqueduct's clearing arch leaves a junction
  under that deck, which W7's parenthesis denies. The laws govern; nothing a correct build does fails a bar.
* **Required change (model, row W7's last column):** "gates become junctions (none under a deck)" → "gates become
  junctions (none under a road deck; one under an aqueduct's arch that clears it a junction there, as W6·C2)".

### VF7-TBL-04 — C1 and C11 "nothing reported", though law 4's (G2) shows a merge round a placement-locked wall

* **Severity:** minor · **Kind:** example contradicts law 4's (G2) · **Owner:** model
* **Claim.** *Paths and tests* (l. 3314–3318) gives C1's and C11's records as the raised way's creating commit, "nothing
  of the wall written but *down before the wall*'s gate, nothing reported"; W1·C1 (l. 3329) and W3·C1 (l. 3331) read "a
  placement-locked wall … met as an unlocked one", and *over the band* (l. 3024–3025) "a placement-locked wall is met as
  an unlocked one". A merge round an aqueduct's arch is a change of the wall's shape (*The soft readings*, l. 2774–2775;
  *shape*, l. 2662–2663), and law 4's (G2) (l. 2865–2869) shows every such change to a placement-locked structure other
  than the op's own target — by hand the fate *reshaped*, otherwise a `reshaped` entry. So an aqueduct created across a
  placement-locked wall where its channel runs within the wall's height (S6's at a regeneration that keeps the ring, V06
  §3.19's founding, a hand declaration) owes that fate or entry, which the example withholds. T110-2's lead (l.
  19260–19261) and T110-4 (c) (l. 19532–19534) require it, so a correct build passes every bar.
* **Required change (model).** l. 3317: "nothing of the wall written but *down before the wall*'s gate, nothing reported —"
  → "nothing of the wall written but *down before the wall*'s gate, nothing reported but each reshape of a
  placement-locked wall law 4's (G2) shows (a wall the new aqueduct merges round its arch: by hand the fate *reshaped*,
  else a `reshaped` entry) —"; in W1·C1 and W3·C1 "met as an unlocked one" → "met as an unlocked one, each reshape of it
  shown (law 4's (G2))"; in *over the band* "a placement-locked wall is met as an unlocked one" → "a placement-locked wall
  is met as an unlocked one, a merge round the aqueduct's arch shown by law 4's (G2)".

### VF7-TBL-05 — a pulled trace's river crossing and anchor set "at the nearest point", where law 2 (a) has the search choose

* **Severity:** minor · **Kind:** example contradicts law 2 (a) (a valid choice the laws already pick, J151) · **Owner:**
  model
* **Claim.** The fixed-place sentence (l. 3228–3232): "**A trace laid after the raised way** places its own fixed places —
  its river crossing along the river, its anchor along its barrier's edge (…) — at the nearest point clear of the zone, a
  trace by the pull or a cost field treating the river's water and the barrier's edge inside the zone as no crossing or
  anchor site"; *Strips, zones and nearest points* (l. 2995–3001) lists "a river crossing along the river, an anchor along
  its barrier's edge" among things that go "to the nearest point of that line, in either direction from where the rule
  would place it". Law 2 (a) (l. 2808–2811) gives the nearest place only to "a line, point or value an event or costless
  rule sets", while "every other op (a pull or cost field, a route solve, a siting, a points-form `drawWall`'s trace)
  searches only shapes law 1 admits, its own cost choosing among them" — Part P pass 8's pick (PRB7H-GEN-03). A pull's
  river crossing and anchor are its search's, so a builder who snaps the pull's crossing to the nearest clear point and
  one who pulls with the zone impassable build different maps; both keep law 1 and pass T110-2 (3) (l. 19325–19327:
  "moved along the river clear of the zone"), and the laws pick the second, so the example is corrected: minor.
* **Required change (model).** l. 3229–3232: "— at the nearest point clear of the zone, a trace by the pull or a cost field
  treating the river's water and the barrier's edge inside the zone as no crossing or anchor site, a stretch of the bent
  group bent locally to the moved place" → "— clear of the zone: a place an event or costless rule sets (a stroke's
  crossing or anchor) at the nearest point clear of it (law 2 (a), law 3), a stretch of the bent group bent locally to the
  moved place, and a trace by the pull or a cost field treating the river's water and the barrier's edge inside the zone
  as no crossing or anchor site, its own cost choosing among the rest (law 2 (a))"; l. 2996–2997: "(law 2 (a); a standing
  one is never moved, law 1 (11))" → "(law 2 (a): a place an event or costless rule sets, a pull's or cost field's place
  being its own cost's; a standing one is never moved, law 1 (11))".

### VF7-TBL-06 — (3) cites row W8 with no law

* **Severity:** minor · **Kind:** citation · **Owner:** model
* **Claim.** The support step's (3) (l. 2544–2545): "that band as it stood over each run of the absorbed record not yet
  `dismantled` (the crossing table, row W8)". E-M1 (adjudication l. 2029–2031): (3)'s obstacle list cites "these laws"
  with the law's number where it cites the crossing table; every other citation in (3) does ("these laws, law 1 (4)",
  "these laws, law 1 (8)", "these laws (law 1 (2), (3)"). The rule it illustrates is the laws' *what stands of a wall*
  (l. 2593–2596: an absorbed record's run "stands while its condition is not `dismantled`, with its band as it stood").
* **Required change (model, (3)):** "(the crossing table, row W8)" → "(these laws' *what stands of a wall*; its worked
  example the crossing table, row W8)".

### VF7-TBL-07 — (6)'s lead and (7) call the support step's keeping "held", the word the laws reserve for a lock

* **Severity:** minor · **Kind:** wording · **Owner:** model
* **Claim.** (6)'s lead (l. 2564–2568): "(6) **Held from its creation; later work gives way.** … from that commit, at
  generation as after it, it is **held**: nothing laid later …"; (7) (l. 3353): "the way being held ((6))". The laws
  define **held** as "locked, on the axis named, and nothing else" (l. 2651) and say of this keeping "The support step's
  keeping of every raised way's stations, keys and spans from its creation ((6)'s lead) is no hold" (l. 2657–2658). The
  laws decide it, so nothing built changes; a builder reading (6)'s bold term in the laws' sense would show every raised
  way's soft readings by law 4's (G2).
* **Required change (model).** "(6) **Held from its creation; later work gives way.**" → "(6) **Kept from its creation;
  later work gives way.**"; "it is **held**:" → "it is **kept**:"; (7) "the way being held ((6))" → "the way being kept
  ((6))".

## 3. What was attacked and closed with no finding

* **The laws as stated.** Word for word with Part L but for VF7-TBL-01; law 1 (1)–(11) each checked by §5.3's law-1 row
  (l. 9928: "its clauses (1)–(11) as the laws state them", per commit) and by T110-4 (l. 19516–19540: every fixture, the
  state sweep, 200 random ops on 32 seeds, every path, unlocked, placement- and shape-locked, a skeleton's round trip) —
  no invariant unchecked.
* **Every wall event** (W1–W14, and a burial, a warp, a `revert`, a `split`/`merge`, a castle grip, a water op's re-trace,
  which no row lists): law 4 re-checks each, law 2 (a)–(c) gives each an outcome on every path; the frame growth, the
  one op that cannot wait, never meets a wall on new ground (§4.11 *The rung at an epoch*, l. 9181–9195: the frame grows as the epoch reads its rung, before its growth step's new stage), and
  its old end span is kept where a wall crosses it ((7); law 2 (c)).
* **Every raised-way state** (C1–C13): the aqueduct's form read from recorded soffits standing or fallen; a `cleared`
  ring open ground (a band inside it meets no span; one wider than it meets the fallen spans' recorded soffits, law 1
  (2)); a `ruined` stump a standing support; C10's repair re-laying a span over a later wall lawful by *Order* (a repair
  keeps its line's order).
* **Every lock.** Placement either side: soft readings, *Carried way*'s gate by hand, (G2) shown, no refusal (law 2
  *Entry*). Shape on the raised way: no wall line, band or strip newly across a `vault`-use span (the pull's impassables,
  the bent group's crossings, W2·C8, W3·C8); shape on the wall: no merge, no gate (*Carried way* re-routes through the
  nearest gate a way of its class may pass, else law 2 (c)), an over crossing and a cap of the newer wall's own top
  lawful (PRB7H-LCK-01).
* **Owner rules.** Item 110 (b) (no junction, ends at ramps, "crossing the wall through an arch" as over or merged) and
  (f) (zero junctions, removal holds: C7, T110-3); item 114 (law 1 reads runs whatever their condition; W4, W5, W10,
  W12); J144 (law 2 *Entry*; the lock sentence); J147 (*held*, law 1 (10)); J148 (Tier 1 never moved, law 1 (11); a
  user's own slide or placement excepted); J149 (over and merged by level; beneath left out as J149's own condition
  allows) — none contradicted.
* **"as Wn·Cm" references.** Every one resolves (W1·C2, W1·C9, W1·C1/C11 for "—", W2·C2, W3·C2, W6·C2, W7·C2, W8·C1,
  W8·C2, W9·C2, W10·C2, W11·C2, W12·C2, W13·C2, W14·C2; row (b) → W13); every row has its fifteen cells; each cell
  gives one outcome, and where a cell omits its undo, bend key or `collapsed` reading, law 4 and law 1 (8) supply it.
* **The support step's own rules against the outcomes.** (3)'s obstacles and slide bound, (4)'s pier bound and the span
  rule's step (2) agree with *over the band* (supports off the band, its own derivation), *down before the wall* (no
  road deck across a standing trace, (7)'s extension excepted), *beneath* (the band through a road deck's supports, round
  a merged arch) and *unchanged meeting*; (6)'s lead defers walls to the laws; (7)'s two branches are law 2 (c)'s.
* **The examples against the seven corrections and pass 8.** Every "held" a lock, every fate a bend line or (G2), every
  aqueduct crossing by level, the gate and tower clauses by law 1 (5) and (11), several raised ways read one by one —
  applied in the live text but for VF7-TBL-02 – 05.

## 4. Verdict for this lens

The laws as the design states them at §2.7's support step (6) are Part L's laws in Part L's words, save four
parentheticals that label program readings as the owner's (VF7-TBL-01), and they decide every case this lens ran —
every wall event, every raised-way state, every path and every lock axis on either side — with one lawful outcome, no
owner rule crossed and every law-1 invariant checked by §5.3's row and T110-4. The worked examples were conformed to
the seven corrections and pass 8 throughout; six slips remain where an example or a restatement says less or other
than the laws (the over form's clearing condition dropped from the pull's impassables and V06's "else merged",
VF7-TBL-02; a junction under an aqueduct's arch denied at `wallToWay`, VF7-TBL-03; (G2)'s entry withheld at C1,
VF7-TBL-04; a pulled trace's fixed places snapped to the nearest point, VF7-TBL-05; a bare row citation in (3),
VF7-TBL-06; the support step's keeping called "held", VF7-TBL-07), each decided by the laws and caught or untouched by
the bars. All 26 round-6 findings in this lens are fixed. **No major and no blocker in this lens: seven minors.**
