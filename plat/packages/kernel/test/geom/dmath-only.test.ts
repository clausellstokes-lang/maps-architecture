// M0-a-10: the geometry services read every transcendental through dmath (§6.5 (2), §3.4's regular fit: "cosines, sines
// and the phase come from dmath … so every host returns the same doubles") — the checker's line for this item: no
// trigonometric call outside dmath appears in src/geom. A source scan beside the lint's allowlist rule (M0-d-07).
import { readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const GEOM = fileURLToPath(new URL('../../src/geom/', import.meta.url));

describe('src/geom reads transcendentals through dmath only (§6.5 (2))', () => {
  const files = readdirSync(GEOM).filter((f) => f.endsWith('.ts'));

  it('scans every source file of the folder', () => {
    expect(files).toContain('regular-fit.ts');
    expect(files.length).toBeGreaterThanOrEqual(12);
  });

  it('names no Math transcendental or constant and no ** power; the trigonometry it needs is dmath\'s', () => {
    const banned = /Math\.(sin|cos|tan|asin|acos|atan|atan2|sinh|cosh|tanh|exp|expm1|log|log1p|log2|log10|pow|hypot|cbrt|random|PI|E|LN2|LN10|SQRT2|SQRT1_2)\b|\*\*/;
    for (const f of files) {
      const code = readFileSync(`${GEOM}${f}`, 'utf8')
        .split('\n')
        .filter((line) => !/^\s*(\/\/|\/\*|\*)/.test(line))
        .join('\n');
      expect(banned.test(code), f).toBe(false);
    }
    const uses = files.map((f) => readFileSync(`${GEOM}${f}`, 'utf8')).join('\n');
    for (const fn of ['dmath.cos', 'dmath.sin', 'dmath.atan2']) expect(uses).toContain(fn);
  });
});
