# repair-r2-pipeline — lane coherence/repair-pipeline-r2 (unit pipeline: base §4, §10, PART II, PART III)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-pipeline-r2; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-c/apply-blocks.py): text before the first "=== " line is
# ignored. Base: docs/ARCHITECTURE.md sha256 137ecc0e4fe12c44… (assemble-r1's output). Each REPLACE body is the live
# subsection with count-asserted substitutions (generator docs/validation/coherence/work/repair-pipeline-r2/gen.py with
# edits.py; every untouched line is verbatim). 18 REPLACE blocks, 0 RULING REQUEST blocks.
#
# PROGRESS
# - P1 brief read whole (36 issues: 22 major, 14 minor; G122-pipeline, G122h-pipeline, G125-pipeline new design);
#   adjudication-r2 read (TOC, Part H · pipeline, R2-05, R2-12, R2-13, R2-14, R2-18, R2-22, R2-25 – R2-28, R2-31, R2-36,
#   R2-37, R2-40 whole); canon dated rulings for items 121–126 and g items 122, 122 (h)–(i), 125 read whole: done
# - P2 issue sources (verify-*-r1t), live subsections and their volume homes read: done
# - P3 68 asserted substitutions over 18 subsections (edits.py): done
# - P4 checks on scratch copies: done (receipts below)
# - P5 result file and LANDED: done
#
# DISPOSITIONS — every issue FIXED (none INVALID, none held); one fix closes each group of ids
# - VAF-R0S-08 = VPC-R1-09 = VV12-r1-02: II.1's closing comment reads "TypedBoundary §2.5's".
# - VAF-R0S-19 = VPC-R1-22: §4.7 S11 — an exempt specialisation "is not counted toward the cap" (item 101 R13).
# - VAF-R1T-04 (R2-14): §4.2 S2 and §4.7 S10b (3) carry R2-14's one gloss of "specified", citing V08 §3.16 (3).
# - G122-pipeline, G122h-pipeline (NEW DESIGN, R2-37 (3)): §10.2 declares `RosterTables.crisis` { looks, map, settings },
#   `CrisisLookKind`, `CrisisPlace`, `CrisisLookRow` (kind, place, band, scale, priority, `lookLevel?`), `CrisisMapRow`
#   (from, key, look) and `CrisisLookSettings` (densityCap, siegeStandoffM, areaPerHeadM2, enginesPerBesiegers,
#   previewSeverity), and the bullet *Crisis looks* (a)–(i): a look only, its readers (DR44, §8.2, §11, V09's Find, the
#   placement services) and never a stage; the closed mapping; scale by severity and tier, else by headcount (item 122
#   (h): 45 m² a head per army, two armies twice the ground, travelling groups alike, `exodus` and arrivals as the
#   fallback count); keyed placement on §8.10's render keys; the rule of every place; priorities under the density cap;
#   the kinds' own parts (engines one per 1 500 heads capped by gates and curtain runs, a coalition's camps spread round
#   the town, the unwalled blockade, quarantine's marked doors, famine over item 117's crop stage, disaster by V01's
#   `disasterDistricts` at `lookLevel`); framing (item 122 (i)); the limits; the bars (T122-1 – T122-7, V12's (h)–(i)
#   measurements). §4.13 gains EP-27 (the crisis looks at their limits). Placement M3b / M-SF as R2-36 places them.
# - G125-pipeline = VPC-R1-27 (R2-40 (1)): §4.11 *The clock* (1) takes a dossier-bound map's present week from the
#   dossier's own latest stamped tick (R2-40's sentence), else week 0 with the season control setting the year position;
#   (2) drops the `HostContext.week` rung; `EpochInputs.week`'s comment follows. Same item, same unit: the clock's lead,
#   (3)'s "a campaign week", *Works* (9)'s host week (a view command, item 125 (c)) and §10.2's custom-kind rung (5)
#   ("only through the dossier") brought to item 125.
# - VAL-05 = VPC-R1-08 (R2-28 (b)): II.7.4's `accessForecastMin` carries its default 0.5 beside `forecastSafety`'s.
# - VAL-08 = VPC-R1-04, VAL-R1-02 (R2-12): II.7.6 declares `AccessPassStrategy` as V04 builds it — `openings:
#   UnderOpeningRow[]`, `scope?: EpochScope`, `reached: ExcavationRecord[]`; the comment names UnderOpeningRow and cites
#   V04 §1b.2 and V04 §3.5.7 (the V04 and V06 seats rename their `AccessPass.run` to `AccessPassStrategy.run`, R2-12).
# - VAL-R1-07 = VPC-R1-16 (R2-25 (b)): II.7.2's outfall fallbacks per bank in VAL-R1-07's text, with two words kept that
#   it dropped: "and that holds no candidate" (V04 §3.2 N2's own condition; VPC-R1-16's text) and "either reported" (the
#   live text reported the moat and field fallbacks; V04 §5's `requestedVsBuilt` row says so) — nuance kept.
# - VAL-R1-08 (R2-28 (a)): §4.2 S1 (10) states the mining test once, naming `miningCellShare` with no value ("at least
#   `miningCellShare` of the frame's land cells hold `SiteResources.ore` ≥ 0.5", the same test as R2-28's "the share …
#   reaches"); II.7.6's `UndergroundSystemRow.params` list names the cavern row's `miningCellShare` (wiring).
# - VAL-R1-14 = VKr1-08: the union of their ten bare continuations prefixed (l. 4648, 5975, 6601–6602, 6977, 7311, 14314,
#   14478, 14531, 19424, 20307), plus two more of the class in §10.2 that assemble-r1's ambiguous-refs.tsv lists
#   (l. 14311 "V11 §2.8 (and V11 §2.4, V11 §2.5)", l. 14318 "V11 §2.3, V11 §2.9"); the tsv's other entries in this unit
#   are base pointers (§11, §2.6, §6.1, §4.2 S1 (5), the crypt ladder §2.6) and stay.
# - VDC1-21 (R2-22): §10.3 — the tables its household's `tableVersion` names, advanced only by re-derive people (§7.4).
# - VEL1-02 (R2-18 (a)): §4.11 step (c), the strike pool and `LadderOp.relet` carry R2-18's one exception, worded "a
#   locked or pinned dwelling a dossier population fall emptied (§7.7's precedence)"; step (c) cites T20-15.
# - VEW-r1-01 + VPC-R1-02 (one S3 (9) text, as Part H rules): (4) defines the approachable arcs (a row that does not
#   close); (9) splits *every arc closed* into (a) every closing row's wall `none` — unwalled, routes in where the class
#   grade limit admits an edge, else F-ROUTE's `unserved` — and (b) closing rows with a parapet or light wall — walled on
#   them, N₁ = 1 gate picked `steepSlope`, then `marsh`, then `cliff`, its route within the grade limit or `unserved`; (7)
#   lets (b)'s gate stand on a walled closing arc; §4.4 S5a step 1's rows and "walls the approachable arcs and the closing
#   arcs whose row carries a wall" agree (its old "walls only the approachable arcs" contradicted its own "a steep slope or
#   marsh closes behind a light wall"); EP-21 gains the sheer mesa's, the sub-sheer mesa's and the marsh-ringed town's
#   outcomes. VEW-r1-01's crossing examples drop "a marsh": under the split a marsh arc carries a light wall and is (b)'s.
#   (b) keeps a requested N₁'s count, as (4) does.
# - VEW-r1-04: §4.7 *Step regions* — an intermediate terrace splits its unit into step regions with their own datums
#   (`Plot.platformSteps`, `Block.platformSteps`, written by the model seat this round per Part H), the datums dividing
#   the step equally (each wall > `stepMaxCm` ÷ 2, ≤ `stepMaxCm`), terraces laid in the higher unit first; `levelledGroundCm`
#   reads the step region; EP-24's 2.5 × `stepMaxCm` fixture states its heights and bar.
# - VEW-r1-06: §4.6 S8 makes every cliff inside a district, widened by `shoreSetback`'s `cliff` distance, a hole before
#   the face's first cut — the existing hole mechanism of the under-deck strip (principle (9)) — so no lane, seed, block,
#   plot or footprint lies in or crosses it and a cliff across a face cuts it into faces cut on their own; §4.7 points at
#   it; EP-24 gains the fixture's counts. The issue's "split edge carrying the hard `cliff` role" is not written: §2.2
#   rule 7's role registry has no `cliff` edge role, and the band does the same work with no new role; every outcome the
#   issue names holds.
# - VKr1-04 (R2-26 (a)): `RaisedRead.feet` cites `RaisedWayRecord.feet` (§2.7).
# - VM-R1T-08 = VPC-R1-21 (R2-26 (b)): §4.13's river cell is VM-R1T-08's text with its rung; §4.3 *Where it may not go*
#   is VPC-R1-21's text.
# - VPC-01 (R2-13): §10.2 declares `GrandeurCeilingRow` and `GrandeurCeilingSettings` (V11 §2.8d's fields; `grandClasses`
#   typed `BuildingClass[]`, R2-13's one vocabulary, the same type as `string[]`); `RosterTables.grandeur` becomes
#   `{ ceiling; settings }` so the declared settings row is reachable from the tables record (wiring); the comment list
#   and the *Grandeur ceiling* bullet cite the declaration.
# - VPC-R1-03 (R2-27 (c)): §4.11's walls ladder names `worn` and `patched`.
# - VPC-R1-13: §4.5 (3) cites the brothel class row's rows at V11 §3.5.
# - VPC-R1-18: (a) "bank kind `quay`" at both §4.8 lines, and the third slip of the class in §4.8 ("their bank kinds");
#   (b) "hollow" for "retired" in §4.11 *Regrowth-first*.
# - VPC-R1-23: II.7.6 step 3's no-route outcome (`E_NO_PATH`): a refusal naming the blocking building or the water table,
#   F-EDIT, nothing laid; the T66 group's enclosed-basement fixture is scope's row (HAND-OFFS).
# - VPC-R1-24 (R2-26 (d)): §4.6 cites `raisedWays.structure.stripMarginM` (V11 §3.24.2), no value.
# - VPC-R1-25: EP-26 gains the TOWN fixture; the THORP fixture runs with V07 registered.
# Receiving ends this round (Part H): R2-13 (§4.7 `Designation.use`, `PlacementItem.cls` typed `BuildingClass`); R2-26 (c)
# (§4.13's wall cell: "no support in a wall strip but the crossing's station on the band"); R2-27 (a) (§4.8 *Condition at
# generation* cites §2.7's welded stretch); R2-31 (a) (§4.11 *The clock* (4): "coarsened under item 119's comfort level by
# V06 §6.8 (6)"); R2-28 (a) (above). All written.
#
# JUDGMENT CALLS (vetoable; J122 where new design): item 122's placement rules are this unit's (HOMES §10.2), every value
# V11's. (1) `place` stays single-valued as R2-37 (3) declares it; a kind's further parts (quarantine's doors and cordon,
# famine's stalls, occupation's banners) are (f)'s rules. (2) The scale's unit follows the place (m² at a camp place, else
# a share) instead of a `unit` field — a derivation over a stored value. (3) The main approach road is the arterial out of
# the gate of greatest trade weight (§4.3's `TradeFlow`). (4) `affectedQuarter` is the calamity's target, else the
# district with the most households per hectare. (5) With no headcount, a siege's engines read the heads its ground
# implies (÷ `areaPerHeadM2`), so one rule sizes engines. (6) Whatever a camp cannot place — the density cap, the frame,
# a force too large — goes to §8.8's massed ring marks: one overflow mechanism for (c) and (i). (7) A coalition's camps at
# evenly spaced bearings from a keyed start. (8) Table ids `crisis.looks` (its named row `settings`) and `crisis.map`.
# (9) Terrace datums divide a step equally; terraces fill the higher unit first.
#
# HAND-OFFS (R2-05 (3): ends no ruling names, for round 3's verifiers; none is open wording in the design text)
# - V11: registry rows for `crisis.looks` (with its named row `settings`) and `crisis.map` (the ids above); T-V11-32 (a)
#   adds `stepMinCm < stepMaxCm ÷ 2`, so EP-24's bar ((`stepMinCm`, `stepMaxCm`]) holds for every lawful row.
# - V01: V01 §3.6 (7) reads the two edges of §4.6's cliff band as hard `cliff` runs (§4.6 states it).
# - determinism: §7.1's `addUndergroundAccess` outcome row adds "or whose connector finds no route (II.7.6, `E_NO_PATH`)",
#   its message naming the blocking building or the water table; §7.7 l. 11245's "the host's campaign week (item 76)"
#   reads the dossier's ticks (item 125); DR44 reads §10.2's `map` rows and `CrisisLookRow` as declared.
# - scope: §13.2's T66 group gains the enclosed-basement fixture (VPC-R1-23); J-A76.41's index row and Part A entry read
#   the dossier's latest stamped tick (VPC-R1-27's note); B-EDGE runs EP-27.
# - V09: V09 §4.17's access-edit rows add the no-route refusal.
#
# CHECKS (receipts in the scratchpad's coherence/rp2/)
# - apply-blocks on a copy of the live base 137ecc0e…: 18 found, 18 applied, 0 skipped; audit 0 not OK; headings
#   153 → 153; fences balanced (140 → 140); title block unchanged; rationale untouched (630da959…).
# - Every one of the 36 ids is carried by at least one asserted edit (gen-log.json); a residue scan of the patched unit
#   finds no `HostContext`, "hall or similar", "retired way", `OpeningRow[]` in II.7.6, `raised.stripMarginM`, "bank class",
#   "campaign week" or "TypedBoundary V01"; every new "Vnn §x" reference resolves to a heading of its volume.
# - doc_checks over §4.1–§4.8, §4.11, §4.13, §10.2, §10.3, II.1, II.6, II.7.2, II.7.4, II.7.6 on the patched copy: C1 5/0,
#   C2 1/0, C3 275/0, C4 1/0, S1 0/0, S2 186/1 — with the warning "reference corpus INCOMPLETE (captures,
#   research/patreon, research/devlogs, research/ftg-docs, research/external missing) … NOT authoritative": provisional.
#   The one unreviewed hit is R2-31 (a)'s prescribed pointer "V06 §6.8 (6)" (S2 reads the base's headings only).
#   PROPOSED ALLOW ROW (for Assemble's allow block): S2 | §6.8 | final base §4.11 *The clock* (4): "V06 §6.8 (6)", a
#   pointer into V06 (its §6.8 *The comfort level*), not into this document; refs resolve it in V06 (R2-31 (a)'s text).
# - Size of the unit (§4, §10.1–§10.4, PART II, PART III): 110 108 → 113 524 words (+3 416, +3.1 %). The growth is new
#   design (items 122 and 122 (h)–(i) ≈ 2 300 words, item 125 ≈ 150) and the edges this round defines (S3 (9)'s split,
#   step regions, the cliff band, the no-route refusal, EP-27 ≈ 950); restatement cut this round: §10.2's "specified"
#   glosses replaced by R2-14's one gloss, §4.6's strip cell cited; no narration added. The shrink band is not this
#   round's: the unit's words are owner-item content (principle (9)'s guard).
