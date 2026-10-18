// The `ng-faces.json` loader (M0-k-05; C-0043, C-0086, C-0101; attachment B of `checks/M0-handoff-M1.md`, N-21):
// `loadNgFaces(path)` reads the file in schema `plat.ng-faces/1` exactly as attachment B states it — the seven top-level
// members and no other, hoods and faces with exactly their listed fields, `referenceBuild` one value on the top, every
// hood and every face, rings in integer centimetres closed and simple with the stated orientation (outlines and outer
// rings positive, holes negative), every number an integer but `scaleDeclared.mPerModelUnit`, the cut fields within
// their ranges — and refuses anything else naming the record and the field; a missing file stops it naming the file.
// M0-b-05b and M0-c-07b read NG's recorded shapes through it.
import { existsSync, readFileSync } from 'node:fs';
import type { NgTemplate } from '../metrics/doc.js';
import { BUILD_RE, CAPTURE_STAMP_RE, ID_RE, RESEARCH_LABEL_RE, SEMVER_RE } from './patterns.js';

export const NG_FACES_SCHEMA = 'plat.ng-faces/1';

/** A point in integer centimetres. */
export type NgPoint = [number, number];

/** A hood record (attachment B). */
export interface NgHood {
  id: number;
  referenceBuild: string;
  template: NgTemplate;
  seedLabel: string;
  capture: string;
  outlineCm: NgPoint[];
}

/** A recorded cut (attachment B): `cornerT` in thousandths (−1 unless one bend), `arrivalCdeg` in centidegrees. */
export interface NgCut {
  lengthCm: number;
  cornerT: number;
  arrivalCdeg: number;
  fillet: 0 | 1;
  bends: number;
}

/** A face record (attachment B). */
export interface NgFace {
  id: number;
  referenceBuild: string;
  hood: number;
  template: NgTemplate;
  classes: { holed: 0 | 1; cShaped: 0 | 1; triangular: 0 | 1; curved: 0 | 1; roundJoined: 0 | 1 };
  ringCm: NgPoint[];
  holesCm: NgPoint[][];
  blockAreasCm2: number[];
  cuts: NgCut[];
}

/** The whole file (attachment B). */
export interface NgFacesFile {
  schema: typeof NG_FACES_SCHEMA;
  referenceBuild: string;
  metricsVersion: string;
  scaleDeclared: { mPerModelUnit: number };
  outlineKind: 1;
  hoods: NgHood[];
  faces: NgFace[];
}

/** A refused record or field, or a missing file: the message names the file, the record and the field. */
export class NgFacesRefusal extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'NgFacesRefusal';
  }
}

const TOP = ['schema', 'referenceBuild', 'metricsVersion', 'scaleDeclared', 'outlineKind', 'hoods', 'faces'];
const HOOD = ['id', 'referenceBuild', 'template', 'seedLabel', 'capture', 'outlineCm'];
const FACE = ['id', 'referenceBuild', 'hood', 'template', 'classes', 'ringCm', 'holesCm', 'blockAreasCm2', 'cuts'];
const CLASSES = ['holed', 'cShaped', 'triangular', 'curved', 'roundJoined'];
const CUT = ['lengthCm', 'cornerT', 'arrivalCdeg', 'fillet', 'bends'];
const TEMPLATES: ReadonlySet<string> = new Set(['area', 'street', 'square', 'ring']);

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const isInt = (v: unknown): v is number => typeof v === 'number' && Number.isSafeInteger(v);

/** The members of `o` against an exact list: each missing one and each unknown one, named. */
function members(o: Record<string, unknown>, want: readonly string[], at: string, out: string[]): void {
  for (const m of want) if (!(m in o)) out.push(`${at}: ${m} missing`);
  for (const m of Object.keys(o)) if (!want.includes(m)) out.push(`${at}: unknown member ${m}`);
}

/** The sign of the cross product (b − a) × (c − a), exact for integers (BigInt beyond 2²⁵). */
function orient(a: NgPoint, b: NgPoint, c: NgPoint): number {
  const big = [a, b, c].some((p) => Math.abs(p[0]) > 2 ** 25 || Math.abs(p[1]) > 2 ** 25);
  if (!big) return Math.sign((b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]));
  const v = (BigInt(b[0]) - BigInt(a[0])) * (BigInt(c[1]) - BigInt(a[1])) - (BigInt(b[1]) - BigInt(a[1])) * (BigInt(c[0]) - BigInt(a[0]));
  return v > 0n ? 1 : v < 0n ? -1 : 0;
}

const onSeg = (a: NgPoint, b: NgPoint, p: NgPoint): boolean =>
  Math.min(a[0], b[0]) <= p[0] && p[0] <= Math.max(a[0], b[0]) && Math.min(a[1], b[1]) <= p[1] && p[1] <= Math.max(a[1], b[1]);

/** Do the closed segments ab and cd share a point? */
function segmentsMeet(a: NgPoint, b: NgPoint, c: NgPoint, d: NgPoint): boolean {
  const o1 = orient(a, b, c);
  const o2 = orient(a, b, d);
  const o3 = orient(c, d, a);
  const o4 = orient(c, d, b);
  if (o1 !== o2 && o3 !== o4) return true;
  if (o1 === 0 && onSeg(a, b, c)) return true;
  if (o2 === 0 && onSeg(a, b, d)) return true;
  if (o3 === 0 && onSeg(c, d, a)) return true;
  if (o4 === 0 && onSeg(c, d, b)) return true;
  return false;
}

/** Twice the shoelace area of a closed ring (exact for integers below 2²⁵; BigInt beyond). */
function area2Sign(r: readonly NgPoint[]): number {
  const big = r.some((p) => Math.abs(p[0]) > 2 ** 25 || Math.abs(p[1]) > 2 ** 25);
  if (!big) {
    let s = 0;
    for (let i = 0; i + 1 < r.length; i += 1) s += r[i][0] * r[i + 1][1] - r[i + 1][0] * r[i][1];
    return Math.sign(s);
  }
  let s = 0n;
  for (let i = 0; i + 1 < r.length; i += 1) s += BigInt(r[i][0]) * BigInt(r[i + 1][1]) - BigInt(r[i + 1][0]) * BigInt(r[i][1]);
  return s > 0n ? 1 : s < 0n ? -1 : 0;
}

/** Why a ring is refused (attachment B *Rings*), or null: `sign` 1 for an outline or outer ring, −1 for a hole. */
export function ngRingProblem(ring: unknown, sign: 1 | -1): string | null {
  if (!Array.isArray(ring) || ring.length < 4) return 'not a ring of at least three vertices and its closing one';
  for (const p of ring) if (!Array.isArray(p) || p.length !== 2 || !isInt(p[0]) || !isInt(p[1])) return 'a vertex is not an [x, y] pair of integer centimetres';
  const r = ring as NgPoint[];
  const n = r.length - 1;
  if (r[0][0] !== r[n][0] || r[0][1] !== r[n][1]) return 'not closed (its last vertex is not its first)';
  const seen = new Set<string>();
  for (let i = 0; i < n; i += 1) {
    const k = `${r[i][0]},${r[i][1]}`;
    if (seen.has(k)) return 'not simple (a vertex repeats)';
    seen.add(k);
  }
  for (let i = 0; i < n; i += 1) {
    for (let j = i + 1; j < n; j += 1) {
      const adjacent = j === i + 1 || (i === 0 && j === n - 1);
      if (adjacent) {
        // adjacent edges share their one vertex; they may not fold back onto each other (collinear, reversed)
        const [p, q, s] = j === i + 1 ? [r[i], r[i + 1], r[j + 1]] : [r[j], r[0], r[1]];
        if (orient(p, q, s) === 0 && (q[0] - p[0]) * (s[0] - q[0]) + (q[1] - p[1]) * (s[1] - q[1]) < 0) return 'not simple (an edge folds back)';
        continue;
      }
      if (segmentsMeet(r[i], r[i + 1], r[j], r[j + 1])) return 'not simple (two edges meet)';
    }
  }
  const s = area2Sign(r);
  if (s === 0) return 'zero area';
  if (s !== sign) return sign === 1 ? 'clockwise (an outline or outer ring has positive area)' : 'counter-clockwise (a hole has negative area)';
  return null;
}

/** Every number of the file but the declared scale is an integer (attachment B). */
function nonIntegers(v: unknown, at: string, out: string[]): void {
  if (typeof v === 'number') {
    if (!Number.isSafeInteger(v)) out.push(`${at}: ${String(v)} is not an integer`);
    return;
  }
  if (Array.isArray(v)) v.forEach((x, i) => nonIntegers(x, `${at}[${i}]`, out));
  else if (isObj(v)) for (const [k, x] of Object.entries(v)) if (!(at === 'scaleDeclared' && k === 'mPerModelUnit')) nonIntegers(x, at === '' ? k : `${at}.${k}`, out);
}

/** Every refusal of a parsed `ng-faces.json`, each naming the record and the field (attachment B; N-21). */
export function ngFacesProblems(v: unknown): string[] {
  const out: string[] = [];
  if (!isObj(v)) return ['top: not an object'];
  members(v, TOP, 'top', out);
  if ('schema' in v && v['schema'] !== NG_FACES_SCHEMA) out.push(`top: schema is not ${NG_FACES_SCHEMA}`);
  const build = v['referenceBuild'];
  if ('referenceBuild' in v && (typeof build !== 'string' || !BUILD_RE.test(build))) out.push('top: referenceBuild is not a build (attachment B pattern)');
  if ('metricsVersion' in v && (typeof v['metricsVersion'] !== 'string' || !SEMVER_RE.test(v['metricsVersion']))) out.push('top: metricsVersion is not n.n.n');
  const sc = v['scaleDeclared'];
  if ('scaleDeclared' in v) {
    if (!isObj(sc)) out.push('top: scaleDeclared is not an object');
    else {
      members(sc, ['mPerModelUnit'], 'scaleDeclared', out);
      const m = sc['mPerModelUnit'];
      if ('mPerModelUnit' in sc && !(typeof m === 'number' && Number.isFinite(m) && m > 0)) out.push('scaleDeclared: mPerModelUnit is not a positive number');
    }
  }
  if ('outlineKind' in v && v['outlineKind'] !== 1) out.push('top: outlineKind is not 1');
  nonIntegers(v, '', out);

  const hoodTemplate = new Map<number, string>();
  const hoods = v['hoods'];
  if ('hoods' in v && !Array.isArray(hoods)) out.push('top: hoods is not a list');
  if (Array.isArray(hoods)) {
    hoods.forEach((h, i) => {
      const at = isObj(h) && isInt(h['id']) ? `hoods[${i}] (id ${h['id']})` : `hoods[${i}]`;
      if (!isObj(h)) {
        out.push(`${at}: not an object`);
        return;
      }
      members(h, HOOD, at, out);
      if ('id' in h && !isInt(h['id'])) out.push(`${at}: id is not an integer`);
      else if (isInt(h['id'])) {
        if (hoodTemplate.has(h['id'])) out.push(`${at}: id repeats an earlier hood`);
        hoodTemplate.set(h['id'], String(h['template']));
      }
      if ('referenceBuild' in h && h['referenceBuild'] !== build) out.push(`${at}: referenceBuild differs from the file's`);
      if ('template' in h && (typeof h['template'] !== 'string' || !TEMPLATES.has(h['template']))) out.push(`${at}: template is not area, street, square or ring`);
      if ('seedLabel' in h && (typeof h['seedLabel'] !== 'string' || !ID_RE.test(h['seedLabel']))) out.push(`${at}: seedLabel outside its pattern`);
      const cap = h['capture'];
      if ('capture' in h && (typeof cap !== 'string' || !(CAPTURE_STAMP_RE.test(cap) || RESEARCH_LABEL_RE.test(cap)))) out.push(`${at}: capture is neither a capture stamp nor a research: label`);
      if ('outlineCm' in h) {
        const p = ngRingProblem(h['outlineCm'], 1);
        if (p !== null) out.push(`${at}: outlineCm ${p}`);
      }
    });
  }

  const faces = v['faces'];
  if ('faces' in v && !Array.isArray(faces)) out.push('top: faces is not a list');
  if (Array.isArray(faces)) {
    const ids = new Set<number>();
    faces.forEach((f, i) => {
      const at = isObj(f) && isInt(f['id']) ? `faces[${i}] (id ${f['id']})` : `faces[${i}]`;
      if (!isObj(f)) {
        out.push(`${at}: not an object`);
        return;
      }
      members(f, FACE, at, out);
      if ('id' in f && !isInt(f['id'])) out.push(`${at}: id is not an integer`);
      else if (isInt(f['id'])) {
        if (ids.has(f['id'])) out.push(`${at}: id repeats an earlier face`);
        ids.add(f['id']);
      }
      if ('referenceBuild' in f && f['referenceBuild'] !== build) out.push(`${at}: referenceBuild differs from the file's`);
      const hood = f['hood'];
      if ('hood' in f) {
        if (!isInt(hood) || !hoodTemplate.has(hood)) out.push(`${at}: hood names no hood`);
        else if ('template' in f && f['template'] !== hoodTemplate.get(hood)) out.push(`${at}: template differs from its hood's`);
      }
      if ('template' in f && (typeof f['template'] !== 'string' || !TEMPLATES.has(f['template']))) out.push(`${at}: template is not area, street, square or ring`);
      const cl = f['classes'];
      if ('classes' in f) {
        if (!isObj(cl)) out.push(`${at}: classes is not an object`);
        else {
          members(cl, CLASSES, `${at}.classes`, out);
          for (const c of CLASSES) if (c in cl && cl[c] !== 0 && cl[c] !== 1) out.push(`${at}: classes.${c} is not 0 or 1`);
        }
      }
      if ('ringCm' in f) {
        const p = ngRingProblem(f['ringCm'], 1);
        if (p !== null) out.push(`${at}: ringCm ${p}`);
      }
      const holes = f['holesCm'];
      if ('holesCm' in f) {
        if (!Array.isArray(holes)) out.push(`${at}: holesCm is not a list`);
        else
          holes.forEach((h, k) => {
            const p = ngRingProblem(h, -1);
            if (p !== null) out.push(`${at}: holesCm[${k}] ${p}`);
          });
      }
      const areas = f['blockAreasCm2'];
      if ('blockAreasCm2' in f && !(Array.isArray(areas) && areas.length > 0 && areas.every((a) => isInt(a) && a > 0))) out.push(`${at}: blockAreasCm2 is not a non-empty list of positive integers`);
      const cuts = f['cuts'];
      if ('cuts' in f) {
        if (!Array.isArray(cuts)) out.push(`${at}: cuts is not a list`);
        else
          cuts.forEach((c, k) => {
            const cat = `${at}.cuts[${k}]`;
            if (!isObj(c)) {
              out.push(`${cat}: not an object`);
              return;
            }
            members(c, CUT, cat, out);
            const bends = c['bends'];
            if ('bends' in c && !(isInt(bends) && bends >= 0)) out.push(`${cat}: bends is not a count`);
            if ('lengthCm' in c && !(isInt(c['lengthCm']) && c['lengthCm'] > 0)) out.push(`${cat}: lengthCm is not a positive integer`);
            const ct = c['cornerT'];
            if ('cornerT' in c && isInt(bends)) {
              if (bends === 1 ? !(isInt(ct) && ct >= 0 && ct <= 1000) : ct !== -1) out.push(`${cat}: cornerT out of range (0 – 1000 on a one-bend cut, else −1)`);
            }
            const ar = c['arrivalCdeg'];
            if ('arrivalCdeg' in c && !(isInt(ar) && ar >= 0 && ar <= 9000)) out.push(`${cat}: arrivalCdeg out of range (0 – 9000)`);
            const fl = c['fillet'];
            if ('fillet' in c && fl !== 0 && fl !== 1) out.push(`${cat}: fillet is not 0 or 1`);
            else if (fl === 1 && bends !== 1) out.push(`${cat}: fillet 1 on a cut without exactly one bend`);
          });
      }
    });
  }
  return out;
}

/** Reads and checks the whole file; throws `NgFacesRefusal` naming the file, the record and the field. */
export function loadNgFacesFile(path: string): NgFacesFile {
  if (!existsSync(path)) throw new NgFacesRefusal(`${path}: missing file`);
  let v: unknown;
  try {
    v = JSON.parse(readFileSync(path, 'utf8'));
  } catch (e) {
    throw new NgFacesRefusal(`${path}: not JSON (${(e as Error).message.slice(0, 120)})`);
  }
  const problems = ngFacesProblems(v);
  if (problems.length > 0) throw new NgFacesRefusal(`${path}: ${problems[0]}${problems.length > 1 ? ` (and ${problems.length - 1} more)` : ''}`);
  return v as NgFacesFile;
}

/** `loadNgFaces(path)` (C-0101): the face records of `ng-faces.json`, refused whole on any refusal (attachment B). */
export function loadNgFaces(path: string): NgFace[] {
  return loadNgFacesFile(path).faces;
}
