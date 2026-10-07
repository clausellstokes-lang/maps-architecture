import { appendFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
const log = (...a: unknown[]): void => appendFileSync('/tmp/claude-1000/-home-cstokes111-Maps/6e7b0e39-9580-4748-b844-6b72e677c650/scratchpad/probe.log', a.map(String).join(' ') + '\n');
import { FLAT_BLUEPRINT, RIVER_BLUEPRINT, runBase, type BaseBatch } from '../../../src/index.js';

describe('scratch', () => {
  for (const [name, bp] of [['flat', FLAT_BLUEPRINT], ['river', RIVER_BLUEPRINT]] as const) {
    it(name, { timeout: 600_000 }, () => {
      const t0 = Date.now();
      let last = t0;
      const batches: BaseBatch[] = [];
      const r = runBase(bp, 1, { kind: 'all' }, { onBatch: (b) => { const now = Date.now(); log(name, b.stage, b.sub, b.k, 'dt', now - last); last = now; batches.push(b); } });
      log(name, 'ms', Date.now() - t0, 'order', r.model.order.join(','));
      log(name, 'bugs', JSON.stringify(r.report.bugs));
      log(name, 'keys', [...r.model.data.keys()].join(','));
      const forms = new Map<string, number>();
      for (const b of batches) { const k = `${b.stage}/${b.sub}/${b.form}/L${b.level}/${b.txStage}/${b.committed}`; forms.set(k, (forms.get(k) ?? 0) + 1); }
      log(name, [...forms.entries()].map(([k, v]) => `${k}:${v}`).join('\n'));
      const s6 = r.model.data.get('s6') as { districts: unknown[]; report: unknown } | undefined;
      log(name, 's6report', JSON.stringify(s6?.report));
      log(name, 'stages', JSON.stringify(r.report.stages.map((s) => ({ n: s.name, st: (s as { state?: unknown }).state, ms: (s as { ms?: unknown }).ms }))));
      const s1 = r.model.data.get('s1') as { report: unknown; sites: unknown[]; water: { bodies: unknown[]; bridges: unknown[] } } | undefined;
      log(name, 's1', JSON.stringify(s1?.report).slice(0, 600), 'sites', s1?.sites.length, 'bodies', s1?.water.bodies.length, 'bridges', s1?.water.bridges.length);
      log(name, 'districts', s6?.districts.length, 'lanes', (r.model.data.get('lanes') as unknown[] | undefined)?.length);
      expect(r.model.order).toEqual(['S1', 'S3', 'S4', 'S5', 'S6', 'S8']);
    });
  }
});
