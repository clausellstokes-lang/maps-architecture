# Repair round 7x — V06 (evolution) — lane coherence/repair-V06-r7x

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-V06-r7x; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/repair-V06-r7x`, 2026-10-02)
- [x] P0 brief read whole (FAMILY FIX PASS NOTES and ORCHESTRATION NOTES included); resume check: no output, no LANDED
  line: fresh start
- [x] P1 adjudication-r7x read (head, decision table, root-cause ruling F1 – F5, Part H · V06 V6-1 – V6-7, builders'
  choices, held list); no other unit's entry asks an END of V06
- [x] P2 issue sources (famverify-epochs-r7w VF7w-EPO-01 – -04) read whole; live V06 (sha256 f829ee6a…cfe567f187c1,
  710 871 bytes, 4 676 lines) §3.7, §3.17, §3.19's lead and (1)–(8), ## 7's founding row, T-V6-47 and T-V6-73 read
  whole; every quoted old text of V6-1 – V6-7 located once by its words; base §2.7's terms and laws 1–2 read
- [x] P3 blocks built (scratch `r7xV06/build.py`: 11 count-asserted edits over 4 sections, each old text found exactly
  once in the whole file before any edit; an edited prose item re-wrapped at 120 columns from the edit's first line
  until its words re-join the live line breaks or the item ends; table rows edited in line)
- [x] P4 checks (apply-blocks dry run on a copy: 4 applied, audit clean, output byte-identical to the build; the
  whitespace-normalised live text with the 11 old → new pairs applied equals the new text; widths, code spans, list
  markers; review-id, deferral and reference scans; doc_checks on the live and the new copy)
- [x] P5 report, result JSON, LANDED

## Summary

* **Blocks:** 4 `REPLACE` blocks on `docs/volumes/V06-evolution.md`: §3.7, §3.17, §3.19 and ## 7. V06 has no `####`
  headings and ## 7 has no `###`, so each block is the whole section. Every line outside the edited items is verbatim.
  No retitle, no insert, no append. **Ruling requests: 0.**
* **Live file** (assemble-r7w's output): sha256 f829ee6a91265e76b508310705167c8a27eb05a1a96cd2394401cfe567f187c1,
  710 871 bytes, 4 676 lines. **After the blocks:** sha256
  58f0fb64092942c2a93f9881486ea67e9640d6e4fab76b101b5ca9ef8872baeb, 710 168 bytes, 4 666 lines.
  * `docs/validation/amendments-c/apply-blocks.py` was dry-run on a copy: 5 headers found, 4 applied. The `=== FILE` line
    is reported malformed by that base-only applier, as expected.
  * Audit not OK: 0. Headings 65 → 65. Fences balanced (28 → 28). Output byte-identical to the build.
* **Binding rulings applied:** adjudication-r7x.md Part H · V06 (V6-1 – V6-7), each in its exact words. Where they
  differ from a finding's required change, the adjudicator's words govern:
  * VF7w-EPO-01's "an anchor in none" / "an anchor with its tower always" is carried by the citations' law 1 (4) (V6-1,
    V6-2 (1), V6-4 (1)), the root-cause ruling's form F1/F5.
  * VF7w-EPO-02's sentence names no list of what has no lawful meeting: "§2.7's laws give no lawful meeting" (V6-2 (2),
    V6-3).
  * Also applied: the root-cause ruling's forms F1 – F5 and its head (no review id in design text; "§2.7's laws, law n;
    its worked example …"). Every earlier adjudication stands; nothing here supersedes one.
* **Owner rules:** J144 – J151 hold. J150: no text on a lock's behaviour under undo, redo, a re-grade or a repair, nor
  on the two-axis lock's readers outside the family. Held note 1 (what a waiting circuit does to its stage) gets no
  text: V6-2's note keeps §3.7.1's unwalled stage. No reading of the owner's words is marked as the owner's.
* **Size:** V06 116 420 → 116 276 words (−144, −0.12 %; whitespace-split count over the whole file).
  * By section: §3.7 3 878 → 3 776 (−102); §3.17 568 → 590 (+22); §3.19 6 737 → 6 668 (−69); ## 7 15 082 → 15 087 (+5).
  * Removed: 217 words, all RESTATEMENT. Law 1's exclusions and law 2's order, restated in §3.7.1's `t_k` rule, §3.7.6
    (5)'s two bullets, §3.19 (5)'s fixed places and its meeting sentence and T-V6-47's bar, now cite the laws (principle
    (1)).
  * Added: 73 words, the content the rulings write: law 2 (c)'s epoch wait in §3.7.1 and §3.17 (3), the citation
    forms, the ring in §7's row, the "V06" prefix and the *ends* term.
  * The pass is a repair, not a shrink pass. Its net is below the band because the changes are few.
* **doc_checks** (`docs/validation/bench/doc_checks.py --doc`, on the live file and the new copy): the result is
  provisional. It printed the warning "reference corpus INCOMPLETE (missing: captures, research/patreon,
  research/devlogs, research/ftg-docs, research/external) - clean-room results are NOT authoritative".
  * C1 0, C2 0, C4 0 and S1 0 on both.
  * C3 hits 297 → 300; unreviewed 271 → 275. The new runs are the numerals of the new citations: "law 1 2 6 9" three
    times, from "law 1 (2)–(6), (9)–(11)", and "3 7 6 5 3 7 2 the", from V6-2 (2)'s "V06 §3.7.6 (5))." running into
    "**3.7.2 The". None is an identifier, list or colour.
  * S2 hits 754 → 754; unreviewed 688 → 688 (line numbers shifted only).
* **Whitespace:** one stray double space in §3.19 (5) ("(law 1 (5));  a road deck") lay inside V6-4 (2)'s replaced span
  and is gone. Inner double spaces outside the blocks: 22, unchanged. No new prose line exceeds 120 characters.

## ISSUES → WHERE FIXED

* **VF7w-EPO-01** (minor; FIX, V6-1, V6-2 (1), V6-4 (1)).
  * **§3.7.1's `t_k` rule:** "a standing raised way's under-deck strip, supports and ends excepted where the trace meets
    it as §2.7's laws admit, and only so, the trace and its fixed places taking only shapes those laws admit (law 1
    (2)–(6), (9)–(11), read with their terms; law 2 (a); its worked examples the crossing table's *beneath* and the
    fixed-place sentence) —".
  * **§3.7.6 (5)'s first bullet:** "and V06 §3.7.4 (2)'s cost field searches only the shapes §2.7's laws admit, its line
    read with the band and wall strips it carries there (law 1 (2)–(6), (9)–(11) and law 2 *Carried way*, read with
    their terms; law 2 (a); as §4.4 S5a *Trace* (2)'s pull does), none demolished for a wall;". This is the root cause's
    cost field; it also closes VF7w-TBL-02's widening at this site.
  * **§3.7.6 (5)'s second bullet:** "the trace, its gates, posterns and towers and its fixed places meet it by §2.7's
    laws, each taking only a shape those laws admit (law 1 (1)–(6), (9)–(11), read with their terms; law 2 (a), a
    stretch laid through no cost field with law 3, its worked example the bent-group sentence; a fixed place's, its
    worked example the fixed-place sentence; their worked example the crossing table's *beneath*); the moat".
  * **§3.19 (5)'s fixed places:** "and each fixed place of a standing curtain, with its footprint, to the course's strip,
    zone and ends wherever §2.7's laws bar it there (law 1 (4)–(6), read with their terms; its worked example the
    fixed-place sentence),".
  * In each, an anchor is law 1 (4)'s: it ends its line, so it lies in no strip.
  * The ENDs at pipeline (P3, §4.3 *Where it may not go*), model (M1, *over the band*) and scope (S9 (d), T110-2 (3))
    are those units'.
* **VF7w-EPO-02** (minor; FIX, V6-2 (2), V6-3).
  * **§3.7.1's F-WALL sentence:** "… the circuit re-evaluated at the next growth (reported) — one §2.7's laws give no
    lawful meeting with a standing raised way taking no rung of that ladder and counted `walls.waited` (§2.7's laws, law
    2 (c); V06 §2.10; V06 §3.7.6 (5))."
  * **§3.17 (3):** "a circuit whose trace fails leaves the stage unwalled (V06 §3.7.1; one §2.7's laws give no lawful
    meeting with a standing raised way counted `walls.waited`, never taking F-WALL's raised-way rung: law 2 (c))".
  * The ENDs at determinism (D5, §5.2's F-WALL ladder cell) and pipeline (P2, S5a's pin rule) are those units'.
* **VF7w-EPO-03** (minor; FIX, V6-5). **## 7, the T110-2 founding row:** "; and the foundings across a ring and a
  retaining wall drawn by hand and placement-locked, (2)'s epoch route …". The row now names the same take-overs as
  T-V6-73's head and the base's runs sentence and take-over row.
* **VF7w-EPO-04** (minor; FIX, V6-6). **T-V6-73:** "V06 §3.1, V06 §3.2, V06 §3.7.5". The base's half, T110-2 (1), is
  scope's S3.

## CLASS ENTRIES WRITTEN (the root-cause sweep's V06 sites, Part H · V06)

* **V6-2 (1)** — §3.7.1's `t_k` rule (above; it also closes VF7w-EPO-01's site there).
* **V6-4 (2)** — **§3.19 (5)'s meeting sentence:** "— by §2.7's laws, nothing of either written, its course searching
  only the courses those laws admit against every standing curtain (law 1 (2)–(6), (9)–(11), read with their terms; law
  2 (a)): an aqueduct *over the band* (J-V6.140), crossing each curtain at its own level in the form that level gives
  (law 1 (2)); a road deck *down before the wall* (law 1 (3) with law 2 (a)), founded with its two ends fixed; a
  candidate with no such course — a road deck's among them wherever its course would cross a standing curtain — not
  founded: it waits, `raised.waited` (law 2 (c))."
  * The old "clear of the curtain's gates, posterns and towers but where its arches clear one" would make a founding
    wait where a lawful course exists: a standing gate in an over crossing's strip margin, under no span.
  * The shape-locked curtain never merged into stays covered by the citation's law 1 (10).
* **V6-7** — **T-V6-47:** "no raised way's ends under the wall's line, band or wall strips (law 1 (4); §2.7's laws'
  *ends*)," and the bar "0 trace lines, bands or wall strips over a raised way's ends (law 1 (4))".

## ISSUES ROUTED HERE AND NOT WRITTEN

None. All four routed issues are FIX with a V06 part, and each is written above. No issue routed to V06 is MERGED,
INVALID or a VALID CHOICE. The builders' choices list is empty for this pass.

## CONFORMED BEYOND THE LINES (R7-01 (2)'s sweep)

None needed. The sweep grepped the new copy for "ramps, stairs and feet" / "ramp, stair or foot", "but where its arches
clear", "save under an arch", "clear of the strip", "but in an over crossing", "but where law 1 (5) admits",
"fixed-place zone", "an anchor", "no gate, postern or tower", "widened", "impassable", "kept clear", "law 2 (b)" and
F-WALL's rung. These sites are left as they stand:
* **§3.19 (5)'s base impassables** ("enceinte towers and gates … are **impassable** to the course's supports, ramps,
  stairs and feet and to its clearing ((7))"). This is the raised way's own course solver keeping its own parts off
  standing Tier-1 footprints and held things. It restates no law-1 exclusion of a wall's line and no exception; the
  meeting sentence after it now cites the laws.
* **T-V6-47's law-1 (5) clauses** ("no gate, postern or tower in the under-deck strip but in an over crossing whose
  spans clear it (law 1 (5))" and the bar's "but in an aqueduct's over crossing whose spans clear them (§2.7's laws,
  law 1 (5))"). Both are fixture outcomes in law 1 (5)'s own terms (the over crossing, not "under an arch"), and they
  cover the margin the laws admit. The adjudicator's sweep named only the ends clauses of this bar (V6-7).
* **T-V6-47's moat and way-corridor clauses** ("no support, ramp, stair, foot or `vault` span's strip"; "0 way corridors
  over a standing support's ring, ramp, stair, foot or the strip of a `vault` span"). These are the support step's
  reservation (§2.7's support step (6)'s lead, in its own words) read by law 1 (1), (8), not law 1 (4)'s wall-line
  exclusion.
* **§2.10's `raised.waited` definition, §3.7.6 (3)'s chain bullet, §3.19 (2)'s citadel anchor and T-V6-73's
  water-gate clause.** Each already cites the laws in F1/F5 words ("no course keeps lawful", "where §2.7's laws, law 1
  (5) and (6), admit them", "law 1 (4), (6); law 2 (a)", "law 1 (6) with law 2").
* **§3.17 (9)'s road-deck wait.** It is a failure list citing law 1 (3) and law 2 (c), and it agrees with V6-4 (2)'s
  new sentence.

## HAND-OFFS (each written by its own unit under adjudication-r7x)

* **pipeline:**
  * P3, §4.3 *Where it may not go*: VF7w-EPO-01's END, the solver §3.19 (5) calls.
  * P2, §4.4 S5a *Trace* (2)'s pin rule: VF7w-EPO-02's END; law 2 (c) on its path.
  * P1, S5a's list, which V6-1's first bullet names as "§4.4 S5a *Trace* (2)'s pull".
* **model:**
  * M1, *over the band*: VF7w-EPO-01's END.
  * M4, *beneath*'s list, which V6-1's and V6-2's citations name as the worked example.
* **scope:**
  * S9 (d), T110-2 (3): VF7w-EPO-01's END.
  * S3, T110-2 (1)'s "V06 §3.1, V06 §3.2, V06 §3.7.5": VF7w-EPO-04's base half, in the same words as V6-6.
* **determinism:** D5, §5.2's F-WALL ladder cell: VF7w-EPO-02's END, in the same terms as V6-2 (2) and V6-3: at an
  epoch no rung, the wait counted `walls.waited`.

## RULING REQUESTS

None.

## BLOCKS

=== FILE docs/volumes/V06-evolution.md ===
=== REPLACE ### 3.7 Fortification — new circuits, old rings, shorter rings ===
### 3.7 Fortification — new circuits, old rings, shorter rings

**3.7.1 A new circuit, and the suburbs absorbed.** Evaluated once, when the growth phase grows a stage — on a
dossier-bound document only when the dossier gate admits one (V06 §3.7.6 (4)). All must hold: `threat ≥ walls.threatMin`
(the slice's; DR2 for a dossier); the share of households outside the outermost enceinte — the new stage's counted —
`≥ walls.extramuralShareMin`; the town's household-weighted mean prosperity `≥ walls.prosperityMin` (walls cost money);
the youngest enceinte's creation (its lifecycle's `since`, read to a week through its `EpochRecord`) at least
`walls.minIntervalYears` ago, or no enceinte at all; and the era row admits walls (S0's walls toggle rows, §4.2). Then the
circuit fires when `u < 1 − (1 − walls.chancePerYear × eraFactor)^years`, `u` the first draw on
`stream(EVO_GROWTH, town root)`. The circuit's creation event records the four conditions' values as its why rows
(`detail.why`: `walls.threatMin` with the threat, the extramural share, the prosperity mean, the years since the youngest
enceinte), which the `enceinte` provider reads (V06 §4.5).
A circuit makes the new stage a walled ring with `placement: 'aroundAll'` — it encloses every earlier stage **on its
approachable arcs** (item 106 (a): barrier arcs close the circuit and are not walled, V06 §3.7.6 (1)), so the suburbs
between the old outermost ring and the new one are **absorbed** (S5a's trace by the registered `EnceinteStrategy`, S7's
furniture). The stage's land is widened, **on the arcs the trace walls only**, so that the new ring's inner strip lies
wholly on new land: `t_k` (§4.4 S5a) is raised on those arcs until the lattice distance from every existing footprint to
the boundary is at least the strip's width + `growth.ringBlockM` (one block depth), a standing raised way's under-deck
strip, supports and ends excepted where the trace meets it as §2.7's laws admit, and only so, the trace and its fixed
places taking only shapes those laws admit (law 1 (2)–(6), (9)–(11), read with their terms; law 2 (a); its worked
examples the crossing table's *beneath* and the fixed-place sentence) — the built-face legality then never binds on the
trace; barrier arcs keep the stage's own boundary, so the boundary is never pushed into the sea or over a cliff. The
absorbed districts' context changes (`extramural` false); the character step (i) re-types their kinds past the
identity's hysteresis (item 72) and the exposure field drops its extramural term for them from the next epoch. The old
outermost ring enters its pathway with cause `superseded` (V06 §3.7.2). F-WALL's ladder (§5.2) binds the trace; a trace
that fails it leaves the stage unwalled, the circuit re-evaluated at the next growth (reported) — one §2.7's laws give
no lawful meeting with a standing raised way taking no rung of that ladder and counted `walls.waited` (§2.7's laws, law
2 (c); V06 §2.10; V06 §3.7.6 (5)).

**3.7.2 The pathway of a superseded ring** (the owner: "a wall might move over decades being deconstructed into a road as
they build a newer outer ring"). At supersession: `neglect` on the ring (existence `abandoned`), `Enceinte.supersededBy`
set (base), and `pathway = { since: week, cause: 'superseded', fate, eligibleWeek }`: `fate` = `keep` while `threat ≥
walls.keepThreat`, else drawn from `walls.fateWeights` on `stream(EVO_FORT, enceinte)`; `eligibleWeek = since + round(52
× y)`, `y` drawn uniformly in `walls.roadAfterYears` or `walls.absorbAfterYears` by the fate. A `keep` is re-drawn once,
the first epoch its threat falls below `keepThreat`. Each epoch the `fortification` phase then, for every ring with a
pathway and not locked (address order):
1. **Gates open.** Each gate of the ring, from its drawn `walls.gateOpenAfterYears` (its first draw on
   `stream(EVO_FORT, gate)` keyed with the pathway's epoch), at `walls.gateOpenChancePerYear` → `gateToJunction`, with a
   square when three or more primaries meet there (a gate market).
2. **Stretches dismantled.** The trace is cut into `walls.dismantleStretchM` stretches from its first tower in address
   order; each whose run of `condition` is not yet `dismantled`, at `walls.dismantleChancePerYear × min(1, 0.2 + demand ÷
   yield)` (the salvage demand in its haul radius against its yield; our own floor 0.2) → `dismantle` with the stretch
   (its run → `dismantled`), crediting the ledger (§4.11 *Salvage*); charged to the `fabric` cap of the district the
   stretch's midpoint lies in.
3. **The end.** From `eligibleWeek`, with `threat < keepThreat`: `road` → `wallToWay` (§4.11, its clearance with lifecycle
   events; its dossier-backed uses relocated first); `absorb` → `absorbWall` (V06 §2.8): its strips' setback and glacis
   lines are removed so the strips merge into the blocks beside them, and S10's incremental re-cut cuts plots on the freed
   land with the neighbours fixed (§4.7 S10 (7)) — the backs of the plots now meet on the old line; the remaining runs keep
   their `condition` on the `cleared` record, their towers and gates with them (a `dismantled` run's towers drawn as trace
   discs), and step (2)'s dismantling continues on them — the fortification phase keeps the cleared record in its loop —
   until every run is `dismantled`; a tower or a
   gate is no building and never a pool candidate (J-V6.112). Neither fires on a ring that is itself the innermost
   enceinte of a castle or a citadel (`kind` `citadel` or `bailey`), which keeps its `keep` fate.
The ring road takes its name from S13a with the naming feature `formerWall` (V06 §5.2). An absorbed wall draws no label;
its cleared record and lifecycle are what the `enceinte` provider reads for the clerk's answer ("the old wall ran along
these plot backs until year N", V06 §4.5).

**3.7.3 An outermost ring in long safety.** An outermost, unsuperseded ring whose `threat ≤ walls.neglectThreatMax` has
held for `walls.neglectAfterYears` (read from the epochs' slices, §2.9's `EpochRecord`s; counted from the later of the low
threat's start and the ring's last lifted neglect, V06 §2.8's no-stretch `repairWall`) enters its pathway with cause
`neglected` and fate `keep`: `neglect` at once; its gates open as in V06 §3.7.2 (1); its stretches decay by V06 §3.7.7
(2) — worn, then `breach`ed (each a `breached` run of the ring's `condition`) at `walls.breachChancePerYear` — in the
strike pool's `fabric` cap, the decline table's `wall` row as the stretch's weight factor. It takes no final conversion (a neglected ring decays; only
supersession or a hand edit makes a road of it; J-V6.13).

**3.7.4 A shorter ring** (item 8 (a); the owner: "a shorter new ring"; under item 106's closure and water rule, V06
§3.7.6 (1)–(2)). An enceinte whose intramural occupied-plot share (occupied plots inside it ÷ all its plots) has stayed
below `contract.occupiedShareMax` since `Enceinte.underuseSince` for `contract.afterYears`, while `threat ≥
contract.threatMin`, contracts at `contract.chancePerYear` (first draw on `stream(EVO_FORT, enceinte)` after the pathway
draws). The trace:
1. The region: the `T`-level set (§4.4) inside the ring holding `contract.coreShare` of its households; **while the town's
   harbour use is live, united with its quay frontage (every live quay, landing, harbour basin edge and water gate) and
   the shortest way-graph path from the core to it**; then `contract.marginM` added.
2. The line: the registered `EnceinteStrategy` traces the region's boundary under item 106's barrier closure on the S3
   lattice with the cost field of the built-face legality (§4.11): an edge through an occupied footprint is impassable,
   one through a vacant, ruined or cleared footprint or along a plot boundary or back lane costs the lattice's low rate,
   one along a way corridor the middle rate — so the new ring runs through the empty and the ruined and along plot lines,
   never through a lived-in house.
3. Its strips clear only vacant, ruined or cleared buildings (`demolish`, cause `convert:contractWall`); a strip that
   would reach an occupied one, or a trace that leaves a live quay unreachable through a gate or an open front, widens the
   margin by 20 m and retraces, at most three times; then the contraction waits for the next epoch, reported
   (`walls.waited`; never forced).
4. `contractWall` (§4.11) builds the new ring with gates where primaries cross it on ground part 0 (S5a, S7; a deck
   passing over the trace takes none, §2.7's laws, law 1 (1)); the old ring takes
   `pathway = { cause: 'contracted', fate: 'keep' }` and decays by V06 §3.7.3's breach and V06 §3.7.2 (2)'s dismantling.
   The plots between the two rings are extramural from then on (the exposure field's term).

**3.7.5 Renewed threat.** A ring with pathway cause `neglected` or `contracted` whose threat rises back to
`walls.threatMin` is repaired — robust while the town has the means, patched while it has not (V06 §3.7.7 (3)):
`repairWall` (V06 §2.8) on each `breached` run of the ring's `condition`, in chain order
from the trace's first vertex, each drawn at its effective week with no Works (J-V6.31, J-V6.90) — the run's towers and
gates stand again with it — `fabric` cap charged, runs beyond the cap waiting in chain order, first in line next epoch
(J-V6.112). The pathway is cleared when no run is `breached`, and the record's lifecycle returns to its former state when
every run is `standing`; **in the batch that clears the pathway** — also when no run was ever breached — a `repairWall`
with no stretch (cause `rule:threat`) lifts the ring's `neglect` where its lifecycle holds one not yet lifted: in use
again (its pre-neglect existence) when every run is `standing`, `decayed` while a `dismantled` run remains. So a ring whose
pathway is cleared is never `abandoned`; a contracted ring that was never neglected takes none, its lifecycle being the
stretch repairs' (J-V6.115). Counted `walls.backInUse`, chronicled `wallManned`. A `dismantled` run is not rebuilt (its
stone is gone); a gap stays a gap until a hand `drawWall` closes it (a hand `repairWall` on it bends to that `drawWall`,
V06 §2.8).
**A ring in use with a breach** (J-V6.110). A ring with no pathway whose `condition` holds a `breached` run while its
threat exceeds `walls.neglectThreatMax` — a landfall's breach (V05 §3.16 (4)) or a hand `breach` — is repaired at the next
`fortification` phase by the same op and order: `repairWall` on each `breached` run in chain order, no Works, its towers
and gates standing again with the run, the `fabric` cap charged (runs beyond it wait, in chain order). A `dismantled` run
stays a gap (J-V6.16); a locked or pinned ring is held (V06 §3.1). A ring in use whose threat is at or below
`walls.neglectThreatMax` is not repaired by this rule: its threat's rise past that bound repairs it at the next phase, and
its long safety enters V06 §3.7.3's neglect, whose renewed threat is the rule above. Counted `walls.repairedInUse`.

**3.7.6 Barriers, water and the dossier's walls (item 106).** Every rule of this section binds every trace the engine
makes — a new circuit, a shorter ring, a repaired or re-anchored stretch:
1. **Barrier closure on every trace.** The trace is the registered `EnceinteStrategy`'s under item 106's closure (§4.4
   S5a; the arcs classed by V11 §3.16's `walls.barriers` rows): only approachable arcs are walled, each walled stretch
   anchored on its barrier with a tower, a river loop or a spur walled across its neck only, a barrier within
   `wall.barrierReachM` beyond the stage boundary reachable, its spare ground typed intramural gardens (item 106 (b)), the
   stretch profile grading the curtain by arc (item 106 (c)). `aroundAll` (V06 §3.7.1) means "encloses every earlier stage
   on its approachable arcs".
2. **Water access is a hard rule on every new ring and every contraction.** Every live quay, landing, harbour basin and
   water gate of the enclosed town stays reachable from inside through a gate or an open front. A circuit's trace that
   would cut one off gains a water gate on the arc between the quay and the water (S7 furniture) or, where the arc is a
   barrier, leaves it open; a contraction takes the harbour into its region (V06 §3.7.4 (1)). A trace that cannot hold both
   this rule and the occupied-footprint rule retraces by the margin rule and then **waits** for a later epoch, reported —
   never forced (J-V6.58).
3. **The waterfront at each epoch** (item 106 (d)–(f)). The fortification phase re-reads the waterfront grade from DR2's
   sea threats by V11's `walls.waterfront` rows (the highest-weight row that applies), past `dial.hysteresis`:
   * a rise to a row whose grade is `quay_wall` on a walled port turns `open` into `quay_wall` with sea gates at the row's
     quay accesses — a `drawWall` op on the waterfront arc, cause `rule:waterfront`, charged to the `fabric` cap, no Works
     (J-V6.31), chronicled `waterfront`;
   * a threat that stays below every quay-wall row for `walls.neglectAfterYears` neglects the quay wall (`neglect`; its
     pathway cause `neglected`, fate `keep`, V06 §3.7.3) — never demolished;
   * a walled port without a harbour-mouth chain gains one the first epoch its harbour mouth is enclosed: two towers on
     the mole or breakwater heads (or the shores) and a water gate across the entrance, as S7 furniture (item 106 (e)),
     chronicled `harbourChain`. A tower or fort already standing at a mole head — item 110 (d)'s placed landmark — is the
     chain's anchor there (one landmark, one owner); a tower is added only at a head where none stands; its gate and
     towers stand only where §2.7's laws, law 1 (5) and (6), admit them — at the nearest heads or shore points along the
     entrance that do, a tower standing where law 1 (6) bars a fixed place being no anchor, else the chain waiting
     (`walls.waited`; law 2 (a), (c); its worked example the fixed-place sentence);
   * **a removal holds**: a generated quay wall or harbour-mouth chain the user deletes carries `detail.suppress` (§2.8;
     key: the enceinte and the waterfront's water body, or the enceinte and the harbour basin), and this rule never re-adds
     it while the suppression is live — the rule's condition still holding is reported (`walls.suppressedHeld`), never
     acted on; undo of the delete lifts it, and the user's re-add — Build it again's `drawWall` on the former line or
     `placeGate` at the former mouth — serves it while it stands (V06 §3.19.3 (7));
   * a `reclaim` or `shiftCourse` (V06 §3.12) of the previous epoch that changed a shoreline an enceinte's closure relies on
     re-evaluates that closure this epoch by least disruption (item 22): a barrier arc that became approachable gets a new
     stretch anchored on the old ones; a stretch no longer needed is neglected, never demolished.
4. **The dossier gate** (item 20 through DR2; J-V6.59). On a dossier-bound document the engine never adds an enceinte or a
   waterfront wall the dossier's walls records do not admit: V06 §3.7.1's circuit decision runs only when the records
   admit one more enceinte than stands (by the record's kind — palisade, town walls, city walls and gates — against the
   rung's ring rows), and then without the chance draw; a walls REPLACEMENT step (item 108, V06 §3.9.11) or a new walls
   record arriving at `dossier` triggers the circuit at this epoch's `growth` phase with the record's kind — around the
   stage grown for the residual if there is one, else around the present built boundary by the `EnceinteStrategy` through
   the hand `drawWall` operator's path (cause the dossier event; no face added, so the base's residual rule is untouched)
   — and the superseded ring enters its pathway. The waterfront grade follows (3) (DR2's sea threats are the dossier's).
   Contraction, neglect, breach and dismantling stay map facts: the records list walls, not their line.
5. **Raised ways on every trace** (item 110 (b): an aqueduct "crossing the wall through an arch"; J-V6.91). Every trace
   this section makes — a circuit, a shorter ring, a re-anchored or repaired stretch, the waterfront's quay wall — and
   (3)'s harbour-mouth chain meet the standing raised ways by §2.7's laws (law 1, law 2; their worked example the
   crossing table's *beneath*):
   * a raised way's standing **support footprint** — its `state` absent or `ruined`, a pier or its stump — **is a
     footprint** for V06 §3.7.1's strip rule (but where the trace meets it, V06 §3.7.1), and V06 §3.7.4 (2)'s cost field
     searches only the shapes §2.7's laws admit, its line read with the band and wall strips it carries there (law 1
     (2)–(6), (9)–(11) and law 2 *Carried way*, read with their terms; law 2 (a); as §4.4 S5a *Trace* (2)'s pull does),
     none demolished for a wall; a `cleared` support's ring is neither (nothing stands there);
   * the trace, its gates, posterns and towers and its fixed places meet it by §2.7's laws, each taking only a shape
     those laws admit (law 1 (1)–(6), (9)–(11), read with their terms; law 2 (a), a stretch laid through no cost field
     with law 3, its worked example the bent-group sentence; a fixed place's, its worked example the fixed-place
     sentence; their worked example the crossing table's *beneath*); the moat by §2.7's laws (law 1 (1), (8); its worked
     example the way-and-channel table's row (e)) — and `wallToWay`'s ring road crosses its under-deck strip by them
     (its worked example that table's row (c)), with **no junction** with
     it;
   * **continuity**: a trace never waits for a raised way but by §2.7's laws, law 2 (c) (its worked example the crossing
     table's (G3)), or for a held building in an arch vault or a shape-locked raised way's `vault`-use span (law 1 (9),
     (10); its worked example *beneath*); only its moat
     stops, at the under-deck strip's edges where it cannot pass beneath, reported (`walls.raisedCrossings`, V06 §2.10)
     — `walls.waited` counting those waits and kept for the other continuity rules (the water access of (2), the
     occupied footprints of V06 §3.7.4 (3));
   * `absorbWall` and `wallToWay` leave standing every raised way the old line meets, and V06 §3.7.2 (2)'s dismantling
     takes every run, a run beneath a deck among them (§2.7's laws, law 4; its worked example *unchanged meeting*;
     J-V6.114).

**3.7.7 Condition by need and means (item 114).** The condition ladder is §2.7's `Enceinte.condition`: `standing` ·
`worn` · `patched` · `breached` · `dismantled`, on the stretch-state profile (§2.2 rule 5), each run carrying its material
(robust, or a patch row of V11's `walls.patchMaterials`) and the epoch of its last change. This section is its transitions
over epochs (J-V6.131); every chance is per year and every stretch a `walls.dismantleStretchM` stretch of V06 §3.7.2 (2)'s cut.
1. **The drivers, each a class sustained over a window** (item 114 (a)), read from the log, so a replay reproduces them:
   * **NEED** — `high` once the slice's threat (DR2; the dossier's defence readiness folded into it by V08) has stayed at or
     above `walls.threatMin` through the last `walls.condition.needReturnYears`; `low` once it has stayed at or below
     `walls.neglectThreatMax` through `walls.neglectAfterYears` (V06 §3.7.3's count); otherwise the class the previous
     epoch held (at the first epoch: `high` at or above `threatMin`, `low` at or below `neglectThreatMax`, else `mid`). Read
     from the epochs' slices (§2.9's `EpochRecord`s).
   * **MEANS** — `low` once the wealth level in force (V06 §3.3.5: `EpochInputs.wealthLevel`, else the recipe's) has stayed
     below `walls.condition.meansLow` through `walls.condition.meansWindowYears`; `high` once it has stayed at or above
     `walls.condition.meansHigh` through that window; otherwise the previous epoch's class (at the first epoch, the present
     value's band). The two thresholds lie apart and a class changes only after a whole window on the far side, so no run's
     condition flickers between two epochs at a threshold.
   * **The local weight** of a run, `λ = clamp(1 + walls.condition.localWeight × (P_town − P_run), 0.5, 1.5)`, `P_run` the
     household-weighted mean prosperity of the districts the run bounds and `P_town` the town's, both on this epoch's field:
     it scales the run's decay chances below, never a class — so the poorer quarters' stretches of a poor town wear first.
2. **Decay** — at the `fortification` phase, per stretch in chain order, each a draw on `stream(EVO_FORT, enceinte)` after
   the pathway's and the contraction's draws, charged to the strike pool's `fabric` cap as V06 §3.7.3's breaches:
   * a **neglected** ring (NEED `low`, V06 §3.7.3): `standing` → `worn` at `walls.condition.wearChancePerYear × λ` (the op
     `wearWall`, V06 §2.8), `worn` or `patched` → `breached` at `walls.breachChancePerYear × λ`;
   * a ring **in use** (no pathway) while MEANS is `low` — even under threat: `standing` → `worn` at
     `walls.condition.poorWearChancePerYear × λ`, `worn` or `patched` → `breached` at
     `walls.condition.poorBreachChancePerYear × λ` (slower than neglect's);
   * both low (a neglected ring while MEANS is `low`): the neglect chances × `walls.condition.bothLowFactor` — the fastest.
3. **Repair**, in chain order within the `fabric` cap, runs beyond it waiting in chain order:
   * NEED `high` with MEANS `low`: each `breached` run → `patched` (`repairWall` with a patch material, V06 §2.8: the row
     drawn from `walls.patchMaterials`' rows for the enceinte's kind and culture by their weights, one draw per run on
     `stream(EVO_FORT, enceinte)`) — never rebuilt robust; `worn` runs stay worn;
   * NEED `high` with MEANS `mid` or `high`: each `breached` run → `standing` robust (V06 §3.7.5), then `patched` runs →
     `standing` robust, oldest patch first (by the week of the run's last-change epoch — `EpochRecord.inputs.week` of its `conditionEpoch`, generation's
     epoch 0 first, a replay epoch's week before every live epoch's, §6.1 — ties in chain order), at most
     ⌈`walls.condition.rebuildRunsPerYear` × years⌉ an epoch, then `worn` runs → `standing`;
   * MEANS `high` without NEED `high`, on a ring **in use**: its `worn` runs → `standing`; a neglected ring keeps decaying
     (a rich place without fear lets its wall go) and `patched` runs stay patched until need returns with means;
   * a `dismantled` run stays a gap unless a hand edit or a new wall decision rebuilds it (V06 §3.7.5).
   V06 §3.7.5's renewed-threat and ring-in-use repairs are the NEED-`high` rows above: robust with the means, patched
   without them.
   **The welded stretch** (§2.7). Along an `on_enceinte` castle's `Castle.cityWeld` the town enceinte's profiles are the
   stretch's one condition, material and epoch, the bailey's mirroring them in the same batch: (2) and (3) decay and
   repair that stretch on the town ring's draws, λ and order only, never on the bailey's, whichever enceinte an op names.
4. **Neutral values** (the no-op pin): V11 §3.24.0's `walls.condition` off form — `atGeneration` false (every run
   `standing` at generation), `meansLow` 0 (MEANS never `low`), `wearChancePerYear` null (a neglected `standing` stretch
   breaches directly at `walls.breachChancePerYear`) and `needReturnYears` 0 — reproduces the rules before item 114 byte
   for byte (T-V6-73); V06's E3 seat registers H-100 and H-WALLS on V12 §2.13's `item114.condition` (V12 §3.7.8's
   engine).
5. **Report, story and replay.** The report counts `walls.worn`, `walls.patched`, `walls.rebuilt`; the chronicle writes
   `wallWorn` (a ring's first worn run), `wallPatched` ("{year}: the breaches in {subject} are patched with {material}")
   and `wallRebuilt` ("{year}: {subject} is rebuilt in {material}"); the `enceinte` provider reads each run's material and
   last change, so V10 tells a run's story ("patched with timber in the lean years; rebuilt in stone after the siege"). A
   replay (V06 §3.20) runs the same transitions over its coarse epochs, so a replayed map's walls carry their past's
   condition; without a replay, generation's condition is §7.7's derivation row from readiness and wealth (item 114 (d)).
=== END ===
=== REPLACE ### 3.17 Failure handling — never a whole-map retry (§5) ===
### 3.17 Failure handling — never a whole-map retry (§5)

1. **A refused op** (a conflict the candidate filter could not see; an invariant a batch would break, §5.3) is rolled back
   alone — its batch is one transaction (§3.3) — reported with its rule, and the phase continues on the state the earlier
   ops left.
2. **Work limits.** Each phase declares its limits (§5.1 (5)) over the epoch's counts — the use phase's re-scored uses,
   the pool's candidates, the frame's re-banded plots, the fire's rings; a phase that reaches one stops, its unvisited
   candidates go to `EpochOps.waited` (first next epoch), and the report records the hit.
3. **Stages.** A new stage's S5–S13 run under their own ladders (F-WALL, F-PLAN, F-PLOT …, §5.2); a circuit whose trace
   fails leaves the stage unwalled (V06 §3.7.1; one §2.7's laws give no lawful meeting with a standing raised way
   counted `walls.waited`, never taking F-WALL's raised-way rung: law 2 (c)); a stage that cannot take its households
   hands them to the overflow ladder, whose last rung cannot fail (V06 §3.6).
4. **Participants** are isolated: a participant whose `run` returns an error has its ops discarded, the error reported with
   its id, and the epoch continues.
5. **Inputs.** An unknown hazard kind and an unmapped calamity are reported and ignored; a `populationTarget` outside every
   registered ladder never reaches an epoch (the port refuses it, §7.7 item 15) and a standalone trajectory's is clamped to
   the registered ladders (J-V6.5, J-V6.61); a degenerate `advance` request bends or is a no-op by V06 §3.3.2's rules, and one whose estimate exceeds `advance.budgetMs`
   coarsens its cadence by them (V06 §6.8), never shortened or refused; a
   `params.week` outside the span is clamped (V06 §3.11.1); a dossier event the base cannot apply follows §7.7's ladders.
6. **The report.** Every skip, wait, hit, clamp, re-plan and held entity is an entry of the `EpochReport` with its cause;
   nothing the engine declined to do is silent.
7. **Traces and water.** A circuit or contraction trace that cannot hold water access and the occupied-footprint rule
   waits (V06 §3.7.6 (2)); a dossier-gated circuit whose trace fails F-WALL's ladder is reported and re-tried at the next
   epoch (the dossier's walls stay listed; the map lacks their line until a trace holds).
8. **The underground.** A participant of the underground whose V04 call fails is isolated by (4); the catacomb ratchet is
   never broken by a failure — a failed growth adds nothing and records `stagnant` with its block.
9. **Raised ways.** A candidate whose course the solver cannot find, item 244's support step drops (`raised_too_tall` or
   `raised_too_long`, V06 §3.19 (5)) or, for a road deck, would cross a standing curtain (§2.7's laws, law 1 (3), law 2
   (c); its worked example
   *down before the wall*; V06 §3.19 (5)), or whose clearing the district caps cannot pay, waits (`raised.waited`), its
   uniform unchanged, re-evaluated next epoch; a clearing is committed whole or not at all (V06 §3.19 (7)); a repair a
   cap cannot take waits span by span. Until the base's raised-way solver and operator land, the pass is absent and
   reported, as the underground participants are before V04's U5 (V06 §8, risk 8).
10. **The replay.** A replay epoch fails piece by piece like any epoch — (1)–(9) — and never restarts the generation; a
    history the replay cannot use (a founding after its present, a peak below the present population) replays nothing or
    no peak, reported (§4.11 *History-first generation* (7)); a replay whose estimate exceeds the budget coarsens by V06
    §3.20.4's rule, never cuts the history short.
=== END ===
=== REPLACE ### 3.19 Item 110 over epochs — raised ways, retaining walls and decks (item 110 (a), (b), (d); J-V6.82–J-V6.95) ===
### 3.19 Item 110 over epochs — raised ways, retaining walls and decks (item 110 (a), (b), (d); J-V6.82–J-V6.95)

The base generates raised ways at S4 and S6, levels terraces and raises their retaining walls at S10 and S11, and cuts deck
plots at S10 (item 110; file f items 244–246, 290; V11's `raisedWays`, `terrace`, `deck` and `deckOk` rows). This section
owns their **epoch half**: when a city founds a raised way over time, how a removal holds, how the three kinds of fabric
decay, fall and are repaired, and how an epoch's plot operations treat them. Every change here is an op through the hand
path's operator (V06 §3.1 (4)), so its dry run, locality and undo are the hand path's. A standing raised way is kept
(§2.7's support step (6)): only an op that names it — its hand edits, this section's ops, a landfall, a frame growth's
extension of its deck (§3.2 (9), the old deck's stations kept and its end span's condition carried, §2.7's support step
(7)) — changes it, and a wall meets it by §2.7's laws (V06 §3.7.6 (5)); an epoch's growth (V06 §3.6 (4)) and
every route an epoch re-solves cross it by §2.7's laws (law 1 (1), (8); its worked example the way-and-channel table's
row (a): §4.3's crossing rule and F-ROUTE's
ladder, §5.2).

**The `raisedWays` step** (V06 §3.2 row 10a; phase `history.raisedWays`, stage `EVO_RAISED`; `'grow-by-stage'` registers no
phase for it, so by the no-phase rule T-V6-1 is untouched). It runs, at every rung, in this order:
(A) **lapse** — sources lost, disuse marks and the `neglect` of a way whose disuse has run (V06 §3.19.2 (2));
(B) **repair, regrowth-first** — raised ways with a ruined span (or abandoned) and struck decks whose reason or crossing is
live again (V06 §3.19.2 (5), V06 §3.19.5 (4));
(C) **founding** — only at an epoch whose rung — the fold's, read at `prelude` (V06 §3.1 (3)) — is CITY or METROPOLIS (the
rung gate, below): the ledger, the candidates, the gate, the order and caps, the course, the clearing and the commit,
(1)–(8) below.

**The rung gate** is the owner's rule (item 110 (b): "at CITY and METROPOLIS the generator raises a way where there is a
reason … A TOWN gets them only by declaration"): provenance owner, never a table cell that a calibration or an
`editTable` can move (V12's guard, V06 §3.19.1 (4)). At TOWN and at every village rung (C) does nothing; a declared raised
way stands held (item 101 R13), and one carried down from a city stands and decays or is repaired by (A) and (B). The
epoch that carries a town across into CITY is the first that may found one.

1. **The ledger.** `RaisedWayLedger` (V06 §2.13) is derived from the model and the log: per kind the cap at the epoch's
   rung, the standing generated ways, the declared ways, the suppressed reason keys and the count (V06 §3.19.1).
2. **Candidates**, read from the state after `terrainWater` and (B), from **ground-arena entities only** (`PlatKey.layer`
   `'ground'`, any part) — never a sky ward, an island institution, an island landmark, an island's conjured river or
   spring pond. The thresholds, factors, caps and chances are V11 §3.24.2's `raisedWays` rows; this section keeps only the
   readings' geometry — `A`, `B`, the drop, the anchors, the intake:
   * **Viaduct.** For each standing part-0 way of a class in V11's `viaduct.routeClasses` (its lineage `W`) and each ravine
     or valley `SiteFeature` `f` whose extent its polyline crosses (the extent as S1 records it): `A` is the way's last
     vertex before its course enters the extent and `B` its first vertex after it leaves (a course crossing the extent more
     than once gives one reading per entry and exit; the key keeps the reading with the largest drop). The **drop** is
     `min(h(A), h(B))` less the lowest terrain along the chord `AB` (sampled at the terrain raster's cell); the metres
     **saved** are the course's length from `A` to `B` less `|AB|`; the **span** is `|AB|`. The reading is met when the
     span is at most `viaduct.maxSpanM`, the drop exceeds `viaduct.minDropM` and the **strength** `saved − span ×
     viaduct.spanCostFactor` is above 0. The viaduct is laid **beside** the standing course, from `A` to `B`, carrying the
     way's class; the standing ways keep their course and class (street lines persist; primaries never downgrade, V06
     §3.5.2) and the route is not re-solved.
   * **Elevated road.** The **endpoints** are the ground arena's high wards (districts whose area-weighted mean terrain
     height exceeds the town's household-weighted mean height by at least `elevated.minRiseM`), its terraced districts
     (volume 1's terrace kind), the citadel's reservation and each great temple's precinct reservation — reservations,
     never the institutions on them, so an institution's passing to an island leaves the road's reason standing. Each
     endpoint's **anchor** is its highest part-0 way vertex inside it or on its boundary (ties by address); a citadel's,
     the highest vertex of its castle street outside the castle's wall strips at which the road's ends and zone keep the
     town-side gate and the castle's fixed places clear (§2.7's laws, law 1 (4), (6); law 2 (a): a raised way's ends
     where its own law picks them); an endpoint with none is none. For each unordered pair of endpoints whose anchors
     `P1`, `P2` lie at most `elevated.maxSpanM` apart, the reading is met when the lowest terrain along `P1P2` lies at
     least `elevated.minRiseM` below both `h(P1)` and `h(P2)` and the segment passes over a district that is neither
     endpoint (the lower district). Its **strength** is the mean of the prosperity field at `P1` and `P2` ×
     `landmarkFactor^n`, `n` (at most `landmarkMax`) the dossier's landmarks on high ground inside either endpoint by
     V11 §3.24.7 (4)'s test (DR35).
   * **Aqueduct.** The **need ratio** `r` is the base's eager water-need reading (§4.5; file f item 290) — the in-wall
     households' demand over the supply of wells, river and lake frontage and cisterns at the base's distances, plus the
     deliveries of the standing aqueducts in use — evaluated with the epoch's **ground** households only; it never reads
     V04's placed cisterns or an island's water. The **terminal** `T` is fixed first (6). Each ground **source** — a spring
     as S1 records it (whose `flow` is at least `spring.aqueductMinFlow`, V06 §3.12.1), or a river on the ground terrain —
     gives one candidate: its **intake** is the spring itself when it lies at least `aqueduct.minFallPerKm` × its straight
     distance to `T` in kilometres above `h(T)`, or, for a river, the first point met going upstream along its course from
     its point nearest `T` whose water surface lies that far above `h(T)`; a source whose intake lies farther than
     `aqueduct.sourceReachKm` from `T`, or outside the S3 lattice's extent, or that has no such point, is not met. The
     reading is met while `r` exceeds `aqueduct.needRatioMin` — and, at CITY and METROPOLIS with the dossier's water-system
     record present, counts as met (V11 §3.24.7 (3) (a); DR34); its **strength** is `r`, ties by the intake's distance to
     `T` (the nearer first), then by the key's address. After each aqueduct admitted this epoch, `r` is re-read with its
     delivery counted, so a second aqueduct is founded only while the need remains.
3. **The gate first** (J-V6.68's idiom). Each met candidate's `RaisedReasonKey` (V06 §2.13) holds one uniform `u`, drawn on
   `raised.reason` (§6.1) with epoch component 0 — the same draw generation makes, never re-drawn (V06 §3.16;
   J-V6.84). The candidate is **live** only while `u < p`, `p` V11 §3.24.2's chance at the epoch's rung — its "chance,
   stated once" over `chance[rung, kind]`, `pMax` and the kind's factor (the ends' mean band, the landmarks and the culture
   for an elevated road; the era and the culture for an aqueduct — the dossier's water-system record makes the need count
   as met and never scales the chance, V11 §3.24.7 (3)). No course is solved for a candidate whose gate fails. So a reason
   becomes live the first time `p` rises above its fixed `u` — monotone in the rung (`p` is 0 below CITY) and independent
   of the cadence up to the weeks at which `p` is sampled.
4. **Order and caps.** Live candidates are taken **kind by kind — aqueduct, then viaduct, then elevated road** (necessity,
   then passage, then prestige; J-V6.85) — and inside a kind by strength descending, ties by the key's address (the
   aqueduct's by distance first). A key whose way stands, or that a live removal suppresses, is never a candidate: it is
   already counted (V06 §3.19.1, V06 §3.19.3); a suppressed key is still read by (2) and gated by (3), and one whose gate passes
   is reported in `raised.suppressedFired`, never admitted (V06 §3.19.3 (2)). A candidate is admitted while its kind's
   count and the rung's total count stay below V11's caps (V06 §3.19.1) — the aqueduct cap and the total raised by
   `capPerSizeMember` for each SIZE member of the dossier's water-system record (V11 §3.24.7 (3) (c)); an admitted
   candidate raises both counts before the next is considered.
5. **The course.** The base's raised-way course solver — the one S4 and T4's dry run use (§4.3) — solves the course on
   the S3 lattice with `existingFabricCost` (§4.3): from `A` to `B` (viaduct), from `P1` to `P2` (elevated road), from
   the intake to `T` (aqueduct). Locked, pinned and declared entities — but a wall, a retaining wall and another raised
   way, which a course meets as unheld ones (§2.7's laws, law 2 *Entry*; its worked example the crossing table's lock
   sentence: a wall by §2.7's laws, a retaining wall passed over with a support on its line built against it, another
   raised way's supports impassable as every raised way's) —, dossier-listed buildings, every other raised way's
   supports, enceinte towers and gates, and V05's `skyAccessObstacles` (V05 §2.3b) are **impassable** to the course's
   supports, ramps, stairs and feet and to its clearing ((7)), and each fixed place of a standing curtain, with its
   footprint, to the course's strip, zone and ends wherever §2.7's laws bar it there (law 1 (4)–(6), read with their
   terms; its worked example the fixed-place sentence), filtered before any draw (J-V6.7); an occupied footprint costs
   the table's demolition cost. A course passes over a locked, pinned or declared ground way on a span, as over any way
   (item 244's clearance; §7.4's raised-way row), and meets a standing curtain — placement-locked, pinned, declared or
   not, the runs of an absorbed record not yet `dismantled` among them (§2.7's laws' *what stands of a wall*; its worked
   example the crossing table's row W8) — by §2.7's laws, nothing of either written, its course searching only the
   courses those laws admit against every standing curtain (law 1 (2)–(6), (9)–(11), read with their terms; law 2 (a)):
   an aqueduct *over the band* (J-V6.140), crossing each curtain at its own level in the form that level gives (law 1
   (2)); a road deck *down before the wall* (law 1 (3) with law 2 (a)), founded with its two ends fixed; a candidate
   with no such course — a road deck's among them wherever its course would cross a standing curtain — not founded: it
   waits, `raised.waited` (law 2 (c)). Over each crossed part-0 way the solver holds the deck at least item 244's
   clearance above that way's levelled ground (file f item 244: `clearanceCm` for the crossed class, a generated way
   holding none and so taking volume 11's `raisedWays.structure` cell, plus the deck's depth — the deck's lower bound
   there). **Item 244's support step** (file f item 244; J-VI.27) then lays the stations and pier rings on the solved
   course — a generated way holds no `spanSpacingCm`, so its pitch is the one uniform the step draws on `raised.reason`
   (§6.1) keyed by the way's lineage (its reason key, (8)) and `pitch`, inside its material's `pierSpacingM` band — and
   a course one of whose piers stands higher than `maxPierM` for its kind (`raised_too_tall`) or whose merged clear span
   exceeds `maxClearSpanM` for its material (`raised_too_long`, §2.7's support step; both cells V11 §3.24.2's) is
   dropped and the candidate **waits** (`raised.waited`; its `u` unchanged). The spans' use (`open` or `vault`) is then
   the base's span rule on that course. A candidate with no course **waits** likewise and is re-evaluated next epoch.
6. **The aqueduct's terminal** (J-V6.92). `T` is the live `conduit_house` use's building inside the outermost enceinte
   nearest the in-wall households' weighted centre — on a dossier-bound document the use the water-system record binds, on
   a standalone one the roster's — its outlet at the building's frontage; where none stands, a fountain `Pin` at the square
   (a market square, an S9b square or a template plaza) nearest that centre, ties by address — **that square's existing
   fountain centrepiece when it has one** (no second fountain). The terminal is never an institution the roster or the
   dossier does not hold.
7. **Clearing the land.** The land the base reserves under the raised part — its support footprints (the support step's
   pier rings, (5)) and its under-deck strip (the deck's width plus `raisedWays.structure.stripMarginM` each side, V11 §3.24.2 — §4.6 S8's one strip) — is cleared **before**
   the commit, in address order: a vacant, derelict, ruined or cleared building there takes `demolish`; an occupied one
   takes `demolish` only after its households are displaced into the ledger (`EpochOps.displaced`, cause `clearance`) and
   any dossier-backed use in it is relocated (*Dossier content across epochs*). Each demolition is charged to the
   `geometry` cap of the district it stands in (`ChurnLedger.take`). The clearing is **whole or nothing**: when any
   district's remaining `geometry` cap is below the demolitions it would take there, nothing is cleared and the candidate
   waits (`raised.waited`, its `u` unchanged; first considered again next epoch, in the order of (4)). It waits likewise
   when the households it would displace exceed the town's **free capacity** in regrowth tiers (0)–(5″) after the ledger's
   pool — its vacant and derelict dwellings' capacity and the crowding headroom (§2.6's capacity, V06 §3.6 (5)) — so the
   displaced are re-housed by `siting` in this epoch (V06 §3.8.1) and none is put in a tent by a raised way (T-V6-57): a
   city raises its arches where it can re-house the people it moves. The plots under the supports and the strip are re-cut
   by the operator's own least disruption.
8. **The commit and its reason.** The raised way is committed through the hand operator's event — T4 `road` with `raised`
   for a viaduct or an elevated road, the aqueduct class for an aqueduct — with cause `rule:raisedWay`, its lineage its
   reason key (V06 §3.16), the base record's `reason` set, its arch-vault chambers laid in the commit and reconciled by
   `under.extend` (V06 §3.2). The creation event writes **`detail.why`** (§2.8), at most five rows: the reason row
   (`raisedWays.<kind>`, family `reason`, share the strength); the condition rows (family `condition`: the drop and the
   metres saved; the rise below the lower anchor with the two endpoints as `other`; the need ratio with the source and the
   terminal as `other`); and the gate row (family `gate`, share `p`). The report counts `raised.founded`; the chronicle
   writes `raisedWay`.

**The rows the pass reads** are V11 §3.24.2's `raisedWays` table and settings, the era and culture factors (V11 §3.19.1,
V11 §3.20.3), V11 §3.24.7 (3)–(4) for the dossier's water system and landmarks on high ground, and V11 §3.18's structures
block for the disuse and slump cells; this volume keeps no copy (one knob, one table). The rung gate is the owner's (CITY
and METROPOLIS only), never a cell. The strip margin is `raisedWays.structure.stripMarginM` (V11 §3.24.2), the one margin of §4.6
S8's under-deck strip, which V01 §3.17.3 (2) reads too.

**3.19.1 The cap and the count** (item 110 (f): "within the rung's cap"; J-V6.86, J-V6.95).
1. **The cap bounds foundations, never survivals** (J-V6.64's rule). A kind's **count** is its standing generated ways plus
   its suppressed keys plus its declared ways; the rung's total is the sum over the kinds. The pass admits a new raised way
   only while its kind's count is below its kind's cap and the total below the rung's total cap. A decline, a fall in
   prosperity, a sinking water need or a rung fall removes none: a city above a cap after a rung change is reported
   `raised.aboveCap` for that kind (and for the total), chronicled once (the first epoch it holds), and founds none of that
   kind until its count is below the cap again.
2. **Declared ways count** toward their kind's cap: a user's T4 raised way or aqueduct, a skeleton file's. The generator
   fills only what the author has not built — the item 20 (h) analogue of V06 §3.9.1's `N_c − D_c`. A declared way is never
   removed by the engine and never makes the city "above cap" in the report (the report names generated excess only). A
   declared way whose own reading gives a suppressed key holds that key (V06 §3.19.3 (3)) and is counted once. The dossier
   declares no arches: a dossier-bound document's raised ways are generated or hand-drawn.
3. **Standing and released.** A generated way **counts as standing** while it is repairable — every span standing or
   ruined, none cleared, and every support standing or ruined (the way itself in use or `abandoned`). Once a span is
   dismantled (its stone taken) or a support cleared, the way is **released**: it no longer counts, it is no longer a
   repair target, its remaining supports and spans stand as ruins that the pool clears on salvage demand (V06 §3.19.2
   (3)), and its reason key re-opens with the same fixed `u` — a new way for it is founded by (C) only when its reason is
   live again, minted with §6.3's collision suffix, its course solver costing the old ruins as ruined footprints
   (J-V6.95). While a way stands, regrowth-first holds: (B) repairs a raised way with a ruined span whose reason is live
   before (C) admits any new reason (V06 §3.19.2 (5)).
4. **Guards** (V12's guard set as owner-rule bars, V12 §3.7.4): `raised.generatedBelowCity` — exactly 0 foundings at a TOWN
   or village-rung epoch (ways carried down from a city exempt); `raised.reasonMissing` — 0 generated ways without a
   `reason` and its why rows; `raised.overCap` — 0 foundings that leave a kind's count or the total above its cap.
5. **Hand-offs.** Volume 7's hand-down and hand-up rewrite no event, so a carried way keeps its reason, its spans and its
   state, and the suppressions cross in the log; (C) never runs at a village rung, and from the first CITY epoch it counts
   the declared and carried ways.

**3.19.2 Raised ways in disuse, decline and repair** ("arches fall by stretch while piers persist"; J-V6.87, J-V6.94).
1. **Generated ways decay by disuse**; a declared way holds nothing unless the user locks it (§2.7's laws' *held*;
   J147): a locked one no disuse, hazard or landfall breaks (V06 §3.1; V05 §3.16 (2); §2.7's laws, law 2 *Entry*), the
   user breaking a span or a support by a hand `convert` and repairing it by hand (T9 `shape`'s inspector, **Repair**;
   V06 §4.2); an unlocked one declines and is repaired as a generated one is, its existence kept.
2. **Lapse and disuse**, in (A), for each standing generated way in address order:
   * **the lapse condition** — a **viaduct or an elevated road**: its carried way has been downgraded (or retired to a
     hollow way, V07 §3.12 — read as downgraded), or neither end's foot junction has an incident part-0 way fronting an
     occupied plot; a viaduct carrying a primary never lapses by the second test (primaries never downgrade, V06 §3.5.2 —
     such bridges were kept in use); an **aqueduct**: its need ratio `r` below 1;
   * the base record's **`underuseSince`** is set to the epoch's week by a `setAttr` (author `epoch`) when the condition
     first holds, and cleared when it ends;
   * a way is **disused** at once when its carried way was downgraded, and otherwise when `(week − underuseSince) ÷ 52`
     reaches `streets.abandonAfterYears` (viaduct, elevated road) or V11 §3.18's `aqueduct.disuseAfterYears`; a disused
     way takes **`neglect`** (existence `abandoned`, file f item 291's raised member) in this step — deterministic, as a
     ring in long safety is (V06 §3.7.3) — chronicled `raisedWay`, counted `raised.disused`;
   * **an aqueduct runs dry at once** when its source is lost — the spring's reach silted dry, the spring lost or its
     `flow` below `spring.aqueductMinFlow` (V06 §3.12.1), or the river moved or silted away from the intake, by this or an
     earlier epoch's `siltReach` or `shiftCourse` (V06 §3.12): the intake no longer lies on a source's water face that can
     feed it. It takes `neglect` in this step, its terminal's supply reading goes off at once (so `r` rises from this
     epoch's reading on), chronicled "the aqueduct runs dry", counted `raised.ranDry`.
3. **The strike** (the pool's `raised` kind, V06 §3.5.2, at the decline table's `raised` row — one dwell band slower than
   buildings, as walls; file f item 291). An abandoned way's candidates, weighted `w = E(x) · rate · u` at the span's
   midpoint as the pool's (§4.11), charged to the `fabric` cap of that district:
   * **each standing span** whose dwell band has run since the way's neglect (drawn once per span, keyed with the epoch of
     the neglect, V06 §3.16) → `breach` on its `SpanRef`, weight × `min(1, 0.2 + demand ÷ yield)` (arches fall sooner where
     their stone is wanted; our own floor 0.2, as the wall pathway's) — the deck and the arch over the span fall `ruined`;
     its rubble stays;
   * **a ruined span's rubble** with salvage demand in its haul radius → `dismantle` on the span (stone credited to the
     ledger, §4.11 *Salvage*; the span `cleared`), weight × `min(1, demand ÷ yield)`, never a candidate without demand;
   * **a support both of whose spans are ruined or cleared**, with salvage demand → `dismantle` on the support (cleared),
     weight as the rubble's — supports outlast spans, late in the persistence order, so a ruined aqueduct stands for
     centuries as a row of piers;
   * a span or a support whose fall would cut a gate's or a plot's only path (§5.3's network invariant, reading the way the
     deck carries) is filtered out before the draw (J-V6.7).
   The span's arch-vault chambers collapse with it **in the same batch** (the breach and dismantle ops carry V04's
   `collapse`, file f item 291), so no chamber stands open under a fallen span at any batch; `under.extend`'s reconcile
   over `scope.raised` finds them done.
4. **Hazards** (V06 §3.11): `topple` takes a support, weighted by its height, and breaks both spans beside it; an
   `inundate` whose depth at a timber support's foot reaches `timberScourCm` breaks it at `collapseShare`, a masonry
   support never; a landfall ruins the spans and supports it covers, standing or already `ruined`, a `cleared` one kept
   `cleared` (a run beneath them breached by the landfall's wall row; V05 §3.16 (4)) — that is the island's law (V05
   §3.16), and `sky.islands` records them in `scope.raised`, so this epoch's `raisedWays` reads an aqueduct's lost
   supply in its need ratio at once. A hazard breaks a way in use too; its repair is (5).
5. **Repair, regrowth-first** (in (B), before (C) admits any new reason). Each standing generated way that is abandoned or
   has a ruined span, and whose reason is **live again** — an aqueduct whose source is sound (its spring's `flow` back at or
   above `spring.aqueductMinFlow`) and whose `r` is at or above `aqueduct.needRatioMin`; a viaduct or an elevated road whose
   carried way is in its class and in use again (`upgradeWay` or `reopenWay`, V06 §3.8.2 (5′)) and one of whose foot
   junctions fronts an occupied plot — is repaired, in address order: `repairRaised` (V06 §2.8) on each ruined span (its
   ruined supports with it), then on the way itself (back `in use`), each charged to the `fabric` cap of the span's
   district; a span the cap cannot take waits, the way `abandoned` until its last span is repaired. A way a hazard broke
   while in use is repaired the same way, its reason being live.
   **A way struck in this epoch is repaired from the next epoch** (never in the batch that struck it); a dismantled span
   or a cleared support is never rebuilt — the way is then released (V06 §3.19.1 (3)). V04's vaults are re-laid over the
   repaired spans by `under.extend`'s reconcile, each in a span §2.7's laws read `vault` (law 1 (8)). While a viaduct
   that carries a route has a ruined span, the route's standing ground course carries its traffic (the viaduct was laid
   beside it, (2)); an elevated road's traffic uses the ground ways below. Counted `raised.repaired`, chronicled.
6. **The chronicle and the report**: `raisedWay` lines for a founding ("an aqueduct is raised from {cause} to
   {district}"), its finish, a repair, a run-dry, the first epoch above a cap, and one counted line per way per epoch for its
   fallen spans; the report's `raised` section (V06 §2.10), its `suppressedFired` entries by V06 §3.19.3 (2).

**3.19.3 A removal holds** (the owner: "a user can decide to add or remove"; item 110 (b), (f); J-V6.83). The base's
collision rule (§6.3) mints a fresh entity over a tombstone (`~k`), and at an epoch the user's `delete` stands earlier in
the log than the generator, so a tombstone alone cannot hold a removal. The suppression (§2.8; file f item 260) holds it:
1. **A removal suppresses its reason.** A `delete` of a raised way whose lifecycle cause is a generation or epoch rule
   carries `detail.suppress { kind: 'raised', key, reason }`, written by the delete operator — whether the `delete` comes
   from V09 §4.3's delete, the clerk or the CLI; the key is the way's reason, never its course, so the removal survives a
   change of course under a table release, an upgrade or a historical pack (V12 §4.1; T-V12-40).
2. **Every generator reads it.** The ledger's suppressed set is the log's live removals; generation's S4 and S6, a new
   stage's S5b and this pass skip a suppressed key and count it as filled against its kind's cap and the rung's total (V06
   §3.19.1), so no replacement appears elsewhere: the owner removed that viaduct, not the city's quota of viaducts. **The
   pass reports when the city would have rebuilt it** (J-V6.120). In (C), a suppressed key is read by V06 §3.19 (2) and
   gated by (3) as any other key — its uniform W59's keyed draw, drawn for it exactly as for any other key, so no other
   draw moves — and goes no further: no admission, no course, no clearing. Each epoch in which its reading is met and its
   gate passes (`u < p`), the pass adds one entry `{ removal, week }` to the epoch report's `raised.suppressedFired` (V06
   §2.10): the `seq` and the week of the live `delete` whose `suppress.key` is that key, the entries in removal order
   (ascending `seq`). A key a user's re-add serves ((3)) adds none — its declared way holds it, its candidate reading
   `standing` — and a lifted removal none, its key no longer suppressed; a TOWN or village-rung epoch adds none, (C) not
   running there; generation's S4, S6 and S5b skip the key without an entry, writing no epoch report. Suppressed keys are
   read at every epoch, under V06 §6.1's over-budget fallback too (one per live removal), so an entry never depends on that
   fallback's rotation. V09 §4.10's `epoch` row draws one `info.raised.suppressed` line per entry (`{w}` the week; **Show**
   on the removed way's former outline, read from the `delete` event and its tombstone) — V08 §4.6 item 3's line — and the
   list is derived with the rest of the report and rebuilt by replay (W19).
3. **What lifts it.** §2.8's one lift rule: only the delete's undo, or a `forkAt` before the removal. **What serves it:**
   the user's own re-add of a way serving that reason — a T4 raised way or an aqueduct (`drawWay { raised: true, class,
   widthCm, points }` or the aqueduct class, the form V09 §4.20.3 (4)'s Build it again emits on the former course) whose
   reading (V06 §3.19 (2) applied to its ends) gives the suppressed key holds the key while it stands, counted once as
   declared, and deleting it later leaves the original removal in force.
4. **Across rungs and hand-offs.** A city that falls below CITY and rises again keeps the removal, because the suppression
   is in the log, not in the rung; volume 7's hand-offs rewrite no event (V06 §3.19.1 (5)).
5. **Re-runs.** `rerunFrom` lists the removal among the hand edits with "re-apply" (V06 §4.4); the re-apply resolves **by
   the reason key**, never by an address: when a way of that key stands in the fork it is deleted with its suppression;
   when none stands, the re-apply reports "the aqueduct this removal named was never built in this history" with the
   alternative "keep the city from building one" (the advanced panel's `raisedWays` rows, item 101 R2) — never a silent
   skip.
6. **The dry run says so** in plain words, by V09's `info.remove.holds` line with its `{kind}` slot ("The town won't
   rebuild this aqueduct; undo brings it back"; V09 §4.20.3 — the one message key for every kind of this section, a deck
   plot's wording a V09 variant row, "No house will be built on this spot of the bridge"). The dry run lists the fates: the
   arch vaults deleted; for a viaduct, the route's standing course carrying its traffic; for an aqueduct, the terminal
   losing its supply ("the fountain in {square} runs dry").
7. **The same rule for the volume's other re-adding generators**: a generated harbour-mouth chain and a generated quay wall
   (V06 §3.7.6 (3)) — keys the enceinte and the harbour basin, and the enceinte and the waterfront's water body; a
   **generated retaining wall** — key its chain's lineage address, so the levelling's re-derivation (V06 §3.19.4 (1)) and
   the restoration ((6)) skip it; and a **generated deck plot** — key its deck host's id (item 246) and its slot ordinal
   along the deck from the host's first end, so tier (5)'s deck faces (V06 §3.19.5 (1)) skip that slot. Each is counted
   held while no re-add serves it, and lifted only as (3) states. **What serves each key** — the re-adds, keys unchanged,
   in the forms V09 §4.20.3 (4)'s **Build it again** emits (and volume 10's **Put it back**, which takes the same events
   through `ClerkMount.rebuildEvents`; J-V6.116):
   * a **quay wall** (enceinte, water body) — `drawWall { kind, points, closed }` of the removed wall's kind on its former
     line: served while a declared wall of that kind walls the key's waterfront arc (the waterfront rule's own arc reading,
     V06 §3.7.6 (3)), so the rule finds the arc walled;
   * a **harbour-mouth chain** (enceinte, basin) — `placeGate { enceinte, at }` at its former place: served while a
     declared water gate of that enceinte stands across that basin's mouth (the rule's own "mouth enclosed" reading);
   * a **retaining wall** (its chain's lineage address) — `drawWall { kind: 'retaining', points, closed, highSide }` on its
     former chain: served while a declared retaining wall stands whose chain lies on the removed chain's line from its
     first vertex to its last (Build it again's points are the former chain's, read from the tombstoned record's last
     state; T3's snapping puts a redraw along the same step on it);
   * a **deck plot** (host, slot `k`) — `drawFootprint { polygon, cls? }` on the deck whose plot S11 fits at slot `k`:
     served while that declared plot stands at (host, `k`).
   A served key is never generated again while its re-add stands — no duplicate at any epoch, regeneration or re-roll — and
   is counted once, as the re-add (declared), never in `suppressedHeld`; deleting the re-add leaves the original removal in
   force, as for a raised way ((3)). Islands and sky accesses keep volume 5's record form (`SkyIsland.removed`,
   `.removedAccesses`) under the same lift rule (E-02: kept apart, file f item 260).

**3.19.4 Retaining walls over epochs** (item 110 (a): "never an enclosure (it is not an `Enceinte`)", "generated walls
re-derive with their terrain; drawn ones are held"; J-V6.88).
1. **Made or re-derived only where an epoch levels.** Generated `RetainingWall`s are made or re-derived only by an op that
   levels: a new stage's S10 and S11 on its new faces; a rung-3 re-cut, or a `rebuild` or `reuse … build` that runs S11 on
   its plot (a rebuild that keeps its footprint does not re-level); and `raiseGrade` (V06 §3.11.6), under which each wall
   inside the raised region is **tombstoned** in the `raiseGrade` batch (cause `convert:raiseGrade`) — V04's
   buried-system builder reads a tombstoned wall inside the region as a step in the buried floor, the storey chambers on
   its high side taking its high-side datum (V04 §3.5.5), so the buried town keeps its terraces — and new ones are derived
   on the new grade. A generated wall whose chain lineage a live removal suppresses is never made or re-derived (V06
   §3.19.3 (7); counted `retaining.suppressedHeld`). No epoch re-derives a standing wall whose plots it did not re-level
   (V06 §3.16's no re-roll; T-V6-3's locality). Every levelled plot and block, with its walls, enters
   `EpochScope.levelled`; the report counts `retaining.created`, `.rederived` and `.buried` (the tombstones).
2. **No plot operation deletes one.** `amalgamate` merges only across boundaries that carry no retaining wall, else the
   plot takes `plotToGarden` (V06 §3.5.2); `plotToGarden` keeps the wall (a terraced garden, like a vineyard terrace); a
   rung-3 re-cut keeps it as a fixed plot line (V06 §3.8.4); `absorbWall`'s S10 re-cut keeps it likewise.
3. **They slump slowly, as their own candidate** (the pool's `retaining` kind at the decline table's `retaining` row, one
   dwell band slower than buildings; file f item 291). A generated wall is cut into stretches of `retaining.stretchM`
   (terrace walls fail in short slumps) from its first vertex; a standing stretch is a candidate when every plot on its
   high side within `retaining.holdM` of it has been empty, garden, orchard or field for `retaining.neglectAfterYears` —
   V11 §3.18's structures cells — read from the plots' lifecycle blocks, the span keyed with the epoch the last of them
   emptied (V06 §3.16). A strike `breach`es the stretch to `decayed`: no edge is removed and no terrain changes (the
   state rule of V05 §3.16). `dismantle` takes a decayed stretch's stone only on salvage demand (→ `ruined`; the bank
   remains). A drawn wall is held. Chronicled `retainingSlump`, counted per district; the report counts
   `retaining.slumped`.
4. **Crossings keep their steps.** `downgradeWay` keeps a crossing's stair or ramp — an interval attribute of the way at the
   wall (V01's crossing rows) — and `upgradeWay` restores the class with the same crossing.
5. **Plans and the sewer.** In an epoch that levels, an unstored plan beside the levelled faces goes stale and a stored one
   is re-cut inside the epoch event (V03's outside-ground row; file f item 263; T-V3-30); tiers added or removed over epochs
   re-match stored plans by wing-relative storey (file f item 347); and `under.extend` takes U-NET's
   invert drops at the wall crossings of the ways in `scope.levelled` (V04 §3.2).
6. **Restoration** (J-V6.101). A `decayed` stretch of a generated wall is re-derived **intact** — a `repairRetaining` (V06
   §2.8) in the restoring op's batch, so its lifecycle and undo are explicit — by (a) any op of an epoch that re-levels a
   plot on its high side within `retaining.holdM`: a regrowth tier (3) `rebuild` or `reuse … build` that runs S11 on the
   plot, a rebuild on a house platform (V07 §3.12: regrowth rebuilds on the platform first and repairs its walls at the
   platform's datum), a rung-3 re-cut — cause `rule:regrowth`, charged to the `fabric` cap of the stretch's district; and
   (b) the landfall clearance (V06 §3.5.2's `landfall` kind), cause `rule:landfall`. A `ruined` stretch is not restored
   (its stone is gone): the re-levelling lays a **new stretch** on its line (a successor lineage, §6.3), the ruined stretch
   tombstoned in the same batch. A **drawn** wall is restored only by hand (T3 `wall`'s inspector, "repair", V06 §4.2), a
   ruined drawn stretch bending to a new drawn stretch on its line (J-VI.4). A suppressed wall ((1)) is never restored.
   Counted `retaining.restored`.

**3.19.5 Decks over epochs** (item 110 (d): "removing or ruining the deck ruins what stands on it by least disruption;
rebuilding it re-offers the plots"; J-V6.89).
1. **Offering.** An epoch builds a deck only through a new stage's S5c bridge at an unused crossing site (§4.11) or a new
   stage's S7 harbour furniture, and restores one only by `repairRaised`'s deck form (4). Its deck faces — a mole, a pier,
   a quay platform, a bridge deck — are offered at regrowth tier (5) (V06 §3.8.2), cut by S10's deck rule under V11
   §3.24.4's `deck` table as V02 §3.16 reads it; tier (4) and the use phase's openings and moves (V06 §3.9.5 (1), V06 §3.9.6)
   admit only uses that `deckOk` admits (the use's effective crypt first, then its class's column). A deck slot a live
   removal suppresses is skipped and counted `decks.suppressedHeld` (V06 §3.19.3 (7)). Counted `decks.offered`.
2. **The budget binds every epoch op on a deck plot** (V06 §3.8.4): no `densify` of either form and no rung-2
   `back_court`; a `relet` within the deck building's capacity; a `MutationPlan` step and a `rebuild` through S11's capped
   mutator (V02 §3.16 (3)); rung 3's `subdivide` and `amalgamate` inside the deck's width.
3. **Striking a deck** (the pool's `deck` kind, at the street's row; file f item 291). A deck is item 246's
   `Plot.deck.host` — a `Bridge` for a bridge deck, a `pier` or `quay` way for a mole, pier or quay platform — and **its
   condition is that host's lifecycle existence** (`breach` → `decayed`, `ruin` → `ruined`, `repairRaised` → the former
   existence from the striking op's undo record); `Bridge.state` is untouched. A bridge or pier deck is a candidate when
   its way no longer crosses live water (an oxbow silted to marsh, file f item 206) or its way has been downgraded, **and**
   no deck plot on it is occupied; a strike **`ruin`s** it — the deck `ruined`, its way cut there only where §5.3's network
   invariant allows (else not a candidate, filtered before the draw). Hazards reach decks too (V06 §3.11): a flood whose
   water level passes a timber deck's soffit breaks it (`ruined`) at `collapseShare`; a `burn` that burns every building
   standing on a timber deck chars the deck to `decayed` (impassable until repaired); masonry decks break by neither. A
   hazard break that §5.3's network invariant would forbid leaves the deck `decayed` and standing instead, reported. **A
   struck deck ruins what stands on it** by least disruption, in the same batch: each building on its deck plots takes
   `ruin`, a dossier-backed use relocated first, its households displaced into the ledger (cause `flood`, `fire` or
   `clearance`), and the deck plots are tombstoned with the deck. Counted `decks.struck`, chronicled `deck` ("the houses
   on {subject} are swept away").
4. **Rebuilding, regrowth-first.** In (B), a ruined or decayed deck whose way is still in use and still crosses live water
   is repaired before any new crossing is made — `repairRaised` on the deck (V06 §2.8), charged to the `fabric` cap of the
   deck's district, from the epoch after the one that struck it; its deck faces are then offered again by (1), and the
   buildings raised on them are new lineages (V02 §3.16 (7)). Counted `decks.repaired`.

**3.19.6 A dossier-bound document** (items 20, 20 (h); J-V6.92). Raised ways are map-derived: the dossier lists
institutions, not arches. A dossier-bound document runs (A)–(C) as a standalone one does, with two limits: the aqueduct's
terminal is the water-system record's bound `conduit_house` when the dossier has one, else a fountain `Pin` (V06 §3.19
(6)) — never an institution the dossier does not list; and a removed generated way is suppressed like any other (V06
§3.19.3). The water-system record (DR34) acts at CITY and METROPOLIS only, by V11 §3.24.7 (3) — the need test counts as
met (never a factor on the chance), each SIZE member raising the aqueduct cap and the total by `capPerSizeMember`, its
bound `conduit_house` the terminal — and never forces arches where no source is in reach (`pMax` holds; a miss is
reported `aqueduct_no_source`); landmarks on high ground (DR35) and the era and culture rows are factors (the dossier
trace, V06 §1b). The clearing never touches a dossier-listed building (impassable, (5)).
=== END ===
=== REPLACE ## 7 Tests and acceptance bars ===
## 7 Tests and acceptance bars

They take over the base's evolution bars as §13.2 names them (the take-over table, the evolution row: T8-1 – T8-7, T17-2,
T17-3, T18-1 – T18-4's epoch-spread form, T20-2's and T20-6's epoch clauses, T25-1, T31-2, T31-3, T31-8 – T31-12,
T67-1 – T67-6, T70-1 – T70-4 over epochs, T72-1 – T72-9's epoch clauses, T76-1's per-year clause, T81-1, T108-4 over
epochs, T110-2's epoch clauses (1), (2), (4), (5), (7) and (8), T111-1 – T111-5's epoch form, T113-1 – T113-3, T113-6,
T113-7, T114-1 – T114-5 save T114-3's landfall clause, T114-8's and T114-10's epoch clauses, T115-1 and T115-2 across a
rung change, T122-1's hand-over clause and T123-4's epoch clause), each test naming the bar and the clause it takes; the
table after the fixtures maps them. Families as §13 names them: **property** (§13.1's fast-check),
**hook and invariant** (§13.2), **statistics bench** (§13.2's many-seed bench; item 103 (e)'s form — measured shifts
against a baseline, never guarantees), **B-EDIT** (§13.2),
**goldens** (§13.3), **visual** (§13.4), **performance** (§12, §13.8's tiers). The fixtures: the golden TOWN, B-CITY and
METROPOLIS seeds; **H-100** — a scripted standalone history of 100 epochs (+1 % a year for 40 years, −1.5 % for 30, +1 % for
30; threat 0.5 throughout; hazards `minor`); **H-DOSSIER** — a dossier-bound history replayed from the port's fixtures
(volume 8) with a mapped fire calamity and its F5 targets, an institution re-designation, a COUNT record ("Blacksmiths
(3–10)") across a rise and a fall, a see moving from one church to another and back, a walls REPLACEMENT, an
`activeChains` status change from `active` to `vulnerable` and back (neutral keys V08 §2.6 maps) and a catch-up epoch
carrying two dossier events; **H-RIVER** — a river town with a meander above 1.8 and a marsh beside built land;
**H-PORT** — a walled port whose core lives inland of its quays, declining to 40 %; **H-CLIFF** — a cliff-backed coastal
town and a river-loop town; **H-VOID** — a site with a forced cavern and a forced ruin under the core, growing from a
hamlet's population; **H-CHURCHYARD** — a churchyard whose catacomb grows under its church; **H-METRO** — a 100-year growth
from TOWN to METROPOLIS; **H-VILLAGE** — 1 200 → 3 000 → 900 (with and without volume 7 registered); **H-DESERT** — with
volume 7 registered, a village of 400 falling to 60 over 80 years and rising to 2 000 over the next 60 (a desertion and a
rise through the hand-up); **H-AQUA** — a town below a spring 4 km upslope inside the S3 lattice, growing from TOWN to
CITY to METROPOLIS and back to TOWN over 200 years, the spring's reach silted by a scripted `siltReach` in year 170; at
its first CITY epoch V06 §3.19's founding lays its masonry aqueduct across the ring standing then (its **CITY ring**) on
a span over its band (§2.7's laws, law 1 (2); its worked example *over the band*) — the recipe's seed searched so that
this span, and the span whose strip the METROPOLIS epoch's circuit later crosses, each reads `vault` in its record
(§2.7's span rule; its reading, `open` or `vault`, §2.7's laws', law 1 (8)) —, and a viaduct where its main approach
road crosses a valley outside a gate, its deck coming down before the ring and its road passing the gate on ground part
0 (§2.7's laws, law 1 (3); its worked example *down before the wall*) (the recipe's valley deeper than
`viaduct.minDropM`, its near rim just beyond the ring's outer wall strip, so that the reading's `A` lies there and the
viaduct's foot at `A`, widened by `raisedWays.structure.stripMarginM`, lies clear of the ring's band, wall strips and
gatehouse, the main approach road's gate standing beyond the foot (§2.7's laws, law 1 (4); its terms' *beyond the
foot*), the main approach road's ground course from `A` to `B` longer than (1 +
`viaduct.spanCostFactor`) × `|AB|` with `|AB|` within `viaduct.maxSpanM` so that the reading's strength is above 0, and
its piers and clear spans within `raisedWays.structure.maxPierM` and `maxClearSpanM`, V06 §3.19 (2), (5); its far foot
`B` beyond the land the METROPOLIS epoch's circuit encloses, so that circuit is laid across its deck; the CITY viaduct
row's `chance` and `pMax` raised to 1 by an `editTable` the fixture logs before that epoch, so the founding lays it);
and a timber elevated road declared by hand (T4 `road` with `raised`) after that epoch (a declared way counts toward the
caps, V06 §3.19.1 (2), so the CITY epoch's total of two is the aqueduct's and the viaduct's), from a ward beyond the
CITY ring to high ground outside the land the METROPOLIS epoch's circuit encloses, so that circuit is laid across it
(declared and not locked, it declines and is repaired as a generated one is, V06 §3.19.2 (1) — the recipe's seed
searched so that it stands in use through the METROPOLIS epoch);
**H-TERRACE** — a hill town on 20–30 % slopes, a century of growth, decline and regrowth; **H-DECK** — a river town with a
timber bridge carrying houses and a stone bridgehead, a harbour mole with a mid-mole tower, and a meander that cuts off
under its second bridge; **H-OASIS** — an arid town around an oasis whose spring feeds an aqueduct at CITY, a scripted
drought in year 30 and the course of a wadi shifting off a second spring in year 60; **H-WALLS** — one walled town run
four times over 120 years, threat and wealth scripted high-high, high-low, low-low and low-high, each held 40 years and then
switched; **H-HISTORY** — a dossier fixture of a village of 600 whose `tierHistory` shows CITY 250 years ago (no
`peakTier`), with a great fire 180 years ago, plague years 120 years ago and a trade collapse 90 years ago; **H-REFOUND** — a
town destroyed by a catastrophic event 200 years ago and resettled 150 years ago as a thorp, now a town of 3 000;
**H-RUNG** — with volume 7 registered, a village of 1 200 rising to a town of 2 500 and falling to a village of 900 over
120 years at the wealth maximum. CI tiers: per-commit T-V6-1–4, 12, 21, 26, 38, 52, 53, 58, 65, 70's pins and 71's no-op
pin; nightly the rest; the statistics bench weekly on 200 seeds (§13.8).

**The base bars these tests take** (§13.2's take-over table, the evolution row; each test names the bar and the clause it
takes there too):

| base bar | taken by | the clause it takes |
|---|---|---|
| T8-1 | T-V6-70 (f) | every `DeclineOp` kind the strike pool applies over H-100's decline undone with its epoch to byte identity |
| T8-2 | T-V6-7 | the regrowth-first fixture over epochs: no new face while the old plan holds capacity, each band's vacancy share kept |
| T8-3 | T-V6-3 | over H-100's epochs every ruin, trace and superseded ring keeps its address; no cleared building tombstoned unless demolished or succeeded; a front building made a trace or demolished frees its passage |
| T8-4 | T-V6-5 | the exposure field monotone in each driver's weight, its chance share the table's |
| T8-5 | T-V6-6 | the salvage ledger's credits equal the yields of the robbed and the cleared, never negative, every shortfall reported |
| T8-6 | T-V6-30 | a CITY fallen below 10 000 inhabitants loses its islands over their dwell spans, never in one epoch |
| T8-7 | T-V6-5 | after a fall no building with a surviving household reads `vacant`; every `relet` down stales an unstored plan and re-cuts a stored one inside its event |
| T17-2 | T-V6-4; T-V6-13 | a pinned assignment never moves under an epoch (T-V6-4); the `use` row of the churn cap holds (T-V6-13) |
| T17-3 | T-V6-2 | one seed with one circumstance timeline replays to one digest of openings, closings and moves |
| T18-1 – T18-4, the epoch-spread form | T-V6-15 | each `MutationPlan` step keeps the kept parts byte-identical, touches nothing outside its scope and never subtracts a locked part; the return applies the inverse; the steps in full equal the one-shot mutation of the same record |
| T20-2, its epoch clause | T-V6-27 | a rejection lapses at the first epoch past the roster tolerance and on no drift inside it; the undo of a lapsing epoch outside the port's session `host:port` (an advance on a what-if copy) restores the hold |
| T20-6, its epoch clause | T-V6-27; T-V6-4 | a dossier-backed use never closed, its building emptied or removed only after it moved (T-V6-4, T-V6-27); an `undo` naming a port epoch, with or without a dossier change, F-EDIT (T-V6-27) |
| T25-1 | T-V6-18 | an epoch's `reclaim` and `siltReach` byte-identical outside their footprint and undone exactly with the epoch |
| T31-2, T31-3, T31-9 – T31-11 | T-V6-29 | granularity within each band's target; the churn caps per kind, district and block; the floor's bars — at every epoch of the soak |
| T31-8 | T-V6-26 | every class's replaceability and every ladder row's durations present, as the ladder phase reads them |
| T31-12 | T-V6-1 | with no epoch, `builtBand` the generation band and the geometry band the field band |
| T67-1, T67-3 | T-V6-21 | the stage drawn at week w a pure function of the Works and w; the old boundary shown until clearing |
| T67-2, T67-4, T67-6 | T-V6-19 | access at every week; rehousing before a demolition's first stage; the epoch's Works share and a decay Works' dwell band |
| T67-5 | T-V6-1; the parity paragraph below | no Works at generation and none under the parity presets |
| T70-1 – T70-4, over epochs | T-V6-32 | every informal cluster the overflow ladder or a stage makes over epochs |
| T72-1 – T72-9, their epoch clauses | T-V6-29 | the character step's output after every epoch of the soak |
| T76-1, its per-year clause | T-V6-25 | per-year rates give equal expected firings at 13-, 52- and 520-week cadence |
| T81-1 | T-V6-50 | a rung-crossing epoch grows the frame by §3.2 (9)'s batches, every address and ring outside the growth kept |
| T108-4, over epochs | T-V6-45 | a promotion or a demotion by least disruption |
| T110-2, its epoch clauses (4), (5), (7) and (8) | T-V6-47 | on H-AQUA, an epoch circuit across its standing aqueduct, one across its standing timber elevated road and its contraction across its aqueduct, each run again placement-locked and pinned, met by §2.7's laws (law 1 (2)–(9); its worked example *beneath*); an epoch stage and route re-solve crossing a standing raised way only under a span §4.3 admits; the aqueduct's lapse beneath its circuit; `wallToWay`'s ring road; the epoch circuit under a placement-locked arch vault and with a held building (T-V4-80 (i), at E8), and (4)'s other epoch clauses — two raised ways, the fixed-place zone, the table-edit wait, the epoch `shiftCourse` at E5 — as T110-2 (4) states them |
| T110-2, its founding clauses (1) and (2) at an epoch | T-V6-73 | on H-AQUA, its aqueduct founded across its CITY ring where the run at its course is `breached` and, on a second run, `dismantled` (the ring placement-locked by the script once its run is so, V06 §3.7.5) (§2.7's laws, law 1 (2); its worked example *over the band*, the gap left a gap); on its variant, a viaduct whose course would cross the standing CITY ring not founded, `raised.waited` (§2.7's laws, law 1 (3), law 2 (c); its worked example *down before the wall*); and the foundings across a ring and a retaining wall drawn by hand and placement-locked, (2)'s epoch route through a standing gate and its epoch walled stage's spawned primary, as T110-2 (1) and (2) state them |
| T111-1 – T111-5, the epoch form | T-V6-72 | a failing spring weakens its pull over epochs; the `item111.water` pin on H-100 |
| T113-1 – T113-3, T113-6, T113-7 | T-V6-71 | the city-to-village fixture; one digest per seed and history on the five engines; the refounded fixture; a symbolic peak only with evidence; the `item113.history` pin |
| T114-1 – T114-5 save T114-3's landfall clause, T114-8's and T114-10's epoch clauses (item 114 (g)) | T-V6-73 | the transitions over epochs on H-WALLS; the run beneath the aqueduct over 20 epochs on H-AQUA; its aqueduct founded across the decayed ring (T110-2 (1)); the welded stretch over 10 epochs; the `item114.condition` pin |
| T115-1, T115-2, across a rung change | T-V6-74 | no grand dwelling but the one manor at a village epoch, the manor only with a lord or a dossier record, across H-RUNG's rung changes |
| T122-1, its hand-over clause | T-V6-75 | the model and the hash identical with crises followed, off and previewed at every week of the conditions; the aftermath only through the epoch path |
| T123-4, its epoch clause | T-V6-76 | the decay level falls under a restoration, the damage leaving in reverse threshold order, a repaired element drawn in patch material until a rebuild |

| id | family | what | bar |
|---|---|---|---|
| T-V6-1 | goldens | the `'grow-by-stage'` strategy through the phase interface (its nine base phases) reproduces M4's grow path, including a **dossier-bound catch-up epoch carrying two dossier events** (both applied at step (e), the lapse, character and Works steps run); with no epoch every plot's `builtBand` equals its generation band and its geometry band its field band, a town and a metropolis each resolving their own middle band (T31-12) | byte-identical model digest to the M4 golden on every M4 fixture and on the catch-up fixture's log; exact (T31-12) |
| T-V6-2 | property | determinism: the same seed and inputs fold to the same digest per epoch; a replay from the log and a replay from any checkpoint agree; the fold is identical on every host (§6.5); a failure at an epoch recurs identically at replay (V06 §3.17); one seed with one circumstance timeline replays to one digest of openings, closings and moves (T17-3) | 0 mismatches over H-100 and 50 random trajectories |
| T-V6-3 | hook | no re-roll and locality: every entity outside an epoch's touched set is byte-identical (leaf digests) across it; every survivor keeps its address and lineage; an epoch with an empty touched set records its week and report and changes nothing else; over H-100 every ruin, trace and superseded ring keeps its address, no cleared building is tombstoned unless demolished or succeeded, and a front building the pool makes a footprint trace or demolishes leaves its passage with no `frontBuilding` and no base wing spanning it (T8-3's epoch form) | 0 violations over H-100 |
| T-V6-4 | hook | protection: a locked or pinned entity, a declared place (item 101 R13), a dossier-backed use and its building before its relocation are never struck, converted, closed or moved by the engine (a wall, a raised way or an arch vault held in its placement, its shape changing where they meet by §2.7's laws — law 2 *Entry*; its worked example the crossing table's lock sentence —, each change a `reshaped` entry, law 4's (G2)); holding one entity changes no other entity's draws (T17-2; T20-6's epoch clause) | 0 violations; a lock toggled on an entity the history never touches leaves every other entity's history byte-identical |
| T-V6-5 | statistics | departures follow exposure: the mean `E(x)` of the dwellings emptied in a fall exceeds that of those kept; extramural and flood-band dwellings empty first; a core dwelling can still empty; the exposure field is monotone in each driver's weight and its chance share equals the table's (T8-4); after each fall of H-100 no building with a surviving household reads `vacant`, and every `relet` down marks an unstored plan rung `stale` and re-cuts a stored plan inside its own event (T8-7's epoch form) | on 200 seeds: emptied-minus-kept mean `E` ≥ 0.1; core share of emptied > 0 in ≥ 5 % of seeds; exact (T8-4, T8-7) |
| T-V6-6 | statistics | the persistence order over a long decline: a layer's **struck share** per decade = its entities stepped down (by the pool or, for walls, by the pathway's breaches and dismantles, counted by `walls.dismantleStretchM` stretches) ÷ its live entities at the decade's start; the shares order use > building > plot boundary > street > wall; the salvage ledger's credits equal the yields of the robbed and the cleared at every epoch, are never negative, and every shortfall is reported (T8-5) | ordered, each adjacent pair within a declared tolerance of 0.01 absolute, in ≥ 90 % of seeds over a 60-year decline; exact (T8-5) |
| T-V6-7 | hook | regrowth-first: after decline then growth, no new face is built while tiers (0)–(5″) hold capacity beyond `decline.turnoverVacancy`; the old plan's vacancies are refilled first, each band keeping its turnover share vacant (T8-2's epoch form) | 0 violations; ≥ 80 % of pre-decline plots reoccupied before the first new stage in H-100; the poorest band's vacant share ≥ 0.05 − 1 dwelling at every steady epoch (0 in the parity presets) |
| T-V6-8 | statistics | crowding before sprawl: households per dwelling of the crowding bands rise before a stage grows; decrowding moves households to the new stage; the rich bands never crowd | on 200 seeds: crowding precedes ≥ 80 % of stages; 0 rich-band crowding |
| T-V6-9 | hook + statistics | a new circuit and its suburbs absorbed: grown under threat 0.6, a ring encloses every earlier stage on its approachable arcs and its inner strip crosses no standing footprint; the old ring enters its pathway (`keep` while threat ≥ 0.6); then threat held at 0.4 (below `walls.keepThreat`) for 40 years: the `keep` fate is re-drawn at the first epoch below and splits road : absorb ≈ 0.7 : 0.3; on H-CLIFF the ring has zero wall edges on sheer arcs and walls a river loop at its neck only | 0 footprints crossed; fate share within ± 0.08 over 200 seeds after the re-draw; 0 sheer-arc edges |
| T-V6-10 | hook | a shorter ring: its trace passes through no occupied footprint and leaves every live quay reachable; a contraction that cannot is retraced at most three times and then waits (never forced); on H-CLIFF it walls only approachable arcs | 0 occupied footprints crossed; 100 % of quays reachable; 0 sheer-arc edges |
| T-V6-11 | hook | renewed threat repairs breaches (`repairWall`, the `breached` runs of the ring's `condition` in chain order) and never rebuilds a dismantled stretch; the record's lifecycle returns to its former state only when every run is `standing`; a hand `repairWall` on a dismantled stretch bends to a new stretch drawn on its line, and a hand `repairRaised` on a dismantled span to a new raised part, each dry run naming the bend (J-VI.4); a hand no-stretch `repairWall` on a ring with no neglect to lift is a no-op with its line ("this wall is in use"), never a refusal; on a sky fixture whose island falls at year 30 across a live ring (threat 0.6, no pathway) covering a stretch and a gatehouse, with one of the ring's runs `dismantled` by hand beforehand: the stretch and the gatehouse are `standing` again at the next epoch, the dismantled run is still a gap, and `walls.repairedInUse` counts the repaired runs; **0 Works whose target is a wall, a tower or a gate** at any batch, and after `absorbWall` every run is `dismantled` in time, the run beneath a standing deck among them (on H-AQUA, its CITY ring once the METROPOLIS circuit supersedes it, its fate set to `absorb` by a hand `setAttr`, the aqueduct over it standing; §2.7's laws, law 4; its worked example *unchanged meeting*), V04 laying again the arch vault of a `vault` span the old wall stood over in the epoch whose dismantling takes the last run of the absorbed ring over it (law 1 (8); its worked example the crossing table's row W8; H-AQUA's span over its CITY ring, the recipe's seed searched so that no way, square or channel is laid across that span's strip while the ring stands over it), and the same absorb over the state sweep (§13.2; rows W8 and W4 at an epoch) — each an *unchanged meeting*, the runs dismantled in time as any, the vault laid again so, `collapsed` where its span or a bounding support has fallen; and an aqueduct founded by V06 §3.19 across the absorbed ring's line while a `breached` run there stands as the epoch's `raisedWays` step reads it (V06 §3.2, V06 §3.19 (2)) — its supports off that run's former band and a span over it (§2.7's support step (3)), crossing it in the form its level there gives (law 1 (2): over where its channel runs above the wall's top and every span over the band clears it, merged where its channel runs within the wall's height; its worked example *over the band*), and over a `dismantled` run none (§2.7's laws' *what stands of a wall*; its worked example row W8's C1 and C11); and a viaduct founded across a standing run of the absorbed ring — its ends fixed, so not built, `raised.waited`, until that run is `dismantled` (law 1 (3), law 2 (c); its worked example row W8's C1, *down before the wall*); a neglected ring under renewed threat is in its pre-neglect existence once its pathway is cleared — `decayed` while a dismantled run remains — also when no run was ever breached, **0 rings with no pathway in existence `abandoned`** at every batch, and a hand "back in use" lifts the neglect and clears the pathway, V06 §3.7.3 neglecting that ring again only `walls.neglectAfterYears` after the lift | exact on a scripted threat cycle; 0 refusals outside dossier facts and locks; exact on the landfall fixture; 0 wall Works and 0 abandoned rings without a pathway |
| T-V6-12 | property + hook | the shade mask: the incremental mask equals a full recomputation bit for bit, including on a fixture whose Works span the epoch's week and on an island arena; the mask survives a save and a load between epochs unchanged, and a sampler change — or a field grid grown with the frame — reads as zero building shade until the next epoch rewrites it whole; `w_sun` = 0, or item 111 (c)'s climate cell 0, leaves the field and the town byte-identical to a history without the mask (the no-op pin `item102.sun`: H-100, registered by V06's E5 seat on V12 §3.7.8's engine); on a **near-cut fixture** (a quarter whose value sits within `w_sun` × Δshade above a band cut, tall houses built to its south): the field band falls at the first epoch after the mask records them, never in the epoch that built them; rung 1 acts in that same epoch; rung 2 only after the ladder table's years; on a **stepped temple** (three massing tiers, item 110 (c)) the incremental mask equals the full one and each tier's top is its own datum plus its height, so each casts its own shadow; **way surfaces follow the field** (V06 §3.4 (9)): on H-100 with a prosperity `setField` brush lowering one district by two bands in year 40 and one of its lanes' `surface` edited beforehand, at the first epoch after the brush every other way fronted only by that district's plots carries V01 §3.7.3's value for its class, era and new fronting band (a `cobble` lane at `comfortable` now `dirt`), the edited lane keeps its surface (counted in `shade.surfacesHeld`), and no way fronted by no re-banded plot changes surface; the mask runs at a THORP epoch of H-VILLAGE | exact; exact; exact; exact on the fixture's epochs; exact, one shadow per tier; exact, 0 edited surfaces rewritten |
| T-V6-13 | statistics | uses over time (items 17, 103, 107): after growth on one side, the mean distance from households to their nearest daily-local use falls within 3 epochs; a tannery on a river town ends downstream of the housing more often than the baseline; measured at every tenth epoch of H-100 with the web's weights on: a coverage class's `servedShare` on its own coverage unit (V12 §3.6) stays above its random baseline, a spaced class's nearest-member distance stays above its baseline, and consumer-to-provider distance lies within `comfortM` in most placements; the `use` cap holds per district (T17-2's churn-cap clause) | measured shifts ≥ the bench's declared deltas (item 103 (e), 107 (g)); comfort ≥ 0.7 of placements; cap 0 violations |
| T-V6-14 | hook | custom chains over epochs (item 104): an inactive chain's nodes keep their sites; a chain switched off and on with nothing else changed returns every node to its site; an anchor moved re-sites the chain in item 105 (f)'s order; a revision re-sites by least disruption | exact |
| T-V6-15 | hook | `MutationPlan`: steps apply in order at their weeks; each applies exactly its parts of the stored record; an incompatible present design opens the use at its first compatible step (a relocating use open at its former site until then); a hand edit between steps makes the next re-plan; a use leaving cancels the plan with done steps standing; the building's return to its former designation applies the inverse of the done steps; an always-crypt target carries its crypt from the occupy step; undo restores; a plan whose stored record is missing is re-planned, reported; a step due before the plan's creation clamps to it; each step keeps every kept part byte-identical, touches nothing outside its event's effective scope and never subtracts a locked part, and the steps applied in full give the design the one-shot mutation of the same record gives, byte-identical (T18-1 – T18-4's epoch-spread form) | exact |
| T-V6-16 | hook + statistics | fire: the spread never crosses a way corridor ≥ `breakM` or open water; `minor` never exceeds 6 buildings; the burnt plots are rung-3 eligible and rebuilt by tier (3); the rebuild shift lowers flammability for 30 years; on H-DECK a fire lit in the timber row on the bridge spreads along the row over the water and stops at the stone bridgehead, and a burn of every building on the timber deck chars the deck to `decayed` | 0 violations; on 200 seeds the mean fire size falls with the share of stone and tile; exact on the bridge fixture |
| T-V6-17 | hook | flood and collapse: only buildings whose depth at their datum (the water level less `baseCm`) reaches `collapseDepthCm` collapse, only of the listed wall materials; a deck building whose deck stands above the water level never collapses; a terrace building is judged at its platform, never at the unlevelled ground; `topple` strikes the chosen count, and a toppled support breaks both its spans; underground, on a flood fixture over a shallow sewer gallery and a deep catacomb: only elements whose ceiling lies within `surfaceClearCm` take `flood`, and only where V04 §2.3 admits it (else `W_VOID_UNDER_WATER`); the deep catacomb stays dry; the epoch's flood and the same flood drawn by hand reach the same elements | exact |
| T-V6-18 | hook + statistics | terrain and water: a cut-off leaves an oxbow that silts to marsh; reclamation fires only with a shortfall and a `modest` band; the rates over 1 000 seed-centuries lie within ± 30 % of the table's; every epoch-applied `reclaim` and `siltReach` is byte-identical outside its footprint, in the carve fixtures' form, and undoes exactly with its epoch (T25-1's epoch form) | exact; within tolerance |
| T-V6-19 | property + hook | Works scheduling: start offsets are uniform over the span (KS test); a chained Works starts after its predecessor finishes; a chained Works not started when the next epoch changes its target is removed, its change drawn finished and the new Works starting from the prior started Works' stage; the retirement rule keeps every Works that ran in the epoch's span in that epoch's model at any cadence (13, 52, 520 weeks); no Works leaves a plot without access (T67-2); a demolition's households are rehoused before its first stage (T67-4); on the hook fixture an epoch's share of buildings in works lies within ± 3 s.e. of growth × mean duration ÷ span, and a decay Works within its dwell band (T67-6) | KS p > 0.01; exact; within ± 3 s.e. |
| T-V6-20 | property | people: a person's key, age and succession are pure functions; the same week gives the same household members from any replay **and at any cadence** (the same 100-year history at 13, 52 and 520 weeks gives the same successors, keyed by death week); a pinned person is never succeeded | exact |
| T-V6-21 | property + visual | frames: `frame(w)` by the images path equals the replayed prefix's model digest (with the effective-week before-images) for random `w`; scrubbing forward and back draws byte-identical images (§13.4's week-scrub harness); then-and-now equals the lifecycle entries between the two weeks; at a 13-week and a 520-week cadence, a scrub to a week before the epoch of a ring-road conversion, a way downgrade, a waterfront wall and (on H-AQUA) the aqueduct's founding draws the before state, and a PNG and GeoJSON export at that week does too; a frame drawn after an undo and after a reload equals the replayed prefix's; the stage drawn at week w is a pure function of the Works record and w, reached directly or by scrubbing, and no model digest moves (T67-1); a merge or a split shows the old boundary until its clearing stage (T67-3) | exact |
| T-V6-22 | hook | `forkAt` gives the prefix's digest, and one at a seq inside a replayed document's creation prefix bends to the prefix's end with its line; `rerunFrom` with no change reproduces the original history's digests epoch for epoch, also after a save and a reload; on H-DOSSIER, `rerunFrom` at a point before an institution was added (by a standalone dossier event between epochs), with one wall locked, reproduces every dossier-backed use; a re-apply of a hand edit resolves by carry-over matching or returns F-EDIT with alternatives; a dossier-bound fork receives no later dossier event; before a rebase point both bend to the earliest seq with the line "the copy starts at year N" | exact; 100 % of dossier-backed uses |
| T-V6-23 | hook | `advance`: the expansion's weeks, targets and events equal V06 §3.3.2's formulas; the shape table's mappings (V06 §2.3); a span above `maxEpochs` bends its cadence and says so; a clamp is reported; each degenerate request bends or is a no-op with its line as V06 §3.3.2 states (a span of 0, of −1, of a third of a week; a cadence of 0 and of 2.5 weeks; points unsorted, repeated and in the past; `perYear` −2; a rate that overflows; a target of −10) and never yields a non-finite target or a 0 ÷ 0; refused on a dossier-bound document with the what-if offer; `from: founding` on an existing document bends to "Start a new town small" (a new document, the present one byte-identical); on a standalone neighbourhood document the time card is absent and `advance` and a skeleton's `history` block bend to none with the line "a neighbourhood alone has no history yet — open it in its town to advance time", while `forkAt` and the timeline work; Stop keeps the folded epochs and writes `stoppedAt`; the group undoes as one step by its checkpoint; after a save and a reload the group undoes to the pre-group digest (rebuilt from a keyframe), truncating in an unshared document; in a shared document the undo appends an `undo` event, keeps the group in the log, and lists another author's later dependent edit; the preview's end state equals the committed end state, and an accept on an unchanged head takes the preview's folded state byte-identical to a re-fold; an Accept after edits that raise the estimate (hand-placed accesses added on the preview's islands) folds at the re-estimated cadence, inside the comfort level; **the comfort level** (V06 §3.3.2, V06 §6.8): a request whose estimate exceeds `advance.budgetMs` folds at the smallest cadence that fits — the same cadence on every host and in a replay of the log, its epochs' weeks at it — its one line naming the cadence chosen and every epoch's `EpochReport.advance` carrying it and the cadence asked; a 500-year METROPOLIS request with three islands and the hand-placed cap folds, never refused or shortened | exact |
| T-V6-24 | performance | V06 §6's rows on the reference hardware as targets (item 119 (f): its bars T119-1 – T119-5, §13.2, are taken by V12's T-V12-50 and V09's T-V9-79; this test is the volume's own measurement, read beside them): each row reported target met or target miss, a slower row only with its recorded gain, the interactive rows of V06 §6.4 unchanged; **the comfort level** (V06 §6.8): an `advance` of 1, 10, 100 and 500 years — held, growing 1 % a year and falling 1 % a year — and a history-first generation of H-HISTORY, H-REFOUND and a metropolis grown from its founding over 300 years, each at every rung's band top and at the metropolis cap, the sky layer off and on, timed from the click to the complete result (V12's `wait.advanceTime`, `wait.historyReplay`); **a dossier catch-up** (V06 §6.8 (6)) at CITY and at METROPOLIS, the sky layer off and on — of 20 years carrying 200 dossier events, of 100 years carrying 1 000 (V08 §6's ≈ 10 a CITY year) and of 100 years carrying 20 (a quiet span), and for the over-budget branch of 100 years carrying 5 000 at the METROPOLIS cap — timed inside §12's waits for a dossier change applied and an open from SettlementForge, its cadence and estimate reported | every row reported against its target (a miss a declared target miss, D-18); every wait's p95 ≤ 10 000 ms but the over-budget fixture's (below), its measured time at most its estimate plus its reserve (else the cost rows rise, V06 §6.7's fallback) — a catch-up's, on the three catch-up fixtures at CITY and at the METROPOLIS cap, within the catch-up's budget on an open map and inside an open from SettlementForge, its events absorbed one batch per epoch (V08 §6's absorb-with-epochs row, this path's own change under §12.10's R12-31), a fixture past it failing the release until that path is changed again, never a declared miss (§12.10's R12-31); on the over-budget fixture (one epoch over the span with its events' term passing the budget) the one-epoch fold, every dossier event at its own week, with its F-BUDGET-TIME report, never coarser or shortened; every catch-up's dossier facts met exactly at its last epoch; progress within 1 000 ms of the click for every wait over one second |
| T-V6-25 | statistics | cadence independence (item 76 (5); T76-1's per-year clause): the same 100-year trajectory at 13, 52 and 520-week cadence gives towns whose household count, built area, ruin share and walled share agree; the share of households housed by the overflow ladder agrees at every common epoch week; no tent belt at any cadence of H-100's +1 % a year while crowding capacity remains; the catacomb extent agrees | within ± 10 % on 100 seeds; overflow share within ± 2 percentage points; 0 tent belts; extent within ± 10 % |
| T-V6-26 | hook (wiring) | every registered strategy has a phase for every step it must run — `'grow-by-stage'` for its nine base steps, `'history'` for every step of V06 §3.2 — and every product override names a registered phase; every participant id of V06 §3.2's table is registered by its package **and every registered participant is in the table** (`village.density` and `village.pins` included); every product's `records` names a registered `EpochPlacement`; every `ProductEpochRows` member a product declares is read by the decline or hinterland step; every `EpochInputs.events` entry kind the port or the replay writes has its reader; every `EvolutionTable` row is read by a phase or V06 §6.8's estimate (a source scan), every class carrying a replaceability and every ladder row a duration per direction and replaceability as the ladder phase reads them (T31-8); every new record, field, op and edit kind has its registry row, its renderer row, its export mapping and its lifecycle row (§13.2's path-completeness test extended); every `ChronicleKind` has a template (the item 110, 111, 113 and 114 kinds included); every row of V06 §1b's dossier trace names a field the port's digest carries and a phase that reads it; every `HistoryEventRow` effect has its reader (V06 §3.20.2); the `raisedWays` step has its phase, `sky.clearance` its registration, `repairRaised`, `repairRetaining`, `wearWall` and file f item 291's members their registry, renderer, export and lifecycle rows, `detail.suppress` a reader for each of its five kinds, the `landfall` candidate its report and chronicle rows | 0 missing |
| T-V6-27 | hook | dossier-bound: no spontaneous hazard (an `adjust` to `minor` or `full` refused); every mapped calamity strikes at its targets' centroid and its targets are struck in place, never relocated; on a copy of H-DOSSIER, a fire calamity carried by an absorb after one that applied its target's F5 record: at its epoch the target stays `ruined` with no op on it, its fire spreads from it to its live neighbours, and its deaths are in that epoch's burial need (that clause from E8, which builds the calamity deaths in the need, V06 §3.18.2 (3)); and, on a second copy, two late calamities carried by one absorb past the last epoch's week `W₀` (§4.11 *The clock* (4)) sharing a target — struck at `W₀` + 1 in their events order, the shared target struck once and counted by both; an unmapped calamity is reported and changes nothing else; a calamity with no severity band reads `moderate`; every engine change's cause is a rule or a dossier fact (the report's causes); no dossier-backed use closes or goes unplaced at any batch (§5.3's row); a rejection lapses at the first epoch whose population target has moved past the roster tolerance (± 5 %) from the one it recorded, a drift inside it lapsing nothing, and an undo of a lapsing epoch outside the port's session `host:port` (an advance on a what-if copy of the fixture) restores the hold (T20-2's epoch clause); an `undo` naming a port epoch, with or without a dossier change, returns F-EDIT and changes nothing (T20-6's epoch clause) | 0 violations on H-DOSSIER; exact on its two copies |
| T-V6-28 | hook | the hinterland: surplus fields step down the fallow ladder farthest-first at their drawn spans; growth re-takes pasture and commons before S12a opens new fields; wildwood is never re-taken | exact |
| T-V6-29 | property | a 500-year soak of alternating growth and decline: every §5.3 invariant holds after every batch; plot counts stay within the ladder's bounds; the digest is stable across replays; at every epoch granularity lies within each band's target ± tolerance and the churn caps hold per kind, district and block (T31-2, T31-3); the floor's bars hold over the soak — no rung-1 or rung-2 event moves a plot's frontage edge or shrinks a shell toward a poorer band, `builtBand` is the new stock's after a building rung 3 and the kept member's after an `amalgamate` that builds nothing, and a rich → poor → rich run with no rung-3 event leaves rings and shells byte-identical (T31-9 – T31-11); the character step's output after every epoch passes T72-1 – T72-9's epoch clauses — the vector recomputed from the saved model equal, a name changed only past the hysteresis or by a rename, every building's prosperity-driven state inside its district's band range, every household an epoch places inside its district's written range | 0 violations |
| T-V6-30 | hook | participants: each is called at its step in (order, id) order — `sky.clearance` at `afterGrowth` order 50, after `hood.fabric`; an erroring participant is isolated and reported; the island and underground laws' ops commit in their step (V05 §3.15, V04 §3.10); on the sky fixture a CITY dropped below 10 000 inhabitants loses its islands over their dwell spans — waning, settled, fallen — never in one epoch (T8-6) | exact |
| T-V6-31 | statistics | growth reads as historical: over H-100, while the extramural households number fewer than 2 × `growth.ribbonMaxHouseholds`, the share of extramural buildings within 100 m of a gate road stays in MFCG's ribbon band (§4.4's ribbon row: 71–85 %), falling only once suburb stages grow; walled towns add circuits only under threat | the share in [0.6, 0.9] at every such epoch on ≥ 90 % of seeds; 0 circuits below `walls.threatMin` |
| T-V6-32 | hook | the overflow ladder never leaves a household unhoused: a population jump of +40 % in one epoch on a frame with no free land houses everyone (tent belt) and reports it; every informal cluster the overflow ladder or a stage makes over epochs gives each structure its own door on a footpath reaching an access edge, keeps the fire-gap minimum and the households per structure within its row and capacity, and stands on no plot whose geometry floor is the middle band or above, in no district whose band range excludes the squalid band and in no wall strip (T70-1 – T70-4 over epochs) | 0 unhoused; 0 violations |
| T-V6-33 | hook | dwellings only after access (item 109 (j) (4); item 113 (e)): on H-VOID, zero dwellings in an `unexcavated` or `lost` cavern or ruin cluster after every batch; a cluster whose last open path `under.fade` seals turns `lost` in that batch, is vacated in the same batch and its households re-housed at `siting` the same epoch; when a later epoch's dig or excavation refinds it, it reads `accessible` and may take dwellings again | 0 violations; 0 households left in transit |
| T-V6-34 | statistics | access grows with the settlement (item 109 (j) (3), (5)): across H-VOID's growth from a hamlet's population, the share of voids with an access rises monotonically with the number of buildings over them (V12's `trend` on `voidAccessible`); every access carries its cause with the epoch's seq; a lineage draws its dig once per void kind in its life across replays, plus once for each wing V02's mutator adds over a void | monotone (V12's trend bar); 100 % causes; exactly one draw per (lineage, void kind, added-wing key) |
| T-V6-35 | hook | overlap access (item 109 (j) (3b)): a sewer extension crossing a sealed ruin chamber at a shared depth yields a breach link whose lifecycle seq is the epoch's, and makes that chamber and every void linked beyond it accessible; at different depths no link (bar the row's shaft chance); the sewer's course is unchanged by the ruin | exact on the fixture |
| T-V6-36 | statistics | depth keeps secrets (item 109 (j) (5)): at every METROPOLIS epoch of H-METRO, the sealed share of voids deeper than `DigRule.reachM` is at least `DigRule.sealedFloor` (V12's `floor` on `voidSealedDeep`) | ≥ the floor on ≥ 95 % of seeds |
| T-V6-37 | hook + statistics | caverns and ruins at any tier and a distinct ruin over time (item 109 (j) (1), (c)): caverns and ruins are present at every rung of a growth from 1 500 to 120 000 (and at volume 7's rungs when it is registered, H-VILLAGE); at every tenth epoch of H-100 on H-VOID, the ruin differs from the town as it then stands in block size, grid regularity and orientation by V12's distinctness bar; the ruin's plan changes only by decay, excavation and collapse; excavation by demand fires at most once per epoch and only within `excavate.reachM` | present at every rung; distinct at every sampled epoch; exact |
| T-V6-38 | property | the catacomb ratchet (item 109 (k) (4), (6)): V12's `exactMonotone` on each complex's `extentFloorM2` across every epoch of H-100, of 50 random trajectories and of H-METRO, across the replay epochs of H-HISTORY, and across Regenerate, a Re-derive from S1, New random on the catacomb system and an upgrade replay (V12's row for item 109 (k) (6) registers this test) | 0 decreases |
| T-V6-39 | hook | catacomb growth per epoch never exceeds the span-keyed cap; on a stagnant fixture (a foundation blocking the frontier) the fill rises while the extent holds, and growth resumes by least disruption when the plot above is demolished; on a rank-held fixture (a secondary complex at 0.9 × the primary) the same with `blockedBy` `rank`; a closed cemetery freezes its complex (no growth, no fill change) and its reopening by a church-family use on the same plot resumes it | exact |
| T-V6-40 | hook | the catacomb count and sources over epochs, at every batch of H-100, of 50 random trajectories and of H-DOSSIER: (a) no complex is founded while the count is full, and at TOWN at most one is ever founded — more than one stands at TOWN only after a decline from CITY, each then reported `catacombsAboveCount`; (b) every complex's source is a cemetery (churchyard, burial ground, monastery burial face, extramural cemetery) or, founded at CITY or METROPOLIS, a quarry ossuary — zero under a church, a crypt or a precinct without burial ground; (c) the primary lies under the cemetery that serves the most burials (past the hysteresis) and is the largest complex, or else grew by its full cap in that epoch | 0 violations |
| T-V6-41 | hook | links re-bind (item 105 (a)): after a provider closes, every former consumer is bound to its nearest live provider at the end of the same epoch | 0 stale links against a fresh S10b binding |
| T-V6-42 | hook | the relaxation pass (item 105 (f)): on the loop fixture, the epoch's relaxation stays within `relaxPasses`, the second pass moves fewer members than the first, every move stays inside its district, byte-stable across replays | exact |
| T-V6-43 | hook + statistics | split sites over epochs (item 105 (h)): split pairs appear only past the class's compiled `profile.split.threshold` (V11 §2.3; the web's `splitThreshold` its default) and never in the parity presets; a merge-back (below the threshold minus `uses.splitHysteresis`) leaves the shop's plot vacant; an author's merge-back declaration holds at every epoch; closing the institution closes both; undo restores both; with V11 §3.7.4's `splitEnabled` set false by a table edit mid-history, every generated pair merges at the next `uses` phase (cause `merge`, within the `use` cap, the rest the epoch after) while a declared split stands, and no pair opens until the switch is on again | exact |
| T-V6-44 | goldens | the web's and the spread's no-op pins, `item105.web` and `item107.spread` (H-100, registered by V06's E4 seat on V12 §3.7.8's engine): with V11 §3.7.4's web off form applied an epoch is byte-identical to the history without item 105, and with T107-4's cells at 0 too, to the history without items 105 and 107 | byte-identical |
| T-V6-45 | hook | ladders over epochs (item 108): on H-DOSSIER's COUNT record, the members lie inside the range at every epoch, rise monotonically across the growth phase and fall across the decline without going below the range's minimum; no ladder pair is double-counted at any batch (no generator use of a covered class); a SIZE record is one building; a promotion and a demotion change the members by least disruption (member `#1`'s building kept where the greater's thing is the lesser's; V08 §3.5.1 (c)); on a `town-1` mutation whose `Hedge wizard` a receipt promotes to `Wizard's tower`, the house is converted in place and no second building stands; a REPLACEMENT whose greater V08 §3.5.1 (d) places new: on a hamlet fixture whose `Wayside shrine` record a `promotedFrom` receipt promotes to `Parish church` at the epoch that brings the village rung, one new church stands bound to the record's key, one churchyard `cross` is laid for the record with no binding row, the roadside shrine pin stands unbound, no `convert` runs on any building, and at every batch the church is counted once and neither pin as a church; on a village fixture whose `Fish market` arrives beside a standing `Fishmonger`, one hall on the market's rim binds the fish market, the fishmonger's key is its alias and its shop keeps its use, unbound (T108-4 over epochs) | 0 violations |
| T-V6-46 | hook | water access (item 106): H-PORT declines to 40 %; after its contraction every quay is reachable through a gate or an open front | 100 % |
| T-V6-47 | hook | barrier closure on a new circuit: H-CLIFF's new circuit has zero wall edges on sheer arcs and its stretches end on tower anchors; the river loop is walled at its neck only; on H-AQUA an aqueduct is met by both a new circuit and a later contraction, each by §2.7's laws (law 1 (1)–(8); its worked example *beneath*) — the trace's line crossing the aqueduct's deck line once, at the aqueduct's level in the form that level gives (over where its channel runs above the wall's top and every span over the band clears it, merged where its channel runs within the wall's height; law 1 (2)), nothing of either record written, the run keeping its own top beneath it (law 1 (7)), no raised way's ends under the wall's line, band or wall strips (law 1 (4); §2.7's laws' *ends*), no station, gate or opening made (law 1 (1)) and no gate, postern or tower in the under-deck strip but in an over crossing whose spans clear it (law 1 (5)), the strips laid as anywhere and the moat passing beneath only where it meets no support, ramp, stair, foot or `vault` span's strip, each crossing of its deck line counted in `walls.raisedCrossings`; its viaduct, which the METROPOLIS circuit meets, crossed under its deck, the band built through its supports (law 1 (3)), the run beneath each standing span and across a support bearing one capped at the lowest soffit there (law 1 (7)), no gate on its deck, its crossing no gate of that circuit's count (gates counted on ground part 0); `wallToWay` of its CITY ring (once the METROPOLIS circuit supersedes it, its fate set to `road` by a hand `setAttr`) and, on a second run, of its METROPOLIS circuit by a hand `convert` after the contraction — the ring road crossing each under-deck strip under a span §4.3 admits, else ended at the strip's edges, no junction with a raised way, the raised ways unchanged; each `wallToWay` run again with the raised ways locked and with them pinned, no `refuse.locked`, and of its CITY ring over the state sweep (§13.2; row W7), the ring road by §2.7's laws (law 1 (1), (8); its worked example the way-and-channel table's row c) read at that state; **later work across a standing raised way** on H-AQUA (takes T110-2's epoch clauses (4), (5), (7) and (8)): an epoch circuit across its standing aqueduct, one across its standing timber elevated road and its contraction across its aqueduct, each run again with the raised way locked and with it pinned — the same outcome, no trace waiting, every station, key, span and state unchanged; an epoch growing a stage over the aqueduct's land and an epoch route re-solved under its viaduct — 0 way corridors over a standing support's ring, ramp, stair, foot or the strip of a `vault` span §2.7's laws read `vault` (law 1 (8)), every crossing under a span §4.3 admits; after the METROPOLIS circuit ran on beneath the aqueduct, a `vault` span in the circuit's band breached, then the span beyond one of its supports breached and that support, both its spans fallen, dismantled, by scripted `DeclineOp`s (as its lapse's salvage would, V06 §3.19.2 (3); E3's ops) — and, on a second run, the timber elevated road deleted by hand: the run whole across each former part and at its own top beneath each fallen span, the circuit's closure unchanged, the delete's undo restoring the cap; then the breached span repaired by `repairRaised` — the run at its own top beneath it, no wall op (law 1 (7)); and, in the cells' own order, an epoch circuit laid across the aqueduct after a span over its planned band fell `ruined` and after a support there was `cleared`, both its spans fallen first and their recorded soffits clearing the ring's top, the seed searched so that the circuit's line crosses the deck line through that support's former ring (§2.7's laws, law 1 (2)) (the aqueduct then locked by the script, so no `raisedWays` step repairs it before the circuit: §2.7's laws, law 2 *Entry*) — the run at its own top beneath the fallen span, the trace through the cleared ring as open ground (V06 §3.7.6 (5)) — and an epoch contraction laid after a support by its planned line was `cleared`, both its spans fallen first and their recorded soffits clearing the ring's top, the seed searched so that the contraction's line crosses the deck line through that support's former ring — the trace through its former ring (T110-2 (7); law 1 (2); its worked examples the crossing table's W1·C3, W1·C5); the epoch circuit across its standing aqueduct over the state sweep (§2.7's laws, law 4; its worked example the crossing table's row W1 at an epoch; T110-2 (4)); the CITY ring's pathway opening its gates (V06 §3.7.2 (1)) beside its standing aqueduct and over the state sweep (row W6) — no gate it opens under a road deck; and on an H-AQUA variant whose CITY ring has a gate under an aqueduct span that clears it and the wall (law 1 (5)), the pathway opening it — a junction there, its square laid, the span read `open` while the square lies there, and after the run beneath is dismantled no chamber laid while it does (law 1 (8)) | 0 sheer-arc edges; 0 crossing stations, 0 gates on a deck, 0 gates, posterns or towers in an under-deck strip but in an aqueduct's over crossing whose spans clear them (§2.7's laws, law 1 (5)); 0 wall runs above a road deck's standing span's soffit, at a span or at a support bearing it, and 0 runs capped beneath an aqueduct (law 1 (7)); 0 trace lines, bands or wall strips over a raised way's ends (law 1 (4)) and 0 crossings of an aqueduct in neither of law 1 (2)'s forms; 0 gaps in a band where a raised-way part went; 0 arch vaults in a span §2.7's laws read `open` (law 1 (8)); 0 stations moved, added or omitted and 0 keys minted on a standing raised way, locked or not; 0 way corridors over a standing support's ring, ramp, stair, foot or the strip of a `vault` span §2.7's laws read `vault`; exact |
| T-V6-48 | hook | the waterfront over epochs: a rise in sea threat past a quay-wall row gives a quay wall with sea gates within one epoch; a later fall below every row for `walls.neglectAfterYears` neglects it (never demolishes); a walled port gains its harbour-mouth chain the first epoch its mouth is enclosed, anchored on a tower or fort already standing at a mole head; a reclamation that changes a closing shoreline re-evaluates the closure the next epoch; a deleted generated chain or quay wall stays absent for 100 epochs while its condition holds, and undo restores it | exact; 0 duplicate towers at a mole head; 0 re-additions |
| T-V6-49 | hook | the dossier gate (DR2): on H-DOSSIER no circuit or waterfront wall appears that the walls records do not admit, and the walls REPLACEMENT yields one ring the same epoch | 0 violations; exact |
| T-V6-50 | hook | rung crossings: a TOWN without sewers that grows past CITY has `Features.sewers` on and a laid network from that epoch on; a TOWN whose creation draw `u` lies below its law at a later population turns them on at that epoch at any cadence; an epoch whose target crosses a band upward changes the rung's row and grows the frame by §3.2 (9)'s batches, every entity outside the growth's region keeping its address and every face outside it its ring, owner and nested faces (T81-1) | 100 % of seeds; exact |
| T-V6-51 | hook | products (V07): with volume 7 registered, H-VILLAGE hands up when the target reaches 1 575 and down when it falls below 1 425 (V07 §2.1's fold) through the product overrides; a target alternating 1 480 / 1 520 never changes the product (a 1 440-person town runs the base product's phases on the TOWN row) and one alternating 1 400 / 1 600 changes it at every epoch, each a whole hand-off; a town handed down grows no underground element (every inherited system in V04's maintenance mode, a catacomb stagnant with `blockedBy` `'rung'`); at a village epoch the church's and the manor's strike weights carry V07's persistence rows and the hinterland steps by V07's slack, order and cap; with the town product alone it clamps at 1 500, reported; on H-DESERT: every retirement is a `retireWay`, a hollow way struck a second time is `effaceWay`d to `decayed` and never struck a third time, no way carrying an entry, approach or landing is ever retired and no retirement leaves a gate, a frame exit or an occupied plot without a path (at every batch), and in the rise every hollow way bounding a face that tier (5) cuts is reopened by `reopenWay` before the cut — at the village rungs and after the hand-up alike; at every batch of the rise, 0 occupied plots whose only access runs over an `abandoned` or `decayed` way — a toft reoccupied, a house platform rebuilt, a vacant plot built or a close infilled (tiers (0)–(4), V07's (6v)–(8v)), and a use opened or moved onto a house platform or a cleared trace (the use phase's openings, moves, relaxation and split shop) or a dossier-backed use relocated there, on a hollow way has that way, and any hollow way on its path to the ways in use, reopened in the same batch; at a village epoch a `cloister` opening — a roster member in the `uses` step; a record through the product's `records` placement in the `dossier` step — takes a plot joined with its vacant neighbours up to `claimArea.cloister` at its band, or V07 §3.12 (c)'s outside plot, never a smaller plot, a record placed in the epoch it arrives; a `cloister` record added at a village epoch whose district's `geometry` cap that epoch's earlier batches have spent still takes its joined plot in that epoch — its joins in the event's `EditBase.disruption`, the district's `geometry` count in the churn ledger unchanged by them, the event reported over budget where they pass the `dossier` row's budget and never refused — and the same record on an absorb without an epoch does the same; every participant runs at every epoch and gates itself: after H-VILLAGE hands up, `village.density` runs at the base-product epochs while the superseded `VillagePlan` stands (its `afterField` ops committed, the old core's density raster re-derived on its recorded inputs), and at a TOWN epoch `village.plan` and `village.pins` return no ops, the epoch's digest equal to that of a run with them unregistered | exact |
| T-V6-52 | property | households: across every epoch of H-100, H-VOID and a sky fixture, ground + underground + sky households equal the epoch's target at the epoch's end, and no household is in transit after any epoch; on H-VOID, an epoch that opens an access fills F6's new dwellings by relocation only (the total unchanged, ≤ `voidDwellings.share` of the district's poorest band), and a clearance epoch (the undercity shrinking, a pier founded over a lived chamber) re-houses every vacated underground household inside the participant, none in a tent while ground capacity exists; a phase's `displaced` row naming a household not in its building is dropped and `demandTaken` above the delta clamped, each reported | 100 %; 0 in transit |
| T-V6-53 | hook | the why answers persist: the four providers' answers (a moved use, an enceinte with its runs' materials, a district's prosperity with its shade and water, a plan) are identical before and after a save, a load and a rebase, at a TOWN and at a village rung | exact |
| T-V6-54 | hook | the base hooks scheduled: a burn of ≥ 60 connected buildings or a flood above the rows raises the ground at the row's chance (exact on forced draws); a passage whose rear plots stay vacant for their span is sealed, and regrowth reopens it before reoccupying its plots | exact |
| T-V6-55 | hook | crypts over epochs, at every batch of H-100, of 50 random trajectories and of H-DOSSIER (whose see moves and returns): wherever a cathedral use is live its building has a crypt, and that crypt is the largest ranked crypt (author-declared crypts excepted, each reported); a church mutated to the cathedral carries its crypt from the batch its occupy step applies; the former cathedral, still a church, keeps every vault, its capped bays as undercroft, and they regain the crypt role when the see returns; zero catacomb sources lie under a church | 0 violations |
| T-V6-56 | hook | the crypt join, on H-CHURCHYARD: the join's uniform is fixed per (church, complex) pair and gives the same answer whether the growth that reaches the crypt happens at an epoch or at a regeneration, across replays; a success yields one crypt access whose cause's event is the epoch's seq; a refusal never changes; the access follows its host's closures when the church decays | exact |
| T-V6-57 | hook | generated raised ways over epochs, at every batch of H-METRO (TOWN to METROPOLIS), H-100 and H-AQUA | 0 new generated raised ways at a TOWN or village-rung epoch; each generated way carries its reason key and its why rows (the reason's values and the gate); each is within its kind's cap and the rung's total at its founding epoch; the epoch that crosses into CITY may found one; 0 households left unhoused or put in a tent by a raised way's clearing, and none in transit after the epoch; each way founded at an epoch has the stations and pier rings item 244's support step lays on its course (the same stations when its course is re-solved unchanged), no pier above `maxPierM` for its kind, its deck at least the clearance above every crossed part-0 way, and a candidate whose course the step drops — or whose solved course is a single station — reported in `raised.waited` with its `u` unchanged (V06 §3.19 (5)) |
| T-V6-58 | hook | a removal holds: on a METROPOLIS fixture, delete a generated viaduct, an elevated road and an aqueduct; then 100 epochs of growth, a Regenerate (keep), a New random of each crossed district, a save and a reload, a decline below CITY and a regrowth to METROPOLIS; the delete's dry run is V09's `info.remove.holds` line with its kind | 0 of the three re-appear; no replacement is founded while the kind's cap is held by the suppression; undo of each delete restores it at its address; `rerunFrom` with the re-apply keeps each removed; a user's re-add serving the key is counted once; **the other kinds' re-adds**: on H-PORT a generated quay wall and a harbour-mouth chain, on H-TERRACE a generated retaining wall, on H-DECK a generated deck plot, each deleted and then re-added by committing V09 §4.20.3 (4)'s Build it again events (the events volume 10's Put it back takes) — each key served by its re-add: 0 generated duplicates through 50 epochs, a Regenerate (keep) and a reload, counted once and never in `suppressedHeld`, and deleting the re-add puts the original removal back in force; **the history's kept-removed line**: on the same METROPOLIS fixture, an epoch whose viaduct reason passes its gate at the removed viaduct's key reports one `raised.suppressedFired` entry carrying the delete's `seq` and week (the elevated road's and the aqueduct's likewise, the entries in removal order); an epoch whose gate fails reports none — the decline's CITY epochs, the fixture's seed searched so that the viaduct key's `u` lies at or above the CITY chance, and every TOWN epoch, where (C) does not run; none after the delete's undo and none while a serving re-add stands; the list identical after a Regenerate (keep) and a reload (rebuilt by replay) |
| T-V6-59 | property | keys and cadence: the same century to the same METROPOLIS target at 13-, 52- and 520-week cadence; a Regenerate after a history | the same set of raised-way reason keys in ≥ 95 % of 100 seeds, the rest only where `p` crossed `u` between sampled weeks; each reason still live after the history regenerates at the same address; each reason key draws exactly once in its life across replays |
| T-V6-60 | hook | caps across a rise and a fall; declared ways; the hand-down | the count admits no founding over a cap; a METROPOLIS fallen to CITY holding four ways keeps them, reports `aboveCap` once and founds none until below; a declared way uses up its kind's slot; ways carried down to a village (with volume 7 registered) survive with their reasons and states; a released way re-opens its key with the same `u`; a way with no `reason` counts as declared; a reason whose lineage no longer exists reads unmet and its key stays held |
| T-V6-61 | hook + statistics | decline and repair of raised ways, on H-AQUA, H-OASIS and a METROPOLIS decline fixture | disused only as V06 §3.19.2 (2) states; spans fall while supports stand (at every batch, 0 supports cleared while a span beside them stands); the vaults collapse with their span in the same batch; a viaduct carrying a primary is never disused; a raised way with a ruined span whose reason is live is repaired before any new founding and never in the batch that struck it; the H-AQUA aqueduct runs dry in the epoch its spring silts; the H-OASIS aqueduct runs dry in the epoch its spring's flow falls below `spring.aqueductMinFlow` and is repaired once the flow and the need return |
| T-V6-62 | hook | retaining walls, at every batch of a century on H-TERRACE | walls only on levelled ground steeper than `terrace.slopeMin` with steps above `terrace.stepMinCm` (V11); 0 walls deleted by `amalgamate`, `plotToGarden` or a re-cut; every way crossing one is a stair or a ramp, kept through `downgradeWay` and `upgradeWay`; slumps only below terraces abandoned for `retaining.neglectAfterYears`; after a levelling the neighbours' stored plans re-cut inside the epoch event and their unstored plans stale (V03's outside-ground row); a drawn wall never slumps; a decayed stretch is restored intact by a re-levelling of a plot on its high side and by the landfall clearance, a ruined one replaced by a new stretch; a removed generated wall is never made, re-derived or restored again until the delete's undo, a retaining wall the user draws on its chain serving the key meanwhile (V06 §3.19.3 (7)); a `raiseGrade` tombstones every wall in its region; across each re-derivation of a generated wall on H-TERRACE — after an edit that re-levels a unit and at every epoch op that levels — every decayed run's state knots lie within `retaining.settings.stateSnapCm` of their old place, and no knot whose vertex survives is dropped (§2.2 rule 5; file f item 245; `bar.T-V6-62`) |
| T-V6-63 | hook | decks, at every batch of a century on H-DECK | deck plots within the deck's width and budget; 0 `densify` and 0 `back_court` on a deck plot; only uses V11 §3.24.4's per-use `deckOk` admits on deck plots, and a relocated use carrying a dossier crypt record never lands on a deck plot; a deck struck by flood, fire or disuse leaves 0 standing buildings on it and 0 households unhoused; the oxbow's bridge is struck only after the oxbow has silted to marsh; a repaired deck re-offers its plots, and their buildings are new lineages; a removed generated deck plot's slot is never re-offered until the delete's undo, the user's declared plot at the slot serving it meanwhile (V06 §3.19.3 (7)); a deck's condition equals its host's existence at every batch, `Bridge.state` unchanged |
| T-V6-64 | hook | participants and scope | the arch vaults follow their spans at every batch (V04 §3.5.4 (d)'s one wording: every arch vault's key names a span of the way whose `use` is `vault` and which §2.7's laws read `vault` (law 1 (8); its worked example *beneath*) — its chamber open under a standing span, `collapsed` under one whose span or a bounding support is `ruined` or `cleared` (V04 §3.5.4 (d) (2)) — and no arch vault stands where its span no longer exists or is `open` or read `open` (V04 §3.5.4 (d) (3))); `sky.clearance`'s 100 % clause holds after every epoch of a century with islands (V05 §3.15 (7)); an opened close-up crossed by a new raised way has 0 junctions with it and no plot in its strip; `scope.raised` and `scope.levelled` equal the lifecycle entries of the epoch |
| T-V6-65 | goldens | the no-op pins on V12 §3.7.8's engine: `item110.raised`, `.terrace`, `.deck` and `.stepped` (V12 §2.13), each overlay reading V11 §3.24.0's switch table for its family's off form ("every `deck.offer` 0, `terrace.enabled` false" for the deck and terrace families), over H-100, H-AQUA (run without the two raised-way edits its fixture logs — the viaduct row's `editTable` and the declared elevated road — so that the overlay's off form governs it), H-TERRACE and H-DECK | each family's century history byte-identical to its own off-state set (V12 §3.7.8; "the history without item 110" read per family, `roster.specialisations` included); T-V6-44's pattern; switching the rows on is one declared shift naming every golden it moves (V12's rule), and at TOWN and below no way-network digest moves with only the raised-way rows on |
| T-V6-66 | hook | the landfall clearance, on a sky fixture whose island falls on built ground at year 30 with salvage demand around it, covering a field, an arch of a generated aqueduct (a span and a pier), a street grating and a catacomb stair: every struck way member regains its `formerClass` with a re-laid surface, a struck wall member is restored, a struck plot member builds at tier (3); the field's `quarry` face leaves the decoration in the batch that turns it `commons`, and only after the ledger's credit from it is spent and `land.scrubAfterYears`; the span and pier leave it in the batch of the `repairRaised` or `dismantle` that ends their cover; the decoration is tombstoned in the batch that removes its last member, whichever op, and 0 decorations stand at any batch with an empty member list; with no salvage demand nothing is cleared; the grating and the stair return `open` (a secret access `locked`) in the batch their host leaves, and a lived void whose only access was the stair is `accessible` in the same epoch | exact |
| T-V6-67 | hook | foundations at an epoch: a raised way founded at an epoch over a lived cavern chamber, a basement grown over a ruin gallery and a terrace levelled over a cavern each collapse exactly the elements V04's rule collapses at a regeneration of the same state (the same element set), the dwellings on collapsed floors vacated and re-housed in the participant | exact; epoch = regeneration |
| T-V6-68 | hook | a village mine breach: on H-VILLAGE with a forced cavern within `breachM` of a mining use opened at an epoch, the working breaks in when its depth reaches the cavern — one `AccessPoint` at the working, cause `mineBreach` with the epoch's seq, no link record — and never when it does not | exact |
| T-V6-69 | hook | calamity deaths (file f item 573): on H-DOSSIER, a calamity's `deaths` raise the catacomb need of the epoch at its week by each cemetery's `burialShare` of them, never the cap; an event with no `deaths` reads 0 | exact |
| T-V6-70 | hook | **the edge suite** (V06 §3.21, one fixture per clause): (a) a phase returning an op on a tombstoned id, a stray `displaced` row and an over-large `demandTaken` — skipped, dropped, clamped, each reported; (b) a hazard of an unknown kind, a row with a missing param and a `drought` on a map with no spring — reported, defaulted, a no-op; (c) each conversion kind on a tombstoned target and in its no-op case, each with its line; (d) an epoch with nothing to report, and a lost report block rebuilt by replay; (e) an epoch with no change of input — every phase run, nothing re-rolled; (f) decline with no candidate, one leaver and a spent cap, undone and reloaded; on H-DOSSIER, a fall whose leaving household is a locked or pinned dwelling's last — a `relet` down to 0, no `vacate`, the building's state kept; on H-100, a standalone fall whose suffix holds a locked and a pinned household and a protected dwelling's last household — each held and the next unlocked households leaving in their place, and with none left the shortfall counted `households.heldByLock`, no `relet` taking the protected dwelling below one household (V06 §3.5.1 (1), (4), (5)); then a rise past the held households' ordinals — no household id added twice, the passed-over households back, the town's households the roster's prefix to the new target, the members summing to it within the roster tolerance (DR7's bar) — and, run again with a rise that stops below them, the held households counted toward its target, the members summing to it within the roster tolerance (V06 §3.5.1 (1)); and every `DeclineOp` kind the pool applies over H-100's decline undone with its epoch to byte identity (T8-1's epoch form); (g) growth with no residual, a residual of one and a missing band row; (h) a hazard placed outside the frame and a hazard epoch undone and replayed; (i) a reach with coincident knots, an oxbow born under 0.1 ha and a spring on its shore; (j) Works on a target a later op of the epoch tombstoned, retired and then undone; (k) a document with no epoch, `diff(w, w)` and a frame whose images are gone; (l) a raised-way course of one station and a `SpanRef` with equal ends; (m) the hand forms' no-op cases (a strain cleared that is absent); (n) the combinations of V06 §3.21 (b) the other tests do not name — a moat after `wallToWay`, a square across a decline, a frame reached by a stage, steep ground under a new stage at each rung | exact; 0 crashes, hangs, lost data, silent wrong results or whole-map retries |
| T-V6-71 | goldens + hook | **the history replay at generation** (item 113; V06 §3.20; takes T113-1, T113-2, T113-3, T113-6 and T113-7): on H-HISTORY, the present population and every dossier fact match exactly after the replay, walls and street lines stand beyond the present fabric, the church is oversized for the present congregation, the peak is `symbolic` (CITY's range at `history.symbolicQuantile`) and every fact it sized carries `Provenance.symbolic`, and the `HistoryRecord` holds the peak, the epochs with their mapped events (the fire, the plague years and the trade collapse in their epochs) and the buried systems; two runs of the same seed and history are byte-identical, epoch by epoch, on the five engines (T113-2); on H-REFOUND the new settlement's ways run on the old traces where they serve (a share of its way length on old traces above the one-click baseline), it builds on old foundations first, and the ruins older than the burial threshold are buried by `BuriedFormer.lay` and cleared on the ground, younger ones standing; a fixture whose void's last open link a replay epoch closes reads `lost` and one that reopens it `accessible`; with no evidence of a higher tier no peak and no `symbolic` fact; a history with a founding after its present replays nothing, reported; on H-HISTORY with a fire calamity at the present week (its tick the dossier's latest, 0 years ago) and a history event of 0 years ago, both replayed in the last epoch at `W_p`, none dropped (V06 §3.20.2); with `history.replay` false generation is byte-identical to the base (the no-op pin `item113.history`: the history fixtures, registered by V06's E9 seat on V12 §3.7.8's engine); the estimate stays within `replay.budgetMs` by coarsening, the epoch length chosen reported (`ReplayPlan.epochYears`, `replay.epochYears`), and the whole wait inside the comfort level (T-V6-24) | exact; byte-identical; the reuse share above the baseline on 50 seeds; within the comfort level |
| T-V6-72 | hook | **springs and oases over epochs** (item 111 (b); V06 §3.12.1; takes T111-1 – T111-5's epoch form), on H-OASIS: the drought of year 30 multiplies each spring's flow by (1 − its share) and no spring recovers in that epoch; the flow recovers `spring.recoverPerYear` a year after; the spring the wadi's shift moves off is lost (flow 0) and never recovers by rule, its pond silting to marsh after its drawn years; the gardens it fed turn `commons` after their drawn years below `spring.gardenMinFlow` and are re-taken when the flow returns, the grove thinning and re-laid likewise; the prosperity field near the failed spring falls at the next field evaluation and its quarters' bands drift down only through the ladder; a site with no spring — and a wet-climate site with one — shows no change (a conformance clause: byte-identical with the springs' rules removed on a spring-less site); the no-op pin `item111.water` (H-100, registered by V06's E5 seat on V12 §3.7.8's engine): with V11 §3.24.0's `climate` dry cells off, H-100 is byte-identical to its off-state set | exact; byte-identical; byte-identical |
| T-V6-73 | hook | **walls by need and means** (item 114; V06 §3.7.7; takes T114-1 – T114-5 save T114-3's landfall clause, T114-8's and T114-10's epoch clauses, and T110-2 (1)'s foundings across a decayed ring and across a ring and a retaining wall drawn by hand and placement-locked, and (2)'s founded viaduct across a standing ring, its epoch route through a standing gate and its epoch walled stage's spawned primary), on H-WALLS: the low-low run decays fastest, through `worn` to `breached`; the high-low run patches its breaches (every patched run's material a patch row of its kind and culture) and never rebuilds robust; the high-high run rebuilds breaches robust and replaces patches oldest first at ≤ ⌈`rebuildRunsPerYear` × years⌉ an epoch within the `fabric` cap; the low-high run restores its worn runs while in use, and once neglected keeps decaying; a driver held at its threshold for one epoch changes no run (no flicker across two epochs); every run's material and last change are recorded and the `enceinte` provider tells its story; **across a history replay**: on a history-first fixture whose walls are patched in replay epochs and again in live epochs, the means then returning, the rebuild takes every replay-era patch before any live-era one, each era oldest first by `EpochRecord.inputs.week`, ties in chain order (V06 §3.7.7 (3)); **the welded stretch**: on a CITY fixture with an `on_enceinte` castle over 10 epochs at a poor, safe town's drivers and then a poor, threatened one's, the welded stretch's town and bailey profiles are equal at every commit, decayed and patched on the town ring's draws and λ (V06 §3.7.7; T114-10's epoch clause); **beneath a raised way** (T114-3's crossing clause): on H-AQUA's CITY ring held neglected and poor over 20 epochs, the run beneath its masonry aqueduct decaying through `worn` to `breached` as every other run, the aqueduct standing on its own supports (§2.7's laws, law 4; its worked example *unchanged meeting*); the same 20 epochs over the state sweep (§13.2; row W5), the aqueduct's state made before the first epoch — each an *unchanged meeting*, the run's draws as on any run and nothing of the raised way written; **a founding across a decayed ring** (T110-2 (1)): H-AQUA's aqueduct founded at its CITY epoch where the ring's run at its course is `breached` and, on a second run, `dismantled` (by a hand `convert` the fixture logs before that epoch, the ring then placement-locked by the script so that the epoch's `fortification` step, which runs before its `raisedWays` step, repairs no run of it: V06 §3.1, V06 §3.2, V06 §3.7.5; §2.7's laws, law 2 *Entry*: a lock decides no meeting) — *over the band* (§2.7's laws, law 1 (2): over where its channel runs above the wall's top and every span over the band clears it, merged where its channel runs within the wall's height), the gap left a gap beneath the arch, no `repairWall`; and on a third run, its CITY ring drawn by hand and placement-locked by the user before that epoch — *over the band*, no wait, nothing of the ring written (law 2 *Entry*; its worked example the lock sentence); and, on an H-AQUA variant whose CITY ring crosses a stream at a water gate, a viaduct founded at a CITY epoch whose best course passes within a span of that water gate — its fixed-place zone kept clear of the water gate and its gatehouse's footprint (V06 §3.19 (5); law 1 (6) with law 2; its worked example the fixed-place sentence); **a founded viaduct across a standing ring** (T110-2 (2)): on an H-AQUA variant whose viaduct reading's `A` lies inside the CITY ring and `B` beyond it, the viaduct not founded, `raised.waited` at each CITY and METROPOLIS epoch while the CITY ring's trace stands (§2.7's laws, law 1 (3), law 2 (c); its worked example *down before the wall*), and the same with the ring's run at the crossing `breached` by a hand `convert`; V11 §3.24.0's `walls.condition` off form reproduces the rules before item 114 byte for byte (the no-op pin `item114.condition`: H-100 and H-WALLS, registered by V06's E3 seat on V12 §3.7.8's engine) | exact; byte-identical |
| T-V6-74 | hook | **the grandeur ceiling across a rung change** (item 115 (e); V06 §3.8.5; takes T115-1 and T115-2 across a rung change), on H-RUNG at the wealth maximum: at the village epochs no dwelling but the one manor (with a lord or a dossier record) takes an `H`, `U`, court, tower or turret design, and the manor count never rises with wealth; from the first TOWN epoch, buildings new or rebuilt may take the town's designs; every standing grand building of the town is byte-identical (leaf digest) across the hand-down, and every building new or rebuilt after it follows the village ceiling; a plan made at the town rung whose next step falls due at the village rung is re-planned under the ceiling; a dossier-named hall and a hand-drawn grand house keep their designs at every epoch; H-100 at TOWN and above is byte-identical with the ceiling on and off — the `item115.ceiling` registration of H-100 on V12 §3.7.8's engine (V12 §2.13), written by V06's E2 seat | exact; byte-identical |
| T-V6-75 | hook | **crisis looks and the epoch path** (item 122 (a); V06 §3.22; takes T122-1's hand-over clause), on H-DOSSIER with a fire calamity over its quarter with its linked `reconstruction` condition (V08 §3.16 (7) (b), (d)), a `regional_migration_pressure` condition whose newcomers stay, and a condition with no calamity and no population change: (a) the model digest and the document hash identical with crises followed, off and previewed, at every week of every condition (T122-1's hand-over clause) — a look writes no op, event or record; (b) the aftermath only through the epoch: before the epoch that holds the calamity's week no building, household or way differs from the same dossier without that calamity; at that epoch the fire's targets are struck in place (V06 §3.11.1), the deaths and the exodus are in its target and the newcomers who stay are seated by `siting` and `growth`; the condition with neither leaves the model byte-identical; (c) **the frontier**: on a fixture whose standing plan holds no vacancy beyond `decline.turnoverVacancy` and whose next epoch raises the target by exactly the camp's households in an unwalled stage, `frontierFor(doc, n)`'s faces are the hinterland faces that stage builds on; below the quantum, with no reachable land left, at a village rung and on a standalone neighbourhood document, the overflow belt by the gate (at a village rung, by the entry of V07 §5.6 (2)'s main approach road), below the quantum with a rich part that belt and the rich ribbon's plots; a camp with a rich part and a stage, the stage's land and the rich ribbon's plots along its arterial; a camp all of whose households are rich, the ribbon's plots alone; a stage S5a seats only in part, its land and the belt for the households it cannot seat; on S3 (9) (a)'s unserved mesa, the belt's faces nearest the boundary point closest to the growth centre; after an epoch builds on the camp's ground, the next frontier out; zero households, none; every stream's position unchanged by a call; (d) **the yield**: at no week is a building drawn both under the disaster look and under its rebuild's Works stage; a building no rebuild reaches keeps the look until its condition ends; a `decay` Works never ends it, the higher of the look's level and the building's own drawn; a preview over a building under its rebuild's Works draws the look (a preview never hands over: `crisisLookYields` false for a `null` overlay); (e) a look standing when its aftermath epoch folds; the aftermath epoch undone on a what-if copy (the look over the restored buildings); an `undo` naming the port epoch that carries the calamity, F-EDIT (§7.4 *Replay semantics*); a replay epoch (no condition, the history's calamities as events); `frontierFor` and `crisisLookYields` equal across a save and a load, a regeneration and an undo; every rung | exact; byte-identical |
| T-V6-76 | property + hook | **the decay level** (item 123 (b); V06 §3.23; takes T123-4's epoch clause), over H-100's decline and regrowth and on H-DOSSIER: (a) every lineage's `decayLevel` is non-decreasing in the week while its decay run lasts and lies in its state's third; a timber or thatch building reaches each level no later than a stone one of the same state and years; (b) restoration (a `reoccupy` back into use — item 123 (b)'s "reused" — and a hand repair): under a `repair` Works the level falls with the Works' fraction to 0 at FINISHED, the damaged elements leaving in reverse threshold order, the highest first, each element above the present level and at or below its `decayPeak` drawn repaired in patch material until a rebuild (T123-4's epoch clause); with no Works it is 0 from the event's week; a decay run beginning during a repair starts from the level the repair left; a `reoccupy` from derelict with a re-cut, and an `extend` after a repair: 0 added elements drawn repaired, every kept element keeping its peak; a `reoccupy` from derelict whose `repair` Works is still running at its epoch's week: every element its re-cut mints drawn as built in every week of the Works, and from the Works' FINISHED week reading the level as any element; (c) a rebuild, a successor on the trace and a `reused` or `cleared` trace read level and peak 0; a fire's burn reads the decayed third from its week; a `vacate` and a `burn` inside a yearly epoch and a coarse catch-up epoch: the level from the Works' start week, the plan's damage and the exterior's stage agreeing at every week (item 123 (d); the agreement V02's T-V2-59 bars for T123-5); (d) a building generated ruined reads V11's default age at creation and ages from then — read after 50 years of epochs, `D` + 50 years, non-decreasing; H-HISTORY's ruins read the years since the replay epoch that ruined them, a scrub across the replayed past showing each plan aging; both over their plans by V03 §3.11 (V03's T123-1 ids unchanged); with V11's item-123 rows absent, each state's floor; (e) the level is the same for a given seed, week and lineage on the five engines (§6.5), across a save and a load, a regeneration and an undo of the epoch (the earlier history's level), and at a scrubbed frame's week (V06 §3.15.2); no op, draw or digest reads it — the history's digests byte-identical with the level's reader replaced by a constant | exact; byte-identical |

**Parity (B-REF).** Neither reference has time, so the parity bars are the static ones: with no epoch every golden is
unchanged (§13.3; T-V6-1 and the base's T67-5), and the parity presets create no Works and no hazards and run no replay.
The **growth parity** metric reads the reference that owns each subject's form: a town grown by epochs to population `P`
is compared with the one-click town at `P` (item 9: size set by population) — building count, built area and the share of
plots per band within ± 15 % — its **walled share** reported at every tenth epoch of H-100 under threat 0.5 with the bar
[0.5, 0.95] (a history drives it below the one-click town's MFCG-anchored 0.88 until circuits fire; the deviation is
declared, §4.4 *Stages and the walled share*), and its suburb stages with FTG's configured suburb stage
(`research/findings/ftg-docs-params.md` §1.3 *District-stage parameters*, §1.4 *Suburb-stage parameters*) by regime share.
FTG's standing abandoned stock in its poorest pools (the same file, §3.3 *Dependency graph*) is kept over epochs by
`decline.turnoverVacancy` (T-V6-7). The growth parity adds **raised-way presence per kind**: a history grown to `P` and the
one-click city at `P` agree within ± 15 % prevalence over 200 seeds, the history's excess — ways kept after their reason
lapsed (V06 §3.19.1 (1)) — a declared deviation; neither reference has raised ways, so no reference parity row exists.
Every threshold without a reference source is §13.7's kind, recorded with its provenance.
=== END ===
