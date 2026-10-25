// The known-answer stages compute (M0-d-06 fix round 1, check B-1): xoshiro.kat, dmath.kat and lanes.kat must digest
// the values xoshiro128**, dmath and LaneWriter COMPUTE from each case's inputs, never the vector files' expected
// columns — otherwise "every leg that agrees agrees with the C on both architectures" (legs.test.ts, C-0228 (3)) holds
// with nothing computed. The anchor: one case's expected value altered in a copy of the inputs leaves the stage's digest
// unchanged (the expected column is not read) and moves crossHostKatExpected away from it (the alteration is seen by
// the expected-column digest), in process and on every Node leg this machine runs, workers off and on.
import { describe, expect, it } from 'vitest';
import { CROSSHOST_KERNEL_STAGES, crossHostKatExpected, runCrossHost } from '@plat/testkit';
import { kernelFixture, RUN_TIMEOUT_MS, runnableNodeLegs } from './support.js';

type KatStage = 'xoshiro.kat' | 'dmath.kat' | 'lanes.kat';
const KAT_STAGES: readonly KatStage[] = ['xoshiro.kat', 'dmath.kat', 'lanes.kat'];

/** The last field of a vector file's first line with its lowest bit flipped (the expected column of that case). */
function flipFirstLineLastField(text: string): string {
  const lines = text.split('\n');
  const f = lines[0].split(' ');
  const last = f[f.length - 1];
  const d = Number.parseInt(last.slice(-1), 16) ^ 1;
  f[f.length - 1] = last.slice(0, -1) + d.toString(16);
  lines[0] = f.join(' ');
  return lines.join('\n');
}

/** A copy of the kernel fixture's inputs with one expected value of the stage's vector set altered. */
function altered(stage: KatStage, inputs: Readonly<Record<string, string>>): Record<string, string> {
  const out: Record<string, string> = { ...inputs };
  if (stage === 'xoshiro.kat') out['xoshiro/xoshiro128ss.txt'] = flipFirstLineLastField(out['xoshiro/xoshiro128ss.txt']);
  else if (stage === 'dmath.kat') out['fdlibm/pow.txt'] = flipFirstLineLastField(out['fdlibm/pow.txt']);
  else {
    const doc = JSON.parse(out['murmur/murmur3-x86-128.json']) as { lanes: { h128: number[] }[] };
    doc.lanes[0].h128[0] = (doc.lanes[0].h128[0] ^ 1) >>> 0;
    out['murmur/murmur3-x86-128.json'] = JSON.stringify(doc);
  }
  return out;
}

const stage = (id: KatStage) => {
  const s = CROSSHOST_KERNEL_STAGES.find((x) => x.id === id);
  if (s === undefined) throw new Error(id);
  return s;
};

describe('the known-answer stages digest computed values, not the expected columns', () => {
  it.each(KAT_STAGES)('%s: an altered expected value leaves the digest unchanged and moves the expected-column digest', (id) => {
    const clean = kernelFixture().inputs;
    const bad = altered(id, clean);
    expect(bad).not.toEqual(clean);
    const onClean = stage(id).run(0, { inputs: clean, carry: new Map() });
    const onBad = stage(id).run(0, { inputs: bad, carry: new Map() });
    // the clean anchor: computed = committed
    expect(onClean.model).toBe(crossHostKatExpected(id, clean));
    // the expected column is not read by the stage …
    expect(onBad.model).toBe(onClean.model);
    // … and the alteration is one the expected-column digest sees
    expect(crossHostKatExpected(id, bad)).not.toBe(onClean.model);
  });

  it(
    'on every Node leg here, workers off and on: the altered inputs give the clean cells, which differ from the altered expected digests',
    async () => {
      const legs = await runnableNodeLegs();
      expect(legs.length).toBeGreaterThanOrEqual(1);
      const k = kernelFixture();
      let bad: Record<string, string> = { ...k.inputs };
      for (const id of KAT_STAGES) bad = altered(id, bad);
      const report = await runCrossHost({ ...k, id: 'kat-anchor', source: 'kernel fixture, expected columns altered', seeds: [0], stages: [...KAT_STAGES], inputs: bad }, { legs });
      const ran = report.runs.filter((r) => r.status === 'ran');
      expect(ran.length).toBe(2 * legs.length);
      for (const r of ran) {
        expect(r.cells?.map((c) => c.stage)).toEqual([...KAT_STAGES]);
        for (const id of KAT_STAGES) {
          const cell = r.cells?.find((c) => c.stage === id);
          expect(cell?.error, `${r.leg}/${r.workers} ${id}`).toBeUndefined();
          expect(cell?.model, `${r.leg}/${r.workers} ${id}`).toBe(crossHostKatExpected(id, k.inputs));
          expect(cell?.model, `${r.leg}/${r.workers} ${id}`).not.toBe(crossHostKatExpected(id, bad));
        }
      }
    },
    RUN_TIMEOUT_MS,
  );
});
