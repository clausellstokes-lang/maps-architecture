// The mixer's lint test (item M0-d-01; §6.1 "Keys are mixed from structured components, never from strings … No string
// is built on the generation path", §14 "No string reaches the mixer; … a lint rejects a stream call whose concern is
// not a ConcernId"). Three holds:
//   (1) the mixer's source — src/rng/mixer.ts and src/rng/rng.ts — holds no string literal but its import specifiers,
//       no template, no call that makes a string, and no `+` with a string-typed operand (read with TypeScript's
//       checker over the kernel's own compiler options);
//   (2) no parameter of the mixer's entry points (streamKey, packInto, mixInto, Rng.stream) can carry a string: each
//       parameter's type, and every property of it, is a number, a branded number, a tuple or a typed array of numbers;
//   (3) the type system refuses a stream call whose concern or stage is not the registry's brand — the
//       `@ts-expect-error` lines below fail `corepack pnpm build` (tsc -b compiles this test) if a string or a plain
//       number were accepted — and at run time a string concern is refused.
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { CONCERNS, STAGES } from '../../src/registry/index.js';
import { seedKey, streamKey } from '../../src/rng/mixer.js';
import { createRng } from '../../src/rng/rng.js';
import type { ConcernId, StageId, StreamOpts } from '../../src/types/index.js';

const SRC = fileURLToPath(new URL('../../src/', import.meta.url));
const MIXER_FILES = [`${SRC}rng/mixer.ts`, `${SRC}rng/rng.ts`];
const ENTRY_POINTS: Record<string, string[]> = {
  [`${SRC}rng/mixer.ts`]: ['streamKey', 'packInto', 'mixInto'],
  [`${SRC}rng/rng.ts`]: ['stream'],
};
const STRING_MAKERS = new Set(['String', 'toString', 'join', 'concat', 'toFixed', 'toPrecision', 'padStart', 'padEnd', 'stringify', 'fromCharCode', 'repeat']);

function program(files: string[]): ts.Program {
  const options: ts.CompilerOptions = {
    strict: true,
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ES2022,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    lib: ['lib.es2022.d.ts'],
    types: [],
    resolveJsonModule: true,
    noEmit: true,
    skipLibCheck: true,
  };
  return ts.createProgram(files, options);
}

/** Every string-making construct in a source file, as "line: what". */
export function stringFindings(sf: ts.SourceFile, checker: ts.TypeChecker): string[] {
  const out: string[] = [];
  const at = (n: ts.Node): string => String(sf.getLineAndCharacterOfPosition(n.getStart(sf)).line + 1);
  const isStringish = (n: ts.Expression): boolean => {
    const t = checker.getTypeAtLocation(n);
    return (t.flags & (ts.TypeFlags.StringLike | ts.TypeFlags.Any | ts.TypeFlags.Unknown)) !== 0 || (t.isUnion() && t.types.some((u) => (u.flags & ts.TypeFlags.StringLike) !== 0));
  };
  const visit = (n: ts.Node): void => {
    if (ts.isImportDeclaration(n) || ts.isExportDeclaration(n)) return; // module specifiers name files, off the key path
    if (ts.isStringLiteral(n)) out.push(`${at(n)}: string literal ${n.getText(sf)}`);
    else if (ts.isNoSubstitutionTemplateLiteral(n) || ts.isTemplateExpression(n)) out.push(`${at(n)}: template`);
    else if (ts.isCallExpression(n)) {
      const callee = n.expression;
      const name = ts.isIdentifier(callee) ? callee.text : ts.isPropertyAccessExpression(callee) ? callee.name.text : '';
      if (STRING_MAKERS.has(name)) out.push(`${at(n)}: call ${name}()`);
    } else if (ts.isBinaryExpression(n) && (n.operatorToken.kind === ts.SyntaxKind.PlusToken || n.operatorToken.kind === ts.SyntaxKind.PlusEqualsToken)) {
      if (isStringish(n.left) || isStringish(n.right)) out.push(`${at(n)}: + with a string operand`);
    }
    ts.forEachChild(n, visit);
  };
  visit(sf);
  return out;
}

/** May a value of this type hold a string, anywhere in it? */
function canHoldString(t: ts.Type, checker: ts.TypeChecker, seen = new Set<ts.Type>()): boolean {
  if (seen.has(t)) return false;
  seen.add(t);
  if ((t.flags & (ts.TypeFlags.StringLike | ts.TypeFlags.Any | ts.TypeFlags.Unknown)) !== 0) return true;
  if (t.isUnionOrIntersection()) {
    // a branded number (number & { __brand }) is a number: its brand property is a phantom, never present at run time
    if (t.isIntersection() && t.types.some((u) => (u.flags & ts.TypeFlags.NumberLike) !== 0)) return false;
    return t.types.some((u) => canHoldString(u, checker, seen));
  }
  if ((t.flags & ts.TypeFlags.Object) !== 0) {
    const name = t.getSymbol()?.getName() ?? '';
    if (/^(Uint32Array|Int32Array|Uint8Array)$/.test(name)) return false;
    if (checker.isTupleType(t) || checker.isArrayType(t) || name === 'ArrayLike') {
      const args = checker.getTypeArguments(t as ts.TypeReference);
      const index = t.getNumberIndexType();
      return [...args, ...(index ? [index] : [])].some((a) => canHoldString(a, checker, seen));
    }
    return checker.getPropertiesOfType(t).some((p) => canHoldString(checker.getTypeOfSymbol(p), checker, seen));
  }
  return false;
}

describe('the mixer: no string reaches it (§6.1, §14)', () => {
  const prog = program(MIXER_FILES);
  const checker = prog.getTypeChecker();

  it('compiles cleanly for the checker that reads it', () => {
    const diags = ts.getPreEmitDiagnostics(prog).filter((d) => d.file !== undefined && MIXER_FILES.includes(d.file.fileName));
    expect(diags.map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'))).toEqual([]);
  }, 120_000);

  for (const file of MIXER_FILES) {
    it(`${file.slice(SRC.length)} holds no string literal, template, string-making call or string +`, () => {
      const sf = prog.getSourceFile(file);
      expect(sf).toBeDefined();
      expect(stringFindings(sf as ts.SourceFile, checker)).toEqual([]);
    }, 120_000);
  }

  it('finds a planted string in a mixer-shaped source (the scan can fail)', () => {
    const planted = ts.createSourceFile(
      `${SRC}rng/zz-planted.ts`,
      [
        "import { fmix32 } from '../hash/index.js';",
        'export function key(stage: number, name: string): number {',
        "  const label = 'S' + stage;",
        '  const t = `${name}/${stage}`;',
        '  return fmix32(String(stage).length + label.length + t.length + name.length) + [stage].join().length;',
        '}',
      ].join('\n'),
      ts.ScriptTarget.ES2022,
      true,
    );
    const host = ts.createCompilerHost({ noEmit: true });
    const real = host.getSourceFile;
    host.getSourceFile = (name, lang) => (name === planted.fileName ? planted : real(name, lang));
    const p2 = ts.createProgram([planted.fileName], { noEmit: true, strict: true, target: ts.ScriptTarget.ES2022, types: [] }, host);
    const found = stringFindings(p2.getSourceFile(planted.fileName) as ts.SourceFile, p2.getTypeChecker());
    expect(found).toEqual(['3: + with a string operand', "3: string literal 'S'", '4: template', '5: call String()', '5: call join()']);
  }, 120_000);

  it("gives the mixer's entry points only number-bearing parameters", () => {
    for (const file of MIXER_FILES) {
      const sf = prog.getSourceFile(file) as ts.SourceFile;
      const wanted = ENTRY_POINTS[file];
      const seen: string[] = [];
      const visit = (n: ts.Node): void => {
        if ((ts.isFunctionDeclaration(n) || ts.isMethodDeclaration(n)) && n.name !== undefined && ts.isIdentifier(n.name) && wanted.includes(n.name.text) && n.body !== undefined) {
          seen.push(n.name.text);
          for (const p of n.parameters) {
            const t = checker.getTypeAtLocation(p);
            expect(canHoldString(t, checker), `${n.name.text}(${p.name.getText(sf)}: ${checker.typeToString(t)})`).toBe(false);
          }
        }
        ts.forEachChild(n, visit);
      };
      visit(sf);
      expect(seen.sort()).toEqual([...wanted].sort());
    }
  }, 120_000);
});

describe('a stream call whose concern or stage is not the registry brand is refused', () => {
  const EK = seedKey(1);
  const O: StreamOpts = { reroll: 0, attempt: 0, epoch: 0, salt: 0 };

  it('by the type system (tsc -b compiles these lines; each must fail to type-check)', () => {
    const rng = createRng();
    const attempt = (f: () => unknown): boolean => {
      try {
        f();
        return true;
      } catch {
        return false;
      }
    };
    // @ts-expect-error a concern given by name: a string is never a ConcernId
    expect(attempt(() => rng.stream(EK, STAGES.S8, 'cut.stop', O))).toBe(false);
    // @ts-expect-error a plain number is not a ConcernId: only the generated constants are
    expect(attempt(() => rng.stream(EK, STAGES.S8, 52, O))).toBe(true);
    // @ts-expect-error a plain number is not a StageId on Rng.stream either (C-0143 (3); checks/M0-d-01.md F-10)
    expect(attempt(() => rng.stream(EK, 11, CONCERNS['cut.stop'], O))).toBe(true);
    // @ts-expect-error a stage given by name on Rng.stream
    expect(attempt(() => rng.stream(EK, 'S8', CONCERNS['cut.stop'], O))).toBe(false);
    // @ts-expect-error a stage given by name
    expect(attempt(() => streamKey(EK, 'S8', CONCERNS['cut.stop'], O))).toBe(false);
    // @ts-expect-error a plain number is not a StageId
    expect(attempt(() => streamKey(EK, 11, CONCERNS['cut.stop'], O))).toBe(true);
    // @ts-expect-error an entity key given as text
    expect(attempt(() => streamKey('plot:7kq2', STAGES.S8, CONCERNS['cut.stop'], O))).toBe(false);
  }, 120_000);

  it('and at run time: a string concern, stage or component is refused, never coerced', () => {
    const rng = createRng();
    expect(() => rng.stream(EK, STAGES.S8, 'cut.stop' as unknown as ConcernId, O)).toThrow(/concern/);
    expect(() => rng.stream(EK, 'S8' as unknown as StageId, CONCERNS['cut.stop'], O)).toThrow(/stage/);
    expect(() => rng.stream(EK, STAGES.S8, '52' as unknown as ConcernId, O)).toThrow(/concern/);
    expect(() => rng.stream(EK, STAGES.S8, CONCERNS['cut.stop'], { ...O, epoch: '0' as unknown as number })).toThrow(/epoch/);
    expect(() => rng.stream(['1', '2', '3', '4'] as unknown as typeof EK, STAGES.S8, CONCERNS['cut.stop'], O)).toThrow(/entity key/);
    expect(rng.streams).toBe(0);
  });
});
