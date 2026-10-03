// M0-a-01: the typed result (§3.1) — its constructors, §3.1's codes, warnings and E_DEGENERATE table, as types and as
// values (C-0134 (10)).
import { describe, expect, expectTypeOf, it } from 'vitest';
import {
  degenerate,
  err,
  ok,
  type DegenerateDetail,
  type KernelError,
  type KernelResult,
  type Warning,
  type WarningCode,
} from '../../src/num/index.js';
import { pt } from './support.js';

describe('KernelResult (§3.1)', () => {
  it('ok carries the value and a fresh warnings list', () => {
    const a = ok(3);
    const b = ok(4);
    expect(a).toEqual({ ok: true, value: 3, warnings: [] });
    expect(a.warnings).not.toBe(b.warnings);
    const w: Warning = { code: 'W_ATTRACTED', count: 2, at: pt(1, 2) };
    expect(ok('x', [w])).toEqual({ ok: true, value: 'x', warnings: [w] });
  });

  it('err and degenerate carry the code and detail, and a partial only when given', () => {
    expect(err('E_NO_PATH', 'closest')).toEqual({ ok: false, code: 'E_NO_PATH', detail: 'closest' });
    expect('partial' in err('E_NO_PATH', 'closest')).toBe(false);
    expect(err('E_NO_PATH', 'closest', pt(3, 4))).toEqual({ ok: false, code: 'E_NO_PATH', detail: 'closest', partial: { x: 3, y: 4 } });
    expect(degenerate('collinear')).toEqual({ ok: false, code: 'E_DEGENERATE', detail: 'collinear' });
    expect(degenerate('collapsed', 12)).toEqual({ ok: false, code: 'E_DEGENERATE', detail: 'collapsed', partial: 12 });
  });

  it('narrows on `ok`, and a refusal of one value type is a result of any', () => {
    const r: KernelResult<number> = Math.sqrt(4) > 1 ? ok(1) : degenerate('ratio');
    if (r.ok) expectTypeOf(r.value).toEqualTypeOf<number>();
    else expectTypeOf(r.code).toEqualTypeOf<KernelError>();
    const refusal: KernelResult<{ a: string }> = err('E_LEVEL', 'x');
    expect(refusal.ok).toBe(false);
  });

  it('declares exactly §3.1\'s codes, warnings and E_DEGENERATE details', () => {
    expectTypeOf<KernelError>().toEqualTypeOf<
      | 'E_OUT_OF_RANGE' | 'E_DEGENERATE' | 'E_LEVEL' | 'E_LOCKED' | 'E_KEPT' | 'E_SCOPE' | 'E_STRUCTURAL'
      | 'E_NOT_TWO_CROSSINGS' | 'E_HOLE_CONTACT' | 'E_SELF_INTERSECT' | 'E_BELOW_MIN_EDGE' | 'E_BELOW_MIN_ANGLE'
      | 'E_BELOW_MIN_AREA' | 'E_BELOW_MIN_WIDTH' | 'E_NON_CONVEX' | 'E_NO_PATH' | 'E_WORK_LIMIT' | 'E_INVARIANT'
    >();
    expectTypeOf<WarningCode>().toEqualTypeOf<
      | 'W_ATTRACTED' | 'W_STRETCH_SHARED' | 'W_WEDGE_ROUTED' | 'W_PLACED' | 'W_PROMOTED' | 'W_SNAP_PASSES'
      | 'W_ACUTE_CORNER' | 'W_SLIVER_RETYPED' | 'W_HEIGHT_CLAMPED' | 'W_DOWNGRADE' | 'W_CUT_SLID'
    >();
    expectTypeOf<DegenerateDetail>().toEqualTypeOf<
      'ratio' | 'collinear' | 'fit' | 'empty' | 'collapsed' | 'stretch' | 'seed' | 'fixed' | 'overlap'
    >();
    // @ts-expect-error — a detail outside §3.1's table is refused
    degenerate('sliver');
  });
});
