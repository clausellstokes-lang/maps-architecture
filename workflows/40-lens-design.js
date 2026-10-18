export const meta = {
  name: 'lens-design',
  description: 'Carry the lens mechanism, the seven lenses (plague first), the J384 rulings and the host asks into V13, V14 and the host-change list as amendments n; review, revise, apply, completeness check',
  phases: [
    { title: 'Design', detail: 'one design seat writes amendments n' },
    { title: 'Review', detail: 'host-fidelity and map-architecture adversarial reviews' },
    { title: 'Revise', detail: 'fix every accepted review finding' },
    { title: 'Apply', detail: 'apply file n to its targets, record the application' },
    { title: 'Critic', detail: 'completeness critic' },
  ],
}

const MAPS = '/home/user/maps-architecture'
const HOST = '/home/user/clausellstokes-lang/settlement-engine'
const NFILE = 'docs/AMENDMENTS-2026-10-17n.md'
const NOTICE = (seat) => `> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat ${seat}; to be retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)`

const CONTEXT = `
CONTEXT. Repository ${MAPS} (the PLAT map-module design program; branch claude/focused-cray-qhz855; do NOT commit or push — the manager commits). Host ${HOST} at 81f1cd96, READ-ONLY. The owner has delegated every decision to the session (rulings vetoable). Every file written in this run carries under its title the notice line the task gives. Evidence: cite file:line; tag [STATED]/[OBSERVED]/[INFERRED]; copy no host code.
INPUTS (read before writing): docs/PROGRESS.md rows J377–J384 (the owner's territory rules T1–T3, the religion lens request, the culture and sea ruling J382, and J384's thirteen rulings); research/sf/lens-implications.md WHOLE (the six systems, the per-lens tables §2, the territory term-by-term facts §3, the lens mechanism §4, the host asks §5, the owner questions §6 that J384 now rules); the §8 and §9 sections of research/sf/{faith,alignment,trade,population,prosperity,plague}-system.md; research/sf/fp-realm-review.md (its rulings J-RR.n and its host-change list); docs/AMENDMENTS-2026-10-17m.md and docs/validation/coherence/realm-m.md (file m as APPLIED — the territory sway W8a/W8b, PolityFacts, patrols, the first lens rows; its last item number); docs/volumes/V13-world.md as it now stands (after file m) — especially §3.9 W8, §3.11.6 the port, §5 rendering/labels/exports, §2.2–§2.3 records and rule tables, §8 milestones, §9 decisions, §11 questions; docs/volumes/V14-sites.md (sites, DM secrets, encounters E1–E4); docs/design/proposal-world-native.md §6 as it now stands; docs/AMENDMENTS-2026-10-17l.md (the item form).`

const design = await agent(`${CONTEXT}

YOUR SEAT: the design seat amendments/lens-n (Opus standing in for Fable). Write ${MAPS}/${NFILE} with title "# Amendments n — the map lenses over the host's simulated systems; the J384 rulings", the notice ${NOTICE('amendments/lens-n')}, "Numbered from **<file m's last item + 1>** (file m ended at <its last>).", the status line "**PENDING APPLICATION**", how to read an item and the clean-room rule exactly as file l and file m do (texts entering V13, V14 or the base are implementer inputs: no host source file, function or internal identifier, no other product's identifiers — the host's facts are named by the port's own field names and the adapter's vocabulary tables; host document names, ruling ids and code citations stay in each item's Evidence line). Every item quotes its current text ONCE, verified by exact search in the target file AS IT NOW STANDS (after file m's application), and gives the new text in full.

THE ITEMS TO WRITE (as small as each needs; do not redesign V13):
(A) J382 — if file m as applied lacks it: the sway's culture term reads the host's culture distance (plain form, whole vector) and water is cheap carriage only where the host's sea-lane slot is lit, with coastal footholds; faith has no sea carrier.
(B) J384 (1)–(5), (11) into the sway (W8b) and PolityFacts: prosperity relative to the realm median rung (clamped ±3, read at dated revision events with the 13-week dwell); culture as in (A) banded with the dwell; the push between hostiles defers to the host's settlement-strength order (a PolityFacts field the host sends), the map's projection keeping reach, floor and ceiling; military bands from the host's capacity facets without the economy facet; a drift raid marks the march embattled and moves no line, only a host verdict does; steadings project as members of the parent's realm and leave the parent's size term.
(C) THE LENS MECHANISM as a new V13 section (in §5 rendering, or where the volume's structure fits best): the LensLayer record (identity, sources with gate expressions, regime word, elements with fact class, events, legend, scrub source, refusals, why), the default-preset honesty rule (J384 (13): still mode with the regime banner, collapsed, never hidden or extrapolated), the four-class no-invented-fact rule (host-stored; host-derived only by the host's own exported function, labelled; placement, labelled; owner-ruled map derivation, labelled and offered, never host truth), host vocabulary as adapter data, one-word-one-meaning collisions, polarity normalisation, the audience filter (DM default, fail closed, public facts, believed views only where the host has beliefs; J384 (7) no player view of alignment), the time scrub and the snapshot store (J384 (9): world-document derived cache outside the model digest, one frame per host advance, 520 weeks full then one per 13 weeks, DM-pinned frames kept), with the records and rule-table rows V13's conventions require (§2.2/§2.3 rows, a test row per rule, a decision row J-V13.n per choice).
(D) THE LENSES, each a row set of the mechanism, in J384 (8)'s build order: PLAGUE first (front hop by hop along links with phases and arrival times, footprint mode on unmapped worlds, the still mode; no field; the named realm arcs as dated captions), TERRITORY and PATROLS (the sway's layers from file m, reconciled to the mechanism), TRADE (channels as dated links, caravan arrivals at their settlements, never a caravan mid-road without a host clock; named-traveller journeys with their frozen path and leg clock), POPULATIONS (dated links for netted transfers; clocked columns as moving markers including port and teleport columns per J384 (12), DM-only by default), RELIGION (faith mixture rings on the host's seat areas, pressure along carrier links, the host's religious hierarchy drawn first, J384 (10) DM-placed holy and hidden cult sites only, still mode when spread is off), PROSPERITY (the rung per seat area, booms and busts as dated causes, the upward-drift bias note), ALIGNMENT (DM-only, the host's own alignment function, polarity notes, the born-world bias note). Each lens: what it draws, its regime words, its audience, its scrub source, its refusals.
(E) J384 (6) and every host ask from lens-implications §5 into the host-change list (proposal-world-native §6 or wherever file m moved it): canonize a native world at birth for new campaigns, existing campaigns untouched; the source id on plague arrivals and conversion receipts; a front history; the season in the travel-weeks display; the outcome word on drift raids; the settlement-strength order and capacity facets in PolityFacts; deity id and source on faith mints; the dated events each lens needs. Each with its dependency and order.
(F) V14: J384 (10) — a DM-placed holy site or hidden cult site as a site kind (its card fields, DM-secret default, the deity tag as a map fact, the offer to the host), only if V14 lacks a home for it.
(G) CLOSE THE REALM REVIEW CRITIC'S FIFTEEN GAPS listed in ${MAPS}/docs/validation/coherence/realm-m-critic.md, each with its stated fix unless a later ruling overrides it: gap 4 as ruled in J385 (kSize and kProsperity log-linear; prosperity on J384 (1)'s relative rung, so kProsperity = 1.1^(relative rung) over −3..+3); gap 5 as ruled in J385 (V13 §11 records the ruling, not an open question: the intermediary settlement keeps the gate until the sway's soak; the crossing holder offered later as a per-gate host policy); gap 15 as ruled in J385 (record the bounded deferral in V13 §12); gap 3 makes V13 §8.5 the single host-change list (the review's §5 gets a dated 'superseded by V13 §8.5' bracket — the review note is a research file you may edit for that bracket only); gap 14's bracket goes under research/sf/fp-physical-integration.md §8 (a research file; you may add that dated bracket only). File n's host-change items (E) then extend V13 §8.5's list in place.
When done append "$(date '+%Y-%m-%d %H:%M') amendments/lens-n LANDED ${NFILE} (opus; J375)" to ${MAPS}/docs/lane-events.log. Return the item numbers with their targets and any quote you could not verify.`, { label: 'design', phase: 'Design' })

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

YOUR SEAT: adversarial reviewer, MAP-ARCHITECTURE lens, of ${MAPS}/${NFILE}. Verify EVERY "Current text" quote by exact search in its target file as it now stands; check numbering (from file m's last + 1; J-V13 rows after the last), consistency with V13/V14/the proposal/the base after file m (records, field names, units, stage names, cross-references), determinism, the clean-room rule for new texts, and that the J384 rulings are carried exactly. Report issues with exact fixes. Default to skepticism.`, { label: 'review:map', phase: 'Review', schema: REVIEW }),
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

YOUR SEAT: the application seat amendments/lens-n-apply. Apply every item of ${MAPS}/${NFILE} to its target exactly as a coherence pass does (exact match, one occurrence, verbatim replacement; a non-matching quote is NOT APPLIED with the reason, never guessed). Change file n's status line to "**APPLIED** by amendments/lens-n-apply on 2026-10-17 (record: docs/validation/coherence/lens-n.md)" listing any item not applied; write ${MAPS}/docs/validation/coherence/lens-n.md with the notice ${NOTICE('amendments/lens-n-apply')} and one row per item (item, target, heading, applied/not, the new text found once after application); run "python3 tools/bundle_architecture.py" in ${MAPS}; append "$(date '+%Y-%m-%d %H:%M') amendments/lens-n-apply LANDED docs/validation/coherence/lens-n.md (opus; J375)" to docs/lane-events.log. Return the per-item result and the bundle output.`, { label: 'apply', phase: 'Apply' })

phase('Critic')
const critic = await agent(`${CONTEXT}

YOUR SEAT: completeness critic. File n is applied (record docs/validation/coherence/lens-n.md). Ask what is missing: (1) every J384 ruling (1)–(13) carried, exactly; (2) J382 carried (in file m or n); (3) every lens of J384 (8) specified with draws, regime, audience, scrub, refusals; (4) every host ask of lens-implications §5 either in the host-change list or explicitly declined with the reason; (5) the lens mechanism's rules each with a test row and a decision row; (6) do the applied texts in V13, V14, the proposal and the base agree with each other and with file m's (spot-check the changed sections and their cross-references); (7) anything that should be an owner question. Return a numbered gap list with severity and the exact fix; say plainly if nothing material is missing.`, { label: 'critic', phase: 'Critic' })

return { design, issues: allIssues.map(i => `${i.severity} ${i.where}: ${i.problem.slice(0, 160)}`), revised, applied, critic }
