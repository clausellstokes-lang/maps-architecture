// M0-e-01: the height range check (§2.3 Heights, GEO-15; §3.1's W_HEIGHT_CLAMPED) — the writer's contract (rounded to the
// centimetre, clamped to ± the declared limit, every clamp counted, never wrapping, a NaN no height) and the checker's
// two source facts: the range check is the one door for height writes in @plat/site (no Int32Array cell is written
// anywhere else — a type-checked scan of the package's sources), and @plat/site imports no vendored library (its
// imports are its own files and @plat/kernel, @plat/model, @plat/tables; the noise is the kernel's, C-0065).
import { readdirSync, readFileSync } from 'node:fs';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import fc from 'fast-check';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import { heightWriter, INT32_HEIGHT_MAX } from '../../src/terrain/index.js';

const SITE_SRC = fileURLToPath(new URL('../../src/', import.meta.url));

function sources(dir: string, out: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) sources(p, out);
    else if (/\.(ts|mts|cts)$/.test(e.name)) out.push(p);
  }
  return out.sort();
}

describe('the range check (heightWriter)', () => {
  it('rounds to the centimetre and stores a value within ± the limit unchanged, uncounted', () => {
    fc.assert(
      fc.property(fc.double({ min: -1_000_000.49, max: 1_000_000.49, noNaN: true }), (v) => {
        const h = new Int32Array(1);
        const w = heightWriter(h, 1_000_000);
        w.write(0, v);
        expect(h[0]).toBe(Math.round(v) === 0 ? 0 : Math.round(v));
        expect(w.clamped).toBe(0);
        expect(w.warnings()).toEqual([]);
      }),
    );
  });

  it('clamps a value beyond the limit to ± the limit and counts it — 40 000 m, 2³¹ cm and ±∞ included, never wrapping', () => {
    const h = new Int32Array(7);
    const w = heightWriter(h, 1_000_000);
    const values = [4_000_000, -4_000_000, 2 ** 31, -(2 ** 33), Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY, 1_000_000.4];
    values.forEach((v, i) => w.write(i, v));
    expect([...h]).toEqual([1_000_000, -1_000_000, 1_000_000, -1_000_000, 1_000_000, -1_000_000, 1_000_000]);
    expect(w.clamped).toBe(6);
    expect(w.warnings()).toEqual([{ code: 'W_HEIGHT_CLAMPED', count: 6 }]);
    // What the range check prevents: an Int16 cell stores 40 000 as −25 536, an Int32 cell wraps 2³¹ to −2³¹.
    expect(new Int16Array([40_000])[0]).toBe(-25_536);
    expect(new Int32Array([2 ** 31])[0]).toBe(-(2 ** 31));
  });

  it('the limit is inclusive: ± the limit stores as itself, uncounted; one centimetre beyond clamps and counts', () => {
    const h = new Int32Array(6);
    const w = heightWriter(h, 1_000_000);
    [1_000_000, -1_000_000, 1_000_001, -1_000_001, 1_000_000.5, -1_000_000.5].forEach((v, i) => w.write(i, v));
    expect([...h]).toEqual([1_000_000, -1_000_000, 1_000_000, -1_000_000, 1_000_000, -1_000_000]);
    // Math.round takes 1 000 000.5 up (beyond, counted) and −1 000 000.5 up to −1 000 000 (inside, not counted).
    expect(w.clamped).toBe(3);
  });

  it('a NaN is no height: stored as 0 and counted', () => {
    const h = new Int32Array([5]);
    const w = heightWriter(h, 100);
    w.write(0, Number.NaN);
    expect(h[0]).toBe(0);
    expect(w.warnings()).toEqual([{ code: 'W_HEIGHT_CLAMPED', count: 1 }]);
  });

  it('writeRow writes each value as write does, and counts the same', () => {
    fc.assert(
      fc.property(fc.array(fc.double({ min: -3e6, max: 3e6, noNaN: true }), { maxLength: 40 }), fc.nat(10), (vals, start) => {
        const a = new Int32Array(60);
        const b = new Int32Array(60);
        const wa = heightWriter(a, 1_000_000);
        const wb = heightWriter(b, 1_000_000);
        wa.writeRow(start, Float64Array.from(vals), vals.length);
        vals.forEach((v, i) => wb.write(start + i, v));
        expect([...a]).toEqual([...b]);
        expect(wa.clamped).toBe(wb.clamped);
      }),
    );
  });

  it('refuses a cell outside the raster and a limit that is not an integer in 1 … 2³¹ − 1', () => {
    const w = heightWriter(new Int32Array(3), 10);
    expect(() => w.write(3, 0)).toThrow(RangeError);
    expect(() => w.write(-1, 0)).toThrow(RangeError);
    expect(() => w.write(1.5, 0)).toThrow(RangeError);
    expect(() => w.writeRow(2, new Float64Array(2), 2)).toThrow(RangeError);
    expect(() => w.writeRow(0, new Float64Array(1), 2)).toThrow(RangeError);
    for (const lim of [0, -5, 2.5, INT32_HEIGHT_MAX + 1, Number.NaN]) expect(() => heightWriter(new Int32Array(1), lim)).toThrow(RangeError);
    expect(INT32_HEIGHT_MAX).toBe(2 ** 31 - 1);
  });
});

describe('the one door (the checker\'s source facts)', () => {
  it('no source of @plat/site writes an Int32Array\'s cells but range.ts (a type-checked scan)', () => {
    const files = sources(SITE_SRC);
    const program = ts.createProgram(files, {
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
    });
    // The scanned files type-check clean, so every receiver's type is resolved (an unresolved import would read as any
    // and be reported on the importing file). Other packages' diagnostics are their own items' (a seat's work in
    // progress elsewhere must not fail this scan).
    const diags = files.flatMap((f) => {
      const sf = program.getSourceFile(f);
      return sf === undefined ? [] : [...program.getSyntacticDiagnostics(sf), ...program.getSemanticDiagnostics(sf)];
    });
    expect(diags.map((d) => ts.flattenDiagnosticMessageText(d.messageText, '\n'))).toEqual([]);
    const checker = program.getTypeChecker();
    const isInt32Type = (t: ts.Type): boolean => (t.isUnion() || t.isIntersection() ? t.types.some(isInt32Type) : t.getSymbol()?.getName() === 'Int32Array');
    const isInt32 = (e: ts.Expression): boolean => isInt32Type(checker.getTypeAtLocation(e));
    const found: string[] = [];
    for (const file of files) {
      const sf = program.getSourceFile(file);
      if (sf === undefined) throw new Error(`not in the program: ${file}`);
      const rel = relative(SITE_SRC, file);
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
    expect(found.filter((f) => !f.startsWith('terrain/range.ts:'))).toEqual([]);
    expect(found.filter((f) => f.startsWith('terrain/range.ts:')).length).toBeGreaterThanOrEqual(2);
    expect(files.some((f) => f.endsWith(join('terrain', 'heightfield.ts')))).toBe(true);
  }, 60_000);

  it('@plat/site imports no vendored library: only its own files and @plat/kernel, @plat/model, @plat/tables', () => {
    const bad: string[] = [];
    for (const file of sources(SITE_SRC)) {
      const text = readFileSync(file, 'utf8');
      for (const m of text.matchAll(/(?:^|[\s;])(?:import|export)\b[^'"]*?\bfrom\s*['"]([^'"]+)['"]|import\(\s*['"]([^'"]+)['"]\s*\)/gm)) {
        const spec = m[1] ?? m[2];
        if (!(spec.startsWith('./') || spec.startsWith('../') || ['@plat/kernel', '@plat/model', '@plat/tables'].includes(spec))) bad.push(`${relative(SITE_SRC, file)}: ${spec}`);
      }
    }
    expect(bad).toEqual([]);
    const pkg = JSON.parse(readFileSync(join(SITE_SRC, '..', 'package.json'), 'utf8')) as { dependencies?: Record<string, string> };
    expect(pkg.dependencies).toEqual({ '@plat/kernel': 'workspace:*', '@plat/model': 'workspace:*', '@plat/tables': 'workspace:*' });
  });
});
