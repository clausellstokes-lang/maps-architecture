// plat/ratio-division (§3.2 (8), §6.5 (3); C-0044): in model code a division by a computed value goes through
// `ratio(num, den, kind)`, which refuses a denominator below its quantity's floor; a `/` (or `/=`) is allowed only when
// its divisor is a non-zero numeric literal (`x / 2`, `x / -0.5`, `x / 3n`), a `const` bound to one in the same file,
// or — when type information is present — an expression whose type is a non-zero number or bigint literal type (an
// imported `export const CM_PER_M = 100`); the type judged is the expression's own, under any `as` / `<T>` cast, so
// `x / (n as 2)` is a division by `n` (C-0128). The one division `ratio()` itself performs is exempt: a `/` inside a
// function named `ratio` in the kernel's sources (`packages/kernel/src/`, where §3.2 (8)'s ratio() lives) is its
// implementation; a `ratio` written in another package is no exemption (C-0125). A zero literal divisor is always
// refused. A vetted division elsewhere (an fdlibm routine's, say) carries its own `eslint-disable-next-line` with
// the reason, which the review reads.
import ts from 'typescript';
import { lintedFile, numericLiteralValue, resolveIdentifier, unwrap } from './shared.mjs';

/** Is the node inside a function named `ratio` (declaration, expression, arrow bound to `ratio`, or method)? */
function insideRatio(node) {
  for (let n = node.parent; n; n = n.parent) {
    if (n.type === 'FunctionDeclaration' || n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression') {
      if (n.id && n.id.name === 'ratio') return true;
      const p = n.parent;
      if (p && p.type === 'VariableDeclarator' && p.id.type === 'Identifier' && p.id.name === 'ratio') return true;
      if (p && (p.type === 'MethodDefinition' || p.type === 'Property') && !p.computed && p.key.type === 'Identifier' && p.key.name === 'ratio') return true;
    }
  }
  return false;
}

/** A same-file `const` bound to a numeric literal: its value, else null. */
function constLiteral(sourceCode, id) {
  const v = resolveIdentifier(sourceCode, id);
  if (!v || v.defs.length !== 1) return null;
  const def = v.defs[0];
  if (def.type !== 'Variable' || def.parent?.kind !== 'const' || def.node.type !== 'VariableDeclarator') return null;
  if (def.node.id.type !== 'Identifier' || !def.node.init) return null;
  return numericLiteralValue(def.node.init);
}

/**
 * The expression under its type casts (`n as 2`, `<2>n`, `n satisfies T`): the value whose type is judged. Narrower than
 * shared `unwrap`: `!` and `f<T>` instantiation are kept, so `n!` is judged by its own type (C-0128 (4)).
 */
function uncast(node) {
  let n = node;
  while (n && (n.type === 'TSAsExpression' || n.type === 'TSTypeAssertion' || n.type === 'TSSatisfiesExpression')) n = n.expression;
  return n;
}

/**
 * With type information: is the divisor's type a non-zero number / bigint literal type (or a union of them)? The type
 * is the expression's own under its casts, so a cast cannot make a computed divisor a literal one (C-0128).
 */
function literalTyped(services, node) {
  if (!services?.program || !services.esTreeNodeToTSNodeMap) return false;
  const checker = services.program.getTypeChecker();
  const tsNode = services.esTreeNodeToTSNodeMap.get(uncast(node));
  if (!tsNode) return false;
  const type = checker.getTypeAtLocation(tsNode);
  const parts = type.isUnion() ? type.types : [type];
  return parts.every((t) => {
    if (t.flags & ts.TypeFlags.NumberLiteral) return t.value !== 0;
    if (t.flags & ts.TypeFlags.BigIntLiteral) return t.value.base10Value !== '0';
    return false;
  });
}

export default {
  meta: {
    type: 'problem',
    docs: { description: 'a division by a computed value goes through ratio() in model code (§3.2 (8), C-0044)' },
    schema: [],
    messages: {
      computedDivisor: 'Division by a computed value: use ratio(num, den, kind), which refuses a denominator below its floor (§3.2 (8), C-0044).',
      zeroDivisor: 'Division by a zero literal (§3.2 (8)).',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const services = sourceCode.parserServices;
    const { rel } = lintedFile(context);
    const inKernel = rel !== null && rel.startsWith('packages/kernel/src/');
    function check(node, divisor) {
      if (inKernel && insideRatio(node)) return;
      const d = unwrap(divisor);
      let value = numericLiteralValue(d);
      if (value === null && d.type === 'Identifier') value = constLiteral(sourceCode, d);
      if (value !== null) {
        if (value === 0 || Number.isNaN(value)) context.report({ node: divisor, messageId: 'zeroDivisor' });
        return;
      }
      if (literalTyped(services, divisor)) return;
      context.report({ node: divisor, messageId: 'computedDivisor' });
    }
    return {
      BinaryExpression(node) {
        if (node.operator === '/') check(node, node.right);
      },
      AssignmentExpression(node) {
        if (node.operator === '/=') check(node, node.right);
      },
    };
  },
};
