# Verify agree-layers — round 6 (r6t)

> PENDING FABLE REVIEW — opus seat `coherence/verify-agree-layers-r6t`; agreement between units (principle (10)) across
> model, pipeline, rendering, V04, V05 and V07, after assemble-r6 (commit `db26bb9`: base `f39f1c30…`, V04 `fefd0cd4…`,
> V05 `a0dd3b65…`, V07 `46dfede9…`).

PROGRESS (lane `coherence/verify-agree-layers-r6t`, 2026-10-01)
- P0 brief read whole; round-5 findings (VAL-R5-01 – 04) read; adjudication-r6 R6-01 – R6-11, Part H (model, pipeline,
  rendering, V04, V05, V07 and their END lines), Part P read; assemble-r6 §§ 1–2, 9; repair-r6 headers of the six members: done
- P1 round-5 findings re-checked against the live text, END lines at both ends: done (all four closed)
- P2 round-6 hunks in scope re-read subsection by subsection (diff `b3f83a0..db26bb9`: base 76 hunks, V04 21, V05 5, V07 12;
  §2.7's two tables compared row by row with R6-02's text): done
- P3 matrix gaps hunted; candidates judged; report and result: done — 7 issues (0 blocker, 3 major, 4 minor)

## 1. Inputs

The brief, whole (ROUND-6 NOTES, NEW OWNER RULES 114–116 and ORCHESTRATION NOTES included). `verify-agree-layers-r5t.md` and
its result. `adjudication-r6.md`: R6-01; R6-02 whole (behaviour changes, (M1)–(M11), both tables, the attack list, the
equivalence, every End); R6-03 whole; R6-04 – R6-11; Part H for this lane's six units and their END lines; Part P
(PRB6-01 – 19, the four exceptions); Part I. `assemble-r6.md` §§ 1, 2, 2.1 and 9. The headers of `repair-r6-model`,
`-pipeline`, `-rendering`, `-V04`, `-V05` and `-V07`, with their HAND-OFFS. The live text: every round-6 hunk of the base
in §2.1, §2.7, §2.9, §4.1, §4.3, §4.4, §4.5, §4.8, §4.9, §4.11, §4.13, §8.2, §8.4, §8.9, §8.11, §9.5, §11.1, §11.2, §11.6,
II.7.6 and the §13.2 and §13.8 rows that name a member's test; V04 ## 0, §1.2, §1b.2–3, §2.6, §3.5.0, §3.5.4 (d), §3.10,
§3.11 (UE33, UC18), §4.1–§4.4, §4.6, §5.2, §5.6, T-V4-62, T-V4-63, T-V4-80, T-V4-82, J-V4.96; V05 §3.16 (4)–(5), T-V5-14,
§8; V07 W74, §3.4, §3.5a whole, §3.12, §3.12a (4), §3.17's row, §4.5, §5.1, T-V7-23, T-V7-48, T-V7-69. Readers outside the
members where a member's text depends on them: V06 §2.1 (`EpochScope.raised`), §3.18.1 (6), the `afterGrowth` rows; V09
§5.4; V11 §3.24.2. The agreement matrix (`agreement.json`) for the fifteen member pairs. Scratch:
`scratchpad/coherence/agl6/` (diffs, word diffs, the table comparison script).

## 2. Round-5 findings — re-checked against the live text

| id | disposition (adjudication-r6 Part H) | live text | verdict |
|---|---|---|---|
| VAL-R5-01 | FIX per R6-02, amended (model) | §2.7's support step (3) (l. 2537–2548) holds no station, held stretch or "free-standing" clause; the hand-off down is the crossing table's row W9 (l. 2706), *unchanged meeting* with C9 "as C2 (V07 §3.12: the standing fabric unchanged)". Its V07 side: V07 §3.5a (4) l. 1612–1613 ("A raised way carried down with the town (V07 §3.12) meets the palisade — the innermost standing enceinte — as it met that enceinte"), §3.12 l. 2312–2316 (stands) | **closed** (both ends) |
| VAL-R5-02 | FIX per R6-02, amended (model) | *beneath*'s *A `vault` span under the wall* (l. 2640–2646) and the span rule's (2) and last sentence (l. 2734–2745). V04 END (V4-1)–(V4-8) all written: §3.5.4 (d) (1) *Lay* and (3) *Remove* (l. 1695–1715), §1b.2's trigger row (l. 328), §2.6's arch-vault row (l. 867), §4.3's crossing-station clause gone and the new wall row (l. 2584–2585), §3.10 (l. 2285–2293), T-V4-62, T-V4-63. No door meets a run | **closed as ruled** (both ends). The ruling left V04's own new hand-off open: VAL-R6-01 |
| VAL-R5-03 | FIX per R6-02 (V07) | V07 §3.5a (4) (l. 1604–1615), §3.17's row (l. 2975), T-V7-48 (l. 3683) and §3.12a (4) (d) (l. 2716–2718) carry Part H's (a)–(d) texts. Two additions inside them (the hand raised road *down before the wall*, the V04 citation) cite outcome names only | **closed** |
| VAL-R5-04 | FIX per R6-07 (V04) | §5.6's lead (l. 2897–2899): "compared from the element's entry week into the plan (§6.3 *Plan damage*'s one comparison; V03 §5.6 (2) (a)–(b);". UE33's E1 (l. 2435): "and under no disaster look (§8.6)". §5.6 (6) (l. 2972) and T-V4-82 (b), (g) conformed too | **closed** |

## 3. Round-6 hunks in scope — what was checked and agrees

* **§2.7's two tables against R6-02.** Every row of the crossing table (W1–W13) and of the way-and-channel table ((a)–(e))
  was compared mechanically with R6-02's text, its "(amended, PRB6-nn)" markers stripped. All eighteen rows are
  identical. The four outcomes, the column descriptions (C1–C13), (6)'s lead, (7) and the span rule match (M1)–(M11).
* **Every citation of the tables in the members names an outcome or row that exists:**
  * the base — 58 mentions, the tables' own definitions in §2.7 among them;
  * V04 — 4 (*beneath* ×3, W1·C6);
  * V05 — 2 (*unchanged meeting*, W12);
  * V07 — 6 (*beneath*, *over the band*, *down before the wall*, row c).

  No member keeps a crossing station, raised gate, wall opening, held stretch, "walled-up" mouth or `bend.wall.held`. The
  only hits are V04's `W_ARCH_VAULT_NO_DOOR` row and VTT text, which are unrelated. No member restates a table in its own
  words beyond an outcome's name, apart from the ruled V07 §3.5a (4) text.
* **The cells naming a member's test** (R6-02 (b) (i)):
  * W1·C6 and W2·C2 → T-V4-63, which now runs both (its circuit case "with that `vault` span breached with its chamber
    first").
  * W12's nine cells → T-V5-14's new passage: C3–C6, C8, C9 (from the later of P6 and V-M3), C12 and C13, plus the
    converse repair.
  * Most V07 cells → T-V7-48: W1·C2, W1·C9, W2·C9, W3·C9's Regenerate, W4–W8·C9, W10·C9, W11·C9, W13·C9 and W9·C12.
  * The exception is W9's other cells (VAL-R6-06).
* **Base against the volumes on the raised-way family.** These agree with the crossing table's outcomes:
  * §4.1's S7 row, §4.3 *Where it may not go* and *Lattice and costs*, §4.4 S5a *Trace* (2), *Outer moats* and S5b;
  * §4.5's casters, §4.8's lead, *Condition at generation* and *Gates*;
  * §4.11's `wallToWay`, carve and frame batches, and II.7.6's *Vaults*;
  * §8.4's heightfield and casters, and §11.1's 3-D and CityJSON rows;
  * V04 §1.2, §1b.2–3, §2.6, §3.5.4 (d), §3.10 and §4.1–§4.6;
  * V05 §3.16 (4)–(5) and T-V5-14;
  * V07 §3.5a (2)–(4), §3.17 and T-V7-48.

  *The cap* is read the same at every reader named in *beneath* ("at a span or at a support bearing it").
* **R6-03.** No member holds `lateCalamities`, a held calamity or "the last folded event". §2.9's `EpochRecord` comment and
  §4.11 *The clock* (1) both read "the greatest week the folded events carry".
* **R6-10.**
  * §2.1's wording rule, §8.2's `StyleSheet.groups` and §8.4's switch sentence agree with V04 §5.2 (7) and J-V4.96
    (`StyleSheet.groups.pins`).
  * V04's and V05's `setLayer` uses are model layers (underground, sky).
  * Crisis marks out of the hit stack: no member text contradicts it.
* **R6-05.** V07 W74, §4.5 and T-V7-69 (e) name V09 §4.21.12 (4)'s five forms; the key names match V09 l. 2203.
* **R6-07.** V04's never-decayed restatements carry "under no disaster look". V05 and V07 hold none.
* **The kernel END at V07.** T-V7-23's frame clause cites §3.2 (9), which holds `Frame.marginShare`'s `vg.marginM` reading
  (l. 3676).
* **`EpochScope.raised`, widened by V06's END (V6-3).**
  * V04 §3.10's reconcile reads the widened scope.
  * V04 §3.5.0's foundations read the narrower subset.
  * V06's own caller text was not conformed (VAL-R6-05).
  * V06's `hood.fabric` row profits from the widening: V01 §3.17.3 (2)'s fabric under a span changes when a wall comes to
    stand over it. No finding there.

## 4. Issues

### VAL-R6-01 — major — HANDOFF-OPEN (DISAGREE) — owner: model

**Claim.** repair-r6-V04's one HAND-OFF, "left open for a ruling; nothing written for it" (assemble-r6 §2.1 and §9), is a
locked arch vault in a `vault` span that a wall comes to stand over. Two binding texts give it two outcomes:

* **V04 §3.11's UC18 (l. 2459)** holds a locked vault against every generator: "a reconcile or regeneration that would
  re-lay, collapse or delete it keeps it — at an epoch reported with E_LOCKED's cause, at an edit's dry run returned
  E_LOCKED". V06 §3.1's protection says the same: a locked or pinned entity is never struck, converted or moved by the
  engine (T-V6-4).
* **The base's crossing table, *beneath* (l. 2640–2646)** says a `vault` span whose under-deck strip meets a wall's band or
  wall strip has "no arch vault in it (V04 §3.5.4 (d) (1))", whatever the runs' condition. T-V6-47's bar is "0 arch
  vaults in a `vault` span under a wall" (V06 l. 4170), and T-V6-64's is "none under a wall".

No trace avoids a locked arch vault. The pull and cost field treat only ramps, stairs, feet and an aqueduct's standing
supports as impassable, and the bent group bends only round those parts. So an epoch circuit, contraction or re-anchored
stretch, or a regenerated ring after New random, can be laid across a span whose arch vault is locked:

* by V04, the chamber stands inside the wall's band;
* by the base, it is removed, against the lock.

At an edit both texts already agree: the wall's dry run is refused (§7.1's lock row; UC18's E_LOCKED). The epoch and
regeneration case has two outcomes, and two builders would build different behaviour (J141 major, however rare).

**Required change.** One outcome, in the lock's favour. That direction is item 101 R13 (a pinned or declared thing is
held) and V06 §3.1 — the same rule UC18 states.

* **Model, the crossing table's *beneath*.** After "…so it reads `vault` again, V04 laying its chamber again, once no band
  or strip lies there." add:

  > A `vault` span whose arch vault is locked or pinned (V04 §3.11's UC18) is held against every wall: a trace laid by
  > the `EnceinteStrategy`'s pull or cost field at a regeneration or an epoch treats its under-deck strip as impassable,
  > as it treats an aqueduct's standing supports; a stretch of the bent group bends locally to cross under the nearest
  > span holding none; a trace that can do neither takes its own ladder (F-WALL at a regeneration, `walls.waited` at an
  > epoch); and by hand a wall over it is refused (`refuse.locked`, §7.1's lock row). So no locked arch vault stands under
  > a wall.
* **Model, the C8 column description.** After "a lock or pin never refusing work that passes beneath (§7.1's lock row)"
  add "— the raised way's lock; a locked arch vault holds its span against a wall (*beneath*)".
* **V04's END.** UC18's outcome adds, after "refused E_LOCKED until it is unlocked": "; no wall comes to stand over a locked
  arch vault's span — a trace laid at a regeneration or an epoch keeps clear of its under-deck strip or takes its own
  ladder, and a hand wall over it is refused E_LOCKED (§2.7's crossing table, *beneath*)".
* **V04's END, T-V4-80 (i).** Add: "on a CITY fixture whose aqueduct's `vault` span holds a locked arch vault, an epoch
  circuit across the aqueduct crossing under another span, the vault kept and no wall over it, and a hand `drawWall`
  across that span refused E_LOCKED".
* **Scope's END, T110-2 (4).** Add the same epoch case: "an epoch circuit across a standing aqueduct whose `vault` span's
  arch vault is locked — the trace crossing under the nearest span holding none, the vault kept".

If the program rules instead that a wall's law outranks a vault's lock at an epoch (the vault removed, reported with
E_LOCKED's cause), UC18 and V06 §3.1's protection must name the exception in the same words. That reading must be checked
against item 101 R13.

### VAL-R6-02 — major — DISAGREE — owner: V07

**Claim.** V07 §3.5a (3) *Under a span* (l. 1591–1595) defers to the base: "A tracker crosses the under-deck strip only
where §4.3 *Lattice and costs* admits a part-0 way". It then ends: "a `cleared` span's ground is free, as a `cleared`
support's is ((2))". The base's crossing rule says otherwise:

* **The base's crossing rule** — §4.3 *Lattice and costs* (l. 5743–5747) and the way-and-channel table's lead (l. 2573–2578),
  whose `cleared` clause PRB6-10 wrote this round for supports only:
  * the under-deck strip of a `vault` span (but one under a wall) is impassable whatever the span's `state`;
  * the rest of the strip is crossed only under a span "whose clear width between the standing supports' rings is at
    least the way's width + `clearWidthM` and whose soffit meets *The clearance* … within ± `squareDeg` of square to the
    deck, never along the strip".
  * Only "a `cleared` one's ground open" is said, and of a support's ring.
* **(6)'s lead (l. 2565–2567)** keeps every `vault` span's strip a reservation, with no state exception.
* **V04 keeps the chamber.** A cleared `vault` span keeps its arch vault, `collapsed` (V04 §3.5.4 (d) (2)).

So at a village after V06 §3.19.2's decline clears a span, the two texts diverge:

* **V07's tracker** may cross a cleared `vault` span's strip, over its collapsed chamber, and a cleared `open` span's
  strip at any angle;
* **the base** forbids the first and bounds the second.

S5c and stage 2's ways at a town keep the base's rule. Two builders build different village networks.

**Required change.** V07 conforms to the canonical home (principle (3)). In V07 §3.5a (3) *Under a span*, replace "a
`cleared` span's ground is free, as a `cleared` support's is ((2))" with "a `cleared` support's ring is open ground ((2);
§4.3 *Lattice and costs*), and a span is crossed by this rule whatever its `state`".

If the program rules instead that a cleared span's strip is open ground at every rung, then:

* §4.3 *Lattice and costs* and the way-and-channel table's lead say so (pipeline, model);
* V04 §3.5.4 (d) (3) removes a collapsed arch vault a way comes to cross;
* V07 keeps its clause, citing §4.3.

### VAL-R6-03 — major — MATRIX-GAP (the span's `use` under a wall, model × rendering) — owner: rendering

**Claim.** The crossing table's *beneath* (l. 2640–2646) rules that a `vault` span under a wall "is read `open` by every
reader of its `use` while that band or strip lies there … its record unchanged". The span record keeps `use: 'vault'`
(§2.7, l. 2293; the span rule never reads a wall).

R6-02's END (R3) conformed §11.1's 3-D row ("each `vault` span closed by its end walls but one under a wall, read `open`").
§11.1's GeoJSON row (l. 16034), the GeoJSON exporter's home, was not conformed. It still exports "each span a Polygon of
kind `span` (`use`, `state` — item 244's, absent when standing)".

A builder working from that row serialises the record's `vault` for a span under a wall. One following *beneath* writes
`open`. The two files differ, and the first contradicts the same map's glTF (open, no end walls) and CityJSON (no
`BridgeRoom`). The agreement matrix lists no subject for the span's `use` between model and rendering.

**Required change.** In §11.1's GeoJSON row, replace "each span a Polygon of kind `span` (`use`, `state` — item 244's,
absent when standing)" with "each span a Polygon of kind `span` (`use` as §2.7's crossing table reads it — `open` for a
`vault` span under a wall (*beneath*) —, `state` — item 244's, absent when standing)".

### VAL-R6-04 — minor — DISAGREE — owner: V07

**Claim.** V07 §5.1 (l. 3248–3249) says the shade map is "a `setLayer` toggle, never on by default". The shade map is
V09 §5.4's thematic view, chosen by the per-viewer view key `thematic` at `shade` (§2.9, l. 3500; §4.5, l. 6239 "an
optional thematic view (a shade map, §8.2)"). A view key sends no event, while `setLayer` is a logged edit of a model
layer's `LayerSpec` (§8.4, l. 13677). This round's §8.4 sentence adds "no drawing group by `setLayer`", and §2.1 counts
"the thematic style overrides" among the drawing groups. V05 (l. 228) calls the shade map view "volume 9's".

Nothing the village builds changes: V07 supplies only VS1's `daylight.terrain` with the palisade's shade. The fault is
the description of the control.

**Required change.** In V07 §5.1, replace "a `setLayer` toggle, never on by default" with "shown by the per-viewer view key
`thematic` at `shade` (§2.9; V09 §5.4), `none` by default".

### VAL-R6-05 — minor — DISAGREE — owner: V06

**Claim.** R6-02's V06 END (V6-3) widened `EpochScope.raised` (V06 l. 465) to include every raised way "whose `vault` span
a wall the epoch laid, moved or removed now stands over or no longer stands over". V04 conformed its foundation reader to
the old subset. V04 §3.5.0 *At an epoch* (l. 1338–1342) reads "the raised-way piers of the raised ways in `scope.raised`
whose `feet`, `supports` or `spans` the epoch changed". The caller's text was not conformed: V06 §3.18.1 (6) (l. 2603–2607)
still says `Foundations.apply` runs over "the supports of the parts in `scope.raised`".

The function is V04's, so its builder follows V04, and re-applying foundations to unchanged piers finds nothing new. The
two units still state two different scopes for one call.

**Required change.** In V06 §3.18.1 (6), replace "the supports of the parts in `scope.raised`" with "the supports of the
parts in `scope.raised` whose `feet`, `supports` or `spans` the epoch changed (V04 §3.5.0 *At an epoch*; a raised way there
only because a wall now stands, or no longer stands, over its `vault` span takes the arch-vault reconcile alone)".

### VAL-R6-06 — minor — HANDOFF-OPEN (cells naming a test that does not hold their case) — owner: V07

**Claim.** The crossing table's row W9, the hand-off down that makes the enceinte the village's palisade (l. 2706), names
T-V7-48 in C3 (a span over the band fallen), C4, C5 (a support cleared or toppled), C6 (a `vault` span breached), C8
(held), C10 (repaired) and C13 (edited by its own op), each "as C2". T-V7-48 (l. 3683) runs the hand-off down only with
the carried-down raised way standing (C2), with its frame growth (C12) and in a later Regenerate. No clause hands down a
CITY fixture whose raised way is in any of those states. R6-02 (b) (i) asks each cell to name a test that runs it. V05
did this for its row W12; V07 did not for W9. The outcome is defined and the same as C2's by construction, so the grade
is minor (R6-01: a test list that omits a case its own cell names).

**Required change.** T-V7-48 adds, after "carried down and meeting the palisade as a standing raised way does;": "the
carried-down CITY fixture handed down again with, before the hand-off, a span over the planned palisade's band `ruined`
and, on further runs, every such span fallen, a support by the band `cleared` and one `ruined`, its `vault` span breached,
the raised way locked, repaired by `repairRaised`, and its Arch spacing edited — each an *unchanged meeting* at the
hand-off (§2.7's crossing table, row W9), the palisade then meeting it as *beneath* reads that state;".

### VAL-R6-07 — minor — DISAGREE — owner: pipeline

**Claim.** §4.13's raised-way row, `wall` cell (l. 9060, R6-02's (P11)), ends "*Rung:* — (defined)", meaning no failure
rung. The crossing table's *down before the wall* (l. 2606–2614) does give one: a road deck whose two ends are fixed (an
elevated road at S6's end, a founded viaduct) is "at generation not built, reported; at an epoch waiting (`raised.waited`)",
and a priced deck that cannot come down is "re-routed by the solver's ladder or not built, reported". In the same row,
the river cell states that rung for `raised_too_long` ("leave out and report (generated); simpler shape (declared,
bent)"). Nothing built changes, since the crossing table governs. The rung column misstates the ladder.

**Required change.** In §4.13's raised-way `wall` cell, replace "*Rung:* — (defined)" with "*Rung:* leave out and report (a
road deck that cannot come down before a standing trace, at generation; at an epoch it waits, V06 §3.19 (5)); simpler
shape (declared, bent: `bend.raised.wall`, `bend.wall.aqueductArch`)".

## 5. Candidates judged and dropped

* **V07's palisade gate rule** ("inside the raised way's under-deck strip, or within `raised.supportClearM` of a support").
  This is wider than *beneath*'s "in the under-deck strip". It is R6-02's own V07 text, and a support's ring lies inside
  the strip, so the extra clause changes nothing.
* **V05 §3.16 (4)'s raised row**, "a wall run beneath it breached by the wall row as any run the footprint covers". This
  is the ruling's (V5-1) wording. The wall row breaches covered length only, which agrees with W12.
* **UE33's E1 second subject** ("an underground none of whose buildings has decayed") lacks "under no disaster look". An
  underground building is in no look's unit (E7; V04 §5.6 (1)), so a disaster look does not reach it.
* **V07 §3.11's "`@layer:*` to the layer toggles".** V04 l. 407 and l. 954 read the sanitation record as setting
  `toggles.sewers`, which II.7.1 rules `never` below TOWN. The two agree.
* **V06's `hood.fabric` over the widened `scope.raised`.** The widening is the reading V01 §3.17.3 (2) needs; see
  section 3.
* **VS3's pull "in miniature" (V07 §3.4)** against S5a's pull with its impassable parts. The crossing table puts VS3's
  palisade in the bent group, and V07 §3.5a (4) bends it locally, so the two agree.

## 6. CONFIRMED versus PLAUSIBLE

**CONFIRMED** (read in the live text at the lines cited, or executed):

* every round-5 closure;
* §2.7's eighteen table rows identical to R6-02's (script `agl6/cmp_tables.py`);
* the 70 mentions of the tables in the members resolve to existing names;
* UC18's "keeps it" beside *beneath*'s "no arch vault in it", with no trace rule for a locked vault;
* V07 (3)'s "a `cleared` span's ground is free" beside §4.3's state-free `vault` strip;
* §11.1 GeoJSON's `use` beside (R3)'s 3-D exception;
* V07 §5.1's `setLayer` beside §2.9's `thematic`;
* V06 §3.18.1 (6) beside V04 §3.5.0;
* T-V7-48's clauses beside W9's cells;
* §4.13's rung cell.

**PLAUSIBLE:**

* that an epoch trace meets a locked arch vault on a common map. Locks are a user's act, so the case is rare, but the
  grade does not depend on frequency (R6-01);
* that re-applying foundations to unchanged piers finds nothing (VAL-R6-05's minor grade). This rests on U-NET and the
  catacomb growth reading `foundationObstacles`; no run was made.

Design files untouched. Doc checks were not run: this seat changes no design text.
