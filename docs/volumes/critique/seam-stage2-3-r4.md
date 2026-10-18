# Seam check, round 4 — stage 2 · stage 3 · the plan rung (V01 neighbourhoods · V02 buildings · V03 interiors)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-stage2-3-r4; covered by the whole-design retrovalidation (J84).

Lane `volumes/seam-stage2-3-r4`, 2026-09-29. Reconciliation round 4 of this seam. Output: this file only — no volume, no
amendment file and no base text is edited by this lane. Every issue names **one** owning volume (or BASE-F, an item of
`docs/AMENDMENTS-2026-09-28f.md` that must change) and the exact change it needs (J-S23R1.1 kept). This file was started
at 07:42 as a skeleton and cut; it is continued here on the re-issued brief (lane-events NOTE of 12:00) against the live
text, and the 07:42 inputs are superseded.

PROGRESS
- §1 Method, inputs and coverage | done
- §2 Re-check of round 3 (S23R3-01..17) | done
- §3 Sweep (every line changed since round 3's continuation inputs; mechanisms re-traced) | done
- §4 Issue register (S23R4-nn) | done
- §5 Summary by owner, decisions (J-S23R4), CONFIRMED versus PLAUSIBLE | done

**Outcome.** All **17 of round 3's issues are fixed** in their owners' live text (S23R3-01 … 17, both landings): one
producer for each outside door (`basementDoor(doc, key, b)`, `stackAccessDoor(b, a)`), read by volume 1's reserve and
digest; the walk-out's door roots the basement's storeys; T28-1 amended for the storey-less plan; the sealed stack worded
alike; the ground reader typed at both ends; file f's items 483, 578 and 585 carrying volume 3's requests as they read.
The sweep of every repair since found **6 issues — 0 blockers, 2 majors, 4 minors.** The two majors sit where round 3's
basement root meets text no lane has touched since: a **main entrance can open on a basement level of an `external`
basement**, whose core stops at the ground storey, stranding every storey above (S23R4-01); and the **outside basement door
ignores the crypt**, so a walk-out church's crypt can gain a street door with its cellar cut off, and a solid temple's crypt
can be cut off behind its tomb door (S23R4-03). The minors: volume 2's rows omit `stackAccessDoor` among the stack
helpers' readers and give the approach strip no row (S23R4-02); volume 1's note (32) restates the landed function inexactly
(S23R4-04); file f item 505's build note predates volume 1's whole-row `hood.constants` and `WayNamingContext` (S23R4-05);
volume 3 restates a storey-less stack's entrance as "at its stair's foot" (S23R4-06). Owners: V03 2 majors, 1 minor; V02,
V01 and BASE-F 1 minor each.

## 1 Method, inputs and coverage

**Inputs as read** (md5 at this continuation's start, 12:00, snapshots in the session scratchpad's `volumes/seam23r4/live/`):
`docs/volumes/V01-neighbourhoods.md` cbbfe6e8… (4 241 lines), `docs/volumes/V02-buildings.md` 34f5b1f5… (4 774),
`docs/volumes/V03-interiors.md` 735035b5… (3 587), `docs/AMENDMENTS-2026-09-28f.md` 0da3c86c… (1 616),
`docs/volumes/_integrate.md` 965ab696… (468, unchanged since round 2's continuation), `docs/ARCHITECTURE.md` 01fea21f…
(unchanged since round 0). Round 3: `docs/volumes/critique/seam-stage2-3-r3.md` cea1daf8… (757 lines) read whole, both
its landings (§1 – §5 of 06:50, S23R3-01 … 08; §6 – §9 of 11:11, S23R3-09 … 17).

**Coverage (J-S23R4.1).** Round 3's continuation inputs (V01 925e51b5…, V02 0c432111…, V03 e83ffac3…, file f b4546425…,
`_integrate.md` 965ab696…) survive exactly as its snapshots (`seam23r3c/now/`, hashes checked) and as the round-4 reconcile
lanes' backups (`rcV1r4c/V01-pre.md`, `rcV2r4c/V02-pre-r4c.md`, `rcV3r4b/V03-pre-r4b.md`, `rcBFr4c/f-pre-r4c.md`, same
hashes). This round read the **full diff** of each file from those inputs to the live text — every changed line, 1 029
diff lines (V01 439 — reconcile-V01-r4's continuation, S23R3-10 with SCC-R3C-3 and SCC-R3C-9; V02 100 — reconcile-V02-r4's
continuation, S23R3-14 and S23R3-17; V03 322 — reconcile-V03-r4's second brief, S23R3-09, -11, -12, -15, -16 and SCC-R3C-8;
file f 168 — reconcile-BASE-F-r4's continuation; `_integrate.md` 0) — and then followed each mechanism a changed passage
touches into the untouched text of all three volumes and the base, reading every hit in place: the stack-hosted access's
door (`stackAccessDoor(b, a)`, 3.7.2 (0) – (5), 2.1's `AccessHead.door`, 3.9, 5.1; V02's `stairChain`, §4.6's approach
strip, the stack-helpers row and §8.5's dependencies; V01's V1-3.8.2 step 5, V1-3.8.3, V1-3.8.8, T-V1-26, note (32)), the
basement root and every way into a basement storey (O1 – O2, 3.6's entrance storeys, 3.7.1, BCR-V3-26, BCR-V3-32; the
base's *Basements*, `deriveBase`, step 3, step 5, T28-2, T28-3, J-A29.25; V02's BCR-V2-33 (c)), the storey-less plan and
its report (A5 (b), 2.3's `PlanReport`, 4.5, 4.6, BCR-V3-14 against the base's T28-1), the sealed stack (V02 BCR-V2-41,
T-V2-45, §7.7, ST5, §4.6; V03 S6), the ground reader (`rebaseStack`, `basementDoor(doc, key, b)`, BCR-V5-30's signature),
the capacity's cells (V03 2.4's register lines, BCR-V3-33 against §13.7's item-28 row and *One capacity function*), the
`NG` preset and `hood.constants`' settings form where they reach V02 or V03 (no V02 or V03 text reads a `hood.*` cell), and
file f's items for every request of the three volumes (items 230, 233, 241, 242, 371, 483, 505, 578, 584, 585). Two scripts
over the live volumes: the round-3 census (`seam23r4/live/census.py`) resolves every `J-V`, `T-V`, `BCR-V`, `X` id and
every `V1-x`, `V2 §x`, `V03 x` section one of the three volumes cites in another — **0 dangling**; a widened census
(`xcensus.py`) resolves the 521 section pointers and 167 ids the three volumes cite in volumes 4 – 12, which the other
volumes' round-4 repairs could have moved — **0 dangling**. Working notes and diffs: `seam23r4/live/d1.txt` … `di.txt`.

## 2 Re-check of round 3

S23R3-01 … 08 were seen applied by round 2's continuation (seam-stage2-3-r2 §7.2); S23R3-09 … 17 were applied between
11:27 and 11:50 by the round-4 reconcile lanes' second briefs. Each is re-checked here at its anchor in the live text.

| id | r3 sev. | owner | status | evidence (live file, line) |
|---|---|---|---|---|
| S23R3-01 | major | V03 | **fixed** | 3.7.1's **Access** sentence "`external` with its door at `basementDoor(b)`" (V03 l. 1586); the function with rules 1 – 3 (l. 1601 – 1633); BCR-V3-32 (l. 2978 ff.); §1b's rows (l. 329, 359); T-V3-30's (S23R3-01) clause (l. 2424) |
| S23R3-02 | major | V01 | **fixed** | V1-3.8.2 step 5's second rectangle at `basementDoor(b)`, none where it is null (V01 l. 1680 – 1684); J-V1.75 (l. 3177); T-V1-26's walk-out clause (l. 2930) |
| S23R3-03 | major | V02 | **fixed** | BCR-V2-33's round-4 extension carrying T29-4 and J-A29.25 (V02 l. 4005 – 4016), with its recorded variation (l. 4720 – 4730); §1b's row (l. 387); T-V2-44 "and T29-4 holds on both temples" (l. 3333) |
| S23R3-04 | major | V01 | **fixed** | V1-3.10.3 (4): "**After S8 and before S9**, one L1 batch … builds every other span" (V01 l. 1970); J-V1.91's reason (l. 3193); T-V1-21's deck clause (l. 2925) |
| S23R3-05 | major | V03 | **fixed** | §8's PE row: `R(s)` at M2b, `Entrance.storey`, the wall walk-out and `basementDoor(b)` at M3a (V03 l. 2458); §2.5's `Entrance.storey` row (l. 989); J-V3.116 |
| S23R3-06 | minor | BASE-F | **fixed** | items 233, 241, 242 relabelled BASE (M2b / M3a) with their notes (file f l. 138, 154, 156); item 578 carries BCR-V3-32 (l. 158) |
| S23R3-07 | minor | V03 | **fixed** | 3.7.2 (7): "The access's state as II.7.4 reads …", the collapsed trace with rubble stipple and no portal (V03 l. 1718 – 1722); 5.1 (l. 2236) |
| S23R3-08 | minor | V03 | **fixed** | §12's parenthesis (V03 l. 3109); §13's volume-2 bullet "nothing open" (l. 3287) |
| S23R3-09 | major | V03 | **fixed** (one wiring residue on V02's side: S23R4-02) | `stackAccessDoor(b, a)` declared and stated once in 3.7.2 (1) with its terms, wing, side, `at` and fallback (V03 l. 1651 – 1678); 2.1's `door` comment (l. 464 – 465); §1b's head, level-reading, derived and interface rows (l. 311, 325, 330, 360 – 361); 2.5's lifecycle row (l. 995); 3.9's row (l. 1880); 5.1 (l. 2233); §6's row (l. 2353); T-V3-22's fixture and clause from M3a (l. 2416); §8's PE (with `deckLevel` in its dependencies) and P2 (l. 2458, 2461); J-V3.117's sentence and J-V3.120 (l. 2622, 2625) |
| S23R3-10 | major | V01 | **fixed** (a stale restatement in note (32): S23R4-04) | V1-3.8.2 step 5 reads `stackAccessDoor(b, a)` — the rectangle outward from the footprint side it lies on, centred on its `at` (V01 l. 1685 – 1689); §1.2's V03 row and §1b's reserve row (l. 331, 399); V1-3.8.3's digest (l. 1711); T-V1-26's stack-door clause from M5 (l. 2930); W6 (l. 3031); J-V1.75, J-V1.96 (l. 3177, 3198); note (32) (l. 3750) |
| S23R3-11 | major | V03 | **fixed** (a residue at the crypt: S23R4-03) | O2's **basement root** (V03 l. 1491 – 1496); the secondary-entrance list without the walk-out door (l. 1501 – 1502); O2's storey-less clause (l. 1487 – 1488); 3.7.1's closing sentence (l. 1636 – 1637); T-V3-30's (S23R3-11) clause (l. 2424); J-V3.121 |
| S23R3-12 | major | V03 | **fixed** | BCR-V3-14 retitled and amending T28-1 with its soft-room clause (V03 l. 2779, 2790 – 2798; the quotation found once in the base, l. 13331); 2.3's `owed.tier` optional (l. 547 – 548); A5 (b) (l. 1165 – 1166); §7's opening (l. 2372 – 2373); T-V3-23 (e), T-V3-29 (l. 2417, 2423); J-V3.122 |
| S23R3-13 | minor | BASE-F | **fixed** | item 483 "T28-1 on a building with no storeyed wing, and T28-2 with structural faces, concealed suites and the storey-less plan", *Needed by* V02, V03 (file f l. 798) |
| S23R3-14 | minor | V02 | **fixed** | BCR-V2-41's list "a sealed stack whose every wing is solid" and the sealed-shrine clause (V02 l. 4124 – 4129); T-V2-45 (l. 3342 – 3345); J-V2.83 (l. 3589); V2 §7.7's sealed fixture in two forms (l. 3306 – 3308); J-V2.106 |
| S23R3-15 | minor | V03 | **fixed** | (a) BCR-V3-26's closing "no plan above the ground where no wing is storeyed (its basement storeys and access heads planned …)" (V03 l. 2914 – 2916); (b) S6's list "a sealed stack whose every wing is solid — one carrying a storeyed tier or shrine is planned and flagged by (e)" (l. 1297 – 1298), worded as V02's BCR-V2-41 |
| S23R3-16 | minor | V03 | **fixed** | `declare function basementDoor(doc: Document, key: PlatKey, b: Building)`, "written `basementDoor(b)` in prose" (V03 l. 1603 – 1606); §1b's rows "on `(doc, key)`" (l. 329, 359) |
| S23R3-17 | minor | V02 | **fixed** | `rebaseStack(b, ground: (p: PointCm) => Cm /* levelledGroundCm(doc, key, ·) … never the raster's TerrainSampler */)` with step (1) "every sample by `ground`" and the callers' clause (V02 l. 811 – 818); §1b's row (l. 294) |

**Totals.** 17 of 17 fixed; every one of round 3's issues is closed. The repairs read as their issues asked at both ends:
V03's two functions and V01's reserve name one point each; file f's labels match the requests they carry (item 483 the
retitled BCR-V3-14, item 578 the unchanged prose `basementDoor(b)`, item 585 the new BCR-V3-33). The three residues noted
in the table sit in texts the fixes did not reach and are registered anew in §4 with their cause.

## 3 Sweep

### 3.1 What holds

The seventeen repairs read as their issues asked, at both ends, and no repair since round 3 reverts another. **One point,
one producer:** the stack-hosted access's door is `stackAccessDoor(b, a)` in V03 3.7.2 (1) — a non-stair ground wing, a door
part two modules long, the door one module from each end and its span one module clear of stair 0's approach strip, else a
reported fallback — and volume 1's reserve reads it and its digest hashes it (V1-3.8.2 step 5, V1-3.8.3), T-V1-26 and
T-V3-22 measure it from M5 and M3a on eager records, and its inputs (the wings' `role`, `stairChain`, `moduleCm`, shipped at
M3a by file f item 233) all exist when PE builds it. Its domain (no basement, no `ground(b)`) is exactly the domain volume 1
reserves for, less a well (volume 4's pin) and a deck building (no head), which volume 1 excludes by name. **The basement
root** now agrees with the base's step 5 and T28-2, whose `external` clause already starts at the outside door (base
l. 13332), and with volume 2's BCR-V2-33 (c). **The storey-less plan** passes T28-1 as BCR-V3-14 amends it (the
quotation found once in the base), with `PlanReport.owed.tier` optional exactly there: 4.5's panel and 4.6's why read each row's `delivered`, and
5.3 exports the typed report, `tier` absent where 2.3 leaves it. **The sealed stack** is worded alike in V02
BCR-V2-41, T-V2-45, V2 §7.7's two fixtures and V03 S6. **The ground reader** is typed at both ends (`rebaseStack`'s
`ground`, `basementDoor(doc, key, b)`), and no V01 or V03 text calls `rebaseStack` or names the raster sampler. **The
capacity's cells** (the `room` role's area, the poorest-band `circulation`) stay on V12 §3.11's default line and §13.7's
item-28 fallback no longer steps them (BCR-V3-33, file f item 585; the quotation found once, base l. 14122); no V01 or
V02 text reads them. **The `NG` preset** reaches no V02 or V03 cell but through `MFCG`'s resolution (V1-3.15, BCR-46):
V02's `sunBias` 0.5 and `massing.composed` off under `NG` as under `MFCG`; no V02 or V03 text reads a `hood.*` cell.
File f's items 483, 578 and 585 carry V03's requests as they now read; items 230 and 371 carry V02's.

### 3.2 What breaks (each registered in §4)

1. **A main entrance may open into an `external` basement whose core stops above it.** V03's entrance-storey rule
   (BCR-V3-26; 2.1 l. 479 – 484; 3.6 l. 1551 – 1558) takes "the level (basement levels included) whose floor at its wing
   meets the outside ground at its vertex within `datum.maxSteps × riserCm`" for every entrance, the main one included.
   The base puts `baseCm` at the highest ground sample plus the plinth (`deriveBase`, base l. 1390: `max(samples) +
   plinthCm`, 30 cm), the cellar floor `cellar.depthCm` (220 cm) below it (base l. 11514), and makes the basement a
   walk-out, `external`, where the fall under the footprint exceeds `slopeCm` (l. 1532 – 1537). A house whose street
   runs along its low side, with 130 – 250 cm of fall at the main entrance (220 − 30 ± the 60 cm tolerance of
   `datum.maxSteps` 3 × `riserCm` 20, V03 l. 608, 612), therefore has its main entrance on storey −1. For `external` the
   base's step 3 stops the core at the ground storey (l. 1601 – 1602; J-A29.25, l. 16963), so storey −1 and storey 0 share
   no stair: O2 roots the main tree on storey −1 (l. 1486), and every room of storey 0 and above is unreached — F-PLAN
   tier 1, T28-2 failed — on the common downhill-fronted walk-out of every hill town (S23R4-01). No text of the three
   volumes treats the main entrance on a basement level; 3.6 foresees only "a side door on a walk-out's low side".
2. **The crypt stands in the basement root's way.** O2 forbids every edge "between the crypt and any other basement room
   (the crypt is entered from the church above)" (l. 1500); round 3's basement root (l. 1491 – 1496) spans the basement
   storeys from the room the outside door opens into; `basementDoor(b)` places that door without reading the crypt
   (l. 1601 – 1633). A `basement`-class church has a crypt exactly when it has a full, half or walk-out basement (3.7.4,
   T-V3-23 (c)), so every walk-out parish church on a hill holds a crypt beside its cellar, and where rule 1 or rule 3's
   side lies on the crypt's ring the door opens into the crypt: the crypt gains an entrance on the street, against
   3.7.6's "the crypt stairs are the crypt's entry" and volume 1's §0 ("churches and the cathedral keep crypts with no
   entrance of their own on the street", V01 l. 210 – 212), and the cellar beyond it is unreached (T28-2). On a great
   temple built solid (`ground(b)` absent) whose cellar draw gives a basement larger than its crypt, the crypt is trimmed
   from its end nearer the main entrance (3.7.4 step 2) while the tomb door opens on the main entrance's side (rule 2):
   the door enters a cellar, the crypt has no crypt stairs there (3.7.6: its entry is the tomb door), and the forbidden
   edge leaves it unreached — T28-2 and T-V3-23 (e)'s "entered by the door at `basementDoor(b)`" fail (S23R4-03).
3. **Wiring rows one-ended on the producer's side.** V03's `stackAccessDoor(b, a)` reads volume 2's `stairChain` and stair
   0's approach strip (V03 §1b l. 330), but volume 2's stack-helpers row, its M3a-V2 content cell and its *Dependencies*
   sentence name `basementDoor(b)` as volume 3's reader and not `stackAccessDoor(b, a)` (V02 l. 311, 3479, 3491); and the
   approach strip, read by V2 §4.6's ground-wing placement and by both of volume 3's door functions, is defined only
   inside the `addRange` bullet of §4.6 (l. 2760 – 2762), with no row of its own (S23R4-02).
4. **Stale restatements.** Volume 1's cross-volume note (32) restates `stackAccessDoor`'s result as `{ wing, side, at }`
   "as S23R3-09 defines it … Volume 3's reconciliation carries the function", and V01 §12 keeps "that volume 3's landed
   `stackAccessDoor(b, a)` keeps S23R3-09's signature" PLAUSIBLE (l. 3750 – 3755, 3960); the landed declaration is `{ wing,
   side, at, fallback? } | null` (V03 l. 1657) (S23R4-04). Volume 3 restates BCR-V2-41's entrance as "at its stair's foot"
   in three places (2.1 l. 483, S6 l. 1292, BCR-V3-26 l. 2914), which a sealed stack has no stair for — V02 puts its
   entrance "on tier 0's front side" (V02 l. 4127 – 4128) (S23R4-06).
5. **A file-f build note that disagrees with its volume.** File f item 505's *Build* note ships `hood.constants` "with the
   naming context's four rows" at M1 and `terrace.siteShare` at M3a, and lists `@plat/model`'s M1 types without
   `WayNamingContext` (file f l. 868); volume 1 now ships the table as one `settings` row, whole, at M1 (V1-8.1, l. 2977 –
   2980, 3000 – 3006; J-V1.99), `terrace.siteShare` with it, and BCR-1's `@plat/model` list names `WayNamingContext` from
   M1 (l. 3220), which its note (35) asks file f to carry (l. 3764 – 3766). The file-f lane landed at 11:44, before volume
   1's at 11:50 (S23R4-05).

### 3.3 Wiring across the seam — the pieces changed since round 3's continuation

| piece | produced by | consumed by | status |
|---|---|---|---|
| `stackAccessDoor(b, a)` | V03 3.7.2 (1), `@plat/plots`, PE (M3a) | `AccessHead.door`, 3.9, 5.1, 5.3; V01's reserve (V1-3.8.2 step 5) and digest (V1-3.8.3); T-V3-22, T-V1-26 | wired both ways on V01's and V03's sides; V02's `stairChain` row omits it (S23R4-02) |
| stair 0's approach strip | V2 §4.6 (inside the `addRange` bullet) | V2 §4.6's ground-wing placement; V03 `basementDoor(b)` rule 2, `stackAccessDoor(b, a)` | read by three rules, no row of its own (S23R4-02) |
| the basement root | V03 O2 | T28-2's `external` clause (base); BCR-V2-33 (c) | wired; blocked by the crypt's forbidden edges on walk-out churches and solid temples (S23R4-03) |
| `Entrance.storey` of the main entrance | V03 BCR-V3-26 (S11, M3a) | O2's root, E1, A2 (8), A6 | reaches a basement level the core does not serve (S23R4-01) |
| `PlanReport.owed.tier?` | V03 A5 (b), 3.9 | 4.5, 4.6, 5.3, T28-1 (BCR-V3-14) | wired; every reader reads `delivered` |
| `rebaseStack`'s `ground`; `basementDoor(doc, key, b)` | V02 §2.6; V03 3.7.1 | each re-basing path; step 3 (BCR-V3-32), V01's reserve, T28-3 | typed at both ends |
| the capacity's two cells on PE's line; BCR-V3-33 | V03 2.4; file f item 585 | V12 §3.11's default line; §13.7's item-28 fallback | wired; no V01 or V02 reader |
| `hood.constants` (one settings row, whole at M1); `WayNamingContext` in `@plat/model` | V01 V1-2.2, V1-3.14, V1-8.1, BCR-1 | file f item 505's build note | the note disagrees (S23R4-05) |

**Checked and not registered.** (a) Volume 1's `access.<kind>M` sizes (a well 1.6 m, a shaft 1.5 m, V01 l. 2234) differ
from volume 3's `access.wellCm` 150 and `access.shaftCm` 120 (V03 l. 610): the first are map symbols for accesses on
ground faces, drawn at the neighbourhood band and marked "drawing sizes", the second the plan's heads of accesses a
building hosts; one access is never drawn by both (V1-3.8.8's one-mark rule), so no record disagrees. (b) T-V2-32 compares
the ridge share with NG's under `preset: 'default'` (V2 §3.10.10's registrations): volume 1's `NG` preset is stage 2's
setting for T-V1-31 and T-V1-32 only (V1-3.15's scope), so the two agree. (c) `stackAccessDoor(b, a)` is non-null for a
well or an air shaft on its domain: volume 3 heads the air shaft as the outside-door form (3.7.2 (4)) and leaves the well
unheaded, and volume 1 reserves at every such access but the well, so the digest's extra value for a well is harmless.
(d) The sealed stack's storeyed shrine fails T28-2 as flagged `W_TIER_UNREACHED` in both volumes (V03 S6 (e), T-V3-28;
V02 BCR-V2-41, T-V2-45) — by design, stated alike. (e) `_integrate.md`'s H10 row still quotes "volume 3 placing its door
by its tomb-door rule"; it is the 08:13 integration record of what was adopted, never an implementer's input, and
BCR-V2-33 itself reads `basementDoor(b)`. (f) V2 §12's round-4 PLAUSIBLE item on volume 3's S23R3-15 (b) wording is now
true (V03 l. 1297); folded into S23R4-02 as a record to confirm.

## 4 Issue register (round 4)

Counts: **6 issues — 0 blockers, 2 majors, 4 minors.** Owners: V03 2 majors, 1 minor; V02 1 minor; V01 1 minor; BASE-F 1
minor. Line numbers are the live files' (§1's hashes).

| id | sev. | owner | kind | the claim in one line |
|---|---|---|---|---|
| S23R4-01 | major | V03 | contradiction (base step 3, T28-2) | the entrance-storey rule lets a main entrance open on a basement level of an `external` basement, whose core stops at the ground storey, so every storey above is unreached |
| S23R4-02 | minor | V02 | unwired on the producer's side | the stack helpers' rows name `basementDoor(b)` but not `stackAccessDoor(b, a)` as volume 3's reader; stair 0's approach strip, read by three rules, has no row |
| S23R4-03 | major | V03 | contradiction (3.7.6, V01 §0, T28-2) | the outside basement door is placed without the crypt: a walk-out church's door can open into its crypt (a street entrance, the cellar unreached), and a solid temple's tomb door into a cellar the forbidden crypt edge cuts off |
| S23R4-04 | minor | V01 | stale restatement | note (32) restates `stackAccessDoor`'s result without its `fallback` and `null` and calls it pending; §12 keeps its signature PLAUSIBLE |
| S23R4-05 | minor | BASE-F | build note disagrees with its volume | item 505 ships `hood.constants`' "four rows" at M1 and `terrace.siteShare` at M3a, and omits `WayNamingContext` at M1 |
| S23R4-06 | minor | V03 | restatement (term) | three texts put a storey-less stack's main entrance "at its stair's foot", which a sealed stack has no stair for |

### S23R4-01 — major — owner V03 — the main entrance and an `external` basement

**Claim.** V03's rule for `Entrance.storey` (BCR-V3-26's `storey` comment, V03 l. 2906 – 2910; 2.1, l. 479 – 484; 3.6's
**Entrance storeys**, l. 1551 – 1558) takes, for every entrance, "the level (basement levels included) whose floor at its
wing meets the outside ground at its vertex within `datum.maxSteps × riserCm`, the nearest where two meet; the main
entrance 0 where none meets". The base gives a wing `baseCm = max(samples) + plinthCm` (base l. 1390; `plinthCm` 30 cm),
the cellar floor `cellar.depthCm` 220 cm below it (l. 11514), and the walk-out (`Basement.access` `external`) where the fall
under the footprint exceeds `slopeCm` (l. 1532 – 1537); the tolerance is 3 × 20 = 60 cm (V03 l. 608, 612). A house whose
street runs along its low side with 130 – 250 cm of fall at its main entrance therefore opens its main entrance on storey
−1. For `external` the base's step 3 stops the core at the ground storey (l. 1601 – 1602, kept by BCR-V3-32's New text
"the core, where one serves the ground, stopping at the ground storey"; J-A29.25, l. 16963), so no stair joins storey −1
to storey 0. O2 roots the main tree "from the main entrance's room on its storey (`Entrance.storey`)" (V03 l. 1486): it
spans the basement, and every room of storey 0 and above is "left unreached" — F-PLAN tier 1 (3.9), while the base's
T28-2 ("starting at the main entrance … openings and stair cores lead to every room of every storey", l. 13332) fails.
The downhill-fronted walk-out is the common hill-town house; T-V3-30's fixtures (the terraced wards, the terrace-wall
sub-fixture, the two-street house) do not isolate it, and 3.6 foresees only "a side door on a walk-out's low side".
**Required change (V03).** (a) BCR-V3-26's `storey` comment (§10) and 2.1's copy, current "the level (basement levels
included) whose floor at its wing meets the outside ground at its vertex …, the nearest where two meet; the main
entrance 0 where none meets (opened with a stoop)" → "the level (basement levels included — for the main entrance only
where `Basement.access` is not `external`, whose core stops at the ground storey, §2.6 step 3) whose floor at its wing
meets the outside ground at its vertex …, the nearest where two meet; the main entrance 0 where none meets (opened with a
stoop)". (b) 3.6's **Entrance storeys** bullet, after "a side door on a walk-out's low side opens into the cellar." add:
"The main entrance of a building whose `Basement.access` is `external` reads the levels at or above the ground only: that
basement's core stops at the ground storey (§2.6 step 3; J-A29.25), so a main door on a basement level would strand every
storey above it. A walk-out house fronting its street downhill keeps its main entrance on level 0 with its stoop (O1 (e));
its basement is entered by the outside door at `basementDoor(b)`, under or beside the stoop. S11 derives the entrance
storeys after the basement decision, whose levels they read (seam S23R4-01)." (c) T-V3-30 gains "(S23R4-01) on a
downhill-fronted walk-out house — its street along its low side, 130 – 250 cm of fall at its main entrance, the fall under
its footprint past `cellar.slopeCm` — the main entrance's `Entrance.storey` is 0, never a basement level, and every room of
every storey is reached (T28-2)", the storey clause from M3a on the eager records (§8's PE), the reach from P1, and its
fixture list adds "the downhill-fronted walk-out house". (d) A J-V3 row: "chose the main entrance of an `external`
basement's building on the ground storey, with its stoop, over extending the core down to a basement level the main
entrance meets, because the base's `external` access stops the core at the ground storey (§2.6 step 3, J-A29.25, which
BCR-V3-32 and BCR-V2-33 both keep) and a basement holds service rooms only (3.7.1, A5), so the other reading would amend
two base texts and bring the entrance hall and the shared stair into the cellar; an outside flight to the main door with
the cellar door under it is a historical hill-street form. A side, rear, yard or service entrance still opens on a
basement level its ground meets." File f item 241 needs no change (the text is the request's own); no V01 or V02 text
reads a main entrance's storey.

### S23R4-02 — minor — owner V02 — `stackAccessDoor` among the stack helpers' readers; the approach strip's row

**Claim.** V03's `stackAccessDoor(b, a)` reads "volume 2's `stairChain` (stair 0, and its approach strip as V2 §4.6 bounds
it …)" and is built with PE at M3a (V03 l. 1653 – 1661; §1b l. 330). Volume 2's §1b stack-helpers row lists "volume 3's
eager facts at M3a — `ground(b)` and `floorCm` (V03 3.3), `basementDoor(b)` (`stairChain`: the stair wings and stair 0's
approach, V03 3.7.1)" (V02 l. 311), its §8.5 M3a-V2 cell "(read by `massStepped`, `rebaseStack`, the capacity and volume
3's eager `ground(b)`, `floorCm` and `basementDoor(b)`, V03 3.3 and 3.7.1; seam S23R2-14)" (l. 3479) and its
*Dependencies* sentence "(`ground(b)`, `floorCm`, `basementDoor(b)`; V03's PE)" (l. 3491): the new reader is missing at
the producer's end. Stair 0's approach strip — "the reserve's width, `landingM` deep in front of stair 0's foot (under
`internal`, `landingM` in front of the main entrance; under `none`, no strip)" — is defined only inside §4.6's
`addRange` bullet (l. 2760 – 2762), yet three rules read it (that placement, `basementDoor(b)` rule 2 and
`stackAccessDoor(b, a)`), with no §1b row naming it or them. V2 §12's round-4 PLAUSIBLE item on volume 3's S23R3-15 (b)
(l. 4317 – 4319) is now settled.
**Required change (V02).** (a) The §1b stack-helpers row's consumers: after "`basementDoor(b)` (`stairChain`: the stair
wings and stair 0's approach, V03 3.7.1)" add "and `stackAccessDoor(b, a)` (`stairChain`: stair 0 and its approach strip,
V03 3.7.2 (1); seam S23R4-02)". (b) A new §1b row: "stair 0's **approach strip** (item 110 fold) | derived region, never
stored: the stair reserve's width, `landingM` deep in front of stair 0's foot; under `internal`, `landingM` in front of the
main entrance; none under `none` (V2 §4.6) | `stairChain`'s stair 0 with its ring and `RoofSpec.high`, the main entrance
under `internal`, the constant `landingM` | V2 §4.6's ground-wing placement (`addRange`, `addTower`, `backRange`); volume
3's `basementDoor(b)` rule 2 and `stackAccessDoor(b, a)` (V03 3.7.1, 3.7.2 (1)) | §2.6 `Building` (the stack's wings)".
(c) §8.5's M3a-V2 cell: "… `ground(b)`, `floorCm` and `basementDoor(b)`, V03 3.3 and 3.7.1; seam S23R2-14)" → "…
`ground(b)`, `floorCm`, `basementDoor(b)` and `stackAccessDoor(b, a)`, V03 3.3, 3.7.1 and 3.7.2 (1); seams S23R2-14,
S23R4-02)"; the *Dependencies* sentence's list → "(`ground(b)`, `floorCm`, `basementDoor(b)`, `stackAccessDoor(b, a)`; V03's
PE)". (d) V2 §12's round-4 continuation PLAUSIBLE item → CONFIRMED: "volume 3's S6 reads 'a sealed stack whose every wing
is solid — one carrying a storeyed tier or shrine is planned and flagged by (e)' (its reconciliation round 4, second
brief)".

### S23R4-03 — major — owner V03 — the outside basement door and the crypt

**Claim.** `basementDoor(b)` places an `external` basement's door by rules 1 – 3 without reading the crypt (V03 3.7.1,
l. 1601 – 1633); the plan roots the basement's storeys at the room it opens into (O2's basement root, l. 1491 – 1496); and
O2 forbids every edge "between the crypt and any other basement room (the crypt is entered from the church above)"
(l. 1500). (i) A `basement`-class church has a crypt exactly when it has a full, half or walk-out basement (3.7.4; T-V3-23
(c)), so every walk-out parish church on a hill holds its crypt beside a cellar, the crypt seeded under the chancel
(`cryptSeedWings(b)`) and grown toward the main entrance to its `cryptM2` target. Where rule 1's wall side or rule 3's
lowest side lies on the crypt's ring, the door opens into the crypt: the crypt gains an entrance on the street, against
3.7.6 ("The crypt stairs are the crypt's entry", l. 1824) and volume 1's §0, which tells the owner that churches "keep
crypts in their basements, with no entrance of their own on the street — you go down from inside the church" (V01
l. 210 – 212); and the tree started in the crypt crosses no forbidden edge, so the cellar is unreached (T28-2). (ii) On a
great temple built solid (`ground(b)` absent; an `always` class, 3.7.4) whose cellar draw gives a basement larger than the
crypt, the crypt is trimmed "from its end nearer the main entrance" (3.7.4 step 2), while the tomb door opens "on the main
entrance's side … at that side's point nearest the main entrance" (rule 2): the door enters a cellar, the crypt's only
entry is that door (3.7.6, l. 1799 – 1803: no stair descends through a solid wing), and the forbidden edge leaves the
crypt unreached — T28-2 and T-V3-23 (e)'s "entered by the door at `basementDoor(b)`" fail.
**Required change (V03).** (a) 3.7.1, `basementDoor(b)`, before rule 1: "Where the building has `Basement.crypt` and
`ground(b)` exists, a door side counts for rules 1 and 3 only where the door's span — `door.mainCm` centred on the point
the rule gives — lies outside the crypt's ring: a church's crypt is entered from the church above by its crypt stairs
(3.7.6), never from the street; with no such side the result is `null`, the base's `trapdoor` fallback, reported (3.9),
as for a wall walk-out with no door side (seam S23R4-03)"; its input list and §1b's two `basementDoor(b)` rows add
"`Basement.crypt`'s ring (from M6-U, file f item 238; absent before, the rules reading as now)"; §8's PE row notes that
from M6-U the door of a walk-out church whose rule-1 or rule-3 side lay on its crypt moves, and volume 1's reserve with it
through the value its digest hashes — declared in M6-U's shift record with the crypt's first derivation. (b) BCR-V3-32's
New text, "on a side of `Basement.ring` at least two of step 4's wing-local modules long (a door's width):" → "on a side
of `Basement.ring` at least two of step 4's wing-local modules long (a door's width) — and, where a storeyed ground wing
stands over a crypt, whose door lies outside the crypt's ring:" (file f item 578 carries it by reference; no label
change). (c) O2's forbidden clause → "between the crypt and any other basement room (the crypt is entered from the church
above) — but on a building with no storeyed ground wing, where the crypt's entry is the tomb door (3.7.6) and the basement
holds rooms beside the crypt, one door of `door.entranceCm` joins the crypt to one adjoining basement room — the one the
basement root's tree reaches first, else, where the tree starts in the crypt, the adjoining room of least edge cost
(ties by room index) — so the crypt and those rooms are reached from the tomb door whichever it opens into (seam
S23R4-03)". (d) 3.7.6's "where `ground(b)` is absent … the crypt's entry is the basement's outside door at
`basementDoor(b)`" adds "— directly, or through O2's one crypt door from the room it opens into", and 3.9's row for the crypt's entry (l. 1878) reads "else the outside door at `basementDoor(b)`, directly or through O2's one crypt door, `cryptStair` noted". (e) T-V3-23 (e)'s
"entered by the door at `basementDoor(b)`" → "entered from the door at `basementDoor(b)`, directly or through O2's one
crypt door", and a new clause "(S23R4-03) on a walk-out `basement`-class church whose lowest ring side lies on its crypt,
the outside door lies outside the crypt's ring, else the basement takes the reported `trapdoor` fallback; the crypt is
entered only by its crypt stairs; every basement room is reached (T28-2); on a flat-topped great temple whose cellar draw
gives a basement larger than its crypt, the crypt and every basement room are reached from the tomb door" — the door
clause from M6-U on the eager records, the reach from P2. (f) A J-V3 row: "chose to keep a church's outside basement door
off its crypt (read from M6-U, declared) and to join a solid temple's crypt to the room its tomb door opens into by one
door, over one crypt door in every case or a crypt entered from the street, because a church's crypt is entered from the
church above (3.7.6; volume 1 tells the owner so) while a solid temple has no church above and its crypt's entry is the
tomb door; and over growing a solid temple's crypt toward its tomb door, because the crypt derivation's trim from the
entrance end is shared with every church and read by volume 4's crypt join, volume 6's rank and volume 10's why."

### S23R4-04 — minor — owner V01 — the landed `stackAccessDoor` in note (32) and §12

**Claim.** Cross-volume note (32) (V01 l. 3750 – 3755) reads volume 3's function "as S23R3-09 defines it — `{ wing, side,
at }`, `side` a ring side on the building's outline — … Volume 3's reconciliation carries the function; this volume is
designed as if it were applied", and §12's round-4 continuation keeps PLAUSIBLE "that volume 3's landed `stackAccessDoor(b,
a)` keeps S23R3-09's signature (note (32))" (l. 3960). Volume 3 landed it at 11:41, before volume 1's lane closed, as
`{ wing; side; at; fallback?: true } | null` (V03 l. 1657), `null` outside a building with neither a basement nor
`ground(b)`. The note restates volume 3's record, inexactly, instead of citing it.
**Required change (V01).** Note (32): "as S23R3-09 defines it — `{ wing, side, at }`, `side` a ring side on the building's
outline — and read only the outline side and `at`; W6 depends on it. Volume 3's reconciliation carries the function; this
volume is designed as if it were applied." → "as volume 3 declares it (V03 3.7.2 (1)) — reading only the outline side and
`at`, and only for the buildings on which it is not `null`; W6 depends on it. Landed by volume 3's reconciliation round 4,
second brief; nothing open." §12's clause moves to CONFIRMED: "volume 3's landed `stackAccessDoor(b, a)` (V03 3.7.2 (1))
returns S23R3-09's `wing`, `side` and `at`, with a `fallback` flag and `null` outside the reserve's buildings, neither read
here (seam S23R4-04)".

### S23R4-05 — minor — owner BASE-F — item 505's build note follows volume 1

**Claim.** File f item 505's *Build* note (file f l. 868) builds at M1 "`@plat/model`'s `HoodPlace`, `DistrictContext`
and `TypedBoundary` … and `@plat/tables`' `hood.constants` with the naming context's four rows (item 444)" and at M3a
"the two cells `terraceState` reads, `hood.constants`' `terrace.siteShare` and `hood.templates`' `stepped` row's
`params.terraceSpacingM`". Volume 1 now holds `hood.constants` as one `settings` row shipped whole at M1, every column at
its default, `terrace.siteShare` among them (V1-8.1, V01 l. 2977 – 2980 and 3000 – 3006; J-V1.99), M3a landing only the
`stepped` row's `params.terraceSpacingM`; and BCR-1's `@plat/model` list names `WayNamingContext` "from M1, S13a's naming
input" (l. 3220), which its note (35) asks file f's BCR-1 item to carry (l. 3764 – 3766). The file-f lane landed at
11:44, volume 1's at 11:50, so the note describes the table as it stood before. A builder reading item 505 ships a
four-row table at M1 that volume 1's compiler, register and T-V1-4 treat as one row of every column.
**Required change (BASE-F).** Item 505's *Build* note: "at M1 `@plat/model`'s `HoodPlace`, `DistrictContext` and
`TypedBoundary` with the `FabricStrategy` comment (…; items 207 (b), 210) and `@plat/tables`' `hood.constants` with the
naming context's four rows (item 444)" → "at M1 `@plat/model`'s `HoodPlace`, `DistrictContext`, `TypedBoundary` and
`WayNamingContext` (S13a's naming input, item 444) with the `FabricStrategy` comment (…; items 207 (b), 210) and
`@plat/tables`' `hood.constants` — its one `settings` row, whole, every column of volume 1's V1-3.14 column table at its
default, the naming context reading four (volume 1 §8.1; J-V1.99)"; "at M3a `TerraceState`, `terraceState` and
`stepProfile` (items 211, 245) with the two cells `terraceState` reads, `hood.constants`' `terrace.siteShare` and
`hood.templates`' `stepped` row's `params.terraceSpacingM`" → "at M3a `TerraceState`, `terraceState` and `stepProfile`
(items 211, 245) with `hood.templates`' `stepped` row's `params.terraceSpacingM`, which `terraceState` reads beside
`hood.constants`' `terrace.siteShare` (landed at M1)"; the reconciliation table gains the row (seam S23R4-05; volume 1's
note (35)). The label is unchanged. (The content-calibration seam, which owns SCC-R3C-9, may register the same text; the
lane applies it once.)

### S23R4-06 — minor — owner V03 — a storey-less stack's entrance, cited not restated

**Claim.** Volume 2's BCR-V2-41 puts a solid stack's main entrance at "the foot of its stair chain" and a sealed stack's
"on tier 0's front side" (V02 l. 4121 – 4128). Volume 3 restates the first and not the second: S6's "Where `ground(b)` is
absent, the main entrance stands at stair 0's foot and opens no plan door … the plan's root is the landing door of the
first storeyed wing the stair chain reaches" (V03 l. 1291 – 1293), 2.1's "a solid stack's main entrance at its stair's
foot, BCR-V2-41" (l. 483) and BCR-V3-26's closing paraphrase "the main entrance at its stair's foot opening no plan door,
the plan rooted at the first landing door, no plan above the ground where no wing is storeyed …" (l. 2913 – 2916). A
sealed stack has no stair 0 and no chain; round 3 worded its storeyed shrine alike in both volumes (S23R3-14, -15), but
these three texts still describe only the stair-reached form.
**Required change (V03).** (a) S6: "the main entrance stands at stair 0's foot and opens no plan door (`Entrance.storey`
null); the plan's root is the landing door of the first storeyed wing the stair chain reaches, in the chain's order" →
"the main entrance stands where volume 2's BCR-V2-41 puts it — at the foot of the stair chain, or on tier 0's front side
on a sealed stack — and opens no plan door (`Entrance.storey` null); the plan's root is the landing door of the first
storeyed wing the stair chain reaches, in the chain's order (a sealed stack has no chain: its storeyed wing falls to (e))".
(b) 2.1's "(ground(b) absent, 3.3: a solid stack's main entrance at its stair's foot, BCR-V2-41)" → "(ground(b) absent,
3.3: a storey-less stack's main entrance, where volume 2's BCR-V2-41 puts it)". (c) BCR-V3-26's closing sentence: "Rule
5's exception for a building whose every ground wing is solid — the main entrance at its stair's foot opening no plan
door, the plan rooted at the first landing door, no plan above the ground where no wing is storeyed (…; seam S23R3-15) —
is volume 2's BCR-V2-41" → "Rule 5's exception for a building whose every ground wing is solid is volume 2's BCR-V2-41",
citing it whole (seam S23R4-06).

## 5 Summary by owner, decisions, CONFIRMED versus PLAUSIBLE

**By owner.** V03: S23R4-01 (major), S23R4-03 (major), S23R4-06 (minor). V02: S23R4-02 (minor). V01: S23R4-04 (minor).
BASE-F: S23R4-05 (minor). **Order for the lanes:** each stands alone. S23R4-03 (b) edits BCR-V3-32's New text, which file f
item 578 carries by reference (no label moves); S23R4-02 (a) and (c) name the function V03 already defines; S23R4-05
follows volume 1's landed text. Where these land after this round, the next round of this seam re-checks them.

**Decisions (vetoable).**

| id | decision |
|---|---|
| J-S23R4.1 | Chose to **continue this lane's 07:42 skeleton** on the re-issued brief, re-checking all seventeen of round 3's issues (both its landings) and sweeping by **full diff since round 3's continuation inputs** (1 029 lines, snapshots hash-checked), with every changed mechanism traced into untouched text at both ends of the seam and the base, the round-3 citation census, and a **widened census** into volumes 4 – 12 — over re-reading 1.6 MB whole, because every earlier text of the seam has been read whole (rounds 0 – 1) or by full diff (rounds 2 – 3 and their continuations), and the repairs elsewhere this round could move this seam only through the citations and mechanisms the census and the trace cover (J-S23R3.7's method, one link further). The trace is where this round's two majors were found: both sit in text no lane touched since round 2 (3.6's entrance storeys, O2's forbidden crypt edge, `basementDoor(b)`'s rules), made live by round 3's basement root. |
| J-S23R4.2 | Chose, for S23R4-01, **the main entrance on the ground storey of an `external` basement, with its stoop**, over extending the core down to a basement level the main entrance meets, because the base's `external` access stops the core at the ground storey (§2.6 step 3, J-A29.25 — both kept by BCR-V3-32 and BCR-V2-33) and volume 3's basement holds service rooms only, so the other reading would amend two base texts under two requests and bring the entrance hall and shared stair into the cellar; the realism tiebreaker is met either way (the outside flight with the cellar door under it is a historical hill-street form). The stoop lengthens (up to about fourteen risers); volume 1's T-V1-26 stoop clause already carries its doubled-depth fallback. |
| J-S23R4.3 | Chose, for S23R4-03, **a church's outside basement door kept off its crypt** (read from `Basement.crypt` at M6-U, a declared one-time move with the crypt's first derivation) **and one crypt door for a solid temple**, over one crypt door in every case, because a church's crypt is entered from the church above — 3.7.6 states it and volume 1's §0 tells the owner so — while a solid temple has no church above and its crypt's only entry is the tomb door; and over growing a solid temple's crypt toward its tomb door, because the crypt's trim from the entrance end is one rule shared with every church and read by volume 4, volume 6 and volume 10. |
| J-S23R4.4 | Registered **S23R4-05** here, though `hood.constants`' shipping is the content-calibration seam's subject (SCC-R3C-9), because file f's item 505 is a request text of a volume on this seam and its disagreement with volume 1 is exact; a second registration there costs one duplicate id, a missed one a builder shipping the wrong table at M1. |
| J-S23R4.5 | Graded **S23R4-01 and S23R4-03 major**: each fails the base's hard bar T28-2 (and F-PLAN tier 1) on a common building — the downhill-fronted walk-out house; the walk-out parish church with its crypt — and S23R4-03 also contradicts what volume 1 tells the owner. Graded **S23R4-02, -04, -05, -06 minor**: wiring rows, a stale note, a build note and a restatement, each correct in the text that governs (V03's function, V01's §8.1, V02's BCR-V2-41). |

**CONFIRMED versus PLAUSIBLE.** CONFIRMED by reading the live text at the lines cited, with the input hashes unchanged from
start to end (V01 cbbfe6e8…, V02 34f5b1f5…, V03 735035b5…, file f 0da3c86c…, `_integrate.md` 965ab696…, base 01fea21f…):
every status of §2; every line of §1's five diffs; every claim of S23R4-01 – S23R4-06 at both ends (V03's 2.1, 2.3, 2.4,
3.6, O1 – O2, 3.7.1 – 3.7.6, 3.9, 5.1, §7's T-V3-22, -23, -28 – -30, §8's PE, BCR-V3-14, -26, -32, -33; V02's §1b rows,
§2.6's derived-at-read block, §4.6's approach strip, §8.5, BCR-V2-33, BCR-V2-41, §12; V01's §0, V1-3.8.2 step 5,
V1-3.8.3, V1-3.8.8, V1-3.14's column table, V1-8.1, BCR-1, notes (32) and (35), §12; file f items 230, 233, 241, 242,
371, 483, 505, 578, 584, 585; the base's `deriveBase`, *Basements*, the `cellar` row, step 3, step 5, T28-1 – T28-3,
§13.7's item-28 row, J-A29.25, §7.6's parity-preset sentences); that BCR-V3-14's, BCR-V3-33's and BCR-46's quotations and
headings stand once in the base (`grep`). CONFIRMED by executed script: both citation censuses (0 dangling; 521 section
pointers and 167 ids into volumes 4 – 12) and the md5 checks. PLAUSIBLE: the frequency S23R4-01 and S23R4-03 rest on — that
the default `cellar.slopeCm` lets a 130 – 250 cm fall at a main entrance make the basement a walk-out, and that a great
temple's class draws an ordinary cellar (volume 11's rows, not read) — though a single such building fails the hard bar;
the required texts themselves, until their owners apply them and the next round re-checks. Nothing was executed beyond
`diff`, `grep`, `md5`, `sed` and the two census scripts: this lane writes a critique.

**Outside this seam.** File f item 505's volume-1 half is also the content-calibration seam's (SCC-R3C-9; J-S23R4.4).
Volume 1's `access.<kind>M` column is a `coversEnum` over V1-3.8.8's symbol kinds, some of which (`sinkhole`,
`collapsed_shaft`, `ruin_entrance`, `catacomb`) volume 4 adds at M6-U while the row ships whole at M1 — the layers seam's
to confirm against V04's enum. Volume 11's registry rows 38 and 62 as volume 1 and volume 3 now read them are the
content-calibration seam's.
