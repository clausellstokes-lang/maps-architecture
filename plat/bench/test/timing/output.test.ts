// M0-f-01's output tests (M0.md §0.1 (6), C-0059, C-0067): the harness truncates its output files to a cap and never
// prints a log whole — one capped line at a time, the reasons summarised.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { LINE_CAP, OUT_CAP_BYTES, outDir, say, summariseReasons, truncate, writeJson, writeTruncated } from '../../src/timing/output.js';

afterEach(() => {
  vi.restoreAllMocks();
});

const dir = (): string => outDir(join(outDir(), 'f01-output-test'));

describe('output files are truncated', () => {
  it('a 1 MiB log is written cut to the cap, closing with a line naming the bytes dropped', () => {
    const text = 'x'.repeat(1024 * 1024);
    const w = writeTruncated(dir(), 'big.log', text);
    const back = readFileSync(w.path, 'utf8');
    expect(Buffer.byteLength(back)).toBeLessThanOrEqual(OUT_CAP_BYTES);
    expect(w.bytes).toBe(Buffer.byteLength(back));
    expect(w.dropped).toBeGreaterThan(1024 * 1024 - OUT_CAP_BYTES);
    expect(back).toMatch(new RegExp(`… truncated: ${w.dropped} of ${1024 * 1024} bytes not written`));
    expect(back.startsWith('x'.repeat(1000))).toBe(true);
  });

  it('a small file is written whole; a cut never splits a character; a custom cap is honoured', () => {
    const small = writeTruncated(dir(), 'small.log', 'one line\n');
    expect(readFileSync(small.path, 'utf8')).toBe('one line\n');
    expect(small.dropped).toBe(0);
    const euros = truncate('€'.repeat(10_000), 4096);
    expect(Buffer.byteLength(euros.text)).toBeLessThanOrEqual(4096);
    expect(euros.text).not.toContain('�');
    expect(euros.text.replace(/\n… truncated.*\n$/, '')).toMatch(/^€+$/);
    const json = writeJson(dir(), 'big.json', { rows: Array.from({ length: 50_000 }, (_, i) => ({ i, pad: 'p'.repeat(10) })) }, 8192);
    expect(Buffer.byteLength(readFileSync(json.path, 'utf8'))).toBeLessThanOrEqual(8192);
    expect(json.dropped).toBeGreaterThan(0);
  });

  it('writes only a plain file name inside the output folder', () => {
    for (const bad of ['', '.', '..', '../escape.log', 'a/b.log', 'a\\b.log']) expect(() => writeTruncated(dir(), bad, 'x')).toThrow(/plain file name/);
  });
});

describe('the harness prints summaries, never a log whole', () => {
  it('say prints one line cut to the cap; the reasons are summarised with a count of the rest', () => {
    const chunks: string[] = [];
    vi.spyOn(process.stdout, 'write').mockImplementation((c: string | Uint8Array) => {
      chunks.push(String(c));
      return true;
    });
    say(`a\nb${'y'.repeat(5000)}`);
    vi.restoreAllMocks();
    expect(chunks).toHaveLength(1);
    expect(chunks[0].endsWith('\n')).toBe(true);
    expect(chunks[0].split('\n')).toHaveLength(2);
    expect(chunks[0].length - 1).toBe(LINE_CAP);
    expect(summariseReasons([])).toBe('none');
    expect(summariseReasons(['a', 'b'])).toBe('a; b');
    expect(summariseReasons(['a', 'b', 'c', 'd', 'e', 'f'], 4)).toBe('a; b; c; d; … 2 more');
  });

  it('the output folder is PLAT_BENCH_OUT (or the dispatcher\'s out), never inside plat/', () => {
    const plat = new URL('../../../', import.meta.url).pathname;
    expect(outDir().startsWith(plat)).toBe(false);
    expect(outDir(dir())).toBe(dir());
  });
});
