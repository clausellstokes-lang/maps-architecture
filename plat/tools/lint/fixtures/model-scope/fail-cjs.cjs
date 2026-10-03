// A model-package source of this extension is judged by the model rule set, dependency-direction and repository-path
// (C-0128); index.test.mjs lints it through the tree's configuration as packages/kernel/src/zz-scope/<this name>.
const { model } = require('../../../model/src/index.js'); // planted: dependency-direction
const data = require('../../../../../research/x.json'); // planted: repository-path
const a = Math.sin(1); // planted: math-allowlist
const b = 2 ** 0.5; // planted: no-exponent-operator
const c = Object.keys({ a: 1 }); // planted: no-object-key-iteration
const d = Date.now(); // planted: no-nondeterminism
const e = [3, 1].sort(); // planted: sort-with-comparator
const f = (x, y) => x / y; // planted: ratio-division
module.exports = { model, data, a, b, c, d, e, f };
