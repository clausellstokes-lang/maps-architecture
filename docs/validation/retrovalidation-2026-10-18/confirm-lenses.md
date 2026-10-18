# Confirm record — retrovalidation/confirm-lenses

Lane: `retrovalidation/confirm-lenses` (fable; J392), the confirming check on `apply-lenses` (opus; J390, Fable-checked). Staffing rule J390. No git command run; the host repository was not touched; no file edited but this record and one line appended to `docs/lane-events.log`.

**Verdict on apply-lenses: PASS.** Every one of the 40 research corrections that target `research/sf/lens-implications.md` (38 from `lenses.verdict.json`, faith #59 and population #44 routed here by their own apply lanes) landed verbatim, the notice line is the verdict's `notice_replacement` byte for byte, nothing else in the file moved, the bundle is fresh, and the apply record states the truth at every row I could check. One correction the verdict issued is still unlanded — C40, a record correction on `rulings.md`, which is not a lenses-family file and which no apply lane owns; it is routed below with its exact fix (§4). It is not a defect of the apply lane.

## 1. What I read, in full

- `docs/validation/retrovalidation-2026-10-18/lenses.verdict.json` — whole (PASS-WITH-CORRECTIONS; 40 corrections: 38 `research` on `research/sf/lens-implications.md`, C39 `design` on `docs/volumes/V13-world.md`, C40 `record` on `rulings.md`; 36 rulings RL-1–RL-36; `notice_replacement`; `summary`). No correction targets `docs/PROGRESS.md`.
- `docs/validation/retrovalidation-2026-10-18/apply-lenses.md` — whole (the apply record: 41 fragments, method, the fragments table, the two routed corrections, the notice, the not-applied table, the bundle note).
- `research/sf/lens-implications.md` as it stands after the apply — whole, 615 lines, md5 `901c8bb66a0d13125cec39ac0e8adc88`.
- The apply lane's before copy `scratchpad/retro/lens-implications.orig.md` — 613 lines, md5 `95957c0d74da9b405b974d189c3999f9` (the md5 the apply record gives for the file before the apply). Its line 34 and line 105 hold the population and faith olds where `lenses.md` (lines 49, 92, 145, 195) and `lenses.verdict.json`'s summary place them, so it is the pre-apply file.
- `faith.verdict.json` corrections[58] (1-based #59) and `population.verdict.json` corrections[43] (1-based #44): the only two corrections in any other family's verdict that target `lens-implications.md` (checked across all 13 `*.verdict.json`).
- The apply-lenses CHECKPOINT (05:26) and LANDED (05:28) lines in `docs/lane-events.log`; `apply-faith.md:39`, `apply-population.md:76` (the routing rows); `confirm-faith.md` and `confirm-population.md` where they speak of this file; `README.md` line 35 (the lenses row); `rulings.md` lines 55 and 66.

## 2. Independent checks (script: `scratchpad/retro/confirm-lenses/check.py`, output `check.out`, diff `live.diff`)

1. **Each old once before, each new absent before, no overlapping spans.** All 40 olds occur exactly once in the before copy; no new text occurs there; the 40 spans do not overlap, so the order of application cannot change a match.
2. **Forward replay.** Before copy + the 38 lenses corrections in verdict order + faith #59 + population #44, then line 3 (the file's only line beginning `> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat`, seat `research/sf-lenses`) replaced by `notice_replacement` → md5 `901c8bb66a0d13125cec39ac0e8adc88`, **byte-identical to the live file**.
3. **Reverse replay.** Live file, notice restored to the J375 line, each new replaced by its old in reverse order → md5 `95957c0d74da9b405b974d189c3999f9`, **byte-identical to the before copy**. So nothing moved beyond the 40 corrections and the notice.
4. **Per correction, on the live file** (table below): each new text once; each old gone, except the eight the correction keeps inside its new by design (C20, C32–C38: the correction appends a dated bracket), each of which occurs exactly once, inside its new. Every "line before → line after" in the apply record's table is reproduced (C9 602 → 604 and C10 603 → 605 shift by C38's two inserted lines; all others unchanged).
5. **Notice.** Live line 3 equals `notice_replacement` exactly; `PENDING FABLE REVIEW` occurs 0 times in the file; `Fable-reviewed 2026-10-18` occurs 18 times (16 corrections carrying a bracket — C1, C2, C10, C12, C14, C16, C25, C30–C38 — plus the notice and the "as Fable-reviewed 2026-10-18" inside population #44's new text). No J375-form notice naming the lenses seat remains anywhere in the repository (grep for `Fable seat research/sf-lenses` hits only `lenses.md:245`, which quotes it).
6. **Diff.** `diff -U0` before/live: 30 hunks, 114 lines — the apply record's count. 613 → 615 lines; the +2 are C38's blockquote and the blank line after it. Trailing newline kept.
7. **Bundle.** `python3 tools/bundle_architecture.py --check` → `UP TO DATE /home/user/maps-architecture/docs/ARCHITECTURE-FULL.md`, exit 0. The note is not a bundle source; C39 (design) landed through apply-design: the old phrase `the host's public chips stay where` occurs nowhere in `docs/volumes/V13-world.md` or `docs/ARCHITECTURE-FULL.md`, and the new phrase occurs once in each (V13 line 3197; bundle line 76596).
8. **Amendments file:** not owed by this lane (no design correction is the apply-lenses lane's).
9. **Lane log.** One CHECKPOINT and one LANDED line for `retrovalidation/apply-lenses` (log lines 9613–9614), both suffixed `(opus; J390, Fable-checked)`.

| # | correction | live line | old in live | new in live | result |
|---|---|---|---|---|---|
| C1 | aggression-chip audience (L1) | 222 | gone | once | OK |
| C2 | §4.5 public list (L1) | 471 | gone | once | OK |
| C3 | "a dozen alignment consumers" (L2) | 79 | gone | once | OK |
| C4 | FOLD §2 LIT column (L3) | 77 | gone | once | OK |
| C5 | vassal rebellion cite (L4) | 179 | gone | once | OK |
| C6 | overlord test arithmetic (L5) | 179 | gone | once | OK |
| C7 | three callers, two forms (L6) | 365 | gone | once | OK |
| C8 | contraband caller cite (L7) | 306 | gone | once | OK |
| C9 | §7.3 relationshipRuleHelpers range (L8) | 604 | gone | once | OK |
| C10 | §7.3 ranges widened (L8) | 605 | gone | once | OK |
| C11 | readiness / live facets (L9) | 368 | gone | once | OK |
| C12 | FILE-M applied, preamble (L10) | 22 | gone | once | OK |
| C13 | FILE-M applied, §3 opening (L10) | 340 | gone | once | OK |
| C14 | held-by-force dark cell (L11, V-1) | 176 | gone | once | OK |
| C15 | criminal_network classed (L12) | 363 | gone | once | OK |
| C16 | FILE-M 714 (11) reads the raid (L13) | 369 | gone | once | OK |
| C17 | ask 8 / H16 (L14) | 193 | gone | once | OK |
| C18 | ask 8 wording (L14) | 520 | gone | once | OK |
| C19 | caravan record fields (L15) | 116 | gone | once | OK |
| C20 | stocks audience (L16) | 240 | kept inside new, once | once | OK |
| C21 | embattlement entry conditions (L17) | 314 | gone | once | OK |
| C22 | steadings RR cell (L18) | 180 | gone | once | OK |
| C23 | PROSP cites for A2 / MF §11.4 (L19) | 138 | gone | once | OK |
| C24 | OD-FC-8 reading (L20) | 294 | gone | once | OK |
| C25 | wild land attribution (L21) | 184 | gone | once | OK |
| C26 | relationshipEvolution range (L22) | 363 | gone | once | OK |
| C27 | adversarial cites (L23) | 175 | gone | once | OK |
| C28 | populations town map "none traced" (L24) | 127 | gone | once | OK |
| C29 | World's Temper picker (L25) | 31 | gone | once | OK |
| C30 | M term: floors and bucket (V-1) | 368 | gone | once | OK |
| C31 | boom hysteresis (V-2) | 386 | gone | once | OK |
| C32 | 15 % closing, tie form only (V-6) | 367 | kept inside new, once | once | OK |
| C33 | class 2 host-side derivation (V-5) | 438 | kept inside new, once | once | OK |
| C34 | believed trend row (V-3) | 255 | kept inside new, once | once | OK |
| C35 | §4.5 believed population trend (V-3) | 475 | kept inside new, once | once | OK |
| C36 | numbers DM (V-4) | 254 | kept inside new, once | once | OK |
| C37 | lodgement register (V-7) | 181 | kept inside new, once | once | OK |
| C38 | §6 answered by J384 (V-8) | 551–553 | kept inside new, once | once | OK |
| faith #59 | war_front 0.72 "hardest of the two-way carriers" | 105 | gone | once | OK |
| population #44 | +S row premium-gated | 34 | gone | once | OK |

## 3. Checked and dismissed (observations for J392, no change owed)

- **"38 fragments" in the notice.** The file carries 40 corrections plus the notice; the notice counts the lenses verdict's own research corrections. The apply lane was told to apply `notice_replacement` verbatim and did; the apply record states the two extra. A precision for J392, not a defect.
- **§3.4, lines 389–390** still cite `wp/relationshipRulesCore.js:762-770` for "a vassal rebellion (drift's independence pressure, fed by the strength comparator)". C5 corrected only §2.1's claim that those lines "break a link"; §3.4 claims a trigger, which `:762-770` does raise, and §7.3 as corrected by C10 lists `745-851 (the vassal rules §2.1 and §3.4 cite)`, which covers it. Consistent.
- **§2.6 trend row, line 255:** the Audience cell still reads "DM; believed for players there" while C34's bracket, in the Lit-lanes cell beside it, says that phrase reaches no player. That is the form the verdict chose (C34 brackets the row rather than rewriting the Audience cell); the bracket governs. No change.
- **Line 522, ask 10, "the strongest carrier source":** confirm-faith checked it against H28 and file s item 938 and dismissed it (the carrier that moved one conversion, not a ranking). Nothing to add.
- **Two cross-family corrections applied here** (faith #59, population #44) — beyond the apply lane's named task, taken under the owner's no-deferrals rule, both routed to it by `apply-faith.md:39` and `apply-population.md:76`, both expected by the lenses verdict's summary and RL-34, neither overlapping a lenses correction (span check). Correctly done; `confirm-faith.md:33` and `confirm-population.md:38` confirm the same.

## 4. Routed problem — not the apply lane's, exact fix given

| # | where | what | fix | owner |
|---|---|---|---|---|
| P1 | `docs/validation/retrovalidation-2026-10-18/rulings.md`, line 66, the J384(7) row | lenses C40 (kind `record`) has not landed: the old text `players see the host's public chips \| UPHELD \|` still occurs exactly once and the new text nowhere. The apply-lenses lane rightly left it (the rulings record is not a lenses-family file), the apply record and `README.md:35` list it as not applied, and no apply lane owns record corrections to `rulings.md` — faith C59 on line 55 of the same file is in the same state (`confirm-faith.md` P1). Under the owner's no-deferrals rule it needs an owner. | In `rulings.md` replace, once, `players see the host's public chips \| UPHELD \|` with `players see the host's public chips \| UPHELD (the chip itself is a DM surface — Library/Realm cards and the premium PDF, no player surface traced, lenses.md L1 — so the players' share is nothing today) \|` (the verdict's C40 `new`, verbatim). One line; no bundle effect. | the orchestrator, a rulings-record apply lane, or J392 — together with faith C59 |

## 5. Files touched by this lane

This record; one LANDED line appended to `docs/lane-events.log`. Working files in `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/confirm-lenses/` (`check.py`, `check.out`, `live.diff`).
