// The live committed summaries (docs/build/summaries/{M0-c-06, M0-e-06, M0-b-04, M0-k-04}.json) — read here and by
// entry.test.ts's file-open log alone (session round S1, Q134): another item's landing rewrites them (M0-e-06 S2's
// regenerated summary, J593; M0-c-06's 1 000-seed fold, J628), so nothing here pins a count, a coefficient or a verdict
// read from them. What is asserted holds whatever they hold: the fit reads them (C-0091's shapes — a summary the fit
// refuses is a contract break between the items, never a moved number); every counter's coefficient is its blocks'
// largest p999 × 1.5; every stage row's bound never exceeds its batches; the totals add up; the unbounded list is the
// unbounded rows; the verdict is (no row unbounded, the worst within the target); a row per stage each summary shows
// ran. The dry run's result on them is printed (console.info), never asserted: the pinned numbers live in fit.test.ts
// and entry.test.ts on the frozen copies (support.ts summaries()).
import { mkdtempSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import {
  C06_RUN_STAGES,
  FS_IO,
  fitWorkLimits,
  HIT_RATE_TARGET_PER_THOUSAND,
  inputPath,
  P999_FACTOR,
  REPORT_NAME,
  runWorkLimits,
  SUMMARY_IDS,
  type WorkLimitsIo,
} from '../../src/worklimits/index.js';
import { at, fitDate, liveSummaries, v2Table } from './support.js';

const dir = mkdtempSync(join(tmpdir(), 'worklimits-live-'));
afterAll(() => rmSync(dir, { recursive: true, force: true }));

describe('the live committed summaries: invariants of the fit, never a pinned count', () => {
  it('the fit reads them; every measured coefficient is its blocks’ largest p999 × 1.5; the counters are the table’s rows', () => {
    const r = fitWorkLimits(v2Table(), liveSummaries(), fitDate());
    expect(r.counters.map((f) => f.counter).sort()).toEqual([...v2Table().table.rows.keys()].sort());
    for (const f of r.counters) {
      if (f.status === 'measured' || f.status === 'floored') {
        expect(f.sources.length, f.counter).toBeGreaterThan(0);
        expect(f.p999, f.counter).toBe(Math.max(...f.sources.map((b) => b.p999)));
        expect(f.coefficient, f.counter).toBe((f.p999 ?? NaN) * P999_FACTOR);
      }
      if (f.status === 'measured') expect([f.after.perUnit, f.after.floor], f.counter).toEqual([f.coefficient, f.coefficient]);
      if (f.status === 'unmeasured' || f.status === 'fixed-skipped') expect(f.after, f.counter).toEqual(f.before);
    }
  });

  it('the hit-rate report: a bound never exceeds its batches, the totals add up, the unbounded list is the unbounded rows, the verdict follows', () => {
    const h = fitWorkLimits(v2Table(), liveSummaries(), fitDate()).hitRate;
    const bounded = h.rows.filter((r) => r.unbounded.length === 0);
    for (const r of h.rows) {
      const where = `${r.summary} ${r.at} ${r.stage}`;
      for (const c of r.counters) expect(Number.isInteger(c.bound) && c.bound >= 0, `${where} ${c.counter}`).toBe(true);
      if (r.unbounded.length > 0) {
        expect([r.after, r.perThousand, r.afterExact], where).toEqual([null, null, false]);
        continue;
      }
      expect(r.batches, where).not.toBeNull();
      const batches = r.batches ?? NaN;
      const after = r.after ?? NaN;
      expect(after, where).toBeGreaterThanOrEqual(0);
      expect(after, where).toBeLessThanOrEqual(batches);
      expect(after, where).toBe(Math.min(batches, r.counters.reduce((a, c) => a + c.bound, 0)));
      expect(r.perThousand, where).toBe(batches === 0 ? 0 : (1000 * after) / batches);
      if (r.afterExact) expect(after, where).toBe(0);
    }
    expect(h.batches).toBe(h.rows.reduce((a, r) => a + (r.batches ?? 0), 0));
    expect(h.after).toBe(bounded.reduce((a, r) => a + (r.after ?? 0), 0));
    expect(h.worstPerThousand).toBe(Math.max(0, ...bounded.map((r) => r.perThousand ?? 0)));
    expect(h.unbounded).toEqual(h.rows.filter((r) => r.unbounded.length > 0).map((r) => ({ summary: r.summary, at: r.at, stage: r.stage, counters: r.unbounded })));
    expect(h.pass).toBe(h.unbounded.length === 0 && h.worstPerThousand <= HIT_RATE_TARGET_PER_THOUSAND);
  });

  it('a row per stage each summary shows ran: M0-e-06’s stages with an outcome, M0-c-06’s runs’ stages, M0-b-04’s stage, M0-k-04’s primitives with a block', () => {
    const s = liveSummaries();
    const rows = fitWorkLimits(v2Table(), s, fitDate()).hitRate.rows;
    const has = (summary: string, atPrefix: string, stage: string): boolean => rows.some((r) => r.summary === summary && r.at.startsWith(atPrefix) && r.stage === stage);
    (at(s['M0-e-06'], 'groups') as { stages: Record<string, { ok: number; refused: Record<string, number> }> }[]).forEach((g, i) => {
      for (const [stage, o] of Object.entries(g.stages)) {
        const outcomes = o.ok + Object.values(o.refused).reduce((a, n) => a + n, 0);
        if (outcomes > 0) expect(has('M0-e-06', `groups/${String(i)} `, stage), `M0-e-06 groups/${String(i)} ${stage}`).toBe(true);
      }
    });
    (at(s['M0-c-06'], 'runs') as { run: string }[]).forEach((run, i) => {
      for (const stage of C06_RUN_STAGES.get(run.run) ?? []) expect(has('M0-c-06', `runs/${String(i)} `, stage), `M0-c-06 runs/${String(i)} ${stage}`).toBe(true);
    });
    expect(has('M0-b-04', 'work ', String(at(s['M0-b-04'], 'work/stage')))).toBe(true);
    for (const [p, prim] of Object.entries(at(s['M0-k-04'], 'primitives') as Record<string, { work: Record<string, unknown> }>)) {
      if (Object.keys(prim.work).some((c) => c !== 'warp.halvings')) expect(has('M0-k-04', `primitives/${p}`, p), p).toBe(true);
    }
  });
});

describe('the dry run on the live summaries: a report, printed and not asserted', () => {
  it('corepack pnpm bench -- worklimits as the entry runs it in-process: its lines printed; it reads the four and writes only its report', () => {
    const reads: string[] = [];
    const writes: string[] = [];
    const io: WorkLimitsIo = {
      read: (p) => {
        reads.push(p);
        return FS_IO.read(p);
      },
      write: (p) => void writes.push(p),
    };
    const lines: string[] = [];
    const out = runWorkLimits(['--date', fitDate()], { out: dir, say: (l) => void lines.push(l), io });
    console.info(`worklimits dry run on the live summaries (exit ${String(out.code)}; informative, not asserted — the pins read fixtures/summaries/):\n${lines.join('\n')}`);
    expect([0, 1]).toContain(out.code);
    expect(reads).toEqual(SUMMARY_IDS.map((id) => inputPath(id)));
    expect(writes).toEqual([]);
    expect(out.written).toEqual([join(dir, REPORT_NAME)]);
  });
});
