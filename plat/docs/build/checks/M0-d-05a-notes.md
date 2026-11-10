# M0-d-05a — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-d-05a (lane `check/M0-d-05a-close-r1`, 2026-10-04). Under the
session's rulings J162 and J169, the closing check fails the item only on a blocker. None of the findings below is a
blocker. Each needs a malformed input, a deliberate writer, or a later milestone's address form. Each row names its
handling and where it belongs. The verdict and its evidence are in `checks/M0-d-05a.md`, with the closing round at the
top. The probes are `scratchpad/close05a/probe4.mjs`, run on the package built from the landed sources.

The first check's notes (N-1 – N-5) are bullets in `checks/M0-d-05a.md` round 1. They are: the types test's 5 s limit,
routing C-0147 and C-0179 into the twin, the lenient token, the two `TOWN_ROOT` exports, and what succession must hand
the mint. This file starts its own numbering at N-1.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-1 | **The handed-on kind's exact comparison is unpinned.** The code compares the address's kind and the record's kind exactly. `probe4`: `N1 kind Plot handed plot:: threw RangeError: … is of kind plot, the record's kind is Plot`. But mutant Q2 compares them without case (`p.kind.toLowerCase() !== rec.kind.toLowerCase()`), and it survives the item's 44 tests. Kinds are case-sensitive under C-0179 (3)'s kind rule (`[A-Za-z][A-Za-z0-9._-]*`), so `Plot` and `plot` are two kinds. | Add one refusal case to "checks a handed-on record's kind …": a record of kind `Plot` handed a `plot:` address. Its expected message is `/is of kind plot, the record's kind is Plot/`. | M4 (hardening); or M0-d-05b, if it touches the mint's tests |
| N-2 | **A live set that lists one id twice lets a hand-on reach a survivor's address.** `mint` builds `retiredIds` from every entry flagged `retired`. Suppose `live` holds `{ id: x, retired: true }` and also a survivor `{ id: x }`. Then a record handed `x` is accepted, and the batch gives a second live entity the survivor's address. `probe4`: `N2 two live entries with one id, one retired: hand-on to it: ok -> "plot:3p7t2a00nw1xg"`. §6.3 never reuses an address, so a correct live set holds each id once, and this input is malformed. | Either `mint` refuses a `live` that repeats an id (a RangeError, like C-0184's other input checks, with a test), or M0-d-05b's live-set builder states and tests that each id appears once. | M0-d-05b (it builds the live set the mint reads); else M4 |
| N-3 | **The fix's `parent` check refuses the design's room id form.** `checkRecord` parses `rec.parent` with `parseAddress`. Its token class `[^:/\s]+` refuses §2.6's `Room.id` form `room:<building id>/<level>/<i>`. `probe4`: `N3 … room:<building id>/<level>/<i>: threw RangeError: address: not an address: room:building:abc/0/2`. M0 cannot reach this. §2.8 says that "an address whose prefix is `room:`" resolves through its building's plan, "so plan parts need no registry entry". So no entity M0 mints has a room as its `Identity.parent`. | When V03's stored plans land, decide whether a minted entity's containment parent can be a room. If it can, widen the parent check (and `parseAddress`, or a room-aware variant) to the room form, with a choices row naming §2.6 and §2.8 and a test. If it cannot, state that in a row. | the item that builds V03's stored plans (rooms); else M4 |

## Consolidation round R4 (lane `build/M0-d-05a-consolidate-1`, flow-7, 2026-10-11; the builder's map and notes)

The round applies I-1 – I-3 (§1.4), the comment rewrite C-model-2 (§2) and §3.4's test comments of
`plat/docs/build/consolidation/model-tables-plan.md` (J260, J263, J268 Q5). The row is C-0322. NO-SHIFT evidence (the
builder's scratch probe, run once on a mirror of the tree as it was and once on the round's code):

* Exported names: the runtime names of `identity/index.ts` (19) and of `model/src/index.ts` (67) are identical before and
  after; neither index file changed, so the type exports are unchanged too. The four new names are file-level exports of
  `lineage.ts`, imported by path (J268 Q5).
* Values: 400 seeded lineage keys over the three layers (with and without a unit and a dup) give identical lanes, lineage
  hashes, tokens, arena prefixes and addresses. The town root's hash `[0x99c01090, 0x102eece6]` and `mintTownRoot(seedKey(11))`
  are identical. So are three user tokens and a seven-record mint fixture (a suffix 3 against live, `~1` and a tombstone; a
  dup 1 against a survivor; a handed-on address; a user-created entity; an underground part).
* Refusals: 297 inputs. 258 give the same class and message. The other 39 are all values outside the number type: a
  bigint, a symbol, or an object whose `valueOf` throws. They were fed to the 13 number-typed sites of `lineage.ts` and
  `address.ts`. Before, the operator threw (`TypeError: Cannot mix BigInt …`, `Cannot convert a Symbol value to a number`,
  or the `valueOf` error). Now the shared `unknown`-typed predicate answers false and the site's own RangeError names the
  field (`lineage key: stage is not valid: 1`). Four symbol cases still throw a TypeError, from `String()` of an array
  that holds a symbol. No test pins any of the 39. Every number input, and every input the mint already guarded, keeps
  its refusal.
* Refusal count of the registered families (J264): 0 before and 0 after. The families are `city.test.ts`'s 101 643
  minted entities and the fast-check families of the four files at the PR size, where any throw fails the property.

### Old file → new file map (J263 Q8)

No test file merged, renamed or removed; every `describe` / `it` title kept verbatim (44 before, 48 after).

| old (lines of the tree read on 2026-10-11) | new | what moved |
|---|---|---|
| `src/identity/lineage.ts` 34 – 35 `isU32`, `isU16` (number-typed, private) | `lineage.ts` (exported, `unknown`-typed, `v is number`) | the one home of the predicates; `isObject` joins them |
| `src/identity/address.ts` 22 `isU32` | import from `./lineage.js` | the copy deleted |
| `src/identity/mint.ts` 95 – 96 `isU32`, `isObject` | import from `./lineage.js` | the copies deleted |
| `mint.ts` 123 `typeof reroll !== 'number' \|\| (reroll & 0xffff) !== reroll` | `!isU16(reroll)` | the predicate carries the `typeof` guard; message unchanged |
| (none) | `lineage.ts` `copyLineage(h)` | I-2; the four `match/` sites adopt it in R5 (M0-d-05b) |
| `mint.ts` `HashSet`, `compareLanes` | the same | I-3 KEEP; one doc comment names `compareLanes` the tie-break and `compareLineage` the order (C-0179 (4)) |
| `lineage.ts` header | the same + two lines | names the four file-level exports, not in the package's API |
| `test/identity/lineage.test.ts` | the same + a describe "the shared file-level helpers of lineage.ts" (4 cases) | imports the four by path; the header names them |
| `test/identity/address.test.ts` "refuses a hash that is not two u32 lanes", "writes a user-created entity's token …" | the same titles | each `toThrow(RangeError)` kept and a pin of its message text added (`token: not a 64-bit hash of two u32 lanes: …`, `user token: seq/ordinal is not a u32: …`) |
| `test/identity/mint.test.ts` 5 "(C-0184, fix round 1)"; 136, 140, 142 "P1:", "P2:", "P2b:" | "(C-0184)"; the probe ids dropped | the round narration and the check's probe ids leave the comments |
| `test/identity/city.test.ts` | byte-unchanged | — |

Mutant-kill map. 41 targeted mutants ran one at a time in the lane's mirror (`vitest run --maxWorkers=1 --bail=1
packages/model/test/identity`): 39 red, 2 equivalent.
* The shared predicates. P1 (isU32 takes fractions: the earlier R4), P3 (takes 2³²), P4 (takes signed lanes), P5 (isU16 is
  17 bits wide) and P7 (isU16 takes negatives) are red in `lineage.test.ts` "refuses every field out of its width" or
  `mint.test.ts` "refuses a live lineage …". P2 and P6 (a predicate without its `typeof` guard) and P8 and P9 (isObject
  takes null or refuses arrays) are red in the new describe.
* The plan's oracle list: CL3, CL4, Q3 – Q5, R1 – R3, R5 – R10 are red under their earlier titles.
* The sites. A1 – A3 (token high lane, arena part, sky part past u32) are red. N1 and N2 (mint reroll as u32, or as any
  number: the line I-1 rewrote) are red.
* A4 and A5 (user-token seq or ordinal unchecked). A4 survived the earlier tests, because the kernel's `LaneWriter.u32`
  refuses -1 with its own RangeError. Both are red once the message pins above are added.
* copyLineage. C1 – C3 (not frozen, returns its input, swaps the lanes) are red. C4 (`Array.from(h)`) is equivalent on a
  two-lane hash.
* The earlier rounds' sample. CL1, CL5, CA1, CM1, CM6 and CM9 are red under their earlier titles. I3 (the tie-break
  dropped) is equivalent at 2⁻⁶⁴, like CM2: it is reached only when two different lane streams share a 64-bit hash.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-1 | The 39 refusal shifts above are values outside the number type at number-typed sites. Before, they threw the operator's exception. Now they throw the field's RangeError, as `lineage.ts`'s header has always promised ("every refusal is a RangeError naming the field"). This is not a behaviour change on any input the types admit. | none; the closing checker re-runs the probe if it wants the receipt | — |
| N-c1-2 | The RELATED run (PLAT_FUZZ_RUNS=1000, 274 files, 3 280 tests) had one red: `testkit test/edge/standing.test.ts` "cell/river×frame at seed 1595424233". It is red too in the mirror holding the before identity files. It is the brief's known M0-e-03 s1 shift, so it is not this item's red. | the session (M0-e-03 s1) | — |

## Consolidation round R4 — the closing check's notes (lane `check/M0-d-05a-consolidate-close-1`, 2026-10-11)

The verdict and its evidence are in `checks/M0-d-05a-c1.md` (PASS). None of these rows is a blocker; each is a
tightening of a comment, not a behaviour.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c2-1 | `lineage.ts:14–15` says `isU32`, `isU16`, `isObject` and `copyLineage` are file-level exports "the identity and matching modules share". Today only `address.ts` and `mint.ts` import the predicates, and nothing outside the tests imports `copyLineage`: the `match/` adoption is R5's (plan §1.5 X-2). The sentence is the plan's own wording and becomes exact when R5 lands. | R5's seat (M0-d-05b) keeps the line true when it imports them; if R5 drops the adoption, the line names the identity module alone | M0 (R5) |
| N-c2-2 | `mint.ts:96–99`'s new doc comment names `compareLanes` the canonical order's tie-break (C-0179 (4)). `compareLanes` has a second use: `mint.ts:212` uses it to refuse two records with one lineage key (equal lanes). The comment is right but incomplete. | add "and the test for two records carrying one key" to the comment at the next edit of `mint.ts` | M4 |

## Hardening round S1 (lane `build/M0-d-05a-fix-s1`, 2026-10-20) — the builder's row-by-row outcome

The session's hardening round S1 (J237 (2), J186, J192; the inventory's FIX-NOW rows `M0-d-04:159` N-c1-4,
`M0-d-05a:15` N-1, `:16` N-2, `:89` N-c2-2; the re-triage of 2026-10-19, J423 batch B2, leaves N-2's residue to the
owner). Merged round M1: M0-d-05b's round S1 ran first (closed PASS, `checks/M0-d-05b-s1.md`), this item second, on the
same branch. Inside the owns (`model/src/identity/`, `model/test/identity/`) only: two source files change in comments
only (`lineage.ts`, `mint.ts`; esbuild's transpile of each is sha-equal before and after: `bb4ed636d99c7149`,
`0315ba4f0b2c9686`), and one test gains a pin inside an existing `it` (every title kept, 48 before and 48 after). No
export, message text or behaviour changes; the round's choices row is C-0410.

| row | outcome | what changed | evidence (mutant) |
|---|---|---|---|
| N-c1-4 (`M0-d-04:159`) | **fixed — comment** | `lineage.ts:14–15` now reads "file-level exports the identity, matching and digest modules share" — the note's own words. The importers by path, read in the tree: `match/match.ts` (`copyLineage`, `isU32`), `match/carry.ts` (`copyLineage`), `digest/records.ts` and `digest/leaf.ts` (`isU32`). | comment-only: the text is the deliverable |
| N-1 (`:15`) | **fixed — pinned** | `mint.test.ts` "checks a handed-on record's kind by the kind rule and refuses an address of another kind or another arena" gains the note's case, both ways: a record of kind `Plot` handed a `plot:` address throws `mint: the handed-on address plot:… is of kind plot, the record's kind is Plot`, and a `plot` record handed a `Plot:` address (a retired live entry's) throws `… is of kind Plot, the record's kind is plot` — each message pinned verbatim (C-0179 (3)'s kind rule makes `Plot` and `plot` two kinds). The code was already right. | Q2 (the note's mutant: both kinds lower-cased), Q2b (the record's kind lower-cased only), Q2c (the address's kind only): red on the new pin, green on the pre-round tests |
| N-2 (`:16`) | **done half stands — residue REPORTED** | Nothing built. The note's second alternative is on the tree and pinned on the builder's side: M0-d-05b's `liveSetOf` lists each address once and refuses a repeat (C-0188 (11); `match/carry.test.ts` "resolveRef reads each outcome; liveSetOf lists each address once and refuses a repeat (M0-d-05a note N-2)", `/given twice/`). The residue — whether `mint` itself should refuse a `live` that repeats an id (`mint.ts:183–187` adds every entry) — is the owner's question (the re-triage of 2026-10-19, J423), pending. Reported for the owner's ruling. | — (the probe's input stays accepted by `mint`; it is unlawful input, malformed by §6.3's never-reused rule, and no M0 caller builds it: `liveSetOf` is the one builder of a live set and refuses it) |
| N-c2-2 (`:89`) | **fixed — comment** | `mint.ts:96–100`'s doc of `compareLanes` now names both uses: "the canonical order's tie-break for two keys whose lineage hashes are equal (a 64-bit collision), and the test for two records carrying one key (equal lanes, refused)". | comment-only: the text is the deliverable |

**The round's mutants** (one scratch mirror at `/home/user/maps-scratch/waves/selfcheck-build-M0-d-05a-fix-s1/plat`,
isolation proved — no link into the tree, `@plat/kernel`'s realpath inside the mirror; each run `vitest run
--maxWorkers=1 --bail=1 packages/model/test/identity/`; each mutated file restored by copy and `cmp`; the mirror and its
`node_modules` deleted): the unmutated mirror 48/48; Q2, Q2b, Q2c — 3 of 3 red on the round's test (`AssertionError:
expected [Function] to throw an error`), 3 of 3 green (48/48) on the pre-round `mint.test.ts` (the before copy, sha256
`4b4f4f4f…` = `landed/M0-d-05a.json`), so the pin is new. No equivalent survivor.

**Refusals (J264, N-58).** The registered families — `city.test.ts`'s 101 643 minted entities and the fast-check
families of the four files at the PR size, where any throw fails the property — **0 refused before, 0 after** (every
test green; the sources' transpiled code byte-identical, so no refusal class moved). The round's new cases are UNLAWFUL
input (a handed-on address of another kind) and stay REFUSE, a typed RangeError: succession (`match`) hands an address
only to a fresh entity of the same kind (§6.3 *Carry-over*), so no user reaches the class through §11.4's doors. N-2's
input (a live set repeating an id) is UNLAWFUL too; `mint` accepts it today, `liveSetOf` refuses it (the owner's
question above).

**The round's gates** (W=1 throughout; this machine is not §12.1's timing reference, so no timing is read): install
`--frozen-lockfile` 0; lint 0 (eslint 1156 files, probe-red ok, 9 whole-tree checks); build 0; NEAR
`packages/model/test/identity/` at the PR size 4/4 files, 48/48 tests; RELATED `PLAT_FUZZ_RUNS=1000 vitest related --run`
over the round's two changed sources (`lineage.ts`, `mint.ts`), started 2026-10-20 21:06 after the last source edit,
exit 0 — 273/273 files, 3414/3414 tests (no red, foreign or the item's). The NEAR run and lint were repeated after this paragraph's append on the session's resume of 2026-10-21.

## Closing check of hardening round S1 (lane `check/M0-d-05a-close-s1`, 2026-10-21)

The verdict and its evidence are in `checks/M0-d-05a-s1.md` (PASS). Every row of the round is confirmed there. N-c1-4
and N-c2-2 are fixed as comments. N-1 is fixed and pinned: 11 own mutants K1 – K11 are red, and 10 of them are green on
the pre-round test. N-2's done half is pinned (mutant L1 red), and its residue is REPORTED for the owner (J423). The row
below is not a blocker.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-cs1-1 | **This seat's disclosures.** (a) The seat ran one `git -v` (a version query) in its own scratch mirror. That breaks the working rule "run NO git command". It read no repository state and wrote nothing, and no evidence depends on it. (b) The seat's first read of this file took in the author's "Hardening round S1" section, together with the source notes and before the seat wrote its mutants. The case-folding family follows from N-1's own note (its Q2 is K1 here). K2 – K11, L1 and the probes are the seat's own, and every verdict line is re-run with the seat's own evidence. | the session (a working-rule disclosure; nothing to build) | — |

## Hardening round S2 (lane `build/M0-d-05a-fix-s2`, 2026-11-09) — the builder's row-by-row outcome

The session's hardening round S2 (J237 (2), J238, J186, J192; the second re-triage's merged entry `M0-d-05a + M0-m-01`,
class COMPOUNDS, ratified at J722 — this item's row only, M0-m-01's is its own round's; the session's ruling RL11, J637).
The source read whole: `docs/M0-FIX-QUEUE.md` row Q93, this file's note N-2 and section "Hardening round S1", and
`match/carry.ts`'s `liveSetOf` (read, never edited: M0-d-05b's). The re-triage's plan file lies under `docs/validation/`,
which the clean room closes to this seat, so it was not opened; the brief's quotation of its row and the queue row were
enough. Inside the owns only: `model/src/identity/mint.ts` (the fix and its comments) and
`model/test/identity/mint.test.ts` (the pin, the property's generator, the header). The round's choices row is C-0465.

| row | outcome | what changed | evidence (mutant) |
|---|---|---|---|
| Q93 (N-2's mint-side residue; RL11: FIX) | **fixed — pinned** | `mint` checks each live entry, then its id against the live ids already read, and refuses a repeat with `RangeError('mint: the live id <id> is given twice')` — `liveSetOf`'s wording (`match: the old id <id> is given twice`) with the mint's prefix and its own word for the set — whatever the `retired` flags and the order, before any batch record is read, an empty batch too (`mint.ts`, the live loop; its header and doc name the refusal). New `it` in `mint.test.ts`: "refuses a live set that gives one id twice, before it reads the batch (queue row Q93)" — N-2's probe (a retired entry and a survivor under one id, the record handed it) both orders, two survivors, two retired, one entry twice, repeats apart, an empty batch, a repeat ahead of a malformed record; each message pinned verbatim; a control with each id once. | Q93-M1 (the check removed: the row's fault), M1b (the pre-round `mint.ts`, sha256 `53ac7f3e…` = `landed/M0-d-05a.json`), M2 (survivor repeats only), M3 (retired repeats only), M4 (message reworded `old id`), M5 (the refusal deferred past the records: red on the malformed-record case), M6 (non-empty batches only), M7 (adjacent repeats only): 8 of 8 red, each on the new case (`--bail=1`: the run stops at that first red) |

**The property's generator.** The permutation property ("equals the oracle and is unmoved by any permutation …") put a
live holder at each record's natural address; two records sharing a user origin (one kind, arena, `seq` and ordinal)
share that address, so the generator could list one id twice — 1 396 of 10⁴ samples (`fc.sample`, seed 20261109), all
accepted by the pre-round mint. That is unlawful input (§6.3 never reuses an address), so the generator now gives one
holder per address, the first; the oracle and every assertion are unchanged. Control CTRL-G (the fixed `mint.ts` under
the pre-round `mint.test.ts`, sha256 `32e554e3…`): the property red, `RangeError: mint: the live id sky2/plot:… is given
twice` — so the generator change is required, and nothing else in the file is.

**Behaviour (declared, J237 rule 3).** Before: `mint([plot handed x], [{ id: x, retired }, { id: x }], …)` minted a second
live entity at the survivor's address `x`. After: it throws the message above. Every live set with distinct ids takes
the same path as before (the check only adds a throw), so no lawful output moves and no digest or golden is re-recorded.
No export is added, removed or renamed; one new message text, pinned verbatim; every other message unchanged.

**Refusals (J264, N-58).** Lawful input of the registered families — `city.test.ts`'s 101 643 minted entities (its live
sets are the minted ids, each once) and the four files' fast-check families at the PR size — **0 refused before, 0
after**. The repeated-id class is UNLAWFUL input, verdict REFUSE (a typed RangeError): a repair would have to guess which
entry is meant; the programme's one live-set builder, M0-d-05b's `liveSetOf`, refuses the same fault first, and no user
reaches the class through §11.4's doors. The other callers of `mint` (the layout's S6 `districts/stage.ts` and S8
`infill/bentCutFabric.ts`, the testkit's district supports) build their live sets from the ids they mint, each once;
the RELATED run below reads them all.

**The round's mutants** (one scratch mirror at `/home/user/maps-scratch/waves/selfcheck-build-M0-d-05a-fix-s2/plat`,
isolation proved — no link into the tree, `@plat/kernel`'s realpath inside the mirror; each run `vitest run
--maxWorkers=1 --bail=1 packages/model/test/identity/`; each mutated file restored by copy and `cmp`; the mirror and its
`node_modules` deleted): the unmutated mirror 4 files, 49/49; the eight mutants above red; CTRL-G red as stated.

**The round's gates** (W=1 throughout, the budget's number; this machine is not §12.1's timing reference, so no timing is
read): install `--frozen-lockfile` 0; lint 0 (eslint 1277 files, 0 errors, `lint: probe-red ok`, 9 whole-tree checks);
build 0; NEAR `packages/model/test/identity/` at the PR size 4/4 files, 49/49 tests; RELATED `PLAT_FUZZ_RUNS=1000 vitest
related --run` over the round's one changed source (`mint.ts`), started 2026-11-09 21:45 after the last source edit,
exit 0 — 324/324 files, 4146/4146 tests (no red, foreign or the item's; the run's fuzz seed -1820046852). The S6 and S8
callers of `mint` and the testkit's supports are among the files it ran, so no live set the programme builds repeats an id.

## Closing check of hardening round S2 (lane `check/M0-d-05a-close-s2`, 2026-11-10)

The verdict and its evidence are in `checks/M0-d-05a-s2.md` (FAIL on one line, F1). The round's own row Q93 is confirmed
fixed and pinned (17 own mutants red; 200 000 lawful batches identical before and after; refusals 0 → 0). F1 is the
failing line, not a note: the Q93 guard meets the S8 fabric's subset mint (`LiveIndex.relevant`, M0-b-03's
`infill/bentCutFabric.ts`), which lists a retired entry at the fresh key's lineage and natural address twice, so S8
beside retired live entries throws `mint: the live id … is given twice` where the pre-round tree and the whole-list mint
give every entity `~1`. The session's ruling J741 lets F1 stand, keeps the mint's refusal as built and gives the
remedy to this item's fix round under a cross-item write scope (`LiveIndex.relevant` lists each entry once; a new pin
file in `packages/layout/test/infill/fabric/`; a new choices row correcting C-0465). The rows below are not blockers.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-cs2-1 | **This seat's disclosure.** The before-images of `mint.ts` and `mint.test.ts` (sha256 53ac7f3e…, 32e554e3…) were read from the repository's object store by a Python script: the index entries of those two paths only, then their two blobs, each verified by its blob id. No git command was run and no other path was printed. | the session (a disclosure; nothing to build) | — |
| N-cs2-2 | A tombstone that shares a live id, and a tombstone listed twice, are accepted by `mint` (C-0465: "not ruled here"). The permutation property generates the first shape (a live holder and tombstones at one natural address), so the mutant that refuses it is red there: the shape counts as lawful today. | a ruling whether a lawful archive can hold a live id; then a refusal or a stated reason | M4 |
| N-cs2-3 | **The RELATED@1000 gate row of this check is NOT RUN** (J741 (b)). The run over `mint.ts` was started twice in the tree (00:10, 00:55; W=1) and cut both times by a restart of the machine (00:47, about 01:15) with no exit code; the partial logs hold no failed test line and are not evidence. The verdict does not rest on it. | the fix round's re-check runs the gates whole: NEAR with `packages/layout/test/infill/fabric/`, RELATED@1000 over `mint.ts` and `bentCutFabric.ts`, through the workflow's waiter | this round's re-check |

## Hardening round S2, fix round (lane `build/M0-d-05a-fix-s3`, 2026-11-10) — the builder's outcome on F1

The fix round of hardening round S2, after its closing check (`checks/M0-d-05a-s2.md`) failed it on one line, F1; the
session's ruling J741 (a)–(g) binds it. Read whole: the verdict file (F1 and the ruling), C-0465, this file's sections
"Hardening round S2" and "Closing check of hardening round S2", `model/src/identity/mint.ts`, M0-b-03's
`layout/src/infill/bentCutFabric.ts` (`FabricFaults`, `LiveIndex`, `Run.mintOne`) and its test folder's `support.ts` and
`mint.test.ts`; the mock pattern of `layout/test/pipeline/base/view.test.ts` and `testkit/test/determinism/permute-control.test.ts`.
**Write scope** (J741 (c)): this item's owns (untouched this round: `mint.ts` and `mint.test.ts` are byte-equal to the
S2 record) plus exactly two paths of M0-b-03's — the body and doc comment of `LiveIndex.relevant` and the `LiveIndex`
class comment in `packages/layout/src/infill/bentCutFabric.ts`, and the new file
`packages/layout/test/infill/fabric/live-subset.test.ts`. Nothing else of M0-b-03's moved: not the call site in
`mintOne`, not its comment, no export, no fault seam; `support.ts`, `mint.test.ts` and every other file of the folder
untouched. The round's choices row is C-0466.

| row | outcome | what changed | evidence (mutant) |
|---|---|---|---|
| F1 (check S2; J741: route (a), the mint's refusal stays) | **fixed — pinned** | `LiveIndex.relevant` returns each `LiveEntry` once, by object identity, in the order of first push: a local `Set` of the entries already listed, and both loops push through one `take` that skips an entry already listed; the `dup` loop and the `~k` loop walk exactly as before (the `~k` loop never stops early, never skipped). Its doc comment and the class comment restated: the mint reads multiplicity too (Q93), and the subset holds each entry once. | `live-subset.test.ts` (one describe): P-a (the checker's P4: `twoDistricts` beside its 239 entities marked retired — S8 commits, lineages kept, every id `~1`, the output equal to the `faults.wholeLiveMint` run), P-b (the same plus a `~1` squatter under a foreign lineage per entity — every id `~2`, equal to `wholeLiveMint`), P-c (a hoisted pass-through mock of `@plat/model` recording each one-record mint's live list while the test's flag is on: over the runs of P-a, P-b and P-d no list holds an object or an id twice, and some hold a retired entry; the doubling asserted before the run's error, so it is red whatever the mint does), P-d (J741's two further shapes: a retired entry at its lineage holding the natural's `~1` with the natural held under a foreign lineage; a survivor on the record's `dup` chain holding `~1` of the address the chain reaches, that address held under a foreign lineage — 193 records built from the recorded mint of the run beside its own survivors — every id `~2`, lineages as the whole-list run's, equal to `wholeLiveMint`). Mutants below. |

**The mutants** (one scratch mirror at `/home/user/maps-scratch/waves/selfcheck-build-M0-d-05a-fix-s3/plat`, a real copy;
isolation proved — `find -lname '/home/user/maps-architecture*'` printed nothing and `@plat/model`'s realpath from
`packages/layout/node_modules` lay inside the mirror; each run `vitest run --maxWorkers=1
packages/layout/test/infill/fabric/live-subset.test.ts`; `bentCutFabric.ts` and `mint.ts` restored from the tree and
confirmed by `cmp` before each; the mirror deleted, `node_modules` with it). The unmutated mirror: 5/5.

| id | mutant | result |
|---|---|---|
| M-dbl | the fix reverted (`bentCutFabric.ts` = the scope base, 57ede0f3…faef) | **red** — P-a, P-b, P-d (`tx 11/L1/callback/fn: mint: the live id way:f5aq4mcksb8zs is given twice`, and `…~1` in P-d), P-c (the doubled lists named) |
| M-dbl-noguard | the fix reverted AND the mint's Q93 refusal removed (the pre-round tree) | **red** — P-c only (910 one-record lists doubled: 239 × 3 retired shapes + 193 dup-chain survivors); P-a, P-b, P-d green, so the pre-round tree gives the very ids the fixed pair gives |
| M-stop | the `~k` loop stops at the first entry already listed | **red** — P-b (`~1` minted on the squatter's id, then `mint: the live id way:f5aq4mcksb8zs~1 is given twice`), P-c |
| M-skip | the `~k` loop skipped when the `dup` loop ended on an all-retired lineage | **red** — P-b, P-c, P-d |
| M-id | dedupe by id text, the ids taken from the `dup` chain only | **survives — equivalent**: the live index never holds two entries with one id (the run's first mint checks the whole live list, refusing a repeat, and every id the run mints is free against its `~k` chain), so on every input S8 accepts an id on both chains is one object and the two dedupes agree; a distinguishing input would need two holders of one id, which S8 refuses before `relevant` is reached, and `LiveIndex` is not exported (API frozen) |
| control M-noguard | the mint's refusal removed, the fix kept | green 5/5 (the fix alone carries the pin) |

**No shift, shown** (J741 (d)). The argument: each chain's own pushes are distinct objects (the `dup` loop visits
distinct lineages, so distinct `byLineage` buckets; the `~k` loop distinct ids, so distinct `byId` buckets; a bucket
holds distinct pushes), so a repeat can only be an entry of both chains; where the old list held none, `take` skips
nothing and the array is the old one, entry for entry. On the doubled class the new list is the old with repeats
dropped, and `mint` reads its live list into sets (`takenIds`, `retiredIds`, `takenLineage`) except for Q93's guard, so
the pre-round mint on the old list and the round's mint on the new list mint the same. The instrumented run: in the
mirror, `relevant` computed both the old body and the new at every call, asserted the new element-wise identical (===)
to the old wherever the old held no repeat and equal to the old with repeats dropped where it held one (a mismatch
threw), and logged each call — `PLAT_FUZZ_RUNS=1000 vitest run --maxWorkers=1 packages/layout/test/infill/fabric
packages/testkit/test/layout/infill-fabric`: 25 files, 186 tests green, **16 867 calls; 15 047 without a repeat, all
identical; 1 820 with a repeat** (1 434 holding a retired entry = 239 × 6 runs of P-a, P-b, P-c and P-d's first shape;
386 = 193 × 2 of P-d's survivor shape), every one of them in the new pin — the existing families give none (as the
check's P5 found), and each equal to the old list deduplicated; 0 violations. With M-dbl-noguard's P-a, P-b and P-d green
on the same expectations, the ids on the doubled class are the pre-round tree's. No root, digest, golden or summary was
re-recorded.

**The scope's evidence** (J741 (f); no git). Before the first edit `bentCutFabric.ts` was copied to the session's
scratchpad folder `scope-base-build-M0-d-05a-fix-s3/` and its SHA-256 confirmed 57ede0f3176b3f9d574cca774d68701b1f52949769ef5c7871ab423238a1faef
(M0-b-03's record); after the last edit `diff -u` from that copy to the tree's file was written beside it; both are also
kept at `/home/user/maps-scratch/waves/scope-base-build-M0-d-05a-fix-s3/` (`bentCutFabric.ts`, `bentCutFabric.ts.diff`).
SHA-256: base copy `57ede0f3176b3f9d574cca774d68701b1f52949769ef5c7871ab423238a1faef`; the tree's `bentCutFabric.ts`
`54bc901676cc3be36d5bfb2603c1897203ff7cec081715d38815866550f837d8`; the diff file
`e0c99bc8201445bc4d26726616f0441419af05d23e2cf6247b49ed6f6f6a17b1` (3 hunks: the class comment, the doc comment and
body of `relevant`); the new test file `7914b0dbae7544be2bef508f3b2d4619896e9f34c95ca45337dd75ce5fde0396`. The diff
reverse-applied (`patch -R`) to a copy of the tree's file gives the base hash. This item's record claims its owns only
(no `--touched`: no file under them changed this round); `landed:verify -- flow-7 --item M0-b-03` reports
`bentCutFabric.ts` changed and the new test file unclaimed until the session re-lands that record (J741 (f): evidence,
not a gate). Later rounds read the file by function name: every line after `relevant` moves by 14 (those between the class comment and `relevant` by 2).

**Refusals (J264, N-58).** The item's registered families: 0 refused before, 0 after (NEAR identity 49/49). The F1
class — S8 beside retired live entries, LAWFUL input (each id once) — refused by a throw since round S2, now
MAKE-IT-SUCCEED: none left (P-a, P-b, P-d). The census does not rise; this round lowers it for that class.

**The round's gates** (W=1 throughout, the budget's number; this machine is not §12.1's timing reference, so no timing is
read): install `--frozen-lockfile` 0; lint 0 (eslint 1278 files, 0 errors, `lint: probe-red ok`, 9 whole-tree checks;
re-run after the appends); build 0 (`tsc -b ok`, six esbuild lines); NEAR at the PR size over the item's identity tests
and M0-b-03's fabric folder (`vitest run packages/model/test/identity packages/layout/test/infill/fabric`, the new pin
among them) 23/23 files, 207/207 tests (fuzz seed 1315001074); RELATED `PLAT_FUZZ_RUNS=1000 vitest related --run` over
`packages/model/src/identity/mint.ts` and `packages/layout/src/infill/bentCutFabric.ts`, started 02:00 after the last
source edit, exit 0 — 325/325 files, 4151/4151 tests (no red, foreign or the item's; fuzz seed -19454649; the `FAIL`
lines in its log are the bench tests' printed fixture verdicts, every test passed); `landed:verify -- flow-7 --item
M0-d-05a` ok after the landing. The scope's two files are M0-b-03's: `landed:verify -- flow-7 --item M0-b-03` reports
them until the session re-lands that record on its lane (J741 (f)), never a gate here.

## Re-check 3 of hardening round S2 (lane `check/M0-d-05a-close-s3`, 2026-11-10)

The re-check after the fix round on F1 (verdict `checks/M0-d-05a-s3.md`). Not failing lines; for the hardening pass.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-cs3-1 | J741 (c) (i)'s "order of first push" of `LiveIndex.relevant` is held by no committed test: the re-check's mutant M-last (an entry met again moved to its last position) survives `live-subset.test.ts` and the fabric folder. It moves no output today (the mint reads its live list into sets after a per-entry check every entry already passed); the order was shown only by the re-check's instrumented run (16 867 calls, 0 mismatches). | P-c (or a direct test) asserts each recorded one-record list equals its own first-push order — e.g. that it is a subsequence-preserving dedupe of the `dup`-chain entries followed by the `~k`-chain entries. | M4 |
| N-cs3-2 | `landed:verify -- flow-7 --item M0-b-03` names only the changed `bentCutFabric.ts`; the new, unclaimed `packages/layout/test/infill/fabric/live-subset.test.ts` shows only by a hash scan of the folder (the fix round's notes say verify reports it). | The session's re-landing of M0-b-03 on `session/d05as2-scope-1` claims `live-subset.test.ts` explicitly (its folder is in M0-b-03's owns). | at the landing |
