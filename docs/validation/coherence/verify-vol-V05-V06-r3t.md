# Verify V05 and V06 after repair round 3 — lane coherence/verify-vol-V05-V06-r3t

> PENDING FABLE REVIEW — written by opus standing in for the verifier seat; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V05-V06-r3t`, 2026-10-01)
- P0 brief read whole (ROUND-3 NOTES, NEW OWNER RULES 114–116, ORCHESTRATION NOTES); round-2 findings (10, verify-vol-V05-V06-r2t)
  and adjudication-r3 (R3-01 – R3-27 whole; Part H · V05, V06 and every END line naming a VV56 id) read: done
- P1 live V05 (sha256 cc1dfa61…) and V06 (8f92dd38…) equal assemble-r3's outputs; the pre-round-3 texts taken from
  920d280d (7617d87c…, d12c382b…, assemble-r2's); word diffs built (V05 3 hunks, V06 35): done
- P2 every round-2 finding re-checked against the live text and each END line's second end: done
- P3 every round-3 block in scope read subsection by subsection (V05 §1.2, §3 (d), §12 and its title block; V06 §1.1, §1b,
  §2 lead, §2.10, §2.12, §3.3.1, §3.5.1, §3.7.1, §3.7.6 (5), §3.7.7 (2)–(3), §3.10, §3.20.3–§3.20.4, §3.21, §3.22, §3.23
  whole, §4.3, §6.8–§6.9, §7's lead, table and rows, §9's J rows, §12): done
- P4 ids, references, retired terms, phone clauses, review ids, document checks, sizes: done
- P5 report, result, LANDED: done

Scope: V05 (the sky) and V06 (evolution) after assemble-r3. Method: the word diff of each live volume against its
pre-round-3 text (commit 920d280d), every changed hunk read with its whole subsection; V06 §3.22 and §3.23 read whole; the
partner homes each round-2 finding and each changed line names read at their homes — base §2.6 step 7, §2.7's support
step (3) and (6), §4.11 *The clock* (1) and (4) and *Works* (1)–(10), §7.7's precedence (T20-14 – T20-16), §8.2's crisis
rows and *The layer*, §8.6's restoration sentence, §10.2 *Crisis looks* (b)–(f), §12.1, §12.10's R12-31, §13.2's T123-4
and take-over row; V02 §5.7 (2), X34, X36 and its §3.21-style edge row; V03 §3.11 and §5.6 (2), (4); V04 §5.6 (3); V08
§3.6 (3) and §6's absorb rows; V09 §4.21.9; V10's `info.damage.patched` row; V12 §3.15.9. Ids outside the round-3 blocks
and the round-2 findings keep their earlier verdicts.

## 1. Round-2 findings re-checked

| id | owner (r2) | disposition (adjudication-r3) | verdict now | evidence |
|---|---|---|---|---|
| VV56-r2-06 | V06 | FIX per R3-08 (b), BLOCKER kept | **PARTLY FIXED — persists (blocker)** | Written: V06 §3.23 (3) (`decayPeak` per element, its entry week), the signature's `since`, W94's and §2.12's inputs, §6.9's cost per entry week, §3.21's decay row ("a restored building re-cut or extended \| the added elements drawn as built, the kept ones patched") and *ruined plans × the history* row, T-V6-76 (b), J-V6.139; the ends at V03 §5.6 (2) (b) (l. 2694–2701), V02 §5.7 (2) (l. 3053–3060), X34, X36 and its edge row (l. 2521), §8.6 (l. 13979–13984), §2.6 step 7 (l. 2101–2103), V10 l. 1829. The `extend` after a repair and a later re-cut are closed. Not closed: the restoring event's **own** re-cut, the main case the finding named — see section 4 |
| VV56-r2-01 | V06 | FIX per R3-08 (a) | **FIXED** | V06 §3.23 (3)'s head ("item 123 (b)'s "reused" — the building put back to use, a `reoccupy` from vacant or derelict, V06 §3.8.2 — and a repair; J-V6.141") and its `reused` sentence (§2.8's state holds no plan, level and peak 0); J-V6.141 (J122, vetoable), unique in the set; T-V6-76 (b) names the restorations, (c) keeps the `reused` trace at 0. Ends: §2.6 step 7 (l. 2099–2100, R3-06's binding text) and §13.2's T123-4 (l. 18424–18426) read the same |
| VV56-r2-02 | rendering | FIX per R3-10 | **FIXED** | §8.2 (l. 13011–13017): the look leaves each building by `crisisLookYields`, no week draws both, a building no rebuild reaches keeps it, a district's `ruinTone` stands while any of its buildings draws the look, a preview never hands over; *The layer* (l. 13025–13030) reads `crisisLookYields` and re-runs when the week crosses a Works' start week on a building of a standing disaster look |
| VV56-r2-03 | pipeline | MERGED into VPC-R2-09 | **CLOSED** | §10.2 (f) (l. 15574–15577) reads R3-10's text |
| VV56-r2-04 | V06 | FIX (V08's end an END line) | **V06 side FIXED; V08 side persists (major)** | V06 §6.8 (1) `+ a × N` (30 / 30 / 45 ms), (3), (6) (the catch-up's budget: `advance.budgetMs`, less 400 ms and T(B) inside an open — 6 310 ms at the cap; the one-epoch fold past the comfort level, F-BUDGET-TIME), the lead, W91, §1.1 (14), §3.21's row, T-V6-24 (fixtures of 200, 1 000 and 20 events), J-V6.136, §12's PLAUSIBLE (1); V08 §6's absorb-with-epochs row cites it (the END line). Not written: the pre-decided change the required change named for V08 §6 under R12-31 (the repair's HAND-OFF (c)), and V08 §3.6 (3) still says one epoch "always fitting" — see section 4 |
| VV56-r2-05 | V06 | FIX per R3-06 (a) | **FIXED** | V06 §3.23 (1): the run starts at the week the change shows — the start week of the Works the event started (a hazard's at its week, a `vacate`'s `decay` Works at its drawn offset; `Building.works`, then the lifecycle's weeks), else the effective week; the state by the last event dated so; W94's and §2.12's inputs; §3.21's row ("a `vacate` inside a yearly or a coarse catch-up epoch"); T-V6-76 (c) (the plan's damage and the exterior's stage agreeing at every week, citing V02's T-V2-59 for T123-5 — consistent with §13.2's take-over table, which gives T123-5 to V02) |
| VV56-r2-07 | pipeline | FIX per R3-14 (7) | **FIXED** (one edge left, VV56-r3-03) | §10.2 (d)'s `approachByGate` (l. 15538–15542): `frontierFor(doc, h)`, `h` the households the roster adds between the present population and that plus the camp's heads (its headcount, else its ground ÷ `areaPerHeadM2`) |
| VV56-r2-08 | pipeline | MERGED into VPC-R2-01 | **CLOSED** | §10.2 (b) (l. 15495–15500): "`regional_migration_pressure` the refugee camp (item 122 (b)'s mass immigration), the other regional_* pressures `none`" |
| VV56-r2-09 | V06 | FIX | **FIXED** (its new clause's wording: VV56-r3-01) | V06 §6.8's lead (l. 3912–3918) carries the catch-up as the third wait, "this is how the three stay inside the ten seconds" |
| VV56-r2-10 | V06 | FIX per R3-14 (7) | **FIXED** | V06 §3.22 (2) c. (the stage's land and the rich ribbon's plots; the ribbon's alone where (b) leaves no rest; a part-seated stage adds (d)'s belt), d. (below the quantum with a rich part, the belt and the ribbon's plots); §3.21's frontier row and T-V6-75 (c) carry each case |

## 2. Round-3 blocks read

**V05** (3 hunks: the title block's reading guide, §1.2's hook table, §3 (d), §12's reading record): VAL-R2-04 ("items
below 200 the owner's"; "file g's items" twice) and VKr2-07 ("its feet on ground part 0 (§2.7's `RaisedWayRecord.feet`;
item 110 (b))", which §2.7's `feet` comment and the `raised_foot` role support, a ring-end foot lying on part 0 too) are
written as ruled. No new problem.

**V06** (16 REPLACE blocks, 35 diff hunks). Read with their subsections:
* §1.1 (14), W91, §6.8 lead, (1)–(6), §3.21's dossier-bound row, T-V6-24, J-V6.136 — the catch-up's budget and its
  over-budget branch (VV56-r2-04, -09); new: VV56-r3-01 (the trigger stated two ways), and the V08 and V09 restatements
  (VV56-r2-04's persisting V08 side; VV56-r3-02).
* §1b's calamity, conditions and latitude rows (VPC-R2-03's own-unit side; VDC2-14 per R3-22 (b)) — agree with V08 §3.16 (7)
  (b), (d) and DR29.
* §2's lead and §3.20.3 (VAT2-r2-04, R3-18) — the present at creation and the creation week told apart; `HistoryIndex.creationWeek`
  (l. 811) agrees; §3.10's "the plan's creation week" is the `MutationPlan`'s own (its id's creation index, l. 678).
* §2.10's `households.heldByLock`, §3.5.1 (1), (4), (5), §3.21's decline and *history × locks* rows, §4.3's protection
  sentence, T-V6-70 (f) (VEL2-r2-01 per R3-19; the seat's JUDGMENT (1) on text 2 keeps texts 4–6 and the merged VPC-R2-07
  whole) — agree with §7.7's precedence (l. 11716–11723) and T20-15 / T20-16, and with V07 l. 2542–2547.
* §3.3.1 (VAT2-r2-02, R3-17) — cites §4.11 *The clock* (4), whose cadence (l. 8352–8356) holds the 52-week boundary, the
  roster tolerance and the calamity week; nothing lost.
* §3.7.1, §3.7.6 (5), §3.7.7 (2)–(3), T-V6-47 (the END lines of VEW-r2-01 and VM-R2T-03; VAT2-r2-08) — agree with §2.7's
  support step (3) and (6) (l. 2537–2566) and §4.11's take-over of the crossing station.
* §3.20.4's *Cancel* and §6.8 (5), §3.21's replay row (VEL2-r2-03's END) — agree with V09 §4.21.9 (2), (5).
* §3.22 whole (VAT2-r2-09, VV56-r2-10, VV78-r2-07, VEW-r2-03's END, T-V6-75) — agree with §8.2, §10.2 (d) and (f), V02 §5.7
  (1) and V03 §5.6 (4); new: VV56-r3-03 at the caller (`h` = 0).
* §3.23 whole (VV56-r2-01, -05, -06, VAT2-r2-05, -06, VV1112-r2-15, R3-04's lead) — agrees with §2.6 step 7, V03 §3.11 and
  §5.6 (2), V02 §5.7 (2), §8.6, V10; new: the restoring event's own re-cut (VV56-r2-06, persisting).
* §7's lead and take-over table, T-V6-73's head (VAP-r2-04) — agree with §13.2's evolution take-over row (l. 18469:
  "T114-8's and T114-10's epoch clauses (T-V6-73)").
* §9's J-V6.136, J-V6.139 and the new J-V6.141; §12's CONFIRMED and PLAUSIBLE (1) — agree with the text above.

**Ids.** T-V6-1 – T-V6-76, J-V6.1 – J-V6.141, W1 – W94: each defined once, no gap (J-V6.141 new, unique in the set).
**References.** assemble-r3's run: 0 broken in the set; every new citation in scope checked at its home (§6.3 *Plan
damage*, §2.7's support step (3) and (6), §4.11 *The clock* (1) and (4), *Works* (9), V03 §5.6 (2) (b), V03 §3.11 (c),
V06 §3.8.2 (1)–(2), V07 §5.6 (2), V08 §3.16 (7) (b), (d), §12.10's R12-31, V08 §6's cached boot, §12.5's T(B)).
**Retired terms** (canon glossary, 35 patterns) over every added run of V05 and V06: 0 hits. **Phone clauses** (item 126
(a2)): none. **Review ids** in design text (R3-02): none added. **Deferral wording**: none ("later" only temporal).
**Document checks** (`doc_checks.py --doc <volume> --heads docs/ARCHITECTURE.md --allow docs/validation/doc-checks-allow.tsv`):
V05 C1 0, C2 0, C3 237 hits (225 unreviewed, one fewer than before the round), C4 0, S1 0, S2 260 (1 unreviewed); V06
C1 0, C2 0, C3 289 (268 unreviewed; the 7 new against the pre-round text are runs of section numbers and ordinary words —
"3 5 1 1 4 5 and", "3 7 6 5 the", "down to 0 at its", "down and the building s" — no identifier, palette, grammar or word
list), C4 0, S1 0, S2 421 (16 unreviewed, unchanged). WARNING recorded: "reference corpus INCOMPLETE (missing: captures,
research/patreon, research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT authoritative" —
provisional.
**Size** (`wc -w`): V05 66 120 → 66 122 (+0.0 %), V06 106 872 → 109 262 (+2.2 %): the rulings' required design (the lock
and shortfall rules, the per-element peak, the aging default age and the replay's ruins, the catch-up's budget and its
over-budget branch, the preview, the frontier's cases, their edge rows, fixtures and J-V6.141); removed only §3.3.1's
restated cadence triggers (RESTATEMENT, now cited, nothing lost). No unit shrank, so no halving audit is due.

## 3. Owner items in V05 and V06

* **119 (a2)** — V06 §6.8 prices a catch-up's events and an open's own path; a catch-up whose events push even one epoch
  over its budget completes past the comfort level, reported. The release gate that owner rule implies (R12-31 / T119-2)
  has no pre-decided change for that path (VV56-r2-04, V08), and two restatements still say it always fits (V08 §3.6 (3);
  V09 §4.21.9 (1), VV56-r3-02).
* **122** — V06's hand-over and frontier agree with §8.2 and §10.2 at every seam the round touched; the preview's `null`
  overlay is wired at both ends. One edge at the caller: VV56-r3-03.
* **123** — V06's level is the one home (R3-06); the run's start, the default age that ages, the replay's ruins and the
  `reused` reading agree with §2.6 step 7, V03 §3.11 and T123-4. The per-element peak leaves the restoring event's own
  re-cut drawn damaged and then patched (VV56-r2-06, persisting).
* **125** — the latitude row reads `Intent.latitudeDeg` by DR29 (item 125 (b)); no `HostContext` input. Present.
* **126** — no phone clause in V05 or V06. Present.
* **114, 120** — V06 §3.7.7's crossing-station hold and T-V6-73's T114-10 clause agree with §2.7 and §13.2; V05 unchanged
  in scope.

## 4. Issues (5)

| id | sev | kind | owner | claim (short) |
|---|---|---|---|---|
| VV56-r2-06 | blocker | EDGE-UNDEFINED | V06 | the restoring event's own re-cut enters the plan at the event's effective week while its `repair` Works may still run: its new elements are drawn damaged, then "repaired" in patch material; T-V6-76 (b) fails; `decayPeak` undefined for week < since |
| VV56-r2-04 | major | WIRING | V08 | R12-31 charges an over-budget catch-up to V08 §6's per-event absorb, which states no pre-decided change; T-V6-24 passes runs (1 000 events ≈ 30 s) that R12-31 / T119-2 fail; V08 §3.6 (3) still says one epoch "always fitting" |
| VV56-r3-03 | major | EDGE-UNDEFINED | pipeline | §10.2 (d)'s `approachByGate` with `h` = 0 (a camp of fewer heads than one household): `frontierFor` answers none (V06 §3.22 (2) d.), and "nearest" an empty answer has no outcome |
| VV56-r3-01 | minor | CONFLICT | V06 | the over-budget trigger stated two ways in V06: "dossier events alone pass its budget" (§1.1 (14), W91, §6.8 lead and (3), §3.21) against "one epoch over the span with its events' term passes it" ((6), T-V6-24, J-V6.136) |
| VV56-r3-02 | minor | CONFLICT | V09 | V09 §4.21.9 (1): a dossier catch-up "complete[s] within it in total" — V06 §6.8 (6) now completes one past the comfort level, reported |

### VV56-r2-06 (blocker, EDGE-UNDEFINED, V06) — persists in part
**Claim.** R3-08 (b) is written everywhere it was routed and closes an `extend` after a repair and a re-cut after the
damage left. It does not close the restoring event's **own** re-cut — the case the finding led with. V03 §3.11 (l. 2017–2021):
"the event that restores the building (a `reoccupy`, a repair) reads its inputs as any standing building's, so occupants
other than those that left re-cut a stored plan inside that event and stale an unstored one (§7.3), the kept elements
keeping their thresholds while the damage leaves"; V03 §5.6 (2) (b) and V06 §3.23 (3) give each element that re-cut
mints `since` = "that change's effective week (V06 §2.11)" — for an engine op its epoch's week `E` (V06 l. 823). The
`repair` Works the `reoccupy` starts begins at `S`, uniform over `(prevWeek, E]` (V06 §3.13 (2); §4.11 *Works* (5), (10)),
and runs its drawn duration; wherever it has not reached FINISHED by `E`, V06 §3.23 (3) gives the level at `E` as
`L × (1 − f(E)) > 0`. Every minted element whose fresh threshold (§6.3) lies at or below that level — the new
occupants' partitions, doors and furniture — is drawn damaged from `E` by §6.3's comparison and, once the falling level
passes below its t, "repaired, in patch material", counted in `info.damage.patched` (V10 l. 1829): the wrong result the
blocker named, on a common path (every `reoccupy` re-cuts or re-derives for new occupants; Works start uniformly in the
span, so any positive repair duration begun in the span's last weeks runs past `E`). T-V6-76 (b)'s property over H-100
("a `reoccupy` from derelict with a re-cut …: 0 added elements drawn repaired") fails under the rule as written, and
J-V6.139's "a per-element peak never draws as repaired an element the damage never reached" holds only by drawing the
new element damaged first. `decayPeak`'s "the highest decayLevel over [since, week]" is also undefined for `week < since`
— a frame inside the epoch's span holds the event's re-cut plan from the Works' start (V06 §3.15.2).
**Required change.** V06 §3.23 (3), after "an element a re-cut keeps keeps its peak": "An element reads the building's
level — for §6.3's comparison and for `decayPeak` — only from a decay run that begins at or after its entry into the
plan: an element that enters while a restoration is lowering the level (the restoring event's own re-cut, its `repair`
Works still running at the event's effective week) reads 0 until the building's next decay run, so it is drawn as built
through the repair and never repaired"; the signature's comment reads "the highest decayLevel over [since, week] of the
runs begun at or after `since`; 0 with none, and 0 for week < since"; §3.21's decay-level row adds "a `reoccupy` whose
re-cut is made while its `repair` Works runs past its epoch's week | the minted elements drawn as built throughout the
repair, the kept ones leaving the damage and patched"; T-V6-76 (b)'s fixture names a `reoccupy` whose `repair` Works is
still running at its epoch's week. At its home (END): V03 §5.6 (2) (a)–(b) read each element's level by that rule (an
element minted by the restoring event's re-cut neither damaged nor repaired by the run it entered during), V02 §5.7 (2)
reading it through V03.

### VV56-r2-04 (major, WIRING, V08) — persists at V08
**Claim.** V06's side is written. The required change's other half — "the events' cost being the trigger of V08's
pre-decided change under R12-31 (hand-off: V08 §6's absorb-with-epochs row names that change)" — is not: the repair seat
left it as its HAND-OFF (c), and V08 §6's two absorb rows' *basis and fallback* cells (l. 3166–3167) name no change. R12-31
(base l. 17291): a wait past ten seconds takes "the owning path's own change first (… V06 §6's and V08 §6's rows)", else
"any other wait still past them fails the release until its path is changed — never a declared miss"; T119-2 (V12
§3.15.9 (2)): "Past it the wait fails". V06 §6.8 (6) and T-V6-24 charge the over-budget catch-up's miss to "the per-event
absorb of V08 §6's rows", and T-V6-24's own fixtures fall there by the design's numbers (100 years carrying 1 000 events:
1 000 × 30 ms ≈ 30 s at CITY; 20 years carrying 200 at METROPOLIS: 200 × 45 ms = 9 s against a 6 310 ms budget inside
an open). So T-V6-24 passes runs R12-31 and T119-2 fail, and the release has no pre-decided change to take. V08 §3.6 (3)
(l. 1849–1851) still says "one epoch over the span always fitting", which V06 §6.8 (6) now contradicts.
**Required change.** V08 §6's "an absorb with epochs" row adds to its *basis and fallback* cell R12-31's pre-decided
change for a catch-up whose dossier events' absorb term passes the catch-up's budget (V06 §6.8 (6)) — V08's change at
build depth, bounding that term so that V06 §6.8 (6)'s one-epoch fold fits the catch-up's budget on T-V6-24's catch-up
fixtures at CITY and METROPOLIS, every dossier event still folded at its own week and the model unchanged — and V06
§6.8 (6)'s and T-V6-24's over-budget clauses cite that change; V08 §3.6 (3)'s "one epoch over the span always fitting"
reads "one epoch over the span the floor (where even it, with the events' absorb term, passes the catch-up's budget, the
wait completes past the comfort level, reported F-BUDGET-TIME, V06 §6.8 (6))".

### VV56-r3-03 (major, EDGE-UNDEFINED, pipeline)
**Claim.** §10.2 (d)'s `approachByGate` (l. 15538–15542) ranks the faces "nearest V06's `frontierFor(doc, h)`, `h` the
households the sequential roster adds between the present population and that population plus the camp's heads". The
roster's delta is prefix-stable over persons (§4.11, l. 7880), so a camp of fewer heads than one household — a dossier
group's size of a few heads, which (c) sizes the camp by — can add 0 households; V06 §3.22 (2) d. answers "Zero
households answer none", and "nearest" an empty answer has no outcome (the text's fallbacks cover only "no main approach
road"). One builder ties every face and takes the keyed draw, another falls to the reference point: two placements.
**Required change.** §10.2 (d)'s `approachByGate`: "… `h` the households the sequential roster adds between the present
population and that population plus the camp's heads (its headcount by (c), else its camped ground ÷ `areaPerHeadM2`), at
least 1 — a camp smaller than one household seated where the next household would be …"; T-ER-27 adds a refugee camp of
two heads (the overflow belt by the gate, never undefined).

### VV56-r3-01 (minor, CONFLICT, V06)
**Claim.** V06 §6.8 (6) (l. 3976–3981), T-V6-24 and J-V6.136 state the over-budget branch as "where even one epoch over
the span with its events' term passes the budget"; V06 §1.1 (14) (l. 148), W91 (l. 374), §6.8's lead (l. 3918), §6.8 (3)
(l. 3952–3953: "a catch-up's fits its budget but where its dossier events alone pass it") and §3.21's dossier-bound row
(l. 3253) state it as "dossier events alone pass its budget". They differ where the events' term is under the budget but
one epoch over the span plus it is over — at the metropolis cap one epoch is ≈ 5.3 s against 6 310 ms inside an open, so
about 23 events at 45 ms already pass — where (3)'s claim that one epoch then fits is false. (6) governs the build; the
others are its summaries.
**Required change.** In V06 §1.1 (14), W91, §6.8's lead, §6.8 (3) and §3.21's dossier-bound row, "whose dossier events
alone pass its budget" / "where its dossier events alone pass it" reads "where even one epoch over the span with its
dossier events' absorb term passes its budget ((6))".

### VV56-r3-02 (minor, CONFLICT, V09)
**Claim.** V09 §4.21.9 (1) (l. 3416–3417): "an advance of time, a history-first generation and a dossier catch-up each
complete within it in total, coarsened to fit by V06 §6.8" — V06 §6.8 (6) now folds a catch-up whose events push even one
epoch over its budget as one epoch that completes past the comfort level, reported F-BUDGET-TIME.
**Required change.** V09 §4.21.9 (1): "… each complete within it in total, coarsened to fit by V06 §6.8 — but a dossier
catch-up whose events' absorb term passes its budget, which folds one epoch over the span and completes past it, reported
F-BUDGET-TIME, its progress view unchanged (V06 §6.8 (6))".
