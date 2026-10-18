# Family verify — round 7w, readers, drawing and exports (raised way × wall)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/famverify-readers-r7w; covered by the
> whole-design retrovalidation (J84).

PROGRESS (lane `coherence/famverify-readers-r7w`, 2026-10-02, the design after assemble-r7w; fresh start, no earlier
CHECKPOINT of this seat)
- [x] R1 read: the brief whole; adjudication-r7.md Part L (normative), the seven corrections and the restated veto list,
  Part A, R7-05, Part H's rendering, V01, V09, V10, V11 and V12 headings; adjudication-r7v.md and adjudication-r7w.md
  whole (the class ruling, Part H by unit, the builders' choices, the held notes); assemble-r7w.md's outcome, routing
  and section 8; the live §2.7 support step (6) — the laws (l. 2579–2891) and the worked examples (l. 2893–3383) — and
  the span rule (l. 3388–3408); famverify-readers-r7v.md
- [x] R2 re-check: VF7v-RDR-01 – -05 and VF7-RDR-02 against the live text, and the round-7 fixes of this lens (section 1)
- [x] R3 attack through the lens: §4.5's casters (l. 6887–6890); §8.1's draw order, §8.2's `raisedWay` program (l.
  13557–13560), state rows (l. 14070–14074, 14083), layer-order table (l. 14136–14166), slot resolution (l.
  14175–14196) and presets (l. 14205–14207), §8.3's census (l. 14316), §8.4's surface layer, slab list and casters (l.
  14408–14421, 14634–14642); §9's obstacles, labels and legend (l. 15578–15581, 15748–15751, 15838–15850); §11.1's
  GeoJSON, SVG, PNG, VTT, 3-D and CityJSON rows (l. 16724–16730) and the VTT profile (l. 16882–16920); §8.11's T-ER-12
  (l. 15489); V01 §1.2's hook row (l. 201), §3.17.2 – §3.17.5 (l. 2439–2527), §5.1.1 – §5.1.3 (l. 2896–3045) and
  T-V1-51; V04 §1b's rows (l. 161, 299, 328), §3.5.4 (d) (l. 1690–1718), §5.1 – §5.5 (l. 2707–2900), T-V4-62, -63;
  V09 §2.7's `decidedBy` (l. 648), §4.9's family rows (l. 2033, 2093, 2100–2107, 2148), §4.20.2 (l. 3002–3077),
  §4.20.6 – §4.20.8 (l. 3186–3266), §5.5, T-V9-52, -58, -61; V10's enceinte and raised-way read rows (l. 1681, 1686),
  the `span` encoder (l. 2810), C7, T-V10-40 – -42; V11 W50 (l. 208), row 80 (l. 1006), row 863's pattern, §3.1's
  *Readers* (l. 898–912), §3.24.2 (l. 3903–3990), T-V11-1; V12's reading rules, `wall.*` and `raised.*` metrics (l.
  1128–1129, 1168, 1194–1195), register lines (l. 2177–2189), T-V12-38 — each read against laws 1–4, J144, J147 – J149
  and item 110 (b), (f), 114
- [x] R4 graded by J141 under J146 and J151; nothing reported that J150 hands to round 8

Grading used (the brief's, J146 with J151): MAJOR only where the laws or the design text written from them give a case
no lawful outcome, an outcome breaking an owner rule or a law-1 invariant, leave a law-1 invariant checked by no bar, or
make a check or a named test fail a correct build; several outcomes all lawful is a minor VALID CHOICE; a citation, a
restatement the laws already decide, a list omitting an id its rule names, or a case a fixture may not hold is a minor.
Line numbers are the live files' at HEAD `1965be7` (base `docs/ARCHITECTURE.md` unless a volume is named).

## 1. The round-7v family findings of this lens, re-checked against the live text

| id (owner, grade) | what it asked | live text now | verdict |
|---|---|---|---|
| VF7v-RDR-01 (rendering with V01, major) | raised decks drawn above the walls, towers and gate blocks they cross: §8.2's slot 19a, the slot resolution, the `hatched` row; V01 §5.1.2 – §5.1.3 citing it | §8.2 l. 14154 ("\| 14 \| piers and bridges \| MFCG: piers \|"), l. 14161 (row 19a: "raised decks (`raisedWay`) … over everything below, roofs, walls, towers and gate blocks included \| new: drawn above what it crosses (§4.3; item 110 (b)) — … a wall running beneath it … and a gate, postern or tower under an aqueduct's arch that clears it draw beneath it (§2.7's laws, law 1 (2), (3), (5)); every other list that places raised decks cites this slot"), l. 14185 ("the raised-deck entry in slot 19a outranking the prefix"), l. 14207 ("raised decks in slot 19a with their shadow pass before it"), §8.3 l. 14316 ("every raised deck over the ways, walls, towers and gate blocks it crosses (0 junction marks where they cross; its slot 19a)"); V01 l. 2906, 2978–2979, 3026, 3032 ("\| 19a \| … \| drawn above what it crosses, as §8.2's slot 19a, this order's one home, places it (item 110 (b)) \|"). The light pass (slots 1–20, l. 14173–14174), the SVG group `layer.ground.raised` above ground part 0 and the per-layer PNG (§11.1) agree; V09's hit stack ("top first by §8.2's draw order", V09 l. 3253) now puts the deck above the wall beneath it | **fixed** |
| VF7-RDR-02 (V06 with pipeline, minor) | V06 §3.2 and II.7.6 cite law 1 (8)'s chamber as V04 lays it | V06 l. 1041 ("the chamber V04 §3.5.4 (d) (1) lays in each standing `vault` span that §2.7's laws read `vault`"), l. 1050 ("has the chamber V04 §3.5.4 (d) lays (law 1 (8))"); base l. 22842 ("— but one read `open` (§2.7's laws, law 1 (8); …) and one whose inset rectangle V04 §3.5.4 (d) (1) finds too small, reported — holds one arch vault") | **fixed** |
| VF7v-RDR-02 (V01, minor) | V01 §3.17.3 (3) cites the laws before the way-and-channel table | V01 l. 2473–2475 ("(*Lattice and costs*; §2.7's laws, law 1 (1), (8); its worked example the way-and-channel table's row (a))") | **fixed** |
| VF7v-RDR-03 (V09, minor) | T-V9-61 exports a span's `use` as §11.1's rows state | V09 l. 4437 ("appears in each format as §11.1's rows state (file f item 447; a span's `use` as §2.7's laws read it, law 1 (8); its worked example *beneath*)") | **fixed** |
| VF7v-RDR-04 (V10, minor) | T-V10-41's seed excludes a span too small for a chamber | V10 l. 3156 ("with nothing but that run across the span's strip and the span's inset rectangle at least `minEdge` on each side (§2.7's laws, law 1 (8); V04 §3.5.4 (d) (1))") | **fixed** |
| VF7v-RDR-05 (V09, minor, valid choice) | `bend.wall.aqueductArch` for one stroke over walls whose levels give different forms | adjudication-r7w.md's *Builders' choices for fix-list.md* (l. 736–738); no design text written for it, as ruled | **closed by a ruling** (VALID CHOICE LISTED) |

The round-7 fixes of this lens re-checked in famverify-readers-r7v (VF7-RDR-01, -03 – -11) still stand in the live text:
V12 l. 1129 and 1168 and base §13.5's row (VF7-RDR-01; units this pass did not touch); §11.1's CityJSON row l. 16729
(VF7-RDR-03); §4.5 l. 6888 (VF7-RDR-04); §5.4 l. 10006 (VF7-RDR-05); V09 l. 2033, 2102 – 2106, 2148 (VF7-RDR-06, -08,
-10); V01 l. 201, 978, 1423 – 1425, 2481 – 2486 (VF7-RDR-09); V12 l. 2178 (VF7-RDR-11); VF7-RDR-07 stays a listed choice
(adjudication-r7v.md l. 714–717). The r7v held note that fields, trees and boundary treatments (slots 15–17) drew over
raised decks is closed by slot 19a, as adjudication-r7w.md's held note 6 expected.

## 2. Findings

No major. Three minors.

### VF7w-RDR-01 — minor — RESTATEMENT — owner V09

**Claim.** V09 §2.7's why card, the `decidedBy` row (V09 l. 648), words the span line by a narrower reading of law 1
(8): "a span walled up by the rules (one read `vault`: none under a wall, V09 §4.20.6 (2)) → "An arch of {way}, walled
up as a vault"". Law 1 (8) reads a `vault` span `open` while *anything* lies across its strip — a street, a channel, a
square, a marsh, another raised way's support — not a wall alone (base l. 2731–2735; the term *anything across a
strip*, l. 2644–2652), and *beneath* has every reader cite that reading "and never restating its cases" (l.
3103–3105). V09's own §4.20.6 (2), which the cell cites, reads it so for "the why card" (V09 l. 3206–3212), and V10's
read row (V10 l. 1686) likewise. A builder who takes the parenthesis as the test labels a `vault` span with a street
laid across it "walled up as a vault". Minor: the cell cites §4.20.6 (2), which governs, and nothing built in the model
changes (a restatement the laws already decide).

**Required change.** V09 l. 648: "a span walled up by the rules (one read `vault`: none under a wall, V09 §4.20.6 (2))"
→ "a span walled up by the rules (one §2.7's laws read `vault`, law 1 (8); its worked example *beneath*; V09 §4.20.6
(2))".

### VF7w-RDR-02 — minor — REGISTRY READERS — owner V11

**Claim.** V11 §3.1's *Readers* makes row 80's reader cell "the one list of each table's readers", a read "recorded under
the registered StageId of the stage function that reads", an epoch phase named by its own id (V11 l. 898–912, J-V11.109),
and T-V11-1 (b) fails "0 unlisted stage readers" over the golden fixtures "with three `'history'` epochs" (V11 l. 4983).
Row 80 (V11 l. 1006) lists the readers of `structure.stripMarginM` and `structure.span.deckDepthCm` through §2.7's laws
as "S3, S5a and S7 (a wall meeting a raised way's under-deck strip, and its fixed-place zone, …, and each span's soffit
… by §2.7's laws, law 1 (2), (4)–(7) …)" and "VS3 (the palisade …)", and W50 (V11 l. 208) as "§2.7's laws at S3, S5a,
S7 and VS3 (law 1 (4)–(6))". Two writers of wall lines that meet raised ways by the same laws are missing:
* **EVO_FORT.** V06 §3.7.6 (5) has "Every trace this section makes — a circuit, a shorter ring, a re-anchored or repaired
  stretch, the waterfront's quay wall — and (3)'s harbour-mouth chain meet the standing raised ways by §2.7's laws" (V06
  l. 1606–1608); the shorter ring's line is traced by "the registered `EnceinteStrategy` … with the cost field" in the
  fortification phase (V06 l. 1526), whose impassables are §4.4 S5a *Trace* (2)'s one list — "a standing raised way's
  ramps, stairs and feet widened by the wall strips' width there, its strip, widened each side by the band's half there
  … the strip of each span whose soffit does not clear the wall's top" (base l. 6602), which *beneath* says "V06 §3.7.4
  (2)'s cost field taking" (base l. 3080). The strip and ends are widened by `stripMarginM` (base l. 2614–2618) and a
  soffit is read from `deckDepthCm` (base l. 2296). Row 14 already records that same trace's barrier-closure reads under
  EVO_FORT ("EVO_GROWTH and EVO_FORT (a new circuit and a ring's contraction under barrier closure, V06 §3.7)", V11 l.
  939), and row 15 the chain's (l. 940).
* **S1.** §5.2's F-REDERIVE detects "a wall run that S1's water operator or a carve would re-trace … with no lawful
  crossing of a standing raised way, its water gate with no point within the run that law 1 (6) admits" (base l. 9872),
  by hand and for an epoch's `shiftCourse`, avulsion or `digCanal` (§7.3 (b) 3; §2.7's laws, law 2 (c)) — a read of the
  strip and the fixed-place zone, both widened by the margin.
So a correct build of V06 §3.7's traces or of the water operator's re-trace records (EVO_FORT, `raisedWays`) or (S1,
`raisedWays`), which row 80's compiled `stageReaders` lack. Minor: a list omitting an id its rule names; T-V11-1 (b)
fails a correct build only on a golden history epoch that lays a fortification trace or chain, or re-traces a run, beside
a standing raised way, and a builder reading the strip from S8's stored hole (§4.6) records no read — a case the fixture
may not hold.

**Required change.** V11 row 80 (V11 l. 1006), its readers cell: after "by §2.7's laws, law 1 (2), (4)–(7), V07 §3.5a
(4))," insert " EVO_FORT (V06 §3.7's circuits, shorter rings, re-anchored and repaired stretches, quay walls and
harbour-mouth chains meeting a raised way's under-deck strip, ends and fixed-place zone at `structure.stripMarginM`, and
each span's soffit by `structure.span.deckDepthCm`, by §2.7's laws, law 1 (2), (4)–(7); V06 §3.7.6 (5)), S1 (a wall run
S1's water operator re-traces beside a standing raised way, read against its strip and fixed-place zone at
`structure.stripMarginM` by §2.7's laws, law 1 (4)–(6); §7.3 (b) 3, §5.2's F-REDERIVE),"; and W50 (V11 l. 208): "§2.7's
laws at S3, S5a, S7 and VS3 (law 1 (4)–(6); its worked example the crossing table)" → "§2.7's laws at S3, S5a, S7, VS3,
EVO_FORT and S1 (law 1 (4)–(6); its worked example the crossing table)".

### VF7w-RDR-03 — minor — CLASS (test and fixture) — owner scope

**Claim.** The class ruling written at T110-2's lead binds "every clause of T110-1, T110-2 and T110-4, and every volume
bar that takes one of them or cites §2.7's laws" to assert "the outcome those laws give its fixture … where a clause's
words and that outcome differ, the bar asserting the outcome" (base l. 19256–19263). §8.11's T-ER-12 — the exports'
bar, a base bar, so outside "every volume bar" — takes T110-2 (4)'s and (3)'s fixtures and cites §2.7's laws (base l.
15489): "T110-2 (4)'s hand `drawWall` across its standing aqueduct with a `vault` span in its line, exported in every
format: that span `open` in GeoJSON's `span` feature, closed by no end walls in glTF and no `BridgeRoom` in CityJSON …,
and after the hand undo the span `vault`, closed by its end walls and, from M6-U, its arch vault a `BridgeRoom`". The
clause names a place and a chamber its fixture's stated geometry does not fix: where the stroke's channel there runs
above the wall's top and that span does not clear it, law 1 (2) with law 3 moves the crossing to another span (T110-2
(4)'s own C1 clause, base l. 19409–19413), leaving that span `vault`; and a span too small for a chamber holds none (V04
§3.5.4 (d) (1); law 1 (8)), so no `BridgeRoom` follows the undo — the members VF7v-RDR-04 and the class's C1 fixed in
other bars. T110-2 (4)'s clause asserts the laws' outcome there by the class rule; T-ER-12, reading the same fixture, is
the one member the class sweep did not read (adjudication-r7w.md's sweep list, l. 133–157). Minor: a case the fixture
may not hold.

**Required change.** §13.2, T110-2's lead (base l. 19256–19257): "every clause of T110-1, T110-2 and T110-4, and every
volume bar that takes one of them or cites §2.7's laws, asserting the outcome those laws give its fixture" → "every
clause of T110-1, T110-2 and T110-4, and every bar of the base or a volume that takes one of them or cites §2.7's laws
(§8.11's T-ER-12 among them), asserting the outcome those laws give its fixture".

## 3. Held for round 8 (outside the family; not graded)

* **V04 §5.5's CityJSON row × base §11.1's CityJSON row** (persisting; adjudication-r7w.md held note 4): V04 l. 2892
  exports an arch vault as a `TunnelHollowSpace` of the `vaults` system's `Tunnel`, base l. 16729 as a `BridgeRoom` of
  its raised way's `Bridge` — two objects, or two forms, for one chamber.
* **V04 l. 222–223 and l. 2727–2728 × base §8.2's `raisedWay` program (l. 13557–13560)** (persisting; held note 5): V04
  leaves the vault's infill wall and door on the ground view to the base, whose program draws neither.
* **adjudication-r7v.md's held notes 5–7 persist** (held note 7 of adjudication-r7w.md): V09 §4.20.8 (2)'s path
  `spans/<n>` (V09 l. 3258) and §11.2's hit `sub` path `'spans/<ordinal>'` (base l. 17108) against §7.1's binding
  `spans/<a>-<b>`; T-V9-58's fixture (V09 l. 4434); §4.5's and §8.4's casters on a `breached` or `dismantled` run (base
  l. 6888, 14412–14413, 14637–14638).
* **Base §8.2's slot resolution × slot 19a's shadow pass** (new): a sheet is refused "when one `derived` kind is placed
  in two slots of a band" (l. 14182–14183); slot 10 holds `derived: 'shadow'` "over the casters" (l. 14149), raised ways
  among §8.4's casters (l. 14640–14641), and slot 19a draws the decks' "shadows … in a derived pass just before this slot"
  (l. 14161) with no `derived` kind named for it — as slot 14 did before; a raised way's drawing, no wall meeting.
* **Base §8.2's `OrderSlot.slot: number` (l. 13314) × the lettered rows 8b, 9b, 13b, 15b, 19a, 19b** (new): no numeric
  form of a lettered slot is stated, and 19a is the first `a` beside a `b` (19a before 19b is assumed by the table's
  order alone).

## 4. Verdict for the lens

Every finding of the round-7v readers check is fixed in the live text or closed by a ruling. The one major — the draw
order that put curtain walls, towers and gate blocks over the raised deck passing over them — is fixed at its one home,
§8.2's slot 19a, with the slot resolution, the `hatched` row and §8.3's census following it and V01's neighbourhood list
citing it, so the map, the light pass, the SVG and PNG exports, the VTT image and V09's hit stack all put the deck above
the wall, tower or gate beneath it, as item 110 (b) asks; V06 §3.2, II.7.6, V01 §3.17.3 (3), T-V9-61 and T-V10-41 now
cite law 1 (8) and V04's lay rule. Attacked through every reader of the lens — §4.5's and §8.4's casters and surface
layer, §8's slots, programs and state rows, §9's furniture, §11.1's GeoJSON, glTF, CityJSON, SVG, PNG and VTT, V01's
strip, crossings and hooks, V04's vaults and foundations, V09's panels, badge, bend, fate, effect and why lines, V10's read
rows and encoder, V11's registry and settings rows and V12's metrics — each reads the one `use`, top, cap, gap and gate
§2.7's laws give, and no reader gives a case no lawful outcome, breaks an owner rule or a law-1 invariant, or makes a check
fail a correct build. Three minors remain: V09's `decidedBy` cell restating law 1 (8) as "none under a wall", row 80's
and W50's reader lists omitting EVO_FORT and S1 among the readers of the strip margin and soffit through the laws, and
T-ER-12 lying outside the class rule's reach. This lens finds no major in the family.
