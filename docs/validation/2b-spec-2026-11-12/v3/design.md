# Round 2B — the design after the ladder ruling (re-draft v3, 2026-11-12)

Status: a spec seat's third re-draft. Nothing here is ruled or bound. It rests on `rulings-after-measurement.md`'s last
three sections ('After the reviewer's third pass', 'The rule R measured … R IS DROPPED', 'The ladder measured … THE
LADDER IS THE SESSION'S CHOICE', whose five rulings bind this draft), `measurement/step11-ladder.md`, `step10-R.md`,
`ladder-kerb.diff`, `ladder-bandUnion.diff`, `step11-q3-table.txt`, `review/review-3.md`, and the measurement seat's
`results/REPORT.md` item 5. The two entries are `spec-a09-s21.json` (round A, NO-SHIFT) and `spec-a09-s22.json` (round
B, the shift); the amendment text is `amendment-draft.md`; the choices left open are `open-questions.md`. Both rounds
open on S20's LANDED tree: cites name files and symbols; line numbers are the design head's (db9e68ea) or S20's branch
and are not binding.

## 1. What stands from v2/design.md

* Findings F1-3 – F1-12 (the engine needs no minted transaction once handed its read; `rollback` restores neither
  `work` nor `failed`; a refused kerb read passes S8's needle floor — now a queue row "a refused child read refuses the
  cut" for M0-b-03, review-3 T-13; the read-back scans every slot of its level; B-FUZZ's kerb row classes a lay refusal
  'own'; no M0 caller lays a band at L3; §3.7 never received 986 (c)'s text). F1-1 stands in its ruled form: the
  B-FUZZ bar is by networks and per operation, the cause classes reported.
* Section 2's two reads, renamed: the EXACT read (X with its spine map and splits, P's `readKerb` body) is rung 1's
  read and S9's rung-1 read; the construction's read is rung 2's.
* Section 3 whole — the lay's placement (L-A: a function of bandUnion.ts, `kerb()` imports it; the benign
  kerb.ts ↔ bandUnion.ts cycle), its transaction (K2: an OpenTx-shaped view made in bandUnion.ts, never minted, the
  batch's frames and index shared, its own work from 0 under the batch's declared limit, its own warnings, journal,
  chain journal, log, `failed`, `closed`, `op`), the face's read handed in (`reads`), `CLOSINGS` left alone (`quiet`),
  the placeholder entity for an unowned face, the read-back (simple loops, spikes dropped, F's own L1 rings where
  `whole`), the S-4 table of what a lay leaves untouched — WITH review-3 T-5's guard and the session's RQ4 ruling (a
  compiled key-list pin on `OpenTx`; the view the one declared exception to "transactions are made only in tx/"; its
  constructor moved into tx/state.ts by M0-a-06's round after RQ2 and Q181, a queue row).
* Section 4 (the L2-content dependence) and its pins, with review-3 T-11 (each pin asserts, none only prints).
* Section 6's contract text minus R (rewritten in `amendment-draft.md`), section 7 (the end rule, Q152, the oracle's
  widths, `offRead`'s retirement, no memo, the cost reported), section 10's answers to R-1 … R-21 and S-1 … S-14 except
  where they named R.

## 2. What is REMOVED

Every sentence, bar, pin and mutant of the resolution rule R: the snap S, the thin-part removal P1, the spike rule P2,
review-3's P0 and four fixes, the erosion radius as a RULE, R's properties (idempotence, rotation, lattice, crossing),
R's mutants R1 – R6, the L3 variant of R (A4.1 (a): measured, it commits nothing more — step10-R.md), the boundary-set
widening, R's measurement request M1 – M5, R's paragraph for the owner, and v2 design.md section 1 except its account of
what the door refuses (1.1). The erosion test SURVIVES ONLY AS A MEASURE: a piece is **thin** when its erosion by 13 cm
(half the attraction distance), computed with §3.7's own buffers, is empty — the measure step 11 used, which passes a
26 cm strip (review-3 T-3's 9.58 cm radius fails its own strip pin, REPORT item 2). It decides bars; it changes no
geometry. The L3-over-L2 network needs no design any more: the ladder commits it on rung 2 (it is among the 30 BASE
refusals or P refusals the ladder commits — step 11 §1).

## 3. The ladder

**The read, `kerb(o, face, widths)`.** Rung 1: the exact read of F (computed once), laid by the commit's own engine for
F alone at max(2, level) on the view, read back, everything undone (section 3 of v2). If the lay refuses — any refusal of
the engine on the view, its own E_WORK_LIMIT included (open-questions Q4) — rung 2: the construction's read of F, today's
served read, under its own savepoint and `insertTx` shell; its kerb and warnings are served. If both refuse, rung 2's
refusal is returned verbatim (so the census's causes stay the base's). Nothing of rung 1 survives rung 2: the lay's
`finally` has rolled back to its savepoint before rung 2 starts.

**The commit, `bandCore` (so `corridorUnion` and `bandUnion`).** Rung 1: the engine with every face read by the exact
read. If the op refuses, every write of rung 1 is undone by the op's own savepoint — `bandCore`'s loop returns each
refusal through `rollback(t, save, …)` — and rung 2 runs the SAME op again with every face read by the construction
(today's commit). Rung 2's result is returned; if it refuses too, its refusal is returned verbatim. Rung 1's work stays
charged to the batch (the work was done; `rollback` does not restore it): REPORTED, and open-questions Q5.

**The undo between the rungs, and the work-limit exit.** Every refusal inside the engine's loop goes through the op's
savepoint except one: `if (!dropSpurs(…)) return overLimit(t)` returns with the batch doomed (`t.failed` set) and no
rollback (as does `chargeTx` failing at the op's entry, before any write). The ladder takes NO second rung when
`t.failed` is set after rung 1 (ruling 4): the op refuses E_WORK_LIMIT as today. Pinned by a planted limit. A lay never
dooms the batch (its work and `failed` are the view's), so a read's rung 2 is never blocked by the batch's state.

**No replan** (ruling 3). A district committed on rung 2 after its faces were planned on rung 1 is not re-read; S9's
receipt (M0's layout, a queue row) counts second-rung commits and pins 0 at every registered seed.

**The rung reported in results** (ruling 2 (a); proposed names; open-questions Q1):

| member | where | values | standing under the frozen API (J263 Q1) |
|---|---|---|---|
| `rung` | `BandResult` (bandUnion.ts; re-exported as a type by arr/index.ts and read by facade/types.ts) | `1` — the engine on the exact reads; `2` — on the construction's reads after rung 1 refused | an ADDITIVE readonly member of an exported result record: no export name is added, removed or renamed, so kernel/test/num/api-surface.test.ts (names only, read from API.md Appendix B) stays green untouched; the declaration file gains one member; every existing reader of `BandResult` compiles unchanged; a caller that builds a `BandResult` literal (none outside bandUnion.ts — the façade passes results through) would need the member. |
| `rung` | `LastRead` (kerb.ts's per-arena diagnostic, read by `kerbCensus(p)`; by path, not in the barrel) | `1` — the lay served; `2` — the construction served | additive member of a by-path type; not part of Appendix B. `kerb()`'s own result type (`KernelResult<Ring[]>`) has no record to carry a member, so the read's rung is reported here, set on every `kerb()` call. |

No new warning code: `WarningCode` is num/'s union (M0-a-01's file) and a stage would read a rung as an insertion
warning. `KerbRead` gains nothing: the exact read has no rung.

**The price, in four parts** (ruling 2):
1. *Counted* — the members above; the harness and B-FUZZ count reads and ops by rung.
2. *Barred at the harness seeds* — no read and no op takes rung 2 at any harness seed M0 registers (fusion and
   integrated, test size and CITY): FAILING in round B; `beyond` 0 unqualified there, the 0.95 floor, every non-exact
   block classed from the closed, mechanically checked list of causes (review-3 T-6's three, and "the lone lay against
   the district's commit, a hot pixel apart: one sliver under 1 cm thick").
3. *Barred in the stress population* — on every face of every B-FUZZ bands network committed by `corridorUnion`, every
   piece of the two-way difference between the face's served read and its committed block is thin (erosion by 13 cm
   empty): FAILING; the count of MIXED faces (read and commit on different rungs) at the seed pinned as a literal.
4. *Declared* — the contract sentence of ruling 2 (d) (`amendment-draft.md`).

**What the measurement says the ladder costs and gives.** B-FUZZ at seed 20261112: 4 networks refused, all refused by
the base (which refuses 34); reads 28 673 on rung 1 and 9 on rung 2, none refused on both; ops 22 654 on rung 1, 44 on
rung 2, 4 refused on both (counts include bfuzz's replays of refused cases). Harness: no rung 2 anywhere; exact share
0.973 / 1.000 / 0.983 / 1.000 at the test size, 0.998 / 0.999 at CITY; `beyond` 0. The price: 44 faces read on rung 1
and committed on rung 2 (2 beyond 73.5 cm: 299 and 514 cm) and 2 the reverse (one 406.7 cm), every difference piece
thin. Cost at CITY, source mode: 11.95 ms a read, S8 34.5 ms a cut (the construction 38.8 and 98.0).

## 4. The two rounds

**Round A — M0-a-09 S21, NO-SHIFT.** The fold (W2); the exact read, the view, the lay and the commit ladder built as
kernel-internal functions NOT SERVED; a debug-only switch (`setServedMode`, honoured only where DEBUG_BUILD) that makes
`kerb()` and the engine serve the ladder in a debug run, so the build's own harness can re-make step 11; the typed
failures; the frame-side end rule (test-side); and the SHADOW: beside the SERVED construction, every read's exact read,
lay and ladder read (rung, thin measure, the face's committed block); B-FUZZ's figures and the harness's re-made by the
build's own runner. Its bar: byte-equal served reads and committed arenas on every census, switch off, shadow off and on.

**Round B — M0-a-09 S22, THE SHIFT.** The switch flipped (the ladder served; the debug switch now serves the
construction as the control); `offRead` retired; the bands folder and Q152's six; savepoint.test.ts :425 by a session
seam on support.ts; the declared shift with the measured red list; the bars of ruling 2 (a) – (d); the S8 ≡ S9 failing
bar; the oracle's widths from the run's table; the B-FUZZ bar by networks and per operation; the cost.

## 5. The lint, as sketched (`probes/sketch/`, the lint's own `scanText`; the seat's lint decides)

Round A: arr/kerbExact.ts's two rows removed (the fold); arr/kerb.ts gains `band` string 1 (the import of the lay, a new
row) and about four `kerb` idents (the exact read's `KerbRead` type and `kerb` key, the ladder read's `readKerb` call and
`.kerb`) over the fold's 20; arr/bandUnion.ts gains `kerb` string 1 (the lay's `'kerb'` role), `block` ident 1 (the
read-back's `blocks`) and two to four `band` idents (the ladder's and the hook's `BandResult`, the lay's and the
ladder's `bandCore` calls). Round B: `offRead`'s `.kerb` goes (bandUnion.ts `kerb` ident −1); `kerb()`'s body becomes the
ladder read; readKerb / constructionRead re-shuffled. Every changed row is the session's seam in each landing commit; a
count beyond the session's table STOPS the seat.
