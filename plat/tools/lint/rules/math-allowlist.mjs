// plat/math-allowlist (§6.5 (3)): in model code the only `Math` members are abs, floor, ceil, round, trunc, sign, min,
// max, sqrt, imul, clz32 and fround — every other real function goes through dmath (§6.5 (2)). Constants (`Math.PI`)
// are members outside the list too; dmath carries its own (C-0125). `Math` itself may not be passed, aliased or
// destructured, and a computed member is refused, so no member escapes the list by indirection.
import { MATH_ALLOWLIST, globalAccesses, staticMemberName } from './shared.mjs';

const ALLOWED = new Set(MATH_ALLOWLIST);
const LIST = MATH_ALLOWLIST.join(' ');

export default {
  meta: {
    type: 'problem',
    docs: { description: 'only the §6.5 (3) allowlist of Math members in model code' },
    schema: [],
    messages: {
      memberNotAllowed: `Math.{{name}} is outside the determinism allowlist (§6.5 (3): ${LIST}); use dmath (§6.5 (2)).`,
      computedMember: 'A computed Math member cannot be checked against the allowlist (§6.5 (3)); name the member.',
      mathAsValue: 'Math used as a value (aliased, passed or destructured) escapes the allowlist (§6.5 (3)); call its allowed members directly.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    return {
      'Program:exit'() {
        for (const { node } of globalAccesses(sourceCode, new Set(['Math']))) {
          const parent = node.parent;
          if (parent && parent.type === 'MemberExpression' && parent.object === node) {
            const name = staticMemberName(parent);
            if (name === null) context.report({ node: parent, messageId: 'computedMember' });
            else if (!ALLOWED.has(name)) context.report({ node: parent, messageId: 'memberNotAllowed', data: { name } });
          } else {
            context.report({ node, messageId: 'mathAsValue' });
          }
        }
      },
    };
  },
};
