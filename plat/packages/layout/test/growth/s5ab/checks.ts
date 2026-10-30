// The item's stated promises checked on a grown run, each from the arena's own tables and plane helpers written here
// (never through the code under test): §4.4 S5a's nested stages and gates on their boundary, S5b's N_k − c primaries and
// the gate count, the walls and roads, T one field re-settled; and §13.2's two S5b statistics.
import { fieldT, levelSet } from '../../../src/index.js';
import { area, insideRing, lengthInside, meetings, ringDist, roleEdges, segDist, verticesWith, type Grown } from './support.js';

const HA = 100_000_000;

/** Every violation of the item's promises on a grown run, as text (empty: all hold). */
export function violations(g: Grown): string[] {
  const out: string[] = [];
  const say = (s: string): void => {
    out.push(`seed ${String(g.site.seed)}: ${s}`);
  };
  const { growth, slice, plat } = g;
  const lattice = slice.lattice;
  const cell = lattice.cellAreaCm2;
  const K = g.site.land.stagesHa.length;
  if (growth.stages.length !== K) say(`${String(growth.stages.length)} stages recorded, ${String(K)} asked`);
  const wayEdges = roleEdges(plat, 'way');
  // The previous wall's clearance: its outer strip (band half + outer setback and glacis, C-0033) and a primary's half
  // width at the rung, read from the tables.
  const walls = g.site.tables.table('walls');
  const clearCm = (walls.num('era.default', 'thicknessM') / 2 + walls.num('era.default', 'outerSetbackGlacisM') + g.site.tables.table('ways').pair('primary', `widthM.${g.site.rung}`)[1] / 2) * 100;
  const wallEdges = roleEdges(plat, 'wall');
  let prevSel = slice.levelSet.selected;
  let prevWall: readonly { x: number; y: number }[] = g.commit.traced.line;
  const roadsSoFar: { nodes: number[] }[] = [];
  for (const st of growth.stages) {
    if (st.k === 1) continue;
    const b = st.boundary;
    if (b === null) {
      if (st.foldedInto === null) say(`stage ${String(st.k)}: no boundary and not folded`);
      continue;
    }
    // (1) The nested stages: {T ≤ t_k} ∪ enclosure(k − 1), recounted from T as it stood, equals stages 1 … k's land
    // within one cell (unless capped), and holds the previous enclosure.
    let asked = 0;
    for (let j = 0; j < st.k; j += 1) asked += g.site.land.stagesHa[j] * HA;
    let n = 0;
    const T = b.source.T;
    for (let i = 0; i < T.length; i += 1) {
      if (lattice.interior[i] !== 1 || lattice.water[i] !== 0) continue;
      if (T[i] <= b.threshold.t || prevSel[i] === 1) n += 1;
    }
    if (n * cell !== b.landCm2) say(`stage ${String(st.k)}: the union's land ${String(n * cell)} ≠ the threshold's ${String(b.landCm2)}`);
    if (!b.capped && Math.abs(n * cell - asked) > cell) say(`stage ${String(st.k)}: land ${String(n * cell)} vs asked ${String(asked)}: more than one cell apart`);
    for (let i = 0; i < prevSel.length; i += 1) {
      if (prevSel[i] === 1 && b.set.selected[i] !== 1) {
        say(`stage ${String(st.k)}: node ${String(i)} of stage ${String(st.k - 1)}'s enclosure is outside it`);
        break;
      }
    }
    // (2) T as it stood is one field: S3's re-settled by the earlier stages' roads, equal to a full recompute.
    const full = fieldT(lattice, [...slice.routes, ...roadsSoFar], slice.field.a);
    let diff = 0;
    for (let i = 0; i < T.length; i += 1) if (!Object.is(full.T[i], T[i])) diff += 1;
    if (diff > 0) say(`stage ${String(st.k)}: T as it stood differs from a full recompute at ${String(diff)} nodes`);
    // (3) S5b: N_k by its rule; N_k − c spawned and served when N_k > c, none when N_k ≤ c.
    const landHa = b.landCm2 / HA;
    if (st.walled) {
      if (st.count.n !== Math.round(1 + 0.47 * Math.sqrt(landHa))) say(`stage ${String(st.k)}: N_k ${String(st.count.n)} is not the land law on ${String(landHa)} ha`);
    } else {
      let per = 0;
      const o = b.set.outline;
      for (let i = 0; i < o.length; i += 1) per += Math.hypot(o[(i + 1) % o.length].x - o[i].x, o[(i + 1) % o.length].y - o[i].y);
      // N_k reads the boundary as picked (before its destinations were pinned): its length within 1 % of the final one's.
      if (st.count.n !== Math.round(st.count.measure / 45_000)) say(`stage ${String(st.k)}: N_k ${String(st.count.n)} is not one per 450 m of ${String(st.count.measure)} cm`);
      if (Math.abs(st.count.measure - per) > 0.01 * per) say(`stage ${String(st.k)}: the length N_k read, ${String(st.count.measure)} cm, is not the boundary's ${String(per)} cm`);
    }
    const c = st.crossings.length;
    // c recounted from the arena, never from the record (walled and unwalled alike): a miscounted c fails here.
    const cArena = recountC(g, st.k, wayEdges);
    if (cArena !== c) say(`stage ${String(st.k)}: c recorded ${String(c)} vs ${String(cArena)} crossings of the standing ways with the boundary as picked`);
    // The meetings that are no crossing (a way touching the boundary and staying on its side): pinned as gates by the
    // trace, never counted in c (C-0452 (9)).
    const grazes = recountC(g, st.k, wayEdges, 'meetings') - cArena;
    const want = Math.max(0, st.count.n - c);
    if (st.picks.length + st.short !== want) say(`stage ${String(st.k)}: ${String(st.picks.length)} picks and ${String(st.short)} short for N_k ${String(st.count.n)} − c ${String(c)}`);
    if (!b.capped && st.short !== 0) say(`stage ${String(st.k)}: ${String(st.short)} destinations short on an uncapped stage`);
    if (st.roads.length + st.unserved.length !== st.picks.length) say(`stage ${String(st.k)}: ${String(st.roads.length)} roads and ${String(st.unserved.length)} unserved for ${String(st.picks.length)} picks`);
    if (st.roads.length !== want - st.short) say(`stage ${String(st.k)}: ${String(st.roads.length)} primaries added for N_k ${String(st.count.n)} − c ${String(c)} (unserved ${JSON.stringify(st.unserved)})`);
    // (4) Each destination lies on the boundary it was picked on (a contour vertex of the stage's selection).
    for (const r of st.roads) {
      if (!b.set.contour.some((q) => q.x === r.pick.at.x && q.y === r.pick.at.y)) say(`stage ${String(st.k)}: destination (${String(r.pick.at.x)}, ${String(r.pick.at.y)}) is no contour vertex`);
    }
    // (5) The roads: each leaves a vertex of a standing way outside the previous wall (beyond its strip), runs as a
    // `primary` of stage k to the frame, meets no wall but the stage's own trace, carries its junction rows.
    for (const r of st.roads) {
      const w = r.way;
      if (w.class !== 'primary' || w.growthStage !== st.k || w.provisional) say(`${w.id}: class ${w.class}, stage ${String(w.growthStage)}, provisional ${String(w.provisional)}`);
      const edges = wayEdges.get(w.id) ?? [];
      if (edges.length === 0) {
        say(`${w.id}: no edge carries its way row`);
        continue;
      }
      const from = r.from.at;
      const fromEdges = wayEdges.get(r.from.way) ?? [];
      if (!fromEdges.some(([a, q]) => (a.x === from.x && a.y === from.y) || (q.x === from.x && q.y === from.y))) say(`${w.id}: its junction (${String(from.x)}, ${String(from.y)}) is no vertex of ${r.from.way}`);
      if (insideRing(prevWall, from) || ringDist(from, prevWall) <= clearCm) say(`${w.id}: its junction lies inside the previous wall or within ${String(clearCm)} cm of it`);
      // To the frame at its bearing (§4.4 S5b): the lattice course ends at the rim node the radial bearing from its
      // destination meets, unless that route found none and the nearest frame was taken (its `unserved` rung on the
      // route `s5b:<k>/<pick>/out` recorded: the fallback named).
      const rimEnd = r.nodes[r.nodes.length - 1];
      if (lattice.rim[rimEnd] !== 1) say(`${w.id}: its course ends at node ${String(rimEnd)}, no rim node`);
      const atBearing = rimAt(lattice, r.pick.at, r.pick.bearingCdeg);
      const fellBack = growth.report.rungs.some((x) => x.route === `s5b:${String(st.k)}/${String(r.pick.ordinal)}/out` && x.rung === 'unserved');
      if (rimEnd !== atBearing && !fellBack) say(`${w.id}: its course ends at rim node ${String(rimEnd)}, not ${String(atBearing)} at its bearing ${String(r.pick.bearingCdeg)}, and no fallback is recorded`);
      // C-0244 (6): an S5b road meets the other ways only at a junction vertex — its own T junction on the way it leaves,
      // or a later road's T junction on it (no unrecorded X junction).
      const tees = new Set(growth.stages.flatMap((s) => s.roads.map((x) => `${String(x.from.at.x)},${String(x.from.at.y)}`)));
      for (const [other, oe] of wayEdges) {
        if (other === w.id) continue;
        const off = new Set<string>();
        for (const [a, q] of edges) {
          for (const p of meetings(oe, [a, q])) {
            const at = `${String(Math.round(p.x))},${String(Math.round(p.y))}`;
            if (!tees.has(at)) off.add(at);
          }
        }
        for (const at of off) say(`${w.id} meets ${other} at (${at}), no junction of theirs`);
      }
      const jFrom = verticesWith(plat, 'junction', r.from.junction);
      const jEnd = verticesWith(plat, 'junction', r.end);
      if (jFrom.length !== 1 || jFrom[0].x !== from.x || jFrom[0].y !== from.y) say(`${w.id}: the junction row ${r.from.junction} is not on its first vertex`);
      if (jEnd.length !== 1) say(`${w.id}: the junction row ${r.end} is not on one vertex`);
      else {
        const e = jEnd[0];
        const f = lattice.frame;
        if (Math.min(e.x - f.minX, f.maxX - e.x, e.y - f.minY, f.maxY - e.y) > 100) say(`${w.id}: its end (${String(e.x)}, ${String(e.y)}) is not on the frame`);
      }
      for (const [eid, wedges] of wallEdges) {
        const ownTrace = st.trace !== null && eid === st.trace.enceinte.id;
        for (const [a, q] of edges) {
          for (const [c0, c1] of wedges) {
            const x = meetings([[a, q]], [c0, c1]);
            if (x.length === 0) continue;
            if (!ownTrace) {
              say(`${w.id} meets the wall ${eid}`);
              break;
            }
          }
        }
      }
      roadsSoFar.push({ nodes: [...r.nodes] });
    }
    // (6) The walled stage's gates: every meeting of a way with its committed wall is a gate vertex on that way, and the
    // gates are no fewer than the crossings c; each gate lies on the boundary it was picked on.
    if (st.walled) {
      const tr = st.trace;
      if (tr === null) {
        say(`stage ${String(st.k)}: walled with no trace`);
        continue;
      }
      const line = tr.traced.line;
      const mains = st.gates.filter((x) => x.kind === 'main');
      if (mains.length < c) say(`stage ${String(st.k)}: ${String(mains.length)} gates for ${String(c)} crossings`);
      // The crossings become the stage's main gates: N_k of them when N_k > c (each spawned primary one gate), else c —
      // and a graze, should one occur, its pin (C-0452 (9)).
      if (st.short === 0 && st.unserved.length === 0 && mains.length !== Math.max(st.count.n, c) + grazes) say(`stage ${String(st.k)}: ${String(mains.length)} gates for max(N_k ${String(st.count.n)}, c ${String(c)}) and ${String(grazes)} grazes`);
      const gatePts = mains.map((x) => {
        const v = verticesWith(plat, 'gate', x.id);
        return v.length === 1 ? v[0] : null;
      });
      mains.forEach((x, i) => {
        const p = gatePts[i];
        if (p === null) {
          say(`${x.id}: no single vertex carries its gate row`);
          return;
        }
        if (!line.some((q) => q.x === p.x && q.y === p.y)) say(`${x.id}: not a vertex of the committed trace`);
        // On the boundary it was picked on: the crossing, or the way's own vertex within twice the attraction distance.
        if (ringDist(p, b.set.outline) > 53) say(`${x.id}: ${String(ringDist(p, b.set.outline))} cm off the boundary it was picked on`);
        const onWay = x.way === null ? [] : (wayEdges.get(x.way) ?? []);
        if (!onWay.some(([a, q]) => (a.x === p.x && a.y === p.y) || (q.x === p.x && q.y === p.y))) say(`${x.id}: not a vertex of its way ${String(x.way)}`);
      });
      let meet = 0;
      for (const [, edges] of wayEdges) {
        for (const p of meetings(edges, line)) {
          meet += 1;
          if (!gatePts.some((q) => q !== null && Math.hypot(q.x - p.x, q.y - p.y) < 1)) say(`stage ${String(st.k)}: a way meets the wall off its gates at (${String(Math.round(p.x))}, ${String(Math.round(p.y))})`);
        }
      }
      if (meet !== mains.length) say(`stage ${String(st.k)}: ${String(meet)} way meetings with the wall, ${String(mains.length)} gates`);
      // The trace encloses the previous one and never crosses it.
      if (prevWall.some((q) => !insideRing(line, q))) say(`stage ${String(st.k)}: the previous wall is not inside the trace`);
      if (meetings(prevWall.map((q, i) => [q, prevWall[(i + 1) % prevWall.length]] as [typeof q, typeof q]), line).length > 0) say(`stage ${String(st.k)}: the trace meets the previous wall`);
      if (!wallEdges.has(tr.enceinte.id)) say(`stage ${String(st.k)}: no wall row of ${tr.enceinte.id}`);
      prevWall = line;
    }
    prevSel = b.set.selected;
  }
  // (7) T after the last stage: one field, equal to a full recompute over S3's routes and every S5b road.
  const full = fieldT(lattice, [...slice.routes, ...roadsSoFar], slice.field.a);
  let diff = 0;
  for (let i = 0; i < full.T.length; i += 1) if (!Object.is(full.T[i], growth.field.T[i])) diff += 1;
  if (diff > 0) say(`the final T differs from a full recompute at ${String(diff)} nodes`);
  return out;
}

type Pt = { x: number; y: number };

/**
 * The meetings of one way's edges with a closed ring (two within 1 cm once), each marked a crossing when the way passes
 * from one side of the ring to the other there — read 5 cm along the way on each side of it (along its edge, or along
 * the way's two edges at a vertex it meets the ring at; a vertex with one edge or more than two is a crossing) — and a
 * graze when both sides lie on one side of the ring.
 */
export function wayMeetings(edges: readonly [Pt, Pt][], ring: readonly Pt[]): { at: Pt; crossing: boolean }[] {
  const same = (a: Pt, b: Pt): boolean => Math.hypot(a.x - b.x, a.y - b.y) < 0.5;
  const toward = (from: Pt, to: Pt, d: number): Pt => {
    const l = Math.hypot(to.x - from.x, to.y - from.y);
    const s = Math.min(d, l / 2) / l;
    return { x: from.x + s * (to.x - from.x), y: from.y + s * (to.y - from.y) };
  };
  return meetings(edges, ring).map((at) => {
    const ends = edges.flatMap(([a, b]) => (same(a, at) ? [b] : same(b, at) ? [a] : []));
    let sides: [Pt, Pt] | null = null;
    if (ends.length === 2) sides = [toward(at, ends[0], 5), toward(at, ends[1], 5)];
    else if (ends.length === 0) {
      const e = edges.find(([a, b]) => segDist(at, a, b) < 0.5);
      if (e !== undefined) sides = [toward(at, e[0], 5), toward(at, e[1], 5)];
    }
    return { at, crossing: sides === null || insideRing(ring, sides[0]) !== insideRing(ring, sides[1]) };
  });
}

/**
 * Stage k's c recounted independently of the code under test (§4.4 S5b: the times the existing arterials cross the new
 * boundary): the crossings (`wayMeetings`; a graze no crossing, C-0452 (9)) — or, with `what` 'meetings', every
 * meeting — read from the arena's `way` edge rows and counted per way, of the ways that stood before stage k's S5b (S4's
 * and the earlier stages' S5b roads) with the stage's boundary as picked: S3's level set at the stage's threshold over
 * its union field, no destination pinned. 0 for a folded stage.
 */
export function recountC(g: Grown, k: number, wayEdges: Map<string, [Pt, Pt][]> = roleEdges(g.plat, 'way'), what: 'crossings' | 'meetings' = 'crossings'): number {
  const st = g.growth.stages[k - 1];
  const b = st.boundary;
  if (b === null) return 0;
  const outline = levelSet(b.field, b.threshold.t).outline;
  const standing = [...g.s4.network.ways.map((w) => w.id), ...g.growth.stages.filter((s) => s.k < k).flatMap((s) => s.roads.map((r) => r.way.id))];
  let c = 0;
  for (const id of standing) c += wayMeetings(wayEdges.get(id) ?? [], outline).filter((m) => what === 'meetings' || m.crossing).length;
  return c;
}

/**
 * The rim node the radial bearing from p meets (written here, independent of the code under test): the ray from p at
 * the compass bearing (cdeg), walked in one-spacing steps until it leaves the frame, then the rim node nearest that
 * point.
 */
export function rimAt(lattice: Grown['slice']['lattice'], p: Pt, bearingCdeg: number): number {
  const th = ((9_000 - bearingCdeg) * Math.PI) / 18_000;
  const f = lattice.frame;
  let x = p.x;
  let y = p.y;
  while (x > f.minX && x < f.maxX && y > f.minY && y < f.maxY) {
    x += Math.cos(th) * lattice.spacingCm;
    y += Math.sin(th) * lattice.spacingCm;
  }
  let best = -1;
  let bestD = Infinity;
  for (let i = 0; i < lattice.points.length; i += 1) {
    if (lattice.rim[i] !== 1) continue;
    const d = Math.hypot(lattice.points[i].x - x, lattice.points[i].y - y);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
}

/** §13.2's S5b statistics on a grown run: primary length per km² of the town's land, the share of gates on primaries. */
export function s5bStatistics(g: Grown): { primaryKmPerKm2: number; gateShare: number; gates: number } {
  const plat = g.plat;
  const ways = g.growth.ways;
  const edges = roleEdges(plat, 'way');
  const last = [...g.growth.stages].reverse().find((s) => s.boundary !== null);
  const ring = last?.boundary?.set.outline ?? g.slice.levelSet.outline;
  let len = 0;
  for (const w of ways) {
    if (w.class !== 'primary' && w.class !== 'through') continue;
    len += lengthInside(edges.get(w.id) ?? [], ring);
  }
  const km2 = area(ring) / 1e10;
  let gates = 0;
  let onPrimary = 0;
  for (const st of g.growth.stages) {
    for (const x of st.gates) {
      if (x.kind !== 'main') continue;
      gates += 1;
      const v = verticesWith(plat, 'gate', x.id);
      if (v.length !== 1) continue;
      const p = v[0];
      const on = ways.some((w) => (w.class === 'primary' || w.class === 'through') && (edges.get(w.id) ?? []).some(([a, b]) => segDist(p, a, b) < 1));
      if (on) onPrimary += 1;
    }
  }
  return { primaryKmPerKm2: len / 100_000 / km2, gateShare: gates === 0 ? 0 : onPrimary / gates, gates };
}
