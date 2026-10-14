# The hardening phase's design rulings — RQ1 … RQ7 (lane `session/rulings-hardening-1`, 2026-10-14)

A Fable 5.1 ruling seat under the owner's delegation (J238 "get M0 right": M0 is the bedrock; J237 the M0 hardening phase; J264 zero refusals of
lawful input; J290 / N-58 one verdict per class), opened by the session as J356 says. Seven questions the hardening inventory
(`checks/hardening-inventory.md` §5 Q4 – Q7, Q9, Q10) and the refusal census (`checks/refusal-census.md` §6 Q1, Q3) left to a reading of the design.
One ruling each: the sentence, the design text it rests on, the reasoning, the code consequence (owning item, fix shape, pin), the design-doc
amendment text where the design must say more (for the session's amendments round, J355 Q3), the declared shift, and the N-61 row text (observation |
handling, in `M0-spec-notes.md`'s voice). §8 holds what the design did not settle. Not re-opened (J356): R-30 stays notBuilt #1 'M1'; R-15 and D-03
are (c); the inventory's Q8 (a seed per kerb component) is OWNER-GATED beside Q60 / N-60 (b).

## §0 The tree, the machine, the sources, the probes

* The tree: `.git/HEAD` → `refs/heads/main` = `2daa48abbb819c7620899daa683c8ff33bbae144`, read as files (no git command); 2026-10-14, machine
  `linux:Intel(R) Xeon(R) Processor @ 2.80GHz:4cpu:16gib`, Node v24.12.0; `corepack pnpm install --frozen-lockfile --offline` 0 in the mirror. Nothing
  under `plat/` but this file, `CLEAN-ROOM.md` (row L-0527) and the landed record was written; `docs/lane-events.log` carries the CHECKPOINT and
  LANDED lines.
* Read (the full list is CLEAN-ROOM row L-0527): PROGRESS J237, J238, J258, J264, J290, J318, J335, J348, J355, J356; N-37, N-40 – N-42, N-45, N-52,
  N-55, N-57 – N-59 (N-60 absent); the inventory §3, §5; the census R-15, R-30, R-42, D-01, D-03, §3, §4, §6; C-0104, C-0168, C-0205, C-0276, C-0283,
  C-0290, C-0301, C-0302, C-0342; the notes rows each RQ names; the queue rows Q18, Q22, Q60, Q63, Q67, Q68, L21; M0.md §2.2, §3; `workLimits.json`;
  `summaries/M0-k-04.json`'s skeleton work. `docs/ARCHITECTURE.md`: §3.6, §3.7, §3.8, §3.10, §3.11, §4.4, §12.4, §13.1 and §2.2 rule 3 whole; §3.4,
  §4.3, §4.8, §5.1 (5), §7.1, §13.2 by grep and the paragraphs found. Code read, never edited: `skeleton/{prepare,engine,skeleton}.ts`,
  `insert/{insertChain,snapRound,stretch}.ts`, `tx/{tx,state}.ts` (`LINEAR_PARTS`, `roleProblems`, `openTx`), `invariants/batch.ts`,
  `facade/kernel.ts`, `layout/src/enceinte/strips.ts`, `testkit/src/edge/{ep01,plant,kinds}.ts`, `testkit/src/invariants/primitives.ts`,
  `tables/test/workLimits/table.test.ts`, `kernel/test/skeleton/{spur,golden}.test.ts`, `kernel/test/arr/booleans-buffers/booleans.test.ts`, the site
  and skeleton bench runners.
* Probes, all in an isolated `cp -a` mirror of `plat/` under the scratchpad (0 links back into the tree; removed after), one vitest/tsx process at a
  time, quoted below where they bear: **P1** (RQ1) `kernel/test/zz-probe/rq1.test.ts` — the seven-segment ring of C-0205 (3) inserted as seven
  two-point mandatory chains in one L0 transaction (`tx(p, spec(0), …)`, a 100 m frame first), once under the overlay's `invisible` role, once under
  `way`; **P2** (RQ3) `kernel/test/zz-probe/rq3.test.ts` — a closed `wall` ring (`enceinte:9`, 8 vertices, mandatory, L1, in `framed(20000)`)
  inserted, then given again: identical in a later batch (A), identical in the same batch (B, the edge suite's plant shape), every point jittered
  (+15, −12) = 19.2 cm (C) and (+22, +20) = 29.7 cm (D), identical after the first copy had crossed a `way` (E), jittered 19.2 cm after it (F); **P3**
  (RQ7) `bench/probe/rq7-d01.ts` — e-06's relief-60 fixture derived at CITY, default config, seeds 1 – 3 (`deriveSpike`; 320 s, 80 s, 135 s a seed;
  the run's 580 s cap ended it there), `skeleton(rings, 'spine')` over every district and water face (`spikeFaces`), each downgrade's cause and, for a
  `sharpCorner`, the corner's angle, arm lengths and tip width on the input ring. Seeds and outputs are quoted in §1, §3, §7.

## §1 RQ1 — a chain that retraces an edge (M0-a-05 N-8; C-0205 (3); inventory Q4)

**Ruling.** A chain's committed rows never retrace an edge: a route that would re-enter a vertex already on the chain's path is cut back to that
vertex (the out-and-back spur dropped) before it is judged and committed — UNLAWFUL for chains, repaired deterministically by the router; "lawful as
drawn" is refused.

**Design text.** §3.10 *role consistency*: "every role the registry declares linear (`way`, `wall`, `shore`, `tunnel` …) forms, per entity, the
connected simple chains or rings the entity declares" (hard, batch-local). §3.6 step 1: "A chain that touches or crosses itself is split into simple
runs"; §3.11 *degenerate geometry*: "a self-touching or self-crossing chain is split into simple runs". §3.6 *The placement rule*: "the incoming
vertex moves onto the nearer endpoint of the edge … and the new segments re-enter step 3; each such re-route lands on an existing vertex, so the loop
ends". §13.1: `remove(insert(x)) ≡ id` on the topology.

**Reasoning.** A retrace A–P–Q–P–R–B gives the chain's row set a degree-3 vertex (P) and a dead end (Q): for every registry-linear role §3.10 already
refuses it at commit. **P1 (CONFIRMED, mirror):** under `invisible` the batch COMMITS with s6's degrees `P 3, Q 1` (N-8's retrace), `allProblems []`;
under `way` it is REFUSED `E_INVARIANT (way, way:s6) branches: a linear role forms simple chains or rings (§3.10 role consistency)`. So on a `way`,
`wall`, `tunnel` … chain the router's retrace is a refusal of LAWFUL input of our own making (J264 (2)), and on a non-linear role (`kerb`, `setback`,
the scratch role) it commits a row set that is not a simple run, which §3.6 step 1 and §3.11 say a chain never has. N-41 (3) ("a row that traverses an
edge out and back is lawful") ruled the winding WALK's reading (M0-a-08's robustness), not the chain's right to commit it (N-8: unruled); it stays as
the walk's defence in depth. The repair is a function of the arena and the input (the router is), so the same chain gives the same simplified chain on
replay; the retrace adds no edge (N-8), so the cut moves nothing and only removes the chain's row from the spur edge.

**Code consequence.** M0-a-05, its hardening round (inventory §3 item 9; census §4 order 1). Shape: in `snapRound` / `routeOne`, every reading
included — when a landing or contact would put the segment's route through a vertex already on the chain's committed path (`onPath`; C-0177 (7)'s
exclusion widened from "no new edge onto it" to "no re-entry"), the path is truncated to that vertex's first visit and routing continues from it
toward the segment's end; the whole route is still judged by §3.10's clearance and the fidelity bound before commit; W_PLACED stays reported for the
endpoint landing. Pins: the seven-chain fixture under a `way` key commits (no branch; s6's rows the simple path A–P–R–B; P–Q carries s4 alone), and
under the scratch role the same; C-0205 (1)'s pin unchanged (exactly one W_PLACED at (−48450, 45728); every vertex within √2 · attractCm); a
`dissolvableProblems`/role oracle after every B-FUZZ commit: no linear key branches and no chain's row set has a dead-end interior vertex; B-FUZZ at
10⁴ on the three properties, the refusal census not rising (J264 (5)).

**Design-doc amendment (§3.6, after step 4's text).** "A route never re-enters a vertex already on the chain's path: where a landing or an attraction
would lead the segment back through such a vertex, the path is cut back to that vertex and routed on from it, so every committed run is a simple path
or ring (§3.10's role consistency; §3.11). The cut is a function of the arena and the input and moves nothing."

**Declared shift.** Every chain the endpoint route retraced loses its row on the spur edge (no geometry moves); counted by the round on B-FUZZ's
registers. `test/arr/booleans-buffers/booleans.test.ts` 'a retraced spur on a segment row nets nothing' (M0-a-08's; N-41 (3)) loses its precondition
(`spur ≥ 0`): M0-a-05's round reports it, M0-a-08's hardening round re-states it as a hand-built overlay row (the walk's robustness kept) or as the
control that no spur exists.

**N-61 (1).** Observation: a chain's committed rows may retrace an edge (A–P–Q–P–R–B, N-8); on a linear role §3.10 refuses the batch `branches` (P1),
on a non-linear role a non-simple run commits. Handling: UNLAWFUL for chains — the router cuts a route back to the vertex it would re-enter
(deterministic); M0-a-05's hardening round builds and pins it; N-41 (3)'s fixture re-stated by M0-a-08; §3.6 amended as §1 says.

## §2 RQ2 — the coincident fold-back vertex (M0-a-05 N-23; C-0302 (3); inventory Q5)

**Ruling.** The vertex is a split of the other chain's run (the flag kept, C-0302 (3)'s two-key rule stands) AND a shape vertex of the coincident
chain, carried as a vertex row of that chain's key — a kernel-internal vertex role (`shape`, entity the chain's key), written at the landing and
stripped with the chain — so §2.2 rule 3's dissolution ("no vertex role") keeps it while the chain lives and dissolves it, restoring the other chain's
edge exactly, when the chain goes.

**Design text.** §2.2 rule 3: "**Dissolution.** … dissolve each vertex left with degree 2 that carries the `split` flag, no vertex role and no pin,
and whose two remaining edges carry identical role sets and one birth level"; "The `split` flag marks a vertex whose dissolution restores exactly the
edge it was created on … A chain's own shape vertices never carry it"; "The flag is the whole guard". §3.11: "a collinear overlap is one shared
stretch with merged roles"; *undo*: "undo and redo re-run the log's events through the same transactions". §13.1: `remove(insert(x)) ≡ id` on the
topology; "roles preserved on coincident chains (a sliver between a spine and a shore keeps both)".

**Reasoning.** N-23's vertex v = (2431, 2890) is both A's split (dissolving it restores A's edge when C goes: remove(insert(C)) ≡ id) and C's own
point (it must survive a third chain's lifecycle: remove(insert(x)) ≡ id). One flag cannot carry both (C-0302 (3), N-23), and the rows cannot tell C's
shape vertex from a vertex a removed T-junction left on the shared run (both: degree 2, identical rows {A, C}). The design's predicate has the free
term: "no vertex role". A vertex row naming C's key is the per-key owner N-23 names, persisted with the arena (§3.9: a load before the removal must
still know it), stripped by C's removal like C's knot rows (§3.4 `removeEdges`, `rekey`). The class is REACHED: the quay-on-shore's own vertices along
the shore (§13.1's coincident typed chains; the register's `pass4`, B-FUZZ constructive seed 1 path 197, C-0302 (3)) are the same two-key vertices —
an S8 lane ending on one and removed by a reroll would today dissolve the quay's own vertex. RQ3 needs none of this: a chain given again lands on its
OWN key's vertices (§3), N-55 (2)'s one-key case.

**Code consequence.** M0-a-05's hardening round (with RQ1 and RQ3). Shape: `applyLanding`/`ownShapeVertex` — a landing that splits a run carrying
another key's rows and is the chain's own input point (or its stretch end) writes `(shape, <chain key>)` on the vertex and keeps VERTEX_SPLIT; the
registry gains the vertex role `shape` (kernel-internal, indexed by nothing, never a knot; M0-a-01/a-02's `registry` file — the one-line row rides
their hardening round or a choices row assigns it to a-05's); `removeEdges`/`clearFiner` strip a key's `shape` rows with its edge rows (M0-a-06's
`tx/` — pinned there). Pins: register kind `coincident-foldback` (N-23's P3: A, then C folding back onto the shared edge, then x attached at v and
removed — print, chunk refs and level digests equal to before x; then C removed — A restored exactly, 7 → 6 vertices only then); the pass4
wall-on-bank case with a lane ended on a wall vertex and removed (the vertex survives; its removal with the wall restores the bank);
`dissolvableProblems` extended: a flagged degree-2 vertex between identical rows of two or more keys carrying no `shape` row is a problem.

**Design-doc amendment (§2.2 rule 3, after "A chain's own shape vertices never carry it.").** "A vertex that is both — a chain's own point landed on
another chain's run it shares on both sides (§3.11's collinear overlap) — keeps the flag and carries a vertex row `(shape, chain)` that the chain's
removal strips: the row holds the vertex while the chain lives (the dissolution rule's 'no vertex role'), and its removal lets the flag restore the
other chain's edge exactly."

**Declared shift.** Arenas holding such vertices gain a vertex row: the content print, `encodeArena` and digests over the register's `pass4` case and
B-FUZZ constructive seed 1 shift once (outcomes, placements and counts unchanged); the lifecycle suite's exact-restoration pins re-recorded with the
cause.

**N-61 (2).** Observation: the coincident fold-back vertex (two keys) is dissolved by a later chain's removal; a flag cannot carry both identities and
the rows cannot tell a shape vertex from a T-junction's remnant (N-23). Handling: the per-key owner as a kernel-internal vertex row `(shape, chain)`
written at a two-key own-point landing and stripped with the chain; §2.2 rule 3's predicate unchanged; register kind `coincident-foldback`; M0-a-05's
hardening round, the registry row assigned by the session.

## §3 RQ3 — is a coincident doubled trace lawful input? (census R-42, §6 Q1; x-06 c2-4; inventory Q6; Q68)

**Ruling.** LAWFUL. A chain given again under a key that already carries a run is the same chain: the kernel absorbs it whole as one shared stretch —
each point lands on the run's vertex it is the image of, each segment follows the run — and never branches the key; the five seeds are MAKE-IT-SUCCEED
(M0-a-05), the census carries 40 lawful, not 35.

**Design text.** §3.11 *degenerate geometry*: "coincident points are one vertex (attraction); a collinear overlap is one shared stretch with merged
roles". §3.6 *Roles on shared stretches*: "When a chain shares an edge — by stretch attraction or an exact collinear overlap — the edge's role set
gains the chain's `(role, entity, level)` row: never a duplicate edge, never an overwrite." §3.6: "A chain is inserted run by run, and the part
already inserted counts as existing geometry for its later parts"; *Existing geometry wins*: "An incoming chain vertex moves at most √2 · `attractCm`
≈ 36.8 cm". §13.1: "coincident typed chains — a wall on a bank, a quay on a shore" among the constructive (lawful) cases; "roles preserved on
coincident chains". §3.10 role consistency: one `wall` key is one simple ring. §4.4 S5d: "S5a re-traces only the affected arc between its pinned
gates" — the pipeline's own near-coincident re-insertion; §7.1: a stroke drawn along a standing way.

**Reasoning.** c2-4's reading ("unlawful by the kernel's own answer") is circular, as the census notes. **P2 (CONFIRMED, mirror):** A identical, later
batch — COMMITTED, `W_STRETCH_SHARED×8`, placed 8, edges 12 → 12; B identical, same batch — COMMITTED, the second `W_STRETCH_SHARED×8`; C jittered
19.2 cm — COMMITTED, `W_ATTRACTED×8, W_STRETCH_SHARED×8`, 12 → 12; E identical after a `way` crossing — COMMITTED, `W_STRETCH_SHARED×10,
W_ATTRACTED×2`, 19 → 19; F jittered 19.2 cm after it — COMMITTED, 19 → 19; **D jittered 29.7 cm (attractCm 26 < d < √2 · attractCm 36.8) — the insert
taken (`W_ATTRACTED×11, W_STRETCH_SHARED×10`), the batch REFUSED at commit `(wall, enceinte:9) branches`.** The kernel already absorbs an exact or ≤
attractCm copy; the five seeds are D's class: the first copy's vertices stand 26 – 36.8 cm from the input (the design's own attraction and placement
moved them, §3.6), so the identical input's points fall outside step 2's vertex band, split the run before a corner and the next segment chords the
corner — a branch the key cannot carry. Nothing in the input is degenerate: the same lawful ring, twice. The design says what a second copy of a key
is (one stretch, merged roles); the shortfall is M0-a-05's.

**Code consequence.** M0-a-05's hardening round (census §4 order 1, with R-04 – R-06). Required behaviour: for a chain whose `(role, entity)` key
already carries a run at level ≤ n, (i) a point within √2 · `attractCm` of a vertex of that run lands on it (the own-key band is the design's bound on
how far the first insertion may have moved it; for every other key the band stays `attractCm`), (ii) two consecutive landings on the run are joined by
walking the run's pieces between them (N-37's run walk), never by a chord, (iii) a point beyond (i) but within `attractCm` of the own run splits it as
the chain's own vertex (N-55 (2) `ownShapeVertex`; a chain re-given with an extra point, lawful as `lawfulPlant` reads it), and (iv) a point beyond
`attractCm` of the own run is another chain under the same key — §3.10's `branches` / parts refusal stands, typed. `insertChain` returns `ok` for the
copy: `placed` names the run's vertices, `W_STRETCH_SHARED` per shared piece, `W_ATTRACTED` per moved point, no new edge, the role rows unchanged (a
set); its removal is the key's removal (one chain). Pins: P2's six cases (D committing with edges unchanged and no branch; a 29.7 cm copy at a 90°
corner as the fixture), the census's five seeds (1658509524, 3650193777, 3114039644, 2262416935, 57196073) through the edge suite committing — the
S5a/coincident cell's pin flips from refused-safe to ABSORBED (x-06's `repins.test.ts`, C-0342 (4): a declared shift of the suite's standing states,
census §6 Q7), `lawfulPlant`'s `kernelTook` clause retired for S5a (c2-4), M0-c-02's strips re-run on those seeds.

**Design-doc amendment (§3.6, *Roles on shared stretches*, appended).** "A chain given again under a key that already carries a run — the same trace
re-inserted, an arc re-traced between its gates, a stroke along a standing way — is that run: its points land on the run's vertices within √2 ·
`attractCm` (the bound its first insertion moved them by), its segments follow the run between two landings, and it adds no vertex, no edge and no
row; a point farther than `attractCm` from the run is another chain under the key and is refused by role consistency (§3.10)."

**Declared shift.** None on committed geometry (the absorbed copy adds nothing); the edge suite's S5a/coincident cell 5 refused-safe → 0 (ABSORBED),
census 35 → 40 lawful, then 40 → 35 at the phase-end re-run when the round lands.

**N-61 (3).** Observation: R-42 — the doubled wall trace is refused `(wall, enceinte:2) branches` on 5 of 1 000 seeds; P2 shows an identical or ≤
attractCm copy absorbed and a 26 – 36.8 cm copy branching. Handling: LAWFUL; the own-key landing band √2 · attractCm and the run walk between landings
(M0-a-05's hardening round); the S5a/coincident pin flips to ABSORBED; census 40; Q68 → M0-a-05; §3.6 amended as §3 says.

## §4 RQ4 — the "no open frame of this kernel" guard (M0-a-16 note 11; N-55 (5) (1) vs C-0290; inventory Q7)

**Ruling.** STRIKE N-55 (5) (1)'s clause by a choices row: an overlay is a transaction whichever kernel opened it, so the guard is "an open
transaction", not "a frame of this kernel"; M0-a-16's round builds the stronger open-set test (`isOpenTx`: minted by `tx` ∧ not closed), which also
refuses the fabricated shell of note 12 — no rounds for M0-k-04 or M0-d-08.

**Design text.** §3.3 (the scratch overlay; a batch commits or rejects atomically; an overlay outliving its batch is a programming error); §3.11: "a
programming error throws"; §3.4 *Arenas, keys and services*: every writer takes the overlay (`insertChain(tx, …)`), the arena from the transaction's
`key`; §14's `Kernel.tx(spec, fn)` hands `fn` the overlay. N-45 (a): a silently wrong committed state is a blocker; N-53 (3): an assertion class.

**Reasoning.** The fail-safety N-55 (5) wanted is "no write outside a transaction with the version unchanged". C-0290 and note 11 MEASURED that an
open overlay, however opened, writes inside its transaction (the version moves; the batch commits or rolls back whole); the ruled line would break two
committed lawful paths (testkit `writer()`, d-08 `runBatch`) and a-16's own `owner()` test for hygiene the design nowhere asks (nothing in §3.3 / §3.4
/ §14 binds a writer to the kernel that opened the overlay). The remaining escape is note 12: `{ ...insertTx(p, 1), open: true }` type-checks as an
`Overlay` and writes with no transaction ("RETURNED ok=true | v 0->0") — N-45 (a)'s class, which `tx/state.ts`'s `open` WeakSet already distinguishes
(`openTx`). Note 13 (a value returned through a kernel that did not open the batch keeps its in-batch stamp; debug-only, fail-loud) is the one
consequence of cross-kernel writing: pinned, not forbidden.

**Code consequence.** M0-a-16's hardening round (inventory §3 item 16, "after the §5 ruling"): `writer()` checks `isOpenTx(o)` (exported from
`tx/state.ts` — `open.has(o) && !o.closed`; the one-line export rides M0-a-06's hardening round or a choices row assigns it) in place of `o.closed ===
true`; pins: the fabricated shell refused (debug on and off), C-0290's closed-overlay pins kept, the two acceptance pins and `owner()` kept green,
note 13's stamp either routed through the overlay's own frame (`batchValue` by the transaction, not the writing kernel's frame list) or pinned as the
debug assertion it is. Choices row: N-55 (5) (1)'s "this kernel's open frames" read as "an open transaction" (C-0290's deviation accepted as the
design; N-55's text stands as history with the row as its correction, N-59's precedent).

**Design-doc amendment.** None needed (§3.3 / §3.11 already say an overlay past its batch is a programming error); the choices row records the
reading.

**Declared shift.** None (fail-loud paths only).

**N-61 (4).** Observation: N-55 (5) (1)'s ruled guard was never built; C-0290's closed-overlay guard was measured to be the fail-safety, the ruled
line breaking three lawful cross-kernel paths; note 12's fabricated overlay still writes outside any transaction. Handling: the clause STRUCK by a
choices row; M0-a-16's round checks `isOpenTx` (tx/state's open set ∧ not closed) in every build, pins the shell refusal and note 13's stamp; no
M0-k-04 / M0-d-08 rounds.

## §5 RQ5 — strip faces over an arterial's corridor (M0-c-02 N-26; inventory Q9)

**Ruling.** The defect is the STRIP's: a wall-strip face never overlaps a way's corridor; the strip region is the trace's buffer less the corridor of
every way whose corridor meets it, wherever it meets it (not only the gate's way near the gate), membership decided by area; the route is not at
fault.

**Design text.** §4.8 *Wall strips*: "The lines carry the structural `setback` role, run from gate to gate, stop at each gate's plaza claim or
arterial corridor, and close on the secondaries S5c stopped at the setback band, so each strip is a face of its own … Both faces are unbuildable".
§3.7: "a strip ends at the corridor of the way through each gate, so every gate passage stays open by construction"; §4.8: "Gate passages stay open by
construction: a wall strip ends at the corridor of the way through each gate, so the band and gatehouse parts S10 builds never meet that corridor".
§4.4 S5d: "the corridor reserve of its spines"; S5c *Legality* treats "shores, wall setback bands, reservations and the stage boundary" alike. J318
(owner-delegated, accepted J348 (1)): a corridor is a reservation; "a block never overlaps a corridor it does not bound" (N-45 (a)). §4.3 *Routes* and
*Where it may not go*: nothing bars an arterial from running beside the wall; §4.4 S5a *Pull and pin* moves the TRACE to the arterials' crossings,
never the arterial.

**Reasoning.** §4.8's stop is "arterial corridor" without "near the gate"; the gate sentence is the case the design illustrates (the passage), not a
limit. A corridor is a reservation on every face kind — blocks (J318), strips (§4.8's stop), proposals (S5c). N-26's 42 seeds (41 of stage 1's strips
10 – 47 m from the gate where the arterial bends along the wall inside the strip's width; 1 of stage 2's inner strip 91 m in) cover corridor points
because `layStrips` judges a face by its VERTICES (`whyNot`: a gate vertex, or one deeper than `CORRIDOR_SLACK_CM` inside a corridor) — a corridor
crossing the face between two outside vertices is invisible to it (N-26's own diagnosis). The arterial was routed first (§4.3) and the trace pulled to
its pin (§4.4); nothing in the design asks the route to keep clear of a wall drawn after it.

**Code consequence.** M0-c-02's hardening round (inventory §3 item 29; census §4 order 2, with R-28 – R-32). Shape: `layStrips` — (i) the stop set is
every way whose corridor (its centreline buffered by its half-width, flat ends) meets the strip region `buffer(trace, width) ∖ …`, along the way's
whole length inside the region, not the gate's neighbourhood alone; the setback lines are cut by those corridor rings and the strip's boundary follows
the corridor's edge where the corridor runs inside the strip's width (the ground between band and corridor, and any ground beyond the corridor still
within the width, are strip faces; the corridor itself is the way's); (ii) membership by area: a face is a strip's when it lies within the strip's
width of the trace and its interior meets no corridor — an exact test on the face ring against the corridor rings (crossing or containment), with
`CORRIDOR_SLACK_CM` only at a vertex on the corridor's edge (N-43 B), the vertex clause kept as the first check. Pins: N-26's P4 probe (corridor
points at 25 cm × five offsets, deeper than the slack + 5 cm, located on L1) asserting 0 covered points over the 1 000-seed family; seeds 1842059696,
2537277803, 889845538 (stage 1) and 1671642301 (stage 2) as fixtures; N-27/N-28's typing clauses unchanged; the edge suite's S5 cells re-run.

**Design-doc amendment (§4.8 *Wall strips*, the stop sentence).** "… run from gate to gate, stop at each gate's plaza claim and at the corridor of
every way they meet — a gate's way at its passage, and any way whose corridor runs inside the strip's width, along its whole length there — so no
strip face overlaps a corridor (a corridor is a reservation, §3.7, §4.6), and close on the secondaries S5c stopped at the setback band …". §3.7's gate
sentence gains "(and at every other corridor a strip meets, §4.8)".

**Declared shift.** Strip faces on the 42 of 1 000 family seeds (and the fixtures' standing states where a strip now ends at a corridor): the
owner-only and face-boundary changes counted per seed by the round, as C-0311 (4) counted its 124; no block, way or trace geometry moves.

**N-61 (5).** Observation: 42 of 1 000 seeds commit a strip face over an arterial's corridor away from the gate; the vertex clause cannot see a
corridor crossing between two outside vertices (N-26). Handling: the strip's defect — the stop set is every way's corridor meeting the strip region
along its whole length, membership by area; M0-c-02's hardening round; §4.8's stop sentence amended; the route unchanged.

## §6 RQ6 — the `skeleton.events` law vs M0-f-03b's measured coefficient (M0-f-03a N-6; inventory Q10)

**Ruling.** Option (a): the law 4 · (n + r) + 64 is a FLOOR at every version — M0-f-03b writes the `skeleton.events` row as max(measured p999 × 1.5,
the law) = perUnit 8, floor 64, provenance the spike's with a note naming the law, the measured 1.73 recorded in its summary; the any-version test
stays; no version gate, no amendment of the law.

**Design text.** §3.8 *Numeric contract*: "The event queue runs under a work limit of 4 · (n + r) + 64 events for n vertices and r reflex vertices — a
correct run needs at most about n + r — and exceeding it is `E_WORK_LIMIT`". §5.1 (5): "limit = floor + perUnit × count(unit, scope)";
"*Coefficients:* each is the 99.9th percentile of the measured work per unit … × 1.5". M0.md §2.2: "`skeleton.events` (`vertices`; §3.8's own law 4(n
+ r) + 64 stands as its floor)". C-0168 (5) / `skeleton.ts`: `const floor = skeletonEventLimit(n, r); const limit = asked > floor ? asked : floor` —
the kernel never runs below the law.

**Reasoning.** The design states two things about this counter: §5.1 (5)'s measured coefficient (the OTHER counters' rule) and §3.8's own law, which
M0.md §2.2 makes the row's floor. The measured 1.73 per vertex (k-04 p999 1.1538 × 1.5) is below the law at every n > 0; a correct run needs "about n
+ r" events, so a 1.73 n limit would refuse lawful inputs with r → n (J264) — option (c) amends the design into a defect; option (b) gates the test on
a version, but the floor is the design's at every version. The kernel already applies the law as its floor (C-0168 (5)): a row below it is dead text
the test rightly refuses; max(measured, law) makes the table say what the kernel does. General form: a counter whose design law names a floor (today
`skeleton.events`; the fixed `warp.halvings` is skipped, C-0301 (3)) is written as max(measured, law).

**Code consequence.** The session (M0-f-03b's brief and `M0-work.json` twin entry, before f-03b launches — inventory §3 item 51's "before M0-f-03b
lands"): the brief says the `skeleton.events` row is perUnit max(p999 × 1.5, 8), floor max(…, 64), provenance `M0 spike ⟨date⟩`, `note` "floored by
§3.8's law 4(n + r) + 64 (M0.md §2.2); measured p999 × 1.5 = ⟨value⟩"; the measured coefficient and the law's in `summaries/M0-f-03b.json`; a choices
row records the reading. M0-f-03a: nothing (`table.test.ts`'s `skeletonLaw` stays; its mutants D5/D5f already pin the outcome, N-6). The hit-rate
report marks the floored row.

**Design-doc amendment (§5.1 (5), *Coefficients*, appended).** "A counter whose law the design states as a floor (the skeleton's 4 · (n + r) + 64,
§3.8) is written as the larger of the measured coefficient and that law."

**Declared shift.** None — the limit in force is the law today and after the hand-over.

**N-61 (6).** Observation: f-03b's measured `skeleton.events` coefficient (1.73 per vertex) undercuts §3.8's law, which `table.test.ts` holds at every
version and the kernel applies as its floor (C-0168 (5)). Handling: option (a) — the row is max(measured, law) = (8, 64) with the measured value
recorded; the test stays; the twin and f-03b's brief amended by the session before the launch (N-4, N-5's wording with it).

## §7 RQ7 — the skeleton's 5° contract on lawful faces (census D-01, §6 Q3; Q67; a-11 N-1; N-52 (3))

**Ruling.** Two parts. (A) The pre-clean's CRITERION: a vertex is an inexact spur tip when the ring folds back at it (dot > 0) and the shorter arm's
far vertex lies within `attractCm` of the longer arm's segment (its foot strictly inside it); every such tip on the ring is removed at once per round,
rounds to a fixpoint with the exact-spur and collinear passes, before orientation and the refusals — deterministic and order-free by construction; the
`roof` use included (a feature narrower than the lattice's own coincidence band is no shape). (B) The MAKE-IT-SUCCEED for the measured residual —
genuine 1.3° – 4.6° corners with tips 33 – 87 cm wide, which no attraction-sized clean may touch — is the engine's: for the `spine` and `regions` uses
the contract's angle is the engine's own fold threshold (1°, C-0168 (2)) instead of 5°, the validator the net, the downgrade kept behind it; for
`roof` the 5° bound and "no cleaning step ever reshapes a roof" stand (GEO-8).

**Design text.** §3.8 *Numeric contract*: "Input is pre-cleaned by merging collinear vertices; holes are supported. After the clean the input must
have no corner sharper than 5° on either side (an interior angle below 5° or above 355°) and no hole touching the outer ring or another hole …: a ring
set that breaks either takes its reader's downgrade without running, so no cleaning step ever reshapes a roof." *Post-condition validator*: planarity,
one face per edge monotone, heights within 1 cm, connectivity — "Never a crash, never a roof line outside its footprint and never unvalidated output".
§3.10: "face corners ≥ `minFaceAngle` — soft for mandatory chains (`W_ACUTE_CORNER`)" (a sub-5° corner is lawful arrangement geometry); clearance: no
two vertices closer than `minEdge` unless joined. §3.6: "coincident points are one vertex" within `attractCm`; C-0168 (2): k = tan(θ/2) "no
cancellation near antiparallel", "a vertex between exactly antiparallel lines — or one that would be an exterior crack (reflex within 1° of 360°) — is
a fold". §3.11: "a corner sharper than 5°, takes its reader's downgrade (§3.8); tier 4 for a skeleton reader". N-52 (3), C-0276 (2): only exact
equality is a spur today.

**Reasoning.** **P3 (CONFIRMED, mirror; relief-60 at CITY, default, seeds 1 – 3, `spine`):** district faces 0 + 62 + 70, water 1 + 1 + 1; downgrades:
seed 2 — `sharpCorner` at (−76193, 13230) angle 1.782°, arms 14.7 / 17.2 m, tip width 45.7 cm, |p−q| 251 cm; at (−16917, −90749) 4.639°, arms 13.7 /
4.1 m, tip 33.1 cm, |p−q| 963 cm; seed 3 — `sharpCorner` ×7 at 3.725° (tip 86.5 cm), 3.532° (37.5), 2.033° (84.6), 1.728° (73.1), 1.307° (47.1, |p−q|
66.5 cm), 2.550° (54.0) and one reported at (68609, −18690) whose input-ring neighbours are straight (179.986°; the refused corner is the cleaned
ring's — a-11 reads it), plus one `degenerate` at (32770, −86089); every water face (3 of 3) a VALIDATOR failure `faces: face 0 is open at node 1` —
not the contract. So D-01's residual on district faces is NOT inexact spurs within `attractCm`: the tips are 33 – 87 cm wide with arms of metres, and
§3.10's clearance makes a sub-`attractCm` gap between unjoined vertices all but impossible (`minEdge` 25 < 26) — criterion (A) is the sound, harmless
completion of N-52 (3) (and closes a-11's N-1 order problem: all tips of a round go at once), but cannot reach D-01's count. The design makes a 1.3°
corner lawful (§3.10 soft); its skeleton is well-posed (the engine's k is built for near-antiparallel edges and already runs exact folds); the 5° gate
is a precaution of the roofs' exactness contract (GEO-8), whose reasons bind footprints, not faces read for a label spine or a block's regions. J264
(2) lets detect-and-refuse stand only where success needs unbuilt design; here the engine exists and the validator is the typed net the design
specifies. (A) on `roof` is no reshape in the design's own terms: §3.6 moves every incoming vertex up to √2 · `attractCm` and collapses a setback
below `minEdge` to zero.

**Code consequence.** M0-a-11's hardening round (inventory §3 item 14; census §4 order 7; Q67 with Q63). (A) `prepare.ts`: `dropInexactSpurs` — on the
current ring, mark every vertex v with neighbours p, q where (p−v)·(q−v) > 0 and, s the end of the shorter arm, l the other, s's foot on v–l lies
strictly inside the segment and |s − line(v, l)| ≤ `attractCm` (exact: |cross|² ≤ attractCm² · |l − v|²); remove all marked vertices in one pass;
`prepareRings`' fixpoint loop runs it with `dropSpurs` and `mergeCollinear` until no pass removes a vertex; a ring left below three vertices or no
area is `degenerate` as now. (B) `prepareRings(input, use)`: `sharpCorner`'s bound is `TAN_5_DEG` for `roof` and tan 1° for `spine` and `regions` (the
engine's fold threshold; a corner at or below it is a fold the engine already resolves — C-0168 (2)); below the bound the refusal and the reader's
downgrade stand. For a face the clean cannot make simple (`notSimple`, `holeContact`, `holeOutside`, `degenerate`) the result is the contract refusal
and the reader's downgrade, as today. Pins: (A) a 1 cm-inexact fold-back (spur.test.ts's `beside`/`short` cases) now skeletonises as the rectangle —
the pin FLIPS, re-recorded with the cause; the control moves to a fold-back of width 27 cm (> `attractCm`, refused for `roof`, run for `spine`); a
zigzag needle whose tips are mutually adjacent (all removed in one round); order-freedom: every rotation and reversal of every spur fixture gives the
same cleaned ring (N-1's asymmetric walk included); (B) P3's eight corners as fixtures run under `spine` and pass the validator (or are counted
downgrades — never a crash); the corpus bar re-measured per use and per cause on the relief fixtures (seeds 1 – 8 at CITY) and the fusion smoke's
district faces, the downgrade share reported before/after and never rising for `roof`. The water faces' validator failure and the `degenerate`
district ring are the round's two findings to diagnose (§8).

**Design-doc amendment (§3.8 *Numeric contract*, replacing "Input is pre-cleaned … reshapes a roof.").** "Input is pre-cleaned by merging collinear
vertices and by dropping spurs — exact zero-width spurs, and inexact ones whose shorter arm's end lies within `attractCm` of the longer arm (the
lattice's own coincidence band, §3.6): every tip of a round removed at once, to a fixpoint, so the clean is a function of the ring alone. After the
clean the input must have no hole touching the outer ring or another hole, and no corner sharper than the use's bound — 5° on either side for `roof`
(an interior angle below 5° or above 355°: a 1 cm edit never flips a ridge, GEO-8), 1° for `spine` and `regions` (the engine's fold threshold, below
which two edges are one direction): a ring set that breaks either takes its reader's downgrade without running, so no cleaning step reshapes a roof
beyond the lattice's coincidence."

**Declared shift.** `roof`: none on the corpus footprints (`golden.test.ts`'s six faces hold no inexact spur; the round re-records only if a pinned
face changes, with a choices row); `spine`/`regions`: every district or water face with a corner in [1°, 5°) now skeletonises instead of taking the
sampled medial axis — the relief fixtures' counts (8 of 132 district faces on seeds 2 – 3 here; e-06's summary re-recorded), the fusion smoke's 3 / 1
597 and 5 / 2 419 district downgrades re-measured by c-06's third continuation; spur.test.ts's inexact pins flip as above.

**N-61 (7).** Observation: D-01's residual district downgrades are genuine 1.3° – 4.6° corners with 33 – 87 cm tips (P3), not inexact spurs within
attractCm; every water face measured fails the validator's `faces` check instead. Handling: (A) the inexact-spur clean within attractCm, all tips at
once, to a fixpoint (order-free; N-1 closed with it); (B) the contract's angle 1° for `spine`/`regions`, 5° kept for `roof`; the downgrade the net;
M0-a-11's hardening round with Q63; §3.8 amended as §7 says; the water-face validator class and the `degenerate` ring routed to the same round.

## §8 Open points the design does not settle (with this seat's recommendation)

1. **RQ7 (B) widens a design constant** (§3.8's 5° for two uses to 1°). The design's text makes 5° use-independent; the reasoning for 5° (GEO-8) is
   the roofs'. Vetoable by the owner; the fallback that keeps the design as written is the census's (c) reading — the downgrade as the tier-4 outcome
   on these faces, D-01 then a REFUSE class with the sampled medial axis as the alternative. Recommendation: (B) as ruled, measured by the round
   before it is committed (the share of [1°, 5°) faces the validator rejects reported; if it is not ~0, the engine fix comes first).
2. **The water faces' validator failure** (`faces: face 0 is open at node 1`, 3 of 3 water faces at CITY relief-60 seeds 1 – 3) and the **`degenerate`
   district ring** (relief-60 seed 3, (32770, −86089)) are lawful-face downgrades outside the 5° question — Q63's kin (an engine/validator class).
   Recommendation: M0-a-11's round diagnoses both first (the water face: a river ring of hundreds of near-collinear chords; the engine's face walk
   opens at its first node), verdict (a).
3. **RQ2's registry row** touches M0-a-01/a-02's registry file; **RQ4's `isOpenTx` export** touches M0-a-06's `tx/state.ts`; **RQ3's pin flip**
   touches M0-x-06's `repins.test.ts` and `ep01.ts`; **RQ1's fixture** touches M0-a-08's `booleans.test.ts`. Recommendation: one choices row per touch
   assigning the line to the round that needs it (C-0104's form), or the owning item's hardening round takes the line with a cross-reference.
4. **RQ5's amendment reaches §3.7's gate sentence** ("a strip ends at the corridor of the way through each gate"): the amendments round (J355 Q3)
   carries J318's §3.7 sentence already; this rides with it.
5. **The P3 run covered 3 of 8 relief-60 seeds and no relief-3000 seed** (the 580 s cap). The classes are CONFIRMED on what ran; their SHARE over the
   corpus is PLAUSIBLE until a-11's round re-measures all 16 derivations (≈ 40 min here).
6. **N-41 (3)'s wording** ("a row that traverses an edge out and back is lawful") is superseded for chains by §1 and kept for the winding walk's
   reading; the amendments round should say so where §3.6's text lands.
