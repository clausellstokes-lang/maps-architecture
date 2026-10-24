# Amendments v — the experience pass (J397): birth and the first month, belief and information, the lenses and their substance

Written by the session's Fable seat amendments/experience-v on 2026-10-24 under the owner's rule of that day
(`docs/PROGRESS.md` J397: "So do the prompts and integrate them that can be done on maps and give me the prompts for
settlement engine", then "Try again" — read as: carry the rulings the session proposed in its substance-and-experience
synthesis, `research/experience/01–05`, into the architecture wherever the map side can carry them, and write the host's
side as prompts for a settlement-engine session; the model ruling as J392). This file is the first of the pass's three
(v: birth, belief, lenses; w: politics, cover, the physical world, the surface, the base, V09; x: V15, V14) and carries
J397's map-side rulings M1–M3, M6–M12, M22–M24, M27–M29 and M50 into volume 13 by change items — the birth window and the
birth fold, the grace rule, felt sentences on every lens and every host row minted from now on, "why" crossing the seam
both ways, the party's observer with aged believed rows, the court viewpoint, the default-preset arm, the headline join,
nobody current at the map feed, the host's allegiance names, mover markers split from dated facts, and the lenses'
wordings and fills the reads found wrong. It designs nothing the rulings did not ask for; where a ruling was
under-specified the choice is recorded in its J row. Nothing here is applied: an Opus apply seat applies v, w and x in
that order after the review seat has checked them.

Numbered from **1083** (file u ended at 1082).

**APPLIED** — not yet: this line is the apply seat's (amendments/experience-apply; record `docs/validation/coherence/experience-v.md`), to be written after the review seat's check; until then every item of this file is unapplied. Item 1083 is the owner's rule and carries no current or new text.

**Ids minted:** items 1083–1119 (1083 the owner-rule item; 1084–1119 thirty-six change items over volume 13 alone); J-V13.137 – J-V13.153; T-V13-74 – T-V13-86; H36 – H44 (H22 and H23 revised in place); D-V13.11, D-V13.12; the port's law (10); the port reader `reasonOf` and the host-registered reader `headlineOf`; the type `Believed`; the fields `WorldEvent.integrity`, `WorldEvent.populationAfter` (the review's EX-04: the field H24, H34 and §3.6 (5) (a) read), `PolityFacts.names`, `LensFacts.partySeat`, `LensFacts.observer`, `LensFacts.courts`, `LensFacts.columns[].cargo`, `CampaignFacts.homeSeat`, `LensRule.lenses[].felt`, `LensRule.believed`, `LensRule.partyNewsDelay`, `LensRule.areaFill`. **Ids left free in my blocks:** items 1120–1140; J-V13.154 – J-V13.165; T-V13-87 – T-V13-95; BCR-V13-48 – BCR-V13-52 (the base need not change: every mechanism lands in V13's records, port and lenses, the plate cache BCR-V13-38 already holds); D-V13.13 – D-V13.15; J-V9.150 – J-V9.155 and T-V9-88 – T-V9-90 (no V09 item: every user-facing string these rulings need is a legend string or a card action of V13's own, V13 §5.8 (1) and (6), drawn by V09 under BCR-V13-39 and decided by none of its rows).

**Dry run:** 36 change items, 64 fragments; every current text matched exactly once at its turn and every new text exactly once after, on a copy of `docs/volumes/V13-world.md` (the script `experience-pass/v/dryrun_v.py` in the session's scratchpad, the parser of `world-growth/revise/dryrun_revise.py`). **Clean-room lint: no hit** (the preamble's token list over every new text; `experience-pass/v/lint_v.py`).

## Closure table (every ruling → the items that carry it)

| ruling | subject | carried by |
|---|---|---|
| J397 (M1) | the birth window and the birth fold: every banner resolved at birth, the sway from genesis facts, the fields from the campaign's populations, the first advance redrawing only what changed; the provisional regime narrowed | items 1087 (a) (`LensFacts.window`), 1088 (`CampaignFacts`), 1092 (`lensWindow` at creation; (c) `polity` at creation), 1098 (§5.8 (2)), 1101 (§5.8 (8): plate 0), 1102 (§5.8 (9): the birth fold), 1104 (a) (§5.9 (2)), 1111 (T-V13-74), 1114 (H23), 1115 (H36, H37), 1116 (J-V13.137), 1119 (§11) |
| J397 (M2) | the grace rule: the birth canon at the first advance over the seats as they then stand; seats drag free until then; `hostLocked` from the first advance | items 1084 (`Placement.hostLocked`), 1090 (§3.11.6's consumption law), 1111 (T-V13-75), 1113 (H22; (c) H12), 1115 (H38), 1116 (J-V13.138), 1118, 1119 (§11) |
| J397 (M3) | felt sentences and first-visible lines: every lens, H22, H23 and every H row minted from now on; a lens whose line fails its read does not light | items 1089 (a), (c) (`LensRule.lenses[].felt`), 1097 (§5.8 (1)), 1103 (a), 1104 (b), 1105, 1106, 1107 (a), 1108 (a), 1109 (a), 1110 (a) (the eight felt lines), 1111 (T-V13-76), 1112 (§8.5 preamble), 1113 (b), 1114 (c), 1115 (every row), 1116 (J-V13.139) |
| J397 (M6) | the religion lens's `none` wording; the alignment banner's order | items 1108 (a), 1110 (a), 1111 (T-V13-77), 1116 (J-V13.140) |
| J397 (M7) | "why" crosses the seam: `reasonOf` on the port; `whatCaused` into the host's receipts | items 1091, 1094 (§4.7), 1111 (T-V13-78), 1115 (H43), 1116 (J-V13.141) |
| J397 (M8) | the party's observer; believed rows with `asOfWeek` and a `confidence` band, drawn "as of week n" and faded by band | items 1087 (a)–(e), (g) (`LensFacts`, `Believed`), 1088 (`homeSeat`), 1089 (b), (c) (`LensRule.believed`), 1092, 1100 (§5.8 (7)), 1103 (d), 1108 (c), 1109 (b), 1111 (T-V13-79), 1114 (b), 1115 (H39), 1116 (J-V13.142, J-V13.143) |
| J397 (M9) | the believed sway: the court viewpoint over a court's believed political facts, DM-only unless opened; the party's map on the party observer's believed sway where sent; the integrity register DM-only; nothing believed in the canon | items 1087 (a) (`LensFacts.courts`), 1092, 1093 (a) (law (3)), 1096 (§5.1), 1104 (b) (§5.9 (2)), 1111 (T-V13-80), 1115 (H40), 1116 (J-V13.144) |
| J397 (M10) | the default-preset arm: public rows at a rider's pace by the host's own distance pricing; the DM's picture unaffected; the legend line | items 1089 (b), (c) (`LensRule.partyNewsDelay`), 1096 (§5.1), 1100 (§5.8 (7)), 1111 (T-V13-81), 1116 (J-V13.145) |
| J397 (M11) | the headline join: `causedBy` as the host's receipt ids, `headlineOf`, "open the headline", the "this advance" filter as the letter's map half, the integrity register on DM-side marks, the knowledge events as DM-only pins | items 1085 (`WorldEvent`), 1091 (§3.11.6), 1095 (§5.1's `events` row), 1100, 1111 (T-V13-82), 1115 (H41), 1116 (J-V13.146), 1117 (D-V13.12) |
| J397 (M12) | nobody is ever current at the map feed: law (10) of §3.11.6; the host names its readers | items 1093 (b), 1111 (T-V13-83), 1115 (H42), 1116 (J-V13.147) |
| J397 (M22) | the named allegiance: `PolityFacts.names`; the label reads it when sent, else the root's name | items 1086, 1104 (b) (the legend's label rule), 1111 (T-V13-84), 1115 (H36), 1116 (J-V13.148) |
| J397 (M23) | movers and dated facts: §5.8 (5) split; the approach ring a dated fact; columns at the leg's fraction with no destination; "likely road" DM-only | items 1093 (b) (the words), 1099 (§5.8 (5)), 1103 (c), 1107 (b), (c), 1111 (T-V13-85), 1115 (H44), 1116 (J-V13.149) |
| J397 (M24) | the refusal's gate "where the host's lane is dark"; a sent cargo drawn as the host's fact | items 1087 (f) (`columns[].cargo`), 1107 (b), (c), 1111 (T-V13-85), 1116 (J-V13.150) |
| J397 (M27) | two seas: the caption "the host's movers do not yet read the season" on a lens's sea link until H33 | items 1099, 1111 (T-V13-85), 1116 (J-V13.151) |
| J397 (M28) | seat glyph and share ring by default; the seat-area fill an option with its label | items 1089 (b), (c) (`LensRule.areaFill`), 1108 (b), 1109 (b), 1110 (b), 1111 (T-V13-86), 1116 (J-V13.152) |
| J397 (M29) | the arrived plague's caption "arrived; the town's record follows at resolution" until H24 | items 1103 (b), 1111 (T-V13-85), 1116 (J-V13.153) |
| J397 (M50) | the port law kept: believed views and the court viewpoint's facts ride the presentation inputs only | items 1093 (a), 1111 (T-V13-80), 1116 (J-V13.144), 1119 (§11) |

**Revised 2026-10-24** after the review docs/volumes/critique/experience-vwx.md (the manager's rulings on its findings EX-01, EX-04, EX-06, EX-07, EX-08, EX-16 and EX-17), in place, every item number kept: `reasonOf` typed as the prompts' flat rendered chain (items 1091, 1094, 1111 T-V13-78, 1115 H43, 1116 J-V13.141); `WorldEvent.populationAfter` declared (item 1085 (c)); H12 revised over the seats as they then stand (item 1113 (c)); `headlineOf(event)` (T-V13-82); the birth window as two windows — the lens window and the polity window at seq 0 (items 1087 (a), 1092 (b), (c), 1093 (b), 1098, 1104 (a), 1111 T-V13-74, 1114 (a), 1115 H37); "its knowledge events" for the host's section name (items 1115, 1116, 1117, 1119); the court viewpoint within `WORLD-23` (items 1104 (b), 1111 T-V13-80). Three current-text quotes were added (the `seats?` line of `WorldEvent`, the `polity` recorded-input line, H12's row), none changed, and none of the three is quoted by file w.

Items 1084–1119 are thirty-six items over one target, `docs/volumes/V13-world.md`, in its section order: §2.2 (1084–1088), §2.3
(1089), §3.11.6 (1090–1093), §4.7 (1094), §5.1 (1095, 1096), §5.8 (1097–1102), §5.9 (1103–1110), §7 (1111), §8.5
(1112–1115), §9 (1116, 1117), §11 (1118, 1119). What a ruling of this file needs in a section file w owns is not written
here: it is listed in the seat's final report under "for file w" (§3.1 (7)'s felt sentence for the include run; §3.9 (17)'s
label rule and its edges; §3.6 (5)'s birth fold; §1b's wiring rows; §2.4's transient row; V09's lens-control strings) for
the manager to pass on.

**How to read an item.** As files l, m, r and u's: each item names its target file's section (the heading above it),
its title in bold, the ruling it serves (*Requests*), the current text quoted **once** (every quote verified by exact
search against the target file as it stands on 2026-10-24 after file u, and verified again by applying every item of
this file in order to a copy of the target: each quote occurs exactly once at its turn and each new text exactly once
after — the residue check of file m; a quote that wraps across lines is written on one line with each line break marked
⏎, the continuation's indentation kept), and the new text **in full** as a blockquote whose lines are the new lines (the
`> ` prefix removed; a bare `>` an empty line; a new line that is itself a blockquote in the target is written `> > …`).
An item with several fragments gives each fragment's current and new text in turn, (a), (b) …, applied in that order;
where two items touch one line the later quotes the text as the earlier leaves it and says so. A reference written
"file v item n" inside a new text is to this file; "file u item n" to amendments u, "file r item n" to amendments r.
*Evidence* names the PROGRESS ruling, the volumes' sections the ruling rests on, the research notes' sections
(`research/experience/01–05`, cited "experience read 0n §x") and the sources they cite (host paths relative to the host
repository's root at commit `81f1cd96`, with line numbers; map paths to this repository's). Order: the owner-rule item,
then volume 13 in section order.

**The clean-room rule for the new texts.** The base and the volumes are implementer inputs: the new texts entering
them name no host source file, function, product, ruling id, preset name, flag name or internal identifier and no other
product's identifiers — the host is "the host"; its facts are named by the port's field names (`PolityFacts`,
`LensFacts`, `CampaignFacts`, `SettlementFacts`, `TravelLaw`) and the adapter tables' vocabulary; its surfaces in plain
words (the host's news paper, its session-prep letter, its hearing card, its cause walk, its belief record, its default
rules, its own edit law, its ambiguity law for movers); its account kinds and entitlements in plain words. The host's
document names, ruling ids, product names and code citations stay in each item's *Evidence* line. The owner's own
words, quoted verbatim in item 1083 and wherever a new text cites them, keep the words the owner wrote. Checked by a lint
over every new text bound for the volume (the preamble's token list: no hit).

---

## The owner's rule (2026-10-24; quoted verbatim; the rulings are the session's, each vetoable)

**1083. OWNER RULE — The experience pass (owner, 2026-10-24, via the session; `docs/PROGRESS.md` J397).** "So do the
prompts and integrate them that can be done on maps and give me the prompts for settlement engine" and "Try again"

  **The session's reading** (J397, READ AS): carry the rulings the session proposed in its substance-and-experience
  synthesis — `research/experience/01-birth-and-first-month.md`, `02-politics-and-war.md`,
  `03-trade-faith-plague-people.md`, `04-physical-world-and-the-dms-hand.md`, `05-players-audiences-atlas-style.md`,
  the five Opus reads of the paired product, their findings tabled in HANDOFF — into the architecture wherever the map
  side can carry them, and write the host's side as prompts for a settlement-engine session; "Try again" read as a
  re-send. The model ruling is J392's (Fable designs, reviews and closes; Opus applies; a Fable seat that hits the
  limit is re-run on Opus with the J375 notice). The rulings M1–M50 are the session's under the owner's delegation,
  each vetoable; the host-side asks S1–S15 are written as prompts in `research/sf/host-prompts-2026-10-24.md`.

  **The map-side rulings, by group, and the file that carries each:**

  **(1) Birth and the first month** — file v (this file): (M1) the birth window and the birth fold — a lens window at
  the campaign's creation, so every banner resolves at birth, the sway projects from genesis facts, the cover fold runs
  at birth from the populations `CampaignFacts` carries, and the first polity window redraws only what changed; (M2)
  the grace rule — the birth canon taken at the first advance over the seats as they then stand, every seat dragging
  free until then, `Placement.hostLocked` holding only from the first advance; (M3) felt sentences — every lens, H22,
  H31 and the include run name their DM-felt sentence and first-visible latency, every H row minted from now on
  carries one, and a lens whose first-visible line fails its experience read does not light (H31 and the include run's
  sentence are file w's, §3.1 (7)); (M6) the religion lens's `none` wording and the alignment banner's order; (M7)
  "why" crosses the seam — `reasonOf(world, fact | where)` on the port (typed in item 1091 as `reasonOf(world, subject | where, audience)`, the chain returned rendered for the audience), `whatCaused` descending into the host's
  receipts. File w: (M4) the instant world world-first; (M5) two clocks.

  **(2) Belief and information** — file v: (M8) the party's observer — the court of the settlement the party stands
  at, else the home seat, else none; believed rows with `asOfWeek` and a `confidence` band, drawn "as of week n" and
  faded by band; (M9) the believed sway — the court viewpoint over a court's believed political facts, DM-only unless
  opened, the party's map on the party observer's believed sway where sent, nothing believed in the canon (its V15
  part, `Viewpoint.audience` `court:<seat>` and the looted map, is file x's); (M10) the default-preset arm — public
  rows at a rider's pace by the host's own distance pricing where the party's seat is sent; (M11) the headline join;
  (M12) nobody is ever current at the map feed — a law line of §3.11.6, the host naming its readers.

  **(3) Politics** — file w: (M13) treaty terms read as classes; (M14) razed cells; (M15) `relieved` and `lifted`; (M16)
  `whyCell` and raids; (M17) `memberForce` net of blocks sent; (M18) the gate keeper; (M19) the fought-over wild; (M20)
  vengeance licences and grievances as claim outlines; (M21) the two "contested"s. File v: (M22) the named allegiance —
  `PolityFacts` gains an optional allegiance name the sway's label reads when sent.

  **(4) Lenses and substance** — file v: (M23) movers and dated facts — §5.8 (5) splits mover markers from the dated
  facts the host computed; (M24) the refusal's gate and a sent cargo; (M27) two seas — the caption until H33; (M28)
  seat-area fills as an option; (M29) the arrived plague's caption. File w: (M25) the cover's demand banded by tier;
  (M26) withdrawn fields date themselves; (M30) the conflict list at realm scale.

  **(5) The physical world and the DM's hand** — file w: (M31) Random all forms at the continent rung; (M32) the scoped
  water carry; (M33) "update the dossier" on a draft re-derives; (M34) the placement card's words; (M35) "Lower or raise
  this lake"; (M36) the two time controls; (M37) open rows; (M38) the buried past is requestable; (M39) one history;
  (M40) `W_TRAVEL_BAND_CROSSED` folded into the diff summary.

  **(6) Atlas, sites and audiences** — file x: (M41) the numbered room key; (M42) atlas relations; (M43) date cartouches
  withheld from a player viewpoint; (M44) a shared file or gallery copy embeds the public audience only; (M45) the
  honesty note's in-fiction export; (M46) "an old map"; (M47) the party's reach across a seam; (M48) the relational
  style open to every account kind; and (M49) the sacred preset without a holy city, a V15 matter the seat list does
  not assign, read as x's. File v: (M50) the port law kept — the sway's believed-view port fields and the court
  viewpoint's facts travel through the port's presentation inputs only (law (3) of §3.11.6).

  **The host-side asks S1–S15** — born applied and born peopled (S1), the birth window (S2), the grace rule (S3), the
  instant world world-first (S4), the party observer (S5), the headline join (S6), the map feed's readers fenced (S7),
  net force bands (S8), the cause walk across the seam (S9), grievances and licences as dated pairwise facts (S10), the
  ambiguity law amended (S11), the draft's dossier update (S12), the raid's outcome word and the hearing week (S13),
  patrols and capture (S14), H33 and H34 restated (S15) — are written as prompts in
  `research/sf/host-prompts-2026-10-24.md`; this file mints their map-side rows H36–H44 (S1, S2, S3, S5, S6, S7, S9,
  S11); file w mints H45 (S10) and H46 (S8).

---

## The change items

### Volume 13 — §2.2 New records (`Placement.hostLocked`: the grace rule)

**1084.** **`Placement.hostLocked` holds only from the campaign's first advance; until it every seat drags free.**
*Requests:* J397 (M2); V13 §8.5's H22 and H38 (items 1113, 1115); §3.11.6's consumption law (item 1090).
*Current text:*
> hostLocked?: boolean /* the host's move-lock: an origin edit is refused (`refuse.place.hostLocked`) while it is set; the map additionally refuses a DM's unplacement of a host seat in the world editor (a map rule, not the host's: the host's own removal arrives as `unbindSeat`); bearing and mirror admitted */;
*New text:*
> hostLocked?: boolean /* the host's move-lock: an origin edit is refused (`refuse.place.hostLocked`) while it is set — and on a campaign born on this world it is set only from the campaign's FIRST ADVANCE (the grace rule, J397 (M2); V13 §3.11.6's birth canon; V13 §8.5's H22 and H38): until that advance every seat drags free, the host's own promise at t=0 kept, each drag re-placing the seat (P1–P3, its blend re-run) and re-laying its roads (W7 over the edges the host names) with nothing canonized to shift; the birth canon is taken at the first advance over the seats as they then stand, and from it a move is the host's premium re-canonize (H22); the map additionally refuses a DM's unplacement of a host seat in the world editor (a map rule, not the host's: the host's own removal arrives as `unbindSeat`); bearing and mirror admitted */;
*Evidence:* docs/PROGRESS.md J397 (M2) and (S3); V13 §2.2's `Placement` as it stood; V13 §3.11.6 (the port consumption law: the birth canon as the campaign is created), §3.11.5 (1) (`moveTown` never under `hostLocked`), §8.5's H22 (the birth canon; a re-canonize that shifts other geometry stays premium); experience read 01 §2.3 (1) ("draggable at t=0" against "canonized at birth"), §3's worst 3, §4 Q5; the host's `src/domain/instantWorld/worldPlan.js:146-147` ("every site is freely draggable at t=0, so exact coordinates are COSMETIC IN PLAY") and `src/lib/instantWorld/composeInstantWorld.js`'s header ("places everything, canonizes nothing"), as the read cites them.


### Volume 13 — §2.2 New records (`WorldEvent`: the headline join, the integrity register, the knowledge events, the population after a depopulation)

**1085.** **`WorldEvent.causedBy` is named as the host's receipt ids and the headline join; `integrity?` added; a knowledge event's kind marked; `populationAfter?` declared for a depopulation event.**
*Requests:* J397 (M11); §3.11.6's headline join (item 1091); §5.1's `events` row (item 1095); H41 (item 1115); for (c), the field V13 §3.6 (5) (a), H24 and H34 read and no record declared (the review's EX-04; J397 (M26) is file w's).
*Current text* (a):
> kind: string /* the host's word: battle, plague, fire, siege, raid, … */;
*New text* (a):
> kind: string /* the host's word: battle, plague, fire, siege, raid, …; a knowledge event of the host — a plant, an intercept, a burned agent — arrives in the host's word and the adapter folder's event table marks it `knowledge`: folded DM-only whatever audience the host resolved, a dated pin of the events layer and nothing more (J397 (M11); V13 §5.1) */;
*Current text* (b):
> causedBy?: string[] /* the host's receipt ids */; detail?: string; reason: Id }
*New text* (b):
> causedBy?: string[] /* the host's receipt ids — the headline join (J397 (M11)): the ids the events layer's pin action "open the headline" hands to the host's registered reader `headlineOf` (V13 §3.11.6, §5.1), and the receipts `whatCaused` descends one level into, each named as the host's (V13 §4.7) */; integrity?: 'clean'|'worn'|'planted' /* the host's integrity register word for the event's telling — clean, worn in the telling, planted — by the adapter folder's belief table, only where the host sends it (H40); DM-only: dropped from every party set and player picture at fold (V13 §5.8 (7)) */; detail?: string; reason: Id }
*Current text* (c):
> seats?: string[] /* the seats a realm-wide event names (a realm arc) */;
*New text* (c):
> seats?: string[] /* the seats a realm-wide event names (a realm arc) */; populationAfter?: number /* on a depopulation event — `kind` `razing`, `plagueDeaths` or `abandonment` by the adapter folder's event table — the seat's population after it (H34; H24): what the cover fold's withdrawal reads at the event's week (V13 §3.6 (5) (a)); absent on every other kind */;
*Evidence:* docs/PROGRESS.md J397 (M11) and (S6), (M26) and (S15) for (c); V13 §3.6 (5) (a) (a seat's use withdrawn by a dated host event sent with the seat's population after it, H34), §8.5's H24 and H34; the review docs/volumes/critique/experience-vwx.md EX-04 (a field named in an H row and a prompt that no record declares); V13 §2.2's `WorldEvent` as it stood (SW-07; `causedBy` "the host's receipt ids"), §2.2's knowledge paragraph (the resolved audience), §5.1's `events` row, §5.8 (7); experience read 05 §1.4 ("A `WorldEvent` keeps the host's receipts in `causedBy`, so the join is available, but no experience is designed on it"), §2.1 (5) (the integrity registers do not reach the map), §2.4 (the `knowledge` desk invisible on the map), §4 Q4; the host's `docs/DESIGN_FP_SPINE.md:491-520` (the causality popup "summoned from ANY surface carrying a headline id-link"; the registers CLEAN · WORN IN THE TELLING · PLANTED) and `src/domain/realm/heraldRouting.js:11-18` (the seventh desk), as the read cites them.


### Volume 13 — §2.2 New records (`PolityFacts`: the host's allegiance names)

**1086.** **`PolityFacts` gains `names`, the host's own name for an allegiance, read by the sway's label after the DM's christening.**
*Requests:* J397 (M22); H36 (item 1115); the legend's label rule in §5.9 (2) (item 1104).
*Current text:*
>   roadWatch: { edge: string; power: string; kind: 'closed'|'warden'; since: Week }[]; christened: { root: string; name: string }[] }
*New text:*
>   roadWatch: { edge: string; power: string; kind: 'closed'|'warden'; since: Week }[]; christened: { root: string; name: string }[];
>   names?: { root: string; name: string }[] /* the host's own name for the allegiance rooted at `root` — named at the campaign's genesis where the host so rules (born peopled, V13 §8.5's H36; J397 (M22)) and re-sent with every window: the sway's label reads the DM's christening first (`christened`), else this name when sent, else the descriptive label from the root's name (V13 §3.9 (17); the legend rule of V13 §5.9 (2)); a name's change re-labels and mints no revision; never a map-side name on a host-bound world */ }
*Evidence:* docs/PROGRESS.md J397 (M22) and (S1) ("overlord chains as named allegiances, the name on the polity facts"); V13 §2.2's `PolityFacts.christened` and `Allegiance.name` ("the DM's christening only, on a host-bound world"), §3.9 (17) (the descriptive label from the root's name), §8.5's H13; experience read 02 Week 0 ("Thornwall and its vassals" reads like a real atlas) and the manager's "named polities from day one" (J397 (S1)).


### Volume 13 — §2.2 New records (`LensFacts`: the birth window, the party's seat and observer, the believed rows' age and confidence, a court's believed political facts, a column's cargo; the type `Believed`)

**1087.** **`LensFacts` carries the birth window, the party seat and observer, aged and banded believed rows, a court's believed political facts and a column's sent cargo; the shared type `Believed` is declared beside `Aud`.**
*Requests:* J397 (M1), (M8), (M9), (M24); §3.11.6's `lensWindow` (item 1092); §5.8 (7) (item 1100); §5.9 (2) (item 1104); H37, H39, H40 (item 1115).
*Current text* (a):
>   window: AdvanceWindow; audience: 'dm'|'party' /* the DM's set, or the party's believed set where the host records belief */; regime?: HostRegime /* absent: `W_LENS_REGIME_ABSENT` */;
*New text* (a):
>   window: AdvanceWindow /* the BIRTH WINDOW's lens half: this set at seq 0, `{ fromWeek: 0; toWeek: 0 }`, at the campaign's creation, beside its polity half (`PolityFacts` at their genesis values through `polity`, V13 §3.11.6; H37; J397 (M1)) — the window every banner, plate and cover fold starts on */; audience: 'dm'|'party' /* the DM's set, or the party's believed set where the host records belief — the believed record of the party observer (V13 §5.8 (7)) */; regime?: HostRegime /* absent: `W_LENS_REGIME_ABSENT` */;
>   partySeat?: string /* the seat the party stands at in this window, sent each advance where the host tracks it (H39): read by the party observer rule and by the default-preset arm (V13 §5.8 (7)) */; observer?: string /* on the party's set: the court whose believed record the set is — the party seat's court, else the home seat's (`CampaignFacts.homeSeat`), as the host resolved it (H39; J397 (M8)); absent on a set the host resolved to none */;
>   courts?: { court: string /* the believing court, by its seat key */; subject: string; allegiance?: string /* the court's believed allegiance label for the subject, mapped by the adapter folder's link table to a root and a member word */; strengthBand?: 0|1|2|3|4; readiness?: string; faith?: string; believed: Believed; audience: Aud }[] /* a court's believed political facts, sent on request for a court viewpoint (H40; J397 (M9)): the sway lens projects them as that court's picture (V13 §5.9 (2)) — a presentation input like every row here, never a canon input (law (3) of V13 §3.11.6) */;
*Current text* (b):
> stage?: string /* a footprint row's stage word */; severity?: number /* a footprint row's band */; audience: Aud }[];
*New text* (b):
> stage?: string /* a footprint row's stage word */; severity?: number /* a footprint row's band */; believed?: Believed /* on a row of the party's set (the "heard of plague" mark) — required there, absent on the DM's (J397 (M8)) */; audience: Aud }[];
*Current text* (c):
> suppressed?: string[] /* the deity keys the host holds suppressed at the seat — the DM's set only: a party set's are dropped at fold (V13 §5.8 (7); J379) */; audience: Aud }[];
*New text* (c):
> suppressed?: string[] /* the deity keys the host holds suppressed at the seat — the DM's set only: a party set's are dropped at fold (V13 §5.8 (7); J379) */; believed?: Believed /* on a row of the party's set (the believed faith label): required there (J397 (M8)) */; audience: Aud }[];
*Current text* (d):
> trend?: { seat: string; sign: -1|0|1 /* by the host's law */; audience: Aud }[];
*New text* (d):
> trend?: { seat: string; sign: -1|0|1 /* by the host's law */; believed?: Believed /* on a row of the party's set: required there (J397 (M8)) */; audience: Aud }[];
*Current text* (e):
> the DM's set reads `PolitySeat.prosperity`, whose public audience is the host's printed word (V13 §2.2's knowledge paragraph) */ }[];
*New text* (e):
> the DM's set reads `PolitySeat.prosperity`, whose public audience is the host's printed word (V13 §2.2's knowledge paragraph) */; believed: Believed /* its age and confidence (J397 (M8)) */ }[];
*Current text* (f):
> carriage?: 'road'|'sea'|'teleport' /* only when the host stores the dispatched route (H27) */; audience: Aud }[];
*New text* (f):
> carriage?: 'road'|'sea'|'teleport' /* only when the host stores the dispatched route (H27) */; cargo?: { faith?: string /* a deity key the host says the column carries */; plague?: boolean /* the host's plague-touched stamp on the column */ } /* what the host says the column carries, only where the host's own lane applies it: drawn on the marker as the host's fact, labelled, and never guessed (J397 (M24); V13 §5.9 (5)) */; audience: Aud }[];
*Current text* (g):
> type Aud = 'public'|'dmOnly';   // a row's resolved audience; a row the host sends without one is folded dmOnly (V13 §5.8 (7))
*New text* (g):
> type Aud = 'public'|'dmOnly';   // a row's resolved audience; a row the host sends without one is folded dmOnly (V13 §5.8 (7))
> type Believed = { asOfWeek: Week /* the week the host last updated the belief */; confidence: 0|1|2|3 /* the host's confidence banded in quarters by the adapter folder's belief table */; integrity?: 'clean'|'worn'|'planted' /* the host's integrity register word for the belief's telling, where sent (H40) — DM-only: dropped from the party's set at fold (V13 §5.8 (7)) */ };   // a believed row's age and confidence (J397 (M8)): every believed mark draws "as of week n" and fades by its band (`LensRule.believed`; V13 §5.9); a believed row with neither is refused at fold (`refuse.lens.invented`, "a believed row with no age")
*Evidence:* docs/PROGRESS.md J397 (M1), (M8), (M9), (M24), (S2), (S5), (S6); V13 §2.2's `LensFacts` as it stood (one set per audience; the party's believed set "where the host records belief"), `LensPlate.sets`, §3.11.6's `lensWindow`, §5.8 (7) (the audience filter), §5.9's believed rows ("heard of plague", the believed faith, the believed band, the believed trend), §8.5's H23 ("a party set of believed rows where it records belief"); experience read 05 §1.2 (the host stores `confidence01` and `lastUpdateTick` on every belief record and no row of `LensFacts` carries them), §2.1 (1) (the party has no source: the host records belief per court), (2) (the border is never believed), (5), §2.4, §2.5 C2 and C4, §4 Q1–Q4; experience read 03 §2.4 (2) and §4 Q7 (a gated "plague-touched" or "faith cargo" element on the column); the host's `src/domain/worldPulse/beliefMap.js:10-12` (the belief record: readiness, strengthBand, allianceLabel, faithLabel, confidence01, lastUpdateTick, per observer court) and `:204-209` (belief active on the canon marker and a non-omniscient regime), as the reads cite them.


### Volume 13 — §2.2 New records (`CampaignFacts`: the party's home seat; the populations the birth fold reads)

**1088.** **`CampaignFacts` gains `homeSeat` and names its populations as the birth fold's input.**
*Requests:* J397 (M1), (M8); §5.8 (7) and (9) (items 1100, 1102); H39 (item 1115).
*Current text:*
> }[] }   // the port's recorded input for "based off of my settlements" (V13 §3.11.6): a windowed replace keyed by host keys
*New text:*
> }[]; homeSeat?: string /* the party's home seat, a campaign fact the DM names in the host: the party observer's fallback where no party seat is sent in the lens window (V13 §5.8 (7); H39; J397 (M8)) */ }   // the port's recorded input for "based off of my settlements" (V13 §3.11.6): a windowed replace keyed by host keys; its settlements' `population`s are what the cover fold reads at the campaign's creation — the birth fold (V13 §5.8 (9); J397 (M1)), the birth window's `sizes` winning where the host sends both
*Evidence:* docs/PROGRESS.md J397 (M1) ("the cover fold runs at birth from the populations `CampaignFacts` carries"), (M8) ("the party's home seat (a campaign fact the DM names)"); V13 §2.2's `CampaignFacts` and `SettlementFacts.population`, §3.6 (5) (a) (the use demand from each bound seat's population and tier; a seat with no population its tier's median), §3.11.6's `campaignFacts` (H31: sent per campaign, a windowed replace), §5.8 (9); experience read 01 Moment 6, §4 Q3 ("Should the cover fold run once at birth from the populations `campaignFacts` already carries?"); experience read 05 §4 Q1.


### Volume 13 — §2.3 New rule tables (`LensRule`: the felt row, the believed marks' fade, the party's news delay, the area-fill option)

**1089.** **`LensRule` gains a `felt` row per lens and the cells `believed`, `partyNewsDelay` and `areaFill`; the rule table carries their defaults and anchors.**
*Requests:* J397 (M3), (M8), (M10), (M28); §5.8 (1) and (7) (items 1097, 1100); §5.9's felt lines and fill options (items 1103–1110).
*Current text* (a):
> notes: { text: string; when: GateExpr }[] /* the legend's bias and authorship notes with their gates (V13 §5.8 (3), §5.9) */ }[] /* V13 §5.9's regime words per lens, first match; the last the still word */;
*New text* (a):
> notes: { text: string; when: GateExpr }[] /* the legend's bias and authorship notes with their gates (V13 §5.8 (3), §5.9) */; felt: { sentence: string /* the lens's DM-felt sentence in this volume's words (the felt line under each lens of V13 §5.9) */; firstVisible: 'week'|'month'|'season'|'year' /* the DM advance unit within which the lens's first mark shows under its live regime */ } /* J397 (M3): the host's first-visible and felt-proof laws carried to the map; a lens with no felt row is instrumentation and says so in its banner, and a lens whose first-visible line fails its experience read does not light (V13 §5.8 (1)) */ }[] /* V13 §5.9's regime words per lens, first match; the last the still word */;
*Current text* (b):
>   draw: { linksPerSeat: number; markersPerView: number } /* beyond a cap: the strongest by the host's own weight or the latest by week, ties by the lower seat key, then the lower id */ }
*New text* (b):
>   draw: { linksPerSeat: number; markersPerView: number } /* beyond a cap: the strongest by the host's own weight or the latest by week, ties by the lower seat key, then the lower id */;
>   believed: { alphaByBand: [number, number, number, number] /* the alpha a believed mark draws at, by its confidence band 0–3 (`Believed.confidence`) */; ageCaption: 'always' } /* every believed mark captioned "as of week n" and faded by its band (J397 (M8); V13 §5.8 (7), §5.9) */;
>   partyNewsDelay: { factor: number; rounding: 'floor' } /* the default-preset arm (V13 §5.8 (7); J397 (M10)): where the host records no belief and sends the party's seat, a public row of a seat at week w reaches the party's picture at w + floor(hopWeeks × factor), the hop weeks the canon's from the row's seat to the party's seat under the travel law in force; superseded by `TravelLaw.news` where the host sends it */;
>   areaFill: { default: boolean } /* the religion, prosperity and alignment lenses' seat-area fill: an option of the lens, off by default — the seat glyph with its share, band or axis ring draws instead (J397 (M28); V13 §5.9 (6)–(8)) */ }
*Current text* (c):
> | `draw.linksPerSeat` / `markersPerView` | 12 / 2 000 (beyond: the strongest by the host's own weight or the latest by week, ties by the lower seat key, then the lower id, the rest counted in the legend) | — |
*New text* (c):
> | `draw.linksPerSeat` / `markersPerView` | 12 / 2 000 (beyond: the strongest by the host's own weight or the latest by week, ties by the lower seat key, then the lower id, the rest counted in the legend) | — |
> | `lenses` felt | V13 §5.9's felt line per lens — its sentence and its first-visible unit: plague week (an authored outbreak's approach ring) · sway week (the planting line) · patrols week · trade week on the canon, season off it · populations week on the canon, month off it · religion season (its `none` banner at the birth window) · prosperity season (its frozen banner at the birth window) · alignment month | J397 (M3): the host's first-visible-latency and felt-proof laws carried to the map; a lens whose line fails its experience read does not light (V13 §5.8 (1)) |
> | `believed.alphaByBand` / `ageCaption` | [0.25, 0.5, 0.75, 1] / always | J397 (M8): a stale rumour must look stale and say its week; own, calibratable |
> | `partyNewsDelay.factor` / `rounding` | 0.5 / floor | J397 (M10): the host's own distance pricing — word travels twice as fast as goods — adopted as data, `TravelLaw.news` winning where sent |
> | `areaFill.default` | off: the seat glyph with its ring draws by default; the fill an option labelled "this settlement's patron over its seat area — never a region of faith" (and its band's and reading's counterparts) | J397 (M28): the seat territory is total, so an area fill reads as a region to the eye whatever its label says |
*Evidence:* docs/PROGRESS.md J397 (M3), (M8), (M10), (M28); V13 §2.3's `LensRule` and its rule table as they stood (J384 (8), (9), (13)), §2.2's `TravelLaw.news` ("{ factor: number; rounding: 'floor' }": the host's news pricing already in the travel law as data), §5.8 (3) (the honesty rule), §5.9 (6)–(8) (the uniform seat-area fills); experience read 01 §2.2 (2) and §4 Q8 (no lens declares a first-visible latency); experience read 05 §1.2, §2.1 (4), §4 Q3 and Q5 ("delay public rows by the host's own distance pricing … hopDelay = floor(hopWeeks×0.5)"); experience read 03 §2.4 (5) and §4 Q9 ("Seat glyphs with share rings and no area fill would honour 'never a region' in the picture"); the host's `docs/DESIGN_FP_COHERENCE_FOLD.md:104-112` (requirement 16, the first-visible-latency law) and `:132-137` (requirement 19, the felt-proof law); `src/domain/worldPulse/distancePricedNews.js:18-21, 34` (the news speed factor 0.5, floor), as the reads cite them.


### Volume 13 — §3.11.6 The port, the canon, the map feed and the settlement map record (the consumption law: the birth canon at the first advance)

**1090.** **The birth canon is adopted at the campaign's first advance over the seats as they then stand, not as the campaign is created.**
*Requests:* J397 (M2); item 1084; H22 and H38 (items 1113, 1115).
*Current text:*
> host's own receipted canonize — H22's birth canon as the campaign is created, or a re-canonize (V13 §8.5), the
*New text:*
> host's own receipted canonize — H22's birth canon, taken at the campaign's first advance over the seats as they then
> stand (the grace rule, J397 (M2); H38: until that advance every seat drags free and re-lays its roads, nothing is
> canonized and no canon-gated lane runs, since the first advance is the first time anything runs; from it
> `Placement.hostLocked` holds and a move is the premium re-canonize), or a re-canonize (V13 §8.5), the
*Evidence:* docs/PROGRESS.md J397 (M2) and (S3); V13 §3.11.6's port consumption law as it stood ("H22's birth canon as the campaign is created"), its additive canon (a seat bound after the birth canon), §8.5's H22 (the first canon adopted as the campaign is created; its genesis network laid at birth, H12), §2.2's `Placement.hostLocked` (item 1084); experience read 01 §2.3 (1), §4 Q5; the host's `src/domain/instantWorld/worldPlan.js:146-147`, as the read cites it.


### Volume 13 — §3.11.6 (the map feed: `reasonOf`; the headline join)

**1091.** **The map feed offers `reasonOf(world, subject | where, audience)` — the flat rendered chain, one shape on both sides of the seam — to the host's cause walk; the headline join names `headlineOf` and the "this advance" filter.**
*Requests:* J397 (M7), (M11); §4.7's `whatCaused` (item 1094); §5.1's `events` row (item 1095); H41 and H43 (item 1115).
*Current text:*
> words for a `WorldWhere`.
*New text:*
> words for a `WorldWhere`.
> - `reasonOf(world, subject: { kind: 'charter'|'edit'|'reading'|'route'; ref: string /* the member's host key; a consumed
>   edit's id; a host key and a field (`hostKey:field`); a route's host key */ } | WorldWhere, audience: 'dm'|'public')` →
>   `{ chain: { week: Week; sentence: string /* `whatCaused`'s tree flattened in walk order, each hop rendered from its
>   `MsgRef` under V10's visibility for `audience` — a withheld input "something you cannot see" */; audience:
>   'dm'|'public'; reason: Id }[] }` — the map's reason chain for a world word or a world-caused dossier fact (J397 (M7);
>   V13 §4.7's `whatCaused` flattened and rendered for the host, one shape on both sides of the seam): a `charter`
>   subject is the member's charter as a whole (the terrain, access and climate words the host minted from it), an `edit`
>   a consumed `physicalChange`, a `reading` a field the charter or the settlement map record carries (a water verdict, a
>   travel effort, a land-cover share, a hazard reading), a `route` a host edge's laid path, and a `WorldWhere` a place;
>   the chain descends one level into a host event (its receipts named as the host's, never rendered here) — the host's
>   cause walk appends the hops to its own walk for the world's half of a "why" (H43), as `whatCaused` descends into the
>   host's receipts (`WorldEvent.causedBy`, V13 §4.7); a reading of the map feed: never persisted in the host's world
>   state, never read by a step of its simulation.
> - **The headline join** (J397 (M11)): `WorldEvent.causedBy` holds the host's receipt ids; the events layer's pin
>   action "open the headline" (V13 §5.1) calls `headlineOf(event)` — a reader the host registers on the port, its news
>   paper's entry for the event's receipts, opened on the host's own surface, never rendered here — and where the host
>   registers none the action is not drawn. The events layer's "this advance" filter is the map's half of the host's
>   session-prep letter: the last window's dated events, each with its headline where the host holds one.
*Evidence:* docs/PROGRESS.md J397 (M7), (M11), (S6), (S9); V13 §3.11.6's map feed as it stood (`derivedFacts`, `mapFeed`, `routes`, `pathGeometry`, `borderSegment`, `placeOf`; J-V13.71: "geometry and presentation for the host's map surfaces, never written into the host's world state and never read by a step of its simulation"), §4.7 (the four readers; `MsgRef`; V10's visibility rule), §2.2's `WorldEvent.causedBy`, §5.1's `events` row; experience read 01 §2.3 (6) (two "why" systems that never meet), §2.2 (4) (the world's names never reach the host's paper), §4 Q12; experience read 05 §1.4, §2.4 ("a spatial Chronicler's Letter waiting to be named"; the causality popup convention), §4 Q4; the host's `docs/DESIGN_FP_SPINE.md:491-497` (the popup summoned from any surface carrying a headline id-link), `docs/DESIGN_FP_COHERENCE_FOLD.md:138-141` (requirement 20: every child receipt populates `causedBy` at its mint) and `src/domain/display/chroniclersLetter.js:1-20` (the letter grouped by desk), as the reads cite them; the review docs/volumes/critique/experience-vwx.md EX-01 (one function, two shapes: the manager ruled the prompts' flat rendered chain, typed here).


### Volume 13 — §3.11.6 (the presentation inputs: `beliefView`'s observer; `lensWindow` at creation, the party's seat and observer, the believed rows' age, a court's believed political facts; the recorded input `polity` at creation)

**1092.** **`beliefView` names its observer; `lensWindow` is sent at the campaign's creation as the birth window's lens half and carries the party's seat, the party observer's record with aged believed rows and, on request, a court's believed political facts; `polity` is sent at creation as the birth window's polity half.**
*Requests:* J397 (M1), (M8), (M9); items 1087, 1088; H37, H39, H40 (item 1115); H23 revised (item 1114).
*Current text* (a):
> the observer never heard; forecasts never enter the world);
*New text* (a):
> the observer never heard — the observer named in its legend: the party observer of V13 §5.8 (7) unless the view names a
> court (J397 (M8)); forecasts never enter the world);
*Current text* (b):
> `lensWindow(world, window, sets: LensFacts[])` (after every advance, undo and resume, beside the recorded windows: the⏎host's per-advance facts the lenses draw, with its resolved regime and each row's resolved audience — the DM's set,⏎and the party's believed set where the host records belief; the one presentation input the world keeps, folded into⏎one plate per advance in its plate cache (`Document.lensPlates`) outside every digest, V13 §5.8 (8); read by the lenses⏎only).
*New text* (b):
> `lensWindow(world, window, sets: LensFacts[])` (at the campaign's creation — the lens half of the **birth window**, seq
> 0, `{ fromWeek: 0; toWeek: 0 }`, its regime resolved and its populations, beside the polity half (`polity` above: every
> seat's rungs at their genesis values) and an empty events window, so every banner resolves at birth, the sway projects
> from genesis facts and the birth fold runs (H37; J397 (M1); V13 §5.8 (2), (8), (9)) — and after every advance, undo and
> resume, beside the recorded windows: the host's per-advance facts the lenses
> draw, with its resolved regime and each row's resolved audience — the DM's set, and the party's believed set where the
> host records belief, that set the believed record of the **party observer**: the court of the settlement the party
> stands at (`LensFacts.partySeat`, sent each advance), else the party's home seat (`CampaignFacts.homeSeat`), else none,
> the host naming the court it resolved (`LensFacts.observer`; H39; J397 (M8)) —, every believed row carrying its age
> and confidence band (`Believed`) and, DM-only, the host's integrity register word; and, on request for a court
> viewpoint, a court's believed political facts (`LensFacts.courts`; H40; J397 (M9)) — the party's seat, the observer's
> record and a court's record are presentation inputs like the rest, and nothing believed enters the canon (law (3)
> below); the one presentation input the world keeps, folded into one plate per advance in its plate cache
> (`Document.lensPlates`) outside every digest, V13 §5.8 (8); read by the lenses only).
*Current text* (c):
> - `polity(world, window, facts: PolityFacts)` (folded into dated events and at most one sway revision per week, V13 §3.9
*New text* (c):
> - `polity(world, window, facts: PolityFacts)` (at the campaign's creation — seq 0, `{ fromWeek: 0; toWeek: 0 }`, the birth
>   window's polity half with every seat's rungs at their genesis values, H37; J397 (M1) — and per advance; folded into
>   dated events and at most one sway revision per week, V13 §3.9
*Evidence:* docs/PROGRESS.md J397 (M1), (M8), (M9), (S2), (S5); the review docs/volumes/critique/experience-vwx.md EX-08 (the birth window is two windows: the sway reads `PolityFacts` through `polity`, never through `lensWindow`); V13 §3.11.6's recorded input `polity` and its presentation inputs as they stood (`beliefView`: "the believed standing and danger of places and roads in banded words"; `lensWindow` after every advance, undo and resume), §2.2's `LensFacts` (item 1087), §5.8 (7), (8), §8.5's H23; experience read 01 Moment 6 and §4 Q3 (a birth-time window so the banners are not "not sent"); experience read 05 §1.2 (no age or confidence on any believed mark), §1.4 (`beliefView` "never says whose belief it is"), §2.1 (1), §2.4 ("Whose belief"), §4 Q1–Q3; the host's `src/domain/worldPulse/beliefMap.js:10-12, 204-209`, as the read cites it.


### Volume 13 — §3.11.6 (the port's laws: (3) restated for the court viewpoint; the seam words of (9); the new law (10) — nobody is ever current at the map feed)

**1093.** **Law (3) covers the party's and a court's believed facts and the court viewpoint's projection; law (9) defines the pass's seam words; law (10) fences the map feed from every negotiation-side reader.**
*Requests:* J397 (M9), (M12), (M23), (M50); items 1092, 1096, 1099, 1104; H42 (item 1115).
*Current text* (a):
> simulates only on its own frozen record; (3) truth only — no believed fact enters or leaves the canon, believed views⏎riding the presentation inputs; (4) the map feed is never persisted in the host's world state; (5) the dossier's
*New text* (a):
> simulates only on its own frozen record; (3) truth only — no believed fact enters or leaves the canon, believed views
> riding the presentation inputs — the party's believed set, the party's seat, a court's believed political facts and
> the court viewpoint's projection over them included (J397 (M9), (M50)): the court viewpoint is a derived transient of
> the sway lens (V13 §5.9 (2)), never a `SwayRevision`, never in the map feed, never in `patrolOffer` and never a
> crossing holder; (4) the map feed is never persisted in the host's world state; (5) the dossier's
*Current text* (b):
> coupling (the spine's §12). **Scale:**
*New text* (b):
> coupling (the spine's §12); the **birth window** is the lens window and the polity window (an empty events window
> beside them) the host sends at seq 0, `{ fromWeek: 0; toWeek: 0 }`, at a campaign's creation, and the **grace** the span
> from that creation to the campaign's first advance, in which its seats drag free (V13 §8.5's H37, H38); the **party
> observer** is the court whose believed record the party's set is, a **court viewpoint** the sway
> lens's projection over a court's believed political facts (V15's viewpoint with a court audience reads it, never the
> reverse), a **believed row** a row of the party's or a court's set and never a truth, a **mover marker** a presence the
> host clocks and a **dated fact** a week the host computed — an arrival, an onset, a hop — never each other (V13 §5.8
> (5)); a **headline** is the host's news paper's entry a `WorldEvent.causedBy` receipt opens, never a map string;
> (10) **nobody is ever current at the map feed** (J397 (M12); the host's own law for its negotiations, kept at this
> door): the crossing holders `mapFeed` offers, the sway's borders and hatches, the glyphs, the patrol tints and every
> other truth the map feed carries are for the host's outcome and cost readers only — an advance-head overlay sampled
> at a hop, a price, a capture roll — and never for a negotiation-side reader (a term, a vote, an interceptor's
> judgement, a feasibility read), which reads only what its court believes; the host names its readers and fences the
> rest with a test of its own (H42), and the map feed carries no believed variant of any product to offer such a reader
> instead (T-V13-83). **Scale:**
*Evidence:* docs/PROGRESS.md J397 (M9), (M12), (M23), (M50), (S7); V13 §3.11.6's laws (3) and (9) as they stood (J-V13.78: one word, one meaning across the seam), its map feed (the crossing holders as an advance-head overlay the host "may read … sampled from that baked table at each hop", H16), §5.8 (5), §5.9 (2); the spine's §12 (the vocabulary; "viewpoint — an audience + a culture for the relational style"); experience read 05 §2.1 (3) ("K3 has no map counterpart … if any negotiation-side reader consumes the overlay, truth enters by the map's door"), §4 Q6; experience read 03 §2.4 (1) and §4 Q3 (mover markers against dated facts); the host's `docs/DESIGN_WAR_RULINGS_ARCHITECTURE.md:48` (K3 — "NOBODY IS EVER CURRENT: no negotiation path (terms, vote, interceptor judgment, close-vote comparison, feasibility) may read true world state"), as the read cites it.


### Volume 13 — §4.7 The clerk's view: reason records and the four readers (`whatCaused` descends into the host's receipts)

**1094.** **`whatCaused` descends one level into a host event's `causedBy`, naming the receipts as the host's; `reasonOf` returns this reader's chain rendered for the asking audience, for the host's cause walk.**
*Requests:* J397 (M7), (M11); item 1091; H43 (item 1115).
*Current text:*
> | `whatCaused(fact)` | "what made this happen" | the chain: the fact's reason → each input's reason, depth-first to the recorded inputs (a recipe op, a placement, an edit event, a table cell), rendered as a tree with the event dates; a missing link is named ("the chain is incomplete at the sewer outfall: derived before this version") |
*New text:*
> | `whatCaused(fact)` | "what made this happen" | the chain: the fact's reason → each input's reason, depth-first to the recorded inputs (a recipe op, a placement, an edit event, a table cell), rendered as a tree with the event dates; a missing link is named ("the chain is incomplete at the sewer outfall: derived before this version"); where an input is a host event (a `WorldEvent` holding `causedBy`) the chain descends ONE level into the host's receipt ids, each rendered as the host's — its kind, its week, its seat, named as the host's and opened on the host's own surface by the headline join (V13 §3.11.6; J397 (M7), (M11)) — the map re-reading no host law and rendering no receipt's content; `reasonOf` (V13 §3.11.6) is this reader flattened in walk order — it returns the chain rendered for the asking audience, a sentence and a week per hop — for the host's cause walk (H43), so one "why" walks from the drought to the hunger across the seam, each half in its own voice |
*Evidence:* docs/PROGRESS.md J397 (M7), (M11), (S9); V13 §4.7 as it stood (the four readers; `MsgRef` per caller; V10's visibility rule), §2.2's `ReasonRecord` and `WorldEvent.causedBy`, §3.11.6's map feed (item 1091); experience read 01 §2.3 (6) ("Why is Kessar hungry?" is the host's question and "why is Kessar dry?" is the map's; neither follows the other across the seam), §4 Q12; the host's `docs/DESIGN_FP_SPINE.md` §1 requirement 7 (the cause walk "walks backward link by named link") and `docs/DESIGN_FP_COHERENCE_FOLD.md:138-141` (requirement 20), as the read cites them.


### Volume 13 — §5.1 The world map: layers and styles (the `events` row: the pin action, the session-prep half, the knowledge pins, the integrity word)

**1095.** **The `events` row carries the "this advance" filter as the map's half of the host's session-prep letter, the pin action "open the headline", the knowledge events as DM-only pins, the integrity word DM-only, and the party's delayed pin.**
*Requests:* J397 (M10), (M11); items 1085, 1091; H41 (item 1115).
*Current text:*
> | `events` (with a "this advance" filter) | pins | `WorldEvent`s by kind at their place up to the view's `lensWeek`, a glyph's lifecycle mark at once (razed, besieged, occupied), DM-only docket pins; a pending sway trigger as a planting line until it takes effect or lapses (V13 §3.9 (13)); every `Disturbance` at its week by its kind's glyph over its cells | the notice style |
*New text:*
> | `events` (with a "this advance" filter — the map's half of the host's session-prep letter, J397 (M11): the last window's dated events, each with its headline where the host holds one) | pins | `WorldEvent`s by kind at their place up to the view's `lensWeek`, a glyph's lifecycle mark at once (razed, besieged, occupied), DM-only docket pins; a pending sway trigger as a planting line until it takes effect or lapses (V13 §3.9 (13)); every `Disturbance` at its week by its kind's glyph over its cells; the host's knowledge events (a plant, an intercept, a burned agent: a `kind` the adapter folder's event table marks `knowledge`) as DM-only dated pins where sent, never a player's; a pin's card carries the action **open the headline** where the event holds `causedBy` receipts and the host registers `headlineOf` (V13 §3.11.6) — drawn by V09 as the lens-mark card is (BCR-V13-39), the card's own words V13's — and, DM-only, the host's integrity register word where sent (`WorldEvent.integrity`: clean, worn in the telling, planted); on a player's picture a public pin draws at its week, or, under the default-preset arm, when the news reaches the party (V13 §5.8 (7); J397 (M10)) | the notice style |
*Evidence:* docs/PROGRESS.md J397 (M10), (M11), (S6); V13 §5.1's `events` row as it stood, §5.8 (1) (the lens-mark card: V09 hosts and draws it, decides none of its rows, BCR-V13-39), §2.2's `WorldEvent` (item 1085), §3.11.6 (item 1091); experience read 05 §2.4 ("The events layer's 'this advance' filter is a spatial Chronicler's Letter waiting to be named"; "no pin carries the id"; "The `knowledge` desk is invisible on the map"), §4 Q4; the host's `src/domain/display/chroniclersLetter.js:1-20` and `src/domain/realm/heraldRouting.js:11-18, 74`, as the read cites them.


### Volume 13 — §5.1 (the player picture: the party observer's believed sway; the default-preset arm)

**1096.** **The player picture lags by the default-preset arm where the host sends the party's seat, and reads the party observer's court viewpoint where the host sends that court's believed political facts.**
*Requests:* J397 (M9), (M10); §5.8 (7) (item 1100); §5.9 (2) (item 1104).
*Current text:*
> omniscient regime (no belief recorded) the picture is the sway over the host's public facts; the DM always sees the⏎head revision.
*New text:*
> omniscient regime (no belief recorded) the picture is the sway over the host's public facts — and, where the host sends
> the party's seat, over the public facts the party has heard of: a public political fact or event enters the party's
> known set `partyNewsDelay` weeks after its week (the default-preset arm, V13 §5.8 (7); J397 (M10)), the map deriving
> the known subset `audienceKnowledge` would carry where the host sends none (the host's set wins where it does), so a
> border three weeks' ride away moves on the party's map when the news could have reached it, never before; where the
> host records belief and sends the party observer's court's believed political facts, the party's sway is that
> court's believed sway — the court viewpoint of V13 §5.9 (2) drawn for the party, captioned "as {court} believes it,
> as of week n" — and else the known truth as above (J397 (M9)); the DM always sees the
> head revision.
*Evidence:* docs/PROGRESS.md J397 (M9), (M10); V13 §5.1's player picture as it stood (J-V13.77: re-derived over the whitelisted facts or, with `audienceKnowledge`, over the facts the audience knows, cached per (revision, known set)), §3.11.6's `audienceKnowledge` ("the player sway is then re-derived over the known subset"), §5.8 (7), §5.9 (2); experience read 05 §1.2 (world A: "a map that is better informed than any court in the world"), §2.1 (2) (the border is never believed), (3) (the party "perfectly current"), §2.5 C2, §3 worst 2 ("Default-preset omniscience"), §4 Q2 and Q5; the host's `src/domain/worldPulse/distancePricedNews.js:18-21, 34`, as the read cites it.


### Volume 13 — §5.8 The lens mechanism ((1) One record: the felt row; a lens that fails its read does not light)

**1097.** **Every lens carries a felt row — its DM-felt sentence and first-visible latency — and a lens whose first-visible line fails its experience read does not light.**
*Requests:* J397 (M3); item 1089 (a), (c); §5.9's felt lines (items 1103–1110); T-V13-76 (item 1111).
*Current text:*
>    decides none of their rows, gates, answers or audiences.
*New text:*
>    decides none of their rows, gates, answers or audiences. **Its felt row** (J397 (M3); the host's first-visible-latency
>    and felt-proof laws carried to the map): every lens names, in `world.lens` (`LensRule.lenses[].felt`) and in a *Felt*
>    line under its heading in V13 §5.9, the DM-felt sentence its live regime fires and its first-visible latency in the
>    DM's advance unit (week, month, season, year — the unit within which its first mark shows under that regime; its
>    still banner shows at the birth window, V13 §5.8 (2)); a lens with no felt row is instrumentation and says so in its
>    banner; and, the honesty rule's companion, a lens whose first-visible line fails its experience read does not light —
>    it stays a recorded row set, as D-V13.8's are, listed in the picker as still with the reason "not yet proven felt",
>    never hidden (T-V13-76).
*Evidence:* docs/PROGRESS.md J397 (M3); V13 §5.8 (1) and (3) as they stood (J384 (13): still, never hidden), §8.5's preamble ("each row also carrying its first-visible line … and its felt sentence"), §9's D-V13.8 (the recorded, unbuilt lenses); experience read 01 §2.2 (2) ("no H row, H22 included, states one. No lens declares a first-visible latency either. The module has a strong honesty rule and no felt-proof rule"), §4 Q8; the host's `docs/DESIGN_FP_COHERENCE_FOLD.md:104-112` (requirement 16: "A wave whose FIRST-VISIBLE line fails its experience read does not" light) and `:132-137` (requirement 19), as the read cites them.


### Volume 13 — §5.8 ((2) The regime, before the picture: the birth window)

**1098.** **Every banner resolves at the birth window; the provisional sway narrows to a world bound to an existing campaign before its first polity window.**
*Requests:* J397 (M1); items 1087 (a), 1092; §5.9 (2) (item 1104); H37 (item 1115).
*Current text:*
>    the facts actually sent, labelled "regime unknown" — never a regime guessed from the facts.
*New text:*
>    the facts actually sent, labelled "regime unknown" — never a regime guessed from the facts. **At birth** (J397 (M1);
>    H37): the host sends the birth window at the campaign's creation — a lens window with its regime resolved and its
>    populations, a polity window with its facts at their genesis values (V13 §3.11.6) — so every banner resolves at birth, the sway projects from genesis facts at birth
>    and the lens picker never opens on a column of "not sent" for a campaign born on this world; the provisional regime
>    of V13 §5.9 (2) narrows to a world bound to an existing campaign before its first polity window, and until H37 lands
>    a new campaign opens as that one does; a birth window with no regime is `W_LENS_REGIME_ABSENT` like any other.
*Evidence:* docs/PROGRESS.md J397 (M1), (S2); V13 §5.8 (2) as it stood (`W_LENS_REGIME_ABSENT`: "every banner reads 'the host's regime not sent'"), §5.9 (2) (the provisional regime), §3.9's edges ("a host seat with no polity facts yet projects at its tier with the middle prosperity rung until the host's first window"), §8.5's H23; experience read 01 Moment 6 ("at birth, before any advance, the lens picker is a column of 'the host's regime not sent' banners"), Moment 8, §2.4, §3 worst 2, §4 Q3–Q4.


### Volume 13 — §5.8 ((5) Two grammars for movement: the split between a mover marker and a dated fact; the two seas)

**1099.** **(5) is rewritten: mover markers (a presence, never an intention) are split from the dated facts the host computed (which carry their weeks on any surface); a lens's sea link carries the routes layer's seasonal effort as a caption until H33.**
*Requests:* J397 (M23), (M27); §5.9 (1) and (5) (items 1103, 1107); H44 (item 1115); law (9)'s words (item 1093 (b)).
*Current text:*
> 5. **Two grammars for movement.** Transfers the host nets within one week draw as **dated links** between the two⏎   settlements along the host's own links, never along a road; movers the host clocks draw as **moving markers** placed⏎   by that clock along a placed path; never one grammar for the other. A sea link (a sea column, a shipment, a plague's⏎   crossing) draws along the host's own lane and is placed by the host's own leg time; it reads this volume's⏎   directional seasonal efforts (V13 §3.8 (12)) only once the host has adopted them (H33) — the map never shows a⏎   mover faster or slower than the host's clock says.
*New text:*
> 5. **Two grammars for movement, and the split between a mover marker and a dated fact** (J397 (M23); the host's
>    ambiguity law for movers, amended to say the same, H44). Transfers the host nets within one week draw as **dated
>    links** between the two settlements along the host's own links, never along a road; movers the host clocks draw as
>    **moving markers** placed by that clock along a placed path; never one grammar for the other. **A mover marker is a
>    presence, never an intention:** a column, a named traveller, a shipment or an army on the march draws at its leg's
>    fraction of the host's clock and nothing else — no destination drawn, no arrival time on the marker, no path
>    highlight, no heading, no purpose; its "likely road" (a `pathGeometry` path, class (4) (c)) is DM-only and labelled,
>    and a mover's card names what the host sends and never where it is going. **A dated fact the host computed may
>    carry its week on any surface:** an arrival week, an onset week, a hop's week, a departure — the plague's approach
>    ring ("word of plague has reached", the weeks to onset), a hop's "arrived week n", a supply arrival, a column's
>    arrival once the host's row dates it — each a host-dated row drawn at its seat with its week, public where the host
>    so resolves; a column in motion is a mover marker and its arrival a dated fact captioned at the destination only
>    once the host's row says it arrived, never a line from the marker to it. A sea link (a sea column, a shipment, a
>    plague's crossing) draws along the host's own lane and is placed by the host's own leg time; it reads this volume's
>    directional seasonal efforts (V13 §3.8 (12)) only once the host has adopted them (H33) — the map never shows a
>    mover faster or slower than the host's clock says —, and until H33 a lens's sea link carries the routes layer's
>    seasonal effort for the view's month as a caption beside the host's leg, "the host's movers do not yet read the
>    season" (J397 (M27): two seas, both labelled, until one clock serves both); after H33 the caption drops.
*Evidence:* docs/PROGRESS.md J397 (M23), (M27), (S11); V13 §5.8 (4) (c) and (5) as they stood, §3.8 (12) (the directional seasonal efforts), §5.9 (1) (the approach ring, the hop), (4) (the named traveller), (5) (the columns "toward its arrival along a likely road"), §8.5's H33; experience read 03 §2.4 (1) ("most of these are dated facts (an arrival, an onset week the host computed), not a mover's intention, and the law is about mover markers … One of the two documents must yield, in writing"), (4) (two seas), §3.2 (5), §4 Q3 and Q8; the host's `docs/DESIGN_FP_ARCH_WY.md:763-768` (§3b, the ambiguity law: "A marker is a presence, never an intention. No direction arrows, no destination lines, no path highlights, no heading flips, no destination/ETA/purpose in canvas tooltips"), as the read cites it.


### Volume 13 — §5.8 ((7) The audience filter: the party's observer, the believed rows' age, the integrity word, the default-preset arm)

**1100.** **(7) names the party's observer, draws every believed mark with its age and band, keeps the integrity word DM-only, and gives the omniscient regime its arm: the public truth at a rider's pace where the host sends the party's seat.**
*Requests:* J397 (M8), (M9), (M10), (M11); items 1087, 1088, 1089 (b), 1092, 1096; H39, H40 (item 1115); T-V13-79, T-V13-81 (item 1111).
*Current text:*
>    never greyed. **A player** sees only the rows the host resolved public and, where the regime records belief, the⏎   party's believed rows (`LensFacts` of audience `party`); under an omniscient regime the player picture is the public⏎   truth or nothing.
*New text:*
>    never greyed. **A player** sees only the rows the host resolved public and, where the regime records belief, the
>    party's believed rows (`LensFacts` of audience `party`) — **the party's observer** (J397 (M8); H39): the party's
>    believed set is the believed record of the court of the settlement the party stands at (the party seat the host
>    sends each advance, `LensFacts.partySeat`), else of the party's home seat (`CampaignFacts.homeSeat`, a campaign fact
>    the DM names), else none — the public truth or nothing —, the host resolving the court and naming it
>    (`LensFacts.observer`), so a rumour that court believes can draw on the party's map and the legend says whose belief
>    it is ("as Emberford's court believes it"); every believed row carries its age and confidence band (`Believed`): a
>    believed mark draws "as of week n" and fades by band (`LensRule.believed.alphaByBand`), never ageless; the host's
>    integrity register word on a believed row or an event (`Believed.integrity`, `WorldEvent.integrity`: clean, worn in
>    the telling, planted) is DM-only, dropped from every party set and player picture at fold (J397 (M11)). **Under an
>    omniscient regime** the player picture is the public truth or nothing — and, **where the host sends the party's
>    seat, the public truth at a rider's pace** (the default-preset arm, J397 (M10)): a public row of a seat at week w
>    reaches the party's picture at w + floor(hopWeeks × `partyNewsDelay.factor`), the hop weeks the canon's from the
>    row's seat to the party's seat under the travel law in force (a pair's row from the nearer seat; a realm-wide row
>    from the nearest seat it names; a row of the party's own seat at once; a row with no seat at its week) — the host's
>    own distance pricing adopted as data (`LensRule.partyNewsDelay`; `TravelLaw.news` where sent wins) — the DM's
>    picture unaffected, the sway's borders moving on the party's map by the same rule (V13 §5.1's player picture) and
>    the player legend reading "news reaches the party at a rider's pace"; with no party seat sent the picture is as
>    current as the public truth, and the legend says so.
*Evidence:* docs/PROGRESS.md J397 (M8), (M9), (M10), (M11), (S5); V13 §5.8 (7) as it stood (J-V13.77, J-V13.92: the filter fail-closed; "the party's believed rows"), §2.2's `LensFacts`, `TravelLaw.news`, `CampaignFacts.homeSeat` (items 1087, 1088), §2.3's `LensRule` (item 1089), §3.11.6's `lensWindow` (item 1092), §5.1's player picture (item 1096); experience read 02 §4 Q7 ("Does the party take its home seat's beliefs …?"); experience read 05 §1.2 (world A; the marks "carry no age and no confidence"), §2.1 (1), (4), (5), §2.4, §3 worst 2 and 5, §4 Q1, Q3, Q4, Q5; the host's `src/domain/worldPulse/beliefMap.js:10-12, 204-209` and `src/domain/worldPulse/distancePricedNews.js:18-21, 34`, as the read cites them.


### Volume 13 — §5.8 ((8) The time scrub and the plates: plate 0 at the birth window)

**1101.** **Plates start at the birth window where the host sends one, so the scrub reaches week 0 and the first advance's plate differs from it only where something changed.**
*Requests:* J397 (M1); items 1092, 1098; T-V13-74 (item 1111).
*Current text:*
>    start at the first advance the map observes, and the scrub declares every gap — before the first plate, beyond what
*New text:*
>    start at the birth window where the host sends one (J397 (M1); H37: plate 0 at the campaign's creation, so the scrub
>    reaches week 0 and the first advance's plate differs from it only where something changed — no week-one artifact),
>    else at the first advance the map observes, and the scrub declares every gap — before the first plate, beyond what
*Evidence:* docs/PROGRESS.md J397 (M1); V13 §5.8 (8) as it stood (J384 (9): "Plates start at the first advance the map observes"), §2.2's `LensPlate`, §3.11.6's `lensWindow` (item 1092); experience read 01 Moment 6 ("Plates 'start at the first advance the map observes' … None of these texts names a birth-time window or plate"), Moment 8 (the week-one artifact burst), §4 Q3.


### Volume 13 — §5.8 ((9) Land cover beside the lenses: the birth fold)

**1102.** **The first cover plate folds at the campaign's creation from the populations `CampaignFacts` carries.**
*Requests:* J397 (M1); item 1088; T-V13-74 (item 1111).
*Current text:*
>    function. Its **honesty rule** is (3)'s: a window with no seat populations draws the tier medians and says so in the
*New text:*
>    function. **The birth fold** (J397 (M1)): the first cover plate folds at the campaign's creation from the populations
>    `CampaignFacts` carries (`SettlementFacts.population`; the birth window's `sizes` where the host sends both, the
>    window's winning), so a campaign born on this world is born with its fields, and the first advance's plate differs
>    from it only where a dated fact moved the use — never a burst of fields at week one; a campaign with neither reads
>    the tier medians below. Its **honesty rule** is (3)'s: a window with no seat populations draws the tier medians and says so in the
*Evidence:* docs/PROGRESS.md J397 (M1); V13 §5.8 (9) as it stood, §3.6 (5) (the cover fold "at every lens window's fold … and at every `disturb`"; (a) human use from each bound seat's population and tier), §2.2's `CampaignFacts` (item 1088); experience read 01 Moment 6 ("The land-cover overlay has no plate to draw, so the towns stand in wild potential vegetation with no fields"), Moment 8 ("Fields appear"), §4 Q3.


### Volume 13 — §5.9 The lenses (1. Plague: the felt line; the arrived caption; the approach ring a dated fact; the believed mark's age)

**1103.** **The plague lens names its felt sentence; a hop's arrival is captioned "arrived; the town's record follows at resolution" until H24; the approach ring is a dated fact; "heard of plague" carries its age and fades.**
*Requests:* J397 (M3), (M8), (M23), (M29); items 1087, 1099, 1100.
*Current text* (a):
> and words never the monster-threat chip's.
*New text* (a):
> and words never the monster-threat chip's. *Felt:* "word of plague has reached Kessar: three weeks to onset" — first
> visible within one week of an authored outbreak (the approach ring and the hop's arrival); its still banner at the
> birth window (J397 (M3)).
*Current text* (b):
> never a carrier guessed; no road implied; captioned "arrived week n" | S | front, while the host names the source | DM; a player the arrival only | host-dated |
*New text* (b):
> never a carrier guessed; no road implied; captioned "arrived week n" — and, until H24 closes the condition gap (a plague arriving through the stressor alone changes nothing in the town until it resolves), "arrived; the town's record follows at resolution" (J397 (M29): one record at two speeds, said so; the caption drops when H24 lands) | S | front, while the host names the source | DM; a player the arrival only | host-dated |
*Current text* (c):
> | approach | `.onsetWeek` | a ring at the seat with the weeks to onset ("word of plague has reached") | S | front | public where the host so resolves | host-dated |
*New text* (c):
> | approach | `.onsetWeek` | a ring at the seat with the weeks to onset ("word of plague has reached") — a dated fact the host computed, never a mover's intention, so its weeks show on every surface (V13 §5.8 (5); J397 (M23)) | S | front | public where the host so resolves | host-dated |
*Current text* (d):
> | heard of plague | the party's believed rows | "heard of plague" at the seat | S | beliefs | party | plate |
*New text* (d):
> | heard of plague | the party's believed rows (`Believed`: `asOfWeek`, `confidence`) | "heard of plague" at the seat, captioned "as of week n" and faded by its band; its integrity word on the DM's view only (J397 (M8)) | S | beliefs | party | plate |
*Evidence:* docs/PROGRESS.md J397 (M3), (M8), (M23), (M29); V13 §5.9 (1) as it stood (J381; the hop, the approach ring, "heard of plague"), §5.8 (5), (7), §8.5's H24 (an arrived plague writing its condition where it lands); experience read 03 §1.1 ("The lens and the dossier disagree for weeks, and the lens is the one telling the truth about the record"), §2.4 (1), (7), §3.1 (1), §3.2 (2), §4 Q3; experience read 05 §3 worst 5 ("'Heard of plague', from nobody, as of no week"); the host's `docs/DESIGN_FP_ARCH_WY.md:763-768` and `research/sf/plague-system.md` §1 (an arrived plague "changes no score … until it resolves into a six-tick residual condition"), as the reads cite them.


### Volume 13 — §5.9 (2. Sway: the provisional regime narrowed; the legend's label rule; the court viewpoint; the felt line)

**1104.** **The provisional regime holds only for a world bound to an existing campaign before its first polity window; the legend's label reads the host's allegiance name; the sway lens offers a court viewpoint over a court's believed political facts, DM-only unless opened; the felt line.**
*Requests:* J397 (M1), (M3), (M9), (M22); items 1086, 1087, 1093, 1096, 1098; T-V13-80, T-V13-84 (item 1111).
*Current text* (a):
> not yet sent), **provisional** (a host-bound world before its first polity window: each seat projects at its tier with⏎the middle rung, V13 §3.9's edges, labelled "before the host's first polity window"), **recipe** (a standalone world:
*New text* (a):
> not yet sent), **provisional** (a host-bound world bound to an existing campaign before its first polity window — a
> campaign born on this world receives its polity facts at their genesis values with the birth window's polity half, H37, and opens
> provisional only until H37 lands, J397 (M1): each seat projects at its tier with
> the middle rung, V13 §3.9's edges, labelled "before the host's first polity window"), **recipe** (a standalone world:
*Current text* (b):
> "water carries the sway along the host's lanes" or "water bars the sway: the host's lanes are dark".
*New text* (b):
> "water carries the sway along the host's lanes" or "water bars the sway: the host's lanes are dark". **The label**
> (J397 (M22)): an allegiance's legend label reads the DM's christening first, else the host's own name for the allegiance
> when sent (`PolityFacts.names`, born peopled, H36), else the descriptive label from its root's name (V13 §3.9 (17)).
> **The court viewpoint** (J397 (M9); H40): where the host sends a court's believed political facts (`LensFacts.courts`:
> believed allegiance labels and strength bands, each with its age and confidence), the sway lens offers, per court the
> host sent, a viewpoint — W8b's rule function run over that court's believed facts in place of the window's: the
> believed allegiance label as each subject's member link, the believed strength band as the push, every other input
> (tier, size third, prosperity rung, the relations' classes, the water lanes) the host's public facts at that plate and
> never a DM-only or covert fact, a subject the court holds no belief of left unclaimed and labelled "unknown to
> {court}" — computed on demand as a derived transient (never a `SwayRevision`, never persisted, never in the map feed or
> `patrolOffer`: law (3) of V13 §3.11.6), cached per (plate, court) and evicted with the plate, its projection within `WORLD-23` (V13 §6), scrubbed by plates, captioned "as {court} believes
> it, as of week n" (n the newest `asOfWeek` among the rows read, the oldest named beside it) and drawn with the
> believed rows' fade; **DM-only unless the DM opens it** to the party (the lens picker's open switch for that court, a
> view key V09 draws under BCR-V13-39, never an edit), and opened it shows the party exactly the court's rows filtered to
> the party's audience, never a truth the court does not hold; the party's map uses the party observer's court's
> viewpoint where the host sends that court's facts, else the known truth (V13 §5.1's player picture); `whyCell` under a
> viewpoint answers with the believed rows it read and their ages, never the truth. *Felt:* "the border moved at
> Thornhold's ford: the host's strength order changed" — first visible within one week as the planting line of V13 §3.9
> (13), the border itself at its dwell; under a viewpoint, "as Thornhold's court believes it, the ford is still theirs"
> (J397 (M3)).
*Evidence:* docs/PROGRESS.md J397 (M1), (M3), (M9), (M22), (M50), (S1), (S5); the review docs/volumes/critique/experience-vwx.md EX-08, EX-17 (`WORLD-23`, the budget row file w adds to §6); V13 §5.9 (2) as it stood (the regimes; the two banner notes; `whyCell` through `lensWhy`), §3.9 (8) (the push: the host's strength order), (13) (the planting line), (17) (the label), §3.9's edges, §2.2's `PolityFacts.names` and `LensFacts.courts` (items 1086, 1087), §2.4 (derived transients, never persisted), §3.11.6's law (3) (item 1093), §5.1's player picture (item 1096), §5.8 (1) (V09 hosts the lens controls, BCR-V13-39); experience read 01 Moment 8 ("Borders re-draw from the middle rung to the real rungs"), §4 Q4; experience read 02 Week 0 ("Thornwall and its vassals"), §2.2 (5) ("nor what a court believes its border to be"); experience read 05 §1.3 (the looted map "knows nothing the enemy knows"), §2.1 (2), §2.5 C2 and C4, §4 Q2; the host's `src/domain/worldPulse/beliefMap.js:10-12` (the believed strengthBand and allianceLabel per subject), as the reads cite them.


### Volume 13 — §5.9 (3. Patrols: the felt line)

**1105.** **The patrols lens names its felt sentence.**
*Requests:* J397 (M3); item 1097.
*Current text:*
> the garrison input a proxy until force bands are sent), **still** (no route laid, or no seed).
*New text:*
> the garrison input a proxy until force bands are sent), **still** (no route laid, or no seed). *Felt:* "a weekly patrol
> rides the Greyspine road" — first visible within one week (the cadence tints at the first revision; the host's own
> watches as sent) (J397 (M3)).
*Evidence:* docs/PROGRESS.md J397 (M3); V13 §5.9 (3) as it stood (J378); experience read 01 §2.2 (2), §4 Q8; experience read 02 §2.2 (4) (the patrol cadence is the map's presentation).


### Volume 13 — §5.9 (4. Trade: the felt line)

**1106.** **The trade lens names its felt sentence.**
*Requests:* J397 (M3); item 1097.
*Current text:*
> reads one good under several labels, each kept on the good's card, and a service export it ships as a good is a good⏎here.
*New text:*
> reads one good under several labels, each kept on the good's card, and a service export it ships as a good is a good
> here. *Felt:* "Kessar's grain arrived from Emberford this week" — first visible within one week on the canon (a supply
> arrival), within a season off it (a channel's change); the production glyphs at the birth window (J397 (M3)).
*Evidence:* docs/PROGRESS.md J397 (M3); V13 §5.9 (4) as it stood (J380); experience read 03 §1.2 and §3.2 (3) ("the caravan season that is not one": the deadest lens on the default map, by honest design), §4 Q1.


### Volume 13 — §5.9 (5. Populations: the felt line; columns as mover markers; the refusal's gate; a sent cargo)

**1107.** **The populations lens names its felt sentence; a column draws at its leg's fraction with no destination and its arrival as the host's dated fact; the refusal "migrants drawn carrying a faith or a plague" is gated "where the host's lane is dark" and a sent cargo draws as the host's fact.**
*Requests:* J397 (M3), (M23), (M24); items 1087 (f), 1099; H44 (item 1115); T-V13-85 (item 1111).
*Current text* (a):
> where the lane is dark or no intensity is sent.
*New text* (a):
> where the lane is dark or no intensity is sent. *Felt:* "two hundred left Kessar for the coast" — first visible within
> one week on the canon (a column's departure), within a month off it (a netted transfer) (J397 (M3)).
*Current text* (b):
> | columns | `.columns` | a moving marker from its departure week toward its arrival along a likely road (labelled), styled by carriage where the host sends it — road; sea along the water lane's laid path; teleport a dashed arc with no path (the host's column between its two ends, never a teleport link of the map's: §1.4's circle marks stay linkless) — and where it does not, by the host's endpoint test (an end at a port or a circle holder), labelled "likely carriage"; port and teleport columns included, which the host's own overlay hides (J384 (12)) | S, placed | columns | DM-only by default | host-dated |
*New text* (b):
> | columns | `.columns` | a moving marker at its leg's fraction of the host's clock (from `departWeek` to `arriveWeek`) along a likely road (DM-only, labelled), with no destination drawn and no arrival time on the marker — a mover marker under V13 §5.8 (5)'s split (J397 (M23); H44) —, its arrival a dated glyph at the destination captioned "arrived week n" only once the host's row dates it; styled by carriage where the host sends it — road; sea along the water lane's laid path; teleport a dashed arc with no path (the host's column between its two ends, never a teleport link of the map's: §1.4's circle marks stay linkless) — and where it does not, by the host's endpoint test (an end at a port or a circle holder), labelled "likely carriage"; its cargo as the host sends it (`.cargo`: a faith carried, a plague-touched stamp) drawn on the marker as the host's fact, labelled, and never guessed (J397 (M24)); port and teleport columns included, which the host's own overlay hides (J384 (12)) | S, placed | columns | DM-only by default | host-dated |
*Current text* (c):
> *Refusals:* losses on the road or a column's toll estimated; the share of a dispersal the host loses; migrants drawn⏎carrying a faith or a plague; a column's carriage presented as the host's when it did not send one; a density field.
*New text* (c):
> *Refusals:* losses on the road or a column's toll estimated; the share of a dispersal the host loses; migrants drawn
> carrying a faith or a plague where the host's lane is dark (its migration carrying a faith, its column stamped
> plague-touched at dispatch: the refusal holds exactly while the host applies neither, and a cargo the host sends draws
> as its fact, J397 (M24)); a column's carriage presented as the host's when it did not send one; a density field; a
> destination, an arrival time, a path highlight or a heading drawn on a mover (J397 (M23)).
*Evidence:* docs/PROGRESS.md J397 (M3), (M23), (M24), (S11); V13 §5.9 (5) as it stood (J380; the columns "toward its arrival along a likely road"; the refusal "migrants drawn carrying a faith or a plague"), §5.8 (5) (item 1099), §2.2's `LensFacts.columns` (item 1087 (f)); experience read 03 §1.4, §2.4 (1) ("the column's 'toward its arrival' draws a destination"), (2) ("The day either lands, the populations lens's refusals contradict the host. No gate is written on that refusal row"), §3.1 (4), §4 Q3 and Q7; the host's `docs/DESIGN_FP_ARCH_WY.md:763-768` (§3b) and its §1c (migration carrying faith "an influence, not a conserved quantity"), `docs/DESIGN_FP_ARCH_PG.md` pg-1 (a column "stamped plague-touched at DISPATCH"), as the read cites them.


### Volume 13 — §5.9 (6. Religion: the `none` wording; the felt line; the seat-area fill as an option; the believed faith's age)

**1108.** **The religion lens's `none` banner reads "no creed seated: the dossiers' temples pray to no named god"; its felt line; the patron's area fill becomes an option, the seat glyph with its share ring the default; the believed faith carries its age.**
*Requests:* J397 (M3), (M6), (M8), (M28); items 1087 (c), 1089; T-V13-77, T-V13-86 (item 1111).
*Current text* (a):
> only once the DM seats one" — a born world holds none).
*New text* (a):
> only once the DM seats one" — a born world holds none; its banner reads "no creed seated: the dossiers' temples pray to no
> named god", so the dossiers' temples and the host's "gods and temples remain" at a campaign's making are not
> contradicted, J397 (M6)). *Felt:* "Thornhold's temples pray to no named god" at the birth window; under spread, "the
> Sun's creed crossed into Aldmere along the war front" — first visible within a season (a conversion at its week; a share
> ring's change at its plate) (J397 (M3)).
*Current text* (b):
> each share with its local standing in the host's words; the patron's colour filling the seat's area uniformly, labelled "this settlement's patron over its seat area" | S, placed | spread, seated | public where the host has embedded the pantheon; DM else | plate |
*New text* (b):
> each share with its local standing in the host's words, the patron's glyph at the seat's centre — the default; the patron's colour filling the seat's area uniformly an option of the lens (`LensRule.areaFill`, off by default; a view key V09 draws under BCR-V13-39, never an edit), labelled "this settlement's patron over its seat area — never a region of faith" (J397 (M28): the seat territory is total, so an area fill reads as a region of faith to the eye; the glyph and its ring do not) | S, placed | spread, seated | public where the host has embedded the pantheon; DM else | plate |
*Current text* (c):
> | believed faith | the party's believed rows | the believed label | S | beliefs | party | plate |
*New text* (c):
> | believed faith | the party's believed rows (`Believed`) | the believed label, captioned "as of week n" and faded by its band; its integrity word on the DM's view only (J397 (M8)) | S | beliefs | party | plate |
*Evidence:* docs/PROGRESS.md J397 (M3), (M6), (M8), (M28), (S1); V13 §5.9 (6) as it stood (J379, J380; the `none` regime "a creed exists only once the DM seats one"; the mixture's uniform fill; the believed faith), §5.8 (3) (the author said: the host's generation seats no deity), §2.3's `LensRule.areaFill` (item 1089); experience read 01 §2.3 (2) ("Temples without a creed": the magic choice's "Gods and temples remain" against "a born world holds none"), §2.4, §3 worst 5, §4 Q10; experience read 03 §2.4 (5) ("'Never a region' versus seat-area fills"), §3.2 (1), §4 Q9; `research/sf/faith-system.md` §1 and §9 (no deity seated at birth: the owner's open word), as the reads cite them.


### Volume 13 — §5.9 (7. Prosperity: the felt line; the band ring by default; the believed band's age)

**1109.** **The prosperity lens names its felt sentence; the rung draws as a glyph with a band ring by default, the seat-area fill an option; the believed band carries its age.**
*Requests:* J397 (M3), (M8), (M28); items 1087 (e), 1089.
*Current text* (a):
> the realm's history; the sway reads it relative to the realm's median (V13 §3.9 (7)).
*New text* (a):
> the realm's history; the sway reads it relative to the realm's median (V13 §3.9 (7)). *Felt:* "Emberford's band rose:
> its boom" — first visible within a season (a band change at its plate; a boom at its week); under frozen, the banner
> at the birth window (J397 (M3)).
*Current text* (b):
> | the rung | `PolitySeat.prosperity`; the plates' rungs | a glyph in the host's band words, and the seat's area filled uniformly, labelled "this settlement's band over its seat area" | S, placed | every | public (the host prints the word); the party's believed band where beliefs | plate |
*New text* (b):
> | the rung | `PolitySeat.prosperity`; the plates' rungs; the party's believed band (`LensFacts.prosperity`, with its `Believed`) | a glyph in the host's band words with a band ring at the seat — the default; the seat's area filled uniformly an option of the lens (`LensRule.areaFill`, off by default), labelled "this settlement's band over its seat area — never a region of wealth" (J397 (M28)); the believed band captioned "as of week n" and faded by its band, its integrity word on the DM's view only (J397 (M8)) | S, placed | every | public (the host prints the word); the party's believed band where beliefs | plate |
*Evidence:* docs/PROGRESS.md J397 (M3), (M8), (M28); V13 §5.9 (7) as it stood (J380; the rung's uniform fill; "the party's believed band where beliefs"), §2.2's `LensFacts.prosperity` (item 1087 (e)), §2.3's `LensRule.areaFill` (item 1089); experience read 03 §2.4 (5) ("Prosperity and alignment fills do the same"), §2.6 ("this band has not moved"), §4 Q9; experience read 05 §1.2 (the believed prosperity band).


### Volume 13 — §5.9 (8. Alignment: the banner's order; the felt line; the axes' glyph by default)

**1110.** **The alignment banner names its regime first and the born-lean note second; its felt line; the two axes draw as a glyph by default, the seat-area fill an option.**
*Requests:* J397 (M3), (M6), (M28); item 1089; T-V13-77, T-V13-86 (item 1111).
*Current text* (a):
> tilted on every born world — the host's vocabulary, not the realm's history").
*New text* (a):
> tilted on every born world — the host's vocabulary, not the realm's history"). **The banner's order** (J397 (M6)): the
> banner names the lens's regime first ("lived: the host's reading, with a deity, deeds or a war adding their terms";
> "born: the host's reading, resting on archetype, roster and legitimacy") and the born-lean note second — never the
> note as the first sentence a DM reads of their realm's character. *Felt:* "Kessar reads lawful and lenient by the
> host's law" — first visible within a month (one reading per advance window) (J397 (M3)).
*Current text* (b):
> | the two axes | `.alignment[].law`, `.malice` | a two-way fill over the seat's area, labelled "by the host's law" | D, placed | lived, born | DM | plate |
*New text* (b):
> | the two axes | `.alignment[].law`, `.malice` | a two-axis glyph at the seat, labelled "by the host's law" — the default; the two-way fill over the seat's area an option of the lens (`LensRule.areaFill`, off by default), labelled "this settlement's reading over its seat area — never a region of character" (J397 (M28)) | D, placed | lived, born | DM | plate |
*Evidence:* docs/PROGRESS.md J397 (M3), (M6), (M28); V13 §5.9 (8) as it stood (J380; J384 (7); the born-world bias note; the two-way fill), §5.8 (3) (the built bias said), §2.3's `LensRule.areaFill` (item 1089); experience read 01 Moment 8, §2.4 ("The alignment lens's first sentence is a disclaimer … as a DM's first look at the moral character of their new realm it is deflating"); experience read 03 §2.4 (5), §4 Q9.


### Volume 13 — §7 Tests and acceptance bars (the experience fixtures; T-V13-74 – T-V13-86 after T-V13-73)

**1111.** **The experience fixtures are named; the tests T-V13-74 – T-V13-86 carry the pass's rulings.**
*Requests:* J397 (M1)–(M3), (M6)–(M12), (M22)–(M24), (M27)–(M29), (M50); every item above.
*Current text* (a):
> and trade fixtures) and the world-growth fixtures T-V13-57 – T-V13-72 name — **B-FORM** (the five scenarios × the
*New text* (a):
> and trade fixtures), the world-growth fixtures T-V13-57 – T-V13-72 name and the experience fixtures T-V13-74 – T-V13-86
> name (B-POLITY with a birth window at seq 0; the **belief** fixture — the scripted host recording belief per court,
> with a party seat, a home seat, courts' believed political facts with their ages and confidence bands, integrity words
> and `causedBy` receipts; the **omniscient** fixture — no belief recorded, a party seat and a travel law with its news
> pricing; the clerk and events fixtures with a mock `headlineOf`) — **B-FORM** (the five scenarios × the
*Current text* (b):
> the gate is evaluated once per generate, placement or commit and never on a control's change (a counter on the gate) | the three account fixtures over the dialog harness; the mock host |
*New text* (b):
> the gate is evaluated once per generate, placement or commit and never on a control's change (a counter on the gate) | the three account fixtures over the dialog harness; the mock host |
> | T-V13-74 | **the birth window and the birth fold** (J397 (M1); H37): on B-POLITY extended with a birth window at seq 0, `{ fromWeek: 0; toWeek: 0 }` (a lens window with its regime and its populations, a polity window with every seat's rungs at their genesis values, an empty events window) a campaign opens with every banner resolved (none "not sent"), the sway projecting from the genesis rungs (no seat at the middle rung; the provisional word in no legend), plate 0 and cover plate 0 at week 0 with the fields the populations give; the first advance's window with no change folds a plate whose sway, fields and banners draw byte-identically to plate 0's (no week-one artifact), and one with one tier change moves exactly that seat's rungs and its planting line; a campaign bound before its first polity window (no birth window) opens provisional as before; the birth fold from `CampaignFacts` alone (no `sizes` in the birth window) equals the fold from `sizes` equal to those populations, and where both are sent the window's win | B-POLITY with the birth window; B-COVER |
> | T-V13-75 | **the grace rule** (J397 (M2); H38; H22): on the mock host a campaign born on this world has `hostLocked` unset on every seat until the first advance — an origin edit on any seat is accepted, re-placing it (P1–P3, the blend re-run) and re-laying its host edges (W7), no canon requested, no `W_HOST_CANON_BEHIND`, no canon-gated lane fed; at the first advance the host's `canonized` for the birth canon sets `hostLocked` on every seat as it then stands and the canon's seat points equal the seats' points at that moment, not at creation; a later origin edit is refused `refuse.place.hostLocked`; a replay from the log reproduces the same canon byte for byte | the mock host; T-V13-7's lint |
> | T-V13-76 | **felt rows and first-visible lines** (J397 (M3)): a lint over `world.lens` finds a `felt` row on every lens with a sentence and a first-visible unit, and over V13 §8.5 finds a first-visible line and a felt sentence on H22, H23 and every row from H36; a lens whose felt row a fixture removes opens still with the reason "not yet proven felt", listed collapsed, never hidden; each lens's first-visible unit holds on its fixture — within one advance of that unit under its live regime at least one mark of the lens draws (the plague's ring within a week of an authored outbreak; the sway's planting line within a week; a trade arrival within a week on the canon; a column within a week; a conversion within a season; a band change within a season; an alignment reading within a month) | lint; the lens fixtures |
> | T-V13-77 | **the religion `none` wording and the alignment banner's order** (J397 (M6)): on the birth-defaults fixture the religion lens's banner reads "no creed seated: the dossiers' temples pray to no named god" and the alignment lens's legend holds its regime word's row before the born-lean note's row, in that order | the birth-defaults fixture |
> | T-V13-78 | **why crosses the seam** (J397 (M7); H43): `reasonOf` on a `subject` of each kind — a `charter` (the terrain word H14 derives), a `reading` (a water verdict, a travel effort, a land-cover share), a consumed `edit`, a `route` — and on a `WorldWhere` returns the chain rendered for the asking audience: `whatCaused`'s tree flattened in walk order, a sentence and a week per hop from its `MsgRef` with the rule row named, under V10's visibility for `audience` (a withheld input "something you cannot see"; a `public` audience never a DM-only input); `whatCaused` on a host event holding `causedBy` descends one level into the receipt ids, each named as the host's and rendered from no host law; a fact with no host event descends into none; the reading is persisted nowhere and read by no stage (T-V13-7's lint extended to `reasonOf`) | the clerk fixtures; the mock host |
> | T-V13-79 | **the party observer and the believed rows** (J397 (M8); H39): on the belief fixture with a party seat sent, the party's set is the believed record of the party seat's court and the legend names that court; with no party seat and a home seat, the home seat's court; with neither, the public truth or nothing; every believed mark of the plague, religion, prosperity and populations lenses draws "as of week n" at the alpha of its band (`alphaByBand`); a row's integrity word draws on the DM's view and is absent from every party set and player picture (dropped at fold); a believed row with no `Believed` is refused at fold (`refuse.lens.invented`, "a believed row with no age") | the belief fixture; the audience fixtures |
> | T-V13-80 | **the court viewpoint** (J397 (M9), (M50); H40): with a court's believed political facts sent, the sway lens's viewpoint for that court draws the believed allegiance labels as member links and the believed strength bands as the push, every other input from the public facts at the plate, a subject the court holds no belief of unclaimed and labelled "unknown to {court}", captioned "as {court} believes it, as of week n"; the viewpoint is a derived transient — the world's model and records digests, the `SwayRevision` chain, `mapFeed`'s crossing holders and `patrolOffer` are byte-identical with the viewpoint open, closed or never computed —, its projection within `WORLD-23` and evicted with the plate; it is absent from every player picture until the DM opens it, and opened it shows exactly the court's rows filtered to the party's audience, never a truth the court does not hold; the party's picture under belief uses the party observer's court's viewpoint where sent, else the known truth; `whyCell` under a viewpoint names believed rows and their ages | the belief fixture; T-V13-7's lint |
> | T-V13-81 | **the default-preset arm** (J397 (M10)): on the omniscient fixture with the party seat sent, a public row of a seat at hop weeks h from the party's seat draws on the party's picture at week w + floor(h × 0.5) and not before, a row of the party's own seat at once, a pair's row from the nearer seat, a realm arc from the nearest seat it names, a row with no seat at its week; a political event enters the party's known set by the same rule and the player sway re-derives over it (the §5.1 cache keyed by the derived known set); with `TravelLaw.news` sent its factor and rounding win; the DM's picture is unchanged; the player legend reads "news reaches the party at a rider's pace"; with no party seat sent the picture is as current as the public truth and the legend says so; where the host sends `audienceKnowledge` its set wins over the derived one | the omniscient fixture; the mock host with `TravelLaw.news` |
> | T-V13-82 | **the headline join and the knowledge pins** (J397 (M11); H41): a pin of an event holding `causedBy` draws the action "open the headline" when the mock host registers `headlineOf` and does not when it registers none; the action calls `headlineOf(event)`, the event carrying its `causedBy` ids and nothing the map composed, and the map renders no headline of its own; a `knowledge` kind folds DM-only whatever audience the host resolved and draws on no player picture; `WorldEvent.integrity` draws on the DM's view only; the "this advance" filter lists exactly the last window's dated events | the events fixtures; the mock host |
> | T-V13-83 | **nobody is ever current at the map feed** (J397 (M12); H42): a lint over `mapFeed`'s products finds every field a truth of the revision in force and none read from a `LensFacts` set — no believed variant of a crossing holder, a border or a glyph exists to offer; the port's manifest names the map feed's readers as the host's outcome and cost readers; T-V13-7's lint finds no port path from a presentation input into `mapFeed`, `patrolOffer` or `canon` | lint; the port's manifest |
> | T-V13-84 | **the named allegiance** (J397 (M22); H36): with `PolityFacts.names` sent the sway's legend label reads the host's name for the allegiance, a DM's christening over it, and the descriptive label where neither is sent; a name's change re-labels without a revision | the polity fixtures |
> | T-V13-85 | **movers and dated facts** (J397 (M23), (M24), (M27), (M29); H44): no mover marker (a column, a named traveller, a shipment, an army) draws a destination, an arrival time, a path highlight or a heading — an anchored negative over the lens layers: no polygon, arrow or marker-end on a mover, no destination string on a mover's card; a column sits at its leg's fraction and its arrival draws at the destination only once the host's row dates it; the approach ring, a hop's "arrived week n" and a supply arrival carry their weeks as dated facts; a "likely road" draws DM-only and labelled; a column's `cargo` draws as the host's fact and a column with none draws none, the refusal row's gate holding exactly while the regime's lanes for them are dark; until H33 every lens's sea link carries the routes layer's seasonal effort for the view's month as the caption "the host's movers do not yet read the season" and after it none; until H24 a hop's arrival is captioned "arrived; the town's record follows at resolution" and after it not | the movement fixtures; the sailing fixture |
> | T-V13-86 | **seat glyphs and the area-fill option** (J397 (M28)): the religion, prosperity and alignment lenses draw a seat glyph with its ring by default and no area fill; with the lens's `areaFill` option on, the fill draws labelled as V13 §5.9 (6)–(8) say, with no gradient across a border (T-V13-55 kept); the option is a view key, logged in no edit and in no digest | the lens fixtures |
*Evidence:* docs/PROGRESS.md J397 (M1)–(M3), (M6)–(M12), (M22)–(M24), (M27)–(M29), (M50); the review docs/volumes/critique/experience-vwx.md EX-01, EX-07, EX-08, EX-17 (T-V13-74, T-V13-78, T-V13-80 and T-V13-82 revised to its rulings); V13 §7's preamble (the fixtures T-V13-47 – T-V13-56 and T-V13-57 – T-V13-72 name; B-POLITY "extended with a lens window per advance"), §7.4's T-V13-47 – T-V13-56 (the lens tests' form) and T-V13-73; the items 1084–1110 of this file; the research notes as those items cite them.


### Volume 13 — §8.5 The host's parallel track (the preamble: every H row minted from now on carries its felt sentence and first-visible line)

**1112.** **From J397 (M3) on, every H row states its first-visible line, its felt sentence and its spreads in its own cell; a row whose first-visible line fails its experience read does not light.**
*Requests:* J397 (M3); H22 and H23 revised (items 1113, 1114); H36 – H44 (item 1115).
*Current text:*
> first-visible line, or a planting line where its effect waits on a dwell, measured spreads or UNMEASURED for every⏎band it mints, and its felt sentence, and landing as a lazy leaf under the host's first-paint ratchet; H22 carries
*New text:*
> first-visible line, or a planting line where its effect waits on a dwell, measured spreads or UNMEASURED for every
> band it mints, and its felt sentence — from J397 (M3) on, every H row minted here states them in its own cell (the
> change; **first visible:** its line and its DM advance unit; **felt:** its sentence; **spreads:** measured or
> UNMEASURED), H22 and H23 revised in place to carry theirs, and a row whose first-visible line fails its experience
> read does not light (the host's first-visible-latency and felt-proof laws, carried to this track; T-V13-76) —, and
> landing as a lazy leaf under the host's first-paint ratchet; H22 carries
*Evidence:* docs/PROGRESS.md J397 (M3); V13 §8.5's preamble as it stood ("each row also carrying its first-visible line … and its felt sentence") and its rows H1–H35 (none stating one); experience read 01 §2.2 (2) ("no H row, H22 included, states one"), §4 Q8; the host's `docs/DESIGN_FP_COHERENCE_FOLD.md:104-112, 132-137` (requirements 16 and 19), as the read cites them.


### Volume 13 — §8.5 H22 and H12 (revised in place: the birth canon taken at the first advance — the grace rule; the felt line; H12's genesis over the seats as they then stand)

**1113.** **H22's birth canon is taken at the campaign's first advance over the seats as they then stand; the row carries its first-visible line and felt sentence; H12's genesis network is laid over the seats as they then stand, its costs the birth canon's at the first advance.**
*Requests:* J397 (M2), (M3); items 1084, 1090; H38 (item 1115).
*Current text* (a):
> a world from this module **canonized at the campaign's birth** (J384 (6); J386): the first canon adopted as the campaign is created, its scale stamped by H7's rule and its genesis network laid at birth (H12), so the canon-gated lanes its rules light run from its first week
*New text* (a):
> a world from this module **canonized at the campaign's birth** (J384 (6); J386) — **the birth canon taken at the first advance** (the grace rule, J397 (M2); H38): the first canon adopted at the campaign's first advance over the seats as they then stand, not at creation — until that advance every seat drags free (the host's own promise at t=0), each drag re-placing it with its blend and re-laying its roads, nothing canonized to shift, and the canon-gated lanes run from the first advance, which is the first time anything runs; after it a move is the premium re-canonize below and `Placement.hostLocked` holds (V13 §2.2) —, its scale stamped by H7's rule and its genesis network's edges named at creation (H12), laid over the seats as they stand and re-laid at each drag, their costs entering the canon at the first advance, so the canon-gated lanes its rules light run from its first week
*Current text* (b):
> new campaigns are born canonized as J386 and J388 rule once H5, H7, H8 and H12 land, no question gating it | H5; H7; H8; H12 |
*New text* (b):
> new campaigns are born canonized as J386 and J388 rule once H5, H7, H8 and H12 land, no question gating it; **first visible:** at the first advance — within a week of it the roads and lanes the canon lights (a supply link's arrival, a column, a plague front); **felt:** "the caravans use the real roads from the first week, and I never pressed a canonize button"; **spreads:** UNMEASURED (J397 (M3)) | H5; H7; H8; H12 |
*Current text* (c):
> genesis at world birth over the canon with the founding members placed first, sent as one frozen record (even while dark);
*New text* (c):
> genesis at world birth over the seats as they then stand with the founding members placed first — its edges named at creation, re-laid at each grace drag, their costs those of the birth canon at the first advance (H22; H38) —, sent as one frozen record (even while dark);
*Evidence:* docs/PROGRESS.md J397 (M2), (M3), (S3); the review docs/volumes/critique/experience-vwx.md EX-06 (the genesis network "over the canon" against the grace rule; §3.8 (8)'s sentence is file w's); V13 §8.5's H12 as it stood ("genesis at world birth over the canon with the founding members placed first"), H22 as it stood ("the first canon adopted as the campaign is created"; a re-canonize that shifts other geometry stays premium; the additive re-canonize), H12 (genesis at world birth over the canon), §3.11.6's consumption law (item 1090), §2.2's `Placement.hostLocked` (item 1084); experience read 01 Moment 7 ("Canonizing at birth is a background act with no screen"), §2.3 (1), §4 Q5; the host's `src/domain/instantWorld/worldPlan.js:146-147` and `src/lib/instantWorld/composeInstantWorld.js`'s header, as the read cites them.


### Volume 13 — §8.5 H23 (revised in place: the window at creation and after every advance, undo and resume; the party observer's record; the felt line)

**1114.** **H23's lens window comes at the campaign's creation and after every advance, undo and resume; its party set is the party observer's record with aged rows; the row carries its first-visible line and felt sentence.**
*Requests:* J397 (M1), (M3), (M8); items 1087, 1092; H37, H39 (item 1115).
*Current text* (a):
> the **lens window** after every advance, undo and resume (`lensWindow`, V13 §3.11.6), beside the events window: per advance, for each lens, the ledger rows it already keeps
*New text* (a):
> the **lens window** at the campaign's creation — the lens half of the birth window, its polity half the polity window at seq 0, H37 (J397 (M1)) — and after every advance, undo and resume (`lensWindow`, V13 §3.11.6), beside the events window: at creation and per advance, for each lens, the ledger rows it already keeps
*Current text* (b):
> each row with its resolved audience (a row without one is folded DM-only), and a party set of believed rows where it records belief;
*New text* (b):
> each row with its resolved audience (a row without one is folded DM-only), and a party set of believed rows where it records belief — the party observer's record, each row with its update week and confidence band, the party's seat sent each advance (H39; J397 (M8)) —;
*Current text* (c):
> rite adoptions and imposed rites with their origin and the week each took effect (the host keeps the year only), relief and credit with their giver | M-W5; H4; H9 |
*New text* (c):
> rite adoptions and imposed rites with their origin and the week each took effect (the host keeps the year only), relief and credit with their giver; **first visible:** at the birth window every banner resolved, and within one advance the first plate's marks; **felt:** "the lenses tell me what the host is really running, from the day the campaign is born"; **spreads:** UNMEASURED (J397 (M3)) | M-W5; H4; H9 |
*Evidence:* docs/PROGRESS.md J397 (M1), (M3), (M8), (S2), (S5); V13 §8.5's H23 as it stood ("the lens window after every advance, undo and resume"; "a party set of believed rows where it records belief"), §3.11.6's `lensWindow` (item 1092), §2.2's `LensFacts` (item 1087); experience read 01 Moment 6 (the window "sent after every advance, undo and resume" and none at birth), §4 Q3; experience read 05 §2.1 (1) (H23 "asks the host for a party set … but the host has no party observer"), §2.4, §4 Q1 and Q3.


### Volume 13 — §8.5 H36 – H44 (after H35: born applied and born peopled; the birth window; the grace rule; the party observer; a court's believed facts and the integrity register; `headlineOf` and the knowledge events; the map feed's readers fenced; the cause walk across the seam; the ambiguity law amended)

**1115.** **The nine host rows of the experience pass, each with its first-visible line, felt sentence and spreads.**
*Requests:* J397 (M1)–(M3), (M7)–(M9), (M11), (M12), (M22), (M23) and the asks S1, S2, S3, S5, S6, S7, S9, S11; every item above.
*Current text:*
> (absent ⇒ the atlas a file through the share sheet's Download; a continuation in host mode refused, `refuse.atlas.hostWorld`) | M-ATLAS-A; H4; H10 |
*New text:*
> (absent ⇒ the atlas a file through the share sheet's Download; a continuation in host mode refused, `refuse.atlas.hostWorld`) | M-ATLAS-A; H4; H10 |
> | H36 | with M-W2 (born peopled: with H13's polity facts; born applied: the host's own rules law; a deity at birth: the owner's open word) | **born applied and born peopled** (J397 (M1), (M22); the first row of the experience pass, each row from here carrying its first-visible line and felt sentence, M3): a campaign born on a world from this module is born with the host's realistic rules applied — the regime the banners read, so one rules label names one regime and never two —, its polities named at genesis (the overlord chains as named allegiances, the name on `PolityFacts.names`, read by the sway's label, V13 §5.9 (2)) and, where the host so rules (the owner's open word on a deity at birth), a deity seated at birth as the capital's patron, so the religion lens opens seated rather than none; a plainly born campaign's rules label reads its birth defaults, never a preset it does not run; **first visible:** at the birth window — the banners read applied, the legend names the allegiances; **felt:** "my realm has names and rules from the day it is born"; **spreads:** UNMEASURED | H13; H37 |
> | H37 | with M-W5, with H23 | **the birth window** (J397 (M1)): a lens window and a polity window sent at the campaign's creation (seq 0, `{ fromWeek: 0; toWeek: 0 }`, an empty events window beside them) — the lens window's regime resolved and its populations, the polity window's facts at their genesis values — so every banner resolves at birth, the sway projects from genesis facts, the cover fold runs at birth and the first advance redraws only what changed (V13 §5.8 (2), (8), (9); §5.9 (2)); H23 revised in place: the window at creation and after every advance, undo and resume; **first visible:** at creation, before any advance; **felt:** "the map knew my realm before I advanced it once"; **spreads:** UNMEASURED | H23 |
> | H38 | with M-W2, with H22 | **the grace rule** (J397 (M2)): the birth canon taken at the first advance over the seats as they then stand; until it every seat drags free, each drag re-placing it and re-laying its roads; the canon-gated lanes run from the first advance; after it a move is the premium re-canonize (H22 revised in place); the host's own t=0 promise kept, its move-lock set at the first advance and never at creation (`Placement.hostLocked`, V13 §2.2); **first visible:** at the first drag — the seat moves, its roads re-lay, nothing refused; **felt:** "I can still nudge my towns before the first week runs"; **spreads:** UNMEASURED | H22 |
> | H39 | with M-W5, where it records belief | **the party observer** (J397 (M8)): the host resolves the party's observer — the court of the settlement the party stands at, else the party's home seat (a campaign fact the DM names, `CampaignFacts.homeSeat`), else none — and names it (`LensFacts.observer`); sends the party's seat each advance (`LensFacts.partySeat`); sends every believed row with its update week and confidence band (`Believed`); **first visible:** within one advance where belief is recorded — a believed mark with its age; **felt:** "the players' map believes what their town believes, and says how old the news is"; **spreads:** UNMEASURED | H23 |
> | H40 | with M-W5, on request | **a court's believed political facts and the integrity register** (J397 (M9), (M11)): on request for a court viewpoint, a court's believed political facts — believed allegiance labels and strength bands, each with its update week and confidence (`LensFacts.courts`) — for the sway lens's court viewpoint (V13 §5.9 (2)); the integrity register word (clean, worn in the telling, planted) on every DM-side believed row and event where it holds one (`Believed.integrity`, `WorldEvent.integrity`), never on a party's; **first visible:** within one advance of opening a viewpoint; **felt:** "I can see the ford as Thornhold's court believes it — and that we planted that belief"; **spreads:** UNMEASURED | H23; H39 |
> | H41 | with M-W5 (its news paper) | **`headlineOf` and its knowledge events** (J397 (M11)): a reader registered on the port, `headlineOf(event)`, opening its news paper's entry for an event's `causedBy` receipts from a map pin's "open the headline" (V13 §3.11.6, §5.1); its knowledge events (a plant, an intercept, a burned agent) sent as DM-only dated events, their kind marked for the adapter folder's event table; **first visible:** at the first advance with a headline — the pin's action; **felt:** "I click the siege on the map and read the paper's story of it"; **spreads:** UNMEASURED | H9; H23 |
> | H42 | with H16, before any negotiation-side reader of its own exists | **nobody is ever current at the map feed** (J397 (M12); law (10) of V13 §3.11.6): the host names the readers of the crossing-holder overlay and of every truth the map feed carries — its outcome and cost readers only — and fences every negotiation-side reader (a term, a vote, an interceptor's judgement, a feasibility read) from them, with a test of its own that fails when such a reader reaches the overlay; **first visible:** none (a fence; its test is its sign); **felt:** "no envoy of mine reads the true border off the map"; **spreads:** — | H16 |
> | H43 | with M-W5 (its cause walk) | **the cause walk crosses the seam** (J397 (M7)): its cause walk calls the port's `reasonOf(world, subject, audience)` (V13 §3.11.6's signature: a `subject` of kind `charter`, `edit`, `reading` or `route`, or a `WorldWhere`, and the audience; the chain returned rendered for that audience, a sentence and a week per hop) for a world-caused dossier fact (a terrain word the charter gave, a water verdict, a travel effort, a land-cover share) and appends the map's hops to its own walk, as the map's, one level deep, in its own popup (V13 §4.7); **first visible:** at the first "why" on a world-caused fact; **felt:** "why is Kessar hungry? — because the Greyspine's shadow keeps the rain off its fields"; **spreads:** UNMEASURED | M-W5; H4; H14 |
> | H44 | now (documents) | **the ambiguity law amended** (J397 (M23)): its ambiguity law for movers says what V13 §5.8 (5) says — a mover marker is a presence (no destination, no arrival time, no path highlight, no heading) and a dated fact the host computed (an arrival week, an onset week, a hop) may carry its week on any surface, the map's included; **first visible:** none (a document); **felt:** "the ring says 'three weeks to onset' and the column says nothing of where it goes — on both of our maps"; **spreads:** — | — |
*Evidence:* docs/PROGRESS.md J397 (M1)–(M3), (M7)–(M9), (M11), (M12), (M22), (M23) and (S1), (S2), (S3), (S5), (S6), (S7), (S9), (S11); the review docs/volumes/critique/experience-vwx.md EX-01, EX-08, EX-16 (H37, H41 and H43 revised to its rulings); V13 §8.5's preamble and its rows H1–H35 as they stood (H13 the polity facts; H16 the crossing holder as an advance-head overlay; H22 the birth canon; H23 the lens window), the items 1084–1114 of this file; experience read 01 Moments 6–8, §2.2 (2), §2.3 (1), (2), (3), (6), §4 Q3–Q5, Q8, Q12; experience read 02 Week 0, §4 Q7; experience read 03 §2.4 (1), §4 Q1–Q3; experience read 05 §1.2–§1.4, §2.1 (1)–(5), §4 Q1–Q6; `research/sf/lens-implications.md` §1.2 item 6 (the default preset's name over-states what a born campaign runs: two "Realistic"s) and `research/sf/faith-system.md` §1, §9 (no deity seated at birth: the owner's open word); the host's `src/domain/instantWorld/worldPlan.js:146-147`, `src/domain/worldPulse/beliefMap.js:10-12, 204-209`, `docs/DESIGN_WAR_RULINGS_ARCHITECTURE.md:48`, `docs/DESIGN_FP_ARCH_WY.md:763-768`, `docs/DESIGN_FP_SPINE.md:491-520`, `docs/DESIGN_FP_COHERENCE_FOLD.md:104-112, 132-137`, as the reads cite them.


### Volume 13 — §9 Decisions (J-V13.137 – J-V13.153, after J-V13.136)

**1116.** **The seventeen decisions of the experience pass's map-side rulings carried by this file.**
*Requests:* J397 (M1)–(M3), (M6)–(M12), (M22)–(M24), (M27)–(M29), (M50); every item above.
*Current text:*
> the base's §11.4 records the delegation as the owner's explicit word (BCR-V13-47) |
*New text:*
> the base's §11.4 records the delegation as the owner's explicit word (BCR-V13-47) |
> | J-V13.137 | chose **the birth window and the birth fold** (J397 (M1); experience read 01 Moments 6 and 8, §4 Q3–Q4; file v items 1092, 1098, 1101, 1102) — a lens window at the campaign's creation with its regime, its genesis polity facts and its populations, every banner resolved at birth, plate 0 and cover plate 0 at week 0, the first advance redrawing only what changed — over banners reading "not sent" until the first advance with the fields and borders bursting in then (the week-one artifact: the map moving when the host first reported, not when anything happened), because the facts exist at genesis and nothing is guessed, and because a product that lands the user in a campaign must not undersell its realm at the first look |
> | J-V13.138 | chose **the grace rule** (J397 (M2); experience read 01 §2.3 (1), §4 Q5; file v items 1084, 1090, 1113) — the birth canon taken at the first advance over the seats as they then stand, every seat dragging free until then, `Placement.hostLocked` set at the first advance — over the canon at creation with a premium re-canonize for every drag, and over free drags silently re-canonizing, because the host promises free drags at t=0 and the first advance is the first time anything runs, so waiting loses nothing and contradicts nothing |
> | J-V13.139 | chose **felt sentences and first-visible lines on every lens and every H row minted from now on, and a lens that fails its read not lighting** (J397 (M3); experience read 01 §2.2 (2), §4 Q8; the host's requirements 16 and 19; file v items 1089, 1097, 1112) — a `felt` row of `world.lens`, a *Felt* line under each lens, a cell on each H row — over a felt-proof note in prose alone, because a rule a tester can check is a row (T-V13-76), and because the module had a strong honesty rule and no felt-proof rule |
> | J-V13.140 | chose **"no creed seated: the dossiers' temples pray to no named god" for the religion lens's `none` banner, and the regime word before the born-lean note on the alignment lens** (J397 (M6); experience read 01 §2.3 (2), §2.4; read 03 §3.2 (1); file v items 1108, 1110) over "a born world holds none" and the disclaimer first, because the host promises temples and prayer at a campaign's making and the lens must not read as contradicting the dossiers, and because the first sentence a DM reads of their realm's character should name what runs, not the host's table's lean |
> | J-V13.141 | chose **`reasonOf` on the port and `whatCaused` descending one level into the host's receipts** (J397 (M7); experience read 01 §2.3 (6), §4 Q12; file v items 1091, 1094) over two cause chains that never meet, over the map rendering host receipts itself and over a `MsgRef` tree returned to the host (the flat rendered chain — a sentence and a week per hop, rendered for the asking audience — chosen instead, since the host holds no catalogue and cannot render a `MsgRef`), because one "why" must walk from the drought to the hunger, and because each side renders its own half in its own voice — the map re-reads no host law and the host reads sentences, never a raster |
> | J-V13.142 | chose **the party observer — the party seat's court, else the home seat's, else none** (J397 (M8); experience read 05 §1.2, §2.1 (1), §4 Q1; read 02 §4 Q7; file v items 1087, 1100) over a party observer of the host's own (it has none) and over only what the party itself witnessed (the host records no such thing), because the host records belief per court and the court of the town the party stands at is the source of its own player rumour display |
> | J-V13.143 | chose **age and confidence on every believed row, drawn "as of week n" and faded by band** (J397 (M8); experience read 05 §1.2, §2.1 (4), §3 worst 5, §4 Q3; file v items 1087 (g), 1089) over ageless believed marks, because the host stores both and a stale rumour that looks like this week's news is a false picture; the integrity word DM-only because a player must never read "planted" |
> | J-V13.144 | chose **the court viewpoint as a derived transient of the sway lens over a court's believed political facts, DM-only unless opened, and law (3) kept over it** (J397 (M9), (M50); experience read 05 §1.3, §2.1 (2), §2.5 C2 and C4, §4 Q2; read 02 §2.2 (5); file v items 1093, 1096, 1104) over a believed sway as a revision (it would enter the revision chain the map feed reads) and over no believed border at all (the host's signature drama, a misjudgement, undrawable), because a projection over believed inputs is the sway's own rule function with other inputs, and nothing of it may reach the canon, the feed or a crossing holder |
> | J-V13.145 | chose **the default-preset arm: public rows at a rider's pace by the host's own distance pricing where the party's seat is sent** (J397 (M10); experience read 05 §1.2 world A, §3 worst 2, §4 Q5; file v items 1089, 1096, 1100) over a perfectly current party map under the omniscient regime and over a map-side belief model, because the host's constitution says nobody is ever current and its own pricing already exists as data (`TravelLaw.news`; `partyNewsDelay` its default), so the party's map lags by a rule the host owns while the DM's picture never moves |
> | J-V13.146 | chose **the headline join through `causedBy` and a host-registered `headlineOf`, the "this advance" filter named the letter's map half, and its knowledge events (a plant, an intercept, a burned agent) as DM-only pins** (J397 (M11); experience read 05 §1.4, §2.4, §4 Q4; file v items 1085, 1091, 1095) over the map rendering headlines or a knowledge lens, because the receipt ids already sit in `WorldEvent.causedBy` and the host's paper is the one truthful paper, which the map summons and never copies; a knowledge lens stays deferred (D-V13.12) |
> | J-V13.147 | chose **law (10): the map feed for the host's outcome and cost readers only, never a negotiation-side reader** (J397 (M12); experience read 05 §2.1 (3), §4 Q6; file v item 1093) over naming no reader, because the crossing holders are truth by construction and the host's own law forbids a negotiation path reading true world state; the host names its readers and tests the fence (H42) |
> | J-V13.148 | chose **an optional host allegiance name on `PolityFacts`, read by the label after the DM's christening and before the descriptive label** (J397 (M22); experience read 02 Week 0; file v items 1086, 1104) over the descriptive label alone, because a realm born peopled (H36) names its polities at genesis and "Thornwall and its vassals" should be the fallback, not the rule |
> | J-V13.149 | chose **the split of mover markers from dated facts** (J397 (M23); experience read 03 §2.4 (1), §4 Q3; file v items 1099, 1103, 1107) — a mover a presence with no destination, arrival time, path or heading; a dated fact with its week on any surface — over yielding to the host's ambiguity law whole (the approach ring would lose its weeks) and over ignoring it (the column's "toward its arrival" drew a destination), because the law is about movers and the ring is a fact the host computed; the host's law amended to say the same (H44) |
> | J-V13.150 | chose **the refusal "migrants drawn carrying a faith or a plague" gated "where the host's lane is dark", a sent cargo drawn as the host's fact** (J397 (M24); experience read 03 §2.4 (2), §4 Q7; file v items 1087 (f), 1107) over an ungated refusal, because the day the host's migration-carries-faith or plague-touched-at-dispatch lane lands the refusal would contradict the host |
> | J-V13.151 | chose **the "two seas" caption on every lens's sea link until H33** (J397 (M27); experience read 03 §2.4 (4), §3.2 (5), §4 Q8; file v item 1099) over hiding the routes layer's seasonal effort while a lens is open and over moving a mover by the map's clock, because both clocks are honest and labelled and the DM must be told which one the mover obeys |
> | J-V13.152 | chose **the seat glyph with its ring by default and the seat-area fill as a labelled option** for the religion, prosperity and alignment lenses (J397 (M28); experience read 03 §2.4 (5), §4 Q9; file v items 1089, 1108–1110) over the fill by default, because the seat territory is total and a uniform fill over it reads as a region of faith, wealth or character to the eye whatever its label says |
> | J-V13.153 | chose **"arrived; the town's record follows at resolution" on a hop's arrival until H24** (J397 (M29); experience read 03 §1.1, §2.4 (7), §3.2 (2); file v item 1103) over silence, because the lens is right about the record and the town is not yet changed, and the DM must be told which screen to believe and why |
*Evidence:* docs/PROGRESS.md J397 (M1)–(M3), (M6)–(M12), (M22)–(M24), (M27)–(M29), (M50); the review docs/volumes/critique/experience-vwx.md EX-01, EX-16 (J-V13.141 and J-V13.146 revised to its rulings); V13 §9's rows J-V13.77, J-V13.87 – J-V13.95, J-V13.92 and J-V13.136 as they stood (the lenses' and the audience filter's decisions); the items 1084–1115 of this file and the research notes' sections each row names.


### Volume 13 — §9 Deferred decisions (D-V13.11, D-V13.12 after D-V13.10)

**1117.** **Two decisions recorded, not taken: a divergence view; a knowledge lens.**
*Requests:* J397 (M9), (M11); experience read 05 §2.4.
*Current text:*
> or a scenario asks for an inherited drainage the steady state cannot give.
*New text:*
> or a scenario asks for an inherited drainage the steady state cannot give. D-V13.11 **a divergence view** — the DM's
> truth beside the party's or a court's picture drawn as a difference (where a believed border, band or label differs
> from the head revision), the host's own "what they say, against what is" echoed on the map; taken once the court
> viewpoint (V13 §5.9 (2)) and the party observer (V13 §5.8 (7)) have landed and an experience read asks for it
> (experience read 05 §2.4). D-V13.12 **a knowledge lens** — the host's knowledge events (plants, lures, intercepts, burned
> agents, standing sight) as a DM-only row set of V13 §5.8's mechanism; its events draw today as DM-only dated pins of
> the events layer (J397 (M11); V13 §5.1); taken once the host sends those rows in the lens window.
*Evidence:* docs/PROGRESS.md J397 (M9), (M11); the review docs/volumes/critique/experience-vwx.md EX-16; V13 §9's deferred decisions as they stood (D-V13.8 – D-V13.10), §5.1's `events` row (item 1095), §5.9 (2) (item 1104); experience read 05 §1.4 (the host's "What they say (vs. what is)"), §2.4 ("No divergence view"; "The `knowledge` desk is invisible on the map"), §4 Q4.


### Volume 13 — §11 Owner questions ("Ruled — the birth canon and a fight verdict": the birth canon at the first advance)

**1118.** **The birth-canon ruling reads the grace rule.**
*Requests:* J397 (M2); items 1084, 1090, 1113.
*Current text:*
> recorded here as rulings, not open questions). Every new campaign on a world from this module is canonized at its⏎birth (J384 (6)), whatever its tier — the product ruling the host implements, its premium canonize entitlement never
*New text:*
> recorded here as rulings, not open questions). Every new campaign on a world from this module is canonized at its
> birth (J384 (6)) — the birth canon taken at its first advance over the seats as they then stand, every seat dragging
> free until then (the grace rule, J397 (M2); J-V13.138; V13 §8.5's H38) —, whatever its tier — the product ruling the host implements, its premium canonize entitlement never
*Evidence:* docs/PROGRESS.md J397 (M2); V13 §11's "Ruled — the birth canon and a fight verdict" as it stood (J386; J387; J388), §8.5's H22 (item 1113); experience read 01 §2.3 (1), §4 Q5.


### Volume 13 — §11 Owner questions (a new ruling: birth, belief and the lenses — the experience pass)

**1119.** **The experience pass's rulings this file carries are recorded in §11 as rulings, each vetoable, with what stays the host's and the owner's.**
*Requests:* J397 (M1)–(M3), (M6)–(M12), (M22)–(M24), (M27)–(M29), (M50).
*Current text:*
> in the enforced one (J384 (5)). Vetoable.
*New text:*
> in the enforced one (J384 (5)). Vetoable.
>
> **Ruled — birth, belief and the lenses (the experience pass)** (J397 (M1)–(M3), (M6)–(M12), (M22)–(M24), (M27)–(M29),
> (M50); the owner's "So do the prompts and integrate them that can be done on maps and give me the prompts for settlement
> engine", 2026-10-24, the session ruling under its delegation; recorded here as rulings, not open questions; J-V13.137 –
> J-V13.153; T-V13-74 – T-V13-86; H36 – H44, H22 and H23 revised). The birth window and the birth fold (every banner
> resolved at birth, the sway from genesis facts, the fields from the campaign's populations, the first advance redrawing
> only what changed); the grace rule (the birth canon at the first advance, seats free to drag until then, `hostLocked`
> from the first advance); felt sentences and first-visible lines on every lens and every host row minted from now on, a
> lens that fails its read not lighting; the religion lens's `none` wording and the alignment banner's order; "why"
> crossing the seam both ways (`reasonOf`; `whatCaused` into the host's receipts); the party observer with aged, banded
> believed rows; the court viewpoint over a court's believed political facts, DM-only unless opened, nothing believed in
> the canon, the feed or a crossing holder (law (3) kept, law (10) added); the default-preset arm at a rider's pace; the
> headline join and its knowledge events (a plant, an intercept, a burned agent) as DM-only pins; the host's allegiance names on the label; mover markers split from
> dated facts; the refusal's gate and a sent cargo; the two seas caption until H33; seat glyphs by default and area fills
> as an option; the arrived plague's caption until H24. What stays the host's and the owner's: a deity seated at birth
> (the owner's open word, carried on H36), the readers of the map feed (H42), the text of its ambiguity law (H44), its
> party seat and observer (H39). Vetoable.
*Evidence:* docs/PROGRESS.md J397 (the owner's words verbatim; M1–M3, M6–M12, M22–M24, M27–M29, M50; S1–S15); the review docs/volumes/critique/experience-vwx.md EX-16; V13 §11 as it stood (its "Ruled —" entries' form, file r item 988, file u items 1065, 1066); the items 1084–1118 of this file.

COMPLETE: items 1083–1119 (1083 the owner-rule item; 1084–1119 the change items); fragments 64 (revised 2026-10-24 after the review experience-vwx.md: EX-01, EX-04, EX-06, EX-07, EX-08, EX-16, EX-17); dry-run: all quotes matched once in order (36 change items, 64 fragments, mode=apply: OK, on a copy of docs/volumes/V13-world.md); clean-room lint: no hit
