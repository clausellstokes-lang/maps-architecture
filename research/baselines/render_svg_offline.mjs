#!/usr/bin/env node
/**
 * research/baselines/render_svg_offline.mjs -- rasterise stored SVG files in headless Chrome WITH THE NETWORK DISABLED
 * (M-1 work item W-08; docs/calibration/M-1-plan.md section 2, row W-08; ruling R-47 (c); record
 * docs/calibration/E08-mfcg-renders.md). Research side only; our own code. It reads the SVG files named in a job list and
 * writes PNG files and one render-log line per browser session. It touches no site: a stored SVG may name an outside
 * resource, and no contact outside plan section 5 is allowed, so neither the page nor the browser reaches a network.
 *
 *   node research/baselines/render_svg_offline.mjs --jobs <jobs.json> --log <render-log.jsonl> --session <id>
 *        --profile <scratch user-data-dir> --netlog <scratch file.json> [--chrome <path>] [--control]
 *   --control  after the jobs, a positive control of the instrument: a second page, with interception off, asks for one
 *              image at a reserved name that can never resolve (the .invalid domain); the proxy and the resolver rules
 *              stop it inside the machine, and the NetLog counters must count it (W-08 runs it as its own session)
 *   jobs.json: [{ "id": "...", "svg": "<path>", "out": "<png path>", "mode": "map", "dpr": 1 }, ...]
 *   mode  map       labels and furniture off (V12 section 3.9.2's panel convention): every group the SVG draws after its
 *                   first group inside the root group -- the scaled map group -- is hidden (on MFCG's exports: the grid,
 *                   the scale bar, the compass, the labels and the title)
 *         nolabels  the SVG's text elements hidden, everything else drawn
 *         exported  everything drawn as exported (labels in a fallback face: the imported web font is never fetched)
 *
 * How the network is kept off (the log proves the result, not the intent):
 *   1. the SVG's outside references are removed before the page is built (each removal counted), and the prepared
 *      markup is scanned for any reference left (href / url() / @import / image / foreignObject / script / embeds / a URL
 *      other than the SVG and XLink namespaces); a job with one left is refused, not rendered;
 *   2. the page is built with setContent on about:blank (no navigation, no file load);
 *   3. every request the page would make is intercepted and aborted, and the page is put in offline mode;
 *   4. the browser: a fresh scratch profile whose preferences turn sign-in, Safe Browsing, suggestions, prediction and
 *      translation off; the pipe transport (no debugging port); background networking, component updates, sync, pings,
 *      domain reliability, field-trial configs and a list of service features off; every Google service URL the browser
 *      knows a switch for pointed at a closed port on the loopback address (127.0.0.1:9); every host name resolving to
 *      nothing (--host-resolver-rules, the loopback literal excluded); every request routed through a proxy at that
 *      closed loopback port (so an IP literal fails too);
 *   5. Chrome writes its own NetLog for the whole browser process (--log-net-log, kept in scratch: it holds the machine's
 *      addresses, so it never enters the project); after the browser closes it is parsed, and the log line records:
 *        urlRequestsNetwork   URL requests on a network scheme to any host other than the loopback address
 *        urlRequestsLoopback  the same to the loopback address (the browser's own services, aimed at the closed port)
 *        hostResolutionsNamed host resolutions of any name other than the loopback literal
 *        tcpConnectsOutside   TCP connects and connect attempts to any address other than loopback
 *        bytesSentOutside     bytes sent on any socket whose peer is not loopback (TCP or UDP)
 *        udpConnects          UDP sockets connected (Chrome's IPv6 route probe: a connect() sends no datagram)
 *      W-08's checker requires urlRequestsNetwork, hostResolutionsNamed, tcpConnectsOutside, bytesSentOutside and the
 *      page's own requests to be 0, and every job's outside references left to be 0.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { CHROME, parseArgs } from '../../profiler/lib/common.mjs';
import puppeteer from '../../profiler/node_modules/puppeteer-core/lib/puppeteer/puppeteer-core.js';

const args = parseArgs(process.argv.slice(2));
for (const k of ['jobs', 'log', 'session', 'profile', 'netlog']) if (!args[k]) { console.error(`missing --${k}`); process.exit(2); }
const jobs = JSON.parse(fs.readFileSync(args.jobs, 'utf8'));
const sha = (b) => crypto.createHash('sha256').update(b).digest('hex');
const NET_SCHEME = /^(https?|wss?|ftp):/i;
const LOOP = '127.0.0.1:9';
const HIDE = { map: 'svg>g>g~g{display:none}', nolabels: 'svg text{display:none}', exported: '' };
const isLoopHost = (h) => /^(127\.0\.0\.1|localhost|\[::1\]|::1)(:\d+)?$/i.test(h || '');
const isLoopAddr = (a) => /^(127\.0\.0\.1|\[::1\])(:\d+)?$/.test(a || '');

/** remove outside references; return the prepared markup and the counts */
function prepare(text) {
  let t = text.replace(/^﻿?<\?xml[^>]*\?>\s*/, '');
  let removedImports = 0;
  t = t.replace(/@import\s+(?:url\(\s*)?["']?[^"');]*["']?\s*\)?[^;]*;/gi, () => { removedImports++; return ''; });
  const left = [];
  const probes = [
    [/\b(?:xlink:)?href\s*=\s*["'](?!#)/gi, 'href'], [/url\(\s*["']?(?!#)/gi, 'url()'], [/@import/gi, '@import'],
    [/<image\b/gi, 'image'], [/<foreignObject\b/gi, 'foreignObject'], [/<script\b/gi, 'script'],
    [/<(?:iframe|object|embed|link|use)\b[^>]*\bhref\s*=\s*["'](?!#)/gi, 'embed'],
  ];
  for (const [re, kind] of probes) { const m = t.match(re); if (m) left.push({ kind, n: m.length }); }
  const urls = (t.match(/[a-z][a-z0-9+.-]*:\/\/[^\s"'<>)]+/gi) || [])
    .filter((u) => u !== 'http://www.w3.org/2000/svg' && u !== 'http://www.w3.org/1999/xlink');
  if (urls.length) left.push({ kind: 'url', n: urls.length });
  const W = Number((t.match(/<svg\b[^>]*\bwidth="([\d.]+)"/) || [])[1]);
  const H = Number((t.match(/<svg\b[^>]*\bheight="([\d.]+)"/) || [])[1]);
  return { markup: t, removedImports, left, W, H };
}

const loopUrl = `http://${LOOP}/`;
const flags = [
  '--no-first-run', '--no-default-browser-check', '--disable-extensions', '--disable-default-apps', '--disable-sync',
  '--disable-background-networking', '--disable-component-update', '--disable-domain-reliability', '--no-pings',
  '--disable-client-side-phishing-detection', '--disable-breakpad', '--metrics-recording-only', '--no-service-autorun',
  '--disable-field-trial-config', '--disable-search-engine-choice-screen',
  '--disable-features=MediaRouter,DialMediaRouteProvider,OptimizationHints,OptimizationHintsFetching,OptimizationGuideModelDownloading,OptimizationTargetPrediction,OnDeviceModelService,Translate,AutofillServerCommunication,CertificateTransparencyComponentUpdater,InterestFeedContentSuggestions,NetworkTimeServiceQuerying,PrivacySandboxSettings4,DiceWebSigninInterception,LensOverlay,GlicRollout,Glic,PushMessaging,HappyEyeballsV3,UseDnsHttpsSvcb,AsyncDns,DnsOverHttps,SafeBrowsingHashPrefixRealTimeLookups,ChromeWhatsNewUI,SegmentationPlatform,AccountConsistency',
  `--gcm-checkin-url=${loopUrl}`, `--gcm-registration-url=${loopUrl}`, `--variations-server-url=${loopUrl}`,
  `--component-updater=url-source=${loopUrl}`, `--gaia-url=${loopUrl}`, `--google-base-url=${loopUrl}`,
  `--google-apis-url=${loopUrl}`, `--lso-url=${loopUrl}`, `--sync-url=${loopUrl}`,
  '--host-resolver-rules=MAP * ~NOTFOUND, EXCLUDE 127.0.0.1', `--proxy-server=${LOOP}`, '--proxy-bypass-list=<-loopback>',
  '--use-mock-keychain', '--password-store=basic', '--hide-scrollbars', '--font-render-hinting=none',
  `--log-net-log=${path.resolve(args.netlog)}`, '--net-log-capture-mode=Default',
];
const PREFS = { signin: { allowed: false, allowed_on_next_startup: false }, safebrowsing: { enabled: false, enhanced: false },
  search: { suggest_enabled: false }, alternate_error_pages: { enabled: false }, net: { network_prediction_options: 2 },
  translate: { enabled: false }, browser: { has_seen_welcome_page: true } };

function netlogCounts(file) {
  let txt = fs.readFileSync(file, 'utf8').trim();
  let doc;
  try { doc = JSON.parse(txt); } catch {
    txt = txt.replace(/,\s*$/, '');
    try { doc = JSON.parse(txt + ']}'); } catch { doc = JSON.parse(txt + '}'); }
  }
  const names = Object.fromEntries(Object.entries(doc.constants.logEventTypes).map(([k, v]) => [v, k]));
  const out = { events: (doc.events || []).length, urlRequestsNetwork: 0, urlRequestsLoopback: 0, urlRequestsOther: 0,
    otherSchemes: {}, loopbackPaths: {}, hostResolutionsNamed: 0, hostResolutionsLoopback: 0, tcpConnectsOutside: 0,
    tcpConnectsLoopback: 0, connectJobs: 0, udpConnects: 0, udpConnectPorts: {}, bytesSentOutside: 0, bytesSentLoopback: 0, closed: true };
  const peer = new Map();   // socket source id -> peer address
  for (const e of doc.events || []) {
    const n = names[e.type] || String(e.type); const p = e.params || {}; const sid = e.source && e.source.id;
    if (e.phase === 2) continue;
    if (n === 'URL_REQUEST_START_JOB') {
      const u = p.url || '';
      if (NET_SCHEME.test(u)) {
        let host = ''; try { host = new URL(u).host; } catch { /* unparsable: counted as network */ }
        if (isLoopHost(host)) { out.urlRequestsLoopback++; const pth = new URL(u).pathname; out.loopbackPaths[pth] = (out.loopbackPaths[pth] || 0) + 1; }
        else out.urlRequestsNetwork++;
      } else { out.urlRequestsOther++; const s = u.split(':')[0]; out.otherSchemes[s] = (out.otherSchemes[s] || 0) + 1; }
    }
    if (n === 'HOST_RESOLVER_MANAGER_REQUEST' && e.phase === 1) {
      const h = String(p.host || '').replace(/^[a-z]+:\/\//i, '');
      if (isLoopHost(h)) out.hostResolutionsLoopback++; else out.hostResolutionsNamed++;
    }
    if (n === 'TCP_CONNECT_ATTEMPT' || n === 'TCP_CONNECT') {
      const addrs = [].concat(p.address || [], p.address_list || []);
      for (const a of addrs) {
        peer.set(sid, a);
        if (isLoopAddr(a)) out.tcpConnectsLoopback++; else out.tcpConnectsOutside++;
      }
    }
    if (n === 'CONNECT_JOB') out.connectJobs++;
    if (n === 'UDP_CONNECT' && p.address) {
      peer.set(sid, p.address); out.udpConnects++;
      const port = (p.address.match(/:(\d+)$/) || [])[1] || '?'; out.udpConnectPorts[port] = (out.udpConnectPorts[port] || 0) + 1;
    }
    if (/^(SOCKET_BYTES_SENT|UDP_BYTES_SENT)$/.test(n)) {
      const a = peer.get(sid) || p.address || '';
      if (isLoopAddr(a)) out.bytesSentLoopback += p.byte_count || 0; else out.bytesSentOutside += p.byte_count || 0;
    }
  }
  if (!/\]\s*\}\s*$/.test(fs.readFileSync(file, 'utf8'))) out.closed = false;
  return out;
}

const started = new Date().toISOString();
fs.rmSync(args.profile, { recursive: true, force: true });
fs.mkdirSync(path.join(args.profile, 'Default'), { recursive: true });
fs.writeFileSync(path.join(args.profile, 'Default', 'Preferences'), JSON.stringify(PREFS));
const browser = await puppeteer.launch({
  executablePath: args.chrome || CHROME, headless: true, pipe: true, userDataDir: path.resolve(args.profile), args: flags,
  defaultViewport: null, protocolTimeout: 600000,
});
const version = await browser.version();
const page = await browser.newPage();
let pageRequests = 0, pageRequestsAborted = 0; const requestKinds = {};
await page.setRequestInterception(true);
page.on('request', (r) => {
  pageRequests++;
  let k = 'other'; try { const u = new URL(r.url()); k = `${u.protocol}${u.host ? '//' + u.host : ''}`; } catch { /* keep 'other' */ }
  requestKinds[k] = (requestKinds[k] || 0) + 1;
  r.abort('blockedbyclient').then(() => { pageRequestsAborted++; }, () => {});
});
await page.setOfflineMode(true);
const results = [];
for (const job of jobs) {
  const raw = fs.readFileSync(job.svg);
  const p = prepare(raw.toString('utf8'));
  const before = pageRequests;
  const rec = { id: job.id, svgSha256: sha(raw), removedImports: p.removedImports, outsideRefsLeft: p.left,
    svgWidth: p.W, svgHeight: p.H, mode: job.mode || 'exported', dpr: job.dpr || 1 };
  if (!HIDE.hasOwnProperty(rec.mode)) { rec.refused = 'unknown mode'; results.push(rec); continue; }
  if (p.left.length || !(p.W > 0 && p.H > 0)) { rec.refused = p.left.length ? 'outside reference left' : 'no size'; results.push(rec); continue; }
  const vw = Math.ceil(p.W), vh = Math.ceil(p.H);
  await page.setViewport({ width: vw, height: vh, deviceScaleFactor: rec.dpr });
  const css = `html,body{margin:0;padding:0;overflow:hidden;background:white}svg{display:block}${HIDE[rec.mode]}`;
  await page.setContent(`<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body>${p.markup}</body></html>`,
    { waitUntil: 'load', timeout: 300000 });
  const info = await page.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => {
    const s = document.querySelector('svg'); const r = s.getBoundingClientRect();
    const shown = (el) => { for (let a = el; a && a.tagName.toLowerCase() !== 'svg'; a = a.parentElement) if (getComputedStyle(a).display === 'none') return false; return true; };
    const vis = [...document.querySelectorAll('svg text')].filter(shown).length;
    const groups = [...document.querySelectorAll('svg > g > g')];
    res({ w: r.width, h: r.height, paths: document.querySelectorAll('svg path').length, texts: document.querySelectorAll('svg text').length,
      textsShown: vis, rootGroups: groups.length, rootGroupsShown: groups.filter(shown).length });
  }))));
  const png = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width: vw, height: vh }, captureBeyondViewport: false, optimizeForSpeed: false });
  fs.mkdirSync(path.dirname(job.out), { recursive: true });
  fs.writeFileSync(job.out, png);
  Object.assign(rec, { viewport: [vw, vh], drawn: info, png: path.basename(job.out), pngSha256: sha(png), pngBytes: png.length,
    pageRequests: pageRequests - before });
  results.push(rec);
}
let control = null;
if (args.control) {
  // the instrument's positive control: one page request to a reserved, unresolvable name with interception off; the
  // proxy and the resolver rules still stop it inside the machine, and the counters below must see it
  const cp = await browser.newPage();
  let seen = 0; cp.on('request', () => { seen++; });
  await cp.setContent('<!doctype html><html><body><img src="http://w08-control.invalid/x.png"></body></html>', { waitUntil: 'load', timeout: 60000 }).catch(() => {});
  await new Promise((r) => setTimeout(r, 1500));
  control = { pageRequestsSeen: seen, target: 'http://w08-control.invalid/x.png (reserved name; never resolvable)' };
  await cp.close();
}
await browser.close();
const finished = new Date().toISOString();
let counts; try { counts = netlogCounts(args.netlog); } catch (e) { counts = { error: String(e).slice(0, 200) }; }
const line = { session: args.session, tool: 'research:baselines/render_svg_offline.mjs', started, finished, chrome: version,
  transport: 'pipe', flags: flags.map((f) => (f.startsWith('--log-net-log=') ? '--log-net-log=<scratch netlog>' : f)), prefs: PREFS,
  jobs: results.length, refused: results.filter((r) => r.refused).length,
  pageRequests, pageRequestsAborted, pageRequestKinds: requestKinds, control,
  netlog: { sha256: sha(fs.readFileSync(args.netlog)), bytes: fs.statSync(args.netlog).size, ...counts },
  results };
fs.appendFileSync(args.log, JSON.stringify(line) + '\n');
console.log(JSON.stringify({ session: args.session, jobs: results.length, refused: line.refused, pageRequests,
  urlRequestsNetwork: counts.urlRequestsNetwork, hostResolutionsNamed: counts.hostResolutionsNamed,
  tcpConnectsOutside: counts.tcpConnectsOutside, bytesSentOutside: counts.bytesSentOutside,
  urlRequestsLoopback: counts.urlRequestsLoopback, udpConnects: counts.udpConnects }));
