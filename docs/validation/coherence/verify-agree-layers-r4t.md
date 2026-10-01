# Verify — agreement across the layers and the variant products, round 4 (model, pipeline, rendering, V04, V05, V07)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-layers-r4t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-agree-layers-r4t`, 2026-10-01, cloud checkout)
- P0 brief read whole (incl. ROUND-4 NOTES, NEW OWNER RULES 114–119, ORCHESTRATION NOTES); resume check: no output, no LANDED line — fresh start: done
- P1 inputs: round-3 findings (VAL-R3-01 – 10), adjudication-r4 (R4-01 – R4-16; Part H for model, pipeline, rendering, V04, V05, V07, V06 and V09), assemble-r4 (live sha256 = its "after" column): done
- P2 re-check of every round-3 finding against the live text (and each END line's second end): done — all 10 closed
- P3 round-4 blocks in scope re-read whole for new problems; the repair seats' HAND-OFFS addressed to this lane: done
- P4 matrix-gap hunt and censuses (R4-02's "drawn" sweep, R4-04's phrases, review ids, phone clauses): done
- P5 report, result file, LANDED: done

## 1. Inputs and live text

The live text is assemble-r4's output: `docs/ARCHITECTURE.md` `5f34cceb…`, V04 `6aebc1e1…`, V05 `ef99abd9…`, V07
`a55c4d08…` (and V06 `ef22171a…`, V09 `b49c6014…` for the ends), each equal to assemble-r4.md §1's "after" column. The
round's diff against the pre-assemble commit `96bdae26` was read hunk by hunk in scope:

- **Base** (130 hunks; those of this lane's subjects): §2.6 step 7; §2.7 `RaisedWayRecord.supports`, `RaisedFoot`, the
  support step (3) and (6) (a)–(b); §2.9's *View state*; §3.2 (9); §4.1's S7 row; §4.3 *Lattice and costs* and *The
  slot*; §4.4 S5a and S5c; §4.8; §4.11's carve and frame growth; §4.13's raised-way edge rows; §8.2 (crisis rows, Find's
  ghost pins and gaps); §8.4 (*Toggles are visibility*, lights, the cursor sun); §8.6; §8.8 (tile key, effects); §9.1;
  §9.2's candidate set; §10.2 *Crisis looks* (whole); §11.1's VTT profile; §11.2 (`ExportOpts`, `looks`, `why`,
  `LooksAnswer`, *At a drawn week*); §11.3; §13.2's T110-2, T114 and T122 groups.
- **V04** (29 hunks): §1.2, §1b.1–§1b.3, §2.6's rows, §3.5.0 *At an epoch*, §3.10, UE20, UE27, UE32, UE33, §4.1, §4.3,
  §5.1 (whole, with (6) and (7)), §5.4, §5.6 (1), §6, T-V4-63, T-V4-81, T-V4-82, §9, §13.
- **V05** (22 hunks): §1b, §3.16's landfall table and `members`, §3.23's edge rows, §5.2–§5.4 (the layer drawn), §5.6
  (whole), §6, §7 (T-V5-13, T-V5-14, T-V5-33, T-V5-36), J-V5.14.
- **V07** (7 hunks): W74, §4.5, §5.6 (2)'s table, T-V7-69.

Each was read with the counterpart subsections it cites: V07 §3.4, §3.5a (whole), §3.12 *The hand-off down*, §3.17's
raised-way rows and §5.6 (whole); V04 §3.5.4 (d) and §5.5; V05 §5.5; V06 `EpochScope.raised` and W64; V09 §2.4's
`WorkingLayer`, §2.7, §4.2, row 21, §4.21.10 (7)–(8) and T-V9-83; V10 §2.13's `WhyProvider.explain`; II.7.1 and II.7.3.

## 2. Round-3 findings re-checked

| id | disposition (adjudication-r4 Part H) | live text now | verdict |
|---|---|---|---|
| VAL-R3-01 | FIX per R4-02 (V09); END lines at rendering, V04, V05, model | §8.4 *Toggles are visibility* (l. 13580–13585) states R4-02's rule whole: the working layer drawn whatever its `LayerSpec.visible`, every switch (view bar, **Go there**, `useTool`) view keys only, no event. §2.9 (l. 3394–3396), §9.2's candidate set (l. 14798), §11.2's `ExportOpts.layers` (l. 16215) and §8.8's tile key read "draws". V09 §4.2 (l. 1654–1656), row 21, §4.21.10 (8) and T-V9-83 (g) ("0 events logged, its `LayerSpec.visible` unchanged"); V04 §5.1's lead and (2); V05 §5.6 (3), its edge row and T-V5-36 agree | FIXED, every end |
| VAL-R3-02 | FIX per R4-09 (model); pipeline END | §2.7's support step (3) (l. 2546–2549) excepts the village palisade; (6) (b) (iv) (l. 2608–2609); §4.13's edge row `wall` (l. 8981). V07 §3.5a (4) agrees | FIXED, both ends |
| VAL-R3-03 | FIX per R4-09, amended to one trigger (V04); V06 END | V04 §1b's row (l. 328), the lifecycle row (l. 867), §3.10's edit row (l. 2579) and the epoch bullet (l. 2282–2290): every change to a raised way's `feet`, `supports` or `spans`, whoever makes it. V06 `EpochScope.raised` (l. 465) and W64 read so. T-V4-63 carries the fixture with the frame growth | FIXED, both ends |
| VAL-R3-04 | FIX (rendering) | §11.1's underground band (l. 16118–16120): "an underground building's entrances whose door its own decay level leaves standing (a door past its threshold an open gap, no portal; V04 §5.6 (5))" | FIXED |
| VAL-R3-05 | FIX per R4-12 (V04); V05 and V09 ENDs | V04 §5.1 (6)–(7) and its rows l. 308, 340, 866; T-V4-81 (j). V05 §5.6 (5), its §1b row and T-V5-36 (i). V09 §4.21.10 (7) passes the model the view draws. §11.2 *At a drawn week* names V04's and V05's Find places | FIXED, every end |
| VAL-R3-06 | FIX per R4-04 (rendering) | §8.6 (l. 14105–14108): "A building a disaster look stands over (§10.2 (d)'s units; (f)'s hand-over …)". §8.2's `ruinTone` and `disaster` row read the units | FIXED |
| VAL-R3-07 | MERGED into VPC-R3-03 (per R4-06) | §10.2 (d) (l. 15645–15648) and §8.2's placement sentence (l. 13116–13120): a barrier across a way — a `barricade`, `beast`'s `stakes`, the quarantine's `cordon`. T-ER-27 adds the cases. V07 §5.6 (7) stands | CLOSED |
| VAL-R3-08 | MERGED into VV12-r3-05 (per R4-04); model end by VM-R3T-07 | §10.2 (d)'s `neighbourhoods` bullet (l. 15690–15694) and §2.6 step 7 (l. 2107–2110) carry R4-04's phrases | CLOSED, both ends |
| VAL-R3-09 | FIX per R4-04 (V04) | V04 §5.6 (1) (l. 2901–2909): R4-04 (a)'s units and (b)'s "stands over" | FIXED |
| VAL-R3-10 | MERGED into VPC-R3-04 | V07 §5.6 (2)'s `beyondWalls` and `approachRoads` rows take `campLand`, the division of the camped ground and the armies, and the entries' order | CLOSED |

The hand-offs the round-4 repair seats left for this lane were checked:
- **V04's three.** (1) V04 §4.1, UE20 and UE27 against V09 §4.2: they agree. (2) The frame growth's deck extension against
  V04 §3.5.0's footings: the base does not decide it — VAL-R4-04. (3) V06 `EpochScope.raised` and W64, V05 §5.6 (2)–(5),
  V01's `gapUnits` at a week: present.
- **V07's two.** §11.2's `why` member carries `view?: ViewHandle` (l. 16287–16290); V10 §2.13's `explain` opts carry
  `view?`; V09 §2.7's `WhyCardModel` passes the card's view. Closed.
- **Rendering's to pipeline.** §10.2 (d)'s "its districts' tone" — VAL-R4-08.
- **Pipeline's three.** They are model–pipeline seams of the support step outside this lane's subjects (VM-R4T-01 and
  VPC-R4-01 hold the first).

## 3. Round-4 repairs in scope re-read

These agree (no issue):
- **R4-02 across the layers.** §8.2's ghost pins and Show gaps now key on the working layer, as V04 §5.1 (2)–(3), V05
  §5.6 (2)–(3) and V09 §4.21.10 (8) read it. The cursor-sun floor (§8.4 (d); V05 §5.3 (4), J-V5.14), the lights and
  casters of an undrawn layer (§8.4; V05's edge row and §5.3) and the weather effects over the underground (§8.8; V04
  §5.1) all read "drawn". So do the sky label candidates (§9.2; V05 §5.4), V04's labels (l. 2864), §9.1's undercity
  labels and V04's view budget.
- **R4-09 on the layers.** V04's one reconcile trigger and `Foundations.apply` against §2.7 (6) (b) (iii) ("the pier's
  former ring with it"). V05 §3.16's crossing-station row against §2.7 (3)'s landfall clause. V07 §3.5a (4) against (6)
  (b) (iv) and the edge row `wall`.
- **R4-04, R4-06, R4-12 and R4-13 at the village and below ground.** §10.2 (c)–(h) against V07 §5.6 (1)–(7) (the count's
  second stage is VAF-R4T-01's, another seat's). §8.2 and T-ER-27 against V07 §5.6 (3) and (7). V04 §5.6 (1) and
  T-V4-82 (i) against R4-04 and R4-11. §11.2 *At a drawn week* against V04 §5.1 (7) and V05 §5.6 (5).
- **Censuses.** No `R<n>-nn` or verifier id in V04, V05 or V07; no phone clause in them (item 126 (a2)). The two canon
  conflict ids in V05's design text, and two in the base's §4 that this lane's unit carries, are VAL-R4-09 and VAL-R4-10.

## 4. Issues

0 blocker, 5 major and 5 minor. Three are this lane's seams of defects other round-4 seats raised, each filed as ONE FIX
with its sibling: VV34-r4-01, VV78-r4-01 (with VV78-r4-02) and VRC4T-09.

- **VAL-R4-01** — major — MATRIX-GAP (verdict DISAGREE) — owner **model**.
  - Claim: the type of the view key `workingLayer` differs between units. §2.9 (l. 3392) gives its values as "ground, a
    sky island's `PlatKey`, or an underground depth band". V09 §2.4 types it `{ layer: 'ground' } | { layer: 'sky'; key }
    | { layer: 'underground' }`, "the band is the view key `depthBand` alone (§2.9), never copied here". §2.9 itself
    and V04 §5.1 hold the band in `depthBand`, and V04 §5.1 (2)'s **Go there** sets both keys. The canon ruled this
    (V09-XCONF-1: "ground, a sky island's PlatKey, or the underground (its band the view key depthBand)"), but the base
    never took the text.
  - Since R4-02 the key is also read by the base: §8.4 draws the working layer, and §8.8's tile key holds it. A builder
    of §8.4 and §8.8 reading §2.9 parses a band out of the key that V09 writes as `{ layer: 'underground' }`.
  - Required change: §2.9's entry reads "`workingLayer` (per viewer: the layer the tools act on and the view draws
    whatever its visibility, §8.4 — ground, a sky island's `PlatKey`, or the underground, its band the view key
    `depthBand` alone, never copied into `workingLayer`; its value V09 §2.4's `WorkingLayer`, its switch V09 §4.2)".
- **VAL-R4-02** — major — DISAGREE — owner **V07**.
  - Claim: village tracks cross a raised way by a different rule from the base's. R4-09 made §4.3 *Lattice and costs*
    (l. 5623–5634) the one crossing rule. A standing raised way's support rings, ramps, stairs and feet, and the strips
    under its `vault` spans, are "impassable to every route and growth proposal on ground part 0". Elsewhere the strip is
    crossed only under an `open` span: clear width at least the way's width + `clearWidthM`, the soffit meeting *The
    clearance*, within ± `squareDeg` of square. §4.3 calls this "the one rule S5c's proposals and stage 2's ways keep".
  - V07 §3.5a (3) gives VS4's trackers (growth proposals on ground part 0) a different rule. Only supports are obstacles,
    and "A tracker passes beneath a span, standing, ruined or cleared, freely: no junction, no crossing record, no gate,
    no stop". Nothing stops a tracker at a ramp or stair.
  - V07 (7) registers V04's arch vaults at every village rung, and a `vault` span inside the perimeter holds one. So on a
    village map with a declared or carried-down raised way, a VS4 track can run through an arch vault chamber, over a
    ramp, or at any angle under a span too low for it. The base forbids each of these, and V04's T-V4-62 bars "none over
    a part-0 way".
  - Required change, V07 §3.5a (3):
    - *Supports are obstacles* reads "A support whose `state` is absent or `ruined`, the raised way's ramps and stairs,
      and the under-deck strip of each `vault` span (impassable by §4.3 *Lattice and costs*), each grown by
      `raised.supportClearM`, is an obstacle …", the turn rule unchanged.
    - *Under a span* reads "A tracker crosses the under-deck strip only where §4.3 *Lattice and costs* admits a part-0
      way — under an `open` span whose clear width is at least the way's width + `raisedWays.structure.clearWidthM` and
      whose soffit meets §2.7's *The clearance* for the way's class, within ± `raisedWays.structure.squareDeg` of square
      to the deck, never along the strip. A step that would enter the strip elsewhere turns by the rule above. Where it
      crosses there is no junction, no crossing record, no gate and no stop; a `cleared` span's ground is free ((2))."
    - T-V7-48 adds "0 VS4 ways on a ramp, a stair or a `vault` span's strip or along the strip, each crossing under an
      `open` span within §4.3's bounds".
    - Pipeline's END: §4.3's "the one rule S5c's proposals (§4.4) and stage 2's ways (V01 §3.17.3 (3)) keep" adds "and V07
      §3.5a (3)'s village trackers".
- **VAL-R4-03** — major — DISAGREE — owner **V07**.
  - Claim: a crossing station carried down onto the village palisade gets two outcomes. At the hand-off down "the
    standing fabric survives unchanged" and the palisade is "the innermost standing enceinte" (V07 §3.12). V06 §3.19
    keeps a CITY's raised way through a fall.
  - Where a viaduct or elevated road crossed that ring, §2.7's support step (3) gives it a crossing station: a raised
    gate whose tower carries the deck, and a station whose support is the band's stretch, held while the deck stands.
  - V07 rules the opposite for every raised way over the palisade, declared or carried down:
    - §3.5a (4): "never a gate … a raised way crossing the circuit makes no gate";
    - §3.17's row: "no gate under the deck";
    - T-V7-48, on a fixture "carried down from a CITY": the palisade "has 0 gates at supports".
  - §2.7 (6) (b) (iv), new this round, says the same of a palisade laid later. Nothing states what happens to the
    standing raised gate and its station. One builder keeps them (base (3); "standing fabric"). Another removes the gate
    or fails T-V7-48 on a correct build. Removing the gate would leave the deck on no support.
  - Required change:
    - V07 §3.5a (4) adds: "A raised way carried down (V07 §3.12) whose crossing station stands on the enceinte that
      becomes the palisade keeps that station as standing fabric — its support the band's stretch under the deck, held
      while the deck stands, with its raised gate whose tower carries the deck, or the aqueduct's arch (§2.7's support
      step (3)) — the one gate at a support the palisade carries; the abutting and no-gate rule above reads every other
      support in its band."
    - V07 §3.17's row "a raised way over the palisade" adds that outcome, and its test cell reads T-V7-48 (it cites
      T-V7-52, the no-op pins).
    - T-V7-48's "has 0 gates at supports" reads "has 0 gates at supports but a carried-down crossing station's raised
      gate, kept with its tower carrying the deck", its CITY fixture's viaduct crossing the innermost ring at a raised
      gate.
    - Model's END: §2.7's support step (6) (b) (iv) adds "— a crossing station carried down on the enceinte that becomes
      the palisade standing as (3) holds it (V07 §3.5a (4))". Pipeline's END: the edge row `wall` takes the same clause.
- **VAL-R4-04** — major — DISAGREE — owner **model**.
  - Claim: ONE FIX with VV34-r4-01, this lane's model–V04 seam (V04's own hand-off: "the base's text decides").
  - §2.7 (6) (b) lists "a frame growth's extension of its deck, §3.2 (9)" among the ops that change a raised way, and
    `RaisedFoot` and §3.2 (9) have "the raised way's re-derivation" extend the deck. Support step (2) spaces the stations
    evenly over the whole deck, and (5) keeps only the key of a station that moves up to p ÷ 2. So a growth may move
    every old pier.
  - V04 §3.5.0 *At an epoch* depends on the opposite: "An epoch op removes no obstacle … so the element set it collapses
    is the one a regeneration of the same state collapses (T-V4-65)", with `Foundations.apply` collapse-only. V04 §3.10
    also names the extension among the epoch changes it reconciles.
  - Re-spaced piers leave collapsed elements and pillars under no pier, and T-V4-65 cannot pass. A moved pier can also
    land in a plot that S8 holed round its old ring.
  - Required change: VV34-r4-01's text. §2.7's support step (6) (b) adds that the extension keeps every station of the
    old deck (key, position and ring) and every span between them, with (1)–(5) and the span rule run on the extension
    alone. The `RaisedFoot` comment cites it. T110-2's frame-growth clause and T-V4-65 add the fixture.
- **VAL-R4-05** — major — DISAGREE — owner **V07**.
  - Claim: ONE FIX with VV78-r4-01 (T-V7-69 (e), V07 §4.5) and VV78-r4-02 (V07 §5.6 (3)'s text). This is the same R4-04
    (b) class at the one V07 site neither names: T-V7-69 (c).
  - The bar reads "a disaster ruins whole units of `villageDisasterUnits` … every building of a returned unit drawing the
    ruined look and none outside", with no hand-over. Its fixtures include, from M-SF, a dossier fixture carrying each
    mapped condition (a disaster with its linked `reconstruction` condition, V08 §3.16 (7) (b)).
  - §10.2 (f), §8.2 and V07 §5.6 (3) itself hand each building over in the week a Works other than `decay` begins on it.
    A building under its rebuild is drawn ruined by T-V7-69 (c) and rebuilt by every other unit. That is R4-04's MAJOR
    class, and a correct build fails the bar.
  - Required change: T-V7-69 (c)'s "every building of a returned unit drawing the ruined look and none outside" reads
    "every building the look stands over (§10.2 (f): a building of a returned unit until V06 §3.22 (3)'s
    `crisisLookYields` turns true on it, a preview never handing over) drawing the ruined look, a building of a returned
    unit whose rebuild Works begin in the condition's weeks drawing its Works from that week, and none outside". The
    dossier fixture adds a disaster whose rebuild Works begin on some of an end's buildings.
- **VAL-R4-06** — minor — DISAGREE — owner **pipeline**.
  - Claim: R4-02 (d) has every reader of "the layers the view shows" read "draws", and its sweep missed one site. II.7.3's
    *Order, seed and locality* (l. 21271) still says the underground pseudo-district's "labels drawn only when the layer
    is visible". §9.2's candidate set, the home, admits them while the view draws the layer — visible, or Below the
    working layer — as §9.1 (l. 14750) and V04 (l. 2864) now say. The parenthetical builds no label logic.
  - Required change: II.7.3's "its labels drawn only when the layer is visible" → "its labels candidates only while the
    view draws the layer — visible, or Below the view's working layer (§9.2, §8.4)".
- **VAL-R4-07** — minor — DISAGREE — owner **V04**.
  - Claim: the same sweep missed one V04 edge row. UE33's E7 (l. 2430) says "the layer hidden draws none of the
    underground view's part". V04 §5.1 and §8.4 draw a hidden underground while Below is the working layer, and UE27's E7
    was conformed ("the layer hidden — not drawn, or drawn in a view whose working layer is Below"). UE33's test,
    T-V4-82, has no hidden-layer clause.
  - Required change: UE33's E7 "the layer hidden draws none of the underground view's part" → "the layer not drawn —
    hidden and not the view's working layer (§8.4) — draws none of the underground view's part".
- **VAL-R4-08** — minor — DISAGREE — owner **pipeline**.
  - Claim: ONE FIX with VRC4T-09 (rendering's hand-off). §10.2 (d)'s footprint exception (l. 15649–15650) still names "a
    disaster's ruins and its districts' tone". R4-04 (a) bars "district" alone at the village rungs, where §8.2's
    `ruinTone` lies on the units' plots (V07 §5.6 (3)).
  - Required change: VRC4T-09's text — "a disaster's ruins and its units' tone (§8.2's `ruinTone`)".
- **VAL-R4-09** — minor — NARRATION — owner **V05**.
  - Claim: two canon conflict ids stand in V05's design text: l. 313 "(file f item 251; MC-07: the island arena's own
    ring, no stored position)" and l. 685 "(§2.5, file f item 213; MC-05)". This is against R3-02 and principle (5).
    assemble-r4 §8 lists both. Round 3's census of this lane missed them.
  - Required change: l. 313 → "(file f item 251: the island arena's own ring, no stored position)"; l. 685 → "(§2.5, file
    f item 213)".
- **VAL-R4-10** — minor — NARRATION — owner **pipeline**.
  - Claim: §4's class-floor heading (l. 6783–6784) ends "cite it without values; DXC-06, KXC-02)" — two canon conflict
    ids in design text (assemble-r4 §8).
  - Required change: "… §5.3's class-floor row cite it without values; DXC-06, KXC-02)." → "… §5.3's class-floor row cite
    it without values)."

Not raised:
- V04 §5.5's VTT row names "an underground building's entrances" without the damage exception. V04 §5.6 (5) states it in
  the same volume, and Part H rules no V04 end.
- V04 §3.5.4 (d) (2) collapses an arch vault on a bounding support's `state`, which a crossing station's entry lacks
  (§2.7 (3)). A station's stretch becomes `breached` or `dismantled` only by a landfall that ruins the spans beside it, or
  after both spans have fallen, so the vault collapses by its span's state either way. The outcomes agree.
- V07 §5.6's lead "never drawn, listed or named" against §10.2 (a)'s "drawn, listed, counted or named": the same rule,
  DR44 cited.
- The pipeline's three hand-offs: model–pipeline seams of the support step, outside this lane's subjects.

The exact claims and required changes are in `docs/validation/coherence/results/coherence_verify-agree-layers-r4t.json`.

## 5. Counts

- Round-3 findings: 10 re-checked, 10 closed (7 fixed at their own id with every END line present, 3 by the fix of the id
  they merged into), 0 open.
- Round-4 issues: 10. By severity: 0 blocker, 5 major, 5 minor. By kind: 7 DISAGREE, 1 MATRIX-GAP, 2 NARRATION.
- Owners: V07 3, pipeline 3, model 2, V04 1, V05 1.
- Of the 10, 3 are in-lane seams of other round-4 seats' ids, each filed as ONE FIX: VV34-r4-01, VV78-r4-01 (with
  VV78-r4-02) and VRC4T-09.
- Design files untouched. No doc_checks run; this is a reading seat.
