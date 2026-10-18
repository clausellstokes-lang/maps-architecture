# Coherence application — amendments file l (items 648–658) applied to the base and volume 14 (coherence/vtt-l-and-k11)

> PENDING FABLE REVIEW — written by Opus 5.5 standing in for the Fable seat coherence/vtt-l-and-k11; to be retrovalidated overall at the next opportunity (owner, 2026-10-17, J375)

Lane `coherence/vtt-l-and-k11`, 2026-10-17. Read whole: `research/vtt/profile-reverification-2026-10-17.md` (its §5
delta table and §6 BCR-VTT-1 – 8 with the pin line); `docs/ARCHITECTURE.md` §11.1 from *Formats* through *Plain scene
PNG* and §11.2's `ExportOpts.vtt` member with its out-of-range comment; `docs/volumes/V14-sites.md` §5.3 whole, its
§1b.4 rows, T-V14-11, §12's PLAUSIBLE list and §11 Q4; the form of file k (`docs/AMENDMENTS-2026-10-16k.md`'s head,
items 600–602, 628, 638 and its census) and of its application record (`world-sites-k.md`'s head and first rows).

- Base snapshot before: `docs/ARCHITECTURE.md` md5 `f200cdee848c89fb52e844ab92c9a138`, 24 436 lines; after: md5
  `3552f3ca86992a96ecc9bc987af5e7f8`, 24 439 lines.
- V14 snapshot before: `docs/volumes/V14-sites.md` md5 `0650023a25dd59c0d14a8c06d376a07c`, 3 166 lines; after: md5
  `3323294d08b429ac6f468eb7a73700c4`, 3 183 lines.
- Method: each item's current text searched as an exact string (the line wrap and the continuation's indentation
  included where the quote wraps); a quote found other than exactly once would have been left UNAPPLIED with the count
  — none was. Each matched quote replaced by the item's new text as file l writes it, never paraphrased (the base's long
  lines kept long; V14's wrapped prose re-wrapped only at the inserted text's own line breaks).
- Bundle: `python3 tools/bundle_architecture.py` → `docs/ARCHITECTURE-FULL.md`, 79 542 lines from 16 sources.

## 1 The items, one row each

Columns: item · target file and heading · matched · applied · the sentence replaced, quoted once · surrounding sentences
rewritten · status. "⏎" marks a line wrap in the quoted file.

| item | target | matched | applied | replaced (quoted once) | surrounding rewritten | status |
|---|---|---|---|---|---|---|
| 648 | `docs/ARCHITECTURE.md` §11.1, *The `.dd2vtt` profile (DEF-4)* (its heading paragraph) | exact | replaced: the heading kept and the pin line written after it in the same paragraph (Universal VTT revised 2026-08-22; Foundry 14 — 14.369 of 2026-10-08, API 14.368; the two importers at 6.1.1 and 0.0.8, unnamed; the next re-verification's trigger) | "**The `.dd2vtt` profile (DEF-4).**" | none | APPLIED |
| 649 | `docs/ARCHITECTURE.md` §11.1 DEF-4, *Scope* | exact (both fragments, on the bullet's one long line) | replaced: (a) the multi-scene sentence — the two-digit zero-padded ordinal, an ordering convention only, no importer pairing by name, the Foundry scene JSON the manual-step-free path; (b) the pin clause pointed at the pin line | (a) "a multi-scene export writes one image and one JSON per scene named `<base>.<ordinal>.dd2vtt` (0 the ground, then each storey or level in elevation order) with the scene's elevation and name in the `plat` object;" (b) "the profile's version is pinned by item 136 (c)'s re-verification before M-ENC's SE2." | none | APPLIED |
| 650 | `docs/ARCHITECTURE.md` §11.1 DEF-4, *Fields* | exact; (b) across a line wrap | replaced: (a) `format` 0.3 carried for compatibility, not checked; (b) `objects_line_of_sight` empty save a crop's transient sight-blockers, written there and in `line_of_sight`, `plat.objectsAlsoInLos: true` | (a) "* **Fields:** `format` 0.3;" (b) "`objects_line_of_sight`⏎  empty;" | none | APPLIED |
| 651 | `docs/ARCHITECTURE.md` §11.1 DEF-4, *Per layer* | exact, across a line wrap | replaced: the `plat` clause gains the top-level vendor strings `software: 'PLAT <output version>'` and `creator` | "its elevation in the file name⏎  and in a `plat` extension object;" | none | APPLIED |
| 652 | `docs/ARCHITECTURE.md` §11.1 DEF-4, *Per raised way* | exact | replaced: a deck as one more `Level` (`elevation.bottom` the mean deck elevation, `top` plus `vtt.levelBandCm`, `background.src`, `visibility.levels` naming the ground's level, its walls and portals carrying the level's id) | "a Foundry scene writes each deck as one more level with its elevation band." | none | APPLIED |
| 653 | `docs/ARCHITECTURE.md` §11.1 DEF-4, *Per storey* | exact | replaced: the stair core an unnamed portal, its name and storeys in `plat.stairs: { portal; name; from; to }[]` | "the stair core a named portal on both storeys' scenes" | none (the clause that follows, "while its flights at or above level 0 stand …", reads on unchanged) | APPLIED |
| 654 | `docs/ARCHITECTURE.md` §11.1 DEF-4, *Foundry scene JSON* | exact, the whole bullet across four lines | replaced: one Foundry 14 Scene per scope — `grid`, `width`/`height`, `padding`, `initialLevel`, no scene-level background, `journal`/`notes`, `flags.plat`; `levels[]` one `Level` per scene with `elevation { bottom, top }` (`vtt.levelBandCm` where no ceiling), `background.src`, `visibility.levels`, `flags.plat`; `walls[]` with `levels`, a wall 20/20/20/20, a closed portal `door: 1, ds: 0`, a concealed door `door: 2`, a window `sight`/`light` 30 with `threshold`, a non-window open portal no wall; the named constants `WALL_MOVEMENT_TYPES`, `EDGE_SENSE_TYPES` (renamed from `WALL_SENSE_TYPES`), `WALL_DOOR_TYPES`, `WALL_DOOR_STATES`, `EDGE_DIRECTIONS` (renamed from `WALL_DIRECTIONS`); `lights[]` with `elevation`, `config { dim, bright, color, alpha, angle }`, `levels` | "* **Foundry scene JSON:** the same geometry as walls (`c: [x0, y0, x1, y1]` with movement and sight types; doors flagged;⏎  an enceinte's walls by run as `line_of_sight` above — a `patched` run a wall, a `breached` or `dismantled` run none),⏎  the same lights, a background image file, grid size and distance units — written before the walls — and journal⏎  entries from the gazetteer." | none | APPLIED |
| 655 | `docs/volumes/V14-sites.md` §1b.4 (the `SiteLevel` and `TransientItem` rows' export cells) | exact (both cells) | replaced: (a) the ordinal the file's two-digit suffix, an ordering convention only, and the level's `Level` in the Foundry scene JSON; (b) the barricade's or cart's polyline in both lists | (a) "the per-level `.dd2vtt` scene (its ordinal the file suffix, `plat.level` its elevation and name)" (b) "VTT objects (`objects_line_of_sight` for a barricade or cart)" | none | APPLIED |
| 656 | `docs/volumes/V14-sites.md` §5.3 (*The VTT crop scope*; *The multi-floor convention*; *The fields per scene*) | exact; (a) across one wrap, (b) across three | replaced: (a) the transient sight-blockers in both lists with `plat.objectsAlsoInLos`; (b) the convention sentence corrected (two-digit ordinal, ordering only, no importer pairs by name) and the sentence on the Foundry scene JSON as the multi-level path added; (c) the vendor strings beside "exactly these" | (a) "the transient⏎items' sight-blocking shapes as `objects_line_of_sight`" (b) "named `<base>.<ordinal>.dd2vtt` with the scene's ordinal as the numeric⏎suffix (0 the ground, then each storey or level in elevation order, `EncounterCrop.scenes`' ordinals) and the⏎scene's elevation and name in its `plat` object (`plat.level`, `plat.storey`) — the pairing the Foundry Scene Levels⏎importer reads; the research seat's item 136 (c) re-verification pins the exact rule with the profile's version." (c) "§11.1's profile emits exactly these per scene." | none beyond the item's own (c), which the item carries as consequential on BCR-VTT-6 | APPLIED |
| 657 | `docs/volumes/V14-sites.md` §7, T-V14-11 | exact (all four fragments, on the row's one line) | replaced: (a) both lists; (b) the two-digit ordinal, an ordering convention; (c) the vendor strings; (d) the pin recorded and the Foundry scene's levels, walls, lights, window and secret-door clauses added to the bar | (a) "the transient items appear as objects and the occupancy as `plat.occupancy` notes, never as tokens;" (b) "named `<base>.<ordinal>.dd2vtt`, the ground 0 and each storey or level by its ordinal," (c) "plus the `plat` object with `level`/`storey`," (d) "is recorded with the profile's version pin before SE2 exits \|" | none | APPLIED |
| 658 | `docs/volumes/V14-sites.md` §12 CONFIRMED versus PLAUSIBLE | exact, across a line wrap | replaced: the PLAUSIBLE claim settled and re-posed as Foundry 14's `levels[]` holding at Foundry 15 | "that the Foundry Scene Levels convention is still the⏎  numeric-suffix pair at the item 136 (c) re-verification;" | none | APPLIED |

**Census.** 11 items, 11 APPLIED, 0 UNAPPLIED; 19 fragments matched exactly (9 in the base, 10 in V14), 6 of them
across a line wrap; 0 surrounding sentences rewritten outside the items' own texts.

## 2 The revision notes and the citation row

- `docs/ARCHITECTURE.md`: a revision note under the header's validation note (the lane, file l, the items, this
  record, the J375 notice); §0.2's heading gains "648–658 (file l)" and its file sentence gains file l's entry
  ("cited as `file l item n`"), as file k's pass wrote file k's.
- `docs/volumes/V14-sites.md`: a *Coherence l* note after *Reconciliation r0*, with the J375 notice and the four items.

## 3 Left as they stand (read, not changed)

- §11.1's VTT row ("no manual steps on import"): holds through item 654's Foundry scene JSON.
- §11.2's `ExportOpts.vtt` and its out-of-range comment: no member added; `flags.plat` (named in the comment) is
  item 654's Scene `flags.plat`.
- V14 §2.4's `EncounterCrop.scenes` comment ("the file suffix: 0 the ground …") and §3.12 (6) ("the file suffix of the
  multi-floor convention"): the ordinal stays the number; its two-digit spelling is the file name's (item 649 (a)).
- V14 §10.1's BCR-V14-8 row: a request as made and applied by file k; history, not a current statement.
- `research/sites/survey.md` §2.1, §2.9, §6.1 (1): BCR-VTT-8's and BCR-VTT-2's survey clauses — a research record, the
  research seat's to apply (file l's *Not items*).
