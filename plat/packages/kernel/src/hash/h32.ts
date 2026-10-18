// H32 (§13.6 (2)): the first output word (h1) of MurmurHash3 x86 128 over the UTF-8 bytes of a string, seed 0. The
// result is a u32, so it is a `Seed` (§2.9's `type Seed = number`); records write it as its decimal string.
import { H128 } from './murmur3.js';
import { utf8Bytes } from './utf8.js';

/** H32(s) = h1 of H128(UTF-8 bytes of s); a u32. Throws a RangeError on a lone surrogate (C-0133). */
export function H32(s: string): number {
  return H128(utf8Bytes(s))[0];
}
