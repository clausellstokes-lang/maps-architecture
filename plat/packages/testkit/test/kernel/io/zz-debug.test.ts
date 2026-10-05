import { readFileSync } from 'node:fs';
import { it } from 'vitest';
import { compactSlots, outgoing, isVertexLive, type Plat } from '@plat/kernel';
import { fixtureSequence, fixtureSequences, runBatch } from '../../../src/determinism/index.js';
const SEQ = fixtureSequences(JSON.parse(readFileSync(new URL('../../../../kernel/test/tx/fixtures/sequences.json', import.meta.url), 'utf8'))).map(fixtureSequence);
function bad(p: Plat): string[] { const o: string[] = []; for (let v = 0; v < p.slots.vertex.top; v++) { if (!isVertexLive(p, v)) continue; try { outgoing(p, v); } catch (e) { o.push(`${v} ${p.vertices.x[v]},${p.vertices.y[v]} out=${p.vertices.out[v]} ${(e as Error).message}`); } } return o; }
it('debug', () => {
  const seq = SEQ.find((s) => s.name.startsWith('contact names placed'))!;
  const p0 = seq.arena();
  runBatch(p0, seq.batches[0].build(p0));
  console.log('orig bad', bad(p0), 'tops', p0.slots.vertex, p0.slots.pair, 'origin.len', p0.halfEdges.origin.length);
  for (let v = 0; v < p0.slots.vertex.top; v++) console.log('v', v, p0.vertices.x[v], p0.vertices.y[v], 'out', p0.vertices.out[v], 'deg', isVertexLive(p0, v) ? outgoing(p0, v).length : -1);
  const q = compactSlots(p0);
  console.log('compact bad', bad(q), 'tops', q.slots.vertex, q.slots.pair, 'origin.len', q.halfEdges.origin.length);
});
