// notBuilt(milestone) stubs and the stub table (M0-a-16; J156 (2), M0.md §3 "a stub is a `notBuilt('<milestone>')` with a
// choices row or a §4b entry", M0.md §4b; C-0041, C-0089, C-0185, C-0192, C-0045; readings C-0220).
//
// A façade member a later milestone builds is a `NotBuiltStub`: a frozen object, never a function, so no call reaches it
// (calling it is a type error, TS2349; through a cast, a TypeError). A kernel BRANCH a later milestone builds — a
// transaction on a transient arena, a clear-region batch, prepared contacts, `claimSubFace`'s score form, an
// Order-valued stretch-state profile — is refused at run time where it is met (`notBuilt('<milestone>'): …`, thrown by
// the owning module) and, on the façade, unreachable at the type level where its form is a type (the claim). A staged
// HOOK (a replaceable frame, a multi-part arena key) is listed so the table equals M0.md §4b's kernel entries.
//
// `STUB_TABLE` is the list the checker reads: one row per member, branch or hook, its milestone, the M0.md §4b row it
// answers (that row's first cell, verbatim), the choices rows that decided it, and the kernel source files that refuse
// it at run time (test/facade/stubs.test.ts holds the table against M0.md §4b and against every `notBuilt('…')` site in
// kernel/src).
import type { Milestone, NotBuiltStub } from './types.js';

/** A stub for the façade member `member`, staged to `milestone`: a frozen, non-callable object. */
export function notBuilt<M extends Milestone>(milestone: M, member: string, why = ''): NotBuiltStub<M> {
  return Object.freeze({ notBuilt: milestone, member, why });
}

/** Is `v` a façade stub? */
export function isNotBuilt(v: unknown): v is NotBuiltStub {
  return typeof v === 'object' && v !== null && 'notBuilt' in v && 'member' in v;
}

/** The programming error a staged branch the façade meets throws (the modules' message form). */
export function refuseNotBuilt(milestone: Milestone, what: string): never {
  throw new Error(`notBuilt('${milestone}'): ${what}`);
}

/** Where a staged piece sits. */
export type StubForm =
  /** A façade member that is a `NotBuiltStub`. */
  | 'stub'
  /** A branch of a built member or field, refused at run time (`notBuilt('…')` thrown by its module). */
  | 'refused'
  /** A hook the kernel leaves for the milestone; nothing is refused. */
  | 'hook';

/** One row of the stub table. */
export interface StubRow {
  /** The design name: `geom.<op>`, a `Kernel` member, a `KernelTx` field, or the hook's type and field. */
  readonly member: string;
  readonly milestone: Milestone;
  readonly form: StubForm;
  /** The M0.md §4b row it answers: that row's first cell, verbatim. */
  readonly deferred: string;
  /** The choices rows that decided it. */
  readonly choices: readonly string[];
  /** The kernel/src files that throw `notBuilt('<milestone>')` for it (paths below kernel/src/; [] for a stub or a hook). */
  readonly sites: readonly string[];
}

const TRANSIENT = 'transient arenas, `readBack`, `release`, the re-cut (§3.4)';
const CLEAR = 'clear regions, prepared contacts, carves, S1\'s water operator; the raised ways and their arena parts';

/** The rows of the stub table. */
const ROWS: StubRow[] = [
  { member: 'geom.transientArena', milestone: 'M6-P', form: 'stub', deferred: TRANSIENT, choices: ['C-0041'], sites: [] },
  { member: 'geom.readBack', milestone: 'M6-P', form: 'stub', deferred: TRANSIENT, choices: ['C-0041'], sites: [] },
  { member: 'geom.release', milestone: 'M6-P', form: 'stub', deferred: TRANSIENT, choices: ['C-0041'], sites: [] },
  { member: 'KernelTx.key (a TransientKey)', milestone: 'M6-P', form: 'refused', deferred: TRANSIENT, choices: ['C-0041', 'C-0185'], sites: ['tx/tx.ts'] },
  { member: 'geom.resolveVertexAt', milestone: 'M2a', form: 'stub', deferred: '`resolveVertexAt` (§3.4) — the log-position-to-vertex service', choices: ['C-0089'], sites: [] },
  { member: 'pool', milestone: 'M1', form: 'stub', deferred: 'the derivation pool and overlays, pool sizes 1–3 in the contract tests (§3.3)', choices: ['C-0220'], sites: [] },
  { member: 'geom.claimSubFace (the score form)', milestone: 'M1', form: 'refused', deferred: 'S7b, S9, S10 (step (0) and plots), S10b, S11, S12a–c, S13a, S14', choices: ['C-0192'], sites: ['faces/claim.ts'] },
  { member: 'KernelTx.clearRegion', milestone: 'M3a', form: 'refused', deferred: CLEAR, choices: ['C-0185'], sites: ['tx/tx.ts'] },
  { member: 'KernelTx.prepared', milestone: 'M3a', form: 'refused', deferred: CLEAR, choices: ['C-0169', 'C-0185'], sites: ['tx/tx.ts', 'insert/attractVertex.ts'] },
  { member: 'geom.sampleProfile (an Order-valued stretch-state profile)', milestone: 'M2b', form: 'refused', deferred: 'the stretch-state profile Write protocol and its fixtures (§2.2 rule 5)', choices: ['C-0045', 'C-0185'], sites: ['tx/profile.ts'] },
  { member: 'Plat.frame (replaceable)', milestone: 'M4', form: 'hook', deferred: 'frame growth at an epoch (§3.2 (9))', choices: [], sites: [] },
  { member: 'PlatKey.part (multi-part arenas)', milestone: 'M6-U', form: 'hook', deferred: 'the underground parts\' fixtures (item 65)', choices: [], sites: [] },
];

/** The stub table (M0-a-16): every kernel entry of M0.md §4b, by member. */
export const STUB_TABLE: readonly StubRow[] = Object.freeze(ROWS.map((r) => Object.freeze({ ...r, choices: Object.freeze([...r.choices]), sites: Object.freeze([...r.sites]) })));
