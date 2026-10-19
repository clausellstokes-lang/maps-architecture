// M0-m-01: the records M0 writes or reads — every one present under its design name (exported by the package index);
// no record type holds a vertex position but §2.2 rule 5's exceptions (a type test over every field path of every
// record); every entity record embeds its identity's `id` and its `Lifecycle` (§2.4, §2.8); the minimal records hold
// the fields their rows state — Enceinte C-0033's with its id and lifecycle (C-0142 (2)(a)), Gate C-0087's water-gate
// fields, Seam C-0046's two districts, boundary chains and portals with its amendments staged to M1 (C-0145); §9.1's
// QuarterNode with its fields (C-0245 (14)). Type assertions are checked by `corepack pnpm build` (tsc -b compiles
// this file); the file runs under vitest.
import { describe, expect, expectTypeOf, it } from 'vitest';
import type {
  Allocation,
  Block,
  Bridge,
  ChainRef,
  Cm,
  ContextVector,
  District,
  Enceinte,
  FaceRef,
  FieldBands,
  Frontage,
  Gate,
  HydroGrid,
  Id,
  Junction,
  LatticePoint,
  Lifecycle,
  NameRef,
  NodeRef,
  Outfall,
  Plot,
  PlotBound,
  Portal,
  QuarterNode,
  RecordOf,
  Reservation,
  Seam,
  SeamEdge,
  SitePlan,
  Terrain,
  TerrainSampler,
  VertexRef,
  WaterBody,
  Way,
  YardPart,
} from '../../src/index.js';
import type * as Mdl from '../../src/index.js';
import { M0_KINDS } from '../../src/index.js';

/** A value that carries no position: primitives, typed arrays and functions. */
type Leaf = string | number | boolean | bigint | symbol | null | undefined;

/**
 * Every field path of T whose value is a vertex position (a LatticePoint, under any of its names), as 'a.b[].c'.
 * Distributes over unions, walks arrays and objects, and stops at primitives, typed arrays and functions.
 */
type PositionPaths<T, P extends string = ''> = T extends LatticePoint
  ? P
  : T extends Leaf
    ? never
    : T extends ArrayBufferView
      ? never
      : T extends (...args: never[]) => unknown
        ? never
        : T extends readonly (infer U)[]
          ? PositionPaths<U, `${P}[]`>
          : { [Key in keyof T & string]-?: PositionPaths<T[Key], P extends '' ? Key : `${P}.${Key}`> }[keyof T & string];

describe('the M0 records (§2.3, §2.4, §2.5, §2.7, II.1)', () => {
  it('every M0 record is present under its design name, and M0_KINDS names each record kind once', () => {
    expectTypeOf<RecordOf>().toEqualTypeOf<{
      terrain: Terrain;
      waterBody: WaterBody;
      way: Way;
      junction: Junction;
      district: District;
      block: Block;
      frontage: Frontage;
      plot: Plot;
      reservation: Reservation;
      allocation: Allocation;
      fieldBands: FieldBands;
      enceinte: Enceinte;
      gate: Gate;
      bridge: Bridge;
      seam: Seam;
    }>();
    expectTypeOf<(typeof M0_KINDS)[number]>().toEqualTypeOf<keyof RecordOf>();
    expect(M0_KINDS).toHaveLength(15);
    expect(new Set(M0_KINDS).size).toBe(15);
    expect(Object.isFrozen(M0_KINDS)).toBe(true);
    // the sub-records and helper types an M0 record names are exported under their design names too
    expectTypeOf<Terrain['hydro']>().toEqualTypeOf<HydroGrid>();
    expectTypeOf<Terrain['outfalls']>().toEqualTypeOf<Outfall[]>();
    expectTypeOf<Plot['bounds']>().toEqualTypeOf<PlotBound[]>();
    expectTypeOf<Plot['yard']>().toEqualTypeOf<YardPart[]>();
    expectTypeOf<Plot['sitePlan']>().toEqualTypeOf<SitePlan>();
    expectTypeOf<Plot['ctx']>().toEqualTypeOf<ContextVector>();
    expectTypeOf<Seam['edges']>().toEqualTypeOf<SeamEdge[]>();
    expectTypeOf<Seam['portals']>().toEqualTypeOf<Portal[]>();
    expectTypeOf<Way['from']>().toEqualTypeOf<NodeRef>();
    expectTypeOf<keyof TerrainSampler>().toEqualTypeOf<'heightAt' | 'slopeAt' | 'flowAt'>();
  });

  it('no record type holds a vertex position but §2.2 rule 5\'s exceptions', () => {
    // §2.2 rule 5: a point that is no vertex is an ordinary attribute of its record —
    //   Terrain: an outfall's bank, frame-edge or field point (§2.3) and a site feature's anchor (C-0142 (4));
    //   WaterBody: the river's course, its own derived polyline that no kernel op re-vertexes, its control knots and a
    //     spring's source point (§2.3);
    //   Block: an instance override's moved and recorded points (§2.7's uniform instance-override field);
    //   Allocation: a positioned row's point, a sky landing's foot (V05 §3.10).
    expectTypeOf<PositionPaths<Terrain>>().toEqualTypeOf<'outfalls[].at' | 'features[].at'>();
    expectTypeOf<PositionPaths<WaterBody>>().toEqualTypeOf<'course[]' | 'controls[].at' | 'spring.at'>();
    expectTypeOf<PositionPaths<Block>>().toEqualTypeOf<'overrides[].at' | 'overrides[].recorded'>();
    expectTypeOf<PositionPaths<Allocation>>().toEqualTypeOf<'rows[].at'>();
    // every other record reaches its geometry only through FaceRef, ChainRef, EdgeSetRef and VertexRef
    expectTypeOf<PositionPaths<Way>>().toEqualTypeOf<never>();
    expectTypeOf<PositionPaths<Junction>>().toEqualTypeOf<never>();
    expectTypeOf<PositionPaths<District>>().toEqualTypeOf<never>();
    expectTypeOf<PositionPaths<Frontage>>().toEqualTypeOf<never>();
    expectTypeOf<PositionPaths<Plot>>().toEqualTypeOf<never>();
    expectTypeOf<PositionPaths<Reservation>>().toEqualTypeOf<never>();
    expectTypeOf<PositionPaths<FieldBands>>().toEqualTypeOf<never>();
    expectTypeOf<PositionPaths<Enceinte>>().toEqualTypeOf<never>();
    expectTypeOf<PositionPaths<Gate>>().toEqualTypeOf<never>();
    expectTypeOf<PositionPaths<Bridge>>().toEqualTypeOf<never>();
    expectTypeOf<PositionPaths<Seam>>().toEqualTypeOf<never>();
    // the walker sees a position wherever one is: a StretchRef's ends, a bare point, a nested array of points
    expectTypeOf<PositionPaths<{ s: { chain: ChainRef; from: VertexRef | LatticePoint } }>>().toEqualTypeOf<'s.from'>();
    expectTypeOf<PositionPaths<{ ring: LatticePoint[][] }>>().toEqualTypeOf<'ring[][]'>();
    expectTypeOf<PositionPaths<{ f: FaceRef; n: Cm; a: Int32Array }>>().toEqualTypeOf<never>();
  });

  it('every entity record embeds its id and its Lifecycle (§2.4, §2.8); FieldBands and Seam are no entities in §2.5 and II.1', () => {
    expectTypeOf<RecordOf[Exclude<keyof RecordOf, 'fieldBands' | 'seam'>]['id']>().toEqualTypeOf<Id>();
    expectTypeOf<RecordOf[Exclude<keyof RecordOf, 'fieldBands' | 'seam'>]['lifecycle']>().toEqualTypeOf<Lifecycle>();
    expectTypeOf<'id' | 'lifecycle'>().not.toMatchTypeOf<keyof FieldBands>();
    expectTypeOf<'lifecycle'>().not.toMatchTypeOf<keyof Seam>();
    expectTypeOf<Seam['id']>().toEqualTypeOf<Id>();
  });

  it('the minimal records: Enceinte holds C-0033\'s fields with its id and lifecycle (C-0142 (2)(a)), Gate C-0087\'s water-gate fields, Seam C-0046\'s districts, boundary chains and portals, its amendments staged (C-0145)', () => {
    expectTypeOf<keyof Enceinte>().toEqualTypeOf<'id' | 'trace' | 'strips' | 'thicknessCm' | 'setbackCm' | 'gates' | 'stage' | 'lifecycle'>();
    expectTypeOf<Enceinte['strips']>().toEqualTypeOf<{ inner: FaceRef; outer: FaceRef }>();
    expectTypeOf<Enceinte['setbackCm']>().toEqualTypeOf<{ inner: Cm; outer: Cm }>();
    // a water gate: way null, its two gate_end bank vertices in banks
    expectTypeOf<Gate['way']>().toEqualTypeOf<Id | null>();
    expectTypeOf<Gate['banks']>().toEqualTypeOf<[VertexRef, VertexRef] | undefined>();
    const water: Gate = {
      id: 'gate:w',
      enceinte: 'enceinte:e',
      junction: 'junction:j',
      way: null,
      kind: 'water',
      banks: [
        { role: 'gate_end', entity: 'gate:w', ordinal: 0 },
        { role: 'gate_end', entity: 'gate:w', ordinal: 1 },
      ],
      lifecycle: { existence: 'generated', flags: { locked: false, pinned: false, edited: false, assigned: false }, since: { epoch: 0, seq: 0 } },
    };
    expect(water.banks?.map((b) => b.ordinal)).toEqual([0, 1]);
    // C-0046: the two district ids, the boundary chain(s) and the portals, S8's lane ends among them as `baseLane`
    // portals; the full SeamContract and SeamAmendment are M1's, so `amendments` is staged (schema/staged.ts) and the
    // SeamAmendment record is not declared at M0
    expectTypeOf<keyof Seam>().toEqualTypeOf<'id' | 'sides' | 'edges' | 'portals'>();
    expectTypeOf<Seam['sides']>().toEqualTypeOf<[Id, Id | null]>();
    expectTypeOf<Portal['from']>().toEqualTypeOf<'growth' | 'baseLane' | 'closeup'>();
    // @ts-expect-error — SeamAmendment is M1's (C-0046, C-0145): @plat/model declares no such record at M0
    type Amendment = Mdl.SeamAmendment;
    expectTypeOf<Amendment>().toBeAny();
    expectTypeOf<Bridge['state']>().toEqualTypeOf<'site' | 'built'>();
    expectTypeOf<Bridge['deck']>().toEqualTypeOf<[VertexRef, VertexRef]>();
  });

  it('§9.1\'s QuarterNode, which a District\'s quarter names: its members, children, name, label spine and city-cut flag; its one position path the label spine', () => {
    expectTypeOf<QuarterNode>().toEqualTypeOf<{
      id: Id;
      members: Id[];
      children: [Id, Id] | null;
      name: NameRef;
      spine: Mdl.Polyline;
      cityCut: boolean;
    }>();
    expectTypeOf<Mdl.Polyline>().toEqualTypeOf<LatticePoint[]>();
    expectTypeOf<District['quarter']>().toEqualTypeOf<QuarterNode['id']>();
    // a label spine is §9.1's label geometry in world cm, no arena vertex
    expectTypeOf<PositionPaths<QuarterNode>>().toEqualTypeOf<'spine[]'>();
    expectTypeOf<'quarterNode' | 'quarter'>().not.toMatchTypeOf<keyof RecordOf>();
    const leaf: QuarterNode = { id: 'quarter:a', members: ['district:a'], children: null, name: '', spine: [], cityCut: false };
    expect(leaf.children).toBeNull();
  });
});

