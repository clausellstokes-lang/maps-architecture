# Seam check, round 6 — stage 2 · stage 3 · the plan rung (V01 neighbourhoods · V02 buildings · V03 interiors)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/seam-stage2-3-r6; covered by the whole-design retrovalidation (J84).

Lane `volumes/seam-stage2-3-r6`, 2026-09-29. Reconciliation round 6 of this seam. Output: this file only — no volume, no
amendment file and no base text is edited by this lane. Every issue names **one** owning volume (or BASE-F, an item of
`docs/AMENDMENTS-2026-09-28f.md` that must change) and the exact change it needs (J-S23R1.1 kept).

PROGRESS
- §1 Method, inputs and coverage | done
- §2 Re-check of round 5 (S23R5-01..05) | done
- §3 Sweep (every line changed since round 5's inputs; mechanisms re-traced) | done
- §4 Issue register (S23R6-nn) | done
- §5 Summary by owner, decisions (J-S23R6), CONFIRMED versus PLAUSIBLE | done

## 1 Method, inputs and coverage

**Inputs as read** (md5 at this lane's start, 14:28, re-checked at its end; working copies in the session scratchpad's
`volumes/seam23r6/live/`): `docs/volumes/V01-neighbourhoods.md` 85b488b3… (4 454 lines), `docs/volumes/V02-buildings.md`
65e5ea63… (4 828, unchanged since round 5), `docs/volumes/V03-interiors.md` eb01b7dc… (3 852),
`docs/AMENDMENTS-2026-09-28f.md` 839ccce5… (1 806), `docs/volumes/_integrate.md` 965ab696… (468, unchanged since round
2's continuation), `docs/ARCHITECTURE.md` 01fea21f… (unchanged since round 0). Each hash is the one its round-6 lane logged
at landing (V01 13:53, V03 13:59, BASE-F 14:03); V02 had no round-6 lane. Round 5:
`docs/volumes/critique/seam-stage2-3-r5.md` (20bbd674…, 355 lines) read whole.

**Coverage (J-S23R6.1).** Round 5's inputs survive exactly as its snapshots (`seam23r5/now/`, hashes 15a69be1, 65e5ea63,
e60491e3, e4c1756e, 965ab696 checked). This round read the **full diff** of each file from those inputs to the live text —
624 diff lines (V01 154: reconcile-V01-r6, S23R5-05 with the layers seam's SLR5-02, -03, -04; V02 0; V03 343:
reconcile-V03-r6, S23R5-01, -02, -03 and the content seam's SCC-106; file f 127: reconcile-BASE-F-r6, S23R5-04 with
SLR5-05, SR5-15, SCC-101 and TW-03 (3)) — and followed each changed mechanism into the untouched text of all three volumes
and the base, reading every hit in place: the crypt ladder and the basement's extent (V03 3.7.1, 3.7.4 – 3.7.7, 3.9, 4.2,
O2, 2.1's derived pieces, 2.5, §1b, §0, §7's fixtures, T-V3-23, BCR-V3-20; V02 §3.14.5 (a) – (e), §3.15.3's *Crypts and
basements*, §1b and the heights table's lift rows, BCR-V2-28 with its round-1 extension, BCR-V2-33, J-V2.91, T-V2-36,
T-V2-44, T-V2-52, T-V2-53; V01 §0 and its crypt sentences; file f items 226, 238, 371, 436, 578); the entrance storeys
(V03 3.6, 2.5, §1b, BCR-V3-26, T-V3-30, J-V3.124; file f item 241); the stage-2 switch's edit where it reaches buildings and
plans (V1-3.15, V1-2.7, V1-4.3; V02's and V03's lifecycle rows); file f items 313 and 585 against V01's BCR-10 and V03's
2.4. Three scripts over the live volumes: round 4's census (`census.py`) resolves every `J-V`, `T-V`, `BCR-V`, `X` id and
every section one of the three volumes cites in another — **0 dangling**; the widened census (`xcensus.py`) resolves the
section pointers and ids the three volumes cite in volumes 4 – 12 — **0 dangling**; the reverse census (`rcensus.py`)
resolves the 663 section-pointer and 195 id occurrences volumes 4 – 12 cite in these three — **0 dangling** (its 8 hits are
all `T-V2-31`, defined at V02 l. 3252 as a bold paragraph the script's row pattern misses, as in round 5). Beyond the
censuses, the round-6 diffs of volumes 4 – 12 against their lanes' pre-round backups (3 290 lines; `seam23r6/other/`) were
searched for every line citing volume 1, 2 or 3 (136 lines, read whole) and for the terms the seam shares
(`BuildingClassRow`, `raisedWays.structure`, `retaining.settings`, `MsgRow`, `useTool`, `EpochPlacement`, crypt, basement,
entrance): none changes a mechanism volumes 1 – 3 state; what they hand to these volumes belongs to other seams (§5,
*Outside this seam*). Working notes and diffs: `seam23r6/d1.txt` … `di.txt`, `census*.txt`, `xcensus.txt`, `rcensus.txt`,
`other/`.

## 2 Re-check of round 5

S23R5-01 … 05 were applied between 13:53 and 14:03 by the round-6 reconcile lanes. Each is re-checked here at its anchor in
the live text.

| id | r5 sev. | owner | status | evidence (live file, line) |
|---|---|---|---|---|
| S23R5-01 | major | V03 | **fixed** (two residues on paths the fix opened: S23R6-01, S23R6-04; wording S23R6-05, S23R6-06) | 3.7.4's *A stair-entered crypt* (V03 l. 1854 – 1863) and the `always` bullet's whole inset (l. 1812 – 1822); O2's crypt join keyed on the crypt and run by the tree spanning the basement (l. 1537 – 1548); 3.7.6's entries and last bullet (l. 1886 – 1894, 1915 – 1918); 3.9's two rows (l. 1972 – 1973); 3.1 step 2 (l. 1043 – 1044), S6 (l. 1333 – 1334); §1b's door-graph, `basementDoor(b)` and new reading rows (l. 352, 357, 370); 2.1's derived pieces (l. 531 – 532); 2.5's new row (l. 1020); 4.2 (l. 2155 – 2161); §0 (l. 153 – 154); §7's annex fixture with and without a requested basement (l. 2480 – 2481); T-V3-23 (j) (l. 2513); §8's P2 (l. 2557); BCR-V3-20's two clauses (l. 2956 – 2966); J-V3.126 amended, J-V3.127 new (l. 2727 – 2728). Recorded refinements (the vault shares *area*, the step-2 ring of the crypt-only region, the author's ring, the flight laid inside the part a level-0 room stands over) each read against 3.7.1, 3.7.5 and O2 — consistent |
| S23R5-02 | minor | V03 | **fixed** | O2's forbidden clause closes a stair-entered crypt's vault, a crypt stair's foot and a head's bay staying structural faces (l. 1533 – 1537); the core's bay never opens into it (l. 1551 – 1553); 3.7.1's *Where a core joins it* keeps the core's bay and the trapdoor outside it (l. 1645 – 1647); 3.7.5 joins the undercroft to the rest of storey −1 only where the crypt is not stair-entered (l. 1876 – 1877); T-V3-23 (j)'s capped walk-out clause; J-V3.126 (c). Part (c) applied as a **widened** citation, not a swap: 2.1's list of derived pieces does state the capped bays (l. 530 – 531), so round 5's premise ("2.1 states no such reading", read at l. 500 – 505 only) was wrong and volume 3's reading is the right one (J-S23R6.4) |
| S23R5-03 | minor | V03 | **fixed** | 3.6's *Entrance storeys*: access, kind or floors, the storey step drawing nothing (l. 1607 – 1610); 2.5's row (l. 1017); §1b's row (l. 339); BCR-V3-26's rule-4 text and closing (l. 3015, 3019 – 3021); T-V3-30's clause (l. 2520); J-V3.124 (l. 2725) |
| S23R5-04 | minor | BASE-F | **fixed** | item 238's M6-U content names `basementDoor(b)`'s crypt clause with its declared first reading and, S23R5-01 having landed, the stair-entered test and the whole basement (file f l. 150); item 578's note and label "its crypt clause with item 238 (M6-U)" (l. 160); J-RF6.4. Volume 4's U4 line still lists the derivation without them — the layers seam's hand-off, logged by the BASE-F lane at 14:03 (§5, *Outside this seam*) |
| S23R5-05 | minor | V01 | **fixed** (the annex case round 6 added to volume 3's §0 is not in it: S23R6-07) | §0: "entered at its foot by its own door — straight into the crypt, or into a cellar beside it and on into the crypt — drawn with the building" (V01 l. 231 – 232) |

**Totals.** 5 of 5 fixed; every one of round 5's issues is closed in its owner's text. S23R5-01's repair is sound where
round 5 aimed it — on the `full` and `half` rungs the annex temple's crypt is reached through one crypt join from the room
the annex's core or the trapdoor enters — but the whole basement it gives reaches the crypt ladder's `raised` rung, where
volume 2 lifts only the seed wings (S23R6-01, S23R6-02), and it exposed an older gap on the `half` rung (S23R6-03).

## 3 Sweep

### 3.1 What holds

**The stair-entered reading.** One definition (3.7.4), stated once and cited everywhere else (O2, 3.7.1, 3.7.5, 3.7.6,
3.9, 4.2, §1b, 2.1, 2.5, T-V3-23 (j)); read on the step-2 ring of the whole ground inset in both extents, so it is not
circular (J-V3.127 (b)); a wing edit, a designation mutation and a terrain change re-derive the basement (V02 §3.14.5 (c),
V03 2.5's `Basement.crypt` row), so a flip of the reading re-derives the extent in the causing event; the rank never moves
it. On the `full` rung the annex temple's crypt either grows under the annex (stair-entered: crypt-only, its crypt stairs
from the annex room over the vault, 3.7.6's third branch) or stays under tier 0 (the whole inset, the annex's core or the
trapdoor beside it, one crypt join); on the `half` rung the whole inset takes volume 2's general half raise ("the ground
wings standing over its ring", BCR-V2-28 (b)), tier 0 and the annex alike. BCR-V2-33's region ("the ground wings … for a
stepped building its tier 0, whatever storeys they reach") holds the solid tier 0, so the whole inset contains the seed.
**The closed vault.** The crypt stairs' feet, heads' bays and the core's bay are structural faces outside the forbidden
clause; the core's bay lies outside a stair-entered vault and never opens into it; a basement-class walk-out church's
street door opens into the cellar, whose tree the forbidden edges keep from the crypt and its undercroft; T28-2 holds on
every path traced (crypt and undercroft from the crypt stairs; cellar from the core or the outside door). **The entrance
storeys.** 3.6, 2.5, §1b, BCR-V3-26 and T-V3-30 name access, kind and floors alike; the storey step draws nothing, so
`siteplan.entrance`'s order (J-A29.61) is untouched; volume 1's reserve reads the entrance records and needs no text.
**File f.** Items 238 and 578 carry the crypt clause, its declared move and the stair-entered test at M6-U; item 313 names
V01 BCR-10's four parts as V01 l. 3419 – 3431 state them; item 585's note matches V03 2.4's first register line and
J-V3.123 (its SCC-106 order case is volume 3's and the content seam's). **Volume 1's round-6 text.** The stage-2 switch's
edit (V1-3.15) re-derives from S2 with §6.3's carry-over; buildings and plans follow by the base's machinery (S10 – S11
re-run, stored plans re-cut or stale by their digests, §7.3), and no V02 or V03 lifecycle row needs to name it; the
crossing-site row's new citation and the claim district's re-search (SLR5-03, -04) reach volume 2 only through
`DeckContext`, which is unchanged.

### 3.2 What breaks (each registered in §4)

1. **The whole basement on the `raised` rung.** 3.7.4 gives a crypt no stair reaches on a building with `ground(b)` the
   ground wings' whole inset on every rung of the crypt ladder. On the `raised` rung (a `damp` or `flood` plot, or a water
   table above a half floor) volume 2 lifts only the crypt's seed wings — BCR-V2-28: "a crypt storey whose floor lies at
   max(the lowest terrain sample under its ring, the water table + crypt.freeboardCm), under the crypt's seed wings lifted
   so their ground storey clears it by crypt.clearCm" (V02 l. 3912 – 3914, 3918); V2 §3.14.5 (d) (l. 2183 – 2185) — and
   inside a solid tier 0 at least `crypt.clearCm + 100 cm` high lifts nothing (l. 2186 – 2190; §3.15.3, l. 2380 – 2381). The
   whole inset's part under the storeyed annex, never a seed wing, lies at that floor under an unlifted ground storey: its
   storey −1 overlaps the annex's storey 0. The raised rung also bounds the crypt's growth to the seed wings (V03 l. 1836),
   so the crypt stays under tier 0 and every great temple with a storeyed annex on wet ground takes this path. Before round
   6 its crypt-only basement was coherent but unreached (S23R5-01); now it is reached but overlapping (S23R6-01, S23R6-02).
2. **The lift and the half raise read the seed wings, not the basement's ring.** Beyond (1), two older paths put a
   crypt-only basement under wings volume 2 neither raises nor lifts: an author's crypt ring on a building without a
   basement, "clipped to 3.7.4 step 1's region" — the whole ground inset (V03 4.2, l. 2158 – 2159; BCR-V3-20's
   requested-basement clause) — and an empty `cryptSeedWings(b)` (V2 §3.14.5 (c): "else none"), where volume 3 seeds the
   far third (V03 3.7.4 step 1, l. 1830 – 1831), so volume 2's lift and half raise name no wing at all (S23R6-02).
3. **The `half` rung's growth.** 3.7.4 step 2 grows a crypt short of `cryptM2` toward the main entrance, bounded to the
   seed wings in the `raised` form only (l. 1836); volume 2 raises a crypt-only `half` basement's seed wings alone
   (BCR-V2-28 (b), l. 3925 ff.; J-V2.91; T-V2-52; V2 §3.14.5 (d): "a raised choir over a half-sunk crypt"). A cathedral on a
   `low` plot whose chancel's inset is smaller than its `cryptM2` grows its crypt under the crossing or nave, whose storey 0
   stands at the datum over a storey −1 floored half a cellar depth below it: the crypt rises half its depth into the nave.
   Present since round 1 (S23-10), unregistered until this sweep traced the half rung for the whole inset (S23R6-03).
4. **3.7.6's first branches are not gated on the reading.** "The crypt stairs and choir flights are laid only from a nave
   piece on level 0 where `ground(b)` exists; where it exists but holds no nave, from the largest room on level 0 whose
   piece meets the crypt's nave-side edge, else — the crypt being stair-entered (3.7.4) — …" (l. 1886 – 1888): only the third
   branch carries the gate. An annex that only touches a crypt's nave-side edge — which J-V3.127 (a) reads as standing over
   none of it — takes the second branch for a crypt 3.7.4 enters from the basement: a flight whose storey-0 ring would lie
   in the solid tier above, and O2's crypt join besides (S23R6-04).
5. **Wording.** BCR-V3-20's whole-inset clause keys on "over none of the **crypt**" (l. 2956), where 3.7.4 keys on the
   **vault** (the step-2 ring), so a capped great temple whose storeyed wing stands over its capped bays alone reads
   stair-entered in the volume and not in the base text (S23R6-05). T-V3-23 (j) and §13's round-6 hand-off cite "volume 2's
   T-V2-45" for the annex temple's `Basement.access` ≠ `external`, which is T-V2-44's *Basement access* clause (V02 l. 3340 –
   3346) — round 5's mis-citation, copied (S23R6-06). Volume 1's §0 says only a great temple "built solid in tiers" is entered
   at its foot by its own door, with no word of the annex temple volume 3's §0 now enters from the annex (S23R6-07).
6. **File f follows volume 2.** Item 226's note quotes BCR-V2-28's clause "for a basement that is only a crypt, over the
   crypt's seed wings alone" (file f l. 126), which S23R6-02 rewrites (S23R6-08).

### 3.3 Wiring across the seam — the pieces changed since round 5

| piece | produced by | consumed by | status |
|---|---|---|---|
| the stair-entered reading of a crypt | V03 3.7.4 (derived, M6-U) from `ground(b)`, the storeyed ground wings' rings, the vault | the basement's extent (3.7.4, BCR-V3-20), O2, 3.7.5, 3.7.6, 3.9, 4.2, T-V3-23 (j); §1b and 2.5 rows; file f item 238 | wired in volume 3; volume 2's lift does not read the extent it chooses (S23R6-01, S23R6-02); 3.7.6's first branches ungated (S23R6-04) |
| the ground wings' whole inset of a crypt no stair reaches | V03 3.7.4, BCR-V3-20 (M6-U) | O2's crypt join, 3.7.1's core join, the half raise (V02 BCR-V2-28 (b), general rule), volume 1's reserve through `basementDoor(b)` | wired on `full` and `half`; on `raised` volume 2's lift misses the annex (S23R6-01) |
| O2's closed vault; 3.7.5's undercroft join | V03 O2, 3.7.5 (P2) | T28-2, T-V3-23 (j), 3.7.1, 3.7.6 | wired both ways |
| `Entrance.storey`'s widened trigger | V03 3.6, BCR-V3-26 (S11, M3a) | E1, O2, W2, volume 1's reserve; file f item 241 by reference | wired both ways |
| `basementDoor(b)`'s crypt clause at M6-U | V03 3.7.1; file f items 238, 578 | step 3, volume 1's reserve, T-V3-23 (j) | wired in volume 3 and file f; volume 4's U4 line outside this seam |
| the stage-2 switch's edit | V01 V1-3.15 (W17) | S2 onward by §6.3's carry-over; V04's tail | reaches V02 and V03 only through the base's re-derivation; no text needed |
| V01 BCR-10 in item 313; V03 BCR-V3-33 in item 585 | V01, V03 | file f | the texts agree |

**Checked and not registered.** (a) The entrance storeys' trigger names access, kind and floors, not `Basement.ring`: a
ring-only change moves a basement level under an entrance's wing only with the crypt-only ↔ whole-inset flip, which a
`setMassing` makes (its re-derivation re-derives the entrance set) or which changes the access; an entrance meeting a
basement level at all implies a walk-out, hence `external`. (b) O2 (ii)'s "or the core's bay" is reachable only where a
crypt is not stair-entered and is the core's bay's largest neighbour, and is then handled as written. (c) The half raise of
the whole inset over a solid tier 0 follows BCR-V2-28 (b)'s building datum pass for stacked wings; nothing new. (d) The
bound of S23R6-03 keeps T-V3-23 (b) true (every other crypt capped at `crypt.rankShare` × the principal's area), though
3.7.4 (3)'s "at generation the trim is a backstop" then holds less often; no bar moves. (e) Volume 3's hand-offs say
volume 2 needs nothing for S23R5-01; that holds on `full` and `half` and fails on `raised` (S23R6-01).

## 4 Issue register (round 6)

Counts: **8 issues — 0 blockers, 3 majors, 5 minors.** Owners: V03 2 majors, 3 minors; V02 1 major; V01 1 minor; BASE-F 1
minor. Line numbers are the live files' (§1's hashes). S23R6-01, -02 and -03 are best applied together (one rule for which
wings a crypt's basement raises or lifts); S23R6-08 follows S23R6-02's words.

| id | sev. | owner | kind | the claim in one line |
|---|---|---|---|---|
| S23R6-01 | major | V03 | contradiction (3.7.4 v. V02 BCR-V2-28, §3.14.5 (d)) | on the `raised` rung the whole inset of a crypt no stair reaches lies under a storeyed annex volume 2 never lifts: storey −1 overlaps its storey 0 |
| S23R6-02 | major | V02 | contradiction; unwired input (V03's extent) | the raised lift and the crypt-only half raise act on the seed wings, not on the wings over the basement's ring — missing the whole inset's annex, an author's ring and an empty seed list |
| S23R6-03 | major | V03 | contradiction (3.7.4 step 2 v. V02's half raise) | a crypt-only `half` basement grows beyond the seed wings volume 2 raises, into an unraised nave |
| S23R6-04 | minor | V03 | contradiction (3.7.6 v. 3.7.4) | 3.7.6's nave and edge branches lay crypt stairs without the stair-entered gate |
| S23R6-05 | minor | V03 | term (base request v. volume) | BCR-V3-20's whole-inset clause says "over none of the crypt" where 3.7.4 reads the vault |
| S23R6-06 | minor | V03 | wrong citation | T-V3-23 (j) and §13's hand-off cite T-V2-45 for T-V2-44's *Basement access* clause |
| S23R6-07 | minor | V01 | stale restatement | §0 has no word of the annex temple volume 3's §0 enters from the annex |
| S23R6-08 | minor | BASE-F | stale quotation | item 226's note quotes the crypt-only clause S23R6-02 rewrites |

### S23R6-01 — major — owner V03 — the whole basement on the raised rung

**Claim.** 3.7.4's `always` bullet gives a crypt that would not be stair-entered on a building with `ground(b)` "the
region whole (§2.6's inset of the ground wings, BCR-V2-33), the crypt inside it, `floors` 1" (V03 l. 1815 – 1822), on
whatever rung the no-refusal crypt ladder reaches. On the `raised` rung volume 2's text, which the base receives,
lifts the crypt's **seed wings** alone: BCR-V2-28's `kind` comment ("a crypt storey whose floor lies at max(the lowest
terrain sample under its ring, the water table + crypt.freeboardCm), under the crypt's seed wings lifted so their ground
storey clears it by crypt.clearCm", V02 l. 3912 – 3914) and its *Basements* sentence ("the lift is written by the
basement step as the seed wings' `Heights.baseCm`", l. 3917 – 3918); V2 §3.14.5 (d) (l. 2183 – 2185); and a solid tier 0
at least `crypt.clearCm + 100 cm` high holds the crypt "with no lift" (l. 2186 – 2190; §3.15.3, l. 2380 – 2381). The raised
rung also bounds the crypt's growth to "the seed wings volume 2 lifted" (V03 l. 1836), so the annex never stands over the
vault and the reading is always "not stair-entered". Every stepped great temple with a storeyed annex on a `damp` or
`flood` plot, or over a high water table, therefore takes a whole inset whose part under the annex lies at a floor at or
above the lowest terrain sample, under the annex's unlifted ground storey: storey −1 and storey 0 overlap by up to the
cellar depth. Volume 3's own hand-off (l. 3519 – 3523: "volume 2. Nothing required") holds on `full` and `half` only.
T-V3-23 (a) runs every `always` building on `damp` and `flood` plots, so the model-level bar meets the case.
**Required change (V03).** (a) 3.7.4's `always` bullet, after "— and O2's crypt join enters the crypt (seam S23R5-01;
J-V3.127)." add: "On the `raised` rung volume 2 lifts every ground wing over that whole inset, the storeyed wing with the
seed wings, so its ground storey clears the basement by `crypt.clearCm` as a raised choir clears its crypt and its core
reaches the basement beside the crypt; a solid tier 0 holding the crypt inside it keeps its height (V2 §3.14.5 (d) and
BCR-V2-28 as seam S23R6-02 words them; seam S23R6-01)." (b) §0, after "or straight down where the annex stands over it"
add "; on wet ground, where the crypt is raised, the annex stands raised over its cellar as a choir does over a raised
crypt". (c) §7's fixture "the same with a storeyed ground annex, with and without a requested basement" → "… with and
without a requested basement, and on a `flood` plot". (d) T-V3-23 (j)'s S23R5-01 clause adds: "and on a `flood` plot, the
same temple's basement is the ground wings' whole inset in the `raised` form, the annex's ground storey clearing it by
`crypt.clearCm` (volume 2's T-V2-36), its crypt reached through one crypt join (seam S23R6-01)". (e) §13's round-6
hand-off to volume 2 reads "S23R6-02: the raised lift acts on every ground wing over the whole inset" in place of "Nothing
required". (f) A J-V3 row (J-V3.128): "chose, for a crypt no stair reaches on the `raised` rung, the whole inset under every
ground wing lifted (volume 2's lift, seam S23R6-02) over (i) a crypt-only raised basement with a tomb door into the
platform's chamber, which amends BCR-V2-33's access rule, volume 2's 'never outside' (V2 §3.15.3, T-V2-44, J-V3.88) and
`basementDoor(b)`'s door point and rule 2 for one wet-ground case; (ii) refusing the whole inset on that rung, which
re-strands the crypt (seam S23R5-01); one rule on every rung, the whole inset reached through the annex's core, is the
simpler mechanism, and a hall raised over an undercroft on wet ground is a historical form (PLAUSIBLE, general
knowledge)". BCR-V3-20 needs no change for this issue: the lift is BCR-V2-28's.

### S23R6-02 — major — owner V02 — the lift and the half raise act on the wings over the basement's ring

**Claim.** Volume 2 keys the raised form's lift, and the half raise of a basement that is only a crypt, on
`cryptSeedWings(b)`: BCR-V2-28's comment and *Basements* sentence (V02 l. 3912 – 3918); its round-1 extension (a) "(for a
basement that is only a crypt, over the crypt's seed wings alone)", (b) "a basement that is only a crypt raises only the
crypt's seed wings, a raised choir over a half-sunk crypt" and (c) "which the crypt ring, the raised form's lift and the
half raise read" (l. 3925 ff.); V2 §3.14.5 (c) ("is called by §2.6's basement function (BCR-V3-20's crypt ring;
BCR-V2-28's lift and half raise)", l. 2172) and (d) ("its seed wings raised by `cellar.depthCm ÷ 2`", l. 2179 – 2180; "the
ground storey of the seed wings above it lifted", l. 2183 – 2184); §1b's rows (l. 270, 333) and the heights table's lift
row (l. 682); J-V2.91; T-V2-52 ("a crypt-only basement: `cryptSeedWings` alone"). Three basements volume 3 now derives lie
under other wings: (1) the whole inset of a crypt no stair reaches on the `raised` rung (S23R6-01), whose storeyed annex is
never a seed wing; (2) an author's crypt ring on a building without a basement, "clipped to 3.7.4 step 1's region" — the
whole ground inset (V03 4.2, l. 2155 – 2161; BCR-V3-20's requested-basement clause) — making a crypt-only `half` or
`raised` basement under any ground wing; (3) an empty seed list (V2 §3.14.5 (c): "else none"), where volume 3 seeds the far
third of the region (V03 3.7.4 step 1, l. 1830 – 1831) and volume 2's lift and half raise name no wing. In each, storey −1
rises into an unraised or unlifted storey 0. Volume 2 does not read volume 3's choice of extent at all.
**Required change (V02).** Key both on the basement's ring, the rule volume 2 already uses for every other half basement:
(a) BCR-V2-28's `kind` comment, "under the crypt's seed wings lifted so their ground storey clears it by crypt.clearCm" →
"under the ground wings over its ring lifted so their ground storey clears it by crypt.clearCm — for a basement that is
only a crypt the wings over the crypt's ring (its seed wings, under which volume V03 §3.7.4 keeps a derived raised crypt),
for the ground wings' whole inset that volume V03 §3.7.4 gives a crypt no stair reaches every ground wing over it; a solid
tier 0 that holds the crypt inside it keeps its height"; its *Basements* sentence, "the lift is written by the basement step
as the seed wings' `Heights.baseCm`" → "… as the `Heights.baseCm` of the ground wings over the basement's ring"; the round-1
extension (a), "(for a basement that is only a crypt, over the crypt's seed wings alone)" → delete (the ring rule covers
it); (b), "a basement that is only a crypt raises only the crypt's seed wings, a raised choir over a half-sunk crypt" → "a
basement that is only a crypt raises the wings over the crypt's ring — its seed wings where volume V03 §3.7.4 keeps a
derived half-sunk crypt under them, a raised choir over it"; (c), "which the crypt ring, the raised form's lift and the half
raise read" → "which the crypt ring reads (volume V03 §3.7.4), the lift and the half raise then acting on the wings over the
basement's ring". (b) V2 §3.14.5 (c): "(BCR-V3-20's crypt ring; BCR-V2-28's lift and half raise)" → "(BCR-V3-20's crypt
ring; BCR-V2-28's lift and half raise act on the wings over the basement's ring)"; (d): "its seed wings raised by
`cellar.depthCm ÷ 2`" → "the wings over it raised by `cellar.depthCm ÷ 2`"; "and the ground storey of the seed wings above
it lifted so that it clears the crypt by `crypt.clearCm`" → "and the ground storey of the ground wings over the basement's
ring lifted so that it clears the basement by `crypt.clearCm` (the seed wings over a crypt-only basement; every ground wing
over the ground wings' whole inset that volume 3 gives a crypt no stair reaches, V03 §3.7.4; seam S23R6-02)"; the
*Inside a solid platform* sentence, after "with no lift, so stair 0 and the stack keep their heights" add "— any other
ground wing over the basement's ring (a storeyed annex over a whole inset) lifted as above". (c) §3.15.3's "On wet ground a
**solid** tier 0 … holds its raised crypt **inside the platform**, with no lift" adds "(a storeyed annex over the ground
wings' whole inset lifted, V03 §3.7.4)". (d) §1b's rows (l. 270, 333), the heights table's lift row (l. 682: "the
ground-storey `baseCm` of the wings over the crypt seed" → "… of the ground wings over the basement's ring"; "a basement that
is only a crypt, `cryptSeedWings` alone" → "a basement that is only a crypt, the wings over the crypt's ring"), J-V2.91's
parenthesis and T-V2-52's parenthesis ("a crypt-only basement: the wings over the crypt's ring") follow; §1b's lift row
names volume 3's extent (the stair-entered reading, V03 §3.7.4) among its inputs. (e) T-V2-36 adds: "a stepped great
temple with a storeyed ground annex on a `flood` plot takes the ground wings' whole inset in the `raised` form (V03
§3.7.4): the annex's ground storey clears it by `crypt.clearCm`, tier 0 inside or lifted as above, the annex's core reaching
the basement; an author's crypt ring under a nave on a `low` plot raises the nave (seam S23R6-02)". (f) A J-V2 row: "chose
to key the raised lift and the crypt-only half raise on the ground wings over the basement's ring, over the seed wings,
because volume 3 derives basements under other wings (the whole inset of a crypt no stair reaches, an author's ring, the
far-third seed); a derived crypt stays under its seed wings on those rungs (V03 §3.7.4, seam S23R6-03), so the raised choir
over a half-sunk crypt of J-V2.91 is unchanged". File f item 226 carries BCR-V2-28 by reference (its note's quotation:
S23R6-08). **Declared shift:** none — the crypt parts are M6-U's, unbuilt.

### S23R6-03 — major — owner V03 — the half rung's growth bound

**Claim.** 3.7.4 step 2 grows a crypt short of its `cryptM2` target toward the main entrance "never beyond the region — in
the `raised` form never beyond the seed wings volume 2 lifted —" (V03 l. 1835 – 1837). The `half` rung has no bound, while
volume 2 raises a crypt-only half basement's seed wings alone and calls the result "a raised choir over a half-sunk crypt"
(BCR-V2-28 (b); V2 §3.14.5 (d), l. 2178 – 2181; J-V2.91; T-V2-52's fixture "a church whose basement is only its crypt"). A
cathedral on a `low` plot whose chancel's inset is smaller than its `cryptM2` grows its crypt-only half basement under the
crossing or the nave, whose storey 0 stands at the datum over a storey −1 floored half a cellar depth below it: the crypt
rises half its depth into the nave, and the choir flights (3.7.6 (c)) meet a crypt under their nave. The raised bound also
reads "the seed wings volume 2 lifted", which names no wing inside a solid platform (no lift) or with an empty seed list.
Present since round 1 (S23-10); no earlier round traced it.
**Required change (V03).** (a) Step 2's "— in the `raised` form never beyond the seed wings volume 2 lifted —" → "— on the
crypt ladder's `half` and `raised` rungs never beyond the ground wings its step-1 seed lies under (volume 2's
`cryptSeedWings(b)`, else the ground wings over the far third), which volume 2 raises or lifts over it, or the solid tier 0
that holds it (V2 §3.14.5 (d); BCR-V2-28), so a half-sunk or raised crypt stays under its raised choir (seam S23R6-03) —";
a crypt so bounded below `T` is reported short as a region smaller than `T` is. An author's ring (4.2) keeps no bound:
volume 2 then raises or lifts the wings over it (seam S23R6-02). (b) T-V3-23 (i) adds: "on the `half` and `raised` rungs
the derived crypt ring lies under those wings alone — on a cathedral fixture on a `low` plot whose chancel's inset is below
its `cryptM2`, the crypt is reported short and lies under no nave (seam S23R6-03)". (c) 3.7.4 (3)'s "so at generation the
trim is a backstop" → "so at generation the trim is a backstop, save where the `half` or `raised` bound leaves the
principal short". (d) A J-V3 row (J-V3.129): "chose to bound a derived crypt's growth on the `half` rung as on the `raised`
rung — under the wings volume 2 raises over it — over letting it grow and raising every wing it reaches (volume 2's ring
rule alone), because volume 2's form is a raised choir over a half-sunk crypt (J-V2.91) and raising a nave with its choir
drops the choir flights; a short principal still out-ranks every other crypt by the cap". Volume 2 needs nothing beyond
S23R6-02.

### S23R6-04 — minor — owner V03 — 3.7.6's branches not gated on the reading

**Claim.** 3.7.6's *Where they start* (V03 l. 1886 – 1894) chains four branches; only the third carries the gate ("else —
the crypt being stair-entered (3.7.4) —"). The first two — "from a nave piece on level 0 where `ground(b)` exists; where it
exists but holds no nave, from the largest room on level 0 whose piece meets the crypt's nave-side edge" — also fire for a
crypt 3.7.4 enters from the basement: an annex that only touches the crypt's nave-side edge stands over none of the vault
(J-V3.127 (a)) yet "meets" it, so (a)'s flight is laid with its bay inside the crypt and its storey-0 ring in the solid tier
above, where (a) has no piece to put it and O2 adds the crypt join besides. 3.9's rows (l. 1972 – 1973) and 3.7.6's last
bullet already read the gate.
**Required change (V03).** 3.7.6, *Where they start*: "The crypt stairs and choir flights are laid only from a nave piece
on level 0 where `ground(b)` exists; where it exists but holds no nave, from the largest room on level 0 whose piece meets
the crypt's nave-side edge, else — the crypt being stair-entered (3.7.4) — from the largest room of level 0 standing over
part of its vault" → "Crypt stairs are laid only to a stair-entered crypt (3.7.4); they and the choir flights are laid
only from a nave piece on level 0; where `ground(b)` holds no nave, the crypt stairs from the largest room on level 0 whose
piece stands over part of the crypt's ring along its nave-side edge, else from the largest room of level 0 standing over
part of its vault (seam S23R6-04)"; the rest of the bullet unchanged.

### S23R6-05 — minor — owner V03 — BCR-V3-20 reads the crypt where the volume reads the vault

**Claim.** BCR-V3-20's New text: "a crypt-only basement where its ordinary draw gives none — the ground wings' whole inset
instead where a storeyed ground wing stands but over none of the crypt (volume V03 §3.7.4)" (V03 l. 2955 – 2957). 3.7.4
reads the **vault** — the step-2 ring, the rank's trim aside (l. 1854 – 1857; J-V3.127: "the vault, not the trimmed ring,
so the reading never flips on a rank event"). An `always` crypt the rank caps (a great temple in a city with a cathedral)
whose storeyed wing stands over its capped bays only is stair-entered by the volume and "over none of the crypt" by the
base text. The words are round 5's required text (S23R5-01 (b)), applied verbatim.
**Required change (V03).** In BCR-V3-20's New text, "stands but over none of the crypt (volume V03 §3.7.4)" → "stands but
over none of the crypt's vault — its ring before the rank's trim, or the author's ring (volume V03 §3.7.4)"; the
requested-basement clause's "over none of that ring" stands (an author's ring is its own vault). File f item 238 carries
the text by reference; its label is unchanged.

### S23R6-06 — minor — owner V03 — T-V2-45 for T-V2-44

**Claim.** T-V3-23 (j)'s S23R5-01 clause cites "with a requested basement (`Basement.access` ≠ `external`, volume 2's
T-V2-45)" (V03 l. 2513), and §13's round-6 hand-off reads "volume 2. Nothing required: T-V2-45's requested basement
(`Basement.access` ≠ `external`) holds" (l. 3519). The clause is T-V2-44's *Basement access* ("on the stepped temple with
a storeyed ground annex, given a requested basement, `Basement.access` ≠ `external`", V02 l. 3340 – 3346); T-V2-45 is the
stairs and the entrance. Round 5 made the mis-citation (S23R5-01's claim, "volume 2's T-V2-45 annex temple (V02 l. 3341 –
3343)"); volume 3 copied it.
**Required change (V03).** Both texts: "T-V2-45" → "T-V2-44 (its *Basement access* clause)".

### S23R6-07 — minor — owner V01 — the annex temple in §0

**Claim.** V01's §0 says churches and the cathedral are entered from inside, and "only a great temple built solid in tiers
is entered at its foot by its own door — straight into the crypt, or into a cellar beside it and on into the crypt" (V01
l. 230 – 232). Volume 3's §0 now adds the annex temple — "where a storeyed annex stands beside the platform, the crypt is
reached from the annex instead" (V03 l. 153 – 154) — whose platform is also built solid in tiers, so volume 1's "only" sends
the owner to a door the annex temple does not have.
**Required change (V01).** §0: "… on into the crypt — drawn with the building." → "… on into the crypt — drawn with the
building; where a storeyed annex stands beside the platform, the crypt is reached from inside the annex instead (seam
S23R6-07)." No other volume 1 text restates the temple's entry.

### S23R6-08 — minor — owner BASE-F — item 226's quotation

**Claim.** Item 226's note quotes BCR-V2-28's round-1 extension: "the clause "for a basement that is only a crypt, over
the crypt's seed wings alone" is inert until M6-U, as item 238's fields are absent before it" (file f l. 126). S23R6-02
deletes that clause and rewrites (b)'s crypt-only sentence.
**Required change (BASE-F), once S23R6-02 has landed.** Item 226's note: "the clause "for a basement that is only a crypt,
over the crypt's seed wings alone" is inert until M6-U" → "the crypt-only sentence of (b) ("a basement that is only a crypt
raises the wings over the crypt's ring …") and the raised lift's reading of volume 3's whole inset are inert until M6-U
(seam S23R6-02)", in volume 2's landed words; its label unchanged. Item 238's M6-U content ("volume 2 §3.14.5's crypt
ladder and lift") needs no change.

## 5 Summary by owner, decisions, CONFIRMED versus PLAUSIBLE

**By owner.** V03: S23R6-01 (major), S23R6-03 (major), S23R6-04, -05, -06 (minors). V02: S23R6-02 (major). V01: S23R6-07
(minor). BASE-F: S23R6-08 (minor). **Order for the lanes:** S23R6-01, -02 and -03 state one rule from both ends — volume 2
raises or lifts the ground wings over the basement's ring, and volume 3 keeps a derived crypt on the `half` and `raised`
rungs under its seed and gives a crypt no stair reaches the whole inset on every rung — so volume 3's and volume 2's lanes
may land in either order, each citing the other's section; S23R6-08 takes volume 2's landed words; S23R6-04 – 07 stand
alone. The next round of this seam re-checks all eight.

**Decisions (vetoable).**

| id | decision |
|---|---|
| J-S23R6.1 | Chose to sweep by **full diff since round 5's inputs** (624 lines, snapshots hash-checked), tracing every changed mechanism into untouched text at both ends of the seam and the base, with the three censuses, and to read the round-6 diffs of volumes 4 – 12 (3 290 lines) for every line citing volumes 1 – 3 and for the seam's shared terms — over re-reading 1.7 MB whole, because every earlier text has been read whole (rounds 0 – 1) or by full diff (rounds 2 – 5), and repairs elsewhere reach this seam only through citations and shared mechanisms. The trace found S23R6-01 – 04 by following round 6's whole basement down each rung of the crypt ladder into volume 2's lift and half raise; S23R6-03 is older than the round and was found on that path. |
| J-S23R6.2 | Chose, for S23R6-01 and -02, **one ring rule on every rung** — volume 2 lifts or raises the ground wings over the basement's ring, so the whole inset's storeyed annex rises over the raised basement and its core reaches the crypt join — over (i) a crypt-only raised basement entered by a tomb door into the platform's chamber, which amends BCR-V2-33's access rule (base, M3a), volume 2's "never outside" (V2 §3.15.3, T-V2-44, J-V3.88) and `basementDoor(b)`'s door point and rule 2 for one wet-ground case; (ii) refusing the whole inset on the raised rung, which re-strands the crypt (S23R5-01). The ring rule also closes two older gaps on the same text (an author's crypt ring, an empty seed list), stays inside M6-U's content (file f items 226, 238), and moves no shipped output. Both alternatives are defensible under the realism tiebreaker (a hall raised over an undercroft on wet ground; a chamber door in a platform's face); the chosen one is the smaller mechanism. |
| J-S23R6.3 | Chose, for S23R6-03, **to bound a derived crypt's growth on the `half` rung** as volume 3 already does on the `raised` rung, over letting volume 2's ring rule raise every wing the crypt grows under, because volume 2's stated form is a raised choir over a half-sunk crypt (J-V2.91, V2 §3.14.5 (d)) and raising the nave with the choir drops the choir flights (3.7.6 (c)); an author's ring stays unbounded, the ring rule raising what it lies under. |
| J-S23R6.4 | Accepted volume 3's **widened citation** for S23R5-02 (c) over the swap round 5 required: 2.1's list of derived pieces states the capped bays (V03 l. 530 – 531), and round 5 read only l. 500 – 505. Round 5's premise was wrong; the issue is closed as volume 3 applied it. |
| J-S23R6.5 | Graded **S23R6-01 – 03 major**: each is a geometric contradiction between texts a builder implements on both sides of the seam (storey −1 overlapping storey 0), reachable at generation — S23R6-01 on every great temple with a storeyed annex on wet ground, which T-V3-23 (a)'s `damp` and `flood` runs meet; S23R6-02 on the same and on an author's ring; S23R6-03 on a cathedral on a `low` plot whose chancel is smaller than its crypt target. Graded **S23R6-04 – 08 minor**: an ungated branch whose fallback still reaches the crypt through O2's join; a base-text term that differs from the volume only for a capped `always` crypt; a wrong test id; a plain-words sentence; a note quoting a clause another issue rewrites. |

**CONFIRMED versus PLAUSIBLE.** CONFIRMED by reading the live text at the lines cited, with the input hashes unchanged from
start to end (V01 85b488b3…, V02 65e5ea63…, V03 eb01b7dc…, file f 839ccce5…, `_integrate.md` 965ab696…, base 01fea21f…):
every status of §2; every line of §1's four diffs; every claim of S23R6-01 – 08 at both ends (V03's §0, 2.1's derived
pieces, 2.5, §1b, 3.1 step 2, S6, 3.6, O2, 3.7.1, 3.7.2 (6), 3.7.4 – 3.7.7, 3.9, 4.2, §7, T-V3-23, T-V3-30, §8's P1 and P2,
J-V3.123 – 127, BCR-V3-20, -26, §13's round-6 hand-offs; V02's §1b rows, the heights table's lift row, §3.14.5 (a) – (e),
§3.15.3's *Crypts and basements*, B-MASS's fixture list, T-V2-36, T-V2-44, T-V2-45, T-V2-52, T-V2-53, J-V2.91, J-V2.92,
BCR-V2-28 with its round-1 extension, BCR-V2-33; V01's §0, BCR-10, V1-3.15, V1-2.7's rows, note (39); file f items 202,
226, 238, 241, 242, 313, 317, 371, 436, 516, 578, 585). CONFIRMED by executed script: the three censuses (0 dangling; 663
+ 195 occurrences into the seam, its 8 hits the known `T-V2-31` row-pattern miss), the diffs of volumes 4 – 12 and the md5
checks. PLAUSIBLE: how often each broken path occurs — S23R6-01 needs an `always` great temple with a storeyed annex on wet
ground, S23R6-03 a chancel inset smaller than the cathedral's `cryptM2` at its band (the rule text has no route either way,
so each is registered); that the required texts leave every bar they touch passing, until their owners apply them and the
next round re-checks. Nothing was executed beyond `diff`, `grep`, `md5`, `sed` and the census scripts: this lane writes a
critique.

**Outside this seam.** (1) Volume 1's cross-volume note (39) says volume 4's §4.3 switch row names a change "across 0";
volume 4's round-6 lane widened the row to "across 0, or inside (0, 1]" (V04's round-6 diff), so the note is stale — the
layers seam's (V01 against V04). (2) Volume 4's U4 line still lists the crypt derivation without `basementDoor(b)`'s crypt
clause and the stair-entered test that file f item 238 now names — logged by reconcile-BASE-F-r6 (14:03) for volume 4's
next lane or the layers seam; S23R6-02's ring rule is inside item 238's "volume 2 §3.14.5's crypt ladder and lift" and adds
nothing to it. (3) Volume 12's round-6 hand-offs to volume 2 (§3.10.10's crypt line as one staged entry, its steps as
`V4-U3b` and `V4-U5`) and to volume 3 (§2.4's hand tuning at `V3-P6` under V12 §3.11's moved-value paragraph; the rows-added
cells row) and file f item 585's note, which omits volume 3's SCC-106 order case, are the content-calibration seam's.
