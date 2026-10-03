# Verify — volumes V03 and V04 after repair round 3 (coherence pass, round 3)

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-vol-V03-V04-r3t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V03-V04-r3t`, 2026-10-01, cloud checkout; scratch `scratchpad/coherence/v34r3/`)
- P0 brief read whole; resume check (no output, no LANDED line): fresh start — done
- P1 inputs: round-2 findings (16), adjudication-r3 (R3-01 – R3-27; Part H for V03, V04, V09, V12, determinism; END lines), assemble-r3 (V03 b015fd00… → f4458cf4…, V04 2786cc53… → 0e3bcacd…), repair-r3-V03 and repair-r3-V04 (dispositions, END lines, HAND-OFFS); diffs against HEAD 920d280d built (V03 20 hunks, V04 22) — done
- P2 re-check of the sixteen VV34-r2 findings and their second ends — done
- P3 the round-3 blocks of V03 and V04 read whole, subsection by subsection; the other issues the repairs claim (VAF-R2T-03, VAP-r2-03, VAP-r2-13, VEW-r2-04, VKr2-09) and the END lines (R3-04, R3-08 (b) and (c), R3-10, R3-23 (d)) — done
- P4 references, ids, terms, deferral, phone, review ids, §8 ↔ §16 ↔ INDEX, doc_checks (provisional) — done
- P5 report, result file, LANDED — done

## Summary

Live text read: V03 `f4458cf4…` (464 396 bytes), V04 `0e3bcacd…` (520 064 bytes), base at HEAD (assemble-r3's install).
**All sixteen round-2 findings are FIXED as ruled** (VV34-r2-01 – VV34-r2-16: V04 7, V03 5, V09 2, V12 1, determinism 1),
and every END line this scope writes is in the text. Two of the fixes left their second end unwritten — V03's own
HAND-OFFS name them (rendering §8.6 and V09 §4.21.13 (1)) — and one ruled mechanism does not reach the case its blocker
named. **6 issues: 1 blocker, 2 major, 3 minor.**

| id | grade | owner | in one line |
|---|---|---|---|
| VV34-r3-01 | **blocker** | V06 (end at V03, model) | a restoring event's re-cut mints elements whose `decayPeak` is read from that event's week, when the level is still the run's — drawn damaged, then patched — against T-V3-39 (c), T-V6-76 (b) and §3.21's row |
| VV34-r3-02 | major | rendering | §8.6's floor-area row picks the form by position ("above ground level, a hole"); V03 §5.1 by kind — a solid wing's first storey a hole by one, a walkable patch by the other |
| VV34-r3-03 | major | V09 | V09 §4.21.13 (1) counts `storeyGone` over "every floor area"; V03 §4.5 and §4.6 over every `upperFloor` area — a walkable ground storey "gone" by one |
| VV34-r3-04 | minor | scope | §16's M6-U row lands the damage below ground "at U5"; V04 §5.6 (6), §8 and J-V4.130 at the later of U5 and V03's P4 |
| VV34-r3-05 | minor | V03 | V03 §7's damage fixtures stage "a disaster `ConditionOverlay`", not R3-09 (e)'s fixture calamity with its linked `reconstruction` condition |
| VV34-r3-06 | minor | V03 | `PlanDamage.own`'s comment gives 0 "for a standing building outside a run", but a reoccupied building under its `repair` Works is standing, outside its run, at `L × (1 − f)` |

Not raised (concurred or ruled): the hand-over wording "hand-over" in V03 §3.13 matches the retired-term pattern G-unitinput
but names item 122 (a)'s hand-over (V06 §3.22 (3)), not the retired unit-run view — no TERM; V04 §5.6 (2)'s crypt-vault key
reads V03 §3.7.5's "centred on that OBB" as a grid node at the centre — the reading the text supports, no finding.

## 1. The round-2 findings, re-checked against the live text

| id | owner | Part H | verdict | where (live) |
|---|---|---|---|---|
| VV34-r2-01 | V04 | FIX | **FIXED** — §5.6 (1) carries the two sentences (a storey below 0 at `PlanDamage.level`, thresholds unchanged, no patch, scene walls/portals/lights at the own level; an underground building in no look's unit, V01 §3.16 (1) confirms ground part 0's districts and V07's ends); §1.2's hook row (l. 152); UE33's E7 carries the case (no E9 class exists — a stated departure, content complete); T-V4-82 (i) on a fixture calamity with its linked `reconstruction` condition (R3-09 (e)), the hand-over by `crisisLookYields` once E2 lands; J-V4.130 | V04 l. 152, 2883–2889, 2423, 3144, 3398 |
| VV34-r2-02 | V04 | FIX | **FIXED** — §5.6 (2) drops the access head and states "an access head is no element (V03 §5.6 (1))"; (3) and UC21 read the required texts | V04 l. 2903–2905, 2912–2915, 2450 |
| VV34-r2-03 | V04 | FIX (graded major) | **FIXED** — the `cryptVault` key: (room address, (i, j)), the cell's least-coordinate corner node in whole pitches from the node at the OBB's centre; the cell-less crypt's one vault by its room's address; `cellarVault` by the room's address | V04 l. 2898–2900 |
| VV34-r2-04 | V04 | FIX per R3-04 | **FIXED** — T-V4-82 (b) "damaged exactly while the level is above 0 and at least its threshold (§6.3 *Plan damage*'s comparison)" | V04 l. 3144 |
| VV34-r2-05 | V04 | FIX per R3-26 | **FIXED** — T-V4-82 (g) in the registration form, U5 seat; V12 §2.13's `item123.damage` row and §3.7.8 list name it | V04 l. 3144; V12 l. 933, 1711 |
| VV34-r2-06 | V04 | FIX | **FIXED** at V04 (§5.6 (6), §8's U5 content and exit cells, J-V4.130); §16's row not echoed — VV34-r3-04 (minor, scope; V04's own HAND-OFF) | V04 l. 2938–2944, 3179, 3398 |
| VV34-r2-07 | V04 | FIX | **FIXED** — §12 "file g's items are read whole …", no upper number | V04 l. 3479–3481 |
| VV34-r2-08 | V03 | FIX | **FIXED** — `roofBay` only at or above level 0, a room below 0 ceiled by V04's vault kinds; J-V3.136; §3.13's edge "a crypt under solid tiers or under a stack with no storeyed wing"; T-V3-39 (d) the stepped temple's crypt (the `flat`-top one's included) intact through `decayed`, under no roof bay | V03 l. 2662, 2094, 2898, 3123 |
| VV34-r2-09 | V03 | FIX | **FIXED** — §3.13's look row adds migrate and the pre-item-122 document; T-V3-40 (c) the undo, redo and migration; T-V3-39 (h) the lifecycle at 0, ½, 1 measured by V12's `damage.breakLevel` (T-V12-56, which V12 l. 1211 runs on V03 §7's fixtures across the same five steps); the row's test cell "T-V3-39, its (h) for the lifecycle; T-V12-56" (a stated departure keeping the other edges' bar — accepted) | V03 l. 2094–2095, 2898–2899 |
| VV34-r2-10 | V03 | FIX (graded major) | **FIXED** in V03 (§4.5, §3.13); the second end V03's §13 row names — V09 §4.21.13 (1) — is unwritten: VV34-r3-03 | V03 l. 2294, 2094, 3250 |
| VV34-r2-11 | V03 | FIX (graded major) | **FIXED** in V03 (§5.1 by kind; the `ruined` look's solid-wing storey; T-V3-39 (d) the shrine's floor a rotten patch); the second end V03's §13 row names — §8.6 — is unwritten: VV34-r3-02 | V03 l. 2458–2466, 2898, 3249 |
| VV34-r2-12 | V03 | FIX per R3-26 | **FIXED** — T-V3-39 (g) and T-V3-40 (f) in the registration form (P4 seat); V12 §2.13's rows, §3.7.8 and X-V12-11 list both | V03 l. 2898–2899; V12 l. 932–933, 1711, 3412 |
| VV34-r2-13 | V09 | FIX per R3-16 (c) | **FIXED** — §4.21.13 (3): the plan panel shows the look's lines under `info.crisis.ruinedFor`, the why card's `plan` section the own level's rows; wiring rows l. 378 and l. 1008 "for the plan panel only"; T-V9-86 the same | V09 l. 378, 1008, 3668–3672, 4369 |
| VV34-r2-14 | V09 | FIX (graded major) | **FIXED** — §4.9's row by V03 §4.6's mapping, `floor` "Floors rotten or fallen through in {rooms}"; T-V9-15 "every `DamageElementKind` of V11 §2.8d reaches an `info.damage.<kind>` row by V03 §4.6's mapping" | V09 l. 2187, 4299 |
| VV34-r2-15 | V12 | FIX per R3-26 | **FIXED** — V12 §3.15.13 "on the **damage fixtures** (V03 §7)"; §2.13's rows, §3.7.8 and X-V12-11 add T-V3-39 (g) and T-V3-40 (f); the `damage.*` row reads V03 §7's fixtures | V12 l. 197, 932–933, 1211, 1711, 2739–2750, 3412 |
| VV34-r2-16 | determinism | FIX (graded major) | **FIXED** — §6.3 *Plan damage* keys a floor area, a roof bay, a choir flight and a `cellarVault` by their room's address, a `cryptVault` cell by the room's address and its grid node, the cell-less crypt's one by the address (V04 §5.6 (2)) | base l. 9862–9864 |

## 2. END lines of this scope and the other repaired issues

| line / issue | verdict |
|---|---|
| END of R3-04 at V04 §5.6's lead | **written** — "damaged while the decay level is above 0 and at least the element's keyed threshold (§6.3 *Plan damage*'s comparison; §2.6 step 7 …)", and "past its threshold" defined for the rest of the section; no "≥ t", "reaches … the one comparison" or "at or above its threshold" left in V03 or V04 (V03 §5.6 (2) (a) states the sentence verbatim) |
| END of VAL-R2-01 (R3-23 (d)) at V04 §5.1 | **written** — "While the underground layer is drawn (`cutaway`, `overlay` or `solo`) the weather effects draw nothing over the view (§8.8)"; §8.8's sentence (base l. 14233) is the home |
| END of VV56-r2-06 (R3-08 (b)) at V03 §5.6 (2) (b) | **written as ruled** (entry week passed to `decayPeak(doc, lineage, week, since)`; §1b, §2.5, §3.13, T-V3-39 (c), §13) — but the ruled entry week leaves the restoring event's own re-cut drawn damaged then patched: VV34-r3-01 |
| END of VAT2-r2-09 (R3-10) at V03 §5.6 (4) | **written** — "a preview never hands over, V06 §3.22 (3)"; §3.13's edge and T-V3-40 (b) carry it; V06 l. 3317 and l. 3365 (`overlay: Id \| null`, false for a preview) agree |
| END of R3-08 (c) at V03 §4.6 | **written** — `restored` for a standing building restored with patches; V09 §4.9 `head.restored` "In use again{, years}" and §4.21.13 (1) agree |
| VAF-R2T-03 (V03, per R3-05) | **FIXED** — §5.6 (2) (c) scoped by the state "`decayed` or `ruined` (however V06 §3.23 reads its level …)", "§2.6 step 7's one case without a threshold"; base §2.6 step 7 (l. 2088–2095) and §8.6 (l. 13951–13952) agree; §3.13's edge, §7's ashlar `decayed` fixture, T-V3-39 (b) |
| VAP-r2-03 (V03, per R3-26) | **FIXED** — T-V3-37's head takes T119-2 – T119-5's plan clauses; T-V3-40's head adds T122-7's; §13.2's take-over table (base l. 18472) and the runs lists (l. 18364, 18415, 18430) carry the same ids |
| VAP-r2-13 (V04) | **FIXED** — J-V4.114 at 28.5–39.5 pw, U5 at 3.25–4.5 pw, item 123's 0.25 pw named; equal to V04 §8, §16 (l. 19996) and INDEX (l. 27) |
| VEW-r2-04 (V04) | **FIXED** — §3.2 N2's field outfall follows its D8 path over land only, a cell whose path enters water first passed over, the bank unsewered where every path does; §3.11's ladder row, UC19, T-V4-2, T-V4-80 (j) and J-V4.129; II.7.2 (base l. 20885–20891) agrees. The terrain's priority-flood conditioning (base l. 1020, 5067–5072) ends every D8 path at the frame or in water, so the two outcomes are exhaustive |
| VKr2-09 (V04) | **FIXED** — `cellarWall`'s rock side and §1b.1's read map name `corridorUnion`'s bands (base l. 3966) and add a chamber's floor (a stated, reasoned addition: the side facing an open chamber is no rock) |

## 3. The round-3 blocks, read whole

V03: §1b and §2.5's `planDamage` rows (entry week, existence, roof kinds); §3.13's damage-layer and look rows — their
twenty and eleven edges each aligned one-to-one with their outcomes; §4.5's switcher; §4.6's damage rows; §5.1 *The plan
in ruin*; §5.6 (1)–(8) whole; §7's damage fixtures, T-V3-37, T-V3-39 (a)–(h), T-V3-40 (a)–(f); J-V3.136; §13's rows.
V04: §1.2; §1b.1; §3.2 N2; §3.11's ladder, UE33, UC19, UC21; §5.1; §5.6 (lead, (1)–(6)); T-V4-2, T-V4-80, T-V4-82 (a)–(i);
§8's U5 row; J-V4.114, J-V4.129, J-V4.130; §12. The seams read with them: base §2.6 step 7, §6.3 *Plan damage*, §8.6,
§8.8, II.7.2, §13.2, §16's M6-P and M6-U rows; V01 §3.16 (1); V02 §5.7 and X36; V06 §3.21's decay row, §3.22 (3),
§3.23 (1)–(4), W94, T-V6-76; V09 §4.9, §4.21.13, T-V9-15, T-V9-86; V10 §3.9a; V11 §3.25.9; V12 §2.13, §3.7.8, §3.15.13,
T-V12-56, X-V12-11. New problems: VV34-r3-01 – VV34-r3-06 below.

## 4. Issues

### VV34-r3-01 — blocker — NEW-PROBLEM — owner V06 (ends at V03 and model)

**Claim.** R3-08 (b) keeps VV56-r2-06 a blocker because "every restoration that re-cuts … would draw new elements as
patched repairs they never had", and the claim's first case is "the restoring event itself re-cuts a stored plan for its
new occupants". The ruled mechanism reads each element's peak from its entry week — for an element a re-cut mints, "a
restoring event's included", **that change's effective week** (V06 §3.23 (3), l. 3409–3412; the `since` of `decayPeak`,
l. 3382; V03 §5.6 (2) (b), l. 2697–2701). But at the restoring event's week the level is still the run's: a `reoccupy`
with its `repair` Works reads `L × (1 − f(w))` from the Works' start, `L` the level the week before (V06 §3.23 (3)), and
the run's own level before it. So an element that re-cut mints — a new occupant's partition, door or furniture piece —
is (a) **drawn damaged** from its first week, its threshold at or below the level (a `decayed` building's level lies in
[1/3, 2/3], V11's partition range 0.36–0.66), and (b) drawn **repaired in patch material** once the Works lowers the
level past it, because its peak since entry is `L` — and so for ever, until a rebuild. Only a restoration with no Works
(level 0 from its effective week) escapes. V06 §3.23 (3)'s own words are careful — "an element added **after** its
building's damage left is never drawn repaired" — but the set's bars and edge rows assert the restoring re-cut's case:
T-V6-76 (b) "a `reoccupy` from derelict with a re-cut …: 0 added elements drawn repaired" (l. 4143), V06 §3.21's decay
row "a restored building re-cut or extended → the added elements drawn as built" (l. 3274), V03 §3.13's damage-layer row
"an element a restoring re-cut … adds → drawn as built, never repaired" (l. 2094) and T-V3-39 (c) "an element a restoring
re-cut … adds is drawn as built, never patched" (l. 2898). The formula yields the wrong result on the common path
(works on by default), and the bars cannot pass on it; a builder has to invent the missing rule.

**Required change.** V06 §3.23 (3) (the home), after "… or a wing an `extend` adds at that change's effective week":
"— save that an element a restoring event's re-cut mints (V03 §3.11: the new occupants' rooms) enters the plan, for its
damage, at the week that restoration ends — its `repair` Works' FINISHED week, or the week a decay run that interrupts it
begins; with no Works, the event's effective week — and is drawn as built before that week: no level the restoration
lowers damages it or is its peak, so a restoration's new elements are neither damaged nor repaired, and a kept element
keeps its peak"; the `since` comment of `decayPeak` (l. 3382) adds "for an element a restoring re-cut mints, the week
that restoration ends"; §3.21's decay row reads "the added elements drawn as built through the restoration and after it,
the kept ones patched"; T-V6-76 (b) adds "under a `repair` Works, every element the reoccupy's re-cut mints drawn as
built in every week of the Works". The ends: V03 §5.6 (2) (a) adds "an element is compared with the level only from its
entry week ((b); V06 §3.23 (3))", and (b)'s "that change's effective week (V06 §2.11)" reads "that change's effective
week (V06 §2.11) — for a restoring event's re-cut, the week that restoration ends (V06 §3.23 (3))"; V03 §1b's and §2.5's
`planDamage` input cells the same; model §2.6 step 7's "an element that entered the plan after its damage left never
drawn repaired" adds "nor one a restoring re-cut minted (V06 §3.23 (3))".

### VV34-r3-02 — major — CONFLICT — owner rendering

**Claim.** VV34-r2-11's fix makes V03 §5.1 (l. 2458–2460) pick a damaged floor's form by its kind: "a damaged
`groundFloor` element takes §8.6's ground-level form (a rotten patch, still walkable) at whatever level it lies, a solid
wing's first storey included, and a damaged `upperFloor` element §8.6's hole", and its `ruined` look keeps "a solid wing's
first storey" walkable (l. 2465). §8.6, the home of the damaged forms, still picks by position: "floor area | on any
storey above ground level, a hole … the storey below seen through it; at ground level and under it, a rotten patch"
(l. 13964), and "leaving the ground storey the only one that can be walked" (l. 13975). The first storey of a wing on a
solid wing (V03 §3.3's `s₀(w)` ≥ 1: item 110's shrines and tiers) is above ground level: a hole onto solid fill by §8.6,
a walkable patch by V03 and T-V3-39 (d). V03's §13 row (l. 3249) names §8.6 as the other end; it was not written (no END
line named it; V03's HAND-OFFS).

**Required change.** §8.6's floor-area row: "floor area | an `upperFloor` element (V03 §5.6 (1)): a hole: the area filled
in `void` under a dense `ink` cross-hatch at α 0.4 (the drop), its edge a broken hairline, the storey below seen through
it as `trace` hairlines; a `groundFloor` element — at ground level, under it, or a wing's first storey on a solid wing — a
rotten patch in `ground` stipple, still walkable"; the `ruined` sentence (l. 13975) reads "leaving the ground storey — with
a solid wing's first storey — the only one that can be walked".

### VV34-r3-03 — major — CONFLICT — owner V09

**Claim.** V03 counts `storeyGone` per storey "every `upperFloor` area of which is damaged" (§4.6, l. 2381; §4.5, l. 2294,
"V03 §4.6's `storeyGone` rule"), so the ground storey, whose floors are `groundFloor` and only rot (§8.6), is never
"gone". V09 §4.21.13 (1), which builds the plan panel's lines, reads "`storeyGone` once every floor area of a storey has
fallen" (l. 3652–3653), and its `floor` line now says floors are "rotten or fallen through" (l. 2187): at level 1 every
floor area of the ground storey is damaged, so one builder names the walkable ground storey "The ground floor is gone"
and the other does not; the same split holds for a solid wing's first storey. V03 §5.6 (7) has one reading feed both the
panel and the `plan` section. V03's §13 row (l. 3250) names V09 §4.21.13 (1) as the other end; it was not written.

**Required change.** V09 §4.21.13 (1): "(`floor`, and `storeyGone` once every `upperFloor` area of a storey shows damaged
(V03 §4.6's rule) — 'the upper floor is gone')"; T-V9-86 adds "a `ruined` building at level 1 shows no `storeyGone` line
for its ground storey".

### VV34-r3-04 — minor — COHESION — owner scope

**Claim.** V04 §5.6 (6), §8's U5 row and J-V4.130 land item 123's damage below ground "at the later of U5 and V03's P4"
(VV34-r2-06's fix); §16's M6-U row (base l. 19996) still reads "item 123's damage below ground at U5". V04's HAND-OFFS
name it.

**Required change.** §16's M6-U row, content cell: "item 123's damage below ground at the later of U5 and V03's P4
(V04 §5.6 (6))".

### VV34-r3-05 — minor — CONFLICT — owner V03

**Claim.** R3-09 (e): "Every disaster fixture of the set is a calamity with its linked `reconstruction` condition" (a
disaster look stands only through a none-row condition linked to a carried calamity, `event` `calamity`, V11 §3.25.9
l. 4567; a calamity linked to no condition draws no look). V03 §7's damage fixtures still stage "a district of houses
under a staged disaster `ConditionOverlay` (§2.7: its weeks and severity)" (l. 2844–2845), and T-V3-40 runs "on the
damage fixtures' district under its disaster condition" (l. 2899); V04's T-V4-82 (i) already names its fixture so.

**Required change.** V03 §7: "a district of houses ruined by a fixture calamity through its linked `reconstruction`
condition's `ConditionOverlay` (V08 §3.16 (7) (b): `event` `calamity`; §2.7: its weeks and severity) and under a
`disaster` preview"; T-V3-40: "on the damage fixtures' district under its calamity's linked `reconstruction` condition and
under a `disaster` preview".

### VV34-r3-06 — minor — NEW-PROBLEM — owner V03

**Claim.** Round 3 rewrote `PlanDamage.own`'s comment (l. 2682): "V06's decayLevel(doc, lineage, week) alone; 0 for a
standing building outside a run (V06 §3.23 (2))". A building reoccupied under a `repair` Works is standing and outside its
run (the run lasts "until a restoring event", V06 §3.23 (1)), yet its level is `L × (1 − f(w))` until FINISHED (V06 §3.23
(3)) — the very weeks in which (b)'s repaired elements leave. The field's definition (V06's `decayLevel`) is right; the
gloss names the wrong value for that case.

**Required change.** V03 §5.6 (2), the `own` comment: "V06's decayLevel(doc, lineage, week) alone; 0 for a standing
building outside a run and any restoration (V06 §3.23 (2)–(3))".

## 5. Checks

* **References**: assemble-r3's resolver run (55 198 references, 0 broken, 0 fixes) covers the final text; its nine new
  ambiguous-form references lie outside V03 and V04 (V03 12, V04 1, unchanged). The citations the round-3 blocks add were
  read against their targets: V06 §2.11, §3.22 (3), §3.23 (1)–(4); V01 §3.16 (1); V03 §3.7.5; V12 §2.13, §3.7.8,
  §3.15.13, T-V12-56; base §2.6 step 7, §6.3 *Plan damage*, §8.6, §8.8, §16 — each states what is cited.
* **Ids**: no T-, J-, UE- or UC- id added or removed (T-V3-39 gains (h), T-V4-82 gains (i)); no collision.
* **Terms**: the canon's 35 retired patterns over every added line: one pattern match ("hand-over", G-unitinput) in V03
  §3.13 and T-V3-40, which names item 122 (a)'s hand-over (V06 §3.22 (3)), not the retired unit-run view — no TERM.
* **Deferral, phone, review ids**: no deferral wording; no phone or mobile clause (item 126 (a2)); no `R2-nn`, `R3-nn`
  or verifier id in design text (V03 §13's "V06 (VV56-r2-06, VAT2-r2-09)" is a record row, R3-02's exception).
* **Build plans**: V03 19–26 pw and M6-P 18.25–25 (§16 l. 19994), V04 28.5–39.5 pw (§16 l. 19996; INDEX l. 27; J-V4.114) —
  unchanged and equal; V04's landing of §5.6 differs from §16's M6-U row (VV34-r3-04).
* **doc_checks** (`--doc` each volume, `--heads docs/ARCHITECTURE.md`, `--allow docs/validation/doc-checks-allow.tsv`),
  **PROVISIONAL**: "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs,
  research/external) - clean-room results are NOT authoritative". V03 before → after: C1 0 → 0, C2 0 → 0, C3 367 / 280
  unreviewed → 367 / 281 (the one new run "7 and a building in a" — J-V3.136's own words), C4 2 / 0, S1 0, S2 169 / 0 →
  183 / 0. V04: C3 214 / 190 → 218 / 194 (new: "0 and 1 in the", two runs of section numbers, "of its own and the" —
  common phrasing), S2 127 / 2 → 147 / 2 (the two pre-existing §3.24 pointers). No clean-room finding.
* **Sizes** (repair reports, `wc -w`): V03 76 650 → 77 506 (+1.1 %), V04 82 321 → 83 268 (+1.2 %) — additions owed by the
  findings; no shrink this round, no unit shrank by half.

## 6. CONFIRMED versus PLAUSIBLE

**CONFIRMED (read or executed):** the live sha256 of V03 and V04 equal assemble-r3's "after"; the 42 diff hunks against
HEAD 920d280d read whole with their subsections; each of the sixteen round-2 ids and five END lines located in the live
text at the lines cited; VV34-r3-01's chain — V06 §3.23 (1)–(3)'s run end, restoration formula and entry week, l. 3382's
signature, l. 3274's and l. 4143's outcomes, V03 l. 2094, 2697–2701, 2898 — read whole; §8.6 l. 13964 and l. 13975; V09
l. 3652; §16 l. 19996; V03 l. 2844 and l. 2682; doc_checks run on both volumes before and after (provisional).
**PLAUSIBLE:** that a restoring `reoccupy` with a re-cut usually carries a `repair` Works (works on by default, V06 §3.23
(3)), which makes VV34-r3-01 a common path; that assemble-r3's reference resolver covers every new citation (its count is
read, not re-run here).
