import { it } from 'vitest';
import { fieldTown, pass1 } from './support.js';
it('explore', { timeout: 300000 }, () => {
  for (const seed of [1, 2, 3]) {
    const ft = fieldTown(seed);
    const t0 = performance.now();
    const r = pass1(ft);
    const t1 = performance.now();
    for (const f of [r.prosperity, r.density, r.greenery]) {
      let mn = Infinity, mx = -Infinity, zeros = 0, ones = 0, land = 0;
      for (let i = 0; i < f.values.length; i++) if (r.land[i]) { land++; mn = Math.min(mn, f.unclamped[i]); mx = Math.max(mx, f.unclamped[i]); if (f.values[i] === 0) zeros++; if (f.values[i] === 1) ones++; }
      console.log(seed, f.field, 'cuts', f.bands.cuts.map((c) => c.toFixed(3)).join(','), 'mid', f.bands.middle, 'err', f.cutResult.errorCells, 'land', land, 'range', mn.toFixed(3), mx.toFixed(3), 'zeros', zeros, 'ones', ones, 'scale', f.chanceScale.toFixed(4), 'perBand', f.cutResult.perBand.join('/'));
    }
    console.log('report', JSON.stringify(r.report), 'ms', (t1 - t0).toFixed(1));
  }
});
