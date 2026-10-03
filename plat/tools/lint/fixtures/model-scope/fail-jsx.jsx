// A model-package source of this extension is judged by the model rule set, dependency-direction and repository-path
// (C-0128); index.test.mjs lints it through the tree's configuration as packages/kernel/src/zz-scope/<this name>.
import { model } from '../../../model/src/index.js'; // planted: dependency-direction
import data from '../../../../../research/x.json'; // planted: repository-path
export const a = Math.sin(1); // planted: math-allowlist
export const b = 2 ** 0.5; // planted: no-exponent-operator
export const c = Object.keys({ a: 1 }); // planted: no-object-key-iteration
export const d = Date.now(); // planted: no-nondeterminism
export const e = [3, 1].sort(); // planted: sort-with-comparator
export const f = (x, y) => x / y; // planted: ratio-division
export { model, data };
export const g = <div title="parsed as JSX" />;
