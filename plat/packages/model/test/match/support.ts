// Test support for M0-d-05b's matching tests: entity builders and a seeded generator, written from §6.3's words and
// never with the code under test.
import type { LineageHash } from '@plat/kernel';
import type { EntityKind, Id, MatchEntity, PointCm, PolygonCm } from '../../src/index.js';

/** mulberry32: a seeded generator in [0, 1). */
export function generator(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export const intIn = (rnd: () => number, lo: number, hi: number): number => lo + Math.floor(rnd() * (hi - lo + 1));

export const P = (x: number, y: number): PointCm => ({ x, y }) as unknown as PointCm;

export const L = (a: number, b = 0): LineageHash => [a >>> 0, b >>> 0] as unknown as LineageHash;

/** An axis-aligned rectangle as an area (outer ring counter-clockwise). */
export const rect = (x0: number, y0: number, x1: number, y1: number): PolygonCm =>
  [[P(x0, y0), P(x1, y0), P(x1, y1), P(x0, y1)]] as unknown as PolygonCm;

export interface PointOpts {
  family?: string;
  on?: Id;
  region?: PolygonCm;
  survives?: boolean;
  partition?: string;
  lineage?: LineageHash;
  name?: string;
}

export function pointEntity(kind: EntityKind, id: Id, x: number, y: number, o: PointOpts = {}): MatchEntity {
  return {
    id,
    kind,
    lineage: o.lineage ?? L(id.length, x * 7 + y),
    anchor: o.on === undefined ? { point: P(x, y) } : { point: P(x, y), on: o.on },
    ...(o.family === undefined ? {} : { family: o.family }),
    ...(o.region === undefined ? {} : { region: o.region }),
    ...(o.survives === undefined ? {} : { survives: o.survives }),
    ...(o.partition === undefined ? {} : { partition: o.partition }),
    ...(o.name === undefined ? {} : { name: { text: o.name } }),
  };
}

export function areaEntity(kind: EntityKind, id: Id, area: PolygonCm, o: { family?: string; lineage?: LineageHash; partition?: string } = {}): MatchEntity {
  return {
    id,
    kind,
    lineage: o.lineage ?? L(id.length, 1),
    anchor: { area },
    ...(o.family === undefined ? {} : { family: o.family }),
    ...(o.partition === undefined ? {} : { partition: o.partition }),
  };
}

export function wayEntity(id: Id, ends: [Id | null, Id | null], line: [number, number][], o: { family?: string; lineage?: LineageHash } = {}): MatchEntity {
  return {
    id,
    kind: 'way',
    lineage: o.lineage ?? L(id.length, 2),
    anchor: { ends, line: line.map(([x, y]) => P(x, y)) },
    ...(o.family === undefined ? {} : { family: o.family }),
  };
}
