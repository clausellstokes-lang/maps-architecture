// Phase b (M0-b-05; §16 M0 (b), §13.5, §13.8's T34-1 – T41-1 "on … NG's recorded shapes", C-0081, C-0086, C-0101,
// C-0116, C-0117), on a synthetic ng-faces.json and a synthetic baselines.json in memory. The listed tests: "phase b
// reads the faces through loadNgFaces and stops on a refused record naming it (its refusals tested in M0-k-05, C-0101);
// a missing file stops the run naming it"; "the corner and arrival shares on synthetic NG-shaped faces are computed by
// the same metric functions (metricVersion) as M0-b-04's"; "the report reproduces byte for byte (seeded)".
import { describe, expect, it, vi } from 'vitest';
import { H128, utf8Bytes } from '@plat/kernel';
import { cutArrival85, cutCornerMid, cutFillet, cutLengths, metricById, type Baseline } from '@plat/testkit';
import { FRAME_HALF_CM, signatureRow, signatureVersions } from '../../src/bentcut/index.js';
import {
  ARRIVAL_MIN,
  bendRowOf,
  CORNER_MIN,
  flattenFold,
  judgeB,
  run,
  runNgTask,
  sigmaUnder,
  T_BARS,
  type BaselinesInput,
  type FrameRule,
  type NgComparisonReport,
  type NgOurCut,
  type NgRecord,
  type NgTask,
  type TChecks,
} from '../../src/bentcut-ng/index.js';
import { areaHistogram, baselinesText, got, lengthHistogram, MEM_ROOT, ngFace, ngFacesText, ngFile, PLANTED_CUTS, put, rect, resetMem, row, scalar, threeFaces } from './support.js';

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
    expect(r.ngRecorded).toEqual({ faces: 3, hoods: 3, cuts: 9, oneBend: 6 / 9, cornerMidCourse: 1, fillet: 3 / 6, arrival85: 1 });
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

// Phase b's gate on planted records (fix round 1 of the check, F-1 – F-3): judgeB is pure, so each gating clause is shown
// failing the run on its own break, and the gating set is pinned whole (C-0256 (4); §16 M0 (b); C-0073; C-0256 (7)).
describe('phase b\'s gate (judgeB on planted records)', () => {
  const RULE_B: FrameRule = { frame: 'recorded', attempts: 3 };
  const HOLE = [{ x: 3_000, y: 2_000 }, { x: 3_000, y: 3_000 }, { x: 4_000, y: 3_000 }, { x: 4_000, y: 2_000 }];
  const NG = ngFile([ngFace(1, [rect(9_000, 5_000)], 'street', PLANTED_CUTS), ngFace(2, [rect(9_000, 5_000), HOLE], 'ring', PLANTED_CUTS, 2)]);
  const NG_FILE = { path: '.mem-bentcut-ng/b/ng-faces.json', sha256: '0'.repeat(64), bytes: 1 };
  const OK_CHECKS = Object.fromEntries(T_BARS.map((b) => [b, { checked: 2, failed: 0, first: [] }])) as unknown as TChecks;

  /** A planted cut of ours: bent ones at mid-course unless `offMid`, arriving square unless `low`. */
  function cut(face: 1 | 2, i: number, bent: boolean, offMid: boolean, low: boolean): NgOurCut {
    const startT = 0.5 + 0.01 * (i - 6) * (face === 1 ? 1 : 1.5);
    return {
      faceKind: face === 1 ? 'plain' : 'ring',
      template: face === 1 ? 'street' : 'ring',
      startT,
      startT0: startT,
      bends: bent ? 1 : 0,
      ...(bent ? { cornerT: offMid ? 0.75 : 0.5 } : {}),
      arrivalCdeg: low ? 8_000 : 9_000,
      arrivalChordCdeg: low ? 8_000 : 9_000,
      fillet: bent && i % 2 === 0,
      lengthCm: 3_000 + 250 * i,
      kind: face === 1 ? 'concave' : 'holed',
      attempt: 0,
      turnCdeg: 0,
      wMinCm: 600,
    } as NgOurCut;
  }

  const box = (x: number, y: number, w: number, h: number) => [{ x, y }, { x: x + w, y }, { x: x + w, y: y + h }, { x, y: y + h }];

  /** The planted records: per face 12 cuts (10 bent, 2 straight), 2 built blocks, every bar checked twice. */
  function records(o: { offMid?: number; low?: number; checks?: (face: number) => TChecks | null } = {}): NgRecord[] {
    let offMid = o.offMid ?? 0;
    let low = o.low ?? 0;
    return ([1, 2] as const).map((face) => {
      const cuts: NgOurCut[] = [];
      for (let i = 0; i < 12; i += 1) {
        const bent = i < 10;
        const off = bent && offMid > 0;
        if (off) offMid -= 1;
        const lo = low > 0;
        if (lo) low -= 1;
        cuts.push(cut(face, i, bent, off, lo));
      }
      return {
        faceId: face,
        template: face === 1 ? 'street' : 'ring',
        holed: face === 2,
        seedIndex: 0,
        flattenM: null,
        setup: null,
        refused: null,
        replayed: true,
        cuts,
        blocks: [{ ring: box(0, 0, 4_000, 3_000), content: 'ordinary' }, { ring: box(5_000, 0, 3_000, 2_500), content: 'ordinary' }],
        missed: 0,
        checks: o.checks === undefined ? OK_CHECKS : o.checks(face),
      };
    });
  }

  const ALL_CUTS = records().flatMap((r) => r.cuts);
  const SIG = sigmaUnder(ALL_CUTS, RULE_B);
  const FILLET = cutFillet({ ways: [], cuts: ALL_CUTS }).get('all') as number;

  function baselines(rows: Baseline[]): BaselinesInput {
    const text = baselinesText(rows);
    return { rows, info: [], hash: H128(utf8Bytes(text)), file: { path: '.mem-bentcut-ng/b/baselines.json', sha256: '0'.repeat(64), bytes: text.length } };
  }

  const DESC_SAMPLE = { family: 'test/plain', indices: [0, 1] as [0, number], failed: [{ index: 0, reason: 'not reproducible' }] };
  const KS_KEYS = { 'cut.length': ['all', 'plain', 'ring', 'template-ring', 'template-street'], 'block.area': ['all', 'template-ring', 'template-street'] };

  /** The rows every clause passes on: σ and the fillet at ours, the corner and arrival rows beside, the KS cells descriptive. */
  function rows(o: { sigmaRing?: number | null; sigmaPlain?: number | null; fillet?: number } = {}): Baseline[] {
    const out: Baseline[] = [];
    if (o.sigmaPlain !== null) out.push(row('cut.sigma', 'plain', scalar(o.sigmaPlain ?? (SIG.get('plain') as number))));
    if (o.sigmaRing !== null) out.push(row('cut.sigma', 'ring', scalar(o.sigmaRing ?? (SIG.get('ring') as number))));
    out.push(row('cut.fillet', 'all', scalar(o.fillet ?? FILLET)), row('cut.cornerMid', 'all', scalar(0.88)), row('cut.arrival85', 'all', scalar(0.97)));
    for (const [metric, keys] of Object.entries(KS_KEYS)) for (const k of keys) out.push(row(metric, k, { n: 0, seeds: 0 }, { role: 'descriptive', sample: DESC_SAMPLE }));
    return out;
  }

  const ROW = bendRowOf(NG.faces);
  const flat = (bent: number) => flattenFold(ROW, { lo: 0.7, hi: 0.7, step: 0.1 }, [0.7], [[{ ...records()[0], cuts: [cut(1, 0, bent > 0, false, false), cut(1, 1, bent > 1, false, false), cut(1, 2, false, false, false)] }]], 0.7);
  const MET = flat(2);

  function judge(o: { rows?: Baseline[]; records?: NgRecord[]; flatten?: ReturnType<typeof flattenFold> | null } = {}): NgComparisonReport {
    return judgeB({ baselines: baselines(o.rows ?? rows()), rule: RULE_B, ng: NG, ngFile: NG_FILE, records: o.records ?? records(), seed: 1, seeds: 1, flatten: o.flatten === undefined ? MET : o.flatten });
  }

  it('the planted run passes, and its gating clauses are exactly the ones C-0256 (4) names', () => {
    expect([ROW.value, MET.verdict]).toEqual([2 / 3, 'met']);
    const r = judge();
    expect([r.pass, r.failing]).toEqual([true, []]);
    expect(r.clauses.filter((c) => c.gating).map((c) => c.id)).toEqual([
      'run',
      'replay',
      'cut.sigma/plain',
      'cut.sigma/ring',
      'cut.fillet/all',
      'cut.length/all',
      'cut.length/plain',
      'cut.length/ring',
      'cut.length/template-ring',
      'cut.length/template-street',
      'block.area/all',
      'block.area/template-ring',
      'block.area/template-street',
      'corner',
      'arrival',
      'T34-1',
      'T36-1',
      'T37-1',
      'T38-1',
      'T39-1',
      'T40-1',
      'T41-1',
      'flatten',
    ]);
    // Measured but not gating: σ over all cuts and per template, the corner and arrival rows beside, the fillet subsets.
    for (const id of ['cut.sigma/all', 'cut.sigma/template-street', 'cut.cornerMid/all', 'cut.arrival85/all', 'cut.fillet/plain']) expect([id, r.clauses.find((c) => c.id === id)?.gating]).toEqual([id, false]);
  });

  it('the fillet share outside ± 0.05 of its row fails the run (inside passes)', () => {
    expect(judge({ rows: rows({ fillet: FILLET + 0.06 }) }).failing).toEqual(['cut.fillet/all']);
    expect(judge({ rows: rows({ fillet: FILLET - 0.06 }) }).failing).toEqual(['cut.fillet/all']);
    expect(judge({ rows: rows({ fillet: FILLET + 0.04 }) }).pass).toBe(true);
  });

  it('the corner clause: ≥ 0.80 of bent cuts within 0.10 of mid-course — 16 of 20 pass, 15 of 20 fail (F-2)', () => {
    expect(CORNER_MIN).toBe(0.8);
    const at = judge({ records: records({ offMid: 4 }) });
    const c = at.clauses.find((x) => x.id === 'corner');
    expect([c?.ours, c?.reference, c?.verdict, c?.gating, at.pass]).toEqual([0.8, 0.8, 'pass', true, true]);
    const below = judge({ records: records({ offMid: 5 }) });
    expect([below.clauses.find((x) => x.id === 'corner')?.ours, below.pass, below.failing]).toEqual([0.75, false, ['corner']]);
  });

  it('the arrival clause: ≥ 0.95 of cuts at ≥ 85° — 23 of 24 pass, 22 of 24 fail', () => {
    expect(ARRIVAL_MIN).toBe(0.95);
    const ok = judge({ records: records({ low: 1 }) });
    expect([ok.clauses.find((x) => x.id === 'arrival')?.reference, ok.pass]).toEqual([0.95, true]);
    const below = judge({ records: records({ low: 2 }) });
    expect([below.pass, below.failing]).toEqual([false, ['arrival']]);
  });

  it('σ on ring faces (and on plain ones) out of its ± 0.02 band, or without a row, fails the run', () => {
    expect(judge({ rows: rows({ sigmaRing: (SIG.get('ring') as number) + 0.03 }) }).failing).toEqual(['cut.sigma/ring']);
    expect(judge({ rows: rows({ sigmaRing: (SIG.get('ring') as number) + 0.015 }) }).pass).toBe(true);
    const none = judge({ rows: rows({ sigmaRing: null }) });
    expect([none.failing, none.clauses.find((c) => c.id === 'cut.sigma/ring')?.verdict]).toEqual([['cut.sigma/ring'], 'missingBaseline']);
    expect(judge({ rows: rows({ sigmaPlain: (SIG.get('plain') as number) - 0.03 }) }).failing).toEqual(['cut.sigma/plain']);
    expect(judge({ rows: rows({ sigmaPlain: null }) }).failing).toEqual(['cut.sigma/plain']);
  });

  it('a cut.flattenM search that misses its row (or never ran) fails the run', () => {
    const miss = flat(0);
    expect(miss.verdict).toBe('notMet');
    const r = judge({ flatten: miss });
    expect([r.failing, r.clauses.find((c) => c.id === 'flatten')?.verdict]).toEqual([['flatten'], 'fail']);
    const none = judge({ flatten: null });
    expect([none.failing, none.clauses.find((c) => c.id === 'flatten')?.verdict]).toEqual([['flatten'], 'notApplicable']);
  });

  it('one NG face refused at setup (beyond the bench frame), or refused by S8, fails the run clause', () => {
    const wide = ngFace(3, [rect(2 * (FRAME_HALF_CM - 10_000) + 2, 1_000)], 'street', PLANTED_CUTS);
    const refused = runNgTask({ face: wide, seed: 1, seedIndex: 0, bars: true });
    expect(refused.setup).toContain('beyond the bench frame');
    const r = judge({ records: [...records(), refused] });
    expect([r.pass, r.failing, r.clauses[0].note?.startsWith('3 faces: 1 not built')]).toEqual([false, ['run'], true]);
    const s8 = { ...records()[1], faceId: 4, cuts: [], blocks: [], checks: null, replayed: false, refused: 'E_TEST planted' };
    expect(judge({ records: [...records(), s8] }).failing).toEqual(['run']);
  });

  it('a ring face whose run cuts nothing: cut.sigma/ring reads notApplicable, gating, and fails the run (hardening S1, note 9; C16)', () => {
    // NG's file holds a plain and a ring face; ours cuts nothing on the ring face (its blocks stand). M0-k-05's registry
    // emits no ring σ entry, so only judgeB's missingKey loop keeps the ring key in the gate.
    const recs = records().map((r) => (r.faceId === 2 ? { ...r, cuts: [] } : r));
    const plainCuts = recs[0].cuts;
    const fillet = cutFillet({ ways: [], cuts: plainCuts }).get('all') as number;
    const r = judge({ records: recs, rows: rows({ fillet }) });
    const ring = r.clauses.filter((c) => c.id === 'cut.sigma/ring');
    expect(ring.map((c) => [c.verdict, c.gating, c.ours, c.note])).toEqual([['notApplicable', true, null, 'ours: no ring cut under the frame rule']]);
    expect([r.pass, r.failing]).toEqual([false, ['cut.sigma/ring']]);
    // The same run with no ring face in NG's file: no ring key is gated, and the run passes.
    const plainOnly = judgeB({ baselines: baselines(rows({ fillet })), rule: RULE_B, ng: { ...NG, faces: [NG.faces[0]] }, ngFile: NG_FILE, records: [recs[0]], seed: 1, seeds: 1, flatten: MET });
    expect([plainOnly.pass, plainOnly.clauses.some((c) => c.id === 'cut.sigma/ring')]).toEqual([true, false]);
  });

  it('the replay clause: a planner cut the replay missed, or a district not replayed, fails the run (hardening S1, note 7)', () => {
    const ok = judge().clauses.find((c) => c.id === 'replay');
    expect(ok).toMatchObject({ verdict: 'pass', gating: true, ours: 0, reference: 0, band: { hi: 0 }, note: "2 districts measured: 0 not replayed (S8's own run stood, its cuts unmeasured); 0 of 24 planner cuts missed by the replay (the bound 0)" });
    const missed = judge({ records: records().map((r) => (r.faceId === 1 ? { ...r, missed: 1 } : r)) });
    expect([missed.pass, missed.failing]).toEqual([false, ['replay']]);
    expect(missed.clauses.find((c) => c.id === 'replay')).toMatchObject({ verdict: 'fail', ours: 1 / 25, note: "2 districts measured: 0 not replayed (S8's own run stood, its cuts unmeasured); 1 of 25 planner cuts missed by the replay (the bound 0)" });
    const s8own = { ...records()[1], faceId: 3, replayed: false, cuts: [], blocks: [] };
    const nr = judge({ records: [...records(), s8own] });
    expect([nr.pass, nr.failing, nr.clauses.find((c) => c.id === 'replay')?.note]).toEqual([false, ['replay'], "3 districts measured: 1 not replayed (S8's own run stood, its cuts unmeasured); 0 of 24 planner cuts missed by the replay (the bound 0)"]);
  });

  it('a T-bar with no check reads notApplicable and fails the gate; a failed check fails it (F-3)', () => {
    // Records whose checks are null (no run checked anything): every bar but T41-1 (its registry clause runs once per
    // report) reads notApplicable, never pass.
    const none = judge({ records: records({ checks: () => null }) });
    expect(none.failing).toEqual(['T34-1', 'T36-1', 'T37-1', 'T38-1', 'T39-1', 'T40-1']);
    for (const b of ['T34-1', 'T36-1', 'T37-1', 'T38-1', 'T39-1', 'T40-1']) expect([b, none.clauses.find((c) => c.id === b)?.verdict, none.tbars?.[b as 'T34-1'].checked]).toEqual([b, 'notApplicable', 0]);
    expect(none.clauses.find((c) => c.id === 'T41-1')?.verdict).toBe('pass');
    // One bar with checked 0 on every record.
    const zero = { ...OK_CHECKS, 'T37-1': { checked: 0, failed: 0, first: [] } };
    expect(judge({ records: records({ checks: () => zero }) }).failing).toEqual(['T37-1']);
    // A failed check on one face fails its bar.
    const failed = { ...OK_CHECKS, 'T38-1': { checked: 2, failed: 1, first: ['planted'] } };
    const f = judge({ records: records({ checks: (face) => (face === 2 ? failed : OK_CHECKS) }) });
    expect([f.failing, f.clauses.find((c) => c.id === 'T38-1')?.verdict]).toEqual([['T38-1'], 'fail']);
  });
});
