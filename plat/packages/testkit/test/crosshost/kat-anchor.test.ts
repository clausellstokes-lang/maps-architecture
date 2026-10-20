// The known-answer stages compute (M0-d-06 fix round 1, check B-1): xoshiro.kat, dmath.kat and lanes.kat must digest
// the values xoshiro128**, dmath and LaneWriter COMPUTE from each case's inputs, never the vector files' expected
// columns — otherwise "every leg that agrees agrees with the C on both architectures" (legs.test.ts, C-0228 (3)) holds
// with nothing computed. The anchor: every expected value altered in a copy of the inputs (round S1) leaves the stage's digest
// unchanged (the expected column is not read) and moves crossHostKatExpected away from it (the alteration is seen by
// the expected-column digest), in process and on every Node leg this machine runs, workers off and on.
import { describe, expect, it } from 'vitest';
import { CROSSHOST_DMATH_ROUTINES, CROSSHOST_KERNEL_STAGES, CROSSHOST_LANES_FILE, CROSSHOST_XOSHIRO_FILES, crossHostKatExpected, runCrossHost } from '@plat/testkit';
import { kernelFixture, RUN_TIMEOUT_MS, runnableNodeLegs } from './support.js';

type KatStage = 'xoshiro.kat' | 'dmath.kat' | 'lanes.kat';
const KAT_STAGES: readonly KatStage[] = ['xoshiro.kat', 'dmath.kat', 'lanes.kat'];

// Hardening round S1, row 9 (checks/M0-d-06-notes.md note 9): the anchor once altered only the first case of each
// set, so a stage reading the expected column for the other cases (the long xoshiro vectors, six of dmath's seven
// routines, the lane counts, any line's first word) passed. Now EVERY expected value of EVERY vector file is altered.

/** A hexadecimal word with its lowest bit flipped. */
function flipLowBit(hex: string): string {
  const d = Number.parseInt(hex.slice(-1), 16) ^ 1;
  return hex.slice(0, -1) + d.toString(16);
}

/** An f64's bits altered so the digest sees it: the lowest bit flipped, a NaN (one digest word for all) made 1.0. */
function alterF64(hex: string): string {
  const hi = Number.parseInt(hex.slice(0, 8), 16);
  const lo = Number.parseInt(hex.slice(8), 16);
  const nan = (hi & 0x7ff00000) === 0x7ff00000 && ((hi & 0x000fffff) !== 0 || lo !== 0);
  return nan ? '3ff0000000000000' : flipLowBit(hex);
}

/** Every line's fields from `from` on altered by `alter` (a vector file's expected column). */
function alterColumns(text: string, from: (fields: readonly string[]) => number, alter: (hex: string) => string): string {
  return text
    .split('\n')
    .map((line) => {
      if (line === '') return line;
      const f = line.split(' ');
      const k = from(f);
      return f.map((x, i) => (i >= k ? alter(x) : x)).join(' ');
    })
    .join('\n');
}

/** The vector files each known-answer stage reads. */
const FILES: Readonly<Record<KatStage, readonly string[]>> = {
  'xoshiro.kat': CROSSHOST_XOSHIRO_FILES,
  'dmath.kat': CROSSHOST_DMATH_ROUTINES.map(([n]) => `fdlibm/${n}.txt`),
  'lanes.kat': [CROSSHOST_LANES_FILE],
};

/** A vector file with every expected value altered: each output word's or result's lowest bit, each lane count + 1, each h128 word ^ 1. */
function alterFile(name: string, text: string): string {
  if (name === 'xoshiro/xoshiro128ss.txt') return alterColumns(text, () => 4, flipLowBit);
  if (name === 'xoshiro/xoshiro128ss-long.txt') return alterColumns(text, () => 5, flipLowBit);
  if (name.startsWith('fdlibm/')) return alterColumns(text, (f) => f.length - 1, alterF64);
  const doc = JSON.parse(text) as { lanes: { lanes: number; h128: number[] }[] };
  for (const v of doc.lanes) {
    v.lanes += 1;
    v.h128 = v.h128.map((h) => (h ^ 1) >>> 0);
  }
  return JSON.stringify(doc);
}

/** A copy of the inputs with every expected value of the given files altered. */
function alteredFiles(names: readonly string[], inputs: Readonly<Record<string, string>>): Record<string, string> {
  const out: Record<string, string> = { ...inputs };
  for (const n of names) out[n] = alterFile(n, out[n]);
  return out;
}

/** A copy of the kernel fixture's inputs with every expected value of the stage's vector files altered. */
function altered(stage: KatStage, inputs: Readonly<Record<string, string>>): Record<string, string> {
  return alteredFiles(FILES[stage], inputs);
}

const stage = (id: KatStage) => {
  const s = CROSSHOST_KERNEL_STAGES.find((x) => x.id === id);
  if (s === undefined) throw new Error(id);
  return s;
};

describe('the known-answer stages digest computed values, not the expected columns', () => {
  it.each(KAT_STAGES)('%s: every expected value altered leaves the digest unchanged and moves the expected-column digest', (id) => {
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

  it.each(KAT_STAGES)('%s: each of its vector files altered alone, every line of it, leaves the digest unchanged', (id) => {
    const clean = kernelFixture().inputs;
    const want = crossHostKatExpected(id, clean);
    for (const file of FILES[id]) {
      const bad = alteredFiles([file], clean);
      const before = clean[file].split('\n');
      const after = bad[file].split('\n');
      // every case of the file is altered (the JSON file: every vector's count and h128)
      if (file.endsWith('.txt')) {
        expect(after.length, file).toBe(before.length);
        for (let i = 0; i < before.length; i += 1) if (before[i] !== '') expect(after[i], `${file}:${String(i + 1)}`).not.toBe(before[i]);
      }
      expect(stage(id).run(0, { inputs: bad, carry: new Map() }).model, file).toBe(want);
      expect(crossHostKatExpected(id, bad), file).not.toBe(want);
    }
  });

  it('the alteration reaches every expected value: each lane vector, each fdlibm line, both xoshiro sets', () => {
    const clean = kernelFixture().inputs;
    const lanesBefore = (JSON.parse(clean[CROSSHOST_LANES_FILE]) as { lanes: { lanes: number; h128: number[] }[] }).lanes;
    const lanesAfter = (JSON.parse(alterFile(CROSSHOST_LANES_FILE, clean[CROSSHOST_LANES_FILE])) as { lanes: { lanes: number; h128: number[] }[] }).lanes;
    expect(lanesAfter.length).toBe(lanesBefore.length);
    for (let i = 0; i < lanesBefore.length; i += 1) {
      expect(lanesAfter[i].lanes).toBe(lanesBefore[i].lanes + 1);
      expect(lanesAfter[i].h128.every((h, j) => h !== lanesBefore[i].h128[j])).toBe(true);
    }
    const long = alterFile('xoshiro/xoshiro128ss-long.txt', clean['xoshiro/xoshiro128ss-long.txt']).split('\n');
    clean['xoshiro/xoshiro128ss-long.txt'].split('\n').forEach((line, i) => {
      if (line === '') return;
      const a = line.split(' ');
      const b = long[i].split(' ');
      expect(b.slice(0, 5)).toEqual(a.slice(0, 5));
      for (let j = 5; j < a.length; j += 1) expect(b[j]).not.toBe(a[j]);
    });
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
