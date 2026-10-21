// §4.6 step 1 — the τ formula's unit test (not T34-1: its 10 000-face mean is M0-b-04's, nightly, and its commit
// clause M0-b-03's; C-0108): τ = e_lo · (e_hi / e_lo)^g by dmath.pow lies in [e_lo, e_hi] for every g ∈ [0, 1] and is
// monotone in g (C-0137 (4): clamped at e_hi against the one-ulp overshoot); the stop test against the face's OBB
// minor extent; and the planner's draws — cut.stop's four uniforms folded exactly as Stream.bell4, keyed at attempt 0
// and never redrawn by a later attempt, cut.t's two mean3 draws per attempt, cut.arc's one uniform per kept corner,
// nothing outside those concerns (§6.1's rows), every key's textual form for the report.
import { CONCERNS, createRng, dmath, STAGES, streamKey, Stream } from '@plat/kernel';
import fc from 'fast-check';
import { describe, expect, it } from 'vitest';
import { planCut, stopThreshold, type StopRecord } from '../../../src/infill/planner.js';
import { asCut, CTX, FACES, ring, streamsFor } from './support.js';

describe('τ = e_lo · (e_hi / e_lo)^g (§4.6 step 1)', () => {
  it('is e_lo at g = 0 and e_hi at g = 1, through dmath.pow in between', () => {
    expect(stopThreshold(2400, 4000, 0)).toBe(2400);
    expect(stopThreshold(2400, 4000, 1)).toBe(4000);
    expect(stopThreshold(2400, 4000, 0.5)).toBe(2400 * dmath.pow(4000 / 2400, 0.5));
    expect(stopThreshold(3000, 3000, 0.7)).toBe(3000);
  });

  it('lies in [e_lo, e_hi] for every g ∈ [0, 1] and every range', () => {
    fc.assert(
      fc.property(fc.double({ min: 1, max: 1e6, noNaN: true }), fc.double({ min: 0, max: 1e6, noNaN: true }), fc.double({ min: 0, max: 1, noNaN: true }), (lo, span, g) => {
        const hi = lo + span;
        const tau = stopThreshold(lo, hi, g);
        expect(tau).toBeGreaterThanOrEqual(lo);
        expect(tau).toBeLessThanOrEqual(hi);
      }),
    );
  });

  it('is monotone in g', () => {
    fc.assert(
      fc.property(
        fc.double({ min: 1, max: 1e5, noNaN: true }),
        fc.double({ min: 0, max: 1e5, noNaN: true }),
        fc.double({ min: 0, max: 1, noNaN: true }),
        fc.double({ min: 0, max: 1, noNaN: true }),
        (lo, span, g1, g2) => {
          const [a, b] = g1 <= g2 ? [g1, g2] : [g2, g1];
          expect(stopThreshold(lo, lo + span, a)).toBeLessThanOrEqual(stopThreshold(lo, lo + span, b));
        },
      ),
    );
  });

  it('is clamped to e_hi where e_lo · (e_hi / e_lo) rounds above it (C-0137 (4))', () => {
    let found = 0;
    for (let i = 1; i < 4000 && found < 5; i += 1) {
      const lo = 1 + i * 0.731;
      const hi = lo * 1.37 + i;
      if (lo * dmath.pow(hi / lo, 1) > hi) {
        found += 1;
        expect(stopThreshold(lo, hi, 1)).toBe(hi);
      }
    }
    expect(found).toBeGreaterThan(0);
  });

  it('refuses a range or a g outside the law', () => {
    expect(() => stopThreshold(0, 10, 0.5)).toThrow(RangeError);
    expect(() => stopThreshold(10, 5, 0.5)).toThrow(RangeError);
    expect(() => stopThreshold(10, 20, 1.5)).toThrow(RangeError);
    expect(() => stopThreshold(10, 20, Number.NaN)).toThrow(RangeError);
  });
});

/** A rectangle w × h (cm) at the origin. */
function rect(w: number, h: number) {
  return { rings: [ring([[0, 0], [w, 0], [w, h], [0, h]])] };
}

describe('the stop test (§4.6 step 1)', () => {
  it('stops a face whose OBB minor extent is under τ and cuts one at or above it', () => {
    for (let seed = 1; seed <= 60; seed += 1) {
      const r = planCut(rect(9000, 3000), CTX, streamsFor(seed));
      expect(r.ok && r.value.kind).toBe(r.ok && r.value.stop.tauCm > 3000 ? 'block' : 'cut');
      if (r.ok) expect(r.value.stop.tauCm).toBe(stopThreshold(2400, 4000, r.value.stop.g));
      // Minor below e_lo: always a block; at or above e_hi: never.
      const small = planCut(rect(9000, 2399), CTX, streamsFor(seed));
      expect(small.ok && small.value.kind).toBe('block');
      const big = planCut(rect(9000, 4000), CTX, streamsFor(seed));
      expect(big.ok && big.value.kind).toBe('cut');
    }
  });

  it('compares strictly: minor = τ is cut, minor just under τ is a block', () => {
    const first = asCut(planCut(rect(9000, 5000), CTX, streamsFor(4)));
    const at: StopRecord = { ...first.stop, tauCm: 5000 };
    expect(planCut(rect(9000, 5000), { ...CTX, stop: at }, streamsFor(4)).ok).toBe(true);
    const r1 = planCut(rect(9000, 5000), { ...CTX, stop: at }, streamsFor(4));
    expect(r1.ok && r1.value.kind).toBe('cut');
    const r2 = planCut(rect(9000, 5000), { ...CTX, stop: { ...at, tauCm: 5000.000001 } }, streamsFor(4));
    expect(r2.ok && r2.value.kind).toBe('block');
  });

  it('reads the minor extent of the outer ring\'s OBB, whatever its turn', () => {
    // The same 9 000 × 3 000 block turned by 3:4:5 — minor extent 3 000 still: always under e_hi, a block when τ > 3 000.
    const turned = { rings: [ring([[0, 0], [5400, 7200], [3000, 9000], [-2400, 1800]])] };
    for (let seed = 1; seed <= 30; seed += 1) {
      const r = planCut(turned, CTX, streamsFor(seed));
      expect(r.ok).toBe(true);
      if (r.ok) {
        expect(r.value.minorCm).toBeCloseTo(3000, 6);
        expect(r.value.kind).toBe(r.value.minorCm < r.value.stop.tauCm ? 'block' : 'cut');
      }
    }
  });
});

describe('the draws (§6.1: cut.stop, cut.t, cut.arc)', () => {
  it('cut.stop draws four uniforms keyed by the face at attempt 0, folded exactly as bell4', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
      const st = streamsFor(seed);
      const r = planCut(FACES.trapezoid, CTX, st);
      expect(r.ok).toBe(true);
      if (!r.ok) continue;
      const key = streamKey(st.faceKey, STAGES.S8, CONCERNS['cut.stop'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
      const twin = new Stream(key);
      const twin2 = new Stream(key);
      const u = [twin.float01(), twin.float01(), twin.float01(), twin.float01()];
      expect(r.value.stop.uniforms).toEqual(u);
      expect(r.value.stop.g).toBe(twin2.bell4());
      expect(r.value.draws[0].concern).toBe('cut.stop');
    }
  });

  it('cut.t draws step 2 then step 4 as mean3 on the attempt\'s stream; cut.arc one uniform per kept corner', () => {
    for (let seed = 1; seed <= 40; seed += 1) {
      const st = streamsFor(seed);
      const plan = asCut(planCut(FACES.triangle, CTX, st));
      const t = new Stream(streamKey(st.faceKey, STAGES.S8, CONCERNS['cut.t'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 }));
      const pos = plan.draws.filter((d) => d.step === 'position');
      const cor = plan.draws.filter((d) => d.step === 'corner');
      expect(pos).toHaveLength(1);
      expect(cor).toHaveLength(1);
      expect(pos[0].value).toBe(t.mean3());
      expect(cor[0].value).toBe(t.mean3());
      expect(plan.corner.b).toBe(cor[0].value);
      const arcs = plan.draws.filter((d) => d.concern === 'cut.arc');
      expect(arcs).toHaveLength(plan.cut.bent ? 1 : 0);
      if (arcs.length === 1) {
        const a = new Stream(streamKey(st.faceKey, STAGES.S8, CONCERNS['cut.arc'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 }));
        expect(arcs[0].value).toBe(a.float01());
        expect(plan.cut.fillet?.u).toBe(arcs[0].value);
      }
      for (const d of plan.draws) expect(['cut.stop', 'cut.t', 'cut.arc']).toContain(d.concern);
    }
  });

  it('a later attempt re-plans steps 2–7 on its attempt component and never redraws cut.stop', () => {
    const st = streamsFor(11);
    const first = asCut(planCut(FACES.trapezoid, CTX, st));
    expect(() => planCut(FACES.trapezoid, { ...CTX, attempt: 1 }, streamsFor(11))).toThrow(RangeError);
    const again = planCut(FACES.trapezoid, { ...CTX, attempt: 1, stop: first.stop }, st);
    expect(again.ok).toBe(true);
    if (!again.ok) return;
    expect(again.value.stop).toBe(first.stop);
    expect(again.value.draws.some((d) => d.concern === 'cut.stop')).toBe(false);
    for (const d of again.value.draws) expect(d.key.attempt).toBe(1);
    const t1 = new Stream(streamKey(st.faceKey, STAGES.S8, CONCERNS['cut.t'], { reroll: 0, attempt: 1, epoch: 0, salt: 0 }));
    expect(again.value.draws[0].value).toBe(t1.mean3());
    expect(() => planCut(FACES.trapezoid, { ...CTX, attempt: 3, stop: first.stop }, st)).toThrow(RangeError);
    expect(() => planCut(FACES.trapezoid, { ...CTX, attempt: -1 }, st)).toThrow(RangeError);
  });

  it('a later attempt draws cut.arc on its own attempt component: the value is the attempt-k twin\'s (C-0222 (12))', () => {
    // §6.1 keys cut.arc by the face's lineage with the attempt component — a seed-to-output law: the uniform a kept
    // corner draws at attempt k is the first float01 of the stream keyed (S8, cut.arc, attempt k), never attempt 0's
    // (the check's B3, mutant m43), and the record's key says the attempt it was drawn on.
    let kept = 0;
    for (let seed = 1; seed <= 40; seed += 1) {
      const st = streamsFor(seed);
      const first = asCut(planCut(FACES.trapezoid, CTX, st));
      for (const k of [1, 2]) {
        const r = planCut(FACES.trapezoid, { ...CTX, attempt: k, stop: first.stop }, st);
        if (!r.ok || r.value.kind !== 'cut' || !r.value.cut.bent) continue;
        const arcs = r.value.draws.filter((d) => d.concern === 'cut.arc');
        expect(arcs).toHaveLength(1);
        kept += 1;
        const twin = new Stream(streamKey(st.faceKey, STAGES.S8, CONCERNS['cut.arc'], { reroll: 0, attempt: k, epoch: 0, salt: 0 }));
        const u = twin.float01();
        expect(arcs[0].value).toBe(u);
        expect(arcs[0].uniforms).toEqual([u]);
        expect(arcs[0].key.attempt).toBe(k);
        expect(r.value.cut.fillet?.u).toBe(u);
        // Not the attempt-0 stream's uniform.
        const zero = new Stream(streamKey(st.faceKey, STAGES.S8, CONCERNS['cut.arc'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 }));
        expect(arcs[0].value).not.toBe(zero.float01());
      }
    }
    expect(kept).toBeGreaterThan(20);
  });

  it('draws on the stream key\'s reroll and epoch components: cut.stop, cut.t and cut.arc equal their twins (§6.1)', () => {
    // §6.1's key carries reroll and epoch beside the lineage and the attempt: the planner's draws must come from the
    // stream so keyed — their values, not only the record's key text — at each (reroll, epoch) pair and attempt.
    let arcs = 0;
    for (const [reroll, epoch] of [[3, 0], [0, 2], [3, 2]] as const) {
      for (let seed = 1; seed <= 20; seed += 1) {
        const st = { ...streamsFor(seed), reroll, epoch };
        const first = asCut(planCut(FACES.trapezoid, CTX, st));
        const twin = (concern: 'cut.stop' | 'cut.t' | 'cut.arc', attempt: number): Stream =>
          new Stream(streamKey(st.faceKey, STAGES.S8, CONCERNS[concern], { reroll, attempt, epoch, salt: 0 }));
        const stop = twin('cut.stop', 0);
        expect(first.stop.uniforms).toEqual([stop.float01(), stop.float01(), stop.float01(), stop.float01()]);
        expect(first.stop.draw.key).toMatchObject({ reroll, epoch, attempt: 0 });
        for (const attempt of [0, 1, 2]) {
          const plan = attempt === 0 ? first : asCut(planCut(FACES.trapezoid, { ...CTX, attempt, stop: first.stop }, { ...st, rng: createRng() }));
          const t = twin('cut.t', attempt);
          const pos = plan.draws.filter((d) => d.concern === 'cut.t');
          expect(pos.map((d) => d.value)).toEqual([t.mean3(), t.mean3()]);
          for (const d of plan.draws) expect(d.key).toMatchObject({ reroll, epoch, attempt: d.concern === 'cut.stop' ? 0 : attempt });
          const arc = plan.draws.filter((d) => d.concern === 'cut.arc');
          if (arc.length === 1) {
            arcs += 1;
            expect(arc[0].value).toBe(twin('cut.arc', attempt).float01());
          }
        }
      }
    }
    expect(arcs).toBeGreaterThan(30);
  });

  it('renders each draw\'s key in textual form for the report', () => {
    const st = { ...streamsFor(3), entity: 'face:7kq2m9x4c1b0a' };
    const plan = asCut(planCut(FACES.trapezoid, CTX, st));
    expect(plan.draws.map((d) => d.text)).toEqual(['S8/cut.stop@face:7kq2m9x4c1b0a', 'S8/cut.t@face:7kq2m9x4c1b0a', 'S8/cut.t@face:7kq2m9x4c1b0a', 'S8/cut.arc@face:7kq2m9x4c1b0a'].slice(0, plan.draws.length));
    const later = planCut(FACES.trapezoid, { ...CTX, attempt: 2, stop: plan.stop }, { ...st, rng: createRng(), reroll: 3 });
    expect(later.ok && later.value.draws[0].text).toBe('S8/cut.t@face:7kq2m9x4c1b0a/r=3/a=2');
  });

  it('keys every draw by the face: another face key gives other draws, the same key the same', () => {
    const a = asCut(planCut(FACES.trapezoid, CTX, streamsFor(5, [1, 2])));
    const b = asCut(planCut(FACES.trapezoid, CTX, streamsFor(5, [1, 3])));
    const c = asCut(planCut(FACES.trapezoid, CTX, streamsFor(5, [1, 2])));
    expect(a.stop.uniforms).not.toEqual(b.stop.uniforms);
    expect(a.stop.uniforms).toEqual(c.stop.uniforms);
    expect(a.draws.map((d) => d.value)).toEqual(c.draws.map((d) => d.value));
  });
});
