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
