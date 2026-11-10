# Review of the proposed ruling on M0-d-05a S2 closing-check finding F1

Review seat, 2026-11-10. Read-only on the repository except this file; no git command that changes anything, no test
run. Trees read: HEAD 74302a47, the round's base eedf7052, origin/wip/child-d05as2. `bentCutFabric.ts` and the
fabric's `mint.test.ts` are byte-equal on all three (sha256 57ede0f3… and eda39586…, the hashes M0-b-03's landed
record lists), so every line number below holds on each.

Overall: the ruling's direction is right. The mint's refusal should stay, and the subset should list each entry
once, in order of first push. That fix is minimal, it removes nothing the mint needs, and it gives NO-SHIFT. The
ruling's pin, as scoped, cannot do what (b) asks of it, and it does not reach the main wrong-fix mutant. The
documentation row is also incomplete.

## Findings

### F1R-1 (major): the direct distinctness assertion has no seam inside the scope as written

(b)(ii) asks that "where a seam allows it" the subset's entries be asserted distinct, so the pin is red on any tree
that carries the doubling. Nothing inside the scope gives such a seam:

* `LiveIndex` is not exported (bentCutFabric.ts:410; the file's exports are listed at :115–:1697).
* `FabricFaults` (:164–:180) has no hook that shows the subset.
* (b)(i) forbids anything outside the body of `relevant`.

On a tree without the Q93 refusal, the doubling has no visible effect. The checker's P4 with the guard removed was
"ok both ways, 239 minted", so a pin built from (b)(ii)'s first half is red only through the other item's refusal.
The only seam that exists is a module mock of `@plat/model`: `vi.mock` with `importOriginal` and a pass-through
`mint` wrapper that records each call's `live` argument. The repository already uses this pattern:
layout/test/pipeline/base/order.test.ts:11, layout/test/growth/s5ab/proof.test.ts:15, and choices rows C-0293 and
C-0436. bentCutFabric.ts imports `mint` from `@plat/model` (:81). That mock is file-wide hoisted code plus a `vi`
import, so it is not "ONE new case". A strict scope check would refuse it, and a seat reading "where a seam allows
it" will most likely conclude that no seam exists.

Change: name the seam in the ruling. Widen (ii) to allow the hoisted pass-through mock of `@plat/model` in
mint.test.ts, with recording off unless the case turns it on, or allow one new file in
`layout/test/infill/fabric/`. State what the case asserts:

1. On every recorded call with a one-record batch, `new Set(live).size === live.length` and
   `new Set(live.map(e => e.id)).size === live.length`.
2. Non-vacuity: at least one recorded subset holds a `retired` entry.

The alternative is to drop the clause and state plainly that the pin is red only through Q93's refusal.

### F1R-2 (major): the pin cannot kill the plausible wrong fixes

In P4's shape, every address on each fresh key's `~k` chain up to the free one is held by the doubled entry itself,
and the free address is `~1`. Two wrong remedies would therefore pass the pin:

* stop the address chain at the first entry that is already listed;
* skip the address chain when the dup loop ended on an all-retired lineage.

Each gives `[E]` on P4's input and the right `~1`. On an input where a third entity holds `natural~1`, each hands the
mint a subset without that holder, and S8 then mints a second live entity at `~1`. That is a silent duplicate,
because S8 never re-checks the whole list after the run's first mint. No existing test reaches this: the checker's
census found at least 8 500 subset mints in S8's families, 0 of which held a retired entry.

Change: add a second derivation to the same case, "own marked retired plus squatters". Each own entity is retired at
its lineage and natural address, and a squatter holds `${own[i].id}~1` under a foreign lineage, as in the existing
squatter case (mint.test.ts:52–:60). The expected result is: every id is `${own[i].id}~2`, every lineage is kept, and
the result equals the run under `faults: { wholeLiveMint: true }`. Require the fix seat to show both wrong remedies
killed in its mirror.

### F1R-3 (major): (d) corrects one of the two false statements, and the landing order is not stated

The checker's failing line requires a row that corrects both of C-0465's statements and declares the shift:

1. "no lawful input's output moves";
2. "S6 and S8 hand it live sets of their own".

The ruling's (d) names only the second. C-0465's first statement (choices.md on the round branch: "No lawful input's
output moves: every live set with distinct ids takes the same path") is true of the mint alone, but false of S8's
lawful input, which the round turned from correct ids into a throw. A re-check holding the checker's line could fail
the round again on "Undeclared deviation".

The ruling also never says that Q93's refusal must not reach main without the fix. Change: say that the round's merge
and the scope's re-landing go in one landing. Landing the scope first is also safe. On inputs without a repeat, the
fixed `relevant` returns the identical array. On the doubled class, the old mint is set-based (mint.ts on the round
branch, the `takenIds` / `retiredIds` / `takenLineage` loop), so dropping the duplicate changes nothing.

### F1R-4 (minor): the scope omits two comments whose premise F1 broke

* The `LiveIndex` class comment (bentCutFabric.ts:402–:409) says "The mint reads only the set's contents …, so that
  subset gives the result the whole list gives". Since Q93, the mint also reads multiplicity, so this is the premise
  F1 falsified.
* The call-site comment (:594–:595) carries the same premise.
* The fabric test file's header (mint.test.ts:1–:6) would want a line for the new case.

(b)(i) allows only `relevant`'s own doc comment (:452–:456). Change: allow these comments, or require them, and
nothing else.

### F1R-5 (minor): "F1 stands as stated" adopts the narrowest mechanism

`relevant` (:457–:478) cannot list an entry twice within one chain:

* the dup chain visits distinct lineage keys, and each entry sits in exactly one `byLineage` list;
* the address chain visits distinct ids;
* `byId` holds each id once, because :548's whole-list mint refuses a repeat in `ctx.live`, and the run never mints a
  taken id.

An entry is listed twice when it sits on the dup chain and also holds an address on the final lineage's `~k` chain.
That includes:

* (A) the checker's case: a retired entry at the final, all-retired lineage holding that lineage's natural address;
* (B) the same entry holding `natural~j` while the chain reaches `~j`;
* (C) any entry on the dup chain, retired or a survivor, carrying a handed-on address that lies on that chain
  (succession).

Change: "F1 stands; the mechanism is any entry on both chains". The by-identity fix covers all three cases. F1R-2's
squatter variant pins case B.

### F1R-6 (minor): the NO-SHIFT claim is under-stated and "the item's" tests is ambiguous

M0-d-05a's own tests never reach S8. The strong claim is provable at the code level:

1. The fixed `relevant` returns the identical array (same objects, same order) whenever the old one held no repeat.
2. On the doubled class, the fixed pair equals the pre-round tree, because the mint's result is set-based.

The cheapest sufficient proof is that argument plus one instrumented mirror run that asserts the old and new
`relevant` element-wise equal on every call, over `layout/test/infill/fabric` and
`testkit/test/layout/infill-fabric`, plus the gates. No root or digest needs to be recorded again.

### F1R-7 (minor): (e)'s "the hash M0-b-03's record lists" changes meaning at the re-landing

After the re-landing, the record lists the new hashes. Change: name the pre-landing hashes, sha256 57ede0f3…
(bentCutFabric.ts) and eda39586… (fabric mint.test.ts). Reverse-applying the scope diff must give those, and the
record's new entries must equal the tree.

### F1R-8 (minor): collisions with rounds in flight

The x-02 / b-03 spec names Q39's fabric half as M0-b-03 S9's work, with M0-x-02 S4's mirror diff of
bentCutFabric.ts as its input (workflows/lane-prompts/session-fix-cloud/specs.json). The only `k.tx` call is at
:1674, far from :457. The scope fix shifts later lines by a few lines: S4's patch still applies with an offset, but
S4's base hash and S9's BEFORE figures would name the pre-scope file. Change: append a pointer row to
checks/M0-b-03-notes.md, or to S9's spec, saying that the file changed under this scope and naming the hash it
changed from.
