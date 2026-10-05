// Test support for M0-a-15's bar runs in the test kit (C-0122): the round trip with its receipts, read through M0-d-08's
// slot-free prints; the constructive arenas of M0-k-02's set (through M0-d-08's `constructiveSequence`, and the set's
// own encode / decode cases interpreted here); M0-k-01's fuzz arenas (its arbitraries inserted into a framed arena);
// and a CITY-shaped synthetic arena — a 5 km frame, a 6 × 6 way grid, a lake, lanes, courtyards, plot lines and
// footprints, owners at every level, knots and pins — with a four-district partition resolver, so the block writes
// several partitions per level and vertices on the district boundaries go to the smaller key (§3.3, §3.9).
import { expect } from 'vitest';
import {
  attachIndex,
  checkCI,
  compactSlots,
  createPlat,
  decodeArena,
  encodeArena,
  faceWalk,
  hardProblems,
  insertChain,
  pinVertices,
  pointLocate,
  setOwner,
  type Cm,
  type Chunk,
  type Frame,
  type ItemRef,
  type KernelResult,
  type Level,
  type Overlay,
  type Plat,
  type RoleRow,
} from '@plat/kernel';
import type { ConstructiveCase, ConstructiveInput, ConstructiveStep } from '../../../src/constructive/types.js';
import { arenaPrint, determinismPoint as lp, FIXTURE_CELLS, FIXTURE_FRAME, FIXTURE_KEY, fixtureSpec, levelDigestsHex, runBatch } from '../../../src/determinism/index.js';

/** The arena, slot-free (M0-d-08's print), without its version — which a block does not store (§3.9). */
export function print(p: Plat): string {
  const s = arenaPrint(p);
  return s.slice(0, s.lastIndexOf('\n#version'));
}

/** Are two chunk lists byte-identical, ref for ref? */
export function sameBlock(a: readonly Chunk[], b: readonly Chunk[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i].bytes.length !== b[i].bytes.length) return false;
    for (let k = 0; k < a[i].bytes.length; k++) if (a[i].bytes[k] !== b[i].bytes[k]) return false;
    for (let k = 0; k < 4; k++) if (a[i].ref[k] !== b[i].ref[k]) return false;
  }
  return true;
}

/** The index configuration an arena carries (its grid cells and resolver), for the load's rebuild. */
export function indexConfigOf(p: Plat): { gridCellCm: [number, number, number, number, number]; partitionOf?: (p: Plat, item: ItemRef) => string | readonly string[] } {
  const cells = (p.index?.levels.map((l) => l.dynamic.cellCm) ?? FIXTURE_CELLS) as [number, number, number, number, number];
  const resolver = p.index?.partitionOf ?? null;
  return resolver === null ? { gridCellCm: cells } : { gridCellCm: cells, partitionOf: resolver };
}

/** decodeArena's value with the arena's own index configuration; a refusal fails the test. */
export function load(chunks: readonly Chunk[], p: Plat): Plat {
  const r = decodeArena(chunks, p.key, { index: indexConfigOf(p) });
  if (!r.ok) throw new Error(`support: the block did not load: ${r.code} ${r.detail}`);
  return r.value;
}

/**
 * §13.1's round trip on one arena (the bar): save → load → save byte-identical, the loaded arena equal to the original
 * (M0-d-08's slot-free print), its five per-level route digests equal (M0-d-04), and every hard invariant holding on it
 * (M0-a-14's CI sweep); and the compacted copy printing alike and saving to the same bytes.
 */
export function roundTrip(p: Plat): { chunks: Chunk[]; loaded: Plat } {
  const chunks = encodeArena(p);
  const loaded = load(chunks, p);
  expect(sameBlock(encodeArena(loaded), chunks)).toBe(true);
  expect(print(loaded)).toBe(print(p));
  expect(levelDigestsHex(loaded)).toEqual(levelDigestsHex(p));
  expect(hardProblems(checkCI(loaded))).toEqual([]);
  const compact = compactSlots(p);
  expect(print(compact)).toBe(print(p));
  expect(sameBlock(encodeArena(compact), chunks)).toBe(true);
  return { chunks, loaded };
}

// ---- the constructive set's own encode / decode scenarios --------------------------------------------------------------

/** An indexed, empty ground arena with the kernel fixtures' frame record (the case inserts its own outer ring). */
export function bareArena(): Plat {
  const p = createPlat(FIXTURE_KEY, FIXTURE_FRAME);
  attachIndex(p, { gridCellCm: FIXTURE_CELLS });
  return p;
}

/** A case's leading insertChain steps run as one callback batch each, at its level, on `p` (constructiveSequence's reading). */
export function insertSteps(p: Plat, input: ConstructiveInput): { inserted: number; refused: number; rest: ConstructiveStep[] } {
  let k = 0;
  let inserted = 0;
  let refused = 0;
  while (k < input.steps.length && input.steps[k].op === 'insertChain') {
    const s = input.steps[k++];
    const name = String(s.args.chain ?? s.args.ring);
    const closed = Object.hasOwn(input.rings, name);
    const pts = closed ? input.rings[name] : input.chains[name];
    const level = (typeof s.args.level === 'number' ? s.args.level : 1) as Level;
    const role = String(s.args.role ?? 'way');
    const cls = s.args.cls === 'optional' ? 'optional' : 'mandatory';
    const r = runBatch(p, {
      spec: fixtureSpec(level),
      fn: (o: Overlay) => insertChain(o, pts.map((q) => lp(q.x, q.y)), [{ role, entity: `${role}:${name}` }], cls, closed ? { closed: true } : {}),
    });
    if (r.ok) inserted++;
    else refused++;
  }
  return { inserted, refused, rest: input.steps.slice(k) };
}

/** A draw of a case (an M0 case's input; the test fails on a deferred stub). */
export function draw(c: ConstructiveCase, seed: number): ConstructiveInput {
  const input = c.generate(seed as never);
  if (input.kind !== 'input') throw new Error(`support: ${c.id} is deferred`);
  return input;
}

// ---- the CITY-shaped synthetic arena ------------------------------------------------------------------------------------

/** CITY's frame: 25 km², 5 km a side (§1.1's CITY row), the margin share of the base frame law. */
export const CITY_FRAME: Frame = { widthCm: 500_000 as Cm, heightCm: 500_000 as Cm, aspect: 1, marginShare: 0.3 };
/** The outer ring's half side: 4.8 km of the 5 km frame, so the 6 × 6 grid's lines are whole centimetres. */
const H = 240_000;
/** The grid's ways: 6 × 6 blocks, the middle way of each direction on 0 — the four districts' boundaries. */
const N = 6;
const STEP = (2 * H) / N;
const LINES = Array.from({ length: N - 1 }, (_, k) => -H + (k + 1) * STEP);

/** The district of a doubled point: its quadrant's key, or every key of the quadrants it borders on a boundary way. */
function districtsAt(sx: number, sy: number): string | string[] {
  const xs = sx > 0 ? ['e'] : sx < 0 ? ['w'] : ['e', 'w'];
  const ys = sy > 0 ? ['n'] : sy < 0 ? ['s'] : ['n', 's'];
  const keys: string[] = [];
  for (const y of ys) for (const x of xs) keys.push(`district:${y}${x}`);
  return keys.length === 1 ? keys[0] : keys;
}

/**
 * S6's district membership for the CITY-shaped arena (a `PartitionResolver`, §3.3): a vertex by its point, a route
 * edge by its handle pair's midpoint, a face by its outer ring's bounding-box centre — every reading on lattice
 * positions, never on a slot's number.
 */
export function cityDistricts(p: Plat, item: ItemRef): string | readonly string[] {
  const X = p.vertices.x;
  const Y = p.vertices.y;
  const O = p.halfEdges.origin;
  if (item.kind === 0) return districtsAt(2 * X[item.slot], 2 * Y[item.slot]);
  if (item.kind === 1) {
    const a = O[2 * item.slot];
    const b = O[2 * item.slot + 1];
    return districtsAt(X[a] + X[b], Y[a] + Y[b]);
  }
  const ring = faceWalk(p, item.level, item.slot)[0];
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  for (const h of ring) {
    const v = O[h];
    x0 = Math.min(x0, X[v]);
    y0 = Math.min(y0, Y[v]);
    x1 = Math.max(x1, X[v]);
    y1 = Math.max(y1, Y[v]);
  }
  return districtsAt(x0 + x1, y0 + y1);
}

function batch<T>(p: Plat, level: Level, fn: (o: Overlay) => KernelResult<T>): boolean {
  return runBatch(p, { spec: fixtureSpec(level), fn: fn as (o: Overlay) => KernelResult<unknown> }).ok;
}

function chain(p: Plat, level: Level, pts: readonly (readonly [number, number])[], rows: RoleRow[], opts: { closed?: boolean; knots?: { index: number; role: string; ordinal: number }[] } = {}): boolean {
  return batch(p, level, (o) => insertChain(o, pts.map(([x, y]) => lp(x, y)), rows, 'mandatory', opts));
}

function own(p: Plat, level: Level, at: readonly [number, number], owner: string): boolean {
  return batch(p, level, (o) => {
    const loc = pointLocate(o.plat, o.key, level, lp(at[0], at[1]));
    if (loc.on !== 'face' || loc.level !== level) return { ok: false, code: 'E_DEGENERATE', detail: 'empty' };
    return setOwner(o, [loc.face], owner);
  });
}

/** What the CITY-shaped build committed, by kind (the fixture's precondition). */
export interface CityTally {
  ways: number;
  lanes: number;
  courts: number;
  plotLines: number;
  footprints: number;
  owners: number;
  pins: number;
  refused: number;
}

/** The CITY-shaped synthetic arena (see the module comment) and its tally. */
export function cityArena(): { plat: Plat; tally: CityTally } {
  const p = createPlat(FIXTURE_KEY, CITY_FRAME);
  attachIndex(p, { gridCellCm: [4000, 2000, 800, 400, 200], partitionOf: cityDistricts });
  const t: CityTally = { ways: 0, lanes: 0, courts: 0, plotLines: 0, footprints: 0, owners: 0, pins: 0, refused: 0 };
  const count = (ok: boolean, k: keyof CityTally): void => {
    if (ok) t[k]++;
    else t.refused++;
  };
  count(chain(p, 0, [[-H, -H], [H, -H], [H, H], [-H, H]], [{ role: 'margin', entity: 'terrain:1' }], { closed: true }), 'ways');
  // A lake inside one block of the north-east district (its ring an L0 shore: a hole of the land face's views).
  const lb = LINES[3];
  count(chain(p, 0, [[lb + 12_000, lb + 12_000], [lb + 52_000, lb + 14_000], [lb + 50_000, lb + 60_000], [lb + 15_000, lb + 55_000]], [{ role: 'shore', entity: 'water:1' }], { closed: true }), 'ways');
  // The way grid, each way with width knots (indexed vertex rows, ordinals 0 and 1) at its two ends.
  LINES.forEach((c, k) => {
    count(chain(p, 1, [[c, -H], [c, H]], [{ role: 'way', entity: `way:v${k}` }], { knots: [{ index: 0, role: 'width_knot', ordinal: 0 }, { index: 1, role: 'width_knot', ordinal: 1 }] }), 'ways');
    count(chain(p, 1, [[-H, c], [H, c]], [{ role: 'way', entity: `way:h${k}` }], { knots: [{ index: 0, role: 'width_knot', ordinal: 0 }, { index: 1, role: 'width_knot', ordinal: 1 }] }), 'ways');
  });
  // Pins on the middle ways' far knots (the kernel's pinned flag).
  for (const k of [2]) {
    count(batch(p, 1, (o) => pinVertices(o, [{ role: 'width_knot', entity: `way:v${k}`, ordinal: 1 }, { role: 'width_knot', entity: `way:h${k}`, ordinal: 1 }])), 'pins');
  }
  const edges = [-H, ...LINES, H];
  for (let i = 0; i < N; i++) {
    for (let j = 0; j < N; j++) {
      const x0 = edges[i];
      const x1 = edges[i + 1];
      const y0 = edges[j];
      const y1 = edges[j + 1];
      const cx = Math.round((x0 + x1) / 2);
      const id = `${i}.${j}`;
      count(own(p, 1, [x0 + 3_000, y0 + 3_000], `block:${id}`), 'owners');
      if (i === 4 && j === 4) continue; // the lake's block keeps only its L1 face
      // A lane across the block, from its west way to its east way (L2 Steiner vertices on both L1 ways).
      const ym = Math.round((y0 + y1) / 2) + ((i + j) % 3) * 700;
      count(chain(p, 2, [[x0, ym], [x1, ym]], [{ role: 'kerb', entity: `lane:${id}` }]), 'lanes');
      // A courtyard: a closed L2 kerb ring in the block's south half (a hole of the face around it).
      if ((i + j) % 2 === 0) count(chain(p, 2, [[cx - 6_000, y0 + 8_000], [cx + 6_000, y0 + 8_000], [cx + 6_000, y0 + 16_000], [cx - 6_000, y0 + 16_000]], [{ role: 'kerb', entity: `court:${id}` }], { closed: true }), 'courts');
      // Plot lines from the lane to the north way (L3 Steiner vertices on the L2 lane and the L1 way), and their plots.
      for (let k = 1; k <= 3; k++) {
        const x = Math.round(x0 + ((x1 - x0) * k) / 4);
        count(chain(p, 3, [[x, ym], [x, y1]], [{ role: 'plot_line', entity: `plot:${id}.${k}` }]), 'plotLines');
      }
      for (let k = 0; k < 4; k++) {
        const x = Math.round(x0 + ((x1 - x0) * (2 * k + 1)) / 8);
        count(own(p, 3, [x, Math.round((ym + y1) / 2)], `plot:${id}:${k}`), 'owners');
        // A footprint inside the plot (an L4 ring), owned by its building.
        const fy = ym + 4_000;
        if (chain(p, 4, [[x - 1_500, fy], [x + 1_500, fy], [x + 1_500, fy + 2_500], [x - 1_500, fy + 2_500]], [{ role: 'yard_part', entity: `building:${id}:${k}` }], { closed: true })) {
          t.footprints++;
          count(own(p, 4, [x, fy + 1_000], `building:${id}:${k}`), 'owners');
        } else {
          t.refused++;
        }
      }
    }
  }
  return { plat: p, tally: t };
}
