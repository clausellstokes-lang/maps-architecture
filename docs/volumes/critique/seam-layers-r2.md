# Seam check: the underground (V04) and the sky (V05) against the neighbourhoods they carry or shadow (V01) — round 2

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-layers-r2; covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method and inputs (files, md5, lines) | done
- §1 Re-check of round 1's SLR1-01..25 (each: FIXED / PARTLY / NOT FIXED, with the text now) | done
- §2 Seam census, round 2 (every piece crossing V04/V05 <-> V01 and the base sections they share) | done
- §3 New findings (SLR2-01 onward), severity, owner, required change | done
- §4 Disposition summary by owning volume; CONFIRMED versus PLAUSIBLE | done

## 0 Method and inputs

Lane `volumes/seam-layers-r2`, 2026-09-29, reconciliation round 2. Inputs at these md5s, as the round-2 reconcile lanes
landed them: `docs/volumes/V04-underground.md` (3 617 lines, md5 08a632a2…, `reconcile-V04-r2` LANDED 04:58),
`docs/volumes/V05-sky.md` (3 376 lines, 6f080c15…, `reconcile-V05-r2` LANDED 04:44), `docs/volumes/V01-neighbourhoods.md`
(3 670 lines, cb72db1f…: `reconcile-V01-r2` LANDED 04:46 at 2bbdfb9c…, then V04-r2's counterpart edits of 04:51),
`docs/volumes/_integrate.md` (367 lines, a8c72fb4…), `docs/AMENDMENTS-2026-09-28f.md` (1 167 lines, a85996a2…,
`reconcile-BASE-F-r2` LANDED 04:55), `docs/volumes/critique/seam-layers-r1.md` (507 lines, read whole first). The base
(`docs/ARCHITECTURE.md`, md5 01fea21f…, unchanged) was read where a seam cites it: §4.2 S1 (5) (crossing sites become
bridges only when a way uses them), §8.2's `states` row for `access`, II.7.4's `AccessPoint.state`.

**What was read.** V04, V05 and V01 **whole**, every line, in order (V04 1–3617, V05 1–3376, V01 1–3670), including §9's
decision tables and §10's base change requests; `_integrate.md` whole; file f's header, rules R-a–R-d and the seam items
207–209, 212, 213, 244, 245, 282, 309, 319, 325, 413, 414, 447, 539, 554, 559, 560, 564, 573, 574. Every absence claimed
below is a whole-file grep. Working notes: this session's `scratchpad/volumes/slr2/notes.md`. The reads ran past the
brief's ~300k-token checkpoint; they were finished before this file was written, so no section is left open.

**Method.** Round 1's 25 issues were re-checked against the text now (§1), a fix counted only when every side of the seam
carries it. Then every piece crossing the seam was traced again both ways (§2): the three round-2 lanes landed within
fourteen minutes of each other (V05 04:44, V01 04:46, V04 04:58, with V04 editing V01 at 04:51), so a hand-off written
after its receiver landed could again go unapplied. Severity as before: *blocker* — cannot be scheduled or built;
*major* — a contradiction or an unwired piece a builder would hit; *minor* — wording, a citation, a single-source slip.

## 1 Re-check of round 1's issues

| id | r1 sev. | owner | status | where it stands now |
|---|---|---|---|---|
| SLR1-01 | major | V04 | **FIXED** | V4 §3.1's hood line (`Recipe.product` read by U-FORECAST and T2; the below-TOWN set; one TOWN-rule catacomb on the hood's own burial faces; no quarry, generated or forced vault or buried town; P5 and P7 limited), §3.3's gate, §3.5.0's hood sentence, T-V4-75, J-V4.105; V01 V1-3.10.1 (7) reads "besides S0, only V04 §3.1's hood line reads `Recipe.product`", T-V1-20 cites T-V4-75. A residual on the hood's S7b → SLR2-05; a restatement → SLR2-14 |
| SLR1-02 | major | V05 | **FIXED** | V5 §1b's node-term row, §3.3, §4.5 and T-V5-25 read the report's `ruin.node` line (V04 §3.5.0a (9)); "report entry" occurs only in V05's round-2 note |
| SLR1-03 | major | V01 | **FIXED** | V1-3.1's S9b row declares `reservations.landing`, `allocations.landing`, each island's `shadeBasis` and the unlevelled `terrain`; T-V1-35 names the clause |
| SLR1-04 | major | V04 | **FIXED** | V4 §3.10's *Opening places after generation* bullet, §1b.2's three rows, §4.1's public-opening `placeAccess`, §4.2, §4.3's new row, §4.4, T-V4-74 (b), J-V4.106–107; V01 V1-2.7's opening row names the same creators. Two commits still missing from the list → SLR2-08 |
| SLR1-05 | major | V04 | **FIXED** | V4 §8 *Where it slots*, §3.11's row, risk (9), §11 Q1 (the "share no package" clause gone), J-V4.46, J-V4.108; V01 W15 lists the three services first; `_integrate.md` §6's V04 Q1 roll-up |
| SLR1-06 | major | V01 | **PARTLY** | V01 FIXED (V1-2.3, V1-3.5.5, V1-3.8.2 step 3, V1-3.1's S7c and S9b rows, T-V1-21, J-V1.87). Its V05 half — V01 note (23), written after V05 landed — is unapplied: V5 §1b's `shadeSky` row still names only the sky arena's context vector → **SLR2-07** |
| SLR1-07 | minor | V04 | **FIXED** | C5 computes the parent as `districtsAbove(part, core)`'s first entry; §1.2's V01 row and §1b.2 list both services; §1b.1's `District.core` row; T6's lineage cites V1-2.8; §3.5.1 (1) cites V05 §1.3, §3.5 (3); V01's 1b row names the distinctness step |
| SLR1-08 | minor | V05 | **FIXED** | V5 §3.12: the `street_trees` row along the strip's inner setback line, `along` naming the strip, no way |
| SLR1-09 | minor | V01 | **FIXED** | §1.3, V1-2.2, V1-3.8.2 and V1-3.8.8 read "the underground rows are volume 4's, which ships none (V04 §1.3, J-V4.97)" |
| SLR1-10 | minor | V01 | **FIXED** | V1-3.5.5, V1-6's S9b row and J-V1.58 read "once per shade evaluation — the generation's, a re-derivation's from S10a or earlier, or an epoch's" |
| SLR1-11 | minor | V05 | **FIXED** | V5 §3.5 (2)–(3), §3.12 item 7, BCR-V5-5 and BCR-V5-16 read `plotShare · A` with V01's `sky.plotShare`; §2.3 calls `skyDistrictCount`; `0.62 · A` survives only in the round notes |
| SLR1-12 | minor | V01 | **FIXED** | V1-3.10.3 (2) reads `skyDistrictCount(…)` over `sky.plotShare`; V1-3.16 adds the pure service; V1-3.14's row gives the 0.62 default. Its caller list has one wrong entry → SLR2-09 |
| SLR1-13 | minor | V01 | **FIXED** | V1-3.1: "SKY (V05 §3.1) runs after S7b, S7c included"; V1-3.17.7 (1): bent by V05 §3.22 (3) (d) (J-VI.4 (e)) |
| SLR1-14 | minor | V04 | **FIXED** | V4 §3.5.3 defines the surface quarry once (a `quarry` land use without a `source`); §3.11's row and §1.2's V05 row cite it |
| SLR1-15 | minor | V04 | **FIXED** | BCR-15 reads T-V4-1 – T-V4-75 |
| SLR1-16 | minor | V04 | **FIXED** | §1.2's ground paragraph, N6, N7, T1's reads, §3.5.0's foundations, §3.5.4 (d) (1) and BCR-45's span rule read `levelledGroundCm` (BCR-V5-30); 15 occurrences |
| SLR1-17 | minor | V01 | **FIXED** | V1-2.3's comment, BCR-43 and §1b's row name `levelledGroundCm`. The row's consumer list is stale → SLR2-13 |
| SLR1-18 | minor | BASE-F | **FIXED** | file f items 213 and 282 list V01, item 309 lists V01, V02, V04, V05; every `V0n §10, l. N` pointer replaced by the request's id and §10 (J-RF2.1) |
| SLR1-19 | minor | V04 | **FIXED** | V4 §3.6a (5) and C1 name the underground pseudo-district (the sewer-front neighbourhoods and F6's void dwellings); V01 V1-3.16 likewise; "sewer-front pseudo" 0 hits in the three volumes |
| SLR1-20 | minor | V04 | **FIXED** | V4 §3.5.7 (e): source `opening`, role `access`, a skylight a `mouth` of role `light`; T-V4-74 (e) |
| SLR1-21 | minor | V01 | **FIXED** | V1-3.9, V1-4.1, T-V1-47 and J-V1.46 name the closed source (V04 §3.5.1 (8)); "stagnant" only for `blockLifted` |
| SLR1-22 | minor | V01 | **FIXED** | V1-3.9 cites V04 §4.3's ground-edit row and V05 §4.3's island re-read without restating them |
| SLR1-23 | minor | V05 | **FIXED** | V5 §1.3, §3.5 (3), §13 item 3 cite V04 §3.5.1 (3) and `CatacombRule.count`'s `churchesPer`; the invented id is gone |
| SLR1-24 | minor | V05 | **FIXED** | V5 §2.6's `districts` row: created by SKY-F from `NeighbourhoodResult.districts` |
| SLR1-25 | minor | V01 | **FIXED** | V1-3.10.3 (4): the island's S10b reads another arena by `skyRoute` and, at generation, a ground provider at its S10a block; T-V1-21's pool-size clause |

**Totals.** 24 FIXED, 1 PARTLY, 0 NOT FIXED. The one PARTLY is again a counterpart half written by the later-landing lane
(V01's note (23) for V05, which had landed two minutes earlier); it is re-raised in §3 as SLR2-07.

## 2 Seam census, round 2

Round 1's 50 pieces with their state now, then the eight pieces this round found.

| # | seam piece | producer ↔ consumer | state |
|---|---|---|---|
| 1 | SKY's slot in the stage graph | V05 §3.1 ↔ V01 V1-3.1 | consistent |
| 2 | island strips onto the ground | V05 §2.3a, §3.19 (6) ↔ V01 S9b, pins, `islandShare` | consistent |
| 3 | `SkyHandover` and the `sky` request | V05 §2.3 ↔ V01 V1-2.4, V1-3.10.3 | consistent at generation; after generation **SLR2-01** |
| 4 | the rim walk | V01 V1-3.10.3 (4) ↔ V05 §3.12 | consistent |
| 5 | `portalsTotal`, `landingsReached` | V01 V1-3.11 (6) ↔ V05 T-V5-9 | consistent |
| 6 | island district kinds, fabric prior, district count | V05 §2.4, §3.12 ↔ V01 V1-3.10.3, V1-3.16 | consistent; caller list **SLR2-09** |
| 7 | island retaining walls | V01 V1-3.17.7 (2) ↔ V05 §3.22 (4) | consistent in the bodies; relief class **SLR2-10**; stale refusal words **SLR2-11** |
| 8 | levelled ground as a reader | BCR-V5-30 ↔ V04, V01 `stepProfile` | consistent; reader lists **SLR2-12**, **SLR2-13** |
| 9 | `ruinCentre()`, the `ruin.node` line | V04 §3.5.0a (9) ↔ V05 §1b, §3.3, §4.5 | consistent |
| 10 | catacomb count with island churches | V04 §3.5.1 (3) ↔ V05 §1.3, §3.5 (3) | consistent |
| 11 | the sky layer never read | V04 §1.2 ↔ V05 §1.3, T-V5-26 | consistent |
| 12 | burial faces on islands skipped | V04 §3.5.1 (1) ↔ V05 §3.5 (3) | consistent |
| 13 | arch vaults under a ruined span | V05 §3.16 (4) ↔ V04 §3.5.4 (d) (2) | consistent |
| 14 | ground accesses under a landfall | V05 §3.16 ↔ V04 §3.10 | consistent; how the surface draws a bricked access **SLR2-06** |
| 15 | light at shafts under an island | V05 §5.3 (1) ↔ V04 §5.3, BCR-38 | consistent |
| 16 | the opening pass at generation | V01 V1-3.7.1 ↔ V04 T6 | consistent |
| 17 | ground access symbols, one visibility rule | V01 V1-3.8.8 ↔ V04 §5.2 (7) | visibility consistent; state forms against the base **SLR2-06** |
| 18 | the undercity's parent | II.7.5 (2), V01 V1-3.16 ↔ V04 §3.6 C5 | consistent |
| 19 | `districtsAbove`, `fabricSignature` | V01 V1-3.16 ↔ V04 §3.5.0a (7), C5, §4.5 | consistent |
| 20 | `blockLifted` | V01 V1-3.9 ↔ V04 §3.5.1 (7) | consistent |
| 21 | catacomb source protection | V04 `UndergroundSystem.sources` ↔ V01 V1-3.5.12 (4) | consistent |
| 22 | the catacomb entrance sentence | file f item 560 ↔ V01, V04 | consistent |
| 23 | public opening kinds and places | file f item 554 ↔ V01 V1-3.7.1, V04 §3.5.7 (e) | consistent; V04's consumer lists **SLR2-15** |
| 24 | `hood.pins` rows for the underground | V04 §1.3 ↔ V01 | consistent |
| 25 | public ground, squares, yards | V04 §1.2 ↔ V01 blocks | consistent |
| 26 | locality of a ground edit | V04 §4.3, V05 §4.3 ↔ V01 V1-3.9 | consistent |
| 27 | the lone neighbourhood's layers | V01 V1-3.10.1 (7) ↔ V04 §3.1 | consistent in the line; the hood's S7b **SLR2-05**; restatement **SLR2-14** |
| 28 | the `Way` line | file f 208 → 207 → 209 | consistent |
| 29 | `DistrictContext.under`, `.shade.islandShare` | V01 V1-2.3 | shade consistent; `under`'s producer **SLR2-15** |
| 30 | `catchmentOf` on the other arenas | V01 V1-3.16 ↔ V04 §3.6a, V05 §3.5 (3) | consistent |
| 31 | GeoJSON of walls and raised ways | file f 447 ↔ V01 V1-5.3, V05 §5.5 | consistent in the export rows; V01 §1b stale **SLR2-13** |
| 32 | barrier kinds on seams | J-VI.3 ↔ V01 BCR-30 (b) | consistent |
| 33 | a ground landing's S8 destination | BCR-V5-20 ↔ V01 V1-3.4.2 (a) | consistent |
| 34 | the sky unit run's generation cost | V01 V1-6 ↔ V05 §6 | consistent |
| 35 | the aqueduct's terminal | V01 V1-3.17.8 ↔ V04 §3.5.4 (e) | consistent (J-VI.9) |
| 36 | spans' `use`, lanes under arches | V04 BCR-45 ↔ V01 V1-3.17.3 | consistent |
| 37 | the raised-way slot before S7b (1) | V01 BCR-39 ↔ V05 §3.1 | consistent |
| 38 | `hood.fabric`, `sky.clearance`, `under.*` epoch orders | V01 (40) ↔ V05 (50) ↔ V04 (10–30) | consistent |
| 39 | DR numbers | IN-V01-6, IN-V05-3 | consistent |
| 40 | raised-way reason words | J-VI.2 ↔ IN-V01-4 | consistent |
| 41 | SKY's data keys in S9b's declared inputs | BCR-V5-3 ↔ V01 V1-3.1 | consistent |
| 42 | opening places after generation | V04 §3.10 ↔ V01 V1-2.7 | consistent for the listed commits; two commits missing **SLR2-08** |
| 43 | `@plat/hood` services in M6-U's build order | V01 W15 ↔ V04 §8, §11 Q1 | consistent |
| 44 | shade on a sky arena | V05 `shadeSky` ↔ V01's shade readers | V01 consistent; V05's reader rows **SLR2-07** |
| 45 | the landfall's quarry against the surface quarry | V05 §3.16 (4) ↔ V04 §3.5.3 | consistent |
| 46 | the seam bars' registration | V04 BCR-15 ↔ T-V4-71 – 75 | consistent |
| 47 | the underground pseudo-district's name | II.7.3 ↔ V04 §3.6a (5), V01 V1-3.16 | consistent |
| 48 | `SkyIsland.districts`' writer | V01 V1-2.4 ↔ V05 §2.6 | consistent |
| 49 | the island unit run's cross-arena pulls | V05 §3.20 ↔ V01 V1-3.10.3 (4) | consistent |
| 50 | file f's needed-by lists and pointers | file f ↔ V01, V04, V05 | consistent |
| 51 | the island's unit run after generation (a raise, New random, a resize, a rim reshape) | V05 §2.3, §3.15 (5), §4.2 ↔ V01 V1-3.10, V1-6 | **SLR2-01**, **SLR2-02** |
| 52 | the sky pseudo-district in S7b (1)'s supply term, which χ̃ reads | V05 §3.20 (12) (b), BCR-V5-16 ↔ V01 V1-3.2 | **SLR2-03** |
| 53 | the island river's crossing sites | V05 §3.8 (4), §3.12 ↔ V01 V1-3.10.3 | **SLR2-04** |
| 54 | a hood document's void-dwelling allocation | V04 §3.1, §3.3 P7, F6 ↔ V01 V1-3.10.1 step 6 | **SLR2-05** |
| 55 | an access's state on the surface symbol | base §8.2 `states`, V04 §3.10 ↔ V01 V1-3.8.8, V1-5.1.2 | **SLR2-06** |
| 56 | `stepProfile`'s readers | V01 §1b ↔ V04 §3.5.5 | **SLR2-13** |
| 57 | `AccessPoint.cause` and `excavation` read by volume 1 | V04 §1b.1, §2.6 ↔ V01 V1-3.7.1, V1-2.3 | **SLR2-15** |
| 58 | `terraceState` on an island | V01 V1-3.17.7 (2) ↔ V05 §3.8 (3), §3.22 (4) | **SLR2-10** |

## 3 New findings

### SLR2-01 — major — owner V01 — the island's unit run after generation has no caller, slot or scope

**Claim.** V05 runs volume 1's unit runner after generation in four places:
- `raiseIsland` at an epoch — "its districts laid by the unit run at the epoch" (V5 §3.15 (5));
- a T5 `sky` declaration after generation — "V5 §3.8–§3.14 then run on the new island" (V5 §4.2), §3.12 being the unit run;
- New random on an island — "the terrain, the underside …, the river and the fabric re-derived" (V5 §4.2; V5 §6's row "SKY plus its unit run");
- a resize that grows the island and a rim reshape — "the unit run lays it by a scoped regeneration of the new faces" and "the faces touching the moved rim re-derived by the unit run's scoped regeneration" (V5 §4.2); V5 §2.3 names "generation, `raiseIsland`, a scoped regeneration of the island".

Volume 1 defines the unit run at generation only. V1-3.10 says "Two callers exist" (the standalone document and SKY), and
V1-3.10.3 runs it "on the generation worker, after the ground's S10 (0), beside the hinterland unit". V1-6's sky row prices
a "re-derivation" but no text says where it runs or what it re-derives. The unit runner has no scoped mode. It always
re-partitions the whole island (`k` districts by the bent cut), so it cannot "lay the new faces" of a resize without
re-cutting every district. A builder of V05's resize, rim reshape, epoch raise or late declaration finds no V01 entry to
call. Grep: "unit run" occurs 0 times in V06 and V09.

**Required change.** V01 adds **V1-3.10.3 (6) "After generation"**:
- (a) Callers. V05's `raiseIsland` (the epoch participant `sky.islands` at an epoch; a T5 `sky` declaration's conversion) and New random on an island (`regenerate` with the island's scope) run steps 1–5 inside the calling commit, on the island's own overlay, reading both arenas' placed plots (as step 4 already says for epochs and post-build requests). Re-derive from S7b or SKY runs them at generation's slot.
- (b) Carry-over. A run over an island that already holds content re-derives it with §6.3's carry-over. Locked, pinned, declared and dossier-backed entities and V1-3.5.12's fixed inputs are kept as holes; the successions go to `SeamReport.superseded`.
- (c) Faces added or re-shaped at the rim. The faces a growing resize adds, or a rim reshape moves, are **not** a unit run. They join the district of the nearest rim stretch (V05 §4.2) and are re-derived by that district's scoped re-derivation from S8 under its committed fabric: §7.3's district scope, V1-3.9's `keep` path, the rim strip re-laid by SKY first.
- V1-3.10's "Two callers exist" reads "Two callers exist at generation; V1-3.10.3 (6) names those after it".
- V1-6's sky row cites (6).

T-V1-21 adds: "an island raised at an epoch and one declared after generation each get their districts in the raising
commit, the ground byte-identical; a growing resize re-derives only the district that receives the new faces".

### SLR2-02 — minor — owner V05 — the resize and the rim reshape name a "scoped regeneration" of the unit run

**Claim.** V5 §2.3 lists "a scoped regeneration of the island" among the unit runner's runs. V5 §4.2's resize bullet reads
"the unit run lays it by a scoped regeneration of the new faces". Its rim-reshape bullet reads "re-derived by the unit
run's scoped regeneration". No volume defines such a mode of the unit runner (SLR2-01).

**Required change.** V5 §2.3's list reads "(generation, `raiseIsland`, New random on the island; V01 V1-3.10.3 (6))". Both
§4.2 bullets read "re-derived by the receiving district's scoped re-derivation from S8 (V01 V1-3.10.3 (6) (c))". V5 §6's
"a resize, a rim reshape" row already prices §12.6's scoped regeneration and stands.

### SLR2-03 — major — owner V05 — S7b (1) reads the sky pseudo-district at a landing foot that SKY has not yet sited

**Claim.** V5 §3.20 (12) (b) and BCR-V5-16's last sentence place the sky pseudo-district in S7b (1)'s district supply
term (item 105 (g)) "as one consumer location at its **main landing's foot**". The foot does not exist at S7b (1):
- V5 §3.1 runs S7b (5) — gate, slots, reasons, fills, outline and placement — "before S7b (6) and (1)";
- the access tops and feet are sited only at **SKY**, "after S7b" (V5 §3.1's SKY row, V5 §3.10).

Volume 1's χ̃ reads that term's bindings at S7c, inside S7b (1). V1-3.2 (5): "S7b (1)'s district supply term … binds the
anchor's allocation to the nearest district, by centroid distance". So a ground anchor with a carried provider class
binds to a sky pseudo-district whose location V05 names and cannot yet supply. V01 reads a centroid; V05 names a foot. A
builder of S7b (1)'s term has no point to read.

**Required change.** V5 §3.20 (12) (b) and BCR-V5-16's S7b (1) sentence read: "a sky pseudo-district is one consumer
location at its island's land centroid's world point (`anchor` + the outline's centroid, fixed by S7b (5)'s placement) —
the proxy the ground pool reads for an island's classes, V5 §3.20 (1) — since the landing feet are sited only at SKY,
after S7b". The clause "so the ground district by the main hoist gains a little supplier affinity" reads "the ground
districts beneath and beside the island …". Volume 1's centroid distance then reads the same point. V1-3.2 (5) adds "(a
sky pseudo-district at its island's land centroid, V05 §3.20 (12) (b))" — V01 wording, cited here.

### SLR2-04 — major — owner V01 — the island river's crossing sites are never used, so no island bridge is ever built

**Claim.** V05 gives an island river crossing sites. V5 §3.8 (4): "Its crossing sites are §4.2 S1 (5)'s, on the island;
a bridge there may carry deck plots". V5 §3.12's unit-run contract says the unit run must "use the river's crossing sites".
V5 §3.16 (7) and §3.22 (6) then fall the island bridges' deck plots with the island.

The base builds a site into a bridge "only when a way uses it", and only S4 or S5 route a way through a site's two deck
ends: "a site no way uses by the end of S5 stays a `site`" (§4.2 S1 (5)). A unit run has no S4 or S5. Volume 1's sky unit
run never mentions the sites:
- V1-3.10.3 lists "the river" among its inputs and does nothing with it;
- V1-3.4.8 says a sky run's only portals are the landings' attaches;
- `bridgePortal` and the bridgehead rows read part-0 decks only (V1-2.3's parts table).

So every island crossing site stays a `site`. V05's island bridges, their deck plots and their landfall fates never occur,
and the contract line has no consumer.

**Required change.** V1-3.10.3 (4) adds, before the seeds and after the landings' destination lanes: "**Crossing sites**
(V05 §3.8 (4); §4.2 S1 (5)). For each island crossing site whose two banks both border the island's built land, S8 lays
one `secondary` way, at `w_tpl`, from the nearest spine or seed on one bank through the site's two deck ends to the
nearest on the other. The span is its own L1 edge with the `deck` role, so the site becomes a built `Bridge` by §4.2 S1
(5)'s rule. Sites are laid in site order, and the way ranks as a bridge portal pair (+1) for the seeds. A site that
F-TEMPLATE's ladder cannot reach stays a `site`, reported."
- V1-2.3's parts table gains the line "on a sky arena, the island's own decks over its conjured river read as part-0 decks over water".
- T-V1-21 adds: "every island crossing site whose banks both border built land is a built bridge".

### SLR2-05 — major — owner V01 — a hood document's S7b makes no void-dwelling allocation, though V04's hood line forecasts one and runs F6

**Claim.** V04's hood line runs U-FORECAST at the hood's S7b. It reads `Recipe.product` "in U-FORECAST at S7b". P5 and P7
forecast "a ruin, a cavern and the one catacomb" (V4 §3.1, §3.3). The tail then runs **T3's F6**, which "places up to
`voidDwellings.maxHouseholds` households of F6's allocation (S7b (6)'s void part, BCR-19)" (V4 §3.4 F6). That allocation is
S7b (6) (d), which BCR-19 makes "at every rung".

Volume 1's hood S7b is its own one-district allocation (V1-3.10.1 step 6): "S7b: the one-district allocation (3)
persisted as the district's `Allocation`, its claims … cut by `claimSubFace`, S7c inside it". It names neither S7b
(6)–(7) nor V04's forecast. As written, U-FORECAST is never called in a hood document, P7 has no reader there, and F6
seats nobody in an accessible cave under a lone neighbourhood. V01's own promise — "a cave or ruin may lie under it" (§0),
with access "by (j) (3) over the hood's buildings" (V1-3.10.1 (7)) — is thus left without its dwellers. That contradicts
the owner's rule that dwellings come once an access exists, at any tier.

**Required change.** V1-3.10.1 step 6's S7b adds: "then S7b (6) and (7) as the base runs them, with volume 4's forecast
(V04 §3.3; BCR-19) at the hood's `contextRung`. With `Features.sewers` false and the undercity `forbid` (step 7), only (6)
(d)'s void-dwelling part can allocate: P7's `voidDwellingHouseholds` of the poorest band, capped at `forecastSafety`,
taken from the one-district allocation's households and placed below by V04's T3 F6." T-V1-20 adds: "on a
forced-cavern hood whose cave an access reaches, F6 dwellings present and the population whole".

### SLR2-06 — major — owner V01 — the surface access symbol's state forms contradict the base's `states` row and omit the stored `locked` and `bricked`

**Claim.** The base's §8.2 `states` row for `access` covers "the ground layer where it breaks the surface, and the
underground layer". Its forms are: "the kind's `symbol` / with a bar / filled solid in `wall` / as a trace with rubble
stipple" for `open` / `locked` / `bricked` / collapsed. A sealed element makes its access *read* `bricked` (II.7.4).

Volume 1 draws the surface symbol "in its closed form when its element is closed (sealed, collapsed)" (V1-3.8.8), namely
"with a bar across (sealed) or filled with rubble stipple (collapsed)" (V1-5.1.2). So V01 draws:
- a sealed element with the base's `locked` bar, not the base's `bricked` fill;
- no form at all for a stored `locked` access;
- no form at all for a stored `bricked` one: a host's use turned to a class with access 0, a street stair re-hosted onto excluded ground, and the landfall's closure (V4 §3.10, cause `convert:fallIsland`).

V4 §3.10 states that "a state change (`bricked`, `locked`, the landfall closure) changes the place's symbol". Volume 1's
program has no such change. Its surface and V04's underground end (§8.2's rows, V4 §5.2) therefore disagree on one access.

**Required change.** V1-3.8.8's clause reads: "drawn in the form §8.2's access `states` row gives its state — its stored
`state` (`locked` with a bar; `bricked` filled solid in `wall`, the landfall's closure and a host's closure included), or
the derived reading while its element is closed (sealed → `bricked`; collapsed as a trace with rubble stipple)". V1-5.1.2's
sentence "A closed element (sealed, collapsed) draws the symbol with a bar across (sealed) or filled with rubble stipple
(collapsed)" is replaced by "Its state form is §8.2's access row (V1-3.8.8)". T-V1-46 adds: "a landfall-bricked grating
and a locked lifeline stair each draw their §8.2 form on the surface and underground alike".

### SLR2-07 — minor — owner V05 — `shadeSky`'s readers stop at the context vector (SLR1-06's V05 half; V01 note (23))

**Claim.** V01 now makes every shade reader on a sky arena read V05's `shadeSky` (V1-2.3, V1-3.5.5, V1-3.8.2; J-V1.87):
S7c's `shade` term through `DistrictContext.shade.meanShare`, S9b's manor sun factor, the hood pins' gate and
`shade.islandShare`. V01's cross-volume note (23) asks V05 §1b's `shadeSky` row to list them. V05 landed at 04:44, two
minutes before V01, and its row still reads only "the sky arena's context vector (`prosperity`)" (V5 §1b). V5 §2.6's
"`IslandShadeStrip` onto an island; the sky receivers' `shadeSky`" row reads "that island's context vector" alone.

**Required change.** V5 §1b's `shadeSky` row and V5 §2.6's row add to their readers: "volume 1's sky-arena readers — S7c's
`shade` term (through `DistrictContext.shade.meanShare`), S9b's manor sun factor, the close-up hood pins' shade gate and
`DistrictContext.shade.islandShare` (V01 V1-2.3, V1-3.5.5, V1-3.8.2; J-V1.87)". V5 §2.3a's sentence "Nothing reads a
strip's bits except …" adds "on an island, the same readers through `shadeSky`".

### SLR2-08 — minor — owner V04 — two commits that make or remove public openings do not run the opening pass

**Claim.** Volume 1's opening place "lives exactly as long as its host `AccessPoint`" (V1-2.7). V4 §3.10 runs the opening
pass "inside every commit that creates, removes or re-kinds an access it selects". It lists T6, the scoped `AccessPass.run`,
`CatacombGrowth.grow` founding a complex, and three edits (a `delete` of such an access, a `setAttr` of its `kind` or
`role`, a public-opening `placeAccess`). V4 §4.3's row, T-V4-74 (b) and V01's V1-2.7 row carry the same list.

Two commits are missing:
- A `regenerate` (New random) on a cavern or ruin system re-draws its plan (V4 §4.3's regenerate row; V4 §2.6's `RuinRecord` row: "a New random on the ruin system re-draws culture, axis and plan"). Its opening candidates move with the plan and their elements' lineages change. That row names neither U-ACCESS (e) nor the pass, so the old openings' places are orphaned and the new openings get none.
- A `delete` of the element that carries an opening (a cavern chamber with its sinkhole, a ruin gate with its entrance) removes the access as a fate, but the list names only "a `delete` of such an access".

The 1b row of V01 for `HoodPlace` still says its producer is "the underground tail's opening pass" alone.

**Required change.** V4 §3.10's bullet, §1b.2's opening-pass row and §4.3 add: "a `regenerate` of a `cavern` or `ruin`
system (U-ACCESS (e) re-run over the regenerated elements' candidates, their keys by the new elements' lineages, then the
pass over the openings made and removed), and the `delete` of an element that carries a selected access (the access
removed as a fate, its place tombstoned)". §4.3's regenerate row adds "and volume 1's opening pass over the openings the
new plan makes or removes". T-V4-74 (b) adds the regenerate and element-delete cases. V01's V1-2.7 row and its 1b
`HoodPlace` row read "the opening pass, run in the commits V04 §3.10 names" (V01 wording, cited here).

### SLR2-09 — minor — owner V01 — `skyDistrictCount` names the fill's stop among its callers

**Claim.** V1-3.16 lists the service's callers as "the unit runner (V1-3.10.3 (2)), volume 5's hand-over (V05 §2.3), its
coverage units (V05 §3.5 (3)'s k) and its fill's stop (V05 §3.12 (7))". The fill's stop does not call the count. It reads
`plotShare · A` directly (V5 §3.5 (2)), and V5 §3.12 item 7 is the district-count reconciliation item. §1b's row and
J-V1.88 list the callers correctly.

**Required change.** V1-3.16's list drops "and its fill's stop (V05 §3.12 (7))" and adds "V05's fill and coverage overshoot
read the same `sky.plotShare` cell (V05 §3.5 (2)–(3)), not the count".

### SLR2-10 — minor — owner V01 — the relief class `terraceState` reads on an `echo` or `none` island is undefined

**Claim.** `terraceState(D).asks` reads "the relief rows' `terracedEdges` cell at the site's relief class" (V1-2.3). For an
island, V1-3.17.7 (2) says the unit run "reads `terraceState` at the island's own relief class (V05's `own` relief)". But
V05's default island terrain is `echo`, "§4.2 S1 (1)'s fBm at the ground's relief class with its amplitude ×
`amplitudeShare`" (0.25), and `none` has no relief (V5 §3.8 (3)). V5 §3.22 (4) says levelling "bite[s] mainly on an `own`
relief of a steep class; a terraced edge is laid only where the island's own relief class asks for terraces". Neither
volume says what class an `echo` or `none` island has. Read literally ("the site's"), an echo island over a mountain town
asks for terraces at a quarter of the relief, contrary to V05's intent.

**Required change.** V1-3.17.7 (2) reads: "the island's relief class for `terraceState` is its drawn class where
`terrainEcho.relief` is `own`, and `plain` where it is `echo` or `none` (the echo's quarter amplitude and the dome are no
terracing relief; V05 §3.8 (3), §3.22 (4))". V5 §3.22 (4) cites it — V05 wording, cited here.

### SLR2-11 — minor — owner V05 — stale refusal words survive in the island's tests and decisions

**Claim.** J-VI.4 (g) and V5 §3.22 (4) and §4.2 bend a retaining stroke on or along the rim inward, with the line "The rim
walk stays level; the wall stands inside it". Stale texts remain:
- T-V5-27: "a retaining stroke on the rim strip or along the rim is refused with 'The rim walk stays level; the drop is the edge'"; also "a stroke along the rim away from a landing is refused with 'the drop is the wall here'".
- J-V5.69: "refused with …".
- §13 item 11: asks volume 9 to "refuse" such strokes.
- T-V5-8: "an aqueduct stroke to a rim and a `raised` or aqueduct stroke on an island's key are refused with their words".
- T-V5-16: "a fourth island is refused".

IN-V05-1 says those tests "read 'bent, with its line'". The quoted words, however, differ from the bend's words, so a
builder asserting T-V5-27's string checks the wrong message. The rim walk and the island's levelling are volume 1's unit
run (V1-3.17.7 (2)).

**Required change.** T-V5-27, J-V5.69 and §13 item 11 read "bent inward past the rim walk with 'The rim walk stays level;
the wall stands inside it' (J-VI.4 (g))", and T-V5-27's rim-stroke clause reads "bent to the landing stretches with 'the
drop is the wall here'". T-V5-8 reads "bent (J-VI.4 (d)–(f)), each with its line". T-V5-16 reads "a fourth island is bent
to join the nearest island (J-VI.4 (a))".

### SLR2-12 — minor — owner V05 — BCR-V5-30's reader list omits volume 4's two new readers of levelled heights

**Claim.** BCR-V5-30 names `levelledGroundCm` "the one reader of levelled heights" and lists its readers. V5 §1b's row
repeats the list. Volume 4's round 2 added two readers the list lacks:
- the buried town's floor, laid "`levelledGroundCm` (BCR-V5-30) read on the region's last live state" (V4 §3.5.5; TR-11);
- the village working's depth test, "below `levelledGroundCm` at the plot's centroid" (V4 §3.5.7 (a); TR-12).

A builder auditing the one-reader rule against the list flags both as violations. File f item 309 cites the BCR's list.

**Required change.** BCR-V5-30's readers and V5 §1b's row add "volume 4's buried floor under a raised grade (V04 §3.5.5)
and its village working's depth test (V04 §3.5.7 (a))".

### SLR2-13 — minor — owner V01 — `stepProfile`'s wiring row is stale on both ends

**Claim.** V01's §1b row for `stepProfile(wall)` lists as consumers "S14's wall shadow; GeoJSON's `stepCm`; the VTT
threshold (BCR-40); the replace dry run's notice (V1-3.9); the wall why provider". Two faults:
- Volume 4's buried town now reads the profile. Each tombstoned wall is "a step in the buried floor … the step being the wall's `stepProfile` (volume 1's BCR-43) on that last live state" (V4 §3.5.5; TR-11). The row omits it, and so does BCR-43's reader sentence ("§8's shadow, §11.1's exports and the VTT threshold read the view").
- GeoJSON carries no `stepCm`. File f item 447 gives a `retaining` LineString `stepMinCm` and `stepMaxCm`. V1-5.3 says a wall's step "reaches GeoJSON only as that item's step bounds", and T-V1-33 bars "0 `stepCm` arrays".

**Required change.** V01 §1b's row reads "S14's wall shadow; file f item 447's `stepMinCm` and `stepMaxCm`; the VTT
threshold (BCR-40); the replace dry run's notice (V1-3.9); the wall why provider; volume 4's buried floor under a raised
grade (V04 §3.5.5)". BCR-43's last sentence adds "and volume 4's buried floor (V04 §3.5.5)".

### SLR2-14 — minor — owner V01 — the lone neighbourhood's tail is restated from V04 and differs from it

**Claim.** V1-3.10.1 (7) restates V04's hood line instead of citing it, and the copies differ:
- The tail set: "T2's ruin and cavern (with the arch vaults and terminal cistern that follow a declared raised way), T2b, T3's F6, T5's L3, L5 and L7, T6, T8". V04 adds T7 on show.
- The catacomb candidates: V01 says "its temple's churchyard, a burial ground an anchor brings". V04 names (1) (a)–(d) inside the hood's outline, a monastery's burial yard included (V4 §3.1).
- V01 §0 says a lone neighbourhood has "no old quarry, vaults or buried older town". V04 lays a declared raised way's arch vaults and terminal cistern in a hood.

The rule is V04's (J-V4.105). V01's own decision is only which inputs S0 writes (J-V1.77).

**Required change.** V1-3.10.1 (7)'s "the rest of the tail" and "catacombs" bullets read: "the rest of the tail and the one
catacomb are V04 §3.1's hood line (J-V4.105), cited, never restated; its decision here is the absence of quarries, the
generated vaults and the buried town (J-V1.77)". §0's sentence reads "no old quarry, no generated vaults and no buried older
town".

### SLR2-15 — minor — owner V04 — V04's consumer lists omit two reads volume 1 makes, and V01's `under.access` names no producer

**Claim.** Two gaps on V04's side:
- V01 selects a catacomb entrance's place by `AccessPoint.cause.system` ("whose `cause.system` is a `catacomb` system", V1-3.7.1). V4 §1b.1's `AccessPoint.cause` row lists its readers as "the excavation reading, V10's why, V12's `void.*`, V03's access head, GeoJSON", and §2.6's read cell likewise. Neither names volume 1's opening pass.
- V01's `DistrictContext.under[].access` flag is "per item 109 (j) (3)" (V1-2.3). It names neither V04's `excavation(cluster)` reading (V4 §3.5.7 (g)), which is what decides a cavern or ruin element's access, nor any other producer. V4 §1b.1's `excavation` row does not list `DistrictContext.under` among its readers.

**Required change.** V4 §1b.1's `AccessPoint.cause` row and §2.6's read cell add "volume 1's opening pass (a catacomb
entrance selected by `cause.system`, V1-3.7.1)". V4 §1b.1's `excavation(cluster)` row adds "volume 1's
`DistrictContext.under[].access` (V1-2.3)". V1-2.3's `under` comment reads "`access` — the element's cluster's
`excavation` reading is `accessible` (V04 §3.5.7 (g)); a quarry or catacomb element always true" (V01 wording, cited
here).

## 4 Disposition summary by owning volume

| owner | blocker | major | minor | findings |
|---|---|---|---|---|
| V01 | 0 | 4 | 4 | SLR2-01, SLR2-04, SLR2-05, SLR2-06; SLR2-09, SLR2-10, SLR2-13, SLR2-14 (plus the V01 wording halves cited inside SLR2-03, SLR2-08 and SLR2-15) |
| V05 | 0 | 1 | 4 | SLR2-03; SLR2-02, SLR2-07, SLR2-11, SLR2-12 |
| V04 | 0 | 0 | 2 | SLR2-08, SLR2-15 |
| BASE-F | 0 | 0 | 0 | — (item 309 cites BCR-V5-30's list, which SLR2-12 corrects at its source) |
| **total** | **0** | **5** | **10** | 15 |

**What held.** Every round-1 issue is closed but one counterpart row (SLR1-06's V05 half, now SLR2-07). The seam's
records now agree on both sides:
- the hood line and its single reader of `Recipe.product`;
- the opening pass at generation, at an epoch and in the listed edits;
- M6-U's wait on V01's W15 services, gated by the registry;
- the sky layer's exclusion from the underground, with the island churches counted once;
- the landfall's rubble quarry told apart from the surface quarry;
- `levelledGroundCm` read by name in V01 and V04;
- `shadeSky` on every V01 reader on a sky arena;
- one plot share and one district count (`skyDistrictCount`);
- S9b's declared landing keys;
- the island unit run's cross-arena pulls;
- the `ruin.node` line's reader;
- the rim walk's planting;
- file f's needed-by lists, with no line pointers left.

**What this round found.** Four pieces are exercised only after generation or away from the town pipeline, and each has
a producer or a consumer missing:
- the island's unit run after generation (SLR2-01, -02);
- the sky pseudo-district in S7b (1)'s supply term, which reads a landing foot before SKY sites it (SLR2-03);
- the island river's crossing sites (SLR2-04);
- a lone neighbourhood's void-dwelling allocation (SLR2-05).

The fifth major (SLR2-06) is a direct contradiction with the base's `states` row for accesses. The minors are counterpart
rows, stale test words and reader lists that round 2's new mechanisms outgrew.

**CONFIRMED versus PLAUSIBLE.** CONFIRMED by reading the three volumes whole at the md5s of §0, with whole-file greps for
every absence claimed: every status in §1 (each round-1 phrase gone, "sewer-front pseudo" 0 hits, `catacomb.churchesPer`
only in V05's note, `levelledGroundCm` 15 / 5 / 8 hits in V04 / V01 / V05); every quoted sentence in §3; "unit run" 0 hits
in V06 and V09 (SLR2-01); V5 §3.1's order, which puts S7b (5) before S7b (1) and the access feet at SKY (SLR2-03); the base's
§4.2 S1 (5), which builds a site into a bridge only when S4 or S5 route a way through it (SLR2-04); the base's §8.2
`states` row for `access` (SLR2-06). PLAUSIBLE, by reasoning rather than execution:
- SLR2-01's claim that a builder would otherwise call the whole-island unit runner for a resize, re-cutting every district;
- SLR2-04's consequence, that no island bridge is ever built, since nothing else routes a way through an island site;
- SLR2-05's consequence, that F6 seats nobody in a hood;
- SLR2-10's reading that an `echo` island would otherwise read the ground's relief class.

The required changes' design choices are PLAUSIBLE proposals for the owning lanes: the land-centroid proxy of SLR2-03, the
crossing-site way of SLR2-04, `plain` for an echo island in SLR2-10.
