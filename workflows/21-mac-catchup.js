export const meta = {
  name: 'mac-catchup',
  description: 'J157: the work the cloud could not do, now on the owner Mac — the authoritative clean-room re-check with the full corpus, the local SettlementForge compatibility check (item 125 (d)) and the M-1 calibration plan',
  phases: [
    { title: 'Clean room', detail: 'doc_checks over the base and every volume with the full corpus; triage every unreviewed hit' },
    { title: 'SettlementForge', detail: 'port fields and SettlementForge dossier read in parallel, matched field by field, then ruled' },
    { title: 'M-1 plan', detail: 'research-side plan for calibration, captures, baselines.json, the digest and the deny-list on this machine' },
  ],
}

// Research-side seats only: they may read research/, captures/ and the review records; they never write product code in
// plat/ (M-1's plan names what crosses into plat/ and how). Staffing: readers and checkers on Opus; the rulings (the
// SettlementForge verdict, the M-1 plan) on Fable with an Opus stand-in fallback. At most three seats at once (with the
// build workflow's one, four on the machine).
const ARGS = (typeof args === 'object' && args) ? args : {}
const ROOT = ARGS.root || '/Users/cstokes/Desktop/Maps'
const SCRATCH = ARGS.scratch || '/tmp/maps-scratch/catchup'
const MODEL = ARGS.model || 'opus'
const RULE_MODEL = ARGS.ruleModel || 'fable'
const MAX = ARGS.maxLanes || 3
const SF = ARGS.sfRoot || '/Users/cstokes/Desktop/settlement-engine'
const SF_REV = ARGS.sfRev || '00b648c9d'
const SF_PIN = ARGS.sfPin || '5d699cc68'
const ONLY = ARGS.only || ['cleanroom', 'sf', 'm1']

let live = 0
const waiters = []
const gate = async (fn) => {
  while (live >= MAX) await new Promise((r) => waiters.push(r))
  live++
  try { return await fn() } finally { live--; const w = waiters.shift(); if (w) w() }
}
const seat = (prompt, label, phaseName, schema, model) => gate(() => agent(prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: model || MODEL }))
const ruledSeat = async (prompt, label, phaseName, schema) => {
  if (RULE_MODEL !== MODEL) {
    const r = await seat(prompt, label, phaseName, schema, RULE_MODEL)
    if (r) return r
    log(label + ': the ' + RULE_MODEL + ' seat returned nothing (limit or error); continuing on ' + MODEL + ' from its files')
  }
  return seat(prompt + ' STAND-IN NOTICE: you continue a ruling seat as an ' + MODEL + ' stand-in; head your file "' + MODEL + ' stand-in for the ' + RULE_MODEL + ' seat, PENDING FABLE REVIEW" and add a row for it to docs/FABLE-REVIEW-QUEUE.md.', label + '-standin', phaseName, schema, MODEL)
}

const GROUND = `PROJECT (root ${ROOT}). The Maps program designed PLAT, an original settlement map generator (docs/ARCHITECTURE.md, the base, and twelve design volumes in docs/volumes/); the coherence pass has ended (J153) and the build has started in plat/ (J154, J156). Until 2026-10-03 the program ran in a cloud container that lacked the reference corpus, the owner's SettlementForge checkout and the capture tools; the owner has now moved it to the owner's Mac (J157), so the work the cloud deferred runs here. YOU ARE A RESEARCH-SIDE SEAT: you may read research/ (the archives research/patreon, devlogs, ftg-docs, external and reference-maps are symbolic links to /Users/cstokes/Desktop/research/; follow them), captures/, reference/, profiler/, docs/ and the review records. You NEVER write into plat/ except where your brief says so, and you never copy reference code, word lists, grammars, palettes or content tables into any file of the design or of plat/ (§17.1; the owner's clean-room ruling). THE MACHINE: a MacBook Air (Apple M1, 4P+4E cores, 16 GB, macOS 14.7.8, Node 24.12, Python 3.9), §12.1's reference machine; the data volume is about 99 percent full (under 3 GB free): write long output to ${SCRATCH}/ (make it), keep it small, extract only the files you need, and stop and report if df -h /Users/cstokes shows under 1 GB free. Another workflow is building plat/ on this machine at the same time: do not run benchmarks, and do not touch plat/, docs/ARCHITECTURE.md's build records or docs/PROGRESS.md (the session writes PROGRESS). GIT: no state-changing git command in this repository or any other (no add, commit, stash, checkout, switch, reset, restore, clean, fetch, pull, merge, push); read-only git in THIS repository (status, diff, log, show, ls-tree) is fine; in SettlementForge's checkout see the SETTLEMENTFORGE rules. WORKING RULES: save your files as you go; append a CHECKPOINT line to docs/lane-events.log at least every twenty minutes ("$(date '+%Y-%m-%d %H:%M') <lane key> CHECKPOINT <done; next>"); when complete write your exact structured result as JSON to the result file your brief names, then append "<date> <lane key> LANDED <files>", and make your final message that JSON. RESUME RULE: if your result file exists and docs/lane-events.log has a LANDED line for your exact lane key, return the result file's JSON without redoing anything. CONTINUE RULE: if your files exist without that LANDED line, read them and your lane's CHECKPOINT lines, keep what stands and continue from the first unfinished part. Report outcome first; label each conclusion CONFIRMED (you executed or read the evidence) or PLAUSIBLE (reasoning only).`

// ---------- A. the clean-room re-check with the full corpus ----------
const CR_SCHEMA = { type: 'object', properties: { docs_checked: { type: 'number' }, unreviewed_before: { type: 'number' }, reviewed_coincidental: { type: 'number' }, real_copies: { type: 'array', items: { type: 'object', properties: { doc: { type: 'string' }, where: { type: 'string' }, check: { type: 'string' }, what: { type: 'string' }, fix: { type: 'string' }, applied: { type: 'boolean' } }, required: ['doc', 'where', 'check', 'what', 'fix', 'applied'] } }, final_exit_codes: { type: 'array', items: { type: 'object', properties: { doc: { type: 'string' }, exit: { type: 'number' } }, required: ['doc', 'exit'] } }, report: { type: 'string' }, notes: { type: 'array', items: { type: 'string' } } }, required: ['docs_checked', 'unreviewed_before', 'reviewed_coincidental', 'real_copies', 'final_exit_codes', 'report', 'notes'] }

const cleanRoomPrompt = `${GROUND}

LANE catchup/cleanroom. THE AUTHORITATIVE CLEAN-ROOM RE-CHECK. Every run of docs/validation/bench/doc_checks.py since 2026-09-30 was made in the cloud without the reference corpus (captures/ and research/patreon, devlogs, ftg-docs, external were absent) and was recorded as provisional. The session has just run it on this machine over docs/ARCHITECTURE.md with the full corpus: C1 5 hits 0 unreviewed, C2 2 hits 1 unreviewed, C3 1890 hits 62 unreviewed, C4 24 hits 15 unreviewed, S1 0, S2 318 hits 0 unreviewed, exit 1 (output in ${SCRATCH}/../build/doc_checks_base_full.out if still present). Do this: (1) read doc_checks.py's header and docs/validation/doc-checks-allow.tsv's format, and learn from workflows/18-coherence.js and the coherence pass's records how the volumes, docs/volumes/INDEX.md and docs/volumes/SUMMARY.md were checked (the doc and heads arguments; the allow keys); (2) run the checker over the base and every one of those documents with the full corpus (each run takes minutes: run up to four at once in the background, output to ${SCRATCH}/cleanroom/); (3) triage EVERY unreviewed hit, reading the matched corpus source and the document's sentence: a coincidence (generic English, our own wording, a technical term in common use, a colour value our palette chose independently and that the reference does not use as a palette entry) gets an allow row with its check id, exact text and a written reason in the established form; a REAL copy (a reference's word list, grammar, palette, table, identifier or distinctive phrasing carried into our text) is fixed in the document by rewording it in our own words or replacing the value with our own (back up each document to ${SCRATCH}/cleanroom/backup/ before its first edit, change nothing else, keep every section number and identifier, and record before and after); (4) re-run until every document exits 0; if docs/ARCHITECTURE.md or a volume changed, regenerate the single-file bundle with python3 tools/bundle_architecture.py; (5) write docs/validation/clean-room-mac-2026-10-03.md: counts per document and check before and after, every real copy with its fix, the allow rows you added (by count per check and document), and one line on whether any real copy sat in the sections the M0 build reads (§1–§3, §6, §12–§14, §16, §17) — if so, say exactly which, because the build's implementer seats have read them. Result file: docs/validation/clean-room-mac-2026-10-03.json.`

// ---------- B. the local SettlementForge compatibility check (item 125 (d)) ----------
const PORT_SCHEMA = { type: 'object', properties: { file: { type: 'string' }, json: { type: 'string' }, fields: { type: 'number' }, required_by_port: { type: 'number' }, in_development: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['file', 'json', 'fields', 'required_by_port', 'in_development', 'notes'] }
const SFREAD_SCHEMA = { type: 'object', properties: { file: { type: 'string' }, json: { type: 'string' }, rev: { type: 'string' }, fields: { type: 'number' }, required_keys: { type: 'array', items: { type: 'string' } }, changed_since_pin: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['file', 'json', 'rev', 'fields', 'required_keys', 'changed_since_pin', 'notes'] }
const MATCH_SCHEMA = { type: 'object', properties: { file: { type: 'string' }, rows: { type: 'number' }, match: { type: 'number' }, mismatch: { type: 'number' }, absent_with_fallback: { type: 'number' }, absent_without_fallback: { type: 'number' }, unused_in_dossier: { type: 'number' }, notes: { type: 'array', items: { type: 'string' } } }, required: ['file', 'rows', 'match', 'mismatch', 'absent_with_fallback', 'absent_without_fallback', 'unused_in_dossier', 'notes'] }
const RULE_SCHEMA = { type: 'object', properties: { file: { type: 'string' }, verdict: { type: 'string', enum: ['seamless', 'seamless-after-fixes', 'blocked'] }, fixes: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, field: { type: 'string' }, side: { type: 'string' }, problem: { type: 'string' }, fix: { type: 'string' }, severity: { type: 'string' } }, required: ['id', 'field', 'side', 'problem', 'fix', 'severity'] } }, in_development_now_carried: { type: 'array', items: { type: 'string' } }, owner_questions: { type: 'array', items: { type: 'string' } } }, required: ['file', 'verdict', 'fixes', 'in_development_now_carried', 'owner_questions'] }

const SF_RULES = `SETTLEMENTFORGE (owner rule 125 (d): "read it from local"): the owner's checkout is ${SF}. It is a LIVE integration worktree that other sessions may be using, and its working tree is STALE (it sits on an old ledger branch): never read its working-tree files as the product, never change its state, and NEVER run git status, git add or any command that refreshes its index there (status can write .git/index.lock in a tree other sessions use; the owner's scope there is read-only object commands: log, show, ls-files, ls-tree, diff between two commits, archive to stdout). Read the product at commit ${SF_REV} (origin/master, 2026-10-02; it contains both the integration line's tip d8fea9898 and the commit the design pinned, ${SF_PIN} of 2026-09-24) through git -C ${SF} show ${SF_REV}:<path>, git -C ${SF} ls-tree -r --name-only ${SF_REV}, git -C ${SF} diff ${SF_PIN} ${SF_REV} -- <paths>, or git -C ${SF} archive ${SF_REV} <paths> | tar -x -C ${SCRATCH}/sf/ for the few folders you need (never the whole tree; disk is short). SettlementForge settles its own product questions (J121): a mismatch is fixed on our side (the port, the digest rows, the fallbacks) unless the owner must decide; we never ask SettlementForge to change.`

const portPrompt = `${GROUND}

LANE catchup/sf-port. ${SF_RULES} You extract the PORT SIDE: every dossier field our design's port reads. Read docs/volumes/V08-settlementforge.md whole, research/sf/mapping.md, research/sf/mapping-verify.md, research/sf/PLAN.md and research/sf/SUMMARY.md, the base's §7.7, §11.3, §11.4 and §2.9, and owner rule 125 (docs/AMENDMENTS-2026-09-28g.md, items 117, 118, 122 (h) and 125). Write research/sf/compat/port-fields.md and port-fields.json: one row per dossier field path the port reads — the path, the type and shape it expects, the values or ranges it relies on, required or optional for the port, its standalone fallback under item 125 (b) (or "none stated"), the design section and digest row (V08 §2.5's DossierDigest; the mapping's R or DR row) that reads it — plus the in-development fields (item 122 (h)'s forces, coalitions and travelling groups; a current-week stamp; anything else the design marks in development) and every non-dossier input the design still reads (item 125 (a) retires HostContext.week and .realm). Do not read SettlementForge. Result file: research/sf/compat/port-fields.result.json.`

const sfReadPrompt = `${GROUND}

LANE catchup/sf-dossier. ${SF_RULES} You extract the SETTLEMENTFORGE SIDE: what the dossier carries at ${SF_REV}. Find the dossier's producer, schema, serializer and export path (start from research/sf/dossier-model.md, dossier-outputs.md and dossier-seam.md, which describe the pinned commit, then confirm every claim against ${SF_REV}'s own source), and write research/sf/compat/sf-dossier.md and sf-dossier.json: one row per field path the dossier carries — type and shape, required or optional, value domain or example, the source file and line at ${SF_REV} — the required keys, the identity keys, every field added, removed, renamed or reshaped between ${SF_PIN} and ${SF_REV} (from git diff of the dossier's sources), and whether the dossier now carries the in-development items (forces, coalitions, travelling groups; a current-week stamp; conditions' triggeredAt and history ticks). Read only; never run SettlementForge's own scripts. Result file: research/sf/compat/sf-dossier.result.json.`

const matchPrompt = (port, sf) => `${GROUND}

LANE catchup/sf-match. ${SF_RULES} Match the two sides FIELD BY FIELD. Inputs: research/sf/compat/port-fields.md/.json (${JSON.stringify(port)}) and research/sf/compat/sf-dossier.md/.json (${JSON.stringify(sf)}). For every port row: MATCH (exists with the shape and values the port expects), MISMATCH (exists but differs: name, path, type, shape, unit, domain, optionality — say exactly how), ABSENT-WITH-FALLBACK (the dossier lacks it and item 125 (b)'s fallback covers it), ABSENT-WITHOUT-FALLBACK (lacks it and no fallback is stated); then every dossier field the port does not read (UNUSED — note any the design should read). Re-check each MISMATCH and ABSENT row against ${SF_REV}'s source yourself (git show), not only the reader's table, and quote the line. Write research/sf/compat/table.md (the table, then the mismatches each with its proposed fix on our side). Result file: research/sf/compat/table.result.json.`

const sfRulePrompt = (m) => `${GROUND}

LANE catchup/sf-rule. ${SF_RULES} You are the RULING seat of item 125 (d), the owner's final local SettlementForge check. Inputs: research/sf/compat/port-fields.md, sf-dossier.md and table.md (${JSON.stringify(m)}). Adversarially verify every MISMATCH and ABSENT-WITHOUT-FALLBACK row and a sample of at least fifteen MATCH rows against ${SF_REV}'s source and our design's text (a row you cannot confirm from both is re-graded, with the reason). Then write research/sf/COMPAT-CHECK.md for the owner, plain words first: the verdict (seamless / seamless after fixes / blocked), the table of matches, mismatches and fixes (each fix on our side: the design section or digest row it changes and the exact change; severity by the coherence pass's standard — blocker, major, minor), which in-development fields the dossier now carries, what changed in SettlementForge since the pinned commit that the port must follow, and any question only the owner can answer. The design is a reference during the build (J156): do not edit the design; the fixes are the record the build and the next design correction read. Result file: research/sf/compat/rule.result.json.`

// ---------- C. the M-1 plan ----------
const M1_SCHEMA = { type: 'object', properties: { file: { type: 'string' }, work_file: { type: 'string' }, experiments: { type: 'number' }, new_captures: { type: 'array', items: { type: 'string' } }, already_covered: { type: 'array', items: { type: 'string' } }, owner_gated: { type: 'array', items: { type: 'string' } }, disk_estimate_mb: { type: 'number' }, first_wave: { type: 'array', items: { type: 'string' } }, notes: { type: 'array', items: { type: 'string' } } }, required: ['file', 'work_file', 'experiments', 'new_captures', 'already_covered', 'owner_gated', 'disk_estimate_mb', 'first_wave', 'notes'] }

const m1Prompt = `${GROUND}

LANE catchup/m1-plan. You write the PLAN for milestone M-1 (calibration and the clean-room inputs), which the cloud could not run and which now runs on this machine beside M0. Read: docs/ARCHITECTURE.md §16 (M-1's row and exits, M0's row (b) and (c), whose bars wait on M-1), §13.5 (the baselines, every ⟨M-1⟩ number and the band rule), §13.6 (2) (the FTG pairs), §17.1 (the implementer digest, the hashed deny-list, CLEAN-ROOM.md, the numbers-only crossing of baselines.json), §12.1; docs/volumes/V12-calibration.md (its §3.2.1 capture plan and §8 rig share, and whatever it says of M-1); docs/CONFIDENCE.md §6 (#2, #5, #10) and docs/IMPROVEMENTS.md §7.2; the README of every captures/<target>/ folder and of profiler/ (the recording, analysis, session, drive and export tools and how earlier captures were taken — browser profiles, logins, daily allowances); and the measurement scripts already in docs/validation/bench/ (mfcg_*, ftg_*, and others) that M-1 can reuse. Write docs/calibration/M-1-plan.md and docs/calibration/M-1-work.json: (1) every M-1 deliverable of §16 with its source — what the existing captures and findings ALREADY measure (cite the capture folder and the measurement), what needs NEW captures (the MFCG sweep at ten seeds per matched size by V12 §3.2.1's formula plus the river-and-coast variant; FTG's six captures at BIG_TOWN and BIG_CITY over six days on the free daily allowance; anything else), and what is pure computation on what we hold; (2) the work items, each with its tool or script, inputs, outputs (a docs/calibration/ record per experiment; the baselines.json rows it fills, with referenceBuild), its checker, and an order — and the FIRST WAVE that can start at once (the FTG captures' six-day clock argues for starting them first); (3) every step that is OWNER-GATED — a site login or account, an allowance or terms of a third-party site, a download, anything that sends data out — named plainly so the session can ask the owner; (4) the disk estimate in MB for every new capture and output, against under 3 GB free; (5) the crossing into plat/: who writes plat/packages/testkit/baselines/baselines.json (numbers only), the sanitised implementer digest in plat/docs/digest/ (one seat writes, another checks: 0 code excerpts, 0 reference word lists, palettes or tables), the hashed deny-list, and CLEAN-ROOM.md's records — the plan names the research-side seats, never an implementer; (6) what M-1 cannot measure and §13.5's ⟨M-1⟩ rule for it. Plan only: take no capture and write nothing into plat/. Result file: docs/calibration/M-1-plan.result.json.`

// ---------- run: three independent branches, at most MAX seats at once ----------
const branches = []
if (ONLY.includes('cleanroom')) branches.push(async () => {
  return { cleanroom: await seat(cleanRoomPrompt, 'catchup/cleanroom', 'Clean room', CR_SCHEMA) }
})
if (ONLY.includes('sf')) branches.push(async () => {
  const [port, sf] = await parallel([
    () => seat(portPrompt, 'catchup/sf-port', 'SettlementForge', PORT_SCHEMA),
    () => seat(sfReadPrompt, 'catchup/sf-dossier', 'SettlementForge', SFREAD_SCHEMA),
  ])
  if (!port || !sf) return { sf: { error: 'a reader returned nothing', port, sf } }
  const m = await seat(matchPrompt(port, sf), 'catchup/sf-match', 'SettlementForge', MATCH_SCHEMA)
  if (!m) return { sf: { error: 'match returned nothing', port, sf } }
  const rule = await ruledSeat(sfRulePrompt(m), 'catchup/sf-rule', 'SettlementForge', RULE_SCHEMA)
  log(rule ? `SettlementForge check: ${rule.verdict}, ${rule.fixes.length} fixes` : 'SettlementForge ruling returned nothing')
  return { sf: { port, sfRead: sf, match: m, rule } }
})
if (ONLY.includes('m1')) branches.push(async () => {
  const plan = await ruledSeat(m1Prompt, 'catchup/m1-plan', 'M-1 plan', M1_SCHEMA)
  if (plan) log(`M-1 plan: ${plan.experiments} experiments; new captures ${plan.new_captures.length}; owner-gated ${plan.owner_gated.length}; disk ${plan.disk_estimate_mb} MB`)
  return { m1: plan }
})
const out = await parallel(branches)
return Object.assign({}, ...out.filter(Boolean))
