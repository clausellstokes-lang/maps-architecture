# Apply record — retrovalidation/apply-lenses

Lane: `retrovalidation/apply-lenses` (opus; J390, Fable-checked). Source: `docs/validation/retrovalidation-2026-10-18/lenses.verdict.json`, read whole (verdict PASS-WITH-CORRECTIONS; 40 corrections: 38 research on `research/sf/lens-implications.md`, 1 design on `docs/volumes/V13-world.md`, 1 record on `docs/validation/retrovalidation-2026-10-18/rulings.md`; 36 rulings RL-1–RL-36; `notice_replacement`; `summary`). No correction targets `docs/PROGRESS.md`. No git command run; the host repository was not touched.

## Files changed

| file | fragments | before | after |
|---|---|---|---|
| `research/sf/lens-implications.md` | 41 = 38 (lenses.verdict.json) + 2 routed here from other families' verdicts (faith #59, population #44) + 1 notice line | 613 lines, md5 `95957c0d74da9b405b974d189c3999f9` | 615 lines, md5 `901c8bb66a0d13125cec39ac0e8adc88` |

The +2 lines are C38's inserted blockquote and the blank line after it. Trailing newline kept.

## Method and proof

- Every correction applied by exact-match replacement, in verdict order, by one script: before each replacement the old text was asserted to occur exactly once in the file as it then stood and the new text asserted absent; after all replacements every new text was asserted to occur exactly once, and every old text that is not itself contained in its new text was asserted gone (eight olds — C20, C32–C38 — are prefixes kept inside their new text by design: the correction appends a bracket; each still occurs exactly once, inside its new).
- Before any edit, all 40 olds were found once each with no two spans overlapping (so the order of application could not change a match).
- Round trip: replacing each new text back by its old (reverse order) and restoring the notice line reproduces the original byte for byte (md5 `95957c0d…` again). `diff` before/after shows only the 41 changed passages, in 30 hunks (several corrections share a line or adjacent lines: 77–79 (C3, C4), 175–176 (C27, C14), 179–181 (C5, C6, C22, C37), 254–255 (C36, C34), 363 (C26, C15), 367–369 (C32, C30, C11, C16), 602–603 (C9, C10)).
- No correction failed to match; no adjustment was needed.
- Dated brackets: every correction whose new text carries a "[Fable-reviewed 2026-10-18: …]" record (C1, C2, C10, C12, C14, C16, C25, C30–C38) was applied with it as written; the others carry none in the verdict and none was added.

## Fragments

| # | source | line before → after | old once before / gone after | new once after | old text (start) | dated bracket |
|---|---|---|---|---|---|---|
| L-C1 | lenses.verdict.json #1 | 222 → 222 | 1 / gone | 1 | `the chip is public on cards once the live-world row opens [ALIGN §6 Di…` | yes |
| L-C2 | lenses.verdict.json #2 | 471 → 471 | 1 / gone | 1 | `the⏎  aggression chip, the tier label,` | yes |
| L-C3 | lenses.verdict.json #3 | 79 → 79 | 1 / gone | 1 | `a dozen alignment consumers run in lit presets [OBSERVED FOLD:333-351;…` | no (none in correction) |
| L-C4 | lenses.verdict.json #4 | 77 → 77 | 1 / gone | 1 | `calls trade "LIT —"⏎   and populations "—" while` | no (none in correction) |
| L-C5 | lenses.verdict.json #5 | 179 → 179 | 1 / gone | 1 | `drift's vassal rebellion, which breaks a link [OBSERVED `wp/relationsh…` | no (none in correction) |
| L-C6 | lenses.verdict.json #6 | 179 → 179 | 1 / gone | 1 | `whose strength clears 0.82 × the target's plus its protectors' backing` | no (none in correction) |
| L-C7 | lenses.verdict.json #7 | 365 → 365 | 1 / gone | 1 | `Three call forms exist in the host: with a direct-edge trade tie (migr…` | no (none in correction) |
| L-C8 | lenses.verdict.json #8 | 306 → 306 | 1 / gone | 1 | `contraband at arrival gates (no tie passed) [OBSERVED `sp/smuggle.js:1…` | no (none in correction) |
| L-C9 | lenses.verdict.json #9 | 602 → 604 | 1 / gone | 1 | `295-331 (the strength comparator) and 472-491.` | no (none in correction) |
| L-C10 | lenses.verdict.json #10 | 603 → 605 | 1 / gone | 1 | ``sp/distanceRead.js` (1,192): 280-316. `sp/embattlement.js` (449): 84-…` | yes |
| L-C11 | lenses.verdict.json #11 | 368 → 368 | 1 / gone | 1 | `readiness exists only after a war footing [STATED ALIGN §6 Strength]` | no (none in correction) |
| L-C12 | lenses.verdict.json #12 | 22 → 22 | 1 / gone | 1 | `**PENDING APPLICATION** — the sway they design is not yet in V13` | yes |
| L-C13 | lenses.verdict.json #13 | 340 → 340 | 1 / gone | 1 | `FILE-M (pending application) has turned` | no (none in correction) |
| L-C14 | lenses.verdict.json #14 | 176 → 176 | 1 / gone | 1 | `**dark**: the host has no such bands [STATED PROSP §9.1 item 4; FILE-M…` | yes |
| L-C15 | lenses.verdict.json #15 | 363 → 363 | 1 / gone | 1 | `A `criminal_network` label has no class in FILE-M's table yet [INFERRE…` | no (none in correction) |
| L-C16 | lenses.verdict.json #16 | 369 → 369 | 1 / gone | 1 | `FILE-M's verdict table (raid won +1 to the raider …) cannot read it as…` | yes |
| L-C17 | lenses.verdict.json #17 | 193 → 193 | 1 / gone | 1 | `**INVENTION** → **ask 8** (H16's security term)` | no (none in correction) |
| L-C18 | lenses.verdict.json #18 | 520 → 520 | 1 / gone | 1 | `or patrol coverage as embattlement's security input (H16)` | no (none in correction) |
| L-C19 | lenses.verdict.json #19 | 116 → 116 | 1 / gone | 1 | `A caravan keeps an arrival tick and nothing⏎  else [STATED TRADE §2.3]` | no (none in correction) |
| L-C20 | lenses.verdict.json #20 | 240 → 240 | 1 / kept inside new (1) | 1 | `own bands and market phrases public` | no (none in correction) |
| L-C21 | lenses.verdict.json #21 | 314 → 314 | 1 / gone | 1 | `needs a live war front (0.85), a contested or unstable occupation, or …` | no (none in correction) |
| L-C22 | lenses.verdict.json #22 | 180 → 180 | 1 / gone | 1 | `RRa, DC, LR, FS (+S); never on RRb` | no (none in correction) |
| L-C23 | lenses.verdict.json #23 | 138 → 138 | 1 / gone | 1 | `[PROSP §7.3]; alignment-shaped army` | no (none in correction) |
| L-C24 | lenses.verdict.json #24 | 294 → 294 | 1 / gone | 1 | `DESIGNED (PG pg-1…4) or ruled out (OD-FC-8)` | no (none in correction) |
| L-C25 | lenses.verdict.json #25 | 184 → 184 | 1 / gone | 1 | `the owner ruled it (J377)` | yes |
| L-C26 | lenses.verdict.json #26 | 363 → 363 | 1 / gone | 1 | `[OBSERVED rule ids `wp/relationshipEvolution.js:86-103`` | no (none in correction) |
| L-C27 | lenses.verdict.json #27 | 175 → 175 | 1 / gone | 1 | `without any war layer [OBSERVED `wp/relationshipEvolution.js:98-103`; …` | no (none in correction) |
| L-C28 | lenses.verdict.json #28 | 127 → 127 | 1 / gone | 1 | `faith and trade reach it only as buildings; populations do⏎  not [STAT…` | no (none in correction) |
| L-C29 | lenses.verdict.json #29 | 31 → 31 | 1 / gone | 1 | `the Instant World composer's fallback tone, or the DM's preset chip` | no (none in correction) |
| L-C30 | lenses.verdict.json #30 | 368 → 368 | 1 / gone | 1 | `the host has no garrison or standing bands; its structured capacity mo…` | yes |
| L-C31 | lenses.verdict.json #31 | 386 → 386 | 1 / gone | 1 | `enter 3.0, exit 1.5, dwell 3` | yes |
| L-C32 | lenses.verdict.json #32 | 367 → 367 | 1 / kept inside new (1) | 1 | `closes culture distance by up to 15 % only for that pair` | yes |
| L-C33 | lenses.verdict.json #33 | 438 → 438 | 1 / kept inside new (1) | 1 | `by the host's **own exported pure function**` | yes |
| L-C34 | lenses.verdict.json #34 | 255 → 255 | 1 / kept inside new (1) | 1 | `believed trend DC, LR, FS c [POP P-17]` | yes |
| L-C35 | lenses.verdict.json #35 | 475 → 475 | 1 / kept inside new (1) | 1 | `believed population trend` | yes |
| L-C36 | lenses.verdict.json #36 | 254 → 254 | 1 / kept inside new (1) | 1 | `the tier label is public; numbers DM` | yes |
| L-C37 | lenses.verdict.json #37 | 181 → 181 | 1 / kept inside new (1) | 1 | `Coastal footholds` | yes |
| L-C38 | lenses.verdict.json #38 | 551 → 551 | 1 / kept inside new (1) | 1 | `## §6 Owner questions` | yes |
| F-59 | faith.verdict.json #59 | 105 → 105 | 1 / gone | 1 | `war_front 0.72 (hostility carries hardest)` | no (none in correction) |
| P-44 (C-24) | population.verdict.json #44 | 34 → 34 | 1 / gone | 1 | `no premium check was traced in its opener, mount or store write` | no (none in correction) |

L-Cn = `lenses.verdict.json` corrections, 1-based. Lines are the old text's first line before and the new text's first line after.

### The two corrections routed here from other families

Both are corrections to this family's file issued in other families' Fable verdicts; their own apply lanes did not apply them (each may edit only its family's file) and routed them to this lane so they would not drop. The owner's no-deferral rule and the fact that `lens-implications.md` is this lane's file are why they were applied here rather than left open; neither overlaps a lenses correction (checked span by span; `lenses.verdict.json`'s summary names both lines, "none overlapping population C-24 on line 34 or faith C46 on line 105", and RL-34 names "+S's premium gating is the population lane's C-24").

- **F-59** — `faith.verdict.json` corrections[58] (1-based #59; `faith.md`'s table C46; `apply-faith.md` row "C58"), line 105, the faith row: "war_front 0.72 (hostility carries hardest)" → "war_front 0.72 (hostility carries hardest of the two-way carriers; an overlord's authority channel reaches its vassal at 0.82, one way)". Routed at `apply-faith.md:39`.
- **P-44** — `population.verdict.json` corrections[43] (1-based #44; `population.md` C-24, finding V-6), line 34, the +S row: "no premium check was traced in its opener, mount or store write" → "no premium check of its own in its opener, mount or store write, but it opens only under an active campaign, which only a campaign manager (premium or elevated) holds, so it is premium-gated like the Living-World row (POP §7 legend as Fable-reviewed 2026-10-18)". Routed at `apply-population.md:76`.

Consequence for the notice: the verdict's `notice_replacement` says "38 fragments", which counts the lenses verdict's own research corrections; it was applied verbatim as the verdict gives it. The file now also carries the two routed fragments above, recorded here.

## Notice line

Line 3, the file's only line beginning "> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat" ("… research/sf-lenses; to be retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)"), replaced by the verdict's `notice_replacement` verbatim:

> > Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — the readings, rules and 35 asks rest on host facts or the owner's words; 38 fragments correct citations, stale FILE-M quotes, three audience cells and one hysteresis figure (lane retrovalidation/lenses; J392)

No "PENDING FABLE REVIEW" text remains in the file. The rest of the file is untouched (round-trip proof above).

## Not applied here

| correction | kind | file | why | owner |
|---|---|---|---|---|
| lenses C39 (V13 §5.8 (7): "the host's public chips stay where" → "the host's own chips (shown to the DM on its cards and PDF today; no player surface traced) stay where") | design | `docs/volumes/V13-world.md` | design corrections are the design lane's | design lane |
| lenses C40 (rulings.md J384(7) row: "players see the host's public chips \| UPHELD \|" → "… \| UPHELD (the chip itself is a DM surface — Library/Realm cards and the premium PDF, no player surface traced, lenses.md L1 — so the players' share is nothing today) \|") | record | `docs/validation/retrovalidation-2026-10-18/rulings.md` | the rulings record is not a lenses-family file and this lane edits only `research/sf/lens-implications.md`; its old text still occurs exactly once in `rulings.md` (grep, at apply time), so it stays applicable as written | the rulings-record apply (or the orchestrator / J392) |

Nothing for J392 in `docs/PROGRESS.md`: no lenses correction targets it. The verdict's summary names one precision for J392 that is not a correction: J384 (7)'s "public chips" (the chip is a DM surface; journal rows are append-only, so the precision belongs in J392, not in J384).

## Bundle

`research/sf/lens-implications.md` is not a source of `docs/ARCHITECTURE-FULL.md` (`tools/bundle_architecture.py` reads `docs/ARCHITECTURE.md`, `docs/volumes/INDEX.md` and `docs/volumes/V[0-9][0-9]-*.md` only), so no regeneration is owed. `python3 tools/bundle_architecture.py --check` → "UP TO DATE /home/user/maps-architecture/docs/ARCHITECTURE-FULL.md", exit 0 (run after the apply).

## Files touched by this lane

`research/sf/lens-implications.md`; this record; one CHECKPOINT and one LANDED line appended to `docs/lane-events.log`. Working copies in the scratchpad (`…/scratchpad/retro/`): the original, the plan, the apply script, the diff.
