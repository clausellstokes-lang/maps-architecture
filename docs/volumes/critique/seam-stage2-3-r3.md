# Seam check, round 3 — stage 2 · stage 3 · the plan rung (V01 neighbourhoods · V02 buildings · V03 interiors)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-stage2-3-r3; covered by the whole-design retrovalidation (J84).

Lane `volumes/seam-stage2-3-r3`, 2026-09-29. Reconciliation round 3 of this seam. Output: this file only — no volume, no
amendment file and no base text is edited by this lane. Every issue names **one** owning volume (or BASE-F, an item of
`docs/AMENDMENTS-2026-09-28f.md` that must change) and the exact change it needs (J-S23R1.1 kept).

PROGRESS
- §1 Method, inputs and coverage | done
- §2 Re-check of round 2 (S23R2-01..08) | done
- §3 Sweep (every line changed since round 2's inputs; seam sections and cross-citations re-checked) | done
- §4 Issue register (S23R3-nn) | done
- §5 Summary by owner, decisions (J-S23R3), CONFIRMED versus PLAUSIBLE | done
- §6 Continuation — re-check of round 2's continuation (S23R2-09..15) | done
- §7 Continuation sweep (every line changed since round 2's continuation inputs; mechanisms re-traced) | done
- §8 Continuation register (S23R3-09..17) | done
- §9 Continuation summary, decisions, CONFIRMED versus PLAUSIBLE | done

**Outcome.** All **8 round-2 issues are fixed** in their owners' text: V02's datum now samples `levelledGroundCm`
(BCR-V2-32, -42, §3.15.2 (1), §3.17 (a), J-V2.72, T-V2-51 (c)), BCR-V2-33 carries volume 3's outside-door condition,
file f item 309 is BASE (M3a) for the ground reader and ordered before items 370 and 231, and V03 cites landed texts and
reads its outside ground through `levelledGroundCm`. The sweep read every changed line and then followed the one
mechanism round 3 sharpened — **the outside basement door** — through the base texts that still describe it, and the
one mechanism round 3 added on this seam's edge — **the island's bridges and their deck plots**. It found **one door with
three placements**: the base's plan-rung step 3 puts every `external` door on the ring side that samples lowest, V03
puts the tomb door on the main entrance's side and the retaining-wall walk-out on the wall's side, and V01's entrance
reserve treats every `external` access as the tomb door; the base's T29-4 and J-A29.25 still equate `external` with a
walk-out, so T29-4 fails the all-solid temple T-V2-44 now requires. It found that **V01 builds an island bridge after
its deck plots** would need it built, and that **three of V03's base changes alter eager S10b/S11 facts** (the capacity,
the entrance set and its storeys, the walk-out at a wall) yet are built only with the plan rung at M6-P. Register:
**8 issues — 0 blockers, 5 majors, 3 minors** (V03 2 majors, 2 minors; V01 2 majors; V02 1 major; BASE-F 1 minor).

**Continuation outcome (re-issued brief, 2026-09-29 ~10:55; §6 – §9).** All **7 issues of round 2's continuation are
fixed** (S23R2-09 … 15), so all 15 of round 2's issues are closed. The sweep of every repair since found **9 issues — 0
blockers, 4 majors, 5 minors**: one stack-access door placed by two different rules in volume 3 and volume 1 (S23R3-09,
-10); volume 3's plan treating an `external` basement's outside door as a secondary entrance, so every walk-out basement
is unreached, where the base and volume 2 make it the root (S23R3-11); the base's T28-1 failing on the storey-less plan
round 2 introduced (S23R3-12, -13); the sealed stack still classed as storey-less (S23R3-14, -15); and two declarations that
cannot reach the levelled-ground reader (S23R3-16, -17).

## 1 Method, inputs and coverage

**Inputs as read** (md5 at start, 06:36, and unchanged at the end): `docs/volumes/V01-neighbourhoods.md` 079cc7de… (3 800
lines), `docs/volumes/V02-buildings.md` 77417d41… (4 420), `docs/volumes/V03-interiors.md` 69209c71… (3 087),
`docs/AMENDMENTS-2026-09-28f.md` 38c29d39… (1 238), `docs/volumes/_integrate.md` d868438e… (369), `docs/ARCHITECTURE.md`
01fea21f… (unchanged since round 0). Round 2: `docs/volumes/critique/seam-stage2-3-r2.md` read whole, with its notes.
Read for single facts: V05's BCR-V5-30 (its signature `levelledGroundCm(doc, key: PlatKey, p)`, its §4.7 home and its
reader list); the base's §2.6 *Basements*, the plan rung's step 3, the `Basement` interface, *One capacity function*,
§4.8's bridge rule and `Bridge.deckCm`, §8.2's `access` row, II.7.4's `state`, §13.2's T28-2, T28-3 and T29-4, J-A29.25,
§16's M2b and M3a rows; V04 is not read (the layers seam's).

**Coverage (J-S23R3.1).** The round-2 inputs survive exactly as the round-3 reconcile lanes' backups (hashes checked:
`rcV1r3/V01-pre.md` cb72db1f…, `rcV2r3/V02-pre-r3.md` dc951b81…, `rcV3r3/V03-pre-r3.md` 3d02f097…, `rcBFr3/f-pre-r3.md`
a85996a2…, `rcBFr3/integrate-pre-r3.md` a8c72fb4…). This round read the **full diff** of each file since those states,
every changed line (V01 238 changed lines — reconcile-V01-r3's layers-seam edits and reconcile-V04-r3's two counterpart
edits; V02 248; V03 144, one hunk by reconcile-V02-r3; file f 95; `_integrate.md` 4). A script census
(`scratchpad/volumes/seam23r3/census.py`) resolved **every** cross-reference among the three volumes — section pointers
(`V1-x.y`, `V2 §x.y`, `volume 2 §`, `V03 x.y`, `volume V03 §`) and ids (`J-V1/2/3`, `T-V1/2/3`, `BCR-V2/3`, V01's
`BCR-n`, V02's `X`) against their definitions: **0 dangling**. Each mechanism a changed line touches was then followed
into the untouched text of all three volumes and the base by search, and every hit read in place: the outside basement
door (`external`, walk-out, tomb door, step 3, T28-3, T29-4, J-A29.25, the entrance reserve), the ground reader
(`raster`, `bilinear`, `terrain sample`), deck plots on bridges (`deckCm`, `DeckContext`, X28, V1-3.17.6), the access
state forms (§8.2, II.7.4, V1-3.8.8, V03 3.7.2 (7), 5.1) and file f's labels of every V03 request that touches an eager
fact (items 232–242, 371). Working notes: `scratchpad/volumes/seam23r3/notes.md`; diffs `d1.txt`, `d2.txt`, `d3.txt`,
`df.txt`, `di.txt` there.

## 2 Re-check of round 2

| id | r2 sev. | owner | status | evidence (current file, line) |
|---|---|---|---|---|
| S23R2-01 | major | V02 | **fixed** | BCR-V2-32's datum clause reads `levelledGroundCm(doc, key, p)` for the vertex and centroid samples and for every other ground sample of the datum and *Basements* (l. 3860–3866); BCR-V2-42's quote and added text (l. 3997–4006); V2 §3.15.2 (1) (l. 2284–2286); V2 §3.17 (a) (l. 2420–2428); J-V2.72's round-3 sentence; §1b's new `levelledGroundCm` row and the `rebaseStack` row (l. 276, 284); §1c (l. 349); T-V2-51 (a)–(c) (l. 3321–3329); J-V2.98 |
| S23R2-02 | major | BASE-F | **fixed** | item 309: BASE (M3a, with item 110 (a)'s levelling) for the ground part, STAGED (M6-sky) for the sky parts; applied before items 370 and 231; the closing clause not taken; V03's W2 named; *Needed by* V01–V05 (file f l. 318); items 370 and 231 name the order from their end |
| S23R2-03 | major | V02 | **fixed** (base texts it leaves: S23R3-03) | BCR-V2-33's *Basements* sentence and §10.2's `basementAccess` comment (l. 3901–3908); V2 §3.15.3 (l. 2315–2320); IN-V02-2 (a) (l. 4267–4271); T-V2-44's *Basement access* clause (l. 3270–3273); J-V2.99 |
| S23R2-04 | minor | V03 | **fixed** | §1 (l. 216), 3.7.1 (l. 1496–1497), BCR-V3-27's closing (l. 2708–2710) cite volume 2's BCR-V2-33, V3C-82 as provenance |
| S23R2-05 | minor | V03 | **fixed** (a round-3 residue: S23R3-08) | l. 189, 1205, 1437–1441, 2432 cite volume 2's landed BCRs; BCR-V3-26's conditional gone (l. 2698–2699); §12's sentence (l. 2820–2825) |
| S23R2-06 | minor | V03 | **fixed** | W2's outside ground by `levelledGroundCm` (l. 1437–1441); §1b rows (l. 186, 296); §2.5's digest row (l. 922); BCR-V3-28's digest and stale sentence (l. 2717–2721); §6's row; T-V3-30's new clause; J-V3.113 |
| S23R2-07 | minor | V02 | **fixed** | (a) V2 §3.17 (a) points at BCR-V3-27 (a) (l. 2426–2428); (b) V2 §3.7 quotes W2 as it stands (l. 1364–1365); (c) X30 and §13 (l. 4184–4186, 4239) |
| S23R2-08 | minor | V02 | **fixed** | §1b's resolution-chain row (l. 233) and §3.10.5's lead (l. 1785–1789) name V03 A1 (3) and its slot order |

**Totals.** 8 of 8 fixed. Round 2's order held: V02's datum and file f's label landed in one round; V03 cites the text
V02 wrote. Two residues sit in texts the fixes did not reach and are registered anew: the base sentences outside
*Basements* that still read `external` as a walk-out (S23R3-03), and V03's round-3 record, written before V02 landed,
that still calls BCR-V2-33 unapplied (S23R3-08).

## 3 Sweep

### 3.1 The record chain — block → plot → building → wing → storey → room

The chain holds end to end on the round-3 text: one ground reader under every building (`levelledGroundCm` in V01's
`stepProfile`, V02's datum and V03's W2), one basement-access condition, one crypt seed, one tread law, one façade-bay
function, one village key set. **Three breaks, all where an eager record meets a lazy rung:**

1. **The outside basement door has three placements.** After BCR-V2-33, `Basement.access` is `external` in two cases: a
   walk-out (the fall under the footprint, or — BCR-V3-27 (a) — a footprint side at a retaining wall's high side) and a
   building with no storeyed ground wing (the tomb door). The base's plan rung, step 3, still places every `external`
   door by one rule: "`external`, a walk-out's outside stair: the core stopping at the ground storey, a door … opens the
   basement in the side of `Basement.ring` … whose midpoint samples lowest on the terrain (the sampler `deriveBase` reads;
   ties by ring index)" (base l. 1601–1602). No request in any volume amends that clause (a search of every volume and
   amendment file for its words finds none). V03 places the tomb door on the main entrance's side and the wall walk-out
   on the wall's side (3.7.1, l. 1495–1507), while its **Access** sentence still says "`external` with its door on the
   lowest side" (l. 1487–1488) — and on a levelled plot `levelledGroundCm` reads one platform under every side, so "lowest"
   falls to the ring-index tie and never finds the wall (S23R3-01). V01's entrance reserve reads every `external` access
   as "volume 3's tomb door, 3.7.1" and reserves ground at the main entrance's side (V1-3.8.2 step 5, l. 1616–1618): a
   walk-out — the common `external` case on a hill — gets a spurious reserve at the front and none at its door
   (S23R3-02). The base's T29-4 ("its access by one of the three ways §2.6 gives it — the stair core, a trapdoor or, for a
   walk-out, an outside stair", base l. 13373) and J-A29.25 ("`external` for a walk-out, else the programme row's
   `basementAccess`", l. 16963) were left by BCR-V2-33: T29-4, a 100 % bar, fails the all-solid stepped temple whose
   basement T-V2-44 now requires `external` (S23R3-03).
2. **An island bridge is built after its deck plots.** Round 3 gave the sky unit run crossing sites (V1-3.10.3 (4),
   J-V1.91): the span is laid before the seeds, S10–S12b run "in the island's own overlay", and the bridge is built — "its
   furniture laid by §4.8's bridge rule in the unit's closing L1 batch (the unit run has no S7)". §4.8's bridge rule is
   what sets `Bridge.deckCm`, `kind` and `piers` (base l. 1790, 5795). V01 then gives the island bridge deck plots, owned
   by V1-3.17.6 (1) and counted in the S7b split. V02 offers no deck plot on "one whose `deckCm` is not yet set" (V2 §3.16
   (1), X28) and seats a deck building on `DeckContext.surfaceCm` = `Bridge.deckCm` (V2 §2.6 l. 771, §3.16 (5)). At S10
   and S11 on an island the deck is unbuilt: the plots V01 counts are never offered, or, if offered, S11 has no surface
   to seat them on (S23R3-04).
3. **Eager facts built with the lazy rung.** V03's BCR-V3-12 rewrites the base's *One capacity function* (`R(s)`, a
   ladder bay and a landing per upper storey), BCR-V3-26 adds `Entrance.storey` "derived with the entrance" at S11 and
   drops a secondary entrance whose outside ground meets no floor (*Entrances* rule 4), and BCR-V3-27 (a) makes a
   retaining wall's high side a walk-out in the basement decision. All three are eager S10b/S11 facts — V03's own
   lifecycle row says `Entrance.storey` is created by "§2.6's `deriveEntrances` at S11" (l. 918; J-V3.99) — read before
   M6-P by V01's entrance reserve (M5), V02's porches and the base's exports, and their inputs exist earlier (the
   capacity at M2b; stacks, retaining walls and levelled ground at M3a). Yet V03's §8 builds them in P1 (l. 2267, "the
   exposure gates and entrance storeys (BCR-V3-25, -26, -27 (a))") and file f labels items 233, 241 and 242 **STAGED
   (M6-P, the plan rung)**, while item 230 (BCR-V2-41, rule 5 of the same entrance derivation, "group with BCR-V3-26")
   is BASE (M3a). At M6-P every multi-storey building's capacity falls and its households re-home, and every terraced or
   stacked building's entrance set, entrance storeys and walk-outs change — the shift round 1 removed for the half
   cellar (S23R1-05) and round 2 for the ground reader (S23R2-02) (S23R3-05, -06).

### 3.2 The elaboration ladder

Unchanged since round 2 and consistent: the building click at every band, the `wings` raise, the per-rung staleness.
Round 3's `levelledGroundCm` enters V03's `plan`-rung digest (BCR-V3-28: "a levelled platform's datum") and V02's datum
step, whose re-base re-derives the eager records a re-levelling moves. The one ladder defect is §3.1 (3): eager facts
assigned to the lazy rung's milestone.

### 3.3 Classes, rows, terms, ids, units

**Ids.** The census resolves every cross-volume id and section (0 dangling). **Terms.** BCR-V2-33 states the condition
as "where no ground wing reaches storey 0"; V03 3.3 defines level 0 as "the lowest storeyed level" and forbids "storey 0"
for the real ground ("every rule of this volume that means the real ground reads `ground(b)`, never 'storey 0'",
l. 1127). The two conditions coincide — a storeyed ground wing always reaches level 0 — but the base text should not use
the term the other volume reserves (folded into S23R3-03). **Access states.** V01 now draws a surface access in §8.2's
`states` form, stored or derived ("sealed → `bricked`; collapsed as a trace with rubble stipple", V1-3.8.8, J-V1.93);
V03 draws a building-hosted head in three stored states only (3.7.2 (7), 5.1), with no collapsed form and no portal rule
for a closed element (S23R3-07). **Units.** No disagreement: datums in cm through one reader, treads by `stairTreads`,
bands in metres as each record types them.

### 3.4 Wiring across the seam

| piece | produced by | consumed by | status |
|---|---|---|---|
| `levelledGroundCm` | BCR-V5-30 (file f item 309, BASE M3a ground part) | V01 `stepProfile`; V02 `deriveBase`, `rebaseStack`, the basement gate, the raised crypt; V03 W2 and BCR-V3-28's digest | **wired** (V05's reader list omits V03's W2 — outside this seam, §5) |
| `Basement.access` `external` | §2.6's basement function (BCR-V2-33, BCR-V3-27 (a)) | the base's plan step 3, T28-3, T29-4; V03 3.7.1; V01's entrance reserve | **one condition, three door placements** (S23R3-01, -02, -03) |
| the outside basement door's position | V03 3.7.1 (tomb door, wall walk-out); the base's step 3 (lowest side) | V03's plan; V01's reserve (a guess at the main side) | **no single producer** (S23R3-01, -02) |
| island `Bridge` build (`deckCm`, `kind`, `piers`) | §4.8's rule in V01's closing L1 batch | X28's deck-plot rule at S10, V02 S11's `DeckContext.surfaceCm` | **built after its consumers** (S23R3-04) |
| `capacity(b)`'s `R(s)`; `Entrance.storey`; the wall walk-out | V03 BCR-V3-12, -26, -27 (a), built at M6-P | S10b's re-homing (M2b); S11's entrance set and basement (M3a); V01's reserve (M5); V02's porches; the exports | **eager facts staged after their readers** (S23R3-05, -06) |
| an access head's state | II.7.4 (stored, or derived while its element is closed) | V01 V1-3.8.8 (both forms); V03 3.7.2 (7) (stored only) | **one form missing on V03's side** (S23R3-07) |
| `cryptSeedWings`, `stairTreads`, `facadeBays(w, side, bayM)`, `composition.classFamily`, `programmeSource.via`, the half cellar's raise, `bend.deck.basement` | as round 2 | as round 2 | wired (unchanged since round 2) |

### 3.5 File f and `_integrate.md`

File f's round-3 items read cleanly on this seam (309, 370, 231, 376). Items 233, 241 and 242 carry V03's M6-P label for
eager facts (S23R3-06). `_integrate.md`'s one change (J-VI.16, the village's cap) is outside this seam; nothing there
contradicts V01, V02 or V03.

## 4 Issue register (round 3)

Counts: **8 issues — 0 blockers, 5 majors, 3 minors.** Owners: V03 2 majors, 2 minors; V01 2 majors; V02 1 major;
BASE-F 1 minor.

| id | sev. | owner | kind | the claim in one line |
|---|---|---|---|---|
| S23R3-01 | major | V03 | contradiction (base text) / no single producer | the base's step 3 puts every `external` door on the lowest side; V03 puts the tomb door and the wall walk-out elsewhere; no request amends step 3 or T28-3 |
| S23R3-02 | major | V01 | contradiction (term, record reading) | the entrance reserve reads every `external` access as the tomb door at the main side; walk-outs are `external` with their door on the low or wall side |
| S23R3-03 | major | V02 | contradiction (base text left by a request) | BCR-V2-33 leaves T29-4 and J-A29.25 equating `external` with a walk-out; T29-4 fails T-V2-44's all-solid temple; "storey 0" for the ground |
| S23R3-04 | major | V01 | ordering / unwired producer | the island bridge's `deckCm` is set in the closing batch, after S10–S11, where V02's deck plots and datum need it |
| S23R3-05 | major | V03 | milestone / eager fact on the lazy rung | BCR-V3-12 (capacity), BCR-V3-26 (entrance set and storey) and BCR-V3-27 (a) (wall walk-out) change eager facts but are built at M6-P |
| S23R3-06 | minor | BASE-F | milestone labels | items 233, 241, 242 follow S23R3-05; S23R3-01's new request needs its item |
| S23R3-07 | minor | V03 | contradiction (rendering) | 3.7.2 (7) draws a head's stored state only; II.7.4's derived reading (collapsed, sealed) and V01's J-V1.93 form are missing |
| S23R3-08 | minor | V03 | stale record | §12's and §13's round-3 texts call BCR-V2-33 unapplied |

### S23R3-01 — major — owner V03 — one outside basement door, one producer

**Claim.** Base §2.6, the plan rung's step 3 (l. 1601–1602): "`external`, a walk-out's outside stair: the core stopping at
the ground storey, a door (an `Opening` of kind `door`) opens the basement in the side of `Basement.ring`, among those at
least two of step 4's wing-local modules long (a door's width), whose midpoint samples lowest on the terrain (the sampler
`deriveBase` reads; ties by ring index)". §13.2's T28-3 (l. 13335): "or, for any other walk-out (`Basement.access`
`'external'`), by its outside stair". V03 3.7.1 places two of the three `external` doors otherwise — the tomb door "in the
face of a ground-standing wing on the main entrance's side … at that side's point nearest the main entrance" (l.
1495–1501) and the retaining-wall walk-out's door "on that side, onto the lower terrace" (l. 1502–1507) — while its
**Access** sentence reads "`external` with its door on the lowest side" (l. 1487–1488). BCR-V3-27 and BCR-V2-33 put those
placements into *Basements*; no request touches step 3, so the base will state two door rules for one record. On a
levelled plot the step-3 rule cannot find the wall at all: `deriveBase` samples `levelledGroundCm` with BCR-V2-42's
wall-band move, which reads the house's own platform under every side, so "lowest" is the ring-index tie. And V01 needs
the door's position from eager records (S23R3-02), which no function gives.
**Required change (V03).** (a) 3.7.1 states the door once as a derived function, **`basementDoor(b): { side: number /* the
`Basement.ring` edge */; at: PointCm } | null`** — pure, draw-free, of eager records only (`Basement.ring`, the entrances, the wings and
stairs, `RetainingWall`s, `levelledGroundCm`), null unless `Basement.access` is `external` — implemented in `@plat/plots`
beside `facadeBays` and re-exported by the plan package (the package precedent of BCR-V2-18), in this order: (1) **the
wall walk-out** (BCR-V3-27 (a)): the `Basement.ring` side on or within `cellar.insetCm` of a `RetainingWall`'s high side
whose `stepProfile` step there is at least half the cellar depth (the largest step first, ties by ring index), at its
midpoint; (2) **the tomb door**, where `ground(b)` is absent: 3.7.1's present rule, unchanged; (3) **the fall
walk-out**: the ring side at least two wing-local modules long whose midpoint `levelledGroundCm` samples lowest (ties by
ring index), at its midpoint; null where no side is that long (the base's trapdoor fallback, reported). 3.7.1's **Access**
sentence reads "(`core`, `trapdoor`, `external` with its door at `basementDoor(b)`)"; the tomb-door and walk-out bullets
cite it. (b) A new **BCR-V3-32 — the outside door of an external basement** on `### 2.6 …`, the plan rung's step 3:
current "`external`, a walk-out's outside stair: the core stopping at the ground storey, a door (an `Opening` of kind
`door`) opens the basement in the side of `Basement.ring`, among those at least two of step 4's wing-local modules long (a
door's width), whose midpoint samples lowest on the terrain (the sampler `deriveBase` reads; ties by ring index)" → new
"`external`, an outside stair — a walk-out's, or the tomb door of a building with no storeyed ground wing (BCR-V2-33):
the core, where one serves the ground, stopping at the ground storey, a door (an `Opening` of kind `door`) opens the
basement at the point volume V03 §3.7.1's `basementDoor(b)` gives — the retaining wall's side for a walk-out at a wall,
the tomb door's side where no ground wing is storeyed, else the side among those at least two of step 4's wing-local
modules long whose midpoint samples lowest on `levelledGroundCm` (ties by ring index)"; and in §13.2's T28-3, current
"or, for any other walk-out (`Basement.access` `'external'`), by its outside stair" → new "or, for any other `external`
access (a walk-out, or a building with no storeyed ground wing), by its outside stair at `basementDoor(b)`". (c) §1b
gains the row "`basementDoor(b)` | derived function (`@plat/plots`) | `Basement.ring`, the entrances, the wings and
stairs, `RetainingWall`s with `stepProfile`, `levelledGroundCm` | step 3's door (BCR-V3-32), 3.7.1's tomb door and
walk-outs, volume 1's entrance reserve (V1-3.8.2 step 5), T28-3, T-V3-30 | §2.6 step 3"; T-V3-30 gains "the outside door
of every `external` basement lies at `basementDoor(b)`, and on the terrace-wall sub-fixture every wall walk-out's door is
on the wall's side"; a J-V3 row records the choice (one function over two texts). `basementDoor` is built with BCR-V3-27
(a) at M3a (S23R3-05), so volume 1's reserve at M5 can call it.

### S23R3-02 — major — owner V01 — the entrance reserve at the real outside door

**Claim.** V1-3.8.2 step 5 (l. 1616–1618): "and, where the building's `Basement.access` is `external` (volume 3's tomb
door, 3.7.1), the main entrance's rectangle again, centred on the point of the main entrance's side nearest the
`Basement.ring`. It holds the porch, the secondary porch, the stoop (V03 O1 (e)) and the tomb door's steps"; J-V1.75
(l. 2989) and S23-23's row say the same. `external` is also every walk-out (the base's *Basements*; BCR-V3-27 (a)),
whose door lies on the lowest or the wall's side (the base's step 3; V03 3.7.1). On a hill, where walk-outs are common,
the reserve lands at the front of a walk-out house, where no door is, and none lies at the walk-out's door: a well, a
tree or a statue may stand against it — the clash the reserve exists to prevent.
**Required change (V01).** V1-3.8.2 step 5's clause → "and, where the building's `Basement.access` is `external`, the
main entrance's rectangle again, outward from the footprint side nearest the point volume 3's `basementDoor(b)` gives
(V03 §3.7.1: a walk-out's door on the retaining wall's or the lowest side, the tomb door where no ground wing is
storeyed), centred on that point's projection onto that side"; "the tomb door's steps" → "the outside basement stair's
steps"; J-V1.75's "(and repeated at an `external` basement's tomb door)" → "(and repeated at an `external` basement's
outside door, `basementDoor(b)`)"; §1.2's V03 row (l. 290) adds `basementDoor(b)`; §1b's reserve row names it as an
input; V1-3.8.3's chunk digest adds each building's `basementDoor` value; T-V1-26 gains "on the terrace-wall sub-fixture
and a hill fixture with fall walk-outs, 0 pins inside the reserve at a walk-out's door and 0 reserves at the main side of
a walk-out building"; cross-volume note (27) records the V03 dependency (S23R3-01).

### S23R3-03 — major — owner V02 — the base texts BCR-V2-33 leaves

**Claim.** BCR-V2-33 (l. 3901–3908) widens `external` to "a walk-out, or where no ground wing reaches storey 0" and
amends §2.6 *Basements* and §10.2's comment, but two base texts still read `external` as a walk-out only: §13.2's T29-4
(l. 13373), "every basement … with … its access by one of the three ways §2.6 gives it — the stair core, a trapdoor or,
for a walk-out, an outside stair", a 100 % conformance bar that the all-solid stepped temple with a requested basement —
`external` by T-V2-44's new clause (l. 3270–3273) — fails; and J-A29.25 (l. 16963), "`Basement.access` derived —
`external` for a walk-out, else the programme row's `basementAccess` at `builtBand`". The condition's words also use
"storey 0" for the real ground, the term V03 3.3 reserves (level 0 is the lowest storeyed level, as BCR-V2-33's own
`Storey.level` extension says).
**Required change (V02).** BCR-V2-33 gains two base edits and one wording: (i) §13.2's T29-4, current "the stair core, a
trapdoor or, for a walk-out, an outside stair" → new "the stair core, a trapdoor or, for an `external` access (a
walk-out, or a building with no storeyed ground wing), an outside stair"; (ii) J-A29.25, after "`external` for a
walk-out" add "or where no ground wing is storeyed (BCR-V2-33; its door volume V03 §3.7.1's)"; (iii) in the *Basements*
sentence and V2 §3.15.3, "where no ground wing reaches storey 0 — every wing standing on no other wing is solid (volume
2's `storeyRange` gives it no storey)" → "where no wing standing on no other wing is storeyed (volume V03 §3.3's
`ground(b)` absent; volume 2's `storeyRange` gives each such wing no storey)". T-V2-44's clause adds "and T29-4 holds on
both temples"; J-V2.99 notes the two base texts. File f item 371 then carries the widened text (its label unchanged).

### S23R3-04 — major — owner V01 — build the island bridge before its deck plots

**Claim.** V1-3.10.3 (4) (l. 1884–1906): the span is laid after S7c; S8 reaches its deck ends; S9 – S12b run; the site
becomes "a built `Bridge` with that way, its furniture laid by §4.8's bridge rule in the unit's closing L1 batch (the
unit run has no S7)", and "Its deck plots, where item 110 (d)'s row lays them, belong to the district V1-3.17.6 (1)
names … the S7b split above counts the row's expected deck capacity". §4.8's rule is what sets `Bridge.deckCm`, `kind`
and `piers` ("set by S7 when the bridge is built", base l. 1790; l. 5795). V02 offers no deck plot on a bridge "whose
`deckCm` is not yet set" (V2 §3.16 (1); X28) and seats deck buildings at `DeckContext.surfaceCm` = `Bridge.deckCm` (V2
§2.6 l. 771; §3.16 (5)). On an island S10 and S11 run before the closing batch, so the deck plots V01 counts are never
offered (the split's deck capacity becomes surplus), or, offered, have no surface; a `ford` kind, which offers none, is
likewise unknown at S10.
**Required change (V01).** V1-3.10.3 (4)'s **Crossing sites**: after "a seed or a lane must reach it, F-TEMPLATE's last
rung laying a lane to it." add "**After S8 and before S9**, one L1 batch on the island's overlay removes the span of every
site with a deck end no rung reached (the site stays a `site`, reported as below) and **builds** every other span by §4.8's
bridge rule — `deckCm` from its two bank elevations (`levelledGroundCm` on the island's key) plus the clearance row,
`kind` and `piers` as S7 sets them on the ground — so S10's deck-plot rule and S11's `DeckContext` (V02 §3.16 (1), (5);
X28) read a built deck; its furniture stays in the closing L1 batch."; "has its span removed in the closing batch" →
"has its span removed in that batch"; F-TEMPLATE's row (l. 2037) reads "its span removed after S8"; J-V1.91 adds "and the
span is built after S8, before S9, because the island's deck plots and deck buildings read `deckCm`"; T-V1-21 gains
"every island bridge that offers deck plots has `deckCm`, `kind` and `piers` set before S10, and each of its deck
buildings' `baseCm` equals `deckCm`".

### S23R3-05 — major — owner V03 — eager facts built with their inputs, not with the plan rung

**Claim.** Three of V03's base changes alter facts the base derives eagerly: BCR-V3-12 rewrites *One capacity function*
(`R(s)`, l. 2547–2555), which S10b's placement and the capacity rule's re-homing read; BCR-V3-26 adds `Entrance.storey`
"derived with the entrance" and drops a secondary entrance whose outside ground meets no floor (*Entrances* rule 4;
l. 2686–2699) — V03's lifecycle row creates it in "§2.6's `deriveEntrances` at S11" (l. 918; J-V3.99); BCR-V3-27 (a)
adds the walk-out at a retaining wall to the basement decision (l. 2701–2710), which sets `Basement.access`. V03's §8
builds all three in P1 (l. 2267: "the exposure gates and entrance storeys (BCR-V3-25, -26, -27 (a))"), and file f labels
items 233, 241 and 242 STAGED (M6-P) — while their inputs exist earlier (the capacity function at M2b; stacks, retaining
walls and `levelledGroundCm` at M3a, items 227, 245, 309), while their readers run earlier (V01's entrance reserve at M5,
V02's porches and T-V2-44, the base's exports), and while BCR-V2-41 — rule 5 of the same entrance derivation, grouped
with BCR-V3-26 by file f items 230 and 241 — is BASE (M3a). At M6-P every multi-storey building's capacity falls by a
stair bay and a landing per upper storey (households re-home), and every terraced or stacked building's entrance set,
entrance storeys and walk-outs change: a one-time shift of eager records that no text declares — the class round 1
removed for the half cellar (S23R1-05) and round 2 for the ground reader (S23R2-02).
**Required change (V03).** §8 gains a work item before P0: "**PE — the plan rung's eager facts** (built into the base
within M2b and M3a, not the plan package): BCR-V3-12's `R(s)` with *One capacity function* at **M2b**, its two cells `stair.ladder` and
`stair.landingCm` shipped in the base's `roomProgram.json` from M2b (the rest of `PlanGeometryRow` at M6-P); BCR-V3-26's
`Entrance.storey`, its tolerance cell and *Entrances* rule 4's non-derivation, 3.6's storey rule, and BCR-V3-27 (a)'s
walk-out at a wall with `basementDoor(b)` (S23R3-01) in S11 at **M3a**, with item 110 (a) and (c) and BCR-V2-41 | T-V3-30's
entrance-storey and walk-out clauses and T-V3-34 on B-CITY-lite at M3a; the capacity's re-homing bar at M2b | 0.75–1 pw,
moved from P1 (the volume's total unchanged)"; P1's cell drops those items and cites the row; §2.5's `Entrance.storey`
migrate cell reads "none needed: built at M3a with the first stacks and walls, so no shipped document holds an entrance
without it; a document from before M3a derives 0 for every entrance on load (T-V3-34)"; a J-V3 row records "chose to
build the eager halves with their inputs' milestones (M2b, M3a) over M6-P, because the capacity, the entrance set and
the basement are read before the plan exists and a later build would shift them once, undeclared". File f's labels
follow (S23R3-06).

### S23R3-06 — minor — owner BASE-F — the labels that follow

**Claim.** File f items 233 (BCR-V3-12), 241 (BCR-V3-26) and 242 (BCR-V3-27) read **STAGED (M6-P, the plan rung)**
(l. 131, 147, 149); S23R3-05 builds them at M2b and M3a. S23R3-01's new BCR-V3-32 has no item.
**Required change (BASE-F).** Item 233 → "**BASE (M2b, with *One capacity function*; its two `PlanGeometryRow.stair`
cells shipped then; S23R3-05)**"; item 241 → "**BASE (M3a, with item 110 (a), (c) and item 230 (BCR-V2-41) — S11's
entrance derivation; S23R3-05)**"; item 242 → "**BASE (M3a, with item 110 (a)'s retaining walls — S11's basement
decision; S23R3-05)**", *Needed by* V01, V02, V03 (volume 1's reserve reads the door); a new item after 242: "BCR-V3-32
(V03 §10) — the outside door of an external basement: the plan rung's step 3 and T28-3 read `basementDoor(b)`
(S23R3-01). *Note:* applied after items 371 (BCR-V2-33) and 242. *Needed by:* V01, V02, V03. **STAGED (M6-P, the plan
rung)** for the step-3 and T28-3 texts; `basementDoor(b)` itself lands with item 242 (M3a)". The reconciliation table
gains the rows.

### S23R3-07 — minor — owner V03 — a head's state as II.7.4 reads it

**Claim.** V03 3.7.2 (7) (l. 1548–1551): "The access's `state` (II.7.4) is drawn and exported (5.1, 5.3): `open` as drawn;
`locked` a closed, locked door or hatch; `bricked` the opening drawn as wall with a bricking hatch and left out of every
portal"; 5.1 (l. 2052–2053) and T-V3-13 draw and test the three stored states only. II.7.4's `state` "reads collapsed or
bricked while its element is closed (II.6), a derived reading" (base l. 15879), and §8.2's `access` row draws the
collapsed reading "as a trace with rubble stipple". Volume 1 now draws the surface symbol in that form, stored or derived
(V1-3.8.8; J-V1.93: "one access must read the same at both ends"). A building-hosted head over a collapsed element is
drawn `open` and exported with a walkable portal.
**Required change (V03).** 3.7.2 (7)'s sentence → "The access's `state` as II.7.4 reads it — the stored `state`, or, while
its element is closed (II.6), the derived reading (`bricked` while sealed; collapsed while collapsed) — is drawn and
exported (5.1, 5.3): `open` as drawn; `locked` a closed, locked door or hatch; `bricked` the opening drawn as wall with a
bricking hatch and left out of every portal; collapsed the opening drawn as a trace with rubble stipple (§8.2's `access`
row, as volume 1's V1-3.8.8 draws the surface symbol) and left out of every portal"; 5.1's head list adds "a collapsed
head as a trace with rubble stipple"; T-V3-13 adds "a head whose element is sealed or collapsed has no portal";
BCR-V3-28's digest already hashes each access's state (unchanged).

### S23R3-08 — minor — owner V03 — the round-3 record reads as pending

**Claim.** V03 §12's round-3 paragraph (l. 2852–2855): "BCR-V2-33 (whose *Basements* sentence still reads "`external` under
a solid ground wing"; seam issue S23R2-03 brings it to the condition 3.7.1 cites …)"; §13's round-3 hand-off (l.
2971–2972): "volume 2. Seam issue S23R2-03 brings BCR-V2-33's *Basements* sentence to …". V02's round 3 applied it
(BCR-V2-33, V2 §3.15.3, J-V2.99), so an implementer reading V03 is told the base text disagrees with 3.7.1.
**Required change (V03).** §12's parenthesis → "(whose *Basements* sentence volume 2's reconciliation round 3 brought to
'external where no ground wing is storeyed', J-V2.99, S23R2-03)"; §13's bullet → "**volume 2.** Applied by volume 2's
reconciliation round 3 (BCR-V2-33, V2 §3.15.3, J-V2.99); nothing open."

## 5 Summary by owner, decisions, CONFIRMED versus PLAUSIBLE

**By owner.** V03: S23R3-01 (major), S23R3-05 (major), S23R3-07, S23R3-08 (minor). V01: S23R3-02 (major), S23R3-04
(major). V02: S23R3-03 (major). BASE-F: S23R3-06 (minor).
**Order for the lanes:** V03's S23R3-01 defines `basementDoor(b)`, which V01's S23R3-02 reads; V03's S23R3-05 builds it
at M3a; BASE-F's S23R3-06 relabels after V03 lands. V02's S23R3-03 and V01's S23R3-04 stand alone.

**Decisions (vetoable).**

| id | decision |
|---|---|
| J-S23R3.1 | Chose to cover the five files by **the full diff since round 2's inputs** (reproduced exactly by the round-3 lanes' backups) plus a **script census of every cross-reference** among V01, V02 and V03 and a **mechanism trace** of each changed rule into the untouched text of all three volumes and the base, over re-reading 1.4 MB whole, because every line has been read whole in an earlier round (round 0 all three; round 1 V02, V03, file f, `_integrate.md`; round 2 V01's seam sections), the diff isolates what round 3 changed, and the trace is where round 3 found what diffs alone would miss (the base's step 3, T29-4, J-A29.25 and file f's eager-fact labels, untouched by any lane); the precedent is J-S23R2.1. |
| J-S23R3.2 | Chose **one derived function, `basementDoor(b)`, in `@plat/plots`** (S23R3-01) over amending step 3 with three placements in prose and letting V01 re-derive them, because V01's reserve (M5) and V03's plan (M6-P) must agree on one point, the inputs are all eager, and `facadeBays` set the package precedent for a plan-rung rule volume 1 reads before the plan package exists. |
| J-S23R3.3 | Chose to **build V03's eager halves with their inputs' milestones** — the capacity's `R(s)` at M2b, the entrance storey, rule 4's non-derivation and the wall walk-out at M3a (S23R3-05) — over declaring a one-time shift at M6-P, following J-S23R2.3 and S23R1-05: the capacity, the entrance set and the basement are read by volumes 1 and 2 and the exports long before the plan exists, and a shift of households and entrances in every saved document is costlier than two table cells and one S11 rule landed early. |
| J-S23R3.4 | Chose to **build the island bridge after S8** (S23R3-04) over lifting X28's `deckCm` gate for islands, because the gate is right everywhere — a deck with no height carries no house — and S8 is the first point at which the unit run knows which spans survive. |
| J-S23R3.5 | Graded the access-state gap (S23R3-07) **minor**, over major, because II.7.4 already defines the derived reading a careful builder applies; the defect is the missing collapsed form and portal rule in V03's own list. |

**CONFIRMED versus PLAUSIBLE.** CONFIRMED by reading, at the lines cited: every status of §2 (each fix located by `diff`
against backups whose hashes equal round 2's inputs, and read in the current file); every claim of S23R3-01 – S23R3-08
(the base's step 3, T28-3, T29-4, J-A29.25, *One capacity function*, `Bridge.deckCm` and §4.8's rule, §8.2's `access` row
and II.7.4's `state` read in `docs/ARCHITECTURE.md`; V01 V1-3.8.2 step 5, V1-3.10.3 (4), V1-3.17.6, J-V1.75, J-V1.91,
J-V1.93; V02 BCR-V2-33, §3.15.3, §3.16, §2.6's `DeckContext`, X28, T-V2-44; V03 3.3, 3.7.1, 3.7.2 (7), 5.1, §2.5, §8's P1,
BCR-V3-12, -26, -27, §12, §13; file f items 230, 233, 241, 242, 309, 371); that no volume or amendment file quotes or
amends step 3's `external` clause (`grep` over all); the census's 0 dangling references (executed); the input hashes
unchanged from start to end. PLAUSIBLE until the owners apply the changes and a later round re-checks: the required
texts themselves; that `basementDoor(b)`'s order (wall, tomb, fall) matches every fixture's intended door; J-S23R3.3's
estimate (0.75–1 pw moved, none added). Nothing was executed beyond `diff`, `grep`, `md5` and the census script: this
lane writes a critique.

**Outside this seam.** V05's BCR-V5-30 reader list still omits volume 3's W2 outside ground, which file f item 309 and V03
§13 name (the layers seam's to confirm; V03's round-3 hand-off asks for it). V01's round-3 island edits (runs after
generation, the hood's void part, access symbols) touch V04 and V05; their other halves are the layers and time seams'.

## 6 Continuation — re-check of round 2's continuation (S23R2-09 … 15)

*Re-issued brief, 2026-09-29 ~10:55 (lane-events NOTE of that time).* Round 2's file now ends with seven issues its
continuation raised at 10:08, after this lane's 06:50 landing; the reconcile lanes' second briefs applied them (V02 10:24,
V01 and V03 10:34, file f 10:39). Each is re-checked here in the live text. **Inputs** (md5 at this continuation's start,
snapshots in the session scratchpad's `volumes/seam23r3c/now/`): V01 925e51b5… (4 052 lines), V02 0c432111… (4 719), V03
e83ffac3… (3 434), file f b4546425… (1 526), `_integrate.md` 965ab696… (468, unchanged since round 2's continuation), the
base 01fea21f… (unchanged since round 0). S23R2-01 … 08 (re-checked fixed at 06:50, §2) were spot-checked again at their
anchors and still stand (BCR-V2-32's `levelledGroundCm`, file f item 309's BASE (M3a) label, BCR-V2-33's condition, V2
§3.17 (a)'s pointer, V2 §1b's resolution-chain row); round 3's own S23R3-01 … 08 were seen applied by round 2's
continuation (its §7.2) and no later diff reverts them.

| id | r2 sev. | owner | status | evidence (live file, line) |
|---|---|---|---|---|
| S23R2-09 | major | BASE-F | **fixed** | item 233 ships `stair.ladder` and `stair.landingCm` at M2b and five more cells at M3a with items 241, 242 and 578, the rest with M6-P (file f l. 137); item 241 names `datum.maxSteps`, `stair.riserCm`, `exposureAllStoreys` (l. 153); item 578 names `moduleCm`, `door.mainCm` (M3a) and `cellar.insetCm`, `cellar.depthCm` (M2b) (l. 157); the reconciliation row (l. 1466) |
| S23R2-10 | major | V03 | **fixed** (two residues: S23R3-12, S23R3-15) | 3.1 step 2 (l. 995–1001); `AccessHead.storey: number \| null`, `room?`, `door?` (l. 445–455); S6's `solidMonument` (l. 1278–1283); 3.4a (l. 1352–1354); A5 (b) (l. 1142–1149); A2 (10); O2's root (l. 1467–1468); 3.7.2 (1), (4)–(7) (l. 1622–1667); 3.9's row (l. 1827); 4.5; 5.1 (l. 2182–2185); 5.3 (l. 2235–2238, 2254); 2.5's `Plan.heads` row (l. 960); T-V3-22, T-V3-23 (e), T-V3-29 (l. 2365–2372); BCR-V3-14's T28-2 text (l. 2733–2735); J-V3.91, J-V3.117, J-V3.119 |
| S23R2-11 | minor | V02 | **fixed** (a residue: S23R3-14) | BCR-V2-41's New text "has no plan above the ground — no level at or above it and no room there; its basement storeys and the heads of its hosted accesses are planned as volume 3 §3.1 states" (l. 4115–4117); J-V2.83 (l. 3581); T-V2-45 (l. 3336–3337); X18 (l. 4393) |
| S23R2-12 | minor | V02 | **fixed** | BCR-V2-33's *Basements* door clause "at volume 3's `basementDoor(b)` (V03 §3.7.1: a retaining wall's side first, else the tomb door)" (l. 3982–3987) and its (c) root clause (l. 4005–4008); V2 §3.15.3 (l. 2369–2371); IN-V02-2 (a) (l. 4434–4437); J-V2.99 (l. 3599); T-V2-44 (l. 3326–3327); X18; V03's BCR-V3-32 New text follows the same order (V03 l. 2921–2924) |
| S23R2-13 | minor | V01 | **fixed** | §1.2's V03 row and V1-3.8.2 step 5 read "(V03 §3.7.1, whose rules place it)" (l. 320, 1655–1656) |
| S23R2-14 | minor | V02 | **fixed** | §1b's stack-helpers row "derived functions, exported by `@plat/plots`, built at M3a-V2" with volume 3's eager readers and volume 1's reserve (l. 307), `rebaseStack`'s row (l. 290); §2.6's derived-at-read heading (l. 801); §8.5's M3a-V2 cell and its *Dependencies* sentence (l. 3471, 3482–3484); J-V2.105 (b) |
| S23R2-15 | minor | V03 | **fixed** | §1b's level-reading row adds `Entrance.storey`, `basementDoor(b)`, volume 1's reserve and digest and the base's *Basements* (l. 314); the `PlanGeometryRow` row names PE's readers and cells by milestone (l. 282); the `basementDoor(b)` rows add V1-3.8.3 (l. 318, 347); the new `ground(b)` interface row (l. 348) |

**Totals.** 7 of 7 fixed; with the 06:50 landing's re-check (S23R2-01 … 08) every one of round 2's 15 issues is closed.
The residues found at their sites — T28-1 on the storey-less plan S23R2-10 opened (S23R3-12), the sealed stack still named
a storey-less building in the texts S23R2-11 reworded (S23R3-14, S23R3-15) — are registered anew in §8 with their cause.

## 7 Continuation sweep

### 7.1 Coverage (J-S23R3.6)

Every text of the seam up to round 2's continuation inputs (V01 7ba65e0b…, V02 bd45a3b4…, V03 1bf49bc9…, file f
ae1bb8ca…, `_integrate.md` 965ab696…) has been swept by a round: rounds 0 – 1 read every file whole, rounds 2 – 3 and round
2's continuation read every change since by full diff. This continuation read the **full diff** of each file from those
inputs (round 2's continuation snapshots, hashes checked) to the live text — every changed line, 1 156 diff lines (V01
155, V02 258, V03 564, file f 179, `_integrate.md` 0; `scratchpad/volumes/seam23r3c/d1.txt` … `di.txt`) — and then
followed each mechanism a changed passage touches into the untouched text of all three volumes and the base, reading every
hit in place: the storey-less plan (3.1 step 2, S6, A5 (b), O2, 3.7.1 – 3.7.2, 3.9, 4.5, 5.1, 5.3, §7's fixtures and bars;
the base's T28-1, T28-2, F-PLAN row; BCR-V2-41, BCR-V3-14, BCR-V3-26; V01 §0, V1-3.8.2 step 5, V1-3.8.8), the null head and
its door (`AccessHead`, 3.7.2 (1), V1-3.8.2 step 5, J-V1.96, T-V1-26; V02's ground wings and stair 0's approach strip, V2
§3.15, §4.6), the outside basement door as a root (O2, 3.7.1; the base's step 3, step 5 and J-A29.25; BCR-V2-33 (c)), the
sealed stack (V2 §3.15.2 ST5, §4.6, ST7's hint, T-V2-45; V03 S6 (e), T-V3-28), and the functions homed in `@plat/plots`
(V2 §2.6's derived-at-read block, `basementDoor(b)`'s declaration, BCR-V5-30's reader signature, the base's
`TerrainSampler` and `deriveBase`). A script census over the three live volumes (`seam23r3c/census.py`) resolves every
`J-V`, `T-V` and `BCR-V` id and every `V1-x`, `V2 §x` and `V03 x` section one volume cites in another: **0 dangling**.
Working notes: `seam23r3c/notes.md`.

### 7.2 What holds

The seven repairs read as their issues asked, at both ends. The five `PlanGeometryRow` cells ship at M3a in file f's items
233, 241 and 578 and in volume 3's `PlanGeometryRow` row and register lines (PE's cells on V12's default line), so
`Entrance.storey` and `basementDoor(b)` land with every cell they read. The stack helpers and `rebaseStack` are homed in
`@plat/plots` at M3a-V2, and volume 3's PE names them as its inputs. `ground(b)` has its interface row, with volume 1's
reserve and digest and the base's *Basements* condition among its readers, wired both ways. The storey-less stack's door
reads `basementDoor(b)` in every text of volume 2 (BCR-V2-33 and its (c), §3.15.3, IN-V02-2, J-V2.99, T-V2-44, X18) and in
BCR-V3-32's step-3 text. Volume 1 cites `basementDoor(b)` without a gloss. A flat-topped great temple's crypt and door are
planned, and the switcher, the frame, the panel, the draw and the exports carry the null head. No `_integrate.md` text
changed; none of the other file-f edits (items 372, 390, 410, 463, 467, 468, 497, 583) touches this seam.

### 7.3 What breaks (each registered in §8)

1. **One outside door of a stack-hosted access, two rules.** Volume 3's head (3.7.2 (1), l. 1622–1630) takes "the
   ground-standing wing whose ring lies nearest `ground.at`", its outline side nearest `ground.at`, and `at` "the
   projection of `ground.at` onto that side moved along it until `door.entranceCm` + 2 · `jambCm` lies within the side
   and outside every stair wing's ring and stair 0's approach (else centred on the side, reported) — so it stands where
   volume 1's reserve for it stands". Volume 1's reserve (V1-3.8.2 step 5, l. 1658–1663; J-V1.96) takes "the footprint side
   nearest the access's `ground.at`, centred on `ground.at`'s projection onto it". Stair 0 is a ground wing ("the ground
   wings — tier 0 and stair 0 — tile", V2 l. 2303), so where `ground.at` lies nearest the flight both texts pick the
   stair's side, and volume 3's door, unable to leave the stair's own ring along that side, falls to "centred on the side":
   a door in a flight. Wherever the projection is moved — near a corner, or off stair 0's approach strip — the door leaves
   volume 1's rectangle, and T-V1-26's stack-door clause fails; volume 3's "so it stands where volume 1's reserve for it
   stands" is then false. The door's point is a pure function of eager records (the wings, `stairChain`, `ground.at`), so
   one function can serve both, as `basementDoor(b)` does (S23R3-09, S23R3-10).
2. **The outside door of an `external` basement is not a root in volume 3.** The base's step 3 stops the core at the
   ground storey for an `external` basement (l. 1601–1602; J-A29.25), so the basement is entered by its outside door alone;
   the base's step 5 makes that door "the root of the basement's storeys" (l. 1626), volume 2's BCR-V2-33 (c) re-words it
   for both `external` cases (V2 l. 4003–4008), and T28-2 starts there. Volume 3 lists "a walk-out's outside door" among
   O2's **Secondary entrances**, which "add their own openings only — never a tree edge — and a room reachable only
   through one of them is tier 1" (l. 1476–1478), and 3.7.1 says "a rule-1 or rule-3 door is a secondary entrance of O2,
   rule 2's the basement's root" (l. 1610). Every walk-out basement's rooms are then unreached — F-PLAN tier 1 on every
   hill house with a fall or wall walk-out (S23R3-11). O2's storey-less root cites "3.7.1 rule 2" though rule 1, the
   wall's side, can place that building's door (folded into S23R3-11).
3. **T28-1 on the storey-less plan.** A5 (b) now drops, "hard or soft, with no tier", every room whose storey rule admits
   no basement storey on a building with no storeyed wing (l. 1146–1148). The base's T28-1 — "each room the programme
   marks hard is present" — stands unamended (V03 §7: "The base's T28-1 – T28-19 … stand", l. 2322), and F-PLAN tier 1
   flags "a hard room missing". The `stepped_temple` row's `chapel` is hard with storey `top` (l. 836), and `top` is "the
   highest storeyed level", none on a flat-topped great temple — the fixture S23R2-10 added to T-V3-23 (e) and T-V3-29
   fails T28-1 (S23R3-12, S23R3-13).
4. **The sealed stack is not always storey-less.** Volume 2 lets a sealed stack (stair form `none`) carry "a storeyed
   shrine or tier … reached by nothing" (V2 §3.15.2 ST5, l. 2298; §4.6, l. 2715–2717), which volume 3 plans and flags
   `W_TIER_UNREACHED` (S6 (e), l. 1270–1271; T-V3-28's sealed-stack fixture). BCR-V2-41 still classes "a sealed stack" with
   the solid monument as "a building with no storeyed wing at all", and T-V2-45 now asserts "a sealed stack's … plan has no
   level at or above the ground" (S23R2-11's wording) (S23R3-14); volume 3's S6 lists the sealed stack the same way
   (l. 1278), beside its own S6 (e) (S23R3-15).
5. **Declarations that cannot reach the levelled reader.** `basementDoor(b: Building)` (l. 1578) reads
   `levelledGroundCm(doc, key, p)` and the `RetainingWall`s, neither reachable from `b` (S23R3-16); volume 2's
   `rebaseStack(b, sampler: TerrainSampler)` (V2 l. 807) types its sampler as the base's raster interface ("bilinear on
   the height raster", base l. 868), the reader S23R2-01 removed from the datum (S23R3-17).
6. **Stale paraphrase.** BCR-V3-26's closing sentence still gives BCR-V2-41's exception as "no plan where no wing is
   storeyed" (l. 2851) (S23R3-15).

### 7.4 Wiring across the seam — the pieces changed since round 2's continuation

| piece | produced by | consumed by | status |
|---|---|---|---|
| `PlanGeometryRow`'s five M3a cells | V03 2.4, shipped by file f items 233, 241, 578 | `Entrance.storey`, `basementDoor(b)`, W2's outside sample (PE); V01's reserve through `basementDoor(b)` | wired both ways |
| `deckLevel`, `storeyRange`, `stairChain`, `landingSide`, `rebaseStack` (`@plat/plots`, M3a-V2) | V02 §2.6 | V03's PE (`ground(b)`, `floorCm`, `basementDoor(b)`), V01's reserve through them | wired; `rebaseStack`'s declared sampler type (S23R3-17); PE's dependency cell omits `deckLevel` (folded into S23R3-09) |
| `ground(b)` interface | V03 3.3 (PE) | V03's plan, `Entrance.storey`, `basementDoor(b)`, V1-3.8.2 step 5, V1-3.8.3, BCR-V2-33 | wired both ways |
| `AccessHead` null form and `door` | V03 3.7.2 (1) (P2) | V03 5.1, 5.3, 4.5, 4.6; V01's one-mark rule (V1-3.8.8) | drawn and exported; its point not the point V01 reserves (S23R3-09, S23R3-10) |
| the storey-less plan | V03 3.1 step 2 | BCR-V2-41, T-V2-45, X18; the base's T28-1, T28-2 (BCR-V3-14) | T28-1 unamended (S23R3-12); sealed stack misclassed (S23R3-14, S23R3-15) |
| the `external` basement's outside door as a root | the base's step 5; BCR-V2-33 (c) | V03 O2, 3.7.1 | read as a secondary entrance (S23R3-11) |
| `basementDoor(b)`'s inputs | V05 BCR-V5-30, V01 BCR-43, V02 `stairChain` | V03's declaration | declaration omits the document and key (S23R3-16) |

**Checked and not registered.** (a) V03's register lines for `roomProgram.json` (SCC-R2C-17) and volume 1's register
clause (SCC-R2C-13) name disjoint cells, and the M3a seat writes both volumes' entries by V12 §3.11's default line; their
registry rows are the content-calibration seam's. (b) Volume 1's cross-volume note (31) (`way.surface`, `squares.quota`
without registry rows; file f item 301's M5 label) touches no V02 or V03 record — the content-calibration and settlements
seams'. (c) `AccessHead.door.wing` is `number`, as `BaseWing.key` (V2 l. 459). (d) BCR-V3-19 adds `heads: AccessHead[] /*
V03 §2.1 */` by citation, so the null form needs no base edit. (e) J-V3.119's crypt-host rule and T-V3-23 (d) agree (a
non-catacomb head in the undercroft or crypt; a catacomb head the crypt join). (f) `stairTreads` reads volume 2's own
`riserMaxCm`, not `PlanGeometryRow`, so its M3a use needs no P1 cell.

## 8 Continuation register

Counts: **9 issues — 0 blockers, 4 majors, 5 minors.** Owners: V03 3 majors, 2 minors; V01 1 major; V02 2 minors; BASE-F 1
minor. Line numbers are the live files' (§6's hashes).

| id | sev. | owner | kind | the claim in one line |
|---|---|---|---|---|
| S23R3-09 | major | V03 | two producers of one point / false agreement claim | the stack-hosted access's outside door is placed by a rule volume 1 restates differently; the nearest ground wing can be stair 0, putting the door in a flight |
| S23R3-10 | major | V01 | restatement that contradicts (the other half of S23R3-09) | the entrance reserve re-derives that door on the nearest footprint side at `ground.at`'s projection instead of reading volume 3's point |
| S23R3-11 | major | V03 | contradiction (base text, BCR-V2-33 (c)) | O2 and 3.7.1 make a walk-out's outside door a secondary entrance, so every `external` basement's rooms are unreached; the base and volume 2 make it the root of the basement's storeys |
| S23R3-12 | major | V03 | contradiction (base bar) | A5 (b) drops hard rooms with no tier on a building with no storeyed wing; the base's T28-1 requires every hard room, so the flat-topped great temple fails |
| S23R3-13 | minor | BASE-F | label follows S23R3-12 | file f item 483 names T28-2 only |
| S23R3-14 | minor | V02 | term (sealed stack) | BCR-V2-41 and T-V2-45 class the sealed stack as storey-less, though volume 2 lets it carry a storeyed shrine that volume 3 plans |
| S23R3-15 | minor | V03 | stale wording | BCR-V3-26's closing paraphrase ("no plan where no wing is storeyed") and S6's list (the sealed stack) |
| S23R3-16 | minor | V03 | interface (signature) | `basementDoor(b: Building)` cannot reach the `levelledGroundCm(doc, key, p)` and `RetainingWall`s it reads |
| S23R3-17 | minor | V02 | interface (signature) | `rebaseStack(b, sampler: TerrainSampler)` types the raster sampler that BCR-V2-32 replaced by `levelledGroundCm` |

### S23R3-09 — major — owner V03 — the stack-hosted access's outside door, one function

**Claim.** V03 3.7.2 (1) (l. 1622–1630): the head is "an outside door in the face of the ground-standing wing nearest
`ground.at` … whose `door` (2.1) names that wing (the ground-standing wing whose ring lies nearest `ground.at`, ties by
key), its ring side on the building's outline nearest `ground.at` (ties by side index) and `at`, the projection of
`ground.at` onto that side moved along it until `door.entranceCm` + 2 · `jambCm` lies within the side and outside every
stair wing's ring and stair 0's approach (else centred on the side, reported) — so it stands where volume 1's reserve for
it stands wherever that side lies on the footprint (V1-3.8.2 step 5, J-V1.96; seam S23R2-10)". J-V3.117 repeats the
claim. Volume 1's reserve (V1-3.8.2 step 5, l. 1658–1663) is "the `hood` row's rectangle outward from the footprint side
nearest the access's `ground.at`, centred on `ground.at`'s projection onto it". Stair 0 is a ground wing (V2 §3.15.2 ST6,
l. 2303: "The ground wings — tier 0 and stair 0 — tile"), so where `ground.at` lies nearest the flight, volume 3's wing is
stair 0 and its door, which cannot leave stair 0's own ring along that side, falls to "centred on the side": a door in a
stair flight. Wherever the projection is moved — to fit the door near a corner, or off stair 0's approach strip (V2 §4.6,
l. 2755–2757) — the door leaves volume 1's rectangle (the `hood` row's width), T-V1-26's stack-door clause (0 hood pins
within 0.3 m of the door; its fallback doubles only the depth) fails, and the agreement volume 3 claims is false. Every
input of the point is eager (the wings, `stairChain`, `ground.at`, one cell), so volume 1 can read it at M5 as it reads
`basementDoor(b)` (J-S23R3.2's precedent). PE's dependency cell (l. 2407) also omits `deckLevel`, which `floorCm` reads
(§1b, l. 315).
**Required change (V03).** (a) 3.7.2 (1) states the door once as a pure function of eager records, **`stackAccessDoor(b:
Building, a: AccessPoint): { wing: number /* BaseWing.key */; side: number /* that wing's ring side */; at: PointCm }`** —
defined for a building with neither a basement nor `ground(b)`; draw-free; reads the wings (`on`, `solid`, `role`),
volume 2's `stairChain` (stair 0 and its approach strip, V2 §4.6), `a.ground.at` and the cell `moduleCm` — implemented in
`@plat/plots` beside `basementDoor(b)`, re-exported by `@plat/buildings`, built at M3a with the eager facts (§8's PE):
**the wing** — among the ground-standing wings whose `role` is not `stair`, the one whose ring lies nearest `a.ground.at`
(ties by key); **the side** — among that wing's ring sides on the building's outline at least two `moduleCm` long (a
door's width, §2.6 step 3, as `basementDoor(b)`'s door sides), the one nearest `a.ground.at` (ties by side index); **`at`**
— `a.ground.at`'s projection onto that side, moved along it by the least distance that puts it at least one `moduleCm` from
each end of the side's outline part and outside stair 0's approach strip; with no such side on any non-stair ground wing,
the midpoint of the outline side nearest `a.ground.at` of any ground-standing wing (reported `W_STACK_ACCESS`, as now).
3.7.2 (1)'s sentence from "whose `door` (2.1) names that wing" to "(V1-3.8.2 step 5, J-V1.96; seam S23R2-10)" → "whose
`door` (2.1) is `stackAccessDoor(b, a)` — the one point volume 1's entrance reserve reads (V1-3.8.2 step 5; seam
S23R3-09)"; the head is drawn `door.entranceCm` wide at that point (5.1). (b) 3.9's row "a hosted access on a solid stack
without a basement" reads "2: an outside door at `stackAccessDoor(b, a)`, `W_STACK_ACCESS`". (c) §1b gains the derived-piece
row "`stackAccessDoor(b, a)` (3.7.2 (1); seam S23R3-09) | the wings (`on`, `solid`, `role`), volume 2's `stairChain`,
`AccessPoint.ground.at`, the cell `moduleCm` | `AccessHead.door` (3.7.2 (1)), 5.1, 5.3, volume 1's entrance reserve and
close-up digest (V1-3.8.2 step 5, V1-3.8.3), T-V3-22" and the Interfaces row "`stackAccessDoor(b, a)` (3.7.2 (1); pure, of
eager records) | this volume's rule, implemented in `@plat/plots`, built at M3a (§8's PE) | 3.7.2 (1), volume 1's entrance
reserve and digest, T-V3-22"; the `AccessHead` row's cell and 2.1's `door` comment read "filled by 3.7.2 (1) from
`stackAccessDoor(b, a)`". (d) §8's PE row adds `stackAccessDoor(b, a)` to its M3a content and `deckLevel` to its
dependency cell ("volume 2's M3a-V2 (`storeyRange`, `deckLevel`, `BaseWing.on`, `.solid`, `stairChain`)"). (e) T-V3-22's
solid-stack clause "its `door` on the ground-standing face nearest `ground.at`" → "its `door` equal to `stackAccessDoor(b,
a)`, on a non-stair ground wing's outline side and outside stair 0's approach strip"; the clause runs from M3a on the eager
records (the function), the head's draw from P2. (f) J-V3.117's sentence "and the door's point is `ground.at`'s projection
onto the nearest outline side of the nearest ground-standing wing, so it stands where volume 1's reserve stands (J-V1.96)"
→ "and the door's point is `stackAccessDoor(b, a)`, which volume 1's reserve reads (seam S23R3-09)"; a new J-V3 row
records "chose one pure function of eager records over two texts deriving one point, and a non-stair wing with `moduleCm`
door sides over the nearest wing and `door.entranceCm` + 2 · `jambCm`, because stair 0 is a ground wing, volume 1's
reserve must read the point at M5, and `moduleCm` ships at M3a (file f item 233) while `door.entranceCm` and `jambCm` ship
at M6-P". No file-f change: no base text reads the function.

### S23R3-10 — major — owner V01 — the reserve reads the stack access's door

**Claim.** V1-3.8.2 step 5 (l. 1658–1663) places the stack-hosted access's rectangle by its own rule — "outward from the
footprint side nearest the access's `ground.at`, centred on `ground.at`'s projection onto it" — and J-V1.96 chose that rule
"over reading volume 3's head, which the plan rung lays lazily". Once volume 3 states the door as an eager function
(S23R3-09), volume 1's rule is a second, different statement of the same point: it takes stair 0's side where `ground.at`
lies nearest the flight and never moves the point along the side, so its rectangle misses the door wherever volume 3's
point is moved, and T-V1-26's stack-door clause fails.
**Required change (V01).** V1-3.8.2 step 5's clause "— the `hood` row's rectangle outward from the footprint side nearest
the access's `ground.at`, centred on `ground.at`'s projection onto it (seam S23R1-19; J-V1.96)" → "— the `hood` row's
rectangle outward from the footprint side on which volume 3's `stackAccessDoor(b, a)` lies (V03 3.7.2 (1), `@plat/plots`,
built at M3a), centred on its `at` (seams S23R1-19, S23R3-10; J-V1.96)"; "whose head volume 3 opens as an outside door in
the nearest ground-standing face" → "whose head volume 3 opens as an outside door at `stackAccessDoor(b, a)`"; §1.2's V03
row and §1b's reserve row add `stackAccessDoor(b, a)` as an input; V1-3.8.3's digest adds "each stack-hosted access's
`stackAccessDoor(b, a)` value" beside the `basementDoor(b)` value; T-V1-26's stack-door clause runs "from M5 on the eager
records (`stackAccessDoor(b, a)`)" instead of "from M6-P"; J-V1.96's first choice is rewritten: "Chose to place a
stack-hosted access's reserve rectangle at volume 3's `stackAccessDoor(b, a)` — a pure function of eager records in
`@plat/plots` from M3a — over this volume's own projection rule, because one point stated twice diverged (stair 0 is a
ground wing; the door is moved along its side), and the reserve stays a pure function of committed state in any order of
click and rung (J-V1.75)"; its second choice (`ground(b)` in the digest) stands.

### S23R3-11 — major — owner V03 — the outside door of an `external` basement roots its storeys

**Claim.** The base's step 3 stops the core at the ground storey for an `external` basement ("`external`, a walk-out's
outside stair: the core stopping at the ground storey", l. 1601–1602; J-A29.25, l. 16963; BCR-V3-32 keeps "the core,
where one serves the ground, stopping at the ground storey"), so that basement is entered by its outside door alone. The
base's step 5 makes the door "the root of the basement's storeys" (l. 1626), volume 2's BCR-V2-33 (c) re-words that
clause for both `external` cases — "an `external` basement's outside door (a walk-out's, or that of a building with no
storeyed ground wing — both at volume V03 §3.7.1's `basementDoor(b)`), where step 3 opens one, the root of the
basement's storeys" (V2 l. 4003–4008) — and T28-2 starts "for a basement whose `Basement.access` is `external`, at its
outside door". Volume 3's O2 lists "a walk-out's outside door" among the **Secondary entrances**, which "add their own
openings only — never a tree edge — and a room reachable only through one of them is tier 1" (l. 1476–1478), and 3.7.1
closes "a rule-1 or rule-3 door is a secondary entrance of O2, rule 2's the basement's root" (l. 1610). With no core in the
basement and no tree edge through the door, every room of every fall or wall walk-out's basement is "left unreached" —
F-PLAN tier 1 (3.9) on every hill house with a walk-out, while T28-2 as the base states it passes. J-V3.42's reason for
openings-only secondary entrances — "a room reachable only from outside breaks T28-2" — does not hold for this door, where
T28-2 itself starts. O2's storey-less clause (l. 1467–1468) also names the door "3.7.1 rule 2", though rule 1 (the wall's
side) places a storey-less building's door where it stands against a retaining wall (3.7.1, l. 1589–1596).
**Required change (V03).** (a) O2: after the **Stack roots** sentence add "**The basement root** (seam S23R3-11). Where
`Basement.access` is `external` and `basementDoor(b)` is not null, the room of storey −1 its door opens into — whichever
of 3.7.1's rules placed it — then starts a further Prim tree over the basement storeys' internal edges (the same costs),
after the stack roots: the core stops at the ground storey there (§2.6 step 3), so the door is the root of the basement's
storeys (§2.6 step 5 as volume 2's BCR-V2-33 (c) words it; T28-2's `external` clause)"; in the **Secondary entrances** list
delete "a walk-out's outside door;" (a side door onto a walk-out's low side, 3.6, stays one); the storey-less clause
"from the room the basement's outside door at `basementDoor(b)` opens into (3.7.1 rule 2, the basement's root; seam
S23R2-10)" → "from the basement root below (seams S23R2-10, S23R3-11)". (b) 3.7.1's "a rule-1 or rule-3 door is a
secondary entrance of O2, rule 2's the basement's root" → "whichever rule places it, the door is the root of the
basement's storeys (O2's basement root; §2.6 step 5 as BCR-V2-33 (c) words it; seam S23R3-11)"; rule 2's "The tomb door
is the basement's root (T28-2's `external` clause)" stands. (c) T-V3-30 gains "(S23R3-11) on its own fixtures —
item 110 (e)'s terraced wards and the terrace-wall sub-fixture, with their wall and fall walk-outs — every room of a
walk-out basement is spanned from the room its outside door opens into, none tier 1". (d) A J-V3 row: "chose the base's reading — an
`external` basement's outside door roots a Prim tree over the basement storeys — over openings only, because the core stops
at the ground storey there (§2.6 step 3, J-A29.25), T28-2 starts at that door, and volume 2's BCR-V2-33 (c) states it for
both `external` cases; J-V3.42 stands for the side, rear, yard and service doors".

### S23R3-12 — major — owner V03 — T28-1 on a building with no storeyed wing

**Claim.** A5 (b) (l. 1142–1148): "A room whose rule admits no storey the building has is `dropped` (soft, tier 0) or
delivered by tier 5 (hard) — on a building with no storeyed wing (3.1 step 2) it is `dropped`, hard or soft, with no tier,
under the information `solidMonument`"; 3.1 step 2 (l. 995–1001) says the same. The base's T28-1 (l. 13331) — "Hard: (T28-1)
each room the programme marks hard is present" — is unamended (V03 §7, l. 2322: "The base's T28-1 – T28-19 (§13.2) … stand";
BCR-V3-14 amends T28-2 only), and F-PLAN's tier 1 flags "a hard room missing" (base l. 6907). The `'*'` · `for.use`
`stepped_temple` row gives "chapel × 1 (hard; storey top …)" (l. 836), and `top` is "the highest storeyed level" (A5 (b)),
none on a great temple laid with `top` `flat` — the fixture seam S23R2-10 added to T-V3-23 (e) and T-V3-29. That building
fails T28-1 and is flagged at F-PLAN tier 1 on every derivation, although volume 3 reports the drop as "no failure"
(S6, l. 1280).
**Required change (V03).** BCR-V3-14 (heading → "T28-1 and T28-2 …") gains, on the same heading: current "Hard: (T28-1)
each room the programme marks hard is present;" → new "Hard: (T28-1) each room the programme marks hard is present — on a
building with no storeyed wing, each whose storey rule admits one of its basement storeys, the others dropped under
`solidMonument` and listed in the report (volume V03 §3.1 step 2, §3.2 A5 (b)) —;"; §7's sentence (l. 2322) → "The
base's T28-1 – T28-19 (§13.2) — T28-1 and T28-2 as BCR-V3-14 words them — and the plan soft bands (§13.7) stand"; A5 (b)'s
clause adds "(T28-1 as BCR-V3-14 words it; seam S23R3-12)"; T-V3-23 (e)'s flat-topped clause and T-V3-29's fixture add "and
T28-1 holds, the `stepped_temple` row's `chapel` listed under `solidMonument`".

### S23R3-13 — minor — owner BASE-F — item 483 follows S23R3-12

**Claim.** File f item 483 (l. 795): "BCR-V3-14 (V03 §10) — T28-2 with structural faces and concealed suites. *Needed by:*
V03. **STAGED (M6-P, the plan rung).**" After S23R3-12 the request also amends T28-1, and volume 2's T-V2-45 reads the
storey-less plan the amended bars test.
**Required change (BASE-F).** Item 483 → "BCR-V3-14 (V03 §10) — T28-1 on a building with no storeyed wing, and T28-2 with
structural faces, concealed suites and the storey-less plan (seams S23R2-10, S23R3-12). *Needed by:* V02, V03. **STAGED
(M6-P, the plan rung).**"; the reconciliation table gains the row.

### S23R3-14 — minor — owner V02 — a sealed stack may carry a storeyed shrine

**Claim.** Volume 2 lets a sealed stack carry storeyed wings: "**None** (a sealed stack, V2 §4.6): no stair wing and no way
up; a storeyed shrine or tier on it is reached by nothing and volume 3 flags it `W_TIER_UNREACHED`" (V2 §3.15.2, l.
2298); "a storeyed tier or shrine on it is reached by nothing (volume 3's `W_TIER_UNREACHED`)" (V2 §4.6, l. 2715–2717); the
`tiers` op seals a shrine-topped temple ("seal it" `tiers { stairs: 'none' }`, l. 2776). Volume 3 plans such a shrine and
flags it (S6 (e), l. 1270–1271; T-V3-28: "the sealed stack reports `W_TIER_UNREACHED` and nothing else fails"). Yet
BCR-V2-41's New text (l. 4115–4117) reads "a building with no storeyed wing at all (a solid monument, a sealed stack) has no
plan above the ground — no level at or above it and no room there …", and T-V2-45 (l. 3336–3337) now asserts "a sealed
stack's entrance opens nothing and its plan has no level at or above the ground" — false for every sealed stack with a
shrine, the common case of a sealed temple.
**Required change (V02).** BCR-V2-41's clause "a building with no storeyed wing at all (a solid monument, a sealed stack)
has no plan above the ground — … — and its main entrance opens nothing;" → "a building with no storeyed wing at all (a
solid monument, a sealed stack whose every wing is solid) has no plan above the ground — no level at or above it and no
room there; its basement storeys and the heads of its hosted accesses are planned as volume 3 §3.1 states — and its main
entrance opens nothing; a sealed stack (volume 2's stair form `none`) that carries a storeyed tier or shrine keeps that
wing's plan, reached by nothing (volume V03 §3.3 S6 (e), `W_TIER_UNREACHED`), and its main entrance, on tier 0's front
side, opens nothing;" (seam S23R3-14); T-V2-45's clause → "a sealed stack's entrance opens nothing, and its plan has no
level at or above the ground where every wing is solid — a storeyed tier or shrine on it planned and flagged
`W_TIER_UNREACHED` (volume 3's T-V3-28)"; J-V2.83's parenthesis adds "(a sealed stack with a storeyed shrine keeps the
shrine's plan, unreached)".

### S23R3-15 — minor — owner V03 — the storey-less building's wording

**Claim.** (a) BCR-V3-26's closing sentence (l. 2849–2852) still gives BCR-V2-41's exception as "the main entrance at its
stair's foot opening no plan door, the plan rooted at the first landing door, no plan where no wing is storeyed", which
S23R2-10 and S23R2-11 replaced by "no plan above the ground, its basement storeys and heads planned". (b) S6's sentence (l.
1278) lists "a sealed stack" among the buildings "with no storeyed wing at all", beside S6 (e)'s own "the sealed stair
form `none` … lands here by design" (l. 1270–1271), where a storeyed shrine on a sealed stack is planned and flagged.
**Required change (V03).** (a) BCR-V3-26's "no plan where no wing is storeyed" → "no plan above the ground where no wing
is storeyed (its basement storeys and access heads planned, V03 §3.1 step 2)"; (b) S6's "(a solid monument, a sealed stack,
a great temple laid with `top` `flat` …)" → "(a solid monument, a sealed stack whose every wing is solid — one carrying a
storeyed tier or shrine is planned and flagged by (e) — a great temple laid with `top` `flat` …)"; each marked "(seam
S23R3-15)".

### S23R3-16 — minor — owner V03 — `basementDoor`'s signature

**Claim.** 3.7.1 declares `basementDoor(b: Building): { side; at } | null` (l. 1578) and says it reads "the
`RetainingWall`s with volume 1's `stepProfile(wall)` (its BCR-43) and volume 5's `levelledGroundCm(doc, key, p)`
(BCR-V5-30)" (l. 1580–1582). Neither the document's `RetainingWall`s nor the `doc` and `key` that `levelledGroundCm` takes
(`levelledGroundCm(doc, key: PlatKey, p: PointCm): Cm`, V05 BCR-V5-30) are reachable from a `Building`, so the declared pure
function cannot be implemented as typed; its callers — the base's step 3 (BCR-V3-32), volume 1's reserve and digest, T28-3
— would each supply the context their own way.
**Required change (V03).** The declaration → "`declare function basementDoor(doc: Document, key: PlatKey, b: Building):
{ side: number; at: PointCm } | null;` — written `basementDoor(b)` in prose, on the building's own document and arena key
(the key its plot lies on)"; the §1b and Interfaces rows add "on `(doc, key)`" to the inputs; marked "(seam S23R3-16)". No
caller's text changes.

### S23R3-17 — minor — owner V02 — `rebaseStack`'s sampler

**Claim.** V2 §2.6 declares `rebaseStack(b: Building, sampler: TerrainSampler): void` (l. 807). The base's
`TerrainSampler` is "bilinear on the height raster" (base l. 868), the reader S23R2-01 removed from the datum: BCR-V2-32
takes every ground sample by `levelledGroundCm(doc, key, p)` because a levelled plot is never written to the raster
(V2 l. 3939–3944), and `rebaseStack`'s own §1b row says "the ground wings' `levelledGroundCm` samples" (l. 290). A builder
following the declaration passes the raster sampler, and a stacked building on a levelled plot floats above or sinks below
its platform — while volume 3's W2 reads the platform (`levelledGroundCm`), so the exposure gates and `Entrance.storey`
misfire on the same house.
**Required change (V02).** The declaration → "`declare function rebaseStack(b: Building, ground: (p: PointCm) => Cm /*
levelledGroundCm(doc, key, ·) on the building's document and arena key (volume 5's BCR-V5-30; BCR-V2-32, BCR-V2-42),
never the raster's TerrainSampler */): void;`", and step (1) of its comment reads "the ground wings by §2.6's terrain rule
as BCR-V2-32 words it (every sample by `ground`)"; marked "(seam S23R3-17)".

## 9 Continuation summary, decisions, CONFIRMED versus PLAUSIBLE

**By owner.** V03: S23R3-09, S23R3-11, S23R3-12 (major); S23R3-15, S23R3-16 (minor). V01: S23R3-10 (major). V02:
S23R3-14, S23R3-17 (minor). BASE-F: S23R3-13 (minor). **Order for the lanes:** V03's S23R3-09 defines
`stackAccessDoor(b, a)`, which V01's S23R3-10 reads — the two land in the same round, as S23R3-01 and -02 did; V03's
S23R3-12 amends BCR-V3-14 before BASE-F's S23R3-13 relabels item 483; V02's S23R3-14 and V03's S23R3-15 (b) word the
sealed stack alike; S23R3-11, S23R3-16 and S23R3-17 stand alone. Where these land after this continuation, the next round
of this seam re-checks them.

**Decisions (vetoable).**

| id | decision |
|---|---|
| J-S23R3.6 | Chose to **continue under this lane key** for round 2's continuation (S23R2-09 … 15) and a sweep of the repairs since, appending §6 – §9 and keeping §1 – §5 as landed at 06:50, over returning the 06:50 summary under the resume rule alone, because the brief's "previous round" file now holds seven issues no round has re-checked — the precedent of J-S23R2.6 and of seam-surfaces-r2 and seam-content-calibration-r2. |
| J-S23R3.7 | Chose to sweep **by full diff since round 2's continuation inputs** (its snapshots, hashes checked), with every touched mechanism traced into untouched text at both ends and the citation census, over a whole re-read of 1.6 MB, because every earlier text of the seam has been read whole (rounds 0 – 1) or by full diff (rounds 2 – 3 and round 2's continuation), and the trace is where this continuation found what the diffs alone would not show (O2's secondary-entrance list and T28-1, both untouched by any lane since round 0) — J-S23R2.7's method, one link further. |
| J-S23R3.8 | Chose **one pure function, `stackAccessDoor(b, a)`, in `@plat/plots` at M3a** (S23R3-09, -10), over amending volume 1's projection rule to repeat volume 3's wing choice and move, because two texts stating one point diverged twice already (S23R1-19's projection, S23R2-10's move), `basementDoor(b)` set the precedent (J-S23R3.2), and every input is eager; and **door sides of two `moduleCm`** over `door.entranceCm` + 2 · `jambCm`, because the reserve reads the point at M5 and only `moduleCm` of those cells ships before M6-P (file f item 233), so no base-change label moves. |
| J-S23R3.9 | Chose to make the **`external` basement's outside door a root** (S23R3-11), over adding a core bay to walk-out basements, because the base states both halves already — the core stops at the ground storey (step 3, J-A29.25) and the door roots the basement's storeys (step 5, T28-2) — and volume 2's BCR-V2-33 (c) repeats it; only volume 3's O2 list and 3.7.1's sentence disagree. Graded **major**: every walk-out basement would be flagged at F-PLAN tier 1. |
| J-S23R3.10 | Chose to **amend T28-1 through BCR-V3-14** (S23R3-12), over keeping the programme's hard `chapel` off the flat-topped temple's programme in A1 or delivering it into the crypt by tier 5, because the base resolves the programme from the designation, the band and the household count, never the geometry (§2.6's fourth rung; 3.1 step 1), a sanctuary moved into a crypt is not the historical form, and BCR-V3-14 already amends T28-2 for the same building. |
| J-S23R3.11 | Graded **S23R3-10 major**, over minor as its S23R1-19 origin was, following S23R3-02: once S23R3-09 lands, volume 1's own rule is a second mechanism for one point, not a gloss, and T-V1-26 fails where they differ. Graded **S23R3-14 and S23R3-15 minor**, following J-S23R2.11: volume 3's plan follows its condition ("no storeyed wing at all"), which is right; only the example lists and T-V2-45's subject are loose. Graded **S23R3-16 and S23R3-17 minor**: each declaration's comment and §1b row already name the right reader; only the typed parameters are missing or wrong. |

**CONFIRMED versus PLAUSIBLE.** CONFIRMED by reading the live text at the lines cited, with the input hashes unchanged from
start to end (V01 925e51b5…, V02 0c432111…, V03 e83ffac3…, file f b4546425…, `_integrate.md` 965ab696…, base 01fea21f…):
every status of §6; every line of §7.1's five diffs; every claim of S23R3-09 – S23R3-17 at both ends (V03's 3.1, A5 (b),
S6, O2, 3.7.1 – 3.7.2, 3.9, §1b, §7, §8's PE, BCR-V3-14, BCR-V3-26, the `stepped_temple` row, J-V3.117; V02's §2.6 block,
§3.15.2 ST5 – ST7, §4.6's `none` and approach strip, BCR-V2-33 (c), BCR-V2-41, T-V2-45, J-V2.83; V01's V1-3.8.2 step 5,
V1-3.8.3, T-V1-26, J-V1.96; file f items 233, 241, 483, 578; the base's step 3, step 5, T28-1, T28-2, F-PLAN's row,
J-A29.25, `TerrainSampler`, `deriveBase`; V05's BCR-V5-30 signature). CONFIRMED by executed script: the citation census
(0 dangling) and the md5 checks. PLAUSIBLE: that T-V1-26's stack-door clause fails on a built fixture (it needs a
stack-hosted access whose door is moved beyond the `hood` rectangle's half-width, which the geometry allows but no fixture
has been run); that the flat-topped great temple's programme resolves the `stepped_temple` row (A1 rule (1) by its
specialisation, as T-V3-23 (e)'s fixture states); the required texts themselves, until their owners apply them and the
next round re-checks. Nothing was executed beyond `diff`, `grep`, `md5`, `sed` and the census script: this lane writes a
critique.

**Outside this seam.** Volume 1's cross-volume note (31) — `way.surface` and `squares.quota` without volume 11 registry rows,
and file f item 301's M5 label against volume 1's M2b landing — is the content-calibration and settlements seams'.
Volume 3's hand-off to volume 11 (registry row 38's readers and S11) is the content-calibration seam's. Volume 5's
BCR-V5-30 reader list and its `basementDoor(b)` and W2 readers are the layers seam's to confirm.
