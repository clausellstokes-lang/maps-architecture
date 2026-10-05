import { it } from 'vitest';
import { casesAt } from '@plat/testkit';
it('list', () => {
  const ops = new Map<string, Set<string>>();
  let n=0, inputs=0;
  for (const c of casesAt('M0')) { n++;
    const g = c.generate(1 as never) as any;
    if (g.kind !== 'input') continue; inputs++;
    for (const s of g.steps) { const k = s.op; if (!ops.has(k)) ops.set(k, new Set()); ops.get(k)!.add(c.id + ' ' + JSON.stringify(s.args)); }
  }
  console.log('cases', n, 'inputs', inputs);
  for (const [k, v] of ops) console.log(k, v.size, [...v].slice(0,3).join(' | '));
});
