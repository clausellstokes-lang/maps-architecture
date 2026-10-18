# Verify — coherence pass, round 3: volumes V11 (content) and V12 (calibration) after repair round 3

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-vol-V11-V12-r3t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V11-V12-r3t`, 2026-10-01, cloud checkout; scratch `scratchpad/coherence/v1112r3/`)
- P0 resume check (no LANDED line, no output): fresh start — done
- P1 inputs read (brief whole, its ROUND-3 and ORCHESTRATION NOTES; r2t report and result; adjudication-r3 whole for
  R3-01 – R3-27, Part H · V11 and V12 and the rows of this lane's r2 ids owned elsewhere, every END line naming V11 or V12;
  repair-r3-V11 and -V12 preambles, dispositions, readings and HAND-OFFS; assemble-r3) — done
- P2 live text against assemble-r3 (sha256 V11 1671da41…, V12 90a61a9c…, both equal to assemble-r3's "after") and the
  pre-round text (git 91f0792: V11 7842179a…, V12 74a4bfb3…, assemble-r3's "before") — done
- P3 round-2 findings VV1112-r2-01 – 15 and the three END lines into V11 and V12 re-checked on the live text — done (15 of
  15 fixed at their homes)
- P4 every subsection the 14 V11 and 12 V12 repair blocks replaced, word-diffed against its pre-round form and every hunk
  read with its counterparts (base §2.9, §6.1, §7.1, §7.7 DR44, §8.8, §10.2 *Crisis looks* (a)–(f), §13.2, §13.8; V01
  §3.16; V02 §7; V03 §7; V06 §3.23; V08 §2.4, §3.10, §7.1; V09; V10) — done
- P5 references, ids, deferral, review ids, doc_checks; the landed r3t results read so as not to repeat their issues — done
- P6 this report, the result file, LANDED — done

## Outcome

**Not clean: 8 issues — 0 blocker, 5 major, 3 minor** (owners: V12 1, V11 1, V08 1, V09 1, V10 1, pipeline 1,
determinism 1, scope 1). All 15 of this lane's round-2 findings are fixed in the text as adjudication-r3 rules them, and the
three END lines addressed to V11 and V12 are written. The new issues are seams the round's own fixes opened: V12's new
`crisis.scale` unit count (and the base sentence it copied) disagrees with V01's disaster units, which keep every matched
target (VV1112-r3-01, -02); V12's new priority-and-cap measure reads a simultaneous-crisis week V08 never defines
(VV1112-r3-03); V11's new named-row delete refusal is missing from the one home of refusals and from V09's message row
(VV1112-r3-04, -05); the weather `hours` band, which now decides whether a kind is live, has no stated reading of its end
hour, a wrap past midnight or its range (VV1112-r3-06); and two stale ends (VV1112-r3-07, -08).

| measure | V11 | V12 |
|---|---|---|
| words (wc -w), archive → pre-round → live | 103 331 → 108 745 → 109 650 (+6.1 % on the archive) | 75 054 → 81 679 → 82 759 (+10.3 % on the archive) |
| this round's growth | +905 (+0.8 %): six registration clauses, two totality rules, the named-row refusal with its edge rows and fixtures, the three census lists, the live-hours rule, the `occupation` row, two END lines | +1 080 (+1.3 %): the widened Find and crisis measures, `crisis.share` and the scale count, the barricade exception, the every-rung required-keys runs, the PR tiers, the pin union, the owners named by id |
| repair blocks applied (assemble-r3) | 14 of 14 | 12 of 12 |
| changed sections read (whole, as word diffs against the pre-round text) | 14 headings, 35 hunks | 12 headings, 42 hunks |
| own ids (defined; unique) | 193 table-defined ids (T-V11-, J-V11., EI-V11-EDGE-, M-V11-), no duplicate; none added or removed | 185 (T-V12-, J-V12., X-V12-), no duplicate; one new metric id `crisis.share`, defined once (§3.4.2) and read twice |
| round-2 findings | VV1112-r2-01 – -03 fixed | VV1112-r2-04 – -08, -12, -13 fixed |
| issues this round | VV1112-r3-06 | VV1112-r3-01 |

Neither volume shrinks this round (each grows by the round's ruled content; repair-r3-V11 and -V12 report it), so no
whole-volume nuance audit was due. The round's two cuts were checked against what they cut: V11's calamity-kernel gloss and
"fire, flood or earthquake" (V01 §3.16 (2) holds the patterns by type), and V12 §3.15.13's restated damage-fixture list,
cut to "(V03 §7)": V03 §7's damage fixtures hold every case the cut list carried — a building of every element kind in each
of `abandoned`, `decayed` and `ruined`, a restored one, a never-decayed control, a ruined church with its crypt — and more.
No NUANCE-LOST.

## Round-2 findings — status on the live text

| id | owner | grade (Part H) | disposition | status | where, as checked |
|---|---|---|---|---|---|
| VV1112-r2-01 | V11 | major | FIX per R3-23 (a) | **fixed** | V11 §3.25.11 *The columns*: live at a moment when the band holds §2.9's `yearWeek` and, under `light: 'time'`, the `hours` hold the view's hour; the gap spent at the live rate, none at R = 0; the kind drawn "its live rate ÷ R at the moment the gap ends"; *The commonest kind* at a moment, none at R = 0 with V09's disabled button; *The kinds*' head and §2.8's `hours` comment "in which the kind is live"; EI-V11-EDGE-6's new case and outcome; T-V11-45 (v); J-V11.120. Clause by clause the same as base §6.1 *The weather stream* (l. 9441–9468) |
| VV1112-r2-02 | V11 | major (raised) | FIX | **fixed** | §3.25.9's `archetype` row `occupation` → `occupation`, read in *The readings* beside `vassal_extraction`; §12's CONFIRMED line; V08 §2.4's census lists `occupation` (l. 711) |
| VV1112-r2-03 | V11 | minor | FIX | **fixed** | §3.1's summary names the enumerations, the two switches (T-V11-37), the patch rows' `label` and `look` and row 43's two owner-stamped caps |
| VV1112-r2-04 | V12 | major (raised) | FIX | **fixed** | §3.11: `scale` and `lookLevel`; "by element kind"; the climate rows' weather columns and the `settings.weather` block's numbers, its two caps excluded (both inside `ClimateSettings.weather`, V11 l. 602–609); §3.15.14's closing line and §1b agree |
| VV1112-r2-05 | V12 | major | FIX | **fixed** | §3.15.15, §6's item-125 row, T-V12-58, §3.16 row 36, §3.4.2's `port.fallbacks`, §2.13's `item125.host`, §1b, X-V12-5, J-V12.104 — every rung, the village rungs through V07 (V08 §3.10's `LadderRouter`); V08 §7.1 makes the required-keys dossier at every rung |
| VV1112-r2-06 | V12 | major | FIX | **fixed as written**, with two seams | `crisis.scale`'s second count and `crisis.share` in §3.4.2, §3.15.12, §3.12, T-V12-54, J-V12.101 ("five"). The unit clause conflicts with V01's disaster units (VV1112-r3-01, -02) and the shared-outskirts week has no producer (VV1112-r3-03) |
| VV1112-r2-07 | V12 | minor | FIX | **fixed** | §3.15.11 and §6's rows for items 121, 123, 124, 125 and 126 match §13.8 (l. 19081–19090) bar by bar: T121-2, -3, -8 timing phase, T121-5 PR; T123 PR, H-100's runs nightly; T124-3, -4, -9 PR, T124-2, -6, -7 timing phase and visual regression, the pin's suites nightly; T125 PR, the required-keys dossier nightly; T126 PR |
| VV1112-r2-08 | V12 | minor | FIX per R3-26 | **fixed** | §2.13's suites column, §3.7.8's list and X-V12-11 equal the union of the live registering clauses read across the set (every such clause found by search, V02's two line-split ones by hand), every round-3 addition present with its suite named as its clause names it (T-V2-58 (f), T-V2-59 (d), T-V2-60 (c), T-V3-39 (g), T-V3-40 (f), T-V8-59, T-V8-61 (b), T-V10-45, T-V11-13, T-V11-31, T-V11-38 (b) – T-V11-41 (b)) |
| VV1112-r2-09 | V02 | minor | FIX per R3-26 | **fixed** | T-V2-59 (d) and T-V2-60 (c) end in R2-09's registration form, suites as in V12 §2.13 |
| VV1112-r2-10 | V08 | minor | FIX per R3-26 | **fixed** | T-V8-59 and T-V8-61 (b) |
| VV1112-r2-11 | V08 | major | FIX per R3-09 (e) | **fixed** | V08 §7.1 (l. 3186–3193): the crisis fixtures on `town-1`, `city-1`, `metropolis-3`, each disaster a carried calamity with its linked `reconstruction` condition, the targets resolved; the force fixtures with T-V12-55's sizes; the required-keys dossier at every rung |
| VV1112-r2-12 | V12 | minor | FIX | **fixed** | §3.15.12 names T-V11-46, T-V8-59, T-V9-85, T-V6-75, T-V3-40, T-V1-60, T-V2-60, T-V8-60, T-V10-52 and T-V7-69 — each defined in its volume |
| VV1112-r2-13 | V12 | minor | FIX | **fixed** | "§7.7's DR41" in §3.11 (both places) and T-V12-47; §1b "DR36 – DR39"; no "condition row" or "DR36 onward" left |
| VV1112-r2-14 | V09 | minor | FIX | **fixed at V09** | no `crisis.look.` left in V09; each look worded by its row's `label`. Its other readers in V10 still name the deleted key family: VV1112-r3-07 |
| VV1112-r2-15 | V06 | minor | FIX per R3-08 (d) | **fixed** | V06 §3.23 (2) l. 3397–3398 |

**END lines into this scope (Part H):** V11 §3.25.10's `settings` row (R3-06) — written as given, with §2.8d's
`DamageSettings` comment and EI-V11-EDGE-5's `defaultAgeYears` 0 outcome; agrees with V06 §3.23 (4). V11 §3.25.9's
`event` row and *The readings*' calamity sentence (R3-09 (a)) — written as given; agree with V08 §3.16 (7) (b) and V08's
`event` comment (l. 738); W88 and J-V11.118 name the source word as DR44 and §10.2 (b) do. V12 §3.15.12 and X-V12-5
(R3-09 (e)) — written, and §1b's dossier row says the same.

**Other fixes in this scope** (other verifiers' issues, re-read here only for new problems): V11's VAP-r2-09, VAP-r2-11,
VEL2-r2-02, VPC-R1-01, VPC-R2-06, VPC-R2-13 and VV78-r2-10; V12's VAP-r2-08, VAP-r2-12, VRC2T-04 and VV34-r2-15 — each in
the subsections its repair file names. New problems found in their text: VEL2-r2-02's named-row refusal not reaching §7.1's
refusal home or V09's message row (VV1112-r3-04, -05).

## Issues

### VV1112-r3-01 — major — CONFLICT — owner V12

**Claim.** V12's new `crisis.scale` second count (§3.4.2's `crisis.*` row, l. 1208; §3.15.12's T122-5 bullet, l. 2698 –
2704) compares each look §10.2 (c) sizes by severity with "the count §10.2 (c) gives that share of its place's units" —
round(s × n) clamped to [1, n]. The `disaster` look's units are V01 §3.16 `disasterSource` (5)'s: "`units` is the first
max(k, |`matched`|) units of the order — all of a shorter fire order, the shortfall reported in the view telemetry", so
every matched target is drawn even past k, and a fire whose adjacency ends draws fewer than k. V12's own fixtures hold both
cases: V08 §7.1's fire, flood and earthquake calamities carry resolved `targets`, and T122-5's sweep at severity 0 sets s to
the `disaster` row's lower end 0.05 (k = 1 at a TOWN of eight districts), so a calamity naming two districts gives a lawful
draw the count flags; a fire meeting a gap in the district adjacency likewise. The bar fails a lawful result.

**Required change.** §3.4.2's `crisis.*` row: "or whose units differ in number from the count §10.2 (c) gives that share of
its place's units;" → "or whose units differ in number from the count §10.2 (c) gives that share of its place's units — for
the `disaster` look V01 §3.16 `disasterSource` (5)'s, max(k, |`matched`|), or every unit of a fire order shorter than that,
its shortfall reported and not counted;". §3.15.12's T122-5 bullet: "else its units the count §10.2 (c) gives that share of
its place's units (`crisis.scale`'s second count, 0 by rule)" → "else its units the count §10.2 (c) gives that share of its
place's units — a `disaster` look's max(k, |`matched`|), or all of a shorter fire order (V01 §3.16 `disasterSource` (5)) —
(`crisis.scale`'s second count, 0 by rule)". T-V12-54 adds the passing case "a fire calamity naming more target districts
than its share's count, every one drawn".

### VV1112-r3-02 — major — CONFLICT — owner pipeline

**Claim.** §10.2 (c), written this round (l. 15503 – 15505): "a share s of a place's n units takes round(s × n) clamped to
[1, n] where s > 0 and none where s ≤ 0, V01 §3.16 (5)'s count, one rule for every place at every rung." V01 §3.16 (5),
the home of the disaster's units and unchanged since before this round, draws "the first max(k, |`matched`|) units of the
order — all of a shorter fire order, the shortfall reported". For the `neighbourhoods` place the two units state two
outcomes when a calamity's matched targets outnumber k or a fire's order ends short (R3-03 (b)); §10.2 (d)'s "the
calamity's `targets` first" does not decide it. V12's new count copied the base sentence (VV1112-r3-01).

**Required change.** §10.2 (c): "V01 §3.16 (5)'s count, one rule for every place at every rung." → "V01 §3.16 (5)'s count,
one rule for every place at every rung; the `neighbourhoods` place then draws at least every matched target (max(k,
|`matched`|)) and, by fire, stops where its order ends, the shortfall reported (V01 §3.16 (5))."

### VV1112-r3-03 — major — WIRING — owner V08

**Claim.** V12's T122-6 now measures `crisis.share` "on the week standing a siege, a quarantine and a refugee wave at once
at CITY and at the METROPOLIS cap, the camp looks taking the outskirts in `priority` order, each from what the earlier left,
together at most `densityCap` of the outskirts' free land" (V12 §3.15.12, l. 2705 – 2710); its fixture sentence asks for
"one week in which a siege, a quarantine and a refugee wave stand at once at CITY and at the METROPOLIS cap, their camped
ground together past `densityCap`", and X-V12-5 (l. 3406) names it closed at V08 §7. V08 §7.1's crisis fixtures (l. 3188 –
3193) stand each condition "through part of the year at its severity" and state no week in which the three stand together
and no severities whose ground passes the cap. With no such week the order and the cap never bind and `crisis.share`
passes on nothing — an input the bar needs with no producer (repair-r3-V12 handed it to round 4). A preview draws one look
at a time and cannot stand in.

**Required change.** V08 §7.1's fixtures sentence: after "each standing through part of the year at its severity," add
"with one week on `city-1` and on `metropolis-3` in which the siege, the plague's quarantine and the refugee wave stand at
once at severities whose camped ground together passes `densityCap` of the outskirts' free land (V12's `crisis.share`,
T122-6; X-V12-5),".

### VV1112-r3-04 — major — CONFLICT — owner determinism

**Claim.** V11 §4.1, rewritten this round for VEL2-r2-02 (l. 4823 – 4830), refuses the `delete` of "a table's named row
(V11 §2.1's settings form — `settings`, `structure`, `festival.staging`'s `fallback` —, whose cells its readers read with
no fallback)" beside the four earlier cases; V11 §4.4's lifecycle row, §3.26's general rule and EI-V11-EDGE-3 – -5 follow.
§7.1's dry-run outcomes — "the one home of every refusal, conflict and bend cause of a dry run" (E-07, l. 10434) — still
list four in their row (l. 10485): "the schema's `defaultRow`, a `TotalityRule.allowFallback` target, the only row covering
a value a totality rule requires, or the last row of a table not `mayEmpty` (V11 §4.1; J-V11.113)". An edit engine built
from §7.1 applies the delete of `crisis.looks`' `settings` row, leaving DR44 and §10.2's placement to read `densityCap` and
`areaPerHeadM2` from no row; V11 refuses it. Two units, two outcomes; repair-r3-V11 recorded no end here.

**Required change.** §7.1's row: "removing a row readers fall back to — the schema's `defaultRow`, a
`TotalityRule.allowFallback` target, the only row covering a value a totality rule requires, or the last row of a table not
`mayEmpty` (V11 §4.1; J-V11.113)" → "removing a row readers fall back to or need — the schema's `defaultRow`, a
`TotalityRule.allowFallback` target, the only row covering a value a totality rule requires (a `crisis.looks` row for its
look kind and a `damage.elements` row for its element kind among them), a table's named row (V11 §2.1's settings form:
`settings`, `structure`, `festival.staging`'s `fallback`), or the last row of a table not `mayEmpty` (V11 §4.1;
J-V11.113)".

### VV1112-r3-05 — minor — CONFLICT — owner V09

**Claim.** V09's `refuse.table.required` row (l. 2003) restates V11 §4.1's cases — "(V11 §4.1: a `defaultRow`, an
`allowFallback` target, a totality rule's only cover, the last row of a table not `mayEmpty`)" — without the named row V11
§4.1 now refuses, and its words "{row} is what {readers} fall back to" do not fit a named row whose readers have no
fallback. The key is the same, so nothing built changes.

**Required change.** The row's third cell: "(V11 §4.1: a `defaultRow`, an `allowFallback` target, a totality rule's only
cover, a table's named row, the last row of a table not `mayEmpty`)"; its text: "{row} is what {readers} fall back to or
read, so it stays; edit its cells instead."

### VV1112-r3-06 — major — EDGE-UNDEFINED — owner V11

**Claim.** Since this round a weather kind is live only while "its `hours` hold the view's hour" (V11 §3.25.11 *The
columns*; base §6.1 in the same words), so the `hours` band now decides R and every draw. Neither *The kinds* (`mist` and
`fog` 4–11, `shimmer` 10–18; l. 4664) nor §2.8's `hours?: [number, number]` says how a band holds an hour: whether the end
hour b is live through its whole hour (fog at 11:30 under `light: 'time'`, whose `time` key counts hours, §2.9), whether a
band with a > b wraps midnight (the week bands state "includes both ends and wraps the year's end when a > b"; the hours do
not), or what range an edited `hours` cell is clamped to (no `range` is declared; V11 §4.1 clamps only to a declared range,
and V12 §3.11 now places these cells under its default line). Two builders read the shipped cells differently, and an edit
to, say, 20–8 for night fog has no defined outcome; EI-V11-EDGE-6 and T-V11-45 (v) carry neither case.

**Required change.** V11 §3.25.11 *The kinds*' head, after "in which the kind is live": "— whole hours of the view's day,
each end in [0, 23] (its declared range): the kind is live while the hour of §2.9's `time` key, rounded down, lies in
a … b, both ends included, wrapping midnight when a > b, as a band of weeks wraps the year's end"; §2.8's `hours` comment
adds "whole hours 0–23, both ends included, a > b wrapping midnight"; EI-V11-EDGE-6 adds the case "an `hours` band with
a > b; an edited end outside [0, 23]" with the outcome "wraps midnight; clamped into [0, 23] (V11 §4.1)", and T-V11-45 (v)
adds both fixtures.

### VV1112-r3-07 — minor — BROKEN-REFERENCE — owner V10

**Claim.** VV1112-r2-14's fix deleted V09's `crisis.look.<kind>` catalogue row; each look is now worded by its
`crisis.looks` row's `label` (V11 §3.25.9). V10 still names the key family three times: §1.2's V09 row (l. 202: "the crisis
looks' list and lines (V09 §4.21.12: `crisis.look.<kind>`, `info.crisis.*`)"), T-V10-29 ("every `info.damage.*`,
`info.crisis.*` and `crisis.look.<kind>` key V10 §3.9a and V10 §3.9b (8) render … has a catalogue key in every shipped
locale") and CVR-V10-22 ("the `crisis.look.<kind>`, `info.crisis.*` and `info.damage.*` rows"). V10 §3.9b (8) renders a look
through `info.crisis.line`, so no such key is rendered; the three cite a row that no longer exists (repair-r3-V09's HAND-OFFS
names them for round 4).

**Required change.** V10 l. 202: "(V09 §4.21.12: `crisis.look.<kind>`, `info.crisis.*`)" → "(V09 §4.21.12: `info.crisis.*`,
each look worded by its `crisis.looks` row's `label`, V11 §3.25.9)"; T-V10-29: "every `info.damage.*`, `info.crisis.*` and
`crisis.look.<kind>` key" → "every `info.damage.*` and `info.crisis.*` key"; CVR-V10-22: "the `crisis.look.<kind>`,
`info.crisis.*` and `info.damage.*` rows" → "the `info.crisis.*` and `info.damage.*` rows and each look's `label` (V11
§3.25.9)".

### VV1112-r3-08 — minor — WIRING — owner scope

**Claim.** §13.2's T122-6 (l. 18407 – 18408) gives one statistic for both its clauses: "nothing stands on water, in a
gate's passage or over a label's keep-out, and several crises share the outskirts by `priority` under `densityCap`
(§10.2's placement; `crisis.blocked` 0)". V12 now measures the sharing clause with `crisis.share` (V12 §3.4.2, §3.15.12,
T-V12-54), `crisis.blocked` holding only the placement exclusions. The bar omits the statistic its own clause runs on
(bookkeeping, R3-03 (a)). It composes with scope's VCS-r3-08, whose proposed T122-6 text keeps "`crisis.blocked` 0" alone.

**Required change.** T122-6's parenthesis reads "(§10.2's placement; `crisis.blocked` 0 and `crisis.share` 0)", in
VCS-r3-08's rewritten T122-6 the same.

## Already raised by other verifiers this round (not repeated here)

From the landed r3t results: VCS-r3-02 (V12: T-V12-44 – -47 and -49's heads name no base bar), VCS-r3-05 (V11: T-V11-38 –
-41's heads name no base bar), VCS-r3-08 (scope: T122-6 against `crisis.blocked`; VV1112-r3-08 composes with it), VDC3-01
(determinism: a press of Start a shower now while a spell is in force — V11 §3.25.11's "starts as the next spell" agrees
with its proposed text, so V11 needs no end).

## What was checked, and how

* **The live text** is assemble-r3's output (sha256 equal); the pre-round text git 91f0792. Word diffs of both volumes
  (`git diff --word-diff`) were read hunk by hunk: V11 35 hunks in 14 headings, V12 42 in 12.
* **Round-2 findings** were each read at their home and, where they had one, their second end (V02, V06, V08, V09, V10).
  The pin union was rebuilt from the live text: every "— the `<pin>` registration of <suite> on V12 §3.7.8's engine"
  clause in the set (a search of every volume and the base, V02's line-split T-V2-59 (d) and T-V2-60 (c) read by hand) against V12 §2.13's suites column, §3.7.8's list and X-V12-11.
* **Agreement** of each replaced hunk with its counterparts: base §6.1 (the weather timeline), §7.1 (refusals), §7.7 DR44,
  §10.2 *Crisis looks* (a)–(f), §8.8's ring density, §13.2's T120, T122 and T125 bars, §13.8's tiers; V01 §3.16
  (`disasterSource`, `campLand`); V02's T-V2-58 – -60; V03 §7's damage fixtures and T-V3-39, T-V3-40; V06 §3.23 (2), (4);
  V08 §2.4's census, §3.10's router, §7.1's fixtures, T-V8-59 – -61; V09's `refuse.table.required` and look words; V10's
  look reads.
* **Wiring**: `crisis.share` produced by V12's bench and read by T122-6 and T-V12-54; the two `coversEnum` totality rules
  read by the compile (T-V11-46 (b), T-V11-47 (a)); the census lists `crisis.stressors`, `crisis.archetypes`,
  `crisis.events` produced by V08's build step (V08 l. 709, the manifest's `crisis` object) and read by T-V11-46 (a) at C4b.
* **Edges** of the round's new rules: the live rate at R = 0, the `hours` exclusion and a `light` other than `'time'`
  (defined, tested); the named-row delete (defined, tested in V11; missing at §7.1, VV1112-r3-04); the scale count at
  severities 0, ½, 1 (the disaster's matched targets and fire shortfall, VV1112-r3-01); the `hours` band's end, wrap and
  range (VV1112-r3-06).
* **References** in every added span resolve (an automated pass over each `V0n §x.y` and `§x.y` in the added text; two
  hits were line-split volume prefixes, both resolving). **Ids**: no duplicate among V11's 193 and V12's 185 table-defined
  ids. **Review ids** (R3-02): none in either volume. **Deferral wording**: none in the added text. **Phone clauses**
  (item 126 (a2)): none added.
* **Severity** graded by J141's standard; the INVALID entries of adjudication-r2 and -r3 searched for each new issue (none).

## doc_checks (provisional)

`python3 docs/validation/bench/doc_checks.py --doc <volume> --heads docs/ARCHITECTURE.md`, exit 1 on both. WARNING printed:
"reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs, research/external) —
clean-room results are NOT authoritative"; the counts are provisional.

| check | V11 hits / unreviewed | V12 hits / unreviewed (pre-round → live) |
|---|---|---|
| C1 | 0 / 0 | 8 / 0 → 8 / 0 |
| C2 | 0 / 0 | 0 / 0 → 0 / 0 |
| C3 | 304 / 277 (repair-r3-V11 recorded 302 → 304, the two new common-word phrases) | 141 / 127 → 141 / 127 |
| C4 | 5 / 0 | 2 / 0 → 2 / 0 |
| S1 | 0 / 0 | 0 / 0 → 0 / 0 |
| S2 | 326 / 33 | 113 / 11 → 115 / 11 |

No new unreviewed hit in V12; V11's two new C3 phrases ("by its own row its", "row and the last row") are common words, no
identifier, palette or list.
