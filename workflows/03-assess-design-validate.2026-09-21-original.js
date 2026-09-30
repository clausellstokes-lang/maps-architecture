export const meta = {
  name: 'assess-design-validate',
  description: 'Confidence assessment (skeptic-challenged), weakness ledger, three competing standalone architectures, Fable judge panel, synthesis, red-team validation with revise/verify rounds',
  phases: [
    { title: 'Assess', detail: 'Fable: per-reference reproduction-confidence matrix', model: 'fable' },
    { title: 'Challenge', detail: 'Fable skeptics: over-confidence and under-confidence lenses, spot-checking sources', model: 'fable' },
    { title: 'Mine', detail: 'Opus: weaknesses per reference (creator-admitted, user complaints, recorded failures)', model: 'opus' },
    { title: 'Report', detail: 'Fable: CONFIDENCE.md and IMPROVEMENTS.md', model: 'fable' },
    { title: 'Design', detail: 'Fable: three independent architecture proposals', model: 'fable' },
    { title: 'Judge', detail: 'Fable: three judges with distinct lenses', model: 'fable' },
    { title: 'Synthesize', detail: 'Fable: ARCHITECTURE.md', model: 'fable' },
    { title: 'RedTeam', detail: 'Opus coverage audit + six Fable red-team lenses', model: 'fable' },
    { title: 'Revise', detail: 'Fable: apply findings, record dispositions', model: 'fable' },
    { title: 'Verify', detail: 'Fable: confirm fixes landed; loop until dry (max 2 rounds)', model: 'fable' },
  ],
}

const ROOT = '/Users/cstokes/Desktop/Maps'
const F = (k) => `research/findings/${k}.md`
const SHARED = ['os-geometry', 'watabou-extra-a', 'watabou-extra-b', 'visual-spec', '_critic']
const REFS = [
  { id: 'mfcg', name: "watabou's Medieval Fantasy City Generator (MFCG)", files: ['os-model', 'os-wards-render', 'mfcg-posts-a', 'mfcg-posts-b', 'mfcg-devlogs-a', 'mfcg-devlogs-b', 'profile-mfcg', ...SHARED], captures: 'captures/mfcg/*' },
  { id: 'vg', name: "watabou's Village Generator (VG)", files: ['vg-posts-a', 'vg-posts-b', 'vg-ng-devlogs', 'profile-village', ...SHARED], captures: 'captures/village/*' },
  { id: 'ng', name: "watabou's Neighbourhood generator (NG)", files: ['vg-ng-devlogs', 'profile-neighbourhood', 'mfcg-posts-b', ...SHARED], captures: 'captures/neighbourhood/*' },
  { id: 'ftg', name: "Thomas Allerton's Fantasy Town Generator (FTG)", files: ['ftg-posts-a', 'ftg-posts-b', 'ftg-posts-c', 'ftg-docs-params', 'ftg-payload-visual', 'visual-spec', '_critic'], captures: 'captures/ftg/* and research/ftg-capture/*' },
]
const ALL_FINDINGS = ['os-geometry', 'os-model', 'os-wards-render', 'mfcg-posts-a', 'mfcg-posts-b', 'mfcg-devlogs-a', 'mfcg-devlogs-b', 'vg-posts-a', 'vg-posts-b', 'vg-ng-devlogs', 'ftg-posts-a', 'ftg-posts-b', 'ftg-posts-c', 'ftg-docs-params', 'ftg-payload-visual', 'profile-mfcg', 'profile-village', 'profile-neighbourhood', 'visual-spec', 'watabou-extra-a', 'watabou-extra-b', '_critic']

const GROUND = `
PROJECT (root ${ROOT}; all paths relative to it). The owner wants (1) an honest, evidence-based answer to "how confident are you of reproducing their code and deriving it" for four reference generators — watabou's Medieval Fantasy City Generator (MFCG), Village Generator (VG), Neighbourhood (NG), and Thomas Allerton's Fantasy Town Generator (FTG) — and (2) a comprehensive, adversarially validated ORIGINAL code architecture that reaches parity with all four AND IMPROVES ON THEM ("not just recreate — propose an improved version of it all").
EVIDENCE BASE (already produced; do not redo): research/findings/*.md — exhaustive extraction from every creator post/devlog/doc (each claim tagged [STATED]/[SHOWN]/[INFERRED]/[NAMED-ONLY] with source ids), from watabou's 2017 open-source ancestor TownGeneratorOS (GPL-3), and from our own recordings of the live generators (captures/*: CPU profiles attributed to class names, exact call counts, draw-call records, console stage traces, screenshots; FTG: the full creation request JSON, presets JSON, the decoded protobuf layout, client scene-build profile). Raw sources remain at research/patreon/*/<postId>/post.md (+images/), research/devlogs/*/*/post.md, research/ftg-docs/*.md, reference/TownGeneratorOS/, reference/towngenerator-foundrymodule/ for spot-checks.
STANDING OWNER RULINGS (binding):
- COMPLETELY STANDALONE: nothing outside ${ROOT} is an input, a constraint or a judging criterion. Do not read any other project on this machine.
- CLEAN-ROOM: TownGeneratorOS is GPL-3 and the live builds are proprietary. Learn algorithms and ideas; never copy or port code. Do NOT open captured JavaScript bundles (captures/**/network/bodies/*.js). The references' DATA ASSETS that our findings quote (naming grammars, Markov name corpora, palette JSON values, FTG building/profession/item tables, textures) are their creative content: they document behaviour for us, but the architecture must specify ORIGINAL content of our own authoring (same schema ideas are fine; their values/wordlists are not reused).
- IMPROVE, NOT JUST RECREATE: parity is the floor. Every improvement must name the reference weakness it answers and how the gain would be measured. Restraint matters: an "improvement" that loses what makes the references good (legibility, speed, charm, one-click simplicity) is a regression.
- CRITIC RULINGS OVERRIDE: read research/findings/_critic.md FIRST. Its §2 contradiction verdicts (e.g. population ≈6.12/building, PoissonPattern = warped Poisson-disc k=50, Equalize = angles, VG stage order measured from profile timestamps, VG roads are steered trackers not A*, FTG decides buildings+people BEFORE geometry, deltaRiver ≠ braided delta) and its §3 cross-reference table supersede the individual findings files where they disagree; the 'Critic addendum' sections appended to five findings files are part of the evidence. captures/neighbourhood/2026-09-21T07-20-25 (NG 'ring' template) was recorded after the critic and has not been analysed by any reader.
- Evidence discipline: separate what is evidenced from what you infer; cite findings file + section or the source post id; no uniform confidence.
- Write your full output to the file named in your task AS YOU GO (the owner may switch accounts mid-run; only files on disk survive). When the file is complete, append one line to docs/lane-events.log with:  echo "$(date '+%Y-%m-%d %H:%M') <lane key> LANDED <file>" >> ${ROOT}/docs/lane-events.log   Then return only the structured summary.`

const CONF_SCHEMA = {
  type: 'object',
  properties: {
    ref: { type: 'string' }, file: { type: 'string' },
    capabilities: { type: 'array', items: { type: 'object', properties: {
      name: { type: 'string' }, evidence: { type: 'string' },
      conf_functional: { type: 'number' }, conf_visual: { type: 'number' }, conf_algorithm_identity: { type: 'number' }, conf_seed_exact: { type: 'number' },
      biggest_unknown: { type: 'string' },
    }, required: ['name', 'evidence', 'conf_functional', 'conf_visual', 'conf_algorithm_identity', 'conf_seed_exact', 'biggest_unknown'] } },
    overall: { type: 'object', properties: { functional: { type: 'number' }, visual: { type: 'number' }, algorithm_identity: { type: 'number' }, seed_exact: { type: 'number' }, effort_person_weeks: { type: 'number' }, one_paragraph: { type: 'string' } }, required: ['functional', 'visual', 'algorithm_identity', 'seed_exact', 'effort_person_weeks', 'one_paragraph'] },
  },
  required: ['ref', 'file', 'capabilities', 'overall'],
}
const ADJ_SCHEMA = {
  type: 'object',
  properties: {
    ref: { type: 'string' }, lens: { type: 'string' }, file: { type: 'string' },
    adjustments: { type: 'array', items: { type: 'object', properties: { capability: { type: 'string' }, metric: { type: 'string' }, from: { type: 'number' }, to: { type: 'number' }, reason: { type: 'string' }, evidence_checked: { type: 'string' } }, required: ['capability', 'metric', 'from', 'to', 'reason', 'evidence_checked'] } },
    verdict: { type: 'string' },
  },
  required: ['ref', 'lens', 'file', 'adjustments', 'verdict'],
}
const FILE_SCHEMA = { type: 'object', properties: { key: { type: 'string' }, file: { type: 'string' }, headline: { type: 'string' }, items: { type: 'array', items: { type: 'string' } } }, required: ['key', 'file', 'headline', 'items'] }
const JUDGE_SCHEMA = {
  type: 'object',
  properties: {
    lens: { type: 'string' }, file: { type: 'string' },
    scores: { type: 'array', items: { type: 'object', properties: { proposal: { type: 'string' }, score_0_100: { type: 'number' }, strengths: { type: 'array', items: { type: 'string' } }, fatal_or_major_flaws: { type: 'array', items: { type: 'string' } } }, required: ['proposal', 'score_0_100', 'strengths', 'fatal_or_major_flaws'] } },
    winner: { type: 'string' }, grafts: { type: 'array', items: { type: 'string' } },
  },
  required: ['lens', 'file', 'scores', 'winner', 'grafts'],
}
const RT_SCHEMA = {
  type: 'object',
  properties: {
    lens: { type: 'string' }, file: { type: 'string' },
    findings: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, severity: { type: 'string', enum: ['blocker', 'major', 'minor'] }, claim: { type: 'string' }, evidence: { type: 'string' }, required_change: { type: 'string' } }, required: ['id', 'severity', 'claim', 'evidence', 'required_change'] } },
  },
  required: ['lens', 'file', 'findings'],
}
const VERIFY_SCHEMA = {
  type: 'object',
  properties: {
    lens: { type: 'string' }, file: { type: 'string' },
    unresolved: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, severity: { type: 'string', enum: ['blocker', 'major', 'minor'] }, why_unresolved: { type: 'string' }, required_change: { type: 'string' } }, required: ['id', 'severity', 'why_unresolved', 'required_change'] } },
    new_findings: { type: 'array', items: { type: 'object', properties: { id: { type: 'string' }, severity: { type: 'string', enum: ['blocker', 'major', 'minor'] }, claim: { type: 'string' }, required_change: { type: 'string' } }, required: ['id', 'severity', 'claim', 'required_change'] } },
  },
  required: ['lens', 'file', 'unresolved', 'new_findings'],
}

const fable = (prompt, label, phaseName, schema) => agent(prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: 'fable' })
const opus = (prompt, label, phaseName, schema) => agent(prompt, { label, phase: phaseName, schema, agentType: 'general-purpose', model: 'opus' })

// ───────────────────────── Assess → Challenge (pipeline per reference) + Mine (parallel) ─────────────────────────
const assessPrompt = (r) => `${GROUND}

LANE confidence/${r.id}. You are the confidence assessor for ${r.name}. Read COMPLETELY: ${r.files.map(F).join(', ')}. Consult ${r.captures} reports where a number is needed.
Build a capability matrix: one row per distinct capability of the reference (generation stages, geometry primitives, features/options, rendering conventions, labels, export, editing, and for FTG the people/economy/time simulation and data scale). For each row give: evidence summary with tags + citations; what is known; what a re-implementer must still invent; and FOUR separate confidences in [0,1], each with a one-line justification:
 - conf_functional: an expert team could build behaviour-equivalent functionality (same feature, same option surface, statistically similar structure);
 - conf_visual: output a viewer would place in the same quality/style class;
 - conf_algorithm_identity: our derivation would actually match THEIR algorithm (not just its output) — this is what "deriving their code" means;
 - conf_seed_exact: same seed → same map (requires their exact RNG draw order and constants — be honest, this is ≈0 without source except where the open-source ancestor still applies).
Also: effort estimate (person-weeks, expert), the 10 riskiest unknowns ranked, and which cheap experiment (more captures, parameter sweeps, measurements on screenshots/payloads) would raise confidence most.
Write docs/confidence/${r.id}.md.`

const challengePrompt = (r, lens, a) => `${GROUND}

LANE confidence/${r.id}-challenge-${lens.key}. You are an adversarial reviewer of the confidence assessment docs/confidence/${r.id}.md for ${r.name} (overall claimed: ${a ? JSON.stringify(a.overall) : 'see file'}).
LENS — ${lens.brief}
Method: read the assessment fully, then go to the evidence (findings files ${r.files.map(F).join(', ')} and, for at least 10 rows, the ORIGINAL posts/devlogs/docs/captures they cite) and try to REFUTE the numbers. Default to refuting when the cited evidence does not actually support the rating. Every adjustment must quote or pinpoint what you checked.
Write docs/confidence/${r.id}-challenge-${lens.key}.md (table of adjustments with from→to, reason, evidence checked; plus rows you tried to refute and could not).`

const LENSES = [
  { key: 'over', brief: 'OVER-CONFIDENCE HUNTER. Find rows rated higher than the evidence allows: [INFERRED] treated as [STATED]; a named feature mistaken for a described method; visual parity assumed from one screenshot; hidden constants/heuristics; robustness work the creator says took years; combinatorial interaction between features; content/data authoring cost (names, tables, presets).' },
  { key: 'under', brief: 'UNDER-CONFIDENCE HUNTER. Find rows rated lower than warranted: standard published algorithms that fully cover the capability (cite them by name); recorded data we already hold that pins the behaviour (call counts, draw logs, payload statistics, parameter schema); the open-source ancestor still matching the live class/method names; capabilities that need only parity of OUTPUT, not of method.' },
]

const minePrompt = (r) => `${GROUND}

LANE improvements/${r.id}. You are the weakness miner for ${r.name}. Goal: the raw material for designing something BETTER than the reference.
Read completely: ${r.files.map(F).join(', ')} (especially their "failure modes", "creator's stated design philosophy/constraints", "useful facts from comment threads" and "open questions" sections). Then go back to the ORIGINAL comment threads (the "## Comments" section of the post.md files those findings cite, plus research/devlogs/**/post.md comments) and harvest what USERS ask for, complain about, or work around. Add what our recordings show (captures: retries/discards in console traces such as "Unable to build a street!/canal", "discard", reroll workarounds, time per stage vs size, render cost vs generation cost, limits of zoom/resolution/export).
Produce a weakness ledger: each entry = {weakness, who says so (creator / users ×count / recorded), evidence citation, user impact, root cause as far as knowable, how a new design could beat it, how the win would be MEASURED, risk of over-correcting (what the reference gets right here)}. Group by: generation robustness, geometric quality/realism, variety & control, editing & regeneration locality, scale & performance, rendering & style, labels & typography, data model/export/interop, simulation & content (FTG), UX & workflow. Finish with the 15 highest-value improvement opportunities for this reference.
Write docs/improvements/${r.id}.md.`

phase('Assess')
const perRef = await parallel(REFS.map((r) => () => (async () => {
  const [assessment, mined] = await Promise.all([
    fable(assessPrompt(r), `assess:${r.id}`, 'Assess', CONF_SCHEMA).then(async (a) => {
      const ch = await parallel(LENSES.map((l) => () => fable(challengePrompt(r, l, a), `challenge:${r.id}:${l.key}`, 'Challenge', ADJ_SCHEMA)))
      return { a, ch: ch.filter(Boolean) }
    }),
    opus(minePrompt(r), `mine:${r.id}`, 'Mine', FILE_SCHEMA),
  ])
  return { ref: r.id, ...assessment, mined }
})()))
const refs = perRef.filter(Boolean)
log(`assessed ${refs.length}/4 references; challenges: ${refs.map((x) => `${x.ref}:${x.ch.length}`).join(' ')}`)

phase('Report')
const [confidence, improvements] = await parallel([
  () => fable(`${GROUND}

LANE CONFIDENCE. Write docs/CONFIDENCE.md — the owner-facing answer to "how confident are you of reproducing their code and deriving it". Inputs: docs/confidence/{mfcg,vg,ng,ftg}.md and the eight challenge files docs/confidence/*-challenge-{over,under}.md (read all completely). Rule on every challenged row: accept / partially accept / reject the adjustment, with the reason; where the two lenses conflict, go to the cited evidence yourself. Output: (1) a one-page verdict with FOUR numbers per reference (functional, visual, algorithm-identity, seed-exact) as ranges, not points, plus effort; (2) what drives each number; (3) per-reference capability tables after rulings; (4) "cannot be known from outside" list; (5) the experiments that would move the numbers most (we own a profiler: profiler/README.md; FTG allows one new settlement per IP per day); (6) an explicit statement of what evidence classes were and were not used (no proprietary bundle reading).`, 'report:CONFIDENCE', 'Report', FILE_SCHEMA),
  () => fable(`${GROUND}

LANE IMPROVEMENTS. Write docs/IMPROVEMENTS.md from docs/improvements/{mfcg,vg,ng,ftg}.md (read all completely; spot-check at least 12 cited complaints/admissions at source). Merge duplicates across references into cross-cutting opportunities; rank by (user value × evidence strength) / cost; for each give: the weaknesses it answers (with citations), the design idea, the measurable acceptance criterion (a number or a test we could actually run against our captures or a generated corpus), the restraint clause (what must NOT be lost), and dependencies. Include a section "things the references get right that a rewrite usually breaks". End with the must-have / should-have / later split that the architects will be held to.`, 'report:IMPROVEMENTS', 'Report', FILE_SCHEMA),
])

// ───────────────────────── Design → Judge → Synthesize ─────────────────────────
const SPEC = `Your proposal must be concrete enough to start building from, and must cover ALL of:
 1. Scope & product shape: one generator family covering city (MFCG-class), village-in-landscape (VG-class), neighbourhood close-up (NG-class) and large simulated town (FTG-class) — shared core vs per-scale modules; tech stack with reasons (language, runtime targets, rendering backends, build, no dependence on any existing project).
 2. Domain model & schemas: terrain, water, road graph, planar subdivision (faces: districts/blocks/lots), buildings (footprint, floors, roof, entrance, use), walls/gates/towers, fields/forest/trees, labels, entities (institutions, people, factions) — with ids, provenance, versioning; serialization format(s).
 3. Geometry kernel: numeric policy (robust predicates / snapping / tolerances), polygon booleans, offsetting/insetting, straight skeleton, OBB, Voronoi/Delaunay, Poisson-disc, planar graph/DCEL, splines/smoothing, spatial index, noise — for each: build vs adopt (name candidate libraries and their licences), and how degenerate input is handled.
 4. Generation pipeline: stage graph with typed inputs/outputs; MULTIPLE layout strategies behind one interface (cell/ward partition à la MFCG; staged road-growth à la FTG; terrain-and-road-first à la VG; district close-up à la NG) and how they compose; block→lot→building subdivision (incl. bent/twisted bisection, perimeter blocks, courtyards); walls, castles, plazas, harbours, bridges, canals, farms, forests, outskirts.
 5. Failure handling: NO whole-map discard-and-retry as the normal path — constraint checks, local repair, bounded local regeneration, fallbacks, and how each failure class is detected and tested.
 6. Determinism: RNG design (named sub-streams per stage/feature so adding a feature does not reshuffle the map), seed + parameter permalinks, version axes, reproducibility across platforms (floating point policy).
 7. Editing & regeneration locality: lock/pin elements, regenerate an area, warp/move vertices, user-drawn roads/water as constraints — and the full lifecycle of edits: create, read, persist, regenerate, undo, migrate between generator versions.
 8. Rendering & style system: a renderer-independent display list; style sheets that can reproduce each reference's look (flat ink MFCG; shaded/hatched VG & NG; textured/lit FTG) and new ones; roofs, shadows, hatching, trees, water bands, furrows, road casing, walls; level-of-detail; SVG / Canvas2D / WebGL backends; print/VTT export resolution.
 9. Labels & map furniture: curved district labels (skeleton/OBB-arc), street names, collision handling, legend, scale bar, compass, grid, title.
10. Simulation & content layer (FTG parity, optional module): population from size, buildings from a resource/dependency graph, professions, households/family model, schedules/time simulation, factions/religions, name generation — data-driven and replaceable.
11. Export & interop: JSON schema, SVG, PNG, GeoJSON, VTT formats (walls/doors/lights), 3-D (OBJ/glTF), embedding API/postMessage, permalinks.
12. Performance budgets per stage at hamlet / town / city / metropolis (use the recorded reference timings as the bar), incremental/async generation, workers, memory.
13. Testing & verification: property tests for kernel invariants, per-stage invariants, seed goldens with declared-shift protocol, visual regression, and REFERENCE-PARITY METRICS computed against our captures (e.g. block-area and building-count distributions, road-angle/segment statistics vs the FTG payload, draw-style checks vs draw records).
14. Package/module layout with key TypeScript-style interfaces (or the equivalent in your chosen language), dependency rules between modules, extension points.
15. PARITY MATRIX (every capability in docs/confidence/*.md → where it lives in your design) and IMPROVEMENT MATRIX (every must-have/should-have in docs/IMPROVEMENTS.md → mechanism + acceptance metric).
16. Build plan: milestones with exit criteria, the riskiest spikes first, what is deliberately out of scope.
17. Clean-room/legal posture and third-party licence list.`

const ARCHITECTS = [
  { key: 'kernel', brief: 'GEOMETRY-KERNEL-FIRST. Your thesis: every weakness the creators admit traces to fragile geometry (collapsed/intersecting edges, concave shapes, tolerance bugs). Make one robust planar-subdivision model the single spatial truth that every stage reads and writes, and derive everything else from it.' },
  { key: 'pipeline', brief: 'PIPELINE-AND-DETERMINISM-FIRST. Your thesis: the hard problems are orchestration — composable layout strategies, constraint satisfaction with local repair instead of whole-map retries, stable seeds under feature growth, edit/regenerate locality, versioned artifacts with provenance. Design the stage graph and its contracts first; geometry is a service.' },
  { key: 'product', brief: 'RENDERER-AND-PRODUCT-FIRST. Your thesis: users judge maps by the picture and by what they can do with it. Work backwards from the display list, style system, labels, editing UX, export/VTT/3-D interop and the simulation/content layer; let those requirements dictate the domain model and pipeline.' },
]

phase('Design')
const proposals = (await parallel(ARCHITECTS.map((a) => () => fable(`${GROUND}

LANE design/proposal-${a.key}. You are one of three INDEPENDENT architects (you will not see the others' work). Angle — ${a.brief}
Read completely: docs/CONFIDENCE.md, docs/IMPROVEMENTS.md, docs/confidence/*.md (not the challenge files), and every findings file: ${ALL_FINDINGS.map(F).join(', ')} (they are long — read them all; technique detail is the point). Use captures/*/*/report.md for numbers.
${SPEC}
Before committing, write down at least two alternative shapes for each hard-to-reverse decision (spatial truth model, numeric policy, RNG/stream design, stack, display-list design) and one sentence on why you reject each.
Write docs/design/proposal-${a.key}.md (no length limit; diagrams as ASCII/mermaid; interfaces as code blocks).`, `architect:${a.key}`, 'Design', FILE_SCHEMA)))).filter(Boolean)
log(`${proposals.length}/3 proposals landed`)

const JUDGES = [
  { key: 'parity', brief: 'CAPABILITY PARITY. Walk every capability in docs/confidence/{mfcg,vg,ng,ftg}.md and the visual-spec findings and check each proposal really covers it (not by assertion — by a mechanism that would work). Count uncovered/hand-waved capabilities.' },
  { key: 'improvement', brief: 'IMPROVEMENT REALISM AND RESTRAINT. Walk docs/IMPROVEMENTS.md. For each must-have/should-have: is the mechanism real, is the acceptance metric measurable, does it sacrifice something the references get right? Punish feature-listing without mechanism and "better" without a number.' },
  { key: 'engineering', brief: 'ENGINEERING SOUNDNESS. Numeric robustness, determinism under feature growth, lifecycle of edits (create/read/persist/regenerate/undo/migrate), performance budgets vs recorded timings, testability, dependency/licence risk, build-plan realism, complexity budget (what can a small team actually ship?).' },
]
phase('Judge')
const verdicts = (await parallel(JUDGES.map((j) => () => fable(`${GROUND}

LANE design/judge-${j.key}. You are a judge on a three-judge panel. Lens — ${j.brief}
Read completely the three proposals docs/design/proposal-{kernel,pipeline,product}.md plus docs/CONFIDENCE.md and docs/IMPROVEMENTS.md (and findings where you need to check a claim). Score each proposal 0–100 on your lens with itemised reasons, list strengths, list fatal or major flaws (be specific: section + why it fails), name the winner on your lens, and list the best ideas from the NON-winning proposals that must be grafted into the final architecture.
Write docs/design/judge-${j.key}.md.`, `judge:${j.key}`, 'Judge', JUDGE_SCHEMA)))).filter(Boolean)

phase('Synthesize')
const arch = await fable(`${GROUND}

LANE ARCHITECTURE. You are the chief architect. Read completely: the three proposals docs/design/proposal-{kernel,pipeline,product}.md, the three judge reports docs/design/judge-{parity,improvement,engineering}.md, docs/CONFIDENCE.md, docs/IMPROVEMENTS.md. Panel summary: ${JSON.stringify(verdicts.map((v) => ({ lens: v.lens, winner: v.winner, scores: v.scores.map((s) => [s.proposal, s.score_0_100]) })))}.
First write docs/design/judging.md (score table, per-lens winners, the graft list, every fatal/major flaw raised and how the final design answers it). Then write docs/ARCHITECTURE.md: ONE coherent architecture built on the strongest proposal with the grafts applied — not a concatenation. It must satisfy every item of this specification:
${SPEC}
Add: an "Owner decisions" section (choices that are genuinely the owner's: product scope cuts, stack if two are defensible, licence posture, simulation depth) each with your recommendation; and a "Judgment calls" section in the form "chose X over Y because Z".`, 'synthesize:ARCHITECTURE', 'Synthesize', FILE_SCHEMA)

// ───────────────────────── Red team → Revise → Verify (loop until dry, max 2 rounds) ─────────────────────────
const RT = [
  { key: 'geometry', brief: 'GEOMETRY ROBUSTNESS. Attack the kernel and every stage that consumes it with the failure classes the creators themselves report (collapsed/intersecting edges on concave shapes, empty areas inside walls, unbounded loops, null OBB on degenerate polygons, duplicate road intersections, z-fighting/overdraw, self-intersecting user strokes) and classic ones (sliver faces, near-collinear offsets, skeleton events at equal times, tolerance drift across stages, float non-determinism across platforms).' },
  { key: 'lifecycle', brief: 'DETERMINISM AND STATE LIFECYCLE. Trace every piece of state through create, read, persist, regenerate/re-derive, undo/restore, clone, migrate/import. Hunt for the write that survives one path and ghosts another: edits lost on area-regenerate, pins that dangle after roster/geometry change, seeds that reshuffle when a feature is added, goldens that silently shift, version-migration gaps, permalink/param drift.' },
  { key: 'scale', brief: 'PERFORMANCE AND SCALE. Hold the design to the recorded bars (MFCG size-80 ≈ 200 ms generation; FTG city ≈ 3 s server-side with 4.3k nodes/5.3k edges/2.8k buildings and a 50k-population ceiling; render cost dominating in OpenFL) — find super-linear stages, memory blow-ups, main-thread stalls, display-list sizes that break SVG, label placement cost, worker/serialization overhead.' },
  { key: 'visual', brief: 'VISUAL PARITY AND CRAFT. Using research/findings/visual-spec.md and the screenshots under captures/, check the style system can actually reproduce each reference look (ink+flat MFCG with curved labels; VG relief/contours/water bands/tree crowns/furrows; NG hatched roofs with ridges, shadows, courtyards; FTG textures, lighting, shore foam, field hedgerows, LOD) AND that the claimed visual improvements would not reduce legibility.' },
  { key: 'ftg', brief: 'FTG-CLASS PARITY. Road-growth stages and presets (Medieval, twisty, American, Ringed), districts as first-class objects, lots/building placement modes, walls-after-stage, harbours, farmland modes, islands/coasts, terrain/heightmap + 3-D view, 50k-person simulation with family units, schedules and time, building/resource dependency graph, editing tools (draw roads/rivers, regenerate area, bulk edit), wire format and sync/embedding. Find what the architecture under-scopes or gets structurally wrong.' },
  { key: 'improve', brief: 'IMPROVEMENT CLAIMS AND SCOPE. For every claimed improvement: is it real, measurable, and affordable? Which ones are wishful? Where does the design exceed what a small team can ship, and what should be cut or staged? Also check clean-room/licence posture of every named third-party dependency and that nothing depends on any project outside this folder.' },
]
phase('RedTeam')
const [coverage, ...redteam] = await parallel([
  () => opus(`${GROUND}

LANE validation/coverage-audit. Build the master capability checklist: every distinct technique/capability recorded in ANY findings file (${ALL_FINDINGS.map(F).join(', ')}) — read them all completely and enumerate (expect several hundred rows; deduplicate across files but keep per-reference variants). Then read docs/ARCHITECTURE.md completely and, for each row, mark COVERED (cite section) / PARTIAL (what is missing) / MISSING. Also list architecture features with no evidential basis in the references or IMPROVEMENTS.md (scope creep). Write docs/validation/coverage-audit.md with the full table and a summary of PARTIAL/MISSING rows by severity.`, 'redteam:coverage-audit', 'RedTeam', FILE_SCHEMA),
  ...RT.map((l) => () => fable(`${GROUND}

LANE validation/redteam-${l.key}. You are a red-team reviewer of docs/ARCHITECTURE.md. Lens — ${l.brief}
Read the architecture completely, then the findings/captures your lens needs. Try to BREAK the design: concrete input/state → wrong output, crash, non-determinism, lost edit, missed budget, uncovered capability, unmeasurable claim. No generic advice — every finding needs a concrete failure scenario, the evidence, and the specific change required. Severity: blocker (design cannot meet a stated goal), major (will bite, needs design change), minor.
Write docs/validation/redteam-${l.key}.md.`, `redteam:${l.key}`, 'RedTeam', RT_SCHEMA)),
])
let open = redteam.filter(Boolean).flatMap((r) => r.findings.map((f) => ({ ...f, lens: r.lens })))
log(`red team: ${open.length} findings (${open.filter((f) => f.severity === 'blocker').length} blocker, ${open.filter((f) => f.severity === 'major').length} major)`)

let round = 0
while (round < 2 && open.some((f) => f.severity !== 'minor')) {
  round++
  phase('Revise')
  await fable(`${GROUND}

LANE ARCHITECTURE-VALIDATION (revision round ${round}). Read docs/ARCHITECTURE.md, docs/validation/coverage-audit.md, every docs/validation/redteam-*.md${round > 1 ? ' and docs/validation/verify-*.md' : ''} completely. For EVERY finding and every PARTIAL/MISSING coverage row decide: FIX (change the architecture — edit docs/ARCHITECTURE.md in place, coherent with the rest, not a bolt-on appendix), REJECT (with a reason that would survive the reviewer), or DEFER (documented, with rationale and what would trigger it). Open findings this round: ${JSON.stringify(open.filter((f) => f.severity !== 'minor').map((f) => ({ id: f.id, lens: f.lens, severity: f.severity, change: f.required_change })))}.
Maintain docs/ARCHITECTURE-VALIDATION.md: a disposition table (finding id, lens, severity, disposition, where fixed in ARCHITECTURE.md, reason) for all rounds, plus a changelog of the architecture by round.`, `revise:round-${round}`, 'Revise', FILE_SCHEMA)
  phase('Verify')
  const checks = (await parallel(['geometry+lifecycle', 'scale+ftg', 'visual+improve+coverage'].map((grp) => () => fable(`${GROUND}

LANE validation/verify-${grp}-r${round}. Verification after revision round ${round}, lens group: ${grp}. Read docs/ARCHITECTURE-VALIDATION.md, the matching docs/validation/redteam-*.md (and coverage-audit.md if in your group) and the REVISED docs/ARCHITECTURE.md completely. For each blocker/major finding in your group: confirm the claimed fix is really in the architecture text and really defeats the failure scenario — default to UNRESOLVED if the fix is an assertion rather than a mechanism, or if a REJECT/DEFER reason does not hold. Then hunt for NEW problems introduced by the revision. Write docs/validation/verify-${grp}-r${round}.md.`, `verify:${grp}:r${round}`, 'Verify', VERIFY_SCHEMA)))).filter(Boolean)
  open = checks.flatMap((c) => [...c.unresolved.map((u) => ({ id: u.id, severity: u.severity, required_change: u.required_change, lens: c.lens })), ...c.new_findings.map((n) => ({ id: n.id, severity: n.severity, required_change: n.required_change, lens: c.lens }))])
  log(`after round ${round}: ${open.length} open (${open.filter((f) => f.severity !== 'minor').length} blocker/major)`)
}

return {
  confidence: refs.map((x) => ({ ref: x.ref, overall: x.a && x.a.overall, challenges: x.ch.map((c) => ({ lens: c.lens, n: c.adjustments.length, verdict: c.verdict })) })),
  reports: { confidence, improvements },
  proposals: proposals.map((p) => ({ key: p.key, headline: p.headline })),
  judges: verdicts.map((v) => ({ lens: v.lens, winner: v.winner, scores: v.scores.map((s) => [s.proposal, s.score_0_100]) })),
  architecture: arch,
  coverage,
  redteam_counts: redteam.filter(Boolean).map((r) => ({ lens: r.lens, n: r.findings.length })),
  rounds: round,
  still_open: open,
}
