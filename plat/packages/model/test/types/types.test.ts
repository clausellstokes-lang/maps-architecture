// M0-m-01: @plat/model's types — the re-export test of C-0112 (every type of C-0112's kernel list is reachable from
// @plat/model under its design name, a reflection test over the list through the TypeScript checker, and
// model/src declares none of them a second time), the identity and lifecycle shapes of §2.8, the staged brand, and
// types/ and records/ have no runtime export. Type assertions are checked by `corepack pnpm build` (tsc -b compiles
// this file) and the file runs under vitest.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, expectTypeOf, it } from 'vitest';
import type * as K from '@plat/kernel';
import type * as Mdl from '../../src/index.js';
import type { NotBuilt, RaisedWayRecord } from '../../src/index.js';

const MODEL_SRC = fileURLToPath(new URL('../../src/', import.meta.url));
const KERNEL_SRC = fileURLToPath(new URL('../../../kernel/src/', import.meta.url));

/** C-0112 (1) and (2)'s list, with C-0134 (9)'s four prerequisites: the kernel's types @plat/model re-exports. */
const C0112 = [
  'Cm',
  'M',
  'Cdeg',
  'CmArray',
  'Id',
  'Handle',
  'Level',
  'PlatKey',
  'Seed',
  'LatticePoint',
  'PointCm',
  'Point',
  'VecCm',
  'Polygon',
  'PolygonCm',
  'VertexSig',
  'FaceRef',
  'ChainRef',
  'EdgeSetRef',
  'VertexRef',
  'StretchRef',
  'GeomRef',
  'ChainProfile',
  'Invariant',
  'ConcernId',
  'StageId',
  'StreamOpts',
  'Hash64',
  'Hash128',
  'LineageHash',
] as const;
const PREREQUISITES = ['Layer', 'RoleName', 'RoleKey', 'Order'] as const;

/** Every code file under a folder, absolute, sorted. */
function sourceFiles(dir: string): string[] {
  const out: string[] = [];
  for (const name of readdirSync(dir).sort()) {
    const abs = `${dir}${name}`;
    if (statSync(abs).isDirectory()) out.push(...sourceFiles(`${abs}/`));
    else if (/\.ts$/.test(name) && !/\.d\.ts$/.test(name)) out.push(abs);
  }
  return out;
}

/** A program over model/src/index.ts under the package's own options, resolving @plat/kernel to its source. */
function modelProgram(): ts.Program {
  const configPath = fileURLToPath(new URL('../../tsconfig.json', import.meta.url));
  const parsed = ts.getParsedCommandLineOfConfigFile(configPath, {}, {
    ...ts.sys,
    onUnRecoverableConfigFileDiagnostic: (d) => {
      throw new Error(ts.flattenDiagnosticMessageText(d.messageText, '\n'));
    },
  });
  if (!parsed) throw new Error('model/tsconfig.json did not parse');
  const options: ts.CompilerOptions = {
    ...parsed.options,
    composite: false,
    declaration: false,
    declarationMap: false,
    emitDeclarationOnly: false,
    noEmit: true,
    customConditions: ['plat-source'],
  };
  return ts.createProgram({ rootNames: [`${MODEL_SRC}index.ts`], options });
}

describe('the re-export of the kernel\'s types (C-0112)', () => {
  it('every C-0112 type is @plat/model\'s under its design name and is the kernel\'s very type', () => {
    expectTypeOf<Mdl.Cm>().toEqualTypeOf<K.Cm>();
    expectTypeOf<Mdl.M>().toEqualTypeOf<K.M>();
    expectTypeOf<Mdl.Cdeg>().toEqualTypeOf<K.Cdeg>();
    expectTypeOf<Mdl.CmArray>().toEqualTypeOf<K.CmArray>();
    expectTypeOf<Mdl.Id>().toEqualTypeOf<K.Id>();
    expectTypeOf<Mdl.Handle>().toEqualTypeOf<K.Handle>();
    expectTypeOf<Mdl.Level>().toEqualTypeOf<K.Level>();
    expectTypeOf<Mdl.PlatKey>().toEqualTypeOf<K.PlatKey>();
    expectTypeOf<Mdl.Seed>().toEqualTypeOf<K.Seed>();
    expectTypeOf<Mdl.LatticePoint>().toEqualTypeOf<K.LatticePoint>();
    expectTypeOf<Mdl.PointCm>().toEqualTypeOf<K.PointCm>();
    expectTypeOf<Mdl.Point>().toEqualTypeOf<K.Point>();
    expectTypeOf<Mdl.VecCm>().toEqualTypeOf<K.VecCm>();
    expectTypeOf<Mdl.Polygon>().toEqualTypeOf<K.Polygon>();
    expectTypeOf<Mdl.PolygonCm>().toEqualTypeOf<K.PolygonCm>();
    expectTypeOf<Mdl.VertexSig>().toEqualTypeOf<K.VertexSig>();
    expectTypeOf<Mdl.FaceRef>().toEqualTypeOf<K.FaceRef>();
    expectTypeOf<Mdl.ChainRef>().toEqualTypeOf<K.ChainRef>();
    expectTypeOf<Mdl.EdgeSetRef>().toEqualTypeOf<K.EdgeSetRef>();
    expectTypeOf<Mdl.VertexRef>().toEqualTypeOf<K.VertexRef>();
    expectTypeOf<Mdl.StretchRef>().toEqualTypeOf<K.StretchRef>();
    expectTypeOf<Mdl.GeomRef>().toEqualTypeOf<K.GeomRef>();
    expectTypeOf<Mdl.ChainProfile>().toEqualTypeOf<K.ChainProfile>();
    expectTypeOf<Mdl.ChainProfile<string>>().toEqualTypeOf<K.ChainProfile<string>>();
    expectTypeOf<Mdl.Invariant>().toEqualTypeOf<K.Invariant>();
    expectTypeOf<Mdl.ConcernId>().toEqualTypeOf<K.ConcernId>();
    expectTypeOf<Mdl.StageId>().toEqualTypeOf<K.StageId>();
    expectTypeOf<Mdl.StreamOpts>().toEqualTypeOf<K.StreamOpts>();
    expectTypeOf<Mdl.Hash64>().toEqualTypeOf<K.Hash64>();
    expectTypeOf<Mdl.Hash128>().toEqualTypeOf<K.Hash128>();
    expectTypeOf<Mdl.LineageHash>().toEqualTypeOf<K.LineageHash>();
    expectTypeOf<Mdl.Layer>().toEqualTypeOf<K.Layer>();
    expectTypeOf<Mdl.RoleName>().toEqualTypeOf<K.RoleName>();
    expectTypeOf<Mdl.RoleKey>().toEqualTypeOf<K.RoleKey>();
    expectTypeOf<Mdl.Order>().toEqualTypeOf<K.Order>();
  });

  it('reflection over the list: each name is exported by model/src/index.ts and resolves to its declaration in kernel/src/types or kernel/src/hash', () => {
    const program = modelProgram();
    const checker = program.getTypeChecker();
    const index = program.getSourceFile(`${MODEL_SRC}index.ts`);
    expect(index).toBeDefined();
    const moduleSymbol = checker.getSymbolAtLocation(index as ts.SourceFile);
    expect(moduleSymbol).toBeDefined();
    const exports = new Map(checker.getExportsOfModule(moduleSymbol as ts.Symbol).map((s) => [s.getName(), s]));
    for (const name of [...C0112, ...PREREQUISITES]) {
      const sym = exports.get(name);
      expect(sym, `${name} exported by @plat/model`).toBeDefined();
      const target = (sym as ts.Symbol).flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(sym as ts.Symbol) : sym;
      const files = (target?.declarations ?? []).map((d) => d.getSourceFile().fileName);
      expect(files.length, `${name} has a declaration`).toBeGreaterThan(0);
      const home = name.startsWith('Hash') || name === 'LineageHash' ? `${KERNEL_SRC}hash/` : `${KERNEL_SRC}types/`;
      for (const f of files) expect(f.startsWith(home), `${name} declared at ${f}, not under ${home}`).toBe(true);
    }
    // the program compiles clean under the package's own options
    const diagnostics = ts.getPreEmitDiagnostics(program).map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'));
    expect(diagnostics).toEqual([]);
  });

  it('model/src declares none of them a second time (every type alias, interface, class and enum declaration in model/src)', () => {
    const names = new Set<string>([...C0112, ...PREREQUISITES]);
    const files = sourceFiles(MODEL_SRC);
    expect(files.length).toBeGreaterThan(10);
    const redeclared: string[] = [];
    for (const f of files) {
      const sf = ts.createSourceFile(f, readFileSync(f, 'utf8'), ts.ScriptTarget.ES2022, true);
      const visit = (node: ts.Node): void => {
        if (
          (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node) || ts.isClassDeclaration(node) || ts.isEnumDeclaration(node)) &&
          node.name !== undefined &&
          names.has(node.name.text)
        ) {
          redeclared.push(`${f}: ${node.name.text}`);
        }
        ts.forEachChild(node, visit);
      };
      visit(sf);
    }
    expect(redeclared).toEqual([]);
  });
});

describe('identity and lifecycle (§2.8)', () => {
  it('Identity, Lifecycle and LifecycleFlags carry §2.8\'s fields', () => {
    expectTypeOf<Mdl.Identity>().toEqualTypeOf<{
      id: Mdl.Id;
      kind: string;
      parent?: Mdl.Id;
      key: Mdl.PlatKey;
      lineage: Mdl.LineageHash;
      reroll: number;
      dossier?: Mdl.DossierRef;
    }>();
    expectTypeOf<Mdl.DossierRef>().toEqualTypeOf<{ element: string; version?: string }>();
    expectTypeOf<Mdl.Lifecycle>().toEqualTypeOf<{
      existence: Mdl.Existence;
      flags: Mdl.LifecycleFlags;
      since: { epoch: number; seq: number };
    }>();
    expectTypeOf<Mdl.LifecycleFlags>().toEqualTypeOf<{
      locked: boolean;
      pinned: boolean;
      edited: boolean;
      assigned: boolean;
      lockedPaths?: string[];
      editedPaths?: string[];
    }>();
    expectTypeOf<Mdl.Existence>().toEqualTypeOf<
      'generated' | 'built' | 'altered' | 'converted' | 'abandoned' | 'decayed' | 'ruined' | 'cleared' | 'reused' | 'demolished'
    >();
    expectTypeOf<Mdl.Tombstone>().toEqualTypeOf<{
      id: Mdl.Id;
      kind: string;
      lineage: Mdl.LineageHash;
      supersededBy?: Mdl.Id;
      seq: number;
      last: Uint8Array;
    }>();
    expectTypeOf<keyof Mdl.LifecycleEvent>().toEqualTypeOf<'id' | 'seq' | 'epoch' | 'kind' | 'cause' | 'detail'>();
    expectTypeOf<Mdl.LifecycleEvent['cause']>().toEqualTypeOf<Mdl.EditRef | Mdl.RuleRef | 'generation' | `convert:${string}`>();
    // §2.8's event words, each pinned (the check's N-2)
    expectTypeOf<Mdl.LifecycleEvent['kind']>().toEqualTypeOf<
      | Mdl.Existence
      | 'lock'
      | 'unlock'
      | 'pin'
      | 'unpin'
      | 'edit'
      | 'assign'
      | 'unassign'
      | 'reparent'
      | 'carry'
      | 'supersede'
      | 'resurrect'
      | 'open'
      | 'close'
      | 'relocate'
      | 'mutate'
      | 'reject'
      | 'lapse'
      | 'place'
      | 'relet'
    >();
    // a lifecycle kind is an existence state or one of §2.8's event words
    const ev: Mdl.LifecycleEvent = { id: 'plot:a', seq: 0, epoch: 0, kind: 'generated', cause: 'generation' };
    const conv: Mdl.LifecycleEvent = { id: 'water:b', seq: 3, epoch: 1, kind: 'converted', cause: 'convert:siltReach' };
    // @ts-expect-error — 'destroyed' is no existence state and no event word
    const bad: Mdl.LifecycleEvent = { id: 'plot:a', seq: 0, epoch: 0, kind: 'destroyed', cause: 'generation' };
    expect([ev.kind, conv.cause, bad.seq]).toEqual(['generated', 'convert:siltReach', 0]);
  });

  it('a staged type is carried by no value (NotBuilt)', () => {
    expectTypeOf<RaisedWayRecord>().toEqualTypeOf<NotBuilt<'M3a'>>();
    // @ts-expect-error — no M0 value is a raised way's record
    const raised: RaisedWayRecord = {};
    void raised;
  });
});

describe('types/ and records/ have no runtime export', () => {
  for (const folder of ['types', 'records'] as const) {
    it(`model/src/${folder}: a grep test over every file, and its transpiled output`, () => {
      const dir = `${MODEL_SRC}${folder}/`;
      const files = readdirSync(dir).filter((f) => /\.(ts|tsx|mts|cts|js|mjs|cjs)$/.test(f));
      expect(files.length).toBeGreaterThan(1);
      const RUNTIME = /^\s*(export\s+(default|const|let|var|function|async|class|enum|namespace|module|declare|\{|\*|import)|export\s*=|(const|let|var|function|class|enum)\s)/;
      for (const f of files) {
        const text = readFileSync(`${dir}${f}`, 'utf8');
        const code = text.replace(/\/\*[\s\S]*?\*\//g, '').split('\n').filter((l) => !/^\s*\/\//.test(l));
        for (const line of code) {
          expect(RUNTIME.test(line), `${f}: ${line}`).toBe(false);
          if (/^\s*import\b/.test(line)) expect(line, f).toMatch(/^\s*import\s+type\b/);
        }
        const out = ts.transpileModule(text, { compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 } }).outputText;
        const statements = out.replace(/\/\/.*$/gm, '').replace(/\/\*[\s\S]*?\*\//g, '').trim();
        expect(statements === '' || statements === 'export {};', `${f} emits: ${statements}`).toBe(true);
      }
    });

    it(`model/src/${folder}: its module namespace is empty`, async () => {
      const ns: object = folder === 'types' ? await import('../../src/types/index.js') : await import('../../src/records/index.js');
      expect(Reflect.ownKeys(ns).filter((k) => k !== Symbol.toStringTag)).toEqual([]);
    });
  }
});
