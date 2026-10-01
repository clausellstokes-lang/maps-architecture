# Verify — coherence pass, round 1: volumes V11 (content) and V12 (calibration) after repair round 1

> PENDING FABLE REVIEW — written by opus standing in for the seat coherence/verify-vol-V11-V12-r1t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V11-V12-r1t`, 2026-10-01, cloud checkout; scratch `scratchpad/coherence/v1112r1/`)
- P0 resume check (no LANDED line, no output): fresh start — done
- P1 inputs read (brief whole; r0s report and result; repair-r1-V11, repair-r1-V12 preambles and block lists; assemble-r1) — done
- P2 live text against assemble-r1 (sha256 V11 9481453b…, V12 996dee3b…, both equal to assemble-r1's "after") and the pre-round text (git 3f0e02b, sha256 3e4febee… and 70d691f5…, assemble-r1's "before") — done
- P3 round-0 findings VV1112-01 – 19 re-checked on the live text — done (19 of 19 fixed in text)
- P4 every subsection the 29 V11 and 25 V12 repair blocks replaced, word-diffed against its pre-round form and every hunk read with its counterparts in the base and the other volumes — done
- P5 other units' round-0 findings fixed inside V11/V12 (VAF-R0S-05/07/19/25/29, VAH-27/30/32, VAP-08/16/17/21/26 – 31, VEL0-11, VM-R0S-16/21, VPC-10/13, VRC0S-23, VV56-26/27/28) — done
- P6 owner items: 114–119 parts not undone; item 120 against (a)–(k); items 121–125 F-MISSING — done
- P7 references, ids, terms, deferral, doc_checks — done
- P8 this report, the result file, LANDED — done

## Outcome

**Not clean: 16 issues — 0 blocker, 11 major, 5 minor** (owners: V12 8, V11 5, scope 1, V01 1, rendering 1 — of which
10 are the F-MISSING parts of file g items 121–125, which no round-1 repair carried). Every one of this lane's 19 round-0
findings is fixed in the text, none wrongly; the repairs of both volumes are faithful and lose no nuance; item 120's V11
and V12 parts are present at build depth. The six other issues are new problems at seams the round-1 repairs moved: V11's
C4 split not followed by §16, INDEX and V12 (VV1112-r1-01, -02), V11's sixth item-110 switch not followed by V12's pin
list (VV1112-r1-03), and the named `LadderStep` type half adopted (VV1112-r1-04 – -06).

| measure | V11 | V12 |
|---|---|---|
| words (wc -w), archive → pre-round → live | 103 331 → 99 184 → 101 947 (−1.3 % from the archive) | 75 054 → 68 509 → 72 151 (−3.9 % from the archive) |
| this round's growth | +2 763 (+2.8 %): item 120's lexicon, six J rows, the required-row rule, `grandClasses`, the clear-span cell, the C4 split | +3 642 (+5.3 %): item 120's bars, item 119 (a2), `D5PairStaged` restored, the pin census, typed `T117i` specs |
| repair blocks applied (assemble-r1) | 29 of 29 | 25 of 25 |
| replaced sections read (whole, as diffs against their pre-round text) | 31 headings | 25 headings (§3.15 retitled 111–119 → 111–120) |
| own ids (defined; unique; gaps) | J-V11.1–117, T-V11-0–45, W1–W87, X-V11-1–17, EI-V11-EDGE-1–3: unique, no gaps | J-V12.1–98, T-V12-1–52, X-V12-1–19, §3.16.1 rows 1–31: unique, no gaps |
| round-0 findings | 11 of 11 fixed | 8 of 8 fixed |
| issues this round | VV1112-r1-04; G122-, G122h-, G123-, G124-V11 | VV1112-r1-02, -03; G121-, G122-, G122h-, G123-, G124-, G125-V12 |

Neither volume shrinks by more than half against its archive, so no whole-volume nuance audit was due; this round's cuts
(≈ 60 words in V11: canon ids, the restated S11 draw, the plinth and skirt values, the restated `RaisedKind`; in V12 the
five removed V06 X ids and superseded wordings) were each checked against their new homes (below).

## Round-0 findings — status on the live text

| id | owner | status | where it is fixed (live) |
|---|---|---|---|
| VV1112-01 | V11 | FIXED | W76: "§14 `@plat/tables` (file f item 505)" |
| VV1112-02 | V11 | FIXED | W78's produced-by cell (V11 §3.24.2's values, file f item 244's span rule and support step; item 245's snap; "the seat landing item 244 at M3a"); §2.10's exception row; row 80's source cell; §2.8c's `span` comment (file f item 244) |
| VV1112-03 | V11 | FIXED | no canon finding or conflict id remains in V11 (a scan of every id form; only the `EI-V11-EDGE-n` row keys, which the finding exempted, now cited as "V11 §3.26's row …"); "C4-05" gone; V12 carries none |
| VV1112-04 | V11 | FIXED in V11 | §4.1: "the one owner rule a table edit can meet is item 110 (b)'s rung gate …; a stamped cell is edited like any cell — its stamp binds calibration runs, fallbacks and corpus packs, never a user's edit". The base §7.1 row and V09 §4.9 still refuse a stamped cell: already raised by verify-determinism-r1t (VDC1-01 and its V09 finding) |
| VV1112-05 | V11 | FIXED | §10c's CVR-V10-6 row: "V11 §2.4 (the family union …)" |
| VV1112-06 | V12 | FIXED | §3.15.9 (4) reads V11 §3.25.8's `perf.qualitySpend` rows (`gainBar`, `gain`, `run`) and fails a stage above its §12 target with no row standing; §3.12's failure row, J-V12.92, T-V12-50, §1b's wiring row and §8.3 risk 14 agree; V11 row 106's reader `testkit.bench` now has its other end; base R12-33 cites the same record |
| VV1112-07 | V12 | FIXED | §3.11's span-rule line ("their values V11 §3.24.2, J-V11.97 …; `span.vaultShare`"); X-V12-19 |
| VV1112-08 | V11 | FIXED | §2.8c's comment and X-V11-10 read `span.vaultShare`; `raised.vaultShare` survives only in §3.24.2's name map and T-V11-1 (a), as intended |
| VV1112-09 | V11 | FIXED (with a new disagreement) | `GrandeurCeilingSettings.grandClasses` (§2.8d), §3.25.4's `settings` bullet (`manor`, `tower_house`, `castle`, `palace`, `v.manor_house`, each a live key), row 97 (named row; reader port.digest), W83, §2.10, T-V11-41 (a), J-V11.114; V08 §3.16 (3) (a) reads it. The rewritten "Specified" clause narrows V08's (b) to a seigneurial government: already raised by verify-vol-V07-V08-r1t (VV78-04) |
| VV1112-10 | V11 | FIXED | §8's C0 row "V11 §2.1–V11 §2.2, V11 §3.2"; J-V11.96 "V11 §2.1" |
| VV1112-11 | V12 | FIXED | §2.8 declares `type D5PairStaged` with every field of the archive (FM, VG, DW, AB with `purpose`, `water`, `a`, `b`, SOLO with `recipe`); base §13.6's `D5Pair` names it; T-V12-17 round-trips the five variants |
| VV1112-12 | V11 | FIXED | §3.24.2's *The calibration minima* bullet (0.02 and 1, `ownerRule: '110 (b)'`, J-VI.10; "a user's edit may") |
| VV1112-13 | V12 | FIXED | §3.4.2's `void.*` row: "per deep void (a connected component of a system's parts of positive area whose tops lie deeper than `DigRule.reachM` below every footprint over them)"; §2.7b's comment points to it; X-V12-13 cites it for V04's T-V4-54 |
| VV1112-14 | V12 | FIXED | §2.13: `item111.water` "V11 §3.24.0's `climate` dry-cell off form (the six cells)", `item113.history` "`history.replay` false", `item114.condition` "`walls.condition` off form"; §3.7.8 (1) names those rows |
| VV1112-15 | V12 | FIXED (one stale name) | §12 PLAUSIBLE 11 and 12 hold the seven assumptions; item 11's "C2's and C4's exits" now names a milestone V11 no longer has (VV1112-r1-02) |
| VV1112-16 | V11 | FIXED | §3.25.4's stamp bullet (every row `calibratable: false`), §3.25.7's head (every column of rows 102–105), §2.8d's head, §3.1's never-calibrated list, T-V11-41 (a), T-V11-43, J-V11.101; V12 §3.11 agrees (rows 97 and 102–105 enumerations; the default line item 117's rows 98–101 only) |
| VV1112-17 | V12 | FIXED | §3.15.1 T-V9-71, §3.15.3 T-V9-73, §3.15.4 T-V9-74, §3.15.5 T-V9-75, §3.15.6 T-V9-76, §3.15.7 T-V9-77, §3.15.8 T-V9-78, §3.15.9 (3) T-V9-79 — each id defined in V09 |
| VV1112-18 | V12 | FIXED | §2.13's `item115.ceiling` suites "H-100 over epochs at TOWN and above (V06, T-V6-74)"; X-V12-15 lists -62 and -72 (V06 §8 registers exactly the ids X-V12-15 lists) |
| VV1112-19 | V11 | FIXED | §3.24.1 and J-V11.75: "the M4 panel's M4-110 group"; no "M4-110's panel" remains |

## Issues

| id | severity | kind | owner | where (short) |
|---|---|---|---|---|
| VV1112-r1-01 | major | COHESION | scope | §16's content line still prices V11's C4b in the first total; staged row and INDEX name the retired C4 |
| G121-V12 | major | F-MISSING | V12 | item 121 (h)'s bars and their measurement absent |
| G122-V11 | major | F-MISSING | V11 | item 122's look, symbol, scale and placement tables absent |
| G122-V12 | major | F-MISSING | V12 | item 122 (g)'s bars absent |
| G122h-V11 | major | F-MISSING | V11 | item 122 (h)'s rates (45 m² a head, one engine per 1 500, the coalition's spread) absent |
| G122h-V12 | major | F-MISSING | V12 | item 122 (h)–(i)'s bars absent |
| G123-V11 | major | F-MISSING | V11 | item 123's damage-threshold tables by material and element kind absent |
| G123-V12 | major | F-MISSING | V12 | item 123 (f)'s bars absent |
| G124-V11 | major | F-MISSING | V11 | item 124's weather columns per week band and the two hard rules absent |
| G124-V12 | major | F-MISSING | V12 | item 124 (i)'s bars and their measurement absent |
| G125-V12 | major | F-MISSING | V12 | item 125 (e)'s bars absent |
| VV1112-r1-02 | minor | BROKEN-REFERENCE | V12 | V12 §2.6's due map and §12 item 11 name V11's retired C4 |
| VV1112-r1-03 | minor | CONFLICT | V12 | V12 §3.7.8 (1) and §2.13 list five item-110 switches; V11 §3.24.0 now has six |
| VV1112-r1-04 | minor | BROKEN-REFERENCE | V11 | V11 §2.6's `LadderStep` comment names V10 §2.13 and claims V01 §2.3 uses the type |
| VV1112-r1-05 | minor | ELEGANCE | V01 | V01 §2.3 still writes the ladder-step union inline |
| VV1112-r1-06 | minor | ELEGANCE | rendering | §11.2's `WhyAnswer.members.step` still writes the union inline |

### VV1112-r1-01 — major — COHESION — owner scope

**Claim.** V11's round-1 repair (VAP-08; J-V11.117) split C4 into C4a (the wall barrier and waterfront rows, M2b, 0.5 pw)
and C4b (the SettlementForge rows — `dossier.kinds` (280), archetypes, category synonyms, keywords, good words, ladders —
M-SF, 1.0–1.5 pw), and V11 §8's total row now states: "**§16's first total** carries C0–C3b, C4a, C5–C7 and C9 —
11.25–15.75 pw … 3.0–5.0 for file g's (C2's g share 1.0–2.0 for items 102, 103, 105 and 107; C4a's 0.5 for item 106; C3b for
item 110; C9 for items 111 and 113–119); **§16's staged content line** carries C4b and C8 — 1.75–2.5 pw (the 280 kind rows
and items 104 and 108's dossier rows; item 109's rows)". §16 does not agree: its effort line *original content under the
clean room* (l. 18773) still prices "file g's rows — profiles, families, pairs, goods, coverage, **ladders, the 280 kind
rows**, walls (items 103–108; V11 §8, 2.5–4)" inside the first total, while its staged line "the content's staged rows
(volume 11) | ≈ 1.75–2.5 | V11 §8" (l. 18791) — exactly C4b + C8 — prices the ladders and the 280 kind rows again; the
staged-milestones row (l. 18753) reads "the content's staged rows (V11: **C4** at M-SF, C8 at M6-U)"; and INDEX §1's V11 row
reads "C0–C3b and C5–C7 inside M0–M4b, **C4's wall rows** at M2b; … **C4's dossier rows** with the SettlementForge stage",
naming a milestone V11 no longer has. So C4b is priced twice in the whole program, V11 §8's statement of what §16's first
total carries is not true of §16, and the items 103–108 figure (2.5–4) matches no V11 figure (V11: items 102–107 1.5–2.5 in
the first total). VAP-08's required change gave §16's half ("§16's content line and staged V11 line then carry exactly those
figures (the 280 kind rows and the ladders on the staged line only) under VCS-08's recomputation"); V11 handed it to scope
(repair-r1-V11.md, *CROSS-UNIT HAND-OFFS*), and scope's repair did not carry it. verify-scope-r1t's re-raised VCS-08 covers
the V05, V06 and V07 re-pricings only.

**Required change.** In §16's effort line *original content under the clean room*, replace "file g's rows — profiles,
families, pairs, goods, coverage, ladders, the 280 kind rows, walls (items 103–108; V11 §8, 2.5–4)" by "file g's rows in the
first total — profiles, families, pairs, goods, coverage and balance (items 102, 103, 105 and 107; V11 §8's C2 g share,
1.0–2.0) and the wall rows (item 106; C4a, 0.5); the ladders, the 280 kind rows and item 109's rows are on the staged
content line (V11 §8's C4b and C8)", re-summing the line, the base subtotal, the first total and the whole program once under
VCS-08's recomputation (file f item 568), and checking that the milestone rows carry C4a at M2b and no C4b, so the milestone
rows still equal the first total. In the staged-milestones row write "the content's staged rows (V11: C4b at M-SF, C8 at
M6-U)". In INDEX §1's V11 row write "C0–C3b, C4a (the wall rows, at M2b) and C5–C7 inside M0–M4b; C8 at M6-U; C9 beside each
owner item's base milestone; C4b (the SettlementForge rows) at M-SF (V11 §8)".

### G121-V12 — major — F-MISSING — owner V12

**Claim.** The dated ruling "File g items 121, 122 and 123 routed" names V12 for item 121: "the bars and how each is
measured". V12 has no part: "item 121" occurs 0 times, no metric, pin, spec, test, timing or decision row reads the
resolution adjuster, and §3.15 stops at item 120.

**Required change.** V12 writes item 121's part at build depth as new design: a §3.15.11 *Item 121 — the resolution
adjuster* measuring item 121 (h)'s clauses against §13.2's item-121 bars (scope's G121-scope) on V09's app harness and
§12.1's timing phase — (1) Auto the default on a fresh install (a conformance check on a fresh profile); (2) no level change
during a gesture, and at most one change per 10 s on a fixture loaded at its threshold (two counts over scripted pans,
zooms and drags, 0 and ≤ 1); (3) Auto holding the frame budget's p95 on the reference and low devices over §12.5's reference
views; (4) a manual level honoured or its explanation shown (item 121 (f)); (5) labels, text, chrome and overlays at the
device pixel ratio at every level (a pixel test); (6) picture, print and battle-map exports byte-identical across every
setting (a pin over the device state, which never enters the document); (7) a device-pixel-ratio change re-evaluating at
once; (8) native 4K lit at full precision on the ultra tier within its 512 MB (§12.8's memory measurement) — with their
§3.4.2 metric rows, §2.13 pin, §3.12 failure row, §3.16 edge rows (every level, every tier, a screen above 4K), §6 budget
row, a T-V12 test, a J-V12 row, §8.2's W7 milestone cells and §12's PLAUSIBLE entry.

### G122-V11 — major — F-MISSING — owner V11

**Claim.** The ruling names V11 for item 122: "the look, symbol, scale and placement tables". V11 has no part ("item 122"
0 times; no crisis registry row, row type, value, lifecycle row or test).

**Required change.** V11 writes item 122's tables at build depth as new design (an addition; §10.2's table shape is the
pipeline's, G122-pipeline): registry rows and §2.8d row types for the crisis look rows — (1) the closed mapping's look kind
per SettlementForge stressor type and condition archetype, or an explicit "no look" (item 122 (b): siege, mass immigration,
disease, famine, beast attack, raiders, disaster with its fire, flood and earthquake patterns, occupation, rebellion, boom,
bust; the `regional_*` pressures none), keyed as V08's closed mapping keys them; (2) the symbol rows — what each look draws
(camps, trenches and earthworks, engines, burned farmsteads, blockade camps, tents and carts, the quarantine fence, huts,
pest-house and grave rows, marked doors and cordon, bare fields, empty pens and shuttered stalls, torn palisade and
watch-fires, barricades, banners, scaffolding) with §8.2's role keys, never colours; (3) the scale rows by severity and tier
(a hamlet a war band's camp, a city a full siege line); (4) the placement rows (the siege camps ≈ 300 m beyond the walls,
the refugee camp on common or fallow land by a gate's approach road, the quarantine camp outside the town, the outskirts'
priority siege → quarantine → refugees, the density cap, never on water, a gate's passage or a keep-out) — `own`, their
numeric cells calibratable with ranges and register lines, the enumerations `calibratable: false`, each read by the
renderer only (a look: no model StageId reader), with §2.10's lifecycle rows, §3.1's catalogue rows, the totality check (every
type and archetype of V08's mapping has its row) in T-V11's compile bars, §3.26's edge rows and a J-V11 row.

### G122-V12 — major — F-MISSING — owner V12

**Claim.** The ruling names V12 for item 122: "bars". V12 has none ("item 122" 0 times).

**Required change.** V12 writes item 122 (g)'s bars as new design: a `view` pin over Show crises on and off and every week
(the same document's model digest and saved bytes invariant) with the no-op clause (no condition and no preview:
byte-identical to the base); statistics on crisis fixtures for each look showing exactly in its condition's weeks, byte
stability per seed across views and exports, the tier and severity scaling, and nothing on water, a gate's passage or a
keep-out (0 by rule); the closed table's totality read from V11's compile check — each with its §3.4.2 metric, §3.12 failure
row, §3.16 edge rows, §6 budget, T-V12 test, J-V12 row and W7 milestone cells, under §13.2's item-122 bars (G122-scope).

### G122h-V11 — major — F-MISSING — owner V11

**Claim.** The ruling "File g item 122 (h)–(i) and item 125 routed" names V11 for item 122 (h)–(i): "the rates". V11 has
none.

**Required change.** V11 writes item 122 (h)'s rates as calibratable cells of the crisis look rows (new design, beside
G122-V11's tables): the camped area per head, 45 m² (a force's or a travelling group's camp sized by its headcount, each army
its own camp), the siege-engine rate, one per 1 500 besiegers (capped by the gates and wall stretches the engines can face),
and the coalition's spread round the town (each army's own camp and colours, the ring fuller as the coalition grows) — each
`own`, with its range, provenance ("general historical knowledge, not corpus-witnessed": Roman marching camps and present-day
refugee-camp standards near 30–45 m² a head), its register line, its lifecycle row and its compile check, and the fallback
when the dossier gives no size (item 122 (b)'s scale by severity and tier, the condition's own counts where it has them).

### G122h-V12 — major — F-MISSING — owner V12

**Claim.** The ruling names V12 for item 122 (h)–(i): "bars". V12 has none.

**Required change.** V12 writes the four bars item 122 (h)–(i) names as new design: the camped area proportional to the
dossier's headcount within 10 %; two armies joined twice one army's camped ground; the opening view and Fit containing every
camp while a look stands; item 116's limit restored when the crisis ends — on force and coalition fixtures, each with its
statistic, failure row, edge rows (a force too large for the frame and margin: the ring's massed marks), test and milestone.

### G123-V11 — major — F-MISSING — owner V11

**Claim.** The ruling names V11 for item 123: "the thresholds' tables by material and element kind". V11 has none.

**Required change.** V11 writes item 123's tables at build depth as new design: the decay-level rates by material (timber
rotting faster than stone; item 123 (b)), which V06's decay level reads with the existence state and the years since
abandonment, and the threshold rows by plan element kind (wall run, floor area, door, window, stair, roof bay over a room,
furniture piece; cellars and crypts by their own rows, V04) that map each element's one keyed draw (§6.3) to the decay level
at which it breaks — `own`, calibratable with ranges and register lines, with §2.10's lifecycle rows (a table edit never
re-derives a plan, only re-reads the levels), §3.1's catalogue rows, compile bars (monotone, every element kind covered) and
§3.26's edge rows (decay level 0 and 1; a material with no row).

### G123-V12 — major — F-MISSING — owner V12

**Claim.** The ruling names V12 for item 123: "bars". V12 has none.

**Required change.** V12 writes item 123 (f)'s bars as new design: room, wall and opening ids identical between the intact
and the damaged plan; damage monotone in the decay level (an `exactMonotone` step script over rising levels, a higher level's
damage ⊇ a lower's on every element); the same element breaking at the same level for a given seed; restoration reversing
it; the exterior agreeing with the plan; exports' line of sight following fallen walls; a never-decayed building
byte-identical to today's plan (no-op pin) — each with its metric, failure row, edge rows, test and milestone.

### G124-V11 — major — F-MISSING — owner V11

**Claim.** The ruling "File g item 124 routed" names V11: "the climate row's weather columns per week band and the two hard
rules". V11's climate rows carry no weather columns ("item 124" 0 times).

**Required change.** V11 writes item 124 (c)'s columns at build depth as new design: on every climate row, per band of weeks,
each effect kind's frequency and spell length (light rain, drizzle, falling snow, drifting mist, fog, wind-blown leaves,
cloud shadows, heat shimmer, dust haze), with item 124 (c)'s defaults by region (desert and arid, coastal, riverside and
lowland, temperate plains, hills and mountains, forest, cold) and the gradual turn of the weeks, and item 124 (d)'s fog
(cool mornings, autumn, low ground by water, burning off through the day); the two hard rules as compile checks — no snow,
falling or lying, on a row whose winter does not freeze; arid rain rare (brief showers in its short wet weeks, none in its dry
months); a view-only table (no model StageId reader), `own`, calibratable, with lifecycle, catalogue, register and edge rows.

### G124-V12 — major — F-MISSING — owner V12

**Claim.** The ruling names V12 for item 124: "the bars and how each is measured". V12 has none.

**Required change.** V12 writes item 124 (i)'s bars and their measurement as new design: the model hash and every tile
identical with the effects on and off (the tile cache untouched by a spell; a `view` pin); the frame cost within item 124 (f)'s
≈ 1 ms at the densest spell (timing phase); no falling or lying snow on a non-freezing climate row at any week; arid rain
frequency within its row; off by default under reduced motion, on the low tier and on phones; labels and chrome never
covered (a pixel test); no luminance step faster than the photosensitivity limit; exports byte-identical with the effects
on and off; the timeline replaying from its seed and clock — each with its metric, failure row, edge rows, test and
milestone.

### G125-V12 — major — F-MISSING — owner V12

**Claim.** The ruling "File g item 122 (h)–(i) and item 125 routed" names V12 for item 125: "bars". V12 has none.

**Required change.** V12 writes item 125 (e)'s bars as new design: a dossier holding only SettlementForge's required keys
generates a full map with every absent field reported and its fallback taken; the same dossier with and without a host
context yields the identical document and hash; no code path of the port reads anything but the dossier (the static check of
the adapter's imports and reads) — each registered on the harness (fixtures, conformance list or pin) with its failure row,
test and milestone, under §13.2's item-125 bars.

### VV1112-r1-02 — minor — BROKEN-REFERENCE — owner V12

**Claim.** V11's repair renamed C4 into C4a (the wall rows, M2b) and C4b (the SettlementForge rows, M-SF). Two V12 places
still name "C4": §2.6's due map (l. 721) "C0 `M0`, C1 `M1`, C2 `M2b`, C3 and C3b `M3a`, C4's wall rows `M2b`, C5 …, C8
`M6-U`" (which also leaves out C9, whose register entries — item 117's look rows among them — fall due at their items'
base milestones), and §12 PLAUSIBLE 11 (written this round) "the one-knob-one-entry check finds any at C2's and C4's
exits", where the rows meant (registry rows 14–15, the wall rows) are C4a's.

**Required change.** In V12 §2.6 write "… C3 and C3b `M3a`, C4a `M2b`, C4b `M-SF` (no entry: the dossier row sets are not
calibratable), C5 `M2b` for its O13-core part and `M3b` for the rest, C6 `M4`, C7 `M4b`, C8 `M6-U`, C9 the milestone that
lands each owner item's base part (V11 §8; §13.8)"; in §12 PLAUSIBLE 11 write "at C2's and C4a's exits".

### VV1112-r1-03 — minor — CONFLICT — owner V12

**Claim.** V11's repair (VAP-21) gave item 110 a sixth switch in V11 §3.24.0 — V03's `roomProgram`
`PlanGeometryRow.exposureAllStoreys` false (item 110 (a); "S11's entrances and the plan rung read the outside ground as
before item 110") — and T-V11-31, W61 and V03's T-V3-34 read "the six switches" ("its off form V11 §3.24.0's,
`exposureAllStoreys` false among it"). V12 still lists five: §3.7.8 (1) "V11 §3.24.0's switch table for item 110 (one named
off form per row set: `terrace`, `raisedWays`, `deck`, `roster.specialisations`, `deck.landmarks`)", and §2.13's
`item110.raised`, `.terrace`, `.deck`, `.stepped` row ("one row set per family") assigns the new switch to no pin. A pin
overlay built from V12's list leaves `exposureAllStoreys` at its default `true`, so B-PLAN's and B-CITY-lite's plans under
the item-110 overlay differ from the pre-110 goldens (windows and entrances on walls whose outside ground lies above their
sill) and T-V3-34's pin, which V12 §2.13 lists among the item-110 suites, cannot hold.

**Required change.** In V12 §3.7.8 (1) write "(one named off form per row set: `terrace`, `raisedWays`, `deck`,
`roster.specialisations`, `deck.landmarks`, and V03's `roomProgram` `exposureAllStoreys`)"; in §2.13's item-110 row add to
the off-form cell "`item110.terrace`'s overlay also sets V03's `exposureAllStoreys` false (item 110 (a)), so the four pins
together are V11 §3.24.0's six switches off".

### VV1112-r1-04 — minor — BROKEN-REFERENCE — owner V11

**Claim.** V11 §2.6's new declaration reads "`type LadderStep = 'COUNT'|'QUARTER'|'GUILD'|'SIZE'|'REPLACEMENT'` // item
108's step types; V08 §2.3, V08 §2.5, V10 §2.13 and V01 §2.3 type their fields by it". V08 §2.3 and §2.5 do (`step?:
LadderStep /* V11 §2.6 */`), but V10 §2.13 holds no ladder-step field — the oracle's `WhyAnswer`, whose `members.step` VAH-32
named, is declared in base §11.2 (l. 15236 – 15248) — and V01 §2.3 (l. 466) and §11.2 still write the union inline. The
comment names a wrong home and states a use that does not exist.

**Required change.** In V11 §2.6's comment write "item 108's step types; V08 §2.3's `CarriedFact`, V08 §2.5's
`DossierInstitution.step`, V01 §2.3's district view and §11.2's `WhyAnswer.members.step` type their fields by it" (true once
VV1112-r1-05 and VV1112-r1-06 land).

### VV1112-r1-05 — minor — ELEGANCE — owner V01

**Claim.** VAH-32 (an elegance ruling: one named type for item 108's five step values) is applied in V11 and V08 but not in
V01: V01 §2.3's district view (l. 466) still reads `records: { record: Id; step: 'COUNT'|'QUARTER'|'GUILD'|'SIZE'|'REPLACEMENT';
… }[]`, a second statement of V11 §2.6's `LadderStep` (V11's repair handed the change to V01).

**Required change.** In V01 §2.3 write `step: LadderStep /* V11 §2.6 */`.

### VV1112-r1-06 — minor — ELEGANCE — owner rendering

**Claim.** The same ruling's other remaining copy: §11.2's `WhyAnswer` (l. 15248) reads `members?: { step:
'COUNT'|'QUARTER'|'GUILD'|'SIZE'|'REPLACEMENT'; … }`. VAH-32 named this field at its former home V10 §2.13; it now lives in
§11.2, so V11's hand-off to V10 does not reach it.

**Required change.** In §11.2's `WhyAnswer` write `members?: { step: LadderStep /* V11 §2.6 */; range?: [number, number];
count: number; ids: Id[] /* ≤ limits.members */ }`.

## What was checked, and how

1. **Assembly.** The live V11 and V12 equal assemble-r1's recorded "after" hashes; the pre-round text is git 3f0e02b's
   (equal to assemble-r1's "before"). Every heading of both volumes was diffed: 31 V11 sections and 25 V12 sections changed
   (the 29 and 25 blocks plus the title-block widening "102–119" → "102–120" in each, assemble-r1's hand-off); no other
   section moved. Each changed section's word diff was read hunk by hunk, with the counterpart text it names.
2. **Cuts against their new homes (nuance).** V11 §3.24.3's draw and cap now point at §4.7 S11 (l. 6833 – 6837: the
   `siteplan` stream keyed (lineage, `'spec'`), the chance, the cap formula, roster order, the exemptions, "never
   overwritten", the composition and heights replacement); V11 keeps what S11 does not state — the draw at the use's first
   building, the first row per culture and class, the village cap through `rules.tiers.capPerSettlement`, prefix stability,
   "not counted toward the cap"; the strict chance test is E-03's convention ("exists from the first moment the chance
   exceeds the draw"). The plinth and skirt values live at §2.6 (l. 1680, 1698); `RaisedKind` at §2.7 (l. 2227, with the
   reason vocabulary). V12's removed V06 X ids are replaced by the V06 sections that hold each request (§7's tests, §3.19.1
   (4), §2.2's knobs, §8's lines and paragraph), each read. No nuance lost.
3. **Other units' round-0 findings fixed here.** VAF-R0S-05 (§2.7's `RaisedKind` declared), VAF-R0S-07/VAH-27
   (`StructureRoleRow`, no clash with the base's kernel `RoleRow`), VAF-R0S-19, -25, -29 (`S8.seed` is a registered stage id,
   §6.1 l. 9004), VAH-30, VV56-27 (every §10c subject resolves: V06 §3.18.2, §3.18.3, §3.19, §3.19.2, §3.19.4, §3.9.10, §3.16,
   §3.4 (9); V08's sections), VAP-08 (V11 §8's arithmetic re-summed: 13.0–18.25; first total 11.25–15.75; staged 1.75–2.5; g
   rows 4.75–7.5 — all hold; §16's half is VV1112-r1-01), VAP-21 (V12's half is VV1112-r1-03), VEL0-11 (`defaultRow`
   keys `c14`, `temperate-deciduous`, `faith`, `open`, `none`, `none`, `mixed` are live rows; EI-V11-EDGE-3 and T-V11-45 (s)
   test the refusal), VM-R0S-16 (the `village` kind row), the clear-span hand-off (`maxClearSpanM` 30 / 20 m, ranges, J-V11.116;
   T-V11-32 (h) holds 22.5 ≤ 30 and 12 ≤ 20; base §2.7 l. 2451 reads the cell; V12's `raisedWays.structure` line covers it by
   its catch-all), VPC-10/-13, VRC0S-23, VV56-26; in V12 VAP-16, -17 (every restating pin of §2.13 and X-V12-11 exists in its
   volume), -26 (T104-3, T107-1, T107-2 exist), -27, -28 (T-V4-43's and T-V4-58's parameters as V04 states them), -29, -30
   (the base ids T114-1 – T119-5 of §13.2 and §13.8; spec ids `T114g.*`, `T117i.*` kept as `ownerBar` specs), -31 (V02 §7.5
   (3)'s five items), VV56-28, item 119 (a2) (advance time and the replay timed in total; base §13.8 l. 17843 agrees).
4. **Owner items.** Items 114–119's parts were not undone in either volume. Item 120 (J133): V11's part (the class labels,
   synonyms and groups as Find's lexicon — V11 §2.3 *Find's lexicon*, §3.4 *Find's groups* covering all 45 families with
   the two aliases resolving, §3.5.15's shared `smith`, rows 17 and 33, W87, T-V11-4, J-V11.112) answers (a), (b), (c) and (h);
   V12's part (`item120.find`, `find.matches`, `.leaks`, `.held`, `.pins`, `.cues`, `time.findSuggest`, `time.findGlow`,
   §3.15.10, T-V12-52, J-V12.97) answers every clause of (k). Their base and V09 ends (§2.9's `find` key, §11.2's listing,
   §12.5's budget, §13.2's bars, V09's `live.find`) are absent, already raised as G120-model, G120-rendering, G120-scope and
   (by the V09–V10 seat) G120-V09. Items 121–125: absent from both volumes ("item 12n" 0 times each) — the ten F-MISSING above.
5. **Ids, references, terms, deferral.** Ids above: unique, contiguous. No canon finding id, no retired term
   (`raised.vaultShare` only in the name map; "M4-110's panel" gone), no deferral wording in any added text. doc_checks'
   61 unreviewed S2 hits (V11 49, V12 12) are each a volume-prefixed pointer (scripted check).

## Already raised by other verifiers this round (not repeated here)

verify-determinism-r1t VDC1-01 (§7.1's table-edit row still refuses a stamped cell; `refuse.table.required` missing) and its
V09 §4.9 catalogue finding; VDC1-11 (V11 §2.10's `walls.condition` lifecycle vs §2.2 rule 5); verify-vol-V07-V08-r1t VV78-04
(V11 W83 and §3.25.4 narrow V08 §3.16 (3) (b)'s "seigneurial or crown" to seigneurial); verify-pipeline-r1t VPC-R1-01, -07,
-14, -15 (V11); verify-vol-V01-V02-r1t VV12-r1-07 (V11) and VV12-r1-08 (V12 §3.11's deck stand-ins); verify-vol-V03-V04-r1t
VV34-r1-06 (V11) and VV34-r1-07 (V12 §3.11's `accessForecastMin` owner); verify-scope-r1t VCS-08 (the §16 re-sum for V05–V07)
and G120-scope; verify-model-r1t G120-model; verify-rendering-r1t G120-rendering. Findings ruled INVALID in an adjudication
are not reopened.

## doc_checks (provisional)

`python3 docs/validation/bench/doc_checks.py --doc <volume> --heads docs/ARCHITECTURE.md`, run on both live volumes. The tool
warns: "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs,
research/external) - clean-room results are NOT authoritative; re-run on the machine that holds the corpus before any
freeze" — so these counts are provisional (exit 1 on unreviewed rows, as at round 0).

| check | V11 hits (unreviewed) | V12 hits (unreviewed) |
|---|---|---|
| C1 | 0 (0) | 8 (0) |
| C2 | 0 (0) | 0 (0) |
| C3 | 279 (254) | 126 (114) |
| C4 | 3 (0) | 2 (0) |
| S1 | 0 (0) | 0 (0) |
| S2 | 291 (49) | 107 (12) |

The unreviewed S2 hits are volume-qualified pointers the tool reads against the base's heads (none broken); the unreviewed
C3 hits are common three-grams (the banner line, numeric runs, our own plain words), as at round 0 and in repair-r1-V11's
proposed allow rows; they stand provisional with the corpus.
