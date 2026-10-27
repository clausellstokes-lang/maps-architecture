// T34-1 – T41-1 on a face set (M0-b-05; §13.2's bent-cut bars, §13.8: "PR on the M0 (b) faces and NG's recorded
// shapes"; §4.6 steps 1–9). The harness runs each of NG's recorded faces as a one-face district through S8 and checks,
// on that run and on the planner's own plans of the face, the clauses each bar states that a run can show:
//   T34-1  every stop test replayed from its cut.stop stream (the face's entity key, attempt 0): the four uniforms, g,
//          τ = e_lo · (e_hi / e_lo)^g, and the outcome — a face cut had its minor extent at or above τ, a block below
//          it; every block committed by the stop test has a kerb whose OBB minor extent lies below its face's τ;
//   T36-1  on each plan of the face (attempts 0 – 2): no draw between the position and the corner (the start draws
//          nothing); both candidate starts on the minor-axis line at f; A's run the more nearly parallel to the working
//          major axis (ties: the earlier run); on a straight run the first leg leaves A exactly perpendicular;
//   T37-1  on each plan: at most one bend; a kept corner at least o from both ends of its first leg, or at λ / 2 when
//          λ < 2o; the second leg square to its far run within the lattice tolerance (1 cm of the foot); under
//          `flatten` no kept corner's triangle lower than max(cut.flattenM, flattenShare × |A–foot|);
//   T38-1  a fillet on a way cut only — the face planned as a plot cut is never filleted; an arc holds at least
//          cut.arc.minSamplePoints points, its chords no shorter than max(w_min, the lattice minimum edge), and no point
//          beyond the shorter leg from K (it curves the shorter leg, never past it); the filleted share is the
//          comparison's fillet clause;
//   T39-1  rung (a) plans at most cut.ladder.maxFrames frames per face, frame k turned k × cut.ladder.turnCdeg; a face
//          every frame failed reaches rung (b); no ladder leaves fewer faces than it began with;
//   T40-1  inside the district, per class, widths non-decreasing in the lane's length and inside the class's band, and
//          no lane narrower than a lane of a lower class;
//   T41-1  every draw the run reports is keyed by a live cut concern — cut.stop for each stop test — and none by the
//          reserved cut.side or cut.farSideAlt; the registry check (cut.stop live with its reader S8; the two reserved
//          ids with no reader) runs once per report, and the signature row on the faces is the comparison's.
// The full unit tests of each clause are M0-b-02's and M0-b-03's (`layout/test/infill/`); these checks re-run the
// clauses on another face set and count each violation, naming the first few.
import { CONCERN_REGISTRY, CONCERNS, createRng, entityKey, LATTICE, obb, STAGES, type Hash128, type LatticePoint, type PlatKey } from '@plat/kernel';
import { CUT_CLASSES, planCut, stopThreshold, type BlockFaces, type ClassBands, type CutCells, type CutPlan, type CutPlanned, type DistrictReport, type KerbFace, type PlanContext, type PlanStreams } from '@plat/layout';

/** One bar's count on a run: clauses checked, violations, the first few named. */
export interface TCheck {
  readonly checked: number;
  readonly failed: number;
  readonly first: readonly string[];
}

/** The bars a run checks. */
export const T_BARS = Object.freeze(['T34-1', 'T36-1', 'T37-1', 'T38-1', 'T39-1', 'T40-1', 'T41-1'] as const);
export type TBar = (typeof T_BARS)[number];
export type TChecks = Readonly<Record<TBar, TCheck>>;

/** A mutable tally of one bar. */
class Tally {
  checked = 0;
  failed = 0;
  readonly first: string[] = [];
  ok(cond: boolean, why: () => string): void {
    this.checked += 1;
    if (cond) return;
    this.failed += 1;
    if (this.first.length < 3) this.first.push(why());
  }
  done(): TCheck {
    return { checked: this.checked, failed: this.failed, first: [...this.first] };
  }
}

/** Fresh tallies for every bar. */
export function tallies(): Record<TBar, Tally> {
  return { 'T34-1': new Tally(), 'T36-1': new Tally(), 'T37-1': new Tally(), 'T38-1': new Tally(), 'T39-1': new Tally(), 'T40-1': new Tally(), 'T41-1': new Tally() };
}

/** The tallies as checks. */
export function checksOf(t: Record<TBar, Tally>): TChecks {
  const out = {} as Record<TBar, TCheck>;
  for (const b of T_BARS) out[b] = t[b].done();
  return out;
}

interface XY {
  readonly x: number;
  readonly y: number;
}

const sub = (a: XY, b: XY): XY => ({ x: a.x - b.x, y: a.y - b.y });
const dot = (a: XY, b: XY): number => a.x * b.x + a.y * b.y;
const crossOf = (a: XY, b: XY): number => a.x * b.y - a.y * b.x;
const len = (a: XY): number => Math.hypot(a.x, a.y);
const unitOf = (a: XY): XY | null => {
  const l = len(a);
  return l > 0 ? { x: a.x / l, y: a.y / l } : null;
};

function minorOf(ring: readonly LatticePoint[]): number {
  const b = obb(ring);
  return b.ok ? b.value.minorCm : 0;
}

/** T34-1 on a district's run: the stop tests replayed from their cut.stop streams, and the stop blocks' kerbs. */
export function checkT34(t: Tally, seedKey: Readonly<Hash128>, arena: PlatKey, report: DistrictReport, blockFaces: readonly BlockFaces[]): void {
  const rng = createRng();
  for (const s of report.stops) {
    const st = rng.stream(entityKey(seedKey, s.lineage, arena), STAGES.S8, CONCERNS['cut.stop'], { reroll: 0, attempt: 0, epoch: 0, salt: 0 });
    const u = [st.float01(), st.float01(), st.float01(), st.float01()];
    const g = Math.abs((u[0] + u[1] + u[2] + u[3]) * 0.5 - 1);
    const tau = stopThreshold(s.eLoCm, s.eHiCm, g);
    t.ok(u.every((x, i) => x === s.uniforms[i]) && g === s.g && tau === s.tauCm, () => `${s.face}: the stop draw does not replay from its cut.stop stream`);
    t.ok(s.outcome === 'cut' ? s.minorCm >= s.tauCm : s.minorCm < s.tauCm, () => `${s.face}: minor ${s.minorCm.toFixed(1)} cm against τ ${s.tauCm.toFixed(1)} cm yet ${s.outcome}`);
  }
  for (const bf of blockFaces) {
    if (bf.how !== 'stop') continue;
    const s = bf.stop;
    t.ok(s !== null && minorOf(bf.kerb) < s.tauCm, () => `block ${bf.block}: ${s === null ? 'no stop record' : `kerb minor ${minorOf(bf.kerb).toFixed(1)} cm not below τ ${s.tauCm.toFixed(1)} cm`}`);
  }
}

/** T39-1 on a district's run: the frames of rung (a), rung (b) after every frame failed, no face lost. */
export function checkT39(t: Tally, report: DistrictReport, cells: Pick<CutCells, 'maxFrames' | 'ladderTurnCdeg'>): void {
  const byFace = new Map<string, DistrictReport['rungs'][number][]>();
  for (const r of report.rungs) {
    const list = byFace.get(r.face);
    if (list === undefined) byFace.set(r.face, [r]);
    else list.push(r);
  }
  for (const [face, rungs] of byFace) {
    const a = rungs.filter((r) => r.rung === 'a');
    for (const r of a) {
      t.ok(r.attempt >= 0 && r.attempt < cells.maxFrames, () => `${face}: rung (a) at attempt ${String(r.attempt)} of at most ${String(cells.maxFrames)} frames`);
      t.ok(r.turnCdeg === r.attempt * cells.ladderTurnCdeg, () => `${face}: frame ${String(r.attempt)} turned ${String(r.turnCdeg)} cdeg, not ${String(r.attempt * cells.ladderTurnCdeg)}`);
    }
    const tried = new Set(a.map((r) => r.attempt));
    const allFailed = tried.size === cells.maxFrames && a.every((r) => r.outcome !== 'cut' && r.outcome !== 'slit');
    if (allFailed) t.ok(rungs.some((r) => r.rung === 'b'), () => `${face}: every frame failed and rung (b) was not reached`);
  }
  for (const f of report.faces) t.ok(f.facesAfter >= 1, () => `${f.face}: the ladder left ${String(f.facesAfter)} faces`);
}

/** T40-1 on a district's run: per class non-decreasing in length and inside the band; never narrower than a lower class. */
export function checkT40(t: Tally, report: DistrictReport, bands: ClassBands): void {
  const byClass = new Map<string, { lengthCm: number; widthCm: number }[]>();
  for (const l of report.laneLengths) {
    const band = bands[l.cls];
    t.ok(l.widthCm >= band[0] - 1e-9 && l.widthCm <= band[1] + 1e-9, () => `lane ${l.lane}: width ${l.widthCm.toFixed(2)} cm outside the ${l.cls} band [${String(band[0])}, ${String(band[1])}]`);
    const list = byClass.get(l.cls);
    if (list === undefined) byClass.set(l.cls, [{ lengthCm: l.lengthCm, widthCm: l.widthCm }]);
    else list.push({ lengthCm: l.lengthCm, widthCm: l.widthCm });
  }
  for (const [cls, list] of byClass) {
    const s = [...list].sort((p, q) => p.lengthCm - q.lengthCm || p.widthCm - q.widthCm);
    for (let i = 1; i < s.length; i += 1) {
      t.ok(s[i].widthCm >= s[i - 1].widthCm - 1e-9, () => `${cls}: a ${s[i].lengthCm.toFixed(0)} cm lane is narrower than a ${s[i - 1].lengthCm.toFixed(0)} cm one`);
    }
  }
  for (let i = 1; i < CUT_CLASSES.length; i += 1) {
    const lower = byClass.get(CUT_CLASSES[i - 1]) ?? [];
    const upper = byClass.get(CUT_CLASSES[i]) ?? [];
    if (lower.length === 0 || upper.length === 0) continue;
    const maxLower = Math.max(...lower.map((x) => x.widthCm));
    const minUpper = Math.min(...upper.map((x) => x.widthCm));
    t.ok(minUpper >= maxLower - 1e-9, () => `a ${CUT_CLASSES[i]} is narrower (${minUpper.toFixed(2)} cm) than an ${CUT_CLASSES[i - 1]} (${maxLower.toFixed(2)} cm)`);
  }
}

/** The reserved cut concerns no reader draws (§6.1; T41-1). */
const RESERVED_RE = /cut\.(?:side|farSideAlt)(?![A-Za-z])/;

/** T41-1 on a district's run: every stop keyed by cut.stop, no draw keyed by a reserved concern. */
export function checkT41Run(t: Tally, report: DistrictReport): void {
  for (const s of report.stops) t.ok(s.key.includes('cut.stop') && !RESERVED_RE.test(s.key), () => `${s.face}: the stop draw is keyed ${s.key}`);
  for (const r of report.rungs) if (r.key !== undefined) t.ok(!RESERVED_RE.test(r.key), () => `${r.face}: a rung drew on ${r.key}`);
}

/** T41-1's registry clause (once per report): cut.stop live with S8 its reader; cut.side and cut.farSideAlt reserved, no reader. */
export function checkT41Registry(t: Tally): void {
  const row = (name: string) => CONCERN_REGISTRY.rows.find((r) => r.name === name);
  const stop = row('cut.stop');
  t.ok(stop !== undefined && stop.retired === false && stop.readers.length === 1 && stop.readers[0] === 'S8' && CONCERNS['cut.stop'] === stop.id, () => 'cut.stop is not registered live with its reader S8');
  for (const name of ['cut.side', 'cut.farSideAlt']) {
    const r = row(name);
    t.ok(r !== undefined && r.retired === true && r.readers.length === 0, () => `${name} is not a reserved id without a reader`);
  }
}

/** The planner's clauses (T36-1, T37-1, T38-1) on one planned cut. */
export function checkPlan(t: Record<TBar, Tally>, p: CutPlanned, cells: CutCells, wMinCm: number, where: string): void {
  // T36-1
  const steps = p.draws.map((d) => d.step);
  const pos = steps.indexOf('position');
  t['T36-1'].ok(pos >= 0 && steps[pos + 1] === 'corner', () => `${where}: a draw between the position and the corner (${steps.join(', ')})`);
  const at = p.frame.sMin + p.start.f * p.frame.lengthCm;
  const s = (q: XY): number => dot(sub(q, p.frame.centre), p.frame.major);
  t['T36-1'].ok(Math.abs(s(p.start.A) - at) <= 1e-3 && Math.abs(s(p.start.other) - at) <= 1e-3, () => `${where}: a candidate start off the minor-axis line at f`);
  const par = (i: number): number => crossOf(p.sides.runs[i].dir, p.frame.major) ** 2;
  const mine = par(p.start.run);
  const other = par(p.start.otherRun);
  t['T36-1'].ok(mine < other || (mine === other && (p.start.run <= p.start.otherRun)), () => `${where}: A's run is not the more nearly parallel (ties: the earlier)`);
  const run = p.sides.runs[p.start.run];
  if (run.spreadCdeg === 0) t['T36-1'].ok(Math.abs(dot(p.start.normal, run.dir)) <= 1e-9, () => `${where}: the first leg does not leave A perpendicular to its straight run`);
  // T37-1 (each candidate geometry the plan offers)
  for (const g of [p.cut, p.alternate]) {
    if (g === null) continue;
    t['T37-1'].ok(g.legs.length === 2 || g.legs.length === 3, () => `${where}: ${String(g.legs.length - 2)} bends`);
    if (!g.bent) continue;
    const { lambdaCm, oCm, atCm } = p.corner;
    const placed = lambdaCm < 2 * oCm ? Math.abs(atCm - lambdaCm / 2) <= 1e-6 : atCm >= oCm - 1e-6 && lambdaCm - atCm >= oCm - 1e-6;
    t['T37-1'].ok(placed, () => `${where}: the corner at ${atCm.toFixed(1)} cm of λ ${lambdaCm.toFixed(1)} cm with o ${oCm.toFixed(1)} cm`);
    if (p.far === null) t['T37-1'].ok(false, () => `${where}: a bent cut with no far run`);
    else if (g.ends[0].slidCm === 0 && g.ends[1].slidCm === 0) {
      const d = unitOf(p.far.dir);
      const off = d === null ? Infinity : Math.abs(dot(sub(g.legs[2], g.legs[1]), d));
      t['T37-1'].ok(off <= LATTICE.unitCm, () => `${where}: the second leg misses square by ${off.toFixed(3)} cm at the foot`);
    }
    if (p.mode === 'flatten') t['T37-1'].ok(g.heightCm >= g.flattenThresholdCm - 1e-9, () => `${where}: a kept corner ${g.heightCm.toFixed(1)} cm high under the flatten threshold ${g.flattenThresholdCm.toFixed(1)} cm`);
    // T38-1
    const fl = g.fillet;
    if (fl === null || !fl.filleted) continue;
    const K = g.legs[1];
    const shorter = Math.min(len(sub(K, g.legs[0])), len(sub(g.legs[2], K)));
    const floor = Math.max(wMinCm, LATTICE.minEdgeCm);
    t['T38-1'].ok(fl.arc.length >= cells.minSamplePoints, () => `${where}: an arc of ${String(fl.arc.length)} points`);
    let minChord = Infinity;
    for (let i = 1; i < fl.arc.length; i += 1) minChord = Math.min(minChord, len(sub(fl.arc[i], fl.arc[i - 1])));
    t['T38-1'].ok(minChord >= floor * (1 - 1e-9), () => `${where}: an arc chord of ${minChord.toFixed(1)} cm under ${floor.toFixed(1)} cm`);
    t['T38-1'].ok(fl.arc.every((q) => len(sub(q, K)) <= shorter + LATTICE.unitCm), () => `${where}: an arc point beyond the shorter leg from K`);
  }
}

/**
 * The plans of one face at attempts 0 … maxFrames − 1 (a later frame holds the first plan's stop draw), each checked, and
 * the face planned as a plot cut. `plan` is the planner (layout's planCut; a test plants a break through it).
 */
export function checkFacePlans(t: Record<TBar, Tally>, face: KerbFace, ctx: PlanContext, streams: PlanStreams, cells: CutCells, wMinCm: number, where: string, plan: typeof planCut = planCut): void {
  const p0 = plan(face, ctx, streams);
  const first = p0.ok ? p0.value : p0.partial;
  if (first === undefined || first.kind === 'block') return;
  for (let k = 0; k < cells.maxFrames; k += 1) {
    const pk = k === 0 ? p0 : plan(face, { ...ctx, attempt: k, stop: first.stop }, streams);
    if (pk.ok && pk.value.kind === 'cut') checkPlan(t, pk.value, cells, wMinCm, `${where} frame ${String(k)}`);
  }
  // T38-1: the same face planned as a plot cut is never filleted.
  const plot = plan(face, { ...ctx, cutKind: 'plot' }, streams);
  const sharp = plot.ok ? plotCutSharp(plot.value) : null;
  if (sharp !== null) t['T38-1'].ok(sharp, () => `${where}: a plot cut filleted`);
}

/**
 * T38-1's plot clause on a face planned as a plot cut: null when the plan keeps no corner to judge (a block, a straight
 * cut, the next rung); else whether its corner was left sharp because it is a plot cut (§4.6 step 6: never filleted).
 */
export function plotCutSharp(plot: CutPlan): boolean | null {
  if (plot.kind !== 'cut' || !plot.cut.bent) return null;
  const fl = plot.cut.fillet;
  return fl !== null && !fl.filleted && fl.sharpBecause === 'plot';
}
