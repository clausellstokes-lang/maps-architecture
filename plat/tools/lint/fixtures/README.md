# tools/lint/fixtures — the lint's own fixtures (M0-d-07)

ESLint-ignored by the tree lint (eslint.config.js), never compiled, imported or run, and skipped by the whole-tree
checks; the rule tests (tools/lint/rules.test.mjs) lint them through ESLint's RuleTester, and probe-red lints
`probe/zz-probe.ts` in place.

* `<rule>/pass-*` lint clean; `<rule>/fail-*` report exactly the lines marked `// planted: <messageId>[, <messageId>…]`
  (in column order), and nothing else.
* `model-scope/fail-<ext>.<ext>` — one per code extension (C-0128) — is linted by `index.test.mjs` through the tree's
  own configuration as `packages/kernel/src/zz-scope/<name>` and reports exactly its lines marked
  `// planted: <rule>`: the model rule set, dependency-direction and repository-path reach every extension.
* A first line `// lint-as: <plat/-relative path>` lints the fixture as if it lay there (the path rules judge by path);
  without it a model rule's fixture is linted as `packages/kernel/src/zz-fixture/<name>`.
* `// options: <json>` passes rule options.
* Markdown and package.json fixtures belong to the whole-tree part of `no-bare-pnpm`; a planted Markdown line ends with
  `<!-- planted -->`.
* `vendor-scan/` holds unpatched and unvendored copies of published libraries (each with its licence; `MANIFEST.json`
  gives the registry tarball, its integrity, and each file's sha256 and path in the tarball — a tarball's `dist/` is
  stored as `esm/`, `cjs/` or `bundle/`, since the Maps repository ignores every `dist/` under plat/ but the vendored
  ones).
