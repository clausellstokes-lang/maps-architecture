# Refuter seat — M0-a-09 wiring round (re-keyed S20): working notes (2026-11-11)

Tree: /home/user/maps-architecture at 5c412cde (M0-a-06 S9 landed) which carries 795f4c1e (M0-a-09 S18 + S19).
Read-only; nothing run but reads (git log/show, grep, python json reads).

## Step 0 — what I read first
- spec-a09-s19.json (session 13 515 chars, 10 lines), spec-a09-s19.md (memo, D1–D9, CHECK-AT-BINDING 1–14, Q1–Q8),
  working-notes.md (steps 1–10).

## Step 1 — the tree (HEAD 5c412cde; 795f4c1e = S18 + S19 in its history: git log)
- J762 (PROGRESS) = S18+S19 landing; J765 = S9 landing (names "M0-a-09's wiring round, S20 (a refuter seat is working
  its draft…)" and says the session's merged-tree replay of the library clause was RUNNING at writing; result "the next
  row's" — not in the ledger yet). J758 = build-seat waiter. J759 = the draft's rulings Q1–Q8.
- lane-events.log: build/M0-a-09-fix-s19 LANDED 2026-11-10 09:11; check/M0-a-09-close-s19 LANDED 09:41 → s19 TAKEN by the
  library's fix round; no '-s20' key (grep count 0). S9: build/M0-a-06-fix-s9 LANDED 11-10 06:02, check LANDED 11-11 21:17.
  No M0-a-05-fix-s14 line (S14 not launched; J765: "both prepared"); no M0-a-02-fix-s4 / a-06-fix-s10 / a-05-fix-s15
  line (J757 merged round not launched).

## Step 2 — CHECK-AT-BINDING evidence (file:line in THIS tree)
1. faces/common.ts:450-456 OpSavepoint {mark: Frame, journal, chain, log, warnings}; :459 opSave(t: OpenTx): OpSavepoint
   (mark(t) at :464); :485 rollback(t, s, refusal) → undoTo(t, s.mark) :486. Names/signatures unchanged; :54 imports
   mark, undoTo from tx/frames.js. HOLDS (body changed, form not).
   dryrun.test.ts:19 counts {createPlat, insertChain, opSave}; mocks :21-32 (opSave :29-32); countReads :59-81. Unchanged
   by S9 (git show --stat 5c412cde: no test/arr/bands file).
2. tx/support.ts:100 state (was :107), :114 arenaBits, :137 indexBits, :156 bits = arenaBits+indexBits (was :163);
   :7 still imports vitest; NEW :474-486: PLAT_UNDO_ORACLE=1 installs the frame observer + afterEach/afterAll at module
   eval. bands/support.ts:16 imports commit/state/... from ../../tx/support.js (re-exports state :20). HOLDS, numbers moved.
3. bench/src/profile/counts.ts:10 COUNT_FNS unchanged (git log: last touched aa35a98a) — still takeSavepoint,
   restoreSavepoint, opSave, rollback. S9: takeSavepoint now called by NO src file (grep: only tx/index.ts:53 export,
   savepoint.ts:153 def) → 0 in S8's window (J765: 4 026 → 0). The dry run's frame work is mark/undoTo (frames.ts:304,
   :320), NOT in COUNT_FNS. S9 verdict M0-a-06-s9.md:411-414: in the bundle `rollback` is `rollback2` (insertChain.ts:783
   defines another rollback) and `mark` collides with insertChain.ts:1007. CHANGED (list same; meaning moved).
4. tx/frames.ts:88-99 FrameObserver, :102 `export let frameObserver`, :105-109 setFrameObserver returns the replaced one.
   Draft cite :14-31 → :102-109. Form HOLDS. arena/write.ts:839-843 setUndoFaultHook HOLDS.
5. kerb.ts:1405 opSave in dryInsert, :866-872 dryClose (rollback :871), :1401 dryInsert, :1441-1449, :1481-1485, :1490
   dryRegion, :1626, :1725 censusRead, :1918-1941 readOn, :2153-2192 readKerb, :2181 CENSUS.set — ALL UNCHANGED.
6. S9 touched no test/arr/bands file (stat). HOLDS.
7. kerbExact.ts exports (grep ^export): roundQuotientHalfAway :116, exactRegion :528, KeyedSpine :566, ExactKeyContent
   :572, exactKeyContent :655, exactRegionOfKey :689, exactKey :700, exactRegionOfFace :706. No kerbKey / exactKerb. HOLDS.
   File is 710 lines (draft read 692 on ba8ab3f0): S19's F1 header + pixel rule. Cites moved +18.
8. allow.json: arr/kerbExact.ts ident kerb 2, string kerb 1 (landed in 795f4c1e). Tokens now :74 ('./kerb.js' + kerbParts
   in the import) and :657 (kerbParts call) — draft/notes row 176 say :67/:639. My scratch counter (nouns.py, a Python
   copy of wordsOf/scanText — NOT the lint): kerb.ts 20/8, kerbExact.ts 2/1. CHANGED (numbers only).
9. 518964130 stands; S19 row 192 REPLACES row 172 (ii) for bent+slits (cuts 463, judged 1 892, BEYOND 234 …) and adds
   both-placements. The session's merged-tree replay: J765 (4) says running at writing → UNVERIFIED (no row records it).
10. derived.test.ts: NEAR_CM :113, segDist :134, ringDist :143, samples :150, hausdorff :164, exemptOf :185, cyclic :193,
   Served :202, servedOf :212, tipNear :233, relate :255, arbitrate (closure inside readAll) :561-582, identity :945;
   mocks :41-87 (rec hoisted, winding.js buildOverlay counted). Names HOLD; arbitration is a CLOSURE in readAll over
   content/k/rf/truth (not a top-level function). definition.ts:38 `import { simpleRing } from './support.js'` (still
   :38), endsOf :122, spinesOf :266, gridOf :298, judge :340. HOLDS (numbers moved in derived.test.ts).
11. M0-a-09-s18.md FAIL F1–F5; M0-a-09-s19.md PASS. Notes rows 178–184, 195–198 → Q178 (a)–(d).
12. '-s19' keys exist (taken by the library fix round); no '-s20'. CHANGED → re-key S20.
13. J765 per the session's instruction.
14. M0-a-05 S14 not launched (no lane line; J765 "prepared"); J757 merged round not launched.
   CORRECTION: dryrun.test.ts countReads is :60-81 (state :62, bits :65/:75, expect(state) :80) — the draft's cites HOLD.

## Step 3 — attacks on the lines (file:line opened)
- readKerb kerb.ts:2153-2192 unchanged: start before :2156, done after :2181 buildable; `const sh` in readKerb does not
  clash (dryInsert's `const sh = d.sh` :1408 is another function). censusRead :1725 is NOT exported → `ReturnType<typeof
  censusRead>` inside an EXPORTED interface relies on TS declaration emit of a local function (tsconfig.base.json:
  declaration true, emitDeclarationOnly) — UNVERIFIED; `pnpm build` decides.
- lint kernel-boundary.mjs:36-43 wordsOf, :53-77 scanText (ident/string tokens, template parts), :137-148 cap/slack.
  New names hold no noun (my scan). kerbExact.ts must add NO string with a noun either (its error texts say 'exact').
- arr/index.ts named re-exports only (no export *) → kerb.ts / kerbExact.ts additions reach no folder index; api-surface
  reads folder indexes (api-surface.test.ts:11-33). OK.
- Nothing outside kernel/test imports kerbExact (grep over plat: derived.test.ts, definition.ts only). OK (prod-absent).
- invariants/debug.ts:12 declare, :15 DEBUG_BUILD, :19 top-level side effect; imports arena only → no cycle.
- tx.ts:547-562: a throw in a batch is undone and RETHROWN (never a refusal) — resolves half of the memo's UNVERIFIED.
- PLANTED THROW (LINE 5): vi.mock of kerbExact.ts's exactRegion cannot reach the shadow's internal call (ESM mock replaces
  the importer's view, not intra-module bindings). kerbExact.ts:74 imports kerbParts FROM kerb.js → a vi.mock of kerb.js
  wrapping kerbParts reaches X but not kerb.ts's own internal calls (censusRead :1726, :1740). DEFECT → fix.
- XF1 ("exactRegionOfRead calling readFace again"): exactRegionOfRead(f, vc) has no p/face/widths → unbuildable mutant.
- derived.test.ts relate :255-265 MOVED branch needs served.movedParts (the mock's locus) → at CITY no locus: a moved read
  beyond NEAR_CM falls to BEYOND unless a wrapper gives the CITY MOVED class. arbitrate is a CLOSURE (:561-582) over
  content, k, rf, truth, Fr, exempt, tag → "moved verbatim" impossible; must be lifted.
- X_U / X_F at CITY need read.spines (Map) — derived.test.ts:647-650 kerbParts(rf.rings, read.spines, false/true).
- END RULE (row 181): kerb.ts junctionEnd :303-323 counts rows of level-1 ordinal-0 of another chain on v's edges of
  level ≤ 1 (frame edges included) → an end on a way laid along the frame is a JUNCTION end (flat); comment :300-301 "An
  end on the level-0 content (the frame, a shore) keeps it too: no block lies across that line". definition.ts endsOf
  :122-140: `if (c.closed || onFrame(q)) return false` FIRST → keeps the declared end. §3.7 (ARCHITECTURE.md:5345) says
  only "square ends where declared". The two disagree exactly where a chain ends on a way along the frame.
- bench: runs.ts:416 derive(kind, seed, opts); pool.ts:17-20 runTask = derive(…, watch: true) + measure — the harness's
  own record (stageRows empty unwatched, measure.ts header :~700). measure.ts:726 measure, :792 faces.cuts = lanes.length
  (NOT splitFace calls: profile counts.ts cuts = splitFace + connectHole; fusion 3 1 205 lanes vs 1 216 cuts,
  profile-s8-after-q18.md:15), :802 root, :806 s8s9; s8s9 :548, kerb :572, corridorUnion :589-596. fusion/index.ts
  exports derive/measure/runTask (:38-41), no main on import. TEST_SIZE support.ts:3 holds. kernel exports plat-source
  → src/index.ts; bench/node_modules/@plat/kernel → realpath packages/kernel.
- profile: index.ts:136 spawn(no execArgv); bundle.ts:41-60 (stdin :43, define :52, code :58); driver.ts:41 driverArgv,
  :207 'registers no stage', :238-239 debugBuild/root. All HOLD.
- S14 (specs.json M0-a-05 from 14): reads M0-a-09's definition.ts as its oracle READ-ONLY (its LINE 10) and runs the bands
  NEAR on the merged tree whichever lands second → the wiring round's definition.ts edits must leave judge/endsOf/…
  unchanged. launch-DV.md committed (0a5b10da), no lane line yet.
- J758: workflows/34-session-fix.js:58-60 BUILD_HANDOFF exists → the draft's "the build seat has no settle hand-off"
  CONTRADICTS it.
- HEAD moved during the read to 99c4874e (J765/J766 recorded; M0-e-01 S2 landed 2992248a) — no kernel/bench file changed
  (git diff --stat 5c412cde HEAD: site/, docs, workflows only).

## Step 4 — the corrected entry
- Built spec-a09-s20.json from the draft by exact-once replacements (scratch build_s20.py; 64 edits, each asserted once;
  the rules block otherwise verbatim). Re-keyed from 20 / S20; lanes -s20; further round -s21; evidence -s20; J765.
- Cites added and checked: counts.ts:21, :56 (cuts = splitFace + connectHole); derived.test.ts:650-654 (X_U / X_F);
  kerb.ts:1726, :1740 (kerbParts internal calls); kerbExact.ts:667 (exactRegion internal); definition.ts:117-142;
  kerb.ts:289-324 junctionEnd; M0-a-09-notes.md:2310-2314 (S19: 'No interface changed (row 173 stands)').
- Validated: one object, keys id/from/round/session/lines; 10 lines each {line, evidence, required_change}, text
  begins 'LINE n'. Session 15.9 k chars (draft 13.5 k); LINE 6 the longest (6.5 k).

## Step 5 — result written
- refute-s20.md: 14-row CHECK-AT-BINDING table; 26 findings (1 blocker R-1, 6 major R-2..R-7, 19 minor); OQ-1..OQ-4;
  UNVERIFIED list. Files exist on disk (git status shows no untracked file here — the repo's status config; nothing
  committed by this seat).
