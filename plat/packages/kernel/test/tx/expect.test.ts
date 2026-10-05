// M0-a-06: expectations (§3.3 *Expectations*; §13.1: "a failing class floor under reject / repair / downgrade, and a
// non-class-floor failure → E_INVARIANT"). A class floor's failure returns E_BELOW_MIN_WIDTH / _AREA / _ANGLE; `reject`
// (tier 1) and `downgrade` (tier 4) commit nothing and return the code; `repair` (tier 2) runs the injected repairer —
// M0-a-07's absorbSliver until it lands, here a stand-in that merges the sliver across its partition edge — on each face
// below a width or area floor, checks again, and commits, while a face below its angle floor is still rejected.
import { describe, expect, it } from 'vitest';
import type { Plat } from '../../src/arena/index.js';
import { insertChain } from '../../src/insert/index.js';
import { ok } from '../../src/num/index.js';
import { removeEdges, tx, type TxEnv } from '../../src/tx/index.js';
import type { Invariant } from '../../src/types/index.js';
import { framed, healthy, pt, spec, state } from './support.js';

const BLOCK_FLOOR: Invariant = { name: 'block floor', scope: 'batch', class: 'hard', kind: 'classFloor', faceClass: 'block' };

/** An L1 batch that cuts a 50 cm sliver off the frame's top with a partition chain (a district boundary). */
function sliver(p: Plat, onFail: 'reject' | 'repair' | 'downgrade', env: TxEnv, floor: Invariant = BLOCK_FLOOR) {
  return tx(p, spec(1, { onFail, expect: [floor] }), (o) => insertChain(o, [pt(0, 3950), pt(4000, 3950)], [{ role: 'district_bound', entity: 'district:7' }], 'mandatory'), env);
}

const widthEnv: TxEnv = { floors: (c) => (c === 'block' ? { minWidthCm: 100 } : undefined) };
const areaEnv: TxEnv = { floors: (c) => (c === 'block' ? { minAreaCm2: 500_000 } : undefined) };

describe('§13.1 expectations: a failing class floor under each onFail', () => {
  it('reject: E_BELOW_MIN_WIDTH, the version kept', () => {
    const p = framed();
    const before = state(p);
    const r = sliver(p, 'reject', widthEnv);
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.code).toBe('E_BELOW_MIN_WIDTH');
    expect(state(p)).toBe(before);
  });

  it('reject on an area floor: E_BELOW_MIN_AREA', () => {
    const p = framed();
    const r = sliver(p, 'reject', areaEnv);
    expect(!r.ok && r.code).toBe('E_BELOW_MIN_AREA');
  });

  it('downgrade: the code returned for the ladder\'s simpler rung, nothing committed', () => {
    const p = framed();
    const before = state(p);
    const r = sliver(p, 'downgrade', widthEnv);
    expect(!r.ok && r.code).toBe('E_BELOW_MIN_WIDTH');
    expect(state(p)).toBe(before);
  });

  it('repair: the sliver absorbed by the repairer on the overlay, checked again, the batch committed', () => {
    const p = framed();
    const absorbed: number[] = [];
    const env: TxEnv = {
      ...widthEnv,
      repair: (o, face) => {
        absorbed.push(face);
        const r = removeEdges(o, { role: 'district_bound', entity: 'district:7' });
        return r.ok ? ok(face) : { ok: false, code: r.code, detail: r.detail };
      },
    };
    const r = sliver(p, 'repair', env);
    expect(r.ok).toBe(true);
    expect(absorbed).toHaveLength(1);
    if (r.ok) expect(r.value.record).not.toBeNull();
    healthy(p);
    expect(p.version).toBe(1);
  });

  it('repair: a face below its angle floor is still rejected after the repair (E_BELOW_MIN_ANGLE)', () => {
    const p = framed();
    const before = state(p);
    let calls = 0;
    const env: TxEnv = { floors: () => ({ minWidthCm: 100, minAreaCm2: 10_000, minAngleCdeg: 6000 }), repair: () => (calls++, ok(-1)) };
    const r = tx(p, spec(1, { onFail: 'repair', expect: [BLOCK_FLOOR] }), (o) => insertChain(o, [pt(0, 2000), pt(2000, 4000)], [{ role: 'district_bound', entity: 'district:7' }], 'mandatory'), env);
    expect(!r.ok && r.code).toBe('E_BELOW_MIN_ANGLE');
    expect(calls).toBe(0);
    expect(state(p)).toBe(before);
  });

  it('a class the environment gives no floor, and a face the class does not apply to, pass', () => {
    const p = framed();
    expect(sliver(p, 'reject', { floors: () => undefined }).ok).toBe(true);
    const q = framed();
    expect(sliver(q, 'reject', { ...widthEnv, appliesTo: () => false }).ok).toBe(true);
  });
});

describe('§13.1 expectations: a failed entry that is not a class floor → E_INVARIANT', () => {
  it('a named check of the stage\'s that fails', () => {
    const p = framed();
    const before = state(p);
    const r = sliver(p, 'reject', { checks: { 'no boundary near the frame': (v) => (v.faces.length > 1 ? `${v.faces.length} faces` : null) } }, {
      name: 'frame clearance', scope: 'batch', class: 'hard', kind: 'check', check: 'no boundary near the frame',
    });
    expect(!r.ok && r.code).toBe('E_INVARIANT');
    expect(state(p)).toBe(before);
  });

  it('a check the environment does not provide, and repair without a repairer, are programming errors', () => {
    const p = framed();
    expect(() => sliver(p, 'reject', {}, { name: 'x', scope: 'batch', class: 'hard', kind: 'check', check: 'missing' })).toThrow(/does not provide/);
    expect(() => sliver(p, 'repair', widthEnv)).toThrow(/repairer/);
    expect(p.version).toBe(0);
  });
});
