// The hash types (§2.8), declared here in their producer's module and re-exported by @plat/model under the same names
// (C-0112 (2)). Each element is a u32 lane, 0 … 2³² − 1; words are listed low word first, so a Hash128's words 0 and 1
// are its low 64 bits (§8.1 item 5's reading of "the low 64 bits (words 0 and 1)").

/** A 64-bit hash as two u32 lanes. */
export type Hash64 = [number, number];

/** A 128-bit hash as four u32 lanes: MurmurHash3 x86 128's h1, h2, h3, h4 (§6.2). */
export type Hash128 = [number, number, number, number];

/** An entity's lineage hash (§6.3): the 64-bit stream identity, words 0 and 1 of an H128 over its lineage key's lanes. */
export type LineageHash = Hash64;
