# Repair round 5 — V04 (the underground) — lane coherence/repair-V04-r5

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V04-r5; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-b/apply-blocks.py): text before the first block header is
# ignored; the FILE line routes every block to docs/volumes/V04-underground.md. Live unit: V04 as assemble-r4 left it
# (sha256 6aebc1e136c8778c…, 527 003 bytes, 3 628 lines). Each REPLACE body is the live subsection with count-asserted
# substitutions (19 edits, each applied exactly its asserted count, each tagged with its issue id or END line; the build
# and its edit list in the seat's scratch, never in the repository); every untouched line is verbatim.
# Blocks: 10, all REPLACE of leaf subsections — §1b.2, §1b.3, §2.6, §3.5, §3.10, §3.11, §4.3, ## 6, ## 7, ## 8. No heading
# retitled or added, no whole-volume REPLACE, the title block untouched. Ruling requests: 0.
# Binding rulings applied (adjudication-r5, Part H · V04): R5-01, R5-02, R5-05; R3-01 – R3-03 and R4-01 stand.
#
# PROGRESS (lane `coherence/repair-V04-r5`, 2026-10-01)
# - P0 brief read whole (2 issues routed; ROUND-5 NOTES, NEW OWNER RULES, ORCHESTRATION NOTES); adjudication-r5's summary,
#   table of contents, R5-01, R5-02 (whole, with its Ends and Sweep), R5-05, R5-09's sweep and Part H · V04 (2 FIX,
#   2 END lines) read; adjudication-r4's R4-02 (d) read for VAL-R4-07's root cause: done
# - P1 issue sources (verify-agree-layers-r4t: VAL-R4-07; verify-agree-proof-r4t: VAP-r4-06; round5-work/V04.json, no
#   `also_reported`, no `orchestrator_note`; round5-work/model.json for VV34-r4-01 = VAL-R4-04); live V04 §1.3, §1b.2,
#   §1b.3, §2.6, §3.5.0 *Foundations* and *At an epoch*, §3.5.4, §3.10, §3.11 (UE27, UE31 – UE33, the arch-vault failure
#   row), §4.1, §4.3, §5.1, §5.6, ## 6, ## 7 (T-V4-63, T-V4-65, T-V4-79, T-V4-81, T-V4-82), ## 8, ## 9; the base's §2.7
#   support step (3) and T14-1; model's round-5 support step (6) and (7) (repair-r5-model.md); V06 §8 and INDEX §4 – §5:
#   done
# - P2 the count-asserted edit set (19 edits, 10 blocks): done
# - P3 dry run on a copy, references, doc_checks, words: done
# - P4 report, result saved, LANDED: done
#
# DISPOSITIONS — Part H · V04: 2 issues, both FIX, each FIXED in the text (none INVALID, none MERGED); 2 END lines written
# - VAL-R4-07 (minor; FIX): UE33's E7 (§3.11) "the layer hidden draws none of the underground view's part" → "the layer
#   not drawn — hidden and not the view's working layer (§8.4) — draws none of the underground view's part", the
#   required change verbatim. Root cause (R4-02 (d): every reader of "the layers the view shows" reads "draws"): V04
#   searched for every "hidden", "visible" and "shows" reader — §5.1's lead, UE27 E7 and UE32 E7 already read "drawn"
#   (round 4); UE31 E7 ("the parity presets export only the hidden sewer; the layer's visibility never changes the
#   per-band export") is about the export, which reads `LayerSpec.visible` by design; §7's parity lead ("with a parity
#   preset on and the layer hidden, a CITY renders pixel for pixel as before M6-U") restates the base's T14-1 in its
#   words for the parity render at the default view (Ground the working layer), so it stays as the base words it; no other
#   reader.
# - VAP-r4-06 (minor; FIX per R5-05 (c), which agrees with the required change): T-V4-81 (j) "(j) at a drawn week whose
#   frame is not the head (V04 §5.1 (7)) —" → "(j) at a drawn week whose frame is not the head (V04 §5.1 (7)), from the
#   later of U5 and V06's E6, whose history frames (V06 §3.15.2) it reads —"; §8's U5 tests cell "T-V4-81" →
#   "T-V4-81 ((j) at the later of U5 and V06's E6)". Both verbatim.
#
# END LINES (Part H · V04), each written as stated
# - END of R5-02 (the adjudicator's sweep), the V04 lines of R5-02's *Ends*, verbatim:
#   §1b.2's `ArchVaults.reconcile` row: "the tail's T2 vaults step (every raised way, after generation's last support
#   run, §2.7's support step (6) (a))" → "the tail's T2 vaults step (every raised way, after the span rule's eager run,
#   §2.7)"; "and a hand trace through one of its stations (§2.7's support step (6) (b) (iii))" dropped (its list then
#   reads "… a hand `repairRaised`) and a hand landfall (V05 §3.16 (4))"); in the epoch list "a circuit's,
#   contraction's or re-anchored stretch's crossing station," dropped.
#   §1b.3's raised-way edit row: "or crossed by a hand trace through one of its stations (`drawWall`, or `moveVertex` on
#   an enceinte's trace, a re-anchored stretch among them; §2.7's support step (6) (b) (iii))" and its "T3 `wall`" tool
#   dropped.
#   §2.6's arch-vault entity row: "and a trace's crossing station taken on it (§2.7's support step (6) (b) (iii))" and,
#   in the epoch list, "a trace's crossing station," dropped (the list then reads "… or repairs it by hand, and a hand
#   landfall (V05 §3.16 (4))").
#   §3.5.0 *At an epoch*: "a trace's crossing station and the frame growth's deck extension among them" → "the frame
#   growth's deck extension among them, its old stations kept (§2.7's support step (7))"; "a crossing station its pier's
#   former ring (§2.7's support step (6) (b) (iii))" dropped.
#   §3.10's epoch reconcile: "re-lays those of a raised way a circuit, contraction or re-anchored stretch crossed through
#   one of its stations (§2.7's support step (6) (b) (iii): that station's support the band's stretch, each vault
#   between its raised-way piers' inner faces) or whose deck the frame growth extended" → "re-lays those of a raised way
#   whose deck the frame growth extended (the old deck's stations and spans kept, §2.7's support step (7))", the
#   parenthesis that followed it ("§3.2 (9): a new `vault` span's vault laid, one whose span is gone or `open`
#   deleted") joined to it by a semicolon, its words kept.
#   §4.3's raised-way row: "a hand trace through one of its stations (…)" and "a circuit's, contraction's or
#   re-anchored stretch's crossing station," dropped.
#   ## 6: "(its add, re-shape or removal, a hand trace's crossing station)" → "(its add, re-shape or removal)".
#   T-V4-63: "crossed through one of its stations by an epoch circuit and, on a second run, by a hand `drawWall` (§2.7's
#   support step (6) (b) (iii))" → "passed beneath by an epoch circuit and, on a second run, by a hand `drawWall`
#   (§2.7's support step (6) (d)) — the `vault` span's arch vault taken into the line, never entered, and no arch vault
#   changed by either —"; "(a crossing station's support its band stretch)" dropped; "the hand case's undo restores the
#   vaults with the same ids and footprints" → "the frame growth's case keeping every old station and its vaults".
#   The one trigger (the commit of every change to a raised way's `feet`, `supports` or `spans`, whoever makes it)
#   stands at §1b.2, §2.6 and §4.3; a later trace is no longer such a change.
# - END of VV34-r4-01 (model; R5-02 (7)): T-V4-65's at-epoch clause adds, after "… returns the vacated dwellings'
#   households by id and draws nothing": "; and an aqueduct whose deck a frame growth extends over a cavern chamber
#   within reach of its piers: no old pier moved, the collapsed set equal to a regeneration's". Its timing stands: the
#   frame growth is the base's from M4 on the hook fixtures (§13.8's T110 row), and U5 runs T-V4-65's epoch clauses.
#
# SWEEP (R5-01 (2); every term, field, section and test the rulings change, in prose, tables, edge rows, tests and the
# milestone cells)
# - R5-02: V04 searched for "support step", "(6) (a)", "(6) (b)", "(iii)", "crossing station", "hand trace", "through
#   one of its stations", "last support run", "T3 `wall`", "palisade", "under-deck", "re-site", "raised gate", "wall
#   opening", `W_RAISED_CROSSING`, `walls.raisedCrossings`, `bend.raised`, `bend.wall`: every hit is an END site above,
#   but one — §4.3's raised-way row, "an existing element of a later system a new or widened raised-way pier (a crossing
#   station's band stretch) puts within reach", whose parenthesis R4-09's later-trace station gave its meaning; it is
#   conformed to the one case R5-02 leaves, "(a crossing station's band stretch where the way is created across a
#   standing wall, §2.7's support step (3))" — the band stretch then entering the raised way's `supports` (§2.7's
#   support step (3): "that station's support `ring` is the band's stretch under the deck"), so `foundationObstacles`
#   reads it in that commit. Kept, agreeing: §1.3's raised-way bullet, §3.5.0 *Foundations* (1), §3.5.4 (d), J-V4.79
#   ("fixed at the raised way's generation from ground part 0 only"), J-V4.88, UC13, UC18, IN-V04-14. Tests and cells:
#   T-V4-63 and T-V4-65 above; T-V4-62, T-V4-64 – T-V4-70 name no crossing; U5's tests cell and §8's *Item 110's
#   dependencies* stand (T-V4-63's epoch clauses run at U5 by hand and on M4's grow path, as U5's content states).
# - R5-05: (a) V04 §1b.2's `underFindPlaces` row, §2.6's row and §5.1 (6) – (7) already read the view's week over the
#   frame (round 4); (b) the re-evaluation at a drawn week's change has its budget at its base home (VRC4T-04's texts);
#   V04 §6's *Find on Below* budgets `underFindPlaces` (≤ 2 ms p95 inside it) and restates no week budget, so nothing
#   differs; (c) every V04 test clause reading a drawn week whose frame is not the head: T-V4-81 (j) only (above). UE32's
#   E8 cites T-V4-81 (j) and carries its schedule with it. T-V4-82 and UE33's E8 read `decayLevel(doc, lineage, week)`
#   at the head's weeks (the condition's weeks reached by advancing; (i) "once V06's E2 has landed"), no history frame.
# - R5-09: V04 §5.1 (2)'s **Go there** and the new UE33 E7 text read `workingLayer` as a view key (agrees).
#
# HAND-OFFS
# - To the adjudicator, an observation (no block; R5-02 (6) (d) × V04 §3.5.4 (d) (1), (f)): a wall stretch laid after a
#   raised way ends at a `vault` span's "two walled-up arch mouths, the chamber kept whole", and T-V4-63 now bars "no arch
#   vault changed". The arch vault's `door` stands at the midpoint of one arch mouth (§3.5.4 (d) (1)), and its grade faces
#   (§3.5.4 (f): `opensOnto`) give a seated building's frontage entrance and windows there; no reconcile runs for a later
#   wall (no change to `feet`, `supports` or `spans`). Where the stretch's band meets that mouth over the door, the text
#   says the door stays (the chamber kept whole, unchanged) but not what it opens onto. V04 writes nothing here, since the
#   meeting's outcome is §2.7's support step (6) (d)'s (model) and R5-02 states "no arch vault changed"; if a rule is
#   wanted (the door kept and the run stopped short of it, or the door moved to the other mouth), it is model's (6) (d)
#   with V04 §3.5.4 (d) (1) reading it.
# - None other: every END line under Part H · V04 is written; no V04 text needs another unit's line this round.
#
# CHECKS
# - Dry run (apply-blocks.py, unchanged, on a copy of the live V04 with the rationale as a throwaway input): 10 blocks
#   found, 10 applied, 0 skipped, audit 10 OK; headings 59 → 59, fences 12 → 12 balanced, the title block unchanged;
#   output byte-identical to the build (sha256 b79fd29048f06a90…, 526 488 bytes, 3 626 lines); the rationale unchanged.
# - References: every pointer the new text adds resolves — §2.7 (the base), §2.7's support step (3), (6) (d) and (7)
#   (model's round-5 text: (7) "A frame growth's extension", R5-02), §3.2 (9), §8.4, V04 §5.1 (7), V06 §3.15.2, V06's E6
#   (V06 §8). No pointer removed that another unit cites into V04 (V04's headings unchanged).
# - Ids: no T-V4, J-V4, UE or UC id added or removed; no review id (R5-nn, a verifier issue id) in any added line (16
#   changed lines scanned).
# - doc_checks.py --doc V04 --heads the base: WARNING reference corpus INCOMPLETE (captures, research/patreon,
#   research/devlogs, research/ftg-docs, research/external missing) — NOT authoritative, provisional: live → new C1 0 → 0,
#   C2 0 → 0, C3 219 → 219 hits (the same runs), C4 0 → 0, S1 0 → 0, S2 153 → 153 hits, unreviewed 2 → 2 (the
#   pre-existing §3.24 pointers, one line earlier).
# - Words (wc -w): 84 394 → 84 327 (−67, −0.08 %). Removed 213 words, every one superseded design R5-02 rules out (the
#   later trace's crossing station at six homes and its test words — principle (3) (b), a conflict resolved as the canon
#   rules, not a shrink source); added 149, the design the issues and END lines require (the frame growth's old
#   stations at two homes and T-V4-65's clause, T-V4-63's beneath-the-deck bar, UE33's working-layer reading, T-V4-81
#   (j)'s schedule at two homes, §4.3's band-stretch case). Shrink sources: none applies to a repair of this scope.

=== FILE docs/volumes/V04-underground.md ===

=== REPLACE ### 1b.2 Stage outputs and interfaces ===
### 1b.2 Stage outputs and interfaces

| output or interface | implementer | caller or consumer |
|---|---|---|
| `SewerStrategy.derive` | U-NET (`@plat/under/net`) | the tail scheduler, first, after the first map (V04 §3.1); V06's `under.extend` (`afterGrowth` 10) at the first epoch whose prelude turns `Features.sewers` on (V06 §3.2): U-NET whole over the current ways as the epoch's mutation, every existing entity kept and never re-derived, then U-ACCESS (a)'s overlap test over the new runs (V04 §3.10) |
| `SewerStrategy.extend` (V04 §3.10) | U-NET | V06's `under.extend` (`afterGrowth` 10) at every later epoch with `Features.sewers` on, its wall drops over `EpochScope.levelled`; on the grow-by-stage path, §4.11's grow step after the new stage's S11 (item 319) |
| `NetworkForecaster.forecast` | U-FORECAST (`@plat/under/forecast`) | S7b (6), (7) in `@plat/content` (item 551); in a standalone neighbourhood document run by V01's unit run after the one-district allocation (V01 §3.10.1 step 6; V04 §3.1) |
| `UndergroundStrategy.derive` | U-FRONT | the tail scheduler |
| `UndergroundSystemStrategy.derive` ×6 (ruin first) | U-SYS | the tail scheduler, in V04 §3.5.0's order |
| the buried-system builder (V04 §3.5.5) | U-SYS (`@plat/under/sys`) | T2's buried step (a history scar at generation); the `raiseGrade` conversion's operator (II.7.6) at an epoch (V06's hazard phase, V06 §3.11.6) or by hand, which passes it the raised region's records and the `RetainingWall`s the same batch tombstones (V06 §3.19.4 (1)), read on their last live state as the buried floor's steps; `BuriedFormer.lay` (below) |
| `BuriedFormer.lay(doc, epoch, former: Id[]): { system: Id } \| null` (V04 §3.5.5 (b)) | U-SYS (`@plat/under/sys`) | V06's history replay (§4.11 *History-first generation* (5)) at the coarse epoch whose age first passes the burial threshold for a former fabric, inside that epoch's batch; its returned system id is written by V06 into `HistoryRecord.buried` (§2.7) |
| `UndercityStrategy.derive` | U-CITY | the tail scheduler |
| `UndergroundLinkStrategy.link` (item 562's return) | U-LINK | the tail scheduler, T5, after U-CITY |
| `AccessPassStrategy.run(doc, rules, ctx, k, scope?: EpochScope)` (II.7.6) with `excavation(doc, cluster)` | U-ACCESS (`@plat/under/access`) | the tail scheduler, T2b, after U-SYS, with no scope (the whole document; at a village rung every mining use's outside-plot working, V04 §3.5.7 (a)); V06's `under.access` (`afterGrowth` 20) with the epoch's scope — `scope.workings` included — its last step V01's opening pass over the public openings it made (V04 §3.10); every commit that touches an access, a link, an element's closure or a building over a void (the excavation reading and `ExcavationRecord` only) |
| `ruinCentre(doc)` | U-SYS | V08, the ruin light rows, the `ruin.node` report line (T6) |
| V01's opening pass (V01 §3.7.1) | V01's local-place step (`@plat/hood`), called only while it is registered and runs — while `fabric.extensionWeight` > 0 (V01 §3.7.1, V01 §3.15) | the commits V04 §3.10 *The opening pass* lists (the list is stated there once) |
| `districtsAbove(part, element)`, `fabricSignature(region)` (V01 §3.16) | V01's `@plat/hood` | U-CITY C5 (an undercity neighbourhood's `parent`: the first entry for its core, II.7.5 (2)); V04 §4.5's clerk (the districts above a ruin); V04 §3.5.0a (7), the ruin's distinctness step, with the ruin's outline |
| `ArchVaults.reconcile(doc, raised, cause)` (V04 §3.5.4 (d)) | U-SYS | the tail's T2 vaults step (every raised way, after the span rule's eager run, §2.7); the commit of every change to a raised way's `feet`, `supports` or `spans`, whoever makes it (V04 §4.3) — among them an edit naming it (its add, removal or re-shape; a `setAttr` on its spans, a span's `use` included, crossings, `clearanceCm` or `spanSpacingCm`; a hand `repairRaised`) and a hand landfall (V05 §3.16 (4)); at an epoch V06's `under.extend` over `EpochScope.raised` (an epoch's raised-way op, a landfall, the frame growth's deck extension, §3.2 (9); V06 §2.1) |
| `foundationObstacles(doc)`, `aqueductDelivery(doc)`, `ruinColumns(chamberId)`, `gradeFaces(chamberId)`, `workedOut(working, scope?)` | `@plat/under/sys` | the readers of V04 §1b.1's rows; `workedOut` by V04 §3.5.1 (1) (e)'s quarry-ossuary candidates, V06's candidate list (V06 §3.18.2 (1)), V10 |
| `Foundations.apply(doc, scope: EpochScope, cause): FoundationsResult` (V04 §3.5.0) | U-SYS | V06's `under.extend` (`afterGrowth` 10), its first act (V06 §3.18.1 (6)), at every rung, the maintenance mode included (the rule is V04 §3.5.0 *At an epoch*) |
| `underDistance(member, target)` | `@plat/under/distance` | S10b's scorer on the underground parts (V04 §3.6a) |
| `CatacombGrowth.grow(doc, epoch, opts?: { capM2: Record<Id, number>; primary: Id; deaths?: number })` (V04 §3.5.1 (5)–(8)) | U-SYS | V06's `under.extend` (`afterGrowth` 10, after the sewer's extension) with its per-complex cap, derived primary and the span's calamity deaths (V06 §3.18.2 (3), (3a); `CalamityRef.deaths`, item 573, V08 §3.6); on the grow-by-stage path, `SewerStrategy.extend`'s growth stage; every re-derivation (the ratchet) — the last two with `opts` absent |
| `QuarryWorkings.extend(doc, scope: EpochScope, epoch)` (V04 §3.5.3) | U-SYS | V06's `under.extend` (`afterGrowth` 10, after the catacombs' growth), TOWN and above; on the grow-by-stage path, `SewerStrategy.extend`'s growth stage |
| `Reconcile.run` (T8) | U-RECONCILE | the tail scheduler, last |
| `DugGenerators` (basement, target, connector, system, access, reservation, link) | U-DIG | `addUndergroundAccess`'s closure (§7.3 item 9), U-LINK's lifeline closure (II.7.5), U-LINK L5 for a subterranean dossier institution (V04 §3.7); a dwelling declaration's closure on a sealed void (its first rung: target, connector where needed, access, reservation) and the grouped access before it (item 372; V04 §3.8) — at an edit's dry run, and in a skeleton prefix at U-CITY C0 (V04 §4.7) |
| `UndergroundFade.candidates` / `.apply` | U-FADE | V06's `under.fade` (`decline` 10): the underground's own lottery after the fabric pool, uncapped by the district's `fabric` cap (item 319; V06 §3.5.2); a hand `convert` (§7.1) |
| `UndercityEpoch.reread` | U-CITY | V06's `under.undercity` (`afterGrowth` 30), then F6 over the clusters `under.access` made accessible, its new dwellings filled by V06's relocation of the district's poorest-band ground households (up to `voidDwellings.share` and each cluster's `maxHouseholds`), never an S7b (6) allocation at an epoch (V06 §3.18.1 (4); item 319); the households a shrinking or cleared neighbourhood vacates returned to the participant for its re-homing |
| the underground `WhyProvider` (kinds: the underground systems, `AccessPoint`, `UndergroundLink`, `RuinRecord`, `CatacombComplex`, a void cluster) and the `underground` `WhySectionProvider` (on burial faces, buildings over a void, districts above a ruin, raised ways with arch vaults, the terminal building) | `@plat/under` (V04 §4.5) | V10's `why` query (V10 §3.9, V10 §3.9a; BCR-V10-3's section registry), V09's why card and underground panels |
| `catacombOutcome(doc, face)` (read-only, V04 §4.5) | U-SYS, over the candidate pass's derived per-face record | the `underground` section on a burial face; V09's cemetery panel |
| `underFindPlaces(doc, ids)` (V04 §5.1 *Find on Below*) | `@plat/under` | V09's `live.find` overlay provider (g item 120), for the ids §11.2's gazetteer match listing gives on underground parts, after each commit that rebuilds Find's index and at each change of §2.9's `week`, over the model the view draws (the head, or a history frame, V06 §3.15.2) |
| `belowKind(building, element)` (V04 §5.6) | `@plat/under` | §6.3's `plan.damage` draw for an element below ground (its kind's range row, V11's); V03's plan draw of a storey below 0; S14's underground builder (the damaged footprints); the per-band VTT export |
| `drainOf(plot)` (II.7.1's view) | U-NET's `serves` | §11.2's reader; the plot inspector |
| the underground display list (semantics `under.*`, V04 §5.2) | S14's underground builder in `@plat/render` | the tile worker; the exports |
| per-band exports | `@plat/export` (V04 §5.5) | the user; a VTT host |

Each stage's output is consumed: the `sewer` system record and part 0's tunnels by U-FRONT, U-ACCESS, U-LINK, S14 and
the exports; U-FRONT's plots by S10b, S11, S12c, S13a and the statistics; U-SYS's parts by U-ACCESS, U-CITY, U-LINK,
S14; U-ACCESS's links, accesses, excavation reading and `ExcavationRecord` by U-FRONT F6, U-CITY C1, S14, the filter and
the reader; U-CITY's districts by S12c (character), S13a (names), §9.1's quarter tree; U-LINK's links and accesses by S14,
§2.6's plan rung reservation and the reader; T8's writes by the ground's model digest and the report.
=== END ===

=== REPLACE ### 1b.3 Edit kinds (each with its tool, lifecycle row and undo) ===
### 1b.3 Edit kinds (each with its tool, lifecycle row and undo)

| edit | the authoring tool (§7.1's binding table) | lifecycle row | undo |
|---|---|---|---|
| `drawTunnel` (with `from`, item 355) | T4 `road` (on the underground layer the road tool draws a tunnel) | §7.4's underground tools row | the replaced underground scope |
| `drawChamber` (with `from` and `system`, items 355, 361) | T6 `place` (a chamber is placed by one point and a size) | the same row | the same |
| `addLink` | T4 `road` (two points on two elements) | the same row | the same |
| `placeAccess`, `addUndergroundAccess` | T6 `place` | the underground tools row; the closure row | the closure record |
| `setAttr` on `depthOffsetCm`, `widthCm`, `headroomCm`, kind, `knownTo`, `state`, `Chamber.kind` | T9 `shape` | §7.4's setAttr row | the inverse |
| `convert` `silt`, `caveIn`, `seal`, `reopen`, `flood`, `raiseGrade`, `clearUndercity` | T9 `shape` | §7.4's convert row | the replaced scope |
| `regenerate` on a tunnel run, a system, an undercity neighbourhood | T10 `hold` | §7.4's regenerate row | the replaced scope |
| `adjust` of `layers.sewers.family` / `.preset`, of `recipe.layers.ruins`, of the TOWN *Sewers* toggle (Re-derive from S7b with carry-over; items 403, 404, 549) | T1 `intend` | §7.4's adjust row | the replaced scope |
| `drawTunnel` / `drawChamber` with system `ruin` (on the ruin's axis) | T4 `road` / T6 `place` | the underground tools row | the replaced scope |
| `placeAccess` over an unexcavated or lost cluster (the user's excavation, cause `edit`) | T6 `place` | the underground tools row | the replaced scope (the `ExcavationRecord` entries it wrote go with it) |
| `setAttr` on a `CatacombComplex`'s `fill` | T9 `shape` | §7.4's setAttr row | the inverse |
| `delete` of catacomb galleries (lowers `extentFloorM2`, tombstones the nodes; J-V4.56) | T9 `shape` | §7.4's delete row | the replaced scope |
| `setLayer` (underground visibility, `underView`) | T12 `dress` | §7.4's layer row | the inverse |
| `placeLight` on an underground host | T12 `dress` | §7.4's light row | exact |
| `setAttr` on a raised way's span `use` (the base's path `spans/<a>-<b>/use`, item 244; a held user edit) — V04 lays or removes that span's arch vault in the same commit | T9 `shape` | §7.4's setAttr row | the inverse (the chamber restored with its id) |
| `setAttr` on a ruin chamber's `monument/count` (the monument re-laid by `layTiers`) | T9 `shape` | §7.4's setAttr row | the inverse |
| a raised way added (T4 `road` with `raised`, the aqueduct class), re-shaped (`moveVertex`; a `setAttr` on its `clearanceCm` or `spanSpacingCm`) or deleted (generated or drawn): the base's edit, with V04's `ArchVaults.reconcile` and `foundationObstacles` re-read in the same commit (V04 §4.3), the arch vaults, their links and accesses as fates | T4 `road`; T9 `shape` (its `setAttr` and delete) | the base's rows; V04 §2.6's arch-vault row | the replaced scope (the vaults' ids and footprints restored) |

`depthBand` and `showUnexcavated` are view keys (§2.9), set by V09's per-viewer controls, never edits and never undone.
=== END ===

=== REPLACE ### 2.6 The lifecycle of every state field this volume adds or gives a producer ===
### 2.6 The lifecycle of every state field this volume adds or gives a producer

| field | create | read | persist | regenerate | undo | migrate |
|---|---|---|---|---|---|---|
| `Terrain.outfalls` | S1 (3) at generation; S1's water operator after a water edit (§7.3 (b)) | U-NET N2 | the terrain chunk | re-derived with S1's hydrology | the water edit's replaced scope | absent in an older document: recomputed on load from the hydro grid |
| `Tunnel.outfall` | U-NET N2/N3 | U-NET N7 (the root invert), U-LINK L1, S14, exports | the tunnel record | kept while the run's root is kept; re-seated by V04 §4.3 when its shore moves | the edit's undo record holds the former value | absent: the run's downstream end's nearest `Terrain.outfalls` entry, found on load and reported |
| `Tunnel.serves` | U-NET N8 | `drainOf`, the reader, U-FADE's usage | the tunnel record | re-derived for the plots an edit re-cuts (V04 §4.3) | the edit's undo record | ids mapped by §7.5 |
| `Tunnel.depthOffsetCm` | `setAttr` | U-NET N7 | the tunnel record; the event in the log | an input override kept by every re-derivation (§7.2) | the inverse | absent = 0 |
| `Junction.chamber` | U-NET N10 | S14's chamber program, the light rows, U-FRONT F2 | the junction record | re-derived with its arms | with its arms' scope | absent: re-derived on load |
| `Chamber.kind` | U-SYS, U-CITY, `drawChamber` | S14, light rows, U-CITY C1 | the chamber record | re-derived with its system; `setAttr` override kept | the inverse | absent: the system row's first chamber kind |
| `District.core` | U-CITY C2 | U-CITY C3, C5, C6, light rows, labels | the district record | re-derived with the neighbourhood | the scope's undo | absent: the neighbourhood's largest chamber, found on load |
| the family and preset controls | the recipe's params (creation), `adjust` | U-NET, U-FRONT, U-CITY | the recipe; the `adjust` event | Re-derive from the network stage (§7.1) | the adjust's replaced scope | absent: `mixed`, `historical` |
| `LayerSpec.underView` | `setLayer` | S14, the tile worker | the style state | view only | the inverse | absent: `cutaway` |
| `NetworkForecast` (with P6, P7) | U-FORECAST at S7b (in a standalone neighbourhood document after the one-district allocation, V01 §3.10.1 step 6) | S7b (6), (7); U-CITY C0; F6 | never | recomputed on every replay | — | — |
| `RuinRecord` | U-SYS (V04 §3.5.0a); a declared ruin element (V04 §4.7) | its readers in V04 §1b.1 | the entities block | kept whole (culture, axis, plan) by every re-derivation; a New random on the ruin system re-draws culture, axis and plan, its openings re-drawn by U-ACCESS (e) over the new elements and V01's opening pass run over those made and removed in the same commit (V04 §3.10); a source the dossier removes — at an epoch's `dossier` phase or before a re-derivation — clears `RuinRecord.source.ref` (its `kind` kept), reported `W_RUIN_SOURCE_REMOVED`, and the system stays, fading by U-FADE, because the underground is never torn down (item 11; DEFINITION §4; J-V4.99); a blueprint ruin follows the toggle only at a re-derivation (the toggle's Re-derive from S7b, V04 §4.3), never at an epoch | the scope's | absent: no ruin (g item 109 (h)); the upgrade creates none |
| `CatacombComplex` | U-SYS (V04 §3.5.1) | U-SYS, U-FADE, U-ACCESS, S14, V12's `catacomb.extentM2`, V10, `catacombOutcome` | the entities block | only adds (V04 §3.5.1 (6)): every derivation — a growth stage, an epoch, a dossier event, a replay, a Re-derive, a New random — keeps every element and `extentFloorM2`; `fill` and `blockedBy` re-derived | the event's | absent: `extentFloorM2` = the laid extent, `fill` 0, `overCount` where the count is exceeded (V04 §4.6) |
| `AccessPoint.cause` | its creator | the excavation reading, V10, V12, V03, V01's opening pass (a catacomb entrance selected by `cause.system`), GeoJSON | the access record | kept with its access (§6.3's anchor) | the causing event's | absent: `legacy` |
| `UndergroundLink.cause` | U-ACCESS, U-LINK L1, U-SYS, the edits | the same | the link record | kept with its link | the causing event's | absent: `legacy` |
| `Gallery.reusedBy`, `Chamber.reusedBy` | U-ACCESS (f), U-SYS (tomb reuse, the quarry ossuary) | the adopting system's extent and program, V10 | the element's record | re-derived with the adopting system; never removed by the adopted system's re-derivation | the scope's | absent: none |
| `excavation(doc, cluster)` | U-ACCESS (g) | V04 §1b.1's readers | never (derived) | recomputed after every commit that touches an access, a link, an element's closure or a building over a void | follows its causes | — |
| `ExcavationRecord.reached` | U-ACCESS (g), in the commit whose reading first makes an element's cluster `accessible` — generation's T2b, a replay epoch's `under.access`, a live epoch's, an edit's | the excavation reading (`lost` against `unexcavated`), V10 | the entities block | kept for every element §6.3 carries over; an element not carried over loses its entry, a fresh element starts without one and gains it at the reading that makes its cluster accessible | the replaced scope (the entries a commit added leave with its undo; an undone closing commit restores `accessible` and the dwellings byte-identically) | absent in an older document: built on load from the current reading (every element of an accessible cluster entered), so an older document holds no lost cluster |
| the carve's cleared galleries | U-CITY's carve post-pass (V04 §3.6 C2) | S14 (not drawn), the host's extent | the gallery records, existence `cleared`, cause `rule:undercity-carve` | a New random on the host system re-runs the carve; a New random on the neighbourhood `resurrect`s them, then re-carves | the scope's | absent: the upgrade re-runs the carve |
| `District.outskirts` | U-LINK L6 | labels, counts, the reader | the district record | re-run after any part-0 edit within `outskirtsReachM` of a lifeline link | the edit's scope | absent: recomputed |
| `Tunnel.name` | the tail's S13a | labels, the reader | the tunnel record with its `NamingRecord` | kept by §6.3's cases; protected by a `setAttr` (§2.8) | the inverse | absent: drawn |
| `Tunnel.grilles` | a view (N11a) | S14, VTT | never | recomputed with the run or a wall edit crossing it | — | — |
| `recipe.layers.ruins` | the recipe's params, `adjust` | U-SYS, U-FORECAST | the recipe | Re-derive from S7b | the adjust's scope | absent: `off` |
| the view key `showUnexcavated` (J-VI.19) | V09's per-viewer control | S14 | the viewer's view state, never the document | view only | not an event (a view key) | absent: `false` |
| `underFindPlaces` (Find on Below; g item 120) | derived on read for V09's `live.find` (V04 §5.1) | `live.find`, the Find panel's Below count | never: a view (the chips are §2.9's view key `find`, kept in view pins) | recomputed at each commit that rebuilds Find's index and at each change of §2.9's `week`, over the model the view draws (the head, or a history frame, V06 §3.15.2) | follows its records | — |
| an arch vault (`archVault` chamber, `Chamber.span`, its `door`) | U-SYS's vaults step (T2) from the base's `vault` spans; `ArchVaults.reconcile` in the commit of every change to a raised way's `feet`, `supports` or `spans`, whoever makes it — among them an edit that adds a raised way (T4 `road` with `raised`, the aqueduct class; the same span rule), re-shapes it, sets its spans (a span's `use` to `vault` included), crossings, `clearanceCm` or `spanSpacingCm` or repairs it by hand, and a hand landfall (V05 §3.16 (4)); at an epoch through V06's `under.extend` over `EpochScope.raised` (its raised-way ops, a landfall, the frame growth's deck extension, §3.2 (9)) | S14, the exports, U-ACCESS (b), V10, a declared placement, `gradeFaces` | the vaults part chunk | re-derived with its raised way, its id kept by its key, its footprint re-laid between its span's raised-way piers' inner faces at each reconcile; its closure follows its span at every derivation by V04 §3.5.4 (d) (2); **removed** in the same commit as its raised way is deleted, generated or drawn, or its span is gone or set `open` — its links and accesses with it, listed as fates in the dry run; a regeneration after a removal lays none, because the base's generator is the removal's only reader and V04 reads only the resulting raised-way set | the replaced scope: the way and its vaults back with the same ids | absent in an older document: laid at the next vaults derivation, the upgrade's diff listing them (V04 §4.6) |
| the terminal cistern | U-SYS's vaults step, one per aqueduct whose terminal kind is `cistern` | N8, S14, V10, the exports | the vaults part chunk | re-derived with its aqueduct, its id kept by its key; removed with it | the replaced scope | absent: laid at the next vaults derivation, reported |
| `Chamber.monument` | the ruin step (V04 §3.5.0a (5a)) | S14, the light pass, U-CITY, the exports, V10 | with its chamber | kept byte for byte while its chamber's plan is kept; re-laid through `layTiers` with the same draws on a `setAttr` of `monument/count` (the count kept as an input override); laid at the next ruin derivation where absent and its culture row names the host; removed where the row no longer names it (a table edit); a New random on the ruin re-draws it with the plan | the inverse, or the scope's | absent: laid at the next ruin derivation, reported |
| `Chamber.columns` (`ruinColumns`), `gradeFaces` | derived with their chamber | V03 §3.12 (6) and (9), S14, glTF, VTT | never | recomputed with the chamber (and its monument) | follows its chamber | — |
| `Entrance.faces` `'tunnel'` | S11 under F4, F6 and C4 | V03 §3.12 (4), VTT | the entrance record | re-derived with its building | the building's | absent on an older document's underground building: rewritten by the upgrade (V04 §4.6) |
| a village working's breach access (V04 §3.5.7 (a)) | U-ACCESS (a) at T2b at a village rung; `AccessPassStrategy.run` over `scope.workings` at an epoch | the excavation reading, V10, V12's `void.*`, GeoJSON | the access record | kept by its key (the working's and the element's lineages) at every derivation; follows V04 §3.10's access closures with the working's plot as its host; kept at V07's hand-off up | the causing event's | absent: made at the next T2b, reported |
| the buried former settlement (its elements in the `buried` system) | `BuriedFormer.lay` at the replay's burial epoch (V04 §3.5.5 (b)) | U-ACCESS, U-CITY C1, S14, S13a, the exports, `HistoryRecord.buried`, V10 | its part chunk; the replay epoch in the log's creation prefix | re-laid byte for byte by every replay of the same seed and history (its keys carry the epoch); a re-derivation that re-runs the replay with a changed history lays it anew by the least-disruption mutation (§7.7 item 5), its surviving keys kept; kept (never torn down) by every later epoch, fading by U-FADE | the creation prefix is never an undo target (§7.4); a later edit's undo restores its replaced scope | absent in an older document: none (the replay runs only at generation) |
| the damage drawn below ground (`belowKind` and the level each element reads; V04 §5.6) | derived on read from V03's plan parts, the footprint's rock sides and V06's `decayLevel` and `decayPeak` at the drawn week | V03's plan draw of a storey below 0, S14's underground footprints, the per-band picture and VTT exports | never: a look — the plan, its ids and every digest unchanged | recomputed with the plan, the footprint and the level's events | follows the records and the lifecycle events it reads | — (nothing stored; an older document reads it at once) |

`AccessPoint.state`'s lifecycle is §7.4's underground row as item 555 amends it (an access's state follows its host;
V04 §3.10's access closures are its writers here). The base's other fields keep their base rows (§7.4, §2.8):
`Tunnel.navigable`, `headroomCm`, `closure`, the condition reading, `AccessPoint.knownTo`, `source`, `Gallery.walkway`,
`Features.underground`.
=== END ===

=== REPLACE ### 3.5 U-SYS — the void systems ===
### 3.5 U-SYS — the void systems

**3.5.0 Existence, order and what every system shares.** In the order ruin, catacomb, cavern, quarry, vaults, buried —
the ruin laid first, so every later system meets it (g item 109 (c)) — each kind is gated by rung (g item 109 (j) (1);
II.7.6's gate sentence and PART III's village rows):

| kind | rungs | existence |
|---|---|---|
| `ruin` | every rung, THORP to METROPOLIS | V04 §3.5.0a's sources |
| `cavern`, the fissure variant included | every rung | the geology flag and its row chance × the mining boost (V04 §3.5.2) |
| `catacomb` | TOWN and above | V04 §3.5.1's candidates, rank and count |
| `quarry` (mines and chain mines) | TOWN and above | V04 §3.5.3's volume law; mines where the roster holds a mining class |
| `vaults` | TOWN and above for the generated sources (bridge, street and cistern vaults, the forced vaults); the arch vaults and the terminal cistern at every rung, following their raised way | V04 §3.5.4's rules; the forced vaults (V04 §3.5.6); the base's `vault` spans and `cistern` terminals (item 244) |
| `buried` | TOWN and above for a raised grade and a scar; the replay's former settlement wherever the former settlement stood at TOWN or above | the scar rule (II.7.6); `raiseGrade`; `BuriedFormer.lay` (V04 §3.5.5 (b)) |
| `dug` | every rung | U-DIG's closures and U-LINK L5; below TOWN, a dossier catacomb record's charnel vault (V04 §3.5.1 (10)) |

**Under the standalone line** (V04 §3.1) the rung column reads: `ruin`, `cavern` and `dug` as at every rung; `catacomb` at
TOWN's rules and count, on the document's own burial faces; `vaults` the arch vaults and terminal cistern of a declared
raised way only; no `quarry` and no `buried`.

Each chance is one uniform on `sewer` keyed by (the kind, the source's lineage). The parity presets set every chance to 0
(a dossier source's included: a parity run carries no dossier), the ruin toggle `off`, the scar rule off and the history
replay off (T-V4-35). **Dossier forcing (item 386; V04 §2.3a):** a subterranean record whose row names this system kind
makes the system exist with at least one source — its own building where it has one; else a catacomb record the first
burial face in rank order that passes the dry-ground gate (V04 §3.5.1 (10)), a mine record the ore cell nearest the town
(V04 §3.5.3), a cistern record the oldest precinct's court (V04 §3.5.4) — its chance taken as 1. A crypt record forces no
system. A system is created (its part the next unused, §2.9) only when its first element can be laid; it writes its L0
margin ring, then its elements in one L1 batch (galleries as `gallery` chains, chambers as closed `chamber_wall` chains; a
gallery segment inside a chamber is dropped so galleries end on the wall), then one L2 `corridorUnion` batch. **The
shallow-element rule (J-V4.21):** an element of a system laid after the town whose ceiling lies within `surfaceClearCm` of
the ground above keeps `foundationClearM` (II.7.6) from every basement ring of another building and never lies under a
water face; deeper elements are free of the surface. A ruin is older than the town, so the rule runs the other way for it:
a ruin element under a footprint or within `foundationClearM` of a basement ring is created `collapsed`, cause
`foundation` (the town's foundations cut through it; g item 109 (c), (d)); a buried former settlement's element takes the
ruin's direction (V04 §3.5.5 (b)). A dry kind (catacomb, quarry, vaults, dug) keeps its floor above the water table; a
buried or ruin element found below it is created `flooded` (II.6's row). An arch vault stands at grade and is exempt from
the cover rows and from the dry-kind rule (V04 §3.5.4 (d)).

**Foundations (g item 110 (a), (b); J-V4.82).** `foundationObstacles(doc)` is derived at every derivation from the ground
as it stands: (1) each raised-way pier's footprint — the raised-way record's `supports` (item 244's support step, whose
keys bound the spans), its ring on ground part 0, for the raised way of every raised part — from `levelledGroundCm` at its
centroid (item 309) down to `span.supportFoundationCm` (§2.7) below it; (2) each `RetainingWall`'s footing — a live
wall's, and one a `raiseGrade` tombstoned (V06 §3.19.4 (1)), whose footing stays in the ground under the buried town — a
strip `foundations.footingWidthCm` wide centred on its chain, from its high-side ground down to its low-side ground (each
`levelledGroundCm` on its own side, a tombstoned wall's on its last live state) less `footingBelowCm`, that is the step
height plus `footingBelowCm`, station by station along the wall; (3) each buried aqueduct stretch's channel band grown by
`conduitClearCm`, from the ground down to its channel floor less `conduitClearCm`. An element lies **within reach** of an
obstacle when its plan band meets the obstacle's footprint grown by `foundationClearM` (II.7.6) and its top lies above the
obstacle's bottom. Every rule that reads basement rings reads these beside them. A system laid after the town (a
catacomb, a quarry or mine working, vaults, the forced vaults, the undercity's carve, a dug passage and U-DIG's connector)
lays no element within reach; a catacomb node so refused records `blockedBy: 'foundation'`. An older void (a cavern, its
fissures, a ruin, a buried former settlement) keeps its plan and the builders fill what they met: a gallery's stretch
within reach is split out by II.6's stretch split and created `collapsed`, cause `foundation`; a chamber whose floor the
grown footprints cover by at least `foundations.collapseShare` is created `collapsed`, cause `foundation`, and one covered
less keeps its floor with the footing standing in it as a masonry pillar — no floor, no plot, no walkway and no pin on it
(drawn by V04 §5.2, explained by V10: "the footing of a raised-way pier of ⟨way⟩"). The reading is re-made at every
derivation from the current raised-way piers and retaining walls, so a removed raised way's fill goes with it and a new
one's comes with it (T-V4-65). A raised-way pier is no building and never a dig host for U-ACCESS (d). The buried town's
own elements (a raised grade's, a scar's) are never collapsed by a footing: its old streets and storeys are the ground the
walls held (V04 §3.5.5 (a)).

**At an epoch (J-V4.109)** no V04 stage derives, so the rule is applied by `Foundations.apply(doc, scope, cause)`
(V04 §1b.2), V06's `under.extend`'s first act (V06 §3.18.1 (6)), at every rung, the maintenance mode included: over the new
footprints and basement rings of `scope.built` and `scope.basementGrown`, the raised-way piers of the raised ways in
`scope.raised` (V06 §2.1: every raised way whose `feet`, `supports` or `spans` the epoch changed, the frame growth's deck
extension among them, its old stations kept (§2.7's support step (7))) and the footings of the retaining walls in
`scope.levelled`, it applies this paragraph's rule to the
elements within reach of those obstacles — an older void's stretch split out `collapsed`, a chamber covered by at least
`collapseShare` `collapsed`, one covered less holding the footing as a pillar, a later system's element `collapsed` (a
catacomb's staying in its extent, V04 §3.5.1 (6)) — cause `foundation` with `event` the epoch's `seq`, one batch per part,
no draw. The plots on a floor it collapses (F6's, an undercity neighbourhood's) are vacated by II.7.3's vacancy rules in the
same batch and returned in `FoundationsResult` (V04 §2.4) — each plot with its households' ids — with the collapsed
elements and the pillars, for V06's re-homing by name inside the participant. An epoch op removes no obstacle — a breached
or dismantled span keeps its piers' footings (V06 §3.19.2), a tombstoned wall its footing (above) — so the element set it
collapses is the one a regeneration of the same state collapses (T-V4-65; V06's T-V6-67). With an empty scope it returns
three empty lists.

The rows' gallery and chamber defaults, which II.7.6 leaves to the rows (our own values; J-V4.16 – J-V4.20, J-V4.52):

| system | gallery `widthCm` / `wallCm` / `headroomCm` | `coverM` | chamber kinds: `minM2` / `ceilingCm` |
|---|---|---|---|
| `ruin` | a street at its culture row's `streetCm` / 60 / 300; a corridor 150 / 50 / 250 | `burialCm ÷ 100` less the ceiling | `hall` 150 / 800 · `temple` 100 / 700 · `court` 100 / 600 · `gate` 20 / 400 · `room`, `tomb`, `vault` 6 / 300 · `cistern` 40 / 500 — each ceiling capped at `burialCm − 100` |
| `catacomb` | 120 / 50 / 200 | 2.5 | `ossuary` 9 / 250 |
| `cavern` | 300 / 100 / 400 (a volcanic tube 500 / 100 / 400; a fissure 80–150 / 100 / 600–1 200) | 3 | `hall` 400 / 800 · `breakdown` 300 / 600 (a fissure's ≤ `fissureChamberM2`) |
| `quarry` | haulage 250 / 50 / 250; a heading 150 / 50 / 200 | 6 (`minCoverM`) | `workings` 400 / 250 (the pillars drawn, not modelled) |
| `vaults` | 400 / 60 / 300 | 1 (an arch vault 0: at grade) | `cistern` 150 (a castle's 250; a terminal cistern `terminalCisternM2`) / 500 · `streetVault` 40 / 300 · `bridgeVault` 60 / 300 · `archVault` the span's inset rectangle / the soffit less its floor (V04 §3.5.4 (d)) |
| `buried` | the old way's width / 30 / the raise − 50 (a former settlement's: its depth − 50) | 0 | `storey` the footprint / min(the storey height, raise − 50) · `square` the old square / raise − 50 · a former settlement's `storey` and `gate` / min(the storey height, its depth − 50) |
| `dug` | 100 / 30 / 190 | 1.5 | `cellar` 6 / 220 · `storage` `storageM2` / 220 · a charnel `ossuary` ≤ `charnelMaxM2` / 250 |
| undercity carved (in the host's part) | walkway 300 / 0 / the chamber's ceiling | — | `market` `mainChamberM2` / min(the host row's largest ceiling, the adjoining headroom + 200) |

**3.5.0a Ruins (g item 109 (b), (c), (e)–(h); J-V4.52).** An older civilisation's remnant plan, laid first, at every rung.
1. **Existence, strongest first.** A ruin the document already holds is kept whole whatever its dossier source now says — a
   removed source clears `source.ref` (V04 §2.6; `W_RUIN_SOURCE_REMOVED`) — save a `blueprint` ruin, which a re-derivation
   with `recipe.layers.ruins` off does not lay. Otherwise the sources are read in this order — `site.ruinEvidence`'s kinds
   in V08 §2.6a's reading, through DR30 — and the first that fires sets `RuinRecord.source`: (a) a `site.deposits` entry of
   kind `ancient_ruins`, or an institution of scene archetype `ruined-landmark`: the ruin exists, no draw; (b) a
   `magical_node` deposit or a ley-line income row: `RuinRule.chance.magic`; (c) a `magical` history event, or
   `history.ageYears ≥ ancientYears` (an ancient founding): `chance.history`; (d) with none of these,
   `chance.blueprint[rung][relief]`, only while `recipe.layers.ruins` is `on` (item 404; D-3). A delving institution
   multiplies (b)–(d) by `delvingFactor`, capped at 1, and alone gives nothing (the chances V11 §3.23.2's). One ruin system
   per settlement; one uniform on `sewer` keyed by (`ruin`, the source's lineage — the deposit's, the institution's, the
   event's — or the town root for the blueprint). A declared ruin element in the creation prefix (V04 §4.7) makes it exist
   whatever the draw, `source: 'declared'`.
2. **Culture and axis.** The culture row is one draw over `RuinRule.cultures` by weight on the ruin's stream, or the row V11
   maps to the ancient civilisation the dossier's history names. `axisDeg` follows the row's orientation law: `cardinal` 0°
   (north–south) ± 5°; `solar` 90° (east–west) ± 10°; `contour` the mean contour bearing over the outline (perpendicular to
   the mean terrain gradient); `free` uniform on [0°, 180°) — the jitter a draw. With `sharedAxisChance` it takes instead
   the bearing of the present tier-1 way whose spine passes nearest the centre (its OBB axis), and `sharedAxis` is set: the
   old axis surviving as the new (g item 109 (c)).
3. **Place, size and outline.** The centre is the marker's position (the port's ruin decoration or the ruined landmark's
   site); else the magical node's position (DR19's deposit site); else the centroid of the growth-stage-1 districts; else,
   at a village rung with no stage-1 district, the centroid of the village's district (V07's one district); else the town
   root's anchor. The significance is drawn by weight (a `ruined-landmark` record forces `palace`), the extent uniform in
   its `extentHa` range, capped at `maxFrameShare` × the frame's area. The outline is a rectangle of that area on `axisDeg`
   with the row's `aspect`, centred and clipped to the frame; a clip that removes more than half moves the centre toward the
   frame's centre, in 10 m steps, until half remains.
4. **Depth.** The ancient ground `g(p)` is the present terrain smoothed by a `smoothM` box kernel less `burialCm`,
   `burialCm` = `burialByAge(ageYears)` interpolated and clamped to `depthM` (item 563); `ageYears` is the source's (a
   history event's `yearsAgo`, a founding's age) where it gives one, else drawn on [`ancientYears`, 3 000]. A `terraced` plan
   steps its floor by `terraceRiseM` per terrace along the fall line. Each element's floor follows `g` at its vertices (a
   gallery graded, a chamber level at its centroid's value); each chamber's ceiling is its kind's, capped at
   `burialCm − 100`. An element whose floor lies below the water table is created `flooded`.
5. **The ancient plan, by family** (V11's row gives `blockPitchM`, `streetCm`, `aspect`, `roomM`, `columnPitchM`,
   `hallShare`, `terraceRiseM`):
   * `grid` — streets on a pitch drawn in `blockPitchM` along and across `axisDeg`, every third a main street at
     `streetCm[0]`, the rest `streetCm[1]`; each block cut into rooms by recursive splits along its longer side until both
     sides lie within `roomM`; the `hallShare` of blocks nearest the centre become one `hall` each, the central block a
     `temple`, and where the perimeter streets meet the outline a `gate`;
   * `axial` — a processional axis through the centre along `axisDeg` at `streetCm[0]`; along it alternate `court`s and rows
     of rooms mirrored across the axis; a `temple` at its head; `hall`s at a third of its length from the head;
   * `radial` — a ring road at 0.7 of the outline's inradius and spokes every 45° to a central `hall` (the citadel); the
     wedges cut into rooms as `grid` cuts blocks;
   * `terraced` — terraces along the contours `blockPitchM` apart, each a terrace gallery with a row of rooms on its uphill
     side, joined by a stair gallery every `blockPitchM` along the terrace.

   Streets and corridors become galleries; rooms become chambers of kind `room`, those of the outermost row in the quarter
   farthest from the centre along the axis `tomb` (the necropolis), those adjoining a `hall` `vault`; a cistern where the
   row's `hallShare` block lies lowest. Where the culture row's `monument.hosts` holds `tomb`, the necropolis's block
   nearest the centre is not cut into rooms: it is one `tomb` chamber, a mausoleum, so a monument fits (J-V4.86). Each main
   street carries its ancient drain as a channel (the `water` stroke), the element the sewer may adopt (V04 §3.5.7 (f)). At
   most `maxChambers` chambers: beyond it the plan's outer rooms are dropped from the outline inward. A plan the outline
   leaves no block for (an outline narrower than one `blockPitchM`) is one `hall` chamber on the outline, inset by the
   row's wall; a degenerate element is refused by the kernel and left out, reported (F-VOID, §5.1 (9)). One L1 batch, one L2
   `corridorUnion` batch, on the next unused part.
5a. **Stepped monuments (g item 110 (c); J-V4.84).** Where the culture row carries `monument` (V11 §3.23.4's cells), each
   host kind it names takes one monument: `temple` the temple chamber nearest the centre, `hall` the hall nearest the centre,
   `tomb` the mausoleum of (5); ties by address. V02's `drawTiers` (ST1) draws on the ruin's stream and V02's `layTiers`
   (V02 §3.15.1) lays it with:
   * `frame` — the chamber's rectangle on `axisDeg`: `u` along its **front**, the side facing the nearest main-street
     (`axis`) gallery, else the side facing the centre, ties by the lower side index; `v` inward; the origin the front's
     corner that makes (`u`, `v`) right-handed, moved inward by `monument.clearM` along both;
   * `region` — `W` the front's length and `D` the depth, each less 2 × `monument.clearM`;
   * `scale` 1; `cells` V02's `stepped-monument` row at the anchor `monument.band`; `heights` V11's `stepped-shrine` row
     (V11 §3.6.4), not the great temple's nave row; `pitch` M11's one pitch rule at the site's climate row; `parapetCm` 0
     and `plinthCm` 0 (a ruin keeps neither); no `anchor`;
   * `draws` — ST1's list, drawn by `drawTiers` in ST1's order (V02 §3.15.1) on `sewer`, keyed by (the ruin system, the
     chamber's plan coordinate, `'tiers/0'`) for the first pass and (…, `'tiers/1'`) for the per-tier pass; an author's
     `monument.count` replaces `n`, every other draw unchanged. ST6's failed check is an attempt on the same keys with the
     attempt index, as V02 states.

   **Its failure path, stated once.** An ST0-infeasible region is retried once with `clearM` halved; still infeasible, the
   chamber keeps its form with no monument and `W_RUIN_MONUMENT_SKIPPED` is reported — nothing is discarded (§5). A
   `TierFailure` `layTiers` returns truncates the monument to the tiers laid, counted in `lay.truncated`. **The ceiling
   cut:** with `top` the laid stack's highest point above the chamber's floor (V02 §3.15.2's envelope), the chamber's
   ceiling becomes `min(burialCm − 100, max(its kind's ceiling, top + monument.ceilingClearCm))`; the tiers, stairs and
   shrine whose top would rise above that ceiling less `ceilingClearCm` are removed from the top down and also counted into
   `lay.truncated`, so the top stays under the ceiling — the ground above pressed on it. `standing` is the decay's reading
   only ((6)); `lay.truncated` records the two cuts. The result is `Chamber.monument` (§2.7, item 250). Its standing tiers
   and its mound are obstacles for U-CITY (V04 §3.6). With no `monument` cell the ruin draws nothing on the `'tiers/*'`
   keys and is byte-identical (T-V4-68).
5b. **Columns, modelled (J-V4.92).** In every `hall` and `temple` chamber, in its rectangle's frame, the column grid of pitch
   `columnPitchM` centred on the rectangle, every node at least `columnPitchM ÷ 2` inside its walls and outside its
   monument's tier-0 ring grown by 100 cm; each line of nodes along `u` is one colonnade row, indexed from the front. The
   nodes of the rows (6) keeps are `Chamber.columns`, derived, never stored, exported by `@plat/under` as
   `ruinColumns(chamberId)`: V03 §3.12 (6) reads them as fixed rings, the ruin program draws them as its 60 cm dots
   (V04 §5.2), C3's walkways keep 60 cm clear of each, and glTF and VTT export them. The drawn dots are the modelled points
   (T-V4-44). A chamber too small for one node has none.
6. **Decay (the persistence order).** Each element's persistence class — `hall` for halls and temples, `cistern`, `gate`,
   `axis` for the main streets, `street` for the rest, `wall` for vaults, `room` for rooms, courts and tombs; `colonnade` for
   the columns' rows — survives when one uniform on `sewer` keyed by the element falls below
   `S(class) = min(1, survival[class]^(ageYears ÷ ageRefYears) + coverKeep × burialCm ÷ 1 000)`. A non-survivor stays as a
   record with `closure: 'collapsed'`, cause `decay` — g item 109 (c)'s "collapsed or filled", since the base has no filled
   state. Collapsed elements count in V12's plan measures and never in capacity or access. **A colonnade row** survives when
   one uniform keyed by (the chamber's key, `'colonnade'`, the row's index) falls below `S(colonnade)`; a fallen row's nodes
   leave `Chamber.columns`, and a collapsed chamber has none. **A monument decays from the top:** tier k stands while one
   uniform keyed by (the chamber's key, `'tiers/decay'`, k) falls below `S(hall) × monument.tierDecay^k`; `standing` is the
   first k that fails, and every tier from it up falls with its stair; the shrine stands only when every tier stands and its
   own uniform (index n) passes. The fallen tiers lie as a rubble mound on the first fallen tier's ring,
   `moundCm = moundShare × Σ` the fallen tiers' heights, capped at the ceiling less 50 cm. A host chamber created `collapsed`
   keeps its monument with `standing` 0: a mound in the rubble.
7. **Distinct from the town above (g item 109 (c)).** After the decay, V12's paired measures (`ruin.blockArea`, `grid.r4`,
   `grid.axis`) are computed for the ruin's plan and for the district fabric over its outline (V01's
   `fabricSignature(outline)`, V01 §3.16); where they fail V12's `paired` margins, the next culture row in the draw's order
   is tried (up to `distinct.retries`), then the axis is turned by `distinct.rotateDeg` (skipped when `sharedAxis`); if all
   fail the last attempt stands and `W_RUIN_SIMILAR` is reported (`attempts`, `similar`). With no district over the outline
   (a ruin beyond the fabric) the test passes at the first attempt.
8. **Its surface.** The marker — the port's ruin decoration, or the ruined landmark's building — stays on the ground and is
   the `ruin_entrance` candidate of U-ACCESS (e); `RuinRecord.marker` names it.
9. **`ruinCentre(doc)`** returns the record's centre (else null): the magical node sits at the ruin's heart, the position
   V08's `magical_node` site reads (g item 109 (f); DR30). **The report line.** For each `magical_node` deposit whose site
   stands at `ruinCentre()`, the tail's T6, once S13a has named the ruin, writes the generation report's line
   `ruin.node: { deposit: Id; ruin: Id /* the ruin system */; name: NameRef /* RuinRecord.name, a reference, so a renamed
   ruin reads its new name */ }` (§5.4), derived with the report and gone with the deposit or the ruin. V05's why ("the node
   beneath the old ruins", V05 §3.3, V05 §4.5) and V10's read it. V05's node term stays positionless (J-V5.41): no island rule
   reads this volume's arena, and this line is all a sky reader takes from it (J-V4.102).
10. **Identity.** A ruin element's creation key is (the ruin system, its plan coordinate), so a regeneration that keeps the
    plan keeps every key; the record is kept whole while its source stands (V04 §2.6).

A ruin exists whole whether or not anyone can reach it: its excavation reading (V04 §3.5.7 (g)) starts `unexcavated`.

**3.5.1 Catacombs — under cemeteries only, counted, ranked, never shrinking (g item 109 (k); J-V4.16, J-V4.55).** TOWN and
above. The law, the sources and the stagnation are II.7.6's; these are its steps. The values of `CatacombRule` are
V11 §3.23.8's.
1. **Candidates: burial faces only.** (a) The `churchyard` part of a church or temple plot (§4.9's churchyard row) — the
   church building is never the source; (b) every `cemetery`-class use (V11 §3.5, its `extramural` row letting it lie
   outside the walls), the dossier's `Parish burial grounds`, `Burial ground`, `Burial grounds and charnel house` and
   `Graveyard` records seated as that class; (c) each burial ground of a `Cemetery network` record, one beyond each gate on a
   through route (item 108's COUNT row, V11); (d) a monastery's `burial` yard part; (e) at CITY and METROPOLIS only, after
   every burial face, a worked-out quarry working (V04 §3.5.3) within `ossuaryReachM` of `R`: the **quarry ossuary**, which
   adopts the working by `reuse` (V04 §3.5.7 (f)). A burial face on a sky island is skipped (V05 §1.3, V05 §3.5 (3)). With no
   candidate, no complex forms and `blockedBy` is not written.
2. **Rank by the burials each face serves.** At growth stage k of K, `burialShare_k(f)` is the share of that stage's
   households whose nearest open burial face, by the street solver's `street` distance from their plot (§4.7), is `f` (ties
   by address), over the faces standing at stage k. The face's need `A(f)` is II.7.6's ossuary law (item 560) summed over
   the stages with that share, a plague epoch's burials × `plagueNeedFactor`, and at an epoch the span's calamity deaths as
   burials — `burialShare(f) × opts.deaths × ossuaryShare × m2PerBurial`, `burialShare` the epoch's ((5)) — each added to the
   need, never to the cap ((6)). Candidates rank by `A` descending, then the face's area, then address. A quarry ossuary's
   need is the burials of the faces left without a complex after the burial-face pass plus the unmet need of the stagnant
   complexes ((7)); one whose need is under `growthFloorM2` is not adopted.
3. **Count.** One at TOWN; at CITY and METROPOLIS `min(cap, 1 + ⌊churches ÷ churchesPer⌋)` (`CatacombRule.count`).
   `churches` counts the buildings of classes `cathedral`, `great_temple`, `church` and `v.parish_church` (V07 §2.4,
   V11 §2.9) on the ground and on every live sky island, each once (V05 §3.5 (3); the one exception to V04 §1.2's sky rule — a
   count, never a candidate: (1) skips every sky face), and each monastery's church; a collective dossier record counts each
   member once (item 108 (c)); V06 re-reads the count at each epoch (V06 §3.18.2 (1)). The churches set how many; only burial
   faces hold them. Candidates are tried in rank order until the count is reached, each passing II.7.6's dry-ground gate
   (not `damp` or `flood`), its age gate (`minAgeYears` by the face's growth stage, `HistoryHint` or the log) and its source
   chance: the fixed-key draw (§6.1) on `sewer` keyed by (`catacomb`, the face's lineage; a quarry ossuary by (`catacomb`,
   the working's lineage)), compared at every derivation against `CatacombRule.chance` at the rung then standing — so a face
   that failed at TOWN is compared again, with the same draw, against CITY's chance when the town becomes a city. A face that
   fails is skipped and not counted, so not every town has one. Every existing complex counts, closed ones included; a
   created complex's existence is never drawn again.
4. **Layout.** A `CatacombComplex` per formed complex. Its anchor is the face's centroid (a quarry ossuary's, the working's),
   its axis the face's OBB long axis; grid nodes at `gridM` pitch along that axis. A breadth-first growth from the anchor
   node, in order (grid distance, then (i, j)), admits node `n` when: it lies within `reachM` of the anchor (else `reach`);
   its ground point is neither `damp` nor `flood` (`wet`); it is no tombstone; it lies under no `wall_strip` band
   (`wallStrip`); it passes the shallow-element rule and lies within reach of no foundation obstacle (V04 §3.5.0: basements,
   raised-way piers, retaining-wall footings; `foundation`); it lies in no element of another complex of this part at
   another depth band (`system`: a part holds no crossing, II.7.6); and, with `A` the admitted set, the level floor holds:
   `max_{m ∈ A∪{n}} h(m) − floor(A∪{n}) ≤ depthM.max`, with `floor(X) = min_{m ∈ X}(h(m) − coverM − headroom)` (`depth`).
   Each rejection's reason is kept in `blockedBy`. An element of another system, on that system's own part — a sewer run, a
   cavern gallery, a quarry working, a vault — never refuses a node: where a gallery or chamber of the complex meets one
   at a shared depth, U-ACCESS (a)'s overlap test opens the meeting in the growth's commit, the complex's course never
   bent for it (II.7.6), and one it passes over or under at another depth stays apart (V04 §3.11 UC20). A node inside a
   ruin `tomb` chamber in plan at a shared depth reuses it:
   the tomb's area counts toward the complex and takes `reusedBy` (V04 §3.5.7 (f)). Growth stops when the galleries' floor
   area plus the chambers' reaches the target. Every grid edge between two admitted nodes is a gallery; every admitted node
   where `(i + j) mod 4 = 0` and three or more galleries meet takes an `ossuary` chamber, a square of half the pitch. One
   complex, one floor (`floorCm`). Complexes are laid in rank order; a node within one pitch of an earlier complex joins it
   (its floor) when that floor is admissible there, else is not admitted — two complexes meet or keep apart, never cross
   (II.7.6). An anchor node that is itself refused leaves the complex at its entrance's chamber only, stagnant from its
   first derivation.
5. **The largest under the largest cemetery (J-V4.95).** Every complex but the **primary** is capped at `rankCap` × the
   primary's extent. The primary is a reading, never stored: the complex whose source serves the most burials — the greatest
   need `A` of (2) (a quarry ossuary's its need), ties by rank, so rank 1 at generation — at every derivation; at an epoch,
   V06's derived primary, the same reading held by its hysteresis (V06 §3.18.2 (3a)), passed in `opts.primary`. The cap only
   blocks growth (`blockedBy: 'rank'`) and never removes anything, so the largest catacomb lies under the cemetery serving
   the most burials — in a big city usually the main cemetery outside the walls, which overtakes an older churchyard's
   complex over epochs (g item 109 (k) (3)). **The signature:** `CatacombGrowth.grow(doc, epoch, opts?: { capM2: Record<Id,
   number>; primary: Id; deaths?: number })` — with `opts` (V06's `under.extend`), `capM2[id]` bounds each complex's growth
   at this call (V06's per-epoch cap, V06 §3.18.2 (3)), `primary` names the primary and `deaths` carries the span's calamity
   deaths (V06's sum of `CalamityRef.deaths` over the epoch's events, V06 §2.4, V06 §3.18.2 (3); V08 §3.6; item 573; absent 0),
   which (2) adds to the need and never to the cap; without `opts`, the cap is (6)'s — none at generation and at a
   re-derivation (each complex to its need), the per-epoch cap with `years` the stage's span at a growth stage of the
   grow-by-stage path —, the primary is the reading above and no deaths are added.
6. **The ratchet (g item 109 (k) (4)).** Generation lays each complex to its need (the generation stands for the
   settlement's whole past; the per-epoch cap is an epoch rule) and sets `extentFloorM2`. Every later derivation — a growth
   stage (`extend`), an epoch, a dossier event, a replay, a Re-derive from any stage, a New random, a migration — only adds:
   every existing element is kept, closed ones included; the target is `max(the current extent, the recomputed need)`; at an
   epoch the growth is at most `max(the current extent × ((1 + growthCapShare)^years − 1), growthFloorM2)`, `years` the
   epoch's span and `growthCapShare` V11 §3.23.8's share per year (J-VI.6) — or V06's `opts.capM2[id]` where it passes one,
   (5); growth continues from the existing frontier in (grid distance, (i, j)) order; `extentFloorM2` becomes the greater of
   itself and the laid extent. A kept element that a later town puts under a basement ring is converted `collapsed`, cause
   `foundation`, and stays in the extent. A New random on the catacomb system re-derives its lights and labels only; its dry
   run says "catacombs keep their extent". **Below TOWN.** At a village rung an existing complex (V04 §3.1's maintenance
   mode) never grows: `blockedBy` gains `'rung'`, it is stagnant, and its `fill` rises by (7) with the burials of its
   standing faces; its extent never falls below `extentFloorM2`; a rise back to TOWN lifts the block at the next derivation.
7. **Stagnation, a reading (g item 109 (k) (5)).** A complex is stagnant when its need exceeds its laid capacity and its
   frontier has no admissible node (or the rank cap blocks it). Its `fill` is then raised to
   `max(fill, clamp((need − laid) ÷ its ossuary chambers' area, 0, 1))` — ossuaries only fill; the bones never leave — and
   §8.2's ossuary program draws it as denser niches (V04 §5.2); a complex with no ossuary chamber reads `fill` 1 while
   stagnant. When a block lifts (V01's `blockLifted` notice, a plot above demolished, the source reopened) growth resumes at
   the next derivation by least disruption.
8. **A closed face (stated here once, V06 citing it).** A face is **closed** when its cemetery use is closed or ruined; when
   its face is retyped to another land use; when the dossier removes its record; for a churchyard, when its churchyard part
   is removed or its plot holds no live church-family use (the church's use closed, or moved off the plot); for a quarry
   ossuary, when no face feeding it is open. Its complex is then frozen — no growth and no change of `fill`
   (`blockedBy: 'sourceClosed'`) — and stays, every element kept. A church-family use arriving on a closed churchyard's plot
   **reopens the same face**, its lineage kept, and the complex resumes at the next derivation from its frontier by least
   disruption. A new cemetery may begin a new complex only where the count allows.
9. **The entrance (item 560).** A `stair` `AccessPoint`, source `system`, cause `{ rule: 'system', system }`,
   `knownTo: 'local'`, at the grid node nearest the face's centroid, its ground host the face; its head inside the burial
   ground's chapel where one stands on the face and its class's crypt column is `never` (V11's `cemetery` chapel slot), in a
   cellar, the nave or a store by V03's `AccessHostRow` (catacomb, any cause but `crypt`) — never a crypt — else in the open
   face, drawn with the stair symbol. **A church-class building** (its class's crypt column `always` or `basement`,
   V03 §3.7.4) never hosts a catacomb access of source `system` (V03 §3.7.2 (6)): a churchyard's catacomb is entered from the
   churchyard, and through its church only by the crypt join (V04 §3.5.7 (c)); a quarry ossuary by its working's shaft and a
   stair at the working's surface head.
10. **Dossier forcing.** A catacomb record forces one complex, within the count, on the first burial face in rank order that
    passes the dry-ground gate: its chance 1, its age gate waived and reported. Where the roster holds no burial face at
    all, item 386's row seats the record's surface as a `cemetery` use at S10b (extramural soft, V11 §3.5) before the tail,
    so the tail never writes the ground. Below TOWN the TOWN gate stands: the record becomes one `ossuary` chamber of the
    `dug` system under its burial face — a charnel vault, its area the need capped at `charnelMaxM2`, reached by a `stair`
    from the face or its chapel — reported `W_CATACOMB_BELOW_TOWN`; never a church crypt and never a gallery system. A
    catacomb record whose every burial face is wet forces nothing and is reported `W_SUBTERRANEAN_WET`.
11. **Crypts are the church's.** V04 lays nothing with a church as its source; F4 and C4 never seat a crypt as an
    underground plot; a crypt record binds to its church building, which V03 §3.7.4 makes `always` (V04 §2.3a). The
    cathedral always has a crypt, the largest in the settlement — V03's bar, cited here.

**3.5.2 Caverns (J-V4.17; g item 109 (a), (j) (1)).** At every rung; the extent is the site's. *Existence:* the geology
flag (S1, with g item 109 (a) (1)'s relief rows) and its row chance, × `mineBoost` (capped at `mineCap`) where the site
**holds mining** — `Terrain.mining`, by §4.2 S1 (10)'s test (V04 §1b.5); one uniform on `sewer`
keyed by (`cavern`, the town root) (the chances II.7.6's). **The fissure variant:** where the flag is `ordinary` and the
relief class is `hilly` or `mountainous`, a `cavern` system of `variant: 'fissure'` (item 248) exists with
`fissureChance`, × the same boost, capped. *Soluble rock:* the D8 paths over the frame's `rock`, `high` and `mid` cells
whose catchment reaches `caveCatchHa`, in descending accumulation, until the extent cap `maxRockShare` of the frame's rock
area or the length cap `caveKmPerKm2` × the frame's area in km² is reached; each path's gallery follows it with a lateral
meander of amplitude `meanderM` and wavelength `meanderWaveM` (value noise on `sewer` keyed by the path's start cell); its
floor is `max(WT(v) − 50, h(v) − depthM.max)`, capped at `h(v) − coverM − headroom`, and it carries `water` where the floor
lies at or below the water table WT (§2.6's definition). A confluence under local relief (the height range within
`reliefWindowM`) of at least `hallReliefM` takes a `hall`: an ellipse of area
`min(hallMaxM2, hallBaseM2 + hallPerReliefM2 × relief)` m², axis ratio `hallAxisRatio` along the downstream path, eight
vertices each moved radially by ± `hallJitter` (a draw per vertex); **its floor lies `hallDryCm` above the local water
table**, joined to each gallery by a `stair` step (a gallery segment graded at `digMaxGrade`), the cave stream crossing
the hall as a `water` channel along the downstream path. *Volcanic rock:* `1 + ⌊tubeMax × u⌋` tubes (one uniform, capped at
`tubeMax`), started from the highest rock cells at least `tubeSpacingM` apart, following steepest descent for up to
`tubeMaxM` or the cap, floor at `h − tubeDepthCm`, a `breakdown` chamber every `tubeChamberM`. *Fissures:*
`1 + ⌊fissureMax × u⌋` fissures (capped at `fissureMax`), each started from a rock cell of the frame's top decile of slope
(the steepest first, at least `tubeSpacingM` apart), following the steepest line along the fall of the slope for up to
`fissureMaxM`; galleries of width drawn in `fissureWidthCm` and headroom in `fissureHeadroomCm` (a draw per gallery), each
floor at `h − coverM − headroom` capped by `depthM`; one or two `breakdown` chambers of at most `fissureChamberM2`; never a
`hall`. A frame with no rock cell, or no path reaching `caveCatchHa`, lays no gallery and the system is not created (F-VOID,
reported). *Openings are candidates, not certainties* (g item 109 (j) (3) (ii)): where a gallery's crown cover falls below
`mouthCoverCm` the gallery is a `mouth` candidate there; a breakdown chamber within `skylightDepthM` of the surface a
`skylight` candidate; a soluble chamber whose cover is under `sinkholeCoverM`, under ground that is no footprint, a
`sinkhole` candidate — each drawn by U-ACCESS (e); a failed mouth candidate ends its gallery sealed by talus. Every cavern
and fissure element within reach of a foundation obstacle takes V04 §3.5.0's foundation rule.

**3.5.3 Quarries, mine voids and chain mines (J-V4.18).** *Volume* (II.7.6, J-A65.45): `V = wasteFactor ×
(Σ_stone buildings perimeter × (eaveCm − baseCm) × 60 cm + Σ enceintes length × thicknessCm × heightCm + Σ towers 0.4 π r² h)`.
*Cells:* the frame's cells with `SiteResources.stone ≥ 0.5` within `reachM`, ordered by (inside `R` first, stone value
descending, distance to the centre, cell index), taken until their volume reaches `V`. **The surface quarry** is §4.9's
`quarry` land use without a `source`; a landfall's rubble working — a `quarry` with a `source` (V05 §3.16 (4), item 252)
— is never the surface quarry, a stone working or a volume source (the sky layer is never read, V04 §1.2). **The surface
split** (II.7.6's "left to the hinterland's surface quarry"): a taken cell whose terrain class is `high` — the outcrop at
the surface, its cover under `minCoverM` — contributes its volume to §4.9's surface quarry and is laid nowhere underground;
the other taken cells, at `headroom × (1 − pillarShare)` per unit area, are grouped into **workings** (4-connected
components, a component over `workingMaxHa` split along its OBB's short axis). **A working's floor** is
`min_cells(h) − max(minCoverM + headroom, depthM.min)` in centimetres, a cell whose floor would lie deeper than
`depthM.max` dropped. *Layout:* each working is one `workings` chamber, its outline the working's cell union simplified at
`minEdge`; the room-and-pillar field inside it is **drawn, not modelled** — §8.2's `quarry` program lays square pillars of
side `√pillarShare × roomM` at pitch `roomM` along the chamber's OBB axis (J-V4.18); a `shaft` (public, source `system`)
opens on the nearest ground point within 30 m of the working's centre that is no footprint (none within 30 m: the shaft
sits at the nearest such point beyond, its surface head on public ground, reported), its `access_point` vertex on the
chamber's wall nearest below it; the workings are joined by `haulage` galleries along a minimum spanning tree over their
centroids (Euclidean, Prim's, ties by index), the nearest working to the town joined to its outcrop by an `adit` gallery
ending in a `mouth` where the stone cell lies outside `R`. With no stone cell within `reachM` the whole volume goes to the
surface quarry and no system is created. *Mine voids:* the same on `SiteResources.ore ≥ 0.5` cells, volume `oreM3PerMine`
per mining class instance, in the same `quarry` part. *Chain mines (item 104 (h) (1), item 105):* each ACTIVE supply chain
whose resource node is of kind `subterranean` reuses the nearest mine or quarry working within `reachM`, or makes one — a
working at the hinterland edge on the nearest `SiteResources.ore` or `stone` cell — of volume `oreM3PerMine` × the chain's
volume factor (`chainVolume`), its surface head the map feature item 104 (h) (1) places; the working is the chain's resource
node for the supply web (item 105). The undercity settles a workings chamber as any chamber (V04 §3.6): S10 cuts its floor,
the drawn pillars yielding to its plots.

*Worked out (J-V4.98).* `workedOut(working, scope?)` is a reading, derived at every derivation and never stored: a mine
working is worked out while its mining use is closed or gone; a chain mine while its chain is not ACTIVE; a stone working —
which serves the town's building stone and has no use — is worked out unless it is in the running epoch's
`scope.elements` (laid or extended by this epoch), so at generation, which stands for the town's past, every stone working
is worked out. Readers: the quarry-ossuary candidates (V04 §3.5.1 (1) (e)), V06's candidate list (V06 §3.18.2 (1)), V10.

*New workings at an epoch.* `QuarryWorkings.extend(doc, scope, epoch)` (TOWN and above; V06's `under.extend`, after the
catacombs' growth) lays, one commit per kind: (1) **stone** — the stone the epoch built, `ΔV = wasteFactor ×` (the volume
law's terms over the stone buildings of `scope.built` and the enceinte stretches and towers the epoch's fortification step
built), taken as new cells in the volume law's order, skipping every cell under an existing working or the surface quarry's
face, with the surface split, grouped into new workings; (2) **mines** — one working of `oreM3PerMine` per mining-class use
whose `opened` epoch is this one, on the ore cells in the same order; (3) **chain mines** — each ACTIVE chain with a
subterranean resource node and no working, as above. Every existing working is kept and never re-derived. Each new working
takes its `workings` chamber, its `shaft` and one `haulage` gallery to the nearest existing working of its kind by centroid
(ties by index; none for the first), its ordinal the system's next unused (so an epoch renumbers nothing, V04 §2.5), and
joins `EpochScope.elements`; its commit runs U-ACCESS (a)'s overlap test and, for a mine working, the mine breach. Where the
cells within `reachM` run out before `ΔV` is met, the rest comes from the surface quarry, the unmet m³ reported. An epoch
that built no stone and opened no mine lays nothing. No draw is made (V04 §3.12).

**3.5.4 Vaults (J-V4.19; g item 110 (b)).**
* **(a) Bridge vaults:** each deck end of a built bridge — a part-0 `Bridge` deck over water (§2.7), never a raised deck —
  whose `deckCm` stands more than `bridgeRiseCm` over the bank's ground takes one `bridgeVault` chamber under its approach
  way: the way's corridor over `approachM` from the deck end, inset 50 cm, floor `vaultBelowCm` below the street, ceiling
  300.
* **(b) Street vaults:** every part-0 way stretch of at least 12 m in `R` whose along-way grade exceeds `vaultSlope` takes a
  `streetVault` under its corridor, inset 50 cm, floor `vaultBelowCm` below the stretch's lowest street point. The grade is
  measured over the way's ramped profile with its stair intervals left out, so a stair where a way crosses a
  `RetainingWall` is no vault source; a raised ramp is never a street-vault stretch.
* **(c) Cisterns:** each precinct of growth stage 1 and the castle where `min(dist.water, the plan distance to the nearest
  aqueduct delivery point)` exceeds `cisternDistM` takes a `cistern` under its open court (a yard part of its plot; the
  castle's inner ward or bailey face), a rounded square of the row's area, floor `cisternBelowCm` below, with a `well`
  access in the court above; a cistern record forces one under its precinct (V04 §2.3a). `aqueductDelivery(doc)` is each
  aqueduct's terminal point and every public fountain the base records it feeds (item 244). This reads only the base's
  eager aqueduct records, and the base's aqueduct need test reads none of V04's placed cisterns (item 244), so the two
  never form a cycle (J-V4.83).
* II.7.3's surface list binds every vault of (a)–(c) and (e), the cistern's own host admitted (a castle's reservation
  excludes sewer dwellings, not its own cistern; item 559). Each street or bridge vault takes a `stair` from the corridor at
  its downhill end, source `system`, `knownTo: 'public'`.
* **(d) Arch vaults — the fourth source** (g item 110 (b): "the spaces between piers stay open or hold the base's vaults";
  J-V4.79 – J-V4.81). The base fixes each span's `use` eagerly by §2.7's span rule (item 244) — a span whose under-deck strip
  lies wholly on hinterland land-use faces stays `open`, reason `country`, at every rung (J-C4) — and V04 reads it and never
  decides it; the span's `reason` is the span rule's vocabulary, distinct from the raised way's own recorded reason (V06's
  `RaisedReasonKey`, J-VI.2). `ArchVaults.reconcile(doc, raised, cause)` visits each raised way of `raised` (every one at
  T2) in address order:
  1. **Lay.** Each span of use `vault` has one chamber — kind `archVault`, key (`arch`, the way's lineage, `a`, `b`), `span`
     its `SpanKey` — found by its key or created: its footprint the span's under-deck rectangle between the two raised-way
     piers' inner faces (the deck's plan outline on ground part 0), inset `archInsetPierCm` at the raised-way piers and
     `archInsetOpenCm` at the two open faces; its floor (`elevationCm`) `levelledGroundCm` at the span's axis midpoint
     (item 309), levelled and cut into the uphill side; its ceiling the span's soffit (item 244) less that floor — the
     ceiling V02's `vaultClamp` reads for a building standing in it. One `door` `AccessPoint` (source `system`,
     `knownTo: 'public'`, cause `{ rule: 'system', system: the vaults system }`, `ground.host` the part-0 face at its
     point) stands at the midpoint of the open face whose `archDoorStripM` strip beyond holds the most part-0 way or open
     ground (no footprint, no water), ties by the lower side index; where neither face opens onto either, no door is made
     and `W_ARCH_VAULT_NO_DOOR` is reported (a walled-up arch). An inset rectangle below `minEdge` on a side is no chamber:
     the span stays unvaulted in the model and is reported.
  2. **Condition.** Its closure follows its span, re-read at every reconcile: `collapsed` where the span's `state` is
     `ruined` or `cleared`, where its V06 condition reads breached or dismantled (item 291), or where a bounding support's
     `state` is `ruined` or `cleared` (item 244) — a landfall's ruin included (V05 §3.16 (4)); else none. U-FADE never
     strikes it.
  3. **Remove.** Every arch vault of the way whose span no longer exists or whose use is `open`, and every arch vault of a
     way no longer in the model, is deleted with its door, its links and its accesses in the same commit, each a fate in the
     dry run.

  The chambers sit in the `vaults` system's part (created at the first, §2.9), one L1 batch and one L2 `corridorUnion` per
  reconcile. **They are not undercity voids:** P5, C1, the forced vaults, U-FRONT, F6 and U-FADE's candidates exclude them;
  L3's basement accesses and U-DIG's connector never target one (a cellar reaches it by the street); U-ACCESS (b)'s
  proximity links reach it as any vaults element. §8.2's chamber row reads it as storage (the vault hatch, V04 §5.2). An
  institution stands in one only by declaration: a declared placement naming the chamber (T6 `place` inside its footprint,
  a skeleton `placeAt`) seats the use on one plot equal to the chamber's floor and one single-storey building under its
  ceiling, its entrance at the door, `faces` by the ground the door opens onto (§2.6's rule) — never `tunnel`; V03 plans it
  as any building.
* **(e) The terminal cistern.** An aqueduct whose terminal kind is `cistern` (item 244; only under a `conduit_house` the
  roster or the dossier holds, otherwise `fountain` or `basin`, J-VI.9) takes one `cistern` chamber, key (`terminal`, the
  aqueduct's lineage): under the yard part of its terminal building's plot (V11's `conduit_house`, V02 §3.17 (b)) where one
  stands, else under the public ground (V04 §1.2) nearest the terminal point; a rounded square of `terminalCisternM2`, floor
  `cisternBelowCm` below, with a `well` access in the yard or on the public ground above (source `system`, cause
  `{ rule: 'system', system }`). The terminal building's plot's drain need is at least `channel` (N8), so the overflow
  leaves by the sewer where one runs. Where neither a yard nor public ground takes the rounded square, it shrinks in 10 %
  steps down to the precinct cistern's 150 m², else it is skipped and `W_TERMINAL_CISTERN_SKIPPED` is reported. The
  aqueduct's buried stretches (where the terrain stands above its gradient line) stay the base's line on ground part 0,
  never an underground system; they are foundation obstacles (V04 §3.5.0).
* **(f) Grade faces.** `gradeFaces(chamberId)` is a derived reading, never stored, read by V03 §3.12 (9): for an `archVault` chamber its two open faces — the sides of its inset rectangle that face out of the span, not
  the raised-way piers — and for a `streetVault` or `bridgeVault` the side at its downhill stair's end; for every other
  chamber none. Each face is `{ side: 0|1|2|3 /* the rectangle's side index */; at: ChainRef /* the chamber_wall segment */;
  opensOnto: Id /* the part-0 face beyond it */ }`, in side order. It is recomputed with its chamber (its lifecycle row
  V04 §2.6's `Chamber.columns`, `gradeFaces` row); a building seated in the chamber takes its frontage entrance on a grade
  face with `faces` `street`, `lane`, `alley` or `yard` by the ground the face opens onto, never `tunnel`, and V03 §3.12 (9)
  puts its windows and face flue there. Tested by T-V4-78 (c).

**3.5.5 The buried town and the buried former settlement.**

**(a) A buried old town (J-V4.20).** II.7.6's rule, with its region the growth-stage-1 districts; its galleries those
districts' way centrelines (the old streets under the new, the regrowth-first town having kept their lines), its `storey`
chambers their buildings' footprints, and each square of the region (an L1 `square` face or a `square` block, V04 §1.2) a
`square` chamber: the old market under the new (item 559). Floors at `scarBaseCm + scarGainCm × severity` below the
present grade; headrooms and ceilings by the table above; a building's entrance vertices are kept on its storey chamber's
wall as `portal` rows for the exports. The same builder serves `raiseGrade` at an epoch or by hand (II.7.6), over the
raised region's records. T2's scar step runs only in a document with no history replay (`HistoryRecord` absent or holding no
epoch): under the replay the same fire or flood is played at its epoch as a `raiseGrade` (§4.11 *History-first generation*
(2)), so one scar never buries twice. **Terraces under a raised grade (J-V4.112).** The floors follow the old grade point by
point: `levelledGroundCm` (item 309) read on the region's last live state, before the `raiseGrade` batch applies the raise,
less the depth the rule gives. A `RetainingWall` that the same batch tombstones inside the region (cause
`convert:raiseGrade`, V06 §3.19.4 (1)) is therefore a step in the buried floor: the galleries and the `storey` and `square`
chambers on its high side keep the high side's datum — the step being the wall's `stepProfile` (V01's BCR-V1-43) on that
last live state at their nearest station — and a gallery crossing the wall's line takes two knots at the wall's faces, as
N6 places them for a run, the segment between them a **stair step** (one gallery and one record still, drawn as a stair,
V04 §5.2). A `square` chamber the line crosses is split along it, each side at its own datum (a footprint never crosses a
retaining wall). So the buried town keeps its terraces and its old stairs; with no wall inside the region nothing changes.
A buried town is reachable by construction — the raised town's cellars open into its old storeys — so every cluster
holding an element of a raised grade or a scar reads `accessible` (J-V4.62).

**(b) The buried former settlement (g item 113 (c); §4.11 *History-first generation* (5); II.7.6; DR39; J-V4.122).** The
settlement's own past, buried: distinct from a ruin (V04 §3.5.0a), whose plan is an older civilisation's.
1. **The call.** V06's history replay calls `BuriedFormer.lay(doc, epoch, former: Id[])` inside the batch of the coarse
   epoch at which a former fabric's years since it was ruined first pass its factored burial age `T` (V11 §3.25.2,
   registry row 93: `burialYears` and the flood, silt, rebuilt and bare-rock factors, read through DR39 — shortened by
   floods, river silt and rebuilding on top, lengthened on bare rock); `former` lists the surface records the epoch buries
   of the former fabric V06 §3.20.5 (4) defines — its ruined buildings, its ways retired or effaced to traces, and its
   enceinte runs in the condition V06 §3.20.5 lists, with the towers and gates drawn on them; the replay clears them on the
   ground in the same batch (their existence `cleared`, §2.8), as `raiseGrade` clears its region; `lay` reads each on its
   last live state. A former settlement that
   stood below TOWN at its peak is not laid (`lay` returns null). The replay writes the returned system into
   `HistoryRecord.buried` (§2.7).
2. **Its depth.** The fabric lies at its old ground level: `depthCm(r) = min(formerRiseMaxCm, formerRiseCmPerCentury ×
   years(r) ÷ 100 × f)` below `levelledGroundCm` at each vertex, `years(r)` the years from the fabric's ruin to the present
   (the replay record's epochs), `f` the burial-speed factor `burialYears ÷ T` (V11 §3.25.2: the default age over the
   fabric's factored burial age), so floods, silt and rebuilding deepen it and bare rock keeps it shallow. It is fixed when
   laid: later epochs never re-lay it.
3. **Its elements**, fresh records of the settlement's one `buried` system (created at the first, §2.9), keyed (`former`,
   the burial epoch, the former record's lineage) (V04 §2.5), in one L1 batch and one L2 `corridorUnion` batch on its part:
   * each former way stretch of at least `formerMinGalleryM` → a gallery along its last live centreline, its width the old
     way's, `wallCm` 30, its floor at the old ground, headroom `depthCm − 50`;
   * each former building whose footprint reaches `formerStoreyMinM2` → a `storey` chamber on the footprint, ceiling
     min(its storey height, `depthCm − 50`), its entrance vertices kept on the chamber's wall as `portal` rows (as (a)'s); a
     smaller building's remains are the fill, laid nowhere;
   * each former enceinte run → a **wall band**: a gallery along the run's chain, `widthCm` the wall's thickness (at
     least `formerWallCm`), created `collapsed`, cause `decay` — solid masonry, drawn by the `ruinMasonry` program, never
     counted in capacity or access; a tower drawn on it lays no element of its own (a tower carries no state, §2.7, item
     575), its remains the band's masonry and the fill; each gate drawn on it → a `gate` chamber of `formerGateM2` across
     the band, open, through which the street galleries pass.

   An element whose headroom or ceiling falls below `formerMinHeadroomCm` is created `collapsed`, cause `decay` (filled
   with the deposits over it): a young burial is mostly filled, an old one walkable. The shallow-element rule takes the
   ruin's direction (V04 §3.5.0): an element under a present footprint or within reach of a basement ring or a foundation
   obstacle is created `collapsed`, cause `foundation`; one below the water table `flooded`. The elements follow U-FADE's
   dry-gallery and chamber rows thereafter and are never torn down (item 11).
4. **Access and reading.** For U-ACCESS a `former` element is a ruin element: (a)'s overlap and (b)'s proximity links, (d)'s
   dig from above, (e)'s `collapsed_shaft` candidate (a former chamber under a square or a field face with cover ≤ 15 m)
   and (f)'s well pin read it as they read a ruin's (V04 §3.5.7). Its clusters take the excavation reading — starting
   `unexcavated` — unless joined to an element of (a), and `ExcavationRecord` covers them (V04 §2.2). The undercity may
   settle it as any `buried` source (V04 §3.6 C1).
5. **Edges.** A `former` list with no element passing (3)'s filters lays nothing and reports `W_BURIED_FORMER_SKIPPED`
   (returning null); two burial epochs extend the one system (fresh keys carry each epoch); a former record the replay no
   longer holds at a re-run of the same seed and history is never passed, so the same elements come back byte for byte
   (T-V4-77); with the replay off `lay` is never called and the output is byte-identical (T-V4-77 (d)). No draw is made.

**3.5.6 Forced vaults — a required undercity always has a void (II.7.5; J-V4.61).** Where
`CircumstanceSlice.undercity = 'require'` and U-FORECAST's P6 finds no counted void with capacity for one neighbourhood,
U-SYS lays a `vaults` complex under the **oldest district** (the lowest `growthStage`, then the largest area, ties by
address), after the ordinary vaults: a grid of `streetVault` chambers of `forcedGridM` pitch under that district's public
ground (V04 §1.2; ground part 0, by `pointLocate`), never within reach of a foundation obstacle (V04 §3.5.0) and never
counting or joining an arch vault, at the vault row's floor `vaultBelowCm`, joined by vault galleries along the grid, grown
breadth-first from the district's largest square of either kind (V04 §1.2; else its centroid's nearest corridor) until the
floor area reaches `max(minHouseholds, H) × m2PerHousehold`, plus one `market` chamber of `mainChamberM2` at the grid's
start. The shallow-element rule binds it; where the ground cannot take it, the complex steps its floor below
`surfaceClearCm` (the surface rule then releases it, J-V4.21) and grows again. So C1's "none formed" cannot occur under
`require` (T-V4-37). Under `forbid`, S7b (7) makes no allocation and U-CITY does not run.

**3.5.7 U-ACCESS — the access pass (T2b; g item 109 (j) (3), (3b), (k) (2), (a) (3), (d); g item 113 (e)).** After U-SYS and
before U-FRONT, in this order; every link and access it makes records its `cause` (items 249, 557).
* **(a) Overlap and mine breaches.** *Overlap:* for every pair of elements of different parts whose plan bands intersect
  (each part's static index) and whose vertical intervals — floor to floor plus headroom or ceiling — also intersect, one
  link at the intersection's centroid, `via: 'breach'`, cause `overlap`, naming the growing system and event. Where one end
  is a sealed cavern or ruin element its kind is `open` (the owner's rule); for any other pair the kind comes from
  `LinkRule.kinds`, a builders' grille reading `gated`. Neither element moves: the sewer's course and hydraulics are never
  bent. Where the plan bands intersect and the vertical gap is above 0 and at most `links.overlapShaftM`, a `shaft` link at
  `links.overlapShaftChance`: the fixed-key draw (§6.1) keyed by the pair. *Mine breach:* a mine working whose wall lies
  within `breachM` in 3-D of a cavern gallery joins it by a `heading` gallery in the quarry part along the straight 3-D
  segment (floor graded at most `digMaxGrade`, a `stair` link where steeper), with a `breach` link of kind `open`, cause
  `mineBreach`, at the cavern end; the working's shaft is then the cave's access by transitivity. *The village working
  (V07 §3.16 (4); J-V4.113):* at a village rung, where no `quarry` system exists, each mining use's outside-plot working —
  at T2b every one, with a scope those in `scope.workings` — is tested against the `cavern` and `ruin` elements whose plan
  band lies within `breachM` of the working's plot ring and whose top lies at most the working's `mine.workingDepthM` row
  (V07) below `levelledGroundCm` at the plot's centroid; the nearest such element of each void system (plan distance, ties
  by address) takes an `AccessPoint` at the working — kind `shaft`, role `access`, source `dig`, `knownTo: 'local'`, state
  `open`, its `ground.host` the working's plot face and its `ground.at` the plot's pole of inaccessibility, its
  `access_point` vertex on the element's kerb or wall nearest below it — cause `{ rule: 'mineBreach', system: <the void's
  system>, event }` (0 at generation, the epoch's `seq` with a scope), and no link record, the working being no system. It
  is keyed, and so idempotent, by (the working's lineage, the element's lineage), and draws nothing; at V07's hand-off up the
  working becomes a quarry source by V04 §3.5.3 and the access is kept. **The same overlap test runs wherever a system
  grows** (g item 109 (j) (3b)): `SewerStrategy.extend`, a catacomb's growth, a new quarry, mine or chain working, U-DIG's
  passages, a lifeline, and an edit that draws or deepens an element — each in its own commit, recording its cause.
* **(b) Proximity links (II.7.6 (2)–(4)).** For each pair of parts (a < b) and each element `e` of part a — tunnels,
  galleries, chambers, open or closed — samples every 5 m of its centreline or outline query part b's static index for
  elements within `linkReachM` in plan whose floor lies within `linkDepthM`; per element pair the stations are taken
  greedily along `e`, each at least `linkSpacingM` beyond the last and beyond any link (a) made; at each, one uniform on
  `sewer` keyed by (the two elements' lineages, the station ordinal) against the pair of kinds' chance (II.7.6); its kind by
  the weights, `flooded` only where both floors lie below the water table; its `via` by the floor difference — ≤ 100 cm
  `breach` (`door` where an end is an underground building's wall), ≤ 300 cm `stair`, else `shaft`; `knownTo` by II.7.6 (4);
  cause `proximity`. Its two `link_end` vertices land on each element's kerb or wall at the nearest points, one transaction
  per part (§3.4). An element shorter than one 5 m sample takes one sample at its midpoint.
* **(c) Crypt joins (g item 109 (k) (2)).** A church-class building on ground part 0 (never a sky-layer building, V04 §1.2;
  its class's crypt column `always` or `basement`) with `Basement.crypt` (item 238: derived with the basement at S11, so it
  exists at generation without any plan elaborated) whose crypt ring lies over a catacomb element in plan, or within
  `accessReachM` (II.7.6) of one, draws once per (church, complex) pair: the fixed-key draw (§6.1) keyed by the pair (the
  one mixer over the church's and the complex source's lineages, as (b)'s pairs are), so a join first reached by an epoch's
  growth gives the answer a regeneration gives; its chance `cryptJoin.own` when the complex's source is the church's own
  churchyard, else `cryptJoin.other` (V11 §3.23.8). A success makes an `AccessPoint` from the crypt, source `crypt`, cause
  `{ rule: 'crypt', system }`: kind `door` where the element's floor lies within `stairDropCm` of the crypt floor, else
  `cellar_stair`; its head stays in the crypt (V03's `AccessHostRow`: catacomb with cause `crypt` → crypt). The join
  replaces item 64's draw for that pair. A building without `Basement.crypt` draws nothing. A church-class building's only
  way to a catacomb is this join: L3 gives it no basement access to a catacomb element, and no catacomb access of source
  `system` is headed in it (V04 §3.5.1 (9); V03 §3.7.2 (6)). Catacomb galleries under a church keep `foundationClearM`
  below its basement floor; a crypt is joined only by this access, never cut. The join set is a function of the basements
  and the complexes alone, never of an elaborated plan (T-V4-50).
* **(d) Dig from above (g item 109 (j) (3) (i), (j) (5)).** Every ground building (on ground part 0; a raised-way pier is no
  building and never a dig host) whose footprint overlaps in plan a cavern, ruin or former-settlement element whose top lies
  below the building's **dig floor** — its basement floor (II.7.6's basement floor, §2.6) where it has a basement, else its
  `baseCm` — or whose basement ring lies within `DigRule.planReachM` in plan of one, draws once per void kind: the
  fixed-key draw (§6.1) keyed by (the building's lineage, `dig`, the void kind), in this stage, its key carrying the wing
  key of a wing V02's mutator adds (V02 §3.9 W6) — the building's lineage already carries the epoch that built it (§6.3).
  `p = min(cap, classRow(class) × basementFactor × depthFactor(d))`, `classRow` by the building's class (V11 fills every
  class by its family), `basementFactor` with a basement and 1 without, `depthFactor(d)` 1 for `d ≤ reachM`,
  `exp(−(d − reachM) ÷ decayM)` beyond and 0 beyond `maxM`, `d` the vertical distance from the dig floor to the element's
  top (the values V11 §3.23.7's). The footprint and basement floor are V02's (V02 §3.14.5 (f)). A success makes an
  `AccessPoint` to the shallowest such element under the footprint, source `dig`, cause `{ rule: 'dig', system, event }`: a
  `cellar_stair` where the building has a basement and the drop lies within `stairDropCm`, else a `shaft`, and a `well`
  where the plot's well pin stands over the element; its head in the basement (V03's access head). The draw is compared at
  every derivation: an access once made persists (removed only by V04 §3.10's host closures), and one not yet made appears
  when the building's chance later rises above its draw (a basement added, a deeper void reached) — so more buildings,
  deeper cellars and more digging raise the chance of access as the settlement grows, and a building draws once per
  void kind, plus once for each wing V02's mutator adds over a void (a `MutationPlan` step or a rung-3 op), its key
  carrying that wing's key, never twice for one key (V06 §3.18.1 (2a); T-V6-34). Item 109 (d)'s "chance raised over a
  ruin" is this row.
* **(e) Public openings (g item 109 (j) (3) (ii)).** Each candidate V04 §3.5.2, V04 §3.5.0a and V04 §3.5.5 (b) name, in this order —
  a `sinkhole`, a `mouth`, a `skylight`, a `collapsed_shaft` over a quarry, mine, ruin or former-settlement chamber under a
  square, a square or green block (V04 §1.2) or a field face with cover ≤ 15 m, a `ruin_entrance` at the ruin's marker —
  draws its `UnderOpeningRow.chance` (V11 §3.23.7): the fixed-key draw (§6.1) keyed by (the candidate element's lineage, the
  opening kind). A success makes an `AccessPoint` of that kind (item 554), source `opening`, role `access` (a `skylight` is a
  `mouth` of role `light`), cause `{ rule: 'opening', system }`, `knownTo: 'public'` (a `ruin_entrance` `local` unless the
  dossier says the ruin is known).
* **(f) Reuse (g item 109 (d)).** An element of one part adopted by another system keeps its place, part and kind and takes
  `reusedBy: { system, since }` (item 249), with one link of cause `reuse`, `via: 'breach'`, at the adopting system's
  nearest element; the adopting system counts its area in its extent and draws it with its own program as an overlay, so
  nothing is laid twice. The sewer adopts an ancient drain after the fact: a ruin main street carrying its drain takes
  `reusedBy` the sewer where a laid run's centreline lies within `links.reuseM` of it for at least `links.reuseMinM`, its
  floor falls in the run's flow direction at ≥ `minGradient`, and its crown depth is at most `coverMaxCm` — the run keeps its
  own record and course, so the rule never works against hydraulics. A catacomb's tomb reuse and the quarry ossuary's
  adoption are made by U-SYS and recorded the same way. A well pin whose shaft — to the water table plus 100 cm — passes
  through a ruin, cavern or former-settlement chamber is always an access: kind `well`, source `dig`, cause `dig` — at every
  rung, V07's village `well` and `pump` pins being this same pin record (V07 §3.16 (3) (ii)). A buried chamber within
  `linkReachM` above a ruin chamber takes a `stair` link at the `any–buried` chance.
* **(g) The excavation reading (g item 109 (j) (2)–(4); g item 113 (e); J-V4.53, J-V4.122).** `excavation(doc, cluster)` returns the
  cluster's state in the access-state set (V04 §2.2) for every cluster — a connected component of a part's open galleries
  and chambers, joined at junctions and chamber walls — of a `cavern` or `ruin` part and of the `buried` part's former
  settlement.
  1. **Only open paths count (g item 113 (e)).** The connection graph's nodes are the clusters of every part and the
     surface; its edges are the **passable** joins: links of kind `open`, `gated` or `secret` and access points in state
     `open` or `locked`, each only while both its elements are open (no `closure`). A gate, a lock and a secret door are
     passable to those who hold the key or know the way — the squatters, the cult and the thieves among them — so they
     count; a link of kind `collapsed` or `flooded`, a `bricked` access, an access reading collapsed (its element closed,
     II.6) and every closed element — a sewer sealed or caved in, a cellar filled, a building above lost — break the path.
     The reading is physical and one per document: which viewer sees a secret way is the knowledge filter's (§9.2, §8.1
     item 7; T-V4-21), and dwellings, capacities and digests never depend on the viewer.
  2. **The states.** A cluster is `accessible` when the graph joins it to the surface — transitively, so opening one void
     can open those beyond it; `lost` when it is not joined and at least one of its elements stands in its system's
     `ExcavationRecord.reached` (it was reached before and every open path since closed); `unexcavated` otherwise. A part
     of any other kind is always `accessible`: the sewer, catacombs, quarries, vaults and dug passages were dug from the
     surface, and a raised grade's or a scar's buried town is entered from the cellars above (V04 §3.5.5 (a)).
  3. **The memory.** In the commit whose reading first makes a cluster `accessible`, each of its elements not yet in
     `ExcavationRecord.reached` is entered (in address order); an entry leaves only with its element or with the undo of
     the commit that added it (V04 §2.6). So a cluster found and then cut off reads `lost`, and the undo of the finding
     itself returns it to `unexcavated`.
  4. **Refound.** A `lost` cluster turns `accessible` again in the commit that restores a path: a `reopen` of the sealed
     sewer, a new dig or crypt join, a new public opening (a collapse), a new overlap link from a growing system, or the
     user's excavation (`placeAccess`, V04 §4.1).
  5. **Its dwellings.** In the commit (or the epoch batch) in which a cluster turns `lost`, every dwelling plot on it (F6's,
     an undercity neighbourhood's) takes `existence: 'abandoned'`, cause `rule:void-lost`, as II.7.3's lifecycle abandons a
     closed run's plots. At an epoch, a cluster turned `lost` at the `decline` step (`under.fade`) returns its households
     to V06's ledger as displaced, cause `void`, and they are re-housed at `siting` the same epoch; a cluster turned
     `lost` in an `afterGrowth` participant's commit (`under.extend`'s foundation or arch-vault collapse, `under.access`,
     `under.undercity`), after `siting`, has its households re-housed inside that participant by §4.7's overflow pass,
     counted `households.undergroundVacated` and never left for the epoch's `close` (V06 §3.18.1 (4), (6); J-V4.128). At
     an edit they are listed as the dry run's `displaced` effect (§11.2). When the cluster is refound, its
     abandoned plots whose rings still exist are `resurrect`ed (§2.8) in that commit, empty, and households return at the
     next placement: V06's relocation at the next epoch (V04 §3.10), or F6's allocation at a re-derivation. An `unexcavated`
     cluster never holds dwellings (V04 §3.4 F6).

  It is derived, never stored, but for `ExcavationRecord`: a union-find over clusters, recomputed after every commit that
  touches an access, a link, an element's closure or a building over a void, for the clusters that commit touches, and
  cached by the underground's digest. A document saved and loaded reads the same states (the reading is a function of the
  records and `ExcavationRecord`; T-V4-76 (c)). V12's `undergroundInputOf` reads both `unexcavated` and `lost` as
  `state: 'unexcavated'`: sealed to the inhabitants.

**Determinism.** Item 64's basement draw stays in U-LINK (T5); the dig draws are U-ACCESS's; the two stages' stream keys
differ by their stage id (§6.1), and within U-ACCESS each dig key — the building, the void kind and, for an added wing,
its key ((d)) — has its own salt, so no draw's value depends on another rule's presence. Every key is listed in
V04 §3.12.

**With a scope.** `AccessPassStrategy.run(doc, rules, ctx, k, scope?: EpochScope)` (II.7.6): without a scope (T2b) it runs
(a)–(g) over the whole document;
with V06's scope (`under.access`, `afterGrowth` 20) it runs (a), (b) and (f) over `scope.elements` and (a)'s village-working
test over `scope.workings`, (c) for the pairs whose catacomb element is in `scope.elements`, (d) for the buildings of
`scope.built` and `scope.basementGrown`, (e) for the candidates among `scope.elements` and under the faces of
`scope.surfaceChanged`, then (g) — the `lost` transitions and their vacated plots included. Every step is idempotent — a link
or access found by its creation key is kept, never made twice — so running it after `under.extend`'s own overlap tests adds
nothing twice, and each made access or link records `event` = the epoch's `seq`. With an empty scope it runs (g) only. Its
last step is V01's opening pass over the public openings (e) made (V04 §3.10 *The opening pass*).
=== END ===

=== REPLACE ### 3.10 U-FADE and the underground at an epoch (item 11; J-V4.28 – J-V4.30) ===
### 3.10 U-FADE and the underground at an epoch (item 11; J-V4.28 – J-V4.30)

The evolution engine owns the epoch; these are the underground's parts it calls (item 319), usable by hand now. V06
schedules them over epochs (the links' re-binding, excavation, ruin decay, catacomb growth). **Their callers** are V06's four
participants (V06 §3.2; V04 §1b.2), each registered with `stage: 'U-FADE'` (V06 §2.1's `EpochParticipant.stage`):
`under.fade` at `decline` (order 10) runs `UndergroundFade`; `under.extend` at `afterGrowth` (order 10) runs
`Foundations.apply` over the epoch's scope (V06 §3.18.1 (6)), then the arch-vault reconcile, then `SewerStrategy.derive`
the first epoch `Features.sewers` turns on (else `.extend` with its wall drops), then `CatacombGrowth.grow` with its `opts`,
then `QuarryWorkings.extend`; `under.access` (order 20) runs `AccessPassStrategy.run(doc, rules, ctx, k, scope)`;
`under.undercity` (order 30)
runs `UndercityEpoch.reread`, then F6, its new dwellings filled by V06's relocation (below). On the grow-by-stage path V04's
own M4 hooks call the same functions without V06's scope and `opts`. The history replay's coarse epochs run the same
participants (§4.11 *History-first generation* (2)), and `BuriedFormer.lay` inside the batch of a burial epoch (V04 §3.5.5
(b)).
* **`UndergroundFade.candidates(doc, epoch)`** — every tunnel, gallery and chamber neither locked nor pinned — an arch vault
  excepted, whose condition follows its span (V04 §3.5.4 (d)) — in use, neglected or partly caved in, whose dwell band has
  run (§4.11's tunnel dwell, from its last condition change), with weight `w = E_u · rate(underground) · u · neglect`: `E_u`
  the mean of §4.11's exposure field over the ground points above the element every `sampleM` (II.6: "the exposure of the
  ground it runs under"); `rate` the `underground` persistence row (§4.11); `u` the underground lottery's draw on
  `epoch.transform` keyed by (the element's lineage, the epoch); `neglect = 1 + neglectGain × (1 − usage)`, `usage` ∈ [0, 1]
  the share of a run's served and fronting plots that are occupied, of a lived system's plots that are occupied, 1 for a
  catacomb whose burial face is open (a stagnant one included) and 0 for one whose face is closed, 1 for a vault whose way is
  live, a ruin or former-settlement cluster's its dwellings' occupancy (0 while sealed), 0 for an unlived cavern or quarry.
  A ruin element's weight is further × `RuinRule.fadeFactor` (V04 §2.3's fade rows). An element shorter than one `sampleM`
  takes one sample at its midpoint.
* **`UndergroundFade.apply(element, epoch)`** — the op drawn on `epoch.transform` from `UndergroundFadeRule.ops` at the
  element's class and condition, a seal's weight × `(1 + orderGain × (1 − disorder))`; a run longer than 120 m is struck on
  a 120 m stretch centred at its most exposed sample (II.6's stretch split), so cave-ins are local. A catacomb gallery that
  silts, caves in or is sealed stays in its complex's extent and in `extentFloorM2` (g item 109 (k) (4)).
* **Its own lottery (J-V4.103).** The underground's strikes are drawn by this lottery at the evolution engine's `decline`
  step, after the fabric pool (V06's `under.fade`), at the underground's rate: never in the fabric pool, never counted
  against a district's `fabric` cap and never in the pool's persistence order (item 319; V06 §3.5.2). A strike that closes
  the last open path of a lived cluster turns it `lost` and vacates its dwellings in the same batch (V04 §3.5.7 (g) (5);
  V06 §3.18.1 (4)); a later `reopen`, dig or overlap refinds it and dwellings return at the next placement.
* **`Foundations.apply(doc, scope, cause)`** (`under.extend`, its first act; J-V4.109) — V04 §3.5.0's rule over the epoch's
  new footings (V04 §3.5.0, *At an epoch*), at every rung; it returns `FoundationsResult` (V04 §2.4): the collapsed
  elements, the pillars and the void households vacated on collapsed floors, which V06 re-homes inside the participant
  (V06 §3.18.1 (4), (6)); a catacomb node a new footing refuses records `blockedBy: 'foundation'` at the next growth.
* **`SewerStrategy.derive` at the first sewers epoch.** The first epoch whose prelude turns `Features.sewers` on (V06 §3.2,
  *The feature set at an epoch*), `under.extend` runs U-NET whole (N0–N12) over the current ways as the epoch's mutation
  instead of `extend`: part 0 is laid on the sewer's empty part; N3a's declarations are honoured; every existing entity —
  another system's elements, the accesses, the links, the ground — is kept and never re-derived; N8 connects the plots of
  `R`; the new runs join `EpochScope.elements`, and U-ACCESS (a)'s overlap test runs over them in the same commit (a run
  crossing a sealed void opens it, cause `overlap`, `event` the epoch's `seq`). V06 reports it (`under.featureOn`).
  Sewer-front dwellings follow through the crowding hook (below).
* **`SewerStrategy.extend(doc, epoch)`** — `under.extend` at every later epoch; on the grow-by-stage path, after the new
  stage's S11: N1–N6 over the current ways with N3a's declarations, every node under an open existing run a root of cost 0
  beside the outfalls, existing runs never re-derived; a tree path over an edge under a closed run `reopen`s that run
  (regrowth-first, II.6; g item 113 (d)) before any new run is made; new runs' inverts fall into their receiver's; N8 for
  the new plots only; then U-ACCESS (a)'s overlap test for the new runs (a new run crossing a sealed void opens it, cause
  `overlap`, event the epoch). **The wall drops:** over V06's `EpochScope.levelled`, each existing run whose centreline
  crosses a `RetainingWall` the epoch made or re-derived takes N6's two wall-crossing vertices, and N7 re-lays the connected
  network's knots, its plan unchanged (as a depth offset re-lays them, J-V4.15).
* **`ArchVaults.reconcile(doc, EpochScope.raised, epoch)`** (V06's `under.extend`) — in the epoch's commit, over every
  raised way whose `feet`, `supports` or `spans` the epoch changed (V06 §2.1's `EpochScope.raised`): lays the arch vaults
  of the `vault` spans of a raised way the epoch founded or repaired (a town becoming a city), collapses those whose span
  or a bounding support reads `ruined` or `cleared`, or whose span V06 breached or dismantled (V04 §3.5.4 (d) (2); a
  landfall's ruin included), re-lays those of a raised way whose deck the frame growth extended (the old deck's stations
  and spans kept, §2.7's support step (7); §3.2 (9): a new `vault` span's vault laid, one whose span is gone or `open`
  deleted), and deletes those of a removed raised way, with their links and accesses;
  the new chambers join `EpochScope.elements`, so the access pass tests them in the same epoch (g item 109 (j) (3b)).
* **At a village rung** the maintenance mode (V04 §3.1) makes U-FADE, the foundation rule (`Foundations.apply`: a new footing
  collapses what it meets, at every rung), the arch-vault reconcile and the undercity's re-read the only changes an
  inherited system sees: nothing grows, nothing new is laid; the access pass still tests the caverns, ruins, openings and
  the village workings (V04 §3.5.7 (a)).
* **`CatacombGrowth.grow(doc, epoch, opts?)`** (`under.extend`, after the sewer's extension) — each complex's ratchet step
  (V04 §3.5.1 (5)–(8)) at the epoch, bounded and held as V04 §3.5.1 (5)–(6) state; each new gallery joins
  `EpochScope.elements` and runs U-ACCESS (a)'s overlap test and (c)'s crypt join for a church whose crypt it first reaches
  (V06 §3.18.3 (6)). A complex it founds lays its entrance `stair` (V04 §3.5.1 (9)), and its last step is V01's opening pass
  over that entrance (below).
* **`QuarryWorkings.extend(doc, scope, epoch)`** (`under.extend`, after the catacombs' growth) — V04 §3.5.3's new workings of
  the epoch's stone, mining uses and chains, each commit with its overlap test and mine breach; `workedOut` is read at every
  epoch (V04 §3.5.3).
* **`UndercityEpoch.reread(doc, epoch)`** (`under.undercity`, order 30; then F6 over the clusters `under.access` made
  accessible this epoch) — II.7.5 (5)'s size re-read past `hysteresis`; a shrinking neighbourhood vacates its plots farthest
  (walkway distance) from its core first; a new neighbourhood opens only in free capacity and only in an accessible cluster;
  when `disorder` < `clearanceDisorder`, each neighbourhood draws clearance at `1 − (1 − clearancePerYear)^years` on
  `epoch.transform` keyed by its lineage, at most one `clearUndercity` per epoch, in address order.
* **Access at an epoch (g item 109 (j) (3)–(4); g item 113 (e)).** `under.access` runs
  `AccessPassStrategy.run(doc, rules, ctx, k, scope)` (V04 §3.5.7, *With a scope*): each building the epoch builds, or
  gives a basement, over a cavern, ruin or former-settlement element draws U-ACCESS (d)'s dig draw; the excavation reading is recomputed; a cluster that became `accessible` takes F6's
  new dwellings (V04 §3.4 F6's cut and arrangements), filled by V06's relocation of the district's poorest-band ground
  households (V06 §3.18.1 (4)) — never by S7b (6), whose allocation at an epoch is the crowding hook's alone and runs before
  this pass (below); one that turned `lost` in this pass — its last open path bricked, collapsed or deleted after the
  `decline` step — vacates its dwellings and undercity plots by V04 §3.5.7 (g) (5), as fates of the epoch, its households
  re-housed inside `under.access` (the `afterGrowth` case there; one that `under.fade` closed was vacated at `decline`, its
  households through V06's ledger).
* The crowding hook (II.7.3 (c); V06 §3.6 (1)) sends its households through S7b (6)'s underground allocation at the epoch
  (item 574), at `growth`, before `under.access`: U-FRONT places them on the lived runs first, then on reopened ones (both
  only where `Features.sewers` is on), then in the free capacity of the void clusters accessible before this epoch's access
  pass (F6; V06 §3.6 (1)). They are new households, part of the epoch's target; F6's new dwellings in a cluster the pass
  opens take relocated households only (above), so ground, underground and sky households equal the target (T-V4-72 (f)).
* **Access closures (item 64 (c); item 555).** An access point's own state changes only with its host, at the epoch or edit
  that changes the host: a basement access whose building's use turns to a class whose `undergroundAccess.prob` is 0 at its
  band becomes `bricked` (stored, cause `convert:<the use op>`); one whose building is demolished or whose basement is
  removed is deleted with its host (§2.8); a street grating or stair whose ground host is re-hosted by `pointLocate` onto
  ground II.7.3 does not admit (a footprint over a former street) becomes `bricked`; an access whose ground host a landfall
  covers — its ground point in a member of a `fallen_island` decoration (a covered way, plot, land use or reservation;
  V05 §3.16 (4)–(5)): a grating, a street stair, a public opening, a catacomb stair — becomes `bricked`, cause
  `convert:fallIsland`, until the batch in which that host leaves its `fallen_island` decoration — whichever op ends its
  cover, at an epoch or by hand (V06 §3.5.2, V06's member-leaving batch) — when it returns to `open` (`locked` where its
  `knownTo` is `secret`); a basement or dig access whose building the landfall demolishes is deleted with its host (above);
  a secret access whose building's concealed use relocates stays, `locked`, its `knownTo` unchanged. The `collapsed` and
  element-sealed readings stay II.6's derived ones. Each closure that ends a cluster's last open path turns it `lost`
  (V04 §3.5.7 (g)).
* **The opening pass (J-V4.106) — the one list of the commits that run it.** V01's opening pass (V01 §3.7.1) runs only while
  `@plat/hood`'s local-place step is registered and runs — while `fabric.extensionWeight` > 0 (V01 §3.15); the registration
  is V04 §8's registry lookup, and with either missing no opening place is made and their count is reported (V04 §3.11). It
  selects the public openings of source `opening` and role `access` and each catacomb system's entrance `stair`, and it runs:
  1. at a T6 over every access it selects — at generation's T6 (V04 §3.1) and at the T6 of the tail that follows a
     re-derivation (V04 §4.3's `adjust` and switch rows);
  2. at an epoch, as the last step of `AccessPassStrategy.run` with a scope (over its (e) openings) and of
     `CatacombGrowth.grow` when it lays a new complex's entrance;
  3. in an edit, in the commit of: a `delete` of a selected access; a `setAttr` of its `kind` or `role`; a `placeAccess` that
     makes a public opening (V04 §4.1); the `delete` of a gallery or chamber that carries a selected access (the access
     removed with its element, a fate of the commit, its place tombstoned); a `regenerate` (New random) of a `cavern`,
     `ruin` or `quarry` system — the systems whose elements carry opening candidates (V04 §3.5.7 (e)) — which removes the
     old elements' openings with them, re-runs U-ACCESS (e) over the regenerated elements' candidates (keyed by the new
     elements' lineages), recomputes the excavation reading, then runs the pass over the openings made and removed
     (J-V4.115); a dwelling declaration's closure whose second or third rung makes a public opening (V04 §3.8), over that
     opening; and the re-derivation that an `editTable` or `editPreset` of V01's stage-2 switch `fabric.extensionWeight`
     makes (V01 §3.15, *The switch's edit*), at its T6: raised above 0, the places made; lowered to 0, none made and the
     old ones retired by §6.3's carry-over (J-V4.121).

  A made access gains its `HoodPlace`, named on `naming` by V01 §2.8's key in the same commit; a removed one, or one
  re-kinded out of the selection (its `role` set to `light`), tombstones its place (V01 §2.7); a kind changed within the
  selection re-derives the place's subtype; each is a fate of the commit. A state change (`bricked`, `locked`, the landfall
  closure) changes the place's symbol, never the place.
=== END ===

=== REPLACE ### 3.11 Failure handling (no whole-map retry; §5) ===
### 3.11 Failure handling (no whole-map retry; §5)

| where | detection | ladder | report |
|---|---|---|---|
| U-NET outfalls | no admitted candidate on a bank (V04 §3.2 N2, N3) | that bank's moat candidates → its field outfall → its gutters and pits where its stretch of `R`'s boundary is empty or lies wholly on water, or where every stretch cell's D8 path enters a water face before it reaches beyond the outermost enceinte's outer strip (V04 §3.2 N2; F-NET's truncate rung) | `requestedVsBuilt`: "sewers discharge to the town ditch / a cess field"; the unsewered hectares |
| U-NET runs | crown deeper than `coverMaxCm` | re-route ≤ `maxReroute` → truncate to a local root → gutters and pits | F-NET counts, unsewered hectares |
| U-NET drains | a drain's head too deep | the drain dropped, the plot unconnected | the count |
| U-NET wall crossing | the fall across a wall beyond `minGradient` | the drop (V04 §3.2 N7 (3)); a climbing run's cover by the `coverMaxCm` ladder | F-NET counts |
| U-FORECAST vs built | capacity missed | S10b's reconcile, F-SITING (II.7.3) | the miss in households |
| U-FRONT plots | a sample under excluded ground | F-UNDER (II.7.3) | per rung |
| U-FRONT, U-CITY | households the built voids cannot seat | `crowdCap` occupancy → the other underground allocations → T8 (never a ground re-placement by these stages) | the households moved, by step |
| U-SYS | no admissible ground in the band | a smaller extent → the system omitted (F-VOID) | per system |
| U-SYS ruin | a plan too like the town above | the next culture rows (≤ `distinct.retries`) → the axis turned `distinct.rotateDeg` → kept, `W_RUIN_SIMILAR` | the record's `attempts` |
| U-SYS ruin | its dossier source removed | the system kept whole, `source.ref` cleared (V04 §2.6) | `W_RUIN_SOURCE_REMOVED` |
| U-SYS ruin monument | an ST0-infeasible region; a `TierFailure` | `clearM` halved once → the chamber without a monument, `W_RUIN_MONUMENT_SKIPPED`; a `TierFailure` truncates to the tiers laid | the count; `lay.truncated` |
| U-SYS catacomb | a face failing a gate; growth blocked | the next face in rank order; stagnation (`fill` rises, `blockedBy`) | per complex |
| U-SYS forced vaults | the ground refuses the shallow grid | the floor steps below `surfaceClearCm` and the grid grows again | the step |
| U-SYS arch vault | no open face for its door; an inset rectangle below `minEdge` | the vault laid walled up, no door, `W_ARCH_VAULT_NO_DOOR`; no chamber for a degenerate span | the count |
| U-SYS terminal cistern | no yard or public ground takes it | the square shrinks in 10 % steps to 150 m² → skipped, `W_TERMINAL_CISTERN_SKIPPED` | the count |
| U-SYS quarry at an epoch | the stone cells within `reachM` run out before the epoch's `ΔV` | the rest from the surface quarry (a `quarry` land use without a `source`) | the unmet m³ |
| U-SYS buried former settlement | no element of `former` passes V04 §3.5.5 (b)'s filters | nothing laid, `lay` returns null | `W_BURIED_FORMER_SKIPPED` |
| U-ACCESS, U-LINK | a link end with no admissible vertex | the link skipped | the count |
| U-CITY | a void, a core, a lifeline missing | C1's read-only test: the cluster is not a candidate → fewer neighbourhoods → none (F-VOID; never under `require`) | per neighbourhood |
| U-LINK L5 | a basement access, a connector or an outlet missing | the next rung → the cellar chamber (always), `flooded` on wet ground (`W_SUBTERRANEAN_WET`) | the rung used |
| T8 | ground capacity short | vacant stock → occupied stock to capacity → reported, counted | `requestedVsBuilt` |
| U-DIG | a basement, a route or a stage missing | the nearest lawful form or the refusal (F-EDIT, §7.3 item 9 (e)); in a dwelling closure's first rung a building whose connector is refused is passed over for the next, then the base's opening rungs and its bend (V04 §3.8) | in the dry run |
| `Foundations.apply` at an epoch | a new footing over a lived void floor | the floor collapsed, its dwellings vacated and returned for V06's re-homing (V06 §3.18.1 (4)); never a discard | V06's `under.collapsedByFoundation` |
| the opening pass (T6 and the commits of V04 §3.10) | `@plat/hood`'s local-place step not registered (M6-U built beside M5, V04 §8); or registered with the stage-2 switch `fabric.extensionWeight` at 0, so that the step does not run (V01 §3.7.1, V01 §3.15) | no opening place made, the underground kept whole; unregistered, the first tail run after it registers makes them, a declared shift (§13.3); switched off, they are made at the T6 of the re-derivation that an `editTable` or `editPreset` raising the switch above 0 makes (V01 §3.15, *The switch's edit*), fates of that edit (V04 §3.10; J-V4.121) | the count of unplaced openings, the line naming its cause (the step unregistered, or the switch at 0) |

Degenerate geometry follows §5.1 (9) everywhere: each stage's class is the ladder column of V04 §3.1's table, and an
edit's is F-EDIT (§7.1's outcome table).

**The edges of every mechanism.** Each row states the outcome at the mechanism's extremes (E1 no input, E2 one item, E3 the
maximum and its caps, E4 degenerate geometry, E5 missing, empty or contradictory data, E6 every rung, E7 every toggle and
preset, E8 save, load, undo, redo, regenerate and migrate), where its home section does not already state it, its failure
rung and its test (J-V4.124). No edge ends in a crash, a hang, lost data, a silent wrong result or a whole-map retry.

| row | mechanism | edges and outcome | rung | test |
|---|---|---|---|---|
| UE1 | the records (V04 §2.2) | E5: `RuinRecord.source.ref` null and `marker` null are valid states; an absent `name` is drawn by S13a; an empty `tombstones`, an absent `blockedBy` (not blocked) and an empty `ExcavationRecord.reached` (never reached) are valid; a record naming an id the document no longer holds is dropped at load by §7.5's schema check and reported. E8: V04 §2.6's rows | check → leave out and report | T-V4-79 (a), T-V4-33 |
| UE2 | the rule tables (V04 §2.3) | E5: an `editTable` leaving a cell out of its range or empty is refused by §7.6's validation, naming the cell; a class and condition with no fade row is no candidate; an `openings` kind with no row reads `widthCm` 0 and transmits no light. E8: a table edit is an event with §7.4's `editTable` row; an older document reads the shipped defaults | check | T-V4-79 (b) |
| UE3 | the dossier row sets (V04 §2.3a) | E5 as V04 §2.3a's *Edges*; E8: a dossier event re-evaluates the matches by §7.7 item 5's least-disruption mutation; the row sets are shipped, never edited | check → leave out and report | T-V4-38 |
| UE4 | the transients (V04 §2.4) | E5: V04 §2.4's closing sentence; E8: never persisted, recomputed | — | T-V4-79 (a) |
| UE5 | identity (V04 §2.5) | E5: key collisions and gone sources as V04 §2.5 states; E8: keys are lineage hashes, stable through save, load and every re-derivation (§6.3) | — | T-V4-30, T-V4-79 (a) |
| UE6 | the lifecycle rows (V04 §2.6) | E5 and E8: each row's `absent` column is its missing-data rule; a round trip of every field (save, load, undo, redo) is byte-identical | — | T-V4-33, T-V4-79 (c) |
| UE7 | the tail (V04 §3.1) | E1: empty inputs commit nothing and report zeros; E2: one district, one run, one void lay as many; E3: the METROPOLIS caps and budgets are V04 §6's; E4: §5.1 (9) on the table's ladders; E5: no dossier reads the recipe; E6: the rung set of V04 §3.1; E7: the parity presets (T-V4-35), the Sewers and ruins toggles (V04 §4.3's `adjust` row); E8: a replay runs the tail at the same fold position, byte-identical | each stage's ladder | T-V4-30, T-V4-35, T-V4-43, T-V4-75, T-V4-79 (d) |
| UE8 | U-NET (V04 §3.2) | E6: N0's rung gate — never below TOWN, at TOWN by the draw or the dossier, always at CITY and METROPOLIS, an inherited network in maintenance mode | — | T-V4-79 (e), T-V4-35 |
| UE9 | U-FORECAST (V04 §3.3) | E1–E8 as V04 §3.3 states (gates, the all-zero record, the standalone line, never persisted) | — | T-V4-8, T-V4-75, T-V4-79 (f) |
| UE10 | U-FRONT (V04 §3.4) | E1: F0's gate — no allocation or no open navigable run commits nothing but F6; E4: a kerb edge below `minEdge` is no frontage, a degenerate cut takes F-PLOT's ladder; E6: F0–F5 at TOWN and above where navigable runs exist, F6 at every rung | F-PLOT, F-UNDER | T-V4-9, T-V4-79 (g) |
| UE11 | U-CITY (V04 §3.6) | E1: `n` 0 or no candidate forms none (never under `require`); E2: one neighbourhood takes all of `H` up to its capacity; E4: a carve the kernel refuses makes the cluster no candidate, a walkway edge below `minEdge` is dropped; E5: `require` with no void → the forced vaults, `forbid` → U-CITY does not run; E6: TOWN and above, re-read below; E8: V04 §3.6's closing paragraph | F-VOID | T-V4-18, T-V4-37, T-V4-79 (h) |
| UE12 | the cross-arena distance (V04 §3.6a) | E5: no admissible access reachable → +∞, read as out of reach | — | T-V4-60, T-V4-79 (i) |
| UE13 | U-LINK (V04 §3.7) | E4: a lifeline point the kernel refuses takes L1's next candidate, then the lifeline closure; E6: V04 §3.7's closing sentence; E8: generated pieces re-derive with their owner, edit pieces are held, L5 pieces released by the dossier (V04 §3.7 L5) | F-VOID | T-V4-34, T-V4-79 (j) |
| UE14 | T8 (V04 §3.7a) | E1: nothing to seat writes nothing; E2: one household to the first building of the order; E4: no geometry is written; E6: at every rung | F-SITING | T-V4-3, T-V4-79 (k) |
| UE15 | U-DIG (V04 §3.8) | E1: no target and no outlet → §7.3 item 9 (e)'s refusal with its reason; E2: one qualifying building digs, no alternatives listed; E4: a connector path the simplification would collapse to one cell is a direct access; E5: a missing basement takes §2.6's requested-mode ladder; E6: every rung, an outlet kind with no candidate skipped; E8: held and generated pieces as V04 §3.8's *Keys* | F-EDIT | T-V4-22, T-V4-48, T-V4-79 (l) |
| UE16 | light rows (V04 §3.9) | E1: no host → no light; E2: one host takes its row's count; E5: a missing circumstance reads `none`; E6: at every rung where the host exists; a ceiling under 60 cm takes none | — | T-V4-26, T-V4-79 (m) |
| UE17 | U-FADE (V04 §3.10) | E4: a run of 120 m or less is struck whole; a stretch split the kernel refuses strikes the whole run | — | T-V4-23, T-V4-79 (n) |
| UE18 | the failure ladders (this section) | every row's ladder on a fixture forcing its detection | — | T-V4-79 (o) |
| UE19 | determinism (V04 §3.12) | E4: a kernel refusal is deterministic on the same key, so a replay refuses the same entity; E5: every entity has a lineage (§6.3), and a fixed-key draw whose subject is gone is never re-drawn for another | — | T-V4-30, T-V4-79 (p) |
| UE20 | declarations (V04 §4.1) | E1: a form short of its points commits nothing, the tool waiting for its next point; E2: `drawChamber` with one point takes the size; E4: coincident or collinear points make no shape, the form staying open (no degenerate shape reaches a commit); E5: a point on the sky layer or a raised deck reads ground part 0; E7: with Ground the working layer the tools act on the ground (T4 draws a way), the underground hidden or shown; with Below the working layer they act Below, a hidden underground drawn in that view (§8.4); E8: §7.4's rows | F-EDIT | T-V4-36, T-V4-79 (q) |
| UE21 | attribute paths (V04 §4.2) | E3 and E5: a value outside its range is bent to the nearest lawful value, the bend named (J-VI.4); E4: a width or headroom at its minimum keeps a band the kernel admits, a lower one bent to it; E8: the inverse | F-EDIT | T-V4-36, T-V4-79 (r) |
| UE22 | locality (V04 §4.3) | E4: a degenerate edit shape is refused before any re-derivation; E6: the rows hold at every rung, an inherited system in maintenance mode laying nothing new | F-EDIT | T-V4-31, T-V4-79 (s) |
| UE23 | undo (V04 §4.4) | E5: an undo whose target a later dossier event changed follows §7.4 (the dossier's precedence: restored where it can, the rest reported) | — | T-V4-79 (t) |
| UE24 | the clerk's view (V04 §4.5) | E1: a document with no underground answers the key `info.under.none`; E2: one element answers as any; E8: pure reads, recomputed after every load, undo, redo and regeneration | — | T-V4-78 |
| UE25 | migration (V04 §4.6) | as V04 §4.6 states | — | T-V4-33 |
| UE26 | read-ahead (V04 §4.7) | E5: a declaration naming a system the document lacks makes it exist (a declaration is a fact, V04 §4.7); two held runs that cross unjoined are joined at their crossing (N10's crossing junction, `W_NET_CROSS`); one a stage cannot honour otherwise is refused at its dry run with the reason and the closest alternatives (item 20 (g)) | F-EDIT | T-V4-40, T-V4-79 (u) |
| UE27 | the view (V04 §5.1) | E1: with no non-empty band the layer draws the ghost only, the band ladder empty with the key `info.under.none`; E2: one band is the drawn band; E7: the layer hidden — not drawn, or drawn in a view whose working layer is Below (§8.4) —, each `underView` mode, `showUnexcavated` on and off (drawn only for `secret`) | — | T-V4-27, T-V4-79 (v) |
| UE28 | marks and programs (V04 §5.2) | E1: an empty band draws no rock; E2: one element draws its halo; E4: a mark of zero length or area is not written; E6: the same programs at every rung | — | T-V4-27, T-V4-79 (w) |
| UE29 | light (V04 §5.3) | E1: no source → the ambient alone; E6: at every rung | — | T-V4-25 |
| UE30 | labels (V04 §5.4) | E5: a missing name is drawn by S13a; E6: at every rung | — | T-V4-79 (x) |
| UE31 | exports (V04 §5.5) | E4: a zero-length or zero-area feature is left out of the export and listed in its log; E6: at every rung; E7: the parity presets export only the hidden sewer; the layer's visibility never changes the per-band export | leave out and report | T-V4-28, T-V4-29, T-V4-79 (y) |
| UE32 | Find on Below (V04 §5.1) | E1: no chip, or no match Below, draws nothing Below and counts 0; E2: one match glows or pins as any; E3: at the city band every match has a pin or a count bubble (item 120 (k)) — a match whose element is under about 6 px carries its chip's pin, and pins and ghost pins closer than about 24 px merge into a count bubble by §8.2's rule, up to the metropolis cap; Show gaps Below: every `district` unit Below without a member — each undercity neighbourhood and the underground pseudo-district — is outlined dashed "none here", and a `walk` or `households` unit reads `underDistance` (V01 §5.4 (3); V04 §3.6a (5)); E5: an element of an `unexcavated` cluster is absent below `secret` and a ghost pin at `secret` while its cluster is not drawn; E6: at every rung where the layer has a match; E7: the layer not drawn — hidden and not the working layer (every match Below a ghost pin), each `underView` mode, `showUnexcavated` on and off; E8: a view — the chips saved in view pins, re-evaluated after load, undo, redo, regenerate and migrate and at each change of the drawn week (a frame not the head: the frame's matches, bands and glow shapes, V04 §5.1 (7)), the document never changed | — | T-V4-81 ((c) the gaps, (f) and (j) E8, (i) E3) |
| UE33 | the damage below ground (V04 §5.6) | E1: a building never decayed (level 0), and an underground none of whose buildings has decayed, draw byte-identically to the build without the layer (`item123.damage`); E2: one element past its threshold is drawn damaged alone, and a crypt whose ring holds no cell centre of its column grid has one `cryptVault`, its room's ceiling whole; E3: at level 1 every element below ground is past its threshold — a cellar and a crypt draw partly collapsed, every room, wall line, way down and join kept (a ruined church keeps its crypt), the lowest storey's floor walkable; a restoration lowers the level, the damage leaving in reverse threshold order, a repaired element drawn in patch material (V06 §3.23 (3)); E4: a crypt-only basement on its ring alone takes its crypt's kinds only, a grid cell whose centre lies outside the ring is no bay, and an element a plan edit removes leaves with its part; E5: a kind with no V11 row, and every building before V06's level lands, read as V06 §3.23 (4) states; a building over a void whose cellar vault has fallen keeps its dig access, a church its crypt join — no stage reads the level; E6: every rung where a basement, a crypt or an underground building stands; E7: every toggle and preset alike, the parity presets included (a look); the layer not drawn — hidden and not the view's working layer (§8.4) — draws none of the underground view's part, a plan's storey below 0 still drawn; Show crises on and off under a disaster's look (item 122 (d)): a church of one of the look's units (§10.2 (d)) draws its crypt at the higher of its own level and the look's while the look stands over the church (the condition's weeks, until a Works begun on it hands it over, V06 §3.22 (3)) and at its own level outside them, no patch left, its join kept, and an underground building, in no look's unit, at its own level (V04 §5.6 (1)); E8: a reading — save, load, undo, redo, regenerate and migrate re-read it at the drawn week, an undone restoration giving back the level its events give | — | T-V4-82 |

**Where the underground meets the other units.** Each combination's outcome at its limits, with its rung and test (the
fixture of each row runs at every rung the row names).

| row | combinations | outcome | rung | test |
|---|---|---|---|---|
| UC1 | a cliff (a bank of kind `cliff`, or terrain whose slope exceeds the barrier table's `cliff` threshold over its height, §4.3) × the sewer | where a run's centreline crosses cliff terrain, N6 inserts two vertices where it enters and leaves it (sampled at the terrain cell), each at its own `levelledGroundCm`, and the segment between them is a drop exactly as N7 (3) makes one at a wall; a run never leaves by a cliff face (outfalls lie on water or on the field outfall's path) | F-NET's cover ladder | T-V4-80 (a) |
| UC2 | a cliff × a cavern, a void, a ruin | a cavern gallery meeting a cliff face is a `mouth` candidate there (its cover falls to 0 at the face), drawn by U-ACCESS (e); a ruin or former-settlement element whose ceiling would stand less than 100 cm under the present ground at a cliff's foot is created `collapsed`, cause `decay` (the face eroded it); a quarry working's adit ends in its `mouth` at the face | — | T-V4-80 (a) |
| UC3 | a cliff × a catacomb | the level floor refuses every node past the cliff (`blockedBy: 'depth'`), and a node whose cover at the foot falls under `coverM` likewise, so a catacomb never breaks out of a face | stagnation | T-V4-80 (a) |
| UC4 | a cliff × the undercity, an access, a vault | nothing new: a cliff mouth counts for L1's *access* and *a route outside* as any `mouth`; an access's ground point never lies on cliff terrain (a generated one slides as N11's sites do, `placeAccess` moves it to the nearest point off it, reported); no vault source stands on a cliff — a street vault's stretch leaves a stair or cliff interval out as a wall's (V04 §3.5.4 (b)), and a span over one fails the span rule's height or slope test and stays open (§2.7) | — | T-V4-80 (a) |
| UC5 | steep ground × the sewer, a cavern, a ruin, a catacomb, the undercity, a void, an access, a vault | steep ground only steepens: N7's inverts follow it within the cover bounds (no maximum fall, the cover ladder unchanged); a fissure prefers it (V04 §3.5.2); a ruin's `terraced` family and the smoothed ancient ground absorb it, UC2's erosion rule applying; the catacomb's level floor refuses it (`depth`); the carve's depth-band test refuses it; an access's kind follows its drop; a street vault is its product (V04 §3.5.4 (b)) | each kind's own | T-V4-80 (b) |
| UC6 | a coast × an access | no access's ground point lies in a water face: generated ones stand on land (an outfall's `mouth` hosts on the land face at `at`; a candidate under water is none); `placeAccess` on water is bent to the nearest shore point, the bend named | F-EDIT | T-V4-80 (c) |
| UC7 | a moat × a cavern, a ruin, a catacomb, an access, a vault | an older void's element under a moat's water face within `surfaceClearCm` is created `flooded`, deeper ones by the water table; a later system never passes under it (the shallow-element rule; a catacomb node is refused `wet`); an access stands on land (UC6); no vault lies under a moat — a bridge vault stands at a deck end on its bank, a drawbridge (`draw`) takes none, cisterns and street vaults stay under public ground | — | T-V4-80 (c) |
| UC8 | a bridge × an access | an access's ground point on a bridge deck over water is no candidate (N11 slides it off; `placeAccess` is bent to the nearest bank point); a bridge vault's `stair` stands on its approach way on land | F-EDIT | T-V4-80 (c) |
| UC9 | a deck plot (item 110 (d)) × the sewer, a cavern, a ruin, a catacomb, the undercity, a void, an access, a vault | a deck building has no basement, no dig floor and no crypt (V02 §3.16 (6)): it is never a dig host, an L3 host, a crypt-join host or a lifeline's chimney; N8 reads ground part-0 plots only, so a deck plot is never connected and never counted unsewered; it adds no foundation obstacle (the deck's piers are the obstacles); it is never a burial face; `placeAccess` in one is bent to the nearest part-0 point; an arch vault and the deck plots above its span coexist, the vault at grade under the deck | F-EDIT | T-V4-80 (d) |
| UC10 | an oasis (item 111) × the sewer | an oasis's water is never an outfall candidate (N2 skips a `WaterBody` carrying `spring`, §2.3: the town's own water), so a sewered oasis town discharges to a field outfall or another admitted water | the field outfall | T-V4-80 (e) |
| UC11 | an oasis × a cavern, a ruin, a catacomb, the undercity, a void, an access, a vault | an oasis is water for every rule that reads water (g item 111): no later-system element under its face, catacomb nodes refused `wet` on its damp ground, older elements `flooded` below the water table; its wells are well pins for U-ACCESS (f); the cistern test's `dist.water` reads it (a precinct beside it takes no cistern); L1's water rows are unchanged | — | T-V4-80 (e) |
| UC12 | the frame × a cavern, a ruin, a catacomb, the undercity, a void, an access, a vault | every system lays inside its L0 margin ring (the frame plus its context margin): an element crossing it is clipped by the kernel — a gallery ending there sealed, with no opening, a chamber kept where its inside part reaches its kind's `minM2`, else not laid; a catacomb node beyond it is refused `reach`; the carve and every access's ground point lie inside the frame (else no candidate); an arch vault is laid only for a span inside it; a ruin's outline is clipped and re-centred (V04 §3.5.0a (3)) | leave out and report | T-V4-80 (f) |
| UC13 | a standalone neighbourhood document × vaults | the standalone line: only a declared raised way's arch vaults and terminal cistern (V04 §3.1, V04 §3.5.0) | — | T-V4-75 |
| UC14 | a terraced ward (V01) × the sewer, a cavern, a ruin, the undercity, an access, a vault | the wall crossings and drops (V04 §3.2 N6–N7); the retaining walls' footings as foundation obstacles (V04 §3.5.0) for voids and the carve; an access's drop measured from its terrace's own datum (`levelledGroundCm`); a street vault never at a wall's stair (V04 §3.5.4 (b)); a raised grade over terraces keeps the steps (V04 §3.5.5 (a)) | each rule's | T-V4-67, T-V4-65, T-V4-15, T-V4-80 (g) |
| UC15 | a composed building (V02) × the sewer, a cavern, a catacomb, the undercity, an access | a composed building is a building: its footprint and basement floor are V02's (V02 §3.14.5 (f)), read by the shallow-element rule, the dig draw (its key carrying a mutator-added wing's key, V02 §3.9 W6) and L3; N8 connects its plot as any; a church's crypt is its basement's (V03); the undercity's buildings compose by `UndercityRule.arrangements`, heights ceiling-capped | — | T-V4-30, T-V4-80 (h) |
| UC16 | a tiered building (V02) × an access | its footprint and basement are its ground tier's; an access heads in its basement by V03's access head as any | — | T-V4-80 (h) |
| UC17 | a cavern or a ruin × undo | an excavation's undo returns its clusters to `unexcavated` (its `ExcavationRecord` entries leave); an undo of a closing commit restores `accessible` and the dwellings byte-identically; a New random's undo restores the elements, openings and opening places (T-V4-17) | — | T-V4-17, T-V4-48, T-V4-76 (b) |
| UC18 | a vault × a lock | a locked vault element is held against every generator: U-FADE never strikes it (its candidates exclude locked elements); a reconcile or regeneration that would re-lay, collapse or delete it keeps it — at an epoch reported with E_LOCKED's cause, at an edit's dry run returned E_LOCKED (§7.3), the user free to unlock; the removal of a raised way or a span's `open` with a locked arch vault under it is refused E_LOCKED until it is unlocked | check | T-V4-80 (i) |
| UC19 | water — a river, a canal, a moat or the harbour, with its bridges and any pier, mole or quay platform over it — × the sewer | no sewer edge, run, knot, grating, drain run or passage lies over a water face (V04 §3.2 N3: a `Bridge`'s deck span whatever its way's class, the `bridge`, `pier`, `ford` and `aqueduct` classes and every spine stretch over water left out of the `SewerGraph`; N8 and N9 the same); each bank drains to an admitted outfall on its own bank, the outfall cap keeping each bank's largest root; a bank with none takes its own moat candidates, then its own field outfall, its D8 path and outfall run over land only (V04 §3.2 N2), and a bank with no dry stretch of `R`'s boundary, or none whose path reaches beyond the outermost enceinte's outer strip without entering a water face, drains by gutter and pit, its area reported unsewered — never a crossing; a drawn or prefix-declared run that would cross water is bent at the bank, the bend named (V04 §4.1) | F-NET's truncate rung | T-V4-80 (j) |
| UC20 | a catacomb growing into a sewer (the owner's named combination) | the growth's course is never bent for the sewer, and a sewer run refuses no node (V04 §3.5.1 (4): `system` reads another complex of the catacomb's own part); each gallery or chamber of the growth that meets a run where their vertical intervals intersect commits one typed opening in the growth's commit — a `breach` link, cause `overlap` naming the catacomb system and the epoch's `seq`, its kind by `LinkRule.kinds`, a builders' grille reading `gated` (V04 §3.5.7 (a)) — one per meeting element pair; no element moves or changes system (two parts, never a merge) and the run's knots, profile and `serves` are unchanged; a complex passing over or under a run at another depth is linked only by U-ACCESS (b)'s chance or the overlap shaft's; the opening is a path of the connection graph like any link | — | T-V4-80 (k) |
| UC21 | item 123's damage × the underground's access model — a ruined church whose crypt is joined to a catacomb, a ruined building over a cavern with its dig access, a cellar under a decayed building over a ruin, the buildings of a cluster turned `lost` | a drawing only (V04 §5.6 (4); J-V4.130): every access, link, crypt join, `ExcavationRecord` entry and excavation state is the same at every level, so a scrubbed week never opens or closes a way; a damaged stair core below 0, with any access head on it, draws as rubble over steps still climbable; a way closes only by this volume's closure states, and a `lost` cluster stays lost whatever its buildings show; a building in a `collapsed` or `flooded` element draws that element's §8.2 `states` row over its own damage | — | T-V4-82 (d) |
=== END ===

=== REPLACE ### 4.3 Locality (§7.3; J-V4.14) ===
### 4.3 Locality (§7.3; J-V4.14)

| edit | re-derives | byte-identical |
|---|---|---|
| a tunnel drawn, moved, re-profiled or deleted | U-FRONT on the part-0 blocks its edges bound (II.7.2); N8 for the plots within `reachM` of it; the lights of those blocks; the overlap test for the drawn or moved run; the excavation reading | the ground; every other part but a new link's far end; the rest of part 0 |
| a depth offset | the inverts of the connected network (knots only); the overlap test | every face and plot |
| a ground edit (way, plot, building, field) | the part-0 blocks, and the undercity blocks under a ceiling within `surfaceClearCm`, whose recorded ground cells its clear region covers (II.7.3); N8 for the plots it re-cut; a building created or given a basement over a cavern, ruin or former-settlement element draws U-ACCESS (d) in the edit's commit, keyed as at generation; the access closures of V04 §3.10; the excavation reading; nothing of the network's plan — sewers outlive the streets above them. A tunnel whose followed way is deleted keeps its course, `follows` absent; one whose way is split re-points `follows` to the part over the run's midpoint | every tunnel's geometry and invert |
| a water edit moving a shore that holds an outfall | the **outfall re-seat**: the run's `Tunnel.outfall.at` moves to the nearest point of the same water body's shore, its last segment extended or shortened within `outfall.linkM`; beyond it, F-EDIT names the stranded outfall and offers Re-derive from the network stage | every other run |
| a water or terrain edit that puts water, or the water table, over a void element whose ceiling lies within `surfaceClearCm` | each such gallery and chamber converted `flooded` (II.6) as fates of the edit, or, where `flood` is not admitted, reported `W_VOID_UNDER_WATER` | the rest |
| a terrain edit | nothing moves; runs whose crown cover falls below `coverMinCm` are listed in the fate report (`exposed`); S1's water operator recomputes `Terrain.outfalls` wherever D8 re-runs | all |
| the commits of V04 §3.10's opening-pass list (3) | V01's opening pass over that access: its `HoodPlace` made and named, re-derived or tombstoned, a fate of the commit | every other place |
| an edit that closes a cluster's last open path — a `delete`, `seal`, `caveIn` or `bricked` of its last access, or of a run, link or element that path depended on | the excavation reading: the cluster turns `lost`; its F6 dwellings and undercity plots abandoned by V04 §3.5.7 (g) (5), listed as fates in the dry run; its undo restores `accessible` and the dwellings byte-identically | the rest |
| a dwelling declaration on a sealed cluster, alone or after its grouped `addUndergroundAccess` (item 372) | the closure's way in (V04 §3.8: U-DIG's pieces from the building that digs, or the base's opening rungs with V01's opening pass); the excavation reading; the declaration's own pieces on the cluster it opens | the rest |
| an `editTable` or `editPreset` that changes the resolved `fabric.extensionWeight` (V01's stage-2 switch, V01 §3.15) — across 0, or inside (0, 1] | V01's re-derivation of the edit (V01 §3.15, *The switch's edit*: from the switch's first reader stage, S2, with §6.3's carry-over), then T1–T8 as after the `adjust` row's Re-derive — the re-cut plots and buildings drawing U-ACCESS (d) and the access closures (V04 §3.10) as the ground-edit row states, the excavation reading recomputed. T6's opening pass runs under the new gate: a place is made for each selected access where the switch rose above 0; where it fell to 0 none is made, and each old place is retired by the carry-over; a change inside (0, 1] keeps the gate, and the pass runs as at generation over the accesses the re-derived document selects. These are fates of the edit (V04 §3.10; J-V4.121) | what the stages before that first reader stage commit |
| a `drawBoundary` or `split` on an undercity district | C1's read-only lifeline test per resulting district; a failing district's lifeline closure (V04 §3.8), its pieces shown as fates | the rest |
| a `delete` of catacomb galleries | the author's declaration: `extentFloorM2` lowered by the deleted area and the deleted grid nodes tombstoned, so growth never digs them again (J-V4.56) | the rest |
| `regenerate` (New random) on a system, a run or an undercity neighbourhood | that system's part, that run's blocks, that neighbourhood's elements; the links' far ends (§3.4); a host system's carve re-run (V04 §3.6 C2); on the catacomb system its lights and labels only; on the `dug` system its generated pieces only; on a `cavern`, `ruin` or `quarry` system U-ACCESS (e) over the new elements' opening candidates (the old elements' openings removed with them), the excavation reading, and V01's opening pass over the openings the new plan makes or removes (V04 §3.10) | the ground but those opening places, every other part |
| `adjust` of the family or the preset, of `recipe.layers.ruins`, or of the TOWN *Sewers* toggle | **Re-derive from S7b** with carry-over (§6.3): these change S7b (6)–(7)'s inputs (the navigable preset always allocates, the undercity presets change its bound and sources, a TOWN toggled on gains the allocations, a ruin feeds P5 and P7), so the ground's allocation re-runs, surviving placements kept by §6.3's rules, then T1–T8 (items 403, 404, 549) | the ground's geometry outside the re-placed uses |
| a basement edit bringing a ring within `foundationClearM` of a shallow void element | nothing; reported `W_BASEMENT_NEAR_VOID`, and U-LINK's basement rule may give it a way down at its next re-derivation | all |
| any change to a raised way's `feet`, `supports` or `spans` by an edit — among them the way added, removed or re-shaped, generated or drawn; a `setAttr` on its spans (a span's `use` set), crossings, `clearanceCm` or `spanSpacingCm`; a hand `repairRaised`; a hand landfall (V05 §3.16 (4)); the same change at an epoch (V06's raised-way ops, a landfall, the frame growth's deck extension, §3.2 (9)) runs the reconcile and `Foundations.apply` over `EpochScope.raised` instead (V04 §3.10; V04 §3.5.0 *At an epoch*) | `ArchVaults.reconcile` over that way in the same commit — its vaults laid, re-laid between their raised-way piers' inner faces or deleted (V04 §3.5.4 (d) (1)–(3)), with their links and accesses, fates in the dry run (a span's `use` set lays or removes that span's arch vault alone); `foundationObstacles` re-read under its raised-way piers: the older voids' collapsed stretches and pillars there re-derived, and an existing element of a later system a new or widened raised-way pier (a crossing station's band stretch where the way is created across a standing wall, §2.7's support step (3)) puts within reach converted `collapsed`, cause `foundation`, as a fate (a catacomb's staying in its extent, V04 §3.5.1 (6)); the excavation reading; the terminal cistern of an aqueduct | the network (a raised spine is never an edge); every other part |
| a `RetainingWall` drawn, moved or removed, or a levelling edit | N6's wall-crossing vertices and N7's re-lay for the runs crossing it (knots only, the plan unchanged); `foundationObstacles` re-read along it (as above); the street-vault stretches of the ways it re-profiles | every tunnel's plan |
| a `setAttr` on `monument/count` | that monument, its chamber's ceiling, U-CITY's plots on its floor where the new rings meet them | the rest |
=== END ===

=== REPLACE ## 6 Performance budgets ===
## 6 Performance budgets

Measured as §12.1 states (the reference hardware, the harness, p50 and p95 over the rung's golden seeds). The tail is off
the first map (J-V4.2): the first map's laws of §12.5 are unchanged; the tail's time is reported as `timings.tail` and
bounded here. Work sizes are PLAUSIBLE until the U0 spike measures them at CITY **and METROPOLIS** (V04 §8).

| stage | work at CITY (historical / navigable) | rate assumed | p50 village rungs · TOWN · CITY · METROPOLIS (historical) | navigable × |
|---|---|---|---|---|
| U-FORECAST (at S7b, on the main path; its own §12.4 row, item 475) | ≈ 2 000 way edges, ≈ 20 000 `hydro` cells in `R`; P5–P7 over ≤ 10 voids | Dijkstra ≈ 0.3 µs per edge relaxation; cell scan ≈ 50 ns | ≤ 1 · 1 · 3 · 6 ms | 1 |
| T1 U-NET | ≈ 12 km / 40 km of runs, ≈ 1 000 / 3 500 chain vertices; 5 500 plot connections | insertion ≤ 8 µs (§12.4); `corridorUnion` at S9's rate per km; a connection ≈ 0.4 µs by the grid index | — · 6 · 18 · 45 ms | × 2 |
| T2 U-SYS (catacomb, cavern, quarry, vaults, buried) | catacombs ≤ 300 grid nodes per complex, ≤ 5 complexes; caverns ≤ `caveKmPerKm2` × the frame; quarries one chamber per working; vaults ≤ 60 chambers | as T1 | 2 · 5 · 15 · 35 ms | × 1.3 |
| T2 U-SYS ruin | a sunken district of ≤ 15 ha: ≤ `maxChambers` chambers, ≈ 400 galleries; the distinctness measures ≤ 4 times; ≤ 3 monuments, each one `layTiers` of ≤ 8 tiers (≤ 0.5 ms p95 each, J-V4.87); the column grids | as T1 | 1.5 · 6 · 12 (p95 ≤ 20) · 20 ms | 1 |
| T2 U-SYS arch vaults, terminal cistern, foundations | arch vaults ≤ `span.vaultCap` at the rung (§2.7, item 244), O(spans); the foundation obstacles by the static index | ≈ 5 µs per span; ≈ 1 µs per index query | 0.2 · 0.3 · 1 · 2 ms; p95 ≤ 3 ms | 1 |
| T2b U-ACCESS | the overlap and proximity queries over every part's static index; the buildings over voids by the index; the excavation reading a union-find over clusters | ≈ 1 µs per index query | 1 · 4 · ≤ 12 p95 · ≤ 30 p95 ms | × 1.5 |
| T3 U-FRONT (F6 included) | ≤ 300 plots historical, ≤ 1 500 navigable; ≤ 8 households per void cluster | S10 + S11 ≈ 16 µs per plot; 5 samples per plot by `pointLocate` ≈ 1 µs | 1 · 1 · 3 · 8 ms | × 4 |
| T4 U-CITY | ≤ 3 × 120 households, ≤ 400 plots; C1's read-only test | as T3; the visibility-graph MST over ≤ 200 openings | — · 1 · 4 · 8 ms | × 1.5 |
| T5 U-LINK | L1, L3 over ≈ 2 000 basements, L5, L6 | ≈ 1 µs per index query | 1 · 1 · 4 · 10 ms | × 1.5 |
| T6 tail S12c + S13a | ≤ 5 districts, ≤ 400 names | §12.4's rates | 1 · 1 · 2 · 4 ms | 1 |
| T8 U-RECONCILE | usually none; ≤ 100 households | S10b's reconcile rate | 0 · 0 · ≤ 1 · ≤ 2 ms | 1 |
| **tail total** | | | **≤ 10 ms p95 at each village rung (p50 ≈ 7.7); 26 · 71 · 162 ms p50 at TOWN · CITY · METROPOLIS; p95 ≤ 36 · 112 · 253 ms** | navigable p95 ≤ 61 · 192 · 343 ms |
| T7 S14 underground build (on first show of the layer) | ≤ 12 000 marks per band at CITY | §12.4's S14 rate | ≤ 6 ms per band at CITY | — |

A standalone neighbourhood document's tail is ≤ 12 ms p95 at every `contextRung` (the village rungs' ≤ 10 ms plus one
catacomb complex's layout, ≤ 2 ms).

**The first edit after the first map.** The tail yields between stages to a queued view request, never to an edit, so an
edit queued during the tail commits within §12.6's budget for its scope plus the tail's remaining p95 (T-V4-42).

**View.** Showing the layer (its toggle, or Below made the view's working layer, §8.4) or switching band re-rasters the
visible tiles of the underground layer only (the ground's ghost
is the cached ground tiles composited at `ghostAlpha`): ≤ 150 ms to the lit band at CITY on the reference device, the unlit
band first within one frame (J-A68.88's order). The light pass's frame and bake budgets are §12.5's; a band's bake is keyed
by the band, so returning to a band reuses its bake.

**Edits** (§12.6's functions of scope): a tunnel edit ≤ 30 ms at CITY (its bounded blocks and their plots, the overlap
test); a depth offset ≤ 5 ms; `addUndergroundAccess`'s dry run ≤ 60 ms (a connector grid of at most 160 × 160 cells at the
default reach); a dwelling closure's first rung ≤ 60 ms for the building that digs and ≤ 60 ms more for each one passed
over, its qualifying test ≤ 1 ms (a plan query of the part's static index; V04 §3.8); the excavation reading ≤ 1 ms per
commit (only the clusters the commit touches, the `lost` state and the vacated plots included); the opening pass ≤ 0.1 ms
per access it visits; a New random on a system ≤ its T2 share; the family, preset, ruins and TOWN-toggle adjusts at §12.6's
*re-derive from S7b* row plus the tail's p95; Re-derive from the network stage ≤ the tail's p95; the stage-2 switch's edit
(V04 §4.3; V01 §3.15) at V01's Re-derive-from-S2 line (V01 §6) plus the tail's p95, as the adjusts are; a change to a raised
way's `feet`, `supports` or `spans` by an edit (its add, re-shape or removal) adds
≤ 2 ms for its arch vaults and foundations; a span's `use` edit ≤ 1 ms; a monument's count ≤ 1 ms; a
retaining-wall edit's re-laid knots ≤ 5 ms, as a depth offset.

**Epochs.** The participants' per-epoch budgets at TOWN · CITY · METROPOLIS, which V06 §6.2's century sums read (J-V4.125):
`under.fade` ≤ 3 · 8 · 20 ms (the fade candidates over their exposure samples); `under.extend` ≤ 6 · 17 · 43 ms (the
foundations act, the sewer's extension over the new ways, catacomb growth ≤ 300 nodes, crypt joins, workings, the
arch-vault reconcile over `scope.raised` ≤ 3 ms p95, the invert drops); `under.access` ≤ 5 · 15 · 40 ms (a static-index
query over the epoch's new footprints and elements, the `lost` transitions included); `under.undercity` ≤ 1 · 4 · 8 ms
(F6's relocations and the in-participant re-homing ≤ 1 ms at CITY). Inside them: `Foundations.apply` ≤ 1 ms per 100 new
footings at CITY (one static-index query each); the village-working test ≤ 0.2 ms per village (≤ 10 workings, one index query each); the buried floor's
terrace steps inside the `raiseGrade` builder's own time, O(walls × elements within one wall's reach); `BuriedFormer.lay`
≤ 5 ms per burial epoch at CITY (one L1 and one L2 batch over the former fabric's ways and buildings), inside V06's replay
budget.

**Memory** (§12.8): part 0 ≤ 1 MB historical, ≤ 3 MB navigable at CITY; a ruin part ≤ 2 MB; each other part ≤ 1.5 MB; the
underground display list ≤ 2 MB per drawn band; ×2.5 at METROPOLIS.

**Exports.** A VTT band scene ≤ 1.5 s at CITY; the underground glTF ≤ 2 s; within §12.7's export laws.

**Find on Below** (g item 120 (j)): `underFindPlaces` ≤ 2 ms p95 for 500 matches at METROPOLIS (one static-index read
per match, the bands from the element records), inside §12.5's overlay budget — the glow drawn within about 100 ms of the
click; a band step with chips on re-composes the overlay within the band switch's own ≤ 150 ms and re-rasters no base
tile for Find.

**Damage below ground** (g item 123; V04 §5.6): a reading inside the drawing — one `decayLevel` read per building, one
comparison per element and one `belowKind` look-up of the element's storey, ring or room: ≤ 1 ms per band at CITY for
the underground buildings' footprints (≈ 400 buildings, ≈ 20 elements each), inside T7's ≤ 6 ms per band; a storey
below 0 inside V03's plan draw; a week that moves no element past its threshold re-rasters nothing; the per-band VTT's
line of sight inside its ≤ 1.5 s.

**The comfort level (g item 119; J130; J-V4.126).** The rows above and §12's underground rows stay the **targets** — as
fast as possible (§12.1). Every one-time wait this layer adds to completes within §12.1's comfort level of ten seconds of
total time, from the click to the complete result on §12.1's reference machine, at every rung up to the metropolis cap
and in both presets: a generate, a regenerate, a Re-derive (the family, preset, ruins and TOWN-toggle adjusts', the
network stage's, the stage-2 switch's) and an open from SettlementForge that generates, each with its tail; a
migration's `upgrade` tail (V04 §4.6); and every per-band export. The tail's own targets (≤ 343 ms p95 at METROPOLIS,
navigable) keep it far inside. The four epoch participants and `BuriedFormer.lay` add to V06's advance-time and
history-replay waits, which take the comfort level as V06 §6 reads it for them (item 119's V06 part). A wait past one
second shows §12.1's progress: each tail stage is a `StageDecl`, so the generation worker posts §11.2's `Progress` as it
starts and V09 names it, the map drawn under the strip and, on a shown layer, the notice "building the underground…"
(V04 §5.1). No row here runs slower than its target; one may only for a recorded measured gain — a V11
`perf.qualitySpend` row (V11 §3.25.8) whose step stays inside the comfort level (R12-33). The interactive rows are
unchanged (§12.1; R12-34): the band step by PageUp and PageDown and the band switch's ≤ 150 ms, the `underView` switch and
the cut-away, every underground tool's live preview — the access tool's included —, hover and click-to-inspect, undo and
redo. T-V4-32 (b) bars it.

**Pre-decided fallbacks** (in order, each triggered by the U0 spike's METROPOLIS navigable measurement and re-checked at
U5): (1) U-ACCESS's proximity sampling every 10 m; (2) the cavern and quarry caps halve (`caveKmPerKm2`, `workingMaxHa`)
and the ruin's `maxChambers` falls to 1 000; (3) U-NET's historical `drainMinHa` rises to 5 ha. Each is a table value with a
declared shift (§13.3).
=== END ===

=== REPLACE ## 7 Tests and acceptance bars ===
## 7 Tests and acceptance bars

§13's families; every bar runs on generated output from U1 (V04 §8) and keeps the base's hook tests T11-1, T12-1, T14-1,
T63-4, T64-1 – T64-3, T65-1 – T65-8, T66-1 – T66-4 and T66-6 green on the same output; a bar that re-runs a base hook bar
names the clause it takes over — §13.2's underground take-over row (T63-4, T109-1 – T109-6, T113-4, T113-5, T120-4,
T120-5, T123-1, T123-2, T123-6) by T-V4-34 (f), T-V4-43 – T-V4-58, T-V4-76, T-V4-77, T-V4-81 and T-V4-82, each naming its
bar and clause. **Parity:** no
reference owns the underground — MFCG has none and FTG's author states underground settlements unsupported
(`research/findings/ftg-posts-c.md`) — so the parity metric is invisibility **under the parity presets**: with a parity
preset on and the layer hidden, a CITY renders pixel for pixel as before M6-U (T14-1 as item 485 amends it), and no system
but the tier's hidden sewer exists, no household goes below and the ground's model digest equals the pre-M6-U digest
(T-V4-35). Under the default presets the ground differs only by the households and `preferred` uses S7b (6)–(7) send below:
a declared one-time shift of the M6-U output version, recorded in `plat/goldens/` at U1 (§13.3). **The look's precedent:**
the hatched-rock figure-ground (J-V4.31) is the look of the reference family's dungeon and cave maps
(`research/findings/watabou-extra-a.md` §2.7 and §2.8, the hatching and its two-layer mask;
`research/findings/dwellings-posts.md`, its "house-like dungeons"); nothing of it is copied, and the owner's panel carries a
side-by-side against a render in that style. Every other bar is a rule bar or a realism bar without a reference source
(§13.7; provenance `own`, PLAUSIBLE until the owner's panel, V04 §8). The item-109 statistical bars (T-V4-43, T-V4-44,
T-V4-45, T-V4-49, T-V4-51, T-V4-52 — the bar map's item 109 (k) (5)–(6) rows, the stagnant fill's `exactMonotone` and the
growth cap's `exactBound` —, T-V4-54, T-V4-55, T-V4-58) are `StatBarSpec`s of V12 §3.6b's bar map at its levels
(forced-source fixture sites), `undergroundInputOf` reading this volume's system records; their "± 3 s.e." and seed counts
are the specs' parameters.

| id | family (§13) | bar | tier (§13.8) |
|---|---|---|---|
| T-V4-1 | stage invariant | every run's invert knots fall monotonically in flow order at ≥ `minGradient`; every branch's downstream invert ≥ its receiver's at the junction — 0 violations on 500 seeds per rung × 3 families × 2 presets | PR (20 seeds), nightly |
| T-V4-2 | stage invariant | every run reaches an outfall along its tree path; every river outfall at `ContextVector.upstream` ≥ 0.5 and below every harbour mouth and mill intake; every sea or lake outfall ≥ `harbourClearM` from a harbour basin and the harbour-mouth chain; a moat or field outfall only where none was admitted on its bank, every field outfall on land beyond the outermost enceinte's outer strip, its D8 path and outfall run over no water face; every outfall invert ≥ its receiving water's surface `s` + `freeboardCm` — a moat's derived level (§4.2 S3 (10)), every other water's shore height, as V04 §3.2 N7 (1) reads it —, or `W_OUTFALL_LOW` reported — 0 violations; **the no-water fixture** (a TOWN and a CITY with no river, lake, sea, canal or oasis, `moat: 'none'`): every run reaches the one field outfall beyond the outermost enceinte's outer strip, `requestedVsBuilt` naming the cess field, 0 `frame` outfalls | PR, nightly |
| T-V4-3 | stage invariant | every crown ≤ `coverMaxCm`; the ground's terrain and arena digests identical with the tail run and not run (nothing trenched, no ground geometry written by any tail stage); T8's use writes on ≤ 2 % of CITY seeds at the default presets, each in `requestedVsBuilt` | PR |
| T-V4-4 | rule bar | every main's bore and headroom equal II.7.2's law at its downstream served area; `navigable` equals the thresholds' verdict; historical preset: navigable runs ≤ 10 % of network length at the CITY median (realism, own) | nightly |
| T-V4-5 | conservation | Σ served area at the outfalls + unsewered area = the plot and corridor area of `R` within 0.1 % | PR |
| T-V4-6 | statistics | `channel` plots connected (to a main or culvert, item 548) ≥ 90 % at CITY historical; `pit` connections per band within ± 3 s.e. of `pitShareByBand` over 500 seeds; every `serves` id within `reachM` of its run or on its drain | nightly |
| T-V4-7 | rule bar | `follow-streets`: every way run's centreline equals its way's spine positions; `drainage-lines`: every cell step follows D8; `mixed`: every culvert on a drainage line of catchment ≥ `culvertCatchHa` | PR |
| T-V4-8 | forecast | on 200 CITY seeds, navigable preset: the forecast capacity within ± 25 % of the built on ≥ 90 % of seeds; historical: the forecast navigable length within ± 30 %; each void kind's forecast capacity within ± 30 % of the built on ≥ 80 % of seeds; P6's verdict equals C0's on 100 % | nightly |
| T-V4-9 | the owner's rules | T12-1's rows (U1–U3, ≥ 1 access per neighbourhood, 0 plots under excluded ground, 0 ground writes) on 500 generated seeds per rung, both presets; every entrance of an underground building on a tunnel, gallery or walkway kerb or a chamber wall has `faces: 'tunnel'` | nightly |
| T-V4-10 | rule bar | every lived run stretch of `2 × shaftSpacingM` holds a grating, or the gap is reported with its reason | nightly |
| T-V4-11 | rule bar | each catacomb complex: its extent ≥ min(its need, the cap-limited growth) and ≥ `extentFloorM2`; one floor, the level-floor admission holding; no node on `damp` or `flood` ground or a tombstone; its stair on its burial face | nightly |
| T-V4-12 | rule bar | a non-fissure cavern only on `soluble` or `volcanic` geology, a fissure only on `ordinary` rock at hilly or mountainous relief and never with a `hall`; its length ≤ `caveKmPerKm2` × the frame's km²; `water` ⇔ floor ≤ the water table; every `hall` floor ≥ the water table + `hallDryCm` and no undercity plot on a floor at or below it; a mouth only at a candidate whose cover < `mouthCoverCm` | nightly |
| T-V4-13 | rule bar | quarries: Σ workings area × headroom × (1 − `pillarShare`) within ± 10 % of the volume law; no working with cover < `minCoverM`; one shaft per working | nightly |
| T-V4-14 | rule bar | vaults under public ground (a cistern under its own host's court); cisterns only where `dist.water` > `cisternDistM`; every bridge vault at a deck end risen ≥ `bridgeRiseCm` | nightly |
| T-V4-15 | rule bar | T65-8 extended: a buried town's squares are `square` chambers; its buildings' entrances are portals on their storey chambers; **the terraced fixture:** a `raiseGrade` over a terraced quarter keeps each tombstoned wall's step in the buried floor — every high-side gallery vertex and chamber floor within 10 cm of the high side's last live datum less the rule's depth, a stair step in every gallery crossing a wall's line — and a region with no wall buries as before; under a history replay the scar step lays nothing at generation | PR |
| T-V4-16 | stage invariant | no element of a system laid after the town within `surfaceClearCm` of the ground lies under water or within `foundationClearM` of another building's basement at generation; after a water or terrain edit every such element is `flooded` or `W_VOID_UNDER_WATER` is reported | nightly |
| T-V4-17 | isolation | T65-6 on generated output: re-deriving each system leaves the ground and every other part byte-identical but for its links' far ends and, for a `cavern`, `ruin` or `quarry` system, V01's opening places over the openings it makes and removes; a New random on a carved host re-carves its neighbourhoods' cores, and one on the neighbourhood resurrects the cleared parts before re-carving, both undoing exactly | PR |
| T-V4-18 | the undercity | T65-1 – T65-5 on generated output; every neighbourhood has a core ≥ `mainChamberM2` with its plaza ring and the black market fronting it; its chambers joined by walkways; its lifelines (access, air, water) present on 100 % | nightly |
| T-V4-19 | statistics | neighbourhood counts and `H` follow II.7.5's size law on 500 seeds per rung; on 200 paired seeds a higher `wealthLevel` never raises `H` and a higher `disorder` never lowers it | nightly |
| T-V4-20 | statistics | link frequencies per pair of kinds within ± 3 s.e. of `LinkRule.chance` over 500 seeds; spacing ≥ `linkSpacingM`; `flooded` only below the water table | nightly |
| T-V4-21 | knowledge | T30-5's enumeration on an underground fixture: at tier `public` no secret access, link, `dug` gallery, lifeline or concealed place in any view, label, reader answer or export, with its lights; at `secret` all of them | PR |
| T-V4-22 | the closure | T66-1 – T66-4, T66-6 on generated output; every connector keeps `foundationClearM`, its floor above the water table and inside its band, its length ≤ `2 × digReachM`; the A\* route identical on the five engines | PR |
| T-V4-23 | lifecycle | 1 000 hand-applied fade rounds on the hook city: only ladder moves (silt only from in use; collapse only from caved in; flood only below the water table; no `demolish`); `extend` on a fixture whose growth crosses a sealed run reopens it on 100 % of seeds and digs no new run on its line | nightly |
| T-V4-24 | statistics | clearance draws within ± 3 s.e. of `1 − (1 − clearancePerYear)^years` when `disorder` is under the threshold; none above it | nightly |
| T-V4-25 | light (§8.3's row family) | underground, the CPU reference gives a floor point with no light and no shaft in reach ≤ `ambient.underground` × its albedo; a floor point under a grating at noon is brighter than every point of its band without a light or shaft in reach; a torch in one run adds 0 to a parallel run through 3 m of rock; the GPU pass within §13.4's tolerance | PR (fixture) |
| T-V4-26 | light | an unlived network or system carries no light but its shafts, and a sealed cluster none; every underground light's height ≤ its host's ceiling − 30 cm | PR |
| T-V4-27 | visual regression | the underground hook fixture in `cutaway`, `overlay` and `solo` at each band, day and night, in every shipped sheet of §8.2's presets table (`ink`, `lit`, `hatched`, `parchment`, `bw-print`, `night`, `painterly` from V07's V-M1, the parity presets), against its goldens, the loader refusing no `under.*` pair in any of them (V04 §5.2); only the drawn band in full; hiding the layer restores the ground's golden pixel for pixel | milestone |
| T-V4-28 | export | every band's dd2vtt validates; every void kerb and chamber wall is a `line_of_sight` segment; a portal at every opening in a wall line the key admits — each `door` access, each link whose `via` is `door` or `breach`, each underground building's entrance and each tunnel grille — and at no vertical access, each vertical access being its shaft light plus a `plat` extension object naming its band | milestone |
| T-V4-29 | export | the underground glTF and CityJSON validate (§11.1's validators); every void solid's normals face inward | milestone |
| T-V4-30 | determinism | the tail's per-part digests, U-ACCESS's links and accesses and T8's writes identical on the five engines of §6.5 and between generation and replay; a building's dig draw unchanged by a void added under another kind; two entities whose keys collide take the ordinal suffix in address order | nightly |
| T-V4-31 | locality (§7.3's oracle) | a tunnel edit changes only the blocks it bounds, N8's plots and its overlap links; a ground edit changes no tunnel's geometry or invert; a depth offset changes only invert knots; the family, preset, ruins and TOWN-toggle adjusts change exactly the S7b scope the oracle predicts; a stage-2 switch edit — across 0 in either direction, or inside (0, 1] — changes nothing that the stages before the switch's first reader stage commit, the underground re-derived by T1–T8 after V01's re-derivation (V01 §3.15, *The switch's edit*), the edit within V04 §6's switch line | PR (B-EDIT sequences with underground events) |
| T-V4-32 | performance | (a) V04 §6's p95 bars on B-CITY-lite (PR tier) and at METROPOLIS (nightly); (b) the comfort level (g item 119; T119-2, T119-3 and T119-5's clauses on this layer, beside V12's T-V12-50): with V12 §3.15.9's wait timer (§12.10's R12-31), five seeds per wait kind at every rung's top and at the metropolis cap in both presets, a generate with its tail, a Re-derive from S7b, a migration's `upgrade` tail and every per-band export each complete within 10 000 ms p95 from the click to the complete result, every wait over one second naming its running stage within 1 000 ms and no frame of it an empty screen; the band step and switch, the `underView` switch, the tools' live previews, hover, inspect, undo and redo no slower than V04 §6's rows and the previous release (R12-34); the participants and `BuriedFormer.lay` timed inside V06's advance and replay waits (V06 §6) | PR, nightly |
| T-V4-33 | migration | a document saved before U-NET's version opens with its ground digests unchanged, its underground made by the upgrade's diff, no sewer-front plots or undercity, and the diff offering Re-derive from S7b; a pre-item-109 document keeps every catacomb complex (`overCount` flagged, church-sourced ones re-sourced or `legacy`), gives every access and link cause `legacy`, keeps a cavern's dwellings only where its cluster is accessible, gains accesses only, and holds no ruin; a pre-item-113 document loads with its `ExcavationRecord`s built from its reading, no `lost` cluster and no buried former settlement | milestone |
| T-V4-34 | dossier (B-DOSSIER) | (a) a TOWN dossier with a sanitation record has sewers on 100 % of seeds; (b) a subterranean catacomb record has a complex on a burial face (a charnel vault below TOWN); (c) a subterranean institution no allocation takes has an underground by L5 on 100 % of seeds, the rung used reported; (d) a COUNT or GUILD subterranean record places each member `#k` below and a SIZE step one compound; (e) a dossier event removing or closing the institution leaves every L5 piece standing, its cause `dossier`, no longer held, the building gone from the `dug` system's `sources`, a U-FADE candidate from the next epoch; a relocation re-derives the pieces at the new building under the same binding key; (f) (takes T63-4 on generated output) over 1 000 seeds of the underground hook fixture and B-DOSSIER's clandestine fixtures, a concealed institution's `underground` mode is never chosen without an underground allocation (II.7.3), and the parity presets place no concealment | nightly |
| T-V4-35 | parity presets | under `MFCG` and `FTG` no system but a CITY's or METROPOLIS's hidden sewer exists — no ruin and no cavern at any rung (item 109 (i)'s pin is T-V4-47), no buried former settlement — no undercity, no link, no underground plot, no undercity or void-dwelling allocation, and the ground's model digest equal to the pre-M6-U digest on 200 seeds per rung | PR |
| T-V4-36 | editing | a two-point `drawTunnel` between points near ways routes along them, its kind derived when not given; a depth offset past the cover limit is bent to the nearest lawful offset, the bend named; a `drawWay` on the underground is bent to `drawTunnel`; a `placeAccess` on public ground takes a neighbourhood kind; a ruin draw follows the ruin's axis; a `drawChamber` with `newKind` `ruin`, `cavern` or `catacomb` creates its system with that chamber as its first (a ruin of source `declared` on the chamber's axis; a catacomb by §7.3's ladder, each outcome's bend named) and its undo removes both | PR |
| T-V4-37 | dossier | B-DOSSIER fixtures with `require` at TOWN on a site with no void: ≥ 1 neighbourhood on 100 % of seeds, bound to the `Underground city` record and named by it; `forbid`: 0 neighbourhoods and no allocation | nightly |
| T-V4-38 | dossier | every surveyed subterranean or sanitation record (`Sewage system`, `Underground network`, `Underground city`, `Black market bazaar`, catacomb, crypt, mine, cistern) binds to its map entity by V04 §2.3a on 100 % of B-DOSSIER seeds; a crypt record binds to its church building, which has `Basement.crypt`, never to a system or a plan room; V04 §2.3a's *Edges* (no row, both sets, duplicates, clamps) on their fixtures | nightly |
| T-V4-39 | lifecycle | a Re-derive from the network stage, and an epoch's `extend`, after a `drawTunnel`, a `delete` of a generated run and a depth offset keep all three on 100 % of B-EDIT sequences | PR |
| T-V4-40 | editing (T101's pattern) | an underground skeleton fixture (tunnels, a ruin chamber, a catacomb gallery, a link, an access, a required neighbourhood) authored as a skeleton file, on the canvas and through the tool API gives one model digest | PR |
| T-V4-41 | existence | at U2, on 200 CITY seeds: ≥ 1 sewer-front neighbourhood on ≥ 60 % (navigable) and ≥ 10 % (historical); failing, the pre-decided fallback (item 552, navigable `coverCm` 600) applies and the bar re-runs | nightly |
| T-V4-42 | performance | the first edit queued during the tail commits within §12.6's budget for its scope plus the tail's remaining p95; the tail yields only to view requests | PR |
| T-V4-43 | presence (V12's `presence` rule; takes T109-3's presence clause) | caverns and ruins present at every rung, THORP to METROPOLIS, at their rows' rates (± 3 s.e., 500 seeds per rung on forced-geology and forced-source sites); the tail within 10 ms p95 at each village rung | nightly |
| T-V4-44 | structure (V12's `twoSample`; takes T109-2's structure clause) | ruin systems beat cavern systems on `plan.rightAngle` and `plan.straight`, ≥ 30 systems each, the structure test never reading a monument's tiers; every ruin `hall` and `temple` chamber's `Chamber.columns` equals the ruin program's drawn dots point for point, and none lies inside a monument's tier-0 ring grown by 100 cm | nightly |
| T-V4-45 | distinctness (V12's `paired`; takes T109-2's distinctness clause) | each ruin differs from the district fabric above it on `ruin.blockArea`, `grid.r4` and `grid.axis` by V12's margins, `W_RUIN_SIMILAR` on ≤ 5 % | nightly |
| T-V4-46 | dossier (takes T109-2's dossier clause) | on 100 % of B-DOSSIER seeds a dossier carrying `ancient_ruins` or a `ruined-landmark` record has a ruin system, its marker linked, or a reported reason | nightly |
| T-V4-47 | no-op pin (g item 109 (i); takes T109-6) | a `NoOpPin` registration of the underground goldens on V12 §3.7.8's engine (`item109.underground`): with the ruin chance 0 and the relief, boost and fissure rows at the base's values, the output is byte-identical to the base's | PR |
| T-V4-48 | access (takes T109-3's dwelling and cause clause) | 0 dwellings in a sealed (`unexcavated` or `lost`) cluster on 100 % of seeds at every rung; every access and link carries its `cause`; **the closures' clause (at U4):** on T-V9-38's three-building fixture the group `[addUndergroundAccess { building: the second building }, the dwelling declaration]` digs from that building to the cluster's element nearest its footprint, opens the cluster (cause `edit`), and the declaration adds no second access (J-SS3.10); the declaration alone digs from the first building (plan distance, then address) with `bend.under.accessDug`, lists the other two in `PreviewResult.alternatives`, and its undo removes the access and leaves the cluster `unexcavated`; an untargeted `addUndergroundAccess` not grouped before a dwelling declaration never targets a sealed element; a skeleton prefix holding the same group gives the model digest the edit gives (T-V4-40's pattern) | PR, nightly |
| T-V4-49 | access (V12's `trend`; takes T109-3's access clause) | the accessible share of voids rises with the buildings over them: `voidAccessible` binned, 40 towns per rung from THORP to METROPOLIS on a forced-void site | nightly |
| T-V4-50 | catacombs (500 seeds per rung; takes T109-4, and T109-5's sources clause) | ≤ 1 complex at TOWN, counts within `CatacombRule.count` at CITY and METROPOLIS, `churches` counting `v.parish_church` and each church on a live sky island once (0 sky faces among the candidates); every complex's source a burial face or, at CITY and above, a quarry ossuary — 0 sourced at a church building; no quarry ossuary at TOWN; the largest complex (by `extentFloorM2`) under the primary (at generation the highest-ranked face holding one); every crypt join in a building with `Basement.crypt`, where an element lies within `accessReachM` of its crypt ring, cause `crypt`, its head in the crypt; with no building elaborated, the set of crypt joins equals the set after elaborating every church (V03's T-V3-23 (g)); 0 catacomb accesses of source `system` in a church-class building (crypt column `always` or `basement`), and every catacomb access headed in a building with `Basement.crypt` of cause `crypt` (V03's T-V3-23 (d)) (the cathedral's crypt is V03's bar) | nightly |
| T-V4-51 | ratchet (V12's `exactMonotone`; takes T109-5's ratchet clause) | `catacomb.extentM2` never decreases across every epoch sequence of H-100 and V06's trajectories and across replay, Re-derive and New random, by V12 §3.6b's step script (the dossier burial event and `extend` growth included), each complex tracked by its `CatacombComplex.id` (its source's lineage, V04 §2.5); **the decline case:** a town's catacomb carried into a village by V07's hand-off down keeps its extent, is stagnant with `blockedBy` holding `'rung'`, and its `fill` never falls | nightly |
| T-V4-52 | ratchet (V12's `exactBound` and `exactMonotone`; takes T109-5's cap and stagnation clauses) | growth per epoch ≤ `max(extent × ((1 + growthCapShare)^years − 1), growthFloorM2)` (J-VI.6), or ≤ `opts.capM2[id]` where V06 passes it; a stagnant complex's `fill` rises while its extent holds; **the overtaking fixture:** on 100 CITY histories of V06's trajectories in which a newer extramural cemetery comes to serve more burials than the rank-1 churchyard, the newer complex becomes the primary and, within the epochs its cap allows, the largest complex, no complex's extent ever falling and the older one held by the rank cap in growth only; **the calamity deaths:** an epoch whose `opts.deaths` is D raises each face's need by its `burialShare` × D × `ossuaryShare` × `m2PerBurial` and never its cap, and `deaths` absent reads 0 (V06's T-V6-69) | nightly |
| T-V4-53 | overlap (takes T109-3's breach clause) | on a fixture whose sewer crosses a sealed ruin chamber and a cavern gallery at a shared depth: a breach link on 100 % of seeds and both voids `accessible`; no link where the vertical gap exceeds `links.overlapShaftM` but by the shaft chance; every such link carrying its cause | PR |
| T-V4-54 | depth keeps secrets (V12's `floor` on `voidSealedDeep`; takes T109-3's depth clause) | at METROPOLIS on a forced deep-void site, the sealed share of deep voids — V12's connected components, at most three per town, deeper than `dig.reachM` below every footprint over them — ≥ `sealedFloor`; pre-decided fallback: `decayM` halves once, then `maxM` falls to 12 m | nightly |
| T-V4-55 | caverns (V12's `trend`, `higherWith`; takes T109-1's relief and mining clause) | cavern presence rises with relief and is higher with mining than without, per relief class | nightly |
| T-V4-56 | caverns (takes T109-1's breach clause) | every mine–cavern breach lies within `breachM` in 3-D; **the village working:** at a village rung, on a forced-cavern fixture with a mining use's outside-plot working, one `AccessPoint` of cause `mineBreach` and no link on 100 % of seeds where a cavern or ruin element lies within `breachM` of the working at a depth within its `mine.workingDepthM` row, none otherwise — at T2b, and for a working opened at an epoch by `AccessPassStrategy.run` over `scope.workings` with the epoch's `seq` (V06's T-V6-68; V07's T-V7-39) | PR |
| T-V4-57 | ruins (takes T109-2's link clause) | every ruin link obeys the connection graph: U-ACCESS (a)'s overlap test, (b)'s reach, (f)'s reuse admission | nightly |
| T-V4-58 | ruins (V12's `rate` on `ruinChosen`; takes T109-2's ranked-share clause) | where a ruin and a cavern both qualify, the undercity takes the ruin at `w_ruin ÷ Σ w` ± 3 s.e., ≥ 200 undercities | nightly |
| T-V4-59 | knowledge | at `public` no unexcavated element, label or light in any view, reader answer or export; with `showUnexcavated` off none is drawn at any key | PR |
| T-V4-60 | siting (item 103 (e)) | underground members' supply, clientele and competition distances by `underDistance` beat a random-placement baseline; no undercity guild seat within the garrison's repel radius in plan; a member with no admissible way out reads out of reach, never at distance 0 | nightly |
| T-V4-61 | custom content (B-DOSSIER) | custom fixtures — tag only, scene archetype only, an active chain with a subterranean resource — each reach the underground (a placement below, or the chain mine) | nightly |
| T-V4-62 | arch vaults (200 CITY and 100 METROPOLIS seeds with raised ways, and the second known-city fixture) | an arch vault in exactly each `vault` span, keyed by its way and raised-way piers — none over a part-0 way, water, a flood cell or a strip wholly on hinterland land-use faces (reason `country`, at every rung including the village rungs; J-C4); each headroom within [`minHeadroomCm`, `maxHeightCm`] and each fall under the span ≤ `maxFallCm` (§2.7, item 244); a door on an open face, or `W_ARCH_VAULT_NO_DOOR`; 0 arch vaults in an undercity cluster, a forced-vault count, U-FADE's candidates, an L3 or U-DIG target or a sewer-front block; each `collapsed` exactly when V04 §3.5.4 (d) (2) says so (the span's or a bounding support's `state` `ruined` or `cleared`, a landfall's included, or the span breached or dismantled) | nightly |
| T-V4-63 | lifecycle (B-EDIT sequences with raised-way events) | on 100 %: a removed raised way, generated or drawn, leaves no arch vault, door, link or access after its removal and after a regeneration; its undo restores them with the same ids; a user-added raised way's `vault` spans have their vaults in the same commit; a span's `use` edit lays or removes exactly that vault and survives a regeneration; an epoch that founds a raised way (V06's `under.extend`) lays its vaults in the epoch's commit; on a CITY fixture whose viaduct holds a `vault` span with its arch vault, passed beneath by an epoch circuit and, on a second run, by a hand `drawWall` (§2.7's support step (6) (d)) — the `vault` span's arch vault taken into the line, never entered, and no arch vault changed by either —, and an aqueduct whose deck an epoch's frame growth extends to the new ring (§3.2 (9)): after each commit every arch vault's key names a standing span of use `vault`, its footprint lies between that span's raised-way piers' inner faces, no chamber stands under an `open` span, each new `vault` span holds its chamber, and `foundationObstacles` reads the new supports in that commit; the frame growth's case keeping every old station and its vaults | PR |
| T-V4-64 | ground parts | 0 sewer edges, junctions, runs or gratings on a raised part; no tunnel `follows` a raised way; no street vault under a raised ramp; no bridge vault at a raised deck; every access's `ground.host` a part-0 face, none inside a raised-way pier's footprint | PR |
| T-V4-65 | foundations | 0 open void floor or open gallery stretch within reach of a foundation obstacle (raised-way piers to `span.supportFoundationCm`, retaining-wall footings, buried aqueduct stretches); 0 later-system elements laid within reach; 0 dig accesses from a raised-way pier; removing the raised way returns the older voids' stretches to their state without it; **at an epoch:** `Foundations.apply` over a raised way founded over a lived cavern chamber, a basement grown over a ruin gallery and a terrace levelled over a cavern collapses exactly the element set a regeneration of the same state collapses (V06's T-V6-67), returns the vacated dwellings' households by id and draws nothing; and an aqueduct whose deck a frame growth extends over a cavern chamber within reach of its piers: no old pier moved, the collapsed set equal to a regeneration's | nightly |
| T-V4-66 | the aqueduct seam | the base's raised-way set, span uses and aqueduct verdicts byte-identical with the underground tail run and not run; every cistern where `min(dist.water, the nearest delivery point) > cisternDistM`, or forced by a record; one terminal cistern per `cistern` terminal, under its conduit house's yard or public ground with a `well`, or `W_TERMINAL_CISTERN_SKIPPED`; the terminal building's plot connected as `channel` where a run lies within reach | nightly |
| T-V4-67 | retaining walls (terraced fixtures and 200 hilly CITY seeds) | 0 crowns above the levelled ground at any knot, the wall-face knots included, and at 1 m samples between knots; a drop at every wall crossing whose fall exceeds `minGradient ×` its length; T-V4-1 still holds; with the terrace rows off, U-NET byte-identical to its output before item 110 | nightly |
| T-V4-68 | monuments | every monument's tiers nest (each ring inside the one below, V02's ST6 test) and its stairs abut; `standing` ≤ the tiers laid; the laid top + `ceilingClearCm` ≤ the chamber's ceiling ≤ `burialCm − 100`; `lay.truncated` counts both cuts and a `TierFailure`'s truncation; a monument laid twice from the same seed is byte-identical; a ruin without the `monument` cell draws nothing on the `'tiers/*'` keys and is byte-identical to its output without it; no plot, walkway or pin on a standing ring or mound | PR |
| T-V4-69 | no-op pin (g item 110 (f)) | registered on V12 §3.7.8's engine: with every switch of V11 §3.24.0's switch table off (the terrace, raised-way and deck-plot rows) and no `CultureRow.monument`, the underground's output equals V12 §3.7.8's off-state set — byte-identical to its output before item 110 — on 200 seeds per rung | PR |
| T-V4-70 | laziness | opening every district in two orders leaves the arch-vault set, the span uses and the tail's per-part digests byte-identical (V01's T-V1-15 on the raised-way set) | PR |
| T-V4-71 | layers (V05's T-V5-26) | on 100 % of B-CITY seeds with sky islands: 0 dig hosts, basement-access hosts, crypt-join hosts or catacomb candidates on the sky layer; `R` holds no sky district; 0 underground elements, links or accesses with an end on the sky layer; the catacomb count equals the count with each island church counted once | PR, nightly |
| T-V4-72 | epoch contracts (V06's participants) | (a) a TOWN whose `Features.sewers` turns on at an epoch gets U-NET whole, every pre-existing underground entity and the ground byte-identical; (b) across V06's trajectories each catacomb source, public opening and overlap shaft key is drawn once, the same value at every epoch; (c) 0 underground strikes in the fabric pool or counted against a district's `fabric` cap; (d) a mining use opened at an epoch has its working in that epoch's commit with its overlap test, and every stone working reads worked out outside the epoch that laid it; (e) `AccessPassStrategy.run` with a scope, run twice, adds nothing the second time; (f) F6's new dwellings in a cluster that `under.access` made accessible this epoch are filled only by V06's relocation (V06 §3.18.1 (4); T-V6-52), none of their households new; the crowding hook's S7b (6) allocation (V06 §3.6 (1); item 574) runs at `growth`, before `under.access`, and seats only on runs and clusters accessible before it; ground + underground + sky households equal the epoch's target | nightly |
| T-V4-73 | sources and closures | (a) a dossier event removing a ruin's `ancient_ruins` source leaves the ruin whole with `source.ref` null and `W_RUIN_SOURCE_REMOVED`; (b) a churchyard whose church use closes freezes its complex (`sourceClosed`, `fill` unchanged), and a church-family use arriving on the plot resumes it with the same face lineage; (c) a landfall over a grating, a street stair and a catacomb stair bricks each, cause `convert:fallIsland`, and the batch in which its host leaves the decoration — at an epoch, and by a hand op — reopens it (V06 §3.5.2); the arch vault under a span a landfall ruins is `collapsed` in the same batch | PR |
| T-V4-74 | public ground, places and the report | (a) on B-CITY seeds with V01's dispatched squares: gratings, lifeline stairs and forced vaults land on square and green blocks as on L1 squares, and a buried town's square blocks are `square` chambers; (b) after the tail, one `HoodPlace` of kind `opening` per public opening of role `access` and per catacomb entrance, 0 ground geometry writes by the tail (T12-1), the ground digest finalised after T8; after each commit of V04 §3.10's opening-pass list — an epoch that opens a sinkhole, a `CatacombGrowth.grow` that founds a complex, an edit that deletes a public opening or sets its `role` to `light`, a `regenerate` of a cavern and of a ruin system that carry openings, a `delete` of a chamber carrying a sinkhole and of the ruin element carrying its entrance, a dwelling declaration whose closure makes a public opening (a sealed cluster with no qualifying building above it, so that the base's second rung places the opening), and an `editTable` that raises `fabric.extensionWeight` from 0 to 1 (J-V4.121) — the opening places equal V01 §3.7.1's selection over the standing accesses: 0 orphan places, 0 unplaced openings; with the local-place step unregistered or the stage-2 switch at 0, 0 places and their count reported, and after an `editTable` that lowers the switch from 1 to 0, 0 opening places, each tombstoned (retired by §6.3's carry-over) as a fate of the edit and restored by its undo; after either switch edit, the underground re-derived with the ground by T1–T8, never held byte-identical; (c) an outfall's surface head draws in an opened close-up with the underground layer hidden, and not for a key that does not admit it; (d) one `ruin.node` line per `magical_node` deposit at `ruinCentre()`, none otherwise; (e) every access of source `opening` has role `access` but a skylight's `light` | PR |
| T-V4-75 | standalone neighbourhood documents (V01's T-V1-20) | on 100 standalone neighbourhood documents per `contextRung` (TOWN, CITY, METROPOLIS) on forced-cavern sites with a temple anchor: 0 sewer, quarry, buried or undercity elements; 0 vaults but a declared raised way's arch vaults and terminal cistern; ≤ 1 catacomb complex, its source a burial face inside the document, formed by TOWN's chance; caverns and ruins at their rows' rates at the `contextRung`; U-FORECAST's P5 kinds within {ruin, cavern, catacomb}, its catacomb expectation over burial faces inside the document only, and P6's verdict none; U-FORECAST called after the one-district allocation (V01 §3.10.1 step 6), P7's `voidDwellingHouseholds` ≤ `voidDwellings.share` × the one-district allocation's poorest-band households, and the underground pseudo-district's allocation ≤ `forecastSafety` × that forecast; the tail ≤ 12 ms p95 | PR (20), nightly |
| T-V4-76 | the lost reading (g item 113 (e), (g); takes over T113-5's underground clause) | (a) on a forced-void fixture whose one way in is a sewer run crossing a sealed cavern, a U-FADE `seal` of that run at an epoch turns the cluster `lost` in the same batch, its F6 dwellings abandoned (cause `rule:void-lost`) and their households returned displaced (cause `void`) and re-housed at that epoch's `siting`; a later `reopen` of the run, a new dig and a new overlap each refind it (`accessible`), and dwellings return at the next placement, never in the refinding commit; (b) an edit setting the last access `bricked` on a cluster holding F6 dwellings, then its undo: the cluster `accessible` and the dwellings byte-identical to before; an excavation undone leaves the cluster `unexcavated`, never `lost`; (c) a document holding `unexcavated`, `accessible` and `lost` clusters, saved and loaded, reads the same state on every cluster; (d) a cluster joined only through a `secret` link or a `locked` access reads `accessible` for every viewer and may hold dwellings while the way stays hidden at `public` (T-V4-21), and a `collapsed` or `flooded` link or a `bricked` access never joins; (e) a `lost` cluster draws in the sealed style for every key admitting it whatever `showUnexcavated`, an `unexcavated` one only at `secret` with `showUnexcavated` on, and its GeoJSON `excavation` reads `lost`; (f) the reading, its memory and the vacancies are byte-identical on the five engines; (g) a `Foundations.apply` collapse in `under.extend` and a host closure `under.access` reads, each ending a lived cluster's last open path after `siting`: the cluster `lost` in that participant's commit, its households re-housed inside the participant by §4.7's overflow pass and counted `households.undergroundVacated`, none in the ledger and none left for `close` (V06's T-V6-52) | PR, nightly |
| T-V4-77 | the buried former settlement (g item 113 (c), (g); takes over T113-4's underground clause) | on T113-1's city-to-village fixture and a refounded fixture: (a) former elements exist only where the replay's former fabric is older than its factored burial age (V11 §3.25.2), none younger; (b) each former gallery's centreline within 10 cm of its former way's last live centreline, each `storey` chamber's outline its former footprint (≥ `formerStoreyMinM2`), each wall band on its former enceinte run's chain, each floor `depthCm` below `levelledGroundCm` within 1 cm; (c) an element below `formerMinHeadroomCm`, under a present footprint or within reach of a basement ring or foundation obstacle created `collapsed`; (d) the replay run twice gives one digest on the five engines, and with the replay off 0 former elements and the output byte-identical (`item113.history`, the underground goldens registered on V12 §3.7.8's engine); (e) its clusters start `unexcavated`, are reached only through U-ACCESS's joins, and `HistoryRecord.buried` names the system; `W_BURIED_FORMER_SKIPPED` exactly when nothing passes | PR (fixtures), nightly |
| T-V4-78 | the clerk's providers and grade faces | (a) on fixtures with a ruin with a monument, a cavern, a `lost` cluster, an arch vault, the terminal cistern, a foundation pillar, catacombs in each `blockedBy` state and one burial face per `catacombOutcome` value: the `underground` section's rows equal V10 §3.9a's, every word a catalogue key — the excavation state by `info.under.sealed`, `info.under.lost` and `info.under.lostUndated`, the accessible state by V10 §3.9a's chain row —, `catacombOutcome` equal to U-SYS's candidate pass and `under/wayIn` to the connection graph's path; (b) at `public` no withheld id or fact in any row; a document with no underground answers `info.under.none`; after a load, an undo and a redo every answer equals the one before; (c) every `archVault` chamber's `gradeFaces` are exactly its two open faces, a street or bridge vault's its downhill face, every other chamber's none; a building seated in an arch vault takes its frontage entrance on a grade face with `faces` other than `tunnel` (V03's T-V3-32 reads the same faces) | PR |
| T-V4-79 | edges | each row of V04 §3.11's edge table on its fixture — (a) UE1, UE4, UE5; (b) UE2; (c) UE6's round trip of every field; (d) UE7; (e) UE8; (f) UE9; (g) UE10; (h) UE11; (i) UE12; (j) UE13; (k) UE14; (l) UE15; (m) UE16; (n) UE17; (o) UE18, a fixture forcing each failure row's detection; (p) UE19; (q) UE20; (r) UE21; (s) UE22; (t) UE23; (u) UE26; (v) UE27; (w) UE28; (x) UE30; (y) UE31 — gives the row's outcome and reports its rung, never a crash, a hang, lost data, a silent wrong result or a whole-map retry | PR (fixtures) |
| T-V4-80 | combinations | each row of V04 §3.11's combination table on its fixture at every rung it names — (a) UC1–UC4, (b) UC5, (c) UC6–UC8, (d) UC9, (e) UC10–UC11, (f) UC12, (g) UC14, (h) UC15–UC16, (i) UC18, (j) UC19, (k) UC20 — gives the row's outcome: (j) on river-town fixtures whose kept outfalls lie on one bank (a town astride a river, a walled core in a wet moat on level and on sloping ground, an island quarter, a river town whose candidates on one bank all lie upstream of a mill intake, `moat: 'none'`), 0 sewer edges, knots, gratings, drain runs, passages or outfall-run edges over a water face, each bank's plots connected only to runs on their bank, a bank with no admitted outfall draining to its moat — the mouth `freeboardCm` above the moat's derived level (§4.2 S3 (10)), never above its bank —, to its field outfall — on land beyond the outermost enceinte's outer strip, its D8 path and outfall run entering no water face — or, with a stretch empty or wholly on water or every stretch cell's path entering the river first, by gutter and pit reported unsewered, and a two-point `drawTunnel` across the river bent at the first point's bank, the bend named; (k) on a CITY fixture whose catacomb frontier grows over epochs toward a sewer run at a shared depth, at TOWN, CITY and METROPOLIS, one `breach` link per meeting element pair in the growth's commit, cause `overlap` naming the catacomb system and the epoch, its kind from `LinkRule.kinds`, no element moved or changing system, the run's knots, profile and `serves` byte-identical, no node refused `system` by the run, a run passed at another depth linked only by U-ACCESS (b)'s or the overlap shaft's chance, and save, load, undo and redo of each such epoch byte-identical; UC13 and UC17 are T-V4-75's, T-V4-17's, T-V4-48's and T-V4-76's | nightly, PR (fixtures) |
| T-V4-81 | Find on Below (g item 120 (f), (h), (k); takes T120-4's underground clause by (f), and T120-5's by (i)) | on the underground hook fixture and a METROPOLIS fixture holding sewer-front dwellings, an undercity with its tavern, fence and guild seat, an F4 concealed use, a ruin, a catacomb complex, an unexcavated cavern and a `lost` cluster: (a) each chip's Below matches equal §11.2's gazetteer match listing rows on underground parts at the view's key; (b) with Below shown at band b, every match with an element in b glows on exactly those elements and every other match — Below in another band, on Ground or on Sky — is one ghost pin at its plan anchor, the band ladder's counts equal the matches per band, and **Go there** makes Below the working layer and sets `depthBand` to the match's shallowest band, 0 events logged and `LayerSpec.visible` unchanged; with Ground shown, every Below match is a ghost pin and V09's Below count equals them; (c) an undercity district chip lifts exactly its blocks, walkways and plaza, a ground quarter chip exactly the elements of band b inside its outline; with Show gaps on, a kind chip whose class the fixture's sewer-front neighbourhood and F6 dwellings lack outlines the underground pseudo-district dashed "none here" in every band holding its plots, an undercity neighbourhood lacking it in the band holding its core, and a `walk` or `households` chip reads its per-plot units by `underDistance` — every gap Below equal to V01 §5.4 (3)'s `gapUnits`; (d) at `public`, 0 suggestions, counts, glows, pins or ghost pins for any element of the unexcavated cluster, any secret access, link or `dug` gallery, or the concealed use's true kind (T-V9-66's canary placed Below); at `secret` with `showUnexcavated` off the unexcavated match is a ghost pin, with it on it glows; the `lost` cluster's match glows for every key admitting it; (e) the document hash, every record of this volume, the excavation reading and `ExcavationRecord` identical with Find on and off, and Clear restoring the band's tiles byte-identical; (f) T120-4: the chips held across a band step, an `underView` change, a layer switch, an underground commit, an epoch, an undo, a redo, a regenerate, a load and a migration — a match the commit makes glowing at that commit, one it removes gone, a chip whose last match goes kept at count 0, dark; after the load, the redo, the regenerate and the migration the glowing set, the ghost pins and the band counts equal a fresh reading, the chips kept in the view pin; (g) a per-band PNG and SVG export draw Find as shown with the chips in the legend, a VTT scene none unless asked; (h) at the metropolis cap with Below shown, the glow within 100 ms of the click and `underFindPlaces` ≤ 2 ms p95; (i) T120-5: at the city band with Below shown on the METROPOLIS fixture, every match in the drawn band whose element is under about 6 px carries a pin with its chip's glyph, and pins and ghost pins closer than about 24 px merge into a count bubble whose number equals its members (item 120 (e), (k)); (j) at a drawn week whose frame is not the head (V04 §5.1 (7)), from the later of U5 and V06's E6, whose history frames (V06 §3.15.2) it reads — the METROPOLIS fixture advanced over epochs, one of which extends its catacomb complex and re-cuts an undercity district, and scrubbed to a week before that epoch —: the glow shapes, depth bands, ghost pins' bands, the band ladder's counts and **Go there**'s band those of `underFindPlaces` over that frame for §11.2's listing at that week, no glow over a gallery the frame lacks, the gaps Below V01's `gapUnits` at that week, and the head's reading back when the scrub returns to the head | PR (fixtures), nightly |
| T-V4-82 | damage below ground (g item 123 (b), (c), (e), (f), and g item 122 (d)'s look below ground; takes T123-1's, T123-2's and T123-6's clauses below ground) | on a fixture holding a ruined church with a crypt joined to a catacomb, a ruined building over a cavern with its dig access, a decayed building's cellar over a ruin, an undercity neighbourhood whose cluster turns `lost` and decays over a century of epochs, and a never-decayed control, at levels 0 to 1 in steps of 0.05: (a) T123-1: every room, wall, opening and id of each storey below 0 and of each underground building identical between the intact and the damaged plan; (b) T123-2: the damaged set of every element below ground at each level contains the set at every lower level, each element damaged exactly while the level is above 0 and at least its threshold (§6.3 *Plan damage*'s comparison), the same element breaking at the same level for a seed; (c) the kinds: `belowKind` gives each element of the fixture's storeys below 0 and rock-side runs its kind of V04 §5.6, no element of the five kinds damaged below the `ruined` share's floor (V06 §3.23 (2)), and at level 1 every crypt room, wall line, way down and the crypt join present, the crypt drawn partly collapsed; (d) a drawing only: the excavation reading, every access and link record, `ExcavationRecord`, the document hash and every digest byte-identical at levels 0, ½ and 1, every closure state unchanged by any level and the `lost` cluster still `lost` (UC21); (e) T123-6 per band: each band's dd2vtt holds no `line_of_sight` segment for an underground building's outer wall run past its threshold and keeps one for each `cellarWall` run past it, a door past its threshold no portal, and the rubble drawn in the image, never as a wall; (f) a restoration lowering the level clears the damage in reverse threshold order, each element between the level and its own `decayPeak` (since it entered the plan, V06 §3.23 (3)) drawn in patch material; (g) the never-decayed control and every band of an underground with no decayed building draw and export byte-identically to the build without the layer — the `item123.damage` registration of the underground's bands and per-band exports on V12 §3.7.8's engine (V12 §2.13), written by the U5 seat; (h) save, load, undo, redo, regenerate and migrate at levels 0, ½ and 1 re-read the same drawing, within V04 §6's *Damage below ground*; (i) the look (g item 122 (d); V03 §5.6 (4)): on a fixture calamity with its linked `reconstruction` condition whose disaster look ruins the district of two churches with crypts — one never decayed, one whose own level lies above the look's at severity 0 — at severities 0, ½ and 1: in the condition's weeks each crypt's elements draw at its church's drawn level (`PlanDamage.level`, the higher of its own level and the look's `lookLevel` by severity) by the same thresholds, and at its own level with Show crises off, in the weeks outside the condition's and from the week a Works begun on the church hands it over (V06 §3.22 (3)'s `crisisLookYields`; this clause once V06's E2 has landed); under View as at `public`, `local` and `secret` the same drawing, the condition `public` (§7.7's DR44), and a `none`-row condition carried beside it changing no crypt's drawing at any key; no element drawn repaired as the look leaves; each crypt join, every access and link record and every digest byte-identical with the look and without; each crypt storey's per-storey scene walls, portals and lights at the own level, the look in its image only; an underground building under the ruined district at its own level throughout | PR (fixtures), nightly |

**The owner's panel** (§13.6 without a reference; V12 §3.9.1's `PanelSpec` V4-U5, its spec stated here once and cited by
V12): at U5 the owner rates, blind to which is which, SOLO 30 — ten CITY and five METROPOLIS underground bands, each seed
in the historical and the navigable mode, shuffled, a ruin among the frames, each frame holding the cathedral's crypt (or
the largest church's) and the largest catacomb complex — on `legibility` and `realism`, with one render in the reference
family's hatched style beside the set, shown and never rated (V12's `styleReference`; the side-by-side of the parity
paragraph above); an unrated panel follows §13.6 (7) — the build continues, the milestone is *provisional — not rated*.
=== END ===

=== REPLACE ## 8 Build plan ===
## 8 Build plan

**Where it slots (J-V4.46; item 526; J122).** The underground is staged by the owner "after the city is mastered"
(DEFINITION §4): it is milestone **M6-U — the underground layer**, after M4 ("mastered") and after M5 (stage 2), beside M5
when a second pair of seats is free — owner question 1, decided (J122); §16 and INDEX.md carry the combined order. It reads
three services of V01's `@plat/hood`, which V01 builds in its W15 at M5 (V01 §8.2): `fabricSignature` (U3, the ruin's
distinctness step, V04 §3.5.0a (7)), `districtsAbove` (U4, C5's parent and the clerk's ruin answer, V04 §3.6, V04 §4.5) and the
local-place step's opening pass (U4, T6 and the commits of V04 §3.10). Run beside M5, U3's distinctness step and U4's C5 are
scheduled after W15's services land, and T6 runs the opening pass only while `@plat/hood`'s local-place step is registered
— a registry lookup (§4.12): absent, no opening place is made and their count is reported (V04 §3.11), and the first tail
run after it registers makes them, a declared shift of the places (§13.3) (J-V4.108). Its hooks are M4's (the records, the
tools, the closure rule, the basement row, the underground hook fixture); it builds on M2b's placement solver and
granularity law, M3a's edit system and API, M3b's exports, lights and night view; V06's replay (M6-E) calls its
`BuriedFormer.lay` only while `@plat/under`'s U-SYS is registered (a registry lookup), so a history replayed before U3 lands
clears its former fabric and buries nothing underground. V09's application share of the layer (AP6) lands with M6-U, priced
in §16's row for V09's staged screens, outside this total. Staffing per the owner: rulings on the Fable seat, building and
verification on Opus seats.

| step | content | exit (executed, not asserted) | est. (pw) |
|---|---|---|---|
| **U0 — spike** (risk retirement) | U-NET N1–N10 on B-CITY-lite (the graph, the tree, the root-first invert pass, the commit and `corridorUnion` on part 0); the tail scheduler with `phase` and its yield to view requests; U-DIG's A\* on the 160 × 160 grid; the METROPOLIS navigable tail on a forced-void site (T1, T2 with a ruin, T2b) | T1's p95 at CITY ≤ 40 ms (historical) and ≤ 80 ms (navigable); **the METROPOLIS navigable tail p95 ≤ 343 ms and U-ACCESS's sample count at METROPOLIS measured, each V04 §6 fallback triggered by it**; T-V4-1, T-V4-3, T-V4-5 green on 20 seeds per rung; the A\* identical on the five engines; the first map unchanged (§12.5); the register check (below) | 1.25–1.75 |
| **U1 — the network** | U-NET whole (N0–N12 with N3a and N11a, the three families, both presets; the part-0 reads, and N6's wall-crossing and cliff vertices with N7's drop: 0.25 pw); U-FORECAST wired into S7b (item 551) with P1–P6, `forecastSafety` and its own §12.4 row (item 475); T8 (U-RECONCILE); `Outfall` from S1 (item 205); the drain rule and `drainOf`; the two controls (item 403) with their S7b locality (item 549); the cut-away with its three modes and the band ladder; the `rock` and `void` roles; GeoJSON, SVG and PNG per band; the tail's S13a for runs; migration (V04 §4.6) | T-V4-1 – T-V4-8, T-V4-30, T-V4-33, T-V4-35, T-V4-39, T-V4-42, T-V4-64 (the network's part), T-V4-67; T14-1 as item 485 amends it (pixel parity under the parity presets); T-V4-79's (a)–(f) and (y) clauses for what U1 lands; T-V4-80 (j); **the default presets' one-time ground shift recorded as the M6-U output version's declared shift in `plat/goldens/`**; the tail within V04 §6 at CITY; the register check | 4.75–5.75 |
| **U2 — the sewer-front neighbourhoods** | U-FRONT (F0–F5) with the surplus absorption, members and clandestine modes; the neighbourhood accesses and shafts; the sewer light rows; `Junction.chamber`; labels of runs and the sewer-front district; VTT per band | T12-1 and T-V4-9, T-V4-10, T-V4-25 (sewer part), T-V4-26, T-V4-28, **T-V4-41 (existence, with its pre-decided fallback)**; T-V4-79 (g), (m), (w), (x); the crowding hook by hand; the register check | 2.75–3.75 |
| **U3 — the void systems** | U-SYS: **the ruin** (V04 §3.5.0a: sources, culture and axis, plan families, decay, distinctness, `RuinRecord`, `ruinCentre`; 2.5–3.5 pw), catacomb (layout), cavern with **the mining boost, fissures and the mine breach** (0.5–1 pw), quarry and mine voids with the surface split and chain mines, vaults, buried — the buried former settlement and `BuriedFormer.lay` among them (g item 113 (c)) — with `Chamber.kind`; **item 110's parts** (1–1.75 pw): the arch vaults and `ArchVaults.reconcile`, `gradeFaces`, the terminal cistern and the aqueduct-delivery cistern test, `foundationObstacles`, the ruin's monuments through V02's `drawTiers` and `layTiers` and its modelled columns; the system programs (the `ruin` program, the monuments, the pillars, the former wall bands) and labels; the dossier's system forcing (item 386, V04 §2.3a) | T-V4-11 – T-V4-17, T-V4-38, T-V4-43 – T-V4-47, T-V4-55, T-V4-56, T-V4-61, T-V4-62, T-V4-64 – T-V4-66, T-V4-68, T-V4-69, T-V4-77, T-V4-78 (c), T64-1 – T64-3, T65-4, T65-6 – T65-8 on generated output; T-V4-80 (a)–(f); the register check | 8–11.75 |
| **U3b — access and excavation** | U-ACCESS (T2b): overlap and mine breaches, proximity links, dig draws, public openings, reuse, the excavation reading with the `lost` state and `ExcavationRecord` (g item 113 (e)); F6's void dwellings and their vacancy on a lost cluster; the sealed style and `showUnexcavated`; the forecast's P7; the village working's breach at T2b and over `scope.workings`, the public-opening `placeAccess` and the opening pass's edit callers (the stage-2 switch's edit reaching the pass only as its re-derivation's T6, V01 §3.15, so nothing of its own to build; 0.25 pw) | T-V4-20, T-V4-21, T-V4-48, T-V4-49, T-V4-53, T-V4-54, T-V4-56's village clause, T-V4-57, T-V4-59, T-V4-76 (b)–(f); the register check | 2.25–3.25 |
| **U4 — the undercity, the catacomb rules and the closures** | U-CITY (C0–C6) with `District.core`, the read-only lifeline test, the rank draw, the carve post-pass, the plaza ring and visibility-graph walkways; `underDistance`; the forced vaults; **the catacomb rules** (burial-face candidates and catchments, the count, the rank cap, the ratchet, stagnation and fill, the quarry ossuary, the crypt join, the burial-face entrance, the charnel vault; 1.25–1.75 pw); **the crypt derivation**, moved from V03's P2 (`Basement.crypt` with its seed, growth and rank — V03 §3.7.4 steps 1–3, item 238 —; V02's crypt ladder with its `raised` form and lift, the lift and the half raise acting on the ground wings over the basement's ring (V02 §3.14.5 (d)); the stair-entered test and the whole basement of a crypt no stair reaches (V03 §3.7.4's *A stair-entered crypt* and its `always` bullet); and V03 §3.7.1's crypt clause of `basementDoor(b)`, the door point off the crypt's vault (item 578), whose first reading moves a walk-out church's outside door off its crypt and V01's entrance reserve with it (V01 §3.8.2 step 5; its close-up chunks stale by V01 §3.8.3's digest); 0.25 pw); the hand-offs of V03 and V07 (the join on `Basement.crypt`, the church-class host rule, `Entrance.faces`, `'rung'`, `v.parish_church`, the maintenance mode; 0.25 pw); the standalone line (V04 §3.1: a gate over the existing steps, within the range); U-LINK L1, L3, L5 (its always rung, the dug network and the release), L6, L7; U-DIG's pieces for `addUndergroundAccess`, the lifeline closure and L5, with the dwelling closure's way in and the grouped access (item 372; absorbed in the range); the read-ahead (V04 §4.7); the undercity light rows and labels | T65-1 – T65-5, T66-1 – T66-4, T66-6, T-V4-18, T-V4-19, T-V4-22, T-V4-34, T-V4-37, T-V4-40, T-V4-48's closures' clause, T-V4-50 – T-V4-52, T-V4-58, T-V4-60, T-V4-71, T-V4-74, T-V4-75; T-V4-79 (h)–(l), (q)–(u); T-V3-23 (j)'s door and basement-extent clauses (V03; they run from M6-U on); the crypt derivation's first reading recorded in the M6-U output version's declared shift (§13.3) — the churches' crypts and their basements, the `raised` form's lifted wings, and each walk-out church's outside door moved off its crypt with V01's entrance reserve — beside U1's forecast shift; the register check | 5.25–7.25 |
| **U5 — time, 3-D and hardening** | U-FADE, `extend` (with the wall drops over `EpochScope.levelled`), `CatacombGrowth.grow`, `UndercityEpoch.reread`, `ArchVaults.reconcile` over `EpochScope.raised` and access at an epoch (item 319; V06's `under.extend`) run by hand and on M4's grow path; **the epoch contracts** (0.25–0.5 pw): U-NET laid whole at the first sewers epoch, `AccessPassStrategy.run` over an `EpochScope` with the `lost` transitions, `CatacombGrowth.grow`'s `opts` and the primary reading, `QuarryWorkings.extend` and `workedOut`, the landfall closure; `Foundations.apply` with its `FoundationsResult`, F6 filled by V06's relocation, the calamity deaths in `CatacombGrowth.grow`, the buried floor's terraces under `raiseGrade`, the opening pass's epoch callers (0.25 pw); the clerk's providers (V04 §4.5); glTF and CityJSON of the underground; performance at METROPOLIS with item 119's comfort-level runs (T-V4-32 (b)); Find on Below (`underFindPlaces`, item 120, at U5 — M5, Find's milestone, lands before M6-U); both absorbed in the range (J-V4.126, J-V4.127); **the damage below ground** at the later of U5 and V03's P4 (item 123: `belowKind`, the underground view's damaged footprints, the per-band exports, the look over a storey below 0; a plan's storeys below 0 drawn with V03's P4; 0.25 pw; J-V4.130; V04 §5.6 (6)); the owner's panel | T-V4-23, T-V4-24, T-V4-27, T-V4-29, T-V4-31, T-V4-32, T-V4-36, T-V4-63, T-V4-70, T-V4-72, T-V4-73, T-V4-76 (a), T-V4-78 (a)–(b); T-V4-79's remaining clauses, T-V4-80 (g)–(i) and (k), T-V4-81 ((j) at the later of U5 and V06's E6), T-V4-82 (at the later of U5 and V03's P4); the epoch clauses of T-V4-15, T-V4-52, T-V4-56, T-V4-65 and T-V4-74 (b); the panel rated or offered (§13.6 (7)); the register check | 3.25–4.5 |
| content | the naming slices (item 445, the `ruin` slice with V11), the dossier row sets (V04 §2.3a), the ruin, openings, dig and catacomb tables, the ancient-culture rows reviewed with V11, the light rows' tuning, the underground's style rows in every shipped sheet (V04 §5.2) | reviewed by the clean-room scanner (§17.1); every cell with provenance; the register check | 1–1.5 |
| **total** | | | **28.5–39.5** (accepted, owner question 2, J122; §16's total is the base's, computed once, item 568) |

**Item 110's dependencies.** The raised-way record with its spans' `use` (item 244), `RetainingWall` and the levelling land
with the base's item 110 side at M3a, and V02's `layTiers` with the base outline builder at M3a (item 229) — both before
M6-U, so M6-U waits on nothing new. The second known-city fixture (V12, M3a) carries a raised road, a ravine and a stepped
temple; this volume runs T-V4-62 – T-V4-70 on it from U3.

**The register at each exit** (X-V12-16; J-V4.117, J-V4.118). Every step above that lands a registry table of this volume,
or a calibratable column of one, exits with "`plat calibrate register --check` green over the cells it lands — their entries
from V12 §3.11's default line (`plat calibrate register --defaults --milestone <the step's id>`) unless a V12 §3.11 line
names the column" — the *register check* of the table above. The lint runs at PR tier from M1 (T-V12-20), so the change
that lands a column carries its entry, never a later change (V12 §3.11, *Every volume's landing exits green*). A table lands
whole, every column, in the first step whose change first ships its rows (holds a compiled cell; V11 §2.1's empty-table
rule: every registry row compiles from C0 as its schema's empty table, J-V11.84, and `--defaults` writes no entry for an
empty table's column), and that change writes one entry per calibratable column (V11's `ColumnSpec`; `rows` absent, so a row
a later step adds — a light row, an opening kind, a culture row — needs none); a table that first ships rows in an earlier
step than planned below takes its entries in that step, the check failing the step otherwise. The landing seat writes the
named lines' entries first, then runs `--defaults` for the rest (V12 §3.11's order). Each change that lands a V04 stage names
its `U-*` id among the readers of the registry rows its stage reads (57, 58, 58a, 59; V11 §8's readers paragraph). V11's
cells in these tables are authored by V11's C8 (V11 §8), whose rows land inside the step that first ships their table's
rows, so that change carries C8's entries by V12 §3.11's lines for them — the check reads the change, not the seat. A base
cell that one of this volume's requests (V04 §10) adds lands with the step that builds its reader, owner `base`, by a V12
line where one names it, else by the default line (V12 §3.11's items 109 and 110 paragraph); so do the cells of the base's
II.7 tables (registry rows 57 and 59) where a step here, not M4's hook fixture, first ships their rows. Keys, laws,
enumerations, switches, word lists and dossier row sets take no entry (V11 marks them `calibratable: false`). This volume
writes no register line of its own (J-V4.117). As planned:

| step | first ships rows here — holds a compiled cell, V11 §2.1's empty-table rule (registry row) | each column's entry from |
|---|---|---|
| U0 | `under.network` (58), every column — N1–N10 read it | the default line |
| U1 | `under.layout` (58), every column — S14's access symbols (its `openings` rows, N11's gratings) read it; and the base cell `forecastSafety` of `under.rule` (57; II.7.4's `UndergroundRule`, item 551), whose reader U-FORECAST lands here | `under.layout`: the default line; `voidDwellings`, `links.overlapShaftM` and `links.overlapShaftChance` by V12 §3.11's "V04's other item-109 cells" line, which is the default line's entry itself (one entry each); `forecastSafety`, owner `base`, by the default line |
| U2 | none of this volume's: the sewer light rows are rows of the base's `lights` (51), whose columns the base's landing of that table already bound | — (the check runs and is green) |
| U3 | `under.ruin` (58a), every column; `under.catacomb` (58a) — U-SYS V04 §3.5.1 and T-V4-11 read it; this volume's `params` keys of `under.systems` (59): every row's `surfaceClearCm` and the `cavern`, `quarry`, `vaults`, `buried` and `dug` keys of V04 §2.3 | `under.ruin`: V04's cells by V12's `under.ruin` V04 line, V11's (`chance`, `cultures`, `survival`, `sourceWeight`) by V12's lines for them; `under.catacomb`: `ossuaryReachM` by V12's line for it, V11's cells by V12's `under.catacomb` line; `under.systems`: `mineBoost`, `mineCap`, `fissureChance` and `breachM` by V12's item 109 (a) line (owner `base`), `miningCellShare` by V12's line for it (V11), every other key by the default line |
| U3b | `under.openings`, `under.dig` (58a) — U-ACCESS reads them; and the base cell `accessForecastMin` of `under.rule` (57; II.7.4's `UndergroundRule`), whose reader, P7, lands here | `coverM` and `planReachM` by V12's lines for them; V11's cells by V12's `under.openings` and `under.dig` lines (`sealedFloor` by its own); `accessForecastMin`, owner `base`, by V12 §3.11's "V04's other item-109 cells" line |
| U4 | none: the catacomb rules, U-CITY, U-LINK and U-DIG read tables U1 and U3 landed | — (the check runs and is green) |
| U5 | `under.fade` (58), every column — U-FADE reads it | the default line (V12's "V04's other item-109 cells" line names the fade rows and defers to it) |
| content | none: the naming slices (68) and the dossier row sets (V04 §2.3a) are not calibratable; the light rows' tuning and the underground's style rows in every shipped sheet are rows of tables (51, 52) whose columns the base's landing already bound — entered, or not calibratable | — (the check runs and is green) |

**The due steps.** A V12 §3.11 line whose `measure` names a step at which the bar it cites does not run in this plan is due
at the step whose exit runs that bar, written `'V4-<step>'` (a volume's phase as V12 §2.8's milestone ids write it,
`'V4-U5'`): the `under.openings` and `under.dig` lines' "`measure` at U3" (the bar map's 109 (j) (5) rows, T-V4-49 and
T-V4-54) at `'V4-U3b'`, and the `under.ruin` `sourceWeight` line's (the 109 (i) row, T-V4-58, U-CITY's source choice) at
`'V4-U4'`; every other V04 line falls due where it says (U3 for the ruin, cavern and span-rule measures, U5 for the V4-U5
panel, and the default line's due for the default line — V12 §3.11: M-CAL, or `M-CAL/under`, the underground's later corpus
run, when a step lands after M-CAL).

**What V12 §3.11's V04 lines leave to this section** (J-V4.118). Its `under.ruin` V04 line and its span-rule line close on
"V04 §8's pre-decided fallbacks, else the panel rule". The history row at each stage, and what passes it (V12 §3.11's
*Staged entries*: the last non-`corpus` stage's pass confirms), and the pre-decided move:

| cells (V12 §3.11's line) | the history row at each stage, and what passes it | the pre-decided move (once; the bar re-runs or the group re-sits) | a second miss |
|---|---|---|---|
| `distinct.retries`, `distinct.rotateDeg` (the `under.ruin` V04 line) | T-V4-45 at U3: the `W_RUIN_SIMILAR` share and V12's `paired` margins on `ruin.blockArea`, `grid.r4` and `grid.axis` — the U3 stage passes when the share ≤ 5 %; the V4-U5 panel's rated pass confirms | only when T-V4-45 still fails after V11 §3.23.4's culture-row move (V12's `cultures` line) has run: `distinct.rotateDeg` 30 → 45, a grid's greatest axis difference, as a `fallback` run (V12 §3.7) | `not-achieved`, reported to the owner as a table defect (V12 §5.5) |
| `monument.clearM`, `.tierDecay`, `.ceilingClearCm`, `.moundShare` (the same line) | T-V4-68 at U3 (conformance, 0 violations; it moves no cell), then the V4-U5 panel's `realism` on the frames holding a ruin, which confirms | a No at V4-U5: `monument.tierDecay` 0.85 → 0.9 and `monument.ceilingClearCm` 200 → 150 — more tiers stand and fit under the chamber's ceiling, T-V4-68's clearance clause reading the new margin | the panel rule: `not-achieved`, reported |
| the line's other V04 cells — `ancientYears`, `significance`, `maxFrameShare`, `maxChambers`, `forecastFloorShare`, `depthM`, `burialByAge`, `smoothM`, `sharedAxisChance`, `ageRefYears`, `coverKeep`, `fadeFactor`, `magicLightChance` | T-V4-43's presence rates and T-V4-44's structure at U3 (the U3 stage passes when both pass), then the V4-U5 panel, which confirms | none stated | the panel rule |
| the span-rule constants — the cells `raisedWays.structure.span.*` (row 80; the rule at §2.7, item 244; their values in V11 §3.24.2) — base cells landed at M3a with the base's item 110 side, never by a step here | the M4-110 panel at M4, then T-V4-62 at `V4-U3` (conformance, 0 violations; the stage passes), then the V4-U5 panel's `realism`, which confirms (V12 §3.11's span-rule line, the line's home) | none stated | the panel rule |

T-V4-62 reads no `under.ruin` cell: the `under.ruin` V04 line's history row records the bars this table names for its groups
(T-V4-43, T-V4-44, T-V4-45, T-V4-68), and T-V4-62's row belongs to the span-rule line. No line names a `bar.T-V4-n` metric,
so this volume registers no `BenchBarDef` (X-V12-15).

**Risks, in order.** (1) The tail's time at METROPOLIS in the navigable preset, now with a ruin and the access pass (U0
measures at METROPOLIS; V04 §6's fallbacks). (2) The forecast's miss moving households between the surface and the
underground (T-V4-8; `forecastSafety`, the absorption below and T8 absorb it; a miss over 25 % re-tunes P4's admissible share
and P7's building estimate). (3) `corridorUnion` on sparse, frame-sized rock faces (U0; §3.7's fallback applies unchanged).
(4) Legibility of the dark underground and of the ruin program (V04 §5.3's plan lines; the owner's panel). (5) The volume
laws giving voids too large or too small to host an undercity (T-V4-11, T-V4-13; the rows are calibratable). (6) A ruin
plan too like the town above (T-V4-45). (7) The span rule leaving too many or too few arch vaults (T-V4-62;
`span.vaultShare` and the cap are calibratable rows). (8) Shallow ruins cutting most monuments to stubs (T-V4-68; the
owner's panel; `burialByAge` is calibratable; the pre-decided move above: `monument.tierDecay` 0.9, `ceilingClearCm` 150).
(9) Built beside M5, M6-U waiting on V01's W15 services (`fabricSignature`, `districtsAbove`, the opening pass): U3's
distinctness step and U4's C5 are scheduled after them, and the opening places arrive as a declared shift.

**Risk spikes.** (a) At U3's start: the ruin plan's distinctness and structure bars (V12's `paired` and `twoSample`) on 50
fixture seeds; pre-decided fallback: the next culture family becomes the default draw. (b) At U3b's start: the excavation
reading's per-commit cost at METROPOLIS (≤ 1 ms); pre-decided fallback: the reading recomputed per band of parts touched
rather than per cluster, cached by part digest.

**Evidence that ends each step** is the step's bars executed and quoted, the declared shifts recorded (§13.3), the register
check green over the cells it lands (*The register at each exit*, above), and `docs/lane-events.log`'s LANDED line.
=== END ===
