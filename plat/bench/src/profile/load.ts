// bench/src/profile/load.ts — R7 §1.3's run discipline (run1.sh): before a run, wait (at most --load-wait seconds) for
// the one-minute load average below --load-max (0.3); while it runs, log the load every 30 s; record the load before,
// the maximum during, and after. The load is /proc/loadavg's first three fields (Linux; elsewhere null and said so).
import { readFileSync } from 'node:fs';

export type Load = readonly [number, number, number];

export function readLoad(path = '/proc/loadavg'): Load | null {
  try {
    const f = readFileSync(path, 'utf8').trim().split(/\s+/).map(Number);
    return f.length >= 3 && f.slice(0, 3).every(Number.isFinite) ? [f[0], f[1], f[2]] : null;
  } catch {
    return null;
  }
}

export const showLoad = (l: Load | null): string => (l === null ? 'n/a' : l.map((x) => x.toFixed(2)).join(' '));

/** Waits, polling every 10 s, until the one-minute load is below `max` or `waitS` seconds passed. */
export async function waitIdle(max: number, waitS: number, log: (line: string) => void): Promise<{ load: Load | null; idle: boolean; waitedS: number }> {
  const t0 = Date.now();
  for (;;) {
    const l = readLoad();
    const waitedS = Math.round((Date.now() - t0) / 1000);
    if (l === null) return { load: null, idle: false, waitedS };
    if (l[0] < max) return { load: l, idle: true, waitedS };
    if (waitedS >= waitS) return { load: l, idle: false, waitedS };
    log(`profile: load ${showLoad(l)} ≥ ${String(max)}; waiting (${String(waitedS)} / ${String(waitS)} s)`);
    await new Promise((r) => setTimeout(r, 10_000));
  }
}
