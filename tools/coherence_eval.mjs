// Evaluate workflows/18-coherence.js in a stage that spawns no agents (stage kind 'describe') and print its result as
// JSON. Used by tools/coherence_driver.py so the loop's own rules (owner normalisation, touched units, caps) come from
// the script itself, never from a copy. Usage: node tools/coherence_eval.mjs '<stage-json>'
import fs from 'node:fs'; import vm from 'node:vm'; import path from 'node:path'; import url from 'node:url';
const here = path.dirname(url.fileURLToPath(import.meta.url));
const src = fs.readFileSync(path.join(here, '..', 'workflows', '18-coherence.js'), 'utf8').replace(/^export const meta/m, 'const meta');
const stage = JSON.parse(process.argv[2] || '{"kind":"describe"}');
const ctx = {
  args: { stage }, console,
  agent: async () => { throw new Error('coherence_eval: a stage that spawns agents cannot be evaluated here') },
  parallel: async (t) => Promise.all(t.map((f) => f())), pipeline: async () => [], phase: () => {}, log: () => {},
  budget: { total: null, spent: () => 0, remaining: () => Infinity }, workflow: async () => null,
};
vm.createContext(ctx);
const result = await new vm.Script('(async () => {\n' + src + '\n})()').runInContext(ctx);
process.stdout.write(JSON.stringify(result));
