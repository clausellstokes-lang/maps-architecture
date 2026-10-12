// The copy table of `src/num/exact.ts` (C-0314; kernel-plan.md §1.0 N-1 – N-4): every private copy of a shared
// predicate or constant that a later consolidation round replaces by an import, with its reading, its coordinate
// convention and how to ask it, so equivalence.test.ts can hold each copy equal to exact.ts on the same inputs.
//
// A copy that a module exports is imported as it is. A copy the module keeps private is read from the module's source
// with the TypeScript compiler (the function, the helpers it calls, the constants it reads), transpiled and evaluated
// with the real `orient2d` and `ratio` — so the test judges the code in the tree, not a transcription of it. When a
// later round deletes a private copy, the site is CONSOLIDATED: its module must then import the shared name (from
// `num/exact.js`, or the name's named home), which `importsShared()` checks in place of the comparison (in
// equivalence.test.ts's copy-table test and its N-4 constant test).
//
// The same parsing reads a module's import and export declarations (`moduleLinks`, exact.test.ts's leaf ratchet on
// exact.ts) and a folder index's exported names (`exportedNames`, api-surface.test.ts's ratchet against API.md).
import { readFileSync } from 'node:fs';
import { posix } from 'node:path';
import ts from 'typescript';
import { closerThan as validateCloserThan } from '../../src/warp/validate.js';
import { insideRegion as heldInsideRegion } from '../../src/warp/held.js';
import { segmentCloserThan as placementCloserThan } from '../../src/insert/placement.js';
import { segmentsMeet as decimateMeet } from '../../src/insert/decimate.js';
import { comparePoints as facesComparePoints, insideRing as facesInsideRing, segmentsTouch as facesTouch } from '../../src/faces/common.js';
import { segmentsMeet as invariantsMeet } from '../../src/invariants/common.js';
import { insideRing as skeletonInsideRing, segmentsMeet as skeletonMeet } from '../../src/skeleton/prepare.js';
import { div as kerbDiv } from '../../src/arr/kerb.js';
import { LATTICE, orient2d, ratio } from '../../src/num/index.js';
import { HOT_PIXEL_CM } from '../../src/index/index.js';
import type { Plat } from '../../src/arena/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { pt } from './support.js';

const SRC = new URL('../../src/', import.meta.url);

/** A kernel source file's text (`file` relative to kernel/src). */
export function sourceOf(file: string): string {
  return readFileSync(new URL(file, SRC), 'utf8');
}

function parse(file: string): ts.SourceFile {
  return ts.createSourceFile(file, sourceOf(file), ts.ScriptTarget.ES2022, true);
}

/** One module-to-module link of a source file: a static import, a re-export (`export … from`), or a dynamic `import()`. */
export interface ModuleLink {
  readonly kind: 'import' | 'export' | 'dynamic';
  /** The module specifier as written (a dynamic import's non-literal specifier reads as ''). */
  readonly from: string;
  /** `import type …` / `export type … from` (the whole declaration erased at emit). */
  readonly typeOnly: boolean;
}

/** Every module the file links to, in source order. */
export function moduleLinks(file: string): ModuleLink[] {
  const sf = parse(file);
  const out: ModuleLink[] = [];
  const visit = (node: ts.Node): void => {
    if (ts.isImportDeclaration(node) && ts.isStringLiteral(node.moduleSpecifier)) {
      out.push({ kind: 'import', from: node.moduleSpecifier.text, typeOnly: node.importClause?.isTypeOnly ?? false });
    } else if (ts.isExportDeclaration(node) && node.moduleSpecifier !== undefined) {
      out.push({ kind: 'export', from: ts.isStringLiteral(node.moduleSpecifier) ? node.moduleSpecifier.text : '', typeOnly: node.isTypeOnly });
    } else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) {
      const arg = node.arguments[0];
      out.push({ kind: 'dynamic', from: arg !== undefined && ts.isStringLiteral(arg) ? arg.text : '', typeOnly: false });
    }
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}

/** Does the statement carry the `export` keyword? */
function exported(st: ts.Statement): boolean {
  return ts.canHaveModifiers(st) && (ts.getModifiers(st) ?? []).some((m) => m.kind === ts.SyntaxKind.ExportKeyword);
}

/**
 * Every name the module `file` (relative to kernel/src) exports, values and types alike, read from its source: its
 * exported declarations, its export specifiers (`export { a, type B } from …`, `export { a }`), and every name of each
 * module it re-exports whole (`export * from`, `export type * from`), followed by relative path.
 */
export function exportedNames(file: string): Set<string> {
  const out = new Set<string>();
  for (const st of parse(file).statements) {
    if (ts.isExportDeclaration(st)) {
      const from = st.moduleSpecifier !== undefined && ts.isStringLiteral(st.moduleSpecifier) ? st.moduleSpecifier.text : '';
      if (st.exportClause === undefined) {
        if (!from.startsWith('.')) throw new Error(`copies: ${file} re-exports the whole of '${from}', outside the kernel`);
        for (const n of exportedNames(posix.join(posix.dirname(file), from.replace(/\.js$/, '.ts')))) out.add(n);
      } else if (ts.isNamedExports(st.exportClause)) {
        for (const el of st.exportClause.elements) out.add(el.name.text);
      } else {
        out.add(st.exportClause.name.text);
      }
    } else if (exported(st)) {
      if (ts.isVariableStatement(st)) {
        for (const d of st.declarationList.declarations) if (ts.isIdentifier(d.name)) out.add(d.name.text);
      } else if (
        (ts.isFunctionDeclaration(st) || ts.isClassDeclaration(st) || ts.isInterfaceDeclaration(st) || ts.isTypeAliasDeclaration(st) || ts.isEnumDeclaration(st) || ts.isModuleDeclaration(st)) &&
        st.name !== undefined
      ) {
        out.add(st.name.text);
      }
    }
  }
  return out;
}

/** Does the module import `name` (from anywhere), or import anything from the shared module `num/exact.js`? */
export function importsShared(file: string, name: string): boolean {
  const sf = parse(file);
  for (const st of sf.statements) {
    if (!ts.isImportDeclaration(st) && !ts.isExportDeclaration(st)) continue;
    const from = st.moduleSpecifier !== undefined && ts.isStringLiteral(st.moduleSpecifier) ? st.moduleSpecifier.text : '';
    if (/(^|\/)num\/exact\.js$|^\.\/exact\.js$/.test(from)) return true;
    const clause = ts.isImportDeclaration(st) ? st.importClause?.namedBindings : st.exportClause;
    if (clause !== undefined && (ts.isNamedImports(clause) || ts.isNamedExports(clause))) {
      for (const el of clause.elements) if ((el.propertyName ?? el.name).text === name || el.name.text === name) return true;
    }
  }
  return false;
}

/** The top-level declaration of `name` in the module (a function or a const), or one nested in function `within`. */
function findDeclaration(sf: ts.SourceFile, name: string, within?: string): ts.Node | null {
  let found: ts.Node | null = null;
  const visit = (node: ts.Node, inside: boolean): void => {
    if (found !== null) return;
    if (ts.isFunctionDeclaration(node) && node.name?.text === within && within !== undefined) {
      ts.forEachChild(node, (c) => visit(c, true));
      return;
    }
    const scoped = within === undefined || inside;
    if (scoped && ts.isFunctionDeclaration(node) && node.name?.text === name && node.body !== undefined) found = node;
    else if (scoped && ts.isVariableStatement(node) && node.declarationList.declarations.some((d) => ts.isIdentifier(d.name) && d.name.text === name)) found = node;
    else ts.forEachChild(node, (c) => visit(c, inside));
  };
  ts.forEachChild(sf, (c) => visit(c, false));
  return found;
}

/** The declaration's text without its `export` keyword, transpiled to JavaScript. */
function transpiled(sf: ts.SourceFile, node: ts.Node): string {
  const text = node.getText(sf).replace(/^export\s+/, '');
  return ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } }).outputText;
}

/** The bindings a private copy may read: the kernel's own exact primitives and the hot pixel's radius. */
const BINDINGS: Readonly<Record<string, unknown>> = { orient2d, ratio, LATTICE, HOT_PIXEL_CM };

/**
 * The private function `name` of `file` (or the const arrow `name` declared inside function `within`), with the module's
 * `helpers` (functions or consts it reads) evaluated beside it; null when the module no longer declares it.
 */
export function privateCopy<F>(file: string, name: string, helpers: readonly string[] = [], within?: string): F | null {
  const sf = parse(file);
  const node = findDeclaration(sf, name, within);
  if (node === null) return null;
  const parts = helpers.map((h) => {
    const d = findDeclaration(sf, h);
    if (d === null) throw new Error(`copies: ${file} declares ${name} but not its helper ${h}`);
    return transpiled(sf, d);
  });
  const body = `${parts.join('\n')}\n${transpiled(sf, node)}\nreturn ${name};`;
  const make = new Function(...Object.keys(BINDINGS), body) as (...args: unknown[]) => F;
  return make(...Object.values(BINDINGS));
}

/** The value of the module-level const `name` of `file` (its initializer evaluated), or null when it is gone. */
export function constOf(file: string, name: string): number | null {
  const sf = parse(file);
  const node = findDeclaration(sf, name);
  if (node === null) return null;
  return privateCopy<number>(file, name);
}

// ---- arenas the arena-indexed copies read -----------------------------------------------------------------------------

/** The columns an arena-indexed copy reads. */
export type ArenaLike = Pick<Plat, 'vertices' | 'halfEdges'>;

/** One ring as every copy's signature wants it: its points, and its half-edge and vertex slots in an arena. */
export interface RingCase {
  readonly pts: readonly LatticePoint[];
  readonly p: ArenaLike;
  readonly halfEdges: readonly number[];
  readonly vertexIds: readonly number[];
}

/** A ring of lattice points as a tiny arena: vertex i is pts[i], half-edge 2i runs from vertex i to vertex i + 1. */
export function ringCase(pts: readonly LatticePoint[]): RingCase {
  const n = pts.length;
  const x = new Int32Array(n);
  const y = new Int32Array(n);
  const origin = new Int32Array(2 * n);
  pts.forEach((q, i) => {
    x[i] = q.x;
    y[i] = q.y;
    origin[2 * i] = i;
    origin[2 * i + 1] = (i + 1) % n;
  });
  const p = { vertices: { x, y }, halfEdges: { origin } } as unknown as ArenaLike;
  return { pts, p, halfEdges: pts.map((_, i) => 2 * i), vertexIds: pts.map((_, i) => i) };
}

// ---- the copy table ---------------------------------------------------------------------------------------------------

/** A site of the table: where the copy lives, and its normalised call (null once the module imports the shared one). */
export interface Site<F> {
  readonly id: string;
  readonly file: string;
  readonly symbol: string;
  readonly call: F | null;
}

type Closer = (px: number, py: number, ax: number, ay: number, bx: number, by: number, r: number) => boolean;
type Meet = (ax: number, ay: number, bx: number, by: number, cx: number, cy: number, dx: number, dy: number) => boolean;

/** N-1: "is p closer than r to the closed segment a–b" (the BigInt three-way `compareDist2` is another function). */
export const CLOSER_SITES: readonly Site<Closer>[] = [
  { id: 'N-1 placement', file: 'insert/placement.ts', symbol: 'segmentCloserThan', call: placementCloserThan },
  { id: 'N-1 tx', file: 'tx/tx.ts', symbol: 'closer', call: privateCopy<Closer>('tx/tx.ts', 'closer') },
  { id: 'N-1 warp', file: 'warp/validate.ts', symbol: 'closerThan', call: validateCloserThan },
];

/** N-2: "do the closed segments a–b and c–d share a point". */
export const MEET_SITES: readonly Site<Meet>[] = [
  { id: 'N-2 decimate', file: 'insert/decimate.ts', symbol: 'segmentsMeet', call: decimateMeet },
  { id: 'N-2 faces', file: 'faces/common.ts', symbol: 'segmentsTouch', call: facesTouch },
  { id: 'N-2 invariants', file: 'invariants/common.ts', symbol: 'segmentsMeet', call: invariantsMeet },
  { id: 'N-2 medial', file: 'medial/axis.ts', symbol: 'segmentsMeet', call: privateCopy<Meet>('medial/axis.ts', 'segmentsMeet') },
  {
    id: 'N-2 skeleton (point-typed adapter)',
    file: 'skeleton/prepare.ts',
    symbol: 'segmentsMeet',
    call: (ax, ay, bx, by, cx, cy, dx, dy) => skeletonMeet(pt(ax, ay), pt(bx, by), pt(cx, cy), pt(dx, dy)),
  },
];

/** N-3's readings: the boundary rule, the fill rule and the coordinate convention of a point-in-ring site. */
export type Reading =
  | 'open, even–odd, lattice'
  | 'open, even–odd, doubled'
  | 'closed, even–odd, lattice (fewer than three points: outside)'
  | 'closed, non-zero, lattice'
  | 'strict, even–odd, lattice, ring set'
  | 'strict, non-zero, lattice rings, any query, ring set'
  | 'winding number, lattice';

/** A point-in-ring site: its reading, and its call on a ring set (a single-ring site reads rings[0]) and a query. */
export interface RingSite extends Site<(rings: readonly RingCase[], qx: number, qy: number) => boolean | number> {
  readonly reading: Reading;
  /** Whether the site takes several rings at once. */
  readonly ringSet: boolean;
}

type ArenaRing = (p: ArenaLike, ring: readonly number[], qx: number, qy: number) => boolean;
type PointsRing = (pts: readonly LatticePoint[], qx: number, qy: number) => boolean;
type HexInside = (edges: readonly number[], q: { x: number; y: number }) => boolean;
type KerbInside = (rings: readonly (readonly LatticePoint[])[], q: { x: number; y: number }) => boolean;
type Winding = (px: number, py: number, xs: readonly number[], ys: readonly number[]) => number;
type SeedInside = (ring: readonly LatticePoint[], q: { x: number; y: number }) => boolean;

const queryInside = privateCopy<ArenaRing>('index/query.ts', 'insideRing');
const rewalkInside = privateCopy<ArenaRing>('insert/rewalk.ts', 'insideRing');
const snapInside = privateCopy<ArenaRing>('insert/snapRound.ts', 'insideDoubled');
const relevelInside = privateCopy<PointsRing>('tx/relevel.ts', 'insidePoints');
const hexInside = privateCopy<HexInside>('geom/hex-lattice.ts', 'strictlyInside');
const kerbInside = privateCopy<KerbInside>('arr/kerb.ts', 'strictlyInside', ['onSegment']);
const validateWinding = privateCopy<Winding>('warp/validate.ts', 'winding');
const seedInside = privateCopy<SeedInside>('invariants/whole.ts', 'inside', [], 'seedTilingProblems');

/** Wraps a copy that may be gone. */
function site<T extends unknown[]>(copy: ((...a: T) => boolean | number) | null, ask: (copy: (...a: T) => boolean | number, rings: readonly RingCase[], qx: number, qy: number) => boolean | number): RingSite['call'] {
  return copy === null ? null : (rings, qx, qy) => ask(copy, rings, qx, qy);
}

/** N-3: every crossing-number site, by reading. */
export const RING_SITES: readonly RingSite[] = [
  { id: 'N-3 index/query', file: 'index/query.ts', symbol: 'insideRing', reading: 'open, even–odd, lattice', ringSet: false, call: site(queryInside, (f, r, x, y) => f(r[0].p, r[0].vertexIds, x, y)) },
  { id: 'N-3 skeleton', file: 'skeleton/prepare.ts', symbol: 'insideRing', reading: 'open, even–odd, lattice', ringSet: false, call: (r, x, y) => skeletonInsideRing(r[0].pts, pt(x, y)) },
  { id: 'N-3 faces', file: 'faces/common.ts', symbol: 'insideRing', reading: 'open, even–odd, doubled', ringSet: false, call: (r, x, y) => facesInsideRing(r[0].p as Plat, r[0].halfEdges, x, y) },
  { id: 'N-3 rewalk', file: 'insert/rewalk.ts', symbol: 'insideRing', reading: 'open, even–odd, doubled', ringSet: false, call: site(rewalkInside, (f, r, x, y) => f(r[0].p, r[0].halfEdges, x, y)) },
  { id: 'N-3 snapRound', file: 'insert/snapRound.ts', symbol: 'insideDoubled', reading: 'open, even–odd, doubled', ringSet: false, call: site(snapInside, (f, r, x, y) => f(r[0].p, r[0].vertexIds, x, y)) },
  { id: 'N-3 relevel', file: 'tx/relevel.ts', symbol: 'insidePoints', reading: 'open, even–odd, doubled', ringSet: false, call: site(relevelInside, (f, r, x, y) => f(r[0].pts, x, y)) },
  { id: 'N-3 warp/held', file: 'warp/held.ts', symbol: 'insideRegion', reading: 'closed, even–odd, lattice (fewer than three points: outside)', ringSet: false, call: (r, x, y) => heldInsideRegion(r[0].pts, x, y) },
  { id: 'N-3 invariants/whole', file: 'invariants/whole.ts', symbol: 'inside', reading: 'closed, non-zero, lattice', ringSet: false, call: site(seedInside, (f, r, x, y) => f(r[0].pts, { x, y })) },
  {
    id: 'N-3 geom/hex-lattice',
    file: 'geom/hex-lattice.ts',
    symbol: 'strictlyInside',
    reading: 'strict, even–odd, lattice, ring set',
    ringSet: true,
    call: site(hexInside, (f, rings, x, y) => {
      const edges: number[] = [];
      for (const r of rings) r.pts.forEach((a, i) => { const b = r.pts[(i + 1) % r.pts.length]; edges.push(a.x, a.y, b.x, b.y); });
      return f(edges, { x, y });
    }),
  },
  { id: 'N-3 arr/kerb', file: 'arr/kerb.ts', symbol: 'strictlyInside', reading: 'strict, non-zero, lattice rings, any query, ring set', ringSet: true, call: site(kerbInside, (f, rings, x, y) => f(rings.map((r) => r.pts), { x, y })) },
  {
    id: 'N-3 warp/validate',
    file: 'warp/validate.ts',
    symbol: 'winding',
    reading: 'winding number, lattice',
    ringSet: false,
    call: site(validateWinding, (f, r, x, y) => f(x, y, r[0].pts.map((q) => q.x), r[0].pts.map((q) => q.y))),
  },
];

/** N-4: a constant spelt in a module, its shared home, and the value the home holds. */
export interface ConstSite {
  readonly id: string;
  readonly file: string;
  readonly name: string;
  /** Where the one definition lives (the module a consolidated site imports it from). */
  readonly home: string;
}

export const CONST_SITES: readonly ConstSite[] = [
  ...['insert/stretch.ts', 'insert/wedge.ts', 'tx/tx.ts', 'faces/fan.ts', 'invariants/batch.ts', 'warp/simplify.ts', 'geom/common.ts'].map((file) => ({ id: `N-4 PI ${file}`, file, name: 'PI', home: 'num/exact.ts PI' })),
  ...['insert/placement.ts', 'insert/stretch.ts', 'insert/crossings.ts', 'index/query.ts', 'warp/view.ts'].map((file) => ({ id: `N-4 BOX_RANGE ${file}`, file, name: 'BOX_RANGE', home: 'num/exact.ts BOX_RANGE' })),
  ...['arr/kerb.ts', 'arr/buffer.ts', 'arr/insetRing.ts', 'insert/wedge.ts'].map((file) => ({ id: `N-4 SCALE ${file}`, file, name: 'SCALE', home: 'num/exact.ts POW2_20' })),
  ...[['insert/placement.ts', 'HOT_PIXEL_SQ'], ['warp/warp.ts', 'HOT_PIXEL_SQ'], ['warp/validate.ts', 'HOT_PIXEL_SQ'], ['tx/relevel.ts', 'HOT_SQ']].map(([file, name]) => ({ id: `N-4 ${name} ${file}`, file, name, home: 'index/items.ts HOT_PIXEL_CM² (R5)' })),
  { id: 'N-4 MIN_EDGE warp/validate.ts', file: 'warp/validate.ts', name: 'MIN_EDGE', home: 'num/lattice.ts LATTICE.minEdgeCm' },
  { id: 'N-4 ATTRACT warp/warp.ts', file: 'warp/warp.ts', name: 'ATTRACT', home: 'num/lattice.ts LATTICE.attractCm' },
];

/** N-4's `div` sites: num ÷ den through ratio() with both terms scaled by 2²⁰, or null. */
export const DIV_SITES: readonly Site<(num: number, den: number) => number | null>[] = [
  { id: 'N-4 div arr/kerb', file: 'arr/kerb.ts', symbol: 'div', call: kerbDiv },
  { id: 'N-4 div arr/buffer', file: 'arr/buffer.ts', symbol: 'div', call: privateCopy('arr/buffer.ts', 'div', ['SCALE']) },
];

type Compare = (a: LatticePoint, b: LatticePoint) => number;

/** A comparator site: `signOnly` when the copy returns a coordinate difference, read by its sign as a sort reads it. */
export interface CompareSite extends Site<Compare> {
  readonly signOnly: boolean;
}

/** T-4 (kernel-plan.md §1.3): "two lattice points, y then x" — §3.3's vertex key as a comparator. */
export const COMPARE_SITES: readonly CompareSite[] = [
  { id: 'T-4 faces', file: 'faces/common.ts', symbol: 'comparePoints', signOnly: false, call: facesComparePoints },
  { id: 'T-4 relevel', file: 'tx/relevel.ts', symbol: 'pointCmp', signOnly: false, call: privateCopy<Compare>('tx/relevel.ts', 'pointCmp') },
  { id: 'T-4 tx (removed records\' order)', file: 'tx/tx.ts', symbol: 'pointCmp', signOnly: false, call: privateCopy<Compare>('tx/tx.ts', 'pointCmp', [], 'dirtyFaces') },
  { id: 'T-4 kerb', file: 'arr/kerb.ts', symbol: 'comparePoints', signOnly: true, call: privateCopy<Compare>('arr/kerb.ts', 'comparePoints') },
];
