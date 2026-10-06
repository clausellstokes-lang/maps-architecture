// ladderCoverage() (M0-k-04; §13.1 *Ladder coverage*: "every rung of every ladder in §5.2 is reachable by a fixture, and
// each downgrade … is exercised"; §5.2's F-SKELETON and F-NUM rows; §5.1 (8)'s bug abort and (9)'s degenerate kinds;
// C-0085, C-0109). The KERNEL ladders: F-SKELETON's typed downgrades per reader and F-NUM's kernel side — an optional
// chain refused with its typed code, never a throw; a mandatory chain never refused for precision (its acute corner and
// wedge commit with their warnings; its out-of-range point is a bug abort). Each row names the fixture that reaches it
// and is run here over a few draws: a constructive case of M0-k-02's set, or a fixture of this module. A rung only a
// kernel test hook reaches is named with that test (the engine never meets its law on a real input, §3.8). The stage
// ladders (F-CUT, F-ROUTE, F-NUM's re-propose, F-RIVER, F-WALL, F-BUDGET-STAGE, F-WORK) are M0-x-05's, whose
// `stageLadderCoverage()` merges this report unchanged (C-0109) — this file is never edited by M0-x-05.
import { medialAxis, skeleton, type LatticePoint, type Polygon, type Warning } from '@plat/kernel';
import { constructiveCase, CONSTRUCTIVE_SET } from '../constructive/set.js';
import type { ConstructiveInput } from '../constructive/types.js';
import { bugAbort } from './bugs.js';
import { framedAround, kernelOn, lpt, spec } from './support.js';
import type { CoverageReport, CoverageRow } from './types.js';

/** One row's run: how many of its draws reached the rung. */
type Reach = (draw: number) => boolean;

interface RowSpec extends Omit<CoverageRow, 'exercised'> {
  /** null: a deferred row, or a rung a kernel test hook reaches (named in `fixture`). */
  readonly reach: Reach | null;
  readonly draws?: number;
}

/** The case's centred draw (as the judge places it). */
function draw(id: string, seed: number): ConstructiveInput {
  const c = constructiveCase(id);
  if (c === undefined) throw new Error(`ladders: no constructive case ${id}`);
  const g = c.generate(seed);
  if (g.kind !== 'input') throw new Error(`ladders: ${id} is deferred`);
  return g;
}

const hasWarning = (ws: readonly Warning[], code: string) => ws.some((w) => w.code === code && w.count > 0);

/** A skeleton draw's downgrade path, or null when it validated (or was refused). */
function skeletonDowngrade(id: string, seed: number, use?: 'roof' | 'spine'): { to: string; cause: string; reported: boolean; use: string } | null {
  const g = draw(id, seed);
  const st = g.steps[0];
  const rings = String(st.args.rings).split(',').map((n) => g.rings[n]) as Polygon[];
  const u = use ?? (st.args.use as 'roof' | 'spine');
  const r = skeleton(rings, u, u === 'spine' ? { medialAxis: (rs) => medialAxis(rs) } : {});
  if (!r.ok || r.value.kind !== 'downgrade') return null;
  const c = r.value.cause;
  return { to: r.value.to, cause: c.code === 'contract' ? `contract ${c.refusal}` : c.code, reported: hasWarning(r.warnings, 'W_DOWNGRADE'), use: u };
}

/** An L1 way inserted on a framed arena, then a chain beside it in the class given: the second insertion's result. */
function besideWay(way: readonly LatticePoint[], chain: readonly LatticePoint[], cls: 'mandatory' | 'optional') {
  const p = framedAround([...way, ...chain].filter((q) => Math.abs(q.x) < 8_000_000 && Math.abs(q.y) < 8_000_000));
  if (p === null) throw new Error('ladders: no frame');
  const k = kernelOn([p]);
  const a = k.tx(spec(1), (o) => k.geom.insertChain(o, way, [{ role: 'way', entity: 'way:spine' }], 'mandatory'));
  if (!a.ok) throw new Error(`ladders: the way was refused ${a.code}`);
  const version = p.version;
  const r = k.tx(spec(1), (o) => k.geom.insertChain(o, chain, [{ role: 'way', entity: 'way:proposal' }], cls));
  return { r, kept: p.version === version };
}

/** A chain leaving a way's interior point at an angle of `cdeg` centidegrees (a corner below minFaceAngle when < 500). */
function acuteDraw(seed: number, cdeg: number): { way: LatticePoint[]; chain: LatticePoint[] } {
  const L = 20_000 + 97 * seed;
  const x0 = 6_000 + 31 * seed;
  const len = 9_000;
  const t = (cdeg * Math.PI) / 18_000;
  const end = lpt(x0 + Math.round(len * Math.cos(t)), Math.round(len * Math.sin(t)));
  return { way: [lpt(0, 0), lpt(L, 0)], chain: [lpt(x0, 0), end] };
}

const BEYOND = 8_388_608; // 2²³: snap refuses it (§3.2 (7))

const ROWS: readonly RowSpec[] = [
  // ---- F-SKELETON (§5.2; §3.8 *Readers and their downgrades*) ----
  {
    failureClass: 'F-SKELETON',
    rung: 'roof reader: a corner sharper than 5° (the numeric contract refuses) → the plain roof, W_DOWNGRADE',
    tier: 4,
    code: 'W_DOWNGRADE plainRoof (contract sharpCorner)',
    fixture: 'limit/degen-skeleton-sharp-corner',
    status: 'built',
    reach: (s) => {
      const d = skeletonDowngrade('limit/degen-skeleton-sharp-corner', s, 'roof');
      return d !== null && d.to === 'plainRoof' && d.cause === 'contract sharpCorner' && d.reported;
    },
  },
  {
    failureClass: 'F-SKELETON',
    rung: 'roof reader: a hole touching the outer ring or another hole (the contract refuses) → the plain roof, W_DOWNGRADE',
    tier: 4,
    code: 'W_DOWNGRADE plainRoof (contract holeContact)',
    fixture: 'limit/degen-skeleton-hole-touch',
    status: 'built',
    reach: (s) => {
      const d = skeletonDowngrade('limit/degen-skeleton-hole-touch', s);
      return d !== null && d.to === 'plainRoof' && d.cause === 'contract holeContact' && d.reported;
    },
  },
  {
    failureClass: 'F-SKELETON',
    rung: 'spine reader: the contract refuses → the sampled medial axis (M0-a-12), W_DOWNGRADE',
    tier: 4,
    code: 'W_DOWNGRADE medialAxis',
    fixture: 'limit/degen-skeleton-sharp-corner (use spine, the medial axis injected)',
    status: 'built',
    reach: (s) => {
      const d = skeletonDowngrade('limit/degen-skeleton-sharp-corner', s, 'spine');
      return d !== null && d.to === 'medialAxis' && d.reported;
    },
  },
  {
    failureClass: 'F-SKELETON',
    rung: "the event queue reaches its law 4 · (n + r) + 64 → E_WORK_LIMIT, the reader's downgrade (never a timeout)",
    tier: 4,
    code: 'W_DOWNGRADE plainRoof / medialAxis (E_WORK_LIMIT)',
    fixture: "packages/kernel/test/skeleton/worklimit.test.ts — the engine's test hook (C-0168 (5)): a correct engine never meets its law on a real input (§3.8)",
    status: 'built',
    reach: null,
  },
  {
    failureClass: 'F-SKELETON',
    rung: "a validator post-condition fails → the reader's downgrade",
    tier: 4,
    code: 'W_DOWNGRADE (validator)',
    fixture: "packages/kernel/test/skeleton/downgrade.test.ts — the engine's test hook (C-0168 (5))",
    status: 'built',
    reach: null,
  },
  {
    failureClass: 'F-SKELETON',
    rung: '0 crashes on the 1 000 holed polygons: each a validated skeleton or a reported downgrade',
    tier: 4,
    code: 'ok / W_DOWNGRADE',
    fixture: 'skel/holed-polygons',
    status: 'built',
    draws: 1000,
    reach: (s) => {
      const g = draw('skel/holed-polygons', s);
      const rings = String(g.steps[0].args.rings).split(',').map((n) => g.rings[n]) as Polygon[];
      const r = skeleton(rings, 'roof');
      return r.ok && (r.value.kind === 'skeleton' || hasWarning(r.warnings, 'W_DOWNGRADE'));
    },
  },
  {
    failureClass: 'F-SKELETON',
    rung: "regions reader (S10's frontage regions) → the reflex pre-cut partition (F-PLOT's ladder)",
    tier: 4,
    code: 'W_DOWNGRADE reflexPreCut',
    fixture: 'F-PLOT, S10 (§4.7)',
    status: { deferredTo: 'M1' },
    reach: null,
  },
  // ---- F-NUM, the kernel side (§5.2; §3.6 Chain classes; C-0085) ----
  {
    failureClass: 'F-NUM',
    rung: 'optional chain with fewer than two distinct points after snapping and decimation → E_BELOW_MIN_EDGE',
    tier: 1,
    code: 'E_BELOW_MIN_EDGE',
    fixture: 'limit/one-item-chain-optional',
    status: 'built',
    reach: (s) => {
      const g = draw('limit/one-item-chain-optional', s);
      const p = framedAround(g.chains.chain);
      if (p === null) return false;
      const k = kernelOn([p]);
      const v = p.version;
      const r = k.tx(spec(1), (o) => k.geom.insertChain(o, g.chains.chain, [{ role: 'way', entity: 'way:c' }], 'optional'));
      return !r.ok && r.code === 'E_BELOW_MIN_EDGE' && p.version === v;
    },
  },
  {
    failureClass: 'F-NUM',
    rung: 'optional chain making a corner below minFaceAngle → E_BELOW_MIN_ANGLE',
    tier: 1,
    code: 'E_BELOW_MIN_ANGLE',
    fixture: 'ladder/optional-acute (this module: a chain leaving a way at 1°–4°)',
    status: 'built',
    reach: (s) => {
      const d = acuteDraw(s, 100 + 75 * (s % 5));
      const out = besideWay(d.way, d.chain, 'optional');
      return !out.r.ok && (out.r.code === 'E_BELOW_MIN_ANGLE' || out.r.code === 'E_BELOW_MIN_EDGE') && out.kept;
    },
  },
  {
    failureClass: 'F-NUM',
    rung: 'mandatory chain making a corner below minFaceAngle → commits with W_ACUTE_CORNER (never refused for precision)',
    tier: 1,
    code: 'W_ACUTE_CORNER',
    fixture: 'ladder/mandatory-acute (this module)',
    status: 'built',
    reach: (s) => {
      const d = acuteDraw(s, 100 + 75 * (s % 5));
      const out = besideWay(d.way, d.chain, 'mandatory');
      return out.r.ok && (hasWarning(out.r.warnings, 'W_ACUTE_CORNER') || hasWarning(out.r.warnings, 'W_WEDGE_ROUTED') || hasWarning(out.r.warnings, 'W_STRETCH_SHARED'));
    },
  },
  {
    failureClass: 'F-NUM',
    rung: "optional chain whose wedge route would move it more than attractCm → E_BELOW_MIN_EDGE; mandatory → commits W_WEDGE_ROUTED",
    tier: 1,
    code: 'E_BELOW_MIN_EDGE / W_WEDGE_ROUTED',
    fixture: "packages/kernel/test/insert/step3-5/ (M0-a-05's wedge fixtures, C-0177)",
    status: 'built',
    reach: null,
  },
  {
    failureClass: 'F-NUM',
    rung: 'optional chain with a point off the lattice range → E_OUT_OF_RANGE (its optional-chain use; F-NUM re-proposes)',
    tier: 1,
    code: 'E_OUT_OF_RANGE',
    fixture: 'ladder/optional-out-of-range (this module)',
    status: 'built',
    reach: (s) => {
      const out = besideWay([lpt(0, 0), lpt(10_000, 0)], [lpt(5_000 + s, 100), lpt(BEYOND, 200)], 'optional');
      return !out.r.ok && out.r.code === 'E_OUT_OF_RANGE' && out.kept;
    },
  },
  {
    failureClass: 'F-NUM',
    rung: "mandatory chain with a point off the lattice range → E_OUT_OF_RANGE, a bug abort (§5.1 (8)): the batch rolled back, one bugs entry with a replayable key, the entity at tier 6",
    tier: 6,
    code: 'bug',
    fixture: 'ladder/mandatory-out-of-range (this module, bugAbort)',
    status: 'built',
    reach: (s) => {
      const out = bugAbort([lpt(5_000 + s, 100), lpt(BEYOND, 200)], s);
      return out.code === 'E_OUT_OF_RANGE' && out.rolledBack && out.bug !== null && out.tier === 6;
    },
  },
  {
    failureClass: 'F-NUM',
    rung: 'a claim ring that crosses itself → E_SELF_INTERSECT (§3.4 claimSubFace; F-OUTLINE for a drawn ring)',
    tier: 1,
    code: 'E_SELF_INTERSECT',
    fixture: 'ladder/claim-bowtie (this module)',
    status: 'built',
    reach: (s) => {
      const p = framedAround([lpt(-5000, -5000), lpt(5000, 5000)]);
      if (p === null) return false;
      const k = kernelOn([p]);
      const w = 1000 + 10 * s;
      const v = p.version;
      const r = k.tx(spec(1), (o) => k.geom.claimSubFace(o, { ring: [lpt(0, 0), lpt(w, w), lpt(w, 0), lpt(0, 2 * w)] }, 'claim:bowtie'));
      return !r.ok && r.code === 'E_SELF_INTERSECT' && p.version === v;
    },
  },
  {
    failureClass: 'F-NUM',
    rung: 'snap rounding unconverged after 3 passes → commits planar with W_SNAP_PASSES',
    tier: 1,
    code: 'W_SNAP_PASSES',
    fixture: "packages/kernel/test/insert/step3-5/snapRound.test.ts (M0-a-05's pass-cap fixture); limit/cap-snap-passes judges the planar commit",
    status: 'built',
    reach: null,
  },
  {
    failureClass: 'F-NUM',
    rung: 'the fault-injection hook forcing each of the three bug aborts on B-CITY-lite (§5.1 (8))',
    tier: 6,
    code: 'bug',
    fixture: 'B-CITY-lite (M1); B-EDIT (M2a)',
    status: { deferredTo: 'M1' },
    reach: null,
  },
];

/** §5.1 (9)'s degenerate kinds per kernel class: the constructive cases M0-k-02 tagged with `ladder`. */
function degenerateTable(): CoverageReport['degenerate'] {
  const out: { failureClass: 'F-NUM' | 'F-SKELETON'; kind: string; fixture: string }[] = [];
  for (const c of CONSTRUCTIVE_SET) if (c.ladder !== undefined && c.milestone === 'M0') out.push({ failureClass: c.ladder.failureClass, kind: c.ladder.kind, fixture: c.id });
  return out.sort((a, b) => (a.failureClass + a.kind < b.failureClass + b.kind ? -1 : 1));
}

/**
 * The kernel ladders' coverage table (§13.1; C-0085, C-0109): every F-SKELETON and F-NUM kernel rung and downgrade with
 * the fixture that reaches it, each built row's fixture run over `draws` draws (its own count where it names one).
 */
export function ladderCoverage(opts: { readonly draws?: number } = {}): CoverageReport {
  const n = opts.draws ?? 8;
  const rows: CoverageRow[] = ROWS.map((r) => {
    const { reach, draws, ...row } = r;
    if (reach === null) return { ...row, exercised: null };
    const total = Math.min(draws ?? n, Math.max(n, draws === undefined ? n : Math.min(draws, n * 125)));
    let reached = 0;
    for (let s = 0; s < total; s++) if (reach(s)) reached++;
    return { ...row, exercised: { draws: total, reached } };
  });
  const covered = rows.every((r) => r.status !== 'built' || r.exercised === null || r.exercised.reached === r.exercised.draws);
  return { ladders: ['F-NUM', 'F-SKELETON'], rows, degenerate: degenerateTable(), covered };
}
