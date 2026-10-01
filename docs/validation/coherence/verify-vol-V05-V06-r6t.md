# Verify V05 and V06 after repair round 6 — lane coherence/verify-vol-V05-V06-r6t

> PENDING FABLE REVIEW — written by opus standing in for the verifier seat; covered by the whole-design retrovalidation (J84).

PROGRESS (lane `coherence/verify-vol-V05-V06-r6t`, 2026-10-01)
- P0 brief read whole (ROUND-6 NOTES, NEW OWNER RULES 114–119, ORCHESTRATION NOTES); round-5 findings (4,
  verify-vol-V05-V06-r5t); adjudication-r6 (head, summary, Part A, R6-02 whole with both tables, its attack, equivalence
  and Ends; R6-03; R6-09; R6-11; Part H · V05, V06 and the model and pipeline rows of VV56-r5-01/-02; Part P): done
- P1 word diffs of live V05 (5 hunks) and V06 (37 hunks) against the pre-round-6 texts (commit b3f83a0): done
- P2 every round-5 finding re-checked against the live text and each END line's second end: done (4 fixed)
- P3 every round-6 block in scope read subsection by subsection, with the partner homes it cites: done
- P4 ids, references, retired terms, phone clauses, review ids, held-calamity census, crossing-table citations,
  document checks, sizes: done
- P5 report, result, LANDED: done

**Scope and method.** This verifies V05 (the sky) and V06 (evolution) after assemble-r6.
* Live V05 has sha256 `a0dd3b65…` (403 128 bytes, 3 089 lines) and V06 `9653164e…` (694 809 bytes, 4 617 lines). Both
  equal assemble-r6's outputs.
* The pre-round-6 texts are commit b3f83a0's (V05 `171db651…`, V06 `6fb1f641…`, assemble-r5's outputs).
* Round 6 wrote 3 V05 blocks (§3.16, ## 7, ## 8) and 17 V06 blocks (## 1b, §2.1, §2.8, §2.10, §2.12, §3.2, §3.6, §3.7,
  §3.11, §3.17, §3.19, §3.21, §3.22, §4.4, ## 7, ## 8, ## 9). I read every changed hunk with its whole subsection.
* I read the partner homes the changed lines cite, at those homes:
  * base §2.7's support step (6) lead, the crossing table (its four outcomes, the column notes and rows W1–W13, l.
    2590–2711), the way-and-channel table (l. 2580–2586), (7) and the span rule;
  * §4.3's route-crossing sentence (l. 5747); §4.11's `wallToWay` (l. 8278–8285) and *The clock* (4) (l. 8531);
  * §13.2's T110-2 (1)–(8) and its runs sentence (l. 18520–18629), the take-over row (l. 18874) and §13.8's T110 row
    (l. 19455);
  * V04 §3.5.4 (d) (1) (l. 1695–1698) and V04's epoch reconcile (l. 2285–2294);
  * V07 §3.12 and §8's V-M3; V12 §2.13's `item110.*` row; INDEX §4–§5.
* Ids outside the round-6 blocks and outside my round-5 findings keep their earlier verdicts.

## 1. Round-5 findings re-checked

| id | owner (r5) | disposition (adjudication-r6) | verdict now | evidence |
|---|---|---|---|---|
| VV56-r5-01 | pipeline | MERGED into VPC-R5-02 (FIX per R6-02, amended) | **FIXED** | §4.11's `wallToWay` (l. 8282) now meets a standing raised way "as a way laid after it (§2.7's way-and-channel table, row c)": its spine is re-routed under the nearest span §4.3 admits, else ended at the strip's edges. There is no junction and no kept stretch. V06 §3.7.6 (5) cites row c. T-V6-47 runs `wallToWay` of H-AQUA's CITY ring (fate `road`) and of its METROPOLIS circuit (a hand `convert`) with the bar "0 way corridors over a support ring, ramp, stair, foot or `vault` span's strip". My §2.7 list addition is row c itself. |
| VV56-r5-02 | model | MERGED into VEW-r5-02 (FIX per R6-02) | **FIXED** | *beneath* now lays the band through every support standing in it, so where one goes "the run stands whole across its footprint". *The cap* reads only standing parts, and a run "beneath a fallen span, a support bearing none or no deck" stands at "its own top". Columns C3–C7 give each state. T-V6-47 runs it on H-AQUA: a `vault` span breached, a support dismantled, the elevated road deleted, with the bar "0 gaps in a band where a raised-way part went". VV56-r6-04 below is a new defect in that clause's script. |
| VV56-r5-03 | V06 | FIX, amended | **FIXED** | V06 §7's H-AQUA (l. 4057–4071) carries Part H's amended text verbatim: the aqueduct *over the band*; the viaduct *down before the wall* from `A` just outside the band; the strength, span, pier and clear-span conditions (V06 §3.19 (2), (5)); and `B` beyond the land the METROPOLIS circuit encloses. T-V6-47 carries (V6-21)'s "its viaduct, which the METROPOLIS circuit meets, gets no gate on its deck, its crossing no gate of that circuit's count (gates counted on ground part 0)". |
| VV56-r5-04 | V06 | FIX, amended (R6-09) | **FIXED** | V06 §8's E3 cell (l. 4231) reads "T-V6-9–11, 46–49, 57–61, 73 (T-V6-11's sky clause at the later of E3 and V05's P6, which builds the landfall)". E5's cell is unchanged, as ruled: the topple clauses on a crossing station are gone with T-V6-11's and T-V6-73's station texts. |

The round-5 concurrences close too. VDC5-04's raised gate no longer exists, so V06 §3.7.2 (1) opens every gate as it
stands, and T-V6-47's bar "0 gates or towers in an under-deck strip" runs the case. VPC-R5-01's "stopped strips" are
superseded: the strips run on (V06 §3.7.1, W68).

**Round-5 findings: 4 re-checked. 4 fixed. 0 persist.**

## 2. Round-6 blocks read

### V05 (3 blocks, 5 hunks; one END line, VM-R5T-02's)

* **(V5-1), (V5-2), (V5-3) are written as R6-02 gives them.** These are §3.16 (4)'s raised row, §3.16 (5)'s member list and
  T-V5-14's "**A raised way over a wall**" clause. No crossing station, raised gate, wall opening or held stretch is
  left in V05.
* **T-V5-14 also gains a passage.** Row W12 (amended, PRB6-13) names T-V5-14 in nine cells, and R5-10, kept by R6-11,
  says a test that names a case runs it. The passage runs W12's other cells (C3, C4, C5, C6, C8, C9, C12, C13) as
  variants of (V5-3)'s fixture, plus T114-3's converse repair.
  * Each variant cites the table and states no outcome of its own.
  * The VILLAGE variant (C9) is timed at the later of P6 and V07's V-M3. V-M3 builds the epoch phases and the hand-offs
    (V07 l. 3737, 3786), and §8's P6 cell and dependency sentence name it.
  * The locked variant is V05 §3.16 (2)'s own rule, which W12·C8 ("as C2") implies.
* **One new defect: the cleared variants.** They run a landfall over a span or support that is already `cleared`. The
  landfall's rows then write it back up to `ruined` (VV56-r6-01). The same row gap lets a `ruined` retaining stretch
  step back up to `decayed`.

### V06 (17 blocks, 37 hunks; four END-line groups and four issues)

* **R6-02's (V6-1)–(V6-25) are each written as the ruling gives them.** These are W68, W79, `EpochScope.raised`,
  `repairRaised`'s comment, `raisedCrossings`, §3.7.1, §3.7.2 (2)–(3), §3.7.4 (4), §3.7.6 (5), §3.7.7 (2), §3.11.4,
  §3.19's lead, §3.19 (5), §3.19.2 (3)–(5), H-AQUA, §7's T110-2 and T114 rows, T-V6-11, T-V6-47, T-V6-73, §8's E3 cell,
  J-V6.91/.114/.140 and §2.12's condition row.
  * Every "(amended, PRB6-nn)" text is in its amended words, the marker left out.
  * Two citations were added beside the ruled text: "J-V6.114" in §3.7.6 (5) and "J-V6.140" in §3.19 (5). Both are the
    decisions those rules are.
* **The other END lines.** VAT5-r5-02's (§3.19's lead), VV78-r5-01's (§4.4's `forkAt`) and VAP-r5-03's (§8's E1 line,
  which agrees with V12 l. 923) are written.
* **R6-03.** §3.11.1 carries VAT5-r5-01's sentence and the hazard order "then — two of one row in one week — in their
  `EpochInputs.events` order". §3.21's hazards row and T-V6-27's two copies of H-DOSSIER run both cases. The
  burial-need clause is timed from E8, which builds the calamity deaths in the need (E8's cell names it). §3.22 (1)
  names a late calamity's epoch by citing §4.11 *The clock* (4).
* **Repair additions beyond the END lines, each checked:**
  * W64, W65, §3.2's reconcile paragraph and T-V6-64 follow V04's lay and remove rules (V04 l. 1695, 2285–2294).
  * `raised.waited`'s comment, §3.17 (9) and §3.21's raised row add the founded road deck's wait (*down before the
    wall*; V06 §3.19 (5)).
  * §3.6 (4) and §3.19's lead now cite way-and-channel row a. The dropped words are the base's own: §4.3 l. 5747 still
    holds "a route's crossing shifts along the strip to the nearest crossing these admit". S8's holes "round its supports
    and under-deck strip" are §2.7 (c)'s words (l. 2588).
  * §7's lead and its new T110-2 founding row (T-V6-73) agree with the base's runs sentence (l. 18628), its take-over
    row (l. 18874) and §13.8's T110 row (l. 19455).
* **R6-02 (b) checks over V05 and V06.**
  * (iii) There are 28 crossing-table and way-and-channel citations (V05 2; V06 26 on 24 lines). Each names an outcome that exists (*over the band*,
    *down before the wall*, *beneath*, *unchanged meeting*), a row that exists (W12; a, c), or the table whole.
  * (ii) No site keeps a station, raised gate, wall opening or held stretch. T-V6-47's bar "0 crossing stations" is the
    ruling's own.
  * (i) Every cell gives one outcome. Rows W5, W6 and W8 name T-V6-73, T-V6-47 and T-V6-11 for raised-way states those
    tests never set up (VV56-r6-03).
  * Row W8's trigger for the arch vault's return names an event that no op makes (VV56-r6-02).
* **New problems in the round's H-AQUA and test text.**
  * T-V6-47's T110-2 (7) script dismantles a support beside a standing span. It also omits the later-laid cases that row
    W1·C5 names it for (VV56-r6-04).
  * H-AQUA holds no `vault` span at either crossing that T-V6-11 and T-V6-47 test (VV56-r6-05).
  * T-V6-73's "`raised.waited` at each epoch" cannot hold at a TOWN epoch (VV56-r6-06).

### Ids, references, terms

| unit | id family | count | duplicates | gaps |
|---|---|---|---|---|
| V06 | T-V6 | 1 – 76 | 0 | 0 |
| V06 | J-V6 | .1 – .141 | 0 | 0 |
| V06 | W | 1 – 94 | 0 | 0 |
| V05 | T-V5 | 1 – 36 | 0 | 0 |
| V05 | J-V5 | .1 – .89 | 0 | 0 |

* **Ids:** none added or removed this round.
* **References:** every `Vnn §x` and bare `§x` in the added lines was resolved against the set's headings and bold
  paragraph numbers. V05 has 8 and V06 has 150, with 0 unresolved. The paragraph citations were checked at their
  targets: V05 §3.15 (4), V06 §3.18.2 (3), §3.19.1 (3), §3.19 (2), (5), V04 §3.5.4 (d) (1), V07 §3.12, §4.11 *The
  clock* (4) and §2.7's support step (6), (7).
* **Text censuses, over the added lines:**
  * retired terms (canon glossary, 35 patterns): 0;
  * review or probe ids and amendment markers: 0;
  * deferral wording: none ("later" is "the later of", "a later calamity", "later work");
  * phone clauses (item 126 (a2)): none in V05 or V06.
* **Held calamity (R6-03):** no `lateCalamities`, held list or "held for the next folded epoch" remains in V05 or V06.

**Document checks** (`doc_checks.py --doc <volume> --heads docs/ARCHITECTURE.md --allow docs/validation/doc-checks-allow.tsv`):

| check | V05 | V06 |
|---|---|---|
| C1 | 0 | 0 |
| C2 | 0 | 0 |
| C3 | 237 hits, 225 unreviewed (unchanged) | 290 hits, 269 unreviewed (291 / 270 before) |
| C4 | 0 | 0 |
| S1 | 0 | 0 |
| S2 | 267 hits, 1 unreviewed (264 / 1 before) | 428 hits, 16 unreviewed (unchanged) |

> WARNING recorded: "reference corpus INCOMPLETE (missing: captures, research/patreon, research/devlogs,
> research/ftg-docs, research/external) - clean-room results are NOT authoritative". These results are provisional.

**Size** (`wc -w`):

| unit | before round 6 | after round 6 | change this round | archive | change against the archive |
|---|---|---|---|---|---|
| V05 | 66 765 | 66 996 | +0.3 % | 79 756 | −16.0 % |
| V06 | 111 647 | 111 727 | +0.1 % | 104 574 | +6.8 % |

The growth is design that the rulings require: W12's test variants in V05, and R6-03's rule and R6-02's texts in V06.
No unit shrank by more than half, so no halving audit is due.

## 3. Owner items in V05 and V06

* **110 (b), (f).** No junction or gate is made on a deck. The aqueduct crosses every wall on its own arch, and a road
  deck comes down before a standing wall. The changes in behaviour listed under R6-02 are the owner's to veto; none is
  raised here.
* **114.** Every run beneath a deck decays and recovers as any run (§3.7.7 (2); T-V6-73).
* **122 (a).** A late calamity reaches the map only through the epoch that carries it (§3.22 (1)).
* **125.** No `HostContext` input was added. A late calamity waits in the dossier only (§4.4).
* **126.** No phone clause.

## 4. Issues (6)

| id | severity | kind | owner | claim (short) |
|---|---|---|---|---|
| VV56-r6-01 | major | EDGE-UNDEFINED | V05 | A landfall over a span or support already `cleared`, or over a retaining run already `ruined`, steps it back up to `ruined` or `decayed`. A released way then counts and is repaired again, and its stone is credited twice. T-V5-14's new cleared variants pass this wrong result. |
| VV56-r6-02 | major | CONFLICT | model | Row W8 and T-V6-11 re-lay an arch vault after `absorbWall` "once the record is dropped". No op drops a cleared enceinte record: V06 keeps it for the provider. V04 re-lays the vault once no band or strip lies there, which is at `absorbWall`. |
| VV56-r6-03 | minor | WIRING | V06 | Rows W5, W6 and W8 name T-V6-73, T-V6-47 and T-V6-11 for raised-way states C3–C13. Those tests set up only C2. V05 ran row W12's cells in T-V5-14; V06 did not run its rows. |
| VV56-r6-04 | minor | NEW-PROBLEM | V06 | T-V6-47's T110-2 (7) script dismantles a support while a span beside it may stand, which V06 §3.19.2 (3) never does. It omits the later-laid circuit and contraction that row W1·C5 names T-V6-47 for. |
| VV56-r6-05 | minor | NEW-PROBLEM | V06 | H-AQUA holds no `vault` span at either crossing. T-V6-11's re-laid arch vault and T-V6-47's breached `vault` span need one. |
| VV56-r6-06 | minor | NEW-PROBLEM | V06 | T-V6-73's founded-viaduct variant bars "`raised.waited` at each epoch". No founding is admitted at a TOWN epoch, and the course no longer crosses a standing ring once the ring is gone. |

### VV56-r6-01 (major, EDGE-UNDEFINED, V05)

**Claim.** V05 §3.16 (4)'s landfall table has no rule for a covered part that is already further down its ladder than
the row's outcome.

* **The wall row has one.** It reads "a run already `breached` or `dismantled` kept, the ladder only stepping down".
* **The raised row (l. 1342) has none.** It writes "`ruined` (item 244's span and support `state`)".
* **The retaining row (l. 1343) has none.** It writes "`decayed` over its covered length".
* **V06 §3.19.2 (4) (l. 2930) makes the step up explicit:** "a landfall ruins the spans and supports it covers whatever
  their state".

So the rows write a salvaged part back up its ladder:
* A `cleared` span or support (its stone taken by V06 §3.19.2 (3)'s salvage) becomes `ruined`.
* A `ruined` retaining run (its stone gone, `RetainingState`) becomes `decayed`.

Each result is wrong:
* **The released way counts again.** V06 §3.19.1 (3) counts a way as standing when "every span standing or ruined,
  none cleared". The released way is counted against the caps again.
* **It is repaired again.** It becomes a repair target for V06 §3.19.2 (5)'s `repairRaised`, although "a dismantled span
  or a cleared support is never rebuilt".
* **Its stone is credited twice.** Its "rubble" is a salvage candidate again, so the ledger takes the same stone a
  second time.
* **The retaining run is repaired.** A `ruined` retaining run made `decayed` is repaired by `repairRetaining` ("a
  decayed stretch back to standing"), though "a ruined stretch — its stone gone — is not restored".
* **The decoration never closes.** A `cleared` member has no op that ends its cover, so the `fallen_island` decoration
  is never tombstoned.

This round reaches the case. T-V5-14's new passage (l. 2562–2565) runs "a span over the run already … `cleared`" and "a
support by the run's band `cleared`" under the landfall. It asserts only "the covered spans and supports by theirs", so
a literal build passes the wrong result. Another builder, reading the wall row's ladder, keeps `cleared`. The two
builds behave differently.

**Required change.**
* V05 §3.16 (4)'s raised row, outcome cell: "`ruined` (item 244's span and support `state`);" → "`ruined` (item 244's
  span and support `state`) — one already `ruined` kept, one already `cleared` (its stone taken, V06 §3.19.2 (3)) kept
  `cleared` and never a member, the state only stepping down as the wall row's ladder does;".
* V05 §3.16 (4)'s retaining row: "`decayed` over its covered length (item 245's state," → "`decayed` over its covered
  length, a run of it already `ruined` (its stone gone) kept `ruined`, the state only stepping down (item 245's
  state,".
* V05 §3.16 (5): "and the covered raised spans and raised-way piers, each by its raised way" → "and the covered raised
  spans and raised-way piers not `cleared`, each by its raised way".
* V05 §3.23's *the landfall* row (l. 1774) adds the input "a covered span or support already `cleared`; a covered
  retaining run already `ruined`" and the outcome "kept as it is, no member" (T-V5-14).
* T-V5-14 (l. 2562–2564): "a span over the run already `ruined` and, on a second run, `cleared`" → "a span over the run
  already `ruined` and, on a second run, `cleared` (kept `cleared`, no member, its way still released, V06 §3.19.1
  (3))"; and "a support by the run's band `cleared`" → "a support by the run's band `cleared` (kept `cleared`, no
  member)".
* **END V06** §3.19.2 (4) (l. 2930): "a landfall ruins the spans and supports it covers whatever their state" → "a
  landfall ruins the spans and supports it covers, standing or already `ruined`, a `cleared` one kept `cleared` (V05
  §3.16 (4))".

### VV56-r6-02 (major, CONFLICT, model)

**Claim.** The arch vault of a `vault` span under an absorbed wall returns at a moment two texts disagree on.

* **The crossing table's row W8 (base l. 2705)** reads "V04 lays again an arch vault the wall stood over once the record
  is dropped". T-V6-11 (V6-20, l. 4134) repeats "once the record is dropped".
* **No op drops a cleared enceinte record.** V06 §3.7.2 (3) (l. 1488–1496) keeps it: "the fortification phase keeps the
  cleared record in its loop — until every run is `dismantled`". Its "cleared record and lifecycle are what the
  `enceinte` provider reads for the clerk's answer" (l. 1497–1499).
* **The rule for the vault itself reads the band and strip.** *beneath* reads a `vault` span `open` "while that band or
  strip lies there, whatever the runs' condition", and V04 §3.5.4 (d) (1) lays its chamber "once none does". Both
  depend on the band and strip, not on the record.
* **`absorbWall` merges the band and strips.** Its strips (band + setback + glacis, `Enceinte.strips`) "re-join the
  blocks beside them … the backs of the plots now meet on the old line" (V06 §2.8, §3.7.2 (3)). So by *beneath* no band
  or strip lies there from `absorbWall`'s commit on.
* **The epoch trigger does not name `absorbWall`.** `EpochScope.raised` (V06 l. 465, W64) admits a raised way when "a
  wall the epoch laid, moved or removed" now stands over its span or no longer does. Whether `absorbWall` is a
  "removal" is not said.

So builders diverge. One re-lays the vault in `absorbWall`'s epoch, by V04's rule. One waits for the last run to be
dismantled, reading "dropped" as leaving the loop. One never re-lays it: the record is never dropped, or the raised way
never enters `EpochScope.raised`. T-V6-11's bar has no event to time it by.

**Required change** (the reading that agrees with *beneath*, the outcome's home):
* Model, §2.7's crossing table, row W8, C2 cell: "V04 lays again an arch vault the wall stood over once the record is
  dropped" → "V04 lays again, in `absorbWall`'s commit, an arch vault the wall stood over (its strips and band merged
  into the blocks, none lies there any more; V04 §3.5.4 (d) (1))".
* **END V06:**
  * T-V6-11: "V04 laying again the arch vault of a `vault` span the old wall stood over once the record is dropped" →
    "V04 laying again, in `absorbWall`'s epoch, the arch vault of a `vault` span the old wall stood over (its strips and
    band merged, none lying there)".
  * §2.1's `EpochScope.raised` comment and W64: "a wall the epoch laid, moved or removed" → "a wall the epoch laid,
    moved, absorbed (`absorbWall`) or removed".
  * §2.8's `absorbWall` comment: "its strips re-join the blocks beside them" → "its strips, the band with them, re-join
    the blocks beside them (no band or wall strip lies on the old line after it, §2.7's crossing table, *beneath*)".
* **END V04:** the epoch reconcile bullet (V04 l. 2286): "a wall the epoch laid, moved or removed" → "a wall the epoch
  laid, moved, absorbed or removed".

### VV56-r6-03 (minor, WIRING, V06)

**Claim.** Round-6 note (6) (b) (i) asks that each cell name a test that runs it, and R5-10, kept by R6-11, says the
same. The base crossing table (l. 2702–2705) names V06's tests in cells whose raised-way state those tests never set
up:

| row | cells | test named | what the test runs |
|---|---|---|---|
| W5 (decay) | C3–C8, C10, C12, C13 | T-V6-73 | its *beneath a raised way* clause, with the aqueduct standing (C2) only |
| W6 (gate opening) | C3–C8, C10, C12, C13 | T-V6-47 | its bar "0 gates or towers in an under-deck strip" (C2's citation); no gate opening beside any other state |
| W8 (`absorbWall`) | C3–C6, C8, C10, C12, C13 | T-V6-11 | its absorb, with "the aqueduct over it standing" (C2) only |

V05's repair met the same rule for row W12 with a T-V5-14 passage. V06's did not, and its sweep is silent on it. The
outcomes are defined (*unchanged meeting*) and nothing built changes, so this is minor.

**Required change** (V06; each variant cites the row, with no outcome restated):
* **T-V6-73**, after "the aqueduct standing on its own supports (§2.7's crossing table, *unchanged meeting*);" add: "the
  same 20 epochs, each on its own run of that fixture, with the aqueduct in each other state §2.7's crossing table's
  row W5 names this test for — a span over the run `ruined` and, on a second run, `cleared` (on a third, one whose
  record reads `vault`); every span over the run fallen; a support by the run's band `cleared` and, on a second run,
  `ruined` with both its spans; the aqueduct deleted by hand; locked; a fallen span over the run repaired by
  `repairRaised`; the deck extended by a frame growth and, on another run, re-spaced by a hand `spanSpacingCm` edit,
  each before the first epoch — every one an *unchanged meeting*, the run's draws as on any run and nothing of the
  raised way written;".
* **T-V6-11**, after its absorb clause: "; the same absorb, each on its own run, with the aqueduct in each other state
  row W8 names this test for (a span over the ring fallen, every span fallen, a support by its band `cleared` and, on a
  second run, `ruined`, locked, a fallen span repaired by `repairRaised`, extended by a frame growth, re-spaced by a hand
  `spanSpacingCm` edit) — each an *unchanged meeting*".
* **T-V6-47** adds: "; the CITY ring's pathway opening its gates (V06 §3.7.2 (1)) beside its standing aqueduct and, each
  on its own run, in each other state row W6 names this test for (a span over the ring fallen, every span fallen, a
  support by its band `cleared`, the aqueduct deleted, locked, repaired, extended by a frame growth, re-spaced) — no
  gate it opens under a deck".

### VV56-r6-04 (minor, NEW-PROBLEM, V06)

**Claim.** T-V6-47 (V6-21, l. 4170) takes T110-2 (7) with a script of its own: "after the METROPOLIS circuit ran on
beneath the aqueduct, a `vault` span in the circuit's band breached and a support by the band dismantled by scripted
`DeclineOp`s (as its lapse's salvage would, V06 §3.19.2 (3); E3's ops)". Two parts fall short.

* **The dismantle is not one the salvage would make.** A trace crosses an aqueduct only under a span (*beneath*), so the
  supports by the band bound the breached span. Only that one span is breached. V06 §3.19.2 (3) dismantles only "a
  support both of whose spans are ruined or cleared", and T-V6-61 holds "0 supports cleared while a span beside them
  stands" at every batch on H-AQUA. The script, as written, leaves a standing span on a cleared support.
  * The base's (7) (l. 18607–18611) avoids this: it makes a span over the band `ruined` and a `vault` span breached
    beside the cleared support.
* **The later-laid cases are missing.** Row W1·C5 (and W1·C3) names T-V6-47 for "laid after the fall, through a
  `cleared` ring as open ground". V06 §3.7.6 (5)'s new "a `cleared` support's ring is neither (nothing stands there)" is
  the epoch rule it tests. T-V6-47 runs only the order in which the circuit comes first. The base's (7) holds the other
  order ("in the cells' own order …"), and only on volume 6's engine.

Nothing built changes; the test does not run what the row and its own words claim.

**Required change.** In T-V6-47:
* Replace "a `vault` span in the circuit's band breached and a support by the band dismantled by scripted `DeclineOp`s
  (as its lapse's salvage would, V06 §3.19.2 (3); E3's ops)" with "a `vault` span in the circuit's band breached, then
  the span beyond one of its supports breached and that support, both its spans fallen, dismantled, by scripted
  `DeclineOp`s (as its lapse's salvage would, V06 §3.19.2 (3); E3's ops)".
* After "the delete's undo restoring the cap" add "; and, in the cells' own order, an epoch circuit laid across the
  aqueduct after a span over its planned band fell `ruined` and after a support there was `cleared` — the run at its
  own top beneath the fallen span, the trace through the cleared ring as open ground (V06 §3.7.6 (5)) — and an epoch
  contraction laid after a support by its planned line was `cleared` — the trace through its former ring".

### VV56-r6-05 (minor, NEW-PROBLEM, V06)

**Claim.** Two clauses new this round need a `vault` span where H-AQUA's aqueduct meets a ring:
* T-V6-11 (V6-20): "V04 laying again the arch vault of a `vault` span the old wall stood over". This needs the span over
  the CITY ring's band to read `vault`.
* T-V6-47 (V6-21): "a `vault` span in the circuit's band breached". This needs the span the METROPOLIS circuit crosses
  under to read `vault`.

Whether a span is `vault` is a draw: the span rule's chance against `span.vaultShare[kind]` × `raisedVaultM` (base l.
2740). H-AQUA's definition does not hold either span (l. 4057–4071), and §7's fixture list names neither case. This is
the class R5-10 and R6-11 rule on: the fixture must hold its case and the fixture list must name it. A builder searches
a seed, so nothing built changes.

**Required change.** V06 §7's H-AQUA: after "on a span over its band (§2.7's crossing table, *over the band*)" insert
"— the recipe's seed searched so that this span, and the span under which the METROPOLIS epoch's circuit later crosses
the aqueduct, each reads `vault` in its record (§2.7's span rule; read `open` while a wall lies under it, *beneath*) —".

### VV56-r6-06 (minor, NEW-PROBLEM, V06)

**Claim.** T-V6-73's new founded-viaduct clause (V6-22, l. 4196) and T110-2 (2) (base l. 18552) both run "an H-AQUA
variant whose viaduct reading's `A` lies inside the CITY ring and `B` beyond it — not founded, `raised.waited` at each
epoch". That cannot hold at every epoch of H-AQUA's 200 years:
* **At TOWN epochs.** H-AQUA runs TOWN → CITY → METROPOLIS → TOWN. At a TOWN epoch no founding is admitted
  (`raised.generatedBelowCity`, V06 §3.19.1 (4)), so nothing waits.
* **After the ring is gone.** Once the CITY ring's trace is gone by its pathway (`wallToWay`), the course no longer
  crosses a standing trace.

A builder narrows the bar to the epochs it can mean, so nothing built changes.

**Required change.**
* T-V6-73: "`raised.waited` at each epoch" → "`raised.waited` at each CITY and METROPOLIS epoch while the CITY ring's
  trace stands".
* **END scope:** the same words in §13.2's T110-2 (2).

**Totals: 0 blockers, 2 majors, 4 minors.** Round 5 had 0 blockers, 2 majors and 2 minors (all four now fixed).
