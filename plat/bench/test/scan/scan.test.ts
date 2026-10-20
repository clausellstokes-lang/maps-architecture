// M0-k-06: the `scan` bench entry (C-0113, C-0114) — `corepack pnpm scan` (= `corepack pnpm bench -- scan`) on a
// synthetic deny-list built here with this test's own salt exits 0 / 1 / 2 / 64 as its case states, writes the report
// to PLAT_BENCH_OUT on 0 and 1 (none when it stops), resolves plat/ from its own place (never an absolute path, N-23),
// and the PR tier's `deny-list scan` job derives `after-M-1: denylist.json` until M-1's list crosses and M0-k-07 has
// reviewed it, never `not-built` now that the entry exports `run` (C-0099, C-0121). Fixture trees lie under the OS
// temporary folder (packages/testkit/baselines/README.md), and no test spawns a tier script (C-0105).
import { createHash } from 'node:crypto';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { PLAT_ROOT, run, SCAN_REPORT_FILE } from '../../src/scan/index.js';
import { DENYLIST, prJobs } from '../../src/tier-jobs/index.js';
import { deriveStatus } from '../../src/tiers/status.js';
import type { Job } from '../../src/tiers/types.js';

const SALT = Uint8Array.from({ length: 32 }, (_, i) => 0x40 + i);
const dig = (s: string): string => createHash('sha256').update(SALT).update(Buffer.from(s, 'utf8')).digest('hex').slice(0, 16);
const LISTED = 'vorpexil';

function list(over: Record<string, unknown> = {}): string {
  return JSON.stringify({
    schema: 'plat.denylist/1',
    normalisationVersion: 1,
    digestHexDigits: 16,
    date: '2026-10-06T12:00:00Z',
    corpusCut: '2026-10-06T11:00:00Z',
    salt: Buffer.from(SALT).toString('hex'),
    counts: { tokens: 1 },
    tokens: [dig(LISTED)],
    trigrams: [],
    colours: [],
    files: [],
    lists: [],
    spell: [],
    ...over,
  });
}

const temps: string[] = [];
let out = '';
beforeAll(() => {
  out = mkdtempSync(join(tmpdir(), 'plat-k06-scan-out-'));
  temps.push(out);
});
afterAll(() => {
  for (const t of temps) rmSync(t, { recursive: true, force: true });
});

function tree(files: Record<string, string>): string {
  const root = mkdtempSync(join(tmpdir(), 'plat-k06-scan-tree-'));
  temps.push(root);
  for (const [rel, body] of Object.entries(files)) {
    mkdirSync(dirname(join(root, rel)), { recursive: true });
    writeFileSync(join(root, rel), body);
  }
  return root;
}

const ALLOW = 'packages/testkit/baselines/denylist-allow.json';
const LIST = 'packages/testkit/baselines/denylist.json';

/** Runs the entry with its printed lines captured. */
function runCaptured(args: string[], root: string, listPath?: string): { code: number; printed: string } {
  rmSync(join(out, SCAN_REPORT_FILE), { force: true });
  const chunks: string[] = [];
  const write = process.stdout.write.bind(process.stdout);
  process.stdout.write = ((c: string | Uint8Array): boolean => {
    chunks.push(typeof c === 'string' ? c : Buffer.from(c).toString('utf8'));
    return true;
  }) as typeof process.stdout.write;
  try {
    return { code: run(args, { out, root, ...(listPath === undefined ? {} : { list: listPath }) }), printed: chunks.join('') };
  } finally {
    process.stdout.write = write;
  }
}

describe('corepack pnpm scan (M0-k-06, C-0113): the exit codes on a synthetic deny-list', () => {
  it('exit 0: no hit; the report is written to PLAT_BENCH_OUT', () => {
    const root = tree({ 'packages/kernel/src/a.ts': "const s = 'ordinary';\n", [LIST]: list(), [ALLOW]: '[]\n' });
    const { code, printed } = runCaptured([], root);
    expect(code).toBe(0);
    const rep = JSON.parse(readFileSync(join(out, SCAN_REPORT_FILE), 'utf8')) as { counts: { hits: number }; files: { scanned: number } };
    expect(rep.counts.hits).toBe(0);
    expect(rep.files.scanned).toBe(1);
    expect(printed).toContain('scan: 0 hits');
  });

  it('exit 1: an unreviewed hit, named by file and line, the token never printed; an allow entry for it turns the run to 0', () => {
    const files = { 'packages/kernel/src/a.ts': `const x = 1;\nconst s = '${LISTED.toUpperCase()}';\n`, [LIST]: list(), [ALLOW]: '[]\n' };
    const { code, printed } = runCaptured([], tree(files));
    expect(code).toBe(1);
    expect(printed).toContain('scan: unreviewed token hit at packages/kernel/src/a.ts:2');
    const report = readFileSync(join(out, SCAN_REPORT_FILE), 'utf8');
    expect(`${printed}${report}`.toLowerCase()).not.toContain(LISTED);
    const allowed = runCaptured([], tree({ ...files, [ALLOW]: JSON.stringify([{ check: 'token', text: LISTED, reason: 'an invented word of our own' }]) }));
    expect(allowed.code).toBe(0);
  });

  it('exit 2: a missing deny-list file stops naming it, with no report written', () => {
    const { code, printed } = runCaptured([], tree({ 'packages/kernel/src/a.ts': `'${LISTED}'\n`, [ALLOW]: '[]\n' }));
    expect(code).toBe(2);
    expect(printed).toContain('scan stopped: packages/testkit/baselines/denylist.json: missing file');
    expect(existsSync(join(out, SCAN_REPORT_FILE))).toBe(false);
  });

  it('exit 2: a normalisationVersion that is not 1 stops naming both versions, with no report written', () => {
    const { code, printed } = runCaptured([], tree({ 'packages/kernel/src/a.ts': `'${LISTED}'\n`, [LIST]: list({ normalisationVersion: 2 }), [ALLOW]: '[]\n' }));
    expect(code).toBe(2);
    expect(printed).toContain("normalisationVersion 2 is not the scanner's normalisationVersion 1");
    expect(existsSync(join(out, SCAN_REPORT_FILE))).toBe(false);
  });

  it('exit 64: any argument is usage', () => {
    const root = tree({ 'a.ts': '1\n', [LIST]: list(), [ALLOW]: '[]\n' });
    expect(runCaptured(['--list', 'x'], root).code).toBe(64);
    expect(runCaptured(['extra'], root).printed).toContain('usage: corepack pnpm scan');
  });
});

describe('the entry resolves plat/ from its own place (N-23: a scratch copy scans itself)', () => {
  it('PLAT_ROOT is the folder holding bench/src/scan/index.ts (the dispatcher map is tested by the scaffold)', () => {
    const here = dirname(fileURLToPath(import.meta.url));
    expect(resolve(PLAT_ROOT)).toBe(resolve(here, '../../..'));
    expect(existsSync(join(PLAT_ROOT, 'bench', 'src', 'scan', 'index.ts'))).toBe(true);
    expect(existsSync(join(PLAT_ROOT, 'packages', 'testkit', 'baselines', 'denylist-allow.json'))).toBe(true);
  });

  // hardening round S1, K6-6 (checks/M0-k-06-notes.md): this case returned early once M-1's list exists and then
  // asserted nothing; both branches now assert — never a vacuous pass, never a stop on a tree whose list is present
  it('on this tree, the real run stops naming denylist.json (exit 2) while the list is absent; with the list present it runs (exit 0 or 1, never 2)', () => {
    expect.assertions(1);
    const r = run([], { out });
    if (existsSync(join(PLAT_ROOT, DENYLIST))) expect([0, 1]).toContain(r);
    else expect(r).toBe(2);
  });

  it('on this tree with a deny-list present (a synthetic one beside it), the real run scans plat/ and exits 0 or 1, never 2 (K6-6)', () => {
    const dir = mkdtempSync(join(tmpdir(), 'plat-k06-scan-list-'));
    temps.push(dir);
    const listPath = join(dir, 'denylist.json');
    writeFileSync(listPath, list());
    const { code, printed } = runCaptured([], PLAT_ROOT, listPath);
    expect(printed).not.toContain('scan stopped');
    expect([0, 1]).toContain(code);
    const rep = JSON.parse(readFileSync(join(out, SCAN_REPORT_FILE), 'utf8')) as { files: { scanned: number } };
    expect(rep.files.scanned).toBeGreaterThan(100);
  });
});

describe("the PR tier's deny-list job (C-0099, C-0121): pending until M-1's list crosses and M0-k-07 reviews it", () => {
  it('its status on this tree is derived from the list and the review, never not-built now the entry exports run', async () => {
    const job = prJobs(PLAT_ROOT).find((j) => j.name === 'deny-list scan') as Job;
    expect(job).toMatchObject({ source: 'bench/src/scan/', inputs: [DENYLIST], reviewedBy: ['M0-k-07'], item: 'M0-k-06' });
    const d = await deriveStatus(job, PLAT_ROOT);
    expect(d.loadError).toBeUndefined();
    const listAbs = join(PLAT_ROOT, DENYLIST);
    if (!existsSync(listAbs)) expect(d.status).toBe('after-M-1: denylist.json');
    else {
      const sha = createHash('sha256').update(readFileSync(listAbs)).digest('hex');
      const summary = join(PLAT_ROOT, 'docs/build/summaries/M0-k-07.json');
      const reviewed = existsSync(summary) && (JSON.parse(readFileSync(summary, 'utf8')) as { reviewed?: Record<string, string> }).reviewed?.[DENYLIST] === sha;
      expect(d.status).toBe(reviewed ? 'built' : 'after-M-1: denylist.json (review pending: M0-k-07)');
    }
  });
});
