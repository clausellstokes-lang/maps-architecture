// The generator of the registries' typed constants (item M0-d-01; §6.1, §14 "ConcernId … generated as typed constants —
// never a string"; C-0005, C-0020): reads the kernel's two versioned registries, src/registry/concerns.json and
// src/registry/stages.json, and writes src/registry/ids.ts — CONCERNS (name → ConcernId), ConcernName,
// RerollableConcernName, STAGES (name → StageId) and StageName.
//
//   node packages/kernel/test/rng/gen-registry.ts            write src/registry/ids.ts (from plat/)
//   node packages/kernel/test/rng/gen-registry.ts --check    exit 0 when ids.ts equals what the registries generate
//
// It lives with the tests because it reads files (model code may not import node:fs); registry.test.ts holds the
// committed ids.ts equal to renderIds() of the committed registries. Node 24 runs this file directly (type stripping).
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';

/** The fields of a registry row the generator reads. */
export interface GenRow {
  readonly id: number;
  readonly name: string;
  readonly rerollable?: boolean;
}

/** A registry file as the generator reads it. */
export interface GenRegistry {
  readonly registry: string;
  readonly version: number;
  readonly rows: readonly GenRow[];
}

export const REGISTRY_DIR = new URL('../../src/registry/', import.meta.url);

/** One quoted object key or string-literal type member (the registry names are plain ASCII). */
function quote(name: string): string {
  if (!/^[A-Za-z0-9._/-]+$/.test(name)) throw new Error(`gen-registry: unexpected character in the name ${JSON.stringify(name)}`);
  return `'${name}'`;
}

/** Checks a registry's rows: ids 0 … n − 1 in file order, names unique. */
function checkRows(reg: GenRegistry, what: string): void {
  const seen = new Set<string>();
  reg.rows.forEach((row, i) => {
    if (row.id !== i) throw new Error(`gen-registry: ${what} row ${i} has id ${row.id} (ids are dense and in file order)`);
    if (seen.has(row.name)) throw new Error(`gen-registry: ${what} name ${row.name} repeated`);
    seen.add(row.name);
  });
}

/** The text of src/registry/ids.ts for the two registries. */
export function renderIds(concerns: GenRegistry, stages: GenRegistry): string {
  checkRows(concerns, 'concerns');
  checkRows(stages, 'stages');
  const rerollable = concerns.rows.filter((r) => r.rerollable === true).map((r) => quote(r.name));
  const out: string[] = [
    `// GENERATED from concerns.json (version ${concerns.version}) and stages.json (version ${stages.version}) by`,
    '// packages/kernel/test/rng/gen-registry.ts — do not edit by hand: change the registry (append-only, C-0020) and run',
    '// `node packages/kernel/test/rng/gen-registry.ts` from plat/; test/rng/registry.test.ts fails while this file is stale.',
    '// The typed constants of the kernel\'s two registries (§6.1; §14: "ConcernId … generated as typed constants — never a',
    '// string"; item M0-d-01, C-0005).',
    "import type { ConcernId, StageId } from '../types/index.js';",
    '',
    '/** Every registered concern\'s u16 id by its registry name, in §6.1\'s table order. */',
    'export const CONCERNS = Object.freeze({',
    ...concerns.rows.map((r) => `  ${quote(r.name)}: ${r.id} as ConcernId,`),
    '});',
    '',
    '/** A registered concern\'s name. */',
    'export type ConcernName = keyof typeof CONCERNS;',
    '',
    '/** The rerollable concerns (§6.1: `rerollLayer`\'s concern type is generated from the registry). */',
    `export type RerollableConcernName = ${rerollable.join(' | ')};`,
    '',
    '/** Every registered stage\'s u16 id by its name: §4.1\'s order, then S7c, S9b, S8.seed (C-0020). */',
    'export const STAGES = Object.freeze({',
    ...stages.rows.map((r) => `  ${quote(r.name)}: ${r.id} as StageId,`),
    '});',
    '',
    '/** A registered stage\'s name. */',
    'export type StageName = keyof typeof STAGES;',
    '',
  ];
  return out.join('\n');
}

export function readRegistry(name: 'concerns' | 'stages', dir: URL = REGISTRY_DIR): GenRegistry {
  return JSON.parse(readFileSync(new URL(`${name}.json`, dir), 'utf8')) as GenRegistry;
}

/** The generated text for the registries in `dir`. */
export function generated(dir: URL = REGISTRY_DIR): string {
  return renderIds(readRegistry('concerns', dir), readRegistry('stages', dir));
}

function main(argv: readonly string[]): number {
  const target = new URL('ids.ts', REGISTRY_DIR);
  const text = generated();
  if (argv.includes('--check')) {
    const now = readFileSync(target, 'utf8');
    if (now === text) {
      process.stdout.write('gen-registry --check: src/registry/ids.ts is up to date\n');
      return 0;
    }
    process.stderr.write('gen-registry --check: src/registry/ids.ts differs from what the registries generate\n');
    return 1;
  }
  writeFileSync(target, text);
  process.stdout.write(`gen-registry: wrote ${fileURLToPath(target)}\n`);
  return 0;
}

if (process.argv[1] !== undefined && import.meta.url === pathToFileURL(process.argv[1]).href) {
  process.exitCode = main(process.argv.slice(2));
}
