# Adversarial review of the RQ2 merged round's spec (M0-a-02 S4 → M0-a-06 S10 → M0-a-05 S15)

Reviewed 2026-11-11 against draft.md, rulings-provisional.md and the three spec JSON entries, on the built read-only
worktree /home/user/maps-scratch/gates-a11s6/plat (commit 55042d29; `git diff 55042d29 6f98b464 -- plat/packages` is
empty, so its code is the design head's). Nothing in the repository was edited; no build or suite was run. Every
executed claim below comes from a script kept in this folder (its log beside it), run with
`nice -n 10 corepack pnpm exec tsx --conditions=plat-source <script>` from the worktree.

Labels: **CONFIRMED** = executed, or the exact code read and quoted by file and symbol; **REASONED** = argued, not run.

Where a probe needed a `shape` row on today's code (the registry has none), it planted a **proxy**: `junction`, the
registry's non-indexed, non-knot vertex role, which carries exactly the flags `shape` will carry (`kind: vertex,
indexed: false, knot: false`). The proxy was planted inside a committed batch (lib.mts `plant`). It behaves like
`shape` everywhere except in the pin rule, which LINE 2 of leg 2 changes; no probe below reads the pin rule with it.

Scripts: `lib.mts` (helpers, both predicates), `p1-straight.mts`, `p2-cases.mts`, `p3-r10.mts`, `p4-q78.mts`,
`p5-q95.mts`, `p6-writers.mts`, `shape-count-pinned.mjs`, `shape-count-ruling2.mjs` (the session's counting probe,
extended). Logs: the same names, `.log`.

---------------------------------------------------------------------------------------------------------------------

## Verdict

**BIND WITH THESE CHANGES.** The predicate question resolves in ruling 2's favour (executed). The round's weak part is
leg 2's strip. It is specified writer by writer, and on two paths it leaves a `shape` row where its chain no longer
passes. One of those paths is the draft's own StretchRef rule, which contradicts rulings 2 and A. Ruling B's question
already has an answer, so a leg should not be sent to discover it. Several pins and mutants are mis-specified: G-LATE,
DUP and PIN-SHAPE2 cannot do what the spec says. All of these can be fixed in the spec before launch. The changes are
listed at the end.

---------------------------------------------------------------------------------------------------------------------

## Findings

| id | sev | what is wrong | evidence | minimal change |
|---|---|---|---|---|
| F1 | BLOCKER | Leg 2 LINE 1's StretchRef rule says the stretch's ends "are promoted ends of the remaining parts and keep theirs — `promoteEnds` clears their split flags", and it pins that (STRIP-ENDS mutant red). Both halves are wrong. `promoteEnds` touches only ends FINER than the chain (`if (… p.vertices.level[v] <= n) continue;`). At an end of the chain's own level, the flag is cleared by rule 3 (b)'s demotion instead, and the row stays. That leaves an orphan: the chain is now on one edge only. Ruling 2 says an end is never written. Ruling A's converse oracle reports exactly this row. The canonical form, a fresh insertion of the remaining part, has no row there. | CONFIRMED p6-writers.log. After the StretchRef removal v1 → (499, 2966), v1 is `split=false vrows=[junction/base:C] edges=[A] \| [A;C]`. A fresh insertion of the rest gives `v 2400,2891 L2 f4 []`. Code: tx/writers.ts `promoteEnds`. | Strip the entity's `shape` row at the stretch's ends too, wherever the entity no longer runs along both incident edges. Invert the pin: STRIP-ENDS becomes the required behaviour, and KEEP-ENDS is the mutant. Better still, replace the whole per-path rule with F2's single rule. |
| F2 | BLOCKER | The strip is listed path by path (whole chain, stretch interior, clearFiner, rekey, ruling 8's retype), and the paths it does not list leave wrong states. (i) The rekey CUT vertex keeps `(shape, from)` with `from` on one edge only: the rekey moves vertex rows "other than the cut vertices". (ii) `removeEdges(ChainRef)` of one role of an entity that has several edge rows strips by ENTITY, so `(shape, e)` goes while e's other role still passes. (iii) Ruling B, A removed while C lives. Today this DISSOLVES C's own point. With the row, the point survives, but its flag and row differ from C inserted alone. The answer is already known, so "report it" sends a leg out to discover something this review has measured. | (i) CONFIRMED p6 (rekey: v1 `vrows=[junction/base:C]`, edges `[A;K] \| [A;C]`). Code: writers.ts `retypeEdgesIn` `if (cutSet.has(v)) continue;`. (ii) REASONED from `removeEdgesIn` (strip keyed on handle `h`, the entity), the same pattern as `knotRowsOn`. No M0 pipeline inserts a multi-row same-entity chain: every layout `insertChain` call passes one row. (iii) CONFIRMED p1-straight.log. Today `remove A` → `v v6: dead` (C loses its point). With the proxy row, the arena differs from C alone (at C's placed points) by exactly `v 1800,2915 L2 f4 [29/base:C/2/0]` against `v 1800,2915 L2 f0 []`. | ONE maintenance step in tx/relevel.ts `rewriteRows` (M0-a-06's own file), run after the strips. For every vertex the batch touched that carries `(shape, e)`: keep the row iff e's rows lie on exactly two incident edges whose row sets are identical, of one level, and hold another key. Otherwise strip it. Where e still lies on exactly two incident edges but no other key remains on them, also clear VERTEX_SPLIT (the vertex is e's own shape vertex; rule 3: "a chain's own shape vertices never carry it"). This replaces (f) 8 (b), the StretchRef interior and end rule and the entity-only strip, and it turns ruling B into a BUILT rule. Pins (leg 2, planted rows): A removed while C lives, so the arena equals C inserted alone at C's placed points (print, refs, digests); the rekey cut; one role of a two-row entity removed. Mutants: MAINT-OFF, FLAG-KEEP. The design text gains one sentence (see C1). |
| F3 | MAJOR | No fuzz family that the oracles run on reaches the coincident class through a WRITER path. Ruling A's converse oracle "after every commit of the fuzz families" therefore sees no orphan-making path. tx's families reach the class 0 times. bfuzz's `coincident` generator draws a 2-point chain along an edge, plus at most one arbitrary point. That gives no interior own point on a run shared on both sides, except by accident. So leg 3 pin (d), "under W-OFF red", is unproven at PR size. Leg 3 cannot edit test/tx/, and leg 2 runs before any row is written. | CONFIRMED p4-q78.log: DEFAULT_MIX and ALONG_MIX, 6 seeds × 120 batches each, give "commits holding coincident-class vertices 0". Code: step3-5/gen.ts:72-77 (the `coincident` kind). | Leg 3 adds a generator kind to its gen.ts, `coincident-interior`: a base chain, then a chain of three or more points along one of its edges with the interior points within attractCm and away from the edge's ends. Later ops in random order: a third chain ending at an interior point, inserted then removed; the base chain removed; a StretchRef removal through or ending at a point; a rekey; a retype `remove`; clearFiner. The tx writers are called from step3-5 (lifecycle.test.ts already imports `../../tx/support.js`). Both oracles run after every commit. W-OFF red is MEASURED, and so is MAINT-OFF (F2). |
| F4 | MAJOR | Mutant G-LATE ("the call after `attachLevelDigests`") is NOT killed by the stated pin ("the copy's attached level digests equal `recomputeLevelDigest`"). A maintained state keyed on another generation is silently rebuilt on read. The draft's "before `attachIndex` … (both key state on the generation)" is half false: the index reads no generation. | CONFIRMED p3-r10.log: after the generation moved under an attached state, `levelDigest == recompute at every level: true ; builds now 2`. Code: digest/levelDigest.ts `current` (rebuild on `!isCurrent`). No `restoreGeneration` in index/ (grep). | The pin asserts `levelDigestBuilds(q) === 1` after a read and after q's first commit (maintained, not rebuilt). Drop "attachIndex keys state on the generation". |
| F5 | MAJOR | Ruling 5 says the generation is "never printed"; it is. `assertStamp` and `assertStamped` print it, and it is a PUBLIC value: `restoreGeneration` is a tx barrel export, and `Resolved` / `Stamp` carry `generation` inline when it is ≠ 0. Under a process-wide counter, a copy's value depends on how many copies the process made before it, which changes with test order, `-t` filters and worker reuse. A copy's stale-slot message (kept verbatim by ruling 10) would read "…in restore generation -3 … (a savepoint was put back across committed batches since)": a history-dependent number and a wrong cause. Every loaded arena's resolved values gain a `generation` field ("the shape it always had" stops being true for loads). | CONFIRMED by reading: arena/resolve.ts `assertStamp` :86-87, `stamp` :93-96, the `Stamp` doc :25-35; facade/stamp.ts `assertStamped` :88-91; num/api-surface.test.ts :50. No reader outside the kernel prints or stores a generation (grep of testkit/layout/model/bench src: none), and the io / renumbering round trips compare prints and records, never stamps. | Amend ruling 5: "opaque and process-local; compared by equality only; appears in Stamp / Resolved values and in debug assertion texts, never in a record, print, digest, persisted value or golden". Leg 2 pins a copy's message by pattern (`/restore generation -\d+/`), never literally. List for the seams: the `Stamp` doc in arena/resolve.ts (M0-a-02, already landed in leg 1), facade/stamp.ts's header (M0-a-16), and decodeArena's doc ("version is 0"). |
| F6 | MAJOR | PIN-SHAPE2 cannot be red as written. "A batch that strips only the `shape` row of a pinned vertex keeping its junction keeps the pin": the base already keeps it (`left` is true through the junction). The case LINE 2 actually fixes is a pinned vertex carrying ONLY a `shape` row. Today, stripping that row clears the pin (`nonKnotLost` true, `left` false). | CONFIRMED by reading tx/relevel.ts `rewriteRows` :579-600. | Restate PIN-SHAPE2: a vertex pinned (opts.pinned / pinVertices) carrying only `(shape, C)`; a batch strips the row; the pin is kept. It is red on the base. |
| F7 | MAJOR | Mutant DUP (Q95: "a duplicate in the list, red through the record's length") is EQUIVALENT: `dirtyFaces` dedupes, so a duplicate push never reaches the record. The closing checker cannot kill it. The B-1 replay alone is also a thin pin: the same miss occurs elsewhere in d-04's own seeds. | CONFIRMED: tx/tx.ts `dirtyFaces` `for (const f of [...new Set(named)])`. p5-q95.log: B-1 step 11 reproduces on today's code (1 unlisted re-parent). Over d-04's 29 oracle sequences, 4 batches miss, all on relevel paths ("stretch (rekeyed)" ×2, "remove way" ×2). | Replace DUP with OVER-LIST: list every child of the freed record, including one whose parent did not change, which is an observable extra `changed` entry. Run the "every re-parented live record is listed" oracle after every commit of d-04's fuzz sequences (the same seeds, fuzzgen reused), with B-1 as its named case. |
| F8 | MAJOR | Removing a STRETCH of C that ends at a two-key own point, or rekeying it with the cut there, clears that point's split flag. Rule 3 (b) compares whole row sets: {A} \| {A, C} are not identical. So once C's rest goes, the point stays on A for ever, and A is never restored. This predates the round, but it is the exact restoration the round claims. The round's pins (whole-chain removal only) would hide it. | CONFIRMED p6-writers.log: "after the stretch, the rest removed: equal to A alone? false … v1 split=false … vertices 8 vs 6" (the rekey gives 7 vs 6). In the stretch case, v2's survival is an artefact of the probe's bare strip; v1, flag cleared, is the finding in both. docs/ARCHITECTURE.md §2.2 rule 3 (b) "*flags:*". | The session rules one of two options: (a) F2's maintenance also keeps the flag where the OTHER key's rows survive identical on both sides (an amendment to rule 3 (b): "identical rows of the run it split"), pinned in leg 2; or (b) a queue row in N-13's canonical-form class, with the round's design sentence and pins scoped to "the chain removed whole". |
| F9 | MAJOR | Ruling 14's probe is not an upper bound for ruling 2. It counts degree 2 only (`at.length !== 2` → continue) and excludes pinned vertices, while ruling 2 writes at any degree. Separately, the class IS reached on pipeline arenas: relief-60 default seed 1 has 9 (wall `enceinte:1/2` at L1 along the L0 river's `shore` + `bank`) and relief-3000 seed 13 has 1. No line checks that those vertices get their rows. | CONFIRMED: shape-count.mjs; /home/user/maps-scratch/rq2-spec/shape-count-relief60.json and relief3000.log. Pinned class vertices on relief-60 seeds 1–2: 0 (shape-count-pinned-relief60.log). The degree ≥ 3 end-state bound under ruling 2 is 50 / 48 / 70 on relief-60 seeds 1 / 2 / 3 (shape-count-ruling2.log, §1.6), so seeds whose degree-2 count is 0 can still move. | LINE 5 of leg 3 adds a measurement on the leg-3 tree: the degree-free probe over the CITY seeds must show 0 class vertices without their row, and it names every moved CITY root by seed. Ruling 14 reads "the draft's degree-2 count; ruling 2's degree-free count beside it". |
| F10 | MAJOR | Version-1 caches. A v1 chunk decodes "identically" (draft (d); leg 1's pin), but a v1 cache of an arena holding the class lacks the rows a replay would write. §3.9's digest check cannot see this, because the stored digests are those of the row-less arena. So a stale cache would load silently as unguarded geometry. | REASONED from docs/ARCHITECTURE.md §3.9 *Load* ("a rebuilt arena whose digests differ makes the stored geometry a corrupt cache") and io/decode.ts `parse` :97 (`<=`). | The session rules one of two options: (a) decode refuses a chunk whose registry version is below 2 as a corrupt cache, so the document replays (one line in M0-a-15's io/decode.ts: queue row or loan); or (b) a recorded reading that M0 holds no v1 cache outside tests, with a queue row for M1's loader. Either way, leg 1's v1 pin is the format's reading, not a promise that v1 content is current. |
| F11 | MAJOR | The measured list is stale and unconfirmed. Since the draft read it, two more units are red: kernel/test/tx `oracle.test.ts` (kernel-tiny: "undone inside frames: grow faces[3]: expected 0 to be greater than 0") and layout/test/enceinte `s5seeds.test.ts` ("No test found in suite F-WALL's later rungs (M1)"). The draft's "(0) 1 … tx … green under the raise" no longer holds. /home/user/maps-scratch/rq2/base/ is empty, so no red has been confirmed against the base. | CONFIRMED: /home/user/maps-scratch/rq2/*.rc (9 red units of 49). REASONED attribution: none of those reds reads the version. The tx red is a coverage precondition at 25 runs. The enceinte red is an empty conditional suite. The bench site reds (summary canary "relief-60 coarse seed 46 moved"; spike relief-60 seed 2) come from a harness with no `encodeArena` in bench/src/site (grep). | Before binding, every red unit is re-run on the base at the same strength and labelled: raise, strength, or head. Only roles.test.ts is expected on the raise's list. |
| F12 | MINOR | Leg 2's pins plant rows "between batches with `addRole`". A bare `addRole` moves no version and writes no commit record. It does not reach the maintained digests either (arena/write.ts: with no recorder, a plain store). A written row is seen by all three. | CONFIRMED by reading arena/write.ts header; tx/tx.ts `sweepVertexRows` runs at commit. | Plant inside a committed batch (a `tx` callback): `addRole` there persisted (p1). Note: a raw `removeRoleRow` in a callback did NOT persist (p6-writers.log, '(stretch) hand strip in a batch: true — rows left 2'; not traced), so pins strip only through the writers. |
| F13 | MINOR | The write's predicate excludes VERTEX_PINNED (draft and ruling 2). A pin can be cleared later (rule 3 (b): its feature row stripped), and the vertex is then an unguarded two-key own point. | REASONED. Unreached on relief-60 seeds 1–2 (0 pinned class vertices). | Drop the pinned clause. Under LINE 2 the row is inert on a pinned vertex. |
| F14 | MINOR | (f) 9's retypeEdges part is already built: `retypeEdgesIn` throws on any vertex role in `add`. A new check would be redundant and its mutant equivalent. | CONFIRMED: tx/writers.ts `check(roleInfo(id).kind === 'edge', … 'is a vertex role: retypeEdges adds edge rows')`. | Drop it from leg 2. Keep removeEdges' VertexRef refusal and insertChain's knot refusal. |
| F15 | MINOR | The `dissolvableProblems` extension ("ALSO a problem unless it carries a `shape` row …") does not say whether a vertex holding another vertex row (a knot, a junction) is exempt. Today's oracle skips any vertex row (`rowsOnV(p, v).length > 0 → continue`). | CONFIRMED: step3-5/support.ts `dissolvableProblems`. | "… a flagged, unpinned, degree-2 vertex with no vertex row other than `shape` …". |
| F16 | MINOR | The write sits at the end of `run`, outside `ctx.undo` (as the knot rows do). An ok `run` that a later pass rolled back would leak rows. On this head none is rolled back (`passes` returns the first ok), but S14's pass 5 is new. | CONFIRMED: insert/insertChain.ts `rollback` replays `ctx.undo` only; the knot loop uses a bare `addRole`. | Leg 3 checks this on S14's head. If any ok result is rolled back, the write pushes its inverse into `ctx.undo`. |
| F17 | MINOR | Ruling 2 and RQ3. A re-given chain whose extra point lands on a T-junction vertex of its own shared run writes a row (the copy changes the arena). That is consistent with the world without the T, but RQ3's §3.6 text says a copy "adds no vertex, no edge and no row". | CONFIRMED p2-cases.log case (8): ruling 2 is true at the copy's point (deg 3); today the copy changes nothing. | Leg 3 re-runs RQ3's P2 pins (identical copies add nothing) as a control and states in its notes that only a copy with an extra point can write. |
| F18 | MINOR | The design text promises more than any line builds or pins. (c) 8 says "every writer returns … disjoint rings", and (c) 7 says "a record re-parented by any writer". The oracles cover fuzzgen's ops only (insertChain, removeEdges, retypeEdges rekey, clearFiner, setOwner). (c) 4 names the write door only; the strip doors (removeEdges ChainRef / StretchRef, clearFiner, retypeEdges remove / rekey) are missing. | CONFIRMED: test/tx/fuzzgen.ts kinds and imports. Q78's invariant itself holds: p4, 1 440 ops, 0 rings claimed twice. | Name the writers the pins cover, or say "the kernel's transaction writers (§3.4)". Add the strip doors to (c) 4. |
| F19 | MINOR | The JSON entries carry the draft's degree-2 predicate and its control (W-ANY, "the degree-2 / identical-rows test dropped"). The case that motivates ruling 2 has no pin. | CONFIRMED p2-cases.log case (3). Under ruling 2, after B's removal the arena equals A + C never-B ("true"). Under the draft predicate, B's removal dissolves C's point ("v7: dead", "false"). | Fold ruling 2 into leg 3 LINE 1. Add pin (e), the existing-split-vertex case with B removed, which must equal A + C (DEG2-ONLY mutant red). Restate W-ANY as "identical-rows / other-key test dropped". |
| F20 | MINOR | Ruling 2's "hold a row of another key" is undefined for a chain of several rows. Read as (role, entity, ordinal), a chain's own second row (the river's `bank` beside its `shore`, one entity) is "another key", so the chain could write a row with no other chain present. | CONFIRMED that the reading matters: the shore + bank pairs of `water:river:0` count as two keys in the end-state probe (§1.6). | "A row that is none of the chain's own rows (`ctx.rows`)". |

---------------------------------------------------------------------------------------------------------------------

## 1. The predicate (attack area 1)

The two predicates were evaluated (lib.mts `predicates`) on the placed points of the last chain, on today's code. A
vertex was counted for a predicate only where that predicate holds (p1, p2).

| case | result on today's code | draft (deg 2) | ruling 2 | right answer |
|---|---|---|---|---|
| straight fixture A / C: v at (1800, 2915) | lands exactly at its input, split, deg 2, rows {A, C} both sides; x attached at v and removed dissolves it (7 → 6) | write | write | write |
| N-23 P3 (fold-back) | still commits on this head (W_STRETCH_SHARED, W_ATTRACTED), v (2431, 2890) as N-23 | write | write | write (S14 may change this; the straight form is the stable fixture) |
| T-junction end | deg 3, own row on 1 edge | none | none | none |
| end on a run shared on one side | deg 2, rows {A} \| {A, C} | none | none | none |
| own point on an EXISTING split vertex (B's T) | deg 3, two edges {A, C} | **none** | **write** | write: with ruling 2, B's removal leaves A + C exactly; with the draft, it dissolves C's point (CONFIRMED) |
| closed chain, seam on A | the seam (1800, 2915) deg 2 {A, R}; the ring's leave points deg 3 | write (seam) | write (seam) | write |
| L2 chain along L1 chain | v L2, edges L1 [A@L1; C@L2] | write (row at L2) | write | write (clearFiner L2 must strip it: leg 2 pin (d)) |
| three coincident chains | D (no point there) passes: none; E (point there): write | as ruling 2 | as draft | correct |
| two rows of two entities | one row per entity on both edges | write ×2 | write ×2 | correct (ruling 6) |
| same-key re-given copy with an extra point on a T vertex | deg 3 | none | write | see F17 |
| a chain visiting v twice | four own pairs | none | none | none (degree ≥ 4 never dissolves) |

The predicate can be computed at commit in `run`. `landed`, `rowsOn`, `outgoing` and the flags are all available
after `rewalk`, which is where the knot rows are written (insert/insertChain.ts, the loop "The knot rows onto the
vertices their points became"). **Ruling 2 is the better predicate.** It closes the existing-split-vertex gap, which
the draft carried as history dependence, and it writes nothing at ends or T-junctions. Its costs are F17, F20 and a
shift that cannot be bounded in advance (F9). The degree-2 class is 9 of 12 009 live vertices on relief-60 seed 1, and
0, 0, 1, 0 on the other seeds the session measured, so the draft's predicate writes nothing in bulk. Ruling 2's
end-state bound is 48–70 per relief-60 seed (§1.6). That bound is loose, but it means that "no root moves where the
degree-2 count is 0" cannot be assumed.

### 1.6 Ruling 2's count beyond degree 2

CONFIRMED, shape-count-ruling2.log and .json (relief-60 default, end state, pinned vertices included). This counts
vertices of degree ≥ 3 that carry the split flag where some key lies on exactly two incident edges whose row sets are
identical, of one level, and hold another key: **seed 1: 50, seed 2: 48, seed 3: 70**, against 9, 0 and 0 for the
degree-2 class. None of the sampled vertices is pinned.

Two families dominate:

- `way` + `district_bound` (seam) at L1, degree 3.
- `shore` + `bank` of `water:river:0` at L0, degree 4. These count only because shore and bank of one entity are two
  keys.

The figure is a LOOSE upper bound: the end state cannot tell whether a vertex was one of the passing chain's LANDED
points. Most of these are probably crossings and T-junctions on a shared run, which ruling 2 does not write (the seams'
own points are inserted pinned). Two consequences follow:

1. No end-state probe bounds ruling 2's shift. Only leg 3's in-round measurement can (F9).
2. "Holds a row of another key" must be defined. If the key is read as (role, entity, ordinal), a chain's own second
   row counts as "another key". The definition should be "a row that is none of the chain's own rows (`ctx.rows`)"
   (F20).

## 2. Removal in every order (attack area 2)

With A the chain whose run is split, C the chain whose own point v stands on it, and the round as the rulings write
it:

- **C removed:** A is restored, provided the strip runs (STRIP-OFF). With the proxy planted and no strip (today), the
  removal leaves v and the row: p6, "whole-chain removal … vertices 8".
- **A removed while C lives:** see F2 (iii). Today v dissolves and C loses its point. With the row, v survives with the
  flag and the row, and differs from C alone by exactly those two. The fix is known (F2), so the leg should build it,
  not report it.
- **A third chain x attached at v and removed:** v survives with the row. This is green on the base already (relevel's
  any-row guard), so leg 2 pin (c) is a regression pin, not a red pin. Say so.
- **A stretch of C removed:** interior points are fine once stripped. At an END: F1 (orphan) and F8 (a flag cleared for
  ever).
- **Rekey:** interior rows move to `to` (p6, v2 → `junction/base:K`). The CUT keeps `(shape, from)`, an orphan (F2 (i)),
  and loses its flag (F8).
- **Retype `remove`:** ruling 8 (b) covers it. F2's single rule covers it too, together with the other cases.
- **clearFiner:** carries the row by construction (`clearFinerIn` strips every row of the level on fully cleared
  rings). The pin (d) stands.
- **C before A (the reverse order):** C's point is C's own vertex and carries no flag, so no `shape` row is ever
  written. A's later removal is exact. C's removal while A lives leaves v on A with no flag, permanently: a pre-existing
  canonical-form gap (N-13's class), not this round's to close. It should be named in the design sentence's scope
  ("a chain inserted onto another's run").

Orphans under the rulings as written: the stretch end (F1), the rekey cut (F2 (i)), and one role of a multi-row
entity (F2 (ii)). A flag wrongly kept: A's removal (F2 (iii)). A flag wrongly cleared: the stretch end and the rekey
cut (F8).

## 3. R10 (attack area 3)

- **"+1" collides.** CONFIRMED by emulation (p3). q = compactSlots(p); q's generation moved to 1 (what "+1" gives); p
  restores an image taken before q's version, commits back up to it, and so has generation 1 at the same version with
  different content: `isCurrent(q, stamp(p)) = true`. The collision pin is right.
- **P16 today:** `isCurrent(compactSlots(p), stamp(p))` is true (CONFIRMED). The load case is current only when p is at
  version 0 (a load starts at 0): at version 1 it reads false (p3). The pin must take p at version 0 for the load case,
  as the draft lists.
- **Readers of the value:** the equality-only readers are levelDigest.ts, geom/neighbours.ts, model.ts and the two
  stamp checks. Every one is per arena (WeakMap) or per key (model.ts `generations`). No print, record, summary or
  golden reads it (grep of testkit, layout, model and bench src). It is nonetheless public and printed: F5.
- **Keyed before the token is set:** nothing between `createPlat` and `attachIndex` reads the generation, in either
  compact.ts or decode.ts `rebuild`. The digests (attached last) are the only state keyed on it. G-LATE is invisible to
  the digest-equality pin: F4.
- **Other arena-making paths:** no layout, model or bench source copies an arena (`createPlat` callers there build
  fresh arenas). A fresh arena of the same key as another, both at generation 0 and version 0, has always read
  "current" on the other; this is not a copy, and not R10's to close, but (c) 6's sentence should say "a copy", as it
  does. frames.ts (S9) never moves the generation, which is correct.
- **Scope loan (ruling D):** one call plus its import in each of compact.ts and decode.ts is enough for the code.
  io → tx is not a new layering edge: io already imports digest, which imports tx. It is not enough for the TEXT: the
  docs that become stale are in M0-a-02's, M0-a-15's and M0-a-16's files (F5). List them for the seams.

## 4. The version raise (attack area 4)

- **CONFIRMED by grep:** the only readers of `ROLE_REGISTRY_VERSION` are io/encode.ts `encodeArena` (the header) and
  io/decode.ts `parse` (`<=`). The registry's length is read only by decode.ts :164 and by test fixtures. The header
  offset is 6 (MAGIC is 4 bytes, then the FORMAT_VERSION varint, then kind; `io/format.ts`, `encode.ts` :374-377).
  The draft's (0) 1 holds for the code.
- **The measurement, unit by unit:**
  - kernel/test/arena (roles.test.ts ×3): the raise, as expected.
  - kernel/test/arr (6 bands tests): Q152, the head.
  - kernel/test/insert (step1-2 bfuzz coverage ×2): strength.
  - kernel/test/tx (oracle.test.ts, kernel-tiny coverage precondition): strength, NEW since the draft.
  - layout/test/enceinte (s5seeds "No test found in suite"): an empty conditional suite, NEW; not the raise.
  - bench calibrate, host, timing: J176 (the host is not an Apple M1).
  - bench site (summary canary, spike relief-60 seed 2, compose S5): the head's stage outcomes; bench/src/site encodes
    nothing.

  All of this is REASONED until base/ holds the re-runs (F11).

## 5. Leg order and pins (attack area 5)

- **Owns** (M0-work.json, read): every built change is inside its item's owns, plus ruling D's loan. The leg-1 decode
  pin reads io through its exports from test/arena (allowed). Leg 3's `dissolvableProblems` is its own. The F3
  generator and F2's maintenance step are each inside their legs' owns (step3-5/gen.ts; tx/relevel.ts).
- **Leg 1:** the re-pins are red on the base. SH-RANK, SH-IDX, SH-SINCE and SH-KIND are killed by the whole-row
  assertions. The decode pin is green on the base by design, and its io mutants are run in a mirror.
- **Leg 2:** STRIP-OFF and STRIP-STRETCH-OFF are red on the base (CONFIRMED with the proxy: the row stays, v stays).
  Pins (c), (d) and (e) are green on the base (regression pins), which the spec admits for (d) and (e) and should say
  for (c). PIN-SHAPE is red on the base, but PIN-SHAPE2 is not (F6). G-LATE is unkillable as written (F4), and so is DUP
  (F7). A planted row equals a written one only if it is planted at the chain's level and entity, inside a batch (F12).
  The written row is at level n, the batch's level, entity per row.
- **Leg 3:** W-OFF needs a family that reaches the class (F3).

## 6. Q95 and Q78 (attack area 6)

- **Q95:** the repro holds on today's code (p5: B-1 step 11, an L2 record re-parented from (1448,0)–(4000,0) to
  (0,0)–(1448,0), unlisted). Listing the children grows `changed` on relevel batches only (4 of d-04's 29 sequences
  have such batches). No committed golden pins a record's `faces` lists. The renumbering and compact round trips
  compare ref against copy on the same tree, so both sides move together. The model listener re-hashes the extra faces
  to the same values. DUP: F7.
- **Q78:** "no op returns with two live records claiming one ring" holds on 1 440 ops (p4, both mixes, refused ops
  included). `randomBatch` is one op per batch, so the oracle is a wrapper around `b.fn` before the commit, which is
  feasible. FREE-LATE needs a mirror edit of `facePass`. The text's reach: F18.

## 7. The design text (attack area 7)

- **C1** (with F2). §2.2 rule 3 (b) keeps the flag while the pair's rows stay identical, so after A's removal v keeps
  the flag. With the round's row, v is then both "a chain's own shape vertex" and flagged, against "A chain's own shape
  vertices never carry it". (c) 1 needs: "When the other chain's rows leave both edges, the row is stripped and the
  flag cleared: the vertex is the chain's own shape vertex." The alternative is ruling it as an accepted state.
- (c) 1's proposed addition says "a `split` vertex of degree 2". Under ruling 2, write "through which the chain passes
  once (its row on exactly two incident edges, identical, with another key's row), whatever its degree".
- (c) 4 should name the strip doors as well (F18).
- (c) 7 and (c) 8 over-promise (F18).
- (c) 9 is right for bytes. F10 is about meaning.
- (c) 3's "registry version 2" and the append-only sentence agree with rule 7 ("a versioned data table") and with K5's
  digest claim.

## 8. Ambiguities a leg would stop on (attack area 8)

1. Ruling B names no leg (planted rows in leg 2, or written rows in leg 3?). It is resolved by F2: leg 2, planted rows.
2. Ruling A's "fuzz families": which ones? Resolved by F3.
3. Ruling 8 reads "the two edges", which is undefined at degree ≥ 3 under ruling 2. Resolved by F2's single rule.
4. The JSON entries still carry the degree-2 text (F19). The order of work in leg 3 puts LINE 2 (the oracle) before
   LINE 1, but the oracle's converse half has nothing to judge until LINE 1 writes; harmless, but say it.
5. Leg 3's round key if S14 ran fix rounds is already handled. The RESUME head must be S14's LANDED head, and the
   N-23 P3 fixture must be re-checked there (it commits on today's head).

---------------------------------------------------------------------------------------------------------------------

## The changes, numbered (for the verdict)

1. **(F1, F2, F8, C1)** Replace leg 2 LINE 1's per-path strip with one maintenance step in `rewriteRows`: keep
   `(shape, e)` iff e passes through once with another key on both edges; else strip it; where e is alone on both
   edges, also clear the flag. Rule F8 (a) or (b). Add the pins: A's removal (equal to C alone), the stretch end, the
   rekey cut, one role of a two-row entity. Mutants: MAINT-OFF, FLAG-KEEP. Invert STRIP-ENDS. Add the C1 sentence.
2. **(F3)** Leg 3 adds the `coincident-interior` generator with writer ops, both oracles after every commit, and W-OFF
   and MAINT-OFF measured red.
3. **(F4)** G-LATE's pin asserts `levelDigestBuilds(q) === 1`. Drop the attachIndex clause.
4. **(F5)** Amend ruling 5's wording. Pin a copy's message by pattern. List the stale docs for the seams.
5. **(F6)** Restate PIN-SHAPE2 (a pinned vertex with only a `shape` row).
6. **(F7)** Replace DUP with OVER-LIST, and run the re-parent oracle over d-04's sequences.
7. **(F9)** Make the probe degree-free and pinned-inclusive. Leg 3 LINE 5 requires 0 class vertices without a row on
   the CITY seeds and names every moved root.
8. **(F10)** Rule on version-1 caches: refuse them, or record the reading with a queue row.
9. **(F11)** Bind the measured list only after the base re-runs. Two new red units need labelling.
10. **(F12–F20)** The minor edits as in the table: define "another key" as none of the chain's own rows; plant inside a batch, drop the pinned clause, drop retype's `add`
    check, the oracle's precondition, check `ctx.undo` on S14's head, the RQ3 control, scope the design sentences,
    fold ruling 2 into the JSON with the existing-split-vertex pin.
