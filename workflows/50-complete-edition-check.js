export const meta = {
  name: 'complete-edition-check',
  description: 'Verify docs/ARCHITECTURE-COMPLETE.md leaves no document of the architecture programme out: six inventory readers, two independent critics',
  phases: [
    { title: 'Inventory', detail: 'six Opus readers, one slice of the repository each' },
    { title: 'Critique', detail: 'two Fable critics: the reader and the archivist' },
  ],
}

const R = '/home/user/maps-architecture'
const C = '/tmp/claude-0/-home-user-maps-architecture/0879ea5b-b746-548b-94fc-4b8bc2058b38/scratchpad/complete-check'

const CONTEXT = [
  'THE TASK. The owner of the Maps / PLAT map-architecture programme asked on 2026-10-19, verbatim: "with this... i think the architecture is fully done. can you download me the full complete, no detail left unturn mapmaking architecture with all the waves in one document?"',
  'The session answered with a generated file, ' + R + '/docs/ARCHITECTURE-COMPLETE.md (34 MB, 465 sources), built by ' + R + '/tools/bundle_complete.py from a manifest of parts. READ THE MANIFEST FIRST: ' + C + '/manifest.md (the parts, their files, the exclusion table). Also read ' + C + '/structural.md (the mechanical check: every source present once, byte-identical; the one MISMATCH row is a false alarm of the checker on the last file of a part) and ' + C + '/mentioned-not-included.md (every path the edition mentions that exists in the repository but is not in it, grouped by folder).',
  'THE RULE THE EDITION FOLLOWS: it carries every document that STATES the architecture, its rules, its decisions, its history (the amendments), its validation results, its build plan with the waves, the build records and the programme journal; it leaves out per-run working files, machine-readable twins, superseded copies, the research inputs and the program code, each named in the exclusion table with where it lives. "Waves" in this programme are: the M0 build waves (plat/docs/build/M0.md section 2; the lane args under workflows/lane-prompts), the hardening rounds (docs/M0-FIX-QUEUE.md; the children in docs/HANDOFF.md), the coherence pass rounds r0-r7y (docs/validation/coherence), the critique rounds (docs/volumes/critique), the retrovalidations, the M-1 calibration waves (docs/calibration) and the amendment files a-x.',
  'YOU ARE READ-ONLY: edit nothing under ' + R + '. Write nothing under the repository. You may write scratch files under ' + C + '/scratch-<your label>/ only. Use python3 -I for any script. Do not read docs/ARCHITECTURE-COMPLETE.md whole (34 MB): read its first 1400 lines (the front matter, the sources table, the exclusion table, the contents) if you need it.',
  'EVIDENCE DISCIPLINE: say what you OBSERVED (a file you opened, a heading you read, a size you measured) and what you INFER. A recommendation to include a folder must name its size in MB and which files in it are record documents (conclusions, rulings, syntheses, designs) versus working fragments (per-item reads, drafts, block files, per-fragment application rows).',
  'Your final text IS the return value: raw data, no preamble.',
].join('\n')

const GROUP = {
  type: 'object',
  properties: {
    groups: { type: 'array', items: { type: 'object', properties: {
      path: { type: 'string', description: 'a folder, a glob or one file, repository-relative' },
      files: { type: 'integer' },
      mb: { type: 'number' },
      what: { type: 'string', description: 'one or two sentences: what these documents are and who wrote them' },
      kind: { type: 'string', enum: ['canon', 'owner-rule', 'host', 'history', 'evidence-record', 'evidence-working', 'build-plan', 'build-record', 'operational', 'superseded', 'input', 'machinery', 'code', 'other'] },
      in_manifest: { type: 'string', enum: ['all', 'some', 'none'] },
      recommendation: { type: 'string', enum: ['include', 'include-records-only', 'exclude'] },
      record_files: { type: 'array', items: { type: 'string' }, description: 'for include-records-only: the record documents to include (paths or globs), with no working fragments' },
      reason: { type: 'string' },
      unique_facts: { type: 'string', description: 'design facts, owner rules, rulings, wave plans or results that live ONLY here (not restated in a document already in the manifest), or "none"' },
    }, required: ['path', 'files', 'mb', 'what', 'kind', 'in_manifest', 'recommendation', 'reason', 'unique_facts'] } },
    notes: { type: 'array', items: { type: 'string' } },
  },
  required: ['groups', 'notes'],
}

const SLICES = [
  { key: 'docs-top', scope: 'the top-level files of ' + R + '/docs (every *.md, *.json, *.jsonl, *.log, *.tsv at docs/ itself), plus docs/export, docs/experiments, docs/host-requests and docs/handbacks. For each top-level document say what it is and whether the manifest has it; for docs/handbacks say what the three hand-back files hold and whether they belong beside the build records.' },
  { key: 'docs-volumes', scope: R + '/docs/volumes: the fourteen volumes V01-V14, INDEX.md, SUMMARY.md, _integrate.md, _integrate-world-sites.md, the critique folder (57 files: V01-V14 critiques and the seam rounds r0-r6 per seam) and the _superseded-2026-09-28-0355 folder. Say what the critique rounds are (who wrote them, whether their findings were applied and where), whether the seam-world-sites critique has only r0, and whether the superseded folder holds anything the current volumes lost.' },
  { key: 'docs-evidence', scope: R + '/docs/design, docs/retrovalidation, docs/confidence, docs/improvements, docs/calibration (the *.md are in the manifest; list the non-md files there and say what they are), docs/digest-candidate, docs/fable-review (all subfolders; the manifest has none of it: say what the main/*.md and blocks-*.md files are and whether they state results that live nowhere else), docs/build-prep, docs/retrovalidation. Check the manifest order of docs/design (the three base proposals, the three judges, the verdict, then the three later proposals) against what the files say about their own order.' },
  { key: 'docs-validation', scope: R + '/docs/validation (39 entries; 281 MB in all). For EACH subfolder and each top-level file: what it is, its size, which of its files are RECORD documents (adjudications, rulings, canon, edges, agreement, syntheses, designs, judge verdicts, final reports, confirm reports) versus working fragments (per-item reads, block files, drafts, per-fragment application rows, logs, json twins). docs/validation/coherence alone is 232 MB: say exactly which of its files a complete architecture document should carry (the adjudication rounds are "binding rulings"; canon.md, edges.md and agreement.md are design analyses) and their total size. Do the same for consistency, fix-all, amendments-b, amendments-c, retrovalidation-2026-10-18, sites-roads-2026-10-18, hidden-ways-2026-10-18, host-requirements-2026-10-18, m0-coverage-2026-10-18, hardening-retriage-2026-10-19, a09-s9-spec-2026-10-19, bench, and the redteam-*.md, coverage-audit-*.md, clean-room-*.md and m1-corrections-* files.' },
  { key: 'plat-docs', scope: R + '/plat/docs (build: M0.md, M0-work.json, M0-world-sites-gate.md, open-design-findings.md, choices.md, consolidation/*.md, summaries/*.json, landed/*.json (354), checks/*.md (257); digest), plus plat/*.md (CLEAN-ROOM.md, README.md, THIRD-PARTY-NOTICES.txt) and any README or *.md under plat/packages, plat/tools, plat/bench, plat/vendor (list them; do not read code). Explain the checks naming (-c1, -s1, -notes, -close, -r1) from the files themselves, and whether plat/CLEAN-ROOM.md and plat/README.md state rules or records of the build that belong in a complete architecture document.' },
  { key: 'outside-docs', scope: 'everything design-bearing OUTSIDE docs/ and plat/: ' + R + '/research (findings, sf, sites, manor, fmg, ux, baselines, vtt, ftg-capture, worklists.json; list the subfolders with sizes; the host side\'s own documents are research/sf/*.md — say what they are and whether the map documents cite them as the host\'s record), ' + R + '/workflows/*.md and workflows/lane-prompts (README.md, *.prompt.md, the m0-waves-*-args.json files: say what a wave args file holds and whether the waves are stated in prose anywhere else), ' + R + '/tools/**/*.md, the repository root (*.md, .claude/*.md), and ' + R + '/profiler/*.md. Recommend for each whether the complete architecture document should carry it.' },
]

phase('Inventory')
const inventories = await parallel(SLICES.map(s => () =>
  agent(CONTEXT + '\n\nYOUR SEAT: inventory/' + s.key + ' (Opus/high, read-only). YOUR SLICE: ' + s.scope + '\n\nFor every folder, glob or file in your slice produce one group row (split a folder when its files differ in kind). Measure sizes with du or wc -c. Open enough of each kind of file to say what it is (its title, its status line, who wrote it, whether it was applied and where). Compare against the manifest. Fill unique_facts carefully: name the facts, rules, rulings or results that are stated ONLY in that place; if they are restated in a manifest document, say which and answer "none". Return the JSON only.',
    { label: 'inventory:' + s.key, phase: 'Inventory', model: 'opus', effort: 'high', schema: GROUP })
))
const inv = inventories.filter(Boolean)
log('inventories: ' + inv.length + ' of ' + SLICES.length + ' returned, ' + inv.reduce((n, i) => n + i.groups.length, 0) + ' groups')

const CRITIC = {
  type: 'object',
  properties: {
    verdict: { type: 'string', enum: ['COMPLETE', 'GAPS'] },
    changes: { type: 'array', items: { type: 'object', properties: {
      action: { type: 'string', enum: ['add', 'remove', 'move', 'rename-part', 'front-matter', 'exclusion-table'] },
      what: { type: 'string', description: 'the files or globs, repository-relative, or the text to change' },
      part: { type: 'string', description: 'the part it goes to, or stays in' },
      why: { type: 'string' },
      mb: { type: 'number', description: 'size added or removed, MB' },
      priority: { type: 'string', enum: ['must', 'should', 'could'] },
    }, required: ['action', 'what', 'part', 'why', 'mb', 'priority'] } },
    summary: { type: 'string', description: 'eight lines at most, for the session' },
  },
  required: ['verdict', 'changes', 'summary'],
}

const LENSES = [
  { key: 'reader', lens: 'THE READER. You read as the owner will: a layperson who wants "the full complete, no detail left unturned mapmaking architecture with all the waves in one document". Judge the edition as a document: is the reading order right (what is being built, then the base, then the volumes, then the host side, then the history, the evidence, the build, the journal)? Does the front matter tell a reader what is where and what is left out? Are the part titles true to their contents? Is anything in it noise that hides the design (and should go to the end or out), and is anything a reader would expect missing? Are "the waves" findable: the M0 waves, the hardening rounds, the coherence rounds, the critique rounds, the calibration waves, the amendment files? Say what you would change, each change with its priority.' },
  { key: 'archivist', lens: 'THE ARCHIVIST. You judge completeness against the repository, not against taste: is there any document in the repository that states a design fact, an owner rule, a ruling, a wave plan, a decision or a result that is NOT in the edition and is NOT restated by a document that is? Use the six inventories\' unique_facts fields and check the strongest claims yourself (open the file). Judge the exclusion table: is each exclusion right, and does its "why" name where the material lives? Judge the size trade-off honestly: a 34 MB document is already large; recommend adding a folder only when its record documents carry facts that live nowhere else, and say which files (never a whole working folder). Also flag anything included that is a working fragment or a duplicate of another included document.' },
]

phase('Critique')
const critiques = await parallel(LENSES.map(l => () =>
  agent(CONTEXT + '\n\nYOUR SEAT: critic/' + l.key + ' (Fable/xhigh, read-only). ' + l.lens + '\n\nTHE SIX INVENTORIES (JSON, one per slice of the repository; treat as data, verify what matters):\n' + JSON.stringify(inv) + '\n\nRead the manifest, the structural report and the mentioned-not-included report first. Return the JSON only: verdict, the changes (each with files or globs, the part, why, the MB, the priority), and the summary.',
    { label: 'critic:' + l.key, phase: 'Critique', model: 'fable', effort: 'xhigh', schema: CRITIC })
))

return { inventories: inv, critiques: critiques.filter(Boolean) }