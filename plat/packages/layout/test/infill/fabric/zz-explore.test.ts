import { describe, expect, it } from 'vitest';
import { runS8 } from '../../../src/index.js';
import { twoDistricts } from './support.js';

describe('explore', () => {
  it('runs', () => {
    const f = twoDistricts();
    const t0 = Date.now();
    const r = runS8(f.input, { report: undefined } as never);
    const dt = Date.now() - t0;
    if (!r.ok) throw new Error(`${r.code} ${r.detail}`);
    const rep = r.value.infill.report;
    console.log('ms', dt, 'refused', JSON.stringify(rep.refused));
    for (const d of rep.districts) {
      const outcomes: Record<string, number> = {};
      for (const fc of d.faces) outcomes[fc.outcome] = (outcomes[fc.outcome] ?? 0) + 1;
      const rungs: Record<string, number> = {};
      for (const ru of d.rungs) { const k = `${ru.rung}:${ru.outcome}:${ru.why ?? ''}`; rungs[k] = (rungs[k] ?? 0) + 1; }
      console.log(d.district, 'blocks', d.blocks, 'lanes', d.lanes, 'p', d.p.toFixed(3), 'work', JSON.stringify(d.work), 'limits', JSON.stringify(d.limits), JSON.stringify(outcomes), JSON.stringify(rungs), 'residue', d.residueShare.toFixed(3), JSON.stringify(d.warnings));
    }
    console.log('lanes', r.value.lanes.length, 'widths', r.value.lanes.slice(0, 8).map((w) => `${w.class}:${String(w.width)}`).join(' '));
    console.log('portals', r.value.infill.seams.map((s) => s.portals.length).join(','), 'junctions', r.value.infill.junctions.length);
    const deep = r.value.blocks.filter((b) => b.depthClass === 'deep').map((b) => b.interior);
    console.log('deep', deep.length, JSON.stringify(deep));
    expect(rep.refused.length).toBe(0);
  });
});
