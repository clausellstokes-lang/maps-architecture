import { appendFileSync, readFileSync } from 'node:fs';
const log = (...a: unknown[]): void => appendFileSync(process.env.DBG_OUT as string, a.map(String).join(' ') + '\n');
import { it } from 'vitest';
import { booleans } from '@plat/kernel';
import { loadOracles, oracleBoolean, compareSplit } from '../../../src/oracles/index.js';
import { faceCount } from '../../../src/oracles/faces.js';
import { ringProblems } from '../../../src/oracles/rings.js';

it('debug', async () => {
  await loadOracles();
  const fails = JSON.parse(readFileSync(process.env.DBG_FILE as string, 'utf8'));
  const only = (process.env.DBG_IDX ?? '').split(',').filter(Boolean).map(Number);
  fails.forEach((f: any, k: number) => {
    if (only.length && !only.includes(k)) return;
    const c = f.case;
    if (c.op === undefined || c.a === undefined) return;
    const ours = booleans(c.op, c.a, c.b, c.fill);
    for (const eng of ['clipper2', 'polygon-clipping'] as const) {
    const or = oracleBoolean(c.op, c.a, c.b, c.fill, eng);
    const v = compareSplit(ours, or, ours.ok ? ours.warnings : ((ours as any).warnings ?? []));
    log(eng, or.ok ? ringProblems(or.rings).join('|') : '', k, c.op, c.fill, 'ours', ours.ok ? `${ours.value.length} rings faces ${faceCount(ours.value)} warn ${JSON.stringify(ours.warnings)}` : `${ours.code} ${ours.detail} ${JSON.stringify((ours as any).warnings)}`,
      'oracle', or.ok ? `${or.rings.length} rings faces ${faceCount(or.rings)}` : or.error, 'verdict', v.split, v.pass, v.failures.join(';'));
    if (process.env.DBG_V) log(JSON.stringify({ ours: ours.ok ? ours.value : null, oracle: or.ok ? or.rings : null }));
    }
  });
}, 600000);
