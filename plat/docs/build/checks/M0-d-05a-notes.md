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
