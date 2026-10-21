# a09-s9-spec / read-code — the code M0-a-09's S9 (Q18 perf) round changes and touches

Seat: reader `a09-s9-spec/read-code` (Opus/high), 2026-10-19. Read-only: no test run, no build, nothing measured. Every
claim cites file:line on this tree (branch claude/great-galileo-b4mzbq) and is tagged [STATED] (the text says it),
[OBSERVED] (checked in the repository) or [INFERRED]. Paths are relative to `/home/user/maps-architecture/`; `K` =
`plat/packages/kernel/src/`, `KT` = `plat/packages/kernel/test/arr/bands/`, `TK` = `plat/packages/testkit/test/kernel/arr-bands/`.

Disclosure: one read-only `git -C … ls-files | head -0` slipped into a listing command (no output, no effect); no other git.

---

## (a) kerb.ts, whole, and winding.ts's overlayRegion

**File.** `K/arr/kerb.ts`, 930 lines [OBSERVED]. Imports: `faceWalk, idOf, isFaceLive, outgoing, roleInfo, rowsOn` from
`../arena/index.js` (:49); `type InsertTx` from `../insert/classes.js` (:50); `nearParallel` (:51); `cutKnot, knotLines,
routeLines` from `../tx/profile.js` (:53); `check` from `../tx/state.js` (:54); `bufferParts, SAGITTA_CM` from `./buffer.js`
(:56); `canonicalRing, compareRings, overlayRegion, type Ring` from `./winding.js` (:57) [OBSERVED].

**Header contract (:1–:48).**
- §3.7 quoted: "`kerb` is also a read-only service on the faces of an open transaction's overlay", "the one function S8
  plans on and `corridorUnion` commits (the contract S8 ≡ S9, §4.6)" (:7–:8) [STATED].
- J318/C-0380 reading of "F's bounding spines": every (role, entity) chain incident to F on a route edge AND through a
  route vertex (vertex-only), whose buffer meets F (:9–:12) [STATED].
- Construction: F's L1 route rings; spines with positive half-width from the caller's `SpineWidths`; each spine's whole
  own-level route (`routeLines`) sampled per route vertex (scalar or knot profile via `knotLines`/`cutKnot`); strips,
  round joins, declared ends via M0-a-08's `bufferParts`; **"then one overlay on the scratch arrangement: F's rings one
  operand, every part the other, kept where F is inside and no part is (`offsetFace`'s construction)"** (:14–:27)
  [STATED]. Staged read J264/C-0381 where the one overlay "finds no route" (:27–:29) [STATED].
- Readings C-0212: (1) `kerb(tx, face, widths)` takes the open transaction first, widths via the caller (:31–:34);
  (2) a spine is read near F only — a segment farther than 2·max hw + sagitta + 4 cm adds nothing (:34–:37); (3) an
  empty kerb is `ok([])` (:37–:39); (4) a spine-less face gives its own L1 route rings, outer first (:39–:40) [STATED].
- Representation-free (§3.3, C-0207 (5), C-0230): every order from geometry and entity ids (`spineKey`), canonical
  ring starts (:42–:48) [STATED].
- **Nothing in the header (or anywhere in the file) names S9 — the round** [OBSERVED]; "S8 ≡ S9" is the §4.6 contract
  that S8's kerb read (stage S8) equals S9's commit (stage S9, corridorUnion), not this round.

**Exported types.** `SpineEnd` (:60), `SpineWidth {halfWidthCm, ends?}` (:66–:69), `SpineWidths = (chain: ChainRef) =>
SpineWidth | null | undefined` (:75), `Spine` (:78–:87), `RouteEdge` (:90–:97), `KerbRead {face, rings, edges, spines,
kerb, splits, warnings}` (:100–:113) [OBSERVED].

**readFace (:193–:294)** `readFace(p: Plat, face, widths, cache = new Map(), vertexContacts = true)` → `{rings, edges,
spines, base?, staged?}` [OBSERVED].
- Asserts a live L1 face (:206). Walks `faceWalk(p, 1, face)` (:216); keeps half-edges whose origin level ≤ 1 (the L1
  route, :218); rotates to the canonical start (`canonicalStart`, :139–:152, :220).
- Per route edge reads `rowsOn(p, 'edge', h)` rows of level ≤ 1, ordinal 0 (:229–:230), keys them `spineKey` (:231),
  asks `widths(chain)` once per key with `cache` (:232–:238), `readSpine` (:155–:183) samples hw per route vertex
  (:156 `routeLines(p, chain, p.key)`).
- Holes sorted by `compareRings` (:248). Returns early without vertex contacts when `vertexContacts` false (:258).
- J318 census: `outgoing(p, e.a)` of every route vertex, edges of level ≤ 1 not F's own (:259–:274); reads their widths
  (:275–:285); **calls `kerbOf(rings, spines)` (:287) — a full scratch overlay of the edge spines — whenever any
  vertex-only spine exists**, then `reaches` (:316–:341) filters (:289); returns `base` (:290) or `staged` (:293).
- Pure reader of `p`: no writes [OBSERVED: only `faceWalk`, `rowsOn`, `outgoing`, `roleInfo`, `idOf`, typed-array reads].

**kerbParts (:417–:427)** box of F's rings (`boxOf`, :344–:358), spines in key order (:420), `spineParts` (:364–:411):
per run, segments within `2·max hw + SAGITTA_CM + 4` of the box kept (:374–:377); a whole closed ring buffered once
with flat ends (:381–:385); else maximal runs (:388–:401); each run `bufferParts([pts], ws, 'round', ends)` (:405)
[OBSERVED]. Pure geometry: no arena read [OBSERVED].

**The staged read (:436–:455, C-0381)** `lessParts(rings, base, baseWarnings, through)`: the vertex-only spines' parts
near F's box (:444–:450); none → base copied (:451); else **a second `overlayRegion([base, parts], w[0]≠0 && w[1]=0)`**
(:452), `unspiked`, filtered, sorted (:454) [OBSERVED]. `MOVE_CM = √2·attractCm + SAGITTA_CM` (:461).
**clearOf (:470–:489)** every vertex of the rings stands at least `hw(t) − MOVE_CM` off each vertex-only spine segment
(perpendicular-foot interpolation, :481–:483); the staged result is accepted only if every `through` spine is clear
(:542) [OBSERVED].

**kerbOf (:492–:501) — exactly what it builds per face.** `spines.size === 0` → `ownRegion(rings)` (:493, :430–:434: no
overlay); else `kerbParts(rings, spines)` (:494); no parts → `ownRegion` (:497); else **`overlayRegion([rings, parts],
(w) => w[0] !== 0 && w[1] === 0)`** (:498) → `unspiked` each ring (:508–:526), drop < 3 points / zero area, sort by
`compareRings` (:500) [OBSERVED]. Through `overlayRegion` (`K/arr/winding.ts:706–:717`): `buildOverlay(operands)`
(:710) → `windingLabels` (:712) → `traceKept` (:714) [OBSERVED]. `buildOverlay` (`winding.ts:112–:197`), per call:
1. every ring of every operand split into segments, de-duplicated by an undirected key with per-operand multiplicity
   (:122–:155) [OBSERVED];
2. **a NEW arena** `createPlat(SCRATCH_KEY = {layer:'ground', part:0}, {widthCm = heightCm = 2·LATTICE.rangeCm, …})`
   (:156; `SCRATCH_KEY` :52) with default capacity (`K/arena/plat.ts:197–:199`, grown on demand) [OBSERVED];
3. **a NEW spatial index** `attachIndex(plat, {gridCellCm: gridCellFor(box, segments)})` (:157) [OBSERVED];
4. **a shell transaction** `insertTx(plat, 0)` — level 0, `workLimit` MAX_SAFE_INTEGER, no prepared (:158;
   `K/insert/classes.ts:132–:150`) [OBSERVED];
5. a frame box `FRAME_MARGIN_CM = 4096` beyond the inputs inserted first, `insertChain(tx, frame, [{role:'invisible',
   entity:'arr:frame'}], 'mandatory', {closed:true})` (:162–:176; margin :96) [OBSERVED];
6. **every distinct segment as its own two-point mandatory chain** `insertChain(tx, [seg.a, seg.b], [{role:'invisible',
   entity:'arr:s<i>'}], 'mandatory')` in input order (:179–:190); a collapse (`E_DEGENERATE empty`) adds `W_ATTRACTED`
   (:185–:188); any other refusal is returned (:189) [OBSERVED];
7. `bridgeGaps` (more `insertChain` calls, :211–:248), `orientSegments`, `glueWalks`, `balanceFlow` (:191–:195)
   [OBSERVED]; the warnings are the scratch tx's (:196) [OBSERVED].
- **The attractor**: `insertChain` on the scratch arena, so step 2's attraction (`planAttraction`, `K/insert/
  attractVertex.ts:105–:158`: nearest vertex of level ≤ n within `attractCm`, else nearest route piece with the endpoint
  rule, else free) sees only the frame and the operands' earlier segments — `LATTICE.attractCm = 26`
  (`K/num/lattice.ts:19`) — never the real arena's content [OBSERVED].
- Per face read (non-trivial): one `createPlat` + one `attachIndex` + (1 + #segments + #bridges) `insertChain` calls;
  with vertex-only spines, `readFace`'s `kerbOf` (:287) plus `readKerb`'s `kerbOf` is skipped by `f.base` (:535) but the
  staged path adds a second `overlayRegion` (:452) [OBSERVED].

**readKerb (:532–:558)** `readKerb(p, face, widths, cache?, vertexContacts = true): KernelResult<KerbRead>`: `readFace`
(:533); `k = f.base ?? kerbOf(f.rings, f.spines)` (:535); staged fallback guarded by `clearOf` (:538–:543); refuses with
the overlay's code (:544); splits: `junctionsOf(p, f.edges, f.spines)` (:548; :681) and `splitChain(p, rings, jn)`
(:550; :802) — `spliceAt` (:749) may splice the split's kerb point into the ring (C-0212 (5)); rings `unspiked` again
(:556); returns `{face, rings: f.rings, edges, spines, kerb, splits, warnings}` with the overlay's warnings (:557)
[OBSERVED]. Reads `p` only (junction code uses `p.vertices`/`p.halfEdges`, :682–:684) [OBSERVED].

**kerb (:564–:568)** `export function kerb(tx: InsertTx, face: FaceId, widths: SpineWidths): KernelResult<Ring[]>` —
body: `readKerb(tx.plat, face, widths)`; returns `ok(r.value.kerb, r.value.warnings)` (:565–:567) [OBSERVED]. **`tx` is
used only for `tx.plat`**: not its level, key, work, journal, warnings or `closed` [OBSERVED]. The doc says "committed or
in the open overlay … Read-only; the warnings are the scratch overlay's (§3.7's split reads them)" (:561–:562) [STATED].
The re-export is `K/arr/index.ts:10` `export { kerb, type SpineEnd, type SpineWidth, type SpineWidths }` (`readKerb`,
`readFace`, `kerbOf`, `kerbParts`, `clearOf` are not re-exported; tests import them by path, e.g. `KT/corridor.test.ts:14`)
[OBSERVED].

## (b) corridorUnion.ts and bandUnion.ts's bandCore commit

- `corridorUnion(o: Overlay, l1Faces: FaceRef | readonly FaceId[], widths: SpineWidths): KernelResult<BandResult>`
  (`K/arr/corridorUnion.ts:35`): `enter(o)` (:36), E_LEVEL off L2 (:38), `l1FacesOf` (:40), `bandCore(t, faces,
  {widths, edgeRole:'kerb', entityOf: owner of the L1 face, owner:null, vertexContacts:true})` (:41–:51)
  [OBSERVED]. Its header: "The geometry is `kerb`'s — the one function, the same inputs, read on the same arena — so the
  block S8 cut on kerb(F) and the block S9 keeps are one face" (:9–:10) [STATED].
- `bandCore(t: OpenTx, faces, spec)` (`K/arr/bandUnion.ts:523–:545`): faces sorted `compareFaces` (:527), charged
  `TX_FACES_WALKED` (:528); loop: `opSave(t)` (:533) → `writeOutlines` (:534) → on refusal `rollback` (:535); a `retry`
  (end to pin first) → `rollback` and add to `pinned`, run again (:536–:540) — the **pinned-first engine** (N-57 (2));
  `readBack` (:541) [OBSERVED].
- `writeOutlines` (:553–:652): **every face's kerb is read FIRST, all of them, by `readKerb(p, f, spec.widths, cache,
  spec.vertexContacts)` (:564–:568) on the real arena before any write** — i.e. S9 re-reads each kerb through the same
  per-face scratch overlay as S8 [OBSERVED]. Then per face: `outlinePieces(read)` (:573; :133), each piece
  `insertChain(t, points, rows, 'mandatory', closed?)` **on the real L2 transaction** (:599) or `insertPinned` (:586;
  :448–:488, its own `insertChain` at :488); `closeEnds` (:610; chords `insertChain` at :410, :425); splits
  `insertChain(t, pts, split, 'mandatory')` (:635) unless `onOutline` misses (:634) [OBSERVED].
- **The commit's attractors**: these `insertChain` calls run at `t.level = 2` on the real arena, so `planAttraction`
  (`K/insert/attractVertex.ts:118–:126`: `query(plat, tx.key, n, box, {vertices, edges})`, "the nearest vertex of level
  ≤ n within attractCm") sees every L0–L2 vertex/edge within 26 cm: F's own L1 boundary, other L1 chains, and L2 content
  already committed — earlier faces' kerb pieces in the same batch and earlier corridorUnion batches [OBSERVED for the
  query level; the list of attractors INFERRED]. KI-13 names the class: "corridorUnion's commit attracts a kerb piece's
  boundary contact to earlier batches' content within attractCm (≤ 73.5 cm, ~3 % of CITY blocks)"
  (`docs/KNOWN-ISSUES.md:30`) [STATED].
- Module comment bounds: closing chord `CHORD_MAX = attractCm + 1` (:252), `ALONG_SQ = (2·√2·attractCm)²` (:259),
  `PIN_SQ` (:246); post-condition E_INVARIANT on a dangling tip (:615–:628, :645–:650) [OBSERVED].
- `bandUnion` passes `vertexContacts: false` (:777) [OBSERVED].

## (c) The arena transaction API: what exists for reading kerb(F) inside the real transaction

- `InsertTx` (`K/insert/classes.ts:107–:129`): `plat, key, level, workLimit, work, warnings, journal, prepared?,
  closed?` [OBSERVED]. `insertTx(plat, level, opts)` mints a shell (:132–:150) — "what the tests and a scratch-arena op
  hand the writers" (:131) [STATED].
- `Overlay = InsertTx & { readonly open: true }` (`K/tx/types.ts:201`); `OpenTx extends Overlay` with `spec, env,
  savepoint, indexLog, log, failed, closed, op` (`K/tx/state.ts:43–:79`); `openTx(o)` (:96), `enterWriter` (:184)
  [OBSERVED]. `tx(p, spec, fn?, env)` opens, runs, commits or restores the batch image (`K/tx/tx.ts:530–:548`)
  [OBSERVED]. One level per transaction: `KernelTx.level` "The batch's one level" (`K/tx/types.ts:39–:40`) [STATED].
- `insertChain(tx: InsertTx, points, roles, cls, opts = {}): KernelResult<ChainInsert>` (`K/insert/insertChain.ts:847`);
  it throws on a closed tx (:850) and inserts at `tx.level` (:852) [OBSERVED].
- Savepoints (`K/tx/savepoint.ts`, M0-a-06's): the M0 overlay **is the arena written in place**, with a before-image as
  its undo (:4–:10) [STATED]; `takeSavepoint(p)` copies every table and the index's mutable state — O(arena) (:152–:158,
  :160–:198) [OBSERVED]; `restoreSavepoint(s)` puts it back, allowed "between batches, or inside the batch it was taken
  in" (:216–:231) and throws if another batch's index log is open (:226–:228) [OBSERVED]; `restoreBatchImage` (:234)
  [OBSERVED].
- Op savepoints (`K/faces/common.ts`, M0-a-07's): `opSave(t: OpenTx)` = `takeSavepoint` + the journals', chain journal's,
  log's, warnings' and index-log lengths (:449–:480); `rollback(t, s, refusal)` restores all of it and returns the
  refusal (:486–:531) [OBSERVED]. "O(arena), charged to no counter" (:458) [STATED]. Profile fix 5: an O(arena) image per
  `splitFace` is 51 % of `splitFace`, 2.2 % of S8 (`plat/docs/build/checks/profile-city-stages.md:303–:304`) [STATED].
- Read-only attraction: `planAttraction(tx, p)` — "Step 2's decision for one chain vertex, nothing written (its split, if
  any, planned)" (`K/insert/attractVertex.ts:51–:55`, :100–:158); it charges `insert.attractQueries` to the tx (:115)
  [OBSERVED]. Exported from `K/insert/index.ts:24` [OBSERVED]. `planSplitThrough` / `planPoint` plan a split without
  writing (`K/insert/splitThrough.ts:192`, :357) [OBSERVED].
- Face iteration: `faceWalk(p, level, face)` (imported `K/arr/kerb.ts:49`, used :216, :260), `rowsOn`, `outgoing`,
  `isFaceLive` from `K/arena/index.js` [OBSERVED]; `regionOf(t, face, level)` (`K/faces/common.ts:97`) [OBSERVED].
- **What does NOT exist** [OBSERVED by search of `K/` for dry-run/read-only/probe/trial: only warp's `heldSet` "dry run"
  (`K/warp/warp.ts:401`) and `insetRing`'s bisection trials match]: no read-only or dry-run overlay of the real
  arena; no copy-on-write overlay (deferred to M1: `K/tx/savepoint.ts:4–:7`); no facility to insert at L2 inside an L1
  batch (one level per tx). A real-arena kerb read is therefore **NEW** code — in a-09's `K/arr/kerb.ts` if it is built
  from the existing exported calls (`planAttraction`, `query`, `faceWalk`, `opSave`/`rollback` on an `OpenTx`, a shell
  `insertTx(p, 2)` under `takeSavepoint`/`restoreSavepoint`) [INFERRED]; any change to `tx/`, `faces/`, `insert/` or
  `arr/winding.ts` is outside the owns (M0-a-06, M0-a-07, M0-a-04/05, M0-a-08: `plat/docs/build/M0-work.json`) and is
  REPORTED, not built [OBSERVED owners].

## (d) The S8 callers

- `bentCutFabric.ts:512` (M0-b-03's file): in `kerbFace(face)` (:510–:541): `kerb(this.o, face,
  spineWidthsOf(this.ctx.widths))` (:512); `this.o: Overlay` (:418), the district's **L1** callback transaction (header
  :5) [OBSERVED]; widths: `spineWidthsOf` → `{halfWidthCm: w/2}` for role `way` only, no `ends` (:307–:313) [OBSERVED].
  Uses: `kr.ok` / `kr.code` / `kr.detail` (:513) and `kerbComponent(kr.value)` (:514; :548) — **the rings only; the
  warnings are never read** [OBSERVED]. Called from `:1137` (`run.kerbFace(face)`) [OBSERVED]. The profile calls this read
  site `bentCutFabric.ts:1172` `ladderOn` (`profile-city-stages.md:289`) — stale line numbers [OBSERVED].
- `bentCutFabric.ts:588`: `kerbSeed(o: Overlay, face, widths, parent?)` (:587): `kerb(o, face, spineWidthsOf(widths))`
  (:588); uses `kr.ok` and `kr.value` (outer rings, holes, seeds; :589–:598); called at `:1058` `kerbSeed(run.o, c,
  run.ctx.widths, kerbRings)` [OBSERVED]. No warnings read [OBSERVED].
- `planner.ts:103` is **not a call**: it is the doc comment of `interface KerbFace` (:107–:110; "A face as the planner
  reads it: `kerb(F)`'s rings …") in M0-b-02's file (`plat/packages/layout/src/infill/planner.ts`, owned by M0-b-02 in
  `M0-work.json`) [OBSERVED]. `planner.ts` has no `kerb(` call [OBSERVED grep].
- Other `kerb()` callers: the façade `K/facade/kernel.ts:217–:220` (`kerb: (face) => batchValue(o, kerb(o, face,
  needWidths('kerb')))`, M0-a-16's) and testkit invariants (`plat/packages/testkit/src/invariants/constructive.ts:692`,
  `primitives.ts:583`) [OBSERVED].
- **Signature**: every caller passes an `Overlay` (or the façade's current overlay) plus `SpineWidths`; since `kerb`
  already receives the open tx, a real-arena read needs no new parameter — the signature `kerb(tx: InsertTx, face,
  widths)` can stay [INFERRED from :564 and the callers]. If the read must be done at the commit's level (L2) while S8's
  tx is L1, `tx.level` (1) differs from the commit's (2) — the read cannot simply use the caller's tx for insertion
  [INFERRED from `K/insert/insertChain.ts:852`, `K/tx/types.ts:39–:40`].

## (e) The arr-bands harness (`TK/`)

- Files: `agreement-corridor.test.ts` (77 lines), `agreement-tilerings.test.ts` (25), `guard.test.ts` (40),
  `representation.test.ts` (150), `support.ts` (769) [OBSERVED].
- **The judge's clause**: `judge(h, op, source, ours, oracle, warnings, input)` at `TK/support.ts:95–:104`; **`own(ours)`
  at :97** (defined :89–:92 as `ringProblems(rings.map(dedupe))`, comment "on every case") and the failure kept at
  **:100** `if (bad.length > 0) keep(h, `${op} ${source}: ours invalid: …`)` — unconditional on the attracted/unattracted
  split [OBSERVED]; `compareSplit(ours, oracle(e), warnings)` per engine (:101) [OBSERVED].
- a-09's harness has **no `h.invalid` and no `ownProblems`**: `Harness = {report, failures, settled, sources, notes}`
  (:69–:77, :79–:81); invalid outputs go to `h.failures` [OBSERVED]. `ownProblems` and `h.invalid` are M0-a-08's harness
  (`plat/packages/testkit/test/kernel/arr-booleans-buffers/support.ts:742`, :903–:904) [OBSERVED]. a-08's pin is
  `arr-booleans-buffers/harness.test.ts:82–:96` ("ours is held to the hard ring checks on an unattracted case too …",
  `[SQUARE, SQUARE, tri]`, `expect(h.invalid)…`, `verdict` throws) [OBSERVED]. Q84's row text (`docs/M0-FIX-QUEUE.md:98`)
  is a-08's wording; on a-09's harness the behaviour already holds (`:97–:100`) and what is missing is the pin [OBSERVED
  that no a-09 test pins it: `guard.test.ts` pins the guard and kerb(F)=F only (:9–:40)].
- `verdict` (:112–:132): `expect(h.failures).toEqual([])` (:119), the draw count, unjudged ≤ 1 %, `refused-own` ≤
  ⌈runs/10⁴⌉ (:127), the unattracted guard (:130–:131) [OBSERVED].
- `judgeCorridor` (:618–:655): the per-face-ring check skips a two-point loop **only on an attracted case** (:635–:638),
  else `ringProblems` (:640); `judge` on blocks (:650) and on bands (:654); splits between blocks kept (:653)
  [OBSERVED].
- **The attracted split of the harness reads kerb()'s warnings**: `oursCorridor` (:416–:513) reads `kerb(o, f, widths)`
  for each face in an L1 batch and pushes `k.warnings` (:456–:461), then `corridorUnion` in an L2 batch and adds the
  record's warnings (:466–:468); `splitOf(ours.warnings)` decides attracted (:628) and `compareSplit` judges by them
  (:101) [OBSERVED]. So changing what `kerb()` warns changes the harness's attracted/unattracted split [INFERRED].

## (f) Timing / perf evidence in the repository

- `plat/docs/build/checks/profile-city-stages.md` (Q50; 400 lines): Linux x64, 4 cpu, 16 GiB, **every timing CONTENDED**,
  conclusions on shares and exact counts (:3, :8–:10) [STATED]. S8 3 954 – 7 820× §12.4; scratch overlay 72 – 80 % of S8,
  67 – 69 % of S9 (:14–:15) [STATED]. S8 table: 156.4 s / 88.4 s, 154.7 / 83.9, 125.7 / 79.1 (prod/tsx per seed)
  (:88); S9 63.3 / 35.3 … (:89) [STATED]. Per-unit: S8 per cut 63 – 67 ms prod / 106 – 116 ms tsx; one kerb read 18.3 –
  20.1 ms prod / 34.8 – 36.2 ms tsx (:103–:105) [STATED]. Counts: 2 774 / 2 394 arrangements in S8 (2.0 per cut), 1 412
  / 1 213 in S9 (:16–:17, :290) [STATED]. A1 (:287–:291), fix 1 (:353: memo `kerbOf` as a NO-SHIFT first step; SHIFT
  risk on another construction), open questions 4 (memo hit rate) and 5 (design route) (:389–:393) [STATED]. At test
  size: S8 14.2 s tsx, 12.5 s bundle-debug, 7.0 s prod (:130) [STATED].
- The profile's line numbers are stale against this tree: `kerbOf (arr/kerb.ts:317)` is now :492, `readKerb :358` now
  :532, `bandUnion.ts:548 writeOutlines` now :553 (read at :565), `bentCutFabric.ts:530 kerbFace` now :510, `:607
  kerbSeed` now :587, `winding.ts:106 buildOverlay` now :112 (`profile-city-stages.md:287–:290`, :353) [OBSERVED].
- Its driver used `bench/src/fusion/runs.ts:332` and `measure.ts:518` (`profile-city-stages.md:28–:29`) [STATED]; **on
  this tree `plat/bench/src/fusion/` holds only the scaffold's empty `index.ts` ("this index and its folder belong to
  M0-c-06")** and there is no `bench/test/fusion/` [OBSERVED]. The profile's scratch driver is not in the repository
  (:5–:6) [STATED].
- KI-12 (`docs/KNOWN-ISSUES.md:29`): "≈ 158 s per CITY derivation here, ≈ 100 ms per cut … CONFIRMED by a CPU profile
  2026-10-08 — at test size S8 is 19.6 s of a 25.9 s fusion derivation and 18.3 s of that is kerbOf's overlayRegion,
  which builds a fresh scratch arena per face and inserts every face and spine-buffer segment through insertChain"
  [STATED].
- The S8 verdict's NEAR run took `Duration 2612.27s` (14 files, 82 tests) and RELATED at 1000 `8585.87s`
  (`plat/docs/build/checks/M0-a-09-s8.md:76–:77`), "No timing was taken or gated on (the durations are informative
  only)" (:79–:80) [STATED]. Summaries under `plat/docs/build/summaries/` carry S8 work counters (`M0-b-04.json:210–:240`
  `cut.kernelCalls` etc.), not times [OBSERVED].

## (g) The item's test files and how NEAR / RELATED run them

`KT/` (10 test files + support) [OBSERVED]:
- `band.test.ts` — bandUnion at L3/L2, profile sampling, corner splits, E_LEVEL (:23–:78).
- `bfuzz.test.ts` — B-FUZZ: `kerb` on every face in an L1 batch, `readKerb(o.plat, …)` reach check (:79–:96), **"the
  read-only service writes nothing": `expect(state(p)).toBe(b0)` (:101–:102)**, refusals classed by `replayKerb`
  (:86); corridorUnion, closings by kerb(F) (:114–:120); tileRings (:165) [OBSERVED].
- `corridor.test.ts` — the commit's geometry (:60); **§13.2 S8's working block (kerb on the open overlay) ≡ S9's
  committed block, Hausdorff 0** (:95–:129: kerb read inside the L1 batch that inserted the lanes, then corridorUnion at
  L2, `expect(blocks.get(f)).toEqual(s8.get(…))` :126); the split-end and dead-end variants (:131, :183); the random
  networks: exact where neither the kerb's overlay nor the commit moved a vertex, else the √2·attractCm × perimeter bound,
  and `tally.exact ≥ cases/10` (:228–:296; `kerbRead` reads `attracted(k.warnings)` :549–:562); sliver fold (:298), bent
  kerb edge (:328), E_KEPT (:362), E_LEVEL (:413), slanted boundary (:459), other arenas (:476) [OBSERVED].
- `deadend.test.ts` — N-57 (2) closings, pinned first, fixtures from `deadend-faces.json` (:97–:507) [OBSERVED].
- `kerb.test.ts` — kerb(F)=F, crossing corner, profile trapezoid, square/round ends, T-junction knot, wedges, acute
  corner (:41–:227) [OBSERVED].
- `register.test.ts` — the refusal register: each case typed, nothing written, insertChain's (:93–:111; data
  `refusals.json`) [OBSERVED]; `replay.ts` replays kerb's scratch overlay on insertChain alone — "a fresh L0 arena, the
  frame 4096 cm beyond the inputs, then every distinct input segment" (:8–:10), `replayKerb` = `readFace` + `kerbParts` +
  `replayOverlay` (:141–:148) [OBSERVED].
- `representation.test.ts` — same reads/kerbs/splits after start re-draw and save/load (:98–:124) [OBSERVED].
- `tileRings.test.ts` (:21–:114), `widthstep.test.ts` — N-52 (2) reach, S8 ≡ S9 at a width step (:142) [OBSERVED].
- `vertexcontact.test.ts` — J318 census (:106–:216), the CITY fusion fixture seeds 3/33/44 (:305–:307, data
  `vertexcontact-faces.json`), the J264 staged read and `clearOf` (:392–:463), C-0380 (2) (:511–:558) [OBSERVED].
- `TK/` — `agreement-corridor.test.ts` (:15–:50), `agreement-tilerings.test.ts` (:14–:15), `guard.test.ts`,
  `representation.test.ts` (:117–:136: "the same kerb and the same S9 commit on the loaded and start-re-drawn copies")
  [OBSERVED].
- Gates (`plat/docs/build/checks/M0-a-09-s8.md:68–:80`): NEAR = PR size, `PLAT_FUZZ_RUNS`/`PLAT_FUZZ_SEED` unset, W=1,
  `packages/kernel/test/arr/bands/` 10 files + `packages/testkit/test/kernel/arr-bands/` 4 files; RELATED =
  `PLAT_FUZZ_RUNS=1000 vitest related --run --maxWorkers=1` over `packages/kernel/src/arr/{kerb,corridorUnion,
  bandUnion,tileRings,index}.ts`; one known foreign red (M0-c-06's `test/fusion/drift.test.ts`, Q60) [STATED].

## Ids

`plat/docs/build/choices.md:391–:392` already hold **C-0384** (M0-c-05 fix s2) and **C-0385** (M0-m-01 fix s1);
`plat/CLEAN-ROOM.md:618–:621` already hold **L-0575 – L-0578** [OBSERVED]. On this tree the next free ids are **C-0386 and
L-0579** [OBSERVED: highest C row C-0385, highest L row L-0578], not C-0384 / L-0575 as the task text says. `kerb.ts`
cites C-0380 (:9, :191, :257, :310) and C-0381 (:28, :292, :437, :466, :536) only; no L id [OBSERVED].

## Open points for the designer

1. **What "the real arena's overlay" means in code.** Nothing read-only exists (§(c)). Candidates read off the code: (A)
   memoise `kerbOf` on its exact inputs inside kerb.ts (NO-SHIFT; profile fix 1's first step, `profile-city-stages.md:353`;
   hit rate unmeasured, :389–:390); (B) keep the scratch construction but snap/attract its output against the real arena
   with read-only `planAttraction` (`K/insert/attractVertex.ts:105`) at the commit's level; (C) a dry-run commit on the
   real arena (shell `insertTx(p, 2)` under `takeSavepoint`/`restoreSavepoint`, or `opSave`/`rollback` on an OpenTx) —
   O(arena) image per read (`K/tx/savepoint.ts:152–:198`), ~2 800 reads per CITY S8 (`profile-city-stages.md:290`); (D)
   a child's kerb from its parent's by subtracting the new lane's band locally (:353). Only (A)/(B) fit a-09's owns
   without a REPORTED change; (C) needs a ruling on the level mismatch (S8's tx is L1, the commit L2).
2. **Which attractors S8 can see.** The commit attracts to L0–L2 content within 26 cm, including earlier faces' kerb
   pieces in the same batch and earlier corridorUnion batches (§(b)); at S8 time no L2 content exists yet. "Same
   attractors" (Q18/Q19) may be unreachable by construction for class (b) of N-52 — the designer must say what Q19's
   100 % means if so.
3. **The perf bar's workload.** The fusion harness the profile ran (`bench/src/fusion/runs.ts`, `measure.ts`) is not on
   this tree (§(f)); the before/after must name a workload the seat's container holds (candidates: a kerb-read
   micro-benchmark over `KT/vertexcontact-faces.json` / `deadend-faces.json` / B-FUZZ networks; the layout fabric tests
   `plat/packages/layout/test/infill/fabric/` with `city-split-seeds.json`), same machine, same build, counts (overlay
   builds, `insertChain` calls) beside times, contended timings labelled.
4. **Warnings semantics.** S8 ignores kerb's warnings (§(d)) but the tests and the harness classify attracted cases by
   them (`KT/corridor.test.ts:555–:556`, `TK/support.ts:460`, :628); a new construction must say what it warns.
5. **The tests tied to the scratch construction.** `replay.ts:141–:148` replays the scratch overlay; `refusals.json`
   pins its refusal details; `bfuzz.test.ts:101–:102` pins "writes nothing" (`state(p)` from M0-a-06's
   `kernel/test/tx/support.ts`). A changed construction must update these within a-09's owns.
6. **S9's own re-read.** `writeOutlines` re-reads every kerb (`bandUnion.ts:564–:568`); whether S9 reuses S8's reads
   (a memo across batches keyed on inputs) or recomputes is the designer's — 67–69 % of S9 is this read.
7. **Q84 on a-09's harness.** The behaviour holds (`TK/support.ts:97–:100`); the round adds a pin test modelled on
   a-08's `harness.test.ts:82–:96` but against `h.failures` (a-09 has no `h.invalid`), unless the designer rules to add
   `invalid` to a-09's `Harness`.
8. **Ids.** The next free ids are C-0386 / L-0579 on this tree, not C-0384 / L-0575 (§Ids).
