// [Fable-reviewed 2026-10-18 (lane retrovalidation/scripts; J392): this script ran as J389 records; its prompt text stays as fed. Corrections to it: line 20 (CONTEXT, copied from 40:20) says "rows J377–J384 … (after file m)" — for this run the inputs were rows J377–J388 and V13 after files m–p (the design prompt at line 25 says so; the reviewer, apply and critic seats received only CONTEXT); line 52 (reviser) says "fix it in file n … at the end of file n" — the reviser's file is ${NFILE} = file q (its Review record stands in file q).]
export const meta = {
  name: 'lens-q',
  description: 'Close the last three lens gaps as amendments q (the canonize wording in the base and volumes, the additive re-canonize per J388, the owner question Q4 surfaced in the index and summary); review, revise, apply, completeness check',
  phases: [
    { title: 'Design', detail: 'one design seat writes amendments q' },
    { title: 'Review', detail: 'host-fidelity and map-architecture adversarial reviews' },
    { title: 'Revise', detail: 'fix every accepted review finding' },
    { title: 'Apply', detail: 'apply file q to its targets, record the application' },
    { title: 'Critic', detail: 'completeness critic' },
  ],
}

const MAPS = '/home/user/maps-architecture'
const HOST = '/home/user/clausellstokes-lang/settlement-engine'
const NFILE = 'docs/AMENDMENTS-2026-10-17q.md'
const NOTICE = (seat) => `> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat ${seat}; to be retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)`

const CONTEXT = `
CONTEXT. Repository ${MAPS} (the PLAT map-module design program; branch claude/focused-cray-qhz855; do NOT commit or push — the manager commits). Host ${HOST} at 81f1cd96, READ-ONLY. The owner has delegated every decision to the session (rulings vetoable). Every file written in this run carries under its title the notice line the task gives. Evidence: cite file:line; tag [STATED]/[OBSERVED]/[INFERRED]; copy no host code.
INPUTS (read before writing): docs/PROGRESS.md rows J377–J384 (the owner's territory rules T1–T3, the religion lens request, the culture and sea ruling J382, and J384's thirteen rulings); research/sf/lens-implications.md WHOLE (the six systems, the per-lens tables §2, the territory term-by-term facts §3, the lens mechanism §4, the host asks §5, the owner questions §6 that J384 now rules); the §8 and §9 sections of research/sf/{faith,alignment,trade,population,prosperity,plague}-system.md; research/sf/fp-realm-review.md (its rulings J-RR.n and its host-change list); docs/AMENDMENTS-2026-10-17m.md and docs/validation/coherence/realm-m.md (file m as APPLIED — the territory sway W8a/W8b, PolityFacts, patrols, the first lens rows; its last item number); docs/volumes/V13-world.md as it now stands (after file m) — especially §3.9 W8, §3.11.6 the port, §5 rendering/labels/exports, §2.2–§2.3 records and rule tables, §8 milestones, §9 decisions, §11 questions; docs/volumes/V14-sites.md (sites, DM secrets, encounters E1–E4); docs/design/proposal-world-native.md §6 as it now stands; docs/AMENDMENTS-2026-10-17l.md (the item form).`

const design = await agent(`${CONTEXT}

YOUR SEAT: the design seat amendments/lens-q (Opus standing in for Fable). Write ${MAPS}/${NFILE} with title "# Amendments q — the canonize wording, the additive re-canonize and the owner question Q4", the notice ${NOTICE('amendments/lens-q')}, "Numbered from **897** (file p ended at 896).", the status line "**PENDING APPLICATION**", how to read an item and the clean-room rule exactly as files l–p do. Every item quotes its current text ONCE, verified by exact search in the target AS IT NOW STANDS (after files m–p), and gives the new text in full.
THE ITEMS: close the three gaps in ${MAPS}/docs/validation/coherence/lens-p-critic.md with their stated fixes: gap 1 (the base's §11.4 and §7.7, V13's W-PORT row and H8, the proposal and the brief: 'receipted re-canonize' becomes 'receipted canonize (the birth canon or a re-canonize)' — and add BCR-V13-40 to V13 §10 for the base's wording); gap 2 as J388 rules it (docs/PROGRESS.md J388: the additive re-canonize on a founding event, never gated by the premium entitlement, scoped to the seats bound since the last canon and the seat territories their binding re-derives over the dirty landmass, a geometry version step with receipts, neighbours' band crossings reported; a re-canonize shifting other geometry and a retcon stay premium) into H22, J-V13.100, V13 §11's ruling and the brief's Part C, with a test clause; gap 3 (INDEX and SUMMARY: the V13 owner-question rows Q1, Q2 restated as V13 §11 now has them, Q4 added as the owner's own word NOT delegated, the counts 'seven' to 'eight' and 'thirty-two' to 'thirty-three', SUMMARY's plain-language line for Q4, INDEX's state lines for file k applied (J376) and files m–p applied, and the BCR census line) — read every target line first; the critic's line numbers are approximate. Read docs/PROGRESS.md J384–J388 first.
When done append "$(date '+%Y-%m-%d %H:%M') amendments/lens-q LANDED ${NFILE} (opus; J375)" to ${MAPS}/docs/lane-events.log. Return the item numbers with their targets and any quote you could not verify.`, { label: 'design', phase: 'Design' })

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

YOUR SEAT: adversarial reviewer, MAP-ARCHITECTURE lens, of ${MAPS}/${NFILE}. Verify EVERY "Current text" quote by exact search in its target file as it now stands; check numbering (from 897; J-V13 rows after the last), consistency with V13/V14/the proposal/the base after files m–p (records, field names, units, stage names, cross-references), determinism, the clean-room rule for new texts, and that the J384, J386, J387 and J388 rulings are carried exactly. Report issues with exact fixes. Default to skepticism.`, { label: 'review:map', phase: 'Review', schema: REVIEW }),
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

YOUR SEAT: the application seat amendments/lens-q-apply. Apply every item of ${MAPS}/${NFILE} to its target exactly as a coherence pass does (exact match, one occurrence, verbatim replacement; a non-matching quote is NOT APPLIED with the reason, never guessed). Change file q's status line to "**APPLIED** by amendments/lens-q-apply on 2026-10-17 (record: docs/validation/coherence/lens-q.md)" listing any item not applied; write ${MAPS}/docs/validation/coherence/lens-q.md with the notice ${NOTICE('amendments/lens-q-apply')} and one row per item (item, target, heading, applied/not, the new text found once after application); run "python3 tools/bundle_architecture.py" in ${MAPS}; append "$(date '+%Y-%m-%d %H:%M') amendments/lens-q-apply LANDED docs/validation/coherence/lens-q.md (opus; J375)" to docs/lane-events.log. Return the per-item result and the bundle output.`, { label: 'apply', phase: 'Apply' })

phase('Critic')
const critic = await agent(`${CONTEXT}

YOUR SEAT: completeness critic. File q is applied (record docs/validation/coherence/lens-q.md). Check the three gaps in docs/validation/coherence/lens-p-critic.md are closed in the applied texts as their fixes or J388 say; check no text still lets the canon in only by a premium or DM-confirmed act for a new campaign; check Q4 is asked of the owner wherever the owner reads decisions (V13 §11, INDEX, SUMMARY, the brief) and nowhere claimed as delegated. Report only MATERIAL gaps that would make a builder build the wrong thing, with severity and the exact fix, or say plainly that nothing material is missing.`, { label: 'critic', phase: 'Critic' })

return { design, issues: allIssues.map(i => `${i.severity} ${i.where}: ${i.problem.slice(0, 160)}`), revised, applied, critic }
