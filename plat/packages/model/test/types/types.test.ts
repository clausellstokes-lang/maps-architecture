// M0-m-01: @plat/model's types — the re-export test of C-0112 (every type of C-0112's kernel list is reachable from
// @plat/model under its design name, a reflection test over the list through the TypeScript checker, and
// model/src declares none of them a second time; the façade's ArenaKey, TransientKey and CarryMap too), the identity and lifecycle shapes of §2.8, the staged brand,
// types/ and records/ have no runtime export, and in types/, records/, schema/ and stage/ a type has one import path
// (another folder's module through its index) and no comment narrates a round. Type assertions are checked by
// `corepack pnpm build` (tsc -b compiles this file) and the file runs under vitest.
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, expectTypeOf, it } from 'vitest';
import type * as K from '@plat/kernel';
import type * as Mdl from '../../src/index.js';
import type { NotBuilt, RaisedWayRecord } from '../../src/index.js';
import { DESIGN_WORDS, NARRATION, NARRATION_CAUGHT, narrationIn } from './narration.js';

const MODEL_SRC = fileURLToPath(new URL('../../src/', import.meta.url));
const MODEL_TEST = fileURLToPath(new URL('../', import.meta.url));
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
/** C-0112 (3)'s three, declared by the kernel's façade (C-0220 (11)): the arena keys and the carry map. */
const FACADE = ['ArenaKey', 'TransientKey', 'CarryMap'] as const;

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

let cachedProgram: ts.Program | undefined;
/** One program for the reflection tests of this file (a whole-program build costs seconds). */
function sharedProgram(): ts.Program {
  cachedProgram ??= modelProgram();
  return cachedProgram;
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
    expectTypeOf<Mdl.ArenaKey>().toEqualTypeOf<K.ArenaKey>();
    expectTypeOf<Mdl.TransientKey>().toEqualTypeOf<K.TransientKey>();
    expectTypeOf<Mdl.CarryMap>().toEqualTypeOf<K.CarryMap>();
  });

  it('reflection over the list: each name is exported by model/src/index.ts and resolves to its declaration in kernel/src/types or kernel/src/hash', () => {
    const program = sharedProgram();
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
  }, 60_000); // a whole-program type check of model/src and the kernel source it reads: seconds, more on a loaded machine

  it('the façade\'s three (C-0112 (3), C-0220 (11)): ArenaKey, TransientKey and CarryMap are exported by model/src/index.ts and resolve to their declarations in kernel/src/facade', () => {
    const checker = sharedProgram().getTypeChecker();
    const index = sharedProgram().getSourceFile(`${MODEL_SRC}index.ts`) as ts.SourceFile;
    const exports = new Map(checker.getExportsOfModule(checker.getSymbolAtLocation(index) as ts.Symbol).map((s) => [s.getName(), s]));
    for (const name of FACADE) {
      const sym = exports.get(name);
      expect(sym, `${name} exported by @plat/model`).toBeDefined();
      const target = (sym as ts.Symbol).flags & ts.SymbolFlags.Alias ? checker.getAliasedSymbol(sym as ts.Symbol) : sym;
      const files = (target?.declarations ?? []).map((d) => d.getSourceFile().fileName);
      expect(files, `${name}'s declarations`).toEqual([`${KERNEL_SRC}facade/types.ts`]);
    }
  }, 60_000);

  it('model/src declares none of them a second time (every type alias, interface, class and enum declaration in model/src)', () => {
    const names = new Set<string>([...C0112, ...PREREQUISITES, ...FACADE]);
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
    // §2.8's event words, each pinned
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

/**
 * Every module specifier a file names, with its line: import and export declarations, `import x = require('…')`,
 * an inline type query `import('…').T` in any type position, and a dynamic `import('…')` — wherever it sits in the
 * tree. A specifier that is no string literal is reported as `<computed>`.
 */
function moduleSpecifiers(sf: ts.SourceFile): { spec: string; line: number }[] {
  const out: { spec: string; line: number }[] = [];
  const add = (node: ts.Node, lit: ts.Node | undefined): void => {
    const spec = lit !== undefined && ts.isStringLiteralLike(lit) ? lit.text : '<computed>';
    out.push({ spec, line: sf.getLineAndCharacterOfPosition(node.getStart(sf)).line + 1 });
  };
  const visit = (node: ts.Node): void => {
    if ((ts.isImportDeclaration(node) || ts.isExportDeclaration(node)) && node.moduleSpecifier !== undefined) add(node, node.moduleSpecifier);
    else if (ts.isImportEqualsDeclaration(node) && ts.isExternalModuleReference(node.moduleReference)) add(node, node.moduleReference.expression);
    else if (ts.isImportTypeNode(node)) add(node, ts.isLiteralTypeNode(node.argument) ? node.argument.literal : undefined);
    else if (ts.isCallExpression(node) && node.expression.kind === ts.SyntaxKind.ImportKeyword) add(node, node.arguments[0]);
    ts.forEachChild(node, visit);
  };
  visit(sf);
  return out;
}

/** The 1-based lines a file's comments cover (every leading and trailing comment of every token, once). */
function commentLines(sf: ts.SourceFile): Set<number> {
  const text = sf.getFullText();
  const seen = new Set<number>();
  const lines = new Set<number>();
  const take = (ranges: readonly ts.CommentRange[] | undefined): void => {
    for (const r of ranges ?? []) {
      if (seen.has(r.pos)) continue;
      seen.add(r.pos);
      const a = sf.getLineAndCharacterOfPosition(r.pos).line;
      const b = sf.getLineAndCharacterOfPosition(r.end).line;
      for (let l = a; l <= b; l += 1) lines.add(l + 1);
    }
  };
  const visit = (node: ts.Node): void => {
    take(ts.getLeadingCommentRanges(text, node.getFullStart()));
    take(ts.getTrailingCommentRanges(text, node.getEnd()));
    ts.forEachChild(node, visit);
  };
  visit(sf);
  take(ts.getLeadingCommentRanges(text, sf.endOfFileToken.getFullStart()));
  return lines;
}

describe('model/src/{types,records,schema,stage}: one import path per type, and comments that state the design', () => {
  const FOLDERS = ['types', 'records', 'schema', 'stage'] as const;

  it('a module of another folder is imported through that folder\'s index; a sibling by its file; a package by its name', () => {
    const seen: string[] = [];
    for (const folder of FOLDERS) {
      for (const f of sourceFiles(`${MODEL_SRC}${folder}/`)) {
        const sf = ts.createSourceFile(f, readFileSync(f, 'utf8'), ts.ScriptTarget.ES2022, true);
        for (const { spec, line } of moduleSpecifiers(sf)) {
          seen.push(spec);
          const ok = spec.startsWith('../') ? /^\.\.\/(types|records|schema|stage)\/index\.js$/.test(spec) : spec.startsWith('./') || spec === '@plat/kernel';
          expect(ok, `${f.slice(MODEL_SRC.length)}:${line} imports '${spec}'`).toBe(true);
        }
      }
    }
    expect(seen).toContain('../types/index.js');
    expect(seen).toContain('../records/index.js');
  });

  it('the walk sees every form of module specifier: declarations, import = require, an inline type query and a dynamic import', () => {
    const probe = [
      "import type { A } from '../types/index.js';",
      "export type { B } from './sibling.js';",
      "import C = require('../records/walls.js');",
      "type D = { life: import('../types/identity.js').Lifecycle; deep: Array<import('../schema/order.js').T> };",
      "export const e = async (): Promise<unknown> => import('../stage/vocab.js');",
      'export const f = async (p: string): Promise<unknown> => import(p);',
    ].join('\n');
    const sf = ts.createSourceFile('probe.ts', probe, ts.ScriptTarget.ES2022, true);
    expect(moduleSpecifiers(sf)).toEqual([
      { spec: '../types/index.js', line: 1 },
      { spec: './sibling.js', line: 2 },
      { spec: '../records/walls.js', line: 3 },
      { spec: '../types/identity.js', line: 4 },
      { spec: '../schema/order.js', line: 4 },
      { spec: '../stage/vocab.js', line: 5 },
      { spec: '<computed>', line: 6 },
    ]);
  });

  it('no comment narrates a round, a check or a landing (the history is in docs/build/checks/)', () => {
    // every line of src and test in the four folders; the pattern list's own file by its comments only (its code holds
    // the patterns and the probes they exist for)
    const LIST = `${MODEL_TEST}types/narration.ts`;
    const scanned: string[] = [];
    for (const folder of FOLDERS) {
      for (const f of [...sourceFiles(`${MODEL_SRC}${folder}/`), ...sourceFiles(`${MODEL_TEST}${folder}/`)]) {
        const text = readFileSync(f, 'utf8');
        const only = f === LIST ? commentLines(ts.createSourceFile(f, text, ts.ScriptTarget.ES2022, true)) : null;
        const name = f.slice(MODEL_SRC.length - 4);
        scanned.push(name);
        text.split('\n').forEach((line, i) => {
          if (only !== null && !only.has(i + 1)) return;
          expect(narrationIn(line), `${name}:${i + 1}: ${line}`).toEqual([]);
        });
      }
    }
    for (const f of ['src/stage/decl.ts', 'src/records/site.ts', 'test/types/types.test.ts', 'test/types/narration.ts', 'test/records/records.test.ts', 'test/schema/schema.test.ts', 'test/stage/stage.test.ts']) {
      expect(scanned, f).toContain(f);
    }
  });

  it('the pattern list catches each probe, every phrase the first deny-list caught and the phrasings that escaped it, and passes the design\'s own words', () => {
    for (const p of NARRATION) expect(p.re.test(p.probe), `${p.name}: ${p.probe}`).toBe(true);
    for (const line of NARRATION_CAUGHT) expect(narrationIn(line), line).not.toEqual([]);
    for (const line of DESIGN_WORDS) expect(narrationIn(line), line).toEqual([]);
  });
});
