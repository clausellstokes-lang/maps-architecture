# M0-a-09 wiring round (re-keyed S20): the binding refuter's result

Written 2026-11-11. I read the tree at 5c412cde, which carries M0-a-09 S18 + S19 (795f4c1e) and M0-a-06 S9 (5c412cde).
HEAD moved to 99c4874e while I read (J765 and J766 were recorded, and M0-e-01 S2 landed as 2992248a). Between the two,
`git diff --stat 5c412cde HEAD` changes only site/, docs/ and workflows/: no kernel, bench or layout file moved.
Nothing was run except reads, git log/show/diff, and a scratch Python token counter. My working notes are in
`refute-notes.md`. The corrected entry is `spec-a09-s20.json`.

**Verdict:** the draft's design holds. Its hook, its boundary accounting and its pure shadow are all buildable on this
tree, with no cycle and no allowlist row. It could not bind as written, for three reasons:
- it was keyed to lanes that are already LANDED;
- it contradicted J758;
- one FAILING bar could fail a correct build on a class the oracle cannot judge.

I fixed all three in the corrected entry, with eighteen smaller corrections. **The corrected entry is ready to bind**
once the session answers OQ-1 and OQ-2 below. Either answer can be folded in without changing a line's structure.

## 1. CHECK-AT-BINDING (the memo's §5, items 1–14)

| # | item | verdict | evidence (this tree) |
|---|---|---|---|
| 1 | faces/common.ts opSave / rollback; the opSave count in dryrun.test.ts's mock form | **Holds.** Names and signatures are unchanged. The bodies now mark and undo a FRAME. | common.ts:450-456 `OpSavepoint { mark: Frame, … }`. :459 `opSave(t: OpenTx): OpSavepoint`, which calls `mark(t)` at :464. :485 `rollback(t, s, refusal)`, which calls `undoTo(t, s.mark)` at :486. :54 imports mark / undoTo from tx/frames.js. dryrun.test.ts:19 counts; its mocks are :21-32 (opSave :29-32); countReads :60-81. S9 touched no test/arr/bands file (`git show --stat 5c412cde`). |
| 2 | tx/support.ts bits / state are still the whole state; does :7 still import vitest? | **Holds; the line numbers moved, and there is something new.** | state :100 (was :107). bits :156 = arenaBits :114 + indexBits :137 (was :163). :7 still imports vitest. NEW: :474-486 install S9's frame observer and afterEach / afterAll at module evaluation when PLAT_UNDO_ORACLE=1. bands/support.ts:16, :20 re-export state. |
| 3 | counts.ts:10 COUNT_FNS: did S9 rename takeSavepoint / restoreSavepoint? | **Changed in meaning, not in text.** | The list is unchanged (`git log` on the file: last commit aa35a98a). No source file calls takeSavepoint any more: grep finds only the export at tx/index.ts:53 and the definition at savepoint.ts:153. So it reads 0 in S8's window (J765 (2): 4 026 → 0). A dry run's frame work is now `mark` :304 / `undoTo` :320 in tx/frames.ts, and neither is in COUNT_FNS. In the bundle, `rollback` is `rollback2` and `mark` collides with insertChain.ts's own (M0-a-06-s9.md:409-414). |
| 4 | tx/frames.ts:14-31, LINE 1's precedent form | **Form holds; the cite moved.** | frames.ts:88-99 FrameObserver; :102 `export let frameObserver`; :105-109 `setFrameObserver` returns the observer it replaced. arena/write.ts:839-843 setUndoFaultHook. |
| 5 | kerb.ts dry-run cites (opSave :1405, dryClose :866) | **Holds, unmoved.** | kerb.ts:1401 dryInsert, :1405 opSave, :866-872 dryClose (rollback :871), :1441-1449, :1481-1485, :1490 dryRegion, :1626, :1725 censusRead, :1918-1941 readOn, :2153-2192 readKerb, :2181 CENSUS.set. |
| 6 | Did S9 re-seat the dryrun / restage mocks? | **Holds.** | No test/arr/bands file appears in 5c412cde's stat. restage.test.ts:56 and :163 still read kerbCensus. |
| 7 | The landed interface is row 173's, with J752's names | **Holds.** kerbExact.ts is now 710 lines (S19's F1 header), so every cite moved by +18. | Exports: roundQuotientHalfAway :116, exactRegion :528, KeyedSpine :566, ExactKeyContent :572, exactKeyContent :655, exactRegionOfKey :689, exactKey :700, exactRegionOfFace :706. No `kerbKey` or `exactKerb` anywhere (grep). |
| 8 | The two allowlist rows; kerbExact.ts's `kerb` tokens at :67 ×2 and :639 | **Rows hold; the token lines moved.** | allow.json has arr/kerbExact.ts ident kerb 2 and string kerb 1 (in 795f4c1e). The tokens are now at :74 (`'./kerb.js'` and `kerbParts` in the import) and :657 (the kerbParts call). My scratch copy of wordsOf / scanText (kernel-boundary.mjs:36-77) gives kerb.ts 20 / 8 and kerbExact.ts 2 / 1. This is not the lint itself. |
| 9 | Seed 518964130 and row 172; the session's merged-tree replay done and equal | **Changed / UNVERIFIED.** | The seed stands. Row 192 (S19's FIGURES TABLE) REPLACES row 172 (ii) for bent + slits (cuts 463, judged 1 892, BEYOND 234, identity 735 / 912). J765 (4) says the replay was *running* when it was written ("their result … the next row's"). No ledger row records its result. |
| 10 | derived.test.ts helper names; definition.ts:38 | **Names hold; there is one structural catch.** | NEAR_CM :113, hausdorff :164, exemptOf :185, servedOf :212, tipNear :233, relate :255, identity :945. The ARBITRATION is a closure inside readAll (:561-582), not a function. definition.ts:38 imports simpleRing from ./support.js; endsOf :122, spinesOf :266, gridOf :298, judge :340. |
| 11 | S18's verdict and survivors | **Read.** | M0-a-09-s18.md FAILED on F1–F5, and M0-a-09-s19.md PASSED. The closing notes are rows 178–184 and 195–198, as Q178 (a)–(d). FM4 is pinned by F4 (row 189). The tip rule is still open (row 197). |
| 12 | lane-events.log has no `M0-a-09-fix-s19` key | **CHANGED.** The library's fix round took that key. | `build/M0-a-09-fix-s19` LANDED 2026-11-10 09:11; `check/M0-a-09-close-s19` LANDED 09:41. No line carries `-s20` (grep count 0). So: from 20, lanes `-s20`; render.mjs:36-41 gives `build/<id>-fix-s<from>`. |
| 13 | The binding ruling's J-number | **Set to J765**, as the session instructed. | J765 (the S9 landing) names "M0-a-09's wiring round, S20 (a refuter seat is working its draft …)". |
| 14 | State of M0-a-05 S14 and of J757's merged round | **Neither has launched.** | S14: its entry is bound, and launch-DV.md was committed in 0a5b10da ("before its creation"). No `M0-a-05-fix-s14` line exists. J757's round (a-02 S4 → a-06 S10 → a-05 S15) has no lane line. S14 reads this item's definition.ts as its oracle, read-only (specs.json, M0-a-05 from 14, LINE 10). |

## 2. FINDINGS

Severity: **blocker** means it cannot bind as written. **major** means a bar or rule is wrong, a pin is unbuildable,
or a ruling is not followed. **minor** means a stale cite, an ambiguity or a missing source.

| id | sev | the draft's claim | what the tree shows | required change | applied |
|---|---|---|---|---|---|
| R-1 | blocker | Keyed `from` 19: lanes `build/M0-a-09-fix-s19` / `check/M0-a-09-close-s19`, verdict `M0-a-09-s19.md`, section 'Hardening round S19', `…-s19-evidence/`, runner `probe-s19`. | Those keys are LANDED by the library's fix round (lane-events.log, 2026-11-10 09:11 and 09:41). The notes file has 'Fix round S19 — builder' at M0-a-09-notes.md:2308. The verdict file `checks/M0-a-09-s19.md` exists. A seat under the CONTINUE RULE would read S19's CHECKPOINT and LANDED lines as its own. | Re-key everything to S20: from 20, lanes `-s20`, verdict `M0-a-09-s20.md`, section 'Hardening round S20', `M0-a-09-s20-evidence/`, `probe-s20`. A further round takes `-s21`. The GATE and the pre-edit check list S19's four LANDED lanes. Every "S19" that names the library's fix round is kept. | yes |
| R-2 | major | Session clause: "the build seat has no settle hand-off: workflows/34-session-fix.js adds it to check seats only". | J758 added `BUILD_HANDOFF` (workflows/34-session-fix.js:58-60, "LONG-WAIT HAND-OFF FOR A BUILD SEAT"), and the build schema accepts `"waiting"` (:17). | THE LONG RUNS now says a build seat may hand a run over forty minutes to the waiter (J758), with the chain and HANDOFF.md as the appended rule says. Profile runs never run inside a chain beside another run. LINE 7 adds that a seed's runs over forty minutes may go to the waiter. | yes |
| R-3 | major | LINE 7 FAILING bar: "0 faces where the oracle finds X wrong". LINE 6 (b) makes only ChainProfile widths, multi-run chains and an unreadable frame UNJUDGED. | Rows 181 and Q178 (b): where a chain ends on a way laid along the frame, the oracle and the construction disagree. The oracle's endsOf keeps the declared end first (definition.ts:128 `if (c.closed \|\| onFrame(q)) return false`). kerb.ts junctionEnd (:303-324) counts another chain's level-1 row on frame edges, so it makes a flat junction end. S18 dropped those networks; with the filters off, 11 + 7 reads failed by the oracle alone. **At CITY the bar can fail a correct build.** The draft also gives no rule for a no-move BEYOND read on an UNJUDGED face: "neither wrong" would read as FAILING. | LINE 6 (b) adds the UNJUDGED classes **frame-side end** and **retracing route**. An UNJUDGED face is never a pass and never a fault. LINE 7 judges the no-move BEYOND rule only on judged faces; on unjudged faces such reads are listed by class. The oracle column gets a floor: VOID below half of the distinct keys judged, and VOID is not a pass. T3 reports UNJUDGED by class and the judged share. The end rule itself is OQ-1 for the session. | yes (the rule is open: OQ-1, OQ-2) |
| R-4 | major | LINE 5: "a planted throw inside X (a vi.mock of kerbExact.ts's exactRegion throwing on one named face) makes readKerb throw". | The shadow lives in kerbExact.ts and calls exactRegion inside that module (via exactKeyContentOfRead, as :667 does today). An ESM module mock replaces the module for its importers, not the module's own internal bindings, so the planted throw would never fire. SM2 (a try/catch) would then survive with the pin green. kerbExact.ts:74 imports kerbParts FROM kerb.js, and kerb.ts's own calls (:1726, :1740) are internal. | Plant the throw through a vi.mock of `arr/kerb.js` that spreads `...real` and wraps kerbParts to throw on one named face. That reaches X and leaves the construction untouched. Also add an observer whose read() throws. Never mock kerbExact.ts's own export. | yes |
| R-5 | major | Session SEQUENCING: "if S14 lands with a shift on the construction's reads …, the SESSION re-runs line 7's runner". | J759 (3) Q1 rules "whichever lands second, this seat re-runs the quoted runner on the merged tree before 2B is specced". That is unconditional. | "WHICHEVER OF THE TWO LANDS SECOND, the SESSION re-runs line 7's runner as quoted on the merged tree before round 2B is specced". | yes |
| R-6 | major | The `anyBuild` option (LINE 4, LINE 9). No carry is stated. | J759 (3) Q2 rules the option "with a carry for 2B: the option must not stay live once kerbExact.ts is served". | LINE 4 states THE anyBuild CARRY. Rule (7) puts it beside the interface row of the notes. | yes |
| R-7 | major | T2 counts "the STRAIGHT-THROUGH figure (X ≠ X_U)" over all reads. | Row 179 / Q178 (a): the construction's no-move FIRST read stands 3 cm by 300 cm off §3.7 next to a kinked junction end, and round 2B is ruled on that class. The draft never counts it apart, so CITY would not show how often it occurs. | T2 adds the straight-through count on no-move first reads (reads, max cm, the first 20 per seed in the evidence folder; REPORTED). LINE 7's REPORTED names it. | yes |
| R-8 | minor | LINE 3 (iii): the base's DERIVED lines are "the S18 + S9 tree's, which the session's merged-tree replay … compared with S18's row 172". | Row 192 (S19) replaces row 172 (ii). The replay is not recorded (J765 (4): it was "running"). | Compare the base's DERIVED lines with row 192 as well. If they differ, it is the merged tree's difference: return blocked unless the session's replay has ruled it. | yes |
| R-9 | minor | Mutant XF1: "exactRegionOfRead calling readFace again". | exactRegionOfRead(f, vertexContacts) has no p, face or widths, so the mutant cannot be written. | XF1 becomes the shadow calling exactRegionOfFace(p, face, widths, vc) in place of exactRegionOfRead(f, vc). The widths pin turns red. | yes |
| R-10 | minor | LINE 6 (a): the relation and "its arbitration MOVED there verbatim"; MOVED at CITY is "two-sided within DRY_MOVE_CM". | The arbitration is a closure in readAll (derived.test.ts:561-582). relate's MOVED branch needs `served.movedParts`, the mock's locus (:255-265). With no locus, a moved read beyond NEAR_CM falls to BEYOND. The helpers also call segDist, ringDist, samples, T and tipClass. | Move the helpers with what they call. Lift the arbitration to a function of what it closes over, body verbatim. Add `relateRead` for the CITY MOVED class, with relate itself verbatim. | yes |
| R-11 | minor | Ruling (e) allows "line 6's moves and additions" in definition.ts. LINE 6 copies simpleRing but does not re-point the import. | M0-a-05 S14 (bound, about to launch) reads definition.ts as its oracle (its LINE 10). definition.ts:38 imports ./support.js, which chains to vitest (tx/support.ts:7, :474-486). | Ruling (e) says definition.ts takes additions plus one re-pointed import, and judge / endsOf / spinesOf / bufferOf / gridOf stay byte-unchanged. The sequencing names S14's read-only use. | yes |
| R-12 | minor | LINE 7: "derive, then measure(d)". | The harness's own task record is `runTask` (pool.ts:17-20): derive with `watch: true`, then measure. Unwatched, stageRows are empty, so the probe's record is not the one the report folds (Q5 asks for exactly that record). | Use runTask in-thread, OFF and ON. | yes |
| R-13 | minor | Clock: "process.hrtime" (LINE 4, LINE 7). | `ExactObserver.clock?: () => number`, but process.hrtime() returns a tuple. | Use `() => Number(process.hrtime.bigint()) / 1e6` (ms). | yes |
| R-14 | minor | The shadow record carries "read.spines' keys". | X_U and X_F are kerbParts over the construction's Spine map (derived.test.ts:650-654). Keys alone force a rebuild of that map from f. | The record carries read.spines, the Map. | yes |
| R-15 | minor | Stale cites throughout. | kerbExact.ts :67/:639 → :74/:657; :637-692 → :655-710. tx/support.ts :107/:163 → :100/:156. frames.ts :14-31 → :88-109. write.ts :838 → :839. derived.test.ts :112/:152/:173/:200-215/:221-241/:243-252/:911-955 → :113/:164/:185/:202-220/:233-253/:255-265/:945. The memo's "b3c1f41b / ba8ab3f0" provenance sentence. | Cites updated, and the provenance sentence now names 5c412cde and this file. | yes |
| R-16 | minor | LINE 8 (2) counts COUNT_FNS plus three new names. | Since S9 the dry runs' frame work is mark / undoTo / markBatch (frames.ts:304, :320, :247), none of which is in COUNT_FNS. takeSavepoint / restoreSavepoint read 0. | Add mark, undoTo and markBatch to LINE 8 (2). LINE 9's forced run also shows COUNT_FNS plus mark / undoTo equal to the plain run (REPORTED; a difference is a finding). | yes |
| R-17 | minor | T5 "S8's cuts …" and LINE 9's "ms a cut" use different sources, and neither is named. | SeedRecord.faces.cuts is lanes.length (measure.ts:792). The profile's cut is splitFace + connectHole (counts.ts:21, :56). At fusion 3 these are 1 205 and 1 216 (profile-s8-after-q18.md:15). | Name each source. LINE 10 also states its units: integer counts, cm to 2 dp, ms. | yes |
| R-18 | minor | Time and cost figures predate S9 and S19. | J765 (2): S8 prod 73.4 → 54.6 ms a cut, and save + undo per read 7.5 → 0.34 ms. Row 192: X median 0.62 / 0.89 ms. | Quote both, and mark the old figures as pre-S9. | yes |
| R-19 | minor | Q4: the step is "stated per face" (LINE 6). | J759 (3) Q4 rules "each face's step printed and faces at the cap counted". | Print each face's step into the evidence folder's per-seed file. T3 already counts the faces at the cap. | yes |
| R-20 | minor | The evidence folder is named, but who claims it is not. | J759 (3) Q6: "claimed by the round's build-notes record". | Rule (1) names the folder and its claimant (the build-notes record, never the code record). | yes |
| R-21 | minor | LINE 2 counts only new NAMES in kerbExact.ts for nouns. | The lint counts string literals and template parts too (kernel-boundary.mjs:67-74). | "and no new string literal holds one (its texts say 'exact')". | yes |
| R-22 | minor | LINE 1 types the hook with `ReturnType<typeof censusRead>` in an exported interface. | censusRead is module-local (kerb.ts:1725). tsconfig.base.json has `declaration: true`. Whether the declaration emit takes it is UNVERIFIED. | `pnpm build` decides. The fallback is one exported alias with a noun-free name, said in the notes. | yes |
| R-23 | minor | The memo's UNVERIFIED: "whether a stage's k.tx(…) turns a thrown error into a refusal". | tx/tx.ts:547-562: the batch is undone and the error RETHROWN, never turned into a refusal. | Cited in LINE 4's evidence. The OFF = ON identity still covers the stage pipeline. | yes |
| R-24 | minor | Nothing about S9's undo oracle. | tx/support.ts:474-486: under PLAT_UNDO_ORACLE=1, S9's frame observer compares the arena at every mark and undo. | Add one REPORTED run of shadow.test.ts under it to LINE 5. | yes |
| R-25 | minor | Rows 178 and 197 (the tip rule admits about twice its bound) are not addressed. | Q178 (d) routes it to M4 "or the next round that opens the file". This round moves the relation verbatim, and LINE 3 (iii) needs the DERIVED lines unchanged. | Not here: see OQ-3. T2 already counts NEAR at a tip. | no (noted) |
| R-26 | minor | Row 180 (the corpus's mix of cuts). | Q178 (c): a note for the binding. | One sentence in LINE 7's REPORTED: the CITY probe reads S8's own cuts. | yes (note) |

By severity: **1 blocker** (R-1), **6 major** (R-2 to R-7), **19 minor** (R-8 to R-26).

Kept as drafted, because each held under attack:
- The hook. readKerb is unchanged; start goes before :2156 and done after :2181. `sh` does not clash with dryInsert's local (:1408). No import is added, so there is no cycle.
- No allowlist row. All new names are noun-free; arr/index.ts uses named re-exports only. api-surface reads only folder indexes (api-surface.test.ts:11-33).
- Nothing outside kernel/test imports kerbExact.ts (grep over plat/), so the shadow is absent from production.
- DEBUG_BUILD is at invariants/debug.ts:15 and imports only arena/, so there is no cycle.
- The runner's imports work: fusion/index.ts exports derive, measure and runTask and runs nothing on import (:38-41). `@plat/kernel` resolves with the plat-source condition to src/index.ts, and the bench link realpaths to packages/kernel.
- LINE 8's NO-SHIFT items. Everything X touches is pure: its only state is the PART_GROUP WeakMap of fresh parts (kerbExact.ts:29-30), and work is charged only through the transaction. So the OFF / ON SeedRecord identity cannot fail a correct build.

## 3. OPEN QUESTIONS FOR THE SESSION

- **OQ-1 — Which end rule holds where a chain ends on a way laid along the frame?** (S18 notes row 181; Q178 (b); "the
  session reads the end rule at the wiring round's binding")
  - *What the texts say.* §3.7 (ARCHITECTURE.md:5345) says only "square ends where declared". The flat T-end and the
    frame case are round S15's rule, written at kerb.ts:289-302. A corridor that meets another chain's line ends flat,
    "a cap would reach across the line it meets … into the block on its far side". Then: "An end on the level-0 content
    (the frame, a shore) keeps it too: no block lies across that line".
  - *The code* (junctionEnd :303-324) reads "the line it meets" as another chain's level-1 row on two of the end
    vertex's edges of level ≤ 1. Frame edges are included. So an end on a way laid along the frame is a junction end and
    stops flat.
  - *The oracle* (definition.ts:122-140) tests onFrame first, so it keeps the declared end.
  - *My reading.* The rule's literal trigger (another chain's L1 line) is met, and its stated frame clause speaks of
    level-0 content: that favours the code. The rule's stated *reason* (no block lies across the line) holds on the
    frame whether or not a way is laid along it: that favours the oracle. I do not rule it.
  - *Recommendation.* Rule it before 2B is specced. Until then the probe counts it as UNJUDGED 'frame-side end', which
    the corrected entry does. Then add a literal pin in whichever file the ruling makes wrong: the oracle's endsOf, or
    kerb.ts at 2B.
  - UNVERIFIED: whether CITY's two seeds hold any such end. T3's count will show it.
- **OQ-2 — A no-move BEYOND read on an UNJUDGED face: a failing line, or REPORTED?**
  - *Recommendation.* REPORTED, listed whole by class (as the corrected LINE 7 says). The arbitration needs the oracle,
    and failing on "cannot judge" would fail a correct build.
  - The corrected entry adds a VOID floor: the oracle column at a seed is VOID if fewer than half of its distinct keys
    are judged. VOID is not a pass, so a mostly-unjudged seed cannot hide behind it.
  - The session may prefer a different threshold. One half is my choice; nothing in the tree fixes it.
- **OQ-3 — Tighten the tip rule (rows 178 and 197; Q178 (d)) in this round?**
  - *Recommendation.* No. This round moves the relation verbatim, and LINE 3 (iii)'s base → tree identity of the DERIVED
    lines is the proof of the move. Tightening would move the classes.
  - Leave it to M4 or 2B. T2's "NEAR (of them at a tip)" at CITY says how much rides on it.
- **OQ-4 — The library round's merged-tree replay (J765 (4)).**
  - *Recommendation.* Record its result in the ledger before the launch. The corrected LINE 3 (iii) makes the build seat
    return blocked if its base's DERIVED lines differ from row 192 and no ruling is recorded.

## 4. UNVERIFIED

- Whether TypeScript's declaration emit accepts `ReturnType<typeof censusRead>` (a module-local function) in the
  exported `ReadShadow`. `pnpm build` decides; R-22 gives the fallback.
- The token counts. They come from my Python copy of the lint's wordsOf / scanText, not from the lint.
- Whether either CITY seed has a frame-side end, a ChainProfile width or a retracing chain. This decides how much T3
  leaves UNJUDGED.
- Whether Node 24.12's V8 accepts `--no-maglev-inlining` (LINE 9's repeat run). The line already makes such a run VOID
  with its reason.
- Whether the model's stage pipeline catches a thrown stage error. kernel tx rethrows (tx.ts:547-562); the OFF = ON
  identity catches either way.
- That tsx resolves bench's `@plat/kernel` and the runner's by-path kerbExact.ts to ONE kerb.ts instance. The bench link
  realpaths to packages/kernel; LINE 7's "0 reads observed fails" floor catches a second instance.
- Whether landed.mjs accepts the evidence folder in a build-notes record's declared owns. J759 (3) Q6 rules it allowed;
  the mechanism is not read.
- The session's replay result (OQ-4), and every time estimate (nothing was run).
