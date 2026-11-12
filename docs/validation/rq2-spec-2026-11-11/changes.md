# Changes from the v1 entries to the bound entries (J776's final rulings and the adversarial review)

The v1 entries are kept as spec-a02-s4.v1.json, spec-a06-s10.v1.json and spec-a05-s15.v1.json. The bound entries are
spec-a02-s4.json (4 lines), spec-a06-s10.json (7 lines) and spec-a05-s15.json (6 lines). Abbreviations: "Rn" is a
ruling in rulings-final.md (J776); "Fn" is a finding in review/review.md; "FU" is the review's 'Follow-up'. Every entry
keeps its id, `from` and `round`; no open-question marker and no model name is left (checked by script).

## All three entries (the `session` clause)

| change | implements |
|---|---|
| The rulings paragraph now names J757 AND J776 as binding. It points to docs/validation/rq2-spec-2026-11-11/rulings-final.md and states that J776 replaces the provisional rulings and overrules the draft. | coordinator; R1–R17 |
| New sentence: the spec took its adversarial review, docs/validation/rq2-spec-2026-11-11/review/review.md (F1–F20, numbered changes, Follow-up). Its probes are named as evidence that may be re-run in a mirror; they use a `junction` proxy. | coordinator; J631 (2) (a) |
| RQ2's design sentence stays binding. Its code consequence (applyLanding / ownShapeVertex) is set aside. | R1 |
| One definition of "other": an edge row whose entity is not e. A river's shore and bank count as one entity. | rulings preamble; FU 3; F20 |
| The gate now also waits for the measured list to be final. | R15 |
| The MEASURED LIST placeholder is rewritten: it binds only after each red unit is re-run on the unchanged tree and labelled THE RAISE, THE STRENGTH or THE HEAD. The known units to label are listed, including the two new red units. Only THE RAISE reds are declared reds. | R15; F11 |
| New paragraph WHAT GOES TO THE QUEUE AND IS NOT THIS ROUND'S. Items (i)–(viii): the F8 stretch end and rekey cut; the reverse order; three coincident chains; R17 (a) and (b); R12's message cause; splitThrough's `row`; the converse oracle as a kernel invariant; R8's VertexSig notes row. A seat reports these and builds nothing for them. | rulings 'What goes to the queue'; R6, R8, R12, R17 |
| The draft.md (f) references are removed. | coordinator |

## Leg 1 — spec-a02-s4.json

| line | change | implements |
|---|---|---|
| clause | R17's reading is stated: the version-1 pin is the byte format's reading, never a promise that an old cache is current. The ARCHITECTURE amendment is written by the session before the launch. Q76 is pointed at J757 R10. | R17; F10; rulings 'The design text' |
| LINE 1 | the (f) 13 open marker becomes "J776 R7: not indexed; rank 56 = id; since 2". the (f) 4 open marker becomes R17's reading: the test's title and comment say it is the format's reading, and the `since` check and old-cache use go to the queue. Evidence gains R7, R17, F10 and review §4. | R7; R17; F10 |
| LINE 4 | Made R15-conditional. The line text names the labelling. The required change reproduces THE RAISE reds and declares them; reds labelled THE STRENGTH or THE HEAD are reproduced as labelled and never re-pinned. Evidence gains F11's two new units. | R15; F11 |
| LINES 2–3 | Unchanged. | — |

## Leg 2 — spec-a06-s10.json

| line | change | implements |
|---|---|---|
| clause | Rows are planted INSIDE a committed batch, at the chain's level and entity, and stripped only through the writers. Every pin is marked red-on-base or regression; "the base" is leg 1's tree. The contract readings are R3, R4, R6 and R12. The order of work is updated. The LIST gains R12's stale docs. R13's note that a fourth leg was weighed and not taken is added. | F12; R3, R4, R6, R12, R13 |
| LINE 1 | REWRITTEN as one maintenance rule, M1–M4, replacing the per-path strip, the StretchRef end rule, (f) 8 and ruling B. Where it runs: in `rewriteRows` after rule 3 (b) and before (c); and at the commit (after `t.op = 'commit'`, before `sweepVertexRows`) over the log's `unflagged` and `moved`. The log's `unflagged` hook takes M3's flag clear. | R3; F1; F2; F8 (scope); FU 1–3 |
| LINE 1 pins | Red on the base: (a) C removed; (b) A removed while C lives equals C alone at C's placed points; (c) D crossing at v, A removed, then D or C removed equals the remaining chain alone; (d) a stretch through v; (e) a stretch ENDING at v strips the row (STRIP-ENDS is now required behaviour); (f) the rekey cut; (l) a warp that clears v's flag strips the row at commit. Regression: (g) one role of a two-row entity; (h) a rider removed; (i) a third chain attached and removed; (j) clearFiner; (k) rekey of the interior. | coordinator list; F1, F2, F12; FU (b′), (c1); review §2, §5 |
| LINE 1 mutants | MAINT-OFF, FLAG-KEEP, M3-ANYDEG (red on (c), C removed), M4-STRIP (red on (c), D removed), HOOK-OFF, ENTITY-STRIP. KEEP-ENDS is covered by MAINT-OFF on (e). CF-KEEP and RK-SKIP are stated as equivalent under M1, killed only together with MAINT-OFF. The draft's STRIP-OFF, STRIP-STRETCH-OFF, SH-DISS and STRIP-ENDS are retired: STRIP-ENDS is now the behaviour. | coordinator; FU (c1); F1 |
| LINE 1 fixture | Coordinates and the CONFIRMED landing are cited from review p1-straight.log. | F12; p1 |
| LINE 2 | PIN-SHAPE2 is restated per R4: a pinned vertex carrying ONLY (shape, C), the row stripped through clearFiner (the door that puts it in the pin rule's strip set), pin kept, red on the base. PIN-SHAPE is kept and marked red on the base. The mutant is renamed SHAPE-FEATURE. | R4; F6 |
| LINE 3 | R12 is folded in: restores keep +1; copies and a restore on a copy take negative process-wide tokens; the value is opaque and process-local. The message is pinned by the pattern `/restore generation -\d+/`. G-LATE's pin is `levelDigestBuilds(q) === 1` after a read and after the first commit. The attachIndex clause is dropped. The load case's P16 is at version 0. LISTED: the Stamp doc, the facade/stamp.ts header, the decodeArena doc, and the messages' wrong cause. | R12; F4; F5; review §3 (p3) |
| LINE 4 | The oracle wraps randomBatch's `fn` before the commit. The contract sentence is scoped to the writers the oracle covers. p4 is cited. | R14; F18; p4 |
| LINE 5 | DUP is replaced by OVER-LIST. The oracle runs after every commit of M0-d-04's fuzz sequences (fuzzgen reused), with B-1 as the named case. p5's 4/29 is cited. An equivalence escape for OVER-LIST is added (see 'Could not be folded'). | R14; F7; p5 |
| LINE 6 (new) | removeEdges' VertexRef refuses `shape` (REF-SHAPE). No retypeEdges `add` check: it already refuses vertex roles. | R6; F14 |
| LINE 7 (was 6) | Renumbered. The reds are the measured list's THE RAISE entries plus the head's declared reds. | R15 |

## Leg 3 — spec-a05-s15.json

| line | change | implements |
|---|---|---|
| clause | The write is at the chain's commit, never at the landing. A first check on S14's head: if an ok `run` can be rolled back, the write's inverse goes into `ctx.undo`. W is followed exactly. MAINT-OFF is run in this leg's mirror only. The order of work notes the converse oracle's idle start. The RESUME head is S14's LANDED head, and P3 and the straight fixture are re-checked there. | R1; R2; F16; review §8 (4), (5) |
| LINE 1 | REWRITTEN to W of R2: per landed point and per own entity e; VERTEX_SPLIT, pinned or not; e on exactly two edges; some f ≠ e on both; no degree test; no identical-sets test. One row per entity (R5). | R2; R5; F13; F19; F20; FU (a) |
| LINE 1 pins | (a) the straight fixture (W-OFF); (b) the `coincident-foldback` register kind, P3 first, the straight form as fallback; (c) the existing split vertex, then B removed, equals A + C never-B (DEG2-ONLY); (d) the rider at commit (IDENT-SETS); (e) the join / leave control (a ring's seam on A) and (f) the T-junction control (W-ANY restated); (g) two entities (W-FIRST) and one entity with two roles (KEY-OTHER); (h) the RQ3 control: identical copies add nothing, only a copy with an extra point can write. LAND-WRITE is added as a mutant. | coordinator list; F17; F19; F20; FU (b′); p1, p2, p7 |
| LINE 2 | Both oracles, worded as ruled. R9: the missing-row oracle, exempting only vertices whose vertex rows are all `shape`; a vertex that is not a landed point is REPORTED. R10: the converse oracle with the NOT (degree 2 and no other row) clause. Mutants R9-OLD, R9-ANY, R10-OFF, R10-M3. | R9; R10; F15; FU (d) |
| LINE 3 | pass4 kept. "Two-key own points" now means "points W writes". Removal is WHOLE (F8 scope). | R2; F8 scope |
| LINE 4 | Kept. removeEdges' VertexRef is now named as leg 2's. | R6 |
| LINE 5 (new) | The generator kind `coincident-interior` with the full op list, both oracles after every commit, counted in bfuzz's kinds check. W-OFF and MAINT-OFF are MEASURED red with the first failing case. | R11; F3; p4 |
| LINE 6 (was 5) | (a) The CITY seeds are derived with both oracles; every class vertex without a row is named and explained (an unexplained one fails); every moved root is named by seed. The seeds named are at least the counting probes' five derivations plus the root runs. The counting probes are cited as estimates. | R16; F9 |

## Design text (draft-v2.md)

| item | change | implements |
|---|---|---|
| (c) 1 | Adds "passes once … whatever its degree", the keep / strip rule, and "the row is stripped and the flag cleared: the vertex is the chain's own shape vertex". Scope: a chain inserted onto another's run, removed whole or by a stretch through the point. | rulings 'The design text'; R2; R3; F8; review §7 C1 |
| (c) 2 | "other than knot rows and `shape` rows". | R4 |
| (c) 3 | "kept or stripped by every batch"; not indexed; version 2. | R2; R3; R7 |
| (c) 4 | Names the strip doors: the re-levelling of removeEdges, clearFiner and retypeEdges, and the commit of a flag-clearing batch. | rulings 'The design text'; F18 |
| (c) 5 | Rewritten: the shape row is "kept or stripped by §2.2 rule 3", not stripped with the interior knots. | R3 |
| (c) 6 | Adds "fresh, process-local restore generation compared by equality only". | R12; F5 |
| (c) 7, (c) 8 | Scoped to the writers the pins cover. | R14; F18 |
| (c) 9 | Adds R17's "the byte format's reading, not a promise …". | R17; F10 |

## Could not be folded (or folded with a stated doubt)

1. **OVER-LIST may be equivalent.**
   - Why: in tx/relevel.ts `facePass`, a record's `children` are saved with `parent === f` before any write (:440-444). The re-parent loop (:1025) runs before any finer level's write, so by reading I found no live child of a freed record that keeps its parent at that loop.
   - Why the extra entry is absorbed: a dead or reused child slot is classified by liveness in tx.ts `dirtyFaces`, which absorbs the extra push.
   - What I did: folded as R14 rules, with an escape. The builder either kills OVER-LIST on a constructed case or states it equivalent with the proof, and F2-OFF stays the line's mutant.
   - Not verified by running.
2. **R3's commit hook names only `unflagged`.** warp/warp.ts `commitStep` clears a moved free vertex's flag (:443-449) and logs it in `moved`, not `unflagged`. I folded the hook to read `moved` too, filtered to vertices carrying a `shape` row and no flag. This extends R3's letter, for its stated intent ("every vertex whose split flag the batch cleared"). The session should confirm.
3. **R3's place inside `rewriteRows`.** R3 says "before the dissolution step". The entry says "after rule 3 (b), before (c)". Reason: step (c) reads vertex rows for the level and keeps a vertex live while a row is on it (relevel.ts :660-695), so a row stripped after (c) could leave an isolated live vertex. This is a refinement, not a contradiction; the session should confirm.
4. **An insert can push e's rows onto a third edge at v without any maintenance run.**
   - Gap: a later insertChain of the same entity adds an edge at v. The review's FU (c3) note asked for "any batch that adds rows of e at v". R3 does not include it, and insertChain does not call rewriteRows. Linear roles are refused by role consistency; shore, bank, margin and border ("any") are not.
   - What I did: not folded. R10's oracle would report such a row. This needs a ruling: route it to the queue, or extend the commit hook to vertices whose row set an insert changed.
   - retypeEdges' `add` IS covered, because it goes through rewriteRows.
5. **PIN-SHAPE2's door.**
   - Constraint: R6 refuses removeEdges(VertexRef('shape')), and R3's maintenance strips after the pin step. So the only writer that puts a `shape` row into the pin rule's strip set is clearFiner. rekey re-adds the row, so `left` stays true.
   - Unverified: whether a pinned own point of C (opts.pinned) inside C's own L2 faces can be cleared by clearFiner while its pin stands.
   - If it cannot: PIN-SHAPE2 has no writer path, and R4's exclusion is observable only through PIN-SHAPE.
6. **R16's seed set is unnamed.** I named the counting probes' five derivations and the root runs as a floor. The session names the rest at launch.
7. **The rider pin (h) depends on the planted row's level.** Review FU (b′) used R at L2 over A and C at L1. The planted (shape, C) row must be at C's level (L1) for today's E_INVARIANT refusal not to fire. The entry says so through F12's level rule, but not in (h) itself.
