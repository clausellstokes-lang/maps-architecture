# Verify — coherence pass, round 4: volumes V11 (content) and V12 (calibration) after repair round 4

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-vol-V11-V12-r4t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V11-V12-r4t`, 2026-10-01, cloud checkout; scratch `scratchpad/coherence/v1112r4/`)
- P0 resume check (no LANDED line, no output): fresh start — done
- P1 inputs read (brief whole with its ROUND-4 and ORCHESTRATION NOTES; r3t report and result; adjudication-r4's R4-01,
  R4-04, R4-06, R4-11, R4-13 and Part H rows of this lane's eight ids and every END line naming V11 or V12; repair-r4-V11
  and -V12 headers; assemble-r4) — done
- P2 live text against assemble-r4 (sha256 V11 47b14d9f…, V12 2db3c8c9…, base 5f34cceb…, V08 4675c05e…, V09 b49c6014…,
  V10 3fd16e69…, each equal to assemble-r4's "after"; the pre-round text from HEAD 96bdae26, V11 1671da41…, V12
  90a61a9c…, base 593c657d…, each equal to assemble-r4's "before") — done
- P3 round-3 findings VV1112-r3-01 – 08 re-checked at their homes, with each END line's second end — done (8 of 8
  written as ruled; one residual seam of -03's text raised as VV1112-r4-01)
- P4 every subsection the 10 V11 and 12 V12 round-4 blocks replaced, word-diffed against its pre-round form, every hunk
  read with its counterparts — done (V11 24 hunks, V12 31 hunks; findings VV1112-r4-02 – 04; the round-4 HAND-OFFS
  naming V11 or V12 checked; the landed r4t results read so as not to repeat their issues)
- P5 references, ids, deferral, review ids, doc_checks — done
- P6 this report, the result file, LANDED — done

## Outcome

**Not clean: 4 issues — 0 blocker, 1 major, 3 minor** (owners: V08 1 major; V12 2 minor; V11 1 minor). All eight of
this lane's round-3 findings are written at their homes as adjudication-r4 rules them (VV1112-r3-01 and -02 per R4-13,
-07 through VAH-r3-01, -08 with VCS-r3-08 per R4-06), and the four END lines written into V11 and V12 this round are in.
The new issues are seams of this round's own texts: the simultaneous-crisis week V08 now stages for `crisis.share` stands
on `metropolis-3` (45 824 people), while V12 reads it at the METROPOLIS cap of 120 000 — my round-3 text named the
fixture (VV1112-r4-01, major); V12 §2.13's two-pin row lists B-CITY's seeds under both pins while T-V11-21 registers them
on `item105.web` only (VV1112-r4-02); J-V11.113 still records the four pre-round delete-refusal cases without the named
row (VV1112-r4-03); and the two crossing cells moved from V01 to V11 kept their values but changed calibration route,
unruled (VV1112-r4-04).

| measure | V11 | V12 |
|---|---|---|
| words (`wc -w`), archive → pre-round → live | 103 331 → 109 650 → 110 255 (+6.7 % on the archive) | 75 054 → 82 759 → 83 196 (+10.8 % on the archive) |
| this round's growth | +605 (+0.6 %): the `hours` band's reading, range, edges and fixtures; the two raised-way crossing cells with type, registry, readers, lifecycle, shipping and grep entries; the disaster look's units and hand-over predicate at five sites; the two registrations and four take-over heads | +437 (+0.5 %): the disaster count and its passing cases; the barrier's three kinds; the knowledge clause at every key; the M5 exception at six statements; the touch setting at five; the week-keyed patch order; five take-over heads; "reference viewport" at nine sites |
| repair blocks applied (assemble-r4) | 10 of 10 (§1b, §2.8, §2.8c, §2.10, §3.1, §3.24 – §3.26, ## 7, ## 8) | 12 of 12 (§2.7b, §2.13, §3.4, §3.7, §3.12, §3.15, §3.16, ## 6, §7.1, §8.1, §8.2, §10.2) |
| word-diff hunks read (whole, with counterparts) | 24 | 31 |
| own ids (table-defined T-, J-, EI-, M-, X- rows) | 191, no duplicate; id set unchanged by the round | 185, no duplicate; id set unchanged |
| round-3 findings closed | VV1112-r3-06 | VV1112-r3-01 |
| issues this round | VV1112-r4-03 | VV1112-r4-02, -04 |

Neither volume shrinks this round (both grow by ruled content, as repair-r4-V11 and -V12 report), so no whole-volume
nuance audit was due. The round's cuts were each checked against what they cut: V11's "[0, 24]" (T-V11-48 (c)) is now
"[0, 23]", the declared range of an `hours` end, so a 24 no longer passes; "V07's ends" and "a ruined quarter's
buildings" are replaced by R4-04's fuller phrases; V12's "but a `barricade`" widened by R4-06, "a condition the viewer's
key withholds" replaced by R4-11's text, "in the order of their epochs of last change" made week-keyed by VAT3-r3-04, and
"V06's recovery fixture" named as T-V6-73's history-first fixture — the fixture VAT3-r3-04's claim identifies (H-WALLS's
oldest-first case stays T-V6-73's own bar and T-V12-47's planted-fault fixture). No NUANCE-LOST.

## Round-3 findings — status on the live text

| id | owner | grade (Part H) | disposition | status | where, as checked |
|---|---|---|---|---|---|
| VV1112-r3-01 | V12 | major | FIX per R4-13 | **fixed** | §3.4.2's `crisis.*` row (l. 1208): "… for the `disaster` look V01 §3.16 `disasterSource` (5)'s, max(k, \|`matched`\|) with k that count, or every unit of a fire order shorter than that, its shortfall reported and not counted"; §3.15.12's T122-5 bullet (l. 2704–2711) the same; T-V12-54's passing cases "a fire calamity naming more target districts than its share's count, every one drawn, and a fire whose district adjacency ends before its count, its shortfall reported". Agrees with V01 §3.16 (5) (l. 2360–2366), which holds at the village rungs too ((1): "the same rule picks among them") |
| VV1112-r3-02 | pipeline | major | FIX per R4-13 | **fixed** | §10.2 (c) (base l. 15630–15635): "… V01 §3.16 (5)'s count, one rule for every place at every rung; the `neighbourhoods` place then draws at least every matched target (max(k, \|`matched`\|), k that count) and, by fire, stops where its order ends, the shortfall reported (V01 §3.16 (5))" — R4-13's text |
| VV1112-r3-03 | V08 | major | FIX | **fixed as written**; residual seam | V08 §7.1 (l. 3222–3224): "with one week on `city-1` and on `metropolis-3` in which the siege, the plague's quarantine and the refugee wave stand at once at severities whose camped ground together passes `densityCap` of the outskirts' free land (V12 §3.15.12's `crisis.share`, T122-6; X-V12-5)". The quarantine is a camp look (§10.2 (e): siege, then quarantine, then refugees), so order and cap now bind. My required text named `metropolis-3`, which stands well below the METROPOLIS cap V12 reads: VV1112-r4-01 |
| VV1112-r3-04 | determinism | major | FIX | **fixed** | §7.1's row (base l. 10586): "removing a row readers fall back to or need — …, the only row covering a value a totality rule requires (a `crisis.looks` row for its look kind and a `damage.elements` row for its element kind among them), a table's named row (V11 §2.1's settings form: `settings`, `structure`, `festival.staging`'s `fallback`), or the last row of a table not `mayEmpty` (V11 §4.1; J-V11.113)" |
| VV1112-r3-05 | V09 | minor | FIX | **fixed** | V09's `refuse.table.required` row (l. 2006): text "{row} is what {readers} fall back to or read, so it stays; edit its cells instead."; cases "(V11 §4.1: a `defaultRow`, an `allowFallback` target, a totality rule's only cover, a table's named row, the last row of a table not `mayEmpty`)". The same rule's record J-V11.113 was not swept: VV1112-r4-03 |
| VV1112-r3-06 | V11 | major | FIX | **fixed** | §3.25.11 *The kinds*' head (l. 4672–4676): whole hours, each end in [0, 23] (its declared range), live while the hour of §2.9's `time` key, rounded down, lies in a … b, both ends included, wrapping midnight when a > b, "(fog's 4–11 live from 04:00 through 11:59)"; §2.8's `hours` comment (l. 605); EI-V11-EDGE-6's two cases and outcomes in order; T-V11-45 (v)'s three fixtures (11:30 / 12:00; 20–8 at 23:00, 03:30, noon; 24 and −1 clamped); T-V11-48 (c) "every `hours` end inside [0, 23]". Base §6.1 (l. 9547–9548) cites the reading and agrees |
| VV1112-r3-07 | V10 | minor | MERGED into VAH-r3-01 | **fixed** | no `crisis.look.<kind>` remains anywhere in the set (searched); CVR-V10-22 reads "the `info.crisis.*` and `info.damage.*` rows (each look's words its `crisis.looks` row's `label`, V11 §3.25.9)"; T-V10-29 names `info.damage.*` and `info.crisis.*` only |
| VV1112-r3-08 | scope | minor | FIX (with VCS-r3-08 per R4-06) | **fixed** | §13.2's T122-6 (base l. 18603–18605): "… and on a way's carriageway only a barrier across it (§10.2 (d)), and several crises share the outskirts by `priority` under `densityCap` (§10.2's placement; `crisis.blocked` 0 and `crisis.share` 0)" |

**END lines written into V11 and V12 this round** (Part H · V11 and V12):

| END | where it landed | status |
|---|---|---|
| VEW-r3-01 (pipeline; R4-09) → V11 | §3.24.2 (l. 3958–3962), §2.8c (l. 709), §3.1's row 80 (l. 1006), §1b's W50 (l. 208), §2.10's exceptions (l. 863), §8 (l. 5146), T-V11-1 (a) | **written**. `clearWidthM` 1 m, `squareDeg` 30° (`cdeg`), ranges [0, 3] m and [10°, 45°], `own`, calibratable, no `extension` marker — V01's pre-round constants row (l. 2198 at 96bdae26: "1 m; 30° · `m`; `cdeg` · [0, 3]; [10°, 45°] · yes · — · — · `own`") carried exactly; base §4.3 (l. 5627–5629) and V01 §3.17.3 (3) (l. 2473–2474) read the V11 cells; no `raised.clearWidthM` or `raised.squareDeg` remains (searched). The calibration route moved (VV1112-r4-04) |
| VAP-r3-09 (scope) → V12 | §3.15.12's head (l. 2684–2685): "V01's T-V1-60, V02's T-V2-60, V04's T-V4-82 (i), V08's T-V8-60 and V10's T-V10-52" | **written**; T-V4-82 (i) exists (the look below ground), and the order is §13.2's item-122 runs list's (base l. 18611–18614) |
| VPC-R3-03 (pipeline; R4-06) → V12 | §3.4.2's `crisis.*` row, §3.12's planted-fault row (l. 2338), §3.15.12's T122-6 (l. 2712–2715), §3.16's row 33 (l. 2879), T-V12-54 (l. 3167) | **written**: "a way's carriageway … save a barrier across it (a `barricade`, a `beast`'s `stakes`, a quarantine's `cordon`; §10.2 (d))"; T-V12-54's passing cases add the stakes "where its edge crosses a way" and the cordon "across each way entering its quarter", as §10.2 (d) and (f) state them (base l. 15645–15648, 13118) |
| R4-11 (sweep) → V12 | §3.4.2's `crisis.weeks` clause, §3.15.12's T122-2 bullet (l. 2697–2701), §3.12's row, row 33, T-V12-54 | **written**: R4-11's texts; T-V12-54's planted case "a planted look drawn for a `none`-row condition carried beside the looks — each look-bearing condition's look drawn at `public`, `local` and `secret` alike passing" (the seat's own sweep); agrees with §13.2's T122-2 (base l. 18596–18597) and T-ER-27 |

## Round-4 changes in scope — new problems

Every hunk of the two word diffs (pre-round 96bdae26 → live) was read whole with the texts it cites.

**V11 (10 blocks, 24 hunks).**
* §1b W50, §2.8c, §3.1 row 80, §2.10, §3.24.2, §8, T-V11-1 (a) — the crossing cells (END of VEW-r3-01): wired both ways.
  Producers: row 80's source written at C3b (M3a); consumers: base §4.3's crossing rule (every route and growth proposal
  on ground part 0 — row 80's readers name S5b, S5c, S8, S8.seed, and S5a and S7 for the support step's re-runs, so
  T-V11-1 (b)'s table-level reader check passes), V01 §3.17.3 (3)'s seeds, fans and lanes. Lifecycle (§2.10): an edit
  re-derives the readers whose slices cite them, a standing way a raised bound now refuses kept and listed; absent from a
  pinned version 1 m and 30°. Ranges and clamp (V11 §4.1) defined. The base texts V11 now cites exist: §2.7's support
  step (6) (a) and (b) (base l. 2574–2600), §4.8's run after S7's batches (l. 7591), §4.3 (l. 5622–5634). The one
  ambiguous-form pointer the round added, V11 l. 1006 "V01 §3.17.3 (3), §4.3", means the base's §4.3 and resolves so under
  S7. **New issue:** the calibration route (VV1112-r4-04).
* §1b W88, §3.25.9's lead, `disaster` row and *The rows' readings*, `crisis.map`'s readings, §3.26's C-crisis-tables
  and C-damage-tables rows — R4-04's two phrases: "the look's units (§10.2 (d))" and "a building the look stands over
  (§10.2 (d)'s units, until V06 §3.22 (3)'s hand-over; §10.2 (f))", with `villageDisasterUnits` at the village rungs;
  they agree with V01 §3.16 (1) and with base §2.6 step 7 and §10.2 (d), (f). The label "Ruined quarters" stays (R4-04
  changes no label). No new issue.
* §3.25.10's `settings` row (VAT3-r3-09): "ages from the week its change shows in that replay epoch (V06 §3.23 (4))" —
  V06 §3.23 (1)'s "the week a change shows" and base §2.6 (l. 2103) agree. No new issue.
* §2.8, §3.25.11, EI-V11-EDGE-6, T-V11-45 (v), T-V11-48 (c) — VV1112-r3-06 (above). The kinds' fades that the
  `lengthS` bound reads are §8.4 (i)'s, which states none for `snow`, `leaves` or `shimmer`: already raised by
  verify-determinism-r4t as VDC4-02 (rendering), whose required text keeps every V11 `lengthS` lower end at least twice
  the fade; V11 reads "its kind's fade in §8.4 (i)" and needs no change. Not repeated.
* §7: T-V11-19 and T-V11-21's registrations (VAP-r3-07), T-V11-38 – T-V11-41's heads (VCS-r3-05). The heads agree with
  §13.2's take-over rows (base l. 18440, 18461, 18494, 18510, 18681): V11 takes the registrations, V12 the specs and pins
  (T-V12-44, -46, -47, -48), complementary. T-V11-19's C4a seat and T-V11-21's C2 seat both exit at M2b (V11 §8), the
  pins' milestone (§13.8, base l. 19242). **New issue:** V12 §2.13's two-pin row (VV1112-r4-02).

**V12 (12 blocks, 31 hunks).**
* §2.7b `patchesOldestFirst`, §3.15.4 `T114g.oldestFirst`, T-V12-47 (VAT3-r3-04): week-keyed, `EpochRecord.inputs.week`;
  agrees with V06 §3.7.7 (3) (V06 l. 3328), T-V6-73's history-first clause and §13.2's T114-4 (base l. 18472). No new issue.
* §2.13, §3.7.8, X-V12-11 (VAP-r3-08): the union now includes T-V11-19 and T-V11-21. **New issue:** the two-pin row's
  unqualified B-CITY entry (VV1112-r4-02).
* §3.4.2, §3.12, §3.15.12, §3.16 row 33, T-V12-54 — the disaster count (R4-13), the barrier (R4-06), the knowledge clause
  (R4-11): above. Each statement agrees with its base home. **New issue** at the shared-outskirts week's producer
  (VV1112-r4-01).
* §3.15's lead, §3.15.12's head, W7, §6's item-122 row, §8.1, T-V12-54's milestone (VAP-r3-01): "the `disaster`
  preview's district clauses … from M5, when V01's W10 lands"; agrees with §13.8's T122 row (base l. 19285) and §16's M5
  row (l. 20184: "the `disaster` look's district clauses of T122-2, T122-3, T122-5 and T122-6"). No new issue.
* §3.4.2's `layout.touch`, §3.12, §3.15.16, row 37, T-V12-59 (VAP-r3-02): `AppPrefs.touch.editFabric` on; V09 l. 930
  defines it, V09's T-V9-22 and §13.2 (base l. 18657) read the same. No new issue.
* §3.15.6 (VAP-r3-10): "every export within the limit bounds — the whole bounds at most, a whole-bounds export at the cap
  framing them, §8.7" — §13.2's T116-4 (base l. 18518–18520). No new issue.
* T-V12-44 – T-V12-47 and T-V12-49's heads (VCS-r3-02): agree with §13.2's calibration row (base l. 18680). No new issue.
* "reference view(s)" → "reference viewport(s)" at nine sites (rendering's hand-off; G-refview): none left in V12. No new
  issue (scope's own T121-3 site is verify-scope-r4t's VCS-r4-01).

**Round-4 HAND-OFFS naming V11 or V12** (all eighteen repair headers searched): repair-r4-V11 (1) and repair-r4-V12's V11
item disagree about T-V11-21 (the live text sides with V11's): VV1112-r4-02. repair-r4-V11 (2): every text it names is in
(above). repair-r4-determinism's fade hand-off: VDC4-02, not repeated. repair-r4-V12's scope item: VCS-r4-01, not
repeated. repair-r4-scope's V12 item: checked (heads and `T114g.oldestFirst` agree).

## Issues

**VV1112-r4-01 — major — WIRING — owner V08.** V08 §7.1's crisis fixtures sentence (l. 3222–3224), written this round
for VV1112-r3-03, stages the simultaneous siege, quarantine and refugee week "on `city-1` and on `metropolis-3`". V12,
its only reader, measures that week at the METROPOLIS cap: §3.15.12's fixture sentence (l. 2690–2692: "one week in which
a siege, a quarantine and a refugee wave stand at once at CITY and at the METROPOLIS cap") and T122-6's bullet (l.
2712–2719: "on the week standing a siege, a quarantine and a refugee wave at once at CITY and at the METROPOLIS cap");
`crisis.share` is the only bar that reads several camp looks at once (a preview draws one look). The cap is 120 000
people (base §1.1, l. 395; §12.2's row, l. 16896). `metropolis-3` holds 45 824 (the frozen fixture; research/sf/PLAN.md
l. 406; §13.2 lists it among the totality-only files, l. 18251), a METROPOLIS map far below the cap. V08 names no
mutation to the cap, although it names one wherever it moves a fixture's population (T-V8-36's "`city-1` mutated to 8 000
people"; the force fixtures "each at TOWN, CITY and the METROPOLIS cap"). So the cap run of `crisis.share` has no
producing fixture. One builder runs it on `metropolis-3` at 45 824 and reports the cap clause met; another stops, finding
no cap fixture. The outskirts' sharing at the largest frame goes untested (principle (11): the maximum and the caps). The
defect is in my round-3 required text, which named `metropolis-3`.
*Required change:* V08 §7.1's fixtures sentence: "with one week on `city-1` and on `metropolis-3` in which the siege, the
plague's quarantine and the refugee wave stand at once" → "with one week on `city-1`, and one on a copy of
`metropolis-3` mutated test-side to the population cap's 120 000 people (as T-V8-36 mutates `city-1`), in which the
siege, the plague's quarantine and the refugee wave stand at once"; the rest of the sentence stands.

**VV1112-r4-02 — minor — CONFLICT — owner V12.** V12 §2.13's row `item105.web`, `item107.spread` (l. 919), rewritten
this round for VAP-r3-08, lists "B-CITY's 200 seeds per rung (V11, T-V11-21)" unqualified. In that row's own form, an
unqualified suite is registered under both pins: V07's is qualified "(T-V7-33, on `item105.web`)", while V05's island
fixture and V06's H-100 are registered under both (V05 l. 2659; T-V6-44). T-V11-21, also written this round
(VAP-r3-07), registers the seeds as "the `item105.web` registration of B-CITY's 200 seeds per rung" only. No V11 clause
registers them on `item107.spread`: a search of the set finds that pin registered only at V05 l. 2659 and V06's T-V6-44.
V12 §3.7.8 has each volume register "on the pin V12 §2.13 lists it under", and §2.13's suites column must be the union
of the registering clauses. repair-r4-V12's hand-off says V11 states the `item107.spread` registration beside
`item105.web` in T-V11-21; the live V11 text does not. Nothing built changes (registration bookkeeping).
*Required change:* V12 §2.13's row: "B-CITY's 200 seeds per rung (V11, T-V11-21);" → "B-CITY's 200 seeds per rung (V11,
T-V11-21, on `item105.web`);".

**VV1112-r4-03 — minor — CONFLICT — owner V11.** V11 §4.1 (l. 4834–4840) cites J-V11.113 for its whole delete refusal.
Since round 3 that refusal includes "a table's named row (V11 §2.1's settings form — `settings`, `structure`,
`festival.staging`'s `fallback` —, whose cells its readers read with no fallback)". This round, §7.1's row (base l.
10586; VV1112-r3-04) and V09's `refuse.table.required` row (l. 2006; VV1112-r3-05) were conformed to it. J-V11.113 (l.
5280) still records four cases — "what readers fall back to — a table's `defaultRow`, an `allowFallback` target, a
totality rule's only cover, the last row of a table not `mayEmpty`". It is the third restatement of the same rule, and
the sweep missed it. A stale record; nothing built changes.
*Required change:* J-V11.113: "chose to refuse a row delete that would remove what readers fall back to — a table's
`defaultRow`, an `allowFallback` target, a totality rule's only cover, the last row of a table not `mayEmpty` —" → "chose
to refuse a row delete that would remove what readers fall back to or need — a table's `defaultRow`, an `allowFallback`
target, a totality rule's only cover, a table's named row (V11 §2.1's settings form), the last row of a table not
`mayEmpty` —"; the rest of the record stands.

**VV1112-r4-04 — minor — CHANGED — owner V12.** R4-09 moved V01's crossing cells `raised.clearWidthM` and
`raised.squareDeg` (V01's constants row, l. 2198 at 96bdae26) into V11 §3.24.2's `raisedWays.structure` as `clearWidthM`
and `squareDeg`, with the equivalence "rule, ladder and values unchanged". Value, range, unit, marker and provenance
carried over exactly. The calibration route did not. As `hood.constants` columns, both cells took V12 §3.11's default
line: `corpus` at M-CAL (J-V1.97; V12 l. 2042: "volume 1's `hood.*` default rows"). V11 §3.24.2 (l. 3961) and §8 (l.
5146) now give "their entry V12 §3.11's `raisedWays.structure` line". That line's catch-all — "every other calibratable
column but the `span` block", V12 l. 2175 — calibrates them by `panel` (the M4-110 group) at M4. No ruling moves the
route, and repair-r4-V11 says "calibration … unchanged". Builders read the live line alike, so nothing they build
differs; the change against the archive is unruled (principle (3)).
*Required change:* keep the archive's route. V12 §3.11's `raisedWays.structure` line: "and every other calibratable
column but the `span` block (the span-rule line's)" → "and every other calibratable column but the `span` block (the
span-rule line's) and `clearWidthM` and `squareDeg` (§4.3's crossing cells, the default line's, `corpus` at M-CAL, as
when V01 held them; J-V1.97)". The default line's list (l. 2042), after "volume 1's `hood.*` default rows;", adds "V11's
`raisedWays.structure.clearWidthM` and `.squareDeg` (§4.3's crossing cells);". In the same fix, V11 §3.24.2's cell text
"`own`, calibratable, their entry V12 §3.11's `raisedWays.structure` line" → "`own`, calibratable, their entry V12
§3.11's default line (`corpus` at M-CAL)". V11 §8's "ship with item 110's rows at C3b, their entry the
`raisedWays.structure` line" → "ship with item 110's rows at C3b — `stripMarginM`'s entry the `raisedWays.structure`
line, `clearWidthM`'s and `squareDeg`'s the default line".

## Checks

* **References.** assemble-r4's resolver (`work/assemble-r4/refs.py`, read-only) rerun on the live set: 55 885 checked,
  **0 broken**; V11 3 686 resolved, 7 ambiguous-form, 3 external; V12 2 878 resolved, 2 ambiguous-form, 7 external. The
  one ambiguous form this round added in scope is V11 l. 1006's `§4.3` (the base's crossing rule, as S7 reads it).
  Pointers the round added, spot-checked: V01 §3.16 (5) (`disasterSource`), V06 §3.22 (3) (`crisisLookYields`), V06
  §3.23 (4), T-V6-73's history-first clause, T-V4-82 (i), V09 §4.12 and l. 930 (`AppPrefs.touch.editFabric`), base §2.7's
  support step (6) (a), (b), §4.3, §4.8, §8.7, §10.2 (c), (d), (f), §13.4 — each resolves and states what is cited.
* **Ids.** V11 191 and V12 185 table-defined ids, none duplicated; the round adds or removes none.
* **Deferral wording and review ids.** In the 661 words the round added to V11 and the 558 it added to V12: no "TBD",
  "later", "for now" or open question; no `R2-nn`, `R3-nn`, `R4-nn` or verifier id.
* **doc_checks** (`docs/validation/bench/doc_checks.py`, whole volume, S2 against the base's headings; WARNING printed:
  reference corpus INCOMPLETE — captures, research/patreon, research/devlogs, research/ftg-docs, research/external
  missing — so the clean-room results are NOT authoritative; provisional), pre-round → live: V11 C1 0 → 0, C2 0 → 0, C3
  304 → 305 (277 → 277 unreviewed), C4 5 → 5 (0), S1 0 → 0, S2 326 → 332 (33 → 33 unreviewed); V12 C1 8 → 8 (0
  unreviewed), C2 0 → 0, C3 141 → 140 (127 → 126), C4 2 → 2 (0), S1 0 → 0, S2 115 → 117 (11 → 11). Exit 1 before and
  after on the same pre-existing unreviewed hits. The only changed unreviewed hit is V11's C3 run "s 2 7 and 4" → "s 2 7
  4 6 s8", the section numbers "§2.7 … §4.6 S8" of the row-80 readers cell, which is not corpus content (assemble-r4 lists
  the same run). No new unreviewed content hit.
* **Edges (principle (11)) of the round's mechanisms.** `hours`: wrap, clamp, last hour, no live kind — defined
  (EI-V11-EDGE-6) and tested (T-V11-45 (v)); a band a = b reads as one hour by the rule's "both ends included". Crossing
  cells: range clamp (V11 §4.1); an edit that a standing crossing then fails, kept and listed (§2.10); the crossing
  rule's ladder is F-ROUTE's (base §4.3). Disaster count: the over-target and short-fire cases are passing cases of
  T-V12-54. Barrier: stakes and cordon are passing cases. No undefined or untested edge found beyond VV1112-r4-01's cap
  run.

**CONFIRMED** (executed here): the hashes; the word diffs; the reference resolver's counts; the id census; the
added-text scans; doc_checks' counts (provisional by its own warning); every quoted line read in the live files.
**PLAUSIBLE** (reasoning over the text): the grades, and that the four required changes close their seams without
opening another.
