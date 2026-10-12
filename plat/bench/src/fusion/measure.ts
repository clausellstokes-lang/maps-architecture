// One derivation measured (M0-c-06; §16 M0 (c), §13.5, §13.2, §4.4's gate, §12.4; C-0067, C-0091, C-0094; readings
// C-0270). Everything here reads the derived model — the arena through the façade, the stages' records — and returns a
// numbers-only `SeedRecord` (a worker posts it back; the report folds them):
//   * restarts: every registered stage run exactly once, in the model's order (§5.1 (1)); S5's sub-steps once per growth
//     stage and at most one top-up each; every ladder use counted (the report's, S5's and S8's own records);
//   * the street network as M0-k-05's MetricDoc (every way of S4, S5 and S8 at L1, S5c's streets read from their origin,
//     the outermost wall) measured by METRICS: the junction row (p5, median, 4-way share), the 10 m turn histogram (the
//     cliff clause), the growth-drift windows;
//   * the block areas (S8's working blocks) and the lane lengths (S8's cuts, kerb to kerb) per band;
//   * the face counts (districts, cuts, blocks);
//   * roads leaving each walled stage against its gate count N (§13.5's towers-and-gates row);
//   * the lanes crossing a wall strip (§4.6's wall test; §13.2);
//   * S8 ≡ S9: corridorUnion over every district's committed L1 faces (S9's kernel op, §3.7) in one L2 batch per
//     district, each block's L2 face compared with S8's working block — kerb(F) of the L1 face as S8 left it (N-52 (1)):
//     Hausdorff ≤ 2 · √2 · attractCm on every block (exact at the vertices), the exact-0 share reported, and the kerb S8
//     stopped on compared with it (its drift, within the same bound);
//   * the refusal census (J264): S8's refused districts, S9's refused unions, the kerb reads refused, the corpus's
//     downgrades, the kernel's downgrades and work-limit hits, the report's unplaced and degraded rows;
//   * the skeleton corpus bar re-run on the district faces (M0-a-12's `skeletonCorpus`, C-0067);
//   * the work charged per counter with its law's units (C-0091); the per-stage stamps (C-0084).
import { corridorUnion, faceRings, idOf, isFaceLive, kerb, LATTICE, pointLocate, STAGES, type Hash128, type KernelTx, type LatticePoint, type StageId } from '@plat/kernel';
import { spineWidthsOf, wayLines, wayWidthCm, type GrowthState, type S5Record, type S8Output } from '@plat/layout';
import type { District, Id, Way } from '@plat/model';
import { armGapsDeg, metricById, streetGraph, turnCliff, type MetricDoc, type MetricWay } from '@plat/testkit';
import { loadWorkLimits } from '@plat/tables';
import { skeletonCorpus, type CorpusReport } from '../skeleton/runner.js';
import { cutRegion, directed, needleCm, ringRegion, seedComponents, sliver, unionRegion, type Band, type DriftComparison, type Region } from './drift.js';
import { area2, boundaryLoops, compareBoundaries, compareRings, type P } from './hausdorff.js';
import { asPolygons, GROUND, sideOfRing, wallLines, type Derivation, type RunKind } from './runs.js';

/** The skeleton uses the corpus bar runs (M0-a-12 judges both). */
export const CORPUS_USES = ['roof', 'spine'] as const;

/** A counter's work in one batch scope with its law's limit and unit divisor (C-0091). */
export interface WorkRow {
  readonly counter: string;
  readonly stage: string;
  readonly work: number;
  readonly limit: number;
  /** The law's unit count the limit was read at (linear: count; log2: ⌈log2 count⌉), at least 1. */
  readonly units: number;
}

/** One block's S8 ≡ S9 comparison that did not hold exactly (the first few, for the report). */
export interface HausdorffMiss {
  readonly block: Id;
  readonly cm: number;
  /** Beyond N-52 (1)'s bound (a defect that fails the run). */
  readonly beyond: boolean;
  readonly why: string;
}

/** N-52 (1)'s hard bar: S8's working block within 2 · √2 · attractCm of S9's committed block (Hausdorff), squared, cm². */
export const S8S9_BOUND_SQ = 8 * LATTICE.attractCm * LATTICE.attractCm;

/** The bound in cm (≈ 73.54; reports only — the verdict compares squares exactly, `compareRings`). */
export const S8S9_BOUND_CM = Math.sqrt(S8S9_BOUND_SQ);

/**
 * The exact-0 share's ratchet on the test size's seeds 1 – 2, both runs (N-52 (5); C-0320 (4)): it only rises. N-52 (5)
 * names 0.95; the committed tree measures 0.913 – 0.935 there (the misses ≤ 1 cm lattice re-snaps of corridorUnion's
 * commit and one class-(b) attraction of 4 – 19 cm a seed, all within the bound), so the floor stands at the measured
 * 0.91 until the M0 hardening phase's KI (exact 0, N-52 (1)) raises it.
 */
export const S8S9_EXACT_FLOOR = 0.91;

/** The refusal census of one derivation (J264): every refusal the run met, by where it was met. */
export interface RefusalCensus {
  /** S8's refused districts (`infill.report.refused`). */
  readonly s8: number;
  /** S9's corridorUnion refused (one per district batch). */
  readonly s9: number;
  /** The kerb reads after S8 that were refused or found no ring holding the block's seed. */
  readonly kerbReads: number;
  /** The skeleton corpus's downgrades on the district faces (roof, spine). */
  readonly corpusRoof: number;
  readonly corpusSpine: number;
  /** The kernel's report: downgrades and work-limit hits over the derivation. */
  readonly kernelDowngrades: number;
  readonly kernelWorkLimitHits: number;
  /** The generation report's unplaced entities and requested rows not delivered in full. */
  readonly unplaced: number;
  readonly degraded: number;
}

/** One seed's run, measured: numbers only. */
export interface SeedRecord {
  readonly seed: number;
  readonly run: RunKind;
  /** §5.1 (8)'s bug entries (CI requires none): `stage:class`. */
  readonly bugs: readonly string[];
  readonly order: readonly string[];
  /** Σ (invocations − 1) over the registered stages, plus a registered stage the order did not run (§5.1 (1)). */
  readonly restarts: number;
  readonly invocations: Readonly<Record<string, number>>;
  /** S5's growth stages: the k of every S5c, prune and S5d record, and each stage's top-ups. */
  readonly s5: { readonly growth: readonly number[]; readonly prune: readonly number[]; readonly capacity: readonly number[]; readonly topUps: readonly number[] };
  /** Every ladder use, `stage/class/rung` → count. */
  readonly ladder: Readonly<Record<string, number>>;
  /** The per-stage wall-clock stamps (ms), CONTENDED outside the timing phase. */
  readonly stampsMs: Readonly<Record<string, number>>;
  readonly faces: { readonly districts: number; readonly cuts: number; readonly blocks: number; readonly s8Refused: number };
  readonly junction: { readonly p5: number; readonly median: number; readonly share4: number; readonly nodes: number; readonly nodes4: number; readonly gaps: readonly number[] };
  readonly turns: { readonly steps: number; readonly bins: readonly number[]; readonly cliff: boolean };
  readonly drift: readonly number[];
  /** Per band: the block areas (m², METRICS' block.area) and the lane lengths (m). */
  readonly bands: Readonly<Record<string, { readonly blockAreasM2: readonly number[]; readonly cutLengthsM: readonly number[] }>>;
  /** Per walled stage: its main gates N and the roads leaving it (crossings of its wall line by every way). */
  readonly roads: readonly { readonly k: number; readonly n: number; readonly leaving: number }[];
  readonly strips: { readonly faces: number; readonly lanes: number; readonly crossings: number };
  /**
   * S8 ≡ S9 (N-52 (1)): blocks, working blocks compared (a split block's two), exact (Hausdorff 0), within the lattice's
   * 1 cm, `beyond` the bound (the hard bar: 0), the largest distance, the split blocks, the blocks S9 left at L1; the stop
   * kerb's drift (N-57 (4), C-0333 (1)) — `drifted` (the kerb S8 stopped on ≠ the working block), its largest Hausdorff
   * distance with the needle's length, the largest one-sided distance stop → working (reported), the largest sliver width
   * between the two and `driftBeyond` (a sliver beyond the bound; asserted 0) — and `commit` (the working block ≠ S9's
   * committed face); S9's refused unions and the kerb reads refused; the misses.
   */
  readonly hausdorff: S8S9Record;
  readonly refusals: RefusalCensus;
  readonly corpus: { readonly faces: number; readonly roof: CorpusCounts; readonly spine: CorpusCounts };
  readonly work: readonly WorkRow[];
  /** The model digest's root, and its root at S5's end (the two runs share S1 – S5). */
  readonly root: string;
  readonly rootS5: string;
}

/** One derivation's S8 ≡ S9 record (see `SeedRecord.hausdorff`). */
export interface S8S9Record {
  readonly blocks: number;
  readonly compared: number;
  readonly zero: number;
  readonly within1cm: number;
  readonly beyond: number;
  readonly maxCm: number;
  readonly split: number;
  /** Blocks whose S9 block is the L1 face itself: the L2 view holds no record there (§2.2 rule 2). */
  readonly s9OwnL1: number;
  readonly drifted: number;
  /** The stop kerb's drift (N-57 (4)): the largest Hausdorff distance (reported) and the needle's length on that block. */
  readonly driftMaxCm: number;
  readonly driftNeedleCm: number;
  /** The largest one-sided distance stop → working (reported) and the largest sliver width between the stop kerb and the
   * working block (asserted; C-0333 (1)). */
  readonly driftOneSidedMaxCm: number;
  readonly driftSliverMaxCm: number;
  readonly driftBeyond: number;
  /** A split block's stop-region parts holding no seed (`BlockDrift.seedless`), summed; reported (C-0333 (2)). */
  readonly driftSeedless: number;
  readonly commit: number;
  readonly s9Refused: number;
  readonly kerbReads: number;
  /** The distance (cm) of every compared block that was not exact, in block order (the report's quantiles). */
  readonly missCm: readonly number[];
  readonly misses: readonly HausdorffMiss[];
}

/** A corpus run's counts (M0-a-12's report, numbers only). */
export interface CorpusCounts {
  readonly faces: number;
  readonly downgrades: number;
  readonly workLimitHits: number;
  readonly failures: number;
}

function hex(h: Readonly<Hash128> | undefined): string {
  if (h === undefined) return '';
  return [...h].map((x) => (x >>> 0).toString(16).padStart(8, '0')).join('');
}

function count(m: Record<string, number>, k: string, by = 1): void {
  m[k] = (m[k] ?? 0) + by;
}

// ---- the street network ------------------------------------------------------------------------------------------------

/**
 * The run's street network as M0-k-05's MetricDoc: every way of S4 / S5 (the growth state's) and every S8 lane, each
 * run of its committed spine; S5c's streets marked grown and organic and read from their origin (C-0258 (5)); the
 * outermost wall line closed.
 */
export function metricDocOf(d: Derivation): MetricDoc {
  const data = d.model.data;
  const state = data.get('s5.growth') as GrowthState | undefined;
  const s5 = data.get('s5') as S5Record | undefined;
  const lanes = (data.get('lanes') as readonly Way[] | undefined) ?? [];
  if (state === undefined) return { ways: [] };
  const streets = s5 === undefined ? [] : [...s5.growth.flatMap((g) => g.streets), ...s5.capacity.flatMap((c) => (c.rim === null ? [] : c.rim.streets))];
  const origin = new Map(streets.map((s) => [s.way.id, s.points[0]]));
  const all: Way[] = [...state.ways, ...lanes];
  const cls = new Map(all.map((w) => [w.id, w.class]));
  const ways: MetricWay[] = [];
  for (const l of wayLines(d.model.kernel, all.map((w) => w.id), GROUND)) {
    const o = origin.get(l.way);
    l.runs.forEach((run, i) => {
      const z = run.points[run.points.length - 1];
      const line = o !== undefined && z.x === o.x && z.y === o.y ? run.points.slice().reverse() : run.points;
      ways.push({ id: l.runs.length === 1 ? l.way : `${l.way}#${String(i)}`, class: cls.get(l.way) ?? 'lane', line, grown: o !== undefined, organic: true });
    });
  }
  const walls = wallLines(state);
  return walls.length === 0 ? { ways } : { ways, wall: walls[walls.length - 1].ring.slice() };
}

function measured(id: string, doc: MetricDoc, key = 'all'): number | readonly number[] | null {
  const m = metricById(id);
  if (m === undefined) throw new Error(`fusion: no metric ${id}`);
  const v = m.measure(doc);
  if ('notApplicable' in v) return null;
  return v.values.get(key) ?? null;
}

/** The junction row on one doc, with the gap sample and node counts for pooling (C-0094). */
export function junctionRow(doc: MetricDoc): SeedRecord['junction'] {
  const g = streetGraph(doc);
  const gaps: number[] = [];
  let nodes = 0;
  let nodes4 = 0;
  for (const n of g.nodes) {
    if (n.degree < 3) continue;
    nodes += 1;
    if (n.degree === 4) nodes4 += 1;
    for (const a of armGapsDeg(n.bearings)) gaps.push(a);
  }
  const p5 = measured('junction.angles', doc, 'all/p5');
  const median = measured('junction.angles', doc, 'all/median');
  const share4 = measured('junction.share4', doc);
  return { p5: typeof p5 === 'number' ? p5 : Number.NaN, median: typeof median === 'number' ? median : Number.NaN, share4: typeof share4 === 'number' ? share4 : Number.NaN, nodes, nodes4, gaps };
}

/** The 10 m step-turn histogram (1° bins) and the cliff clause on one doc. */
export function turnRow(doc: MetricDoc): SeedRecord['turns'] {
  const steps = (measured('street.turnStep10m', doc) as readonly number[] | null) ?? [];
  const c = turnCliff(steps);
  return { steps: c.steps, bins: c.bins.slice(), cliff: c.cliff };
}

// ---- roads leaving the walled stages and the strips -------------------------------------------------------------------

/**
 * The passages of a street network through a closed ring (1 cm): the network's vertices merged by exact position and
 * each classified in / out / on the ring; a segment from an inside vertex straight to an outside one is a passage, and
 * so is each connected run of on-ring vertices with an inside and an outside neighbour (a road through a gate vertex,
 * whether one way runs through it or two ways meet there).
 */
export function ringPassages(lines: readonly (readonly { x: number; y: number }[])[], ring: readonly { x: number; y: number }[]): number {
  const index = new Map<string, number>();
  const side: ('in' | 'out' | 'on')[] = [];
  const adj: Set<number>[] = [];
  const vid = (q: { x: number; y: number }): number => {
    const key = `${String(q.x)},${String(q.y)}`;
    let i = index.get(key);
    if (i === undefined) {
      i = side.length;
      index.set(key, i);
      side.push(sideOfRing(q, ring));
      adj.push(new Set());
    }
    return i;
  };
  for (const line of lines) {
    let prev = -1;
    for (const q of line) {
      const v = vid(q);
      if (prev >= 0 && prev !== v) {
        adj[prev].add(v);
        adj[v].add(prev);
      }
      prev = v;
    }
  }
  let n = 0;
  const seen = new Uint8Array(side.length);
  for (let v = 0; v < side.length; v += 1) {
    if (side[v] === 'in') for (const u of adj[v]) if (side[u] === 'out') n += 1;
    if (side[v] !== 'on' || seen[v] === 1) continue;
    // The on-ring component of v: does it touch both sides?
    let hasIn = false;
    let hasOut = false;
    const stack = [v];
    seen[v] = 1;
    while (stack.length > 0) {
      const x = stack.pop() as number;
      for (const u of adj[x]) {
        if (side[u] === 'in') hasIn = true;
        else if (side[u] === 'out') hasOut = true;
        else if (seen[u] === 0) {
          seen[u] = 1;
          stack.push(u);
        }
      }
    }
    if (hasIn && hasOut) n += 1;
  }
  return n;
}

/**
 * §13.5's towers-and-gates clause "roads leaving each walled stage on ground part 0 = its gate count": per walled
 * stage, N its main gates (the flat fixture has no water, harbour or carried way) and the roads leaving it, the
 * network's passages through its wall line (`ringPassages`).
 */
export function roadsLeaving(state: GrowthState, doc: MetricDoc): SeedRecord['roads'] {
  const out: { k: number; n: number; leaving: number }[] = [];
  for (const w of wallLines(state)) {
    const st = state.stages[w.k - 1];
    const n = st.gates.filter((g) => g.kind === 'main').length;
    out.push({ k: w.k, n, leaving: ringPassages(doc.ways.map((x) => x.line), w.ring) });
  }
  return out;
}

/** The parts of a segment strictly inside a ring (beyond 1 cm of its boundary): does any exist? */
export function segmentEnters(a: LatticePoint | { x: number; y: number }, b: { x: number; y: number }, ring: readonly { x: number; y: number }[]): boolean {
  // Split the segment at its crossings with the ring's edges; test each piece's midpoint.
  const ts: number[] = [0, 1];
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i, i += 1) {
    const p = ring[j];
    const q = ring[i];
    const ex = q.x - p.x;
    const ey = q.y - p.y;
    const den = dx * ey - dy * ex;
    if (den === 0) continue;
    const t = ((p.x - a.x) * ey - (p.y - a.y) * ex) / den;
    const u = ((p.x - a.x) * dy - (p.y - a.y) * dx) / den;
    if (t > 0 && t < 1 && u >= 0 && u <= 1) ts.push(t);
  }
  ts.sort((x, y) => x - y);
  for (let i = 1; i < ts.length; i += 1) {
    if (ts[i] - ts[i - 1] <= 0) continue;
    const m = (ts[i] + ts[i - 1]) / 2;
    if (sideOfRing({ x: a.x + m * dx, y: a.y + m * dy }, ring) === 'in') return true;
  }
  return false;
}

/** A lane crosses a strip when some part of its line lies strictly inside a strip face (beyond 1 cm of its boundary). */
export function lanesInStrips(lanes: readonly (readonly { x: number; y: number }[])[], strips: readonly (readonly { x: number; y: number }[])[]): number {
  const box = (r: readonly { x: number; y: number }[]) => {
    let x0 = Infinity;
    let y0 = Infinity;
    let x1 = -Infinity;
    let y1 = -Infinity;
    for (const q of r) {
      x0 = Math.min(x0, q.x);
      y0 = Math.min(y0, q.y);
      x1 = Math.max(x1, q.x);
      y1 = Math.max(y1, q.y);
    }
    return { x0, y0, x1, y1 };
  };
  const sb = strips.map(box);
  let n = 0;
  for (const line of lanes) {
    const lb = box(line);
    let crosses = false;
    for (let s = 0; s < strips.length && !crosses; s += 1) {
      const b = sb[s];
      if (lb.x1 < b.x0 || lb.x0 > b.x1 || lb.y1 < b.y0 || lb.y0 > b.y1) continue;
      for (let i = 1; i < line.length && !crosses; i += 1) if (segmentEnters(line[i - 1], line[i], strips[s])) crosses = true;
    }
    if (crosses) n += 1;
  }
  return n;
}

/** The live L1 faces of the wall strips (owner `wall_strip:<enceinte>-<side>`, C-0226 (9)), as their outer rings. */
export function stripFaces(d: Derivation): LatticePoint[][] {
  const p = d.model.kernel.plat(GROUND);
  const rings: LatticePoint[][] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) {
    const h = p.faces[1].owner[f];
    if (h < 0 || !isFaceLive(p, 1, f)) continue;
    if (!idOf(p, h).startsWith('wall_strip:')) continue;
    rings.push(faceRings(p, 1, f)[0].slice());
  }
  return rings;
}

// ---- S8 ≡ S9 -----------------------------------------------------------------------------------------------------------

/** The widths S8's kerbs read: every S4 / S5 way's (M0-x-04's `wayWidthCm`) and every S8 lane's. */
export function widthMap(d: Derivation): Map<Id, number> {
  const state = d.model.data.get('s5.growth') as GrowthState | undefined;
  const lanes = (d.model.data.get('lanes') as readonly Way[] | undefined) ?? [];
  const m = new Map<Id, number>();
  for (const w of state?.ways ?? []) m.set(w.id, wayWidthCm(w));
  for (const w of lanes) m.set(w.id, wayWidthCm(w));
  return m;
}

/**
 * The kerb S8 stopped on at one seed of a block (C-0270 (5), N-57 (4)): `blockFaces.kerb` — kerb(F) AT THE CUT, the
 * record, never re-read at the stage end. For a block a back lane or a through alley split, the record is the parent's
 * kerb at the cut; each child's stop kerb is that kerb less the spine's band (`stopRegion`, C-0333 (2)).
 */
export function stopKerb(b: { readonly kerb: readonly LatticePoint[] }): readonly LatticePoint[] {
  return b.kerb;
}

/**
 * A planted change for the contract test (the tests' 1 cm shift): the working block read, changed before it is compared —
 * with S9's block and with the kerb S8 stopped on (its drift).
 */
export type KerbPlant = (block: Id, ring: readonly LatticePoint[]) => readonly LatticePoint[];

/** A lane's committed centreline runs and half-width, with the runs' boxes (the spines a split block's stop kerb loses). */
export interface LaneBand {
  readonly way: Id;
  readonly band: Band;
  readonly box: { readonly x0: number; readonly y0: number; readonly x1: number; readonly y1: number };
}

function boxOf(r: readonly { x: number; y: number }[]): LaneBand['box'] {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const q of r) {
    x0 = Math.min(x0, q.x);
    y0 = Math.min(y0, q.y);
    x1 = Math.max(x1, q.x);
    y1 = Math.max(y1, q.y);
  }
  return { x0, y0, x1, y1 };
}

/** Every S8 lane's committed runs as bands (half its width, M0-x-04's `wayWidthCm`). */
export function laneBands(d: Derivation): LaneBand[] {
  const lanes = (d.model.data.get('lanes') as readonly Way[] | undefined) ?? [];
  const out: LaneBand[] = [];
  for (const l of wayLines(d.model.kernel, lanes.map((w) => w.id), GROUND)) {
    const w = lanes.find((x) => x.id === l.way);
    if (w === undefined) continue;
    for (const run of l.runs) if (run.points.length >= 2) out.push({ way: l.way, band: { line: run.points, hw: wayWidthCm(w) / 2 }, box: boxOf(run.points) });
  }
  return out;
}

/**
 * The stop region of a block (N-57 (4), C-0333 (2)): the kerb S8 stopped on, less the band of every lane whose
 * centreline enters it — the deep-interior spine of a split block (a stopped block's kerb is entered by no other lane;
 * the bounding spines run outside it, beyond their half-width). With no lane entering, the stop kerb itself.
 */
export function stopRegion(stop: readonly P[], lanes: readonly LaneBand[]): { region: Region; spines: Id[] } {
  const bb = boxOf(stop);
  const bands: Band[] = [];
  const spines: Id[] = [];
  for (const l of lanes) {
    if (l.box.x1 < bb.x0 || l.box.x0 > bb.x1 || l.box.y1 < bb.y0 || l.box.y0 > bb.y1) continue;
    let enters = false;
    for (let i = 1; i < l.band.line.length && !enters; i += 1) if (segmentEnters(l.band.line[i - 1], l.band.line[i], stop)) enters = true;
    if (!enters) continue;
    bands.push(l.band);
    if (!spines.includes(l.way)) spines.push(l.way);
  }
  return { region: cutRegion(stop, bands), spines };
}

/** One block's stop kerb against its working block(s) (`compareDrift`, N-57 (4)) with the reported distances. */
export interface BlockDrift {
  /** Per seed: the drift clause's verdict and its two distances (cm). */
  readonly rows: readonly (DriftComparison & { readonly hausdorffCm: number; readonly needleCm: number; readonly drifted: boolean })[];
  /** The lanes read as the block's spines (a split block's). */
  readonly spines: readonly Id[];
  /** The stop region's components holding none of the block's seeds (a split child's kerb part S8 records no seed for:
   * the spine's band cut it off at a neck; reported, never drift — C-0333 (2)). */
  readonly seedless: number;
}

/**
 * The drift clause on one block (N-57 (4) as C-0333 (1) reads it): the SLIVER WIDTH of any region between the stop
 * kerb and the working block — of each working block beyond the stop region (N-57 (4) (ii)) and of the stop region
 * beyond the block's working rings together (its mirror) — each within N-52 (1)'s bound: a lawful edge offset of the
 * kerb at the cut (≤ 2 · attractCm, N-52's class (a)) gives a sliver no wider than the offset however long the needle
 * it makes at an acute tip, on whichever side the needle lies, while a 1 m parallel shift of a whole edge gives a 1 m
 * wide one. Reported beside it: the one-sided distance stop → working (N-57 (4) (i); asserted by the ruling, it reads a
 * needle of the STOP kerb as drift — fusion 30's 199.6 cm tip at a 4° wedge — so it is reported, C-0333 (1)), the
 * Hausdorff distance and the needle's length. An unsplit block's Hausdorff is `compareRings`' (exact 0 on equal
 * canonical forms, `drifted` otherwise); a split child's the larger of the two directed distances between its working
 * ring and the rebuilt stop boundary (off the lattice: `drifted` beyond 1 cm). A missing ring is beyond.
 */
export function blockDrift(stop: readonly P[], working: readonly (readonly P[])[], lanes: readonly LaneBand[], seeds: readonly P[] = []): BlockDrift {
  const r = S8S9_BOUND_CM;
  const beyondRow = { oneSidedCm: Infinity, sliverCm: Infinity, within: false, hausdorffCm: Infinity, needleCm: Infinity, drifted: true };
  if (stop.length < 3) return { rows: working.map(() => beyondRow), spines: [], seedless: 0 };
  const { region, spines } = stopRegion(stop, lanes);
  // A split block's stop region read in the parts holding its seeds (S8 seeds a child in its kerb's part, M0-b-03 s4);
  // a part the spine's band cut off with no seed is counted, not compared.
  const kept = spines.length > 0 ? seedComponents(region, seeds) : { region, seedless: 0 };
  const live = working.filter((w) => w.length >= 3);
  const all = unionRegion(live);
  const one = directed(kept.region.edges, all.edges);
  const back = sliver(kept.region, all, r);
  const rows = working.map((w) => {
    if (w.length < 3) return beyondRow;
    const wr = ringRegion(w);
    const sl = sliver(wr, region, r);
    const plain = spines.length === 0 && working.length === 1;
    const hausdorffCm = plain ? compareRings(stop, w).cm : Math.max(one.cm, directed(wr.edges, region.edges).cm);
    const needle = hausdorffCm > r ? needleCm(wr.edges, region.edges, r) + needleCm(kept.region.edges, wr.edges, r) : 0;
    return { oneSidedCm: one.cm, sliverCm: Math.max(sl.cm, back.cm), within: sl.within && back.within, hausdorffCm, needleCm: needle, drifted: plain ? hausdorffCm !== 0 : hausdorffCm > 1 };
  });
  return { rows, spines, seedless: kept.seedless };
}

/**
 * §13.2's contract test on one derivation, read by N-52 (1) (refining C-0270 (5)): S8's working block of every block —
 * kerb(F) of the block seed's L1 face as S8 left it (every lane and T-junction in), read after the derivation: the ring
 * holding the seed and the kerb's holes inside it — against S9's committed block: corridorUnion over each district's
 * committed L1 faces in one L2 batch per district (S9's kernel op, §3.7), the face holding the block's seed in the L2
 * view — the L2 record, or where L2 holds none there the L1 face itself, its own child (§2.2 rule 2; C-0333 (4)) — every
 * ring of it. The two boundaries are compared loop by loop (`compareBoundaries`: S9's face walk carries a hole touching
 * the outer ring at a vertex as a loop of it, `kerb` returns it as its own ring). The hard bar: Hausdorff ≤ 2 · √2 ·
 * attractCm on every block (`beyond` 0; exact at every vertex), a larger distance a defect that fails the run; the
 * exact-0 share reported (ratcheted by the tests, `S8S9_EXACT_FLOOR`). Beside it the drift clause (N-57 (4),
 * `blockDrift`): the kerb S8 stopped on against the working block's outer ring — the sliver width of any region between
 * the two asserted within the same bound (`driftBeyond` 0); the one-sided distance stop → working, the Hausdorff
 * distance and the needle's length reported. A
 * refused union or kerb read is counted and its blocks are beyond the bound. The batches are the harness's: they run
 * after the derivation (its root and records read first), change the arena only at L2, and run at S8's rank (the run
 * registers no S9, M1's).
 */
export function s8s9(d: Derivation, plant?: KerbPlant): S8S9Record {
  const k = d.model.kernel;
  const p = k.plat(GROUND);
  const infill = d.model.data.get('infill') as S8Output['infill'] | undefined;
  const districts = d.kind === 'integrated' ? ((d.model.data.get('districts') as readonly District[] | undefined) ?? []).map((x) => x.id) : d.ins.standIns.map((x) => x.id);
  const misses: HausdorffMiss[] = [];
  const empty: S8S9Record = { blocks: 0, compared: 0, zero: 0, within1cm: 0, beyond: 0, maxCm: 0, split: 0, s9OwnL1: 0, drifted: 0, driftMaxCm: 0, driftNeedleCm: 0, driftOneSidedMaxCm: 0, driftSliverMaxCm: 0, driftBeyond: 0, driftSeedless: 0, commit: 0, s9Refused: 0, kerbReads: 0, missCm: [], misses };
  if (infill === undefined) return empty;
  const widths = spineWidthsOf(widthMap(d));
  const lanes = laneBands(d);
  const spec = (level: 1 | 2): KernelTx => ({ key: GROUND, level, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S8 as StageId }, stage: STAGES.S8 as StageId, rederivesFrom: STAGES.S8 as StageId, workLimit: 1_000_000_000 });
  // Per block seed: the working block, kerb(F) read after S8 (before S9's batch): the ring holding the seed, its holes.
  const blocks: { block: Id; stop: readonly LatticePoint[]; seeds: { seed: LatticePoint; working: readonly LatticePoint[]; holes: readonly LatticePoint[][] }[] }[] = [];
  let split = 0;
  let kerbReads = 0;
  const reads = k.tx(spec(1), (o) => {
    for (const b of infill.blockFaces) {
      if (b.seeds.length > 1) split += 1;
      const seeds: (typeof blocks)[number]['seeds'] = [];
      for (const s of b.seeds) {
        const at = pointLocate(p, GROUND, 1, s);
        let working: readonly LatticePoint[] = [];
        let holes: LatticePoint[][] = [];
        if (at.on === 'face') {
          const kr = kerb(o, at.face, widths);
          // The component holding the seed (a kerb of several parts keeps each, C-0237 (7)) and the holes inside it.
          if (kr.ok) {
            working = kr.value.find((r) => r.length >= 3 && area2(r) > 0 && sideOfRing(s, r) === 'in') ?? [];
            if (working.length >= 3) holes = kr.value.filter((r) => r.length >= 3 && area2(r) < 0 && r.some((q) => sideOfRing(q, working) === 'in')).map((r) => r.slice());
          }
        }
        if (working.length < 3) kerbReads += 1;
        seeds.push({ seed: s, working, holes });
      }
      blocks.push({ block: b.block, stop: stopKerb(b), seeds });
    }
    return { ok: true as const, value: undefined, warnings: [] };
  });
  if (!reads.ok) return { ...empty, blocks: infill.blockFaces.length, beyond: infill.blockFaces.length, maxCm: Infinity, kerbReads: infill.blockFaces.length, misses: [{ block: '', cm: Infinity, beyond: true, why: `the L1 kerb reads: ${reads.code} ${reads.detail}` }] };
  // S9's commit: corridorUnion per district, one L2 batch each (S9 runs per district, §3.7).
  let s9Refused = 0;
  for (const id of districts) {
    const r = k.tx(spec(2), (o) => corridorUnion(o, { owner: id, level: 1 }, widths));
    if (!r.ok) {
      s9Refused += 1;
      if (misses.length < 8) misses.push({ block: id, cm: Infinity, beyond: true, why: `corridorUnion refused: ${r.code} ${r.detail}` });
    }
  }
  let compared = 0;
  let zero = 0;
  let within1cm = 0;
  let beyond = 0;
  let s9OwnL1 = 0;
  let drifted = 0;
  let driftBeyond = 0;
  let driftMaxCm = 0;
  let driftNeedleCm = 0;
  let driftOneSidedMaxCm = 0;
  let driftSliverMaxCm = 0;
  let driftSeedless = 0;
  let commit = 0;
  let maxCm = 0;
  const missCm: number[] = [];
  const others: HausdorffMiss[] = [];
  for (const b of blocks) {
    const planted = b.seeds.map((w) => (plant === undefined || w.working.length < 3 ? w.working : plant(b.block, w.working)));
    const drift = blockDrift(b.stop, planted, lanes, b.seeds.map((w) => w.seed));
    driftSeedless += drift.seedless;
    b.seeds.forEach((w, i) => {
      const at = pointLocate(p, GROUND, 2, w.seed);
      // The L2 face holding the seed, or where L2 holds no record there the L1 face itself (§2.2 rule 2).
      const s9 = at.on === 'face' ? faceRings(p, at.level, at.face) : [];
      if (at.on === 'face' && at.level !== 2) s9OwnL1 += 1;
      const working = planted[i];
      const c = working.length < 3 || s9.length === 0 ? { cm: Infinity, within: false } : compareBoundaries([working, ...w.holes], s9, S8S9_BOUND_SQ);
      const dr = drift.rows[i];
      compared += 1;
      if (c.cm === 0) zero += 1;
      if (c.cm <= 1) within1cm += 1;
      if (!c.within) beyond += 1;
      if (c.cm !== 0) {
        commit += 1;
        missCm.push(c.cm);
      }
      if (dr.drifted) drifted += 1;
      if (!dr.within) driftBeyond += 1;
      if (dr.hausdorffCm > driftMaxCm || (driftMaxCm === 0 && dr.hausdorffCm > 0)) {
        driftMaxCm = Math.max(driftMaxCm, dr.hausdorffCm);
        driftNeedleCm = dr.needleCm;
      }
      driftOneSidedMaxCm = Math.max(driftOneSidedMaxCm, dr.oneSidedCm);
      driftSliverMaxCm = Math.max(driftSliverMaxCm, dr.sliverCm);
      maxCm = Math.max(maxCm, c.cm);
      if (c.cm !== 0 || !dr.within) {
        const why = at.on !== 'face' ? `the seed lies on an L2 ${at.on}` : working.length < 3 ? 'no working block read' : `working → S9 ${c.cm.toFixed(2)} cm${at.level !== 2 ? ' (S9: the L1 face, no L2 record)' : ''}; stop → working sliver ${dr.sliverCm.toFixed(2)} cm, one-sided ${dr.oneSidedCm.toFixed(2)} cm, Hausdorff ${dr.hausdorffCm.toFixed(2)} cm (needle ${dr.needleCm.toFixed(0)} cm)${drift.spines.length > 0 ? `, spine ${drift.spines.join(' ')}` : ''}${drift.seedless > 0 ? `, ${String(drift.seedless)} seedless stop part(s)` : ''}; loops working ${String(boundaryLoops([working, ...w.holes]).length)}, S9 ${String(boundaryLoops(s9).length)}; seed (${String(w.seed.x)}, ${String(w.seed.y)})`;
        const m = { block: b.block, cm: c.cm, beyond: !c.within || !dr.within, why };
        if (m.beyond && misses.length < 8) misses.push(m);
        else if (!m.beyond && others.length < 8) others.push(m);
      }
    });
  }
  // The beyond-the-bound misses first, then the others, eight in all.
  for (const m of others) if (misses.length < 8) misses.push(m);
  return { blocks: infill.blockFaces.length, compared, zero, within1cm, beyond, maxCm, split, s9OwnL1, drifted, driftMaxCm, driftNeedleCm, driftOneSidedMaxCm, driftSliverMaxCm, driftBeyond, driftSeedless, commit, s9Refused, kerbReads, missCm, misses };
}

// ---- the work (C-0091) ------------------------------------------------------------------------------------------------

/** A law's unit count from its limit (the law inverted: linear count, or ⌈log2 count⌉), at least 1. */
export function unitsOf(counter: string, limit: number): number {
  const law = loadWorkLimits().law(counter);
  if (law.unit === 'fixed' || !(law.perUnit > 0)) return 1;
  return Math.max(1, (limit - law.floor) / law.perUnit);
}

/** The work rows the run's records carry: S5c's per growth stage, S8's per district. */
export function workRows(d: Derivation): WorkRow[] {
  const out: WorkRow[] = [];
  const s5 = d.model.data.get('s5') as S5Record | undefined;
  for (const g of s5?.growth ?? []) {
    for (const c of ['growth.proposals', 'growth.candidates'] as const) out.push({ counter: c, stage: 'S5', work: g.work[c], limit: g.limits[c], units: unitsOf(c, g.limits[c]) });
  }
  const infill = d.model.data.get('infill') as S8Output['infill'] | undefined;
  for (const r of infill?.report.districts ?? []) {
    for (const [c, f] of [['cut.kernelCalls', 'kernelCalls'], ['cut.recursionDepth', 'recursionDepth'], ['cut.candidates', 'candidates']] as const) {
      out.push({ counter: c, stage: 'S8', work: r.work[f], limit: r.limits[f], units: unitsOf(c, r.limits[f]) });
    }
  }
  return out;
}

// ---- the whole record --------------------------------------------------------------------------------------------------

function corpusCounts(r: CorpusReport): CorpusCounts {
  return { faces: r.faces, downgrades: r.downgrades, workLimitHits: r.workLimitHits, failures: r.failures };
}

/** Options of `measure`: a planted kerb change (the contract test's 1 cm shift). */
export interface MeasureOptions {
  readonly plant?: KerbPlant;
}

/** One derivation measured (see the module comment). */
export function measure(d: Derivation, opts: MeasureOptions = {}): SeedRecord {
  const data = d.model.data;
  const report = d.report;
  // Restarts: each registered stage exactly once, and every one of the order run.
  const invocations: Record<string, number> = {};
  let restarts = 0;
  for (const name of d.registered) {
    const n = d.ins.invocations.get(name) ?? 0;
    invocations[name] = n;
    restarts += n === 0 ? 1 : n - 1;
  }
  const s5 = data.get('s5') as S5Record | undefined;
  const ladder: Record<string, number> = {};
  for (const st of report.stages) for (const u of st.ladderUses) count(ladder, `${st.name}/${u.cause}/${String(u.rung)}`);
  for (const g of s5?.growth ?? []) for (const r of g.rungs as readonly { rung?: string; name?: string }[]) count(ladder, `S5/S5c/${String(r.rung ?? r.name ?? 'rung')}`);
  for (const c of s5?.capacity ?? []) for (const r of c.rungs as readonly { rung?: string }[]) count(ladder, `S5/S5d/${String(r.rung ?? 'rung')}`);
  const infill = data.get('infill') as S8Output['infill'] | undefined;
  for (const r of infill?.report.districts ?? []) {
    for (const u of r.rungs) count(ladder, `S8/F-CUT/${u.rung}`);
    for (const w of r.workCut) count(ladder, `S8/F-WORK/${(w as { counter?: string }).counter ?? 'workCut'}`);
  }
  const doc = metricDocOf(d);
  const state = data.get('s5.growth') as GrowthState | undefined;
  const lanes = (data.get('lanes') as readonly Way[] | undefined) ?? [];
  const laneIds = new Set(lanes.map((w) => w.id));
  // Per band: the blocks' working areas (METRICS' block.area over the band's blocks) and the lanes' kerb-to-kerb lengths.
  const bands: Record<string, { blockAreasM2: number[]; cutLengthsM: number[] }> = {};
  const band = (id: Id): string => d.ins.bandOf.get(id) ?? 'unbanded';
  const slot = (b: string) => (bands[b] ??= { blockAreasM2: [], cutLengthsM: [] });
  const blocks = (data.get('blocks') as readonly { id: Id; district: Id }[] | undefined) ?? [];
  const districtOfBlock = new Map(blocks.map((b) => [b.id, b.district]));
  const byBand = new Map<string, { id: string; district: string; ring: readonly LatticePoint[] }[]>();
  for (const bf of infill?.blockFaces ?? []) {
    const dist = districtOfBlock.get(bf.block) ?? '';
    const b = band(dist);
    const list = byBand.get(b) ?? [];
    list.push({ id: bf.block, district: dist, ring: bf.kerb });
    byBand.set(b, list);
  }
  for (const [b, list] of byBand) {
    const a = measured('block.area', { ways: [], blocks: list }) as readonly number[] | null;
    slot(b).blockAreasM2.push(...(a ?? []));
  }
  for (const r of infill?.report.districts ?? []) for (const l of r.laneLengths) slot(band(r.district)).cutLengthsM.push(l.lengthCm / 100);
  const districts = d.kind === 'integrated' ? ((data.get('districts') as readonly District[] | undefined) ?? []).length : d.ins.standIns.length;
  const laneLines = doc.ways.filter((w) => laneIds.has(w.id.split('#')[0])).map((w) => w.line);
  const strips = stripFaces(d);
  // The corpus bar on the district faces (both uses), before the S9 batch touches the arena.
  const polys = asPolygons(d.ins.districtFaces);
  const roof = skeletonCorpus(polys, 'roof');
  const spine = skeletonCorpus(polys, 'spine');
  const rec: Omit<SeedRecord, 'hausdorff' | 'refusals'> = {
    seed: d.seed,
    run: d.kind,
    bugs: report.bugs.map((b) => `${b.stage}:${b.cls}`),
    order: [...d.model.order],
    restarts,
    invocations,
    s5: {
      growth: (s5?.growth ?? []).map((g) => g.k),
      prune: (s5?.prune ?? []).map((g) => g.k),
      capacity: (s5?.capacity ?? []).map((g) => g.k),
      topUps: (s5?.capacity ?? []).map((c) => (c.rungs as readonly { rung?: string }[]).filter((x) => x.rung === 'top_up').length),
    },
    ladder,
    stampsMs: Object.fromEntries([...d.ins.stamps].sort((a, b) => (a[0] < b[0] ? -1 : 1))),
    faces: { districts, cuts: lanes.length, blocks: infill?.blockFaces.length ?? 0, s8Refused: infill?.report.refused.length ?? 0 },
    junction: junctionRow(doc),
    turns: turnRow(doc),
    drift: (measured('growth.drift600m', doc) as readonly number[] | null) ?? [],
    bands,
    roads: state === undefined ? [] : roadsLeaving(state, doc),
    strips: { faces: strips.length, lanes: laneLines.length, crossings: lanesInStrips(laneLines, strips) },
    corpus: { faces: polys.length, roof: corpusCounts(roof), spine: corpusCounts(spine) },
    work: workRows(d),
    root: hex(d.model.root),
    rootS5: hex(d.model.stageRoots.get('S5')),
  };
  // S8 ≡ S9 last: its L2 batches change the arena (after every read above).
  const hausdorff = s8s9(d, opts.plant);
  const refusals: RefusalCensus = {
    s8: rec.faces.s8Refused,
    s9: hausdorff.s9Refused,
    kerbReads: hausdorff.kerbReads,
    corpusRoof: roof.downgrades,
    corpusSpine: spine.downgrades,
    kernelDowngrades: report.kernel.downgrades,
    kernelWorkLimitHits: report.kernel.workLimitHits,
    unplaced: report.unplaced.length,
    degraded: report.requested.filter((x) => x.delivered !== 'full').length,
  };
  return { ...rec, hausdorff, refusals };
}
