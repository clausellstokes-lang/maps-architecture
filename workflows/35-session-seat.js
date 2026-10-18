export const meta = {
  name: 'session-seat',
  description: 'One session seat (a census, triage, diagnosis or profiling seat, J237/J290/N-58): a single agent under a brief file, with the model and effort the session names; no build/check pair',
  phases: [{ title: 'Seat', detail: 'the one seat, under its brief file' }],
}

// args: { brief: <absolute path of the brief file>, lane: <the lane key, e.g. session/refusal-census-1>, model (default 'opus'), effort (default 'high') }
// The seat reads its own brief first (scripts cannot read files); its final structured text is its answer (the WAITING RULE, J258).
const SCHEMA = { type: 'object', properties: { lane: { type: 'string' }, status: { type: 'string', enum: ['done', 'blocked'] }, files: { type: 'array', items: { type: 'string' } }, landed_record: { type: 'string' }, summary: { type: 'string' }, notes: { type: 'array', items: { type: 'string' } } }, required: ['lane', 'status', 'files', 'landed_record', 'summary', 'notes'] }
const prompt = `Your brief is the file ${args.brief}. Print it whole first (cat ${args.brief}) and follow it exactly; your lane key is ${args.lane}. Return the structured result the brief's last section names.`
const r = await agent(prompt, { label: args.lane, phase: 'Seat', schema: SCHEMA, model: args.model || 'opus', effort: args.effort || 'high' })
return { lane: args.lane, ok: !!r && r.status === 'done', result: r }
