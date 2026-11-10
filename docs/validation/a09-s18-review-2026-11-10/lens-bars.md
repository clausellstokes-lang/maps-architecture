# Review of the a09-s18 spec draft — lens: can every bar fail, and can a seat measure it

Reviewer seat, 2026-11-10, on the design head (7a1fbaa6 carried). Findings BARS-n appended as established.

## BARS-1 (blocker) — S18 L6's CITY shadow measures nothing: in S18 nothing fills the store during S8, so no face "would derive"
- Draft: S18 L1 REQ "In THIS round only the STATE READ (line 4) fills or serves the store; kerb() and readKerb serve the
  construction exactly as today." L4 REQ: the shadow runs "after every served read ... of a face whose state read would
  DERIVE ... The shadow writes nothing, reads the store only". L3: a child derives only when "its parent's key has an entry".
- Code: S8 reads only through kerb() (bentCutFabric.ts:653, :729, :924); the harness through kerb() (measure.ts:550) and
  corridorUnion → bandCore readOn → readKerb (bandUnion.ts:584-586). None calls the new STATE READ. The observer's
  `after` (L2) records keys and rows, not a region. So at CITY the store holds no parent region, no face would derive,
  the shadow never compares, and L6's share ("faces whose derived region equals the construction's, over the faces
  derived") is 0/0; L6 (i) "0 derivation defects" holds vacuously. Any build — including one with no derivation at all —
  passes L6. The REPORTED "share of S8's reads that would derive" is 0 by construction.
- Change: L1/L4: "in the debug build, every served construction read with vertexContacts true KEEPS its region as the
  face's entry (origin construction) — a store write, never an arena write; the shadow may derive a child from such an
  entry". Add to L6 a FAILING floor: faces derived > 0 on each seed and ≥ X % of the children S8 cut (X stated from the
  observer's lineage count, e.g. ≥ 0.8 of cuts' children), and a planted-defect control run of the probe (the 3 cm seam
  of L4 switched on) which must FAIL the probe's bar.

## BARS-2 (blocker) — `--stage S9` does not exist in the profile tool's derivation; S18 L7 (2) and S19 L2 (ii) cannot be run
- Draft: S18 L7 REQ (2) "… --mode count --fns … at --stage S8 and at --stage S9, base and tree"; S19 L2 REQ "… and the
  same at --stage S9 … (ii) in S9's window createPlat = buildOverlay = 0, and construction reads in corridorUnion = …".
  Memo §2: "--stage S9 and --fns with file:line resolution already exist (index.ts:76-77)".
- Code: index.ts:76-77 only checks the NAME's form (`/^S\d+[a-z]?$|^SKY$/`). driver.ts runs `derive(run, seed)`
  (fusion/runs.ts:332-352), whose registry is registerBase's six stages S1 S3 S4 S5 S6 S8 (layout/pipeline/base.ts:949;
  the fusion run drops S6, runs.ts:318-327); driver.ts throws `the ${run} run registers no stage ${stage}` when `seen === 0`.
  The harness's S9 (corridorUnion per district) runs only in measure.ts s8s9 AFTER derive ("the run registers no S9,
  M1's", measure.ts:545-546), which the profile driver never calls. No layout source calls corridorUnion (git grep).
  So every S9 count bar is unmeasurable with the named command (exit 1).
- Change: either (a) a scratch count probe in the mirror that runs derive + s8s9 under Profiler precise coverage with
  takePreciseCoverage at s8s9's corridorUnion loop's boundaries (the driver's form), its file and printed table in the
  notes; or (b) bench/src/profile gains an `--harness-s9` window (a session-owned file — then it must be in the scope).
  Also: the profile's --fns matches by NAME (counts.ts defsOf: `^name\d*$`), not by file:line — the entries must say
  "pass the name; read the definition by its printed file:line", and the new functions (the STATE READ, the derivation)
  must have unique names.

## BARS-3 (major) — S18 L7's roots cannot see a leak into S9's reads, the debug build, or vertexContacts false
- Draft: S18 L7 (1) roots by `bench -- profile` plain, (2) counts at S8/S9; memo §5 "roots identical … fails on a wrong
  build because 2A leaks the derived kerb into a served read".
- Code: the profile tool always runs the PRODUCTION bundle (bundle.ts define PLAT_DEBUG_BUILD=false; index.ts:8-9), so
  the shadow (debug-only, L4) never runs under the roots or the counts. The root is d.model.root after derive (driver.ts
  `root: hex(d.model.root)`): it digests S1–S8 only — corridorUnion/bandCore (bandUnion.ts:584 readOn → readKerb) and
  bandUnion (vertexContacts false, :941-956) never run inside derive. Wrong builds that pass L7: (a) the STATE READ wired
  into bandCore's readOn (S9 commits served from kept/derived entries); (b) the shadow (debug only) perturbing the read it
  shadows (a shared `cache` Map — readKerb's 4th argument — filled by the derivation's readFace/readSpine, or a kept
  entry served); (c) the state read wired into readKerb only when vertexContacts is false. The bands tests do not catch
  (a)/(c): their faces are made by insertChain (support.ts:376-388), carry no lineage, so the state read constructs anyway.
- Change: add to L7 (1) the harness's own record in SOURCE mode: `corepack pnpm bench -- fusion --from 3 --seeds 1
  --runs fusion,integrated --workers 1` (and integrated 4) in the base mirror and on the tree, report.json byte-identical
  (it holds no wall-clock, index.ts header) — this digests the debug build, the s8s9 record (S9's commits, beyond,
  zero, missCm) and the census. Add a derived.test.ts pin: corridorUnion and bandUnion over S8-like cut faces WITH
  lineage and kept entries: their read counts and committed state equal to the same run with the store emptied
  (mutant: state read in bandCore → red).

## BARS-4 (major) — S18 L7's prod-bundle runs may not contain the observer at all; then "counts identical" and the observer's cost prove nothing
- Draft: S18 L2 REQ "Cost: one content key per cut on each side (O(ring)), in the prod bundle too — line 7 shows it moves
  no output and quotes its cost"; L7 (2) "the observer adds calls of its own, which the tree's run lists apart"; memo §6
  risk 9 "If the observer's installation is dropped … 2A's count identity would not [catch it]".
- Code: kernel/package.json:8 `"sideEffects": false`; the profile bundle is esbuild with bundle:true (bundle.ts), which
  drops a sideEffects-free module whose bindings are unused — together with its top-level installation. In S18 the
  served path (kerb() → readKerb → construction) need not reference kerbState.ts at all except through the DEBUG_BUILD-
  guarded shadow. So the prod runs of L7 can be identical simply because the observer is absent; the S18 "cost quoted"
  is then 0 and is not the cost 2B will pay.
- Change: L7 (2) FAILING: in the tree's count run at S8 the observer's `before` and `after` (named, their defs printed
  by file:line) each = splitFace + connectHole calls of the same run (exact, deterministic); a 0 makes the round VOID,
  not passed. Add the same check in a source-mode run (the derived.test.ts pin "observer installed by importing kerb.ts
  alone" — import only arr/kerb.ts, call splitFace, lineage recorded).

## BARS-5 (major) — The truncation mutant of L3 survives both oracles of L5: the ≤ 1 cm class is REPORTED, not failing
- Draft: L3 MUTANTS "truncation in place of the rounding rule … each red on these pins or on line 5's property"; L5 (ii)
  "where the construction read moved no part, equal canonical rings (a difference ≤ 1 cm counted apart and REPORTED with
  its cause)"; L5 (i) "no vertex … deeper … than the lattice's 1 cm plus SAGITTA_CM"; memo §6 risk 1 says the 1 cm cases are
  counted apart. L3's pins "each asserts the derived region against line 5's two oracles" (no literal rings).
- Why it passes: truncating an intersection instead of insertChain's rounding moves a vertex by < 1 cm. (ii) classes that
  as "within 1 cm" → REPORTED; (i) allows 1 cm + SAGITTA; the 20 cm grid with its 2 cm margin cannot see it. The same holds
  for a derivation that rounds every new vertex by a different (but lattice) rule, or that drops a straight-through
  vertex the construction keeps (canonical rings differ, Hausdorff 0–1 cm). Also: support.ts hausdorffCm (:438-470) is an
  upper bound "within 2 cm of the exact value", so the 1 cm class cannot be judged with the folder's only distance tool.
- Change: L5 (ii) FAILING for unattracted reads: canonical rings equal, 0 cases ≤ 1 cm EXCEPT those whose cause is shown
  per case to be the construction's (each listed with the construction's vertex and the lattice rule); the comparison by
  exact canonical-ring equality then vertex-to-segment distance in exact integer arithmetic (name the function; not
  hausdorffCm). L3's pins assert LITERAL derived rings on hand-computed lattice fixtures (at least the straight lane, the
  T end and the slit), so the rounding mutant is killed by a literal, not by a tolerance.

## BARS-6 (major) — The definition oracle is not independent: spineDepth takes kerb.ts's own Spine (junction flags, hw samples)
- Draft: L5 (i) "§3.7 read independently of any construction: … no vertex … deeper in any of the child's spines' buffers
  … (spineDepth), and every sample of a 20 cm grid … inside the derived kerb exactly when it lies in no spine's buffer".
- Code: support.ts:703 `spineDepth(rings, s: Spine)` reads `line.junction[j]` and `line.hw[k]` — the Spine that kerb.ts's
  readFace/readSpine/junctionEnd (kerb.ts:257-287, :303-324, :335-427) produced; the derivation reads the lane "as
  readSpine reads any spine … ends by junctionEnd" (L3 REQ). A wrong T/declared-end decision, a wrong hw sample, or a
  wrong spine SET for the child (L3's "the child's spines are the parent's spines still incident … plus the lane"; the
  'inherited' class) is then shared by code and oracle. Which "child's spines" the oracle uses and which point-in-buffer
  test the grid uses (arr/buffer.ts bufferParts would again be the implementation's) is not stated. "simple" has no named
  check (nestingProblems, :790, checks only nesting parity).
- Change: L5 (i): the oracle's spines come from the GENERATOR's truth (the test knows each way and lane it inserted: its
  points, its declared hw / knot profile, and which end it T'd onto which spine), as deepestInWays (support.ts:671) does;
  point-in-buffer written in the test from the definition (distance to the polyline ≤ interpolated hw, the T end as a
  half-plane), never bufferParts or Spine; a named simplicity check (no two non-adjacent edges meet, exact). State the
  grid's blind spot and close it: add a sample at every vertex of the derived kerb and of each band outline offset 2 cm
  both ways, so a missing or extra component thinner than 20 cm is seen.

## BARS-7 (major) — S18 L6's gating "exact share ≥ 0.91" measures the construction's attraction rate, not the derivation; its denominator is unstated
- Draft: L6 FAILING (ii) "the exact share — faces whose derived region equals the construction's, over the faces derived
  — ≥ 0.91 on each fusion seed (KI-13's ratchet, C-0320 (4))"; memo §5 "a systematically wrong derivation drops the
  per-face share".
- Why it cannot do its job: by L5 (ii) an unattracted face must already be EXACT; the share therefore ≈ 1 − (attracted
  share) − (≤ 1 cm class). 986 (e) (4) estimates the attracted share at 3–8 %, KI-13's smoke S8 ≡ S9 shares are
  0.913–0.935 (docs/KNOWN-ISSUES.md:30). So a CORRECT derivation fails the bar whenever the construction attracts on > 9 %
  of the faces (not 2A's to change), and a derivation WRONG on every attracted face passes it (attracted faces are
  non-exact either way). 0.91 is KI-13's per-BLOCK S8 ≡ S9 ratchet (measure.ts S8S9_EXACT_FLOOR), a different comparison.
  Denominator: the shadow runs "after every served read" — S8 reads a face in kerbFace, kerbSeed, makeBlock's read and
  the needle floor (bentCutFabric.ts:653, :729, :924), the harness again at measure.ts:550, corridorUnion up front and
  offRead after its L2 writes (bandUnion.ts:584, :602). "faces derived" by slot is wrong (split.ts:10-12: a slot is reused by
  one child); by read it is weighted by S8's read pattern; offRead's post-write construction legitimately differs
  (bandUnion.ts:588-593, B-CLOSE) and would flood the 'beyond' class.
- Change: L6 FAILING: (a) unattracted derived reads: 0 non-exact outside the per-case construction-caused list (as
  BARS-5); (b) every 'beyond' judged by the definition oracle (as written); (c) faces derived > 0 (BARS-1). The share
  becomes REPORTED, with its definition: distinct content keys derived in S8's window (dedup by key, first read), the
  harness's L1 read and S9's up-front reads tallied separately, offRead's reads excluded from the shadow (or tallied apart).

## BARS-8 (major) — The 'attracted' flag is per READ, so one moved part anywhere licenses DRY_MOVE_CM over the whole face
- Draft: L4 'attracted': "a part not laid exactly, a collapsed or unrouted run, a restaged read, a faithful read taken";
  L5 (ii) "where it moved one, Hausdorff ≤ DRY_MOVE_CM" (≈ 73.5 cm + sagitta, kerb.ts:679); its only pin: true on a
  W_ATTRACTED fixture, false on one laid exactly; mutant "always true".
- Code: dryInsert (kerb.ts:1401-1484) knows per PART whether it was laid exactly (laidExactly :1477), which run collapsed
  (W_ATTRACTED at piece.points[0], :1441-1449; `d.unlaid`) and where points moved (noteMoved). A derivation wrong by
  50 cm on part B of a face whose part A collapsed passes (ii). Partial over-flagging mutants survive the pins: e.g.
  'attracted when the read has ≥ 2 parts', 'attracted when the faithful read was TRIED (not taken)', 'attracted on any
  W_STRETCH_SHARED'. Only the definition oracle then guards these faces, and at CITY (L6) it runs on 'beyond' cases only.
- Change: L4: the construction read returns the attracted LOCI (the moved / unlaid points and the not-exactly-laid
  parts' outlines), not a boolean; L5 (ii) and the shadow: exact outside DRY_MOVE_CM of every locus, Hausdorff ≤ DRY_MOVE_CM
  within it. Pins: a two-part face with one part collapsed: the far part compared exactly (a 3 cm planted offset there
  red); a faithful read 'tried' not taken: not attracted. Report the flagged-but-equal count (flag set, derived ≡
  construction) as a check on over-flagging. L6: run the vertex-depth half of the definition oracle on EVERY derived face
  at CITY, not only on 'beyond'.

## BARS-9 (major) — derived.test.ts has no stated size, strength or time, and would run at PLAT_FUZZ_RUNS = 10⁴ in NEAR
- Draft: L5 "a fast-check property over B-FUZZ's networks … to a recursion depth of 4 — every child read both ways after
  each cut … its sizes scaled by PLAT_FUZZ_RUNS"; the gate "NEAR at full strength"; "in the kernel and kernel-tiny projects".
- Code: tools/vitest/fast-check.setup.mjs:1-33 sets every property's numRuns to PLAT_FUZZ_RUNS, 10⁴ when unset (the PR /
  "full" size); bands/bfuzz.test.ts:38 reads it the same way. Per network: every L1 face cut to depth 4 (≤ 15 cuts, ≤ 30
  child reads a face), each child read by construction (a dry-run: opSave + insertChain per part, ms) and by derivation,
  plus a 20 cm grid over the child (a 40 m frame = up to 40 000 samples × spines × segments). 10⁴ networks is hours;
  NEAR today is ≈ 1 000 s. kernel-tiny includes only test/insert/step1-2, step3-5 and tx (vitest.config.ts:37-41): no
  bands/ or faces/ test runs there, so "the kernel-tiny project as bands/ runs there" is empty.
- Change: L5 names the property's own numRuns (allowed: "a property whose bar names another size", setup :1-4), e.g.
  200 networks × ≤ 8 faces at default and ×0.1 under RELATED@1000, a per-file time budget (≤ 120 s NEAR), the grid only
  on the 'beyond' and a seeded 10 % of children; drop kernel-tiny or say derived.test.ts is added to no tiny project.

## BARS-10 (major) — The debug-only comparison: the "flag off" pin cannot be built, recorded defects are thrown away in every other test, and 2B's reversed oracle breaks 2B's own count pins
- Draft: S18 L4 "THE SHADOW, in the debug build only (DEBUG_BUILD; never in the prod bundle) … RECORDED — never thrown";
  pin "with the debug flag off no shadow runs (counted)". S19 L1 "THE ORACLE IN THE DEBUG BUILD, REVERSED: the
  construction read runs beside every DERIVED read served in a source run"; S19 L1 pins "a child read after a cut: 0
  dry-runs"; "corridorUnion … 0 constructions over faces with entries (counted)"; S19 L4 (10) "corridorUnion's reads now 0
  dry-runs, asserted".
- Code: DEBUG_BUILD is a module const from the free identifier PLAT_DEBUG_BUILD (invariants/debug.ts:12-15); a vitest
  source run cannot set it per test, so "flag off" is unreachable in derived.test.ts. The runtime switch that IS testable
  is debugMode() = DEBUG_BUILD && debugAssertions() (setDebugAssertions, arena/debug.ts:11; facade.test.ts:23 uses it).
  Every vitest run is a debug build, so in 2B the reversed oracle runs a construction (opSave, insertChain, rollback)
  beside each derived read inside the very tests whose opSave / insertChain mocks (dryrun.test.ts:19-32,
  restage.test.ts:24-29) must count 0 → a correct 2B is red, or the seat removes the oracle to go green. In S18, RELATED
  over kerb.ts / kerbState.ts / split.ts selects every layout, testkit and bench test that runs S8 in source mode: the
  shadow runs there on thousands of real cuts and its records are never read — an exception inside the derivation or a
  self-intersecting derived ring is silently recorded.
- Change: gate the shadow / oracle on a by-path runtime switch (default on in debug, off in prod by DEBUG_BUILD) that
  tests can turn off; S19's 0-dry-run pins run with it off and ONE pin with it on asserts the oracle's own dry-runs are
  counted apart. The shadow THROWS (debug only) on its own internal failures and on a derived ring that fails the
  cheap self-checks (simplicity, nesting) — not on a construction mismatch — so NEAR/RELATED surface them. In the prod
  count run (S18 L7 (2)) list the shadow's function with 0 calls, by name, as the proof it is not in the prod bundle.

## BARS-11 (blocker for S19 L6, major as a pattern) — S19's per-read cost bar: the numerator is not obtainable as defined and "inlining off" cannot be run with the tool
- Draft: S19 L6 (1) "A DERIVED READ := the inclusive time of the derivation plus its splitsOn under the state read,
  divided by the derived reads counted … a MEAN … ≤ 50 µs is the FAILING bar, read from the cpu run (VOID if inlined:
  repeated with inlining off)"; ONE RULE: "a mean above 50 µs while line 2's counts all hold is REPORTED".
- Code: analyse.ts gives inclusive time by NAME (each name once per sample, :150-158) and joint "A>B" (B anywhere below
  A, :175-185). "splitsOn under the state read" includes splitsOn of the state read's KEPT and CONSTRUCTED reads (L4: "each
  passed through splitsOn"), while the denominator counts derived reads only → biased upward; adding derivation +
  splitsOn double-counts if splitsOn runs inside the derivation. If the derivation is inlined its name gets ~0 samples and
  the mean reads ≈ 0 µs — the bar passes vacuously (J627's "opSave + putBack reads about 0" pattern). "Repeated with
  inlining off" is impossible with the landed tool: index.ts runChild spawns `process.execPath, [bundle, …argv]` with no
  execArgv, and NODE_OPTIONS refuses the flag (run here: `NODE_OPTIONS=--no-turbo-inlining node -e 1` → "node:
  --no-turbo-inlining is not allowed in NODE_OPTIONS"). And the ONE RULE turns the only failing cost bar into a report
  whenever the counts hold (which L2 makes the normal case), so in practice the bar cannot fail the round.
- Change: L6 (1): the derived read is ONE named function (derivation + its splitsOn inside it, no other caller); numerator
  = its inclusive ms by name; denominator = its calls in a count run of the same seed (deterministic); VOID when its
  samples < 50 or its share of the state read's inclusive time is < 1 % while counts > 0; since inlining cannot be
  switched off through the tool, make the seat's instrumented scratch run (hrtime around each call of that function in
  the prod bundle, mean / median / p90 / max) the FAILING figure and the cpu figure the informative cross-check — or
  give the profile tool a `--v8-flags` pass-through (a session-owned file, then in the scope). State that the ONE RULE needs the session's re-ruling BEFORE the landing (as written) and
  that a REPORTED miss holds 2B's landing.

## BARS-12 (major) — S19 L2's construction bound is defined by the store's own misses, and L5 cannot catch "S9 not reading the state"
- Draft: S19 L2 (i) "S8's construction reads … ≤ the L1 faces S8 reads with no entry — the faces of its districts at S8's
  start plus each face whose content no cut made … the bound computed in the probe"; memo §6 risk 2 "Line 2 of 2B
  bounds those counts by 'faces with no entry', so a high miss rate shows up". Memo §5: L5's S8 ≡ S9 "fails on a wrong
  build because S9 [is] not reading the state".
- Why: (a) "with no entry" moves with the defect: an unstable content key (the straight-through drop missing a bent
  T-vertex, risk 2) produces more faces with no entry, and the bound rises with the count. "each face whose content no
  cut made" leaves open the neighbour whose boundary a cut's insertion bent (made by no cut, but changed by one). "the
  probe" is not defined in L2 (the count run is the prod profile run, which has no store access). (b) measure.ts:509-550:
  S8 ≡ S9 compares the harness's own L1 kerb() read with corridorUnion's commit. If corridorUnion constructs while
  kerb() serves the state, the two differ only on attracted faces and within N-43's bound — `beyond` stays 0 and the
  exact share drops by the attracted share (3–8 %), above 0.91. L5 passes; only L2 (ii) (unmeasurable, BARS-2) would fail.
- Change: L2 (i) bound computed WITHOUT the store, in a source-mode probe from S8's op log: |district faces at S8's
  start| + |faces created by an op other than splitFace / connectHole / the take-out's merge-back| + |neighbours whose
  route rings changed beyond the straight-through rule|, each set listed; FAILING also: constructions of faces WITH
  lineage = 0. Strike "S9 not reading the state" from L5's failure modes (memo §5) and make L2 (ii) the only bar for it.

## BARS-13 (major) — S19 L3's shift declaration cannot fail: no control separates the intended shift from a second cause
- Draft: S19 L3 (1) "THE ROOTS … EXPECTED TO DIFFER; the choices row DECLARES the shift"; memo §5 "roots move, declared
  — fails because a shift with another cause shows as an unexplained moved value — gating (declaration complete)";
  MUTANT "the state read disabled → the re-pointed pins and derived.test.ts's served-from-state pins red".
- Why: any root movement can be declared, so "declaration complete" is a form check. Nothing shows the movement comes
  ONLY from serving the state: a change in offRead's B-CLOSE path (S19 L1), in bandUnion, in the observer, or a derived
  kerb wrong within the oracles' tolerances moves the roots just the same. Q5 uses "the same test green with the state
  read disabled in a mirror" for other items' pins, but not for the roots.
- Change: L3 (1) FAILING control: in the lane's mirror, the switch disabled by its by-path setter (the state read serving
  the construction) gives roots, counts and the harness's report.json byte-identical to the BASE mirror's (fusion 3,
  integrated 4) — any difference is a second cause and fails the round. Then the declared shift is exactly "switch on vs
  switch off" on one tree. Also quote the stage roots (driver.ts records stageRoots in <tag>.json; plain prints only the
  final root): S1–S5 equal, S8 moved.

## BARS-14 (major) — Q152's six (S18 L8–13): the "lawful" judgements are one-sided, L9's assertion is the law itself, and L11's yardstick contradicts ruling (d)
- Draft: L8–13 "re-pinned on the base, judged by oracles"; e.g. L12 "JUDGE it — the tip … still absent (clear true, the
  depth oracle within the bound), the ring simple and S8 ≡ S9 … lawful: re-pin the kerb string"; L9 "JUDGE … S8 ≡ S9
  (r.after ≡ r.before as the test asserts) — lawful: re-pin each changed literal"; L11 "the island LAWFULLY absent only if no
  point of it deeper than 1 cm from every band edge lies outside all three bands … else it is a defect".
- Code / why: (a) clear, spineDepth / deepestInWays and nesting test only that no kerb lies INSIDE a band; a re-pinned ring
  that LOST kerb area passes all of them. That is exactly what two of the reds show: restage N1 (restage.test.ts:103)
  pinned `449,0 712,0 2390,92 … 447,72`, the base gives `… 447,69 448,15 2390,92 …` (a-05 notes :864) — the stretch
  (449,0)–(712,0) and the wedge up to (448,15) are gone; network 561 (hardening-s15.test.ts:62) loses a 1 436 cm² island.
  A seat that re-records the base values and runs the listed checks cannot be refused. (b) closing.test.ts:127-137's only
  face-1 assertion is `expect([...r.after]).toEqual([...r.before])` (:134; faithfulNoClosing :86-97 has no literal): "face
  1's kerb string differs past (2 935, 3 961)" (a-05 notes :863) IS that assertion failing — there is no literal to re-pin;
  "re-pin" can only mean weakening B-CLOSE's law (exact) to the bound faithfulNoClosing already checks at :95. (c) L11's
  rule (strict definition) contradicts ruling (d) (N-43's DRY_MOVE_CM is the owner-approved fidelity bound): an island
  closed by an attraction ≤ DRY_MOVE_CM (gaps 26–35 cm) is lawful under (d) and a defect under L11.
- Change: per test, an honest re-pin shows, by a two-sided check: every grid point (≤ 20 cm, plus the lost polygon's own
  vertices) that the OLD pin held as kerb and the base drops lies inside a band by the generator-truth definition, or
  within DRY_MOVE_CM of the base kerb with the read attracted (BARS-8's loci) — the lost polygon printed with its area and
  depth. L8 (draw 1109): face 0's full normal form, closings [], AND the old closing's pin (0,1631) shown still on the
  kerb (as the test's last line asserts today). L9: the after≢before is a B-CLOSE defect unless the distance is within the
  attracted relation — weakening `toEqual` to that relation needs a ruling (REPORTED), never a silent re-pin. L10 (draws
  389/1109): face 1's kerb [] shown by the definition (no point of face 1 deeper than 1 cm outside every band) — two-sided
  already; keep it. L11: name ONE yardstick (KI-13's relation, the definition's verdict reported beside). L12 / L13: the
  lost (or gained) region between old and new rings judged two-sided as above; saves / census re-pinned only with the
  bisected cause. Each group-B re-pin's mutant is the bisection mirror's pre-dcf05e0c insert/ file set (named).

## BARS-15 (major) — S19 L6 (2)'s slope bar is absolute, while the base's own slope is ~10× it; and it is a wall-clock figure on a shared box
- Draft: S19 L6 (2) "The total least-squares slope over the 100-cut windows ≤ 0.5 ms a cut per window — FAILING (the growth
  term is structural; the base's slope beside it)"; memo §5 "fails because a growing term (e.g. a store scanned per read)".
- Code / record: growth.ts fits `perCut = wallMs / cuts` per window (profiled wall time). On 8d5ffdcd the base read
  "ms a cut 66.0 + 4.84" per window, savepoint 3.47, restore a read 1.15, GC 0.62 (plat/docs/build/checks/profile-tool.md:
  168-170). Whether M0-a-06 S9 brings the base under 0.5 is unknown (not on this tree). If not, 2B fails on terms that
  are not its own (index, restore, GC); if the switch removes the reads' dry-runs the total may drop under 0.5 even with
  a store scanned per read (its ~µs growth hidden in the noise of a profiled wall-clock slope; the noise itself is only
  "the difference of the base's two total slopes").
- Change: FAILING bar on 2B's own term, deterministic where possible: (a) a derived.test.ts pin that a state read visits
  O(1) store entries (a by-path counter: entries examined per read ≤ 2, at 10 and at 1 000 entries); (b) the state
  read's own inclusive ms a read per window (the windows table's named column ÷ reads) slope ≤ 0.02 ms per window; the
  total slope REPORTED beside the base's (tree ≤ base + noise, not ≤ 0.5).

## BARS-16 (minor) — The census of rule (4) is mis-described and cannot see 2A's code
- Draft: S18 session rule (4) "B-FUZZ (kernel/test/arr/bands/bfuzz.test.ts) at 10⁴ per property at seeds 20261011 and 1012
  with PLAT_FUZZ_COUNTS read"; memo §5 census row "fails because any change in the construction".
- Code: bands/bfuzz.test.ts never reads PLAT_FUZZ_COUNTS (only insert/step3-5/caps.ts:41-46 does); its census is the
  console.info lines `B-FUZZ bands: … refusals per operation …` (:226, :261, :305), read under `--silent=false` as S17 did
  (M0-a-09-notes.md:1769-1780, row 150). B-FUZZ builds networks with insertChain only (support.ts:376-388): no splitFace,
  connectHole or state read runs, so the census is a guard on the construction only.
- Change: rule (4) "the `B-FUZZ bands` console lines under --silent=false at PLAT_FUZZ_SEED 20261011 and 1012"; add a
  new registered family printed by derived.test.ts at the same seeds: construction stand-ins by cause (no entry, stale,
  lane unreadable, step refused), 'inherited' cases, observer internal failures — recorded on the tree (base: none),
  "never rising" from S19 on.

## BARS-17 (minor) — The CITY probe and S19 L2 (iii) are not specified well enough to be reproduced
- Draft: S18 L6 "a scratch test file … deriving fusion seeds 1, 2 and 3 and integrated seed 4 at CITY through the harness's
  own derivation … once by the build seat and once by the checker"; S19 L2 (iii) "the derived reads ≥ the children S8 read".
- Missing: the entry point (derive + s8s9 in-thread, not measure(): measure runs the skeleton corpus and every other bar);
  workers = 1 (pool.ts:23-41: with W > 1 the seeds run in worker threads whose module instance — and diagnostic WeakMap —
  the probe cannot read); vitest's per-test timeout raised; the printed table's columns; the reproduction criterion
  (the per-seed table byte-identical between the build seat's and the checker's run — it is deterministic); the expected
  time. From the record: fusion 3's S8 was 143.1 s prod and 216.8 s tsx-debug on 4abd334a (profile-s8-after-q18.md:15,
  :56), ≈ 85 ms a cut prod after round 1 (profile-tool.md) — so ≈ 3–6 min a seed in source mode before the shadow and the
  harness, ≈ 20–40 min for the four seeds; a count run at CITY is ≈ 9 min (profile-tool.md "Count mode"). "children S8
  read" in (iii) is not a coverage figure (counts.ts counts calls by name), so it needs the same source-mode probe.
- Change: write these into L6 / L2, and give the probe's command line verbatim.
