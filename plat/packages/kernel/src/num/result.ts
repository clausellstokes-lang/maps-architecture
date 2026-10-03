// The kernel's typed result (§3.1): every primitive returns a KernelResult and never throws for a geometric reason.
// M0-a-01. The codes, the warnings and the E_DEGENERATE detail table are §3.1's; `ok`, `err` and `degenerate` are the
// constructors every kernel op builds its result with (C-0134 (10)).
import type { LatticePoint } from '../types/index.js';

/** §3.1's error codes; each code's reader is named there. */
export type KernelError =
  | 'E_OUT_OF_RANGE'
  | 'E_DEGENERATE'
  | 'E_LEVEL'
  | 'E_LOCKED'
  | 'E_KEPT'
  | 'E_SCOPE'
  | 'E_STRUCTURAL'
  | 'E_NOT_TWO_CROSSINGS'
  | 'E_HOLE_CONTACT'
  | 'E_SELF_INTERSECT'
  | 'E_BELOW_MIN_EDGE'
  | 'E_BELOW_MIN_ANGLE'
  | 'E_BELOW_MIN_AREA'
  | 'E_BELOW_MIN_WIDTH'
  | 'E_NON_CONVEX'
  | 'E_NO_PATH'
  | 'E_WORK_LIMIT'
  | 'E_INVARIANT';

/** §3.1's warning codes; each one's producer and readers are named there. */
export type WarningCode =
  | 'W_ATTRACTED'
  | 'W_STRETCH_SHARED'
  | 'W_WEDGE_ROUTED'
  | 'W_PLACED'
  | 'W_PROMOTED'
  | 'W_SNAP_PASSES'
  | 'W_ACUTE_CORNER'
  | 'W_SLIVER_RETYPED'
  | 'W_HEIGHT_CLAMPED'
  | 'W_DOWNGRADE'
  | 'W_CUT_SLID';

export type Warning = { code: WarningCode; count: number; at?: LatticePoint };

export type KernelResult<T> =
  | { ok: true; value: T; warnings: Warning[] }
  | { ok: false; code: KernelError; detail: string; partial?: T };

/** §3.1's E_DEGENERATE table: the `detail` names which row. */
export type DegenerateDetail = 'ratio' | 'collinear' | 'fit' | 'empty' | 'collapsed' | 'stretch' | 'seed' | 'fixed' | 'overlap';

/** A success, with a fresh warnings list unless one is given. */
export function ok<T>(value: T, warnings: Warning[] = []): Extract<KernelResult<T>, { ok: true }> {
  return { ok: true, value, warnings };
}

/** A refusal; `partial` is present only when given. */
export function err<T = never>(code: KernelError, detail: string, partial?: T): Extract<KernelResult<T>, { ok: false }> {
  return partial === undefined ? { ok: false, code, detail } : { ok: false, code, detail, partial };
}

/** An E_DEGENERATE refusal whose detail is a row of §3.1's table. */
export function degenerate<T = never>(detail: DegenerateDetail, partial?: T): Extract<KernelResult<T>, { ok: false }> {
  return err('E_DEGENERATE', detail, partial);
}
