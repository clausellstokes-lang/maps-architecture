# M0-k-06 — the first check's notes (not failing lines)

These notes come from the independent first check of item M0-k-06, the clean-room content scanner (lane
`check/M0-k-06`, 2026-10-06). Under J180 and the FAIL SAFE NOW rule (N-45, J202), none of them fails the item. Each one
is either a coverage edge the design does not name, a reading the author declared in C-0247, a fail-safe over-report,
or an equivalent mutant. They are recorded for the hardening milestone M4. The verdict, its one blocker and the
evidence are in `checks/M0-k-06.md`.

| id | observation | suggested handling | milestone |
|---|---|---|---|
| K6-1 | **Some source-code layouts of a list escape the list check.** C-0247 (4) counts a column in a source only as a block of lines that each hold exactly one string literal, with only brackets and punctuation besides. The checker ran three fixtures holding the five words of one synthetic list. Each one gave 0 hits: a TS array of records written one per line (`{ name: '<word>', n: 1 },`), an array literal written two strings per line, and one written as two strings on one line plus three on the next. The same words as a JSON array, or as one key's values across JSON records, are each a column hit. The difference is declared in C-0247 (4), and @plat/tables keeps its tables in JSON, which is scanned whole. | Read an array literal in a source as a column: all of its strings, whatever their layout, and one key's string values across the object literals of one array. Test it with the three fixtures above. | M4 |
| K6-2 | **A regular expression after `)` is read as division.** In `if (ok) /<token>/.test(s)`, the lexer reads the regex body as code, so a listed token in it is never seen. The opposite case, `i++ / n`, reads the code after `/` as text. That one fails safe, because it can only add a hit. Both forms are rare in this tree. | Track the token before `/` the way a TypeScript scanner does (a `)` that closes an `if`, `while` or `for` head allows a regex). | M4 |
| K6-3 | **One copied list on one line of a JSON file read whole is reported twice.** A one-line JSON array of five listed words in `packages/tables/data/` gives a line hit and a column hit, each with its own report row. One allow entry silences both, because the list allow matches by words whatever the `where`. | Report a column hit only when no line hit at the same line and list already names it, or document the double row. | M4 |
| K6-4 | **A source line's whole text is a colour candidate.** A private class member written `#` plus six hex letters (for example `#facade`) is a colour candidate. It hits only when the list holds that value, so it fails safe, and it can be allowed. | No change needed. M0-k-07 allows such a hit if one occurs. | M4 |
| K6-5 | **An allow entry without `file` silences its content in every file.** This is declared in C-0247 (6) and matches the design's check-plus-text allow form. A broad entry still hides later copies of the same text in other files. | M0-k-07's reviewers should prefer an entry with `file` set, or the M4 scanner should report how many hits each entry silenced. | M0-k-07 / M4 |
| K6-6 | **One bench test passes without checking anything once M-1's list exists.** `bench/test/scan/scan.test.ts` "on this tree with no deny-list, the real run stops …" returns early when `denylist.json` exists. After the crossing it asserts nothing. M0-k-07's run then covers the real tree. | Assert the other branch: with the list present, the run's exit is 0 or 1 and never 2. | M4 |
| K6-7 | **The JSON reader counts only `\n` as a line end.** A JSON file with lone `\r` line ends reports every string at line 1. The source reader and the whole-text reader count `\r` correctly. | Count a lone `\r` in `json.ts`'s `ws()`. | M4 |
| K6-8 | **Equivalent mutants (no test needed).** M31 removes the symbolic-link skip, but `lstatSync` already reports a link as neither a file nor a directory, so the walk still skips it. M33 removes the baselines-folder `strings` line, but a `.json` under `packages/` already reads as `strings`. | None. | — |
| K6-9 | **The closing check (`check/M0-k-06-close-r1`) found three more allow near-misses that no test covers.** After fix 1, the allow-exactness case fails on the sub-run, super-run, sub-token, super-token and prefix-run forms. Three targeted mutants of `allows()` still survive near (61/61) and related (1295/1295): C05 matches a 3-gram entry by suffix (`f.key.endsWith(a.key)`), C06 matches a 3-gram entry by its tokens in any order, and C10 matches a file entry by path suffix. The code is exact (`a.key === f.key`). A mirror probe confirmed that a suffix sub-run entry (the last five of six) and a reversed-run entry each stay unreviewed, while the exact run, upper-cased with punctuation, silences the hit. The probe's two cases fail under C05 and C06 respectively. | Add three cases to "near misses stay unreviewed": the last five tokens of a listed six-token run; the listed run reversed; and a file entry `d.bin` against a hit at `docs/digest/d.bin`. Each must give exit 1 with `allowed` 0 and have an exact-text control. M0-k-07 should review its first entries with these forms in mind. | M4 (M0-k-07 to note) |
| K6-10 | **No test shows that a `0x` colour allow entry is accepted.** allow.ts's header says "`#` or `0x` allowed", but mutant C12, which drops the `0x` form from `COLOUR_TEXT`, survives near and related. This fails safe: a refused entry stops the scan with exit 2 and names the entry, so nothing is silenced by mistake. A mirror probe confirmed that a `0xc0ffe3` entry silences a `#C0FFE3` hit. | Add a `0x`-form entry to the "an entry for every hit" case. | M4 |

## Hardening round S1 (lane `build/M0-k-06-fix-s1`, flow flow-7, 2026-10-20)

The session's hardening round of M0-k-06 (J237 (2), J186, J192; the inventory `checks/hardening-inventory.md`, rows
M0-k-06:11 – :20; the re-triage of 2026-10-19, J423, plan entry 44, batch B8; ZERO REFUSALS J264, J290 / N-58). This is
merged round M-K: it runs first, and M0-k-05's round S1 follows it on the same branch. The re-triage keeps four rows open:
**K6-1**, **K6-2**, **K6-6** and **K6-9**. It defers **K6-3**, **K6-5**, **K6-7** and **K6-10** to M4, and nothing is
built for them. **One source file changed:** `packages/testkit/src/scanner/lexer.ts`, the source reader. The tests
changed in `packages/testkit/test/scanner/scanner.test.ts` and `bench/test/scan/scan.test.ts`. The choices row is
C-0400.

### Row by row

| row | outcome | the fix or pin and its evidence | mutant (lane mirror) |
|---|---|---|---|
| K6-1 (some source layouts of a list escape the column check) | **FIXED** and **PINNED** | `lexer.ts` now tracks the code's brackets. An array literal is a column whatever its layout. The column holds the array's own strings (not strings nested in a call, an object or another array) and, separately, one key's string values across the object literals that are its elements. A key is an identifier or a string followed by `:`. A block of one-string lines whose every string belongs to one array's own strings is that column already, and it is not reported twice (C-0247 (5): one hit per column and list). An unclosed array still gives its column. This is the note's own fix shape. New `it` in 'the list hit': 'a source array literal is a column whatever its layout: records one per line, two strings per line, two then three (K6-1)'. It holds the checker's three fixtures plus the records with quoted keys. Each gives exactly one column hit at its first cell's line (`records.ts`:2, `quoted.ts`:2, `two.ts`:2, `two-three.ts`:1). It also reads `readSource`'s columns and has a four-word control that gives 0 hits. The existing one-string-per-line case now also checks that `readSource(lit).columns` holds that one column. | K1a (the pre-round `lexer.ts`), K1b (no column from an array's own strings), K1c (no records merged into their array), K1e (a string key is not a key): **KILLED** by the new `it`. K1d (the line block not dropped inside its array) is **KILLED** by the one-column check. |
| K6-2 (a regular expression after `)` is read as division) | **FIXED** and **PINNED** | `lexer.ts` marks each `(` that follows `if`, `while`, `for` (also `for await`) or `with`. A `/` right after the `)` that closes such a head starts a regular expression. After any other `)`, a `/` still divides. This is the note's own fix shape: it tracks the token before the `/`. The opposite case (`i++ / n` read as text) fails safe and is left as the note says. New `it` in 'the source reader': 'a regular expression after the ) of an if, while or for head is read as text; after any other ) a / divides (K6-2)'. The `if`, `while (f(x))`, `for` and `for await` heads give their regex bodies as text. `(a + b) / c / d` and `f(a) / g(b) / 2` give no text. The token planted in `if (s) /<token>/.test(s)` is a hit at its line. | K1a (pre-round `lexer.ts`), K2a (the head mark never set), K2b (every `)` allows a regex; killed by the division controls), K2c (`for` not a head), K2d (`for await` not a head): **KILLED**. |
| K6-3 (one copied list on one JSON line is reported twice) | **DEFERRED** to M4 (J423 re-triage) | Nothing built. The double row still fails safe: both rows are hits, and one list allow entry silences both. | — |
| K6-5 (an allow entry without `file` silences its content everywhere) | **DEFERRED** to M4 (J423 re-triage); M0-k-07's reviewers still prefer entries with `file` set | Nothing built. | — |
| K6-6 (the bench test returned early once M-1's list exists) | **FIXED** and **PINNED** | `bench/test/scan/scan.test.ts`: the real-tree case now asserts on both branches, with `expect.assertions(1)`. While the list is absent, the run is exit 2. With the list present, the run is 0 or 1, never 2. A new `it` runs the present branch today: 'on this tree with a deny-list present (a synthetic one beside it), the real run scans plat/ and exits 0 or 1, never 2 (K6-6)'. It points the entry's `list` context at a synthetic list in the OS temporary folder and scans the real plat/ with the committed allow file. There is no `scan stopped` line, the exit is 0 or 1, and the report counts more than 100 files. | K6a (the committed `denylist-allow.json` replaced by `{}`, so the real run stops while a list is present): **KILLED** by the new `it`. The pre-round bench file stays 8 / 8 green under it, which is the note's finding. |
| K6-7 (the JSON reader counts only `\n` as a line end) | **DEFERRED** to M4 (J423 re-triage) | Nothing built. `json.ts` is unchanged. | — |
| K6-9 (allow near-misses C05 / C06 / C10 survive) | **PINNED** (the code was already exact) | 'near misses stay unreviewed' gains four cases, each with an exact-text control. (i) The suffix sub-run: the last five tokens of a listed six-token run, with the exact run upper-cased with punctuation as the control. (ii) The run reversed. (iii) A file entry `d.bin` against the hit at `docs/digest/d.bin`. (iv) A token entry whose `file` is a path suffix (`src/a.ts`) of the hit's file. Each miss gives exit 1, `allowed` 0 and `unusedAllow` [0]. Each control gives exit 0 with the entry used. The `it`'s title names the new forms. | K9a = C05 (a 3-gram entry matched by suffix), K9b = C06 (a 3-gram entry by its tokens in any order), K9c = C10 (a file entry by path suffix), K9d (an entry's `file` by path suffix): **KILLED**. |
| K6-10 (no test shows a `0x` colour allow entry accepted) | **DEFERRED** to M4 (J423 re-triage) | Nothing built. A refused entry still stops the scan naming it, which fails safe. | — |

### Behaviour, API and texts

* **A declared shift, with nothing persisted moving.** The source reader finds more columns. A probe ran the pre-round
  reader and the round's reader over every `.ts .tsx .mts .cts .js .mjs .cjs` file under plat/ (1 255 files, outside
  `node_modules`, `dist`, `coverage`). Neither reader threw. The per-line texts (tokens, 3-grams, line list words) are
  identical in all 1 255 files: the tree holds no regex after a statement head. The columns of three or more cells go
  from 110 to 1 550 (422 files gain some), and every pre-round column is still covered by a column of the round's. More
  columns can only add list hits, which fails safe. No deny-list is committed (`denylist.json` has not crossed), so no
  committed scan result, digest, golden or report format moves. The report's schema `plat.scan-report/1` is unchanged.
* **API frozen (J263 Q1).** No export of `scanner/index.ts` or of the testkit barrel was added, removed or renamed.
  `readSource`'s signature and `SourceText` are unchanged. No message text changed (J263 Q6).
* **Old file → new file map (J263 Q8).** No test file was merged, split, renamed or deleted. One `it` title changed:
  'near misses stay unreviewed: …' now names its added forms. Two `it`s were added to `scanner.test.ts` (53 → 55). In
  `scan.test.ts`, 'on this tree with no deny-list, the real run stops naming denylist.json (exit 2), never a vacuous
  pass' became 'on this tree, the real run stops naming denylist.json (exit 2) while the list is absent; with the list
  present it runs (exit 0 or 1, never 2)', and one `it` was added (8 → 9).

### Refusals, before = after (J264 (5), J290 / N-58)

The scanner has no B-FUZZ family. Its registered refusals are the stops of C-0247 (6) and (7) (exit 2): **21**
`ScanStop` sites before and **21** after (allow.ts 13, denylist.ts 7, scan.ts 1; lexer.ts has none). Every one is an
**UNLAWFUL** input: a missing or unreadable deny-list or allow file, a version or digest-length mismatch, a malformed
allow entry, a list failing attachment C's form, or a tree with nothing to scan. Each verdict is **REFUSE**, and the stop
names the file and entry to correct. Lawful-input refusals: **0 → 0**. The new list-present real-tree run stops nowhere.
The census did not rise.

### Self-check (J183): the faults re-introduced in the lane's mirror

The mirror was `/home/user/maps-scratch/waves/selfcheck-build-M0-k-06-fix-s1/plat`, a `cp -a` copy. It was proved
isolated before the first mutant: no link points into the tree, and `@plat/kernel` and `@plat/testkit` resolve inside the
mirror. The unmutated folders ran 64 / 64. Each fault ran as `corepack pnpm exec vitest run --maxWorkers=1 --bail=1
packages/testkit/test/scanner bench/test/scan`. Each mutated file was restored from the tree and `cmp`-checked. The
mirror was deleted at the end.

| id | fault | result | the round's pin |
|---|---|---|---|
| K1a | the pre-round `lexer.ts` | KILLED (without `--bail`: the K6-1 and K6-2 cases both red) | K6-1 and K6-2 cases |
| K1b | an array's own strings make no column | KILLED | K6-1 case |
| K1c | records not merged into their array's key columns | KILLED | K6-1 case |
| K1d | a line block inside an array column not dropped | KILLED | the one-string-per-line case's `readSource` check |
| K1e | a quoted key never becomes the key | KILLED | K6-1 case (`quoted.ts`) |
| K2a | the statement-head mark never set | KILLED | K6-2 case |
| K2b | every `)` allows a regex | KILLED | K6-2 case (the division controls) |
| K2c | `for` not a statement head | KILLED | K6-2 case |
| K2d | `for await` not a statement head | KILLED | K6-2 case |
| K9a | C05: a 3-gram entry matched by suffix | KILLED | 'near misses …' suffix sub-run |
| K9b | C06: a 3-gram entry matched by its tokens in any order | KILLED | 'near misses …' reversed run |
| K9c | C10: a file entry matched by path suffix | KILLED | 'near misses …' file by path suffix |
| K9d | an entry's `file` matched by path suffix | KILLED | 'near misses …' entry's file by path suffix |
| K6a | the committed allow file `{}` (the real run stops with a list present) | KILLED (the pre-round bench file: 8 / 8 green) | K6-6 list-present `it` |

Fourteen faults, all killed. No equivalent mutant.

### Gates (in the tree, 2026-10-20, W = 1)

| gate | command | result |
|---|---|---|
| install | `corepack pnpm install --frozen-lockfile` | exit 0, "Already up to date" |
| lint | `corepack pnpm lint` | exit 0: the planted probe lines reported, `lint: probe-red ok`, `lint: 9 whole-tree checks` |
| build | `corepack pnpm build` | exit 0 (`tsc -b` and the esbuild bundles) |
| NEAR (full strength) | `corepack pnpm exec vitest run --maxWorkers=1 packages/testkit/test/scanner bench/test/scan` | exit 0: `Test Files 2 passed (2)`, `Tests 64 passed (64)` |
| RELATED (PLAT_FUZZ_RUNS=1000) | `corepack pnpm exec vitest related --run --maxWorkers=1 packages/testkit/src/scanner/*.ts bench/src/scan/index.ts` | exit 0: `Test Files 91 passed (91)`, `Tests 1595 passed (1595)`, 2 328 s; no red, foreign or own |

### Notes (round S1; none fails the item)

| # | note | handling |
|---|---|---|
| N-s1-1 | **Some source list layouts are still not a column.** These are the layouts the K6-1 fix shape does not name: one object's string values written one per line (`a: '<word>',`, a dict's values), strings nested one level down in an array (`[f('<word>'), …]`, or an array of pairs `[['<word>', 1], …]`), and string keys across records. Each one is still found when the list stands on one line (the line rule), and not otherwise. | M4 hardening: read an object literal's string values, and an array's nested single-string elements, as columns. |
| N-s1-2 | **The re-landed record no longer lists `packages/testkit/baselines/denylist-allow.json`.** `corepack pnpm landed` gives 13 created and 2 changed, where round fix1 gave 14 and 2. The allow file is handed over to M0-k-07 (C-0101), and under C-0318 a label that names no wave gives a handed-over path to its latest owner. This is the session's note N-24 (`checks/M0-s-01-notes.md`). The file is unchanged by this round (sha256 `37517e5f…`, `[]`). | None for this round: N-24 is the session's. |

## Hardening round S1 — the closing check's notes (lane `check/M0-k-06-close-s1`, flow flow-7, 2026-10-20)

The closing check of round S1 (verdict `checks/M0-k-06-s1.md`, PASS) found no blocker. These two notes are new. Neither
fails the item: the code gives the right result on each input below (probes in the lane's own mirror), so each is a
further hardening test or a layout the fix shape does not name (step (3) of the brief; N-45, J202).

| id | observation | suggested handling | milestone |
|---|---|---|---|
| K6-11 | **Five of the closing check's own mutants of round S1 survive near (64 / 64) on exact code.** No test reaches the inputs that tell them apart. X05 makes an array's own strings a column only from four strings up, where it was two. X06 does the same for one key across records. A three-cell array `['<w1> <w2>', '<w3> <w4>',` + newline + `'<w5>']` is then no column. X07 drops the column of an unclosed array, though C-0400 (1) states "an unclosed array still gives its column". X08 counts strings inside a call in an array (`[f('<w>'), …]`) as the array's own; it can only add hits. X14 drops `with` from the statement heads. `with` is a syntax error in strict-mode code, so every TypeScript module and ES module is safe, and only a sloppy-mode `.js` / `.cjs` file can hold one. Unmutated, the round's reader makes the three-cell column, the three-record column and the unclosed array's column, gives no column for the call strings, and reads `with (o) /<token>/` as text. Only `scanner.test.ts` and `scan.test.ts` call the scanner (grep under plat/), so RELATED cannot kill them either. | Add the cases to 'a source array literal is a column whatever its layout': a three-cell array and three records over multi-word cells (a hit), an unclosed array (a hit), and `[f('<w>'), …]` (no column, as C-0400 (1) states). Then add a `with` head to the K6-2 case, or drop `with` from the claim. | M4 |
| K6-12 | **More source list layouts that are no column, beyond N-s1-1's.** Each holds the five words of one synthetic list, one per line, and gives no column and no line hit. They are records with a computed key (`{ [K]: '<w>' },`), an object whose values are records (`{ r0: { name: '<w>' }, … }`), and records whose value lies one level down (`[{ a: { name: '<w>' } }, …]`). The note's three fixtures, records with comment lines, ternary or template values, a spread, `as` casts, an arrow-function member, a class field and an array inside a template substitution are all columns now. | Handle them with N-s1-1: read nested records' key values as columns of the outer array or object. | M4 |
