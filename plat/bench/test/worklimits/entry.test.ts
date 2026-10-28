// The bench entry `corepack pnpm bench -- worklimits` (M0-f-03b; C-0021, C-0067, C-0091, C-0105: a vitest test spawns
// no script — the entry's `run` is called in-process, its output redirected to a temporary folder, every file access
// through a recording `io`; C-0114: the harness's tests live in bench/test/worklimits/). The item's four tests:
// the coefficients are reproducible from the same reports (the hand-over fixtures/workLimits.v3.json and
// summaries/M0-f-03b.json are the fit of the four committed summaries, byte for byte, from M0-f-03a's version-2 file);
// every row keeps its counter and unit, only perUnit, floor and provenance change (the fixed row and the unmeasured row
// not at all); the hit rate at the coefficients is at most 1 per 1 000 batches on the spikes' runs; the script opens the
// four summary files under plat/docs/build/summaries/ and nothing else (the file-open log). The shipped
// workLimits.json is pinned to one of exactly two byte strings: version 2 (M0-f-03a's, the PIN) while the hand-over
// waits on the session's ruling, the v3 fixture once `--write` has applied it (C-0445; C-0309's gating pattern). On the
// committed summaries the hit-rate report does not pass — the spikes ran stages charging counters their summaries carry
// no block for (C-0446) — so the entry exits 1 and writes no table; the hand-over's mechanics are exercised with the
// stage-charge table narrowed to the blocks (support.ts BLOCKS_ONLY). A fitted text the loader refuses writes nothing.
import { mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';
import { loadWorkLimits, parseWorkLimitsText } from '@plat/tables';
import {
  fittedText,
  fitWorkLimits,
  FS_IO,
  inputPath,
  PLAT_ROOT,
  REPORT_NAME,
  run,
  runWorkLimits,
  spikeDateOf,
  SUMMARIES_DIR,
  SUMMARY_IDS,
  SUMMARY_PATH,
  summaryOf,
  TABLE_PATH,
  type WorkLimitsIo,
} from '../../src/worklimits/index.js';
import { BLOCKS_ONLY, fitDate, HANDED_OVER, SHIPPED_TEXT, SUMMARY_TEXTS, sha256, summaries, V2_PIN, V2_TEXT, v2Table, V3_TEXT } from './support.js';

const dir = mkdtempSync(join(tmpdir(), 'worklimits-'));
afterAll(() => rmSync(dir, { recursive: true, force: true }));
/** The entry's printer, silenced (one test reads the lines). */
const quiet = (): void => undefined;

/** A recording io over the real file system: reads logged; writes logged and kept in memory, never on disk. */
function recording(): { io: WorkLimitsIo; reads: string[]; writes: Map<string, string> } {
  const reads: string[] = [];
  const writes = new Map<string, string>();
  return {
    reads,
    writes,
    io: {
      read: (p) => {
        reads.push(p);
        return FS_IO.read(p);
      },
      write: (p, t) => {
        writes.set(p, t);
      },
    },
  };
}

type Raw = { table: string; version: number; section: string; rows: Record<string, Record<string, Record<string, unknown>>> };

/** The committed summary's inputs block, rebuilt from the four texts. */
function inputsOf(): { summary: string; path: string; sha256: string; bytes: number }[] {
  return SUMMARY_IDS.map((id) => ({ summary: id, path: `docs/build/summaries/${id}.json`, sha256: sha256(SUMMARY_TEXTS[id]), bytes: Buffer.byteLength(SUMMARY_TEXTS[id], 'utf8') }));
}

describe('the coefficients are reproducible from the same reports', () => {
  it('M0-f-03a’s version-2 file is the hand-over’s input: its bytes hash to table.test.ts’s PIN', () => {
    expect(sha256(V2_TEXT)).toBe(V2_PIN.sha256);
    expect(v2Table().table.version).toBe(V2_PIN.version);
  });

  it('the fit of the four committed summaries from version 2 is the v3 hand-over, byte for byte, twice', () => {
    const date = fitDate();
    const a = fitWorkLimits(v2Table(), summaries(), date);
    const b = fitWorkLimits(v2Table(), summaries(), date);
    expect(b).toEqual(a);
    const ta = fittedText(v2Table(), a.counters);
    expect(fittedText(v2Table(), b.counters)).toEqual(ta);
    expect(ta.changed).toBe(true);
    expect(ta.version).toBe(3);
    expect(ta.text).toBe(V3_TEXT);
    // The hand-over loads through the tables package's own loader.
    expect(parseWorkLimitsText(V3_TEXT).table.version).toBe(3);
  });

  it('the fit of the hand-over from the same summaries changes nothing (the same bytes, the same version)', () => {
    const t3 = parseWorkLimitsText(V3_TEXT);
    const t = fittedText(t3, fitWorkLimits(t3, summaries(), fitDate()).counters);
    expect([t.changed, t.version, t.text]).toEqual([false, 3, V3_TEXT]);
  });

  it('with no fit applied the text is the input file’s own bytes (the layout is the file’s)', () => {
    const none = fitWorkLimits(v2Table(), summaries(), fitDate()).counters.map((f) => ({ ...f, status: 'unmeasured' as const, after: f.before }));
    expect(fittedText(v2Table(), none)).toEqual({ text: V2_TEXT, version: 2, changed: false });
    const t3 = parseWorkLimitsText(V3_TEXT);
    const none3 = fitWorkLimits(t3, summaries(), fitDate()).counters.map((f) => ({ ...f, status: 'unmeasured' as const, after: f.before }));
    expect(fittedText(t3, none3).text).toBe(V3_TEXT);
  });

  it('summaries/M0-f-03b.json is the summary of that fit (the inputs’ hashes, the fit, the hit rates, the files opened)', () => {
    const r = fitWorkLimits(v2Table(), summaries(), fitDate());
    const inputs = inputsOf();
    const committed = JSON.parse(readFileSync(SUMMARY_PATH, 'utf8')) as Record<string, unknown>;
    expect(committed).toEqual(summaryOf(r, inputs, 3, inputs.map((i) => i.path)));
    expect(committed['date']).toBe(fitDate());
    expect((committed['table'] as { version: number }).version).toBe(3);
    expect((committed['counters'] as Record<string, unknown>)['skeleton.events']).toMatchObject({ coefficient: 1.1538461538461537 * 1.5, perUnit: 8, floor: 64, law: { perUnit: 8, floor: 64 }, status: 'floored' });
    expect((committed['counters'] as Record<string, unknown>)['warp.halvings']).toMatchObject({ status: 'fixed-skipped', perUnit: 0, floor: 8, blocks: 0, p999: null });
    // The record says the report does not pass and names the unbounded rows (C-0446), never a pass.
    expect(committed['pass']).toBe(false);
    const h = committed['hitRate'] as { pass: boolean; unbounded: { summary: string; stage: string; counters: string[] }[] };
    expect(h.pass).toBe(false);
    expect(h.unbounded).toContainEqual({ summary: 'M0-e-06', at: 'groups/2 (relief-3000/default)', stage: 'S3', counters: ['insert.points', 'insert.attractQueries', 'insert.placementCandidates', 'insert.crossings', 'tx.facesWalked', 'route.nodes'] });
  });

  it('the shipped workLimits.json is exactly version 2 (the hand-over pending) or exactly the v3 hand-over', () => {
    if (HANDED_OVER) {
      expect(SHIPPED_TEXT).toBe(V3_TEXT);
      expect(loadWorkLimits().table.hash).toEqual(parseWorkLimitsText(V3_TEXT).table.hash);
    } else {
      expect(sha256(SHIPPED_TEXT)).toBe(V2_PIN.sha256);
      expect(SHIPPED_TEXT).toBe(V2_TEXT);
      console.info('workLimits.json: version 2 — the hand-over (fixtures/workLimits.v3.json) waits on the session’s ruling (C-0445)');
    }
  });

  it('the checker’s line, one coefficient by hand: cut.candidates is the largest raw p999 × 1.5 in the hand-over’s file', () => {
    const raw = JSON.parse(V3_TEXT) as Raw;
    const b04 = JSON.parse(SUMMARY_TEXTS['M0-b-04']) as { work: { counters: Record<string, { perUnit: { p999: number } }> } };
    const c06 = JSON.parse(SUMMARY_TEXTS['M0-c-06']) as { runs: { work: Record<string, { perUnit: { p999: number } }> }[] };
    const p999 = Math.max(b04.work.counters['cut.candidates'].perUnit.p999, ...c06.runs.map((r) => r.work['cut.candidates'].perUnit.p999));
    expect(p999).toBe(13.557243478260682);
    expect(raw.rows['cut.candidates']['perUnit']['value']).toBe(p999 * 1.5);
    expect(raw.rows['cut.candidates']['floor']['value']).toBe(p999 * 1.5);
  });
});

describe('every row keeps its counter and unit; only perUnit, floor and provenance change', () => {
  it('version 2 → 3: the same rows in the same order, the same cells, unit and log2 cells identical, calibratable kept', () => {
    const before = JSON.parse(V2_TEXT) as Raw;
    const after = JSON.parse(V3_TEXT) as Raw;
    expect(after.table).toBe(before.table);
    expect(after.section).toBe(before.section);
    expect(after.version).toBe(before.version + 1);
    expect(Object.keys(after.rows)).toEqual(Object.keys(before.rows));
    for (const counter of Object.keys(before.rows)) {
      const b = before.rows[counter];
      const a = after.rows[counter];
      expect(Object.keys(a), counter).toEqual(Object.keys(b));
      expect(a['unit'], counter).toEqual(b['unit']);
      expect(a['log2'], counter).toEqual(b['log2']);
      for (const cell of ['perUnit', 'floor']) {
        expect(Object.keys(a[cell]).filter((k) => k !== 'note'), `${counter}/${cell}`).toEqual(Object.keys(b[cell]).filter((k) => k !== 'note'));
        for (const field of Object.keys({ ...a[cell], ...b[cell] })) {
          if (field === 'value' || field === 'provenance' || field === 'note') continue;
          expect(a[cell][field], `${counter}/${cell}/${field}`).toEqual(b[cell][field]);
        }
      }
    }
    // Only perUnit, floor and the version line differ, line by line.
    const bl = V2_TEXT.split('\n');
    const al = V3_TEXT.split('\n');
    expect(al).toHaveLength(bl.length);
    const differing = al.map((l, i) => [l, bl[i]] as const).filter(([x, y]) => x !== y);
    for (const [line] of differing) expect(line, line).toMatch(/^ {6}"(?:perUnit|floor)": \{|^ {2}"version": 3,$/);
    expect(differing).toHaveLength(1 + 2 * 15);
  });

  it('the fixed row and the unmeasured row are unchanged; every other row carries the spike’s provenance on both coefficients', () => {
    const before = JSON.parse(V2_TEXT) as Raw;
    const after = JSON.parse(V3_TEXT) as Raw;
    expect(after.rows['warp.halvings']).toEqual(before.rows['warp.halvings']);
    expect(after.rows['index.rebuilds']).toEqual(before.rows['index.rebuilds']);
    const spike = `M0 spike ${fitDate()}`;
    for (const counter of Object.keys(after.rows)) {
      if (counter === 'warp.halvings' || counter === 'index.rebuilds') continue;
      for (const cell of ['perUnit', 'floor']) {
        expect(after.rows[counter][cell]['provenance'], `${counter}/${cell}`).toBe(spike);
        expect(after.rows[counter][cell]['calibratable'], `${counter}/${cell}`).toBe(true);
      }
    }
  });

  it('the floored row: skeleton.events (8, 64) with the law and the measurement in its note; no other row carries a note it did not have', () => {
    const before = JSON.parse(V2_TEXT) as Raw;
    const after = JSON.parse(V3_TEXT) as Raw;
    const sk = after.rows['skeleton.events'];
    expect([sk['perUnit']['value'], sk['floor']['value']]).toEqual([8, 64]);
    for (const cell of ['perUnit', 'floor']) {
      expect(sk[cell]['note']).toBe(`floored by §3.8 4 · (n + r) + 64, r ≤ n (M0.md §2.2; §5.1 (5), N-61 (6)): the row is max(measured, law); measured p999 × 1.5 = ${String(1.1538461538461537 * 1.5)}`);
    }
    for (const counter of Object.keys(after.rows)) {
      if (counter === 'skeleton.events') continue;
      for (const cell of Object.keys(after.rows[counter])) expect(after.rows[counter][cell]['note'], `${counter}/${cell}`).toEqual(before.rows[counter][cell]['note']);
    }
  });
});

describe('the hit rate at the coefficients is ≤ 1 per 1 000 batches on the spikes’ runs', () => {
  it('the committed summary and the entry’s report: the bounded rows within the target, the unbounded rows named and the report failed', () => {
    const committed = JSON.parse(readFileSync(SUMMARY_PATH, 'utf8')) as { pass: boolean; hitRate: { pass: boolean; worstPerThousand: number; before: number; after: number; unbounded: unknown[]; rows: { perThousand: number | null; after: number | null; unbounded: string[] }[] } };
    expect([committed.pass, committed.hitRate.pass]).toEqual([false, false]);
    expect(committed.hitRate.worstPerThousand).toBeLessThanOrEqual(1);
    expect([committed.hitRate.before, committed.hitRate.after]).toEqual([0, 18]);
    expect(committed.hitRate.unbounded).toHaveLength(29);
    for (const r of committed.hitRate.rows) {
      if (r.unbounded.length === 0) expect(r.perThousand).toBeLessThanOrEqual(1);
      else expect([r.after, r.perThousand]).toEqual([null, null]);
    }
    const out = runWorkLimits(['--date', fitDate()], { out: dir, say: quiet, io: recording().io, table: v2Table() });
    expect(out.code).toBe(1);
    expect(out.report?.hitRate.pass).toBe(false);
    expect(out.report?.hitRate.worstPerThousand).toBe(committed.hitRate.worstPerThousand);
    expect(out.report?.hitRate.unbounded).toHaveLength(29);
  });

  it('while a stage is unbounded the dry run and --write exit 1 naming the missing blocks, and no table is written (C-0446)', () => {
    for (const args of [[], ['--write']]) {
      const rec = recording();
      const lines: string[] = [];
      const out = runWorkLimits([...args, '--date', fitDate()], { out: dir, say: (l) => void lines.push(l), table: v2Table(), io: rec.io, tablePath: join(dir, 'u-never.json'), summaryPath: join(dir, 'u-never-s.json') });
      expect(out.code, args.join(' ')).toBe(1);
      expect(rec.writes.size, args.join(' ')).toBe(0);
      expect(lines).toContain('worklimits: M0-e-06 groups/2 (relief-3000/default) S3: 22 batches, E_WORK_LIMIT before 0, after UNBOUNDED — no block for insert.points, insert.attractQueries, insert.placementCandidates, insert.crossings, tx.facesWalked, route.nodes (never counted as 0)');
      expect(lines.some((l) => l.startsWith('worklimits: the hit rate is UNBOUNDED at 29 stage row(s)') && l.includes('missing blocks: M0-c-06 runs/0 (fusion) S1: insert.points'))).toBe(true);
      expect(lines.at(-1)).toBe('worklimits: the hit-rate report does not pass; nothing written');
    }
    // --summary records the failing verdict and writes no table.
    const rec = recording();
    const summaryPath = join(dir, 'u-s.json');
    const out = runWorkLimits(['--write', '--summary', '--date', fitDate()], { out: dir, say: quiet, table: v2Table(), io: rec.io, tablePath: join(dir, 'u-never.json'), summaryPath });
    expect(out.code).toBe(1);
    expect([...rec.writes.keys()]).toEqual([summaryPath]);
    expect(JSON.parse(rec.writes.get(summaryPath) ?? '')).toEqual(JSON.parse(readFileSync(SUMMARY_PATH, 'utf8')));
    // With every stage charged only what its blocks name the same run passes and hands over.
    const ok = recording();
    const w = runWorkLimits(['--write', '--date', fitDate()], { out: dir, say: quiet, table: v2Table(), io: ok.io, tablePath: join(dir, 'u-t.json'), summaryPath, charges: BLOCKS_ONLY });
    expect([w.code, [...ok.writes.keys()]]).toEqual([0, [join(dir, 'u-t.json'), summaryPath]]);
  });

  it('a fit over the target writes no table and exits 1; --summary records it', () => {
    const s = summaries();
    ((s['M0-k-04']['primitives'] as Record<string, { work: Record<string, Record<string, number>> }>)['corridorUnion'].work['insert.points'])['max'] = 36;
    const src = mkdtempSync(join(dir, 'over-'));
    const files = new Map(SUMMARY_IDS.map((id) => [inputPath(id, src), JSON.stringify(s[id])]));
    const writes = new Map<string, string>();
    const io: WorkLimitsIo = {
      read: (p) => {
        const t = files.get(p);
        if (t === undefined) throw new Error(`opened ${p}`);
        return t;
      },
      write: (p, t) => {
        writes.set(p, t);
      },
    };
    const lines: string[] = [];
    const ctx = { out: dir, say: (l: string) => void lines.push(l), table: v2Table(), summariesDir: src, io, tablePath: join(dir, 'never.json'), summaryPath: join(dir, 'never-s.json'), charges: BLOCKS_ONLY };
    const w = runWorkLimits(['--write', '--date', '2026-10-27'], ctx);
    expect(w.code).toBe(1);
    expect([w.report?.hitRate.pass, w.report?.hitRate.unbounded.length, w.report?.hitRate.worstPerThousand]).toEqual([false, 0, 1.9]);
    expect(writes.size).toBe(0);
    expect(lines).toContain('worklimits: a stage is over 1 work cut per 1 000 batches at the fitted coefficients — §5.1 (5)\'s fallback is M1\'s sweep');
    const r = runWorkLimits(['--summary', '--date', '2026-10-27'], ctx);
    expect(r.code).toBe(1);
    expect([...writes.keys()]).toEqual([join(dir, 'never-s.json')]);
    expect((JSON.parse(writes.get(join(dir, 'never-s.json')) ?? '') as { pass: boolean }).pass).toBe(false);
  });
});

describe('a fitted table the loader refuses is never written (C-0444 (8))', () => {
  it('--write --date 2026-02-30: the loader refuses the fitted text; exit 1, the refusal printed, neither the table nor the summary written', () => {
    // The fit takes any YYYY-MM-DD; the loader refuses 'M0 spike 2026-02-30' (§17.1 (6)'s forms) — the entry's guard
    // is all that stands between that text and the disk. The guard runs before the hit-rate verdict, so it is the
    // refusal reported whatever the report says, and it holds where the report passes (BLOCKS_ONLY).
    for (const charges of [undefined, BLOCKS_ONLY]) {
      for (const args of [['--write'], ['--write', '--summary'], ['--summary']]) {
        const rec = recording();
        const lines: string[] = [];
        const tablePath = join(dir, 'bad-table.json');
        const summaryPath = join(dir, 'bad-summary.json');
        const out = runWorkLimits([...args, '--date', '2026-02-30'], { out: join(dir, 'bad-out'), say: (l) => void lines.push(l), table: v2Table(), io: rec.io, tablePath, summaryPath, ...(charges === undefined ? {} : { charges }) });
        const what = `${args.join(' ')} ${charges === undefined ? 'STAGE_CHARGES' : 'BLOCKS_ONLY'}`;
        expect(out.code, what).toBe(1);
        expect(rec.writes.size, what).toBe(0);
        expect(out.written, what).toEqual([]);
        expect(out.report, what).toBeNull();
        expect(lines, what).toHaveLength(1);
        expect(lines[0], what).toMatch(/^worklimits: refused — table 'workLimits', row '[a-z.A-Z]+', cell '(perUnit|floor)': provenance 'M0 spike 2026-02-30' is outside §17\.1 \(6\)'s forms/);
      }
    }
    // The control: the same run at a real date writes (where the report passes).
    const rec = recording();
    const ok = runWorkLimits(['--write', '--date', '2026-02-28'], { out: dir, say: quiet, table: v2Table(), io: rec.io, tablePath: join(dir, 'good.json'), summaryPath: join(dir, 'good-s.json'), charges: BLOCKS_ONLY });
    expect([ok.code, [...rec.writes.keys()]]).toEqual([0, [join(dir, 'good.json'), join(dir, 'good-s.json')]]);
    expect(parseWorkLimitsText(rec.writes.get(join(dir, 'good.json')) ?? '').table.version).toBe(3);
  });
});

describe('the script opens the four summary files under plat/docs/build/summaries/ and nothing else (the file-open log)', () => {
  it('a dry run reads exactly the four, in C-0091’s order, and writes only its report under the output folder', () => {
    const rec = recording();
    const lines: string[] = [];
    const out = runWorkLimits(['--date', fitDate()], {
      out: dir,
      say: (l) => {
        lines.push(l);
      },
      io: rec.io,
    });
    // The hit-rate report does not pass on the committed summaries (C-0446): exit 1 whichever version is shipped.
    expect(out.code).toBe(1);
    expect(lines).toContain(`worklimits: skeleton.events (vertices) floored; p999 1.1538461538461537 × 1.5 = ${String(1.1538461538461537 * 1.5)} from 1 block(s); perUnit 8 → 8, floor 64 → 64`);
    expect(lines).toContain('worklimits: warp.halvings (fixed) fixed-skipped; perUnit 0 → 0, floor 8 → 8');
    expect(lines.at(-1)).toBe('worklimits: the hit-rate report does not pass; nothing written');
    // Narrowed to the blocks, the verdict is the table's.
    const narrowed: string[] = [];
    const n = runWorkLimits(['--date', fitDate()], { out: dir, say: (l) => void narrowed.push(l), io: recording().io, charges: BLOCKS_ONLY });
    expect(n.code).toBe(HANDED_OVER ? 0 : 1);
    expect(narrowed.at(-1)).toBe(
      HANDED_OVER
        ? 'worklimits: workLimits.json (version 3) is the fit of the four summaries; nothing to hand over'
        : 'worklimits: workLimits.json (version 2) is not the fit of the four summaries — run with --write to hand it over as version 3',
    );
    const four = SUMMARY_IDS.map((id) => join(SUMMARIES_DIR, `${id}.json`));
    expect(rec.reads).toEqual(four);
    expect(out.opened).toEqual(four);
    for (const p of rec.reads) expect(relative(join(PLAT_ROOT, 'docs', 'build', 'summaries'), p)).toMatch(/^M0-[a-z]-\d\d\.json$/);
    expect(rec.writes.size).toBe(0);
    expect(out.written).toEqual([join(dir, REPORT_NAME)]);
    // The report names what was opened, relative to plat/.
    const report = JSON.parse(readFileSync(join(dir, REPORT_NAME), 'utf8')) as { opened: string[] };
    expect(report.opened).toEqual(SUMMARY_IDS.map((id) => `docs/build/summaries/${id}.json`));
  });

  it('a hand-over run reads the same four and writes only the table, the summary and the report; an io that refuses any other path still serves it', () => {
    const allowed = new Set(SUMMARY_IDS.map((id) => inputPath(id)));
    const reads: string[] = [];
    const writes = new Map<string, string>();
    const strict: WorkLimitsIo = {
      read: (p) => {
        reads.push(p);
        if (!allowed.has(p)) throw new Error(`opened ${p}`);
        return FS_IO.read(p);
      },
      write: (p, t) => {
        writes.set(p, t);
      },
    };
    const tablePath = join(dir, 'workLimits.json');
    const summaryPath = join(dir, 'M0-f-03b.json');
    const out = runWorkLimits(['--write', '--date', fitDate()], { out: dir, say: quiet, table: v2Table(), io: strict, tablePath, summaryPath, charges: BLOCKS_ONLY });
    expect(out.code).toBe(0);
    expect(reads).toEqual([...allowed]);
    expect([...writes.keys()]).toEqual([tablePath, summaryPath]);
    expect(out.written).toEqual([join(dir, REPORT_NAME), tablePath, summaryPath]);
    expect(writes.get(tablePath)).toBe(V3_TEXT);
    // The summary of the narrowed run differs from the committed one only in the hit-rate verdict and its rows.
    const written = JSON.parse(writes.get(summaryPath) ?? '') as Record<string, unknown>;
    const committed = JSON.parse(readFileSync(SUMMARY_PATH, 'utf8')) as Record<string, unknown>;
    for (const k of ['item', 'date', 'provenance', 'table', 'inputs', 'opened', 'counters']) expect(written[k], k).toEqual(committed[k]);
    expect([written['pass'], committed['pass']]).toEqual([true, false]);
    // Never the output folder as an input (C-0091): nothing read lies under it.
    for (const p of reads) expect(p.startsWith(dir)).toBe(false);
  });

  it('the harness source reads files only through its io: no fs import outside index.ts, no read call outside FS_IO', () => {
    const src = fileURLToPath(new URL('../../src/worklimits/', import.meta.url));
    const files = readdirSync(src).filter((f) => f.endsWith('.ts')).sort();
    expect(files).toEqual(['fit.ts', 'index.ts', 'text.ts']);
    for (const f of files) {
      const code = readFileSync(join(src, f), 'utf8')
        .split('\n')
        .filter((l) => !l.trimStart().startsWith('//') && !l.trimStart().startsWith('*') && !l.trimStart().startsWith('/**'))
        .join('\n');
      if (f !== 'index.ts') expect(code, f).not.toMatch(/from 'node:/);
      expect(code.match(/readFileSync\(/g)?.length ?? 0, f).toBe(f === 'index.ts' ? 1 : 0);
      expect(code, f).not.toMatch(/PLAT_BENCH_OUT|process\.env|readdirSync|createReadStream|openSync|import\(/);
    }
    const index = readFileSync(join(src, 'index.ts'), 'utf8');
    expect(index).toMatch(/read: \(path: string\): string => readFileSync\(path, 'utf8'\)/);
  });
});

describe('the entry’s arguments and outcomes', () => {
  it('refuses an unknown or repeated argument and a bad date (exit 64), reading nothing', () => {
    for (const args of [['--nope'], ['--write', '--write'], ['--summary', '--summary'], ['--date'], ['--date', '2026-1-1'], ['--date', '2026-10-27', '--date', '2026-10-27'], ['write']]) {
      const rec = recording();
      expect([args.join(' '), run(args, { out: dir, say: quiet, io: rec.io })]).toEqual([args.join(' '), 64]);
      expect(rec.reads).toEqual([]);
    }
  });

  it('without --date it takes the date the table’s spike cells carry; a table with none needs --date (exit 64)', () => {
    expect(spikeDateOf(parseWorkLimitsText(V3_TEXT))).toBe(fitDate());
    expect(spikeDateOf(v2Table())).toBeNull();
    expect(spikeDateOf(loadWorkLimits())).toBe(HANDED_OVER ? fitDate() : null);
    const rec = recording();
    expect(run([], { out: dir, say: quiet, table: v2Table(), io: rec.io })).toBe(64);
    expect(rec.reads).toEqual([]);
  });

  it('a dry run on version 2 says the table is not the fit (exit 1) and writes nothing; --summary writes the summary alone; --write hands over once', () => {
    const rec = recording();
    const tablePath = join(dir, 'w2.json');
    const summaryPath = join(dir, 's2.json');
    const ctx = { out: dir, say: quiet, table: v2Table(), io: rec.io, tablePath, summaryPath, charges: BLOCKS_ONLY };
    expect(runWorkLimits(['--date', fitDate()], ctx).code).toBe(1);
    expect(rec.writes.size).toBe(0);
    const s = runWorkLimits(['--summary', '--date', fitDate()], ctx);
    expect([s.code, s.changed, s.version]).toEqual([0, true, 3]);
    expect([...rec.writes.keys()]).toEqual([summaryPath]);
    expect((JSON.parse(rec.writes.get(summaryPath) ?? '') as { pass: boolean }).pass).toBe(true);
    rec.writes.clear();
    // The same --summary under the full stage-charge table records the committed (failing) summary, exit 1.
    const { charges: _narrowed, ...full } = ctx;
    const sf = runWorkLimits(['--summary', '--date', fitDate()], full);
    expect([sf.code, [...rec.writes.keys()]]).toEqual([1, [summaryPath]]);
    expect(JSON.parse(rec.writes.get(summaryPath) ?? '')).toEqual(JSON.parse(readFileSync(SUMMARY_PATH, 'utf8')));
    rec.writes.clear();
    const w = runWorkLimits(['--date', fitDate(), '--write'], ctx);
    expect(w.code).toBe(0);
    expect([w.changed, w.version]).toEqual([true, 3]);
    expect([...rec.writes.keys()]).toEqual([tablePath, summaryPath]);
    expect(rec.writes.get(tablePath)).toBe(V3_TEXT);
    // A second run over the handed-over text writes nothing.
    const t3 = parseWorkLimitsText(V3_TEXT);
    const again = recording();
    const w2 = runWorkLimits(['--write'], { ...ctx, table: t3, io: again.io });
    expect([w2.code, w2.changed, w2.version]).toEqual([0, false, 3]);
    expect(again.writes.size).toBe(0);
    // --summary over a current table rewrites the summary alone.
    const w2s = runWorkLimits(['--summary'], { ...ctx, table: t3, io: again.io });
    expect([w2s.code, [...again.writes.keys()]]).toEqual([0, [summaryPath]]);
    again.writes.clear();
    // Another date is another provenance: a declared change, version 4.
    const w3 = runWorkLimits(['--write', '--date', '2026-11-01'], { ...ctx, table: t3, io: again.io });
    expect([w3.code, w3.changed, w3.version]).toEqual([0, true, 4]);
    expect([...again.writes.keys()]).toEqual([tablePath, summaryPath]);
  });

  it('a missing or malformed summary is a refusal (exit 1), nothing written', () => {
    const empty = mkdtempSync(join(dir, 'none-'));
    const rec = recording();
    expect(runWorkLimits(['--write', '--date', fitDate()], { out: dir, say: quiet, table: v2Table(), io: rec.io, summariesDir: empty }).code).toBe(1);
    expect(rec.writes.size).toBe(0);
    const bad: WorkLimitsIo = { read: (p) => (p.endsWith('M0-b-04.json') ? '{"item": ' : FS_IO.read(p)), write: rec.io.write };
    const out = runWorkLimits(['--write', '--date', fitDate()], { out: dir, say: quiet, table: v2Table(), io: bad });
    expect(out.code).toBe(1);
    expect(out.opened.map((p) => relative(SUMMARIES_DIR, p))).toEqual(['M0-c-06.json', 'M0-e-06.json', 'M0-b-04.json']);
    expect(rec.writes.size).toBe(0);
  });

  it('the entry’s default paths are the hand-over’s: the tables package’s data file and this item’s summary', () => {
    expect(relative(PLAT_ROOT, TABLE_PATH)).toBe(join('packages', 'tables', 'data', 'workLimits.json'));
    expect(relative(PLAT_ROOT, SUMMARY_PATH)).toBe(join('docs', 'build', 'summaries', 'M0-f-03b.json'));
    expect(relative(PLAT_ROOT, SUMMARIES_DIR)).toBe(join('docs', 'build', 'summaries'));
  });
});
