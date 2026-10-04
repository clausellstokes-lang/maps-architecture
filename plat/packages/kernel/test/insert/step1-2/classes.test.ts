// M0-a-04: the chain classes and their codes (§3.6 *Chain classes*; §3.11's "one item" row) and the transaction shell
// steps 1–2 charge (C-0169 (1), (2)). The item's listed test "a chain of one distinct point: E_BELOW_MIN_EDGE optional /
// E_DEGENERATE empty mandatory" is here.
import { describe, expect, it } from 'vitest';
import {
  addWarning,
  CHAIN_CLASSES,
  charge,
  CLASS_OUTCOMES,
  classOutcome,
  classRefusal,
  foldWarnings,
  INSERT_ATTRACT_QUERIES,
  INSERT_PLACEMENT_CANDIDATES,
  INSERT_POINTS,
  insertTx,
  notBuilt,
  passOn,
  warn,
  type ChainClass,
} from '../../../src/insert/classes.js';
import { decimate } from '../../../src/insert/decimate.js';
import type { Warning } from '../../../src/num/index.js';
import { createPlat } from '../../../src/arena/index.js';
import { FRAME, GROUND } from './support.js';

const tx = (workLimit?: number) => insertTx(createPlat(GROUND, FRAME), 2, workLimit === undefined ? {} : { workLimit });

describe('a chain of one distinct point (§3.6 step 1, §3.11 "one item")', () => {
  const cases: [string, { x: number; y: number }[], boolean?][] = [
    ['no point', []],
    ['one point', [{ x: 10, y: 20 }]],
    ['two coincident points', [{ x: 10, y: 20 }, { x: 10, y: 20 }]],
    ['a point and one 24.4 cm from it', [{ x: 0, y: 0 }, { x: 24.4, y: 0 }]],
    ['five points within minEdge of the first', [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 0, y: 12 }, { x: -17, y: 17 }, { x: 24, y: 6 }]],
    ['a closed chain of one distinct point', [{ x: 5, y: 5 }, { x: 15, y: 5 }, { x: 5, y: 15 }], true],
    ['two points that snap together', [{ x: 0.4, y: 0.4 }, { x: -0.4, y: -0.4 }]],
  ];
  for (const [name, pts, closed] of cases) {
    it(`${name}: optional → E_BELOW_MIN_EDGE, mandatory → E_DEGENERATE (empty)`, () => {
      const opt = decimate(tx(), pts, 'optional', { closed: closed === true });
      expect(opt.ok).toBe(false);
      if (!opt.ok) expect(opt.code).toBe('E_BELOW_MIN_EDGE');
      const man = decimate(tx(), pts, 'mandatory', { closed: closed === true });
      expect(man.ok).toBe(false);
      if (!man.ok) {
        expect(man.code).toBe('E_DEGENERATE');
        expect(man.detail).toBe('empty');
      }
    });
  }

  it('two distinct points exactly minEdge apart are one edge, not a refusal (25 cm is allowed, §3.2 (2))', () => {
    for (const cls of CHAIN_CLASSES) {
      const r = decimate(tx(), [{ x: 0, y: 0 }, { x: 15, y: 20 }], cls);
      expect(r.ok).toBe(true);
      if (r.ok) expect(r.value.points).toHaveLength(2);
    }
  });
});

describe('the class codes (§3.6 Chain classes)', () => {
  it('a mandatory chain refuses only for non-precision codes and commits an acute corner or a long wedge', () => {
    expect(classOutcome('mandatory', 'belowOneEdge')).toEqual({ refuse: 'E_DEGENERATE', detail: 'empty' });
    expect(classOutcome('mandatory', 'acuteCorner')).toEqual({ commit: 'W_ACUTE_CORNER' });
    expect(classOutcome('mandatory', 'wedgeBeyondAttract')).toEqual({ commit: 'W_WEDGE_ROUTED' });
    expect(classOutcome('mandatory', 'notSimpleRing')).toMatchObject({ refuse: 'E_SELF_INTERSECT' });
  });

  it('an optional chain refuses for every reason, with §3.1’s codes', () => {
    expect(classOutcome('optional', 'belowOneEdge')).toMatchObject({ refuse: 'E_BELOW_MIN_EDGE' });
    expect(classOutcome('optional', 'acuteCorner')).toMatchObject({ refuse: 'E_BELOW_MIN_ANGLE' });
    expect(classOutcome('optional', 'wedgeBeyondAttract')).toMatchObject({ refuse: 'E_BELOW_MIN_EDGE' });
    expect(classOutcome('optional', 'notSimpleRing')).toMatchObject({ refuse: 'E_SELF_INTERSECT' });
  });

  it('no precision reason refuses a mandatory chain: every mandatory refusal is E_DEGENERATE or E_SELF_INTERSECT', () => {
    for (const reason of ['belowOneEdge', 'acuteCorner', 'wedgeBeyondAttract', 'notSimpleRing'] as const) {
      const o = CLASS_OUTCOMES[reason].mandatory;
      if ('refuse' in o) expect(['E_DEGENERATE', 'E_SELF_INTERSECT']).toContain(o.refuse);
    }
  });

  it('classRefusal gives the refusal, or null where the class commits', () => {
    const r = classRefusal('optional', 'acuteCorner');
    expect(r).toEqual({ ok: false, code: 'E_BELOW_MIN_ANGLE', detail: 'a corner below minFaceAngle' });
    expect(classRefusal('mandatory', 'acuteCorner')).toBeNull();
    expect(() => classOutcome('sometimes' as unknown as ChainClass, 'acuteCorner')).toThrow(/mandatory or optional/);
  });
});

describe('the transaction shell (C-0169 (1))', () => {
  it('charges each counter and refuses past the work limit — a count, never a clock', () => {
    const t = tx(5);
    expect(charge(t, INSERT_POINTS, 3)).toBe(true);
    expect(charge(t, INSERT_ATTRACT_QUERIES, 2)).toBe(true);
    expect(charge(t, INSERT_PLACEMENT_CANDIDATES, 1)).toBe(false);
    expect(t.work.total).toBe(6);
    expect(t.work.counts.get(INSERT_POINTS)).toBe(3);
    expect(t.work.counts.get(INSERT_ATTRACT_QUERIES)).toBe(2);
    expect(t.work.counts.get(INSERT_PLACEMENT_CANDIDATES)).toBe(1);
  });

  it('decimate charges insert.points once per input point and refuses at the limit with nothing decided', () => {
    const pts = [{ x: 0, y: 0 }, { x: 100, y: 0 }, { x: 200, y: 0 }];
    const ok = tx(3);
    expect(decimate(ok, pts, 'optional').ok).toBe(true);
    expect(ok.work.counts.get(INSERT_POINTS)).toBe(3);
    const short = tx(2);
    const r = decimate(short, pts, 'optional');
    expect(r).toEqual({ ok: false, code: 'E_WORK_LIMIT', detail: INSERT_POINTS });
    expect(short.warnings).toEqual([]);
  });

  it('aggregates warnings by code, keeping the first point; folds a callee’s list once', () => {
    const own: Warning[] = [];
    const t = tx();
    warn(t, own, 'W_ATTRACTED', { x: 1, y: 2 } as never);
    warn(t, own, 'W_ATTRACTED', { x: 3, y: 4 } as never);
    addWarning(own, 'W_PLACED');
    expect(own).toEqual([{ code: 'W_ATTRACTED', count: 2, at: { x: 1, y: 2 } }, { code: 'W_PLACED', count: 1 }]);
    expect(t.warnings).toEqual([{ code: 'W_ATTRACTED', count: 2, at: { x: 1, y: 2 } }]);
    const into: Warning[] = [{ code: 'W_PLACED', count: 1 }];
    foldWarnings(into, own);
    expect(into).toEqual([{ code: 'W_PLACED', count: 2 }, { code: 'W_ATTRACTED', count: 2, at: { x: 1, y: 2 } }]);
  });

  it('a staged branch throws notBuilt naming its milestone; a refusal passes on its code and detail', () => {
    expect(() => notBuilt('M3a', 'candidate (c)')).toThrow("notBuilt('M3a'): candidate (c)");
    expect(passOn({ code: 'E_LEVEL', detail: 'x' })).toEqual({ ok: false, code: 'E_LEVEL', detail: 'x' });
  });

  it('a transaction acts on the arena its key names, at one of the five levels', () => {
    const p = createPlat(GROUND, FRAME);
    expect(() => insertTx(p, 1, { key: { layer: 'sky', part: 1 } })).toThrow(/arena its key names/);
    expect(() => insertTx(p, 5 as never)).toThrow(/0 … 4/);
    expect(insertTx(p, 3).workLimit).toBe(Number.MAX_SAFE_INTEGER);
  });
});
