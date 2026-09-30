# Seam check: the underground (V04) and the sky (V05) against the neighbourhoods they carry or shadow (V01) — round 4

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-layers-r4; covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method and inputs (files, md5, lines) | done
- §1 Re-check of round 3's SLR3-01..12 (each: FIXED / PARTLY / NOT FIXED, with the text now) | done
- §2 Seam census, round 4 (every piece crossing V04/V05 <-> V01 and the base sections they share) | done
- §3 New findings (SLR4-01 onward), severity, owner, required change | done
- §4 Disposition summary by owning volume; CONFIRMED versus PLAUSIBLE | done

## 0 Method and inputs

Lane `volumes/seam-layers-r4`, 2026-09-29, reconciliation round 4. The skeleton was written at 07:42 and the lane was cut
there; this run continued it under the CONTINUE RULE (no LANDED line). The inputs had moved since the skeleton, so this
round reads them as the round-4 reconcile lanes and their continuations left them:
- `docs/volumes/V04-underground.md` — 4 012 lines, md5 87f5ce61… (`reconcile-V04-r4` LANDED 07:08, continuation LANDED
  11:35; `_integrate`'s continuation, 08:13).
- `docs/volumes/V05-sky.md` — 3 649 lines, a60dbcc9… (`reconcile-V05-r4` LANDED 07:19, with its counterpart edit in V01;
  `reconcile-V05-r3`'s continuation, 10:31).
- `docs/volumes/V01-neighbourhoods.md` — 4 241 lines, cbbfe6e8… (`reconcile-V01-r4` LANDED 07:14, continuation LANDED
  11:50).
- `docs/volumes/_integrate.md` — 468 lines, 965ab696… (its continuation §8, 08:13).
- `docs/AMENDMENTS-2026-09-28f.md` — 1 616 lines, 0da3c86c… (`reconcile-BASE-F-r4` LANDED 07:19, continuation 11:44).
- The base, `docs/ARCHITECTURE.md` — md5 01fea21f…, unchanged since round 0. Read where a seam cites it: §2.6's
  `AccessPoint.kind` list, §4.2 S0's relief classes (plain, rolling, hilly, mountainous), §4.2 S1 (5).
- `docs/volumes/critique/seam-layers-r3.md` — read whole first (md5 1d0e5564…, unchanged since its 06:52 landing).

**What was read, and how (J-SL4.1).** Round 3 read every changed line against round 2's inputs plus the seam's core
sections whole. Round 3's inputs survive as the round-4 lanes' backups (`scratchpad/volumes/rcV4r4/V04-pre-r4.md`
8c42db56…, `rcV5r4/V05-pre-r4.md` 2599efb7…, `rcV1r4/V01-pre.md` 079cc7de…, `rcBFr4/f-pre-r4.md` 38c29d39…,
`integ/pre-cont/_integrate.md` d868438e…). This round read:
- **every changed line whole**, as diffs against those backups (V04 459 diff lines, V05 392, V01 794, `_integrate.md` 100;
  file f's item changes whole where an item names V01, V04 or V05, its round notes by grep), saved in this session's
  `scratchpad/volumes/slr4b/`;
- **the seam's core sections whole on the live files**, where a changed line could meet an unchanged one:
  - V01 V1-3.7.1, V1-3.8.8, V1-3.9, V1-3.10 (all of V1-3.10.1 – 3.10.3), V1-3.11, V1-3.17.6 – 3.17.7, §1.2's V04 and V05
    rows, §1b's rim-walk, unit-run, crossing-site and void-part rows, T-V1-20, T-V1-21;
  - V04 §3.10's opening-pass bullet, §1b.2's opening-pass row, §4.3's locality rows, T-V4-74;
  - V05 §1b whole, §2.3, §2.3a, §2.6 whole, §3.10 – §3.12, §3.22, §4.2 – §4.3, §6;
  - file f items 244, 251, 272, 308, 309, 319, 372, 505, 574, 580, 584;
  - V06 §3.2's `sky.islands` row and §6.2's `sky.islands` row (the epoch's host of an island's conversions);
- **whole-file greps for every absence claimed below** (§4).

Decision **J-SL4.1**: chose, as round 3 did (J-SL3.1), to re-read by whole diffs plus the seam's core sections over a
fourth whole read of 4 012 + 3 649 + 4 241 lines, because text that did not change since round 3 can break the seam only
where a changed line meets it, and the core sections hold every such meeting. Vetoable: a whole re-read would replace it.

**Method.** Round 3's twelve issues were re-checked against the text now (§1). A fix counts only when every side of the
seam carries it, counterpart halves included. Then every piece crossing the seam was traced again both ways (§2), round
4's new mechanisms first:
- the rim's L1 pieces after a resize and a rim reshape (V05's SLR3-02 fix), with volume 1's receiving districts;
- the stored relief class of an `own` island;
- the island bridges built after S8;
- the hood's forecast order;
- the dwelling closure's way into a sealed void (V04's SR3-11 fix);
- `hood.constants` as one settings row, and the `NG` preset.

Severity as before:
- *blocker* — cannot be scheduled or built;
- *major* — a contradiction or an unwired piece a builder would hit;
- *minor* — wording, a citation, a single-source slip, a wiring row.

## 1 Re-check of round 3's issues

| id | r3 sev. | owner | status | where it stands now |
|---|---|---|---|---|
| SLR3-01 | major | V04 | **FIXED** | V4 §3.1's hood line ("In a hood document U-FORECAST runs after the one-district allocation, not before S7b (5), and P7's cap reads that allocation's poorest-band households … S7b (6) (d)'s void part is taken from that allocation"), §3.3's first paragraph, P7's last sentence, F6, §1b.1's and §2.6's `NetworkForecast` rows, §1b.2's `NetworkForecaster.forecast` row (volume 1's unit run the hood caller), §1.2's volume-1 row (V1-3.10.1 step 6 and (7)), T-V4-75, J-V4.116. V04 went one step further (P5's catacomb expectation in a hood ranks only the allocation's anchor-brought burial faces); V01's (7) cites V04's hood line for "the one catacomb", so no V01 text contradicts it |
| SLR3-02 | major | V05 | **FIXED, with residues** | V5 §4.2 *Resizing* and *Reshaping the rim*: one island L1 batch re-lays the strip, re-claims each yard at its re-seated top and keeps or re-searches the institution claim; growing band cut at the extended district boundary ways, each receiving district re-derived; shrinking cuts ways back and re-lays the rim walk; the area floor; §2.6's strip-and-claims row, §1b's rim-strip and landing rows, §4.3's own locality row, §6, T-V5-14, J-V5.77. Three things the fix hands volume 1 are not on volume 1's side: the rim walk re-planted per district although it is one record per strip, and re-laid after a shrink by a V01 rule no V01 text exposes (**SLR4-01**); the claim's district re-derived through V01's `keep` path, whose fixed inputs keep the very institution V05 relocates (**SLR4-02**); V05's matching words (**SLR4-03**) |
| SLR3-03 | major | V05 | **FIXED** | V5 §2.1's `terrainEcho.reliefClass?: 'plain'|'rolling'|'hilly'|'mountainous'` (the base's S0 classes, §4.2 S0), §3.8 (3) writes it, §2.6's split `terrainEcho` row (re-drawn by New random, re-drawn at load when absent), §3.22 (4), BCR-V5-1, §1b's new row, T-V5-31 (e), J-V5.78; V01 V1-3.17.7 (2) reads "its drawn class (`terrainEcho.reliefClass`, V05 §2.1; seam SLR3-03)" (V05's counterpart edit, logged). File f item 251 (BCR-V5-1) still names V05 alone (**SLR4-10** (b)) |
| SLR3-04 | major | V01 | **FIXED** | V1-3.10.3 (6) (c) ("every district that receives a face is re-derived by its own scoped re-derivation … in district-address order inside the one commit"), V1-6's sky row (once per receiving district, at most k ≤ 3), T-V1-21 ("exactly the districts that receive new faces"), J-V1.90; V05 §4.2 and §6 agree. The inward side of a reshape is **SLR4-01** |
| SLR3-05 | minor | V01 | **FIXED** | §1.2's V04 row names V04 §3.3's P7, V04 BCR-19, §3.4's F6 and §3.7a's T8 and the hood's void part; §1b's void-part row; step 6's bare "BCR-19" reads "V04 BCR-19" |
| SLR3-06 | minor | V01 | **FIXED** | V1-2.3's preamble ("On a sky arena, the island's one part (V05 §2.1) reads as part 0 in every row …"), the column heading, V1-3.11 (6), T-V1-21's part-0 clause, J-V1.95. V04's "ground part 0" stays the ground's; V01's reading is scoped to V01 |
| SLR3-07 | minor | V01 | **FIXED** | V01 BCR-45 on §4.2 S1 (5) and §4.8's *Water furniture*; file f item 580 carries it (STAGED M5, W8 on a fixture island); §1.2's and §1b's rows cite it; references to volume 4's request read "V04's BCR-45" |
| SLR3-08 | minor | V01 | **FIXED** | V1-3.11 (6): "`superseded` — §6.3's successions of the run: a replace re-derivation's, and a unit run's over an island that already holds content"; T-V1-21's New random clause |
| SLR3-09 | minor | V05 | **FIXED** | §4.2 *Accesses* ("§7.3's local operator on the island's arena, V01 V1-3.10.3 (6) (c)"), §3.20 (9) (e) ("the solver's positive placement … (§7.7's `placeAt`) — never a unit run"), §4.2 *New random* (SKY's island steps, volume 1's unit run, SKY-F), §2.6's `districts` row, §1b's `SkyHandover` row |
| SLR3-10 | minor | V05 | **FIXED** | §3.12's contract quotes V1-3.10.3 (4)'s rule; §3.8 (4), §3.22 (6), §2.3's `river` comment and §1b's conjured-river row cite it |
| SLR3-11 | minor | V06 | **FIXED, with a residue** | V6 §3.2's `sky.islands` row names the unit run inside the epoch's commit; V6 §6.2 prices a raise per event (≈ 24 / 34 ms); X40, J-V6.118. V05's SLR3-02 fix has since re-priced a resize, and V06's row still quotes the retired figure (**SLR4-09**) |
| SLR3-12 | minor | BASE-F | **FIXED** | item 308: "*Needed by:* V01, V05 (volume 1's χ̃ reads the sky pseudo-district's point …)"; item 309's volume-4 readers gain the buried floor and the village working, with their milestones (J-RF4.1). Round 4 added a new reader item 309 does not carry (**SLR4-10** (a)) |

**Totals.** 12 of 12 closed as raised: 10 FIXED, 2 FIXED with residues that are new findings (SLR3-02 → SLR4-01, SLR4-02, SLR4-03;
SLR3-11 → SLR4-09), 0 PARTLY, 0 NOT FIXED. For the first time no counterpart half was lost: V05's lane applied SLR3-03's
volume-1 sentence after V01's lane landed, and logged it; V04's lane found V01 already said what it needed (V01 note (25)
met).

## 2 Seam census, round 4

Round 3's 67 pieces with their state now, then the pieces round 4's mechanisms added (68–84). "Unchanged" means that
neither side's text changed since round 3's read, and that no diff line touches what it reads.

| # | seam piece | producer ↔ consumer | state |
|---|---|---|---|
| 1 | SKY's slot in the stage graph | V05 §3.1 ↔ V01 V1-3.1 | consistent (unchanged) |
| 2 | island strips onto the ground | V05 §2.3a, §3.19 (6) ↔ V01 S9b, pins, `islandShare` | consistent (unchanged) |
| 3 | `SkyHandover` and the `sky` request | V05 §2.3, §1b ↔ V01 V1-2.4, V1-3.10.3 | consistent; the after-generation callers named on both sides (SLR3-09 fixed) |
| 4 | the rim walk | V01 V1-3.10.3 (4), BCR-10 (c) ↔ V05 §3.12, §4.2 | consistent at generation; after a resize or a reshape **SLR4-01** |
| 5 | `portalsTotal`, `landingsReached` | V01 V1-3.11 (6) ↔ V05 T-V5-9 | consistent (unchanged) |
| 6 | island district kinds, fabric prior, district count | V05 §2.4, §3.12 ↔ V01 V1-3.10.3, V1-3.16 | consistent (unchanged) |
| 7 | island retaining walls and the relief class | V01 V1-3.17.7 (2) ↔ V05 §3.22 (4) | consistent (SLR3-03 fixed) |
| 8 | levelled ground as a reader | BCR-V5-30 ↔ V04, V01 `stepProfile`, V01's island bridge | volume 4's and `stepProfile` consistent; the island bridge's read **SLR4-04**, **SLR4-05**, **SLR4-10** (a) |
| 9 | `ruinCentre()`, the `ruin.node` line | V04 §3.5.0a (9) ↔ V05 §1b, §3.3, §4.5 | consistent (unchanged) |
| 10 | catacomb count with island churches | V04 §3.5.1 (3) ↔ V05 §1.3, §3.5 (3) | consistent (unchanged) |
| 11 | the sky layer never read | V04 §1.2 ↔ V05 §1.3, T-V5-26 | consistent (unchanged); V04's new dwelling closure reads "ground part 0" only |
| 12 | burial faces on islands skipped | V04 §3.5.1 (1) ↔ V05 §3.5 (3) | consistent (unchanged) |
| 13 | arch vaults under a ruined span | V05 §3.16 (4) ↔ V04 §3.5.4 (d) (2) | consistent (unchanged) |
| 14 | ground accesses under a landfall | V05 §3.16 ↔ V04 §3.10 | consistent (unchanged) |
| 15 | light at shafts under an island | V05 §5.3 (1) ↔ V04 §5.3, BCR-38 | consistent (unchanged) |
| 16 | the opening pass at generation | V01 V1-3.7.1 ↔ V04 T6, §3.10 | consistent at T6; the pass's gate now names the stage-2 switch, which V04 does not **SLR4-06** (b) |
| 17 | ground access symbols and their state forms | V01 V1-3.8.8, V1-5.1.2 ↔ V04 §5.2 (7), base §8.2 | consistent (unchanged) |
| 18 | the undercity's parent | II.7.5 (2), V01 V1-3.16 ↔ V04 §3.6 C5 | consistent (unchanged) |
| 19 | `districtsAbove`, `fabricSignature` | V01 V1-3.16 ↔ V04 §3.5.0a (7), C5, §4.5 | consistent (unchanged) |
| 20 | `blockLifted` | V01 V1-3.9 ↔ V04 §3.5.1 (7) | consistent (unchanged) |
| 21 | catacomb source protection | V04 `UndergroundSystem.sources` ↔ V01 V1-3.5.12 (4), V1-3.9 | consistent (unchanged) |
| 22 | the catacomb entrance sentence | file f item 560 ↔ V01, V04 | consistent (unchanged) |
| 23 | public opening kinds and places | file f item 554 ↔ V01 V1-3.7.1, V04 §3.5.7 (e) | consistent; the symbol sizes' kind set **SLR4-07** |
| 24 | `hood.pins` rows for the underground | V04 §1.3 ↔ V01 V1-3.8.8 | consistent; V01's "volume 4's pin" for a well **SLR4-08** |
| 25 | public ground, squares, yards | V04 §1.2 ↔ V01 blocks | consistent (unchanged) |
| 26 | locality of a ground edit | V04 §4.3, V05 §4.3 ↔ V01 V1-3.9 | consistent; V05 §4.3's new resize row is an island edit, not a ground edit |
| 27 | the lone neighbourhood's layers | V01 V1-3.10.1 (7) ↔ V04 §3.1 | consistent (unchanged) |
| 28 | the `Way` line | file f 208 → 207 → 209 | consistent (item 207's build note added; the order unchanged) |
| 29 | `DistrictContext.under`, `.shade.islandShare` | V01 V1-2.3 ↔ V04 §3.5.7 (g), V05 §2.3a | consistent (unchanged) |
| 30 | `catchmentOf` on the other arenas | V01 V1-3.16 ↔ V04 §3.6a, V05 §3.5 (3) | consistent (unchanged) |
| 31 | GeoJSON of walls and raised ways | file f 447 ↔ V01 V1-5.3, §1b, V05 §5.5 | consistent (unchanged) |
| 32 | barrier kinds on seams | J-VI.3 ↔ V01 BCR-30 (b) | consistent (unchanged) |
| 33 | a ground landing's S8 destination | BCR-V5-20 ↔ V01 V1-3.4.2 (a) | consistent (unchanged) |
| 34 | the sky unit run's generation cost | V01 V1-6 ↔ V05 §6 | consistent; a resize's cost see 83 |
| 35 | the aqueduct's terminal | V01 V1-3.17.8 ↔ V04 §3.5.4 (e) | consistent (unchanged) |
| 36 | spans' `use`, lanes under arches | V04's BCR-45 ↔ V01 V1-3.17.3 | consistent; V01 now writes "V04's BCR-45", its own BCR-45 being the island crossing sites |
| 37 | the raised-way slot before S7b (1) | V01 BCR-39 ↔ V05 §3.1 | consistent (unchanged) |
| 38 | `hood.fabric`, `sky.clearance`, `under.*` epoch orders | V01 (40) ↔ V05 (50) ↔ V04 (10–30) | consistent (unchanged) |
| 39 | DR numbers | IN-V01-6, IN-V05-3 | consistent (unchanged) |
| 40 | raised-way reason words | J-VI.2 ↔ IN-V01-4 | consistent (unchanged) |
| 41 | SKY's data keys in S9b's declared inputs | BCR-V5-3 ↔ V01 V1-3.1 | consistent (unchanged) |
| 42 | opening places after generation | V04 §3.10 ↔ V01 V1-2.7, §1b | the one list lacks the dwelling closure's opening rungs **SLR4-06** (a) |
| 43 | `@plat/hood` services in M6-U's build order | V01 W15 ↔ V04 §8, §11 Q1 | consistent (unchanged) |
| 44 | shade on a sky arena | V05 `shadeSky` ↔ V01's shade readers | consistent (unchanged) |
| 45 | the landfall's quarry against the surface quarry | V05 §3.16 (4) ↔ V04 §3.5.3 | consistent (unchanged) |
| 46 | the seam bars' registration | V04 BCR-15 ↔ T-V4-71 – 75 | consistent (T-V4-75 extended) |
| 47 | the underground pseudo-district's name | II.7.3 ↔ V04 §3.6a (5), V01 V1-3.16 | consistent (unchanged) |
| 48 | `SkyIsland.districts`' writer | V01 V1-2.4 ↔ V05 §2.6 | consistent (SLR3-09 fixed) |
| 49 | the island unit run's cross-arena pulls | V05 §3.20 ↔ V01 V1-3.10.3 (4) | consistent (unchanged) |
| 50 | file f's needed-by lists and pointers | file f ↔ V01, V04, V05 | 308 and 309's volume-4 readers fixed (SLR3-12); 309's island-bridge reader and 251's *Needed by* **SLR4-10** |
| 51 | the island's unit run after generation | V05 §2.3, §3.15 (5), §4.2 ↔ V01 V1-3.10.3 (6) | consistent (SLR3-09 fixed) |
| 52 | the sky pseudo-district in S7b (1)'s supply term | V05 §3.20 (12) (b), BCR-V5-16 ↔ V01 V1-3.2 (5) | consistent (unchanged) |
| 53 | the island river's crossing sites | V05 §3.8 (4), §3.12 ↔ V01 V1-3.10.3 (4) | consistent (SLR3-10 fixed); the bridge build see 73 |
| 54 | a hood document's void-dwelling allocation | V04 §3.1, §3.3 P7, F6 ↔ V01 V1-3.10.1 step 6 | consistent (SLR3-01 fixed) |
| 55 | an access's state on the surface symbol | base §8.2 `states`, V04 §3.10 ↔ V01 V1-3.8.8, V1-5.1.2 | consistent (unchanged) |
| 56 | `stepProfile`'s readers | V01 §1b, BCR-43 ↔ V04 §3.5.5 | consistent (V03's two readers added on V01's side; not this seam's) |
| 57 | `AccessPoint.cause` and `excavation` read by volume 1 | V04 §1b.1, §2.6 ↔ V01 V1-3.7.1, V1-2.3 | consistent (unchanged) |
| 58 | `terraceState` on an island | V01 V1-3.17.7 (2) ↔ V05 §3.8 (3), §3.22 (4) | consistent (SLR3-03 fixed) |
| 59 | the island crossing-site spans and bridges | V01 V1-3.10.3 (4), BCR-45 ↔ V05 §2.3, §3.8 (4), §3.12, §3.16 (7), §3.22 (6); base §4.2 S1 (5), §4.8 | consistent (SLR3-06, -07, -10 fixed); the after-S8 build's read see 73 |
| 60 | a lone neighbourhood's void part | V01 V1-3.10.1 step 6, §1.2, §1b ↔ V04 §3.1, §3.3 P7, §3.4 F6, §3.7a T8, BCR-19 | consistent (SLR3-01, -05 fixed) |
| 61 | the unit run inside an after-generation commit | V01 V1-3.10.3 (6) (a)–(b), V1-6 ↔ V05 §2.3, §3.15 (5), §4.2, §6; V06 §3.2, §6.2 | consistent (SLR3-08, -09, -11 fixed) |
| 62 | faces a growing resize adds or a rim reshape moves | V01 V1-3.10.3 (6) (c), V1-6, T-V1-21 ↔ V05 §4.2, §6, T-V5-14 | the growing side consistent (SLR3-02, -04 fixed); the shrink and inward side **SLR4-01**; the claim's district **SLR4-02**; V05's matching words **SLR4-03** |
| 63 | a new landing yard's island plots | V01 V1-3.10.3 (6) (c) ↔ V05 §4.2 *Accesses* | one operator, one name (SLR3-09 fixed); the yards a resize re-claims are not in V01's list **SLR4-02** (c) |
| 64 | the island's relief class for `terraceState` | V01 V1-3.17.7 (2), V1-2.3 ↔ V05 §2.1, §3.8 (3), §3.22 (4) | consistent (SLR3-03 fixed) |
| 65 | the landfall's typed `members` read by volume 4's closures | V05 BCR-V5-9, §2.6, §3.16 (5) ↔ V04 §3.10, §1.2 | consistent; the tower rule (TU-03) adds no member form |
| 66 | `SeamReport.superseded` for a run over an island that holds content | V01 V1-3.10.3 (6) (b) ↔ V1-3.11 (6) | consistent (SLR3-08 fixed) |
| 67 | file f items 252, 308, 309 | file f ↔ V01, V04, V05 | consistent as raised (SLR3-12 fixed); see 50 |
| 68 | the rim strip, the landing yards and the institution claim re-laid at a resize and a reshape | V05 §4.2, §2.6's strip-and-claims row, §1b ↔ V01 V1-3.10.3 (2), (6) (c) | consistent for the strip and the yards (the unit's outline is the land face less the strip, its claims holes); the rim walk **SLR4-01**; the claim **SLR4-02**; V05's words **SLR4-03** |
| 69 | the rim walk after a rim change | V05 §4.2 (growing: "re-plants its stretch"; shrinking: "volume 1's rim-walk rule"), §1b's rim-strip row ↔ V01 V1-3.10.3 step 4, (6) (c), §1b's rim-walk row, T-V1-21, BCR-10 (c) | **SLR4-01**, **SLR4-03** |
| 70 | the institution claim re-searched inside its district | V05 §4.2, J-V5.77, T-V5-14 ↔ V01 V1-3.9's `keep` path, V1-3.10.3 (6) (c), T-V1-21, V1-6 | **SLR4-02**, **SLR4-03** |
| 71 | the growing band's faces cut at the extended district boundary ways | V05 §4.2 ↔ V01 V1-3.10.3 step 2 (the cuts are `secondary` ways, soft `way` seams, ending on the strip line) | consistent |
| 72 | `terrainEcho.reliefClass` | V05 §2.1, §2.6, §3.8 (3), BCR-V5-1 ↔ V01 V1-3.17.7 (2); file f item 251 | consistent in the volumes; item 251 **SLR4-10** (b) |
| 73 | the island bridge built after S8, its `deckCm` from `levelledGroundCm` on the island's key | V01 V1-3.10.3 (4), BCR-45, file f item 580 ↔ V05 BCR-V5-30, §1b; file f item 309 | V01 and item 580 agree; the reader is on neither producer list nor V01's own wiring row **SLR4-04**, **SLR4-05**, **SLR4-10** (a) |
| 74 | the hood's forecast order and P7's cap | V04 §3.1's hood line, §3.3, P7 ↔ V01 V1-3.10.1 step 6, J-V1.92, T-V1-20 | consistent (SLR3-01 fixed) |
| 75 | P5's catacomb expectation in a hood | V04 §3.1's hood line, J-V4.116, T-V4-75 ↔ V01 V1-3.10.1 (7) ("the one catacomb" cited to V04) | consistent |
| 76 | the dwelling closure's opening rungs and volume 1's opening pass | V04 §3.8 (*The dwelling closure's way in*), §4.3's new row ↔ V04 §3.10, §1b.2, T-V4-74 ↔ V01 V1-2.7, §1b's `HoodPlace` row | **SLR4-06** (a) |
| 77 | the stage-2 switch over the local-place step and its opening pass | V01 V1-3.7.1, V1-3.15 ↔ V04 §3.10, §3.11's opening-pass row, T-V4-74 (b) | **SLR4-06** (b) |
| 78 | the ground access symbols' size columns | V01 V1-3.14's `access.<kind>M`, V1-3.8.8 ↔ base §2.6 `AccessPoint.kind`, file f item 554, V04 §3.5.1 (9) (a catacomb entrance is a `stair`) | **SLR4-07** |
| 79 | a `well` access at a stack-hosted building | V01 V1-3.8.2 step 5 ↔ V04 §1.3 (no underground pins), §3.5.7 (d) ("the plot's well pin") | **SLR4-08** |
| 80 | `hood.constants` as one settings row; `sky.plotShare` read by volume 5 | V01 V1-2.2, V1-3.14 ↔ V05 §2.3, §3.12 item 7 | consistent (the key a column of the one row; V05 cites it, never copies it) |
| 81 | the `NG` preset over the layers | V01 V1-3.15, BCR-46 ↔ V04 T-V4-35, V05's parity rows | consistent: `NG` resolves every V04 and V05 cell as `MFCG` does (entries on `hood.constants` alone), so under `NG` no underground system but the hidden sewer and no island exist, and the opening pass has nothing to place |
| 82 | item 244's support step (the raised way's piers) | file f item 244 (J-VI.27) ↔ V01 V1-3.17.3 (IN-V01-9), V04 §3.5.4 (IN-V04-14), V05 §3.7 (2), §3.10 (3)–(4) | consistent: one producer, three readers, each citing it |
| 83 | an island resize at an epoch, priced | V06 §6.2's `sky.islands` row ↔ V05 §6's resize row, §3.15 (2)–(3) | **SLR4-09** |
| 84 | file f item 580 (V01 BCR-45) | file f ↔ V01 §10 | consistent: the item carries the after-S8 build (S23R3-04) as V01 §10 words it |

## 3 New findings

### SLR4-01 — major — owner V01 — the rim walk after a resize or a reshape: one record per strip is re-planted "per district", and a shrink calls a volume-1 rule no volume-1 text exposes

**Claim.** Volume 1 plants the rim walk as one record pair per strip. A district cannot re-plant "its stretch" of it,
and after a shrink no volume-1 step plants it at all.
- **One pair per strip.** V1-3.10.3 step 4: S12b plants "one `esplanade` `Greenery` on the strip's face and one
  `street_trees` `Greenery` along the strip's inner setback line"; T-V1-21 holds "one `esplanade` and one `street_trees`
  `Greenery` per strip"; BCR-10 (c)'s greenery row says the same.
- **Growing, per district.** V1-3.10.3 (6) (c): "each re-derivation's S12b re-planting its own stretch of the rim walk
  (step 4)". V05 §4.2 *Resizing* and *Reshaping the rim*: each receiving district's re-derivation "re-plants its stretch
  of the rim walk". The strip's face lies outside every district's faces (the unit's outline is the land face less the
  strip, step 2), so §7.3's district scope cannot rewrite the pair. With k ≥ 2 receiving districts (SLR3-04), each would
  rewrite it or each would add one.
- **Shrinking, with no caller.** V05 §4.2: a shrink re-derives no district, cuts each way back to the re-laid strip line
  and re-lays the rim walk "by volume 1's rim-walk rule (V01 V1-3.10.3 (4)) in the same commit"; V05 §1b's rim-strip row:
  "by volume 1's rim-walk rule after a shrink". Volume 1 states the rule only inside S12b's step 4. Its §1b rim-walk row
  names S12b as the producer and the hand-over's strip face as the one feed. 0 V01 hits for "rim-walk rule" or any named
  planting function, and (6) (c) says nothing of a shrink.
- **Inward reshape.** V05 treats each stretch a reshape moves inward as "a shrinking resize's" (no re-derivation).
  T-V1-21 re-derives, for "a rim reshape, those whose faces it moves". An inward stretch moves faces and gives none, so
  the bar expects a re-derivation volume 5 never runs.

**Required change (V01).**
- V1-3.10.3 step 4's *The rim walk* becomes one island-level function:
  "`plantRimWalk(doc, island)` (`@plat/hood`; pure over the committed rim strip — its `rim_strip` face and inner setback
  line) writes the island's one `esplanade` and one `street_trees` `Greenery`. The pair is keyed by the island's
  derivation unit and the strip (V1-2.8), and the pair it finds is tombstoned.
  - It is called once by the unit run, after its districts' S12b (at generation, a raise, New random and a Re-derive).
  - It is called once in the commit of every event that re-lays the strip (V05 §4.2: a resize, a rim reshape), after
    volume 5's island L1 batch and any district re-derivation.
  - A district's scoped re-derivation never calls it."
- V1-3.10.3 (6) (c):
  - "— each re-derivation's S12b re-planting its own stretch of the rim walk (step 4)" reads "; `plantRimWalk` re-plants
    the rim walk whole in the same commit (step 4)".
  - Add: "**A shrinking resize, and each stretch a reshape moves inward**, gives no face and re-derives no district.
    Volume 5's operator clears and re-cuts the plots that the eroded rim, the re-laid strip or a re-claimed yard takes
    (§4.7 S10 (7)), and cuts each way back to the re-laid strip line (V05 §4.2). `plantRimWalk` then re-plants the walk.
    A reshape re-derives only the districts that receive faces from a stretch moved outward."
- §1b's rim-walk row reads, as its producer: "`plantRimWalk` (V1-3.10.3 step 4), called by the unit run and by volume
  5's resize and rim reshape (V05 §4.2)".
- T-V1-21's resize clause reads: "after a growing resize, a shrinking resize, and a reshape with one inward and one
  outward stretch, one `esplanade` and one `street_trees` `Greenery` per strip, on the re-laid strip. A growing resize
  re-derives exactly the districts that receive new faces, a reshape those that receive faces from its outward stretches,
  and a shrink none. Every other island district's content changes only by volume 5's plot clearing, re-cut and way
  cut-back."
- J-V1.90 appends: "the rim walk is one island-level pair, re-planted whole by `plantRimWalk` after any rim change,
  never by a district".

V05's matching words are **SLR4-03**.

### SLR4-02 — major — owner V01 — a re-searched institution claim re-derives its district through volume 1's path, whose fixed inputs keep the institution volume 5 relocates

**Claim.** Volume 5 relocates an island institution through a volume-1 path that pins it in place.
- **Volume 5's step.** V5 §4.2 *Resizing* (and *Reshaping the rim*, "as a resize's do"): where the claim no longer fits,
  it is re-searched inside its district. "That district is re-derived by its scoped re-derivation from S8 with the new
  claim a hole and the old claim's land its own (V01 V1-3.10.3 (6) (c)'s path), whose S10b places the institution on the
  new claim (V5 §3.12): its use relocated there (a dossier-backed one by the solver's `dossier` request, V5 §4.4), its
  old building demolished, a listed fate."
- **The path it cites keeps the institution.** V1-3.10.3 (6) (c)'s path is "§7.3's district scope, V1-3.9's `keep` path
  with its fixed inputs and carry-over, the district's `Allocation` unchanged". V1-3.9's fixed inputs are "locked,
  pinned, assigned and dossier-backed entities in D … their faces stay and the template lays around them as holes". An
  island institution is dossier-backed (DR-SKY, V5 §4.4) or assigned (T6's `assign` with `criteria.sky`, V5 §4.2).
  Under the path V05 cites, its building stays on the old claim, S10b finds it placed, and the new claim stays an empty
  hole. Neither volume says the institution leaves the fixed inputs.
- **Triggers missing from (6) (c).** It names two: "Each face a growing resize adds or a rim reshape moves" and "The
  plots a new landing yard covers (V05 §4.2's `placeSkyAccess`)". It lacks the claim re-search, and it lacks the yards a
  resize or a reshape re-claims (V05: "the plots the yard covers re-derived by §7.3's local operator").
- **Counts that miss the claim's district.** V1-6's sky row ("once per receiving district") and T-V1-21 ("exactly the
  districts that receive new faces") do not count it. Nor does V05's own T-V5-14 ("exactly the districts that receive
  band faces"), although its §4.2 re-derives that district.

**Required change (V01).**
- V1-3.10.3 (6) (c) adds:
  - "**A re-searched institution claim** (V05 §4.2; J-V5.77). The district that holds the claim is re-derived by its
    scoped re-derivation from S8, as above, with one exception to V1-3.9's fixed inputs: the island institution's use
    and building are released for the event. The solver relocates the use to the new claim (the `dossier` request for a
    dossier-backed one, V05 §4.4), and S10b places the building there. The old building is demolished, a listed fate,
    and the old claim's face joins the district's land. Every other fixed input holds."
  - "The yards a resize or a reshape re-claims have their covered plots re-derived by §7.3's local operator, as
    `placeSkyAccess`'s yard has."
- V1-6's sky row: "… once per receiving district, plus once for the district whose institution claim is re-searched
  where that district receives no face — at most k ≤ 3 in all".
- T-V1-21: "a growing resize re-derives exactly the districts that receive new faces and the district whose institution
  claim is re-searched; after a re-search the institution stands on its new claim, one building, the old one demolished".
- J-V1.90 names the claim's district among the scoped re-derivations.

V05's matching words are **SLR4-03**.

### SLR4-03 — minor — owner V05 — volume 5's words for the rim walk and the claim's district, to match SLR4-01 and SLR4-02

**Claim.** V5 §4.2 and §1b state the two mechanisms SLR4-01 and SLR4-02 correct: "which re-plants its stretch of the rim
walk" (twice), "by volume 1's rim-walk rule (V01 V1-3.10.3 (4))", and "(V01 V1-3.10.3 (6) (c)'s path)". T-V5-14 reads
"a growing resize re-derives exactly the districts that receive band faces", although V5 §4.2 also re-derives the
district whose claim is re-searched. Round 3 showed a counterpart half written only as a note gets lost, so this half is
its own issue.

**Required change (V05).**
- **§4.2's rim walk.**
  - *Growing* and *Reshaping the rim*: "which re-plants its stretch of the rim walk" reads "; volume 1's `plantRimWalk`
    then re-plants the rim walk whole (V01 V1-3.10.3 step 4)".
  - *Shrinking*: "by volume 1's rim-walk rule (V01 V1-3.10.3 (4))" reads "by volume 1's `plantRimWalk` (V01 V1-3.10.3
    step 4)".
- **§4.2's claim.** "(V01 V1-3.10.3 (6) (c)'s path)" reads "(V01 V1-3.10.3 (6) (c)'s claim re-search, which releases the
  institution from V1-3.9's fixed inputs)".
- **§1b's rim-strip row.** Its consumer cell reads "the rim walk — volume 1's `plantRimWalk`, called by the unit run and
  by a resize and a rim reshape (V01 V1-3.10.3 step 4)".
- **T-V5-14.**
  - It adds "and the district whose institution claim is re-searched" after "exactly the districts that receive band
    faces".
  - It adds "one `esplanade` and one `street_trees` `Greenery` on the re-laid strip after each".
- **J-V5.77** cites both.

If volume 1's lane lands first, this lane applies SLR4-01's and SLR4-02's volume-1 sentences as counterpart edits, and
logs them (round 4's practice). The reverse holds as well.

### SLR4-04 — minor — owner V05 — `levelledGroundCm`'s reader list lacks volume 1's island bridge

**Claim.** V01's island bridge build after S8 now reads `levelledGroundCm` on a sky key, but volume 5 does not list that
reader.
- **The new reader.** Round 4 moved the island's bridge build to after S8 (S23R3-04). V1-3.10.3 (4) takes "`deckCm` from
  its two bank elevations by §2.6's datum step (the sampler it reads, `levelledGroundCm` on the island's key, BCR-V5-30:
  the island's own raster there, since S10 has levelled no plot yet)". V01's BCR-45 (file f item 580) builds the span
  there.
- **The lists that miss it.** BCR-V5-30's "Its readers" list and V5 §1b's `levelledGroundCm` row both name volume 2's
  `deriveBase`, the crossing rule, volume 1's `stepProfile`, volume 4's readers and volume 5's own. Neither has a
  bridge, a deck or V1-3.10.3 (0 hits).

**Required change (V05).** BCR-V5-30's reader list and §1b's `levelledGroundCm` row add "volume 1's island bridge build
after S8, `deckCm` from the two bank elevations on the island's key, where nothing is levelled yet (V01 V1-3.10.3 (4);
its BCR-45)".

### SLR4-05 — minor — owner V01 — the crossing-site row does not name its `levelledGroundCm` feed

**Claim.** V01 §1b's row "an island's crossing-site spans" lists as feeds "volume 5's conjured river and its sites … the
unit's outline face". Since S23R3-04 the after-S8 build reads `levelledGroundCm` on the island's key for `deckCm`
(V1-3.10.3 (4)), and that feed is not in the row. The consumer half of SLR4-04.

**Required change (V01).** The row's feed cell adds "`levelledGroundCm` on the island's key (BCR-V5-30), read for
`deckCm` by the after-S8 build".

### SLR4-06 — minor — owner V04 — V4 §3.10's commit list and its gate: the dwelling closure's opening rungs and volume 1's stage-2 switch

**Claim (a) — the list.** V4 §3.10's bullet is the one list of commits that run volume 1's opening pass. Volume 1 cites
it for its callers ("the commits V04 §3.10 names", V1-2.7, §1b's `HoodPlace` row). Round 4's dwelling closure makes
openings in a commit that list omits.
- **The new commit.** V4 §3.8's new bullet (SR3-11): the base's second and third rungs make public openings "source
  `opening`, role `access` … volume 1's opening pass in the same commit (V4 §3.10)". §4.3's new row: "the base's
  opening rungs with volume 1's opening pass".
- **Where it is missing.** V4 §3.10's list names T6, `AccessPass.run`, `CatacombGrowth.grow`, the deletes, `setAttr`,
  `placeAccess` and a system's `regenerate`, but not the dwelling closure. §1b.2's opening-pass row is the same. T-V4-74
  (b) asserts "0 unplaced openings" after each listed commit, and not after a dwelling closure. 0 hits for "dwelling" in
  the three.

**Claim (b) — the gate.** Volume 1 now gates the step, and V04 does not name that gate.
- **Volume 1's gate.** V1-3.7.1 says the local-place step, of which the opening pass is a part, "runs only while
  `fabric.extensionWeight` > 0 (V1-3.15)". That cell is an editable `weight` in [0, 1] (V1-3.14).
- **V04's gate.** V4 §3.10: "The pass runs only while `@plat/hood`'s local-place step is registered". §3.11's
  opening-pass row covers only "not registered". T-V4-74 (b)'s last clause covers only the unregistered step.
- **Where it breaks.** In the default preset, a document whose author sets the switch to 0 keeps its underground but
  gets no opening place. V04 neither states nor counts that case, and T-V4-74 (b)'s "0 unplaced openings" fails there.
  Under the parity presets and `NG` no opening exists (T-V4-35), so the bar holds on them.

**Required change (V04).**
- **(a) The list.**
  - V4 §3.10's list and §1b.2's opening-pass row add "a dwelling declaration's closure whose second or third rung makes
    a public opening (V4 §3.8)".
  - T-V4-74 (b) adds "after a dwelling declaration whose closure makes a public opening (a sealed cluster with no
    qualifying building above it, so that the base's second rung places the opening)".
- **(b) The gate.**
  - V4 §3.10's last sentence reads "The pass runs only while `@plat/hood`'s local-place step is registered and runs —
    while `fabric.extensionWeight` > 0 (V01 V1-3.7.1, V1-3.15)".
  - §3.11's opening-pass row adds that cause, with the unregistered case's outcome: no place, the count reported.
  - T-V4-74 (b)'s last clause reads "with the local-place step unregistered or the stage-2 switch at 0, 0 places and
    their count reported".

### SLR4-07 — minor — owner V01 — the access symbols' size columns: `catacomb` is no access kind, `door` has no column, and a settings row cannot hold a `coversEnum`

**Claim.** V1-3.14's new column table reads "`access.<kind>M` — one column per symbol kind of V1-3.8.8, the compiler
holding the set (a `coversEnum` totality, V11 §2.1)". Its twelve columns run from `stair` to `catacomb`. V1-3.8.8 sizes
each symbol "by its kind [`access.<kind>M`]". Three problems follow:
- **`catacomb` is not an access kind.** A catacomb entrance is an `AccessPoint` of kind `stair`, source `system` (V04
  §3.5.1 (9); V1-3.7.1's selection (2)). So "by its kind" sizes it by `access.stairM`, and `access.catacombM` has no
  reader.
- **`door` has no column.** The base's `AccessPoint.kind` (§2.6) also holds `door`. It draws no symbol (V1-3.8.8: an
  arch vault's door takes none) and has no column, so a totality over `AccessPoint.kind` fails.
- **The totality has the wrong shape.** V11's `TotalityRule` `coversEnum` checks that a column's row values cover an enum
  (`{ kind, column, of }`, V11 §2.1). `hood.constants` is one settings row whose kinds are columns, so no `coversEnum`
  can hold the set as written.

**Required change (V01).**
- V1-3.8.8 (or V1-2.3) defines the symbol key: "`accessSymbolKind(a)` is `'catacomb'` for a catacomb entrance (V1-3.7.1's
  selection (2)), else `a.kind`. Its values, `AccessSymbolKind`, are `AccessPoint.kind` less `door`, which draws no
  symbol, plus `catacomb`."
- V1-3.8.8 reads "sized by its symbol kind [`access.<accessSymbolKind>M`]".
- V1-3.14's row reads "one column per `AccessSymbolKind` value — the column set held by T-V1-4's registry test (set
  equality with the enum), not by a `TotalityRule`".
- T-V1-4 adds that set equality.

### SLR4-08 — minor — owner V01 — "a `well` there stays volume 4's pin": volume 4 owns no pin

**Claim.** V1-3.8.2 step 5 (round 4's continuation, S23R3-10) reads "(V03 3.7.2 (1), `W_STACK_ACCESS`; a `well` there
stays volume 4's pin and a building on a deck hosts no head …)".
- Volume 4 ships no pins (V4 §1.3: no underground hood pins).
- Its dug `well` access stands "where the plot's well pin stands over the element" (V4 §3.5.7 (d), §3.8). The pin is
  the plot's, not volume 4's.
- A builder of the reserve who looks for a volume-4 pin record finds none.

**Required change (V01).** Read "a `well` access there opens at the well pin it stands over (V04 §3.5.7 (d)) and takes no
reserve rectangle". V03 3.7.2 (0) carries the same phrase; that half belongs to the stage2-3 seam (§4).

### SLR4-09 — minor — owner V06 — an island resize at an epoch is priced at the retired figure, growing only, and "none at TOWN"

**Claim.** V6 §6.2's `sky.islands` row (SLR3-11's fix) prices "per growing `resizeIsland`, ≤ 3 ms plus the scoped
re-derivation of its receiving rim districts … — none at TOWN, where the rung row admits no island and a carried one
only wanes". Its basis cites "V05 §6's rows (… a resize ≤ 3 ms + §12.6's scoped regeneration)". Since V05's SLR3-02
fix, all three parts are stale:
- **The figure.** V05 §6 now reads "≤ 5 ms + §12.6's scoped regeneration of each receiving district (at most k ≤ 3) +
  §12.6's 30 ms per re-landed foot's placement", plus the claim re-search where the claim no longer fits.
- **Growing only.** Every resize, shrinking included, re-lays the strip, re-claims the yards and re-lands the feet
  (V5 §4.2).
- **None at TOWN.** A wane shrinks the island by `resizeIsland` every epoch (V5 §3.15 (3): "the area toward half its
  value at the start, both by `resizeIsland`"). So a carried island at TOWN pays the shrink's cost every epoch of its
  dwell.

**Required change (V06).**
- V6 §6.2's row reads "per `resizeIsland` — growing or shrinking, a wane's included, at every rung where an island
  stands — V05 §6's resize row: ≤ 5 ms + §12.6's scoped law per receiving district (and for the district whose claim is
  re-searched; V01 V1-6's sky row) + 30 ms per foot re-landed onto another plot (≤ `accessCount.max` per island)".
- The basis cell quotes V05 §6's current row.
- The century bound's sum is re-stated.
- J-V6.118 is amended.

### SLR4-10 — minor — owner BASE-F — file f items 309 and 251 lag round 4's volume-1 readers

**Claim.**
- **(a) Item 309** (BCR-V5-30) lists `levelledGroundCm`'s readers with their milestones. It stages the sky key "STAGED
  (M6-sky)", and it has no volume-1 island reader. Volume 1's island bridge build (V1-3.10.3 (4); item 580, STAGED M5 by
  W8 on a fixture island) reads the reader on the island's key from M5.
- **(b) Item 251** (BCR-V5-1) is "*Needed by:* V05". Volume 1's `terraceState` on an island reads the field BCR-V5-1 now
  adds, `terrainEcho.reliefClass` (V1-3.17.7 (2); SLR3-03). Item 308 was widened on the same ground in round 3
  (SLR3-12).

**Required change (BASE-F).**
- **(a)** Item 309's reader text adds: "volume 1's island bridge build after S8 (V1-3.10.3 (4); item 580) reads it on the
  island's key from M5, on volume 1's fixture island. Nothing is levelled there before S10, so it returns the island's
  raster. The sky key's raster fallback is built with item 580, its datums with M6-sky."
- **(b)** Item 251 reads "*Needed by:* V01, V05 (volume 1's `terraceState` on an island reads `terrainEcho.reliefClass`,
  V1-3.17.7 (2); SLR3-03)".

## 4 Disposition summary by owning volume

| owner | blocker | major | minor | findings |
|---|---|---|---|---|
| V01 | 0 | 2 | 3 | SLR4-01, SLR4-02; SLR4-05, SLR4-07, SLR4-08 |
| V05 | 0 | 0 | 2 | SLR4-03, SLR4-04 |
| V04 | 0 | 0 | 1 | SLR4-06 |
| V06 | 0 | 0 | 1 | SLR4-09 |
| BASE-F | 0 | 0 | 1 | SLR4-10 |
| **total** | **0** | **2** | **8** | 10 |

**What held.** All twelve of round 3's issues are closed on every side of the seam, and for the first time no
counterpart half was lost:
- the hood's forecast order, P7's cap and the void part, one rule in both volumes;
- the rim strip, yards and claim re-laid with the rim;
- the `own` island's relief class stored and read under one name;
- each receiving district re-derived, in both volumes and both budgets;
- the hood's void part wired in V01's tables;
- a sky island's part read as part 0;
- the island bridges as a base change request that file f carries;
- `superseded`'s scope;
- the unit-run terms and the crossing-site citations in V05;
- the epoch's raise named and priced in V06;
- file f items 308 and 309's volume-4 readers.

Round 4's other mechanisms hold at the seam:
- the island bridge built after S8 matches file f item 580;
- P5's catacomb expectation in a hood agrees with V01's "one catacomb";
- `NG` resolves every V04 and V05 cell as `MFCG`, so it adds no island and no underground;
- `hood.constants`' settings row keeps `sky.plotShare` a cited column;
- item 244's support step has one producer and three readers.

The underground and the sky still never meet: V04 reads no sky entity (its new dwelling closure reads "ground part 0"),
and V05 routes nothing below the ground.

**What this round found.** Two kinds of fault remain.
- **A fix that handed the other volume a mechanism it does not have (SLR4-01, SLR4-02; V05's words SLR4-03).** V05's
  SLR3-02 fix, correct on its own side, calls three things of volume 1 that volume 1 does not define:
  - a per-district stretch of a rim walk that is one record per strip;
  - a standalone rim-walk rule for the shrink;
  - a `keep` path that relocates a fixed-input institution.
  The inward side of a reshape also disagrees with T-V1-21.
- **Readers and callers a round-4 change added without the lists catching up (SLR4-04, -05, -06, -09, -10).** These are:
  - the island bridge's `levelledGroundCm` read;
  - the dwelling closure's opening rungs;
  - the stage-2 switch over the opening pass;
  - the resize's new price at an epoch;
  - volume 1 as a reader of BCR-V5-1.

  SLR4-07 and SLR4-08 are volume 1's new column table and reserve text naming volume-4 kinds and pins that do not exist
  as written.

**Advice to the reconcile lanes (not a finding).**
- **Volumes 1 and 5.** SLR4-01 and SLR4-02 have their volume-5 words in SLR4-03. Whichever lane lands second applies the
  other's sentences as counterpart edits and logs them, as round 4 did for SLR3-03.
- **Volume 5 and file f.** SLR4-04 and SLR4-10 (a) name one reader. Volume 5's BCR text and file f's item text must use
  the same words.

**Observed outside this seam (not raised here).**
- File f item 505's build note ships `hood.constants` at M1 "with the naming context's four rows (item 444)". V01 now
  ships the one settings row whole at M1, every column at its default (SCC-R3C-9; J-V1.99). This is the
  content-calibration seam's.
- V03 3.7.2 (0) reads "a well pin there stays volume 4's", the wording SLR4-08 corrects on V01's side. This is the
  stage2-3 seam's.
- V05 §2.6's `accesses` and `SkyAccess.*` rows cite "V5 §4.3" for the tops re-seated, which V5 §4.2 states (§4.3 is the
  locality table). This is internal to V05.
- V04 §1b.4's `AccessPoint` row sizes the underground end "by its opening row", but `OpeningRow` has no size column
  (V4 §2.3). This is internal to V04.

**CONFIRMED versus PLAUSIBLE.** CONFIRMED by reading the inputs at the md5s of §0: every changed line as a whole diff
against round 3's inputs, and the seam's core sections on the live files. Every absence claimed below is a whole-file
grep:
- **SLR4-01:**
  - V01 step 4, T-V1-21 and BCR-10 (c) plant one `esplanade` and one `street_trees` per strip;
  - V01 (6) (c) and V05 §4.2 (twice) re-plant "its (own) stretch";
  - V05 §4.2 and §1b call "volume 1's rim-walk rule" (2 hits);
  - V01 has 0 hits for "rim-walk rule" or a named planting function, and no shrink sentence in (6) (c) (the one "erodes"
    hit is the resize's).
- **SLR4-02:** V1-3.9's fixed-inputs sentence; V05 §4.2's claim re-search sentence; (6) (c)'s two named triggers; V1-6's
  and T-V1-21's counts; T-V5-14's "exactly the districts that receive band faces".
- **SLR4-04, SLR4-05, SLR4-10 (a):** V1-3.10.3 (4)'s `levelledGroundCm` sentence; 0 hits for a bridge, a deck or
  V1-3.10.3 in BCR-V5-30's reader list, in V05 §1b's row and in item 309; V01 §1b's crossing-site row.
- **SLR4-06:** 0 hits for "dwelling" in V4 §3.10's bullet, §1b.2's row and T-V4-74; V1-3.7.1's gate sentence; V4
  §3.10's and §3.11's registration-only gate.
- **SLR4-07:** V1-3.14's twelve `access.*` columns; the base's `AccessPoint.kind` with `door`; V11 §2.1's `TotalityRule`
  shape.
- **SLR4-08:** V1-3.8.2 step 5's phrase; V4 §1.3's "ships none".
- **SLR4-09:** V6 §6.2's row text; V05 §6's resize row; V5 §3.15 (3)'s wane by `resizeIsland`.
- **SLR4-10 (b):** item 251's *Needed by*.
- **§1:** each FIXED status, against the anchors quoted there.

PLAUSIBLE, by reasoning rather than execution:
- J-SL4.1's premise, that unchanged text can break the seam only where a changed line meets it;
- SLR4-01's consequence, that a district's scoped re-derivation cannot rewrite a record whose face lies outside its faces
  (read from §7.3's district scope as V01 cites it, not from the base's operator text);
- SLR4-02's consequence, that under the `keep` path S10b leaves the new claim empty;
- SLR4-06 (b)'s scenario, an author setting the stage-2 switch to 0 with the underground on, which no bar exercises.

The required changes' design choices are proposals for the owning lanes and are PLAUSIBLE:
- the function `plantRimWalk` and its callers (SLR4-01);
- the institution's release from the fixed inputs (SLR4-02);
- the `AccessSymbolKind` key and T-V1-4's set test (SLR4-07);
- the M5 milestone for the sky key's raster fallback (SLR4-10 (a)).
