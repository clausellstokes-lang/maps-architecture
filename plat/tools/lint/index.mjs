// The PLAT determinism lint — an ESLint plugin (§6.5 (3)–(4), §14's dependency rules, §17.1 (3)).
// Created EMPTY by the scaffold (M0-s-01); this file and tools/lint/ belong to M0-d-07, which writes the rules
// (math-allowlist, no-exponent-operator, no-object-key-iteration, ratio-division, no-nondeterminism, sort-with-comparator,
// dependency-direction, repository-path, no-bare-pnpm) and the whole-tree checks (vendor-scan.mjs, paths.mjs,
// licences.mjs).
//
// The contract the scaffold wires (eslint.config.js and scripts/lint.mjs read it; nothing else needs to change):
//   rules    — the ESLint rules, registered under the plugin prefix `plat/`;
//   configs  — `configs.recommended`: an array of flat-config objects that switch the rules on for their files;
//   checks   — whole-tree checks run by `corepack pnpm lint` after ESLint: [{ name, run(platRoot) }], where `run`
//              returns (or resolves to) { ok: boolean, problems: string[] }.
const plugin = {
  meta: { name: '@plat/lint', version: '0.0.0' },
  rules: {},
  configs: { recommended: [] },
  checks: [],
};

export default plugin;
