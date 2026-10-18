# Seam check, round 2 — stage 2 · stage 3 · the plan rung (V01 neighbourhoods · V02 buildings · V03 interiors)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-stage2-3-r2; covered by the whole-design retrovalidation (J84).

Lane `volumes/seam-stage2-3-r2`, 2026-09-29. Reconciliation round 2 of this seam. Output: this file only — no volume, no
amendment file and no base text is edited by this lane. Every issue names **one** owning volume (or BASE-F, an item of
`docs/AMENDMENTS-2026-09-28f.md` that must change) and the exact change it needs (J-S23R1.1 kept).

PROGRESS
- §1 Method, inputs and coverage | done
- §2 Re-check of round 1 (S23R1-01..14 and the four carried round-0 halves) | done
- §3 Sweep (V01 seam sections whole; V02, V03, file f, `_integrate.md` by full diff since round 1's whole read) | done
- §4 Issue register (S23R2-nn) | done
- §5 Summary by owner, decisions (J-S23R2), CONFIRMED versus PLAUSIBLE | done
- §6 Continuation (re-issued brief, 2026-09-29 ~09:51): re-check of round 1's continuation S23R1-15..24 | done
- §7 Continuation sweep (V02, V03, file f, `_integrate.md` since round 3's inputs; V01 since round 1's continuation) | done
- §8 Continuation register (S23R2-09 … 15) | done
- §9 Continuation summary, decisions (J-S23R2.6 … 11), CONFIRMED versus PLAUSIBLE | done

**Outcome of the continuation (re-issued brief, 2026-09-29 ~09:51–10:08; §6 – §9).** Round 1's file gained ten issues
after this lane's first landing (S23R1-15 … 24, raised 09:14 by its continuation's whole read of V01); the reconcile
lanes' second briefs applied them, and **all ten are fixed** in the live text — so all 24 of round 1's issues are closed.
Round 4 was cut, so this continuation also swept every repair since round 3's inputs (full diffs of V02, V03, file f and
`_integrate.md`; V01 since round 1's continuation) and found round 3's eight issues applied. The sweep found **two new
majors**: file f item 233 ships the rest of `PlanGeometryRow` at M6-P although volume 3 now builds `Entrance.storey` and
`basementDoor(b)` at M3a with five of its cells, which volume 1's reserve reaches at M5 (S23R2-09, BASE-F); and a building
with no storeyed wing — a flat-topped great temple, an `always`-crypt class — gets an empty plan that drops its crypt, its
tomb door and its access heads, whose record cannot even hold a storey-less door (S23R2-10, V03). Five minors follow:
BCR-V2-41's "has no plan" (S23R2-11), the base text naming the tomb-door rule where `basementDoor(b)` takes a wall's side
first (S23R2-12), volume 1's inexact gloss of that rule (S23R2-13), the stack helpers' missing package (S23R2-14) and volume
3's one-ended §1b rows (S23R2-15). Continuation register: **7 issues — 0 blockers, 2 majors, 5 minors** (BASE-F 1/0, V03
1/1, V02 0/3, V01 0/1). Round 2 whole: **15 issues — 0 blockers, 5 majors, 10 minors.**

**Outcome of the first landing (05:27; history — round 3 re-checked S23R2-01 … 08 fixed).** All **14 round-1 issues are fixed** in their owners' text (and with them the four round-0 residuals S23-07,
S23-18, S23-30 and S23-31 they re-registered): V03 now seeds the crypt by `cryptSeedWings`, lays windows on V02's
`facadeBays` on every side, draws exterior flights by `stairTreads`, keys its village rows by the `v.` keys with a
`composition.classFamily` fallback, and cites landed texts; V02 re-keyed `composition.classFamily` by the `v.` keys,
names the tomb door, fixed its §10 lead and gave `facadeBays` one package home; V01 hatches flights by `stairTreads` and
routes a building click at the city and district bands; file f labels the half-cellar raise BASE (M2b) and carries the
deck-basement bend's third rung; `_integrate.md` drops the withdrawn low-building exception. The sweep found **two
mechanisms the seam disagrees on that no earlier round saw**: (1) **the ground of a levelled plot** — V01's `stepProfile`
reads `levelledGroundCm` (BCR-V5-30), V02's datum samples the raster, V03's outside ground reads "the levelled terrain",
and file f stages the one reader at M6-sky although its readers build at M3a; (2) **when a basement's door is outside** —
V02's BCR-V2-33 text (which file f item 371 applies) says "under a solid ground wing", V03 and V02's own integration note
say "where no ground wing is storeyed". Register: **8 issues — 0 blockers, 3 majors, 5 minors** (V02 2 majors, 2 minors;
V03 0 majors, 3 minors — one of them the levelled-ground citation; BASE-F 1 major).

## 1 Method, inputs and coverage

**Inputs as read** (md5 at start, 05:17, and unchanged at the end): `docs/volumes/V01-neighbourhoods.md` cb72db1f… (3 670
lines), `docs/volumes/V02-buildings.md` dc951b81… (4 276), `docs/volumes/V03-interiors.md` 3d02f097… (3 031),
`docs/AMENDMENTS-2026-09-28f.md` a85996a2… (1 167), `docs/volumes/_integrate.md` a8c72fb4… (367), `docs/ARCHITECTURE.md`
01fea21f… (unchanged since round 0); round 1: `docs/volumes/critique/seam-stage2-3-r1.md` (read whole) and its working
notes. Read for single facts: V05 §1b l. 373 and BCR-V5-30 (l. 3087–3101); V07 §2.4's `v.` key set through V02's and
V03's script-matched lists.

**Coverage (J-S23R2.1).** Round 1 read V02, V03, file f and `_integrate.md` whole at the states the reconcile lanes' backups
hold (V02 c459dd4d…, V03 a7b65077…, file f 40e2f8d6…, `_integrate.md` 1487de32… — hashes checked); this round read the **full
diff** of each file since those states (every changed line; file f's diff with its 350 dropped `l. N` pointers filtered by
script, the 28 substantive hunks read whole). **V01**, which round 1 never swept whole, was read whole in every section
the seam crosses — §0–§2.8, V1-3.1 – V1-3.4, V1-3.7.1 – V1-3.9, V1-3.17, §4, §5, §6, §7 and §8 — its full diff since round
1 (8b8a40eb…) was read, and its remaining sections (V1-3.5, V1-3.6, V1-3.10 – V1-3.16, §9 – §13) were searched for every
seam term (`V02`, `V03`, volume 2 / 3, wings, rooms, plan, `BaseWing`, composition, `Entrance`, `Basement`, crypt, stoop,
porch, stair, footprint, massing, elaborate) and each hit read in place. Every V01 citation of V02 and V03 was censused by
script and its target checked (the porch rows' `widthM`, `depthM`, `outside`; the `hood` secondary porch; `MassingRef`'s
`ovalCourt`; BCR-V2-24's footprint court; J-V2.71; V2 §3.16, §3.17 (b); V03 3.7.1 – 3.7.3, O1 (e), 5.4, J-V3.73). Every
new record or key a round-2 lane added (`programmeSource.via`, the `v.` rows, the classFamily fallback, the `facadeBays`
home, `stairTreads` readers) was traced to its producer and consumer in all three volumes. Working notes:
`scratchpad/volumes/seam23r2/notes.md`; diffs `d1.txt`, `d2.txt`, `d3.txt`, `df-real.txt`, `di.txt` there.

## 2 Re-check of round 1

| id | r1 sev. | owner | status | evidence (current file, line) |
|---|---|---|---|---|
| S23R1-01 | major | V03 | **fixed** | 3.7.4 step 1 seeds under `cryptSeedWings(b)`, else the far third (l. 1569–1572); BCR-V3-20 (l. 2629–2630); §1 (l. 229), §1b (l. 276, 281), §2.5 (l. 909); T-V3-23 (i) |
| S23R1-02 | major | V03 | **fixed** (a quote on V02's side: S23R2-07) | W2 on `facadeBays(wing, side, bayM)` on every side, no restated law (l. 1453–1456); §1b l. 307; T-V3-5; J-V3.41; 3.12 (9) l. 1778 |
| S23R1-03 | major | V03 | **fixed** | 5.1's exterior flights by `stairTreads(w)` (l. 2032–2033); 5.3 JSON (l. 2091) and glTF (l. 2125–2127) |
| S23R1-04 | major | V01 | **fixed** | V1-5.1.2 *Stair flights* by `stairTreads(w)`, the 2 px omission (l. 2463–2466); §1.2 l. 273; §1b l. 371; note (7) |
| S23R1-05 | major | BASE-F | **fixed** | item 226's split label, **BASE (M2b, with §2.6's basement gate)** for the half raise, M6-U for the crypt parts; the header's exception (file f l. 25) |
| S23R1-06 | major | V02 | **fixed** | V2 §3.10.5 keyed by the 25 `v.` keys, `scope` withdrawn (l. 1765–1783); `ClassFamilyRow` (l. 605); chain step 3 (l. 867–869); `v.longhouse` override (l. 1630); pairing load check (l. 1811–1814); T-V2-33; J-V2.96 |
| S23R1-07 | major | V03 | **fixed** | 2.4's village rows by `v.` key, each town row named (l. 804–817); `v.bakehouse`, `v.shop` rows; the fallback for eight keys (l. 819–827) — every composition key it reaches (`dwelling-compound`, `landing-yard`, `yard`, `hovel`, `kiln-yard`, `works-noxious`, `tower`) has a V03 family row (l. 699–729), `v.pound` places no building; A1, A2 (4), T-V3-1 |
| S23R1-08 | minor | V01 | **fixed** | V1-3.8.1 (l. 1549–1551) |
| S23R1-09 | minor | V03 | **fixed** (the same class elsewhere: S23R2-05) | 3.3 (l. 1138–1140), BCR-V3-15 (l. 2577), BCR-V3-19 (l. 2613), §8 (l. 2295), BCR-V3-30 (l. 2729), §12 (l. 2827–2828) |
| S23R1-10 | minor | V02 | **fixed** | V2 §3.15.3 names the tomb door (l. 2265–2266); X18 |
| S23R1-11 | minor | V02 | **fixed** | §10's lead (l. 3485–3486) |
| S23R1-12 | minor | V02 | **fixed** | BCR-V2-18's added sentence (l. 3634–3637); V2 §2.4's declaration (l. 618); §1b (l. 243); §8.1 (l. 3303–3304); M6b row |
| S23R1-13 | minor | V02 | **fixed** (applied by reconcile-BASE-F-r2, one text with TR-24) | `_integrate.md` J-VI.5 (l. 147), H3 (l. 179), the dated note (l. 166) |
| S23R1-14 | minor | BASE-F | **fixed** | file f item 305's third rung; V02 BCR-V2-34 (l. 3835–3838) and V2 §1b's bend row (l. 264) |

**Totals.** 14 of 14 fixed; with them the four round-0 residuals (S23-07 → S23R1-03/-04, S23-18 → S23R1-08, S23-30 →
S23R1-02, S23-31 → S23R1-01) are closed. Round 1's one-owner-per-issue rule worked: every second-volume half this time
reached its lane.

## 3 Sweep

### 3.1 The record chain — block → plot → building → wing → storey → room

Round 1's table holds on the new text: the `v.` village keys now resolve end to end (V07's 25 keys = V02 §3.10.5's rows =
V03's 17 own rows + 8 through the fallback; every fallback key lands on a V03 family row), the crypt's seed and the façade
bays are single-sourced in V02, the tread law is one. **Two new breaks, both at the ground under a building:**

1. **A levelled plot's ground has three readings.** BCR-V5-30 (file f item 309) makes item 110 (a)'s levelling "a
   platform datum and never a write to the `Terrain` raster", read only through `levelledGroundCm(doc, key, p)`, and names
   "the buildings' datum step (volume 2's `deriveBase`)" and "volume 1's `stepProfile`" among its readers (V05 l. 3087–3101;
   V05 §1b l. 373). V01 reads it (`stepProfile`, V1-2.3 l. 584, §1b l. 365, BCR-43 l. 3356). **V02 never names it:** its
   datum is "from the terrain sampler (bilinear on the refined 2.5 m raster at the wing's vertices and centroid)"
   (BCR-V2-32 l. 3788–3789, file f item 370), and BCR-V2-42's wall-band rule (l. 3914–3920, item 231; V2 §3.17 (a)
   l. 2362–2369; J-V2.72) exists to stop "the bilinear blend across the step" — a step only a levelled raster holds. **V03**
   reads "the levelled terrain" (W2's outside ground, l. 1429–1434; §1b l. 180, 290). Built as written, V01 draws the
   terrace wall's step from the platform datums while V02 seats the house on the unlevelled slope (S23R2-01), and **file f
   labels the reader STAGED (M6-sky)** although V01's `stepProfile` (V1-8.1, M3a) and V02's datum pass (M3a-V2, items 370
   and 231) build at M3a (S23R2-02). V03's missing citation is S23R2-06.
2. **When is a basement's door outside?** V02's BCR-V2-33 — the text file f item 371 applies to §2.6 *Basements*, with no
   note — ends "`Basement.access` is `external` under a solid ground wing (volume 2 §3.15.3)" (l. 3825), and V2 §3.15.3 says
   "Under a solid tier 0 the basement's access is `external`" (l. 2264–2265). V03 decided the opposite for a mixed ground
   floor: `external` only "where `ground(b)` is absent (no storeyed ground wing)" (3.7.1 l. 1487–1488; J-V3.88 l. 2390: "Chose
   'no storeyed wing stands on the ground' over 'a solid ground wing'"; l. 1484–1486: "the arena's seating beside its ring, a
   stepped temple with a storeyed annex … never forced outside"). V02's integration note IN-V02-2 (a) (l. 4171–4173) adopts
   V03's words by supersession, but the BCR text the base-change applier reads was never edited. An arena (V03's `arena`
   row plans basement cells, l. 798) or a stepped temple with a storeyed annex gets `external` from the base and an inside
   stair from the plan; V01's entrance reserve then adds a tomb-door rectangle (V1-3.8.2 step 5, l. 1601–1603) for a door
   that is not there (S23R2-03).

### 3.2 The elaboration ladder

Unchanged since round 1 and consistent: the building click at every band (V01 V1-3.8.1, V02 §3.11, V03 §4.5), the
outline close-up's `wings` raise (V01 V1-3.8.1, V1-3.8.9), the per-rung staleness (BCR-V2-13; V03's requests scoped to the
`plan` rung). V03's new `PlanReport.programmeSource.via` (l. 496–497) has its producer (A1 (3)) and its readers (the report,
the room why, T-V3-1).

### 3.3 Classes, rows, terms, ids, units

**Classes.** One set: V07's `v.` keys everywhere a village building is resolved. V02's §1b row for the resolution chain
(l. 222) does not list volume 3's A1 (3), which now reads `composition.classFamily` (S23R2-08). **Terms.** "The walk-out"
is BCR-V3-27 (a)'s at a retaining wall and the tomb door V03 3.7.1's — V02 §3.17 (a) still points at "volume 3's door
(X18)" where IN-V02-2 (b) says it points at BCR-V3-27 (a) (S23R2-07). **Citations.** V03 still words five rules "as
critique/… words it" or through a critique's BCR where the BCR has landed in V02, and keeps a conditional request file f
resolved (S23R2-05). **Units.** No disagreement found: treads by `stairTreads` in all three, datums in cm, bands in metres
as each record types them.

### 3.4 Wiring across the seam

| piece | produced by | consumed by | status |
|---|---|---|---|
| `levelledGroundCm` | BCR-V5-30 (file f item 309, STAGED M6-sky) | V01 `stepProfile` (M3a); V02's datum (claimed by V05, not by V02); V03 W2's outside ground (named by neither) | **unwired on the V02 and V03 side, producer staged after its M3a readers** (S23R2-01, -02, -06) |
| `Basement.access` `external` | §2.6's basement function (BCR-V2-33 via item 371) | V03 3.7.1's tomb door, V01's entrance reserve, V02 §3.15.3 | **two conditions** (S23R2-03) |
| `cryptSeedWings(b)` | V02 §3.14.5 (c) | V03 3.7.4, BCR-V3-20 | wired |
| `stairTreads(w)` | V02 §2.6 | V02 §5.6, V01 V1-5.1.2, V03 5.1 / 5.3 | wired |
| `facadeBays(w, side, bayM)` | V02 §3.7 (`@plat/plots`) | V03 W2, §8.4's lit windows | wired (V02's quote of W2 stale: S23R2-07) |
| `composition.classFamily` (`v.` keys) | V02 §3.10.5 | V02 chain step 3; V03 A1 (3), slot order; V07 | wired; V02 §1b omits V03 (S23R2-08) |
| `programmeSource.via` | V03 A1 (3) | the plan report, the room why, T-V3-1 | wired |
| the half cellar's raise | BCR-V2-28 (a)–(b), item 226 BASE (M2b) | `deriveBase`, `rebaseStack`, V03 3.3 | wired |
| `bend.deck.basement` (three rungs) | V03 §4.2 | file f item 305, V02 BCR-V2-34 and §1b, V09, V10 | wired |

### 3.5 File f and `_integrate.md`

File f's round-2 items read cleanly on this seam but for item 309 (S23R2-02) and item 371's missing note (carried by
S23R2-03's V02 fix; no file f edit is needed once BCR-V2-33's text is right). Items 230 and 241 resolved the rule-5 text in
favour of BCR-V2-41, which V03's BCR-V3-26 has not caught up with (S23R2-05). `_integrate.md` J-VI.14 now lists deck-plot
and retaining-wall suppressions (item 260); V01 and V02 read the committed plot set and restate no removal rule, so
nothing on this seam contradicts it.

## 4 Issue register (round 2)

Counts: **8 issues — 0 blockers, 3 majors, 5 minors.** Owners: V02 2 majors, 2 minors; V03 3 minors; BASE-F 1 major.

| id | sev. | owner | kind | the claim in one line |
|---|---|---|---|---|
| S23R2-01 | major | V02 | contradiction / unwired reader | V02's datum samples the raster; BCR-V5-30 makes levelled ground a datum read only by `levelledGroundCm`, which V01 reads |
| S23R2-02 | major | BASE-F | milestone label / unwired producer | item 309 (BCR-V5-30) is STAGED (M6-sky) though its readers build at M3a; V03 missing from *Needed by* |
| S23R2-03 | major | V02 | contradiction (base text) | BCR-V2-33 and V2 §3.15.3 make a basement's access `external` "under a solid ground wing"; V03 J-V3.88: only where no ground wing is storeyed |
| S23R2-04 | minor | V03 | citation (single source) | 3.7.1 and §1 source the tomb-door condition "as critique/V03.md V3C-82 words it" |
| S23R2-05 | minor | V03 | citation / stale conditional | rules sourced through critique files though landed in V02; BCR-V3-26's "should _integrate not apply BCR-V2-41"; §12's "not yet landed" |
| S23R2-06 | minor | V03 | unnamed reader | W2's outside ground reads "the levelled terrain", not `levelledGroundCm` |
| S23R2-07 | minor | V02 | stale pointer / quote | V2 §3.17 (a)'s walk-out points at "volume 3's door (X18)"; V2 §3.7 quotes a W2 sentence that no longer stands; X30 and §13 read as pending |
| S23R2-08 | minor | V02 | wiring table | §1b's resolution-chain row and §3.10.5 omit volume 3's A1 (3) as a reader of `composition.classFamily` |

### S23R2-01 — major — owner V02 — the datum reads the raster where the design reads levelled datums

**Claim.** BCR-V5-30 (file f item 309; V05 l. 3087–3101): "A levelled block, plot or ward is a **platform datum** and
**never a write to the `Terrain` raster**. Levelled heights have one reader function, `levelledGroundCm(doc, key, p)` … Its
readers: the buildings' datum step (volume 2's `deriveBase`) … the retaining walls' derived step profile (volume 1's
`stepProfile`)". V01 reads it (V1-2.3 l. 584; §1b l. 365; BCR-43 l. 3356). V02's datum text — the text the base-change
applier writes into §2.6 through items 370 and 231 — reads "every other wing's `baseCm` from the terrain sampler (bilinear
on the refined 2.5 m raster at the wing's vertices and centroid) is `max(samples) + plinthCm`" (BCR-V2-32 l. 3788–3789),
and BCR-V2-42 (l. 3914–3920), V2 §3.17 (a) (l. 2362–2369) and J-V2.72 (l. 3451) justify the wall-band move by "the bilinear
blend across the step", which exists only in a levelled raster. V02 names `levelledGroundCm` nowhere; its §1b has no row
for it. Built as written: the raster is unlevelled (BCR-V5-30), so a terraced row's houses take `baseCm` from the natural
slope while V01's wall shows the platform step — houses float above or sink below their own terrace, and T-V2-51 tests a
rule on a surface the base never produces.
**Required change (V02).** BCR-V2-32's clause → "every other wing's `baseCm` is `max(samples) + plinthCm`, the samples
`levelledGroundCm(doc, key, p)` (BCR-V5-30: the platform datum of the levelled plot, block or ward holding `p`, else the
raster bilinear) at the wing's vertices and centroid"; BCR-V2-42's added text → "— a sample point within
`terrace.wallBandCm` of a `RetainingWall` chain is replaced by the point moved along the wall's normal, toward the side
that holds the wing's centroid, until it lies `terrace.wallBandCm` from the wall's line, so `levelledGroundCm` reads the
wing's own terrace, never the platform across the wall"; V2 §3.17 (a)'s *datum* sentence and J-V2.72's amendment say the
same ("never the terrace across the wall" in place of "the bilinear blend across the step"); V2 §1b gains the row
"`levelledGroundCm` (BCR-V5-30) | base reader | S10–S11's levelling | `deriveBase` and `rebaseStack`'s ground wings (BCR-V2-32,
-42), the dig floor, the basement gate's fall | §2.6, §4.7"; T-V2-51 adds "(c) every ground wing's `baseCm − plinthCm`
equals `levelledGroundCm`'s maximum over its samples on a levelled plot, within 1 cm". Each changed clause is marked
"reconciliation round 3, S23R2-01". The file f items 370 and 231 are then applied after item 309's ground part (S23R2-02).

### S23R2-02 — major — owner BASE-F — item 309's label stages the one reader of levelled ground after its readers

**Claim.** File f item 309 (l. 317): "BCR-V5-30 … *Needed by:* V01, V02, V04, V05 (`levelledGroundCm`'s readers).
**STAGED (M6-sky)**." Its readers build earlier: item 110 (a)'s levelling and retaining walls are BASE at M3a (items 245,
370, 231: **BASE (M3a …)**); V01 lands `stepProfile` "with item 110's base milestone" at M3a (V1-8.1 l. 2756–2760), reading
`levelledGroundCm`; V02's datum pass is M3a-V2. From M3a to M6-sky the design names no reader of levelled heights, and at
M6-sky the rule "never a write to the raster" arrives as an undeclared shift of every terraced building's datum. The
item's *Needed by* omits V03, whose W2 reads the same ground (S23R2-06), and it carries no order against items 370 and
231, whose datum sentence it governs.
**Required change (BASE-F).** Item 309's label → "**BASE (M3a, with item 110 (a)'s levelling) for the platform-datum rule
and `levelledGroundCm` on the ground arena; STAGED (M6-sky) for the sky key (V05 §3.22 (4)) and the sky readers (V5
§3.9 (4)–(5), §3.10 (5))**"; its note gains "Applied before items 370 (BCR-V2-32) and 231 (BCR-V2-42), whose datum
samples read `levelledGroundCm` (S23R2-01); BCR-V5-30's closing clause ('Should the application need levelled heights in
the raster …') is not taken — levelled heights are datums only (the one-reader rule)" and "its readers include volume 3's
W2 outside ground (V03 3.6)"; *Needed by* → "V01, V02, V03, V04, V05". File f's reconciliation table gains the row
(S23R2-02). No volume text changes for the label.

### S23R2-03 — major — owner V02 — the outside basement door's condition in the base text

**Claim.** BCR-V2-33 ends "and `Basement.access` is `external` under a solid ground wing (volume 2 §3.15.3)" (l. 3825);
file f item 371 applies that text with no note. V2 §3.15.3: "Under a solid tier 0 the basement's access is `external`
(BCR-V2-33)" (l. 2264–2265). V03 ruled the other way and says why: "Chose 'no storeyed wing stands on the ground' over 'a
solid ground wing' as the one condition for the outside basement door, because a basement that a storeyed ground wing's
core can reach must not be forced outside" (J-V3.88, l. 2390; 3.7.1 l. 1484–1488). V02's own IN-V02-2 (a) (l. 4171–4173)
adopts V03's words — "external where no wing standing on the ground is storeyed" — by supersession, but the clause the
applier copies is unchanged. For an arena (a solid seating ring beside the storeyed façade ring; V03's `arena` row plans
basement cells, l. 798) or a stepped temple with a storeyed annex, the base writes `external`, the plan joins the basement
by an inside core, and V01's entrance reserve (V1-3.8.2 step 5) reserves ground for a tomb door that is never drawn.
**Required change (V02).** BCR-V2-33's last clause → "and `Basement.access` is `external` where no ground wing reaches
storey 0 (every wing standing on no other wing is solid, volume 2's `storeyRange`), its door placed by volume 3's tomb-door
rule (V03 §3.7.1)"; V2 §3.15.3's sentence → "Where no ground wing is storeyed (a solid tier 0 with no storeyed annex) the
basement's access is `external` (BCR-V2-33), volume 3 placing its door by its tomb-door rule (V03 §3.7.1; …)"; IN-V02-2 (a)
reads "applied in BCR-V2-33 and V2 §3.15.3 (reconciliation round 3, S23R2-03)" and quotes no critique; T-V2-44 or T-V2-46
gains "a stack with a storeyed ground annex and a basement has `Basement.access` ≠ `external`". File f item 371 then needs
no note.

### S23R2-04 — minor — owner V03 — the tomb-door condition sourced to a critique

**Claim.** V03 §1 (l. 210: "BCR-V2-33, its external-access condition as critique/V03.md V3C-82 words it"), 3.7.1 (l. 1488:
"the one condition BCR-V2-33 states as critique/V03.md V3C-82 words it") and BCR-V3-27's closing (l. 2702) point the
implementer at a critique for the rule's words; the firewall (§17.1) gives the implementer the base and the volume.
**Required change (V03).** The three places cite "volume 2's BCR-V2-33 (the access `external` where no ground wing is
storeyed)" — the text S23R2-03 writes — with V3C-82 kept as provenance in parentheses only; J-V3.88 unchanged.

### S23R2-05 — minor — owner V03 — critique-routed citations and a resolved conditional

**Claim.** Rules landed in V02 are still cited through critique files: l. 183 and l. 1199 ("critique/V02.md V2C-53's
BCR-V2-41"), l. 1433 ("the reading critique/V02.md V2C-57's BCR-V2-42 gives"), l. 2422 ("critique/V02.md's BCR-V2-41 and
BCR-V2-42 as volumes/_integrate applies them"). BCR-V3-26 (l. 2687–2688) keeps a conditional — "should volumes/_integrate
not apply BCR-V2-41, this request carries its text" — that file f resolved (item 230: BCR-V2-41 "carries rule 5 for both
volumes"; item 241: "Its rule-5 text is dropped"), so the request states an open choice and a second copy of rule 5. §12
(l. 2812–2815) still says "Routed findings not yet landed in their volumes — critique/V02.md's BCR-V2-41 and BCR-V2-42,
V2C-55's chimney draw, V2C-59's `ovalCourt`, V2C-61's `Storey.level` … are read as their critiques word them"; all have
landed in V02 (its second revision, 01:37).
**Required change (V03).** l. 183, 1199, 1433, 2422 cite "volume 2's BCR-V2-41" / "volume 2's BCR-V2-42" (the critique id
kept as provenance in parentheses); BCR-V3-26's sentence from "is critique/V02.md V2C-53's BCR-V2-41, cited; should …" to
the end of its conditional → "is volume 2's BCR-V2-41 (file f items 230 and 241: rule 5 is carried there; this request
carries no rule-5 text)"; §12's sentence → "V02's BCR-V2-41, BCR-V2-42, V2C-55's chimney draw, `ovalCourt` and
`Storey.level` read as landed (V02 dc951b81…); critique/V04.md's `archVault` grade-face marks and volume 11's stepped class
ids as their volumes state them".

### S23R2-06 — minor — owner V03 — the outside ground's reader

**Claim.** W2's outside ground is "the levelled terrain" (l. 1429–1431), and §1b (l. 180, 290) names "the levelled terrain
(S10, S11)". Under BCR-V5-30 the levelled heights live in no raster; the one reader is `levelledGroundCm`. A builder who
samples the terrain raster gets the unlevelled slope at every terraced house's wall — the exposure gates, `Entrance.storey`
and the walk-out misread. (The same class as the layers seam's SLR1-16 and SLR1-17, graded minor there.)
**Required change (V03).** W2's *Outside ground* sentence: "the levelled terrain" → "`levelledGroundCm(doc, key, p)` at the
sample point (BCR-V5-30: the levelled platform's datum, else the raster)"; its "the terrain of the terrace on the chain's far
side" → "`levelledGroundCm` on the chain's far side"; §1b l. 180 and l. 290 name BCR-V5-30's reader; BCR-V3-28's outside
digest hashes the `levelledGroundCm` values it read.

### S23R2-07 — minor — owner V02 — two stale pointers and a quote

**Claim.** (a) V2 §3.17 (a) (l. 2369–2371): "A walk-out basement where the plot's low edge is a wall is §2.6's basement rule
reading the fall there, with volume 3's door (X18)" — IN-V02-2 (b) (l. 4173–4174) says the sentence "points at BCR-V3-27
(a) (the walk-out at a retaining wall), which carries the rule", but it was not edited. (b) V2 §3.7 (l. 1347) quotes
"volume 3's W2: 'on every side, volume 2's `facadeBays(wing, side)`'"; W2 now reads "On every side of every wing, volume 2's
`facadeBays(wing, side, bayM)`" (V03 l. 1453–1454), and V03's round-2 hand-off (l. 2935–2939) asks V02 to quote it or drop
the quote. (c) X30 (l. 4143) and §13's round-1 paragraph (l. 4098) list V03's W2, 3.7.4 and 5.1 citations as pending; V03
applied them in its round 2.
**Required change (V02).** (a) the sentence → "A walk-out basement where the plot's low edge is a wall is volume 3's
BCR-V3-27 (a) (§2.6's basement rule reading the step there; its door on that side)"; (b) the parenthesis → "(volume 3's
W2: 'On every side of every wing, volume 2's `facadeBays(wing, side, bayM)`'; §2.6 step 6)"; (c) X30's fallback cell and
§13's sentence read "applied by volume 3's reconciliation round 2 (V03 RC2.1–RC2.3)".

### S23R2-08 — minor — owner V02 — `composition.classFamily`'s second reader

**Claim.** V03 A1 (3) now resolves a `v.` key without a programme row through the row its `composition.classFamily` key
names, and its slot order reads the same key (V03 l. 819–827, 963–964, 968; J-V3.111). V02 §1b's resolution-chain row (l. 222)
lists as consumers "M1 (every slot's row), `MassingRef.row`, `Composition.row`, T-V2-33, the why provider", and §3.10.5
(l. 1765–1771) names volume 7 as the table's keeper but no reader outside V02 — a one-ended hook under the owner's wiring
rule.
**Required change (V02).** §1b's row adds "volume 3's A1 (3) and slot order, for a `v.` key without a programme row (V03
2.4; J-V3.111)"; §3.10.5's lead adds "read also by volume 3's programme resolution (V03 A1 (3)), so a change of a row's key
changes that village building's rooms as well as its massing".

## 5 Summary by owner, decisions, CONFIRMED versus PLAUSIBLE

**By owner.** V02: S23R2-01 (major), S23R2-03 (major), S23R2-07, S23R2-08 (minor). V03: S23R2-04, S23R2-05, S23R2-06
(minor). BASE-F: S23R2-02 (major). V01: none — its round-2 text holds against V02 and V03 at every place checked.
**Order for the lanes:** BASE-F's S23R2-02 and V02's S23R2-01 describe one change (the datum reads `levelledGroundCm`,
the reader lands at M3a) and should be applied in the same round; V03's S23R2-04 cites the text V02's S23R2-03 writes.

**Decisions (vetoable).**

| id | decision |
|---|---|
| J-S23R2.1 | Chose to cover V02, V03, file f and `_integrate.md` by **round 1's whole read plus the full diff since** (every changed line, file f's pointer-only hunks filtered by script and the rest read whole), and V01 by a **whole read of every section the seam crosses plus a seam-term search of the rest**, over re-reading 1.4 MB whole, because round 1 read the first four whole at hashes the backups reproduce exactly, V01's non-seam sections (the fabric draw, the unit run's sky partition, constants, presets) name no V02 or V03 record, and the owner's efficiency standard puts the ~300k-token budget on the places a contradiction can live; the precedent is seam-time-r1's and seam-content-calibration-r1's method. |
| J-S23R2.2 | Chose to register the **levelled-ground reader on this seam** (S23R2-01, -02, -06), over leaving it to the layers seam that found SL-26 / SLR1-16 – -18, because the disagreement is between V01's wall and V02's house on one plot — this seam's record chain — and the layers seam's round-1 fixes routed V01 and V04 but never V02 or V03. |
| J-S23R2.3 | Chose **BASE (M3a) for item 309's ground part** (S23R2-02), over re-staging `stepProfile` and V02's wall-band rule to M6-sky, because item 110 (a)'s levelling, its walls and V02's terraced datum are all M3a (items 245, 370, 231), the second known-city fixture's terraced wards stand at M3a, and a reader that arrives later would shift every terraced building once, undeclared. |
| J-S23R2.4 | Chose to **take V03's condition for the outside basement door** (S23R2-03) over V02's BCR wording, because V02's own integration note already adopts it, J-V3.88 gives the reason (a basement a storeyed ground wing reaches is joined inside), and the arena and annexed temples the fixtures hold would otherwise draw an inside stair beside an outside door. |
| J-S23R2.5 | Chose to grade V03's "levelled terrain" (S23R2-06) **minor**, over major, for consistency with the layers seam's SLR1-16 and SLR1-17 (a reader that names the ground but not BCR-V5-30's function), while grading V02's (S23R2-01) **major**, because V02's text specifies a contradicting mechanism (the raster sampler), not a missing name. |

**CONFIRMED versus PLAUSIBLE.** CONFIRMED by reading, at the lines cited: every status of §2 (each fix read in the current
file and located by `diff` against the reconcile lanes' backups, whose hashes equal round 1's inputs); every claim of
S23R2-01 – S23R2-08 (V02's BCR-V2-32, -33, -42, §3.15.3, §3.17, §1b, IN-V02-2, X30 read whole; V03's §1, §1b, 2.4, A1,
3.7.1, W2, BCR-V3-26 – -28, J-V3.88, §12 read whole; V05's BCR-V5-30 and §1b row; file f items 226, 230, 231, 241, 245, 305,
309, 370, 371 and the round-2 section read whole); the fallback's seven composition keys each matched to a V03 family row
by `grep`; the input hashes unchanged from start to end. PLAUSIBLE until the owners apply the changes and round 3
re-checks: the required texts themselves, and J-S23R2.3's milestone reading (the base's §16 row and file f's labels
support it; no build has run). Nothing was executed beyond `diff`, `grep`, `md5` and a line-filter script: this lane
writes a critique.

**Outside this seam.** V05's BCR-V5-30 reader list should name volume 3's W2 once S23R2-02 and -06 land (a wording edit on
V05's side, the layers seam's to confirm). The `v.` keys' other readers (V04's counted church classes, V06, V08) are the
settlements and time seams'.

## 6 Continuation — re-check of round 1's continuation (S23R1-15 … 24)

*Re-issued brief, 2026-09-29 ~09:51 (lane-events NOTE of that time).* Round 1's file now ends with ten issues its
continuation raised at 09:14 — after this lane's 05:27 landing — and round 4, which was to carry them, was cut with a
skeleton only. The reconcile lanes' second briefs applied them (V03 09:21, V01 09:27, file f 09:27, V02 09:30). Each is
re-checked here in the live text: **inputs** (md5 at this continuation's start, snapshots in the session scratchpad's
`volumes/seam23r2c/now/`): V01 7ba65e0b… (3 977 lines), V02 bd45a3b4… (4 658), V03 1bf49bc9… (3 272), file f ae1bb8ca…
(1 442), `_integrate.md` 965ab696… (468), the base 01fea21f… (unchanged since round 0).

| id | r1 sev. | owner | status | evidence (live file, line) |
|---|---|---|---|---|
| S23R1-15 | major | V01 | **fixed** | V1-3.8.2 step 5 sizes the reserve from the `PorchKindRow`s "of volume 2's `composition.json`, shipped from M3a-V2" (l. 1642–1644); V1-3.8.3's digest adds "the `PorchKindRow` slice of `composition.json` the reserve reads" (l. 1674); §1b's reserve row and §1.2's V02 row name the file and milestone (l. 379, 310); W6 depends on the rows (l. 2892); T-V1-26's clauses dated M6b / M6-P / M5 (l. 2815); T-V1-15's `editTable` clause (l. 2804); J-V1.75 revised (l. 3037) |
| S23R1-16 | major | V02 | **fixed** | V2 §8.5's M3a-V2 cell ships "the `PorchKindRow`s (data only …)" (l. 3468); §1b's `composition.json` row names volume 1's reserve and digest (l. 240); §3.10.10's small-tables line: the M3a-V2 seat writes their entries (l. 2002); J-V2.104 (a) |
| S23R1-17 | major | V02 | **fixed** | BCR-V2-24's heading and *Build note* — the hole sentence at M3a, the rest at M6, the readers, the declared one-time retyping (l. 3827, 3842–3851); BCR-V2-39's list (l. 4082–4087); V2 §10's opening (l. 3610–3613); §3.5's floor (l. 1142); the M3a-V2 and M6a cells (l. 3468, 3435); T-V2-42's clause (l. 3212) and its registration (l. 1986); J-V2.104 (b) |
| S23R1-18 | minor | BASE-F | **fixed** | item 303: **BASE (M3a, with item 229's base outline builder) for its hole sentence … STAGED (M6, stage 3) for the rest** (file f l. 314); V01 in *Needed by* of items 216, 227, 241, 303, 305, 371, 406, 419 (l. 101, 123, 151, 314, 318, 495, 582, 617); item 229 names the unit (l. 127); the reconciliation table's row (l. 1398) |
| S23R1-19 | minor | V01 | **fixed** | the reserve at every `service` entrance and at a stack-hosted access's outside door (V1-3.8.2 step 5, l. 1637–1655); V1-3.8.3's digest "(building-hosted ones included)" and "whether each has `ground(b)`" (l. 1674); §1.2's V03 row and §1b's reserve row (l. 311, 379); J-V1.75, J-V1.96 (l. 3037, 3058); T-V1-26's reserve clause (l. 2815) |
| S23R1-20 | minor | V01 | **fixed** | T-V1-26: "0 basement-door rectangles on the main entrance's side of a walk-out building whose `basementDoor(b)` lies on another side (its main entrance keeps its own rectangle …)" (l. 2815) |
| S23R1-21 | minor | V01 | **fixed** | §1b's `stepProfile` row and BCR-43's reader sentence name BCR-V3-27 (a) and `basementDoor(b)`'s rule 1 (l. 400, 3478–3479); V03 §1 names the reader from its side (V03 l. 201–202) — wired both ways |
| S23R1-22 | minor | V01 | **fixed** | §0: crypts "with no entrance of their own on the street — you go down from inside the church; only a great temple built solid in tiers is entered at its foot by its own door into the crypt, drawn with the building" (l. 191–192) — true of the mechanism once S23R2-10 below is applied (a flat-topped temple's plan) |
| S23R1-23 | minor | V02 | **fixed** | §1b's `BaseWing.role`/`key`, `ovalCourt` and `BaseWing.on`/`solid` cells name volume 1's readers (l. 237, 298, 301) |
| S23R1-24 | minor | V03 | **fixed** | "volume 1's T-V1-47 (its check that no crypt has a place or a pin; …)" at §1b, §2.5's row and 3.7.4 (V03 l. 292, 927, 1658–1660); J-V3.45 (l. 2415) |

**Totals.** 10 of 10 fixed; with the 05:27 landing's re-check (S23R1-01 … 14, all fixed) every one of round 1's 24 issues
is closed. The four second-brief lanes each applied only their own half and each named the other halves as other lanes'
(V02's note of 09:30 to volume 1 and file f; V01's cross-volume note (30); file f's *Volume 2's half* paragraph) — round
1's one-owner-per-issue rule (J-S23R1.1) held again.

## 7 Continuation sweep

### 7.1 Coverage (J-S23R2.7)

No round of this seam has swept the repairs made since round 3's inputs: round 4 was cut before its sweep, and round 1's
continuation read V01 whole (87f01bb5…) but V02, V03, file f and `_integrate.md` only where V01 names them. This
continuation read the **full diff** of each file since the last text a round of this seam swept — V02 since 77417d41…,
V03 since 69209c71…, file f since 38c29d39…, `_integrate.md` since d868438e… (round 3's inputs; the round-4 reconcilers'
backups and the integration continuation's `pre-cont/` copy hold them, hashes checked), V01 since 87f01bb5… (round 1's
continuation) — every changed line, 1 379 diff lines in all (`scratchpad/volumes/seam23r2c/d1.txt` … `di.txt`). Every
mechanism a changed passage touches was then traced into the untouched text at both ends: V03 3.1, 3.3 (the level
reading, S6), 3.7.1 – 3.7.2, 3.7.4, 3.9, §1b, `AccessHead`, `PlanGeometryRow`, §8's PE and §13's hand-offs; V02 §1b, §2.6's
derived functions, §3.15.3 – §3.15.4, the `tiers` op, BCR-V2-24, -33, -41, T-V2-44 – T-V2-45, IN-V02-2 and §8.5; V01
V1-3.8.2 – V1-3.8.3, V1-3.8.8, §0, §1.2, §1b; file f items 229, 233, 241, 242, 303, 371, 578. Two censuses by script over
the three live volumes: every `T-V`, `J-V` and `BCR-V` id one volume cites in another is defined there (**0 dangling**), and
every `V1-x`, `V2 §x` and `V03 x` section citation resolves to a heading (**0 dangling**; three hits were `T-V1-n` ids).

### 7.2 Round 3's issues, as the diffs show them

Round 4, which was to re-check them, was cut; the diffs show all eight applied: S23R3-01 (V03: one `basementDoor(b)`,
3.7.1 l. 1515–1553; BCR-V3-32 l. 2826; T-V3-30), S23R3-02 (V01: the reserve at `basementDoor(b)`, V1-3.8.2 step 5), S23R3-03
(V02: BCR-V2-33 worded by `ground(b)` and its round-4 extension (a) – (d), l. 3975–4014; T-V2-44), S23R3-04 (V01's BCR-45,
file f item 580), S23R3-05 (V03 §8's PE row, l. 2323), S23R3-06 (file f items 233, 241, 242, 578), S23R3-07 (V03 3.7.2 (7),
5.1, 5.3, T-V3-13), S23R3-08 (V03 §12, §13). One sentence round 3 itself required is now wrong: S23R3-05's "the rest of
`PlanGeometryRow` at M6-P", which file f item 233 copied, while volume 3's PE row ships five more of the row's cells at M3a
(S23R2-09).

### 7.3 The record chain — what holds

The porch rows reach volume 1 from M3a-V2 through `composition.json` with both ends naming each other; the footprint court
is typed at M3a (BCR-V2-24's hole sentence) before volume 1's hood pins read it at M5, and the one-time retyping of a
template hole (a cloister garth) lands before M5, where volume 1 gates `yard`, `garden` and `court` yard parts alike;
`basementDoor(b)` is one pure function of eager records in `@plat/plots` at M3a, read by the base's step 3 (BCR-V3-32),
volume 1's reserve and digest and the plan; `Entrance.storey`, rule 4's non-derivation and the wall walk-out are eager at
M3a (PE), so volume 1's reserve reads final entrance sets; `stepProfile` is wired both ways; a head's state reads the same at
the surface (V1-3.8.8) and in the plan (3.7.2 (7)); `Basement.crypt`'s volume 1 reader is T-V1-47 on both sides.

### 7.4 What breaks (each registered in §8)

1. **Five cells of `PlanGeometryRow` ship after their readers.** Volume 3's PE row builds `Entrance.storey` with
   `datum.maxSteps`, `stair.riserCm` and `exposureAllStoreys`, and `basementDoor(b)` with `moduleCm` and `door.mainCm`, at
   M3a (V03 l. 2323; the row V03 l. 570–590); file f item 233 ships "only its two `stair` cells … the rest of the row with
   M6-P" (file f l. 135), and items 241, 242 and 578 name no cell. Volume 1's reserve calls `basementDoor(b)` at M5
   (S23R2-09).
2. **A building with no storeyed wing loses its basement and its heads.** V03 3.1 step 2 stops "with an empty plan" (l.
   952; S6 l. 1224–1225; 3.9 l. 1754), yet such a building can hold a crypt-only basement — a great temple of volume 2's
   `stepped-temple` row, whose tiers are all solid and whose top is flat at 0.2 at its first anchor (V2 l. 2381) or set
   flat by the `tiers` op (`top?: 'flat'`, V2 l. 2670), is an `always` class entered by the tomb door (V03 3.7.4 l.
   1620–1622, 3.7.6 l. 1679) — and heads of 3.7.2 (1)'s outside-door form (l. 1562–1565). Their pieces are laid before the
   stop and then dropped; and `AccessHead` (l. 433–439) requires a `storey` and a host `room` the outside-door head never
   has. Volume 1 relies on the plan for the one mark of every building-hosted access (V1-3.8.8, l. 1727–1731), reserves
   ground at both doors and tells the owner the temple's crypt door is "drawn with the building" (§0 l. 191–192) (S23R2-10;
   the base text BCR-V2-41's "has no plan" is S23R2-11).
3. **"Placed by the tomb-door rule."** BCR-V2-33's *Basements* text, V2 §3.15.3, IN-V02-2 (a) and J-V2.99 say volume 3's
   tomb-door rule places a storey-less stack's door; `basementDoor(b)` takes a retaining wall's side first for every
   `external` basement (V03 l. 1529–1541), and BCR-V3-32's step 3 reads that order (S23R2-12). Volume 1 glosses the same
   rule in its own words, inexactly (S23R2-13).
4. **Unhomed helpers and one-ended rows.** `deckLevel`, `storeyRange`, `stairChain` and `landingSide` have no package or
   milestone in V02 though volume 3's M3a functions in `@plat/plots` read them (S23R2-14); volume 3's §1b rows for
   `ground(b)` and `PlanGeometryRow` omit their readers across the seam, and `ground(b)` — now read by volume 1 and by the
   base's *Basements* sentence — has no interface row (S23R2-15).

### 7.5 Wiring across the seam — the pieces added since round 3

| piece | produced by | consumed by | status |
|---|---|---|---|
| `PorchKindRow` (from M3a-V2) | V2 §8.5, `composition.json` | V1-3.8.2 step 5, V1-3.8.3's digest, T-V1-15 | wired both ways |
| BCR-V2-24's hole sentence (M3a) | V02 BCR-V2-24, file f item 303 | T-V2-42; V1-3.8.2 step 1, T-V1-26, T-V1-54; V03 O1 (b) | wired both ways |
| `basementDoor(b)` (M3a, `@plat/plots`) | V03 3.7.1 (PE) | step 3 (BCR-V3-32), V1-3.8.2 step 5, V1-3.8.3, 3.7.4 – 3.7.7, T28-3 | wired; its cells ship at M6-P by file f (S23R2-09); its `stairChain` input unhomed (S23R2-14); V03's interface row omits V1-3.8.3 (S23R2-15) |
| `ground(b)` (M3a, `@plat/plots`) | V03 3.3 (PE) | V03's plan; V1-3.8.2 step 5 and V1-3.8.3; base *Basements* (BCR-V2-33); V2 §3.15.3 | read across the seam, listed on V03's side only internally (S23R2-15) |
| `Entrance.storey`, rule 4 (M3a) | BCR-V3-26 (PE), file f item 241 | V01's reserve (the entrance set), the plan, exports | wired; cells as S23R2-09 |
| the stack-access outside door | V03 3.7.2 (1) | V1-3.8.2 step 5 (J-V1.96), V1-3.8.8's one mark, T-V1-26 | produced into no record on a storey-less stack; dropped by an empty plan (S23R2-10) |
| `stepProfile(wall)` | V01 BCR-43 | V03 BCR-V3-27 (a), `basementDoor(b)` rule 1 | wired both ways (S23R1-21) |

**Checked and not registered.** (a) Request ids ("BCR-43", "BCR-V2-33", "BCR-V3-32") and the form "volume V03 §x" inside
six base-change New texts on this seam (V01 1, V02 3, V03 2): the base holds no request id today, but every volume's §10
does the same and the base will cite volumes after the coherence pass either way — a whole-design style point, left to the
coherence pass and the retrovalidation (J84). (b) Volume 3 draws a `locked` head with a lock tick in the plan, volume 1 a
`locked` surface symbol with a bar: two bands, one §8.2 row, as round 3 left it. (c) Item 244's support step (the piers)
reaches volume 1's strips; no V02 or V03 reader. (d) BCR-V2-33 (b) – (d) and BCR-V3-32 amend different base sentences
(J-A29.25 and step 5; step 3 and T28-3), each quoted once, applied in item 578's order.

## 8 Continuation register

Counts: **7 issues — 0 blockers, 2 majors, 5 minors.** Owners: BASE-F 1 major; V03 1 major, 1 minor; V02 3 minors; V01 1
minor. Line numbers are the live files' (§6's hashes).

| id | sev. | owner | kind | the claim in one line |
|---|---|---|---|---|
| S23R2-09 | major | BASE-F | producer after its readers (milestone label) | item 233 ships the rest of `PlanGeometryRow` at M6-P; five of its cells are read at M3a by items 241, 242, 578 and through `basementDoor(b)` by volume 1 at M5 |
| S23R2-10 | major | V03 | contradiction / unwired record | an empty plan for a building with no storeyed wing drops its crypt-only basement, its tomb door and its heads; `AccessHead` cannot hold 3.7.2 (1)'s outside door |
| S23R2-11 | minor | V02 | base text follows S23R2-10 | BCR-V2-41, J-V2.83 and T-V2-45: "has no plan" |
| S23R2-12 | minor | V02 | contradiction (base text) | BCR-V2-33 and its echoes place a storey-less stack's door "by volume 3's tomb-door rule"; `basementDoor(b)` takes a retaining wall's side first |
| S23R2-13 | minor | V01 | restatement, inexact | V1-3.8.2 step 5 and §1.2 gloss `basementDoor(b)`'s rules in their own words, in the wrong order |
| S23R2-14 | minor | V02 | unhomed producer | `deckLevel`, `storeyRange`, `stairChain`, `landingSide` have no package or milestone, though volume 3's M3a functions in `@plat/plots` read them |
| S23R2-15 | minor | V03 | one-ended rows | §1b's `ground(b)` and `PlanGeometryRow` rows omit their readers across the seam; `ground(b)` has no interface row; `basementDoor(b)`'s omits V1-3.8.3 |

### S23R2-09 — major — owner BASE-F — five `PlanGeometryRow` cells ship at M6-P, read from M3a

**Claim.** File f item 233 (l. 135): "of `PlanGeometryRow` only its two `stair` cells, `stair.ladder` and
`stair.landingCm`, ship then, in the base's `roomProgram.json`, the rest of the row with M6-P". Volume 3's PE row (V03 l.
2323) builds **at M3a**, in S11, "BCR-V3-26's `Entrance.storey` with its tolerance cells (`datum.maxSteps`,
`stair.riserCm`) and `exposureAllStoreys` … BCR-V3-27 (a)'s wall walk-out and `basementDoor(b)` (3.7.1) with the cells
`moduleCm` and `door.mainCm`; and … W2's outside-ground sample (3.6)" — five cells of that row (V03 l. 570–590). Items
241, 242 and 578, BASE (M3a), name no cell (l. 151, 153, 155); `basementDoor(b)` reads `moduleCm` and `door.mainCm`
(V03 l. 1520–1523), and volume 1's entrance reserve calls it at M5 (V1-3.8.2 step 5). Following file f, the base's M3a
ships `Entrance.storey` and `basementDoor(b)` without their cells, two milestones before the cells exist. Round 3's own
required text (S23R3-05: "the rest of `PlanGeometryRow` at M6-P") carried the omission; volume 3's round-4 lane shipped the
cells in its PE row and left the file-f half as a hand-off (V03 §13, l. 3099–3102), which the base-change lane's second
brief did not take.
**Required change (BASE-F).** Item 233's sentence → "of `PlanGeometryRow` its two `stair` cells, `stair.ladder` and
`stair.landingCm`, ship then, in the base's `roomProgram.json`; five more ship at M3a with items 241, 242 and 578 —
`datum.maxSteps`, `stair.riserCm` and `exposureAllStoreys` (item 241's `Entrance.storey` and rule 4), `moduleCm` and
`door.mainCm` (item 578's `basementDoor(b)` and W2's outside-ground sample; volume 3 §8's PE); the rest of the row with
M6-P (seam S23R2-09)". Item 241's note adds "its cells `datum.maxSteps`, `stair.riserCm` and `exposureAllStoreys` ship
with it at M3a (item 233's note)"; item 578's note adds "`basementDoor(b)` reads `moduleCm` and `door.mainCm`, shipped with
it at M3a (item 233's note), and the basement gate's `cellar.insetCm` and `cellar.depthCm` (M2b)". The reconciliation
table gains the row (S23R2-09). No estimate moves (the cells are data volume 3 authored; PE's 0.5–0.75 pw at M3a holds).

### S23R2-10 — major — owner V03 — a building with no storeyed wing: its basement and its heads

**Claim.** V03 3.1 step 2 (l. 952): "A building with no storeyed wing stops here with an empty plan (S6's
`solidMonument`)"; S6 (l. 1224–1225): "returns an empty plan — no storey, no room"; 3.4a (l. 1294–1295), 3.9's row (l.
1754) and J-V3.91 (l. 2461) agree. Such a building can hold (a) **a basement**: volume 2's `stepped-temple` row lays every
tier solid with a flat top at 0.2 at its first anchor (V2 §3.15.4, l. 2381), the `tiers` op sets `top: 'flat'` (V2 l.
2670), and a great temple so laid is an `always` class whose crypt-only basement is `external` "by its outside door at
`basementDoor(b)` … where `ground(b)` is absent (… a great temple built as a solid stack …)" (3.7.4, l. 1620–1622),
entered by that door (3.7.6, l. 1679–1680); V02's T-V2-44 runs "the all-solid stepped temple with a requested basement"
(V2 l. 3323); and (b) **heads** of 3.7.2 (1)'s outside-door form, "an outside door in the face of the ground-standing wing
nearest `ground.at`" (l. 1562–1565). Step 2 lays the crypt's pieces and the heads and then returns no storey, so the crypt
— which "draws only in a plan" (2.5's row, l. 927) — the tomb door's stair and the heads vanish; T-V3-22 ("every hosted
access has exactly one head") and T-V3-23 (e) ("when elaborated, every crypt room covers its ring") fail on such a
building. And `AccessHead` (l. 433–439) requires `storey: number` and a host `room: Id`, which the outside-door head —
"an opening onto the ground, not a room" (3.3, l. 1143) — lacks on every storey-less stack, shrine or none. Across the
seam, volume 1 draws no surface symbol for a building-hosted access because "the building's plan draws its head … one
mark per access" (V1-3.8.8, l. 1727–1731), reserves ground at both doors (V1-3.8.2 step 5; J-V1.96), and tells the owner
the temple's crypt door is "drawn with the building" (§0, l. 191–192).
**Required change (V03).** (a) 3.1 step 2's last sentence → "A building with no storeyed wing has no level at or above
the ground and no room there: where it has a basement (a crypt-only basement of an `always` class, a requested one) the
derivation continues for its basement storeys alone — 3.7.1 – 3.7.7, the crypt, its columns and its entry by the outside
door at `basementDoor(b)` — and it keeps the heads of 3.7.2 (1)'s outside-door form; with neither it stops here with an
empty plan (S6's `solidMonument`) (seam S23R2-10)"; S6's `solidMonument` sentence, 3.4a's last bullet and 3.9's row read
"no level at or above the ground and no room there; its basement storeys and heads planned (3.1 step 2); with neither, an
empty plan"; J-V3.91's "an empty plan with no failure for a building with no storeyed wing" gains "— its basement storeys
and its heads still planned, since an `always` crypt and every hosted access must draw (seam S23R2-10)". (b)
`AccessHead.storey: number | null` — `null` exactly for 3.7.2 (1)'s outside door on a building with neither a basement nor
`ground(b)` — with `room?: Id` (absent then) and a new `door?: { wing: number /* the ground-standing wing's BaseWing.key */;
side: number /* its ring side */; at: PointCm /* the door's centre */ }` present exactly when `storey` is `null`; 3.7.2 (1)
fills it; 5.1 draws that head at the building band on every storey view as a door with a down tick on the footprint (as
the entrances' ticks are drawn), and with no storey at all on the plan's outline view; 5.3's JSON writes `storey: null` and
the `door`, and no VTT scene carries it; 2.5's `Plan.heads` row adds the null form (a document without `door` re-derives it
with the plan). (c) T-V3-22's fixtures add a solid stack without a basement hosting one access — one head, `storey` null,
drawn; T-V3-23 (e) adds a great temple laid with `top: 'flat'` — its plan holds storey −1 with the crypt room and the
door at `basementDoor(b)`, and no level at or above the ground.

### S23R2-11 — minor — owner V02 — "has no plan" in the base text

**Claim.** BCR-V2-41's New text, which the applier copies into §2.6 *Entrances* rule 5 (V2 l. 4104–4106): "a building with
no storeyed wing at all (a solid monument, a sealed stack) has no plan, and its main entrance opens nothing"; J-V2.83
(l. 3576): "(and no plan for a building with no storeyed wing)"; T-V2-45 (l. 3333–3334): "a sealed stack's entrance opens
nothing and it has no plan". Under S23R2-10 such a building's plan holds its basement storeys and its heads.
**Required change (V02).** BCR-V2-41's clause → "a building with no storeyed wing at all (a solid monument, a sealed stack)
has no plan above the ground — no level at or above it and no room there; its basement storeys and the heads of its
hosted accesses are planned as volume 3 §3.1 states — and its main entrance opens nothing"; J-V2.83's parenthesis →
"(and no plan above the ground for a building with no storeyed wing, its basement and access heads still planned)";
T-V2-45's clause → "a sealed stack's entrance opens nothing and its plan has no level at or above the ground"; each
marked "(seam S23R2-11)".

### S23R2-12 — minor — owner V02 — the storey-less stack's door is `basementDoor(b)`'s, not the tomb-door rule's

**Claim.** BCR-V2-33's *Basements* New text (V2 l. 3975–3977): "`external` for a walk-out, or where no wing standing on
no other wing is storeyed (…) — its door then placed by volume 3's tomb-door rule (V03 §3.7.1)"; V2 §3.15.3 (l.
2363–2367): "volume 3 placing its door by its tomb-door rule (V03 §3.7.1; …)"; IN-V02-2 (a) (l. 4405–4407) makes that
the wording of "every pointer of this volume to the solid stack's door"; J-V2.99 (l. 3594): "its door by volume 3's
tomb-door rule"; T-V2-44 (l. 3323–3324): "its door the tomb door (V03 §3.7.1)". Volume 3's round 4 made the door one
function whose rule 1, the retaining wall's side, wins before rule 2, the tomb door, for every `external` basement with a
door side at a wall step of at least half the cellar depth, `ground(b)` or not (V03 3.7.1, l. 1529–1541); BCR-V3-32's step
3 reads the same order. A solid temple built against a terrace wall — the second fixture's terraced wards stand at M3a —
opens its door on the wall's side while the base's *Basements* sentence says the tomb-door rule places it. Volume 3's
round-4 hand-off asked for this (V03 §13, l. 3096–3098).
**Required change (V02).** BCR-V2-33's "— its door then placed by volume 3's tomb-door rule (V03 §3.7.1)" → "— its door
then at volume 3's `basementDoor(b)` (V03 §3.7.1: a retaining wall's side first, else the tomb door)"; V2 §3.15.3's
"volume 3 placing its door by its tomb-door rule (V03 §3.7.1; …)" → "its door at volume 3's `basementDoor(b)` (V03 §3.7.1:
the tomb door, or the wall's side where the stack stands against a retaining wall; …)"; IN-V02-2 (a)'s two quotations and
J-V2.99's clause the same; T-V2-44's "its door the tomb door (V03 §3.7.1)" → "its door at `basementDoor(b)` (V03 §3.7.1)";
each marked "(seam S23R2-12)".

### S23R2-13 — minor — owner V01 — `basementDoor(b)` glossed in volume 1's words

**Claim.** V1-3.8.2 step 5 (l. 1645–1646): "the point volume 3's `basementDoor(b)` gives (V03 §3.7.1: a walk-out's door on
the retaining wall's or the lowest side, the tomb door where no ground wing is storeyed)"; §1.2's V03 row (l. 311): "the
outside door of an `external` basement — a walk-out's on the retaining wall's or the lowest side, the tomb door where no
ground wing is storeyed". Both restate volume 3's rule, and inexactly: the wall's side comes first for every external
basement, a storey-less stack's included (V03 l. 1529–1541), and rule 3 reads the lowest outside ground outward from the
ring, not "the lowest side". The reserve itself only reads the point, so nothing volume 1 builds changes.
**Required change (V01).** Both glosses → "(V03 §3.7.1, whose rules place it)"; marked "(seam S23R2-13)".

### S23R2-14 — minor — owner V02 — the stack helpers have no home

**Claim.** V2 §2.6 declares `deckLevel`, `storeyRange`, `stairChain` and `landingSide` under "Derived at read (never
stored; item 110 fold)" (l. 799–823), and §1b's row (l. 305) gives no package; §8.5's M3a-V2 cell names `storeyRange` (in
the capacity) but not the other three (l. 3468), while every other item-110 function M3a uses is "exported by
`@plat/plots`" (l. 279–282, 298, 314, 315). Volume 3's PE builds in `@plat/plots` at M3a `ground(b)` from `storeyRange`,
`floorCm` from `deckLevel` and `basementDoor(b)` from `stairChain` (V03 l. 2323, 1134–1146, 1520–1522), which volume 1
reads at M5; §1b's consumer cell names "volume 3's levels and landing doors (X18)" but none of those eager readers. As
`@plat/buildings` depends on `@plat/plots` (V2 l. 277), a helper homed there could not be read by `basementDoor(b)`.
**Required change (V02).** §1b's row: kind cell "derived functions, exported by `@plat/plots`, built at M3a-V2 with the
item 110 fold"; consumer cell adds "volume 3's eager facts at M3a — `ground(b)` and `floorCm` (V03 3.3), `basementDoor(b)`
(`stairChain`: the stair wings and stair 0's approach, V03 3.7.1) — and through them volume 1's entrance reserve"; §2.6's
heading line → "Derived at read (never stored; item 110 fold; exported by `@plat/plots`, built at M3a-V2):"; §8.5's M3a-V2
cell adds "`deckLevel`, `storeyRange`, `stairChain` and `landingSide`, exported by `@plat/plots`"; marked "(seam
S23R2-14)". No estimate moves (the four are inside the fold's M3a work).

### S23R2-15 — minor — owner V03 — §1b's rows across the seam

**Claim.** (a) The derived-piece row of the level reading and `ground(b)` (l. 303) lists readers inside volume 3 only —
"the seeds (3.4), the datums, S2, S5, S6, A5 (e), 3.7, the switcher (4.5), T-V3-27" — while `Entrance.storey` (BCR-V3-26),
volume 1's entrance reserve and close-up digest (V1-3.8.2 step 5, V1-3.8.3), and the base's *Basements* condition
(BCR-V2-33: "volume V03 §3.3's `ground(b)` absent"; V2 §3.15.3) read it; it is exported from `@plat/plots` at M3a (§8's
PE), yet the Interfaces table (l. 336) lists `basementDoor(b)` alone. (b) The `PlanGeometryRow` row (l. 272) lists
"anchors (3.3), cutters (3.5), openings (3.6), heads and crypt (3.7), F2, the view rules (4.5, 5.1), A3's unit floor", not
PE's eager readers (the capacity's `R(s)` from M2b; `Entrance.storey`, `basementDoor(b)` and W2's outside sample from
M3a) nor its cells' ship milestones. (c) The `basementDoor(b)` interface row (l. 336) omits volume 1's close-up digest
(V1-3.8.3), which hashes its value.
**Required change (V03).** (a) the `ground(b)` row's readers add "`Entrance.storey` (BCR-V3-26), `basementDoor(b)`
(3.7.1), volume 1's entrance reserve and close-up digest (V1-3.8.2 step 5, V1-3.8.3), the base's *Basements* condition
(volume 2's BCR-V2-33; V2 §3.15.3)"; the Interfaces table gains "`ground(b)` and the level reading (3.3; pure, of eager
records) | this volume's rule, implemented in `@plat/plots`, built at M3a (§8's PE) | the plan rung, `Entrance.storey`,
`basementDoor(b)`, volume 1's entrance reserve and digest, the base's *Basements* (BCR-V2-33)"; (b) the `PlanGeometryRow`
row's readers add "the capacity's `R(s)` (`stair.ladder`, `stair.landingCm`, from M2b; BCR-V3-12), `Entrance.storey`
(`datum.maxSteps`, `stair.riserCm`, `exposureAllStoreys`) and `basementDoor(b)` with W2's outside sample (`moduleCm`,
`door.mainCm`), from M3a (§8's PE; file f item 233's note, seam S23R2-09)"; (c) the `basementDoor(b)` interface row's
callers add "volume 1's close-up digest (V1-3.8.3)"; marked "(seam S23R2-15)".

## 9 Continuation summary, decisions, CONFIRMED versus PLAUSIBLE

**By owner.** BASE-F: S23R2-09 (major). V03: S23R2-10 (major), S23R2-15 (minor). V02: S23R2-11, S23R2-12, S23R2-14 (minor).
V01: S23R2-13 (minor). **Order for the lanes:** V03's S23R2-10 and V02's S23R2-11 describe one rule (a storey-less
building's plan keeps its basement storeys and heads) and should land in the same round; BASE-F's S23R2-09 and V03's
S23R2-15 (b) name the same five cells from the two ends; V02's S23R2-14 and V03's S23R2-15 (a) wire `ground(b)`'s inputs
and readers from the two ends. Where these land after round 3 of this seam has been re-run, the next round re-checks them.

**Decisions (vetoable).**

| id | decision |
|---|---|
| J-S23R2.6 | Chose to **continue under this lane key** for round 1's continuation (S23R1-15 … 24) and a sweep of the unswept repairs, appending §6 – §9 and keeping §1 – §5 as landed, over returning the 05:27 summary under the resume rule alone, because the brief's "previous round" file now holds ten issues no round re-checked and round 4 was cut — the precedent of seam-surfaces-r2 and seam-content-calibration-r2 (09:50) and of J-RF1.9. |
| J-S23R2.7 | Chose to sweep **by full diff since the last text a round of this seam swept** — round 3's inputs for V02, V03, file f and `_integrate.md`, round 1's continuation for V01 — with every touched mechanism traced into untouched text at both ends and two citation censuses over the three live volumes, over a whole re-read of 1.5 MB, because rounds 0 – 1 read every file whole, rounds 2 – 3 and round 1's continuation covered every change up to those inputs, and the owner's efficiency standard puts the budget where a contradiction can have appeared (J-S23R2.1's method, one link further). |
| J-S23R2.8 | Chose to **record round 3's issues as the diffs show them** (§7.2: all eight applied) without re-registering them, over leaving them unseen until a round-4 re-run, because round 4 was cut and the one defect found at their site — item 233's sentence, which round 3's own S23R3-05 text asked for — is registered anew (S23R2-09) with its cause stated. |
| J-S23R2.9 | Chose **major** for S23R2-09, over minor, because volume 1's reserve at M5 and the base's M3a `Entrance.storey` and `basementDoor(b)` read cells the base-change record ships at M6-P — a producer after its readers, graded major for `PorchKindRow` in round 1 (S23R1-16). |
| J-S23R2.10 | Chose to make a storey-less building's plan **keep its basement storeys and its heads** (S23R2-10), over volume 1 drawing a surface symbol for such accesses, or the plan dropping them, because the owner's crypt rule (item 109 (k): the great temple's crypt, always) wants that crypt drawn, volume 1's one-mark rule already hands every building-hosted access to the plan, and the eager facts (`Basement.crypt`, `basementDoor(b)`) exist either way; a new `AccessHead.door` in place of a pseudo-storey, because no storey exists at the ground of a solid stack and a null `storey` with its own door record says so. |
| J-S23R2.11 | Chose **major** for S23R2-10 and **minor** for its base-text echo S23R2-11, over two majors, because the mechanism (what the plan holds) is volume 3's and the base sentence only states its consequence; and minor for S23R2-12, because the door's point is already one function every reader calls — only the base's words name the wrong rule. |

**CONFIRMED versus PLAUSIBLE.** CONFIRMED by reading the live text at the lines cited, with the input hashes unchanged
from start to end (V01 7ba65e0b…, V02 bd45a3b4…, V03 1bf49bc9…, file f ae1bb8ca…, `_integrate.md` 965ab696…, base
01fea21f…): every status of §6; every diff line of §7.1's five diffs; every claim of S23R2-09 – S23R2-15 at both ends
(V03's PE row, `PlanGeometryRow`, 3.1, 3.3, S6, 3.4a, 3.7.1 – 3.7.4, 3.7.6, 3.9, `AccessHead`, §1b and §13; V02's §1b, §2.6's
derived functions, the `stepped-temple` row, the `tiers` op, BCR-V2-33, BCR-V2-41, §3.15.3, T-V2-44, T-V2-45, IN-V02-2,
J-V2.83, J-V2.99, §8.5; V01's §0, §1.2, V1-3.8.2 step 5, V1-3.8.3, V1-3.8.8, J-V1.96; file f items 233, 241, 242, 578).
CONFIRMED by executed script: the two citation censuses (0 dangling ids, 0 dangling section citations) and the md5
checks. PLAUSIBLE: that a great temple is ever generated at the `stepped-temple` row's first anchor, where the flat top
is drawn (volume 11's band for the class decides; the `tiers` op reaches the case by edit regardless, CONFIRMED by
reading V2 l. 2670); the required texts themselves, until their owners apply them and the next round re-checks. Nothing
was executed beyond `diff`, `grep`, `md5`, `sed` and two census scripts: this lane writes a critique.

**Outside this seam.** The request ids and "volume V03" forms inside base-change New texts (§7.5 (a)) run through every
volume's §10 — a point for the coherence pass. Whether volume 4's accesses can be hosted by a storey-less stack at all
(its dig floor, U-ACCESS) is the layers seam's; S23R2-10 makes the plan hold such a head whenever volume 4 hands one.
