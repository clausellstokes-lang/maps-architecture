// plat/no-object-key-iteration (§6.5 (3); C-0009): no dependence on object-key order. In model code `for…in`,
// `Object.keys / values / entries` and the other own-key enumerations (`Object.getOwnPropertyNames`,
// `Object.getOwnPropertySymbols`, `Reflect.ownKeys`; C-0125) are refused — integer-like keys enumerate in numeric order,
// which a writer can depend on unknowingly. Keys are iterated through the kernel's sortedKeys() (a total-order
// comparator). `Map` and `Set` iteration (insertion order) is allowed.
// No enumeration escapes by indirection (C-0128, as math-allowlist for `Math`, C-0125 (2)): a destructuring of `Object`
// or `Reflect` that binds an enumeration (or binds by a computed key or a rest element) is refused, and so is `Object`
// or `Reflect` used as a value — aliased, passed, returned, cast, spread — other than as a member's object with a
// static name, as the right side of `instanceof`, as a callee (`Object(x)`) or in a type (`typeof Object.keys`).
import { globalAccesses, inTypePosition, staticMemberName } from './shared.mjs';

const ENUMERATIONS = {
  Object: new Set(['keys', 'values', 'entries', 'getOwnPropertyNames', 'getOwnPropertySymbols']),
  Reflect: new Set(['ownKeys']),
};

/** The static key of a destructuring property (`{ keys }`, `{ 'keys': k }`), or null when computed. */
function propertyKey(prop) {
  if (prop.computed) return prop.key.type === 'Literal' && typeof prop.key.value === 'string' ? prop.key.value : null;
  if (prop.key.type === 'Identifier') return prop.key.name;
  if (prop.key.type === 'Literal') return String(prop.key.value);
  return null;
}

/** The object pattern a value is destructured into (`const {…} = v`, `({…} = v)`, `({…} = v) =>` defaults), or null. */
function patternOf(node) {
  const p = node.parent;
  if (!p) return null;
  if (p.type === 'VariableDeclarator' && p.init === node) return p.id.type === 'ObjectPattern' ? p.id : null;
  if (p.type === 'AssignmentExpression' && p.right === node && p.operator === '=') return p.left.type === 'ObjectPattern' ? p.left : null;
  if (p.type === 'AssignmentPattern' && p.right === node) return p.left.type === 'ObjectPattern' ? p.left : null;
  return null;
}

/** Is the reference a use that cannot reach an enumeration (`x instanceof Object`, `Object(x)`, a type position)? */
function harmlessUse(node) {
  const p = node.parent;
  if (!p) return false;
  if (p.type === 'BinaryExpression' && p.operator === 'instanceof' && p.right === node) return true;
  if ((p.type === 'CallExpression' || p.type === 'NewExpression') && p.callee === node) return true;
  return inTypePosition(node);
}

export default {
  meta: {
    type: 'problem',
    docs: { description: 'no for…in or own-key enumeration in model code (C-0009)' },
    schema: [],
    messages: {
      forIn: '`for…in` iterates object keys in an order model code may not depend on (§6.5 (3), C-0009); use sortedKeys() or a Map.',
      keyEnumeration: '{{owner}}.{{name}} enumerates object keys in an order model code may not depend on (§6.5 (3), C-0009); use sortedKeys() or a Map.',
      computedMember: 'A computed {{owner}} member cannot be checked for a key enumeration (§6.5 (3), C-0009); name the member.',
      ownerAsValue: '{{owner}} used as a value (aliased, passed, destructured past its static members or cast) lets a key enumeration escape the lint (§6.5 (3), C-0009); call its members directly.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    return {
      ForInStatement(node) {
        context.report({ node, messageId: 'forIn' });
      },
      'Program:exit'() {
        for (const { name: owner, node } of globalAccesses(sourceCode, new Set(Object.keys(ENUMERATIONS)))) {
          const parent = node.parent;
          if (parent && parent.type === 'MemberExpression' && parent.object === node) {
            const name = staticMemberName(parent);
            if (name === null) context.report({ node: parent, messageId: 'computedMember', data: { owner } });
            else if (ENUMERATIONS[owner].has(name)) context.report({ node: parent, messageId: 'keyEnumeration', data: { owner, name } });
            continue;
          }
          const pattern = patternOf(node);
          if (pattern !== null) {
            for (const prop of pattern.properties) {
              if (prop.type === 'RestElement') {
                context.report({ node: prop, messageId: 'ownerAsValue', data: { owner } });
                continue;
              }
              const name = propertyKey(prop);
              if (name === null) context.report({ node: prop.key, messageId: 'computedMember', data: { owner } });
              else if (ENUMERATIONS[owner].has(name)) context.report({ node: prop.key, messageId: 'keyEnumeration', data: { owner, name } });
            }
            continue;
          }
          if (!harmlessUse(node)) context.report({ node, messageId: 'ownerAsValue', data: { owner } });
        }
      },
    };
  },
};
