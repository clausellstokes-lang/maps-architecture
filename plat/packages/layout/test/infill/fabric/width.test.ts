// T40-1 (§13.2; §4.6 step 9): inside one district lane widths are non-decreasing in the lane's length, inside the
// class's width band, and never narrower than a lower class — on S8's own output — with the width law's unit cases.
import { createRng, entityKey, STAGES, CONCERNS } from '@plat/kernel';
import { describe, expect, it } from 'vitest';
import { cutClass, widthCells, widthExponent, widthOf } from '../../../src/index.js';
import { runFixture, twoDistricts, waySegments } from './support.js';

const CELLS = widthCells('CITY');

describe('the width law w = w_lo + Δw · min(1, L / L_ref)^p (§4.6 step 9)', () => {
  it('reads the bands in centimetres: alley 2–3 m, lane 3–5 m, secondary its ways.json band at the rung, in class order', { timeout: 120_000 }, () => {
    expect(CELLS.bands.alley).toEqual([200, 300]);
    expect(CELLS.bands.lane).toEqual([300, 500]);
    expect(CELLS.bands.secondary).toEqual([600, 800]);
    expect(CELLS.pMin).toBe(0.5);
    expect(CELLS.pMax).toBe(2);
  });

  it('gives w_lo at L = 0, w_hi from L = L_ref on, and its interior value exactly', { timeout: 120_000 }, () => {
    const band = [300, 500] as const;
    expect(widthOf(0, 10_000, 1, band)).toBe(300);
    expect(widthOf(10_000, 10_000, 1, band)).toBe(500);
    expect(widthOf(25_000, 10_000, 0.7, band)).toBe(500);
    // p = 1: linear; p = 0.5: the square root; p = 2: the square.
    expect(widthOf(2_500, 10_000, 1, band)).toBeCloseTo(350, 9);
    expect(widthOf(2_500, 10_000, 0.5, band)).toBeCloseTo(400, 9);
    expect(widthOf(5_000, 10_000, 2, band)).toBeCloseTo(350, 9);
  });

  it('is non-decreasing in L for every p and stays inside the band', { timeout: 120_000 }, () => {
    for (const p of [0.5, 0.71, 1, 1.4, 2]) {
      let prev = -Infinity;
      for (let L = 0; L <= 20_000; L += 137) {
        const w = widthOf(L, 9_000, p, CELLS.bands.lane);
        expect(w).toBeGreaterThanOrEqual(prev);
        expect(w).toBeGreaterThanOrEqual(300);
        expect(w).toBeLessThanOrEqual(500);
        prev = w;
      }
    }
  });

  it('p = 0.5 · 4^u: the ends, the midpoint (p = 1) and monotone in u — ln p uniform', { timeout: 120_000 }, () => {
    expect(widthExponent(0, CELLS)).toBe(0.5);
    expect(widthExponent(0.5, CELLS)).toBeCloseTo(1, 12);
    expect(widthExponent(0.25, CELLS)).toBeCloseTo(Math.SQRT1_2, 12);
    expect(widthExponent(0.999999, CELLS)).toBeLessThanOrEqual(2);
    let prev = 0;
    for (let u = 0; u < 1; u += 0.01) {
      const p = widthExponent(u, CELLS);
      expect(p).toBeGreaterThan(prev);
      prev = p;
    }
    expect(() => widthExponent(1, CELLS)).toThrow(RangeError);
    expect(() => widthOf(100, 0, 1, CELLS.bands.lane)).toThrow(RangeError);
  });

  it('types a cut secondary only in a walled regime past the lane length band (C-0237 (5))', { timeout: 120_000 }, () => {
    expect(cutClass(50_000, false, [20, 120])).toBe('lane');
    expect(cutClass(50_000, true)).toBe('lane');
    expect(cutClass(12_000, true, [20, 120])).toBe('lane');
    expect(cutClass(12_001, true, [20, 120])).toBe('secondary');
  });
});

describe('T40-1 on S8’s output (two districts)', () => {
  const f = twoDistricts();
  const out = runFixture(f);

  it('draws p once per district on cut.width, keyed by the district, and every lane’s width is the law at it', { timeout: 120_000 }, () => {
    for (const rep of out.infill.report.districts) {
      const d = f.districts.find((x) => x.district.id === rep.district);
      expect(d).toBeDefined();
      if (d === undefined) continue;
      const u = createRng()
        .stream(entityKey(f.input.seedKey, d.lineage, f.input.key ?? { layer: 'ground', part: 0 }), STAGES.S8, CONCERNS['cut.width'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 })
        .float01();
      expect(rep.widthU).toBe(u);
      expect(rep.p).toBe(widthExponent(u, CELLS));
    }
  });

  it('each lane’s L is its kerb-to-kerb length: the committed chain less the crossed spines’ half-widths (≤ 1 % + 2 cm)', { timeout: 120_000 }, () => {
    const widthOfWay = new Map<string, number>();
    for (const w of [...f.ways, ...out.lanes]) widthOfWay.set(w.id, w.width as number);
    for (const rep of out.infill.report.districts) {
      for (const ll of rep.laneLengths) {
        const segs = waySegments(f.plat, ll.lane);
        expect(segs.length).toBeGreaterThan(0);
        const total = segs.reduce((acc, [a, b]) => acc + Math.hypot(b.x - a.x, b.y - a.y), 0);
        // The ends: on a way's spine the chain runs on to its centreline, half that way's width beyond the kerb.
        const lane = out.lanes.find((x) => x.id === ll.lane);
        expect(lane).toBeDefined();
        let ext = 0;
        for (const node of [lane?.from, lane?.to]) {
          const id = node !== undefined && 'id' in node ? node.id : '';
          const j = out.infill.junctions.find((x) => x.id === id);
          const spine = j?.arms.find((arm) => arm !== ll.lane);
          if (spine !== undefined && j !== undefined && j.kind !== 'end') ext += (widthOfWay.get(spine) ?? 0) / 2;
        }
        // A bent lane's fillet shortens the chain against its legs: the bound is one-sided for those, two-sided else.
        expect(total - ext).toBeLessThanOrEqual(ll.lengthCm * 1.01 + 2);
        expect(total - ext).toBeGreaterThanOrEqual(ll.lengthCm * 0.9 - 2);
      }
    }
  });

  it('inside one district: widths non-decreasing in length per class, inside the class band, never narrower than a lower class', { timeout: 120_000 }, () => {
    expect(out.lanes.length).toBeGreaterThan(10);
    for (const rep of out.infill.report.districts) {
      expect(rep.laneLengths.length).toBe(rep.lanes);
      const byClass = new Map<string, { w: number; L: number }[]>();
      for (const ll of rep.laneLengths) {
        const lane = out.lanes.find((x) => x.id === ll.lane);
        expect(lane?.class).toBe(ll.cls);
        expect(lane?.width).toBe(ll.widthCm);
        const band = CELLS.bands[ll.cls];
        expect(ll.widthCm).toBeGreaterThanOrEqual(band[0]);
        expect(ll.widthCm).toBeLessThanOrEqual(band[1]);
        expect(ll.widthCm).toBe(widthOf(ll.lengthCm, rep.lRefCm, rep.p, band));
        const list = byClass.get(ll.cls) ?? [];
        list.push({ w: ll.widthCm, L: ll.lengthCm });
        byClass.set(ll.cls, list);
      }
      for (const list of byClass.values()) {
        list.sort((a, b) => a.L - b.L || a.w - b.w);
        for (let i = 1; i < list.length; i += 1) expect(list[i].w).toBeGreaterThanOrEqual(list[i - 1].w);
      }
      const alleys = byClass.get('alley') ?? [];
      const others = [...(byClass.get('lane') ?? []), ...(byClass.get('secondary') ?? [])];
      const maxAlley = Math.max(0, ...alleys.map((x) => x.w));
      for (const o of others) expect(o.w).toBeGreaterThanOrEqual(maxAlley);
    }
  });
});
