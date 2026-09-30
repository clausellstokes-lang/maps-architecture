# Seam check, round 1 — stage 2 · stage 3 · the plan rung (V01 neighbourhoods · V02 buildings · V03 interiors)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-stage2-3-r1; covered by the whole-design retrovalidation (J84).

Lane `volumes/seam-stage2-3-r1`, 2026-09-29. Reconciliation round 1 of this seam. Output: this file only — no volume, no
amendment file and no base text is edited by this lane. Every finding names **one** owning volume (or BASE-F, an item of
`docs/AMENDMENTS-2026-09-28f.md` that must change) and the exact change it needs; where two volumes must each edit, this
round writes two issues (J-S23R1.1).

PROGRESS
- §1 Method, inputs, hashes: done (continuation's inputs added, §1.1)
- §2 Re-check of round 0's issues (S23-01 … S23-40): done
- §3 Fresh sweep — V02, V03, file f and `_integrate.md` read whole: done; V01 read whole: done (continuation, 2026-09-29
  ~09:00–09:15, on the live text, §3.6)
- §4 Issue register (round 1: S23R1-01 …): done — S23R1-01 … 14 at the checkpoint, S23R1-15 … 24 by the continuation
- §5 Decisions, CONFIRMED versus PLAUSIBLE, outside the seam: done (extended by the continuation)

**Outcome of the continuation (CONTINUE RULE, 2026-09-29 ~09:00–09:15).** This lane checkpointed at 04:25 with V01's
whole read open. Since then rounds 2 and 3 landed (round 2 re-checked S23R1-01 … 14: **all 14 fixed**, so they are
history here) and round 4 started without landing. No round read V01 whole: round 2 read its seam sections whole and
searched the rest by term, round 3 read its diff. The continuation read **V01 whole on the live text** (87f01bb5…, 3 912
lines) and checked every V02 and V03 fact it names against the live V02 (8c08b116…), V03 (842bbbc7…), file f (1d04dca0…)
and the base. It found **two seam mechanisms no round had traced to their milestone**: (1) the **entrance reserve** V01
builds at M5 (W6) reads volume 2's `PorchKindRow`s, which `composition.json` ships only at M6a, and the close-up's cache
digest omits them, so an edit of the porch rows serves a stale chunk; (2) the **footprint court** — V02's `massOval`
arena (and the base's court-institution construction) lays a holed footprint from M3a, and V01's hood pins at M5 exclude
its floor by its `court` typing, but that typing is BCR-V2-24's sentence, which file f item 303 builds at M6. The rest is
wiring and wording: V01's reserve omits two outside doors (`service` entrances; volume 3's stack-access door), a T-V1-26
clause contradicts the reserve it tests, `stepProfile` and the stack fields do not list their readers across the seam,
file f's *Needed by* cells omit V01 on eight items, §0 promises crypts "no door on the street" while volume 3 enters a
solid temple's crypt by its tomb door, and V03 lists V01's no-place rule as a reader of `Basement.crypt` it never reads.
Continuation register: **10 issues — 0 blockers, 3 majors, 7 minors** (V01 1/4, V02 2/1, V03 0/1, BASE-F 0/1),
S23R1-15 … 24, carried to the live round `volumes/seam-stage2-3-r4` by a `lane-events.log` NOTE (this lane edits no
volume). Round 1 whole: **24 issues — 0 blockers, 10 majors, 14 minors.**

**Outcome so far (checkpoint, 04:25; history).** Of round 0's 40 issues, **36 are fixed** and **4 are not fully fixed** (S23-07,
S23-18, S23-30, S23-31): in each the owning volume did its part, but the sentence the required change assigned to a
*second* volume ("V01 and V03 cite", "V03 cites", "V01 one sentence") reached no lane, because the workflow routes an issue
to its first-named owner only — so V03 still restates the façade-bay law, seeds the crypt without `cryptSeedWings`, draws
exterior flights at its own `goingCm`, and V01 still hatches flights at an undefined "world tread depth" and lacks the
district-band building-click sentence. The fresh sweep of V02, V03, file f and `_integrate.md` found **two repairs made
elsewhere that broke this seam**: the settlements seam's `v.` village namespace (SS-01; V07 J-V7.95, V11 §2.9) left V02's
`composition.classFamily` and V03's village programme rows keyed by ids no class carries, and V02's own round-1
extension of BCR-V2-28 put the half cellar's raise at §2.6's basement gate while file f item 226 still labels the whole
request "built at M6-U". Register so far: **14 issues — 0 blockers, 7 majors, 7 minors** (V01 0/1/1, V02 0/1/4, V03
0/4/1, BASE-F 0/1/1). V01 has been checked at every place a round-0 issue or its half named it; its whole-read sweep is
the continuation's.

## 1 Method, inputs and hashes

**Inputs as read** (md5 at this lane's start, 04:14; unchanged at checkpoint): `docs/volumes/V01-neighbourhoods.md`
8b8a40eb… (3 571 lines, as reconcile-V01-r1 and reconcile-BASE-F-r1 left it), `docs/volumes/V02-buildings.md` c459dd4d…
(4 184 lines, reconcile-V02-r1), `docs/volumes/V03-interiors.md` a7b65077… (2 953 lines, reconcile-V03-r1),
`docs/AMENDMENTS-2026-09-28f.md` 40e2f8d6… (1 076 lines, reconcile-BASE-F-r1), `docs/volumes/_integrate.md` 1487de32…
(365 lines), `docs/ARCHITECTURE.md` 01fea21f… (unchanged since round 0). Round 0: `docs/volumes/critique/seam-stage2-3-r0.md`
(752 lines, read whole).

**Read whole in this lane:** round 0's register, `_integrate.md`, file f, V03, V02. **V01:** every passage a round-0 issue
or one of its halves names (V1-3.7.1, V1-3.8.1, V1-3.8.2 steps 1 and 5, V1-3.8.8, V1-3.8.9, V1-5.1.1 – V1-5.1.3, §1.2's V02
and V03 rows, §1b's hatch row, §5.3's GeoJSON cell, V1-7's NG sentence, BCR-19, BCR-36, the reconciliation note); its
whole-read sweep is planned (CHECKPOINT at about 300k tokens, the owner's standard).

**How each check was made.** (1) Round 0's 40 issues were re-checked against the text at the lines their required
changes name, and against the pre-reconcile backups (the session scratchpad's `rcV1/`, `rcV2/`, `rcV3/` and
`f-before-rf1.md`, whose md5 equal round 0's input hashes 9723667f…, ba65e82f…, ab275ff1…, 7e76cc92…) by `diff`, so every
changed passage was located. (2) Every half of a required change that named a second volume was searched in that volume.
(3) Every rename a round-1 lane made on a neighbouring seam that this seam's records carry (the `v.` village keys, the
raised way's derived `source`, `bend.deck.basement`, `cryptSeedWings`, `stairTreads`, `facadeBays(wing, side)`) was
grepped in all three volumes. (4) The records, ids, rungs and build-plan labels of §2–§6 of round 0 were re-walked on the
new text. Working notes: this session's `scratchpad/volumes/seam23r1/notes.md`; diffs `d1.txt`, `d2.txt`, `d3.txt`,
`df.txt`, `di.txt` there.

### 1.1 The continuation's inputs and method (2026-09-29 ~09:00–09:15)

**Inputs, the live text** (md5 at the continuation's start): `docs/volumes/V01-neighbourhoods.md` 87f01bb5… (3 912 lines,
after reconcile-V01-r4), `docs/volumes/V02-buildings.md` 8c08b116… (4 607, after reconcile-V02-r1's 08:44 continuation),
`docs/volumes/V03-interiors.md` 842bbbc7… (3 242), `docs/volumes/_integrate.md` 965ab696… (468),
`docs/AMENDMENTS-2026-09-28f.md` 1d04dca0… (1 377), `docs/ARCHITECTURE.md` 01fea21f… (unchanged). Rounds 2 and 3
(`seam-stage2-3-r2.md`, `-r3.md`) read for their methods, registers and sweeps, so nothing they raised is raised again;
round 4 (`-r4.md`) is a skeleton with no register.

**Read whole:** V01, every line, §0 to the last integration note — the sections no round had read whole (V1-3.5, V1-3.6,
V1-3.10 – V1-3.16, §9 – §13 and the notes) and, on the live text, the seam sections rounds 2 and 3 had read. **Read in
place for every fact V01 names across the seam:** V02 §1b's rows for `BaseWing.key`, `on`, `solid`, `composition.json`,
`ovalCourt`, `stairTreads`, `roofscape`; V2 §2.3's `PorchKindRow`, §3.7's porch and secondary porch, §3.10's porch
table, §3.5's `ovalCourt` branch, §3.15.3's shadows, §3.16, §3.17, §5.3's hatch bullet, §5.6, §8.1 – §8.5, X14, X24,
X28, BCR-V2-24; V03 3.6 O1, 3.7.1's `basementDoor(b)`, 3.7.2, 3.7.6's crypt entry, 3.9's failure rows, §1b's
`basementDoor` and `Basement.crypt` rows, J-V3.45, J-V3.73, J-V3.114 – 116, BCR-V3-27, §8's PE row; file f items 216,
227, 229, 241, 242, 303, 305, 371, 406, 419, 567, 578 and the header's milestone ids; the base's `Entrance` and
`YardPart` interfaces. **Method:** each V01 statement about a volume-2 or volume-3 record, function, table, test or
milestone was checked at its target for (a) existence and meaning, (b) the milestone at which the target is built against
the V01 milestone that reads it, (c) the producer's wiring row naming V01 as a consumer, and (d) V01's cache digest or
lifecycle row holding every input its derived content reads. Working notes: this session's
`scratchpad/volumes/seam23r1c/notes.md`.

## 2 Re-check of round 0's issues

| id | r0 sev. | owner | status | evidence (file, line) |
|---|---|---|---|---|
| S23-01 | blocker | V02 | **fixed** | V02 §3.17 (b) l. 2353–2360 (every building meeting piers or strip takes the fates, V1-3.17.4's add path); `raised.clearCm` withdrawn (§1b l. 265, constants l. 1884, X23, §12); J-V2.89; T-V2-53 (d) |
| S23-02 | major | V01 | **fixed** | V01 V1-5.1.1 district cell l. 2381; V1-5.1.2 per-facet hatch l. 2398–2410; V1-7 l. 2700–2702; V02 §5.3 l. 2767–2771, X14 |
| S23-03 | minor | V02 | **fixed** | BCR-V2-15's round-1 extension l. 3577; file f item 406's note (after 405) |
| S23-04 | major | V01 | **fixed** | V01 §5.3 GeoJSON cell l. 2595 (file f item 447 cited); `declared` wording |
| S23-05 | major | V01 | **fixed** | V01 V1-3.8.8 l. 1643–1650; pins clear drawn symbols only (V1-3.8.2 step 5 l. 1566); J-V1.74 |
| S23-06 | major | V02 | **fixed** | BCR-V2-13's round-1 extension l. 3554 (per-rung `inputs`, `stale`, §4.1); J-V2.52 amended |
| S23-07 | major | V02 | **not fully fixed** | V02's half fixed (`stairTreads`, V2 §2.6 l. 780–787; §5.6 l. 2808; `treadM` withdrawn); **V03 5.1 l. 2002 still draws exterior flights "treads at `goingCm`"; V01 V1-5.1.2 l. 2427–2429 still "at the stair's world tread depth"** → S23R1-03, S23R1-04 |
| S23-08 | major | V02 | **fixed** | V02 §5.5 SVG row l. 2792; BCR-V2-21's extension l. 3640 |
| S23-09 | major | V02 | **fixed** | V02 §2.1 l. 468–469; BCR-V2-27's extension l. 3700 |
| S23-10 | major | V02 | **fixed** (a consequence in file f: S23R1-05) | BCR-V2-28's extension l. 3718–3720; V2 §3.14.5 (a), (d); T-V2-52; J-V2.91 |
| S23-11 | minor | V03 | **fixed** (wording: S23R1-09) | V03 3.3 l. 1107–1111; T-V3-30 |
| S23-12 | major | V03 | **fixed** | V03 3.4a l. 1227–1233; J-V3.101; T-V3-30's edited-roof clause |
| S23-13 | major | V03 | **fixed** | V03 §2.2 l. 467–468; J-V3.102; T-V3-25 |
| S23-14 | major | V03 | **fixed** | V03 §2.2 l. 453–459; 3.11 l. 1709–1710; J-V3.103 |
| S23-15 | major | V03 | **fixed** | V03 §2.5 l. 873; BCR-V3-13 l. 2522–2527; T-V3-13 |
| S23-16 | major | V03 | **fixed** | V03 A2 (4) l. 969–976; manor row l. 671; J-V3.104; T-V3-25 |
| S23-17 | major | V03 + BASE-F | **fixed** (a divergence: S23R1-14) | file f item 305; V03 §4.2 l. 1849–1855; T-V3-11 (iii), T-V3-31; IN-V03-1/2; V02 §1b l. 254 registers `bend.deck.basement` |
| S23-18 | major | V03 | **not fully fixed** | V03 §4.5 l. 1919–1927 and V02 §3.11 l. 1901–1904 fixed; **V01 V1-3.8.1 (l. 1525–1530) lacks the sentence routing a building click at the city and district bands** → S23R1-08 |
| S23-19 | major | V03 + BASE-F | **fixed** (wording: S23R1-09) | file f items 567, 568, 474 and 524 notes; V03 §8 l. 2260–2267, BCR-V3-30; V02 §8.3 l. 3299; V01 BCR-19 (d) |
| S23-20 | major | BASE-F | **fixed** (item 226's split: S23R1-05) | file f items 226, 234, 238, 436; V03 P2 l. 2228; V02 §8.1 l. 3272, R8 l. 3318 |
| S23-21 | minor | BASE-F | **fixed** | file f items 351, 352, 374 notes |
| S23-22 | minor | V01 | **fixed** | V01 V1-3.7.1 l. 1463; BCR-36 l. 3249 |
| S23-23 | major | V01 | **fixed** | V01 V1-3.8.2 step 5 l. 1566, 1572; §1b l. 331; J-V1.75 |
| S23-24 | minor | V01 | **fixed** | V01 V1-3.7.1 l. 1447; V1-3.8.2 step 1 l. 1541 |
| S23-25 | minor | V01 | **fixed** | V01 §1.2 (no `lowerRoof` read left); V1-5.1.3 l. 2519 (ties by wing key) |
| S23-26 | minor | V03 | **fixed** | V03 §4.2 l. 1813–1821; J-V3.105; T-V3-11 (iv) |
| S23-27 | minor | V03 | **fixed** | V03 A2 (11) l. 997–1008; V02 F-COMPOSE (3) l. 1970; J-V3.106 |
| S23-28 | minor | V02 | **fixed** | V02 §0 l. 91–93 |
| S23-29 | minor | V01 | **fixed** | V01 V1-3.8.1 l. 1527–1530; V02 §3.11 l. 1894–1895; J-V1.83 |
| S23-30 | minor | V02 | **not fully fixed** | V02's half fixed (`facadeBays(w, side, bayM)` on every side, V2 §2.4 l. 604, §3.7 l. 1315–1334; J-V2.93); **V03 W2 l. 1423–1426 still restates its own law for non-eave sides, calls `facadeBays(wing, eave)`, and V02 §3.7 l. 1332 quotes a W2 sentence that does not exist** → S23R1-02 (now major) |
| S23-31 | major | V02 | **not fully fixed** | V02's half fixed (`cryptSeedWings`, V2 §2.4 l. 606, §3.14.5 (c) l. 2024–2032; J-V2.92); **V03 3.7.4 step 1 l. 1539–1542 still seeds "under volume 2's east-range seed wings where a composition's massing names them; else the template part `chancel` …", and BCR-V3-20 cites no seed function** → S23R1-01 |
| S23-32 | minor | V02 | **fixed** | V02 §5.5 GeoJSON cell l. 2795 |
| S23-33 | minor | V02 | **fixed** | V02 §2.1 l. 447–453; §2.5 l. 622; §1b l. 283 |
| S23-34 | major | V03 | **fixed** | V03 3.1 l. 915–917; §4.5 l. 1919–1924, 1952–1953; §4.6 l. 1958–1960; §1b l. 303–304 |
| S23-35 | minor | V02 | **fixed** | V02 §8.1 l. 3272–3276; J-V2.32 amended |
| S23-36 | minor | V03 | **fixed** (package home: S23R1-12) | V03 W2 l. 1432–1434; P1 l. 2227; §11 Q1; V02 §8.1, M6b row |
| S23-37 | minor | V03 | **fixed** | BCR-V3-31 l. 2702–2712; file f item 505 |
| S23-38 | major | V02 | **fixed** | V02 §3.8 l. 1421–1427 (`hallUnclamped`); T-V2-35 l. 3043–3048; M6b's exit; J-V2.95 |
| S23-39 | minor | V03 | **fixed** (wording: S23R1-09) | BCR-V3-15 l. 2545–2549, BCR-V3-19 l. 2580–2584, BCR-V3-28 l. 2673–2681; file f items 235, 237, 263 |
| S23-40 | minor | V02 | **fixed** | V02 §4.2 steps 2–3 l. 2442–2452; §4.3 l. 2468–2470; IN-V02-2 (c) |

**Totals.** 36 fixed; 4 not fully fixed (S23-07, S23-18, S23-30, S23-31), each re-registered below against the one volume
that must still act. **The pattern is procedural:** every one of the four is a second-volume half ("V01 and V03 cite", "V03
cites", "V01 one sentence") written inside a required change whose owner cell named only the first volume; V02's own
round-1 note (V02 §13 l. 4056–4061, its X30–X31) lists exactly these halves for V01 and V03, and those lanes had landed
before V02's note was written (V03 03:35, V01 03:43, V02 03:44).

## 3 Fresh sweep

### 3.1 The record chain — block → plot → building → wing → storey → room

Round 0's table (its §2) holds on the new text except where noted: the under-deck strip now matches (S23-01); a half
cellar's floor is one datum in V02, V03 and the base request (S23-10, S23-11), but its milestone label in file f is wrong
(S23R1-05); the crypt's seed has one function in V02 that V03 does not call (S23R1-01); `StairCore.tower`, core and chimney
ids and plan room ids are keyed (S23-09, -13, -14); `partName` has its lifecycle row in V03 §2.5 and its writers in V02
§2.1 (S23-15, -33). **New break:** a village building's class id. V07 §2.4 and V11 §2.9 now key every village class
`v.<id>` (the settlements seam's SS-01; J-V7.95), a `v.` key and the town key of the same word being two classes; V07 keeps
V02's `composition.classFamily` as "the one source of the village classes' composition keys" (V07 l. 245–247; J-V7.82).
V02 §3.10.5's table and §3.10.3's `longhouse` override, and V03 2.4's village programme rows and A2 (4)'s dwelling list,
still name the unprefixed ids — so neither lookup finds a village class (S23R1-06, S23R1-07).

### 3.2 The elaboration ladder

The gestures now agree in V02 §3.11 and V03 §4.5 (a building click from the neighbourhood band down derives `wings`,
`rooms`, `plan`; at the city and district bands it is the district's click; a double-click reaches the plan at any band);
V01 V1-3.8.1 does not carry the pointer (S23R1-08). The per-rung staleness is in BCR-V2-13 and V03's three requests are
scoped to the `plan` rung's list (S23-06, S23-39). The outline close-up raises `wings` in V01 and V02 (S23-29).

### 3.3 Classes, rows, terms, ids, units

**Units.** One stair flight still has three tread readings on the map, the plan and the `hatched` drawing (S23R1-03,
S23R1-04). **Terms.** V02 §3.15.3 still points a solid stack's basement door at "the walk-out rule" where V03 names it the
tomb door (S23R1-10). **Façade bays.** V02 now defines the bays of every side (towers round their free perimeter); V03's
restatement for non-eave sides is a second, different law (S23R1-02).

### 3.4 Wiring across the seam

| piece | produced by | consumed by | status |
|---|---|---|---|
| `cryptSeedWings(b)` | V02 §3.14.5 (c) | §2.6's basement function through BCR-V3-20; V03 3.7.4 step 1 (claimed by V02 §1b l. 281) | **not consumed** by V03 or BCR-V3-20 (S23R1-01) |
| `stairTreads(w)` | V02 §2.6 | V02's map, exports and per-wing constructions; V01 V1-5.1.2 and V03 5.1 (claimed by V02 §1b l. 280) | **not consumed** by V01 or V03 (S23R1-03, -04) |
| `facadeBays(w, side, bayM)` on every side | V02 §3.7 | V03 W2 (claimed by V02 §3.7 l. 1332), §8.4's lit windows | V03 reads it on eaves only (S23R1-02) |
| `composition.classFamily` for village classes | V02 §3.10.5 | V02's resolution chain step 3; V07 (J-V7.82) | keyed by ids no class carries (S23R1-06) |
| V03's village programme rows | V03 2.4 | A1 for `v.` classes | keyed by ids no class carries (S23R1-07) |
| the half cellar's raise | BCR-V2-28 (a)–(b) | `deriveBase`, `rebaseStack`, V03 3.3, V02's dig floor | the base milestone that builds it mislabelled in file f (S23R1-05) |
| `bend.deck.basement` | V03 §4.2 (three rungs) | file f item 305 / BCR-V2-34 (two rungs), V09, V10 | the base text stops a rung short (S23R1-14) |
| `facadeBays`' package | BCR-V2-18 (`@plat/buildings`) | V2 §8.1 and V03 W2/P1 under Q1 (`@plat/plots`) | two homes (S23R1-12) |

Every other piece of round 0's §5 table is now wired (the `rooms` rung before the plan, the hall clamp's fallback, the
per-rung staleness, the omitted gate hall, `partName`, the porch reserve, the GeoJSON names, the SVG grouping).

### 3.5 File f and `_integrate.md`

File f's round-1 items read cleanly on this seam but for item 226 (S23R1-05) and item 305's missing rung (S23R1-14).
`_integrate.md` J-VI.5 (l. 147) and H3 (l. 177) still tell V06 to displace only buildings "taller than its underside less
`raised.clearCm`" — the exception S23-01 withdrew (S23R1-13; V02 §13 l. 4056–4058 flags it).

### 3.6 V01 — the whole-read sweep (continuation, on the live text)

Read whole, on V01 87f01bb5… (§1.1). **What holds.** The blocks V01 types (S9b's `ordinary`, `manor`, `square`, `green`,
`yard`) reach V02 only through the base's S10 (7) join and S10b's compound draw, which V02's resolution chain reads by
class and plot (V2 §3.5's JOIN by S10 (7)); no V02 or V03 rule reads `Block.content`, and none needs to. The manor block's
one household with its members meets V03's A2 (4) one-household form. The building click by band, the outline close-up's
`wings` raise, the stair treads by `stairTreads`, the per-facet hatch under `roofscape` with the NG sheet's M6a / M6b
sentence (V02 X14), the stack order by `BaseWing.on` with ties by wing key (keys from M1, file f item 216), the tier
shadows (V01's envelope-plus-clipped-tiers drawing gives the same shadow set as V02 §3.15.3's per-tier casters), the deck
plots' owner and their buildings (V2 §3.16), the raised way's add path and the epoch's clearing (V2 §3.17 (b)), the
aqueduct terminal's `conduit_house`, the catacomb stair in a cemetery chapel (V03 3.7.2 (6), 2.4's `cemetery` row,
J-V3.73), the access heads' state forms (V03 3.7.2 (7)) and the island bridge built before S10 (S23R3-04, fixed) all
agree across the seam. The entrance reserve's second rectangle stands at `basementDoor(b)`, which V03 builds at M3a in
`@plat/plots` and whose wiring rows name V01's reserve (V03 §1b; file f item 578) — S23R3-02's fix holds.

**What breaks** (each registered in §4):

1. **The reserve's porch rows exist only from M6a.** V1-3.8.2 step 5 sizes every rectangle from volume 2's
   `PorchKindRow`s (`widthM[1]`, `depthM[1]`, `outside`), and W6 builds the reserve at M5. V02 ships `composition.json`
   at M3a-V2 with "the `tiers` cells, the four stepped rows, the `@deck` rows and the constants they read (the rest at
   M6a)" (V2 §8.5) — the porch rows are in "the rest". V1-3.8.3's inputs digest names `Entrance`, `Basement.access` and
   `basementDoor(b)` but not the porch rows, so an `editTable` on them leaves a stale chunk that the cache serves, and V02's
   §1b row for `composition.json` does not name the reserve as a reader (S23R1-15, S23R1-16).
2. **The footprint court is typed at M6, read from M3a.** V02's `massOval` lays the second fixture's arena from M3a (and
   falls to the base's court-institution construction there), "the hole inside `P2` … typed `court` like any hole
   (BCR-V2-24)" (V2 §3.5); file f item 303 labels BCR-V2-24 **STAGED (M6, stage 3)**. V01's `plotYard` sites exclude the
   arena floor through that typing (V1-3.8.2 step 1), bar it at M5 (T-V1-26) and re-run the fixture at M5 (T-V1-54)
   (S23R1-17, S23R1-18).
3. **Two outside doors without a reserve.** The base's `Entrance.role` has a fifth value, `service` (a concealed use's door
   among them), which the reserve's list (main, side, rear, yard) omits; and volume 3 opens the head of an access hosted by
   a building with neither a basement nor `ground(b)` as an **outside door** in the nearest ground-standing face (V03
   3.7.2 (1), `W_STACK_ACCESS`) (S23R1-19).
4. **A bar that contradicts the rule it tests.** T-V1-26's "0 reserves at the main side of a walk-out building whose
   `basementDoor(b)` lies on another side" fails every such building, whose main entrance keeps its own rectangle (S23R1-20).
5. **Readers not listed across the seam.** V01's `stepProfile` is read by volume 3's walk-out at a wall (BCR-V3-27 (a), S11)
   and `basementDoor(b)`'s rule 1, neither in V01's §1b row or BCR-43 (S23R1-21); V02's §1b rows for `BaseWing.key`,
   `on`, `solid` and `ovalCourt` omit V01's stack order and hood-pin exclusion (S23R1-23); file f's *Needed by* omits V01
   on the eight base items V01 reads (S23R1-18); V03 lists "volume 1's no-place rule" as a reader of `Basement.crypt`,
   which that rule never reads (S23R1-24).
6. **Plain words against the mechanism.** §0 says churches' crypts "get no door on the street"; V03 3.7.6 enters the crypt
   of a temple built solid in tiers by the outside door at `basementDoor(b)` (S23R1-22).

## 4 Issue register (round 1)

Counts: **24 issues — 0 blockers, 10 majors, 14 minors.** At the checkpoint, S23R1-01 … 14 (7 majors, 7 minors: V01
1 / 1, V02 1 / 4, V03 4 / 1, BASE-F 1 / 1) — **all 14 re-checked FIXED by round 2** (`seam-stage2-3-r2.md` §2), so history.
The continuation's V01 whole read, S23R1-15 … 24 (3 majors, 7 minors: V01 1 / 4, V02 2 / 1, V03 0 / 1, BASE-F 0 / 1) —
open, carried to the live round `volumes/seam-stage2-3-r4` (§5).

| id | sev. | owner | kind | the claim in one line |
|---|---|---|---|---|
| S23R1-01 | major | V03 | unwired (S23-31 residual) | V03 seeds the crypt by its own order and never calls V02's `cryptSeedWings` |
| S23R1-02 | major | V03 | two laws for one thing (S23-30 residual) | V03 W2 restates a different façade-bay law for every non-eave side |
| S23R1-03 | major | V03 | three laws for one thing (S23-07 residual) | the plan draws exterior flights' treads at its own `goingCm` |
| S23R1-04 | major | V01 | undefined unit (S23-07 residual) | the `hatched` stair flight is hatched at an undefined "world tread depth" |
| S23R1-05 | major | BASE-F | milestone label (S23-10 consequence) | item 226 labels BCR-V2-28's half-cellar raise "built at M6-U" though the request makes it BASE with the basement gate |
| S23R1-06 | major | V02 | unwired id (SS-01 consequence) | `composition.classFamily` and the `longhouse` override keyed by pre-`v.` village ids |
| S23R1-07 | major | V03 | unwired id (SS-01 consequence) | V03's village programme rows and A2 (4)'s list keyed by pre-`v.` village ids |
| S23R1-08 | minor | V01 | gesture pointer (S23-18 residual) | V1-3.8.1 does not say a building click at the city and district bands is the district click |
| S23R1-09 | minor | V03 | citation (single source) | V03 cites round 0's critique as the source of three rules and file f items 474/524 for §16's total |
| S23R1-10 | minor | V02 | term (V03 3.7.1) | V2 §3.15.3 names the solid stack's basement door "the walk-out rule" |
| S23R1-11 | minor | V02 | stale sentence | BCR-V2-28's lead says the crypt's seed without stage 3 is BCR-V3-20's chancel rule |
| S23R1-12 | minor | V02 | package home | `facadeBays` lives in `@plat/buildings` by BCR-V2-18 and in `@plat/plots` under V03's Q1 order |
| S23R1-13 | minor | V02 | stale decision text | `_integrate.md` J-VI.5 and H3 keep the withdrawn `raised.clearCm` exception |
| S23R1-14 | minor | BASE-F | divergence (V03 §4.2) | item 305's `bend.deck.basement` has two rungs where V03 has three |
| S23R1-15 | major | V01 | unwired input / milestone | the entrance reserve reads volume 2's porch rows at M5, which exist from M6a, and its cache digest omits them |
| S23R1-16 | major | V02 | producer after its reader | `PorchKindRow` ships at M6a though volume 1's reserve reads it at M5; §1b names no such reader |
| S23R1-17 | major | V02 | producer after its reader | BCR-V2-24's hole typing (the arena floor a `court`) is built at M6 though `massOval` lays the arena at M3a |
| S23R1-18 | minor | BASE-F | milestone label / *Needed by* | item 303's label follows S23R1-17; eight items V01 reads omit V01 from *Needed by* |
| S23R1-19 | minor | V01 | incomplete rule | the reserve omits `service` entrances and volume 3's outside door of a stack-hosted access |
| S23R1-20 | minor | V01 | bar contradicts rule | T-V1-26's "0 reserves at the main side" of a walk-out building fails every such building |
| S23R1-21 | minor | V01 | reader not listed | `stepProfile`'s readers omit volume 3's walk-out at a wall and `basementDoor(b)` |
| S23R1-22 | minor | V01 | plain words vs mechanism | §0: crypts "get no door on the street"; volume 3 enters a solid temple's crypt by its tomb door |
| S23R1-23 | minor | V02 | readers not listed | §1b's `BaseWing.key`, `on`, `solid` and `ovalCourt` rows omit volume 1's readers |
| S23R1-24 | minor | V03 | phantom reader | "volume 1's no-place rule" listed as a reader of `Basement.crypt`, which that rule never reads |

### S23R1-01 — major — owner V03 — the crypt's seed does not call `cryptSeedWings`

**Claim.** V02 now states the seed once as `cryptSeedWings(b)` (V2 §2.4 l. 606; §3.14.5 (c) l. 2024–2032; J-V2.92): the
template parts `chancel`, else `apse`, else `crossing`; else a stepped building's tier 0; else the east-most storeyed ground
range of role `main`, `range` or `cross` (ties by lowest key); else empty — "called by §2.6's basement function (BCR-V3-20's
crypt ring …) and read by volume 3's crypt placement (V03 3.7.4 step 1)". V03 3.7.4 step 1 (l. 1539–1542) still reads
"under volume 2's east-range seed wings where a composition's massing names them (V2 §3.14.5 (c)); else under the template
part `chancel`, else `apse`, else `crossing` (BCR-V3-13); else the third of the region farthest from the main entrance" —
no field names such wings, so V03's rule falls to the far third for every stepped temple and ranged church where V02 seeds
tier 0 or the east range, and the order of the two branches is reversed. BCR-V3-20's *Basements* text ("its ring seeded,
grown … and ranked … as volume V03 §3.7.4 states", l. 2597–2600) is the base's basement function and cites no seed
function; V03 §1 l. 216–218, §1b l. 264 and §2.5 l. 881 name "volume 2's seed wings" / "east-range wings". A builder of
§2.6's basement function reading the base and V03 never calls the function V02 exports for it.
**Required change (V03).** 3.7.4 step 1 → "**Seed.** The part of the basement's region (`Basement.ring`; for a crypt-only
basement, the ring the basement would take, §2.6's inset of the ground wings, BCR-V2-33) under the wings
`cryptSeedWings(b)` returns (volume 2 §3.14.5 (c), exported by `@plat/plots`: the template parts `chancel`, else `apse`, else
`crossing`; else a stack's tier 0; else the east-most storeyed ground range); where it returns none, the third of the region
farthest from the main entrance along the footprint's OBB long axis." BCR-V3-20's *Basements* text, after "never` none —",
reads "its ring seeded under volume 2's `cryptSeedWings(b)` (else the far third), grown to volume 11's `cryptM2` and ranked
…". §1 l. 217 "the crypt seed wings and the wet-ground lift (volume 2)" → "`cryptSeedWings` and the wet-ground lift (volume
2)"; §1b l. 264's producer cell "volume 2's seed wings and lift" → "volume 2's `cryptSeedWings` and lift"; §2.5 l. 881's
create cell "the seed (volume 2's east-range wings, else the template part, else the far third)" → "the seed (volume 2's
`cryptSeedWings`, else the far third)". T-V3-23 gains "(i) the crypt's step-1 region lies under `cryptSeedWings(b)`'s wings
wherever it returns any" (V02's T-V2-53 (b) tests the function itself).

### S23R1-02 — major — owner V03 — W2's own façade-bay law on non-eave sides

**Claim.** V02 §3.7 (l. 1315–1334; J-V2.93) defines `facadeBays(w, side, bayM)` on **every** ring side: an eave side with
its valley term; any other side of a `rect` or `quad` wing less `endMarginM` at each end and less the projection of every
tower ring, block and other wing meeting it (each widened 0.6 m), with no bay where the run is not positive; a `polygon`
wing's bays laid round its **free perimeter** and returned per side. It states the reader: "volume 3's W2: 'on every side,
volume 2's `facadeBays(wing, side)`'" (l. 1332). V03 W2 (l. 1423–1426) still reads "On every eave side, volume 2's
`facadeBays(wing, eave)` (V2 §3.7); on every other side (a gable, a tower's side, a polygon wing's side) the same law — the
usable run is the side's length less volume 2's `endMarginM` at each end, cut into `nb = max(1, ⌊run ÷ bayM⌋)` equal bays" —
no deduction for a meeting wing or tower, a bay on every tower facet, one bay forced on a run that is not positive. The
plan's windows and §8.4's lit windows (V02's, on every side) then fall on different bays on every gable that meets a wing
and on every tower. §1b l. 295 ("and its law on the other sides") and T-V3-5 l. 2169 ("of volume 2's function (eave sides)
or of the same law (other sides)") carry the same restatement.
**Required change (V03).** W2's first sentence → "**W2 Bays** (V3C-03, V3C-46; J-V3.13, J-V3.41). On every side of every
wing, volume 2's `facadeBays(wing, side, bayM)` (V2 §3.7: an eave side with its valley term, any other side of a `rect` or
`quad` wing without it, a `polygon` wing's bays round its free perimeter) — so the plan's windows, the dormers and §8.4's lit
windows share one rhythm; a side with no bay takes no window." The rest of W2 unchanged. §1b l. 295's feeder cell →
"volume 2's `facadeBays` on every side, the room's `exterior`"; T-V3-5 → "every window centre lies on a façade bay of
volume 2's `facadeBays` for its side within `endClearCm`"; J-V3.41 → "volume 2's façade bays on every side (its function)".

### S23R1-03 — major — owner V03 — exterior flights drawn at the plan's own going

**Claim.** V02 made one tread law for a stair wing, `stairTreads(w)` — `n = ⌈rise ÷ riserMaxCm⌉` risers, `goingCm =
⌊run ÷ n⌋` (V2 §2.6 l. 780–787; J-V2.90) — "read by … volume 3's exterior flights (V03 5.1; its own `goingCm` stays for
interior stairs)". V03 5.1 (l. 2002) still draws "the exterior flights of `stairChain` … treads at `goingCm`" — the plan
table's 23 cm — and 5.3's JSON "the exterior flights of `stairChain` per storey of their head (tread lines as cm
polylines)" and glTF "stairs and flights as stepped prisms" name no law. At V02's grades the map and the plan still show
different tread counts for one flight.
**Required change (V03).** 5.1, "**the exterior flights** of `stairChain` whose head lands on the storey (V3C-66 (4)) —
treads at `goingCm` and an arrow up" → "… — treads by volume 2's `stairTreads(w)` (its `n − 1` lines at its `goingCm`; V2
§2.6) and an arrow up"; 5.3's JSON clause → "the exterior flights of `stairChain` per storey of their head (tread lines as
cm polylines, by `stairTreads`)"; glTF "stairs and flights as stepped prisms" → "interior stairs as stepped prisms at the
plan's `goingCm`, exterior flights as volume 2 exports them (V2 §5.6, by `stairTreads`)". 5.1's interior-stair sentence
(l. 2008, treads at `goingCm`) stays.

### S23R1-04 — major — owner V01 — the `hatched` stair flight's undefined tread depth

**Claim.** V01 V1-5.1.2 *Stair flights* (l. 2427–2429): "The flight's facet as V02 paints it, its treads hatched across
the flight at the stair's world tread depth" — no record or function defines "world tread depth". V02 states the reader:
`stairTreads` is "read by … volume 1's stair-flight hatch (V1-5.1.2)" (V2 §2.6 l. 786; X24, X31). The `hatched` drawing
therefore counts treads by no law while `ink` and `lit` count them by `stairTreads`.
**Required change (V01).** V1-5.1.2 *Stair flights* → "The flight's facet as V02 paints it, its treads hatched across the
flight by volume 2's `stairTreads(w)` (its `n − 1` lines at its `goingCm`, V2 §2.6; X24), no ridge tapers; below 2 px of
plan per tread the lines are omitted as V02's `stairFlight` omits them; drawn after the wing it rises from and before the
wing it lands on (V1-5.1.3)". §1b's hatch row (l. 356) adds `stairTreads` beside "V02's `stairFlight`".

### S23R1-05 — major — owner BASE-F — item 226's label and BCR-V2-28's half-cellar raise

**Claim.** BCR-V2-28's round-1 extension (V02 l. 3718–3720) splits the request: "(a) and (b) [the half cellar's raise:
the datum term in *Heights and the ground datum* and the *Basements* floor clause] are BASE with §2.6's basement gate and
are applied before the milestone that builds it (file f item 226's M6-U label covers the crypt parts (c) and the raised
form only)"; applied after that milestone they are a declared one-time shift (J-V2.91). §16 builds the basement decision at
**M2b** (base l. 14891). File f item 226 (l. 113) labels the whole request "**BASE design, built at M6-U**", its note
"Applied after item 238 … one build unit with items 238 and 436". V02's own §13 (l. 4059–4060) asks the base-change lane to
split it; that lane had landed at 03:39, before V02's note (03:44). Built by the label, half cellars sink a full cellar
depth from M2b to M6-U — the contradiction S23-10 fixed — and the raise lands at M6-U as a shift nobody declared.
**Required change (BASE-F).** Item 226's label → "**BASE (M2b, with §2.6's basement gate) for the half cellar's raise —
its round-1 extension (a) and (b), applied after items 370 (BCR-V2-32) and 231 (BCR-V2-42), whose datum sentence (a)
extends, and before the milestone that builds the gate (else J-V2.91's declared one-time shift); BASE design, built at M6-U
for the raised crypt, the crypt parts (c) and `kind 'raised'` (item 109 (k)'s crypt rule, with the underground layer;
J111; S23-20, SCC-29)**"; its note's "Applied after item 238 … one build unit with items 238 and 436" is scoped "for its
crypt parts"; *Needed by* unchanged. The file's header paragraph on "BASE design, built at M6-U" gains "(item 226's half
raise excepted, BASE at M2b)". File f's reconciliation table gains the row (S23R1-05).

### S23R1-06 — major — owner V02 — `composition.classFamily` keyed by pre-`v.` village ids

**Claim.** V07 §2.4 (l. 694–699; J-V7.95) and V11 §2.9 (l. 612–617; SS-01) key every village class `v.<id>` — "a village
row and V11's town row of the same word (`smithy`, `farmstead`, `chapel`, …) are two keys that share no profile, template
or presence law" — and V07 keeps "V02's `composition.classFamily` rows … the one source of the village classes'
composition keys" (V07 l. 245–247; J-V7.82). V02 §3.10.5 (l. 1750–1763) keys that table by `hovel`, `cottage`, `chapel`,
`inn`, `watchtower`, `longhouse`, `farmstead`, `yeoman_house`, `manor_house`, `parsonage`, `reeve_house`, `parish_church`,
`tithe_barn`, `watermill`, `windmill`, `smithy`, `potter`, `tannery`, `alehouse`, `shop`, `bakehouse`, `landing`,
`wood_yard`, `charcoal_pit`, `pound`, with a `scope` of `village` or `always` for an id shared with a town class; §3.10.3's
override row `longhouse` (l. 1615) and its note "`manor_house` → `manor`" (l. 1605) likewise; the chain's step 3 (l.
853–854) reads `composition.classFamily[<class>]` "at a village rung, or for a class whose row has no `templateFamily`". No
village class carries those ids now, so every village building falls to `default.<arrangement>` (the manor house composes
as a default compound, the longhouse loses its fall-line axis), and T-V2-33's totality bar ("V07's village classes …
resolve to a row above `default.*`", l. 3036–3038) fails.
**Required change (V02).** §3.10.5's class column names each class by its `v.` key as V07 §2.4 keys it (`v.hovel`,
`v.cottage`, `v.chapel`, `v.inn`, `v.watchtower`, `v.longhouse`, `v.farmstead`, `v.yeoman_house`, `v.manor_house`,
`v.parsonage`, `v.reeve_house`, `v.parish_church`, `v.tithe_barn`, `v.watermill`, `v.windmill`, `v.smithy`, `v.potter`,
`v.tannery`, `v.alehouse`, `v.shop`, `v.bakehouse`, `v.landing`, `v.wood_yard`, `v.charcoal_pit`, `v.pound` — each where V07
§2.4 has that row); the `scope` column is withdrawn (a `v.` key is read at every rung it occurs; a town class at a village
rung plays its `villageForm`'s `v.` class, V11 §2.9, and never reads this table by its town id), and `ClassFamilyRow`
(l. 591) drops `scope`. Step 3 of the chain (l. 853–854) → "for a `v.` class (V07 §2.4): `composition.classFamily[<v.
key>]` (V2 §3.10.5)". §3.10.3's override row is keyed `v.longhouse`; the note reads "(`v.manor_house` → `manor`)". §1b l.
213's feeder "V07's village classes" → "V07's `v.` village classes"; T-V2-33 names "V07's `v.` village classes"; X13's
fallback cell unchanged. No migration (V02 is unbuilt; V11 §2.9's migration row covers document overrides naming an old
key).

### S23R1-07 — major — owner V03 — village programme rows keyed by pre-`v.` village ids

**Claim.** The same rename (S23R1-06's evidence). V03 2.4's *village class rows* (l. 791–798) key `longhouse`, `farmstead`,
`yeoman_house`, `manor_house`, `parish_church`, `parsonage`, `tithe_barn`, `watermill`, `windmill`, `smithy`, `alehouse`,
`inn`, `chapel`, `hovel`, `cottage`; A1 reads "for a village class its volume 7 id" (l. 926); A2 (4)'s dwelling list names
"the village rows `yeoman_house`, `parsonage` and `manor_house`" (l. 971–972); T-V3-1 requires "every volume 7 village
class" to resolve (l. 2165). Keyed so, a `v.` class finds no class-id row: `v.longhouse` loses its byre and its `lowEnd`
bias, `v.manor_house` its hall, and — since V07 declined a `templateFamily` column on village rows (J-V7.82) — A1 falls to
the building-class row or the fallback; A2 (4) never withholds a divided `v.manor_house`'s hall. Where V03's village row
"takes" a town row of the same word (`smithy`, `alehouse`, `inn` — "their class-id rows"; `chapel`, `hovel`, `cottage`), the
text no longer says which of the two classes it means.
**Required change (V03).** The *village class rows* paragraph keys each row by its `v.` key (`for.cls` = `v.longhouse`,
`v.farmstead`, `v.yeoman_house`, `v.manor_house`, `v.parish_church`, `v.parsonage`, `v.tithe_barn`, `v.watermill`,
`v.windmill`, `v.smithy`, `v.alehouse`, `v.inn`, `v.chapel`, `v.hovel`, `v.cottage`, as V07 §2.4 keys them) and names the
row it takes as a **town** row explicitly ("`v.smithy`, `v.alehouse`, `v.inn` — the town class-id rows `smithy`,
`alehouse`, `inn`"; "`v.chapel` — the town `chapel` class row"; "`v.hovel`, `v.cottage` — the town `hovel` and `cottage`
class rows"); A1's parenthesis → "for a village class its `v.` key (V07 §2.4; V11 §2.9)"; A2 (4)'s list → "the village rows
`v.yeoman_house`, `v.parsonage` and `v.manor_house` (and `v.cottage`, `v.hovel` through the class rows they take)";
`parish_church`'s note keeps its `part:tower` wing; T-V3-1 → "every volume 7 village class (its `v.` key)". §2.5's table row
for the village rows unchanged.

### S23R1-08 — minor — owner V01 — the building click at the city and district bands

**Claim.** V03 §4.5 (l. 1919–1927) and V02 §3.11 (l. 1901–1904) rule that at the city and district bands a click on a
building is the district's click (V01 V1-3.8.1: its close-up and its buildings' `wings` rung), which also selects the
building and opens its panel (J-V3.108, J-S23.5). V01 V1-3.8.1 (l. 1525–1530) says only "a click on a district (at the city
or district band)"; round 0's S23-18 asked it for one sentence (V03's §13 hand-off, l. 2865), which no lane applied. A
builder of V01's click reads a building under the cursor as no district click.
**Required change (V01).** V1-3.8.1, after "raises its buildings' `wings` rung (II.4)": "; a click on a building at these
bands is this click, which also selects the building and opens its panel without deriving its `rooms` or `plan` (volume 3
§4.5; volume 2 §3.11)".

### S23R1-09 — minor — owner V03 — round 0's critique cited as a rule's source; §16's total by old items

**Claim.** The rules round 0 asked for now stand in the owning volumes and file f, yet V03 cites the critique for them:
3.3 (l. 1108–1109) "BCR-V2-28 as critique/seam-stage2-3-r0.md S23-10 words it; J-S23.2"; BCR-V3-15 (l. 2546) and BCR-V3-19
(l. 2581) "as critique/seam-stage2-3-r0.md S23-06 words it"; §8 (l. 2265–2266) "file f items 474 and 524 as
critique/seam-stage2-3-r0.md S23-19 words them" and BCR-V3-30 (l. 2697) "(file f items 474 and 524)"; §12 (l. 2795–2796)
"read as the seam file words them, not yet as landed text". An implementer holds the base and the volume, not the critique
(§17.1), and §16's total is computed by file f item 568, not items 474 and 524.
**Required change (V03).** 3.3 → "(volume 2's BCR-V2-28, as extended by its reconciliation round 1 (b); J-V2.91)"; BCR-V3-15
and BCR-V3-19 → "as volume 2's BCR-V2-13 (its reconciliation-round-1 extension) splits it per rung"; §8 and BCR-V3-30 → "the
coherence pass computes it once (file f item 568)"; §12's sentence → "BCR-V2-13's per-rung split, BCR-V2-28's half-cellar
raise and file f item 305's deck bend read as landed (V02 md5 c459dd4d…, file f 40e2f8d6…)".

### S23R1-10 — minor — owner V02 — "the walk-out rule" for a solid stack's basement door

**Claim.** V2 §3.15.3 (l. 2239–2241): "Under a solid tier 0 the basement's access is `external` (BCR-V2-33), volume 3
placing its door by the walk-out rule (the crypt inside a platform entered from the platform's foot, volume 3)". V03 3.7.1
names that door the **tomb door** and keeps the walk-out for a retaining wall's high side (l. 1457–1467); IN-V02-2 (a)
(l. 4116–4119) rules that "every pointer of this volume to the solid stack's door reads 'volume 3 placing its door by its
tomb-door rule (V03 §3.7.1)'", but the sentence was not edited.
**Required change (V02).** l. 2240–2241 → "volume 3 placing its door by its tomb-door rule (V03 §3.7.1; the crypt inside a
platform entered by the same door at its own floor)".

### S23R1-11 — minor — owner V02 — BCR-V2-28's lead sentence on the seed without stage 3

**Claim.** §10's lead (l. 3452–3455): "BCR-V2-28, which applies with item 109 (k)'s crypt rule (J111) whether or not stage 3
has registered (without stage 3 the crypt's seed is the template's chancel part, BCR-V3-20's seed rule)". The seed is now
`cryptSeedWings` (exported by `@plat/plots`, with or without stage 3; V2 §3.14.5 (c)), and the request's half raise lands
with the basement gate (S23R1-05).
**Required change (V02).** The parenthesis → "(the crypt's seed wings are `cryptSeedWings`, exported by `@plat/plots` with
or without stage 3, V2 §3.14.5 (c); its half-cellar raise, (a) and (b) of its round-1 extension, lands with §2.6's basement
gate)".

### S23R1-12 — minor — owner V02 — `facadeBays` has two package homes

**Claim.** BCR-V2-18 (l. 3598–3603) puts `facadeBays` in `@plat/buildings` ("the roofscape and facadeBays … imported by
`render` and `export` for its pure `roofscape` and `facadeBays` only"), and BCR-V3-31 extends that line; V2 §8.1
(l. 3274–3276), the M6b row and V03 W2 / P1 (l. 1432–1434, 2227) export it from `@plat/plots` "as `massStepped` is" when the
plan rung lands first (Q1). One function, two homes by build order — `stairTreads` and `cryptSeedWings`, its siblings, are
`@plat/plots`' always.
**Required change (V02).** BCR-V2-18 keeps its quoted line (BCR-V3-31 quotes it) and adds one sentence: "`facadeBays` and
its two constants' reader are implemented in `@plat/plots` beside `massStepped`, `stairTreads` and `cryptSeedWings`, in every
build order, and re-exported by `@plat/buildings`; `render` and `export` may import it from either." V2 §8.1's and the M6b
row's "moved forward … exported from `@plat/plots`" read "built in `@plat/plots` (BCR-V2-18), at M6b or, under volume 3's Q1,
first". (V03's W2 / P1 sentence then holds unconditionally; no V03 edit needed.)

### S23R1-13 — minor — owner V02 — `_integrate.md` keeps the withdrawn low-building exception

**Claim.** `_integrate.md` J-VI.5 (l. 147: "V06 … displaces a building under a new raised way's strip taller than its
underside less `raised.clearCm` (X23)") and H3 (l. 177: "the raised way's strip displacing buildings taller than its
underside less `raised.clearCm`") state the exception S23-01 withdrew (J-V2.89; X23 now "clearing **every** building
meeting its supports or strip"). V02 §13 (l. 4056–4058) names them for another lane; none applied it.
**Required change (V02; applied to `_integrate.md` in passing, as reconcile-BASE-F-r1 edited J-VI.2).** J-VI.5's clause →
"displaces every building meeting a new raised way's supports or under-deck strip (X23; V2 §3.17 (b) as reconciled, S23-01)";
H3's clause → "the raised way clearing every building meeting its supports or strip (V02 X23; V2 §3.17 (b))"; a dated note
under `_integrate.md` §2.2.

### S23R1-14 — minor — owner BASE-F — item 305's bend stops a rung short of V03's

**Claim.** File f item 305's note (and BCR-V2-34, V02 l. 3797–3801) bend a basement request on a deck over water "to the
same request on the nearest building on the ground of its plot group, else of its block (volume 3 §4.2)". V03 §4.2
(l. 1850–1853) adds a third rung, "else the nearest building on the ground" — a deck block holding no ground building
(a bridge's shop row) otherwise has no target, and the base text implies none.
**Required change (BASE-F).** Item 305's quoted addition → "… of its plot group, else of its block, else the nearest
building on the ground (volume 3 §4.2), named (`bend.deck.basement`, volume 2 §1b's bend list)"; V02's BCR-V2-34 clause
reads the same (this lane's item carries V02's sentence, as reconcile-BASE-F-r1 carried S23-17's).

*The continuation's issues (V01 whole read, live text; line numbers are the live files', §1.1).*

### S23R1-15 — major — owner V01 — the entrance reserve's porch rows: no source at M5, absent from the digest

**Claim.** V1-3.8.2 step 5 (l. 1626–1640) sizes every reserve rectangle as "`widthM[1]` wide and `depthM[1]` deep of
volume 2's porch kind rows (V02 §3.7: for a main entrance the largest over the `PorchKindRow`s with `outside` true, for a
side, rear or yard entrance the `hood` row's …)", and W6 builds it at M5 (l. 2874). V02's `PorchKindRow`s are rows of
`composition.json` (V2 §2.3 l. 626), which V02 ships at M3a-V2 with "the `tiers` cells, the four stepped rows, the `@deck`
rows and the constants they read (the rest at M6a)" (V2 §8.5 l. 3467) — the porch rows are in "the rest" (M6a, V2 §8.3
l. 3434). So at M5 the reserve reads a table that does not exist. Separately, the close-up's cache chunk is keyed by its
inputs digest (V1-3.8.3, l. 1653–1660): `Entrance` records, `Basement.access` and the `basementDoor(b)` value are in it,
the porch rows are not, although they are editable (§7.6, `editTable`) — an edit of `hood.depthM` or `twoStorey.widthM`
changes the reserve and so the pins, yet the chunk's digest is unchanged and the cache serves the old pins: the close-up
stops being a pure function of its declared inputs (T-V1-15's purity). T-V1-26's clause "— the `wings` and plan rungs
derived — 0 within 0.3 m of a porch, a secondary porch, a stoop or an outside basement stair's steps" (l. 2797) runs "from
M5" by §7's default, where no porch (M6b) or stoop (M6-P) can exist.
**Required change (V01).** (a) V1-3.8.2 step 5, after "the secondary porch's kind)": "— the `PorchKindRow`s of volume 2's
`composition.json`, shipped from M3a-V2 (V2 §8.5), so the reserve stands at M5 at the porches' own sizes before the
composer draws any porch —". (b) V1-3.8.3's digest, after "`Basement.access` and `basementDoor(b)` value (…)": ", the
`PorchKindRow` slice of `composition.json` the reserve reads (cited as the `hood.pins` slice is, §7.6)". (c) §1b's
entrance-reserve row, feeder "volume 2's `PorchKindRow`s" → "volume 2's `PorchKindRow`s (`composition.json`, from
M3a-V2)". (d) W6's *depends on* adds "volume 2's `PorchKindRow`s (M3a-V2)". (e) T-V1-26's clause gains "(the porch and
secondary-porch clauses from M6b, the stoop and outside-stair clauses from M6-P; the reserve's own clauses on eager
records from M5)".

### S23R1-16 — major — owner V02 — ship the porch rows with M3a-V2's `composition.json`

**Claim.** S23R1-15's other half. Volume 1's entrance reserve (V1-3.8.2 step 5, built at M5) reads `PorchKindRow`'s
`widthM`, `depthM` and `outside`; V02 ships the rows at M6a (V2 §8.3, §8.5 l. 3467's "the rest at M6a"), after M5, and
§1b's `composition.json` row (l. 239) lists as consumers "the massing, the composer, the mutator, the roofscape,
`facadeBays`, §8.10's decorative chimneys" — not the reserve. A producer that lands after its reader, and a reader the
producer's wiring table does not know.
**Required change (V02).** V2 §8.5's M3a-V2 row: "`composition.json` shipped with the `tiers` cells, the four stepped rows,
the `@deck` rows and the constants they read (the rest at M6a)" → "… the `@deck` rows, the `PorchKindRow`s (data only:
volume 1's entrance reserve reads their `widthM`, `depthM` and `outside` from M5, V1-3.8.2 step 5; the porch itself is
composed from M6b) and the constants they read (the rest at M6a)". §1b's `composition.json` row's consumer cell adds
"volume 1's entrance reserve (`PorchKindRow`'s `widthM`, `depthM`, `outside`; V1-3.8.2 step 5 and V1-3.8.3's digest)". No
estimate change (five data rows already authored in V2 §3.10). An `FM` or calibration edit of the rows at M6c is an
ordinary `editTable`, which V1-3.8.3's digest (S23R1-15 (b)) turns into re-derived chunks.

### S23R1-17 — major — owner V02 — the footprint court's typing is built at M6 but read from M3a

**Claim.** V02's `massOval` lays the second known-city fixture's arena "by the base outline builder from M3a … falling to
… the base's court-institution construction at M3a" (V2 §3.5 l. 1124–1128), and "the hole inside `P2` is the court — the
arena floor, typed `court` like any hole (BCR-V2-24)" (l. 1141). BCR-V2-24's sentence "S11's yard partition types every
hole of a footprint face as a yard part of kind `court`" (l. 3829–3830) belongs to a request file f item 303 labels
**STAGED (M6, stage 3)**, and V2 §8.5's M3a-V2 row does not list it. Before M6 the base types a yard part by the
designation template's yard rows (§2.5 `YardPart.kind`, "data-defined"), so the arena floor's kind between M3a and M6 is
whatever its template's yard row names — the typing V02 cites does not exist yet. Readers at M3a–M5: V01's hood-pin
sites exclude "the floor of a building whose `MassingRef.family` is `ovalCourt`" as a `court` yard part (V1-3.8.2 step 1),
barred at M5 by T-V1-26 ("0 hood pins on an `ovalCourt` building's floor") and exercised on the fixture by T-V1-54;
V02's T-V2-42 measures "its court's share of the hull" at M3a (§8.5). A floor typed `yard` by a template row takes wells
and trees at M5, and the typing shifts once when M6 lands.
**Required change (V02).** BCR-V2-24 gains a build note: "Its sentence 'S11's yard partition types every hole of a footprint
face as a yard part of kind `court`' is built at M3a with BCR-V2-39 — the base outline builder's `massOval` arena and its
court-institution construction lay holed footprints from M3a — and the rest of the request at M6 (reconciliation round 1,
S23R1-17). Readers of the typed court from M3a: V2's T-V2-42; volume 1's hood-pin sites (V1-3.8.2 step 1) and T-V1-26,
T-V1-54 at M5; volume 3's court openings at M6-P." V2 §8.5's M3a-V2 row adds "BCR-V2-24's hole typing (every footprint
hole a `court` yard part; the arena floor)"; l. 1141's "(BCR-V2-24)" → "(BCR-V2-24's hole sentence, built at M3a)".

### S23R1-18 — minor — owner BASE-F — item 303's label, and V01 in *Needed by*

**Claim.** (a) S23R1-17's label half: item 303 (BCR-V2-24) reads **STAGED (M6, stage 3)** and *Needed by* "V02". (b) File
f's *Needed by* cells are the base-change record of who depends on an item; V01 reads eight items whose cells omit it:
216 (BCR-V2-01, wing keys — V1-5.1.3's stack ties), 227 (BCR-V2-31, `BaseWing.on`, `solid` — the stack order and tier
shadows), 241 (BCR-V3-26, the entrance set with rule 4's non-derivation — the entrance reserve), 303 (BCR-V2-24, the
footprint court — V1-3.8.2 step 1's sites and the `ovalCourt` exclusion), 305 (BCR-V2-34, `DeckContext` — V1-3.10.3 (4),
T-V1-21), 371 (BCR-V2-33, `Basement.access` `external` — the reserve's second rectangle), 406 (BCR-V2-15, `roofscape` and
the construction switch — V1-5.1.1 – V1-5.1.2's per-facet hatch), 419 (BCR-V2-36, the per-wing constructions' stack order
and treads — `hatched` before M6b, X24's fallback). Items 242 and 578, which V01 reads, already name it.
**Required change (BASE-F).** Item 303's label → "**BASE (M3a, with item 229's base outline builder) for its hole sentence —
S11's yard partition types every hole of a footprint face as a yard part of kind `court`; STAGED (M6, stage 3) for the
rest** (S23R1-17)"; *Needed by* of items 216, 227, 241, 303, 305, 371, 406 and 419 adds V01; the reconciliation table
gains the row (S23R1-18).

### S23R1-19 — minor — owner V01 — two outside doors the reserve omits

**Claim.** The reserve stands "outside each building's main entrance, and each `side`, `rear` or `yard` entrance"
(V1-3.8.2 step 5, l. 1626–1627); the base's `Entrance.role` is `'main'|'side'|'rear'|'yard'|'service'` (§2.6), a
`service` door — a concealed use's own door among them — being an outside door like the others. And volume 3 opens the
head of an access hosted by a building with neither a basement nor `ground(b)` as "an outside door in the face of the
ground-standing wing nearest `ground.at`" (V03 3.7.2 (1), l. 1562–1564; 3.9's row, l. 1755, `W_STACK_ACCESS`) — a door
the reserve does not hold, so a hood pin may stand against it. J-V1.75 states the reserve's purpose as keeping the pins
off every outside approach volumes 2 and 3 draw.
**Required change (V01).** V1-3.8.2 step 5: "each `side`, `rear` or `yard` entrance" → "each `side`, `rear`, `yard` or
`service` entrance (§2.6's roles; a concealed use's door among them, whose rectangle is never drawn)"; after the
basement-door sentence add: "and, for an `AccessPoint` hosted by a building with neither a basement nor `ground(b)` —
whose head volume 3 opens as an outside door in the nearest ground-standing face (V03 3.7.2 (1)) — the `hood` row's
rectangle outward from the footprint side nearest the access's `ground.at`, centred on `ground.at`'s projection onto
it". V1-3.8.3's "ground `AccessPoint`s" → "ground `AccessPoint`s (building-hosted ones included)"; J-V1.75 and §1b's
reserve row name the two; T-V1-26's reserve clause counts them.

### S23R1-20 — minor — owner V01 — a bar that fails the rule it tests

**Claim.** T-V1-26 (l. 2797): "… 0 hood pins inside the reserve at a walk-out's door (`basementDoor(b)`) and 0 reserves at
the main side of a walk-out building whose `basementDoor(b)` lies on another side (seam S23R3-02)". Every building keeps a
rectangle at its main entrance (V1-3.8.2 step 5), so "0 reserves at the main side" fails every walk-out building; the
clause means the basement door's rectangle.
**Required change (V01).** → "… and 0 basement-door rectangles on the main entrance's side of a walk-out building whose
`basementDoor(b)` lies on another side (its main entrance keeps its own rectangle; seam S23R3-02)".

### S23R1-21 — minor — owner V01 — `stepProfile`'s volume-3 readers

**Claim.** V01's `stepProfile(wall)` (BCR-43) is read, at M3a, by volume 3's walk-out at a retaining wall in S11's
basement decision ("whose step there (volume 1's `stepProfile`, BCR-43) is at least half the cellar depth", BCR-V3-27,
l. 2765–2771) and by `basementDoor(b)`'s rule 1 (V03 3.7.1, l. 1520–1528; V03 §1b l. 306). V01's §1b row (l. 389) lists
its readers as S14's wall shadow, file f item 447's step bounds, the VTT threshold, the replace dry run's notice, the wall
why provider and volume 4's buried floor; BCR-43 (l. 3452 ff.) likewise. The two eager basement facts that read it are
missing from the producer's side.
**Required change (V01).** §1b's `stepProfile` row, feeds cell, adds "volume 3's walk-out at a retaining wall in S11's
basement decision (BCR-V3-27 (a)) and `basementDoor(b)`'s rule 1 (V03 3.7.1), both at M3a"; BCR-43's reader sentence
adds "and volume 3's walk-out at a wall (BCR-V3-27 (a)) and `basementDoor(b)` (volume 3 §3.7.1)".

### S23R1-22 — minor — owner V01 — the plain words on crypt doors

**Claim.** §0 (l. 180–181): "churches, and always the cathedral, keep crypts in their basements, which get no door on the
street". V03 3.7.6 (l. 1674–1678): "where `ground(b)` is absent (a stepped temple's sanctuary stands on its solid stack),
the crypt's entry is the basement's outside door at `basementDoor(b)` (3.7.1: the tomb door …)", on the main entrance's
side. The owner reads §0 as the rule; a great temple built solid in tiers enters its crypt from outside.
**Required change (V01).** §0's sentence → "churches, and always the cathedral, keep crypts in their basements, with no
entrance of their own on the street — you go down from inside the church; only a great temple built solid in tiers is
entered at its foot by its own door into the crypt, drawn with the building".

### S23R1-23 — minor — owner V02 — §1b's stack and arena rows omit volume 1's readers

**Claim.** V02 §1b's consumer cells: `BaseWing.role`, `BaseWing.key` (l. 236: the composer, the mutator, the anchors, the
roofscape, exports, edits); `BaseWing.on`, `BaseWing.solid` (l. 300: `deriveBase`'s stacking, `storeyRange`, the
capacity, the roofscape's occlusion and order, the casters, the carry check, exports, volume 3's plans of tiers); family
`ovalCourt` (l. 297: M3–M13, the roofscape, volume 3's plan of the outer ring, volume 12's bars, volume 11's arena plot).
Volume 1 reads all three: the `hatched` stack order by `on` depth with ties by wing key and the tier shadows (V1-5.1.3;
V02 X24), and the `ovalCourt` floor's exclusion from the hood-pin sites (V1-3.8.2 step 1).
**Required change (V02).** l. 236's cell adds "volume 1's `hatched` stack ties (V1-5.1.3)"; l. 300's adds "volume 1's
`hatched` stack order and tier shadows (V1-5.1.3; X24)"; l. 297's adds "volume 1's hood-pin sites (V1-3.8.2 step 1: no
pin on the arena floor)".

### S23R1-24 — minor — owner V03 — a reader of `Basement.crypt` that reads nothing

**Claim.** V03 lists "volume 1's no-place rule" among the readers of `Basement.crypt`: §1b (l. 291), 2.5's lifecycle row
(l. 926), 3.7.4 ("volume 10's why and volume 1's no-place rule read it at generation", l. 1657) and J-V3.45 ("volume 1 and
volume 10 need the crypt at generation", l. 2413). V01's rule (V1-3.7.1) is a selection by `AccessPoint` fields — a public
opening of role `access`, or a catacomb system's `stair` — that never reads `Basement.crypt`; only its bar T-V1-47 ("0
places or pins for crypts") reads the crypt, to check. A consumer claimed on one side and absent on the other.
**Required change (V03).** At l. 291, l. 926 and l. 1657, "volume 1's no-place rule" → "volume 1's T-V1-47 (its check that
no crypt has a place or a pin; V1-3.7.1's opening pass selects by `AccessPoint` fields and reads no crypt field)";
J-V3.45's "volume 1 and volume 10 need the crypt at generation" → "volume 10 and volume 1's T-V1-47 read the crypt at
generation".

## 5 Decisions, CONFIRMED versus PLAUSIBLE, and what lies outside the seam

**Decisions (vetoable).**

| id | decision |
|---|---|
| J-S23R1.1 | Chose **one owner per issue, a second volume's half written as its own issue**, over round 0's "V02; V03 cites" cells, because all four round-0 issues left unfixed failed at exactly that half: the workflow routes an issue to its first-named owner, and the second volume's lane never saw it. |
| J-S23R1.2 | Chose to **re-grade S23-30's residual major** (S23R1-02), over keeping round 0's minor, because V02's law now deducts meeting wings and towers and lays a tower's bays round its free perimeter, so V03's restatement puts plan windows on different bays from V02's lit windows on every gable that meets a wing and every tower — a contradiction a builder meets, no longer a wording. |
| J-S23R1.3 | Chose to register the **`v.` village-key breaks** (S23R1-06, S23R1-07) on this seam, over leaving them to the settlements seam, because the brief's "one set of classes" across blocks, buildings and rooms is this seam's, and V02 and V03 — not V07 or V11 — hold the tables that no longer match. |
| J-S23R1.4 | Chose **M2b** for item 226's half-raise label (S23R1-05), over M3a or M6-U, because BCR-V2-28's extension ties it to "§2.6's basement gate" and §16's M2b row builds "the basement decision (§2.6)" (base l. 14891). |
| J-S23R1.5 | Chose to keep V03's **third rung** of `bend.deck.basement` (S23R1-14) and extend the base text, over trimming V03, because a bridge's shop row can hold no ground building in its plot group or block, and item 101 R2 wants a lawful target, not an unstated end. |
| J-S23R1.6 | Chose to **checkpoint before V01's whole read** (§3.6), over reading on past the owner's ~300k standard, because every round-0 issue and half touching V01 is re-checked, and the continuation's V01 read loses nothing this lane holds (notes in the scratchpad). |
| J-S23R1.7 | *Continuation.* Chose to run the whole read on the **live** text and carry its findings to the live round (`seam-stage2-3-r4`) by a `lane-events.log` NOTE, over reading the 04:14 snapshot and registering against text rounds 2 – 4 have since changed, because the reconcile lanes act on today's text and the snapshot's findings would mostly be fixed or moved; the checkpoint's S23R1-01 … 14 stay as written, with round 2's disposition (all fixed) recorded beside them — the precedent of the seam-surfaces and seam-content-calibration round-0 continuations (08:16, 08:28). |
| J-S23R1.8 | Chose to fix S23R1-15 / -16 by **shipping `PorchKindRow` with M3a-V2's `composition.json`**, over V01 holding fallback porch sizes of its own until M6a, because the rows are five authored data rows (no build effort), a second copy of their sizes in `hood.constants` would state volume 2's facts twice, and a reserve sized from real rows from M5 keeps the hood pins unmoved when the composer's porches appear at M6b — J-V1.75's order-independence. |
| J-S23R1.9 | Chose to move **BCR-V2-24's hole sentence alone to M3a** (S23R1-17 / -18), over the whole request or leaving the arena floor to its template's yard row until M6, because `massOval` and the court-institution construction lay holed footprints at M3a and three bars read the floor as a `court` before M6, while the request's other sentences (the outline registration, `BuildingInput`'s stage-3 fields) have no reader before M6. |
| J-S23R1.10 | Chose to grade the **reserve's missing doors** (S23R1-19) minor, over major, because a hood pin against a plain door with no steps is a picture defect no model fact or bar depends on, while the porch rows' milestone (S23R1-15) is a missing input a builder cannot work around. |

**CONFIRMED versus PLAUSIBLE.** CONFIRMED by reading, with the line numbers cited: every status of §2 (each fix read at its
line in the current file and located by `diff` against the pre-reconcile backup, whose hashes equal round 0's inputs); every
claim of S23R1-01 – S23R1-14 (V02, V03, file f and `_integrate.md` read whole; V07 l. 240–252, 690–700 and V11 l. 245,
612–633 read for the `v.` keys; the base's §16 M2b row read at l. 14891). The required changes are PLAUSIBLE until their
owners apply them and the next round re-checks; J-S23R1.4's milestone reading is PLAUSIBLE (the base's row names the
basement decision at M2b, and BCR-V2-28 names the gate, not a milestone). Nothing was executed beyond `diff`, `grep` and
`md5`: this lane writes a critique.

*The continuation.* CONFIRMED by reading the live text at the lines cited (§1.1's hashes): V01 whole; every claim of
S23R1-15 … 24 at both ends — V01's reserve, digest, W6, T-V1-26, §1b rows, BCR-43 and §0; V02's `PorchKindRow`, §8.3's M6a
row and §8.5's M3a-V2 row ("the rest at M6a"), §3.5's `ovalCourt` branch, BCR-V2-24's sentence and §1b's rows; V03 3.7.1,
3.7.2 (1), 3.7.6, 3.9's rows, §1b, 2.5, J-V3.45 and BCR-V3-27; file f items 216, 227, 241, 242, 303, 305, 371, 406, 419,
578 (their labels and *Needed by* cells); the base's `Entrance.role` (five values) and `YardPart.kind` ("data-defined").
That no round raised these before: CONFIRMED by searching rounds 0 – 3 of this seam and the other seams' critiques
(`PorchKindRow` appears only in `critique/V02.md`; BCR-V2-24's milestone, `service`, `W_STACK_ACCESS` and the crypt's
phantom reader in none). PLAUSIBLE: that the arena floor's template yard row would name something other than `court`
before M6 (S23R1-17 holds either way — the typing V02 cites is not built); that no other V01 reader of a volume-2 table
lacks a milestone (every other cross-read found — keys, `on`, `stairTreads`, `massOval`, `MassingRef`, `DeckContext`,
`basementDoor(b)` — is built at M1 or M3a).

**The continuation's routing.** This lane edits no volume. S23R1-15 … 24 are open and are carried to the live round
`volumes/seam-stage2-3-r4` by a `lane-events.log` NOTE, for it to take into its register (or, should that round land
without them, for the next reconcile lanes of V01, V02, V03 and BASE-F). The checkpoint's S23R1-01 … 14 need nothing:
round 2 re-checked all 14 fixed.

**Outside this seam.** `_integrate.md` §6's V04 price (27.25–38 pw) is stale against V04's reconciled 27.75–38.75 — the
layers seam's (reconcile-V04-r1's note). The `v.` rename's other readers (V04's counted church classes, V06, V08) are the
settlements and time seams'. V01's reach into V04 and V05 (the hood pins over openings, the sky's pins) is the layers seam's.
