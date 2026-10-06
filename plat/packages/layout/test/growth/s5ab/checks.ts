// The item's stated promises checked on a grown run, each from the arena's own tables and plane helpers written here
// (never through the code under test): §4.4 S5a's nested stages and gates on their boundary, S5b's N_k − c primaries and
// the gate count, the walls and roads, T one field re-settled; and §13.2's two S5b statistics.
import { fieldT } from '../../../src/index.js';
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
  const roadsSoFar: { nodes: readonly number[] }[] = [];
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
      roadsSoFar.push({ nodes: r.nodes });
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
      // The crossings become the stage's main gates: N_k of them when N_k > c (each spawned primary one gate), else c.
      if (st.short === 0 && st.unserved.length === 0 && mains.length !== Math.max(st.count.n, c)) say(`stage ${String(st.k)}: ${String(mains.length)} gates for max(N_k ${String(st.count.n)}, c ${String(c)})`);
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
        if (ringDist(p, b.set.outline) > 30) say(`${x.id}: ${String(ringDist(p, b.set.outline))} cm off the boundary it was picked on`);
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
