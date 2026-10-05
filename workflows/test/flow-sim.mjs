// Virtual-clock simulation of workflows/23-build-m0-waves.js: the real script body, stubbed agent(), seeded outcomes.
// workflows/test/flow-sim.mjs (J173): a virtual-clock simulation of workflows/23 with stubbed seats.
// usage: node workflows/test/flow-sim.mjs <mode wave|flow> <seed> [pFirstFail] [pCloseFail] [pIntFail]
import { readFileSync } from 'node:fs'
const [mode, seedArg, pF = '0.79', pC = '0.12', pI = '0.25'] = process.argv.slice(2)
const ROOT = process.env.ROOT || new URL('../..', import.meta.url).pathname.replace(/\/$/, '')
const src = readFileSync(process.env.SCRIPT || `${ROOT}/workflows/23-build-m0-waves.js`, "utf8").replace(/^export const meta =/m, 'const meta =')
const AsyncFunction = (async () => {}).constructor
const body = new AsyncFunction('agent', 'parallel', 'pipeline', 'log', 'phase', 'args', 'workflow', 'budget', src)
const work = JSON.parse(readFileSync(`${ROOT}/plat/docs/build/M0-work.json`, 'utf8'))
const cloud = JSON.parse(readFileSync(`${ROOT}/workflows/lane-prompts/m0-waves-cloud-args.json`, 'utf8'))
const est = Object.fromEntries(work.items.map((i) => [i.id, (() => { const m = String(i.estHours || '1').match(/[\d.]+/g).map(Number); return m.reduce((a, b) => a + b, 0) / m.length })()]))
const waves = cloud.waves.filter((w) => w.wave !== '6f').map((w) => ({ wave: w.wave, items: [...w.items] }))
const DEPS = cloud.deps
// seeded hash → [0,1)
const h = (s) => { let x = (2166136261 ^ Number(seedArg)) >>> 0; for (const c of s) { x = (x ^ c.charCodeAt(0)) >>> 0; x = Math.imul(x, 16777619) >>> 0 } x = (x ^ (x >>> 13)) >>> 0; x = Math.imul(x, 0x5bd1e995) >>> 0; x = (x ^ (x >>> 15)) >>> 0; return x / 2 ** 32 }
// virtual clock
let now = 0, tseq = 0
const timers = []
const sleep = (d) => new Promise((r) => timers.push({ t: now + d, s: tseq++, r }))
let live = 0, maxLive = 0, stewardN = 0
const intWin = {} // id -> [{start, end, pass}]
const trace = []
const passT = {} // id -> time its item passed (last passing check)
const startT = {} // id -> first build start
const fixedBy = {}
const itemOf = (label) => { const m = label.match(/^(?:build|check)\/(M0-[a-z]-\d+[a-z]?)/); return m ? m[1] : null }
const agent = async (prompt, opts) => {
  const label = opts.label
  live++; maxLive = Math.max(maxLive, live)
  const id = itemOf(label)
  let d, res
  const isInt = label.startsWith('check/integration-')
  if (label.startsWith('steward/')) {
    d = 0.1
    stewardN++
    if (process.env.THROW_STEWARD && stewardN === Number(process.env.THROW_STEWARD)) { live--; throw new Error('steward boom') }
    const m = prompt.match(/--items (\S+)/)
    const ids = m && m[1] !== '-' ? m[1].split(',') : []
    const all = prompt.match(/all checked pass/) ? (prompt.match(/items (\[[^\]]*\]), all checked pass/) ? JSON.parse(prompt.match(/items (\[[^\]]*\]), all checked pass/)[1]) : []) : ids
    res = { wave: 'x', action: label, ok: true, commit: 'c' + tseq, pushed: true, unattributed: [], notes: [] }
    await sleep(d); live--
    trace.push({ t: now, kind: 'steward', label, prompt, ids: all })
    return res
  }
  else if (isInt) {
    d = 0.7
    const close = label.endsWith('-close')
    const fail = !close ? h(label) < Number(pI) : h(label) < 0.1
    const g = label.match(/-g(\d+)/)[1]
    const gi = waves.find((w) => String(w.wave) === g).items
    res = { group: g, verdict: fail ? 'fail' : 'pass', report: '', failing_lines: fail ? [{ item: gi[Math.floor(h(label + 'i') * gi.length)], line: 'l', evidence: 'e', required_change: 'r' }] : [] }
    trace.push({ t: now, kind: 'int', label, group: g, fail })
    if (close) { await sleep(d); live--; for (const id of Object.keys(intWin)) for (const w of intWin[id]) if (w.group === g && w.end === undefined) { w.end = now; w.pass = !fail } ; return res }
  } else if (label.startsWith('build/')) {
    const fix = /-fix|-int-fix/.test(label)
    if (/-int-g\d+-fix/.test(label)) { fixedBy[id] = true; (intWin[id] = intWin[id] || []).push({ start: now, group: label.match(/-int-g(\d+)-fix/)[1] }) }
    d = fix ? 0.5 + est[id] * 0.08 : est[id]
    if (!fix) { if (startT[id] === undefined) startT[id] = now; trace.push({ t: now, kind: 'build', id }) }
    res = { item: id, status: 'ready-for-check', files: [], landed_record: '', tests: { passed: 1, failed: 0 }, gates: [], choices_rows: [], notes: [] }
  } else if (label.startsWith('check/')) {
    const close = /-close-r|cutoff-notes/.test(label)
    d = close ? 0.4 : 0.6
    const fail = close ? h(label) < Number(pC) && !label.includes('cutoff') : h(label) < Number(pF)
    res = { item: id, verdict: fail ? 'fail' : 'pass', report: '', failing_lines: fail ? [{ line: 'l', evidence: 'e', required_change: 'r' }] : [] }
  } else throw new Error('unknown label ' + label)
  await sleep(d)
  live--
  if (res.verdict === 'pass' && id && !isInt) passT[id] = now
  return res
}
const log = (m) => trace.push({ t: now, kind: 'log', m })
const phase = () => {}
const args = mode === 'flow'
  ? { root: ROOT, scratch: '/tmp/x', maxLanes: 4, maxFixRounds: 3, closingFrom: 1, deps: DEPS, flow: { label: 'flow-7', groups: waves.map((w) => ({ group: w.wave, items: w.items })), done: [], hold: [], est, commitEvery: 4, handsOver: JSON.parse(readFileSync(`${ROOT}/workflows/lane-prompts/m0-flow-cloud-args.json`, 'utf8')).flow.handsOver, ...JSON.parse(process.env.EXTRA || '{}') } }
  : { root: ROOT, scratch: '/tmp/x', maxLanes: 4, maxFixRounds: 3, closingFrom: 1, deps: DEPS, noPull: cloud.noPull, waves }
let finished = false, out, err
body(agent, null, null, log, phase, args, null, null).then((r) => { out = r; finished = true }, (e) => { err = e; finished = true })
while (!finished) {
  await new Promise((r) => setImmediate(r))
  if (finished) break
  if (!timers.length) { console.log('DEADLOCK at', now); process.exit(2) }
  timers.sort((a, b) => a.t - b.t || a.s - b.s)
  const x = timers.shift(); now = x.t; x.r()
}
if (err) { console.log('ERROR', err.stack); process.exit(3) }
// invariants
const problems = []
const X = JSON.parse(process.env.EXTRA || '{}')
for (const id of X.done || []) passT[id] = 0
for (const id of X.hold || []) { const gi = waves.findIndex((w) => w.items.includes(id)); for (const w of waves.slice(0, gi)) for (const x of w.items) if (!(passT[x] <= startT[id])) problems.push(`hold ${id} started at ${startT[id]} before earlier-group ${x} passed (${passT[x]})`) }
const runIds = waves.flatMap((w) => w.items)
for (const id of Object.keys(startT)) for (const d of DEPS[id] || []) if (runIds.includes(d) && !(passT[d] <= startT[id])) problems.push(`${id} started at ${startT[id].toFixed(2)} before dep ${d} passed (${passT[d]})`)
if (maxLive > 4) problems.push('maxLive ' + maxLive)
const notPassed = runIds.filter((id) => passT[id] === undefined)
const commitsT = trace.filter((e) => e.kind === 'steward' && /-(commit|close)/.test(e.label))
const flatC = commitsT.flatMap((e) => e.ids)
const commitTime = {}
for (const e of commitsT) for (const id of e.ids) if (commitTime[id] === undefined) commitTime[id] = e.t
if (mode === 'flow') {
  const miss = runIds.filter((id) => passT[id] !== undefined && !flatC.includes(id) && !(X.done || []).includes(id) && !(X.committed || []).includes(id))
  if (miss.length && out && out.ok) problems.push('passed but never committed: ' + miss.join(','))
  // J185: an item a relaunch names as committed is never staged again
  for (const e of commitsT) for (const id of e.ids) if ((X.committed || []).includes(id)) problems.push(`${id} named committed by the relaunch but staged again by ${e.label}`)
  for (const e of commitsT) for (const id of e.ids) for (const w of intWin[id] || []) {
    const t0 = e.t - 0.1 // the commit's start: its ids are fixed then
    if (t0 > w.start && (w.end === undefined || e.t < w.end)) problems.push(`${id} committed at ${e.t.toFixed(2)} inside its integration fix window ${w.start.toFixed(2)}-${w.end}`)
    if (w.end !== undefined && w.pass === false && t0 > w.start) problems.push(`${id} committed at ${e.t.toFixed(2)} after its integration re-check failed`)
  }
  for (const e of commitsT) for (const id of e.ids) for (const w of intWin[id] || []) if (w.start > e.t - 0.1 && w.start < e.t) problems.push(`${id}'s integration fix started at ${w.start.toFixed(2)} while a commit staging it ran (${(e.t - 0.1).toFixed(2)}-${e.t.toFixed(2)})`)
  const H = args.flow.handsOver || {}
  for (const [g, ss] of Object.entries(H)) for (const sx of ss) if (startT[sx] !== undefined && runIds.includes(g) && !(commitTime[g] <= startT[sx])) problems.push(`hand-over successor ${sx} started at ${startT[sx]} before giver ${g} committed (${commitTime[g]})`)
}
const ints = trace.filter((e) => e.kind === 'int')
for (const e of ints) { const g = waves.find((w) => String(w.wave) === e.group); for (const id of g.items) if (!(passT[id] <= e.t)) problems.push(`integration g${e.group} at ${e.t} before ${id} passed`) }
if (process.env.TRACE) for (const e of trace) if (e.kind === "log") console.log(e.t.toFixed(2), e.m)
console.log(JSON.stringify({ mode, seed: seedArg, makespan: +now.toFixed(2), maxLive, notPassed: notPassed.length, commits: trace.filter((e) => e.kind === 'steward').length, integrations: ints.length, intFails: ints.filter((e) => e.fail).length, ok: out && (out.ok !== undefined ? out.ok : out.stoppedAt === null), problems: problems.slice(0, 5), nProblems: problems.length }))
