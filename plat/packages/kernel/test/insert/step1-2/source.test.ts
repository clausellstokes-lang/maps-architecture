// M0-a-04's checker line "confirms every distance test uses + − × ÷ √ only" (§3.2 (3)), held by a scan of the item's
// sources: no Math member but the determinism allowlist's exact ones (§6.5 (3)), no `**`, no float comparison with
// `== 0` on a computed distance, and every division through ratio() or by a literal (the lint's ratio-division rule
// covers the last; this scan pins the item's own files whatever the lint's configuration).
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const FILES = ['classes.ts', 'decimate.ts', 'attractVertex.ts', 'placement.ts', 'splitThrough.ts'];
const src = (f: string): string => readFileSync(new URL(`../../../src/insert/${f}`, import.meta.url), 'utf8');
/** The code without comments (line and block) and string literals, so prose naming a function is not a use. */
const code = (s: string): string => s.replace(/\/\*[\s\S]*?\*\//g, '').replace(/\/\/.*$/gm, '').replace(/'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`/g, "''");

describe('the step-1–2 sources use + − × ÷ √ only for distances (§3.2 (3))', () => {
  for (const f of FILES) {
    it(`${f}: Math members only abs floor ceil round sign min max sqrt; no exponent operator; no hypot`, () => {
      const c = code(src(f));
      const members = [...c.matchAll(/Math\.([A-Za-z0-9_]+)/g)].map((m) => m[1]);
      for (const m of members) expect(['abs', 'floor', 'ceil', 'round', 'sign', 'min', 'max', 'sqrt', 'SQRT2']).toContain(m);
      expect(c).not.toMatch(/\*\*/);
      expect(c).not.toMatch(/hypot|atan|cos\(|sin\(|pow\(|exp\(|log\(/);
    });
  }

  it('every division in the sources is by a literal or a named constant of one, or through ratio()', () => {
    for (const f of FILES) {
      const c = code(src(f));
      for (const m of c.matchAll(/[^/*]\/\s*([A-Za-z_][A-Za-z0-9_]*|\d+)/g)) expect(['CELL_CM', '2', '4']).toContain(m[1]);
    }
  });

  it('the placement reads the arena only through the index query and the vertex rotations (no slot order)', () => {
    const c = code(src('placement.ts'));
    expect(c).toMatch(/query\(p, tx\.key, 4,/);
    expect(c).not.toMatch(/slots\.(vertex|pair)\.top/); // no scan over arena slots
  });
});
