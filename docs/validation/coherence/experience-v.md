# Amendments v (the experience pass, J397: birth and the first month, belief and information, the lenses and their substance) — the application record

> Provenance: written by Opus 5.5 under the Fable manager (docs/PROGRESS.md J392's model ruling); checked by the Fable manager at close.

The seat amendments/experience-apply applied `docs/AMENDMENTS-2026-10-24v.md` on 2026-10-24 as a coherence pass does, first of the three (v, then w, then x): every fragment in file
order, each quoted current text found by exact match exactly once in its target at its turn and replaced by the new text verbatim
(a ⏎ in a quote is a line break, the continuation's indentation kept). The dry run (`experience-pass/apply/apply_vwx.py dry` in the
session's scratchpad, outside the repository; the review seat's `review/dryrun_vwx.py` parser, itself the seats' `dryrun_v.py` /
`dryrun_w.py` / `dryrun_x.py` lineage of `world-growth/revise/dryrun_revise.py`) applied files v, w and x end to end over copies of
the five targets and reported "file v: 36 items (1084-1119), 64 fragments, 0 failures", "file w: 59 items (1141-1199), 114
fragments, 0 failures", "file x: 40 items (1201-1240), 91 fragments, 0 failures" and "DRY: OK". The same application was then made
to the real targets (`apply_vwx.py real`), and the results were identical byte for byte to the copies (`cmp`).
`python3 tools/bundle_architecture.py` was run after all three files and `--check` reports the bundle up to date.

**Result.** All 36 change items (1084–1119) applied, all 64 fragments matched exactly once at their turn; no item not applied. Item 1083 is the owner's rule (J397) and carries no current or new text. After all three files every new text occurs exactly once in its target, except item 1111 (a), whose new text file w item 1179 (a) quotes in part and refines at its own turn (by design: file w quotes the targets as the earlier files leave them); its content stands inside that item's new text, whose lines are given. Line numbers are those on disk after all three files (v, w, x) are applied.

## Per item

| item | ruling | target | heading (file v) | applied | line(s) the new text now occupies |
|---|---|---|---|---|---|
| 1083 | J397 | — | The owner's rule (2026-10-24) | owner-rule item; no current or new text | — |
| 1084 | J397 (M2) | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (`Placement.hostLocked`: the grace rule) | applied (1 fragment) | 918 |
| 1085 | J397 (M11) | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (`WorldEvent`: the headline join, the integrity register, the knowledge events, the population after a depopulation) | applied (3 fragments) | (a) 970; (b) 974; (c) 973 |
| 1086 | J397 (M22) | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (`PolityFacts`: the host's allegiance names) | applied (1 fragment) | 1003–1004 |
| 1087 | J397 (M1), (M8), (M9), (M24) | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (`LensFacts`: the birth window, the party's seat and observer, the believed rows' age and confidence, a court's believed political facts, a column's cargo; the type `Believed`) | applied (7 fragments) | (a) 1051–1053; (b) 1055; (c) 1057; (d) 1073; (e) 1074; (f) 1072; (g) 1046–1047 |
| 1088 | J397 (M1), (M8) | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (`CampaignFacts`: the party's home seat; the populations the birth fold reads) | applied (1 fragment) | 1091 |
| 1089 | J397 (M3), (M8), (M10), (M28) | `docs/volumes/V13-world.md` | Volume 13 — §2.3 New rule tables (`LensRule`: the felt row, the believed marks' fade, the party's news delay, the area-fill option) | applied (3 fragments) | (a) 1242; (b) 1245–1248; (c) 1432–1436 |
| 1090 | J397 (M2) | `docs/volumes/V13-world.md` | Volume 13 — §3.11.6 The port, the canon, the map feed and the settlement map record (the consumption law: the birth canon at the first advance) | applied (1 fragment) | 3385–3388 |
| 1091 | J397 (M7), (M11) | `docs/volumes/V13-world.md` | Volume 13 — §3.11.6 (the map feed: `reasonOf`; the headline join) | applied (1 fragment) | 3476–3494 |
| 1092 | J397 (M1), (M8), (M9) | `docs/volumes/V13-world.md` | Volume 13 — §3.11.6 (the presentation inputs: `beliefView`'s observer; `lensWindow` at creation, the party's seat and observer, the believed rows' age, a court's believed political facts; the recorded input `polity` at creation) | applied (3 fragments) | (a) 3551–3552; (b) 3554–3567; (c) 3535–3537 |
| 1093 | J397 (M9), (M12), (M23), (M50) | `docs/volumes/V13-world.md` | Volume 13 — §3.11.6 (the port's laws: (3) restated for the court viewpoint; the seam words of (9); the new law (10) — nobody is ever current at the map feed) | applied (2 fragments) | (a) 3591–3595; (b) 3613–3627 |
| 1094 | J397 (M7), (M11) | `docs/volumes/V13-world.md` | Volume 13 — §4.7 The clerk's view: reason records and the four readers (`whatCaused` descends into the host's receipts) | applied (1 fragment) | 4253 |
| 1095 | J397 (M10), (M11) | `docs/volumes/V13-world.md` | Volume 13 — §5.1 The world map: layers and styles (the `events` row: the pin action, the session-prep half, the knowledge pins, the integrity word) | applied (1 fragment) | 4290 |
| 1096 | J397 (M9), (M10) | `docs/volumes/V13-world.md` | Volume 13 — §5.1 (the player picture: the party observer's believed sway; the default-preset arm) | applied (1 fragment) | 4305–4313 |
| 1097 | J397 (M3) | `docs/volumes/V13-world.md` | Volume 13 — §5.8 The lens mechanism ((1) One record: the felt row; a lens that fails its read does not light) | applied (1 fragment) | 4453–4460 |
| 1098 | J397 (M1) | `docs/volumes/V13-world.md` | Volume 13 — §5.8 ((2) The regime, before the picture: the birth window) | applied (1 fragment) | 4467–4472 |
| 1099 | J397 (M23), (M27) | `docs/volumes/V13-world.md` | Volume 13 — §5.8 ((5) Two grammars for movement: the split between a mover marker and a dated fact; the two seas) | applied (1 fragment) | 4500–4517 |
| 1100 | J397 (M8), (M9), (M10), (M11) | `docs/volumes/V13-world.md` | Volume 13 — §5.8 ((7) The audience filter: the party's observer, the believed rows' age, the integrity word, the default-preset arm) | applied (1 fragment) | 4529–4547 |
| 1101 | J397 (M1) | `docs/volumes/V13-world.md` | Volume 13 — §5.8 ((8) The time scrub and the plates: plate 0 at the birth window) | applied (1 fragment) | 4566–4568 |
| 1102 | J397 (M1) | `docs/volumes/V13-world.md` | Volume 13 — §5.8 ((9) Land cover beside the lenses: the birth fold) | applied (1 fragment) | 4581–4585 |
| 1103 | J397 (M3), (M8), (M23), (M29) | `docs/volumes/V13-world.md` | Volume 13 — §5.9 The lenses (1. Plague: the felt line; the arrived caption; the approach ring a dated fact; the believed mark's age) | applied (4 fragments) | (a) 4623–4625; (b) 4631; (c) 4632; (d) 4639 |
| 1104 | J397 (M1), (M3), (M9), (M22) | `docs/volumes/V13-world.md` | Volume 13 — §5.9 (2. Sway: the provisional regime narrowed; the legend's label rule; the court viewpoint; the felt line) | applied (2 fragments) | (a) 4653–4656; (b) 4659–4678 |
| 1105 | J397 (M3) | `docs/volumes/V13-world.md` | Volume 13 — §5.9 (3. Patrols: the felt line) | applied (1 fragment) | 4697–4699 |
| 1106 | J397 (M3) | `docs/volumes/V13-world.md` | Volume 13 — §5.9 (4. Trade: the felt line) | applied (1 fragment) | 4723–4725 |
| 1107 | J397 (M3), (M23), (M24) | `docs/volumes/V13-world.md` | Volume 13 — §5.9 (5. Populations: the felt line; columns as mover markers; the refusal's gate; a sent cargo) | applied (3 fragments) | (a) 4759–4760; (b) 4767; (c) 4771–4775 |
| 1108 | J397 (M3), (M6), (M8), (M28) | `docs/volumes/V13-world.md` | Volume 13 — §5.9 (6. Religion: the `none` wording; the felt line; the seat-area fill as an option; the believed faith's age) | applied (3 fragments) | (a) 4786–4790; (b) 4796; (c) 4812 |
| 1109 | J397 (M3), (M8), (M28) | `docs/volumes/V13-world.md` | Volume 13 — §5.9 (7. Prosperity: the felt line; the band ring by default; the believed band's age) | applied (2 fragments) | (a) 4827–4829; (b) 4833 |
| 1110 | J397 (M3), (M6), (M28) | `docs/volumes/V13-world.md` | Volume 13 — §5.9 (8. Alignment: the banner's order; the felt line; the axes' glyph by default) | applied (2 fragments) | (a) 4849–4853; (b) 4857 |
| 1111 | J397 (M1), (M3), (M6), (M12), (M22), (M24), (M27), (M29), (M50) | `docs/volumes/V13-world.md` | Volume 13 — §7 Tests and acceptance bars (the experience fixtures; T-V13-74 – T-V13-86 after T-V13-73) | applied (2 fragments) | (a) refined by file w item 1179 (a), in its text at 5017–5022; (b) 5125–5138 |
| 1112 | J397 (M3) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 The host's parallel track (the preamble: every H row minted from now on carries its felt sentence and first-visible line) | applied (1 fragment) | 5290–5295 |
| 1113 | J397 (M2), (M3) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 H22 and H12 (revised in place: the birth canon taken at the first advance — the grace rule; the felt line; H12's genesis over the seats as they then stand) | applied (3 fragments) | (a) 5334; (b) 5334; (c) 5324 |
| 1114 | J397 (M1), (M3), (M8) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 H23 (revised in place: the window at creation and after every advance, undo and resume; the party observer's record; the felt line) | applied (3 fragments) | (a) 5335; (b) 5335; (c) 5335 |
| 1115 | J397 (M1), (M3), (M7), (M9), (M11), (M12), (M22), (M23) | `docs/volumes/V13-world.md` | Volume 13 — §8.5 H36 – H44 (after H35: born applied and born peopled; the birth window; the grace rule; the party observer; a court's believed facts and the integrity register; `headlineOf` and the knowledge events; the map feed's readers fenced; the cause walk across the seam; the ambiguity law amended) | applied (1 fragment) | 5347–5356 |
| 1116 | J397 (M1), (M3), (M6), (M12), (M22), (M24), (M27), (M29), (M50) | `docs/volumes/V13-world.md` | Volume 13 — §9 Decisions (J-V13.137 – J-V13.153, after J-V13.136) | applied (1 fragment) | 5503–5520 |
| 1117 | J397 (M9), (M11) | `docs/volumes/V13-world.md` | Volume 13 — §9 Deferred decisions (D-V13.11, D-V13.12 after D-V13.10) | applied (1 fragment) | 5569–5575 |
| 1118 | J397 (M2) | `docs/volumes/V13-world.md` | Volume 13 — §11 Owner questions ("Ruled — the birth canon and a fight verdict": the birth canon at the first advance) | applied (1 fragment) | 6150–6152 |
| 1119 | J397 (M1), (M3), (M6), (M12), (M22), (M24), (M27), (M29), (M50) | `docs/volumes/V13-world.md` | Volume 13 — §11 Owner questions (a new ruling: birth, belief and the lenses — the experience pass) | applied (1 fragment) | 6161–6178 |

## The targets before and after

Before: the target as it stood before file v; after: as file v left it (file w changed it further).

| target | md5 before | lines before | md5 after | lines after |
|---|---|---|---|---|
| `docs/volumes/V13-world.md` | `a382bc11b32e7c44ea7d0a8c667b57c4` | 5851 | `b1662afad7e505dfd65e4b8671479c90` | 6076 |

## The ids minted

As the file's head lists them ("**Ids minted:**" in `docs/AMENDMENTS-2026-10-24v.md`): items 1084–1119 (1083 the owner-rule item). Each numbered id the head names now stands in the targets:

| id | occurrences after all three files |
|---|---|
| J-V13.137 | `V13-world.md` 2 |
| J-V13.153 | `V13-world.md` 2 |
| T-V13-74 | `V13-world.md` 3 |
| T-V13-86 | `V13-world.md` 3 |
| H36 | `V13-world.md` 9 |
| H44 | `V13-world.md` 7 |
| H22 | `V13-world.md` 37, `ARCHITECTURE.md` 3 |
| H23 | `V13-world.md` 24, `V09-application.md` 1 |
| D-V13.11 | `V13-world.md` 1, `V15-atlas.md` 1 |
| D-V13.12 | `V13-world.md` 2 |
| H24 | `V13-world.md` 13, `V09-application.md` 1 |
| H34 | `V13-world.md` 9, `V15-atlas.md` 3 |

The ids the head leaves free (J-V13.154, J-V13.165, T-V13-87, T-V13-95, BCR-V13-48, BCR-V13-52, D-V13.13, D-V13.15, J-V9.150, J-V9.155, T-V9-88, T-V9-90) occur nowhere in the five targets. The named fields, readers, types and refusals the head lists are those the items' new texts carry, applied verbatim above.

## The lint

The clean-room lint (`apply_vwx.py`, the preamble's token list: `SettlementForge`, `settlement-engine`, `.js`, `FPQ`, `DESIGN_`, `WY`, `EC`, `GR`, `RD`, `WC`, `ES`, `HB`, `PG`, `POP`, `TR`, `Herald`, `Chronicler`, `realistic_regional`, `dramatic_campaign`, `infoMode`, `beliefMap`, `K3`, `SP-9`, `hopDelay`, `worldPlan`, `composer`) re-run by this seat over all 64 new texts of this file as applied: **clean-room: no hit.**
