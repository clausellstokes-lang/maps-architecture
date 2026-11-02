// The combination table's frame column at M0 (M0-x-06; §4.13's combination table, column "the frame (§3.2 (9))";
// C-0100, C-0118; C-0273 (8), (9)): four cells whose mechanisms M0 lands, each the smallest state reaching it:
//   cliff × frame   "clipped at the arena's outer ring by S1; nothing drawn beyond it" — its M0 part (C-0118): on the
//                   3 000 m relief with a cliff primitive across the frame's edge and a river, the height raster and
//                   the hydrology grid cover frame + margin and nothing beyond, S1's L0 batch lays the outer ring first,
//                   and every L0 vertex — the water's shores, banks and deck ends included — lies inside the ring; the
//                   drawn clause is S14's (M1);
//   river × frame   "a water body reaching the ring shares its edge (§4.1's S1 row); no crossing site whose deck end
//                   lies beyond it";
//   bridge × frame  "a bridge's deck lies inside the frame (its site's two ends do)" — a crossing site whose deck end
//                   lies beyond the frame (the river crosses the margin) is never a deck S4 can span nor built; every
//                   deck S4 can span and every span it built has its two deck ends inside the frame rectangle;
//   wall × frame    "the trace stays inside the frame (S3's lattice; a frame arc inset by the outer wall strip)" — on
//                   EP-20's capped state, whose stage-1 boundary meets the frame: every trace and strip vertex inside the
//                   frame (M0's strips are cut at the map border, C-0226; the inset clause is read in C-0273 (9)).
// Each cell runs on the first of its seed's states that stands (./standing.ts, C-0278 (2)): the stages before its home
// unrefused, its water body or frame arc present; the home's outcome on that state is never retried.
import { checkCI, type Plat } from '@plat/kernel';
import type { Bridge, Terrain } from '@plat/model';
import { routeGraph, stripWidths, type S3Slice } from '@plat/layout';
import { rasterGeom, type S1Output } from '@plat/site';
import { deckEnds, inBox, insetIn, liveEdges, liveVertices, marginBox, ringBox, roleVertices } from './arena.js';
import { edgeChain, SMALL_RIVER } from './chain.js';
import { bugsOf, chainCheck, groundOf, refusalDetail } from './observe.js';
import type { PlantCall } from './plant.js';
import { EP20_BLUEPRINT, RELIEF_3000 } from './rows.js';
import { firstStanding, type Attempt, type AttemptRefusal } from './standing.js';
import { outcome, type EdgeFixture, type EdgeOutcome } from './types.js';

/** The frame's half side (cm) of the 30 ha frame the relief and river fixtures stand on: √30 ha ÷ 2, to the metre. */
const HALF_30HA_CM = 27_386;

/** The 3 000 m relief with a cliff primitive across the frame's east edge and the river from the west (C-0118). */
export const RELIEF_CLIFF = Object.freeze({
  ...RELIEF_3000,
  site: Object.freeze({
    relief: 'hilly' as const,
    primitives: Object.freeze([
      Object.freeze({ kind: 'hill' as const, at: { x: 0, y: 0 }, radiusM: 1200, heightM: 3000 }),
      Object.freeze({ kind: 'cliff' as const, at: { x: HALF_30HA_CM, y: 0 }, bearingCdeg: 0, lengthM: 1200, heightM: 1000, widthM: 20 }),
    ]),
    river: Object.freeze({ inflowBearingCdeg: 27_000, mouth: 'none' as const }),
  }),
}) as typeof RELIEF_3000;

/** A chain run's calls recorded (a plant that never fires: its selector sees every insertChain call, in order). */
function recorded(calls: PlantCall[]): { kind: 'zero-length'; select: (c: PlantCall) => boolean } {
  return {
    kind: 'zero-length',
    select: (c) => {
      calls.push(c);
      return false;
    },
  };
}

/** A grid's extent: origin, cell and counts (cm). */
interface GridExtent {
  readonly originX: number;
  readonly originY: number;
  readonly cellCm: number;
  readonly cols: number;
  readonly rows: number;
}

/**
 * cliff × frame's raster clause (C-0118; §2.3 "the rasters over frame + margin"): the height raster and the hydrology grid
 * S1 STORED with the terrain (`terrain.hydro`, the grid S1 (3) filled — and may have coarsened, R12-5 — never one this
 * fixture derives again; M0-x-06 hardening round S1, note 4) each cover frame + margin and store no cell beyond the outer
 * ring (less than one cell past it on each side). The problems, one sentence each; exported for its unit test.
 */
export function frameRasterProblems(t: Terrain, box: { readonly x0: number; readonly y0: number; readonly x1: number; readonly y1: number }): string[] {
  const out: string[] = [];
  const grids: readonly (readonly [string, GridExtent])[] = [
    ['the height raster', rasterGeom(t)],
    ['the hydrology grid', t.hydro],
  ];
  for (const [name, g] of grids) {
    const x1 = g.originX + g.cols * g.cellCm;
    const y1 = g.originY + g.rows * g.cellCm;
    if (!(g.originX <= box.x0 && g.originY <= box.y0 && x1 >= box.x1 && y1 >= box.y1)) out.push(`${name} [${String(g.originX)}, ${String(x1)}] × [${String(g.originY)}, ${String(y1)}] does not cover frame + margin`);
    if (!(g.originX > box.x0 - g.cellCm && g.originY > box.y0 - g.cellCm && x1 < box.x1 + g.cellCm && y1 < box.y1 + g.cellCm)) out.push(`${name} stores a cell beyond the outer ring`);
  }
  return out;
}

/** cliff × frame's M0 part (see the header). */
function runCliffFrame(seed: number): EdgeOutcome {
  return firstStanding(seed, cliffAttempt);
}

/** S1 refusing the frame's whole water batch, unplanted: the state did not stand (S1's typed refusal, M0-e-03's) —
 * and, the frame being lawful input, one entry of J264's census each (C-0342 (2)). */
function s1Refused(run: ReturnType<typeof edgeChain>, lawful: AttemptRefusal[]): string[] {
  return bugsOf(run.report, 'S1').map((b) => {
    lawful.push({ stage: 'S1', code: b.cls, where: 'preparation', detail: refusalDetail(run, 'S1') });
    return `S1 refuses this frame unplanted: ${b.cls} (${refusalDetail(run, 'S1').slice(0, 120)})`;
  });
}

/** The home stage refusing a frame cell's lawful input: a problem of the run and one entry of J264's census. */
function homeRefused(run: ReturnType<typeof edgeChain>, stage: string, problems: string[], lawful: AttemptRefusal[]): void {
  for (const b of bugsOf(run.report, stage)) {
    problems.push(`${stage} refused the cell's lawful input: ${b.cls} (${refusalDetail(run, stage).slice(0, 120)})`);
    lawful.push({ stage, code: b.cls, where: 'home', detail: refusalDetail(run, stage) });
  }
}

function cliffAttempt(seed: number): Attempt {
  const calls: PlantCall[] = [];
  const run = edgeChain(seed, { blueprint: RELIEF_CLIFF, upTo: 'S1', plant: { stage: 'S1', plant: recorded(calls) } });
  const c = chainCheck(run, 'S1', 'S1');
  const problems = [...c.problems];
  const lawful = [...c.lawful];
  const unmet = [...c.unmet, ...s1Refused(run, lawful)];
  if (unmet.length > 0) return { outcome: outcome('defined', 'cliff × frame: (the state did not stand)', problems), unmet, lawful };
  const s1 = run.model.data.get('s1') as S1Output | undefined;
  if (s1 === undefined) return { outcome: outcome('off', 'S1 wrote no record', [...problems, 'no S1 output']), unmet, lawful };
  const p = groundOf(run);
  const box = marginBox(p);
  if (box === null) return { outcome: outcome('off', 'no outer ring', [...problems, 'the arena holds no margin ring']), unmet, lawful };
  // the rasters: frame + margin, and nothing beyond (less than one cell past the ring on each side)
  const t = s1.terrain;
  problems.push(...frameRasterProblems(t, box));
  // the cliff across the frame's edge (the fixture's precondition): the ground east of the edge stands above the west
  const at = (x: number, y: number): number => {
    const i = Math.floor((x - t.originX) / t.cellCm);
    const j = Math.floor((y - t.originY) / t.cellCm);
    return t.heightCm[j * t.cols + i];
  };
  // (the hill falls about 130 m eastward over those 60 m; the 1 000 m cliff raises the east side above it)
  const step = at(HALF_30HA_CM + 3000, 0) - at(HALF_30HA_CM - 3000, 0);
  if (!(step >= 50_000)) problems.push(`no cliff across the frame's edge: the ground steps ${String(step)} cm there`);
  // the outer ring first: the first insertChain of S1 is the closed margin ring at L0, alone before any water
  const first = calls[0];
  if (first === undefined || first.role !== 'margin' || !first.closed || first.level !== 0) problems.push(`S1's first chain is not the closed L0 outer ring: ${JSON.stringify(first ?? null)}`);
  // every L0 vertex inside the ring; every shore, bank and deck_end inside it
  const outside = liveVertices(p).filter((v) => v.level === 0 && !inBox(v, box));
  if (outside.length > 0) problems.push(`${String(outside.length)} L0 vertices lie beyond the outer ring`);
  for (const e of liveEdges(p)) {
    if (!e.roles.some((x) => x.role === 'shore' || x.role === 'bank')) continue;
    if (!inBox(e.a, box) || !inBox(e.b, box)) problems.push('a shore or bank edge lies beyond the outer ring');
  }
  for (const d of roleVertices(p, 'deck_end')) if (!inBox(d, box)) problems.push(`the deck end of ${d.entity} lies beyond the outer ring`);
  return { outcome: outcome('defined', 'cliff × frame: clipped at the outer ring by S1 (the drawn clause: M1)', problems, { bodies: s1.water.bodies.length, cliffStepCm: Math.round(step) }), unmet, lawful };
}

/** river × frame (see the header). */
function runRiverFrame(seed: number): EdgeOutcome {
  return firstStanding(seed, riverAttempt);
}

function riverAttempt(seed: number): Attempt {
  const run = edgeChain(seed, { blueprint: SMALL_RIVER, upTo: 'S1' });
  const c = chainCheck(run, 'S1', 'S1');
  const problems = [...c.problems];
  const lawful = [...c.lawful];
  // the cell's subject is a water body reaching the ring: S1 refusing the water batch whole leaves none (C-0278 (2))
  const unmet = [...c.unmet, ...s1Refused(run, lawful)];
  if (unmet.length > 0) return { outcome: outcome('defined', 'river × frame: (the state did not stand)', problems), unmet, lawful };
  const p = groundOf(run);
  const box = marginBox(p);
  if (box === null) return { outcome: outcome('off', 'no outer ring', [...problems, 'the arena holds no margin ring']), unmet, lawful };
  let shared = 0;
  for (const e of liveEdges(p)) if (e.roles.some((x) => x.role === 'margin') && e.roles.some((x) => x.role === 'shore')) shared += 1;
  if (shared === 0) problems.push('the river reaching the outer ring shares no edge with it (one edge, both roles)');
  const decks = roleVertices(p, 'deck_end');
  for (const d of decks) if (!inBox(d, box)) problems.push(`the deck end of ${d.entity} lies beyond the outer ring`);
  return { outcome: outcome('defined', 'river × frame: one edge both roles; no deck end beyond the ring', problems, { sharedEdges: shared, deckEnds: decks.length }), unmet, lawful };
}

/** bridge × frame (see the header). */
function runBridgeFrame(seed: number): EdgeOutcome {
  return firstStanding(seed, bridgeAttempt);
}

function bridgeAttempt(seed: number): Attempt {
  const run = edgeChain(seed, { blueprint: SMALL_RIVER, upTo: 'S4' });
  const c = chainCheck(run, 'S4', 'S4');
  const problems = [...c.problems];
  const unmet = [...c.unmet];
  const lawful = [...c.lawful];
  if (unmet.length > 0) return { outcome: outcome('defined', 'bridge × frame: (the state did not stand)', problems), unmet, lawful };
  homeRefused(run, 'S4', problems, lawful);
  const slice = run.model.data.get('s3.slice') as S3Slice | undefined;
  const bridges = run.model.data.get('bridges') as readonly Bridge[] | undefined;
  if (slice === undefined || bridges === undefined) return { outcome: outcome('off', 'no bridges', [...problems, 'S4 wrote no bridges']), unmet, lawful };
  const frame = ringBox(slice.site.frameRing);
  // S1 sites crossings on every reach, the margin's included (§4.2 S1 (5)); a site becomes a bridge only when a way lays
  // its span (S4 routes through its two ends as a fixed graph edge, §4.3). The cell's meeting: a site whose deck end lies
  // beyond the frame (the precondition) — never a deck S4's router can span (an edge of S3's lattice along it) and never
  // built; every deck S4 can span, and every span S4 built, has both ends inside the frame (C-0273 (8)).
  const rg = routeGraph(slice.lattice);
  const routable = new Set<string>();
  for (let e = 0; e < rg.deckOf.length; e += 1) if (rg.deckOf[e] >= 0) routable.add(rg.decks[rg.deckOf[e]].id);
  const sites = bridges.map((b) => ({ id: b.id, state: b.state, ends: deckEnds(run.model.kernel, { layer: 'ground', part: 0 }, b) }));
  const j = bridgeFrameJudge(sites, rg.decks, routable, frame);
  problems.push(...j.problems);
  if (j.beyond === 0) unmet.push("no crossing site's deck end lies beyond the frame (the fixture's precondition: the river crosses the margin)");
  return { outcome: outcome('defined', 'bridge × frame: a site beyond the frame never spanned; every deck S4 can span, and every built span, inside the frame', problems, { sites: bridges.length, beyond: j.beyond, routable: routable.size, built: j.built, builtInside: j.builtInside }), unmet, lawful };
}

/**
 * bridge × frame's judge (see the header; exported for its unit test — the hardening round S1's note 5: the "every built
 * span inside the frame" half, which the committed stages meet only inside, held on fabricated sites): every deck S4's
 * router can span has both ends inside the frame; every crossing site resolves to its two deck ends; a site with an end
 * beyond the frame is neither spannable nor built. Returns the problems and the counts (sites beyond, built, built with
 * both ends inside).
 */
export function bridgeFrameJudge(
  sites: readonly { readonly id: string; readonly state: string; readonly ends: readonly { readonly x: number; readonly y: number }[] | null }[],
  decks: readonly { readonly id: string; readonly a: { readonly x: number; readonly y: number }; readonly b: { readonly x: number; readonly y: number } }[],
  routable: ReadonlySet<string>,
  frame: { readonly x0: number; readonly y0: number; readonly x1: number; readonly y1: number },
): { problems: string[]; beyond: number; built: number; builtInside: number } {
  const problems: string[] = [];
  for (const d of decks) if (routable.has(d.id) && (!inBox(d.a, frame) || !inBox(d.b, frame))) problems.push(`the deck ${d.id}, which S4 can span, has an end outside the frame`);
  let beyond = 0;
  let built = 0;
  let builtInside = 0;
  for (const b of sites) {
    if (b.ends === null) {
      problems.push(`${b.id}'s deck ends resolve to no two vertices`);
      continue;
    }
    if (b.state === 'built') built += 1;
    const out = b.ends.some((q) => !inBox(q, frame));
    if (!out) {
      if (b.state === 'built') builtInside += 1;
      continue;
    }
    beyond += 1;
    if (b.state === 'built') problems.push(`${b.id} (built): a deck end lies outside the frame`);
    if (routable.has(b.id)) problems.push(`${b.id}: a deck end lies outside the frame, yet S4 can span it`);
  }
  return { problems, beyond, built, builtInside };
}

/** wall × frame (see the header). */
function runWallFrame(seed: number): EdgeOutcome {
  return firstStanding(seed, wallAttempt);
}

function wallAttempt(seed: number): Attempt {
  const run = edgeChain(seed, { blueprint: EP20_BLUEPRINT, upTo: 'S5' });
  const c = chainCheck(run, 'S5', 'S5');
  const problems = [...c.problems];
  const unmet = [...c.unmet];
  const lawful = [...c.lawful];
  if (unmet.length > 0) return { outcome: outcome('defined', 'wall × frame: (the state did not stand)', problems), unmet, lawful };
  homeRefused(run, 'S5', problems, lawful);
  const slice = run.model.data.get('s3.slice') as S3Slice | undefined;
  if (slice === undefined) return { outcome: outcome('off', 'no slice', [...problems, 'S3 wrote no slice']), unmet, lawful };
  const frame = ringBox(slice.site.frameRing);
  const p: Plat = groundOf(run);
  const wall: { x: number; y: number }[] = [];
  const strips: { x: number; y: number }[] = [];
  for (const e of liveEdges(p)) {
    if (e.roles.some((x) => x.role === 'wall')) wall.push(e.a, e.b);
    if (e.roles.some((x) => x.role === 'setback')) strips.push(e.a, e.b);
  }
  if (wall.length === 0) problems.push('no trace was laid');
  const traceInset = insetIn(wall, frame);
  const stripInset = strips.length === 0 ? Infinity : insetIn(strips, frame);
  const outer = stripWidths(slice.site.tables.table('walls').row('era.default')).outer;
  // the frame arc (the precondition): the capped level set's boundary meets the frame (within two lattice spacings and
  // the rim inset, as EP-20 reads it) — the trace then follows it, wherever its inset lands (C-0273 (9))
  const reach = 2 * slice.lattice.spacingCm + slice.lattice.rimInsetCm;
  const outlineInset = insetIn(slice.levelSet.outline, frame);
  if (!(outlineInset <= reach)) unmet.push(`the stage-1 boundary keeps ${String(outlineInset)} cm off the frame (more than ${String(reach)} cm): no frame arc`);
  if (!(traceInset >= 0)) problems.push(`the trace leaves the frame (inset ${String(traceInset)} cm)`);
  if (!(stripInset >= 0)) problems.push(`a strip line leaves the frame (inset ${String(stripInset)} cm)`);
  for (const r of checkCI(p)) if (r.class === 'hard' && !r.holds) problems.push(`the arena fails ${r.name}`);
  return { outcome: outcome('defined', 'wall × frame: the trace and its strips inside the frame', problems, { outlineInsetCm: outlineInset, traceInsetCm: traceInset, stripInsetCm: Number.isFinite(stripInset) ? stripInset : -1, outerStripCm: outer }), unmet, lawful };
}

/** The four frame cells. */
export function cellFixtures(): EdgeFixture[] {
  return [
    {
      id: 'cell/cliff×frame',
      home: "§4.13's combination table (cliff or steep slope × the frame); §4.2 S1 (1) (the cliff primitive, C-0048); §4.1's S1 row (the outer ring first); §2.3 (the rasters over frame + margin); C-0118",
      run: runCliffFrame,
      expect: { outcome: "clipped at the arena's outer ring by S1 (its M0 part; nothing drawn beyond it — S14, M1) — defined", allowed: ['defined'] },
    },
    {
      id: 'cell/river×frame',
      home: "§4.13's combination table (river, coast, moat × the frame); §4.1's S1 row; §4.2 S1 (5)",
      run: runRiverFrame,
      expect: { outcome: 'a water body reaching the ring shares its edge; no crossing site whose deck end lies beyond it — defined', allowed: ['defined'] },
    },
    {
      id: 'cell/bridge×frame',
      home: "§4.13's combination table (bridge × the frame); §4.2 S1 (5); §4.3 *Decks*",
      run: runBridgeFrame,
      expect: { outcome: "a bridge's deck lies inside the frame (its site's two ends do) — defined", allowed: ['defined'] },
    },
    {
      id: 'cell/wall×frame',
      home: "§4.13's combination table (wall × the frame); §4.2 S3 (6) (the frame arc); §4.8",
      run: runWallFrame,
      expect: { outcome: 'the trace stays inside the frame (S3\'s lattice; a frame arc inset by the outer wall strip) — defined', allowed: ['defined'] },
    },
  ];
}
