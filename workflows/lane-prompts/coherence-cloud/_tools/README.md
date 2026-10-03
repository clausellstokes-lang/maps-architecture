# Cloud orchestration helpers for workflows/18-coherence.js (2026-09-30)

The Workflow harness is absent in the cloud session, so the orchestrating session runs each seat as an Opus agent.

- `mkbriefs.py` — turns `tools/dryrun-workflow.mjs` output into the seat briefs here (adds the orchestration notes and the return format).
- `prompts.mjs` — renders the script's own repair, adjudicate, verify and validate prompts for a given round and issue list
  (`node prompts.mjs repair|adjudicate|verify|validate <args.json> <out>`).
- `finalize.py` — appends the owner-rules routing note and the orchestration notes to a rendered prompt and writes the brief.

Paths inside point at the session scratchpad; adjust `SP` and the args file when reused.
