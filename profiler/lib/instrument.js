// Injected into every frame BEFORE any page script (draw pass only — it perturbs timing, so the
// profile pass never loads it). Records what the generator asks the browser to draw: per-method
// Canvas2D call counts, fill/stroke style + line-width histograms, fonts and label texts, path
// complexity, WebGL draw calls, Math.random usage, and an ordered draw log (layer order).
// Opt-in (record.mjs --vertices): the vertex list of every painted path → window.__rec.paths() → gen-N.paths.json.
(() => {
  if (window.__rec) return;
  const MAX_LOG = 60000, MAX_TEXTS = 600;
  // record.mjs --vertices replaces the marker object below with {"vertices":true,…}; every other injection keeps {}
  // (feature off: the vertex layer is not even installed, so the recorder behaves exactly as before).
  const OPTS = /*@OPTS@*/{};
  const VX = !!OPTS.vertices, MAXP = OPTS.maxPathVerts || 5000, MAXT = OPTS.maxTotalVerts || 4000000;
  const freshV = () => ({ paths: [], paints: 0, vertices: 0, skippedLong: 0, droppedTotal: 0, path2d: 0, nonFinite: 0, errors: 0 });
  let V = freshV();
  const fresh = () => ({
    t0: performance.now(),
    random: { count: 0, first: [] },
    canvas2d: {}, webgl: {},
    fillStyles: {}, strokeStyles: {}, lineWidths: {}, fonts: {}, lineJoins: {}, lineCaps: {}, dashes: {},
    texts: [], textCount: 0,
    pathSegs: { fill: {}, stroke: {} },
    canvases: {},
    log: [], logDropped: 0,
  });
  let S = fresh();
  const bump = (o, k, n = 1) => { o[k] = (o[k] || 0) + n; };
  const styleKey = (v) => (typeof v === 'string' ? v : (v && v.constructor ? `[${v.constructor.name}]` : String(v)));
  const bucket = (n) => (n <= 4 ? String(n) : n <= 8 ? '5-8' : n <= 16 ? '9-16' : n <= 64 ? '17-64' : n <= 256 ? '65-256' : '257+');

  const mr = Math.random;
  Math.random = function () { const v = mr(); S.random.count++; if (S.random.first.length < 32) S.random.first.push(v); return v; };

  const segs = new WeakMap();
  const P = window.CanvasRenderingContext2D && CanvasRenderingContext2D.prototype;
  if (P) {
    const pathOps = ['moveTo', 'lineTo', 'quadraticCurveTo', 'bezierCurveTo', 'arc', 'arcTo', 'rect', 'ellipse', 'closePath'];
    const plain = ['save', 'restore', 'setTransform', 'transform', 'translate', 'scale', 'rotate', 'clip', 'drawImage',
      'clearRect', 'putImageData', 'getImageData', 'createPattern', 'createLinearGradient', 'createRadialGradient', 'setLineDash'];
    const logOp = (ctx, op, extra) => {
      const c = ctx.canvas; const ck = c ? `${c.width}x${c.height}` : '?'; bump(S.canvases, ck);
      if (S.log.length < MAX_LOG) S.log.push([Math.round(performance.now() - S.t0), op, ck, ...extra]); else S.logDropped++;
    };
    for (const m of pathOps) {
      const o = P[m]; if (!o) continue;
      P[m] = function (...a) { bump(S.canvas2d, m); if (m !== 'closePath') segs.set(this, (segs.get(this) || 0) + 1); return o.apply(this, a); };
    }
    for (const m of plain) {
      const o = P[m]; if (!o) continue;
      P[m] = function (...a) {
        bump(S.canvas2d, m);
        if (m === 'setLineDash') bump(S.dashes, JSON.stringify(a[0]));
        if (m === 'drawImage') { const s = a[0]; logOp(this, 'drawImage', [s && s.width, s && s.height]); }
        return o.apply(this, a);
      };
    }
    const bp = P.beginPath;
    P.beginPath = function () { bump(S.canvas2d, 'beginPath'); segs.set(this, 0); return bp.apply(this, arguments); };
    const wrapPaint = (m, kind) => {
      const o = P[m]; if (!o) return;
      P[m] = function (...a) {
        bump(S.canvas2d, m);
        const n = m.endsWith('Rect') ? 1 : (segs.get(this) || 0);
        if (kind === 'fill') {
          const k = styleKey(this.fillStyle) + (this.globalAlpha !== 1 ? `@a${this.globalAlpha.toFixed(2)}` : '');
          bump(S.fillStyles, k); bump(S.pathSegs.fill, bucket(n)); logOp(this, m, [k, n]);
        } else {
          const k = styleKey(this.strokeStyle) + (this.globalAlpha !== 1 ? `@a${this.globalAlpha.toFixed(2)}` : '');
          bump(S.strokeStyles, k); bump(S.lineWidths, String(+this.lineWidth.toFixed(3)));
          bump(S.lineJoins, this.lineJoin); bump(S.lineCaps, this.lineCap);
          bump(S.pathSegs.stroke, bucket(n)); logOp(this, m, [k, n, +this.lineWidth.toFixed(3)]);
        }
        return o.apply(this, a);
      };
    };
    wrapPaint('fill', 'fill'); wrapPaint('fillRect', 'fill'); wrapPaint('stroke', 'stroke'); wrapPaint('strokeRect', 'stroke');
    for (const m of ['fillText', 'strokeText']) {
      const o = P[m]; if (!o) continue;
      P[m] = function (t, ...a) {
        bump(S.canvas2d, m); bump(S.fonts, this.font); S.textCount++;
        if (S.texts.length < MAX_TEXTS) S.texts.push([String(t), this.font, styleKey(m === 'fillText' ? this.fillStyle : this.strokeStyle)]);
        logOp(this, m, [String(t).slice(0, 40), this.font]);
        return o.call(this, t, ...a);
      };
    }
  }
  // ---- Opt-in vertex recorder (record.mjs --vertices). Installed as an OUTER layer over the wrappers above, so
  // with the flag off not one line of the recorder's behaviour changes. Per painted path it stores the ordered
  // vertex list in CANVAS PIXELS of the canvas being painted (each path-call argument transformed by the CTM that is
  // current at that call, exactly as Canvas2D itself does), plus style, raw lineWidth, the CTM at paint time (a stroke's
  // pixel width is lineWidth × √|det m|), the canvas, and the index of the matching entry in draw.json's rec.log.
  if (P && VX) {
    const r2 = (v) => Math.round(v * 100) / 100, r4 = (v) => Math.round(v * 10000) / 10000;
    const cids = new WeakMap(); let nextCid = 0;
    const cidOf = (c) => { if (!c) return -1; let id = cids.get(c); if (id === undefined) { id = nextCid++; cids.set(c, id); } return id; };
    const PS = new WeakMap();   // context → current path: subpaths in device px, closed flags, curve annotations
    const ps = (ctx) => { let p = PS.get(ctx); if (!p) { p = { subs: [], cur: null, start: null, n: 0, ver: 0, pv: -1, pi: -1, pV: null }; PS.set(ctx, p); } return p; };
    const fin = (a) => { for (let i = 0; i < a.length; i++) if (typeof a[i] === 'number' && !Number.isFinite(a[i])) return false; return true; };
    const dev = (m, x, y) => [r2(m.a * x + m.c * y + m.e), r2(m.b * x + m.d * y + m.f)];
    const push = (p, xy) => { if (p.n < MAXP) p.cur.v.push(xy[0], xy[1]); p.n++; };
    const open = (p, xy) => { p.cur = { v: [], z: 0 }; p.subs.push(p.cur); p.start = xy; push(p, xy); };
    // Canvas2D "ensure there is a subpath": after closePath()/rect() the path continues from that subpath's first point
    const ensure = (p, xy) => { if (p.cur) return; if (p.start) open(p, p.start); else open(p, xy); };
    const note = (p, kind, rec) => { (p.cur.x || (p.cur.x = [])).push([p.cur.v.length / 2 - 1, kind, ...rec]); };
    const touch = (p) => { p.ver++; };
    const VOPS = {
      beginPath() { const p = ps(this); p.subs = []; p.cur = null; p.start = null; p.n = 0; touch(p); },
      moveTo(x, y) { const p = ps(this); open(p, dev(this.getTransform(), x, y)); touch(p); },
      lineTo(x, y) {
        const p = ps(this); const xy = dev(this.getTransform(), x, y);
        if (!p.cur && !p.start) open(p, xy); else { ensure(p, xy); push(p, xy); }
        touch(p);
      },
      closePath() { const p = ps(this); if (p.cur) { p.cur.z = 1; p.cur = null; } touch(p); },
      quadraticCurveTo(cx, cy, x, y) {
        const p = ps(this); const m = this.getTransform(); const c = dev(m, cx, cy);
        ensure(p, c); push(p, dev(m, x, y)); note(p, 'q', c); touch(p);
      },
      bezierCurveTo(c1x, c1y, c2x, c2y, x, y) {
        const p = ps(this); const m = this.getTransform(); const c1 = dev(m, c1x, c1y); const c2 = dev(m, c2x, c2y);
        ensure(p, c1); push(p, dev(m, x, y)); note(p, 'c', [...c1, ...c2]); touch(p);
      },
      // arc/ellipse/arcTo: start and end points become vertices; the exact curve is kept as its raw arguments + CTM
      arc(x, y, r, a0, a1, ccw) {
        const p = ps(this); const m = this.getTransform();
        const s = dev(m, x + r * Math.cos(a0), y + r * Math.sin(a0));
        if (p.cur || p.start) { ensure(p, s); push(p, s); } else open(p, s);
        push(p, dev(m, x + r * Math.cos(a1), y + r * Math.sin(a1)));
        note(p, 'arc', [x, y, r, a0, a1, ccw ? 1 : 0, r4(m.a), r4(m.b), r4(m.c), r4(m.d), r4(m.e), r4(m.f)]); touch(p);
      },
      ellipse(x, y, rx, ry, rot, a0, a1, ccw) {
        const p = ps(this); const m = this.getTransform(); const cr = Math.cos(rot), sr = Math.sin(rot);
        const at = (a) => dev(m, x + rx * Math.cos(a) * cr - ry * Math.sin(a) * sr, y + rx * Math.cos(a) * sr + ry * Math.sin(a) * cr);
        const s = at(a0);
        if (p.cur || p.start) { ensure(p, s); push(p, s); } else open(p, s);
        push(p, at(a1));
        note(p, 'ellipse', [x, y, rx, ry, rot, a0, a1, ccw ? 1 : 0, r4(m.a), r4(m.b), r4(m.c), r4(m.d), r4(m.e), r4(m.f)]); touch(p);
      },
      arcTo(x1, y1, x2, y2, r) {
        const p = ps(this); const m = this.getTransform(); const c = dev(m, x1, y1);
        ensure(p, c); push(p, c); note(p, 'arcTo', [...dev(m, x2, y2), r, r4(Math.sqrt(Math.abs(m.a * m.d - m.b * m.c)))]); touch(p);
      },
      rect(x, y, w, h) {
        const p = ps(this); const m = this.getTransform();
        open(p, dev(m, x, y)); push(p, dev(m, x + w, y)); push(p, dev(m, x + w, y + h)); push(p, dev(m, x, y + h));
        p.cur.z = 1; p.cur = null; p.start = dev(m, x, y); touch(p);
      },
    };
    for (const m of Object.keys(VOPS)) {
      const inner = P[m]; if (!inner) continue; const rec = VOPS[m];
      P[m] = function (...a) { const r = inner.apply(this, a); try { if (fin(a)) rec.apply(this, a); else V.nonFinite++; } catch (e) { V.errors++; } return r; };
    }
    const paint = (ctx, op, a, li) => {
      V.paints++;
      const kind = op.startsWith('fill') ? 'fill' : 'stroke';
      const k = styleKey(kind === 'fill' ? ctx.fillStyle : ctx.strokeStyle) + (ctx.globalAlpha !== 1 ? `@a${ctx.globalAlpha.toFixed(2)}` : '');
      const m = ctx.getTransform(); const c = ctx.canvas;
      const o = { n: V.paints - 1, i: li, op, k, c: cidOf(c), cv: c ? `${c.width}x${c.height}` : '?', m: [r4(m.a), r4(m.b), r4(m.c), r4(m.d), r4(m.e), r4(m.f)] };
      if (kind === 'stroke') o.w = +ctx.lineWidth.toFixed(3);
      if (op === 'fillRect' || op === 'strokeRect') {
        const [x, y, w, h] = a;
        if (!fin(a)) o.skip = 3; else o.s = [{ v: [...dev(m, x, y), ...dev(m, x + w, y), ...dev(m, x + w, y + h), ...dev(m, x, y + h)], z: 1 }];
        o.nv = 4;
      } else if (typeof Path2D !== 'undefined' && a[0] instanceof Path2D) { o.path2d = 1; V.path2d++; }
      else {
        const p = ps(ctx); o.nv = p.n;
        if (p.pv === p.ver && p.pV === V && p.pi >= 0) o.same = p.pi;                   // same path painted again (fill + stroke)
        else if (p.n > MAXP) { o.skip = 1; V.skippedLong++; }
        else if (V.vertices + p.n > MAXT) { o.skip = 2; V.droppedTotal++; }
        else { o.s = p.subs.map((s) => (s.x ? { v: s.v.slice(), z: s.z, x: s.x.slice() } : { v: s.v.slice(), z: s.z })); V.vertices += p.n; }
        p.pv = p.ver; p.pi = V.paths.length; p.pV = V;
      }
      V.paths.push(o);
    };
    for (const m of ['fill', 'stroke', 'fillRect', 'strokeRect']) {
      const inner = P[m]; if (!inner) continue;
      P[m] = function (...a) {
        const before = S.log.length; const r = inner.apply(this, a);
        try { paint(this, m, a, S.log.length > before ? S.log.length - 1 : -1); } catch (e) { V.errors++; }
        return r;
      };
    }
  }
  for (const G of [window.WebGLRenderingContext, window.WebGL2RenderingContext]) {
    const W = G && G.prototype; if (!W) continue;
    for (const m of ['drawArrays', 'drawElements', 'texImage2D', 'texSubImage2D', 'bufferData', 'useProgram', 'clear']) {
      const o = W[m]; if (!o) continue;
      W[m] = function (...a) { bump(S.webgl, m); return o.apply(this, a); };
    }
  }
  window.__rec = {
    snapshot: () => JSON.parse(JSON.stringify(S)),
    reset: () => { S = fresh(); if (VX) V = freshV(); },
    // --vertices only: gen-N.paths.json as one JSON string (format documented in profiler/README.md)
    paths: () => (VX ? JSON.stringify({
      format: 'paths/1',
      coords: 'canvas pixels of the painted canvas: each path-call argument transformed by the CTM current at that call',
      fields: 'n paint seq | i draw.json rec.log index (-1 = log full) | op | k style (as in the log) | w raw lineWidth (stroke; px = w*sqrt|ad-bc| of m) | '
        + 'c canvas id | cv canvas WxH | m CTM at paint [a,b,c,d,e,f] | nv vertices | s subpaths [{v:[x0,y0,x1,y1,…], z:1 if closed, x:[[vertexIdx, q|c|arc|ellipse|arcTo, …args]]}] | '
        + 'same: index of the record whose identical path this op paints again | skip: 1 over maxPathVerts, 2 over maxTotalVerts, 3 non-finite rect | path2d: painted a Path2D (not recorded)',
      caps: { maxPathVerts: MAXP, maxTotalVerts: MAXT },
      counts: { paints: V.paints, records: V.paths.length, vertices: V.vertices, skippedLong: V.skippedLong, droppedTotal: V.droppedTotal,
        path2d: V.path2d, nonFinite: V.nonFinite, errors: V.errors },
      paths: V.paths,
    }) : null),
    dom: () => ({
      canvases: [...document.querySelectorAll('canvas')].map((c) => ({ w: c.width, h: c.height, cssW: c.clientWidth, cssH: c.clientHeight })),
      svgs: document.querySelectorAll('svg').length,
      svgNodes: document.querySelectorAll('svg *').length,
    }),
  };
})();
