# Lane prompts (Phase 3b gap closers, 2026-09-25)

Verbatim prompts of the single-agent lanes spawned outside the Workflow tool, so a new session/account can re-spawn a
lane that was killed. Model per lane: readers = Opus, critic seats = Fable (owner directive). The 2026-09-25 re-runs
used these prompts with the addendum date changed to 2026-09-25 and a "previous attempt was interrupted" note; the
NG ring re-spawn of 05:50 EDT added a CONTINUATION clause (keep the 10 KB partial section, finish the rest).

| lane | prompt | output |
|---|---|---|
| profile-neighbourhood-ring | profile-neighbourhood-ring.prompt.md | Ring-template addendum in research/findings/profile-neighbourhood.md |
| _critic-ftg | _critic-ftg.prompt.md | research/findings/_critic-ftg.md + Critic-2 addenda in ftg-*.md |
| _critic-os | _critic-os.prompt.md | research/findings/_critic-os.md + Critic-2 addenda in os-*.md, profile-mfcg.md |
| profile-mfcg-gates | see session transcript 3fbc58a0 (2026-09-25 05:16); same HARD RULES; slice captures/mfcg/2026-09-21T11-25-32 (gates=4 size=40 controlled gen-0; Enter-regenerated gen-1s re-rolled options); tasks: gate rule from drawGate/draw record/screenshot vs the 7 earlier samples; executed-set diff; console retry/repair messages; timings vs size; never-executed list | Explicit-gates addendum in profile-mfcg.md |
| profile-village-river | see session transcript 3fbc58a0 (2026-09-25 05:16); slice captures/village/2026-09-21T11-25-55 (20 µs profile + coverage; river seed 3131 gen-0, island gen-1); tasks: river-course order from cpuprofile timestamps; dist2poly = 128², dist2segment2 = 16384×51 identities; River.new hypothesis; executed-set diff vs the 3 earlier VG samples; 20 µs vs 100 µs timings; screenshots; legend/population | River-course addendum in profile-village.md |
| external-sources | done by the managing session (Internet Archive fetches; see research/external/*.json) | External-sources addendum in mfcg-devlogs-a.md |
