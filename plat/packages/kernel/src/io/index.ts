// The arena block (M0-a-15; §3.9 whole, §3.3's partitions, §2.2 rule 3, §13.1's round trip, §6.5 (3); C-0037): encode,
// decode, the load's rebuild and slot compaction, as bytes in memory. The `.plat` document around the block — its
// manifest, content-addressed store, gzip, the root check and the replay of a corrupt cache — is M1's (§4b).
// Readings: C-0207.
export { encodeArena } from './encode.js';
export { decodeArena, describeChunk, type ChunkSummary } from './decode.js';
export { compactSlots } from './compact.js';
export { CORRUPT_CACHE, corruptCache, isCorruptCache, type Chunk, type ChunkRef, type DecodeOptions } from './types.js';
export { ByteReader, ByteWriter, ChunkFormatError } from './bytes.js';
export { FORMAT_VERSION as ARENA_BLOCK_FORMAT, ringKey } from './format.js';
