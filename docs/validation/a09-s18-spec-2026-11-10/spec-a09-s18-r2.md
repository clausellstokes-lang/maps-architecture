# M0-a-09 S18, rewritten to J742 R-A: the spec seat's memo (r2)

Written on 2026-11-10 by a spec seat of the managing session, on the design head b81502bd. M0-c-06 S1 has landed
(ccf1ed46, and its fix round 2's check passed). M0-a-06 S9 has not landed yet.

Files:
- The entry: `spec-a09-s18-r2.json` beside this memo. It is ONE entry: `M0-a-09`, from 18, round S18, 15 lines.
- The seat's reading, cite by cite: `working-notes-r2.md`.
- The superseded draft (`spec-a09-s18.json`, `spec-a09-s18.md`, `working-notes.md`) is left as it was.

Nothing outside this folder was written, except the render copy in the scratchpad.

The entry builds §3.7's exact kerb X(F) = region(F) − ⋃ B(s) as a pure function, `arr/kerbExact.ts`. It proves X and
measures it at CITY, beside the construction, which goes on serving every read. The round moves no output and has no
cross-item scope. From the draft it keeps only:
- the form of its cites;
- the oracle and corpus ideas, as the review corrected them;
- its NO-SHIFT line, rebuilt so that it can fail;
- LINE 14, carried as LINE 15.

The draft's store, observer, lineage, derivation and Q152 lines are gone (J742 R-A, R-C).

## 1. The lines

| line | what it builds | gating bar | mutants |
|---|---|---|---|
| 1 | `kerbExact.ts`: `exactKerb` and `exactRegion`. X's definition: F's route rings; the edge spines plus the `through` spines that reach X_E; each spine's buffer is the faithful parts `spineParts(s, box, true)`; KerbRead.region's normal form | pinned by lines 2, 3, 8, 9 | XM1, XM2 (killed at lines 8 and 4) |
| 2 | X writes nothing (no Plat, no insertChain, no savepoint, no batch state). The degenerate readings: `[]`, the spine-less face, holes, a ring way. The lemma: X over all `through` spines ≡ X over the reaching ones | write-nothing counts 0; the degenerate four literal | XM3–XM8 |
| 3 | One exact arrangement; THE ROUNDING RULE (each new vertex is snap of one exact intersection of two original segments); non-simplicity resolved order-free | order property byte-identical; vertex-membership; simpleRing; half-coordinate literal | XR1–XR3 |
| 4 | `kerbKey`: its fields (the flag; rings under THE RING RULE; per spine, the inputs of its parts). The neighbour's-T rule | (k1) equal keys ⇒ identical X; the square and oblique T named | KM5, KM6 (+ XM2) |
| 5 | (k2) one pin per input; (k3) representation-free; L2 content outside the key | each pin red under its mutant | KM1–KM4, KM7 |
| 6 | `definition.ts`: the definition oracle. Generator truth in the kernel, an arena form for CITY. Two-sided grid and vertex tests; margin 4 cm, its reason stated | 0 misses, 0 vertex or simplicity failures | OM1–OM3 (+ its own planted-X self-tests) |
| 7 | The motion diagnostic in kerb.ts (`kerbMotion`: unmoved, and the moved outlines) and the relation: EQUAL / ≤1CM (with a straight-through sub-class) / ATTRACTED / BEYOND, arbitrated | X wrong fails; an unmoved read with neither wrong fails | FM1–FM4 |
| 8 | Literal rings computed by hand: a half-coordinate corner, an oblique T onto a zero-width chain, a junction-flag flip, a ring way, a hole and slit, the empty kerb, the spine-less face, contact with and without reach | `toEqual`; ≤1CM required 0 here | XR2, XM1, XM3–XM7 |
| 9 | `derived.test.ts`. The corpus: B-FUZZ networks cut S8-style to depth 3, at 100 runs per property, with floors of 2 000 faces and 300 cuts; NEAR ≤ base + 1 800 s | the oracle on every face; the relation on every face; (k1); X refusals 0 | lines 1–7's mutants (where each dies is in the table) |
| 10 | The incremental identity I(child), against X(child), classed: inherited / contact / end-changed / rounding / other | none (REPORTED) | — |
| 11 | The debug shadow in readKerb: X, the key, the relation, the judge hook, a log per distinct key; (k1) re-checked at every repeat read (throws); throws on its own exception | flag-off pin via vi.mock; served read and kerbCensus unchanged on and off | SM1–SM5 |
| 12 | The CITY probe (derive + s8s9 in-thread, source mode): fusion 3 and integrated 4 at CITY; fusion and integrated 1–2 at TEST_SIZE | judged > 0 and ≥ cuts; 0 X-wrong; 0 unmoved-neither; 0 X refusals; 0 overflow; the planted 2 cm control turns it FAIL | the planted control |
| 13 | NO-SHIFT: roots; S8's counts with X's functions at 0; a bundle text check; fusion report.json byte-identical in source mode; the census; every bands outcome, including Q152's six red exactly as on the base; the gates | every item identical | — |
| 14 | Cost: `exactKerb` time ÷ calls. Source mode by the probe's timer. Prod by a mirror-only forced shadow, with a 500-sample floor (VOID below it) and a `--no-turbo-inlining` retry | none (REPORTED) | — |
| 15 | notes row 156: the NB5 / NB7 pins (the draft's LINE 14) | the two pins | NB5, NB7 |

## 2. The 2A-relevant review findings, and where the rewrite meets each

**The design lens.**
- **DESIGN-1:** met by lines 4–5. The key holds the reaching vertex-only set, the junction flags, and the run within
  reach after straightRun's drop, i.e. each spine's part inputs. THE RING RULE covers ring vertices.
- **DESIGN-2:** gone with the store. The shadow sits beside every served read (line 11), and line 12 gates on judged > 0
  and on a planted control.
- **DESIGN-3:** gone. There is no observer; the key is computed at read time, with the read's widths.
- **DESIGN-4:** gone. X is computed from region(F), never from a parent, so no root's attraction is inherited. The
  relation's flag belongs to the served read itself (line 7).
- **DESIGN-5:** the S18 half is gone (no store, no generation). Its residue, the construction's history dependence, is
  counted as "constructions varying under one key" (lines 11–12). The S19 half goes to 2B.
- **DESIGN-9:** the 2A half is met:
  - the oblique T pin (line 8 (2));
  - the T end as the code makes it (line 6's oracle rule);
  - the three conditions, as line 10's classes.
  The derivation-pin half goes to 2B.
- **DESIGN-10:** met. X reads its spines fresh at every read (line 1). There are no stored spines and nothing reaches
  `splitsOn`. The S19 half (what a served read returns) goes to 2B.
- **DESIGN-11:**
  - (1) Several Ts: the key holds the reduced runs, so a T beyond the hot pixel changes the key exactly when it changes
    the parts. Line 12 also reports keys per distinct X.
  - (2) Gone.
  - (3) kerbKey is a full canonical text, so no hash ever selects an entry. 2B's memo must keep that.
  - (4) Replaced by line 13 (2)–(3).
- **DESIGN-12:** this finding is the round's shape. X's independence is supplied by line 6. Its warning about sequential
  rounding is met by line 3.
- **refute-design's "Missed":**
  - the ring-vertex rule: line 4;
  - the unreduced first read: line 1 (c), with line 7's STRAIGHT-THROUGH sub-class;
  - DESIGN-11's absence from the array: noted here.

**The scope lens.**
- **SCOPE-1:** gone. Its addendum (the kernel corpus) is met by line 9, which reads every live face after each cut and
  so depends on no parent.
- **SCOPE-2, SCOPE-4:** gone (no observer). The prod-bundle question is checked by line 13 (2)–(3).
- **SCOPE-3:** met by line 4. The vertex-only set is census-kept (it reaches X_E), the junction flags are keyed, the run
  within reach is keyed after the drop, and L2 is outside the key (line 5 (k3)).
- **SCOPE-6:** every cite was re-read on b81502bd. Some had moved:
  - `landed.mjs` note → `plat/tools/landed/landed.mjs:649-653`;
  - s8s9 → `measure.ts:548`;
  - dryrun state → `:80`.
- **SCOPE-8:** the pre-edit check asks for the whole-tree `landed:verify -- flow-7` to print ok once the session has
  re-landed `session-m0-work`. See action A1.
- **SCOPE-9:** rule (6) runs NEAR in the kernel project only.
- **SCOPE-10:**
  - the probe runs in-thread (line 12);
  - the 0.95 floor (`measure.ts:81`) is noted;
  - no share is gated.

**The bars lens.**
- **BARS-1:** gone, and also met by lines 11–12.
- **BARS-2:** line 13 (2) claims S8's window only. S9's reads are judged by the probe (s8s9 in-thread).
- **BARS-3:** line 13 (4): report.json byte-identical in source mode, with the shadow on. The root comes from the probe.
- **BARS-4:** line 13 (2) (X's functions at 0 calls in the prod count) and (3) (the bundle text check).
- **BARS-5:** line 8 (the literals; the half-coordinate) and line 7 (the exact comparison, never `hausdorffCm`).
- **BARS-6:** line 6 (generator truth; `simpleRing`).
- **BARS-7:** line 12. The shares are REPORTED only.
- **BARS-8:** line 7 (the locus covers whole moved outlines) and line 6 (the oracle on every CITY face at 100 cm).
- **BARS-9:** line 9 (size, floors, time bar; kernel project).
- **BARS-10:** line 11 (the vi.mock flag-off pin; throws on its own exception). The 0-dry-run sub-claim goes to 2B.
- **BARS-11:** line 14.
- **BARS-16:** rule (4) is corrected: the census is the `B-FUZZ bands` console lines under `--silent=false`, with no
  PLAT_FUZZ_COUNTS. X's own refusals are gated at 0 in lines 9 and 12, so no new family is needed.
- **BARS-17:** line 12 gives:
  - the entry point;
  - workers 1;
  - the columns;
  - the reproduction criterion;
  - the expected time.

**The q152 / sequencing lens.**
- **SEQ-5:** goes into the re-read list (§5).
- **SEQ-12:** met. Round 2B is never called "S19"; that number appears only as a lane number.
- **SEQ-13:** the brief is 82 119 chars (§6), against 71 681 for a-06 S9. The Q152 paragraphs are gone.
- **SEQ-14:** met by the clause's LONG RUNS paragraph and §6's estimate.

## 3. Carried to 2B (one line each, with the refuter's verdict)

- DESIGN-5, S19 half (a kept entry from a rejected or read-only batch): partly.
- DESIGN-6 (`kerb` stops being a function of the arena under a kept state; three ARCHITECTURE sentences and C-0207 (5)): partly, the contract change real.
- DESIGN-7 (offRead under kept state; it must always use the construction): confirmed.
- DESIGN-8 (no CITY gate on the switched trajectory): confirmed.
- DESIGN-9, S19 half (the derivation's pins and its classes on a served read): partly.
- DESIGN-10, S19 half (a served read's spines, census and warnings defined): confirmed, stronger.
- DESIGN-11 (3) (a memo selects by the full key, never a hash): not in the array; noted.
- SCOPE-5 (S9 alone, or after a save and load, commits another arena): confirmed.
- SCOPE-7 (the shift's reach: b-03, b-04, b-05?, c-06, c-07, x-05, e-04, d-09, a-05; d-04 and a-16 do not move): partly.
- refute-scope's "Missed" (a kept entry's warnings, refusedAt and faithful must equal the construction's): raised by the refuter.
- BARS-2 (S9's window: a probe or a scoped tool change): confirmed.
- BARS-10, sub-claim 3 (2B's 0-dry-run pins must exclude the reversed oracle's constructions): partly.
- BARS-12 (S19's construction bound defined by the store's misses): partly.
- BARS-13 (the shift declaration needs a control that can fail): confirmed.
- BARS-14 (Q152's judgements one-sided; L9 a B-CLOSE law, not a re-pin): partly. Q152 goes with R-C.
- BARS-15 (S19's 0.5 slope bar stays failing, with own-term bars and attribution): partly.
- SEQ-1 (group B's bisection through pre-door trees cannot be built): confirmed. Q152 goes with R-C.
- SEQ-2 (an exact oracle cannot judge a construction read): partly.
- SEQ-3 (vertex-depth oracles cannot see lost area): partly.
- SEQ-4 (a REPORTED Q152 line leaves a red the gate forbids): partly.
- SEQ-6 (no failing bar sees a needle committed beyond N-43 after the switch): partly.
- SEQ-7 (row 144's pin contradicts the record; a second shift cause): partly.
- SEQ-8 (Q90's re-measure fixed in advance; ask for the ruling): partly, minor.
- SEQ-9 (a-05 S14's hold): partly. R-D now runs it in parallel.
- SEQ-10 (S19 re-recording other items' test files with no hold on them): confirmed.
- SEQ-11 (what closes Q126; RL14's text vs ruling (a)): partly.
- refute-q152-seq's "Missed" (network 561's old island vertices sit at depth = hw, so any vertex oracle fails even the old outcome): raised by the refuter.
- **Design P** (J742 R-B; the session's standing recommendation): serve X, memoised by the key. The declared shift then
  covers every attracted read, roots included. `kerb` stays a function of the arena, S8 ≡ S9 holds across a save and
  load, and the three sentences stand.
- **Design H** (J742 R-B): 986 (c)'s kept state with its history. It needs:
  - a "kept state is made by a commit" rule with a signal from tx/;
  - the contract narrowed, and the owner's decision on it;
  - a persistence story before M1's pool.
  It departs from nothing in 986 (c)'s wording, but needs the owner.

## 4. Questions for the session

**Q1. Should X buffer the straightRun-reduced runs?**
Line 1 (c) uses the faithful read's parts. My recommendation is yes, decided on the code, because:
- a neighbour's T then leaves X, and so the key, unchanged. This is 986 (c)'s "under splitThrough the state is
  unchanged" and §3.7's T sentence, and without it SCOPE-3's re-key at every T comes back;
- generator truth is the reduced line anyway.

The cost: on unattracted faces X differs from the construction's first (unreduced) read by up to about 1.4 cm at
straight-through vertices. Those cases are counted as the STRAIGHT-THROUGH sub-class of ≤1CM and REPORTED.

The alternative is the unreduced runs. They give exact equality more often, but re-key every neighbour at every T, which
costs the memo in 2B.

**Q2. Should the shadow run in every source-mode run of the repo?**
R-A puts it beside every served read, with DEBUG_BUILD. That has two consequences from this round's landing on:
- every source-mode test of every item that reads a kerb pays X, its key and the relation;
- a (k1) violation or an internal exception of X becomes a red in that item's test.

My recommendation is yes, as ruled. It is the strongest standing check, and line 13 (7) reports the time it adds to
NEAR and RELATED. If the added time is large, the session can later narrow the gate (DEBUG_BUILD and a test-project
flag) without touching this round's bars. The alternative is to narrow it now, to `bands/` and the probe.

**Q3. Is line 6's CITY arena form independent enough?**
The definition oracle's arena form shares `tx/profile.ts`'s `routeLines`, `knotLines` and `cutKnot` (M0-a-06's) with
`readSpine`. Everything else is its own, and the kernel corpus uses generator truth only. My recommendation is yes: that
code is the arena's reading of a chain, not the kerb under test, and it is named in the line.

**Action, not a question (A1).** Before the launch, the session must:
1. add `plat/packages/kernel/src/arr/kerbExact.ts` to M0-a-09's owns in `M0-work.json`;
2. run the scaffold validator;
3. re-land `session-m0-work` on a new session lane (`corepack pnpm landed -- session-m0-work --lane session/m0-work-<n> --wave flow-7 --owns plat/docs/build/M0-work.json`);
4. confirm the whole-tree `landed:verify -- flow-7` prints ok (lens-scope SCOPE-8).

The build seat's pre-edit check returns blocked without these.

## 5. Re-read list for the day M0-a-06 S9 lands

**What S9 changes.**
- `faces/common.ts` opSave / rollback, now on marks, and their call sites in kerb.ts: dryInsert `:1405`, dryClose `:871`.
- `tx/frames.ts`: mark / undoTo.

**The tests the shadow runs under.**
- `dryrun.test.ts`:
  - the mocks `:19-32`;
  - countReads `:60-81`, its untouched test `:75` and the state test `:80`;
  - expectDryRun `:87-97`.
  SEQ-5 says S9 does not edit this file: confirm it.
- `restage.test.ts`: the mocks `:24-29` and the census pins `:107`, `:133`.

**Lines this entry cites.**
- Q152's six outcomes on the RESUME head, exactly six red.
- The whole kerb.ts cite set (S9 should not edit kerb.ts): readKerb `:2153`, CENSUS `:1902`, spineParts `:550`,
  readFace `:335`, dryRegion `:1617-1626`, laidExactly `:1179`, coveredBy `:1684`.
- `write-door.test.ts` and its allowlist, in case S9 changed the door. X writes nothing.
- `plat/tools/landed/landed.mjs`'s note, `:649-653` on b81502bd.

**Other trees.**
- `bench/src/profile/` (driver `:82-83`, `:174-183`, `:207`; counts; bundle) and `bench/src/fusion/` (measure `:81`,
  `:548`, `:572`, `:726`, `:802`; runs `:416`), if anything landed after ccf1ed46.
- `bentCutFabric.ts` `:653`, `:729`, `:924`, `:832-846`, in case M0-x-02 S4's patch moved them.
- `M0-work.json`'s M0-a-09 owns, which must include `kerbExact.ts` (A1).
- Whether anything was added to arr/ or bands/ since b81502bd.

## 6. The seats' time, and the brief sizes

**Rendered** in this session's scratchpad (`render-s18r2/sf/briefs/prompts-a-09s18.json`) with args fitted to this box
(4 cpu, 16 GiB, maxLanes 2, mutantCap 3):

| brief | chars |
|---|---|
| this round's BUILD | 82 119 |
| this round's CHECK | 80 339 |
| M0-a-06 S9's build / check, for comparison | 71 681 / 69 909 |
| M0-a-06 S8's build / check, for comparison | 68 569 / 66 797 |

**The build seat,** on a 4-core box, is about 14–18 h wall-clock:
- **Code: about 8–12 h of seat work.**
  - the exact arrangement with one-pass snap rounding and the normal form;
  - the key;
  - the shadow and log;
  - the motion diagnostic;
  - `definition.ts`;
  - `derived.test.ts`.
- **Runs, about 6–8 h**, partly in parallel. The profile runs are serial on an idle box.

| run | time |
|---|---|
| the base mirror | ~15 min |
| bands NEAR, base + tree | ~1 100 s + ~2 000–2 900 s |
| census, 4 runs | ~30 min |
| profile plain and count, base + tree, 2 seeds | ~1 h serial |
| line 14's forced runs | ~20 min |
| fusion source runs, base + tree, seeds 3 and 4 | ~40 min |
| the probe, 6 seeds + the control | ~30 min |
| RELATED@1000 over kerb.ts + kerbExact.ts | ~1.5–2 h (5 121 s on S17 before the shadow) |
| mutants: ~30, at a reduced corpus size, 3 at a time | ~1 h |

**The check seat** is about 6–8 h:
- re-killing the mutants: ~1 h;
- the census: 30 min;
- NEAR: ~50 min;
- RELATED: ~2 h;
- the probe and control: 30 min;
- profile and fusion: ~1.5 h.

**The long-wait hand-off is needed:**
- at check, for RELATED, and for the profile, fusion and probe chain. Both exceed an hour; HANDOFF/settle exist for check
  seats only;
- at build, the same runs go to background chains with done-files under the WAITING RULE, since the build seat has no
  settle.

These figures are estimates; none was measured.

## 7. What I could not verify

**Nothing was executed:** no test, bench or profile run. That leaves these open:
- X's cost;
- whether a snap-rounding pass is needed for simplicity;
- whether the STRAIGHT-THROUGH differences stay within 2 · HOT_PIXEL_CM;
- how often an unmoved read equals X;
- whether line 9's floors (2 000 faces, 300 cuts) are reached at 100 runs per property;
- every time figure in §6.

**M0-a-06 S9 is not on this tree.** Its effect on `faces/common.ts`, on the dry-run mocks and on the six reds' outcomes
is unread; the build seat checks it before its first edit.

**Points I did not run, and why I expect them to work.**

| point | expectation |
|---|---|
| esbuild keeps the `if (DEBUG_BUILD)` shadow call as a runtime test | BARS-4: no minify, a computed const of another module. Line 13 (3) checks it in the bundle text. |
| The kerb.ts ↔ kerbExact.ts import cycle | No `import/no-cycle` rule in `eslint.config.js` (grepped). The bindings are read at call time only. Line 11 pins it. |
| A `vi.mock` of `invariants/debug.js` with DEBUG_BUILD false also leaves `setDebugAssertions` alone | The module's top-level call runs only in the real module. The mock replaces it, so the arena's own switch stays on. |
| Adding one import line to `bundle.ts`'s stdin entry in a mirror resolves `kerbExact.ts` under the plat-source condition | — |
| `readFace` charges no `work` counter, so X leaves dryrun.test.ts's work comparison untouched | No charge seen in its body. |

**Taken from the review, not re-read:** `profile-s8-after-q18.md:15` and `:56` were re-read (143.1 s prod, 216.8 s
tsx-debug for fusion 3's S8). The 43-file reach census of SCOPE-7 was not re-read.
