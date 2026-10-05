// M0-a-07: the checker's grep, as a test (M0-work.json's checker line: "the contact decision reads orient2d only (no
// parameter-space epsilon)"): the contact decision's modules (common.ts, split.ts) hold no floating tolerance — no
// epsilon, no 1e-… literal, no division — and decide on orient2d; and every sort in src/faces names a slot-free key
// (§3.3: no output depends on slot numbers). The ± 1 lattice-unit fixtures are split.test.ts's.
import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';

const DIR = join(import.meta.dirname, '../../src/faces');
const read = (f: string): string => readFileSync(join(DIR, f), 'utf8');
/** The code of a module without its comments and string literals (a small scanner: no regex literal in these files). */
function code(f: string): string {
  const src = read(f);
  let out = '';
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    const d = src[i + 1];
    if (c === '/' && d === '/') {
      while (i < src.length && src[i] !== '\n') i++;
      out += '\n';
    } else if (c === '/' && d === '*') {
      i += 2;
      while (i < src.length && !(src[i] === '*' && src[i + 1] === '/')) {
        if (src[i] === '\n') out += '\n';
        i++;
      }
      i++;
    } else if (c === "'" || c === '"' || c === '`') {
      i++;
      while (i < src.length && src[i] !== c) i += src[i] === '\\' ? 2 : 1;
      out += "''";
    } else out += c;
  }
  return out;
}

describe('src/faces: the contact decision is exact', () => {
  it('the folder holds the item\'s modules', () => {
    expect(readdirSync(DIR).filter((f) => f.endsWith('.ts')).sort()).toEqual(['claim.ts', 'common.ts', 'fan.ts', 'index.ts', 'merge.ts', 'ops.ts', 'split.ts']);
  });

  for (const f of ['common.ts', 'split.ts']) {
    it(`${f}: no epsilon, no float literal, no division; orient2d decides`, () => {
      const src = code(f);
      expect(src).not.toMatch(/eps(ilon)?\b/i);
      expect(src).not.toMatch(/\d+(\.\d+)?e-\d+/i);
      expect(src).not.toMatch(/\d\.\d/);
      expect(src).not.toMatch(/[^/*]\/[^/*=]/);
    });
  }

  it('common.ts decides contacts with orient2d (and the insertion\'s exact distance tests)', () => {
    const src = code('common.ts');
    expect(src).toMatch(/orient2d\(/);
    expect(src).toMatch(/withinSegment\(/);
    expect(src).toMatch(/passesWithin\(/);
  });

  for (const f of readdirSync(DIR).filter((x) => x.endsWith('.ts'))) {
    it(`${f}: each sort names a slot-free key`, () => {
      const lines = code(f).split('\n');
      lines.forEach((line, i) => {
        if (!line.includes('.sort(')) return;
        expect(line, `${f}:${i + 1}`).toMatch(/compareVertices|compareFaceKeys|comparePairs|byAngle/);
      });
    });
  }
});
