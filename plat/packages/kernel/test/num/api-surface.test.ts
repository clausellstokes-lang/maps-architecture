// M0-a-01: the kernel's public API is the list in packages/kernel/API.md Appendix B, name for name (J263 Q1: no
// export of any folder index or of the barrel is added, removed or renamed by the consolidation). Both sides are read
// at run time — API.md's per-folder lines, src/index.ts's folder list, each folder index's exports — so there is no
// recorded copy to drift: the barrel's runtime names (`Object.keys` of the package index) are the union of Appendix
// B's `code` names; each folder index's runtime names are its line's `code` names, and its other exported names
// (types, read from its source with the TypeScript compiler, `export type *` followed) its line's *italic* names. An
// added alias fails by name. The one excuse is AFTER_APPENDIX_B below: the names exported since the appendix was
// generated, a list that only shrinks.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import * as barrel from '../../src/index.js';
import * as f_num from '../../src/num/index.js';
import * as f_hash from '../../src/hash/index.js';
import * as f_dmath from '../../src/dmath/index.js';
import * as f_rng from '../../src/rng/index.js';
import * as f_registry from '../../src/registry/index.js';
import * as f_arena from '../../src/arena/index.js';
import * as f_index from '../../src/index/index.js';
import * as f_insert from '../../src/insert/index.js';
import * as f_tx from '../../src/tx/index.js';
import * as f_faces from '../../src/faces/index.js';
import * as f_arr from '../../src/arr/index.js';
import * as f_geom from '../../src/geom/index.js';
import * as f_skeleton from '../../src/skeleton/index.js';
import * as f_medial from '../../src/medial/index.js';
import * as f_warp from '../../src/warp/index.js';
import * as f_invariants from '../../src/invariants/index.js';
import * as f_io from '../../src/io/index.js';
import * as f_facade from '../../src/facade/index.js';
import * as f_noise from '../../src/noise/index.js';
import * as f_digest from '../../src/digest/index.js';
import * as f_types from '../../src/types/index.js';
import { exportedNames, moduleLinks } from './copies.js';

/** Every folder index, by folder name (the last test holds these names equal to Appendix B's folders). */
const FOLDERS: Readonly<Record<string, Readonly<Record<string, unknown>>>> = {
  num: f_num, hash: f_hash, dmath: f_dmath, rng: f_rng, registry: f_registry, arena: f_arena, index: f_index,
  insert: f_insert, tx: f_tx, faces: f_faces, arr: f_arr, geom: f_geom, skeleton: f_skeleton, medial: f_medial,
  warp: f_warp, invariants: f_invariants, io: f_io, facade: f_facade, noise: f_noise, digest: f_digest,
  types: f_types,
};

/**
 * The names exported after Appendix B was generated (2026-10-07; "a name added to the kernel after this date is not
 * listed here until the document is regenerated"), by folder, with the rows that added them: tx's stage image, its
 * three functions and its type (C-0287, C-0299). The list only shrinks: a name here must be missing from Appendix B,
 * so a regeneration that lists it fails this test until the name leaves the list. No other name is excused.
 */
const AFTER_APPENDIX_B: Readonly<Record<string, { readonly values: readonly string[]; readonly types: readonly string[] }>> = {
  tx: { values: ['restoreGeneration', 'restoreSavepoint', 'takeSavepoint'], types: ['Savepoint'] },
};
const afterOf = (folder: string, kind: 'values' | 'types'): readonly string[] => AFTER_APPENDIX_B[folder]?.[kind] ?? [];

/** One folder's line of Appendix B: `- **folder** (n values, m types): `value`, …, *Type*, ….` */
interface FolderLine {
  readonly folder: string;
  readonly values: readonly string[];
  readonly types: readonly string[];
  /** The counts the line states. */
  readonly stated: readonly [number, number];
}

/** Appendix B of API.md: its stated totals and its folder lines, in order. */
function appendixB(): { readonly totals: readonly [number, number, number]; readonly lines: readonly FolderLine[] } {
  const text = readFileSync(new URL('../../API.md', import.meta.url), 'utf8');
  const start = text.indexOf('## Appendix B.');
  if (start < 0) throw new Error('API.md has no Appendix B');
  const rest = text.slice(start + 1);
  const next = rest.search(/\n## /);
  const section = next < 0 ? rest : rest.slice(0, next);
  const totals = /\((\d+) names: (\d+) values\b[^)]*?(\d+) types\)/.exec(section);
  if (totals === null) throw new Error('Appendix B states no totals');
  const lines: FolderLine[] = [];
  for (const m of section.matchAll(/^- \*\*(\w+)\*\* \((\d+) values?, (\d+) types?\): (.*)$/gm)) {
    const items = m[4];
    lines.push({
      folder: m[1],
      values: [...items.matchAll(/`([^`]+)`/g)].map((v) => v[1]),
      types: [...items.matchAll(/\*([A-Za-z_$][\w$]*)\*/g)].map((t) => t[1]),
      stated: [Number(m[2]), Number(m[3])],
    });
  }
  return { totals: [Number(totals[1]), Number(totals[2]), Number(totals[3])], lines };
}

const B_LIST = appendixB();
const sorted = (xs: Iterable<string>): string[] => [...xs].sort();

describe('the public API is API.md Appendix B, name for name (J263 Q1; checks/M0-a-01-notes.md N-c3-1)', () => {
  it('the barrel re-exports every module folder\'s index and nothing else, in Appendix B\'s folder order', () => {
    const links = moduleLinks('index.ts');
    const folders = links.map((l) => /^\.\/(\w+)\/index\.js$/.exec(l.from)?.[1] ?? `not a folder index: ${l.kind} ${l.from}`);
    expect(links.every((l) => l.kind === 'export' && !l.typeOnly)).toBe(true);
    expect(folders).toEqual(B_LIST.lines.map((l) => l.folder));
    // every statement of the barrel is `export * from './<folder>/index.js'`: no alias, no local export
    const body = readFileSync(new URL('../../src/index.ts', import.meta.url), 'utf8').split('\n').filter((l) => l.trim() !== '' && !l.startsWith('//'));
    expect(body).toEqual(folders.map((f) => `export * from './${f}/index.js';`));
  });

  it('Appendix B\'s lines hold the counts they state, and the counts sum to its totals', () => {
    let values = 0;
    let types = 0;
    for (const l of B_LIST.lines) {
      expect([l.values.length, l.types.length], `the ${l.folder} line`).toEqual(l.stated);
      values += l.values.length;
      types += l.types.length;
    }
    expect([values + types, values, types]).toEqual(B_LIST.totals);
  });

  it('the barrel\'s runtime names are the union of Appendix B\'s values (and the names exported after it), exactly', () => {
    const listed = B_LIST.lines.flatMap((l) => l.values);
    expect(new Set(listed).size, 'a value listed under two folders').toBe(listed.length);
    const after = B_LIST.lines.flatMap((l) => afterOf(l.folder, 'values'));
    const everyListed = new Set([...listed, ...B_LIST.lines.flatMap((l) => l.types)]);
    for (const n of [...after, ...B_LIST.lines.flatMap((l) => afterOf(l.folder, 'types'))]) {
      expect(everyListed.has(n), `${n} is in Appendix B now: drop it from AFTER_APPENDIX_B`).toBe(false);
    }
    expect(sorted(Object.keys(barrel))).toEqual(sorted([...listed, ...after]));
  });

  it('each folder index\'s runtime names are its line\'s values, and its other exported names its line\'s types', () => {
    expect(sorted(Object.keys(FOLDERS))).toEqual(sorted(B_LIST.lines.map((l) => l.folder)));
    expect(Object.keys(AFTER_APPENDIX_B).every((f) => f in FOLDERS)).toBe(true);
    for (const l of B_LIST.lines) {
      const values = Object.keys(FOLDERS[l.folder]);
      const runtime = new Set(values);
      expect(sorted(values), `${l.folder}/index.ts's values`).toEqual(sorted([...l.values, ...afterOf(l.folder, 'values')]));
      expect(sorted([...exportedNames(`${l.folder}/index.ts`)].filter((n) => !runtime.has(n))), `${l.folder}/index.ts's types`).toEqual(sorted([...l.types, ...afterOf(l.folder, 'types')]));
    }
  });
});
