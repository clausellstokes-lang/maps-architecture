# a09-s9-spec / design — the spec entry for M0-a-09's hardening round S9 (Q18 + Q19 + Q84)

Seat `a09-s9-spec/design` (Fable 5.1 / xhigh), 2026-10-19 01:55–02:25. Inputs: read-code.md (313 lines) and read-records.md
(155 lines) read whole, the S6 model entry, and this seat's own reads of the tree (every file:line below re-checked on
branch claude/great-galileo-b4mzbq unless tagged [STATED] from a record). No test, build or git was run. The JSON entry is
`spec-a09-s9.json` beside this file; §1 and §2 below are its `session` and `lines` verbatim, §3–§4 are this seat's notes.

## 1 The session text

(5993 characters; the renderer places it inside the SESSION FIX ROUND paragraph of both briefs, render.mjs:48)

> Opened by the session under the owner's delegation (J404; every ruling vetoable) as M0-a-09's round S9 — the FIRST round of the hardening phase, the critical path (J318 'Q18 stays first'; J395 C1: a-09's three operations can commit a silently wrong block; J411 (4): Q18 as round S9, Q19 its closing check, Q84 with it — the queue's 'N-56 §7'), after s6–s8 landed (kerb.ts cites C-0380–C-0383). KI-12, CONFIRMED by the Q50 profile (plat/docs/build/checks/profile-city-stages.md §0 (3), §4 A1): every kerb read builds a scratch arrangement (kerb.ts:564 → :532 readKerb → :492 kerbOf → :498 overlayRegion → winding.ts:112 buildOverlay: createPlat :156, attachIndex :157, a shell insertTx :158, a frame :162–176, then every segment of F's rings and of the buffer parts as its own two-point insertChain :179–190): 2 774 / 2 394 arrangements per CITY S8 (2.0 per cut), 1 412 / 1 213 more in S9's re-read (bandUnion.ts:564–568), ≈ 250–300 segments and ≈ 19 ms each: 72–80 % of S8, 67–69 % of S9. KI-13 / N-52 class (b): the scratch's attraction sees the operands only, while the commit's insertChain at L2 (bandUnion.ts:599, :635) sees every L0–L2 vertex within attractCm (attractVertex.ts:118–126), so S9's block can differ from kerb(F) within N-43's bound (≤ 73.5 cm): exact-0 share 0.913–0.935 on seeds 1–2, 0.988 on fusion 3/33/44 (J348), against N-52 (5)'s ≥ 0.95 ((a) the lattice, ≤ 39 cm, no defect; (c) fixed by N-52 (2)). RULING: kerb(F) is read ON THE REAL ARENA'S OVERLAY — a dry-run in the open transaction it is asked on, rolled back — so the read's attractors are the content an insertion of that transaction meets: no scratch arena, no re-insertion of F's rings. THE FIX, inside M0-a-09's owns (kernel/src/arr/{kerb,corridorUnion,bandUnion,tileRings}.ts, its arr/index.ts lines, kernel/test/arr/bands/, testkit/test/kernel/arr-bands/) and nowhere else: (1) kerb(tx, face, widths) keeps its signature; readKerb takes the open transaction (openTx(tx), tx/state.ts:96; a shell is a programming error). NEW in kerb.ts, replacing kerbOf's and lessParts's overlayRegion, the dry-run: s = opSave(t) (faces/common.ts:459); a shell sh = insertTx(t.plat, t.level) (insert/classes.ts:132: unlimited work, its own warnings and chain journal, so the batch's work, warnings, journal and limit stay untouched — opSave leaves work charged, :447, and a charge past workLimit dooms a batch, classes.ts:154, tx.ts:124); every part of kerbParts (:417, key order) one closed mandatory insertChain on sh under {role:'invisible', entity:'arr:kerb:<i>'} (roles.json:33): E_DEGENERATE 'empty' is W_ATTRACTED (winding.ts:185–188), any other refusal rolls back and is the read's; F's rings are NOT inserted (they are the arena's edges); the faces of level t.level inside F: those reachable from the face holding F's interior point (interiorPoint, bandUnion.ts:173, moved to kerb.ts; pointLocate, index/index.ts:67) across every edge that is not F's own boundary (F's walk's pairs and the halves tx.journal.split made of them; finer content crossed like a part edge); each is labelled by its interior point's winding against F and against every part AS THE ARENA HOLDS IT — the cycle of edges carrying the part's row from ChainInsert.placed (insertChain.ts:112), never the input ring, which attraction may have moved (a sliver labelled from the input is a silently wrong kerb, N-45 (a)) — kept where w0 ≠ 0 and Σw(parts) = 0 (kerbOf's predicate, :498); the kept faces' rings in the scratch's form (an edge between two kept faces dropped; dropStraight winding.ts:607, simpleLoops :687, unspiked kerb.ts:508, canonical, sorted); the warnings are sh.warnings (§3.7's split keeps its meaning: corridor.test.ts:555, support.ts:460/:628); rollback(t, s, …) on both paths; a part beyond p.frame is clipped to it. (2) The J318 census (kerb.ts:259–293) stays: its base read and reaches on the dry-run of the edge spines' parts, the full read on E ∪ V in key order; C-0381's staged read is re-derived with the base rings inserted as operand 0 under clearOf (:470), or shown unnecessary by the census; the pinned-first commit (N-57 (2), bandUnion.ts:523–545) stays; writeOutlines reads readKerb(t, …) (:565) in the commit's own L2 transaction, read-all-then-write as now. (3) The same arena state and face give the same kerb (representation.test.ts). (4) replayKerb (replay.ts:141–148) replays the dry-run on a fresh copy of the arena at the read's level (replayCommit's form, :10–17); refusals.json is re-recorded only where a detail changed; 'the read-only service writes nothing' (bfuzz.test.ts:101–102) stays and gains the batch's work, warnings and journal lengths unchanged. THE PINS are the three lines (counts and shares, never a timing gate — 23:85; §12.4's 12 µs is the owner's C2 decision). In force: J264 (5) (register 36/39/13, B-FUZZ 1012 15/16/2, 20261011 10/16/3 — a rise fails, a drain is listed), J238, N-45 (a), N-52 (1)(2)(5), N-57 (2), J318/C-0380, C-0381, J348. NOT this round's: Q58/Q59, L21, notes 35–40, the inventory's 21 FIX-NOW rows (a-09's later round); Q60 (c-06's drift red; its fusion harness is absent from this tree, so the fusion seeds' share is c-06's to re-measure after this lands); Q50; kerbOf's memo (the builder counts repeated canonical inputs within one transaction, builds none); the O(arena) image per read (profile fix 5, a-06/a-07) and the insertion's constant factors (fix 2, a-03/a-05), REPORTED as the remainder; winding.ts (a-08), bentCutFabric.ts:512/:588 (b-03), planner.ts (b-02) and facade/kernel.ts:217 (a-16) change nothing (REPORTED to b-03: the read runs in the caller's transaction, charging and logging nothing to it). The closing check adds to the template the census before/after, s3/s4/s6/s7's mutants re-killed as recorded, its verdict in checks/M0-a-09-s9.md and its notes under 'Hardening round S9'. IDS: the choices and CLEAN-ROOM rows take the next free ids the seat finds (C-0386 and L-0580 exist today); kerb.ts's citations stay as J411 renumbered them.

## 2 The lines (one per queue row: Q18, Q19, Q84)

| # | line | evidence | required_change |
|---|---|---|---|
| 1 | Q18 (KI-12; profile §4 A1): kerb(F) is read without a per-face scratch arrangement — a dry-run on the real arena inside the open transaction (the parts inserted through insertChain at the transaction's level on a shell insertTx(t.plat, t.level) under opSave(t), the faces inside F labelled from the arena's edges, the kept rings traced in the scratch's form, the shell's warnings kept, rollback(t, s, …)), kerb()'s signature kept, the batch's work, warnings and journal untouched, the arena bit-identical after the read; the J318 census, the C-0381 staged read and the N-57 (2) pinned-first commit kept or re-derived; S9's writeOutlines reads in the commit's own L2 transaction | kerb.ts:564–568 (kerb reads tx.plat only), :532–558 (readKerb), :492–501 (kerbOf → overlayRegion :498), :259–293 (the census, kerbOf at :287), :442–455 (lessParts, overlayRegion :452), :470 (clearOf), :417 (kerbParts), :508 (unspiked); winding.ts:112–190 (buildOverlay: createPlat :156, attachIndex :157, insertTx :158, the frame :162–176, one insertChain per segment :179–190, E_DEGENERATE empty → W_ATTRACTED :185–188), :607 dropStraight, :687 simpleLoops; bandUnion.ts:523–545 (bandCore: opSave :533, rollback :535), :564–568 (the re-read), :599/:635 (the commit's insertChain), :117 insideRings, :173 interiorPoint; tx/state.ts:96 openTx, :91 isOpenTx; faces/common.ts:447 ('work charged stays charged'), :459 opSave, :486 rollback; insert/classes.ts:132 insertTx, :154–158 charge(); tx.ts:124 overWork; insert/insertChain.ts:112 ChainInsert.placed; stretch.ts:111 chainJournal; classes.ts:96 InsertJournal.split; index/index.ts:67 pointLocate; arena/roles.json:33 (invisible); attractVertex.ts:105–126 (planAttraction's query of level ≤ n within attractCm); bentCutFabric.ts:1359 (districtTxLimit); profile-city-stages.md §0 (3), §3.3, §3.7, §4 A1/A4, §5 rows 1/2/5, §6 (4)(5); the S8 callers bentCutFabric.ts:510–514, :587–598 (rings only, never the warnings); facade/kernel.ts:217–220 | NEW in kerb.ts: the dry-run engine replacing overlayRegion (readKerb(t: OpenTx, …); interiorPoint/insideRings moved from bandUnion.ts); bandUnion.ts:565 readKerb(t, …); kerb.ts's header rewritten for the construction (the scratch sentence gone, C-0381's form restated). PINS, red without the change: (i) kernel/test/arr/bands: a vitest module mock of arena/index.js's createPlat counting calls — 0 during the kerb reads of vertexcontact-faces.json's faces, deadend-faces.json's and B-FUZZ's networks (today one per read); the insertChain calls per read and one image per read counted; (ii) bfuzz.test.ts:101–102 'writes nothing' kept (state(p) equal) and the batch's work.total, warnings.length and journal lengths asserted unchanged across a read (the guard against the work hazard); (iii) replay.ts replayKerb (:141–148) replays the dry-run on a fresh copy of the arena at the read's level (replayCommit's form, :10–17) so register.test.ts classes every refusal still met as insertChain's; refusals.json re-recorded only where a detail changed, the count of refused cases per family NOT risen (J264 (5): register 36/39/13, B-FUZZ 1012 15/16/2, 20261011 10/16/3 — a drain listed with its draws). REPORTED, never built here: the O(arena) image per read (a-06/a-07's op savepoint by journal, profile fix 5) and the real-arena insertion's constant factors (a-03/a-05, fix 2); winding.ts untouched (a-08); bentCutFabric.ts:512/:588, planner.ts, facade/kernel.ts:217 unchanged. Reported, not gated: the wall time of the read loop over the fixture faces and of layout/test/infill/fabric/splitSeeds.test.ts (city-split-seeds.json) before/after, same machine and build, CONTENDED-labelled, with the counts beside it, in the choices row and the notes; the memo's hit rate (reads whose canonical inputs repeat within one transaction) counted, no memo built |
| 2 | Q19 (KI-13; N-52 (1)(5); Q18's closing check): S8's planned kerb equals S9's committed block exactly wherever the read and the commit saw the same arena — the hand-built two-face case exact by construction; the exact share over every face of the item's corpus (attracted cases included) ≥ 0.95 and never below the share before the round; every residual a genuine attractor difference of N-52's class (b), listed with its seed, face and the L2 vertex the commit attracted to, within N-43's bound | corridor.test.ts:95–129 (§13.2 S8 ≡ S9, Hausdorff 0 at :126), :228–296 (the random networks: exact where unattracted, tally.exact ≥ cases/10 at :296), :549–562 (kerbRead's attracted split from kerb()'s warnings); vertexcontact.test.ts:305 (CITY fusion seeds 3/33/44 fixture faces), :106–216 (the J318 cases); deadend.test.ts (deadend-faces.json); bandUnion.ts:599/:635 with attractVertex.ts:118–126 (the commit's attractors: L0–L2 content within attractCm); testkit arr-bands/support.ts:416–513 (oursCorridor: the reads in an L1 batch, the commit in an L2 batch), :628 (the attracted split); the shares 0.913–0.935 (seeds 1–2) and 0.988 (fusion 3/33/44, J348); N-52 (5)'s ≥ 0.95; bench/src/fusion holds only the scaffold's index.ts and bench/test/fusion is absent on this tree (c-06's harness and measure.ts are not here) | PINS, red without the change: (a) corridor.test.ts, a hand-built case: two L1 faces F and G sharing a spine-less edge e from a vertex v, a way T through v with half-width hw, and a vertex u of F's boundary within attractCm of T's inner edge beside e (not on e) — the reads of F and G in one L1 batch give one contact point on e, and corridorUnion of both in one L2 batch commits both exactly (today G's scratch overlay never holds u, its contact differs from F's, and the second commit attracts); (b) the random networks (:228–296): the exact tally over EVERY face (attracted included) is the share, asserted ≥ 0.95 of the cases and ≥ the share measured before the round on the same seed, each non-exact face logged with its seed, face, the commit's attraction point and the L2 vertex it attracted to; (c) the fixture faces of vertexcontact-faces.json (seeds 3/33/44) and deadend-faces.json each exact, the §13.2 case unchanged; (d) the harness's agreement-corridor cases unchanged in verdict, the attracted/unattracted split reported before → after (the warnings now the dry-run's). The builder's census (before → after: exact share, the residual list, the refusal counts) in the choices row; the closing checker re-measures the share with its own instrumentation on one seed and confirms every residual is class (b). The fusion seeds' share (c-06's measure, N-52 (5) on seeds 1–2) is NOT measurable on this tree: reported as c-06's re-run after this lands |
| 3 | Q84 (a-08 s4's N1/Z26, routed J402): the arr-bands harness holds ours to the hard ring checks on an unattracted case too — judge applies own() on every case, so an invalid ours that passes compareSplit against the oracle fails the verdict; pinned by a test red under the mutant 'own() on attracted cases only' | testkit/test/kernel/arr-bands/support.ts:89–92 (own = ringProblems(rings.map(dedupe))), :95–104 (judge: own(ours) at :97, keep(h, 'ours invalid') at :100, compareSplit at :101), :112–132 (verdict: expect(h.failures).toEqual([]) at :119), :69–81 (Harness has report/failures/settled/sources/notes — no h.invalid); the model pin arr-booleans-buffers/harness.test.ts:82–96 (ours [SQUARE, SQUARE, tri] against the union, compareSplit passes, h.invalid holds 'crossing edges', verdict throws); checks/M0-a-08-s4.md:59 and :103 (N1 pinned for a-08, reported for a-09; Z26 red), M0-a-08-notes.md:402 (X16); the arr-bands folder holds agreement-corridor, agreement-tilerings, guard and representation tests and no harness test | NEW testkit/test/kernel/arr-bands/harness.test.ts: ours [SQUARE, SQUARE, tri] judged with warnings [] against an oracle returning the union of the square and the triangle — compareSplit passes as 'unattracted', judge keeps one 'ours invalid: crossing edges' line in h.failures, h.report.line shows the draw as an unattracted pass, and verdict throws on h.failures; a second case with the same rings and a W_ATTRACTED warning kept too (the check is on every case). No behaviour change in support.ts (the behaviour holds at :97–100); no h.invalid added to a-09's Harness unless the builder shows a reason in its choices row. The builder's self-check re-introduces the mutant (own() applied only when splitOf(warnings) === 'attracted') and records the test red; the closing checker re-kills it |

## 3 Design notes — why this construction, and what the evidence says it buys

### 3.1 What exists and what does not [OBSERVED]

* `kerb(tx: InsertTx, face, widths)` (kerb.ts:564) uses `tx` only as `tx.plat` (:565). `readKerb(p, …)` (:532) → `readFace`
  (:193, a pure reader: faceWalk/rowsOn/outgoing only) → `kerbOf` (:492) → `overlayRegion([rings, parts], w0≠0 ∧ w1=0)`
  (:498). `readFace`'s J318 census runs a whole `kerbOf` of the edge spines (:287) whenever a vertex-only spine exists;
  the staged read `lessParts` runs a second `overlayRegion([base, parts])` (:452), accepted under `clearOf` (:542).
* `overlayRegion` (winding.ts:706) = `buildOverlay` (:112) → `windingLabels` → `traceKept`. `buildOverlay` builds a NEW
  arena `createPlat(SCRATCH_KEY, 2·rangeCm)` (:156), a NEW index (:157), a shell `insertTx(plat, 0)` (:158), a 4096 cm
  frame (:162–176), then EVERY distinct segment as its own two-point mandatory `insertChain` (:179–190). Attraction there
  (planAttraction, attractVertex.ts:105–126: the nearest level-≤n vertex within attractCm = 26) sees the operands only.
* S9's commit re-reads every face the same way before any write (bandUnion.ts:564–568) and inserts the pieces with
  `insertChain(t, …)` at L2 on the real arena (:599, :635; pinned ends :586), so its attraction sees L0–L2 content.
* The kernel has no read-only or copy-on-write overlay: M0's overlay is the arena written in place with an O(arena)
  before-image (savepoint.ts:1–10; `takeSavepoint` copies every column, :152–198). The building blocks that exist:
  `openTx(o)` (tx/state.ts:96), `isOpenTx` (:91), `opSave(t)` / `rollback(t, s, refusal)` (faces/common.ts:459/:486 — the
  image plus the journal, chain-journal, log, warnings and index-log lengths; "work charged stays charged", :447),
  `insertTx(plat, level)` (insert/classes.ts:132: a shell with unlimited work, its own warnings and journal),
  `chainJournal(tx)` (stretch.ts:111: per-tx WeakMap; `faces[l].created/changed/removed`), `ChainInsert.placed`
  (insertChain.ts:112), `pointLocate` (index/index.ts:67), `faceWalk`/`rowsOn`/`outgoing`/`isFaceLive` (arena),
  `dropStraight` (winding.ts:607), `simpleLoops` (:687), `canonicalRing`/`compareRings` (:584/:591), `windingNumber`
  (num/exact.ts:107), and a-09's own `interiorPoint` (bandUnion.ts:173) and `insideRings` (:117).
* The work hazard: `charge()` returns false once `work.total > workLimit` (classes.ts:154–158) and `overWork`
  (tx.ts:124) dooms a batch whose total is over its limit; S8's district batch runs under `districtTxLimit` (bentCutFabric.ts
  :1359, :1333). A dry-run that charged the batch's own transaction could doom S8. Hence the shell.

### 3.2 The profile's arithmetic — what the real-arena read can and cannot buy [STATED profile-city-stages.md]

* §0 (3), §4 A1: 2 774 / 2 394 scratch arrangements per CITY S8 (2.0 per cut), ≈ 250–300 segments each, ≈ 19 ms each in
  prod; 72–80 % of S8, 67–69 % of S9. §3.7: the engine costs 85–160 µs PER SEGMENT even at 50–200 segments (a 87-segment
  "kerb in miniature" 13.9 ms) — the insertion, not the arena creation, is the cost; super-linear (A2: `rewalk` walks the
  one big scratch face, `reparent` scans every level-0 item of the box). §3.3: the commit's piece insertion into the real
  arena is ≈ 11 % of S9 against the read's 67 % (≈ 6 k chain insertions against ≈ 353 k segment insertions) — on the real
  arena a chain's segments cost ≈ 30 µs each (the touched face is F, small). A4: one O(arena) op image ≈ 1.4 ms at CITY.
* So: the dry-run removes the arena, index, frame and F's own rings (F's edges already stand), inserts only the parts
  (one closed chain per part, ≈ 40–80 chains), on a small touched face, plus one image per read. Expected per read: a
  small multiple of the commit's own insertion cost — plausibly 3–6× under today's read, never the ≤ 5 % of today's
  read that §5 row 1 wanted for its 4.5× on S8. The per-segment insertion cost (fix 2, a-03/a-05) and the image (fix 5,
  a-06/a-07) are the remainder, outside the owns. §12.4's 12 µs per cut is 10³ away whatever this round does (J395 C2).
* The order-of-magnitude route — keep each lane's band in the arena as S8 cuts and read every kerb by face walks alone —
  needs the level discipline ruled (band outlines at L1 inside an L1 batch, or L2 inside L1) and b-03's loop: a design
  ruling, not a-09's round. Named in §4 for the session.

### 3.3 The decision (vetoable)

kerb(F) is read by a DRY-RUN ON THE REAL ARENA inside the open transaction it is asked on: the parts inserted through
`insertChain` at the transaction's level on a shell `insertTx(t.plat, t.level)` under `opSave(t)`, the faces inside F
labelled from the arena's own edges, the kept rings traced, the shell's warnings kept, then `rollback(t, s, …)`.
Rejected: (A) the memo — NO-SHIFT but blind to the attractors (Q19 untouched) and of unmeasured hit rate; (B) a geometric
read snapped by `planAttraction` — a second implementation of the lattice discipline in kerb.ts; (D) a child's kerb from
its parent's — a different lattice result per path (S8 ≡ S9 lost by construction). (C) is the task's steer and the one
route that makes the read's attractors the commit's by construction at read time.

What the construction gives for Q19, honestly: S9's read now runs in the commit's own L2 transaction, so the commit's
insertion of the read's rings meets the attractors the read met (exact by the insertion's idempotence on its own
output, as today's unattracted cases already are). S8's read runs in the L1 district batch, which cannot see L2 content;
two faces sharing a contact (a band's inner edge crossing their shared spine-less edge) now read it on the same arena
content, so the second commit's attraction to the first's contact is a zero move. The residual of N-52's class (b) is a
commit attracting to L2 content an L1 read could not see — measured and classified, bounded by N-43, never silent.
Q19's "100 % by construction" is therefore reachable only where the read and the commit see the same arena; the bar is
N-52 (5)'s ≥ 0.95 on the item's corpus, never falling.

### 3.4 Hazards the spec names for the builder

1. Labelling from the input rings is WRONG: attraction moves a part's edges by up to √2·attractCm, so a face's interior
   point can lie inside the input ring and outside the arena's region (a silently wrong sliver, N-45 (a)). Label by the
   arena's edges: the cycle of edges carrying each part's row (from `ChainInsert.placed`) or a winding walk across the
   inserted edges; "inside F" by reachability from F's interior point without crossing F's own boundary pairs (and the
   halves `tx.journal.split` made of them), never by a polygon test near a bent split.
2. The rings' form: `faceWalk` returns every vertex; the scratch dropped straight-through vertices and cut self-touching
   cycles (`traceKept`): apply `dropStraight`, `simpleLoops`, `unspiked`, canonical, sorted, or every exact pin moves.
3. Parts beyond the arena's frame refuse on the real arena (the scratch grew its frame round the inputs): clip or drop
   the part beyond `p.frame`; the census is the bar.
4. The staged read (C-0381) in the new engine: operand 0 = the base rings must then be inserted (they are not the
   arena's edges); the one-overlay / staged distinction must survive or be shown unnecessary by the census.
5. `rollback` wants a refusal: on the success path it is called with a placeholder and its return discarded.
6. bandUnion at L3 reads L1 faces holding L2 kerb edges: "inside F" crosses those as it crosses part edges.
7. The dry-run inside `writeOutlines` nests in bandCore's `opSave` (:533): two full images live at once; fine, images are
   independent copies; the inner rollback cuts to the inner lengths.

### 3.5 Ids on disk at 02:10 [OBSERVED]

choices.md's highest row is C-0386 (M0-e-02 fix s1) and CLEAN-ROOM.md's highest L row is L-0580 — the next free ids are
C-0387 and L-0581 today. Both readers' "C-0386 / L-0579" and the task's "C-0384 / L-0575" are stale; the spec says
"the next free ids the seat finds".

## 4 Open questions for the session (before launch)

1. **The tree the seat builds on.** This branch has no fusion harness (plat/bench/src/fusion holds only the scaffold's
   index.ts; plat/bench/test/fusion is absent), so neither KI-13's exact share on c-06's seeds 1–2 nor Q60's drift test can
   run in the seat; the spec sets Q19's bar on the item's own corpus and names c-06's re-measure as a follow-on. If the
   session wants the fusion share measured in this round, the child must be based on a tree carrying M0-c-06.
2. **The shell inside a batch.** The design mints a shell `insertTx(t.plat, t.level)` on the batch's own arena under the
   batch's `opSave`/`rollback`, so the read charges and logs nothing to the batch (insertTx's comment says a shell is for
   "the tests and a scratch-arena op"; nothing forbids it, and `rollback` cuts the index log the shell's writes extend).
   The session may prefer the read to charge the batch — then S8's `districtTxLimit` (b-03's, bentCutFabric.ts:1333)
   must grow and the owns be extended by ruling. The spec chose the shell; a one-line veto changes it.
3. **The perf expectation.** The profile's own arithmetic (§3.3, §3.7, §4 A4) says the dry-run keeps a per-segment
   insertion cost and adds one O(arena) image per read: the round removes the scratch ARRANGEMENT (A1) and the frame and
   F-ring re-insertion, and reports the ratio; it will not reach §12.4's 12 µs (J395 C2 is the owner's). The
   order-of-magnitude route (each lane's band kept in the arena as S8 cuts, kerbs read by face walks alone) needs the
   level discipline ruled and b-03's loop — a design ruling for the session, named in the spec as not this round's.
4. **Ids.** C-0386 and L-0580 exist on disk (02:10); the next free are C-0387 and L-0581 — the task's C-0384/L-0575 and
   both readers' C-0386/L-0579 are stale within hours, so the spec says "the next free ids the seat finds".
5. **'N-56 §7'.** The order clause the queue and the inventory cite is not in N-56 as recorded (M0-spec-notes.md:67 has
   (1)–(6)); the spec grounds the order on J318, J395 C1 and J411 (4) and names the label as the queue's. The session may
   add the clause to N-56 or re-cite.
6. **Q48's queue status** still reads "closing check running" though s6–s8 landed (J411) — queue upkeep, not the spec's.
7. **The harness's attracted split** will move: kerb()'s warnings become the dry-run's. The agreement-corridor verdicts
   should hold (the split is reported before → after, line 2 (d)); if the unattracted guard (support.ts:130) fails on the
   PR-size run because fewer cases attract, that is a ratchet to raise, not a defect — the builder reports it.
