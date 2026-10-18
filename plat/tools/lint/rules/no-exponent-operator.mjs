// plat/no-exponent-operator (§6.5 (3); C-0008): exponentiation is implementation-approximated in JavaScript, so model
// code never writes `**` or `**=` — a small integer power is written as its multiplications, every other power goes
// through dmath.pow. C-0008 forbids the operator outright instead of the design's build-time rewrite of a literal
// exponent 0–4, so no compiler transform is needed.
export default {
  meta: {
    type: 'problem',
    docs: { description: 'no ** or **= in model code (C-0008)' },
    schema: [],
    messages: {
      exponent: 'The exponent operator `{{op}}` is forbidden in model code (§6.5 (3), C-0008): write the multiplications, or call dmath.pow.',
    },
  },
  create(context) {
    return {
      BinaryExpression(node) {
        if (node.operator === '**') context.report({ node, messageId: 'exponent', data: { op: '**' } });
      },
      AssignmentExpression(node) {
        if (node.operator === '**=') context.report({ node, messageId: 'exponent', data: { op: '**=' } });
      },
    };
  },
};
