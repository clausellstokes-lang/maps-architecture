# Design volume 11 — The content system: every rule and content table, its schema, its rows and its authoring plan

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat volumes/V11-content; covered by the whole-design retrovalidation (J84).

**How to read this volume.** It builds, to implementation depth, the content system the base (`docs/ARCHITECTURE.md`,
with files f and g applied: `docs/AMENDMENTS-2026-09-28f.md`, `docs/AMENDMENTS-2026-09-28g.md`) carries at hook depth in
§7.6 (the editable tables) and §10.2 (the roster): the registry of every table, the compiler and loader, and the rows
that are design decisions. The implementer holds the base and this volume and nothing else (§17.1). Every fact the base
or another volume states is cited, never restated; every new fact is stated once, here. **Citations:** a bare `§n` or
`II.n` is the base's; `Vnn §n` is a design volume's section, this one included (`V11 §3.5`); `item n` is an amendment
item — items 1–113 the owner's (102–113 file g's), items 200 and above file f's, each the applied text of a volume's
base change request (V11 §10 lists this volume's, BCR-V11-n → its item); `J-VI.n` is a volumes-integration decision
(`docs/volumes/_integrate.md`), cited and never restated; `DRn` is a §7.7 derivation row. Decisions are `J-V11.n` (V11
§9), tests `T-V11-n` (V11 §7), wiring rows `W1`… (V11 §1b), requests to sibling volumes `X-V11-n` (V11 §10b); a bare
`Wn` or `Xn` is this volume's row, another volume's is written with its volume (`V06 W75`). A cell whose value is set
but awaits calibration is **provisional**: its calibration method and due are its V12 §3.11 register line's, never
restated here.

## 0 In plain words

Every decision the generator makes that is not geometry — which buildings a town of 6 000 people needs, how big a
rich smith's house is compared with a poor one, which trades like to sit together and which keep apart, what a
neighbourhood is called, what a thieves' guild hides behind, what the walls are made of — is read from a **table**.
This volume is the book of those tables. It lists every table the program has, says what each column means and in
what unit, who reads it, where its rows come from, and writes out in full the rows that are real design choices: the
ladder of building kinds from shack to cathedral, the kinds of district, the named quarters, the translation of every
one of SettlementForge's 280 institution kinds onto our buildings, the fronts a hidden institution may use, the
economy's sectors, and the owner's siting rulebook of 2026-09-28 — how each kind of building pulls toward or pushes
away from the others.

How it feels to use: nothing changes on the one-click map — the tables are simply what the map is made from. A
designer who opens the tables editor sees plain rows ("tannery: gives off smell and fouls water; needs running water;
downstream of houses; sells to cobblers and saddlers"), each cell saying where its value came from (a reference we
emulate, our own judgment, the owner, the historical corpus). Changing a cell changes exactly the parts of the map that
read it, as an undoable edit. When the map puts the tannery by the river below the town, the clerk can say why, by
naming the rows that pulled it there.

The rulebook is **factored**, not a giant list of pairs: each building kind carries a short profile — what it gives
off (smell, smoke, noise, fire risk, fouled water, heavy traffic, crowds, disorder, sacredness), what it cannot bear,
what it needs (running water, a road, a gate, the harbour, the market, space, safety, secrecy), who its customers are
(the street, the whole town, travellers, the rich, the underworld), what it buys and sells, which side of the law and
of the sacred it stands on, whether it clusters with its own kind or spreads out so every district has one — and a
dozen general rules turn those profiles into gentle pulls and pushes. A few dozen named pairs add what the profiles
cannot say ("dyers upstream of tanners"). Nothing in the rulebook is a hard law except true physical needs (a
watermill on water); everything else is a weighted tendency, so towns differ and the pattern shows only on average —
the owner's "a correlating general rule".

SettlementForge's custom content fits the same book: a custom institution nobody wrote a rule for still lands
sensibly, because its scene archetype, category, tags and even the words of its name map onto profiles here, and its
supply chain is placed as one connected thing — raw material at the river or the quarry, processors stepping inward,
the seller by the market.

Under the ground the book holds the numbers the owner's underground rules (item 109) need: how likely the ruins of an
older civilisation lie under a site (certain where the dossier names ancient ruins or a ruined landmark, possible
anywhere once the fantasy setting is on), the four kinds of ancient street plan such ruins follow, which parts of a ruin
last longest, how likely a cellar, a well or a mine breaks into a cave or a ruin, and how deep a void must lie to stay a
secret even under a great city. It also holds the burial rule the owner settled (item 109 (k), J111: "cathedral also
gets crypts but cemetaries get catacombs"): churches get crypts — the cathedral always, and the largest — while
catacombs lie only under cemeteries (and, in a city or a metropolis, under a worked-out quarry turned ossuary). A town
has at most one catacomb and a city more by its number of churches; each grows by about a tenth a decade at most and never
shrinks.

It holds the numbers for the owner's four building rules of item 110: how steep a slope must be, and how tall a step,
before a town builds a terrace wall, and what that wall is made of by the wealth of the ground it holds; how likely a
city or a metropolis is to carry a road on arches over a ravine, raise a road between its high quarters, or bring water
in on an aqueduct when its wells fall short — never a town, which gets one only when the user draws it; which cultures
build temples, palaces and towers in stepped tiers, and how rarely; how many small buildings a bridge, a pier, a mole
or a quay may carry and which trades may stand on them (never a forge, never a cathedral); and which fort, lighthouse or
watchtower may stand at a mole's head.

It holds what dry country needs (item 111): how likely a desert site finds an oasis — a spring-fed pond with its palm
grove and irrigated gardens — beside the rivers, lakes and coasts it still may have; how strongly the town crowds toward
its water, how much the rich prize the ground nearest it, how close together the wells stand on the best ground; and,
in hot dry country, whether the rich seek the sun or the shade. And it holds what a remembered past needs (item 113):
how long each step of the history replay is, which recorded events do what to the town (a great fire burns a quarter, a
plague empties the edges, an occupation leaves a citadel, a catastrophe destroys it outright), how long ruins stand
before they are buried, how far an unrecorded peak is sized inside its tier, and how strongly a refounded town follows
its old roads.

Every one of these is a row the user can change, and with every one switched off the map is exactly what it was
without them.

What the volume does NOT hold: the vocabularies of names (it designs the grammars and how their word lists are written,
never the lists), the colours of the palette (§8.2's), and the rows other volumes own and state (cited, never copied).

