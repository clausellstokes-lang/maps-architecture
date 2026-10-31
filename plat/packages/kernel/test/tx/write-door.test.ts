// M0-a-06 hardening round S8, line 3: THE WRITE-DOOR GUARD. A TypeScript-checker scan (door-scan.ts, in the form of
// M0-e-03's one-door.test.ts: a planted probe read through the same compiler host) of plat/packages/*/src and
// plat/bench/src FAILS, naming file:line and the form, on any store whose target is an arena column — a typed-array
// property of VertexTable, HalfEdgeTable, LevelFaces, RoleTable, IndexHome, RoleHeadTable, OwnerTable or HandleTable,
// found from the declarations so every alias resolves — in every form the round's census found: `=`, every compound
// operator and ++ / --, on `<expr>.<column>[…]`, on a chained index, through an identifier bound to a column (const, let,
// destructuring, a for-of over a column tuple); a bulk method or a `.subarray` view; a column passed to a function of the
// scanned roots that stores into its parameter; and an assignment that replaces a column array or a table object outside
// the door's replacement calls (kernel/src/arena/write.ts). The counts, the slot counters, holesTop, the version, the
// frame and p.index are not columns. THE ALLOWLIST below, each entry with its reason, never by folder and never by line
// number; an entry whose text no longer occurs in its function, or whose file holds no store, is stale and fails.
// SELECTED BY LATER ROUNDS: this file makes a VALUE import of the kernel barrel, so `vitest related` selects it for every
// kernel source file; it runs in the kernel project and, under test/tx/, in kernel-tiny too (M0-a-06's NEAR).
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import * as kernel from '../../src/index.js';
import { scanStores, tsFiles, type Finding } from './door-scan.js';

const PLAT = fileURLToPath(new URL('../../../../', import.meta.url));
const PACKAGES = join(PLAT, 'packages');

/** The scanned roots: every package's src/ and the bench's. */
function roots(): string[] {
  const out = readdirSync(PACKAGES, { withFileTypes: true }).filter((e) => e.isDirectory()).map((e) => join(PACKAGES, e.name, 'src')).sort();
  out.push(join(PLAT, 'bench', 'src'));
  return out;
}

/** An allowed store: a whole file, or one store by file, enclosing function and normalised text. */
interface Allowed {
  readonly file: string;
  readonly fn?: string;
  readonly text?: string;
  readonly reason: string;
}

const ALLOWED: readonly Allowed[] = [
  { file: 'packages/kernel/src/arena/write.ts', reason: 'the door itself: every typed setter and replacement call, and the undo\'s put-back' },
  { file: 'packages/kernel/src/io/compact.ts', reason: 'stores only into a Plat it creates (compactSlots\' fresh arena); compactSlots refuses an arena with a batch open' },
  { file: 'packages/kernel/src/io/decode.ts', reason: 'stores only into a Plat it creates (the decoded arena, before any batch can open on it)' },
  { file: 'packages/kernel/src/tx/savepoint.ts', reason: 'an image\'s put-back (putBack): the before-image\'s arrays become the arena\'s, the observer\'s CHECK A judges it' },
  { file: 'packages/kernel/src/index/spatial.ts', fn: 'attachIndex', text: 'p.indexHome.vertex.fill(-1)', reason: 'attachIndex\'s fills, at attach, with no batch open (M0-a-03\'s file)' },
  { file: 'packages/kernel/src/index/spatial.ts', fn: 'attachIndex', text: 'p.indexHome.edge.fill(-1)', reason: 'attachIndex\'s fills, at attach, with no batch open (M0-a-03\'s file)' },
  { file: 'packages/kernel/src/index/spatial.ts', fn: 'attachIndex', text: 'col.fill(-1)', reason: 'attachIndex\'s fills (the for-of over indexHome.face), at attach, with no batch open (M0-a-03\'s file)' },
  { file: 'packages/layout/src/pipeline/runner.ts', fn: 'run > batch', text: 'p.faces[lv.level].stage[f] = rank', reason: 'run\'s ctx `batch` callback writes the stage rank after the commit, with no frame open (M0-x-02\'s file)' },
];

function allowedBy(f: Finding): Allowed | undefined {
  return ALLOWED.find((a) => a.file === f.file && (a.fn === undefined || (a.fn === f.fn && a.text === f.text)));
}

const show = (f: Finding): string => `${f.file}:${f.line} [${f.form}] (${f.fn || 'module'}) ${f.text}`;

describe('the write door\'s guard (S8 line 3): no store into an arena column outside arena/write.ts', () => {
  it('the scan reads every package\'s src/ and the bench\'s, and the kernel\'s barrel (a value import: `vitest related` selects this file)', () => {
    expect(typeof kernel.createPlat).toBe('function');
    const r = roots();
    expect(r.some((x) => x.endsWith(join('packages', 'kernel', 'src')))).toBe(true);
    expect(r.some((x) => x.endsWith(join('packages', 'layout', 'src')))).toBe(true);
  });

  it('every store into a column is the door\'s or an allowlisted one, and no allowlist entry is stale', () => {
    const rs = roots();
    const files = rs.flatMap((d) => tsFiles(d));
    const { findings, tablesSeen } = scanStores(files, rs, PLAT);
    expect(tablesSeen).toEqual(['HalfEdgeTable', 'HandleTable', 'IndexHome', 'LevelFaces', 'OwnerTable', 'Plat', 'RoleHeadTable', 'RoleTable', 'VertexTable']);
    const outside = findings.filter((f) => allowedBy(f) === undefined).map(show);
    const matched = findings.filter((f) => allowedBy(f) !== undefined && allowedBy(f)?.fn !== undefined);
    console.log(`write-door guard: ${files.length} files, ${findings.length} column stores; allowlisted by function: \n${matched.map(show).join('\n')}`);
    expect(outside, 'stores into an arena column outside the door (convert each to its typed setter or replacement call in arena/write.ts)').toEqual([]);
    const stale = ALLOWED.filter((a) => !findings.some((f) => f.file === a.file && (a.fn === undefined || (a.fn === f.fn && a.text === f.text)))).map((a) => `${a.file}${a.fn === undefined ? '' : ` ${a.fn}: ${a.text}`}`);
    expect(stale, 'stale allowlist entries').toEqual([]);
  }, 300_000);
});

// ---- the planted probe: one store of every form, under the kernel and under a non-kernel package --------------------

const KPROBE = join(PACKAGES, 'kernel', 'src', 'tx', '__write-door-probe__.ts');
const LPROBE = join(PACKAGES, 'layout', 'src', 'pipeline', '__write-door-probe__.ts');
const KPROBE_TEXT = [
  "import type { Plat } from '../arena/index.js';",
  "import { setVerticesX } from '../arena/write.js';",
  'function helper(a: Int32Array, i: number): void {',
  '  a[i] = 1;',
  '}',
  'export function probe(p: Plat, v: number, l: number): void {',
  '  p.vertices.x[v] = 1;',
  '  p.vertices.flags[v] |= 2;',
  '  p.halfEdges.next[v]++;',
  '  p.indexHome.face[l][v] = 3;',
  '  const X = p.vertices.x;',
  '  X[v] = 5;',
  '  const { y } = p.vertices;',
  '  y[v] = 6;',
  '  for (const col of p.indexHome.face) col[v] = 7;',
  '  p.roles.kind.fill(0);',
  '  p.halfEdges.origin.subarray(0, 4)[1] = 8;',
  '  helper(p.roles.entity, v);',
  '  p.roles.head.k0 = new Int32Array(4);',
  '  setVerticesX(p, v, 9);',
  '  p.roles.head.count = 0;',
  '  p.slots.vertex.top = 0;',
  '  p.version = 1;',
  '}',
].join('\n');
const LPROBE_TEXT = [
  "import type { Plat } from '@plat/kernel';",
  'export function probe(p: Plat, f: number, l: number): void {',
  '  p.faces[l].stage[f] = 1;',
  '}',
].join('\n');

describe('the guard\'s mutants: a planted probe read through the same compiler host', () => {
  it('names every form — dotted, compound, ++, chained index, alias, destructured alias, for-of alias, bulk, subarray view, a column passed to a storing helper, replacement, and a store under a non-kernel package — and never a door call or a count', () => {
    const planted = new Map([[KPROBE, KPROBE_TEXT], [LPROBE, LPROBE_TEXT]]);
    const { findings } = scanStores([KPROBE, LPROBE], roots(), PLAT, planted);
    const got = findings.filter((f) => f.file.includes('__write-door-probe__')).map((f) => `${f.file.split('/').slice(-4).join('/')}:${f.line} ${f.form} ${f.text}`);
    expect(got).toEqual([
      'kernel/src/tx/__write-door-probe__.ts:7 store p.vertices.x[v] = 1',
      'kernel/src/tx/__write-door-probe__.ts:8 store p.vertices.flags[v] |= 2',
      'kernel/src/tx/__write-door-probe__.ts:9 update p.halfEdges.next[v]++',
      'kernel/src/tx/__write-door-probe__.ts:10 store p.indexHome.face[l][v] = 3',
      'kernel/src/tx/__write-door-probe__.ts:12 store X[v] = 5',
      'kernel/src/tx/__write-door-probe__.ts:14 store y[v] = 6',
      'kernel/src/tx/__write-door-probe__.ts:15 store col[v] = 7',
      'kernel/src/tx/__write-door-probe__.ts:16 bulk p.roles.kind.fill(0)',
      'kernel/src/tx/__write-door-probe__.ts:17 store p.halfEdges.origin.subarray(0, 4)[1] = 8',
      'kernel/src/tx/__write-door-probe__.ts:18 passed helper(p.roles.entity, v)',
      'kernel/src/tx/__write-door-probe__.ts:19 replace p.roles.head.k0 = new Int32Array(4)',
      'layout/src/pipeline/__write-door-probe__.ts:3 store p.faces[l].stage[f] = 1',
    ]);
  }, 300_000);
});
