// M0-a-11, hardening round S7 (Q180 (a); N-s6-3, N-s6c-2): the engine's spike class. §3.8 *Numeric contract*: "Events
// closer than 1 mm in offset time and 1 cm in position are coalesced into one multi-edge event". Lawful faces — sharp
// spikes and stars, multi-feature rectangles, holed slabs, two pipeline district faces — whose strict and tolerant
// readings resolved such events apart (two collapses of a spike's tip, a split taken alone beside the collapse at its
// edge's end, a split within 1 cm of the split edge's end vertex), so the validator rejected the finished graph on every
// use that runs. The engine's third reading (`coalescing`) applies the sentence at the event; each face of the class is
// pinned here as a fixture that validates for every use it failed on, its whole result byte for byte. The faces of the
// classes §3.8's text does not decide (a near-straight vertex born off its line, a fast reflex vertex meeting another
// beyond 1 cm, a collapse spread over just more than 1 cm; reported to the session) are pinned at their outcome on the
// round's tree — the reader's typed downgrade with cause `validator` — so that a later repair is seen. The rings come
// from `spike-class.json` (its `what` names the sources; the diagnosis is in checks/M0-a-11-notes.md 'Hardening round
// S7'). The validator stays the net: nothing here is made to pass by loosening it.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { skeleton, validateSkeleton, type SkeletonUse, type ValidatorCheck } from '../../src/skeleton/index.js';
import type { LatticePoint } from '../../src/types/index.js';
import { pt } from './support.js';

interface Face {
  name: string;
  class: string;
  uses: SkeletonUse[];
  rings: number[][];
}
interface Fixed extends Face {
  digest: Partial<Record<SkeletonUse, string>>;
}
interface Reported extends Face {
  cause: Partial<Record<SkeletonUse, { check: ValidatorCheck; detail: string }>>;
}

const DATA: { fixed: Fixed[]; reported: Reported[] } = JSON.parse(readFileSync(new URL('./spike-class.json', import.meta.url), 'utf8'));

function ringsOf(flat: readonly number[][]): LatticePoint[][] {
  return flat.map((r) => {
    const ring: LatticePoint[] = [];
    for (let k = 0; k < r.length; k += 2) ring.push(pt(r[k], r[k + 1]));
    return ring;
  });
}

/** The result's JSON with −0 marked and its SHA-256's first 16 hex digits (golden.test.ts's digest). */
function digestOf(v: unknown): string {
  const text = JSON.stringify(v, (_k, x: unknown) => (typeof x === 'number' && Object.is(x, -0) ? '-0' : x));
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

describe('the spike class: events within 1 mm and 1 cm coalesced at the event validate (§3.8; Q180 (a), hardening round S7)', () => {
  it('the fixture holds the diagnosed faces: 41 of class (1) and 4 reported', () => {
    expect(DATA.fixed.length).toBe(41);
    expect(DATA.reported.length).toBe(4);
    const by = (fs: Face[]): Record<string, number> => fs.reduce<Record<string, number>>((a, f) => ({ ...a, [f.class]: (a[f.class] ?? 0) + 1 }), {});
    expect(by(DATA.fixed)).toEqual({ '(1a)': 27, '(1b)': 12, '(1c)': 2 });
    expect(by(DATA.reported)).toEqual({ '(2)': 2, '(3)': 1, '(4)': 1 });
  });

  it.each(DATA.fixed.map((f) => [f.name, f.class, f] as const))('%s %s: validates for every use it failed on, byte for byte', (_name, _cls, f) => {
    const rings = ringsOf(f.rings);
    let spine: unknown = null;
    for (const use of f.uses) {
      const r = skeleton(rings, use);
      if (!r.ok || r.value.kind !== 'skeleton') throw new Error(`${use}: expected a validated skeleton, got ${JSON.stringify(r).slice(0, 300)}`);
      expect(r.warnings).toEqual([]);
      expect(validateSkeleton(r.value).ok).toBe(true);
      expect(digestOf(r)).toBe(f.digest[use]);
      if (use === 'spine') spine = r.value;
      if (use === 'regions') expect({ ...r.value, use: 'spine' }).toEqual(spine);
    }
    // a face whose sharpest corner lies in [1°, 5°) is still refused for roof without running (§3.8's 5°)
    if (!f.uses.includes('roof')) {
      const r = skeleton(rings, 'roof');
      expect(r.ok && r.value.kind === 'downgrade' && r.value.cause).toMatchObject({ code: 'contract', refusal: 'sharpCorner' });
    }
  });

  it.each(DATA.reported.map((f) => [f.name, f.class, f] as const))('%s %s (reported): today’s outcome, the reader’s typed downgrade with cause validator', (_name, _cls, f) => {
    const rings = ringsOf(f.rings);
    for (const use of f.uses) {
      const r = skeleton(rings, use);
      if (!r.ok || r.value.kind !== 'downgrade') throw new Error(`${use}: expected a downgrade, got ${JSON.stringify(r).slice(0, 300)}`);
      expect(r.value.cause).toEqual({ code: 'validator', ...f.cause[use] });
      expect(r.value.events).toBeGreaterThan(0);
      expect(r.warnings).toEqual([{ code: 'W_DOWNGRADE', count: 1 }]);
    }
  });
});
