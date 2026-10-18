// [Fable-reviewed 2026-10-18 (lane retrovalidation/scripts; J392): this script ran as J387 records; its prompt text stays as fed; the line numbers below are those of the script as it ran (this comment shifts each by one). Corrections to it: line 20 (CONTEXT, copied from 40:20) says "rows J377–J384 … (after file m)" — for this run the inputs were rows J377–J386 and V13 after files m and n (the design prompt at line 25 says so; the reviewer, apply and critic seats received only CONTEXT); line 52 (reviser) says "fix it in file n … at the end of file n" — the reviser's file is ${NFILE} = file o (its Review record stands in file o; file n holds only its own).]
export const meta = {
  name: 'lens-close',
  description: 'Close the lens critic\'s fourteen gaps as amendments o (trade economy rows, global deity rank, deferred lenses, dropped rows, culture wording, canon-at-birth, march verdicts, base sync, V14 step, V09 controls, tests); review, revise, apply, completeness check',
  phases: [
    { title: 'Design', detail: 'one design seat writes amendments o' },
    { title: 'Review', detail: 'host-fidelity and map-architecture adversarial reviews' },
    { title: 'Revise', detail: 'fix every accepted review finding' },
    { title: 'Apply', detail: 'apply file o to its targets, record the application' },
    { title: 'Critic', detail: 'completeness critic' },
  ],
}

const MAPS = '/home/user/maps-architecture'
const HOST = '/home/user/clausellstokes-lang/settlement-engine'
const NFILE = 'docs/AMENDMENTS-2026-10-17o.md'
const NOTICE = (seat) => `> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat ${seat}; to be retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)`

const CONTEXT = `
CONTEXT. Repository ${MAPS} (the PLAT map-module design program; branch claude/focused-cray-qhz855; do NOT commit or push — the manager commits). Host ${HOST} at 81f1cd96, READ-ONLY. The owner has delegated every decision to the session (rulings vetoable). Every file written in this run carries under its title the notice line the task gives. Evidence: cite file:line; tag [STATED]/[OBSERVED]/[INFERRED]; copy no host code.
INPUTS (read before writing): docs/PROGRESS.md rows J377–J384 (the owner's territory rules T1–T3, the religion lens request, the culture and sea ruling J382, and J384's thirteen rulings); research/sf/lens-implications.md WHOLE (the six systems, the per-lens tables §2, the territory term-by-term facts §3, the lens mechanism §4, the host asks §5, the owner questions §6 that J384 now rules); the §8 and §9 sections of research/sf/{faith,alignment,trade,population,prosperity,plague}-system.md; research/sf/fp-realm-review.md (its rulings J-RR.n and its host-change list); docs/AMENDMENTS-2026-10-17m.md and docs/validation/coherence/realm-m.md (file m as APPLIED — the territory sway W8a/W8b, PolityFacts, patrols, the first lens rows; its last item number); docs/volumes/V13-world.md as it now stands (after file m) — especially §3.9 W8, §3.11.6 the port, §5 rendering/labels/exports, §2.2–§2.3 records and rule tables, §8 milestones, §9 decisions, §11 questions; docs/volumes/V14-sites.md (sites, DM secrets, encounters E1–E4); docs/design/proposal-world-native.md §6 as it now stands; docs/AMENDMENTS-2026-10-17l.md (the item form).`

const design = await agent(`${CONTEXT}

YOUR SEAT: the design seat amendments/lens-o (Opus standing in for Fable). Write ${MAPS}/${NFILE} with title "# Amendments o — closing the lens design's completeness gaps", the notice ${NOTICE('amendments/lens-o')}, "Numbered from **838** (file n ended at 837).", the status line "**PENDING APPLICATION**", how to read an item and the clean-room rule exactly as files l, m and n do. Every item quotes its current text ONCE, verified by exact search in the target file AS IT NOW STANDS (after files m and n were applied; V13 is now ~4,216 lines with §5.8 the lens mechanism and §5.9 the eight lenses), and gives the new text in full.
THE ITEMS: close every gap in ${MAPS}/docs/validation/coherence/lens-n-critic.md (fourteen, numbered there) with its stated fix unless a ruling overrides it: gap 6 as ruled in J386 (every new campaign on a native world canonized at birth; re-canonize and retcons stay the premium DM's act; add the decision row, update Q4 and H22; no new owner question — the owner delegated it and J386 rules it); gap 7 as ruled in J386 (option (a): a host fight verdict's hold band alone breaks a debatable tie while the military term is dark, with a lead of at least the military margin in hold units; a test clause and the decision row). Gap 1 (HIGH) carries the owner's own words "the flow of trade/caravans based on individual imports, exports, production, consumption, of goods and services": make production, need, exports, imports, services and food coverage first-class rows of the trade lens, with the LensFacts field, the host ask, the tests and the decision row, reading research/sf/trade-system.md §3, §8 and §9 for the exact host facts and their audience. Gap 2 carries the owner's "local and global diety rankings and a global piety system": the global rank legend, suppressed creeds DM-only and patron falls, reading research/sf/faith-system.md §3, §4, §5 and §9. Gap 13 edits a research bracket in research/sf/fp-realm-review.md, which you may edit directly for that bracket only. Read docs/PROGRESS.md J377–J386 first.
When done append "$(date '+%Y-%m-%d %H:%M') amendments/lens-o LANDED ${NFILE} (opus; J375)" to ${MAPS}/docs/lane-events.log. Return the item numbers with their targets and any quote you could not verify.`, { label: 'design', phase: 'Design' })

if (!design) { log('design failed; stopping'); return { design: null } }

phase('Review')
const REVIEW = { type: 'object', properties: {
  issues: { type: 'array', items: { type: 'object', properties: {
    where: { type: 'string' }, severity: { type: 'string', enum: ['blocking', 'major', 'minor'] }, problem: { type: 'string' }, evidence: { type: 'string' }, fix: { type: 'string' },
  }, required: ['where', 'severity', 'problem', 'evidence', 'fix'] } },
  verdict: { type: 'string' },
}, required: ['issues', 'verdict'] }
const reviews = await parallel([
  () => agent(`${CONTEXT}

YOUR SEAT: adversarial reviewer, HOST-FIDELITY lens, of ${MAPS}/${NFILE}. Check every claim about a host fact by opening the cited host file at the cited line; check that no lens draws a fact the host does not hold (the four-class rule), that every regime and audience statement matches the host's presets and gates, that each host ask is real and correctly scoped, and that nothing forces a simulation change the host has not chosen. Report issues with exact fixes. Default to skepticism.`, { label: 'review:host', phase: 'Review', schema: REVIEW }),
  () => agent(`${CONTEXT}

YOUR SEAT: adversarial reviewer, MAP-ARCHITECTURE lens, of ${MAPS}/${NFILE}. Verify EVERY "Current text" quote by exact search in its target file as it now stands; check numbering (from 838; J-V13 rows after the last), consistency with V13/V14/the proposal/the base after files m and n (records, field names, units, stage names, cross-references), determinism, the clean-room rule for new texts, and that the J384 and J386 rulings are carried exactly. Report issues with exact fixes. Default to skepticism.`, { label: 'review:map', phase: 'Review', schema: REVIEW }),
])
const allIssues = reviews.filter(Boolean).flatMap(r => r.issues)
log(`review issues: ${allIssues.length} (${allIssues.filter(i => i.severity === 'blocking').length} blocking)`)
if (reviews.filter(Boolean).length < 2) { log('a review failed; stopping before revision'); return { design, issues: allIssues.length, revised: null } }

phase('Revise')
const revised = await agent(`${CONTEXT}

YOUR SEAT: the reviser of ${MAPS}/${NFILE} (the notice stays). For each issue below: verify it; fix it in file n when real; leave it and say why when not. Re-verify every "Current text" quote by exact search after your edits. Add at the end of file n a section "Review record" with one row per issue (where, severity, accepted/rejected, what changed or why not). Return a one-line summary per issue and the final item list with targets.

ISSUES:
${JSON.stringify(allIssues, null, 1)}`, { label: 'revise', phase: 'Revise' })
if (!revised) { log('revision failed; stopping before apply'); return { design, issues: allIssues.length, revised: null } }

phase('Apply')
const applied = await agent(`${CONTEXT}

YOUR SEAT: the application seat amendments/lens-o-apply. Apply every item of ${MAPS}/${NFILE} to its target exactly as a coherence pass does (exact match, one occurrence, verbatim replacement; a non-matching quote is NOT APPLIED with the reason, never guessed). Change file o's status line to "**APPLIED** by amendments/lens-o-apply on 2026-10-17 (record: docs/validation/coherence/lens-o.md)" listing any item not applied; write ${MAPS}/docs/validation/coherence/lens-o.md with the notice ${NOTICE('amendments/lens-o-apply')} and one row per item (item, target, heading, applied/not, the new text found once after application); run "python3 tools/bundle_architecture.py" in ${MAPS}; append "$(date '+%Y-%m-%d %H:%M') amendments/lens-o-apply LANDED docs/validation/coherence/lens-o.md (opus; J375)" to docs/lane-events.log. Return the per-item result and the bundle output.`, { label: 'apply', phase: 'Apply' })

phase('Critic')
const critic = await agent(`${CONTEXT}

YOUR SEAT: completeness critic. File o is applied (record docs/validation/coherence/lens-o.md). Check each of the fourteen gaps in docs/validation/coherence/lens-n-critic.md is closed as its fix or J386 says, in the applied texts (not only in file o); check the owner's own words in J380 (trade: imports, exports, production, consumption of goods and services; faith: local and global deity rankings and the global piety system) are now each drawn by a lens row with its host fact; check the applied texts in V13, V14, the proposal, the brief and the base agree with each other after files m, n and o. Report only MATERIAL gaps (a contradiction, an owner word not carried, a rule with no test or decision, a stale statement a builder would follow); return a numbered list with severity and the exact fix, or say plainly that nothing material is missing.`, { label: 'critic', phase: 'Critic' })

return { design, issues: allIssues.map(i => `${i.severity} ${i.where}: ${i.problem.slice(0, 160)}`), revised, applied, critic }
