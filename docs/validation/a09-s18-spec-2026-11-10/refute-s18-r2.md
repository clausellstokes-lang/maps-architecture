# Refuter seat: the M0-a-09 S18 rewrite (r2), 2026-11-10

This seat refutes `spec-a09-s18-r2.json` and its memo against J742 R-A and the code on the design head (f8d4d3ee; the
kernel files are as on b81502bd). It is read-only, and this file is its one output.

What I read:
- J742 (by grep);
- the entry, printed line by line;
- the memo, whole, and working-notes-r2.md;
- the four refuter files;
- kerb.ts: :1-760, :800-1105, :1170-1210, :1395-1630, :1674-1945 and :1955-2232;
- buffer.ts (its header and part());
- num/snap.ts, and insert/placement.ts (:1-25, plus nearestLatticePoint :123-137);
- faces/split.ts (its header) and faces/common.ts (the landing rule, :7-24);
- support.ts (simpleRing, network, wideNetwork, nestingProblems);
- dryrun.test.ts :15-100 and facade.test.ts :165-182;
- arr/index.ts;
- profile/bundle.ts and counts.ts, and fusion/index.ts;
- the lint rules ratio-division and no-nondeterminism;
- landed.mjs, session-m0-work.json, and the m0-work lanes in lane-events.log;
- M0-a-06 S9's entry in specs.json.

Nothing was executed. No claim below needed a run.

## Verdict table

| id | sev | LINE | the claim | evidence read | the exact change |
|---|---|---|---|---|---|
| S18R-1 | **blocker** | 7, 9 (ii), 11, 12 | ≤1CM is "two-sided Hausdorff ≤ 1 cm", and STRAIGHT-THROUGH is a *sub-class* of it. "Neither wrong ⇒ FAILS where the read is unmoved." | **The memo contradicts the class.** Its own Q1 says "up to about 1.4 cm" at straight-through vertices. The first read lays unreduced runs (kerb.ts:554). straightRun drops a vertex within HOT_PIXEL_CM in position AND within HOT_PIXEL_CM in hw (:514, :517). Each strip corner is snapped (buffer.ts part() :78-91). That gives ≈ 1.42 cm plus snap, which is more than 1 cm.<br>**Unmoved does not mean exact.** On an unmoved read a crossing is placed at any lattice point within 0.71 cm of BOTH lines (placement.ts:4-12), and laidExactly counts that as exact (:1200). At a shallow crossing the two boundaries then separate by up to about 2 · HOT_PIXEL_CM.<br>**So a correct X fails.** On an unmoved read with a T, the difference lies between 1 and ≈ 2 cm, the read goes BEYOND, the oracle (4 cm) finds both right, and the round FAILS. This happens at every S8 T whose landing is off the lattice line. The 2 cm planted control then cannot tell a correct build from the planted one. refute-bars BARS-5 warned of exactly this. | (1) Judge a read served by the FIRST dry-run against **X_U** = exactRegion over `spineParts(…, false)`'s parts, the parts that read lays. Judge a faithful-served read against X. Report X vs X_U on its own as the STRAIGHT-THROUGH figure.<br>(2) Derive the near class's bound from the placement rule, not "1 cm": 2 · HOT_PIXEL_CM + √2⁄2 ≈ 2.13 cm. Rename the class.<br>(3) Keep "unmoved, neither wrong ⇒ FAIL" only beyond that bound.<br>(4) Make the planted control 5 cm, beyond the bound, as well as 2 cm. |
| S18R-2 | **blocker** | 6, 9 (i) | The oracle's spines come from generator truth: "positions the generator's (the arena's placements lie inside the margin)". | **Chords are attracted.** network() / wideNetwork() insert chords with insertChain (support.ts:376-388, :821-838). A chord end within attractCm (26 cm) of a frame corner or another chord's end is attracted, and a chord passing within attractCm of a crossing vertex is routed through it (insertChain.ts:163-257, W_ATTRACTED). That moves the route up to 26 cm or more.<br>**Lanes land on vertices.** planCut lands a cut endpoint ON a boundary vertex within attractCm (faces/common.ts:7-8). So the lane's real end is up to 26 cm from the drawn one.<br>**The margin is 4 cm.** The oracle then reports misses on a correct X, under a FAILING bar, across ~600 networks. | (1) Generator truth = the test's OWN insertion record. For each chord, the coordinates of ChainInsert.placed. A draw is discarded (and counted) where a chord's route, walked by the test along its own row, leaves its given line by more than HOT_PIXEL_CM.<br>(2) Draw lane landings more than attractCm from every boundary vertex, so planCut splits and never lands on a vertex. Assert that the children's rings hold the lane's points exactly, else discard and count.<br>(3) Never read readFace / readSpine for any of this. |
| S18R-3 | major | 4 (k1), 1 (a), 3; 11 (recompute throws) | "X is a function of (1)–(3) by construction". The key leaves out a ring vertex by THE RING RULE, but X is defined on region(F) "as readFace reads it": all vertices. | **The dropped vertex still moves X.** LINE 3's suggested order-free rounding is snap rounding of every original segment through every hot pixel. Every INPUT vertex is a hot pixel, and that includes a ring vertex the key dropped. Where a part edge passes within the dropped vertex's pixel (hw ≲ 1.2 cm, or v up to 0.71 off the line), X moves with v while the key does not. Then (k1) is red on a correct build, and S19's shadow THROWS.<br>**The rule is undefined for runs.** "The triangle (u, v, w) held by ONE of X's parts" is undefined for several consecutive dropped vertices, which can each be held by a different part. | (1) Make X a function of the key's content: X := exactRegion(the key's rings, the keyed spines' parts).<br>(2) Fix the evaluation order: X_E on readFace's rings → the reaching set → the parts → the ring rule → the key → X from the key.<br>(3) The ring rule: the polygon (u, v₁…v_k, w) held by ONE part (coveredBy's exact test). |
| S18R-4 | major | 8 (1) | The half-coordinate literal (kills XR2), "and where the construction reads it unmoved, its KerbRead.region asserted equal too". | **The construction rounds the other way.** It places a crossing by nearestLatticePoint, ties broken y then x, toward the SMALLER coordinate (placement.ts:123-137). An exact x.5 crossing on a horizontal L1 edge at positive x lands at ⌊x⌋, which is truncation's answer. roundHalfAway gives ⌈x⌉.<br>**So the fixture cannot pass.** It reads unmoved and differs from a correct X by 1 cm. | In fixture (1):<br>- assert X's literal only;<br>- quote the construction's read with its class, the 1 cm tie difference expected;<br>- state in kerbExact's header that X rounds by §3.2 (snap), which differs from the placement rule's tie. |
| S18R-5 | major | 2 (the lemma pin) | "X with every `through` spine ≡ X with the reaching ones", asserted byte-identical over line 9's corpus. | **reaches tests the exact buffer.** Its radius is r = max hw, with strict `<` (kerb.ts:459-468).<br>**X's parts are snapped.** Their vertices can lie up to √2⁄2 cm OUTSIDE the exact buffer (buffer.ts:78-91), and each one is a hot pixel under snap rounding.<br>**So the lemma breaks.** A spine that does not reach X_E within 0.71 cm of its edge still clips or reroutes it, and the pin goes red on a correct X. | Assert the lemma as two-sided Hausdorff ≤ 1 cm, and byte-equal only where every part of every non-reaching spine lies more than 2 cm from X_E. Or X's own keep test widens r by 2 cm, stated in kerbExact's header as X's rule. |
| S18R-6 | major | 3 (c), 6 (3) | "every output ring simpleRing" (in derived.test.ts and in the CITY judge). | **The spine-less dangling-chain face.** LINE 2 keeps "a spine-less face … its own route rings verbatim". A spine-less face holding a dangling chain is read as F's walk out and back (kerb.ts:96-102, bridgesOf :1961; S17 B-GUARD). Its ring repeats vertices.<br>**simpleRing refuses that.** It rejects any repeated point (support.ts:325-328). So the judge FAILS a correct X on such faces at CITY. | (1) A ring equal to readFace's own route ring is exempt, judged instead by `ringCrosses(r, bridgesOf(p, edges))`.<br>(2) Name simpleLoops in line 1 (d)'s normal form: dryRegion cuts loops at :1617. |
| S18R-7 | major | 9 | After each cut EVERY live L1 face is read three ways. 100 runs per property at the PR size, also at 2 fixed seeds. Floors of ≥ 300 cuts and ≥ 2 000 faces per run. | **The cost is quadratic.** With ~4 root faces and depth 3 there are about 28 cuts per network, times ~18 live faces: about 500 reads per network. A construction read costs about 20–25 ms (notes :451). Add X and a 20 cm grid, and a network costs about 10–40 s, so the PR size takes hours. The +1 800 s bar then forces the size down to the floors.<br>**The floors break other rounds.** RELATED runs at PLAT_FUZZ_RUNS=1000 (workflows/23 and PROGRESS), which gives numRuns 10 and about 200–280 cuts. That is below the 300 floor: red in every later round whose RELATED selects derived.test.ts, i.e. any change under kerb.ts's imports. | (1) Per cut, read the two children, the faces whose ring or `through` set the cut changed (the faces at its landing vertices), and one untouched face, for (k1).<br>(2) Make the floors per network (for example ≥ 3 cuts and ≥ 20 faces judged on average), or assert them only at numRuns ≥ 100.<br>(3) Quote the file's measured time at 1 000 and 10 000. |
| S18R-8 | major (S19) | 11, 13 (4)–(6), 14 (1) | The shadow sits behind `if (DEBUG_BUILD)`, "present wherever kerb.ts is". It times exactKerb by `process.hrtime.bigint`. | **The opt-in ruling contradicts LINE 11 as written.** It says shadow off by default in every build, on only by a-09's tests and the probe.<br>**Neither the env var nor the timer can live in kernel/src.** plat/no-nondeterminism refuses Node globals and clocks in model code (no-nondeterminism.mjs:1-8), and kernel/src has no clock today.<br>**What opt-in leaves unchecked.** Under opt-in, 13 (4) `bench -- fusion` runs with the shadow off, and so proves nothing about it. 11's "dryrun.test.ts's counts, which now run with the shadow on, are its first proof" no longer holds. | (1) The guard is `DEBUG_BUILD && exactShadowOn()`, switched by a by-path `setExactShadow(on)`. That is set by derived.test.ts and the probe only; there is no environment variable.<br>(2) Pin: switch off in a DEBUG build ⇒ 0 exactKerb calls (counted); on ⇒ one per read.<br>(3) derived.test.ts carries the proof: the same reads with the shadow off and on give equal createPlat / insertChain / opSave counts, bits(p), state(p), the KerbRead and kerbCensus.<br>(4) The probe runs each seed with the shadow off and on, and requires the S8S9Record, the root and the work rows identical.<br>(5) The clock is a callback the probe installs (beside setExactJudge), or the probe times a wrapped exactKerb. |
| S18R-9 | minor | 3 | "the ONE rounding by snap (roundHalfAway, num/snap.ts:13) of the exact intersection". | **snap cannot take the exact value.** It takes doubles. The intersection's numerator exceeds 2⁵³ (coordinates < 2²³), so snap(Number(N)/Number(D)) is a double rounding, wrong next to x.5.<br>**The division is refused.** A BigInt `/` by a computed divisor in model code is refused by plat/ratio-division (ratio-division.mjs:1-10). | Say that N/D is BigInt, rounded half away without division (a double estimate corrected by BigInt multiply-compare, as num/exact.ts:37-53 settles its ties), with snap's range check after. No eslint-disable. |
| S18R-10 | major (S19) | 12 | The checker "re-runs the probe", whose table "equals the build seat's". The expected time is "≈ 5–10 min a CITY seed in source mode with the judge". | **The probe exists only as a description.** It is a scratch file. A checker who rewrites it can count "distinct contents per cut" or "reads per cut" differently.<br>**The time has no basis.** A 100 cm grid on district-size root faces costs samples × segments with no spatial index, which is minutes per face. The 20 cm re-grid on BEYOND cases costs 25 times that. | (1) Copy the probe's source verbatim into the notes, or commit it under docs/validation/.<br>(2) The oracle buckets segments, and caps samples per face (stated).<br>(3) Each seed's wall-clock is a stated figure.<br>(4) Two planted controls: a 5 cm offset (the relation, after S18R-1) and a 10 cm offset (the oracle's own FAIL). |
| S18R-11 | minor | 4, 5 | "N's key is unchanged exactly when X(N) is". KM5 dies in (k1) at "a T on a zero-width boundary chain". | **"Exactly when" is false.** In a square T with hw_lane > hw_S, reaches keys the lane (r = hw_lane, :459). Its flat end leaves X(N) unchanged, so the key changes while X does not. Only the ⇒ direction holds.<br>**KM5's case never occurs.** B-FUZZ networks have no zero-width L1 chain: network() tables every chord (support.ts:383). | (1) Write "⇒", never "exactly when".<br>(2) The generator drops a random chord from the widths table (answer null), or KM5 dies at a named literal pin. |
| S18R-12 | minor | 1 (d) | "ownRings where no part reaches F". | **The condition is undefined.** The construction branches on `d.laid.length === 0` after clipToWindow (kerb.ts:1494, :1413-1415). A part inside F's hull window but outside F is laid there, giving the traced form. | Define "reaches" as "X's part list is empty". A Hausdorff-0 difference (a collinear vertex) is then counted in the near class. |
| S18R-13 | minor | 6 | The 4 cm margin = 1 + SAGITTA + HOT_PIXEL. The arena form "reads the arena". | **The margin's sum is incomplete, but 4 cm holds.** The sum omits part snapping (√2⁄2) and the straight-through drop (2 · HOT_PIXEL_CM, CITY routes being unreduced). The worst combination is about 3.4 cm, so 4 cm stands.<br>**The grid sees only thick errors.** A sample must lie more than the margin from every boundary, so only errors thicker than 8 cm show. A missing band of hw ≤ 4 cm is invisible.<br>**The arena form leaves things out.** It never says how it picks F's spines. Its use of routeLines / knotLines / cutKnot leaves CITY-only profile readings unjudged: multi-knot profiles, step interpolation, multi-run routes. | (1) State the full sum.<br>(2) State the 8 cm thickness floor and the hw ≤ 4 blind spot.<br>(3) Give the arena form's own spine-selection rule (rows on F's route edges, the oracle's own reach).<br>(4) Name "profile reading" as a class not judged at CITY. |
| S18R-14 | minor | 8 | "expected X written as canonical ring text COMPUTED BY HAND". | Round joins and caps, and 60° strips, have dmath vertices, each snapped (buffer.ts:1-20). They cannot be computed by hand. | (1) Quote the part vertices from bufferParts (a-08's, independent of X). Hand arithmetic covers only the clip's intersections and their rounding.<br>(2) Build the half-coordinate fixture from axis-aligned or 45° strips. |
| S18R-15 | minor | 10 | I(child) = (X(parent) ∩ child) − lane parts, "computed by exactRegion". | exactRegion takes (rings − ⋃ parts) and has no ∩. | I(child₁) := exactRegion(X(parent)'s rings, [child₂'s rings] ∪ the lane's parts). |
| S18R-16 | minor (S19) | 13 (3) | "a text check of the tree's <out>/driver.mjs". | **The sourcemap matches too.** The bundle carries an inline sourcemap with the sources' text (bundle.ts:3, :49-63), so kerb.ts's comment naming kerbExact.ts would match.<br>**Paths differ by mirror.** metaUrl bakes in ABSOLUTE file URLs (:19-27). | (1) Check bundle.ts's `code` (the text before `//# sourceMappingURL=`).<br>(2) In any compare between base and tree, replace PLAT_ROOT. |
| S18R-17 | minor (S19) | 7 | kerbMotion is "made from the laid geometry". | **Checked, buildable without changing the dry run.** Record laidExactly per part in Dry (it is computed at :1477), d.unlaid, and the collapses; restaged reads are known in readOn. A second WeakMap leaves KerbRead and LastRead unchanged, so facade.test.ts:175-179, which compares kerb()'s Ring[] only, and every kerbCensus pin stay as they are. Not an API change: a by-path export, with the barrel untouched.<br>**One caveat.** On a faithful-served read, laidExactly is relative to `stepped`'s snapped points (:1024), so "unmoved" there means within ~0.71 cm. | Say so in the flag's definition. |
| S18R-18 | minor | clause, A1 | "`session/m0-work-<n>`". | The last landed lane is session/m0-work-5 (lane-events.log:12112, session-m0-work.json). The validator does not check that a path exists. | Give the exact steps (§ below). |
| S18R-19 | minor (S19) | 11 | The shadow "computes X and kerbKey for the read's face, widths and flag". | X calling readFace again re-asks the caller's `widths` (kerb.ts:375, :420), and S8's callbacks are layout's. | Pass the served read's own `f` (readFace's result) into the shadow. |

Checked, sound:
- **X writes nothing.** readFace, kerbParts / spineParts / straightRun / capped and bufferParts read the arena and snap. Their only write is PART_GROUP, a module WeakMap keyed by fresh rings (:601), which is harmless.
- **(k2)'s five pins plus (k3) cover X's inputs.** The arena's level and the face's seeds are not inputs of X. An L2 commit leaves the key unchanged (readFace :357, :370; junctionEnd :309).
- **X_E-based reach disagrees with the census only where base ≠ X_E.** That disagreement is routed to arbitration, so it is not a hidden error.
- **report.json carries no clock** (fusion/index.ts:17-18; only index.ts:179-182 times the run). Byte identity in source mode is achievable.
- **The junction rule** in line 6 matches junctionEnd (:303-324), the frame included.
- **LINE 15 (the NB5 / NB7 pins)** is sound.

## THE SPLIT: sound with changes

**(a) Sentences in the library lines that edit an existing source file.**
- LINE 1's "kerb.ts may export by path … (spineParts, reaches, coveredBy, ownRings, unspiked, …)" and "kerb.ts's module comment gains one paragraph" are both edits of kerb.ts.
- **What is already exported:** readFace (:335), straightRun (:502), kerbParts (:648), spineKey, ringSimple, ringCrosses, bridgesOf.
- **What is not:** readSpine, junctionEnd, reaches, spineParts, capped, ownRings, unspiked, coveredBy.
- **What X needs of those:**
  - spineParts, straightRun, capped and the junction flags are not needed. `kerbParts(rings, map, true)` gives every faithful part (readSpine and junctionEnd run inside readFace).
  - **reaches is needed** (X's spine set, line 1 (b)).
  - **ownRings and unspiked are needed** (the normal form; a duplicate that drifts breaks canonical equality).
  - coveredBy is optional: X's exact containment can replace it.
- **The whole edit:** the keyword `export` on reaches, ownRings and unspiked (and coveredBy), with no body change. The module-comment paragraph moves to S19.
- That edit can be proved behaviour-free by a cheap FAILING bar, which also replaces LINE 13 for S18. The prod bundle's code part (bundle.ts's `code`, PLAT_ROOT replaced) must be identical between base and tree, and must hold no `exactKerb`. esbuild never bundles a module that the prod graph does not import.
- **Without a ruling, that edit triggers RELATED@1000 over kerb.ts** (≈ 5 100 s at build and again at check). The session should rule that an export-keyword-only edit, shown identical in the bundle, needs RELATED over kerbExact.ts only.
- The alternative, duplicating reaches / ownRings / unspiked under new names, avoids the edit but leaves second definitions with no pin tying them to the construction. I do not recommend it.

**(b) Sentences that depend on M0-a-06 S9 having landed.**
- **No library LINE does in substance.**
- **Every clause paragraph does:**
  - BEFORE FIRST EDIT: S9's LANDED lines, frames.ts mark / undoTo, opSave / rollback undoing to a mark;
  - SEQUENCING: "opens only after M0-a-06 S9 LANDS";
  - RESUME: "M0-a-06 S9's landing or later";
  - "re-read every cite on the RESUME head".
  These must be rewritten for the pre-S9 head.
- **S9's in-flight entry says otherwise.** It reads "M0-a-09 stays HELD until this round LANDS", and J742 R-D agrees. Both need a recorded session ruling that exempts the library half. The reason it gives (kerb.ts's opSave call sites and dryrun / restage's mocks) does not apply to a half that edits no kerb.ts body and neither test file.

**(c) Same results before and after S9:** yes.
- X calls no opSave.
- S9 keeps opSave / rollback's names, signatures and callers (its entry: "their names, signatures and callers unchanged"), and is NO-SHIFT.
- derived.test.ts's mocks spread `...real` (the dryrun.test.ts:21-31 form), so S9's new exports pass through.
- Only timing can move.
- After both land, run derived.test.ts once on the merged tree. It is then a cheap sentinel for S9's NO-SHIFT.

**(d) What LINE 9 loses without LINE 7's flag:**
- the trustworthy unmoved/moved split;
- with it, the strict FAILING side of the relation;
- the ATTRACTED locus.

**Test-side "no attractor within attractCm from generator truth" is sound only if it models every contact the router makes**, part against part included (strip corners on another spine's line, sharedPath, coincident). Since it is conservative, it would mark nearly every read with a crossing as moved, which makes it near-vacuous.

**Better: derived.test.ts's own vi.mock wrapper of insertChain** (dryrun.test.ts:24-27's form). Per call it records:
- given points vs placed coordinates (ChainInsert.placed);
- E_DEGENERATE / NO_ROUTE;
- the move warnings: W_ATTRACTED, W_PLACED, W_SNAP_PASSES, W_WEDGE_ROUTED;
- optionally, the path vertices within HOT_PIXEL_CM, by the test's own walk of the dry-run's rows right after the call.

The opSave count per read and kerbCensus(p).faithful then tell which dry-run served; where that is ambiguous, the read counts as moved. This is as strict as laidExactly and needs no kerb.ts change.

Failing that, S18's relation is REPORTED-only, and the oracle is S18's only FAILING judge of X. S19 then adds the flag and the strict bar.

**(e) Wall-clock on a 4-core box (estimates, not measured).**

The library half:
- **Build, about 11–14 h:**
  - code 8–11 h: exactRegion with collinear overlaps, snap rounding and the trace is the bulk;
  - base mirror 15 min;
  - bands NEAR: base ≈ 1 065 s, tree ≈ 1 065 s plus derived (at most +1 800 s);
  - RELATED over kerbExact.ts, which selects derived.test.ts only: ≈ 5–15 min at 1 000. Add +5 100 s if kerb.ts's edit is not ruled.
  - about 25 mutants at reduced size: ≈ 1 h;
  - the census (optional, no behaviour path changed): 30 min;
  - two bundle builds: ~2 min.
- **Check, about 3–4 h.** No CITY run and no profile run.

The wiring half:
- **Build, about 10–14 h:**
  - code 4–6 h;
  - RELATED over kerb.ts ≈ 1.5 h;
  - profile, base and tree, 2 seeds, serial and idle: ~1 h;
  - fusion source runs, base and tree: ~40 min;
  - the probe, 6 seeds, off and on, plus 2 controls: 1–3 h;
  - forced-prod cost runs: 30 min.
- **Check, about 6–8 h.**

Total seat time is above one round by a second check (≈ 4–6 h) and a second brief. The saving is calendar time: the library build overlaps S9.

**(f) What makes the split worse.**
1. **The shared box.** One 4-core box runs maxLanes 2. S9's LINE 6 profile runs need load < 0.3, and a run that starts not idle is discarded and repeated. The library's NEAR, mutant and RELATED runs beside S9 would stall S9's measurement. Schedule them outside S9's profile windows, or on another box.
2. **The lane numbers.** A failed S18 check takes the lanes `*-fix-s19` and `close-s19` (34-session-fix.js numbers its rounds from `from`). The wiring half must therefore be keyed at render time to the next free number, and 2B to the one after.
3. **The interface may move.** The wiring may need to change kerbExact's interface (pass `f`, a clock hook, the opt-in switch). That re-runs derived.test.ts.
4. **The rulings.** S9's hold sentence and R-D need a ruling.

None of these is a reason to refuse. The split is sound once (a)–(d) are written into the two entries.

## Is the entry ready to bind?

No. The changes, in priority order:
1. **S18R-1:** judge first-read reads against X_U, derive the near-class bound, and fix the planted control.
2. **S18R-2:** generator truth from the test's own insertion records, with landing draws more than attractCm from vertices.
3. **S18R-3:** X computed from the key's content, and the ring rule on the dropped polygon.
4. **S18R-4:** in fixture (1), drop the construction-equal clause.
5. **S18R-5 and S18R-6:** the lemma pin within a margin, and the dangling-chain exemption from simpleRing.
6. **S18R-7:** the per-cut read set, and floors that scale with numRuns.
7. **If the split is taken:**
   - LINE 9's relation by the insertChain mock (or REPORTED);
   - kerb.ts limited to export keywords, with the bundle-code identity as S18's NO-SHIFT bar and RELATED ruled to kerbExact.ts;
   - the clause rewritten for the pre-S9 head;
   - the session's ruling on S9's hold and R-D;
   - lane keying.
8. **For the wiring half:** S18R-8 (opt-in and the clock), S18R-10 (the probe), S18R-16, S18R-17 and S18R-19.
9. **The minors:** S18R-9, -11, -12, -13, -14, -15 and -18.

**A1, exactly**, from the repository root:
1. Edit plat/docs/build/M0-work.json: M0-a-09's owns gains `"plat/packages/kernel/src/arr/kerbExact.ts"`.
2. Run `cd plat && node --test tools/scaffold/m0-work.test.mjs`.
3. Commit.
4. Run `cd plat && corepack pnpm landed -- session-m0-work --lane session/m0-work-6 --wave flow-7 --owns plat/docs/build/M0-work.json`.
5. Append the LANDED line to docs/lane-events.log in the m0-work-5 form (lane, path, sha16, record, reason).
6. Run `corepack pnpm landed:verify -- flow-7`. It must print ok.

(land_child.py's `--records` re-landing is for a child's landing, and comes too late for the pre-edit check.)

**On the brief's size (82 kB):**
- **Under the split,** the library brief loses LINES 7 and 11–14 (≈ 18 kB of lines) and the clause's probe, profile and long-run passages: about 60 kB.
- **Shortenings that lose no bar:**
  - LINE 1's evidence list repeats the cites of LINES 2, 4 and 8;
  - LINE 13 (2)'s --fns list can name COUNT_FNS plus the three new names;
  - the rules and the ROUND NUMBER, usage-window and DECLARED REDS paragraphs can cite the a-06 S9 entry's identical text.
- **Nothing contradicts the S8 / S9 models** but S9's hold sentence (above).
