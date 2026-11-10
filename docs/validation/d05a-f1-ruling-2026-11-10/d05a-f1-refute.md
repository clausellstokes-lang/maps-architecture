# M0-d-05a S2, finding F1: refuter seat on the review seat's findings and the proposed ruling

Trees read: HEAD 74302a47, base eedf7052 and origin/wip/child-d05as2. bentCutFabric.ts and layout/test/infill/fabric/mint.test.ts
hash to 57ede0f3… and eda39586… on all three trees, which is what plat/docs/build/landed/M0-b-03.json lists. I ran no test.
The only things I executed were read-only commands: git show, sha256sum, a grep, and one node read of specs.json.

## Verdicts

| id | verdict | short reason |
|---|---|---|
| F1R-1 | confirmed | There is no seam inside the scope. LiveIndex is a private class (`class LiveIndex`, not exported, :410), and FabricFaults (:164–:180) has no hook that shows the subset. On a pre-round mint the doubling cannot be observed, because the mint's result is set-based. The only seam is a pass-through `vi.mock('@plat/model')`, and "ONE new case" does not allow it. Package-level mocks have precedent: testkit/test/determinism/permute-control.test.ts:16 (`@plat/kernel`) and layout/test/pipeline/base/view.test.ts:13 (`@plat/site`). Correction: the precedents the seat cites, order.test.ts:11 and proof.test.ts:15, mock relative src paths, not packages. |
| F1R-2 | confirmed | I traced the code. In P4 the ~k chain reaches only E, the doubled entry, and then the free `natural~1`. So both wrong remedies give [E] and `~1`, and the pin cannot tell them from the right fix: (a) stopping the address loop at the first entry already listed, and (b) skipping the address loop after an all-retired dup stop. Now put a foreign-lineage squatter at `natural~1`. Both wrong remedies leave the squatter out, the mint gives `~1` (a live address), and the whole-list mint gives `~2`. The variant kills both, and existing subsets never hold a retired entry, so no current test does. |
| F1R-3 | confirmed | The checker's failing line asks for two things in this item: correct both statements of C-0465, and declare the shift. C-0465 says "No lawful input's output moves: every live set with distinct ids takes the same path…". That is true of `mint` alone but false of the S8 path in P4, which went from correct ids to a throw. Ruling (d) names only the "S6 and S8 hand it live sets of their own" statement. The checker also requires the fix to land "with or before this round", and ruling (e) never orders the scope's re-landing against the round's merge. |
| F1R-4 | partly | The class comment at :402–:409 should be restated. Its reason why the subset suffices ("the mint reads only the set's contents") left out multiplicity once Q93 landed. The rest of the finding is wrong. The call-site comment :594–:595 states no multiplicity premise; it only says the subset equals the whole-list result, and the fix makes that true again. The test header :1–:6 speaks of "the collision rule", which still reads only contents. |
| F1R-5 | confirmed (minor) | The mechanism is as the seat states. The dup chain's lineage keys are distinct. ids in the index are unique: the round's `mint([], ctx.live, …)` at :548 refuses a repeat, and the run's mints never give a taken id. So an entry repeats only when it sits on both chains, which covers cases A, B and C. Case B (a retired entry at the final lineage holding `natural~j`) and case C (a handed-on address) are reachable. The remedy text in (b)(i) is by identity and already covers all three cases, so only the wording of (a) is too narrow. |
| F1R-6 | confirmed (minor) | `mint` builds takenIds, retiredIds and takenLineage as sets (round mint.ts, live loop). Dropping repeats in first-push order therefore returns the identical array whenever the old list had no repeat. On the doubled class, the pre-round mint applied to [E,E] equals the fixed mint applied to [E]. "The item's tests" is ambiguous: M0-d-05a's tests never reach S8. The inputs to name are layout/test/infill/fabric/ and testkit/test/layout/infill-fabric/, both of which exist. |
| F1R-7 | confirmed (minor) | Both hashes are verified above. Once the record is re-landed, "the hash M0-b-03's record lists" points at the new hashes, so the target of the reverse-applied diff has to be named explicitly. |
| F1R-8 | confirmed (minor) | specs.json cites bentCutFabric.ts by line number (for example 872, :339, :968, :1305, :1408 and :1417), and M0-b-03 S9 and M0-x-02 S4 build on it. A relevant() body a few lines longer shifts every line after :457. A pointer row giving the old and new hashes is cheap. There is no textual conflict: the file's only k.tx call is at :1674. |

Corrected change for F1R-4: allow, and require, restating the LiveIndex class comment (:402–:409) to say that the subset holds each
entry once, so it gives what the whole list gives. Optionally allow one line in the fabric test header (:1–:6) that names the new
case. Nothing at :594–:595.

## Is the ruling sound? yes-with-changes

I read LiveIndex.relevant, its call site at :596, the round's mint.ts and the fabric's mint.test.ts myself. The core is right.

- `[E, E]` is a live set that repeats an id, and the mint has no lawful way to tell one object listed twice from two holders. So keeping the refusal and fixing the caller is correct.
- Listing each entry once, in first-push order, is minimal and complete. The index's dup loop matches the mint's: it stops on no entries or on all retired, since retired lineages are no collision. The ~k loop matches takenIds, which includes retired ids.
- The identity dedup equals an id dedup inside the index, and the mint is set-based, so NO-SHIFT holds in its strong form.
- Both rejected alternatives are rightly rejected.

The ruling is not yet binding-ready, for three reasons:

1. Its "where a seam allows it" clause promises a direct pin that the scope forbids (F1R-1). The ruling must either widen the scope to a pass-through mock of `@plat/model` in mint.test.ts, or say that the pin is red only through Q93.
2. P4 alone cannot tell the right fix from the two plausible silent-duplicate fixes (F1R-2), so the squatter-at-`~1` variant, which expects `~2`, belongs in the pin.
3. Row (d) has to correct both C-0465 statements and declare the S8 shift. Ruling (e) has to state that the scope lands with, or before, the round's merge, so a re-check cannot fail the round again on "Undeclared deviation" (F1R-3).

The minor changes are wording and pointers: restate the class comment, give the mechanism in full, give NO-SHIFT in its strong form, name the pre-landing hashes, and add a pointer for S9. They are worth folding in, but none of them changes the remedy.
