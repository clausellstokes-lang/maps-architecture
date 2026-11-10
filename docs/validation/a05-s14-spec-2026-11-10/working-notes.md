# a-05 S14 spec refresh — working notes (2026-11-10)

Seat: SPEC SEAT for M0-a-05 S14 (the router round). Writes only in this folder.
Head at start: b81502bd (J742).

## Step 1 — read the draft entry (spec-a05-s14.json of 2026-11-02)
- 6 lines: L1 class E (pass 5 end landing, noSeat cert); L2 class S (end-stretch r8, C-0177 (2) re-reading);
  L3 D/W/P/V(/C) in pass 5; L4 Q77 2^53 tie (withinSq helper in stretch.ts) + MK/ML pins;
  L5 Q62 R-12 re-measure + pin; L6 Q142 FAR1 constructed arrangement pin.
- Draft's design: NO-SHIFT BY CONSTRUCTION (new 5th pass after passes 1-4, new optional ChainCtx field).
- Draft openQuestions Q1..Q10 (Q1 r8 re-reading ruling; Q2 J693(1) bar set; Q3 x-06 2708765650; Q4 (B) at M0/M4;
  Q5 no-shift vs declared; Q6 Q77 crossings half; Q7 class text; Q8 GATE hash; Q9 32nd seed; Q10 FAR1 regen).
- Draft cites: insertChain.ts:1630-1652 passes; :1158-1178 refusalClass; cutBack :1349-1372; stretch.ts:835-837,
  :206-215, :396-417; snapRound.ts:539 route; etc. ALL to be re-read (S8 door moved lines).
- Draft scope: insert/{stretch,crossings,snapRound,wedge,rewalk,insertChain,index}.ts + test/insert/step3-5/.
  No mention of placement.ts as edited (placement.ts:36 re-exports segmentCloserThan).

## Step 2 — draft memo, critic, fix (2026-11-02)
- Critic gaps G1..G12, verdict FIX-FIRST; fix: G1 r8 at route()'s current pair ends any depth; G2 NO-SHIFT via NEW 5th pass;
  G3/Q2 J693(1) bar read as router's set (73,243,310,751,999; relief-60 183, relief-3000 77 both configs; 6 outlines @180m);
  G4 2708765650 dropped (unlawful, x-06 repins.test.ts:47 REPORTED); G5 bar-(ii) residual REPORTED not carried;
  G6 s14-rescues.json NEW; G7 recordCounts gains class tally; G9 NEW optional ChainCtx field; G11 R-12 expected to commit.
- Session rulings on draft Q1-Q10 = J697 (memo §7): r8 RE-READING (refuter pass owed before append); Q2 router's set;
  Q3 unlawful; Q4 (B) M4; Q5 NO-SHIFT stands; Q6 a-01 shape; Q7 class text kept; Q8 GATE S9 head; Q9 20261013; Q10 regen allowed.
- Draft claims the door files absent (true on 11-02) — now LANDED (7a1fbaa6). Must re-verify.

## Step 3 — plan rows, queue rows, rulings
- plan.json M0-a-05 S14: COMPOUNDS, large; waitsOn "M0-a-09 S18 landed (chain a-06 S9 -> a-09 S18 -> a-05 S14)" — SUPERSEDED by J742 R-D
  (S18 and a-05 S14 run IN PARALLEL after a-06 S9). collidesWith: M0-a-04 S6 (placement.ts a-04's — UNVERIFIED);
  M0-a-08 S6, M0-c-03 S5 re-measure on S14's head. lines L1-3 Q83(+Q44,Q64), L4 Q77, L5 Q62, L6 Q142.
- RL13 (structured field naming refused body, e-03) — a-05 round AFTER S14. RL15 (Q135 read-only split plan) — a-05 round AFTER S14.
  R12 (B2 sliver 253/476) — measure at S14's landing; survives -> a-08 S6 FIX.
- Q83: trio 88 refused at 8611x1000 (93 before S13). Q44: 13 lawful refusals (c1 probes). Q64: 6 flat outlines @180m.
- Q152: group A (a-05 S12 declared shifts): closing 'seed 20261011 draw 1109', dryrun 'draws 389 and 1109', restage 'N2';
  group B: hardening-s15 'network 561' (B-NEST kerb.length 2 vs pinned 3), closing "fast-check's shrunk counterexample of
  seed 20261011" (face 1's kerb string differs past (2935,3961)), restage 'N1' (face 2's kerb string). notes :848-:864 table.
- Q153: flake in testkit determinism dilation.test.ts (d-08).
- Q122: S4 seed 109 -> c-03 S5 after a-05 S14.
- J742 R-C: group B's CAUSE is a line of a-05 S14; defect -> fix here; lawful within N-43's bound -> declared for a-09 2B re-pin.
  Tests never edited here. R-D: a-09 S18 (arr/ only, NO-SHIFT, pure function X(F)) and a-05 S14 parallel after a-06 S9;
  S19 (2B) after both. Review notes: bisection through pre-door trees cannot be built; exact definition oracle cannot judge
  a construction read (attraction designed difference).
- J697: rulings on draft Q1-Q10 (as memo §7). J678: S12+S13 landed 131ed5ae; NEAR 662/662; census 124 cells = caps;
  RELATED@1000 8 reds known; FAR1 survives.
- J728: Q152 opened; the six declared red until a-09 S18 (now re-ruled by J742 R-C: until 2B).

## Step 4 — owns, door, model entries
- M0-work.json: a-05 owns insert/{stretch,crossings,snapRound,wedge,rewalk,insertChain,index}.ts + test/insert/step3-5/.
  a-04 owns insert/{decimate,attractVertex,placement,splitThrough,classes}.ts + test/insert/step1-2/.
  a-02 arena/ (write.ts) + test/arena/; a-06 tx/ + test/tx/ (write-door.test.ts, door.test.ts, door-scan.ts, fuzzgen.ts, cost.test.ts);
  a-01 num/; a-03 index/; a-07 faces/; a-08 arr/winding.ts + testkit/test/kernel/arr-booleans-buffers/; a-09 test/arr/bands/ + arr/kerb;
  e-04 layout/src/districts/ + layout/test/districts/; a-14 invariants/.
  !! testkit/test/edge/repins.test.ts is now M0-c-02's (seam from x-06, J601) — draft said x-06. Fix REPORTED owner.
- Door (7a1fbaa6 LANDED): arena/write.ts 916 lines, COLUMN_COUNT 81, setters setVerticesX/Y/Out/Level/Flags, setHalfEdgesOrigin/Next/Prev/Level,
  setRoles*, setIndexHome*, setFaces*(p,level,f,x), replace*. insert/ imports: insertChain.ts:114 setVerticesOut; rewalk.ts:45 setFacesOuter,
  setFacesParent; snapRound.ts:81 setHalfEdgesNext/Prev, setVerticesOut; stretch.ts:71 setHalfEdgesNext/Origin/Prev, setVerticesFlags/Level/Out;
  placement-side splitThrough.ts:74 (a-04). Guard: test/tx/write-door.test.ts (scan of every package src via door-scan.ts; ALLOWLIST by file/fn/text).
- specs.json: 159 rounds; a-05 S12 at [127] (session ~2 kB, 3 short lines); a-06 S9 at [132] (session long; RULES with "write scope" cross-item
  paragraph form; base mirror; scope diff; seats; sequencing). retriage_spec.py RULES text read (7 rules + closing-checker sentence).
- insert/ line counts now: insertChain 1677 (draft 1676), stretch 900 (899), snapRound 937 (936), crossings 419, rewalk 581, wedge 129.

## Step 5 — (c) the placement rule's endpoint fallback: SETTLED on the code
- The fallback itself: placement.ts placePoint's inner `fallback` (:371-380; reached :385 when no sub-edge splittable, :394 when no candidate
  qualifies) — M0-a-04's file. Returns {kind:'endpoint', vertex}. Consumers inside a-05: stretch.ts planLanding :618-653
  (:648 'endpoint' -> Landing onto 'fallback'); insertChain.ts landBesideFiner :353-365 -> planLanding; land() :199-218 (candidate (b)
  'fallback' :201; split onto existing :213-217 from a-04's planAttraction (attractVertex.ts)); snapRound.ts route step 4 :692-693, :721, :724
  tag 'fallback'; stripLanding :872-904; crossings.ts :179 isFallback-like test; placeOnRun :273 (a-05's own run placement).
- The draft's LINES 1-3 change ONLY the consumers (stepTwoStrip gate, r8 in stretch.ts attractStretch exclusion + snapRound step 3 skip,
  D/W/P gates in snapRound, inFidelity) — never placePoint. So the lines CAN be built inside a-05's owns. placement.ts READ only.
  Exports usable read-only: placementCandidates, splitEndsBreachClearance, nearestLatticePoint, inSweptWedge, HOT_PIXEL_SQ.
- a-04 S6 (in flight; LEG 1 merged with a-13 S2): pins only (F1g sub-edge j vs j+1 = the fallback's subAt; CM3 slot 0; C-0373 text)
  in test/insert/step1-2 — no src change; NO collision with S14 provided S14 does not edit placement.ts. Its F1g pin pins the fallback's
  current behaviour, which S14 must not change anyway.
- If a seat finds it needs placePoint to return e.g. its candidate list or the farther endpoint: that is a-04's file -> QUESTION / REPORTED;
  smallest scope would be one new by-path export in placement.ts (no behaviour change). Recommend: not needed — a-05 can enumerate via
  placementCandidates + its own qualifies (crossings.ts placeOnRun already re-implements the (i)-(iii) tests for runs).

## Step 6 — cites re-read on b81502bd (post-door). Draft -> now (all insert/ cites shift ~+1 after the door's imports)
insertChain.ts (1677): land :158-267 -> :159-268 (fallback cand (b) :200-204 -> :201-205; split-existing :211-217 -> :213-217);
 setVerticesOut in land's undo closures :174, :262 (door); INVARIANT_THROW :118 -> :119; nearestPiece :372 -> :373 (rank :389-390 -> ~:390-391);
 freeSpot :414 -> :415; stepTwoStrip :487-584 -> :488-585 (:488 null -> :489; :493 -> :494; order :577 -> :578);
 endLanding :615 -> :616; RELAND_SQ :688 -> :689; boundRefusal :705 -> :706; RELAND_MAX :709 -> :710; relandCandidates :718 -> :719;
 freeSince :737-739 -> :738; Mark :742 -> :743; markOf :766; rollback :782-818 -> :783-~819; wholeProblem :828; FIDELITY_EVALS :845 -> :846;
 inFidelity :859-923 -> :860-~924, :880 -> :881, evals cutoff :911 -> :910; priorPath :976 -> :977; REENTRY_DETAIL :1016; reentered :1027;
 readings :1036 -> :1037 (wholeProblem :1053; r6/r7 ctx.extended :1117, :1132; E_INVARIANT text :1138);
 CLASS_OF :1149-1151 -> :1150-1152; refusalClass :1158-1178 -> :1159-1179 (:1176 -> :1177 the k; :1177 -> :1178 text);
 cutBack :1349-1372 -> :1350-1373 (near :1367, far :1368; comment :1336-1348, 'at most 8 per bound' :1344); tryCuts :1380 -> :1381
 (cutStretch 'end' :1404, 'start' ~:1427); passes :1630-1652 -> :1631-1655 (inBound :1621-1629; third :1640; fourth :1642); attempt catch :1609.
stretch.ts (900): ChainCtx anchor :177, extended :183, strip :194, chainEnd :200, cutStretch doc :206-216 (Unset… :214), chainPath :236,
 provenance :251; Provenance type :291; FIDELITY_SQ :361; inInputBound :368 (test :376); passesWithin :397 (:404); withinSegment :408 (:417);
 comment 'exact where it can decide' :395; nearParallel :442; attractStretch :788; anchor :812; atEnd/atStart :836-837; exclusion :838;
 planLanding :618 (:648 endpoint->'fallback'); Landing type :601-603.
snapRound.ts (937): MAX_PASSES :84; exitTowards :236; recordHolding :274; route :540; via :585-590; exit tags :595, :601; step 3 attractStretch
 :609; contact tags :617, :629; planLanding join/leave :633/:635; leavesAtEnd/joinsAtStart :639-640; skip :641; stretch tags :647, :652;
 wedge gate inInputBound :679, corner tag :681; fallback tag :693; planLanding crossing :696; strip gate :710, stripLanding :713;
 tag placed/fallback/endpoint :724; contact :734; planLandingAfter :747; walkRun :779 (band2 :791, test :808); stripLanding def :872; otherEnd :920.
crossings.ts (419): import from placement :40; exactCrossings :78 (double point :102); stripPartner :206 (r=51 call :219); placeOnRun :273;
 HOT_PIXEL_SQ test :339. wedge.ts: WEDGE_CAP_SQ :31, wedgeBound :36, wedgeOutcome :56, cornerMove :67, chainCorner :88.
rewalk.ts: WALK_REACH_CM :56, REACH :57, segmentBox(+REACH) :189, :372. num/exact.ts: EXACT_BELOW :29, segmentCloserThan :40, BigInt :53.
index.ts (31 lines): re-exports placePoint (a-04's) etc.
DOOR stores in insert/ (S8): insertChain setVerticesOut (land undo closures); stretch.ts setHalfEdges*/setVertices*; snapRound setHalfEdgesNext/Prev,
 setVerticesOut; rewalk setFacesOuter/Parent. -> The draft's 'arena/write.ts absent' / 'door files S8/S9's, absent' NO LONGER HOLDS.

## Step 7 — R-C: the three group-B bands tests (read on the tree)
- closing.test.ts:127 "fast-check's shrunk counterexample of seed 20261011": run() = L1 reads of every face (readKerb in readIn(p,1)),
  corridorUnion commit at L2 (AT_S9), L1 reads after; faithfulNoClosing (faithful 'taken'; spine depth <= attractCm; no closings;
  S8≡S9 Hausdorff<=1; after vs before <= 2√2·attractCm) then EXACT `expect([...r.after]).toEqual([...r.before])` + blocks 2 + wholeBand [0,3].
  Red per notes :863: face 1's kerb string differs past (2935, 3961) — i.e. the exact after==before equality (presumed; seat to confirm which expect).
- hardening-s15.test.ts:49 'network 561' (B-NEST; 3 ring ways hw 30/264/242 within 26-35 cm round an island): pins k.kerb.length 3
  (frame, hole, island '700,2119 730,2119 741,2143 717,2169 700,2149' ~1436 cm²) then normals exact, nestingProblems [], s9 blocks.
  Engine: kerb.length 2 (island gone) — notes :862. §3.7 (ARCHITECTURE.md:5409-5410): "face counts are not compared, because merging
  features closer than attractCm is the designed difference" -> lawful IFF the island's separation from the hole < attractCm and the
  two-sided distance within the bound; the seat measures it.
- restage.test.ts:95 'N1': face 2 kerb pinned '449,0 712,0 2390,92 2425,85 2455,65 2475,35 2482,0 4000,0 4000,2553 447,72', saves 3,
  census faithful 'tried', clear. Engine (notes :864): '2482,0 4000,0 4000,2553 447,69 448,15 2390,92 2425,85 2455,65 2475,35'
  -> (449,0)+(712,0) gone, (448,15) new, (447,72)->(447,69). My arithmetic: 712,0 lies ~25.5 cm from the new edge 448,15–2390,92;
  within DRY_MOVE_CM. PLAUSIBLY lawful — NOT judged (the seat measures; saves/census lines may also differ).
- DRY_MOVE_CM = 2·√2·attractCm + SAGITTA_CM (kerb.ts:679). N-s12c-3 (notes :903): S12 checker CONFIRMED the three stay red on the S11
  model (S12's features off) -> cause in S9–S11's engine (against S8-engine pins). N-s12-4 :883.
- Isolation method allowed: feature switches in a MIRROR of the current tree (as S12's S12F switches E/S/F/R/C did), per-chain trace probe
  outside the tree; NOT old trees (shallow clones; pre-door insert/ files store past the door).

## Step 8 — THE ONE targeted command (used): vitest --project kernel on closing / hardening-s15 / restage (b81502bd, post-door tree)
- Result: 3 files failed, 5 failed | 21 passed (26). Reds: closing 'shrunk counterexample of seed 20261011' (B), closing 'draw 1109' (A),
  hardening-s15 'network 561' (B), restage 'N1' (B), restage 'N2' (A). dryrun 'draws 389 and 1109' (A) not run (other file).
- closing shrunk: fails at `expect([...r.after]).toEqual([...r.before])` (the Map entries) — so faithfulNoClosing PASSED before it, i.e. the
  test's own bound (after vs before Hausdorff <= 2√2·attractCm, S8≡S9 <= 1 cm, faithful 'taken', no closings) HOLDS on today's engine;
  only the exact equality fails. [OBSERVED: the failure is the exact-equality assertion; inferring the earlier ones passed from order.]
- network 561: 'expected 2 to be 3' at k.kerb.length (first assertion of the outcome) — later assertions not reached.
- N1: 'expected [Array(1)] to deeply equal [Array(1)]' at f2.kerb (first outcome assertion) — saves/census/clear/s8s9 not reached.
- Same set as Q152 measured on abbd6ea0 (pre-door) -> the door moved nothing here (consistent with S8's NO-SHIFT).

## Step 9 — census, registers, goldens, other items' pins (for bars (f) and shift (g))
- caps.ts: 31 seeds table (103/43/49/3), recordCounts :45 writes {property, seed, runs, invariant, optional, counted, cap} — NO class;
  callers bfuzz.test.ts:260, :419, :445; fidelity.test.ts:59. MEASURED_PER_1E4 :63; MEASURED_COUNT :71. router.test.ts ratchet :1215-1219
  (now TWO lines: [107,46,49,3] and [103,45,49,3]).
- Registers (step3-5/register/): s5-register 7 (S S D P W S D), s6-register 4 (V V D S), s9-register 5 (no class text), s5-rescues 9,
  plus fix1-case1/2, n43a-buffer, n43b-s25/s60, pass2, s12-forms, s6-lifecycle. router.test.ts :1021-1022, :1024, :1035, :1108, :1130, :1157-1159.
- N-7 golden: bfuzz.test.ts:461 GOLDEN 045e8cc2…; hashes every outcome line (refusal detail included) + contentPrint -> ANY pass-5
  commit inside the slice (400 random seed 4242 + 200 constructive) changes it -> a DECLARED re-record with the per-case outcome diff.
- Trio: a-08 notes :518-534: 5 files 96/96, 538 s; 88 = fuzz 15 (buffer 10: D3 E1 S4 W2; offsetFace 5: E2 S3) + register 73
  (buffer 35: D4 E6 S22 W3; offsetFace 38: C1 D3 E4 S29 W1); sorted SHA 897f3852…. N-s5c-4 :563 register.json rows leave on commit (a-08 re-record).
- q133.test.ts (e-04): :66 B1 overlay; :69-70 183×2, 77 'buffer'; :73-74 253, 751 'buffer'; :77-80 3009257304 'buffer'; :120 buffered
  [73,243,253,310,476,751,999]. perimeter.ts:84 settlementPerimeterRung; stage.ts:473/:486 W_PERIMETER_BUFFER.
- repins.test.ts (c-02's by J601 seam, NOT x-06): :134-135 pins 4101706098, 2461000155, 3009257304 (S6/self-touching) and 2708765650,
  14238338 (S6/coincident) 'absorbed on their first state' (e-04's buffer rung, Q140, J691); :157 EP-01/S5a/coincident 1658509524 (known red).
- Timings (a-05 notes / verdicts): NEAR 870–1018 s (28 files 662 at S13); RELATED@1000 6331–7329 s (472–474 files; 8 known reds);
  census per seed 375–461 s at W=1 (32 seeds ≈ 3.3–4.1 h a pass; BEFORE + AFTER ≈ 7–8 h); kernel-tiny fidelity 48–54 s/seed (~27 min);
  bands gate 6 seeds; trio 538 s a run.
- bands gate: a-09 bfuzz.test.ts at PLAT_FUZZ_SEED 20261011/1012/1/2/3/4 (10^4 chord + 2000 widened), cells per C-0456 (4) form.

## Step 10 — decisions for the refreshed entry (before writing)
- Lines (10): L1 class E; L2 class S (r8); L3 D/W/P/V/C; L4 notBuilt #2's MEASURES (trio, census by class, router's set on the
  overlay, the J238 (1) proof aggregate); L5 Q77 2^53 tie; L6 MK/ML pins; L7 Q62 R-12; L8 Q142 FAR1; L9 R-C group-B cause (NEW);
  L10 the declared shift + bands gate + NO-SHIFT golden diff (a measurement row).
- No cross-item scope: (c) settled — every line in a-05's owns; placement.ts read only. Contingency: a needed placePoint change is a
  QUESTION/REPORTED (smallest scope: one by-path export of placePoint's candidate order, no behaviour change) — expected unneeded
  (crossings.ts placeOnRun already re-implements (i)-(iii) with reach up to BOUND).
- Door: every new undo closure / store through write.ts's existing setters (land's form :172-176, :261-264); a new column id/setter = a-02's -> QUESTION.
- Other items' files moving (REPORTED, session routes): e-04 q133.test.ts :66-84/:103-120 and collinear.test.ts goldens :87/:148;
  a-08 testkit/test/kernel/arr-booleans-buffers/register.json rows; a-09 test/arr/bands (cells; the six); c-02 repins.test.ts :134-135;
  x-06 testkit/test/edge/ states; a-06 test/tx pins of 'along' 648 @13 (if R-12 commits); fusion/integrated roots (bench, session's).
- Next free ledger ids now: C-0471 / L-0756 (read at build time). No lane key fix-s14 / close-s14 in lane-events.log -> S14 is right.
- Session clause: 'Hardening round S14' notes section; seats build opus/high, fix opus/high, check fable/high, recheck opus/medium.

## Step 11 — writing the entry via scratchpad/a05s14/gen.py -> spec-a05-s14-r2.json (in progress)
Mutant names: L1 E-OFF E-WIDE E-FIRST E-EARLY; L2 S-OFF S-SEGEND S-ANGLE S-EARLY; L3 D-OFF W-STRIP P-STRIP V-BUDGET; L4 CODE (pass-5 refusal's own code),
L5 Q77-DBL Q77-STRICT Q77-THROW Q77-HALF; L6 MK ML; L7 Z13; L8 FAR1 (FAR2 stated); L9 the seat's isolating switch (fix) / checker re-measure (declare);
L10 the golden per-case diff + bands per test/per cell + roots.

## Step 12 — entry written: docs/validation/a05-s14-spec-2026-11-10/spec-a05-s14-r2.json (11 lines; session 14.5 k chars)
- LINE 9 split into LINE 9 (reproduce & isolate) and LINE 10 (judge: §3.7 area relation, N-43 two-sided DRY_MOVE_CM over edges, warnings,
  a vanished ring lawful only where trace shows its bounding inputs < attractCm apart and merged); shift line is LINE 11.
- Line sizes 1.3–4.1 kB (LINE 1 4.09 kB). Generator: scratchpad/a05s14/gen.py.
- Refuter pass on §4 (A) owed by J697 (1): NO record found on the tree (no validation folder, no PROGRESS mention) -> QUESTION.
- Questions drafted: Q1 R-D vs plan waitsOn; Q2 other items' new reds (e-04 q133 certain) — REPORTED vs scope; Q3 refuter pass;
  Q4 LINE 10 (v) reading of §3.7 for a vanished ring; (ops note: long-wait hand-off).

## Step 13 — rendered: build 65 741 chars, check 63 956 chars (prompts-a-05s14.json; full specs copy + entry, 160 rounds); machine linux Xeon 4cpu 16gib maxLanes 2 workerCap 8

## Step 14 — memo written (spec-a05-s14-r2.md); JSON validated (keys id/from/round/session/lines; 11 lines). DONE.
