// M0-e-03 under M0-e-01's one door (§2.3 Heights; test/terrain/range.test.ts, "no source of @plat/site writes an
// Int32Array's cells but range.ts"): no source of the water stage (src/water/) writes an Int32Array's cells — no
// element assignment or ++/−− on one, no set / fill / copyWithin / sort / reverse on one — found by the same
// type-checked scan, run over src/water/ alone. range.test.ts is a source scan, not an import, so `vitest related` on
// a water file never selects it; this file sits in the item's own test folder, so every NEAR run of the item holds the
// rule (integration-g12's B-1: water/outfalls.ts's per-cell body index was an Int32Array). A planted probe file, read
// through the same compiler host, shows the scan finds each kind of write it looks for.
import { readdirSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';

const WATER_SRC = fileURLToPath(new URL('../../src/water/', import.meta.url));
const PROBE = join(WATER_SRC, '__one-door-probe__.ts');
const PROBE_TEXT = [
  'const a = new Int32Array(4).fill(-1);',
  'a[0] = 1;',
  'a[1] += 2;',
  'a[2]++;',
  'a.set([1], 3);',
  'const b: number[] = [0];',
  'b[0] = 1;',
  'const c = Int32Array.from(b);',
  'export const sum = a[0] + c[0];',
].join('\n');

function sources(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .filter((e) => e.isFile() && /\.(ts|mts|cts)$/.test(e.name))
    .map((e) => join(dir, e.name))
    .sort();
}

/** The Int32Array cell writes in `files` (and the probe, when `withProbe`), as `<file>: <target>` lines. */
function int32Writes(files: string[], withProbe: boolean): { found: string[]; diags: string[] } {
  const options: ts.CompilerOptions = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ES2022,
    moduleResolution: ts.ModuleResolutionKind.Bundler,
    lib: ['lib.es2022.d.ts'],
    types: [],
    strict: true,
    noEmit: true,
    skipLibCheck: true,
    resolveJsonModule: true,
    customConditions: ['plat-source'],
  };
  const host = ts.createCompilerHost(options);
  if (withProbe) {
    const { getSourceFile, fileExists, readFile } = host;
    host.getSourceFile = (name, lang, ...rest) => (name === PROBE ? ts.createSourceFile(name, PROBE_TEXT, lang) : getSourceFile.call(host, name, lang, ...rest));
    host.fileExists = (name) => name === PROBE || fileExists.call(host, name);
    host.readFile = (name) => (name === PROBE ? PROBE_TEXT : readFile.call(host, name));
  }
  const roots = withProbe ? [...files, PROBE] : files;
  const program = ts.createProgram(roots, options, host);
  const checker = program.getTypeChecker();
  const isInt32Type = (t: ts.Type): boolean => (t.isUnion() || t.isIntersection() ? t.types.some(isInt32Type) : t.getSymbol()?.getName() === 'Int32Array');
  const isInt32 = (e: ts.Expression): boolean => isInt32Type(checker.getTypeAtLocation(e));
  const found: string[] = [];
  const diags: string[] = [];
  for (const file of roots) {
    const sf = program.getSourceFile(file);
    if (sf === undefined) throw new Error(`not in the program: ${file}`);
    for (const d of [...program.getSyntacticDiagnostics(sf), ...program.getSemanticDiagnostics(sf)]) diags.push(ts.flattenDiagnosticMessageText(d.messageText, '\n'));
    const rel = relative(WATER_SRC, file);
    const visit = (n: ts.Node): void => {
      let target: ts.Expression | null = null;
      if (ts.isBinaryExpression(n) && n.operatorToken.kind >= ts.SyntaxKind.FirstAssignment && n.operatorToken.kind <= ts.SyntaxKind.LastAssignment) target = n.left;
      else if ((ts.isPrefixUnaryExpression(n) || ts.isPostfixUnaryExpression(n)) && (n.operator === ts.SyntaxKind.PlusPlusToken || n.operator === ts.SyntaxKind.MinusMinusToken)) target = n.operand;
      if (target !== null && ts.isElementAccessExpression(target) && isInt32(target.expression)) found.push(`${rel}: ${target.getText(sf)}`);
      if (ts.isCallExpression(n) && ts.isPropertyAccessExpression(n.expression) && ['set', 'fill', 'copyWithin', 'sort', 'reverse'].includes(n.expression.name.text) && isInt32(n.expression.expression)) {
        found.push(`${rel}: ${n.expression.getText(sf)}()`);
      }
      ts.forEachChild(n, visit);
    };
    visit(sf);
  }
  return { found, diags };
}

describe('the water stage under the one door (M0-e-01, range.test.ts)', () => {
  it('no source of src/water/ writes an Int32Array\'s cells (a type-checked scan; outfalls.ts among them)', () => {
    const files = sources(WATER_SRC);
    expect(files.some((f) => f.endsWith('outfalls.ts'))).toBe(true);
    const { found, diags } = int32Writes(files, false);
    expect(diags).toEqual([]);
    expect(found).toEqual([]);
  }, 60_000);

  it('the scan finds every kind of write it looks for (a planted probe; a plain array\'s writes and Int32Array.from are not writes)', () => {
    const { found, diags } = int32Writes([], true);
    expect(diags).toEqual([]);
    expect(found).toEqual([
      '__one-door-probe__.ts: new Int32Array(4).fill()',
      '__one-door-probe__.ts: a[0]',
      '__one-door-probe__.ts: a[1]',
      '__one-door-probe__.ts: a[2]',
      '__one-door-probe__.ts: a.set()',
    ]);
  }, 60_000);
});
