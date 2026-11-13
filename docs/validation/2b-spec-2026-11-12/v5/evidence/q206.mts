// Q206 diagnosis probe (read-only on the arena it builds): tileRings on G1's case, then with ring 1 moved so that its
// corner (-1119, -8002) stands 30 cm INSIDE ring 2's edge, and 30 cm farther OUTSIDE it (past attractCm).
import { tileRings } from '/home/user/maps-scratch/2b-v5/tree/plat/packages/kernel/src/arr/tileRings.ts';
type P = { x: number; y: number };
const R: P[][] = [[{"x":-7564,"y":-16189},{"x":-1992,"y":-16189},{"x":-1992,"y":-11129},{"x":-7564,"y":-11129}],[{"x":-6691,"y":-13062},{"x":-1119,"y":-13062},{"x":-1119,"y":-8002},{"x":-6691,"y":-8002}],[{"x":7904,"y":-21384},{"x":-5526,"y":-1523},{"x":-29442,"y":-3222},{"x":-39928,"y":-24784},{"x":-26498,"y":-44645},{"x":-2582,"y":-42946}],[{"x":-42017,"y":-9693},{"x":-47175,"y":-12919},{"x":-47868,"y":-18964},{"x":-43574,"y":-23274},{"x":-37527,"y":-22605},{"x":-34281,"y":-17460},{"x":-36279,"y":-11713}]];
const a = R[2][0], b = R[2][1], c = { x: -1119, y: -8002 };
const L = Math.hypot(b.x - a.x, b.y - a.y);
const signed = ((b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) / L; // > 0: left of a→b (ring 2 is ccw? see sign)
let area = 0; const r2 = R[2]; for (let i = 0; i < r2.length; i++) area += r2[i].x * r2[(i + 1) % r2.length].y - r2[(i + 1) % r2.length].x * r2[i].y;
console.log('ring 2 area2 sign', Math.sign(area), 'corner signed distance from edge a→b', signed.toFixed(2), 'cm');
// the unit normal pointing to the left of a→b
const nx = -(b.y - a.y) / L, ny = (b.x - a.x) / L;
const shift = (d: number): P[][] => { const dx = Math.round(nx * d), dy = Math.round(ny * d); return R.map((r, i) => (i === 1 ? r.map((q) => ({ x: q.x + dx, y: q.y + dy })) : r)); };
const show = (tag: string, rings: P[][]): void => {
  const t = tileRings(rings as never);
  const w = t.ok ? t.warnings : (t as { warnings?: unknown }).warnings;
  console.log(tag, t.ok ? `ok: pieces per ring ${JSON.stringify(t.value.map((x) => x.length))}` : `refused ${t.code} ${t.detail} ring ${String((t as { ring?: number }).ring)} at ${JSON.stringify((t as { at?: P }).at)}`, 'warnings', JSON.stringify(w));
};
show('G1 case (corner 21.5 cm off the edge):', R);
// move ring 1 along the normal so the corner is 30 cm on the inside, then 30 cm farther on the outside
const inside = Math.sign(area) > 0 ? 1 : -1; // ring 2's interior is to the left of its ccw edges
for (const d of [51.46, 30, 21.46, 10, 4, -4, -10, -30]) show(`ring 1 moved ${d} cm along the inward normal (corner then ${(d - 21.46).toFixed(2)} cm from the edge, + inside):`, shift(d));
