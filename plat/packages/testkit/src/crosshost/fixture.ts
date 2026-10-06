// The fixture loader (M0-d-06; C-0067 "outputs out, inputs in"): a fixture file, its stage table and every input file
// it names must resolve — symbolic links followed — inside plat/ (§17.1 (3)); the inputs are read here, in the runner,
// and handed to every leg as text, so no leg opens a file and no input comes from PLAT_BENCH_OUT.
import { readFileSync, realpathSync } from 'node:fs';
import { isAbsolute, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import type { CrossHostFixture, CrossHostFixtureFile } from './types.js';

/** plat/ (this file lies in plat/packages/testkit/src/crosshost/). */
export const CROSSHOST_PLAT_ROOT = fileURLToPath(new URL('../../../../', import.meta.url));

/**
 * A plat/-relative path resolved and checked: it exists and its real path (links followed) lies inside plat/. An
 * absolute path is refused (a fixture names files relative to plat/).
 */
export function crossHostInsidePlat(path: string, what: string, root: string = CROSSHOST_PLAT_ROOT): string {
  if (typeof path !== 'string' || path === '') throw new Error(`crosshost: ${what} is not a path`);
  if (isAbsolute(path)) throw new Error(`crosshost: ${what} ${JSON.stringify(path)} is absolute; a fixture names plat/-relative paths (C-0067)`);
  const platReal = realpathSync(root);
  let real: string;
  try {
    real = realpathSync(resolve(platReal, path));
  } catch {
    throw new Error(`crosshost: ${what} ${JSON.stringify(path)} does not exist under plat/`);
  }
  if (real !== platReal && !real.startsWith(platReal + sep)) {
    throw new Error(`crosshost: ${what} ${JSON.stringify(path)} resolves outside plat/ (${real}; §17.1 (3), C-0067)`);
  }
  return real;
}

const KEYS = new Set(['id', 'entry', 'seeds', 'stages', 'inputs', '$comment']);

/** Checks a fixture object's shape and loads it: the entry resolved, the inputs read. */
export function crossHostFixtureFrom(value: unknown, source: string, root: string = CROSSHOST_PLAT_ROOT): CrossHostFixture {
  if (typeof value !== 'object' || value === null || Array.isArray(value)) throw new Error(`crosshost: ${source}: a fixture is a JSON object`);
  const o = value as Record<string, unknown>;
  for (const k of Object.getOwnPropertyNames(o)) if (!KEYS.has(k)) throw new Error(`crosshost: ${source}: an unknown field ${JSON.stringify(k)}`);
  const f = o as unknown as CrossHostFixtureFile;
  if (typeof f.id !== 'string' || !/^[a-z0-9][a-z0-9.-]*$/.test(f.id)) throw new Error(`crosshost: ${source}: the id is a lower-case name ([a-z0-9.-])`);
  if (!Array.isArray(f.seeds) || f.seeds.length === 0) throw new Error(`crosshost: ${source}: the seed list is empty`);
  const seeds = new Set<number>();
  for (const s of f.seeds) {
    if (typeof s !== 'number' || (s >>> 0) !== s) throw new Error(`crosshost: ${source}: a seed is a u32, got ${JSON.stringify(s)}`);
    if (seeds.has(s)) throw new Error(`crosshost: ${source}: the seed ${String(s)} is listed twice`);
    seeds.add(s);
  }
  if (!Array.isArray(f.stages) || f.stages.length === 0) throw new Error(`crosshost: ${source}: the stage list is empty`);
  const stages = new Set<string>();
  for (const s of f.stages) {
    if (typeof s !== 'string' || s === '') throw new Error(`crosshost: ${source}: a stage id is a non-empty string`);
    if (stages.has(s)) throw new Error(`crosshost: ${source}: the stage ${JSON.stringify(s)} is listed twice`);
    stages.add(s);
  }
  const entryPath = crossHostInsidePlat(f.entry, 'the entry', root);
  const inputs: Record<string, string> = {};
  const named = f.inputs ?? {};
  if (typeof named !== 'object' || named === null || Array.isArray(named)) throw new Error(`crosshost: ${source}: inputs is an object of name → path`);
  for (const name of Object.getOwnPropertyNames(named).sort((a, b) => (a < b ? -1 : a > b ? 1 : 0))) {
    const p = (named as Record<string, unknown>)[name];
    if (typeof p !== 'string') throw new Error(`crosshost: ${source}: the input ${JSON.stringify(name)} names no path`);
    inputs[name] = readFileSync(crossHostInsidePlat(p, `the input ${JSON.stringify(name)}`, root), 'utf8');
  }
  return { id: f.id, source, entryPath, seeds: [...f.seeds], stages: [...f.stages], inputs };
}

/** Loads a fixture file (a plat/-relative path). */
export function loadCrossHostFixture(path: string, root: string = CROSSHOST_PLAT_ROOT): CrossHostFixture {
  const real = crossHostInsidePlat(path, 'the fixture', root);
  let value: unknown;
  try {
    value = JSON.parse(readFileSync(real, 'utf8'));
  } catch (e) {
    throw new Error(`crosshost: the fixture ${JSON.stringify(path)} is not JSON: ${e instanceof Error ? e.message : String(e)}`);
  }
  return crossHostFixtureFrom(value, relative(realpathSync(root), real).split(sep).join('/'), root);
}
