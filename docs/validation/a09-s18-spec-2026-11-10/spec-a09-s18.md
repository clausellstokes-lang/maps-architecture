# M0-a-09 S18 — round 2 of the kernel amendment z (item 986): the spec seat's memo

Written 2026-11-10 by a spec seat of the managing session, on the design head c7a35941 (which carries M0-a-06 S8's
landing, 7a1fbaa6). The entries are in `spec-a09-s18.json` beside this file (an array of two: S18 = 2A, S19 = 2B); the
seat's reading, cite by cite, is in `working-notes.md`. Nothing outside this folder was changed.

## 1. The split: recommended — S18 = 2A (the state beside the construction, NO-SHIFT), S19 = 2B (the switch, the declared shift)

**2A (S18, 14 lines).** Kerb state beside the arena, the lineage at the cut, the derived kerb, two oracles (§3.7's
definition by sampling and depth; the construction by 986's relation), `derived.test.ts`, the CITY agreement measured in
the shadow of the fusion runs, NO-SHIFT proved by the roots and the S8 / S9 call counts; plus Q152's six reds settled on the
base (lines 8–13) and notes row 156's two pins (line 14). kerb() and readKerb keep serving the construction.

**2B (S19, 11 lines).** The switch (S8 plans on the state, S9 commits the state S8 left), the deterministic read counts,
the declared shift with its re-recorded and re-pointed pins, Q152 re-judged after the shift, S8 ≡ S9 and the gate's
statistics on the harness, the cost bars, and the re-measured classes (Q117 / Q107, Q110, Q90, RL6, Q111).

Why, on the code:

- **The mechanism is new in three places at once.** A state store, a hook in another item's file (faces/split.ts), and an
  exact clip of a lattice region by a lane's buffer, which can be bent, can have round joins, and has flat ends at a T.
  The kernel has no such clip today. Its only booleans are the scratch overlay (milliseconds per arrangement) and the
  construction. 2A can prove all of this with an identity bar that cannot be argued away: the roots and the call counts
  must equal the base's. That was round 1A's lesson in J627.
- **The two halves' checks prove different things.** 2A's check proves the derivation correct against two independent
  oracles, with no shift in the way. 2B's check proves the switch: every read counted, the shift declared, the pins
  re-pointed. If they ran as one round, a FAIL of either would leave a tree whose model moved for an unproved derivation.
- **2B's shift reaches other items' pins.** Candidates: b-03's layout fabric tests, b-04's bentcut tests, and possibly
  d-04's roots golden (Q5). A pin whose assertion becomes vacuous under kept state has to be re-pointed (closing.test.ts's
  B-CLOSE family). That is a full seat's context on its own.
- **One seat could not hold both.** One seat would carry the design, the clip, two oracles, six Q152 judgements (three
  needing causes bisected through a-05's S9–S11 engine), a CITY probe, a shift reaching other items, the profile-tool
  protocol, and six re-measured queue classes. Round 1A ran long with less.
- **Cost of the split.** One more round on the hold chain (a-05 S14, b-03 S9, a-03 S2 wait for 2B in either form). Two
  base mirrors. 2A's shadow becomes 2B's debug oracle (reversed), so no code is thrown away. Only 2A has cross-item source
  scope, so the scope is re-landed once.

## 2. The write scope

Under the recommended store (Q1), the only cross-item source is faces/split.ts:

| file | owner (M0-work.json `owns`) | functions / lines | change | why no smaller scope |
|---|---|---|---|---|
| `kernel/src/arr/kerb.ts` | M0-a-09 | readKerb :2153, kerb :2226, readOn :1918, dryInsert :1401, CENSUS :1902; module comment :1-122 | 2A: the STATE READ and CONSTRUCTION READ entries (by path), the shadow, the 'attracted' flag. 2B: readKerb (vertexContacts true) switched to the state read; comment restated | own |
| `kernel/src/arr/kerbState.ts` (new) | none today (a-08 owns arr files by name, a-09 by name) → M0-a-09 by the session's owns entry (Q3) | — | the store, the content key, the lineage records, the derivation (exact clip), the diagnostic | a new path nobody owns; the alternative is kerb.ts at 2 600+ lines |
| `kernel/src/arr/bandUnion.ts` | M0-a-09 | readOn :584-586, offRead :595-609 (2B) | 2B: bandCore reads the state; offRead shown inert for stated faces and kept for faces without state | own |
| `kernel/test/arr/bands/*` (derived.test.ts new; closing, dryrun, restage, hardening-s15, hardening-s17) | M0-a-09 | — | 2A lines 5, 8–14; 2B lines 3–4 | own |
| `kernel/src/faces/split.ts` | M0-a-07 | splitFace :171-175, connectHole :204-208; one by-path observer slot and its setter | a `before` call before the core and an `after` call on the ok path, in each of the two ops; nothing else | the lineage must be taken while the parent stands, and splitFace has no widths. A child may be read after its sibling was cut, so lineage cannot be read back from the geometry. faces/ never imports arr/, so the call must go through a slot that the kerb module fills |
| `kernel/src/arena/*` | M0-a-02 | — | **NONE** | the state lives beside the arena. A column would make a read write the arena (dryrun.test.ts:75, :79 assert it does not), would need a door id, a growth and fills, and would collide with M0-a-02 S4, which is in the same wave |
| `kernel/src/tx/*` (writers.ts removeEdges, frames.ts) | M0-a-06 | — | **NONE** | removeEdges is a forward write: its merge-back is served the parent's entry by content. Undo needs nothing, because entries are immutable and validated by content plus restore generation (savepoint.ts:215 is read only) |
| `kernel/src/insert/splitThrough.ts` | M0-a-04 | — | **NONE** | S8's splitThrough writes a row at an existing vertex (bentCutFabric.ts:995-1000). The T-vertex on a neighbour comes from the lane's insertChain and is straight-through in the content key (straightRun's rule) |
| `kernel/src/faces/merge.ts` | M0-a-07 | — | **NONE** | a merged face has no lineage, so it reads by construction or by its content's entry |
| `bench/src/fusion/*` | M0-c-06 | — | **NONE** | measure.ts:550 reads kerb(), whose signature is unchanged. The round's harness readings run as c-06 S1 leaves them. The CITY agreement is a scratch probe in the mirror (the golden-probe form) |
| `bench/src/profile/*` | session (session/profile-tool-1) | — | **NONE** | --stage S9 and --fns with file:line resolution already exist (index.ts:76-77) |
| `layout/src/infill/*` | M0-b-03 | — | **NONE** | callers use kerb(o, face, widths) and `.value` only (:653, :729, :924). The profile driver's logpoint regexes (driver.ts:82-83) match those lines unchanged |
| other items' TEST files (2B only) | b-03, b-04, d-04?, a-16 … | values the shift moves | re-record with judgement, or declare a red set | the session's ruling (Q5) |

The cross-item paragraph in S18's clause is written in M0-a-06 S9's form: a scope diff from the base mirror, M0-a-07's
record re-landed on `session/a09s18-scope-1` through land_child.py, and the checker's two proofs (verify's mismatch for
exactly split.ts; patch -R back to the record's hash).

**Disagreements between the amendment and the code** (the code is the fact):

- 986 (c)'s "restored by the transaction's undo log" for removeEdges and mergeFaces does not hold. removeEdges lives in
  `tx/writers.ts:262`, is a forward write, runs after a successful cut, and can put the merged face on a new slot
  (C-0243).
- "the state table is a logged column" contradicts §3.7's read-only service and the dry-run pins. It is not needed under
  the recommended store.
- 986 (e) (3) puts the M0 (b) face set, city-split-seeds.json and the CITY fusion seeds in `derived.test.ts`. A kernel
  test cannot run S8: the kernel package has no layout dependency. The kernel test therefore cuts its own corpus
  S8-style, and the CITY part is a probe (2A line 6).
- "exact share ≥ 0.91" names two comparisons: derived against construction per face, and S8 ≡ S9 per block. Once S8 and
  S9 read one state, S8 ≡ S9 cannot detect a wrong state. The correctness bar is therefore the oracle relation, and
  S8 ≡ S9 bars the switch and the commit.
- "+ M0-c-06 for the harness's readings": no c-06 file has to change.

## 3. Questions for the session

**Q1 — The store.**
- **Question:** Where does kerb state live?
- **Recommended:** beside the arena. A per-Plat WeakMap of immutable entries, keyed by content:
  - the read's vertexContacts flag;
  - the face's L1 route rings, with straight-through vertices dropped;
  - each edge's spine keys;
  - each spine's half-widths and ends.

  Each entry is stamped with the restore generation. Lineage comes from an observer in faces/split.ts. This replaces
  986 (c)'s logged column and its four hooks.
- **Its consequence:** after a save or load (services are never stored, ARCHITECTURE.md:5636) a face reads by
  construction. kerb.ts:115-122's "same kerb after a save and load" is narrowed in a comment for derived faces.
- **What depends on it:** the whole write scope (§2); whether a-02 S4 can run beside the round; dryrun.test.ts's
  read-only pins; the §3.7 paragraph text at 2B's landing.

**Q2 — The split.**
- **Recommended:** split as §1 says. S18 = 2A, S19 = 2B; 2B re-keyed if 2A's workflow runs further rounds.
- **What depends on it:** both entries, the hold chain, and two rows in the plan.

**Q3 — The new file.**
- **Question:** may `plat/packages/kernel/src/arr/kerbState.ts` be added to M0-a-09's owns in M0-work.json before the
  launch?
- **Recommended:** yes. Nobody owns the path today, so no seam is borrowed.
- **Otherwise:** everything goes into kerb.ts.
- **What depends on it:** the record's claims, and rule (1)'s wording, which covers both answers.

**Q4 — The 'inherited' class.**
- **The case:** 986 (c)'s formula still subtracts the band of a parent spine that no longer bounds the child, while
  §3.7's definition (and the construction) would not.
- **Recommended:** count the cases in 2A (line 3; lines 5–6 report them) and rule before 2B is briefed:
  - the formula, because it keeps "a block never overlaps a corridor"; or
  - the literal definition, because the derivation then drops such bands.
- **What depends on it:** 2B's switch semantics, and whether its exact share is judged with or without the class.

**Q5 — The shifted pins of other items (2B).**
- **The problem:** values in b-03, b-04, a-16 and possibly d-04 test files that the declared shift moves.
- **Recommended:** grant a test-file-only scope for values whose only cause is the shift. The proof is the same test
  green with the state read disabled in a mirror. Each value is re-recorded with its judgement, and the lenders' records
  are re-landed on `session/a09s19-scope-1`.
- **Alternative:** declare them a red set for M0-b-03 S9, which runs next on that tree.
- **What depends on it:** 2B's gates (RELATED reds), and b-03 S9's start state.

**Q6 — The 1 000-seed run.**
- **The bar:** 986 (e) (3)'s "S8 ≡ S9 held on every seed of the 1 000-seed run's summary".
- **Recommended:** the session's measurement after 2B lands, as J628 did it, and REPORTED. 2B gates on the harness's
  test-size seeds (line 5).
- **Why not in the check:** a 1 000-seed run is hours of contended runners, not a closing check's work.
- **What depends on it:** 2B's exit, and KI-13's row update.

**Q7 — Q90's fix if it survives.**
- **Background:** RL11 makes Q90 a FIX under J490 (1). The fix needs the construction ruling Q90 names: close a
  displaced end along the window line, or re-ask the read.
- **Recommended:** 2B re-measures and reports only. The fix goes to a later a-09 round, after that ruling.
- **What depends on it:** 2B's line 9, and a-09's next round.

## 4. The re-read list (the day M0-a-06 S9 and M0-c-06 S1 land)

- **M0-a-06 S9 (frames):**
  - `faces/common.ts` opSave / rollback (now marks): their call sites in kerb.ts (:1405 dryInsert, :871 dryClose) and
    bandUnion.ts (:557).
  - Whether `rollback` still restores the journals and warnings as the dry-run assumes.
  - `tx/frames.ts`: mark / undoTo, the observer hook moved.
  - `tx/savepoint.ts:215` restoreGeneration — still moved only by image put-backs across committed batches, not by an
    in-batch undo (S9 line 1 says so).
  - Every frame-based undo still restores an L1 face's rings exactly, so content keys select the same entries (S9's
    check A).
- **dryrun.test.ts and restage.test.ts as S9 left them:** the mocks (:19-32; :24-29), countReads :60-81 and expectDryRun
  :87-97, and the six Q152 assertions' outcomes exactly as on main. S18's build seat confirms the six reds before its
  first edit and returns blocked otherwise.
- **S9's notes:** the per-read entry counts and save + undo figures (bar (1) there) — the base of 2B's cost comparison.
  Also whether S9 landed with forEachEntry / entryCounts.
- **arena/write.ts:** `write-door.test.ts` must stay green. S18 adds no arena store; any store in kerbState.ts would
  have to pass the door.
- **M0-c-06 S1:**
  - `bench/src/fusion/measure.ts` s8s9: the kerb read :550, the counters s9Refused / kerbReads (c-06:3), `beyond` and
    S8S9_EXACT_FLOOR.
  - report.ts foldRun (c-06:5); runs.ts derive; pool.ts; the summary's stageWork (Q118).
  - Whether the harness still derives in one process on the same Plat object. The state is beside that Plat; a worker
    boundary between S8 and the harness's S9 batch would lose it.
- **In flight:**
  - M0-x-02 S4: whether its patch of `bentCutFabric.ts:1595 / :1674` (k.tx call sites) moved the kerb call lines
    :653 / :729 / :924, or driver.ts:82-83's regexes.
  - M0-a-04 S6: insert/ step1-2 pins only, so no splitThrough.ts source change (if one lands, re-read
    bentCutFabric.ts:995-1000's use).
- **Assumptions to re-verify on the RESUME head:**
  - faces/ still imports nothing from arr/.
  - kernel/package.json `sideEffects: false` (the observer's installation).
  - splitFace's keeper rule (split.ts:10-12).
  - kerb.ts:2201-2220 splitsOn still takes a region alone.
  - arr/index.ts:9-12 still exports `kerb` only.

## 5. Each bar: can it fail, where it is measured, gating or informative

| bar (half, line) | fails on a wrong build because … | before → after from | gating? |
|---|---|---|---|
| store pins (2A L1) | a slot-keyed, generation-less, mutable or arena-column store turns a named pin red | test, tree | gating |
| lineage pins (2A L2) | a dropped `after`, an `after` on refusal, a key taken after the insertion | test | gating |
| definition oracle (2A L5 (i)) | an un-subtracted lane, a capped T end, the wrong side: points inside a band read as kerb | test | gating (0 misses) |
| construction relation (2A L5 (ii), L6 (i)) | an unattracted face whose derived ring differs by > 1 cm; a beyond case where the derived kerb also fails the definition | test; CITY probe (self-check mirror; there is no base, since the base has no derivation) | gating |
| CITY exact share ≥ 0.91 (2A L6 (ii)) | a systematically wrong derivation drops the per-face share | CITY probe, tree | gating; 0.95 reported |
| roots identical (2A L7) | 2A leaks the derived kerb into a served read | profile plain, base mirror → tree | gating |
| S8 / S9 call counts identical (2A L7) | served reads changed | profile count, base → tree | gating |
| census never rising / identical | any change in the construction | B-FUZZ 10⁴ ×2 seeds, base → tree | gating |
| Q152 six (2A L8–13) | the test itself (red on the old engine; the judgement by oracles) | base mirror and tree | gating per line (or REPORTED with cause) |
| construction counts in S8 ≤ faces with no entry; S9 0 over stated faces (2B L2) | a prod bundle without the observer, a fallback, corridorUnion re-reading | profile count, base → tree | gating (deterministic, so valid on the cloud box) |
| roots move, declared (2B L3) | a shift with another cause shows as an unexplained moved value | profile plain, base → tree | gating (declaration complete) |
| re-pointed pins (2B L3–4) | the state read disabled, so served-from-state pins go red | tests | gating |
| S8 ≡ S9 beyond 0, driftBeyond 0, share ≥ 0.91 (2B L5) | S9 not reading the state; the commit beyond N-43 | `bench -- fusion` test-size seeds, base → tree | gating |
| gate statistics within bands (2B L5) | a band left on the tree that held on the base | harness, base → tree | gating |
| derived read ≤ 50 µs mean (2B L6 (1)) | a slow derivation | cpu joint ÷ counted derived reads | gating, with S9's ONE RULE (a miss with every count holding is REPORTED for re-ruling) |
| total window slope ≤ 0.5 (2B L6 (2)) | a growing term (e.g. a store scanned per read) | cpu --window 100, base slopes and noise beside | gating |
| S8 ≤ 16 ms a cut (2B L6 (3)) | — | 3 plain each, interleaved, base beside | INFORMATIVE (J558 (2)) |
| 1 000-seed S8 ≡ S9 | — | the session after landing | REPORTED (Q6) |
| Q117 / Q107 / Q110 / Q90 / RL6 / Q111 (2B L7–11) | Q110 (a) fixed with a pin. Tips fixed only where the definition oracle shows the kerb wrong; otherwise routed by N-65 (3) | harness probe, base → tree | Q110 (a) and a-09-owned tips gating; the rest REPORTED |

## 6. Risks (what could make this run as long as round 1A)

1. **The exact clip.** A robust exact difference of a multi-ring lattice region and a bent lane's buffer parts (strips,
   arcs, flat T ends) is new code. Two traps: rounding intersections differently from insertChain's snap, and slivers at
   collinear edges. Unattracted faces could miss "equal" by 1 cm systematically; 2A counts that apart and reports it, but
   a flood of 1 cm cases would stall the judgement.
2. **The content key versus snap rounding.** A lane's insertion bends existing edges through hot pixels, which can also
   happen away from its ends. The straight-through drop handles a vertex within HOT_PIXEL_CM of the line and of the
   half-width sample. A larger bend retires a neighbour's entry, giving a construction instead of the kept state: correct,
   but it costs 2B's counts. Line 2 of 2B bounds those counts by "faces with no entry", so a high miss rate shows up and
   is not hidden.
3. **The 'inherited' class (Q4).** If it is common at CITY, 2A's CITY share and 2B's semantics wait on a ruling.
4. **The construction's own defects as oracle.** Known beyond-bound construction cases (Q110 (c), Q117's tips) make the
   construction relation noisy. The definition oracle has to arbitrate every beyond case, which is human-heavy if there
   are many.
5. **The Q152 group-B causes.** These need a bisection through a-05's S9–S11 landing (dcf05e0c). If one is a-05's
   defect, 2A cannot go green without a ruling (it is REPORTED and carried).
6. **Shift reach (2B).** The number of other items' pins that move is unknown until RELATED runs on the switched tree:
   possibly dozens in layout/test/infill/fabric. Q5 decides whether 2B re-records them.
7. **readFace's cost.** The 50 µs derived read includes readFace → readSpine over each spine's WHOLE own-level route
   (kerb.ts:257-287) and the content key. Long ways can exceed the bar; the fix is to keep spines in the entry.
8. **Memory.** One entry per face content read at CITY, each 100–300 points, is plausibly tens of MB a seed. The GC share
   could eat the cost win; 2A reports the size.
9. **The prod bundle's `sideEffects: false`.** If the observer's installation is dropped, the stage silently constructs.
   2B's counts catch this; 2A's count identity would not, because served reads are constructions anyway.
10. **Test time.** In 2B source runs the debug oracle runs a construction beside every derived read, so NEAR and RELATED
    keep today's ≈ 1 000 s / ≈ 5 000 s. The figures do not drop.

## 7. What this seat could not verify

- **The renderer.** I could not render the entries: render.mjs needs the session's fitted args file, which lives in
  another session's scratchpad (specs.json's `args`). Their shape matches the existing entries: id, from, round, session,
  lines with line / evidence / required_change.
- **The tree's future state.** M0-a-06 S9's and M0-c-06 S1's landed code (not on this tree). Whether S9 kept the six Q152
  outcomes. Whether the harness keeps S8 and S9 on one Plat object.
- **roots-golden.json.** Whether `model/test/digest/roots-golden.json`'s city1 (`syntheticCity(1)`) runs S8, and so
  moves with 2B.
- **city-split-seeds.json.** Whether its three records can be replayed in a kernel test (they hold kerb, spine and block
  but possibly not the cut chain).
- **The façade.** What `batchValue` (facade/kernel.ts) does with a read's warnings. Derived reads have none.
- **The cost estimates.** None was measured: no test or bench was run. The ≈ 40 µs derived read, the attracted share, the
  store's memory and the count bounds are untested estimates.
- **The (B) causes.** The three Q152 group-B causes are not found here; that is 2A's work (lines 9, 11, 12).
