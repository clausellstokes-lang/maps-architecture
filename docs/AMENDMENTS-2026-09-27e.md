# Amendments e — owner items after the dossier survey's file d (2026-09-27 evening)

Numbering starts at **101** so it can never collide with `docs/AMENDMENTS-2026-09-27d.md` (the survey's plan seat numbers
its candidate amendments from 73). Applied by an amendments pass after pass c (`workflows/12-amendments-c.js` with
`args.amendmentsFile` = this file, `items` = "101") — before the design is frozen for the build, because the edit build's
spec depends on it. Legend as in file c: the owner's words are the authority; the consequences are the program's
vetoable interpretation.

---

101. **OWNER RULE — The authoring toolkit: one vocabulary of declarations for the user and the AI clerk, so a dedicated
     user can build or emulate a known city (owner, 2026-09-27 ~18:30).** Owner, after the Baldur's Gate experiment
     (`docs/experiments/known-city-authoring.md`, J78): "But what I want you to do is come up with an elegant set of tools
     for both an ai clerk and a user where a dedicated user can build it or emulate it."

     **(a) THE PRINCIPLE — declare, then derive.** Authoring is a set of DECLARATIONS: each says what must be true of the
     city; the generator derives everything undeclared by the design's rules (item 20 (h) applied to human input — an
     author's declarations are immutable facts on the map exactly as dossier facts are, until the author changes them).
     Every declaration is one of §7.1's edit events (or sugar over one), so it has one dry run, one disruption-and-fates
     report, one commit and one undo; nothing changes silently, and a refused declaration returns the reason and the
     closest acceptable alternatives (item 20 (g)). EMULATING a city is declaring its intent, bones and programme and
     letting the rules fill the fabric; BUILDING it is also declaring the fabric where fidelity matters. Same tools,
     different depth.

     **(b) THREE SURFACES, ONE VOCABULARY.** The same declarations are made (1) by a person with the canvas tools, (2) by
     the AI clerk through a typed tool API (the edit events plus the reader's queries and the oracle, over §11.2's
     embedding API), and (3) as a SKELETON FILE — the ordered declarations as a document, imported as the log's creation
     prefix (§2.9, §7.7) and exported from any map as its declared subset. Bar: a call from any surface produces the same
     event; a skeleton exported and re-imported with the same seed reproduces the city byte for byte; the clerk's
     transcript of tool calls is itself a valid skeleton.

     **(c) THE TWELVE TOOLS, in five layers of commitment** (the author may stop at any layer; everything below it is
     derived). L0 INTENT — T1 `intend`: site, size band, form from the forms catalogue (§7.7: `hill-acropolis`,
     `bridge-town`, `port-quay-parallel`, `radial`, `linear-street`, `confluence`, `twin-town`, `polycentric`, … plus a new
     `citadel-and-port` row: a walled upper town on high ground over a walled lower port), era and style, prosperity,
     walls policy (none, one, two enceintes). L1 GROUND AND BONES — T2 `ground`: terrain strokes (raise, lower, cliff,
     flatten), coast, river course knots, a harbour basin (`setField` terrain, `warp`, `drawWater`, `moveCourseKnot`);
     T3 `wall`: an enceinte (closed or open, kind) with GATES declared as points on it — sugar `placeGate` over a short
     through-way stub — or arising where a declared road crosses (`drawWall`); T4 `road`: a way of a class — through,
     primary, secondary, lane, alley, track, path, quay, pier, bridge, ford — a road drawn across water is a bridge deck
     (`drawWay`); T5 `quarter`: a boundary with a KIND from the district-kind table (market, temples, manors, harbour,
     craft, enclave, graveyard, garrison, slums, university, …), a name and a band — item 72's character vector reads a
     declared kind as it reads a dossier kind (`drawBoundary` + a whole-neighbourhood `assign` + a rename + a prosperity
     stroke). L2 PROGRAMME — T6 `place`: a named place with a class, a name and a placement that is exact (a plot or a
     point), a LOCUS ("in <quarter>", "on the harbour", "at <gate>", "north side of <square>", "near <place>", with item
     16's relation templates as hints) or free (the solver) — `placeAt`, `assign`, `build`, `drawFootprint`; T7
     `roster`: a pasted or dictated list of places (name: class, locus), sited together by the solver in one dry run —
     an `assign` with many members; when a dossier is connected the roster IS the dossier's (item 20) and the author may
     only place; a user's roster is the dossier stand-in. L3 FABRIC — T8 `fill`: density, arrangement and class mix for
     a quarter or a block; greenery; a square or a park (`fill`, `setField`, `drawGreen`); T9 `shape`: plots and buildings
     one by one — split, join, draw or move a footprint, heights, entrances, roof paint (`split`, `join`,
     `drawFootprint`, `moveFootprint`, `setAttr`, `setEntrance`, `paint`); T10 `hold`: lock, pin, revert, regenerate
     with keep on a scope — protect the declared, re-roll the derived (`lock`, `pin`, `revert`, `regenerate`). L4 FINISH
     — T11 `name`: rename anything; REGION labels as named groups on the quarter tree (Upper, Lower, Outer City);
     label placement; a leader-line switch for every landmark label at the city band (`renames`, `moveLabel`,
     `hideLabel`; §9.1 quarter groups, §9.4 leaders — a style switch, new); T12 `dress`: style family and preset, a
     thematic tint by quarter, furniture (compass, scale bar, cartouche or emblem, border — §9.5), an UNDERLAY image for
     tracing (opacity; never exported; never read by the model — new), export (§11).

     **(d) THE CLERK.** An assistant that (1) READS the map through the reader's queries and explains any element by the
     oracle ("why is the smithy here": the rule, the inputs, the alternatives); (2) AUTHORS with T1–T12 from natural
     language — a description of a city becomes a skeleton draft (T1–T5), shown as a dry run with its picture and
     applied on confirmation; a pasted roster becomes T7 with loci chosen by class rules and every unhonoured line
     reported with its closest options; (3) CRITIQUES a skeleton against the rules before it is applied (a main road
     with no gate through the wall, a temple quarter with no temple, a harbour with no quay, a quarter with no road
     access); (4) ITERATES on instructions ("the Lower City should feel denser", "move the temples nearer the
     citadel") as further declarations. The clerk never bypasses the dry run or the undo, never invents a dossier fact,
     and reads only what its viewer may know (item 63 (c)'s knowledge rules). The TOOL API is the must-have (so the
     host's own clerk — SettlementForge's — drives the module); a minimal built-in clerk over the same API is a
     should-have for standalone use.

     **(e) ELEGANCE BARS (§13).** At most twelve tools; a new capability adds a parameter to a tool, never a tool; each
     tool is one declaration kind with one dry run and one undo; the three surfaces produce identical events; export →
     import reproduces the city; the clerk's transcript replays; no declaration contradicts a dossier fact or a lock
     without a refusal and alternatives; the acceptance fixture of J78 (an original skeleton with the Baldur's Gate
     map's structure) is authored (i) as a skeleton file, (ii) by hand, (iii) by the clerk from a description and a
     roster — and the three agree.

     **HOMES:** §7.1 (the sugar events `placeGate`, `quarter`, `roster`, `group` for region labels; every other tool
     maps to existing events), §7.7 (the skeleton file as the creation prefix; the `citadel-and-port` form), §9.1/§9.4
     (region label groups, the leader-line switch), §9.5 (the underlay layer), §11.2 (the clerk tool API: events, reader
     queries, the oracle), §14 (the surfaces and the clerk interface), §13 (the bars), §16 (M2a: T9–T10 and the dry-run
     report; M3a: T2–T8, the skeleton file, the underlay, the clerk API; M3b: T11's switch, T12's furniture and export;
     the built-in clerk after the API). *Scope:* BASE for the vocabulary, the file and the API; STAGED for the built-in
     clerk and for plots on a bridge deck (J78 (c)). *Evidence:* the owner's words; §7.1's event list (read 2026-09-27);
     the experiment's inventory in `docs/experiments/known-city-authoring.md` §2.

     **(f) UX RULES FOR A CASUAL AUDIENCE (owner, 2026-09-27 ~18:45: "look up similar tools online (keep in mind a casual
     audience with minimal technical background) to better determine how the edit tools should function as user
     experience").** Sources fetched 2026-09-27 by the Fable manager (the breadth survey `research/ux/tool-survey.md`,
     an Opus lane, adds the rest and may amend these); each rule names its evidence; SOURCED = read on the page named,
     INFERRED = the program's reading. The pattern the evidence supports is the one item 101 already rests on —
     declare, then derive — provided the deriving is VISIBLE, PREVIEWED and CHEAP TO OVERRIDE:
     R1 ONE GESTURE, ONE VISIBLE CONSEQUENCE, AT ONCE. A declaration shows its derived result live, as a ghost while
        the hand moves and as the real thing on release; never a dialog first. SOURCED: Townscaper's Steam page —
        "plop down colored blocks of houses on the irregular grid, and watch Townscaper's underlying algorithm
        automatically turn those blocks into cute little houses, arches, stairways, bridges" (95 % positive of 10 615
        reviews; $5.99); Tiny Glade's Steam page — "Draw a path through a building? A door pops up! Raise the building?
        Columns and beams line up to support it" (97 % of 13 895; $14.99; released 2024-09-23); the 2021-08-30 essay
        "Every Click Has Meaning" (Electron Dance): the algorithm interprets intent — a click on top of a house makes it
        taller, next to it makes it bigger — so the player "never makes mistakes".
     R2 NO WRONG ANSWERS. The tool bends a declaration to the nearest lawful one and says so in one gentle line; it
        refuses only what item 20 forbids (dossier facts) and what a lock protects, always with the closest
        alternatives (item 20 (g)). SOURCED: Tiny Glade — "no wrong answers or failure states"; INFERRED: refusal as the
        exception keeps the casual path free of dead ends.
     R3 PREVIEW THE DERIVED, ADJUST AFTER. The ghost shows the consequences before commit (how many plots and
        households a quarter or a fill will hold, what moves, what joins), and everything can be resized, moved or
        re-rolled after placement. SOURCED: Manor Lords' burgage plots show the family count and yard at the fourth
        point before "build", with plus and minus for the number of homes (Gamer Guides; Hardcore Gamer, 2026 guides);
        a Steam discussion complaint (search summary, single-sourced, not read in full): "you don't know how many family
        blocks you will have when you design the plot area … you can't easily adjust it after placing it"; Dungeon
        Alchemist's top negative Steam reviews: rooms "okay looking … at best, awful messes at worst", small rooms
        without beds or tables, the majority redone by hand, no clutter-density control, oversized objects — against
        93 % positive of 1 930 overall. INFERRED: a fill must GUARANTEE essentials (a tavern has a taproom; a quarter
        has a road) and expose one density dial, a reroll and cheap manual override.
     R4 PAINT, DO NOT PARAMETRISE. Areas — quarters, fills, greenery, prosperity, terrain — are brushes and lassos with a
        handful of named presets; numbers live behind "more". SOURCED: Cities: Skylines II shipped without the first
        game's zoning brush and players asked for it back ("Is there no zoning brush?", Steam discussions); Wonderdraft
        sells "automatically beautified coastlines", symbol painting done "painlessly", rivers and roads "in a few
        clicks" ($29.99); Azgaar's Fantasy Map Generator is praised for power and described as "a dizzying array of
        options" (Roll20 GM Hub). INFERRED: the casual path is a brush and a preset; the dedicated path is the number.
     R5 VARIATIONS, ONE DIAL, REROLL. Every derived fill offers three variations and one density dial, with reroll
        unlimited and non-destructive. SOURCED: Photoshop Generative Fill's flow (Adobe help page and 2025–2026
        tutorials): select an area, optional prompt, three variations, cycle, generate again, each on its own layer;
        Dungeon Alchemist: a per-room theme, a randomize button and an "AI off" switch; its maker states the rooms are
        in-house procedural rules, not a language model.
     R6 LAYERS THE USER NEVER MANAGES. Draw order is semantic and automatic (terrain, water, walls, roads, plots,
        buildings, labels — §8.2's order table); there is no object-layer bookkeeping. SOURCED: Inkarnate's main
        beginner frustration is its brush-versus-object layers and stamp ordering (Loreteller's layers guide; a
        2026 comparison notes "new users spending hours fighting with object ordering").
     R7 START FROM A FINISHED TOWN, NEVER A BLANK PAGE. `intend` yields a whole city in one click; authoring is
        steering and subtraction; the empty state is a generated town and the words "change anything". SOURCED:
        Azgaar's generator loads a procedurally generated map by default (Roll20 GM Hub); the reference generators do
        the same (our captures). INFERRED from R1–R4.
     R8 DIRECT MANIPULATION, NO COMMAND GRAMMAR. Handles on walls, roads and plots; drag to move; the object is picked
        and acted on in one motion. SOURCED: the counter-example — ProFantasy's forum thread of 2017-09 "New to CC3+
        and am finding it very unwelcoming": the tool-then-object-then-"Do it" sequence, "I shouldn't have to spend 4
        hours trying to figure out how to move an object", defenders calling it "a learning cliff" and advising
        "forget everything you think you know"; a 2026 review: the interface "dense, dated, and intimidating".
     R9 PROGRESSIVE DEPTH. The casual user lives in intend, quarter, place and dress; shape and hold appear when a
        thing is clicked into; nothing of L3 crowds the first screen. SOURCED: the ceiling complaints of the simple
        tools — Townscaper "player control over details is intentionally limited", no drag-to-draw (reviews);
        Tiny Glade requests for copy and paste, longer buildings, more space (Steam discussions); Dungeon Alchemist's
        90-degree-only walls. INFERRED: the five layers of (c) are the answer to both audiences at once.
     R10 THE CLERK SPEAKS IN PREVIEWS. Every clerk proposal arrives as a ghost overlay with a one-line reason, three
        variations and accept / try again; it never applies silently; "why is this here" is one click away (the oracle).
        SOURCED: the Generative Fill flow (R5) and Dungeon Alchemist's AI-off switch; text-to-map generators of 2026
        (Adobe Firefly's fantasy-map page, Vheer, ZSky, fantasygen) sell "describe your settlement and get an overhead
        map in seconds" and return a PICTURE. INFERRED: the market expects describe-to-map; the clerk delivers it as an
        editable skeleton, which none of them do — a differentiator to state in §1.
     R11 UNDO IS TOTAL AND CHEAP; "cannot be undone" never appears. SOURCED: FTG's bulk edit warns "cannot be undone"
        (our findings, research/findings/ftg-docs-params.md); Manor Lords' right-click roll-back before commit.
     R12 LEARN BY DOING. No manual; a three-minute guided first town; tooltips on hover; hidden depth rewarded on
        discovery (Townscaper's "click-spells", found without tutorials, per the 2021 essay).

     **(g) THE TWELVE TOOLS AS INTERACTIONS (INFERRED from (f); the breadth survey may amend).** Each row: the gesture ·
     the live feedback · the preview and undo · the first-time hint.
     intend — pick a site card and a size, drag one "wealth" and one "walls" slider · a whole town regenerates under the
       hand within the budget (§12) · every change is one undo step · "Change anything: click it."
     ground — brush strokes (raise, lower, cliff, flatten) and a coast or river drawn as a curve with knots · terrain
       shades and water reflows live; roads and plots on the stroke re-derive after release · ghost then commit · "Paint
       hills; drag the river."
     wall — draw a line; it snaps to hill crests and road crossings and closes when the ends meet · towers and gates
       appear at crossings as ghosts; the enclosed quarters tint · commit on release; gates are grips to slide · "Roads
       through the wall become gates."
     road — draw with a class picked from a short ring of chips (main, street, lane, pier, bridge) · magnetism to
       existing roads and gates; a road over water becomes a bridge ghost · commit on release · "Drag a road; it
       snaps."
     quarter — lasso or brush an area, then pick a kind card (temples, manors, harbour, market, enclave, graveyard, …)
       and type a name · the area tints, and a count badge shows the plots and households it will hold at that band ·
       ghost with counts, then commit; resize handles after · "Paint a district, pick what it is."
     place — drop a stamp (class icon) on a spot, a quarter or a road, or type a locus; name it · a ghost footprint at
       the best lawful site with a one-line reason; the alternatives shown as faint sites · accept or nudge; undo one
       step · "Drop a tavern near the gate."
     roster — paste a list (or dictate); each line becomes a place card · the map fills with ghost sites in one pass;
       lines the rules cannot honour are listed with their nearest options · accept all, or per card · "Paste your list
       of places."
     fill — brush a density or a class mix over a quarter or block · buildings re-derive under the brush with three
       variations in a tray and one density dial · reroll unlimited; accept one · "Denser here; more gardens there."
     shape — click a plot or a building to enter it: split, join, drag corners, set storeys, move the door · the site
       plan re-derives live inside the plot only · undo one step · appears only after a click; "Shape this one."
     hold — a lock icon on any thing, a pin on any placed thing; "keep this, re-roll the rest" on a lasso · locked
       things dim the reroll brush; a fates list shows what would move · one undo · "Lock what you love."
     name — click a label to rename; drag it to move; group quarters into a region name · labels re-flow around the
       change · undo · "Names are yours."
     dress — pick a style card, toggle the quarter tint, place compass, scale bar and cartouche from a tray, drop an
       image under the map to trace · the whole map restyles live · undo · "Make it yours; export."
     the clerk — a chat drawer beside the map; every reply that changes the map is a ghost overlay with three
       variations and accept / try again; "why?" on any element answers from the rules · nothing applies silently ·
       "Ask for a walled harbour town with a temple quarter."

     **Open questions (this round; the breadth survey answers or reopens them):** UNVERIFIED — the Manor Lords
     complaint is a search summary of one thread; Generative Fill's "three variations" comes from tutorials, not read
     on Adobe's own page; Townscaper's "cannot drag" from one review. NOT COVERED YET — Dungeondraft, Dungeon Scrawl,
     Worldographer, Foundation, Anno, Kingdoms Reborn, Foundry VTT and Roll20 editors, watabou's and FTG's own editing
     as discussed by their users (the survey lane covers them). WOULD MOST CHANGE THESE RULES — evidence that casual
     users of watabou's generators or FTG value parameter panels over brushes (none found in this round; the negation
     search "Inkarnate too limited / advanced users want more control" returned nothing specific).
     *Method disclosure:* eleven web searches and seven page fetches on 2026-09-27 (Steam pages of Townscaper, Tiny
     Glade and Dungeon Alchemist's negative reviews; the Electron Dance essay; ProFantasy's forum thread; Wonderdraft's
     site; a Manor Lords Steam discussion that turned out to be about sizing, not previews; search summaries for the
     rest). No software was downloaded.

     **(f′) CORRECTIONS AND ADDITIONS AFTER THE BREADTH SURVEY (Fable manager, 2026-09-27 ~19:45; source
     `research/ux/tool-survey.md` — 38 tools, 440 sources, 38 load-bearing claims re-fetched live and all found).**
     The survey CONFIRMS R1–R12 and corrects their evidence as follows (each correction supersedes the wording in (f)):
     R1 — the 2021 essay does not contain "never makes mistakes"; it says everything "remained coherent" (that phrase
        was a summariser's paraphrase). The Steam figures are English purchaser reviews; all-language totals are
        21 649 (Townscaper) and 24 791 (Tiny Glade). The pattern itself is the survey's rank-1 finding across 12 tools.
     R3 — Manor Lords DOES preview the home count with plus and minus before "build"; what it lacks is adjusting a plot
        AFTER build (its plots are frozen). The complaint as (f) stated it is refuted; the rule stands sharper: preview
        with counts, and everything adjustable afterwards.
     R4 — Cities: Skylines II kept one-cell zone painting and dropped the first game's sized brush; requests to restore
        it are real but thin; the louder complaint was derived zone grids breaking unseen when a road changes. Add:
        numbers shown WHILE drawing (lengths, areas, counts — Cities: Skylines II's readouts; the Precision Engineering
        mod, 4.32 M subscribers).
     R5 — three variations per generation confirmed for Adobe's own Firefly models (partner models return one);
        Dungeon Alchemist has per-part generation switches, not one "AI off" switch; its maker's no-generative-AI
        statement is confirmed. Add the SCOPE rule: every re-roll is scoped ("this block", "this quarter", "trees only");
        an unscoped "new city" exists only as the empty-state action before anything is declared.
     R6 — the Inkarnate "main frustration" claim traces to one uncited page and is withdrawn as evidence; the rule stands
        on FTG's own docs (a new texture "might be behind another layer") and on the layer learning Wonderdraft and
        Dungeondraft require (weak-to-moderate evidence).
     R8 — the "2026 review: dense, dated, intimidating" quote could not be re-located and is withdrawn; the 2017 thread
        (32 dated posts) and independent dated sources 2012–2022 stand. Negation found and recorded: veterans say the
        curve pays off for thousands of maps — the rule is about the FIRST screen, not about depth (R9).
     R11 — the FTG "This action cannot be undone" warning is in research/findings/ftg-posts-c.md §2.20 and
        code-ftg-client.md §2.4 (not ftg-docs-params.md). Manor Lords' right-click roll-back is confirmed for road points
        only.
     R12 — learning by doing suffices for one verb (Townscaper); some players never found its hidden recipes and its
        controls were "nowhere to be found" at launch. Twelve tools need one-time first-use hints, each completing when
        the user performs the gesture (Tiny Glade's undo hint).
     RULES ADDED (the survey's R13–R19, judged and adopted; vetoable):
     R13 DECLARED MEANS HELD. Whatever the author declared is held by default — no lock to remember — and every re-roll
        keeps it (the survey's rank-3 pattern; its AP2: Azgaar's "Risk" mode re-made hand-drawn rivers, FTG's district
        re-roll destroyed hand content). In the design: a declaration's entities carry `pinned` from the event that made
        them (§7.2), the regenerate brush skips them, and the fates list says so.
     R14 THE COUNT BADGE. Every area declaration — quarter, fill, roster — previews the plots, households and buildings
        it will hold, with plus and minus there (Manor Lords; Foundation's most repeated complaint is the missing count).
     R15 NEVER LOSE WORK. Every declaration is written to the log at once (the log is the document, §2.9); a visible
        history with restore points (any log position); the skeleton exportable and re-openable at any time; no action
        labelled irreversible (the loudest theme across nine tools: lost work).
     R16 EVERYTHING DERIVED HAS A HANDLE; MOVE IS A FIRST-CLASS GESTURE, singly and in groups (the most-subscribed
        Cities: Skylines mod, 4.70 M, exists only to move things; Anno's multi-move; Tiny Glade's movable clutter;
        MFCG users asking to move labels and delete districts). In the design: `moveFootprint`, `moveVertex`, `moveLabel`
        and `instance` moves reached by dragging; a multi-select move over any scope.
     R17 NUMBERS WHILE DRAWING, NOT BEFORE — folded into R4 and R14.
     R18 HAND OFF DATA, NOT A PICTURE — for virtual-tabletop users one file that arrives walled, lit and on the grid
        (§11's dd2vtt and scene exports; the survey's Part I E lists the four details each importer needs).
     R19 THE CLERK IS OPTIONAL, LABELLED AS AI, PREVIEW-FIRST, AND NEVER DRAWS PIXELS. The hobby's climate makes this
        a product fact, not a nicety: Inkarnate banned AI-made marketplace assets, Foundry labels "Zero AI" packages
        while exempting "algorithms for procedural generation", and no surveyed tool pairs a rule-based town generator
        with an assistant that emits declarations — every text-to-map product returns a flat picture. In the design:
        the generator underneath is procedural (§4); the clerk writes declarations only (never an image); it is opt-in
        in the standalone product and labelled; exports carry provenance of what was hand-declared, derived by rule and
        clerk-proposed (§11, §17). Its closest precedent (Familiar, a Foundry module: a rules engine checks every
        chat-driven action, refusals announced, destructive actions confirmed) rests on its maker's page alone.
     BAR ADDED to (e): THE FIRST-FIVE-MINUTES TEST — at M2a and again at M3a, five to eight casual game masters who have
        never seen the product complete, without help, a quarter, a place and a dress task on a generated town, and one
        scoped re-roll that keeps what they declared; the survey's own weakest link is that no amount of review reading
        replaces this test.
     Still open after the survey (its §6): touch and phone editing (thin evidence; MFCG's maker says it "simply isn't
        designed for small touchscreens"); whether a preview-first clerk feels slow beside apply-then-undo agents
        (Figma's, 2026) — test both at the clerk's first build; whether "declared means held" surprises users who expect a
        re-roll to change everything — test at the first re-roll; Reddit and YouTube were unreachable to every seat.

     **(i) POINTS IN, SHAPE OUT, HANDLES ALWAYS (owner refinement, 2026-09-27 ~20:05).** Owner: "But like a brush or a you
     design points to choose a space to create to create a neighborhood or a body of water (corners and boundaries are
     automatically assigned and you can then edit the boundaries after generation) or other things. Thoughts on that or
     more refined ways?" Program's interpretation (vetoable), which generalises the owner's gesture into the toolkit's one
     declaration idiom: the MINIMAL declaration of any shaped thing is a few points; the tool derives the shape from the
     fabric and the ground; handles appear at once and stay after generation; a lasso or a brush is the same declaration
     with more points. Per thing:
     — QUARTER (T5): kind card first, then ONE point (a seed; the boundary grows along block edges to the kind's size band,
       as S6 grows districts around features), or TWO to FOUR points (the far edges), or a lasso. The boundary snaps to
       what quarters really end at — street centre-lines, water, walls, ridges — never through a block; the kind steers
       the snap (a harbour quarter hugs the shore, a manor quarter prefers high dry ground, a market quarter centres on a
       square). The ghost shows the boundary with its corner handles and the count badge (R14) BEFORE commit; after
       generation the same handles remain: dragging one is a `drawBoundary` event with the district id — cells change
       district, plots keep their geometry, only the edge's buildings re-derive locally, the fates list says what.
     — LAKE / POND (T2): one point and a LEVEL (drag up or down): the water fills the basin the terrain gives it, so the
       shoreline is derived, not drawn; handles on the level and on the basin's rim.
     — RIVER (T2): a SOURCE and a MOUTH point; the course follows the terrain downhill (S1's water operator); the course's
       knots are the handles (`moveCourseKnot`).
     — COAST and HARBOUR (T2): a sea level, then ONE point on the shore and a size for a basin cut into the coast, its
       quays derived by the harbour rules.
     — WALL (T3): TWO or more points; the run follows ridges and contours between them with towers spaced by rule; a
       closed ring when the ends meet; gates where declared roads cross (or a point on the run).
     — ROAD (T4): TWO points; the route is derived over the terrain (S4's router) with a class chip; free-hand drawing is
       the same tool with more points.
     — PLACE (T6): ONE point and a class; the footprint and plot are derived; the handle is the footprint itself.
     RULES: (1) every derived shape is previewed as a ghost with handles and counts before commit (R3, R14) — the
     evidence's failure cases are shapes decided unseen; (2) snapping is visible (the candidate edge lights up as the
     cursor nears) and escapable (hold to place freely) — snaps that hide free placement are the survey's AP3; (3) the
     number of handles is kept small (four to eight by default; "more handles" on demand) so editing after generation is
     a drag, not a re-draw; (4) a shape the author accepted is held (R13): later generation never moves it, only the
     author does; (5) the brush is the same declaration at density: painting a kind over blocks is many seeds; the lasso is
     many points; nothing in the model distinguishes them — one event kind per thing.
     HOMES: §7.1 (`drawBoundary`, `drawWater`, `drawWall`, `drawWay`, `placeAt` gain a `points`/`level` form whose shape
     is derived at dry run and stored resolved, as `EditScope` is), §4.2 S1 and §4.5 (the derivations the forms reuse),
     §9.5/§14 (the handle and snap surfaces), §13 (bars: a two-point wall over a ridge fixture; a seed quarter that never
     crosses a block; a level lake whose shoreline equals the terrain contour).
