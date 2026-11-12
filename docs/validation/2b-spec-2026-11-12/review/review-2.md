# Round 2B, second pass — the lay-planned read P′ (`rulings-after-measurement.md`) attacked

Review seat, 2026-11-12, after the scratch measurement. Read: `docs/validation/2b-spec-2026-11-12/` (`rulings-after-review.md`,
`rulings-after-measurement.md`, `measurement/step1-sanity.md`, `step3-s9.md`, `step3-r8.md`, `step4-bfuzz.md`, `step5-xxu.md`,
`step6-cost.md`, `step8-pprime.md`, `p.diff`, `pprime-full.diff`). I did not run anything in the prototype's mirrors. My own
probes are beside this file: `probe-tokens2.mjs` / `probe-tokens2.log` (the lint's own `scanText` on bandUnion.ts and on the
imports a P′ wiring adds to kerb.ts). Everything else below is read from the code at the design head b8425a3c and from the
patch. Each claim is labelled **CONFIRMED** (executed, or the code path read by me) or **PLAUSIBLE** (reasoned).

The measurement itself is good work and settles what my first pass left open: P fails the hard bar through needles
(my R-5 and R-8, measured), and the door's lay of X gives the plan back. My attack is on what P′ inherits from P, on the
prototype's read-back, and on the claim that "no contract changes".

## Findings

| id | sev | finding | evidence | what I would change |
|---|---|---|---|---|
| S-1 | BLOCKER | **P′'s S9 IS P's S9, so the B-FUZZ refusal rise that refused P is P′'s too, and the proposed bar "the commit refusal census never rising" fails by the measurement's own figures.** The patch leaves `readKerb` = X, so `corridorUnion` / `bandUnion` commit X exactly as under P ("S9 commits X exactly as under P", step 8). Step 4 measured that commit: corridorUnion's 'replays' 5 → 15 and bandUnion's 1 → 29 — "insert: no route from … keeps clearance (§3.10) within the fidelity bound (N-43)". P′'s B-FUZZ run is "to be measured", yet the ruling says P′ has "no refusal". The kerb row's lay will meet the same door on the same outlines, so it should gain lay refusals where P had none. | CONFIRMED: `pprime-full.diff` (kerb() alone switched; `readKerb` X); `step4-bfuzz.md` (the per-class table); `step8-pprime.md` (c) (CITY only). PLAUSIBLE: the kerb row's lay refusals. | Run B-FUZZ under P′ before the ruling binds. If the 'replays' rise stands, rule the remedy BEFORE the launch: either the outline handed to the door is X brought to the arena's resolution first (vertices nearer than minEdge merged, parts thinner than attractCm folded, by a stated pure rule), or the round declares a new lawful class. A fix round is the wrong place for this. |
| S-2 | MAJOR | **The prototype's read-back serves X, not the commit, on a `whole` face.** `readBack` classes a face with no L2 record inside it as `whole` when its interior point lies in the kerb. The commit's block is then F itself (its own child). The lay returns `r.value.kerb`, which is X with its splices. Where X ≠ F, the plan and the commit then differ: every outline piece collapsed (E_DEGENERATE empty), or a sliver folded while the interior point stays in X. That difference is thin, so it passes `beyond` and hides inside the 0.998. | CONFIRMED: `bandUnion.ts` `readBack` :883-891 (`kids.length === 0` → `insideKerb(…, false)` → `whole`), BandResult doc :96-102; patch `layRead` (`if (res.value.whole.includes(face)) for (const q of r.value.kerb) …`). | For `whole`, read back F's own rings at L2 (its own child). Pin a face whose outline collapses wholly. |
| S-3 | MAJOR | **The prototype's lay refuses on any face without an owner, and `kerb()` is a general §3.4 service.** It takes the outline rows' entity from F's owner, else "lay: the face has no owner". M0-a-06's `savepoint.test.ts` reads `kerb(o, f, widths)` before `setOwner` on an unowned face (:470-473). The façade's `k.geom.kerb` and the testkit's kerb primitive read arbitrary faces. | CONFIRMED: patch `layRead` (`entity === null ? err(… 'no owner')`); `kernel/test/tx/savepoint.test.ts` :464-485; `testkit/src/invariants/primitives.ts` :596-606. | The dry lay's rows carry a placeholder entity; nothing of them survives the rollback. |
| S-4 | MAJOR | **"Nothing left behind" was checked on arena bits and state only; the prototype's copy-and-restore hides five other things.** (a) `{ ...t, level: 2 }` shares `work`, `warnings`, `journal`, `log` and `batch` by reference, so the lay charges S8's batch. The hand restore masks the charge, and while the lay runs it consumes the batch's headroom: a lay near the batch's limit refuses E_WORK_LIMIT with a cause that depends on S8's history. (b) `failed` and `closed` are per-copy scalars. (c) `chainJournal` is keyed by the tx object, so the lay's journal is the copy's. (d) The copy stays in the open set: `isOpenTx(t2)` stays true after S8's batch closes. (e) Two diagnostics are overwritten: `CLOSINGS` (`bandClosings(p)` now returns the last lay's closings) and `CENSUS`. Also, the M0-a-06 frame observer classes the lay's frames as 'op', not 'dry-run', because its stack test looks for `dryInsert`. | CONFIRMED: `tx/state.ts` :43-77 (`OpenTx` fields), :79-84 (`markOpen`, the open set); `faces/common.ts` `opSave` / `rollback` :459-527 (no work or `failed` restored); `insert/stretch.ts` :116 (`chainJournal` by tx); `bandUnion.ts` :625 (`CLOSINGS.set`); `kernel/test/tx/support.ts` :386. | The kernel form (section B). The "nothing left behind" bar compares, before and after a lay: bits, state, the batch's work, warnings, journal, log and `failed`; `bandClosings(p)`; `kerbCensus(p)`; the open set. |
| S-5 | MAJOR | **"No contract changes" is not right.** P′ keeps §3.7's, §4.6's and §13.2's sentences under the SAME reading as today: N-52 (1)'s bound plus the ratchet. The measured maxima (3.61 and 2.15 cm, shares 0.998 / 0.999) are not literally "Hausdorff 0", and "the same function on the same inputs" holds only where the arena beside the face is the same at both times. But it REVERSES the owner-held item 991 (b) / 986 (d). That ruling reads: "kerb(F) is §3.7's definition computed exactly … the construction's arena-attracted read being its oracle"; "S8 plans on the exact kerb, S9 commits it through the door". Under P′, S8 plans on the attracted lay and the exact X is the oracle: the reverse. 986 (c) (kept state, derived children) and 986 (e) (1)–(3) and (5) are not met or are moot. | CONFIRMED: AMENDMENTS-2026-10-28z.md :37 (986 (d)), :39 (986 (e)), :118 (991 (b)); `step8-pprime.md` (a) maxima. | An amendment item that withdraws 986 (c) and (e) (1)–(3), restates (5), and replaces 991 (b)'s first clause. The owner is told in plain words that the ruling the owner accepted is reversed, not kept (section C). |
| S-6 | MAJOR | **P′ reads L2 content, so "kerb is a function of the arena" holds only as it did for the construction, and the M1 pool inherits an ordering requirement.** Within one S9 batch, face B's commit meets face A's just-laid L2 work. That work includes vertices pinned on a shared spine-less L1 edge, along-closings, and tips left across F's boundary for another face to reach (`openEnds`). Across districts, a later district's commit meets an earlier one's L2 kerb at the shared seam. S8's lay sees none of this: in the measured runs L2 is empty at S8 time. The two non-exact blocks at CITY are most likely such contacts on a seam or shared edge: a few cm, matching 3.61 and 2.15 cm. Today's construction has the same dependence; its own comment lists "an earlier batch's kerb" as an attractor. | CONFIRMED code paths: `bandUnion.ts` `writeOutlines` :628-697 (all faces read, then laid in order), :715-721 (cross-face tips); `pinContact` :324-336; `measure.ts` `s8s9` :563-595 (all L1 reads before any district's S9). PLAUSIBLE: the two blocks' cause. | Pins: (i) at M0, no L2 record within attractCm of any lay's outline at S8 time (a CITY count, FAILING 0); (ii) a lay on a decoded copy of an arena that holds L2 content equals the lay on the original, and on a slot-renumbered one (extend `representation.test.ts` to `kerb()`); (iii) a two-district seam fixture showing the order dependence, and a queue row for M1: all of a district's S8 lays before any neighbour's S9 on a shared seam, or the dependence declared. |
| S-7 | MAJOR | **A lay refuses in different places from the commit, in both directions, and S8 hides it.** The solo lay sees no other face. A tip left across F's boundary that another face's piece reaches at commit therefore makes the solo lay refuse ('dangling tip') or fold a piece. A commit can also refuse for cross-face reasons the lay never sees. S8 turns a refused `kerb()` into an 'unresolved' block (`rungs.push({ rung: 'unresolved', outcome: 'block' })`), not a refused district, so "S8 refused districts 0" cannot see a plan-time refusal. | CONFIRMED: `bandUnion.ts` :687-696, :715-721; `layout/src/infill/bentCutFabric.ts` :1373-1375. | Count kerb-caused 'unresolved' rungs per seed (FAILING: never above the base). Count faces whose lay refuses while the district commit succeeds, and the reverse (REPORTED; each one listed). |
| S-8 | MAJOR | **The proposed S8 ≡ S9 bars cannot see a wrong read-back.** Both sides are now the door's lay, which is DESIGN-8 again. The harness finds S9's face by the block's seed, whatever face that is. If the lay read back BAND faces as blocks, the seed would sit in the same band face of the commit, and `beyond` 0 and the share would both pass. The oracle judges X, not the lay. | CONFIRMED: `measure.ts` `s8s9` :617-627 (`pointLocate(…, 2, seed)`; no check that the face is a block). | A FAILING bar on the lay against X: every piece of their difference thinner than attractCm (step 8's "thin" test: 546/546 and 825/825 at CITY), with necks (a lobe moved whole) listed. Add a pin that every face `kerb()` returns is a `BandResult.blocks` face or F itself. |
| S-9 | MAJOR | **The lay computes X twice.** `layRead` calls `readKerb` (X), then `bandCore` → `writeOutlines` → `readOn` → `readKerb` again. That is about 3.4 ms of the lay's 11.8 ms on step 6's split. `offRead`, if it fires, adds a third. | CONFIRMED: patch `layRead`; `bandUnion.ts` :628-632, :584-586. | Hand the lay its read (the engine takes the `KerbRead`). Pin one X per lay read (the count). |
| S-10 | MAJOR | **P′ needs a kernel-boundary row whatever the wiring.** `kerb()` must reach the engine. kerb.ts has only `kerb` rows. bandUnion.ts sits exactly at its caps (ident kerb 14, string kerb 6, band 28/12, block 5, corridor 2). Importing from './bandUnion.js' adds a `band` string to kerb.ts, or a `corridor` string via corridorUnion.ts: a new row either way. Passing `edgeRole: 'kerb'` from kerb.ts adds a ninth `kerb` string. The import also makes a kerb.ts ↔ bandUnion.ts cycle (benign at runtime: neither module's top level calls the other). W2's "no cycle, rows only shrink" no longer holds. A side-effect registration is no remedy: with `"sideEffects": false` a bundle that never uses `bandUnion` (S8's) drops the module, and `kerb()` would silently fall back to X. | CONFIRMED: `probe-tokens2.log`; the allowlist rows; `packages/kernel/package.json` :8. | Rule the row before the launch (the session's seam). Smallest: `import { layFace } from './bandUnion.js'` (kerb.ts string `band` 1, a new row), with the outline role chosen inside bandUnion.ts from an existing constant. Pin that a production bundle calls the lay. |
| S-11 | MINOR | `offRead` stays vacuous: S9's own reads, and the reads inside the lay's engine, are X (L2-free). My R-3 holds under P′. | CONFIRMED (as R-3; the patch leaves `readKerb` = X). | Retire it as ruled. |
| S-12 | MINOR | The measured lay-vs-X table makes the kerb S8 plans on differ from the definition by needle lengths on 20–26 % of reads (p95 173–180 cm, every difference thin). That is by design, but no line states it, and §3.7's text must. | CONFIRMED: `step8-pprime.md` (b). | Say it in the amendment item (section C). |
| S-13 | MINOR | The NECK class (step 3: a lobe of X behind a neck thinner than attractCm, up to 126 m²). The lay closes it, as the construction did, so S8 now sees two block components and the smaller one gets no seed: Q102's seedless-part class, as today, not a regression. | CONFIRMED: `step3-s9.md` (the non-thin beyond blocks); `bentCutFabric.ts` `kerbComponent` / `kerbSeed`. | Report seedless kerb parts per seed, base → tree. |
| S-14 | MINOR | A memo is unsound for the lay (it depends on L2 content and on neighbours). Only X could be memoised. | PLAUSIBLE. | Line 8 says so. |

## A. Is P′ a sound read?

**(1) What it depends on.** The lay is `bandCore(t2, [face], …)` at L2 inside S8's L1 batch (patch). Two equal L1 states give
two different P′ kerbs wherever the L2 content beside F differs:
- *another district's committed L2 kerb* within attractCm of F's outline or contacts. This happens on a seam (a zero-width
  shared boundary), where both districts' contacts stand at the same band-edge crossings and the first commit's pinned
  Steiner vertices attract the second. The construction has the same dependence (its dry run is laid at L2,
  `dryLevel`, and its comment names "an earlier batch's kerb").
- *the order S9 commits faces of one district*: S9 lays all of a district's faces in one batch in canonical face order.
  The lay sees F alone. B's commit meets A's work: Steiner vertices on shared spine-less edges, along-closings, tips across
  a face boundary that another face's piece reaches. The construction read one face at a time too, so it had the same
  mismatch.
- *an L2 edge of an earlier batch inside F*: kept content. A lay that comes within attractCm of it refuses E_KEPT. At M0
  nothing is inside F at S8 time; on an edit's re-derivation at M1 it is whatever `rederivesFrom` leaves. The construction
  refused the same way.
- *slot numbering*: `readBack` collects the faces inside F by walking slots (`for (let c = 0; c < top; …)`, :868-872), but
  its outputs are sorted by `compareFaces` and the lay sorts its rings by `compareRings`. The engine's slot-freedom is the
  door's claim (§3.3), tested by `representation.test.ts` for `corridorUnion`, not yet for `kerb()`. PLAUSIBLE that it holds.
So P′ is "a function of the arena" in the sense the construction was, not in P's stronger sense. To make S8 ≡ S9 hold across
a save and load and across planning orders, pin S-6 (i)–(iii). The three sentences J742 names stand as they stood for the
construction, provided M1's pool keeps all of a district's S8 lays before any neighbour's S9 on a shared seam. That is a
requirement on M1, to be written as a queue row now.

**(2) The undone lay.** See S-4. The arena is restored by `rollback` (the undo log; the index's state is in `state(p)`).
The prototype's check would not see the batch's work (restored by hand, which masks the charge), the copy's `failed` and
`closed`, its private chain journal, its lingering open-set membership, the overwritten `CLOSINGS` and `CENSUS`, the frame
classes M0-a-06's pins read, or a lay that refuses because S8's batch is near its work limit.

**(3) Is the planned block exactly the committed block?** Where the arena beside F is the same and F's commit has no
cross-face interaction: yes, by construction. Where they differ although nothing changed between: the `whole` read-back
(S-2, a prototype defect), and the cross-face interplay inside one S9 batch (S-6). Multi-component kerbs, holes and the
largest-component rule carry over unchanged: `blocks` are L2 faces walked with their hole rings, and `kerbComponent` takes
the largest outer ring. The splits bound band faces only. My reading of the 2 of 1 235 is a contact on a shared seam or
edge pinned by an earlier commit: a few cm, which matches 3.61 / 2.15 cm (PLAUSIBLE). A `whole` face whose X ≠ F is the
other candidate.

**(4) Refusals.** A lay refusal is now a plan-time 'unresolved' block (S-7), not a district refusal. That is lawful only if
the commit would refuse too. Where the solo lay refuses and the district commit would not (cross-face rescue), it is worse
than today: a block S8 could have cut is left uncut, and nothing counts it. It is better where the commit would refuse
anyway, since the cause is seen at plan time. The census must count both directions.

## B. The kernel form

Shape: the construction's shell kept, its work replaced.
- **Survives:** `dryRun` / `dryClose` (an `insertTx` shell at `dryLevel` with its own work, warnings, chain journal and work
  limit, under the batch's `opSave`). The savepoint discipline. `readFace`, `splitsOn`, and the fold of X (W2).
- **Goes:** `dryInsert`, `dryRegion`, `censusRead`, `restagedRead`, `readOn` (kerb.ts's), the faithful read, `readQuality`,
  `stepped` / `steppedAt` / `sharedPath` / `coincident` / `keptDeep` / `clipWindow`: the parts' insertion and labelling, most
  of kerb.ts's 2 600 lines. `constructionRead` stays one round as the debug control, as ruled.
- **New:** the engine (`writeOutlines` → `dropSpurs` → `readBack`) parameterised by its writer, so that the insertions go to
  the shell at L2 while the savepoints are the batch's. It takes the face's `KerbRead` rather than reading again (S-9), uses
  a placeholder outline entity (S-3), does not touch `CLOSINGS` or `CENSUS` when called for a read, and reads back F itself
  for `whole` (S-2). `markOpen` on a copy must not survive. If the shell cannot carry `opSave` / `planSplitThrough` /
  `applySplitPlan` as typed, the kernel needs an "L2 view of an L1 transaction" in tx/. That is M0-a-06's directory, so it
  would be a leg, not a seam.
- **The API freeze:** `kerb()`'s signature and result type are unchanged, and `KerbRead` is unchanged. `kerb()` now
  returns the lay; `readKerb().kerb` returns X. Two kerbs in one module, so the module comment must say which serves whom.
  `kerb()`'s warnings: the lay's or none, to be stated. Its refusal codes widen (the engine's: E_INVARIANT outline, E_KEPT,
  RING_CROSSES, E_WORK_LIMIT of the shell).
- **The noun caps:** S-10. W2's fold arithmetic (20 / 8) stands, but the wiring needs one new row and brings a cycle.
- **`offRead`:** S-11. The served lay depends on L2, but `offRead` re-reads with `readKerb` (X), which does not. Retire it.

## C. The contract

Three sentences. **The architecture's sentences (§3.7 "the same function on the same inputs … one face", §4.6 and §13.2
"Hausdorff 0") and 991 (b)'s ratchet stand under P′ only in the sense N-52 (1) already reads them — within the bound, the
measured share 0.973 – 1.000 against the 0.95 floor — not literally, so the text should say "the same engine" and "one face
wherever the arena beside the face is the same at commit", and keep the share as a measured, ratcheted figure. What P′ does
change is the owner-held ruling of 991 (b) / 986 (d): the owner accepted "kerb(F) is the definition computed exactly, the
attracted read its oracle", and P′ serves the attracted lay with the exact X as its oracle — the reverse — and it leaves
986 (c) unbuilt and 986 (e) (1) – (3) unmet or moot, all of which an amendment item must withdraw or re-declare. That is
within the owner's delegation, as J618 itself was, but it must reach the owner as "the decision you accepted is reversed,
for these measured reasons", not as "no contract changes".**

GEO-9 wording, narrower than P's: "The one further exception: `kerb(F)`'s outline is computed by an exact lattice boolean
that writes no arena (§3.7). No caller receives that routine's output. Every kerb served (`kerb`, S8) or committed
(`corridorUnion`, S9) is that outline as `insertChain` lays it, and so obeys attraction, placement, minEdge and clearance like
every other chain." Add to §3.7 that the served kerb may omit parts of the definition thinner than attractCm (needles of up to
a few metres, S-12). Withdraw or re-declare in the item: 986 (c) (not built); 986 (e) (1) the 50 µs read and (2) S8 ≤ 16 ms a
cut — re-declared with item 989 (P′ measures 15.3 ms a read and 42.2 ms a cut in source mode, perhaps ≈ 23 ms a cut in prod
by S20's source-to-prod ratio, PLAUSIBLE); (3) the derived-against-construction share (moot) — replaced by the S8 ≡ S9 share;
(5) restated as "no construction in S9's reads".

## D. What the round is now

Old line → P′ round:
- **Survive:** 2 (the fold, first; its pin on the fold alone), 3 (`constructionRead` debug-only and the provider control; the
  provider now serves both `kerb()` and `readKerb`), 4 (the shadow, now judging X and the lay), 5 (X's typed refusals), 6
  (S9 commits X; `offRead` retired with the re-read pin), 7 (the frame-side end rule; the needle it makes now goes to the
  text), 9 (the bands folder and Q152's six: a shorter list), 10 (the declared shift and its control), 12 (cost).
- **Changes:** 1. The served read: `readKerb` = X for S9; `kerb()` = the lay. 8. The memo: dies, REPORTED only (S-14).
- **New:**
  - (a) the lay's kernel form (section B) with its pins S-2, S-3, S-4, S-9;
  - (b) the B-FUZZ remedy for the 'replays' rise (S-1), ruled before the launch;
  - (c) the boundary row and the cycle (S-10);
  - (d) M0-a-06's frame-class pins: the lay's frames are op frames under a different name, so `support.ts`'s stack test
    needs a tag, which is a-06's file;
  - (e) the L2-dependence pins (S-6).

Failing bars at CITY. Yours, with these additions:
- the oracle on X, with widths from the run's table and a 20 cm sample;
- **the lay against X: every difference piece thinner than attractCm** (S-8);
- S8 ≡ S9 `beyond` 0, and the share ≥ 0.95 on every seed. Keep "≥ the base's" REPORTED: a correct build can lose one block
  to the base on an unmeasured seed;
- the census: S9's refusal classes, the kerb row's lay refusals, and kerb-caused 'unresolved' rungs, never rising
  (S-1, S-7);
- an undone lay leaves bits, state, the batch's work / warnings / journal / log / `failed`, `bandClosings`, `kerbCensus` and
  the open set as they were (S-4);
- no L2 record within attractCm of any lay at S8 time (S-6);
- the deterministic cost bar: `dryInsert`, `dryRegion`, `censusRead` 0 calls and one X per lay read; the lay's insertChain per
  read REPORTED.

Where a pin could pass on a wrong build:
- S8 ≡ S9 on a read-back of the wrong faces (S-8);
- "bits and state" on a lay that charges the batch or overwrites a diagnostic (S-4);
- the provider control on any lay at all (it serves the construction);
- S8 ≡ S9 on a `whole` face served as X (S-2: thin, so within the bound);
- "0 lay refusals" on a run with no cross-face rescue in it (S-7).

One round on M0-a-09: yes for the code (kerb.ts, bandUnion.ts and the folder are its own), with the seams already ruled. Two
likely legs: M0-a-06 (the frame classifier; and a tx/ view if the shell route fails), and the B-FUZZ remedy if it touches
insert/ (M0-a-05).

## E. What I do not believe in the measurement

- **"0 refusals" for P′.** True at CITY's two seeds. False as a property: B-FUZZ was not run under P′, and its S9 is the one
  step 4 measured rising (S-1).
- **"Nothing left behind" from 0 bit / state changes.** With L2 empty, and with the batch's work restored by hand, the check
  cannot see S-4's list.
- **"orderDiffers 0" and "235 repeated keys gave the same lay".** Both were taken with L2 empty. They show determinism, not
  L2-independence (the measurement's own caveat).
- **The 0.998 / 0.999 as "by construction".** The 2 + 1 residual blocks are unexplained, and S-2 shows one way the prototype
  makes them.
- **The cost split.** Source mode, beside other runs, and the lay recomputes X (S-9). The 11.8 ms "lay" is not the lay's cost.
- **"No contract changes".** S-5.

## What I could not check

- Any run: no B-FUZZ under P′, no CITY, no lay on an arena that holds L2 content, no slot-renumbered lay.
- Which blocks the two CITY non-exact ones are.
- Whether `insertTx`'s shell can carry `bandCore`'s savepoint and split-plan calls without a tx/ change (typed against
  `OpenTx` in faces/ and against `InsertTx` in insert/: I read the signatures, not every call).
- How M0-a-05 S14 changes the door's 'replays' class.
