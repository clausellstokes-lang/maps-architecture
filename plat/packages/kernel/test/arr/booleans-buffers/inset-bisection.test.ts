// M0-a-08's insetRing past the inradius when a trial of its bisection is refused (§3.7 *Insets*: "an inset larger than
// the inradius returns E_DEGENERATE (detail `collapsed`, carrying the last non-empty distance)"; §3.11; the refusal
// census's R-16, KI-7; C-0365). The bisection's trials pass through the scratch arrangement, and §3.7 names emptiness
// only as the collapse past the inradius, so a trial the arrangement refuses is no empty inset: its typed refusal is
// insetRing's result, code and detail unchanged, and `lastCm` is never lowered by it. No drawn case meets such a
// refusal (0 in 1.2 × 10⁵, C-0231), so it is planted here through the overlay's seam: `overlayRegion` of winding.ts
// (the one function insetRing reaches the arrangement through) refuses every ring under 2 m tall while the plant is
// armed, and passes every other call to the real one.
import { afterEach, describe, expect, it, vi } from 'vitest';
import { insetRing, type InsetCollapsed } from '../../../src/arr/index.js';
import type { LatticePoint } from '../../../src/types/index.js';
import { arenaFace, rect } from './support.js';

const plant = vi.hoisted(() => ({ armed: false, refused: 0 }));

/** The planted refusal: insertChain's no-route refusal, as the overlay passes it on. */
const REFUSAL = { ok: false, code: 'E_INVARIANT', detail: 'insert: no route from (0, 0) to (10, 0) keeps clearance (§3.10) within the fidelity bound (N-43)' } as const;

vi.mock('../../../src/arr/winding.js', async (importOriginal) => {
  const real = await importOriginal<typeof import('../../../src/arr/winding.js')>();
  const tall = (ring: readonly LatticePoint[]): number => Math.max(...ring.map((p) => p.y)) - Math.min(...ring.map((p) => p.y));
  return {
    ...real,
    overlayRegion: (...args: Parameters<typeof real.overlayRegion>): ReturnType<typeof real.overlayRegion> => {
      const [operands] = args;
      if (plant.armed && operands.length === 1 && operands[0].length === 1 && tall(operands[0][0]) < 200) {
        plant.refused += 1;
        return { ...REFUSAL };
      }
      return real.overlayRegion(...args);
    },
  };
});

afterEach(() => {
  plant.armed = false;
  plant.refused = 0;
});

describe('insetRing: a refused trial of the collapse bisection is the result, never an empty inset (KI-7; §3.7 Insets)', () => {
  // a 20 m × 10 m rectangle inset by 6 m: nothing is left at 6 m (no overlay call), so the bisection runs — its trials
  // at 3 m (a 14 m × 4 m ring) and then 4.5 m (14 m × 1 m: under 2 m tall, refused by the plant)
  it('unplanted: collapsed, the last non-empty distance near the inradius', () => {
    const { tx, face } = arenaFace([rect(0, 0, 2000, 1000)]);
    const r = insetRing(tx, face, 600);
    expect(r).toMatchObject({ ok: false, code: 'E_DEGENERATE', detail: 'collapsed' });
    const c = r as InsetCollapsed;
    expect(c.lastCm).toBeGreaterThan(450);
    expect(c.lastCm).toBeLessThan(500);
  });

  it('a trial the arrangement refuses: that refusal, code and detail unchanged, and no lastCm lowered by it', () => {
    const { tx, face } = arenaFace([rect(0, 0, 2000, 1000)]);
    plant.armed = true;
    const r = insetRing(tx, face, 600);
    expect(plant.refused).toBe(1);
    // read as empty, the bisection would go on below 4.5 m and report lastCm 400 — a silently lowered answer
    expect(r).toEqual(REFUSAL);
    expect(r).not.toHaveProperty('lastCm');
  });

  it('a refusal at dCm itself is passed on as before, and an inset no trial of which is refused is untouched', () => {
    const { tx, face } = arenaFace([rect(0, 0, 2000, 1000)]);
    plant.armed = true;
    // at 4.5 m the inset itself is refused (14 m × 1 m)
    expect(insetRing(tx, face, 450)).toEqual(REFUSAL);
    // at 2 m (16 m × 6 m) nothing is refused: the half-plane inset, exactly
    expect(insetRing(tx, face, 200)).toMatchObject({ ok: true, value: [rect(200, 200, 1800, 800)] });
  });
});
