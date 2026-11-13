# Round 2B-A (M0-a-09 S22): the cites to re-read when the router round and child ED's rounds have landed

The entry is `/home/user/maps-scratch/2b-v5/spec-a09-s22.json`. I read every cite on 5551a876.

Three rounds are in flight and touch files the entry cites:
- **The router round** (child DV): M0-a-05 S14 – S16. Its owns are plat/packages/kernel/src/insert/{stretch, crossings, snapRound, wedge, rewalk, insertChain, index}.ts and kernel/test/insert/.
- **M0-a-02 S4** (child ED): arena/; the role registry's `shape` row.
- **M0-a-06 S10** (child ED): tx/ and test/tx/, plus one statement each in io/compact.ts and io/decode.ts.

None of these rounds touches arr/kerb.ts, arr/kerbExact.ts, arr/bandUnion.ts, corridorUnion.ts, tileRings.ts, faces/common.ts, or the bands and testkit arr-bands test folders the entry edits.

**Cites into kernel/test/insert/step3-5/: NONE.** Round A cites no file there. The q104.test.ts reds of the red list are round 2B-B's (its SLOT 2).

## The router round (M0-a-05 S14 – S16): insert/

| file / symbol | what the entry says there | what to check after the landing |
|---|---|---|
| insert/stretch.ts `withinSegment` | Ruling (h): the thin measure's residue test decides "each vertex and edge midpoint within 2 cm of an edge not incident to it" by `withinSegment`, exact. Line 9 (2): attraction is "within attractCm (26 cm, inclusive by the door's own test, insert/stretch.ts)". | S14 LINE 6 (Q77) gives `withinSegment` (and `passesWithin`, `inInputBound`, `inFidelity`) a new helper that decides ties past 2^53 in BigInt. Check that the export keeps its name and signature, and stays inclusive at r. The entry's uses are small lattice distances, far below 2^53, so the doubles path decides them as before. If a helper is now the recommended entry point, name it in ruling (h). |
| insert/stretch.ts `chainJournal` | Line 3's evidence: the chain journal is keyed by the transaction object, so the view's journal is its own. | stretch.ts is in S14's owns. Check that `journals` is still a WeakMap keyed by the transaction object (`journals.get(tx)`). If the key changed (e.g. to the batch), line 3's view would share the batch's chain journal: pin (i) and mutant L9 then need restating. |
| insert/insertChain.ts (the door), through every B-FUZZ figure | Line 6 (A): the B-FUZZ population at seed 20261112, the base mirror against the ladder. BOUNDS: second-rung reads ≤ 9, second-rung ops ≤ 44, both refused ≤ 4 (the prototype's, on b8425a3c's door), REPORTED on excess (Q2). Line 6's Q90 classes and KEPT_DEEP count. Line 7 (2): the census lines identical, base → tree. Line 4 (i): every second-rung op against a construction-only copy, and the B-CLOSE network of closing.test.ts 'seed 20261011 draw 1109'. | S14 LINE 12 declares the router round's shift: the fifth pass makes chains the base refused commit. So the census lines, the base's refused networks, the ladder's rung counts and the KEPT_DEEP count all move from the prototype's figures. (1) Nothing in the entry pins a prototype number as FAILING; the bounds are REPORTED on excess (U-6, Q2). (2) Re-read the router round's own B-FUZZ census lines in its notes: the new base for line 6 (A) and line 7 (2). (3) Check that closing.test.ts 'seed 20261011 draw 1109' still exercises an along closing under the construction (it is Q152 group A, which the router round's LINES 10 – 11 do not judge). If it no longer does, line 4 (i) names another B-CLOSE network from the router round's closing census. |
| insert/classes.ts `insertTx`, `InsertTx` | Line 3's evidence: the construction's shell, which cannot carry the engine. | classes.ts is not in the router round's owns: no change expected. Confirm by `git diff` over the landing. |
| Q152's six (kernel/test/arr/bands) | Session, DECLARED REDS (1), and BEFORE ITS FIRST EDIT: red exactly as "the router round's landing left them". Round A does nothing to them. | S14 LINES 10 – 11 find group B's cause and judge it (hardening-s15 'network 561', closing's shrunk counterexample, restage 'N1'). Read the router round's verdict: which of the six it re-pinned, greened or left red, and with which assertion texts. Those become the "as the session's row states them" of BEFORE ITS FIRST EDIT, and the input of round 2B-B's SLOT 1. |
| the router round's new pins in kernel/test/insert/ | none cited | none |

## Child ED — M0-a-02 S4 (arena/) and M0-a-06 S10 (tx/, io/)

| file / symbol | what the entry says there | what to check after the landing |
|---|---|---|
| tx/state.ts `OpenTx` (its fields), `markOpen`, `isOpenTx`, `openTx`, `chargeTx`, `noteRow`, `emptyLog` (`TxLog`) | Line 3, the view. It is the batch spread with `level`, `work`, `warnings`, `journal`, `log`, `failed`, `closed`, `op` its own. THE KEY-LIST PIN classes every key: shared plat, key, spec, env, stageRank, keptBelow, batch, indexLog, workLimit, prepared, open; own level, work, warnings, journal, log, failed, closed, op. | S10 LINES 1, 2, 5 add `shape`-row maintenance in rewriteRows, a kernel-pin rule, and a `t.log.faces[up].changed` push. Check whether `OpenTx` or `TxLog` gained or lost a field: the key-list pin fails the build until the field is classed (that is the pin's purpose). Classify each new field: a per-batch collection is OWN, the batch frame is shared. `emptyLog()` must still build the full `TxLog`. |
| tx/tx.ts `open` (the one mint) | Line 3 (F3 of changes.md): both batch forms minted here without a `prepared` key; a spec's `prepared` is `notBuilt('M3a')`. | Check that the literal still has no `prepared` key and that the refusal stands. If S10 mints differently (a second site, or `prepared` carried), line 3's runtime half and its parenthesis change. |
| tx/relevel.ts `rewriteRows` | Line 3: the view's `dropSpurs` → `rewriteRows(view, …)` charges the VIEW's work and journals the VIEW's log; the `stageRank` stamp is undone by the rollback. | S10 LINES 1 – 2 change rewriteRows (strip `shape` rows; clear a kernel pin). Check which OpenTx fields it now reads or writes beyond `log`, `work`, `workLimit`, `key`, `stageRank`, `plat`. Any per-batch field it writes must be one the view owns, or the lay would write the batch's copy: line 3 pin (i) catches it, and the key-list pin must class the field own. |
| tx/frames.ts `mark`, `undoTo` (the batch's frames; the index half cuts the batch log) | Lines 3 and 4: the lay's and the rungs' savepoints are frames on the batch's stack, undone by the batch's undo. | Check that the signatures still take a `Framed` with `batch`, and that undo still restores the index batch log. |
| tx/savepoint.ts (generation tokens) and io/decode.ts `decodeArena`'s rebuild (ONE statement: the copy takes a negative generation token) | Line 4 (i) (U-2): the copy of the arena before rung 1 is made by encodeArena → decodeArena, and compared by its ENCODED BYTES. Bit-identity before each rung is asserted on the ORIGINAL (`bits(p)`, `state(p)`). | The copy now carries a negative, process-local generation (S10 LINE 3). It is "never in a record, print, digest, persisted value or golden", so the encoded-bytes comparison is unaffected. Check that tx/support.ts's `state(p)` does not read the generation in a way that differs between the two calls on the original (it should not: the original's generation does not change across an undo). |
| io/compact.ts `compactSlots` (ONE statement) | not cited | none |
| arena/ (M0-a-02 S4: the role registry gains `shape`; every encoded chunk's bytes move — its LINE 4) | Line 7: NO-SHIFT, base mirror against tree, byte for byte (roots, report.json, SeedRecords, encoded arenas). Line 4 (i): encoded-bytes equality of a copy with its original. Line 3: the lay reads `faceWalk`, `isFaceLive`, `idOf`, `roleIdOf`, `compareFaces`. | (1) If ED lands before round A's base mirror is made, base and tree are on the same side of the raise; if between, the SESSION re-records as the entry's SEQUENCING says ("whichever of the two lands second, the SESSION re-runs line 7's NO-SHIFT comparison on the merged tree"). (2) Check that the arena exports the lay uses keep their names. (3) A `shape` row is written only by S10's planted fixtures, never by an src path, so B-FUZZ arenas carry none: the census is unchanged by ED. Read ED's declared shift to confirm. |
| kernel/test/tx/support.ts (the frame classifier's `stack.includes('dryInsert')`) | Round A cites it in line 3's evidence only; the seam that extends the classifier is round 2B-B's (S23). | S10 may edit test/tx/support.ts (its owns). Re-read the classifier's predicate before round 2B-B's seam is written. Round A is unaffected: it serves the construction, whose frames carry `dryInsert`. |

## Summary

**Must check (the entry's text may need a word):**
- `chainJournal`'s key (router);
- `withinSegment`'s name and inclusiveness (router);
- the B-CLOSE network of line 4 (i) (router);
- the six's state after the router round (router);
- `OpenTx` / `TxLog` fields, `open`'s literal and rewriteRows' reads (ED).

**Expected to move with no change to the text:** every B-FUZZ figure (REPORTED bounds, keyed to the build's own run).

**Expected unaffected:** the decoded copy's generation; arena export names.
