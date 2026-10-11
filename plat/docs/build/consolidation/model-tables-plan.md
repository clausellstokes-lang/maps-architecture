# @plat/model and @plat/tables — consolidation plan (lane `session/consolidation-model-tables`, flow-7)

Written by the consolidation architect seat under docs/PROGRESS.md J260 and J263 (the owner's directive of 2026-10-11:
"clean up, consolidate, make elegant and coherent the code and comments, and make sure it stays at the same quality or
higher") and J112's rule (elegance without losing nuance; every unification carries a full EQUIVALENCE LIST; a nuance
lost is a blocker). This seat planned only: no code, test or data file was changed and no test suite was run. Evidence
is the code, the tests and the records — `checks/M0-s-02.md` and `-notes.md`, `checks/M0-f-03a.md`, `-s2.md` and
`-notes.md`, `checks/M0-m-01.md`, `checks/M0-d-04.md`, `-s1.md` and `-notes.md`, `checks/M0-d-05a.md` and `-notes.md`,
`checks/M0-d-05b.md` and `-notes.md`, `checks/M0-spec-notes.md` N-18, N-19, N-56, every choices row the two packages'
comments cite — read whole under `plat/CLEAN-ROOM.md` §1, with the design's §1.1, §2.1, §2.3, §2.8, §3.3, §5.1, §6.1 –
§6.3, §6.5, §7.6, §14 and §17.1 (6).

Conventions. `model/…` is `plat/packages/model/…` and `tables/…` is `plat/packages/tables/…`; line numbers are those of
the tree read on 2026-10-11. "Public API" means every name a folder's `index.ts` exports: both packages' `src/index.ts`
do `export *` from every folder index (model: `types`, `records`, `schema`, `stage`, `identity`, `match`, `digest` —
131 names; tables: `loader`, `cell`, `workLimits` — 83 names), so **every folder-index export is a public export**. The
invariant of this whole plan, as J263 Q1 rules for the kernel: **no exported name is added to, removed from or renamed
in any folder index, no signature or behaviour of an exported name changes; every item-listed interface (M0-work.json
`interfaces`) is untouched; every persisted form — the model digest's leaf, node, layer and root lanes, the records
digest's, the lineage lanes and the token, the table pinning hashes and `SliceRef.hash`, the timing-record shapes —
and every data file (`tables/data/*.json`: every cell's value, unit, provenance, calibratable flag, note, extension and
presets, every table's version and `golden.json`'s pins, the `workLimits.json` PIN of C-0301) is byte-identical;
every refusal code and message text a test pins is unchanged.** Consolidation acts on non-exported helpers, on the bodies
behind exported names, on comments and on tests; a helper two folders share is **exported from its file and imported by
path** (`../cell/cell.js`, `../loader/census.js`, `../identity/lineage.js`), never added to an index — the convention
J263 Q1 fixed for the kernel's `num/exact.ts`.

Scale. These two packages are small and young beside the kernel: 3 400 source lines and 4 900 test lines in all, one
fix round on M0-s-02 (C-0162), two on M0-f-03a (L-0120, C-0301), one on M0-m-01 (C-0145), one plus a session round on
M0-d-04 (C-0194, C-0305), one on M0-d-05a (C-0184) and one plus a timing fix on M0-d-05b (C-0190, C-0195). The code is
coherent; the patchwork is thin and local: a handful of predicates written three or four times, two census loops, one
issue builder written five ways, three test files each re-inventing `refusal`, four copies of one generator, and a
dozen comments that narrate a check, a note or a round instead of stating the rule. Nothing found is a behaviour bug.

---

## 0. Summary and round order

**What was found, by kind.**

* **Tables, one grammar written twice.** The stable-key grammar `^[A-Za-z][A-Za-z0-9_.\-]*$` is `KEY_VALUE` in
  `cell/cell.ts:73` and `CELL_KEY` in `loader/table.ts:39`; the non-empty-text predicate is `nonEmptyString`
  (`cell.ts:100`) and an inline `typeof … === 'string' && ….trim().length > 0` (`table.ts:56`); the `TableIssue`
  builder (`{ table, row?, cell?, reason }` with absent keys left absent) is written as a three-way conditional in
  `table.ts:44–46` (`checkTable`), `table.ts:158–160` (`Table.refuse`) and `workLimits/table.ts:49–51`
  (`checkWorkLimits`) and as bare literals at `table.ts:247`, `view.ts:41`, `ladder.ts:75, 117, 120, 123` and
  `workLimits/table.ts:121, 196, 201–204`; the calibratable census loop is `loader/census.ts:12–14` and
  `workLimits/table.ts:220–224` line for line; the unit list is written twice (`unit.ts:6–33` the type, `36–64` the
  const), as are §7.6's `extension.over`, `extension.mode` and preset ids (`cell.ts:17–20` the types, `69–71` the
  sets); the thirteen table ids are written twice (`registry.ts:20–34` and `39–53`).
* **Model, one predicate written four times.** `isU32` is at `identity/lineage.ts:34`, `identity/address.ts:22`,
  `identity/mint.ts:95` (an `unknown`-typed form) and `match/match.ts:47`; `match.ts:48`'s `cmpId` is the kernel's
  `compareKeys` (`kernel/src/arena/keys.ts:13`) expression for expression; "a `Hash128` as four lanes" is
  `writeHash` (`digest/model.ts:101`) and inline at `digest/leaf.ts:149`, `digest/records.ts:87` and `:93`;
  "are two `Hash128` equal" is `sameHash` (`model.ts:582`) and `same` (`timing.ts:51`); "a frozen copy of a lineage
  hash" is the cast idiom `Object.freeze([a, b]) as unknown as Readonly<LineageHash>` at `match/carry.ts:63` and
  `match/match.ts` 567, 568, 574 (plus `synthetic.ts:114`); mulberry32 is written in `digest/workload.ts:39–49`,
  `match/synthetic.ts:42–51`, `test/digest/support.ts:132–141` and `test/match/support.ts:7–16`; `hex` in three digest
  tests.
* **Comments that narrate.** Both `src/index.ts` say "the package exports nothing yet" (false since wave 3);
  `digest/index.ts:4` and `match/index.ts:2–3` tell that the scaffold created the index empty; `digest/model.ts:19`
  cites "N-56 (5)"; `digest/canonical.ts:3` "the checker's source scan"; `match/carry.ts:5, 52` cite "M0-d-05a's note
  N-2"; `stage/decl.ts:7–9` describes which kernel items "had not yet landed when this item lands";
  `tables/src/workLimits/table.ts:8` narrates "(N-56 (4), C-0301, version 2)"; `cell/unit.ts:2` "the design
  correction of 2026-10-03, M0-spec-notes N-18"; `cell/cell.ts:72` "the checker's"; and in tests
  `test/workLimits/table.test.ts:127–128, 171, 191–193`, `test/digest/model.test.ts:4`, `test/identity/mint.test.ts:5`
  tell the round that added them.
* **Tests.** Every file is one subject; no merges are needed. The patchwork is in the support: `refusal` written four
  ways (`tables/test/cell/cell.test.ts:17`, `loader/loader.test.ts:17`, `loader/ladder.test.ts:141`,
  `workLimits/table.test.ts:45`), a deep copy of a shipped table three ways (`loader.test.ts:29`, `ladder.test.ts:140`,
  `data/tables.test.ts:44`), the version/PIN law of C-0157 (2) and C-0301 implemented twice (`data/golden.test.ts:25–40`
  over `golden.json`, `workLimits/table.test.ts:190–200` over an inline pin), the one-cell fixture table twice
  (`cell.test.ts:12–14`, `loader.test.ts:27`); in the model, `hex` ×3, mulberry32 ×2, the generated-lifecycle literal ×2.
* **The data files** (`tables/data/*.json`): every cell of the fourteen files carries `{ value, unit, provenance,
  calibratable }` in that key order with the optional markers after it (`extension`, `presets`, `note`), one cell per
  line, the `settings` row convention of C-0153 (2) throughout; the metadata cells of `workLimits.json` (`unit`, `log2`)
  take unit `none`, provenance `architecture 2026-10-03` and `calibratable: false` on every row. **No cell is written in
  a second shape.** Two observations go to the session (§5 Q8), neither a change in this pass.

**Round order** (one Opus seat per work item, inside its `owns`; a round depends only on the rounds listed):

| # | Round (work item, owns) | Depends on | What it does (findings) |
|---|---|---|---|
| R1 | **M0-s-02** — `tables/src/cell/`, `tables/src/loader/`, `tables/test/cell/`, `tables/test/loader/`, `tables/test/data/` | — | T-1 … T-9 (the shared grammar, text predicate, issue builder, census, the derived vocabularies and id list, the slice hashes in one file); comment rewrite C-tables-1 … 4; test plan T-tests-1 (the one `test/loader/support.ts`). The home of every tables helper R2 imports. |
| R2 | **M0-f-03a** — `tables/src/workLimits/`, `tables/test/workLimits/` | R1 | W-1 … W-4 (imports R1's `issueAt`, `tableCensus`, `refusal`, `pinnedFile`; comment rewrite C-tables-5; test comments). **Runs before M0-f-03b's hand-over lands**, so that the hand-over meets the consolidated tests; see Q2 for the placeholder pins the hand-over will turn red regardless of this pass. |
| R3 | **M0-m-01** — `model/src/types/`, `records/`, `schema/`, `stage/`, their tests | — | M-1, M-2 (import-path consistency of `Lifecycle`; the one `EditId` re-export form); comment rewrite C-model-1. Types only — the smallest round. |
| R4 | **M0-d-05a** — `model/src/identity/`, `model/test/identity/` | — | I-1 … I-3 (`lineage.ts` becomes the home of `isU32`, `isU16`, `isObject`, `copyLineage`; `address.ts` and `mint.ts` import them); comment rewrite C-model-2; test comments. |
| R5 | **M0-d-05b** — `model/src/match/`, `model/test/match/` | R4 | X-1 … X-5 (`cmpId` → kernel `compareKeys`; `isU32` and `copyLineage` from `identity/lineage.ts`; the three `ratio` wrappers named for what they are and kept apart; mulberry32 kept — Q3); comment rewrite C-model-3. |
| R6 | **M0-d-04** — `model/src/digest/`, `model/test/digest/` (and `kernel/src/digest/`, `kernel/test/digest/`, which the kernel plan's R13 already covers — this round touches the model half only) | R4 (optional: `isU32` for `leaf.ts:88`) | D-1 … D-5 (`writeHash128` and `sameHash` in `encode.ts` for `leaf.ts`, `model.ts`, `records.ts`, `timing.ts`; the generated-lifecycle and `hex` helpers in `test/digest/support.ts`); comment rewrite C-model-4; test plan T-tests-2. |
| RS | **M0-s-01's two lines** — `model/src/index.ts:1–2`, `tables/src/index.ts:1–2` (comment only) | — | C-index: the false "exports nothing yet" sentence. The files are the scaffold's (C-0013, M0-s-01's owns), outside every round above: Q1 asks the session who edits them. |

R1 before R2 because `workLimits/table.ts` and `workLimits/table.test.ts` import what R1 creates. R4 before R5 because
`match.ts` imports `identity/lineage.ts`'s predicates. R3, R4 and R6 are independent of each other and of the tables
rounds; every round is independent of the kernel's rounds (the two packages import the kernel's public names only,
which the kernel plan freezes). None of the model rounds waits for M0-f-03b; R2 should land before it (above).

---

## 1. Findings per folder

Each finding: **where** (file:lines) · **consolidation** · **EQUIVALENCE** (what stays identical: outputs, digests,
hashes, data, refusal codes and message texts, exported names and signatures) · **NUANCE** (every behaviour, bound,
ordering and edge case the merged code keeps) · **ORACLE** (the tests, goldens, snapshots and seeds that prove zero
shift; the checks' mutants the merged tests must still kill; any new pin) · **RISK** · **ruling needed?**

### 1.1 `tables/src/cell/` and `tables/src/loader/` (R1, M0-s-02)

**T-1 — the stable-key grammar, written twice.** `cell/cell.ts:73` `const KEY_VALUE = /^[A-Za-z][A-Za-z0-9_.\-]*$/`
(a string value is one of our own keys, C-0153 (4)) and `loader/table.ts:39` `const CELL_KEY = /^[A-Za-z][A-Za-z0-9_.\-]*$/`
(a cell key is a stable key). `table.ts:38` `ROW_KEY = /^[A-Za-z0-9][A-Za-z0-9_.\-]*$/` is a **different** grammar (a
row key may begin with a digit: `loader.test.ts:48` reads rows `'2'` and `'10'`; the design's rows `era.default`,
`heading.organic` begin with letters, but the loader admits a numeric row key by this rule).
*Consolidation:* `cell.ts` exports from the file (not the index) `export const STABLE_KEY = /^[A-Za-z][A-Za-z0-9_.\-]*$/`
with the one sentence "our own keys: a letter, then letters, digits, `_`, `.` and `-`; no space and no prose — the
grammar of a cell key and of a key value (C-0153 (4))"; `valueProblem` tests `STABLE_KEY`; `table.ts` imports it by
path (`'../cell/cell.js'`) for the cell-key test and keeps `ROW_KEY` beside it with the comment "a row key may also
begin with a digit".
*EQUIVALENCE:* the regex source and flags are identical; every acceptance and refusal of a cell key or key value is
unchanged; the refusal texts `cell key '…' is not a stable key`, `value '…' is not one of our own keys` unchanged; no
index export changes (`cell/index.ts` lists neither constant).
*NUANCE:* `ROW_KEY` stays its own regex (digit-first allowed); `STABLE_KEY` is a module constant without the `g` flag
(no `lastIndex` state); the preset-value path (`cell.ts:143`) and the list-entry path (`cell.ts:91–94`) read the same
constant through `valueProblem`.
*ORACLE:* `test/cell/cell.test.ts` "refuses a calibratable that is not a flag, an unknown field and a prose value"
(`'two words'`), `test/loader/loader.test.ts` "refuses a row key or cell key that is not a stable key" (`'bad key'`,
`'1c'`), `test/data/tables.test.ts` "holds no colour value and no prose" (every string value against the same grammar,
a test-side copy that stays); mutants M17 (`P0` accepted — provenance, unrelated), M14 (unknown cell field) stay red.
*RISK:* none. No ruling.

**T-2 — the non-empty-text predicate.** `cell.ts:100–102` `nonEmptyString(x)` (used for `evidence` entries, `note`,
`ownerRule`) and `table.ts:56` `typeof raw.section === 'string' && raw.section.trim().length > 0` (the `section` field).
*Consolidation:* `cell.ts` exports `nonEmptyString` from the file; `table.ts:56` becomes
`if (!nonEmptyString(raw.section)) issue('section must name the design section');`.
*EQUIVALENCE:* the same predicate (`typeof === 'string' && trim().length > 0`); the message text unchanged; `section`
of `'  '` refused as before.
*NUANCE:* `trim()` — whitespace-only text is empty in both sites; `0` and `null` are not text.
*ORACLE:* `loader.test.ts` "refuses no section"; `cell.test.ts` "refuses them out of form" (`note: ' '`, `ownerRule: 3`);
mutants M01/M13/M14/M19 unrelated but stay red. *RISK:* none. No ruling.

**T-3 — the `TableIssue` builder, written five ways.** An issue is `{ table, reason }`, `{ table, row, reason }` or
`{ table, row, cell, reason }` with **no absent key present** (`TableError`'s message reads `first.row !== undefined`,
and the tests compare issues with `toEqual`, which ignores `undefined`-valued keys, so a stray `row: undefined` would
not fail a test today — but it would change `Object.keys(issue)` and any future JSON of an issue; the rule is "absent,
never undefined"). Written as a three-way conditional at `table.ts:44–46` (the `issue` closure of `checkTable`),
`table.ts:158–160` (`Table.refuse`) and `workLimits/table.ts:49–51`, and as literals at `table.ts:247`
(`no such table in @plat/tables`), `view.ts:41` (`not in this view`), `ladder.ts:75` (`refuseCell`), `117`, `120`, `123`,
`workLimits/table.ts:121, 196, 201–204`.
*Consolidation:* `cell.ts` exports from the file
`export function issueAt(table: string, reason: string, row?: string, cell?: string): TableIssue` building exactly the
three shapes (`row === undefined ? { table, reason } : cell === undefined ? { table, row, reason } : { table, row, cell, reason }`)
beside `TableIssue`; `checkTable`'s closure becomes `const issue = (reason, row?, cell?) => issues.push(issueAt(id, reason, row, cell))`,
`Table.refuse` throws `new TableError([issueAt(this.id, reason, row, cell)])`, `ladder.ts`'s `refuseCell` and the three
literals use it, `view.ts:41` and `table.ts:247` too; R2 does the same in `workLimits/table.ts` (W-1).
*EQUIVALENCE:* every issue object has the same own keys in the same insertion order (`table`, `row`, `cell`, `reason` —
the literal order the sites use today; `issueAt` must list them in that order so a `JSON.stringify` of an issue is
byte-identical); every `TableError.message` (`table 'cut', row 'settings', cell 'flattenM': lacks unit`, the
`(and n more)` suffix) unchanged; `TableError.table/row/cell/reason/issues` unchanged.
*NUANCE:* a `cell` without a `row` is never built (the signature's order forbids it, as today's conditionals do);
`issues` is frozen as a copy (`table.ts:33`) — unchanged; `checkTable` keeps its early returns (not an object → one
issue; no rows → one issue) and its order of checks (unknown top fields, `table`, `version`, `section`, rows, per row:
row key, then cells in `sortedKeys` order: cell key, then `checkCell`).
*ORACLE:* every `issues`/`message` assertion of `cell.test.ts`, `loader.test.ts`, `ladder.test.ts` (the layers
describe: `[e.row, e.cell, e.reason]` tuples), `workLimits/table.test.ts` (`e.issues[0]).toEqual({ table: 'workLimits', ...want })`
for fifteen cases, the `duplicate counter`/`duplicate cell`/`duplicate key 'version'` issues); mutants M01–M05, M12–M14,
M18–M20, M22 (M0-s-02 round 1), S01–S10 (close-r1), K06, K09–K11 (M0-f-03a) all read these messages — they stay red
because no text changes. **New pin (cheap):** one `it` in `loader.test.ts` asserting `Object.keys(e.issues[0])` equals
`['table', 'row', 'cell', 'reason']` for a cell issue and `['table', 'reason']` for a table issue (the "absent, never
undefined" rule, which nothing pins today). *RISK:* low. No ruling.

**T-4 — the calibratable census loop, written twice.** `loader/census.ts:10–16` `calibratableCensus(ids)` and
`workLimits/table.ts:220–224` `workLimitsCensus(t)` both do `for (const [rk, row] of t.rows) for (const [ck, c] of row) if (c.calibratable) out.push(`${id}/${rk}/${ck}`)`.
*Consolidation:* `census.ts` exports from the file `export function tableCensus(t: Table): string[]` (one table's
calibratable cells as `⟨table⟩/⟨row⟩/⟨cell⟩` in row then cell key order — the order `Table` holds them in, `sortedKeys`);
`calibratableCensus` becomes `for (const id of ids) out.push(...tableCensus(loadTable(id)))`; R2's `workLimitsCensus`
returns `tableCensus(t.table)` (W-2).
*EQUIVALENCE:* the same strings in the same order (`Table.rows` and each `Row` are `Map`s filled in `sortedKeys` order
by the constructor, `table.ts:147–152`; both loops iterate those maps); `calibratableCensus()`'s default `TABLE_IDS`
order unchanged; the 182-cell snapshot `test/data/calibratable-census.json` byte-identical; `workLimitsCensus()`'s 32
cells unchanged; `t.table.id` is `'workLimits'`, the id `tableCensus` reads from `t.id`.
*NUANCE:* a table whose id differs from the registry id cannot occur (`loadTable` refuses, `parseTable` checks
`raw.table === id`); `tableCensus` reads `t.id`, so a parsed fixture table (`parseTable('bands', …)`) reports under its
own id. *ORACLE:* `test/data/census.test.ts` (the snapshot, the count 182, the raw-file recomputation "and nothing
else, in table order then key order"), `workLimits/table.test.ts` "the census lists the calibratable cells (C-0070): 32";
mutants M15 (M0-s-02), M09 / M12 (M0-f-03a s2: the filter dropped; `warp.halvings/floor` counted) stay red. *RISK:*
none. No ruling.

**T-5 — vocabularies written as a type and again as a list.** (a) `unit.ts:6–33` `type Unit = 'm' | … | 'none'` and
`:36–64` `UNITS: readonly Unit[] = Object.freeze([...] as const)`. (b) `cell.ts:17` `ExtensionOver`, `:18` `ExtensionMode`,
`:20` `PresetId` and `:69–71` `OVERS`, `MODES`, `PRESETS` sets. (c) `provenance.ts:23` `REFERENCES` (`MFCG, FTG, NG, VG,
FM, Dwellings`) — a third list, **different from both** `PRESETS` (`MFCG, FTG, VG, FM, NG`: no Dwellings) and the
`over` words (`MFCG, FTG, VG, FM, both, none`): §17.1 (1)'s captured references, §7.6's parity presets and §7.6's
`extension.over` are three vocabularies by design.
*Consolidation:* (a) `export const UNITS = Object.freeze([ 'm', … , 'none' ] as const); export type Unit = (typeof UNITS)[number];`
— the form `bands.ts:13–14` already uses for `BAND_IDS`/`ProsperityBand` and `ladder.ts:13–14` for `BASE_RUNGS`/`BaseRung`.
(b) likewise `export const EXTENSION_OVERS = […] as const; export type ExtensionOver = (typeof EXTENSION_OVERS)[number]`
(file-level exports; `cell/index.ts` keeps exporting the three types only), the sets built from the lists
(`new Set<string>(EXTENSION_OVERS)`). (c) **KEEP APART**: three lists, three meanings; the comment at each says which
of the three it is and why the others differ.
*EQUIVALENCE:* the union types are the same 27 / 6 / 3 / 5 string literals (TypeScript's `(typeof X)[number]` over an
`as const` tuple gives the identical union); `UNITS` keeps its order and its `Object.freeze`; `isUnit`, the sets and
every message unchanged; `cell.test.ts` "pins the list word for word" compares the array — unchanged.
*NUANCE:* `UNITS` stays `readonly` and frozen; the type must stay a **string-literal union** (the checkers' line-1
comparison against §2.1's spelling is by name, unchanged); `REFERENCES` stays the `ref:` grammar's alternation
(`provenance.ts:25`).
*ORACLE:* `cell.test.ts` "the unit vocabulary is §2.1's list (N-18)" (both `it`s), "the optional markers" describe
(`over: 'NG'` refused, `XX` preset refused); `types`-level: `corepack pnpm build`. Mutants M02 (any unit word), M04 (any
`ref:`) stay red. *RISK:* none. No ruling (a type derived from a const is a form change only).

**T-6 — the table ids written twice.** `registry.ts:20–34` `TABLE_IDS` and `:39–53` `TABLE_SOURCES` list the thirteen
ids in the same order.
*Consolidation:* one ordered list of pairs `const SOURCES = [['ladder', ladder], …, ['terrain', terrain]] as const;
export const TABLE_IDS = Object.freeze(SOURCES.map(([id]) => id)) …` — **only if** `M0TableId` stays the same literal
union; with a JSON import in the tuple `as const` may widen the id to `string`, so the safer form is: keep `TABLE_IDS`
as the one `as const` list and build the map from it by a typed record `const JSON_OF: Record<M0TableId, unknown> = { ladder, granularity, … }`
with `TABLE_SOURCES = new Map(TABLE_IDS.map((id) => [id, JSON_OF[id]]))`. Either way one list of ids.
*EQUIVALENCE:* `TABLE_IDS` the same tuple in the same order (the census order, the view's hash order — `view.ts:33–35`
hashes `${id}@${version}:${hash}` lines in `tableView()`'s id order, so the order is a persisted-hash input and must
not move); `TABLE_SOURCES.get(id)` the same JSON objects; `isTableId` unchanged; `M0TableId` the same union.
*NUANCE:* `Object.freeze` on `TABLE_IDS` as today (`as const` arrays are readonly at the type level only; the runtime
freeze is what `golden.test.ts`/`census.test.ts` rely on? — they only read it; keep the freeze anyway).
*ORACLE:* `loader.test.ts` "every shipped table loads" (iterates `TABLE_IDS`, asserts `checkTable(id, TABLE_SOURCES.get(id))`
empty), `golden.test.ts` "pins exactly the thirteen tables", `loader.test.ts` "has one hash over its tables"
(`tableView(['cut','ways']).hash !== tableView(['ways','cut']).hash`). *RISK:* low (a typing slip is caught by `tsc -b`,
not by a test — the implementer runs the build). No ruling.

**T-7 — the two slice hashes live in two files.** `table.ts:110–122` `cellPinning`, `:125–129` `rowPinning`, `:229–231`
`rowHash` (H128 of the row's pinning content, **without** the row key) and `view.ts:57–67` `View.slice` computing the
one-field slice's hash inline as `H128(utf8Bytes(`${JSON.stringify(key)}:${cellPinning(c)}`))` (**with** the `'row/cell'`
key prefixed). Two forms for the two slice kinds, one of them in the view file.
*Consolidation:* move the cell-slice formula beside the row's: `table.ts` exports from the file
`export function cellSliceHash(key: string, c: Cell): Hash128 { return H128(utf8Bytes(`${JSON.stringify(key)}:${cellPinning(c)}`)); }`
(the `key` is the `'<row>/<cell>'` text as the caller cites it), and `view.ts:63–64` calls it. The asymmetry itself
(row hash without key, cell hash with key) is a **persisted-hash form (C-0157 (1), `SliceRef.hash`) and is NOT
changed**; the comment above the two functions states it plainly: "a row slice hashes the row's pinning content; a
field slice hashes its `'row/cell'` key and the cell's pinning content — the forms `SliceRef.hash` records (C-0157 (1)),
fixed".
*EQUIVALENCE:* the hashed bytes are identical (same template string); `view.slice(...)` returns the same `[h[0], h[1]]`;
`Table.rowHash` unchanged; `cellPinning`/`rowPinning` unchanged (they are public, `loader/index.ts:4`).
*NUANCE:* `key.indexOf('/')` splits at the **first** `/` (`view.ts:59`) — a row key containing `/` cannot occur
(`ROW_KEY` has no `/`); keep. *ORACLE:* `loader.test.ts` "§7.6's TableView" (row vs field hashes differ, two fields
differ, a missing cell refused naming it), "the pinning hash (§7.6)" describe; `bench/src/determinism/records.ts` reads
`tableView().slice` hashes into the determinism spike's records digest — the spike's digests are the cross-package
oracle (unchanged bytes). Mutants M10, M11 stay red. *RISK:* none. No ruling.

**T-8 — `ladder.ts`'s refusals.** `ladder.ts:74–76` `refuseCell(rung, cell, reason)` builds a cell issue; `:117`, `:120`,
`:123` build literals; `:79–83` `oneOf` is the one typed-word reader. All become `issueAt` (T-3); `isBaseRung` (`:70`)
stays (it is `BASE_RUNGS.includes`, the same form `report.ts:70` uses for `RUNG_ORDER.includes` — consistent).
*EQUIVALENCE/NUANCE/ORACLE:* as T-3; the village refusal text "the village rows of ladder.json are volume 7's (V07 §2.1;
deferred)" and "a rung profile reads the ladder table, not this one" are pinned by `ladder.test.ts` (`/volume 7/`,
`/reads the ladder table/`) — unchanged; mutants M22, S01–S10 stay red. No ruling.

**T-9 — `bands.ts` — KEEP.** `refuse()` throws `RangeError('band reading: …')` (not a `TableError`): the band readings
are arithmetic over a `BandRows` value the caller already read, not a load; `bands.test.ts` pins `/differ in shape/`,
`/no band of the set has a row/`, `/finite/`, `/one cut fewer/`, `/ascend/`, `/not a band/` by regex. Kept apart from
`TableError` on purpose (the comment says so). `bands.ts:104`'s `eslint-disable` directive is vetted (`checks/M0-s-02.md`
round 1's note N-5) — kept with its reason line. `middleBand`'s default argument reading `bandRows('bands', 'share')` at
call time (not at module load) is a nuance to keep: the table loads lazily, after `loadTable`'s check.

### 1.2 `tables/src/workLimits/` (R2, M0-f-03a)

**W-1 — the issue builder and literals** (`workLimits/table.ts:49–51`, `121`, `196`, `201–204`): `issueAt` from
`'../cell/cell.js'` (T-3). `checkWorkLimits`'s check order stays exactly: the counter-list duplicates, then per row (in
`t.rows` order) unknown cells, `unit`, `perUnit` (value, then cell unit `perHa`/`ratio`), `floor` (value, then cell unit
`count`), `log2` flag, the fixed-law rules, the list's unit and log2 agreement; then the missing counters in list order.
`parseWorkLimitsText`'s mapping of a `DuplicateKey` path to an issue (`rows.<counter>` → duplicate counter;
`rows.<counter>.<cell>` → duplicate cell; else `duplicate key '…'[ in path]`) unchanged. *ORACLE:* `table.test.ts` "the
law form is refused when malformed" (15 cases, `issues[0]` compared whole), "a missing counter fails the loader" (one
issue per counter, exact), "a duplicate counter / cell / top field"; mutants K06, K07, K09, K10, K11 and M0-f-03a's
author mutants stay red. No ruling.

**W-2 — `workLimitsCensus`** → `tableCensus(t.table)` from `'../loader/census.js'` (T-4). The current import of
`parseTable`, `TableError`, `Table` from `'../loader/index.js'` (`workLimits/table.ts:14`) may stay (public names) or
become path imports — either; the plan prefers the index for public names and the path only for the shared helper.
*NUANCE:* `law.test.ts` "the module imports only the kernel, the model, the package's own cell and loader modules and
its data file" **pins the import specifiers** of the five workLimits files to an allow-list (`law.test.ts:148`):
`'../cell/index.js'`, `'../loader/index.js'`, `'../../data/workLimits.json'`, `'@plat/kernel'`, `'@plat/model'`, the
four sibling files. **A path import `'../cell/cell.js'` or `'../loader/census.js'` must be added to that allow-list
in the same round** (the test is the item's own, M0-f-03a's owns) — this is a test change that widens a list, not a
weakening: the list's purpose (no measurement, no clock, no path outside the package) is held by the second `it`'s
banned-name scan, which is unchanged. The round records the two added specifiers in the `it`'s comment.
*ORACLE:* `table.test.ts` "the census … 32"; s2 mutants M09, M12. No ruling (the allow-list edit is inside the owns).

**W-3 — the version/PIN law, implemented twice.** `test/data/golden.test.ts:25–40` (M0-s-02; thirteen pins from
`golden.json`) and `test/workLimits/table.test.ts:190–200` (an inline `PIN = { version: 2, sha256: '8c5b12b4…' }`): the
same law (file version ≥ pin; at the pin's version the bytes hash to the pin; above it an informative
`console.info('…: version N past the pin M — a declared change (sha256 …)')`). *Consolidation:* R1's
`test/loader/support.ts` exports `pinnedFile(file: string, id: string, pin: { version: number; sha256: string }): void`
holding the three assertions and the message; `golden.test.ts`'s loop and `table.test.ts`'s `it` call it. The **pin
data stays where it is** (`golden.json` is M0-s-02's thirteen-table file and its first `it` pins "nothing else of ours"
in the data folder; the workLimits pin stays in M0-f-03a's test, where the hand-over's writer and its checker look for
it — C-0301 (1), (4)). *EQUIVALENCE:* the same three expectations with the same failure messages (`'a version below
the pin'`, `'<id>.json changed without a version bump: a changed cell is a declared change'` / `'workLimits.json changed
without a version bump'` — the helper takes the message's subject as `id` and the second message's tail is the only
textual difference today: `golden.test.ts:34` adds ": a changed cell is a declared change", `table.test.ts:198` does
not — **keep both texts exactly** by passing the message as a parameter, or align them to the longer one (a test
message is not a pinned refusal text; the plan prefers the longer, one text); the `console.info` line identical.
*NUANCE:* `readFileSync` of the bytes (not the parsed JSON) — the SHA-256 is over the file's bytes, newline at the end
included; the `version` read from the parsed file; `golden.test.ts` also asserts `file.table === id` — keep in the
helper. *ORACLE:* `golden.test.ts` all; `table.test.ts` "is pinned at its version"; mutants M21 (M0-s-02), K19, M04,
M10 (M0-f-03a) stay red. No ruling.

**W-4 — `report.ts` and `counters.ts` — KEEP.** `report.ts:15` `RUNG_ORDER` (all six rungs in ladder order) is a
report-ordering list, distinct from `ladder.ts:13` `BASE_RUNGS` (the three the base ships) and from `@plat/model`'s
`Rung` type (no runtime list exists in the model and adding one is an API addition — frozen); `counters.ts:12–22`
`WORK_UNITS` is the runtime form of the model's `WorkUnit` type (`satisfies readonly WorkUnit[]` ties them; the model
has no runtime list — same reason); `CONTINUOUS_WORK_UNITS` is the one statement of which units take fractions. All
kept; comments say so. `law.ts`'s `scopeLabel` and `countOf` message texts (`count(faces, district d12): the scope has
no committed count of faces`, `… is not a whole number of vertices`) are pinned (`law.test.ts:122, 126`) — untouched.

### 1.3 `model/src/types/`, `records/`, `schema/`, `stage/` (R3, M0-m-01)

**M-1 — one type imported by two paths.** `records/site.ts:4–5`, `network.ts:4–5`, `districts.ts:6–7`, `walls.ts:5–6`
import the kernel-derived names from `'../types/index.js'` and `Lifecycle` from `'../types/identity.js'`; `seam.ts:5`
imports from the index only (it needs no `Lifecycle`); `schema/kinds.ts:4–8` import the records by file;
`stage/decl.ts:11–13` import from `'../types/index.js'`, `'../types/identity.js'` (`EditId`) and `'../types/vocabulary.js'`.
*Consolidation:* every `import type` inside `model/src` takes its model-only types from the folder index
(`'../types/index.js'`), which re-exports `identity.js` and `vocabulary.js` (`types/index.ts:4–7`), unless a cycle
forbids it — none does (the type-only re-exports are erased; `types.test.ts` "model/src/types: a grep test" requires
every `import` in `types/` and `records/` to be `import type`, which stays true). *EQUIVALENCE:* types only; the
transpiled output of `types/` and `records/` stays `export {}` (pinned by `types.test.ts:260–262` "emits"); the module
namespaces stay empty (`:266–269`); `tsc -b` green; API.md-level names unchanged. *NUANCE:* `types/index.ts`'s
`export type *` form must keep the `type` modifier (the empty-namespace test). *ORACLE:* `types.test.ts` whole,
`records.test.ts` whole (the `PositionPaths` walker), `schema.test.ts`, mutants R1–R15, P2–P17 (all type-level or
snapshot). *RISK:* none. No ruling. (This is a consistency finding of the smallest kind; the session may drop it from
R3 as not worth a round — then R3 is comment-only.)

**M-2 — `stage/vocab.ts`'s `ceilLog2` and `lawLimit` — KEEP.** The doubling loop (`:57–65`) is the one definition;
`tables/src/workLimits/law.ts` reads `lawLimit` through `@plat/model`; the test-side `ceilLog2Spec` (`tables/test/workLimits/law.test.ts:19`)
and the model's property test are oracles — kept apart (the oracle rule).

**M-3 — nothing else.** `schema/order.ts` (the one `SCHEMA_ORDER` table, frozen per kind, `ORDER` map built once),
`schema/staged.ts` (the `S7` reason string reused — already consolidated), `stage/decl.ts` (`StageEnv` slots), the
record declarations: one declaration per design name, no duplicate. The folder is coherent; R3's substance is C-model-1.

### 1.4 `model/src/identity/` (R4, M0-d-05a)

**I-1 — `isU32` ×2 in the folder (+ `isU16`, `isObject`).** `lineage.ts:34` `isU32 = (v: number) => (v >>> 0) === v`,
`:35` `isU16`; `address.ts:22` the same `isU32`; `mint.ts:95` `isU32 = (v: unknown) => typeof v === 'number' && v >>> 0 === v`
(the `unknown` form, which also refuses a non-number), `:96` `isObject`.
*Consolidation:* `lineage.ts` exports from the file `isU32(v: unknown): v is number` (the `unknown` form:
`typeof v === 'number' && (v >>> 0) === v`), `isU16(v: unknown): v is number` and `isObject(v: unknown): v is object`;
`address.ts` and `mint.ts` import them by path (`'./lineage.js'` — `address.ts` already imports `GROUND` from it,
`mint.ts` already imports five names from it). The `number`-typed callers (`lineage.ts:46, 52, 57–62`, `address.ts:30,
49–50, 59, 112, 117`) pass numbers, for which the `unknown` form decides identically (`typeof` is `'number'`).
*EQUIVALENCE:* for a `number`, `(v >>> 0) === v` is the same test (`NaN >>> 0` is 0 ≠ NaN; `-1 >>> 0` is 2³² − 1 ≠ −1;
1.5 ≠ 1; 2³² ≠ 0); for a non-number the old `number`-typed sites could not receive one at the type level, and at run
time `('1' >>> 0) === '1'` is `false` in both forms (`1 === '1'` false) — so a string, `null` or `undefined` is refused
by both; every refusal text (`lineage key: stage is not valid: …`, `token: not a 64-bit hash of two u32 lanes: …`,
`address: the arena part is not a u32: …`, `mint: the seed key is not four u32 lanes: …`, `mint: the live entry x's
lineage is not two u32 lanes: …`) unchanged.
*NUANCE:* `isU16` = `(v & 0xffff) === v` (a negative or fractional value fails; `0xffff` passes, `0x10000` fails —
`lineage.test.ts` "refuses every field out of its width" and `mint.test.ts` `reroll: 0x10000`); `mint.ts:123` reads
`(reroll & 0xffff) !== reroll` inline — it becomes `!isU16(reroll)` only with the `typeof` guard it already has
(`typeof reroll !== 'number' || …`): the `unknown` form of `isU16` carries that guard, so the line becomes
`if (!isU16(reroll))` with the message unchanged (`mint: reroll is not a u16: 1.5` / `: 1`).
*ORACLE:* `lineage.test.ts` (the 24 out-of-width cases; the all-maxima case passes), `address.test.ts` ("refuses a hash
that is not two u32 lanes", the `userTokenHash` refusals, the prefix refusals including `sky4294967296/`),
`mint.test.ts` (the seed-key, live-lineage, signed-lane, reroll and origin refusals — every message regex); mutants CL3,
CL4, R1–R9, Q3–Q5, R10 stay red (they are exactly these widths). *RISK:* low. No ruling.

**I-2 — a frozen two-lane copy of a lineage hash.** Written as `Object.freeze([a, b]) as unknown as Readonly<LineageHash>`
in `match/carry.ts:63` and `match/match.ts:567, 568, 574` and `match/synthetic.ts:114`; `lineage.ts` has `sameLineage`
and `compareLineage` beside them. *Consolidation:* `lineage.ts` exports from the file
`export function copyLineage(h: Readonly<LineageHash>): Readonly<LineageHash> { return Object.freeze([h[0], h[1]]) as unknown as Readonly<LineageHash>; }`;
R5 replaces the four sites (X-2). *EQUIVALENCE:* a new frozen two-element array holding the same two numbers; the
`carry` event's `lineageFrom`/`lineageTo` and `liveSetOf`'s `lineage` compare `toEqual([7, 8])` as before; freezing
unchanged. *NUANCE:* `synthetic.ts:114`'s `lineage(a, b)` applies `>>> 0` to its arguments (it **coerces** test
numbers to u32) — a different function; it may call `copyLineage([a >>> 0, b >>> 0])` or stay as it is (prefer: stay,
it is a fixture builder). *ORACLE:* `assign.test.ts` "writes a carry event only when the successor's lineage differs"
(`toEqual` on the event), `carry.test.ts` "resolveRef … liveSetOf lists each address once"; mutant K-group "carry
events (always, or one lane only)" (M0-d-05b round 1) stays red. No ruling.

**I-3 — `mint.ts`'s `HashSet` and `compareLanes` — KEEP.** The exact 64-bit set bucketed by word 0 and the ten-lane
comparator are this module's own; `compareLineage` (word 1 high) is the canonical order and `compareLanes` the tie
(`mint.ts:85–93`) — two comparators by design (C-0179 (4)). `test/identity/mint.test.ts:42–47` re-implements
`compareLanes` as its oracle — kept apart.

### 1.5 `model/src/match/` (R5, M0-d-05b)

**X-1 — `cmpId` is the kernel's `compareKeys`.** `match.ts:48` `const cmpId = (a: string, b: string): number => (a < b ? -1 : a > b ? 1 : 0)`;
`kernel/src/arena/keys.ts:13–15` `compareKeys(a, b)` is the same three-way `<`/`>` expression ("UTF-16 code units, a
key before every longer key it begins"). *Consolidation:* `match.ts` imports `compareKeys` from `'@plat/kernel'` (it
already imports `LATTICE, ratio` from it) and uses it at every `cmpId` site (`:289 byItemId`, `:326 set.sort`, `:450,
:459` the end pairs, `:599 carry.sort`). *EQUIVALENCE:* the identical comparison on the identical strings; every order
the routine produces (olds and freshes by id, the key parts of a set, the end pair, the carry list) unchanged; the
header comment's sentence "Ids are compared by their UTF-16 code units" stays and now names `compareKeys`.
*NUANCE:* the comparator is total and stable for strings; `Pairs.assign`'s sort (`:193`) compares **numbers** (`s`, `o`,
`f` indices) and is not touched. *ORACLE:* `assign.test.ts` "coincident anchors resolve by id", "equals a brute-force
reference on 10⁴ random anchor sets" (the reference carries its own `cmp`), "is independent of the input order
(property)", `way.test.ts` "the end pair is unordered on both sides", `split.test.ts` "in any input order"; mutants
K03–K09 (the sort), K13/K13b (end pair not sorted) stay red. *RISK:* none. No ruling.

**X-2 — `isU32` and `copyLineage` from `identity/lineage.ts`** (`match.ts:47`; the three casts at `:567, 568, 574`;
`carry.ts:63`) — I-1, I-2. `match.ts:98`'s lineage check `typeof l !== 'object' || l === null || l.length !== 2 || !isU32(l[0]) || !isU32(l[1])`
keeps its message `match: … lineage is not two u32 lanes`. *ORACLE:* `assign.test.ts` "refuses malformed entities and
inputs" (`[1]`, `[-1, 0]` → `/u32/`). No ruling.

**X-3 — three `ratio` wrappers — KEEP APART, name them.** `match.ts:50–54` `inverse(v, kind)` (`ratio(1, v, kind)`,
kinds `'length'` for the radius, `'count'` for the box grid's mean), `geometry.ts:133–137` `div(num, den)` (kind
`'area'`), `timing.ts:69–74` `perEntity(ms, n)` (`'count'`) and `:131–136` `shareOf` (`'count'`). The `kind` sets
`ratio`'s floor (§3.2 (8), C-0044) — 1 cm, 1 cm², 1 — so the four are different quotients and their refusal texts
(`match: no inverse of …`, `match: a degenerate division in the overlap`, `match: no per-entity time without entities`,
`match: no share of the unprobed time without entities`) say what each divides. No test pins these texts (grep), but
nothing is gained by one wrapper with a kind parameter except a longer signature at every site. **Kept; the comment
above each names its kind and floor.** No ruling.

**X-4 — mulberry32 in `synthetic.ts:42–51`.** The same generator as `digest/workload.ts:39–49` (which also offers
`u32()`); both are deliberate, dependency-free synthetic-workload generators (the kernel's xoshiro streams need seed
keys and concerns, which a workload fixture should not take). A shared home would be a new `model/src/support/`
folder, which no item owns (Q3). **Kept in both files in this pass**; each comment says it is the synthetic workload's
own cheap generator, not the model's RNG (§6.1), and that the digest's workload carries its twin.

**X-5 — `geometry.ts`, `grid.ts`, `source.ts`, `split.ts`, `anchors.ts`, `types.ts` — KEEP.** One function per job;
`boxesMeet` (`geometry.ts:84`) and `grid.ts:101` `meets` are the same closed-box test written twice — the second is a
private one-liner over the grid's own boxes; **unify** by importing `boxesMeet` from `'./geometry.js'` into `grid.ts`
(`grid.ts` imports only `Box` today; `geometry.ts` imports nothing from `grid.ts`, so no cycle). *EQUIVALENCE:* the
same four comparisons (`a.minX <= b.maxX && b.minX <= a.maxX && a.minY <= b.maxY && b.minY <= a.maxY`). *ORACLE:*
`source.test.ts` "the routine on the index's candidates gives the outcomes of its own box grid", `way.test.ts` "the
larger overlap wins", the IoU property; mutants K25/K25b and the overlap-covering mutants stay red. No ruling.

### 1.6 `model/src/digest/` (R6, M0-d-04)

**D-1 — a `Hash128` written as four lanes, four times.** `model.ts:101–103` `writeHash(w, h)`; `leaf.ts:149`
`for (const d of digests) W.u32(d[0]).u32(d[1]).u32(d[2]).u32(d[3])`; `records.ts:87` and `:93` the same four calls.
*Consolidation:* `encode.ts` (the digest's value rule, already imported by the other three) exports from the file
`export function writeHash128(w: LaneWriter, h: Readonly<Hash128>): void { w.u32(h[0]).u32(h[1]).u32(h[2]).u32(h[3]); }`;
the four sites call it. *EQUIVALENCE:* the same four `u32` lanes in the same order into the same writer — every leaf,
node, layer and root digest byte-identical (the 16 leaves of `leaf-snapshot.json`; every fuzz run's roots; the records
tree's); `LaneWriter.u32` refuses a non-u32 lane as before (`RangeError`), so a malformed geometry digest is refused at
the same lane. *NUANCE:* `leaf.ts` writes the **count** `W.u32(digests.length)` before the hashes (`:148`) — stays
outside the helper; `records.ts:93` writes `w.utf8(p)` before each node hash — stays. *ORACLE:* `test/digest/leaf.test.ts`
"the leaves of the shaped records are the snapshot's", "follow the attributes, one per reference …" (the `reference()`
writer in the test is the independent oracle and writes its own lanes — kept), `model.test.ts` twelve fuzz runs and
every `recomputeRoot` equality, `records.test.ts` "the leaf: id ‖ record kind ‖ …"; mutants M2, M3, M5 (owned digests
dropped), M8–M15, M26–M28 (round 1) stay red. *RISK:* none. No ruling.

**D-2 — "two `Hash128` are equal", twice.** `model.ts:582–584` `sameHash` and `timing.ts:51` `same`.
*Consolidation:* `encode.ts` exports from the file `sameHash(a, b)`; `model.ts` and `timing.ts` import it.
*EQUIVALENCE:* four `===` comparisons; `oracle()`'s verdicts and `timeDigest`'s `oracle` flag unchanged. *ORACLE:*
`model.test.ts` "the oracle catches a stale leaf", the subtree oracle's `['districts:plot:2']`, `records.test.ts`
"emits its record … oracle true". No ruling.

**D-3 — the lineage-lane check in `leaf.ts:88`.** `lin.length !== 2 || (lin[0] >>> 0) !== lin[0] || (lin[1] >>> 0) !== lin[1]`
is `!isU32(lin[0]) || !isU32(lin[1])` of I-1; `records.ts:54`'s slice-hash check is the same test on `h`. *Consolidation
(optional, after R4):* import `isU32` from `'../identity/lineage.js'`. *EQUIVALENCE:* identical for the numbers these
arrays hold; messages (`digest: x's lineage is not two u32 lanes`, `records digest: slice …'s hash is not two u32
lanes`) unchanged. *ORACLE:* `leaf.test.ts` "refuses an entry holding another record, a malformed lineage …" (`[1.5, 0]`),
`records.test.ts` "refuses … a malformed slice hash" (`[1.5, 0]`). If R4 has not landed, the two inline tests stay —
no ruling.

**D-4 — `workload.ts`'s mulberry32** — X-4's twin; kept (Q3).

**D-5 — the tree code — KEEP.** `model.ts` (the maintained tree: `put`/`remove`/`detach`/`markPath`/`refreshTop`/
`settle`/`nodeOf`/`kidsOf`, the restore-generation sync of C-0305, the three switches) and `records.ts` (the partition
tree) each carry their own `nodeHash`/`rootHash` with their own tags (`NODE`/`LAYR`/`ROOT`, `RNOD`/`RROT`) — two trees,
two tag sets, by design (§6.2: "a second Merkle tree beside the model's"); sharing the node writer would couple two
persisted forms. `freshKids`/`freshNode`/`recomputeLayers` (the oracle's own walk, never the maintained index) stay
separate from `kidsOf`/`nodeOf` on purpose (C-0194's "read afresh from the records' `Identity.parent`"). `checkEntry`
exists in both `leaf.ts` and `records.ts` under one name for two entry kinds — private; kept.

### 1.7 Cross-package

**C-1 — `@plat/tables` ↔ `@plat/model` vocabularies — KEEP APART.** `tables/src/workLimits/counters.ts` `WORK_UNITS`
(runtime) vs `model/src/stage/decl.ts` `WorkUnit` (type): the model is types-only for stage declarations (C-0003) and
a runtime list there would be an API addition (frozen); `satisfies readonly WorkUnit[]` plus `table.test.ts` "WORK_UNITS
is §5.1 (5)'s WorkUnit, every member once" (`expectTypeOf` equality) already tie the two. `report.ts` `RUNG_ORDER` vs
`Rung`: the same. `tables/src/cell/cell.ts` `isRecord` (a public export of the tables index) vs `model/src/identity/mint.ts`
`isObject` (`typeof === 'object' && !== null`, admits arrays) vs `digest/encode.ts` `isPlainObject` (prototype check):
three predicates with three meanings — kept, each named for what it tests.

**C-2 — unread exports (frozen, listed for the session).** A census over `plat/packages/*/src`, `plat/packages/*/test`
and `plat/bench` (every `.ts`/`.mjs`/`.js` outside `node_modules`, `dist`, `vendor`) finds these index exports read by
nothing outside their own `src` — not even their own tests: model `Anchor`, `AnchorClass`, `AnchorType`,
`CROSSING_SEARCH_BAND`, `CandidateSource`, `CarriedName`, `CarryEvent`, `CellRef`, `CheckedSpec`, `ClassTiming`,
`DigestLayer`, `DigestSwitches`, `DigestTimingRecord`, `EntityKey`, `GeometryOf`, `KeyPart`, `KindTiming`,
`LeafIdentity`, `MatchCounts`, `MatchedBy`, `OVERLAP_THRESHOLD`, `ParsedAddress`, `Rebinding`, `RecordsKind`,
`Resolution`, `SYNTHETIC_BUILDING`, `StagedField`, `SupersedesTable`, `SyntheticName`, `SyntheticSet`, `lineageLanesInto`;
tables `Blendable`, `BudgetRef`, `CONTINUOUS_WORK_UNITS`, `CellAt`, `DuplicateKey`, `ExtensionMode`, `ExtensionOver`,
`FWorkReport`, `FWorkRow`, `LawRef`, `PresetValue`, `ProsperityBand`, `REFERENCES`, `StageRowRef`, `TableIssue`,
`TableWorkLimitLaw`, `TableWorkUnit`, `WorkLimitCounterSpec`, `cellPinning`, `isTableWorkUnit`, `rowPinning`. Most are
the types of an exported function's signature (reachable through it) or item-listed interfaces (`CarryEvent`,
`SupersedesTable`, `FWorkReport`, `TableView`'s neighbours); the runtime ones (`CROSSING_SEARCH_BAND`,
`OVERLAP_THRESHOLD`, `SYNTHETIC_BUILDING`, `lineageLanesInto`, `CONTINUOUS_WORK_UNITS`, `REFERENCES`, `cellPinning`,
`rowPinning`, `isTableWorkUnit`) are the design's named constants and the pinning content's readers (§7.6's "pinning
hash … covers"). **Nothing is removed** (the API is frozen); the list is for a later API-surface decision (Q7).

---

## 2. Comment rewrite plan (per file)

Rule: a comment describes the design as it stands and cites the C-row and design section that fix it; it never says
"the checker's", "fix round", "N-xx (2026-…)", "version 1 → 2", "not yet landed", "the scaffold created this". Round
ids, note ids (N-1 … of a checks file), mutant ids and dates belong in `checks/*.md`. Where a comment is the only place
a rule is stated, the rewrite keeps the rule and drops the narrative. Every pinned **string** stays (none of the
comments below is a message).

**C-index (RS) — `model/src/index.ts:1–2` and `tables/src/index.ts:1–2`.** "it re-exports every module folder M0 plans;
each folder's index.ts starts empty and belongs to the item that builds the folder, so the package exports nothing yet"
→ "`@plat/model` — the package index (C-0013): it re-exports every module folder's index, and the package's public API
is their union (types, records, schema, stage, identity, match, digest). A folder's index belongs to the item that
builds the folder." (`@plat/tables`: loader, cell, workLimits.) The same sentence the kernel plan writes for
`kernel/src/index.ts`. These two files are M0-s-01's (Q1).

**C-tables-1 — `tables/src/cell/unit.ts:1–3`.** Drop "(the design correction of 2026-10-03, M0-spec-notes N-18)";
write: "The unit vocabulary (§2.1): every table column, metric and field that names its unit by a word takes it from
this one list, `perKm2` and `per100m` included; volume 11's `ColumnSpec.unit` and volume 12's metric `Unit` are named
subsets of it. The type is derived from the list (T-5)."

**C-tables-2 — `tables/src/cell/cell.ts`.** Line 72: "the checker's 'numbers and our own keys only'" → "a key value
is one of our own keys (C-0153 (4)): no prose, so no reference word list can be a value — the one grammar `STABLE_KEY`,
which a cell key follows too". Lines 1–8 (the header) keep their design citations; add one line naming the three
helpers the file exports to the loader (`STABLE_KEY`, `nonEmptyString`, `issueAt`) and that they are not public. Lines
152–153 (the categorical-option rule, C-0162 (3)) stand.

**C-tables-3 — `tables/src/loader/`.** `table.ts:1–5` stands (add: "a row key may begin with a digit; a cell key is a
stable key — `STABLE_KEY`"). `table.ts:106–109` and the new `cellSliceHash`: one paragraph stating the two slice forms
and that they are `SliceRef.hash`'s fixed forms (C-0157 (1)). `census.ts:1–4` stands (drop "M0.md §4b" → "C-0070";
keep "V12 §3.11"). `registry.ts:1–4` stands. `view.ts:1–5` stands. `bands.ts:1–9` stands (the clearest module comment
of the package). `ladder.ts:1–7` stands.

**C-tables-4 — tests of M0-s-02.** `test/data/golden.test.ts:1–6` keep; `test/data/tables.test.ts:1–12` keep (it
states the hand-over rule, C-0162 (1), as a rule). `test/cell/cell.test.ts:1–3`: "(N-18)" → "(§2.1)". No other
narration in this item's tests.

**C-tables-5 — `tables/src/workLimits/table.ts:1–11`.** Line 8: "… are the design's, provenance `architecture
2026-10-03`, never calibrated (N-56 (4), C-0301, version 2)" → "… are the design's: provenance `architecture
2026-10-03`, `calibratable: false`, never rewritten by the coefficient rewrite (C-0301)". `counters.ts:1–8`,
`law.ts:1–6`, `report.ts:1–6`, `index.ts:1–2` stand. **Tests:** `test/workLimits/table.test.ts:1–5` "(N-56 (4), C-0301,
refining C-0174 (1))" → "(C-0301)"; `:127–128` the `// N-56 (4) (2026-10-08): …` comment → "// A fixed law's floor is
the design's constant (§3.6's 8 halvings), never a placeholder and never calibrated (C-0301); the coefficient rewrite
skips it."; `:171` "// 33 → 32 at version 2 (N-56 (4)): `warp.halvings/floor` left the census when its metadata was
pinned." → "// every counting law's floor and perUnit; a fixed law's cells are pinned, not calibratable (C-0301)";
`:191–193` the "Re-recorded at version 2 … Version 1 hashed to 87de920b…" history → "// The PIN is the file at its
version (C-0157 (2), C-0301 (1)): the bytes at version 2; a higher version is a hand-over's declared change." The `it`
titles stay verbatim.

**C-model-1 — M0-m-01.** `stage/decl.ts:6–10`: "the kernel's not yet landed when this item lands (Plat, M0-a-02;
Stream, M0-d-01; the Kernel façade, M0-a-16) and the document (§2.9, M1)" → "the types that live above or beside
`@plat/model` in the dependency order (§14): the kernel's `Plat`, `Stream` and `Kernel` façade, `@plat/tables`'
`TableView` and `RungProfile`, `@plat/layout`'s report sink and model, and the document (§2.9, M1) — each a slot of one
environment parameter, `unknown` by default, bound once by the package that has the type (C-0142 (5))". `types/kernel.ts:1–5`,
`types/identity.ts`, `types/vocabulary.ts`, `types/staged.ts`, `records/*.ts`, `schema/*.ts`, `stage/vocab.ts`: stand
(every one states the design and cites its rows). Tests: no narration.

**C-model-2 — `model/src/identity/`.** `index.ts:1–3` stands. `lineage.ts:1–12` stands; add one line for the shared
predicates (`isU32`, `isU16`, `isObject`, `copyLineage`: "file-level exports the identity and matching modules share;
not part of the package's API"). `address.ts:1–11`, `mint.ts:1–24` stand (they are the design's paragraphs with
their C-rows; "Staged (C-0179 (5))" is a rule, kept). Tests: `test/identity/mint.test.ts:5` "(C-0184, fix round 1)" →
"(C-0184)"; `test/identity/address.test.ts`, `lineage.test.ts`, `city.test.ts`: no narration.

**C-model-3 — `model/src/match/`.** `index.ts:2–3`: drop "The scaffold created this index empty (M0-s-01, C-0013); it
belongs to M0-d-05b. Readings: C-0188." → "Readings where §6.3 leaves a case open: C-0188, C-0190." `carry.ts:5` and
`:52` "(M0-d-05a's note N-2)" → "(the mint's live set holds each address once: a survivor's address is never also a
retired one)". `match.ts:1–19` stands (the routine's rule, whole); `:40` (`WAY_OVERLAP_CM`), `:220–221` (the probe,
C-0190) stand; the new line at `:48` names `compareKeys`. `types.ts:2` "Readings: C-0188." → keep as "(C-0188)" after
the sections. `anchors.ts`, `geometry.ts`, `grid.ts`, `source.ts`, `split.ts`, `synthetic.ts` (add the generator
sentence of X-4), `timing.ts` stand. Tests: `test/match/*.test.ts` headers quote the item's listed test ids — a form
the checks rely on; kept.

**C-model-4 — `model/src/digest/`.** `index.ts:1–5`: drop "The scaffold created this index empty (M0-s-01, C-0013)."
→ "… and the bars' harness; @plat/model's re-export of the kernel's hash functions under their design names (§14;
C-0004, C-0066). Readings where §6.2 leaves a case open: C-0194, C-0305." `model.ts:19–22`: "A restore across committed
batches (`restoreSavepoint`, N-56 (5), C-0299, C-0305): …" → "A restore across committed batches (`restoreSavepoint`;
C-0299, C-0305): the arena's restore generation moves, and the next maintenance or read of this tree re-hashes every
leaf resolving in that arena and re-reads the `plats` node — the leaves read geometry the rolled-back commits wrote,
and no commit record names it. The runner's re-attach and `addArena` after a restore (C-0287 (2), C-0295) do the same
at once." `canonical.ts:2–4`: "It is NOT on the digest path: no leaf, node or root reads it (C-0194 (10); the checker's
source scan)" → "… reads it (C-0194 (10)); `test/digest/leaf.test.ts` scans the digest sources for it." `encode.ts`,
`leaf.ts`, `records.ts`, `timing.ts`, `workload.ts` stand (add the generator sentence of D-4 to `workload.ts:39`).
Tests: `test/digest/model.test.ts:4–5` "Round s1 (N-56 (5), C-0305): a savepoint put back …" → "A savepoint put back
across committed batches (C-0299, C-0305) leaves …"; the describe title `'N-56 (5): a savepoint put back across committed
batches (C-0299, C-0305)'` (`:274`) is a **title the checks cite** (`checks/M0-d-04-s1.md`) — kept verbatim (J263 Q8's
rule: every describe/it title kept).

---

## 3. Test consolidation plan (per test folder)

Principles: oracles stay independent of the code under test (the BigInt token oracle, the DataView lane oracle, the
brute-force assignment, the plain restatement of the mint's rule, the closed-form IoU, `ceilLog2Spec`, the raw-file
census recomputation — never replaced by the package's function); nothing is weakened — every `it` that kills a mutant
in a check's table keeps the case that kills it, by title; snapshots and goldens (`golden.json`, `calibratable-census.json`,
`extension-cells.json`, `string-values.json`, `leaf-snapshot.json`, `schema-order.json`) are byte-untouched;
properties keep their sizes and seeds; every `describe`/`it` title is kept (the checks cite them). No test file is
merged or renamed in either package: each file is already one subject.

### 3.1 `tables/test/` (R1 for `cell/`, `loader/`, `data/`; R2 for `workLimits/`) — T-tests-1

**New `tables/test/loader/support.ts`** (M0-s-02's owns; not a test file), holding:
* `refusal(f: () => unknown): TableError` — the `loader.test.ts:17–25` form (asserts `instanceof TableError`, returns
  it, throws `'no refusal'` otherwise). `cell.test.ts:17–25`'s `refusal(raw, id = 't')` becomes
  `refusal(() => parseTable(id, raw))` at its call sites (or a two-line local wrapper `refuseTable(raw, id)` that calls
  the shared one — the plan prefers the wrapper, so the fourteen `refusal(oneCell(…))` calls stay short);
  `ladder.test.ts:141–150`'s `refusal(raw, rung)` becomes a local `refuseProfile(raw, rung)` calling the shared one;
  `workLimits/table.test.ts:45–53` imports the shared one (R2). The message `'the table loaded'` / `'the profile was
  read'` / `'no refusal'` is the thrown text of the **failure path only** (never reached green); the shared text is
  `'no refusal'`.
* `deepCopy<T>(x)` (`loader.test.ts:29–31`) and `rawTable(id: M0TableId)` = `deepCopy(TABLE_SOURCES.get(id))`
  (`ladder.test.ts:140`'s `copy`, `tables.test.ts:44–45`'s copy inside `handOver`).
* `cell(value, unit, calibratable = true)` (`bands.test.ts:26`) and `ONE_CELL` / `oneCell(cellRaw)` (`cell.test.ts:12–14`
  and `loader.test.ts:27`'s `MIN` are the same one-cell table `{ table: 't', version: 1, section: '§4.6', rows: { r: { c } } }`
  with `MIN`'s cell `{ value: 1, unit: 'm', provenance: 'own', calibratable: false }` and `cell.test.ts`'s `GOOD` value 3 —
  one builder with the cell as its argument).
* `pinnedFile(dir, id, pin, message?)` — W-3's PIN law.
`cell.test.ts`, `loader.test.ts`, `ladder.test.ts`, `bands.test.ts`, `tables.test.ts`, `golden.test.ts` import from
`'./support.js'` / `'../loader/support.js'`. Not shared: `tables.test.ts`'s `atGolden`, `handOver`, `positiveRange`,
`flagged`, the per-table `*Invariants`/`*Defaults` pairs (that file's own oracle of C-0162 (1)); `census.test.ts`'s
raw-file recomputation; `bands.test.ts`'s `rowsOf`, `near`, the fixture tables.
Mutant-kill map to confirm after the change (by title, unchanged): M01–M22 → `cell.test.ts`, `loader.test.ts`,
`bands.test.ts`, `ladder.test.ts`, `census.test.ts`, `golden.test.ts` as `checks/M0-s-02.md` round 1 lists;
S01–S13 → `ladder.test.ts` "the layers column …" and `cell.test.ts` "refuses a categorical option cell …";
D01–D19 → `tables.test.ts` (the extension and value snapshots, the invariants) and `census.test.ts`.
**New pin:** T-3's `Object.keys(issue)` case in `loader.test.ts` ("a malformed table file is refused, naming where").

### 3.2 `tables/test/workLimits/` (R2)

`law.test.ts`, `report.test.ts`, `table.test.ts` stay three files. `table.test.ts` imports `refusal` and `pinnedFile`
from `'../loader/support.js'` and keeps its own `raw()` (a parse of the file's **text** `TEXT`, which the duplicate-key
cases also need — a different source from `TABLE_SOURCES`, deliberately). `law.test.ts:148`'s allow-list gains R1's two
path specifiers if `workLimits/table.ts` imports them (W-2). Comment rewrites: C-tables-5. Mutant map: K01–K20
(`checks/M0-f-03a.md`) and M01–M17 (`-s2.md`) → the same titles; nothing moves.

### 3.3 `model/test/digest/` (R6) — T-tests-2

`support.ts` gains `hex(h: Hash128 | null | undefined): string` (`h == null ? String(h) : …`) replacing the three local
copies (`leaf.test.ts:32`, `model.test.ts:12`, `records.test.ts:22` — the third returns `'undefined'` for `undefined`,
which `String(undefined)` gives too; the first takes a `Hash128` only — the widened signature accepts it). The
`reference()` leaf writer of `leaf.test.ts:43–54` is the oracle — stays local. `LIFE` is already shared. `rng` stays
(Q3 decides whether `test/match/support.ts`'s `generator` imports it). Mutant map unchanged: K1–K16, M1–M28 (round 1),
K1–K8, M1–M10 (s1) → `leaf.test.ts`, `model.test.ts`, `records.test.ts` by title. **No new pin required**; the kernel
plan's R13 (`kernel/src/digest`) is where N-12/N-13/N-15 hardening pins of `checks/M0-d-04-notes.md` would go, and
those are M4's by the notes — not this pass.

### 3.4 `model/test/identity/`, `model/test/match/`, `model/test/records/`, `schema/`, `stage/`, `types/`

Already one subject per file, no shared-helper patchwork beyond the generators (Q3). `test/match/support.ts` stays the
match tests' builder home (`pointEntity`, `areaEntity`, `wayEntity`, `rect`, `P`, `L` — written "from §6.3's words",
kept). `test/identity/mint.test.ts`'s `oracle()` and `compareLanes` are the oracle — kept. Mutant maps unchanged:
CL1–CM21, Q1–R10 → `lineage.test.ts`, `address.test.ts`, `mint.test.ts`, `city.test.ts`; K03–K36, K10/K13/K13b/K25/K25b,
F1a–F1h → `assign.test.ts`, `way.test.ts`, `split.test.ts`, `carry.test.ts`, `source.test.ts`, `synthetic.test.ts`;
R1–R15, P2–P17 → `records.test.ts`, `schema.test.ts`, `stage.test.ts`, `types.test.ts`, `dom.test.ts`.

### 3.5 Vitest projects

`plat/vitest.config.ts:39–40` registers `model` and `tables` as whole-package projects; no include glob names a file,
so a new `support.ts` beside the tests is picked up as a non-test module (as `test/digest/support.ts` is today) and no
project needs editing.

---

## 4. Not touched, and why

* **Every exported name of every folder index** (hence of `@plat/model` — 131 names — and `@plat/tables` — 83):
  frozen by the task (J263 Q1's rule applied to these packages). The shared helpers of this plan are file-level exports
  imported by path, never index lines. The unread exports of C-2 stay.
* **Item-listed interfaces** (`TableView`, `loadTable(id)`, `bandInterpolate`, `discreteCell`, `RungProfile`;
  `workLimitOf`, `loadWorkLimits`, `FWorkReport`; `schemaOrder`, `STAGE_IDS`, `DATA_KEYS`, the re-exported kernel
  types; `ModelDigest`, `RecordsDigest`, `digestLeaf`, `onDirty`, `finaliseRoot`, `recomputeRoot`; `LineageKey`,
  `lineageHash`, `addressOf`, `mint`, `TOWN_ROOT`, `parseAddress`; `match`, `AnchorSpec`, `CarryEvent`, the supersedes
  table): signatures and behaviour untouched.
* **Every data file** `tables/data/*.json`: no cell, note, provenance, unit, flag, version or byte. `golden.json`'s
  thirteen pins and the workLimits PIN (`8c5b12b4…`, version 2) unchanged; the hand-over chains (M0-b-05a/b, M0-c-07a/b,
  M0-f-03b) own their later versions.
* **Persisted forms**: the model digest's lanes (`TAG_LEAF`/`NODE`/`LAYR`/`ROOT`/`UNRN`, the flag bits, the layer
  index, the value rule's type codes), the records digest's (`RLEF`/`RNOD`/`RROT`), the lineage key's ten lanes and the
  user token's domain lane, the base-32 token, the address grammar, the table pinning hashes and both slice-hash forms,
  the view hash's `${id}@${version}:${hash}` lines, the `DigestTimingRecord` and `MatchTimingRecord` shapes (bench reads
  them), `calibratable-census.json`, `extension-cells.json`, `string-values.json`, `leaf-snapshot.json`,
  `schema-order.json`.
* **Message texts tests pin**: every `TableError` message and `issues` object; `band reading: …`; `count(…): …`;
  `fWorkReport: …`; `workLimitOf: fixed law …`; `lineage key: … is not valid: …`; `token: …`; `address: …`; `mint: …`
  (every one of `mint.test.ts`'s regexes); `match: …` (every one of `assign.test.ts`'s and `split.test.ts`'s regexes);
  `digest: …`, `records digest: …`, `canonical text: …`; `schemaOrder: no M0 schema for the kind '…'`; `lawLimit: …`.
* **The three vocabularies of T-5 (c)** (`REFERENCES`, the preset ids, the `extension.over` words): three sets by
  design.
* **`bands.ts`'s `RangeError` refusals** vs the loader's `TableError`: two error classes for two kinds of failure
  (arithmetic over a read value vs a load); the `eslint-disable` directive at `bands.ts:104` with its reason.
* **`match.ts`'s three `ratio` wrappers** (X-3), **`mint.ts`'s two comparators** (I-3), **the two Merkle trees' node
  writers** (D-5), **`isRecord` / `isObject` / `isPlainObject`** (C-1): kept apart with the separating nuance stated in
  their comments.
* **Test oracles** written from the design: the BigInt base-32 oracle (`address.test.ts`), the DataView lane oracle
  (`lineage.test.ts`), the plain restatement of the mint's rule (`mint.test.ts`), the brute-force assignment
  (`assign.test.ts`), the closed-form IoU and line-share cases (`way.test.ts`), `reference()` (`leaf.test.ts`), the
  raw-file census and the per-table invariants (`census.test.ts`, `tables.test.ts`), `ceilLog2Spec` (`law.test.ts`),
  the `PositionPaths` walker (`records.test.ts`), the design field lists (`schema.test.ts`) — never replaced by package
  code.
* **The two mulberry32 generators in `src`** and the two in `test` (X-4, D-4, Q3): no owned home exists for a shared
  one.
* **`M0-s-02-notes.md` N1–N3, `M0-f-03a-notes.md` N-2 – N-5, `M0-d-04-notes.md` N-1 – N-17, `M0-d-05a-notes.md` N-1 – N-3,
  `M0-d-05b-notes.md` N-1 – N-3**: hardening and session items; none is a consolidation.
* **`records.test.ts:155`'s inline generated lifecycle** (M0-m-01's test) vs `test/digest/support.ts`'s `LIFE`
  (M0-d-04's): one literal in another item's owns; kept.

---

## 5. Open questions for the session

**Q1 (RS).** `model/src/index.ts` and `tables/src/index.ts` carry the false sentence "so the package exports nothing
yet"; they are the scaffold's files (C-0013; M0-s-01's owns), outside every round above. Who edits the two lines — a
one-line scaffold fix lane, or the session itself at a wave close? (The kernel plan lists the same sentence for
`kernel/src/index.ts`.)

**Q2 (R2, blocking for the order of R2 and M0-f-03b).** `tables/test/workLimits/table.test.ts:126–143` "placeholder
provenance is present on every counting row …" asserts, for every row and **ungated by the file's version**, that each
calibratable cell's provenance is `architecture 2026-10-03 placeholder` and that every cell's `provenanceForm` is
`'architecture'` (`:136–139`). M0-f-03b's hand-over rewrites the counting rows' `perUnit` and `floor` with provenance
`M0 spike ⟨date⟩` (`calibratable` true kept; C-0021, C-0154 (1)) and bumps the version — which turns this `it` red,
and a run item may not edit a test (C-0115, C-0117). This is not a consolidation finding but it decides R2's timing:
(a) R2 lands first and leaves the test as it is, and M0-f-03b's brief routes the pin through an M0-f-03a fix lane (the
C-0162 (1) precedent: gate the placeholder pins on `version === PIN.version` and hold, past it, only "every
calibratable cell carries an admitted form and a counting law's coefficients are calibratable"); or (b) R2 applies
that gating now as part of the consolidation (a test form change that keeps every assertion at version 2 and states
the rule past it). The plan recommends **(b) only if the session rules it is not a weakening** — the plan's default is
(a): R2 changes no assertion.

**Q3 (R5, R6).** The four mulberry32 copies (two in `src`, two in `test`) have no owned home: a `model/src/support/`
or `model/test/support/` folder would be a new owns line for one of the four items (or the session's). Keep the four
(the plan's default), or rule a home and its owner?

**Q4 (R5).** `cmpId` → the kernel's `compareKeys`: the two are one expression (`a < b ? -1 : a > b ? 1 : 0`); the
plan treats it as a pure delegation with no equivalence corpus needed. Confirm, or ask for the brute-force property
(`assign.test.ts`) to be run once with the comparator swapped in as the receipt.

**Q5 (all).** The sharing convention — a file-level `export` not re-exported by the folder index, imported by path —
is assumed to be what J263 Q1 rules for every package ("shared predicates live in a file imported by path; a later
re-export is an API-surface decision outside the pass"). Confirm for `@plat/model` and `@plat/tables`.

**Q6 (R1).** T-6's one-list form for the table ids: the plan prefers the typed-record form (`JSON_OF: Record<M0TableId,
unknown>`) over an `as const` tuple of pairs, because a JSON import inside an `as const` tuple may widen the id's type.
Either keeps `M0TableId` and the order; the implementer picks the one `tsc -b` accepts without a cast. No ruling needed
unless the session wants the registry file left as it is (two lists, one comment "kept in the same order").

**Q7 (later).** C-2's list of index exports read by nothing: an API-surface question for after the pass (as the kernel
plan's Q1 is), not for any round.

**Q8 (data; M1's schema).** Two observations on `tables/data/`, no change in this pass: (a) `ladder.json`'s three
`matched.mfcgSize` cells carry unit `none` while every other count cell carries `count` — MFCG's "size" is a preset
knob, not a count, so `none` reads as deliberate; M1's zod schema (C-0012, C-0044) should say which; (b) the 81
"M0-s-02 pick" notes name the lane (`lane build/M0-s-02`) — provenance text in data that the pick test reads
(`tables.test.ts` "M0-s-02's picks are marked"); a lane name is traceability the design's `note` field admits (C-0158),
so it stands.

**Q9 (R3).** M-1 (import paths of `Lifecycle` inside `model/src/records/` and `stage/decl.ts`) is a consistency
change in types-only files whose transpiled output is pinned empty. The session may drop it and make R3 comment-only
(C-model-1); the plan lists it because "one concept, one import form" is J112's uniform-names rule.
