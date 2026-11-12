# Round 2B (the ladder) — open questions for the session and the reviewer's fourth pass (2026-11-12)

This file lists each choice the rulings leave me, and each place where I think a ruling is wrong or cannot stand as
written. Every entry gives a recommendation. The two entries mark these with [OPEN: open-questions.md Qn].

**Q1 — How the rung is reported (ruling 2 (a)).**
- **Recommend:**
  - `BandResult.rung: 1 | 2`. It is an additive readonly member of an exported result record. API.md Appendix B lists
    names only, so kernel/test/num/api-surface.test.ts stays green; the façade passes the member through.
  - `LastRead.rung: 1 | 2` for a read, through `kerbCensus(p)`. `kerb()`'s result (`KernelResult<Ring[]>`) has no record
    to carry a member.
- **Alternatives:**
  - A new warning code on a rung-2 result. Rejected: WarningCode is num/'s union (another item's file), and a stage
    would read it as an insertion warning.
  - A by-path counter per arena (`rungCounts(p)`). It is useful beside the members, but it is not part of a result, and
    the ruling asks for a result.
- Round A adds no member (NO-SHIFT): its ladders keep the rung internal.

**Q2 — Round A's B-FUZZ rung counts: literals or bounds.**
- **Recommend both, in order.**
  - FAILING bounds: reads on rung 2 ≤ 9, ops on rung 2 ≤ 44, ops refused on both rungs ≤ 4, and the rung-2 reads and ops
    each > 0, so that the second rung is reached at all.
  - Then the build's OWN values, pinned as literals in the runner's test.
- **Why not step 11's numbers as literals:**
  - They are a prototype's. Its lay shared the batch's journals, restored work by hand and switched reads with a module
    flag, and its counts include bfuzz's replays of refused cases. A correct build that differs in one replay would fail
    a borrowed literal.
  - A bound fails only in the direction that matters. The literal then catches every later change: round B re-pins it
    under the served ladder, since B-FUZZ runs ops directly and S8 does not move it.

**Q3 — The mixed-face literal (ruling 2 (c)).**
- The prototype counted 44 + 2 = 46 mixed faces, over the 46 networks that P or the lay refused. Those networks hold
  every rung-2 read and every corridorUnion rung-2 op, so the population count is plausibly also 46. **Recommend** that
  round A re-make it population-wide and pin the build's count; 46 is the expected value, not the literal.
- The bar is restricted to faces committed by `corridorUnion`. A `bandUnion` commit has its own widths, owner and
  `vertexContacts` false, so `kerb()` is not its read; step 11 §3 also measured corridorUnion only.
- **Ruling 2 (c) says "every face of every network"; I recommend it reads "every face committed by corridorUnion".**

**Q4 — Does a lay's own E_WORK_LIMIT fall to rung 2?**
- Ruling 4 concerns the BATCH's work-limit exit, where the batch is doomed. A lay's limit is the view's, and the batch
  is untouched. **Recommend: yes, it falls to rung 2,** like any other lay refusal. Rung 2 (the construction's shell) has
  no limit at all, as on the base.
- **Alternative:** the read refuses E_WORK_LIMIT. Rejected: that would make S8 mark an 'unresolved' block where the base
  read the face.

**Q5 — Rung 1's work on a commit that falls to rung 2.**
- `rollback` does not restore `work`, so rung 1's work stays charged to the batch, and a district near its limit could
  refuse on rung 2 where the base committed.
- **Recommend:** charge it (the work was done) and REPORT it (S22 line 10). S9 is not a registered stage at M0, so no
  registered limit exists to break. At M1 the S9 work law must cover both rungs: a note on item 989's re-declaration.
- **Alternative:** run rung 1 of a commit on a view too. Rejected: rung 1 is a real commit that usually succeeds.

**Q6 — "Every harness seed M0 registers" (ruling 2 (b)).**
- The six seeds of step 11 (the four test-size seeds, plus fusion 3 and integrated 4 at CITY) can be run inside round B.
  The fusion gate's 1 000-seed summary (M0-c-06's) cannot; it is the session's run after the landing (J742 R-E Q6).
- **Recommend:** FAILING at the six in round B. The 1 000-seed run counts reads and ops by rung as a FAILING item of
  that post-landing run, plus a queue row for M0-c-06's summary.
- If the ruling means all 1 000 inside the round, the round cannot close in one check.

**Q7 — Ruling 2 (c) is unmeasured population-wide, and same-rung faces exceed the bound too.**
- Step 11 §3 measured read-against-commit only over the 46 networks.
- The rung-2 / rung-2 face 3 of the widened dangling-tip network already differs by 1 252 cm, thin: the construction's
  lone read against the construction's commit, i.e. the base's own behaviour.
- Rung-1 / rung-1 faces are measured only at the harness seeds; their cross-face differences in B-FUZZ are unmeasured.
- **Recommend:**
  - Round A measures the bar on every face of the population (S21 line 6 (A)) before round B binds it.
  - If any thick piece appears where both rungs are 2, the bar fails on behaviour the base already has: the session then
    rules (a declared class of the base, or a defect of the construction).
  - The contract sentence must cover same-rung faces too (Q14).

**Q8 — Round A's debug switch.**
- "Re-make, beside the SERVED construction, the figures of step 11" cannot be done for S8 ≡ S9. That comparison needs S8
  to plan on the ladder, which changes S8's trajectory.
- A per-read shadow on the construction's trajectory can re-make the read-level figures only: the exact read, the lay,
  the read rung, and the thin measure against the construction's committed blocks.
- **Recommend:** a debug-only switch (`setServedMode`, honoured only where DEBUG_BUILD, absent from the production bundle
  and pinned so). It serves the ladder in a debug run, so the build's own harness re-makes step 11's S8 ≡ S9 and B-FUZZ
  figures. The precedent is S20's debug shadow and the provider control of the earlier drafts.
- In round B the same switch serves the construction as the control.
- **The alternative** (no switch; round A reports read-level shadows only) leaves round B binding on prototype figures
  for S8 ≡ S9 and the commit ladder. I think that is the weaker evidence.

**Q9 — savepoint.test.ts 'S8 line 4 (d)': a seam or a leg.**
- **Recommend the session's SEAM on kernel/test/tx/support.ts.** One predicate classes a frame as 'dry-run' when the
  lay's function is on its stack. No assertion changes, and no seat edits M0-a-06's file.
- **Why:**
  - A lay's frames are dry-run frames by definition: opened and undone inside one read, nothing left.
  - The assertion's intent survives unchanged.
  - A leg would put round B behind M0-a-06's queue (the RQ2 merged round, then Q181's round).
- The predicate names the function through an exported constant of bandUnion.ts, so a rename cannot silently break it.
- When the view's constructor moves into tx/ (the queue row), the classifier reads the view's `op` tag instead.

**Q10 — `offRead` on rung 2.**
- The ruling retires `offRead`. It cannot fire on rung 1: the exact reads cannot see the op's L2 writes.
- On rung 2 the reads are the construction's, laid at L2, and `offRead` guards exactly that (B-CLOSE, round S13).
- **Recommend:** keep it on rung 2, so rung 2 is the base's commit byte for byte; S21 line 4's pin (i) needs that.
- **Alternative:** retire it on both rungs. Rung 2 would then differ from the base on the B-CLOSE cases, and its
  "today's commit" description would no longer be exact.

**Q11 — The L2-content pins.** Taken as review-3 T-11 asks: each pin asserts a classed cause. Plus the M1 queue row on
the district commit order. **Recommend as written** in S22 line 3.

**Q12 — The boundary rows.** The rows can only be counted on the built code (sketches in design.md section 5).
**Recommend:**
- The session pre-authorises in each entry the rows of the named nouns in the named files (kerb.ts: `band` string and
  `kerb` ident; bandUnion.ts: `band` ident, `kerb` string and `block` ident).
- The seat prints its counts, and the session's seam sets the rows to them.
- Any other noun or file STOPS the seat.

**Q13 — Q152's six, one by one (S22 line 4).**

| test | handling | reason |
|---|---|---|
| closing.test.ts, the shrunk counterexample | RE-POINT | `faithful: 'taken'` is the construction's faithful read; its law (after ≡ before) holds on the served read |
| closing.test.ts, draw 1109 | RE-POINT its closing to rung 2 (debug switch 'construction'); RE-JUDGE its served kerb(0) | the planted along-closing is the construction's commit, still served as rung 2 |
| dryrun.test.ts, draws 389 and 1109 | RE-JUDGE (`wholeBand` [1, 3]) | re-pinned only if the construction's face-1 kerb is wholly thin and outside X |
| hardening-s15.test.ts, network 561 | RE-JUDGE | the island ring, by the two-sided check, with group B's cause from M0-a-05 S14 |
| restage.test.ts, N1 | RE-POINT | the restaged read is the construction's census mechanism, served only on rung 2 |
| restage.test.ts, N2 | RE-POINT | as N1 |

The reviewer should check, from M0-a-05 S14's verdict, that group B's cause is not one the ladder's rung 2 still
carries. If it is, a re-pointed pin would stay red for M0-a-05's reason.

**Q14 — The contract sentence of ruling 2 (d) — I think it is wrong as written in two places.**
- **First,** "a planned block equals its committed block within the bound" is false where both the read and the commit
  took rung 2. The prototype's widened dangling-tip face 3 differs by 1 252 cm, thin: the base's own behaviour.
- **Second,** it states no cause for an inexact rung-1 / rung-1 block. That re-opens review-3 T-6's escape clause, which
  ruling 2 (b)'s closed list closes.
- **Recommend the wording in amendment-draft.md section 3:**
  - within the bound, with the closed list of causes, where both took rung 1;
  - pieces thinner than `attractCm`, of any length, wherever either took rung 2.

**Q15 — The construction is now permanent.**
- The earlier rulings kept the construction "one round, debug-only" and planned its removal (with dryrun.test.ts,
  restage.test.ts and the cause replay) after the re-profile of 990 (b). Under the ladder it is served code (rung 2) in
  every production bundle.
- **Recommend that the session's row on the ladder say so explicitly:**
  - the removal is withdrawn;
  - round B's bundle pin asserts the construction's PRESENCE;
  - M0-a-06's tx tests keep the construction as a dry-run generator wherever rung 2 runs.
- It also changes what item 989's budget must carry: the construction's cost wherever rung 2 runs (zero at the harness
  seeds).

**Q16 — The thin measure's lattice residue.**
- Step 10 found the erosion by 13 cm leaving residue rings under 1 cm wide on slivers about 26 cm wide (2 894 false
  "not thin" of 39 384 pieces under R+). Step 11's pieces were all thin (44 of 44), but a 26 cm sliver in the population
  would false-fail ruling 2 (c).
- **Recommend:** state the measure as "the erosion by 13 cm, computed with §3.7's own buffer parts, is empty, or every
  piece of it holds no disc of 2 cm (its own erosion by 1 cm is empty)". Pin it on strips of 26 cm (thin), 27 cm (not
  thin), and a 26 cm sliver that leaves a residue (thin).

**Q17 — Round numbers.**
- Round A is S21 and round B is S22.
- If S20 takes a fix round (lanes -s21), both are re-keyed at render.
- If round A takes a fix round, round B is re-keyed.
- **Recommend: key both at render,** as render.mjs does.

## What in the rulings I could not make consistent

1. **"The figures of step 11 re-made beside the SERVED construction" (ruling 5) cannot hold for S8 ≡ S9 or for the
   commit ladder.** Both need the ladder served. Q8 proposes the debug switch as the only reconciliation.
2. **Ruling 2 (d)'s sentence against ruling 2 (b)'s closed list and against the base's own same-rung behaviour** (Q14).
3. **Ruling 2 (c)'s "every face of every network"** against bandUnion's faces, which have no comparable read (Q3).
   Against the population, it is measured only over 46 networks (Q7).
4. **"`offRead` retired" against "rung 2 is today's commit"** (Q10).
5. **"The construction kept one round as a control"** (the earlier rulings) against ruling 1's "stays in the kernel as
   the second rung" (Q15).
