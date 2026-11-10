# Refuter seat: lens "scope" (lens-scope.md), checked on this tree

Read: spec-a09-s18.json (S18 lines 1–7, S19 lines 1–4, both session clauses), spec-a09-s18.md, faces/split.ts (whole),
arr/kerb.ts :108-122, :240-427, :545-607, :850-862, :2140-2230, layout bentCutFabric.ts :640-660, :720-735, :775-930,
:990-1020, :1080-1120, :1350-1365, faces/ops.ts, bench fuzz-bar/s11Workload.ts :140-160, timing-phase/workloads.ts
:160-175, testkit invariants/constructive.ts :350-365, bench/src/profile/bundle.ts, invariants/debug.ts, tx/savepoint.ts
:245-258, ARCHITECTURE.md :5360-5366 and :5636, model digest workload.ts and roots-golden.json, facade.test.ts :168-230,
M0-work.json owners. Command run: one esbuild 0.28.2 bundle in the scratchpad (see SCOPE-4).

## SCOPE-1: partly

Confirmed core. S18 LINE 1 REQ: "In THIS round only the STATE READ (line 4) fills or serves the store". LINE 4: the
shadow runs for "a face whose state read would DERIVE" and "writes nothing, reads the store only". S8 reads only through
kerb() (bentCutFabric.ts:653 kerbFace, :729 kerbSeed, :924 needle floor), and kerb() goes to readKerb with vertexContacts
true (kerb.ts:2226-2229). The district face is read at :1359 and cut at :846, so no root ever gets an entry and no child
ever derives. LINE 6's bars (i) and (ii) are then over 0 faces.

Corrections:
- LINE 5 is overstated. (a) cuts "to a recursion depth of 4" and reads "every child … both ways after each cut". A
  depth-1 child's state read constructs and keeps an entry, so depth 2 and below do derive. The gap is only at the
  root faces, not "the same gap". Still require a state read of each root before its cut, and faces derived > 0.
- LINE 6's proposed floor "faces derived >= the children S8 read whose parent S8 read" is too strict. LINE 3 allows a
  counted fallback ("any step refuses, the child reads by construction and that is counted"). Write the floor as:
  derived + counted fallbacks (each with its reason) = those children, and derived > 0.

The debug-only fill from served construction reads is otherwise sound. It matches S19 LINE 1's "a face's first read by
construction, KEPT as its entry", and it leaves the prod counts of LINE 7 (2) alone.

## SCOPE-2: confirmed

S18 LINE 2 REQ: "`before` computes the parent's content key (line 1) while F stands". LINE 1's key holds the
vertexContacts flag and "per spine its half-widths … and its declared ends". splitFace(o, face, cut, opts)
(split.ts:171) and connectHole (:204) have no SpineWidths. Half-widths and ends come only from `w` in readSpine
(kerb.ts:257-262). LINE 2's own text says "splitFace takes no widths". The split into a width-free geometric key (for
lineage) and an entry key (geometric key + samples + flag) fixes the contradiction. The width pin is right.

## SCOPE-3: partly

Confirmed. LINE 1's "any other write to F's boundary or to a bounding spine's width profile changes the key" is false:
- (a) readFace's `through` (kerb.ts:393-426) is built from edges leaving F's route vertices. LINE 1's key has edge spine
  keys only.
- (b) junctionEnd (:303-324) returns false as soon as another chain of the same role ends at v. Before the second lane,
  only the crossed spine counts (k ≥ 2, passes): flat. After junctionAt re-arms the junction (bentCutFabric.ts:1009-1017;
  continuationRefused :1093), the first lane's end flips to capped. The children of the first lane keep rings, edge spine
  keys and samples, so their key does not change.
- (c) spineParts keeps segments by reach of the clip box (:559-564).
- (d) dryLevel puts the read at L2 (:857).

The proposed key is wrong as written. At every S8 T the lane's new vertex splits the crossed spine S's edge. For the
neighbour N across S:
- that vertex is a route vertex of N's ring, dropped as straight-through;
- the lane's edge leaves it and is not N's own, so the raw `through` set of N gains the lane;
- S's route gains a vertex inside N's reach.

Adding "the through set" and "each spine's route vertices within its reach" unfiltered would therefore change N's key at
every T. That turns LINE 1's pin (c) red and undoes 986 (c)'s "under splitThrough the state is unchanged".

Corrected change:
- key only the vertex-only spines whose end at F's vertex is not a junction (flat) end, or the census-kept set
  (`reaches`);
- key each bounding spine's junction flags;
- key the route run within reach only after straightRun's straight-through drop;
- name L2 content as outside the key.

Pins (h) and (i) stand, and add: (c) still green with the new key.

## SCOPE-4: partly

Confirmed: no L1 guard. s11Workload.ts:152 calls k.geom.splitFace with faceLevel 3 inside an L4 batch (via faces/ops.ts:15
kernelOp). A readFace-style walk starts with check(isFaceLive(p, 1, face)), and that is worse than a counted failure: an
L3 slot number can also be a live L1 slot, so the key and lineage of an unrelated L1 face would be recorded. The
`rows` point is true (opts.rows may be undefined; cutRows resolves inside splitCore, split.ts:184) but minor.

Not borne out: the bundler. kernel/package.json has "sideEffects": false. But DEBUG_BUILD is a computed const exported
from debug.ts (debug.ts:15), which esbuild does not fold across modules. I bundled a sideEffects:false package with esbuild
0.28.2, using bundle.ts's settings (bundle, esm, node, define PLAT_DEBUG_BUILD=false), with and without minify. A
module's top-level installation was kept when its binding was used only inside an `if (DEBUG_BUILD)` branch of another
module. The draft also already covers the risk: memo §6 risk 9 and §4 ("kernel/package.json sideEffects: false (the
observer's installation)"). LINE 7 (2) also lists the observer's calls apart, which shows whether it is installed.

The proposed lazy install ("whenever the slot is empty") has two problems:
- It breaks LINE 2's pin "with the observer removed (the setter given null) every child reads by construction": the
  next state read re-installs it.
- In S18's prod bundle no state read ever runs, so the observer is never installed, and LINE 7 (5)'s observer cost
  would certainly measure nothing.

Corrected change: keep the install at evaluation time. Add the L1 guard (no token unless faceLevel and t.level are 1,
counted apart, with an L2 pin and a faceLevel-3 pin). Make LINE 7 (2) fail if the prod bundle's S8 count shows 0
observer calls.

## SCOPE-5: confirmed

ARCHITECTURE.md:5636 says "a regeneration from the same inputs yields the same arena", and :5365 says corridorUnion
"re-derives only those, which is also how an edit re-derives the corridors". savepoint.ts:252 moves the generation on a
put-back across committed batches, and S18 LINE 1 retires entries on it, with "a load starts with none". Under S19 LINE 1,
S9 commits the derived kerb when it runs after S8 in-process and the construction otherwise, and the two differ up to
DRY_MOVE_CM on attracted faces.

The draft names only the read-level half. Memo Q1's consequence says "after a save or load … a face reads by
construction. kerb.ts:115-122's 'same kerb after a save and load' is narrowed in a comment". It never says this makes
S9's committed arena history-dependent, which breaks a design guarantee rather than needing a comment. The proposed
re-ruling and the (ii) bar are right. Whether option (i) is feasible was not checked.

## SCOPE-7: partly

- d-04 cannot move: confirmed. workload.ts:7 "No arena". roots-golden.json's `$comment` says the arena entry is
  "model.test.ts's setup() over a framed arena", and model.test.ts makes no kerb or corridorUnion read (its 'kerb' hits
  are role names).
- a-16: likely no move, but this rests on something unspecified. facade.test.ts:175-179 compares JSON.stringify of the
  whole KernelResult, warnings included: the first read (construction) against the second (served kept entry). S19
  LINE 1 fixes warnings only for derived reads ("[]"), not for a kept entry. If a kept entry serves [] where the
  construction warned, a-16 moves.
- Owners confirmed from M0-work.json: b-05 (bentcut-ng), c-06, c-07 (fusion-ng), x-05 (ladders), d-09 (determinism; its
  fusion spike stages are S1–S8 with no S9, stages.test.ts:11), e-04 (layout/test/districts), a-06 (kernel/test/tx).
- Spot-checked pins match: rungs-s8.test.ts:140-148 (slide [30], W_CUT_SLID 30), splitSeeds.test.ts:195 and :276
  ([2 394, 1 554]), seeds.test.ts:85.
- The count of 43 was not reproduced. My grep is noisy because 'kerb' is also a role name.

Accept the corrected list and the scratch-mirror RELATED measurement. Keep a-16 as a candidate until kept-entry warnings
are specified.

## Missed

S19 LINE 1 does not say what a KEPT entry returns as warnings, nor whether kerbCensus's refusedAt and faithful carry over.
A served kept read must equal the construction it replaces, warnings included: facade.test.ts:175-179 and any caller of
the full result depend on it. As written, the first and second reads of one face can differ in `warnings`, which is a
shift with a cause other than the derivation.
