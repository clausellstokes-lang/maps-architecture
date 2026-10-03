// The kernel's shared types (M0-a-01, C-0112): ids, handles, levels, arena keys, seeds and the two registry ids
// (§2.1, §2.2, §2.9, §6.1, §14). Types only; re-exported by @plat/model under the design's names.

/** An entity's address id `kind:token`, prefixed with its arena outside the ground layer (§2.1, §6.3). */
export type Id = string;

/** An address interned in memory as a u32 handle — what the kernel's owner and role tables hold (§2.1). */
export type Handle = number;

/** L0 land/water · L1 way skeleton · L2 kerbs, corridors, blocks · L3 plots + residue · L4 footprints + yard parts (§2.2). */
export type Level = 0 | 1 | 2 | 3 | 4;

/** The three model layers (§2.1); `PlatKey` reads it. */
export type Layer = 'underground' | 'ground' | 'sky';

/** One arena per key: a layer and its part number, allocated once and never reused (§2.1 Arena parts, §2.2). */
export type PlatKey = { layer: Layer; part: number };

/** A u32, 0 … 2³² − 1 (§2.9). */
export type Seed = number;

/** A u16 from the concern registry (§6.1), generated as typed constants — never a string (§14). */
export type ConcernId = number & { readonly __brand: 'ConcernId' };

/**
 * A u16 from the stage-id table (§6.1: registered append-only, never renumbered; `STAGE_VIEW` = 0xffff) — the form
 * §14's `Rng.stream` reads (C-0112); the textual `S0` … `S15` of §4.12 is the registry's name for it (C-0134 (9)).
 */
export type StageId = number & { readonly __brand: 'StageId' };
