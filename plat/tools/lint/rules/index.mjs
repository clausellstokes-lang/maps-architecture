// The rules of the PLAT determinism lint (M0-d-07) and the rule sets that scope them. The plugin (../index.mjs)
// registers them under the prefix `plat/`; the vendored scan and the probe read the sets from here.
import dependencyDirection from './dependency-direction.mjs';
import mathAllowlist from './math-allowlist.mjs';
import noBarePnpm from './no-bare-pnpm.mjs';
import noExponentOperator from './no-exponent-operator.mjs';
import noNondeterminism from './no-nondeterminism.mjs';
import noObjectKeyIteration from './no-object-key-iteration.mjs';
import ratioDivision from './ratio-division.mjs';
import repositoryPath from './repository-path.mjs';
import sortWithComparator from './sort-with-comparator.mjs';

export const rules = {
  'math-allowlist': mathAllowlist,
  'no-exponent-operator': noExponentOperator,
  'no-object-key-iteration': noObjectKeyIteration,
  'ratio-division': ratioDivision,
  'no-nondeterminism': noNondeterminism,
  'sort-with-comparator': sortWithComparator,
  'dependency-direction': dependencyDirection,
  'repository-path': repositoryPath,
  'no-bare-pnpm': noBarePnpm,
};

const on = (names) => Object.fromEntries(names.map((n) => [`plat/${n}`, 'error']));

/** §6.5 (3)'s rule set for model code: the five model packages' sources and the digest closure beyond them. */
export const MODEL_RULE_NAMES = Object.freeze([
  'math-allowlist', 'no-exponent-operator', 'no-object-key-iteration', 'ratio-division', 'no-nondeterminism', 'sort-with-comparator',
]);
export const MODEL_RULES = Object.freeze(on(MODEL_RULE_NAMES));

/**
 * §6.5 (4)'s scan of the vendored sources: the same determinism rules but the division rule, which is §3.2 (8)'s
 * robustness rule for our model code (a library's divisions are IEEE-exact; C-0126).
 */
export const VENDOR_RULE_NAMES = Object.freeze(MODEL_RULE_NAMES.filter((n) => n !== 'ratio-division'));
/** A UMD wrapper's bare `self` / `global` (the object it exports into) is not a host read (C-0126). */
export const VENDOR_RULES = Object.freeze({ ...on(VENDOR_RULE_NAMES), 'plat/no-nondeterminism': ['error', { globalObjects: false }] });
