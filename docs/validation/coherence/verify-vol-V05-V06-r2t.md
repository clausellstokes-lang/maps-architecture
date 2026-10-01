# Verify V05 and V06 after repair round 2 — lane coherence/verify-vol-V05-V06-r2t

> PENDING FABLE REVIEW — written by opus standing in for the verifier seat; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V05-V06-r2t`, 2026-10-01)
- P0 brief read whole (ROUND-2 NOTES, NEW OWNER RULES 114–116, ORCHESTRATION NOTES); round-1 findings (11) and
  adjudication-r2 (R2-05 – R2-42 as they bind V05/V06; Part H · V05 and V06) read: done
- P1 live V05 (sha256 7617d87c…) and V06 (d12c382b…) equal assemble-r2's outputs; the pre-round-2 texts taken from HEAD
  682e8e99 (b5f310b6…, 771887ca…, assemble-r1's); word diffs built (V05 17 hunks, V06 81): done
- P2 every round-1 finding re-checked against the live text and its partner homes: done
- P3 every round-2 block in scope read (V05 10 REPLACE, V06 32 REPLACE and the appended §3.22–§3.23 whole): done
- P4 owner items 119 (a2), 120, 122, 123, 125, 126 parts in V05 and V06 checked as new design: done
- P5 ids, references, retired terms, document checks, report, result, LANDED: done

Scope: V05 (the sky) and V06 (evolution) after assemble-r2. Method: the word diff of each live volume against its
pre-round-2 text, every changed hunk read with its subsection; the new V06 §3.22 and §3.23 read whole; every partner home
a changed line names read at its home (base §2.6 step 7, §4.11 *The clock* and *Works*, §8.2's crisis and Find rows,
§10.2's crisis look table, §12.1, §13.2's take-over table and the T117–T123 groups, §16, INDEX; V01 §5.4, V02 §5.7,
V03 §5.6, V07 §5.6, V08 §3.6 and §6, V09 §4.21.10, V11 §3.25.9–§3.25.10, V12 §2.13 and X-V12-11). Ids outside the
round-2 blocks and the round-1 findings keep their earlier verdicts.

## 1. Round-1 findings re-checked

| id | owner | disposition (adjudication-r2) | verdict now | evidence |
|---|---|---|---|---|
| VV56-r1-01 | V06 | FIX per R2-31 (a) | **FIXED** | V06 §6.8 (6) reads the required text; §3.21 (a) row "a dossier catch-up of many years"; T-V6-24 gains the 20- and 100-year catch-ups; J-V6.136; the other ends are written: §4.11 *The clock* (4) ("coarsened under item 119's comfort level by V06 §6.8 (6)"), V08 l. 1837–1840 and V08 §6's absorb-with-epochs row, V09's `progress.dossier` (`{, catchUp}`). New problems in the same text: VV56-r2-04, VV56-r2-09 |
| VV56-r1-02 | V06 | FIX per R2-40 (1) | **FIXED** | V06 §3.20.3's `W_p` is "the document's creation week (§4.11 *The clock* (1))"; §5.2 *Years* "(the map reads no host calendar; item 125 (a))"; 0 `HostContext`, 0 `elapsedWeeks` left in V06; the title block reads "items below 200 the owner's" (R2-07) |
| VV56-r1-03 | V06 | FIX | **FIXED** | V06 §3.15: "(the host's upgrade request: the owner's **Update the map engine**, V08 §4.2, an `upgrade` event over the bridge)" |
| VV56-r1-04 | V06 | FIX per R2-31 (b) | **FIXED** | V06 §4.1's Accept folds again "at the cadence V06 §6.8's estimate chooses on the current head (V06 §3.3.2), the card's line naming it"; T-V6-23's clause; §3.21 (a) row; E6's line |
| VV56-r1-05 | V05 | INVALID (R2-39 (c)) | **CLOSED** | not re-raised; base §8.2 (l. 12750) now draws a `snow` value as `clear` on a row where winter does not freeze, so V05 §5.1 (4) and §3.23 agree with the base |
| VV56-r1-06 | rendering | FIX per R2-31 (c) | **FIXED** | §12.1 (l. 16453–16455): "an open from SettlementForge (to the editable complete map — the load's digest checks and any migration included; the verification replay runs after it, off the path, §2.9 step 3, §12.6)" |
| VV56-r1-07 | V12 | FIX per R2-09 | **FIXED** | V12 §2.13 rows l. 928–930 name the sky goldens with T-V5-34 / -35 / -36; l. 927 names T-V6-74; §3.7.8's list (l. 1712) and X-V12-11 (l. 3393) carry T-V5-34 – T-V5-36 and T-V6-71 – T-V6-74 |
| VV56-r1-08 | V09 | FIX (with G120-V09) | **FIXED** | V09 §4.21.10 (6) bubbles "merged only within one layer and, on Sky, one island"; (8) "{n} on Sky", Go there on Sky (Sky working, the island `key`, a hidden sky layer shown), ghost pins of a hidden sky layer at their drawn positions; V09 l. 313: Show gaps, "an island's units by V05 §5.6 (4)" |
| VV56-r1-09 | scope | FIX | **FIXED** | INDEX.md l. 54: "V01 (the island's unit inputs)" |
| G122-V06 | V06 | NEW DESIGN per R2-37 (6), R2-35, R2-36 | **WRITTEN** (new problems: VV56-r2-02, -03, -07, -08, -10) | V06 §3.22 (aftermath, `frontierFor`, `crisisLookYields`), W92–W93, §1.1 (29), §1.2–§1.3 rows, §2.12 rows, §3.6 (6), §3.13 (6), §3.21 rows, §6.9, T-V6-75, J-V6.137–138, E2 at M6-E with its price, §10, §12 |
| G123-V06 | V06 | NEW DESIGN per R2-38 (3), R2-35, R2-36 | **WRITTEN** (new problems: VV56-r2-01, -05, -06) | V06 §3.23 (`decayLevel`, `decayPeak`, restoration, the default-age form), W94, §1.1 (30), §2.12 row, §3.5.2 pointer, §3.21 rows, §6.9, T-V6-76, J-V6.139, E2, §8's V11 cells and risk (4), §10, §12 |

The other issues routed to V05 and V06 this round, checked at their text: VAH-r1-15 (V05 §1.2 and §1b split into a V10
§2.13 row and a §11.2 row; §3.21 (1) and §4.5 cite §11.2's `WhyAnswer.closure` and `FieldDrivers` — §11.2 l. 16041
declares `FieldDrivers.terms[].sources`, so the new wiring row resolves); VAP-r1-06 (T-V5-18, -34, -35, -36 heads and
lettered clauses name T117-1/-2/-4/-5/-7/-8, T118-1 – T118-4/-6, T119-2 – T119-5, T120-1/-4/-5 exactly as §13.2's bars
read and as the sky take-over row l. 18221 lists them); VAT1-01 (V05 §5.6 (4), §3.23, §1b, T-V5-36 (g), J-V5.89 read
V01 §5.4 (3)'s `gapUnits`, which agrees, l. 3160–3181); VAP-r1-10 (T-V6-74's registration; V06 §8's pins); VAT1-03
(V06 §4.1, §4.3, T-V6-27, the T20-2 and T20-6 rows); VAT1-05 (V06 §3.7.7 (3) by `EpochRecord.week`; T-V6-73's replay
fixture; §3.21 (b)); VEL1-04 (V06 §3.5.1 (5), §4.3, §3.21, T-V6-70 (f)); VM-R1T-06, VPC-R1-20 (V06 §2.3, §2.9, §2.14
now cite §4.11's `EpochInputs` and §2.7's `Use.strain`, whose base declarations carry every field and comment V06 had —
no nuance lost); VM-R1T-09 (`raised_too_long` beside `raised_too_tall` in §2.10, §3.17 (9), §3.19 (5), W57, J-V6.122);
VPC-R1-05, VV34-r1-05 (`UnderOpeningRow`; `AccessPassStrategy.run(doc, rules, ctx, k, scope)` agreeing with II.7.6,
l. 21286); R2-26 (c) (V06 §3.7.6 (5), J-V6.114 marked amended, J-V6.140, T-V6-11's H-AQUA clause); R2-26 (d)
(`raisedWays.structure.stripMarginM`, V11 l. 705); R2-27 (a) (§3.7.7's welded stretch, T-V6-73). All **FIXED**.

## 2. Round-2 blocks read

**V05** (10 REPLACE: §1.2, §1b, §3.21, §3.23, §4.5, §5.6, §7, §8, §9, §13): every hunk read with its subsection; no new
problem. §8's total 18–24.75 pw (phases sum 18–24.75) equals §16 l. 19748 and l. 19783 and INDEX l. 28; §8's
dependency line (Find at M5 before P3) agrees with R2-32 and §16's M5 row.

**V06** (32 REPLACE and the appended §3.22–§3.23): every hunk read; §3.22 and §3.23 whole. §8's total 31–44 pw (E0–E9
sum 31–44) equals §16 l. 19743 and l. 19784 and INDEX l. 29; §13.2's evolution take-over row (l. 18220) names T122-1's
hand-over clause (T-V6-75) and T123-4's epoch clause (T-V6-76) as V06 §7's head does. V11 §3.25.10's rows (the
element ranges inside V06 §3.23 (2)'s thirds, `defaultAgeYears` 40, the rates by walls material, `timber_frame` the
default row) agree with V06 §3.23. V02 §5.7, V03 §5.6, V04 §5.6, V07 §5.6, V09 and V10 read `decayLevel`, `decayPeak`,
`crisisLookYields` and `frontierFor` as V06 states them. New problems: section 4.

**Ids.** T-V5-1 – T-V5-36, J-V5.1 – J-V5.89, T-V6-1 – T-V6-76, J-V6.1 – J-V6.140, W1 – W94: each defined once, no gap.
**References.** assemble-r2's run: 0 broken in the set; V05's three and V06's three ambiguous-form references read as S7
reads them (V06 l. 1583's "§2.7's support step (3)" is the base's). **Retired terms** (canon glossary, 35 patterns):
no new hit — V06's twelve `G-standalone` hits are "standa*lone neighbourhood document*" (the term itself), and its
`G-unitinput` hits are item 122's "hand-over" to the epoch path (the canon's own routing word, not the unit-run view).
**Phone clauses** (R2-41): none in V05 or V06. **Document checks** (`doc_checks.py --doc <volume> --heads
docs/ARCHITECTURE.md --allow docs/validation/doc-checks-allow.tsv`): V05 C1 0, C2 0, C3 238 hits (226 unreviewed, the
same as before the round), C4 0, S1 0, S2 260 (1 unreviewed); V06 C1 0, C2 0, C3 282 (261 unreviewed; the 17 new runs of
assemble-r2's `vol-unreviewed-new.tsv` are ordinary phrases and digit runs — "a third of the range", "is the larger of
the formula" — no identifier, palette, grammar or word list), C4 0, S1 0, S2 408 (16 unreviewed: V06's own "V06 §6.9"
style pointers). WARNING recorded: "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs,
research/ftg-docs, research/external) - clean-room results are NOT authoritative" — provisional.
**Size** (`wc -w`): V05 65 595 → 66 120 (+0.8 %), V06 100 997 → 106 872 (+5.8 %): owner items 122–123 at build depth,
the catch-up's comfort level and the round's fixes; no unit shrank, so no nuance audit for a halving is due.

## 3. Owner items in V05 and V06

* **119 (a2)** — V06 §6.8 now covers `advance`, the replay and a dossier catch-up; the catch-up's budget leaves out the
  open's own path and the per-event absorb (VV56-r2-04) and §6.8's lead still counts two waits (VV56-r2-09).
* **120** — V05 §5.6 and T-V5-36 agree with §8.2's Find rows, V01 §5.4 (3), V09 §4.21.10 and R2-32 – R2-35. Present.
* **122** — V06's part (the hand-over) is present at build depth; it meets the base's look rows and table at the seam in
  three places that disagree or are underdefined (VV56-r2-02, -03, -07, -08) and one combination edge (VV56-r2-10).
  A look never writes the model, a digest or the hash in V06's text (§3.22 lead, (4); T-V6-75 (a)) — the owner's words
  held.
* **123** — V06's part (the decay level) is present at build depth; `reused` is read against item 123 (b) and R2-38 (3)
  (VV56-r2-01), the run's start is dated differently from the Works that draw it (VV56-r2-05), and `decayPeak` marks
  elements added after a restoration as repaired (VV56-r2-06). The level is never stored and no op, draw or digest reads
  it (§3.23 (5)) — the owner's "same plans amended, never redrawn" held.
* **125** — V06's week reads the dossier's own ticks (§1b, §3.20.3, §5.2); no `HostContext` input. Present.
* **126** — no phone clause in V05 or V06. Present.
* **121, 124** — routed to neither volume (canon's dated rulings); V05 §5.1 (4) and §3.23 agree with R2-39 (a).

## 4. Issues (10)

| id | sev | kind | owner | claim (short) |
|---|---|---|---|---|
| VV56-r2-06 | blocker | EDGE-UNDEFINED | V06 | `decayPeak` draws plan elements added after a restoration (a re-cut at `reoccupy`, an `extend` wing) "repaired, in patch material" |
| VV56-r2-01 | major | CONFLICT | V06 | `reused`: V06 §3.23 (3) and T-V6-76 (c) read it as a plan-less trace at level 0; base §2.6 step 7, T123-4 and R2-38 (3) list it as a restoration whose damage leaves in reverse order with patches |
| VV56-r2-02 | major | CONFLICT | rendering | §8.2 ends the whole disaster look when "its `reconstruction` Works begins"; V06 §3.22 (3) and V02, V03, V07, V10 yield per building by `crisisLookYields`, which §8.2 never reads |
| VV56-r2-04 | major | EDGE-UNDEFINED | V06 | a catch-up's estimate leaves out its dossier events (≤ 30/45 ms each) and an open's own path; T-V6-24's 100-year catch-up p95 ≤ 10 s is unreachable as designed |
| VV56-r2-05 | major | CONFLICT | V06 | §3.23 (1) starts a decay run at the epoch's week (`EffectiveWeek`); the Works that draw it start at the hazard's week (§3.13 (2)) and §3.21 / T-V6-76 (c) say "from the fire's week" |
| VV56-r2-03 | minor | CONFLICT | pipeline | §10.2 (f): the disaster look "ending in the week its `reconstruction` Works begins" — per building in V06 §3.22 (3) |
| VV56-r2-07 | minor | WIRING | pipeline | §10.2 (d)'s `approachByGate` calls `frontierFor(doc, households)` without saying which count it passes |
| VV56-r2-08 | minor | CONFLICT | pipeline | §10.2 (b): "the regional_* pressures are `none`" contradicts V11's `regional_migration_pressure` → `refugeeCamp` (item 122 (b)) and T-V6-75's fixture |
| VV56-r2-09 | minor | CONFLICT | V06 | §6.8's lead still binds "this volume's two one-time waits" and says "both", though its title, (1), (3), (5) and (6) carry a third |
| VV56-r2-10 | minor | EDGE-UNDEFINED | V06 | `frontierFor`'s answer when the households split into a rich ribbon and a stage, or a stage S5a can seat only in part |

### VV56-r2-06 (blocker, EDGE-UNDEFINED, V06)
**Claim.** V06 §3.23 (3): "`decayPeak` keeps the highest level since the plan was built: an element whose threshold lies
above the present level and at or below the peak is drawn repaired, in patch material … until the plan itself changes —
a `rebuild`, a demolition, or a successor"; V03 §5.6 (b) reads the same. A plan gains elements without those three:
the restoring event itself re-cuts a stored plan for its new occupants (V03 l. 2017–2020: "occupants other than those
that left re-cut a stored plan inside that event … the kept elements keeping their thresholds"), and an `extend` adds a
wing (§4.11 *Works* (4)). A new element's threshold is drawn fresh on (lineage, its id) (§6.3), so every new partition,
door, window or furniture piece whose t lies at or below the old peak — after a `decayed` building's repair, every new
partition (0.36–0.66, V11 §3.25.10) — is drawn as a patched repair it never had, and counted in `info.damage.patched`
(V10). A silent wrong result on every restoration that re-cuts; no row of §3.21 and no clause of T-V6-76 covers it.
**Required change.** V06 §3.23 (3): "`decayPeak` is read per element: the highest level since the element entered the
plan — the as-built plan's elements at the lineage's build, the elements a re-cut makes (V03 §3.11, a restoring event's
included) or a wing an `extend` adds at that change's effective week — so an element added after its building's damage
left is never drawn repaired; an element a re-cut keeps keeps its peak"; the signature reads `decayPeak(doc, lineage,
week, since: number /* the element's entry week, V03 §5.6 */)`; §3.21's decay-level row adds "a restored building re-cut
or extended | the added elements drawn as built, the kept ones patched"; T-V6-76 (b) adds that fixture (a `reoccupy` from
derelict with a re-cut, and an `extend` after a repair: 0 added elements in `repaired`). At its home (hand-off, R2-05):
V03 §5.6 (b) passes each element's entry week and reads the per-element peak.

### VV56-r2-01 (major, CONFLICT, V06)
**Claim.** Item 123 (b) (owner-approved): "Restoration (`reused`, a repair) lowers the level and the damage leaves in
reverse order, a repaired element drawn in patch material"; R2-38 (3) (binding) and base §2.6 step 7 (l. 2088) and
§13.2's T123-4 (l. 18176) list "`reused`, `reoccupy`, a repair" as restorations. V06 §3.23 (3) heads "**Restoration**
(item 123 (b): `reused`, a repair)" and then rules that `reused` "leaves no plan to damage: its level and peak read 0 …
its damage leaves with the building"; T-V6-76 (c) bars "a `reused` … trace read level and peak 0" — no reverse order,
no patches. The base's own `reused` state (§2.8 l. 2778; §4.11 *Works* (4)'s OVERGROWN; §8.2 l. 13073) is a cleared
trace worked as a garden, orchard or field — no plan — so V06 (with V02 and V03, V03 l. 2021) follows §2.8 while the
base's damage sentence, its bar and the ruling follow item 123's word. Two units state opposite outcomes for one
transition, and T123-4 and T-V6-76 (c) cannot both pass.
**Required change.** One reading in every unit, recorded under J122 as the reading of item 123 (b)'s word that keeps
both the owner's rule and §2.8's state: V06 §3.23 (3)'s head reads "**Restoration** (item 123 (b)'s "reused" — the
building put back to use, a `reoccupy` from vacant or derelict, V06 §3.8.2 — and a repair)", and its `reused` sentence
reads "§2.8's `reused` state — the cleared trace worked as a garden, orchard or field — like `cleared` and a demolition
holds no plan: its level and peak read 0 from the event's effective week"; a J-V6 row records the reading. At their
homes (R2-05): base §2.6 step 7 reads "a restoration (item 123 (b)'s "reused": a `reoccupy` back into use; a repair)
lowers it …" (model), and §13.2's T123-4 reads "restoring — a `reoccupy` back into use (item 123 (b)'s "reused") or a
repair — lowers the level …" (scope).

### VV56-r2-02 (major, CONFLICT, rendering)
**Claim.** §8.2's crisis rows (l. 12922–12925): "A disaster's buildings draw item 123's damage layer at its row's
`lookLevel` … and their districts the `ruinTone` at the city band; the look ends in the week its `reconstruction` Works
begins (V06)". V06 §3.22 (3) and J-V6.138 — with V02 §5.7 (6), V03 §5.6 (4), V07 §5.6 (3) and V10 l. 1997 — end the
look **building by building**, when `crisisLookYields(doc, building, overlay, week)` turns true (a Works other than a
`decay` Works begun on that building), a building no rebuild reaches keeping the look until its condition ends; V06
§3.22 (3) and W93 name "§8.2's disaster look row" as a reader, but §8.2 never reads `crisisLookYields`
(`live.crises`' inputs, l. 12931–12932, name `frontierFor` only). Read literally, §8.2 drops the whole look — every
building's damage and every district's tone — at the first rebuild, while V02 and V03 keep drawing it on the others.
Under per-building yields the end of a district's `ruinTone` is stated nowhere, and `live.crises` re-runs only "when the
week crosses a condition's edge", so a scrubbed week crossing a building's Works start leaves stale tiles.
**Required change.** §8.2: "… the look leaves each building in the week V06 §3.22 (3)'s `crisisLookYields` turns true on
it — a Works other than a `decay` Works begun on it — so no week draws both the look and the rebuild's stage; a building no
rebuild reaches keeps it until its condition no longer stands; a district's `ruinTone` stands while any of its buildings
still draws the look"; *The layer*'s inputs add "V06's `crisisLookYields`", and its re-run triggers add "the week crossing
a Works' start week on a building of a standing disaster look".

### VV56-r2-04 (major, EDGE-UNDEFINED, V06)
**Claim.** V06 §6.8 (6) coarsens a catch-up's epochs until estimate (1) "fits `advance.budgetMs`" (9 000 ms, which §6.8 (2)
says leaves one second "for the expansion and the estimate, the last epoch's redraw … and the group's commit"), and claims
the epochs are "priced … inside §12's waits for a dossier change applied and an open from SettlementForge"; T-V6-24 bars
20- and 100-year catch-ups at CITY and METROPOLIS at p95 ≤ 10 000 ms. Two costs of those waits lie outside the estimate:
(a) the catch-up's dossier events, which "still fold at their own weeks" and are never coarsened, each ≤ 30 ms at TOWN
and CITY and ≤ 45 ms at METROPOLIS (V08 §6's absorb rows), ≈ 10 a CITY year (V08 §6) — ≈ 1 000 events, ≈ 30 s, in a
century; (b) for an open from SettlementForge (§12.1: "to the editable complete map — the load's digest checks …
included"), the frame boot (≤ 400 ms cached) and the load to the editable map (≤ T(B): 246 / 589 / 2 290 ms) — at
METROPOLIS ≈ 2.7 s against the one second `advance.budgetMs` leaves. The 100-year fixtures cannot meet their bar, and the
outcome past the comfort level is not stated for a catch-up.
**Required change.** V06 §6.8 (1): for a catch-up the estimate adds "+ Σ events × V08 §6's per-event absorb bound at the
document's rung (30 ms at TOWN and CITY, 45 ms at METROPOLIS)"; (6): the catch-up's budget is `advance.budgetMs` for a
dossier change applied to an open map and, inside an open from SettlementForge, `advance.budgetMs` less the open's own
path at the document's rung (V08 §6's cached frame boot, 400 ms, and §12.5's T(B): 246 / 589 / 2 290 ms) — one epoch over
the span still fitting it (≈ 5.3 s ≤ 6 310 ms at the cap); where even one epoch over the span with the events' term
passes the budget, the catch-up folds one epoch over the span, the wait completes past the comfort level and is reported
F-BUDGET-TIME (§12.1: never a coarser or shortened result), the events' cost being the trigger of V08's pre-decided change
under R12-31 (hand-off: V08 §6's absorb-with-epochs row names that change); T-V6-24's catch-up fixtures state their event
counts and bar p95 ≤ 10 000 ms where the estimate fits, and the one-epoch fold with its F-BUDGET-TIME report where it does
not; §3.21's catch-up row and J-V6.136 read the same.

### VV56-r2-05 (major, CONFLICT, V06)
**Claim.** V06 §3.23 (1) starts a decay run "from the effective week `A` (V06 §2.11's `EffectiveWeek`: an engine op's is
its epoch's week)" and sets the state at `w` by "the last such event at or before `w`". The same ops are drawn earlier:
§3.13 (2): "a hazard's changes start at the hazard's week" (a `burn`'s CHARRED, §3.13 (1): "in its fire's week"), a
`vacate`'s `decay` Works at its drawn offset in the span; and V06's own §3.21 row ("a fire's CHARRED | the decayed third
from the fire's week") and T-V6-76 (c) ("a fire's burn reads the decayed third from its week") date the run at the
fire's week. Between the fire's (or the offset's) week and the epoch's week — up to a year, and up to k years in a
coarsened catch-up (§6.8 (6)) — the exterior draws the CHARRED shell while `decayLevel` reads 0, so the plan draws whole
and roofed (V03 §5.6 (c)'s roofless rule applies only "in a decay run"): T123-5 ("the exterior agrees with the plan")
fails in those weeks, and §3.23 (1) contradicts §3.21 and T-V6-76 (c).
**Required change.** V06 §3.23 (1): "… from the week `A` the change shows: the start week of the Works the event started
(V06 §3.13 (2): a hazard's change at the hazard's week, a `vacate`'s `decay` Works at its drawn offset), else its
effective week (V06 §2.11)", and "its state `s` at `w` is the existence the last such event dated so at or before `w`
set"; W94's inputs name the Works' start weeks; T-V6-76 (c) adds "a `vacate` and a `burn` inside a yearly epoch and a
coarse catch-up epoch: the level from the Works' start week, the plan's damage and the exterior's stage agreeing at every
week (T123-5)".

### VV56-r2-03 (minor, CONFLICT, pipeline)
**Claim.** §10.2 (f) (l. 15411–15412): "`disaster`: (d)'s `neighbourhoods`, ending in the week its `reconstruction` Works begins
(V06: no week draws both)" — the whole look at one week; V06 §3.22 (3) (R2-37 (6)'s home) ends it per building by
`crisisLookYields`, as V06's hand-off to pipeline asked.
**Required change.** §10.2 (f): "`disaster`: (d)'s `neighbourhoods`, each building leaving the look in the week a Works
other than a `decay` Works begins on it (V06 §3.22 (3)'s `crisisLookYields`), so no week draws both".

### VV56-r2-07 (minor, WIRING, pipeline)
**Claim.** §10.2 (d)'s `approachByGate` ranks `campLand` "nearest V06's `frontierFor(doc, households)`: where the next
growth would seat the camp's people". The camp is sized in heads or camped m² ((c): headcount, else `exodus` or
arrivals, else severity and tier), while V06 §3.22 (2) (a) takes "the roster's next `households` ordinals above the
present population". No unit says which count the caller passes (a dangling input of a two-ended hook).
**Required change.** §10.2 (d): "`approachByGate` — the `campLand` faces along the main approach road by its gate,
nearest V06's `frontierFor(doc, h)`, `h` the households the sequential roster adds between the present population and
that population plus the camp's heads (its headcount by (c), else its camped ground ÷ `areaPerHeadM2`): where the next
growth would seat the camp's people (V06 §3.22 (2))".

### VV56-r2-08 (minor, CONFLICT, pipeline)
**Claim.** §10.2 (b) (l. 15358): "the regional_* pressures are `none`". Item 122 (b) names "**mass immigration**
(regional_migration_pressure, REFUGEE_WAVE)" a refugee camp, and V11 §3.25.9 (l. 4559, 4562) maps
`regional_migration_pressure` → `refugeeCamp` ("the other `regional_*` pressures are its 'no look'"). T-V6-75's camp
fixture uses that condition.
**Required change.** §10.2 (b): "… the other `regional_*` pressures are `none` (`regional_migration_pressure` is item 122
(b)'s mass immigration and draws the refugee camp, V11 §3.25.9)".

### VV56-r2-09 (minor, CONFLICT, V06)
**Claim.** V06 §6.8's lead (l. 3866–3870): "§12's ten-second comfort level binds each of this volume's two one-time
waits … an `advance` … and a history-first generation … this is how both waits stay inside the ten seconds", while its
title, (1) ("one function for all three"), (3), (5) and (6) carry the dossier catch-up as a third.
**Required change.** The lead reads "… binds each of this volume's two one-time waits — … — and the epochs of a dossier
catch-up inside §12's waits for a dossier change applied and an open from SettlementForge ((6)) … this is how the three
stay inside the ten seconds whatever span they are given".

### VV56-r2-10 (minor, EDGE-UNDEFINED, V06)
**Claim.** V06 §3.22 (2) (b) splits the camp's households — "their part above `growth.crowdBands` takes the rich ribbon's
land; the rest with `B` take a stage" — but (c) answers only "the hinterland `LandUse` faces … that land covers" for the
stage, and (d) answers the belt only when no land is left. Two answers are unstated: a camp with both a rich part and a
stage (one ribbon, one stage, or their union?), and a stage S5a can seat only in part before its cap (the stage's land,
the belt, or both?).
**Required change.** V06 §3.22 (2) (c) ends: "The answer is the hinterland `LandUse` faces that the stage's land and,
where (b) gives a rich part, the rich ribbon's plots along its arterial cover, in address order; a stage S5a seats only
in part adds (d)'s belt for the households it cannot seat"; §3.21's frontier row and T-V6-75 (c) add both cases.
