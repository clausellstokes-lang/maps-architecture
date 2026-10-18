// M0-a-01: the kernel's shared types (C-0112) — type tests in the tsd style, checked by `corepack pnpm build` (tsc -b
// compiles this file: an `expectTypeOf` that fails or an `@ts-expect-error` that finds no error is a build error) and
// run by vitest: the ref forms carry no slot; GeomRef is exactly the five forms; LatticePoint's coordinates carry the
// Cm brand; StreamOpts has §14's four fields; kernel/src/types has no runtime export (a grep test and the empty module
// namespace).
import { readFileSync, readdirSync } from 'node:fs';
import ts from 'typescript';
import { describe, expect, expectTypeOf, it } from 'vitest';
import { snap } from '../../src/num/index.js';
import type {
  ChainProfile,
  ChainRef,
  Cdeg,
  Cm,
  CmArray,
  ConcernId,
  EdgeSetRef,
  FaceRef,
  GeomRef,
  Handle,
  Id,
  Invariant,
  LatticePoint,
  Layer,
  Level,
  M,
  Order,
  PlatKey,
  Point,
  PointCm,
  Polygon,
  PolygonCm,
  RoleKey,
  RoleName,
  Seed,
  StageId,
  StreamOpts,
  StretchRef,
  VecCm,
  VertexRef,
  VertexSig,
} from '../../src/types/index.js';

const TYPES_DIR = new URL('../../src/types/', import.meta.url);

describe('the kernel\'s shared types (C-0112)', () => {
  it('the ref forms carry no slot: exactly §2.2\'s fields, entity ids and lattice points only', () => {
    expectTypeOf<keyof FaceRef>().toEqualTypeOf<'owner' | 'level'>();
    expectTypeOf<FaceRef>().toEqualTypeOf<{ owner: Id; level: Level }>();
    expectTypeOf<ChainRef>().toEqualTypeOf<{ role: RoleName; entity: Id }>();
    expectTypeOf<EdgeSetRef>().toEqualTypeOf<{ role: RoleName; entity: Id; ordinal?: number }>();
    expectTypeOf<VertexRef>().toEqualTypeOf<{ role: RoleName; entity: Id; ordinal?: number }>();
    expectTypeOf<StretchRef>().toEqualTypeOf<{ chain: ChainRef; from: VertexRef | LatticePoint; to: VertexRef | LatticePoint }>();
    expectTypeOf<Id>().toEqualTypeOf<string>(); // an address id, never a number a slot could be
    expectTypeOf<RoleName>().toEqualTypeOf<string>();
    // a slot-shaped field on a ref is refused
    // @ts-expect-error — no `face` slot on a FaceRef
    const withSlot: FaceRef = { owner: 'plot:1', level: 3, face: 17 };
    void withSlot;
  });

  it('GeomRef is exactly the five forms', () => {
    expectTypeOf<GeomRef>().toEqualTypeOf<FaceRef | ChainRef | EdgeSetRef | VertexRef | StretchRef>();
    const refs: GeomRef[] = [
      { owner: 'district:a', level: 1 },
      { role: 'way', entity: 'way:b' },
      { role: 'frontage', entity: 'plot:c', ordinal: 0 },
      { chain: { role: 'way', entity: 'way:b' }, from: { role: 'junction', entity: 'junction:d' }, to: { x: 1 as Cm, y: 2 as Cm } },
    ];
    expect(refs).toHaveLength(4);
    // @ts-expect-error — a bare lattice point is no GeomRef
    const point: GeomRef = { x: 1 as Cm, y: 2 as Cm };
    void point;
  });

  it('LatticePoint\'s coordinates carry the Cm brand: a plain number is no coordinate; snap mints them', () => {
    expectTypeOf<LatticePoint['x']>().toEqualTypeOf<Cm>();
    expectTypeOf<LatticePoint['y']>().toEqualTypeOf<Cm>();
    expectTypeOf<Cm>().toMatchTypeOf<number>();
    expectTypeOf<number>().not.toMatchTypeOf<Cm>();
    // @ts-expect-error — plain numbers are not Cm
    const raw: LatticePoint = { x: 1, y: 2 };
    void raw;
    const r = snap(1.4, -2.6);
    if (r.ok) expectTypeOf(r.value).toEqualTypeOf<LatticePoint>();
    expect(r).toEqual({ ok: true, value: { x: 1, y: -3 }, warnings: [] });
    // the brands are distinct units
    expectTypeOf<M>().not.toMatchTypeOf<Cm>();
    expectTypeOf<Cdeg>().not.toMatchTypeOf<Cm>();
    expectTypeOf<Cm>().not.toMatchTypeOf<M>();
    expectTypeOf<CmArray>().toMatchTypeOf<Int32Array>();
    expectTypeOf<Int32Array>().not.toMatchTypeOf<CmArray>();
    // one point shape, three names (§2.8); a ring and a polygon with holes
    expectTypeOf<PointCm>().toEqualTypeOf<LatticePoint>();
    expectTypeOf<Point>().toEqualTypeOf<LatticePoint>();
    expectTypeOf<VecCm>().toEqualTypeOf<LatticePoint>();
    expectTypeOf<Polygon>().toEqualTypeOf<LatticePoint[]>();
    expectTypeOf<PolygonCm>().toEqualTypeOf<LatticePoint[][]>();
  });

  it('StreamOpts has §14\'s four fields', () => {
    expectTypeOf<StreamOpts>().toEqualTypeOf<{ reroll: number; attempt: number; epoch: number; salt: number }>();
    expectTypeOf<keyof StreamOpts>().toEqualTypeOf<'reroll' | 'attempt' | 'epoch' | 'salt'>();
  });

  it('the ids, keys, registry ids, invariant row and profile are §2.1, §2.2, §2.9, §5.3, §6.1 and §14\'s', () => {
    expectTypeOf<Level>().toEqualTypeOf<0 | 1 | 2 | 3 | 4>();
    expectTypeOf<Layer>().toEqualTypeOf<'underground' | 'ground' | 'sky'>();
    expectTypeOf<PlatKey>().toEqualTypeOf<{ layer: Layer; part: number }>();
    expectTypeOf<Seed>().toEqualTypeOf<number>();
    expectTypeOf<Handle>().toEqualTypeOf<number>();
    expectTypeOf<RoleKey>().toEqualTypeOf<{ role: RoleName; entity: Id; ordinal: number }>();
    expectTypeOf<VertexSig>().toEqualTypeOf<{ v: RoleKey[]; e: RoleKey[] }>();
    // the two registry ids are branded u16s, distinct from each other and from a plain number
    expectTypeOf<ConcernId>().toMatchTypeOf<number>();
    expectTypeOf<StageId>().toMatchTypeOf<number>();
    expectTypeOf<number>().not.toMatchTypeOf<ConcernId>();
    expectTypeOf<ConcernId>().not.toMatchTypeOf<StageId>();
    expectTypeOf<StageId>().not.toMatchTypeOf<ConcernId>();
    expectTypeOf<Invariant>().toEqualTypeOf<{
      name: string;
      scope: 'batch' | 'stage' | 'save' | 'load' | 'ci';
      class: 'hard' | 'soft';
      kind: 'classFloor' | 'check';
      faceClass?: string;
      check?: string;
    }>();
    expectTypeOf<ChainProfile>().toEqualTypeOf<{ knotRole: RoleName; values: number[]; interp: 'linear' | 'step' }>();
    expectTypeOf<ChainProfile<Order>['values']>().toEqualTypeOf<{ seq: number; step: number }[]>();
    // @ts-expect-error — a profile's values are numbers, strings or Orders only
    const bad: ChainProfile<boolean> = { knotRole: 'width_knot', values: [true], interp: 'step' };
    void bad;
  });

  it('kernel/src/types has no runtime export (a grep test over every file, and its transpiled output)', () => {
    const files = readdirSync(TYPES_DIR).filter((f) => /\.(ts|tsx|mts|cts|js|mjs|cjs)$/.test(f));
    expect(files.sort()).toEqual(['ids.ts', 'index.ts', 'refs.ts', 'rows.ts', 'units.ts']);
    const RUNTIME = /^\s*(export\s+(default|const|let|var|function|async|class|enum|namespace|module|declare|\{|\*|import)|export\s*=|(const|let|var|function|class|enum)\s)/;
    for (const f of files) {
      const text = readFileSync(new URL(f, TYPES_DIR), 'utf8');
      const code = text.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').filter((l) => !/^\s*\/\//.test(l));
      for (const line of code) {
        expect(RUNTIME.test(line), `${f}: ${line}`).toBe(false);
        if (/^\s*import\b/.test(line)) expect(line, f).toMatch(/^\s*import\s+type\b/);
        if (/^\s*export\b/.test(line)) expect(line, f).toMatch(/^\s*export\s+(type|interface)\b/);
      }
      // the transpiled module holds no statement but the empty export
      const out = ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } }).outputText;
      const statements = out.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').trim();
      expect(statements === '' || statements === 'export {};', `${f} emits: ${statements}`).toBe(true);
    }
  });

  it('kernel/src/types has no runtime export (its module namespace is empty)', async () => {
    const ns: object = await import('../../src/types/index.js');
    expect(Reflect.ownKeys(ns).filter((k) => k !== Symbol.toStringTag)).toEqual([]);
  });
});
