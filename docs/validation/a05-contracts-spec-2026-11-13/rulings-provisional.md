# The contracts round — the session's PROVISIONAL rulings on the draft's questions (2026-11-13)

Written by the managing seat after reading `draft.md` whole, BEFORE the adversarial review (J631 (2) (a)). Every ruling
here is provisional: the review is asked to break each one, and the final rulings replace this file.

## What the session takes from the draft

The draft's main finding is accepted as read from the code, subject to the review: neither contract's kernel side is
in M0-a-05's files. The refusal a stage parses is the transaction's own role-consistency refusal at commit (`tx/tx.ts`),
and a faithful plan of a SEQUENCE of splits that commits nothing is a write-and-undo, which only `tx/` can make. The
queue rows' wording ('the field in insert/', 'an a-05 round') is the session's old reading and is corrected when the
round binds.

## Rulings (provisional)

| # | Question | Ruling | Reason |
|---|---|---|---|
| Q1 | Owner and gate | THE CONTRACTS ROUND IS M0-a-06's: leg 1 is M0-a-06's next free round after S10 (S11), gated on M0-a-06 S10's landing (child ED) — not on the router round, the residual round or the RQ2 round's third leg. Legs 2 and 3 also need the landings of the rounds now in flight on their items (M0-e-03 S5, child EA; M0-c-04 S7, child EC). Q181's merged round, so far called 'M0-a-06 S11 → M0-a-13 S4', is re-keyed at its own spec (it follows this round on the same files). | The code. And it frees the round from the a-05 chain, the longest left. |
| Q2 | Merged or split | ONE merged round, three legs, 1 → 2 → 3; leg 2 and leg 3 each launch only if leg 1 PASSED; leg 3 launches when leg 2 has ENDED, whatever its verdict. | Legs 2 and 3 share no file and neither reads the other's change. |
| Q3 | The double work | ACCEPTED as a named cost of S5; Q135 closes on the counting (a plan is no longer a refused batch in any receipt); the cost is written into Q129's row for the re-profile. | It is cost, not correctness; the re-profile is where S5's cost is judged. |
| Q4 | The field's home | `TxResult` in `tx/types.ts`, read by path — not `KernelResult` in `num/result.ts`. | One producer sets it; a field on the universal result would look universal and be dropped by every re-wrap. |
| Q5 | Pass-through | NONE: only the transaction's own commit rows set the field. | The contract is 'the commit named this chain'; a field any callback can set is a second message channel. |
| Q6 | The reader's roles | `shore` ONLY. | NO-SHIFT: the regex matched `(shore, …)` and nothing else. |
| Q7 | The façade | By a CROSS-ITEM SCOPE of leg 1 (`facade/types.ts`, `facade/kernel.ts`; the precedent is M0-a-06 S10's two statements in io/); the session re-lands M0-a-16's record and seams `kernel/API.md` at the landing. | One build and check cycle fewer; the façade edit is types and one member built exactly as `tx` is. |
| Q8 | `dryRun` through S5a's seam kernel | REFUSED there, as a second `tx` is (C-0452 (14)), with a pin. | The seam arms exactly one callback batch; it stays exact. |
| Q9 | The runner's `expectVerdicts` (R2) | **FOLDED INTO THIS ROUND, against the draft's advice** (a queue row would be a later one-line round on the same two files): leg 1's line 1 gives the batch's refusal a second structured field — the NAME of the `expect` row that refused it — set where `failures` builds `<row name>: <detail>`, texts byte-identical; and a FOURTH leg, M0-x-02's next round, has `expectVerdicts` read the field instead of `startsWith`. NO-SHIFT, shown as RL13's reader's is. | The same class of contract (a stage parsing the transaction's text), the same file, the same result type; J238 (1) makes it M0's either way. |
| Q10 | The site summary | The round DECLARES the S5 batch-count shift; leg 3 measures it on a declared sample; the session's final re-run of the site summary comes AFTER this round's landing and re-anchors the canary and M0-f-03b's fit pins. | One re-run, at the end, as planned. |
| Q11 | The invariant suite's rows and the checks' texts | No field for the suite's rows (not wired in production). The named `expect` rows are Q9's. | — |

## What the review is asked to break (beyond the draft's own weak points)

1. **The sequence-dependence claim** (draft §1.3 (c), weak point 1): measure it. If no two crossings of any registered
   family depend, is a new façade member still the right contract (exact by construction on every lawful input), or is
   the per-split plan with a dependence test enough?
2. **`dryRun`'s work is seen by no watcher.** Today the plan's work is counted (as a refused batch's) in the site
   receipts' `stageWork` and in the canary's charged work. After the round it is bounded by its own `spec.workLimit` and
   reported nowhere. Is that a hole in the work laws (M0-f-03b fits S5's law from the summary's batch population) or in
   what the timing phase measures? Should a dry run be visible to the watchers as its own class — and whose files would
   that take?
3. **The API.** `Kernel.dryRun` is a new public member and `Kernel.tx`'s return type widens. J263 Q1 freezes exports
   'unless a row explicitly asks for one'; M0-a-16's own public-API rows are held until after the Mac steps (Q145). Is a
   cross-item scope the right vehicle, what must `kernel/API.md` say, and does anything else read the façade's type
   (the five `tx` wrappers: compile them in a scratch mirror)?
4. **Q9's fold.** Is the `expect`-row field really the same contract, NO-SHIFT, and worth a fourth leg — or does it
   reach further than it looks (which stages have `expect` rows today; what `expectVerdicts` does with a miss)?
5. **Neighbours.** M0-a-06 S10 (in flight, child ED) edits `tx/tx.ts` — which of the draft's cites will have moved;
   round 2B's no-shift round builds 'the lay on its view' (an op-level write-and-undo inside the kerb read) — is that the
   same facility as `dryRun` under another name, and should the two be one; Q181's round follows on the same files.
6. **What the draft does not mention**: a `dryRun` asked for while a batch is open; the undo oracle's and the
   determinism harness's coverage of a dry run; slot counters, stamps and the restore generation after a dry run
   (shown, not argued); the index's batch log.
