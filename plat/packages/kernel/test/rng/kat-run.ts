// The one known-answer check of the kernel's xoshiro128** (item M0-d-01; §6.1, §17.1 (8); C-0029), shared by the vitest
// test (kat.test.ts, on the test runner's Node) and by kat-hosts.mjs, which bundles it and runs it on Node arm64 and on
// Node x64 under Rosetta 2 (the exit bar "known-answer tests pass on both architectures"; vitest cannot start under x64
// here, its native bundler binding being arm64-only — C-0135 (5)).
import { readFileSync } from 'node:fs';
import { arch } from 'node:process';
import { streamFromKey } from '../../src/rng/stream.js';

export const VECTOR_ROOT = new URL('../vectors/xoshiro/', import.meta.url);
export const ARCHES = ['arm64', 'x86_64'] as const;
export type Arch = (typeof ARCHES)[number];
export const FILES = ['xoshiro128ss.txt', 'xoshiro128ss-long.txt'] as const;
export type VectorFile = (typeof FILES)[number];

/** One case: the seeded state, the calls skipped first, the values expected after them. */
export interface KatCase {
  readonly line: number;
  readonly state: [number, number, number, number];
  readonly skip: number;
  readonly expected: number[];
}

export function vectorBytes(a: Arch, file: VectorFile, root: URL = VECTOR_ROOT): Buffer {
  return readFileSync(new URL(`${a}/${file}`, root));
}

function word(hex: string, where: string): number {
  if (!/^[0-9a-f]{8}$/.test(hex)) throw new Error(`${where}: not 8 lower-case hexadecimal digits: ${hex}`);
  return Number.parseInt(hex, 16);
}

/** Reads a vector file: short cases (4 state words, 8 values) or long cases (4 state words, a count, 4 values). */
export function readCases(a: Arch, file: VectorFile, root: URL = VECTOR_ROOT): KatCase[] {
  const long = file === 'xoshiro128ss-long.txt';
  const text = vectorBytes(a, file, root).toString('utf8');
  const out: KatCase[] = [];
  text.split('\n').forEach((line, i) => {
    if (line === '') return;
    const w = line.split(' ').map((h) => word(h, `${a}/${file}:${String(i + 1)}`));
    const n = long ? 9 : 12;
    if (w.length !== n) throw new Error(`${a}/${file}:${String(i + 1)}: ${String(w.length)} numbers, expected ${String(n)}`);
    out.push({ line: i + 1, state: [w[0], w[1], w[2], w[3]], skip: long ? w[4] : 0, expected: w.slice(long ? 5 : 4) });
  });
  return out;
}

function hex(v: number): string {
  return v.toString(16).padStart(8, '0');
}

export interface KatResult {
  readonly file: VectorFile;
  readonly arch: Arch;
  readonly cases: number;
  readonly missCount: number;
  /** the first ten differing cases: "line n: state … gave …, the C …" */
  readonly misses: string[];
}

/** Checks Stream.u32 against one architecture's vector file. */
export function katOf(file: VectorFile, a: Arch, root: URL = VECTOR_ROOT): KatResult {
  const cases = readCases(a, file, root);
  const misses: string[] = [];
  let missCount = 0;
  for (const c of cases) {
    const s = streamFromKey(c.state);
    for (let i = 0; i < c.skip; i += 1) s.u32();
    const got = c.expected.map(() => s.u32());
    if (got.some((v, i) => v !== c.expected[i])) {
      missCount += 1;
      if (misses.length < 10) misses.push(`line ${String(c.line)}: state ${c.state.map(hex).join(' ')} gave ${got.map(hex).join(' ')}, the C ${c.expected.map(hex).join(' ')}`);
    }
  }
  return { file, arch: a, cases: cases.length, missCount, misses };
}

/** Are the two architectures' copies of a vector file byte-identical? */
export function setsIdentical(file: VectorFile, root: URL = VECTOR_ROOT): boolean {
  return vectorBytes('arm64', file, root).equals(vectorBytes('x86_64', file, root));
}

export interface KatReport {
  readonly host: string;
  readonly results: KatResult[];
  readonly identical: Record<VectorFile, boolean>;
  readonly ok: boolean;
}

/** Both files against both architectures' vectors, on the running host (`process.arch`). */
export function runKat(root: URL = VECTOR_ROOT): KatReport {
  const results: KatResult[] = [];
  const identical = { 'xoshiro128ss.txt': false, 'xoshiro128ss-long.txt': false };
  for (const f of FILES) {
    identical[f] = setsIdentical(f, root);
    for (const a of ARCHES) results.push(katOf(f, a, root));
  }
  const ok = results.every((r) => r.missCount === 0 && r.cases > 0) && identical['xoshiro128ss.txt'] && identical['xoshiro128ss-long.txt'];
  return { host: `node ${process.version} ${arch}`, results, identical, ok };
}
