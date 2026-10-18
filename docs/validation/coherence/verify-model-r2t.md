# verify-model-r2t — the base part §2 (domain model and schemas) after repair round 2

> Lane `coherence/verify-model-r2t` (opus verifier, 2026-10-01). Scope: `## §2 ` of `docs/ARCHITECTURE.md` after
> assemble-r2 (base sha256 `4ed292e9…`; before: `137ecc0e…`, assemble-r1's output). Design files untouched.

PROGRESS
- P0 brief read whole (incl. ROUND-2 NOTES, NEW OWNER RULES 114–116, ORCHESTRATION NOTES); no prior output, no LANDED line: fresh run — done
- P1 inputs: round-1 findings (verify-model-r1t, 22 issues), adjudication-r2 (R2-05, R2-13, R2-18, R2-22 – R2-28, R2-30, R2-33, R2-35 – R2-41 and Part H · model and every row naming a VM id), round2-work/model.json (25 ids), repair-r2-model.md (header, issue map, interpretations, hand-offs), assemble-r2 (model: 7 blocks applied, 0 skipped), canon routing of g 120–126, g items 120, 122, 122 (h)–(i), 123, 124, 125 — done
- P2 §2 diff pre → post assemble-r2: 48 hunks, each read in its whole record or paragraph — done
- P3 the 22 round-1 findings re-checked against the live set (base and volumes) — done
- P4 the 25 round-2 model ids and their receiving ends checked; g 120, 122, 122 (h)–(i), 123, 124, 125 model parts checked as new design (wiring, lifecycle, edges, agreement) — done
- P5 doc checks, sizes, report, result file, LANDED — done

## 1. Method and figures

* **What changed in §2.** `diff` of §2 between the assemble-r1 text and the live text: 48 hunks in §2.2, §2.3, §2.5, §2.6,
  §2.7, §2.8 and §2.9 (§2.1 and §2.4 untouched), all from repair-r2-model's seven REPLACE blocks (53 count-asserted
  substitutions). Every hunk was read in its whole record or paragraph, and every reference it adds was resolved.
* **Words** (`wc -w` over `## §2 ` to `## §3 `): **57 534 → 60 298 (+4.8 %)**; against the archive (round 1's figure,
  53 256) +13.2 %. Per subsection (whitespace tokens): §2.2 +25, §2.3 −8, §2.5 +346, §2.6 +601, §2.7 +783, §2.8 +3,
  §2.9 +1 069. What holds it: owner items 120, 122, 122 (h)–(i), 123, 124 and 125 written at build depth (≈ 2 300 words:
  the damage layer, `FindChip` and `find`, `crises`, *The week's source*, *Weather effects*, *The crisis framing*, the
  `ConditionOverlay` and *staged records* lines), the round's edge rulings (the ring foot, the crossing station, the
  welded stretch, `platformSteps`), and `DistrictKind`. Removals this round came from restatement only (the mining test,
  `OutlineTemplateId`, `HoodRecipe`'s literal values, the span strip's own outline). No unit shrank by more than half;
  no NUANCE-LOST audit was triggered, and the hunks' removals were each checked against their new homes: none lost.
* **doc_checks.py --sections 2:** exit 0 — C1 5/0, C2 1/0, C3 390/0, C4 1/0, S1 0/0, S2 208/0 (hits/unreviewed).
  PROVISIONAL: "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs,
  research/external) — clean-room results are NOT authoritative".
* **Standing rules in §2:** deferral wording 0 ("later" only temporal); phone clauses 0 (R2-41); review-id narration
  (`R2-nn`, `VM-…`, round talk) 0 in §2; `HostContext.week`/`realm`/`customLibrary` as inputs 0.

## 2. Round-1 findings re-checked (22)

| id | owner | verdict | where |
|---|---|---|---|
| VM-R0S-14 | scope | FIXED | §13.1's *stretch-state writes* bar (l. 17152–17158), every clause of the required change, negative control included |
| VM-R0S-17 | scope | FIXED | §14's @plat/model comment (l. 19120): "FabricStrategyId is §2.5's: the id of a registered fabric — `bent-cut`, a hood.templates row (V01 §2.2) or V07's `village-ways`" |
| VM-R1T-01 | model | FIXED (one fix with VPC-R1-10, VV12-r1-01; R2-13) | §2.9's declaration deleted; the comment line points at §4.2 S1 (2)'s closed union (`d_shape`); `HoodRecipe.outline` cites it |
| VM-R1T-02 | model | FIXED (R2-13) | `HoodRecipe.size?` names `size.small`/`.medium`/`.large` (V01 §3.14), `leafy?` `green.leafyCourt`; the cells exist in V01's register (l. 2185, 2203) |
| VM-R1T-03 | V01 | FIXED | V01 §2.6 (l. 613) cites §2.9; no `interface HoodRecipe` left in V01 |
| VM-R1T-04 | V01 | FIXED | V01 §2.1 (l. 361) |
| VM-R1T-05 | V02 | FIXED (one fix with VAF-R0S-03) | V02 §2.2's lead (l. 434) names `DormerRow`, `DormerKind`, `PorchKind` as §2.6's; V02 §2.6 (l. 682) cites §2.7 for `TierLay`, `LaidWing`; no declaration left |
| VM-R1T-06 | V06 | FIXED (R2-13) | V06 §2.9 (l. 737) |
| VM-R1T-07 | V08 | FIXED (R2-13) | V08 §3.15 (2) (l. 2297–2312): the ts block gone, the source mapping kept |
| VM-R1T-08 | pipeline | FIXED (one fix with VPC-R1-21; R2-26 (b)) | §4.13's river, coast, moat cell (l. 8823) with its *Rung*; §4.3 *Where it may not go* (l. 5618) |
| VM-R1T-09 | V06 | FIXED (R2-26 (b)) | V06 §3.19 (5) (l. 2790), §2.10's `raised.waited` (l. 767), J-V6.122 |
| VM-R1T-10 | scope | FIXED (R2-26 (b)) | T110-2 (l. 17982–17992): square, grove, 200 m river (dropped, waiting; declared bent), the two wall crossings; T110-5: no deck plot on a gate's moat bridge |
| VM-R1T-11 | determinism | FIXED | §6.1's `raised.reason` row cites `RaisedReasonKey` (§2.7); §5.3's Works row `Household.transit`, §2.7 |
| VM-R1T-12 | model | FIXED | `Household.transit` read by "the runner's close (V06 §2.1: the ledger's pool empty at the epoch's end, T-V6-52)"; V06 l. 484–485 agree |
| VM-R1T-13 | model | FIXED (R2-13) | `Use.cls: BuildingClass`, §2.5's allocation `cls: BuildingClass`, the vocabulary list; pipeline's end: `Designation.use` and `PlacementItem.cls` typed `BuildingClass` (l. 7132, 6985) |
| VM-R1T-14 | model | FIXED (R2-23) | `HistoryHint`: the four lists optional, absent read as []; the standalone form stated; `peak`'s comment names it |
| VM-R1T-15 | V09 | FIXED in substance (R2-23); the fix carries review-id narration — VM-R2T-09 | V09 §4.21.3 (1) (l. 3283–3285) |
| VM-R1T-16 | V10 | FIXED (R2-23) | V10 §4.1's T1 row: `{ peak: { tier: onceA, symbolic: false, evidence: [] }, ageYears: ageYears ?? V09's history.defaultAgeYears, scars: [] }` |
| G120-model | model | PRESENT (R2-33 (a)) | `type FindChip`; the `find` key with writers, readers, lifecycle, migration from `coverage`, bars; §11.3 lists `find` among the keys that never cross. Wiring gap at V10's end: VM-R2T-07; V07's restatement: VM-R2T-11 |
| G122-model | model | PRESENT (R2-37 (1), (2)) | `ConditionOverlay`'s reader comment (DR44, `week` in [sinceWeek, untilWeek), never `yearWeek`, `crises`, admission); *The dossier's staged records* (a look only, T122-1, the epoch path); the `crises` key |
| G123-model | model | PRESENT (R2-38 (1)) with two disagreements with its homes — VM-R2T-01, VM-R2T-02 | §2.6 step 7's damage layer; *The re-cut, both ways* scoped to a standing building |
| G124-model | model | PRESENT (R2-39 (f); phone clause MOOT, R2-41) | §2.9 *Weather effects*: `weather` the cover (an arid row's `snow` drawn `clear`), the switch V09's `AppPrefs.weatherEffects`, the spell session-transient on §6.1's `view.weather` |

## 3. The round's other model ids (checked as the repair claimed them)

| id | verdict | note |
|---|---|---|
| VAF-R1T-03 | FIXED | `District.kind`'s village clause cites V11 §3.9's row (V11 l. 2301 area: the `village` row) |
| G122h-model | PRESENT (R2-37 (8), R2-30) | *The crisis framing*; one disagreement with §9.5/§8.7 on what it reframes — VM-R2T-08 |
| G125-model | PRESENT (R2-40 (1)) | *The week's source*; `yearWeek`'s and `seasonFollow`'s fallback; the `week` key a view command under a host; DR42 and §14's `HostContext` agree |
| VAL-18 = VRC1T-11 | FIXED | VRC1T-11's text; V05 §3.14 resolves |
| VDC1-20 | FIXED (R2-22) | `Household.tableVersion` names its writer; §7.4/§10.3 agree |
| VEL1-01 | FIXED (R2-18 (a)) | the clamp's one exception in R2-18's words; §5.3's capacity row carries it (determinism took the model's hand-off, l. 9037) |
| VEW-04 | PARTLY FIXED (R2-25 (a)) | §2.6's water table reads the moat's derived level; its EP-22 fixture, which VEW-04's required change and R2-25 (a) name, is absent from §4.13 — VM-R2T-06 |
| VEW-r1-02 | FIXED (R2-27 (a)) | *The castle's welded stretch*; §4.8 (l. 7496), V06 §3.7.7 (3) and §13.2's CITY fixture (l. 18048) carry their ends |
| VEW-r1-03 | FIXED (R2-26 (c)); a combination edge the new station opens — VM-R2T-03 | support step (3)'s crossing station; §4.13's wall cell, V06 §3.7.6 (5), T110-2 carry their ends |
| VKr1-02 | FIXED (R2-26 (a)); two restatements left — VM-R2T-04, VM-R2T-05 | the ring foot in `RaisedFoot`'s block, `feet`, `ground`, the opening line, support step (1) and *At the frame*; §3.4 and §4.1's `RaisedRead.feet` cite §2.7 |
| VKr1-07 | FIXED (R2-24) | `Plat.frame`'s comment |
| VPC-R1-10, VV12-r1-01 | FIXED (one fix with VM-R1T-01) | |
| VPC-R1-12 | FIXED (R2-13) | `type DistrictKind` beside `District`; §10.2's `RosterTables.districtKinds` / `DistrictKindRow.kind` exist |
| VPC-R1-17 | FIXED | `spring.flow` [0, 1], 0 a lost spring |
| pipeline's VEW-r1-04 (§2.5 end) | FIXED | `Block.platformSteps?`, `Plot.platformSteps?` with writer, reader, digest, migration; §4.7's levelling and `levelledGroundCm` agree; §2.8's registry names them |
| R2-28 (a) receiving end | FIXED | `Terrain.mining` cites §4.2 S1 (10)'s one test |
| R2-26 (d) receiving end | FIXED | the span rule's strip is its stretch of §4.6's under-deck strip without `stripMarginM`; §4.6 agrees |
| R2-20 / R2-27 (e) | FIXED, one incomplete restatement — VM-R2T-10 | `conditionEpoch` numbered by §6.1; the patch order by week |

Owner items not routed to model: 121 and 126 (canon). Items 114–119: unchanged except the hunks above; earlier
verdicts (PRESENT) stand.

## 4. New findings (round 2)

**VM-R2T-01 · major · CONFLICT · model — the plan a decaying building keeps, and its stale rule.** §2.6 step 7's new
damage layer says the plan in force stands — "the stored plan, else the one re-derived from its canonical prior at the
building's built band and era (the as-built plan, below …)". V03 §3.11 *Decay re-cuts no plan* (b) (J-V3.137), the
volume that builds and draws the plan, re-derives an unstored plan "at the occupant inputs it held in the week before
its run began … the plan the building was last lived in, which for a building never re-let is its as-built plan". The
two differ for every building re-let or re-banded before it was left: under §2.6 the plan a user saw is replaced at
abandonment by the as-built layout — "redrawn as new", against item 123's owner words ("the same generated floorplans
have to be amended rather than redrawn as new") and §2.6's own "the plan in force stands". And §2.8's elaboration
record, the home of the plan rung's inputs and `stale` triggers, still lists the households housed, the occupants' band
and value and "its running Works' stage" as inputs and stale triggers with no decay-run exception, while V03 §3.11 and
its lifecycle row (V03 l. 302, "no stale mark, §2.8") say the leaving stales nothing and a `decay` or `repair` Works is
no build stage — V03 cites a §2.8 rule §2.8 does not state.
*Required change:* (1) §2.6 step 7: replace "— the plan in force stands, the stored plan, else the one re-derived from
its canonical prior at the building's built band and era (the as-built plan, below; V03 §3.11's vacant re-cut is a
standing building's only) —" with "— the plan in force when its decay run began (V06 §3.23 (1)) stands: the stored
plan, else the one re-derived from its canonical prior at the occupant inputs it held in the week before that run began
(V03 §3.11 *Decay re-cuts no plan*: the plan it was last lived in, its as-built plan (below) when never re-let); V03
§3.11's vacant re-cut is a standing building's only —". (2) §2.8, `ElaborationRecord.inputs`, the plan rung: "its
running Works' stage at the drawn week (item 67 (j))" → "its running build Works' stage at the drawn week (item 67 (j);
a `decay` or `repair` Works is none, §2.6 step 7)"; and in the `stale` sentence, after "a dossier event of items 18, 22
or 31;", add "for a building in a decay run (V06 §3.23 (1)) its occupant inputs — use, assignment, sub-locations,
concealed use, the households housed and the occupants' band and value — are those of the week before its run began
(V03 §3.11), so neither the leaving nor a later move of the field stales its plan;".

**VM-R2T-02 · major · CONFLICT · model — the decay level and the comparison, restated against their homes.** §2.6
step 7 reads the level "from its existence state, the years since the week of the epoch whose op set it `abandoned`",
and gives V11's default age to "a building with no abandonment epoch (generated ruined; first met in item 113's
replay)". V06 §3.23 (1)–(4), the level's home (R2-38 (3)), starts the decay run at the effective week (V06 §2.11) of the
lifecycle event that took the building from a standing state into `abandoned`, `decayed` or `ruined` — a `vacate`, a
fire's `burn`, a flood's or a topple's `ruin` — and keeps the default age for a building with no decay run in the log.
So a building a fire burns or a flood ruins, or one a hand edit abandons between epochs, ages from that week in V06 but
sits at the default age under §2.6. And §2.6 calls "level ≥ t" "the one comparison every reader makes", while §6.3
*Plan damage* (determinism's home of the thresholds) shows an element damaged "exactly while the level is above 0 and at
least t — a level of 0 damages nothing": V11's ranges admit lo = 0 (T-V11-47: 0 ≤ lo), so an element can draw t = 0
and §2.6's comparison damages it on a standing building, against §2.6's own "a building never decayed (level 0) draws
byte-identically" (`item123.damage`).
*Required change:* §2.6 step 7: replace "the building's **decay level** — V06's `decayLevel(doc, lineage, week)` in
[0, 1], derived and never stored, from its existence state, the years since the week of the epoch whose op set it
`abandoned` (its lifecycle events, §2.8) and V11's rate by material (timber faster than stone), read at the drawn week
(§2.9's `week`) — shows damaged every element whose t it has reached (level ≥ t), the one comparison every reader
makes." with "the building's **decay level** — V06 §3.23's `decayLevel(doc, lineage, week)` in [0, 1], derived and never
stored, from its decay run (from the effective week, V06 §2.11, of the lifecycle event that took it from a standing state
into `abandoned`, `decayed` or `ruined` — a `vacate`, a `burn`, a `ruin`; its lifecycle events, §2.8), its state and
V11's rate by material (timber faster than stone), read at the drawn week (§2.9's `week`) — shows damaged every element
whose t it has reached while above 0 (level > 0 and level ≥ t; §6.3 *Plan damage*), the one comparison every reader
makes."; and "A building with no abandonment epoch (generated ruined; first met in item 113's replay)" → "A building with
no decay run in the log (generated abandoned, decayed or ruined; first met so in item 113's replay; V06 §3.23 (4))".

**VM-R2T-03 · major · EDGE-UNDEFINED · model — a breach under a crossing station (walls decaying × a raised way through
the wall).** The new support step (3) makes the wall's band the support where a course crosses an enceinte: "the wall
carries the deck there — a … raised gate, whose tower carries the deck, or the curtain under an aqueduct's arch … that
station's support `ring` is the band's stretch under the deck, the wall's own masonry (no pier raised …)". That
stretch stays on the enceinte's condition profile, which item 114's writers break: V06 §3.7.7 (2) breaches stretches in
chain order (neglect, poverty, both low) and `DeclineOp`'s `breach` names any stretch; V06 §3.7.6 (5) holds the stretch
only against V06 §3.7.2 (2)'s dismantling while the deck stands. (A landfall is defined: V05's table breaches the wall
and ruins the span and support it covers.) No text says what a decay breach of the band under a standing deck does —
the deck keeps a station whose support is "a gap with rubble", or its spans merge across it past the clear-span bound;
neither the support step, the span rule, V06 §3.7.7 nor V06 §3.19 defines it, and no bar covers it (T110-2 builds the
crossing; the item-114 group decays rings with no raised way). Principle (11): two units' features meeting at their
limits, opened by this round's crossing station.
*Required change:* §2.7's support step (3), after "the clear-span bound reads the spans on either side of that station
(T110-2)", add: "; while the deck stands, the stretch of the band under a crossing station is held by it — `DeclineOp`'s
`breach` and V06 §3.7.7 (2)'s decay pass over it in chain order as V06 §3.7.6 (5)'s dismantling does (it may wear, and a
repair writes it as any run), a landfall over it breaching it and ruining the deck there by V05's landfall table — and
from the first epoch after the raised way is removed or the spans on either side fall it is an ordinary run"; V06
§3.7.7 (2) cites it (V06); §13.2's item-114 group gains the fixture (scope): a neglected, poor CITY ring over 20 epochs
with a masonry aqueduct through its wall arch and a viaduct on a raised gate — the stretch under each crossing station
never `breached` or `dismantled` while its deck stands, every other stretch decaying as T114-1 states.

**VM-R2T-04 · minor · CONFLICT · pipeline — the ring foot not followed by §4.3 and §4.6.** §2.7 now lets a deck end on
the arena's outer ring with no ramp or stair (`RaisedFoot`, *At the frame*; VKr1-02, R2-26 (a)). §4.3 (l. 5572) still
says "its two ends are ramps or stairs joined to ground vertices — each of its two feet a vertex on part 0 …" and §4.6's
crossing rule (l. 6569) "a raised way's two ends (§4.3) are ramps or stairs by the same rule" — no exception, so the
ramp-or-stair rule would build a ramp at the ring end that §2.7 says is never drawn.
*Required change:* §4.3: "its two ends are ramps or stairs joined to ground vertices, or an end on the arena's outer ring
with neither (§2.7's `RaisedFoot`; *At the frame*) — each of its two feet a vertex on part 0 …"; §4.6: "a raised way's
two ends (§4.3) are ramps or stairs by the same rule, but an end on the arena's outer ring, where none is drawn (§2.7's
`RaisedFoot`)".

**VM-R2T-05 · minor · CONFLICT · determinism — §7.1's `drawWay` comment.** The `raised` comment of §7.1's `drawWay`
(l. 10073) reads "its two ends ramps or stairs joined to ground vertices", while a drawn course beyond the frame bends to
the ring and ends there with no ramp (§2.7 *At the frame*, `RaisedFoot`).
*Required change:* §7.1, `drawWay`'s `raised` comment: "its two ends ramps or stairs joined to ground vertices, or an end
on the arena's outer ring (§2.7 *At the frame*: a stroke drawn beyond the frame bends to the ring)".

**VM-R2T-06 · major · EDGE-UNTESTED · pipeline — the moat's water table has no fixture.** VEW-04's required change and
R2-25 (a) ("§2.6's water table (VEW-04's text, with its EP-22 fixture)") give §2.6's new rule — a plot near a wet moat
reads the moat's derived level, not its bank top — a fixture in EP-22's hill town. The model wrote §2.6's end and handed
the fixture on (repair-r2-model HAND-OFFS); §4.13's EP-22 row (l. 8808) still carries only the dry-ditch fallback, and
no other bar tests the water table beside a moat (T-V4-80 (j) tests sewer outfalls only). The moat × slope edge, whose
old outcome was a silent wrong cellar rung, has its outcome but no test.
*Required change:* §4.13, EP-22's fixtures: add "a plot within `waterTableM` of a wet moat on the hill town's slope reads
the moat's derived level (§4.2 S3 (10)) + `freeboardCm` as its water table, never its bank top; its cellar or crypt
takes the full rung where that level allows (§2.6)".

**VM-R2T-07 · minor · BROKEN-REFERENCE · V10 — `FindView` does not resolve.** V10 l. 1014 declares
`type FindView = ViewState['find']`, and V10 l. 609's `find` action types its chips `FindView['chips']`; §2.9's
`ViewState` is `{ keys: Record<string, { value: unknown; lamport; session }> }`, which has no member `find`, so the alias
names nothing (the model's hand-off of it was not carried). V10 l. 442's `type Knowledge = ViewState['knowledge']` has
the same fault.
*Required change:* V10 l. 1014: `type FindView = { chips: FindChip[]; gaps: boolean };   // §2.9's view key \`find\`
(item 120; FindChip is §2.9's)`; V10 l. 442: `type Knowledge = { tier: 'public'|'local'|'secret'; places: Id[] };   //
§2.9's view key \`knowledge\``.

**VM-R2T-08 · minor · CONFLICT · model — what the crisis framing reframes.** §2.9's *The crisis framing* says "Only the
opening view, Fit and the limit change". §9.5's *Framing* circle is both the initial view and the default export frame,
and §9.5 widens that circle while a look stands; §8.7 cuts every export frame to the bounds of town and camps. So the
default export frame changes too, which §2.9's "only" denies.
*Required change:* §2.9 *The crisis framing*: "the opening view (§9.5's *Framing* circle, widened to contain every camp,
and with it the default export frame that circle sets; every export frame cut to those bounds, §8.7)", and "Only these
framings change: a view the user has moved is never re-framed (item 122 (i))".

**VM-R2T-09 · minor · NEW-PROBLEM (narration, principle (5)) · V09 — review ids in VM-R1T-15's fix.** V09 §4.21.3 (1)
(l. 3284) reads "— §2.7's standalone form of `HistoryHint` (VM-R1T-14; R2-23) —": a verifier's issue id and an
adjudication ruling cited in design text (the validation records keep them). (The same pattern recurs in V09, 56 lines,
and V08, 8 lines — the V08 and V09 verifiers' to sweep.)
*Required change:* V09 §4.21.3 (1): delete " (VM-R1T-14; R2-23)".

**VM-R2T-10 · minor · RESTATEMENT · model — the patch order's epoch 0.** §2.7's readers line restates V06 §3.7.7 (3):
"patches rebuilt oldest first by the week of each run's `conditionEpoch` — its `EpochRecord.week`, so a replay epoch's
patch before every live one's (§6.1) —, ties in chain order". A run patched at generation carries `conditionEpoch` 0,
which has no `EpochRecord`; V06 §3.7.7 (3) states "generation's epoch 0 first", §2.7's restatement does not, so read
alone it leaves the oldest case undefined.
*Required change:* §2.7, *Readers*: "volume 6's transitions (V06 §3.7.7 (3): patches rebuilt oldest first by the week of
each run's `conditionEpoch` — generation's epoch 0 first, a replay epoch's before every live one's (§6.1) —, ties in
chain order)".

**VM-R2T-11 · minor · CONFLICT · V07 — where Find is saved.** V07 §5.5 (l. 3324–3325) says Find's key is "saved only in
view pins — never in the document, its hash or the log"; §2.9 (and V09 l. 3439) save it "with the other view keys
(`Document.view`; item 120 (a))" — in the saved document's non-canonical `view` section, outside every digest.
*Required change:* V07 §5.5: "kept across zooms, bands, layers, the season, epochs and edits until **Clear** or the
panel's close, and saved with the other view keys in the document's `view` section (§2.9) — never in its canonical
form, a digest, its hash or the log".

## 5. Result

11 issues — 0 blocker, 4 major (VM-R2T-01, -02, -03, -06), 7 minor. Owners: model 5 (01, 02, 03, 08, 10), pipeline 2
(04, 06), determinism 1 (05), V07 1 (11), V09 1 (09), V10 1 (07). All 22 round-1 findings are closed (fixed in the
text; VM-R1T-15 in substance, its narration VM-R2T-09). The model parts of g items 120, 122, 122 (h)–(i), 123, 124 and
125 are present; 121 and 126 route no model part.
