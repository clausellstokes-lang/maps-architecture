# Verify V05 and V06 after repair round 4 — lane coherence/verify-vol-V05-V06-r4t

> PENDING FABLE REVIEW — written by opus standing in for the verifier seat; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V05-V06-r4t`, 2026-10-01)
- P0 brief read whole (ROUND-4 NOTES, NEW OWNER RULES 114–119, ORCHESTRATION NOTES); round-3 findings (5,
  verify-vol-V05-V06-r3t); adjudication-r4 (R4-01 – R4-03, R4-07 – R4-09, R4-12, R4-16 whole; Part H · V05, V06, V08,
  V09, pipeline, model, V03, V10 rows and END lines naming VV56 or V05/V06); repair-r4-V05's and repair-r4-V06's reports;
  assemble-r4 (live hashes equal): done
- P1 word diffs of live V05 (22 hunks) and V06 (51 hunks) against assemble-r3's outputs (commit 6c640e5^): done
- P2 every round-3 finding re-checked against the live text and each END line's second end: done
- P3 every round-4 block in scope read subsection by subsection: done
- P4 ids, references, retired terms, phone clauses, review ids, document checks, sizes: done
- P5 report, result, LANDED: done

**Scope and method.** V05 (the sky) and V06 (evolution) after assemble-r4. Live V05 sha256 `ef99abd9…` (401 398 bytes)
and V06 `ef22171a…` (691 243 bytes) equal assemble-r4's outputs; the pre-round-4 texts are commit 6c640e5^'s (V05
`cc1dfa61…`, V06 `8f92dd38…`, assemble-r3's). I read every changed hunk with its whole subsection, and read V06 §3.5.1,
§3.7.1–§3.7.2, §3.7.6, §3.19's lead and §3.19.2, §3.23 and §6.8–§6.9 whole, and V05 §3.16 and §5.6 whole. I also read
the partner homes each finding and changed line names, at those homes: model §2.7's support step (3) and (6) and §2.6
step 7, §4.11's delta demand and *The clock* (4), §10.2's AM-8 and (d) `approachByGate` with its edge row, T-ER-27,
§12.10's R12-31, §13.2's T110-2, T114-3, take-over rows and §13.8; V03 §1b, §2.5, §5.6 (2) and §13; V08 §3.6 (3), (6),
§6's absorb-with-epochs row, T-V8-63 and J-V8.137; V09 §1b's Find rows, §4.21.9 (1) and §4.21.10 (7)–(8); V10 §3.9a;
V12 §3.15.9; and the `EpochScope.raised` readers at V01, V04 and V05. Ids outside the round-4 blocks and outside my
round-3 findings keep their earlier verdicts.

## 1. Round-3 findings re-checked

| id | owner (r3) | disposition (adjudication-r4) | verdict now | evidence |
|---|---|---|---|---|
| VV56-r2-06 | V06 | FIX per R4-03 (BLOCKER kept; VV34-r3-01 MERGED) | **FIXED** | V06 §3.23 (3) carries R4-03's text verbatim. A restoring event's minted elements enter the plan for damage when the restoration ends: the `repair` Works' FINISHED week, or the start of a decay run that begins before then, or the effective week when there are no Works. They are drawn as built before that week. `decayPeak`'s `since` comment names that week and returns 0 for a week before `since`. Also written: §3.21's decay row (VV56-r2-06's row), T-V6-76 (b)'s clause, J-V6.139 ("nor draws damaged one a restoration minted") and §6.9's memo per restoration end week. **Ends:** V03 §5.6 (2) (a) "compared with the level only from its entry week" and (b) "the week that restoration ends" (l. 2692–2706); V03 §1b l. 303, §2.5 l. 926 and §13's V06 row l. 3293; model §2.6 step 7 (l. 2100–2101); V10 §3.9a (l. 1855–1856). All are written as ruled. The restoring event's own re-cut no longer draws its new elements damaged and then patched. |
| VV56-r2-04 | V08 | FIX per R4-16 | **FIXED** | V08 §6's absorb-with-epochs row states the catch-up batch at build depth: one fold pass per epoch's span; costs per epoch (150 / 500 ms) and per event (3 / 3.5 ms); its target (T-V6-24's three fixtures within the catch-up's budget at CITY and at the cap, worst case 6 090 ≤ 6 310 ms); its bar (T-V8-63: the log bytes and every model digest equal the per-event fold's); and R12-31's failure for a fixture past it. J-V8.137 records it. V08 §3.6 (3) reads "one epoch over the span the floor (where even it, with the events' absorb term, passes the catch-up's budget … F-BUDGET-TIME, V06 §6.8 (6))", and §3.6 (6) folds by the batch. V06's end: §6.8 (1)'s `b` and `a`, (6)'s change citing the row, T-V6-24's bar and J-V6.136. |
| VV56-r3-03 | pipeline | FIX | **FIXED** | §10.2 (d) `approachByGate` (l. 15670–15676) has "`h` … at least 1, so a camp smaller than one household is seated where the next household would be". §10.2's edge row (l. 15728) has "a camp smaller than one household: by the gate". T-ER-27's fixtures include "a refugee camp of two heads". |
| VV56-r3-01 | V06 | FIX | **FIXED** | V06 §1.1 (14), W91, §6.8's lead and (3), and §3.21's dossier-bound row now read "where even one epoch over the span with its dossier events' absorb term passes its budget", matching §6.8 (6), T-V6-24 and J-V6.136. |
| VV56-r3-02 | V09 | FIX | **FIXED as worded; the wording is wrong (new minor VV56-r4-01)** | V09 §4.21.9 (1) (l. 3431–3434) carries my round-3 required text verbatim. That text puts the trigger on the events' term alone, the very form VV56-r3-01 removed from V06. See section 4. |

**Round-3 findings: 5 re-checked. 4 fixed. 1 fixed as worded, with a new minor in its wording. 0 persist.**

## 2. Round-4 blocks read

**V05** (11 REPLACE blocks, 22 hunks: §1b, §3.16, §3.23, §5.1–§5.4, §5.6, §6, §7, §9). Each is read with its subsection.
* *R4-02 END and sweep.* §5.6 (3)'s Go there text is verbatim. "The view draws the sky layer (visible, or Sky the view's
  working layer, §8.4)" or its negation appears at §3.23's light-and-shadow and Find rows, §5.1's pennants, §5.2, §5.3
  (4), §5.4's candidate set, T-V5-12, T-V5-13 (i), T-V5-36 (c) and J-V5.14. These agree with rendering §8.4, §9's
  candidate-set END form and V09 §4.21.10 (8). No visibility claim is left elsewhere in V05: §1.2's T12 `dress` row is the
  logged `setLayer` (R4-02 (a)), and J-V5.89 makes no claim.
* *R4-12 END and sweep.* §5.6's lead (the drawn week), (5)'s frame sentence (verbatim) and its re-run list, (6)'s index
  rebuilt at each change of the drawn week, §6's Find row, §1b's Find row, and §3.23's new edge (an island raised,
  resized, moved, fallen or removed since the drawn week) with T-V5-36 (i). These agree with V09 §4.21.10 (7)–(8)
  (rebuild at each change of §2.9's `week`; matches by use at that week) and with V06 §3.15.2's frame (later-dated
  changes undone).
* *R4-09 END and sweep.* §3.16 (4)'s pier row ("a crossing station's support is its wall stretch, §2.7: the wall row's
  breach"; the spans beside a breached station `ruined`) and (5)'s `members` (no `{ raised, support }` for a station).
  These agree with model §2.7's support step (3), as landed: "a landfall over it breaches it and ruins the spans beside
  it (V05 §3.16's landfall table)"; the station's `supports` entry carries no `state`. T-V5-14's *A raised gate* clause
  and §7's take-over list agree with §13.2's T114-3 landfall clause and the take-over row (base l. 18471, 18491–18492,
  18671).
* No new problem.

**V06** (17 REPLACE blocks, 51 hunks: §1.1, §1b, §2.1, §2.8, §2.10, §3.5, §3.6, §3.7, §3.11, §3.19, §3.20, §3.21,
§3.23, §6, §7, §9, §12).
* *§3.5.1 (1) (VEL3-r3-01).* A held household (locked, pinned, or (4)'s protected last) keeps its ordinal. A later rise
  reads the delta demand over the households the town holds: those that left in a held household's place come back
  first, and a held household above the target counts toward it in place of the last household the rise would add.
  This agrees with §4.11's delta-demand parenthesis (base l. 7962–7964) and AM-8 (l. 15424–15427). §3.6 (1)'s `R₀`,
  §3.21's decline row and T-V6-70 (f) cover a rise past the held ordinals and a rise that stops below them.
* *§3.7.1, §3.7.2 (2)–(3), §3.7.6 (5), W68, W79, J-V6.91, J-V6.114 and J-V6.140 (R4-09 END lines; VM-R3T-03).* The
  END texts are verbatim. The stretch under a crossing station is released when the raised way is removed or the spans
  on both sides of its station have fallen (`ruined` or `cleared`). This matches model §2.7 (3) (base l. 2547–2568).
  §2.10's `walls.waited` no longer waits for a raised way; the new `walls.raisedCrossings` is written by §3.7.6 (5) and
  read by the epoch report and T-V6-47 (W68 wires it); V09 and V10 enumerate no walls counts.
* *§2.1's `EpochScope.raised` and W64 (VAL-R3-03's END).* "Every raised way whose `feet`, `supports` or `spans` an epoch
  op, a landfall, a trace's crossing station or the frame growth changed." Every reader reads those fields:
  `ArchVaults.reconcile` and `Foundations.apply` (V04 l. 1341, 2282–2283, 2579), `hood.fabric`'s crossed districts (V01
  l. 875–887), and V05 §3.16 (4)'s landfall entries.
* *§2.8's `repairRaised`, §3.11.4's topple, §3.19's lead and §3.19.2 (3)–(5) (VEW-r3-04's and VEW-r3-01's ENDs).*
  - Salvage `dismantle` and `topple` never take a crossing station.
  - A landfall over a station breaches its stretch and ruins the spans beside it.
  - `repairRaised` beside a `breached` or `dismantled` station stretch repairs the stretch first by `repairWall` in the
    same batch, in patch material.
  - A later wall trace crosses only through a station.
  - Growth and route re-solves cross by §4.3's rule.
  All of this is as model §2.7 (3) and (6) (b) rule it.
* *§3.20.2, §3.21's replay row and T-V6-71 (VAT3-r3-10 per R4-07 (c)).* An event or a calamity at the present is
  replayed in the last epoch at `W_p`.
* *§3.23, §3.21's decay row, T-V6-76 (b), J-V6.139 and §6.9 (R4-03).* As in section 1.
* *§6.8 (1), (3), (6), T-V6-24, J-V6.136 and §12's PLAUSIBLE (1) (R4-16 END; VV56-r3-01).* `b` per epoch folded and `a`
  per event at V08 §6's costs. One epoch over the span at the cap with its batch cost is ≈ 5.8 s ≤ 6 310 ms (1 310 +
  3 × 260 + 18 × 60 + 6 + 0.06 × 35 000 + 500). The over-budget branch now has a fixture (5 000 events at the cap,
  ≥ 19 310 ms), excepted from the 10 s bar and named as no release target. That agrees with R4-16, which names the three
  catch-up fixtures as the release targets, and with T-V8-63. V12 §3.15.9's T119-2 times its own history and dossier
  fixtures. New problem: VV56-r4-03 (a parenthesis the new fixture made false).
* *§7.* The lead and take-over rows ("T110-2's epoch clauses (4) and (5)" → T-V6-47; "T114-1 – T114-5 save T114-3's
  landfall clause, T114-8's and T114-10's epoch clauses" → T-V6-73) agree with §13.2 (base l. 18429, 18491, 18670) and
  §13.8 (l. 19251, 19262). T-V6-11's second run (the release on both spans fallen, by scripted topples of the supports
  beside the station) and T-V6-73's *under a crossing station* clause agree with §2.7 (3). New problem: VV56-r4-02 —
  T-V6-47's and T-V6-73's new H-AQUA clauses need a viaduct, a raised gate and a timber elevated road that H-AQUA's
  definition does not hold.

**Ids.**

| unit | id family | count | duplicates | gaps |
|---|---|---|---|---|
| V06 | T-V6 | 1 – 76 | 0 | 0 |
| V06 | J-V6 | .1 – .141 | 0 | 0 |
| V06 | W | 1 – 94 | 0 | 0 |
| V05 | T-V5 | 1 – 36 | 0 | 0 |
| V05 | J-V5 | .1 – .89 | 0 | 0 |

No id was added or removed this round. `walls.raisedCrossings` is unique in the set.

**References** (assemble-r4's `refs.py` over the live set): 0 broken in the set. V05 has 2 087 resolved, 3 ambiguous and
1 external; V06 has 3 629 resolved, 5 ambiguous and 8 external. Every ambiguous form resolves to its intended home: the
bare "§2.7's support step (3)" after a V06 list at l. 1610, 4462 and 4488 is the base's.

**Retired terms** (canon glossary, 35 patterns) over every added run: 0. **Review ids** in added text: 0. **Deferral
wording**: none ("later" and "open" are only temporal or the `open` span). **Phone clauses** (item 126 (a2)): none in
V05 or V06.

**Document checks** (`doc_checks.py --doc <volume> --heads docs/ARCHITECTURE.md --allow
docs/validation/doc-checks-allow.tsv`):

| check | V05 | V06 |
|---|---|---|
| C1 | 0 | 0 |
| C2 | 0 | 0 |
| C3 | 237 hits, 225 unreviewed (unchanged) | 291 hits, 270 unreviewed (289 / 268 before) |
| C4 | 0 | 0 |
| S1 | 0 | 0 |
| S2 | 264 hits, 1 unreviewed (unchanged) | 424 hits, 16 unreviewed (unchanged) |

V06's new C3 runs are runs of section numbers only: "3 5 1 1 and", "3 5 1 1 the", "3 6 4 and every", "3 7 6 5 2 7", with
three old runs regrouped. They contain no identifier, palette, grammar or word list.

> WARNING recorded: "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs,
> research/ftg-docs, research/external) - clean-room results are NOT authoritative". These results are provisional.

**Size** (`wc -w`):

| unit | before round 4 | after round 4 | change this round | archive | change against the archive |
|---|---|---|---|---|---|
| V05 | 66 122 | 66 672 | +0.8 % | 79 756 | −16.4 % |
| V06 | 109 262 | 111 116 | +1.7 % | 104 574 | +6.3 % |

All of the increase is design required by the rulings and ENDs; the repair reports list nothing removed that held
content. No unit shrank by more than half, so no halving audit is due.

## 3. Owner items in V05 and V06

* **119** — V06 §6.8 now prices a catch-up's events by V08's per-epoch batch, which R4-16 names as the path's own change
  under R12-31. T-V6-24's three fixtures are the release targets. A larger catch-up folds one epoch past the comfort
  level and is reported. V09 §4.21.9 (1) states that branch's trigger differently (VV56-r4-01, wording only).
* **120** — Find's Go there writes nothing (V05 §5.6 (3)). At a drawn week the islands' matches are the frame's listing
  (V05 §5.6 (5)).
* **122** — `approachByGate`'s `h` is at least 1.
* **123** — the restoring event's minted elements are neither damaged nor repaired by that restoration (V06 §3.23 (3)),
  at every end.
* **125** — no `HostContext` input was added. **126** — no phone clause.
* **110 and 114** — supports are placed last at generation; afterwards a standing raised way is held. Crossing stations
  are held, released and repaired as model §2.7 (3) and (6) rule, at V05's landfall and at every V06 home.

## 4. Issues (3)

| id | severity | kind | owner | claim (short) |
|---|---|---|---|---|
| VV56-r4-01 | minor | CONFLICT | V09 | V09 §4.21.9 (1) triggers the catch-up's over-budget branch on "events' absorb term passes its budget". V06 §6.8 (6) and every other restatement trigger it on "even one epoch over the span with its dossier events' absorb term". |
| VV56-r4-02 | minor | NEW-PROBLEM | V06 | T-V6-47's later-work clause and T-V6-73's crossing-station clause, new this round, run on an H-AQUA viaduct, raised gate and timber elevated road. H-AQUA's definition holds only its aqueduct. |
| VV56-r4-03 | minor | CONFLICT | V06 | V06 §6.8 (6)'s parenthesis says the over-budget case is "many more dossier events than T-V6-24's fixtures carry". T-V6-24 now carries a 5 000-event fixture for exactly that case. |

### VV56-r4-01 (minor, CONFLICT, V09)

**Claim.** V09 §4.21.9 (1) (l. 3431–3434) was written this round from VV56-r3-02's required text, which was mine. It
reads: "but a dossier catch-up whose events' absorb term passes its budget, which folds one epoch over the span and
completes past it".

That is the events-alone trigger. VV56-r3-01 removed it from V06's five summaries. Its home, V06 §6.8 (6), states the
trigger as "where even one epoch over the span with its events' term passes the budget". So do V06 §1.1 (14), W91,
§6.8's lead and (3), §3.21's dossier-bound row, T-V6-24, J-V6.136 and V08 §3.6 (3).

The two triggers differ when the events' term — now V08 §6's batch, `b` per epoch folded plus `a` per event — is under
the budget, but one epoch plus that term is over it. Take the metropolis cap with three islands and the hand-placed cap,
inside an open. One epoch with its batch cost is ≈ 5.8 s of 6 310 ms. About 150 events at 3.5 ms already reach the
branch, while the events' term alone is still about 1 s.

The progress view is "unchanged" either way, so nothing built changes.

**Required change.** In V09 §4.21.9 (1):
* replace "but a dossier catch-up whose events' absorb term passes its budget, which folds one epoch over the span and
  completes past it"
* with "but a dossier catch-up where even one epoch over the span with its dossier events' absorb term passes its
  budget, which folds that one epoch and completes past it".

The rest of the sentence stays as it is.

### VV56-r4-02 (minor, NEW-PROBLEM, V06)

**Claim.** Round 4 put two new clauses on H-AQUA that run on raised ways its definition does not hold:
* T-V6-47's **later work across a standing raised way** (l. 4155) takes T110-2 (4)–(5) on H-AQUA (the END line). It
  runs "an epoch circuit across its standing aqueduct and one across a standing timber elevated road … an epoch route
  re-solved under a viaduct".
* T-V6-73's **under a crossing station** clause (l. 4181; VAP-r3-06) runs "on H-AQUA's ring … its masonry aqueduct
  through the wall arch, its viaduct on a raised gate".

V06 §7 (l. 4056–4057) defines H-AQUA only as "a town below a spring 4 km upslope inside the S3 lattice, growing from
TOWN to CITY to METROPOLIS and back to TOWN over 200 years, the spring's reach silted by a scripted `siltReach` in year
170". That gives an aqueduct. T-V6-57 and T-V6-61 also name only its aqueduct.

A generated viaduct or elevated road appears only where its reason holds (T110-3's `drop` and `link` reasons and the
prosperity and landmark tendencies), and H-AQUA's definition states none of these. A builder who builds H-AQUA as
defined runs the viaduct, raised-gate and elevated-road parts of both clauses on nothing, and those bars pass
vacuously.

The tests themselves name the parts, so a build agent would add them. This is the class of a fixture list that omits
what its own clause runs: minor.

**Required change.** V06 §7's **H-AQUA** definition adds, after "in year 170":

"; from CITY its walled ring is crossed by its masonry aqueduct through a wall opening and, where its main approach road
crosses a valley, by a viaduct on a raised gate, and from METROPOLIS a timber elevated road stands between two of its
landmarks — each declared in the fixture's recipe where generation does not lay it (a declared raised way is held,
V06 §3.19.2 (1))".

T-V6-47's and T-V6-73's H-AQUA clauses then name "its viaduct" and "its timber elevated road" as these.

### VV56-r4-03 (minor, CONFLICT, V06)

**Claim.** V06 §6.8 (6) (l. 4015–4021) says: "Where even one epoch over the span with its events' term passes the
budget (a catch-up of many more dossier events than T-V6-24's fixtures carry), the catch-up folds that one epoch …".

This round gave T-V6-24 a fourth catch-up fixture for exactly this branch: 100 years carrying 5 000 dossier events at
the METROPOLIS cap, with an estimate of at least 19 310 ms. So "than T-V6-24's fixtures carry" is now false of
T-V6-24's own fixture. The paragraph's next sentence and T-V6-24's bar both say "three catch-up fixtures". Nothing built
changes.

**Required change.** In V06 §6.8 (6):
* replace "(a catch-up of many more dossier events than T-V6-24's fixtures carry)"
* with "(a catch-up of many more dossier events than T-V6-24's three catch-up fixtures carry, as its over-budget fixture
  of 5 000 at the METROPOLIS cap)".

**Totals: 0 blockers, 0 majors, 3 minors** (round 3: 1 blocker, 2 majors, 2 minors).
