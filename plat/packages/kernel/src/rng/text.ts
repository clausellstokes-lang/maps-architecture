// The RNG layer's text, kept off the generation path (item M0-d-01; §6.1: "No string is built on the generation path:
// the textual form … is rendered from the same components for reports only"): the textual key form `keyText` for
// reports, and the refusals' messages, which the mixer raises by a numeric code so that no string is built there.
import { CONCERN_REGISTRY, STAGE_REGISTRY, STAGE_VIEW } from '../registry/index.js';
import type { ConcernId, StageId, StreamOpts } from '../types/index.js';

export const R_SEED = 1;
export const R_SEED_KEY = 2;
export const R_LINEAGE = 3;
export const R_ARENA_LAYER = 4;
export const R_ARENA_PART = 5;
export const R_ENTITY_KEY = 6;
export const R_STAGE = 7;
export const R_CONCERN = 8;
export const R_REROLL = 9;
export const R_ATTEMPT = 10;
export const R_EPOCH = 11;
export const R_SALT = 12;
export const R_LANE_WORDS = 13;
export const R_LANE_WORD = 14;

const WHAT: readonly string[] = [
  '',
  'the seed must be a u32 (§2.9)',
  'a seed key is four u32 words',
  'a lineage hash is two u32 words (§6.3)',
  "an arena key's layer is 'ground', 'underground' or 'sky' (§2.1)",
  "an arena key's part must be a u32 (§2.2)",
  'an entity key is four u32 words (§6.1)',
  'the stage must be a registered u16 stage id or STAGE_VIEW (§6.1)',
  'the concern must be a registered, unretired u16 concern id — a retired id has no reader (§6.1, T41-1)',
  'reroll must be a u16 (§6.1)',
  "attempt must be an integer from 0 to the concern's registered cap (§6.1)",
  'epoch must be a u32 (§6.1)',
  'salt must be a u16 (§6.1)',
  'a lane key takes at least one word',
  'a lane key word must be a u32',
];

/** Raises the mixer's refusal `code` as a RangeError naming `value` (off the generation path: only on a refusal). */
export function refuse(code: number, value: unknown): never {
  let shown: string;
  try {
    shown = Array.isArray(value) ? `[${value.map((v) => String(v)).join(', ')}]` : typeof value === 'string' ? JSON.stringify(value) : String(value);
  } catch {
    shown = typeof value;
  }
  throw new RangeError(`rng: ${WHAT[code] ?? 'refused'}; got ${shown}`);
}

/** The components of a stream key as a report names them: the entity by its address id (§2.1), not its key. */
export interface KeyComponents extends Partial<StreamOpts> {
  /** The entity's address id, e.g. `plot:7kq2m9x4c1b0a` (or `town` for the town root). */
  readonly entity: string;
  readonly stage: StageId;
  readonly concern: ConcernId;
}

/** A stage id's name in the textual form: `S0` … `S15`, the lettered stages, `VIEW` for STAGE_VIEW, `#n` otherwise. */
export function stageText(stage: number): string {
  if (stage === STAGE_VIEW) return 'VIEW';
  const row = Number.isInteger(stage) && stage >= 0 && stage < STAGE_REGISTRY.rows.length ? STAGE_REGISTRY.rows[stage] : undefined;
  return row === undefined ? `#${String(stage)}` : row.name;
}

/** A concern id's registry name, `#n` for an id no row holds. */
export function concernText(concern: number): string {
  const row = Number.isInteger(concern) && concern >= 0 && concern < CONCERN_REGISTRY.rows.length ? CONCERN_REGISTRY.rows[concern] : undefined;
  return row === undefined ? `#${String(concern)}` : row.name;
}

/**
 * The textual form of a stream key, for reports only (§6.1; C-0143): `<stage>/<concern>@<entity>` followed by
 * `/r=<reroll>`, `/a=<attempt>`, `/e=<epoch>` and `/s=<salt>` for each component that is not 0 — for example
 * `S11/siteplan@plot:7kq2m9x4c1b0a/r=1/a=2`. Never read back and never hashed.
 */
export function keyText(c: KeyComponents): string {
  let out = `${stageText(c.stage)}/${concernText(c.concern)}@${c.entity}`;
  if (c.reroll !== undefined && c.reroll !== 0) out += `/r=${String(c.reroll)}`;
  if (c.attempt !== undefined && c.attempt !== 0) out += `/a=${String(c.attempt)}`;
  if (c.epoch !== undefined && c.epoch !== 0) out += `/e=${String(c.epoch)}`;
  if (c.salt !== undefined && c.salt !== 0) out += `/s=${String(c.salt)}`;
  return out;
}
