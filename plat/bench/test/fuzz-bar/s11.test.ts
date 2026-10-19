// M0-k-04's listed test (C-0107, C-0114): "the S11 workload makes exactly the listed calls per plot — one offsetFace, one
// obb, one lir, ≥ 1 splitFace, one L4 insertChain — counted by a façade spy, and reproduces its call list run to run".
// The count is the test's own spy, wrapped round each plot's façade beneath the workload's recorder (so both see the
// same calls, counted apart); the setup (the frame, the plot's ring) goes through another façade and is never counted.
// The workload's timing goes through M0-f-01's harness: a stamped TimingResult whose figure is the median per-plot
// time of the S11 calls (µs) — here with built readings (no idle, stub calibrations), so `built`, never judged.
import { describe, expect, it } from 'vitest';
import type { Kernel } from '@plat/kernel';
import { hostRecord } from '../../src/host/index.js';
import { s11Calls, s11Plots, s11Problems, s11Workload, S11_PLOT_KINDS, type S11Plot } from '../../src/fuzz-bar/index.js';

const OPS = ['offsetFace', 'obb', 'lir', 'splitFace', 'insertChain'] as const;

/** The test's façade spy: a copy of the façade's geom counting every call of the five S11 operations, by op and level. */
function counting(log: { plot: number; op: string; level: number | null }[]) {
  return (k: Kernel, plot: number): Kernel => {
    const geom: Record<string, unknown> = {};
    for (const [name, v] of Object.entries(k.geom)) {
      geom[name] =
        typeof v === 'function' && (OPS as readonly string[]).includes(name)
          ? (...args: unknown[]) => {
              const first = args[0] as { level?: number } | undefined;
              log.push({ plot, op: name, level: (name === 'splitFace' || name === 'insertChain') && typeof first?.level === 'number' ? first.level : null });
              return (v as (...a: unknown[]) => unknown)(...args);
            }
          : v;
    }
    return { ...k, geom } as unknown as Kernel;
  };
}

const N = 15;

describe('the synthetic per-plot S11 workload (C-0107)', () => {
  it('draws plots of the five plot-shaped kinds at plot scale, reproducibly', () => {
    const a = s11Plots(3, N);
    expect(a.length).toBe(N);
    expect(new Set(a.map((p) => p.kind))).toEqual(new Set(S11_PLOT_KINDS));
    for (const p of a) {
      let r = 0;
      const cx = p.ring.reduce((t, q) => t + q.x, 0) / p.ring.length;
      const cy = p.ring.reduce((t, q) => t + q.y, 0) / p.ring.length;
      for (const q of p.ring) r = Math.max(r, Math.hypot(q.x - cx, q.y - cy));
      expect(r).toBeLessThan(4_500); // plot scale: circumradius 4–30 m (C-0161 (5))
    }
    expect(s11Plots(3, N)).toEqual(a);
  });

  it('makes exactly the listed calls per plot, counted by a façade spy: one offsetFace, obb and lir, ≥ 1 splitFace and one insertChain at L4', () => {
    const log: { plot: number; op: string; level: number | null }[] = [];
    const plots = s11Calls(5, N, { wrap: counting(log) });
    expect(plots.length).toBe(N);
    for (let i = 0; i < N; i++) {
      const mine = log.filter((x) => x.plot === i);
      const n = (op: string, level?: number) => mine.filter((x) => x.op === op && (level === undefined || x.level === level)).length;
      expect([i, n('offsetFace'), n('obb'), n('lir'), n('insertChain'), n('insertChain', 4)]).toEqual([i, 1, 1, 1, 1, 1]);
      expect(n('splitFace')).toBeGreaterThanOrEqual(1);
      expect(n('splitFace', 4)).toBe(n('splitFace'));
      // the workload's own list is the façade's calls, call for call
      expect(plots[i].calls.map((c) => [c.op, c.level])).toEqual(mine.map((x) => [x.op, x.level]));
    }
    expect(s11Problems(plots)).toEqual([]);
    // the calls reach the kernel: the footprint commits on every plot
    for (const p of plots) expect(p.calls.find((c) => c.op === 'insertChain')?.result).toBe('ok');
  }, 120_000);

  it('reproduces its call list run to run', () => {
    const strip = (ps: S11Plot[]) => ps.map((p) => ({ index: p.index, kind: p.kind, calls: p.calls }));
    expect(strip(s11Calls(9, N))).toEqual(strip(s11Calls(9, N)));
    expect(strip(s11Calls(9, N))).not.toEqual(strip(s11Calls(10, N)));
  }, 120_000);

  it('the call-list check fails a plot with a missing or an extra call (a negative control)', () => {
    const plots = s11Calls(5, 3);
    const extra = plots.map((p, i) => (i === 1 ? { ...p, calls: [...p.calls, p.calls[1]] } : p));
    expect(s11Problems(extra)).toHaveLength(1);
    const missing = plots.map((p, i) => (i === 2 ? { ...p, calls: p.calls.filter((c) => c.op !== 'lir') } : p));
    expect(s11Problems(missing)).toHaveLength(1);
    const coarse = plots.map((p, i) => (i === 0 ? { ...p, calls: p.calls.map((c) => (c.op === 'insertChain' ? { ...c, level: 3 as const } : c)) } : p));
    expect(s11Problems(coarse)).toHaveLength(1);
    // the split clauses (N-5): a plot with no yard split, and a plot with an extra split off L4 beside its L4 ones
    const noSplit = plots.map((p, i) => (i === 1 ? { ...p, calls: p.calls.filter((c) => c.op !== 'splitFace') } : p));
    expect(s11Problems(noSplit)).toHaveLength(1);
    const split = plots[2].calls.find((c) => c.op === 'splitFace');
    if (split === undefined) throw new Error('no split');
    const offLevel = plots.map((p, i) => (i === 2 ? { ...p, calls: [...p.calls, { ...split, level: 3 as const }] } : p));
    expect(s11Problems(offLevel)).toHaveLength(1);
  }, 60_000);

  it('times through M0-f-01’s harness: a stamped result, its figure the median per-plot µs of the S11 calls', async () => {
    const reading = () => ({ at: '2026-10-06T00:00:00.000Z', loadAverage: 0.3, power: 'ac' as const, selfPid: process.pid, processes: [{ pid: process.pid, ppid: 1, pcpu: 100, comm: 'node' }] });
    const w = await s11Workload(4, 5, {
      timing: { idleMs: 0, machine: reading, sampler: () => Promise.resolve({ stop: () => Promise.resolve([]) }), calibrate: () => 100, referenceScore: 100, host: hostRecord() },
    });
    expect(w.calls).toHaveLength(5);
    expect(s11Problems(w.calls)).toEqual([]);
    const t = w.timings;
    if (t === null) throw new Error('no timing');
    expect(t.unit).toBe('µs');
    expect(t.readings).toBe('built');
    const us = w.calls.map((c) => c.us).sort((a, b) => a - b);
    expect(t.value).toBe(us[2]);
    expect(t.label).toMatch(/S11 synthetic per-plot workload/);
    expect(['authoritative', 'contended']).toContain(t.authority);
    // untimed: the call list alone
    expect((await s11Workload(4, 5, { timing: false })).timings).toBeNull();
  }, 120_000);
});
