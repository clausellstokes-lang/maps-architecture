// dmath's word access (M0-d-03; §3.1, §6.5 (2)). fdlibm 5.3 reads and writes a double as two 32-bit integers through
// pointer casts (fdlibm.h's __HI and __LO); the port does the same through one Float64Array and its Int32Array and
// Uint32Array views, so every bit manipulation of the C is reproduced exactly. The word order is read once from the
// host: the view index whose word of 1.0 reads 0x3ff00000 is the high word (every host PLAT runs on is little-endian;
// the probe keeps a big-endian host correct too). Each helper writes and reads the shared buffer within one call, so no
// caller's value is ever left in it across a call (the routines call one another).

const F64 = new Float64Array(1);
const I32 = new Int32Array(F64.buffer);
const U32 = new Uint32Array(F64.buffer);
F64[0] = 1;
const HI = I32[1] === 0x3ff00000 ? 1 : 0;
const LO = 1 - HI;

/** `__HI(x)`: the high word (sign, exponent and the top 20 fraction bits) as fdlibm's `int`, signed 32-bit. */
export function hi(x: number): number {
  F64[0] = x;
  return I32[HI];
}

/** `__LO(x)`: the low 32 fraction bits as fdlibm's `unsigned`, 0 … 2³² − 1. */
export function lo(x: number): number {
  F64[0] = x;
  return U32[LO];
}

/** The double whose high and low words are `h` and `l` (each taken modulo 2³², as a C store of an `int` would be). */
export function fromWords(h: number, l: number): number {
  I32[HI] = h;
  I32[LO] = l;
  return F64[0];
}

/** `x` with its high word replaced: fdlibm's `__HI(x) = h`. */
export function withHi(x: number, h: number): number {
  F64[0] = x;
  I32[HI] = h;
  return F64[0];
}

/** `x` with its low word replaced: fdlibm's `__LO(x) = l`. */
export function withLo(x: number, l: number): number {
  F64[0] = x;
  I32[LO] = l;
  return F64[0];
}
