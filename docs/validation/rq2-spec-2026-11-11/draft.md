# The RQ2 merged round — M0-a-02 S4 → M0-a-06 S10 → M0-a-05 S15 (spec draft)

Drafted 2026-11-11 by a spec seat on the design head 6f98b464 (J774). Read-only on the repository; nothing was built or
run except greps and a read of the session's own measurement logs in /home/user/maps-scratch/rq2/ (partial, see (d)).
Line numbers are TODAY's and are hints only; every anchor is given by file and symbol. Where a source and the code
disagree, the code was trusted and the disagreement is listed in (f) or (g).

Binding: J757 (RL4 and R10, ruled as one merged round), J358 / N-61 (2) (RQ2), rulings-hardening-1.md §2, J237, J238,
J264, J443 (the MERGED-ROUND RULE), J631 (2) (a) (a persisted-format ruling takes an adversarial review at its spec).
The queue rows the round closes: Q76, Q78, Q79, Q95 (and the last remainder of Q74, which J735 already trimmed to Q79).

---------------------------------------------------------------------------------------------------------------------

## (0) Findings that bear on the shape of the round (read these first)

1. **The version raise moves chunk bytes and chunk refs, and nothing else.** `io/encode.ts` `encodeArena` writes
   `w.uv(ROLE_REGISTRY_VERSION)` into every chunk header (today :377). Nothing else reads the version:
   `digest/levelDigest.ts` `chainItem` hashes a role by `info.name`, `info.rank` and `info.kind` only; the model's roots
   (`model/src/digest/model.ts` `platsHash`) read level digests; `contentPrint` (test/insert/step3-5/support.ts) reads
   role ids and entity ids; `test/gate/roles.test.ts` (row K5) pins exactly this "digest unchanged by an append". So
   J757 (2)'s "and with them every pinned root, golden and digest of every item" is NOT what the code does: roots,
   digests and content prints move only where a `shape` row is WRITTEN, which is leg 3, not the raise. The session's
   partial measurement agrees (see (d)): kernel/test/io, digest, gate, facade and tx are green under the raise; the arena
   folder reds only roles.test.ts (3 tests).
2. **Leg 3's content shift is NOT in the version-only measurement.** The measured list covers leg 1. Leg 3 writes rows,
   which moves prints, digests, chunk refs, commit records and possibly roots wherever the coincident class occurs. RQ2's
   declared shift ("the register's pass4 case and B-FUZZ constructive seed 1") was a prediction, not a measurement. Leg 3
   therefore carries its own base → tree shift line (S14's LINE 12 form).
3. **"M0-a-14's dissolvable check" does not exist.** `grep -rn dissolv plat/packages/kernel/src` finds none in
   `invariants/` (M0-a-14's owns). The check RQ2 names is `dissolvableProblems` in
   `plat/packages/kernel/test/insert/step3-5/support.ts` (today :334-351) — M0-a-05's OWN test folder. Leg 3 needs no
   cross-item scope for it.
4. **The write cannot be decided "at the landing" for the general class.** RQ2's code consequence names
   `applyLanding` / `ownShapeVertex` (insert/stretch.ts). At a point's landing the chain's own rows are not yet on BOTH
   sides of the vertex (step 3 shares the run segment by segment after the end lands), so the predicate "a split vertex
   between identical rows of the chain and another key" is only true at the chain's commit. N-23's P3 (a fold-back onto
   an already shared edge) is the one case a landing-time test would see. The draft writes the row at the chain's commit
   (beside the knot rows in `insertChain`'s `run`), under the exact predicate — OPEN (f) 1.
5. **A landing-time or over-broad write would shift the whole pipeline.** "Every own point that splits another key's
   run" includes every T-junction end (a way ending on another way). The predicate must be the narrow one (degree 2,
   identical rows both sides, the chain's row and another key's), or the shift is every arena's.
6. **R10 cannot be built as "+1".** A load (`io/decode.ts` `decodeArena`) has no source arena, so no "source generation
   + 1" exists; and for `compactSlots`, a copy at (g + 1, v) collides with the original after the original restores
   across committed batches (its generation becomes g + 1) and commits back up to v. The exact form is a process-wide
   sequence of tokens for copies — OPEN (f) 5, with a form that leaves every existing generation pin unchanged.
7. **N-23's P3 may no longer reach its state.** P3's C folds back along the edge it just shared, which is a retrace;
   RQ1 (landed in M0-a-05 S9, the cut back) changes how such a chain routes. The class itself does not need a retrace:
   a coincident chain whose INTERIOR input point splits the other chain's edge is the same vertex (worked example in
   leg 3, LINE 1). The register case is built on whichever form commits on the S14 head.
8. **Q79's routing to "M0-s-02 (tables)" is moot.** C-0005: roles.json is kernel data, never `@plat/tables`. No tables
   round is needed (plan.md's row "M0-s-02 … a round only if the shape role enters M0's tables" closes with "none").
   Q79's "(RQ4's shape-row part)" is a mislabel of RQ2's strip (RQ4 is `isOpenTx`, done).

---------------------------------------------------------------------------------------------------------------------

## (a) The failing lines, per leg, in build order

### LEG 1 — M0-a-02 S4 (owns: kernel/src/arena/, arena/roles.json, kernel/test/arena/)

**LINE 1 — Q79 / RQ2 / RL4: the registry gains `shape`, version 2.**
- *Evidence:* `kernel/src/arena/roles.json` (version 1, 56 rows, ids 0–55; no `shape`); `arena/registry.ts`
  `parseRoleRegistry` (:50-76: ids dense, ranks a permutation, `since ≤ version`, a knot is an indexed vertex role);
  `ROLE_REGISTRY_VERSION` (:83); `io/encode.ts` `encodeArena` header (:377); `io/decode.ts` `parse`
  (`need(r.uv() <= ROLE_REGISTRY_VERSION, …)` :97, `need(role < ROLE_REGISTRY.length, …)` :164);
  `test/arena/roles.test.ts` (:61-70 "nothing else at version 1", :84-91 `roleInfo(56)` throws, :96-106 the malformed
  documents, among them `since: 2` and an append at id 56 under version 2); rulings-hardening-1.md §2; M0-a-05-notes.md
  'PROPOSED for other items' rounds' item 3 (a); queue Q79, Q74; J757 (3).
- *Required change:* append
  `{ "id": 56, "name": "shape", "kind": "vertex", "rank": 56, "structural": false, "indexed": false, "knot": false, "since": 2 }`
  and set `"version": 2`; the `$comment` gains one sentence (version 2 appends `shape`, kernel-internal: a chain's own
  point landed on another chain's run it shares on both sides, written by insertChain alone and stripped with the chain;
  RQ2, N-61 (2); later rows rank in append order). `registry.ts` changes no code (its `RoleInfo.rank` doc comment may
  say "version 1: rule 7's table order; later versions append"). No new export anywhere (later legs read
  `roleIdOf('shape')`). roles.test.ts is re-pinned: the version-1 snapshot test is kept as it is (the first 56 rows);
  "nothing else at version 1" becomes "version 2: the version-1 rows and one appended row" — `ROLE_REGISTRY_VERSION` 2,
  length 57, row 56 equal to the row above whole, `rank === id` for all; the lookup test names `roleIdOf('shape') === 56`
  and `roleInfo(57)` throws; the malformed-document test's "a since past the version" uses `doc.version + 1` and its
  append uses id `doc.roles.length` under `doc.version + 1`. NEW PIN (persisted format, (d)): a chunk of a committed
  arena with its header's registry-version varint patched from 2 to 1 (the byte after the kind byte, offset 6, as
  `test/io/corrupt.test.ts` :251 counts the header) and its ref re-hashed with `H128` (kernel/src/hash) decodes, and its
  re-encoding differs from the patched bytes in that one byte only; the same chunk patched to 3 is refused with
  `isCorruptCache` and the detail naming 'a chunk written under a newer role registry'. The pin lives in
  test/arena/ (this item's), reads io/ through its exports, edits nothing in io/.
- *Pin:* roles.test.ts's version-2 assertions are red on the base (version 1, 56 rows). The decode pin is green on the
  base too (it pins the reading, not the fix) — its mutants are io's, run in a mirror only.
- *Mutants:* SH-RANK (`shape` rank swapped with a knot role's), SH-IDX (`indexed: true`), SH-SINCE (`since: 1` —
  must be killed by the snapshot test, not only by the loader), SH-KIND (`edge`); in a mirror only: DEC-EQ
  (decode.ts :97 `<=` → `===`) red on the version-1 patch, DEC-NONE (the check dropped) red on the version-3 patch.
- *Not touched:* io/ (M0-a-15's), tx/, insert/, test/gate/ (the session's gate tests), API.md, any other item's test.

**LINE 2 — N-s3c-2 (the entry's first small pin): the free-list assertion pins vertex slots only.**
- *Evidence:* M0-a-02-notes.md N-s3c-2 (:197); `test/arena/slots.test.ts` 'a growth replaces the table it grows …'
  (:663-725; the vertex free-list block :710-719); plan.json entry 'M0-a-02' line a-02:N-s3c-2.
- *Required change:* in that test, repeat the vertex block for a reused PAIR slot (`allocEdgePair` after
  `freeEdgePair`), a reused FACE slot at one level (`allocFace` after `freeFace`) and a reused ROLE-ROW slot
  (`addRole`/`addRoleRow` after `removeRoleRow`): the table kept (`toBe`), then replaced by the next new slot, in the
  tiny mode, on a capacity-1 table that the drive does not otherwise grow.
- *Pin / mutants:* B7 (`allocEdgePair`'s free-list branch calls `growPairs` in tiny mode) and B8 (`allocRow`'s calls
  `growRoleRows`) each red ALONE by the new assertion (the growth test's `capacities(roomy)` check switched off in the
  mirror to show it); B9 (the face free list grows the face table) red. NO-SHIFT.

**LINE 3 — N-s3c-1 (the entry's second small row; comment only).**
- *Evidence:* M0-a-02-notes.md N-s3c-1 (:196); `test/arena/support.ts` header (:1-10); `test/arena/support.test.ts`
  header (:1-4) and :37 ('the folders' copies … draw the same words').
- *Required change:* both headers name which folders import the generator (tx/fuzzgen.ts re-exports `rng` from
  arena/support; index/support.ts imports `rng` and `intIn`) and which copies remain pinned; say that the tx comparison
  compares the generator with itself. Comment only; no pin (rule (2)).

**LINE 4 — the raise's shift, declared and listed (a measurement and declaration row).**
- *Evidence:* finding (0) 1; the session's measured list (APPENDED BY THE SESSION: see the placeholder in each JSON).
- *Required change:* the notes state the declared shift — every chunk's header byte 6 reads 2 (was 1), every chunk ref
  moves, chunk lengths unchanged, and no content print, level digest or model root moves in this leg (no `shape` row is
  written yet) — measured base → tree on the step3-5 snapshot of the lifecycle register (refs differ, print and digests
  equal) and on the roots fusion 3 / integrated 4 (identical). Every test on the session's measured list that reds is
  this leg's DECLARED red, never a failing line; the leg re-pins only roles.test.ts. It LISTS for the session's seams:
  `kernel/API.md:61` ("56 named roles"), the header comment of `test/gate/roles.test.ts` (:1-8: "keeps every existing
  document's digest and block exactly" — the block is not kept: the header byte moves), docs/ARCHITECTURE.md §2.2 rule
  7's table and the sentences in (c), docs/ARCHITECTURE-FULL.md (regenerated), M0-world-sites-gate.md K5 (its "goldens
  unchanged" holds for digests; a sentence for the bytes).

### LEG 2 — M0-a-06 S10 (owns: kernel/src/tx/, kernel/test/tx/; cross-item scope: io/compact.ts and io/decode.ts, one call each)

**LINE 1 — RQ2's strip: a removed chain takes its `shape` rows with it.**
- *Evidence:* `tx/writers.ts` `removeEdgesIn` — the whole-chain branch (`info.kind === 'edge' && !info.indexed`,
  :278-281: `knotRowsOn` on `verticesOf` the chain's pairs) and the StretchRef branch (interior knot rows, :302-303);
  `knotRowsOn` (:84-88); `retypeEdgesIn`'s rekey (:431-439 moves every non-knot vertex row of `from` on the moved part,
  `shape` included, by construction); `clearFinerIn` (:575-599: every row of a cleared record's level on its rings'
  vertices where every record around is cleared — `shape` rows included by construction); `relevel.ts` `dissolvable`
  (:234-242) and `dissolve` (:1208) refuse a vertex with ANY vertex row (`vertexFirst !== -1`), `restoreSplit` (:1296ff)
  one with a row of its level or coarser; M0-a-06-notes.md RQ2 row (:402); M0-a-05-notes.md item 3 (b); N-61 (2).
- *Required change:* in the whole-chain branch, beside the knot rows, every `shape` row whose entity is the chain's
  entity on the chain's vertices joins `strip`; in the StretchRef branch, the same on the stretch's INTERIOR vertices
  (its two ends are promoted ends of the remaining parts and keep theirs — `promoteEnds` clears their split flags).
  One helper beside `knotRowsOn` (e.g. `shapeRowsOn(p, v, entity)`, file-local); `roleIdOf('shape')` read once at module
  scope. Both go into the one `strip` Set and the one `rewriteRows` call (OPEN (f) 7: order). clearFiner and rekey get
  PINS, no code (they already carry the rows) — unless the pin is red, then the fix is the line's.
  [OPEN (f) 8: retypeEdges' `remove`, (f) 9: a caller naming `shape`.]
- *Pins (rows PLANTED between batches with `addRole`, since leg 3's write is not built yet):* the fixture — A
  `invisible` L2 (3142, 2862)–(499, 2966); C `invisible` L2 (3142, 2862) (1800, 2915) (499, 2966) whose interior point
  splits A's edge (0.19 cm off A's line; the vertex v keeps VERTEX_SPLIT by C-0302 (3)'s two-key rule; the builder
  confirms the landing); `(shape, C)` planted on v. (a) `removeEdges(ChainRef C)` restores A exactly — content print,
  chunk refs and level digests equal to the arena of A alone — and v is gone (STRIP-OFF red); (b) a StretchRef removal
  of C's stretch through v strips v's row and v dissolves with the stretch's other interior vertices (STRIP-STRETCH-OFF
  red; STRIP-ENDS — stripping at the ends too — red on an end that carries a planted row); (c) a third chain x attached
  at v (x: (0, 3501) (735, 705) (2456, 2886) as N-23) and removed: v survives with its row, print and digests equal to
  before x (pins relevel's existing any-row guard; mutant SH-DISS — `dissolve` skipping `shape` rows — red); (d)
  clearFiner of the faces around an L2 C along an L1 A strips the planted L2 `shape` row and restores A's route
  (CF-KEEP — clearFinerIn skipping `shape` rows — red); (e) a rekey of C's stretch through v moves `(shape, C)` to
  `(shape, to)` (RK-SKIP red). Every pin also asserts `allProblems` empty and the arena `readable` (test/tx/support.ts).

**LINE 2 — the kernel pin and `shape` rows [OPEN (f) 3].**
- *Evidence:* `tx/relevel.ts` `rewriteRows` (:579-600): "a vertex from which the batch strips its last vertex row
  other than knot rows loses its kernel pin"; `nonKnotLost` / `left` read `!roleInfo(kind).knot`; ARCHITECTURE.md §2.2
  rule 3 (b): "since a pin guards the feature its role names". A `shape` row names no feature.
- *Required change (recommended reading):* `shape` rows count as knot rows do for the pin — neither keeping a pin alive
  nor dropping one: `nonKnotLost` and `left` exclude them. Pin: a pinned vertex carrying a `junction` row and a planted
  `(shape, C)` row; a batch strips the junction → the pin is cleared (PIN-SHAPE: `shape` counted as a feature row → the
  pin kept → red); a batch that strips only the `shape` row of a pinned vertex keeps the pin (PIN-SHAPE2 red).

**LINE 3 — Q76 under R10: the stale stamp after compactSlots / load, closed by the restore generation.**
- *Evidence:* queue Q76 (and L16); M0-a-15-notes.md :214 (the reading) and N-s1c-7 :294 (probe P16:
  `isCurrent(compactSlots(p), stamp(p))` true; `isCurrent(load(framed), stamp(framed))` true at version 0);
  M0-a-02-notes.md N-s2-3 (:25, probe P5); `tx/savepoint.ts` `RESTORES` (:212), `restoreGeneration` (:221), `putBack`
  (:253 `RESTORES.set(p, restoreGeneration(p) + 1)`); `arena/resolve.ts` `isCurrent` (:72-74), `assertStamp` (:81-90),
  `stamp` (:93-97); `facade/stamp.ts` `assertStamped` (:83-95); `io/compact.ts` `compactSlots` (:41; `createPlat` :92,
  `q.version = p.version` :176, `attachIndex` :180, `attachLevelDigests` :182); `io/decode.ts` `decodeArena` (:250) /
  `rebuild` (:273; `createPlat` :303, `attachIndex` :416, `attachLevelDigests` :417); the generation's readers:
  `digest/levelDigest.ts` (:593, :629, :661, :779), `geom/neighbours.ts` (:103, :118), `model/src/digest/model.ts`
  (:201, :213) — all by equality; J757 R10.
- *Required change [OPEN (f) 5, recommended form]:* `savepoint.ts` keeps `RESTORES` beside the arena and gains a
  module-level sequence of COPY TOKENS (negative integers, −1, −2, …, each minted once in the process) and a by-path
  kernel-internal export (e.g. `freshGeneration(p)`: sets p's generation to the next token). `putBack` keeps `+ 1` for
  an arena whose generation is ≥ 0 and mints the next token for one whose generation is negative (a copy). compactSlots
  and decodeArena call `freshGeneration` on the NEW arena right after `createPlat`, before `attachIndex` and
  `attachLevelDigests` (both key state on the generation). So a never-copied arena still reads 0, 1, 2 … (every existing
  pin of a generation value stays green), no two arenas that are copies ever share a generation, and no copy shares one
  with an original. No chunk-header change, no Stamp shape change (a copy's stamp carries `generation`, as a restored
  arena's does), no message text change (OPEN (f) 10). The header comment of savepoint.ts ("the only restore that moves
  the arena's restore generation") is restated.
- *Pins (test/tx/savepoint.test.ts, this item's):* P16 as cases — `isCurrent(compactSlots(p), stamp(p))` false and
  `isCurrent(decodeArena(encodeArena(p), key).value, stamp(p))` false, each for p never restored (generation 0, version 0
  and version > 0) and for p restored once; `isCurrent(q, stamp(q))` true (the copy's own stamps current); two copies of
  one p never current on each other; THE COLLISION SEQUENCE — p at version v, q = compactSlots(p), p restores an image
  taken before v across committed batches and commits back up to v: `isCurrent(q, stamp(p))` false; the copy's attached
  level digests equal `recomputeLevelDigest` on q at every level; a debug-build `assertStamp(q, stamp(p))` throws.
- *Mutants:* G-COMPACT (compactSlots does not call it) and G-LOAD (decode does not) red on P16; G-PLUS1 (a copy takes
  the source's generation + 1; decode takes 1) red on the collision sequence and the load case; G-LATE (the call after
  `attachLevelDigests`) red on the digest case; G-RESTORE-COUNT (putBack `+ 1` on a copy) red on two copies restored once
  each.

**LINE 4 — Q78: can a transaction query faceNeighbours between an allocation and its free?**
- *Evidence:* queue Q78; choices.md C-0371 (2) (the transient "unspecified but safe"; "M0-a-06's to confirm"), C-0361;
  `geom/neighbours.ts` `faceNeighbours` (:149) is called only by the façade (facade/kernel.ts :261, :320) — no writer
  calls it; `relevel.ts` `facePass` (:850) allocates (`allocFace` :1138, :1188) and frees inside one `rewriteRows`;
  insert/rewalk.ts and faces/ allocate and free inside one op.
- *Required change [OPEN (f) 11: both a test and a sentence]:* CONFIRMED by an oracle test, not by reading: inside a
  batch, after every op of tx's registered fuzz families (fuzzgen.ts `randomBatch` under `DEFAULT_MIX` and
  `ALONG_MIX`, the seeds the tx folder already drives) and after every refused op, every level's live face records own
  disjoint rings (no half-edge of the level's view on two live records' rings) and `faceNeighbours` of every live
  record gives the kept map's answer equal to a fresh map's. The choices row and the design sentence in (c) state the
  contract: no op returns with two live records claiming one ring. Pin: the oracle; mutant FREE-LATE (facePass leaves a
  replaced record live until the batch's commit) red after the op that made it.

**LINE 5 — Q95: relevel re-parents a removed record's children without listing them.**
- *Evidence:* queue Q95; M0-d-04-s2.md B-1 (repro `oracleRun(44_509_828, 12, DEFAULT_MIX)`, step 11 'stretch
  (rekeyed), L1'; F2 = `t.log.faces[up].changed.push(c)`); M0-d-04-notes.md N-s2c-2, N-s3-1;
  `relevel.ts` `facePass` (the re-parent `setFacesParent(p, up, c, sv.f)` today :1025); insert/rewalk.ts's listing of
  its re-parents (:575-578, "the commit record lists them"); tx.ts `dirtyFaces` (dedupes, classifies against the batch
  frame); test/digest/levelDigest.test.ts `oracleRun` (:36, d-04's; read only).
- *Required change:* beside the re-parent write, `t.log.faces[up].changed.push(c)` for every child whose parent it
  changes (only those: `Fu.parent[c] === r.f` before the write). d-04's F1 re-read stays (its narrowing is Q95's tail for
  a later d-04 touch, not this round).
- *Pin:* a tx test (this item's) replays the B-1 sequence with fuzzgen (the same seed, steps and mix as d-04's
  `oracleRun`, the batches' code reused, not the digest oracle) and asserts, at every commit, that every level-(l+1)
  record live before and after the batch whose parent's face key changed is in the record's `faces[l+1].changed` (or
  `created`). Red at step 11 without the fix (F2-OFF). A constructed second case: a removal whose merge re-parents two
  children, one of which is also re-walked (listed once — DUP mutant: a duplicate in the list, red through the record's
  length).
- *Declared shift:* commit records' `faces[*].changed` gain the re-parented records on such batches; the maintained
  digests are unchanged (equal to the recomputation, as F1 already made them); the transaction layer's golden probe (S7's
  52 940 batches; a scratch probe, not a committed file) moves only on batches that re-parent on a removal.

**LINE 6 — the leg's shift, declared and gated (measurement row).**
- *Required change:* base → tree, the S7 golden probe (the before-file in the base mirror, the after-file in the
  self-check mirror): every changed line is a Q95 batch (its record's `changed` grew by the re-parented children and by
  nothing else); the refusal census identical (rule (4)); the roots fusion 3 / integrated 4 identical (no `shape` row is
  written by any src path in this leg); NEAR at full strength, RELATED@1000 over every changed source; the reds = the
  session's measured list + Q152's six + J176's Mac-reference tests, nothing else.
- *Lists for the seams:* any other item's test that pins a generation value and reds under the form taken (none is
  expected under the recommended form); the design sentences of (c) for §2.2 rule 3, §3.3 and §3.4.

### LEG 3 — M0-a-05 S15 (owns: insert/{stretch,crossings,snapRound,wedge,rewalk,insertChain,index}.ts, test/insert/step3-5/)

S14 is in flight on the same files (its entry: pass 5 in insertChain.ts after `passes`; Q77's helper in stretch.ts
replacing the comparisons in `withinSegment` / `passesWithin` / `inInputBound` / `inFidelity`; R-12 and FAR1 pins in
`cutBack` / `tryCuts`; s14-rescues.json; caps.ts and router.test.ts's ratchet; the N-7 GOLDEN re-recorded). Every anchor
below is by symbol; S14 moves the numbers, possibly the bodies around them.

**LINE 1 — the write: `(shape, chain)` on a chain's own point landed on another chain's run it shares on both sides.**
- *Evidence:* rulings-hardening-1.md §2 (Ruling, Code consequence, Design-doc amendment); M0-a-05-notes.md N-23 (:38),
  the RQ2 row (:347) and item 3 (c); `insertChain.ts` `insertChain` (:1185) → the `run` closure's tail — after
  `rewalk`, the reentry refusal and `W_SNAP_PASSES`, the loop "The knot rows onto the vertices their points became"
  (today :1576-1585: `addRole(p, v, …, n)` guarded by `carriesRow`); `stretch.ts` `applyLanding` (:655) and
  `ownShapeVertex` (:682: today clears the flag only when every row on the sub-edge is this op's own; a sub-edge with
  another key's row keeps VERTEX_SPLIT — C-0302 (3)); `relevel.ts` `dissolvable` (the predicate the guard answers);
  finding (0) 4 and 5.
- *Required change [OPEN (f) 1, 2, 6]:* in `run`, after the knot rows and before `return ok({ placed })`, for every
  distinct vertex v of the chain's landed points (`landed[i]` over the decimated points) such that v carries
  VERTEX_SPLIT and not VERTEX_PINNED, has exactly two incident edge pairs of one level, and their row sets are identical
  and contain a row of the chain's own key at level n AND a row of another key: for each distinct entity e of the chain's
  non-indexed rows (`ctx.rows`) whose row is on both edges, `addRole(p, v, { role: 'shape', entity: e }, n)` unless v
  already carries `(shape, e, 0)` (the knots' `carriesRow` guard). Nothing in `applyLanding` / `ownShapeVertex` changes
  (their flag rule stands). Written inside `run`, so every pass that commits (S14's pass 5 included) writes it, and a
  refused pass writes nothing (the op's rollback; `unsplit` also removes a vertex's rows).
- *Pins:* (a) THE REGISTER KIND `coincident-foldback` — register/s6-lifecycle.json gains one case and lifecycle.test.ts
  `KINDS` one entry (both this item's): N-23's P3 re-run first on the S15 base; if C's fold-back no longer commits as
  N-23 recorded (RQ1's cut back), the case is the straight form — A `invisible` L2 (3142, 2862)–(499, 2966); C
  (3142, 2862) (1800, 2915) (499, 2966); x (0, 3501) (735, 705) (2456, 2886) attached at v (1800, 2915) — the builder
  confirming each landing. Held: C's commit writes exactly one `(shape, C, L2)` row on v; x inserted and removed →
  print, chunk refs and level digests equal to before x; C removed → A restored exactly (7 → 6 vertices only then, or
  the straight form's count), print/refs/digests equal to A alone. W-OFF (no write) red. (b) a T-junction control (a
  chain ending on another chain's edge, degree 3) and a pure-own point (a chain overlapping itself, its flag cleared by
  `ownShapeVertex`) carry NO `shape` row — W-ANY (the degree-2 / identical-rows test dropped) red, W-ONEKEY (written when
  the rows are the chain's own only) red. (c) a chain of two rows of two entities writes one row per entity on both
  edges (W-FIRST — only `roles[0]`'s entity — red) [OPEN (f) 6]. (d) bfuzz's constructive coincident family (gen.ts
  kind 'coincident') with the extended `dissolvableProblems` (LINE 2) after every commit: green; under W-OFF red.

**LINE 2 — `dissolvableProblems` extended (this item's own test oracle; NOT M0-a-14's).**
- *Evidence:* `test/insert/step3-5/support.ts` `dissolvableProblems` (:334-351: today a flagged degree-2 vertex
  between identical rows is a problem only when the rows are one key's or none — `keys.size > 1` skips the coincident
  class); its callers lifecycle.test.ts, reentry.test.ts, bfuzz.test.ts (:28-40); RQ2 Pins.
- *Required change:* a flagged, unpinned, degree-2 vertex between identical rows of two or more keys is ALSO a problem
  unless it carries a `shape` row whose entity is one of those rows' entities. The header comment restated (the
  coincident class is no longer "kept flagged" bare: its guard is the `shape` row, RQ2).
- *Pin / mutants:* a planted state (A and C with v, the `shape` row removed by hand) reports exactly one problem naming
  v; DP-OLD (the extension dropped) red on it; DP-ANY (any `shape` row accepted, entity unchecked) red on a planted row
  naming a third entity.

**LINE 3 — RQ2's second pin: the pass4 wall-on-bank case.**
- *Evidence:* rulings-hardening-1.md §2 Pins ("the pass4 wall-on-bank case with a lane ended on a wall vertex and
  removed (the vertex survives; its removal with the wall restores the bank)"); lifecycle.test.ts `KINDS` 'pass4' and
  register/s6-lifecycle.json's pass4 case; C-0302 (3).
- *Required change:* a pin in lifecycle.test.ts on the pass4 case's arena: find the two-key own points of its last
  chain (they now carry `shape` rows), end a lane on one in a later batch and remove it → the vertex survives; remove
  the chain → the other chain's run is restored exactly. If the pass4 arena on the S15 base holds no such vertex, the
  case is constructed (a wall on a bank with an interior wall point on the bank's edge) and the notes say so.
  W-OFF red.

**LINE 4 — `shape` is kernel-internal: no caller names it [OPEN (f) 9].**
- *Evidence:* `insertChain.ts` the knot check (:1192-1196: `check(id >= 0 && roleInfo(id).kind === 'vertex', …)`
  accepts any vertex role, `shape` included); ARCHITECTURE.md §3.4 *The doors* ("insertChain's vertex rows
  (opts.knots) and splitThrough's row the only doors for adding a vertex role row").
- *Required change:* the knot check refuses `shape` (a programming error, thrown before anything is read or charged,
  the message pinned verbatim). Mutant KNOT-SHAPE red. (Leg 2 does the same for removeEdges' VertexRef and retypeEdges'
  `add` if the session rules (f) 9 that way; `splitThrough`'s `row` is M0-a-04's — LISTED, not built.)

**LINE 5 — THE ROUND'S CONTENT SHIFT, declared and gated (S14's LINE 12 form).**
- *Evidence:* bfuzz.test.ts N-7 `GOLDEN` (:460-461; contentPrint per case over constructive seeds 1–200 — RQ2 names
  constructive seed 1); the census per-case logs; the step3-5 registers; the lifecycle register; the roots fusion 3 /
  integrated 4; other items' goldens: model/test/digest/roots-golden.json (d-04), layout/test/districts/collinear.test.ts
  :149 (e-04), q133.test.ts; M0-a-06's S7 golden probe and its extra families' refusals N-s7c-1 / N-s7c-2
  (M0-a-06-notes.md :514-515: "RQ2's `(shape, way:9)` vertex row would end `restoreSplit` before the trigger").
- *Required change:* base (the leg-2 tree) → tree: (i) every changed census / N-7 case is a commit whose arena gained
  `shape` rows (its outcome, code, warnings and placed points identical) — or a later chain of the same sequence whose
  route a `shape` row changed, each named; an outcome change with no such source FAILS; (ii) the N-7 GOLDEN re-recorded
  with its changed-case count (this item's file, on S14's value); (iii) the roots — a moved root DECLARED with the stage
  and arena where the first `shape` row appears; (iv) other items' tests that move (owner, file, test, before, after) —
  DECLARED and LISTED, never edited; (v) N-s7c-1 / N-s7c-2's three batches replayed: commit or not, reported to the
  session (a commit lowers a-06's extra-family count; it is not this leg's census); (vi) the refusal census of the
  item's families never rising.

---------------------------------------------------------------------------------------------------------------------

## (b) The round-specific text for each leg's `session` clause (the JSON files carry it whole)

**Common to the three legs.** THIS IS LEG n OF A MERGED ROUND (the MERGED-ROUND RULE, J443): M0-a-02 S4 → M0-a-06 S10
→ M0-a-05 S15 on ONE tree and ONE branch, no reset between, each leg its own build, closing check, LANDED line and
record; leg n + 1 launches only after leg n's workflow returned ok with verdict pass. RULINGS BINDING: J757 (RL4: the
`shape` role enters at M0 as one step; R10: the restore generation closes Q76, built and pinned in leg 2), J358 / N-61
(2) and rulings-hardening-1.md §2 (RQ2), J237, J238, J264, J631 (2) (a) (this spec took its adversarial review). THE
GATE: the round opens on the head of M0-a-05 S14's landing (hash filled at launch) or later, when few rounds are in
flight. THE MEASURED LIST: the session's measurement (version raised, whole suite) is appended to each entry as the
DECLARED REDS of the raise; a red on it is never a failing line of any leg; the three legs re-record their own items'
pins and the session's seams re-pin the rest in the landing commit. Declared reds of the head besides: Q152's six
(M0-a-09's bands tests, if S20 has not re-pinned them), J176's Mac-reference bench tests, Q153's flake.

**Leg 1 adds:** the version raise is a PERSISTED-FORMAT change the session ruled (J757), so rule (3)'s "a record or file
format … is NOT yours" is lifted for LINE 1 alone; the declared shift is the header byte and every chunk ref, nothing
else; the leg LISTS (not edits) API.md:61, the gate test's header, the design text. NO other row moves output.

**Leg 2 adds:** THE WRITE SCOPE = the owns + io/compact.ts `compactSlots` (one statement after `createPlat`, before
`attachIndex`) and io/decode.ts `rebuild` (one statement after `createPlat`, before `attachIndex`) with the import —
nothing else in either file; the scope-diff and re-landing mechanics of S9's entry (the lender M0-a-15's record
re-landed by the session on session/a06s10-scope-1). The `shape` rows its pins need are PLANTED; leg 3 writes them. The
two contract readings it builds by ruling: R10's generation for copies; the pin rule's `shape` exclusion (if ruled).
Declared shift: Q95's dirty sets only.

**Leg 3 adds:** no cross-item scope (`dissolvableProblems` is this item's); built on S14's landed head — re-read every
cite; the round number re-keyed if S14's workflow ran fix rounds (S15, S16 … taken: the next free key in
docs/lane-events.log); the write sits at the chain's commit (OPEN (f) 1); DECLARES the content shift (LINE 5) and LISTS
every other item's moved test for the seams.

---------------------------------------------------------------------------------------------------------------------

## (c) The design text the session adds (docs/ARCHITECTURE.md; ARCHITECTURE-FULL.md regenerated after)

1. **§2.2 rule 3, *The `split` flag*, after "A chain's own shape vertices never carry it."** — RQ2's sentence verbatim:
   "A vertex that is both — a chain's own point landed on another chain's run it shares on both sides (§3.11's collinear
   overlap) — keeps the flag and carries a vertex row `(shape, chain)` that the chain's removal strips: the row holds
   the vertex while the chain lives (the dissolution rule's 'no vertex role'), and its removal lets the flag restore the
   other chain's edge exactly." Proposed addition after it: "`insertChain` writes the row at the chain's commit, on each
   of the chain's own points that its insertion leaves as a `split` vertex of degree 2 between identical rows of the
   chain and another key; `removeEdges` (the chain, or a stretch through the point), `clearFiner` and a `rekey` that
   moves the chain treat it as they treat the chain's knot rows."
2. **§2.2 rule 3 (b), the pin sentence** [if (f) 3 is ruled as recommended]: "A vertex from which the batch strips its
   last vertex role row other than knot rows **and `shape` rows** loses its kernel `pinned` flag …".
3. **§2.2 rule 7's table, the vertex row, at its end (after `deck_order_knot`'s parenthesis)** — rank last, as the
   registry appends it: "…; and the kernel-internal **`shape`** (`('shape', chain entity, 0)`: a chain's own point on
   another chain's run it shares on both sides, rule 3; written by `insertChain` alone and stripped with the chain —
   no stage, record or caller writes or names it; registry version 2)". And one sentence after the table's paragraph:
   "The registry is append-only: a later version appends rows at the next id and the next rank, so a later row reads
   after every earlier one."
4. **§3.4 *The doors*, after "… the only doors for adding a vertex role row"**: "— and `insertChain`'s own `shape` rows
   (§2.2 rule 3), which no caller writes".
5. **§3.4 *Stretches (J-K31)*, "before the stretch's rows and its interior knot rows leave"** → "before the stretch's
   rows and its interior knot and `shape` rows leave".
6. **§3.4 *Arenas, keys and services*, after "valid until that arena's next commit (§2.2 rule 5)"** (R10): "; a copy of
   an arena — compacted on save or loaded (§3.9) — is another arena state, on which no slot or stamp read on the
   original is current (the copy takes a fresh restore generation; nothing is stored in the block)".
7. **§3.3 *The commit record*** (Q95): after "of the display list's dirty set (`faces`, `owners`; §8.1)": "— `faces`
   lists every record a writer created, changed or removed at each level ≥ the batch's, a record re-parented by any
   writer (the re-walk's, a removal's merge into a survivor) among the changed".
8. **§3.3 or §3.4 (`faceNeighbours`)** (Q78): "Every writer returns — committed op or refused — with each level's live
   face records owning disjoint rings (§2.2 rule 1 holds between the ops of a batch, not only at its commit), so a
   service called between two ops reads one record per region."
9. **§3.9 (optional, the persisted consequence)**: "Each chunk names the role registry version it was written under; a
   load reads a chunk of that version or an earlier one (rows are append-only, §2.2 rule 7) and refuses a later one as
   a corrupt cache."

**plat/docs/build/M0.md:** no change is required (its M0-a-02 line names "the role registry data (`roles.json`,
C-0005)" without a count). **M0-s-02 / the tables item:** none — the roles are kernel data (C-0005); Q79's "M0-s-02
(tables)" closes with no round. **M0-world-sites-gate.md K5:** its "append a role in a test; goldens unchanged" holds
for digests; a note that the block's header byte moves is the session's.

---------------------------------------------------------------------------------------------------------------------

## (d) Persisted-format consequences

- **A version-1 chunk under version 2.** `decode.ts` `parse` reads the header's registry version and needs it
  `<= ROLE_REGISTRY_VERSION` (:97): 1 ≤ 2 passes. Its role ids are all < 56 (version 1 had 56 rows), and `need(role <
  ROLE_REGISTRY.length)` (:164) passes. The arena loads identically. Its re-encoding writes version 2: one byte differs
  (offset 6; `uv(1)` and `uv(2)` are both one byte, so lengths are unchanged), and the ref differs. A version-2 chunk on
  a version-1 decoder is refused ('a chunk written under a newer role registry') as a corrupt cache (§3.9: the document
  loads by replay, M1). Gap: nothing checks that a chunk's rows carry no role whose `since` exceeds the chunk's version
  (a version-1 header naming id 56 would load) — OPEN (f) 4.
- **Committed fixtures or goldens of ENCODED bytes:** none found. Searched: every file importing `encodeArena`,
  `decodeArena`, `compactSlots` (kernel/test/{io,tx,gate,facade,hash,arr/bands,insert/step3-5}, testkit/src/{determinism,
  invariants,constructive}, testkit/test/{kernel/io,runner,layout}); literal 32/64-hex strings and 4-word Hash128 arrays
  in plat/packages and plat/bench (hits: murmur vectors, bfuzz N-7 GOLDEN, roots-golden.json, collinear.test.ts,
  worklimits summary hashes, parity / crosshost test vectors — none hashes chunk bytes); the bench summaries
  (docs/build/summaries/M0-k-04.json carries encodeArena run counts only). Every chunk-ref comparison in the tests is
  RELATIVE (before vs after in one run: step3-5 support.ts `snapshot().refs`, tx/support.ts `snapshot`, the lifecycle
  register, format.test.ts's byte diffs between two arenas, testkit io round trips) — unaffected by the raise.
- **Goldens that move with LEG 3 (content), not with the raise:** bfuzz.test.ts N-7 GOLDEN (contentPrint; this item's),
  model/test/digest/roots-golden.json (level digests; d-04's — only if city1 or the arena fixture holds a two-key own
  point), layout/test/districts/collinear.test.ts :149 (e-04's — likewise), the step3-5 registers' pinned prints if any
  case holds one, the CITY roots in the notes of every later round.
- **The session's measurement so far (read from /home/user/maps-scratch/rq2/, 36 of the units done at the time of
  reading, PLAT_FUZZ_RUNS=25):** red units — kernel/test/arena (roles.test.ts, 3 tests: the expected re-pins);
  kernel/test/arr (Q152's six bands tests — declared reds of the head, not the raise); kernel/test/insert (step1-2
  bfuzz.test.ts:204 'every branch of step 2 is exercised' in kernel and kernel-tiny — a coverage precondition at 25 runs,
  a strength artefact); bench calibrate / host / timing / site (J176's Mac reference and the reduced strength). Green:
  kernel/test/{io, digest, gate, facade, tx, faces, geom, index, invariants, warp, …}. Every red should be confirmed
  against the BASE at the same strength before it enters the list.
- **No fixture must stay readable as an old-version fixture**, because none is committed. Recommended: leg 1's
  version-1 decode pin IS that fixture (built in the test from a fresh arena, patched), so the old version's
  readability is pinned without a committed binary.

---------------------------------------------------------------------------------------------------------------------

## (e) Every other place that enumerates or counts roles, or reads vertex rows by kind (grep evidence)

| place | what it reads | moves? | who |
|---|---|---|---|
| plat/packages/kernel/src/arena/roles.json | the rows, `version` | yes (leg 1) | M0-a-02 |
| plat/packages/kernel/test/arena/roles.test.ts :62-63, :86-89, :97, :101-105 | version 1, length 56, `roleInfo(56)` throws, `since: 2`, append at 56 | yes (leg 1 re-pins) | M0-a-02 |
| plat/packages/kernel/test/gate/roles.test.ts | generic (committed + 1); header :1-8 claims the block is kept | green (measured); header text stale | the session (gate) |
| plat/packages/kernel/API.md :61 | "56 named roles" | text | the session |
| docs/ARCHITECTURE.md §2.2 rule 7 table; docs/ARCHITECTURE-FULL.md | the role list | text | the session |
| plat/packages/kernel/src/arena/registry.ts | `RoleInfo.rank` doc "version 1: rule 7's table order" | comment (optional) | M0-a-02 |
| io/encode.ts :377, io/decode.ts :97, :164; test/io/corrupt.test.ts :62, :316 | the version and `ROLE_REGISTRY.length` | generic, green | M0-a-15 |
| test/insert/step3-5/insertChain.test.ts :270 | edge roles with LINEAR_PARTS 1 | `shape` is a vertex role: unaffected | M0-a-05 |
| tx/relevel.ts `rewriteRows` :579-600 | the pin rule's `knot` test | yes if (f) 3 | M0-a-06 (leg 2) |
| tx/relevel.ts `dissolvable`, `dissolve`, `restoreSplit` | any vertex row | no code; behaviour by design | M0-a-06 |
| tx/writers.ts `knotRowsOn`, rekey :431-439, `clearFinerIn` | knot / non-knot vertex rows | leg 2 | M0-a-06 |
| tx/tx.ts `sweepVertexRows` | every changed vertex row → `record.roles` | records gain `(shape, e, 0)` keys (leg 3) | M0-a-06 |
| arena/resolve.ts `signature` / `vertexSignature` | every vertex row | `VertexSig.v` gains `shape` rows (leg 3) — OPEN (f) 12 | M0-a-02 |
| digest/levelDigest.ts `chainItem`, :751 | (role, entity, ordinal) keys, name and rank | `shape` keys hashed (leg 3), by design | M0-d-04 |
| invariants/whole.ts `references` | indexed vertex roles: one vertex per ordinal | non-indexed `shape` skipped | M0-a-14 |
| warp/held.ts :124, :204-205 | the held set by name | `shape` not held (moves with its chain) | M0-a-13 |
| insert/splitThrough.ts :116, :139; invariants/batch.ts :503-507 | `anchor` by name | unaffected | M0-a-04 / a-14 |
| layout/src/growth/boundary.ts :609, infill/bentCutFabric.ts :1024, districts/faces.ts :115, districts/seams.ts :134, fields/sources.ts :63 | rows filtered by name | unaffected | layout items |
| model/src/digest/model.ts :369 | `dirty.roles` entities | a `shape` key marks its chain's entity dirty | M0-d-04 |
| testkit/src/determinism/print.ts :50, :174 | role names in prints and record keys | prints move where rows exist (leg 3) | M0-d-08 |
| testkit/src/determinism/renumber.ts :285 | role kind | generic | M0-d-08 |
| plat/tools/lint/directives.test.mjs :106, coverage.test.mjs :192 | `roles.roles.length` in a fixture | generic | M0-d-07 |
| kernel/src/types/refs.ts :10 | `RoleName = string` | no union to extend | M0-a-01 |
| @plat/tables | no role rows (C-0005) | none | M0-s-02: no round |
| the design table's `passage` (rule 7, "appended without digest change, K5") | not in roles.json | when appended (M-SITE-A) it takes id and rank 57 | — |

No testkit generator, oracle or façade row enumerates the registry (grep `ROLE_REGISTRY` outside the kernel: none).

---------------------------------------------------------------------------------------------------------------------

## (f) Open questions for the session's ruling (options; recommendation)

1. **Where is the `shape` row written?** (a) At the landing (`applyLanding` / `ownShapeVertex`, RQ2's text); (b) at
   the chain's commit, in `run` beside the knot rows, under the exact predicate. RECOMMEND (b): at a landing the chain's
   rows are not yet on both sides (finding (0) 4), so (a) either misses the general class or must write on every own
   point that splits another key's run, which includes every T-junction end (finding (0) 5).
2. **Which own points?** (a) `placed` / `landed` points only; (b) every vertex the op wrote. RECOMMEND (a): a step-3
   join, leave or crossing vertex has degree ≥ 3 while the chain lives. A gap stays: a chain whose own point lands on an
   EXISTING split vertex of the shared run (degree 3, made by a third chain B) gets no row; B's later removal then
   dissolves the chain's own point — history-dependent. Ruling it in would need a write at B's removal (a tx-side
   write), not in this round's three parts. RECOMMEND: carry as a notes row (M4 canonical-form, N-13's kin).
3. **The pin rule** (relevel.ts :579-600, §2.2 rule 3 (b)): (a) `shape` counts as a feature row (today's code would
   keep a pin alive on a `shape` row after the feature's row is stripped); (b) `shape` is excluded like knot rows.
   RECOMMEND (b), in leg 2, with the design sentence (c) 2.
4. **A version-1 header naming a version-2 role.** (a) Accept (today); (b) refuse a row whose role's `since` exceeds
   the chunk's version (a one-line check in io/decode.ts `parse`, M0-a-15's). RECOMMEND (b) as a queue row for M0-a-15's
   next round — not this round (its write scope would widen to io/decode.ts's parser for a check no fixture needs yet).
5. **The generation's form for copies (R10).** (a) "+1" of the source (inexact: the collision sequence; undefined for a
   load); (b) one process-wide sequence for every move, restores included (exact, but every pinned generation value in
   savepoint / resolve / stamps / levelDigest tests moves); (c) restores keep `+ 1` on an original, copies take a
   process-wide NEGATIVE token, and a copy's restore takes the next token. RECOMMEND (c): exact, and every existing
   generation pin stays green. Stored where: `RESTORES` (WeakMap beside the arena) as now plus one module-level counter in
   savepoint.ts; never on the Plat, never in an image, never persisted.
6. **The entity of the row for a chain of several rows.** (a) `roles[0].entity` (the knots' default); (b) one row per
   distinct entity of the chain's non-indexed rows on both edges. RECOMMEND (b): removing one of two chains that share
   the input would otherwise leave the other's own point unguarded. The known limit: two chains of ONE entity under two
   roles share one `(shape, e)` row (the strip by either removes it); no M0 pipeline inserts such a pair coincidently.
7. **Order of the strip.** The knot rows and the `shape` rows go into ONE `strip` Set and ONE `rewriteRows`; the
   order only decides free-list slot order, which no output reads (`record.roles` is sorted in rule 7's order).
   RECOMMEND: after the knot rows, stated as order-free.
8. **retypeEdges' `remove`** that strips a chain's last edge row of its entity leaves that entity's `shape` rows behind.
   (a) Leave it (RQ2 names removeEdges and clearFiner only); (b) strip the entity's `shape` rows on vertices where no
   edge row of the entity remains on both incident edges, in `retypeEdgesIn`; (c) a generic post-strip in `rewriteRows`
   for every writer. RECOMMEND (b) in leg 2, with a pin (wallToWay-style retype of a whole chain) — or (a) with a
   notes row if the session keeps the round to J757's three parts.
9. **Callers naming `shape`.** (a) Allowed (today: insertChain's knots accept any vertex role; removeEdges and
   retypeEdges accept any registered role); (b) refused as a programming error in insertChain's knot check (leg 3),
   removeEdges' VertexRef and retypeEdges' `add` (leg 2); splitThrough's `row` LISTED for M0-a-04; the façade
   untouched (it reaches through these). RECOMMEND (b) — "kernel-internal" otherwise has no guard.
10. **Message texts.** The stale-slot messages (arena/resolve.ts `assertStamp`, facade/stamp.ts `assertStamped`) say
    "(a savepoint was put back across committed batches since)"; for a copy that is not the cause. RECOMMEND: keep them
    verbatim (J263 Q6; pinned), the choices row recording that the parenthetical also covers a copy.
11. **Q78's answer.** (a) A design sentence only; (b) a test only; (c) both. RECOMMEND (c): the oracle test in tx and
    the sentence (c) 8.
12. **`VertexSig` and `shape`.** `signature` returns every own vertex row, so a two-key own point's signature gains
    `(shape, e, 0)` and the vertex becomes "editable" by §7.1's rule (a vertex role). RECOMMEND: no change at M0
    (arena/resolve.ts is M0-a-02's and nothing reads signatures before M2a); a notes row for M2a's edit layer to rule
    whether a `shape` row makes a vertex editable.
13. **Is `shape` indexed? Does it rank last?** RECOMMEND not indexed (RQ2: "indexed by nothing"; an indexed role would
    need one vertex per ordinal and a history-dependent ordinal allocation) and rank 56 = id (append order; rank last,
    after the knot roles; every version-1 rank unchanged).
14. **The measurement's reach.** The version-only measurement does not include leg 3's content shift. (a) Measure a
    second scratch tree with leg 3's write before launch; (b) leg 3 measures it in-round (LINE 5) and the landing
    commit's seams take its list. RECOMMEND (b), with the adversarial review told that leg 3's list is not yet known.

---------------------------------------------------------------------------------------------------------------------

## (g) Weak points for the adversarial review

1. **The predicate in leg 3 LINE 1** is the whole risk: too broad and every pipeline arena gains rows (roots move
   everywhere); too narrow and the guarded class leaks. Attack it with: a T-junction; a chain's end on another's run
   shared on one side only; a chain whose interior point lands on an EXISTING split vertex; a closed chain whose seam
   point is a two-key point; a chain that shares a run at a finer level (L2 along L1 — v a Steiner vertex of level 2,
   the row at L2, the coarser route untouched).
2. **The register case may not exist as N-23 recorded** (finding (0) 7). If the straight form's interior point is
   decimated or attracted to an existing vertex, the case is constructed elsewhere; the checker must see the row written.
3. **Non-indexed vertex key on many vertices.** `(shape, e, 0)` may stand on several vertices — the first vertex role
   used that way in practice. `resolve(VertexRef('shape', …))` and `signature` (debug check `vs.length <= 1`) would
   misread it; nothing should call them with `shape` (f 9). Attack every path that assumes one vertex per vertex key.
4. **The pin rule (f 3)** — if not ruled, a `shape` row silently keeps a kernel pin alive after a gate's or junction's
   row is stripped.
5. **R10's form (f 5)** — the "+1" form passes P16's two literal probes and fails the collision sequence; the review
   should demand the collision pin. Also: a copy's maintained level digests and the façade's side-table stamps must be
   attached AFTER the generation moves (G-LATE).
6. **Q95's listing** may move other tests that pin a commit record's exact `faces` lists (d-04, x-06, d-08 harnesses)
   — measured by leg 2, not predicted here.
7. **Leg 3's shift may reach other items' committed goldens** (roots-golden.json, collinear.test.ts, q133 expectations)
   only if the M0 pipelines produce two-key own points; nothing in the sources measured that. The review should not
   accept RQ2's narrow declared shift as evidence.
8. **The merged round's ordering.** Leg 2's strip pins rely on PLANTED rows; a planted row could pass where the written
   row differs (level, entity). Leg 3's pins must re-run leg 2's removal pins on WRITTEN rows (lifecycle register).
9. **S14's head.** S14 changes insertChain.ts's pass structure, stretch.ts's comparisons and the N-7 golden; if S14
   lands with a fix round, its keys S15 / S16 are taken and leg 3 is re-keyed; the RESUME head must be S14's LANDED head,
   never a mid-round tree.
10. **The measured list's artefacts** — reduced-strength reds (step1-2 bfuzz coverage, bench site) and base reds
    (Q152, J176) must be separated from the raise's reds by a base run at the same strength, or a leg's check will
    "declare" a red the raise did not cause.
11. **retypeEdges' `remove` (f 8)** and the history gap of (f 2) leave the guard incomplete by design; the review
    should check that both are written down as notes rows, not silently dropped.
12. **The gate test's comment** (test/gate/roles.test.ts) and K5's wording claim the block is unchanged by an append;
    after this round that is false for the header byte. Text only, but a reader of K5 is misled until the seam edits it.
