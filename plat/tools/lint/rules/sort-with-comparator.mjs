// plat/sort-with-comparator (§6.5 (3), §6.5 (5)): every sort in model code passes a comparator — the default sort
// compares strings of the elements. `.sort()` and `.toSorted()` with no argument (or `undefined`) are refused on every
// receiver, typed arrays included (C-0125): the lint checks that a comparator is there; that it is a total order with
// an id tie-break (§6.5 (5)) is the writer's and the tests' to show. A `sort` or `toSorted` member reached other than
// as the callee of a call — `Array.prototype.sort.call(xs)`, `.apply`, `.bind`, an alias — cannot be checked for its
// comparator and is refused too (C-0128).
import { staticMemberName, unwrap } from './shared.mjs';

const SORTS = new Set(['sort', 'toSorted']);

/** Is a member expression the callee of a call (through `?.`, parentheses or a TypeScript wrapper)? */
function isCallee(member) {
  let n = member;
  while (n.parent && (n.parent.type === 'ChainExpression' || n.parent.type === 'TSNonNullExpression' ||
    n.parent.type === 'TSAsExpression' || n.parent.type === 'TSSatisfiesExpression' || n.parent.type === 'TSTypeAssertion')) n = n.parent;
  return n.parent?.type === 'CallExpression' && n.parent.callee === n;
}

export default {
  meta: {
    type: 'problem',
    docs: { description: 'every sort in model code passes a comparator (§6.5 (3), (5))' },
    schema: [],
    messages: {
      noComparator: '`.{{name}}()` without a comparator sorts by string conversion (§6.5 (3), (5)); pass a total-order comparator with an id tie-break.',
      sortAsValue: '`.{{name}}` reached other than by a direct call (`.call`, `.apply`, `.bind`, an alias) cannot be checked for its comparator (§6.5 (3), (5)); call `.{{name}}(comparator)` directly.',
    },
  },
  create(context) {
    return {
      CallExpression(node) {
        const callee = unwrap(node.callee);
        if (!callee || callee.type !== 'MemberExpression') return;
        const name = staticMemberName(callee);
        if (name === null || !SORTS.has(name)) return;
        const first = node.arguments[0];
        const missing = first === undefined || (first.type === 'Identifier' && first.name === 'undefined');
        if (missing) context.report({ node: callee.property, messageId: 'noComparator', data: { name } });
      },
      MemberExpression(node) {
        const name = staticMemberName(node);
        if (name === null || !SORTS.has(name) || isCallee(node)) return;
        if (node.parent?.type === 'TSQualifiedName' || node.parent?.type === 'TSTypeQuery') return;
        context.report({ node: node.property, messageId: 'sortAsValue', data: { name } });
      },
    };
  },
};
