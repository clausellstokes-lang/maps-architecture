// M0-k-05's ng-faces.json loader tests (C-0101, C-0086; attachment B, N-21): a synthetic file in attachment B's form
// loads; a record lacking referenceBuild (a face or a hood), a non-integer coordinate, an unknown member, a seedLabel
// outside its pattern, a missing block-area, cut-length or per-cut field, a ring that is open, self-crossing or of the
// wrong orientation, and cut fields out of range are each refused naming the record and the field; a missing file
// stops naming it. The synthetic file is built in memory; the load path writes it to a temporary folder outside plat/.
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { loadNgFaces, loadNgFacesFile, NgFacesRefusal, ngFacesProblems } from '../../src/index.js';
import { synthetic } from './support.js';

type Mut = (f: Record<string, unknown> & { hoods: Record<string, unknown>[]; faces: (Record<string, unknown> & { cuts: Record<string, unknown>[] })[] }) => void;
const refused = (mut: Mut): string[] => {
  const f = JSON.parse(JSON.stringify(synthetic())) as Parameters<Mut>[0];
  mut(f);
  return ngFacesProblems(f);
};

let dir = '';
beforeAll(() => {
  dir = mkdtempSync(join(tmpdir(), 'plat-k05-ngfaces-'));
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

describe('loadNgFaces (C-0101, attachment B)', () => {
  it('a synthetic file in attachment B form loads, whole and as its faces', () => {
    expect(ngFacesProblems(synthetic())).toEqual([]);
    const p = join(dir, 'ng-faces.json');
    writeFileSync(p, JSON.stringify(synthetic()));
    const faces = loadNgFaces(p);
    expect(faces.map((f) => f.id)).toEqual([10, 11, 12]);
    expect(faces[0].cuts[0]).toEqual({ lengthCm: 18000, cornerT: 512, arrivalCdeg: 8850, fillet: 1, bends: 1 });
    expect(loadNgFacesFile(p).hoods.map((h) => h.template)).toEqual(['ring', 'area']);
  });

  it('a missing file stops naming it', () => {
    const p = join(dir, 'absent', 'ng-faces.json');
    expect(() => loadNgFaces(p)).toThrow(NgFacesRefusal);
    expect(() => loadNgFaces(p)).toThrow(`${p}: missing file`);
  });

  it('refuses a record lacking referenceBuild, naming the record and the field — a face and a hood', () => {
    expect(refused((f) => delete f.faces[1]['referenceBuild'])).toEqual(['faces[1] (id 11): referenceBuild missing']);
    expect(refused((f) => delete f.hoods[0]['referenceBuild'])).toContain('hoods[0] (id 1): referenceBuild missing');
    expect(refused((f) => (f.faces[2]['referenceBuild'] = '1.2.3'))).toEqual(["faces[2] (id 12): referenceBuild differs from the file's"]);
  });

  it('refuses a non-integer coordinate, naming the record and the field', () => {
    const p = refused((f) => ((f.faces[0]['ringCm'] as number[][])[1][0] = 21000.5));
    expect(p).toContain('faces[0].ringCm[1][0]: 21000.5 is not an integer');
    expect(p).toContain('faces[0] (id 10): ringCm a vertex is not an [x, y] pair of integer centimetres');
    // the declared scale is the one non-integer
    expect(refused((f) => (f['scaleDeclared'] = { mPerModelUnit: 0.351 }))).toEqual([]);
  });

  it('refuses an unknown member and a seedLabel outside its pattern', () => {
    expect(refused((f) => (f.faces[0]['name'] = 'x'))).toEqual(['faces[0] (id 10): unknown member name']);
    expect(refused((f) => (f['note'] = 'x'))).toEqual(['top: unknown member note']);
    expect(refused((f) => (f.hoods[1]['seedLabel'] = 'formula seed two'))).toEqual(['hoods[1] (id 2): seedLabel outside its pattern']);
    expect(refused((f) => (f.hoods[1]['capture'] = 'captures/ng/x'))).toEqual(['hoods[1] (id 2): capture is neither a capture stamp nor a research: label']);
  });

  it('refuses a missing block-area, cut-length or per-cut field, naming it', () => {
    expect(refused((f) => delete f.faces[0]['blockAreasCm2'])).toEqual(['faces[0] (id 10): blockAreasCm2 missing']);
    expect(refused((f) => delete (f.faces[0] as Record<string, unknown>)['cuts'])).toEqual(['faces[0] (id 10): cuts missing']);
    expect(refused((f) => delete f.faces[0].cuts[0]['lengthCm'])).toEqual(['faces[0] (id 10).cuts[0]: lengthCm missing']);
    for (const field of ['cornerT', 'arrivalCdeg', 'fillet', 'bends']) {
      expect(refused((f) => delete f.faces[0].cuts[1][field])).toContain(`faces[0] (id 10).cuts[1]: ${field} missing`);
    }
    expect(refused((f) => delete (f.faces[0]['classes'] as Record<string, unknown>)['curved'])).toEqual(['faces[0] (id 10).classes: curved missing']);
    expect(refused((f) => (f.faces[0]['blockAreasCm2'] = []))).toEqual(['faces[0] (id 10): blockAreasCm2 is not a non-empty list of positive integers']);
  });

  it('refuses cut fields out of range', () => {
    expect(refused((f) => (f.faces[0].cuts[0]['cornerT'] = 1001))).toEqual(['faces[0] (id 10).cuts[0]: cornerT out of range (0 – 1000 on a one-bend cut, else −1)']);
    expect(refused((f) => (f.faces[0].cuts[1]['cornerT'] = 500))).toEqual(['faces[0] (id 10).cuts[1]: cornerT out of range (0 – 1000 on a one-bend cut, else −1)']);
    expect(refused((f) => (f.faces[0].cuts[0]['arrivalCdeg'] = 9001))).toEqual(['faces[0] (id 10).cuts[0]: arrivalCdeg out of range (0 – 9000)']);
    expect(refused((f) => (f.faces[2].cuts[0]['fillet'] = 1))).toEqual(['faces[2] (id 12).cuts[0]: fillet 1 on a cut without exactly one bend']);
    expect(refused((f) => (f.faces[0].cuts[0]['fillet'] = true))).toEqual(['faces[0] (id 10).cuts[0]: fillet is not 0 or 1']);
    expect(refused((f) => (f.faces[0].cuts[0]['lengthCm'] = 0))).toEqual(['faces[0] (id 10).cuts[0]: lengthCm is not a positive integer']);
  });

  it('refuses rings that are open, not simple, or of the wrong orientation, and broken links', () => {
    expect(refused((f) => (f.faces[0]['ringCm'] as unknown[]).pop())).toEqual(['faces[0] (id 10): ringCm not closed (its last vertex is not its first)']);
    expect(refused((f) => (f.faces[1]['ringCm'] as unknown[]).pop())).toEqual(['faces[1] (id 11): ringCm not a ring of at least three vertices and its closing one']);
    expect(refused((f) => (f.faces[1]['ringCm'] = [[25000, 1000], [45000, 1000], [25000, 18000], [45000, 18000], [25000, 1000]]))).toEqual(['faces[1] (id 11): ringCm not simple (two edges meet)']);
    expect(refused((f) => (f.faces[1]['ringCm'] = [[25000, 1000], [35000, 18000], [45000, 1000], [25000, 1000]]))).toEqual(['faces[1] (id 11): ringCm clockwise (an outline or outer ring has positive area)']);
    expect(refused((f) => (f.faces[1]['ringCm'] = [[25000, 1000], [45000, 1000], [30000, 1000], [25000, 1000]]))).toEqual(['faces[1] (id 11): ringCm not simple (an edge folds back)']);
    expect(refused((f) => ((f.faces[0]['holesCm'] as unknown[][])[0] = [[5000, 5000], [8000, 5000], [8000, 8000], [5000, 8000], [5000, 5000]]))).toEqual([
      'faces[0] (id 10): holesCm[0] counter-clockwise (a hole has negative area)',
    ]);
    expect(refused((f) => (f.faces[2]['hood'] = 9))).toEqual(['faces[2] (id 12): hood names no hood']);
    expect(refused((f) => (f.faces[2]['template'] = 'ring'))).toEqual(["faces[2] (id 12): template differs from its hood's"]);
    expect(refused((f) => (f.faces[2]['id'] = 10))).toEqual(['faces[2] (id 10): id repeats an earlier face']);
    expect(refused((f) => (f['outlineKind'] = 2))).toEqual(['top: outlineKind is not 1']);
  });

  it('a refusal stops the load naming the file, the record and the field', () => {
    const f = synthetic() as unknown as { faces: Record<string, unknown>[] };
    delete f.faces[1]['referenceBuild'];
    const p = join(dir, 'bad.json');
    writeFileSync(p, JSON.stringify(f));
    expect(() => loadNgFaces(p)).toThrow(`${p}: faces[1] (id 11): referenceBuild missing`);
    f.faces[2]['template'] = 'street';
    writeFileSync(p, JSON.stringify(f));
    expect(() => loadNgFaces(p)).toThrow(`${p}: faces[1] (id 11): referenceBuild missing (and 1 more)`);
  });
});
