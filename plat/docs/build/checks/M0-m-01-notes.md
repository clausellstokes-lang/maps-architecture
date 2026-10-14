# M0-m-01 — notes (not failing lines)

These notes belong to item M0-m-01 (`@plat/model`'s types, records, schema order and stage declarations). The checks'
verdicts and their evidence are in `checks/M0-m-01.md` (the first check and its round r1) and, for the consolidation
round, `checks/M0-m-01-c1.md`. A note here is a map, a receipt or an observation for the session — never a failing line.

## Consolidation round C1 — the old → new map (lane `build/M0-m-01-consolidate-1`, 2026-10-11; J260, J263 Q8, J268 Q9)

Round R3 of `consolidation/model-tables-plan.md` (§1.3 M-1 – M-3, §2 C-model-1, §3.4). Types and comments only: no
exported name, signature, value, refusal text or snapshot changed. Line numbers are those of the tree before the round.

| finding | old (file:lines) | new |
|---|---|---|
| M-1 | `records/site.ts:4–5`, `network.ts:4–7`, `districts.ts:6–17`, `walls.ts:5–6`: the kernel-derived names from `'../types/index.js'`, and `Lifecycle` from `'../types/identity.js'`, `NameRef` and the vocabulary names from `'../types/vocabulary.js'`, `RaisedWayRecord` from `'../types/staged.js'` | one `import type { … } from '../types/index.js'` per file (the index re-exports `kernel.js`, `identity.js`, `vocabulary.js` and `staged.js`, all `export type *`); `seam.ts:5` already had the one form; a sibling stays a file import (`./network.js` in `seam.ts` and `districts.ts`) |
| M-1 | `schema/kinds.ts:4–8`: the records by file (`../records/districts.js`, `network.js`, `seam.js`, `site.js`, `walls.js`) | one `import type { … } from '../records/index.js'` |
| M-1 | `schema/order.ts:9`: `EntityKind` from `'../types/vocabulary.js'` | from `'../types/index.js'` |
| M-1 | `stage/decl.ts:11–16`: `'../types/index.js'`, `'../types/identity.js'` (`EditId`), `'../types/vocabulary.js'` (`EntityKind`, `Rung`), `'../records/walls.js'`, `'../records/site.js'`, `'@plat/kernel'` | `'@plat/kernel'` (`KernelResult`), `'../records/index.js'` (`Bridge`, `WaterBody`), `'../types/index.js'` (the rest, sorted) |
| M-1 (pin) | — | `types.test.ts` "a module of another folder is imported through that folder's index; a sibling by its file; a package by its name" (new `it` in the new describe "model/src/{types,records,schema,stage}: one import path per type, and comments that state the design") |
| M-2 | `stage/vocab.ts:56–65` `ceilLog2`, `lawLimit` | KEPT (the one doubling loop; `tables/src/workLimits/law.ts` reads `lawLimit` through `@plat/model`; `ceilLog2Spec` and the property test stay oracles apart) |
| M-3 | `schema/order.ts`, `schema/staged.ts`, the record declarations | KEPT (one declaration per design name) |
| C-model-1 | `stage/decl.ts:6–10`: "… the kernel's not yet landed when this item lands (Plat, M0-a-02; Stream, M0-d-01; the Kernel façade, M0-a-16) …" | the slots as they stand: the types §14's StageContext and Stage name that `@plat/model` does not declare (the kernel's Plat, Stream and Kernel façade; `@plat/tables`' TableView and RungProfile; `@plat/layout`'s report sink and model view; the document, M1), one environment parameter, `unknown` by default, bound once by the package that has the types (`PipelineEnv` in `@plat/layout`; a stage package below it binds the slots its stages read) — C-0142 (5) |
| C-model-1 | `stage/decl.ts:48–51` (`BatchScope`): "its move to the kernel's types, re-exported here, is C-0142 (8)'s open case for M0-a-06" | "The kernel declares the same union for §3.3's KernelTx.batch (kernel/src/tx, C-0112's pattern); test/stage/ holds the two equal" — pinned in `stage.test.ts` "Scope is §14's and BatchScope §3.3's" (`expectTypeOf<BatchScope>().toEqualTypeOf<KernelBatchScope>()`, green on the sources before the round too) |
| C-model-1 | `types/kernel.ts`, `types/identity.ts`, `types/vocabulary.ts`, `types/staged.ts`, `records/*.ts`, `schema/*.ts`, `stage/vocab.ts`, the four indexes | stand (each states the design and cites its rows) |
| C-model-1 (pin) | — | `types.test.ts` "no comment narrates a round, a check or a landing (the history is in docs/build/checks/)" (new `it`) |
| §3.4 tests | `test/types/types.test.ts:207` "§2.8's event words, each pinned (the check's N-2)"; `:1–5` the header | "§2.8's event words, each pinned"; the header names the two new guards |
| (gate) | `test/types/types.test.ts:124–144` "reflection over the list: …" on vitest's 5 s default | the same `it` with a 60 s timeout: a whole-program type check of `model/src` and the kernel source it reads, which ran past 5 s on a loaded machine (the timing-only red other seats' RELATED runs recorded, 2026-10-04 – 10-05); its assertions unchanged |

No test file was merged, split or renamed (§3.4: one subject per file). Every `describe`/`it` title is kept verbatim
(types 11, dom 4, records 5, schema 6, stage 15 title lines before; none missing after; types gains one describe and
two `it`s). `schema-order.json` is byte-identical.

Mutant map (the earlier rounds' mutants of `checks/M0-m-01.md`, re-killed by the consolidated tests in a scratch mirror,
`tsc -b packages/model/test` then `vitest run --bail=1` over the four test folders):

| mutant | killed by |
|---|---|
| A1 – A4 (new: `Lifecycle` from `../types/identity.js` in `site.ts`; `EditId` from `../types/identity.js` in `decl.ts`; `Seam` from `../records/seam.js` in `kinds.ts`; `EntityKind` from `../types/vocabulary.js` in `order.ts`) | "a module of another folder is imported through that folder's index; …" |
| A5 (new: `export *` for `identity.js` in `types/index.ts`) | "model/src/types: a grep test over every file, and its transpiled output" |
| A6 (new: `walls.ts`'s import without the `type` modifier) | "model/src/records: a grep test over every file, and its transpiled output" |
| B1, B2 (new: "not yet landed when this item lands" back in `decl.ts`; "the check's N-4" in `order.ts`) | "no comment narrates a round, a check or a landing …" |
| B3 (new: `BatchScope`'s `edit` typed `string`) | `tsc` on "Scope is §14's and BatchScope §3.3's" |
| R1, R4, R12, R14 | `tsc` on `schema.test.ts:91`, `records.test.ts:163`, `:123`, `:134`/`:161` |
| R6, M4, M11 | "each kind's order is the design's field list in its order, less the header, the digest-excluded and the staged fields" |
| R9 | `tsc` on `types.test.ts:210` (the `LifecycleEvent.kind` pin) |
| P2, P16 | `tsc` on `records.test.ts:114`, `:145` |
| P7 | "the log2 form uses ⌈log2(count)⌉; count 0 and 1 give the floor" |
| P8, P15 | `tsc` on `types.test.ts:122`, `:118` (the re-export assertions) |
| P9 | `tsc` TS2308 in `types/index.ts` |
| P12, P13 | `tsc` on `schema.test.ts:80`, `stage.test.ts:157` |
| P17 | "STAGE_IDS is C-0020's registration order: …" |

25 mutants, 25 red. The two new guards are red on the pre-round sources (2 of 35) and green after; the pre-round test
files run green on the new sources (33 of 33).

NO-SHIFT receipt (a probe run on the tree before and after the edits, TypeScript 6.0.3 from `plat/node_modules`): the
emitted JS of every file of `src/types`, `src/records`, `src/schema` and `src/stage` (`transpileModule`, comments
removed — the type-only imports erase), the exported names of `src/index.ts` (229, with each name's value/type flag and
declaring file), `types/index.ts` (64), `records/index.ts` (34), `schema/index.ts` (9) and `stage/index.ts` (20) through
the checker, the checker's text of every exported type with its properties, and 0 diagnostics — 3 209 lines,
byte-identical (sha256 `12da3e341be682aa…`); the runtime values (`M0_KINDS`, `SCHEMA_ORDER` with each kind's frozen
flag, `DIGEST_EXCLUDED`, `STAGED`, `STAGE_IDS`, `DATA_KEYS`, `schemaOrder` over the 15 kinds and 4 refused kinds,
`lawLimit` over 5 laws × 17 counts and 2 bad laws, the runtime names of the four folder indexes and of the barrel) —
117 lines, byte-identical (sha256 `152bc1aefad07c9e…`). Lawful-input refusals of the item's operations: 0 before,
0 after (`schemaOrder` over `M0_KINDS`, `lawLimit` over finite counts ≥ 0); the refusals of unlawful input
(`schemaOrder` of a kind with no M0 schema, `lawLimit` of a negative, NaN or infinite count or a non-finite law) keep
their texts.

Observations for the session (no change in this round):

* The plan's suggested wording for C-model-1 placed the kernel's `Plat`, `Stream` and `Kernel` among "the types that
  live above or beside `@plat/model`"; §14 orders `kernel ← model`, so the comment says instead which types
  `@plat/model` does not declare and who binds them.
* `kernel/src/tx/types.ts:4–6` says `@plat/model`'s `BatchScope` "can become a re-export" of the kernel's. The two are
  now held equal by a type test; turning the declaration into a re-export would change no exported name but is a
  change of declaration home (C-0112's pattern), left to an API-surface decision after the pass (the plan's Q7).

## Closing check of consolidation round C1 — notes (lane `check/M0-m-01-consolidate-close-1`, 2026-10-12)

Observations of the closing checker (`checks/M0-m-01-c1.md`); none is a failing line (the brief's blocker rule).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N-c1-1 | The no-narration guard (`types.test.ts` "no comment narrates a round, a check or a landing …") scans `model/src/{types,records,schema,stage}` only, by a deny-list regex. The item's own test files are outside it (the one narration this round removed from a test, "(the check's N-2)" in `types.test.ts`, would not have been caught), and narration phrased otherwise escapes (a probe line "added in wave 3 by the author" is not matched). | Extend the scan to `test/{types,records,schema,stage}` and share one pattern list with the other packages' comment guards when the hardening pass writes them. | M4 |
| N-c1-2 | The import-path guard (`types.test.ts` "a module of another folder is imported through that folder's index; …") reads the module specifiers of `import` / `export` declarations only; an inline type query `import('../types/identity.js').Lifecycle` in a type position would carry a second path past it (a deliberate-writer escape: no file of the four folders uses one). | Walk `ImportTypeNode`s too (`ts.isImportTypeNode`, its `argument.literal.text`) under the same rule. | M4 |

## Hardening round S1 (lane `build/M0-m-01-fix-s1`, 2026-10-14; J237 (2), J264, J290 / N-58)

The session's hardening round of the item: the FIX-NOW rows `M0-m-01:83 N-c1-1` and `M0-m-01:84 N-c1-2` of
`checks/hardening-inventory.md`, and the queue rows L3, L4 and L30 of `docs/M0-FIX-QUEUE.md`. Every edit lies inside the
item's owns; the halves of L4 and L30 that sit in other items' files are REPORTED below. Choices row: C-0371.
Mutants ran in the lane's mirror (a real copy of `plat/`, isolation proven: no link into the tree, `@plat/kernel`
resolving inside the copy), each restored from the tree and `cmp`-checked before the next; `tsc -b packages/model/test`
for a type mutant, `vitest run --maxWorkers=1 --bail=1` over `test/{types,records,schema,stage}` for every mutant.

| row | outcome | what changed | pin and mutant (red with the fix; the receipt without it) |
|---|---|---|---|
| N-c1-1 (scope) | FIXED, PINNED | The no-narration guard (`types.test.ts` "no comment narrates a round, a check or a landing …", title kept) scans every line of `src/` AND `test/` of types, records, schema and stage — the pattern list's own file by its comment lines only (its code holds the patterns and their probes) — and asserts the scan reached `src/stage/decl.ts`, `src/records/site.ts` and the five test files. | K1 ("(the check's N-2)" put back in `types.test.ts`'s comment): red at `test/types/types.test.ts:235`; the round-C1 guard passes it (vitest exit 0). K4 (the test folders dropped from the scan): red ("expected […] to include 'test/types/types.test.ts'"). K5 (narration in the list file's comment): red. |
| N-c1-1 (phrasings) | FIXED, PINNED | One pattern list, `test/types/narration.ts` (`NARRATION`, eleven named phrase-specific patterns, each with the probe it exists for; `narrationIn(line)`): a landing; a round, pass or phase; a check or its checker; a note's, failing line's or blocker's id (`N-…`, `F-…`, `B-…`, `N-c1-2` forms); a ledger or queue id (`L-0447`, `Q30`); a wave, flow or stage group; a lane key; a person of the build (author, builder, seat, steward; "by the session"); a change told as history ("renamed during the consolidation"); a line's earlier text (previously, formerly, no longer); the scaffold as an actor. `NARRATION_CAUGHT` (18 lines: every phrase the C1 regex caught and the escapes) must match; `DESIGN_WORDS` (9 lines of the folders' own design prose: a sky landing, `baseLane`, unrounded, a `check:` field, `J156 (2)`, `J-P2`, `MFP-10`, `B-FUZZ`, the round caps) must pass. A citation of an owner's ruling (`J156 (2)`, three lines of `src/schema` and `src/types`) is the authority a line rests on, as a choices row is, and passes. | New `it` "the pattern list catches each probe, every phrase the first deny-list caught and the phrasings that escaped it, and passes the design's own words". K2 ("// added in wave 3 by the author" in `src/records/walls.ts`): red (three patterns); the C1 guard passes it (exit 0). K3 (the wave pattern emptied): red on its probe. B1 (C1's B1, "not yet landed when this item lands" in `decl.ts`): red. |
| N-c1-1 (share) | REPORTED (the home) | The list is one exported module so a second guard reads it rather than copying it. No other package has a comment guard yet (a search for `narrat` over `packages/`, `tools/` and `bench/` finds only this item's files). A package's test project may not import `@plat/model`'s `test/` folder (the project graph of C-0124), so the list's shared home for the hardening pass's other guards — `tools/` or `@plat/testkit` — is outside this item's owns: the session names it; the move is a copy of `narration.ts` and one import line here. | — |
| N-c1-2 | FIXED, PINNED | `moduleSpecifiers(sf)` walks the whole tree, not the top-level statements: `import` / `export` declarations, `import x = require('…')`, an inline type query `import('…').T` in any type position (`ts.isImportTypeNode`, its `argument.literal`), and a dynamic `import('…')`; a specifier that is no string literal is reported `<computed>` and fails the rule. The guard's message names file and line. | I1 (`lifecycle: import('../types/identity.js').Lifecycle` in `records/site.ts`, the C1 checker's probe): red ("records/site.ts:76 imports '../types/identity.js'"); the C1 guard passes it (exit 0). New `it` "the walk sees every form of module specifier …" over a six-line probe; I2 (the `ImportTypeNode` branch removed), I3 (dynamic import), I4 (`import = require`): red. |
| L3 (C-0220 (11)) | FIXED, PINNED | `types/kernel.ts` re-exports `ArenaKey`, `TransientKey` and `CarryMap` from `@plat/kernel` (declared in `kernel/src/facade/types.ts`). The queue row names two; C-0112 (3) – (4) and C-0220 (11), its source, name three, so the round takes three (the note's need over the row's wording). | `types.test.ts`: the three `expectTypeOf` equalities with the kernel's, and a new `it` "the façade's three …: … resolve to their declarations in kernel/src/facade" (one shared program with the C-0112 reflection test, 60 s). R1 (`CarryMap` dropped): tsc TS2694 and vitest red. R2 (`ArenaKey` declared in `types/kernel.ts` instead): red (declared in model, not the façade). On the before sources: tsc 3 × TS2694, the new `it` red. |
| L4 (C-0245 (14)) | FIXED (model); REPORTED (layout) | `records/districts.ts` declares §9.1's `QuarterNode` (§14 places it in `@plat/model`): `id`, `members: Id[]`, `children: [Id, Id] \| null`, `name: NameRef`, `spine: Polyline` (= `PointCm[]` = the kernel's `LatticePoint[]`), `cityCut: boolean` — the fields and types of `layout/src/districts/types.ts:133`'s declaration, so the two are one type structurally. It is no M0 record kind: `M0_KINDS`, `RecordOf` and `schemaOrder` are unchanged. REPORTED: replacing `layout/src/districts/types.ts`'s own interface by `import type { QuarterNode } from '@plat/model'` (its `districts/index.ts` re-export line can stay) is M0-e-04's file. | `records.test.ts` new `it` "§9.1's QuarterNode, which a District's quarter names: …; its one position path the label spine" (the field set; `PositionPaths<QuarterNode>` = `'spine[]'`, the label spine, §9.1's world-cm label geometry; `District['quarter']` its id; no record kind). Q1 (`cityCut` renamed), Q2 (`spine: Polyline[]`), Q3 (unexported), Q4 (`children: Id[] \| null`): tsc red. On the before sources: TS2305. |
| L30 | FIXED (model); REPORTED (the copies) | `stage/lifecycle.ts`: `generatedLifecycle(epoch: number): Lifecycle` — `{ existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch, seq: 0 } }`, the copies' literal in their key order, a fresh unfrozen object per call; `−0` written as `0`; a RangeError `generatedLifecycle: epoch <e> is not a whole number ≥ 0` for an epoch that is negative, fractional, NaN, infinite or above 2^53 − 1. Exported by `stage/index.ts` (one line) and so by the barrel. Its home is `stage/`: `types/` and `records/` hold no runtime export by their own tests, and the stamp is what a stage writes on a record it generates. REPORTED, each the owning item's file: `site/src/terrain/heightfield.ts:41` (`generatedLifecycle`, read by `hydro/strategy.ts:546` and `water/faces.ts:85`; M0-e-01), `layout/src/enceinte/water.ts:323` and `layout/src/infill/bentCutFabric.ts:1036` (`generated`), `model/src/digest/workload.ts:58` (M0-d-04's `LIFE`, a frozen shared constant for its synthetic workload — not a record writer, so it may keep its constant), and testkit's `edge/s8.ts:37`, `edge/rows.ts:279`, `ladders/support.ts:141`. A writer switching to the builder writes the same object for every whole epoch ≥ 0 (no digest moves) and inherits the refusal of an unlawful epoch. | `stage.test.ts` new describe "the lifecycle stamp of a generated record (§2.8)" (four `it`s: the stamp against a written-out oracle with `toStrictEqual` and the JSON key order; a fresh unfrozen object, written on without leaking; a fast-check property over `fc.maxSafeNat()`; the refusals, message verbatim). G1 (seq 1), G2 (frozen), G2b (one shared flags object), G3 (no check), G4 (key order), G5 (−0 kept), G6 (refuses 0), G7 (`isInteger`: 2^53 accepted), G8 (message), G9 (not exported): red. On the before sources: TS2305 and the four `it`s red. |

27 targeted mutants, 27 red (K1 – K5, B1, I1 – I4, R1, R2, Q1 – Q4, G1 – G9, G2b). The round's new tests on the
pre-round sources: tsc 6 errors, vitest 5 failed of 43; on the round's sources 43 of 43.

API (J263 Q1, rows that ask for it): `@plat/model`'s barrel gains the value `generatedLifecycle` (L30) and the types
`ArenaKey`, `TransientKey`, `CarryMap` (L3) and `QuarterNode` (L4); `stage/index.ts` gains one export line,
`types/kernel.ts`'s list three names, `records/districts.ts` one interface. Nothing removed or renamed; no message text
changed. NO-SHIFT: no existing output moves — `types/` and `records/` still emit nothing (their no-runtime tests),
`vocab.ts` and `decl.ts` are unchanged, `schema-order.json` is byte-identical; no digest or golden is re-recorded.

Refusal census (J264, N-58), a runtime probe over the item's operations, before and after: lawful 100 refused 0 →
lawful 108 refused 0 (`schemaOrder` over the 15 M0 kinds; `lawLimit` over 5 laws × 17 counts; after, also
`generatedLifecycle` over 8 whole epochs 0 … 2^53 − 1); unlawful 10 refused 10 → 16 refused 16 (`schemaOrder` of 4
kinds with no M0 schema, `lawLimit` of 4 bad counts and 2 bad laws; after, `generatedLifecycle` of −1, 0.5, NaN,
∞, −0.0001, 2^53). Each unlawful class: UNLAWFUL → REFUSE, a typed RangeError naming the value; no user reaches it
through §11.4's doors (the kinds, the laws and the epoch are the build's own values). Lawful refusals 0 → 0.

Observations (no change): (1) a JSDoc type `/** @type {import('…').T} */` is not walked — TypeScript ignores JSDoc
types in a `.ts` file, so it carries no second path; (2) the deny-list stays a deny-list: a narration phrased past all
eleven patterns still passes (a hardening KI, the guard failing safe — it never refuses a design line the
`DESIGN_WORDS` fixture holds).
