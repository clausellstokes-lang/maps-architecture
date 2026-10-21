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

Round R1 of `consolidation/model-tables-plan.md` (§1.1 T-1 – T-9, §2 C-tables-1 – 4, §3.1 T-tests-1); choices row C-0323.
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
| T-5 (b) | `cell/cell.ts:17–20` the three types; `:69–71` the three sets | private `EXTENSION_OVERS`, `EXTENSION_MODES`, `PRESET_IDS` (`as const`), the types derived, the sets built from them; the lists are not exported (no reader outside the file; the plan's "file-level exports" left unexported, C-0323 (4)) |
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

## Hardening round S1 (lane `build/M0-s-02-fix-s1`, 2026-10-21; J237 (2), J186, J192, J264, J290 / N-58; merged round M3, third part)

The round takes the hardening inventory's FIX-NOW rows `M0-s-02:13 N1` and `M0-s-02:14 N2`, the row `M0-c-05:34 N-10`
(routed here by the re-triage of 2026-10-19, J423), the queue row L22 (N4, N6, N7 above) and e-04 s3's REPORTED s6
table-hash half (`checks/M0-e-04-s3.md` N-s3c-3, J431). Choices row C-0399. No data file changed: the thirteen tables,
golden.json, the census, extension and key-value snapshots are byte-identical; no export of a folder index or the barrel
was added, removed or renamed; no refusal message changed.

| row | outcome | change (inside the item's owns) | pin (test title) | mutants / plants |
|---|---|---|---|---|
| N1 | FIXED and PINNED | `test/data/handover.ts` (new, not a test file): `HAND_OVERS` (M0-work.json's five hand-overs; cut.json's chain is M0-b-05b's `flattenM` then M0-c-07b's `cut.*`, bands.json is M0-c-07b's whole table) and the hand-over law `handOverProblems(t)`: past its golden version a handed-over table keeps every version-1 cell; a cell that moved, or one added, lies in one of the table's hand-overs and carries 'M-1 ⟨date⟩' with its unit and flag kept; every other cell keeps its whole version-1 content (value, unit, provenance, flag, markers, note); cells never move without a bump; a table no item receives stays at its golden version. `test/data/handover-v1.json` (new): the version-1 content of the five handed-over tables, equal to the shipped files while they sit at their golden version. `tables.test.ts`: the design pins of the cells no hand-over writes run at every version (`granularityFixed`, `regimesFixed`, `interiorFixed`; ways.json's lane and alley widths equal cut.json's while cut's width cell is not re-signed, `cutWaysWidths`); the handed-over cells' defaults stay gated on `atGolden`; simulated hand-overs start from the version-1 copy (`simBase`), so they mean the same after a real hand-over | 'pins the frontage bands, the join maxima and the vacancy shares at every version …'; 'pins the separations, a, heading, bias, …: M0-b-05a writes only the floors (N1)'; "pins ways.json's lane and alley widths to cut.json's while no hand-over re-signs them, and the reach weights, …"; 'a hand-over that moves a cell outside its hand-over is refused past the golden version, re-signed or not (N1)'; "past M0-b-05b's bump, cut.stop, cut.t, cut.arc, the portal gap and their P-id provenance keep their version-1 content unless a hand-over re-signs them (N1)"; 'a version-1 cell lost, a cell added outside a whole-table hand-over, …'; 'names the hand-overs M0-work.json gives …'; 'holds every shipped table to it …'; the six simulations' new title | plants D1 – D8 (below) survive the OLD tests and are killed by the new; mutants T1 – T12, W1 killed |
| N2 | FIXED and PINNED | `census.test.ts` `censusProblems`, `tables.test.ts` `markerProblems` and `keyValueProblems`: each snapshot is exact for a table at its golden version; past it a hand-over may add a calibratable cell, a marker or a key value and never loses a committed calibratable cell or marker (a marker never changes); the whole-snapshot equality and its count hold while every table is at its golden version; the snapshot files' counts (182, 41) are pinned unconditionally | "past a table's golden version a hand-over may add a calibratable cell and never lose one; at it the snapshot is exact (N2)"; "… may add a marker and never take a committed one away; at it the list is exact (N2)"; "… may write a new key value; at it a new one is refused (N2)" | plants E1 – E3 (lawful additions) red on the OLD tests, green on the new; E4, E5 (a lost flag, a lost marker) red on both; mutants C1, C2, X1, X2, K1, K2 killed |
| M0-c-05:34 N-10 | REPORTED (contract/ownership reason) | none. `regimes.json` is M0-b-05a's at `flow-7`: `ownersAt(work, 'plat/packages/tables/data/regimes.json', Infinity)` = `['M0-b-05a']` (C-0318), and `dense_core.blockDepthFloorM` is exactly that hand-over's cell ("the regime block-depth minimums"). §4.4's row gives "37–45 m (applied by S8; the lo re-fitted at M-1 on MFCG's intramural blocks, E12)" — the design text already carries the M-1 re-fit, which M0-b-05a applies with provenance 'M-1 ⟨date⟩'. The cell stays [30, 45] at version 1 (`regimesDefaults` pins it at the golden version; the new law admits M0-b-05a's re-signed [37, 45], simulated as plant D1's first half) | — (the deliverable is choices row C-0399 (3)) | informative probe in the mirror (W=1): `regimes.json` v2 with `dense_core` [37, 45] re-signed: layout `test/growth/s5cd`, `test/infill/bands`, `test/pipeline/base/table.test.ts` 160/164 — `test/growth/s5cd/prune.test.ts` red on 4 (`blockWidthCm` 3700 where line 83 pins 3 000 for `dense_core`; 'over the three seeds the trim and the prune both ran': pruned 0); baseline 164/164 |
| e-04 s3 N-s3c-3 (s6 table-hash) | FIXED (the loader's half) and PINNED; the composer's half REPORTED | `src/loader/view.ts`: `tableView(ids = TABLE_IDS, registered: readonly Table[] = [])` — a package registers a table it keeps beside its code (layout's `s6`; `@plat/tables` cannot import layout's file, the dependency runs tables ← layout, and `tables/data/s6.json` is in no item's owns) by handing the checked `Table`; the view carries it after the shipped ids and its hash covers it in the one form (`⟨id⟩@⟨version⟩:⟨hash⟩` lines). Refused, naming it: a registered value that is not a `Table` ("a registered table must be a Table that parseTable checked", named `registered[i]`), a shipped id ("a shipped table is loaded by id, never registered"), an id the view already carries ("registered twice in this view"). The default view, its hash and S6's reading are unchanged | 'carries the registered table after the shipped ones …'; 'hashes two views that differ only in their s6 differently, and each apart from the view without it'; "hashes the registered table in the view's one form, after the shipped ids …"; 'refuses, naming it, a registered table that is no checked Table, …' | the four registration tests red on the BEFORE sources; mutants S1 – S6 killed |
| L22 N4 | FIXED and PINNED | `src/loader/table.ts`: `TableError`'s `row` and `cell` are `declare`d, never defined as class fields, so an error naming no row or cell carries no such own key (before: own keys holding undefined) | 'gives a TableError no own row or cell key it does not name — absent, never undefined, as its issues (L22, N4)' | red on the BEFORE sources; N4a, N4b killed |
| L22 N6 | PINNED | none in source (the grammar already refused '/') | "refuses a '/' in a row key, a cell key and a key value — the slice key's separator is never part of a key (L22, N6)" | N6a (`STABLE_KEY` admits '/'), N6b (`ROW_KEY` admits '/') killed |
| L22 N7 | FIXED (comment) | `tables.test.ts`'s section rule now reads "(M0.md §2's chains; C-0162 (1))" | — | — |

**Data plants** (the fault N1 and N2 name, planted in the mirror's `data/` and restored by `cp` + `cmp`; the tables
test folder at W=1, `--bail=1`):

| plant | what | OLD tests | NEW tests |
|---|---|---|---|
| D1 | regimes v2: floors re-signed and `dense_core.a` 1.3 → 1.4 re-signed | survives | killed |
| D1b | regimes v2: floors re-signed, `suburb.separationM.CITY` → 90 unsigned | survives | killed |
| D2 | cut v2: `flattenM` re-signed, `stop.uniforms` → 5 unsigned | survives | killed |
| D3 | cut v2: `flattenM` re-signed, `stop.uniforms`' P1 → P2 | survives | killed |
| D4 | granularity v2: depth re-signed, `modest.frontageM` moved | survives | killed |
| D5 | interior v2: `modest` reach weights moved, re-signed | survives | killed |
| D6 | cut v2: `width.laneM` moved unsigned (ways.json's equality) | survives | killed |
| D7 | ways.json bumped (no item receives it) | survives | killed |
| D8 | cut v2: `settings.flattenShare` deleted | survives | killed |
| E1 | cut v2: a calibratable cell added, re-signed | red | green |
| E2 | cut v2: an extension marker added, re-signed | red | green |
| E3 | cut v2: a cell with a new key value added, re-signed | red | green |
| E4 | cut v2: `flattenM`'s calibratable flag dropped | red | red |
| E5 | interior v2: a committed marker dropped | red | red |

**Targeted mutants** (the mirror, W=1, `--bail=1` over `test/{cell,loader,data}`; each restored and confirmed with `cmp`):
S1 (registered tables not carried), S2 (the hash over the shipped ids only), S3 – S5 (each refusal removed), S6 (the
registered tables before the ids), N4a/N4b (class fields back), N6a/N6b (the two key grammars admit '/'), T1 (every cell
handed over), T2 (no 'M-1' check), T3 (a lost cell unreported), T4 (no unit/flag check), T5 (an added cell anywhere),
T6 (no bump check), T7 (a table no item receives may move), T8, T9, T12 (regimes', interior's, granularity's hand-over
widened to the whole row), T10 (content compared by value only), T11 (the version-1 copy edited), C1/C2, X1/X2, K1/K2
(the N2 gates exact at every version, or the "never lost" half removed), W1 (the ways equality never checked): 30 of
30 killed. New tests on the BEFORE sources: 5 red (N4's and the four s6 registration tests), 266 green; the BEFORE tests on
the new sources: 254/254.

**Refusal census** (J264, N-58; one probe on both trees in the mirror): lawful 490 inputs (13 tables, 3 rung profiles,
the census, `tableView()`, 470 row and field slices, `tableView(TABLE_IDS, [s6])`) refused 0 before and 0 after;
unlawful 1 598 (every cell of the 13 tables without its unit, provenance, calibratable or value; an unknown table id;
a view's unknown table) refused 1 598 before and after; the probe's 2 088 lines byte-identical (sha256 `7c864f4b…`).
The round adds three refusal sites, all UNLAWFUL input to `tableView`'s new parameter, verdict REFUSE (typed
TableError naming the table; the caller's alternative is the lawful form: a `parseTable`d Table, a shipped table by id,
one id once). Lawful-input refusals 0 → 0.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N9 | cut.json's file cannot tell M0-b-05b's bump from M0-c-07b's, so the law holds cut.json at "version-1 content, or re-signed 'M-1 ⟨date⟩'" across the whole chain: a b-05b run that re-signs a cell outside `flattenM` passes the tables' tests. A version-staged reading (version 2 = b-05b's `flattenM` alone) would turn c-07b red whenever b-05b's run made no bump. | M0-b-05b's checker diffs cut.json against the version-1 copy (`test/data/handover-v1.json`) and confirms that only `settings/flattenM` moved (N1's first handling). | the run items' checks |
| N10 | When M0-c-07b's `cut.*` moves `width.laneM` or `width.alleyM`, ways.json's lane and alley widths (this item's, never handed over) no longer equal them, and the equality pin skips the re-signed cell; §4.6 P8 and C-0158 say they are one width. | A c-07b recalibration that moves a width goes with an author-side lane of M0-s-02 for ways.json (or a session ruling). | before M0-c-07b lands |
| N11 | For the session (N-10's class): §4.6's current text gives the deep-interior default shares already re-fitted ("poor: court 0.355, back lane 0.248, through-alley 0.298, rear plots 0.099; …", provenance "M-1 2026-10-04"), while interior.json holds the version-1 shares (0.35 / 0.25 / 0.3 / 0.1, …) — M0-c-07a's hand-over cells; and §4.6 cites "the re-fitted `modest` plot depth of 36 m" against granularity.json's [18, 30] — M0-b-05a's. Neither file is this item's at flow-7. | The receivers' briefs carry the design's re-fitted values; nothing for M0-s-02. | M0-b-05a, M0-c-07a |
| N12 | For the session (N-10): `layout/test/growth/s5cd/prune.test.ts:83` (M0-c-05's) pins the dense core's prune block width as the literal 3 000 cm; M0-b-05a's re-signed floor (37 m by §4.4's row) turns it red (the mirror probe above) — the N2 class in another item's tests. | M0-c-05's owner derives the expectation from `regimes.json` (`pair('dense_core', 'blockDepthFloorM')[0] × 100`), or b-05a's brief names the shift. | before M0-b-05a's wave |
| N13 | For the session (N-s3c-3's second half): the view now carries a registered `s6` with its hash, but no caller registers it: `layout/src/pipeline/base.ts`, `runner.ts` and `fixtures/flat.ts` take `tableView()`, and layout's test helper `withS6` builds a view that keeps `base.hash`. | Their owners pass `tableView(TABLE_IDS, [s6Table()])` (and `withS6` → `tableView(TABLE_IDS, [variant])`), threading one view through `siteFeatures` and S6. | M0-e-04 / the composer's owner |

## Hardening round S1 — the closing check's notes (lane `check/M0-s-02-close-s1`, 2026-10-21)

Verdict and evidence in `checks/M0-s-02-s1.md`. None of these rows is a blocker (J162, J169; N-45/J202: a contrived
or deliberate-writer escape, or a further hardening test, is a note, never a fail).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| N14 | `tableView`'s first registration refusal tests `t instanceof Table`, but `Table` is exported from the barrel and its constructor runs no check, so `tableView(TABLE_IDS, [new Table('s6', { version: 1, section: 'x', rows: { r: { c: { value: 1 } } } })])` is accepted and the view carries a cell with no unit (probe in this check: `parseTable` refuses the same raw, the view accepts the unchecked instance, `cell('r','c').unit` undefined). The message promises "a Table that parseTable checked". No source in `packages/*/src` or `bench/src` constructs a `Table` other than `parseTable` (grep), so only a deliberate writer reaches it. | Brand a checked Table (a module-private symbol or WeakSet that `parseTable` fills, read by `tableView`), or make the constructor private behind `parseTable`; pin it with the probe's instance. An export change, so it waits for a round that may touch the API (J263 Q1). | hardening (M4) |
| N15 | The hand-over law (`test/data/handover.ts`) compares a handed-over table cell by cell and its version, but not its table-level `section` field; a run item rewriting a handed-over file's `section` past the golden version passes the tables' tests. The field is design-section metadata, not read by any stage and outside the pinning hash, so nothing reads wrongly. | Hold `section` to its version-1 text in `handOverProblems` (one line and one simulated case). | hardening (M4) |
