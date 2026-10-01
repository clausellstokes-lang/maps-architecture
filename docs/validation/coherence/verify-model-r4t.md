# verify-model-r4t — lane coherence/verify-model-r4t (base part §2 domain model, after repair round 4 / assemble-r4)

PROGRESS
- P0 brief read whole (incl. ROUND-4 NOTES, ORCHESTRATION NOTES); adjudication-r4 R4-01 – R4-04, R4-07 – R4-09 and Part H
  (model, pipeline, determinism, scope, V06) read whole; repair-r4-model.md header read whole: done
- P1 §2 diff pre/post assemble-r4 (base 593c657d… at 247b290 → live 5f34cceb…, 13 hunks) read whole: done
- P2 round-3 findings VM-R3T-01 – 10 re-checked against the live text, each END line's second end: done (10/10 closed)
- P3 round-4 §2 hunks re-checked whole paragraph by paragraph for new problems (R4-09's binding text clause by clause,
  the judgment calls, cross-unit agreement): done (6 new findings)
- P4 checks (doc_checks --sections 2, references, ids, sizes), report, result file, LANDED: done

## 0. Basis

* Live base `docs/ARCHITECTURE.md` sha256 `5f34cceb61432ac4…` = assemble-r4's recorded output (assemble-r4.md §1); the
  pre-round base is commit `247b290`'s blob, sha256 `593c657d34849302…` (assemble-r3's output). Rationale
  `a480f02e58a893fe…`. Design files untouched by this seat.
* Binding: adjudication-r4.md (R4-01 – R4-16; Part H · model and the END lines of every heading naming a §2 text); the
  earlier adjudication files where not superseded by name. Round-3 findings: verify-model-r3t.md /
  results/coherence_verify-model-r3t.json. The repair: repair-r4-model.md (3 REPLACE blocks §2.6, §2.7, §2.9; 12 fixed,
  2 merged; judgments (1)–(8); HAND-OFFS).
* §2 diff (scratch `vm4/d2.diff`): 13 hunks — §2.6 `BuildingInput.stage` (l. 1489), step 1 (l. 1991–1994), step 7
  (l. 2069–2072, 2099–2111); §2.7 `supports[].state` (l. 2288), `RaisedFoot` (l. 2305–2307, 2310–2312), `HistoryHint`
  head, `ageYears`, `population`, `calamities` (l. 2449–2458), the support step (3) and (6) (l. 2546–2615); §2.9
  `Recipe.history` (l. 3102), *View state* (l. 3366–3397). No other §2 line moved.

## 1. Round-3 findings re-checked (ROUND-4 NOTES (2))

| id | r3 grade | Part H disposition | verdict | where (live) |
|---|---|---|---|---|
| VM-R3T-01 | minor | FIX | **FIXED** as required: `BuildingInput.stage` "its running build Works' stage at the drawn week (§4.11; a `decay` or `repair` Works is none, step 7)", step 1 the same, step 7's first use defines build Works against `Works.kind`. Agrees with §8.6 (l. 14061–14063) and V03 l. 2009, 2452–2454 (every kind but `decay` and `repair` draws the plan in progress; `WorksStage` carries every kind's stages, l. 8844–8845) | §2.6 l. 1489, 1991–1994, 2069–2072 |
| VM-R3T-02 | major | MERGED into VAT3-r3-02 (R4-07) | **CLOSED**: `ageYears` "at the present at creation (§4.11 *The clock* (1))", `calamities` "up to and including the present at creation … every calamity the creation carries"; the hint's head, `population`'s tick and `Recipe.history` swept to the same bound. Second ends: V08 §3.15 (2) (l. 2343) and T-V8-51's latest-tick calamity clause (l. 3281) written; "the present at creation" defined at §4.11 *The clock* (1) | §2.7 l. 2449–2458; §2.9 l. 3102 |
| VM-R3T-03 | major | FIX (V06) | **FIXED**: V06 §3.7.2 (2) (l. 1483–1485) and §3.7.6 (5) (l. 1611–1612) release the stretch "from the first epoch after that raised way is removed or the spans on both sides of its crossing station have fallen (`ruined` or `cleared`; §2.7's support step (3))"; J-V6.114 and J-V6.140 read so; no "crossing span `dismantled`" left in the set | V06 |
| VM-R3T-04 | major | FIX per R4-09, amended (pipeline) | **FIXED** per R4-09: §4.4 S5a *Outer moats* — the carve re-sites a support by (6) (a), and where spans or piers cannot keep their bounds or the berm or channel would meet a ramp, stair or foot, the berm and channel stop at the under-deck strip's edges (`W_RAISED_CROSSING`); after generation or across a held raised way, through a deck-level station by (6) (b). No walk of boundary nodes remains | §4.4 l. 5875–5881 |
| VM-R3T-05 | major | FIX per R4-09, amended (scope) | **FIXED** per R4-09: T110-2 fixtures (1)–(5) written (l. 18408–18420); T-V6-47 takes the epoch clauses (V06 l. 4155). The waiting and span-bending clauses the r3 change asked for are superseded (R4-09) | §13.2 |
| VM-R3T-06 | major | FIX per R4-09, amended | **FIXED**: (6) (b)'s lock clause ("a locked or pinned raised way is crossed as an unlocked one is (§7.4's lock column; T110-2)"; judgment (8)'s rewording keeps the meaning); the Re-derive case written in (6) (a) (judgment (3)). Second end: §7.4's lock column (l. 11365) "(a later trace's crossing station taking the band's stretch, §2.7's support step (6) (b))"; fixture T110-2 (4) | §2.7 l. 2591–2594, 2612–2615 |
| VM-R3T-07 | minor → **major** | FIX per R4-04 | **FIXED**: step 7 reads R4-04's text verbatim ("A building a disaster look stands over (item 122 (d); §10.2 (d)'s `neighbourhoods` and (f): … until V06 §3.22 (3)'s `crisisLookYields` turns true on it, a preview never handing over)"); agrees with V06 §3.22 (3) (l. 3385–3392) | §2.6 l. 2107–2111 |
| VM-R3T-08 | minor | FIX (pipeline) | **FIXED**: §4.8 *Condition at generation* reads "a `breached` draw on the band's stretch under a raised way's crossing station read as `worn` while its deck stands (§2.7's support step (3))" | §4.8 l. 7623–7625 |
| VM-R3T-09 | minor | MERGED into VDC3-07 | **CLOSED**: §7.3's S7 row adds "on each standing raised way the new run crosses, the run bent through its nearest station on the deck at its level and its strips stopped under the deck … — that raised way's crossing station in the effective scope and the fate report (§7.3 item 4), nothing else of it re-derived" | §7.3 l. 10845 |
| VM-R3T-10 | minor | FIX (pipeline) | **FIXED**: §10.2 (g) cites "§2.9's *The crisis framing*", a heading that resolves (l. 3466) | §10.2 l. 15721 |

The END line under Part H · model (END of VV56-r2-06, R4-03) is written verbatim at step 7 (l. 2099–2101) and agrees
with V06 §3.23 (3) (l. 3437–3444). The other model dispositions of Part H were checked as text in §2: VAL-R3-02's
palisade clause (3) and (6) (b) (iv) (agree with V07 §3.5a (4), l. 1597–1602, and the edge row `wall`, l. 8981);
VAT3-r3-08's replay clause (agrees with V06 §3.23 (4), l. 3450–3456); VEW-r3-02 – 05 in (6) (a)–(b) (ends at §4.3
*The slot* l. 5699–5702, the §4.1 stage table's S7 row l. 4932, §4.8's lead l. 7591–7594 and *Gates* l. 7643–7645, §4.11's
carve l. 8212, V05 §3.16 l. 1342 and 1353, V06 §3.19.2 (3)–(5) l. 2919–2944, the item-114 group l. 18468–18472);
VKr3-04's `RaisedFoot` (agrees with §3.2 (9)'s foot batch, l. 3659–3668); VRC3T-02's §2.9 sentence (judgment (7)'s
"(above)" is right: `workingLayer` stands in the list before it). All present.

## 2. R4-09's binding text against the live (6)

A word-level comparison of R4-09's "(6) …" (adjudication-r4 l. 409–447) with the live (6) (l. 2575–2615; scratch
`vm4/r409diff.txt`) finds every clause of the ruling present; the 13 differences are exactly the model's judgments
(1)–(5), (8) (the berm or channel at the S5a commit and the setbacks and glacis at the run after S7; the ramp-or-stair bend;
the generation-time lock clause; "its span rule then running at its eager time" and the report code; "written in the
trace's commit and restored by its undo"; "a moved trace vertex"; "as an unlocked one is") and the casing of the
sub-item lead. Each keeps the ruling's meaning. Two of them open the edges in §3 below (VM-R4T-02) and one sentence of the
ruling itself carries a wording slip (VM-R4T-05).

## 3. New findings (round 4)

### VM-R4T-01 — major — EDGE-UNDEFINED — owner model

**Claim.** §2.7's support step (6) (a) (R4-09's text, l. 2586–2591) runs the support step once more after S7's batches
"with every obstacle then standing (S5b's and S5c's ways; S7's strips, gate plazas, castle paths, quays, piers and
moles)", and "a station this run can neither slide nor omit within `maxClearSpanM` and `maxPierM` keeps the place the
earlier run gave it, and the S7 part it meets gives way in that batch — a strip, plaza or square cut round its ring, a
quay, pier, mole or castle path ending at the ring and resuming beyond it". The failure rung names S7's parts only.
Where what such a station meets is a part-0 way — an S5b main road or an S5c street laid across an S4 or S5b viaduct at
generation, which §4.3 *Lattice and costs* (l. 5629–5632) lets cross the strip wherever the soffit clears ("and the
support step's last run (*The slot*, below) slides the supports off it ((6) (a))"), or S7's intervallum lane — nothing
gives way: the station keeps its place in the way's corridor, a pier standing in a street, the impossible result R4-09
removes after generation (VEW-r3-01's class); §4.3 states the slide as always succeeding. It is reachable: masonry
`pierSpacingM` is 8–15 m against `maxClearSpanM` 30 m (V11 §3.24.2), so a METROPOLIS `through` or `primary` way crossing
a viaduct obliquely occupies 30 m or more of deck and the two stations in it can neither slide within `slideMaxFactor`
nor be omitted (the merged span passes 30 m); at generation no squareness bound applies (§4.3 applies `squareDeg` only
under a ruled span). T110-2 (3)'s list (setback, glacis, berm, moat, gate plaza, quay, pier, mole) bars no way corridor,
so no test catches it.

**Required change.** §2.7's support step (6) (a), after "… a quay, pier, mole or castle path ending at the ring and
resuming beyond it — reported (`W_RAISED_CROSSING`).": "Where such a station meets a part-0 way's corridor — an S5b or
S5c way, or S7's intervallum lane — that way's crossing of the under-deck strip moves in that batch along the strip to
the nearest place whose corridor clears every station, by §4.3's crossing shift (its vertices moved on ground part 0,
the faces beside it following), reported (`W_RAISED_CROSSING`), so no pier stands in a way's corridor." §4.3 *Lattice
and costs* (pipeline's end): "… slides the supports off it ((6) (a))" → "… slides the supports off it, or, where a
support can neither slide nor be omitted within its bounds, moves the way's crossing clear of it ((6) (a))". §13.2's
T110-2 (3) (scope's end): its list adds "a way's corridor", with a METROPOLIS fixture whose S4 masonry viaduct a
`through` way crosses obliquely over two stations: the way's crossing moved clear, reported, 0 piers in a way's
corridor. (The adjudicator may rule another last rung — e.g. S5b's and S5c's ways keeping off the support rings at
generation as after it, so the earlier run's place is always lawful — provided no pier stands in a way's corridor, no
span or pier passes its bound and no course is dropped.)

### VM-R4T-02 — major — EDGE-UNTESTED — owner scope

**Claim.** §2.7's support step (6) (a) (l. 2591–2594; the model's judgment (3)) makes a locked or pinned raised way at a
Re-derive "crossed at generation as a standing one ((b)), and the run after S7 moves none of its stations, every S7 part
one meets giving way"; §4.3 (l. 5624–5626: impassable "at generation where the raised way is locked or pinned") and
§4.4 S5a *Outer moats* (l. 5878–5879: "across a locked or pinned raised way, the trace passes through its station") state
the same branch. No bar exercises it: T110-2 (4) locks the raised way only for an epoch circuit and a hand `drawWall`
(l. 18413–18418), T-V6-47 likewise; no fixture regenerates a stage trace across a locked raised way (the model's
round-4 HAND-OFFS name it).

**Required change.** §13.2's T110-2 adds "(6) a Re-derive from S4 of (1)'s c15 fixture with its S4 timber viaduct
locked: stage 2's ring through one station on the deck at its level, the trace bent to it; no station moved, added or
omitted and no key minted; the berm and channel passing under the deck only under `open` spans with no support, ramp,
stair or foot in them, stopped at the under-deck strip's edges elsewhere (`W_RAISED_CROSSING`); after the last support
run every S7 part a station meets cut round its ring or ended at it; 0 S5b or S5c way corridors over a support ring,
ramp, stair or foot".

### VM-R4T-03 — minor — WIRING — owner pipeline

**Claim.** §2.7's support step (6) (a) (l. 2582–2586) rules that where an S5a crossing cannot keep its bounds, or the
berm or channel would meet a ramp, stair or foot, "the stage's berm and channel — and S7's setback and glacis after them
— are not laid under the deck: they stop at the edges of the under-deck strip … and the strip lines closed along it".
§4.4 S5a *Outer moats* states the berm-and-channel half; §4.8 *Wall strips, band, setbacks, intervallum* (l. 7595ff),
which lays the setback and glacis lines, neither states the S7 half nor cites (6) (a) for it (§4.8's lead cites (6) (a)
only for the last support run). Nothing built changes while §2.7 is read.

**Required change.** §4.8 *Wall strips, band, setbacks, intervallum*, after the sentence defining the outer strip
("Outside: the band's half plus the outer setback and glacis …"): "Where S5a stopped the stage's berm and channel at a
raised way's under-deck strip (§2.7's support step (6) (a)), the setback and glacis lines stop there too, closed along
the strip's edges, reported (`W_RAISED_CROSSING`)."

### VM-R4T-04 — minor — WIRING — owner determinism

**Claim.** §5.4's `GenerationReport.stages[].warnings` comment (l. 9253) lists the stages' own non-kernel warning codes
(S3's `W_WALLED_BY_BARRIERS` and `W_MOAT_DRY`, S10b's `W_DOSSIER_EDGE`, the underground's) but not `W_RAISED_CROSSING`,
which §2.7's support step (6) (a) and §4.4 S5a *Outer moats* now issue at S5a and at S7's last support run (named in
the model's round-4 HAND-OFFS).

**Required change.** The comment adds "S5a's and S7's `W_RAISED_CROSSING` (§2.7's support step (6) (a); §4.4 *Outer
moats*)".

### VM-R4T-05 — minor — NEW-PROBLEM — owner model

**Claim.** §2.7's support step (6) (b) (l. 2596–2598, R4-09's text): "only an op that names the raised way changes it
(its edits, V06 §3.19's ops, a landfall, a frame growth's extension of its deck, §3.2 (9)), and none drops it". Read as
written, "none" covers "its edits", yet a hand delete of a raised way drops it (§7.1 *Delete*; §7.4's row, l. 11365:
"a removed generated one stays removed"; §2.7 *Source and lifecycle*: "a removal of a generated way is a suppression").
The meaning R4-09 states ("everything laid later gives way to it") is that nothing laid later drops it; the rows that
build the delete are explicit, so nothing built changes.

**Required change.** §2.7's support step (6) (b): "and none drops it" → "and no later work drops it".

### VM-R4T-06 — minor — NEW-PROBLEM — owner pipeline

**Claim.** §4.3 *Lattice and costs* (l. 5629–5632) gives the generation regime "At generation, before the span rule has
run" (a later stage's way crosses an unlocked raised way's strip wherever the soffit clears), but §2.7's support step
(6) (a) (l. 2577) runs the span rule on an S4 or S5b viaduct at a stage's S5a commit ("re-run (1)–(5), and then the span
rule, on it in the same commit"), before that stage's S5c grows. Read literally, a stage-2 street crossing such a
viaduct is no longer "before the span rule has run", and §4.3 states no regime for a ruled span at generation (its
open-span rule applies "once generation has ended" or to a held raised way). §2.7's span rule has one eager time ("at
the end of the raised way's generation (after §4.6's cut)", l. 2620), which (6) (a)'s last run cites.

**Required change.** §4.3: "At generation, before the span rule has run," → "At generation, until the span rule's eager
run (after §4.6's cut, §2.7's span rule; a run at an S5a commit, §2.7's support step (6) (a), does not end it),".

### Considered and not raised

* Step 7's build Works now covers `extend`, `demolish`, `clear` and `convert`: it agrees with its drawing homes (§8.6
  l. 14059–14063: every Works but `decay` and `repair` draws the plan in progress, from the parts the mutation steps have
  reached; V03 l. 2452–2454), and `WorksStage` holds every kind's stages (l. 8844–8845).
* A trace across a one-span raised way after generation (no interior station for (6) (b) (iii)): the hand case falls to
  item 101 R2's nearest lawful declaration, V06's to its cost field, where the supports, ramps and feet are impassable
  (V06 §3.7.6 (5)); defined.
* The `repairRaised` beside a station whose stretch is `dismantled` (judgment (6)): §2.7 (3) and V06 §3.19.2 (5) state one
  rule (the stretch re-drawn on its line by `repairWall`'s bend, V06 §2.8); V06 §3.7.5's "a `dismantled` run is not
  rebuilt" is the renewed-threat repair of a ring, another case.
* A village palisade over a ramp: V07 §3.5a (4) passes the palisade beneath every span (the ramps lie between the feet,
  inside the deck's spans); defined there.

## 4. Checks

* `doc_checks.py --sections 2` on the live base: exit 0 — C1 5/0, C2 1/0, C3 393/0 unreviewed, C4 1/0, S1 0/0, S2 272/0
  (every § pointer resolves); on the pre-round base: C3 394/0, S2 251/0. **PROVISIONAL**: the tool warns the reference
  corpus is INCOMPLETE in this checkout (captures, research/patreon, research/devlogs, research/ftg-docs,
  research/external absent), so the clean-room result is not authoritative until re-run on the machine that holds it.
* Volume homes the new §2 text cites resolve: V05 §3.16; V06 §2.8, §3.7.6 (5), §3.7.7 (2)–(3), §3.19.2 (3)–(5), §3.22 (3),
  §3.23 (3)–(4); V07 §3.5a (4), §5.6 (3) (`villageUnitPlots`, `villageDisasterUnits`); V08 §3.15.
* Superseded wording swept: no "next lattice boundary node", "retraces and waits", "crossing span `dismantled`", "re-sites
  them" or bare "support step (6)" left in the base or the volumes; every citation names (6) (a) or (6) (b) or both.
* Ids: no new T-, D- or J- id in §2; `W_RAISED_CROSSING` new (VM-R4T-04); `bend.wall.raisedCrossing`,
  `bend.raised.underSpan` registered in §7.1 (l. 10593–10594) and T110-2.
* No review id and no deferral wording in the added text; every "later" is temporal.
* Size: §2 60 925 → 62 011 words (+1 086, +1.8 %; §2.6 +106, §2.7 +954, §2.9 +40; whitespace-split count) — all from
  R4-09's binding text, the crossing station's support reading and repair, R4-04's predicate and R4-07's bound; a repair
  round adds no shrink of its own.

## 5. Summary

Ten round-3 findings: all closed (seven fixed, two merged and closed by their target's fix, one fixed in V06), every END
line's second end written. Six new findings — 0 blocker, 2 major (VM-R4T-01 the last support run's give-way for a way
corridor, VM-R4T-02 the generation-time lock clause untested), 4 minor; owners model 2, pipeline 2, scope 1,
determinism 1.
