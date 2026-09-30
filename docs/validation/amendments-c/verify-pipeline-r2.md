# verify-pipeline-r2 — lane amendments-c/verify-pipeline-r2 (the PIPELINE part after repair round 2)

> PENDING FABLE REVIEW — Opus-produced (amendments-c/verify-pipeline-r2).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 inputs read (verify-pipeline-r1, repair-pipeline-r2 report, assemble-r2, the five sibling repair-r2 reports' cross-part notes, verify-model-r2; part diff pre-r2 → live): done
> STEP 1 re-check of VPR1-01 … VPR1-17 and the sibling r1 rows routed here (live text quoted): done
> STEP 2 new-problem / single-source / stale / deferral / reference / held-part sweep of the ten repaired subsections: done
> STEP 3 cross-part notes addressed to this part (repair-r2 reports): done
> STEP 4 report body: done
> STEP 5 queue row, LANDED line: done

Design read: docs/ARCHITECTURE.md sha256 3daa0b0731b8c76f… (17 215 lines); rationale bfa20419ca4dd6e5…. Before:
docs/archive/ARCHITECTURE-pre-amendments-c-repair-r2-2026-09-28.md (024c57da…). Scratch: scratchpad `vpr2/` (part
extracts `pre-part.txt`, `live-part.txt`; word diff `part.wdiff`, 21 hunks, every one read; `added.txt`).

## Outcome

Repair round 2 fixed all 17 r1 issues of this part — the 13 pipeline-owned rows (VPR1-01, -03 … -14) at their homes, and
the four other-owner rows (VPR1-02, -15, -16 determinism; VPR1-17 scope) by their owners — together with the sibling r1
rows routed here (V-MC1-02, V-MC1-08, VKC1-04, VKC1-05, VD1-09, VD1-10, VD1-14, VS1-02). The one major issue of r1
(VPR1-01: a dossier household sent to F-SITING's manifest rung) is closed: §4.5 (5), §5.2's F-SITING row, T72-9 and
J-A72.50 now agree that no household that fills a dossier's population is ever a shortfall. Every item routed here is
PRESENT (72 and 88 were PARTIAL in r1). Gates (a)–(c) hold for the new text; no deferral wording; every new reference
resolves.

**8 issues are open, all minor, none needing an owner ruling.** Seven are new, created or exposed by round 2's text: the
scar-made buried town's gating, depth wording and duplicated values (VPR2-04, -05, -06), the frame growth's re-derivers for
the underground parts no stage derives (VPR2-03), §4.7 S10b's "only in S7b's reconcile" left stale by J-A72.50 (VPR2-01),
§4.7 (1)'s "resolved once" beside the new re-resolution (VPR2-02), and §14's registry comment (VPR2-08). One is a
referencing wording at determinism's F4 row (VPR2-07). Owners: pipeline 6, determinism 1, scope 1. The model twin of the
buried town's `sources` (V-MC2-02, verify-model-r2) is concurred and not re-filed.

## 1. Items — status after round 2 (r0/r1 verdicts in verify-pipeline-r0 §1 and verify-pipeline-r1 §1; only changes quoted)

| item | role | r1 | r2 | the repaired mechanism, quoted from the live design | open |
|---|---|---|---|---|---|
| 72 | home | PARTIAL | PRESENT | §4.5 (5) "a household no such district holds going to the district, in S7b's order, whose written range lies nearest its band and whose capacity holds it — or, when it fills a dossier's population and no district's capacity holds it, staying in its own, housed there by §4.7's re-provision … never a shortfall, so the population stays whole … and only a household that fills no dossier's population and that no district's capacity holds meeting F-SITING's ladder (§5.2)" | VPR2-01 |
| 88 | ref | PARTIAL | PRESENT | §4.5 (6) "a dossier institution's visible impairment (`DossierInstitution.impairments`, §14; §7.7's F4 row) whose type is a non-physical row of `PortRows.impairments` … lowers that institution's own term"; §10.2 "`hinterland: { … } \| null /* one row; null while empty */`"; II.7.6 "At generation none exists unless the port fills the staged `HistoryHint` (item 88) with a `fire` or `flood` scar … of `severity` ≥ the `buried` row's `scarSeverity` (0.5)" | VPR2-04, -05, -06, -07 |
| 65 | home | PRESENT | PRESENT | §4.2 S0 "`relief: 'auto'\|'plain'\|'rolling'\|'hilly'\|'mountainous'` … default 'auto' — the per-rung feature table's relief row, drawn on blueprint.features … a dossier's site.terrain sets it by §7.7 DR1"; S1 (1), S1 (10), S2 and §4.9 read "S0's relief class"; §4.11 "on each underground part §3.2 (9) grows, that part's stages for its cleared faces"; II.7.6's scar rule | VPR2-03, -04, -05, -06, -08 |
| 81 | ref | PRESENT | PRESENT | §4.11 "every stored height unchanged and the flow fields recomputed over the grown grid"; "A dossier outside the ladder — below 1 500, or above the 120 000 cap — is refused by the port (§7.7 item 15, item 81; §1.1; J-A81.01)" | VPR2-03 |
| 63 | home | PRESENT | PRESENT | §4.7 (1) "The resolved mode is stored on the concealed use, with its map-side source (`Use.concealmentSource`, §2.7) when the dossier gave none; … one the dossier set is dossier-owned, a map `setAttr` of it refused (§7.7 items 7, 11; J-A20.77, J-A63.22); a dossier event that withdraws the mode it set re-resolves it by this order from the map-side sources" | VPR2-02 |
| 50, 70 | ref, home | PRESENT | PRESENT | §4.7 S11 "the main entrance on the footprint side facing the plot's frontage access edge, where §2.6's rule 1 places it" | — |
| 67 | home | PRESENT | PRESENT | §4.10 "a building's description reads its Works stage at the drawn week (§4.11's *Which week is drawn*: the document's week unless the viewer's `week` key names another)" | — |
| 68 | ref | PRESENT | PRESENT | II.7.3 "a light at every sewer-front dwelling's door — its windows lit by §8.4's derived window lights —"; II.7.5 "a light at every door (the windows lit by §8.4's derived window lights), along walkways (`gallery` rows, arena `underground`)" | — |
| 66 | ref | PRESENT | PRESENT | II.7.6 "the closure rule — one event whose batches commit together" | — |
| 77 | ref | PRESENT | PRESENT | unchanged in this part; §7.7 and DR3 now read "`road` partners' bearings" (VPR1-16) | — |
| 33–40, 42–47, 57, 58, 61, 64, 71, 76 | home | PRESENT | PRESENT | unchanged (r0/r1 quotes stand) | — |
| 20 (h), 75, 78, 79, 80, 82, 101 | ref | PRESENT | PRESENT | unchanged | — |

## 2. The r1 issues the repair claimed — re-checked in the live text (all FIXED)

| r1 id(s) | owner | verdict | live text (line) |
|---|---|---|---|
| VPR1-01 | pipeline | FIXED | §4.5 (5), l. 4818 (quoted in §1); J-A72.50 index l. 17135 and Part A l. 759 agree; T72-9 l. 13479–13486 carries the dossier clause |
| VPR1-02 | determinism | FIXED | §5.2 F-SITING, l. 6905: detection "S10a's band-range re-homing (§4.5 (5)) finds no district whose capacity holds a household that fills no dossier's population"; ladder "cross-district moves only in the allocation's own reconcile (S7b) and in S10a's band-range re-homing" |
| VPR1-03 | pipeline | FIXED | §4.5 (6), l. 4824; §10.2 `conditionSteps`, l. 11636; J-A88.42; T88-2 l. 13562 (see VPR2-07 for the F4 row's wording) |
| VPR1-04 | pipeline | FIXED | II.7.6 l. 16036 (quoted in §1), the stage order l. 15992 and l. 16107, the `buried` params l. 16099, II.7.5's prediction l. 15884, J-A65.46 (see VPR2-04 … -06) |
| VPR1-05 = VKC1-04 | pipeline | FIXED | §4.11 l. 6414 "every stored height unchanged and the flow fields recomputed over the grown grid" (= §3.2 (9) l. 2603–2606) |
| VPR1-06 = VD1-14 = VS1-02 | pipeline | FIXED | §4.11 l. 6415 (quoted in §1); §7.7 item 15 l. 9404–9409 states both refusals |
| VPR1-07 = VKC1-05 | pipeline | FIXED | §4.11 l. 6414 "on each underground part §3.2 (9) grows, that part's stages for its cleared faces — part 0's network stage its bands by `corridorUnion` (II.7.2) and II.7.3's stage its plots, each other system's stage its own part's bands (II.7.6) and II.7.5's stage the undercity's plots there" (residual: VPR2-03) |
| VPR1-08 = V-MC1-02 = VD1-09 | pipeline | FIXED | §4.7 (1) l. 5500 (quoted in §1) (residual wording: VPR2-02) |
| VPR1-09 = VD1-10 | pipeline | FIXED | II.7.6 *The pieces an access edit generates* "one event whose batches commit together" |
| VPR1-10 | pipeline | FIXED | §4.10 l. 5997 |
| VPR1-11 | pipeline | FIXED | II.7.3 l. 15711; II.7.5 l. 15937; `LightRule.host` l. 5575 has `gallery`; `live.windows` l. 9944, l. 10264 |
| VPR1-12 | pipeline | FIXED | §4.2 S0 l. 3865; S1 (1) l. 3886; S1 (10) l. 3994; S2 l. 4027; §4.9 l. 5871, 5889; J-A65.49 |
| VPR1-13 | pipeline | FIXED | §10.2 l. 11637; §4.9 l. 5850 and DR19 l. 9305 read one row |
| VPR1-14 = V-MC1-08 | pipeline | FIXED | §4.7 S11 l. 5388 = §2.6 l. 1135 and §5.3 l. 6952 |
| VPR1-15 | determinism | FIXED | §6.1 l. 7173–7176: the geology uniform "and then the relief toggle's `auto` pick … appended after them in that order, and each drawn whether its toggle is `auto` or set" |
| VPR1-16 | determinism | FIXED | §7.7 l. 9022 "`road` partners' bearings are among S3 (4)'s requested external bearings"; DR3 l. 9289 |
| VPR1-17 | scope | FIXED | §13.2 T65-7 (l. 13416), T70-6 (l. 13463), T72-9, T77-1's S3 (7) clause (l. 13544), T88-1 (l. 13557) |

The sibling r1 rows this seat concurred with in r1 (verify-pipeline-r1 §5) are fixed by their owners: VD1-01 (§7.7 item 15),
VD1-02 (§7.5 l. 8848, `placeAccess` l. 7868), VD1-03 (J-A88.73; DR17), V-MC1-01 (§2.7 l. 1817), V-MC1-03 (§2.7 `LightSource.host`
l. 1861), V-MC1-05 (`HistoryHint` l. 1868), VKC1-06 (T81-1).

## 3. The checks (the ten repaired subsections: §4.2, §4.5, §4.7, §4.9, §4.10, §4.11, §10.2, II.7.3, II.7.5, II.7.6)

* **Diff scope.** The part's word diff pre-r2 → live has 21 hunks, all in those ten subsections, each an intended edit of
  the repair (plus rendering's hand-off 4 in II.7.3); no other subsection of the part changed.
* **SINGLE-SOURCE.** The relief toggle (§4.2 S0; S1 (1), S1 (10), S2, §4.9 and §6.1 cite it), the re-homing (§4.5 (5); F-SITING,
  T72-9 and §4.7 S10a (ii) cite it), the impairment hook (§4.5 (6); §10.2's comment gives its unit with a pointer), the
  buried scar rule (II.7.6; II.7.5, §2.7 and §4.2 S2 point to it) and the concealment resolution (§4.7 (1); §2.7 points to it)
  are each stated once. One duplicate: the scar rows' values inside II.7.6 (VPR2-06).
* **STALE.** The retired-rule grep (central market, immutable, licence, binary, fixed by tier or rung, terrain or water that
  never change, the map editing the dossier, lots as buildings) gives the same 9 benign hits before and after. Newly
  stale: §4.7 S10b's "moving demand between districts happens only in S7b's reconcile" (VPR2-01; J-A72.50's re-homing is a
  second cross-district move since round 1) and §4.7 (1)'s "resolved once" (VPR2-02).
* **CROSS-PART** (repair-r2 reports' notes to this part). Model: V-MC1-02's withdrawal clause — folded as a closing clause
  of (1), the "once" left beside it (VPR2-02). Kernel note 2 (VKC1-05 matches "Every underground part … grows") — satisfied.
  Determinism: pipeline hand-off (2) folded in §5.2 — satisfied. Rendering: hand-off 4 (II.7.3 secret shaft) — applied, reads
  with §8.1 item 7 (l. 9651–9655); the §4.7 light note needs no change. Scope: pipeline note 2 (a)–(d) — T65-7, T65-8, T72-9,
  T88-2 carry them. The pipeline seat's own note (3) to model (`UndergroundSystem.sources`) — unfolded, filed by
  verify-model-r2 as V-MC2-02 (concurred, §5).
* **DEFERRAL-WORDING.** None in the 68 added runs (no TBD, later, open, pending, future, deferred).
* **BROKEN-REFERENCE.** Every J id the new text cites (J-A20.72, J-A20.77, J-A63.22, J-A65.49, J-A81.01; the restated
  J-A65.46, J-A72.50, J-A88.42) is one index row and one Part A entry; every § pointer (§1.1, §2.7, §3.2, §4.2, §4.5, §4.7,
  §4.9, §4.11, §6.3, §7.1, §7.7 items 2, 7, 11, 15 and F4, §8.1 item 7, §8.4, §13.2 T19-4, §14) and every named paragraph
  (*A buried old town*, *Depth bands*, *Households per building*, *Which week is drawn*) resolves; `District.growthStage`
  (l. 970) and `DossierInstitution.impairments` (l. 14336) exist.
* **NEW-PROBLEM.** VPR2-03 (event-made underground parts have no re-deriver at frame growth), VPR2-04 (the scar rule versus
  "gated … by its row's chance" and `chance`'s "absent: none"), VPR2-05 (depth versus cover left to the reader).
* **Gates.** (a) No held part in the part (160 / 162, visibly differ, 16-cell, cast shadow: 0 hits, as before). (b) The new
  text states no reference behaviour. (c) No reference identifier; the new numbers (relief weights, scar rows) are our own.
* **Owner fidelity (63–72, 20 (h), 101).** Item 72 (d‴): the range now bounds every household without ever dropping one of
  a dossier's population — the owner's "bounds … of what any building inside of it can be" and item 20's authority both
  hold. Item 65: a buried town at generation only from a recorded dossier scar keeps ruling 5's "the evolution log supplies
  it" (the scar is that history). Item 63: a dossier-set mode is the dossier's, a map edit refused, as item 20 (h) requires.

## 4. Issues (each with its owning part and the exact required change)

| id | sev | kind | owner | item / where | claim | required change |
|---|---|---|---|---|---|---|
| VPR2-01 | minor | stale | pipeline | 72 (§4.7 S10b, l. 5278–5279) | "it never reaches into another district — moving demand between districts happens only in S7b's reconcile" — since J-A72.50 (round 1, restated in round 2) S10a's band-range re-homing also moves households between districts, as §5.2's F-SITING ladder now says. | → "it never reaches into another district — moving demand between districts happens only in S7b's reconcile and in S10a's band-range re-homing (§4.5 (5); J-A72.50)". |
| VPR2-02 | minor | new-problem | pipeline | 63, 20 (h) (§4.7 *Concealed institutions* (1), l. 5495–5500) | Round 2 added "a dossier event that withdraws the mode it set re-resolves it by this order", but (1) still opens "It is resolved once, when the institution is first placed"; and what a re-resolution does to the placed building (a least-disruption mutation, an open use where it yields `none`) is stated only in §2.7's comment, while (1) calls itself "the one statement of how such an institution is resolved, placed and built" (model r2's note asked for the clause beside "once"). | "It is resolved once, when the institution is first placed, from the first source that gives one:" → "It is resolved when the institution is first placed — and again only when a dossier event withdraws the mode the dossier set (below) — from the first source that gives one:"; and "re-resolves it by this order from the map-side sources (§2.7; J-A63.22)." → "re-resolves it by this order from the map-side sources, the use re-placed by (2)–(4) as that event's least-disruption mutation (§7.7 items 5, 11 (b)), as an open use where the order yields `none` (§2.7; J-A63.22)." |
| VPR2-03 | minor | missing | pipeline | 81, 65, 66 (§4.11 *The rung at an epoch*, l. 6414) | The re-derivers of a grown underground part's cleared faces are stages; a `buried` system made by a `raiseGrade` event and the `dug` system (item 66's edit-made passages) have no stage, yet §3.2 (9) grows every part and its L1 clearing removes the bands nested in the part's outer rock face — in a sparse `dug` part that face holds every passage's half-bands. Nothing re-lays them. | After "each other system's stage its own part's bands (II.7.6) and II.7.5's stage the undercity's plots there" insert "; a part no stage derives — a buried town a `raiseGrade` made, the `dug` passages — its cleared bands re-laid from its kept gallery chains by `corridorUnion` (§3.7), which draws nothing". |
| VPR2-04 | minor | conflict | pipeline | 65, 88 (II.7.6 *The derivations*, l. 15994–15995; `UndergroundSystemRow.chance`, l. 16097) | "Every system is gated to TOWN and above (PART III) and by its row's chance per rung" and `chance` "absent: none", while the new scar rule makes a `buried` system at generation that "draws nothing" and reads `scarSeverity`, not a chance; a reader applying the gate as written never makes it. | "Every system is gated to TOWN and above (PART III) and by its row's chance per rung; the chances are 0 in the parity presets." → "Every system is gated to TOWN and above (PART III) and by its row's chance per rung — a history scar's buried town by the `buried` row's `scarSeverity` instead, drawing nothing (*A buried old town*, below); the chances are 0, and the scar rule off, in the parity presets."; `chance` comment "/* absent: none; never below TOWN */" → "/* absent: none (the buried row's generation-time town reads scarSeverity instead, A buried old town); never below TOWN */". |
| VPR2-05 | minor | partial | pipeline | 65, 88 (II.7.6 *A buried old town*, l. 16036) | "laid `scarBaseCm + scarGainCm × severity` (200 + 200 × severity) cm below the present grade within *Depth bands*' cover rule (above)" leaves open which wins where the scar depth and the cover rule disagree, and whether the depth is the floor's. *Depth bands* lays a buried town "at its old grade". | → "its floors laid at `scarBaseCm + scarGainCm × severity` (200 + 200 × severity) cm below the present grade — its old grade, at which *Depth bands* lays a buried town (above)". |
| VPR2-06 | minor | duplicate | pipeline | 65, 88 (II.7.6 `UndergroundSystemRow.params`, l. 16099) | The comment gives the scar rows' values "scarSeverity (0.5), scarBaseCm (200), scarGainCm (200)", which the bullet (l. 16036) also states; every other kind's params are listed by name only, their values stated once in the bullets. | "scarSeverity (0.5), scarBaseCm (200), scarGainCm (200) — the buried row's generation-time scar rule;" → "scarSeverity, scarBaseCm, scarGainCm (the buried row's generation-time scar rule);". |
| VPR2-07 | minor | conflict | determinism | 88 (§7.7 F4 row, l. 9373; the `impaired` state row, l. 9390) | Both rows say the non-physical impairments reach "the power slice's dial only"; round 2's §4.5 (6) and restated J-A88.42 make it the impaired institution's own dial term, "never from a settlement-wide" reading — the F4 wording can still be read as the power's standing (town-wide) and does not point to the home. | F4: "the non-physical — legitimacy, influence, wealth, staffing, corruption — the power slice's dial only" → "the non-physical — legitimacy, influence, wealth, staffing, corruption — the impaired institution's own dial term only (§4.5 (6); J-A88.42)"; l. 9390: "the non-physical reach the power slice's dial only" → "the non-physical reach the impaired institution's own dial term only (§4.5 (6))". |
| VPR2-08 | minor | stale | scope | 65 (§14 `StrategyRegistry.underground` comment, l. 14268) | "registered after the network stage by declared I/O — the systems (catacomb, cavern, quarry, vaults)" omits the generation-time buried system II.7.6 now registers after vaults (l. 15992, l. 16107). | "the systems (catacomb, cavern, quarry, vaults)" → "the systems (catacomb, cavern, quarry, vaults and, at generation, a history scar's buried town)". |

## 5. Sibling r2 findings touching this part — read, concurred, not re-filed

V-MC2-02 (verify-model-r2; model): §2.7 `UndergroundSystem.sources` lists only "the raiseGrade that buried a town", while
II.7.6's scar rule makes the growth-stage-1 districts a generation-time buried system's `sources` — the pipeline repair
seat's own note (3), unfolded; real on reading l. 1845 and l. 16036; its required text serves this part. V-MC2-01 (model;
`HistoryHint` "an S0 input" in §2.9 and J-A88.21) — consistent with §4.2 S2 here, which reads the hint at S2. The
determinism, kernel and rendering r2 verifiers had filed nothing when this report was written.

## 6. Held parts (gate (a)) — none in this part; listed so nothing is lost

Item 35 (support: the position check on 160 of 162 faces), item 68 (g) (the MFCG cast-shadow absence) and item 68's
support (VG 1.6.9's shadow and night layers; Dwellings' shading and occlusion), item 52 (the references' visibly different
session maps), item 60's support (the 16-cell hand-off) — none written in the part (grep of the live part: 0 hits, as the
pre-r2 part). Released and applied with labelled wording: item 37 (§4.6 step 5), item 58 (f) (II.2), item 59's timing
(another part). Rejected: item 49's deletion (scope's §1.4). No required change above touches a held part.

## 7. CONFIRMED versus PLAUSIBLE

CONFIRMED (read and executed): the design and rationale hashes (3daa0b07…, bfa20419…); the part extracted from the pre-r2
archive and the live design and word-diffed (21 hunks, every one read); each repaired paragraph read whole with the
subsections it cites (§2.7 `Use.concealment` / `concealmentSource`, `UndergroundSystem`, `HistoryHint`, `Household`;
§3.2 (9); §5.2 F-SITING; §6.1's readers list; §7.7 items 15, F4, DR3, DR19; §8.1 item 7; §13.2 T65-7, T65-8, T70-6, T72-9,
T77-1, T81-1, T88-1, T88-2; §14 `DossierInstitution`, `StrategyRegistry`; J-A65.46, J-A65.49, J-A72.50, J-A88.42 in index and
Part A); every cited line number re-read; each required change's old text found exactly once in the live design (grep
counts 1); the stale, deferral and held-part greps; the five sibling repair-r2 reports and verify-model-r2. PLAUSIBLE
(reasoning): that each required change repairs its issue without a new conflict — in particular VPR2-03's re-banding of
event-made parts and VPR2-05's reading of the scar depth as the buried town's old grade (both our own, draw-free). No
document check was run: this seat edits no design file.
