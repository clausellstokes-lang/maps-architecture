# verify-pipeline-r3 — lane amendments-b/verify-pipeline-r3 (re-verify the PIPELINE part after repair round 3)

> PENDING FABLE REVIEW — Opus-produced (amendments-b/verify-pipeline-r3).

> PROGRESS (kill-safe ledger; a seat that continues this lane reads it first):
> STEP 0 skeleton: done (2026-09-27)
> STEP 1 inputs read (assemble-r3, repair-pipeline-r3 report, validate.md §6, verify-pipeline-r2, other r3 reports' notes): done
> STEP 2 part diff (pre-repair-r3 archive vs live) and repaired subsections read whole: done (14 hunks in 6 subsections; §4.1, §4.6, §4.7, §4.11, §10.2, II.6 read whole)
> STEP 3 per-issue re-check of the r3 pipeline repairs + pipeline-relevant issues owned elsewhere: done (all 9 FIXED; findings drafted: dossier household overflow (major), Frontage split identity, S11 clamp on non-residential, locked households, J-A28.51 stale)
> STEP 4 per-item verdicts re-judged: done (§3 written)
> STEP 5 checks: done (§4 written)
> STEP 6 issue list: done (8 issues: 1 major (VP3-01 pipeline), 7 minor; pipeline 3, determinism 3, model 1, scope 1)
> STEP 7 Fable queue row + LANDED line: done (row B-amendments-b/verify-pipeline-r3 appended; LANDED line written)

Lane `amendments-b/verify-pipeline-r3`, 2026-09-27. Part verified: PIPELINE (`## §4 `, `## §10 `, `# PART II`, `## II.`,
`# PART III`) of `docs/ARCHITECTURE.md` at sha256 `1a861c729f26ba997ae78222d867f715dac2bb77d15e3e8128c661b4f25a3817`
(assemble-r3's installed hash), rationale `8a24a5a7…`. Line numbers below are that document's.

## 0 Outcome

The round-3 pipeline repair holds. All nine issues validate.md §6 routed to the pipeline — VD2-02 (major), V-MAB2-02,
VP2-02, V-MAB2-11, VP2-01, VP2-03, VP2-04, VAL-01, VAL-02 — are FIXED in the live text (§2). So are the eight other-part
issues my r2 report raised that touch this part (VP2-05 – VP2-13; §2). Every item routed here is PRESENT except the
referencing side of item 20, which is PARTIAL (VP3-01). No retired text returned (32 probes), no deferral wording
entered, and the resolver finds no broken reference in the part.

**8 issues remain: 1 major, 7 minor** (§5). Owners: pipeline 3, determinism 3, model 1, scope 1.
* **VP3-01 (major, pipeline).** Round 3 made F-SITING's last rung take a household S11's overflow pass cannot house off
  the manifest (VP2-07 in §5.2, J-A28.46's Part A). But §7.7 item 2 makes the dossier's population dossier-backed, and
  F-SITING never drops a dossier-backed item. The owner's item 20 (b) and (e) require the housing to be re-provided. In
  a dossier town, such a household has two contradictory fates. assemble-r3 §8 note 4 and the determinism seat flagged
  this for a ruling, and no seat ruled. VP3-02 (determinism, §5.2) and VP3-03 (scope, T19-4) are the companion changes.
* **VP3-04 (pipeline).** The fill's "residential slot" has no typed field. It can drop a `required` structure, and S11's
  clamp into [1, capacity] reads as applying to every building.
* **VP3-05 (pipeline) and VP3-06 (determinism).** II.6's split `Frontage` records get no edge-row rekey, and §6.3 has no
  identity rule for them.
* **VP3-07 (model).** The model seat's note: §2.6's re-homing picks "the last in address order" even when that household
  is locked.
* **VP3-08 (determinism).** J-A28.51's Part A still says "S10b's fill".

Every issue has an exact required change, and none needs the owner.

## 1 Inputs read

* The route objects of items 8–31 for this part (`route.json`). The owner's words of item 20 were re-read
  (`docs/AMENDMENTS-2026-09-25b.md` l. 155–181: (b) the population "EXISTS on every map", (e) "housing for its population
  is re-provided elsewhere"), and so were those of items 11, 12, 28 (f), 29, 30 and 31, whose texts this round changed.
* Read whole: `assemble-r3.md` (§8's open notes included), `repair-pipeline-r3-report.md` (its five refinements
  included) and validate.md §6. My own `verify-pipeline-r2.md` was also read whole.
* The cross-part notes of `repair-model-r3-report.md` ("Cross-part notes"), `repair-determinism-r3-report.md` (§3 and "For
  Fable to re-check first"), `repair-scope-r3-report.md` §3, and the kernel and rendering reports. None of the last two
  addresses the pipeline.
* **The part diff** against `docs/archive/ARCHITECTURE-pre-amendments-b-repair-r3-2026-09-27.md` (`831efd42…`), made
  per subsection (scratchpad `vp3/secdiff.py`, `vp3/part-diff.txt`, read whole). It has 14 hunks, all inside the six
  replaced subsections (§4.1, §4.6, §4.7, §4.11, §10.2, II.6). Every other subsection of the part, PART III included,
  is byte-identical to the archive.
* **Read whole in the live document:** §4.1 (l. 3211–3364), §4.6 (l. 4180–4361), §4.7 (l. 4362–4695), §4.11 (l. 4955–5497),
  §10.2 (l. 8889–9037) and II.6 (l. 11840–11979).
* **Read for the cross-part checks:**
  * §2.5 `Frontage` and `BuildingSlot` (l. 855, 878), §2.6's interior-ladder baseline and capacity bullet (l. 1440–1500),
    `Basement.access` (l. 1333), `Building.households` (l. 965), §2.8 `ElaborationRecord` (l. 1715–1730);
  * §5.2 F-SITING and F-PLAN (l. 5637, 5639), §5.3's dossier row (l. 5667), §6.3's anchor table and JOIN and SPLIT
    bullet (l. 6139–6209), §7.1's household row (l. 6604), §7.2 (l. 6629–6646), §7.7 item 2 (l. 7387–7401);
  * II.7.3's U1 and (c) (l. 12099–12121); §13.2's T11-1, T19-4, T20-6, T30-2 and T31-10, and the `portRef` contract
    test; §13.7's item-30 row; the Staged sewers row;
  * the index rows and Part A entries of J-A11.43, J-A12.47, J-A20.43, J-A20.75, J-A28.46, J-A28.51 and J-A30.41.

## 2 The repair, issue by issue

FIXED means the required change, or an equivalent the verifier accepts, is in the live text. The quote is the live
wording.

| issue | verdict | where; the live wording |
|---|---|---|
| VD2-02 (major) | FIXED + VP3-01 (an adjacent path) | §4.11 l. 5315–5327, a new paragraph after the epoch-spread one: "**Dossier content across epochs (item 20; J-A20.75, J-A20.43).** No step of an epoch closes a dossier-backed use … or leaves one without a building; only a dossier event the epoch applies at step (e) removes, adds or re-designates one … Before any other step would empty or remove the building that houses an unpinned one — a redevelopment's purchase, step (c)'s `vacate`, the decline lottery's strike, … `fallIsland`, a tunnel's closing (II.7.3) or a passage's sealing — the use is first relocated … a `relocateUse` citing the epoch and counted outside the use cap, the request's scope its catchment less the plots that step empties or removes, widened to the town …". Use step (2), l. 5299: "a dossier-backed use never closes by this rule". Rung 3, l. 5034–5035: "a dossier-backed use relocated, never closed". Exemptions row, l. 5375: "the building of a dossier-backed use only after that use is relocated". J-A20.43 (new) has one index row (l. 12984) and one Part A entry (l. 516). §7.7 item 2, §5.3's row and T20-6 all point to the paragraph by name. The refinements (dossier events at step (e) excepted; scope less the doomed plots, widened to the town; "stays in its building" where no candidate exists) are coherent with J-A20.71's always-placing `dossier` request. |
| V-MAB2-02 | FIXED | §4.7 l. 4690–4694: "The overflow pass runs inside every change §2.6's capacity rule lists — S11's operator building or changing a residential shell (an epoch's new faces, a rung-3 re-cut, a designation mutation, item 18) among them — whenever the result's capacity falls below its households". §2.6 l. 1484–1494 holds the list. |
| VP2-02 | FIXED | §4.11 step (a), l. 5116–5119: "S6 re-evaluates the drivers and the bands, re-bands every live plot's `fieldBand` against its own column by §4.5's rule (§2.5; J-A28.29) — before any rung reads the field band, the former values in the epoch's undo record — and marks the due blocks". This agrees with §2.5 l. 866, §7.4's `fieldBand` and epoch rows (l. 6998, 7008) and §7.5 l. 7211. |
| V-MAB2-11 | FIXED | §10.2 l. 8998: "`basementAccess: 'core'\|'trapdoor'\|'external' /* the access §2.6's basement decision derives into Basement.access for a cellar that is no walk-out, read at the plot's builtBand; the plan rung reads Basement.access */`". This matches §2.6 l. 1333–1334 and J-A29.25. |
| VP2-01 | FIXED + VP3-04 | (1) §4.7 l. 4674–4680: "at least one household and at most the row's `households.built`, … a plot's slots filled in its slot list's order, required slots first … A residential slot the demand cannot fill is dropped from the plot's site plan, its ground typed as yard, and a residential plot none of whose slots it can fill is typed vacant by S10b's reconcile (above) — surplus capacity, never an empty residential building". (2) §10.2 l. 9023–9024: "with no epoch every residential building houses what §4.7's generation fill gives it — at least one household and never above its capacity". (3) J-A28.46's Part A: "or dropping the household before any re-placement (… F-SITING's last rung alone takes off the manifest a household no building of its district can hold, reported — VP2-07)". Clause (3) is where VP3-01 arises. |
| VP2-03 | FIXED | §4.11 (6), l. 5405–5406: "the underground crowding hook first sends `crowdingShare` of the residual's poorest-band households underground (II.7.3 (c), II.7.4, §4.5 S7b (6))". This matches II.7.3 (c) l. 12120–12122 and J-A12.47. |
| VP2-04 | FIXED + VP3-05, VP3-06 | II.6 l. 11941–11952: the stretch "widens … out to the first centreline vertex at or beyond that end whose station no underground plot's frontage straddles on either side of the tunnel … so that no plot fronts two records (U1, II.7.3), the widening shown by the dry run and reported with the event's fates"; "each part keyed by §6.3's SPLIT rule for a tunnel record"; the chambers (`Tunnel.chambers`) and the access points (`AccessPoint.under.tunnel`) are handed on; "the `Frontage` records … split where one spans an end, keyed as the tunnel's parts are, and each re-pointed (`Frontage.way`)". J-A11.43 is restated in the index (l. 12978) and in Part A. §6.3 l. 6202–6205 holds the tunnel-record rule (VP2-05). |
| VAL-01 | FIXED | §4.1 l. 3353–3354: "the wing rings or a spanned passage's face, … (§2.8's `ElaborationRecord.inputs`)". This matches §2.8 l. 1720 and 1726. |
| VAL-02 | FIXED | §4.6 l. 4313–4317: "read for a district at its plots' area-weighted mean prosperity value (interpolated between the band rows) and scaled as the reach weights are, by the rung's factor (TOWN 0.6, CITY 1.0, METROPOLIS 1.2) and by (0.5 + the district's area-weighted mean density value), capped at one; the base weights are fitted at M-1 on B-CITY so that every rung's districts meet their scaled targets … (§13.7's row holds the fit's fallback …)". B-CITY runs all three rungs (l. 10131), so the fit can meet them. T30-2 (l. 10420), §13.7's row (l. 10845), O18 (d) and J-A30.41's index and Part A agree. |

**The other parts' round-3 repairs that my r2 report asked for.** Each is FIXED in the live text:
* VP2-05, §6.3 l. 6202–6205: "A **tunnel record** split by a stretch conversion … the part holding it keeps the address,
  the other parts take addresses minted from the causing event's `seq` and ordinal".
* VP2-06 = V-MAB2-05, F-PLAN tier 6: "the generation fill (§4.7: S10b's placement, S11's clamped write and its overflow
  pass)".
* VP2-07, F-SITING (l. 5637): the detection clause "S11's overflow pass … finds no residential building of the district
  with room" and the rung "takes the last rung alone". This rung is where VP3-01 arises.
* VP2-08 = V-MAB2-12: §2.6 l. 1452–1454 points to §4.7.
* VP2-09: T19-4.
* VP2-10 = VS2-05: the `portRef` contract test in §13.2's "Stage contract tests".
* VP2-11: T31-10's no-build `amalgamate` clause.
* VP2-12: T11-1 with the widened ends.
* VP2-13: the Staged row names the crowding share.

The r0–r2 findings outside the repaired subsections keep their earlier verdicts (`verify-pipeline-r0.md` §2–§3,
`verify-pipeline-r1.md` §2–§5, `verify-pipeline-r2.md` §2–§4).

## 3 Per-item verdicts

Each item is re-judged where round 3 changed its text; the others keep r2's verdict and quote (`verify-pipeline-r2.md`
§4).

| item | r2 | r3 | the quote that carries it now; open issues |
|---|---|---|---|
| 8 decline and regrowth | PRESENT | PRESENT | The exemptions row now spares "the building of a dossier-backed use only after that use is relocated" (l. 5375). |
| 10, 13, 14, 15 | PRESENT | PRESENT | unchanged (II.6 (1)–(8), II.7.1) |
| 11 the underground fades | PRESENT | PRESENT | II.6: the stretch is widened to a vertex "whose station no underground plot's frontage straddles", the chambers, access points and block `Frontage` records are re-pointed, and "each part [is] keyed by §6.3's SPLIT rule for a tunnel record". Open: VP3-05, VP3-06. |
| 12 underground neighbourhoods | PRESENT | PRESENT | §4.11 (6) now sends "`crowdingShare` of the residual's poorest-band households underground", as II.7.3 (c) does. |
| 16 assignments by rule | PRESENT | PRESENT | unchanged. F-SITING now detects the overflow case (VP2-07). Open: VP3-01 on its last rung. |
| 17 uses move | PRESENT | PRESENT | Use step (2): "a dossier-backed use never closes by this rule". Rung 3's purchase: "a dossier-backed use relocated, never closed". |
| 18, 19 | PRESENT | PRESENT | unchanged |
| 24 several markets | PRESENT | PRESENT | §4.2 S3 (12)'s `portRef` contract test now exists in §13.2 (VS2-05), so r2's open issue is closed. |
| 25, 26, 27 | PRESENT | PRESENT | unchanged |
| 30 hidden plots | PRESENT | PRESENT | §4.6: the hidden-share target is "read for a district at its plots' area-weighted mean prosperity value … scaled … by the rung's factor … and by (0.5 + the district's area-weighted mean density value)". §4.1's stale list names "a spanned passage's face". |
| 31 prosperity change, ladder, floor | PRESENT | PRESENT | §4.11 (a) "re-bands every live plot's `fieldBand` … before any rung reads the field band". |
| ref 20 the dossier is the authority | PRESENT | **PARTIAL** | Across epochs, *Dossier content across epochs* (l. 5315–5327) closes VD2-02. At generation, a dossier-backed household S11's overflow pass cannot house is sent to a rung that takes it off the manifest, against item 20 (b) and (e) (VP3-01). |
| ref 22, 23 | PRESENT | PRESENT | unchanged |
| ref 28 plans by click; (f) | PRESENT | PRESENT | §4.7: at least one household per residential slot; an unfillable slot is dropped (yard) and an unfillable plot is typed vacant; the overflow pass runs "inside every change §2.6's capacity rule lists". Open: VP3-04, VP3-07. |
| ref 29 entrances and basements | PRESENT | PRESENT | §10.2's `basementAccess` is commented as the default `Basement.access` derives from at `builtBand`. |

## 4 Checks

**Retired texts.** CONFIRMED by a script over the live document and rationale (scratchpad `vp3/probes.txt`; the counts
are document / part / rationale).
* Round 3's retired texts are all 0 / 0 / 0:
  * "at most the row's `households.built`, by band ± drift (the capacity";
  * "The same holds wherever S11's operator later builds";
  * "first takes its table share";
  * "the new records take addresses minted from the event";
  * "the first vertex standing for a plot's frontage anchor";
  * "every building houses its row's `built` count";
  * "clamped to its capacity with the overflow re-placed";
  * "re-evaluates the drivers and the bands and marks the due blocks";
  * "to which the reach weights are fitted at M-1 on B-CITY and which";
  * "its band's target";
  * "every building houses its template row";
  * "under item 17's rules; a pinned";
  * "the wing rings, the households, a table slice";
  * `basementAccess: 'core'|'trapdoor'|'external';` (without its comment).
* The r1 and r2 texts are still 0 in the document.
* In the rationale, "S10b's fill" is still 1, in J-A28.51's Part A (VP3-08). "moves it only through rung 3" and "only New
  random" are 1 each, but both sit inside J-A31.44's and J-A31.48's amendment notes, which record the correction.
  Neither is stale.

**SINGLE-SOURCE (kind duplicate).** Round 3 adds no second statement to the part. Each new mechanism is stated once:
* the dossier-across-epochs rule in §4.11, with pointers from §7.7 item 2, §5.3's row, T20-6, §0.2 row 20 and the
  decline exemptions row;
* the overflow pass's triggers in §2.6's capacity rule, which §4.7 points to;
* the `fieldBand` re-banding in §4.11 (a), with pointers from §2.5, §7.4 and §7.5;
* the tunnel split's identity in §6.3, which II.6 points to;
* the stale list in §2.8, which §4.1 copies with a pointer to `ElaborationRecord.inputs`. It is the validator's
  prescribed form, and the text is identical to §2.8's.
One accepted repetition: §4.6 names the rung factors (TOWN 0.6, CITY 1.0, METROPOLIS 1.2) twice in one paragraph. The
second time it says "scaled as the reach weights are", so both readings are the same table cells. The validator's
required text made this repetition, and it is no issue.

**STALE.** The part keeps none of these old rules: lots as buildings, binary wealth, size fixed by tier, one central
market, the map editing the dossier, a licence default, or terrain and water that never change. The r0 greps were re-run
over the 14 hunks. Outside the part, J-A28.51's Part A still credits "S10b's fill" (VP3-08).

**CROSS-PART.** Every pointer the round-3 text adds resolves to a home that states what it assumes:
* §2.6's capacity list (l. 1484–1494) for §4.7's pass;
* §2.8's `ElaborationRecord.inputs` for §4.1;
* §6.3's tunnel-record sentence for II.6;
* §2.6's `Basement.access` derivation for §10.2;
* §7.7 item 2 and J-A20.71 for the dossier paragraph;
* II.7.3 (c) and II.7.4 for §4.11 (6);
* §13.7's item-30 row for §4.6's fallback.
The exceptions are these:
* II.6's "keyed as the tunnel's parts are" for a split `Frontage` record relies on an identity rule §6.3 does not state
  for `Frontage` records (§6.3's anchor table has no `Frontage` row), and it names no rekey of the frontage edge rows
  (VP3-05, VP3-06).
* §4.7 and J-A28.46 send an unhousable household to F-SITING's manifest rung, but §7.7 item 2 ("the population … F-SITING
  never drops it") and F-SITING itself ("never a dossier-backed item") forbid that for a dossier's population (VP3-01).
The cross-part notes addressed to the verify round:
* assemble-r3 §8 note 4, the determinism seat's "For Fable" item: raised as VP3-01.
* The model seat's "locked households under re-homing" (§4.7 and §2.6): raised as VP3-07.
* The model seat's capacity-on-composed-wings note concerns §2.6 alone and is the model verifier's.
* The model seat's V-MAB2-01 bar note concerns §13.2 and §5.3 and is the scope and determinism verifiers'.
* The §16 capacity move (note 5) is scope's.

**DEFERRAL-WORDING.** None. No added line of the part carries "later", "TBD", "open", "pending", "future" or "not yet"
(scratchpad grep of the diff's added lines: 0 hits). The staged hooks (the evolution engine, the underground stages)
keep the roadmap wording.

**BROKEN-REFERENCE.** `refs.py docs/ARCHITECTURE.md <scratch json>` reports 139 heading keys, 35 D ids, 470 J ids and
2 broken references. Both are the pre-existing external citations, `os-geometry.md` §2.1.4 (l. 2708) and RFC 7946
§3.1.6 (l. 9200), and neither is in the part. J-A20.43 resolves. Both hashes were checked unchanged before and after
the run.

**NEW-PROBLEM.** The round's changes meet existing rules in four places:
* The overflow household's F-SITING fate meets item 20 (b) and (e) (VP3-01).
* S10b's drop of "a residential slot the demand cannot fill" meets the template's typed `required` and `count` fields,
  and S11's clamp into [1, capacity] meets the non-residential buildings a residential plot also carries. "Residential
  slot" has no typed field (VP3-04).
* The `Frontage` split meets the `EdgeSetRef` form `('frontage', frontage id)` of §2.5, whose rows must move to the new
  record (VP3-05).
* The re-homing's "last in address order" meets §7.1 and §7.2's household locks (VP3-07).

## 5 Issues (owner part, severity, exact required change)

Line numbers are the live document's (sha256 `1a861c72…`). Every quoted old string occurs exactly once in its file,
whitespace normalised (checked by script, scratchpad `vp3/oldstrings.py`). A quoted string that wraps in the file is
quoted as one line.

| owner | blocker | major | minor | total |
|---|---|---|---|---|
| pipeline | 0 | 1 | 2 | 3 |
| determinism | 0 | 0 | 3 | 3 |
| model | 0 | 0 | 1 | 1 |
| scope | 0 | 0 | 1 | 1 |
| **all** | 0 | 1 | 7 | 8 |

Apply order: VP3-01 with VP3-02 and VP3-03; VP3-05 with VP3-06.

### VP3-01 — pipeline · major · conflict · items 20 (b), (e) and 28 (f) (§4.7 households paragraph; J-A28.46)

**Claim.** §4.7 (l. 4688–4689) makes "a household no building of the district has room for … an unplaced item of
F-SITING". F-SITING's round-3 rung (l. 5637) then says it "takes the last rung alone — the manifest reduced by it", and
J-A28.46's Part A says "F-SITING's last rung alone takes off the manifest a household no building of its district can
hold".

Three texts forbid that for a dossier town:
* §7.7 item 2 (l. 7387–7389) makes "the population (the roster's demand, §10.2)" dossier-backed: "F-SITING never drops
  it".
* F-SITING's own manifest rung reads "never a dossier-backed item".
* The owner's item 20 says the population "EXISTS on every map" ((b)), and "anything needed to satisfy the dossier (e.g.
  housing for its population) is re-provided elsewhere" ((e)).

So a dossier household the overflow pass cannot house has two contradictory fates, and no text re-provides its housing.

The path is reachable. §2.6's capacity is area-based, `min(households.max, floor(…))`. In a squalid or poor district of
small shells it falls below the template rows' `households.built` in every building, so the whole district is at
capacity. assemble-r3 §8 note 4 and the determinism seat ("For Fable") both left it as an open question on J-A28.46, an
unresolved choice under the no-defer rule. The text conflict is CONFIRMED by reading. The squalid-district trigger is
PLAUSIBLE, since no code exists.

**Required change** (the direction reuses S10b's post-build order and the `dossier` request, which always places; it
is PLAUSIBLE and vetoable):
1. **§4.7.** Replace "and a household no building of the district has room for is an unplaced item of F-SITING (§5.2),
   reported with the capacities that refused it." with "and a household no building of the district has room for is an
   unplaced item of F-SITING (§5.2), reported with the capacities that refused it — except a dossier-backed one (the
   dossier's population, §7.7 item 2), which is never taken off the manifest: its housing is re-provided inside the
   district (item 20 (e)) by S10b's `dossier` request in the least-disruption order of a request after the city is built
   (above) — a vacant plot or vacancy run first, then an under-used plot's yard — and S11's mutator builds there the
   residential slot of that plot's designation template for it, within that building's capacity and still inside the
   district's derivation, each such build reported."
2. **J-A28.46's index row.** Replace "an overflow is re-placed by S10b's solver inside the district after its last S11
   batch (band, then drift; score, then address), else an F-SITING item;" with "an overflow is re-placed by S10b's
   solver inside the district after its last S11 batch (band, then drift; score, then address), else an F-SITING item —
   but a dossier-backed household is never dropped: the `dossier` request re-provides its housing inside the district (a
   vacant plot or vacancy run, then an under-used plot's yard), S11's mutator building a residential slot there;".
3. **J-A28.46's Part A.** Replace "F-SITING's last rung alone takes off the manifest a household no building of its
   district can hold, reported — VP2-07)" with "F-SITING's last rung alone takes off the manifest a household no
   building of its district can hold, reported — VP2-07 — and never a dossier-backed one, whose housing the `dossier`
   request re-provides inside the district, because the owner's item 20 (e) asks that housing for the dossier's
   population be re-provided elsewhere and item 20 (b) that the population exist on every map; the district bound keeps
   the laziness contract (verify-pipeline-r3, VP3-01))".

### VP3-02 — determinism · minor · conflict · items 20, 28 (f) (§5.2 F-SITING; companion of VP3-01)

**Claim.** F-SITING's ladder cell (l. 5637) lets "a household S11's overflow pass cannot house" take "the last rung
alone — the manifest reduced by it". Its test cell reads "every household S2 demanded housed or reported unplaced
(§13.2 T19-4)". For a dossier's population, both contradict the same cell's "never a dossier-backed item" and §7.7 item
2.

**Required change.** In §5.2 F-SITING:
* In the ladder cell, replace "a household S11's overflow pass cannot house takes the last rung alone — the manifest
  reduced by it, reported with the capacities that refused it, no re-cut after S11" with "a household S11's overflow
  pass cannot house takes the last rung alone — the manifest reduced by it, reported with the capacities that refused it,
  no re-cut after S11 — unless it is dossier-backed, whose housing §4.7 re-provides inside the district (item 20 (e))".
* In the test cell, replace "every household S2 demanded housed or reported unplaced (§13.2 T19-4)" with "every
  household S2 demanded housed or reported unplaced, a dossier-backed one always housed (§13.2 T19-4)".

### VP3-03 — scope · minor · partial · items 20, 28 (f) (§13.2 T19-4; companion of VP3-01)

**Claim.** T19-4 (l. 10336–10337) accepts "every household S2 demanded (§4.2) is housed or reported unplaced by
F-SITING". For a dossier town this passes on a map that drops dossier population, and no bar exercises VP3-01's
re-provision.

**Required change.** In §13.2, replace "and every household S2 demanded (§4.2) is housed or reported unplaced by
F-SITING (§4.7, J-A28.46)." with "and every household S2 demanded (§4.2) is housed or reported unplaced by F-SITING
(§4.7, J-A28.46), a dossier-backed one always housed — on a dossier fixture whose squalid district's shells hold fewer
households than their template rows, every dossier household is housed, no building exceeds its capacity, and each
re-provided residential slot is reported."

### VP3-04 — pipeline · minor · partial · item 28 (f) (§4.7 households paragraph; §10.2 `DesignationTemplateRow.structures`)

**Claim.** Round 3's fill is stated per "residential slot" (§4.7 l. 4674–4680; J-A28.46), which leaves three gaps:
1. **No typed field.** No field says which slot is residential. `DesignationTemplateRow.structures` is `{ role; count;
   footprintShare; required }` (§10.2 l. 8918), and `BuildingSlot` has only `role` and `entranceOn` (§2.5 l. 878). S10b
   cannot tell a dwelling slot from a stable.
2. **Required structures dropped.** "A residential slot the demand cannot fill is dropped from the plot's site plan"
   may drop a structure the template marks `required` or take it below its `count` minimum. Yet S11's generation, "the
   mutation from the empty design", adds "every structure", and the mutator adds "each required structure without a
   match".
3. **The clamp's scope.** "S11, which creates each building and its wings, writes `Building.households` from its slot's
   households in address order, clamped into [1, capacity]" reads as applying to every building of the plot. A
   workshop, a stable or a store would then need a household it was never given. §2.6, §10.2, §5.2 and T19-4 all say
   "every residential building".

**Required change.**
1. **§10.2.** Replace "structures: { role: string; count: [number, number]; footprintShare: number; required: boolean }[]"
   with "structures: { role: string; count: [number, number]; footprintShare: number; required: boolean; houses:
   boolean /* item 28 (f): a residential slot — its building houses households by §4.7's generation fill; a live-in
   workplace's main slot is one */ }[]".
2. **§4.7, the typed slot.** Replace "per residential slot of the plot's designation template row at least one
   household" with "per residential slot (a structure with `houses`, §10.2) of the plot's designation template row at
   least one household".
3. **§4.7, required structures.** Replace "A residential slot the demand cannot fill is dropped from the plot's site
   plan, its ground typed as yard, and a residential plot none of whose slots it can fill is typed vacant by S10b's
   reconcile (above)" with "A residential slot the demand cannot fill is dropped from the plot's site plan, its ground
   typed as yard, never below its structure's least `count` where the structure is `required`; a residential plot whose
   required residential slots the demand cannot all fill is typed vacant by S10b's reconcile (above), its households
   placed on the next candidate".
4. **§4.7, the clamp.** Replace "which creates each building and its wings, writes `Building.households` from its
   slot's households in address order, clamped into [1, capacity]" with "which creates each building and its wings,
   writes each residential building's `Building.households` (a building S11 builds for a slot with `houses`; every other
   building's list is empty) from its slot's households in address order, clamped into [1, capacity]".

### VP3-05 — pipeline · minor · partial · item 11 (II.6, the `Frontage` split)

**Claim.** II.6 (l. 11950–11952) splits "the `Frontage` records of the underground blocks along it … where one spans an
end, keyed as the tunnel's parts are, and each re-pointed (`Frontage.way`)". A `Frontage` names its kerb edges by the
view `edges: EdgeSetRef /* ('frontage', frontage id) */` (§2.5 l. 855). The part beyond the end therefore has no edges
until its `('frontage', id)` rows move to the new record, and the old record's set still holds both parts. II.6 states
that move for the tunnel's own `StretchRef`s but not for the frontage rows. Both parts' `lengthCm` also stay stale.

**Required change.** In II.6, replace "`Frontage` records of the underground blocks along it (§2.5) split where one spans
an end, keyed as the tunnel's parts are, and each re-pointed (`Frontage.way`) to the part it fronts;" with "`Frontage`
records of the underground blocks along it (§2.5) split where one spans an end — the part beyond the end a new record,
its kerb edges' `('frontage', id)` rows moved to it by `retypeEdges`' `rekey` (§3.4), each part's `lengthCm` its own,
both keyed by §6.3's rule for a split `Frontage` — and each re-pointed (`Frontage.way`) to the part it fronts;". Apply
with VP3-06.

### VP3-06 — determinism · minor · partial · item 11 (§6.3 JOIN and SPLIT; the identity of a split `Frontage`)

**Claim.** §6 owns identity (canon R5). II.6 keys the split `Frontage` records "as the tunnel's parts are", but §6.3
states the rule only for "a **tunnel record**" (l. 6202–6205). §6.3's anchor table has no `Frontage` row, so no text
says which part keeps a `Frontage` id. This is the same gap VP2-05 closed for the tunnel record.

**Required change.** In §6.3's JOIN and SPLIT bullet, after "and every part continues the tunnel's lineage with its part
index." insert: "A block's `Frontage` record split at the same ends (II.6) follows it: the part holding the record's
first kerb vertex keeps its id, the other takes an id minted from the causing event's `seq` and ordinal, and an `undo`
restores the one record (§7.4)."

### VP3-07 — model · minor · new-problem · item 28 (f) (§2.6 the capacity rule's re-homing; the model seat's cross-part note)

**Claim.** §2.6 (l. 1490) re-homes "the households past the capacity, the last in address order", and says "No such
change is refused for it". §7.1 (l. 6604) lets a household be locked, and a locked entity is a fixed input (§7.2). When
the last household in address order is locked, the rule would move it against its lock. The same happens when the locked
households alone exceed the new capacity. §4.7's generation clamp ("in address order, clamped") inherits the gap when a
regeneration keeps locked households. `repair-model-r3-report.md` left this observation to this round (PLAUSIBLE).

**Required change.** In §2.6:
* Replace "re-homes the households past the capacity, the last in address order, by §4.7's overflow pass inside the
  causing event" with "re-homes the households past the capacity — the last in address order among those not locked (a
  locked household stays, §7.2) — by §4.7's overflow pass inside the causing event".
* Replace "No such change is refused for it; only a hand `relet` above the capacity is (F-EDIT)." with "No such change
  is refused for it, except a hand edit that would leave a building's locked households alone above its new capacity,
  which is refused as F-EDIT naming the locks; a hand `relet` above the capacity is refused too (F-EDIT)."
* Append to J-A28.23's Part A entry: "A locked household is never re-homed; a hand edit whose lowered capacity is below
  the locked households alone is refused (verify-pipeline-r3, VP3-07)."

### VP3-08 — determinism · minor · stale · item 28 (f) (J-A28.51's Part A)

**Claim.** J-A28.51's Part A (rationale l. 336) still reads "tier 6 never reaching a unit because S10b's fill and
`relet` keep the count within §2.6's capacity". V-MAB2-05 corrected the same clause in F-PLAN tier 6. After J-A28.46,
S10b cannot read the capacity. S11's clamped write, its overflow pass and §2.6's re-homing keep the count.

**Required change.** In J-A28.51's Part A, replace "tier 6 never reaching a unit because S10b's fill and `relet` keep
the count within §2.6's capacity" with "tier 6 never reaching a unit because the generation fill (§4.7: S10b's placement,
S11's clamped write and its overflow pass), `relet` and §2.6's re-homing keep the count within §2.6's capacity".

## 6 CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read on disk or executed). The document's sha256 was `1a861c72…` and the rationale's `8a24a5a7…` at the
first read, before and after the resolver run, and at the last read. The following were confirmed:
* the part diff against the pre-repair-r3 archive: 14 hunks, all in the six replaced subsections, the rest of the part
  byte-identical (`vp3/part-diff.txt`);
* every quotation and line number in §2–§5;
* the 32 text probes (`vp3/probes.txt`);
* the resolver's 2 pre-existing external breaks, none in the part (`vp3/refs.json`);
* that every old string quoted in §5 occurs exactly once in its file (`vp3/oldstrings.py`);
* that `DesignationTemplateRow.structures` and `BuildingSlot` carry no residential field, and that §6.3's anchor table
  has no `Frontage` row.

**PLAUSIBLE** (judgment, vetoable):
* the severities (VP3-01 major, because it is an unruled choice on the owner's authority item with a reachable trigger;
  the rest minor);
* the squalid-district trigger of VP3-01;
* the directions of the required changes: re-providing a dossier household's housing inside the district by the
  `dossier` request (VP3-01); a typed `houses` flag and the `required` minimum (VP3-04); a `Frontage` split keyed by
  first kerb vertex (VP3-06); locked households never re-homed (VP3-07).

The owner's words are quoted from `docs/AMENDMENTS-2026-09-25b.md`. No reference code, corpus content or `partitioned/`
file was read or used.
