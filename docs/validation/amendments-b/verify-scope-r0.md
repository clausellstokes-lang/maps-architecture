# Verify — SCOPE part after amendments-b assemble r0 (lane amendments-b/verify-scope-r0)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-scope-r0); queued as B-amendments-b/verify-scope-r0 in docs/FABLE-REVIEW-QUEUE.md.

PROGRESS
- STEP inputs-read: done (route.json scope rows for items 8–31; AMENDMENTS-2026-09-25b items 8–32 whole; amend-scope.md whole; the cross-part notes to scope in all nine other amend-*.md; assemble-r0.md whole; the scope part read whole — l. 1–366, 9483–11081, 11738–12417 of docs/ARCHITECTURE.md sha256 87d89692…; the scope J-A Part A entries; the homes each scope sentence cites, read at the cited subsections)
- STEP items-verified: done (§2 below)
- STEP checks (single-source, stale, cross-part, deferral, broken-ref, new-problem): done (§3)
- STEP issues: done (§4, VS-01 – VS-40)
- STEP concurrences with the other verifiers: done (§5)
- STEP CONFIRMED / PLAUSIBLE: done (§6)

Lane `amendments-b/verify-scope-r0`, 2026-09-27. PENDING FABLE REVIEW — an Opus verifier seat.

## 1 Outcome

Every item routed to the scope part has landed in the scope sections: of 25 rows (items 8–31, with 28 (f) apart),
21 PRESENT, 4 PARTIAL (19, 20, 24, 28 (f)), 0 MISSING. The owner's newest message (item 28 (f), "same building geometry but not the interior") is honoured where
the scope part carries it — the summary's appended paragraph, §13.2 T28-13 – T28-17, D-25's vocabulary, the stage-3
row — but its base-now bars (the interior ladder's schema test and "every household housed without a new plot") are
scheduled at no base milestone (VS-03).

40 issues (4 major, 36 minor): scope 34, pipeline 3, model 2, determinism 1. The majors are: §13.6 never says which
preset the owner's panel renders while three homes say it runs the parity presets (VS-01); §4.2 S3 (12)'s default
weights cannot move the principal market off a plaza, so T24-1's port bar fails by construction (VS-02); the interior
ladder's base-now bars are unscheduled (VS-03); and item 20 (a)'s one-way door ("its bridge has no command that does")
has no acceptance bar anywhere (VS-04). §5 lists the 18 issues the other verifiers raised against this part: this seat confirms
them, folds nine of them and VK-19 (5)–(6) into its own (VS-08, VS-12 — which reconciles VP-11 with VD-12c —, VS-13,
VS-21, VS-35, VS-38) and leaves the other nine as their authors wrote them.

Item 21 reads as the owner ruled on 2026-09-27: §17.3 and D-22 (proprietary, "all rights reserved") are the ruling, not
stale text — the computed task's "a proprietary licence default" stale probe does not apply (owner's words win).

## 2 Items routed to scope — PRESENT / PARTIAL / MISSING

| item | verdict | where, quoted |
|---|---|---|
| 8 decline and regrowth | PRESENT (minor VS-30) | §13.2 "(T8-1) every `DeclineOp` kind applied by hand on the golden TOWN undoes to byte identity; (T8-2) the regrowth-first fixture … ≥ 95 % of the delta placed inside the old plan"; D-25 "the decline ladders of buildings, walls and tunnels with the salvage ledger and the regrowth-first siting (item 8)"; §15.2 hooks row 2 "the decline ladders"; §16 M4 "the decline table, the salvage ledger and the dwell lag"; Staged evolution row; §0.2 row 8 |
| 9 size by population | PRESENT | §0.2 row 9 "SATISFIED — size within a rung follows population … (§1.1); parity pairs are matched by building count (§13.6 (3)); no change (J-A9.01)" |
| 10 islands by prosperity | PRESENT | D-3 "a model setting `recipe.layers.islands`, off by default, that exists only at CITY and METROPOLIS and only where prosperity supplies it"; T10-1 "a town supply below the threshold gives 0 islands, and the supported area is monotone non-decreasing"; Staged sewers-and-islands row "the two-supply size law" |
| 11 the underground fades | PRESENT (minor VS-13) | T11-1 "tunnel conversions by hand undo exactly; no `EvolutionStrategy` plan on the hook fixture contains a tunnel `demolish` (a lint)"; D-25 "… and tunnels"; Staged row "the tunnel lifecycle (item 11)" |
| 12 underground neighbourhoods | PRESENT (minor VS-14) | §14 `underground: Map<string, UndergroundStrategy> /* II.7.4 … under.blocks, under.plots, under.buildings and under.access */`; §13.1 "`corridorUnion` over a fixture of `tunnel` chains"; T12-1 schema fixture; Staged row |
| 13 islands only in cities | PRESENT (minor VS-28) | §1.1 `layers: { islands: 'none'\|'possible'; sewers: SewerExistenceRow }`, table column "none / `law`", "possible / `always`"; T13-1; D-33 |
| 14 sewers by tier | PRESENT (minor VS-26, VS-34) | §1.1 layers column "a TOWN draws its sewers at S0 by a law of its population and wealth, never certain; a CITY or METROPOLIS always has its network"; D-3; T14-1 |
| 15 not every city has islands | PRESENT (minor VS-32) | D-3 "the sky layer's view toggle showing islands and never creating them"; T15-1 "P(count = 0) within ± 0.05 … every count 0–3 observed" |
| 16 assignments by rules | PRESENT | T16-1 – T16-4; §14 `@plat/plots` "the one placement solver … and the designation mutator"; §15.2 O7 (b), O10 (e), hooks row 3; §16 O10 line "+4–5"; D-32 "Amendments b split it (J-A16.44)"; §13.9 (5) |
| 17 uses move | PRESENT | T17-1 "a hand relocation keeps the use's address, the building persists vacant with its `formerUses`, and undo restores"; D-25 "use relocation"; Staged evolution row "the use step with `UseConversionOp`" |
| 18 mutation | PRESENT | T18-1 – T18-4; §14 "the designation mutator (§4.7 S11)"; §16 O10 line |
| 19 designation by prosperity | PARTIAL (VS-36) | §1.4 buildings row "FTG's material model as the default, a material texture and colour only"; T19-1 – T19-4; missing: D-2's region preset row for the regional material shift the route asked for (§2.6 already says "a preset row (D-2)") |
| 20 one-way flow, dossier authority | PARTIAL (VS-04) | summary "the map never edits it, a map delete of a dossier element is a placement rejection"; T20-1 – T20-4; O10 (i); Staged SettlementForge row; missing: any bar for (a) "its bridge has no command that does" |
| 21 licence (HOME) | PRESENT (minor VS-09, VS-10) | §17.3 unchanged "**proprietary: "Copyright © the owner. All rights reserved."**"; D-22 unchanged; §0.2 row 21 "SATISFIED by the owner's ruling of 2026-09-27"; J-A21.01 |
| 22 dossier changes mutate | PRESENT | T22-1 – T22-4 "(T22-2) two histories reaching one dossier give two valid maps"; Staged rows; §16 M3a |
| 23 emulation first | PRESENT (VS-01, VS-31, VS-38) | §1.4 "**Defaults emulate; extensions ride on top (item 23).**"; §17.1 (6) "`ref:FTG lifestyle distribution` …"; T23-1; §13.5 "the parity presets … add one B-REF run per preset" |
| 24 several markets | PARTIAL (VS-02, VS-07, VS-08) | §1.4 centre row "the principal market scored by where trade meets, usually the plaza"; T24-1 – T24-3; §13.5 markets row; §13.7 row; missing: the summary still reads "the market square … reserved" (erratum only) |
| 25 terrain and water change | PRESENT (minor VS-13) | T25-1 "a hand `reclaim` and a hand `silt` are byte-identical outside their footprint"; D-25 "the terrain-water kinds (item 25)"; Staged evolution row |
| 26 hinterland, FTG's order | PRESENT (VS-05, VS-06, VS-17) | §1.4 hinterland row "FTG's order — decided with the demand, drawn after the town — and its farmland modes"; T26-1 – T26-3; §15.2 O14-core "(f) woods sized to the fuel and timber rows" |
| 27 wealth models | PRESENT (VS-16) | §1.4 districts row "the field's default band set reproduces FTG's lifestyle tiers and MFCG's ward-class shares (§4.5, item 27) while districts stay feature-named (J-P1)"; T27-1, T27-2; §13.5 wealth-bands row |
| 28 plan rung and elaboration | PRESENT (VS-23, VS-25, VS-37) | §1.1 stage table "floor plans elaborated by click (the plan rung, §2.6)"; §1.2 "`elaborate: 'click'`, a per-viewer view key"; T28-1 – T28-12; §14 "`plan`"; §16 M3a "the plan rung's base hooks"; Staged stage-3 row |
| 28 (f) the interior has no floor | PARTIAL (VS-03, VS-23) | summary "its interior has no such floor: the same shells are re-cut inside for the households that live there, from one family with small staff rooms down to single rooms off a corridor (§2.6)"; T28-13 "the owner's bar"; T28-17 "the owner's concern"; D-25 "the interior ladder and the dwelling unit (item 28 (f))"; missing: the base-now bars at a base milestone |
| 29 entrances and basements | PRESENT | §1.4 buildings row "FTG's entrance rule retained as the main door's default and extended to a set"; T29-1 – T29-4; §13.5 row; O5 (f), O17 (j) |
| 30 hidden plots | PRESENT (VS-20) | T30-1 – T30-4; §13.5 hidden-plots row "parity presets 0"; §13.7 "± 0.03"; §14 app "withholding the names and purposes of local and secret places"; O5 (a); O18 (d) |
| 31 wealth ladder and floor | PRESENT (VS-11, VS-12) | T31-1 – T31-12 "(T31-9) after any run of epochs with no rung-3 event on a plot, its ring and its buildings' shells are unchanged"; §14 `wealthLadder.json`; O18 (g); D-25 "the built band, the geometry floor and the manifested band"; Staged evolution row |

## 3 The checks, in brief

* **SINGLE-SOURCE.** Item 23's principle and mechanism are restated in §1.4 and §17.1 (6) beside their home §7.6 (VS-38,
  with VD-35b). §2.6 restates §13.2's interior-ladder bars (VS-19, model). §13.2's registry list diverges from §2.8's
  registry paragraph instead of pointing to it (VS-24).
* **STALE.** The summary's "the market square … reserved", "the market" and "153–204" (VS-08); §15.1 B7, B13 (the
  retired "outside the enceinte"), B14 and a:J05 (VS-07); §0.2 rows 11 and 25 (VS-13); the Staged list's tunnel
  `condition` (VS-35). No stale "lots as buildings", binary-wealth, size-by-tier, map-edits-dossier or
  terrain-never-changes sentence remains in the part (grep over l. 1–366, 9483–11081, 11738–12417).
* **CROSS-PART.** Three homes (§4.1, §4.7 S10b, §7.6) assume a §13.6 rule §13.6 lacks (VS-01); §4.2 S3 (12)'s weights
  contradict T24-1 (VS-02); §5.3 and T12-1 against II.7.3's cellar stair (VS-14, VS-15); §4.9 "FTG's two" against §1.4's
  four (VS-17); §2.6 declares no row type for the table T28-16 and §14 assume (VS-18); J-A31.44 against §4.11 (VS-29);
  T31-4 against §7.1 (VS-11). Cross-part notes to scope from the ten seats: reflected except determinism's T28f-5 and
  "canonical prior" (VS-23), rendering's behaviour tests, §14 rows and §16 pricing (VS-04, VS-20, VS-22, VS-24), model's
  `Passage` and tunnel fields (VS-24), assignments' T16-4 at M1 (VS-34).
* **DEFERRAL-WORDING.** None: every "later" in the part is the owner's roadmap staging (grep of TBD / later / defer /
  open question / not yet over the part).
* **BROKEN-REFERENCE.** `refs.py` on the live document: 2 broken, both the pre-existing external citations (l. 2552,
  8726), none in this part. Named-but-absent targets: `docs/validation/amendments-applied.md` (VS-10), `PlanBuilder` in
  §2.6 (VS-25). Every `T⟨item⟩-⟨n⟩` cited anywhere is defined in §13.2 (script over the document: 83 defined, 0 cited
  undefined).
* **NEW-PROBLEM.** O14 (f) now names two letters (VS-05); item 26's base work sits in the cuttable should-have line
  (VS-06); the village rows of `RungProfile` against its `rung` type (VS-28); history figures in normative text against
  canon R11 (VS-09, VS-33); §16's own pricing rule unmet for the rendering part's mechanisms (VS-22); J-T's "a number
  now" unmet by §13.7's plan soft bands (VS-37).

## 4 Issues

### VS-01 — major · conflict · scope · item 23 — §13.6 does not say which preset the owner's panel renders
**Claim.** Three homes state a property of §13.6 that §13.6 does not have:
* §7.6 (l. 6909): "the **parity presets** `MFCG` and `FTG` — the presets §13.6's side-by-sides run — set every
  `extension` cell's chance or weight to 0";
* §4.1 (l. 3179): "The parity presets that §13.6's side-by-sides run set every `extension` row to its off value";
* §4.7 S10b (l. 4307–4308): "the parity presets that §13.6's side-by-sides run set it to 0".

§13.6 (3) matches only styles ("PLAT draws `ink` against MFCG's default style, `lit` against FTG's default …") and
names no parameter preset, so an implementer of the D-5 tooling would render the default preset, while three sections
say the panel judges the parity presets. The choice decides what the owner rates at M2b ("the base at parity"), M4
("mastered") and M5.
**Required change (scope, §13.6 (3), recorded as J-A23.02).** Append to (3): "PLAT's side of an MFCG pair runs the
`MFCG` parity preset and of an FTG pair the `FTG` parity preset (§7.6) — the panel judges the emulation the default
builds on, its extensions off; an NG pair (M5) runs the default preset, NG having no parity preset; the threshold
panel's strips (8) run the default preset." Add J-ROWS `| J-A23.02 | the D-5 MFCG and FTG pairs render PLAT under the
matching parity preset, NG pairs and the threshold strips under the default | §13.6 |` and its Part A entry (chose the
parity presets over the default preset because three homes already rely on it and "mastered" is judged on the emulation
item 23 makes the base; the default preset's extensions are proved by T23-1 and seen in the threshold strips).
*Alternative, if the repair seat rules the other way:* §13.6 (3) says "PLAT's side runs the default preset", and §4.1,
§4.7 S10b and §7.6 replace "that §13.6's side-by-sides run" with "that §13.5's parity runs use (T23-1)".

### VS-02 — major · conflict · pipeline · item 24 — §4.2 S3 (12)'s default weights make T24-1's port bar unattainable
**Claim.** §13.2 T24-1 (l. 9838–9839) and §13.7's item-24 row (l. 10301) require the principal market "off it [the
plaza] in ≥ 50 % of port seeds". §4.2 S3 (12)'s default scores (l. 3557–3570) are additive: the plaza "kind 1.0, routes
0.5 × the fraction of gate routes (5) rooted at it" — 1.5 in a single-nucleus town, whose gate routes and harbour route
are all rooted at its plaza (S3 (5), (11)); the harbour "kind 0.4, trade 0.6 × the port demand fraction" — at most 1.0
even if every manifest class required the coast; a bridgehead ≤ 0.85, a gate ≤ 0.9, the busiest street ≤ 0.65; the
random term's share is 0.1. No non-plaza site can win in a single-nucleus port, so the bar fails by construction and
§13.7's fallback ends in "not achieved"; the owner's "may not [be central] elsewhere" (item 24) never happens at the
defaults, although J-A24.41 promises "a flanking square at a bridgehead, the harbour, a gate or a main street otherwise".
**Required change (pipeline, §4.2 S3 (12)).** Re-set the default kind, routes and trade weights so that a single-nucleus
port whose port demand fraction is the median of B-CITY's port seeds scores its harbour site above its plaza, and state
that worked comparison (each candidate's score at that median) beside the candidate list; T24-1 and §13.7's row then
stand as written. *Alternative (scope), if MFCG's central market is to hold everywhere at the defaults:* T24-1 and §13.7's
row keep only "on the plaza in ≥ 90 % of inland walled B-CITY seeds", the port seeds' off-plaza share becomes a reported
(descriptive) figure, and J-A24.01's index row and Part A entry are amended to match.

### VS-03 — major · partial · scope · item 28 (f) — the interior ladder's base-now bars are scheduled at no base milestone
**Claim.** The route (item 28 (f)) makes base now "the programme's band input and the household capacity with relet by
hand …, the rows as data with the schema test, the unit field, stale marking". §2.6 builds the capacity into S10b's fill
at generation ("S10b's fill at generation (`households.built`, §4.7), §4.11's `relet` and F-PLAN (§5.2) read this one
function"). Yet:
* §16 lists none of T28-13 – T28-17 at any milestone (a script over the document finds T28-13 – T28-16 cited nowhere
  outside §13.2); M3a's exit takes "T28-9 – T28-12" only;
* §13.8 (l. 10327–10328) runs "the B-PLAN fixtures (T28) … from their stages' intake", i.e. all of T28 at stage 3;
* M3a's "T28-9 – T28-12" includes clauses that need the staged plan rung: T28-10 "keeps every surviving room's address"
  and T28-12 "clicking a building does the same for `plan`".

So the schema test of the shipped interior-ladder rows (T28-16) and the owner's own concern, "after a district's
two-band fall every roster household is housed without a new plot, bounded by each shell's capacity" (T28-17), would
first run at stage 3 although their mechanisms are base work of M2b/M3a.
**Required change (scope).**
1. §13.2 T28-17: split into "(T28-17) … every roster household is housed without a new plot, bounded by each shell's
   capacity (hand `relet`s on a hook fixture in the base)" and "no F-PLAN tier drops a household unit … (from stage 3's
   intake)".
2. §16 M3a exit: "T28-9 – T28-12" → "T28-9, T28-11, T28-12's `wings` clause, T28-16 and T28-17's housing clause";
   and the stage-3 intake (the Staged list's stage-3 row, "§13.2's B-PLAN bars") reads "T28-1 – T28-8, T28-10, T28-12's
   `plan` clause, T28-13 – T28-15 and T28-17's F-PLAN clause".
3. §13.8's sentence: "the underground schema fixture (T12-1) together with the B-PLAN fixtures (T28) runs in the PR tier
   from their stages' intake" → "the B-PLAN fixtures (T28-1 – T28-8, T28-10, T28-13 – T28-15) run in the PR tier from
   stage 3's intake; T28-9, T28-11, T28-12's `wings` clause, T28-16 and T28-17's housing clause from M3a; the
   underground schema fixture (T12-1) from M4 (VS-34)".

### VS-04 — major · partial · scope · item 20 (a) — the one-way door has no acceptance bar
**Claim.** The owner's rule 20 (a): "the module never writes to, patches or proposes changes to the dossier, and its
bridge has no command that does". §11.3 states it as a vocabulary fact ("the vocabulary has no message that addresses
the dossier", J-A20.81), but no bar proves it: §13.2's dossier group is T20-1 (re-placement), T20-2 (lapse), T20-3
(blocked positive placement), T20-4 (filler), T22-1 – T22-4; §11.3's only test (M3a) is the convergence test; §5.3's
dossier row checks existence only. The rendering seat's note to scope asked for exactly this ("(T17/20/22-R)
`report.changed` carries every rejection, placement, lapse, relocation and mutation record of a B-EDIT sequence, and
M3a's bridge test confirms no PLAT → host message type outside the vocabulary") and it is not reflected.
**Required change (scope).** §13.2 dossier group gains "(T20-5) the one-way door — an enumeration of the bridge's message
kinds (§11.3) finds no PLAT → host message that addresses the dossier (`doc.changed` carries map-document events only,
`report.changed` the map's report), and over a B-EDIT sequence `report.changed` carries every rejection, placement,
lapse, relocation and mutation record the sequence made (§5.4's entries)"; §16 M3a's exit list gains T20-5; §15.2
O10 (i) cites "(§13.2 T20-1 – T20-5, T22-1 – T22-4)". (T20-5's second clause needs §5.4's entry shapes, VD-13 / VR-03.)

### VS-05 — minor · new-problem · scope · item 26 — "O14 (f)" now names two letters
**Claim.** O14's letters are shared by its two rows: O14-core had (a), (b), (d), (e) and O14 full (c), (f), (g) (archive
l. 8601, 8604). The pass added "(f) woods sized to the fuel and timber rows … (§13.2 T26-1, T26-2) [C]" to O14-core
(l. 10771), while O14 full still reads "(f) ≥ 95 % of the map land-classed [C]" (l. 10774); §0.2 row 26 cites "O14 (f)
of §15.2" (l. 158).
**Required change (scope).** §15.2 O14-core: "(f) woods sized to the fuel and timber rows …" → "(h) woods sized to the
fuel and timber rows …"; §0.2 row 26: "O14 (f) of §15.2" → "O14 (h) of §15.2".

### VS-06 — minor · new-problem · scope · item 26 — item 26's base work is priced in the line the cuts offer to drop
**Claim.** §16 widened the should-have line 4–6 → 5–7 with "amendments b: FTG's farmland modes, the fuel and timber rows,
the arable reserve (+1)" (l. 10833), while the cuts paragraph offers "the should-have 'full' tiers (5–7 pw)" for the
owner's veto (l. 10866–10867). That work serves a must letter (O14-core, VS-05) and a BASE item the owner stated as the
emulation baseline (item 26: "Default: FTG's order and modes"); a veto of the cut would remove it.
**Required change (scope).** Effort table: should-have line back to "4–6 | §15.2 should rows"; the O17 + O18 + O19 line
"9–14" → "10–15", its basis ending "…, exposure, the hidden shares and passages, and O14-core's farmland modes, fuel
and timber rows and arable reserve (+3–4)"; the J-A16.01 sentence in §16: "O17 + O18 + O19 +2–3, O9 +2, the should-have
tiers +1, …" → "O17 + O18 + O19 with O14-core +3–4, O9 +2, …" (still +12–15, milestone rows unchanged); cuts paragraph
"(5–7 pw) — together a base of ≈ 133–172 pw and a total of ≈ 147–190 pw" → "(4–6 pw) — together a base of ≈ 134–173 pw
and a total of ≈ 148–191 pw"; D-20 "≈ 147–190" → "≈ 148–191"; J-A16.01's index row and Part A entry "seven lines" →
"six lines" with the should-have clause moved to the O17 + O18 + O19 clause.

### VS-07 — minor · stale · scope · items 24, 27 — §15.1's parity rows still state the one-market and extramural-only rules
**Claim.** Unchanged rows of §15.1 contradict the amended homes: B7 (l. 10585) "destinations = gates / market / bridges
/ harbour" (item 24: N markets, §4.3 "Markets as destinations"); B13 (l. 10591) "§4.5 squalid type after the first half
of the stages, outside the enceinte, with MFCG's trigger set" — §4.5 now admits it by FTG's trigger with "Our preference
that shanties lie outside the enceinte … a tendency, not a law (J-A27.43)"; B14 (l. 10592) names only the plaza
reservation, not the principal market's site or the secondary markets; a:J05 (l. 10656) "stalls on the square's edge
band" (one square; §4.7 gives stalls to every market square by rank, VP-14).
**Required change (scope).** B7: "destinations = gates / markets / bridges / harbour". B13: "§4.5 the shanty kind by
FTG's trigger — the roster's average band `poor` or `squalid`, after the first half of the stages — its extramural
placement a soft relation row (J-A27.43), the S0 `shanty` toggle forcing it on; §4.4 ribbon regime; the suburb regime on
the shanty toggle". B14: "§4.2 S3 plaza reservation sized per rung and the principal market's trade-convergence site
(S3 (12)); secondary markets as S7b claims, never touching another (§4.5 S7b (3)); §4.7 S9 `square` faces; §4.8 gate
plazas and church forecourts (G-R1); institutions via claims". a:J05: "§4.7 furniture pins: stalls on each market
square's edge band, by its rank, and round its market hall".

### VS-08 — minor · stale · scope · items 24, 16, 21 — the one-page summary keeps superseded text behind an erratum
**Claim.** The summary still says "*Big decisions:* the market square, the castle and the large precincts are reserved"
(l. 34), "rises near the centre, the market and high dry ground" (l. 42) and "The effort is about 153–204 expert
person-weeks (§16)" (l. 78), and the appended paragraph patches them ("so 'the market square' above now reads 'the
markets'"; "The effort figure above is the one before these rules: §16 now reads about 165–219"). Canon R11: "The
one-page summary … may paraphrase but carry only canonical figures". The guard J-A28.02 cites bound the editor seats
("use INSERT AFTER or APPEND … never REPLACE, for those two"); the repair lane carries no such guard, and the banner
sits above the summary's heading, so a REPLACE of the summary leaves it untouched. The appended paragraph's pointer for
the separate program, "(§17.3, D-22)", names only the licence (VR-32).
**Required change (scope).** REPLACE `## The whole design in one page (plain words)` with the same text except: l. 34 "the
market square, the castle" → "the markets, the castle"; l. 42 "the centre, the market and high dry ground" → "the
centre, the markets and high dry ground"; l. 78 "about 153–204 expert person-weeks" → "about 165–219 expert
person-weeks"; in the appended paragraph delete "— so "the market square" above now reads "the markets"" and the last
sentence "The effort figure above is the one before these rules: §16 now reads about 165–219 expert person-weeks.", and
"(§17.3, D-22)" → "(§11.3, §17.3, D-22)". J-A28.02's index row and Part A entry: "amended by an appended paragraph, never
replaced (the pass's guard)" → "amended by an appended paragraph, its superseded figures folded in place by the repair
round (R11)".

### VS-09 — minor · owner-fidelity · scope · item 21 — §17.1 (1) gained a history sentence the owner's instruction excluded
**Claim.** Item 21 instructs: "Editors: apply nothing beyond (b)'s explicit withdrawal sentence in §17.1 if J23's
permission was ever written into the design (grep TownGeneratorOS; the current text already says 'No code from
TownGeneratorOS'), and a one-line note in the rationale". J23's permission was never written into the design (the
archive's §17.1 (1) already read "No code from TownGeneratorOS (GPL-3) … is read for implementation, ported or
paraphrased"), yet §17.1 (1) (l. 10900–10903) gained "The owner's 2026-09-25 intent to license the module GPL-3, under
which TownGeneratorOS's code would have become licence-compatible and consultable, was withdrawn on 2026-09-27: the
module stays private (§17.3, D-22), and TownGeneratorOS is an idea source only …". It is history in normative text as
well (canon R11); J-A21.01's Part A entry already records it.
**Required change (scope).** §17.1 (1): delete that sentence, ending the item at "… is read for implementation, ported or
paraphrased (J-A21.01)."; §0.2 row 21: "§17.1 (1) records that the GPL-3 intent of 2026-09-25 was withdrawn and that
TownGeneratorOS is an idea source only" → "§17.1 (1) unchanged — it already admits no TownGeneratorOS code"; J-A21.01's
Part A entry: "which §17.1 (1) now says in one sentence" → "which §17.1 (1) already states, so no sentence was added
there (the owner's instruction)".

### VS-10 — minor · broken-reference · scope · the pass's own record — §17.1 (2) names files that do not exist
**Claim.** §17.1 (2) (l. 10942–10943): "the seat records its counts in its output file (a fix-all pass in its integration
log, an amendment pass in `docs/validation/amendments-applied.md` and `amendments-repair.md`)". Neither file exists
(`ls docs/validation/`); this pass records its counts in `docs/validation/amendments-b/assemble-r0.md` (§7 there).
**Required change (scope).** "an amendment pass in `docs/validation/amendments-applied.md` and `amendments-repair.md`" →
"an amendment pass in its assemble and repair reports under `docs/validation/⟨pass⟩/` (amendments b:
`docs/validation/amendments-b/assemble-r⟨n⟩.md`)".

### VS-11 — minor · conflict · scope · item 31 — T31-4 refuses every join or split on an occupied building
**Claim.** T31-4 (l. 9898–9900): "a plot `join` or `split` on an occupied building returns an F-EDIT conflict". The home,
§7.1 (l. 6299–6301): "A `join` or `split` of plots that would remove an occupied building returns F-EDIT — 'vacate
first', item 17's relocation — unless the user confirms the demolition as a fate (item 31)"; §7.3's row: "(an occupied
building kept, or the edit refused, §7.1)"; J-A31.74 "removing an occupied building needs a confirmed fate". T31-4 fails
a legal edit that keeps the building and ignores the confirm path.
**Required change (scope).** T31-4's second clause → "a plot `join` or `split` that would remove an occupied building
returns F-EDIT ('vacate first') unless the user confirms the demolition as a fate, and one that keeps the building
through S11's mutator commits (§7.1)".

### VS-12 — minor · conflict · scope · item 31 — T31-9: reconcile VP-11 and VD-12c (adopt VD-12c)
**Claim.** T31-9 "after any run of epochs with no rung-3 event on a plot, its ring and its buildings' shells are
unchanged" fails on two legal non-rung-3 changes of §4.11: rung 2's `densify … back_court` (the yard cut into rear plots)
and rung 1's "renovation and extension by `mutate`'s adapt and add steps toward the richer template". VP-11's rewrite
covers only the back court; VD-12c's covers both.
**Required change (scope).** T31-9 → "(T31-9) after any run of epochs with no rung-3 event on a plot, its frontage edges
are unchanged, no shell of its buildings has shrunk or been re-cut toward a poorer band — every other change matched to
a rung-3, mutation or conversion lifecycle event (§5.3) — and its geometry band is at or above its floor". Apply this
once in place of VP-11 and VD-12c; T31-11 stays.

### VS-13 — minor · stale · scope · items 11, 25 — §0.2 rows 11 and 25 and T25-1 (consolidates V-MAB-35, VD-11b, VP-38)
**Claim.** Row 11 names "`Tunnel.condition` and `closure` (§2.7 and §2.8)" — no `condition` field exists (§2.7: "its
condition … is a reading of existence and closure …, never a second stored state"; J-A11.21). Row 25 says the kinds are
"repaired by S1's water operator … through the water operator of §7.3 (b)", but §4.11 repairs `reclaim` by S1's terrain
operator (§7.3 (a)) and `digCanal` by the carve. Row 25 and T25-1 name the water kind `silt`, which VP-07 renames
`siltReach` (the tunnel ladder keeps `silt`).
**Required change (scope).** Row 11: "`Tunnel.condition` and `closure` (§2.7 and §2.8)" → "a tunnel's condition, read from
`existence` and `Tunnel.closure` (§2.7, §2.8; J-A11.21)". Row 25: "`reclaim`, `silt`, `shiftCourse` and `digCanal` …,
repaired by S1's water operator" → "`reclaim`, `siltReach`, `shiftCourse` and `digCanal` …, repaired by S1's terrain or
water operator or the carve (§7.3 (a), (b); §4.11)", and "through the water operator of §7.3 (b)" → "through §7.3 (a)
and (b)". T25-1: "a hand `silt`" → "a hand `siltReach`". (The two renames follow VP-07; apply them with it.)

### VS-14 — minor · conflict · scope · item 12 — T12-1 forbids the cellar stair II.7.3 admits
**Claim.** T12-1 (l. 9800) requires "every access point in public ground or a yard". II.7.3 (l. 11604–11606) places a
`cellar_stair` "in a surface building whose class row's `undergroundAccess` is true (inns, warehouses and guildhalls by
default) or whose plot is `knownTo: 'secret'`", and J-A12.42 says "a cellar stair is an access record". The fixture's
own "one stair" would fail if it is a cellar stair.
**Required change (scope).** T12-1: "every access point in public ground or a yard" → "every access point in public
ground, a yard or — a `cellar_stair` only — a surface building II.7.3 admits (`undergroundAccess`, or a `secret` plot),
every `grating` on public ground".

### VS-15 — minor · conflict · determinism · item 12 — §5.3's access row forbids the cellar stair II.7.3 admits
**Claim.** §5.3's decline-and-staged-layers row (l. 5411): "every `AccessPoint.ground.at` in public ground or a yard,
never in water or a wall strip" — the same conflict as VS-14 against II.7.3 and J-A12.42.
**Required change (determinism).** → "every `AccessPoint.ground.at` in public ground, a yard or — a `cellar_stair` only —
a surface building II.7.3 admits (`undergroundAccess`, or a `secret` plot); never in water or a wall strip".

### VS-16 — minor · conflict · scope · item 27 — §13.5 promises an M-1 measurement of MFCG ward classes the live MFCG lacks
**Claim.** §13.5's wealth-bands row (l. 10115): "FTG's six-tier lifestyle distribution and MFCG's ward-class shares on the
sweep ⟨M-1⟩ — **descriptive**". §1.4's districts row discards "class-typed wards MFCG itself dropped", and §4.5 takes the
shares from "the open-source model's 30 class-typed ward-deck entries … (receipt: `research/findings/os-model.md`)" — no
sweep of the live MFCG can measure them, and a `baselines.json` row needs a capture and a build (§13.5). §1.4's row says
"reproduces … MFCG's ward-class shares" without saying whose.
**Required change (scope).** §13.5 row: "and MFCG's ward-class shares on the sweep ⟨M-1⟩" → "(its captures ⟨M-1⟩) and
MFCG's ward-class shares as the 2017 open-source model's ward-deck composition (§4.5's receipt; the live MFCG types no
ward by class, §1.4) — a note with no `baselines.json` row". §1.4 districts row: "MFCG's ward-class shares" → "the 2017
open-source MFCG model's ward-class shares".

### VS-17 — minor · conflict · pipeline · item 26 — §4.9 calls two of FTG's four farmland layouts "FTG's two"
**Claim.** §4.9 (l. 4630): "**Farm modes — FTG's two, chosen by size and landscape (item 26; provenance `ref:FTG farmland
modes` …)**"; J-A26.43 "FTG's two farmland modes". §1.4's FTG column says "four farmland modes", and
`docs/confidence/ftg.md` records "farmland has four modes (F21)" — `Default` (chosen by size and landscape), `Farmsteads`,
`Around perimeter`, `Around rivers` (`research/findings/ftg-docs-params.md` §4.6, [STATED]). A `ref:` provenance must name
the reference's behaviour truly (§17.1 (6)).
**Required change (pipeline).** §4.9's heading sentence → "**Farm modes — two of FTG's four farmland layouts,
`Farmsteads` and `Around perimeter`, chosen by size and landscape as FTG's `Default` chooses them (item 26; …)**", and
FTG's `Around rivers` layout (fields only beside a river, else as `Around perimeter`) is either a third `FarmModeRow`
value `rivers` for a dry-climate row or left out by a recorded ruling (J-A26.44); J-A26.43's index row and Part A entry
follow.

### VS-18 — minor · partial · model · item 28 (f) — the interior ladder has no declared row type or table id
**Claim.** §2.6 states the ladder as "**one table**, keyed by the band names of §4.5's band set" and gives its six default
rows as a Markdown table (l. 1384–1391), but declares no row interface (only `UnitForm`) and no table id; a grep finds no
`InteriorLadderRow`, `interiorLadder` or `interior.ladder` anywhere. Yet §13.2 T28-16 is "a schema test that every band …
maps to an interior row, and that every row names its unit, shared, staff, circulation and size columns", §7.6 lists
"the interior ladder's rows" among the versioned tables, and §14 files them under `roomProgram.json`; the model seat's own
note asked §14 to name `interior.ladder`.
**Required change (model; §14 follows).** §2.6 declares beside `UnitForm` the row type the Markdown table fills, e.g.
`interface InteriorLadderRow { band: string /* a FieldBands.bands id */; form: UnitForm; households: [number, number |
'capacity']; unitRooms: RoomRole[]; shared: RoomRole[] /* where the class row allows */; staff: { perPrincipalChambers:
number; sizeShare: number; placement: ('attic'|'basement'|'service')[] } | null; circulation: LayoutPattern[]; sizeFactor:
number }`, stored as the `interiorLadder` table of `roomProgram.json` (§7.6), the six rows its defaults; §14's
`@plat/tables` then reads "the room programmes and the interior ladder (`roomProgram.json`: `RoomProgramRow`,
`InteriorLadderRow`, §2.6, §10.2)".

### VS-19 — minor · duplicate · model · item 28 (f) — §2.6 restates §13.2's interior-ladder bars, one column short
**Claim.** §2.6's "**Bars (§13.2).**" bullet (l. 1435–1440) restates T28-13 – T28-17 in full; canon R9: "a test stated both
in §13 and elsewhere lives in §13". The copies already differ: §2.6's schema bar names "unit, shared, staff and size
columns", T28-16 "unit, shared, staff, circulation and size columns".
**Required change (model).** Replace the bullet with "* **Bars:** §13.2 T28-13 – T28-17 (R9)."

### VS-20 — minor · partial · scope · items 12, 28, 29, 30 — the rendering seat's behaviour tests are not in §13
**Claim.** The rendering seat's note to scope (amend-rendering.md "scope") asked §13.2 / §13.4 for (T30-R2) `query` and
hover withholding with the row present, (T30-R4) the legend giving a withheld place no row, (T28-R1) the `plan` block's
schema round trip with each storey scene's portals equal to the plan's openings and entrances, (T29-R1) VTT portals at
every entrance and glTF / CityJSON basements below `baseCm`, and the cut-away showing one depth band. §13.2 has only
T30-3's label and export clauses. §15.2 O12 (d) still reads "legend 100 %", which §9.5's withholding contradicts for a
viewer without the key.
**Required change (scope).** §13.2: item 30 group gains "(T30-5) `query` (`gazetteer`, `hit`, `inView`) and hover on a
document with a `secret` institution return its row with `withheld: true` at the `public` tier and its name at `secret`;
the legend gives a withheld place no number, letter or row"; item 29 group gains "(T29-5) a VTT portal at every entrance
of the set; glTF and CityJSON basements below `baseCm` validate"; the plan group gains "(T28-19) the JSON `plan` block
validates against its schema and round-trips, and every storey scene's portals equal the plan's openings and entrances";
T12-1 gains "; the cut-away shows one depth band at a time". §16: T30-5 at M3a, T29-5 at M3b, T28-19 at stage 3's intake.
§15.2 O12 (d): "legend 100 %" → "legend 100 % of the places the viewer's knowledge key admits (§9.2)".

### VS-21 — minor · partial · scope · item 30 — §13.3 keeps no placement digest per knowledge key (same as VR-31; apply once)
**Claim.** §9.2: "a stop's placement digest (§13.3) is therefore per (stop, knowledge key), the goldens taken at the
`public` tier"; §13.3's placement-digest paragraph (l. 9967–9982) names no knowledge key and stores nothing at a
non-public tier, so a cross-engine divergence of the filter at `secret` is never caught.
**Required change (scope).** §13.3 "Placement digests": after "S13b places the band's area and way labels" insert "at the
`public` knowledge tier with no places (§9.2) — and, for one golden CITY, also at `secret` —" (VR-31's wording).

### VS-22 — minor · partial · scope · items 8, 11, 12, 28, 29, 30 — §16 neither places nor prices the rendering part's new mechanisms
**Claim.** §16's rule: "A pass that adds build work prices it here: it names each new mechanism with the line that absorbs
it, or widens a line by an itemised amount". The rendering part added the knowledge filter, the knowledge key and the
reader's and exports' withholding (§9.2, §11.1–§11.3; T30-3 is an M3a exit bar), the `states` rows (§8.2, J-A8.81), the
entrance ticks and arch glyphs (§8.2, §8.3), the stale overlay `live.stale` (§8.2, J-A28.81) and `report.changed`
(§11.3). None appears in a milestone's content or in the effort table (the O12 line has no amendments clause; the arch
glyph alone appears, at M2b). The rendering seat estimated ≈ 0.5 pw (states, glyphs) and ≈ 1 pw (knowledge filter, key
and reader).
**Required change (scope).** M2b content gains "the `states` rows (§8.2) and the entrance-tick and arch-glyph rows (§8.2,
§8.3)"; M3a content gains "the knowledge filter, key and reader with the exports' withholding (§9.2, §11.1–§11.3),
`report.changed` (§11.3) and `live.stale` (§8.2)"; the O12 line's basis gains "amendments b: the `states` rows, the
glyph rows and `live.stale` (absorbed)"; and the knowledge work is either named as absorbed by the reference app's UI line
or that line widens 7–10 → 8–11 carried by M3a 22–27 → 23–28 — then the base reads 152–202, the total 166–220, D-20 and
the cuts paragraph ≈ 135–174 / ≈ 149–192 (with VS-06), and J-A16.01 "+13–16 pw"; the calendar stays 83–110.

### VS-23 — minor · partial · scope · item 28 (f) — determinism's interior-ladder note is only half reflected
**Claim.** The determinism seat's note to scope for 28 (f) asked: "(T28f-5) a hand `relet` above the capacity and a
`setRoomUnit` that strands a unit both return F-EDIT; the enumeration and registry tests cover `setRoomUnit` and `relet`
by hand; D-25's vocabulary gains 'interior ladder', 'dwelling unit' and 'canonical prior'; … the landing row for item 28
gains (f) with the sections of §8.2". §13.2 has no such bar; its enumeration list, §14's `@plat/edit` comment, the
Staged stage-3 row and §0.2 row 28 say "the seven plan events" — §7.4's row lists seven plus `setRoomUnit` ("setRoomUnit,
item 28 (f)"; J-A28.72 "`setRoomUnit` is its own event"); D-25 lacks "canonical prior"; row 28 omits §8.2's change marker.
**Required change (scope).** §13.2 interior-ladder group gains "(T28-18) a hand `relet` above §2.6's capacity returns
F-EDIT (M3a); a `setRoomUnit` that would leave a unit without its own door returns F-EDIT (stage 3's intake)"; "the seven
plan events" → "the seven plan events and `setRoomUnit`" in §13.2's enumeration sentence, §14's `@plat/edit` comment, the
Staged stage-3 row and §0.2 row 28; row 28's "the draw (§8.5)" → "the draw and the change marker (§8.2, §8.5)"; D-25 "the
interior ladder and the dwelling unit (item 28 (f))" → "the interior ladder, the dwelling unit and the canonical prior
(item 28 (f))"; §16 M3a's exit gains "T28-18's `relet` clause".

### VS-24 — minor · partial · scope · items 8, 12, 20, 22, 28, 30 — §13.2's registry list and §14's package rows diverge from their homes
**Claim.** §13.2's path-test list (l. 9769–9772) omits `Passage` and the tunnel's `navigable`, `headroomCm` and `closure`,
which §2.8's registry paragraph adds (l. 1692–1697: "`Use` …, `Passage` (§2.5), `MaterialLedger` …, the tunnel's
`navigable`, `headroomCm` and `closure`"), and lists `DossierRef`, a type of §7.1 (l. 6093), as a record. §14's
`@plat/model` row omits `Passage` and dates `Rejection` (§7.7), `DossierRef` (§7.1) and `AccessPoint` (II.7.4) to
"(§2.5–§2.8)"; `@plat/tables` lacks the disruption budget rows (determinism's note: "`DisruptionBudgetRow` … in
`@plat/tables`"); rendering's note asked `@plat/labels` for the `knownTo` filter, `@plat/render` for `live.stale` and the
`states` programs, `@plat/api` for `report.changed`.
**Required change (scope).** §13.2: "(`Use`, `Entrance`, … the plan records with the room's unit)" → "(every record and
attribute §2.8's registry paragraph lists for amendments b — `Passage` and the tunnel's `navigable`, `headroomCm` and
`closure` among them — with `Block.due` and the elaboration record)". §14: `@plat/model` "… `Use`, `Passage`, `Entrance`,
`Basement`, `MaterialLedger`, `ElaborationRecord` and the plan records (§2.5–§2.8), `Rejection` and `DossierRef` (§7.7,
§7.1) and `AccessPoint` (II.7.4)"; `@plat/tables` gains "the disruption budget rows (`DisruptionBudgetRow`, §7.7)";
`@plat/labels` gains "the knowledge filter over the label rows' `knownTo` (§9.2)"; `@plat/render`'s "live layers" → "live
layers (`live.stale` among them) and the `states` rows' programs (§8.2)"; `@plat/api` gains "`report.changed` (§11.3)".

### VS-25 — minor · broken-reference · scope · item 28 — §14 cites §2.6 for a `PlanBuilder` §2.6 does not name
**Claim.** §14 (l. 10403–10404, 10551) and §0.2 row 28 name "the default PlanBuilder (§2.6)"; a grep finds `PlanBuilder`
only there — §2.6 has `BuildingGenerator.plan` and `OutlineBuildingGenerator`, no plan builder.
**Required change (scope).** §14 `@plat/plots`: "+ OutlineBuildingGenerator and the default PlanBuilder (§2.6)" → "+
OutlineBuildingGenerator and the default implementation of `BuildingGenerator.plan` (§2.6)"; extension points: "the
default `PlanBuilder` behind its `plan` step (§2.6)" → "the default implementation of its `plan` step (§2.6)"; §0.2 row
28: "`PlanBuilder` in §14" → "the plan step's package in §14" (or the model seat names `PlanBuilder` in §2.6's plan rung
and these three stay).

### VS-26 — minor · conflict · scope · items 14, 28 — §1.2 promises base behaviour the staged stages deliver
**Claim.** §1.2 (l. 260–264): "a CITY or METROPOLIS has its historical sewer network by tier, unseen until its toggle" and
"buildings composed and their plans derived on click". II.7.1: "Until the two staged stages are built, `Features.sewers`
is resolved and reported and the underground arena stays empty"; §2.6: the plan rung is "staged with the Fantasy-Manor
buildings".
**Required change (scope).** → "the underground layer hidden — a CITY or METROPOLIS resolves `Features.sewers` on by tier,
its historical network built once the staged network stage exists and drawn only when its toggle is on (D-3, II.6 (1),
II.7.1)"; and "buildings composed and their plans derived on click" → "buildings composed on click and, once stage 3
brings the plan rung, their plans on a second click".

### VS-27 — minor · conflict · scope · item 20 — §1.1's stage table files the dossier contract under "hooks only"
**Claim.** §1.1's third row (l. 192) lists "SettlementForge inputs (the dossier contract, §7.7)" as a later stage with
depth "hooks only", but the base builds the contract at M3a (§16: "the dossier contract — dossier-backed existence,
rejection, positive placement, the disruption budget and report (§7.7)") and the Staged SettlementForge row says "the
mapping of SettlementForge's own data onto these doors is the staged part".
**Required change (scope).** "SettlementForge inputs (the dossier contract, §7.7)" → "SettlementForge inputs (the mapping of
its data onto the dossier contract, which the base builds, §7.7, §11.4)".

### VS-28 — minor · new-problem · scope · items 13, 14 — "the village rows" of `RungProfile` against its `rung` type
**Claim.** §1.1 types `rung: 'TOWN'|'CITY'|'METROPOLIS'` (l. 210) yet its `layers` comment says "the village rows read
'none' and 'never' (PART III)", and J-A13.01, II.7.1's table ("THORP, HAMLET, VILLAGE … `never`"), PART III ("The village
ladder's `RungProfile` rows carry `layers.islands = 'none'`") and the Staged village row all speak of village rows of
that type.
**Required change (scope).** §1.1: `rung: 'TOWN'|'CITY'|'METROPOLIS';` → `rung: 'TOWN'|'CITY'|'METROPOLIS' /* the base's
rows; the village product adds 'THORP'|'HAMLET'|'VILLAGE' rows of this type (PART III (5)), their layers 'none' and
'never' */;`.

### VS-29 — minor · conflict · pipeline · item 31 — J-A31.44 says `builtBand` is "lowered by rung 3 only"
**Claim.** J-A31.44's index row (l. 12317): "`builtBand` written by generation, rung-3 events, the hand edits of rung 3's
kind, the authorial re-derivations (brush, `FieldBands` `setAttr`, `Adjust`) and a completed upward refurbishment;
lowered by rung 3 only"; its Part A entry: "and is lowered only by a rung-3 event". §4.11 (l. 4862–4869) lists the same
writers — a brush "re-derives its scope to the current band", which lowers it — and ends "Nothing else lowers it";
J-A31.72 and T31-7 agree with §4.11.
**Required change (pipeline).** Index row: "lowered by rung 3 only" → "lowered only by those writers (§4.11: 'Nothing
else lowers it'), never by rungs 1 and 2"; Part A: "and is lowered only by a rung-3 event" → "and is lowered by nothing
else — rungs 1 and 2 never lower it".

### VS-30 — minor · partial · scope · item 8 — the regrowth-first siting is priced and placed nowhere §16 names
**Claim.** J-A8.01: "regrowth-first on the built path priced on the O9 line". §16's O9 line reads "amendments b: the `Use`
record and hand relocation, the plan rung's base hooks, the wealth-ladder edit kinds (+2)", and M4's "amendments b at
M4" list omits it, although T8-2 (the regrowth-first fixture) is an M4 exit bar and the route binds it "to the base's
grow-by-stage path now".
**Required change (scope).** O9 line's basis: "… the wealth-ladder edit kinds (+2)" → "… the wealth-ladder edit kinds and
the regrowth-first order of the grow path (+2)"; M4's list gains "the regrowth-first siting order on the grow path
(§4.11)".

### VS-31 — minor · partial · scope · item 23 — M4's table-provenance audit is not said to cover the emulation marker
**Claim.** The route (item 23, scope row "§13.5 / §16 M4"): "M4's table-provenance audit covers the marker". §16 M4 still
reads "the table-provenance audit" with no word of the `ref:` sources or the `extension` marker (M1 only places "the
emulation marker on every default cell").
**Required change (scope).** M4 content: "the table-provenance audit" → "the table-provenance audit, every default cell's
`ref:` source and every extension's `extension` marker included (§7.6, §17.1 (6); item 23)".

### VS-32 — minor · new-problem · scope · item 15 — T15-1's "every count 0–3 observed" is unconditioned (PLAUSIBLE)
**Claim.** T15-1: "500 CITY seeds at the target with the setting on: P(count = 0) within ± 0.05 of the table's value at the
measured town supply, every count 0–3 observed". II.6 (3)–(4): a slot opens with probability `chance_k · h(S_town)`, and
`h` is 0 up to τ, "the lower cut that the town's own `FieldBands` record for the `thresholdCut` band, the prosperous band
by default"; the cuts are per-town built-land quantiles (§4.5), so a town's area-weighted mean value `S_town` can sit
below its own prosperous cut on most seeds at the default `wealthLevel`, where only count 0 is possible. The bar then
fails for a reason unrelated to the count law.
**Required change (scope).** T15-1 → "500 CITY seeds at the target with the setting on, at `wealthLevel` 0.5 and 1: the
share with count 0 within ± 0.05 of the mean over the seeds of 1 − 0.6 · h(S_town); among the seeds with h(S_town) ≥ 0.5
every count 0–3 observed (the `wealthLevel` 1 sweep adds seeds until 100 such are drawn); hiding the sky layer changes no
model digest".

### VS-33 — minor · new-problem · scope · item 16 (pricing) — the pass's history figures sit in normative text (canon R11)
**Claim.** Canon R11: "history and round narration leave the normative text". §16's plain words "(153–204 before
amendments b; J-A16.01)", the base-subtotal basis "139–186 before amendments b", the total's basis "153–204 before
amendments b (J-A16.01)" and D-20's "(153–204 before amendments b, whose +12–15 pw are itemised there, J-A16.01)" are
history; §16's own rule needs only the itemised widenings, which stay.
**Required change (scope).** §16 plain words: "(153–204 before amendments b; J-A16.01)" → "(J-A16.01)"; base-subtotal basis
cell → empty; total's basis → "equal to the milestone sum above (J-A16.01)"; D-20: "(153–204 before amendments b, whose
+12–15 pw are itemised there, J-A16.01)" → "(amendments b's +12–15 pw itemised there, J-A16.01)"; J-A16.01's Part A entry
gains "(153–204 before)".

### VS-34 — minor · partial · scope · items 10, 12, 14, 15, 16, 23 — bars and hook work scheduled at no milestone; §13.8's tiers disagree
**Claim.**
* T14-1: M1's exit takes only "T14-1's TOWN `off` and below-TOWN cases"; its frequency law, CITY / METROPOLIS 100 % and
  hidden-render clauses are at no milestone, though `Features.sewers` is built at M1.
* T23-1: M1 takes only "T23-1's registry test"; its parity clauses (the parity presets' B-REF runs hold §13.5's rows) are
  at no milestone.
* T16-4: §16 lists it at M2b, while T16-4 itself says "on B-CITY at M1" and §4.7 S10b "calibrated at M1".
* S7b (5)'s island count draw and sky allocations under II.6's supply law are placed in no milestone's content, though
  T10-1 and T15-1 are M4 exit bars; §12.4's S10b re-declaration "measured at M2b" (J-A16.81) is in no exit list.
* §13.8 omits T14 from its tier lists, runs "the underground schema fixture (T12-1) … from their stages' intake" while §16
  makes T12-1 an M4 exit bar, and runs the hook tests "on the golden TOWN and CITY fixtures" in the PR tier although
  T10-1 and T15-1 need 200 and 500 CITY seeds.

**Required change (scope).** §16: M1's exit "T14-1's TOWN `off` and below-TOWN cases" → "T14-1 but its hidden-render clause
(that clause at the network stage's intake), T16-4"; M2b's exit drops T16-4 and gains "T23-1's parity clauses; S10b's
§12.4 re-declaration measured (J-A16.81)"; M4's list gains "S7b (5)'s island count draw and sky allocations under II.6's
supply law". §13.8: "The hook tests of §13.2 (T8, T10, T11, T13, T15, T25, T31) run in the PR tier on the golden TOWN and
CITY fixtures and nightly on B-CITY-lite" → "The hook tests of §13.2 (T8, T10, T11, T13, T14, T15, T25, T31) run in the
PR tier on the golden TOWN and CITY fixtures — T10-1's 200 and T15-1's 500 CITY seeds and T14-1's S0 draws nightly — and
nightly on B-CITY-lite", and the T12-1 clause per VS-03 item 3 ("the underground schema fixture (T12-1) from M4").

### VS-35 — minor · stale · scope · items 11, 12, 20, 21, 28 — the Staged list's rows (with VK-19 (5)–(6) and VP-41; apply once)
**Claim.** SettlementForge row: "the module a separate program at arm's length (§17.3, D-22)" — the separate program is
§11.3's (J-A21.81), §17.3 states only the licence. Sewers-and-islands row: "`Tunnel.navigable`, `headroomCm` and
`condition`" — the condition is a reading, not a field (J-A11.21); it lacks the rendering seat's "§8.4's depth-band view
key and §8.2's `states` rows"; "the underground rows of the granularity and site-plan tables" is VP-41's. Stage-3 row: it
lacks the rendering hooks the rendering seat named (§8.5's change markers and storey view, §11.1's plan block and storey
scenes, §12.8's cache line) and cites "the kernel's §3.4 and §3.7" and "the draw of §8.6" only.
**Required change (scope).** SettlementForge row: "(§17.3, D-22)" → "(§11.3, J-A21.81; the licence §17.3, D-22)".
Sewers-and-islands row: "`Tunnel.navigable`, `headroomCm` and `condition`" → "`Tunnel.navigable` and `headroomCm`, the
tunnel's condition read from `existence` and `closure` (J-A11.21)", and it gains "§8.4's depth-band view key and §8.2's
`states` rows"; VP-41's replacement for the underground rows; its where column gains VK-19 (6)'s "the kernel's arena
isolation (§3.4, §3.10) and tunnel kerb (§3.7)". Stage-3 row: hooks gain "§8.5's change markers and storey view, §11.1's
plan block and storey scenes, §12.8's cache line"; where: "the kernel's §3.4 and §3.7" → "the kernel's §3.3, §3.4, §3.7,
§3.8 and §3.10" and "the draw of §8.6" → "the draw of §8.5 and §8.6, the export of §11.1, the budgets of §12.7 and §12.8".

### VS-36 — minor · partial · scope · item 19 — D-2 does not carry the regional material preset the route and §2.6 cite
**Claim.** The route (item 19, scope row "D-2"): "the regional material table as a preset row". §2.6 (l. 1201–1203): "The
**optional regional shift** — rows marked `extension: 'regionalShift'`, off by default, a preset row (D-2)"; §0.2 row 19
lists D-2. D-2 is unchanged and names no material preset.
**Required change (scope).** D-2: after "…FTG's lower walled share is reachable as a preset" insert "; the regional
material shift (§2.6's `regionalShift` rows, off by default, texture and colour only) is one of its region presets (item
19)".

### VS-37 — minor · partial · scope · item 28 — §13.7's plan soft bands have no number, and the Dwellings "baseline" has no home
**Claim.** J-T: "every value has a number now … a table with an empty cell fails to load"; §13.7: each threshold "has a
number now". The item-28 row's "threshold (number now)" cell (l. 10303) names three properties and no number, and its
fallback steps "toward the band" with no band; the depth-privacy property reads a rank no row declares (`RoomRuleRow`
has no privacy column). The same cell calls "the Dwellings medians the synthesis cites … the descriptive baseline", and
Appendix A "the Dwellings numbers it cites as baselines", while §13.5 says Dwellings has "no `baselines.json` row" and
`Baseline.reference` admits no Dwellings value.
**Required change (scope).** §13.7 item-28 row, threshold cell: "circulation share per storey within ± 0.05 of its
programme row's `circulation`; room areas ordered as their rows' target areas (Spearman ≥ 0.8 per building); rooms of
scope `unit` and `service` no shallower in the door graph from the main entrance than the `shared` and `circulation` rooms
of their storey in ≥ 90 % of buildings (provenance 'architecture 2026-09-27'); the Dwellings synthesis's medians a
research-side note, never a `baselines.json` row (§13.5)"; fallback "steps once toward the band" → "steps once toward the
band's centre"; §13.2's soft-band sentence "rooms deeper from the street the more private they are" → "unit and service
rooms no shallower than the shared and circulation rooms (§13.7's row)"; Appendix A: "the Dwellings numbers it cites as
baselines are CONFIRMED" → "the Dwellings numbers it cites — research-side notes, never `baselines.json` rows (§13.5) —
are CONFIRMED".

### VS-38 — minor · duplicate · scope · item 23 — §17.1 (6) restates §7.6's mechanism (with VD-35b's §1.4; apply once)
**Claim.** §7.6 is item 23's home ("The mechanism is the cell: a cell's `provenance.source` names the reference behaviour
… a cell that extends the references carries `extension: { over; mode }` … the parity presets … set every `extension`
cell's chance or weight to 0"). §17.1 (6) (l. 10979–10982) restates it: "A default cell that emulates a reference's
behaviour carries `ref:⟨reference⟩ ⟨behaviour⟩` as its source … and a cell that extends the references carries §7.6's
`extension` marker beside its source (item 23): the two together tell an emulated default from our own tendency, which is
what the parity presets switch off". §1.4's paragraph does the same (VD-35b).
**Required change (scope).** §17.1 (6): replace that sentence with "Item 23 reads a default cell's `ref:` source beside
§7.6's `extension` marker (§7.6) — for example `ref:FTG lifestyle distribution`, `ref:FTG shanty rule`, `ref:FTG farmland
modes`, `ref:MFCG gate law`."; §1.4 and J-A23.01's index row per VD-35b.

### VS-39 — minor · partial · scope · item 24 — §13.9 (5)'s item list omits 24 while its text re-signs the market weights
**Claim.** §13.9 (5): "Amendments b's tables join the first re-signing (items 16 (d), 19 (d), 26, 27, 28, 30 and 31): …
the market-siting weights (§4.2) …".
**Required change (scope).** "(items 16 (d), 19 (d), 26, 27, 28, 30 and 31)" → "(items 16 (d), 19 (d), 24, 26, 27, 28, 30
and 31)".

### VS-40 — minor · conflict · scope · the J-A id scheme — the index's first-digit rule does not match the rows
**Claim.** The inserted index paragraph (l. 11929–11932): "the first digit of ⟨n⟩ names the ruling's home — 0 for the
scope part …, otherwise the number of the section family that states the rule". The rendering rows use 8 for §9, §11 and
§12 (J-A30.81 "§9.2", J-A20.81 "§11.3", J-A16.81 "§12.4"), and the pipeline rows 4 for §10 and PART II (J-A16.44 "§10.1",
J-A28.43 "§10.2", J-A10.41 "II.6", J-A12.41 "II.7").
**Required change (scope).** "otherwise the number of the section family that states the rule" → "otherwise the seat's
part: 2 model (§2), 3 kernel (§3), 4 pipeline (§4, §10, PART II, PART III), 5, 6 or 7 determinism (the section family
that states the rule), 8 rendering (§8, §9, §11, §12)".

## 5 Issues against this part raised by the other verifiers — confirmed

| id (report) | subject in this part | this seat |
|---|---|---|
| VD-05 (determinism) | T20-2's lapse test | confirmed: T20-2 already reads J-A20.41's rule, which VD-05 recommends adopting; no scope change unless the ruling differs |
| VD-11b (determinism) | §0.2 row 25's repair operator | folded into VS-13 |
| VD-12c (determinism) / VP-11 (pipeline) | T31-9 | reconciled in VS-12: adopt VD-12c's wording (it also covers rung 1's extensions) |
| VD-35b (determinism) | §1.4's item-23 paragraph and J-A23.01 | confirmed; applied with VS-38 |
| VK-01 (kernel, blocker) | J-A21.31's index row "no longer on its licence" | confirmed: §17.3 (proprietary), §17.4 and D-14 exclude CGAL as GPL; the row and §3.1 follow VK-01 |
| VK-16 (kernel) | J-A21.01's Part A sentence endorsing J-A21.31 | confirmed |
| VK-17 (kernel) | §13.1's transient-arena and re-cut fixtures | stands as written (the kernel's arithmetic not re-derived here) |
| VK-18 (kernel) | T28-14 and J-A28.01 citing §3.10 | confirmed: §2.6 holds the shell's leaf-digest bar, §3.10's row is the tiling |
| VK-19 (kernel) | §0.2 rows 12, 21, 28, 30 and the Staged rows | confirmed; (5)–(6) applied with VS-35 |
| VK-20 (kernel) | §14's `Kernel.plat(key: ArenaKey)` | stands as written |
| VP-38 (pipeline) | T25-1 and row 25 `silt` → `siltReach` | folded into VS-13 |
| VP-39 (pipeline) | §14's "RelationRule and SupplyEdge are §4.7's" | confirmed: §10.2 declares both (l. 8444, 8452) |
| VP-40 (pipeline) | T8-7 "every `relet` down marks its plan rung `stale`" | confirmed: §7.4's convert row "marks an unstored plan stale and re-cuts a stored one inside the event" |
| VP-41 (pipeline) | the Staged row's "underground rows of the granularity and site-plan tables" | folded into VS-35 |
| V-MAB-35 (model) | §0.2 row 11's `Tunnel.condition` | folded into VS-13 |
| VR-31 (rendering) | §13.3's placement digests per knowledge key | = VS-21 |
| VR-32 (rendering) | the summary's "(§17.3, D-22)" | folded into VS-08 |

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED (read on disk or executed; document sha256 `87d8969209c7deb5…`, the assembler's, unchanged through this
lane).** Every quotation and line number above. `refs.py` on the live document: 139 heading keys, 35 D ids, 432 J ids,
2 broken references, both the pre-existing external ones. A script over the document: 83 `T⟨item⟩-⟨n⟩` ids defined in
§13.2, 0 cited but undefined, T28-13 – T28-16 cited nowhere outside §13.2 (VS-03). The event-kind diff against the archive
(`t: '…'` kinds): new are `drawPassage`, `placeAt`, `rejectSite`, `setEntrance`, the seven plan events and
`setRoomUnit` (VS-23). The O14 letters before and after (archive l. 8601, 8604; live l. 10771, 10774) (VS-05); the
should-have line and cuts paragraph before and after (archive l. 8662, 8692) (VS-06); §15.1 B13 unchanged from the
archive (VS-07); `ls docs/validation/` has no `amendments-applied.md` (VS-10); `PlanBuilder` occurs only in §0.2 and §14
(VS-25); no `InteriorLadderRow` / `interiorLadder` / `interior.ladder` anywhere (VS-18); `docs/confidence/ftg.md` "farmland
has four modes (F21)" (VS-17); the editor lane's guard in `workflows/09-amendments-b.js` ("use INSERT AFTER or APPEND
TO SECTION blocks, never REPLACE, for those two") and the repair lane's prompt without it (VS-08); every §16 sum
re-added by hand (base 151–201, total 165–219, the increments 12–15, the cuts 133–172 / 147–190).

**PLAUSIBLE (reasoning on the texts).** VS-02's claim that no non-plaza site can win rests on the stated default weights
(the site penalties of S3 (1) carry no stated size); VS-32's claim that `S_town` often falls below τ rests on the cuts
being per-town built-land quantiles; the recommended directions of VS-01 (parity presets for the panel) and VS-02
(re-weight rather than relax) and every proposed number (VS-32's 0.5 and 100 seeds, VS-37's ± 0.05, 0.8 and 90 %) are
this seat's judgment, vetoable by the repair seat.
