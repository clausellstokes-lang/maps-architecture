// The harness's output rule (M0.md §0.1 (6), C-0059, C-0067): every output file goes to PLAT_BENCH_OUT (never into
// plat/), TRUNCATED to a cap, and the harness prints a few summary lines — never a log whole. Inputs never come from
// PLAT_BENCH_OUT.
import { mkdirSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

/** The cap of one output file (256 KiB). */
export const OUT_CAP_BYTES = 256 * 1024;
/** The cap of one printed line. */
export const LINE_CAP = 400;

/** The output folder: the dispatcher's `out`, else PLAT_BENCH_OUT, else `<tmpdir>/plat-bench` (C-0059). */
export function outDir(out?: string): string {
  const dir = out !== undefined && out !== '' ? out : process.env['PLAT_BENCH_OUT'] || join(tmpdir(), 'plat-bench');
  mkdirSync(dir, { recursive: true });
  return dir;
}

/** `text` cut to at most `cap` UTF-8 bytes, with a closing line naming what was dropped. */
export function truncate(text: string, cap: number = OUT_CAP_BYTES): { text: string; dropped: number } {
  const bytes = Buffer.from(text, 'utf8');
  if (bytes.length <= cap) return { text, dropped: 0 };
  const marker = (dropped: number): string => `\n… truncated: ${dropped} of ${bytes.length} bytes not written (M0.md §0.1 (6))\n`;
  const room = Math.max(0, cap - Buffer.byteLength(marker(bytes.length), 'utf8'));
  let head = bytes.subarray(0, room).toString('utf8');
  if (head.endsWith('�')) head = head.slice(0, -1); // a code point cut in two
  const kept = Buffer.byteLength(head, 'utf8');
  return { text: head + marker(bytes.length - kept), dropped: bytes.length - kept };
}

/** Writes one output file under `dir`, truncated; `name` is a plain file name (no folder). */
export function writeTruncated(dir: string, name: string, text: string, cap: number = OUT_CAP_BYTES): { path: string; bytes: number; dropped: number } {
  if (name === '' || name.includes('/') || name.includes('\\') || name === '.' || name === '..') {
    throw new Error(`output: ${JSON.stringify(name)} is not a plain file name`);
  }
  const t = truncate(text, cap);
  const path = join(outDir(dir), name);
  writeFileSync(path, t.text);
  return { path, bytes: Buffer.byteLength(t.text, 'utf8'), dropped: t.dropped };
}

/** Writes a JSON value as one truncated output file. */
export function writeJson(dir: string, name: string, value: unknown, cap: number = OUT_CAP_BYTES): { path: string; bytes: number; dropped: number } {
  return writeTruncated(dir, name, `${JSON.stringify(value, null, 2)}\n`, cap);
}

/** Prints one line to stdout, cut to LINE_CAP characters. */
export function say(line: string): void {
  const one = line.replace(/\n/g, ' ');
  process.stdout.write(`${one.length > LINE_CAP ? `${one.slice(0, LINE_CAP - 1)}…` : one}\n`);
}

/** The first `max` reasons and how many more there are. */
export function summariseReasons(reasons: readonly string[], max = 4): string {
  if (reasons.length === 0) return 'none';
  const head = reasons.slice(0, max).join('; ');
  return reasons.length > max ? `${head}; … ${reasons.length - max} more` : head;
}
