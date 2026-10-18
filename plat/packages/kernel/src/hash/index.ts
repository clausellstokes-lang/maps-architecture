// @plat/kernel's hash module (M0-d-02): MurmurHash3 x86 128 (H128, §6.2), its 32-bit finaliser (fmix32, §6.1), H32
// (§13.6 (2)), the lane encoder of the digest leaves (LaneWriter, §6.2; C-0132) and the hash types Hash64, Hash128 and
// LineageHash (§2.8), declared here and re-exported by @plat/model (C-0004, C-0066, C-0112).
export type { Hash64, Hash128, LineageHash } from './types.js';
export { fmix32, H128, Murmur128, murmur128 } from './murmur3.js';
export { H32 } from './h32.js';
export { encodeUtf8Into, utf8Bytes, utf8Length } from './utf8.js';
export { LaneWriter } from './lanes.js';
