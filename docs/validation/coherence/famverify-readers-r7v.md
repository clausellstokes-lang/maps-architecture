# Family verify — round 7v, readers, drawing and exports (raised way × wall)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/famverify-readers-r7v; covered by the
> whole-design retrovalidation (J84).

PROGRESS (lane `coherence/famverify-readers-r7v`, 2026-10-02, the design after assemble-r7v; fresh start, no earlier
CHECKPOINT of this seat)
- [x] R1 read: the brief whole; adjudication-r7.md Part L (normative), the seven corrections and the restated veto list,
  Part A, R7-05, Part H's rendering, V01, V09, V10, V11 and V12 headings; adjudication-r7v.md whole; assemble-r7v.md's
  hand-offs and section 8; the live §2.7 support step (6) — the laws (l. 2579–2891) and the worked examples (l.
  2893–3382) — and the span rule (l. 3387–3407); famverify-readers-r7.md and its result JSON; item 110 (b) itself
  (AMENDMENTS-2026-09-28g l. 612–629)
- [x] R2 re-check: VF7-RDR-01 – -11 against the live text (section 1)
- [x] R3 attack through the lens: §4.5's casters; §8.1's draw order, §8.2's programs, slot table and states, §8.3's
  census, §8.4's surface layer, slab list and casters; §9's labels, obstacles and legend; §11.1's GeoJSON, SVG/PNG, VTT,
  glTF and CityJSON rows; §13.5's parity row; V01 §1.2's hook rows, §3.17.3, §5.1.2–§5.1.3 and T-V1-51; V04 §3.5.4 (d),
  §5.1, §5.2, §5.5, T-V4-62, T-V4-63; V09 §4.9's bend, fate, effect and refuse lines, §4.20.2 (4), (8), §4.20.6,
  §4.20.8, edge row 44, T-V9-52, T-V9-58, T-V9-61; V10's raised-way read row, `span` encoder, T-V10-40 – -42; V11 row 80,
  W50, §3.24.2 and row 863's pattern; V12's reading rules, `wall.*`, `raised.*` metrics, register lines and T-V12-38 —
  each read against laws 1–4, J144, J147 – J149 and item 110 (b), (f), 114
- [x] R4 graded by J141 under J146 and J151; nothing reported that J150 hands to round 8

Grading used (the brief's, J146 with J151): MAJOR only where the laws or the design text written from them give a case
no lawful outcome, an outcome breaking an owner rule or a law-1 invariant, leave a law-1 invariant checked by no bar, or
make a check or a named test fail a correct build; several outcomes all lawful is a minor VALID CHOICE; a citation, a
restatement the laws already decide, or a case a fixture may not hold is a minor. Line numbers are the live files' at
HEAD `76aaf9f` (base `docs/ARCHITECTURE.md` unless a volume is named).

## 1. The round-7 family findings of this lens, re-checked against the live text

| id (owner, grade) | what it asked | live text now | verdict |
|---|---|---|---|
| VF7-RDR-01 (V12, major) | `wall.ungated` and §13.5's P row count ways on ground part 0 only; roads leaving a stage by §5.3's gate row | V12 l. 1129 ("`wall.ungated` reads ways of `part` 0 only (§2.7's laws, law 1 (1))"), l. 1168 ("arterial ways on ground part 0 crossing a curtain at no gate (a way's `part` ≥ 1 never counted …)"); base l. 20113 ("ungated crossings 0 (on ground part 0; …)", "roads leaving each walled stage on ground part 0 = its gate count by §5.3's gate row (… any gate a carried way standing before the stage takes …)") | **fixed** |
| VF7-RDR-02 (model, major) | law 1 (8) with room for V04's span too small for a chamber; T-V4-62 and T-ER-12 conformed | law 1 (8) l. 2734–2735 ("a span read `vault` has the chamber V04 §3.5.4 (d) lays"); the span rule l. 3404–3405 ("and one whose inset rectangle V04 §3.5.4 (d) (1) finds too small, reported"); T-V4-62, T-V4-63 (V04 l. 3163–3164: "but one too small for a chamber, which holds none and is reported"); T-ER-12 l. 15480 ("and CityJSON's `BridgeRoom` wherever V04 lays its arch vault"). Two restatements of the replaced clause stand outside the round's sweep: V06 §3.2 l. 1048–1050 ("every `vault` span they read `vault` has its chamber (`collapsed` where V04 §3.5.4 (d) (2) says)" — assemble-r7v's open hand-off) and base II.7.6 l. 22795 ("each span a raised way's record marks `vault` — but one read `open` (…; V04 §3.5.4 (d) (1)) — holds one arch vault at grade") | **partly fixed** — the residual is a minor (section 2, VF7-RDR-02) |
| VF7-RDR-03 (rendering, minor) | §11.1's CityJSON row cites law 1 (8); *beneath* names the CityJSON reading as no `BridgeRoom` | l. 16720 ("an arch vault a `BridgeRoom` — none in a span §2.7's laws read `open` (law 1 (8); its worked example *beneath*)"); l. 3104–3105 ("no end walls (§11.1's 3-D row) and no `BridgeRoom` (its CityJSON row)") | **fixed** |
| VF7-RDR-04 (pipeline, minor) | §4.5's casters cite law 1 (7) instead of restating it | l. 6885 ("walls (each run at its top as §2.7's laws give it, law 1 (7); its worked example *the cap* in *beneath*)") | **fixed** |
| VF7-RDR-05 (determinism, minor) | §5.4's `reshaped` entity list as law 4's (G2) | l. 10003 ("a placement-locked (a pin among them) wall-like structure, raised way, arch vault or ground way whose shape a meeting changed") | **fixed** |
| VF7-RDR-06 (V09, minor) | `fate.reshaped` names the field as §5.4 does | V09 l. 2033 ("its change by the fate's `change` (§7.1's `EditFate`, a `ReshapeChange` as §5.4's `reshaped` entry's `reshape`)") | **fixed** |
| VF7-RDR-07 (V09, minor, valid choice) | list the bend line for a stroke meeting several raised ways | adjudication-r7v's *Builders' choices for fix-list.md* (l. 714–717); no design text written for it, as ruled | **closed by a ruling** (VALID CHOICE LISTED); its aqueduct-stroke analogue is VF7v-RDR-05 |
| VF7-RDR-08 (V09, minor) | V09 §4.9's source cells cite the laws | V09 l. 2102 ("(§2.7's laws, law 1 (3), law 2 *Carried way*; its worked example *down before the wall*)"), l. 2105 ("where §2.7's laws bar its gate there (law 1 (1), (5), (8); …)", "(§2.7's laws, law 1 (1), (8); its worked example the way-and-channel table's row (e))"), l. 2106 | **fixed** |
| VF7-RDR-09 (V01, minor) | V01's gate wording after J149; citations; the hook row's `stripMarginM` | V01 l. 201 (`stripMarginM` and "the under-deck strip (V01 §3.17.3 (2))"), l. 978, l. 1423–1425, l. 2468–2470, l. 2482–2486 | **fixed** (l. 2473's table-only citation was outside its required change: VF7v-RDR-02) |
| VF7-RDR-10 (V09, minor) | `effect.vault.removed`'s line for a chamber a meeting removes | V09 l. 2148 ("… "The arch vault under {way} is removed while {met} lies across it; what stood in it is kept."") | **fixed** |
| VF7-RDR-11 (V12, minor) | E-V12-1's register line names only the margin's readers | V12 l. 2178 ("the strip, the ends and the zone of their terms (a span's strip and a held building's strip read no margin)") | **fixed** |

The other round-7 family fixes that land in this lens's units were read in place and stand as written: VF7-HND-01's and
VF7-HND-03's V09 ENDs (V09 l. 2102, 2104, 2105), VF7-HND-02's (V09 l. 3016–3024), VF7-TST-02's T-V9-52 (V09 l. 4428),
VF7-RDR-02's END at rendering (T-ER-12, l. 15480) and at V04 (l. 3163–3164).

## 2. Findings

### VF7v-RDR-01 — major — OWNER-RULE (drawing order) — owner rendering (one fix with V01)

**Claim.** Item 110 (b), the owner's rule for this family: a raised way is "RENDERED above what it crosses, with its
shadow" (AMENDMENTS-2026-09-28g l. 629); the base states it as "It is drawn above what it crosses, with its shadow"
(§4.3, l. 6457), and V07's painterly role (V07 l. 3258: "the deck band drawn above everything it crosses") and V09's hit
stack ("top first by §8.2's draw order (a raised part above ground part 0)", V09 l. 3253–3254) read it so. In this
family the raised way crosses over the wall: a wall laid after a road deck passes beneath its deck (§2.7's laws, law 1
(3), l. 2716–2718; *beneath*, l. 3160: "No gate on the deck, which passes over the run"), an aqueduct crosses a wall
over it on an arch (law 1 (2), l. 2707–2709: "the band passing beneath the arch"), and a gate, postern or tower stands
under an aqueduct's arch that clears it (law 1 (5), l. 2724–2725). But the drawing that renders every map puts the deck
beneath them: §8.2's layer-order table draws "raised decks (`raisedWay`)" in slot 14 (l. 14147), "curtain walls" in slot
18 and "towers and gate blocks" in slot 19 (l. 14152–14153); the order is "slot-major across the whole scene: every mark
of slot s … draws before any mark of slot s + 1, in every tile" (§8.1 item 3, l. 13190–13191); and §8.3's census
asserts it ("draw order: the (slot, pass) sequence of every tile's draw calls … non-decreasing in the slot table", l.
14261). V01 §5.1.3's `hatched` order for the neighbourhood and building bands repeats it (V01 l. 3024: decks slot 14; l.
3028–3029: curtain walls 18, towers and gate blocks 19; V01 l. 2976–2977: "its deck slot 14, its shadow … in the pass
before slot 14"), as does base §8.2's `hatched` row (l. 14198: "raised decks in slot 14 with their shadow pass before
it"). The light pass and every picture export (SVG, PNG, the VTT scene image, §11.1) draw from that list. So on every
map whose ring is laid under a viaduct (T110-2 (3)'s c14 fixture), whose wall an aqueduct crosses over, or whose gate or
tower stands under an aqueduct's clearing arch, a builder who follows §8.2 draws the wall, tower or gatehouse — and the
deck's own shadow under it — over the deck that the model, glTF and CityJSON put above it; a builder who follows §4.3
draws the deck above them, and fails §8.3's census if he does it by order. Two units state two outcomes for one case
(R7-01's grading), one of which breaks item 110 (b); the census check fails the build that keeps the owner's rule
(J146, J151: major). No bar catches the first: §8.3's item-110 marks row asserts "every raised deck over the ways it
crosses" (l. 14307), ways only.

**Required change.**
1. §8.2's layer-order table (l. 14147): "| 14 | piers and bridges; raised decks (`raisedWay`), on the vector rung their
   shadows drawn in a derived pass just before this slot over everything below, roofs included | MFCG: piers; a deck
   may stand above the roofs beside it |" → "| 14 | piers and bridges | MFCG: piers |"; and after the row "| 19 | towers
   and gate blocks | MFCG: towers |" insert "| 19a | raised decks (`raisedWay`), on the vector rung their shadows drawn
   in a derived pass just before this slot over everything below, roofs, walls, towers and gate blocks included | new:
   drawn above what it crosses (§4.3; item 110 (b)) — a deck may stand above the roofs beside it, and a wall that runs
   beneath it — under a road deck's span or an aqueduct's arch, or with an aqueduct merged into it — and a gate,
   postern or tower under an aqueduct's arch that clears it draw beneath it (§2.7's laws, law 1 (2), (3), (5)) |".
2. §8.2's slot resolution (l. 14176–14177): "exact pier, bridge-deck and raised-deck entries in slot 14 outranking the
   prefix" → "exact pier and bridge-deck entries in slot 14 and the raised-deck entry in slot 19a outranking the
   prefix".
3. §8.2's presets table, the `hatched` row (l. 14198): "raised decks in slot 14 with their shadow pass before it" →
   "raised decks in slot 19a with their shadow pass before it".
4. END for V01: §5.1.3's table (V01 l. 3024): "| 14 | piers and bridges; raised decks (`raisedWay`), their shadows drawn
   in a pass just before this slot over everything below, roofs included | a deck may stand above the roofs beside it
   |" → "| 14 | piers and bridges | — |", and after "| 19 | towers and gate blocks | — |" insert "| 19a | raised decks
   (`raisedWay`), their shadows drawn in a pass just before this slot over everything below, roofs, walls, towers and
   gate blocks included | drawn above what it crosses (§8.2's slot 19a; item 110 (b)) |"; and §5.1.2 (V01 l.
   2976–2977): "a raised part's piers take slot 11 and its deck slot 14, its shadow by the prism law from the deck's
   height in the pass before slot 14" → "a raised part's piers take slot 11 and its deck slot 19a, its shadow by the
   prism law from the deck's height in the pass before slot 19a".

### VF7-RDR-02 (persisting) — minor — RESTATEMENT — owner V06 (one fix with pipeline)

**Claim.** The fix pass replaced law 1 (8)'s chamber clause by a citation of V04's lay rule (l. 2734–2735: "a span
read `vault` has the chamber V04 §3.5.4 (d) lays"), so a span V04 §3.5.4 (d) (1) finds too small holds none lawfully
(V04 l. 1707–1708). Two restatements of the old clause stand: V06 §3.2, the reconcile's place, "the epoch-side
guarantee … that every `vault` span they read `vault` has its chamber (`collapsed` where V04 §3.5.4 (d) (2) says)"
(V06 l. 1048–1050; assemble-r7v section 8 lists it as V04's open hand-off); and base II.7.6's vaults sentence, "each
span a raised way's record marks `vault` — but one read `open` (§2.7's laws, law 1 (8); …; V04 §3.5.4 (d) (1)) — holds
one arch vault at grade" (l. 22795), the span rule's sentence (l. 3404–3405) without its new "and one whose inset
rectangle V04 §3.5.4 (d) (1) finds too small, reported". Minor: V04's reconcile does the laying and §5.3's law-1 row
and T110-4 cite the law; no bar asserts V06's guarantee in that direction (T-V6-64, V06 l. 4237, asserts arch vault →
span only).

**Required change.** V06 l. 1048–1049: "and that every `vault` span they read `vault` has its chamber (`collapsed` where
V04 §3.5.4 (d) (2) says)," → "and that every `vault` span they read `vault` has the chamber V04 §3.5.4 (d) lays (law 1
(8)),". END for pipeline, II.7.6 (l. 22795): "— but one read `open` (§2.7's laws, law 1 (8); its worked example the
crossing table's *beneath*; V04 §3.5.4 (d) (1)) — holds one arch vault" → "— but one read `open` (§2.7's laws, law 1
(8); its worked example the crossing table's *beneath*) and one whose inset rectangle V04 §3.5.4 (d) (1) finds too
small, reported — holds one arch vault".

### VF7v-RDR-02 — minor — CITATION — owner V01

**Claim.** V01 §3.17.3 (3) (V01 l. 2473) cites a worked example alone: "where §4.3's crossing rule admits it (*Lattice
and costs*; §2.7's way-and-channel table, row a)" — Part H's citation rule (adjudication-r7.md) writes "§2.7's laws, law
n; its worked example …". The same item's next clause already cites law 1 (8). Nothing built changes.

**Required change.** V01 l. 2473: "(*Lattice and costs*; §2.7's way-and-channel table, row a)" → "(*Lattice and
costs*; §2.7's laws, law 1 (1), (8); its worked example the way-and-channel table's row (a))".

### VF7v-RDR-03 — minor — CITATION — owner V09

**Claim.** T-V9-61 (V09 l. 4437) asserts that "every retaining wall, raised way, span, arch vault and deck plot appears
in each format as file f item 447 (a)–(d) state". File f item 447 gives a span's GeoJSON property as "(`use`, `state` —
item 244's …)" (AMENDMENTS-2026-09-28f l. 708), the record's; its design home, §11.1's GeoJSON row, exports "`use` as
§2.7's laws read it (law 1 (8); its worked example *beneath*)" (l. 16715), and *beneath* has every reader of a span's
`use` read it so (l. 3103–3110). A bar written from the cited source compares a `vault` span read `open` on K2 (a
retaining wall's line or a way across its strip) with its record. Minor: whether K2 holds such a span is the fixture's.

**Required change.** V09 l. 4437: "appears in each format as file f item 447 (a)–(d) state" → "appears in each format
as §11.1's rows state (file f item 447; a span's `use` as §2.7's laws read it, law 1 (8); its worked example
*beneath*)".

### VF7v-RDR-04 — minor — FIXTURE — owner V10

**Claim.** T-V10-41 (V10 l. 3156) searches T110-2 (3)'s c14 seed "so that a `vault` span of its S4 viaduct lies under a
run of stage 2's ring with nothing but that run across the span's strip", and after the run's hand `delete` asserts the
span told `vault` "with its arch vault from M6-U's U3 (V04 §3.5.4 (d))". Since law 1 (8) cites V04's lay rule (l.
2734–2735), a span whose inset rectangle falls below `minEdge` holds no arch vault lawfully (V04 l. 1707–1708), and the
support step's slide (l. 2548–2549) bounds a slid span from above only; the search does not exclude one, so the seed it
finds may make the bar fail a correct build. Minor: a case the fixture may not hold.

**Required change.** V10 l. 3156: "with nothing but that run across the span's strip (§2.7's laws, law 1 (8))" → "with
nothing but that run across the span's strip and the span's inset rectangle at least `minEdge` on each side (§2.7's
laws, law 1 (8); V04 §3.5.4 (d) (1))".

### VF7v-RDR-05 — minor — VALID CHOICE (J151) — owner V09

**Claim.** `bend.wall.aqueductArch`'s line takes "its form by the aqueduct's level (§2.7's laws, law 1 (2))" (V09 l.
2103), one line per bend (the crossing table's *Paths and tests*, l. 3330–3332: "one line each"). One aqueduct stroke
across two walls whose levels give different forms — over the outer ring on an arch, merged into an inner one — has no
stated line. Outcomes: (a) one line per wall, each in its form; (b) one line in the first wall's form along the stroke,
the others among the dry run's effects. Each keeps law 1 and every owner rule, passes the check and fails no named test
(T-V9-52, V09 l. 4428, runs each form on its own stroke; T110-2 (1), l. 19297–19305, asserts the key). The same choice as
VF7-RDR-07's, for an aqueduct stroke.

**Required change.** fix-list.md's builders' choices list: "`bend.wall.aqueductArch` for one aqueduct stroke crossing
several walls whose levels give different forms (over one, merged into another): one line per wall in its form, or one
line in the first wall's form with the rest among the dry run's effects".

## 3. Held for round 8 (outside the family; not graded)

* **V04 §5.5's CityJSON row × base §11.1's CityJSON row.** V04 l. 2892 exports "one `Tunnel` object per system … with a
  `TunnelPart` per run or gallery and a `TunnelHollowSpace` per chamber" — an arch vault is a chamber of the `vaults`
  system — while §11.1 (l. 16720) makes "an arch vault a `BridgeRoom`" of its raised way's `Bridge`: two objects, or two
  forms, for one chamber.
* **V04 l. 222–223 and l. 2727–2728 × base §8.2's `raisedWay` program (l. 13550–13553).** V04 leaves "the vault's infill
  wall and door on the ground view" to "the base's drawing"; the base program draws the deck, parapets, piers and "the
  spans' openings as a dashed outline", no infill or door.
* **Base §8.2's layer order (l. 14147–14151) and V01 §5.1.3 (V01 l. 3024–3027)** draw fields (15), trees (16) and boundary
  treatments (17) over raised decks (14), against §4.3's "drawn above what it crosses" (l. 6457); VF7v-RDR-01's slot 19a
  closes this too if written as given.
* **adjudication-r7v's held notes 5–7 persist unchanged**: V09 §4.20.8 (2)'s `spans/<n>` (V09 l. 3258); T-V9-58's fixture
  (V09 l. 4434); and §4.5's and §8.4's casters on a `breached` or `dismantled` run (l. 6885, 14403–14404, 14628–14629) —
  now "each run at its top as §2.7's laws give it", the laws' *wall's top* being "whatever its runs' condition" (l.
  2606–2607), so a gap casts at its section's top unless the readers' drawing (glTF, CityJSON and VTT draw none, l.
  16719–16720, 16877–16879) is read into it.

## 4. Verdict for the lens

Ten of the eleven round-7 findings of this lens are fixed in the live text or closed by a ruling, and VF7-RDR-02 is
fixed where it bit — law 1 (8) now cites V04's lay rule, and T-V4-62, T-V4-63 and T-ER-12 hold a span too small for a
chamber — with two restatements of the replaced clause left at V06 §3.2 and II.7.6 (minor). Every reader the round
named — GeoJSON's span `use`, glTF's end walls and wall tops, CityJSON's `BridgeRoom` and wall objects, §4.5's and
§8.4's casters, V01's crossings and strip, V04's lay and drawing, V09's panels, badge, bend, fate and effect lines, V10's
read and encoder, V11's registry readers and V12's `wall.ungated` and register lines — now cites §2.7's laws and reads
one `use`, top, cap, gap and gate. One major remains, in the drawing: §8.2's slot table (with V01 §5.1.3's copy and
§8.3's census) draws curtain walls, towers and gate blocks over the raised deck that passes over them, against item 110
(b)'s "rendered above what it crosses" and the base's own §4.3 (VF7v-RDR-01). Five minors follow: the persisting V06
and II.7.6 restatements, a V01 citation, T-V9-61's source citation, T-V10-41's seed search, and one valid choice for an
aqueduct stroke's line over several walls. With VF7v-RDR-01 fixed this lens finds no major in the family.
