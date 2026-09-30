# Seam check: the underground (V04) and the sky (V05) against the neighbourhoods they carry or shadow (V01) — round 3

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-layers-r3; covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method and inputs (files, md5, lines) | done
- §1 Re-check of round 2's SLR2-01..15 (each: FIXED / PARTLY / NOT FIXED, with the text now) | done
- §2 Seam census, round 3 (every piece crossing V04/V05 <-> V01 and the base sections they share) | done
- §3 New findings (SLR3-01 onward), severity, owner, required change | done
- §4 Disposition summary by owning volume; CONFIRMED versus PLAUSIBLE | done

## 0 Method and inputs

Lane `volumes/seam-layers-r3`, 2026-09-29, reconciliation round 3. Inputs at these md5s, as the round-3 reconcile lanes
landed them:
- `docs/volumes/V04-underground.md` — 3 708 lines, md5 8c42db56… (`reconcile-V04-r3` LANDED 06:11).
- `docs/volumes/V05-sky.md` — 3 466 lines, 2599efb7… (`reconcile-V05-r3` LANDED 06:03).
- `docs/volumes/V01-neighbourhoods.md` — 3 800 lines, 079cc7de… (`reconcile-V01-r3` LANDED 06:08 at bee1548c…, then
  `reconcile-V04-r3`'s counterpart edits of 06:09).
- `docs/volumes/_integrate.md` — 369 lines, d868438e… (`reconcile-BASE-F-r3`, 05:55).
- `docs/AMENDMENTS-2026-09-28f.md` — 1 238 lines, 38c29d39… (`reconcile-BASE-F-r3` LANDED 06:08).
- The base, `docs/ARCHITECTURE.md` — md5 01fea21f…, unchanged. It was read where a seam cites it: §2.3 `Terrain`,
  §4.2 S0's relief classes, §4.2 S1 (5) (crossing sites and decks), II.7.3's S7b (6) paragraph, §8.2's `states` row.
- `docs/volumes/critique/seam-layers-r2.md` — read whole first.

**What was read, and how (J-SL3.1).** Round 2 read the three volumes whole, every line, at the md5s its §0 names. The
round-3 lanes' backups are exactly those files (`scratchpad/volumes/rcV1r3/V01-pre.md` cb72db1f…,
`rcV4r3/V04-pre-r3.md` 08a632a2…, `rcV5r3/V05-pre-r3.md` 6f080c15…, `rcBFr3/f-pre-r3.md` a85996a2…,
`rcBFr3/integrate-pre-r3.md` a8c72fb4…). This round read:
- **every changed line whole**, as unified diffs against those backups (V01 553 diff lines, V04 390, V05 491, file f 191,
  `_integrate.md` 20; saved in this session's `scratchpad/volumes/slr3/`);
- **the seam's core sections whole on the live files**, where a changed line could meet an unchanged one:
  - V01 V1-2.3's parts table, V1-3.7.1, V1-3.8.8, V1-3.10 (all of V1-3.10.1–3.10.3), V1-3.11 (6), V1-3.12,
    V1-3.17.6–3.17.7;
  - V04 §1.2's volume-1 and sky rows, §3.1, §3.3, §3.4, §5.2;
  - V05 §1b's rows to the unit run, §2.3, §2.3a, §2.6, §3.1, §3.8, §3.10, §3.12, §3.15, §3.16, §3.20 (9)–(12), §3.22,
    §4.2, §4.3 and §6;
  - V06 §3.4 (8) and §6.2, for the epoch's host of an island raise;
- **whole-file greps for every absence claimed below** (§4).

Decision **J-SL3.1**: chose to re-read by whole diffs plus the seam's core sections, over a third whole-file read of
3 800 + 3 708 + 3 466 lines, because text that did not change since round 2's whole read can break the seam only where a
changed line meets it, and the core sections hold every such meeting. This is the method `seam-settlements-r2` used
(J-SR2.1). Vetoable: a whole re-read would replace it.

**Method.** Round 2's 15 issues were re-checked against the text now (§1). A fix counts only when every side of the seam
carries it, the counterpart halves included, since each round so far has lost a half written after its receiver
landed. The three lanes landed within eight minutes of each other this round (V05 06:03, V01 06:08, V04 06:11, with V04
editing V01 at 06:09). Then every piece crossing the seam was traced again both ways (§2), the new round-3 mechanisms
first:
- the island's unit run after generation;
- the island crossing sites;
- a lone neighbourhood's void part;
- the access state forms;
- the landfall's typed members.

Severity as before:
- *blocker* — cannot be scheduled or built;
- *major* — a contradiction or an unwired piece a builder would hit;
- *minor* — wording, a citation, a single-source slip.

## 1 Re-check of round 2's issues

| id | r2 sev. | owner | status | where it stands now |
|---|---|---|---|---|
| SLR2-01 | major | V01 | **FIXED** | V1-3.10.3 (6) (a)–(c); V1-3.10's "Two callers exist at generation; V1-3.10.3 (6) names those after it"; the stage graph's units line; §1.2's V05 row; §1b's unit-run row; V1-6's sky row; T-V1-21's after-generation clauses; W8; J-V1.90. V05 §2.3 and §4.2 cite (6) and (6) (c). Three new residues: the resize's receiving districts (**SLR3-04**), the rim strip V01 assumes V05 re-lays (**SLR3-02**) and V06's side (**SLR3-11**) |
| SLR2-02 | minor | V05 | **FIXED** | V5 §2.3's list reads "generation, `raiseIsland`, New random on the island; V01 V1-3.10.3 (6)"; §4.2's *Resizing* and *Reshaping the rim* cite V1-3.10.3 (6) (c). Two further stale terms survive — "the unit run's local operator" (§4.2 *Accesses*) and "the unit run's local placement" (§3.20 (9) (e)) — raised as **SLR3-09** |
| SLR2-03 | major | V05 | **FIXED** | V5 §3.20 (12) (b), BCR-V5-16, §1b's cross-arena row, T-V5-32, J-V5.75: the land centroid's world point. V01 V1-3.2 (5) carries the parenthesis (applied by V01's own lane after V05 landed without it) |
| SLR2-04 | major | V01 | **FIXED** | V1-3.10.3 (4)'s *Crossing sites*, V1-3.4.8, V1-2.3's parts table, F-TEMPLATE's row, §1b's new row, T-V1-21, J-V1.91. V05's side still states an unqualified "use the river's crossing sites" and cites nothing (**SLR3-10**); the mechanism extends base §4.2 S1 (5) without a request (**SLR3-07**) |
| SLR2-05 | major | V01 | **PARTLY** | V01 FIXED: V1-3.10.1 step 6, step 7's sewers bullet, V1-2.7's allocation row, §0, T-V1-20, J-V1.92. Its V04 half is unapplied: V01's cross-volume note (25) asks V4 §3.1's hood line and §3.3 to say that in a hood document U-FORECAST runs after the one-district allocation and P7's cap reads that allocation's poorest band. V04 has 0 hits for "one-district", "V1-3.10.1 step 6" or "J-V1.92", and V4 §3.3 still runs the forecast "at S7b, before (5)" on "the roster of S2" → **SLR3-01** |
| SLR2-06 | major | V01 | **FIXED** | V1-3.8.8 draws §8.2's access `states` form for the stored or derived state (sealed reads `bricked`); V1-5.1.2 cites it; T-V1-46; J-V1.93. V4 §5.2 (7) and §3.10's "a state change … changes the place's symbol" agree |
| SLR2-07 | minor | V05 | **FIXED** | V5 §1b's `shadeSky` row, §2.6's strip-onto-an-island row and §2.3a name volume 1's four sky-arena readers |
| SLR2-08 | minor | V04 | **FIXED** | V4 §3.10, §1b.2's opening-pass row, §4.3's two rows, §2.6's `RuinRecord` cell, §3.12, T-V4-17, T-V4-74 (b), J-V4.106 amended, J-V4.115 (the `quarry` system added for its `collapsed_shaft` candidates). V01's V1-2.7 row and §1b `HoodPlace` row read "the opening pass, run in the commits V04 §3.10 names" (V04's counterpart edit) |
| SLR2-09 | minor | V01 | **FIXED** | V1-3.16's callers: the unit runner, V05's hand-over and coverage units; V05's fill and overshoot read the cell, not the count |
| SLR2-10 | minor | V01 | **PARTLY** | V01 FIXED: V1-3.17.7 (2), V1-2.3's `asks` comment, T-V1-21, J-V1.94. Its V05 half (V5 §3.22 (4) to cite V1-3.17.7 (2); V01 note (24)) is unapplied: V05 has 0 hits for "V1-3.17.7". Tracing the fix showed the class it reads is never stored, which is worse than the missing citation → **SLR3-03** |
| SLR2-11 | minor | V05 | **FIXED** | T-V5-8, T-V5-16, T-V5-27, J-V5.69, §13 items 11–12, §0, §1.1 item 23, §1b's events row, §8's P4 row read J-VI.4's bends. Every remaining "refus" in V05 is a dossier refusal or the base's rule, as it should be |
| SLR2-12 | minor | V05 | **FIXED** | BCR-V5-30's reader list and V5 §1b's `levelledGroundCm` row add V4 §3.5.5's buried floor and V4 §3.5.7 (a)'s village working. File f item 309's new round-3 note lists volume 4's M6-U readers without them → **SLR3-12** |
| SLR2-13 | minor | V01 | **FIXED** | §1b's `stepProfile` row names item 447's `stepMinCm` and `stepMaxCm` and V4 §3.5.5's buried floor; BCR-43's last sentence adds the buried floor |
| SLR2-14 | minor | V01 | **FIXED** | V1-3.10.1 (7) cites V04 §3.1's hood line (J-V4.105) for the tail and the one catacomb, deciding only the absences (J-V1.77); §0 reads "no old quarry, no generated vaults and no buried older town" |
| SLR2-15 | minor | V04 | **FIXED** | V4 §1b.1's `AccessPoint.cause` row, §2.4's comment, §2.6's read cell and §1b.1's `excavation(cluster)` row name volume 1's reads; V01 V1-2.3's `under` comment names the `excavation` reading as `access`'s producer (V04's counterpart edit) |

**Totals.** 13 FIXED, 2 PARTLY, 0 NOT FIXED. Both PARTLY items are counterpart halves in V01's cross-volume notes (24)
and (25). They were written after the receiving lane had started from its backup: V05 landed at 06:03, before V01's note
existed. V04 landed at 06:11, after the note, but its lane's scope was the four issues routed to it. Both are re-raised
below with the receiving volume as the owner, SLR3-01 and SLR3-03.

## 2 Seam census, round 3

Round 2's 58 pieces with their state now, then the nine pieces this round's mechanisms added (59–67). "Unchanged" means
that neither side's text changed since round 2's whole read, and that the diffs touch nothing it reads.

| # | seam piece | producer ↔ consumer | state |
|---|---|---|---|
| 1 | SKY's slot in the stage graph | V05 §3.1 ↔ V01 V1-3.1 | consistent (unchanged) |
| 2 | island strips onto the ground | V05 §2.3a, §3.19 (6) ↔ V01 S9b, pins, `islandShare` | consistent |
| 3 | `SkyHandover` and the `sky` request | V05 §2.3 ↔ V01 V1-2.4, V1-3.10.3 | consistent at generation and after it (SLR2-01, -02 fixed); see 61–62 |
| 4 | the rim walk | V01 V1-3.10.3 (4) ↔ V05 §3.12 | consistent at generation; re-planting after a resize **SLR3-02** |
| 5 | `portalsTotal`, `landingsReached` | V01 V1-3.11 (6) ↔ V05 T-V5-9 | consistent (the island's bridge portals are template portals, never counted) |
| 6 | island district kinds, fabric prior, district count | V05 §2.4, §3.12 ↔ V01 V1-3.10.3, V1-3.16 | consistent (SLR2-09 fixed) |
| 7 | island retaining walls | V01 V1-3.17.7 (2) ↔ V05 §3.22 (4) | bend words consistent (SLR2-11 fixed); the relief class read **SLR3-03** |
| 8 | levelled ground as a reader | BCR-V5-30 ↔ V04, V01 `stepProfile` | consistent in the volumes (SLR2-12, -13 fixed); file f item 309's list **SLR3-12** |
| 9 | `ruinCentre()`, the `ruin.node` line | V04 §3.5.0a (9) ↔ V05 §1b, §3.3, §4.5 | consistent (unchanged) |
| 10 | catacomb count with island churches | V04 §3.5.1 (3) ↔ V05 §1.3, §3.5 (3) | consistent (unchanged) |
| 11 | the sky layer never read | V04 §1.2 ↔ V05 §1.3, T-V5-26 | consistent (unchanged) |
| 12 | burial faces on islands skipped | V04 §3.5.1 (1) ↔ V05 §3.5 (3) | consistent (unchanged) |
| 13 | arch vaults under a ruined span | V05 §3.16 (4) ↔ V04 §3.5.4 (d) (2) | consistent |
| 14 | ground accesses under a landfall | V05 §3.16 ↔ V04 §3.10 | consistent; reopening in the batch the host leaves the decoration (TT-07) |
| 15 | light at shafts under an island | V05 §5.3 (1) ↔ V04 §5.3, BCR-38 | consistent (unchanged) |
| 16 | the opening pass at generation | V01 V1-3.7.1 ↔ V04 T6 | consistent |
| 17 | ground access symbols and their state forms | V01 V1-3.8.8, V1-5.1.2 ↔ V04 §5.2 (7), base §8.2 | consistent (SLR2-06 fixed) |
| 18 | the undercity's parent | II.7.5 (2), V01 V1-3.16 ↔ V04 §3.6 C5 | consistent (unchanged) |
| 19 | `districtsAbove`, `fabricSignature` | V01 V1-3.16 ↔ V04 §3.5.0a (7), C5, §4.5 | consistent (unchanged) |
| 20 | `blockLifted` | V01 V1-3.9 ↔ V04 §3.5.1 (7) | consistent (unchanged) |
| 21 | catacomb source protection | V04 `UndergroundSystem.sources` ↔ V01 V1-3.5.12 (4) | consistent (unchanged) |
| 22 | the catacomb entrance sentence | file f item 560 ↔ V01, V04 | consistent (unchanged) |
| 23 | public opening kinds and places | file f item 554 ↔ V01 V1-3.7.1, V04 §3.5.7 (e) | consistent (SLR2-15 fixed) |
| 24 | `hood.pins` rows for the underground | V04 §1.3 ↔ V01 V1-3.8.8 | consistent (unchanged) |
| 25 | public ground, squares, yards | V04 §1.2 ↔ V01 blocks | consistent (unchanged) |
| 26 | locality of a ground edit | V04 §4.3, V05 §4.3 ↔ V01 V1-3.9 | consistent |
| 27 | the lone neighbourhood's layers | V01 V1-3.10.1 (7) ↔ V04 §3.1 | consistent, restatement gone (SLR2-14 fixed); the hood's S7b see 60 |
| 28 | the `Way` line | file f 208 → 207 → 209 | consistent (unchanged) |
| 29 | `DistrictContext.under`, `.shade.islandShare` | V01 V1-2.3 ↔ V04 §3.5.7 (g), V05 §2.3a | consistent (SLR2-15 fixed) |
| 30 | `catchmentOf` on the other arenas | V01 V1-3.16 ↔ V04 §3.6a, V05 §3.5 (3) | consistent (unchanged) |
| 31 | GeoJSON of walls and raised ways | file f 447 ↔ V01 V1-5.3, §1b, V05 §5.5 | consistent (SLR2-13 fixed) |
| 32 | barrier kinds on seams | J-VI.3 ↔ V01 BCR-30 (b) | consistent (unchanged) |
| 33 | a ground landing's S8 destination | BCR-V5-20 ↔ V01 V1-3.4.2 (a) | consistent (unchanged) |
| 34 | the sky unit run's generation cost | V01 V1-6 ↔ V05 §6 | consistent at generation; after generation see 62 |
| 35 | the aqueduct's terminal | V01 V1-3.17.8 ↔ V04 §3.5.4 (e) | consistent (unchanged) |
| 36 | spans' `use`, lanes under arches | V04 BCR-45 ↔ V01 V1-3.17.3 | consistent (unchanged) |
| 37 | the raised-way slot before S7b (1) | V01 BCR-39 ↔ V05 §3.1 | consistent (unchanged) |
| 38 | `hood.fabric`, `sky.clearance`, `under.*` epoch orders | V01 (40) ↔ V05 (50) ↔ V04 (10–30) | consistent |
| 39 | DR numbers | IN-V01-6, IN-V05-3 | consistent (unchanged) |
| 40 | raised-way reason words | J-VI.2 ↔ IN-V01-4 | consistent (unchanged) |
| 41 | SKY's data keys in S9b's declared inputs | BCR-V5-3 ↔ V01 V1-3.1 | consistent (unchanged) |
| 42 | opening places after generation | V04 §3.10 ↔ V01 V1-2.7, §1b | consistent (SLR2-08 fixed; one list, in V04) |
| 43 | `@plat/hood` services in M6-U's build order | V01 W15 ↔ V04 §8, §11 Q1 | consistent (unchanged) |
| 44 | shade on a sky arena | V05 `shadeSky` ↔ V01's shade readers | consistent (SLR2-07 fixed) |
| 45 | the landfall's quarry against the surface quarry | V05 §3.16 (4) ↔ V04 §3.5.3 | consistent (unchanged) |
| 46 | the seam bars' registration | V04 BCR-15 ↔ T-V4-71 – 75 | consistent |
| 47 | the underground pseudo-district's name | II.7.3 ↔ V04 §3.6a (5), V01 V1-3.16 | consistent (unchanged) |
| 48 | `SkyIsland.districts`' writer | V01 V1-2.4 ↔ V05 §2.6 | consistent at generation; after a New random **SLR3-09** |
| 49 | the island unit run's cross-arena pulls | V05 §3.20 ↔ V01 V1-3.10.3 (4) | consistent |
| 50 | file f's needed-by lists and pointers | file f ↔ V01, V04, V05 | consistent but items 308 and 309 (**SLR3-12**) |
| 51 | the island's unit run after generation | V05 §2.3, §3.15 (5), §4.2 ↔ V01 V1-3.10.3 (6) | wired (SLR2-01, -02 fixed); residues in 61–63 |
| 52 | the sky pseudo-district in S7b (1)'s supply term | V05 §3.20 (12) (b), BCR-V5-16 ↔ V01 V1-3.2 (5) | consistent (SLR2-03 fixed) |
| 53 | the island river's crossing sites | V05 §3.8 (4), §3.12 ↔ V01 V1-3.10.3 (4) | built (SLR2-04 fixed); see 59 |
| 54 | a hood document's void-dwelling allocation | V04 §3.1, §3.3 P7, F6 ↔ V01 V1-3.10.1 step 6 | V01 fixed; see 60 |
| 55 | an access's state on the surface symbol | base §8.2 `states`, V04 §3.10 ↔ V01 V1-3.8.8, V1-5.1.2 | consistent (SLR2-06 fixed) |
| 56 | `stepProfile`'s readers | V01 §1b, BCR-43 ↔ V04 §3.5.5 | consistent (SLR2-13 fixed) |
| 57 | `AccessPoint.cause` and `excavation` read by volume 1 | V04 §1b.1, §2.6 ↔ V01 V1-3.7.1, V1-2.3 | consistent (SLR2-15 fixed) |
| 58 | `terraceState` on an island | V01 V1-3.17.7 (2) ↔ V05 §3.8 (3), §3.22 (4) | see 64 |
| 59 | the island crossing-site spans and the island's bridges | V01 V1-3.10.3 (4), V1-2.3's parts table ↔ V05 §2.3 `river`, §3.8 (4), §3.12, §3.16 (7), §3.22 (6); base §4.2 S1 (5) | the mechanism holds; V05's side uncited **SLR3-10**; the base's S4/S5/S7 wording **SLR3-07**; "part 0" on a sky arena **SLR3-06** |
| 60 | a lone neighbourhood's void part (S7b (6) (d) in a hood) | V01 V1-3.10.1 step 6 ↔ V04 §3.1, §3.3 P7, §3.4 F6, §3.7a T8, BCR-19 | the forecast's order and P7's cap disagree **SLR3-01**; V01's wiring rows **SLR3-05** |
| 61 | the unit run inside an after-generation commit (a raise at an epoch, a late declaration, New random) | V01 V1-3.10.3 (6) (a)–(b), V1-6 ↔ V05 §2.3, §3.15 (5), §4.2, §6; the epoch's host V06 §6.2 | V01 ↔ V05 consistent in the call; SKY-F's write and stale words **SLR3-09**; `superseded` **SLR3-08**; V06 **SLR3-11** |
| 62 | faces a growing resize adds or a rim reshape moves | V01 V1-3.10.3 (6) (c), V1-6, T-V1-21 ↔ V05 §4.2, §6 | the rim strip's re-laying unproduced **SLR3-02**; one receiving district against the rim districts **SLR3-04** |
| 63 | a new landing yard's island plots | V01 V1-3.10.3 (6) (c) ↔ V05 §4.2 *Accesses* | one operator, two names **SLR3-09** |
| 64 | the island's relief class for `terraceState` | V01 V1-3.17.7 (2), V1-2.3 ↔ V05 §2.1 `terrainEcho`, §3.8 (3), §3.22 (4) | the `own` class read, never stored **SLR3-03** |
| 65 | the landfall's typed `members` read by volume 4's closures | V05 BCR-V5-9, §2.6, §3.16 (5) ↔ V04 §3.10, §1.2 | consistent: V04 tests only the `Id` members of its listed kinds (a way, plot, land use or reservation), and no access stands in a raised-way pier's footprint (T-V4-64) |
| 66 | `SeamReport.superseded` for a run over an island that holds content | V01 V1-3.10.3 (6) (b) ↔ V01 V1-3.11 (6) | **SLR3-08** |
| 67 | file f items 252, 308, 309 | file f ↔ V01, V04, V05 | 252 consistent (*Needed by* V04, V05, V06); 308, 309 **SLR3-12** |

## 3 New findings

### SLR3-01 — major — owner V04 — a hood document's forecast runs, in V04, before the allocation it now follows, and caps P7 by the wrong roster (SLR2-05's V04 half)

**Claim.** V01 now runs a lone neighbourhood's S7b (6) and (7) after its one-district allocation (V1-3.10.1 step 6;
J-V1.92). It says "with volume 4's forecast (V04 §3.3; BCR-19) at the hood's `contextRung` — after the one-district
allocation rather than before it as in a town … and with P7's cap reading the one-district allocation's poorest-band
households in place of the virtual host town's". The void part is "**taken from** the one-district allocation's
poorest-band households".

V04 says otherwise, with no hood exception:
- V4 §3.3: "`NetworkForecaster.forecast(doc, rules)` runs at S7b, before (5), on what exists then — the ways of S4 and
  S5, the district faces of S6, `Terrain`, the roster of S2".
- P7's `voidDwellingHouseholds` is "capped at `voidDwellings.share` × the poorest band's households". In a hood document
  that is the virtual host town's roster (V1-3.10.1 step 3), a whole town's poorest band.
- V4 §3.1's hood line reads `Recipe.product` "in U-FORECAST at S7b".
- §1b.2's and §2.6's `NetworkForecast` rows say "U-FORECAST at S7b".
- §1.2's volume-1 row cites V1-3.10.1 (7) but not step 6.

V01's cross-volume note (25) asked V04 for this sentence. V04's round-3 lane landed three minutes after V01 without it: 0
hits for "one-district", "V1-3.10.1 step 6" or "J-V1.92" in V04. A builder of U-FORECAST following V04 forecasts the hood
before its allocation exists and caps the void part at the virtual town's scale. That is the cap J-V1.92 rejects.

**Required change.**
- V4 §3.1's hood line adds after its first sentence: "In a hood document U-FORECAST runs after the one-district
  allocation, not before S7b (5), and P7's cap reads that allocation's poorest-band households in place of the roster's
  (volume 1, V1-3.10.1 step 6; J-V1.92); S7b (6) (d)'s void part is taken from that allocation."
- V4 §3.3's first paragraph adds "— in a hood document after the one-district allocation (V4 §3.1's hood line)".
- P7's last sentence adds "(in a hood document, the one-district allocation's poorest-band households)".
- §1b.2's and §2.6's `NetworkForecast` rows read "U-FORECAST at S7b (in a hood document after the one-district
  allocation, V1-3.10.1 step 6)".
- §1.2's volume-1 row cites V1-3.10.1 step 6 beside (7).
- T-V4-75 adds: "P7's `voidDwellingHouseholds` ≤ `voidDwellings.share` × the one-district allocation's poorest-band
  households, and the underground pseudo-district's allocation ≤ `forecastSafety` × that forecast (volume 1's T-V1-20)".

### SLR3-02 — major — owner V05 — a resize and a rim reshape never re-lay the rim strip, the landing yards or the claim, though volume 1's re-derivation runs "after" they are re-laid

**Claim.** Volume 1 re-derives the faces at a moved rim "after volume 5's operator has moved the rim and re-laid the rim
strip" (V1-3.10.3 (6) (c)), and re-plants the rim walk "along the moved stretch". The unit's outline is "the land face
less the rim strip" (V1-3.10.3 step 2). So the new faces exist only once the strip has been re-laid inside the new rim.

Volume 5 never re-lays it:
- The rim strip is laid once, by SKY's island L1 batch — "a closed L1 line `rimStripM` inside the rim" (V5 §3.10 (5);
  §1b's rim-strip row: "`SKY` L1 batch").
- V5 §4.2 *Resizing*: "The rim is eroded or dilated by the kernel's buffer … Shrinking: every plot that loses at least
  half its face is cleared …, the rest re-cut … Growing: the new land joins the district of the nearest rim stretch".
- *Reshaping the rim*: "§7.3's local operator on the island's arena — the faces touching the moved rim joining the
  district of the nearest rim stretch".
- Neither bullet mentions the strip, the landing yards claimed "from the rim inward across the strip" or the
  institution claim. Whole-file grep: 0 lines with "rim strip" in V5 §4.2–§4.3. §2.6 has no rim-strip row, and its
  `rim`, `land` row covers only New random.

If the strip stays where it was, a growing resize adds no face: the strip's face simply widens between the old line and
the new rim. Volume 1's (6) (c) then has nothing to lay, and the rim walk stands metres inside the rim. A shrinking resize
erodes the rim past the strip's line and breaks the arena. The yards' tops are "re-seated on a re-derived rim"
(V5 §2.6's `SkyAccess` row), but their island claims across the strip are not re-made.

**Required change.** V5 §4.2 *Resizing* and *Reshaping the rim* each add, after the rim moves: "one island L1 batch
re-lays the rim strip `rimStripM` inside the new rim and re-claims each landing yard at its top re-seated on the new rim
(V5 §3.10 (5)). The institution claim is kept where it still fits the land face less the strip and the yards, else it is
re-searched by V5 §3.10 (5) with the crypt re-test, a listed fate." Then:
- **Growing:** "the land between the old and the new strip lines is cut into faces, each joining the district of its
  nearest rim stretch, ties by district address; every district that receives a face is re-derived by its own scoped
  re-derivation from S8, which re-plants its stretch of the rim walk (V01 V1-3.10.3 (6) (c))". This replaces the
  singular "the district of the nearest rim stretch … the receiving district's".
- **Shrinking:** after the plot clearing and re-cut already stated, "the rim walk is re-laid on the re-laid strip by
  volume 1's rim-walk rule (V01 V1-3.10.3 (4)) in the same commit".

Two table rows follow:
- V5 §2.6 gains a row for the rim strip and the island's landing claims: created by SKY's L1 batch; re-laid by a resize,
  a rim reshape and New random; read by the unit run, S12b's rim walk and the rim lights; undone with the event.
- §1b's rim-strip row names the same producers.

V5 §6's "a resize, a rim reshape" row stands; it already prices "the rim districts".

### SLR3-03 — major — owner V05 — an `own` island's relief class is drawn and thrown away, but volume 1's terrace rule reads it

**Claim.** Volume 1 reads the island's relief class for `terraceState` as "its drawn class where `terrainEcho.relief` is
`own`, and `plain` where it is `echo` or `none`" (V1-3.17.7 (2); J-V1.94; V1-2.3's `asks` comment). T-V1-21 tests it.

Volume 5 draws that class and keeps it nowhere:
- V5 §3.8 (3): "for `own` the same at a class drawn by S0's relief weights on `island.place` (index `relief`)".
- The record holds only the mode: "`terrainEcho?: { river?: Id; relief: 'echo'|'own'|'none' }`" (V5 §2.1).
- The base's `Terrain` has no relief field (§2.3).
- `ContextVector.terrainClass` is another enumeration (`high`…`rock`; base §2.5).

So a builder of the island's `terraceState` must either re-draw volume 5's stream, a second writer of one draw, or find
no class. V5 §3.22 (4) reads the same class ("an `own` relief of a steep class"; "the island's own relief class asks
for terraces") and does not cite volume 1's rule. V05 has 0 hits for "V1-3.17.7": SLR2-10's V05 half and V01 note (24).

**Required change.**
- V5 §2.1's `terrainEcho` gains "`reliefClass?: 'plain'|'rolling'|'hilly'|'mountainous'` /* the class SKY drew for an
  `own` relief (V5 §3.8 (3)); absent for `echo` and `none` */", with BCR-V5-1's `SkyIsland` text to match.
- V5 §3.8 (3) says SKY writes the drawn class there.
- §2.6's `terrainEcho` row:
  - readers: add volume 1's `terraceState` (V01 V1-3.17.7 (2));
  - regenerate: re-drawn by New random with the terrain;
  - migrate: an `own` island without it re-draws the class on its `island.place` key at load, written and reported.
- V5 §3.22 (4)'s "the island's own relief class" reads "the island's relief class — `terrainEcho.reliefClass` for
  `own`, `plain` for `echo` and `none` (V01 V1-3.17.7 (2))".
- *Volume 1's wording, cited here:* V1-3.17.7 (2)'s "its drawn class" reads "its drawn class
  (`terrainEcho.reliefClass`, V05 §2.1)". If volume 1's lane lands first, volume 5's lane applies this sentence as a
  counterpart edit (reconcile-V04-r3's practice).

### SLR3-04 — major — owner V01 — a growing resize re-derives every district on the grown rim, but V1-6 and T-V1-21 allow one

**Claim.** A resize dilates or erodes the whole rim by a buffer (V5 §4.2: "The rim is eroded or dilated by the kernel's
buffer … keeping its shape"). A growing resize therefore adds land all round the island. The island's ≤ 3 districts are
cut from the whole outline by the bent cut (V1-3.10.3 step 2), so each touches the rim, and each receives new faces.

Volume 1's text reads as if one district receives them all:
- V1-3.10.3 (6) (c): "join the district of the nearest rim stretch … re-derived by that district's scoped
  re-derivation".
- V1-6's sky row: "a growing resize or a rim reshape costs §12.6's scoped law for the one receiving district".
- T-V1-21: "a growing resize and a rim reshape re-derive only the receiving district, the island's other districts
  byte-identical".

On any island with k ≥ 2, the bar fails on every growing resize, and the budget is k times short. Volume 5's own row says
the opposite: "a resize, a rim reshape | ≤ 3 ms + §12.6's scoped regeneration of the rim districts" (V5 §6).

**Required change.**
- V1-3.10.3 (6) (c) reads: "Each face a growing resize adds or a rim reshape moves joins the district whose rim stretch
  is nearest to it (ties by district address), and every district that receives a face is re-derived by its own scoped
  re-derivation from S8 …".
- V1-6's sky row reads: "a growing resize or a rim reshape costs §12.6's scoped law once per receiving district — for a
  resize every district bordering the rim, at most k ≤ 3".
- T-V1-21's clause reads: "a growing resize re-derives exactly the districts that receive new faces and a rim reshape
  those whose faces it moves, every other island district byte-identical and the district count unchanged".
- J-V1.90's "re-derive the faces … by the receiving district's scoped re-derivation" reads "by each receiving district's".

V05's matching wording is in SLR3-02.

### SLR3-05 — minor — owner V01 — the hood's void part has no row in V01's hook and wiring tables

**Claim.** V1-3.10.1 step 6 consumes four pieces of volume 4:
- P7's `voidDwellingHouseholds` (V4 §3.3);
- BCR-19's `forecastSafety` and S7b (6) (d);
- F6 (V4 §3.4);
- T8 (V4 §3.7a).

It feeds the underground pseudo-district's `Allocation`. V1-2.7's allocation row names the result. But §1.2's
g-item-109/V04 row lists only "`Features.sewers`, the undercity circumstance and V04 §3.1's below-TOWN set; V04 §4.3's
ground-edit row", and §1b has no row for the void part: a whole-file grep finds "U-FORECAST", "forecastSafety" and
"voidDwelling" only in step 6, T-V1-20 and the round notes.

**Required change.**
- §1.2's V04 row adds to its first cell "V04 §3.3's P7 and BCR-19 (`forecastSafety`, S7b (6) (d)), §3.4's F6, §3.7a's
  T8", and to its third "the hood's void part (V1-3.10.1 step 6)".
- §1b gains the row: "the hood's void part (V1-3.10.1 step 6) | P7's forecast at the hood's `contextRung`; the
  one-district allocation's poorest-band households | the underground pseudo-district's `Allocation` → V04's T3 F6; F6's
  misses → V04's T8; T-V1-20 | §4.5 S7b (6) (d) (V04 BCR-19)".

### SLR3-06 — minor — owner V01 — "part 0" names no part on a sky arena, where every island way lies in part ≥ 1

**Claim.** V01's per-reader parts table has a column headed "part 0", and its preamble keys raised decks to "a ground
arena part from 1 (`PlatKey.part ≥ 1`)" (V1-2.3). V1-3.11 (6)'s walk is "a BFS over D's way graph — part 0". Round 3
put the island's own decks in that column: "on a sky arena the island's own decks over its conjured river among them".

On a sky arena, though, every way carries the island's part:
- V05: "the sky layer has one part per island" (V5 §3.22 (3) (d));
- its parts are minted from `nextSkyPart` ≥ 1 (V5 §2.6).

A builder filtering on `part === 0`, or reading `part ≥ 1` as "raised", drops every island street from χ̃, the portals,
S9b's arms, the signatures and the island's `SeamReport` walk.

**Required change.** V1-2.3's preamble adds: "On a sky arena, the island's one part (V05 §2.1) reads as part 0 in every
row — an island carries no raised way (V05 §3.22 (3) (d)) — and 'raised' means a ground-arena part ≥ 1." The column
heading reads "part 0 (a sky island's own part)". V1-3.11 (6)'s "part 0" cites the table.

### SLR3-07 — minor — owner V01 — the island bridges extend base §4.2 S1 (5) without a base change request

**Claim.** The base builds a site into a bridge through S4, S5 and S7: "The way S4 or S5 routes through the two vertices
lays the span … the `Bridge` becomes `built` with that way, and S7 builds its furniture". It also says "A site no way
uses by the end of S5 stays a `site`" (§4.2 S1 (5)). An island runs none of those stages.

V1-3.10.3 (4) builds the island's bridges in the unit run instead:
- "this batch is the way that uses the site";
- "its furniture laid by §4.8's bridge rule in the unit's closing L1 batch (the unit run has no S7)".

That is a new producer of built bridges and furniture that the base text excludes. §1b's row names §4.2 S1 (5) as its
hook, but no BCR amends it. The base does let a later way use a site (§4.11: an epoch's growth uses the sites S1 and S3 left unused; F-ROUTE's
rung), but that is S4's router, never a unit run.

**Required change.** V01 §10 adds a BCR on `### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace` (the S1 (5) paragraph). Quote once: "A site no way uses by
the end of S5 stays a `site`". Append: "On a sky island's arena, where no S4, S5 or S7 runs, volume 1's unit run lays the
span of each site whose two banks border the island's built land in one L1 batch before its seeds and builds its
furniture by §4.8's rule in its closing batch; a site it does not lay, or whose far deck end no street reaches, stays a
`site`, reported (volume 1, V1-3.10.3 (4))." §1b's row cites the BCR. File f carries it as a new item; that is the
base-change lane's work, noted here for it.

### SLR3-08 — minor — owner V01 — `SeamReport.superseded` is "replace only", but a unit run over a held island now writes it

**Claim.** V1-3.10.3 (6) (b) sends a New random's or a Re-derive's successions on an island "in `SeamReport.superseded`
(V1-3.11 (6))". V1-3.11 (6) still defines the field as "`superseded` — §6.3's successions of the run (replace only)". A
builder of the report leaves it empty for a unit run.

**Required change.** V1-3.11 (6) reads "`superseded` — §6.3's successions of the run: a replace re-derivation's, and a
unit run's over an island that already holds content (V1-3.10.3 (6) (b))".

### SLR3-09 — minor — owner V05 — the island's after-generation paths keep unit-run names volume 1 no longer has, and New random names no SKY-F

**Claim.** Volume 1 gives the unit runner no scoped or local mode (V1-3.10.3 (6); J-V1.90). Volume 5 still names such
modes in two places:
- V5 §4.2 *Accesses*: `placeSkyAccess` "claims the island's landing yard (the plots it covers re-derived by the unit
  run's local operator)". V01 calls it "§7.3's local operator on the island's arena" (V1-3.10.3 (6) (c)).
- V5 §3.20 (9) (e): "an island node by the unit run's local placement (the solver's positive placement on the island's
  arena)".

New random has a sequencing gap. V5 §4.2 *New random on the island* re-derives "the river and the fabric … under the next
reroll". It names neither the unit run nor SKY-F, which writes `SkyIsland.districts` from the unit run's result (V01
V1-3.10.3 step 5). V5 §2.6's `districts` row regenerates by "succession" alone. A New random that changes k leaves the
record listing the old districts.

"The fabric re-derived" also collides with volume 1's term: `District.fabric` is the strategy, and New random keeps it
(V1-3.3.4, `fabric.select`'s reroll forced to 0). §1b's `SkyHandover` row names only SKY's call.

**Required change.**
- §4.2 *Accesses*: "(the plots it covers re-derived by §7.3's local operator on the island's arena, V01 V1-3.10.3
  (6) (c))".
- §3.20 (9) (e): "an island node by the solver's positive placement on the island's arena (§7.7's `placeAt`) — never a
  unit run (V01 V1-3.10.3 (6))".
- §4.2 *New random on the island*: "the outline's displacement, the terrain, the underside (unless edited) and the river
  re-derived under the next reroll, SKY's island steps re-run, the island's districts re-laid by volume 1's unit run (V01
  V1-3.10.3 (6) (a)–(b); each district's template kept where its lineage is, V1-3.3.4), then SKY-F (V5 §3.12)".
- §2.6's `districts` row, regenerate cell: "rewritten by SKY-F after every unit run — generation, a raise, New random, a
  Re-derive (V01 V1-3.10.3 (6)); otherwise succession".
- §1b's `SkyHandover` row adds to its consumer "after generation, called by `raiseIsland` and New random on an island
  (V01 V1-3.10.3 (6))".

### SLR3-10 — minor — owner V05 — the island crossing sites are still an uncited contract line on volume 5's side

**Claim.** Volume 1 now builds the island's bridges (V1-3.10.3 (4); J-V1.91). It builds only sites whose two deck ends lie
on the unit's outline face. A site that does not qualify, or whose far end no street reaches, stays a `site`, reported.

Volume 5's side cites none of it:
- V5 §3.12's contract still says only "use the river's crossing sites";
- V5 §3.8 (4) says "a bridge there may carry deck plots";
- V5 §3.22 (6) says "The island's bridges over its conjured river may carry deck plots";
- §1b's conjured-river row feeds only "the island's decks (S1 (5))".

A builder of V05's contract reads "use" as every site. SKY-F has no check for it, so a site left a `site` by volume 1's
rule looks like a broken contract. V01's note (24) states that §3.12's line "is met by V1-3.10.3 (4)", but V05 carries no
pointer back (0 hits for "crossing" with "V1-3.10.3" in V05).

**Required change.**
- V5 §3.12 reads "use the river's crossing sites as volume 1 qualifies and builds them (V01 V1-3.10.3 (4): a site whose
  banks both border the island's built land; one that does not qualify, or whose far bank no street reaches, stays a
  `site`, reported)".
- V5 §3.8 (4) and §3.22 (6) add "(built by volume 1's unit run, V01 V1-3.10.3 (4))".
- §1b's conjured-river row adds to its consumers "volume 1's crossing-site spans (V01 V1-3.10.3 (4))".

### SLR3-11 — minor — owner V06 — the epoch that raises an island names no unit run and does not price one (V01 note (26))

**Claim.** An epoch's `sky.islands` step may `raiseIsland` (V5 §3.15 (5)): "then V5 §3.6–§3.14 on the new island, its
districts laid by the unit run at the epoch". Volume 1 runs it "inside the calling commit" (V1-3.10.3 (6) (a)) and asks
volume 6 to say so (note (26)). Volume 6 has 0 hits for "unit run" and "V1-3.10.3".

Its §6.2 participant budget prices `sky.islands` at 10 / 20 / 25 ms for "(≤ 3 islands: the step and the strips)",
sourced "V05 §6's rows (≤ 2 ms + ≤ 4–6 ms per island)". That omits a raise's SKY island steps (≤ 7 / 10 ms per island,
V5 §6), its unit run (≈ 8–12 / 12–18 ms, V01 V1-6) and SKY-F (≤ 3 / 4 ms). The century bound built on the row is short
by about 24 ms at CITY and 34 ms at METROPOLIS for each epoch that raises an island.

**Required change.**
- V6 §3.2's `afterField` participant row for `sky.islands` adds: "a `raiseIsland` op lays the island's arena by SKY's island steps and
  its districts by volume 1's unit run inside the epoch's commit (V05 §3.15 (5); V01 V1-3.10.3 (6) (a))".
- §6.2's `sky.islands` row reads "the step and the strips, plus per island raised SKY, the unit run and SKY-F (V05 §6;
  V01 V1-6's sky row: ≈ 24 ms at CITY, ≈ 34 ms at METROPOLIS)", with the century bound's sum re-stated.

### SLR3-12 — minor — owner BASE-F — file f item 309's new note and item 308's needed-by lag the round-3 volumes

**Claim.** Two items lag:
- **Item 309.** Round 3 wrote a build-order note on item 309 (BCR-V5-30). It says "Volume 4's other readers (wall-face
  knots, arch-vault floors, foundation obstacles) read it from M6-U". BCR-V5-30's reader list, as SLR2-12 amended it,
  also names volume 4's buried floor under a raised grade (V4 §3.5.5) and its village working's depth test
  (V4 §3.5.7 (a)). V5 §13 item 25 asks "item 309's reader list follows BCR-V5-30's as it now stands".
- **Item 308.** Item 308 (BCR-V5-16) is *Needed by: V05* only. Its S7b (1) sentence now defines the point volume 1's χ̃
  reads for a sky pseudo-district (V1-3.2 (5); SLR2-03).

**Required change.**
- Item 309's parenthesis reads "(wall-face knots, arch-vault floors, foundation obstacles, the buried floor under a
  raised grade and the village working's depth test; V4 §3.2, §3.5.0, §3.5.4, §3.5.5, §3.5.7 (a))".
- Item 308 reads "*Needed by:* V01, V05 (volume 1's χ̃ reads the sky pseudo-district's point in S7b (1)'s supply term,
  V1-3.2 (5))".

## 4 Disposition summary by owning volume

| owner | blocker | major | minor | findings |
|---|---|---|---|---|
| V01 | 0 | 1 | 4 | SLR3-04; SLR3-05, SLR3-06, SLR3-07, SLR3-08 (plus the V01 wording half cited inside SLR3-03) |
| V05 | 0 | 2 | 2 | SLR3-02, SLR3-03; SLR3-09, SLR3-10 |
| V04 | 0 | 1 | 0 | SLR3-01 |
| V06 | 0 | 0 | 1 | SLR3-11 |
| BASE-F | 0 | 0 | 1 | SLR3-12 |
| **total** | **0** | **4** | **8** | 12 |

**What held.** Thirteen of round 2's fifteen issues are closed on every side of the seam:
- the access state forms, one per access at both ends;
- the sky pseudo-district's supply point, one point in both volumes;
- `shadeSky` on every volume-1 reader;
- the opening pass's commits, stated once in V04 and cited by V01;
- the `excavation` reading as `under[].access`'s producer;
- the lone neighbourhood's tail cited, not restated;
- `levelledGroundCm`'s readers in both volumes;
- `stepProfile`'s readers;
- `skyDistrictCount`'s callers;
- the bend words in V05's bars.

The round-3 mechanisms hold at their core:
- the island crossing sites become built bridges through the portal machinery the landings already use;
- the island's unit run has named callers, keys, carry-over and undo after generation;
- the landfall's typed members are read by volume 4 only in the `Id` forms its closures need.

The underground and the sky still never meet: V04 reads no sky entity, and V05 routes nothing below the ground.

**What this round found.** Two kinds of fault remain.
- **Counterpart halves lost again (SLR3-01, SLR3-03, SLR3-11).** V01's notes (24)–(26) were written after, or while,
  V05, V04 and V06 ran from their backups. Each receiving lane landed without the sentence.
- **Round-3 fixes that assumed something the other side never produces (SLR3-02, SLR3-03, SLR3-04):**
  - V01's rim re-derivation waits on a rim strip V05 never re-lays;
  - V01's terrace rule reads a relief class V05 never stores;
  - V01's single receiving district contradicts V05's all-round resize.

The minors are wiring rows, a base change request the island bridges need, a report field's scope, stale unit-run terms
and file f's lists.

**Advice to the reconcile lanes (not a finding).** Two lanes carry counterpart text across the seam:
- SLR3-03 has a volume-1 sentence;
- SLR3-02 and SLR3-04 must agree on "each receiving district".

This round's practice worked where it was used: the later-landing lane applies the other's cited sentence and logs it.
Twice it was not used, in SLR2-05 and SLR2-10.

**Observed outside this seam (not raised here).** File f item 574's note still quotes step (6) as it stood before
BCR-V6-28, while V04's BCR-6 now quotes the step as item 574 leaves it (V04 §13, round 3). That belongs to the time seam
(`seam-time-r3`, V04 against V06 and file f), which reconcile-V04-r3 already logged for the base-change lane.

**CONFIRMED versus PLAUSIBLE.** CONFIRMED by reading the inputs at the md5s of §0: every changed line as a whole diff
against round 2's inputs, and the seam's core sections on the live files. Every absence claimed is a whole-file grep:
- 0 hits in V04 for "one-district", "V1-3.10.1 step 6" and "J-V1.92" (SLR3-01);
- 0 lines with "rim strip" in V5 §4.2–§4.3, and no rim-strip row in V5 §2.6 (SLR3-02);
- V05's `terrainEcho` holds only `river` and `relief`, the base's `Terrain` has no relief field, and V05 has 0 hits for
  "V1-3.17.7" (SLR3-03);
- V05 §6 reads "the rim districts" while V01's V1-6 and T-V1-21 read "the one receiving district" and "only the
  receiving district" (SLR3-04);
- V01's §1.2 and §1b name none of P7, `forecastSafety`, F6 or T8 (SLR3-05);
- V05's "one part per island" and `nextSkyPart` ≥ 1 (SLR3-06);
- the base's §4.2 S1 (5) wording, S4 or S5 laying the span and S7 the furniture (SLR3-07);
- V1-3.11 (6)'s "(replace only)" (SLR3-08);
- V05's two "unit run's local" phrases, the New random bullet and the `districts` row (SLR3-09);
- 0 V05 lines joining "crossing" with "V1-3.10.3" (SLR3-10);
- 0 hits in V06 for "unit run" and "V1-3.10.3", and V6 §6.2's `sky.islands` row (SLR3-11);
- the texts of file f items 308 and 309 (SLR3-12).

PLAUSIBLE, by reasoning rather than execution:
- J-SL3.1's premise, that unchanged text can break the seam only where a changed line meets it;
- SLR3-02's consequence, that a strip left in place widens instead of adding faces;
- SLR3-04's premise, that a bent cut of the whole outline into k ≤ 3 districts leaves every district on the rim;
- SLR3-11's sums of about 24 ms and 34 ms per raised island.

The required changes' design choices are proposals for the owning lanes and are PLAUSIBLE:
- the `reliefClass` field and its re-draw at load (SLR3-03);
- the re-laying batch and the institution claim's re-search (SLR3-02);
- the BCR's text (SLR3-07).
