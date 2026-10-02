# repair-r7x-pipeline — lane coherence/repair-pipeline-r7x (unit pipeline: base §4, §10, PART II, PART III)

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat coherence/repair-pipeline-r7x; covered by the whole-design retrovalidation (J84).

# Block file per the BLOCK PROTOCOL (docs/validation/amendments-c/apply-blocks.py): text before the first block header is
# ignored. Base: docs/ARCHITECTURE.md sha256 561d5541… (assemble-r7w's output); rationale untouched. Each REPLACE body is
# the live subsection with asserted substitutions (each old text matched exactly the stated number of times in its
# subsection and in the whole document; every untouched line verbatim; generator and edit list in the lane's scratch
# folder, coherence/r7x-pipe/gen.py and edits.py). 7 blocks, all REPLACE (§4.1, §4.2, §4.3, §4.4, §4.8, §4.11, §4.13);
# 26 edits — 21 the exact words of adjudication-r7x.md Part H · pipeline (P1–P9), each old and new text checked
# programmatically against that file, and 5 conformations of this seat's R7-01 (2) sweep. 0 RULING REQUEST blocks; no
# J-ROWS or RATIONALE-A block; no volume block.
#
# PROGRESS
# - P1 brief read whole; adjudication-r7x.md read (head, decision table, the root cause and forms F1–F5, Part H ·
#   pipeline P1–P9, every other unit's Part H for an END naming this unit, builders' choices, held notes): done
# - P2 issue sources read (famverify-generation-r7w.md VF7w-GEN-01 – -06; famverify-table-r7w.md VF7w-TBL-01, -02;
#   famverify-tests-r7w.md VF7w-TST-01); §2.7's laws (terms, laws 1–4) read whole; the live §4.3, §4.4, §4.8, §4.13 read
#   whole, §4.1's transactions table, §4.2 S3 (6)–(10) and §4.11 *wallToWay*, *carve*, *Other crossings* read in
#   ranges: done
# - P3 7 REPLACE blocks composed by count-asserted substitutions; R7-01 (2) sweep of the unit: done
# - P4 dry run on a scratch copy, receipts below: done
# - P5 result file and LANDED: done
#
# DISPOSITIONS (adjudication-r7x.md Part H · pipeline) — 7 issues routed by the brief, plus 1 FIX and 2 ENDs the
# adjudication gives this unit: 5 FIX written, 3 MERGED (nothing separate written), 0 VALID CHOICE, 0 INVALID,
# 0 RULING REQUEST
# - VF7w-TBL-01 (major; FIX) — P1 and P3, the root cause: §4.4 S5a *Trace* (2)'s list of a trace's impassables and §4.3
#   *Where it may not go*'s course rule no longer restate law 1; each cites §2.7's laws (F1: "searching only the shapes
#   [courses] §2.7's laws admit … (law 1 (2)–(6), (9)–(11) …, read with their terms; law 2 (a) …)"), so law 1 (4) is read
#   with its term *ends* (the ramps, stairs and feet widened by the strip margin). The adjudication's words, not the
#   finding's added widening (adjudication: one more restated widening is the class this pass closes). Model's halves are
#   M1 – M4.
# - VF7w-TBL-02 (major; FIX) — P1: the citation widens nothing of its own; the line is read with the band and wall
#   strips it carries, and a held building's strip by law 1 (9) with its term — so it is widened once. V06's cost field
#   is V6-1; *beneath* is M4.
# - VF7w-GEN-02 (major; MERGED into VF7w-TBL-02) and VF7w-TST-01 (major; MERGED into VF7w-TBL-02) — closed by P1;
#   nothing separate written.
# - VF7w-GEN-06 (major; MERGED into VF7w-TBL-01) — closed by P1 and P3; nothing separate written.
# - VF7w-GEN-01 (major; FIX; the adjudication's routing to this unit) — P2: S5a's pin rule cites law 2 in its order —
#   (a) moved along its arterial within the pull's search band, (b) its arterial re-routed as law 2 (b) moves a ground
#   way (a carried way as law 2 *Carried way* says), (c) F-WALL's raised-way rung (§5.2), law 2 (c)'s outcome on its
#   path. F-WALL's detection ("an arterial or a carried way") is determinism's D4.
# - VF7w-GEN-03 (minor; FIX) — P4: §4.13's raised-way × wall cell cites law 1 (2)–(11) and its rung names law 2 (c)'s
#   outcome on each path (F-WALL's raised-way rung, F-V-RAISED, `walls.waited`); §4.1's S3 row adds F-ROUTE; §4.8 *The
#   harbour mouth*'s chain is laid at the nearest lawful heads, else not laid, reported. The adjudication's words.
# - VF7w-GEN-04 (minor; FIX) — P3's second item and P5: six way-and-channel-table citations (§4.3 *Lattice and costs*,
#   *Where it may not go*; §4.4 S5b, S5c; §4.11 *carve*; §4.13's river cell) cite §2.7's laws with the table as their
#   worked example.
# END lines of other units' findings naming this unit (adjudication-r7x.md table and Part H): two —
# - VF7w-EPO-01 (V06's FIX; END pipeline P3) — §4.3's course rule cites law 1 (4)–(6) (with (2), (3), (9)–(11)) read
#   with their terms, so an anchor under a clearing arch is barred by law 1 (4); no "an anchor in none" restated.
# - VF7w-EPO-02 (V06's FIX; END pipeline P2) — S5a's pin rule's (c) cites F-WALL's rung, whose ladder cell gives the
#   epoch wait (`walls.waited`; determinism's D5).
# CLASS sites the adjudication names in this unit (root-cause sweep), written as worded:
# - P6 — §4.2 S3 (7): the gate re-solve's trigger "where §2.7's laws admit none (law 1 (1), (4), (5), read with their
#   terms …)"; (8)'s and (9)'s readers read the stretches' "ends"; a carried way's barred gate resolved by law 2 in its
#   order, (c) F-WALL's raised-way rung.
# - P7 — §4.2 S3 (8)'s weld vertex, §4.4 S5a (1)'s anchors and *Water and the waterfront*'s water gates: "where §2.7's
#   laws bar a fixed place [an anchor] (law 1 (4)–(6), read with their terms …)".
# - P8 — §4.4 S5b's `c`: a crossing whose gate the laws bar counts only where S5a moves its pin to a lawful place, its
#   way else re-routed through a gate S5b spawns (law 2 (a), (b), *Not yet built*).
# - P9 — §4.8's S7 lead: a gate's, postern's or tower's footprint "where law 1 (5) bars it", moved to the nearest place
#   the laws admit; a fixed place "where law 1 (4)–(6) bar it".
#
# SWEEP (R7-01 (2) with the forms F1–F5: every further text in §4, §10, PART II and PART III that restates law 1's
# exclusions or law 2's order, or cites them narrower than a text changed here). Grepped the unit's 6 205 lines for every
# line citing the laws ("§2.7's laws", "law 1 (", "law 2 " — 30 lines, each read in context) and for the class's phrases
# ("ramps, stairs and feet", "ramp, stair or foot", "ramps, stairs, feet", "arch that clears", "but under an aqueduct",
# "but where its arches", "save under", "zone", "until both are clear", "the one list", "widened by the wall strips",
# "held building's strip", "F-WALL's raised-way rung", "(a), (c)", "moved along", "moves along", "re-routed through",
# "where law 1 (5) admits", "where law 1 (5) bars", "law 1 (2)–(9)", "–(9)", "first point beyond", "beyond the foot",
# "deck line", "cost field", "search band", "impassable", "under-deck strip", "raised way", "aqueduct"). Five further
# sites, conformed in the same blocks:
# - SW1 — §4.1's transactions table, the S7 row (l. 5713): "(law 1 (1)–(9);" → "(law 1 (1)–(11);" — S7's strips,
#   towers and gates beside a raised way are bound by law 1 (10), (11) too; P4's correction of §4.13's "(2)–(9)" at
#   another reader.
# - SW2 — §4.4 *Outer moats* (l. 6645): "the trace meeting it by §2.7's laws (law 1 (2)–(9);" → "(law 1 (2)–(11);" — the
#   same reader of the same meeting.
# - SW3 — §4.8's S7 lead (l. 8347): "as the laws give them (law 1 (2)–(9); its worked example *beneath*)" → "(law 1
#   (2)–(11); …)" — the same.
# - SW4 — §4.2 S3 (8), the castle's town-side gate (l. 6251): "lies where §2.7's laws admit a fixed place (law 1 (6))"
#   and "(§2.7's laws, law 1 (6), law 2 (a);" → "(law 1 (4)–(6), read with their terms)" and "(§2.7's laws, law 1
#   (4)–(6), law 2 (a);" — F5's citation of a fixed place, as P7 writes it for the weld vertex in the same step.
# - SW5 — §4.11 *Other crossings* (l. 8964): a carve's re-traced run meeting a raised way, "bent where they say (law 2
#   (a), law 3; …), … a run with no lawful shape giving way (law 2 (c))" skipped law 2 (b) (the class's "law 2's order
#   with a step missing") → "bent where they say (law 2, in its order, law 3; …)", the form determinism's D6 gives
#   §7.3's S7 operator row.
# Read and holding (no restatement of law 1's exclusions or law 2's order; each cites the laws or names no wall
# exclusion): §4.2 S3 (7)'s re-solve's deck-edge exclusion and harbour gate (the route solver's operator, citing law 2
# (a)) and "a raised stretch S4 solves … meets it as one (law 1 (3), (6) …)" (its course solved by §4.3's router, whose
# course rule P3 now writes in F1); S3 (9)'s Test (l. 6280: law 2 (c)); S3 (10)'s raised way meeting the moat and canals
# (l. 6298: law 1 (1), (8)); §4.3 *Lattice and costs*' route impassables (l. 6401: a raised way × ground way, law 1 (8));
# §4.3 *Routes* (l. 6415) and §4.8 *Gates* (l. 8383–8384: law 2 *Carried way*, law 1 (1)); §4.8 l. 8393 (law 1 (1)) and
# l. 8398 (towers at anchors, law 1 (6), (11)); §4.8 l. 8355, §4.7 l. 7529 and §4.11 *wallToWay* (l. 8936): law 1 (1),
# (8) with the table's rows; S5d's re-trace (l. 6721: S5a *Trace* (2), law 2 *Carried way*, law 4); §4.5's shading
# (l. 6888: law 1 (7)); PART II's vaults (l. 22842: law 1 (8)); §4.1 S7 row's and §4.8's "a gate plaza cut round its
# supports, ramps, stairs and feet" and "no pier, mole or breakwater rooted on" them (the raised way's reservation,
# §2.7's support step (6), not law 1 (4)'s ends: a gate plaza lies in the wall strips law 1 (4) already keeps off the
# ends); §4.13's cliff cell (an end's ramp keeps its class grade). §10 and PART III hold no family text.
# NOTED, not edited:
# - "The one list" is no longer named in this unit (P1). The only other text naming it, *beneath* (l. 3079), is
#   model's M4, and V06 §3.7.4 (2)'s cost field is V6-1 — each cites the laws in the same words (adjudication). No
#   HAND-OFF.
# - P2's (c) and P6's (c) cite F-WALL's raised-way rung (§5.2), whose detection (D4, "an arterial or a carried way")
#   and epoch wait (D5) are determinism's Part H lines. No HAND-OFF.
# - The §4.8 S7 lead and §4.11 *carve* (l. 8936) still cite "§2.7's way-and-channel table, row (a)" / "row (c)" with the
#   laws in a parenthesis ("a worked example of §2.7's laws, law 1 (1), (8)"); they cite the laws, so Part H's citation
#   rule holds and nothing is written.
#
# RECEIPTS (scratch: coherence/r7x-pipe/)
# - apply-blocks.py dry run on a copy of the live files: 7 blocks found, 7 applied, 0 skipped; audit not OK: 0; headings
#   153 → 153; fences balanced (140 → 140); title block unchanged; rationale byte-identical; 24 163 → 24 163 lines.
# - diff live → patched: exactly the 26 edits named above, on 21 lines — l. 5709, 5713, 6227, 6244, 6251, 6407, 6503,
#   6586, 6602, 6603, 6618, 6645, 6653, 6658, 6693, 8347, 8405, 8954, 8964, 9710, 9712; no other byte moved; every old
#   text gone and every new text present.
# - doc_checks.py (whole document), live: exit 0 — C1 5/0, C2 1/0, C3 1775/0, C4 6/0, S1 0/0, S2 314/0. Patched: C3
#   1777/2, S2 316/0 (every new § pointer resolves; every table row keeps its cell count), the rest unchanged — exit 0
#   with the one proposed row below on a copy of the allow file. WARNING printed: reference corpus INCOMPLETE (captures,
#   research/patreon, research/devlogs, research/ftg-docs, research/external absent in this checkout) — the result is
#   NOT authoritative, provisional.
# - Proposed allow row (docs/validation/doc-checks-allow.tsv, for the assembler's review; the two hits are one text, at
#   §4.3 *Where it may not go* and §4.4 S5a *Trace* (2)):
#     C3	law 1 2 6 9	coherence/repair-pipeline-r7x (proposed): §4.3 *Where it may not go* and §4.4 S5a *Trace* (2), adjudication-r7x P1 and P3 ruled texts, the root-cause citation form F1 "(law 1 (2)–(6), (9)–(11) …)" — numbered law pointers of the citation form Part H's head binds, no reference phrasing; held whole by no corpus file (its 3-grams meet the corpus by chance); no list, table, grammar, palette or identifier
# - Every cited anchor resolves: §2.7's laws, law 1 (1)–(11), law 2 (a)–(c), *Entry*, *Carried way*, *Not yet built*,
#   law 3; *beneath*'s *Where the line crosses* (l. 3057) and **Line and band** (l. 3068–3069); *over the band*; the
#   crossing table; the fixed-place sentence; the bent-group sentence; §5.2 (F-WALL, F-ROUTE); V07 §3.13 (F-V-RAISED);
#   V06 §2.10 (the epoch report's `walls.waited`); V06 §3.19 (5).
# - No review id, deferral word or narration written into the design.
#
# WORDS (principle (9)): the seven subsections 47 154 → 47 030 (−124); the unit (§4, §10, PART II, PART III; l.
# 5574–9722, 15935–16707, 21767–23049) 116 216 → 116 092 (−124, −0.11 %). Sources: RESTATEMENT −284 (the list, the pin
# rule, the course rule, S3 (7)'s trigger and readers, the fixed places and §4.8's S7 lead — restatements of §2.7's laws
# replaced by citations: P1 −154, P2 −20, P3 −46, P6 −21, P7 −33, P9 −10); NARRATION 0; DUPLICATED MECHANISMS 0;
# VERBOSE PROSE 0; and +160 content the findings require (the laws cited at six table citations, +55; §4.13's rung, §4.1's
# F-ROUTE and the harbour chain's condition, +81; S5b's `c` read with law 2 (a), (b), +18; the sweep's citations, +6).
# The unit's irreducible content holds it against the shrink band in this pass, whose fixes are citations.

=== REPLACE ### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker ===
### 4.1 Stage graph, evaluation model, laziness contract, transactions, the worker

```
S0 Blueprint ─► S1 Site ─► S2 Programme ─► S3 Siting, reservations, stage-1 boundary + trace ─► S4 Backbone ─► S5 Stage k (k = 1 … K) ──►
 params, sub-    terrain, L0   roster demand,    centre(s) + plazas, lattice, gate picks,      L1 arterial     S5a boundary + trace + gates (k = 1: S3's trace committed;
 seeds, auto     water, river  plot quotas per   gate routes solved, field T, stage-1          graph: S3's     outer moats carved, k ≥ 2)
 features,       decks,        stage × class ×   contour, gates, castle + its gate, trace;     gate routes     S5b main-road step (new primaries for stage k)
 history         resources,    band              L0 carvings + their decks + ponds; L1         + the rest;     S5c growth of secondaries (regime rules; district scale in walled cores)
                 oases                           barrier faces (plazas, precinct, castle …)    viaducts        S5d capacity check (one bounded top-up)
  ─► S6 Districts, quarters, field pass 1 ─► S7 Wall strips + fortification lines ─► S7b Allocation + district claims ─► SKY (staged) ─► S12a Hinterland siting
     perimeter, grower, typing, quarters,    setback / glacis lines, intervallum,     roster → districts, hinterland,    islands and     field system, outside sites,
     FieldBands; then elevated roads and     gate plazas, castle paths, quays,        sky; claims > 1 block; edge        their ground    decoration sites, crops
     aqueducts (§4.3)                        piers, moles                             orchards → hinterland             landing claims  (no geometry)
                                                                                      (its hook S7c Fabric selection)
  ─► S8 Infill (per district) ─► S9 Corridors (L2; districts + hinterland) ─► S10a Block allocation (its hook S9b Block dispatch after step (i)) + field pass 2 (+ the way-surface rule)
     bent cuts, deep interior, rear lanes (L1);                                ─► S10 (0) Shared-edge bands (eager, both sides at once: wall bands, setbacks, glacis,
     lane ends on bounding spines = seam portals                                   tower and gatehouse parts; 2 m margin bands on the perimeter and shared reservation boundaries)
  ─► per district in the derivation pool, and the hinterland unit (and each sky island's unit) on the generation worker, merged in lineage order:
     S10 Plots (per block; the hinterland's furlongs, plots, driveways, trails, orchards) ─► S10b Placement ─► S11 Site plans + footprints (per block) ─► S12b Greenery (own faces only)
  ─► S12c Character (town-wide, after the merge: each district's character vector, identity and band range, §4.5)
  ─► S13a Names + label candidates ─► S14 Display list ─► S15 Simulation (optional module)
  ─► the tail (stages declared `phase: 'tail'`: the underground layer, II.7; staged), after the first map
     (S13b label placement is view data, computed per zoom stop with the display list, §9.2; never in the model)
```

The hooks S7c and S9b are stage 2's (V01 §3.1; registered at M5); SKY is the sky layer's (V05 §3.1; M6-sky); the
way-surface rule at S10a's end is built at M2b (V01 §3.7.3); the tail is the underground layer's (M6-U). Before its
milestone each is absent and the stages around it are unchanged.

* **Registration and order (COV-VG-VN-002).** Each stage registers a `StageDecl` (§4.12). The pipeline is the directed
  acyclic graph the declared inputs and outputs induce, topologically sorted with the stage id as the deterministic
  tie-break; the base's registrations yield exactly the order drawn above, and a cycle is a registration error caught at
  load. A stage may declare hook points, whose registrations join the host stage's declared I/O (§4.12). A product
  registers its own stage set (`ProductDecl.stages`, §4.12), so a village's density stage before its network or its
  palisade before its roads needs no pipeline edit (PART III). Each growth stage k runs S5a–S5d in order, and the same S5
  runs incrementally for an epoch (§4.11). The **op form** (`StageDecl.txForm`, §3.3) is *callback* for S5c, S8 and S10,
  whose ops read the faces earlier ops made, and *declared* for S3, S4, S5a, S5b, S7, S9, S11 and an edit's inserted
  feature; every other stage (S6, S7b, S12b, the hinterland unit's stages) registers as *callback*, which is always safe.
  **SKY's keys** (V05 §3.1): SKY declares as inputs S7b's outputs (its hooks' included) and as ground outputs two data keys
  of its own, `reservations.landing` (the ground `landing` reservations) and `allocations.landing` (the positioned
  `sky_landing` rows) — never `reservations` or `allocations` — so nothing that runs before it (S7b's `afterGreedy` hooks
  among them) reads what it writes; S8, S10a with its `afterDrivers` hooks, and S12a declare both keys beside
  `reservations` and `allocations`, so the sort puts SKY after S7b and before S8, S10a and S12a. With the islands setting
  off, SKY registers and writes nothing under either key. **The `raised` key** (item 110 (b); file f item 290 (4)):
  the ground arena's parts from 1 — every raised way's deck strip, supports, feet, spans and an aqueduct's channel — read
  as one data key, produced by the commit of any raised part (a declaration, generation or an epoch) and published by the
  declaration layer, so a product's stage may declare it as an input and re-run when a raised part changes. The key's
  value is one `RaisedRead` per raised way — a view derived on read from the way's `RaisedWayRecord` (§2.7) and its raised
  part, never stored — and every reader of the key reads it (V07's village stages among them, V07 §3.5a):

  ```ts
  interface RaisedRead {   // the `raised` data key's value per raised way; derived on read, never stored
    way: Id; kind: RaisedWayRecord['kind'];
    origin: 'declared'|'generated' /* derived (item 244): declared when the way's lifecycle cause is an edit or a skeleton file, else generated — at village rungs one carried down from a CITY epoch (V07 §3.12) */;
    reason?: RaisedReasonKey /* §2.7's: generated ways only (V06 §2.13) */;
    deck: PolygonCm /* the deck's plan footprint: the under-deck strip */;
    supports: { key: number; ring: Polygon; state?: 'ruined'|'cleared' }[] /* §2.7's supports, by their keys: footprints on ground part 0 */;
    feet: [PointCm, PointCm] /* the positions of the ground-part-0 ends of RaisedWayRecord.feet (§2.7) */;
    spans: { a: number; b: number; state: 'standing'|'ruined'|'cleared' }[] /* §2.7's spans, by their bounding support keys; an absent state reads 'standing' */;
    channel?: { unbroken: boolean /* no span ruined or cleared */; delivery: PointCm[] /* the fountain or basin pins and a cistern terminus it feeds (§2.7's terminal and feeds) */ } /* an aqueduct only */ }
  ```
* **Why this order.** (a) Water before roads, every carved water body included: harbour basins, canals, the castle and
  city moats and the hinterland's decoration ponds enter L0 at S3 with the decks their crossings need, so no street is
  laid on ground that later becomes water and no route meets water without a deck (FTG's order, `_critic.md` C12;
  GEO-19); the one later water body, an outer enceinte's moat, is carved by S5a through §4.11's carve path before that
  stage's secondaries grow, when it meets only the arterials through its gates (§4.4). (b) Programme before layout:
  buildings and people are decided before geometry (FTG's demand side), and geometry answers with capacity (O7).
  (c) Large claims before streets: S3's reservations (§4.2 S3 (12)) enter L1 as barrier faces before S4 commits any way
  (MFP-3); claims larger than one block, large institutions among them, are cut out at S7b before S8 cuts lanes
  (§4.5 S7b (3); FTG-3). (d) Walls before the streets they enclose: the first enceinte is one construction at S3, each
  later stage's boundary and trace are fixed in S5a, gates first, before its secondaries grow (§4.4), so a secondary never
  crosses a wall except at a gate and the intramural fabric inherits the wall's direction (MFCG builds its wall before its
  bisection; GEO-18, MFP-2; J-P3). (e) Districts and field pass 1 before infill (the infill's block band is the district
  class's, J-2); S7's wall strips before S8, so no lane is planned through a wall's band and setback; S12a before S10b, so
  the roster's farms, mills and quarries have outside sites to go to (FTG-7); greenery after site plans (it reads yards and
  claims). (f) Every raised part is committed before S7b (1) (§4.3), so allocation and every later stage see it.
* **The laziness contract (LC-2, FTG-1; J-P9).** A stage may run lazily for a scope X (a district, a block, a tile) only if
  its output for X is a pure function of eager upstream state and X's own sub-streams, it reads no other scope's lazy
  output, and it writes nothing outside X. Everything that decides the town's *content* is eager and town-wide: S2's
  roster, S3's reservations, S6's field bands, S7b's and S10a's allocations (S10a writes each district's band range,
  §4.5), S7c's fabric selection and S9b's block dispatch (V01 §3.3, V01 §3.5), S12a's hinterland siting, and S10's shared-edge
  step (0), whose bands lie on L1 edges two face sets share (§4.7; J-I9). The per-district stages S10, S10b, S11 and S12b
  — for every district, the hinterland unit and each sky island's unit — may run lazily or in the pool; they read those
  records and their own sub-stream only and **write only inside their own faces**. S12b is held to the same rule: a
  district plants avenue and street-tree rows only in its own half-corridor strips, and an edge orchard is a hinterland
  allocation row built by the hinterland unit, never by the district (§4.9). So any order of derivation — viewer, worker,
  headless — gives the same model (CI: the derived-complete digest test, §6.5 (9)). S8 is eager: it runs in the generation
  worker, district by district in lineage order, and its only writes outside a district's own faces are the vertices
  where its lanes end on a bounding spine, each a `baseLane` portal in the shared `Seam` record (§4.6, II.1). S12c is eager
  and town-wide: it runs on the generation worker after the pool's merge, reads every district's placements and buildings
  and writes only the districts' derived character records (§4.5), so no derivation order changes it. S13a's names and
  label candidates are eager for every district, a name being drawn only in §6.3's cases; label placement (S13b) is view
  data (§9.1, §9.2).
* **The one-click first map is the complete city LOD (SCL-4).** `generate({seed})` runs S0–S13a eagerly for every district
  and for the hinterland at city-band detail — every footprint with its wings and heights, every quarter and district
  label candidate, the hinterland's fields and the greenery faces — and S14 with S13b builds the city band's first frame.
  Laziness is restricted to what the city band does not draw: yard sub-part detail at district LOD, entrance glyphs, roof
  constructions and hatching, way names and addresses, pins below the city band (an emitting pin that hosts a light is
  eager with its light: `LightSource` records are model data the night view draws at the city band, §4.7 *Light sources*),
  tree instances and crowns, stage-2 close-up detail and stage-3 compositions — each a pure function under the contract.
  No rung shows a preview; first-map times are §12.5's (J-R7); the model digest covers the eager model (§6.2).
* **The quality budget (item 119; J130).** Every stage works to its §12 target, as fast as possible. A stage runs a
  quality path slower than its target only where a `perf.qualitySpend` row names it (`QualitySpendRow`, V11 §2.8d; its
  rows V11 §3.25.8, registry row 106, shipped empty, `calibratable: false`): the row records the stage (its `StageId`,
  §4.12), the use, the target and the measured extra time, the bar the gain is measured by with the gain, and the
  `CalibrationRun` that measured it (V12) — and the extra time is spent only inside the comfort level for one-time waits
  (item 119: ten seconds of total time; §12), never from an interaction budget (§12). With no row a stage runs its target
  path (the no-op pin), so the shipped empty table changes no output. A stage takes a quality path exactly when its row
  is in the table version the document pins (§7.6), so the paths a run took are read from that version, never stored, and
  the stage's §12.4 timing includes their extra time. The bars are §12.10's register rows and T-V11-44 (b).
* **The tail** (V04; staged, M6-U). Stages declared `phase: 'tail'` (§4.12) — the underground layer's (II.7) — run after
  the first map, eagerly and serially on the generation worker in their topological order, before the worker takes any
  queued edit, yielding between stages only to a queued view request. They write no ground geometry: only their reconcile
  stage writes ground uses and household counts, for what the underground could not seat (V04 §3.7a), and their S13a step
  the neighbourhood openings' places (`HoodPlace` records and labels, V01 §3.7.1). The ground's model digest and the root
  model digest are finalised after them; their time is reported as `timings.tail` (§12.4). A replay runs them at the same
  fold position.
* **Transactions: one level per batch (§3.3), listed per stage, with each stage's failure class.** A degenerate result
  (zero length or area, self-touching, collinear, coincident) is refused by the kernel (§3.1's `E_DEGENERATE`,
  `E_BELOW_MIN_EDGE`, `E_SELF_INTERSECT`, `E_INVARIANT` …) and handled by the stage's failure class below on its §5.2 ladder — never a
  whole-map retry; `F-WORK` and, for optional chains, `F-NUM` apply to every stage.

  | stage | its batches, in order — each writes one level | failure class (§5.2) |
  |---|---|---|
  | S1 | L0: first the arena's outer ring — the frame plus its context margin (§3.2 (9)), one closed chain carrying the structural `margin` role on the arena's `Terrain` entity, so every L0 face has a boundary before any water exists — then water faces, shores and banks (a sea or river reaching the arena's edge shares that ring, one edge carrying both roles), islets, oases, and every crossing site's two pinned `deck_end` bank vertices (§4.2 S1 (5)) | F-OUTLINE, F-RIVER, F-CONTOUR, F-SKELETON |
  | S3 | L0: harbour basins, canals, the castle moat, the city moat, the decoration ponds, and the deck bank vertices of every channel it carves · then L1: the **map border** — the frame rectangle of §3.2 (9), one closed chain carrying the structural `border` role on the arena's `Terrain` entity, laid across land and water alike as a deck span lies across its water (no L0 edge is added, §2.2 rule 1) — and the land reservations as barrier faces (§4.2 S3 (12)), independent ops of one declared batch | F-SITE, F-ROUTE (§4.2 S3 (7)'s re-solve of a gate route), F-WALL, F-CASTLE, F-RIVER |
  | S4 | L0, only when F-ROUTE's extra-bridge rung fires on standing water: the new deck's two `deck_end` vertices by two same-level shore splits, nothing cleared (§4.2 S1 (5)) · then L1: the arterial graph's spines, inserted once, each span laid through the deck ends its route uses (those bridges become `built`) · then, on a ground part ≥ 1, each viaduct's raised parts (§4.3) | F-ROUTE |
  | S5, per stage k | k = 1 — S5a L1: S3's trace with its gate vertices · k ≥ 2 — S5b L0, only when F-ROUTE's extra-bridge rung fires on standing water: two same-level shore splits before S5b's L1 batch (§4.2 S1 (5)); S5b L1: the main roads, picked on the stage's boundary (data, no batch); S5a L1: the trace with every arterial crossing on ground part 0, and a carried way's lawful pin, as a gate (§4.4 S5a *Trace* (2)); then an outer moat's carve batches (L1: each arterial's or carried way's crossing made one straight edge between two deck bank vertices, its deck span; L0: the channel, with those vertices as `KernelTx.prepared`; §3.3, §4.11) · every k — S5c L1: growth, then L1: the between-stage prune and trim · S5d: a top-up re-runs S5a's arc and S5c on the rim, each L1 | F-ROUTE (S5b), F-WALL (S5a), F-BUDGET-STAGE (S5d) |
  | S6 | L1: the settlement perimeter chain, then district owners and `district_bound` roles (one batch) · then, on ground parts ≥ 1, the elevated roads' and aqueducts' raised parts (§4.3) | F-ROUTE (a raised part's course, §4.3); a degenerate district face merges into its neighbour (§4.5) |
  | S7, per enceinte | L1: setback and glacis lines (the wall strips), the intervallum, gate-plaza claims, castle paths and inner-ward trace, quays, piers and moles · a raised way it meets met by §2.7's laws (law 1 (1)–(11); its worked example the crossing table's *beneath*; §4.8's lead), a gate plaza cut round its supports, ramps, stairs and feet and no pier, mole or breakwater rooted on them | F-WALL, F-CASTLE |
  | S7b, per district | L1: district claims (`claimSubFace`) | F-SITING |
  | SKY, per island (V05; staged) | on the island's key: L0 — outer ring, rim, the land and void faces, then its water and each access's rim vertex; L1 — the rim strip line, the landing and institution claims · on the ground: L1 — the landing claims (`claimSubFace`) | V05's classes |
  | S12a, S10a, S10b, S12c, S7c, S9b (hooks) | none — decisions and records (field pass 2 is a raster; S12c's character records, §4.5); the hinterland's geometry is written by its unit's S10–S12b | F-SITING (S10a, S10b) |
  | S8, per district | L1: lanes, rear lanes and through-alleys with their T-junction ends | F-CUT |
  | S9, per district and for the hinterland | L2: `corridorUnion` | F-CORRIDOR |
  | S10 | L3, step (0): eagerly on the generation worker after S10a and before the pool's freeze, the shared-edge bands on both sides at once (§4.7 S10 (0)), ending with the rebuild of the L3 static partitions it touched · then per block, in the pool: claims, plots, alleys-as-faces and residue; in the hinterland unit's blocks, §4.9's recipe | F-CUT, F-PLOT |
  | S11, per block | L4: footprints and yard parts (a row's party wall is the plot's shared L3 side line carrying the `party_wall` rows, §4.7) | F-SITEPLAN, F-PLOT (cluster packing), F-SKELETON |
  | S12b, per district and for the hinterland unit | L3: park and grove layouts on its own reserved green faces and residue · then L4: yard-planting parts; avenue and street-tree rows write no plat edge (§2.7 `Greenery.along`) | a layout the kernel refuses is left out and reported (§4.9) |
  | S13a | none (names and label candidates) | F-SKELETON |
  | edits | one batch per operator and level, in §7.3's chain order (§7.1, §7.3); a multi-level conversion is a declared sequence of single-level batches (§4.11); decks as §4.2 S1 (5) | F-EDIT, F-REDERIVE |

  Every committed batch — in generation or in an edit — whose commit record changes a footprint face's rings is followed
  by §2.6's carry for that building before the next batch (J-P47). L0 is written by S1, S3, S4 and S5b (F-ROUTE's extra
  bridge only) and S5a (an outer moat's carve, §4.4); L1 by S3 — the map border first — S4, S5, S6, S7, S7b, SKY (the
  ground landing claims, V05 §3.10) and S8, in that order, and by no generation stage after S9 (J-P46). At village rungs
  (V07 §3.0) L0 is written by S1 and VS1; L1 by VS1 — the map border first — VS4, VS5, S7, S7b and VS6, in that order, and by
  no generation stage after S9; a product may add data keys to a reused stage's declared inputs
  (`ProductDecl.extraInputs`) to hold that order under the stage-id tie-break. S10 never writes L1: a rear or back lane is
  decided by S8's deep-interior rule (§4.6), and a lane a user adds later is a `drawWay` edit through §7.3's S5 operator,
  whose tree scoping re-derives every finer level under it (GEO-25). Static index partitions are rebuilt as §3.3 states,
  S10's step (0) included; work limits count kernel operations (§5.1 (5)).
* **The generation worker, the derivation pool and the hinterland unit (DEF-16; D-18).** The pipeline runs in one
  generation Web Worker; the tile worker and the main thread are §8.9's. The **primary configuration** at every rung adds
  a derivation pool of up to three workers (`min(3, hardwareConcurrency − 1)`) for S10, S10b, S11 and S12b, which run after
  the eager S10a allocation and S10's step (0). Each district runs on its own copy-on-write overlay over a read-only copy
  of the arena frozen after those two eager steps — its typed arrays and lookup tables and every non-empty level's static
  index partitions (L0–L3 at the one-click freeze, L4 too after edits), every dynamic grid empty, the partitions edits left
  dirty rebuilt first (§3.3 step 1; ≤ ≈ 15 MB at CITY) — and the overlays merge in district lineage order with a slot
  remap and their index partitions (§3.3's merge steps); any write outside a district's face set is `E_SCOPE`, and pool
  size 0 runs the same path in the generation worker. Ids need no reserved ranges (§6.3), and the pool makes no
  shared-edge writes (district boundary edges belong to L1 and L2, committed before S10). **The hinterland unit** — the
  hinterland pseudo-district's S10 (furlongs, outside plots, driveways, trails, woods, edge orchards), S10b (outside
  classes and, under §4.9's `fill` farm mode, the farm households), S11 (farmstead and outside site plans) and S12b (ring
  supply, ambient scatter, shoreline band) — runs on the generation worker while the pool runs the districts, on its own
  overlay over the same frozen arena; its faces are the hinterland's L2 blocks, disjoint from every district's, and its
  overlay merges with the districts' in lineage order under the pseudo-district's lineage; from the freeze to the merge
  no other writer touches the arena (J-P27). On the single-worker fallback the hinterland unit runs first, then the
  districts in lineage order. **Other units of the same kind:** each sky island's districts run as a unit of the
  hinterland unit's kind on the generation worker, on the island's own arena, from its `SkyUnitInput` (V05 §2.3; V01 §3.10),
  and a standalone neighbourhood document runs this pipeline on its own outline (V01 §3.10). While a loaded document is
  verified (§2.9 step 3), every edit runs its S10, S10b, S11 and S12b by the pool-size-0 path (§3.3 step 5). Which
  configuration is primary at each size — the pool, or the single worker that is the pre-decided fallback (also on the
  low tier and in hosts that forbid extra workers) — is measured at M1 and M2b by §12.3's rule; pool size 0 gives the
  same model (J-P10).
* **Emulation-first defaults (item 23; J-A23.41).** Every stage rule of this part follows §7.6's emulation rule, its
  reading rule for absolutes and its marker (J-A23.71); §10.2's `RelationRule.extension` and §4.7 S10b's
  `placement.extensionWeight` are the placement family's form of that marker.
* **The countryside is decided with the town and drawn after it (FTG's order; item 26).** S2 demands the hinterland's
  households and its food, fuel and timber with the town's (§4.2 S2; §4.9's farm table), S12a sites them once the town's
  districts are typed and its claims cut (S7b), and the hinterland unit draws fields and woods into the land the
  settlement perimeter leaves after S9 has committed the town's corridors — concurrently with the districts' pooled
  stages, which changes no output (§4.9; J-A26.41).
* **Elaboration by click — the trigger policy over the laziness contract (item 28; J-A28.41, J-A28.42).** The contract
  says what may be derived lazily; the **trigger policy** says when. It belongs to the viewer: `elaborate` — `click` or
  `view` — is a per-user view key (§2.9) that decides only the moment a pure rung is derived, never its content (CI:
  §6.5 (9)'s derived-complete digest, run over click orders too). `click`, the owner's choice, is the default: at city
  zoom the view draws the eager city LOD above — every footprint, MFCG's look; a "plots only" cadastral view is a view
  option of §8.5, never the default — and derives nothing finer until asked. Clicking a neighbourhood derives its
  close-up (II.4) and raises the `wings` rung of its buildings to `current` (§2.8's elaboration record); clicking a
  building raises its `plan` rung to `current`, after `wings` when that is still absent — the rungs are ordered outline →
  wings → rooms → plan (§2.6), so the plan rung enters the lazy list with §2.6's records, §6.1's streams and §8.5's draw.
  `view` derives every visible tile's rungs inside §12's budgets (§8.6's rule for `compose()`). A derived rung is saved,
  then stale until clicked, as §2.8's `ElaborationRecord` states (a stored plan is re-cut inside the changing event
  instead, §7.3, J-A28.72): the cached result stays on view with §8.5's change marker until the next click re-derives it
  from its canonical prior as a least-disruption mutation, never a re-roll (§2.6, §7.3; J-A28.71); viewing never
  re-derives a `current` rung. **Pre-assigned plots:** the eager content decision — a plot's use, class, assignment and
  `Lifecycle.assigned` — is taken before any building geometry: town-wide by S2, S7b and S10a, and per plot by S10b, which
  the first map runs for every district ahead of S11; a plot the dossier or a user assigns is therefore assigned at the
  city level and, as the owner puts it, "just not generated" — its geometry follows on the click.
* **Declarations read ahead — a skeleton's bones (item 101; J-A101.41).** A skeleton file (§11.1), or any document whose
  log opens with drawn declarations, enters them as the log's creation prefix (§7.7 *One path*) in their resolved form —
  a `points` form's shape derived at its dry run and stored resolved (§7.1). The base derivation reads that prefix ahead,
  each declaration by the stage that owns its subject and as a constraint of that stage — the form **Rebuild around my
  drawings** gives drawn constraints (§7.2), here with no rebase — as S2 already reads the prefix's assignments
  (J-A22.74): S1 takes the declared ground strokes and water (`setField` terrain, `drawWater`, `moveCourseKnot`, a lake's
  spring flag) into its terrain and water; S3 takes the declared walls and gates (`drawWall`, `placeGate`) as the
  enceinte's pinned trace and its forced picks, and a declared road's outer end as a destination; S4 and S5b take the
  declared roads (`drawWay`) as fixed routes; S6 seeds a district at each declared quarter (`quarter`, `drawBoundary`) with
  its declared kind and grows it to the declared boundary; S10b takes the declared places (`placeAt`, `assign`) as positive
  placements; the tail's stages (II.7; staged) take the declared tunnels, galleries, chambers, links, accesses and void
  neighbourhoods (`drawTunnel`, `drawChamber`, `addLink`, `placeAccess`, `addUndergroundAccess`, a `quarter` or
  `drawBoundary` on a void part) as held elements, a declared element making its system exist (V04 §4.7). The prefix's
  events keep their log positions as §7.4 states, so the town grows around its bones and one seed replays it byte for
  byte. A declaration a stage cannot honour is bent at its dry run to the nearest lawful one, named in one line with the
  alternatives (item 101 R2); only one that contradicts a dossier fact or a lock is refused (§7.1). A declared thing is
  held — no later derivation or New random moves it (§7.2, item 101 R13).
=== END ===

=== REPLACE ### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace ===
### 4.2 S0 Blueprint · S1 Site · S2 Programme · S3 Siting, reservations, the stage-1 boundary and its trace

**S0 Blueprint.** `Blueprint = { version, seed, size: { rung: Rung /* §1.1 */, population? | areaHa? | buildings?,
tolerance, aspect /* 0.5–2, default 1: frame width ÷ height, §3.2 (9) */ }, intent (§7.7), site request (relief:
'auto'|'plain'|'rolling'|'hilly'|'mountainous' /* item 65; J-A65.49: default 'auto' — the feature table's relief row,
drawn on blueprint.features with the other auto features and recorded in autoResolved; our own weights plain 0.35,
rolling 0.35, hilly 0.2, mountainous 0.1 (calibratable; read under every preset, since S1 (1) scales its amplitude by a
relief class under each); a dossier's site.terrain sets it by §7.7 DR1, a `mountain` terrain being mountainous (item
109 (a)); read by S1 (1), S1 (10)'s geology row, §4.9's farm modes and the terraced-edges column */, coast side / bearing
with two arm rows, river with inflow bearing, islands and mouth, lake, oasis /* item 111: 'auto'|'on'|'off' */, hill, …),
toggles (walls, castle: 'inside'|'on_enceinte'|'outside'|'auto'|'none', castles: 0–2, plaza, temple, harbour, farms,
forests, shanty, greens, waterfront: 'open'|'quay_wall'|'sea_wall', wallPlacement, moat: 'none'|'inner'|'all'|'auto' /*
the innermost enceinte (S3) or every enceinte (outer ones by S5a's carve, §4.4); `auto` resolved by the feature table's
P(moat) row by rung and era to `inner` or `none`; wet only where water reaches it, S3 (10) */, sewers: 'auto'|'on'|'off' /* item 14;
below */ — MFCG's flags kept as intent), circumstances (era /* its row also carries the public-lighting density §8.4's
light rows read (item 68) */, government, biome /* its climate row: aridity, the arid water chances, the water pull and
the sunlight cell (items 102, 111), and the season columns (item 117; J128: `ClimateRow.seasons`, V11 §2.8's
`ClimateSeasonCells` — the winter's severity and the weeks, 0–51 spring first, of leaf colour, leaf fall, blossom, growing, harvest, hay, ice and snow, a band
wrapping the year's end — read only by §8.2's season rows, §11's exports and §7.7's DR42, never by a
stage, so no season changes the model or its hash, item 117 (a)); V11 */, economy, magic: 'none'|'low'|'high' /* item 68: 'none' by default, a fantasy
toggle under D-3; read by §8.4's light rows */, landscape toggles: fertile land, mines, quarries, fishing, logging,
geology: 'auto'|'ordinary'|'soluble'|'volcanic' /* item 65: default 'auto', resolved by S1 (10) */), history?: HistoryHint
/* item 113: a standalone history ("once a city, now a village") — the record the dossier port fills as Recipe.history
(§2.7); read by §4.11's history-first generation */, village?: VillageRequest /* V07 §2.7: read by S0 only when the
routed product is `village`; absent, all-`auto` */, style, assignments, edits }`. Intent expansion and the blueprint's
assignments and edits entering the log are §7.7's; the population chooses the rung and the size within it (§1.1; AM-4),
`LadderRouter` routing a population inside a registered product's range to that product (item 202; §4.12, PART III) and
clamping every other request at the ladder's ends as §1.1 states; the ladder coverage test (§13.1) runs S0 at every
rung's floor, target and top. **Auto features (COV-MFCG-A03).** Every toggle left on `auto` is resolved by a per-rung
**feature table** — P(coast), P(river), P(lake), P(oasis), P(castle), P(castle on the enceinte), P(temple),
P(harbour | coast), P(shanty), P(greens), P(moat) by rung and era … — drawn once from its own concern `blueprint.features` before any other stage
and never redrawn by a later rung, so "Enter" varies the structural features the way MFCG's master switch does; every
auto-resolved value is recorded in the report with its reason (O16 b). **What the base supports (COV-MFCG-Q01):** several
enceintes (§4.8); 0–2 castles (a second castle is a citadel on the outer enceinte, by request or by the METROPOLIS row);
islands, confluences and distributaries (S1); non-circular and polycentric settlements (S3); routed non-radial arterials
(§4.3); generated institutions (S2); multi-line labels (§9); continuous zoom, save and load (§8, §2.9).

**Water in dry country (item 111 (a)).** On a biome whose climate row is arid, S0's water rows read that row: P(river),
P(lake) and P(coast) take the arid row's chances (a river from wetter uplands, a lake, a coast all stay possible), and
P(oasis) is the row's oasis chance, multiplied by its no-other-water factor when no river, lake or coast was drawn (so
an oasis is likelier where there is no other water and still possible beside it); on every other climate row P(oasis)
is 0. A dossier's `oasis_water` makes the oasis exist (item 20; §7.7's DR row for it cites DR1); the user adds or removes
one with T2 `ground`'s lake point-and-level form and its spring flag (§7.1, §7.4). An oasis is water for every rule that
reads water — mills where it falls, the water trades, bathhouses, wells, the aqueduct's supply (§4.3), the island and
underground rules. A sky island's terrain draws no oasis and reads no water pull or climate cell (V05 keeps its own
water).

**S0's sewer feature (item 14; II.7.1).** At TOWN a `sewers: 'auto'` is resolved by the feature table's P(sewers) row —
II.7.1's law of the request's population and the intent's `wealthLevel` — drawn from `blueprint.features` with the other
auto features and recorded in `autoResolved`; `on` builds the network whatever the draw. At CITY and METROPOLIS the rung
row fixes existence on, and a requested `off` hides the underground layer instead, reported in `requestedVsBuilt`
(II.7.1). Below TOWN every value resolves to none (the village rows carry `never`, PART III), a requested `on` reported;
a missing toggle reads `auto`. The resolved value is `Features.sewers`, which every dependant reads from the model (II.7).

**S1 Site (O1; the mechanism that removes whole-map restarts).** A requested feature infeasible on the drawn site is
adjusted inside S1's own ladder (F-RIVER, §5.2).
(1) **Heightfield:** 5-octave fBm (VG's measured character, `_critic-vg-ng.md` V7) with a low base frequency and a
relief-character amplitude (metres by S0's relief class), plus **authored site primitives** from the request (hill,
spur, valley along the river bearing, terrace, cliff, ravine, hollow for a lake or an oasis — VG's idea of authored
mount, hollow and ridge primitives). Heights are stored in §2.3's range and datum; S1 sets `datumCm` to sea level on a
coastal site and to the site's base elevation otherwise (a 3 000 m relief is ordinary). *Mechanism (budget: §12.4):* the
fBm is evaluated on a 32 m grid over frame + margin; the stored raster (at §2.3's resolution per rung) is its bilinear
refinement plus one fine octave inside the built extent; slope queries at 2.5 m go through the `TerrainSampler`'s
on-demand interpolation (§2.3).

(2) **Coast.** From a sea bearing (MFCG's `sea` angle, kept as the request's coast bearing) and an intent (bay / headland /
straight / fjord / islands), one **closed-outline routine** draws the sea polygon. *Arms (COV-FTG-H04):* the base line is
two arms from a point near the town toward two frame edges, each with its own **shape** row (smooth / gentle / sharp: the
lateral amplitude and count of the arm's 3–5 control points, then a centripetal Catmull-Rom through them) and **detail**
row (none / bays / deep bays / rough / jagged: fBm amplitude, frequency, warp strength and, for bays, the count and depth
of indentations) — our own values, calibratable. The base line is displaced by domain-warped fBm under an amplitude
envelope that damps detail near the town (FTG's "ease into detail") → resample → Chaikin. **Simplicity (GEO-13):** the
normal displacement at every sample is clamped to 0.8 × the local feature size on that side (the distance to the base
shape's medial axis, read through `skeleton(rings, 'spine')` (§3.4) as §3.8's `spine` reader with its sampled-medial-axis
downgrade; for an open arm, the distance to the facing arm or the frame), which keeps small islands, elongated ovals (end
radius ≈ b²/a) and fjords simple for any fBm draw; a resampled ring that still self-touches is repaired by a non-zero
union — the component containing the anchor (the town side) keeps the outline's id, and every other loop is typed by
rule (a land loop in the sea above the minimum islet area an `islet`, a water loop on land above the minimum pond area a
`pond`, anything smaller absorbed) and reported (property test: §13.2). **Contours and coast (GEO-14; J-P12):** the
vector coast is authoritative — the raster is lowered below sea level on the sea side, every land cell within two cells
of the shore is raised to at least sea level + 10 cm and every sea cell held at most sea level − 10 cm; contour lines
are not model geometry: their extraction and clip to the land faces are §8.2's relief tier (F-CONTOUR, §5.2), so a
contour never crosses the shore, cliffs and sub-cell spits included (steep-coast and cliff fixtures in the golden
suite). The same routine with a closed base curve makes lakes (from sinks), ponds, oases, islands (a raised closed
curve) and — with `elevationCm` set — **the floating-island outline** of the LAYER hook, which gets its own arena,
`Terrain`, datum and frame (§2.2, §2.3) and may carry its own terrain from the same S1 with a request that echoes the
ground (e.g. a conjured river with the ground river's bearing; AM-2); where it floats is II.6's placement rule, its
occlusion §8.4's `LayerSpec.occlusion`. For a standalone or sky outline the base curve comes from an **outline
template** row, `type OutlineTemplateId = 'star'|'star_round'|'street_strip'|'plaza_frame'|'disc'|'d_shape'|'lozenge'|'crescent'|'spindle'`:
`star`, `star_round`, `street_strip` and `plaza_frame` (item 285's: a standalone neighbourhood document's, drawn by its
fabric, V01 §3.10.2), `disc`, `d_shape` (the D-shape), `lozenge`, `crescent` and `spindle`, scaled to the requested area
(COV-NG-N06); V01's `HoodRecipe.outline`, `TemplateRow.outline` and `hood.kinds` and II.1's
`NeighbourhoodRequest.outlineTemplate` name a row by its id.
**The oasis (item 111 (a)).** An oasis is a spring-fed pond or small lake: its site is the best-scored hollow or fault
line (a relief break) within the frame's middle two thirds, scored on accumulation and low ground; its outline is the
routine's closed curve sized by the climate row's oasis area band, entered as a `WaterBody` of kind `lake` whose
spring point (`WaterBody.spring`, §2.3) is its source; around it S12b plants the grove row and S12a sites the irrigated
gardens (§4.9). A site with no hollow takes the lowest ground cell of that band.

(3) **Hydrology.** Sinks are filled by a bucket-queue priority flood on the integer heights of the hydrology grid
`Terrain.hydro` over frame and margin (16 m at TOWN, 25 m at CITY, 32 m at METROPOLIS; §2.3) with exact flat surfaces —
a filled depression keeps its spill height, never raised by ε — and a depression deeper than the table's lake threshold
is typed a lake; then D8 flow direction and accumulation. **Rivers by descent:** the inlet lies on the arena's upstream
edge (frame + margin; the requested bearing or the highest edge), so the drawn margin shows the river arriving; the
course is traced by steepest descent with a lateral meander term — a Chaikin-smoothed control polyline whose knots sit
mostly on alternating sides, our own construction — and **the terrain is carved to the course**, its bed descending
monotonically to the outfall so no depression is created and the flood is not repeated; after the carve, D8 is
recomputed on the carved corridor cells and their neighbours and accumulation once (≈ 2 ms at CITY), so the river always
reaches the sea, a lake or the frame. Width `w = w0 · acc^0.4`, clamped to the class band (FTG's ≈ 31 m mean river width
at CITY is one calibration point); tributaries by the same rule from secondary inlets. **Bounds (GEO-36):** knot offsets
are clamped to half the control spacing (`river.controlSpacingM`); S1 records the control knots in `WaterBody.controls`
with ordinals in course order (§2.3), the recorded input a `moveCourseKnot` edit addresses (§7.1); a self-touching course
is re-traced with the offsets halved; carving is capped at `carveMaxCm` (400 cm at TOWN and CITY, 600 cm at METROPOLIS)
and a course that would need more is re-routed by F-RIVER (§5.2), never trenched. **Mouths (IMP-9, COV-FTG-H11):**
`mouth: 'estuary'` is a widening width profile (MFCG's delta-river option is a widened mouth, `_critic.md` C15);
`mouth: 'delta'` splits the course inside the delta zone (within the table's distance of the sea, where the bed slope is
below its threshold) into 2–4 **distributaries** at splits spaced ≥ 3 channel widths, each carrying a share of the
accumulation drawn from the `water.delta` stream (each ≥ 0.2), of width `w0 · (share · acc)^0.4`, traced by descent to
the sea without rejoining; a distributary that would meet another merges, and the land between becomes a river island
under (4).

(4) **River islands** (the parity judge's shared repair): a `river: { islands: n }` request adds a branch that leaves the
course and rejoins it after k cells, typing the enclosed land as an `islet` L0 face, **only if** the branch's separation
from the main channel stays ≥ (w_main + w_branch)/2 + the minimum islet width (table: 20 m); otherwise the island is
reported as not built. Mid-channel islets appear at reaches wider than a table threshold with a per-reach probability.

(5) **Crossing sites and decks (GEO-17; J-P44).** One function, `siteCrossings(reaches, bandM, existingDecks)`, sites
crossings: S1 runs it over every reach, S1's water operator (§7.3 (b)) over the re-traced reach only. The narrowest and
shallowest reaches within the search band (the base settings cell `crossing.searchBandM`, V11 §3.1) become crossing
sites, typed `ford` (width < table) or `bridge_site`, with a minimum spacing (FTG's 40 m as the default). Each site is a
**pinned deck**: a bank-to-bank segment perpendicular to the local flow (the course tangent averaged over one channel
width upstream and downstream), its two ends inserted by S1's L0 batch into the shores as the `deck_end` vertices of a
`Bridge` in state `site`, pinned against every later smoothing. S3's decks on the water it carves (S3 (2), (10)) have the
same form and the same two states.
* **A site becomes a bridge only when a way uses it** — as FTG turns only its crossing road proposals into bridges,
  gated by its 40 m minimum distance, and MFCG draws one bridge per street crossing (1–4 per city;
  `research/findings/ftg-docs-params.md`, `profile-mfcg.md`). The way S4 or S5 routes through the two vertices lays the
  span — its own L1 edge between them, carrying the structural `deck` role beside `way` — the `Bridge` becomes `built`
  with that way, and S7 builds its furniture (§2.7, §4.8). No L0 edge crosses the water, no deck splits a reach's L0
  face, and every bridge has one structure (§2.2 rule 7; J-I12). S4 routes to a site's ends as a fixed graph edge
  (§4.3), so "bridges within ± 10° of the channel normal" holds on the way itself by construction.
* **A site no way uses by the end of S5 stays a `site`:** two pinned bank vertices and a record — no span, way or
  furniture; not drawn, named, labelled or exported (S13a names a bridge once built; renderers and exports draw deck
  spans only); outside §5.3's deck rows. An epoch's growth (§4.4, §4.11), a drawn bridge (§7.4) and F-ROUTE's move rung
  (§4.3) may use it later. On a sky island's arena, where no S4, S5 or S7 runs, V01's unit run lays the span of each site
  whose two banks border the island's built land in one L1 batch before its seeds, builds each span a street reaches by
  §4.8's bridge rule (`deckCm` — from the two bank elevations through `levelledGroundCm` on the island's key, which
  before S10 returns the island's raster (§4.7 *Levelling*) — `kind`, `piers`) in one L1 batch after its S8 and before
  its S9, so S10's deck plots and S11's `DeckContext` read a built deck, and lays the bridges' furniture in its closing
  batch; a site it does not lay, or whose far deck end no street reaches, stays a `site` (a laid span removed in the
  after-S8 batch), reported (V01 §3.10.3 (4); item 580).
* **A deck where no site stands, on water that already stands** — F-ROUTE's extra-bridge rung (§5.2) in S4 at
  generation (after S1 and S3 committed every shore), in S5b at stages k ≥ 2 and in every epoch (§4.4), or in S4's
  operator in an edit that moves no water; or a drawn bridge with no site within `crossing.snapM` (20 m, half the minimum
  spacing) of the point where it crosses the channel's centreline — is placed by **one L0 batch of two same-level shore
  splits** before the way's L1 batch: `splitThrough` at L0 on each shore at the deck's bank point, perpendicular to the
  local flow, carrying the `deck_end` row of a fresh `Bridge` (`over: 'added'`), pinned. A street end already within
  `attractCm` of that point (a vertex carrying a `way` row) is attracted and promoted (§3.6); any other bank point keeps
  `attractCm` from every vertex on the shore's route, the map border's crossing included; nothing is cleared, and the
  finer faces whose rings run along the shore gain the vertex (§3.3's same-level-split rule). The way's L1 batch then lays
  its span through the two vertices, as at a site.
* **A deck placed before its water exists** is built by the batches of the operator that inserts the water — on a
  carve's kept way (§4.11), on an outer moat's arterial or carried way (S5a carves it by the carve path, §4.4), on a kept way of S1's
  water operator (§7.3 (b) 3), and for a deck F-ROUTE's extra-bridge rung sites inside one of these. Inside such an
  operator the rung only **sites** the deck, as data, with the operator's other crossings (§7.3 (b) 2): its two
  `deck_end` vertices are placed on the way's new route at the new bank points, under a fresh `Bridge`, by the operator's
  L1 batch (§7.3 (b) 3; §4.11 batch (1)), and promoted to L0 by its L0 batch when the water is inserted through them
  (§3.3; §7.3 (b) 4; §4.11 batch (2)). No shore split runs, because the shores that exist then are the ones that L0 batch
  removes.

(6) **Harbour candidates:** coast faces with depth ≥ threshold; on a site with no coast face that passes it, the reaches
of a river (never a tributary, distributary or islet channel) and the shores of a lake whose depth passes the same
threshold — a **river or lake harbour**, its basin cut into the bank by S3 (2) and opening on the reach (a dossier's
`deep_harbour` reads it so, V08 §2.6); a site with neither has no candidate, and a `harbour` request or a `deep_harbour`
there is left out (§5.1 (7), tier 6) and reported. (7) **Bank classes (COV-FTG-H06):** every shore segment
is classed `bay`, `headland` or `straight` (`WaterBody.shoreClass`, §2.3) by the signed curvature of the shoreline
smoothed over 200 m (thresholds in a table); its bank kind — beach / rock / cliff / quay / marsh — is drawn from a
per-class weight table (our own weights) conditioned on slope and exposure (G-R5), so bays tend to beaches and headlands
to rock and cliff; the class is kept per segment for §8's shore decoration. (8) Water faces enter L0 with `shore` / `bank`
edges; land components by flood fill (MFCG's land-component build), every one given uses later (O14 g). **Shore setback
(COV-FTG-H07):** a table `shoreSetback` per bank kind — plots: beach 6 m, marsh 10 m, rock 3 m, cliff 5 m from the edge,
quay 0 m (quay plots front the quay way); fields: 10 m — read by S10 and the hinterland unit (§4.9); the band is typed
`shore` greenery or commons. (9) **Drainage stays queryable, and S1 writes `Terrain.outfalls` (§2.3):** per water body,
each 50 m bank stretch (`outfallStretchM`) into which D8 flow from land enters, and each 50 m of frame edge the flow
leaves by, as one `Outfall` at its cell of largest accumulation; recomputed by S1's water operator after a water edit
(§7.3 (b)). Its readers: the sewer network stage (`Terrain.hydro`, `outfalls`; II.6, II.7.2), II.7.6's cavern rule
(`flowAccum`) and §10.2's `BasementGateRow.drainageAccumCells`. (10) **Resources (COV-FTG-B09):** `SiteResources` rasters
on the terrain grid — stone from slope, rock class and cliffs; ore from relief × an fBm propensity (hills only); timber
from the forest propensity (slope and soil class; realised as woods by the hinterland unit, §4.9); fish from water
adjacency and reach width; clay from low damp river flats; fertile land from gentle, dry, non-rock ground; **well yield**
(item 111 (b)) from the ground class — alluvial ground, a dry riverbed's gravels, low ground by the water table — by V11's
water table (wells per hectare and yield by ground). The S0 landscape toggles clamp a kind to zero or raise its floor;
S2's resource gates, S3's water pull, §4.5's water term, S10b's wells and S12a's outside sites read these rasters. S1
also writes the site's **geology flag** (`Terrain.geology`, §2.3; item 65; J-A65.49): the S0 toggle's value, or for
`auto` the feature table's geology row at S0's relief class — P(soluble) plain 0.10, rolling 0.20, hilly 0.30,
mountainous 0.45; P(volcanic) plain 0, rolling 0.02, hilly 0.05, mountainous 0.15 (item 109 (a) (1); our own rows,
calibratable, `extension`) — read against one uniform that S0 draws for it on `blueprint.features` with the other auto
features, before any other stage: `soluble` below P(soluble), `volcanic` at or above 1 − P(volcanic), else `ordinary`,
recorded in `autoResolved` with its reason (§5.4). **Mining** (item 109 (a) (2)): the site holds mining where
at least `miningCellShare` of the frame's land cells hold `SiteResources.ore` ≥ 0.5 (V11 §3.23.1's `under.systems`
cavern-row cell, II.7.6's `UndergroundSystemRow.params`), the roster holds a mining class, or the dossier lists a mining
deposit (iron, precious metals, gemstones, coal, copper) — this test's one statement, which every reader takes through
the flag; S1 records it as `Terrain.mining` (§2.3), which II.7.6's cavern rule reads for
its mine boost and fissure variant. With no `under.systems` cavern row (before the underground layer's rows ship, or
in a pack without that row) the ore clause reads false and the flag rests on the roster and dossier clauses — its one
reader, II.7.6's cavern rule, runs only with that layer, and §7.6's invalidation by slice re-derives S1 when the row
lands. A sky island's terrain takes `ordinary` and no mining, as do the parity presets (no
reference has an underground); only II.7.6's cavern rule reads the flag, and quarry voids read `SiteResources.stone`
(item 65, II.7).

**S2 Programme (the roster demand side; O7).** From `population` (or derived from area or buildings by the size tables)
— the dossier's population and circumstances when the map is bound to a dossier, the blueprint's own as the dossier's
stand-in when there is none (§7.7's derivation table; item 20 (h)): households by wealth band (the band set of §4.5,
whose default shares are FTG's captured lifestyle distribution; item 27); institutions (the markets — one principal and
secondaries by size, below — temple, churches per capita, guild halls, inn, mill on water, tannery; the seats the
`government` circumstance forces, §10.2, COV-FTG-B13); building demand per class from **our own** dependency tables run
as §10.2's sequential, prefix-stable roster (FTG's idea, none of its values), with resource gates read from
`SiteResources` ("no farmland → no farms, shops instead"). A host `ContentProvider` registered through door 4 (§11.4,
§14) replaces the roster here (`roster`), the siting at S10b (`site`) and the people at §10.3 (`people`), its outputs
read from the document's `hostContent` block on replay; with none registered the base's own rows run (the fixture
provider of §13.2's contract tests exercises the three call points). Outside classes (farmsteads, mills, quarries,
lumber yards, fisheries, mines) are demanded here, sited by S12a and placed on the outside plots the hinterland unit
builds (FTG-7).

*Markets — several, by size (item 24; emulation baseline: MFCG's central plaza doubles as its market and its later
wards may add secondary plazas, rarer since 0.9.2; FTG places market squares by its district rules, two in its captured
city).* The `market` class row (§10.2) demands `N_markets`: the **principal** market (`min` 1 at every rung) and the
**secondary** markets — the row's `firstAtPopulation` (10 000, the CITY floor) and `perCapita` (one per 12 000
inhabitants beyond it; our own rows) — plus, our extension, one per growth nucleus beyond the first in a polycentric form
(S3 (1)) and the town-level character's mercantile shift (below); at TOWN a secondary market is drawn with the row's
`secondaryChance` (0.15) rather than by count, so towns rarely have one. A market is a `Reservation` of kind `market`
with a `rank` (§2.5): the principal one is sited by S3 (12), every secondary one is a district claim of S7b (§4.5 S7b
(3)) except a polycentric nucleus's plaza, which S3 (12) ranks secondary, and each has its `market` district (§4.5). The
market hall's and the market trades' rows read a market's rank (§10.2). The sequential roster keys each market by
ordinal, so an epoch's suffix may add a secondary market, which the epoch's S7b claims by the same rule (§4.11).

*The hinterland's demand, decided with the town's (item 26; FTG-7).* The farm table of §4.9 turns the population into
farm households and arable land, and its fuel and timber rows into the wood the settlement burns and builds with:
`farmsteads` (none under §4.9's `perimeter` and `rivers` farm modes, whose farm households are housed in the town — a
mode that depends only on the rung, the climate row, S0's relief class and S1's resources), the farm households
`householdsPerFarmstead` × `farmsteads` (under `perimeter` and `rivers` the town's residential demand takes them),
`coppiceHa` and `managedWoodHa` are demanded here; the outside classes' `produces` and supply edges (§10.2) carry them
into the need propagation below, and the hinterland unit sizes the fields and woods it draws to them under §4.9's mode
and extent rules.

*Demand in plot counts (FTG-2; J-P6).* Stage demand is **plot counts per class × band**: `n(c, b, k)` = the class's
demand × the band shares × stage k's quota share. Residential band shares are the roster's household wealth shares
(shifted by the town-level character, which S2 reads from the circumstances' economy slice — its sector shares — so one
input drives the roster and the economy dial; §10.2, item 72); workplace bands come from the class row's lifestyle band.
Stage land is `A_k = Σ_(c, b) n(c, b, k) · plotArea(c, b) · (1 + λ_b) / plotShare(regime_k)`, with `plotArea` the
*plot* area of the granularity table's band centre (§4.7; footprints and coverage are not in the formula) — for a
residential class the expectation over the class-mix weights at the band centre (§4.7 S10b, item 71), so demand and
capacity keep agreeing when S10b draws a larger class — `λ_b` the block dispatch's land share at band b (V01 §3.5.9; 0
without `@plat/hood` and in the parity presets), and `plotShare` the measured share of a stage's land that is plots (the
rest is corridors, squares, greens and residue): **dense core 0.62** — MFCG's gross cover inside the wall is 0.60–0.65
at sizes 40–250, its lots being plots in our sense (`captures/mfcg/exports-sweep-2026-09-25/README.md`, CONFIRMED) —
gapped rings 0.55, ribbon 0.45 (PLAUSIBLE). **Measurement:** M-1 #5 (FTG face recovery, on its decoded road graphs)
measures the share of FTG's land inside its road-graph faces — FTG's client as captured on 25 September 2026 receives no
plot, FTG's subdivision running on its server on those faces (item 49), so this bounds its plot share from above; M1
measures B-CITY's own per regime. **Fallback:** if S5d's top-up fires on more than 10 % of B-CITY seeds at a rung, the
`plotShare` rows are refitted from B-CITY's measured share per regime by one scripted pass, with a declared golden shift
(§13.3).

*Stages and the walled share (MFP-6; J-P5).* Stage rows per rung (a table, era-calibratable): **TOWN** 2 stages — walled
core 0.90 of buildings, ribbon 0.10; **CITY** 3 — inner walled 0.55, outer walled 0.33, ribbon 0.12; **METROPOLIS** 4 —
inner 0.30, middle 0.30, outer 0.28 (all walled), ribbon 0.12. FTG's cul-de-sac **suburb** regime is added only by the
era or form preset or by the shanty toggle (and, in a history, by V06's suburb regime, §4.4). The share inside the
outermost wall is thus ≈ 0.9 at TOWN and ≈ 0.88 at CITY and METROPOLIS, anchored on MFCG's measured 0.87–0.92 inside the
wall at sizes 40–250 with shanty towns off (sweep README, CONFIRMED); FTG's ≈ 20 % walled preset stays reachable as a
preset row, and the corpus phase recalibrates the rows. Each growth stage stands for `yearsPerStage` years of the town's
age (50, a stage-row column; our own, calibratable), the age II.7.6's catacomb rule reads. **A known history (item 88;
J-A88.42).** When `HistoryHint` is filled (the dossier port's `Recipe.history`, or the blueprint's `history`), the stage
count becomes K′ = min(K, max(1, ⌈`ageYears` ÷ `yearsPerStage`⌉)) — a young settlement is grown in fewer stages: stages 1
to K′ − 1 keep their rows, every later walled stage's share folds into stage K′ − 1 and the ribbon stage stays last (at
K′ = 1 the one stage takes every share) — and only the rules that name a scar's type read it: a `fire` or `flood` scar (a
`RaiseGrade.cause`) by II.7.6's buried old town, any other type by none, the creation week showing a finished town
(J-A67.47). Empty, K is the rung row's. With the evolution engine (M6-E) a history with a peak is generated history-first
instead (§4.11 *History-first generation*), and the stage count is the peak's.
**Output:** `Roster` (demand by class with area / frontage requirement classes, district affinities, wealth bands) and
`StageQuotas[]` (plot counts per class × band, land area and regime per stage: dense core → gapped rings → ribbon, plus
the optional suburb; FTG's zonal gradient, R4).

*Ladder records' members (item 108 (b), (c)).* A collective record (DR9; V08 §2.6's `distribution` row set) — a COUNT step's lesser buildings, a
QUARTER step's trade, a GUILD step's workshops (§10.2's ladder step table) — takes its member count from this roster's
per-capita rows for the lesser class, clamped into the record's numeric range or, unnumbered, into the ladder table's
range per kind and rung; the members are keyed `#k` (J-A74.73) and the record's state spreads over them (J-A80.72).
Where a greater and a lesser of one ladder both reach the map, the lesser becomes a member of the greater's collective,
never an addition, and the roster's own per-capita buildings of that class are the record's members. A SIZE step is one
larger building by its template, a REPLACEMENT step the greater only.

*The grandeur ceiling's manor count (item 115; J127).* At the `territory` rungs S2 reads the rung's `grandeur.ceiling`
row (§10.2 *Grandeur ceiling*): an enabled row caps the manor class's count at its `manor.max` and admits a manor only
where its `manor.requires` is met — `lordOrSpecified` a `seigneurial` government or a specified manor, `specified` a
specified one only (V08 §3.16 (3): a dossier-bound record of a class in `grandeur.ceiling`'s `settings.grandClasses`
(V11 §3.25.4), or a dossier government whose `villageSeat` names the manor house, seigneurial or crown (V11 §3.21.1)) —
and a specified manor is a fixed row above the cap (item 115 (c)); a disabled row, and every row at TOWN and
above, leaves S2's count as the roster gives it (V07 §3.8; §4.7 S10b *The rung ceiling*).

**S2 need propagation (item 16 (b); with §10.2's supply edges).** After the sequential roster has produced the manifest,
S2 walks the supply graph: for every manifest building whose class has a `hard` supply edge it counts the providers of
that resource within reach — the site resources `SiteResources` provides (farmland → grain, and timber, stone, ore, fish
and clay; S1 (10)), the hinterland land uses whose kind is a good's `site.landUse` (`ResourceRow.site`, V11 §3.7.1), the
harbour and the gates for the `import` resources (§4.7 S10b), and the manifest's producing classes (`produces`) — at one
provider per `perConsumers` consumers, a provider of any of the edge's `substitutes` counting as a provider of the
resource; where the count falls short, the producing class of highest priority receives its next building through its
own `roster/<class>/<ordinal>` draw, so the addition is prefix-stable (the propagated demand is a monotone function of
the manifest and enters the sequential run as a `perOther` floor), to a table depth (default 3: brewery → maltings →
farmstead). A resource no class produces and no site provides takes the roster's existing substitution (no farmland → no
farms, shops instead) and is reported as an import; the hinterland's food, fuel and timber rows are the outside classes'
edges (§4.9, item 26). The propagated buildings are demanded here, allocated by S7b and S10a and placed by S10b (§4.7).

**S3 Siting, reservations, the stage-1 boundary and its trace (J-P26).** S3 decides everything the first enceinte depends
on in one construction — the gate routes are solved first, the stage-1 boundary is the travel-cost level set over them,
the gates are where the routes cross it, and the castle weld and the moat are placed on the trace pulled from that
boundary, so no later stage recomputes a boundary they were fixed on — and commits it in two batches, L0 (every water
body it carves, with the decks its crossings need) then L1 (the land reservations), before S4 commits a single way.
1. **Centre(s).** Candidate centres on a coarse lattice inside the frame's middle third are scored by a rule table —
   distance to a crossing site (river towns sit at fords and bridges), to the harbour candidate, to reliable water (the
   water pull, (6)), slope, elevation above the flood line, wind exposure, distance from the frame, and a controlled
   random term; the best is the **centre** — the nucleus the main plaza (2), the gate routes (5) and the field `T` (6)
   are rooted at; it is not by law the market, whose principal site is chosen at (12) by where trade meets, the plaza
   itself by default (MFCG's central market) and possibly a bridgehead, the harbour, a gate or a main street instead
   (item 24; J-A24.41). **The site is placed relative to the river** (G-P14), so "no river through the core" cannot occur
   when a river is requested; the invariant is checked here and repaired by moving the centre, never by re-rolling.
   **Polycentric forms (IMP-9):** the `twin-town` and `polycentric` form rows site k = 2–3 nuclei (candidates inside the
   frame's middle half), each scored the same way, each with its own share `A_1,i` of stage 1's land (a form-row share),
   its own main plaza (2) and its own gates (4); the principal market is sited at (12) among every nucleus's candidate
   sites, and the plaza of a nucleus that does not win it is a secondary market when the roster's count allows (S2),
   ranked and committed with the principal at (12). Nuclei are sited at least the **separation floor** apart:
   `sep_ij = τ(a₁) · (R_i + R_j) + (outer setback + glacis)_i + (outer setback + glacis)_j + g`, with `R = √(A_1/π)` a
   nucleus's equal-area radius, `g` one ribbon plot depth (30 m) and `τ(a)` the tip factor of the anisotropic level set
   (its reach along a road over R): table 1.2 at a = 1.3 and 1.4 at a = 1.8 (above the executed 1.13–1.18 and 1.24–1.34,
   receipt `docs/validation/bench/fixall_pipeline_r2_levelset.out`), τ = a for any other a (a safe bound). The form row's
   separation band runs from that floor to 400 m beyond it (≈ 800–1 200 m for two 29 ha nuclei at TOWN); the ground
   between the nuclei is grown as an extramural regime in S5.
2. **Plazas and the reservations that do not read the boundary (MFP-3, GEO-19).** The **main plaza** of every nucleus:
   area band TOWN 0.25–0.45 ha, CITY 0.35–0.6, METROPOLIS 0.45–0.8 (anchored on MFCG's 0.32–0.58 ha across sizes 40–250
   and the red team's 0.36–0.54 ha); a compact 4–6-vertex polygon at the nucleus aligned to the contours, compactness
   ≥ 0.8, whose vertices are the attach points arterials end at, so the plaza acts as MFCG's roundabout. The **temple or
   cathedral precinct** adjacent to the main plaza by score, sized from its institution row — not reserved where the
   creation prefix sends its institution to a sky island (a T5 `sky` declaration of its kind or a T6 `criteria.sky`
   assignment, V05 §3.5), and likewise the reservation a palace takes by the castle's siting rules (8); a reservation
   whose institution a later S7b (5) slot takes up is handed over by V05 §3.5 (the row's hand-over class, else a park;
   `Reservation.handedFrom`, §2.5), never left without an owner. The **markets** are not planned here — the principal
   market is sited at (12), once the sites where trade meets are fixed, and every secondary market is S7b's claim (§4.5
   S7b (3); item 24) but a polycentric nucleus's plaza. The **harbour basin** (a template shape — rectangle,
   semi-octagon, semi-hexagon, L wide or narrow — scaled to port demand) at the chosen harbour candidate; and **canals**
   along a least-cost line between two water bodies, each carrying decks of S1 (5)'s form at the spacing row
   `canalDeckSpacingM` (150 m inside the predicted built extent, 600 m outside it). These are planned polygons here: the
   lattice sees them as reservations and water (water impassable except along its decks), and they are committed in (10)
   and (12).
3. **Lattice and costs.** S4's candidate lattice and its edge costs (§4.3) are built here, once, over the planned water
   and reservations of (2).
4. **Gate picks and bearings (MFP-4, COV-MFCG-E04; J-P24).** `N₁` (per nucleus) = the request, or
   `round(1 + 0.47 · √A_ha)` with A the stage-1 land — a law that reproduces MFCG's 5 / 8 / 12 gates at sizes 40 / 80 /
   130 from their walled areas of 58 / 220 / 548 ha, and 18 at size 200 (receipt
   `docs/validation/bench/fixall_pipeline_mfcg_fits.out`). **The waterfront reduction (J-A46.41).** Where the nucleus has
   a waterfront — the pick contour below runs along a sea or lake shore for at least `gate.waterfrontShare` of its length
   (0.1; our own, calibratable) — the land law's value `N_land` becomes `N₁ = 2 + ⌊0.75 · (N_land − 2) + ½⌋`: fewer land
   gates where water takes part of the circuit, 4 / 7 / 10 / 14 where the land law gives 5 / 8 / 12 / 18, never more than
   `N_land` (provenance `ref:MFCG 12710731 coastal gate reduction (code)`, P11: MFCG 12710731's coded law counts mesh
   cells — 2 + ⌊0.75 × inner cells ÷ 12⌋, recorded 3 / 4 / 5 / 7 gates at sizes 26 / 39 / 51 / 80 — and this rounding of
   0.75 applied to the land law's surplus over two gates is its metric restatement). A requested `N₁` is taken as given,
   and a river takes water gates, not this reduction. **Closed arcs (item 106 (a)).** The barrier closure of §4.4 S5a step
   1 is classified on the pick contour before the picks, each arc by its defensibility row (V11 §3.16.1), and the picks
   fall on its **approachable** arcs only: those whose row does not close (`open`, and `shallowWater` at the base's
   kinds). Where the arcs a barrier other than a sea or lake shore closes (a cliff, a steep slope, a gorge, a marsh, a sheer
   face, a river's banks round a loop) take at least `gate.waterfrontShare` of the contour, `N₁ = max(1, ⌊s · N′ + ½⌋)` —
   `N′` the value after the waterfront reduction, `s` the contour's approachable share (a sea or lake shore counted
   approachable here, the waterfront reduction having priced it), so the land law's gates keep their density along the
   walled share — reported as the waterfront reduction is; a requested `N₁` keeps its count, its picks on the approachable
   arcs. A contour with no approachable arc is (9)'s *every arc closed*. Picks are **sequential nested picks** from the `gate.pick` stream on
   the **pick contour** — the level set of stage 1's land in the terrain-only field (a = 1), which serves only to score
   candidates: pick i scores the contour's candidate points by angular gap to the earlier picks, nearness to a requested
   bearing (a bearing of the site request, or the bearing of a `road` partner of the trade slice — item 77 (b), §7.7
   DR3), terrain (saddles and valley exits up, steep ground down) and a jitter, so a smaller N is always a prefix of a
   larger one. Each pick carries a **bearing**: the requested bearing it serves or, when none was requested, the
   least-cost outward direction from the pick to the frame; a bearing's **trade weight**, which (12) and §4.7 S10b's trade
   rows read, is its gate's weight in `TradeFlow.gates` (§4.3, computed at (7); J-A77.41, J-A77.42), read from the
   circumstances' trade slice (§7.7 layer 2; items 72, 77). A polycentric nucleus's first picks are forced at the bearings
   of its adjacent nuclei.
   **The harbour pick (J-P45).** When the town has a harbour and `N₁ ≥ 1`, let `L*` be the path to the harbour's
   destination node (13) in the plaza-rooted Dijkstra tree over (3)'s lattice (the tree (5) routes the gates with,
   computed here once) from the plaza of the nucleus nearest the harbour — the least-cost lattice path, the wall ignored.
   When that node lies outside the pick contour, that nucleus's first unforced pick is **forced** at `L*`'s first node
   beyond the contour, after any polycentric forced picks, so the nested-prefix property and N are unchanged. If that
   nucleus has **no unforced pick left** — its `N₁` taken by polycentric forced picks (a nucleus of under about 10 ha
   between two neighbours, whose law gives `N₁` = 2, or a twin town's requested `N₁` = 1) — no pick is forced, its forced
   picks stay, and the detour guard of (7) applies to that town unconditionally. The forced pick's bearing is the
   least-cost outward direction to the frame; its gate route's inward part is `L*`'s own prefix, so a walled port has a
   main gate on its harbour side and the harbour route (11) leaves through it. *Measurement (M1):* the committed harbour
   route (11) against `L*` on every B-CITY walled coastal seed, p99 of the ratio ≤ 1.5, and ≤ 1.5 on every §13.2 walled
   coastal fixture. *Pre-decided fallback:* the detour guard of (7).
   Where the river crosses the boundary, **water gates** are added (not counted in N). `N = 0` produces no main gate and
   no external arterial through the wall — a harbour outside the stage-1 region still gets the harbour gate of (7); the
   sealed circuit is reported and the extramural stages are folded into the walled stage.
5. **Gate routes, solved (not committed).** For every pick: the route from its plaza's attach point through the pick to
   the frame at its bearing — the plaza-rooted Dijkstra tree to the pick, heap A\* beyond it — on (3)'s lattice with S4's
   cost function (§4.3); an island town routes to its landings and a polycentric pair gate to gate. S4 commits exactly
   these routes and reuses the plaza-rooted tree for its own plaza-anchored routes (§4.3). The harbour ↔ plaza route is
   **not** among them and never enters `T`'s road set; it is solved in (11), once the boundary and the trace exist
   (J-P35).
6. **The stage-1 field and boundary.** The one travel-cost field `T` of §4.4 S5a is computed here: a multi-source
   Dijkstra from the plaza(s) over (3)'s lattice with the road multiplier `1/a₁` (a₁ = stage 1's regime row: walled core
   1.3) on the lattice edges of (5)'s routes and **the water pull** (item 111 (b)): every lattice edge's cost is
   multiplied by `1 − w_water · q(x)`, with `q(x)` ∈ [0, 1] the proximity to reliable water, the largest over the sources
   — `1 − d ÷ pullRadius` from a river bank, a lake shore or ground of the top well-yield class (S1 (10)), and
   `flow × (1 − d ÷ pullRadius)` from a water body carrying `spring` (an oasis's shore, a spring-fed pond's, its source
   point), `flow` that body's `spring.flow` (§2.3; 1 when made, lowered and restored by V06 §3.12.1), `d` the distance and
   `pullRadius` the climate row's pull radius (0 beyond it), so a spring at `flow` 0 pulls nothing while its water body
   stands — and `w_water` the climate row's water-pull weight (strong in arid rows, weak in temperate, near zero in
   wet ones; below 1), a soft term under §4.5's contract (weight 0: byte-identical). So a dry-country town crowds along its
   water, the same field carrying the pull into every later stage's boundary (§4.4). Each node records its source nucleus,
   so a polycentric town's `T` is partitioned by nearest source; `t_1,i` is chosen so that nucleus i's nodes with
   `T ≤ t_1,i` hold its land `A_1,i` (exact to one cell), and the **stage-1 boundary** is that contour, Chaikin-smoothed and
   resampled. **Less land than the stage asks** (an island town on a small island, FTG-19; a narrow coast, fjord or
   valley; the METROPOLIS cap on high relief): `t_1,i` is capped at the largest `T` over the lattice nodes the nucleus
   reaches inside the frame (§3.2 (9); the context margin is never the town's land), and the shortfall is the stage's,
   reported in `requestedVsBuilt` and carried to S5d (§4.4). Where the capped region meets the frame, the boundary runs
   along the frame's inner line, inset by the outer wall strip's width for a walled stage (§4.8), so the trace and its
   strips stay inside the frame (§4.13); that arc is open ground, walled and gated as any other, and a gate on it has its
   outward arterial across the context margin (§4.3 *Result*), never of zero length. If two nuclei's regions come closer than their setbacks, glacis and `g`, the later-scored nucleus is re-sited
   to its next candidate (≤ 3 attempts); if they still come too close, the two are merged — one enceinte around their
   union and a **cross wall** along `T`'s partition line between them (an open wall chain anchored on that enceinte at both
   ends, with a gate where the inter-nucleus route crosses it) — and the merge is reported.
7. **Gates on the boundary.** Each gate is the **first point at which its solved route, walked outward from its plaza,
   reaches `T = t_1`** — on the boundary by construction; the gate keeps the pick's identity, ordinal, bearing and route. A route whose first point at `T = t_1` lies on a raised stretch of its solved course (a viaduct (5)'s solve priced, §4.3) — or would put its gate where §2.7's laws admit none (law 1 (1), (4), (5), read with their terms: its footprint, band and wall strips as the gatehouse and band rows there will build them) — is re-solved whole as (5) solves it, every deck edge whose ends straddle the stage-1 boundary, or with an end nearer the boundary than the first point beyond the foot there (§2.7's laws' terms, read with the band and gatehouse rows there), excluded — a search over the routes whose first point at `T = t_1` §2.7's laws admit (law 2 (a)) — (the boundary counting as standing, §4.3 *Where it may not go*; §2.7's laws, law 1 (3); its worked example *down before the wall*); its gate is the re-solved route's first point at `T = t_1`, on ground part 0, which the rest of this step reads as any gate; the harbour gate of (7) is placed likewise, where `L*`, re-solved with every deck edge across the stage-1 boundary excluded, first reaches `T = t_1` (a search over lawful points, §2.7's laws, law 1 (1), law 2 (a)); `T` and the boundary keep (5)'s routes and are not re-derived, and a route the re-solve cannot serve takes F-ROUTE's ladder (§5.2), reported. The raised stretches of (5)'s routes, so re-solved, stand for every later step of S3 as standing raised ways whose courses are dated after the stage-1 trace (§2.7's laws' *Order*: the trace by S3 (6), these stretches by S3 (7)), so that (9)'s pull keeps off their deck lines (law 1 (3)) as off their ends: (8)'s siting filter and (9)'s pull, anchors and water gates read their ends, under-deck strips and fixed-place zones (their supports placed at S4's commit by §2.7's support step (6), against the trace's band) as §2.7's laws read a standing raised way's (law 1 (3)–(6), its worked examples *beneath* and the fixed-place sentence; the pull keeping each such route's crossing of the boundary as §4.4 S5a *Trace* (2) keeps an arterial's), and S4 commits them unchanged — their stations and spans read, from S3 (10) on (S3 (10)'s channels, S3 (11)'s harbour route, S4's own routes), as the support step will place them at S4's commit from what stands at S3 (10), the trace's band among it, and S4's commit placing exactly those (§2.7's laws, law 2 *Not yet built*) —; a raised stretch S4 solves on a route of its own is laid after the trace and meets it as one (§2.7's laws, law 1 (3), (6); its worked examples *down before the wall* and the fixed-place sentence). A carried way standing before the stage (a creation prefix's, or one a regeneration keeps) takes a gate of the stage where `T = t_1` crosses its ground course or ends, beyond its foot, beside the N main gates, decked and counted as the harbour gate is, and none where `T = t_1` crosses only its deck, a crossing (9)'s pull keeps; its gate, where §2.7's laws bar it there (law 1 (4), (5)), resolved as S5a's pin is (§4.4 S5a *Trace* (2)) — by those laws, law 2, in its order: (a) moved along the way within (9)'s search band, (b) the way re-routed through one of the stage's gates as law 2 *Carried way* says, (c) F-WALL's raised-way rung (§5.2).
   Two routes that cross the boundary at one point cannot both be gates, and a route that first reaches `T = t_1` on a
   closed arc ((4)) gives no gate — save (9) (b)'s gate, which stands on a walled closing arc —: the later pick, or that pick, is re-drawn from its next candidate (≤ 3 attempts), then
   dropped and reported (F-WALL). In a walled stage the arcs a land barrier closes (`cliff`, `gorge`, `marsh`, `sheer`)
   are impassable to S4's and S5's routes as the wall is (§4.3's `wallCrossingPenalty`), so a road leaves a walled stage
   only through a gate — through the gate on the nearest walled arc where its bearing lies across such an arc. **The harbour gate:** one gate of kind `water`, not
   counted in N, carrying a way like a quay-access water gate (§4.8) and reported, is placed where `L*` ((4)) first reaches
   `T = t_1`, so the trace (9) pins it and the harbour route (11) leaves through it — (a) for a sealed town (`N = 0`)
   whose harbour destination node (13) lies outside the stage-1 region `{T ≤ t_1}`; (b) as the **detour guard**, for a
   town with gates whose best gate-bound harbour route — solved as data on (3)'s lattice with the stage-1 boundary
   impassable except at the gates just placed — is longer than 1.5 × `L*`, applied when M1's measurement of the harbour
   pick (4) fails and, whatever it finds, when the harbour's nucleus had no unforced pick left to force. With the gates
   placed, §4.3's trade flow derives its gate weights, the harbour's share and the dominant bearing — they read no route —
   which (12) and S10b's trade rows read (§4.3 *Trade flow*; J-A77.42).
8. **The castle (MFP-3, COV-FTG-G09).** When a castle is requested or drawn, the **castle bailey** is sited by
   defensibility (height + water on ≥ 1 side + control of the main route, `docs/IMPROVEMENTS.md` O8 d), restricted by the
   `castle` option to inside / on / outside the stage-1 boundary, under a hard filter that no (5) route crosses the claim
   or, when water is within reach, the castle-moat band planned with it by (10)'s rule, and no weld vertex lies where §2.7's laws bar a fixed place — law 1 (4)–(6), read with their terms; its worked example the fixed-place sentence — (every raised way standing before the stage — a creation prefix's declared ones and, at a regeneration, each one it keeps where it stands (§2.7's laws, law 2 *Newer*) —, the raised stretches of (5)'s routes at S3, S4's and S5b's viaducts at a stage's citadel; and no claim whose curtain, inner ward or outer arc — fixed by the claim — or whose vertex tower §2.7's laws bar: the siting a search over the claims law 1 admits, law 2 (a)): a 5–7-vertex polygon on a jittered
   circle, area band TOWN 1.0–3.0 ha, CITY 1.5–3.5, METROPOLIS 2.0–5.0 (anchored on MFCG's plain-size castles of
   1.3–3.4 ha). A claim's compactness floor is its reservation's `compactnessMin` (§2.5) — the castle's 0.75 (MFCG's
   threshold), checked and repaired here by §4.8's rule before the trace welds to it (F-CASTLE); no other reservation kind
   sets one. `on_enceinte` places the bailey across the boundary so that exactly two of its vertices lie on the boundary —
   the **weld vertices** — and the bailey's **outer arc**, its boundary between the welds on the side outside the
   boundary, becomes the stretch of town wall the castle shares (9). The castle's **town-side gate** is fixed now, at the
   midpoint of the bailey side with the least-cost path to the plaza — for an `on_enceinte` castle, among the sides of its town-side arc; for every castle, among the sides whose gate, with its footprint, lies where §2.7's laws admit a fixed place (law 1 (4)–(6), read with their terms), a claim with none failing the filter above (§2.7's laws, law 1 (4)–(6), law 2 (a); its worked example the fixed-place sentence: a castle sited, never reshaped) — so the castle street is a routable destination and a ring castle moat can carry its deck.
9. **The stage-1 trace.** For a walled stage 1 the registered `EnceinteStrategy` traces the enceinte here by S5a's rules
   (§4.4), barrier closure included (item 106): the boundary pulled to defensible ground within the 40 m band — or to a
   natural barrier within `wall.barrierReachM` — with the gates and the weld vertices pinned, then pinned-vertex smoothing
   and topology-preserving simplification. Between the weld vertices of an `on_enceinte` castle the trace is the bailey's
   outer arc itself, one wall carrying both enceintes' `wall` roles (§2.7 `Castle.cityWeld`). The pull and the
   simplification treat the water planned in (2) and an `inside` or `outside` castle's planned ring moat (8) as water,
   which they never cross (§4.4), so no channel (10) carves can cut the trace. S5a commits this trace unchanged for k = 1;
   an unwalled town keeps the boundary itself as stage 1's boundary. **Every arc closed** (no approachable arc, (4)), by
   the closing rows' walls (V11 §3.16.1):
   (a) **every row's wall `none`** (`sheerCliff`, `deepWater`, `gorge`: a mesa ringed by sheer faces; an island town filling
   its island under an `open` waterfront, its shore closed by deep water): the stage walls nothing — no `Enceinte` is
   recorded for it and it has no gate — and reads as an unwalled stage for every rule (§5.3's walled-stage rows do not
   apply to it); its routes (5), picked by the land law on the whole contour as an unwalled town's are, enter across the
   barriers where §4.3's class grade limit admits an edge — a ramp or cleft in a cliff face, a crossing of a gorge (a
   viaduct over it at CITY and METROPOLIS, §4.3), an island town's landings ((13)) — and otherwise take F-ROUTE's last
   rung (`unserved`, reported; §5.2), so a mesa girt by faces steeper than `path`'s `rampMaxGrade` over one lattice step
   has no road in at generation and says so; a requested wall is reported in `requestedVsBuilt` (S3's warning
   `W_WALLED_BY_BARRIERS`, §5.4);
   (b) **some closing rows carry a parapet or a light wall** (the `cliff`, `steepSlope` and `marsh` rows: a mesa below the
   sheer test, a marsh-ringed town): the stage is walled on those arcs by §4.8's grade and records its `Enceinte`, the arcs
   with no wall its closing `arcs` (§4.4 S5a step 1); it takes N₁ = 1 gate (a requested `N₁` keeps its count), picked on
   its walled closing arcs, the least defensible row first — `steepSlope`, then `marsh`, then `cliff` — each pick scored
   among that row's candidates as (4) scores every pick; the gate's route reaches it within §4.3's class grade limit, else
   by F-ROUTE's ladder to `unserved` (§5.2), reported with the walling (`W_WALLED_BY_BARRIERS`). An `on_enceinte` castle whose
   weld vertices would fall on a closed arc is re-sited along the walled arcs by F-CASTLE's re-site rung (§5.2), else kept
   `inside` (reported). The trace is laid `standing`; S7 writes each run's condition at generation (§4.8; item 114 (d)). **Test:** every gate and weld vertex lies on the
   committed trace exactly (lattice equality), and the trace departs from the boundary by ≤ 40 m everywhere except along an
   `on_enceinte` castle's shared stretch, which is the bailey's own outer arc and may bulge up to the bailey's width
   beyond the boundary, and along a barrier reach or a stretch F-WALL's raised-way rung re-pulled round a raised way (§5.2; §2.7's laws, law 2 (c)), each of which departs by at most `wall.barrierReachM` (one boundary removes the
   two-construction mismatch measured in receipt `fixall_pipeline_r2_levelset.out`).
10. **Water carvings and their decks → the L0 batch (GEO-19; J-P36).** Carved into L0 here, before S4, and seen as water
   by every later stage: the harbour basin and the canals of (2) with their decks; a **castle moat** when water is within
   reach (below) — around an `inside` or `outside` castle a ring band around the bailey, outside its curtain's outer half-band and
   a berm, with **one deck at the castle gate**, perpendicular to the moat; for an `on_enceinte` castle **only its outer
   arc** (8): the channel along the shared stretch between the weld vertices, outside the trace's outer half-band and a
   berm — the city moat's own stretch there when the town has one (one channel, at the wider of the two width rows),
   otherwise a channel clipped at each end by the trace ⊕ (outer half-band + berm), so it ends against the town wall's berm
   beside each weld — while the bailey's town-side arc takes its castle template row's `townSide` (§4.8) and the castle
   gate on that side needs no deck; a **city moat** when the blueprint's `moat` is `inner` or `all` — a channel of the era
   row's width along the (9) trace, outside its outer half-band and a berm (table 2–5 m), never along a barrier arc the
   trace leaves unwalled, and wet only where water reaches it (below) — with **one deck at every main gate, at a harbour gate (7) and at a carried way's gate (7)** (§2.7's laws, law 2 *Carried way*) on a wet stretch, where the gate's route (for a harbour gate, the route that placed it; for a carried way's gate, the carried way) crosses the channel, perpendicular to it; and the hinterland's **decoration
   ponds** — the pond row of §4.9's decoration table (count by rung and biome), sites scored on hollows, flow accumulation
   and damp ground, each at least `pondClearM` (150 m) beyond the predicted built extent `{T ≤ t_K}` and at least 30 m from
   every (5) route and planned canal. No castle moat crosses the city trace — a ring surrounds a bailey the trace keeps
   off (9), and an outer arc runs beside the trace — so §4.4's rule that the trace crosses water only at a river's water
   gate holds with every castle option; and the hard filter of (8) keeps every solved route off a planned castle moat, so
   no castle moat needs a deck except at a ring moat's castle gate. Every deck has S1 (5)'s form and its two states. A raised way standing when this step carves — a creation prefix's declared one and, at a regeneration, one it keeps where it stands (§2.7's support step (6); §2.7's laws, law 2 *Newer*); at generation and at a regeneration, besides, the raised stretches of (5)'s routes, their stations and spans read as §4.2 S3 (7) reads them (§2.7's laws, law 2 *Not yet built*) — meets the moat and the canals by §2.7's laws (law 1 (1), (8); its worked example the way-and-channel table, row (e)), each channel stopped at its under-deck strip counted in S3's `W_RAISED_CROSSING`. When
   a moat was carved, `T` is recomputed once over the new water (≈ 4 ms at CITY) for the stages k ≥ 2; stage 1's boundary
   is never re-derived from it. **Where a moat holds water.** The castle moat and the city moat read one rule for
   "water within reach": a source — a river, a lake, a spring-fed pond or the sea — within `moat.waterReachM` of the moat's line (the
   `walls` table's cell, §7.6: 400 m; our own, calibratable). The moat's `WaterBody` names that source in `flowFrom` (§2.3; the
   nearest, ties by id), and its water level is one value per moat, derived on read and never stored: the source's surface
   at its shore point nearest the moat (the terrain's height at that shore, as V04 §3.2 N7 reads a water surface), which
   every reader of the moat's water reads (§8.4's water at its level, V04 §3.2 N2 and N7, §2.6's water table). The channel
   is carved only along the stretches whose ground lies at or above that level by at most `moat.maxFallCm` (the same
   table: 400 cm; our own, calibratable); every
   other stretch, and the whole moat when no source lies within reach, is laid **dry** — no channel and no deck, its glacis
   part typed `ditch` residue by S10 (0) as the town side of an `on_enceinte` bailey is (§4.7, §4.8) — reported
   (S3's warning `W_MOAT_DRY`, §5.4). An outer enceinte's moat takes the same rule (§4.4 *Outer moats*).
11. **The harbour route (J-P35).** Once the L0 batch has committed, the harbour ↔ plaza route is solved on (3)'s lattice
   with the committed water impassable except along its decks, every reservation of (2) and (8) impassable and — for a
   walled stage 1 — the (9) trace impassable except at its gates. A harbour whose destination node lies inside the stage-1
   region `{T ≤ t_1}`, and any harbour of an unwalled town, is routed by heap A\* from the plaza of the nucleus whose
   partition of `T` holds it, and so stays inside the trace. A harbour outside the region is reached **through a gate**:
   one multi-source Dijkstra from every gate's exit — the far bank vertex of its moat deck where (10) carved a city moat,
   the gate itself otherwise — over the lattice outside the trace finds the **serving gate** (the least cost to the
   harbour; ties by gate ordinal; a harbour gate of (7) competes with the rest, and with `N = 0` it is the only gate) and
   the branch to the harbour at once. The harbour route is that gate's inward street, its passage and moat deck (its own
   route to the exit, which S4 re-solves through the deck, §4.3) and the branch: the harbour road leaves through a gate,
   crosses a moat only on that gate's deck and adds no road through the wall, so the roads leaving the walled stage stay N, plus a harbour gate of (7) where one was placed and a carried way's gate of (7). The route is data, committed by S4 with the others, outside `T`'s
   road set (5); it costs one heap search of the castle street's size, inside S3's row of §12.4 (PLAUSIBLE). Its fixtures
   are §13.2's walled coastal harbour fixtures.
12. **The principal market, then the land reservations → the L1 batch.** *The principal market (item 24; owner: "the
   central market does not actually have to be central to the city").* Before the batch, with the gates (7), the trace
   (9) and the harbour route (11) fixed, the principal market's site is chosen by the **trade-convergence score** over the
   candidate sites — a rule table (`market.siting`, §7.6; our own rows) with a controlled random term of share 0.1 from
   the `reserve.market` concern (§6.1). The candidates, each with its form and its score terms (defaults):
   * the **main plaza** of each nucleus (2) — the plaza itself then carries `rank: 'principal'` (MFCG's central market;
     its attach points are the market's): kind 1.0, routes 0.5 × the fraction of gate routes (5) rooted at it;
   * each **gate**, inside or outside (7) — a flanking square around the gate route's stretch just inside or just outside
     the gate, beside the gate plaza (§4.8): kind 0.3 inside or 0.15 outside, trade 0.6 × the gate's trade weight
     (`TradeFlow.gates`, (4));
   * the **town bridge's landward ends** (13) — a flanking square around the bridge approach S4 routes to the deck's bank
     vertex (§4.3): kind 0.35, traffic 0.5 × the fraction of arterials whose bearings lie across the river;
   * the **harbour's landward attach** (11) — a flanking square between the basin's attach point and the harbour route:
     kind 1.0, trade 0.6 × min(1.5, p ÷ `portRef`) — `p` the **port demand fraction**, the share of the manifest's
     buildings whose class `requires: 'coast'` (§10.2), and `portRef` the table's **reference port**, the median `p` over
     B-CITY's harbour seeds — a stored cell of `market.siting` (§7.6) computed by running S0–S2 alone on every B-CITY
     harbour seed: a scripted pass sets it at M1 and re-runs whenever a shipped roster row changes, the new value shipped
     as a table-version bump with its declared shift (§13.3), and a contract test recomputes the median and fails on a
     stored value that differs (§13.2); 0.12 (PLAUSIBLE) until the M1 receipt;
   * the **busiest inward street** — the middle third of the street of the gate of highest trade weight — a flanking
     square astride it, a widened main street: kind 0.25, trade 0.4 × that gate's trade weight.

   Slope, the flood band and wind exposure enter as (1)'s site penalties. **The defaults compared** (before those
   penalties and the random term; J-A24.43): in a single-nucleus town the plaza scores 1.5 (kind 1.0, routes 0.5), a gate
   at most 0.9 (kind 0.3, trade 0.6), the bridgehead at most 0.85 and the busiest street at most 0.65, so an inland walled
   town's plaza wins — the routes converge there — and the default reproduces MFCG; in a port the harbour scores
   1.0 + 0.6 × min(1.5, p ÷ `portRef`) — 1.6 at the median port (`p` = `portRef`), above the plaza, 1.3 at half the median,
   below it, the two equal at `p` = ⅚ `portRef` — so the principal market leaves the plaza for the harbour in at least half
   of the port seeds before the penalties, the share §13.2's T24-1 and §13.7's row require (measured at M2b with §13.7's
   re-tune fallback), and stays on the plaza where a port's trade is mostly overland. The parity presets pin the plaza by
   setting every other kind weight to its off value (item 23). A **flanking square** is a `market` reservation of the
   principal row's area band (the plaza band of (2)) laid astride its way's stretch, that way passing through it as an
   arterial passes a gate plaza (§4.8): the reservation is impassable to every other route except at its `attach` points —
   the two points where its way enters and leaves and the midpoint of each flank, where a side street may end as at a
   plaza — and S4 places `width_knot` vertices at those two points (§4.3), so the square reads as the widening it is. The
   chosen site, its score and the runners-up are recorded in the report; `setAttr` on the reservation's `rank` or a
   `drawBoundary` moves the market by hand (§7.1). *The batch.* The plazas, the precinct, a flanking principal market's
   square, and the castle bailey enter L1 as barrier faces carrying the `reserved` role: no way crosses them (S4, S5) other
   than a flanking market's own way, S8 does not cut them, and the claimed entity is built inside them (§4.7, §4.8). Every
   other claim larger than a block is S7b's (§4.5 S7b (3)), every secondary market among them except a polycentric
   nucleus's plaza, which this step ranks secondary (1).
13. **Destinations** are typed entities: the plazas' attach points and a flanking principal market's (12); each gate and
   its bearing (an **external bearing** per gate for a walled town; an unwalled town derives its bearings by the same law
   on its own land); the **town bridge** — the crossing site nearest the centre when a river passes through the stage-1
   region, which (1) scored the centre against, connected in town (§4.3) — while every other site becomes a bridge only
   when a route (S4) or a growth proposal (S5c) uses it (S1 (5)); the harbour (its destination node is its basin's
   landward attach point; its route, (11)); the castle's town-side gate; the precinct. **Island towns (FTG-19):** when the
   settlement's land component does not touch the frame, external destinations are shore points — the harbour, one
   **landing** per requested bearing (the shore point nearest the bearing with the best deep-water score) and a ferry
   point — and O4 (g) counts landings as the external connections.

**Dossier-backed elements at creation (item 22 (d); with §7.7; J-A22.41).** A brand-new map from an existing dossier holds
every dossier element from the start: the blueprint's assignments and the dossier-backed elements enter S2's manifest as
**fixed rows** — one (class, ordinal) each at the head of its class, present at every population and never withdrawn by
the roster's arithmetic, so prefix stability holds with them — and S7b allocates them before the roster's free demand in
each rank of its order (§4.5), S10 (3) claims them and S10b's `generation` request places them (§4.7). The log's creation
prefix records these placements as the generation run's own (§7.4). A dossier element that arrives after creation is a
`dossier` request on the current map (§4.7 S10b, §7.7), and one that arrives with an epoch's inputs a mutation at that
epoch (§4.11).
=== END ===

=== REPLACE ### 4.3 S4 Backbone — arterials routed between named destinations, built as one graph ===
### 4.3 S4 Backbone — arterials routed between named destinations, built as one graph

**Lattice and costs.** Built once at S3 (§4.2 S3 (3); they depend only on the frame, terrain, water and reservations) and
reused by S3's pick contour, gate routes and field `T`, by S4's routes and by every S5a boundary. Arterials (`through`,
`primary`) are routed between S3's destinations on this **candidate lattice**: a jittered hexagonal point set built by `hexLattice` (§3.4) at ≈ 25 m
spacing whose adjacency is known by construction (six neighbours per point, its jitter below half the spacing, so no edge
crosses another and §3.4's asserts hold; no Poisson sampling, relaxation or triangulation). Edge cost = length × (1 + k_slope · slope²) ×
waterCrossingPenalty (impassable except along a pinned crossing deck — a site or a built bridge, §4.2 S1 (5), S3 (2),
(10)) × reservationPenalty (impassable inside a reservation; the plaza and the castle are reached only at their attach
points and gate) × wallCrossingPenalty (only at gates) × existingFabricCost (epoch > 0: crossing a built face costs by its
class, so growth reuses streets) × landValue (× S3 (6)'s water-pull factor on the field `T`, never on a route). **The class grade limit.** An edge
steeper than the routed class's grade limit is impassable to that route. The limit is the class's `ways.crossing` row's
`rampMaxGrade` (V11 §3.24.5) — one value per class for the grade it is routed at and the ramps it climbs — read by S3 (5)'s
gate routes and S4's routes (`primary`'s inside the pick contour, `through`'s beyond it), by S5b and S5c (§4.4), by a raised
way's end ramps and by §7.3 (a) 5's steepness report; the field `T` reads no limit (it prices slope only). F-ROUTE's slope
rung (§5.2) relaxes a route's limit to the next class's in the order `through`, `primary`, `track`, `path`; a destination
no relaxation reaches takes F-ROUTE's last rung (`unserved`, reported). A raised way is kept from the commit that creates it
(§2.7's support step (6)): its standing support rings (`state` absent or `ruined`; a `cleared` one's ground open), ramps, stairs and feet (`RaisedWayRecord.feet`), and once the span rule has run (its one eager run, after §4.6's cut) the under-deck strips of its `vault` spans but one read `open` (§2.7's laws, law 1 (8); its worked example the crossing table's *beneath*), are impassable to every route
and growth proposal on ground part 0 laid after it, at generation as after it; the rest of its under-deck strip (§4.6)
is crossed only under a span — an `open` one, a `vault` one read `open` among them, once the span rule has run — whose clear width between the standing supports' rings is at least the way's width + `raisedWays.structure.clearWidthM` and whose soffit meets §2.7's *The clearance*
for the crossed way, within ± `raisedWays.structure.squareDeg` of square to the deck (V11 §3.24.2), never along the
strip. A route's crossing shifts along the strip to the nearest crossing these admit, else the route takes another
course by F-ROUTE's ladder (§5.2). S5c's proposals (§4.4), stage 2's ways (V01 §3.17.3 (3)), V07's village trackers
(V07 §3.5a (3)) and S7's quays, intervallum and castle paths keep the same crossing rule, each with its own ladder (§2.7's laws, law 1 (1), (8); its worked example the way-and-channel table's row (a)). At
epoch 0 S3's plaza-rooted Dijkstra tree gives every plaza-anchored route; a tree path that crosses a claim or water S3
added after the tree (the castle bailey, a moat) is re-solved by heap A\*, as are routes without a plaza end and every
route at epoch > 0 (with `existingFabricCost`). At village rungs the village product's VS4 replaces S4 and calls this
router (V07 §3.5).

**Routes.** S4 commits the gate routes solved at S3 (§4.2 S3 (5)) without re-solving: each is split at its gate into the
inward street (plaza attach point ↔ gate, `primary`) and the outward arterial (gate ↔ frame edge at the gate's bearing,
`through`), so roads leaving the walled stage = N (plus a harbour gate of §4.2 S3 (7) where one was placed, and the gate a carried way standing before the stage takes, §2.7's laws, law 2 *Carried way*) and each gate
carries one road out and one street in (MFCG's gate identity; MFP-4). Where S3 carved water across a solved route — the
city moat just outside each gate — S4 re-solves only that stretch, from the last lattice node before the channel to the
first beyond it, through the gate's deck, which continues the gate passage straight across the moat, perpendicular to
it. S4 then solves the remaining routes: the town bridge (§4.2 S3 (13)), each of its two ends to the nearest arterial on
its bank in town; a site outside the boundary that a route uses is reached through the nearest gate, never through a new
wall crossing, and every other site stays a `site` unless S5's growth uses it; the castle street (the castle's town-side
gate ↔ plaza, across the castle-moat deck when there is a moat); the precinct's frontage ↔ the plaza side it faces; canal
decks inside the boundary ↔ the nearest arterial. Harbour ↔ plaza and island-town gate ↔ landing were solved at S3. A
polycentric town's gate-to-gate route between adjacent nuclei (solved at S3 between their forced gates) joins their
plazas through both nuclei's gates; for a pair merged under one enceinte it crosses the cross wall at its gate.

**One graph, then one smoothing (GEO-16).** All routes are solved first on the lattice; the arterial graph is the union of
the lattice edges they use, each carrying its multiplicity (how many routes share it). The graph is split into chains at
every node of degree ≠ 2 and at every pinned node (gates, attach points, deck ends, landings); junctions closer than 8 m
are merged *on the graph*; each chain is simplified (Visvalingam) and smoothed (Chaikin × 2, then curvature-limited to the
class's minimum radius) **once**, with its end nodes pinned, and inserted into L1 **once** as a spine — a `mandatory`
chain carrying the `way` role (§3.6), whose attraction folds any residual near-duplicate within `attractCm` (§3.6) into a shared
stretch — so routes sharing a run out of the plaza become one street, never braided near-duplicates. Class and width come
from multiplicity and betweenness on this graph (the width table `ways.widths` keyed by class and rung, the class by
betweenness; O4 c; the village rungs' rows are V07 §3.5's and V07 §3.10a's, the base rungs' unchanged); where a way's width
varies along it (a widening at a market or a gate), S4 places `width_knot` vertices at the class-change junctions
(`insertChain` `opts.knots`, §3.4), so the width is a knot profile on the spine (§2.2 rule 5). Junction rules: minimum
crossing angle 30° (else deflect); **Y → T conversion** where the acute arm can be bent within its class curvature limit
(G-P5). **Decks** are fixed edges of the graph: smoothing never moves their vertices and each approach curve stays within
the class radius; an approach to a river or canal deck that cannot meet the radius takes F-ROUTE's ladder (§5.2) —
another site on the same reach within its search band, then an extra bridge placed as §4.2 S1 (5) states — while a moat
deck stays fixed to its gate, whose passage it continues straight. Every deck a route uses becomes a `built` bridge when
the spine lays its span through its two bank vertices (§2.7). **Test:** on B-CITY no two spines run closer than their
class separation for more than one step length, and every deck's way angle is within ± 10° of the channel normal.

**Result.** Through-roads continue to the context margin with their bearings (O14); MFCG's radial gate → plaza
legibility (CONFIDENCE B7: streets converge on the plaza) with real metres and terrain (O4 a, d). Later growth stages add
main roads through S5b (§4.4), which runs this router incrementally with every existing arterial fixed, under the same
F-ROUTE ladder. S4's local operator for edits is §7.3's.

**Raised ways — viaducts, elevated roads, aqueducts (item 110 (b); file f item 290).** A raised way is a way carried
above the ground on arches over land, other ways or water; its deck, spans and an aqueduct's channel live
in their own arena part of the ground layer (ground parts from 1, allocated once and never reused, §3.4; the records are
§2.7's), so the ground's planar rule is untouched: it crosses the ways beneath without a junction, its two ends are its feet
on ground part 0 (`RaisedWayRecord.feet`, §2.7),
its supports are footprints on ground part 0 (§2.7's `supports`), which with its under-deck strip are holes for S8, S10 and
S11 (§4.6), the spaces between supports stay open or hold II.7.6's vaults, and the invariant "a ground-part-0 deck only over water" does not bind it (§5.3). An aqueduct is a
raised water channel of the same kind. It is drawn above what it crosses, with its shadow, and labelled like any way.
* **Where the generator raises one** — at CITY and METROPOLIS only, each for a reason (J-VI.2's reason words), each a soft
  rule with the chance, cap and structure cells of `raisedWays` (V11 §3.24.2): a **viaduct** (`drop`) where a `through`,
  `primary` or `secondary` route's best course crosses a ravine or valley whose drop exceeds `viaduct.minDropM`, priced
  in this route solve against the detour (span length × `viaduct.spanCostFactor`); an **elevated road** (`link`) joining
  two high wards, terraces, or a citadel and a great temple over a lower district — its two endpoints reservations (the
  citadel's site, a great temple's or cathedral's precinct), never the institutions in them, a terrace endpoint read from
  `terraceState(D).asks` (V01 §3.17.1 (1)), never `District.fabric`, so no cycle arises with S7c; likelier with prosperity
  and with dossier landmarks on high ground; an **aqueduct** (`water`) where the city's water need — S2's whole
  population at generation, the ground households at an epoch, against what its wells, river and cisterns supply inside
  the walls (V11 §3.24.6; the cistern rule reads the same distances) — is unmet and a higher spring or upstream river of
  the ground (never a sky arena's) lies within reach, carried across low ground on arches to a basin, cistern or
  fountain, crossing the wall through an arch, the era and culture rows scaling its chance. A TOWN gets them only by
  declaration.
* **The slot.** Every generated raised part is committed before S7b (1), reading the ground arena only: a viaduct inside
  S4's route solve (and each later stage's S5b through this router), an elevated road and an aqueduct at S6's end,
  reading S6's typed wards and pass-1 prosperity. Its stations and spans are placed at that commit and kept from then (§2.7's support step (6)), so S7b's capacity (§4.5), which subtracts each
  district's under-deck
  strips and adds the deck plots it owns, and the sky layer read it, and it reads no island.
* **The derivation unit and the stream.** Each generated raised way's derivation unit is V06 §2.13's `RaisedReasonKey`
  (creation index 0, epoch component 0), with one uniform per key on `raised.reason` (§6.1; epoch component 0); keys are
  taken in the kind order aqueduct, viaduct, elevated road — strength then address inside a kind — with V06 §3.19 (2)'s
  three readings, against the `RaisedWayLedger` (the count of standing generated, suppressed and declared ways against
  V11's caps, suppressed keys skipped). The ledger is exported by this generator's package and read by S4, S6's end, a new
  stage's S5b and V06's `raisedWays` step; the same package exports `raisedOutcome(model, subject): RaisedOutcome[]`
  (V10 §2.13), which evaluates one key exactly as the ledger's admission does — the reading and its bar, the strength,
  the gate's uniform recomputed from the key without advancing the stream (§6.1), the rung's cap and count, the
  suppressions read from the log's live removals and the declared list — enumerating no other candidate and solving no
  course, so its answer equals the generator's decision by construction (T-V10-41). The course solver and the hand
  operator (T4 `road` with `raised`, the aqueduct class) are callable from an epoch's phase with given ends; a ravine or
  valley `SiteFeature` keeps its extent; the aqueduct's terminal follows V06 §3.19 (6) at generation too. The record
  carries `reason?` (generated ways only) and its creation event writes the reason's `detail.why` rows.
* **The rung gate** (provenance `owner`, no table cell): the router prices a span only when the routed rung is CITY or
  METROPOLIS, whichever stage calls it; a product's stage that calls the router, and F-ROUTE's extra-bridge rung, pass
  the routed rung, so a village stage never lays a raised part (V07 §3.5).
* **Ground only, never into the sky.** At an epoch and in every post-build request the generator's endpoints and
  evidence are ground-arena entities (`PlatKey.layer` `'ground'`, any part); a reservation an institution island hands
  over (V05 §3.5) keeps its road, the reason reading through the hand-over. Every raised part laid after SKY — an
  epoch's, a T4 stroke's, or a generation stage's after SKY — reads `skyAccessObstacles` (V05 §2.3b): the deck, its
  parapet and its supports stay outside every access column dilated by `accessSiting.deckGapM` and below every segment by
  its clearance, else the course re-routes by the solver's ladder or is not built, reported. A raised part's two ends
  are ground vertices; a T4 `raised` stroke ending on an island's rim is bent into `placeSkyAccess`, and an aqueduct stroke
  there ends at its last ground vertex (V05 §4.2; J-VI.4 (d)).
* **Where it may not go.** A raised part's course treats the harbour basin and its mouth — between the mole heads or
  shores that carry item 106's harbour-mouth gate — as excluded (masts must pass; a stroke across it is bent to end at
  its last ground vertex before the basin, named in one line), meets a wall by §2.7's laws — its course, a viaduct's priced in a route's solve among them, searching only the courses those laws admit (law 1 (2)–(6), (9)–(11), read with their terms; law 2 (a); a placement-locked wall met as an unlocked one, law 2 *Entry*; their worked examples *over the band* and the crossing table), an aqueduct so crossing each wall at its own level, in the form that level gives (law 1 (2)); a road deck, a viaduct's or an elevated road's, never crossing a trace standing when its course is laid (at S3 (7) the stage-1 boundary — from S3 (9) on, its trace — and at S5b the stage's picked boundary counting as standing; a frame growth's extension, which keeps the deck's course, excepted: §2.7's support step (7)): a deck priced in a route's solve comes down to a ground vertex before the trace, its route crossing it on ground part 0 through the gate there, else re-routed by the solver's ladder or not built, reported, and a raised way whose two ends are fixed before its course is solved — an elevated road, a founded viaduct — is not built across a standing trace, reported, at an epoch waiting (V06 §3.19 (5)) (§2.7's laws, law 1 (3); its worked example *down before the wall*; by hand §7.1, file f item 363) — and crosses a moat or a canal standing when it is laid only on a span, no support in its water (a channel laid after it by §2.7's laws, law 1 (1), (8); its worked example the way-and-channel table's row (e)), and stands no support on a square, a reservation or an oasis's water; a river or canal it may span between supports on the two banks (a frame growth's extension with no fitting course excepted, §2.7's support step (7)) within `viaduct.maxSpanM` and §2.7's clear-span bound
  (`raisedWays.structure.maxClearSpanM` by material class: a generated course past it drops, `raised_too_long`; a declared
  one bends); the obstacles a support slides off or is omitted over are §2.7's support step's.
* **Edits and shadows.** The user adds one (T4 `road` with `raised`, or the aqueduct class) or removes a generated one —
  a suppression that holds through regeneration (§7.1). Raised ways and retaining walls cast item 102's daylight driver
  (§4.5, §8.4). Their decline is V06's (`DeclineOp`'s raised, retaining and deck members; §4.11).

**Markets as destinations (item 24).** A flanking principal market (§4.2 S3 (12)) is on its way already: S4 commits that
way through the square between its two `attach` points and places a `width_knot` at each, so the square is a widening of
the street's profile (§2.2 rule 5); a side street may end at a flank's midpoint attach as at a plaza. Every other market
— the plaza when it carries the principal rank, and S7b's secondary markets (§4.5) — is reached as a plaza or a claim is,
at its attach points; no market re-roots the plaza-rooted tree or the field `T` (J-A24.41).

**Trade flow — the gates' and the ways' trade weights (items 72 and 77; J-A77.41, J-A77.42).** `TradeFlow` is declared
and derived here: in two parts at generation — `gates`, `harbour` and `dominantBearingCdeg` at §4.2 S3 (7), as soon as
the gates and their bearings exist (they read no route), and `ways` after S4 commits the routes — and both again at each
epoch (§4.11), from the circumstances' trade slice (`CircumstanceSlice.trade`, its partners, their bearings and modes and
their fill, §7.7 layer 2) with the gates' and roads' geometry. It is a derived record — `Document.derived.tradeFlow`
(§2.9) caches it, rebuilt on load, never canonical — and it draws no random number.

```ts
interface TradeFlow { gates: { gate: Id; weight: number }[] /* with harbour, Σ = 1 */; harbour?: number /* the water partners' share, when the town has a harbour */;
  dominantBearingCdeg: Cdeg /* the weighted circular mean of the partners' bearings: where the settlement's trade mostly flows from (item 72 (a)(3)) */;
  ways: { way: Id; weight: number }[] /* each way's trade weight, below; absent ways weigh 0 */ }
```

* **Partners to gates.** A `road` partner goes to the land gate whose bearing lies angularly nearest its bearing (ties by
  gate id) — the gate S3 (4) picked for that bearing; a `river` or `sea` partner goes to the harbour, else to the water
  gate on its river, else to the nearest land gate. A gate's weight adds up its partners' weights, normalised with the
  harbour's to one; this is the **bearing's trade weight** §4.2 S3 (4) and (12) read. With no partner every gate weighs
  the same and the harbour nothing; with no gate (N = 0 and no harbour gate) `gates` is empty and every way weighs 0.
* **Ways.** A way's **trade weight** adds up the weights of every gate, and of the harbour, whose S4 route to the plaza
  (§4.2 S3 (5), (13)) follows it: the main streets in from the busiest gates carry the most and a way on no such route
  weighs 0. §4.5's trade-position component and its gate and main-street kernels read these weights (item 72).
* **Without a dossier** the blueprint's external bearings and the intent's trade setting fill the slice (§7.7 layer 2),
  so a standalone town has the same record; a user's gate or road edit re-derives it with the geometry.

**Two-point roads (item 101 (i)).** A `drawWay` declaration in its `points` form — two points and a class, or more points
for a free-hand line (§7.1) — is routed here at its dry run: each consecutive pair of points is joined by this router on
the lattice with the class's costs and `existingFabricCost` (a route prefers existing streets and plot lines), each point
snapped to the nearest lattice node or existing way vertex (the author's snap, §9.5, resolves the points first); the
chain is smoothed and inserted as S5b inserts a main road (§4.4), and a stretch across water takes a deck by §4.2 S1 (5)'s
crossing rule — its preview draws a bridge there. The dry run returns the derived route as the declaration's resolved
shape, stored resolved (§7.1), its pinned nodes the handles; no later derivation moves it (item 101 R13). A pair of
points no route joins (both inside one reservation, or across a sealed barrier) is bent to the nearest routable pair,
named in one line (item 101 R2).
=== END ===

=== REPLACE ### 4.4 S5 Growth stages — boundary and wall first, main roads, then FTG-shaped growth, then a capacity check ===
### 4.4 S5 Growth stages — boundary and wall first, main roads, then FTG-shaped growth, then a capacity check

Each growth stage k runs four sub-steps. Stage 1 commits the boundary, gates and trace S3 fixed (§4.2 S3 (6)–(9)); a stage
k ≥ 2 takes its boundary first, then its main roads, then its trace, so every gate lies on the boundary it was picked on.

**S5a Stage boundary and enceinte trace.** *Boundary (FTG-5, COV-FTG-D26; J-P7):* the boundary of stage k is a level set
of **network travel cost** `T(x)` — the least cost from the plaza(s) over the S3 / S4 lattice, where a lattice edge inside
an arterial's corridor costs ρ_road per metre and any other edge ρ_off per metre, both times the slope term and S3 (6)'s
water pull; water is impassable except along decks, reservations are impassable. The **anisotropy ratio**
`a = ρ_off / ρ_road` is a stage-regime and form row (our equivalent of FTG's spoke-priority control): walled core 1.3,
walled rings 1.8, ribbon 4, suburb 3, `linear-street` form 8 — our own values; FTG's measured road / non-road
90th-percentile radius ratio of 1.26–1.65 on its two captured cities is the calibration target for the extramural stages
(B-REF, §13.5). `a` also sets the wide-versus-elongated balance of ribbons and suburbs: on a flat, dry site a walled core
is compact and the outer stages stretch along the main roads. `T` is **one field**: computed at S3 (§4.2 S3 (6); ≈ 4 ms at
CITY), recomputed once after S3's L0 batch only when a moat was carved; S4's remaining routes and the harbour route are
not in its road set; each S5b's new main roads re-settle `T` incrementally, only at the nodes whose cost they lower, so no
stage computes a new field (SCL-3). **Stage 1's boundary is S3's contour, and S5a commits S3's trace for it unchanged.**
For k ≥ 2 the boundary is taken from `T` **as it stands when stage k begins**, before its own S5b: `t_k` is chosen so that
the land of `{T ≤ t_k}` ∪ the enclosure of stage k − 1 equals the land of stages 1…k from S2 (lattice nodes sorted by `T`,
their cell areas accumulated; exact to one cell) — the union keeps the stages nested even where a moat raised `T` just
outside the previous wall — and the boundary is that region's outer contour, Chaikin-smoothed and resampled. `t_k` is
capped as §4.2 S3 (6) caps `t_1` (the reachable land inside the frame; a frame arc open ground, inset as there): the
shortfall is the stage's, reported and carried to S5d, and a stage whose capped boundary adds no land to stage k − 1's
is folded into the last stage that holds land, its quota with it (reported), as `N = 0` folds the extramural stages into
the walled stage (§4.2 S3 (4)). S5b then
picks and routes the stage's primaries on that boundary; their re-settlement of `T` serves stage k + 1 onward, so the
boundary a gate was picked on is the boundary the trace passes through.

*Trace (GEO-18, FTG-8).* For a walled stage the trace is fixed **before the stage's secondaries grow** (stage 1 by S3,
§4.2 S3 (9); k ≥ 2 right after S5b) by one rule set, the registered `EnceinteStrategy`:
1. **Barrier closure (item 106 (a), (b)).** The strategy classifies the boundary's arcs by **defensibility** — a table per
   barrier kind (`shore`, `cliff`, `gorge`, `marsh`, `sheer`, `enceinte`; J-VI.3; rows V11): a sheer cliff, deep water or a
   gorge closes with no wall; a cliff closes behind a parapet, a steep slope or a marsh behind a light wall; open ground
   needs the full wall (V11 §3.16.1). A `cliff` arc is a bank of
   kind `cliff` or terrain whose slope exceeds the table's threshold over its height; a `gorge` a ravine `SiteFeature`; a
   `marsh` a bank of kind `marsh`. The trace walls the approachable arcs and the closing arcs whose row carries a wall (graded by §4.8),
   each stretch's ends anchored on its barrier (the existing anchor kinds) with a tower at each anchor (§4.8), never where §2.7's laws bar an anchor (law 1 (4)–(6), read with their terms; its worked example the fixed-place sentence); it records
   the closing arcs no wall stands on (the closure features, V11 §3.16.1) as `Enceinte.arcs` (each by its two anchor ends
   and its `BarrierKind`) with the stretch anchors `anchors[].end` (§2.7), and `Enceinte.closure` is `barrier` whenever an
   arc other than a shore closes it, the barrier edges closing the enclosure for every "enclosed" and "sealed" test. A
   river loop or a spur is walled across its neck only (general historical knowledge, not corpus-witnessed). Where a
   barrier edge lies within `wall.barrierReachM` (default 150 m, capped at the table's share of the stage's radius) beyond
   the stage boundary, the trace may extend to it; the spare ground it encloses is typed by S12b as intramural gardens,
   orchards and paddocks (§4.9) and is not counted as the stage's built land; otherwise the 40 m pull below stands. This
   moves the trace further from the settlement's hull, never onto it (the historical checks forbid "settlement hull ⇒
   wall", `partitioned/corpus-preview/history.md` rows 4a–4d). With `barrier` closure and the stretch profile off, the
   trace is the base's (a no-op pin). A stage k ≥ 2 picks its gates on its approachable arcs and takes §4.2 S3 (4)'s
   closed-arc reduction of its gates, classified on its own boundary; a stage with no approachable arc takes
   §4.2 S3 (9)'s *every arc closed* — walled on the closing arcs whose row carries a wall, with one gate there, or walling
   nothing and recording no enceinte where no closing row carries one — and in a walled stage the arcs a land barrier
   closes are impassable to routes as the wall is (§4.2 S3 (7)), while an unwalled one's routes cross them where §4.3's
   class grade limit admits an edge, else F-ROUTE's `unserved` (§4.2 S3 (9) (a)).
2. **Pull and pin.** The boundary is pulled to defensible ground within a 40 m search band (local ridges, slope breaks, river banks: a cost-surface path around the town with a penalty for leaving high ground, searching only the shapes §2.7's laws admit, its line read with the band and wall strips it carries there (law 1 (2)–(6), (9)–(11) and law 2 *Carried way*, read with their terms; law 2 (a): its own cost choosing among them; their worked examples *beneath*'s *Where the line crosses* and *Line and band*)), with **the gates pinned**
   where the arterials cross the boundary (stage 1: S3's gates; k ≥ 2: every crossing of an S4, earlier-S5b or this stage's S5b arterial, and a carried way's lawful pin, §2.7's laws, law 2 *Carried way*) — on ground part 0, a raised way met by §2.7's laws (law 1 (1), (3)–(5); its worked example *beneath*): an arterial crossing the boundary on a raised deck pins no gate there, and the pull keeps that crossing beneath its deck (law 1 (1), (3), law 2 *Carried way*), so the pulled trace crosses each arterial as the picked boundary did: on ground part 0 at its pin, or under its deck (its worked example *beneath*), and the stage's gates are its pins (`N_k`, §4.4 S5b); and a pin §2.7's laws bar where the boundary crosses its arterial — its gate's footprint, band and wall strips read from the gatehouse row and section they will be built by (law 1 (1), (4), (5), read with their terms; law 2 *Not yet built*) — is resolved by §2.7's laws, law 2, in its order: (a) moved along its arterial to the nearest place those laws admit it, within the pull's search band (law 3; past a road deck's foot, the first point beyond the foot, these laws' terms); (b) else its arterial re-routed as law 2 (b) moves a ground way, to cross the boundary at a gate those laws admit (a gate S5b spawned among them; a carried way as law 2 *Carried way* says); (c) else that crossing goes to F-WALL's raised-way rung (§5.2), which gives it law 2 (c)'s outcome on its path — and an `on_enceinte` castle **welded through its two weld vertices** (the shared edge is one wall; MFP-3).
3. **Smooth and simplify.** Pinned-vertex Laplacian smoothing in 3 passes (`wall.smoothPasses`, a wall-table row;
   provenance `ref:MFCG 12710731 three pinned smoothing passes (code)`, P12; J-A46.43), the gates, the weld vertices and
   an open chain's two anchors never moving → **topology-preserving** Visvalingam (the kernel's `simplify`, §3.4: minimum
   segment 20 m, no interior angle < 100°; a removal that would make the trace touch itself, cross water, enter a
   reservation or move a pinned vertex is refused) → inserted on L1 through `insertChain` as a `mandatory` chain carrying
   the `wall` role, gate vertices carrying `wall_gate`. On a shore or bank the trace is attracted onto the outline, so the
   shared stretch is one edge carrying both roles (§3.6). The trace is laid `standing`; S7 writes each run's condition at
   generation (§4.8; item 114 (d)).

A second castle on an outer enceinte (the citadel of §4.2 S0) is sited by §4.2 S3 (8)'s rules against its stage's
boundary and entered as an L1 barrier face in that stage's trace batch, with its gate and any moat deck; a castle's
curtain uses the same closure (a cliff-top castle walls only its approach), and a later ring anchors on barriers as it
anchors on the previous enceinte (item 106 (f)). A shoreline change (reclamation, an epoch's water) re-evaluates the
closure by least disruption (item 22).
*Water and the waterfront (COV-MFCG-C07; J-P25).* The trace never crosses water except at a **water gate** where a river passes — never where §2.7's laws bar a fixed place (law 1 (4)–(6), read with their terms; its worked example the fixed-place sentence): its two vertices on the river's banks carry `('gate_end', gate, 0 | 1)` and the `Gate` names them in `banks`
(§2.2 rule 7, §2.7). A generated gate's bank vertices are the trace's vertices on the shores, placed by S5a's L1 trace
batch after the water exists (L1 Steiner vertices on the L0 shores, or L0 shore vertices where the trace attracted); an
edited gate's (§4.11, §7.3 (b) 3) are promoted to L0 by the water's batch (§3.3 rule 3); both kinds are held under a warp
unless `fromLevel = 0`, as a deck's are (§3.6; J-K35). On a coast or a river bank the trace may be an **open chain** whose
ends are anchored on a barrier (a shore, bank, cliff, gorge, marsh or another enceinte). The **waterfront**: the preset's
`waterfront` row when it is set, else §7.7 DR2's derivation from the circumstances (item 106 (d): `open` by default —
MFCG's coastal wall stops at the water, FTG's captured wall is an open 17-tower chain from bank to coast; `quay_wall`
with sea gates where the threats come by sea or on a sea-exposed port above the table's size; `sea_wall` only by preset
or request); under either wall a water gate stands at every quay access, so every quay stays reachable through a gate,
and a river through the town keeps its water gates. `placement: 'aroundStage'` traces only the stage's new ring, as an
open chain anchored on the previous enceinte (FTG's "around stage plots"). Nothing grown later crosses the trace except at
a gate, and S6 treats it as a barrier. If an inward pull would leave the stage's land short by more than the S5d
tolerance, the pull is capped at the smoothing step (reported); F-WALL's ladder is §5.2's.

*Outer moats.* When the blueprint's `moat` is `all`, S5a carves stage k's moat (k ≥ 2) right after committing its trace,
through §4.11's carve path. Its way rule meets only arterials and a carried way standing before the stage here — each
just outside one of the stage's gates, the stage's secondaries not yet grown — so every way is kept with a deck and
nothing is cut, a carried way decked at its gate as at stage 1 (§4.2 S3 (10); §2.7's laws, law 2 *Carried way*): the L1
batch places each deck's two pinned bank vertices on its arterial or carried way where a wet stretch's banks will cross
it — the `deck_end` rows of a fresh `Bridge`, `built` with that arterial or carried way as its way (§2.7) — the span
between them carrying `deck` (the arterial is re-routed
between the gate and its next pinned node beyond the channel where it would meet the channel more than 10° off its
normal, as §4.3 re-solves S3's moat stretches); the L0 batch inserts the channel (the era row's width, outside the outer
half-band and a berm, along the walled arcs only, and only on the stretches §4.2 S3 (10)'s rule makes wet — every other
stretch a dry `ditch` (§4.7 S10 (0)) whose arterials take no deck) through those prepared vertices, so each span becomes its deck,
perpendicular to the channel and continuing its gate's passage across. S7 builds the bridge furniture (§4.8) and S5c
treats the moat as water. The carve clears no raised-way support: a raised way standing before the trace is kept (§2.7's support step (6)), the trace meeting it by §2.7's laws (law 1 (2)–(11); its worked example *beneath*, its crossings S7's to count, §4.8) and the channel by the way-and-channel table (§2.7's laws, law 1 (1), (8); its worked example row (e)), a channel stopped there counted in S5a's `W_RAISED_CROSSING`; a raised arterial passing over the trace takes no gate and no part-0 deck (§2.7's laws, law 1 (1)), and a part-0 way beneath it takes its own ground gate where those laws admit one (law 1 (5)) by §4.2 S3 (4)'s gate law (§4.8 *Gates*).
Nothing finer than L1 exists yet, so the carve's footprint clears nothing else. The innermost
enceinte's moat is S3's (§4.2 S3 (10)).

**S5b Main-road step (FTG-4; stages k ≥ 2 and every epoch stage).** The stage's primaries match its gates: `N_k` = the
gate law of §4.2 S3 (4) on the land inside the stage's enceinte, with its closed-arc reduction and its waterfront reduction where the stage's boundary
runs along a sea or lake shore for at least `gate.waterfrontShare` of its length (walled; J-A46.42), or one primary per
`mainRoadSpacingM` of boundary (unwalled; 450 m at CITY). The existing arterials all continue to the frame, so they cross
the new boundary `c` times on ground part 0 (a crossing on a raised deck no gate, and one whose gate §2.7's laws bar where the boundary crosses it, one of them only where S5a *Trace* (2) moves its pin to a lawful place, its way else re-routed through a gate this step spawns — §2.7's laws, law 1 (1), (4), (5), law 2 (a), (b), *Not yet built*; its worked example the way-and-channel table's row (d); a carried way standing before the stage one of them where §2.7's laws, law 2 *Carried way*, give it a lawful pin); when `N_k > c`, S5b spawns `N_k − c` radial destinations on the boundary's approachable arcs by nested picks
(largest angular gaps first, terrain-scored like gates) and routes each with the incremental S4 router (§4.3) from the
nearest junction on an existing primary *outside* the previous enceinte (never through an inner wall) to the frame at its
bearing; when `N_k ≤ c` it spawns none and the crossings are the stage's gates. It routes under S4's F-ROUTE ladder
(§5.2), extra-bridge rung included (where that rung fires on standing water, S5b's L0 batch of two same-level shore
splits precedes its L1 batch; §4.1, §4.2 S1 (5)), and may raise a viaduct by §4.3's rules, its course coming down before the stage's picked boundary (§4.3 *Where it may not go*), so each spawned primary crosses the boundary on ground part 0 and is a main gate (§2.7's laws, law 1 (3); its worked example the way-and-channel table's row (d)). The crossings become stage k's
main gates; posterns only for an explicitly requested remainder. An outer enceinte never gets fewer gates than arterials
cross it on ground part 0; a request below that is raised and reported (a requested gate count applies to the innermost enceinte, MFCG's
semantics). **Test:** primary length per km² and the share of gates on primaries in band from TOWN to METROPOLIS; each epoch stage whose `N_k` exceeds its crossings adds ≥ 1 primary; a stage whose spawned primary's best course is raised across its boundary still has `N_k` gates, each on ground part 0.

**S5c Growth of the secondaries.** Inside the boundary a priority queue of proposals grows streets FTG-style (CONFIDENCE
C5): each proposal `{origin junction, heading, curvature, goalHeading, class, remainingSegments, branchCounter,
priority}`, lowest priority first; step length by class (secondary 25–40 m, lane 15–25 m; FTG's district streets persist
at (L + 0.5)/2 ≈ 25–30 m, `_critic-ftg.md` F3, where our tables start). A stage with no seed inside its boundary (no
arterial junction or gate plaza) grows nothing, and S5d prices its land as it stands.
* **Division of labour with the bent cut (MFP-2; J-P4, J-3).** In **walled regimes** S5c grows only the
  arterial-connecting secondary network at district scale — proposals seeded at arterial junctions and gate plazas,
  separation floor 120 / 160 / 200 m at TOWN / CITY / METROPOLIS, destination bias toward other arterials — and every lane
  and finer intramural street comes from S8's recursive bent cut of the district polygon, which inherits the wall's and
  the shore's direction (the MFCG street-signature targets are §13.5's). In **extramural regimes** (ribbon, suburb,
  unwalled rings, the ground between polycentric nuclei) growth works at block scale as FTG's does.
* **Heading model per proposal class and preset (FTG-17, FTG-6; J-P8).** `ou`, a mean-reverting curvature walk:
  `κ ← ρ·κ + (1 − ρ)·κ_goal + s·√(1 − ρ²)·ξ` per step Δs, with `ρ = e^(−Δs/ℓ)` (correlation length ℓ),
  `κ_goal = (θ_goal − θ)/L_r` (reversion toward the proposal's goal heading over L_r), `s` from `headingSigma` in degrees
  per 100 m; organic defaults 20° per 100 m, ℓ = 90 m, L_r = 250 m; planned 5° per 100 m. At the organic defaults a 600 m
  street's net turn is p50 21°, p90 50°, 0.1 % beyond 90°, and the per-30 m-step turn p95 11.4°, p99 14.9° with Gaussian
  tails — no cliff and no curling (receipt `docs/validation/bench/fixall_pipeline_ou_heading.out`, 4 000 streets per
  setting). `radiusHold`: ring proposals keep the curvature 1/r of their radius about the centre with a small `s` (the
  `ringed` preset); `gridLock`: headings snap to the preset's grid table (`american`). CI tests the drift distribution per
  preset.
* **Branching** after `n` segments with a per-class probability, perpendicular ± jitter (FTG's `Continue`) or tangential to
  the centre (FTG's `Curve around origin`, the `ringed` preset's ring branch).
* **Destination bias**, switchable per class and preset: a proposal that can reach an unserved destination or an existing
  spine within ≈ 1.5 step lengths turns toward it (connecting the fabric, ending cul-de-sacs deliberately); off for suburb
  offshoots and ring proposals.
* **Legality (explicit, unlike FTG's unstated thresholds; GEO-37).** Minimum separation from parallel spines = the
  regime's separation, and the same clearance applies to shores, wall setback bands, reservations and the stage boundary:
  a proposal running within `max(minimum block depth of the regime, separation / 2) + half its corridor` of any of them
  and within 30° of parallel is deflected or rejected, so no strip thinner than a plot depth is left; a proposal meeting a
  shore or a reservation at ≥ 30° ends there (a street arriving at the quay). A standing raised way is crossed only as
  §4.3 *Lattice and costs* states: a proposal meeting what that rule makes impassable, or meeting its under-deck strip anywhere else than where that rule admits a crossing, is deflected along the strip to the nearest crossing it admits, or ends at the strip as at a reservation (§2.7's laws, law 1 (1), (8); its worked example the way-and-channel table's row (a)). A wall is never crossed except at a gate: a
  proposal reaching the setback band stops there. Snap to a junction within `0.35 · step`. **Crossings follow the preset's
  crossing matrix** (proposal class × crossed class → stop in a T, cross with a materialised crossroads, or deflect):
  organic crosses only a lower-or-equal class collinear within 6° (the rare crossroads, O4 b); `ringed` crosses radials
  with rings; `american` crosses on the grid. **Water:** a proposal whose class row allows a bridge (`secondary` and
  `lane` by default) and that meets a river or canal bank within `0.35 · step` of a `site`'s bank vertex (§4.2 S1 (5))
  snaps to it and continues across that deck to the far bank vertex, which builds the bridge (§2.7) — FTG's crossing
  proposals becoming bridges, the sites' 40 m minimum spacing playing its minimum distance between bridges; any other
  proposal meeting water ends there as at a shore. Slope ≤ the class's grade limit (§4.3 *Lattice and costs*: its `ways.crossing` row's `rampMaxGrade`). Junction rules as §4.3, with T-preference in
  organic regimes; the junction-degree band is a preset row (organic 4-way 0–15 %, ringed 20–45 %, american 40–80 %).
* **The arable reserve (item 26; off by default).** When the farm table's `reserveArable` is on (§4.9), S5c's legality
  adds one soft term in the extramural regimes — ribbon, suburb, unwalled rings and the ground between polycentric
  nuclei: while the fertile land left outside the built extent (`SiteResources.fertile` cells of frame and margin outside
  the boundary, §4.2 S1 (10)) is below the arable demand S2 recorded (`arableReserveHa`), a proposal onto a fertile cell is
  priced by `reserveArable.penalty` (default 3, a multiplier on its cost), so growth prefers poorer ground; a shortfall S5d
  then finds is reported (F-BUDGET-STAGE), never repaired by a restart. Off, the term is absent and growth ignores
  fertility, as both references do (J-A26.43).
* **Between stages:** prune dangling `secondary` chains shorter than one block width; trim only S5-grown provisional
  spines that run beyond the boundary (FTG-18) — **S4 and S5b arterials are never trimmed**. The boundary becomes the next
  stage's start.

**S5d Capacity check (FTG-2).** Right after S5c the stage's new coarse faces are priced: built land per face = face area
− the corridor reserve of its spines (declared half-widths) − reservations, floored at 0 (a face its reserves cover holds
no built land); each face's band is the driver-only prosperity field at its centroid (S6 pass 1's kernels) cut by
provisional cut points computed as §4.5 computes the recorded bands, over the land grown so far (S6 then records the
town's `FieldBands` once, over all stages). If the land per band falls short of the stage's demand
`Σ n(c, b, k) · plotArea(c, b) · (1 + λ_b) / plotShare` by more than 5 % in total, **one top-up** runs (skipped when no reachable land is left inside
the frame, §4.2 S3 (6)): the level set grows
to cover the shortfall, S5a re-traces only the affected arc between its pinned gates, keeping each arterial's and each carried way's crossing as the stage's picked boundary had it (S5a *Trace* (2): under a deck where it crossed on one; §2.7's laws, law 2 *Carried way*, law 4), the land beyond a deck's foot the re-traced arc cannot then take moved to the next stage's quota as a moated arc's is, reported, and S5c grows the added rim —
except along a moat: a moated arc is never re-traced, so a moated stage's shortfall moves to the next stage's quota (the
last stage's to the exact check), reported. A remaining shortfall goes to the exact check after S10 (§4.7) and to the
F-SITING reconcile, reported (F-BUDGET-STAGE, §5.2). **Test:** §13.2's B-CITY `wealthLevel` sweep.

**Stage regimes** (a table; `StageRegime` rows per rung, era and form):

| regime | where | block-depth band floor | separation | `a` | heading / bias | notes |
|---|---|---|---|---|---|---|
| dense core (walled) | stage 1 | 30–45 m (applied by S8) | 120–200 m (district-scale secondaries only) | 1.3 | `ou`, bias on | lanes come from S8; T-preference |
| walled rings | walled stages ≥ 2 | 45–70 m (S8) | 120–200 m | 1.8 | `ou`, bias on | courts and rear lanes (S8) |
| ribbon (default extramural) | outside the last enceinte along arterials | plots directly on the arterial, depth band 30–50 m, **starting beyond the outer setback / glacis** (MFP-9), density falloff by a distance-to-gate kernel (the idea of MFCG's outskirts filter) | — | 4 | — | MFCG's outskirts: 71–85 % of its extramural buildings lie within 100 m of a gate road (red-team EXP) |
| **suburb** (FTG C10; preset, era row or shanty toggle only — MFP-6; and a history epoch's unwalled stage of at least `growth.ribbonMaxHouseholds` households, V06 §3.6) | a final regime outside the last enceinte | 40–60 m | 80 m | 3 | offshoots, bias off | an optional **perimeter lane** (FTG-20) — the previous enceinte's outer boundary offset by setback and glacis, typed `lane`, broken at arterials — seeds offshoots at a 60–90 m spacing row besides the arterial seeds; offshoots grow as `cul_de_sac` / `lane` proposals **without destination-bias termination** (deliberate dead ends), no infill below the band; plots **directly along the offshoots with small plots from the outset**, a per-plot density Bernoulli from the distance-to-gate kernel leaving gaps; calibration references: FTG's 83 cul-de-sacs, 30.00 m suburb streets, 14.70 m plot outlines (`research/ftg-capture/roadlength100/README.md`) |
| `american` / `ringed` presets | on request | — | preset | preset | `gridLock` / `radiusHold` | crossing matrix and junction band per preset; fixture: `ringed` on a flat site gives ≥ 3 closed rings with radius CV ≤ 10 % and ring × radial crossroads |

**The fusion risk gate (O4 f) and its fallbacks.** S4 + S5 + S8 infill ≤ 100 ms at CITY on reference hardware; the
infill's block-area and junction-degree distributions inside the NG-measured bands on the same district shapes **and**
MFCG's street-signature rows (orientation coherence at 60 / 120 / 250 m, wall and shore alignment by distance band, T/Y
share, intramural dead ends, blocks per ha, plots per block) inside their bands (§13.5). M0 measures this before anything
else is built (§16). If the gate fails on time, extramural growth also stops at `secondary` (`lane` becomes infill-only
everywhere) and the gate is re-run; if it fails on statistics, the infill constants are recalibrated against the NG
vertex captures and the MFCG size-sweep exports (spike M0-b) before M1. Neither fallback changes the architecture. The
gate is repeated at M1 on B-CITY-lite's river, coast and relief configurations with M1's pre-decided fallbacks (§16;
IMP-13).

**Markets and `T` (item 24).** `T` keeps its root at the plaza(s) whatever site the principal market takes (§4.2 S3
(12)): an off-centre market is a destination the routes already serve, and the stage boundaries and gates are the
centre's (J-A24.41). A secondary market S7b claims in a later stage (§4.5 S7b (3)) seeds that stage's district typing and
its prosperity kernel (§4.5), never its growth.
=== END ===

=== REPLACE ### 4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture ===
### 4.8 S7 Fortification furniture (per enceinte) · the castle · water furniture

**The trace is S3's and S5a's** (§4.2 S3 (6)–(9), §4.4), always fixed before that stage's secondaries grow. S7 builds
everything that stands on the traced wall, once per enceinte, after S6 has typed the districts, in **one L1 batch** per
enceinte; its geometry at L3 and L4 is built inside the wall strips by S10 and S11 after S9. A raised way S7 meets is met by §2.7's laws (their worked example the crossing table): the strips, band, towers and gates beside a trace laid after it, and the towers S7 lays beside a trace an aqueduct at S6's end crossed (law 1 (2), (5); its worked example *over the band*), as the laws give them (law 1 (2)–(11); its worked example *beneath*) — the strips and band as anywhere, no gate's, postern's or tower's footprint where law 1 (5) bars it (one whose footprint the spacing or the gate law would place there moved to the nearest place the laws admit, law 2 (a), law 3), no fixed place (the laws' terms) where law 1 (4)–(6) bar it and none moved along the trace, whichever is laid later keeping them apart (its worked example the fixed-place sentence), each crossing of a trace laid after it with its deck line reported (`W_RAISED_CROSSING`) —, a gate plaza cut round its supports, ramps, stairs and feet, a quay, the intervallum or a castle path crossing its under-deck strip by §2.7's way-and-channel table, row (a) (a worked example of §2.7's laws, law 1 (1), (8); an intervallum ending at the strip leaving the inner strip bounded across it by its inner setback line), and no pier, mole or breakwater rooted on its supports, ramps, stairs or feet, a root moved along the shore to the nearest clear one.

**Wall strips, band, setbacks, intervallum (GEO-38, MFP-9, COV-FTG-G07; J-P29).** S7's L1 batch cuts two **wall strips**
off the L1 faces beside the trace's walled stretches. Inside: the band's half (wall thickness by era 2–3 m, read along the
stretch profile below) plus the inner setback (table 6–10 m; MFCG's "buildings never touch the wall"), bounded by the
**inner setback line** — or, where the era row asks for an **intervallum** (`lane` on inner and outer enceintes at CITY and
METROPOLIS in the high-medieval preset, `none` at TOWN), by the intervallum spine itself, inserted here as an L1 `lane`
whose kerb is the strip's edge. Outside: the band's half plus the outer setback and glacis (table 10–20 m), bounded by the
**glacis line** — or, where a moat runs along the wall, by the moat's inner bank, the strip then being the band's half plus the berm; across an under-deck strip where the moat is stopped (§2.7's laws, law 1 (1), (8); its worked example the way-and-channel table, row (e)) by the glacis line, as on a dry stretch. The lines carry the structural `setback` role (§2.2 rule 7), run from gate to gate, stop at each gate's plaza
claim or arterial corridor, and close on the secondaries S5c stopped at the setback band, so each strip is a face of its
own; strip faces inherit their district from the faces they were cut from and are typed `wall_strip`. A barrier arc the
trace leaves unwalled (§4.4) carries no strip. S8 never cuts a strip and its lanes end on the strip's boundary (§4.6);
S10's eager step (0) builds inside each strip block the L3 half-band, the setback and glacis residue and its side's parts
of every tower and gatehouse (§4.7), so nesting holds and no later batch splits them. **Both faces are unbuildable:** no
plot is cut in a strip, so the hard invariant "footprints ∩ (band ⊕ setback) = ∅ on both faces" holds (§5.3), and ribbon
plots start beyond the outer strip (O8 b).

**Graded by stretch (item 106 (c)).** The grade is `Enceinte.stretchClass` (§2.7), a `'full'|'parapet'` step profile on
`wall_class_knot` vertices that S7 writes with the trace's furniture; the wall's thickness, height, walk and tower spacing
read its class's row (V11's `walls.barriers`), keyed by each arc's defensibility class (§4.4): the full curtain on open approaches; a lighter parapet on
cliff tops, steep slopes and waterfronts; no wall where the drop is sheer or the water deep (closure only); the strongest
towers where wall meets barrier and across a neck. The per-enceinte values are the profile's defaults, and an absent
profile is uniform (the base's wall; §7.5). At village kinds the light section reads `village.json`'s
`palisade.lightHeightCm`, and item 106 (b)'s reach cap reads `R_s` for the stage radius and `palisade.barrierReachShare`
for the share (V07 §2.2, V07 §3.4).

**Condition at generation (item 114 (d); J127).** S3 and S5a lay every trace `standing`. With no history replay, S7 then
writes each run's `Enceinte.condition` and material (§2.7; item 114 (b)) from §7.7's DR41 — the dossier's defence
readiness and wealth (or the blueprint's stand-ins) mapped to the table shares of `walls.condition`'s `generation` cells
(V11 §3.25.3), a `patched` run's material from `walls.patchMaterials` by the enceinte's kind and culture — along an
`on_enceinte` castle's shared stretch (`Castle.cityWeld`) one draw, on the town enceinte, sets the stretch's condition and
material and the bailey's profiles there mirror them in the same batch (§2.7 *An enceinte's condition by run*: the
castle's welded stretch); with the
replay, the replay writes them (§4.11 *History-first generation*). With the row absent, its switch `atGeneration` false,
or its inputs neutral, every run stays `standing` in its robust material (the no-op pin).

**Gates — exactly N, by construction (MFP-4).** Main gates are where S4's and S5b's arterials cross the trace on ground part 0 — a deck passing over a trace is no crossing (§2.7's laws, law 1 (1)): N₁ gate sites
were picked in S3 and the arterials routed through them, and each outer enceinte's gates are its S5b primaries' crossings on ground part 0 (§4.4 S5b), a carried way standing before a stage taking its gate as §2.7's laws, law 2 *Carried way*, give it, so roads leaving each walled stage, so counted, = its gate count and no arterial ends blind against a wall. Water gates sit
where a river passes (its two bank vertices named by `Gate.banks`, §2.7), at every quay access under a `quay_wall` or
`sea_wall` waterfront (§4.4), and at a harbour gate (§4.2 S3 (7)); the castle has one town-side gate; posterns are a
separate, road-less count added only on request; `N = 0` is honoured in S3. **Gate plazas (G-R1):** a small plaza is
claimed in S7's L1 batch at each main gate inside the wall, taking the inner strip's setback zone around the arterial
(MFCG B14); **forecourt squares** at churches and temples are typed open spaces sized by the institution's class — a church
or temple on a later reservation without one takes its forecourt from S9b's dispatch, and one below a block a `forecourt`
yard part of S11 (V01 §3.5.3). Gate passages stay open by construction: a wall strip ends at the corridor of the way
through each gate, so the band and gatehouse parts S10 builds never meet that corridor, and the intervallum's corridor is
the strip's inner edge. A raised way and a trace meet by §2.7's laws (law 1 (1); its worked example the crossing table): no station, gate or opening on a deck. The F-WALL ladder's last
rung is §5.2's.

**Towers** — a row per enceinte kind and rung: at every trace vertex whose turn exceeds a threshold and along straight runs
at a spacing (35–60 m by rung and era, read along the stretch profile; FTG's 39 m median and MFCG's tower-per-vertex are
the two reference points), and at every barrier anchor (item 106 (a)), never moved off it for a raised way (§2.7's laws, law 1 (6), (11); its worked example the fixed-place sentence); kind (round, square, bastion, octagonal) by era row;
heights and a ground datum per tower; each tower's footprint is built per side of the wall by S10's step (0) (§4.7). At
village rungs `palisade` and `earthwork` carry no towers (a barrier anchor takes an end post, a gate a gatehouse on a
`through` way, else a timber gate), and `inner` carries towers at turns above the threshold and at barrier anchors, none
along runs (V07 §3.4).

**The harbour mouth (item 106 (e)).** A walled port's harbour entrance gets two towers on the mole or breakwater heads (or
the shores) and a chain between them — at the nearest heads or shore points along the entrance whose gate and towers §2.7's laws admit, else not laid, reported (`W_RAISED_MEETING`; law 1 (5), (6), law 2; its worked example the fixed-place sentence) —: a `Gate` of kind `water` across the entrance, its banks the two heads (§2.7), S7
furniture drawn raised or lowered by the era row. The mole head's slot holds this tower (the deck-plot landmark slots,
§4.7), a `fort` replacing it as the chain's anchor where `deck.landmarks` draws one.

**The castle (MFP-3, COV-FTG-G09, COV-FTG-G10).** The S3 bailey reservation becomes the castle's plot; its curtain is its
own enceinte of kind `bailey` along the reservation polygon, with towers at its vertices and along its runs, using the
same closure (a cliff-top castle walls only its approach; item 106 (f)); an `on_enceinte` castle is already welded into the
town wall through its two weld vertices (the shared edge is one wall). A **castle template table** places the
**gatehouse** at the town-side gate S3 fixed (§4.2 S3 (8)), with an inward spur; the **keep** — shape `rect` (by `lir`),
`square`, `octagon`, `round` or `cruciform` with corner projections, by era and rank rows — opposite the gate, on the
highest ground or central, by row; an optional **inner ward** (an inset of the bailey by 30–40 % with its own gate, its wall
chain in S7's L1 batch) by rank; **internal paths** as `path` ways keep ↔ gatehouse ↔ wall stairs (S7's L1 batch; the keep
and gatehouse footprints are S11's); a **surround** row (`Castle.surround`, §2.7) — an esplanade (MFCG's green spacer
before an inner castle, §4.9, claimed by S7b beyond the bailey's outer strip, §4.5 S7b (3)), a park with a perimeter path,
a plaza, a cliff skirt on a cliff site, or none; a **moat** (`Castle.moat`; carved at S3 when water is within reach — a ring
with its gate deck around an `inside` or `outside` bailey, only the outer arc around an `on_enceinte` bailey, §4.2 S3
(10)); and, for an `on_enceinte` castle, a **town-side** row, `townSide: 'dry_ditch' | 'none'` by era and rank (default
`dry_ditch`; J-P36): a dry ditch types the glacis part of the bailey's town-side outer strip `ditch` (§4.7 S10 (0); the
bailey enceinte's `glacis` holds it, drawn by §8.2's ditch role; `ditch` names only this dry residue — a wet moat is a
`WaterBody`, named by `Enceinte.moat` and `Castle.moat`, §2.7) and is broken at the castle gate by the castle street's
corridor, as every strip ends at a gate's corridor, so the street crosses on a causeway; `none` leaves plain glacis. No
castle moat crosses the town wall (§4.2 S3 (10)). **Compactness (F-CASTLE).** The floor is the bailey reservation's
`compactnessMin` (0.75: MFCG's threshold on the compactness `4πA / P²`, kept as a *shape check*; §4.2 S3 (8)), checked when
S3 sites the bailey, before the trace welds to it, and **repaired in place first**, in MFCG 12710731's order — thinness
first, then shape (provenance `ref:MFCG 12710731 castle repair order and target (code)`, P10; J-A45.41). The **pinned
vertices** — an `on_enceinte` claim's two weld vertices, which stay on the boundary, and, once the town-side gate is fixed,
the two end vertices of the side that carries it — never move; at generation S3 (8) repairs the claim before it fixes the
gate on the repaired polygon. (1) **Bloat:** while the claim's nearest boundary vertex lies within `castle.minInnerM` (a
castle-table row, 40 m: MFCG 12710731's coded 10 units at its 4 m unit) of its area centroid — `regularFit`'s `centre`
(§3.4) — every free vertex moves radially away from that centre by 5 % of its distance to it (a 5 % scale of the claim when
nothing is pinned), step by step, stopping at the area band's top. (2) **Equalise:** each pass moves every free vertex 20 %
of the way to its place on the claim's best-fit regular polygon (`regularFit`, §3.4 — as many vertices as the claim, its
centre the area centroid, radius and phase from the ring's first Fourier component), for at most 20 passes; the claim is
**repaired** when its compactness reaches the floor and **unrepaired** when a pass gains less than 0.001 or the passes are
spent. A repaired claim is checked again against S3 (8)'s hard filter and counts as unrepaired if it fails it. Two parts
are ours (J-A45.42): the bloat moves only the claim's own vertices inside its reservation, where MFCG 12710731 pushes its
committed mesh; and an unrepaired claim takes the ladder's next rung — re-site to the next candidate (reported), and last
a keep without a bailey (reported) — never a restart (§5.2), where MFCG 12710731 restarts the city. The claim polygon is the
target of the `warp` `equalize` and `bloat` edits (MFCG's documented castle-resize workflow; the `equalize` brush takes the
same step, §7.1). **Acceptance:** castle area and compactness inside the band on ≥ 99 % of seeds with a castle requested (0
ways through reservations; MFCG's census baseline of 178 equalise passes and 11 bloats); every re-sited castle reported.
Several enceintes (citadel, inner, outer, suburb, bailey, palisade, earthwork) are stage rows in the table; up to two
castles (§4.2 S0). Every wall carries a lifecycle for wall → ring road conversion (§4.11's `wallToWay`, a `retypeEdges` on
the wall's role set).

**Water furniture.** **Bridges** stand on pinned decks — S1's on rivers; S3's on the moats and canals it carves (§4.2 S3
(2), (10)); S5a's on outer moats; a carve edit's on its channel by its way rule (§4.11); one L0 shore-split batch's where no
site stood (§4.2 S1 (5)). S7 builds the furniture of every `built` bridge, when a way's span is first laid through its deck
— at generation, or by its operator after an epoch or an edit; on a sky island's arena V01's unit run applies the same rule
(§4.2 S1 (5)) — and none for a `site`: the deck is perpendicular to the flow or channel by construction and S4 or S5 routed
the way to its ends; the class comes from the way; stone or timber by era and prosperity rows; the deck height (`deckCm`)
from the two bank elevations plus a clearance row; minimum spacing 40 m (FTG); fords where the class allows. A deck S1's
water operator re-sites keeps its `Bridge` address (§6.3); bridges and piers are re-based by §2.6's datum step
(`deriveBase`) after a terrain stroke (§7.3 (a)). **Harbour (GEO-19, COV-FTG-H17):** the basin was reserved and carved at
S3, before any street, so S7 builds only its furniture on the reserved shore: a **harbour-wall row** — shape (none, one arm,
two arms; following the coast or projecting) and type (wall, wall with rocks, detached breakwater) — moles, quays as
`quay` ways along the waterfront (bank kind `quay`), piers as `pier` ways at 12–20 m spacing, straight or branching, on the
harbour and on the open coast (FTG's ≈ 75 m length as a reference), timber or stone by era, each pier carrying its deck
height like a bridge (read by the projected shadows (`shadowPass`) and the 3-D export, §8.4, §11.1); no pier, mole or
breakwater arm is rooted on a bank of kind `cliff` (§4.2 S1 (7)) — a cliff-bound shore takes none, so it offers no deck
plot (§4.7 *Deck plots*; §4.13) — and a quay stands only where the bank kind is `quay` (§4.2 S1 (7)); moles, breakwaters, quays and piers are
`pier` / `quay` ways in S7's L1 batch. A pier, a mole, a breakwater arm rooted on one shore and a detached breakwater are
**harbour works** under §5.3's crossing invariant; MFCG's `1.2 ± t` pier casing is a style. **Canals and moats** were carved
with their decks at S3 (`canal` along the chosen line; MFCG 12710731's canal builder, which also draws its rivers, is
covered by S1), outer moats at S5a; S7 adds their quays, their bank kinds and the bridges on their decks. A carve
requested later by an edit goes through §4.11's conversion path, whose way rule gives every arterial it meets a deck and
records every cut, never a silent overwrite.
=== END ===

=== REPLACE ### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base) ===
### 4.11 Incremental mode, transformations and conversions (the evolution hook; one path built in the base)

**The one built path: add a growth stage (GEO-27, LC-12, FTG-4, FTG-14).** `grow(doc, epochInputs)` appends an `epoch`
event to the log and runs at that log position (§7.1, §7.4) on the persisted model with the epoch sub-stream: S2 (**delta
demand** = the suffix of the sequential roster between the old and the new population, §10.2 — prefix-stable, read over
the households the town holds where a fall held one (V06 §3.5.1 (1)) — so no
survivor's use is withdrawn by arithmetic) → S5 for the new stage, when a residual remains after the regrowth-first order
below (S5a: the boundary grown from the previous one and, if walled, its trace and gates; **S5b**, the main-road step, so
each epoch can add main roads; S5c with the built-face legality below; S5d) → S6 (districts extend over the new faces,
existing districts keep their ids; the field's drivers are re-evaluated with the new circumstances, the brush strokes kept
as Δ) → S7 (the new enceinte's furniture) → S7b (allocation of the delta demand in the regrowth-first order below — the old
plan's vacancies, ruins and traces first, new faces only for the residual) → S12a (outside sites for new outside classes;
the hinterland unit builds their plots) → S8–S13 on new faces only (S10–S12b in the derivation pool, over a copy frozen as
§3.3 step 1 states). S5c's proposals cross water only on a deck — a built bridge, or a `site` the proposal builds (§4.4) —
so an epoch's growth uses the crossing sites S1 and S3 left unused (§4.2 S1 (5)). An epoch whose population target equals
the current one places no delta and grows no stage; its other steps (the field, the ladder, the dossier events, the
character step, the Works) run as below.
* **Built-face legality (GEO-27).** In an epoch a growth proposal may not cross a face holding footprints unless it runs
  along plot boundaries or back lanes (§4.3's `existingFabricCost` applies to S5c too, pricing a route along plot lines far
  below one through buildings) or a declared `demolish` conversion is chosen at its table cost (by building class and age),
  recorded as events. Plots cut by a new corridor are re-cut through the conversion path — buildings that still fit are
  kept, the others demolished with lifecycle events — never re-derived from scratch.
* **Survivors — the wealth ladder and the geometry floor (LC-12; item 31).** Surviving plots and buildings keep their built
  state. A re-evaluated field never re-derives them and never removes an occupied building: it acts on them only through
  the explicit, recorded, rate-limited events of the **wealth ladder** — three rungs by the time a block has spent in its
  new band and by what its standing stock allows — drawn from `…/epoch=e` streams (the ladder's own draws on
  `epoch.transform`; a rung-3 re-cut's `plot.*` and `siteplan` concerns keyed by the block's and the new plots' lineage with
  the epoch component, §6.1 — no new concern). The engine that schedules the ladder is the owner's staged evolution stage
  (DEF-8, below); the base carries now the due mark, the table, the operators, the floor and the edit kinds, each usable by
  hand (§7.1) and undoable (§7.4). With no epoch nothing here runs, so the static baseline is unchanged (item 23): neither
  reference evolves — MFCG fixes granularity by ward type and FTG by lifestyle tier at generation, and FTG's "regenerate
  area" is a re-roll, which this ladder never is.
  - **The trigger — a band change past the hysteresis marks the block DUE.** After S6 re-evaluates the drivers (§4.5) each
    block's band is read again against the town's `FieldBands` with their hysteresis (0.02, §4.5): a block whose value has
    crossed a cut by more than it is marked due — `Block.due = { band, since, epochs }` (§2.5): the band it must meet, the
    epoch of the crossing and the epochs spent in that band, counted up at every later epoch — until its stock meets the
    band or the band changes again (a new mark; a flicker inside the hysteresis marks nothing). The mark is per block and
    the memory per plot (`builtBand`, below): "the neighbourhood grew poor" is the aggregate of its blocks' marks and its
    plots' records, never a district switch (J-A31.43).
  - **The rungs.** Every rung acts through operators the base already has — item 18's designation mutator (`mutate`, §4.7
    S11), item 17's use step (below), item 30's passage choice (§4.6), S10 (7)'s join-and-split law in its incremental
    form (§4.7) — as `LadderOp` conversion events (below), so **no occupied building is demolished by a band change** and
    nothing is re-rolled (J-A31.41).
    1. **Rung 1, at every due epoch — use, occupancy and condition.** *Growing poor:* buildings are let out — `relet`
       raises a building's household count within §2.6's **capacity** (its one capacity function, J-A28.23), the roster's
       households (with a dossier, the households that fill its population, §7.7 item 2; item 20 (h)) and item 17's
       relocation filling them (§10.3); the interior follows the occupants down §2.6's **interior ladder** (item 28 (f)):
       the plan rung re-cuts the programme for the new count inside the unchanged wing rings — from one household with its
       staff rooms to a lodging house, a tenement of one-family apartments off a corridor, or single rooms — inside the
       `relet` event itself for a stored plan (§7.3's stored-plan row; J-A28.72), otherwise when next clicked (the unstored
       rung goes `stale`, §2.8); F-PLAN never drops a household (§5.2); outbuildings convert to dwellings and workshops and
       sheds and hovels infill the yard (`mutate` toward the field band's use and specialisation columns; `densify …
       infill` inside the manifested band's yard rows); the garden is built over (§4.9); the fabric's **condition** steps
       down — `Building.condition` `kept → worn → neglected` (§2.6: wear and patched roofs, rendering classes of §8.2,
       never a shape change, item 19); the roof is lost only by the decline ladder's `decay`, after the building's last
       household has left (`vacate`; the derelict state of §2.8's ladder). *Growing rich:* renovation and extension by
       `mutate`'s adapt and add steps toward the richer template (item 18), households re-united (`relet` down to the
       row's built count; the interior re-cut back up the ladder removes what the subdivision added and restores the
       earlier plan where nothing else changed, §2.6), infill cleared once its households are re-homed and the garden
       reclaimed (`thin … infill`; infill whose households cannot be re-homed within the epoch's churn cap waits, as a
       court does in rung 2), condition restored. Use, condition and the interior read the field band; geometry reads the
       manifested band (the floor, below).
    2. **Rung 2, after the ladder table's duration in the band — tenure and yards.** The holding fragments or
       consolidates without its front changing. Growing poor, the yard becomes a back court of rear plots reached by a new
       passage (`densify … back_court`) where §4.6's passage choice allows one and the plot's manifested band's row
       carries a rear-plot or hidden share — a middle-floored plot's yard is infilled, not cut into tenements; growing
       rich, a back court is cleared and re-gardened (`thin … back_court`: its uses relocated by the use step, its
       households re-homed — item 17's relocation, or a `relet` up in a standing shell within §2.6's capacity — and its
       buildings vacated (`vacate`), then the rear buildings cleared (`clear`) and the passage sealed, item 30; a court
       whose households cannot be re-homed within the epoch's churn cap waits); and big houses change class keeping their
       shells — a mansion to a tenement, an inn, a workshop or a chapel — by `mutate` (item 18). Rung 2 keeps every
       frontage and every main shell; its one plot-line change is `densify … back_court`, which splits the yard off the
       plot into rear plots and a passage face by S10 (7)'s incremental re-cut — the front plot, the child that keeps the
       frontage anchor, keeping its address and `builtBand`, every child's lineage continued by §6.3's SPLIT rule (the
       parent's key with its child index), the rear plots taking their new stock's band as `builtBand` — admitted only as
       above, never on a middle-floored plot; a court `thin` has emptied and cleared is vacant, so its rear row returns to
       the front plot's garden by rung 3's `amalgamate` (J-A31.40).
    3. **Rung 3, on vacancy, ruin, a destructive circumstance event or redevelopment only — the geometry follows.** A
       vacant or ruined plot's ring is re-cut to the band: growing poor, an abandoned or ruined mansion's plot is split into
       row houses or tenements (`subdivide`), or the fallen house's plot is re-cut and rebuilt as lodgings; growing rich, a
       buyer joins two or three worn small plots and replaces their houses with one large building (`amalgamate`, then
       `rebuild` or `build`). **Redevelopment** is a composite the engine issues in order — purchase (the plots' uses
       closed or relocated by the use step under item 17's rules — a dossier-backed use relocated, never closed
       (*Dossier content across epochs*); a pinned assignment or a lock stops it), vacancy (`vacate`), then the re-cut and
       the new stock — so the invariant holds at every step (J-A31.47). The re-cut is S10 (7)'s law in its incremental form
       (§4.7): the due block re-cut with its neighbours fixed (§7.3: the block is the effective scope, with its seam
       exception), under the band's granularity target, fusing and splitting by S10 (7)'s orderings, every survivor's plot
       byte-identical, the new plots' buildings by S11's mutator from the empty design, their residential classes by S10b's
       class mix at the new stock's value (§4.7, item 71). Slums arise where the stock was small and cheap to begin with, or
       from rungs 1 and 2 inside big shells; a district of mansions grows poor as tenements behind grand fronts, never as a
       cleared slum (the owner: "hard to imagine that it would be torn down into a slum if it was filled with mansions").
  - **Asymmetry — speed by direction and by the stock's replaceability (owner: "much easier for a poor neighborhood to grow
    rich and merge plots").** The rung durations are rows of the **ladder table** (`WealthLadderTable` in `@plat/tables`,
    §7.6, §14; our own rows, calibratable, §13.9; tendencies changeable per region and era, item 23), keyed by direction and
    by the stock's `replaceability` — a column of the template rows of the class table (§10.2), read at the plot's
    `builtBand` row: `immediate` (tents, sheds, hovels), `short` (cottages and the row houses of the poorer bands), `long`
    (the row and detached houses of the prosperous bands), `ruin_only` (manors, halls, institutions) (J-A31.42). Growing
    rich reaches rung 3 within a few epochs because it replaces cheap stock; growing poor stays at rungs 1 and 2 for
    generations, because expensive stock is not torn down, so splitting waits for vacancy, ruin or a destructive event.
    The years a block has spent in its band are (the epoch's week − the week of the epoch that marked it, from its
    `EpochRecord`) ÷ 52 (*The clock*). Default rows:

    | replaceability of the standing stock (at `builtBand`) | years in the band before rung 2, growing rich / poor | rung 3 growing rich: fusion after purchase and vacancy | rung 3 growing poor: splitting |
    |---|---|---|---|
    | `immediate` | 0 / 0 | in the due epoch | on vacancy, ruin, a destructive event or redevelopment |
    | `short` | 0 / 10 | after 10 years in the band | the same |
    | `long` | 10 / 20 | after 30 years in the band | the same |
    | `ruin_only` | 10 / 30 | on vacancy, ruin, a destructive event or redevelopment only | the same |

  - **Churn.** The table's **churn cap** rows bound every epoch, per kind — `geometry` (rung-3 re-cuts and rebuilds),
    `fabric` (the strike pool's strikes, below), `use` (the use step's relocations, below) — as a share of a district's
    plots (or uses) per decade, scaled by the epoch's `years` — a fraction of a year allowed, the scaled cap's fractional
    part the chance of one more, drawn on `epoch.transform` keyed by the district, the kind and the epoch (no new concern;
    J-A76.44) — and a maximum per block per epoch; defaults 0.05 / 0.10 / 0.10 per decade and 2 plots per block.
    Candidates beyond a cap wait, in address order, so a neighbourhood changes over many epochs, never all at once; item
    17's cap and the strike pool's bound are rows of this one table (J-A31.46).
  - **The geometry floor (owner: "their floor is bounded to middle class … once a neighborhood generally gets to a middle
    class outcome, that forever remains its geometry until vacancy, ruin, fire, war, or redevelopment shifts things
    entirely. it would cycle … between rich and middle").** Each plot persists `builtBand` and `builtProsperity` — the band
    and field value its present stock was built for (§2.5; in the model digest, §6.2; never recomputed from the field,
    J-DET-12) — and derives, never stores, `geometryFloor = min(builtBand, FieldBands.middle)` by the band order: the
    settlement's middle band (§4.5) for stock built at or above it, the stock's own band below it — a hovel cannot read
    poorer than a hovel; it can only be replaced upward. The plot's **manifested band** is `max(field band,
    geometryFloor)` and its manifested value `max(field value, floor value)`, the floor value being the middle band's lower
    cut, or `builtProsperity` when the floor is the built band. A **block-level read** — S10 (2)'s granularity rows, II.3's
    dispatch — takes the block's manifested band as `max(block band, the floor of its standing plots' area-weighted
    median)`: the plots ordered by `geometryFloor` in the band order (ties by address), the floor at which their cumulative
    area first reaches half their total; a plot-level read takes the plot's own (J-A31.43). Every change other than a
    rung-3 event reads the manifested band and value for what is BUILT — S10 (2)'s granularity rows, S11's template
    geometry columns (size budget, structures, storeys, heights, frontage, court and garden; J-A19.43), the yard partition
    (§4.9), II.3's block dispatch — and the field band and value for who is there and how it fares — households,
    condition, specialisation, the room programme, labels and descriptions (J-P1 stands: "the rich quarter" is still a
    description of the field). So a mansion district that grows poor reads as middle-class geometry — big plots, big
    shells, subdivided into lodgings, yards infilled — while its occupants, condition and names are as poor as the field
    says: **the interior has no floor** (item 28 (f)) — the shell keeps its floor while its rooms follow its occupants down
    §2.6's interior ladder, to single rooms off a corridor at the poorest (the same shells, a different interior; item 30's
    back courts behind them, the cheap stock of item 27's shanty rule at the edge, §4.5); between the rich and the middle
    manifestation it cycles freely and reversibly through rungs 1 and 2 with no frontage change and no shell falling toward
    a poorer band (renovation may extend a shell, item 18); the middle band is each settlement's own (§4.5's per-town
    cuts) (J-A31.43). **What writes `builtBand`** (J-A31.44): generation (the plot's band at S10); a rung-3 event, to the
    band of the new stock (an `amalgamate` that builds nothing — a thinned rear row or a cleared plot returned to its
    neighbour — keeps the `builtBand` and `builtProsperity` of the member whose frontage anchor the joined plot keeps,
    §6.3's JOIN); rung 2's `densify … back_court`, for the rear plots it creates only (their new stock's band; the front plot keeps its
    own); the hand edits of rung 3's kind, each
    re-deriving the stock by the user's act — `rebuild`, `demolish` then `build`, `amalgamate`, `subdivide`, `fill`, a
    `replace` close-up (II.4) and a New random of the block — and the authorial re-derivations that re-derive the stock
    itself: a field brush's or a `FieldBands` `setAttr`'s re-derivation and `Adjust` (§7.2, §7.4 — a brush is how a user
    designs the town, so it re-derives its scope to the current band; the floor governs wealth change over epochs); and a
    **completed upward refurbishment** — a `mutate` whose result meets a higher band's shape template raises `builtBand` to
    that band, so a renovated quarter keeps its floor (the owner's "refurbished housing"). Nothing else lowers it: rungs 1
    and 2 never lower a standing plot's `builtBand`, and wealth change over epochs lowers it only through rung 3. Regenerate
    (keep settings) keeps it (a recorded input, §2.8); a member a split `resurrect`s takes it from the rung-3 event that
    re-cut it, not from its tombstone (§6.3); a document written before the attribute existed gets `builtBand` = its plot's
    `DerivationRecord.band` and `builtProsperity` = its recorded sample, exact for every document without an epoch (§7.5).
    The floor draws no random numbers. With no epoch the manifested band equals the field band everywhere.
  - **Lineage survives, so the seed survives (J-A31.48).** Fusion and splitting continue lineage by §6.3's JOIN and SPLIT
    rule (J-A31.73), an undo returns the former plots exactly (§7.4), and only a re-derivation takes fresh lineage (§6.3; the
    owner: "It's not new rerolls its modifications and variations to the original seed").
  - **The epoch's order** (the engine's loop on the base's path; V06 §3.2's table gives the full twenty steps with the
    engine's own). Before S2: the rung profile and the epoch's product are read at the epoch's population target (*The
    rung at an epoch*, below), the dials' applied standings and shares move past their hysteresis (*The dials' inputs over
    epochs*, below) and `TradeFlow` is re-read from the epoch's trade slice on the current geometry (§4.3; item 77). After
    S2's delta demand: (a) S6 re-evaluates the drivers and the bands — the previous epoch's buildings casting in the
    daylight term (item 102 (e); V06 §3.4) — re-bands every live plot's `fieldBand` against its own column by §4.5's rule
    (§2.5; J-A28.29) before any rung reads the field band, the former values in the epoch's undo record, and marks the due
    blocks; the product's participants registered at `afterField` run here, before (b); (b) the use step (item 17, below)
    closes, opens and relocates uses; (c) when the target fell, the roster's suffix leaves in reverse ordinal order — a
    building whose household count falls but not to zero takes a `relet` down (an unstored plan rung `stale`, a stored plan
    re-cut in the event) and `vacate` fires only when its last household leaves — save at a locked or pinned dwelling a
    dossier population fall emptied (§7.7's precedence), whose last household leaves by a `relet` down to 0 and which is
    never vacated (§13.2's T20-15); which dwellings empty is decided by the
    evolution engine's departure matching (V06 §3.5.1: the roster's suffix matched to exposure-weighted dwellings by band),
    and the strike pool (below; V06 §3.5.2) strikes fabric only, by its exposure (item 28 (f) with item 8; J-A28.45); the participants registered at `decline` run at its end; (d) the ladder runs its rungs on the due blocks
    under the churn cap; (e) the dossier events that arrive with the epoch's inputs (`EpochInputs.dossier`, in the host's
    order) are applied here as mutations at that epoch — S10b's `dossier` request and S11's mutator on the current map
    (§4.7, §7.7; item 22 (e)), never a re-roll (J-A22.42); where the epoch's product declares `ProductDecl.records`, each
    `assign` it places — a record it adds, a member a count step adds, or the greater a REPLACEMENT re-key places new (V08
    §3.5.1 (c), (d); a re-key whose greater keeps the lesser's thing is a `rebind`, never offered) — is first offered to its
    `place`, a declined record taking §7.7's *One path* placement, and its `remove` is called after §7.7 item 2's removal of
    each record it removes (item 202); (f) siting places the delta in the regrowth-first order below, from its step (0) — a
    `relet` up in a standing shell before `reoccupy` of a vacant one (J-A28.45) — or, where the epoch's product declares a
    `siting` phase override, that phase; (g) a residual grows a stage (S5), or the product's `growth` override; the
    participants registered at `afterGrowth` run after (g) and before (h); (h) every live placement rejection (§7.7's
    record, item 20) is re-checked by §7.7's lapse rule (J-A20.74, J-A20.41), the epoch writing `lapsedAt` inside its own
    touched set, and a lapsed site is eligible again from the next placement on; (i) the **character step** (item 72):
    §4.5's S12c on the grown town — each district's character vector, identity (past its hysteresis, re-typing a kind its
    identity row names) and band range re-derived, the clamped excess added to its pressure, a district whose identity
    changed renamed by §6.3's epoch case (§4.5 (8)–(9), §10.4) — and `TradeFlow` re-derived on the grown geometry (§4.3);
    (j) every physical change of steps (a)–(g) is shown on the ground by a Works started inside the epoch's span, and every
    Works that finished more than `works.retainWeeks` before the previous epoch's week is retired (*Works*, below; item
    67). Participants run in (order, id) order, each run's ops one batch of the `epoch` event, called with V06 §2.1's
    `ProductEpochContext`, each returning no ops outside its scope. Each step's events cite the epoch; the whole is one
    `epoch` event's fold (§7.4). A dossier event between epochs is applied at its own log position by the same request and
    mutator (§7.7); a dated one — between epochs or carried by an epoch — keeps its `dossierChange` (§7.1, item 75) and
    starts its Works at the change's week.
  - **Regenerate, Adjust and the derivation record.** A transformed entity's `DerivationRecord` is updated; every other plot
    keeps its record, so "Regenerate (keep settings)" on an untouched block reproduces it byte for byte, and re-deriving it
    with the new field is the explicit `Adjust` (authorial, above). Siting across epochs places only delta demand, in the
    regrowth-first order below.
* **Test (M4).** On a town with walled, ribbon and suburb regimes, adding a stage re-rolls 0 survivors, adds ≥ 1 primary
  when its gate law asks for one, and replays from the log to the session hash. The ladder's, the floor's and the epoch
  order's hook tests are §13.2's (item 31), as are the Works', the clock's and the character step's (items 67, 72 and 76).

**Conversions** are typed plat operations with recorded events. `ConversionOp` is defined here, once, as one union: the
base's own kinds, the ladder's (`LadderOp`, item 31, the Survivors rule above), the decline hooks' (`DeclineOp`, item 8,
below), the use step's (`UseConversionOp`, item 17, below), the terrain and water conversions' (`TerrainWaterOp`, item 25,
below), the passage sealing's (`HiddenOp`, item 30 (e), below), the underground's own kinds (item 65: the buried old
town's `RaiseGrade`, II.7.6, and the undercity's `ClearUndercity`, II.7.5, declared there) and the evolution engine's
(`EvolveOp`, file f item 209, which V06 §2.8 declares). The `convert` event of §7.1 carries it, and `build` below is
§7.1's `build` event:

```ts
type ConversionOp =
  | { op: 'wallToWay'; enceinte: Id; widthCm?: Cm } | { op: 'gateToJunction'; gate: Id; square?: boolean }
  | { op: 'outskirtToDistrict'; region: { ring: Polygon; key: PlatKey } /* the outskirt faces it covers; no stored slots, §2.2 rule 5 */ } | { op: 'demolish'; id: Id }
  | { op: 'rebuild'; building: Id; cls: BuildingClass /* the whole replacement a ruin or a redevelopment calls for (rung 3), never a designation change (§4.7 S11) */ }
  | { op: 'build'; plot: Id; cls: BuildingClass; footprint?: PolygonCm /* as §7.1's build event */ } | { op: 'carve'; kind: 'canal'|'moat'|'harbour_basin'; polygon: Polygon }
  | { op: 'abandon' | 'decay' | 'ruin' | 'robStone' | 'clear' /* removed to a footprint trace */; building: Id } | { op: 'plotToGarden'; plot: Id } | { op: 'contractWall'; enceinte: Id; trace: Polygon }
  | LadderOp | DeclineOp | UseConversionOp | TerrainWaterOp | HiddenOp | RaiseGrade | ClearUndercity | EvolveOp;
// EvolveOp as V06 §2.8 states it — absorbWall, downgradeWay, upgradeWay, burn, wearWall (item 114), repairWall { enceinte,
// stretch?, material? }, retypeLand, repairRaised, repairRetaining — each usable by hand through `convert` (§7.1) with an
// undo record (§7.4) and the cause `convert:<op>`; a hand repair of stone that is gone bends (item 101 R2) to a new
// stretch or part on its line
type LadderOp =                                                                            // item 31's rungs (Survivors, above): each a mutation with an undo record (§7.4), usable by hand (§7.1)
  | { op: 'relet'; building: Id; households: number /* rung 1: the household count the roster fills, within §2.6's capacity (J-A28.23) — 0 only at a locked or pinned dwelling a dossier population fall emptied (§7.7's precedence; §2.6's clamp); a stored plan is re-cut inside this event, an unstored one goes stale and is re-cut on the click, both along §2.6's interior ladder (§7.3; item 28 (f)) */ }
  | { op: 'densify'; plot: Id; as: 'infill' | 'back_court' /* rung 1: sheds, hovels and a workshop in the yard, the garden built over; rung 2: rear plots in the yard reached by a new passage (§4.6, item 30) */ }
  | { op: 'thin'; plot: Id; what: 'infill' | 'back_court' /* the inverse: infill cleared and re-gardened (§4.9) after its uses relocate and its households are re-homed (item 17's relocation, or a `relet` up in a standing shell within §2.6's capacity) and its buildings vacated; a back court likewise, its passage sealed */ }
  | { op: 'subdivide' | 'amalgamate'; plots: Id[] /* rung 3 only, on vacated plots: S10 (7)'s law in its incremental form — the due block re-cut with its neighbours fixed; §7.1's plot split and join are the hand forms */ };
```

**`wallToWay(enceinte)`** is `retypeEdges(ChainRef('wall', enceinte), add ('way', the new ring road), remove 'wall')`: the
wall chain becomes the spine of a `primary` way with a ring-road width, on the same edges; the wall strips' setback and
glacis lines are removed, so the strips merge into the faces beside them, their band, tower and gatehouse faces are cleared
with the rest of their finer content, and S9's `corridorUnion` re-derives the ring road's corridor there; towers are
removed; gates become junctions with a `square` option. Where the old line meets a standing raised way the ring road meets it as a way laid after it (§2.7's laws, law 1 (1), (8); its worked example the way-and-channel table, row (c)): in the dry run its spine there is re-routed by §7.3's S4 local operator, between its nearest nodes on either side of the under-deck strip, to cross under the nearest span §4.3's crossing rule admits, reading the state the op leaves: each `vault` span the old wall stood over read as §2.7's laws read it once the op commits (law 1 (8); its worked example *beneath*) — `vault`, so the ring road keeps off the strip of the chamber V04 lays again, where they read it so; else `open`, the ring road crossing under it by the crossing rule —, else it ends at the strip's edges as at a reservation, reported; it takes no junction with the raised way, nothing of which changes, and V04 lays again the arch vault of each `vault` span the old wall stood over that §2.7's laws then read `vault` (law 1 (8); V04 §3.5.4 (d)). A barrier arc the wall left unwalled (§4.4) carries no way. **Clearance
(GEO-38):** the new corridor needs half its width on each side of the old wall line; where the half-band plus setback on a
side is narrower, plots meeting the new corridor are clipped along its edge — a plot keeps its id when its frontage anchor
survives (O8 g), and footprints that no longer fit are demolished with lifecycle events (cause `convert:wallToWay`).

**`carve` — a canal, moat or basin added by an edit, or an outer moat by S5a (§4.4).** The dry run decides every way's fate
and the carve's one **footprint** before any batch runs. Let `S` be the channel ⊕ its bank setback. Every way whose corridor
meets `S` takes a fate by class (J-P30), recorded as lifecycle events with cause `convert:carve`:
* **kept with a pinned deck** — every `through` and `primary` way, and any other way that is the only connection of the
  streets on its far side to a gate or the plaza. Its deck (S1 (5)'s form, perpendicular to the channel) and its
  **re-route** are solved in the dry run by §7.3's S4 local operator — between the way's nearest pinned nodes on either side
  of `S`, on S3's lattice with `existingFabricCost` (so it keeps near its old line), through the deck as a fixed graph edge;
  a way that already meets the channel within ± 10° of its normal keeps its line and only its stretch across the channel
  changes. The old stretch between the re-route's two ends is the way's **replaced stretch**. S7's rules give the deck its
  `Bridge` (events: `altered` on the way, `built` on the bridge);
* **cut** — every other `secondary`, `lane`, `alley`, `cul_de_sac`, `track` and `path`: its stretch inside the channel ⊕
  max(bank setback, 1 m) is removed, so every cut end lies at least 1 m from the channel, and a remainder that now dangles
  shorter than one block depth is pruned (events: `altered`, `demolished`); `quay` and `pier` ways are cut the same way and,
  where they met the new water at ≥ 30°, extended from the cut end to the new bank as a quay or a landing. A raised way keeps its course and every station; the channel meets it by §2.7's laws (law 1 (1), (8); its worked example the way-and-channel table's row (e)), reported (`W_RAISED_CROSSING`; by hand §7.1's `bend.raised.underSpan`, `bend.raised.around`).

**Other crossings (J-I13).** A wall trace that `S` crosses has its **run** — the trace between the nearest unaffected towers
on either side of the crossing — re-traced as data in the dry run, with a water gate where the channel crosses, as §7.3 (b)
2 re-traces a run a moved river crosses. The stretches of the run's strip lines alongside it — the inner setback line, the
glacis line (or the moat's inner bank, which is water and stays) and, where the era row has one, the intervallum — between
the feet of the perpendiculars from the run's two end towers leave with the old run, and S7's operator re-cuts them along
the re-traced run from those feet (batch (3)). Every way the re-traced run's new strips — the new run ⊕ (half its band + its
setback, and + its glacis or berm on the field side) — will meet, other than a kept way through a gate of the run (whose corridor ends each strip, §4.8) and a raised way, whose deck passes over the run, takes the `cut` fate at the strip's boundary, as `drawWall` cuts the ways its new strips
meet (§5.2, §7.4), and every plot inside the new strips is re-derived with the rest of `R`. A locked or pinned way, wall or
finer entity, or a reservation, inside `S` or inside a new strip returns to the dry run as an F-EDIT conflict (lock > drawn geometry; Re-derive from S3 offered for a reservation, §5.2), as for S1's water operator. A standing raised way and its reservation — the raised way locked, pinned or neither — are no conflict: the re-traced run meets it by §2.7's laws (law 1; its worked example the crossing table's row W2), bent where they say (law 2, in its order, law 3; its worked example the bent-group sentence), a shape lock honoured (law 1 (10)) and a run with no lawful shape giving way (law 2 (c)), each move part of the carve's bend, never a fate (law 4), nothing of the raised way's record changed (§7.1's lock row; law 2 *Entry*).

**The footprint (J-P34).** `C` is the set of L1 cells (the faces of the L1 view) that (a) the channel ⊕ (`attractCm` + bank
setback) meets; (b) border a removed stretch, a pruned remainder or a stretch the new strips' cuts remove; (c) border a kept
way's replaced stretch or are crossed by its new route; (d) where the channel crosses a wall, border the old run or the
strip-line stretches batch (1) removes with it, or meet the re-traced run ⊕ (half its band + its setback, and + its glacis
or berm on the field side) — the ground its new strips will take. The **footprint** is `R` = ⋃ `C`, exactly: every point of
the arena lies in one L1 cell, so the channel's buffer lies inside the cells (a) names, and no cell outside `C` holds a face
any batch of the carve clears, splits or re-derives. `R` is the carve's one clear region: batches (1) and (2) declare it as
`KernelTx.clearRegion`, step (4) re-derives exactly its cells, the fate report lists exactly the protected entities inside
it, and the locality checks — §3.3's clear-region confirmation, §7.3's carve row, the §13.1 and §16 M3a fixtures and the
O18 (g) / O2 (c) perturbation test — require byte identity outside it, less the seam exception at its boundary (step (4)).
By (b)–(d) no plot outside `R` loses its access (a plot's access edge lies on a kerb of a way it fronts) and batch (1)
removes no edge a kept face uses (no `E_KEPT`); inside `R`, S10 gives every plot an access edge by construction (O5 a), and
S8's deep-interior rule and F-PLOT's alley rung act as in any block. The wall-crossing fixtures are §13.1's and §13.2's.

**The batches**, each single-level (§3.3):
1. **L1, clear region `R`.** `clearFiner` on `R`'s cells; the cut stretches, the pruned remainders and the kept ways'
   replaced stretches are removed, each through its `StretchRef` (§3.4) — a way cut in two first hands its far part to a new
   way by `retypeEdges`' `rekey` on that part's `StretchRef`; each kept way's new route is inserted whole, across the line the
   channel will take, with its deck's two bank vertices placed on it at the new bank points — carrying `deck_end`, pinned —
   and the span between them carrying the structural `deck` role beside `way`, so every kept way stays one connected chain
   through every batch; each crossed wall run is replaced by its re-traced run, with its water gate's two bank vertices
   carrying `('gate_end', gate, 0 | 1)` under a fresh `Gate` (§2.2 rule 7), the old run leaving with the stretches of its
   strip lines alongside it (each through its `StretchRef`, its ends placed by `splitThrough` at the feet of the end towers'
   perpendiculars); the ways the new strips will meet are cut at the strips' boundaries; and every other L1 edge the
   channel's banks will cross that is no way — a settlement-perimeter or other district-boundary stretch, a wall strip's
   setback or glacis line outside a re-traced run — is split at its two bank points by `splitThrough`, each carrying an
   `anchor` contact name (§2.2 rule 7: the entity of the edge's first own-level row, the smallest free ordinal — from 2 on an
   enceinte), with the stretch between them removed through its `StretchRef`; the map's `border` line is split at its bank
   points the same way but kept whole across the channel (§3.3 clear regions, rule 2; the arena's outer ring is L0 and meets
   the channel at its own level, §4.1). Those `deck_end`, `gate_end` and contact-name vertices are the carve's **prepared**
   vertices; every cut end lies ≥ 1 m from the channel, so no way is prepared except at its deck.
2. **L0, clear region `R`, `KernelTx.prepared` = the `deck_end`, `gate_end` and contact-name vertices of (1) (J-P40).** The
   channel's ring is inserted and attracts onto and promotes the prepared vertices, stripping the contact names (§3.3 rule
   3, §3.6); each deck span — the kept way's own edge between its two promoted bank vertices — now crosses the water as the
   `Bridge`'s deck (§2.2 rule 7), and no L0 edge crosses the channel, so the water body stays one L0 face. Any other contact
   with finer geometry is `E_LEVEL` or `E_KEPT` and returns to the dry run.
3. **L1.** Each kept quay or pier is extended from its cut end to the new bank (its end a Steiner vertex on the L0 bank line,
   §2.2 rule 3); S7's operator re-cuts the wall strips' setback, glacis and intervallum lines along each re-traced run from
   the feet (1) left, closing them on the new banks, and builds its towers and the water gate's `Gate` record, whose `banks`
   name its two `gate_end` vertices (§7.3's S7 row).
4. **Re-derivation of `R` (J-P43).** S6's operator, restricted to `R`'s cells, after the L0 batch: each land face of `R`
   takes the district — or the hinterland pseudo-district, or the `wall_strip` typing — of the pre-edit L1 cell that held
   the larger part of its area (ties by id). A boundary stretch removed under the water lies between its two bank anchors,
   so the L0 batch re-separates the land on either bank along the boundary that remains and no land face spans it: a canal
   across the settlement perimeter leaves the land outside it with the hinterland on both banks (0 district faces outside the
   perimeter; fixture §13.2), and a block part beside a crossed glacis line keeps its own block's typing. The same rule
   settles a boundary stretch removed on land — a cut way that carried a district boundary — by the larger part. The new
   strips (3) cut are typed `wall_strip` and take their district as S7's strips do (§4.8), and the channel's water faces
   leave the district face sets they were cut from. Then S8–S12b re-derive `R`'s cells by tree scoping (§7.3 item 2) — S8
   first, because cuts and replaced stretches merge and reshape L1 cells — with S10's step (0) for `R`'s faces beside a wall
   trace, the settlement perimeter or a shared reservation boundary (§4.7). Where a batch of the carve adds or removes a
   junction vertex on a spine that bounds `R`, the far side takes II.1 (3)'s neighbour step or its reversal; those steps and
   the `Seam` records of `R`'s districts are the carve's seam exception, the same set a district's reroll has (§7.3 item 1),
   which the locality oracle computes from the commit records. A carve therefore costs its footprint, not the town.

At S5a nothing finer than L1 exists yet and the channel meets only the arterials through the stage's gates: every way is
kept with a deck, nothing is cut, and `R` clears nothing (§4.4). Every touched entity's lifecycle records the event with its
cause.

**A cut way's far part — the records that name a way (J-Fpipe-2).** When the carve's batch (1) hands a cut way's far part
to a new way by `retypeEdges`' `rekey` — and S1's water operator, which cuts ways the same way (§7.3 (b) 3), likewise — the
rekey moves the far part's role rows, knot rows and vertex role rows and no record (§3.4), so the same batch **re-points
every record that names the way by id along the far part** to the new way: the `Frontage` records of the blocks along it
(`Frontage.way`, §2.5), `Bridge.way` of a built deck there, `Gate.way` of a gate there (§2.7), the `Greenery.along.way` of
its avenue and street-tree rows (§4.9; §2.7), `Junction.arms` at its junctions (§2.4), `Tunnel.follows` of a main beneath
(§2.7), and the `SeamEdge.chain`, `Portal.wayId` and `SeamAmendment.spine` entries of the `Seam` records that name it
(II.1). Those records lie outside the footprint `R` and change only by that id: this is the carve's **identity exception**,
which the locality oracle admits beside the seam exception (§7.3 item 1, item 7 (ii)) — every such record equals its prior
record except that the new way's id replaces the old, and every other entity outside `R` stays byte-identical. The part
keeping the old anchor keeps the old address and the far part is keyed by §6.3's SPLIT rule (§7.3 (b); J-A31.73,
J-A11.43); it **keeps the parent's name
and naming record without a draw** — a street a canal severs is one street on both banks, so S13a draws nothing and its
label candidates for the new way are built inside the carve's S13a delta (§7.3 item 2). A `Frontage`'s `class` and
`lengthCm` are unchanged (the class is the way's and moves with the rekey). The carve's undo restores the one way and every
re-pointed record (§7.4). *Test (§13.2, with §13.1's carve fixtures):* after a canal that cuts a `lane` and a `secondary`,
§5.3's reference-integrity row holds on every record that named either way, 0 records outside `R` differ from their prior
other than by the new way id, and both parts of each cut way carry one name.

**Coherence from one seed (owner).** Epoch N+1 is derived from epoch N's persisted state, the inputs and the seed's epoch
sub-stream `…/epoch=<n>`: the same town under different inputs has different histories, under the same inputs the same
history, and nothing that survives is re-rolled, because a survivor keeps its lineage and its derivation record (§6.3,
§7.3).

**The evolution engine is the owner's staged stage (DEF-8; V06, M6-E); its hooks are concrete now.** The owner's history —
growth, regression and growth again: houses emptied and robbed for stone, plots turned to gardens, a shorter wall ring
inside the old one, ruins left standing — is expressed with the base's own records: the transformation and conversion kinds
above (`abandon`, `decay`, `ruin`, `robStone`, `plotToGarden`, `contractWall`, the ladder's `LadderOp` and the `DeclineOp`
kinds below), which a user can also apply by hand in the base (§7.1); the lifecycle history on every entity; the epoch
streams; the circumstances timeline (§7.7); and the sequential roster (a population fall selects its suffix in reverse
ordinal order; the decline table's exposure function, below, chooses which buildings empty). A ruined building keeps its
footprint and heights and draws with the ruin program and the `none` roof kind (§2.6, §8.2). The engine plugs in behind one
phase interface:

```ts
interface EpochInputs { week?: number /* item 76: the absolute week at the epoch (The clock, below) — a dossier-bound map's from the dossier's own stamped ticks (The clock (1); item 125); absent on a standalone call, then the previous week + round(52 × years) */;
  years: number /* derived from the weeks: (week − the previous epoch's week, or the creation week) ÷ 52, a fraction allowed */; populationTarget: number;
  circumstances: CircumstanceSlice /* §7.7 layer 2 */;
  events: { week?: number /* the event's own week in (the previous epoch's week, week]; absent: drawn in the span (V06 §3.11.1) */; kind: string /* a hazard row's kind, or 'calamity' */;
    params?: Record<string, number> /* overrides of the hazard row's defaults */; calamity?: CalamityRef /* kind 'calamity': the dossier's calamity as the port carries it (V08 §3.6) */ }[];
  dossier?: EditEvent[] /* the host's dossier events (author 'host', EditBase.dossier set), in the host's order, applied at step (e) (§7.7 item 6); each keeps its EditBase.dossierChange (§7.1, item 75) */;
  wealthLevel?: number /* file f item 343: the intent wealth level at the epoch (§7.7 layer 1) — a dossier's wealth.label through tables/dossier/wealth (DR6), or a standalone trajectory's; absent: the level in force; applied past dial.hysteresis before S6 (V06 §3.3.5) */;
  advance?: { group: string; index: number; of: number /* the planned count */; stoppedAt?: number /* on the group's last epoch only, when Stop ended it early: the count actually folded */; trajectory?: Trajectory /* index 0 only; V06 §2.3 */ } /* file f item 343: the provenance of an epoch an advance request appended (V06 §2.3) */;
  replay?: { index: number; of: number; fromYearsAgo: number; toYearsAgo: number; events: ReplayEventRef[]; destruction?: ReplayEpoch['destruction']; refound?: ReplayEpoch['refound'] } /* item 113: a replay epoch's provenance (V06 §2.14 declares ReplayEventRef and ReplayEpoch) */ }
interface CalamityRef { id: string; name: string; type?: string; severity: 'minor'|'moderate'|'major'|'catastrophic'; targets: Id[] /* the uses bound to the institutions it marked ruined (§7.7 F5) */;
  deaths: number /* its deaths, 0 when none are given — the burial input of the catacomb growth (II.7.6) */ }   // typed by V06's calamity table (DR28)
interface EvolutionStrategy { id: string; phases: EpochPhase[] }   // registered by name in StrategyRegistry.evolution (§4.12); EpochPhase, EpochParticipant, EpochContext (extending ProductEpochContext), EpochOps, HouseholdLedger, EpochScope, ChurnLedger and EpochStep's twenty steps are V06 §2.1's, in V06 §3.2's order
```

**The runner** (in `@plat/edit`'s fold) runs, for each `EpochStep` in order, the phase for that step — the override the
epoch's product declares in `ProductDecl.phases` (`siting`, `growth`; the product the fold gives at the epoch, *The rung at
an epoch*), else the strategy's; a step for which neither registers a phase runs nothing — and then every participant
registered at that step (`ProductDecl.participants` included), at every epoch whatever its product, each scoped participant
returning no ops outside its product, rung or state, in (order, id) order, committing each one's ops in the order given as
single-level batches of the one `epoch` event. The base registers **`'grow-by-stage'`** — the path above — with the phases
`prelude`, `demand`, `field` (without the building mask), `dossier`, `siting`, `growth`, `lapse`, `character` and `works`:
the base's steps before S2, S2, (a), (e), (f), (g), (h), (i) and (j), built once in `@plat/edit` and reused by any strategy,
reproducing the path above byte for byte. V06's `'history'` strategy implements every step of V06 §3.2's order: it
reuses the base phases `demand`, `dossier`, `lapse` and `character`, wraps the base parts of `prelude`, `field`, `siting`,
`growth` and `works` with its own acts, and adds its own phases at `hazards`, `uses`, `departures`, `decline`,
`fortification`, `terrainWater`, `raisedWays`, `ladder` and `close` (V06 §3.1 (2)); participants run at `afterField`,
`decline` and `afterGrowth`. Before V06 lands, `grow-by-stage`
consults a product's two overrides and runs its participants at the call points of the epoch's order (above), called with
the `ProductEpochContext` the grow path fills (item 202; V06's `EpochContext` extends it at M6-E, item 317). The base builds
and tests exactly one path — **add a growth stage to an existing town** — at M4 (G-P13), because it is the same path
"regenerate this area" uses.

**History-first generation (item 113; with V06's replay engine, V08's history reading, V04's buried ruins and lost access,
V07 at village rungs, V11's rows; built with M6-E).** A settlement with a known history is generated as its past and aged
to the present.
1. **The peak.** Built extent follows the high-water mark: SettlementForge's `peakTier` or its high-water population when
   present (`HistoryHint.peak`, §2.7, filled by V08); standalone, the blueprint's history option ("once a city, now a
   village", §4.2 S0) gives it. Where SettlementForge wrote no `peakTier` but the dossier shows the place once stood higher,
   the map uses the **effective peak** (item 113 (f)): the higher tier itself, treated as the peak for everything the replay
   builds, sized at `history.symbolicQuantile` of that tier's population range (V11; default the range's lower quartile),
   every fact it sizes carrying provenance `symbolic` (§2.8). The evidence, strongest first: `tierHistory`'s from-tier on a
   demotion; the maximum of `populationHistory`; losses in `calamityHistory`; institutions of a higher tier still listed as
   ruined or remnant (a village holding a ruined "City walls and gates" or a remnant cathedral was once larger); a
   resettlement after a terminal death (V08 reads them). With no evidence of a higher tier there is no peak, and the
   history's events are soft hints only — §4.2 S2's stage count, the catacomb age, the buried old town — as without replay.
   The symbolic peak only sizes the remnants the replay leaves (the extent of old walls, streets and ruins) and never
   contradicts a present dossier fact; SettlementForge's own rule (never infer a peak) is untouched — this is the map's
   derivation (item 20 (h)), never written back.
2. **The replay.** Generation runs S0–S13a at the peak's population — or at the founding's, with the growth to the peak
   replayed, when the history starts there — then V06's engine runs the recorded history as coarse epochs of
   `history.epochYears` (V11; the owner's default a decade) from the founding or the peak to the present, each on this
   section's path: growth; the events, each mapped to its epoch by V11's event-to-epoch rows (a great fire burns and rebuilds
   a quarter; a great flood raises the grade, II.7.6; plague years and a trade collapse empty the edges; an occupation leaves
   a citadel; a pilgrimage surge adds hostels); decline to the present population, each epoch's target from
   `populationHistory` where given, else interpolated from the peak. The dossier's present facts are met exactly at the end
   (item 20: history shapes only what the dossier does not say) — the present population by the roster, the present
   institutions by the last epoch's dossier step (e). The replay's epochs enter the log as the creation prefix (flagged
   `creation`, never undo targets, §7.4), so the document replays them and its current week is the present's; they draw on
   the concerns of the stages each epoch runs, keyed with the replay's own epoch component (§6.1 *The history replay*:
   the range reserved to the replay), so the replay is deterministic from the seed and the history and no replay draw
   equals a live epoch's; they run inside
   V06's stated generation budget (coarse epochs, detail lazily under §4.1's contract); and the replay record (V06) is what
   the clerk tells the story from ("the walls were built when this was a city of twelve thousand"; for a symbolic peak "its
   exact size is not recorded", V10).
3. **The result carries its past** by the decline ladder and the persistence order: walls far beyond the houses, abandoned
   street lines kept as tracks and field boundaries, a church too big for today's congregation, a market square too large
   for its market, empty plots, roofless and ruined buildings.
4. **Destruction and refounding (item 113 (b)).** Where the history says the place was destroyed outright
   (SettlementForge's terminal death and resettlement, a catastrophic event, or an ancient "Fall of" event on the site), the
   old settlement's geometry becomes ruins — every building `ruined`, every way a trace — and the new settlement, a hamlet,
   village, town or city (V07 at village rungs), is generated on top: its route costs favour the old roads, gate gaps and
   bridges (the lattice's `existingFabricCost` pricing a ruined way at V11's `history.reuseCost`), it builds on old
   foundations first (`reuse … build`), quarries the ruins for stone (the salvage ledger, below), and may follow a different
   plan and culture (the history's culture rows); the old plan persists wherever it helps.
5. **Surface or underground (item 113 (c)).** Ruins younger than `history.burialYears` (V11; default a century, shortened by
   floods, river silt and rebuilding on top, lengthened on bare rock — the table's factors) stand on the surface; older ones
   are buried and become II.7.6's **buried former settlement**, derived from the former geometry — its streets, walls and
   major buildings at their old ground level — distinct from item 109's ruins of an older civilisation. Access to them
   follows item 109 (j) and is lost when its link closes (item 113 (e); II.7.4, V04).
6. **Sewers reopen (item 113 (d)).** Growth over closed sewer runs reopens them before new ones are dug (V04's J-V4.29), in
   the replay as in the live epochs.
7. **Edges and bars.** A history whose founding lies after its present (bad data) replays nothing and is reported; a peak
   below the present population is no peak; a peak above the rung table's top is sized at the cap (§1.1). With the replay
   off (`history.replay` false, the parity presets) generation is byte-identical to the base (a no-op pin). The bars are
   §13.2's (item 113 (g)).

**The clock — weeks (item 76, with item 67's Works; owner: "our simulator advances by units of one week").** "Our
simulator" is the clock that changes the map's inputs — the host's (SettlementForge's, read only through the dossier's
stamped ticks, item 125) or the staged evolution engine's —
never `@plat/sim`'s `time` view key, which changes nothing (§10.3; J-A76.41).
1. **The week.** The map's time is an integer week, in SettlementForge's own weeks — no conversion; never
   `elapsedMonths`, never `history.age`. A dossier-bound map's present week is the dossier's own latest stamped tick — the
   greatest of its conditions' `triggeredAt`, its calamities' and its history's ticks (item 125 (a), (b)), never the
   campaign's calendar or any host input; with none, the clock starts at week 0 and the user's season control sets
   the year position (§2.9's `yearWeek`: midsummer, week 19, by default). Its **present at creation** is the dossier's present
   week (a standalone map's, week 0). Its **creation week** — the week of its `generate` event, its first model's — is
   that present, except on a history-first document, whose `generate` event stands at the replay's start,
   `W_p − round(52 × start.yearsAgo)`, `W_p` that present (V06 §3.20.3); the first epoch's `years` (above) and V06's
   `prevWeek` read the creation week, and a replayed past lies between it and the present. `EpochInputs.week` is the
   absolute week at the epoch and `years` is derived
   from it (above); a standalone `grow` call that gives `years` only takes the previous week + round(52 × years) and
   re-derives `years` from the whole weeks, so every reader sees one clock. A dossier event carries its week in
   `dossierChange.week` (§7.1, item 75). The document's current week is derived — the greatest week the folded events carry, so an event folded after one of a later week (a late change at `W₀` + 1 or `W₀`, (4); a dossier change dated before an event an earlier absorb folded) never moves it back — never a stored counter (§2.9), and each epoch's week is its `EpochRecord`'s.
2. **Dating a dossier change.** The port (§14) dates each change it finds by the first of these rungs that gives a week: an
   explicit tick on the change's receipt (`foundedAt.tick`; lifecycle `institutionHistory[].tick`;
   `populationHistory[].tick`; `activeConditions[].triggeredAt.tick`; campaign-era `historicalEvents[].tick`;
   `decrees[].tickRef`; `calamityHistory[].tick`; `previousGovernments[].tick`; a news tick; the provenance ledger's tick),
   then the week suffix of the change's outcome id, then none: a change with no week applies
   finished, with no Works (§7.7 item 1 reads these rungs; the port counts an undated change in its report).
3. **The season — one calendar (J-A76.42).** `CalendarRow` gives the week of the year, `floorMod(week, 52) + 1` (the floored modulo, so a negative week of the
   replayed past maps into 1 … 52; V06 §3.20.3), and its season:
   a dossier-bound map reads the row `sf445` (52 weeks; four seasons of 13 weeks from spring; month ends at weeks 4, 8, 13,
   17, 21, 26, 30, 34, 39, 43, 47, 52), a standalone map our own default row, shaped alike (month ends 4, 9, 13, 17, 22, 26,
   30, 35, 39, 43, 48, 52). The Works' pauses (below), §8.2's season rows for a dossier-bound map's week and the simulation module read
   it; no second calendar of weeks and seasons exists (`tables/dossier/calendar`, §14; the module's day schedule is §10.3's).
4. **The cadence.** The port folds a dossier's discrete changes as standalone dossier events at their weeks, in
   SettlementForge's order (decrees first), and an `epoch` at each 52-week boundary crossed — or sooner, when the dossier's
   population has moved from the last epoch's `populationTarget` by more than the **roster tolerance**, ± 5 % (J-A76.43; the
   one number §7.7 item 3's lapse reads too), and at the week of each newly carried calamity dated after the last
   epoch's week that no other epoch falls on
   (DR28: a destructive event is epoch content; V08 §3.6 (3); J-V8.55) — carrying the target, the circumstance slices
   (§7.7 layer 2), the event kinds
   and that week's dossier events in `EpochInputs.dossier`; a catch-up batch follows the same rule, gaps allowed, coarsened under item 119's comfort level by V06 §6.8 (6) (every
   dossier event still at its own week; a calamity then riding the coarse epoch that holds its week). A newly carried change dated at or before the last epoch's week `W₀` is **late**: it never folds at a week before `W₀`. A late **calamity** folds no epoch at its own week and is never lost. Where the absorb's week `W₁` is after `W₀` it rides the first epoch this absorb folds (`DossierPort.absorb`; with none, the port folds one at `W₁` for it), its `EpochInputs.events` entry at that epoch's first week `W₀` + 1 and its F5 targets' dossier events in that epoch's `EpochInputs.dossier` at the same week, struck in place (V06 §3.11.1). Where `W₁` is not after `W₀` (a second absorb in the last epoch's own week, or a clock turned back) the absorb carries neither the calamity, nor the records of its F5 targets (each whole, its other changes waiting with it), nor a condition naming it — their carried facts stay as they were, noted (`unreceipted_change`'s `lateDeferred` variant, a standing note, V08 §4.6; an absorb carrying nothing else answers `unchanged`, V08 §3.2, its note in the host's report, V08 §3.6 (4)) — so the first later absorb whose week passes `W₀` finds them newly carried and folds them by the rule before; nothing is held in the binding, and a copy forked meanwhile never receives them (V06 §4.4). Either way its own tick stays in its receipt, its hazard strikes once and its deaths reach the burial need. Every other late change folds after the last epoch at `W₀` + 1 where `W₁` is after `W₀`, else at `W₀`, applied finished (no Works), noted (`unreceipted_change`'s `late` variant, V08 §4.6); a population move carried by an absorb whose week is not after `W₀` crosses at the next absorb whose week passes `W₀` (V08 §3.6 (3)). No epoch
   is folded per tick: the Works' stages are derived from the week at any drawing (below). A standalone map's epochs are its
   circumstance timeline's (§7.7, dated in weeks) or a user's `grow` calls.
5. **Rates per year (J-A76.45).** Every chance this section states per unit of time is per year, applied over an epoch's
   span as `1 − (1 − p)^years` through `dmath` (§6.5 (3)); dwell bands and ladder durations are in years read as weeks ÷ 52;
   the churn caps scale by `years` (above) — so epochs a few weeks apart and one a decade long change the town at the same
   rate. II.6's island slots follow the same rule.

```ts
interface CalendarRow { id: string /* 'sf445' — the dossier's; 'plat-default' — ours */; weeksPerYear: 52;
  seasons: { season: 'spring'|'summer'|'autumn'|'winter'; fromWeek: number /* week of the year, 1-based */ }[]; monthEnds: number[] /* twelve week-of-year ends */ }
```

**The rung at an epoch (item 81 (b); J-A81.41).** At each epoch the rung profile is read at the epoch's `populationTarget`
(§1.1's ladder): a crossing of one of §1.1's bands changes the rung's row — its granularity, greenery, layer and budget rows
— for everything the epoch builds from then on, and the standing fabric survives exactly as it survives a growth stage
(§6.3). **The product at an epoch** is the fold of V07 §2.1 (the hand-off band `handoff.band`, default 5 %): a
village-product document passes to the base product at `1 500 × (1 + band)` and back below `1 500 × (1 − band)` (item 322),
and a population of 0 at a registered village product's rung routes to THORP and V07's desertion (V07 §3.12; item 202). A
crossing upward whose town the frame no longer holds grows the frame to the one §3.2 (9) gives the new target: S1 derives
terrain, water and the hinterland's ground on the ring between the old margin and its successor — the same terrain field
continued, each water body continued across the old margin with its inner reaches fixed — and the kernel grows the frame by
§3.2 (9)'s single-level batches over one clear region (J-A81.31) — an L1 batch clearing the finer content of the whole L1
faces beside a lapsing stretch of the old chains or under the new rectangle,
an L0 batch replacing the `margin` chain (on part 0 two, a raised way's ring-end foot moved between them, §3.2 (9)), an
L1 batch replacing the `border` chain — each raster growing by whole cells as §3.2 (9) states, every stored height unchanged
and the flow fields recomputed over the grown grid. The pipeline then continues on that region and the ring: S4 continues
every through-road from its old end to the new margin, S12a sites the hinterland on the ring; the stages that own the
cleared faces re-derive them (the hinterland unit for the hinterland's, a district's S8–S12b for a district's; on each
underground part §3.2 (9) grows, that part's stages for its cleared faces — part 0's network stage its bands by
`corridorUnion` (II.7.2) and II.7.3's stage its plots, each other system's stage (catacomb, cavern, quarry, vaults, ruin)
its own part's bands (II.7.6) and II.7.5's stage the undercity's plots there; on the `buried` and `dug` parts, which no stage
re-derives at an epoch — a buried town, laid from a history scar or the replay at generation or made by a `raiseGrade`, and
the passages access edits and undercity lifeline closures dig — their cleared bands re-laid from their kept gallery chains by
`corridorUnion` (§3.7), which draws nothing; on each raised part of the ground layer §3.2 (9) grows, its raised way's
re-derivation (§3.4) for that part's cleared faces, which also extends a deck ending on the old ring to the new ring, the old deck's stations kept and its end span's condition carried (§2.7's support step (7)), and re-places both ends of that foot (§2.7 `RaisedFoot`)); every face outside the region, off a deleted stretch and off the ring keeps its
ring, owner and nested faces. The frame never shrinks: a declining town keeps its frame and its hinterland. II.6's island
gate is one reader of the rung. A dossier above the 120 000 cap is refused by the port (§7.7 item 15, item 81; §1.1;
J-A81.01) and never reaches an epoch; a dossier below 1 500 is routed to the village product when one is registered (V07
§2.1, V07 §3.11), else refused (SCOPE-C01); so §3.2 (9)'s clamp of the frame's target at the cap serves only growth that carries
no dossier.

**The dials' inputs over epochs (items 72, 78 and 79).** At each epoch, before S6 re-evaluates the drivers, a power's
applied standing (`PowerStanding.appliedStanding`, §7.7 layer 2) moves to the epoch's standing, and a sector's applied
share to the epoch's share, only when they differ by more than `dial.hysteresis` (0.05, a dial-table row); both are folds
over the epochs' slices in log order, so a replay reproduces them and §4.5 (6)'s dials follow the dossier's powers and
economy without flickering at every small move.

**Uses across epochs (item 17) — the hooks now, the engine's step later.** A **use** — a shop, workshop, inn or institution
— is its own record (`Use`, §2.7), separate from the buildings that house it: a building references its current use or
none (vacant) and keeps `formerUses`, so a use can close in one building and open in another while the building persists —
vacant, re-let or converted. The base builds the hand path: the conversion kinds below, applied by a `convert` event (§7.1)
— `openUse` on a vacant plot or building (the building mutates to the designation by §4.7 S11's operator), `closeUse` (the
building stays, vacant — the first state of the decline hooks — or converts to a named designation), `relocateUse` (a
`closeUse` here and an `openUse` there under one event, `detail.from` and `to` on the use's lifecycle event, §2.8;
`swapUse` is two relocations) and `mutate` (§4.7 S11) — each with its undo record (§7.4) and reported to a host (§11.3). The
staged engine's **use step** runs at each epoch after the roster's delta demand and before siting, as the same events:
(1) **re-score** — for every use, §4.7 S10b's solver scores its present plot and the best alternative within its catchment
(the district and its neighbours, `serviceRadiusM` of §10.2's `useRules`) against the current field, distribution and
supply links (the links re-bind as members open and close); (2) **inertia** — a use moves only when the alternative beats
the present plot by more than the row's `inertia` and the row's `moveChance` draw falls (the `use.relocate` concern on the
use's `…/epoch=e` stream, §6.1), closes only when its catchment's demand (the households within its radius against the
roster's ratio) has been below `closeShare` for `closeAfterEpochs`, or a hard supply edge has had no provider in reach for
`starveAfterEpochs`; a dossier-backed use never closes by this rule (*Dossier content across epochs*, below); new demand
(the roster's suffix) opens uses where the solver scores best — a closed shop's coverage gap raising the pull that reopens
one where people now are (item 103 (f)) — so markets and shops drift toward where people live and inns toward the busiest
gate, by distribution, never by a fixed order; (3) **cap** — at most the churn cap's `use` share of a district's uses
relocates per epoch; (4) **assignments** — a host or owner assignment is a stable identity that moves with its use under
the same rules unless `pinned` (§7.7, item 20 (g)), in which case it stays and the town adapts around it; every change is
reported; (5) **traces** — a vacated building keeps its former use in `formerUses`, which a later opening prefers (a former
inn reopens as an inn first; a dossier element whose assignment returns to `active` reopens in its former building first,
repaired by a Works when the change is dated — item 80, §4.7) and the naming engine may read (§10.4); (6) **concealed uses**
— a concealed use (item 63) relocates by these rules like any use, and its front stays an ordinary business (§4.7). Uses
are visited in address order; one seed and one circumstance timeline therefore give one history of openings, closings and
moves; households and postings follow (§10.3).

**The epoch-spread mutation (item 18 (c), (e); file f item 266).** Across epochs a designation change is not applied at
once: the engine issues §4.7 S11's `MutationRecord`, **decided once at the creating op**, as a sequence of `mutate` events
each applying its own parts of that record, due at the evolution table's `mutation.stepYears` rows (V06 §2.2) — first
occupy, when the present design is compatible (every kept part, nothing added; an always-crypt target's crypt basement
exempt and laid then); otherwise the use opens at the first step whose result is compatible, a relocating use staying at
its former site until then; then adapt; then extend (the adds); and rebuild only the parts that cannot be adapted — the
same steps and the same draws, spread in time, so a smith moving into a richer street mutates toward the richer template
over epochs. A plan cancelled because its use left keeps its done steps; when the building next takes its former
designation, the mutator's record inverts the done steps (item 18 (e)). Each of those events applies and records
its step at once, and a Works shows it on the ground over the weeks it takes (*Works*, below; J-A67.49), so the model
never changes between events.

**Dossier content across epochs (item 20; J-A20.75, J-A20.43).** No step of an epoch closes a dossier-backed use (its
assignment's `existence: 'dossier'`, §7.7 item 2) or leaves one without a building; only a dossier event the epoch applies
at step (e) removes, adds or re-designates one (§7.7 item 2). The use step never closes one: where its catchment or its
supply fails, the use relocates to (1)'s best alternative by the solver's `dossier` request — its first closest option
where no plot passes the hard rows (J-A20.71) — or, where its catchment holds no candidate plot, stays in its building; its
moves by (2)'s inertia rule are any use's. Before any other step would empty or remove the building that houses an unpinned
one — a redevelopment's purchase, step (c)'s `vacate`, the strike pool's strike, the growth step's declared `demolish` or
corridor re-cut, a carve, `wallToWay`'s clearance, `contractWall`, a terrain-and-water repair, `fallIsland`, a tunnel's
closing (II.7.3) or a passage's sealing — the use is first relocated the same way inside the epoch, a `relocateUse` citing
the epoch and counted outside the use cap, the request's scope its catchment less the plots that step empties or removes,
widened to the town where that scope holds no candidate plot; a pinned one keeps its building, which the step treats as it
treats any pinned entity (§7.2). So the dossier element is live and placed at every step (§5.3's row). A dossier-listed
ruin (`Assignment.state` `ruined`, §7.7, item 80) is present as its ruin — its use closed, its building `ruined` — and no
step repairs or clears it but a dossier event; a reopening returns its use to its former building first (above).

The kinds these steps use join `ConversionOp`:

```ts
type UseConversionOp =
  | { op: 'openUse'; plot: Id; to: Designation /* §4.7 S11 */; building?: Id; assignment?: Id }
  | { op: 'closeUse'; use: Id; leave: 'vacant' | 'convert'; to?: Designation }
  | { op: 'relocateUse'; use: Id; to: Id /* the destination plot: a closeUse here and an openUse there under one event */ }
  | { op: 'mutate'; plot: Id; to: Designation; spread?: 'now' | 'epochs' /* §4.7 S11's operator; 'epochs' issues its steps over the ladder's durations */ };
```

**Decline and regrowth (owner, 2026-09-25: "growth, regression and growth where appropriate"; AM-8).** Regression is growth
read the other way: the population target falls, the roster's manifest shrinks by its suffix (§10.2), and the fabric the
suffix leaves behind steps down a ladder of states over epochs — never re-rolled, never removed by arithmetic — until
regrowth reoccupies it. The steps are scheduled by the owner's staged evolution engine (DEF-8, above); the base carries now,
stated here once: the ladders, the decline table with its exposure function, the salvage ledger, the lag rule, the
regrowth-first siting order — which binds the built `grow-by-stage` path today — and the conversion kinds, each applicable
by hand (§7.1) and undoable (§7.4). The states are §2.8's and the style classes that draw them §8.2's; §6.3 holds the
identity rules, §13.2 the hook tests, §16 the price at M4.

* **The ladders** (§2.8's `Existence` value in brackets; every step is one conversion below, a lifecycle event with its
  cause). *Buildings:* occupied → vacant (`abandoned`: the use has left, the fabric stands) → derelict (`decayed`: roofless,
  `RoofSpec.kind 'none'`) → ruin (`ruined`: walls part-standing, the ruin program) → robbed or cleared (`cleared`: a
  footprint trace, its material in the ledger) → reused (`reused`: the trace, keeping its face, drawn as the garden, orchard
  or field it became — `Building.reusedAs`, §2.6 — or a successor building raised on the old foundations, which takes the
  trace's address, §6.3). Upward steps exist at every rung — reoccupy, repair, rebuild, reuse — and regrowth uses them first.
  *Walls and gates:* in use → neglected (`abandoned`) → breached or partly dismantled by stretch (`decayed` while any run is
  not `standing` — `worn` or `patched` (item 114), `breached` or `dismantled`: the run's `Enceinte.condition` profile, §2.7,
  item 575) → superseded by a shorter
  inner ring: `contractWall` traces and builds the new ring inside the old one through S5a's trace step and S7's operator,
  the old ring's record stays live with `Enceinte.supersededBy` naming the new one and its line persists as a trace — or
  becomes the ring road of the owner's original case by `wallToWay`. *Raised ways, retaining walls and decks* (V06 §3.19):
  in use → neglected → a span fallen or a stretch decayed → supports alone or ruined, their `state` fields (§2.7) written by
  `DeclineOp`'s members below. *Tunnels* (II.6's condition table), and the underground's galleries and chambers at the same
  persistence rate (II.7.5, II.7.6; item 65): in use → neglected, silted (`abandoned`) → partly caved in (`decayed`) →
  collapsed or sealed (`ruined`; `Tunnel.closure`), never demolished by the engine. *Islands* (II.6): floating → waning →
  settled → fallen. *Plots:* a plot whose last building is cleared or reused merges into a garden, orchard or field
  (`plotToGarden`) or into its occupied neighbour (`amalgamate`; §4.7 S10), so surviving households absorb the plots beside
  them and the plan coarsens where people are few — fewer, larger plots from loss, through the same merge operator as from
  wealth. Fields are their own layer: a struck farmstead's fields stay worked, their `LandUse.owner` passing to the nearest
  farmstead or to the commons.
* **The decline table** (`DeclineTable` in `@plat/tables`: an editable, versioned rule table with provenance, §7.6; our own
  rows, calibratable, §13.9). Its rows are tendencies — weights and chance, no fixed order (AM-23):

  | row | default | what it does |
  |---|---|---|
  | persistence rate per fabric layer | `use` 1.0 · `building` 0.6 · `plotBoundary` 0.3 · `street` 0.08 (decks too) · `wall` 0.05 · `raised` 0.05 · `retaining` 0.05 · `underground` 0.03 · `terrainWater` 0.005 | scales how readily a layer is struck: uses go first, then buildings, then plot boundaries; street, wall, raised-way and retaining lines persist longest; the underground slower still (AM-11); terrain and water slowest (AM-25's conversions are the rarest events) |
  | exposure drivers | kernels over the context vector (§2.5) with weights, §4.5's construction: extramural (the district outside the outermost enceinte, as S10b reads it) +; `terrainClass` low, damp or flood +; downwind +; near the noxious kernels of field pass 2 +; the intramural periphery (`dist.wall` small inside the enceinte, `dist.centre` and `dist.market` large) +; low `prosperity` +; the resilient core (`dist.market` and `dist.plaza` small; the attractors at churches, the precinct and the castle) − | where decline strikes first, as weights |
  | chance share | 0.25 of the exposure field (the prosperity field's is 0.15) | causes vary and chance plays a part |
  | dwell bands (years; each drawn once as its step's `decay` Works duration, *Works* below) | vacant → derelict [10, 30]; derelict → ruin [20, 60]; ruin → cleared on salvage demand only; walls, raised ways and retaining walls one band slower, tunnels two | the lag on the way down |
  | haul radius | 250 m | how far salvage travels |
  | exemptions | a locked or pinned entity is never struck; an assigned entity only through the use-relocation rule (AM-17); the building of a dossier-backed use only after that use is relocated (*Dossier content across epochs*) | the user's fixings hold |

* **The strike pool (the engine's step, V06 §3.5.2; the exposure function and the table are the base's).** For an epoch whose
  target lies below the manifest, the suffix leaves in reverse ordinal order as the epoch's step (c) states — a `relet` down
  while households remain, `vacate` at a building's last household (J-A28.45), save at a locked or pinned dwelling a
  dossier population fall emptied, which a `relet` down to 0 empties and which is never vacated (§7.7's precedence); which standing fabric then steps down is
  drawn without replacement from the pool of candidates whose dwell band has run — for a building, whose `decay` Works has
  run its span (*Works*, below; J-A67.46) — weight `w = E(x) · rate(layer) · u`: `E(x) = clamp(Σ_j v_j · kernel_j(x) +
  ε_E(x), 0, 1)` the exposure field, computed per epoch on §4.5's 32 m cells from the current context vectors and prosperity
  field with its chance share; `rate` the layer's persistence row; `u` a draw from the `epoch.transform` stream keyed by the
  entity's lineage and the epoch (§6.1; no new concern); the draw bounded by the churn cap per district and per epoch. An
  undefended suburb, a damp low quarter and the plot beside the tannery empty first as a tendency, the market core last, and
  a core house can still fall — a weighted tendency, not a law (J-A8.41).
* **Salvage — the material ledger.** `robStone`, `clear`, `dismantle` and `demolish` credit the town's `MaterialLedger` (§2.7)
  by the building's class-table yield (`salvageM3` per material, §10.2); `build`, `rebuild`, `reuse … build` and a repair
  (`reoccupy` from derelict) debit it by the new class's row from sources within the haul radius. The ledger is a flow
  record, never a hard constraint: a debit it cannot cover is built anyway and the shortfall is reported (J-A8.45). Its mark
  on the map: the strike pool's weight for `robStone` and `clear` is multiplied by the salvage demand within the haul radius
  — the standing debits of planned building, repairs and a new stage's footprints — so cleared zones appear beside active
  building, and a ruin beyond any demand is left standing, the owner's "occasional old decrepit buildings or ruins".
* **Lag and memory.** Built extent follows population with a lag on the way down and none on the way up: a fall's
  households leave at once (step (c)) and the standing stock decays by the dwell bands over later epochs; a rise is met in
  the epoch it arrives by the regrowth-first order below, without a dwell (J-A8.47). Memory is the persistence order itself:
  plot lines, street lines, wall lines and traces outlast the buildings, so the old plan is there for regrowth to refill.
* **Regrowth-first — built now, on the one path (J-A8.44).** In `grow-by-stage` S2's delta demand is placed in this order,
  and only the residual grows a stage: (0) standing shells whose household count fell below what their occupants' band row
  houses relet up within §2.6's capacity (`relet`; J-A28.45); (1) vacant buildings reoccupied (`reoccupy`); (2) derelict
  ones repaired (`reoccupy`, a ledger debit); (3) ruins and cleared traces rebuilt or reused on their foundations
  (`rebuild`, `reuse … build`); (4) vacant plots of the old plan beyond the band's vacancy-run share (S10 (8) keeps the
  share; the design's own runs are never filled below it); (5) plots S10 cuts on the faces the old plan left unbuilt along
  its street lines inside the last boundary; (6) new faces of a new stage — the underground crowding hook first sends
  `crowdingShare` of the residual's poorest-band households underground where there is room: on lived and reopened sewer
  runs where `Features.sewers` is on, and in accessible cavern and ruin clusters at any rung (II.7.3 (c), II.7.4, §4.5 S7b
  (6); item 109 (j) (4)); S5a grows the boundary for the residual only; then, after S11 of the new stage, where
  `Features.sewers` is on, `SewerStrategy.extend` connects the new faces to the network, reopening closed runs on its paths
  first (II.7.2), and the first epoch the feature turns on, `SewerStrategy.derive` lays the network whole over the current
  ways instead, every existing entity kept (V06's `under.extend`); an epoch whose residual is ≤ 0 grows no stage and adds no
  face — the owner-staged history engine's two exceptions excepted (V06 §3.6; file f item 336): a stage for the overflow
  backlog, whose households are those its overflow ladder housed in earlier epochs, and a decrowding stage, whose
  households are the crowded ones it moves. That engine places its own tiers between (5) and (6): (5′) the upgrade of
  downgraded ways and the reopening of hollow ones (V07's hollow ways, `reopenWay`) and (5″) crowding within a factor of
  the band row (V06 §3.8); and every placement that engine makes on a plot whose access edge is a hollow way reopens that
  way, with any hollow way on its path to the ways in use, in the same batch first (V06 §3.8.2). S7b allocates the delta first to (0)–(5) as each district's old-plan capacity and only the remainder to new faces.
  **Test:** §13.2's T8-2 (M4).
* **The prosperity field under decline.** The drivers are re-evaluated per epoch (§4.5); under decline the market, harbour
  and main-street kernels shrink with their activity (§7.7's circumstance slice), and where plots merge the density field
  falls, so the field contracts toward the survivors' core and may concentrate there — the ladder's amalgamations are its
  footprint on the plan. An island that sinks or moves, a new wall or tall new building shifts the shade, and the field and
  the uses move by their normal lag — a sunnier quarter slowly improves, a newly shaded one slowly declines (item 102 (e));
  a spring or oasis that fails weakens its water pull and the quarters around it may decline (item 111 (b); V06).
* **Islands and the underground over epochs** (their laws are II.6's and II.7's). Each epoch re-reads the rung from its
  population target (*The rung at an epoch*) and re-evaluates II.6's supply law: an island whose supported area shrinks past
  the hysteresis is resized (its rim's plots cleared with lifecycle events, cause `convert:resizeIsland`); one whose supply
  falls to zero — or whose settlement falls below the CITY band (to TOWN or a village rung; AM-13) — wanes, settles after its
  dwell band and falls: `fallIsland` archives its arena and converts the ground it lands on — covered buildings demolished,
  covered plots left vacant under a `fallen_island` decoration, covered fields quarried, the stone credited to the salvage
  ledger, no edge added or removed (V05 §3.16); regrowth re-floats a settled island before it raises a new one (J-A10.42) —
  the laws in full, called once per epoch as `IslandEpochStep`, are V05 §3.15. The underground's candidates, weights and
  conversions are `UndergroundFade.candidates` and `.apply` (II.7; the underground's rows in `tables/under/fade.json`): a
  tunnel, gallery or chamber silts, caves in, floods or is sealed by its own draw at the `decline` step, after the fabric
  pool (V06's `under.fade` participant), at the underground's rate with `UndergroundFade.candidates`' weights, uncapped by
  the district's `fabric` cap and outside the pool's persistence order, never demolished by the engine (J-A11.41), and is
  reopened before a new one is dug; the undercity's size is re-read and a neighbourhood cleared by `UndercityEpoch.reread`
  (II.7.5; V06's `under.undercity`).
* **Identity and determinism.** A vacant, derelict, ruined, cleared or reused building is a live record with its address and
  lineage (§6.3); it becomes a tombstone only by `demolish` or when a `reuse … build` successor takes its address
  (`supersede`, §2.8) (J-A8.42). Every draw above comes from `epoch.transform` or, for islands, `island.place`, keyed by
  lineage and epoch, so the same seed under the same circumstance timeline gives the same history of decline and regrowth
  and a different timeline a different one (§6.2, §7.7).
* **Emulation note.** Neither reference has time: with no epoch the static baseline is unchanged byte for byte (§13.3's
  goldens), and every rate above is a table value (AM-23).

The kinds this adds to `ConversionOp` — one list with the union above, which reads `… | DeclineOp`; §7.1's `convert` event
carries them all:

```ts
type DeclineOp =
  | { op: 'vacate' | 'reoccupy'; building: Id }                                          // occupied ⇄ vacant; reoccupy from derelict is a repair: roof restored, ledger debited
  | { op: 'reuse'; building: Id; as: 'garden'|'orchard'|'field' | { build: BuildingClass } } // a ruin or trace reused: the trace drawn as that kind (Building.reusedAs, §2.6), or a successor on the old foundations (Building.predecessor, §2.6)
  | { op: 'neglect' | 'breach' | 'dismantle'; enceinte: Id; stretch?: StretchRef }        // walls and gates: breach → the stretch's condition 'breached', dismantle → 'dismantled' (the whole trace when no stretch; §2.7, item 575); the old line persists as a trace; contractWall and wallToWay above supersede a ring
  | { op: 'neglect' | 'breach' | 'dismantle'; raised: Id; span?: SpanRef; support?: number }   // item 110 (b)'s raised ways (V06 §3.19.2): neglect the way (abandoned); breach a span (its deck and arch ruined, the rubble left); dismantle a ruined span's rubble or a support whose spans are both down (cleared, stone credited); breach and dismantle collapse the span's arch-vault chambers in the same batch (V04), and removal deletes them
  | { op: 'breach' | 'dismantle'; retaining: Id; stretch?: StretchRef }                   // item 110 (a)'s retaining walls (V06 §3.19.4): a stretch decayed (slumped) or ruined (stone taken), knots of the wall's `state` profile at its ends (§2.7, item 245); no edge removed, no terrain changed
  | { op: 'breach' | 'ruin'; deck: Id /* the deck plots' Plot.deck.host (item 246): a Bridge, or a pier or quay way */ }   // item 110 (d)'s decks (V06 §3.19.5): breach — the host decayed (charred or damaged, impassable); ruin — ruined (fallen or taken down), its way cut only where §5.3's network invariant allows; the buildings on its deck plots ruined by least disruption in the same batch and the deck plots tombstoned; Bridge.state untouched; repairRaised's deck form restores the host's former existence from the striking op's undo record
  | { op: 'retireWay' | 'effaceWay' | 'reopenWay'; way: Id }                                // file f item 268 (b): a way of a land class on ground part 0 at a village rung (V07 §3.12): retire — in use → abandoned (a hollow way, read by no router, tracker or merge test); efface — abandoned → decayed; reopen — a hollow way back to built, regrowth first; issued through the product's epoch rows (V06's ProductDeclEpoch.rows) or by hand through `convert`; never on a deck, a ford or a raised part
  | { op: 'silt' | 'caveIn' | 'seal' | 'reopen' | 'flood'; element: Id /* a tunnel, gallery or chamber (II.6's condition table); flood only on a gallery or chamber whose floor lies below the water table */; stretch?: StretchRef }   // the underground's ladder (II.6; J-A65.48); a `stretch` splits the record first; no engine plan contains demolish on a tunnel
  | { op: 'resizeIsland'; island: Id; areaHa: number; altitudeCm: Cm }                     // the supply law's response: the rim eroded or dilated by the kernel's buffer; rim plots cleared, or new rim faces grown by the grow path on the island's arena (V05 §3.15)
  | { op: 'waneIsland' | 'settleIsland' | 'fallIsland' | 'refloatIsland'; island: Id }      // floating → waning → settled (elevation at the floor of its band, districts declined) → fallen (arena archived, the landfall above); a settled island re-floats first
  | { op: 'raiseIsland'; allocation?: Id; declared?: { ring: PolygonCm /* local */; anchor: PointCm; kind: string; altitudeCm?: Cm } }   // regrowth: a new island for a sky allocation the count law opened at this epoch, placed by SkyStrategy (II.6), or a declared one
  | { op: 'removeIsland'; island: Id }                                                    // an author's removal: the record kept at its address in state 'removed', holding its slot (V05 §3.2 (6))
  | { op: 'reclearIsland'; island: Id; groundRefCm: Cm; altitudeCm: Cm; elevationRaisedCm: Cm };   // the epoch's clearance re-check (V05 §3.15 (7)); returned by the `sky.clearance` participant only
type SpanRef = { raised: Id; from: number; to: number /* support ordinals; a view resolved in its batch, as StretchRef */ };
```

**Terrain and water change slowly (item 25; the engine is owner-staged, the kinds and the hand path are the base's).**
Reclamation, silting and river-course shifts are conversions on the one list — the slowest layer of the persistence order,
never immutable — applied by hand in the base through §7.1's `convert` event and, in the staged engine, drawn at the decline
table's `terrainWater` rate by their own trigger rows (below). Each is a typed operation whose repair is an operator the base
already has (J-A25.41):

```ts
type TerrainWaterOp =
  | { op: 'reclaim'; kind: 'marsh'|'foreshore'; region: Polygon /* marsh: LandUse faces of kind 'marsh' or a damp or flood band re-typed as land; foreshore: a shallow water margin filled */ }
  | { op: 'siltReach'; water: Id; stretch?: StretchRef /* a reach or a basin: its width and depth profiles fall by the row's share; a basin below the harbour's draught loses its harbour use */ }
  | { op: 'shiftCourse'; water: Id; from: number; to: number /* control-knot ordinals (§2.3): the reach between them re-traced — a meander cut-off or an avulsion */ }
  | { op: 'digCanal'; polygon: Polygon /* the carve above, kind 'canal' */ };
```

* **Repair.** `reclaim` runs S1's terrain operator (§7.3 (a)) — the region's ground raised to the flood line plus the row's
  margin (`reclaim.raiseCm` 60), drained by a ditch water body and its `LandUse` faces re-typed with `reclaimed` set, as
  §2.3 states — and, for a foreshore, S1's water operator (§7.3 (b)) with the filled margin as the new shore; `siltReach`
  and `shiftCourse` are S1's water operator on the changed reach (the width and depth profiles, the shores as their buffer,
  the crossings re-sited, the kept ways re-routed, F-RIVER's re-trace confined to the reach, §7.3 (b) 1–2), so their
  footprint, fates and locality are the carve's and byte identity holds outside it; `digCanal` is `carve`. A shoreline
  change re-evaluates a wall's barrier closure by least disruption (§4.4). Every touched entity's lifecycle records the
  cause (`convert:reclaim` …); the record changes each kind makes are §2.3's.
* **Trigger rows (the engine's step; the rows are the decline table's `terrainWater` rows, §7.6).** Candidates and their
  chance per year — applied over the epoch's span as `1 − (1 − p)^years` (*The clock*, above; J-A76.45) — each × the layer's
  persistence rate (0.005) and drawn from `epoch.transform` keyed by the water body's or face's lineage and the epoch (§6.1;
  no new concern, J-A25.42): `siltReach` — a reach whose accumulation has fallen, or a basin whose harbour use has closed
  (the use step), 0.02 per year; `reclaim` — a marsh or foreshore face beside built land whose band's plot demand is short
  (S5d's shortfall record) and whose district's band is `modest` or above, 0.03 per year — reclamation is bought by
  prosperity and pressed by demand; `shiftCourse` — a reach whose sinuosity exceeds `river.cutoffSinuosity` (1.8), or whose
  flood cells beside it exceed the row's share, 0.01 per year; `digCanal` only by demand (a `canal` row of the roster's
  institutions, a dossier element or a user's edit). Each fires at most once per body per epoch; AM-23's tendency wording
  holds — rates, not laws. Emulation note: neither reference has time, and both already let a user reshape water — MFCG's
  warp and FTG's water drawing — which the base keeps as §7.1's edits; nothing here runs without an epoch.

**Hidden plots over epochs (item 30 (e); the base carries the kinds).** A passage can be **sealed** — `sealPassage` sets
`Passage.sealed` (§2.5), so the access edges on its face read as sealed; every plot whose only reach passes it takes
exposure `sealed` (§4.6), and its buildings enter the decline ladder as vacant (`vacate`, cause `convert:sealPassage`) — and
later **reopened** (`openPassage`: the exposure returns to `hidden` and the buildings reoccupy by the regrowth-first order);
both are hand edits in the base and the engine's kinds later. Hidden plots **arise** by densification — the ladder's
`densify … back_court` (rung 2) — and **vanish** by `thin … back_court` (the rear plots cleared after their uses relocate,
their households are re-homed and their buildings vacated, the passage sealed and, on a rising band's re-cut, removed with
the rear row, `amalgamate` returning the land to the front plot's garden: item 31). The sealing kinds are the last kinds of
this section the union admits (`… | TerrainWaterOp | HiddenOp`):

```ts
type HiddenOp = { op: 'sealPassage' | 'openPassage'; passage: Id /* the L3 passage face (§2.5) */ };
```

**Works — every physical change on the ground as a timed project on the weekly clock (item 67; owner: "when a building
gets torn down, ruined, being built, being expanded, Lots need to merge or separate … we should show stages of it being
built. What do you think those stages should be?").**
1. **Decided at once, shown over weeks (J-A67.41).** Every physical change — a build, an extension, a demolition, a repair, a
   conversion, a decay step, a clearance — is decided and recorded by the event that makes it (the designation mutator's
   record, a conversion, a ladder or decline op; §4.7 S11 step 6, J-A67.49), so the log alone still determines the model.
   When that event carries a week — an epoch, a dated dossier change (§7.7 item 1), a hand edit scheduled by `startWorks`
   (§7.1) — and the preset's `works.enabled` holds, the event also creates a **`Works`** record (§2.7): its kind, its target
   (a building, whose added or subtracted wings and storeys are the parts of the `MutationRecord` its `cause.mutation` names;
   or the plots of a join or a split — §2.7's `Works.target`), its start week, its duration in working weeks, the `WorksTable`
   row read, the event and mutation it shows, and what the ground held before that the model no longer holds (the removed
   parts' rings with their heights and roof kinds; the removed plot lines with their treatments). The drawn state at any
   week is DERIVED — computed from the record, never stored per week (2). An event with no week, a hand edit not scheduled,
   generation (the creation week shows a finished town; J-A67.47) and the parity presets create no Works, and the change is
   drawn finished. So a user's `build`, `demolish` or `convert` stays instant unless scheduled; an engine's `demolish` makes
   its tombstone at once while its Works draws the demolition from the kept shell; aborting a change is its undo (§7.4),
   which removes its Works; `cancelWorks` (§7.1) ends a running Works at once — the change it shows stands, drawn finished —
   and a `setAttr` on a Works moves its start or its duration.
2. **The stage at a week.** `stageAt(works, w)`: `e` = the working weeks in [start, w) — the weeks the calendar row does not
   pause for the Works' material in the town's climate (`WorksTable.pauses`: masonry, stone and brick, pauses in winter in
   temperate and cold climates; our own rows) — and `f = min(1, e ÷ duration)`; the stage is the kind's latest scheduled
   stage whose start fraction is ≤ `f`, `before` for w before the start and `finished` at `f` = 1. Weeks are integers, so a
   stage shorter than a week is never drawn (a tick shows the stage it lands in); a zero-week duration (a tent's row) applies
   finished in its week. At most one Works runs on a target: a new change on it ends the running one at the stage reached,
   which the new one takes as its `before` (a repair begun on a decaying house runs back from DECAYING).
3. **Durations (item 67 (b); J-A67.43).** `WorksTable` rows keyed by kind × class (or the designation template's `works`
   key, §10.2) × size (storeys, footprint) × material give a range of working weeks; the duration is drawn once, uniform in
   the range, × the labour factor of the plot's band (richer, faster; a row), on the `works` concern (its key is §6.1's;
   J-A67.61; J-A67.42). Defaults (our own, calibratable, §13.9): a tent 0 weeks; a hovel, shed or shack 1–2 weeks; a small
   timber house 2–6 (the owner's "two weeks or a month"); a town house 8–17; a stone house 17–52; a manor 52–156; a church
   520 or more; a cathedral built part by part — choir, transept, nave, towers, each its own Works in its programme's order,
   the choir in use under a temporary roof while the nave rises; a demolition a quarter of its build's range; a clearance
   1–4; a `decay` Works the decline table's dwell band for its step (below), × 0.6 for timber and thatch. Material enters as
   a duration row only — time, never shape (the owner's materials rule, §2.6; J-A31.42 stands for replaceability).
4. **The stages — the answer to the owner's question (item 67 (c)–(f)).** Start fractions are per class row; what each stage
   draws is §8.2's `states` rows. The table's first column is `WorksRow.kind`; a fire is no Works kind but an instant event
   with a drawn state:

   | kind | stages (default start fractions) |
   |---|---|
   | `build` — and each wing or storey an extension or an adaptation adds | STAKED 0 (a dashed footprint, a material pile) · GROUND BROKEN 0.05 (bare earth, a spoil heap, a cellar pit) · FOUNDATIONS 0.15 (low walls or a sill frame) · WALLS RISING 0.25 (the walls up storey by storey, no roof, the interior open, a scaffold ring) · ROOF FRAMED 0.75 (rafters, no covering) · ROOFED 0.85 (covered, the scaffold still up, a work yard) · FINISHED 1 (the scaffold gone, the yard laid out) |
   | `extend` | the kept building in use throughout; the added wing through the build stages; at ROOF FRAMED the old roof opened where the two join; at FINISHED the joint wall opened and the wings united (item 18's add step, shown over time) |
   | `demolish` | EMPTIED 0 (doors and windows out) · STRIPPED 0.2 (the covering salvaged, rafters bare) · ROOFLESS SHELL 0.4 (rubble inside) · RUBBLE 0.7 (wall stubs, heaps, salvage piles) · CLEARED 1 |
   | `decay` — §2.8's ruin ladder on the way down (5) | toward `decayed`: ABANDONED 0 (shut up, the yard overgrowing, the roof whole) · DECAYING 0.5 (a holed roof, a sagging ridge); then `decayed` is ROOFLESS (weeds and saplings inside), `ruined` COLLAPSED (walls fallen in places, the stone gone to the salvage ledger), `cleared` or `reused` OVERGROWN (a grassy mound and a foundation line, until cleared or built over) |
   | `repair` | the decay stages backwards under a scaffold, to the building's former state |
   | `clear` | RUBBLE 0 (the ruin's heaps being carted) · CLEARED 1 |
   | `convert` (a conversion with no geometry step) | REFIT 0 (a scaffold on the frontage) · FINISHED 1 |
   | a fire (an event, not a kind) | an instant destructive event (rung 3's trigger): the building `decayed` in its week and drawn CHARRED — a blackened roofless shell — until a clearance or a repair starts |

   The ruin stages are the existing ladder's drawn stages (J-A8.46 stands; no new `Existence` value): the target keeps its
   ladder state from the event on and carries its running Works by a link (`Building.works`, §2.6).
5. **The decay Works carries the dwell band (J-A67.46).** A `vacate` (the building `abandoned`) starts a `decay` Works toward
   `decayed` whose duration is its dwell band drawn once (the decline table, above); the strike pool's `decay` candidates are
   the buildings whose `decay` Works has run its span, and the strike's `decay` event (the building `decayed`) starts the
   next toward `ruined` the same way; a `reoccupy` ends it and starts a `repair`. A building left `abandoned` or `decayed` by
   an undated event (a hand edit) gets its decay Works from the next epoch, starting at that epoch's week.
6. **Mutation steps (J-A67.49).** A Works shows its event's `MutationRecord` (§4.7 S11) in the record's order — subtracted
   parts by the demolition stages first, then adapted parts (an added storey's walls rising, an extended wing's build
   stages), then added parts by the build stages — each part's span a share of the duration by its footprint area; kept parts
   stand as they are. A `rebuild` is a demolition then a build, one Works; the epoch-spread mutation's events (above) each
   start their own.
7. **Plots in transition (item 67 (g); J-A67.44).** A join or a split is decided when its event lands — the plot rings change
   then (ownership) — and the ground follows the work: each removed boundary line is drawn from the Works' kept lines, dashed
   as pending removal, until the joined plot's build reaches GROUND BROKEN (or a demolition reaches RUBBLE), and a new
   dividing line is drawn as stakes, dashed, from STAKED and as its fence or wall from WALLS RISING. Item 31's `subdivide` and
   `amalgamate` run through the same stages. Access is the event's, so a Works never leaves a plot without access.
8. **What reads the stage.** Heights at a stage are derived, `heightsAt(works, w)`: WALLS RISING raises the eave storey by
   storey (the eave × the storeys reached ÷ the floors) — for a building with a solid wing or a wing standing on another
   (V02 §3.15) **in stack order**: its courses counted along each chain from the ground (a storeyed wing's floors; a solid
   wing `⌈eaveCm ÷ storeyCm.upper⌉` courses, never a division by its zero floors), the courses reached advancing by this
   rule over the tallest chain's count, a wing's height its `eaveCm ×` the courses it has reached `÷` its courses from its
   stored `baseCm`, a wing neither drawn nor cast until the wing it stands on has reached its eave, a stair rising with the
   tier whose top it reaches, the shrine and a roofed top taking their roofs from ROOF FRAMED as any roof does and a flat
   terrace no roof stage — no roof before ROOF FRAMED (drawn as a `framed` roof), the finished roof from ROOFED, a demolition
   lowering them in reverse (in reverse stack order); the stored heights stay the finished building's, so the shadows of §8.4
   and §11.1's 3-D export follow the stage. The households an event placed are housed at a week only from FINISHED, and a
   demolition's have left before EMPTIED (item 17's relocation, J-A17.41): the module's occupancy, the lit windows (§10.3)
   and the light sources (§4.7, §8.4) read that. The plan rung of a building in progress draws walls without doors or
   furniture, and of a ruin its fallen walls and open rooms (§2.6); the stage counts among the plan rung's recorded inputs, so
   a stage change marks a derived plan stale and §8.5's change marker shows it (item 67 (j)). Descriptions use §10.4's stage
   words; the city band draws the stage glyph on the footprint, the neighbourhood band the walls, scaffolds, frames and
   rubble (§8.5, §8.2).
9. **Which week is drawn (J-A67.45).** Every drawing, export and reader draws the document's current week (*The clock*,
   above) unless the per-viewer view key `week` (§2.9) names another — a host's view command setting a week (item 125 (c); §11.3), or a user scrubbing
   — outside every digest. Scrubbing draws every live Works, and every Works finished within `works.retainWeeks` (52), at
   that week over the current model, forward and back, byte for byte; the full history at an earlier week is the log's
   replay (§7.4). An epoch retires the Works that finished more than `works.retainWeeks` before the week of the previous
   epoch — the start of its span; the creation week for the first — so the model after an epoch holds every Works that ran
   during its span at any cadence (V06's frames draw from it): the record leaves the model and its target's lifecycle event
   keeps the weeks.
10. **Restraint (item 67 (i); J-A67.48).** An epoch's Works start at weeks spread uniformly over its span (the weeks since
   the previous epoch; the offset is the `works` concern's draw before the duration's, §6.1), so the share of stock under
   works at the epoch's week follows the growth or decline rate by construction — a steady town shows a few scaffolds, a boom
   town many, a declining one ruins. A `ConditionOverlay` (§2.7; staged, empty in the base; item 88) scales the share of an
   epoch's changes it starts as Works once the port fills it (a siege stops building). With no epoch and no scheduled edit
   nothing here runs, and the static baseline is byte-identical (item 23: neither reference has time).

```ts
type WorksStage = 'before'|'staked'|'groundBroken'|'foundations'|'wallsRising'|'roofFramed'|'roofed'|'finished'
  | 'emptied'|'stripped'|'rooflessShell'|'rubble'|'cleared' | 'abandoned'|'decaying'|'roofless'|'collapsed'|'overgrown' | 'charred'|'refit';
interface WorksRow { key: string /* a class id, or a designation template's `works` key (§10.2) */; kind: 'build'|'extend'|'demolish'|'repair'|'convert'|'decay'|'clear';
  storeys?: [number, number]; footprintM2?: [number, number]; material?: string /* a duration row only (item 67 (b)); never a shape input */;
  weeks?: [number, number] /* working weeks, drawn once; absent on a decay row, whose span is the decline table's dwell band × 52 */; factor?: number /* a decay row's material factor: timber and thatch 0.6 */;
  stages: { stage: WorksStage; from: number /* a fraction of the duration */ }[] }
interface WorksTable { rows: WorksRow[]; labour: { band: string; factor: number }[] /* the duration × the factor of the plot's band */;
  pauses: { material: string; climate: string; seasons: ('spring'|'summer'|'autumn'|'winter')[] }[]; retainWeeks: number /* 52 */; enabled: boolean /* false in the parity presets */ }
```

`WorksTable` lives in `@plat/tables` (`works.json`, §14), editable with provenance (§7.6); its decay rows read the decline
table's dwell bands, never a second number.

**Markets over epochs (item 24).** A secondary market the roster's suffix adds is claimed by the epoch's S7b in the new stage
or in a due district by §4.5 S7b (3)'s rule; a market whose institution closes (the use step) keeps its square — a plaza or a
`market_green` — until a `clear` or a claim reuses it, so no market moves by wealth change alone.

**Informal clusters over epochs (item 70 (e); J-A70.48).** On the weekly clock a cluster grows by accretion: delta households
of its band placed on an informal plot add structures by §4.7's packing on the plot's free path sites, each a `build` Works
of its row — a shack or lean-to the hovel-or-shed row's 1–2 working weeks, a tent the zero-week row, finished in its week;
rung 1's `densify … infill` on an informal plot adds structures in that way too. A destructive circumstance event (rung 3's
trigger) burns a cluster fast — its structures `decayed` and drawn CHARRED in one week, then cleared. When its district's
band rises past the hysteresis a cluster is cleared or **formalised** by rung 3 in the due epoch (the replaceability of tents
and shacks is `immediate`, §10.2): its households re-homed by item 17's relocation or re-let, the plot cleared, re-cut by S10
(7) into row-house plots and built by S11 at the new band. In decline, a vacant, cleared or ruined plot of a district whose
value fell past the hysteresis at the epoch takes tenure `informal` (§4.7) and may take a cluster. Each step is an event of
this section's kinds; the engine that schedules them is the staged one.

**Lights, deposits and conditions over epochs (items 68 and 88).** A light follows its host (§4.7's *Light sources*), and an
epoch re-runs the light rows on its new and changed faces only. A `DepositSite` (§2.7; staged, empty in the base) whose state
changes converts the land use it anchors: `depleted` or `removed` — its quarry, mine or claypit `abandoned` and drawn worked
out (a deposit depleted at creation drawn so from the start); `discovered` — a new outside site sited by S12a's rows at that
epoch. A `ConditionOverlay` is read as *Works* (10) states.
=== END ===

=== REPLACE ### 4.13 Edges and meeting points — the defined outcome at every limit ===
### 4.13 Edges and meeting points — the defined outcome at every limit

Every stage commits geometry through kernel transactions, and a degenerate result is handled by the stage's failure class
on its §5.2 ladder (§4.1's transactions table), never by a whole-map retry. Every other limit of this part's mechanisms has
its outcome at its home; the **edge suite** (§13.2, B-EDGE) runs one fixture per row below, or each fixture a row
names — the home's stated outcome, hard, 0 per 1 000 — at every rung the row names and under every preset (the parity presets and each layer on and off).

| id | mechanism | case | outcome, where it is stated | ladder rung |
|---|---|---|---|---|
| EP-01 | every stage | zero-length, zero-area, self-touching, collinear or coincident geometry | refused by the kernel; the stage's failure class (§4.1) | repair locally → retry that piece → simpler shape → leave out and report |
| EP-02 | S0 | a band's floor, a single building, THORP to the METROPOLIS cap | §4.2 S0 (`LadderRouter`, §1.1's clamp; the ladder coverage test, §13.1) | — (defined) |
| EP-03 | S0's sewer feature | `on` at TOWN, `on` below TOWN, `off` at CITY, missing | §4.2 S0 | report |
| EP-04 | S5b / S5c | no new primary owed; no seed inside the boundary | §4.4 S5b, S5c | — (defined) |
| EP-05 | S5d | a face whose reserves cover it | §4.4 S5d (built land floored at 0) | top-up → report |
| EP-06 | S6 | a single coarse face; a degenerate district face | §4.5 *Grower* | merge |
| EP-07 | S7b | zero-capacity district; one district; a claim no face holds | §4.5 S7b (1), (3) | re-site → drop and report |
| EP-08 | S10a | an empty allocation; one block; every rung | §4.7 S10a | reconcile |
| EP-09 | S10b | a block with no class; a request with no item | §4.7 S10b | — (defined) |
| EP-10 | S11 | the village rungs' furniture | §4.7 *Furniture pins* | — (defined) |
| EP-11 | S12a | no hinterland land | §4.9 S12a | F-SITING, import reported |
| EP-12 | S12b | a refused layout; no green face; save, undo, regenerate | §4.9 S12b | leave out and report |
| EP-13 | S13a | no nameable feature of a kind; one district | §4.10 | — (defined) |
| EP-14 | an epoch | a target equal to the population; a residual ≤ 0; a spring at `flow` 0 (it pulls nothing, its water body standing) | §4.11 (the one path; regrowth-first); §4.2 S3 (6) and §4.5's water term (`spring.flow`) | — (defined) |
| EP-15 | history-first generation | no peak, a founding after the present, a peak below the present or above the cap; a replay starting 300 years before a week-0 present (a valid season at every epoch) | §4.11 *History-first generation* (7); *The clock* (3)'s floored week | report |
| EP-16 | the stop test and the ring spacing | the folded bell at its end (g = 1; f = 1) | §4.6 step 1; II.2 | — (defined) |
| EP-17 | S12c | pseudo-districts, undercity and underground neighbourhoods, unit runs | §4.5's item-72 paragraph (*Which districts*) | — (defined) |
| EP-18 | §10.2 – §10.4 | an empty or contradictory table row; a pack with no names; every rung; save, undo, migrate | §10.2 *Rows at their limits*, §10.3, §10.4 | the compiler's clamp → report |
| EP-19 | II.7.1 – II.7.6 | each edge the underground sections state (no network, one tunnel, the caps, every rung, the toggles and presets, the lifecycle) | II.7.1 – II.7.6 at each rule; II.7.4 *Limits* | F-UNDER, F-VOID |
| EP-20 | S3 (6), S5a, S5d | less reachable land than a stage asks — fixtures: an island town on an island of half the stage-1 land, a fjord site, a METROPOLIS at the cap in a narrow valley | §4.2 S3 (6) (the capped `t`, the frame arc); §4.4 S5a (a stage with no land folded), S5d (no top-up without land) | simpler shape (the capped level set) → leave out and report (`requestedVsBuilt`, F-BUDGET-STAGE) |
| EP-21 | S3 (4), (7), (9); S5a | a barrier closing the arcs a gate falls on, or every arc — fixtures: a river loop with N₁ = 5; a mesa ringed by sheer faces (every route in within its class grade, or `unserved` reported; 0 routes steeper than `path`'s limit); a mesa below the sheer test and a marsh-ringed town (walled on their `cliff`, `steepSlope` or `marsh` arcs with one gate, its route within its class grade or `unserved` reported); an island town filling its island | §4.2 S3 (4)'s closed-arc reduction, (7), (9) (every arc closed: (a) unwalled, (b) walled on its walled closing arcs); §4.4 S5a | retry that piece (the pick re-drawn, ≤ 3) → simpler shape (the next class's grade, F-ROUTE) → leave out and report (F-WALL; `unserved`; `W_WALLED_BY_BARRIERS`); F-CASTLE's re-site |
| EP-22 | S3 (10); S5a's outer moats | a wet moat with no water within reach or on sloping ground — fixtures: a hill town with `moat: 'all'` (a plot within `waterTableM` of a wet moat on the slope reads the moat's derived level (§4.2 S3 (10)) + `freeboardCm` as its water table, never its bank top — its cellar or crypt taking the full rung where that level allows (§2.6)), an arid town with no river with `moat: 'inner'` | §4.2 S3 (10) *Where a moat holds water*; §4.4 *Outer moats*; §2.6's water table | simpler shape (the dry `ditch`), reported (`W_MOAT_DRY`) |
| EP-23 | S3 (5), S4, S5b, S5c | the steepest ground — fixture: a mountainous site, arterials within their class grade or `unserved` | §4.3 *Lattice and costs* (the class grade limit); §5.2 F-ROUTE | simpler shape (the next class's grade) → leave out and report (`unserved`) |
| EP-24 | S8's cliff band; S10, S11 levelling | a cliff across a district (0 lanes, seeds or ground way spines crossing the cliff line; the two sides' plots backing onto it at the `cliff` setback); two plots at a cliff's top and foot; a step of 2.5 × `stepMaxCm` (`levelledGroundCm` on each terrace equals its datum; every wall's `stepProfile` lies in (`stepMinCm`, `stepMaxCm`]); a levelled unit beside unlevelled ground | §4.6 (a cliff inside the district a hole); §4.7 *Levelling and retaining walls* (step regions) | simpler shape (terraces, else skirts and stepped wings) → report |
| EP-25 | S1 (6), S3 (2) | a harbour on a site with a river but no coast — fixtures: a river-only site with `harbour: 'on'`, and with `deep_harbour` | §4.2 S1 (6) (the river or lake harbour) | substitute (a river or lake harbour) → leave out and report (tier 6) |
| EP-26 | S10b's `dossier` request | no seat on the current map for a dossier element — fixtures: a 1 500-person TOWN dossier listing more dossier institutions than its plots (every one placed, the report naming each edge plot); and, run with V07 registered (V07's village rows), a THORP dossier with 40 custom institutions absorbed at once, every one placed, the report naming each edge plot | §4.7 S10b *Reconcile and infeasibility* (the last rung) | substitute (a new outside plot), reported `W_DOSSIER_EDGE` |
| EP-27 | §10.2's crisis looks (a look only) | no outskirts land left in the frame and margin; an island town; a siege of an unwalled place; a mesa whose every arc is a closure feature; a mesa no way leaves (S3 (9) (a)'s unserved mesa) with a refugee camp and a quarantine standing — each on `campLand` measured from the reference point, else on the ring marks, never undefined; an unwalled TOWN with an `inside` castle (the blockade on its approach roads), a walled CITY with an `outside` castle, a twin town with two rings and a walled town with extramural ribbons inside the standoff — no look on a building footprint; THORP to the METROPOLIS cap, a siege at THORP and HAMLET drawing no siege line, a positive share of a place with few units taking at least one; two and three crises at once; a force larger than the frame and margin; a headcount of 0 or none given; a refugee camp of two heads (fewer than one household); an unmapped stressor type or archetype; a condition whose `untilWeek` is not after its `sinceWeek`; no condition and no preview — at each, the document and its hash unchanged by the look, and nothing on water, a gate's passage, a label's keep-out or a building footprint (the parts drawn on a building itself excepted), a carriageway holding only a barrier across it (§10.2 (d)) | §10.2 *Crisis looks* (b)–(h) | simpler shape (what does not fit drawn as §8.8's massed marks; the severity-and-tier scale where no headcount is given) → report (`unmapped_word`) |

**Where features meet (the combination suite, §13.2, B-EDGE).** Each cell is the outcome where the row's feature meets the
column's, then its rung on §5's ladder (— (defined) for a rule with no failure); a raised way is generated
only at CITY and METROPOLIS and declared at any rung (§4.3); a retaining wall and the frame stand at every rung; a deck plot
at VILLAGE and above (V07's village rows at village rungs).

| feature | a raised way (§4.3) | a retaining wall (§4.7 *Levelling*) | a deck plot (§4.7 *Deck plots*) | the frame (§3.2 (9)) |
|---|---|---|---|---|
| cliff or steep slope | a drop the viaduct reason reads; no support taller than `maxPierM` (a generated course drops, `raised_too_tall`; a declared one bends, §2.7's support step); an end's ramp or stair keeps its class grade (§4.6). *Rung:* leave out and report (generated); simpler shape (declared, bent) | none on a cliff bank, a `cliff` or `sheer` closure arc or a cliff inside a district — the cliff holds the ground, plots backing onto it at the `cliff` setback from its top and its foot and none cut across it; on a steep slope levelled only up to `stepMaxCm ÷ minTerraceDepthM`, steeper not levelled (reported). *Rung:* simpler shape (skirts and stepped wings) → report | no deck host on a cliff bank: no pier, mole or breakwater is rooted on one (§4.8); a quay platform on a steep bank is ground, levelled as any plot. *Rung:* — (defined) | clipped at the arena's outer ring by S1; nothing drawn beyond it. *Rung:* — (defined) |
| river, coast, moat | spans between supports on the banks, no support in water (§2.7's support step) but a frame growth's extension that no fitting course admits, kept and reported (its (7)), within `viaduct.maxSpanM` and §2.7's clear-span bound (`raisedWays.structure.maxClearSpanM` by material) — a crossing wider than it drops a generated course (`raised_too_long`) and bends a declared one; never out over the sea (its ends are ground vertices); a moat spanned with no support in its water, and one laid after the course by §2.7's laws (law 1 (1), (8); its worked example the way-and-channel table's row (e)), the course kept (`W_RAISED_CROSSING`). *Rung:* leave out and report (generated); simpler shape (declared, bent) | none on a `water` run; the bank holds the ground. *Rung:* — (defined) | a bridge, pier, mole or quay deck by the `deck` offer; none on a ford, a drawbridge or a gate's moat deck. *Rung:* — (defined) | a water body reaching the ring shares its edge (§4.1's S1 row); no crossing site whose deck end lies beyond it. *Rung:* — (defined) |
| harbour | the basin and its mouth excluded; a stroke across bends to its last ground vertex. *Rung:* simpler shape (the bent stroke) | quays, moles and piers are harbour works, never retaining walls. *Rung:* — (defined) | moles and quays by offer; a walled port's mole head holds the chain tower (§4.8). *Rung:* — (defined) | as water. *Rung:* — (defined) |
| wall | meets a wall by §2.7's laws (their worked example the crossing table): created across a standing one, an aqueduct at its own level, over or merged (law 1 (2); its worked example *over the band*), a road deck down before it (law 1 (3); its worked example *down before the wall*); a wall laid after it — a village palisade among them — by law 1 (2)–(11) (its worked example *beneath*). *Rung:* leave out and report (a raised way §2.7's laws give no lawful course, at generation; at an epoch it waits, V06 §3.19 (5); a wall laid after it with no lawful shape taking law 2 (c) on its path — F-WALL's raised-way rung at generation and a regeneration, §5.2, F-V-RAISED at a village, V07 §3.13, `walls.waited` at an epoch, V06 §2.10); simpler shape (declared, bent: `bend.raised.wall`, `bend.wall.aqueductArch`), else refused (`refuse.raised.meeting`; §2.7's laws, law 2 (c); its worked example the lock sentence's (G3)) | none on a `wall` run or in a wall strip. *Rung:* — (defined) | none on a wall strip. *Rung:* — (defined) | the trace stays inside the frame (S3's lattice; a frame arc inset by the outer wall strip, §4.2 S3 (6)). *Rung:* — (defined) |
| bridge | passes over its way without a junction at `raisedWays.structure.clearanceCm`; no support on its deck. *Rung:* — (defined) | a bridge's approach meets a retaining wall as a ramp by `primary`'s crossing row; `bridge`, `pier`, `quay` and `ford` ways never cross one. *Rung:* repair locally (the step re-cut, V11 §3.24.5) → leave out and report (not levelled there) | by the bridge row; a mid-span landmark slot on a span ≥ the `bridgeMid` minimum. *Rung:* — (defined) | a bridge's deck lies inside the frame (its site's two ends do). *Rung:* — (defined) |
| square or reservation | no support on it; spans over it with the clearance. *Rung:* — (defined) | the reservation levels itself (S11); no district-edge wall on a `reserve` run. *Rung:* — (defined) | a deck plot fronts its deck way, never a square. *Rung:* — (defined) | inside the frame by S3's siting. *Rung:* — (defined) |
| hinterland | spans over hinterland land-use faces stay open (reason `country`) at every rung (J-C4; §2.7's span rule). *Rung:* — (defined) | a district-edge wall may stand on a `field` run inside the district; fields are never levelled. *Rung:* — (defined) | a bridge outside the perimeter offers deck plots owned as V01 §3.17.6 states; its `bridgeMid` fort slot on a through route. *Rung:* — (defined) | the hinterland's faces end at the ring. *Rung:* — (defined) |
| oasis | no support in its water or on its grove; an aqueduct may take its spring as a source. *Rung:* — (defined) | none on its water run; its gardens are not levelled. *Rung:* — (defined) | a way across it by a built bridge offers deck plots by the bridge row, else none. *Rung:* — (defined) | sited inside the frame's middle two thirds. *Rung:* — (defined) |
| plots and buildings (S8–S11) | the under-deck strip and its pier footprints are S8's holes: no block interior, plot or footprint in them, with or without stage 2 (§4.6). *Rung:* — (defined) | a levelled unit's edge against unlevelled ground takes one wall above `stepMinCm`; a step above `stepMaxCm` takes terraces or is not levelled (§4.7 *Levelling*). *Rung:* simpler shape → report | a deck plot's building stands within the deck budget; removing or ruining the deck ruins what stands on it by least disruption. *Rung:* — (defined) | every plot and footprint stays inside the frame; the hinterland's outside plots end at the ring. *Rung:* — (defined) |

**Named fixtures beside each cell's own** (B-EDGE): a cliff primitive across a district and two plots at a cliff's top and
foot (the cliff × retaining-wall cell); a cliff-headland coast with the harbour-wall rows on (the cliff × deck-plot cell); a
CITY viaduct at M3a with stage 2 unregistered — 0 plots and 0 footprints in its strip (the plots × raised-way cell).
=== END ===
