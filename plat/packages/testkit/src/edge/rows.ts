// §4.13's EP rows whose mechanisms M0 lands, beside EP-01 (M0-x-06; C-0100; C-EDGE (7)–(12)): EP-04 (S5b, S5c), EP-05
// (S5d), EP-06 (S6: a single coarse face; a degenerate district face), EP-16's stop-test end (§4.6 step 1), EP-20's M0
// part (S3 (6), S5a, S5d) and EP-23's M0 part (§4.3's class grade, F-ROUTE's slope rung). Each fixture is the smallest
// state that reaches its home and asserts the home's stated outcome, its rung "— (defined)" or the rung its row names.
import { attachIndex, createKernel, createPlat, seedKey, streamFromKey, STAGES, type Cm, type Frame, type Hash128, type Kernel, type KernelTx, type LatticePoint, type Plat, type Rng, type Stream } from '@plat/kernel';
import {
  CLASS_ORDER,
  classGeometryCm,
  EDGE_TEST_BARRIERS,
  faceGraph,
  grow,
  mainRoadStream,
  minBarrierClass,
  planCut,
  routeGraph,
  routeLadder,
  flatFixture,
  runS6,
  s3Slice,
  spawnPrimaries,
  stopThreshold,
  type FaceGraph,
  type GrowSeed,
  type RouteClass,
  type RouteRung,
  type S3Commit,
  type S3Slice,
  type S6Output,
} from '@plat/layout';
import type { Terrain, Way } from '@plat/model';
import { terrainSampler } from '@plat/site';
import { loadTable } from '@plat/tables';
import { insetIn, ringBox } from './arena.js';
import { edgeChain, SMALL_FLAT } from './chain.js';
import { lp } from './kinds.js';
import { arenaProblems, bugsOf, chainProblems } from './observe.js';
import { fixtureRandom } from './s8.js';
import { outcome, type EdgeFixture, type EdgeOutcome } from './types.js';

// ---- shared ---------------------------------------------------------------------------------------------------------------

/** The bands' count (a demand has one entry per band). */
function bandCount(): number {
  return loadTable('bands').strs('settings', 'order').length;
}

/** A stream wrapper that counts every call (a draw is a call). */
function counting(s: Stream): { stream: Stream; draws: () => number } {
  let n = 0;
  const stream = new Proxy(s as object, {
    get(t, p) {
      const v = (t as Record<string | symbol, unknown>)[p];
      if (typeof v !== 'function') return v;
      return (...a: unknown[]) => {
        n += 1;
        return (v as (...x: unknown[]) => unknown).apply(t, a);
      };
    },
  }) as Stream;
  return { stream, draws: () => n };
}

// ---- EP-04 ----------------------------------------------------------------------------------------------------------------

/** EP-04/S5b (§4.4 S5b): N_k ≤ c adds no primary — no pick, no road, nothing short, and the stream not drawn. */
function runEp04S5b(seed: number): EdgeOutcome {
  const run = edgeChain(seed, { blueprint: SMALL_FLAT, upTo: 'S5' });
  const problems = chainProblems(run, 'S5', 'S5');
  for (const b of bugsOf(run.report, 'S5')) problems.push(`S5 refused ${b.cls}`);
  const state = run.s5.state;
  if (state === null) return outcome('off', 'no growth state', [...problems, 'S5 ran no stage']);
  const owed = state.stages.filter((g) => g.k >= 2 && g.boundary !== null && g.count.n <= g.crossings.length);
  if (owed.length === 0) problems.push('no stage k ≥ 2 with land had N_k ≤ c (the fixture\'s precondition)');
  const slice = run.model.data.get('s3.slice') as S3Slice;
  let calls = 0;
  for (const g of owed) {
    if (g.picks.length !== 0 || g.roads.length !== 0 || g.short !== 0) problems.push(`stage ${String(g.k)}: N_k ${String(g.count.n)} ≤ c ${String(g.crossings.length)} yet ${String(g.picks.length)} picks, ${String(g.roads.length)} roads, short ${String(g.short)}`);
    // the home's function itself, for every N_k from 0 to c: no pick and no draw
    for (let n = 0; n <= g.crossings.length; n += 1) {
      const c = counting(mainRoadStream(slice));
      const picks = spawnPrimaries(g.boundary as NonNullable<typeof g.boundary>, n, g.crossings, c.stream);
      calls += 1;
      if (picks.length !== 0 || c.draws() !== 0) problems.push(`spawnPrimaries(N_k ${String(n)} ≤ c ${String(g.crossings.length)}) gave ${String(picks.length)} picks and drew ${String(c.draws())} times`);
    }
  }
  return outcome('defined', 'S5b: N_k ≤ c adds none', problems, { stages: owed.length, calls });
}

/** EP-04/S5c (§4.4 S5c): a stage with no seed inside its boundary grows nothing, commits nothing, and says so. */
function runEp04S5c(seed: number): EdgeOutcome {
  const versions = new Map<string, number>();
  let plat: { version: number } | null = null;
  const run = edgeChain(seed, {
    blueprint: SMALL_FLAT,
    upTo: 'S5',
    s5: {
      before: (sub, k, state) => {
        plat ??= state.kernel.plat(state.key);
        versions.set(`${sub}:${String(k)}`, plat.version);
      },
    },
  });
  const problems = chainProblems(run, 'S5', 'S5');
  const state = run.s5.state;
  if (state === null) return outcome('off', 'no growth state', [...problems, 'S5 ran no stage']);
  let none = 0;
  for (const rec of run.s5.growth) {
    const g = state.stages[rec.k - 1];
    if (g === undefined || g.boundary === null || rec.seeds !== 0) continue;
    none += 1;
    if (rec.streets.length !== 0 || rec.proposalsMade !== 0 || rec.junctions.length !== 0 || rec.rungs.length !== 0) problems.push(`stage ${String(rec.k)}: no seed, yet ${String(rec.streets.length)} streets, ${String(rec.proposalsMade)} proposals, ${String(rec.junctions.length)} junctions`);
    const a = versions.get(`S5c:${String(rec.k)}`);
    const b = versions.get(`S5d:${String(rec.k)}`);
    if (a === undefined || b === undefined || a !== b) problems.push(`stage ${String(rec.k)}: no seed, yet the arena moved from version ${String(a)} to ${String(b)} across S5c and its prune`);
  }
  if (none === 0) problems.push('no stage with land had no seed inside its boundary (the fixture\'s precondition)');
  return outcome('defined', 'S5c: no seed — nothing grown, the record reports seeds 0', problems, { stages: none });
}

// ---- EP-05 ----------------------------------------------------------------------------------------------------------------

/**
 * EP-05 (§4.4 S5d): on the last stage (unwalled, its land not capped) every way's declared width is made wide enough that
 * its corridor reserve covers the faces beside it, and the stage's demand stands above its land: each face's built land
 * is floored at 0 (never negative), ONE top-up runs, and the shortfall left is reported.
 */
function runEp05(seed: number): EdgeOutcome {
  let K = 0;
  const run = edgeChain(seed, {
    blueprint: SMALL_FLAT,
    upTo: 'S5',
    s5: {
      before: (sub, k, state) => {
        K = state.slice.site.land.stagesHa.length;
        if (sub !== 'S5d' || k !== K) return;
        for (let i = 0; i < state.ways.length; i += 1) {
          const w = state.ways[i];
          if (typeof w.width === 'number') state.ways[i] = { ...w, width: 1_000_000 } as Way;
        }
      },
      grow: { demand: { bandsCm2: new Array<number>(bandCount()).fill(5e10) } } as never,
    },
  });
  const problems = chainProblems(run, 'S5', 'S5');
  const rec = run.s5.capacity.find((c) => c.k === K);
  if (rec === undefined) return outcome('off', 'S5d ran no last stage', [...problems, `no S5d record for stage ${String(K)}`]);
  const covered = rec.check.faces.filter((f) => f.reserved === null && f.reserveCm2 >= f.landCm2 && f.landCm2 > 0);
  if (covered.length === 0) problems.push('no face of the stage has its reserves covering its land (the fixture\'s precondition)');
  for (const f of rec.check.faces) {
    if (!(f.builtCm2 >= 0)) problems.push(`face ${f.key}: built land ${String(f.builtCm2)} below 0`);
    if (f.reserved === null && f.reserveCm2 >= f.landCm2 && f.builtCm2 !== 0) problems.push(`face ${f.key}: reserves ${String(f.reserveCm2)} cover land ${String(f.landCm2)}, built ${String(f.builtCm2)} not floored at 0`);
  }
  if (rec.topUp !== 'grown') problems.push(`the top-up did not run: ${rec.topUp}`);
  const tops = rec.rungs.filter((r) => r.rung === 'top_up').length;
  if (tops !== 1) problems.push(`${String(tops)} top-ups (the ladder allows one)`);
  if (rec.after === null) problems.push('no check after the top-up');
  else for (const f of rec.after.faces) if (!(f.builtCm2 >= 0)) problems.push(`after the top-up, face ${f.key}: built land below 0`);
  const last = rec.rungs[rec.rungs.length - 1];
  if (!(rec.shortfallCm2 > 0) || last === undefined || last.rung !== 'accept_shortfall' || last.why !== 'remainder' || last.shortfallCm2 !== rec.shortfallCm2) {
    problems.push(`the shortfall left (${String(rec.shortfallCm2)} cm²) is not reported as accept_shortfall remainder: ${JSON.stringify(rec.rungs)}`);
  }
  return outcome('laddered', 'S5d: built land floored at 0 → one top-up → the shortfall reported', problems, { covered: covered.length, shortfallCm2: Math.round(rec.shortfallCm2) });
}

// ---- EP-06 ----------------------------------------------------------------------------------------------------------------

/** EP-06/single (§4.5 *Grower*): S6 on an arena whose perimeter holds one coarse face makes one district of it. */
function runEp06Single(seed: number): EdgeOutcome {
  const rand = fixtureRandom(seed);
  const side = 200_000;
  const key = { layer: 'ground', part: 0 } as const;
  // the arena: S1's outer ring (L0) and S3's map border (L1), nothing inside — one coarse face once S6 lays its perimeter
  const { plat, kernel } = bare(side);
  const h = side / 2;
  const R = Math.round(15_000 + rand() * 20_000);
  const n = 12 + Math.floor(rand() * 24);
  const boundary: LatticePoint[] = [];
  for (let i = 0; i < n; i += 1) boundary.push(lp(R * Math.cos((2 * Math.PI * i) / n), R * Math.sin((2 * Math.PI * i) / n)));
  const frame = [lp(-h, -h), lp(h, -h), lp(h, h), lp(-h, h)];
  const r = runS6({ kernel, key, seedKey: seedKey(seed), rung: 'CITY', boundary, frame, stageBoundaries: [boundary], ways: [], features: [] });
  const problems = arenaProblems(plat);
  if (!r.ok) return outcome('off', `S6 refused ${r.code}`, [...problems, `S6 refused a single coarse face: ${r.code} ${r.detail}`]);
  const v: S6Output = r.value;
  if (v.districts.length !== 1) problems.push(`${String(v.districts.length)} districts on one coarse face`);
  if (v.report.unowned !== 0) problems.push(`${String(v.report.unowned)} coarse faces unowned`);
  if (v.grow.merges.length !== 0) problems.push('a merge on one coarse face');
  return outcome('defined', 'S6: one coarse face — one district', problems, { districts: v.districts.length, nd: v.report.nd });
}

/** An indexed ground arena with S1's outer ring (L0) and S3's map border (L1, the frame), and its façade. */
function bare(side: number): { plat: Plat; kernel: Kernel } {
  const key = { layer: 'ground', part: 0 } as const;
  const frame: Frame = { widthCm: side as Cm, heightCm: side as Cm, aspect: 1, marginShare: 0.3 };
  const plat = createPlat(key, frame);
  attachIndex(plat, { gridCellCm: 5000 });
  const kernel = createKernel(new Map([[key, plat]]));
  const spec = (level: 0 | 1, stage: number): KernelTx => ({ key, level, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: stage as never }, stage: stage as never, rederivesFrom: stage as never, workLimit: 100_000_000 });
  const h = side / 2;
  const m = Math.round(h * 1.6);
  const r0 = kernel.tx(spec(0, STAGES.S1), (o) => kernel.geom.insertChain(o, [lp(-m, -m), lp(m, -m), lp(m, m), lp(-m, m)], [{ role: 'margin', entity: 'terrain:edge' }], 'mandatory', { closed: true }));
  if (!r0.ok) throw new Error(`bareArena: the outer ring: ${r0.code}`);
  const r1 = kernel.tx(spec(1, STAGES.S3), (o) => kernel.geom.insertChain(o, [lp(-h, -h), lp(h, -h), lp(h, h), lp(-h, h)], [{ role: 'border', entity: 'terrain:edge' }], 'mandatory', { closed: true }));
  if (!r1.ok) throw new Error(`bareArena: the border: ${r1.code}`);
  return { plat, kernel };
}

/**
 * EP-06/degenerate-face (§4.5 *Grower*'s merge, §4.1's S6 row: "a degenerate district face merges into its neighbour"):
 * on the coarse-face graph S6's districts stand on (the small flat chain through S6), one claimable face is given area
 * 0 and the grower re-run from S6's own seeds: the face is never a seed or a district of its own, and it joins the
 * district across its longest shared edge that passes the edge test.
 */
function runEp06Degenerate(seed: number): EdgeOutcome {
  // a grid town: the bare arena, a boundary ring and a grid of secondaries across it — S6's coarse faces meet across
  // edges the edge test passes (a secondary is below its class, §4.5)
  const rand = fixtureRandom(seed);
  const side = 400_000;
  const key = { layer: 'ground', part: 0 } as const;
  const { plat, kernel } = bare(side);
  const R = Math.round(25_000 + rand() * 10_000);
  const S = Math.round(8_000 + rand() * 3_000);
  const n = 16 + Math.floor(rand() * 16);
  const boundary: LatticePoint[] = [];
  for (let i = 0; i < n; i += 1) boundary.push(lp(R * Math.cos((2 * Math.PI * i) / n), R * Math.sin((2 * Math.PI * i) / n)));
  const ways: Way[] = [];
  const lines: LatticePoint[][] = [];
  const reach = R + 4_000;
  for (let x = -Math.floor(reach / S) * S; x <= reach; x += S) lines.push([lp(x, -reach), lp(x, reach)]);
  for (let y = -Math.floor(reach / S) * S; y <= reach; y += S) lines.push([lp(-reach, y), lp(reach, y)]);
  const laid = kernel.tx({ key, level: 1, ops: [], expect: [], onFail: 'reject', batch: { kind: 'stage', stage: STAGES.S5 as never }, stage: STAGES.S5 as never, rederivesFrom: STAGES.S5 as never, workLimit: 100_000_000 }, (o) => {
    for (let i = 0; i < lines.length; i += 1) {
      const id = `way:grid${String(i)}`;
      const r = kernel.geom.insertChain(o, lines[i], [{ role: 'way', entity: id }], 'mandatory');
      if (!r.ok) return r;
      ways.push({ id, class: 'secondary', spine: { role: 'way', entity: id }, width: 600 as Cm, from: { kind: 'junction', id: 'junction:a' }, to: { kind: 'junction', id: 'junction:b' }, growthStage: 1, epoch: 0, provisional: false, lifecycle: { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } } } as Way);
    }
    return { ok: true as const, value: undefined, warnings: [] };
  });
  if (!laid.ok) throw new Error(`EP-06 grid town: the grid: ${laid.code} ${laid.detail}`);
  const h = side / 2;
  const frame = [lp(-h, -h), lp(h, -h), lp(h, h), lp(-h, h)];
  const r6 = runS6({ kernel, key, seedKey: seedKey(seed), rung: 'CITY', boundary, frame, stageBoundaries: [boundary], ways, features: [] });
  const problems = arenaProblems(plat);
  if (!r6.ok) return outcome('off', `S6 refused ${r6.code}`, [...problems, `S6 refused the grid town: ${r6.code} ${r6.detail}`]);
  const s6: S6Output = r6.value;
  const g = faceGraph(plat, { ways: new Map(ways.map((w) => [w.id, w.class])), minBarrierClass: minBarrierClass(), perimeter: s6.hinterland, water: new Set() });
  const districtIds = new Set(s6.districts.map((d) => d.id));
  const claimable = g.faces.map((f) => f.side === 'inside' && !f.water && f.owner !== null && districtIds.has(f.owner));
  // the degenerate face: the first claimable face with a claimable neighbour across an edge that passes; a seed on it
  // is withdrawn (a degenerate face seeds nothing)
  const passes = (barriers: number): boolean => (barriers & EDGE_TEST_BARRIERS) === 0;
  let j = -1;
  for (let i = 0; i < g.faces.length && j < 0; i += 1) {
    if (!claimable[i]) continue;
    for (const [m, l] of g.links[i]) if (claimable[m] && passes(l.barriers)) j = i;
  }
  if (j < 0) return outcome('off', 'no face to degenerate', [...problems, 'no claimable face with a claimable neighbour across a passing edge (the fixture\'s precondition)']);
  const seeds: GrowSeed[] = s6.grow.grown
    .map((d) => d.seed)
    .filter((sd) => claimable[sd.face] && sd.face !== j)
    .sort((a, b) => a.order - b.order);
  const g2: FaceGraph = { ...g, faces: g.faces.map((f, i) => (i === j ? { ...f, areaCm2: 0 } : f)) };
  const band = s6.report.bandHa;
  const turn = (_lineage: unknown, t: number): Stream => streamFromKey([seed >>> 0, t, 7, 0]);
  const res = grow(seeds, { graph: g2, claimable }, turn as never, { bandCm2: [band[0] * 1e8, band[1] * 1e8], compactnessMin: 0.5, turnLimit: 1_000_000, leftoverRate: 1 });
  if (res.grown.some((d) => d.seed.face === j)) problems.push(`the degenerate face ${String(j)} seeded a district`);
  // its expected district: across its longest passing link to an owned face
  let best = -1;
  let bestLen = -1;
  for (const [m, l] of [...g2.links[j].entries()].sort((a, b) => a[0] - b[0])) {
    if (res.owner[m] < 0 || !passes(l.barriers) || m === j) continue;
    if (l.lengthCm > bestLen) {
      bestLen = l.lengthCm;
      best = m;
    }
  }
  if (best < 0) problems.push(`the degenerate face ${String(j)} has no owned neighbour across a passing edge`);
  else {
    // the owner after the merge rule: the district the neighbour's district merged into, if it did
    const finalOf = (order: number): number => {
      let o = order;
      for (;;) {
        const d = res.grown.find((x) => x.seed.order === o);
        if (d === undefined || d.mergedInto < 0) return o;
        o = d.mergedInto;
      }
    };
    if (finalOf(res.owner[j]) !== finalOf(res.owner[best])) problems.push(`the degenerate face ${String(j)} went to district ${String(res.owner[j])}, not ${String(res.owner[best])} across its longest passing edge (${String(bestLen)} cm)`);
  }
  return outcome('defined', 'S6: a degenerate face merged across its longest passing edge', problems, { face: j, links: g2.links[j].size });
}

// ---- EP-16 ----------------------------------------------------------------------------------------------------------------

/** A derivation Rng whose every stream returns `u` for every uniform (the fixture stream of C-EDGE (10)). */
function constantRng(u: number): Rng {
  const s = { float01: () => u } as unknown as Stream;
  return { stream: () => s } as unknown as Rng;
}

/**
 * EP-16's stop-test end (§4.6 step 1: τ = e_lo · (e_hi / e_lo)^g, g = |(u₁ + u₂ + u₃ + u₄) / 2 − 1|): on a rectangle
 * whose minor extent lies inside the district's block-depth range, a stream whose four uniforms are all 1, then all 0
 * (g = 1: τ = e_hi, the face stands as a block), and all ½ (g = 0: τ = e_lo, the face goes on to its cut).
 */
function runEp16(seed: number): EdgeOutcome {
  const rand = fixtureRandom(seed);
  const eLo = 20 + Math.round(rand() * 20);
  const eHi = eLo + 10 + Math.round(rand() * 40);
  const minor = Math.round((eLo + (eHi - eLo) * (0.15 + 0.7 * rand())) * 100);
  const major = Math.round(minor * (1.5 + rand()));
  const theta = rand() * Math.PI;
  const c = Math.cos(theta);
  const s = Math.sin(theta);
  const at = (x: number, y: number): LatticePoint => lp(x * c - y * s, x * s + y * c);
  const ring = [at(0, 0), at(major, 0), at(major, minor), at(0, minor)];
  const problems: string[] = [];
  const facts: Record<string, number | string | boolean> = {};
  const key: Hash128 = [seed >>> 0, 1, 2, 3] as unknown as Hash128;
  for (const [name, u, g, tau, stands] of [
    ['all 1', 1, 1, eHi * 100, true],
    ['all 0', 0, 1, eHi * 100, true],
    ['all ½', 0.5, 0, eLo * 100, false],
  ] as const) {
    const r = planCut({ rings: [ring] }, { depthRangeM: [eLo, eHi], minFrontageM: 5 }, { rng: constantRng(u), faceKey: key, entity: 'face:edge' });
    if (!r.ok && r.partial === undefined) {
      problems.push(`${name}: planCut refused ${r.code} before its stop test`);
      continue;
    }
    const plan = (r.ok ? r.value : r.partial) as { kind: string; stop: { uniforms: readonly number[]; g: number; tauCm: number } };
    if (plan.stop.uniforms.some((x) => x !== u)) problems.push(`${name}: the stop test read uniforms ${plan.stop.uniforms.join(', ')}`);
    if (plan.stop.g !== g) problems.push(`${name}: g = ${String(plan.stop.g)}, expected ${String(g)}`);
    if (plan.stop.tauCm !== tau || stopThreshold(eLo * 100, eHi * 100, g) !== tau) problems.push(`${name}: τ = ${String(plan.stop.tauCm)} cm, expected ${String(tau)}`);
    if ((plan.kind === 'block') !== stands) problems.push(`${name}: the face (minor ${String(minor)} cm in [${String(eLo * 100)}, ${String(eHi * 100)}]) ${plan.kind === 'block' ? 'stood' : `went on (${plan.kind})`}, expected it to ${stands ? 'stand' : 'be cut'}`);
    facts[name] = plan.kind;
  }
  return outcome('defined', 'EP-16: g = 1 → τ = e_hi (stands); g = 0 → τ = e_lo (cut)', problems, facts);
}

// ---- EP-20 ----------------------------------------------------------------------------------------------------------------

/** EP-20's frame: 12 ha of CITY frame asked for §12.2's 220 ha walled — less reachable land than the quotas ask. */
export const EP20_BLUEPRINT = Object.freeze({ ...SMALL_FLAT, size: Object.freeze({ rung: 'CITY', aspect: 1, areaHa: 12 }), walledHa: 220 }) as typeof SMALL_FLAT;

/**
 * EP-20's M0 part (§4.2 S3 (6), §4.4 S5a, S5d; F-BUDGET-STAGE): the capped t₁ and its shortfall reported, the capped
 * region meeting the frame on its inner line with the trace inside the frame, every later stage with no land folded into
 * the last stage with land, no top-up without land, the shortfall carried in S3's report and S5d's record (requestedVsBuilt
 * is M1's list, written [] at M0 — C-0224 (7)).
 */
function runEp20(seed: number): EdgeOutcome {
  const run = edgeChain(seed, { blueprint: EP20_BLUEPRINT, upTo: 'S5' });
  const problems = chainProblems(run, 'S5', 'S5');
  for (const b of run.report.bugs) problems.push(`${b.stage} refused ${b.cls}`);
  const slice = run.model.data.get('s3.slice') as S3Slice | undefined;
  const commit = run.model.data.get('s3.commit') as S3Commit | undefined;
  const state = run.s5.state;
  if (slice === undefined || commit === undefined || state === null) return outcome('off', 'the chain stopped', [...problems, 'no slice, commit or growth state']);
  if (!slice.threshold.capped) problems.push('t₁ was not capped (the fixture\'s precondition: less reachable land than stage 1 asks)');
  if (!(slice.threshold.shortfallCm2 > 0) || slice.report.shortfallCm2 !== slice.threshold.shortfallCm2) problems.push(`the shortfall ${String(slice.threshold.shortfallCm2)} cm² is not S3's reported ${String(slice.report.shortfallCm2)}`);
  const box = ringBox(slice.site.frameRing);
  const outlineInset = insetIn(slice.levelSet.outline, box);
  const reach = 2 * slice.lattice.spacingCm + slice.lattice.rimInsetCm;
  if (!(outlineInset <= reach)) problems.push(`the capped boundary keeps ${String(outlineInset)} cm off the frame: no frame arc (more than ${String(reach)} cm)`);
  const traceInset = insetIn(commit.traced.line, box);
  if (!(traceInset > 0)) problems.push(`the trace leaves the frame (inset ${String(traceInset)} cm)`);
  const last = state.lastWithLand;
  let folded = 0;
  for (const g of state.stages) {
    if (g.k <= last) continue;
    if (g.boundary !== null || g.foldedInto !== last) problems.push(`stage ${String(g.k)} has ${g.boundary === null ? 'no land' : 'land'} and folds into ${String(g.foldedInto)}, not the last stage with land ${String(last)}`);
    else folded += 1;
  }
  if (folded === 0) problems.push('no stage folded (the fixture\'s precondition)');
  const quota = slice.site.land.stagesHa.slice(last).reduce((a, b) => a + b, 0);
  if (Math.abs((state.folded[last - 1] ?? 0) - quota) > 1e-6) problems.push(`the folded quota ${String(state.folded[last - 1])} ha is not the later stages' ${String(quota)} ha`);
  for (const c of run.s5.capacity) {
    if (c.topUp === 'grown') problems.push(`stage ${String(c.k)} topped up with no land to grow into`);
    if (c.k === last) {
      const acc = c.rungs.find((r) => r.rung === 'accept_shortfall');
      if (c.topUp !== 'skipped_capped' || acc === undefined || acc.why !== 'capped' || !(c.shortfallCm2 > 0)) problems.push(`the capped stage ${String(c.k)}: ${c.topUp}, rungs ${JSON.stringify(c.rungs)}, shortfall ${String(c.shortfallCm2)}`);
    }
  }
  if (run.report.requestedVsBuilt.length !== 0) problems.push('requestedVsBuilt written at M0 (M1\'s list, C-0224 (7))');
  return outcome('laddered', 'EP-20: the capped level set (simpler shape) → the shortfall reported (F-BUDGET-STAGE)', problems, { folded, shortfallHa: Math.round(slice.threshold.shortfallCm2 / 1e4) / 1e4, outlineInsetCm: outlineInset, traceInsetCm: traceInset });
}

// ---- EP-23 ----------------------------------------------------------------------------------------------------------------

/** The 3 000 m relief fixture (§13.1's; M0-e-02's relief bar): a 3 000 m hill-acropolis on hilly ground. */
export const RELIEF_3000 = Object.freeze({
  size: Object.freeze({ rung: 'CITY', aspect: 1, areaHa: 30 }),
  site: Object.freeze({ relief: 'hilly' as const, primitives: Object.freeze([Object.freeze({ kind: 'hill' as const, at: { x: 0, y: 0 }, radiusM: 1200, heightM: 3000 })]), river: null }),
  terrain: 'base',
  walledHa: 6,
}) as unknown as typeof SMALL_FLAT;

/**
 * The class grade limits EP-23's fixture hands S4's router (rise over run): `ways.crossing`'s `rampMaxGrade` is V11's row,
 * left out at M0, so S4 applies a limit only when given (C-0158; C-0236 (2)) — these are the fixture's, in the order of
 * F-ROUTE's slope rung (through, primary, track, path).
 */
export const EP23_GRADES: Readonly<Partial<Record<RouteClass, number>>> = Object.freeze({ through: 0.3, primary: 0.6, track: 1.2, path: 2.4 });

/**
 * EP-23's M0 part (§4.3 *The class grade limit*; §5.2 F-ROUTE's slope rung; C-EDGE (12)): on the 3 000 m relief, S4's
 * router routes each gate's arterial from the plaza's attach point to the frame under the class grade limits: every
 * route it returns climbs no edge steeper than the limit of the class it was routed at, after the slope rung relaxed the
 * class in F-ROUTE's order (each relaxation reported), else the destination is `unserved`, reported. The ridge between
 * the plaza and a gate is the fixture's precondition: a solved gate route of S3 climbs an edge above the through grade.
 */
function runEp23(seed: number): EdgeOutcome {
  // S1 on the relief through the runner; S3's slice (M0-c-01's s3Slice) on the flat fixture's site with S1's terrain —
  // the slice is data, its lattice the one §4.3 builds once (S3's commits are not this row's home)
  const run = edgeChain(seed, { blueprint: RELIEF_3000, upTo: 'S1' });
  const problems = chainProblems(run, 'S1', 'S1');
  const terrain = run.model.data.get('terrain') as Terrain | undefined;
  if (terrain === undefined) return outcome('off', 'no terrain', [...problems, 'S1 wrote no terrain']);
  const fixture = flatFixture(seed, { frameAreaHa: 30, walledHa: 6 });
  const slice = s3Slice({ ...fixture, terrain });
  const site = slice.site;
  const sampler = terrainSampler(site.terrain, site.tables.table('terrain').num('settings', 'slopeQueryM') * 100);
  const heights = new Float64Array(slice.lattice.points.length);
  for (let i = 0; i < heights.length; i += 1) heights[i] = sampler.heightAt(slice.lattice.points[i]);
  const rg = routeGraph(slice.lattice, heights);
  const gradeOf = (u: number, v: number): number => {
    for (let d = 0; d < 6; d += 1) {
      if (slice.lattice.adjacency[6 * u + d] !== v) continue;
      const e = slice.lattice.slot[6 * u + d];
      return e < 0 ? Infinity : rg.grade[e];
    }
    return Infinity;
  };
  const steepest = (nodes: readonly number[]): number => {
    let m = 0;
    for (let i = 0; i + 1 < nodes.length; i += 1) m = Math.max(m, gradeOf(nodes[i], nodes[i + 1]));
    return m;
  };
  const through = EP23_GRADES.through as number;
  if (!slice.routes.some((r) => steepest(r.nodes) > through)) problems.push('no gate route of S3 climbs above the through grade (the ridge, the fixture\'s precondition)');
  const rim: number[] = [];
  for (let i = 0; i < slice.lattice.points.length; i += 1) if (slice.lattice.rim[i] === 1) rim.push(i);
  const band = site.tables.table('terrain').num('crossing', 'searchBandM') * 100;
  let served = 0;
  let unserved = 0;
  let relaxed = 0;
  for (const r of slice.routes) {
    const rungs: RouteRung[] = [];
    const name = `gate:${String(r.ordinal)}`;
    const out = routeLadder(rg, [r.nodes[0]], rim, { class: 'through', gradeLimits: EP23_GRADES, radiusCm: (c) => classGeometryCm(site.tables, c).minRadiusCm, searchBandCm: band, route: name }, rungs, { n: 0 });
    if (!out.ok) {
      problems.push(`${name}: the router refused ${out.code}`);
      continue;
    }
    const slopes = rungs.filter((x) => x.rung === 'slope');
    // the relaxations in F-ROUTE's order, each one class down
    let cls: RouteClass = 'through';
    for (const x of slopes) {
      const next = CLASS_ORDER.slice(CLASS_ORDER.indexOf(cls) + 1).find((c) => c === 'primary' || c === 'track' || c === 'path');
      if (x.fromClass !== cls || x.toClass !== next) problems.push(`${name}: a slope rung ${String(x.fromClass)} → ${String(x.toClass)} out of F-ROUTE's order (from ${cls})`);
      cls = x.toClass as RouteClass;
    }
    relaxed += slopes.length;
    if (out.value === null) {
      unserved += 1;
      if (!rungs.some((x) => x.rung === 'unserved')) problems.push(`${name}: no route and no unserved reported`);
      continue;
    }
    served += 1;
    const limit = EP23_GRADES[out.value.class];
    if (limit === undefined) problems.push(`${name}: routed at ${out.value.class}, a class with no grade limit`);
    else if (steepest(out.value.nodes) > limit) problems.push(`${name}: routed at ${out.value.class} (limit ${String(limit)}) climbs ${String(steepest(out.value.nodes))}`);
    if (out.value.class !== cls) problems.push(`${name}: routed at ${out.value.class}, its slope rungs ended at ${cls}`);
  }
  return outcome('laddered', 'EP-23: within the class grade after the slope relaxation, else unserved reported', problems, { served, unserved, relaxed });
}

// ---- the fixtures ---------------------------------------------------------------------------------------------------------

/** The M0 EP rows' fixtures beside EP-01. */
export function rowFixtures(): EdgeFixture[] {
  return [
    {
      id: 'EP-04/S5b',
      home: '§4.4 S5b (N_k ≤ c adds none); §4.13 EP-04',
      run: runEp04S5b,
      expect: { outcome: 'no new primary owed: N_k ≤ c adds none — defined', allowed: ['defined'] },
    },
    {
      id: 'EP-04/S5c',
      home: '§4.4 S5c (no seed inside the boundary); §4.13 EP-04',
      run: runEp04S5c,
      expect: { outcome: 'no seed inside the boundary: nothing grown, reported — defined', allowed: ['defined'] },
    },
    {
      id: 'EP-05/S5d',
      home: '§4.4 S5d (built land floored at 0); §5.2 F-BUDGET-STAGE; §4.13 EP-05',
      run: runEp05,
      expect: { outcome: 'a face its reserves cover: built land floored at 0 → one top-up → the shortfall reported', allowed: ['laddered'] },
    },
    {
      id: 'EP-06/S6/single-face',
      home: '§4.5 *Grower*; §4.13 EP-06',
      run: runEp06Single,
      expect: { outcome: 'a single coarse face: one district — defined', allowed: ['defined'] },
    },
    {
      id: 'EP-06/S6/degenerate-face',
      home: '§4.5 *Grower* (the merge rule); §4.1\'s S6 row; §4.13 EP-06',
      run: runEp06Degenerate,
      expect: { outcome: 'a degenerate district face: merged into its neighbour (its longest passing edge)', allowed: ['defined'] },
    },
    {
      id: 'EP-16/stop-test',
      home: '§4.6 step 1 (the stop test\'s folded bell); §4.13 EP-16',
      run: runEp16,
      expect: { outcome: 'the folded bell at its end: g = 1 → τ = e_hi, g = 0 → τ = e_lo, the face standing or cut accordingly — defined', allowed: ['defined'] },
    },
    {
      id: 'EP-20/M0',
      home: '§4.2 S3 (6) (the capped t, the frame arc); §4.4 S5a (a stage with no land folded), S5d (no top-up without land); §4.13 EP-20',
      run: runEp20,
      expect: { outcome: 'less reachable land than a stage asks: the capped level set (simpler shape) → leave out and report (F-BUDGET-STAGE)', allowed: ['laddered'] },
    },
    {
      id: 'EP-23/M0',
      home: '§4.3 *Lattice and costs* (the class grade limit); §5.2 F-ROUTE; §4.13 EP-23',
      run: runEp23,
      expect: { outcome: 'the steepest ground: arterials within their class grade or unserved — simpler shape (the next class\'s grade) → leave out and report', allowed: ['laddered'] },
    },
  ];
}
