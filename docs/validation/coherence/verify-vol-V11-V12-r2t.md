# Verify — coherence pass, round 2: volumes V11 (content) and V12 (calibration) after repair round 2

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-vol-V11-V12-r2t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V11-V12-r2t`, 2026-10-01, cloud checkout; scratch `scratchpad/coherence/v1112r2/`)
- P0 resume check (no LANDED line, no output): fresh start — done
- P1 inputs read (brief whole, its ROUND-2 and ORCHESTRATION NOTES; r1t report and result; adjudication-r2's TOC, R2-05 – R2-17, R2-30 – R2-41 whole, Part H · V11, V12 and the rows of this lane's r1 ids owned elsewhere; repair-r2-V11 and -V12 preambles and block lists; assemble-r2; file g items 121 – 126 with 122 (h)–(i) and 126 (a2); the canon's dated routings J134 – J140 and its adjudication ruling) — done
- P2 live text against assemble-r2 (sha256 V11 7842179a…, V12 74a4bfb3…, both equal to assemble-r2's "after") and the pre-round text (git 91f0792^, 9481453b… and 996dee3b…, assemble-r2's "before") — done
- P3 round-1 findings VV1112-r1-01 – 06 and G121/122/122h/123/124/125 re-checked on the live text — done (16 of 16 closed)
- P4 every subsection the 27 V11 and 24 V12 repair blocks replaced, word-diffed against its pre-round form and every hunk read with its counterparts (base §2.6, §2.9, §6.1, §6.3, §7.7 DR44, §8.2, §8.4 (i), §8.8, §10.2, §13.2, §13.8, §16, INDEX §1; V01, V02, V03, V04, V06, V07, V08, V09) — done
- P5 owner items 120 – 126: V11's parts (122, 122 (h)–(i), 123, 124) and V12's (121 – 126) as new design — wiring, lifecycle, edges, agreement — done
- P6 references, ids, terms, phone clauses, deferral, doc_checks; the other r2t verifiers' results read so as not to repeat their issues — done
- P7 this report, the result file, LANDED — done

## Outcome

**Not clean: 15 issues — 0 blocker, 4 major, 11 minor** (owners: V12 7, V11 3, V08 2, V02 1, V06 1, V09 1). All 16 of
this lane's round-1 findings are closed in the text: the six defect findings fixed as the rulings word them, and the ten
F-MISSING parts of file g items 121 – 125 written at build depth (V11 §3.25.9 – V11 §3.25.11; V12 §3.15.11 – V12
§3.15.16). The new issues are seams of that new design: the weather columns' `hours` outside the live-kind rule
(VV1112-r2-01), V12's register line and measurements lagging the bars they take (VV1112-r2-04 – -07), restating pins not
yet in V12's union (VV1112-r2-08 – -10), V12's fixtures named as V08's that V08 never wrote (VV1112-r2-11), and four
smaller agreement gaps. Ten further defects in this scope's seams were already raised by other r2t verifiers and are
listed, not repeated (below).

| measure | V11 | V12 |
|---|---|---|
| words (wc -w), archive → pre-round → live | 103 331 → 101 947 → 108 745 (+5.2 % on the archive) | 75 054 → 72 151 → 81 679 (+8.8 % on the archive) |
| this round's growth | +6 798 (+6.7 %): items 122 – 124's tables (§3.25.9 – §3.25.11), their types, registry rows 107 – 110, lifecycle, wiring, edge, test and decision rows; the strip margin; the farm-layout column | +9 528 (+13.2 %): items 121 – 126's measurements (§3.15.11 – §3.15.16), two pin kinds, metric, failure, edge, budget, test and decision rows |
| repair blocks applied (assemble-r2) | 27 of 27 | 24 of 24 |
| changed sections read (whole, as diffs against the pre-round text) | 29 headings (27 blocks, §1b inside §1, the title block's R2-07 line) | 25 headings (24 blocks, the title block's R2-07 line) |
| own ids (defined; unique) | T-V11-0 – 48, J-V11.1 – 120, W1 – W90, X-V11-1 – 17 (X-V11-7 deleted by R2-15), EI-V11-EDGE-1 – 6, registry rows 1 – 110 and 58a: each defined once | T-V12-1 – 59, J-V12.1 – 106, X-V12-1 – 20, §3.16.1 rows 1 – 37: each defined once |
| round-1 findings | VV1112-r1-04 fixed; G122-, G122h-, G123-, G124-V11 written | VV1112-r1-02, -03 fixed; G121-, G122-, G122h-, G123-, G124-, G125-V12 written |
| issues this round | VV1112-r2-01 – -03 | VV1112-r2-04 – -08, -12, -13 |

Neither volume shrinks (both grow by owner-item design the guard keeps whole), so no whole-volume nuance audit was due. This
round's cuts — V11's `GrandeurCeilingRow` and `GrandeurCeilingSettings` declarations (now §10.2's, every field present),
the deck stand-in sentence and X-V11-7 (R2-15), the "specified" gloss (R2-14), the "§10.2's example" annotations, the
restated mining test (now §4.2 S1 (10), every clause there) and the row-24 and row-91 field lists (§10.2's
`RosterSettings` and `SquareQuotaRow`, every field present); V12's deck stand-in clause — were each checked against their
homes: no nuance lost.

## Round-1 findings — status on the live text

| id | owner | status | where (live) |
|---|---|---|---|
| VV1112-r1-01 | scope | FIXED (R2-06 (b), R2-17) | §16's content line prices "file g's rows in the first total — … (V11 §8's C2 g share, 1.0–2.0), the wall rows (item 106; C4a, 0.5) and item 110's rows (C3b, 0.75–1.25) — and the rows of items 111, 113–119 and 122–124 (V11 §8's C9, 1.25–2.0), the ladders, the 280 kind rows, item 122's mapping and item 109's rows being on the staged content line (V11 §8's C4b and C8)" — 3.5–5.75 pw, V11 §8's g share; the staged row "the content's staged rows (V11: C4b at M-SF, C8 at M6-U)" and line ≈ 1.85–2.6 = V11's C4b + C8; INDEX §1's V11 row names C4a and C4b and prices 13.6–19.1. V11 §8 re-summed: 13.6–19.1; first total 11.75–16.5; staged 1.85–2.6; g rows 5.35–8.35 — all hold; §16's base subtotal 203.25–278.5, first total 230.75–315.25, staged 187.85–264.1 and whole 418.6–579.35 re-summed from the lines — all hold. V12's W7 1.25–2 and base side 7.25–11 equal §16's rig line and INDEX §1 |
| VV1112-r1-02 | V12 | FIXED (R2-17) | the due map (it stands in §2.8's *Milestone ids*): "C4a `M2b`, C4b `M-SF` (no entry: …), C5 …, C8 `M6-U`, C9 the milestone that lands each owner item's base part (V11 §8; §13.8)"; §12 PLAUSIBLE 11 "at C2's and C4a's exits" |
| VV1112-r1-03 | V12 | FIXED (R2-09) | §3.7.8 (1) names V03's `roomProgram` `exposureAllStoreys`; §2.13's item-110 row: "`item110.terrace`'s overlay also sets V03's `exposureAllStoreys` false …, so the four pins together are V11 §3.24.0's six switches off" |
| VV1112-r1-04 | V11 | FIXED (R2-10) | §2.6's comment lists exactly R2-10's users |
| VV1112-r1-05 | V01 | FIXED (R2-10) | V01 §2.3: `step: LadderStep /* V11 §2.6 */` |
| VV1112-r1-06 | rendering | FIXED (R2-10, ONE FIX with VAH-31 (c)) | §11.2's `WhyAnswer.members.step: LadderStep /* V11 §2.6 */` |
| G121-V12 | V12 | WRITTEN (R2-35, R2-09, R2-36) | §3.15.11: T121-2, -3, -5, -6, -8 on three device fixtures and a threshold fixture; T121-1, -4, -7 named as V09's T-V9-84; §3.4.2, §1b, §1, §2.13 (`item121.display`), §3.12, §3.16 row 32, §6, T-V12-53, J-V12.100, W7's M4 cell, §12 PLAUSIBLE 14. One tier disagreement (VV1112-r2-07) |
| G122-V11 | V11 | WRITTEN (R2-37 (3), R2-35) | §3.25.9: twelve look rows, the `settings` row, the closed `crisis.map` (41 rows), readings, totality, off form; §2.8d's pointer to §10.2's shapes; registry rows 107 – 108; §2.10; §2.1; §2.4; §1; W88; §3.26's EI-V11-EDGE-4 and C-crisis-tables; T-V11-46, T-V11-45 (t); J-V11.118. The symbols are §8.2's rows keyed by V11's `kind` and `band` (R2-37 (3)); §8.2's first bands agree with V11's `band` cells. Two seams: VV1112-r2-02 and the census names (VV78-r2-10, already raised) |
| G122-V12 | V12 | WRITTEN | §3.15.12: `item122.crises` (T122-1, T122-7), `crisis.weeks`, `.stable`, `.scale`, `.blocked`, the raster timing; T-V12-54; J-V12.101; §3.16 row 33. Two clauses short of §13.2's T122-5 and T122-6 (VV1112-r2-06) |
| G122h-V11 | V11 | WRITTEN (R2-37 (3)) | `areaPerHeadM2` 45 ([30, 60] m²), `enginesPerBesiegers` 1 500 ([500, 5 000]) as `CrisisLookSettings` cells with their general provenance; the coalition's spread §10.2 (f)'s rule; the no-size fallback §10.2 (c)'s; T-V11-46 (c); the headcount-0 edge |
| G122h-V12 | V12 | WRITTEN | §3.15.12's four bars on force fixtures (`crisis.areaPerHead` [0.9, 1.1], `crisis.coalition` [1.8, 2.2], `crisis.framing`, `crisis.ring`); T-V12-55; §3.16 row 33. Their fixtures have no producer (VV1112-r2-11) |
| G123-V11 | V11 | WRITTEN (R2-38 (2), (3)) | §3.25.10: fourteen element kinds' ranges inside their states' shares (every range checked: furniture 0.02–0.30 … crypt wall 0.92–1), `defaultAgeYears` 40, the rates by walls material (default row `timber_frame`); §2.8d's types; rows 109 – 110; §2.10; W89; EI-V11-EDGE-5; T-V11-47 (its order clauses hold on the shipped rows); J-V11.119. V06's wording lags (VV1112-r2-15) |
| G123-V12 | V12 | WRITTEN (R2-35, R2-38) | §3.15.13: T123-2 (`damage.nested`), T123-3 (`damage.breakLevel`), T123-7 (`item123.damage`, kind `entityScope`); T123-1, -4, -5, -6 named as V03's, V04's, V06's and V02's; T-V12-56; J-V12.102; §3.16 row 34. Its fixtures re-defined beside V03's (VV34-r2-15, already raised) |
| G124-V11 | V11 | WRITTEN (R2-39 (e), R2-35) | §3.25.11: weather cells per band of weeks for all six biome rows with item 124 (c)'s defaults, the kinds' lengths and hours, four sites for item 124 (c)'s regions, the two hard rules as compile checks with owner-stamped caps (every row's snow entries checked inside its `ice` and `snow` weeks; the arid rain band 6 weeks at 0.3, × 1.3 at a coast ≤ 0.5); §2.8's types; row 43; §2.10; W90; EI-V11-EDGE-6; T-V11-48; J-V11.120; §3.25.6's snow sentence per R2-39 (a). No phone clause. The `hours` gap: VV1112-r2-01 |
| G124-V12 | V12 | WRITTEN (MOOT in part, R2-41) | §3.15.14: `item124.effects` (T124-1, T124-8), `weather.frameMs`, `.snow`, `.aridRain`, `.cover`, `.luma`, `.replay`; T124-5 named as V09's T-V9-87; T-V12-57; J-V12.103; §3.16 row 35; no phone default |
| G125-V12 | V12 | WRITTEN (R2-35, R2-40) | §3.15.15: `port.fallbacks` (T125-1), `item125.host` (T125-2, kind `input`, `customLibrary` retired); T125-3 named as V08's; T-V12-58; J-V12.104; §3.16 row 36. Short of §13.2's "every rung" (VV1112-r2-05) |

G126-V12 (verify-vol-V09-V10's, in this scope): §3.15.16 written with no phone viewport, `refuse.phone` and the narrow
class absent; every phone mention in V11 and V12 states an absence (R2-41 holds).

## Issues

| id | severity | kind | owner | where (short) |
|---|---|---|---|---|
| VV1112-r2-01 | major | EDGE-UNDEFINED | V11 | §3.25.11's `hours` enter neither the live-kind rule nor R: a kind drawn outside its hours has no outcome |
| VV1112-r2-02 | minor | CONFLICT | V11 | §3.25.9's closed mapping has no `occupation` archetype row, which item 122's text and V08 §2.4's census name |
| VV1112-r2-03 | minor | CONFLICT | V11 | §3.1 calls every other cell of items 122–124 calibratable; the two weather caps are owner-stamped |
| VV1112-r2-04 | minor | CONFLICT | V12 | §3.11's items 122–124 line: `priority` (an enumeration), ranges "by material", the weather block left out |
| VV1112-r2-05 | major | EDGE-UNTESTED | V12 | T125-1 "at every rung" measured at TOWN, CITY and the cap only |
| VV1112-r2-06 | major | EDGE-UNTESTED | V12 | §13.2's T122-5 "within its look row's scale" and T122-6's priority-and-cap clause unmeasured |
| VV1112-r2-07 | minor | COHESION | V12 | §6 runs nightly or per milestone the item 121, 123, 124 and 126 bars §13.8 runs at PR |
| VV1112-r2-08 | minor | WIRING | V12 | §2.13's and §3.7.8's pin union lacks V02's T-V2-59 (d), T-V2-60 (c) and V08's T-V8-59, T-V8-61 (b) |
| VV1112-r2-09 | minor | WIRING | V02 | T-V2-59 (d) and T-V2-60 (c) re-run item pins without R2-09's registration clause |
| VV1112-r2-10 | minor | WIRING | V08 | T-V8-59 and T-V8-61 (b) re-run item pins without R2-09's registration clause |
| VV1112-r2-11 | major | WIRING | V08 | X-V12-5's crisis fixtures, force fixtures and required-keys dossier, closed at V08 §7, are not there |
| VV1112-r2-12 | minor | COHESION | V12 | §3.15.12 names V07's village test by no id and omits V03's T-V3-40 and the volumes testing their own parts |
| VV1112-r2-13 | minor | TERM | V12 | "§7.7's condition row" (three times) and "§7.7's history rows (DR36 onward)" in replaced sections (R2-11) |
| VV1112-r2-14 | minor | CONFLICT | V09 | V09's `crisis.look.<kind>` catalogue words the looks otherwise than V11's `label` cells |
| VV1112-r2-15 | minor | CONFLICT | V06 | V06 §3.23 (2) puts every range "in the third of the state"; V11's `upperFloor` spans two |

### VV1112-r2-01 — major — EDGE-UNDEFINED — owner V11

**Claim.** V11 §3.25.11 gives each weather kind `hours` — "the hours of the view's day a spell may start in, read only
under `light: 'time'` (§2.9), so fog and mist come on cool mornings" (`mist` and `fog` 4–11, `shimmer` 10–18) — but its
timeline rule reads "At a week the kinds whose band holds it are live, each at its `perHour` × the largest factor of the
sites …; with R their sum, the clear time after a spell (and from the map's opening) is exponential with mean 3 600 ÷ R s,
the next kind is k with chance perHour_k ÷ R". `hours` enters neither R nor the kind's chance, so when a gap ends at a
view hour outside the drawn kind's hours (fog drawn at 14:00 under `light: 'time'`) the spell "may" not start and nothing
says whether it is dropped, deferred to the next admitted hour or redrawn; EI-V11-EDGE-6 covers only "a `light` other than
`'time'`". The base end is verify-determinism-r2t's VDC2-01 (§6.1 *The weather stream*: liveness including the kinds'
`hours`, the gap spent at the live rate); V11's own rule must say the same (R2-05).

**Required change.** In V11 §3.25.11's *The columns* bullet replace "At a week the kinds whose band holds it are live,
each at its `perHour` × the largest factor of the sites that apply (below); with R their sum, the clear time after a spell
(and from the map's opening) is exponential with mean 3 600 ÷ R s, the next kind is k with chance perHour_k ÷ R" with "At
a moment the kinds whose band holds the view's week and — under `light: 'time'` — whose `hours` hold the view's hour are
live, each at its `perHour` × the largest factor of the sites that apply (below); with R their sum, the clear time after a
spell (and from the map's opening) is spent at that live rate (§6.1: a unit exponential spent as the integral of R ÷ 3 600
over view time, none spent while R is 0), and the next kind is k with chance perHour_k ÷ R at the moment the gap ends". In
*The kinds*' head, "`hours` the hours of the view's day a spell may start in" → "`hours` the hours of the view's day in
which the kind is live". EI-V11-EDGE-6 adds the case "a kind whose `hours` exclude the view's hour" with the outcome "not
live then: it adds nothing to R and is never drawn at that hour", and T-V11-45 (v) adds that fixture.

### VV1112-r2-02 — minor — CONFLICT — owner V11

**Claim.** V11 §3.25.9's `archetype` rows hold twenty-two words and no `occupation`. Item 122's *What SettlementForge
gives* lists `occupation` among `activeConditions[]`'s archetypes ("war_pressure, famine, plague,
regional_migration_pressure, rebellion, occupation, reconstruction, …"), and V08 §2.4's crisis census lists `occupation`
among the archetypes the line defines (l. 704). The closed table claims "every SettlementForge stressor type and condition
archetype has one row", and V11 §12 states the twenty-two as the list; a census carrying `occupation` fails the build at
T-V11-46 (a) on a word both the owner's text and the port name.

**Required change.** V11 §3.25.9's `archetype` row adds "`occupation` → `occupation`" (item 122 (b)'s occupation, read
beside `vassal_extraction`); V11 §12's CONFIRMED line "the twenty-two condition archetypes the port's research lists"
reads "the twenty-two condition archetypes the port's research lists and `occupation`, which item 122's text and V08 §2.4's
census name".

### VV1112-r2-03 — minor — CONFLICT — owner V11

**Claim.** V11 §3.1's never-calibrated list ends "Every other row of items 111–119 and 122–124 is calibratable but for its
enumeration columns (V11 §3.25.9, V11 §3.25.10), its register entry V12 §3.11's." Row 43's two item-124 caps,
`aridRainMaxPerHour` and `aridRainMaxWeeks`, are no enumeration and are `calibratable: false` (provenance `owner`,
`ownerRule: '124 (c)'`, V11 §3.25.11). The sentence states them calibratable, with a register entry.

**Required change.** In V11 §3.1 replace "is calibratable but for its enumeration columns (V11 §3.25.9, V11 §3.25.10)" by
"is calibratable but for its enumeration columns (V11 §3.25.9, V11 §3.25.10) and row 43's two owner-stamped weather caps
`aridRainMaxPerHour` and `aridRainMaxWeeks` (item 124 (c); V11 §3.25.11)".

### VV1112-r2-04 — minor — CONFLICT — owner V12

**Claim.** V12 §3.11 (new this round): "The look cells of items 122, 123 and 124 — item 122's look rows' `scale`,
`priority` and `lookLevel` and its settings …, item 123's threshold ranges by element kind and material, its decay rates
by material and its default age, item 124's climate rows' weather columns (V11's rows) — take the default line". (a)
`priority` is an enumeration, `calibratable: false` (V11 §3.25.9: "`kind`, `label`, `place`, `band` and `priority` are
enumerations"), so it takes no entry. (b) Item 123's ranges are by element kind only (V11 §3.25.10's `damage.elements`;
R2-38 (2)); "and material" names a key no row has. (c) The climate table's `settings.weather` block — the kinds' `lengthS`
and `hours`, the four sites' factors and `forestShareMin` — is calibratable with its entries "V12 §3.11's" (V11 §3.25.11:
"The numbers but the two caps … are `own` and calibratable"), but V12 names only the climate rows' weather columns, so the
register lint (T-V12-20) meets those cells with no line.

**Required change.** In V12 §3.11 replace "item 122's look rows' `scale`, `priority` and `lookLevel`" by "item 122's look
rows' `scale` and `lookLevel`", "item 123's threshold ranges by element kind and material" by "item 123's threshold ranges
by element kind", and "item 124's climate rows' weather columns (V11's rows)" by "item 124's climate rows' weather columns
and the climate table's `settings.weather` block — the kinds' `lengthS` and `hours`, the site factors and
`forestShareMin` — but not its two owner-stamped caps (V11 §3.25.11)".

### VV1112-r2-05 — major — EDGE-UNTESTED — owner V12

**Claim.** §13.2's T125-1 reads "a dossier holding only SettlementForge's required keys generates a full map at every
rung", and §13.8 schedules "T125-1's required-keys dossier at every rung nightly". V12, which takes T125-1 (T-V12-58), runs
the required-keys dossier "at TOWN, CITY and the METROPOLIS cap" only (V12 §3.15.15, §6's item-125 row, T-V12-58), and
§3.16 row 36 lists "every rung" as a case with no outcome for THORP, HAMLET and VILLAGE. No unit tests a required-keys
dossier below 1 500 people, where the missing fields' fallbacks run through the village product's readings (V07).

**Required change.** V12 §3.15.15's T125-1 bullet: "at TOWN, CITY and the METROPOLIS cap" → "at every rung — THORP,
HAMLET and VILLAGE through the village product (V07; the port routes a sub-1 500 dossier there), TOWN, CITY and the
METROPOLIS cap"; §6's item-125 row the same rungs; T-V12-58: "`port.fallbacks` is 0 at TOWN, CITY and the cap" → "is 0 at
every rung, THORP to the METROPOLIS cap"; §3.16 row 36's outcome adds "at every rung, the village rungs through V07's
product: a full map with every fallback reported".

### VV1112-r2-06 — major — EDGE-UNTESTED — owner V12

**Claim.** §13.2's T122-5 asks "each tier's fixture at a low and a high severity within its look row's scale", and T122-6
adds "several crises share the outskirts by `priority` under `densityCap`". V12 takes both (T-V12-54), but `crisis.scale`
counts only the steps at which "a look's drawn extent … falls" as rung or severity rises, and `crisis.blocked` only marks
on water, a carriageway, a gate's passage or a keep-out; T-V12-54's planted cases are a smaller CITY camp and a shrinking
camp. A look drawn at twice its row's `scale` cell, a refugee camp placed before the siege camp, or camps together past
`densityCap` pass every V12 statistic.

**Required change.** V12 §3.15.12's T122-5 bullet adds: "and, at each rung and at severities 0, ½ and 1, each look's drawn
extent — camped ground in m², else its share of its place's units — equal to its row's `scale` at that severity (linear
between its two ends) within 5 %, the ring remainder counted at §8.8's density (`crisis.scale`'s second count, 0 by rule)";
the T122-6 bullet adds: "and, on a fixture standing a siege, a quarantine and a refugee wave at once at CITY and the
METROPOLIS cap, the camp looks taking the outskirts in `priority` order, each from what the earlier left, together at most
`densityCap` of the outskirts' free land, the rest on the ring (`crisis.share`, 0 by rule)". §3.4.2's `crisis.*` row,
§3.12's item-122 failure row and T-V12-54 add the two counts with their planted cases (a camp drawn at double its row's
cell; a refugee camp placed before the siege; the camps together past `densityCap`). (This composes with
verify-rendering-r2t's VRC2T-04 on T122-6's carriageway clause.)

### VV1112-r2-07 — minor — COHESION — owner V12

**Claim.** V12 §3.15's head says "Tiers and milestones are §13.8's", yet V12 §6 runs at nightly or milestone tiers bars
§13.8 schedules at PR: §13.8 runs T121-1, T121-4 – T121-7 "PR on volume 9's app harness" (T121-5 among them) while V12
§3.15.11 and §6 measure T121-5 in "§12.1's timing phase, ≤ 20 min wall per milestone run"; §13.8 runs T123-1 – T123-7 "PR
on B-PLAN's damage fixtures" while §6 runs `damage.*` "≤ 5 CPU-min nightly … every fourth level nightly"; §13.8 runs T124-1,
T124-3 – T124-5, T124-8 and T124-9 at PR and T124-6 and T124-7 in "§12.1's timing phase and the visual-regression run"
while §6 runs every `weather.*` statistic nightly; §13.8 runs T126-1 – T126-3 "PR on volume 9's app harness" while §6 runs
item 126 "≤ 5 min wall nightly".

**Required change.** V12 takes §13.8's tiers. §3.15.11: "This volume measures the other five clauses, from M4 (§16), on
V09's app harness in §12.1's timing phase" → "… on V09's app harness — T121-2, T121-3 and T121-8 in §12.1's timing phase,
T121-5 at PR (§13.8)"; §6's item-121 row adds "T121-5's captures at PR, each level on one device fixture". §6's item-123
row: "PR on the damage fixtures (the 21 levels); H-100's decay runs nightly from M6-E". §6's item-124 row: "PR for T124-3,
T124-4 and T124-9 (one climate row per run, rotating; every row nightly); `weather.cover` and `weather.luma` in the timing
phase and the visual-regression run; the pin's suites nightly". §6's item-126 row: "PR on V09's app harness (each tool's
script from the milestone that lands it)".

### VV1112-r2-08 — minor — WIRING — owner V12

**Claim.** R2-09: V12 §2.13's pin rows and §3.7.8's list are exactly the union of the volumes' registering clauses.
Beyond V03's T-V3-39 (g) and T-V3-40 (f) (verify-vol-V03-V04-r2t's VV34-r2-15), four landed volume tests re-run item pins
on their own fixtures and appear nowhere in V12: V02's T-V2-59 (d) (`item123.damage`: "at level 0 every tile
byte-identical to the same fixture without item 123 … the `item123.damage` pin is V12's") and T-V2-60 (c)
(`item122.crises`: "with no condition and no preview every tile byte-identical to stage 3 without item 122 … its pin is
V12's"), V08's T-V8-59 (`item122.crises`: "with no condition and no preview the tiles are byte-identical to the base") and
T-V8-61 (b) (`item125.host`: "every fixture offered with and without a host context yields the identical document and
model digest"). V12 §2.13's `item122.crises` suites read "the golden suite; V12's crisis fixtures", `item123.damage`'s
volume suite is V04's alone, and `item125.host`'s "B-DOSSIER-lite (base); V12's item-125 fixtures".

**Required change.** V12 §2.13's suites column: `item122.crises` adds "the look fixture's exteriors (V02, T-V2-60 (c));
the frozen dossier set's crisis conditions (V08, T-V8-59)"; `item123.damage` adds "the damage sub-fixture's exteriors
(V02, T-V2-59 (d))"; `item125.host` adds "the frozen dossier set through the port (V08, T-V8-61 (b))". V12 §3.7.8's list
adds "V02's T-V2-59 (d) and T-V2-60 (c)" beside T-V2-50 and "T-V8-59 and T-V8-61 (b)" beside V08's T-V8-50 and T-V8-53,
and X-V12-11 the same ids (VV1112-r2-09 and -10 are their sending ends).

### VV1112-r2-09 — minor — WIRING — owner V02

**Claim.** R2-09: "A volume test that re-runs a no-op or rung pin states, in one clause, '— the `<pin>` registration of
<suite> on V12 §3.7.8's engine (V12 §2.13), written by <seat>'." V02's T-V2-59 (d) re-runs T123-7's no-op and T-V2-60 (c)
T122-7's on V02's own fixtures, each saying only "the pin is V12's" — registering nothing, so V12's union cannot list them.

**Required change.** T-V2-59 (d) reads "… at level 0 every tile byte-identical to the same fixture without item 123
(T123-7's no-op) — the `item123.damage` registration of the damage sub-fixture's exteriors on V12 §3.7.8's engine (V12
§2.13), written by the seat landing V02's item-123 exterior step"; T-V2-60 (c)'s parenthesis reads "— the `item122.crises`
registration of the look fixture's exteriors on V12 §3.7.8's engine (V12 §2.13), written by the seat landing V02's
ruined-look step".

### VV1112-r2-10 — minor — WIRING — owner V08

**Claim.** T-V8-59's last clause ("with no condition and no preview the tiles are byte-identical to the base
(`item122.crises`'s fixture; the pin is V12's)") and T-V8-61 (b) ("yields the identical document and model digest (the
`item125.host` pin is V12's)") re-run item 122's and item 125's pins on V08's fixtures without R2-09's registration clause.

**Required change.** T-V8-59's clause ends "— the `item122.crises` registration of the frozen dossier set's crisis
conditions on V12 §3.7.8's engine (V12 §2.13), written by the SF4 seat"; T-V8-61 (b)'s parenthesis reads "— the
`item125.host` registration of the frozen dossier set on V12 §3.7.8's engine (V12 §2.13), written by the SF3 seat".

### VV1112-r2-11 — major — WIRING — owner V08

**Claim.** X-V12-5 (V12 §10.2) names, closed at "V08 §7", V08's **crisis fixtures** (conditions standing through part of
the year with their severities, the calamities' targets), **force fixtures** (single armies, a two-army coalition, a
migrant group, an oversized siege) and **required-keys dossier**; V12 §3.15.12 – §3.15.15, T-V12-54, T-V12-55, T-V12-58 and
§12 PLAUSIBLE 14 run on them as "V08's", and §13.8 schedules "volume 8's dossier crisis and force fixtures from M-SF". V08
§7 defines none of them: its fixtures are §13.2's frozen dossier set plus test-side mutations, its one force mutation is
T-V8-60's `city-1` with "two armies of one coalition and a travelling group", and its required-keys reduction is T-V8-61
(a)'s of `town-1` alone. T-V12-55's four owner bars (single armies of 1 000, 4 000 and 12 000 heads at TOWN, CITY and the
cap; a coalition of two armies of 4 000 beside one army of 4 000; a migrant group of 3 000; a 60 000-head THORP siege) and
the dossier crisis fixtures of T-V12-54 have no producer — a dangling input of three owner-item bar sets.

**Required change.** V08 §7.1's fixtures sentence adds: "V12's item-122 and item-125 fixtures are test-side mutations made
here (X-V12-5), each in §13.2's frozen manifest: the **crisis fixtures** — on `town-1`, `city-1` and `metropolis-3`, a siege
by a two-army coalition, a refugee wave, a plague with its affected quarter, a famine, a fire, a flood and an earthquake by
their calamities and an occupation, each standing through part of the year at its severity, the calamities' `targets`
resolved (V08 §3.16 (7)); the **force fixtures** — under T-V8-60's test adapter version, single armies of 1 000, 4 000 and
12 000 heads, a coalition of two armies of 4 000 beside one army of 4 000 and a migrant group of 3 000, each at TOWN, CITY
and the METROPOLIS cap, and a 60 000-head siege of a THORP; the **required-keys dossier** — T-V8-61 (a)'s reduction made of
a dossier at every rung (V12 §3.15.15)". (The fire, flood and earthquake fixtures draw their disaster look once
verify-pipeline-r2t's VPC-R2-03 gives a calamity its overlay reading.)

### VV1112-r2-12 — minor — COHESION — owner V12

**Claim.** V12 §3.15's head: this section "names the owner of every other clause". §3.15.12 names V09's T-V9-85 and V06's
T-V6-75 by id, but cites V07's part only as "its village test taking T122-5 and T122-6 there" (it is T-V7-69, the id V12's
own hand-off asked V07 to name) and omits V03's T-V3-40 (the plan clauses of T122-1 – T122-3) and the volumes §13.2 lists
as testing their own parts — V01's T-V1-60, V02's T-V2-60, V08's T-V8-60, V10's T-V10-52.

**Required change.** §3.15.12's second sentence ends "… V09's T-V9-85 takes T122-2's interface clause, V06's T-V6-75
T122-1's hand-over clause and V03's T-V3-40 the plan clauses of T122-1 – T122-3; V01's T-V1-60, V02's T-V2-60, V08's
T-V8-60 and V10's T-V10-52 test their own parts"; "(at the village rungs V07's village fixtures, its village test taking
T122-5 and T122-6 there)" → "(at the village rungs V07's village fixtures, V07's T-V7-69 taking T122-5's and T122-6's
village clauses there)".

### VV1112-r2-13 — minor — TERM — owner V12

**Claim.** R2-11: §7.7's rows are cited by number. In subsections this round replaced, V12 still writes "§7.7's condition
row" for DR41 — §3.11's item-114 line twice ("§7.7's condition row from readiness and wealth"; "where §7.7's condition row
lands") and T-V12-47's milestone cell ("with §7.7's condition row and the state rows") — and §1b's dossier table "§7.7's
history rows (DR36 onward)", which runs on into DR40 – DR44, none of them a history row.

**Required change.** V12 §3.11's item-114 line: "§7.7's condition row" → "§7.7's DR41" (both places); T-V12-47: "with §7.7's
condition row and the state rows" → "with §7.7's DR41 and the state rows"; §1b: "§7.7's history rows (DR36 onward)" →
"§7.7's history rows DR36 – DR39".

### VV1112-r2-14 — minor — CONFLICT — owner V09

**Claim.** The look kinds' display words have two homes with different words. V11 §3.25.9's `crisis.looks` rows carry
`label` cells under V11 §3.1's display-cell rule (file f item 516: every table the UI shows rows of carries a `label`) —
"Siege camps", "Blockade camps", "Quarantine camp", "Refugee camp", "Occupation", "Famine", "Beast attacks", "Raiders",
"Ruined quarters", "Barricades", "Building boom", "Shuttered shops" — read by V09's Show crises preview list and Find's list
of looks (V11 registry row 107, W88). V09's catalogue row `crisis.look.<kind>` (V09 §4.9, l. 2183) words the same kinds
otherwise — "Siege camp", "Blockade", "Beast attack", "Disaster", "Rebellion", "Hard times" — and V09 §4.21.12 (2), the why
lines' `{look}` slot, the crisis card, the legend and Find's crisis rows read it; T-V9-15's walker requires the row.
verify-pipeline-r2t's VPC-R2-12 gives §10.2's `CrisisLookRow` its `label`; V09's row is the remaining second home.

**Required change.** V09 deletes the `crisis.look.<kind>` catalogue row and words each look by its `crisis.looks` row's
`label` (V11 §3.25.9; V09 §2.3's `labelCell`, as for the other display tables): V09 §4.21.12 (2)'s "each worded
`crisis.look.<kind>`" → "each worded by its row's `label` (V11 §3.25.9)", the `{look}` slot of `info.crisis.*`, the crisis
card, the legend's crisis entries and Find's crisis rows the same; T-V9-15's clause "every `CrisisLookRow.kind` of §10.2's
table has its `crisis.look.<kind>` row" is dropped.

### VV1112-r2-15 — minor — CONFLICT — owner V06

**Claim.** V06 §3.23 (2): "Each state owns a third of the range … so item 123 (c)'s look of each state holds whatever the
years, V11's range for each element kind lying in the third of the state whose look item 123 (c) gives it." Item 123 (c)
gives the upper storeys a look in two states (`decayed`: "rotten floor patches and holes"; `ruined`: "upper storeys mostly
floorless"), and V11 §3.25.10's `upperFloor` range 0.40–0.95 spans the `decayed` and `ruined` thirds (its `states`
`decayed, ruined`; T-V11-47 (a): "inside the shares of its `states`"; J-V11.119). V06 states a constraint the lawful V11 row
breaks; V11's repair handed the wording to V06, which had landed.

**Required change.** V06 §3.23 (2): "V11's range for each element kind lying in the third of the state whose look item 123
(c) gives it" → "V11's range for each element kind lying inside the shares of the states whose looks item 123 (c) give it
(V11 §3.25.10's `states`; the upper floor's across `decayed` and `ruined`)".

## Already raised by other verifiers this round (not repeated here)

Each is a defect at this scope's seams, with its fix as worded there: verify-pipeline-r2t VPC-R2-01 and verify-determinism-r2t
VDC2-09/10, verify-vol-V05-V06-r2t VV56-r2-08 (§10.2 (b) and DR44's "the regional_* pressures `none`" against V11's
`regional_migration_pressure` → `refugeeCamp`); VPC-R2-03 = verify-vol-V07-V08-r2t VV78-r2-09 (no overlay ever reads V11's
`event` row `calamity`, so a dossier calamity never draws the disaster look); VPC-R2-12 (§10.2's `CrisisLookRow` lacks V11's
`label`) and VPC-R2-13 (V11's W77 and §2.3 lists omit the crisis looks); VV78-r2-10 (V11's census list names
`sf.stressors@<line>` / `sf.conditionArchetypes@<line>` against V08 §2.4's `crisis.stressors` / `.archetypes`, `events`
unchecked, row 77's readers); VDC2-01 (§6.1's gap at R = 0 and its inputs: the sites and the hour — VV1112-r2-01 is V11's
end); VDC2-04/05 and verify-vol-V09-V10-r2t VV910-r2-01 (Start a shower now in a week with no live kind: V09's dust haze
against V11's "starts none"); VDC2-06 (§6.3's "range by material"); verify-model-r2t VM-R2T-02 (§2.6 step 7's restated level
and comparison); verify-vol-V03-V04-r2t VV34-r2-15 (V12 §3.15.13's damage fixtures re-defined beside V03 §7's; V03's
T-V3-39 (g) and T-V3-40 (f) missing from V12's pin union) and VV34-r2-12 (their V03 end); verify-rendering-r2t VRC2T-04
(V12's T122-6 carriageway clause against the barricades). Findings ruled INVALID in any adjudication are not reopened.

## What was checked, and how

1. **Assembly.** The live V11 and V12 equal assemble-r2's "after" hashes; the pre-round text is git 91f0792^ (equal to
   its "before"). Every heading of both volumes was diffed: 29 V11 and 25 V12 sections changed (the 27 and 24 blocks, §1b
   inside V11 §1's block, and the title blocks' R2-07 lines), no other section moved; each hunk was read with the text it
   names.
2. **Rulings applied in this scope.** R2-06 / R2-17 (V11 §8, §16, INDEX, V12's due map); R2-07 (V11 l. 12, V12 l. 8, the
   subset lists "items 111, 113–119 and 122–124"); R2-08 (T-V11-42 takes T117-3; T-V12-48, -50, -52 – -59 name their base
   bars); R2-09 (V12 §2.13 and §3.7.8 — the item-110 six switches, T-V5-34 – 36, T-V7-63, T-V7-68, T-V4-82 (g); the new pins
   `item121.display` … `item126.resize`; the kinds `entityScope` and `input`); R2-10 (`LadderStep`'s users; §11.2's
   `RuleAnswer`, `WhyPull`, `FieldDrivers` in V11 and V12); R2-11 (V11's DR41 – DR43; V12's dossier table — residue
   VV1112-r2-13); R2-12 (`UnderOpeningRow`: 0 bare `OpeningRow` in V11); R2-13 (V11 rows 24, 91 and §2.8d cite §10.2);
   R2-14 (W83, §3.25.4); R2-15 (no deck stand-in in V11 or V12); R2-16 (V11 §3.6.1, §2.1's `interp`); R2-26 (d)
   (`stripMarginM` 1 m, [0, 3] m, in V11 §3.24.2, row 80, §2.10, W50, T-V11-1 (a), §8; V12 §3.11's line; base §4.6 S8,
   V01, V06, V07 read it); R2-28 (V11 §3.23.1, §3.23.6; V12 §3.11's `accessForecastMin`); R2-30 (V12's `view.limitStop`,
   §3.15.6, T-V12-48); R2-32 (Find at M5 in V12 §6, §8, T-V12-52); R2-35 – R2-41 (the G-parts above).
3. **Owner items as new design.** V11 §3.25.9 – §3.25.11 and V12 §3.15.11 – §3.15.16 read whole against items 121 – 126's
   text, the canon's routings and R2-35 – R2-41: every look row's scale cells re-derived as headcount × 45 m² and checked
   non-decreasing by rung; every damage range checked inside its states' shares and against T-V11-47's order clauses;
   every weather row checked against the two hard rules and the kinds' fades (§8.4 (i): 5 s showers, 60 s fog, mist, dust
   and cloud cover); §8.2's crisis look rows' first bands against V11's `band` cells; V12's statistics against §13.2's
   T121-n – T126-n texts and §13.8's tiers; V12's §2.13 rows against every volume test naming an item-120 – 126 pin.
4. **Ids, references, terms, deferral.** Ids above: unique; the one gap (X-V11-7) is R2-15's deletion and nothing cites it.
   Every cited test id (T-V1-60, T-V2-59, T-V2-60, T-V3-39, T-V3-40, T-V4-82, T-V5-34 – 36, T-V6-61, -62, -74 – 76, T-V7-63,
   -68, -69, T-V8-59 – 62, T-V9-22, -84 – 87, T-V10-52, -53, R12-35 – 38) is defined. No retired term ("C4" alone, "V10
   §2.13's `RuleAnswer`", "§7.7's calendar row", `OpeningRow`, `raised.vaultShare` outside its name map) outside
   VV1112-r2-13's residue; no deferral wording in the new text; every phone mention states an absence.

## doc_checks (provisional)

`python3 docs/validation/bench/doc_checks.py --doc <volume> --heads docs/ARCHITECTURE.md` on both live volumes. The tool
warns: "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs,
research/external) - clean-room results are NOT authoritative; re-run on the machine that holds the corpus before any
freeze" — so these counts are provisional (exit 1 on unreviewed rows, as in earlier rounds).

| check | V11 hits (unreviewed) | V12 hits (unreviewed) |
|---|---|---|
| C1 | 0 (0) | 8 (0) |
| C2 | 0 (0) | 0 (0) |
| C3 | 302 (275) | 141 (127) |
| C4 | 4 (0) | 2 (0) |
| S1 | 0 (0) | 0 (0) |
| S2 | 313 (33) | 113 (11) |

Every unreviewed S2 hit is a volume-qualified pointer (V11 §3.24 – §3.26, V09 §4.14, V09 §4.20, V06 §6.7 …) the tool reads
against the base's heads (each checked by script; none broken). The new C3 hits are runs of our own words and numbers
(the weather bands, the damage ranges, ordinary phrases), no identifier, palette, grammar or word list; they stand
provisional with the corpus.
