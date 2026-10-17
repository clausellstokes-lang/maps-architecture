export const meta = {
  name: 'realm-review',
  description: 'Review SettlementForge FP simulator against the native world regime: find seam gaps per dimension, verify adversarially, synthesize review + amendments m, review, revise, apply, completeness check',
  phases: [
    { title: 'Find', detail: 'seven analysts, one per dimension of the simulator-map seam' },
    { title: 'Verify', detail: 'one skeptic per dimension, refute-by-default against host and map sources' },
    { title: 'Synthesize', detail: 'the review note and amendments file m' },
    { title: 'Review', detail: 'host-fidelity and map-architecture adversarial reviews' },
    { title: 'Revise', detail: 'fix every accepted review finding' },
    { title: 'Apply', detail: 'apply file m to its targets, record the application' },
    { title: 'Critic', detail: 'completeness critic over the whole result' },
  ],
}

const A = args || {}
const SCR = A.scratch
const NOTICE = (seat) => `> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat ${seat}; to be retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)`

const CONTEXT = `
CONTEXT (shared by every seat in this run). Repository: /home/user/maps-architecture (the PLAT map-module design program; branch claude/focused-cray-qhz855; do NOT commit or push — the manager commits). Host repository: /home/user/clausellstokes-lang/settlement-engine at origin/master 81f1cd96, READ-ONLY (never write there). The owner asked: "comprehensively read and review [SettlementForge's] simulator (as designed and architected with the full FP architecture) and understand how we plan to integrate the physical dimensions of the map into the simulator of itself to better refine your approach to the FMG / the realm integration." The owner has delegated every decision to the session (rulings are vetoable). Model ruling J375: every file written in this run carries, directly under its title, the notice line the task gives you.

Two research notes already landed and are your primary inputs — read both WHOLE before anything else:
- research/sf/fp-simulator.md (1,098 lines): the FP simulator's model, laws (requirements 15–24 of the coherence fold, war-program laws, "genesis is sacred", one-way flows, determinism, ledger discipline) and every map-touching ruling (OD-FC-22 kmScale from the map's exported distanceScale+distanceUnit with FMG's default unit miles; OD-FC-18 genesis route network at world birth; OD-FC-28; OD-FC-38 the settlement-map fabric program MF is out of FP and belongs to the map family; etc.).
- research/sf/fp-physical-integration.md (~485 lines): THE PHYSICAL-QUANTITY LEDGER (80 rows, ids D*, T*, E*, W*, R*, A*, S*, L*, C*, M*), the fabric volume's three laws, the port rule of Phase 5.5 §4j, the propagation layer, every statement of intent about the substrate's future source, and §8 mapping each row to the map engine's FrameCharter and WorldPort (SUPPLIED / PARTLY / MISSING / NONE-OWED). Note the assembler's count correction under its §1.
Also available: research/fmg/notes/sf-host-fmg-integration-audit.md (the earlier audit of the host's vendored FMG fork, bridge, frozen spatial digest), research/fmg/FMG-survey.md.

The map engine's side (what is being refined): docs/volumes/V13-world.md (the world regime volume: §1.3 owner corrections, §1b record/entity tables, §2.2 records incl. FrameCharter and Placement around lines 400–560, §2.3 rule tables, §2.5 identity, §2.8 MapImport, §3.8 W7 routes, §3.9 W8 polity, §3.11 P1–P5 placement incl. §3.11.6 the WorldPort at ~line 1659, §3.15 the import adapter, §4.1 edit events, §5.4 exports, §8.5 the host's parallel track, §9 decisions J-V13.n, §11 owner questions); docs/design/proposal-world-native.md (§5 the boundary record, §6 the eight host changes, §7 import); docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md (the contract-first brief: identity §2, contracts §3, gate §4, bars §8); docs/ARCHITECTURE.md (the base; its §7.7 and §14 hold the dossier port, HostContext and the never-read list — find them by grep); docs/volumes/V14-sites.md (sites; the settlement-first rule's site side); docs/volumes/critique/V13.md and seam-world-sites-r0.md. Identity ruling already made: the map module is a persistent world-state materializer; the host owns political facts, the map module owns the world regime; host→map flow of political facts and a one-way derived-facts port back; the FrameCharter boundary record per frame; settlement-first placement (the world autocorrects around an existing settlement; the settlement map never changes; a coast mismatch is resolved by bearing first, the world's blend second); "genesis is sacred" for existing campaigns. The M0 kernel (plat/packages/kernel, integer-cm planar subdivision) is about to freeze; anything that would touch it must be flagged.

Evidence discipline: cite file:line (host paths relative to the settlement-engine root; map paths relative to /home/user/maps-architecture). Tag claims [STATED] (a document says it), [OBSERVED] (code or git), [INFERRED] (your reasoning, given). Describe in your own words; copy no host code. Read sources rather than trusting the notes when a finding depends on a detail.`

const FINDINGS = {
  type: 'object',
  properties: {
    dimension: { type: 'string' },
    readNotes: { type: 'string', description: 'what you read beyond the two notes, with line counts, and anything you could not read' },
    findings: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string', description: 'dimension prefix + number, e.g. DT-1' },
          title: { type: 'string' },
          hostEvidence: { type: 'string', description: 'what the host designs/builds/rules, with citations and tags' },
          mapSideNow: { type: 'string', description: 'what V13/proposal/brief/base currently say, with citations; or "silent"' },
          gap: { type: 'string', description: 'the mismatch, omission or risk, concretely' },
          refinement: { type: 'string', description: 'the concrete change to the map design or to the host-change list; as specific as a record field, a message, a rule or a sentence of law' },
          alternativesRejected: { type: 'string', description: 'the other ways considered and why not' },
          targets: { type: 'array', items: { type: 'string' }, description: 'file + section that would change, e.g. "docs/volumes/V13-world.md §3.11.6"' },
          kind: { type: 'string', enum: ['port', 'charter', 'world-stage', 'frame', 'host-change', 'import', 'owner-question', 'base', 'other'] },
          touchesM0: { type: 'boolean' },
          severity: { type: 'string', enum: ['blocking', 'major', 'minor'] },
          ledgerRows: { type: 'array', items: { type: 'string' }, description: 'ids from the physical-quantity ledger this covers' },
        },
        required: ['id', 'title', 'hostEvidence', 'mapSideNow', 'gap', 'refinement', 'targets', 'kind', 'touchesM0', 'severity'],
      },
    },
  },
  required: ['dimension', 'findings', 'readNotes'],
}

const VERDICTS = {
  type: 'object',
  properties: {
    verdicts: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'string' },
          verdict: { type: 'string', enum: ['confirmed', 'amended', 'refuted'] },
          reason: { type: 'string', description: 'what you checked (file:line) and what you found' },
          correctedFinding: { type: 'string', description: 'when amended: the corrected gap and refinement in full' },
        },
        required: ['id', 'verdict', 'reason'],
      },
    },
    missed: { type: 'array', items: { type: 'string' }, description: 'gaps in this dimension the analyst missed, each with evidence and a proposed refinement' },
  },
  required: ['verdicts', 'missed'],
}

const DIMS = [
  { key: 'DT', name: 'distance, travel time and scale', brief: `The datum that makes travel absolute: spatialDigest.kmScale (km per map-coordinate unit) — written by nobody today; OD-FC-22 (kmScale from the map's exported distanceScale+distanceUnit at canonization; DEFAULT_KM_SCALE 3 meant miles, ≈4.83 km; the constant a km fallback on the tuning roster); the normalised hopWeeks/calibration read vs the dark absolute arm (distanceRead.js, modeSpeeds.js); the WY-1 mode-speed table (OD-FC-28; foot/cart/river/coastal/sea km per week); law M (no named person faster than one week per leg); the realm spanning 2–8 march weeks; the hopWeeks banding trap (DESIGN_FP_ARCH_WC.md §5.3 / WY hazard sections) — small geometry changes flip bands; realmReach with zero consumers; the glossary split between kmScale "the world scale" and the town map's viewMetersPerUnit; MF-5 the true scale bar. Ledger rows D1–D16 especially. Decide: what exact scale datum and unit the port states and in which frame (the charter is in integer cm, the host wants km per ITS map unit); whether the port should emit a travel-time product (weeks by mode and season between seats) or leave the host's calibration as is; how the miles legacy converts for imported worlds; how a DM edit that moves a road is prevented from silently crossing a week band; whether anything here belongs in the base or the M0 kernel (expect not).` },
  { key: 'RL', name: 'routes and their lifecycle', brief: `OD-FC-18 (the genesis route network created at world birth from the generation path, never from the pulse; nothing calls it today so the migration menu is empty); host docs/DESIGN_ROUTE_LIFECYCLE.md laws 1–6 (digest frozen; route network a side ledger; genesis is sacred — generation-time access frozen, lived network grows on top, divergence never flows back; nothing is forgotten; ports totality), user-created routes (realm directive 3, J-D3 CREATE_ROUTE), bypass geometry (R4), the hidden rung (M4), route capacities (C2), carrier-specific candidate route sets chosen at dispatch (R7), route receipts (R6, T2); PHASE55's frozen-vs-live law. Map side: V13 §3.8 W7 (Urquhart graph, A* in a cost ellipse, W7a/W7b), the port's routes(world) and costLaw(world, law), V13 §4.1 route edits, the settlement-map fabric's §15.2 regional route skeleton from the route ledger's arterial seeds and MF-3 exit-road bearings. Decide: how the map's W7 output becomes the host's genesis network at world birth (one frozen birth record, versioned), how later world edits to routes reach the host (dated events vs re-canonize vs erratum per fold requirement 22), whether the map engine should carry the lived network's geometry (bypass, hidden rung, user routes drawn by the DM) or only the genesis network, and who owns the cost law.` },
  { key: 'PS', name: 'the port shape, the digest and versioning', brief: `The host's frozen spatial digest (positions, adjacency/gates, an integer all-pairs cost matrix, tiers, receipts, water predicates, optional kmScale, reserved slots) is read every tick and never written by the simulation; the §8 mapping found the port supplies settlement-scale facts richly but not the realm-graph products (D1 matrix, A2 gates, D10 tiers, T2 receipts, R7 candidate sets, C2 capacities, M4 hidden rung). Two readings: the port emits those products in the host's cost law, or the host keeps building its digest from what the port returns (then it needs territory and route cell sequences the port withholds: "the host reads derived facts; it never reads arenas"). Also: the fold's TIER line (aspatial-safe / spatial canon / belief infoMode), requirement 17 (every wave declares its tier and a fallback), 20 (provenance adoption, every child receipt records its cause), 21 (one coupling layer per program; one meaning per word — check vocabulary collisions such as port, charter, tier, crossing, route, territory, seat, between the host glossary and V13), 22 (ten lifecycle paths, errata same commit), 23 (history rings declare horizons); the phantom-settlement policy L10(c); re-canonize carrying kmScale; the digest's immutable canon-version semantics; the nine one-way flow directions; three version axes (geometry, cost law, overlay). Map side: V13 §3.11.6 messages, §2.7 format version, proposal §6 items 1–8, V13 §8.5, the brief's identity and contracts. Decide the port's shape: what is a simulator feed (aspatial-safe graph products) vs a map feed (geometry), who computes the matrix, how versions ride, how the port honours each fold requirement.` },
  { key: 'WS', name: 'water, ports, seasons and climate', brief: `PHASE55 §4j the PORT rule (PORT = geography ∧ institutions; derived at digest build; re-derived on founding events through a receipted re-canonize; geography necessary, institutions sufficient; the sea/river edge set a sibling slot materialised only with ≥2 eligible ports; sea cost 12 vs land ~90–1,560; capacity 10; storm season ×2.5 in winter, never severs), the ports-totality invariant, ocean vs lake guessed from a bounding box, river navigability from a flux band, the seasonal overlay in spatialCost, sea-lane storm seasons, the naval layer and blockade, CLIMATE_BAND_VERSION and the biome vocabulary, wind absent in the host, the fabric's downwind/downstream siting. Map side: V13 water surfaces as records (WaterSurface kinds, Reach with discharge/width/stage/navigable), the water class test, the charter's waterEdges/riverCrossings/climate (tempDeciC, seasonAmpDeciC, seasonPhaseWeek, precipMm, evapMm, wind), SettlementMapRecord.port, V13 §3.12–§3.13, the owner's rule that time of day is not a parameter while seasons are. Decide: which half of the port rule the map supplies and in what form; whether the port emits seasonal modifiers (frozen rivers, flood stage, snowbound passes, storm seasons) as week tables and who owns them; lake vs sea truth; navigability per mode; and how a DM water edit (flooding, draining) reaches the simulator.` },
  { key: 'SF', name: 'the settlement frame and the fabric program', brief: `Read host docs/DESIGN_FP_ARCH_MF.md whole (486 lines) and docs/DESIGN_SETTLEMENT_MAP.md §0–§2 and lines 340–386 and docs/DESIGN_TOWN_CARTOGRAPHY.md headings. The fabric program is now the map family's (OD-FC-38). Its laws: §0.0 decision rule (history vs best product; implementation risk never a veto), §5.-1 terrain-first (a layer-zero local heightfield reading the whole dossier; sites found not placed; polycentric subseed; bounded rolls; terraforming with the visible-work rule), §5.-1c forced-fact reconciliation (a constraint solver over landform families; precedence user-truth > state > tier > terrain-plausibility > jitter), §5.0 morphology, the district-organism law; MF-3 true exit-road bearings from the digest; §164a neighbour-edge annotations on the true bearing only when a campaign link exists; MF-5 the true scale bar; §15.2 the arterial seeds; MF-R2 the audience-surviving fork base; "zero simulation-engine changes; zero persisted-state changes"; the realm-coherence law of DESIGN_SETTLEMENT_MAP 356–358 ("the town site is a zoom-in of its realm position, never a contradiction of it"); the EP census's town-map "Reroll layout" being a counter not a seed. Map side: the base's settlement generator S0–S7 (docs/ARCHITECTURE.md §4.2; S1 takes the charter as its one input record), V13's FrameCharter, settlement-first placement and the coherence cost/bearing search, the blend band, V14's site adoption. Decide: how each fabric law maps onto the map engine's settlement generator (adopt, already present, conflicts), where world-charter facts rank in the forced-fact precedence for (a) a settlement generated from a world placement and (b) a settlement that predates its placement, how MF-3 bearings and MF-5 scale are sourced (charter vs digest), and what the map engine must persist that MF says it never persists.` },
  { key: 'BA', name: 'belief, audience, determinism and time', brief: `K3 (no negotiation reads true world state; loud public facts excepted once news travels); believed state per observer in the belief map; belief only when canonized and infoMode not omniscient (three of seven presets); the knownWorld module and believed route danger ("route by the known picture"); the advance epoch EP (fresh random per user advance, recorded; undo-and-advance differs, replay exact); "a seed is a starting world, forever; a lived history, once lived, forever"; the world map's "Regenerate the world" draws fresh but records nothing from the FMG iframe; requirement 24 the hearing week (docket at one-week advances); DM decrees at the head of every tick; multi-tick advances collapse history; requirement 16 (first visible sign within a one-month advance); requirement 19 (a DM-felt sentence); the engagement registry (31 kinds; every card names "where": roads, wall, border, host settlement, besieged towns). Map side: V13's clock(world, week) view command and events(world, events) dated-facts message and worldFactsAt; the two edit verbs ("this happened" vs "this was always so"); the counterfactual fork; DM secrets toggle and audience; the visual history of edits; V14 sites' DM secrets. Decide: whether the world needs a per-audience known-world view fed by the host's belief facts and how (without the map reading true-vs-believed itself); how map determinism and seeds align with EP and the host's seed law; how the host's dated events (razings, sieges, fires) become visible on the world and at which latency; how the engagement registry's "where" resolves to world places; how the map's edit verbs align with the host's lifecycle/errata paths.` },
  { key: 'TI', name: 'transition, import, modalities and scope', brief: `Close the reading gaps both notes declared: read host docs/PHASE55_EXECUTION_PLAYBOOK.md (the spatial engine's constitution; unread so far), docs/DESIGN_FMG_WEAVE.md (unread), docs/DESIGN_REALM_DIRECTIVES.md where it touches the map, and docs/DESIGN_MAP_DOORS.md. Then: existing campaigns' FMG snapshots (the host's fork is v1.114.2; V13 §3.15 says the adapter reads ≥1.152 full JSON; C13-38 says stored 1.114.2 snapshots are opened and exported once in the fork and imported once) — check the version facts and the plan; the existing frozen digests (keep vs re-canonize; kmScale for old worlds in miles); the geometry-version bump; OD-FC-17 / ODQ §764 (the map module as the owner's one post-launch item) and what it implies for sequencing; teleport edges authored in the digest (M1), the airship aerial field (M2), line of sight absent everywhere (L1) and whether V14 watchtowers or V13 need a viewshed; magic gate (M5). Decide: the transition plan for existing campaigns step by step, what the host must keep during transition, and any scope or sequencing correction to V13 §8.5, proposal §6 item 7–8 and the brief's order and timing.` },
]

phase('Find')
const results = await pipeline(
  DIMS,
  (d) => agent(`${CONTEXT}

YOUR SEAT: analyst for the dimension "${d.name}" (prefix ${d.key}). Read the two notes whole first, then the map-side sections and host sources this dimension needs. Produce every finding where the map engine's design (V13, the proposal, the brief, the base) is silent, wrong, thinner than the host needs, or in tension with a host law or ruling — and every refinement that would make the realm integration better. Be exhaustive within your dimension; aim for depth, not volume; a finding the map side already covers correctly is not a finding (say so in readNotes). For each refinement give the concrete change and the alternatives you rejected.

Dimension brief: ${d.brief}`, { label: `find:${d.key}`, phase: 'Find', schema: FINDINGS }),
  (found, d) => found ? agent(`${CONTEXT}

YOUR SEAT: adversarial verifier for the dimension "${d.name}". An analyst produced the findings below. For EACH finding, try to refute it: open the cited host and map files at the cited lines and check (1) the host evidence is real and read correctly, (2) the map side really is silent or wrong as claimed (search V13, the proposal, the brief and the base — many things are already covered somewhere), (3) the refinement obeys the host's laws (genesis is sacred, the digest is frozen, one-way flows, K3, the TIER line, requirements 15–24) and the map's identity ruling and settlement-first rule, and is the best of the alternatives. Default to refuted when the evidence does not hold. Use "amended" when the gap is real but the refinement or evidence needs correcting, and give the corrected finding in full. Then list anything in this dimension the analyst missed, with evidence.

FINDINGS:
${JSON.stringify(found, null, 1)}`, { label: `verify:${d.key}`, phase: 'Verify', schema: VERDICTS }).then(v => ({ dim: d.key, name: d.name, found, verdicts: v })) : null,
)

const usable = results.filter(Boolean)
const dropped = DIMS.filter(d => !usable.find(u => u.dim === d.key)).map(d => d.key)
if (dropped.length) log(`dimensions with no result: ${dropped.join(', ')}`)
const surviving = usable.map(u => {
  const vmap = {}
  for (const v of (u.verdicts && u.verdicts.verdicts) || []) vmap[v.id] = v
  const kept = u.found.findings.filter(f => !vmap[f.id] || vmap[f.id].verdict !== 'refuted').map(f => ({ ...f, verification: vmap[f.id] || { verdict: 'unverified' } }))
  const refuted = u.found.findings.filter(f => vmap[f.id] && vmap[f.id].verdict === 'refuted').map(f => ({ id: f.id, title: f.title, reason: vmap[f.id].reason }))
  return { dim: u.dim, name: u.name, readNotes: u.found.readNotes, kept, refuted, missed: (u.verdicts && u.verdicts.missed) || [] }
})
const counts = surviving.map(s => `${s.dim}: ${s.kept.length} kept, ${s.refuted.length} refuted, ${s.missed.length} missed`).join('; ')
log(counts)

phase('Synthesize')
const synth = await agent(`${CONTEXT}

YOUR SEAT: the synthesis seat research/sf-fp-realm-review (the manager's seat for this review; Opus standing in for Fable). Below are the verified findings of seven dimensions (refuted ones listed with reasons so you do not resurrect them; "missed" items from the verifiers are new findings you must weigh). Your job: turn them into the refined approach to the FMG / realm integration, and write two files.

FILE 1: research/sf/fp-realm-review.md. Under the title put exactly: ${NOTICE('research/sf-fp-realm-review')}
Sections: §1 the simulator in one page (what it is, how it advances, what it reads — cite the two notes, do not restate them); §2 how the map's physical dimensions enter the simulator today, per the host's design, and per our design after this review (a short table by quantity family); §3 the findings, merged and deduplicated across dimensions, each with id RR-n, evidence, gap, the ruled refinement and its targets; §4 the refined approach as rulings, each a row "J-RR.n | chose X over Y because Z" (vetoable under the delegation) — this is the heart: the port's shape (simulator feed vs map feed), the scale datum, the genesis route network at world birth and route changes after it, the port rule's halves, seasons, the settlement frame and the fabric laws (including where world-charter facts rank in the forced-fact precedence for a frame generated from a placement vs one that predates it), belief/audience, determinism and time, the transition for existing campaigns; §5 the refined host-change list that SUPERSEDES proposal-world-native §6's eight items: numbered, each naming the host program/document/law it touches, what changes, what it depends on (map milestone M-W0h/M-W1/... from V13 §8), and its order; §6 the owner questions that remain (only those genuinely the owner's); §7 the M0 impact statement (does any refinement touch the frozen kernel or the M0 gate rows K1–K13/M1–M11 of plat/docs/build/M0-world-sites-gate.md? if yes, exactly what); §8 what stays PLAUSIBLE and how it would be confirmed; §9 sources.

FILE 2: docs/AMENDMENTS-2026-10-17m.md — the amendment file that carries the refinements into the map design's own documents. Read docs/AMENDMENTS-2026-10-17l.md's header and two items first and follow that form exactly: title "# Amendments m — <subject>", the notice line ${NOTICE('amendments/realm-m')}, "Numbered from **659** (file l ended at 658).", a status line "**PENDING APPLICATION**" (the apply seat will change it), how to read an item, the clean-room rule for new texts (texts entering docs/ARCHITECTURE.md or the volumes are implementer inputs: name no host source file, function or internal identifier and no other product's identifiers; the host's document names, rulings ids and product names stay in each item's Evidence line), then items grouped by target file in section order. Each item: bold number and title; *Requests:* the RR ids; *Current text:* the exact text quoted ONCE — verify every quote by exact search in the target file (use grep -F or python) before you write it; quotes wrapping a line marked ⏎ as file l does — then *New text:* in full; *Evidence:* the note sections and host citations. Targets: docs/volumes/V13-world.md (the port §3.11.6, the charter §2.2, W7 §3.8, edits §4.1, §8.5, §9 decisions — add J-V13 rows only if a volume decision changes, numbered after the volume's last J-V13 row — §11 questions), docs/design/proposal-world-native.md §5–§6 (§6 replaced by a pointer to the review's §5 or by the new list), docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md where its host track or order changes, docs/volumes/V14-sites.md only if a site rule changes, and docs/ARCHITECTURE.md ONLY where the base itself is wrong (its §7.7/§14 port and never-read list) — prefer volume-level changes; every base item must say so in its title.

Rules: every ruling must respect the identity ruling, settlement-first placement, "genesis is sacred", the frozen digest, one-way flows, K3 and the TIER line, unless you explicitly rule an exception with the reason. Keep refinements as small as the gap needs; do not redesign V13. Do not touch the M0 kernel. When done append "$(date '+%Y-%m-%d %H:%M') research/sf-fp-realm-review LANDED research/sf/fp-realm-review.md docs/AMENDMENTS-2026-10-17m.md (opus; J375)" to docs/lane-events.log. Return: the RR count, the J-RR rulings in one line each, the amendment item numbers with their targets, and any quote you could not verify.

VERIFIED FINDINGS BY DIMENSION:
${JSON.stringify(surviving, null, 1)}`, { label: 'synthesize', phase: 'Synthesize' })

phase('Review')
const REVIEW = {
  type: 'object',
  properties: {
    issues: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          where: { type: 'string', description: 'file + section/item number' },
          severity: { type: 'string', enum: ['blocking', 'major', 'minor'] },
          problem: { type: 'string' },
          evidence: { type: 'string' },
          fix: { type: 'string', description: 'the exact change to make' },
        },
        required: ['where', 'severity', 'problem', 'evidence', 'fix'],
      },
    },
    verdict: { type: 'string' },
  },
  required: ['issues', 'verdict'],
}
const reviews = await parallel([
  () => agent(`${CONTEXT}

YOUR SEAT: adversarial reviewer, HOST-FIDELITY lens. Read research/sf/fp-realm-review.md and docs/AMENDMENTS-2026-10-17m.md whole. Try to break them against the host: check every claim about the host by opening the cited host file at the cited line; check every ruling and every host-change item against the host's laws (requirements 15–24 of docs/DESIGN_FP_COHERENCE_FOLD.md, genesis is sacred and laws 1–6 of docs/DESIGN_ROUTE_LIFECYCLE.md, K3, law M, the frozen digest, one-way flows, OD-FC-18/22/28/38, the fabric volume's laws, Phase 5.5's frozen-vs-live law and port rule). Flag anything that would force a simulation-engine change the host has not chosen, anything that silently changes host canon, any host-change item missing a dependency or order, anything misread. Report issues with exact fixes. Default to skepticism.`, { label: 'review:host', phase: 'Review', schema: REVIEW }),
  () => agent(`${CONTEXT}

YOUR SEAT: adversarial reviewer, MAP-ARCHITECTURE lens. Read research/sf/fp-realm-review.md and docs/AMENDMENTS-2026-10-17m.md whole. Try to break them against the map design: verify EVERY "Current text" quote in file m by exact search in its target file (report each failure); check each new text is consistent with the rest of V13, V14, the proposal, the brief and the base (records, field names, units, message names, stage names, decision ids, cross-references resolve); check the identity ruling, settlement-first placement, the bearing-first coast rule, determinism (no random term where V13 forbids it), the clean-room rule for new texts entering the base or volumes (no host source identifiers, no other product's identifiers), numbering (items from 659, J-V13 rows after the last), and the M0 impact statement against plat/docs/build/M0-world-sites-gate.md and plat/packages/kernel/API.md. Report issues with exact fixes. Default to skepticism.`, { label: 'review:map', phase: 'Review', schema: REVIEW }),
])
const allIssues = reviews.filter(Boolean).flatMap(r => r.issues)
log(`review issues: ${allIssues.length} (${allIssues.filter(i => i.severity === 'blocking').length} blocking)`)

phase('Revise')
const revised = await agent(`${CONTEXT}

YOUR SEAT: the reviser for research/sf/fp-realm-review.md and docs/AMENDMENTS-2026-10-17m.md (Opus standing in for Fable; the notice lines stay). Two adversarial reviews produced the issues below. For each: verify it (open the files); if real, fix it in the two files; if wrong, leave it and record why. Re-verify every "Current text" quote in file m by exact search after your edits. Add at the end of the review note a section "§10 Review record" with one row per issue: where, severity, accepted/rejected, what changed or why not. Return a one-line summary per issue and the final item list of file m with targets.

ISSUES:
${JSON.stringify(allIssues, null, 1)}`, { label: 'revise', phase: 'Revise' })

phase('Apply')
const applied = await agent(`${CONTEXT}

YOUR SEAT: the application seat amendments/realm-m-apply (Opus standing in for Fable). Apply every item of docs/AMENDMENTS-2026-10-17m.md to its target file exactly as a coherence pass applies items: find the quoted current text by exact match (one occurrence), replace it with the new text verbatim, never paraphrase; if a quote does not match exactly, do not guess — record the item as NOT APPLIED with the reason. Items targeting docs/ARCHITECTURE.md are applied the same way (the owner's rule: the base changes only through amendment files applied by a coherence pass — this seat is that pass for file m). Then: change file m's status line to "**APPLIED** by amendments/realm-m-apply on 2026-10-17 (record: docs/validation/coherence/realm-m.md)" listing any item not applied; write docs/validation/coherence/realm-m.md with the notice line ${NOTICE('amendments/realm-m-apply')} and one row per item (item, target, heading, applied/not, check: new text found once by exact search after application); run "python3 tools/bundle_architecture.py" to rebuild docs/ARCHITECTURE-FULL.md and "python3 tools/bundle_architecture.py --check" if it supports it; append "$(date '+%Y-%m-%d %H:%M') amendments/realm-m-apply LANDED docs/validation/coherence/realm-m.md (opus; J375)" to docs/lane-events.log. Return the per-item result and the bundle tool's output.`, { label: 'apply', phase: 'Apply' })

phase('Critic')
const critic = await agent(`${CONTEXT}

YOUR SEAT: completeness critic. The review note research/sf/fp-realm-review.md, the amendment file docs/AMENDMENTS-2026-10-17m.md and its application record docs/validation/coherence/realm-m.md have landed. Ask what is missing: (1) every MISSING and PARTLY row of the physical-quantity ledger's §8 (research/sf/fp-physical-integration.md) — is each addressed by a ruling, a host-change item, or an explicit "stays the host's" with reason? list any that is not; (2) every fold requirement 15–24 and OD-FC-17/18/22/28/38 — does the review say how the port and the map honour it? (3) the fabric volume's laws and MF-3, MF-5, §164a, §15.2, MF-R2 — each mapped? (4) the reading gaps the two notes declared — closed or still open? (5) do the applied texts in V13/the proposal/the brief/the base now agree with each other (spot-check the changed sections and their cross-references)? (6) is anything ruled that should have been an owner question, or vice versa? Return a numbered gap list, each with severity and the exact fix; say plainly if nothing material is missing.`, { label: 'critic', phase: 'Critic' })

return { counts, dropped, refuted: surviving.map(s => ({ dim: s.dim, refuted: s.refuted })), synth, issues: allIssues.map(i => `${i.severity} ${i.where}: ${i.problem.slice(0, 160)}`), revised, applied, critic }
