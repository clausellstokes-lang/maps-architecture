# Verify — owner words and the program's correction (bundle of items 114, 115, 116)

> Verifier seat, lens OWNER WORDS AND THE CORRECTION (Opus 5.5 standing in, PENDING FABLE REVIEW), 2026-09-30.
> Nothing here edits the bundle; each defect names the exact change the bundle's owner applies.

**Read whole.** The bundle: `items-114-116.md` (the three items, l.1–1562), `routing.json` (18 units), `canon-ruling.md`,
`j-rows.md`, `owner-instructions-entry.md`, `plain-summary.md`, `consistency-report.md`. The sources:
`work/g114-115/` (`items-114-115.md` where compared, `final-notes.md` §7, `j-rows.md`, `owner-instructions-entry.md`,
`program-correction.md`), `work/g116/` (`item-116.md`, `final-notes.md` §5–§6, `j-row.md`, `owner-instructions-entry.md`,
`read-owner-decision.md`), `docs/lane-events.log` l.1840–1869, `docs/OWNER-INSTRUCTIONS-2026-09-25.md`, and the
session's own chat record (the transcript's queue entries, which stamp the moment each owner message was sent).

**Receipts** (in `tmp/`): `vo-chat-times.txt` (every owner message of 2026-09-30, verbatim, with its UTC and EDT send
time); `vo-quote-check.txt` (every quoted fragment near "owner" in the bundle matched against those messages: 55 match;
the rest are older owner quotes, checked separately below, or regex spill); `vo-times.txt` (every owner time the bundle
writes, by file and line); `vo-wdiff116.txt` / `vo-wdiff116-changes.txt` (the merged item 116 against `g116/item-116.md`,
word by word); `vo-routing-parts.txt` (routing.json unrolled).

**Verdict.** The owner's words themselves are quoted verbatim everywhere, and the three rules keep their substance: 114
at the first generation, over the whole map, as a ceiling; 115 at the initial generation with BOTH clauses and the magic
read on the slider; 116 with terrain, resources and trade, neighbourhood prosperity, traded stone for the very rich, a
mixed middle, every relevant piece, and the refinement's licence at every epoch. Twelve defects remain.
- Four change what the filed text says the owner said or decided: D1, the times; D2, the owner-rule stamp left over from
  the word-only reading; D3, the veto that is missing; D4, "a capped town has no very rich" stated too widely.
- Eight are about how choices are marked and how the plain summary reads (D5–D12).

No rule has to be reopened. Each fix is a change to the bundle's text.

---

## Defects

### D1 — The owner's message times disagree with the chat record; C12 moved three of them away from it (major)

*Evidence.* The transcript stamps each owner message when it was sent (`tmp/vo-chat-times.txt`; EDT = UTC − 4 h, which
the lane log confirms: its l.1842 cites "the owner's chat interrupt at 00:54:07", the transcript's 04:54:07Z). The
g114-115 final had 115 at "~00:54–00:56" and "bundle these" at "~00:56", which the chat confirms. The consistency
check's C12 replaced them with the program's time list. Three of that list's times come after the lane-log lines that
already record the same messages.

| owner message | bundle writes | chat (EDT, sent) | lane log | file as |
|---|---|---|---|---|
| "one thing i wanted to add, at generation time the first generation, …" (114) | ~00:50 | 00:48:09 | l.1841 (00:53): "being drafted" | **~00:48** |
| "and only high magic on the slider allows …" (115) | ~00:55 | 00:54:00 (interrupt 00:54:07) | l.1842 cites 00:54:07 | **~00:54** |
| "actually floating islands has to have both …" (115) | ~00:58 | 00:55:14 | l.1842, stamped **00:56**, already records it | **~00:55** |
| "bundle these into the rewrite phase" | ~01:00 | 00:55:41 | l.1842, stamped **00:56**, already records it | **~00:56** |
| "oh and material for buildings is determined by …" (116) | ~01:05 | 01:07:36 | l.1848 (01:09): "(~01:05)" | **~01:08** |
| "also to say that material not native requires trade …" (116) | ~01:10 | 01:09:36 | l.1849 (01:09) | ~01:10 (unchanged) |
| "bundle all this with g114-115" | ~01:12 | 01:10:10 | l.1850, stamped **01:10**, says "owner ~01:12" | **~01:10** |
| "note that we are reworking trade as we speak. …" | ~01:33 | 01:34:57 | l.1869 (01:35): "owner ~01:33" | **~01:35** |

*Required change.* Rewrite every owner time as the last column shows, in one pass that maps ~00:55 → ~00:54 *before*
~00:58 → ~00:55 so that no time is mapped twice:
- `items-114-116.md`: l.1 (~00:50); l.3–4 (~01:00, ~01:12); l.324–325; l.394–396 (~00:55 twice, ~00:58 twice, ~01:00,
  ~01:12); l.649–650; l.720 (~01:05 → ~01:08; ~01:10 stays); l.729 (~01:12); l.730 (~01:33); l.1521 (~01:12).
- `owner-instructions-entry.md`: l.1, l.8, l.16, l.19, l.37, l.42.
- `canon-ruling.md`: l.11–16.
- `j-rows.md`: J126, J127 and J128, every time in each row.
- `consistency-report.md` C12 (l.60): record the chat's send times as the source and the lane log as the cross-check.

Item 116's head should also give each quotation its own time, as items 114 and 115 do: `Owner (~01:08): "oh and material
…" / (~01:10) "also to say that …" / (~01:10) "bundle all this with g114-115" / (~01:35, …)`.

`g116/read-owner-decision.md` keeps its "~01:33" heading, because that file is not the bundle's to edit. The bundle
cites it by path only.

### D2 — Left over from the word-only reading: `gate.magic`, the word list, carries the owner-rule stamp, and 115 (b) says the owner fixed "the word high" (major)

*Evidence.* The owner said "only high magic **on the slider** allows for floating islands in the initial generation", then
"both high magic and high economy". The owner never named SettlementForge's word. `program-correction.md` adds the word
`high` as an alternative next to the slider. That addition is the program's.

`items-114-116.md` l.471–474 still reads: "`gate.magic` carries `ownerRule: '115 (b)'` — the owner's "high magic"; …
the owner fixed the two conjunctive clauses, the magic slider and the word high, not 75". That sentence is the final's
sentence with "the magic slider" inserted: the word-only final had l.429–431 "`gate.magic` carries `ownerRule: '115'` —
the owner's "high magic"; … the owner fixed the two conjunctive clauses and the word high". So the owner's stamp now
sits on the program's alternative (the list `['high']`), while the cell that carries the slider clause (`magicMin`) is
unstamped. This is the reverse of item 114 (b) 1's own principle ("the owner fixed that the economy slider sets the
prosperity ceiling, not these rows").

The same stamp appears in:
- item 115 (h) V11 (l.711–712);
- `canon-ruling.md` l.102 ("`gate.magic` stamped `ownerRule: '115 (b)'`") and l.103 ("the stamps `'115 (b)'` and
  `'116 (n)'`");
- `routing.json` l.453 (V11 part: "gate.magic ['high'] … stamped ownerRule '115 (b)'", and the Shared line "the two
  owner-rule stamps are '115 (b)' (gate.magic) and '116 (n)'") and l.456 (states);
- `routing.json` l.482, V12's part: "the register's entries (gate.magic owner rule '115 (b)'; …)" and "§1's owner-rule
  list gains the rule (islands need high magic — on the magic slider or SettlementForge's word — and a high economy)";
- `consistency-report.md` C14.

*Required change.*
- `items-114-116.md` l.471–474, from "`gate.magic` carries" through "lists the rule.", becomes: "All three cells carry
  provenance `own`, `calibratable: false` ("no corpus measures a slider") and no `ownerRule` stamp. The owner fixed the
  two conjunctive clauses — high magic on the magic slider, and a high economy — not the word list, not 75 and no row. So
  V12 §1 lists the rule, never the cells, as item 114 (b) 1 does for its rows. SettlementForge's word `high` beside the
  slider is the program's correction (vetoable)."
- `items-114-116.md` l.711–712: "(`gate.magic` stamped `ownerRule: '115 (b)'`, `magicMin` and `economyMin` own and not
  calibratable)" becomes "(`gate.magic`, `magicMin` and `economyMin` own, not calibratable, unstamped)".
- `canon-ruling.md` l.102: "`gate.magic` stamped `ownerRule: '115 (b)'`, `magicMin` and `economyMin` own" becomes
  "the three `gate` cells own and unstamped".
- `canon-ruling.md` l.103: "the stamps `'115 (b)'` and `'116 (n)'`" becomes "the stamp `'116 (n)'`".
- `routing.json` l.453 and l.456: the same change in both places. The Shared sentence reads "the one owner-rule stamp is
  '116 (n)' (materials.supply.enabled); 114's rows and 115's gate cells unstamped".
- `routing.json` l.482: "§1's owner-rule list gains the rule (floating islands at the first generation need both high
  magic on the magic slider and a high economy), never its cells or thresholds"; "the register's entries (the three gate
  cells own, not calibratable)".
- `consistency-report.md` C14 records the stamp as withdrawn. Item 116's `'116 (n)'` stays, because its default on is the
  owner's rule.

### D3 — The program's word alternative is missing from the veto list, and the plain summary offers the owner's own slider for veto (moderate)

*Evidence.* J127's vetoable column offers "read SettlementForge's word alone (the final's reading), pick other thresholds,
start standalone worlds with magic, or gate only the first generation". It does not offer "read the slider alone" (drop
SettlementForge's word), which is the natural veto of the correction's addition. `plain-summary.md` choice 13 reads
""High magic" = the magic slider at 75 or more, or SettlementForge's own word "high"; never in a world without magic. —
you can veto this". That wording lists the owner's own "on the slider" among the program's choices.

*Required change.*
- J127's vetoable column gains, first: "read the magic slider alone (drop SettlementForge's word `high` as an
  alternative)".
- `plain-summary.md` choice 13 becomes: "Besides your slider, SettlementForge's own word "high" also counts as high
  magic, and nothing rises by rule in a world without magic. — you can veto this".
- Choice 14 becomes: ""High" is 75 or more, on the magic slider and the economy slider alike. — you can veto this".

### D4 — "A capped town has no very rich" is stated more widely than the item's own numbers allow (moderate)

*Evidence.* On item 114's default table, `at = 2 + 3·e/50`. For 33⅓ < e < 50 the highest allowed band is still `rich`,
holding a share f ∈ (0, 1). `tmp/cap-stone.txt` shows e 40 → c rich, f 0.4, and river-borne rubble at the 30 km leg
reaching a TOWN's very rich from economy 45.3. So "no very rich" and "no river- or road-borne stone" hold only for a
town capped at `prosperous` or lower (e ≤ 33⅓). The item's own (f) sentence and routing's model part say exactly that.
The following wordings say more:
- item 116 (f) l.1007–1008: "a town capped below `rich` — economy below 50 on item 114's default table, with no rich
  band at all at 33⅓ and below —" (at 34–49 the town is not capped below `rich`);
- `canon-ruling.md` l.73: "a capped town builds no house or institution of river- or road-borne stone";
- `canon-ruling.md` l.231–232: "A capped town has no very rich: it builds no house or institution of river- or road-borne
  stone";
- `owner-instructions-entry.md` l.32–33: "a town item 114 caps below `rich` has no very rich, so no traded stone for its
  houses". This is also wrong on "no traded stone", since sea-borne stone within about 17 km still reaches a TOWN's
  richest.
- J126's reason column: "the very rich who alone pay for traded stone". Item (g) and choice 41 say a traded material
  reaches whoever can pay its landed price, so the very rich are not the only ones.

*Required change.*
- `items-114-116.md` l.1007–1008 becomes: "a capped town — economy below 50 on item 114's default table — keeps only the
  share f of its rich band, and at 33⅓ and below none. With that it has lost the purse that pays for a traded material,
  so …" (the rest unchanged).
- `canon-ruling.md` l.73 and l.231: "a town capped at `prosperous` or lower (economy 33⅓ or less on the default table)
  has no very rich: it builds no house or institution of river- or road-borne stone, sea-borne stone only from a near
  partner".
- `owner-instructions-entry.md` l.32–33: "a town item 114 caps at `prosperous` or lower has no very rich, so none of its
  houses is of river- or road-borne stone (sea-borne only from a near partner)".
- J126's reason column: "… visibly removes the rich — and with them, by item 116, the purse that pays for traded stone".

### D5 — The owner-instructions entry states the program's choices as the rule (moderate)

*Evidence.* The file records what the owner said. Its three rule bullets run the owner's rule and the program's reading
together, with nothing marking which is which:
- 114: "standalone, T1's wealth slider renamed "Economy"", "no ceiling at 50 and above", "`modest` at 0", "the dossier's
  own prosperity word always keeps its band", "after the first generation the founding ceiling carries and lived wealth
  may lift it".
- 115: "75 or more" twice; "the gate binds every rule-driven rising …".
- 116: every clause after "(J128):" (the ruins, the route prices, "the dearest its builder can pay", the supersession of
  item 19).

The earlier entries in `docs/OWNER-INSTRUCTIONS-2026-09-25.md` name the program's part where there is one (item 109: "and
the program's refinements (…)").

*Required change.*
- 114 bullet: after "read once at the first generation and recorded;" insert "by the program's reading (vetoable,
  J122):", and move "standalone, T1's wealth slider renamed "Economy"" out of the parenthesis to follow that marker.
- 115 bullet: after "the second message replacing the first:" write "at the first generation floating islands need both
  high magic on the magic slider and a high economy; by the program's reading (vetoable, J122; the magic by its
  correction of 2026-09-30): "high" is 75 or more on each slider, SettlementForge's own word `high` also counts, never in
  a world without magic (standalone, a new Magic slider with a "No magic in this world" switch, on by default), beside
  the islands setting and the CITY/METROPOLIS rung; the gate binds every rule-driven rising, …" (the rest unchanged).
- 116 bullet: after "(J128):" insert "the owner's rule as the program reads it (vetoable, J122):".

### D6 — The plain summary's rule paragraphs present the program's choices as "your rules", state one thing wrongly as absolute, and drop owner words (moderate)

*Evidence.*
- Rule 114: "At 50 or above nothing changes; below 50 the top tiers disappear step by step … After that first generation
  the cap stays" are choices 3 and 5, not the owner's words. "step by step" contradicts choice 3's "smooth between" and
  the item's continuous fold.
- Rule 115: the owner's "in the initial generation" is gone. The paragraph has no time at all, which reads as always —
  the program's extension, choice 18. "75" is choice 14. "Islands never appear in a world without magic" is wrong: item
  115 (d) 4 and (d) 2 keep an author's hand-placed island in a stand-alone world whose "No magic in this world" switch is
  on (held, `held_against_magic`), and only a dossier-stated `none` refuses one (choice 20).
- Rule 116: the title's "the ruins" is the program's (choice 31); the owner said "terrain, resoucres, and trade". The
  owner's own example, stone "from trade and … reserved for teh very rich", is absent. The owner's trade-partner decision
  (~01:35) is not named as the owner's. "A town with no partner never gets foreign materials" contradicts choice 31: a
  stoneless town beside old ruins builds in robbed stone with no partner (T116-24).

*Required change.* Replace the three paragraphs with:
- "**Rule 114 — the Economy caps how rich a town can be.** You said: when a map is first made, the economy slider sets
  the ceiling of prosperity for the entire map. My reading (choices 1–12, each vetoable): at 50 or above nothing changes;
  below 50 the top tiers shrink away smoothly, down to "modest" at 0; after that first generation the cap stays, though
  real later wealth can lift it."
- "**Rule 115 — floating islands need high magic and a high economy.** You said: at the first generation, floating
  islands need both high magic on the slider and a high economy. My reading (choices 13–25): "high" is 75 or more on
  each slider, SettlementForge's own word "high" also counts, and no island rises by itself in a world without magic;
  the same test applies to islands rising in later years. You can still place an island by hand, except in a world
  SettlementForge says has no magic."
- "**Rule 116 — buildings are made of what terrain, resources and trade provide, paired with neighbourhood
  prosperity.** You said: a town builds with what its land gives; a material it lacks comes only by trade with a
  settlement that has it, and an isolated settlement never gets one or grows into one; stone brought by trade is
  reserved for the very rich; where a town has both stone and timber, richer areas build mostly in stone and the middling
  mix the two, even within one house; and this reaches every relevant piece. Which partners count is your decision of
  01:35: every neighbour SettlementForge names, with what its exports, goods or resources show; a settlement with no
  named neighbour trades in no material; trade is read through one record that will follow SettlementForge's reworked
  trade. My reading (choices 26–47): a traded material costs more the further it travels (sea cheapest, roads dearest)
  and reaches whoever can pay its price; stone robbed from old ruins on the town's own land counts as its own; your own
  edits still win."

### D7 — Plain-summary choices that say something other than the items (moderate)

*Evidence and required change*, one choice at a time:
- **Choice 5**, "later real wealth may raise it but never below the start". This is garbled against item 114 (e): "a fall
  brings the position back toward the founding's row, never below it". It becomes: "After the first map the cap stays;
  later real wealth may raise it, and when wealth falls again the cap never drops below where it started."
- **Choice 10**, "so surprise towns look as before". This contradicts item 114 (a) 2: "so a surprise town's wealth is
  today's draw, and below 50 it now has a prosperity ceiling". It becomes: ""Surprise me" draws the Economy the way it
  used to draw wealth, so a surprise town's overall wealth is drawn as before; below 50 it now also gets the cap."
- **Choice 16**, "With magic switched on". The switch is "No magic in this world", and choice 15 says it is "switched on"
  when there is no magic, so this wording says the opposite of what it means. It becomes: "When the world has magic (the
  switch off), its magic reads "high" at 75 or more on the slider and "low" below it, so lights and magic buildings agree
  with the islands."
- **Choice 31**, "a local stone source". Item 116 (b) 3 makes ruins a local source of any family they credit (timber
  frame credits timber), and this is the one way a partnerless settlement builds in a family its land lacks. It becomes:
  "Old ruins within 1.5 km of a building are a local source of what they were built of; a fallen island's rock counts as
  stone. This is the one way a town with no partner builds in a material its land lacks."
- **Choice 38**, "a town walls itself in sea-borne stone, not river- or road-borne". Item 116 (f) says this of a TOWN
  only; "a CITY in river-borne stone on about a third of seeds, a METROPOLIS on most". It becomes: "… a town-sized place
  walls itself in sea-borne stone but never in river- or road-borne; a city does so in river-borne stone on about a
  third of maps, a metropolis on most."
- **Choice 42** drops the town wall and does not tell the owner that it bears on the owner's 2026-09-26 words ("different
  materials for construction is only represented by a change in texture or color. It has nothing to do with the shape").
  Item 116 (m) rules a structure's *kind* (masonry curtain or earth rampart; stone or timber bridge) a vetoable reading
  for exactly this reason. It becomes: "A structure's kind follows what the town can get: a stone wall or an earth
  rampart with a timber palisade, a stone or timber bridge; with no material for a bridge, pier or raised road you get a
  ford or none (reported). Buildings keep your rule that material is only texture and colour; for these structures I
  read the kind as construction, not material. — you can veto this".

### D8 — The plain summary leaves out the two consequences the items "state plainly" (moderate)

*Evidence.*
- Item 115 (c): "no dossier city generated without setting a slider — 152 of the 155 — has islands at its first
  generation … the consequence of the owner's condition at SettlementForge's present values".
- Item 116 (c), under "**The consequence, stated plainly:**": "most dossier maps are native-only at creation … A
  standalone map … is native-only until its author declares a partner, so the owner's first example … needs one declared
  partner".

The owner reads the summary, not the item.

*Required change.* Under "How they fit together", add:
- "With SettlementForge's present settings (both sliders at 50, as in 152 of its 155 test cities) no SettlementForge city
  gets islands at its first generation; the sliders must be raised to 75 or more, or its magic word must be "high"."
- "SettlementForge rarely names a neighbour with goods (in 1 of 155 test births), so most SettlementForge maps start
  native-only; a stand-alone map is native-only until you add a partner, so your stone-to-a-timber-town example needs
  one."

### D9 — Item 116 (c) labels the owner's adopted trade-partner decision as the program's, and does not call its one narrowing a narrowing (moderate)

*Evidence.* `read-owner-decision.md` records the decision the owner adopted:
- "every neighbour SettlementForge NAMES counts as a trade partner";
- "Standalone: the recipe's trade-partner list (partner, what it supplies, route), empty by default (native-only)".

Item 116 (c) handles this in three places:
- l.897, "**From a dossier** … every neighbour SettlementForge names counts", carries no attribution. It sits under the
  item's "Program's interpretation (vetoable)".
- l.907 heads the stand-alone list "**Standalone** (vetoable)".
- l.896, "a hostile partner, or one under a suppressed economy, licenses nothing (vetoable; …)", narrows the owner's
  "every neighbour SettlementForge names" without saying so. The owner-instructions entry's ~01:33 bullet repeats "every
  neighbour SettlementForge names counts" unqualified.

*Required change.*
- l.897: "**From a dossier** (the owner's decision of ~01:35, adopting the program's recommendation,
  `work/g116/read-owner-decision.md`; DR3 amended; V08 writes its rows) every neighbour SettlementForge names counts: …".
- l.896: "… licenses nothing — the program's one narrowing of the owner's "every neighbour SettlementForge names" (vetoable;
  SettlementForge itself makes no trade link with a hostile or suppressed neighbour, J121)".
- l.907: "**Standalone** (the owner's decision: the recipe's own partner list, native-only by default; its details below
  the program's, vetoable): …".
- `owner-instructions-entry.md` ~01:33 bullet: after "every neighbour SettlementForge names counts as a trade partner"
  add "(a hostile or suppressed one excepted, as SettlementForge itself trades with none — the program's narrowing,
  vetoable)".

### D10 — Item 116 (a) defines the owner's word "native" with the program's ruins basis, and quotes "isolated settlement" non-verbatim (minor)

*Evidence.*
- l.750: "whether it is **native** — the owner's word: its source is the settlement's own, by **land** (…) or by
  **ruins** (…)". The owner used "native". "Or by ruins" is the program's reading (J-A116.41, choice 31). It is the
  reading that touches the refinement most, because it lets a settlement with no partner build in a family its land
  lacks.
- l.753: 'The owner's "isolated settlement"'. The owner wrote "isoalted settlements". Every other quotation in the bundle
  keeps the owner's spelling ("teh", "resoucres", "forrest").

*Required change.*
- l.750: "whether it is **native** — the owner's word; what counts as the settlement's own is the program's reading
  (vetoable): by **land** (…) or by **ruins** (…)".
- l.753: "The owner's isolated settlements ("isoalted settlements") are, in the design, **native-only** settlements: …".

### D11 — Item 115 does not rule a dossier with a high slider but no `magicLevel` against the correction's "magic does not exist" (minor)

*Evidence.* `program-correction.md`: high magic holds when `priorityMagic` ≥ 75 or the word is `high`, "and NEVER when
magic does not exist in the world (`magicLevel` 'none' or `magicExists` false)". Item 115 (a) 1 fills an absent
`magicLevel` with the map's own magic, "`none` under D-3". So a dossier carrying `priorityMagic` 100 but no word fails
the magic clause. That is a world the correction does not call magic-less, whose slider alone then opens nothing. The
item never states this outcome as its reading, and neither (f) 10 nor T115-2 tests the case. SettlementForge's step 1
always resolves the word (item 115: CONFIRMED), so only a malformed or older dossier meets it.

*Required change.*
- Item 115 (a) 1, after "a map fact the author may change.", add: "So a dossier carrying `priorityMagic` but no
  `magicLevel` reads a world without magic until the author sets its magic, and its slider alone opens no island. This
  is the program's reading (vetoable; D-3). SettlementForge's step 1 always resolves the word, so only a malformed or
  older dossier meets it."
- Edge (f) 10 and T115-2 each gain: "a dossier at `priorityMagic` 100 and economy 90 without `magicLevel`: gated on the
  magic clause, source `map`, opened by `button.magicHigh`".

The alternative, for the program to choose instead: read an absent word as `low` where `magicExists` is not false, which
is SettlementForge's default. Either way, the case must be stated and tested.

### D12 — The form of some quotations (minor)

- `canon-ruling.md` l.23 quotes "only high magic ON THE SLIDER allows for floating islands in the initial generation".
  The capitals are not the owner's. Quote "and only high magic on the slider allows for floating islands in the initial
  generation." as sent, or mark the capitals "(emphasis the program's)".
- `canon-ruling.md` l.15: "He adopted" becomes "The owner adopted", the bundle's usage everywhere else.
- J128 elides the one sentence of the owner's first 116 message that carries its prosperity rule: "That is not to say
  that they can't have stone buildings, that would come from trade and be reserved for teh very rich as they are exotic
  and expensive to transport." J128 also starts the refinement at "material not native …" with no mark. Quote both
  messages whole, as J126 and J127 do (or keep that sentence and begin "also to say that material not native …").

---

## Checked and found sound (no change)

- **Verbatim.** Every owner message of 2026-09-30 that states or bundles a rule appears verbatim in `items-114-116.md` and
  `owner-instructions-entry.md`: 114; 115's two messages; "bundle these into the rewrite phase"; 116 and its
  refinement; "bundle all this with g114-115"; the trade decision. The only difference is the collapsed paragraph break
  in 116's first message. The J rows quote verbatim excerpts (see D12 for their marks), and the canon quotes the bundling
  and decision messages verbatim. The older owner quotations item 116 relies on are verbatim in
  `docs/OWNER-INSTRUCTIONS-2026-09-25.md` or `AMENDMENTS-2026-09-25b/27c.md`: "different materials for construction … to
  do with the shape" (2026-09-26); "what used to be old houses has been repurposed for building material"; "this
  neighborhood prosperities defines the bounds (floor, and ceiling) …"; "any amplifier specific to the institution …";
  "I still want it to be based in our base of MFCG and FTG emulation first"; "if a user wants to change something to fit
  their preference".
- **Item 114.** "The first generation": the priority is read once per creation and recorded, and (e) marks the carrying
  after it "the program's reading (vetoable)". "The entire map": every household, plot, district and building, the
  hinterland classes, the underground and undercity by their banding, islands by 115 (e), the village product and the
  stand-alone neighbourhood. "Ceiling": a bound on bands, never the values. The program's picks are marked in the item
  ((a) 2's label, (b) 1's unstamped rows, J-A114.* "each vetoable").
- **Item 115 and the correction.** The correction is applied in: (a) 1–2 (the magic priority read from
  `config.priorityMagic`; the Magic slider with its switch); (b) (the definition, 75 on both sliders marked the
  program's); (c) (clause 3, `SkyGate.failed[].magicPriority`, `dossierOwned.magicPriority`, the report words, the census
  sentence); (d) 1, 3, 5, 9; (f) 1, 10; (g) T115-1 – T115-10 and the fixture rule (priority 100); (h) (V08's adapter and
  `magic` row with `magicExists`, V09's control, V10's lexicon `magicPriority` 50 · 90, V11's `magicMin`, V12's
  `'<dossier>@magic<m>'` and `'@magicLevel<word>'`); D-3's sentence; the canon's correction paragraph; J127; the owner
  entry. A grep for None · Low · High, "default None", "stays unread" for `priorityMagic`, `@magic<word>`, "none is `high`"
  and "word alone" finds only historical mentions and T115-2's deliberate word-only case. The one leftover is D2's stamp.
  "Initial generation" and "both" are kept; the extension to later risings is marked the program's with its veto.
- **Item 116.** Terrain, resources and trade: (b) and (c). Neighbourhood prosperity: (f), with the owner's item-72
  bounds. The very rich are the `rich` band, marked vetoable; T116-6 ("at TOWN only the `rich` band"). Mixed middling:
  (g), (h), T116-4, T116-10. Every relevant piece: (i) and the (r) table. The refinement: (b) 4 ("no … growth, frame
  growth or access key makes a family native or traded"), (j), (l), T116-3, T116-25 and H-NATIVE. The trade decision is
  built as recorded: the named neighbour's exports and resources, import links and network links; a settlement with no
  named neighbour is native-only whatever its access; the route comes from the access pair; one `TradePartner` record
  filled by DR3 as the adapter for SettlementForge's rework (J121); the stand-alone list is empty by default. D9
  concerns attribution only.
- **The merge of item 116.** It differs from `g116/item-116.md` only by the consistency report's edits (C2–C6, C8–C11,
  C13, C15–C18, C21; `tmp/vo-wdiff116-changes.txt`). No owner quotation or owner-attributed sentence changed.

---

## Required changes — the list

1. **D1** Re-time every owner message by the chat's send times: 114 ~00:48; 115 ~00:54, replaced ~00:55; "bundle these"
   ~00:56; 116 ~01:08; refined ~01:10; "bundle all this" ~01:10; trade decision ~01:35. Apply this in the items (l.1,
   3–4, 324–325, 394–396, 649–650, 720, 729–730, 1521), the owner entry (l.1, 8, 16, 19, 37, 42), the canon ruling
   (l.11–16), J126–J128 and C12. Give each of item 116's quotations its own time.
2. **D2** Withdraw the `ownerRule: '115 (b)'` stamp from `gate.magic`, and rewrite 115 (b) l.471–474 so the owner fixed
   "high magic on the magic slider, and a high economy", not the word list, 75 or any row. Follow through in 115 (h) V11,
   canon l.102–103, routing.json l.453, 456 and 482 (V12's §1 entry without "or SettlementForge's word"), and C14.
3. **D3** Add "read the magic slider alone" to J127's veto list; reword plain-summary choices 13 and 14 so the owner's
   slider is not offered for veto.
4. **D4** Restrict "no very rich / no river- or road-borne stone" to a town capped at `prosperous` or lower (economy
   ≤ 33⅓): item 116 (f) l.1007–1008, canon l.73 and l.231, owner entry l.32–33 (also not "no traded stone"), and J126's
   "who alone pay".
5. **D5** Mark the program's reading in the owner entry's 114, 115 and 116 bullets ("by the program's reading (vetoable,
   J122)").
6. **D6** Rewrite plain-summary's three rule paragraphs: the owner's words first, then "My reading (choices …)". Fix
   "step by step", restore "at the first generation", correct "Islands never appear …", and name the ruins as the
   program's, the owner's very-rich example and the owner's 01:35 decision.
7. **D7** Correct plain-summary choices 5, 10, 16, 31, 38 and 42 as written above (42 names its bearing on the owner's
   texture-and-colour words).
8. **D8** Add to plain-summary the two plainly stated consequences: no SettlementForge city gets islands at present
   settings; most dossier maps start native-only, and a stand-alone map needs a declared partner.
9. **D9** Attribute item 116 (c)'s dossier and stand-alone partner rules to the owner's decision of ~01:35; call the
   hostile or suppressed exclusion the program's narrowing of it; say the same in the owner entry's ~01:33 bullet.
10. **D10** Item 116 (a): mark "or by ruins" as the program's reading of "native", and quote "isoalted settlements"
    verbatim.
11. **D11** Item 115: state, as the program's reading, what a dossier with a high slider but no `magicLevel` gets, and add
    that case to edge (f) 10 and T115-2. Alternatively read the absent word as `low`.
12. **D12** Canon l.23 quotes the owner's lower case (or marks the emphasis); canon l.15 "The owner adopted"; J128
    quotes the 116 messages whole (or keeps the very-rich sentence and the refinement's first words).
