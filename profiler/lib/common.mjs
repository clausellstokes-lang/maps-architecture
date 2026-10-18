import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

export const HERE = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
export const ROOT = path.dirname(HERE);
export const CHROME = process.env.CHROME_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const UA_FETCH = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36';

// regen: how a fresh generation is triggered inside an already-loaded generator.
//   key:<Key>  press a keyboard key;  reload  navigate again (with ?seed=… when --seed is given)
export const TARGETS = {
//   marker: console line the build prints once per generation — idle detection will not fire before it shows up
  mfcg: { itch: 'https://watabou.itch.io/medieval-fantasy-city-generator', regen: 'key:Enter', marker: 'buildGeometry \\d+', label: 'Medieval Fantasy City Generator (watabou)' },
  village: { itch: 'https://watabou.itch.io/village-generator', regen: 'key:Enter', marker: 'Legend\\.hx:\\d+: Buildings', label: 'Village Generator (watabou)' },
  neighbourhood: { itch: 'https://watabou.itch.io/neighbourhood', regen: 'key:Enter', marker: 'Hood\\.hx:\\d+: \\d+', label: 'Neighbourhood (watabou)' },
  // manor prints NO per-generation console line and takes no URL parameters (?seed= is ignored; the URL never changes),
  // so there is no marker: a generation counts as finished once the network has drained, a canvas exists and the main
  // thread stays quiet (waitIdle). Enter = context-menu "New building" (generates synchronously inside the key handler).
  manor: { itch: 'https://watabou.itch.io/fantasy-manor', regen: 'key:Enter', label: 'Fantasy Manor (watabou)' },
  // dwellings prints `House.hx:41: <seed>` once per generation. The marker matters for reloads: on a second navigation in
  // the same browser Lime waits ~3 s for its web fonts before starting the app, and without the marker the idle detector
  // settles on the quiet blank page before the house exists (captures/dwellings/_probes/probe-seed-nomarker.log).
  dwellings: { itch: 'https://watabou.itch.io/dwellings', regen: 'key:Enter', marker: 'House\\.hx:\\d+: \\d+', label: 'Dwellings (watabou; floor plans, Haxe/OpenFL)' },
  ftg: { url: 'https://www.fantasytowngenerator.com/', manual: true, label: 'Fantasy Town Generator (server-side generation; ONE new settlement per IP per day)' },
};

/** itch.io hosts each HTML build at html-classic.itch.zone/html/<buildId>/…; the id changes on every upload. */
export async function resolveTargetUrl(name) {
  const t = TARGETS[name];
  if (!t) throw new Error(`unknown target ${name}; known: ${Object.keys(TARGETS).join(', ')}`);
  if (t.url) return t.url;
  const html = await (await fetch(t.itch, { headers: { 'User-Agent': UA_FETCH } })).text();
  const m = html.match(/https:\/\/html-classic\.itch\.zone\/html\/\d+\/[^"'&\s]*index\.html/);
  if (!m) throw new Error(`could not find the embedded build url on ${t.itch}`);
  return m[0];
}

export function parseArgs(argv, defaults = {}) {
  const out = { _: [], ...defaults };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--')) {
      const [k, v] = a.slice(2).split('=');
      if (v !== undefined) out[k] = v;
      else if (i + 1 < argv.length && !argv[i + 1].startsWith('--')) out[k] = argv[++i];
      else out[k] = true;
    } else out._.push(a);
  }
  return out;
}

export const stamp = () => new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const writeJson = (p, o) => fs.writeFileSync(p, JSON.stringify(o, null, 1));

export async function launch({ headful = false, userDataDir, port, width = 1500, height = 1100 } = {}) {
  const args = [
    `--window-size=${width},${height + 90}`, '--no-first-run', '--no-default-browser-check', '--disable-extensions',
    '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows',
    '--enable-precise-memory-info', '--ignore-gpu-blocklist', '--enable-unsafe-swiftshader',
  ];
  if (port) args.push(`--remote-debugging-port=${port}`);
  return puppeteer.launch({
    executablePath: CHROME, headless: !headful, userDataDir, args,
    defaultViewport: { width, height, deviceScaleFactor: 1 }, protocolTimeout: 600000,
  });
}

/**
 * Stream everything the page does on the wire + console to disk as it happens (so a crash or a
 * one-shot generation can never lose the payload): network/index.jsonl + network/bodies/*, console.jsonl.
 */
export async function attachRecorders(page, outDir, { tag = '', intercept = null } = {}) {
  const netDir = path.join(outDir, 'network'); const bodyDir = path.join(netDir, 'bodies');
  fs.mkdirSync(bodyDir, { recursive: true });
  const idx = fs.createWriteStream(path.join(netDir, 'index.jsonl'), { flags: 'a' });
  const con = fs.createWriteStream(path.join(outDir, 'console.jsonl'), { flags: 'a' });
  const cdp = await page.createCDPSession();
  await cdp.send('Network.enable', { maxTotalBufferSize: 512 * 1024 * 1024, maxResourceBufferSize: 256 * 1024 * 1024 });
  const reqs = new Map(); let seq = 0; const lines = [];
  cdp.on('Network.requestWillBeSent', (e) => {
    reqs.set(e.requestId, { url: e.request.url, method: e.request.method, type: e.type, ts: e.wallTime,
      postData: e.request.postData, reqHeaders: redact(e.request.headers), frameId: e.frameId });
  });
  cdp.on('Network.responseReceived', (e) => {
    const r = reqs.get(e.requestId); if (!r) return;
    Object.assign(r, { status: e.response.status, mime: e.response.mimeType, type: e.type,
      respHeaders: redact(e.response.headers), fromCache: e.response.fromDiskCache || false });
  });
  const finish = async (e, failed) => {
    const r = reqs.get(e.requestId); if (!r) return; reqs.delete(e.requestId);
    const rec = { tag, n: ++seq, ...r, encodedBytes: e.encodedDataLength, failed: failed ? e.errorText : undefined };
    if (!failed && !/^data:/.test(r.url)) {
      try {
        const { body, base64Encoded } = await cdp.send('Network.getResponseBody', { requestId: e.requestId });
        const buf = Buffer.from(body, base64Encoded ? 'base64' : 'utf8');
        const ext = (r.mime || '').includes('json') ? '.json' : (r.mime || '').includes('javascript') ? '.js'
          : (r.mime || '').includes('html') ? '.html' : (r.mime || '').includes('css') ? '.css'
          : (r.mime || '').includes('svg') ? '.svg' : (r.mime || '').includes('png') ? '.png' : '.bin';
        rec.bodyFile = `${String(seq).padStart(4, '0')}-${crypto.createHash('sha1').update(r.url).digest('hex').slice(0, 8)}${ext}`;
        rec.bodyBytes = buf.length; rec.bodySha1 = crypto.createHash('sha1').update(buf).digest('hex');
        fs.writeFileSync(path.join(bodyDir, rec.bodyFile), buf);
      } catch (err) { rec.bodyError = String(err.message || err).slice(0, 120); }
    }
    idx.write(JSON.stringify(rec) + '\n');
  };
  // Bodies that the page consumes as a stream (FTG pipes its gzip'd layout into a WASM decoder) come back EMPTY
  // from Network.getResponseBody, so matching URLs are additionally paused at the response stage and read there.
  if (intercept && intercept.length) {
    const fcdp = await page.createCDPSession();
    await fcdp.send('Fetch.enable', { patterns: intercept.map((urlPattern) => ({ urlPattern, requestStage: 'Response' })) });
    fcdp.on('Fetch.requestPaused', async (e) => {
      try {
        if (e.responseStatusCode && e.request.method !== 'OPTIONS') {
          const { body, base64Encoded } = await fcdp.send('Fetch.getResponseBody', { requestId: e.requestId });
          const buf = Buffer.from(body, base64Encoded ? 'base64' : 'utf8');
          const looksJson = /^[\s]*[\[{"]/.test(buf.subarray(0, 40).toString('utf8'));
          const file = `intercept-${String(++seq).padStart(4, '0')}-${crypto.createHash('sha1').update(e.request.url).digest('hex').slice(0, 8)}${looksJson ? '.json' : '.bin'}`;
          fs.writeFileSync(path.join(bodyDir, file), buf);
          idx.write(JSON.stringify({ tag, intercepted: true, n: seq, url: e.request.url, method: e.request.method, status: e.responseStatusCode, bodyFile: file, bodyBytes: buf.length }) + '\n');
        }
      } catch (err) { idx.write(JSON.stringify({ tag, intercepted: true, url: e.request.url, bodyError: String(err.message || err).slice(0, 160) }) + '\n'); }
      await fcdp.send('Fetch.continueRequest', { requestId: e.requestId }).catch(() => {});
    });
  }
  cdp.on('Network.loadingFinished', (e) => finish(e, false));
  cdp.on('Network.loadingFailed', (e) => finish(e, true));
  cdp.on('Network.webSocketFrameReceived', (e) => idx.write(JSON.stringify({ tag, ws: 'recv', requestId: e.requestId, data: e.response.payloadData.slice(0, 200000) }) + '\n'));
  cdp.on('Network.webSocketFrameSent', (e) => idx.write(JSON.stringify({ tag, ws: 'sent', requestId: e.requestId, data: e.response.payloadData.slice(0, 200000) }) + '\n'));
  page.on('console', (m) => { lines.push(m.text()); con.write(JSON.stringify({ tag, t: Date.now(), type: m.type(), text: m.text() }) + '\n'); });
  page.on('pageerror', (e) => con.write(JSON.stringify({ tag, t: Date.now(), type: 'pageerror', text: String(e) }) + '\n'));
  return { cdp, close: () => { idx.end(); con.end(); }, inflight: () => reqs.size, lines };
}

// Auth material never belongs in a capture that may be shared.
function redact(h = {}) {
  const o = {};
  for (const [k, v] of Object.entries(h)) o[k] = /^(authorization|cookie|set-cookie|x-amz-security-token|x-api-key)$/i.test(k) ? '[redacted]' : v;
  return o;
}

/**
 * Generation-finished detector: main-thread script time (CDP Performance metrics) must stay under
 * `quietMs` per poll for `quietPolls` consecutive polls. Returns the timeline it observed.
 */
export async function waitIdle(cdp, { minMs = 1200, maxMs = 180000, pollMs = 200, quietMs = 12, quietPolls = 6, ready = null, readyTimeoutMs = 45000 } = {}) {
  await cdp.send('Performance.enable').catch(() => {});
  const read = async () => {
    const { metrics } = await cdp.send('Performance.getMetrics');
    const g = (n) => (metrics.find((m) => m.name === n) || {}).value || 0;
    return { script: g('ScriptDuration') * 1000, task: g('TaskDuration') * 1000, heap: g('JSHeapUsedSize') };
  };
  const t0 = Date.now(); let prev = await read(); let quiet = 0; let readyAt; const timeline = [];
  while (Date.now() - t0 < maxMs) {
    await sleep(pollMs);
    const cur = await read(); const dScript = cur.script - prev.script; const dTask = cur.task - prev.task;
    timeline.push({ t: Date.now() - t0, dScript: +dScript.toFixed(1), dTask: +dTask.toFixed(1), heapMB: +(cur.heap / 1048576).toFixed(1) });
    // `ready` gates the verdict (network drained, canvas present, generation marker seen …) so a quiet gap
    // while assets download is never mistaken for "generation finished".
    const isReady = !ready || Date.now() - t0 > readyTimeoutMs || await ready();
    if (!ready || isReady) readyAt ??= Date.now() - t0;
    quiet = dScript < quietMs && isReady ? quiet + 1 : 0; prev = cur;
    if (quiet >= quietPolls && Date.now() - t0 >= minMs) return { settled: true, ms: Date.now() - t0, readyAtMs: readyAt, readyTimedOut: !!ready && readyAt >= readyTimeoutMs, timeline };
  }
  return { settled: false, ms: Date.now() - t0, readyAtMs: readyAt, timeline };
}
