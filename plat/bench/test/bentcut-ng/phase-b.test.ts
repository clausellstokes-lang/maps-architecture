// Phase b (M0-b-05; §16 M0 (b), §13.5, §13.8's T34-1 – T41-1 "on … NG's recorded shapes", C-0081, C-0086, C-0101,
// C-0116, C-0117), on a synthetic ng-faces.json and a synthetic baselines.json in memory. The listed tests: "phase b
// reads the faces through loadNgFaces and stops on a refused record naming it (its refusals tested in M0-k-05, C-0101);
// a missing file stops the run naming it"; "the corner and arrival shares on synthetic NG-shaped faces are computed by
// the same metric functions (metricVersion) as M0-b-04's"; "the report reproduces byte for byte (seeded)".
import { describe, expect, it, vi } from 'vitest';
import { cutArrival85, cutCornerMid, cutFillet, cutLengths, metricById, type Baseline } from '@plat/testkit';
import { signatureRow, signatureVersions } from '../../src/bentcut/index.js';
import { run, runNgTask, sigmaUnder, type NgComparisonReport, type NgRecord, type NgTask } from '../../src/bentcut-ng/index.js';
import { areaHistogram, baselinesText, got, lengthHistogram, MEM_ROOT, ngFacesText, ngFile, put, resetMem, row, scalar, threeFaces } from './support.js';

const mem = vi.hoisted(() => ({ root: '', files: new Map<string, Uint8Array>(), log: [] as { op: string; path: string; virtual: boolean }[] }));
vi.mock('node:fs', async (orig) => (await import('./memfs.js')).memFs(await orig<typeof import('node:fs')>(), mem));

const RULE = ['--frame', 'recorded', '--attempts', '3'];
const FLAT = ['--flatten', '0.7:0.7:0.1'];

/** Runs the entry, capturing its printed lines and its report. */
async function entry(args: string[], runNg?: (t: NgTask) => NgRecord): Promise<{ code: number; lines: string; report: NgComparisonReport | undefined }> {
  const spy = vi.spyOn(process.stdout, 'write').mockImplementation(() => true);
  let report: NgComparisonReport | undefined;
  try {
    const code = await run(args, { out: `${MEM_ROOT}/out`, platRoot: MEM_ROOT, onReport: (r) => (report = r), ...(runNg === undefined ? {} : { runNg }) });
    return { code, lines: spy.mock.calls.map((c) => String(c[0])).join(''), report };
  } finally {
    spy.mockRestore();
  }
}

function planted(): Baseline[] {
  return [row('cut.sigma', 'plain', scalar(0.084)), row('cut.sigma', 'ring', scalar(0.094)), row('cut.fillet', 'all', scalar(0.538))];
}

describe('phase b reads the faces through loadNgFaces', () => {
  it('stops on a refused record naming it (exit 2, no report)', async () => {
    resetMem(mem);
    const base = put(mem, 'b/baselines.json', baselinesText(planted()));
    const f = ngFile(threeFaces()) as unknown as { faces: Record<string, unknown>[] };
    delete f.faces[1]['referenceBuild'];
    const faces = put(mem, 'b/ng-faces.json', JSON.stringify(f));
    const r = await entry(['--phase', 'b', ...RULE, ...FLAT, '--baselines', base, '--faces', faces]);
    expect(r.code).toBe(2);
    expect(r.report).toBeUndefined();
    expect(r.lines).toContain('bentcut-ng stopped:');
    expect(r.lines).toContain('faces[1] (id 8): referenceBuild missing');
    expect(r.lines).toContain(`${MEM_ROOT}/b/ng-faces.json`);
    expect(got(mem, 'out/bentcut-ng/report-b.json')).toBeUndefined();
    // A non-integer coordinate, likewise.
    const g = ngFile(threeFaces()) as unknown as { faces: { ringCm: number[][] }[] };
    g.faces[2].ringCm[1][0] += 0.5;
    put(mem, 'b/ng-faces.json', JSON.stringify(g));
    const r2 = await entry(['--phase', 'b', ...RULE, ...FLAT, '--baselines', base, '--faces', faces]);
    expect([r2.code, r2.lines.includes('faces[2].ringCm[1][0]: 268000.5 is not an integer')]).toEqual([2, true]);
  });

  it('a missing file stops the run naming it — ng-faces.json, and baselines.json (T-RIG-1)', async () => {
    resetMem(mem);
    const base = put(mem, 'b/baselines.json', baselinesText(planted()));
    const r = await entry(['--phase', 'b', ...RULE, ...FLAT, '--baselines', base, '--faces', 'b/none/ng-faces.json']);
    expect([r.code, r.lines.includes('b/none/ng-faces.json: missing file')]).toEqual([2, true]);
    put(mem, 'b/ng-faces.json', ngFacesText(ngFile(threeFaces())));
    const r2 = await entry(['--phase', 'b', ...RULE, ...FLAT, '--baselines', 'b/none/baselines.json', '--faces', 'b/ng-faces.json']);
    expect([r2.code, r2.lines.includes('b/none/baselines.json: missing file')]).toEqual([2, true]);
    // An unreadable baseline row stops it naming the file and the row.
    const bad = planted();
    delete (bad[1] as Partial<Baseline>).capture;
    put(mem, 'b/bad.json', baselinesText(bad));
    const r3 = await entry(['--phase', 'b', ...RULE, ...FLAT, '--baselines', 'b/bad.json', '--faces', 'b/ng-faces.json']);
    expect([r3.code, r3.lines.includes('b/bad.json: row "test/ng/cut.sigma/ring": unreadable row: lacks capture (T-RIG-1)')]).toEqual([2, true]);
    // A path outside plat/ is refused before anything is opened.
    const r4 = await entry(['--phase', 'b', ...RULE, ...FLAT, '--baselines', '/etc/hostname', '--faces', 'b/ng-faces.json']);
    expect([r4.code, r4.lines.includes('lies outside plat/')]).toEqual([2, true]);
    expect(mem.log.some((e) => e.path === '/etc/hostname' && e.op === 'read')).toBe(false);
  });
});

describe('phase b on synthetic NG-shaped faces', () => {
  it('runs T34-1 – T41-1, measures with M0-b-04\'s metric functions, judges every gating clause, and reproduces byte for byte', { timeout: 600_000 }, async () => {
    resetMem(mem);
    const faces = threeFaces();
    put(mem, 'b/ng-faces.json', ngFacesText(ngFile(faces)));
    // First run: no row but σ's — the KS and fillet cells read their ⟨M-1⟩ verdicts (fail when missing).
    put(mem, 'b/baselines.json', baselinesText(planted()));
    const records: NgRecord[] = [];
    const capture = (t: NgTask): NgRecord => {
      const r = runNgTask(t);
      if (t.flattenM === undefined) records.push(r);
      return r;
    };
    const args = ['--phase', 'b', ...RULE, ...FLAT, '--seeds', '1', '--baselines', 'b/baselines.json', '--faces', 'b/ng-faces.json'];
    const one = await entry(args, capture);
    const r = one.report as NgComparisonReport;
    expect(one.code).toBe(1);
    expect(records.map((x) => [x.faceId, x.setup, x.refused, x.replayed])).toEqual([
      [7, null, null, true],
      [8, null, null, true],
      [9, null, null, true],
    ]);
    // T34-1 – T41-1 on the faces: each checked and holding.
    for (const b of ['T34-1', 'T36-1', 'T37-1', 'T38-1', 'T39-1', 'T40-1', 'T41-1']) {
      const c = r.clauses.find((x) => x.id === b);
      expect([b, c?.verdict, c?.gating]).toEqual([b, 'pass', true]);
      expect(r.tbars?.[b as 'T34-1'].checked).toBeGreaterThan(0);
    }
    // The same metric functions as M0-b-04's (one metricVersion each): the signature row is M0-b-04's signatureRow over
    // the measured cuts, and the absolute clauses read it.
    const cuts = records.flatMap((x) => x.cuts);
    expect(r.ours.metricVersions).toEqual(signatureVersions());
    for (const id of ['cut.sigma', 'cut.cornerMid', 'cut.arrival85', 'cut.fillet']) expect(r.ours.metricVersions[id]).toBe(metricById(id)?.metricVersion);
    expect(r.ours.signature).toEqual(signatureRow(cuts));
    const doc = { ways: [], cuts };
    expect(r.clauses.find((c) => c.id === 'corner')?.ours).toBe(cutCornerMid(doc).get('all'));
    expect(r.clauses.find((c) => c.id === 'arrival')?.ours).toBe(cutArrival85(doc).get('all'));
    expect(r.ours.sigmaUnderRule['plain']).toBe(sigmaUnder(cuts, { frame: 'recorded', attempts: 3 }).get('plain'));
    expect(r.ngRecorded).toMatchObject({ faces: 3, hoods: 3, cuts: 9, oneBend: 6 / 9, fillet: 3 / 6, arrival85: 1 });
    // The ⟨M-1⟩ distributions without their rows fail, naming the missing row.
    const ks = r.clauses.filter((c) => c.metric === 'cut.length' || c.metric === 'block.area');
    expect(ks.length).toBeGreaterThanOrEqual(2);
    for (const c of ks) expect([c.id, c.verdict, c.gating, c.note?.startsWith('⟨M-1⟩ row missing')]).toEqual([c.id, 'fail', true, true]);
    // The run's gate: the fillet against its row; the flatten search ran over one value.
    expect(r.flatten?.candidates.map((c) => c.flattenM)).toEqual([0.7]);
    expect(r.clauses.find((c) => c.id === 'flatten')?.verdict).toBe(r.flatten?.verdict === 'met' ? 'pass' : 'fail');

    // Second run, the rows planted at ours: every gating clause holds — exit 0.
    const lengths = cutLengths(doc);
    const built = (c: string) => c !== 'square' && c !== 'green' && c !== 'yard';
    const blocks = records.flatMap((x) => x.blocks.filter((b) => built(b.content)).map((b) => ({ ring: b.ring, template: x.template })));
    const area = (ring: readonly { x: number; y: number }[]) => {
      let s = 0;
      for (let i = 0; i < ring.length; i += 1) {
        const p = ring[i];
        const q = ring[(i + 1) % ring.length];
        s += p.x * q.y - q.x * p.y;
      }
      return Math.abs(s) / 2 / 10_000;
    };
    const areaRows = (['all', 'template-area', 'template-ring', 'template-street'] as const).map((k) =>
      row('block.area', k, areaHistogram(blocks.filter((b) => k === 'all' || `template-${b.template}` === k).map((b) => area(b.ring))), { spreadKS: { p90: 0.4, pairs: 190 } }),
    );
    const lengthRows = [...lengths.keys()].map((k) => row('cut.length', k, lengthHistogram(lengths.get(k) ?? []), { spreadKS: { p90: 0.4, pairs: 190 } }));
    const sig = r.ours.sigmaUnderRule;
    const rows = [
      row('cut.sigma', 'plain', scalar(sig['plain'] ?? 0)),
      row('cut.sigma', 'ring', scalar(sig['ring'] ?? 0)),
      row('cut.fillet', 'all', scalar(cutFillet(doc).get('all') ?? 0)),
      row('cut.cornerMid', 'all', scalar(0.883)),
      row('cut.arrival85', 'all', scalar(0.974)),
      ...lengthRows,
      ...areaRows,
    ];
    put(mem, 'b/baselines.json', baselinesText(rows));
    const two = await entry(args);
    expect(two.report?.failing).toEqual([]);
    expect(two.code).toBe(0);
    expect(two.report?.clauses.filter((c) => c.gating && c.metric === 'block.area').map((c) => c.verdict)).toEqual(['pass', 'pass', 'pass', 'pass']);
    // Byte for byte: the same inputs and seed, the same report.
    const text = got(mem, 'out/bentcut-ng/report-b.json');
    const three = await entry(args);
    expect(three.code).toBe(0);
    expect(got(mem, 'out/bentcut-ng/report-b.json')).toBe(text);
    // A different seed changes our side (the report is seeded, not fixed).
    const four = await entry([...args.slice(0, args.indexOf('--seeds')), '--seed', '2', ...args.slice(args.indexOf('--seeds'))]);
    expect(four.report?.ours.signature).not.toEqual(two.report?.ours.signature);
    // Every file the runs opened lay inside plat/ and was the memory's: the inputs synthetic and in memory.
    expect(mem.log.length).toBeGreaterThan(0);
    for (const e of mem.log) expect([e.op, e.path === MEM_ROOT || e.path.startsWith(`${MEM_ROOT}/`), e.virtual]).toEqual([e.op, true, true]);
    const reads = new Set(mem.log.filter((e) => e.op === 'read').map((e) => e.path));
    expect([...reads].sort()).toEqual([`${MEM_ROOT}/b/baselines.json`, `${MEM_ROOT}/b/ng-faces.json`]);
  });
});
