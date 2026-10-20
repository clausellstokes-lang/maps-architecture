// The constructive set's types (M0-k-02; §13.1 (2) "Constructive degeneracies", §3.11, §3.3; C-0038, C-0110, C-0181). A case
// is a named, seeded generator of one degenerate class with its milestone tag and its expected outcome as data: the
// outcome §3.11's row or §13.1's bullet states, the §3.1 code and detail it names, and the properties the result must
// hold, each a key of CONSTRUCTIVE_PROPERTIES that the runner (M0-k-04) checks. Every coordinate a generator yields is
// a lattice point `snap` accepts (§3.2 (1), (7)); everything else a case needs — the raw doubles `snap` itself is fed,
// distances, levels, joins — is a parameter, never a coordinate.
import type { KernelError, LatticePoint, Seed, WarningCode } from '@plat/kernel';
import type { ConstructiveProperty } from './properties.js';

/**
 * The milestones a case is tagged with: M0 for every class whose mechanism M0 builds, else the milestone that builds
 * it (C-0038: M1 the pool and B-CITY-lite, M2a the edit log, M2b the stretch-state writes, M3a kept content, carves,
 * water edits and the raised way, M4 frame growth, M5 neighbour steps, M6-P the transient arena and the re-cut, M6-U
 * the underground parts; M2a by C-0182 for `resolveVertexAt` and undo / redo, §4b).
 */
export type ConstructiveMilestone = 'M0' | 'M1' | 'M2a' | 'M2b' | 'M3a' | 'M4' | 'M5' | 'M6-P' | 'M6-U';

/**
 * §13.1 (2)'s constructive classes, one per bullet in the section's order, then the two fixture paragraphs that follow
 * the list (items 12 and 28; items 45, 53 and 65) — the transient arena, the re-cut and the underground parts the item
 * names among its deferred classes.
 */
export type ConstructiveClass =
  | 'geometry'
  | 'quantisation'
  | 'attraction-moves'
  | 'kept-carves-water'
  | 'removals-profiles-neighbours'
  | 'stretch-state-writes'
  | 'indexes-slots-pool'
  | 'skeleton-fixtures'
  | 'kernel-limits'
  | 'expectations'
  | 'further-limits'
  | 'fixtures-items-12-28'
  | 'fixtures-items-45-53-65';

/**
 * What the case's scenario returns (§3.1's typed result, §3.11's outcome column, §3.3's onFail, §13.1's bar). Every
 * step before the last returns ok; the outcome is the last step's:
 * - `ok` — the result is ok and every listed property holds after it;
 * - `refused` — the result is a refusal with `code` (and `detail` when given, else the draw's `params.detail`), the
 *   arena kept at its version (§2.2 rule 8);
 * - `typed` — §13.1's bar where the design states no single outcome: ok with every listed property, or a refusal
 *   whose code is in `codes`; never a throw, a hang or an invalid output;
 * - `downgrade` — the reader's typed downgrade: an ok result whose value is the downgrade, reported W_DOWNGRADE
 *   (§3.8, §5.1 tier 4), never a crash;
 * - `assertion` — a debug-build assertion, never a silent read (§3.4, §3.11);
 * - `static` — a property of the kernel's code that no input reaches (§3.11's "reads no dossier field", "reads no
 *   toggle, preset or style"): checked on the kernel package, its draw an empty input.
 */
export type ConstructiveOutcome = 'ok' | 'refused' | 'typed' | 'downgrade' | 'assertion' | 'static';

/** §5.1's tiers the design names for a constructive outcome: 1 reject, 2 repair, 4 downgrade (§3.3, §3.11). */
export type ConstructiveTier = 1 | 2 | 4;

/** A case's expected outcome, as data (C-0110). */
export interface ConstructiveExpect {
  readonly outcome: ConstructiveOutcome;
  /** `refused`: the §3.1 code. */
  readonly code?: KernelError;
  /** `refused`: the detail (§3.1's E_DEGENERATE table, `snap`'s coordinate) when it is the same on every draw. */
  readonly detail?: string;
  /** `typed`: the refusals the case allows beside ok (empty: ok only, every property holding). */
  readonly codes?: readonly KernelError[];
  /** Warnings the design states the call reports (§3.1). */
  readonly warnings?: readonly WarningCode[];
  /** §5.1's tier, where §3.11 or §3.3 names one. */
  readonly tier?: ConstructiveTier;
  /** The properties the result holds (CONSTRUCTIVE_PROPERTIES' keys) — on ok, and `version-kept` on a refusal. */
  readonly holds: readonly ConstructiveProperty[];
  /**
   * The holds that are STATIC readings — a property of the kernel's code or constants, true of every draw by
   * construction, which no code path the draw runs can fail (M0-k-04's N-11, the hardening round S2): each one of
   * `holds`. A runner reports them apart from the holds a draw can break; absent, every hold is judged on the run.
   */
  readonly staticHolds?: readonly ConstructiveProperty[];
  /** The design's words: §13.1's bullet or §3.11's row cell the outcome is read from. */
  readonly clause: string;
}

/** A parameter value: a number (a distance, a level, a raw double for `snap`), a word or a flag, or a list of them. */
export type ConstructiveParam = number | string | boolean | readonly number[] | readonly string[];

/**
 * One step of a case's scenario, in order: the kernel operation by its §3.4 name and its arguments — each the name of
 * a point, point set, chain or ring of the input, or a literal (a level, a role, a chain class, a drag in cm).
 */
export interface ConstructiveStep {
  readonly op: string;
  readonly args: Readonly<Record<string, string | number | boolean>>;
}

/** A generated input: named lattice geometry, parameters and the scenario's steps. */
export interface ConstructiveInput {
  readonly kind: 'input';
  /** The case's id. */
  readonly id: string;
  /** The seed it was drawn from. */
  readonly seed: Seed;
  /** Named lattice points. */
  readonly points: Readonly<Record<string, LatticePoint>>;
  /** Named unordered lattice point lists (sites, sample points). */
  readonly pointSets: Readonly<Record<string, readonly LatticePoint[]>>;
  /** Named open chains (polylines). */
  readonly chains: Readonly<Record<string, readonly LatticePoint[]>>;
  /** Named closed rings, the closing vertex not repeated: outer rings counter-clockwise, holes clockwise. */
  readonly rings: Readonly<Record<string, readonly LatticePoint[]>>;
  /** Everything that is not a coordinate. */
  readonly params: Readonly<Record<string, ConstructiveParam>>;
  /** The scenario, in order. */
  readonly steps: readonly ConstructiveStep[];
}

/** A deferred case's draw: its generator is a stub naming the milestone that builds the class (C-0038). */
export interface ConstructiveDeferred {
  readonly kind: 'deferred';
  readonly id: string;
  readonly milestone: Exclude<ConstructiveMilestone, 'M0'>;
}

/** §5.1 (9)'s degenerate kinds, one input of each per failure class (§13.1's ladder coverage). */
export type ConstructiveDegenerateKind = 'zero-length' | 'zero-area' | 'self-touching' | 'collinear' | 'coincident';

/** A run's verdict on one draw: green, or the reason it failed. */
export type ConstructiveVerdict = { readonly ok: true } | { readonly ok: false; readonly reason: string };

/** One case of the constructive set (the interface `{ id, class, milestone, generate(seed), expect }`). */
export interface ConstructiveCase {
  /** `<class prefix>/<name>`, unique in the set. */
  readonly id: string;
  readonly class: ConstructiveClass;
  readonly milestone: ConstructiveMilestone;
  /** Where the case is read from: `§13.1 <bullet>`, `§3.11 <row>`, `§3.3 Expectations`, `§13.1 items …`. */
  readonly source: string;
  /** The kernel operations it exercises, by their §3.4 names. */
  readonly ops: readonly string[];
  /** Runs green here against the numeric core alone (M0-a-01; C-0110): it carries `run`. */
  readonly numericCore: boolean;
  /** Seeds 0 … sweep − 1 enumerate the class exhaustively (every centidegree, every n); absent: any seed. */
  readonly sweep?: number;
  /** The ladder-coverage pair the case is the kernel's input for (§13.1's ladder coverage, M0-x-06 reads it). */
  readonly ladder?: { readonly failureClass: 'F-NUM' | 'F-SKELETON'; readonly kind: ConstructiveDegenerateKind };
  /** The seeded generator: an input for an M0 case, the `deferred` stub for a later milestone's. */
  generate(seed: Seed): ConstructiveInput | ConstructiveDeferred;
  readonly expect: ConstructiveExpect;
  /**
   * The generator's own check that the draw is the degeneracy it claims, by exact integer tests only (a point on the
   * segment by orient2d, a distance in its band): null when it holds, else the reason. Absent where the claim is the
   * scenario itself.
   */
  readonly witness?: (input: ConstructiveInput) => string | null;
  /** A numeric-core case's run against M0-a-01, judged against `expect` with an independent exact reference. */
  readonly run?: (input: ConstructiveInput) => ConstructiveVerdict;
}
