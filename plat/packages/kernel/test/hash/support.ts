// Test support for M0-d-02's hash tests: the committed known answers and an independent serialiser — the lane stream's
// bytes built with Node's DataView and TextEncoder, never with the code under test — for the one-shot side of
// "incremental = one-shot".
import { readFileSync } from 'node:fs';

export type LaneOp = ['u32', number] | ['i32', number] | ['f64', number] | ['utf8', string];
export type VectorOp = ['u32', number] | ['i32', number] | ['f64', number] | ['utf8', number[]];

export interface MurmurVectors {
  verificationValue: number;
  /** perLength[i]: the bytes 0 … i − 1 under seed 256 − i. */
  perLength: [number, number, number, number][];
  /** A LaneWriter stream (UTF-8 strings as code-point arrays), its lane count and H128. */
  lanes: { ops: VectorOp[]; lanes: number; h128: [number, number, number, number] }[];
}

export const vectors = JSON.parse(
  readFileSync(new URL('../vectors/murmur/murmur3-x86-128.json', import.meta.url), 'utf8'),
) as MurmurVectors;

/** SMHasher's published verification value for MurmurHash3 x86 128. */
export const VERIFICATION_VALUE = 0xb3ece62a;

/** The little-endian bytes of u32 words. */
export function wordsLE(words: readonly number[]): Uint8Array {
  const out = new Uint8Array(words.length * 4);
  const view = new DataView(out.buffer);
  words.forEach((w, i) => view.setUint32(i * 4, w >>> 0, true));
  return out;
}

const encoder = new TextEncoder();

/** The bytes a lane stream stands for (C-0132), built independently of LaneWriter. */
export function serialiseLanes(ops: readonly LaneOp[]): Uint8Array {
  const parts: Uint8Array[] = [];
  for (const [kind, v] of ops) {
    if (kind === 'u32' || kind === 'i32') {
      const b = new Uint8Array(4);
      new DataView(b.buffer).setUint32(0, v >>> 0, true);
      parts.push(b);
    } else if (kind === 'f64') {
      const b = new Uint8Array(8);
      new DataView(b.buffer).setFloat64(0, Object.is(v, -0) ? 0 : v, true);
      parts.push(b);
    } else {
      const text = encoder.encode(v);
      const padded = new Uint8Array(4 + Math.ceil(text.length / 4) * 4);
      new DataView(padded.buffer).setUint32(0, text.length, true);
      padded.set(text, 4);
      parts.push(padded);
    }
  }
  const total = parts.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(total);
  let at = 0;
  for (const p of parts) {
    out.set(p, at);
    at += p.length;
  }
  return out;
}

/** A committed vector stream's ops with its code-point arrays turned back into strings. */
export function vectorOps(ops: readonly VectorOp[]): LaneOp[] {
  return ops.map((op): LaneOp => (op[0] === 'utf8' ? ['utf8', String.fromCodePoint(...op[1])] : op));
}
