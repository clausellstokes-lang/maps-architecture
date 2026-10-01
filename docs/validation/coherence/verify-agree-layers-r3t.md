# Verify — agreement across the layers and the variant products, round 3 (model, pipeline, rendering, V04, V05, V07)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-agree-layers-r3t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-agree-layers-r3t`, 2026-10-01, cloud checkout)
- P0 brief read whole (incl. ROUND-3 NOTES, NEW OWNER RULES 114–119, ORCHESTRATION NOTES); resume check: no output, no LANDED line — fresh start: done
- P1 inputs: round-2 findings (VAL-R2-01 – 09), adjudication-r3 (R3-01 – R3-03, R3-10, R3-14, R3-21, R3-23, R3-24; Part H for model, pipeline, determinism, rendering, V04, V05, V07), assemble-r3 (live sha256 = its "after" column): done
- P2 re-check of every round-2 finding against the live text (and each END line's second end): done — all 9 closed (VAL-R2-01, -02, -04 fixed; -03, -05, -06, -07, -08, -09 closed by their merged ids' fixes, both ends present)
- P3 round-3 hunks in scope (base layer subsections, V04, V05, V07) re-read whole for new problems: done
- P4 matrix-gap hunt and censuses: done
- P5 report, result file, LANDED: done

## 1. Inputs and live text

The live text is assemble-r3's output. `docs/ARCHITECTURE.md` is `593c657d…`, V04 `0e3bcacd…`, V05 `cc1dfa61…` and V07 `285e2f6f…`, each equal to assemble-r3.md §1's "after" column. The round's diff against the pre-assemble commit `920d280` was read hunk by hunk in scope:

- **V04**: 10 blocks — §1b's hook row and `belowKind` row, §3.2 N2, U-NET's ladder row, UE33, UC19, UC21, §5.1, §5.6 (lead, (1)–(3), (6)), T-V4-2, T-V4-80, T-V4-82, the U5 row, J-V4.114, J-V4.129, J-V4.130 and the title block.
- **V05**: 3 blocks — the reading guide, §1.2's hook row, §2.7 (d) feet and §12's record.
- **V07**: 8 blocks — W80, the §1b trace, VS1, §3.2 (2)'s river, §3.12's desertion, §3.17's Find row, §5.5, T-V7-16, T-V7-65, J-V7.2 and J-V7.110.
- **The base's hunks in this lane's subjects**:
  - model: §2.6 step 7 and §2.7's raised-way support step (3) and (6) with `RaisedFoot`.
  - pipeline: §4.2 S1 mining, §4.3 feet, §4.4 S5a, §4.6, §4.8 gates, §10.2 *Crisis looks* (whole) and II.7.2.
  - rendering: §8.2 crisis and Find rows, §8.4 (i), §8.6, §8.8's effects layer and Auto, T-ER-25 – T-ER-29, §11.1's VTT profile, §11.2 (`ExportOpts`, Find's listing at a drawn week) and §11.3's view state.

Every subsection was read whole, together with the shared subsections of the counterpart units that these hunks cite:

- V04: §3.5.4 (d), §5.1 *Find on Below* and §5.5.
- V05: §3.16 and §5.6.
- V07: §3.5a, §5.6 (whole) and §5.5.
- V06: §3.7.6 (5), `EpochScope` and W64.
- V09: §4.2 and §4.21.10.
- Item 120 of file g.

## 2. Round-2 findings re-checked

| id | disposition (adjudication-r3 Part H) | live text now | verdict |
|---|---|---|---|
| VAL-R2-01 | FIX per R3-23 (d); V04 END | §8.8 *The weather effects layer* (l. 14233–14236): the spell draws nothing while the underground layer is drawn in any of its three modes, §8.4 (i)'s terms off, the effects returning when it is hidden. §8.4 (i) (l. 13720) says the same in one clause. T-ER-29 adds the three modes with "nothing drawn, the underground tiles and light byte-identical". V04 §5.1 (l. 2696–2697) cites §8.8 | FIXED, both ends |
| VAL-R2-02 | FIX per R3-21 (d) | §11.3 *View state* (l. 16508–16510) lists `depthBand` "(the underground's drawn band, V04 §5.1)" among the keys that never cross the bridge | FIXED |
| VAL-R2-03 | MERGED into VV34-r2-16 | §6.3 *Plan damage* (l. 9862–9865) keys "a `cryptVault` cell by its room's address and its grid node, the one `cryptVault` of a crypt whose ring holds no cell centre by its room's address (V04 §5.6 (2))". V04 §5.6 (2)'s row fixes the node (VV34-r2-03): the lowest-leftmost corner in whole pitches from the OBB's centre node | CLOSED, both ends |
| VAL-R2-04 | FIX | V05 l. 11 "items below 200 the owner's"; l. 198 "file g's items …"; l. 3016 "file g's items in `docs/AMENDMENTS-2026-09-28g.md`" | FIXED |
| VAL-R2-05 | MERGED into VV78-r2-04 | V07 §5.5 "saved with the other view keys in the document's `view` section and in view pins (§2.9) — never in its canonical form, a digest, its hash or the log"; V07 §3.17's Find row "in no digest — saved with the other view keys (§2.9) and in view pins" | CLOSED |
| VAL-R2-06 | MERGED into VV78-r2-05 (per R3-14 (4)–(5)) | §10.2 (c): round(s × n) clamped to [1, n] at every rung. (d): the village places "read on the village's records as V07 §5.6 (2) states". (f): "at VILLAGE and above, a line … — none at THORP and HAMLET". (h): "and no siege line at THORP and HAMLET". V07 §5.6 (1) agrees | CLOSED, both ends |
| VAL-R2-07 | MERGED into VRC2T-06 | §11.1: in the underground band, "every outer wall run its own decay level fells (V04 §5.6 (5)) — a `cellarWall` run keeping its segment"; per storey, "`cellarWall` and `cryptWall` runs keeping their segments (V04 §5.6 (2))", the walls at the own level, never `lookLevel` | CLOSED (its `portals` half is new: VAL-R3-04) |
| VAL-R2-08 | MERGED into VPC-R2-08 | II.7.2 (l. 20888–20891): "a bank whose stretch of the boundary is empty or lies wholly on water and that holds no candidate drains by gutter and pit …, as does one whose every stretch cell's path to a field outfall enters a water face first". Agrees with V04 §3.2 N2 (l. 986–996), UC19 and T-V4-80 (j) as rewritten | CLOSED, both ends |
| VAL-R2-09 | MERGED into VV78-r2-03 (per R3-22 (d)) | V07 §1b's trace "the dossier's present week — its latest stamped tick (V08 §3.16 (4); item 125 (b)) → §7.7's DR42 → W80"; W80's dossier column; T-V7-65 "a dossier village opens on its present week …". Agrees with DR42 (l. 11979) | CLOSED |

The hand-offs the round-3 seats left for this lane were checked:
- pipeline's "V04 §3.2 N2 … agree with II.7.2": they agree.
- V07's (1), that V04's `underFindPlaces` row names view pins only: no contradiction with §2.9.
- V04's two hand-offs: they lie outside this lane (§16's M6-U row is VV34-r3-04's).

## 3. Round-3 repairs in scope re-read

These agree (no issue):
- **Item 123 below ground.** §2.6 step 7, §6.3, §8.6 and §11.1 agree with V04 §5.6 on the comparison "above 0 and at least t", the per-element `decayPeak`, the five kinds and their keys, the look over a storey below 0 (walls, portals and lights at the own level, the look in the image only), the per-band line of sight and the landing at the later of U5 and V03's P4.
- **Item 122 at the village rungs.** §10.2 (c)–(h) agree with V07 §5.6 (1)–(7) on the share count, the siege line, the main approach road, `affectedQuarter`, the reference point (V07 (7)'s nearest-to-perimeter rule governs there by (d)'s delegation), framing and the hand-over by `crisisLookYields`.
- **Item 124 over the underground** (§8.8, §8.4 (i), V04 §5.1).
- **Item 125's retirements in V07**: the week, the latitude (DR29, else 50), the course-first river and the drawn partner bearing (§7.7 layer 2).
- **The other round-3 changes**: S1's mining flag before the cavern row (V04 l. 423, 1595); raised-way feet (§2.7 `RaisedWayRecord.feet`, §4.3, §4.6; V05 §2.7 (d)); `ExportOpts.vtt.scene { depthBand }` against V04 §5.5; the per-viewer `depthBand` against V04 §1b.3 and V09.
- **Censuses**: no review id in V04, V05 or V07 (R3-02), and no phone clause in them (item 126 (a2)).

New problems found by the re-read, and shared subjects the matrix missed, are listed in §4.

## 4. Issues

1 blocker, 6 major and 3 minor. Three of them are this lane's seams of defects other round-3 seats raised (VV12-r3-02, VPC-R3-03, VPC-R3-04), each filed as ONE FIX with its sibling.

- **VAL-R3-01** — blocker — DISAGREE — owner **V09**.
  - Claim: Find's **Go there** now writes the edit log. Round 3 made V09 §4.2's working-layer switch write `LayerSpec.visible` by `setLayer`. Before, it read "(view state only)"; V09 row 21 now reads "(by `setLayer`, §8.4)". This follows the layers-shown ruling: `LayerSpec` is document style state and a toggle is a logged `setLayer`.
  - Go there runs that switch. V09 §4.21.10 (8) sets the working layer to Below or Sky, with "a hidden sky layer visible". V05 §5.6 (3) says "Go there turns its visibility on, as switching the working layer does".
  - Below is hidden by default, so the common path sends a logged, undoable `setLayer`. That contradicts the owner rule, item 120 (a): "Find never changes the model, the document, its hash or the edit log". It also contradicts the base's Find tool, §9.5 (l. 14951–14954): "It sends no event … Go there sets the working layer and band — view changes". And V04 §5.1 (2) calls Go there "a view key, never an edit".
  - Required change: Go there sets view keys only. On a hidden target layer it leaves the layer hidden and offers that layer's own toggle, which the user sends. V09 §4.2 excepts Go there from the visibility write. V05 §5.6 (3) follows (V05's END). T-V9-83 adds a check that Go there logs 0 events.
- **VAL-R3-02** — major — DISAGREE — owner **model**.
  - Claim: a raised way crossing a village palisade gets two builds. §2.7's support step (3) gives every course across an enceinte's trace a crossing station whose wall carries the deck: a raised gate, or an aqueduct's arch. The other piers slide out of the wall strip, and (6), new this round, re-sites the stations when a trace is laid across.
  - V07 §3.5a (4) (J-V7.83; T-V7-52) rules the reverse. The palisade (an `Enceinte`) abuts each standing support, which is never moved and never a gate, and "a raised way crossing the circuit makes no gate".
  - Required change: §2.7 (3) and (6) except a village palisade, citing V07 §3.5a (4). The pipeline's edge row "wall" (l. 8886) follows (END).
- **VAL-R3-03** — major — MATRIX-GAP — owner **V04**.
  - Claim: §2.7's support step (6) re-sites a standing raised way's stations and re-rules its spans in the commit of a trace or moat laid across it. That covers an epoch's circuit or a hand `drawWall`, and a frame growth also extends a deck.
  - V04's arch vaults are keyed by pier keys and laid between the piers. They are reconciled only at T2, at "a ground edit that adds, removes or re-shapes a raised way" (l. 328, 867, 2572), and over `EpochScope.raised`. That V06 field lists no such way, so vaults stand under spans that no longer exist. This is a hook with one end.
  - Required change: V04's three triggers add station re-siting and deck extension. V06's `EpochScope.raised` and W64 follow (END). T-V4-63 gains the fixture.
- **VAL-R3-04** — major — DISAGREE — owner **rendering**.
  - Claim: the `portals` of §11.1's underground-band scene still include "an underground building's entrances" with no damage exception. V04 §5.6 (5) and T-V4-82 (e) put no portal at a door past its threshold (an open gap), as §11.1's per-storey clause also does.
  - Required change: §11.1 says "whose door its own decay level leaves standing (… V04 §5.6 (5))".
- **VAL-R3-05** — major — MATRIX-GAP — owner **V04**.
  - Claim: at a drawn week whose frame is not the head, the set never says which model `underFindPlaces(doc, ids)` reads, the head or the drawn frame. That decides the glow shapes, band counts, ghost pins' bands and Go there's band. V05 §5.6's island anchors have the same gap. This is V04's end of the class of VV12-r3-03 and VRC3T-01; R3-24 named V01, V09 and V10 only.
  - Required change: V04 §5.1 reads the model the view draws, and its rows re-read at each `week` change. V05 §5.6 and V09 §4.21.10 (7) follow (ENDs).
- **VAL-R3-06** — major — DISAGREE — owner **rendering**.
  - Claim: ONE FIX with VV12-r3-02. At the village rungs a disaster ruins V07 §5.6 (3)'s units: its ends, or in an end-less thorp its toft groups. §8.2's `ruinTone` washes "the district's faces", and §8.6 (l. 13985) damages every "building of a district a disaster look ruins", which at a village is the whole village.
  - Required change: VV12-r3-02's text, plus §8.6 reading "A building on a unit a disaster look ruins (… V07 §5.6 (3) … `villageUnitPlots`)".
- **VAL-R3-07** — major — DISAGREE — owner **pipeline**.
  - Claim: ONE FIX with VPC-R3-03. V07 §5.6 (7) puts "stake barricades at its way crossings", where §10.2 (d) and §8.2 admit only a `barricade` on a carriageway.
  - Required change: VPC-R3-03's text.
- **VAL-R3-08** — minor — DISAGREE — owner **pipeline**.
  - Claim: §10.2 (d)'s `neighbourhoods` bullet says "at THORP, HAMLET and VILLAGE V07's ends", and §2.6 step 7 (model) says "a building of a district a disaster look ruins". V07's units also include an end-less thorp's toft groups. (d)'s lead already sends a builder to V07 §5.6 (2), so nothing built changes.
  - Required change: the bullet names V07 §5.6 (3)'s units and `villageUnitPlots`; model's END at §2.6 step 7.
- **VAL-R3-09** — minor — DISAGREE — owner **V04**.
  - Claim: V04 §5.6 (1) (l. 2888) says "at the village rungs V07's ends". It should name V07 §5.6 (3)'s units: its ends or toft groups, all of part 0's plots. The conclusion holds either way.
- **VAL-R3-10** — minor — DISAGREE — owner **V07**.
  - Claim: ONE FIX with VPC-R3-04. V07 §5.6 (2)'s `beyondWalls` and `approachRoads` rows name no `campLand` and no division of the camped ground or the armies.

Not raised:
- V05 §5.6's lead "outside the document, its hash and the log". It agrees with §1's item row (l. 259), J-A120.01 and item 120's own HOMES wording. Unlike V07's former "saved only in view pins", it denies no save.
- The "(R2-36)"-style and §16 landing items, which lie outside this lane.

The exact claims and required changes are in `docs/validation/coherence/results/coherence_verify-agree-layers-r3t.json`.

## 5. Counts

- Round-2 findings: 9 re-checked, 9 closed (3 fixed at their own id, 6 by the fix of the id they merged into), 0 open.
- Round-3 issues: 10. By severity: 1 blocker, 6 major, 3 minor. By kind: 8 DISAGREE, 2 MATRIX-GAP.
- Owners: V04 3, rendering 2, pipeline 2, model 1, V07 1, V09 1.
- Of the 10, 3 are in-lane seams of other seats' round-3 ids, each filed as ONE FIX: VV12-r3-02, VPC-R3-03 and VPC-R3-04.
- Design files untouched. No doc_checks run; this is a reading seat.
