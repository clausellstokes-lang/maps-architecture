# plat/tools and plat/scripts — consolidation plan (lane `session/consolidation-tools`, flow-7)

Written by the consolidation architect seat under docs/PROGRESS.md J260, J263 and J268 (the owner's directive of
2026-10-11: "clean up, consolidate, make elegant and coherent the code and comments, and make sure it stays at the same
quality or higher") and J112's rule (elegance without losing nuance; every unification carries a full EQUIVALENCE LIST;
a nuance lost is a blocker). This seat planned only: no code, test, fixture or data file was changed and no test suite
was run. Evidence is the code, the tests and the records — `checks/M0-d-07.md` (rounds 0, r1, r2, r3, r4) and
`-notes.md` (N1 – N6), `checks/M0-s-01.md`, `-r1.md`, `-r2.md`, `-r3.md`, `-s1.md`, `-s2.md` and `-notes.md`
(N-1 – N-16), `checks/M0-spec-notes.md` N-12, every choices row the tools' comments cite (C-0005, C-0007 – C-0011,
C-0013, C-0025, C-0028, C-0030, C-0044, C-0051 – C-0060, C-0062 – C-0065, C-0067, C-0071, C-0085, C-0092, C-0093,
C-0095, C-0104, C-0106, C-0111 – C-0115, C-0117, C-0120 – C-0122, C-0124 – C-0131, C-0152, C-0259, C-0286, C-0294,
C-0306), M0.md §0, §3 and §4, both items' entries in M0-work.json — read whole under `plat/CLEAN-ROOM.md` §1, with the
design's §6.5 whole, §14's package rules and §17.1 (3), §17.4 as M0.md §4 states them. One read-only probe was run (no
file written): typescript-eslint 8.71.0's parse of `typeof xs.sort` (finding D-4). Queue row L12 is cited from one row of
`docs/M0-FIX-QUEUE.md` read by grep (a session file outside rule 1's list, declared in this seat's ledger row; it
holds no reference material) because `checks/M0-s-01-notes.md` N-16 and J268 Q1 point at it.

Conventions. `lint/…` is `plat/tools/lint/…`, `landed/…` is `plat/tools/landed/…`, likewise `notices/`, `vendor/`
(always `plat/tools/vendor/`, never `plat/vendor/`), `scaffold/`, `vitest/`; `scripts/…` is `plat/scripts/…`. Line
numbers are those of the tree read on 2026-10-11. "Exported" means a name a module exports. **The invariant of this
whole plan:** (1) every lint rule's acceptance set is identical — every fixture under `lint/fixtures/` keeps its verdict
and reports exactly its planted lines, the real tree lints 0, and `probe-red` reports the same ten planted lines with the
same rules; (2) every whole-tree check returns the same `{ ok, problems, … }` on every tree — the same problem strings in
the same order, the same `counts`, `scanned` and `report` fields; (3) every printed line and every exit code a CLI or
`corepack pnpm lint` produces is identical, save `lint: eslint <N> files`, whose N grows by exactly the number of files
the lint round creates (§0); (4) every persisted form is byte-identical — `packages/kernel/vendor-audit.json`,
`THIRD-PARTY-NOTICES.txt`, `vendor/vendor.lock.json`, the snapshot schema `plat-landed-snapshot/1` and the record schema
`plat-landed-record/1` with every field, key order and layout `formatJson` writes; (5) every exported name that another
file, a package.json script, a test or a bench job (`bench/src/tier-jobs/index.ts` runs
`tools/lint/licences.mjs`'s `checkLicencesOf`) imports or invokes keeps its name, its module and its behaviour; a name
nothing reads may be removed only where §1 says so; (6) every `describe` and `it` title is kept verbatim (J263 Q8), and
every message text is kept verbatim — the `(Q23)` token in `LEDGER_RULE` and the `(N-s1-1, Q26)` tokens in
`tiny-sentinel.mjs`'s error included (J263 Q6's rule: a message change is an output shift and is out of the pass).

Scale. The tooling is 8 100 lines of `.mjs` (about 4 500 of code and 3 500 of tests) plus 82 fixture files. M0-d-07
took a first round and four fix rounds (C-0125 – C-0131), then C-0152's scan half and C-0259's two boundary checks;
M0-s-01 took five fix rounds (C-0062 – C-0124) and two session rounds (C-0259, C-0306). Each round added a precise
mechanism and named it; the code is careful, the rules are tight and the tests are strong (M0-d-07's five checks
replayed about a hundred targeted mutants, M0-s-01's two session checks 53). The
patchwork is of three kinds: (a) one mechanism written two or three times because each round wrote its own — the parser
choice for a file linted alone (`paths.mjs`, `directives.mjs`, `vendor-scan.mjs`), the global-reference walk, the
type-position test, the linted file's place, the parser entries of `recommendedFor`, the table-grammar tests and the
"same entry" test of `tools/landed`, the temporary-tree and timeout boilerplate of nine test files; (b) comments that
narrate the round that added a thing ("the kernel reuse round, J224", "M0-s-01's third fix round", "the checker's H1,
round r2", "(Q23)") instead of stating the rule; (c) small drift — one stale header (`scripts/lint.mjs` lists three of
nine checks), one stale comment (`vendor-scan.mjs`'s extension list), one dead export (`dirOf`), one dead re-export
(`moduleCandidates` from `paths.mjs`), one unreachable guard (`sort-with-comparator.mjs:43`), a list written twice in
one test file. **Nothing found is a behaviour bug.** Several observations change a verdict and are therefore out of this
pass (§4, §5): they are named so that the hardening phase can take them.

---

## 0. Summary and round order

**What was found, by folder** (ids are §1's):

* **`lint/rules/`** — the global-reference walk written twice in `shared.mjs` (D-1); the type-position test written
  three times (D-2); the linted file's place computed three times (D-3); an unreachable guard (D-4); three deliberate
  wrapper sets that read as accidental (D-5, KEEP APART, comment only); an inline comparator that is `byCodeUnit` (D-6);
  a dead export (D-7); one concept named `SHIPPED` and `MODEL_PACKAGES` (D-8).
* **`lint/` standalone Linter** — the parser choice of a file linted on its own written three times, with a script-mode
  retry that two callers take and one does not (L-1, a new module `lint/standalone.mjs`, and a new pin first: round r2's
  survivor MV1 left the retry untested); a dead re-export (L-2); the repository-path check the only default-exported
  check (L-3).
* **`lint/` plugin and checks** — the nine check objects written in four shapes (C-1); the three parser entries of
  `recommendedFor` repeating two keys (C-2).
* **`lint/` walks and extension sets** — six walks, each its check's scope (W-1, KEEP APART, comparator spelling only);
  two extension sets written as literal regexes equal to shared constants, two deliberately narrower (W-2).
* **`lint/vendor-scan.mjs`**, **`lint/kernel-boundary.mjs`, `bench-boundary.mjs`** — comment drift and narration (V-1,
  B-1); the scan's own hash of re-encoded text kept apart (V-2).
* **`landed/`** — the "same entry" test written twice (A-1); the record-path test written twice (A-2); one id grammar
  named twice (A-3); the Markdown table grammar written twice (A-4); narrating headers (A-5); self-containment kept
  (A-6, KEEP APART).
* **`notices/`** — two inline comparators (N-1); narrating comments (N-2); keep-aparts (N-3).
* **`vendor/` (the tools)** — one redundant spelling (VT-1); keep-aparts (VT-2).
* **`scripts/`** — a stale header (S-1); the build's per-package body not importable (S-2, MA5's survivor); keep-aparts
  (S-3).
* **`scaffold/`, `vitest/`, the workspace configs** — a list written twice in `workspace.test.mjs` (F-1); test-file
  exports nothing reads (F-2); a deliberately stricter bare-pnpm detector (F-3, KEEP APART); the vitest config's
  setup-file mapping written twice (F-4); narrating comments.
* **The scaffold's package-index headers and README** — the false "exports nothing yet" sentence in six package
  indexes, already routed to M0-s-01's next round by J268 Q1 (X-1, see Q2); one stale README parenthesis (X-2).

**Round order** (one Opus seat per work item, inside its `owns`; a round depends only on the rounds listed):

| # | Round (work item, owns) | Depends on | What it does (findings) |
|---|---|---|---|
| R1 | **M0-d-07** — `tools/lint/` (rules/, index.mjs, the checks, resolve.mjs, the tests; `fixtures/` read, never written) and `packages/kernel/vendor-audit.json` (never written: its byte-equality is the oracle) | — | First the new pins of §3.1 (T-lint-0). Then D-1 … D-8, L-1 … L-3, C-1, C-2, W-1, W-2, V-1, B-1; comment rewrite §2.1; test plan §3.1 (T-lint-1 … T-lint-5). Creates two files: `lint/standalone.mjs` (L-1) and `lint/test-support.mjs` (T-lint-1). |
| R2 | **M0-s-01** — `tools/landed/`, `tools/notices/`, `tools/vendor/`, `tools/scaffold/` (its `fixtures/` never written), `tools/vitest/`, `scripts/*.mjs`, `vitest.config.ts`, `README.md`; and, if the session answers Q2 so, the six `packages/*/src/index.ts` header lines | — (see the note) | A-1 … A-6, N-1 … N-3, VT-1, VT-2, S-1 … S-3, F-1 … F-4, X-1, X-2; comment rewrite §2.2; test plan §3.2. Creates no file. |

The two rounds share no file and neither imports a name the other changes: the lint imports `stableJson` from
`vendor/common.mjs` and `checkLicences`, `devClosure`, `productionClosure` from `notices/closure.mjs`, which R2 keeps
byte-for-byte in name and behaviour; R2's files import nothing from `tools/lint/`. They may run in either order or beside
each other. **Recommended: R1 first, R2 after R1's closing check.** The lint is every other round's gate (each closing
check quotes `probe-red`), so it should be consolidated and closed once, before the other packages' consolidation rounds
close on it; and the machine is a 4-core container where each round runs the `tools` project once at `--maxWorkers=1`
(about 250 tests), so two rounds beside each other would double the contention. R2 must not run beside a session round
that edits `tools/landed/landed.mjs` (queue row L12, Q3): the two would edit one file.

Each round appends, as J263 Q8 rules, a one-line map to its item's notes file (`checks/M0-d-07-notes.md`,
`checks/M0-s-01-notes.md`): R1 "new: `lint/standalone.mjs` (L-1: `languageOptionsFor`, `isDirectiveNote`, re-exported by
`paths.mjs`), `lint/test-support.mjs` (T-lint-1); removed: `shared.mjs` `dirOf`, `paths.mjs`'s re-export of
`moduleCandidates`"; R2 "no file created or removed".

**The common oracle of both rounds** (every command from `plat/`, as `corepack pnpm …`; the closing check repeats each):

* `corepack pnpm lint` exit 0, its output equal line for line to the output before the round (taken by the round's first
  act and kept in its scratch folder) save `lint: eslint <N> files`, where N grows by exactly the files the round creates
  (R1: 2; R2: 0) — the ten `lint probe-red:` lines, the five `lint vendor-scan:` lines, the two `lint licences:` lines,
  the nine `lint: <check> ok` lines and `lint: 9 whole-tree checks` verbatim.
* `corepack pnpm exec vitest run --project tools --maxWorkers=1`: every test green; the test count equal to the count
  before the round plus exactly the new pins this plan names (R1: T-lint-0's three; R2: none unless Q1 adds some); every
  `describe` / `it` title present verbatim (a script compares the two verbose listings).
* `sha256sum packages/kernel/vendor-audit.json THIRD-PARTY-NOTICES.txt vendor/vendor.lock.json` equal before and after;
  `corepack pnpm vendor:verify` (`vendor:verify ok — 49 files match vendor.lock.json`) and `corepack pnpm notices:check`
  (`notices ok — THIRD-PARTY-NOTICES.txt is current` · `licences ok — 10 production packages, 3 dev exceptions`)
  verbatim.
* R2 only: `corepack pnpm build` exit 0, its log lines verbatim (six `build: esbuild @plat/<p> -> … (<bytes> bytes) +
  LICENSE, THIRD-PARTY-NOTICES.txt` lines, the same byte counts) and every `packages/*/dist/index.js` byte-identical to
  the build before the round; `corepack pnpm bench -- nosuch` exit 64 with its message; `corepack pnpm landed` and
  `landed:verify` without arguments exit 64 with their usage lines.
* `corepack pnpm landed:verify -- <label> --item <item>` ok after the round's `landed` (the label of the open wave or flow).
* The targeted mutants each finding names, replayed one at a time in a scratch mirror (`--maxWorkers=1`), each red.

---

## 1. Findings per folder

Each finding: **where** (file:lines) · **consolidation** · **EQUIVALENCE** (what stays identical) · **NUANCE** (every
edge case the merged code keeps) · **ORACLE** (the tests and fixtures that prove zero shift; the earlier rounds'
mutants the merged tests must still kill; any new pin) · **RISK** · **ruling needed?**

### 1.1 `lint/rules/` (R1, M0-d-07)

**D-1 — one walk over a file's unresolved value references.** `shared.mjs:76–95` `globalAccesses(sourceCode, names)`
and `shared.mjs:98–110` `globalObjectRefs(sourceCode)` each loop `sourceCode.scopeManager.scopes` → `scope.references`,
skip a type-only reference (`ref.isTypeReference === true && ref.isValueReference !== true`) and skip a reference
resolved to a variable with a definition (`v && v.defs.length > 0` / `ref.resolved && ref.resolved.defs.length > 0`).
*Consolidation:* a module-private generator `function* unresolvedValueRefs(sourceCode)` in `shared.mjs` yields each
surviving `ref.identifier` in the same scope and reference order; `globalAccesses` keeps its name test, its
global-object member test (`GLOBAL_OBJECTS`, `staticMemberName`, the `via` field) and its final sort; `globalObjectRefs`
keeps its `GLOBAL_OBJECTS.has(id.name)` test and its sort. Both exported names, signatures and return shapes stay.
*EQUIVALENCE:* the same identifiers in the same insertion order, so the same arrays after each function's stable sort by
`range[0]` (`globalAccesses` by `a.node.range[0]`, `globalObjectRefs` by `a.range[0]`); every report of
math-allowlist, no-object-key-iteration, no-nondeterminism and the vendored census (`vendor-scan.mjs:81`) unchanged.
*NUANCE:* an implicit library global with no definition counts as global (the `defs.length > 0` test, never
`v !== null`); a local `Date`, a parameter `performance` and a TypeScript `declare const` binding are not globals (the
pass fixture `no-nondeterminism/pass-local-bindings.ts`); a reference through a global object counts as the member and
its node is the member expression; `globalObjectRefs` returns identifiers, `globalAccesses` objects — the generator
yields identifiers and each caller builds its own shape.
*ORACLE:* `rules.test.mjs` (every fixture of the four rules that read these: `math-allowlist/*`,
`no-object-key-iteration/*`, `no-nondeterminism/*` — `pass-local-bindings.ts`, `fail-globals.ts`, `pass-umd-wrapper.js`,
`fail-umd-reads.js`); `probe.test.mjs`; `vendor-scan.test.mjs` (the census of every fixture library and of the vendored
ones, and the audit equal to the scan); round 0's M6 (`sin` added to the allowlist) and round r1's MH (the
`globalThis`-as-value report off) red; two scratch mutants of the generator (it yields resolved references too; it drops
the type-only skip) each red on `rules.test.mjs`.
*RISK:* low. No ruling.

**D-2 — the type-position test, written three times.** `no-object-key-iteration.mjs:41` (`harmlessUse`: `p.type ===
'TSTypeQuery' || p.type === 'TSQualifiedName'`), `no-nondeterminism.mjs:95` (`parent && (parent.type === 'TSTypeQuery'
|| parent.type === 'TSQualifiedName')`), `sort-with-comparator.mjs:43` (`node.parent?.type === 'TSQualifiedName' ||
node.parent?.type === 'TSTypeQuery'`; see D-4).
*Consolidation:* `shared.mjs` exports `inTypePosition(node)` — "is the node the operand of a type query or a qualified
type name (`typeof Object.keys`, `typeof globalThis.Number`): a type, not a value read" — returning
`node.parent?.type === 'TSTypeQuery' || node.parent?.type === 'TSQualifiedName'`; `harmlessUse` keeps its `instanceof`
and callee clauses and ends `return inTypePosition(node)`; `no-nondeterminism.mjs:95` reads `if (inTypePosition(id))
continue; // a type: no read`.
*EQUIVALENCE:* the same boolean for every node (a missing parent gives false in all three spellings).
*NUANCE:* `harmlessUse` stays false for a node with no parent; the `instanceof` clause holds only for the right operand;
`Object(x)` and `new Object()` stay harmless (callee clause).
*ORACLE:* `no-object-key-iteration/pass-maps.ts:17` (`type Keys = typeof Object.keys;`), `no-nondeterminism/
pass-local-bindings.ts:10` (`typeof globalThis.Number`), the fail fixtures of both rules; r1's ME (`harmlessUse` always
true) red; a scratch mutant `inTypePosition` → false red (pass-maps.ts and pass-local-bindings.ts then report).
*RISK:* none. No ruling.

**D-3 — the linted file's place, computed three times.** `ratio-division.mjs:76` (`relPath(platRootOf(context),
resolve(context.physicalFilename ?? context.filename))`), `dependency-direction.mjs:94–96` (`root`, the unresolved
`filename`, `rel = relPath(root, resolve(filename))`, and `resolve(dirname(resolve(filename)), spec)` at :147),
`repository-path.mjs:28–31` (`root`, `filename = resolve(…)`, `dir`).
*Consolidation:* `shared.mjs` exports `lintedFile(context)` → `{ root, filename, rel }` (`root = platRootOf(context)`,
`filename = resolve(context.physicalFilename ?? context.filename)`, `rel = relPath(root, filename)`); the three rules
destructure it; dependency-direction's :147 becomes `resolve(dirname(filename), spec)`.
*EQUIVALENCE:* the same three strings in every rule (resolving an already absolute path is the identity, so
`dirname(resolve(filename))` with the unresolved name equals `dirname(filename)` with the resolved one).
*NUANCE:* `settings.plat.root` (the tests' fixture root) still wins over `PLAT_ROOT`; `physicalFilename` (a processor's
real file) still wins over `filename`; a file outside the root gives `rel === null`, and each rule keeps its own reading
of that (`ratio-division`: no kernel exemption; `dependency-direction`: no rule at all, `return {}`).
*ORACLE:* every fixture of the three rules, among them `lint-as:` fixtures (`dependency-direction/*`,
`repository-path/*`), `ratio-division/fail-ratio-elsewhere.ts` (a `ratio` outside the kernel is no exemption), the
typed pair; `paths.test.mjs` "plat/repository-path on a fixture tree"; round 0's M2 (kernel may import model), r2's MO
(`isModelSrc` always false), MP, MZ3 red.
*RISK:* low. No ruling.

**D-4 — an unreachable guard.** `sort-with-comparator.mjs:43` returns early when a `sort` / `toSorted`
MemberExpression's parent is a `TSQualifiedName` or a `TSTypeQuery`. Under the pinned typescript-eslint 8.71.0 a type
query's operand is a `TSQualifiedName` chain and never a MemberExpression: the seat parsed `type S = typeof xs.sort;
type T = typeof Array.prototype.sort; let u: typeof globalThis.Number;` and found no MemberExpression at all, only
`TSQualifiedName` under `TSTypeQuery` (and under `TSQualifiedName`) (CONFIRMED, read-only probe). No fixture reaches the
line, and the MemberExpression visitor never sees a type operand.
*Consolidation:* remove line 43; the module comment says, in one clause, that a type query's operand is a qualified name,
not a member expression, so the visitor meets no type.
*EQUIVALENCE:* no input reaches the branch under the pinned parser, so every report is unchanged.
*NUANCE:* a parser upgrade is a dev-dependency change (§17.4's exact pins, `pnpm-lock.yaml`) that re-runs the whole
suite; if a later parser put a MemberExpression in a type query the rule would report it as `sortAsValue` — a false
refusal, fail-safe, visible at once.
*ORACLE:* `sort-with-comparator/pass-comparators.ts`, `fail-default-sort.ts`; r1's MF (the member visitor off) red; the
probe line 12 (`Object.keys().sort()`) and 13 (`[3, 1].sort()`).
*RISK:* none. No ruling (the session may prefer to keep the guard; it then becomes `inTypePosition(node)` of D-2, Q6).

**D-5 — three wrapper sets, deliberately different (KEEP APART; comment only).** `shared.mjs:113–122` `unwrap` strips
`as`, `satisfies`, `!`, `<T>`, `TSInstantiationExpression` and `ChainExpression`; `ratio-division.mjs:38–43` `uncast`
strips only `as`, `<T>` and `satisfies` (C-0128 (4): the divisor's *own* type is judged under a cast; `n!` keeps its
non-null type and stays a typed expression); `sort-with-comparator.mjs:12–17` `isCallee` climbs `ChainExpression`, `!`,
`as`, `satisfies` and `<T>` (the forms between a member and its call). Merging them would change what ratio-division
judges as a literal-typed divisor (r1's MG: "ratio-division judges the cast's type") or what counts as a callee.
*Action:* one sentence in each doc comment naming its set and why it differs from `unwrap`. No code change.
*ORACLE:* `ratio-division/typed/fail-typed.ts` (`x / (n as 2)` refused), `pass-typed.ts`; r1's MG red.

**D-6 — `vendoredLibraries`' comparator is `byCodeUnit`.** `shared.mjs:176` `.sort((a, b) => (a.name < b.name ? -1 :
a.name > b.name ? 1 : 0))` → `.sort((a, b) => byCodeUnit(a.name, b.name))` (`byCodeUnit` is defined in the same file,
:227–229, as a function declaration and is hoisted).
*EQUIVALENCE:* the identical comparator. *ORACLE:* `vendor-scan.test.mjs` (the audit's library order equals the
committed record). *RISK:* none.

**D-7 — a dead export.** `shared.mjs:231–232` `export const dirOf = dirname;` ("dirname that keeps working on virtual
paths") is imported by no file (the `dirOf` in `scaffold/workspace.test.mjs:291` is that test's own local), and its
comment is misleading (`dirname` is lexical on every path). *Consolidation:* remove the export, its comment and, if no
other use remains, `dirname` from the file's `node:path` import (`shared.mjs` still uses `join`, `relative`, `resolve`,
`sep`). *EQUIVALENCE:* no importer. *ORACLE:* a named import of a missing export fails at module link, so `corepack pnpm lint` (which loads
the plugin) and the whole `tools` project loading are the check; `grep -rn dirOf plat/tools plat/scripts` finds only
`workspace.test.mjs`'s local. *RISK:* none.

**D-8 — one concept, two names.** `dependency-direction.mjs:34` `const SHIPPED = new Set(MODEL_PACKAGES);` is used only
at :100 for `isModelSrc`; the rest of the file and `shared.mjs` call the same five packages `MODEL_PACKAGES`.
*Consolidation:* rename the local to `MODEL_PACKAGE_SET` (module-private; not exported). The doc comment of
`adoptionTable` keeps "shipped packages" where it means the packages whose manifests declare the adopted libraries (at
M0 the same five; the separating nuance at M1 is N-3's). *EQUIVALENCE:* a local rename. *ORACLE:* r2's MO red.

**D-9 — `rules/no-bare-pnpm.mjs` holds the rule and its whole-tree half (KEEP).** C-0093's three parts are one rule:
(b) is the ESLint rule, (a) and (c) the check `checkNoBarePnpm`, and they share `commandsOf`, `commandWord` and
`runsBarePnpm`. Moving the check to its own file would move six exported names that `index.mjs` and
`no-bare-pnpm.test.mjs` import. One file per rule stands; only its check object takes C-1's shape.

### 1.2 `lint/` — one file linted on its own (R1)

**L-1 — the parser choice of a standalone lint, written three times.** Three modules run ESLint's `Linter` on one file
outside the tree configuration and each chooses the parser from the extension:

* `paths.mjs:105–130` `lintFile`: TypeScript family (`TS_FILE`) → `{ parser: tseslint.parser, parserOptions:
  { sourceType: 'module', ecmaFeatures: { jsx } } }`; otherwise `{ ecmaVersion: 'latest', sourceType: <'commonjs' for
  .cjs, else 'module'>, parserOptions: { ecmaFeatures: { jsx } } }`; `jsx` is `.tsx` or `.jsx`; on a fatal message for a
  non-TypeScript file it **retries once as `sourceType: 'script'`** (:123–126), mutating the one config entry.
* `directives.mjs:45–70` `directivesOf`: the same two option objects, character for character (:53–55), and **no
  retry**: a fatal message is "cannot be read".
* `vendor-scan.mjs:95–116` `scanFile`: TypeScript family by its own regex `/\.(ts|mts|cts)$/` → `{ parser, parserOptions:
  { sourceType: 'module' } }` (no `ecmaFeatures`); otherwise `{ ecmaVersion: 'latest', sourceType: <commonjs | module> }`
  (no `parserOptions`); **retries once as a script** (:109), resetting its census sink before each attempt.

*Consolidation:* a new module `lint/standalone.mjs` ("ESLint's Linter on one file outside the tree's configuration: the
parser a file's extension needs, and the note ESLint adds for a directive when inline configuration is off"), exporting

```js
/** The language options for one file linted alone; `script` re-parses a JavaScript file as a classic script. */
export function languageOptionsFor(rel, { script = false } = {}) { … }   // the lintFile form, verbatim
/** ESLint's note on an inline directive under noInlineConfig (moved from paths.mjs; paths.mjs re-exports it). */
export function isDirectiveNote(m) { … }                                   // paths.mjs:136–138, verbatim
```

`lintFile` builds its entry with `languageOptionsFor(rel)` and, on its existing condition (`!ts && messages.some((m) =>
m.fatal)`), re-verifies with `languageOptionsFor(rel, { script: true })`; `directivesOf` uses `languageOptionsFor(rel)`
and keeps its no-retry rule; `scanFile` keeps its own `attempt` (the census reset), its own `files` glob and its own
TypeScript test, and takes `languageOptionsFor(rel)` / `languageOptionsFor(rel, { script: true })` for its two attempts.
`paths.mjs` keeps `export { isDirectiveNote } from './standalone.mjs';` (it is imported from `./paths.mjs` by
`paths.test.mjs`); `directives.mjs` imports it from `./standalone.mjs`.
*EQUIVALENCE:* `lintFile` and `directivesOf` build exactly today's objects. `scanFile` gains `parserOptions: {
ecmaFeatures: { jsx: false } }` on both branches: for the TypeScript family typescript-eslint takes JSX from the file
extension for every known extension (`.ts`, `.mts`, `.cts`) and ignores the flag, and for JavaScript espree's default is
`jsx: false` — so every scanned file parses to the same tree, and the scan's findings, census and file hashes, hence
`vendor-audit.json`, are byte-identical. Every problem string of the three callers unchanged.
*NUANCE:* (1) **who retries:** `lintFile` and `scanFile` retry a non-TypeScript file as a script, `directivesOf` never
does (model code is module code; a file that parses only as a script is unreadable there and fails closed — the pin
below holds today's behaviour; whether it should is Q8's); (2) the retry replaces the whole `languageOptions` (the
script form keeps `parserOptions.ecmaFeatures.jsx` in `lintFile`, and in `scanFile` it gains the same
`jsx: false`); (3) `.cjs` is CommonJS on the first attempt; (4) the TypeScript test differs by caller — `TS_FILE`
(with `.tsx`) for `lintFile` and `directivesOf`, `/\.(ts|mts|cts)$/` for `scanFile`, whose files are never `.tsx`
(`SCANNED_CODE`, W-2) — each caller keeps its own; (5) `noInlineConfig: true`, `reportUnusedDisableDirectives: 'off'`,
the plugins, rules and settings stay in each caller's entry, not in the helper.
*ORACLE:* **new pins first (T-lint-0):** (a) `vendor-scan.test.mjs` — a temporary library folder holding `legacy.js`
with `var o = {}; with (o) {}` (valid only as a script) scans `pass` with no `parse` finding (kills round r2's survivor
MV1, "the vendored scan's script-mode parse retry removed"); (b) `paths.test.mjs` — `lintFile` on `scripts/legacy.js`
with the same text returns `[]`; (c) `directives.test.mjs` — `directivesOf` on a model-closure `legacy.js` with the same
text returns `{ fatal: '…cannot be read…' }`. Each pin is green on today's code and is landed before the refactor. Then:
`paths.test.mjs` (every case; "judges a source of every code extension, declarations included", "is neither failed nor
silenced by a source's inline directives", "fails closed on a source its configuration does not reach", "tells ESLint's
note on a directive …"), `directives.test.mjs` (every case), `coverage.test.mjs` (the inline-directives cases),
`vendor-scan.test.mjs` (every case; the audit equal to the scan), `corepack pnpm lint`'s `vendor-scan ok`; r1's MB, MC,
MI, MJ and r2's MB2 red; MV1 red (new).
*RISK:* low; the audit is a byte-level oracle for the one caller whose options gain a key. No ruling beyond Q10 (the new
file).

**L-2 — a dead re-export.** `paths.mjs:28` `export { judgePath, judgeSpecifier, moduleCandidates } from
'./resolve.mjs';` — `judgePath` and `judgeSpecifier` are imported from `./paths.mjs` by `paths.test.mjs`;
`moduleCandidates` from `./paths.mjs` by no file (`digest-closure.mjs:21` imports it from `./resolve.mjs`).
*Consolidation:* drop `moduleCandidates` from the re-export. *EQUIVALENCE:* no importer. *RISK:* none.

**L-3 — the one default-exported check.** `paths.mjs:277–282` `export default { name: 'repository-path', run(root) … }`
is imported by `index.mjs:29` as `repositoryPathCheck`; every other check is a named `check`.
*Consolidation:* `paths.mjs` declares `export const check = { name: 'repository-path', run(root) { return
checkRepositoryPaths(resolve(root)); } };` and keeps `export default check;` (the same object, so the default export —
imported today — is frozen and unchanged); `index.mjs` imports `{ check as repositoryPath } from './paths.mjs'` like the
others. *EQUIVALENCE:* the same object in `plugin.checks[2]`. *ORACLE:* `index.test.mjs` "registers the nine rules and
the nine whole-tree checks" (names and order). *RISK:* none.

### 1.3 `lint/` — the plugin and its nine checks (R1)

**C-1 — one shape for the nine check objects.** Today: method form with `resolve(root)` (`coverage.mjs:93–98`,
`directives.mjs:94–99`, `kernel-boundary.mjs:170–175`), method form printing a report first (`probe.mjs:74–81`, async;
`vendor-scan.mjs:246–253`; `licences.mjs:32–38`), arrow form with `resolve` (`bench-boundary.mjs:76`), arrow form
without `resolve` (`rules/no-bare-pnpm.mjs:133`), default export (`paths.mjs`, L-3).
*Consolidation:* every check is `export const check = { name: '<name>', run(root) { … } }` (method form; `async run`
for probe-red as today) and calls its function on `resolve(root)`; the three that print take one helper from
`shared.mjs`, `printReport(name, lines)` — `for (const line of lines) process.stdout.write(\`lint ${name}: ${line}\n\`)` —
and return `{ ok: r.ok, problems: r.problems }` exactly as today; the six that do not print return their function's
whole result exactly as today.
*EQUIVALENCE:* the same printed lines in the same order; the same returned objects — in particular model-coverage's,
inline-directives' and repository-path's `run` still return `counts` (`coverage.test.mjs:123, 229, 242, 256, 310` read
`check.run(root)` with `toEqual({ ok, problems, counts })`), bench-boundary's `{ ok, problems }`, no-bare-pnpm's
`{ ok, problems, scanned }`; `no-bare-pnpm`'s `run` gains `resolve(root)`: `scripts/lint.mjs` passes
`fileURLToPath(new URL('../', …))` (a trailing `/`), and `checkNoBarePnpm`'s `relPath(root, abs)` and `join(root, …)`
give the same strings for `/x/plat/` and `/x/plat` (`relative` and `join` normalise the separator).
*NUANCE:* `probe-red` stays first (`probe.test.mjs` "is the lint's first whole-tree check") and the order of
`plugin.checks` stays `probe-red, vendor-scan, repository-path, inline-directives, model-coverage, no-bare-pnpm, licences,
kernel-boundary, bench-boundary`; `printReport` writes to stdout and problems are written by `scripts/lint.mjs` to stderr,
as today.
*ORACLE:* `index.test.mjs` "registers …"; `probe.test.mjs`; `bench-boundary.test.mjs` "passes on the tree as it stands"
(`check.run(PLAT)`); `coverage.test.mjs` (the five `check.run` cases); `corepack pnpm lint`'s output, line for line.
*RISK:* low. No ruling.

**C-2 — the three parser entries of `recommendedFor`.** `index.mjs:59–79`: `plat/parse-typescript`, `plat/parse-jsx`,
`plat/parse-cjs` each repeat `linterOptions: { reportUnusedDisableDirectives: 'error' }` and `plugins: { plat: plugin }`.
*Consolidation:* a module-private `const parserEntry = (name, files, languageOptions) => ({ name, files,
languageOptions, linterOptions: { reportUnusedDisableDirectives: 'error' }, plugins: { plat: plugin } });` and the three
entries written as three calls with today's `files` and `languageOptions` verbatim.
*EQUIVALENCE:* deep-equal objects with the same five keys (`index.test.mjs:188` pins `plugin.configs.recommended`
`toEqual(recommendedFor(closure))` and the entry names; ESLint reads the same configuration).
*NUANCE:* the `plat/digest-closure` entry stays `{ name, files: [...digest.outside], rules: { ...MODEL_RULES } }` with
no other key (pinned `toEqual` at `index.test.mjs:203–205, 230`) and present only when `digest.outside` is non-empty (an
empty `files` list is an ESLint error); the scope entries are unchanged.
*ORACLE:* `index.test.mjs` (every case: the configurations per path and extension, the closure entry, the fixture
closure lint); r1's MA, r2's MA2, MA3, MZ1, MZ2 red; round 0's M1 (probe red without the exponent rule).
*RISK:* none. No ruling.

### 1.4 `lint/` — walks and extension sets (R1)

**W-1 — six walks, each its check's scope (KEEP APART; comparator spelling only).**

| walk | file:lines | stat | skips | yields |
|---|---|---|---|---|
| `walkTree` | `paths.mjs:41–57` | `lstat`; links listed apart, never followed | `node_modules`, `coverage`, `.git`; `skippedFolder`: `tools/lint/fixtures`, `packages/*/dist`, `bench/dist`, `docs/build/landed/snapshots` | `{ files, links }`, plat/-relative, in walk order |
| `scopeFiles` | `rules/no-bare-pnpm.mjs:95–112` | `lstat` | `node_modules`, `dist`, `coverage`, every `outsideScope` folder (records, vendored libraries, the lint fixtures) | `package.json` and `*.md` in scope |
| `codeFiles` | `digest-closure.mjs:42–52` | `stat` (follows links) | `node_modules` | absolute code files, no declarations |
| `codeFilesOf` | `vendor-scan.mjs:44–57` | `stat` | `node_modules` | library-relative `SCANNED_CODE` files, no declarations |
| `kernelFiles` | `kernel-boundary.mjs:80–92` | `stat` | none | plat/-relative code and JSON files of `packages/kernel/src` |
| `walk` | `bench-boundary.mjs:14–19` | `stat` | none | absolute `BENCH_CODE` files |

A single parameterised walker would carry five flags (stat kind, skip set, keep test, path form, ordering) and change no
check's scope; the six scopes are each check's rule (C-0127 (2), C-0093, C-0125 (1), C-0126 (1), C-0259 (4)). Kept.
*The one uniformity:* `kernel-boundary.mjs:84` and `bench-boundary.mjs:15, 63` sort with the default `.sort()`, every
other walk with `.sort(byCodeUnit)`; they become `.sort(byCodeUnit)` (imported from `rules/shared.mjs`), and
`kernel-boundary.mjs:87`'s `relative(root, p).split(sep).join('/')` becomes `relPath(root, p)`.
*EQUIVALENCE:* `Array.prototype.sort` without a comparator compares the UTF-16 code units of each element's string
form, which for strings is `byCodeUnit` exactly; `relPath` equals the POSIX `relative` for a path inside the root (every
walked path is). *NUANCE:* `walkTree`'s output stays in walk order (a folder's children before the next sibling: `a/x`
before `a.js`), which fixes the order of repository-path's problems (`paths.test.mjs:112–121` pins it); no walk's skip
set or stat kind changes. *ORACLE:* `kernel-boundary.test.mjs` (all), `bench-boundary.test.mjs` (all), `paths.test.mjs`
"fails a symbolic link out of plat/, …" (the order). *RISK:* none.

**W-2 — extension sets.** (a) `kernel-boundary.mjs:87` `/\.(ts|tsx|mts|cts|js|jsx|mjs|cjs|json)$/` is `CODE_FILE` plus
`.json`: write `CODE_FILE.test(n) || n.endsWith('.json')` (same set; `CODE_FILE` matches declarations too, as the literal
does). (b) `vendor-scan.mjs:29` `DECLARATION = /\.d\.(ts|mts|cts)$/` is `shared.mjs:29` `DECLARATION_FILE`: import it.
(c) `vendor-scan.mjs:28` `CODE = /\.(js|mjs|cjs|ts|mts|cts)$/` and `scanFile`'s glob `'**/*.{js,mjs,cjs,ts,mts,cts}'`
(:100) are one list written twice: `const SCANNED_EXTENSIONS = Object.freeze(['js', 'mjs', 'cjs', 'ts', 'mts',
'cts'])`, `SCANNED_CODE` and the glob derived from it (the `CODE_EXTENSIONS` / `CODE_FILE` / `CODE_GLOB` pattern of
`shared.mjs:23–27`). (d) `bench-boundary.mjs:17` `/\.(ts|tsx|mts|cts|js|mjs|cjs)$/` (no `.jsx`) stays its own regex,
named `BENCH_CODE` with its doc comment.
*EQUIVALENCE:* (a) – (c) the same sets and globs. *NUANCE (the KEEP APART half):* the scan reads six extensions, not
`CODE_EXTENSIONS`' eight — a `.tsx` / `.jsx` file in a vendored folder is not scanned (`checks/M0-d-07-notes.md` N6;
widening it changes the scan's verdicts and the audit, Q9); the bench walk skips `.jsx` (the same: Q9). *ORACLE:*
`vendor-scan.test.mjs` "are the registry bytes the manifest lists" (`codeFilesOf` of every fixture folder), the audit;
r3's MC11 – MC13 (`isScannedFile` widened) red; `kernel-boundary.test.mjs` "passes on the tree" (the hit groups of the
133 allowlist rows, JSON data included). *RISK:* none.

### 1.5 `lint/vendor-scan.mjs` (R1)

**V-1 — comment drift.** The header's file list (:7–8: "`.js`, `.mjs`, `.cjs` and `.ts` sources") omits `.mts` and
`.cts`, which `CODE` scans (the drift `checks/M0-d-07-notes.md` N6 records) → name the six, as `SCANNED_EXTENSIONS`
does. `REVIEWED`'s doc comment (:31–38) narrates C-0126 (5)'s open finding and C-0152's patch → state the mechanism
(an entry pins one finding to the file's sha256, line and rule, so a byte change re-opens it, C-0126 (4)), that none is
open, and that flatbush's power is a patch exception (C-0152). No code change.

**V-2 — the scan's own hash (KEEP APART).** `vendor-scan.mjs:41, 115` hashes `Buffer.from(code, 'utf8')` — the file's
text decoded and re-encoded — while `vendor/common.mjs` `sha256File` and `landed/snapshot.mjs` `sha256` hash raw bytes.
For a file that is not valid UTF-8 the two differ, and `vendor-audit.json`'s per-file `sha256` and every `REVIEWED` pin
are the re-encoded form. Kept; one comment line says so.

### 1.6 `lint/kernel-boundary.mjs`, `lint/bench-boundary.mjs` (R1)

**B-1 — headers and two small forms.** Both headers narrate their origin (`kernel-boundary.mjs:1–3`: "the kernel reuse
round, J223 / J224; installed by build/M0-s-01-fix-s1, whose choices row records it"; `bench-boundary.mjs:1`: "the
kernel reuse round, J224") → state the rule and cite C-0259 (4) (§2.1). `bench-boundary.mjs:35`
`const rel = relative(root, file).split(sep).join('/')` is recomputed for every match inside the loop → computed once
before the loop (the same string for every match of one file). W-1's comparator and `relPath` apply.
*KEEP APART:* `bench-boundary.mjs:11` `TOWN = ['layout', 'site', 'model', 'tables']` is not `MODEL_PACKAGES` minus the
kernel: "town package" is the boundary's notion, "model package" the allowlist's, and they part at M1 (`@plat/labels`
and the render code §6.5 (3) brings into the allowlist are not town packages; packages like a dossier port may be town
without being model) — and `bench-boundary.test.mjs:49` pins the list. `SPEC` (:12) keeps its three forms (`from`,
`import (`, `import `); its escapes (`require`, `createRequire`) are `checks/M0-s-01-notes.md` N-5 (Q9).
*ORACLE:* `kernel-boundary.test.mjs`, `bench-boundary.test.mjs` (every case); C-0259's MD2 – MD17 (MD1 and MD14 are
the survivors of N-2 and N-3, Q1). *RISK:* none.

### 1.7 The rest of `lint/` (R1): `index.mjs`, `probe.mjs`, `licences.mjs`, `coverage.mjs`, `digest-closure.mjs`, `resolve.mjs`, `rules/index.mjs`

Comment rewrites only (§2.1), and two comparator spellings under W-1's equivalence: `probe.mjs:67` (`[...new Set(…)].sort()`
of rule ids) and `licences.mjs:26` (the production-closure report) → `.sort(byCodeUnit)`. Nothing else: `coverage.mjs`'s
`normalizedSetting` / `missingModelRules` and its three refusals, `digest-closure.mjs`'s walk and its seven output lists,
`resolve.mjs`'s lexical-first judgement, and `rules/index.mjs`'s rule sets are each one mechanism, written once.

### 1.8 `landed/` (R2, M0-s-01)

**A-1 — "the same entry", written twice.** `landed.mjs:330–331` `sameEntry(a, b)` (both defined, then symlink text or
sha256 equal) and `verify.mjs:56–59` `sameNow(entry, now)` (a `deleted` entry matches an absent file; otherwise `now`
defined and symlink text or sha256 equal).
*Consolidation:* `landed.mjs` exports `sameEntry`; `verify.mjs` keeps `sameNow` as `(entry, now) => (entry.status ===
'deleted' ? now === undefined : sameEntry(entry, now))`.
*EQUIVALENCE:* for a record entry (always defined) `sameEntry(entry, now)` is `now !== undefined && (entry.symlink !==
undefined ? entry.symlink === now.symlink : entry.sha256 === now.sha256)`, today's second branch with `===`'s operands
swapped. *NUANCE:* a symlink entry compares link text, never a hash (a link is recorded, never followed); a `deleted`
entry (its `sha256: null`, `was` kept) is matched by absence only.
*ORACLE:* `landed.test.mjs` "records a symbolic link by its text …", "names a file changed after its record: a note at
the wave's close, a failure for the item's checker", "passes a fully attributed wave …", the statuses test; S2's V1, V2
red. *RISK:* none.

**A-2 — "a record's own path", written twice.** `landed.mjs:342` `isRecordRel(rel)` and `verify.mjs:176–177` (the same
expression inline, then `rel.slice(LANDED_DIR.length + 1, -'.json'.length)`).
*Consolidation:* `landed.mjs` exports `isRecordRel`; `verify.mjs` calls it and keeps its id slice.
*EQUIVALENCE:* the identical predicate. *NUANCE:* a direct child of `docs/build/landed/` of any name counts (no `.json`
test), in both places; `snapshots/` is excluded from the snapshot itself (`isExcluded`). *ORACLE:* "passes a fully
attributed wave, the records themselves included". *RISK:* none.

**A-3 — one grammar, two names.** `landed.mjs:344` `validId` is `snapshot.mjs:162–164` `validLabel` (`typeof … ===
'string' && /^[A-Za-z0-9][A-Za-z0-9._-]{0,63}$/`): an item id names its record's file as a label names its snapshot's.
*Consolidation:* `validId` goes; `buildRecord` calls `validLabel(id)` (imported, as it already is). The refusal text
`invalid item id …` is unchanged. *ORACLE:* "exits 2 without a snapshot and 64 on bad arguments", "take no root … refuse
bad usage with exit 64". *RISK:* none.

**A-4 — the Markdown table grammar, written twice.** `landed.mjs:156–158` (`seatColumn`) and `:183–187`
(`ledgerTable`) each test a separator row with `/^\|[\s:|-]+$/` on the trimmed line and find the seat column with
`(splitCells(line) ?? []).findIndex((c) => /^seat\b/i.test(c))`.
*Consolidation:* two module-private helpers, `isSeparatorRow(line)` (`line !== undefined && /^\|[\s:|-]+$/.test(line.
trim())`) and `seatIndex(headerLine)`, used by both.
*EQUIVALENCE:* the same booleans and indices. *NUANCE:* `seatColumn` walks up to the table's first row and returns -1
without a separator under it; `ledgerTable` returns null in that case — each keeps its own answer; §2's table is the first
table under `## 2 ` (never `## 2a`); S2's A14 (`ledgerTable` without the separator check) is an equivalent survivor
(N-15): the check stays in both. *ORACLE:* the two Q23 describe blocks (8 tests), "finds §2's table and no stray in the
committed ledger"; S2's A1 – A3, A5, A7 – A13 red. *RISK:* none.

**A-5 — headers that narrate (comment only, §2.2).** `snapshot.mjs:2`, `landed.mjs:2`, `verify.mjs:2` each open "(M0-s-01's
third fix round; C-0104, C-0111)"; `landed.mjs:192, 200, 463, 496` cite "Q23" (a queue row); `verify.mjs:9` is one
150-character line. The rewrite cites C-0104, C-0111, C-0120, C-0121, C-0306 and states the protocol.

**A-6 — the attribution tools stand alone (KEEP APART).** `snapshot.mjs` defines its own `PLAT_ROOT` (:17), `byCodeUnit`
(:84) and `sha256` (:86–88), which `vendor/common.mjs` and `lint/rules/shared.mjs` also define. They stay: `landed`
judges every other tool's changes in a wave, so it imports nothing another round may edit in the same wave ("Node
built-ins only", `snapshot.mjs:10`). The three JSON forms are three formats, not one: `canonicalJson` (`snapshot.mjs:127–
131`: sorted keys, no white space — a CrossingRecord's identity, and the form `packages/testkit/src/parity/canonical.ts`
cites), `formatJson` (`:228–242`: insertion order, one primitive object per line — the snapshot and record layout) and
`vendor/common.mjs` `stableJson` (sorted keys, two-space indent, trailing newline — the lock and the audit); merging any
two changes a persisted byte. `canonicalJson` and `stableJson` also part on `undefined` (one writes the text `undefined`,
the other drops the key).

**A-7 — what this pass does not do in `landed/`.** Queue row L12 (a non-wave label resolves passed ownership at wave 0,
so M0-s-01's record claims the 30 module `index.ts` files; `checks/M0-s-01-notes.md` N-16) changes which files a record
lists — a behaviour change, out of a consolidation round (J268 Q2's rule). Q3. The survivors A4, A6, B6, V3 (N-11 –
N-14) are pin gaps, Q1.

### 1.9 `notices/` (R2)

**N-1 — two inline comparators.** `generate.mjs:118` sorts the production libraries with `(a, b) => (a.name < b.name ? -1
: a.name > b.name ? 1 : 0)`; `closure.mjs:115` sorts by name then version with a comparator that returns 1 for equal
pairs (`a.version < b.version ? -1 : 1`).
*Consolidation:* both import `byCodeUnit` from `../vendor/common.mjs` (the same item's file; Node built-ins only):
`generate.mjs` `(a, b) => byCodeUnit(a.name, b.name)`; `closure.mjs` `(a, b) => byCodeUnit(a.name, b.name) ||
byCodeUnit(a.version, b.version)`.
*EQUIVALENCE:* the first is identical. The second differs only for two entries with equal name and version, which no
input holds: `walk` keys its map by `name@version`, and the test-built maps (`notices.test.mjs` "reports a planted GPL
dev-only package …", "fails a GPL package in the production closure") hold distinct pairs — the implementer confirms
both by reading before the change. So the order, the failures and the exceptions are unchanged and
`THIRD-PARTY-NOTICES.txt` is byte-identical.
*ORACLE:* `notices.test.mjs` (all), `corepack pnpm notices:check`, `lint/licences.test.mjs` (`report[0]` verbatim).
*RISK:* low. No ruling (Q11 asks only whether the cross-folder import is welcome).

**N-2 — comments that narrate (comment only, §2.2).** `closure.mjs:62–63` ("the scaffold fix round"); `generate.mjs:2–13`
("entered by M0-d-03 — a placeholder until then", "THIRD-PARTY-NOTICES.txt passes to M0-d-03", "the kernel reuse
round, J224").

**N-3 — keep-aparts.** (a) `closure.mjs:13` `SHIPPED` (`@plat/` names of the bundled packages) is not
`lint/rules/shared.mjs` `MODEL_PACKAGES`: they coincide at M0 and part at M1, when `@plat/render` (shipped, mostly not
model code, §6.5 (3)) and the other M1 packages join. (b) The dev-exception table is read from the CLI's own folder by
`generate.mjs:133` (`new URL('./dev-exceptions.json', import.meta.url)`) and from the root under test by
`lint/licences.mjs:16` (`join(root, DEV_EXCEPTIONS_FILE)`), so the lint's tests can point at a fixture root; in the tree
they are one file. (c) The fdlibm placeholder branch (`FDLIBM_PLACEHOLDER`, `fdlibmState`) stays although
`vendor/fdlibm-5.3/NOTICE.txt` has landed: it is the fail-safe for an absent notice and is tested (C-0095); its text
names M0-d-03 and is an output string. Q9.

### 1.10 `vendor/` — the tools (R2)

**VT-1 — one redundant spelling.** `common.mjs:30` `readdirSync(d).sort()` → `.sort(byCodeUnit)` (equivalent, W-1). The
final `out.sort(byCodeUnit)` (:40) **stays**: the walk visits a folder's children before its next sibling, so `a/x`
would precede `a.js`, which the full-path order puts first.

**VT-2 — keep-aparts.** `common.mjs:66–71` `vendoredDirs` (refuses any name starting `@`) is not
`lint/rules/shared.mjs:167–177` `vendoredLibraries` (accepts a name with an `@` at position ≥ 1, so `@scope@1.0.0`
passes it and fails `vendoredDirs`); the two serve `vendor:verify` (every folder must be locked) and the lint (which
libraries to scan) and are owned by two items. `common.mjs:7` `PLAT_ROOT` ends with `/`, `shared.mjs:8`'s does not;
neither is compared as a string across tools. `verify.mjs` and `import.mjs` are clean.

### 1.11 `scripts/` (R2)

**S-1 — a stale header.** `lint.mjs:2–4` says the plugin's checks are "the vendored scan, the path rule, the licence
check — M0-d-07's" (three of nine) → name the nine as `plugin.checks` orders them and say each is described in its own
module (§2.2).

**S-2 — the build's per-package body is not importable.** `build.mjs:63–71` (inside `main`): `bundleOptions(dir)`,
`await build(options)`, `copyNotices(root, dir)`, the log line. `checks/M0-s-01-notes.md` N-1 (survivor MA5: deleting
the `copyNotices` call leaves every test green) suggests exactly this extraction.
*Consolidation:* `export async function bundlePackage(platRoot, dir)` runs `build(bundleOptions(dir))` and
`copyNotices(platRoot, dir)` and returns `{ outfile, bytes }`; `main` loops over the packages, calls it and prints the
same line. The module still builds only when run as the script.
*EQUIVALENCE:* the same esbuild options, the same copies, the same log text and order, the same exit codes; `dist/`
byte-identical. *ORACLE:* the common oracle's build comparison; `shipped.test.mjs` (all); the pin that kills MA5 (a test
that runs `bundlePackage` on a temporary copy of one small package and finds `index.js`, `LICENSE` and
`THIRD-PARTY-NOTICES.txt` in its `dist/`) **only if the session admits it (Q1)**; without it the build comparison is the
oracle. *RISK:* low.

**S-3 — keep-aparts.** `bench.mjs:121–128` re-states `snapshot.mjs`'s `isMain` (realpath of `argv[1]` against the
module's): the dispatcher runs under tsx and imports nothing outside `node:`; coupling it to the attribution tools for
four lines is worse than the copy. The "is this the main script" test exists in three forms across the tools —
realpath (`snapshot.mjs:250–257`, `bench.mjs`), `resolve(argv[1])` (`build.mjs:74`), bare string equality
(`lint/paths.mjs:284`, `lint/vendor-scan.mjs:255`, `vendor/verify.mjs:71`, `notices/generate.mjs:131`) — and they differ
when `argv[1]` names the script through a symbolic link: the realpath form runs, the others silently do nothing. Making
them one form changes that case: out of the pass, Q4.

### 1.12 `scaffold/`, `vitest/` and the workspace configs (R2)

**F-1 — a list written twice in one test file.** `workspace.test.mjs:122` and `:289` each declare `const SHIPPED =
['kernel', 'model', 'tables', 'site', 'layout']` inside a `describe` → one module-level constant with the comment of
:289 ("§14's order: kernel ← model ← tables ← site ← layout"). *EQUIVALENCE:* the same array in both describes.
*NUANCE:* it stays a literal (a test that pins the list independently of `lint/rules/shared.mjs` is the stronger
oracle). *RISK:* none.

**F-2 — test-file exports nothing reads.** `workspace.test.mjs:30` `export function satisfies`, `:51` `export function
barePnpm` (and, in R1, `lint/rules.test.mjs:27, 48` `fixtureCase`, `fixtureCases`): no file imports a test file. Drop
the `export` keyword. *EQUIVALENCE:* vitest collects the same tests. *RISK:* none.

**F-3 — a stricter bare-pnpm detector (KEEP APART).** `workspace.test.mjs:51–60` `barePnpm(command)` flags every `pnpm`
word not directly after `corepack ` and runs over every PLAT `package.json` **including the vendored ones**
(`manifests()`, :20–28); `lint/rules/no-bare-pnpm.mjs` `runsBarePnpm` flags only a command whose first word is `pnpm`
(so `echo pnpm` passes it) and skips `vendor/<name>@<version>/` (C-0127 (3)). Replacing the test's detector with the
lint's would narrow the test (vendored manifests unchecked; `node x && echo pnpm` passing) — a weakened test. Kept, with
one comment line naming the difference.

**F-4 — the vitest config's setup-file mapping, written twice.** `vitest.config.ts:13` and `:36` each map paths with
`.map((f) => new URL(f, import.meta.url).pathname)`.
*Consolidation:* `const fromConfig = (files: string[]): string[] => files.map((f) => new URL(f, import.meta.url).pathname);`
and both sites call it. *EQUIVALENCE:* the same `setupFiles` arrays (`workspace.test.mjs` "vitest runs every test file
under each package's test/ folder" imports the config and reads `include` and `root`, unchanged). *NUANCE:* the
`kernel-tiny` project keeps its order — fast-check setup, `tiny.ts`, then the sentinel (the sentinel must run after the
mode is armed, C-0286 (5)); `env: { PLAT_TINY_TABLES: '1' }` and its three `include` folders unchanged. *ORACLE:* the
`tools` project (workspace.test), and a `corepack pnpm exec tsx` one-liner that imports `vitest.config.ts` and prints
every project's `name`, `include` and `setupFiles`, run before and after (identical output; no test is run). *RISK:* none.

**F-5 — `launch-browsers.mjs`, `fast-check.setup.mjs`, `tiny-sentinel.mjs`, `eslint.config.js`:** no consolidation.
`tiny-sentinel.mjs`'s comment is rewritten (§2.2); its error text stays verbatim. `eslint.config.js`'s two parser
entries resemble `recommendedFor`'s but are the tree's configuration, with `index.test.mjs`'s per-path expectations
written against the composed result: unchanged.

### 1.13 The scaffold's package-index headers and README (R2)

**X-1 — "exports nothing yet" (comment only; Q2).** `packages/{kernel,model,tables,site,layout,testkit}/src/index.ts:1–2`
each say the package "re-exports every module folder M0 plans; each folder's index.ts starts empty …, so the package
exports nothing yet" — false since wave 3 (`checks/M0-s-01-notes.md` N-8; the model and tables plan's C-index; J268 Q1
routes the lines to M0-s-01's next round). Text: "`@plat/<p>` — the package index (C-0013): it re-exports every module
folder's index, and the package's public API is their union. A folder's index belongs to the item that builds the
folder." (the kernel plan's and the model and tables plan's sentence). **Attribution:** these are append files
(`landed/snapshot.mjs` `isAppendFile`): an edit of lines 1–2 is not an append and is claimed with `--whole
plat/packages/<p>/src/index.ts` on R2's `landed`; another item's in-flight barrel line in the same file would be swept
into R2's whole claim (L12's hazard), so R2 edits these six files only when no item with an open lane owns a folder of
that package's index (the implementer checks the lane log first) — or the session moves them to L12's round (Q2).

**X-2 — README.** `README.md:49` "(they land with work item M0-d-07)" → drop the parenthesis; the line still runs
`corepack pnpm lint` (no-bare-pnpm reads README.md: every command line keeps `corepack pnpm`).

---

## 2. Comment rewrite plan (per file)

Rule: a comment describes the rule or the protocol as it stands and cites the C-row and design section that fix it; it
never says "the checker's", "fix round", "round r2", "the kernel reuse round", "J224", "Q23", "N-s1-1", "created this
file empty", "lands with". Round ids, note ids, queue ids, mutant ids and dates belong in `checks/*.md`. Where a comment
is the only place a rule is stated, the rewrite keeps the rule and drops the narrative. Every pinned **string** stays —
messages, report lines, `LEDGER_RULE`, the sentinel's error, the `$comment` of a JSON data file — and every `describe`
/ `it` title stays verbatim, whatever it cites.

### 2.1 R1 (M0-d-07)

* **`lint/index.mjs:1–21`.** Line 2 "The scaffold (M0-s-01) created this file empty and wired it (C-0060)" → "The
  workspace wires it (C-0060): …" (keep the rest of the sentence). Lines 20–21 "— the last two added by the kernel reuse
  round (J223 / J224, build/M0-s-01-fix-s1)" → "(C-0259 (4))". The scope paragraph (:9–13) stands; add after "Whole-tree
  checks:" that each check object is `{ name, run(root) }` and returns `{ ok, problems, … }` (C-1).
* **`lint/rules/shared.mjs`.** `globalAccesses` / `globalObjectRefs` doc comments name the shared walk (D-1); add the
  doc of `inTypePosition` (D-2), `lintedFile` (D-3), `printReport` (C-1); `unwrap`'s doc names its six forms and that
  ratio-division's `uncast` and sort-with-comparator's `isCallee` are narrower on purpose (D-5). Remove `dirOf` and its
  comment (D-7).
* **`lint/rules/dependency-direction.mjs:1–9`.** "(C-0122, the spec note N-12)" → "(C-0122, C-0127 (1))"; "(C-0129)"
  stands. The `unknownPackage` message text (it names this file) stays.
* **`lint/rules/sort-with-comparator.mjs:1–6`.** Add D-4's clause; `isCallee`'s doc names its five wrappers (D-5).
* **`lint/rules/ratio-division.mjs`.** `uncast`'s doc: "narrower than shared `unwrap`: `!` and `<T>` instantiation are
  kept, so `n!` is judged by its own type (C-0128 (4))".
* **`lint/rules/no-object-key-iteration.mjs`, `no-nondeterminism.mjs`, `math-allowlist.mjs`, `no-exponent-operator.mjs`,
  `repository-path.mjs`, `no-bare-pnpm.mjs`, `rules/index.mjs`:** stand (each states its rule and cites its rows).
* **`lint/standalone.mjs` (new):** a three-line header: what it is (one file linted outside the tree configuration), who
  uses it (`paths.mjs` `lintFile`, `directives.mjs` `directivesOf`, `vendor-scan.mjs` `scanFile`), and the retry rule
  (the path check and the scan re-parse a JavaScript file as a script; inline-directives does not) with C-0128 (5),
  C-0129 (2), C-0126 (1).
* **`lint/paths.mjs:1–18`.** Stands; add one line for the CLI block at :284–289 (`node tools/lint/paths.mjs` prints the
  check's problems and counts), which the header does not mention. `lintFile`'s doc (:96–104) loses "paths.test.mjs
  holds it, C-0129" → "(C-0128 (5), C-0129 (2))".
* **`lint/directives.mjs:1–11`.** Stands.
* **`lint/coverage.mjs:1`.** "(C-0130; the checker's H1, round r2)" → "(C-0130, C-0131)". The rest stands (it states
  the three ways out and the refusals).
* **`lint/digest-closure.mjs:8`.** "(C-0131; the checker's B1, closing round r3)" → "(C-0131 (1))"; :10–14 "(C-0129
  (3))", "(C-0129 (2), C-0130 (1))" stand.
* **`lint/vendor-scan.mjs`.** V-1 (header extension list; `REVIEWED`'s doc); V-2's one line at `sha256`.
* **`lint/kernel-boundary.mjs:1–17`.** Lines 1–3 → "The whole-tree check `kernel-boundary` (C-0259 (4)): @plat/kernel
  stays a town-free geometry library, reusable on its own. Run by `corepack pnpm lint`." The two halves (:4–15) stand;
  ":13–15" keep the shrink-only rule and drop "KI-8's" ("the b-debt rows are town concepts the design places in the
  kernel at M0, recorded and not refactored; the allowlist's `$comment` states the rule").
* **`lint/bench-boundary.mjs:1–7`.** Line 1 "(the kernel reuse round, J224; run by `corepack pnpm lint`)" → "(C-0259
  (4); run by `corepack pnpm lint`)", wrapped to 120 columns; the rest stands; `BENCH_CODE`'s doc (W-2).
* **`lint/probe.mjs`, `licences.mjs`, `resolve.mjs`:** stand. (`licences.mjs:1–2` lists the allowlist in prose — keep it,
  it is the rule's statement; add "(`closure.mjs` `ALLOWED`)".)
* **Tests (R1).** `coverage.test.mjs:1` "(C-0130; the checker's H1, round r2)" → "(C-0130, C-0131)"; :3 "the checker's
  plant paths" → "the plant paths of C-0130 (1)"; :78, :97, :189, :200 — the comments that cite a plant by its check
  round → name the case ("an ignored folder", "a nested configuration", "no computed configuration, unreachable in
  ESLint 10.12", "the registry path of C-0005"). `directives.test.mjs:1` "(C-0128; the checker's note N3, which F2's fix
  opens)" → "(C-0128 (5))". `index.test.mjs:4` "(N-12)" → "(C-0127 (1))"; :213 "The checker's plant (checks/M0-d-07.md,
  G1)" → "A kernel file outside src/ that a kernel source re-exports (C-0129 (1))". `kernel-boundary.test.mjs:1`,
  `bench-boundary.test.mjs:1` "(J224; …)" → "(C-0259 (4); …)". Titles untouched (e.g. "… (the checker's H1 paths, …)",
  "… (N-12: at every depth) …" stay).

### 2.2 R2 (M0-s-01)

* **`landed/snapshot.mjs:1–11`.** "(M0-s-01's third fix round; C-0104, C-0111)" → "(C-0104 (1), C-0111 (1), C-0120
  (1))"; the rest stands.
* **`landed/landed.mjs:1–19`.** Line 2 the same; the body stands (it is the protocol). `:192` "(C-0104 (4), C-0120 (5);
  Q23)" → "(C-0104 (4), C-0120 (5), C-0306 (1))"; `:200` "(Q23)" → "(C-0306 (1))"; `:403` "(a fix round's later wave
  included)" → "(a later wave's landing of the same item included)"; `:463` "(C-0111 (4); Q23)" → "(C-0111 (4), C-0306
  (2))"; `:496` "(Q23)" → "(C-0306 (1))". `LEDGER_RULE`'s string, its "(Q23)" included, stays.
* **`landed/verify.mjs:1–11`.** Line 2 as above; line 9 wrapped at 120 columns; add "(C-0120 (4), C-0306 (3))" after the
  crossing sentence.
* **`notices/closure.mjs:62–63`.** "(the scaffold fix round: testkit's oracles are dev, C-0062)" → "(a start's
  devDependencies are read only as a start: the test kit's oracles are dev dependencies, C-0062)".
* **`notices/generate.mjs:1–13`.** "(vendor/fdlibm-5.3/NOTICE.txt, entered by M0-d-03 — a placeholder until then;
  exactly one of the two, never both). THIRD-PARTY-NOTICES.txt passes to M0-d-03, which regenerates it with `corepack
  pnpm notices` when the notice lands (C-0095)." → "(vendor/fdlibm-5.3/NOTICE.txt; while that file is absent, a
  placeholder in its place — exactly one of the two, never both, C-0095)". "(CLEAN-ROOM.md rule 7; the kernel reuse
  round, J224)" → "(CLEAN-ROOM.md rule 7; C-0259 (3))". Keep "Fonts' OFL text joins at M1 with the fonts (§17.2)" (a
  staged scope, M0.md §4b).
* **`vendor/common.mjs`, `verify.mjs`, `import.mjs`:** stand.
* **`scripts/lint.mjs:1–4`.** → "`corepack pnpm lint` (C-0060): ESLint over plat/ with zero warnings allowed, then
  every whole-tree check the lint plugin exports (`checks` in tools/lint/index.mjs — probe-red, vendor-scan,
  repository-path, inline-directives, model-coverage, no-bare-pnpm, licences, kernel-boundary, bench-boundary, each
  described in its module). Exit 0 only when ESLint reports nothing and every check passes."
* **`scripts/build.mjs:1–9`.** "Notices (the kernel reuse round, J224):" → "Notices (C-0259 (1), (2)):"; "the bundle
  options and the notice copy are exported for tools/notices/shipped.test.mjs" → "… `bundleOptions`, `copyNotices` and
  `bundlePackage` are exported" (S-2).
* **`scripts/bench.mjs:1–21`.** Stands (it states the dispatcher's contract with its rows).
* **`scaffold/workspace.test.mjs:1–5`.** → "The workspace tests: the engine range (C-0025), pnpm through corepack only
  (C-0030), exact pins (§17.4), the dependency placement (C-0062, C-0065), the package indexes (C-0013, C-0064, C-0112),
  the bench dispatcher — its map and owners (C-0059, C-0113, C-0115, C-0117), its shortcuts, its argument rule and its
  "not built" and unknown-name exits on fixture harnesses (C-0095) — and the TypeScript projects with what each test
  folder can import (C-0056, C-0114, C-0122, C-0124)." F-3's comment line at `barePnpm`. Titles stay.
* **`notices/notices.test.mjs:133`.** "The kernel reuse round (J224, line B; CLEAN-ROOM.md rule 7):" → "(CLEAN-ROOM.md
  rule 7; C-0259 (3)):". **`notices/shipped.test.mjs:1`** "(the kernel reuse round, J224, line A; §17.4)" → "(C-0259
  (1), (2); §17.4)", wrapped to 120 columns.
* **`landed/landed.test.mjs:1–8`.** → "The attribution tools (C-0104, C-0111, C-0120, C-0121, C-0306): …" (keep the
  description of what is tested, drop "M0-s-01's third fix round" and "The fourth fix round"); `:473` "// The fourth
  fix round (C-0120, C-0121)" → "// M-1's crossings and early run items (C-0120, C-0121)"; `:680` "// Session fix round
  S2 (Q23; lane build/M0-s-01-fix-s2): …" → "// A ledger row outside §2's table, and re-landed records (C-0306)". The
  lane strings inside the fixtures (`build/M0-s-01-fix-s2` at :695) are test data and stay.
* **`vitest.config.ts:1–4`.** "(M0.md §4's "vitest.workspace.ts"; vitest 5 reads projects from here — C-0053)" →
  "(C-0053: vitest 5 reads its projects from here)". `:26–29` "(N-53 (4), C-0286 (5), Q26)" → "(C-0286 (5))" and "(N-s1-1)"
  dropped; the sentences stand.
* **`vitest/tiny-sentinel.mjs:1–4`.** "(N-s1-1, Q26)" → "(C-0286 (5): the tiny run must never run at default sizes and
  report green)". The thrown message stays verbatim.
* **`README.md:49`** (X-2). **`packages/*/src/index.ts:1–2`** (X-1, Q2).

---

## 3. Test consolidation plan (per test file)

Rule (J263 Q8, J260): no test is removed or weakened; every `describe` / `it` title is kept verbatim; each round's test
count after the round equals the count before plus the new pins named here; every earlier mutant the finding lists is
replayed red. No two test files are merged: every file is one subject (one rule set, one check or one tool), and the
overlaps found are deliberate (each check's "passes the real plat/ tree" case runs its own check; `lint/licences.test.mjs`
pins the lint wrapper's report, `notices/notices.test.mjs` the closure core — two items' oracles).

### 3.1 `tools/lint/*.test.mjs` (R1)

**T-lint-0 — the pins that come first** (L-1's oracle): the three script-mode cases of L-1 (vendor-scan, paths,
directives), each green on today's code, landed as the round's first change, then replayed after L-1.

**T-lint-1 — one support module, `lint/test-support.mjs`** (not a test file; the `tools` project includes only
`**/*.test.mjs` and `**/*.test.ts`). It holds what nine test files write each for themselves:

* `tempTree(prefix, files = {}, { real = false } = {})` — `mkdtempSync(join(tmpdir(), prefix))` (its `realpathSync` when
  `real`), registered for removal, then every `files` entry written with its parent folders; and `removeTempTrees()`,
  which each test file calls in its own `afterAll`. Users: `directives.test.mjs:20–28` (`tree`), `coverage.test.mjs:52–
  61` (`tree`, `real: true`), `paths.test.mjs:23–37` (its `tree` keeps the `plat/` + `outside/` layout on top of
  `tempTree`), `bench-boundary.test.mjs:19–31` (its `tree` adds the manifest and the empty `src/` and `test/` folders on
  top), `index.test.mjs:159–177` (`real: false`) and `:215–226` (`real: true` — the second tree is realpath'd, the first
  is not; kept), `no-bare-pnpm.test.mjs:61–66` (the root only; its `put` copies fixtures as today),
  `vendor-scan.test.mjs:115, 174`, `kernel-boundary.test.mjs:57–67` (its `try … finally rmSync` becomes the registered
  removal). Every temporary-folder prefix stays the file's own (`'plat-paths-'`, `'plat-coverage-'`, …).
* `LINT_TIMEOUT = 60_000` and `SCAN_TIMEOUT = 120_000` (C-0128 (6)), replacing `LINT` (index, coverage, directives),
  `WALK` (licences), `CASE` (rules), `SCAN` (vendor-scan) and the inline `60_000` of paths, probe and no-bare-pnpm tests —
  each test keeps its number.
* `VETTED_DIVISION` — the five-line source of C-0125 (6)'s vetted division, written today in `index.test.mjs:122–128`,
  `directives.test.mjs:30–36` and `paths.test.mjs:245–251`, character for character.
* `platRuleNames(config)` — the `plat/` rules a computed configuration sets at severity 2, without the prefix, sorted —
  written twice in `index.test.mjs` (`platRules` :29–36 and `rulesOf` :243–249).

*Equivalence:* every test builds the same trees, waits the same timeouts and lints the same texts. *Oracle:* the whole
`tools` project green with the same count; r1's MA – MJ, r2's MA2 – MZ3, MX, MY1 – MY5, r3's MC1 – MC13, r4's MD1 – MD3,
MN1 – MN4, MC1, MC2, MC10 each replayed red against the consolidated tests (the ones whose code R1 touches: MA, MA2, MA3,
MB, MB2, MC, MD, ME, MF, MG, MH, MI, MJ, MO, MZ1, MZ2, MV1, MC1, MC10, MD1 at the least).

**T-lint-2 — one reader of planted markers.** `probe.mjs:25–32` `plantedLines(text)` (`// planted: <what>`, exported)
is the reader; `rules.test.mjs:33–36` (`([A-Za-z, ]+?)`, split at commas into messageIds), `index.test.mjs:111–114`
(`([a-z, -]+?)`, split into `plat/<rule>`) and `kernel-boundary.test.mjs:17` (any `// planted: `, line numbers) read it
and parse `what` as each does today. *Equivalence condition:* the implementer runs once, in a scratch script, the old and
the new reader over every fixture file and over the probe, and records "identical on all N files" in
`checks/M0-d-07-notes.md`; the narrower regexes of today match every marker in the tree (the markers are letters,
commas, spaces and `-`, and the kernel-boundary fixture's header "`// planted:` line" has no space after the colon, so no
reader matches it). The Markdown marker of `no-bare-pnpm.test.mjs:15` (`<!-- planted -->`) stays its own. *Oracle:*
`rules.test.mjs` "give every rule pass fixtures and fail fixtures with planted lines", "name each planted messageId
among its rule's messages", every RuleTester case; the model-scope cases; kernel-boundary "reports a planted file at
exactly its planted lines".

**T-lint-3 — `rules.test.mjs:27, 48`:** drop `export` (F-2).

**T-lint-4 — `kernel-boundary.test.mjs:13, 15`:** the environment hooks `PLAT_ROOT_UNDER_TEST` and `KB_ALLOW` are read
by no committed script (drafting hooks of C-0259's session round). Q5; until answered they stay. `bench-boundary.test.mjs:12`
and `kernel-boundary.test.mjs:13` take `PLAT_ROOT` from `rules/shared.mjs` like every other lint test (both functions
`join` and `resolve` the root, so the trailing `/` of today's `fileURLToPath(new URL('../../', …))` makes no difference).

**T-lint-5 — comments (§2.1).**

### 3.2 `tools/landed/`, `notices/`, `vendor/`, `scaffold/` tests (R2)

* **`landed/landed.test.mjs`** — one subject, 37 tests; comments only (§2.2). Its `write` / `read` / `replaceIn` helpers
  stay (the lint's `test-support.mjs` is another item's file, A-6's self-containment).
* **`notices/notices.test.mjs`, `shipped.test.mjs`** — comments only. N-1's oracle.
* **`vendor/verify.test.mjs`, `flatbush-patch.test.mjs`** — untouched (C-0152's nine mutants keep their oracle).
* **`scaffold/workspace.test.mjs`** — F-1, F-2, F-3's comment, the header (§2.2). C-0124's seven project-graph mutants
  replayed red.
* **New pins** only if the session answers Q1 so (S-2's MA5 pin; N-11 – N-14's A6, A4, B6, V3).

---

## 4. Not touched, and why

* **`plat/vendor/` whole** — the vendored third-party libraries (`robust-predicates@3.0.3`, `flatbush@4.6.2`,
  `flatqueue@3.1.0`, `delaunator@5.1.0`, `simplex-noise@4.0.3`), `vendor/fdlibm-5.3/`, `vendor/xoshiro/`, the patches,
  `vendor.lock.json` and `vendor/README.md`. Vendored code is never consolidated: its bytes are the registry's (or the
  authors') with exactly the recorded patches, locked by sha256 and scanned as they run (C-0010, C-0011, C-0055, C-0152;
  §6.5 (4)); a byte changed there is a new review.
* **Every fixture** — `lint/fixtures/**` (the rules' oracle, the probe, the vendor-scan copies and their `MANIFEST.json`)
  and `scaffold/fixtures/**` (the dispatcher's harnesses, comments included). No finding merges a test that reads a
  fixture, so none changes.
* **Generated and pinned data** — `packages/kernel/vendor-audit.json` (generated by `vendor-scan.mjs --write`, checked
  byte-equal by the lint), `THIRD-PARTY-NOTICES.txt` (generated, checked by `notices:check`), `lint/kernel-boundary.
  allow.json` (the shrink-only ratchet; its `$comment` and rows are pinned), `notices/dev-exceptions.json`.
* **The workspace's frozen surface** — `package.json` (every script's command line), `pnpm-workspace.yaml`,
  `pnpm-lock.yaml`, `.npmrc`, `.gitignore`, `LICENSE`, the `tsconfig*.json` files, `eslint.config.js` (F-5).
* **Every lint rule's acceptance set** — no rule is widened or narrowed. In particular these observations, each a
  verdict change, are left to the hardening phase (Q9): the deliberate-writer escapes of `checks/M0-d-07-notes.md` N5
  (`constructor.keys`, `eval` / `Function`, `sort(void 0)`, `WeakRef`, a shell `-c` string) and N6 (a `.tsx` / `.jsx`
  in a vendored folder), N2 (a configuration file in a skipped folder); `checks/M0-s-01-notes.md` N-4 (regular-expression
  tokens in kernel-boundary) and N-5 (`require` / `createRequire` in bench-boundary); the bench walk's missing `.jsx`
  (W-2).
* **Every message and printed line** — the problem shapes differ between checks (`vendor-scan`'s `folder/file:line:col
  rule: message`, the others' `rel:line: message`), and the landed CLIs' lines are the protocol's; a unification is an
  output shift (Q7).
* **Behaviour changes found in passing** — queue row L12 (Q3); the "is main" forms (Q4); the KI pin gaps (Q1).
* **Exports nothing reads, other than `dirOf` and `paths.mjs`'s re-export of `moduleCandidates`** — e.g.
  `landed.mjs` `expandBraces`, `wavePosition`, `rowId`, `seatNames`, `renumberedBy`, `INDEX_LINE`, `cleanRoomLines`,
  `collisions`, `recordPath`; `snapshot.mjs` `SNAPSHOT_DIR`, `SNAPSHOT_SCHEMA`, `EXCLUDES`, `CROSSING_FILES`,
  `PLACEHOLDER_ROW`, `sha256`, `appendLines`, `snapshotPath`; `verify.mjs` `readRecords`; `digest-closure.mjs`
  `DATA_FILE`, `codeFiles`; `kernel-boundary.mjs` `ALLOW`, `TOWN_NOUNS`, `wordsOf`, `nounsIn`, `kernelFiles`;
  `licences.mjs` `DEV_EXCEPTIONS_FILE`; `paths.mjs` `skippedFolder`, `nodeModulesLinks`; `probe.mjs` `PROBE_PROJECT`;
  `resolve.mjs` `nearestManifest`; `dependency-direction.mjs` `packageOf`; `no-bare-pnpm.mjs` `commandsOf`,
  `commandWord`; `shared.mjs` `GLOBAL_OBJECTS`; `vendor-scan.mjs` `buildAudit`; `closure.mjs` `SHIPPED`, `ALLOWED`,
  `findPackageDir`, `licenceOf`; `generate.mjs` `FDLIBM_NOTICE`; `common.mjs` `byCodeUnit`; `fast-check.setup.mjs`
  `DEFAULT_FUZZ_RUNS`, `fuzzRuns`, `fuzzSeed`; `bench.mjs` `PLAT_ROOT`. Each is used inside its module or names a part of
  the protocol (a schema id, a constant a checker quotes); they stay exported, as J263 Q7 and J268 Q7 kept the unread
  index exports (Q6).

---

## 5. Open questions for the session

**Q1 — the KI pin gaps.** Ten survivors of earlier checks are on promises that hold today but have no test:
`checks/M0-s-01-notes.md` N-1 (MA5, the build's notice copy), N-2 (MD1, kernel-boundary's slack in the verdict), N-3
(MD14, a dynamic `import()` in a kernel bench), N-11 – N-14 (A6, A4, B6, V3 in `landed`), and `checks/M0-d-07.md` r2's
MT (vendor-scan's `runsFrom` report) and MQ (probe-red's "construct missing" guard). Each pin is test-only and green on
today's code. *Recommendation:* the pins a consolidation needs as its own oracle ride the round (R1's T-lint-0 — MV1 —
is in the plan as such; S-2's MA5 pin likewise if the session agrees); the rest go to the hardening queue as one session
round per item, so that a consolidation round stays a proof of zero change (J268 Q2's rule).

**Q2 — the six package-index header lines (X-1).** J268 Q1 routed them to "M0-s-01's next round with L12's ownership
fix". R2 is M0-s-01's next round; L12 is a behaviour change that cannot ride R2 (Q3). *Recommendation:* R2 carries the
six comment edits, claimed `--whole`, provided no item with an open lane owns a module folder of that package at the
time (the implementer reads the lane log first); otherwise they wait for L12's round.

**Q3 — queue row L12** (`landed` resolving a passed-ownership file at wave 0 under a non-wave label). It changes which
files a record lists: a session fix round of M0-s-01, not R2. It edits `landed/landed.mjs`, as R2 does (A-1 … A-5), so
the two must not run at once. *Recommendation:* R2 first (comment and helper changes, zero shift), then L12's round on the
consolidated file — or L12 first if the session needs it sooner; never beside each other.

**Q4 — the "is main" test in three forms** (S-3). The bare-equality and `resolve` forms (`build.mjs`, `paths.mjs`,
`vendor-scan.mjs`, `vendor/verify.mjs`, `notices/generate.mjs`) do nothing when `argv[1]` names the script through a
symbolic link, where the realpath form (`snapshot.mjs`, `bench.mjs`) runs. Unifying is a CLI behaviour change on that
case. *Recommendation:* a hardening queue row (one helper per tool family, the realpath form), not this pass.

**Q5 — `kernel-boundary.test.mjs`'s environment hooks** `PLAT_ROOT_UNDER_TEST` and `KB_ALLOW` (T-lint-4): no committed
script sets them; they let a mirror's allowlist or root be tested in place. *Recommendation:* remove them in R1 (a
checker's mirror runs the mirror's own test file), unless the session knows a checker that uses them.

**Q6 — exports nothing reads** (§4's list) and D-4's unreachable guard. *Recommendation:* keep the exports (frozen by
default, as J263 Q7 and J268 Q7); remove only the dead `dirOf`, `paths.mjs`'s dead re-export of `moduleCandidates` and
the unreachable guard of `sort-with-comparator.mjs:43` (if the session prefers to keep the guard, it becomes
`inTypePosition(node)`).

**Q7 — message shapes.** The checks' problem strings use two shapes and the landed CLIs a third (§4). *Recommendation:*
none changes in pass A; any unification is a hardening decision with its own oracle (every pinned string re-read).

**Q8 — inline-directives and a script-only JavaScript file.** `directivesOf` never re-parses a non-TypeScript file as a
script, so a model-closure `.js` that parses only as a script fails the lint as "cannot be read" (fail-closed), while the
path check and the scan accept it. R1 pins today's behaviour (T-lint-0 (c)). *Recommendation:* keep (model code is module
code, §2.1's ES2022 modules); a ruling only if the session wants the other reading.

**Q9 — the verdict changes left for the hardening phase:** N2, N5, N6 of `checks/M0-d-07-notes.md`; N-4, N-5 of
`checks/M0-s-01-notes.md`; the bench walk's missing `.jsx` (W-2 (d)); the fdlibm placeholder branch now that Sun's
notice has landed (N-3 (c)). *Recommendation:* queue rows under J156's M4 tags as the notes name them; none in pass A.

**Q10 — two new files in M0-d-07's folder** (`lint/standalone.mjs`, `lint/test-support.mjs`). Both lie under
`plat/tools/lint/`, M0-d-07's owns; ESLint's file count rises by two (the common oracle allows exactly that).
*Recommendation:* approve. The alternative — the helper inside `paths.mjs`, the support inside each test — keeps the
three parser copies apart only by import path.

**Q11 — `notices/` importing `byCodeUnit` from `vendor/common.mjs`** (N-1; both M0-s-01's, Node built-ins only; the lint
already imports `stableJson` from there). *Recommendation:* approve; the alternative is a local four-line comparator.
