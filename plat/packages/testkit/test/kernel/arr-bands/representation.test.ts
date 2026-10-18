// M0-a-09's band ops are representation-free (§3.3: "Every tie-break in the kernel uses lattice positions (y, then x),
// canonical item keys … or entity ids, never a VertexId, HalfEdgeId or FaceId … identical results for the same next
// edit"; C-0207 (5): a loaded arena's next operation equals the original's; §4.6's S8 ≡ S9 on a loaded arena; C-0230).
// The integration check of group 10 (checks/integration-g10.md B-1) found kerb(F) and corridorUnion ordering their
// spines by the entity's intern handle and their outline pieces and corridor splits by the face record's stored start,
// so a save and load (the ids re-interned, the starts re-chosen, M0-a-15) or M0-d-08's start re-draw changed the kerb,
// the S8 plan and the S9 commit. This file runs `kerb` on every L1 face and then `corridorUnion` over them all on an
// arena, on its decodeArena(encodeArena(…)) copy and on two renumberSlots(…, { starts: true }) copies, and asserts the
// same kerb text and the same committed slot-free print — on the check's repro fixtures by name and on M0-k-02's whole
// M0 constructive set at seeds 0 and 1 (the check's 166 arenas) at the PR size; a reduced run (PLAT_FUZZ_RUNS below
// 10⁴, a related run's 1 000) sweeps every other case at seed 0, so the sweep stays short in other items' related runs.
import { describe, expect, it } from 'vitest';
import {
  compareFaces,
  corridorUnion,
  decodeArena,
  encodeArena,
  isFaceLive,
  kerb,
  setOwner,
  STAGES,
  tx,
  type FaceId,
  type KernelResult,
  type Plat,
  type SpineWidths,
} from '@plat/kernel';
import { casesAt } from '../../../src/constructive/index.js';
import type { ConstructiveCase } from '../../../src/constructive/types.js';
import { arenaPrint, constructiveSequence, FIXTURE_CELLS, fixtureSpec, renumberSlots, runBatch } from '../../../src/determinism/index.js';
import { fuzzRuns } from '../../../src/fuzz/index.js';

/** The whole set at the PR size (10⁴) and above; every other case at seed 0 below it. */
const FULL = fuzzRuns() >= 10_000;

/** Every way a spine of 3 m half-width; nothing else declares one (the check's P2 widths). */
const WIDTHS: SpineWidths = (c) => (c.role === 'way' ? { halfWidthCm: 300 } : null);

/** The constructive case's arena after its batches, every L1 face owned (a corridorUnion row names the owner). */
function arenaOf(c: ConstructiveCase, seed: number): Plat | null {
  const seq = constructiveSequence(c, seed);
  if (seq === null) return null;
  const p = seq.arena();
  for (const b of seq.batches) {
    try {
      runBatch(p, b.build(p));
    } catch {
      // a batch the case's arena refuses to build is the case's own; the arena as it stands is the fixture
    }
  }
  l1Faces(p).forEach((f, i) => {
    if (p.faces[1].owner[f] >= 0) return;
    tx(p, fixtureSpec(1), (o) => setOwner(o, [f], `block:${String(i)}`));
  });
  return p;
}

/** The live L1 faces in canonical order (§3.3's face key). */
function l1Faces(p: Plat): FaceId[] {
  const out: FaceId[] = [];
  for (let f = 0; f < p.slots.face[1].top; f += 1) if (isFaceLive(p, 1, f)) out.push(f);
  return out.sort((a, b) => compareFaces(p, 1, a, b));
}

/** The copies of an arena the band ops must not tell apart: loaded (handles re-interned, starts re-chosen), starts re-drawn. */
function copies(p: Plat): [string, Plat][] {
  const cells = (p.index?.levels.map((l) => l.dynamic.cellCm) ?? FIXTURE_CELLS) as [number, number, number, number, number];
  const partitionOf = p.index?.partitionOf ?? null;
  const d = decodeArena(encodeArena(p), p.key, { index: partitionOf === null ? { gridCellCm: cells } : { gridCellCm: cells, partitionOf } });
  if (!d.ok) throw new Error(`representation: the block did not load: ${d.code} ${d.detail}`);
  return [
    ['decoded', d.value],
    ['starts 7', renumberSlots(p, 7, { starts: true })],
    ['starts 11', renumberSlots(p, 11, { starts: true })],
  ];
}

/** Every L1 face's kerb (text, slot-free), then corridorUnion over all of them at S9: the outcome and the arena's print. */
function bands(p: Plat): { kerbs: string; commit: string } {
  const faces = l1Faces(p);
  const kerbs: string[] = [];
  tx(p, fixtureSpec(1), (o): KernelResult<null> => {
    for (const f of faces) {
      const k = kerb(o, f, WIDTHS);
      kerbs.push(k.ok ? k.value.map((r) => r.map((q) => `${String(q.x)},${String(q.y)}`).join(' ')).join(' | ') : `refused ${k.code} ${k.detail}`);
    }
    return { ok: true, value: null, warnings: [] };
  });
  const S9 = STAGES.S9;
  const c = tx(p, fixtureSpec(2, { stage: S9, rederivesFrom: S9, batch: { kind: 'stage', stage: S9 } }), (o) => corridorUnion(o, faces, WIDTHS));
  const print = arenaPrint(p);
  return { kerbs: kerbs.join('\n'), commit: `${c.ok ? 'ok' : `${c.code} ${c.detail}`}\n${print.slice(0, print.lastIndexOf('\n#version'))}` };
}

/** The differences between an arena's band ops and its copies' (empty when none). */
function differences(c: ConstructiveCase, seed: number): string[] {
  const p = arenaOf(c, seed);
  if (p === null) return [];
  const cs = copies(p);
  const base = bands(p);
  const out: string[] = [];
  for (const [name, q] of cs) {
    const r = bands(q);
    if (r.kerbs !== base.kerbs) out.push(`${c.id}#${String(seed)} ${name}: kerb differs`);
    if (r.commit !== base.commit) out.push(`${c.id}#${String(seed)} ${name}: S9 commit differs (${base.commit.split('\n')[0]} | ${r.commit.split('\n')[0]})`);
  }
  return out;
}

const M0_CASES = casesAt('M0');
const named = (id: string): ConstructiveCase => {
  const c = M0_CASES.find((x) => x.id === id);
  if (c === undefined) throw new Error(`representation: no constructive case ${id}`);
  return c;
};

describe('kerb and corridorUnion read the geometry and the ids, never the representation (§3.3, C-0207 (5), C-0230)', () => {
  it('the integration check’s repros: the same kerb and the same S9 commit on the loaded and start-re-drawn copies', { timeout: 120_000 }, () => {
    // integration-g10 B-1: on-segment-split#0 (the kerb's hole and the commit after a load), one-point-touch#1 (a
    // refusal on the original against a commit on the loaded copy), collinear-overlap-same#1 (the start re-draw alone),
    // rotated-rectangle#0 and hole-touch-outer-vertex#0 (kerb and plan after a load)
    const bad: string[] = [];
    for (const [id, seed] of [
      ['geom/on-segment-split', 0],
      ['geom/one-point-touch', 1],
      ['geom/collinear-overlap-same', 1],
      ['geom/rotated-rectangle', 0],
      ['geom/hole-touch-outer-vertex', 0],
    ] as const) {
      expect(constructiveSequence(named(id), seed)).not.toBeNull();
      bad.push(...differences(named(id), seed));
    }
    expect(bad).toEqual([]);
  });

  it('M0-k-02’s M0 constructive set at seeds 0 and 1: no arena’s band ops tell its copies apart', { timeout: 900_000 }, () => {
    const bad: string[] = [];
    let arenas = 0;
    for (const [i, c] of M0_CASES.entries()) {
      if (!FULL && i % 2 === 1) continue;
      for (const seed of FULL ? [0, 1] : [0]) {
        if (constructiveSequence(c, seed) === null) continue;
        arenas += 1;
        bad.push(...differences(c, seed));
      }
    }
    expect(arenas).toBeGreaterThanOrEqual(FULL ? 150 : 35);
    expect(bad).toEqual([]);
  });
});
