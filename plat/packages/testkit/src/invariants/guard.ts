// The B-FUZZ runner's hard timeout (M0-k-04; §13.1 "0 hangs (hard timeout)"): every operation the runner issues runs
// under a wall-clock guard that interrupts it — a synchronous loop included — and reports it as a hang, never waits on
// it. Node's `vm` watchdog terminates whatever JavaScript the guarded call is running (a kernel function from the
// outer realm among it) and turns the termination into ERR_SCRIPT_EXECUTION_TIMEOUT, which the guard maps to `hang`.
// The timeout is a test harness's wall-clock bound on a run, never a limit any model package reads (§5.1 (5): every
// limit that changes output is a work limit) — a hang is a failure of the bar, so the clock decides nothing that is
// kept. A guarded call that throws is a `crash` with its message; a value is returned as is.
import vm from 'node:vm';

/** The default hard timeout per operation (ms): a kernel primitive on a fuzz input takes milliseconds (C-0225 (2)). */
export const HANG_TIMEOUT_MS = 10_000;

/** What one guarded call came to. */
export type Guarded<T> =
  | { readonly kind: 'value'; readonly value: T }
  | { readonly kind: 'crash'; readonly message: string }
  | { readonly kind: 'hang'; readonly ms: number };

const context = vm.createContext({ f: null as (() => unknown) | null });
const script = new vm.Script('f()', { filename: 'plat-fuzz-guard.vm' });

function isTimeout(e: unknown): boolean {
  return typeof e === 'object' && e !== null && 'code' in e && (e as { code: unknown }).code === 'ERR_SCRIPT_EXECUTION_TIMEOUT';
}

/** The message of a thrown value. */
export function thrownText(e: unknown): string {
  if (e instanceof Error) return `${e.name}: ${e.message}`;
  if (typeof e === 'object' && e !== null && 'message' in e) return String((e as { message: unknown }).message);
  return String(e);
}

/**
 * Runs `fn` under a hard timeout of `ms` milliseconds: its value, its throw as a crash, or a hang when it ran past the
 * timeout (the call is interrupted there). Guards do not nest: a guarded call that guards again is a programming error.
 */
export function guarded<T>(fn: () => T, ms: number = HANG_TIMEOUT_MS): Guarded<T> {
  if (!(Number.isInteger(ms) && ms >= 1)) throw new RangeError(`guarded: the timeout is a whole number of ms ≥ 1, got ${String(ms)}`);
  if (context.f !== null) throw new Error('guarded: guards do not nest');
  let out: T | undefined;
  context.f = () => {
    out = fn();
  };
  try {
    script.runInContext(context, { timeout: ms, breakOnSigint: false });
    return { kind: 'value', value: out as T };
  } catch (e) {
    if (isTimeout(e)) return { kind: 'hang', ms };
    return { kind: 'crash', message: thrownText(e) };
  } finally {
    context.f = null;
  }
}
