// The known-answer vectors of dmath (M0-d-03; C-0029, C-0135), read for the tests: test/vectors/fdlibm/<arch>/<name>.txt,
// written by test/vectors/fdlibm/gen/gen.sh from fdlibm 5.3's C — one case per line, every operand and the result as
// the 16 hexadecimal digits of its IEEE 754 binary64 bit pattern; a NaN result is the one quiet NaN 7ff8000000000000.
import { readFileSync } from 'node:fs';

export const ARCHES = ['arm64', 'x86_64'] as const;
export type Arch = (typeof ARCHES)[number];

/** The routines with vectors, in the files' argument order (atan2's file is "y x atan2(y, x)"). */
export const ROUTINES = [
  { name: 'pow', arity: 2 },
  { name: 'log', arity: 1 },
  { name: 'exp', arity: 1 },
  { name: 'sin', arity: 1 },
  { name: 'cos', arity: 1 },
  { name: 'atan2', arity: 2 },
  { name: 'atan', arity: 1 },
] as const;
export type RoutineName = (typeof ROUTINES)[number]['name'];

export const NAN_BITS = 0x7ff8000000000000n;

/** The committed vectors' folder (inside plat/: the kernel's own test folder). */
export const VECTOR_ROOT = new URL('../vectors/fdlibm/', import.meta.url);

/** The raw bytes of a vector file under `root` (a folder URL ending in "/"). */
export function vectorBytes(arch: Arch, name: RoutineName, root: URL = VECTOR_ROOT): Buffer {
  return readFileSync(new URL(`${arch}/${name}.txt`, root));
}

const view = new DataView(new ArrayBuffer(8));

/** A double from its 16 hexadecimal digits (big-endian through DataView: independent of the host's byte order). */
export function fromHex(h: string): number {
  view.setUint32(0, Number.parseInt(h.slice(0, 8), 16));
  view.setUint32(4, Number.parseInt(h.slice(8, 16), 16));
  return view.getFloat64(0);
}

/** A double's bit pattern as a 64-bit unsigned BigInt. */
export function bitsOf(x: number): bigint {
  view.setFloat64(0, x);
  return view.getBigUint64(0);
}

/** A double's 16 hexadecimal digits. */
export function hexOf(x: number): string {
  return bitsOf(x).toString(16).padStart(16, '0');
}

export interface Case {
  readonly args: number[];
  readonly expected: bigint;
  readonly line: number;
}

/** The cases of a vector file; throws on a line that is not `arity + 1` hexadecimal words. */
export function readCases(arch: Arch, name: RoutineName, arity: number, root: URL = VECTOR_ROOT): Case[] {
  const text = vectorBytes(arch, name, root).toString('latin1');
  const shape = new RegExp(`^[0-9a-f]{16}( [0-9a-f]{16}){${arity}}$`);
  const lines = text.split('\n');
  if (lines[lines.length - 1] === '') lines.pop();
  return lines.map((l, i) => {
    if (!shape.test(l)) throw new Error(`${arch}/${name}.txt line ${i + 1} is not ${arity + 1} hexadecimal words: ${JSON.stringify(l)}`);
    const words = l.split(' ');
    return { args: words.slice(0, arity).map(fromHex), expected: BigInt(`0x${words[arity]}`), line: i + 1 };
  });
}

/** Does a computed result match a known answer: the same 64 bits, or both NaN (C-0135)? */
export function matches(result: number, expected: bigint): boolean {
  return expected === NAN_BITS ? Number.isNaN(result) : !Number.isNaN(result) && bitsOf(result) === expected;
}
