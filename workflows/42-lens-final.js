export const meta = {
  name: 'lens-final',
  description: 'Close the lens critic\'s fourteen gaps as amendments o (trade economy rows, global deity rank, deferred lenses, dropped rows, culture wording, canon-at-birth, march verdicts, base sync, V14 step, V09 controls, tests); review, revise, apply, completeness check',
  phases: [
    { title: 'Design', detail: 'one design seat writes amendments p' },
    { title: 'Review', detail: 'host-fidelity and map-architecture adversarial reviews' },
    { title: 'Revise', detail: 'fix every accepted review finding' },
    { title: 'Apply', detail: 'apply file p to its targets, record the application' },
    { title: 'Critic', detail: 'completeness critic' },
  ],
}

const MAPS = '/home/user/maps-architecture'
const HOST = '/home/user/clausellstokes-lang/settlement-engine'
const NFILE = 'docs/AMENDMENTS-2026-10-17p.md'
const NOTICE = (seat) => `> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat ${seat}; to be retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)`

const CONTEXT = `
CONTEXT. Repository ${MAPS} (the PLAT map-module design program; branch claude/focused-cray-qhz855; do NOT commit or push — the manager commits). Host ${HOST} at 81f1cd96, READ-ONLY. The owner has delegated every decision to the session (rulings vetoable). Every file written in this run carries under its title the notice line the task gives. Evidence: cite file:line; tag [STATED]/[OBSERVED]/[INFERRED]; copy no host code.
INPUTS (read before writing): docs/PROGRESS.md rows J377–J384 (the owner's territory rules T1–T3, the religion lens request, the culture and sea ruling J382, and J384's thirteen rulings); research/sf/lens-implications.md WHOLE (the six systems, the per-lens tables §2, the territory term-by-term facts §3, the lens mechanism §4, the host asks §5, the owner questions §6 that J384 now rules); the §8 and §9 sections of research/sf/{faith,alignment,trade,population,prosperity,plague}-system.md; research/sf/fp-realm-review.md (its rulings J-RR.n and its host-change list); docs/AMENDMENTS-2026-10-17m.md and docs/validation/coherence/realm-m.md (file m as APPLIED — the territory sway W8a/W8b, PolityFacts, patrols, the first lens rows; its last item number); docs/volumes/V13-world.md as it now stands (after file m) — especially §3.9 W8, §3.11.6 the port, §5 rendering/labels/exports, §2.2–§2.3 records and rule tables, §8 milestones, §9 decisions, §11 questions; docs/volumes/V14-sites.md (sites, DM secrets, encounters E1–E4); docs/design/proposal-world-native.md §6 as it now stands; docs/AMENDMENTS-2026-10-17l.md (the item form).`

const design = await agent(`${CONTEXT}

YOUR SEAT: the design seat amendments/lens-p (Opus standing in for Fable). Write ${MAPS}/${NFILE} with title "# Amendments p — the lens design's last six gaps", the notice ${NOTICE('amendments/lens-p')}, "Numbered from **878** (file o ended at 877).", the status line "**PENDING APPLICATION**", how to read an item and the clean-room rule exactly as files l–o do. Every item quotes its current text ONCE, verified by exact search in the target AS IT NOW STANDS (after files m, n and o), and gives the new text in full.
THE ITEMS: close the six gaps in ${MAPS}/docs/validation/coherence/lens-o-critic.md with their stated fixes, and: gap 1 as J387 rules it (docs/PROGRESS.md J387): strike every hedge that hands the birth canon back to the host's entitlement choice (H22, J-V13.100, the §11 ruling, the brief's two '(its choice)' and add the brief's Q4 note) and state it as the product ruling the host implements — the owner owns both products and delegated the call; do NOT take the critic's alternative. Gap 2: the base item adding the plate cache line to the Document beside 'derived'; then a short 'pending BCR ledger' paragraph is NOT an item (J387 records it). Gap 5: fix the milestone text in docs/volumes/INDEX.md (lines ~39, ~109, ~133, ~147, ~248) and docs/volumes/SUMMARY.md (~113, ~184) as items, so M-W5 and the new totals appear — read each line first. Read docs/PROGRESS.md J384–J387 first.
When done append "$(date '+%Y-%m-%d %H:%M') amendments/lens-p LANDED ${NFILE} (opus; J375)" to ${MAPS}/docs/lane-events.log. Return the item numbers with their targets and any quote you could not verify.`, { label: 'design', phase: 'Design' })

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

YOUR SEAT: adversarial reviewer, MAP-ARCHITECTURE lens, of ${MAPS}/${NFILE}. Verify EVERY "Current text" quote by exact search in its target file as it now stands; check numbering (from 878; J-V13 rows after the last), consistency with V13/V14/the proposal/the base after files m, n and o (records, field names, units, stage names, cross-references), determinism, the clean-room rule for new texts, and that the J384, J386 and J387 rulings are carried exactly. Report issues with exact fixes. Default to skepticism.`, { label: 'review:map', phase: 'Review', schema: REVIEW }),
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

YOUR SEAT: the application seat amendments/lens-p-apply. Apply every item of ${MAPS}/${NFILE} to its target exactly as a coherence pass does (exact match, one occurrence, verbatim replacement; a non-matching quote is NOT APPLIED with the reason, never guessed). Change file p's status line to "**APPLIED** by amendments/lens-p-apply on 2026-10-17 (record: docs/validation/coherence/lens-p.md)" listing any item not applied; write ${MAPS}/docs/validation/coherence/lens-p.md with the notice ${NOTICE('amendments/lens-p-apply')} and one row per item (item, target, heading, applied/not, the new text found once after application); run "python3 tools/bundle_architecture.py" in ${MAPS}; append "$(date '+%Y-%m-%d %H:%M') amendments/lens-p-apply LANDED docs/validation/coherence/lens-p.md (opus; J375)" to docs/lane-events.log. Return the per-item result and the bundle output.`, { label: 'apply', phase: 'Apply' })

phase('Critic')
const critic = await agent(`${CONTEXT}

YOUR SEAT: completeness critic. File p is applied (record docs/validation/coherence/lens-p.md). Check each of the six gaps in docs/validation/coherence/lens-o-critic.md is closed in the applied texts as its fix or J387 says; check that no text anywhere still hands the birth canon to a host entitlement choice; check V13, V14, the proposal, the brief, the base, INDEX.md and SUMMARY.md agree after files m–p. Report only MATERIAL gaps with severity and the exact fix, or say plainly that nothing material is missing.`, { label: 'critic', phase: 'Critic' })

return { design, issues: allIssues.map(i => `${i.severity} ${i.where}: ${i.problem.slice(0, 160)}`), revised, applied, critic }
