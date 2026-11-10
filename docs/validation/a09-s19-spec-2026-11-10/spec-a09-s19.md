# M0-a-09 S19, the wiring and measurement round: the spec seat's memo

Written on 2026-11-10 on the design head b3c1f41b (J757). Neither M0-a-09 S18 nor M0-a-06 S9 has landed there. S18 was
read on its branch `origin/wip/child-a09s18` at ba8ab3f0 (the notes, `kerbExact.ts`, `derived.test.ts`,
`definition.ts`). Nothing was run except reads and a small Python token counter in the scratchpad (§4).

Files in this folder:
- `spec-a09-s19.json` — ONE entry (`M0-a-09`, from 19, round S19), 10 lines. The session clause is 13.5 k characters;
  each line is 2.3–4.5 k characters (LINE 6 is the longest).
- `working-notes.md` — what I read, with file:line, step by step.
- this memo.

## 1. The round in one paragraph

S18's X(F) is wired in through a **hook in kerb.ts** and switched on **by path from kerbExact.ts**. In a debug build
the shadow runs beside every served read: it computes X from the served read's own `f`, times it with a clock its
caller passes, and hands one record to an observer. The judging is done by test-side modules: the relation, an
arena form of the oracle, the lineage and the tables. A scratch runner (quoted verbatim in the notes) runs each seed
twice, shadow OFF and ON, through `derive` + `measure`. The OFF and ON SeedRecords must be byte-identical, and the ON
run prints THE MEASUREMENT TABLES 2B NEEDS (LINE 10). NO-SHIFT of the wired tree is LINE 8. The cost is LINE 9.

| # | title | gating bar | mutants |
|---|---|---|---|
| 1 | The hook in kerb.ts (`ReadShadow`, `setReadShadow`, two statements in readKerb) + the module-comment paragraph | start/done pins (refused, faithful-taken, throwing widths) | HM1–HM3 |
| 2 | The kernel-boundary accounting: no row, no cap moved | `lint: kernel-boundary ok`; token counts equal | BM1 |
| 3 | S18R-19: `exactKeyContentOfRead` / `exactRegionOfRead` on the served `f` | differential pin; widths pin; derived.test.ts DERIVED lines base = tree at 518964130 | XF1, XF2 |
| 4 | The shadow `setExactShadow` (DEBUG_BUILD or `anyBuild`; the caller's clock; writes nothing; throws through) | line 5 | SM1–SM5 |
| 5 | The off/on pins: `shadow.test.ts`, `shadow-prod.test.ts` | KernelResult, kerbCensus, counts, widths calls, bits, state equal off/on | (kills 1, 3, 4) |
| 6 | The test-side modules: `relation.ts` (moved), the oracle's arena form with a sample cap, `observer.ts` (lineage, identity, H) | `observer.test.ts` | OB1–OB3 |
| 7 | The CITY probe (runner quoted; OFF/ON; 6 seeds; the 5 cm and 10 cm controls) | OFF = ON; floors; oracle 0 faults; no-move BEYOND rule; 0 X refusals; controls FAIL | the controls |
| 8 | NO-SHIFT of a wired tree (roots, counts, bundle code, fusion report, census, bands, gates, RELATED over kerb.ts) | each item | — |
| 9 | The cost (informative): source by the observer's clock; prod by count + cpu, X forced in a mirror; VOID rules | none (REPORTED) | — |
| 10 | THE MEASUREMENT TABLES 2B NEEDS, T1–T7 | its FAILING columns are line 7's | — |

## 2. The decisions, and why

**D1. A hook in kerb.ts, set from kerbExact.ts.**
- *Why.* kerb.ts is at its kernel-boundary caps (§4). Importing `./kerbExact.js` from kerb.ts adds a ninth `kerb`
  string. The hook needs no import at all: kerbExact.ts already imports kerb.ts (`kerbExact.ts:67`), so it can install
  the hook through a setter.
- *Cycle.* None. kerb.ts imports nothing new.
- *Precedent.* `tx/frames.ts:14-31` (`setFrameObserver`) and `arena/write.ts:838-843` (`setUndoFaultHook`).
- *Placement.* readKerb gets exactly two statements: `start` before the readFace call (`kerb.ts:2156`) and `done` right
  after `CENSUS.set` (`:2181`). At that point the served outcome is fixed: `read.k` and `sp` feed every return at
  `:2183`–`:2191`. One `done` statement therefore covers all four returns without restructuring the body.
- *Why a start call.* It gives a per-read construction time on the same clock as X's, which LINE 10 T6 needs.

**D2. The DEBUG_BUILD guard is in `setExactShadow`, not in kerb.ts.**
- S18R-8's guard is `DEBUG_BUILD && exactShadowOn()`. Here the hook is installed only when DEBUG_BUILD is true (or
  `anyBuild` is set), so "the hook is non-null" means exactly that guard.
- kerb.ts then needs no import of `invariants/debug.js`.
- In production nothing imports kerbExact.ts, so the shadow's code is ABSENT from the bundle and kerb.ts's hook is
  dead. LINE 8 (3) checks both on the bundle's `code` part (S18R-16).

**D3. The kernel side is thin.**
- kerbExact.ts computes X and hands a record to the observer. It keeps no per-key log, holds no clock, and has no
  `offsetCm` or `force` seam.
- The (k1) check, the relation, the oracle, the lineage and the tables are all test-side (`observer.ts`).
- The planted controls are test-side too: the comparand is translated by 5 cm, and X by 10 cm before the oracle.
- *Why.* This drops r2 LINE 11's kernel log, its `process.hrtime` and its seams, which S18R-8 rules out (no clock and
  no environment variable in kernel/src).

**D4. r2 LINE 7's motion flag is NOT built.**
- The carry list makes it optional. Building it means body edits inside `dryInsert` (`kerb.ts:1401-1488`), which puts
  NO-SHIFT at risk.
- *What replaces it at CITY.* A no-move read is one where `faithful` is 'none', the read was not restaged, and the
  served read's warnings contain none of the four move codes. The dry run passes every insertChain warning through
  (`:1481-1485`) and adds W_ATTRACTED on a collapse (`:1441-1449`). S18's FM2 found this reading equivalent to the
  wrapper's placed-point check on its whole corpus (notes row 171).
- *The cost.* The MOVED class at CITY has no per-call locus. It is defined as "within DRY_MOVE_CM on a read that
  moved" and is REPORTED only, never FAILING.
- *How the gap is measured.* `observer.test.ts` lists every corpus read where the warnings reading and S18's wrapper
  reading disagree.

**D5. The runner is scratch; the logic is committed.**
- bench/ is not M0-a-09's, so the runner (about 40 lines) lives in scratch and is quoted verbatim in the notes
  (S18R-10 (1)).
- Everything it judges with (relation, oracle, observer) is committed under `kernel/test/arr/bands/` and pinned.
- These modules must load without vitest. `definition.ts:38` imports `./support.js`, which reaches
  `kernel/test/tx/support.ts:7` (a vitest import). So `simpleRing` is copied into a vitest-free module.

**D6. OFF/ON in the probe via `measure()`.**
- The fusion harness cannot switch the shadow on without an edit to bench/.
- So "report.json byte-identical shadow off and on" is split in two:
  - report.json base → tree with the hook null (LINE 8 (4));
  - in the probe, the whole SeedRecord OFF vs ON. `stampsMs` is excluded because it is a wall-clock
    (`measure.ts:117`). The root is compared too.
- I chose `measure()` over r2's `s8s9()`. It costs the other bars' time, but it compares everything the report folds
  (S18R-8 (4)).

**D7. Lineage at CITY.**
- The shadow cannot see S8's cuts: `faces/split.ts` is not owned.
- So a face's parent is taken to be the latest earlier distinct content whose route region holds the face's.
- Then I(F) := exactRegion(X(P)'s rings, [P's rings, F's rings reversed] ∪ the parts of the spines new to F's key).
  The winding sum makes P − F one part set, which is S18's sibling form (row 168) without a lookup of the sibling.
- The H table (T5) is built from the same records: repeat keys, children with or without the identity, and first
  reads with no parent.

**D8. The arena form of the oracle.**
- `truthOfFace` reads the incident chains' routes from the arena's own rows. It imports nothing of arr/ and applies
  the oracle's own `spinesOf` (S18R-13 (3)).
- A ChainProfile width, a multi-run chain or an unreadable frame makes the face UNJUDGED, counted by class.
  "Profile reading" is one of those classes (S18R-13 (4)).
- Samples are capped at 4 000 per face, and segments are bucketed (S18R-10 (2)).

**D9. The seeds are R7's two at CITY plus four at TEST_SIZE.**
- CITY: fusion 3 and integrated 4. TEST_SIZE `{900, 30}` (`bench/test/fusion/support.ts:3`): fusion 1, 2 and
  integrated 1, 2. These are r2 LINE 12's seeds, the ones the review names.
- The two controls run on fusion 1 at TEST_SIZE.

**The rules block.** I copied it verbatim from the S18 entry. I changed only the clauses that name S18's own lines or
files, because those cannot stand verbatim:
- rule (1)'s "in THIS round only" write list;
- rule (3): "by line 11" became "by lines 7 and 8";
- rule (4): "line 11 (3)" became "line 8 (6)";
- rule (6): RELATED now runs over kerb.ts AND kerbExact.ts;
- rule (7): the section name 'Hardening round S19', and the table list (T1–T7 and the new exports);
- the checker's sentence: the diff of both files, the bundle in line 8 (3), and the runner's re-run;
- "TWELVE … LINE 12" became "TEN … LINE 10".

Each change was made with an exact-once string replace (`build.py` in my scratchpad), so nothing else in the block
moved.

## 3. Where the carry list was ambiguous, and what I chose

1. **"Copy the rules block verbatim, changing only the section name."** This is impossible to do literally: the block
   names S18's lines 11 and 12 and its four `export` keywords. The changes are listed in §2.
2. **r2 LINE 7 (the flag) is "optional".** Not built; see D4.
3. **"fusion report.json byte-identical in source mode shadow off and on".** The harness cannot turn the shadow on.
   I split the check (D6).
4. **`exactSeam.force` (r2 LINE 14) for the prod cost.** It became `setExactShadow(o, { anyBuild: true })` in the
   tree. The option is dead in production because kerbExact.ts is not bundled, and only the mirror's bundle entry
   calls it. The alternative (a scratch edit of the guard in the mirror) is Q2.
5. **`exactSeam.offsetCm` (the planted control).** It became test-side plants (D3). They test the judging pipeline at
   CITY, which is what the controls are for.
6. **"The shadow's own exceptions surface in debug."** Exceptions propagate uncaught. I did NOT verify whether a
   stage's `k.tx(…)` turns a thrown error into a refusal. So the observer records each exception before rethrowing,
   and the probe fails on a recorded one. A swallowed throw would also break the OFF = ON identity.
7. **BARS-12, BARS-13, SCOPE-7 and "Missed".** The brief asked me to read them, but r3's 2B list claims them. They are
   kept out. The only trace is a sentence in LINE 10: what a kept entry would serve is 2B's question.
8. **DESIGN-5 (an S19 half that r3 sends to 2B).** I keep only r2 LINE 11's COUNT (constructions differing under one
   key) as a T5 column. There is no ruling and no bar.
9. **J742 R-D's "S19 after both".** That was written when S19 meant 2B. For the wiring round I wrote: after S18 and
   S9; beside M0-a-05 S14 allowed (Q1).
10. **The lane key `fix-s19`.** It assumes S18's first check passes. If S18 needs a fix round, that round takes
    `fix-s19`, and this entry must be re-keyed (`from` 20; lanes `-s20`; verdict `M0-a-09-s20.md`).
11. **r2 LINE 15 (NB5 / NB7).** S18 kept it (r4 did not take confirm edit 11), so it is not here.

## 4. The kernel-boundary accounting

**No row of `kernel-boundary.allow.json` is needed: none added, raised or lowered.**

The counts below come from a Python re-implementation of the lint's `wordsOf` / `nounsIn` (scratch `tools/nouns.py`),
not from the lint itself. Node was not to be run.

| file | ident `kerb` (cap) | string `kerb` (cap) | after S19 |
|---|---|---|---|
| arr/kerb.ts | 20 (20) | 8 (8) | 20 / 8. The new names (ReadShadow, readShadow, setReadShadow, start, done, sh) hold no noun. No string is added. The hook's types never name KerbRead: they use `ReturnType<typeof censusRead>` and LastRead. |
| arr/kerbExact.ts | 2 (2, J752) | 1 (1, J752) | 2 / 1. setReadShadow, ReadShadow and LastRead join the existing `'./kerb.js'` import at :67. `'../invariants/debug.js'` holds no noun. The file never names kerbCensus, KerbRead or readKerb. |
| arr/index.ts | 1 | 1 | untouched |

Two traps the seat must avoid:
- kerb.ts has NO allowlist row for any other noun (band, corridor, way, lane, block, city …). A name like
  `shadowBand` is a failure, not just a cap matter.
- The hook's types must never name KerbRead.

LINE 2 pins this with the lint line itself. The mutant BM1 (`setKerbShadow`) makes kerb.ts 21 > 20.

If the built code cannot avoid a token, the seat stops and returns blocked (ruling (g)). A row is the session's seam,
landing in one commit with the round, as J752's did.

## 5. CHECK AT BINDING (re-read on the head that carries S18 and S9)

**S9 (the frames):**
1. `faces/common.ts`: opSave / rollback still exist under those names and signatures. LINE 5's pins and line 8 (2)'s
   counts count opSave in dryrun.test.ts's mock form (`dryrun.test.ts:29-32`). If the dry run now opens a frame under
   another name, count that name.
2. `kernel/test/tx/support.ts`: `bits` (:163 here) and `state` (:107) are still the arena's whole state after S9 (the
   off/on pins). Also check whether `tx/support.ts:7` still imports vitest (D5).
3. `bench/src/profile/counts.ts:10` COUNT_FNS: S9 may rename takeSavepoint / restoreSavepoint. LINE 8 (2) takes the
   list as the head has it.
4. `tx/frames.ts:14-31`: LINE 1's precedent form, if S9 changed it.
5. The cites of kerb.ts's dry run (`dryInsert`'s opSave :1405, dryClose :866): numbers only. kerb.ts is not S9's.
6. Whether S9 re-seated `dryrun.test.ts` / `restage.test.ts` mocks: LINE 5 copies their form; it never edits them.

**S18 (the library):**
7. The landed interface is notes row 173's, with J752's names: `exactKey`, `exactRegionOfFace`; no `kerbKey` or
   `exactKerb` anywhere.
8. The allowlist's two `arr/kerbExact.ts` rows landed with the round (ident 2, string 1). kerbExact.ts's `kerb`
   tokens are still exactly :67 (×2) and :639.
9. The PR-size seed and figures: 518964130, and S18's row 172. The session's merged-tree replay of
   `derived.test.ts` (S18's clause) must be done and equal.
10. derived.test.ts's private helpers keep their names (LINE 6 moves hausdorff, tipNear, relate, NEAR_CM and the
    arbitration). definition.ts's import of `./support.js` (:38).
11. S18's verdict (`checks/M0-a-09-s18.md`). Any S18 survivor or note that lands as a queue row may belong in this
    round or in 2B. FM4's survival is a hardening note there.

**The lanes and the ledger:**
12. `docs/lane-events.log` has no `M0-a-09-fix-s19` key (§3 item 10).
13. The ledger row of the binding ruling. The clause says "named at the binding". Insert its J-number.
14. M0-a-05 S14's state and the J757 merged round's state (Q1, Q7).

## 6. Open questions for the session (each with my recommendation)

- **Q1 — S19 beside M0-a-05 S14, or after it?** S14 changes the engine the construction reads through. Tables
  measured before S14 lands may not be the ones 2B lives with.
  *Recommend:* beside (the two are file-disjoint). Whichever lands second, the session re-runs LINE 7's runner as quoted
  on the merged tree before 2B is specced. That costs about 1–1.5 h of runs and no seat. This is what the clause says.
- **Q2 — `anyBuild` in the tree, or a scratch edit of the guard in the mirror?**
  *Recommend:* the tree option. It is reproducible by the checker with no source edit, and it is dead in production
  because kerbExact.ts is absent from the bundle (line 8 (3) proves it).
- **Q3 — the CITY no-move reading (warnings) instead of a kerb.ts motion flag?**
  *Recommend:* accept. It keeps kerb.ts's dry run untouched, and `observer.test.ts` measures the disagreement on S18's
  corpus. If that disagreement is not 0, 2B decides whether the flag is worth a dry-run edit.
- **Q4 — the oracle's per-face cap (4 000 samples).** This widens the oracle's blind spot on large faces: an error
  thinner than about a grid step can hide there, though the vertex test still sees vertices.
  *Recommend:* accept, with the per-face step printed (T3) and the faces at the cap counted. The literal pins and
  derived.test.ts stay the fine-grained judges.
- **Q5 — `measure()` (everything the report folds) or `s8s9()` (cheaper) in the probe?**
  *Recommend:* `measure()`. S18R-8 (4) asks for the S8S9Record, the root and the work rows. measure gives all of them
  and the rest. It adds minutes per seed, not hours.
- **Q6 — the evidence folder `plat/docs/build/checks/M0-a-09-s19-evidence/`** for the BEYOND cases' rings. It is not
  M0-a-09's owns.
  *Recommend:* allow it, as J751 allowed M0-c-04 S6's evidence folder (N-52's lesson). Otherwise the cases go into the
  notes, which may be large.
- **Q7 — the J757 merged round.** It raises the role registry's version and moves every root.
  *Recommend:* S19 does not straddle it (the clause says so). If it must, its base mirror is cut after the raise.
- **Q8 — seat tiers.** I copied S18's (build opus/high, fix opus/high, check fable/high, recheck opus/medium) as the
  session's ruling.
  *Recommend:* keep them. The check's judgement of the arbitration and the oracle's arena form is the hard part.

## 7. Time (estimates on a 4-core box, not measured)

**Build: about 11–14 h.**
- **Code, 6–8 h:**
  - hook and paragraph, 0.5 h;
  - S18R-19 refactor, 0.5 h;
  - shadow, 1 h;
  - the two pin files, 1.5 h;
  - the relation move, observer, lineage, identity and tables, 2–3 h;
  - the arena form of the oracle with its cap, 1.5–2 h;
  - the runner, 0.5 h.
- **Runs, about 5 h wall-clock (the profile runs serial and idle):**

| run | time |
|---|---|
| base mirror | ~15 min |
| bands at PR size, base and tree | ~14 + ~17 min |
| derived.test.ts at 518964130, base and tree | inside the bands runs, or ~20 min alone |
| RELATED@1000 over kerb.ts + kerbExact.ts | ~85–95 min (SEQ-14: 5 121 s, 363 files) |
| ~13 mutants at reduced size | ~1 h |
| the probe: CITY 2 seeds × OFF/ON, TEST_SIZE 4 × OFF/ON, 2 controls | ~1–1.5 h. fusion 3's S8 alone is ~217 s in tsx; measure, X and the oracle add minutes |
| profile roots and counts, 2 seeds × 2 mirrors | ~30 min |
| bundle builds | ~5 min |
| fusion harness, source mode, 2 seeds × 2 mirrors | ~25 min |
| forced-prod cost runs (count + cpu, maybe the inlining repeat) | ~15–25 min |

**Check: about 6–8 h.**
- re-kill the mutants, ~1 h;
- re-run the runner on 6 seeds + 2 controls, ~1.5 h;
- bands base/tree, ~30 min;
- RELATED, ~1.5 h;
- bundles, profile and fusion, ~1 h;
- reading the arbitration and the arena oracle, ~2 h.

**Rendered brief:** not rendered (render.mjs not run). The entry is about 46 k characters of JSON. S18's entry rendered
to 66–67 k with the templates, so expect a similar size.

## 8. What I could not verify (UNVERIFIED)

- Whether a stage's `k.tx(…)` catches a thrown error and turns it into a refusal (§3 item 6). The design is safe
  either way.
- Whether `tsx --conditions=plat-source` resolves bench's `@plat/kernel` and the runner's by-path import of
  `kerbExact.ts` to ONE module instance of kerb.ts. The pnpm symlinks are realpath'd by default, I believe. LINE 7's
  "0 reads observed fails" floor catches a second instance.
- Whether esbuild's bundle of the tree renames any identifier outside the hook. I checked that the new names
  (`readShadow`, `setReadShadow`, `ReadShadow`, `setExactShadow`, `exactRegionOfRead`, `exactKeyContentOfRead`) occur
  nowhere in packages/ or bench/ on b3c1f41b. LINE 8 (3) allows a rename hunk only if it is shown to be a rename.
- The arena's frame role at CITY (for `endsOf`'s `onFrame`). LINE 6 makes the seat name and quote it.
- Whether every module the runner imports is vitest-free after D5's copy of `simpleRing`. The runner's first start
  shows it.
- The per-seed times. Nothing was run.
- The token counts in §4 are from my Python re-implementation, not from the lint.
