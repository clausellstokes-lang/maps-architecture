R = [
# intro: the types' home
("""records this volume adds to the base (the reader's answers, the oracle's sections, the placement order index) are
typed in V10 §2.13 and placed by the BCRs.""",
"""records this volume types for the base (the reader's answers, the oracle's sections, the placement order index) are
typed in V10 §2.13, which the base cites (§11.2; items 468, 311, 297, 271)."""),
# 2.1: §14 owns the chain, imports, importers and the entry points (restatement cut)
("""`@plat/clerk` sits after the facade: `… ← port ← api ← clerk ← app`. It imports `@plat/api` (the facade and its types),
`@plat/model` (the event schemas, `Id`, `FactTier`, `Blueprint`, `MsgRef`), `@plat/tables` (`clerk.ops`, `clerk.content`,
the vocabularies and V09's message catalogue files) and nothing else of `plat/`; `@plat/app` imports it (the drawer),
`@plat/testkit` imports it (the evaluation harness) and, only if spike S1 fails, `@plat/cli` imports it (`plat clerk`,
V10 §3.17). Two entry points:

* `@plat/clerk/core` — model-free: the brief renderer, the spatial resolver, the encoders, drafts, proposals, the
  critique engine, the knowledge guard, the grounding check, transcripts, the usage meter, settings, and
  `createClerk(mount)`, the harness the drawer drives (V10 §2.6). The application uses it without the model too (the
  critique of an imported skeleton, V09).
* `@plat/clerk/model` — the backend, the request builder, the prompt and the turn loop. It is a separate lazily loaded
  chunk that the harness fetches on the first `send` after the clerk is switched on; the provider's SDK
  (`@anthropic-ai/sdk`) is imported in exactly one adapter file of it, `src/backend/anthropic.ts` (§14's one-adapter rule;
  its licence row, item 538).""",
"""The package's place in the chain, its two entry points, what it imports (`@plat/api`, `@plat/model`, `@plat/tables`)
and what imports it (`@plat/app`'s drawer, `@plat/testkit`'s evaluation harness and `@plat/cli`'s `plat clerk`, built only
if spike S1 fails, V10 §3.17) are §14's (item 518). What this volume fixes: `@plat/clerk/core` holds `createClerk(mount)`,
the harness the drawer drives (V10 §2.6), and serves the application without the model too (the critique of an imported
skeleton, V09); `@plat/clerk/model` is the chunk the harness fetches on the first `send` after the clerk is switched on,
and the provider's SDK (`@anthropic-ai/sdk`) is imported in exactly one adapter file of it, `src/backend/anthropic.ts`
(§14's one-adapter rule; its licence row, item 538)."""),
# 2.6 ids and the alias (E-33)
("""      label: string }                                // SR5-02 (a); J-V10.107""",
"""      label: string }                                // J-V10.107"""),
("""// label (J-V10.102): the button's words, rendered under the session's key — required on every kind but select. Sources, stated once: a V09 §4.9 row's
// button → that button's text (V10 §3.5 step 3); a V10 §3.16 row's alternative → its clerk.alt.<category>.<n> key (V10 §3.16); the action form and the card's
// history buttons → clerk.alt.help.useTool, clerk.alt.history.fork | .rerun | .undo | .rebuild (V10 §3.13 step 4); a critique fix → clerk.alt.critique.fix (V10 §3.10)""",
"""// label (J-V10.102): the button's words, rendered under the session's key — required on every kind but select; its sources are V10 §1b.1's label row"""),
("""declare function createClerk(mount: ClerkMount, opts?: { backend?: ClerkBackend /* tests: ReplayBackend */ }): ClerkHandle;
type ClerkHandle = ClerkHandle;             // this volume's name for its implementation; nothing more (J-V10.57 superseded)""",
"""declare function createClerk(mount: ClerkMount, opts?: { backend?: ClerkBackend /* tests: ReplayBackend */ }): ClerkHandle;   // V09 §2.10's handle; no alias, no member of its own"""),
# card buttons: SR6-05 (d)
("""rebuild.seq, label })`, their labels `clerk.alt.history.undo` ("Undo") and `clerk.alt.history.rebuild` ("Put it back"),
the words the same actions carry as reply blocks (V10 §3.13 step 4; J-V10.102).""",
"""rebuild.seq, label })`, their labels V09 §4.9's shared `button.undo` ("Undo") and `clerk.alt.history.rebuild` ("Put it
back"), the words the same actions carry as reply blocks (V10 §3.13 step 4; J-V10.102, J-V10.112)."""),
("""called `network.tokenRefreshLeadS` before the transport's `expiresAt` and on an authentication failure (V10 §3.17,
§3.19);""",
"""called `network.tokenRefreshLeadS` before the transport's `expiresAt` and on an authentication failure (V10 §3.17,
V10 §3.19);"""),
# 2.10 defaults narration and J121 row
("""(J-V11.82) — V11's round 2 (continuation)):""", """(J-V11.82)):"""),
("""| `ops.model.id` | `claude-opus-5` | the provider's default for new work (claude-api skill, models table cached 2026-06-24; re-read for this revision); Claude Opus 5.5 is the owner's option (section 11 Q3) |""",
"""| `ops.model.id` | `claude-opus-5` | the built-in clerk's model where the deployment's AI setup names no other — the standalone product's default, the provider's default for new work (claude-api skill, models table cached 2026-06-24); the model tier follows the deployment's AI setup, SettlementForge's in its module (J121), and a cheaper tier (such as `claude-opus-5-5`) is evaluated by V10 §7.3 before any switch (J122; V10 §11 Q3) |"""),
("""| `content.encoders` | raise and lower: radius 60 m, amount 4 m; cliff: radius 12 m, amount 10 m; flatten: radius 40 m, share 1; terrace: radius 25 m; ring anchors, islets and greens: 24 sides; harbour basin 20 000 m²; fill: denser +0.25, sparser −0.25, greener +0.3 field units | our own gesture sizes; the terrace radius calibrate-later against V09's terrace brush default |""",
"""| `content.encoders` | raise and lower: radius 60 m, amount 4 m; cliff: radius 12 m, amount 10 m; flatten: radius 40 m, share 1; terrace: radius 25 m; ring anchors, islets and greens: 24 sides (`ringSides`); an islet 2 000 m² (`islet.sizeM2`); a fill scope's ring 32 sides (`scopeRingSides`); harbour basin 20 000 m²; fill: denser +0.25, sparser −0.25, greener +0.3 field units | our own gesture sizes; the terrace radius calibrate-later against V09's terrace brush default, the islet's size against the second known-city fixture's islet |"""),
("""    terrace: { radiusM: number }; ringSides: 16 | 24 | 32 /* the n-gon of a ring anchor, an islet and a green */;
    harbourM2: number; fill: { denser: number; sparser: number; greener: number } };""",
"""    terrace: { radiusM: number }; ringSides: 16 | 24 | 32 /* the n-gon of a ring anchor, an islet and a green */;
    islet: { sizeM2: number } /* an islet's area when the words give none */; scopeRingSides: 16 | 24 | 32 /* the ring of a fill scope `around` a point */;
    harbourM2: number; fill: { denser: number; sparser: number; greener: number } };"""),
("""| J-V10.64; the item-110 words C10-60 |""", """| J-V10.64; item 110's relation words among them |"""),
# 2.12 inputs: g items 113, 111, 114; XAGREE-1; restatement of the weights ladder
("""  seed?: 'keep'|'new';
  advance?: { years: number; shape?: 'grow'|'reach'|'decline'|'hold'|'timeline'; to?: number; hazards?: 'none'|'minor'|'full' };   // V06 §4.1""",
"""  seed?: 'keep'|'new';
  history?: { onceA: Rung /* a rung above the town's own: "once a city, now a village" */; ageYears?: number } | 'none'   // item 113 (a): the blueprint's history (V09 §4.21.3 (1))
    /* only when the user's words give the place a past; a dossier history is the port's and not declared here */;
  advance?: { years: number; shape?: 'grow'|'reach'|'decline'|'hold'|'timeline'; to?: number; hazards?: 'none'|'minor'|'full' };   // V06 §4.1"""),
("""  at?: Anchor; depthM?: number /* lake: its depth at its point, default 3 */; source?: Anchor; mouth?: Anchor; shore?: Anchor; sizeM2?: number;""",
"""  at?: Anchor; depthM?: number /* lake: its depth at its point, default 3 */; source?: Anchor; mouth?: Anchor; shore?: Anchor; sizeM2?: number;
  spring?: boolean /* lake: spring-fed — an oasis, with its grove and gardens (item 111 (a)); only when the user asks for an oasis or a spring-fed pool */;"""),
("""interface WallInput {    // T3
  op: 'wall'|'gate'|'retaining'|'events'; points?: Anchor[]; kind?: Enceinte['kind'] /* op 'wall' only */; closed?: boolean;
  highSide?: 'auto'|'left'|'right' /* retaining, only when the user asks for one (rule 16): the held side, relative to the order of points; default auto */;
  gate?: { enceinte: Ref; at: Anchor }; events?: RawEvent[] }""",
"""interface WallInput {    // T3
  op: 'wall'|'gate'|'retaining'|'repair'|'wear'|'events'; points?: Anchor[]; kind?: Enceinte['kind'] /* op 'wall' only */; closed?: boolean;
  highSide?: 'auto'|'left'|'right' /* retaining, only when the user asks for one (rule 16): the held side, relative to the order of points; default auto */;
  gate?: { enceinte: Ref; at: Anchor };
  enceinte?: Ref; run?: Anchor /* repair, wear (item 114): the run of the enceinte's condition profile nearest this point; a repair without one lifts the ring's neglect (Back in use) */;
  material?: 'robust' | string /* repair: robust (the wall's own material, the default) or a row id of V11's walls.patchMaterials for the enceinte's kind and culture */;
  events?: RawEvent[] }"""),
("""  link?: { good: string; op: 'pin'|'avoid'|'cut'|'release'; provider?: Ref } /* item 105 (j): target is the consumer use; 'avoid' only where V11's siting.linkEdits carries the cell (V09 XV-V9-2) */;""",
"""  link?: { good: string; op: 'pin'|'avoid'|'cut'|'release'; provider?: Ref } /* item 105 (j): target is the consumer use; the cells are V11 §4.2's siting.linkEdits { bindTo?, avoid?, cut? } */;"""),
("""    weights?: Partial<Record<'nuisance'|'need'|'clientele'|'supply'|'alignment'|'competition'|'coverage'|'sun' /* V11 §2.4's eight families */, 0 | 0.5 | 1 | 2 | 3>>
      /* SS-27: V09 §2.6's family multipliers — Ignore, Less, Normal, More, Much more; a hard need is never scaled; absent is 1 */ }""",
"""    weights?: Partial<Record<'nuisance'|'need'|'clientele'|'supply'|'alignment'|'competition'|'coverage'|'sun' /* V11 §2.4's eight families */, 0 | 0.5 | 1 | 2 | 3>>
      /* V09 §2.6's family multipliers, written as the kind row's familyWeights cell (V11 §4.2) */ }"""),
("""  | { kind: 'tools' }                                            // the help route: each tool's registry row with its catalogue hint (V10 §3.1)""",
"""  | { kind: 'tools' }                                            // the help route: each tool's registry row with its catalogue hint (V10 §3.1)
  | { kind: 'look' }                                             // the viewer's season, week and festival display: view state, read by the harness (V10 §3.9b (5))"""),
# 2.13 types' home and additions
("""These are base types — any client, host or clerk reads them — declared here once and placed in the base by the BCRs.""",
"""These are base types — any client, host or clerk reads them — declared here once; §11.2 cites them (item 468)."""),
("""    form: string; era: string; band: string /* the population-weighted mean band */; dossier: boolean; week?: number };""",
"""    form: string; era: string; band: string /* the population-weighted mean band */; dossier: boolean; week?: number;
    biome: string; arid: boolean /* the biome's climate row (§4.2 S0); arid: item 111's oasis chance, water pull and climate cell apply */;
    history?: { peak?: { rung: string; population?: number /* absent when the peak is symbolic */; symbolic: boolean };
      refounded: number; buried: number /* counted after the knowledge filter */ } /* item 113: §2.7's HistoryRecord, present when a replay ran */ };"""),
("""    lakes: { id: Id; name?: string; bearing: Bearing8; distM: number }[]; harbour?: { id: Id; bearing: Bearing8 } };""",
"""    lakes: { id: Id; name?: string; bearing: Bearing8; distM: number; spring?: true /* an oasis, item 111 */ }[]; harbour?: { id: Id; bearing: Bearing8 } };"""),
("""    open: { from: Bearing8; to: Bearing8; barrier: 'shore'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte' /* J-VI.3, as WhyAnswer.closure */ }[] /* item 106: arcs a barrier closes */ }[];   // enceintes only: never a RetainingWall""",
"""    open: { from: Bearing8; to: Bearing8; barrier: 'shore'|'cliff'|'gorge'|'marsh'|'sheer'|'enceinte' /* J-VI.3, as WhyAnswer.closure */ }[] /* item 106: arcs a barrier closes */;
    runs?: Partial<Record<'standing'|'worn'|'patched'|'breached'|'dismantled', number>> /* item 114: the runs of Enceinte.condition by state (§2.7) */ }[];   // enceintes only: never a RetainingWall"""),
("""      excavation?: 'accessible'|'unexcavated' /* caverns and ruins; 'unexcavated' only at a secret key */;""",
"""      excavation?: 'accessible'|'unexcavated'|'lost' /* caverns, ruins and a buried former settlement; 'unexcavated' only at a secret key; 'lost' (item 113 (e)) to the key that admitted it while accessible (V04 §5.2) */;"""),
("""  excavation?: 'accessible'|'unexcavated';                                     // an element of a cavern or ruin cluster (V04 §3.5.7 (g))""",
"""  excavation?: 'accessible'|'unexcavated'|'lost';                              // an element of a cavern or ruin cluster (V04 §3.5.7 (g); 'lost', item 113 (e))"""),
("""  sections?: WhySection[];                                                     // C10-11: what a volume's provider knows beyond these fields (V10 §3.9)""",
"""  sections?: WhySection[];                                                     // what a volume's provider knows beyond these fields (V10 §3.9)"""),
("""type WhySection = { kind: string /* registered with its provider: 'underground', 'crypt', 'raised', 'massing', 'plan', 'fabric', 'island', 'move' … (V10 §3.9) */;""",
"""type WhySection = { kind: string /* registered with its provider: 'underground', 'crypt', 'raised', 'history', 'massing', 'plan', 'fabric', 'island', 'move' … (V10 §3.9, V10 §3.9b) */;"""),
("""  terms: { driver: string /* a driver of §4.5's field, 'daylight' (item 102) among them, or 'character', 'brush', 'epoch', 'chance' */; delta: number;
    sources?: { caster: Id | 'terrain' | 'walls' | 'buildings'; samples: number }[] /* daylight: V05 §4.5's per-island attribution */ }[];""",
"""  terms: { driver: string /* a driver of §4.5's field, 'daylight' (item 102) and 'water' (item 111 (b)) among them, or 'character', 'brush', 'epoch', 'chance' */; delta: number;
    sources?: { caster: Id | 'terrain' | 'walls' | 'buildings'; samples: number }[] /* daylight: V05 §4.5's per-island attribution */ }[];
  climateSun?: number /* item 111 (c): the climate row's sunlight cell that multiplies w_sun — 1 in temperate and cold rows, 0 or negative in hot arid rows */;"""),
("""// the base's raised-way package — the single-subject read of V06's RaisedWayLedger (item 290; item 290): read-only, no stream advanced""",
"""// the base's raised-way package — the single-subject read of V06's RaisedWayLedger (item 290): read-only, no stream advanced"""),
("""// @plat/model — the placement order S10b records (item 271), on the DerivationRecord of the plot a use stands on
type PlacementOrder = { use: Id; seq: number /* the event whose S10b run placed it; 0 at generation */; k: number /* its index in that run's order */; pass: 1 | 2 /* 2: moved by item 105 (f)'s relaxation pass */ };""",
"""// @plat/model — the placement order S10b records (item 271), on the DerivationRecord of the plot a use stands on
type PlacementOrder = { use: Id; seq: number /* the event whose S10b run placed it; 0 at generation */; k: number /* its index in that run's order */; pass: 1 | 2 /* 2: moved by item 105 (f)'s relaxation pass */ };
// @plat/clerk/core — the look read (V10 §3.9b (5)): view state through ClerkMount.view, never a facade query, never in the map block
interface LookAnswer { week: number /* 0–51, spring first: §2.9's year position (item 117) */; season: 'spring'|'summer'|'autumn'|'winter';
  follow: boolean /* §2.9's follow flag: the week is the dossier's (§7.7's calendar row) */;
  climate: { row: string; says: string[] /* the season cells in force at that week — winter severity, leaf, growing, harvest, ice and snow weeks (§4.2 S0; V11's season tables) — each its row's says */ };
  festivals: { name: string; weeks: [number, number]; shown: boolean }[] /* the list V09 §4.21.8 reads (§7.7's traditions row, under the session's key), in window order */;
  display: 'follow'|'off'|{ preview: string } /* §2.9's festival display (item 118) */ }"""),
("""V01's providers name their pushes in the pre-revision words (`SUNLIGHT`, `EMITS`, `SENSITIVE`); they read as `sun`,
`nuisance` and `nuisance` (CVR-V10-6). Each family's plain words are `clerk.content.familyWords`' catalogue keys.""",
"""Every provider names its pushes by these families, V01's among them (V01 §4.5). Each family's plain words are
`clerk.content.familyWords`' catalogue keys."""),
# 2.14 lifecycle: the look read and the new derived rows
("""| `MapBrief`, `EntityCard`, `SiteCandidate`, `MeasureAnswer`, `FrameAnswer`, `RuleAnswer`, `ProfileAnswer`, `WhyAnswer` (sections included), `Explanation`, `FieldDrivers` | on each query |""",
"""| `MapBrief` (its history, biome and wall-run lines included), `EntityCard`, `SiteCandidate`, `MeasureAnswer`, `FrameAnswer`, `RuleAnswer`, `ProfileAnswer`, `WhyAnswer` (sections included, `history` among them), `Explanation`, `FieldDrivers` | on each query |"""),
("""| `RaisedOutcome`, `WhyAnswer.removed`, the `raised` rows, `MapBrief.raised`, `.terraces`, `.decks` | each query |""",
"""| `LookAnswer` (V10 §3.9b (5)) | each `read_map look` | the model's look answers | never: read from the view state (§2.9) and the tables at the moment of the read, never logged, never hashed | re-read at each call; a week or festival change between turns reaches the model only through the next read | — | a document without item 117's or 118's view keys reads midsummer (week 19) with no festival (V09 §4.21.7 (2)) |
| `RaisedOutcome`, `WhyAnswer.removed`, the `raised` rows, `MapBrief.raised`, `.terraces`, `.decks` | each query |"""),
]
