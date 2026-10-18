# Seam check: the underground (V04) and the sky (V05) against the neighbourhoods they carry or shadow (V01) — round 1

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-layers-r1; covered by the whole-design retrovalidation (J84).

PROGRESS
- §0 Method and inputs (files, md5, lines) | done
- §1 Re-check of round 0's SL-01..35 (each: FIXED / PARTLY / NOT FIXED, with the text now) | done
- §2 Seam census, round 1 (every piece crossing V04/V05 <-> V01 and the base sections they share) | done
- §3 New findings (SLR1-01 onward), severity, owner, required change | done
- §4 Disposition summary by owning volume; CONFIRMED versus PLAUSIBLE | done

## 0 Method and inputs

Lane `volumes/seam-layers-r1`, 2026-09-29, reconciliation round 1. Inputs at these md5s: `docs/volumes/V04-underground.md`
(3 372 lines, md5 78e40951…, as `reconcile-V04-r1` landed it), `docs/volumes/V05-sky.md` (3 303 lines, 25b0b541…, as
`reconcile-V05-r1` landed it), `docs/volumes/V01-neighbourhoods.md` (3 571 lines, 8b8a40eb…, as `reconcile-V01-r1` landed
it), `docs/volumes/_integrate.md` (365 lines, 1487de32…), `docs/AMENDMENTS-2026-09-28f.md` (1 076 lines, 40e2f8d6…, as
`reconcile-BASE-F-r1` landed it), `docs/volumes/critique/seam-layers-r0.md` (542 lines, f76a6a69…, read whole first).
The base (`docs/ARCHITECTURE.md`, md5 01fea21f…, unchanged) was read where a seam cites it (II.7.3's pseudo-district,
§4.5 S7b (6)); file g (3e7f674d…) was cited through the volumes.

**What was read.** V04: §0–§8, §11–§13 and both notes line by line; §9 by a seam-term grep, the matching rows read whole
(J-V4.19–25, 34, 39–40, 51, 53, 59, 63, 76, 79, 95–104); §10's BCR-1–31 and BCR-36–46 read whole (BCR-32–35 by heading).
V05: §0–§6 line by line; §7 by grep with T-V5-9, T-V5-32 read whole; §9's J-V5.26, 28, 41, 45, 70–72; §10's BCR-V5-3, -6,
-15, -20, -26, -30 whole (the rest by heading); §13 and both notes whole. V01: §0–§4 and §5.2–§6 line by line; §5.1.2
by grep; §7's seam rows (T-V1-15, 17, 20, 21, 33, 35, 39, 42, 45–47) whole; §8's W8, W15 and risk list; §10's BCR-2, -10,
-36, -37, -43 and the round-1 cross-volume notes whole; §13 and both notes whole. File f: its header and rules R-a–R-d,
items 207, 208, 213, 244–248, 282, 309, 325, 414, 447, 448, 539, 554, 560–564 and its round-1 table. `_integrate.md`:
§2.3 whole, the rest by seam grep. Every absence claimed below is a grep over the whole file. The analysis ran past the
brief's ~300k-token checkpoint before this file was written; the reads were finished first so no section is open.

**Method.** Round 0's 35 issues were re-checked against the text now (§1), counting a fix only when both sides of the
seam carry it; the siblings' round-1 hand-offs (V04 §13, V05 §13 items 18–20, V01 §10's notes (16)–(22)) were checked in
the receiving volume. Then every piece crossing the seam was traced again both ways (§2), since the four round-1 lanes
landed within nine minutes of each other (V05 03:34, V04 03:39, BASE-F 03:39, V01 03:43) and none could read the others'
last edits. Severity as round 0: *blocker* — cannot be scheduled or built; *major* — a contradiction or an unwired piece a
builder would hit; *minor* — wording, a citation, a single-source slip.

## 1 Re-check of round 0's issues

| id | r0 sev. | owner | status | where it stands now |
|---|---|---|---|---|
| SL-01 | blocker | V05 | **FIXED** | V5 §3.1: SKY after S7b (its S7c hook included), before S12a, S8, S10a; own keys `reservations.landing`, `allocations.landing` (BCR-V5-3, -6; J-V5.70; T-V5-32); V01's S7c reads `reservations` (S3) only. The cycle is gone. Residual clause on V01's S9b → SLR1-03 |
| SL-02 | major | V05 | **FIXED** | V5 §2.3a's reader list, §1b, §3.1's S10a row, §3.19 (6): strips computed once per evaluation at first read, bases at S10a's start (J-V5.71; T-V5-21 (h)). Wording residual in V01 → SLR1-10 |
| SL-03 | major | V04 | **PARTLY** | V04 FIXED: `ruinCentre()` has no V05 consumer; the `ruin.node` line is produced by T6 (V4 §3.5.0a (9), §1b.1, T-V4-74 (d)). V05 §3.3 and §4.5 still read "the deposit's report entry" → **SLR1-02** |
| SL-04 | major | V04 | **FIXED** | V4 §3.5.1 (3), §1b.5, T-V4-50, the BCR-36 paragraph: island churches counted once, no sky face a candidate |
| SL-05 | major | V04 | **FIXED** | V4 §1.2's sky paragraph, N1's `R`, §3.5.7 (c), L3, §4.1's points forms (J-V4.101; T-V4-71) |
| SL-06 | major | V04 | **FIXED** | V4 §3.1's paragraph and T6 row, §3.7a, BCR-5, §1b.2, J-V4.102, T-V4-74 (b). New aspects of the same pass (its epoch and edit callers; its package) → SLR1-04, SLR1-05 |
| SL-07 | major | V01 | **FIXED** | V1-3.7.1 selects by `source: 'opening'` + `role: 'access'` and a catacomb system's `stair`; file f item 554's clause; T-V1-46. V04 does not write the role it selects on → SLR1-20 |
| SL-08 | major | V04 | **FIXED** | V4 §5.2 (7), §5.1's last sentence, J-V4.96, T-V4-74 (c) |
| SL-09 | major | V01 | **PARTLY** | V01 FIXED (V1-3.16 states no rule of its own; `districtsAbove(part, core)[0]`; T-V1-46). V04 §3.6 C5 does not name the call, §1b.2 does not list it (V01 note (17) unapplied) → **SLR1-07** |
| SL-10 | major | V01 | **FIXED** | V1-3.11 (6): a sky unit run reports `portalsTotal` 0, landings in `SeamReport.landingsReached` (BCR-2 (e)); agrees with T-V5-9 |
| SL-11 | major | V01 | **FIXED** | `NeighbourhoodResult.districts` (V1-2.4; BCR-2 (a); T-V1-21). V05's lifecycle row names the wrong writer → SLR1-24 |
| SL-12 | major | V01 | **PARTLY** | V01 FIXED (V1-3.10.3 (4), BCR-10 (c), T-V1-21). V05 §3.12 still reads "the rim walk's path" (V01 note (19) unapplied) → **SLR1-08** |
| SL-13 | major | V01 | **FIXED** | V1-2.4: `seam`, `context`, `params`, `closeup` absent for a unit run; V1-3.10's runner builds them after the partition |
| SL-14 | major | V01 | **FIXED** | V1-3.9, V1-4.1, V1-4.3, T-V1-17 add the cross-arena consequences. V1-3.9 restates the two rows → SLR1-22 |
| SL-15 | major | V04 | **FIXED** | V4 §1.2 defines public ground once; N11, F5, L1, `placeAccess`, the forced vaults, the terminal cistern, §3.5.5, `OpeningRow` cite it (J-V4.100; T-V4-74 (a)) |
| SL-16 | major | V04 | **FIXED** | V4 §5.3, BCR-38, file f item 414: the render's shadow term only |
| SL-17 | major | BASE-F | **FIXED** | file f item 560 (merged), item 564 a pointer; V01's "surface head" |
| SL-18 | major | BASE-F | **FIXED** | file f items 208 → 207 → 209 with 207's comment naming `wayFall` |
| SL-19 | major | V01 | **PARTLY** | V01 FIXED its side (V1-3.10.1 (7) through inputs; T-V1-20). V04 has no line and no input for the hood's tail set (V01 note (16) unapplied) → **SLR1-01** |
| SL-20 | major | V01 | **FIXED** | V1-5.3's GeoJSON row cites file f item 447; T-V1-33 |
| SL-21 | minor | V01 | **FIXED** | V1-2.3, V1-1b: `under` and `islandShare` read post-generation only |
| SL-22 | minor | V04 | **PARTLY** | V04 FIXED (§1.3, J-V4.97: ships none). V01 still says "volume 4 fills them" in four places → **SLR1-09** |
| SL-23 | minor | V01 | **FIXED** | `FabricSignature` returns V12's town-side measures (V1-2.3, V1-3.16); V04 §3.5.0a (7) reads them |
| SL-24 | minor | V01 | **FIXED** | V1-5.1.2 and V1-3.8.8: `stair`, `ladder`, `hatch`; an arch vault's `door` takes none |
| SL-25 | minor | V01 | **FIXED** | V1-3.16: `underDistance` on underground arenas, the island one walk unit (T-V1-42). Term residual → SLR1-19 |
| SL-26 | minor | V05 | **PARTLY** | V05 FIXED (BCR-V5-30 names `levelledGroundCm` and its readers). V04 and V01 never cite it; file f item 309 lists V05 only → **SLR1-16, SLR1-17, SLR1-18** |
| SL-27 | minor | V05 | **PARTLY** | the count cites `sky.plotShare`; the fill and overshoot keep `0.62 · A`; V01's own formula writes 0.62 and cites V05 → **SLR1-11, SLR1-12** |
| SL-28 | minor | V01 | **FIXED** | BCR-30 (b), V1-3.6 (7), V1-3.11 (4): J-VI.3's six, `sheer` none (T-V1-45) |
| SL-29 | minor | V01 | **FIXED** | V1-3.3.3's κ reads a `sky-*` kind's ground counterpart (T-V1-21) |
| SL-30 | minor | V04 | **FIXED** | V4 §3.10's access closures: `convert:fallIsland`, restored with the host (T-V4-73 (c)) |
| SL-31 | minor | V04 | **FIXED** | V4 §3.5.4 (d) (2), §2.6, §3.10, T-V4-62 read the stored `ruined` / `cleared` states |
| SL-32 | minor | V01 | **FIXED** | V1-3.4.2 (a): the ground landing's destination lane laid before the seeds (T-V1-21) |
| SL-33 | minor | V05 | **FIXED** | V5 §5.5: item 447's `retaining` LineStrings plus `elevationM` |
| SL-34 | minor | V01 | **FIXED** | V1-6's sky-island row carries the generation line; V5 §6 cites "volume 1's rate" |
| SL-35 | minor | V05 | **FIXED** | J-V5.28 and §8 read "seven" |

**Totals.** 28 FIXED, 7 PARTLY, 0 NOT FIXED. Every PARTLY is the half a sibling's round-1 note asked of a volume whose
lane had already landed (the notes were written after the receiving lane's LANDED line); each is re-raised in §3 as an
issue of the volume that must carry it.

## 2 Seam census, round 1

Round 0's 40 pieces with their state now, then the pieces this round found or that round 1 created.

| # | seam piece | producer ↔ consumer | state |
|---|---|---|---|
| 1 | SKY's slot in the stage graph | V05 §3.1 ↔ V01 §3.1 | consistent (SL-01 fixed) |
| 2 | island strips onto the ground | V05 §2.3a, §3.19 (6) ↔ V01 S9b, pins, `islandShare` | consistent; wording SLR1-10 |
| 3 | `SkyHandover` and the `sky` request | V05 §2.3 ↔ V01 V1-2.4 | consistent (SL-13) |
| 4 | the rim walk | V01 V1-3.10.3 (4) ↔ V05 §3.12 | **SLR1-08** |
| 5 | `portalsTotal`, `landingsReached` | V01 V1-3.11 (6) ↔ V05 T-V5-9 | consistent |
| 6 | island district kinds, fabric prior, district count | V05 §2.4, §3.12 ↔ V01 V1-3.10.3 | **SLR1-11, SLR1-12** |
| 7 | island retaining walls | V01 V1-3.17.7 (2) ↔ V05 §3.22 (4) | consistent; stale "refuses" SLR1-13 |
| 8 | levelled ground as a reader | BCR-V5-30 ↔ V04 N6–N7, §3.5.0, §3.5.4, BCR-45; V01 `stepProfile` | **SLR1-16, SLR1-17, SLR1-18** |
| 9 | `ruinCentre()`, the `ruin.node` line | V04 §3.5.0a (9) ↔ V05 §3.3, §4.5 | **SLR1-02** |
| 10 | catacomb count with island churches | V04 §3.5.1 (3) ↔ V05 §1.3, §3.5 (3) | consistent; id SLR1-23 |
| 11 | the sky layer never read | V04 §1.2 ↔ V05 §1.3, T-V5-26 | consistent |
| 12 | burial faces on islands skipped | V04 §3.5.1 (1) ↔ V05 §3.5 (3) | consistent; citation in SLR1-07 |
| 13 | arch vaults under a ruined span | V05 §3.16 (4) ↔ V04 §3.5.4 (d) (2) | consistent |
| 14 | ground accesses under a landfall | V05 §3.16 ↔ V04 §3.10 | consistent |
| 15 | light at shafts under an island | V05 §5.3 (1) ↔ V04 §5.3, BCR-38 | consistent |
| 16 | the opening pass at generation | V01 V1-3.7.1 ↔ V04 T6 | consistent (SL-06, SL-07) |
| 17 | ground access symbols, one visibility rule | V01 V1-3.8.8 ↔ V04 §5.2 (7) | consistent |
| 18 | the undercity's parent | II.7.5 (2), V01 V1-3.16 ↔ V04 §3.6 C5 | rule consistent; call unnamed **SLR1-07** |
| 19 | `districtsAbove`, `fabricSignature` | V01 V1-3.16 ↔ V04 §3.5.0a (7), §4.5 | consistent in content; unlisted in V04 **SLR1-07**; build order **SLR1-05** |
| 20 | `blockLifted` | V01 V1-3.9 ↔ V04 §3.5.1 (7) | consistent |
| 21 | catacomb source protection | V04 `UndergroundSystem.sources` ↔ V01 V1-3.5.12 (4) | consistent; wording of a closed source **SLR1-21** |
| 22 | the catacomb entrance sentence | file f item 560 ↔ V01, V04 | consistent (SL-17) |
| 23 | public opening kinds and places | file f item 554 ↔ V01, V04 | consistent; the role **SLR1-20** |
| 24 | `hood.pins` rows for the underground | V04 §1.3 ↔ V01 | **SLR1-09** |
| 25 | public ground, squares, yards | V04 §1.2 ↔ V01 blocks | consistent (SL-15) |
| 26 | locality of a ground edit | V04 §4.3, V05 §4.3 ↔ V01 V1-3.9, T-V1-17 | consistent; restated **SLR1-22** |
| 27 | the lone neighbourhood's layers | V01 V1-3.10.1 (7) ↔ V04 §3.1 | **SLR1-01** |
| 28 | the `Way` line | file f 208 → 207 → 209 | consistent (SL-18) |
| 29 | `DistrictContext.under`, `.shade.islandShare` | V01 V1-2.3 | consistent (SL-21); sky-arena shade **SLR1-06** |
| 30 | `catchmentOf` on the other arenas | V01 V1-3.16 ↔ V04 §3.6a (5), V05 §3.5 (3) | consistent; term **SLR1-19** |
| 31 | GeoJSON of walls and raised ways | file f 447 ↔ V01 §5.3, V05 §5.5 | consistent |
| 32 | barrier kinds on seams | J-VI.3 ↔ V01 BCR-30 (b) | consistent |
| 33 | a ground landing's S8 destination | BCR-V5-20 ↔ V01 V1-3.4.2 (a) | consistent |
| 34 | the sky unit run's generation cost | V01 V1-6 ↔ V05 §6 | consistent |
| 35 | the aqueduct's terminal | V01 V1-3.17.8 ↔ V04 §3.5.4 (e) | consistent (J-VI.9) |
| 36 | spans' `use`, lanes under arches | V04 BCR-45 ↔ V01 V1-3.17.3 | consistent |
| 37 | the raised-way slot before S7b (1) | V01 BCR-39 ↔ V05 §3.1 | consistent |
| 38 | `hood.fabric`, `sky.clearance` epoch orders | V01 ↔ V05 ↔ V06 | consistent |
| 39 | DR numbers | IN-V01-6, IN-V05-3 | consistent |
| 40 | raised-way reason words | J-VI.2 ↔ IN-V01-4 | consistent |
| 41 | SKY's data keys in S9b's declared inputs | BCR-V5-3, J-V5.70 ↔ V01 §3.1 | **SLR1-03** |
| 42 | opening places after generation (epochs, edits) | V01 V1-2.7 ↔ V04 §3.10, §4 | **SLR1-04** |
| 43 | `@plat/hood` services in M6-U's build order | V01 W15 ↔ V04 §8, §11 Q1 | **SLR1-05** |
| 44 | shade on a sky arena | V05 `shadeSky` ↔ V01's shade readers | **SLR1-06** |
| 45 | the landfall's quarry against the surface quarry | V05 §3.16 (4), BCR-V5-26 ↔ V04 §3.5.3 | **SLR1-14** |
| 46 | the seam bars' registration | V04 BCR-15 ↔ T-V4-71 – 74 | **SLR1-15** |
| 47 | the underground pseudo-district's name | base II.7.3 ↔ V04 §3.6a (5), V01 V1-3.16 | **SLR1-19** |
| 48 | `SkyIsland.districts`' writer | V01 V1-2.4 ↔ V05 §2.6 | **SLR1-24** |
| 49 | the island unit run's cross-arena pulls | V05 §3.12, §3.20 (12) (a) ↔ V01 V1-3.10.3 (4) | **SLR1-25** |
| 50 | file f's needed-by lists and line pointers on the seam items | file f ↔ V01, V04, V05 | **SLR1-18** |

## 3 New findings

### SLR1-01 — major — owner V04 — the lone neighbourhood's tail has no input and no line (SL-19's other half)

**Claim.** V01 fixes a hood document's underground "through the inputs volumes 4 and 5 read" and says "no other stage
reads `Recipe.product`" (V1-3.10.1 (7)): sewers off and the undercity forbidden by what S0 writes, then "the rest of the
tail runs as V04 §3.1 runs it below TOWN … quarries, the generated vaults and the buried town are none" and the catacomb
step "at TOWN's rules with TOWN's count, one, whatever `contextRung`"; T-V1-20 bars it on every `contextRung`. V04 has
no such line and no input that selects that set (grep: no `standalone`, `hood` document or `Recipe.product` in V04). Its
gates read the rung (V4 §3.1's at-every-rung paragraph; §3.5.0's TOWN-and-above rows; P5 and P6 at TOWN and above), and
a hood's `contextRung` is TOWN, CITY or METROPOLIS (default CITY, V1-2.6). As written, V04 lays a hood's quarries by the
volume law, its bridge, street and cistern vaults, a buried town under a scar, runs the catacomb count at CITY (up to 3),
and U-FORECAST's P5 allocates households to those voids at S7b. V01's cross-volume note (16) asked V04 for the line at
03:43; V04's lane had landed at 03:39.

**Required change.** V04 §3.1, after the maintenance-mode paragraph, adds: "**A standalone neighbourhood document**
(volume 1, V1-3.10.1 (7)). Its S0 writes `Features.sewers` false and the undercity circumstance `forbid`. The tail reads
`Recipe.product`, its one reader besides S0. Where it is `hood`, the tail runs this section's below-TOWN set whatever the
hood's `contextRung`: T2's ruin and cavern (with the vaults step for a declared raised way), T2b, T3's F6, T5's L3, L5 and
L7, T6 and T8. It adds U-SYS's catacomb step (V4 §3.5.1) at TOWN's rules and count (one), taking candidates only from the
hood's own burial faces. No quarry, generated or forced vault or buried town is laid, and U-FORECAST's P5 forecasts only
the kinds this set lays." A bar T-V4-75 reads: "on 100 hood documents per `contextRung`, 0 sewer, quarry, vault other than
a declared raised way's, buried or undercity elements; ≤ 1 catacomb complex". V01 V1-3.10.1 (7) then replaces "no other
stage reads `Recipe.product`" with "besides S0, only V04 §3.1's hood line reads it". T-V1-20 cites T-V4-75.

### SLR1-02 — major — owner V05 — the node's ruin name is read from an entry nobody writes (SL-03's other half)

**Claim.** V04 now writes the generation report's line `ruin.node: { deposit; ruin; name: NameRef }` in T6, once S13a
has named the ruin. It names "V05's why ('the node beneath the old ruins', V5 §3.3, §4.5)" as a consumer (V4 §1b.1's row,
§3.5.0a (9), T-V4-74 (d); V04 §13 hands V05 the counterpart sentence). V05 still reads "the deposit's report entry, which
carries the ruin's name when volume 4 placed it there" (V5 §3.3). §4.5 says "when the deposit's report entry carries a
ruin (V5 §3.3)". Neither V04 nor V08 writes such an entry. A builder of V05's `WhyProvider` looks for a record that does
not exist, and V04's line has no reader on the sky side. V05's lane landed at 03:34, V04's at 03:39.

**Required change.** V5 §3.3's last sentence reads: "The clerk's `why` names 'the node beneath the old ruins' from the
generation report's `ruin.node` line (V04 §3.5.0a (9): the deposit, the ruin system and the ruin's `NameRef`, so a renamed
ruin reads its new name), never by reading the ruin." V5 §4.5's clause reads "…'the node beneath the old ruins' when the
report's `ruin.node` line names the deposit (V04 §3.5.0a (9))". V5 §1b's node-term row adds the line to its producers.
T-V5-25 adds: "on a fixture whose `magical_node` stands at a ruin's centre, the why names that ruin from the `ruin.node`
line; with no ruin, it names none".

### SLR1-03 — major — owner V01 — S9b declares neither SKY's landing keys nor what its first read of the strips reads

**Claim.** BCR-V5-3 and J-V5.70 give SKY's ground writes two keys of its own, `reservations.landing` and
`allocations.landing`, "declared by S8, S10a (with its hook S9b) and S12a". V5 §3.19 (6) makes S9b the first reader of
the strips. That read computes them from each live island's `shadeBasis` and the unlevelled ground terrain. V01 §3.1's S9b
row declares "`reservations` (S3, S7, S7b; §4.8 forecourts; landings)", "`allocations` and S10a (i)'s block placements"
and "the islands' strips (V05 §2.3a)". It declares neither landing key, nor `shadeBasis`, nor `terrain`, which
V1-3.5.3's flatter-block tie-break also reads. T-V1-35's read-set test holds each hook's recorded reads within its declared
inputs, so it fails on the first seed with islands. T-V5-32 relies on the same declarations. V05 §13 item 18 routed the
clause to V01, but V01's round-1 issue list did not include it.

**Required change.** V01 §3.1's S9b row reads, in its inputs: "`reservations` (S3, S7, S7b; §4.8 forecourts) and
`reservations.landing` (the ground landing yards, BCR-V5-3); `allocations`, `allocations.landing` (the positioned
`sky_landing` rows, BCR-V5-6) and S10a (i)'s block placements; … the shade sampler's mask, each live island's `shadeBasis`
and the unlevelled `terrain` — the strips are computed from these at this first read and held (V05 §3.19 (6)) …".
T-V1-35 names the S9b clause.

### SLR1-04 — major — owner V04 — opening places are made only at generation; epochs and edits make and remove their hosts

**Claim.** V01 says an opening place "lives exactly as long as its host `AccessPoint`: re-derived with it, tombstoned
with it". Its one creator is "the underground tail's opening pass" (V1-2.7's opening row; V1-3.7.1). V04 calls the pass
in T6 only (V4 §3.1, §1b.2, J-V4.102). After generation, the accesses V1-3.7.1 selects are made and removed outside the
tail:
- At an epoch, `AccessPass.run` with a scope makes public openings: (e) runs over `scope.elements` and `scope.surfaceChanged` (V4 §3.5.7, *With a scope*).
- When an epoch raises the catacomb count, a new complex forms with its entrance `stair` (V4 §3.5.1 (3), (9); volume 6's `under.extend`).
- An edit deletes an opening access or changes its `kind` or `role` (V4 §4.2).

None of these runs the pass or tombstones a place. A sinkhole that opens at an epoch has no name and no place, and a
deleted opening leaves an orphan place with its label.

**Required change.** V4 §3.10, and §1b.2's opening-pass row, state: "the opening pass (V1-3.7.1) runs over the accesses a
commit creates, removes or re-kinds that V1-3.7.1 selects, inside that commit. At generation this is T6. At an epoch it
is the last step of `AccessPass.run` with a scope and of `CatacombGrowth.grow` when a new complex's entrance is laid. In
an edit it is the commit of a `delete`, a `setAttr` of `kind` or `role`, or a `placeAccess` on an opening candidate. Its
places, named on `naming` by V1-2.8's key, are among the commit's fates." V01 V1-2.7's opening row names these creators
in its create and regenerate cells. T-V4-74 (b) adds: "after an epoch that opens a sinkhole, and after an edit that
deletes a public opening, the opening places equal V1-3.7.1's selection".

### SLR1-05 — major — owner V04 — M6-U now reads three pieces of `@plat/hood`, but its build plan says it shares no package with M5

**Claim.** V4 §8 says M6-U "touches no package of M5 (`@plat/hood`), so it may run as a parallel lane beside M5". V4
§11 Q1 recommends that lane "since the two share no package", and `_integrate.md`'s product order carries the premise to
the owner. After round 1, V04 reads three pieces of `@plat/hood`:
- `fabricSignature`, in the ruin's distinctness step (V4 §3.5.0a (7), built at U3);
- `districtsAbove`, in C5's parent (per V01 V1-3.16) and the clerk's ruin answer (§4.5);
- the opening pass, in T6 (J-V4.102).

V01 builds all three in W15 at M5 (V01 §8.2). Its risk 8 covers only V04 landing after V01 ("registered and inert").
Run beside M5 as recommended, U3's distinctness step has no implementer, and T6 calls a step that may be unregistered.
Neither volume says what happens then.

**Required change.** V4 §8's *Where it slots* and §11 Q1 read: "M6-U reads three services of volume 1's `@plat/hood`
(V01 W15, M5): `fabricSignature` (U3, the ruin's distinctness), `districtsAbove` (U4, C5's parent and the clerk's ruin
answer) and the opening pass (U4, T6). Run beside M5, U3's distinctness step and U4's C5 are scheduled after W15's
services land. T6 runs the opening pass only while `@plat/hood`'s local-place step is registered (a registry lookup). If
it is absent, no opening place is made; the first tail run after it registers makes them, as a declared shift of the
places." The clause "since the two share no package" is deleted; the recommendation otherwise stands. V01 §8.2's W15
lists the three services as its first deliverable, since they read only committed records (V01 wording, cited here).

### SLR1-06 — major — owner V01 — what shade a point on an island reads is undefined

**Claim.** V05 gives an island its own shade reading, `shadeSky(x)`: the share of the model's sun samples in which a
higher island's solid blocks the sun at x, and after an epoch the island's own buildings (V5 §3.11 (4), §3.19 (7)). Only
the sky arena's context vector reads it (V5 §1b). V01's shade readers are defined on the ground field only:
- `DistrictContext.shade.meanShare` — "item 102's shade(x) over D from terrain and walls (field pass 1's sampler)" (V1-2.3);
- S7c's `shade` term (V1-3.3.3);
- S9b's manor `sun` factor — "the pass-1 sampler's terrain and wall mask OR-ed with every live island's strip onto the ground" (V1-3.5.5);
- the hood pins' `shadeGain` (V1-3.8.2 step 3).

Each of these also runs on island districts: S7c and S9b per island district (V1-3.10.3 (4)), and a sky district's
close-up (V1-3.8.8). No rule says what shade a sky point reads. A builder would read the ground's mask at the island's
world position, which is the shade on the ground beneath the island.

**Required change.** V1-2.3 (`shade`), V1-3.5.5 (*sun*) and V1-3.8.2 step 3 add: "on a sky arena, `shade(x)` is volume
5's `shadeSky(x)` on the island's 32 m lattice (V05 §3.11 (4), §3.19 (7)). `shade.meanShare` is its area-weighted mean
over D, and `islandShare` is D's share inside a higher island's strip onto this island. No sky reader reads the ground's
pass-1 mask." V05 §1b's `shadeSky` row adds these readers (a V05 wording edit, cited here). T-V1-21 adds: "an island
district under a higher island reads `shadeSky` in S7c, S9b and its hood pins".

### SLR1-07 — minor — owner V04 — the V01 services by name, and four citations

**Claim.** V01 names V04 as the caller of both services: C5 calls `districtsAbove`, and §3.5.0a (7) calls
`fabricSignature` (V1-3.16; V01 note (17)). On V04's side:
- §3.6 C5 still reads "with II.7.5's parent rule, read from the core's plan position".
- §1.2's V01 row and §1b.2 list neither service.
- §1b.1's `District.core` row says "C6 (the parent pick reads its plan position)", but C6 is the lights step.
- T6's lineage cell cites "V1-2.7" (lifecycle) for the opening place's identity, which is V1-2.8.
- §3.5.1 (1) cites "V05 §1" for the sky-face skip.
- V01's own 1b row calls V04's use of `fabricSignature` "the ruin culture draw"; V04 uses it in its distinctness step.

**Required change.** C5 reads "with II.7.5 (2)'s parent rule, computed as the first entry of volume 1's
`districtsAbove(part, core)` (V1-3.16)". §1.2's V01 row and §1b.2 add `districtsAbove` (implementer V01's `@plat/hood`;
callers C5 and §4.5) and `fabricSignature` (caller §3.5.0a (7)). §1b.1's row: "C6" → "C5 (the parent, through
`districtsAbove`)". T6's cell: "V1-2.7" → "V1-2.8". §3.5.1 (1): "(V05 §1)" → "(V05 §1.3, §3.5 (3))". V01's 1b row:
"ruin culture draw" → "the ruin's distinctness step (V04 §3.5.0a (7))" (V01 wording, cited here).

### SLR1-08 — minor — owner V05 — the rim walk's "path" (SL-12's other half)

**Claim.** V01 now plants the rim walk's `street_trees` row along the strip's inner setback line, with its `along`
naming the strip and no way (V1-3.10.3 (4); BCR-10 (c), which makes `Greenery.along.way` optional). V5 §3.12 still says
the row's `along` "names the rim walk's path and the rim strip". No record holds such a path. V01 note (19) was not
applied.

**Required change.** V5 §3.12 reads "…a `street_trees` `Greenery` along the rim strip's inner setback line, its `along`
naming the strip with no way (V01 V1-3.10.3 (4), BCR-10 (c)), spaced by the greenery table's street-tree row…".

### SLR1-09 — minor — owner V01 — "volume 4 fills" the underground hood-pin rows (SL-22's other half)

**Claim.** V04 owns the `underground` rows of `hood.pins` and ships none (V4 §1.3, J-V4.97). V01 still says the rows
"ship empty here and are volume 4's to fill" (§1.3), are "arena-keyed so volume 4 can fill `underground`" (V1-2.2), that
"volume 4 fills them" (V1-3.8.2), and that an underground district opens "with the `underground` hood-pin rows (volume
4's)" (V1-3.8.8).

**Required change.** Each of the four reads: "the `underground` rows are volume 4's, which ships none (V04 §1.3,
J-V4.97), so an underground close-up draws no hood pins".

### SLR1-10 — minor — owner V01 — "once per generation" against "once per shade evaluation"

**Claim.** V05 computes the strips "once per shade evaluation, at their first read". At a re-derivation starting after
SKY and at or before S10a, it writes the islands' bases at S10a's start (V5 §3.19 (6); J-V5.71). V01 says the strips are
"evaluated once per generation, at S9b's first read" (V1-3.5.5) and "evaluated once per generation" (V1-6's S9b row). A
re-derivation from S10a or an earlier stage is a new evaluation, not a generation.

**Required change.** Both read: "once per shade evaluation — the generation's, a re-derivation's from S10a or earlier,
or an epoch's (V05 §3.19 (6)) — at S9b's first read".

### SLR1-11 — minor — owner V05 — the island's plot share has two homes (SL-27, remainder)

**Claim.** For the district count, V05 cites volume 1's `hood.constants.sky.plotShare` (§2.3, §3.5 (3), §3.12 item 7).
J-V5.45 explains why: "an edit of it moves both volumes' counts together". The fill's stop and the coverage overshoot,
however, use `0.62 · A`, the base's dense-core share (§3.5 (2)–(3); BCR-V5-5's text; the round-1 note keeps it
deliberately; BCR-V5-16's overshoot clause likewise). The fill's plot land and the count's divisor are one share. Editing `sky.plotShare` moves the count and
not the fill, so a full island's district count stops matching its land. §2.3 also restates V01's count formula in full.

**Required change.** V5 §3.5 (2)–(3), BCR-V5-5 (its l. 2712 clause) and BCR-V5-16 (its overshoot clause, l. 2913) read "`plotShare · A`, `plotShare` volume 1's
`hood.constants.sky.plotShare` (V01 V1-3.14; its default the base's dense-core share, §4.2 S2)". V5 §2.3 replaces the
formula with "k is volume 1's `skyDistrictCount(plotLandM2, districtHa)` (V01 V1-3.16)", and §3.5 (3)'s "the same call"
names that function.

### SLR1-12 — minor — owner V01 — the count formula writes 0.62 and cites volume 5 for itself

**Claim.** V1-3.10.3 (2) writes the island count as `⌈allocated plot land ÷ (0.62 × context.districtHa)⌉` with a
literal 0.62 and cites "(V05 J-V5.45)" as its source. V1-3.14 homes the share as `hood.constants · sky.plotShare`, and
V05 now cites V01 for the formula (J-V5.45). The citation is circular, and a literal sits beside its own table cell.

**Required change.** V1-3.10.3 (2) reads "`k = clamp(⌈allocated plot land ÷ (sky.plotShare × context.districtHa)⌉, 1,
3)` [`sky.plotShare`; V1-3.14]", citing V05 only for `districtHa`. V1-3.16 adds the pure service
`skyDistrictCount(plotLandM2, districtHa)` returning that k, called by the unit runner and by V05 §2.3 and §3.5 (3).
V1-3.14's row gives the default as the base's dense-core share (0.62, §4.2 S2).

### SLR1-13 — minor — owner V01 — two stale sentences about volume 5

**Claim.** V1-3.1 ends by saying "volume 5's ordering note 'before S7c' reads 'after S7b, S7c included' (a
cross-volume note, V1-10)"; V05 §3.1 now reads so. V1-3.17.7 (1) says V05 §3.22 (3) (d) refuses a raised way declared on
an island. IN-V05-1 and J-VI.4 (e) made that a bend: `raised` is dropped and the way drawn on the island's ground, and an
aqueduct becomes a fountain pin.

**Required change.** V1-3.1's sentence reads "SKY (V05 §3.1) runs after S7b, S7c included". V1-3.17.7 (1)'s "on an
island V05 §3.22 (3) (d) refuses it" reads "on an island it is bent by V05 §3.22 (3) (d) (J-VI.4 (e))".

### SLR1-14 — minor — owner V04 — the surface quarry is not told apart from a landfall's rubble working

**Claim.** V05 makes a landfall's covered land a `quarry` land use that carries `source` (the `fallen_island`
decoration). That land use "sources no underground quarry system, no mine–cavern breach and no dig-down draw" (V5 §3.16
(4); BCR-V5-26). V05 §13 item 3 asks V04 to read "a `quarry` land use with a `source` … as no quarry source". V04 never
says which quarry land use is §4.9's surface quarry:
- §3.5.3's new workings skip "every cell under … the surface quarry's face" and take unmet volume "from the surface quarry";
- §3.11's row reads "the rest from the surface quarry".

**Required change.** V4 §3.5.3 defines once: "the surface quarry is §4.9's `quarry` land use without a `source`. A
landfall's rubble working (a `quarry` with a `source`; V05 §3.16 (4), BCR-V5-26) is never the surface quarry, a stone
working or a volume source." §3.11's row cites it.

### SLR1-15 — minor — owner V04 — the base's bar list stops before the seam bars

**Claim.** BCR-15 registers "T-V4-1 – T-V4-70" in §13.2. Round 1 added T-V4-71 – T-V4-74: the sky-layer exclusion, the
epoch contracts, the closures, and public ground with the opening places and the `ruin.node` line.

**Required change.** BCR-15 reads "T-V4-1 – T-V4-75", covering SLR1-01's bar and any bar SLR1-04 adds.

### SLR1-16 — minor — owner V04 — levelled heights are not read through `levelledGroundCm`

**Claim.** BCR-V5-30 names the one reader of levelled heights, `levelledGroundCm(doc, key, p)`, and forbids writing
levelling into the `Terrain` raster. It lists as readers V04's wall-face knots, arch-vault floors, foundation obstacles and
BCR-45's span rule. V04 never names the function (grep: 0). It describes its heights as "the levelled ground's (the
terrain sampler with S10–S11's levelling, g item 110 (a))" (V4 §1.2), which reads as a levelled sampler — the raster
write BCR-V5-30 rules out.

**Required change.** V4 §1.2's ground paragraph reads "the heights read are `levelledGroundCm(doc, ground, p)` (BCR-V5-30:
a levelled plot's, block's or ward's platform datum, else the unlevelled raster)". N6–N7, §3.5.0's foundations (1)–(2),
§3.5.4 (d) (1) and BCR-45's span rule (2) cite it. §1.2's item-110 row adds BCR-V5-30.

### SLR1-17 — minor — owner V01 — `stepProfile` reads "the levelled plot ground" without naming its reader

**Claim.** V01's `stepProfile(wall)` reads "the levelled plot ground, a way's level or the terrain" (V1-1b's row, V1-2.3's
comment, BCR-43). BCR-V5-30 lists "volume 1's `stepProfile`, its BCR-43" among the readers of `levelledGroundCm`, but V01
never names the function (grep: 0).

**Required change.** BCR-43 and V1-2.3's comment read "the committed levels on each side — `levelledGroundCm`
(BCR-V5-30) for ground, a way's level where a way bounds it".

### SLR1-18 — minor — owner BASE-F — file f's seam items: needed-by lists and stale line pointers

**Claim.**
- (a) Item 282 (BCR-V5-3) lists *Needed by* V05 only, and item 213 (BCR-V5-6) lists V05 and V11. Both define keys that
  V01's S9b hook must declare (SLR1-03), so V01 is missing from both. Item 309 (BCR-V5-30) lists V05 only, though
  `levelledGroundCm` is read by V01, V02 and V04 (the item's own reader list).
- (b) The seam items' line pointers are stale after round 1:

| item | pointer in file f | line now |
|---|---|---|
| 207 | V01 §10, l. 2793 | 2977 |
| 208 | V04 §10, l. 2540 | 2688 |
| 213 | V05 §10, l. 2622 | 2721 |
| 282 | V05 §10, l. 2585 | 2677 |
| 309 | V05 §10, l. 2938 | 3053 |
| 325 | V04 §10, l. 2566 | 2714 |
| 414 | V04 §10, l. 2850 | 3004 |
| 448 | V01 §10, l. 3085 | 3280 |
| 539 | V01 §10, l. 2745 | 2923 |
| 564 | V04 §10, l. 2834 | 2988 |

**Required change.** Items 213 and 282 add V01 to *Needed by*; item 309's list reads "V01, V02, V04, V05". The seam
items' pointers are recomputed from the landed volumes, or replaced by the BCR's own heading, which does not move.

### SLR1-19 — minor — owner V04 — "the sewer-front pseudo-district" is not the record's name

**Claim.** The base and V04 call the record "the underground pseudo-district" (II.7.3; §4.5 S7b (6); V4 §2.5, §3.4 F6,
BCR-19: it "exists wherever (6) allocates, (d) included, at every rung"). V4 §3.6a (5), §3.6 C1 and V01 V1-3.16 call the
same record "the sewer-front pseudo-district". At a village rung with no sewer, that name refers to nothing, yet the record
holds F6's void dwellings.

**Required change.** V4 §3.6a (5) and C1 read "the underground pseudo-district (the sewer-front neighbourhoods and F6's
void dwellings)". V01 V1-3.16 reads the same (V01 wording, cited here).

### SLR1-20 — minor — owner V04 — the public opening's role is implied, and V01 selects on it

**Claim.** V01 selects opening places by `source: 'opening'` and `role: 'access'` (V1-3.7.1). V4 §3.5.7 (e) writes the
source but states only the skylight's role (`light`).

**Required change.** (e) reads "… source `opening`, role `access` (a `skylight` is a `mouth` of role `light`) …".

### SLR1-21 — minor — owner V01 — a closed catacomb source is called "stagnation"

**Claim.** V04 separates two states:
- **stagnant**: the need exceeds the laid capacity and no frontier node is admissible, so `fill` rises (V4 §3.5.1 (7));
- **frozen**: the burial face is closed, so there is no growth and no change of `fill` (`blockedBy: 'sourceClosed'`, V4 §3.5.1 (8)).

A targeted edit of a catacomb's source in V01 (retyping the churchyard, demolishing its church) "names the stagnation"
(V1-3.9, V1-4.1's content row, T-V1-47). That edit closes the face, which is V04's frozen state.

**Required change.** V1-3.9, V1-4.1 and T-V1-47 read "names the closed source (V04 §3.5.1 (8): the complex frozen — no
growth, `fill` unchanged, every gallery kept)", keeping the quoted line. "Stagnant" stays only where V1-3.9's
`blockLifted` notice is meant.

### SLR1-22 — minor — owner V01 — the replace close-up restates two other volumes' rows

**Claim.** V1-3.9 restates, in parentheses, the content of V04 §4.3's ground-edit row and of V05 §4.3's island re-read.
It does not just cite them. A later change to either row leaves V01's copy stale, and T-V1-17's oracle then reads two
texts for one rule.

**Required change.** V1-3.9 reads "plus the cross-arena consequences volumes 4 and 5 declare for a ground edit (V04
§4.3's ground-edit row and V05 §4.3's island re-read, cited, never restated), which the oracle predicts from those rows".
The dry run's fate sentence keeps only "the cross-arena fates of those rows".

### SLR1-23 — minor — owner V05 — `catacomb.churchesPer` is an id no volume defines

**Claim.** V05 names the catacomb count's cell `catacomb.churchesPer` (§1.3; §3.5 (3), twice). The id occurs in no other
volume (grep). The cell is V04's `CatacombRule.count[rung].churchesPer` (`tables/under/catacomb.json`, V4 §2.3; its values
are V11's rows, IN-V04-1).

**Required change.** V05 cites "the catacomb count (V04 §3.5.1 (3); `CatacombRule.count`'s `churchesPer`, V4 §2.3)".

### SLR1-24 — minor — owner V05 — `SkyIsland.districts` is created by the unit run, says V05's lifecycle row

**Claim.** V5 §2.6's `districts` row names "the unit run" in its create column. V5 §3.12 and V01 V1-3.10.3 (5) make SKY-F
the writer, from `NeighbourhoodResult.districts`. The unit run "write[s] only the island's arena" (V5 §3.12), and the arena
does not hold the island record.

**Required change.** The row's create cell reads "SKY-F, from the unit run's `NeighbourhoodResult.districts` (V01
V1-2.4)".

### SLR1-25 — minor — owner V01 — the island unit run's cross-arena pulls are not in its steps

**Claim.** V05's contract has the unit run "measure every pull to a class on another arena by the route distance (V5
§3.20)" (V5 §3.12). V5 §3.20 (12) (a) has the island's S10b read each ground provider at the block its S10a allocation
holds, a proxy, so the concurrent pool and the unit run stay byte-stable (T-V5-22 (j)). V1-3.10.3 (4) runs "S10–S12b in
the island's own overlay" and mentions neither rule (grep: no `skyRoute` in V01).

**Required change.** V1-3.10.3 (4) adds: "its S10b reads a class on another arena by BCR-V5-16's route distance and, at
generation, reads a ground provider at the block its S10a allocation holds (V05 §3.20 (1), (12) (a)), never the pool's
placed plots". T-V1-21 adds "the island's placements identical at pool sizes 0 and 3".

## 4 Disposition summary by owning volume

| owner | blocker | major | minor | findings |
|---|---|---|---|---|
| V04 | 0 | 3 | 6 | SLR1-01, SLR1-04, SLR1-05; SLR1-07, SLR1-14, SLR1-15, SLR1-16, SLR1-19, SLR1-20 |
| V01 | 0 | 2 | 8 | SLR1-03, SLR1-06; SLR1-09, SLR1-10, SLR1-12, SLR1-13, SLR1-17, SLR1-21, SLR1-22, SLR1-25 |
| V05 | 0 | 1 | 4 | SLR1-02; SLR1-08, SLR1-11, SLR1-23, SLR1-24 |
| BASE-F | 0 | 0 | 1 | SLR1-18 |
| **total** | **0** | **6** | **19** | 25 |

**What held.** Round 0's blocker is closed. SKY sorts after S7b (S7c included) and before S8, S10a and S12a on keys of its
own, with no cycle. Twenty-eight of the 35 round-0 issues are fixed on both sides of the seam. The following now agree
across V01, V04 and V05:
- the sky layer's exclusion from the underground, with the island churches in the count;
- public ground;
- the opening selection by record fields, and the one visibility rule;
- the landfall's bricked accesses and ruined arch vaults;
- the render-only shaft light;
- the unit run's contract: the optional request fields, `districts`, `portalsTotal` 0 with `landingsReached`, the rim walk's planting, the destination lane before the seeds, the sky kinds' κ;
- the barrier mapping;
- item 447's GeoJSON names;
- file f's `Way` order and its merged items 554 and 560.

The seven PARTLY issues are the counterpart halves of round-1 notes written after the receiving lane had landed. Round 2
closes them together with the new findings.

**CONFIRMED versus PLAUSIBLE.** CONFIRMED by reading and by whole-file grep at the md5s of §0: every status in §1 and
every quoted sentence in §3. The absences are all grep results: no `standalone`, `hood` document or `Recipe.product` in
V04; no `levelledGroundCm` in V01 or V04; no `shadeSky` or `skyRoute` in V01; `catacomb.churchesPer` only in V05; the
opening pass called only from T6. The stale line pointers were checked against the current files. PLAUSIBLE, by
reasoning rather than execution:
- SLR1-06's premise that a builder would read the ground mask at an island point.
- SLR1-11's claim that an edit of `sky.plotShare` desynchronises the count from the fill.
- SLR1-05's consequence, which applies only if the owner picks the parallel lane of V04's question 1.
