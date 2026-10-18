export const meta = {
  name: 'understand-watabou-extra',
  description: 'Two Opus readers over the 65 watabou posts outside the two collections (twisted bisection, straight skeletons, Neighbourhood, City Viewer, Urban Places, tutorials)',
  phases: [{ title: 'Read', detail: 'watabou-extra older/newer halves → research/findings/watabou-extra-{a,b}.md', model: 'opus' }],
}

const ROOT = '/Users/cstokes/Desktop/Maps'
const sl = (key, from, to) => ({ key, from, to })

const COMMON = `
PROJECT CONTEXT. The owner wants to build an ORIGINAL procedural settlement-map generator whose output can stand next to four references: watabou's Medieval Fantasy City Generator (MFCG), Village Generator (VG), Neighbourhood (NG), and Thomas Allerton's Fantasy Town Generator (FTG). None of the current source code is available. What is available: the creators' own posts/devlogs/docs, watabou's 2017 open-source ancestor (TownGeneratorOS, Haxe, GPL-3), and recordings we made of the live generators (CPU profiles attributed to class names, exact call counts, draw-call records, screenshots, FTG's server payload). Your job in this step is EXTRACTION, not design: capture every technique, mathematical principle, data structure, parameter, heuristic, failure mode and visual convention your slice reveals, precisely enough that an engineer could re-derive the algorithm.

Project root: ${ROOT}  (all paths below are relative to it unless absolute).

HARD RULES
- Read every file in your slice COMPLETELY (no skimming, no sampling). For posts/devlogs/docs: read the whole post.md INCLUDING the comments section (creator replies often explain the method), and open EVERY image listed under "Images (local files)" with the Read tool — the images are where geometry, layering and style are actually shown. Describe what each informative image demonstrates.
- Do NOT open or read any captured JavaScript bundle (captures/**/network/bodies/*.js) — the live code is proprietary; we work from the creators' words, the open-source ancestor, and recorded behaviour (report.md / *.calls.json / *.draw.json / screenshots / console traces) only.
- Separate what the source STATES from what you INFER. Tag every technique line with one of: [STATED] (creator explicitly describes method), [SHOWN] (visible in an image/recording but not explained), [INFERRED] (your reconstruction — give the reasoning), [NAMED-ONLY] (feature announced, no method given).
- For each technique give: what problem it solves; the algorithm as far as recoverable (steps, data structures, geometry/maths: e.g. Voronoi/Delaunay, straight skeleton, polygon offsetting, OBB bisection, Poisson-disc, A*, L-systems, noise, splines, Chaikin, marching squares…); parameters/constants mentioned; known failure modes and how the creator handles them (retries, discards, fallbacks); what changed versus the previous iteration; and what is still UNKNOWN that a re-implementer would have to decide.
- Cite sources by post id / devlog id / file path so claims can be re-checked.
- Write your full findings to the file named in your task (create research/findings/ if needed). No length limit on the file; be exhaustive and concrete. Then return ONLY the structured summary (keep summary strings short; the file carries the detail).`


const SCHEMA = {
  type: 'object',
  properties: {
    key: { type: 'string' },
    findings_file: { type: 'string' },
    sources_read: { type: 'integer' },
    images_viewed: { type: 'integer' },
    sources_skipped: { type: 'array', items: { type: 'string' } },
    techniques: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          generator: { type: 'string', description: 'MFCG | VG | NG | FTG | OS | shared' },
          evidence: { type: 'string', enum: ['STATED', 'SHOWN', 'INFERRED', 'NAMED-ONLY'] },
          algorithm_summary: { type: 'string' },
          reproduction_confidence: { type: 'number', description: '0..1 that an expert could re-implement behaviour-equivalently from available evidence' },
          biggest_unknown: { type: 'string' },
        },
        required: ['name', 'generator', 'evidence', 'algorithm_summary', 'reproduction_confidence', 'biggest_unknown'],
      },
    },
    top_insights: { type: 'array', items: { type: 'string' } },
    open_questions: { type: 'array', items: { type: 'string' } },
  },
  required: ['key', 'findings_file', 'sources_read', 'images_viewed', 'techniques', 'top_insights', 'open_questions'],
}


const postTask = (key, who, dirs, extra = '') => ({
  key,
  prompt: `${COMMON}

YOUR SLICE (${key}): ${who}. Each directory below holds post.md (title, date, body with ![IMAGE #n] markers, links, full comment thread) and images/NN.ext in the same order as the markers. Work chronologically (the list is oldest → newest) so you can state what each iteration changed relative to the previous one.
Resolve your directory list FIRST by running this with Bash and keep the printed list as your checklist (every directory must be read):
${dirs.map((d) => `  python3 -c "import json; [print(x) for x in json.load(open('${ROOT}/research/worklists.json'))['${d.key}'][${d.from}:${d.to}]]"   # ${d.to - d.from} directories, relative to ${ROOT}`).join('\n')}
${extra}
Write findings to research/findings/${key}.md with: (1) a chronological table (date, id, title, what changed), (2) one section per technique as specified in the rules, (3) visual/style conventions observed in the images (palette, line weights, hatching, shadows, roofs, trees, water, labels, legends), (4) creator's stated design philosophy/constraints, (5) useful facts from comment threads, (6) open questions.`,
})


const EXTRA_NOTE = `These posts sit OUTSIDE the two curated collections but are where watabou explains several core methods that MFCG / Village / Neighbourhood share: "Recursive bisection with a twist" (49191011 — the twisted/bent bisection primitive used for streets, alleys and lots), "Straight skeletons" (101173551 — roofs and curved-label spines), the Neighbourhood Generator release posts, City Viewer / Toy Town (3-D extrusion, roofs, OBJ export — what it implies about the data model), Urban Places (the newest urban-scene generator: ramparts, new building types), and tutorials from sibling generators whose techniques are reused ("Hatching in 1PDG", "Generation in Perilous Shores", forest blobs, area/curved labels, farmlands, SVG export). Posts about unrelated generators (pubs, sails, runes, hair, games) only need a short note unless they describe a reusable geometric/rendering technique. For every reusable technique say explicitly which of MFCG / VG / NG it feeds.`
const TASKS = [
  postTask('watabou-extra-a', 'watabou Patreon posts OUTSIDE the two collections, OLDER half', [sl('watabou-extra', 0, 33)], EXTRA_NOTE),
  postTask('watabou-extra-b', 'watabou Patreon posts OUTSIDE the two collections, NEWER half', [sl('watabou-extra', 33, 65)], EXTRA_NOTE),
]

phase('Read')
const results = await parallel(TASKS.map((t) => () =>
  agent(t.prompt, { label: `read:${t.key}`, phase: 'Read', schema: SCHEMA, agentType: 'general-purpose', model: 'opus' })
    .then((r) => r || { key: t.key, failed: true })))
return results.map((r) => (r && !r.failed) ? { key: r.key, file: r.findings_file, sources_read: r.sources_read, images_viewed: r.images_viewed, skipped: r.sources_skipped, techniques: r.techniques, top_insights: r.top_insights, open_questions: r.open_questions } : r)
