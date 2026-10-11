# M0-s-02 — the closing check's notes (not failing lines)

These notes come from the closing check of item M0-s-02 (lane `check/M0-s-02-close-r1`, 2026-10-04). Under the
session's rulings J162 and J169, the closing check fails the item only on a blocker. Every finding below is a
deliberate writer's escape, a hardening test or a claim to tighten, so none of them fails the item. Each row names its
handling and the milestone or item where it belongs. The verdict and its evidence are in `checks/M0-s-02.md` (the
closing round). The first check's open notes N-4 – N-8 (the village refusal by `TableError`, the vetted directive at
`bands.ts` 104, §4.5's parity step blend at M1, the golden test passing any content past a pin, and the root test
script's literal `--`) stay in `checks/M0-s-02.md` and are not repeated here; N-1 – N-3 were taken up by C-0162.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N1 | Past a table's golden version, `tables.test.ts` skips every default pin of that table, not only the handed-over cells. After M0-b-05a's `regimes.json` bump, nothing pins the separations, `a`, heading, bias, step lengths or the fusion switch (`regimesDefaults`, lines 163 – 181, gated at 187). After M0-b-05b's `cut.json` bump, nothing pins `cut.stop`, `cut.t`, `cut.arc`, the portal gap or their P-id provenance, nor the lane and alley widths' equality with `ways.json` (`cutDefaults`, 207 – 231, gated at 274). So a run item that changes a cell outside its hand-over under the same bump passes every test; the golden test only reports the bump. CONFIRMED by reading. | Each run item's checker diffs the handed-over file against version 1 and confirms that only the cells in the item's `handsOver` line moved. As test hardening, pin the cells outside each table's hand-over unconditionally, or compare them past the pin against a committed copy of the version-1 cells. | The run items' checks (M0-b-05a, M0-b-05b, M0-c-07a, M0-c-07b); test hardening M4 |
| N2 | The census snapshot (`census.test.ts` 13), the extension-cell list (`tables.test.ts` 403) and the key-value rule "never a new one" (455) are exact at every version. So a hand-over that ADDS a calibratable cell, a marker or a new key value, rather than rewriting an existing cell, turns the tables red, and a run item cannot edit this item's tests (C-0115, C-0117). Every hand-over in `M0-work.json` names existing cells, so the case is PLAUSIBLE only for M0-c-07b's "infill constants on a statistics miss" if a new constant is needed. | If a run item must add a cell, its brief routes the addition through an author-side fix lane of M0-s-02, which re-pins the snapshots. Otherwise gate the exact snapshot equality on `atGolden`, as C-0162 (1) does for the defaults, and hold "no calibratable cell lost" past the pin. | Before M0-c-07b lands (M0's AFTER-M-1 waves) |
| N3 | The categorical-option check (`cell.ts` 152 – 159) requires an `MFCG` and an `FTG` entry, but nothing checks a preset's value against the cell's admissible words. `rungProfile` reads only the default, so a preset `FTG: 'sometimes'` on `layers.sewers.existence` loads. The shipped presets are pinned to the off words by `tables.test.ts` 425 – 434: this round's mutant D05 (CITY's FTG preset set to `always`) was killed there. So only a writer who also edits that test escapes. CONFIRMED by reading and by the mutant. | M1's preset resolution (§7.6's one order) reads a preset value through the same reader as the default, for example `oneOf`'s word list, so a preset word outside II.7.4's or II.7.5's union is refused, naming the cell and the preset. | M1 (the parity presets, §4b) |

## Consolidation round C1 — the old → new map (lane `build/M0-s-02-consolidate-1`, 2026-10-11; J260, J263 Q8, J268)

Round R1 of `consolidation/model-tables-plan.md` (§1.1 T-1 – T-9, §2 C-tables-1 – 4, §3.1 T-tests-1); choices row C-0320.
No file was removed or renamed; one file was created (`test/loader/support.ts`, not a test file). `cell/index.ts`,
`loader/index.ts`, the package barrel, `loader/bands.ts` and the fourteen data files are byte-identical. The helpers
below are file-level exports imported by path, never index lines (J268 Q5).

| finding | before (file:lines of the tree read 2026-10-11) | after |
|---|---|---|
| T-1 | `cell/cell.ts:73` `KEY_VALUE`; `loader/table.ts:39` `CELL_KEY` | `cell/cell.ts` `export const STABLE_KEY` (the one regex, same source, no flag); `valueProblem` and `checkTable`'s cell-key test read it; `ROW_KEY` stays in `table.ts` with its own comment (digit-first) |
| T-2 | `cell/cell.ts` private `nonEmptyString`; `loader/table.ts:56` inline `typeof … && trim()` | `cell/cell.ts` `export function nonEmptyString`; `checkTable`'s `section` test calls it |
| T-3 | the three-way conditionals of `checkTable` (`table.ts:44–46`) and `Table.refuse` (`:158–160`); the literals of `loadTable` (`:247`), `View.table` (`view.ts:41`), `checkCell`'s closure (`cell.ts`) | `cell/cell.ts` `export function issueAt({ table, row?, cell?, reason })` → `{ table, reason }` / `{ table, row, reason }` / `{ table, row, cell, reason }`, keys in that order, an absent key left absent, a cell only within a row (the conditionals' rule); every site above builds through it |
| T-4 | `loader/census.ts:12–14` (the loop inside `calibratableCensus`) | `loader/census.ts` `export function tableCensus(t)` (reads `t.id`, which equals the loaded id); `calibratableCensus` spreads it per id. `workLimits/table.ts:220–224` stays a copy until R2 (M0-f-03a) imports `tableCensus` by path (W-2) |
| T-5 (a) | `cell/unit.ts:6–33` `type Unit` and `:36–64` `UNITS` | one private `UNIT_WORDS = [...] as const`; `export type Unit = (typeof UNIT_WORDS)[number]`; `export const UNITS: readonly Unit[] = Object.freeze(UNIT_WORDS)` — `UNITS` keeps its declared type `readonly Unit[]` (a tuple type would be a type change, J268 Q6) |
| T-5 (b) | `cell/cell.ts:17–20` the three types; `:69–71` the three sets | private `EXTENSION_OVERS`, `EXTENSION_MODES`, `PRESET_IDS` (`as const`), the types derived, the sets built from them; the lists are not exported (no reader outside the file; the plan's "file-level exports" left unexported, C-0320 (4)) |
| T-5 (c) | `cell/provenance.ts` `REFERENCES` | KEPT APART; its comment now says which of the three vocabularies it is |
| T-6 | `loader/registry.ts:20–34` `TABLE_IDS`, `:39–53` `TABLE_SOURCES`' second list | `TABLE_IDS` the one `as const` list (type unchanged); `JSON_OF: Readonly<Record<M0TableId, unknown>>` (the compiler requires every id, no other); `TABLE_SOURCES = new Map(TABLE_IDS.map(...))` — no cast |
| T-7 | `view.ts:63–64` the field slice's inline H128 | `loader/table.ts` `export function cellSliceHash(key, c)` beside `rowHash`, same template; one paragraph above `cellPinning` states both forms (C-0157 (1)) |
| T-8 | `ladder.ts:75, 117, 120, 123` literals | `refuseCell` and the two row/table refusals through `issueAt`; `:123`'s joinMaxDelta refusal through `refuseCell` (same issue, same text) |
| T-9 | `loader/bands.ts` | KEPT, unchanged |
| C-tables-1 – 4 | `unit.ts:1–3` ("the design correction of 2026-10-03, M0-spec-notes N-18"); `cell.ts:72` ("the checker's"); `table.ts:1–5`; `census.ts:4` ("M0.md §4b"); `cell.test.ts:1–3` ("(N-18)") | rewritten as the plan says; `view.ts:1–5` adjusted to the two slice forms (the old "that row's or cell's pinning content" omitted the field slice's key) |

Tests (T-tests-1). Every `describe`/`it` title is kept verbatim; no test file was merged or renamed.

| helper in `test/loader/support.ts` | replaces | readers |
|---|---|---|
| `refusal(f)` (failure path `'no refusal'`) | `loader.test.ts:17–25` (same body); `cell.test.ts:17–25` (`'the table loaded'`, now the local `refuseTable(raw, id)`); `ladder.test.ts:141–150` (`'the profile was read'`, now the local `refuseProfile(raw, rung)`, which still parses outside the catcher) | cell, loader, ladder tests |
| `deepCopy(x)`, `rawTable(id)` | `loader.test.ts:29–31`; `ladder.test.ts:140`'s `copy`; `tables.test.ts`'s copy inside `handOver` | loader, ladder, tables tests |
| `cell(value, unit, calibratable?)` | `bands.test.ts:26` | bands test |
| `oneCell(c)`, `ONE_CELL` | `cell.test.ts:12–14`; `loader.test.ts:27` `MIN` | cell, loader tests |
| `pinnedFile(file, id, pin)` | `golden.test.ts:25–40`'s body (the three expectations, both messages and the `console.info` line verbatim) | golden test; R2's `workLimits/table.test.ts` (W-3) |

New pins (oracles of this round; each green on the BEFORE sources too): `cell.test.ts` "derives the Unit type from the
list: the same union of words" (`expectTypeOf`, tsc) and "types the markers with §7.6's words" (types and every word
accepted); `loader.test.ts` "lists the thirteen ids once, typed as the literal tuple, and the sources in their order",
"builds each issue with its keys in order, an absent key left absent, never undefined" (T-3's rule), "refuses a blank
section" (T-2's trim), "hashes a slice in SliceRef's fixed forms: a row's pinning content; a field's key and its cell's
(C-0157 (1))" (with the first-'/' split); `ladder.test.ts` "refuses a granularity.joinMaxDelta without one entry per
band, naming the cell"; `census.test.ts` "counts the tables it is given, in their order, each by the one loop".

Mutant map after the round (the lane's mirror, `--bail=1` over `test/{cell,loader,data}`): every one of the 47 targeted
mutants red — the round's N01 – N27 (issueAt's shapes and key order, STABLE_KEY, trim, the census loop and its ids,
the slice form and split, the registry's map, the derived vocabularies, each ladder/view/loader refusal site) and the
earlier rounds' M01, M02, M04, M05, M08, M10 – M14, M17, M19 – M22, S01, S10 – S12, D08, D10, killed by the same titles
the checks list; three type mutants (a unit word dropped from the type, a preset id added, a table missing from
`JSON_OF`) refused by `tsc -b`.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N4 | `TableError` declares `row?` and `cell?` as class fields, so an instance carries them as own keys holding `undefined` (ES2022 class fields); the "absent, never undefined" rule holds for the `issues` objects, which is what the tests and any JSON of an issue read, not for the error object's own keys. Unchanged by this round. | If an error is ever serialised whole, assign the fields in the constructor only (no field declarations) and pin `Object.keys`. | hardening (M4) |
| N5 | `checkCell` now builds its issues through `issueAt`: identical for every `CellAt` (row and cell are strings by type); a JavaScript caller passing a `CellAt` without `row` would get an issue without the `row` key rather than `row: undefined`. No caller does. | none | — |

## Consolidation round C1 — the closing check's notes (lane `check/M0-s-02-consolidate-close-1`, 2026-10-11)

Verdict and evidence in `checks/M0-s-02-c1.md`. None of these rows is a blocker (J162, J169; N-45/J202: a further
hardening test or a stale comment that still matches the code is a note, never a fail).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N6 | No test pins that the stable-key grammar refuses `/` (the pinned refusals are a space — `'bad key'`, `'two words'` — and a leading digit, `'1c'`): the closing check's mutant N07 (`STABLE_KEY` = `/^[A-Za-z][A-Za-z0-9_.\-/]*$/`) survives the consolidated tests, and the same widening of `KEY_VALUE` and `CELL_KEY` survives the BEFORE sources and tests (246/246) — a gap older than this round. Behaviour is unchanged: the regex text is identical before and after, and a probe of cell keys, key values and row keys `a/b`, `a/`, `a b`, `a,b`, `#f00`, `é`, `a\n` gives byte-identical issues on both trees. A cell key with `/` would still slice correctly (the view splits at the first `/`, and `ROW_KEY` has none), so nothing reads wrongly today. | One `it` in `loader.test.ts` (under the existing describe; a new title) refusing the cell key `a/b` and the key value `a/b`, naming the cell. | hardening (M4) |
| N7 | `test/data/tables.test.ts:281`'s section rule still reads "(M0.md §2's chains; the checker's F-1)" — a round citation of the kind §2's comment rule drops; the plan's C-tables-4 said "no other narration in this item's tests" and did not list it. The comment still matches the code (the simulated hand-overs below it). | Next touch of the file: "(M0.md §2's chains; C-0162 (1))". | next touch / M4 |
| N8 | The plan's T-6 NUANCE says "`Object.freeze` on `TABLE_IDS` as today"; `TABLE_IDS` was never frozen at runtime (an `as const` array, readonly at the type level only), before or after. The round kept it unfrozen, which is the identical behaviour (NO-SHIFT probe line `TABLE_IDS.frozen` false on both trees). Recorded so a later round does not "restore" a freeze that would be a behaviour change. | none (the plan's sentence is the error) | — |
