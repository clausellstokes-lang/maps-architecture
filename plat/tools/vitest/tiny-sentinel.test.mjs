// The kernel-tiny project's sentinel (C-0286 (5); N-23): its thrown message is pinned here verbatim (J263 Q6), and it
// throws only when PLAT_TINY_TABLES=1 is set and the kernel's tiny-tables mode is not armed. Each case imports the
// sentinel afresh (vi.resetModules), with the variable stubbed and restored.
import { afterEach, describe, expect, it, vi } from 'vitest';

const MESSAGE =
  'kernel-tiny: PLAT_TINY_TABLES=1 but the tiny-tables mode is not armed (packages/kernel/test/arena/tiny.ts must set it ' +
  'before this sentinel; N-s1-1, Q26)';

const load = async () => import('./tiny-sentinel.mjs').then(() => null, (e) => e);

afterEach(() => {
  vi.unstubAllEnvs();
  vi.resetModules();
});

describe('tools/vitest/tiny-sentinel.mjs', () => {
  it('throws its pinned message when PLAT_TINY_TABLES=1 and the tiny-tables mode is not armed', async () => {
    vi.stubEnv('PLAT_TINY_TABLES', '1');
    vi.resetModules();
    const debug = await import('../../packages/kernel/src/arena/debug.ts');
    expect(debug.tinyTables()).toBe(false);
    const e = await load();
    expect(e).toBeInstanceOf(Error);
    expect(e.message).toBe(MESSAGE);
  });

  it('passes when the mode is armed, and when the variable is anything but 1', async () => {
    vi.stubEnv('PLAT_TINY_TABLES', '1');
    vi.resetModules();
    const debug = await import('../../packages/kernel/src/arena/debug.ts');
    debug.setTinyTables(true);
    try {
      expect(await load()).toBe(null);
    } finally {
      debug.setTinyTables(false);
    }
    for (const value of ['', '0', 'true', '11']) {
      vi.stubEnv('PLAT_TINY_TABLES', value);
      vi.resetModules();
      expect(await load(), JSON.stringify(value)).toBe(null);
    }
  });
});
