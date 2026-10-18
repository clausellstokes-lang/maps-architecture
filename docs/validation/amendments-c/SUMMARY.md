# Reading the references' code, your rules 63–72, the dossier link and the authoring tools — the closing summary

> PENDING FABLE REVIEW — written by opus standing in for the Fable seat amendments-c/closing; queued in docs/FABLE-REVIEW-QUEUE.md.

*For the owner, 2026-09-28. The design is `docs/ARCHITECTURE.md`, and the reasons behind each choice are in `docs/ARCHITECTURE-RATIONALE.md`. The technical record of this closing step is `closing-report.md` in this folder, and the exact wording of the last repairs is in `closing-handfix-rows.py` beside it.*

## Where things stand

This pass folded three sets of changes into the design at once, as you asked ("just bundle all of c, d, and e together now"):
* **What we learned by reading the reference generators' programs** (items 32–62). This followed your instruction of 27 September: "to read them and to understand their logic, that is another thing entirely."
* **Your ten new rules of 27 September** (items 63–72), and your rule that the dossier is the only fixed truth (item 20 (h)).
* **The link to SettlementForge's dossier** (items 73–88) and **the authoring toolkit** (item 101).

Every item is now in the design as working parts rather than as a promise. Each one says what data it records, which step makes it, what happens when it fails, and which test proves it.

The work went through one assembly and three repair rounds, 312 edits in all, applied by script. After each round the checkers found fewer problems: 159, then 75, then 29, then 26. I re-checked the last validator's 29 problems against the document itself, and all 29 are fixed.

The last check found 26 smaller problems. They come to 19 once duplicates are merged. They are listed word for word for a hand fix, which is the next step, and I have already tried the whole list on a copy of the design: it applies cleanly and passes the document's own checks. One of the 19 matters more than the others (see "What remains"). None of them needs a decision from you.

## What reading the references' code changed (items 32–62)

Across these 30 items the rulings were: 13 ideas adopted and re-expressed in our own terms, 18 places where we kept our own design, and 15 defaults re-based on measured facts. Some items carry two rulings. Nothing in the design's overall structure changed shape. Every change is a rule inside an existing step, a table row, a test or a corrected citation.

**How we used the code (32, 62).** The design now says plainly that the current generators' programs were read to understand them and never copied. Anything we learned that way is marked as coming from a code reading, and its source is kept in our research notes, not in the design. No piece of their code, no class or function name, and none of their word lists, name grammars or colour tables entered the design.

**How lanes divide a block (33–41), the largest correction.** When Neighbourhood cuts a block into lots, it runs a lane through the block and bends it. The design had guessed at that recipe; the code showed it exactly. So we adopted:
* a stop test with a fresh random threshold for each piece;
* the cut placed near the piece's centre with a bell-shaped spread;
* a start side that follows from the shape itself rather than from chance;
* the bend taken from the nearest corner;
* the rounded corners where lanes meet;
* a retry that turns the cut rather than giving up;
* lane widths that follow a simple size law.

We kept our own versions of three things: how big a piece must be before it stops, the slope term, and our longer ladder of fall-backs. The recordings of Neighbourhood's own output are now the test our cut must pass.

**Plots and street fronts (42–44).** The design had said Neighbourhood "throws away" 42 % of its lot pieces. The code shows they are courtyards, made on purpose, so the design now treats them as courts. The slight unevenness of a street front follows the reference's pattern, but with our own construction and our own minimum step of 0.3 m, because a smaller step would be smoothed away. The walled manor compound is ours: Neighbourhood has no such walls, and the design now says so.

**Walls, gates, castle, districts (45–47).** The castle's outline is now repaired towards a regular shape, first swollen and then evened out, as the reference does. The number of gates on a coast and the three smoothing passes of the wall's line follow the reference's measured values, while our own gate law stands. Districts grow at the reference's rates, and our barriers and district counts are kept.

**Figures we had wrong about the references (48–52).**
* The population figure MFCG shows is now described correctly.
* What we had read as FTG's "lots" turned out to be patches of lawn, so every calibration that leaned on them has been withdrawn. The one figure that does come from FTG's real data, "49 % of buildings in no ring", stays, with its true source.
* FTG's "entrance" is really the anchor for its night lights. Your rule that every building has a street-facing door stands.
* The references' retry and random-number behaviour is now cited correctly.
* A new test was added: the same seed must give the same map whether you reach it within a session or load it fresh. The references do not pass this; ours must.

**Drawing and labels (53–57).** Tree scatter, the raised look under text, area labels (which now prefer a horizontal line), the naming comparison and the field pattern around a town were each re-based on what the code does, or corrected, where they had been guessed.

**Stages that come later (58–61).** For the neighbourhood close-ups, the manor-class buildings, the floor plans and the village, the reading gave calibration notes and hook text only. Their engines still come later, as your roadmap orders.

## Your new rules (items 63–72) and the dossier's authority (20 (h))

**63. Hidden institutions.** You said: "A front which can be anything and a second function … Think of an assasin guild in a city. It would obviosuly not parade itself as an assasin guild." An institution can be concealed in one of three ways:
* behind a front, such as a tavern or a funeral parlour;
* in a hidden plot;
* underground, in a dwelling off the sewers.

If its first choice is impossible, it falls back to the next, and it is never placed openly and never dropped. The map shows only the front to someone who does not know the secret. The dossier can mark an institution as clandestine, and its word stands.

**64. Cellar ways down.** You said: "some buildings that have basements have accesses to the sewer grid … higher chances if they are criminal." A cellar can gain a stair, hatch or bricked-up door to a sewer tunnel. The chance depends on the kind of building, on how prosperous the area is, on the building's age and on whether it hides something. A cellar never becomes part of a tunnel.

**65. The underground as a family of systems, and the undercity.** You said the sewer is "the central piece", with catacombs, caverns and an undercity "with varying degrees of connections and access between them (not always)". Below towns and cities the underground can now hold catacombs under old churchyards, caves in soluble or volcanic rock, old quarries sized by the stone the town was built from, vaults and cisterns, and a buried old town under a raised street level. They meet the sewers only sometimes, by chance.

The undercity follows your words "at most 1-3 neighborhoods". It has a real hall to live in, its own square and black market, its own institutions, and ways up for food, water and air. It shadows the quarter above it and is peopled by the town's own poorest and outlawed, as your "not independent of it" asked. It is staged, with its hooks in place now.

**66. A way down builds everything it needs.** You said: "if a user edits a building to have an access to the underground, it generates all the necessary pieces." One edit adds the cellar if the ground allows it, the passage, a private tunnel system if there is none, the access and its links, as one step with one undo. The last repairs extend the same rule to an undercity neighbourhood that an edit leaves without a way up.

**67. Buildings shown mid-change, week by week.** You said: "if it takes two weeks or a month to build a full house, then during that time, we should show stages of it being built." Building, extending, demolishing and repairing each have stages drawn at the week you are looking at: foundations, walls, a roof going on, scaffolding, a shell falling in. The same holds for plots that are merging or splitting. Nothing is in mid-change on a freshly made map, or in the MFCG and FTG settings.

**68. Day and night light.** You said: "a daytime view is the default. the global light is the cursor. every shadow moves." By day the pointer is the sun, and every shadow falls by the real heights. A tall tower shades a low house, and a low house never shades a taller roof. Shadows are soft gradients, never one flat shade, and a spot lit from every side casts none.

By night the moon is a softer sun, and torches and lanterns are spaced along the streets, more along rich streets than poor alleys. Magical lights appear only where magic is switched on. The underground has no sun, so the undercity is the most thickly lit part of it, and there is a hand lantern you can switch on.

**69. The collection's colours.** You said: "Adopt the corpus measured color targets." The default ink map now uses the warmer paper and brown-black ink measured on your own map collection. Only those colour bands left the walled-off collection. Everything else in it stays walled off until the reconciliation stage.

**70. Shacks and tents on one lot.** You said: "some neighborhoods simply have a lot of … shacks on one block no single individual owns it … each one deserving of a door." The poorest ground can hold clusters of shacks, tents and lean-tos along a web of footpaths. Each has its own door on a path, with more households per shack in bigger towns and poorer bands. FTG's own trigger and timing are the default.

**71. A mix of classes inside a band.** You said: "a prosperous neighborhood if it's not at the upper extreme may have a mix … Of course, a very prosperous location may simply have all manors." Each neighbourhood mixes a few classes of house, with more large houses towards its richer end, so that at the very top it may be all manors.

**72. What defines a neighbourhood and names it.** You said: "neighborhoods are going to be more or less defined by the mix of assigned lots within them … This assignment also helps to assign names to neighborhoods." Each neighbourhood now earns a character from what stands in it, weighed by importance, so a few churches outweigh many lodging houses. That character gives it an identity and a name. The dossier's own kinds and names always win.

A neighbourhood's prosperity sets the floor and the ceiling of every building in it. A thriving institution's surplus builds up as "pressure" that lifts its neighbourhood over the years, until the neighbourhood itself moves up.

**20 (h). The dossier is the only fixed truth.** You said: "whatever the dossier doesn't provide, the rest of the map code must compensate. it is one directional." Every fact on the map is marked as either the dossier's, which is fixed on the map, or the map's own, which can be remade freely. Everything the dossier does not say is worked out by 25 written rules rather than invented. The map never asks SettlementForge for anything, and it refuses any edit that would change a dossier fact.

## The dossier link (items 73–88) and your rulings on it

A separate adapter, called "the port", reads SettlementForge's dossier and hands the map only what it needs, so no other part of the program ever learns SettlementForge's field names. Your rulings are in place:
* **Q1.** The port is built first against SettlementForge's integration line of 23 September.
* **Q2.** Nothing sends map geometry back to SettlementForge's simulator.
* **Q3.** A dossier for fewer than 1 500 people is refused with a message naming the later village product.
* **Q4.** A resettled site is one map.
* **Q5.** The "Eastern district (traditional)" wording is only a soft placeholder.
* **Q6.** SettlementForge's own district names are never matched against ours.

The port's making half is built and tested at the first milestone. Its half that takes in dossier changes comes at M3a. Wiring it into SettlementForge itself waits for the SettlementForge stage, as the plan ordered. Along the way the design gained:
* a clear key for tying each dossier element to the map;
* a dated change envelope and a weekly clock;
* typed trade, economy and power inputs;
* a status for listed-but-ruined buildings;
* naming claims;
* a set of frozen sample dossiers to test against;
* the rule that SettlementForge undoing something is simply one more change.

## The authoring toolkit (item 101)

You said: "come up with an elegant set of tools for both an ai clerk and a user where a dedicated user can build it or emulate it." Authoring is now declare, then derive: you state what must be true, and the generator works out the rest by the same rules. The same twelve tools, arranged in five layers from rough to exact, work in three places: on the canvas, for an AI clerk, and in a hand-written skeleton file. A skeleton exported and loaded again gives the same city.

The clerk is opt-in and labelled as AI. It only makes declarations, and it sees only what its viewer is allowed to know. Your later refinement also holds: "points in, shape out, handles always". You place a few points, the shape is worked out, and handles stay for adjusting it.

The tools follow nineteen plain rules for a casual audience, taken from a survey of similar tools, and a "first five minutes" test at two milestones. The built-in clerk and a few bridge-deck plots are staged for later.

## Choices put to you (defaults you may veto)

These are written into the design as defaults and flagged for you. None of them blocks anything.
* **Shadows on the default map** (J-A68.81). As designed, the default ink map shows the moving shadows too, gently and in shades of its own ink, and only the MFCG-imitating setting draws none. This follows your words "a daytime view is the default … every shadow moves". The alternative is to keep MFCG's plain raised look on the default map, with shadows one switch away.
* **How much colour in the default ink** (J-A69.82). It has more colour than before, but less than the middle of your collection. Say if it should take the middle.
* **The neighbourhood "pressure"** (J-A72.47). This is the program's reading of your words "until the neighborhood itself upgrades". Please confirm it or correct it.

A few other calls are recorded for veto in the rationale file. For example: the street-front minimum of 0.3 m instead of the 0.25 m the reading suggested (J-A43.42); the MFCG setting's lane-flattening length of 8 m, taken from a critic's measured figure (J-A37.42); and a realistic default for the undercity, a modest warren, with the full "microcosm" on the fantasy setting (J-A65.43).

## Held back until Fable re-checks the code readings

Six small supporting claims rest on a reader's inference rather than on facts read directly, so they were not put into the design. Each waits for Fable to re-check the reading. The design works without them, because what they would support is either proven another way or stated as our own choice.
* **Item 52:** that the references' maps visibly differ when reached within a session.
* **Item 35:** a check on 160 of 162 cut positions.
* **Item 60:** that Neighbourhood hands over floor plans up to 16 cells wide.
* **Item 68 (g):** that MFCG draws no cast shadows. The design states only our own MFCG setting's behaviour.
* **Item 68:** two references' shadow and night-light layers.
* **Item 50:** a remark about MFCG having no door concept. The design keeps it only as a labelled inference.

## Sizes, before this pass and now

| | before (27 September) | now |
|---|---|---|
| the design document | 13 026 lines, 1.65 MB, 145 sections | 17 305 lines, 2.30 MB, 147 sections |
| the rationale file | 2 053 lines, 0.46 MB | 2 316 lines, 0.67 MB |
| recorded choices ("chose X over Y because Z") | 472 | 735 (263 from this pass), 736 after the hand fix |
| estimated build effort | about 166–220 expert person-weeks | about 185.5–248.5 (the staged engines are still not priced, by your roadmap) |

Four assembly rounds applied 312 edits (132, 89, 55 and 36) by script, and none was skipped. Every version from before each round is kept in `docs/archive/`.

## What remains, and why

Nineteen repairs are listed word for word for the hand fix. As in the last pass, each repair round fixed what it was given, and its new wording opened a few smaller edges; the count kept falling. Under your rule to fix every finding now, nothing is deferred.

**The one that matters: door lanterns.** A lantern beside an inn's door stands exactly on the building's outline. The map measures positions to the nearest centimetre, and that rounding puts the lantern just inside or just outside the wall about half the time. The design's end-of-step check would then have rejected about half the door lanterns on every lit map. The fix accepts a lantern within that rounding of the wall. It also keeps the lantern with its wall when a street is bent or moved, and fixes how far from the door it stands (60 cm by default, adjustable).

**The other 18 are small:**
* naming exactly which edits count when an undercity neighbourhood is left without a way up, and testing it;
* keeping far shadows identical as you scroll, so a distant building never throws a longer shadow before it comes near;
* making sure a floating island's shadow reaches the ground below it;
* stating how much memory a lit print needs at very fine scales, instead of a fixed limit that fine prints would break;
* testing the hand lantern at the milestone where the underground exists;
* making a shack's depth a range, as its size already is;
* a few pointers, repeated sentences and recorded reasons.

## What comes next

1. **The hand fix** applies the 19 repairs, 59 exact changes that a script can apply, then re-checks the parts they touch and runs the document's own checks.
2. **Fable's review of the finished base.** You asked for this on 28 September: "Before you do the volumes. Do one fable validation/review on the completed base." Everything in this pass was done by stand-in seats and is queued in `docs/FABLE-REVIEW-QUEUE.md`. This includes the six held claims above and the closing choices in `closing-report.md` §3.
3. **Then, in your order:** the twelve design volumes, the coherence and wiring pass across everything, and a final Fable review of the whole set.
