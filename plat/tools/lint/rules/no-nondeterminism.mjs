// plat/no-nondeterminism (§6.5 (3), §6.5 (6), §14): model code reads no clock, no ambient randomness, no host and no
// locale. Refused: `Math.random`, `Date`, `performance`, the timers and schedulers, `crypto` (its getRandomValues and
// the rest of the global, C-0125), DOM globals, Node globals (§14: no model package has DOM types or Node globals),
// `Intl` and the locale-dependent string operations (`toLocaleString` and its kin, `localeCompare`) on any receiver.
// Globals are found by scope analysis, so a local binding of the same name is not a global read; a read through a
// global object (`globalThis.Date`, `window.setTimeout`) is the global read. `globalThis` itself (ES, allowed as a
// member's object with a static name) may not be used as a value — aliased, passed, destructured or with a computed
// member — so no forbidden global escapes through it (C-0128); the vendored scan's `globalObjects: false` leaves a UMD
// wrapper's use of it alone, as it does `self` and `global`.
import { globalAccesses, globalObjectRefs, staticMemberName } from './shared.mjs';

const WHY = {
  Date: 'reads the clock',
  performance: 'reads the clock',
  setTimeout: 'a timer: results would depend on arrival order (§6.5 (6))',
  setInterval: 'a timer: results would depend on arrival order (§6.5 (6))',
  setImmediate: 'a timer: results would depend on arrival order (§6.5 (6))',
  clearTimeout: 'a timer',
  clearInterval: 'a timer',
  clearImmediate: 'a timer',
  queueMicrotask: 'a scheduler: results would depend on arrival order (§6.5 (6))',
  requestAnimationFrame: 'a scheduler and DOM access',
  cancelAnimationFrame: 'a scheduler and DOM access',
  requestIdleCallback: 'a scheduler and DOM access',
  cancelIdleCallback: 'a scheduler and DOM access',
  crypto: 'ambient randomness (crypto.getRandomValues) and host state',
  Intl: 'locale-dependent',
  document: 'DOM access',
  navigator: 'DOM access',
  location: 'DOM access',
  history: 'DOM access',
  localStorage: 'DOM access',
  sessionStorage: 'DOM access',
  indexedDB: 'DOM access',
  fetch: 'host access',
  XMLHttpRequest: 'host access',
  WebSocket: 'host access',
  process: 'a Node global (§14)',
  Buffer: 'a Node global (§14)',
  __dirname: 'a Node global (§14)',
  __filename: 'a Node global (§14)',
};

/** Global objects that are themselves DOM or Node globals (globalThis is ES and stays allowed by itself). */
const HOST_OBJECTS = { window: 'DOM access', self: 'DOM access', global: 'a Node global (§14)' };

const LOCALE_METHODS = new Set([
  'toLocaleString', 'toLocaleDateString', 'toLocaleTimeString', 'toLocaleUpperCase', 'toLocaleLowerCase', 'localeCompare',
]);

export default {
  meta: {
    type: 'problem',
    docs: { description: 'no clock, ambient randomness, host or locale in model code (§6.5 (3))' },
    // globalObjects: false (the vendored scan's setting, C-0126) stops reporting a bare `window` / `self` / `global` —
    // a UMD wrapper's choice of the object to export into — while every forbidden read through them is still reported.
    schema: [{ type: 'object', properties: { globalObjects: { type: 'boolean' } }, additionalProperties: false }],
    messages: {
      forbiddenGlobal: '`{{name}}` is forbidden in model code (§6.5 (3)): {{why}}.',
      mathRandom: 'Math.random is forbidden in model code (§6.5 (3)): draw from the seeded stream (rng.stream, §6.1).',
      localeMethod: '`.{{name}}()` is locale-dependent and forbidden in model code (§6.5 (3)); compare by code unit.',
      globalObjectAsValue: '`globalThis` used as a value (aliased, passed, destructured or with a computed member) lets a forbidden global escape the lint (§6.5 (3)); name the member directly.',
    },
  },
  create(context) {
    const sourceCode = context.sourceCode;
    const globalObjects = context.options[0]?.globalObjects !== false;
    return {
      MemberExpression(node) {
        const name = staticMemberName(node);
        if (name !== null && LOCALE_METHODS.has(name)) context.report({ node: node.property, messageId: 'localeMethod', data: { name } });
      },
      'Program:exit'() {
        const names = new Set([...Object.keys(WHY), 'Math']);
        const reported = new Set();
        for (const { name, node } of globalAccesses(sourceCode, names)) {
          if (name === 'Math') {
            const parent = node.parent;
            if (parent && parent.type === 'MemberExpression' && parent.object === node && staticMemberName(parent) === 'random') {
              context.report({ node: parent, messageId: 'mathRandom' });
            }
            continue;
          }
          reported.add(node.type === 'MemberExpression' ? node.object : node);
          context.report({ node, messageId: 'forbiddenGlobal', data: { name, why: WHY[name] } });
        }
        if (!globalObjects) return;
        for (const id of globalObjectRefs(sourceCode)) {
          if (reported.has(id)) continue;
          if (Object.hasOwn(HOST_OBJECTS, id.name)) {
            context.report({ node: id, messageId: 'forbiddenGlobal', data: { name: id.name, why: HOST_OBJECTS[id.name] } });
            continue;
          }
          const parent = id.parent;
          if (parent && (parent.type === 'TSTypeQuery' || parent.type === 'TSQualifiedName')) continue; // a type: no read
          const member = parent && parent.type === 'MemberExpression' && parent.object === id ? staticMemberName(parent) : null;
          if (member === null) context.report({ node: id, messageId: 'globalObjectAsValue' });
        }
      },
    };
  },
};
