# M0-a-09 S19 spec seat — working notes (2026-11-10)

Design branch claude/great-bell-qm3tio at b3c1f41b (J757). Read-only outside this folder.

## Step 1 — the carry lists (spec-a09-s18-r3.md)

- r3 memo :87-112 THE WIRING ROUND'S CARRY LIST: starting text r2 LINES 7, 11, 12, 13, 14; amended by S18R-8, -10,
  -13 (3)-(4), -16, -17, -19, THE SPLIT (f). Module-comment paragraph naming kerbExact.ts moved here (ruling (2)).
- r2 LINE 7 (motion flag kerbMotion) is OPTIONAL now: S18's insertChain wrapper may stand instead. If a flag is built,
  S18R-17's caveat (faithful-served "unmoved" = within ~0.71 cm of `stepped`'s snapped points, kerb.ts:1024).
- r3 :114-122 THE 2B CARRY LIST (NOT mine): DESIGN-5 (S19 half), -6, -7, -8, -9/-10 (S19 halves), -11 (3); SCOPE-5,
  SCOPE-7, refute-scope "Missed"; BARS-2, BARS-10 sub 3, BARS-12, -13, -14, -15; SEQ-1..4, 6..11; designs P/H.
  NOTE: the brief (task) asks me to read BARS-12, -13, SCOPE-7, "Missed" "for rows that concern a shadow and a CITY
  probe" but says "a row marked for 2B stays out". r3 marks BARS-12, BARS-13, SCOPE-7, Missed as 2B. Conflict to
  resolve when reading them (see step 5).
- r2 LINE 11 (shadow): in readKerb after served result final and CENSUS set, behind DEBUG_BUILD; logs per distinct
  key; recompute throws on differ; seams exactSeam.offsetCm / .force; pins SM1-SM5.
- r2 LINE 12 (CITY probe): scratch city.ts, source mode tsx --conditions=plat-source, derive + s8s9 in-thread (not
  measure(), not the pool); seeds fusion 3 / integrated 4 at CITY, fusion 1,2 / integrated 1,2 at TEST_SIZE
  {frameHa 900, walledHa 30}; FAILING bars per seed; planted control 2 cm (now 5 cm + 10 cm per S18R-1/-10).
- r2 LINE 13 (NO-SHIFT): profile roots seed 3 / integrated 4; counts by --mode count --fns ...; bundle text check;
  fusion source mode report.json; census; bands outcomes; gates + RELATED over kerb.ts and kerbExact.ts.
- r2 LINE 14 (cost): source figure by the probe's timer; prod figure forced in mirror (exactSeam.force) with count +
  cpu runs; VOID < 500 samples or inlined; rerun under node --no-turbo-inlining --no-maglev-inlining.
- S18R-8: guard `DEBUG_BUILD && exactShadowOn()`, by-path setExactShadow(on), no env var; no clock in kernel/src
  (no-nondeterminism.mjs:1-8) — callback installed by the probe or the probe times a wrapped function; off/on pins
  of createPlat/insertChain/opSave counts, bits, state, KerbRead, kerbCensus; probe runs each seed off and on with
  S8S9Record, root, work rows identical.
- S18R-10: probe source committed under docs/validation or quoted; oracle buckets segments, caps samples per face;
  each seed's wall-clock; controls 5 cm and 10 cm.
- S18R-13 (3)-(4): arena form's own spine-selection rule; "profile reading" a class not judged at CITY.
- S18R-16: check bundle.ts's `code` (before `//# sourceMappingURL=`); replace PLAT_ROOT in base/tree compares.
- S18R-17: flag buildable via a second WeakMap; caveat faithful unmoved ~0.71 cm.
- S18R-19: pass served read's own `f` into shadow (kerb.ts:375, :420 widths re-asked).
- THE SPLIT (f): (1) shared box, stay out of others' profile windows; (2) lane numbers: a failed S18 check takes
  fix-s19/close-s19 — task says S19 lanes are build/M0-a-09-fix-s19 / check/M0-a-09-close-s19, so S18 must have
  passed first time (check at binding); (3) interface may move -> re-run derived.test.ts; (4) rulings.

## Step 2 — r2 lines, refute-s18-r2, confirm-s18-r3, r4

- r2 LINE 11 required_change text is the shadow's starting text (readKerb after CENSUS.set; DEBUG_BUILD guard; per
  distinct key log; recompute throws; seams offsetCm / force; pins FLAG OFF / ON; SM1-SM5). r2 LINE 12 = probe
  (city.ts scratch, tsx --conditions=plat-source; derive(run, seed[, size]) + s8s9(d) in-thread; seeds fusion 3,
  integrated 4 at CITY; fusion 1,2 + integrated 1,2 at TEST_SIZE). r2 LINE 13 = NO-SHIFT items (1)-(7). r2 LINE 14 =
  cost (source figure; forced prod figure in mirror, count + cpu --interval 100; VOID < 500 samples or inlined; rerun
  with node --no-turbo-inlining --no-maglev-inlining).
- confirm-s18-r3 N1: a no-move BEYOND where the construction is wrong is the construction's case, never the round's red.
  N2: faithful-served read never no-move. Both are now in the bound S18 LINE 7 (r4 edits 1, 2).
- r4: edit 11 (move NB5/NB7 to wiring) NOT taken; S18 kept LINE 12 (NB5/NB7). So nothing of that is mine.

## Step 3 — the BOUND S18 entry (specs.json, M0-a-09 S18, session 16 039 chars, 12 lines)

- Rules block: rule (1) has S18-specific write list; rule (3) "NO-SHIFT by line 11"; (4) census "from line 11 (3)";
  (6) RELATED over kerbExact.ts only (ruling (f)); (7) notes section 'Hardening round S<n>' + FIGURES TABLE + interface.
  M0-c-04 S6's rules block is the generic standing form (rule (3) there allows DECLARED shifts — not ours).
- J752 at the clause's end: kerbKey -> exactKey; exactKerb -> exactRegionOfFace. Seam session/a09s18-boundary-1:
  allow.json rows for arr/kerbExact.ts ident kerb max 2, string kerb max 1 (a-geometry); sha256 680ec34d...; lands in
  ONE commit with the round. Remaining tokens in kerbExact.ts: './kerb.js' (:67) and kerbParts (:67 import, :639 call).
- Lanes: S18's failed check would take fix-s19/close-s19; "the wiring round and round 2B are keyed at their render to
  the next numbers no lane key in lane-events.log carries". The task names build/M0-a-09-fix-s19 — so this assumes S18's
  check passes on its first try. CHECK AT BINDING.
- S18 sequencing: M0-a-05 S14 opens after S9 lands and runs beside or after S18. "This round runs in a cloud container
  of its own; S9's profile runs are on another machine".

## Step 4 — S18 build notes (origin/wip/child-a09s18 ba8ab3f0, M0-a-09-notes.md :1894-2100+)

- row 159 (LINE 1): exports exactRegion, exactKeyContent, exactRegionOfKey, exactKey, exactRegionOfFace,
  roundQuotientHalfAway. Eval order readFace(p, face, widths, new Map(), vertexContacts) -> X_E -> reaching -> kerbParts
  per spine -> ring rule -> key -> X. kerb.ts edits: `export` before reaches, ownRings, unspiked, coveredBy.
- row 165 (LINE 7): relation built via derived.test.ts's vi.mock wrapper of insertChain; classes EQUAL/NEAR/MOVED/BEYOND;
  NEAR_CM 2.13 completed at acute corners (HOT_PIXEL_CM/sin(θ/2) + HOT_PIXEL_CM + √2/2); arbitration: comparand
  wrong => fail save where comparand is the construction READING's region with another spine set or unreduced runs ->
  judge region over X's own spines/runs instead. FM4 SURVIVES (note), FM2 EQUIVALENT.
- row 167 (LINE 9) corpus: numRuns max(10, RUNS/100); per-cut read set; floors.
- row 168 (LINE 10): I(child1) := exactRegion(X(parent) rings, child2 route rings ∪ lane parts); classes INHERITED,
  CONTACT, END-CHANGED, ROUNDING, OTHER.
- row 169 NO-SHIFT: PR-size bands base 508 s (seed 518964130, 6 failed | 173 passed), tree 833 s (6 | 215).
  Bundle code sha256 cf20853d... 1 715 632 bytes both sides. RELATED over kerbExact.ts selects derived.test.ts only.
- row 172 FIGURES: straight: EQUAL 637 NEAR 129 MOVED 792 BEYOND 118 (all construction's cases); served first 1606,
  faithful 38, moved 32. bent+slits: EQUAL 528 NEAR 86 MOVED 1033 BEYOND 240; first 1643 faithful 154 moved 90.
  X per read median 0.59/p90 1.04/p99 2.02 ms (straight), 0.84/1.72/2.98 (bent); construction 2.67/9.58/34.31 and
  5.81/38.56/172.77 ms (contended, informative). Identity: I = X on 680/826 and 731/910; INHERITED 39/40, CONTACT 0/14,
  END-CHANGED 1/3, ROUNDING 94/115, OTHER 30/51.
  !! NOTE: S18 figure is 0.59 ms = 590 µs median for X on corpus faces (≤100 ring points), already >> 986's 50 µs.
- row 173 interface: exactRegionOfFace(p, face, widths, vertexContacts = true): KernelResult<{key; region}>; each calls
  readFace itself; S18R-19 (pass f) is the wiring round's.
- row 176: lint kernel-boundary; remaining tokens; C-0472 (8) is the boundary clause.

## Step 4b — kerbExact.ts on the branch (692 lines) and the read path on the design head

- kerbExact.ts:67 imports { coveredBy, kerbParts, ownRings, reaches, readFace, unspiked, Spine, SpineWidths } from
  './kerb.js'; :637 exactKeyContent calls readFace(p, face, widths, new Map(), vertexContacts) itself (:638); p is used
  for nothing else there (partsOf = kerbParts(f.rings, ...) :639; reaches(s, edgeRegion) :648). :688 exactRegionOfFace.
  => S18R-19's change = split exactKeyContent into a pure `of f` core + the existing wrapper; outputs unchanged.
- My approximate noun counter (scratch tools/nouns.py, a Python re-implementation of wordsOf/nounsIn; NOT the lint):
  kerb.ts ident kerb 20, string kerb 8 (AT caps — matches the brief); kerbExact.ts ident kerb 2 (:67, :639),
  string 1 (:67); arr/index.ts string kerb 1; invariants/debug.ts none. kerb.ts has NO allow row for band, corridor,
  way, lane, block, city... => any new kerb.ts identifier/string must carry no town noun at all.
- Allowlist on the design head (b3c1f41b) has no arr/kerbExact.ts rows yet (the J752 seam lands with S18).
- kerb.ts (design head): readKerb :2153; readFace call :2156 (caller's cache + vertexContacts); readOn (first) :2157;
  faithful branch :2165-2180; CENSUS.set :2181; returns :2183 (k refused), :2187 (sp null), :2189 (sp refused), :2191.
  kerb() :2226-2230 calls readKerb. bandUnion.ts:584-586 readOn -> readKerb(t, f, spec.widths, cache,
  spec.vertexContacts). corridorUnion.ts:35-53 -> bandCore (vertexContacts true). facade/kernel.ts:231 kerb(o, ...).
  => readKerb is THE one served read; one hook call there covers S8 (kerb()), S9 (corridorUnion/bandUnion), facade.
- kerb.ts imports (:123-149): no invariants/debug.js import today.
- dryInsert :1401-1488 passes every insertChain warning to d.warnings (:1481-1485; only W_STRETCH_SHARED dropped when
  laidExactly) and adds W_ATTRACTED on a collapse / NO_ROUTE (:1441-1449). dryRegion returns ok(..., d.warnings)
  (:1494, :1626). censusRead :1725-1762: ok([]) without warnings at :1730-1731 / :1742 (geometry-decided empties).
  readOn :1918-1942: restage keeps `read.staged` defined (:1928 `{ ...read, k: again }`).
  => a no-move reading at CITY without a mock: faithful 'none', not restaged, the served KernelResult's warnings hold
  none of W_ATTRACTED / W_PLACED / W_SNAP_PASSES / W_WEDGE_ROUTED (S18's FM2 found this equivalent to the wrapper's
  placed-check on its corpus: notes row 165, row 171 FM2).
- invariants/debug.ts:13-15 DEBUG_BUILD; nothing else needed.
- lint kernel-boundary.mjs:7-14 rule; :26-29 TOWN_NOUNS (incl. band, corridor, way, lane, city, block, tile);
  :40-47 wordsOf camelCase split; :62-74 string tokens incl. template parts; :126-133 cap/slack; :136-139 a row
  matching nothing is slack (fails).
- S18 test side: the relation (servedOf :200, relate :243, hausdorff :152, tipNear :221) is private to derived.test.ts;
  the oracle definition.ts exports judge :340, spinesOf :266, endsOf :122, bufferOf :161 (kernel form: TruthChain from
  insertion records). No arena-form truth reader exists (S18R-13 (3) is the wiring round's).
- derived.test.ts:1266 reads process.env.PLAT_DERIVED_PROBE, :1932 PLAT_DERIVED_REPLAY (test side; allowed there).

## Step 5 — the review rows (docs/validation/a09-s18-review-2026-11-10/)

- refute-bars.md: BARS-1 (:7, :25) a CITY shadow must be fed by served construction reads (kerb()/readKerb), floor >0
  + planted negative control. BARS-2 (:8, :27) profile windows S1-S8 only (driver.ts:207 'registers no stage',
  base.ts:949 registers S1, S3-S6, S8); S9 needs a scratch probe (derive + s8s9). BARS-3 (:9, :29) report.json has no
  final root (SeedRow none; report.ts:601-610 rootS5 only): quote per-seed root from measure's record. BARS-4 (:10,
  :31) bundle.ts does not minify; DEBUG_BUILD a computed const in another module, not folded: add a bundle-text check.
  BARS-8 (:14, :39) at CITY run the oracle two-sided on every attracted face; a locus is a whole outline. BARS-9 (:15)
  kernel-tiny excludes arr/; default size 10^4. BARS-10 (:16, :45) flag-off pin by vi.mock of invariants/debug.js
  or the by-path switch; counted pins exclude the oracle's own constructions; the shadow throws on its own exception.
  BARS-11 (:17, :47) one named function; mean = inclusive by name / its count-run calls; sample floor VOID; repeat
  the built bundle under node --no-turbo-inlining. BARS-12, BARS-13: 2B per r3 carry list (stay out).
- refute-scope.md SCOPE-1 (:10-27): S8 reads only through kerb(): bentCutFabric.ts:653 kerbFace, :729 kerbSeed,
  :924 needle floor; district face read :1359, cut :846. SCOPE-4 (:67-89): kernel/package.json sideEffects false;
  esbuild kept a module's top-level installation used inside another module's `if (DEBUG_BUILD)` (refuter ran esbuild
  0.28.2); lazy install problems. SCOPE-7, Missed: kept-entry warnings — 2B (r3 list). I keep one sentence: the H
  count is a COUNT only; what a kept entry serves (warnings, census) is 2B's.
- refute-design.md: DESIGN-2 (:45-55) the feed from served constructions is right. DESIGN-5 (:90-115) history
  dependence: constructions vary under one key within DRY_MOVE_CM — r2 LINE 11 counted it; the S19 half per r3 is 2B's,
  but COUNTING it is a measurement 2B needs (I keep the count, no ruling). DESIGN-8 (:143-149) no CITY bar on the
  derived kerbs in the old draft. DESIGN-12 Missed (:192-202): construction lays unreduced lines (kerb.ts:554).

## Step 6 — placing things in the tree (design head b3c1f41b; S18 and S9 NOT yet landed there)

- layout/src/infill/bentCutFabric.ts S8's kerb() reads at :667, :743, :938 on this head (the review cited :653, :729,
  :924 on ccf1ed46 — moved).
- bench/src/fusion/measure.ts: imports kerb, corridorUnion from '@plat/kernel' (:28); s8s9 :548-651 (L1 read batch
  :563-585, kerb() per block seed :572, corridorUnion per district :589-595); SeedRecord :103 with stampsMs :117 (a
  wall-clock: drop it from any compare), faces.cuts :118/:792; measure() :726, root :802, s8s9 last :806.
  runs.ts: FixtureSize :63-73 (CITY default 2 500 ha frame, 220 ha walled), derive :416. bench/test/fusion/support.ts:3
  TEST_SIZE {900, 30}. fusion/index.ts:17-18 report.json carries no wall-clock; --workers default 1 (:99-101).
- root package.json:17 `bench` = tsx --conditions=plat-source (source mode, DEBUG_BUILD true).
- profile/: index.ts:5-7 usage; bundle.ts:42-60 buildBundle (stdin entry :44, define PLAT_DEBUG_BUILD false :54,
  `code` = text before sourceMappingURL :58); driver.ts:174-203 per-stage window (plant hook), :207 'registers no
  stage', :232-237 the record (root, stageRoots, debugBuild); counts.ts:10 COUNT_FNS (includes opSave, rollback,
  takeSavepoint, restoreSavepoint, judge, readKerb, readOn, ...); index.ts:136-138 spawn(process.execPath, [bundle,
  ...argv]) — no execArgv.
- profile-s8-after-q18.md:14-19 fusion 3 CITY 1 216 cuts, S8 prod 143.1 s, tsx 216.8 s; integrated 4 1 378 cuts;
  :53-56 2 771 readOn, 2 752 kerb calls (2 078 kerbFace, 364 kerbSeed); :153 readKerb 81.3 % of S8.
- kernel/test/arr/bands/support.ts:16 imports ../../tx/support.js, whose :7 imports vitest (afterAll, afterEach,
  expect) => definition.ts:38 (`simpleRing` from ./support.js) drags vitest into any tsx probe. The probe's modules must
  be vitest-free (a copy of simpleRing).
- dryrun.test.ts:19-31 the mock form; :60-81 countReads (bits :65/:75, state :62/:80).
- lint no-nondeterminism.mjs:1-8 refuses clocks and Node globals in model code (S18R-8).
- render.mjs:36-41 lane keys from `from`: from 19 -> build/M0-a-09-fix-s19, check/M0-a-09-close-s19, verdict
  checks/M0-a-09-s19.md. lane-events.log: no fix-s18/fix-s19 key yet (S18 in flight).
- M0-work.json M0-a-09 owns (:1405 entry): arr/kerb.ts, corridorUnion.ts, bandUnion.ts, tileRings.ts, kerbExact.ts,
  arr/index.ts (its four lines), kernel/test/arr/bands/, testkit/test/kernel/arr-bands/.
- J742 R-D: "S19 after both" (S18 and a-05 S14) — written when S19 meant 2B. Now the wiring round is S19: open question
  whether it waits for a-05 S14 (whose engine changes can move the construction the tables measure).
- J757: a merged round (a-02 S4 -> a-06 S10 -> a-05 S15) raises ROLE_REGISTRY_VERSION, moving every root once, after
  a-05 S14. S19 must not straddle it (its base/tree roots would both need the same version).

## Step 7 — the design decided

- THE HOOK, zero boundary rows: kerb.ts gains `ReadShadow` (interface {start(); done(...)}), a module `let shadow`,
  `setReadShadow(s)`, and two guarded calls in readKerb (after :2155 start; after :2181 CENSUS.set done). No new
  import in kerb.ts (no './kerbExact.js' string; no debug.js needed). Every new identifier noun-free; no new string.
  kerbExact.ts (already imports './kerb.js' :67) adds setReadShadow / ReadShadow / LastRead to that same import (no new
  string), imports DEBUG_BUILD from '../invariants/debug.js' (no noun), and exports setExactShadow(observer, opts).
  No cycle: kerb.ts imports nothing of kerbExact.ts. Prod: nothing in the prod graph imports kerbExact.ts -> absent.
- Types in the hook must not name KerbRead (ident 'kerb'): pass read.k (KernelResult<Ring[]>), read.spines,
  read.census, read.staged !== undefined, sp, the LastRead, f, vertexContacts, p, face.
- CITY no-move without a mock: faithful 'none' && !restaged && served warnings hold none of the four move codes.
  MOVED at CITY without a per-call locus: two-sided within DRY_MOVE_CM on a read that moved (REPORTED class only).
- Plants test-side (observer), not kernel seams: --plant-relation 5 (comparand shifted) and --plant-oracle 10 (X
  shifted before the judge).
- Lineage at CITY (for 986 (c)'s identity and H's count): parent of F := the LATEST earlier distinct content P whose
  route region holds F's (every vertex of F in P's closed region, area(F) < area(P)); I(F) := exactRegion(X(P)'s
  rings, [P's route rings, F's route rings reversed] ∪ parts of the spines F's key holds and P's does not).

## Step 8 — drafting (lines planned)

LINE 1 hook (kerb.ts) + module paragraph; LINE 2 boundary accounting (no row); LINE 3 S18R-19 (exactKeyContentOfRead /
exactRegionOfRead; derived.test.ts at 518964130 base=tree); LINE 4 the shadow (setExactShadow, DEBUG_BUILD || anyBuild,
observer clock); LINE 5 off/on pins (shadow.test.ts, shadow-prod.test.ts); LINE 6 test-side observer modules
(relation.ts moved, arena-form oracle with cap, observer.ts with lineage/identity/H); LINE 7 CITY probe (runner quoted
verbatim; OFF/ON SeedRecord identity; seeds; FAILING; controls 5/10 cm); LINE 8 NO-SHIFT of a wired tree; LINE 9 cost;
LINE 10 the tables T1-T7. Precedents for the hook: tx/frames.ts:14-31 setFrameObserver; arena/write.ts:838-843.
Rules block = S18's verbatim except: rule (1)'s write list, (3) line refs, (4) line ref, (6) RELATED files,
(7) section name + table list, the checker's diff/bundle refs, the line count. Builder script in scratch: build.py.

## Step 9 — entry drafted (spec-a09-s19.json, built by scratch build.py); cite corrections

- CORRECTION to step 6: bundle.ts metaUrl :16-26, buildBundle :41-60, stdin entry :43, define :52, code :58;
  driver.ts:41 driverArgv. kerb.ts readFace cache/widths: :372/:375 and :417/:420.
- Verified: kerb.ts:2154-2157 (openTx, plat, readFace, first readOn); :1898 faithful union; report.ts:601-610 rootS5;
  pool.ts:17/:23 runTask / runTasks; tx/frames.ts:14-31; arena/write.ts:838-843.
- Entry: session 13.5 k chars; 10 lines, each 2.3-4.5 k chars (LINE 6 the longest).
- CORRECTION: restage.test.ts kerbCensus at :56, :163 (r2's :107/:133 are stale). bfuzz.test.ts census lines :226, :261, :305 (tileRings) verified.
- Step 10: memo written; LINE 8 (2)/(3) allow esbuild to tree-shake the unused setter setReadShadow from prod.
