# Verify — pipeline (base §4, §10, PART II, PART III) after repair round 3

> Lane `coherence/verify-pipeline-r3t` · opus verifier · 2026-10-01 · live base `docs/ARCHITECTURE.md` sha256 `593c657d…`
> (assemble-r3's output; HEAD `247b290`), volumes at assemble-r3's hashes. Design files untouched.

PROGRESS
- P0 brief read whole (incl. ROUND-3 NOTES, NEW OWNER RULES 114–116, ORCHESTRATION NOTES); resume check (no output, no LANDED): done
- P1 inputs: round-2 findings (verify-pipeline-r2t, 18 issues), adjudication-r3 (R3-01 – R3-27, Part H · pipeline and every END line naming this unit or my round-2 ids), repair-r3-pipeline (11 REPLACE blocks, 5 END lines, 7 judgment calls, hand-offs), assemble-r3 (202/202 applied; no other unit's block lands in this scope): done
- P2 every round-2 finding re-checked against the live text, with each END line's second end: done — 18 of 18 FIXED
- P3 the pipeline unit's 28 round-3 dispositions re-checked; every round-3 block in scope word-diffed against assemble-r2's text (scratch `vp3/secs/*.wdiff`) and read whole subsection by subsection: done
- P4 references, ids, retired terms, review ids and doc_checks on the touched sections: done
- P5 findings, result file, LANDED: done

## Sources

- Live: `docs/ARCHITECTURE.md` `593c657d…`; before the round: assemble-r2's text at commit `91f0792` (`4ed292e9…`).
- Round 3: `adjudication-r3.md` (R3-09 – R3-12, R3-14, R3-15, R3-17, R3-18, R3-22, R3-25, R3-27 whole; Part H · pipeline; END
  lines under V01, V06, V08, V11, V12, determinism, rendering, scope that close my round-2 ids), `repair-r3-pipeline.md`,
  `assemble-r3.md`.
- Round 2: `verify-pipeline-r2t.md`, `results/coherence_verify-pipeline-r2t.json`.
- The only round-3 blocks in this unit's scope are repair-r3-pipeline's eleven (§4.2, §4.3, §4.4, §4.6, §4.7, §4.8, §4.9,
  §4.11, §4.13, §10.2, II.7.2); no other unit's block touches §4, §10, PART II or PART III (assemble-r3's routing; a
  section-by-section comparison of the two texts confirms exactly these eleven changed in scope).

## Part 1 — round-2 findings re-checked (18 of 18 FIXED)

| id | owner | disposition (adj-r3) | verdict | evidence (live text) |
|---|---|---|---|---|
| VPC-R1-01 | V11 | FIX | FIXED | V11 l. 4155 "the types are V11 §2.8 and V11 §2.8d's, and §10.2's for item 115's ceiling and item 122's crisis tables"; l. 4310 "(§10.2's `GrandeurCeilingSettings`)" |
| VPC-R2-01 | pipeline | FIX per R3-11, R3-09 (d) | FIXED | §10.2 (b) l. 15495–15500: the source word V08 §3.16 (7) (b) gives; `regional_migration_pressure` the refugee camp, the other regional_* `none`; the stressor–condition pairing cited — the END text verbatim |
| VPC-R2-02 | determinism | FIX per R3-11, R3-09 (d) | FIXED | DR44 l. 11981: the source word, the regional clause and the pairing clause, as R3-11/R3-12 word them |
| VPC-R2-03 | V08 | FIX per R3-09 (a) | FIXED, every end | V08 §3.16 (7) (b) l. 2510–2518 (the linked none-row condition carries `event` `calamity`; one look per calamity; J-V8.136); V08 §2.5 l. 738; V11 §3.25.9 `event` row and *The readings* (l. 4567, 4575–4579); T-V6-75 (V06 l. 4142); T-ER-27's fixtures (l. 14581); T-V1-60; V12's fixtures — each a calamity with its linked `reconstruction` condition |
| VPC-R2-04 | pipeline | FIX (major) | FIXED | §4.4 S5a step 1 l. 5762–5764: walled stage impassable (S3 (7)); unwalled crosses within §4.3's grade limit, else `unserved` (S3 (9) (a)) — agrees with S3 (9) (a) l. 5427–5435 |
| VPC-R2-05 | V01 | FIX | FIXED | V01 §3.6 (7) l. 1432–1436 (the cliff band's two edges: hard `cliff` run, portal-free, rear-plot rule, no wall street, no seed/fan/lane in the band); combination row l. 2693; T-V1-45 l. 3331 |
| VPC-R2-06 | V11 | FIX | FIXED | V11 l. 3860–3867 (`stepMinCm < stepMaxCm ÷ 2` with its clamp) and T-V11-32 (a) l. 4980 |
| VPC-R2-07 | V06 | MERGED into VEL2-r2-01 | FIXED | V06 §3.5.1 (4)–(5), `heldByLock` l. 748, §3.21 rows l. 3254, 3300, T-V6-70 (f): only a dossier fall lets a protected dwelling's last household out by `relet` to 0; any other fall holds it |
| VPC-R2-08 | pipeline | FIX (major) | FIXED | II.7.2 l. 20887–20891: an empty or all-water stretch, and (judgment 5) every stretch path wet first, drain by gutter and pit — agrees with V04 §3.2 N2 l. 986–996 |
| VPC-R2-09 | pipeline | FIX per R3-10 | FIXED | §10.2 (f) l. 15574–15577 in R3-10's text; V01 §3.16's closing sentence (END) l. 2367 |
| VPC-R2-10 | rendering | MERGED into VV56-r2-02 | FIXED | §8.2 l. 13013–13017 (per building by `crisisLookYields`; `ruinTone` while any building draws it; a preview never hands over); *The layer* l. 13027 reads `crisisLookYields` |
| VPC-R2-11 | pipeline | FIX per R3-15 | FIXED | §10.2 *Crisis looks*' lead l. 15482–15486 ("(§16)", no ruling id); §16's M3b clause places it |
| VPC-R2-12 | pipeline | FIX | FIXED | `CrisisLookRow` l. 15154: `label: string; icon?: string` with the display-cell comment |
| VPC-R2-13 | V11 | FIX | FIXED | V11 W77 l. 235 and §2.3 l. 444 add the crisis looks (V11 §3.25.9) |
| VPC-R2-14 | pipeline | FIX per R3-14 (7) | FIXED | §10.2 (d) `approachRoads` l. 15532–15537 (ground divided equally, remainder one each in trade-weight order; armies whole, descending size, a second only when every road holds one) |
| VPC-R2-15 | pipeline | FIX (major) | FIXED | §4.2 S1 (10) l. 5169–5172 (no cavern row: the ore clause false; §7.6 *Invalidation by slice* re-derives when the row lands) |
| VPC-R2-16 | pipeline | MERGED into VDC2-13 | FIXED | §4.7 l. 6950 "(§7.7 layer 2's *Bearing*; items 77, 85)"; §7.7 layer 2's **Bearing** l. 11603 exists |
| VPC-R2-17 | pipeline | FIX | FIXED | DR42 at §4.2 S0, §4.9, §10.2's `PortRows` comment; DR41 at §4.8 *Condition at generation*; no "season derivation row" / "§7.7's condition row" left in the base |
| VPC-R2-18 | determinism | MERGED into VDC2-16 | FIXED | E-07's `addUndergroundAccess` row l. 10462 (`E_NO_PATH`, the blocking building or water table) with V09's `bend.under.basement`, `refuse.under.basement`, `refuse.under.route` (V09 l. 2042–2044) |

## Part 2 — the pipeline unit's round-3 dispositions re-checked

Every id of Part H · pipeline is closed in the live text as ruled: VAF-R2T-04 (R3-14 (1): `beyondWalls`, `approachRoads`,
`approachByGate` and (e)'s cap read `campLand` only; V01 §1b's END written), VAT2-r2-01 (§4.11 *The clock* (4)'s calamity
trigger, the catch-up clause kept; V06 §3.3.1 cites the home), VAT2-r2-03 (§4.11 *The clock* (1): present at creation and
creation week, one name each; EP-15; V06 §3.20.3 and l. 409 agree), VDC2-13 (closes VPC-R2-16), VEW-04 (EP-22's
moat-level water table, agreeing with §2.6 l. 1901–1903), VEW-r2-03 (the reference point; EP-27; V06 §3.22 (2) d.'s END
l. 3348–3349), VEW-r2-05 (town enceintes, outermost envelope, no blockade gap for a castle-only town, the footprint rule;
EP-27; T-ER-27's END), VKr2-05 (§4.3 and §4.6 cite `RaisedWayRecord.feet`; the ring-end foot draws neither), VRC2T-03
(the carriageway sentence; EP-27), VV56-r2-07 (`h` stated), VV78-r2-05 (one count, the village rungs, no siege line at THORP
and HAMLET; V07 §5.6 (1)–(3) agree); the MERGED ids close with them. The five END lines (VEW-r2-01 at §4.4 *Outer moats* and
§4.8 *Gates*, VRC2T-16 at §10.2 (g), VV12-r2-02 at §10.2 (d), VPC-R2-03/VAH-r2-02 at §10.2 (b), ADJ-r3-01 at §10.2's comment)
are written; §2.9's *crisis framing* (l. 3416) and §8.8 agree with (g); §2.7's support step (6) and V06 §3.7.6 (5) agree with
§4.4 and §4.8. The judgment calls are sound: judgment 1's widened footprint exception is the only reading that keeps item
122 (b)'s on-building parts (T-ER-27's END already reads "but the parts §10.2 (d) draws on the buildings themselves"), and
judgment 6 keeps the replaced sentence's fact.

## Part 3 — round-3 blocks in scope: new problems

Read whole: the eleven replaced subsections, against their round-2 text word by word. Retired terms ("realm block"),
review ids (`R2-nn`, `R3-nn`, verifier ids) and deferral words: none in §4, §10, PART II or PART III. Ids: no new id,
no collision. References: the assemble's resolver found none broken; by hand, two citations in round-3 text resolve to the
wrong statement (VPC-R3-06, VPC-R3-07). Document checks on the eleven sections: exit 0 — C1 5/0, C2 1/0, C3 209/0, C4 1/0,
S1 0, S2 251/0 unreviewed — **PROVISIONAL**: the tool warns the reference corpus is incomplete in this checkout (captures,
research/patreon, research/devlogs, research/ftg-docs, research/external absent).

New findings (fresh ids):

* **VPC-R3-01 (major, EDGE-UNTESTED; scope).** §4.11 *The clock* (4) now folds an epoch at three triggers (the 52-week
  boundary, the roster tolerance, and the week of each newly carried calamity no other epoch falls on). T76-1's cadence
  clause (l. 17996–17998), the cadence's bar, still names two ("an epoch folds at each 52-week boundary and at a
  population move past the roster tolerance"); no volume test covers a mid-year calamity fold (T-V8-42's calamity rides a
  week-52 year end; T-V6-25 and T-V6-59 test cadence independence only). An implementation without the calamity trigger
  passes every bar. The pipeline repair listed this as a new hand-off to scope; it is unwritten.
* **VPC-R3-02 (major, WIRING; pipeline).** §10.2 *Crisis looks*' new lead states the outcome before each service lands
  (V01's W10 at M5, V06's E2 at M6-E for `frontierFor`, V07's step) but omits V06's `crisisLookYields`, built in the same
  E2 (V06 W93; V06 §8's E2 row, l. 4279). Its readers land earlier or apart: §8.2's `ruinTone` and building damage at M5
  with W10 ("a district's `ruinTone` stands while any of its buildings still draws the look", l. 13015–13016), V02's
  ruined exterior at M6. M6-E "runs beside M5" (§16), so between W10 and E2 a standing disaster look reads an input with
  no producer and no stated outcome — the same class R3-15 graded MAJOR for VPC-R2-11. The rule itself reads only base
  records (`Building.works`, §2.6; the lifecycle's weeks, §4.11 *Works* (9)).
* **VPC-R3-03 (major, EDGE-UNDEFINED; pipeline).** §10.2 (d)'s rewritten carriageway rule admits on a carriageway "only a
  `barricade` across it ((f)'s `raiders` barricaded roads and `rebellion` street barricades, §8.2's `blockade` barricade)
  — never a camp or any other part". Item 122 (b) names two more barriers: the beast attack's "stake barricades" and
  disease's "cordon". V07 §5.6 (7) (l. 3495) puts "stake barricades at its way crossings"; V01 §3.16 (l. 2325) reads
  `affectedQuarter` as "the quarter its cordon closes", yet a cordon that may not cross the ways entering the quarter cannot
  close it, and no text states the cordon's course. Two builders draw a quarantine cordon differently (closed across the
  streets, against §10.2 (d) and T-ER-27's "none on a carriageway but a barricade's"; or gapped at every street, against
  V01's "closes"), and V07's stakes contradict the base.
* **VPC-R3-04 (minor, CONFLICT; V07).** R3-14 (1) makes every camp place take its faces from `campLand` only, and §10.2 (d)
  reads the village places "as V07 §5.6 (2) states". V07 §5.6 (2)'s `beyondWalls` row ("`siegeStandoffM` beyond the
  palisade's walled stretches") and `approachRoads` row ("the verges of each entry's way beyond the perimeter, one camp per
  entry") name no `campLand` (its `approachByGate` and `outside` rows do) and omit the base row's division of the camped
  ground and placing of the armies. §10.2 (d)'s general sentence and V07's "every other rule … unchanged" still give one
  build, hence minor: a restatement narrower in form.
* **VPC-R3-05 (minor, TERM; model).** R3-18 makes "creation week" the `generate` event's week (the replay's start on a
  history-first document) and "present at creation" the dossier's present. §2.7's `HistoryHint.calamities` comment (l. 2452)
  still reads "calamityHistory before the creation week" — read under the new names, it drops the calamities between the
  replay's start and the present, which DR37's replay maps. The port fills the hint before the replay plan exists, so a
  builder can only mean the present; the word is stale.
* **VPC-R3-06 (minor, BROKEN-REFERENCE; pipeline).** §4.8 *Gates*' new sentence (l. 7566–7567): "the part-0 way beneath,
  if any, taking its own ground gate by the gate law (§4.4 *Outer moats*)" — §4.4 *Outer moats* states the ground gate, not
  the gate law, whose home is §4.2 S3 (4).
* **VPC-R3-07 (minor, BROKEN-REFERENCE; pipeline).** §10.2 (d)'s `approachRoads` bullet (R3-14's binding text, l. 15532)
  cites "(V01 §3.16 (2))" for `campLand`'s verges; in V01 §3.16 the numbered (2) is `disasterSource`'s **The calamity**
  (l. 2333), and the verges are clause (2) inside the `campLand` entry (l. 2375), while §10.2 (c)'s "V01 §3.16 (5)" in
  the same subsection rightly means the numbered (5).

## Issues (round 3)

| id | severity | kind | owner | claim (short) | required change |
|---|---|---|---|---|---|
| VPC-R3-01 | major | EDGE-UNTESTED | scope | T76-1 omits the calamity trigger of §4.11 *The clock* (4); no test covers it | §13.2 T76-1's cadence clause (l. 17997) reads "an epoch folds at each 52-week boundary, at a population move past the roster tolerance and at the week of each newly carried calamity no other epoch falls on, none on a 2 % drift, with `years` = Δweeks ÷ 52 — on fixtures adding a calamity carried at a mid-year week with no population crossing (one epoch at its week, the calamity in its `EpochInputs.events`), one at a week-52 boundary (no second epoch) and one inside a coarsened catch-up (riding the coarse epoch that holds its week, V06 §6.8 (6))" |
| VPC-R3-02 | major | WIRING | pipeline | `crisisLookYields` (V06 E2) read from M5 with no pre-landing outcome | §10.2 *Crisis looks*' lead, after "…(V06 §3.22 (2) (d)'s no-frontier answer);", add "until V06's E2 (M6-E) a building leaves the `disaster` look by V06 §3.22 (3)'s rule read directly over the base's records — a Works other than a `decay` Works begun on it by the view's week and not finished before the overlay's `sinceWeek` (`Building.works`, §2.6; the lifecycle's weeks once a record retires, §4.11 *Works* (9)), never for a preview — so §8.2's `ruinTone` and the buildings' damage read one answer from the look's first milestone;" |
| VPC-R3-03 | major | EDGE-UNDEFINED | pipeline | carriageway rule bars item 122 (b)'s stake barricades and cordon; the cordon's course undefined | §10.2 (d), l. 15514–15516: read "and on a way's carriageway only a barrier across it — a `barricade` ((f)'s `raiders` barricaded roads and `rebellion` street barricades, §8.2's `blockade` barricade), `beast`'s `stakes` where the edge crosses a way, and the quarantine's `cordon` where it crosses a way into its quarter; item 122 (b) — never a camp or any other part"; (f) `quarantine`: "and a cordon closing the `affectedQuarter` — along its boundary on the quarter's side of each bounding way's corridor, across each way that enters it"; END at rendering: §8.2's placement sentence (l. 13006–13011) names the same three barriers, and T-ER-27's "none on a carriageway but a barricade's" reads "but a barricade's, a `stakes` barricade's or a cordon's across it", with a quarantine fixture whose quarter is entered by ways |
| VPC-R3-04 | minor | CONFLICT | V07 | V07 §5.6 (2)'s `beyondWalls` and `approachRoads` rows name no `campLand` and omit the ground's division | V07 §5.6 (2): `beyondWalls` reads "the `campLand` faces lying at least `siegeStandoffM` beyond the palisade's walled stretches (V07 §3.4), …"; `approachRoads` reads "`campLand`'s verges of each entry's way beyond the perimeter, one camp per entry, the camped ground and the dossier's armies divided among the entries as §10.2 (d)'s `approachRoads` states (the entries in the main approach road's order); an entry whose verges hold no `campLand` takes the `campLand` nearest where it leaves; with no entry, the `campLand` faces nearest the perimeter" |
| VPC-R3-05 | minor | TERM | model | `HistoryHint.calamities` "before the creation week" under R3-18's two names | §2.7 l. 2452: "calamityHistory before the creation week" reads "calamityHistory up to the present at creation (§4.11 *The clock* (1))" |
| VPC-R3-06 | minor | BROKEN-REFERENCE | pipeline | §4.8's gate-law citation names §4.4 *Outer moats* | §4.8 l. 7567: "by the gate law (§4.4 *Outer moats*)" reads "by the gate law (§4.2 S3 (4); §4.4 *Outer moats*)" |
| VPC-R3-07 | minor | BROKEN-REFERENCE | pipeline | "(V01 §3.16 (2))" resolves to `disasterSource`'s calamity item | §10.2 (d) `approachRoads`, l. 15532: "(V01 §3.16 (2))" reads "(V01 §3.16's `campLand` (2))" |

Totals: 7 issues — 0 blocker, 3 major (pipeline 2, scope 1), 4 minor (pipeline 2, V07 1, model 1). Round-2 findings: 18 of 18
FIXED; nothing NUANCE-LOST (the unit grew; no elegance ruling or cut in this round removed content: every replaced
sentence's facts are kept, judgment 6's included).

## Size

The unit (base §4, §10, PART II, PART III): 113 622 words before round 3 → 114 795 after (+1 173, +1.0 %), all ruled
owner-item content (item 122's camp places and pre-landing outcomes, item 76's cadence trigger and the two clock weeks,
items 110/114's raised gate, item 111's outfall cases). Against the pre-coherence archive (85 919 words) the unit is +33.6 %:
the owner's file g items 102–126 (new design at build depth) arrived after the archive, so the shrink band is not
measurable on this unit alone; no unit here shrank by more than half, so no nuance audit was triggered.
