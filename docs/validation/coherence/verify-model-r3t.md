# verify-model-r3t — lane coherence/verify-model-r3t (base part §2 domain model and schemas, after repair round 3)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/verify-model-r3t; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-model-r3t`, 2026-10-01, cloud checkout)
- P0 brief read whole (incl. ROUND-3 NOTES, ORCHESTRATION NOTES); resume check: no output, no LANDED line — fresh start: done
- P1 inputs: verify-model-r2t + its result (11 findings), adjudication-r3 (R3-01 – R3-08, R3-18, R3-25, Part H · model and
  every VM-R2T disposition), repair-r3-model (4 REPLACE blocks, its judgments and HAND-OFFS), assemble-r3 (base
  4ed292e9… → 593c657d…, the live file's sha256 confirmed): done
- P2 §2 diff pre/post assemble-r3 (7 hunks: §2.6 step 7 ×2, §2.7 ×2, §2.8 ×2, §2.9 ×1), each read in its whole paragraph
  or record; word-level diff of the whole of §2: done
- P3 round-2 findings re-checked against the live text, incl. each END line's second end: done
- P4 round-3 blocks in §2 read whole for new problems; their seams with §4.4, §4.8, §7.3, §7.4, §10.2, V03, V06, V08: done
- P5 doc checks, sizes, report, result file, LANDED: done

## Summary

* **Base:** `docs/ARCHITECTURE.md` sha256 `593c657d34849302…` (assemble-r3's output; design files untouched by this seat).
* **What changed in §2.** 7 hunks, all from repair-r3-model's four REPLACE blocks: §2.6 step 7 (the plan last lived in,
  R3-06's level sentence, R3-05's roofless case, "build Works"), §2.7 (the hold of the band under a crossing station; the
  *Readers* line; support step (3)'s hold and the new step (6)), §2.8 (`ElaborationRecord.inputs`' build Works and the
  stale sentence's decay-run clause), §2.9 (*The crisis framing*). A word-level diff of the whole of §2 shows no other
  change; every removed phrase is either superseded by its ruling's text or restated at its home (the patch order: V06
  §3.7.7 (3), which reads `EpochRecord.inputs.week`, the shape §2.9 declares).
* **R3-06's binding text** is present verbatim in §2.6 step 7 (script check, the roofless sentence aside, which R3-05
  places after the comparison).
* **Round-2 findings:** 11 of 11 closed (7 fixed at model or their owner, 4 closed by the sibling they were merged into);
  every END line's second end written. Other model-routed issues of round 3 (VAF-R2T-01, VEW-r2-01, VRC2T-16, and
  VDC2-07, VRC2T-14 merged) fixed, their ends written.
* **New findings: 10** — 0 blocker, 5 major, 5 minor. Owners: model 4, pipeline 3, V06 1, scope 1, determinism 1.
  The majors: the creation week's new single meaning (R3-18) against `HistoryHint`'s "before the creation week" and V08
  §3.15 (VM-R3T-02); V06's release of the held stretch on "its crossing span `dismantled`" against §2.7's new release
  (VM-R3T-03); support step (6)'s S5a give-way with no walk and no last rung (VM-R3T-04); the give-way untested
  (VM-R3T-05); a locked or pinned raised way under step (6) (VM-R3T-06).
* **Words** (`wc -w` over `## §2 ` to `## §3 `): **60 298 → 60 925 (+627, +1.0 %)**; against the archive (53 256)
  +14.4 %. Growth is the round's defined edges and rulings (the plan last lived in, the decay run's start and ages, the
  roofless case, the band held under a crossing station, the re-run under a later trace, the framing's ring and export
  frame); removals came from restatement only (the patch order, "level ≥ t"). No unit shrank; no NUANCE-LOST audit was
  triggered.
* **doc_checks.py --sections 2:** exit 0 — C1 5/0, C2 1/0, C3 394/0, C4 1/0, S1 0/0, S2 251/0 (hits/unreviewed).
  PROVISIONAL: "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs, research/ftg-docs,
  research/external) — clean-room results are NOT authoritative".
* **Standing rules in §2:** deferral wording 0 ("later" only temporal); phone clauses 0 (item 126 (a2)); review ids
  (`R2-nn`, `R3-nn`, verifier ids) 0 (R3-02).

## 1. Round-2 findings re-checked (ROUND-3 NOTES (2))

| id | owner | disposition (adjudication-r3 Part H) | verdict | evidence (live line numbers) |
|---|---|---|---|---|
| VM-R2T-01 | model | FIX per R3-07 | FIXED | §2.6 step 7 l. 2071–2076 is text (1) whole; §2.8 l. 2856 and l. 2864–2867 are text (2) whole; V03's lifecycle row ("no stale mark, §2.8") now resolves. The repair's one-term change missed two statements of the same input — VM-R3T-01 (minor). |
| VM-R2T-02 | model | FIX per R3-06 (closes VDC2-07, VRC2T-14) | FIXED | R3-06's binding text verbatim at l. 2081–2084 and l. 2093–2103; the comparison "while above 0 (§6.3 *Plan damage*'s one comparison: a level of 0 damages nothing)"; agrees with V06 §3.23 (1)–(4) (l. 3373–3420) and V03 §5.6 (2) (a)–(c). |
| VM-R2T-03 | model | FIX per R3-25 (d) | FIXED | §2.7 support step (3) l. 2546–2553 (widened by the repair's judgment (2): S7's generation row, `dismantle`, a hand op's bend); §2.7's condition paragraph points to it (l. 2497–2498). Ends: V06 §3.7.7 (2) l. 1629–1631; §13.2 T114-3 l. 18277–18279. The release now disagrees with V06 §3.7.2 (2) and §3.7.6 (5) — VM-R3T-03. |
| VM-R2T-04 | pipeline | MERGED into VKr2-05 (graded major) | FIXED | §4.3 l. 5616–5617 ("its two ends are its feet on ground part 0 (`RaisedWayRecord.feet`, §2.7)"); §4.6 l. 6617–6618 in R3-25 (a)'s words ("but a foot at a deck end on the arena's outer ring, which draws neither"). |
| VM-R2T-05 | determinism | MERGED into VKr2-06 | FIXED | §7.1 `drawWay` l. 10154: "its two ends its feet (§2.7's `RaisedWayRecord.feet`)". |
| VM-R2T-06 | pipeline | MERGED into VEW-04 | FIXED | §4.13 EP-22 l. 8869: the hill-town plot within `waterTableM` of a wet moat reads the moat's derived level + `freeboardCm` (agrees with §2.6 l. 1901–1903). |
| VM-R2T-07 | V10 | FIX | FIXED | V10 l. 443 `type Knowledge = { tier: …; places: Id[] }`; l. 1019 `type FindView = { chips: FindChip[]; gaps: boolean }` — both agree with §2.9's keys. |
| VM-R2T-08 | model | FIX | FIXED | §2.9 l. 3420–3424: the default export frame and the export cut named; "Only these framings change"; "each returns". |
| VM-R2T-09 | V09 | FIX per R3-02 | FIXED | V09 §4.21.3 (1) l. 3294–3295 carries no review id; V09's four remaining `R2-nn` sit in J-V9 and BCR rows, which R3-02 keeps. |
| VM-R2T-10 | model | FIX, amended | FIXED | §2.7 *Readers* l. 2514: "volume 6's transitions (V06 §3.7.7 (3), which orders the patches' rebuilding)"; V06 §3.7.7 (3) l. 1636–1638 states generation's epoch 0 first. |
| VM-R2T-11 | V07 | MERGED into VV78-r2-04 | FIXED | V07 §5.5 l. 3328–3331: "saved with the other view keys in the document's `view` section and in view pins (§2.9) — never in its canonical form, a digest, its hash or the log". |

Other model-routed issues of round 3 (not this seat's, re-checked because they rewrote §2):

| id | disposition | verdict | evidence |
|---|---|---|---|
| VAF-R2T-01 | FIX per R3-05 | FIXED | §2.6 step 7 l. 2085–2092 in R3-05's scope ("however V06 §3.23 reads its level, its existence state alone before that level lands (M6-E) included"), the repaired-element count and the nesting; ends: §8.6 l. 13951–13952, V03 §5.6 (2) (c) l. 2703–2712, V02 §5.7 (2) and X34 l. 4174 cite §2.6 step 7. |
| VEW-r2-01 | FIX per R3-25 (c) | FIXED | §2.7 support step (6) l. 2559–2567; ends: §4.4 *Outer moats* l. 5809–5812, §4.8 l. 7562–7568, V06 §3.7.1 l. 1450, §3.7.6 (5) l. 1583–1593, T-V6-47, §13.2 T110-2 l. 18227–18230. Step (6) opens three edges — VM-R3T-04, -05, -06. |
| VRC2T-16 | FIX | FIXED | §2.9 l. 3418–3419 takes in "the ring's massed camp marks beyond it, §8.8's *The surrounding ring*"; §10.2 (g) l. 15581 "The placed camps' and the ring arcs' bounds" (its wording: VM-R3T-10). |
| VDC2-07, VRC2T-14 | MERGED into VM-R2T-02 | CLOSED | the comparison above. |

## 2. New findings

### VM-R3T-01 (minor, TERM; owner model) — "build Works" carried to two of four statements of one input

Repair round 3 renamed the plan rung's Works input "its running build Works' stage" (a `decay` or `repair` Works is none)
at §2.8's `ElaborationRecord.inputs` (l. 2856) and stale list (l. 2864) and at §2.6 step 7's drawing sentence
(l. 2068–2069) — the repair's judgment (1), "one concept, one term". The two other statements of the same input keep the
old term: `BuildingInput.stage` (l. 1489: "its running Works' stage at the drawn week (§4.11), which the plan's drawing
shows") and §2.6 step 1's inputs (l. 1991: "the running Works' stage (item 67)"); read literally they hand volume 3's
`plan()` a `decay` Works' stage as a plan input, which §2.8, step 7 and V03 §3.11 (b) (l. 2009) exclude. "Build Works" is
also defined nowhere against `Works.kind`'s seven values (l. 2425). Minor: V03 §3.11 (b) and §2.8 fix what is built.

**Required change.** §2.6 `BuildingInput.stage`: "item 67: its running build Works' stage at the drawn week (§4.11; a
`decay` or `repair` Works is none, step 7), which the plan's drawing shows (below)"; §2.6 step 1: "the running build
Works' stage (item 67; a `decay` or `repair` Works is none, step 7)"; §2.6 step 7's first use: "A building whose running
build Works — a Works of any kind but `decay` and `repair` (§2.7's `Works.kind`) — stands before FINISHED …".

### VM-R3T-02 (major, CONFLICT; owner model, V08's end) — `HistoryHint` "before the creation week" after R3-18

R3-18 (written at §4.11 *The clock* (1), l. 8330–8334) makes **the creation week** the week of the `generate` event — on a
history-first document the replay's start, `W_p − round(52 × start.yearsAgo)` — and **the present at creation** the
dossier's present week: "one name each, everywhere". §2.7's `HistoryHint.calamities` (l. 2452) still reads
"calamityHistory before the creation week (DR36's losses; DR37's events)", and V08 §3.15 (l. 2318), which writes it, the
same. Under the ruled meaning a history-first document's hint holds only the calamities before the replay's start, yet V06
§3.20.2 maps "each `calamityHistory` entry" into the replay's epochs between the start and the present (one before the
start "is not replayed") and DR37 reads them from `Recipe.history` (item 125: the port is the dossier's only reader). One
builder (the old meaning) replays every calamity; another (the ruled meaning) replays none — a different replayed past
and different scars. `HistoryHint.ageYears`' "the settlement's age at creation" (l. 2444) has the same two readings,
while V06 §3.20.1 (2) reads it as "`history.ageYears` before the present".

**Required change.** §2.7 `HistoryHint.ageYears`: "the settlement's age at the present at creation (§4.11 *The clock*
(1)) — never advanced by §4.11's clock"; `HistoryHint.calamities`: "calamityHistory before the present at creation
(§4.11 *The clock* (1); DR36's losses; DR37's events)"; V08 §3.15 (l. 2318): "`calamities` — `calamityHistory[]`
before the present at creation (§4.11 *The clock* (1)), …" (V08's end).

### VM-R3T-03 (major, CONFLICT; owner V06) — the held stretch's release: "its crossing span `dismantled`"

§2.7's support step (3) (round 3, R3-25 (d); l. 2552–2553) releases the band's stretch under a crossing station "from the
first epoch after the raised way is removed or the spans on both sides of the station have fallen (`ruined` or
`cleared`)". V06 §3.7.2 (2) (l. 1472) and V06 §3.7.6 (5) (l. 1599–1600), with J-V6.114 and J-V6.140 (l. 4421, 4447),
release the same stretch from dismantling "until that raised way is removed or its crossing span `dismantled`": a span has
no `dismantled` state (§2.7's `spans[].state` is `'ruined'|'cleared'`, l. 2290), and since round 2's crossing station no
span crosses the trace — the station carries a span on each side. One builder never releases the stretch, another at one
span's fall, a third at both. The model's round-3 HAND-OFFS named it; V06 did not write it.

**Required change.** V06 §3.7.2 (2) (l. 1472): "until that raised way is removed or the spans on both sides of its
crossing station have fallen (`ruined` or `cleared`; §2.7's support step (3))"; V06 §3.7.6 (5) (l. 1599–1600): "from the
first epoch after that raised way is removed or the spans on both sides of its crossing station have fallen (`ruined` or
`cleared`; §2.7's support step (3))"; J-V6.114's and J-V6.140's "its crossing span `dismantled`": "the spans on both
sides of its crossing station fallen (§2.7's support step (3))".

### VM-R3T-04 (major, EDGE-UNDEFINED; owner pipeline, scope's end) — step (6)'s S5a give-way has no walk and no last rung

§2.7's support step (6) has a trace that would leave a crossing's clear span past `maxClearSpanM` (or a pier past
`maxPierM`) give way, at generation by "S5a: its stage trace takes the next lattice boundary node off that span,
reported" (l. 2564–2565). §4.4 S5a, the home of the stage trace (the model's HAND-OFFS named it), states none of it: which
node is next, in what order, how many are tried, the warning key, or the outcome where none fits. None fits wherever
the ground the outer span must clear is wider than the bound all round the ring: a timber course (`maxClearSpanM` timber
20 m, V11 §3.24.2) crossed by a stage-2 ring with `moat: 'all'` at a c14 or c15 width (8–16 or 10–18 m, V11 §3.19.1)
beyond a 2–5 m berm and the band's half (§4.8) — up to ≈ 24.5 m from the crossing station (the gate tower) to the first
lawful pier, the same at every node. Step (6) forbids dropping the standing raised way and forcing the span, and S5a has
no later epoch to wait for (V06's rung). An undefined outcome on a generation path (CITY and METROPOLIS, item 110's
raised ways, an outer moat).

**Required change.** §4.4 S5a *Outer moats*, after "(S7 lays both, §4.8 *Gates*).": "Where §2.7's support step (6)
finds a crossing of a standing raised way whose clear span would pass `maxClearSpanM` or whose pier would pass `maxPierM`,
S5a moves that crossing to the stage boundary's lattice nodes off that span, nearest first along the boundary (ties to
the lower node index), each tried once, between the gates on either side, reported (`W_RAISED_CROSSING`); where none
fits, the stage's outer strip is not laid under the deck — its glacis line and the moat's channel stop on either side of
the raised way's under-deck strip, the channel ending there against the ground as against a berm (§4.2 S3 (10)) — so the
outer span clears only the band's half and the berm, reported; the raised way and the stage's wall both stand." §2.7's
step (6) cites it ("S5a: §4.4 *Outer moats*'s walk and last rung"); §13.2's T110-2 gains (scope's end) "a CITY c15 town
with `moat: 'all'` whose S4 timber viaduct is crossed by stage 2's ring at the widest moat row: the crossing found by the
walk or the strip stopped at the deck, every clear span within 20 m, no support in water, the viaduct kept, reported".
(The adjudicator may rule another last rung, provided it keeps the raised way, lays no span or pier past its bound and is
stated with its warning.)

### VM-R3T-05 (major, EDGE-UNTESTED; owner scope, V06's end) — step (6)'s give-way untested

No bar exercises step (6)'s giving way. T110-2's step-(6) fixtures (an S4 viaduct crossed by stage 2's moated ring; an
epoch circuit across a standing aqueduct; l. 18227–18230) and T-V6-47 (V06 l. 4114) are crossings that fit. V06's
"retraces by the margin rule … and then **waits** for a later epoch, reported (`walls.waited`)" for a raised-way crossing
that cannot keep its bounds (V06 §3.7.6 (5), l. 1590–1593) and a hand `drawWall`'s bend "to the nearest one whose
crossing fits" (l. 2566–2567) have no fixture (no T-V6 bar names `walls.waited`).

**Required change.** §13.2's T110-2 adds "an epoch circuit across a standing timber elevated road whose crossing cannot
keep its clear spans within `maxClearSpanM`: the circuit retraced by the margin rule, then waiting (`walls.waited`
counted), the raised way's stations and keys unchanged; a hand `drawWall` across it bent to the nearest trace whose
crossing fits, named in one line (item 101 R2)"; V06's T-V6-47 takes the epoch clause on H-AQUA (V06's end).

### VM-R3T-06 (major, EDGE-UNDEFINED; owner model, scope's end) — a locked or pinned raised way under step (6)

Step (6) re-runs (1)–(5) on any standing raised way a trace crosses — "the nearest interior station within p ÷ 2 moved
there, keeping its key, else one added", the stations in the new strips "slid or omitted by (3)" — with no exception for a
locked or pinned raised way, whose deck and piers §7.4's lock column holds (l. 11261: "its deck and piers held") and
which V06's *Protection* (V06 §3.1, l. 976–977: "a locked or pinned entity is never struck, converted or moved") keeps out
of every engine change. An epoch circuit, or a Re-derive's S5a trace, across a locked aqueduct thus has two contradictory
rules — move the held piers, or cross with no station on the trace and piers left in the new strip (against (3)) — and no
third outcome: step (6)'s give-way names only the span and pier bounds. A hand `drawWall` across it meets E-07's lock row,
which step (6) does not cite.

**Required change.** §2.7's support step (6), after "slid or omitted by (3);": "a locked or pinned raised way (its deck
and piers held, §7.4) is never re-sited: where its crossing would need a station moved, added or omitted, the trace gives
way as where a span would pass its bound (S5a's walk, §4.4; V06: it retraces and waits, `walls.waited`), and a hand
`drawWall` across it is E-07's lock conflict (`refuse.locked`, its action `unlock`);"; §13.2's T110-2 gains (scope's end)
"a locked aqueduct crossed by an epoch circuit: no pier moved or added, the circuit retraced or waiting, reported".

### VM-R3T-07 (minor, CONFLICT; owner model) — §2.6 step 7's disaster-look sentence lacks the hand-over

§2.6 step 7 (l. 2104–2106): "A building of a district a disaster look ruins (item 122 (d)) draws the same layer at the
look's level by severity … — a look only." R3-10 makes the look leave building by building (V06 §3.22 (3)'s
`crisisLookYields`: a Works other than a `decay` Works begun on it), a preview never handing over; §10.2 (f) and V03 §5.6
(4) (l. 2722–2727) say so, step 7 still covers every building of the district (and its build-stage sentence, l. 2068–2071,
gives such a building a second drawing). Minor: V03 §5.6 (4), which builds the drawing, states the hand-over.

**Required change.** §2.6 step 7: "A building of a district a disaster look ruins (item 122 (d))" → "A building over
which a disaster look stands (item 122 (d); §10.2 (f): each building of its districts until V06 §3.22 (3)'s
`crisisLookYields` turns true on it, a preview never handing over)".

### VM-R3T-08 (minor, WIRING; owner pipeline) — §4.8 *Condition at generation* does not cite the hold

§2.7's support step (3) (l. 2547–2548) makes S7's generation row read a `breached` draw on the band's stretch under a
crossing station as `worn` while the deck stands; §4.8 *Condition at generation* (l. 7541–7549), the row's home, cites
§2.7 for the welded stretch but not for this exception (the model's HAND-OFFS named it).

**Required change.** §4.8 *Condition at generation*, after "a `patched` run's material from `walls.patchMaterials` by the
enceinte's kind and culture": "— a `breached` draw on the band's stretch under a raised way's crossing station read as
`worn` while its deck stands (§2.7's support step (3)) —".

### VM-R3T-09 (minor, WIRING; owner determinism) — §7.3's S7 row omits step (6)

§7.3's locality row for S7 (l. 10741: `drawWall`, a moved trace vertex …) lists what a wall edit re-derives — the run
between the nearest unaffected towers, the strips' lines, the strip blocks' S10 step (0) — but not the re-run step (6)
makes "in the same commit" on a standing raised way the new run crosses (l. 2559–2562).

**Required change.** §7.3's S7 row, its re-derived column, adds "and §2.7's support step and span rule on each standing
raised way the new run crosses (§2.7's support step (6))".

### VM-R3T-10 (minor, NEW-PROBLEM; owner pipeline) — §10.2 (g) cites "model §2.9"

VRC2T-16's end at §10.2 (g) (l. 15581–15583) keeps "(model §2.9; the limit's stop 0 where nothing fits, §8.8)": "model"
is the coherence pass's unit key, not a design home (R3-02's principle: design text names the design home).

**Required change.** §10.2 (g): "(model §2.9; …" → "(§2.9's *The crisis framing*; …".

## 3. Ids outside the round-3 hunks

Every inventory id outside §2.6 step 7, §2.7's condition paragraph and support step, §2.8's elaboration record and §2.9's
*The crisis framing* keeps its round-2 verdict (ROUND-3 NOTES (5)). The ids inside them (item 123's damage layer, item
114's condition by run, item 110 (b)'s support step and span rule, the elaboration record's inputs and states, item 122
(i)'s framing) are each stated at their home after the round, with the same meaning or the meaning a round-3 ruling gave.

## 4. Result

The structured result is `docs/validation/coherence/results/coherence_verify-model-r3t.json`.
