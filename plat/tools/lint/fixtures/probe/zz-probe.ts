// The PROBE (C-0063, its mechanism C-0106): the checker's probe of 2026-10-03, which the scaffold's empty lint plugin
// passed. Never compiled, imported or run: the lint's whole-tree check `probe-red` lints this file IN PLACE under the
// model-package rule set on every `corepack pnpm lint` and passes only when every line marked `planted` is reported.
// Keep one planted construct per line; the marker names it.
export const probe: unknown[] = [
  Math.pow(2, 0.5), // planted: Math.pow
  Math.random(), // planted: Math.random
  Math.sin(1), // planted: Math.sin
  Date.now(), // planted: Date.now
  performance.now(), // planted: performance.now
  2 ** 0.5, // planted: **
  Object.keys({ a: 1 }).sort(), // planted: Object.keys().sort()
  [3, 1].sort(), // planted: [3, 1].sort()
  'a'.localeCompare('b'), // planted: localeCompare
];
for (const k in { a: 1 }) probe.push(k); // planted: for…in
