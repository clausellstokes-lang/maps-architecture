# Retrovalidation 2026-10-18 — lane retrovalidation/faith (Fable 5.1, the validator; J392)

Lane: `retrovalidation/faith` (fable; J392). Seat: Fable 5.1 at high — the validator seat the owner's J390 reserves for
judgement. Target: `research/sf/faith-system.md` (1,516 lines, read WHOLE, §0–§12 in order), carrying the J375 notice.
Input: the Opus verifier's record `faith-verify.md` (41 findings F1–F41 over ~590 claims, 941 bounds-checked citations,
93 line counts). Host: `/home/user/clausellstokes-lang/settlement-engine` at `81f1cd96`, read-only; no git command run;
nothing written to the host. Rules obeyed: the whole file read before any verdict; the owner's quoted words (J375, J379's
and J380's questions, J382's "yes", J384's "i leave all judgemtn to you", J391's six answers) are never re-judged — only
the session's readings, rulings and claims; every finding ends FIXED (a correction fragment, each checked to occur
exactly once in its file) or INVALID with evidence; nothing is deferred; journal rows are append-only (a wrong row is
named for J392, never edited).

Status: COMPLETE (started 00:55Z; CHECKPOINT 01:00Z; host probes 01:01–01:10Z; corrections checked 01:12Z; record
written 01:14Z; see the LANDED line in `docs/lane-events.log`).

## Verdict in one line

PASS-WITH-CORRECTIONS. The note's account of the system (four layers; local and global rankings in every preset with no
flag; realm piety 1.0 unless spread; spread lit by default in DC and FS only and lightable per campaign; faith relational,
geography attenuating), its status-by-preset table, its three defects and its ten J379 corrections all hold at
`81f1cd96`. Of the verifier's 41 findings, 38 are accepted as written (three with an extension the verifier did not
name) and 3 are amended (F6's range, F9's wording, F11's words); none is rejected. Three findings of my own that the
verifier could not see: the note contradicts its own carrier table by calling the hostile war front "the strongest
carrier" (an overlord's authority channel reaches its vassal at 0.82, one way) — a wrong inference that travelled into
lens-implications §1.3, V13 §5.9 (6)'s pressure row and the rulings record's J379.1 text; §9.5 item 3 implies the spread
lane's gated reach is an exported host function (it is internal to `advanceReligionStates`); and §6.2's legacy-label
inference ignores the graph sync that canonicalizes every edge's label. All are fixed below. One design fragment is owed
(V13 §5.9 (6)); the rest are research or record fragments.

## 1. What I read

- `research/sf/faith-system.md`, all 1,516 lines, in order (§0 preamble; §1; §2.1–2.5; §3.1–3.11; §4.1–4.6; §5.1–5.6;
  §6.1–6.15; §7.1–7.10.11; §8 table and notes; §9.1–9.6; §10.1–10.3; §11.1–11.4; §12 all 29 rows).
- `docs/validation/retrovalidation-2026-10-18/faith-verify.md` whole (89 lines); `rulings.md` whole (106 lines — the
  Fable rulings seat's verdicts, three of which rest on this note: J379.1, J382(c), J384(10)); `alignment.md` (the
  sibling Fable record, for format).
- `docs/PROGRESS.md` rows J375–J391 whole (lines 434–450); `docs/AMENDMENTS-2026-10-16j.md` items 131–141 whole (lines
  16–282); `docs/AMENDMENTS-2026-10-14i.md` item 130 whole (lines 15–85).
- Host, read-only at `81f1cd96`, for every finding and for the inferences the verifier did not judge:
  `wp/moralInstitutionPressure.js:50-56`; `src/copy/deityAuthoring.js:20-50` (+ grep); `disp/deityEffects.js:145-176`;
  `wp/simulationRules.js:6, :31, :86-100, :249-253, :692-800 (the unit bundles QUIET/OPEN/WAVES/ONE_REGEN/FP_LIT_*), :864-1221
  (every preset's spreads and flag lines), :1034-1042, :1400-1410, :1480-1496, :1505-1512, :1560-1588`; FOLD:267, :338,
  :349-352, :427; `src/lib/customRegistry.js:110-145` (+ grep of `deitySnapshot.js`, `deityCommitEmbed.js`);
  `src/generators/steps/resolveConfig.js:72-76, :190-194`; `src/store/configSlice.js:27-31`;
  `src/generators/economy/economicState.js:224-245`; `src/generators/priorityHelpers.js:419-428`;
  `src/generators/computeActiveChains.js:933-940`; `src/data/resourceData.js:405-411`; `src/generators/resourceGenerator.js:383-388`;
  `wp/religionState.js:51-53, :62-71, :164-231, :550-556, :610, :766-778`; `wp/traditionsKernel.js:465-485, :789-796`;
  `src/domain/traditions/genesis.js:100-104, :179-183`; `wp/religiousContest.js:84-98, :314-350, :459-472, :608-611,
  :726-734, :954-960, :995-1025` (+ its export list); `wp/applyWorldPulse.js:186-245` (+ grep of every
  `primaryDeitySnapshot` write); `wp/pulseKernel.js:1323-1352, :1825-1832`; `wp/piety.js:284-294, :299-321`;
  `rg/propagation.js:196-202, :246-276`; `wp/religionLegitimacy.js:131-133, :508-520`; grep `missionaryAccessFor`;
  INFORMATION:342; REWORK:28-39; FAITH:624-732 and ARCH_WF:446-500 (grep return/migration), FAITH:1325-1329, :1496-1500;
  COUPLINGS:344, :856, :864-884, :1816; PHASE4:337-350, :380-384; ARCH_WC:697-699, :6136-6140; ARCHITECTURE:1989-1993;
  ARCH_WF:268-272, :416-420; `wp/generosityKernel.js:8-16, :87-92, :485-493`; `src/domain/mapProfile.js:203-232`;
  `map/RelationshipEdges.jsx:182-203`; `src/domain/aiGrounding.js:60-65, :438-444` (+ grep `regionalAuthority`);
  `set/faithPanelModel.js:8-16`; `wp/momentum.js:385-406` (+ grep `momentumActive`); `src/generators/historyGenerator.js:210-216`;
  `sp/cultureDistance.js:42-48`; `wp/deityStance.js:69-73`; `src/domain/realm/heraldRouting.js` (768 lines, wc);
  `disp/settlementRumors.js` (1,049, wc); `rg/graph.js:93-97, :452-500, :665-725` (+ grep `canonicalRelationshipLabel`);
  `src/domain/events/mutateEntities.js:928-996`; `src/components/settlements/LivingWorldGates.jsx:64-74, :245-262, :330-334`;
  `wp/subsystemActivation.js:33-47`; `find` for `DESIGN_TRADITIONS.md`.
- Map side, for the consequences: `docs/volumes/V13-world.md:60-64, :363-367, :3350-3372 (§5.9 (6)), :3600 (T-V13-54),
  :3753 (H28), :3867 (J-V13.103)`; `research/sf/lens-implications.md:103-107, :158, :202, :208, :522`; a sweep of
  `docs/*.md`, `docs/volumes/*.md`, `research/sf/*.md` and this directory for "hostility carries hardest", "strongest
  carrier", "war relief", "carrier routes", "regionalAuthority", "pilgrimage_center", "holySite" and "hinterland".
  `docs/HOST-REQUIREMENTS-2026-10-18.md` does not exist yet (J391 (6): "at the landing").
- Nothing executed in the host; the presets were read from their bodies and spreads, not evaluated.

## 2. Rulings on the verifier's findings F1–F41

ACCEPT = the finding and its fix stand as written; ACCEPT+ = accepted with an extension the verifier did not name;
AMEND = the finding stands, the fix is changed. No finding is rejected. The correction ids refer to §5.

| id | verdict | my evidence beyond the verifier's | correction |
|---|---|---|---|
| F1 | ACCEPT | `moralInstitutionPressure.js:52` "Founding is a YEARS-scale event"; `:55` "At tick = 1 week" | C1 |
| F2 | ACCEPT (WRONG) | §10.1 item 4 holds the "stored verbatim" comments; item 9 is PHASE55/COUPLINGS distance (read in the note itself) | C2 |
| F3 | ACCEPT (UNSUPPORTED) | `deityAuthoring.js:24-49` is the base form; grep of the file for characterAxes/boon/bane/authoredTemper is empty — which the note's own §6.13 grep ("no file under `src/copy` names `boonChannel`") already implied | C3 |
| F4 | ACCEPT+ | `deityEffects.js:150-175` "With disposition channels active …"; `dispositionChannelsEnabled: false` only at `simulationRules.js:1041` (grep); and `deityAuthoring.js:45` tells the author "This read stays dormant until assignment and disposition channels are enabled" — a third witness | C4 |
| F5 | ACCEPT | `:1041` is the key; `:1037` a comment | C5 |
| F6 | AMEND | "This is the ONLY" spans `:92-93`, "never crosses a settlement boundary" is `:97`; the comment block is `:90-100`, so the note's range was RIGHT and stays; the verifier's `:89-100` is off by one (`:89` is `settlementStrategyEnabled: false`) | C6a, C6b |
| F7 | ACCEPT | FOLD:351 "— which is VACUOUS on every born world" | C7 |
| F8 | ACCEPT | `find` for `DESIGN_TRADITIONS*` is empty; `traditionsKernel.js:3` and `:348` cite it | C8 |
| F9 | AMEND | `customRegistry.js:133-141` mints; its header `:111-114` calls the ref "STABLE, ACCOUNT-SCOPED", scope = `localUid` (the account's local token for the deity), fallback `id`; grep of the two cited files finds no mint. The verifier's "per-authored-deity" is the mechanism, "account-scoped" the code's own word for the purpose — the note keeps the code's word and defines the scope; §11.4 (which listed the mint as unread) is updated | C9a, C9b |
| F10 | ACCEPT | `resolveConfig.js:74` = `rng.randInt(5, 95)`; `:192` and `configSlice.js:29` = 50; `economicState.js:227`, `:241` test `religionInfluence`; `priorityHelpers.js:421-427` derive it | C10a, C10b |
| F11 | AMEND | the marker is `resourceData.js:409` (`pilgrimage: !0`) carried at `resourceGenerator.js:386`; `computeActiveChains.js:935-938` is the "Pilgrimage & religious tourism" export chain — the sentence never named it, so the cite is kept only with the words it supports | C11 |
| F12 | ACCEPT | `religionState.js:224-225` resets `patronChallengeTicks` alone; `contestedTicks` and the siege fields untouched | C12 |
| F13 | ACCEPT | `traditionsKernel.js:791-795` keys on `rec.deityRef`, `:471-482` moves the point against `activeOthers(ref)[0]`; `genesis.js:181` stamps the patron's `_deityRef` at founding | C13 |
| F14 | ACCEPT | `religiousContest.js:1012-1023` re-embeds `newPatron`; `applyWorldPulse.js:196` the only re-embed; no per-tick mirror of the state's patron into config exists (grep: `:196`, `:242`), so the cleared deity returns only by winning | C14a, C14b |
| F15 | ACCEPT | `pulseKernel.js:1828-1829` `memoryState.causeLifecycle !== undefined \|\| anyCompromise` | C15a, C15b |
| F16 | ACCEPT | `religionState.js:610` is a doc comment; `religiousContest.js:610` the mint × realmMult, `:1016` the severity | C16a, C16b |
| F17 | ACCEPT | `piety.js:284-294` six causes; `religiousContest.js:958` pushes secularization/revival | C17 |
| F18 | ACCEPT | `propagation.js:269-275` `severityFor`; `:246-256` `impactId`; `:199` empty goods → 0.4 | C18a, C18b |
| F19 | ACCEPT | `religionLegitimacy.js:131-133`: CLERGY_SCANDAL_W 0.16, CLERGY_REVEALED_SHARPEN 0.6, CLERGY_COURT_AMP 0.5; `:515-517` scandal = clamp01(taint + 0.6 × revealed), courtMod = 1 + 0.5 × (0.5 − fit) × 2 ∈ [0.5, 1.5] | C19 |
| F20 | ACCEPT | `religionState.js:772` `fitFactor = base >= 0 ? fit : 1` | C20 |
| F21 | ACCEPT | `couplingRegistryGrammar.js:148` (comment), `:186` (path); `treatyEnforcement.js:270` the export; no other hit | C21a, C21b |
| F22 | ACCEPT+ | FOLD:427 as written gives the BELIEF axis the noun "standing (believed devotion)" — colliding with the code's local-rank "standing" (`religionState.js:51-53`) and with INFORMATION:342's "devotion"; the note's vocabulary follows INFORMATION and the code, so the collision is named in the bracket (a host-document inconsistency, not the note's error) | C22a, C22b, C22c |
| F23 | ACCEPT | REWORK:30 "niche — its temperamentAxis × alignmentAxis"; :38 "exactly one niche"; :29 shares sum; :37 heading | C23 |
| F24 | ACCEPT (UNSUPPORTED) | grep of FAITH:624-732 and ARCH_WF:446-500 for return/migration is empty; COUPLINGS:856 "pilgrims are NEVER a migration (they return …)", :1816 "mandatory return legs … never migrations" | C24 |
| F25 | ACCEPT | PHASE4:382-383 "Cooldowns, caps, hysteresis margins, and the containment cap are NEVER amplified" | C25 |
| F26 | ACCEPT | COUPLINGS:880-882 the bait under ADDS; FOLD:338 INFORMATION row "IN-2 lure (axis law built, `lureCommission` no caller)" | C26 |
| F27 | ACCEPT | grep: the only "carrier reach" in COUPLINGS is :344 "Spread moves at carrier reach;" | C27a, C27b |
| F28 | ACCEPT | ARCH_WC:697 the FAITH AGNOSTICISM paragraph; :6138-6139 `wc_homecoming` "walls stronger, temple unsettled"; FOLD:267 "WC/WY 'faith exposure' and `faithCargo` are UNBUILT" | C28 |
| F29 | ACCEPT | `generosityKernel.js:10-14` "only settlements in real food NEED are ever asked"; `:487-492` need = food pressure ∪ famine severity; `:89-90` the six instruments | C29 |
| F30 | ACCEPT | `mapProfile.js:228` the sentence inside `deriveRegionalAuthority` (`:209-231`) | C30 |
| F31 | ACCEPT | `RelationshipEdges.jsx:185-200` a `<line>` and, when `style.arrow`, a midpoint `<circle>`; no marker | C31 |
| F32 | ACCEPT | PROGRESS.md:438 "flows along carrier routes from dated host receipts"; §9.6 item 4's "Flows along carrier routes" is a paraphrase, not a quote, and needs nothing | C32 |
| F33 | ACCEPT+ | `aiGrounding.js:63` imports and `:441` places `deriveRegionalGraph(settlement)` in the grounding payload; `regionalAuthority` is named only in `mapProfile.js` and `settlement.schema.js` (grep). The verifier named the §8 and §9.4 rows; the §9.3 row "none (derived; unconsumed)" carries the same claim and is corrected too | C33a, C33b, C33c |
| F34 | ACCEPT (WRONG) | `faithPanelModel.js:11-14` "It NEVER reads config.latentPantheon: the unrevealed seed is private" — no every-seed claim | C34 |
| F35 | ACCEPT+ | `momentum.js:390-395` the deposit under `isFaithSpreadEnabled`, inside `momentumActive` = beliefs ∧ `momentumEnabled`; `momentumEnabled: true` is in WAVES (`simulationRules.js:721`), spread by RR (`:900`), DC (`:961`), LR (`:1007`) and FS (`:1220`); beliefs need a non-omniscient infoMode (DC `:953`, LR `:996`, FS `:1073`); spread by default DC `:940`, FS `:1018` — so the verifier's "DC and FS on canon" holds by preset default, LR only if the DM lights spread (the note's own §6.1) | C35 |
| F36 | ACCEPT | `historyGenerator.js:212` `{deity}`, `:215` `{order_name}` Benedictine/Franciscan/Templar/Hospitallar | C36 |
| F37 | ACCEPT | `cultureDistance.js:45` `W_FAITH: 0.3`; `:46` `W_ALIGN` | C37 |
| F38 | ACCEPT | ARCH_WF:270 and FAITH:1327 carry "[CORRECTED 2026-10-16 (coherence fold) …]"; ARCH_WF:418 "[see the bracket at :269]"; FAITH:1498 and ARCHITECTURE:1991 still say five | C38 |
| F39 | ACCEPT | `deityStance.js:71` `CONTEST_METHOD: 0.12`; `religionState.js:553` `organicFloor = T.LEGIT_ORGANIC_CONTEST + STANCE_TUNING.CONTEST_METHOD * methodPressure` | C39 |
| F40 | ACCEPT | `heraldRouting.js` 768 lines; `religiousContest.js:997-1004` the occupation stain | C40 |
| F41 | ACCEPT | `settlementRumors.js` 1,049 lines | C41 |

Count: 41 findings — 38 ACCEPT (F4, F22, F33, F35 extended), 3 AMEND (F6, F9, F11), 0 REJECT. The verifier's summary
("none changes a conclusion of the note") holds.

## 3. What the verifier could not see

Findings of my own (V = validator), each FIXED by a correction in §5:

- **V1 — "the strongest carrier" is contradicted by the note's own table (WRONG as an absolute).** §9.6 item 4 says
  faith travels "including *hostile* war fronts at 0.72, the strongest carrier", and §10.3 asks "Should hostile
  relationships carry faith at 0.72, the strongest carrier?". The note's §6.2 table itself gives vassalage 0.82
  overlord → vassal, and the host confirms it: the vassal bundle mints `political_authority` 0.82 and
  `military_protection` 0.70 from overlord to vassal (`rg/graph.js:679-680`), both in `FAITH_CARRIER_CHANNELS`
  (`religiousContest.js:94-97`), read at the channel's own strength when directed out of the bearer (`:336-342`). The
  hostile war front (0.72 both ways, `rg/graph.js:698`) is the strongest TWO-WAY carrier; an overlord's creed reaches
  its vassal harder, one way. §6.2's bullet "Enemies carry faith hardest" compares only against the alliance (0.62) and
  the trade edge (0.45) and is right as far as it goes; the §9.6 and §10.3 sentences outrun it. The inference travelled:
  `research/sf/lens-implications.md:105` "war_front 0.72 (hostility carries hardest)"; V13 §5.9 (6)'s pressure row
  (`docs/volumes/V13-world.md:3367`, and the regenerated bundle `docs/ARCHITECTURE-FULL.md:76766`; the applied item's
  record in `docs/AMENDMENTS-2026-10-17n.md:1197` is append-only and stays); and the rulings record's J379.1 AMENDED
  text (`rulings.md:55`). None of the design's mechanism changes — V13 draws pressure from "the host's weight" per
  carrier kind, so the lens already shows an authority link harder than a war front when the host says so — but the
  parenthesis in the row would teach a reader the wrong order. Corrections C42–C47.
- **V2 — §9.5 item 3 implies both reaches are exported host functions.** "using the exported pure carrier and reach
  functions … choosing explicitly between the spread lane's gated reach and `buildFaithReach`'s ungated one": the
  exports of `wp/religiousContest.js` are `DEITY_RANK_STRENGTH` (`:102`), `faithCarriersOut` (`:314`), `buildFaithReach`
  (`:361`) and `advanceReligionStates` (`:544`); the spread lane's gated reach (`:596-653`, with MIN_CARRIER, the occupation
  floor and the 0–1 clamp) is internal. A lens recomputing it would be a map re-implementation — the class the lens
  note's four-class rule and V13 §5.8 (4) refuse. V13 §5.9 (6) is safe (pressure "with the host's weight … only when
  sent", H28); the note's item needs the qualifier. Correction C48.
- **V3 — §6.2's legacy-label inference is overstated.** "[INFERRED] A legacy plural `trade_partners` *edge* would not
  carry, because the carrier check matches the raw label while only the channel bundle canonicalizes it": the graph
  rebuild from the saves' links canonicalizes every edge it builds or refreshes (`rg/graph.js:462` `liveType =
  canonicalRelationshipLabel(...)`, written at `:481` and `:498`), so a legacy plural edge rebuilt from the links is
  already `trade_partner` and carries. The inference holds only for an edge read raw — the `snapshot.relationships`
  fallback (`religiousContest.js:327`) or `normalizeEdge` without the sync (`rg/graph.js:204`). Corrections C49a, C49b.
- **V4 — the §9.3 row carries F33's claim too** ("none (derived; unconsumed)"); corrected with the other two (C33c).
- **V5 — open questions the owner has since answered read as still open.** §9.6 item 6 and §10.3's holy-site and
  pilgrim-catchment questions were answered by J384 (10) under the owner's delegation (UPHELD by the rulings seat); §9.6
  item 9 and §10.3's sea-lane question by the owner's own J382 (c) "yes". Dated brackets added so the note does not
  invite a second ruling (C50–C53). The remaining §10.3 questions (FPQ-62, the default preset's spread, the mint's deity
  id and retirement — H28 carries the ask —, hostile carriage, realm-piety weighting, the "War & faith" toggle, the
  patron-clear and demotion defects, the post-seed cult, OD-FC-7/8) are still the owner's or the host's and stay.
- **V6 — J380's summary of this note uses two phrases that are the later lens design's, not the note's.** J380
  (`docs/PROGRESS.md:439`) says the view changed so that "the religion lens reuses the territory hinterlands instead of
  a second projection" and "draws the host's unconsumed religious hierarchy first". The note never says "hinterland"
  (grep); its §9.5 item 6 proposes "the territory dots coloured by each owning settlement's patron — clearly a
  projection", and its §9.5 item 8 lists the hierarchy as drawable with no order — "hinterland fill" and "first" are
  `research/sf/lens-implications.md:202` and V13 §5.9 (6). The substance of J380's sentence holds (faith relational,
  spread dark by default, born worlds empty, pressure along links, no invented sites or movers; the counts 1,516 / 12 /
  17 hold). A journal row is append-only: J392 names it; no correction (ruling R22 below).

Checked and found sound, so nothing is deferred (the Opus-seat traps I looked for on a first read of a large host):

- Realm piety: `pulseKernel.js:1331` `realmPietyMult(..., { spread: isFaithSpreadEnabled(simulationRules) })`;
  `piety.js:311-312` returns 1 when `!spread` — "exactly 1.0 unless spread" holds; the ranges 0.65–1.65 / 0.825–1.325 /
  0.5–2.0 follow from the formulas.
- Preset bodies: QL spreads QUIET; RR FP_LIT_ALIVE + WAVES + ONE_REGEN (`:899-901`); DC OPEN + FP_LIT_ALIVE + FP_LIT_BELIEF +
  FP_LIT_WARPEACE + WAVES + ONE_REGEN (`:904`, `:956-963`); SC nothing; NC QUIET; LR FP_LIT_ALIVE + FP_LIT_BELIEF + WAVES +
  ONE_REGEN (`:999-1008`); FS as DC (`:1011`, `:1213-1221`). `faithSpreadEnabled`/`religionDynamicsEnabled` true only at
  `:940/:946` (DC) and `:1018/:1019` (FS); `commodityFlowEnabled` only `:896` (RR) and `:1081` (FS); `infoMode` set only
  `:953` (DC perfect_delayed), `:996` (LR perfect_delayed), `:1073` (FS full), default omniscient `:56`; `propagationMode`
  default first_order `:64`, QUIET local `:693`, OPEN full `:699`, SC off `:966`; `institutionLifecycleEnabled` false
  only `:978` (SC); `factionCompetitionEnabled` false `:870` (QL) and `:972` (SC); `warTerminationEnabled: false` `:1036`
  and `dispositionChannelsEnabled: false` `:1041` in FS alone; `demographicsEnabled: false` `:1170` (FS). Every §8 row
  I re-derived from these matches the note.
- The flag precedence: `simulationRules.js:1491-1495` legacy boolean wins, both keys written in lockstep;
  `isFaithSpreadEnabled` `:1573-1574` reads the legacy key first; the Living-World gate pair-writes both
  (`LivingWorldGates.jsx:258-261`), premium write gate `canManageCampaigns` (`:332`). "A DM can light spread on any
  campaign" holds.
- `infoModeOf` accepts `'full'` (`:1406`) while the comment at `:1509-1511` says it fails closed — the note's "stale
  normalizer comment" holds. `propagationDepthForRules` `:1578-1586`: off/local 0, first_order 1, else 2.
- The activation gate (`subsystemActivation.js:42-47`): any member with a patron embed or a non-empty cult list.
- The first-seed cult read: `ensureReligionState` reads `cultDeitySnapshots` only inside `if (!Object.keys(s.deities).length)`
  (`religionState.js:175-201`); `IMPOSE_CULT` writes config only (`mutateEntities.js:970-996`). Defect 1 holds.
- The patron clear: `setPrimaryDeity` with no ref deletes both config keys (`mutateEntities.js:935-941`); the re-assign
  branch is a no-op without `config.primaryDeitySnapshot` (`religionState.js:217-218`); the only writer of the config
  patron in apply is the conversion re-embed (`applyWorldPulse.js:196`, `:242`). Defect 2 holds, with F14's wording.
- The carrier table (§6.2) against `rg/graph.js:665-725` and `religiousContest.js:84-98`, `:314-350`: every cell holds
  (trade_partner mints trade_route and information_flow only; rival/cold_war resource_competition and information_flow;
  criminal criminal_corridor and information_flow; the `client` label flips to patron at `:671-674`).
- `neighbourIdsOf` (`:460-471`) takes every edge and every channel of any type and status — §6.5 holds; `spread ?
  neighbourIdsOf(...) : []` at `:733` — §3.5's "reaching is empty when spread is off" and §5.3's zero recognition hold.
- Default-gm channel types `rg/graph.js:93-97` include `religious_authority` — §6.3 holds.
- The §6.9 cadence estimate (≥ 9 ticks to turn 4 vs 96 into a 6-point lead at ≤ 6 points per tick, plus 3 held ticks;
  "roughly ten … three more … a season") is arithmetically sound and tagged [INFERRED].
- Contradictions with the owner's rules: none. Items 131–141 (16j) touch faith only through 132 (h) (a persistent site
  is an institution-like host record whose consequences reach the map as dossier events) and 133 (e) (DM secrets are
  the knowledge layers) — the note's "positioned sites would be map-side facts needing the owner's ruling and, to
  matter, a host adoption" and "suppressed creeds DM-only" are consistent with both, and J384 (10) then ruled as the
  note anticipated. Item 130 (14i) is the kernel's rulings and names no faith matter. The J-rows the note quotes (J375,
  J379, J380) are quoted verbatim apart from F32.
- Internal consistency: §1 (3)'s "with no consumer" attaches to `mapProfile`'s `regionalAuthority` output and holds
  after F33; §6.7's "conversions exist in every preset once a pantheon holds two faiths" follows from
  `religiousContest.js:995-996` (`state.patronRef !== prevPatron`, inside the local lane); §4.5's "a cult that wins four
  seats converts like a major" follows from the max(authored, earned) read.

## 4. Rulings on the file's own readings and rulings

The faith note makes no J-RR row and no "ruled" sentence of the session's own; its rulings are its readings of the
owner's J379/J380 questions (§1, §9.5, §9.6), its defect readings (§3.11, §6.2, §6.3) and the §12 "Found" claims. Each
verdict carries "chose X over Y because Z" and its consequence for the design texts.

| id | the reading in one line | verdict | reason | consequence |
|---|---|---|---|---|
| R1 | §1: the three things the owner named, as built — local and global rankings run in every preset with no flag; realm piety `g` is exactly 1.0 unless spread (DC, FS by default); conversions between settlements live in the SPREAD lane, lit by default in DC and FS only | UPHELD | chose the preset bodies over the flag comments because the comments overstate (F6) — `religiousContest.js:17-33`, `pulseKernel.js:1331`, `piety.js:311-312`, `simulationRules.js:940`, `:1018` | none: V13 §5.9 (6)'s three regimes (spread / seated / none) state it |
| R2 | §1: "each settlement's pantheon evolves as if it were the only faith-bearing settlement" is too strong for RR — five faith reads cross settlement lines there, none moving a believer | UPHELD | chose the code over its own comment because institution lifecycle (`:76`, false only in SC), first_order propagation (`:64`), tolerance drift, WAVES (`:900`) and `commodityFlowEnabled` (`:896`) all run in RR | none: V13's seated regime banner says "a patron's moral prescription and a fracture's unrest still do" |
| R3 | §1: two facts dominate — a born world has no deity; faith is relational, not geographic | UPHELD | `latentPantheon.js:1-31`, FOLD:351, `faithCarriersOut` reads only edges and channels, `mappedDistanceWeight` only attenuates (0.35–1.0) | none: V13 §5.9 (6)'s none regime and J384 (13) |
| R4 | §9.6 item 1: nothing moves in the default preset by default; the lens reads the campaign's resolved rule and opens in a still mode | UPHELD | chose the resolved rule over the preset id because the Living-World gate pair-writes the spread keys per campaign (`LivingWorldGates.jsx:258-261`) | none: J384 (13), V13 §5.8 (2)–(3), T-V13-47 |
| R5 | §9.6 item 2: born worlds are empty | UPHELD | FPQ-62 is the owner's open word; `NEW_CAMPAIGN_SIMULATION_PRESET_ID = null` (`:31`) | none |
| R6 | §9.6 item 3: the containment cap bounds tier changes, not spread | UPHELD | `pantheon.js:65-70`, `:368-392` (verifier-confirmed); nothing caps conversions per tick | none: J379.1 as amended by the rulings seat says so |
| R7 | §9.6 item 4: carriers are not routes; "hostile war fronts at 0.72, the strongest carrier"; pressure along links | AMENDED → "… including *hostile* war fronts at 0.72, the strongest two-way carrier (an overlord's authority channel reaches its vassal harder, at 0.82, one way) — and only patrons travel …" | chose the host's bundle strengths over the note's sentence because `rg/graph.js:679-680` mints `political_authority` 0.82 overlord → vassal and the carrier read takes a channel at its own strength (`religiousContest.js:336-342`); the note's §6.2 table already says so (V1) | V13 §5.9 (6) pressure row (C45); lens-implications §1.3 (C46); rulings record J379.1 text (C47); the note (C42–C44) |
| R8 | §9.6 item 5: dated receipts cannot name a source; a host ask is implied | UPHELD | `religiousContest.js:441`, `:1021-1022` (convert = source); `rg/graph.js:1008-1029` no deity field; no retire (verifier-confirmed) | none: H28 carries the ask |
| R9 | §9.6 item 6: no faith geometry; the host's settlement-grain labels may be drawn; positioned sites need the owner's ruling and a host adoption | UPHELD (since ruled by J384 (10)) | chose host labels over invented sites because temples have no coordinates and cults no location (verifier-confirmed; `religionLegitimacy.js:181-202`) | none beyond the dated bracket (C50): V13 §5.9 (6) hierarchy row, J-V13.95, R-V14-13 |
| R10 | §9.6 item 7: no movers — missionize is a trust nudge, WF-2 unbuilt, encounters would be invention | UPHELD | `settlementStrategy.js:762-765`; `envoyErrandVocabulary.js:322-335` `built: false`; the errand spine "HELD DARK ON PURPOSE" (`simulationRules.js:779-781`) | none: J379.1 as amended ("no pilgrims, missionaries or inquisitors as movers until the host runs them") |
| R11 | §9.6 item 8: the host already has a resistance term; `cultureDistance` (faith 0.30) is read by migration, contraband and the foreign-seat weight, relief reuses the axes | UPHELD | `cultureDistance.js:45`; `migrationKernel.js:230`; `smuggle.js:176`; `rulingPowerSeat.js:361-371`; `generosityKernel.js:319-334` (rulings seat J382(a)/J384(2) read the same) | none |
| R12 | §9.6 item 9: a sea carrier is new simulation, outside a lens | UPHELD | the owner answered "yes" (J382 (c)); `faithCarriersOut` reads no lane | none beyond the dated bracket (C51, C52); T-V13-54 pins it |
| R13 | §9.6 item 10: the player view is narrow — fronts gm by default, believed faith only in DC/LR/FS on canon, a seated pantheon shown to every viewer | UPHELD | `rg/graph.js:93-97`; `beliefMap.js:204-209`; infoMode presets (`:953`, `:996`, `:1073`); `faithPanelModel.js` "what a FREE or shared render consumes" | none: V13 §5.9 (6) audience column |
| R14 | §9.6 "What stays as J379 had it" (mixtures not borders; ruler-versus-populace; occupation conversion; suppressed creeds DM-only; no new simulation) | UPHELD | each is host-backed as the note cites (§7.1, §6.8, `worldSnapshotPublic.js` hard-denies `religionStates`) | none |
| R15 | §9.5 what a lens could add (items 1–8) and must not do | UPHELD, item 3 AMENDED → "… using the host's exported carrier and ungated-reach functions (`faithCarriersOut`, `buildFaithReach`); the spread lane's gated reach is internal and must be sent by the host or exported first" | chose the export list over the note's wording because a map copy of an internal host function is a map-invented derivation (lens-implications' four classes; V13 §5.8 (4)) (V2) | the note (C48); none for V13, whose pressure row reads only the host's sent weight |
| R16 | §6.14 [INFERRED]: a lens reads the frozen digest and live facts, writes neither, recomputes what the host discards rather than storing it as host truth | UPHELD | the frozen-versus-live law (`research/sf/fp-simulator.md` §0, verifier-confirmed) | none: V13 §5.8 (8) plates |
| R17 | §3.11's three defects (post-seed cult never admitted; a patron clear leaves stale state and ledgers; a demotion leaves an over-capacity pantheon) | UPHELD (F14's and F15's wording applied) | `religionState.js:175-201`, `:211-231`; `mutateEntities.js:935-941`; `applyWorldPulse.js:196`, `:242`; capacity consulted only at `:199`, `:319-330` (verifier-confirmed) | none: the host-requirements document (J391 (6)) should carry them as the six system reads' §10 defects — the session's, not this lane's |
| R18 | §6.2: "Enemies carry faith hardest … may be unintended" | AMENDED → "Enemies carry faith hardest of the two-way carriers …" | as R7 (V1) | the note (C44); the §10.3 question reworded (C43) |
| R19 | §6.2 [INFERRED]: a legacy plural `trade_partners` edge would not carry | AMENDED → holds only for an edge read raw; a graph rebuilt from the links canonicalizes every label (`rg/graph.js:462`, `:481`, `:498`) | chose the sync's code over the inference because the inference cited only the bundle (V3) | the note (C49a, C49b); no design text carries it |
| R20 | §6.3 [INFERRED, not executed]: a suggested discovery candidate could pin a later pulse mint at `suggested` | UPHELD as a tagged inference | both producers mint one id (`rg/graph.js:159-173`) and a merge keeps the prior status (`:562-600`) — verifier-confirmed; not executed, said so | none: a host matter |
| R21 | §12's "Found" claims where the verifier was itself partly wrong (P7: contraband is RR and FS, not DC, and needs canon; P9: the ripple's season is a data gate; P12: generosity and the cohesion weave do not import `cultureDistance`) | UPHELD | `simulationRules.js:896`, `:1081` (no DC line); `pulseKernel.js:570-575` and `spatialArrival.js:56-58` (verifier re-checked); `generosityKernel.js:319-334` reads the axes itself | none: V13 §5.9 (6) and lens-implications already carry RR+FS on canon |
| R22 | J380 (`docs/PROGRESS.md:439`), the session's summary of this note: counts; "the view changed: … reuses the territory hinterlands instead of a second projection, shows pressure along links, draws the host's unconsumed religious hierarchy first, and invents no holy sites, pilgrims or source-named flows …" | AMENDED → the counts and the substance hold; "reuses the territory hinterlands" and "first" are the later lens design's words (lens-implications :202, V13 §5.9 (6)), where the note proposes the territory dots coloured by patron "clearly a projection" (§9.5 item 6) and lists the hierarchy with no order (§9.5 item 8) | chose to name the mismatch over letting the row stand as the note's summary because a reader of J380 would look for "hinterlands" in the note and not find it (V6) | none to a design text; a journal row is append-only — J392 names it |

## 5. Corrections

One row per fragment; each `old` was checked to occur exactly once in its file (script in the scratchpad,
`retro/faith-corrections.json`, 67 fragments, 0 misses). Kinds: research (applied in place; a "[Fable-reviewed
2026-10-18: …]" bracket where a sentence is replaced rather than deleted), design (V13 — the Apply stage records it as an
amendments item), record (the rulings record; not a journal row). The bundle `docs/ARCHITECTURE-FULL.md` regenerates
from the volume and is not listed.

| id | kind | file | old | new | reason |
|---|---|---|---|---|---|
| C1 | research | `research/sf/faith-system.md` | [STATED `wp/moralInstitutionPressure.js:52`] | [STATED `wp/moralInstitutionPressure.js:55`] | F1 accepted: :52 is the years-scale founding comment; the week statement is :55. |
| C2 | research | `research/sf/faith-system.md` | are stale (§10, item 9). | are stale (§10, item 4). | F2 accepted (WRONG cross-reference): the stale 'stored verbatim' comments are §10.1 item 4; item 9 is the PHASE55/COUPLINGS distance row. |
| C3 | research | `research/sf/faith-system.md` | `:354-400`; `src/copy/deityAuthoring.js:24-49`]. | `:354-400`]. | F3 accepted (UNSUPPORTED): deityAuthoring.js:24-49 is the base form; the file names no characterAxes, boon, bane or authoredTemper (grep) — the note's own §6.13 grep already said so. |
| C4 | research | `research/sf/faith-system.md` | - `domain` is one word; war/conquest/hunt/harvest are mechanical (war-bar pressure), the rest display only. | - `domain` is one word; war/conquest/hunt/harvest carry a war-bar pressure that is mechanical only under WR-2's `dispositionChannelsEnabled` (lit in no preset, §7.2; `src/copy/deityAuthoring.js:45` tells the author so), the rest display only. | F4 accepted: deityEffects.js:150-175 reads 'With disposition channels active'; the flag is false in FS and absent elsewhere (simulationRules.js:1041). |
| C5 | research | `research/sf/faith-system.md` | (`dispositionChannelsEnabled` false) [OBSERVED `wp/simulationRules.js:1037`] | (`dispositionChannelsEnabled` false) [OBSERVED `wp/simulationRules.js:1041`] | F5 accepted: the key is at :1041; :1037 is a comment line. |
| C6a | research | `research/sf/faith-system.md` | **"Spread is the ONLY faith dynamic still gated by a rule flag | **"This is the ONLY faith dynamic still gated by a rule flag | F6 accepted in the words: simulationRules.js:92-93 reads 'This is the ONLY'. |
| C6b | research | `research/sf/faith-system.md` | [STATED `wp/simulationRules.js:90-100`; `wp/religiousContest.js:24-33`] | [STATED `wp/simulationRules.js:90-100` (the quoted words at `:92-93` and `:97`); `wp/religiousContest.js:24-33`] | F6 amended in the range: the note's :90-100 is the comment block and stays; the verifier's :89-100 is off by one (:89 is settlementStrategyEnabled). |
| C7 | research | `research/sf/faith-system.md` | a patron's fall — VACUOUS on every born world" | a patron's fall — which is VACUOUS on every born world" | F7 accepted: FOLD:351 reads 'which is VACUOUS'. |
| C8 | research | `research/sf/faith-system.md` | `docs/DESIGN_TRADITIONS.md`; | `docs/DESIGN_TRADITIONS.md` (not located under `docs/` at `81f1cd96`; cited by code headers such as `wp/traditionsKernel.js:3`); | F8 accepted: the file does not exist in the host; only code headers and docs cite it. |
| C9a | research | `research/sf/faith-system.md` | The store resolves the authored row, mints an account-scoped identity `deity:<scope>:<slug>`, and embeds a **frozen | The store resolves the authored row, mints a stable identity `deity:<scope>:<slug>` (the code's word is account-scoped: scope = the deity's own `localUid`, the authoring account's local token, falling back to `id`; `src/lib/customRegistry.js:111-141` [Fable-reviewed 2026-10-18: the two files cited below embed the snapshot, they do not mint the ref]), and embeds a **frozen | F9 amended: the mint is customRegistry.js:133-141, not deitySnapshot.js or deityCommitEmbed.js (grep); 'account-scoped' is kept because it is the code header's own word (:112), with the scope defined. |
| C9b | research | `research/sf/faith-system.md` | ref minting, and the internals of the distance calibration. | ref minting (read in the retrovalidation: `src/lib/customRegistry.js:111-141`, §2.2), and the internals of the distance calibration. | F9 consequence: §11.4 no longer lists the mint as unread. |
| C10a | research | `research/sf/faith-system.md` | [OBSERVED `src/generators/institutionProbability.js:88-91`, `:139-146`; `src/generators/steps/resolveConfig.js:74`]. | [OBSERVED `src/generators/institutionProbability.js:88-91`, `:139-146`; default 50 at `src/generators/steps/resolveConfig.js:192` and `src/store/configSlice.js:29` (`:74` is the Random-mode roll)]. | F10 accepted: resolveConfig.js:74 is rng.randInt(5, 95); the default 50 is :192 and configSlice.js:29. |
| C10b | research | `research/sf/faith-system.md` | - Above 55 with a religious institution, the economy gets a static "Church Tithes" income line; above 68 on a road or | - Above a derived religion influence of 55 (the slider × crime, economy, church and stress modifiers, `src/generators/priorityHelpers.js:421-427`; tested at `economicState.js:227`, `:241`) with a religious institution, the economy gets a static "Church Tithes" income line; above 68 on a road or | F10 accepted: the 55/68 thresholds test the derived religionInfluence, not the slider. |
| C11 | research | `research/sf/faith-system.md` | marker [OBSERVED `src/generators/economy/economicState.js:226-248`; `src/data/resourceData.js:399-411`; | marker (`pilgrimage: !0`, `src/data/resourceData.js:409`, carried at `src/generators/resourceGenerator.js:386`); a cathedral, monastery or pilgrim institution also opens a "Pilgrimage & religious tourism" export chain [OBSERVED `src/generators/economy/economicState.js:226-248`; `src/data/resourceData.js:399-411`; | F11 amended: the marker's cites added; computeActiveChains.js:935-938 kept only with the words it supports (the export chain), which the sentence did not name. |
| C12 | research | `research/sf/faith-system.md` | challenge counters reset, | the flip-challenge counter (`patronChallengeTicks`) resets (`contestedTicks` and the siege fields do not), | F12 accepted: religionState.js:224-225 resets only patronChallengeTicks. |
| C13 | research | `research/sf/faith-system.md` | moves one share point between the patron and | moves one share point between the rite's dedicated deity (`rec.deityRef`, stamped from the patron when the rite was founded, `src/domain/traditions/genesis.js:181`; a non-patron after a conversion) and | F13 accepted: traditionsKernel.js:791-795 keys on rec.deityRef, applied :471-482. |
| C14a | research | `research/sf/faith-system.md` | and a later organic flip re-embeds a patron the DM removed (`wp/applyWorldPulse.js:195-197`) | and a later organic flip re-embeds a patron on a settlement whose patron the DM cleared (`wp/religiousContest.js:1012-1023` → `wp/applyWorldPulse.js:195-197`; the cleared deity itself only if it wins) | F14 accepted: the flip re-embeds the NEW patron. |
| C14b | research | `research/sf/faith-system.md` | Further consequence found: a later organic flip re-embeds a patron the DM removed (`wp/applyWorldPulse.js:195-197`). | Further consequence found: a later organic flip re-embeds a patron on a settlement whose patron the DM cleared (`wp/applyWorldPulse.js:195-197`). | F14 carried into the §12 M11 row. |
| C15a | research | `research/sf/faith-system.md` | compromise exists, `wp/pulseKernel.js:1829-1830`). | compromise exists or a cause-lifecycle ledger is already held, `wp/pulseKernel.js:1828-1829`). | F15 accepted: the gate is memoryState.causeLifecycle !== undefined \|\| anyCompromise. |
| C15b | research | `research/sf/faith-system.md` | cause lifecycle runs when a compromise exists (no further flag traced) | cause lifecycle runs when a compromise exists or a cause-lifecycle ledger is already held (`wp/pulseKernel.js:1828-1829`; no further flag traced) | F15 carried into the §8 row. |
| C16a | research | `research/sf/faith-system.md` | conversion-fracture severity 0.5 × piety (`:1016`); | conversion-fracture severity 0.5 × piety (`wp/religiousContest.js:1016`); | F16 accepted: the bare :1016 inherited religionState.js (794 lines). |
| C16b | research | `research/sf/faith-system.md` | `religious_authority` mint × `g` (`:610`); | `religious_authority` mint × `g` (`wp/religiousContest.js:610`); | F16 accepted: religionState.js:610 is a doc comment; the mint is religiousContest.js:610. |
| C17 | research | `research/sf/faith-system.md` | conduct drift or alignment, secularization or revival) for the panel [OBSERVED `wp/piety.js:284-294`]. | conduct drift or alignment; secularization or revival is pushed by the fold) for the panel [OBSERVED `wp/piety.js:284-294`; `wp/religiousContest.js:956-958`]. | F17 accepted: the sink cause is pushed at religiousContest.js:958. |
| C18a | research | `research/sf/faith-system.md` | `:250-254`, `:287`, `:451` | `:269-275`, `:287`, `:451` | F18 accepted: severityFor is rg/propagation.js:269-275; :246-256 is impactId. |
| C18b | research | `research/sf/faith-system.md` | (`rg/propagation.js:198-201`, `:250-254`) | (`rg/propagation.js:198-201`, `:269-275`) | F18 carried into the §12 M17 row. |
| C19 | research | `research/sf/faith-system.md` | − clergy scandal drag (0.16 × scandal) | − clergy scandal drag (0.16 × (taint + 0.6 × revealed taint) × a court modifier 0.5–1.5; `wp/religionLegitimacy.js:131-133`, `:515-517`) | F19 accepted; constants verified at :131-133 (0.16, 0.6, 0.5). |
| C20 | research | `research/sf/faith-system.md` | × 30 × alignment fit × piety composite | × 30 × alignment fit (when propping; erosion ignores fit, `wp/religionState.js:772`) × piety composite | F20 accepted: fitFactor = base >= 0 ? fit : 1. |
| C21a | research | `research/sf/faith-system.md` | its only other mention is a path string | its only other mentions are a comment and a path string | F21 accepted: couplingRegistryGrammar.js:148 names it in a comment. |
| C21b | research | `research/sf/faith-system.md` | in `src/domain/certification/couplingRegistryGrammar.js:186`]. | in `src/domain/certification/couplingRegistryGrammar.js:148`, `:186`]. | F21 accepted. |
| C22a | research | `research/sf/faith-system.md` | "standing" is the local rank word; the same five band words are shared [STATED | "standing" is the local rank word [OBSERVED `wp/religionState.js:51-53`]; the same five band words are shared [STATED | F22 accepted: the local-rank sense is code, not FOLD:427. |
| C22b | research | `research/sf/faith-system.md` | FOLD:427; `docs/DESIGN_FP_INFORMATION.md:342`]. | FOLD:427 (which, as written, gives the belief axis the noun "standing (believed devotion)", colliding with the code's local-rank "standing"); `docs/DESIGN_FP_INFORMATION.md:342` ("devotion" names the belief axis — the register this note keeps)]. | F22 accepted with the collision named: FOLD:427 and INFORMATION:342 give the belief axis different nouns; the note follows INFORMATION and the code. |
| C22c | research | `research/sf/faith-system.md` | - "piety" (substrate scalar) vs "devotion" (believed axis) vs "standing" (local rank) [STATED FOLD:427]. | - "piety" (substrate scalar) vs "devotion" (believed axis) [STATED `docs/DESIGN_FP_INFORMATION.md:342`; FOLD:427 words it "standing (believed devotion)"] vs "standing" (local rank) [OBSERVED `wp/religionState.js:51-53`]. | F22 carried into §7.8. |
| C23 | research | `research/sf/faith-system.md` | (REWORK:29, :37) | (REWORK:30, :38) | F23 accepted: the niche statements are REWORK:30 and :38. |
| C24 | research | `research/sf/faith-system.md` | FAITH:624-732; ARCH_WF:446-500; FOLD:369]. | FAITH:624-732; ARCH_WF:446-500; FOLD:369; the return leg at COUPLINGS:856, :1816]. | F24 accepted: no return/migration statement in the cited ranges (grep); COUPLINGS:856 and :1816 carry it. |
| C25 | research | `research/sf/faith-system.md` | cooldowns and caps [STATED PHASE4:337-350]. | cooldowns and caps [STATED PHASE4:337-350, :382-383]. | F25 accepted: flip margins, cooldowns and caps are PHASE4:382-383. |
| C26 | research | `research/sf/faith-system.md` | is dark [STATED COUPLINGS:866-871]. | is dark [STATED COUPLINGS:880-882 for the bait; FOLD §2's INFORMATION row (:338) for the status: IN-2 lure, `lureCommission` no caller]. | F26 accepted: the bait is under ADDS at COUPLINGS:880-882; the status is FOLD §2. |
| C27a | research | `research/sf/faith-system.md` | COUPLINGS' "faith spreads at carrier | COUPLINGS' "Spread moves at carrier | F27 accepted: the phrase is not in COUPLINGS; :344 reads 'Spread moves at carrier reach;'. |
| C27b | research | `research/sf/faith-system.md` | reach" omits the built distance attenuation entirely | reach" (COUPLINGS:344) omits the built distance attenuation entirely | F27 accepted; the citation added on the sentence's second line. |
| C28 | research | `research/sf/faith-system.md` | UNBUILT [STATED `docs/DESIGN_FP_ARCH_WC.md:697-705`; FOLD §3.1.6]. | UNBUILT [STATED `docs/DESIGN_FP_ARCH_WC.md:6138-6139` (`wc_homecoming`, WC-14) for the words; FOLD:267 (§3.1.6) for the status]. | F28 accepted: ARCH_WC:697-705 is the deity-doctrine compliance paragraph. |
| C29 | research | `research/sf/faith-system.md` | famine or war relief to a relationship partner | aid to a relationship partner in food need (grain relief, warning, credit, refuge, purchase or trade overture; `wp/generosityKernel.js:10-14`, `:89-90`, `:487-492`; there is no war relief) | F29 accepted: the mover asks only for settlements in food need; its six instruments carry no war relief. |
| C30 | research | `research/sf/faith-system.md` | contributor sentence "map should render hierarchy" (`:205-224`; | contributor sentence "map should render hierarchy" (`:205-231`, the sentence at `:228`; | F30 accepted: the sentence is mapProfile.js:228. |
| C31 | research | `research/sf/faith-system.md` | 2.2-wide directed line between the two settlements' placement points, with a midpoint dot, | 2.2-wide line between the two settlements' placement points, with a midpoint dot and no arrowhead (the channel is directed; the drawing does not show it), | F31 accepted: RelationshipEdges.jsx:185-200 draws a plain line and a midpoint circle. |
| C32 | research | `research/sf/faith-system.md` | routes from dated receipts" cannot be read | routes from dated host receipts" cannot be read | F32 accepted: PROGRESS.md:438 reads 'from dated host receipts'. |
| C33a | research | `research/sf/faith-system.md` | \| ✓ \| ✓ \| ✓ \| ✓ \| ✓ \| ✓ \| ✓ \| BUILT, unconsumed \| | \| ✓ \| ✓ \| ✓ \| ✓ \| ✓ \| ✓ \| ✓ \| BUILT; `regionalAuthority` unconsumed, the typed links reach only the AI grounding payload (`src/domain/aiGrounding.js:441`) \| | F33 accepted: aiGrounding.js:441 puts deriveRegionalGraph(settlement) into the grounding payload; regionalAuthority has no production consumer. |
| C33b | research | `research/sf/faith-system.md` | derived from the authored neighbour list; settlement grain; no consumer today \| | derived from the authored neighbour list; settlement grain; `regionalAuthority` has no consumer, the typed links only the AI grounding payload (`src/domain/aiGrounding.js:441`) \| | F33 carried into the §9.4 row. |
| C33c | research | `research/sf/faith-system.md` | \| none (derived; unconsumed) \| | \| none (derived; `regionalAuthority` unconsumed, the typed links read by AI grounding only) \| | F33 carried into the §9.3 row (the verifier did not name this third site). |
| C34 | research | `research/sf/faith-system.md` | `src/copy/deityAuthoring.js:74`, `:105-106`, `set/faithPanelModel.js:12-14`, `src/domain/display/publicSafe.js:73-75` | `src/copy/deityAuthoring.js:74`, `:105-106`, `src/domain/display/publicSafe.js:73-75` | F34 accepted (WRONG list member): faithPanelModel.js:11-14 says only that the model never reads config.latentPantheon. |
| C35 | research | `research/sf/faith-system.md` | at its seat; its read side is deliberately unwired [OBSERVED `wp/momentum.js:296-312`, `:387-406`]. | at its seat, gated momentum ∧ beliefs ∧ faith spread (`wp/momentum.js:390-395`; momentum rides WAVES in RR, DC, LR and FS, beliefs need canon and a non-omniscient infoMode, spread is lit by default in DC and FS — so DC and FS on canon, LR only if the DM lights spread); its read side is deliberately unwired [OBSERVED `wp/momentum.js:296-312`, `:387-406`]. | F35 accepted with the preset membership verified (WAVES spread at simulationRules.js:900, :961, :1007, :1220; momentumEnabled :721). |
| C36 | research | `research/sf/faith-system.md` | history text still uses generic deity names and named Christian orders (§2.5) | history text still uses generic deity names (§2.5; `src/generators/historyGenerator.js:212`) and named Christian orders (`:215`) | F36 accepted: §2.5 names only the generic {deity} slot; the orders are historyGenerator.js:215. |
| C37 | research | `research/sf/faith-system.md` | `sp/cultureDistance.js:46`, `:170-172` | `sp/cultureDistance.js:45`, `:170-172` | F37 accepted: W_FAITH is :45. |
| C38 | research | `research/sf/faith-system.md` | **"The Schism realm arc exists"** (FAITH:1327) — it does not. | **"The Schism realm arc exists"** (FAITH:1327) — it does not. (ARCH_WF:270, :418 and FAITH:1327 already carry the fold's 2026-10-16 CORRECTED brackets; FAITH:1498 and ARCHITECTURE:1991 do not.) | F38 accepted: three of the five cited lines are already corrected in place. |
| C39 | research | `research/sf/faith-system.md` | 0.30 + 0.12·clash \| `wp/religionState.js:62-71` \| | 0.30 + 0.12·clash \| `wp/religionState.js:62-71`; the 0.12 is `STANCE_TUNING.CONTEST_METHOD`, `wp/deityStance.js:71`, applied `wp/religionState.js:553` \| | F39 accepted: the 0.12 lives in deityStance.js. |
| C40 | research | `research/sf/faith-system.md` | stains the new patron with 0.45 heresy [OBSERVED `:997-1004`]; | stains the new patron with 0.45 heresy [OBSERVED `wp/religiousContest.js:997-1004`]; | F40 accepted: the bare range followed a heraldRouting.js cite (768 lines). |
| C41 | research | `research/sf/faith-system.md` | `disp/settlementRumors.js:1018-1050` | `disp/settlementRumors.js:1018-1049` | F41 accepted: the file has 1,049 lines. |
| C42 | research | `research/sf/faith-system.md` | 0.72, the strongest carrier — and only patrons travel. | 0.72, the strongest two-way carrier (an overlord's authority channel reaches its vassal harder, at 0.82, one way; §6.2) [Fable-reviewed 2026-10-18: was "the strongest carrier", contradicted by §6.2's own table] — and only patrons travel. | Own finding V1 (WRONG as an absolute): the vassal bundle mints political_authority 0.82 and military_protection 0.70 overlord → vassal (rg/graph.js:679-680), both faith carriers (religiousContest.js:94-97, :336-342); the note's §6.2 table says so and §9.6 item 4 contradicts it. |
| C43 | research | `research/sf/faith-system.md` | - Should hostile relationships carry faith at 0.72, the strongest carrier? | - Should hostile relationships carry faith at 0.72, the strongest two-way carrier (only an overlord's authority over its vassal, 0.82 one way, is stronger)? | Own finding V1 carried into §10.3. |
| C44 | research | `research/sf/faith-system.md` | **Enemies carry faith hardest**: any `hostile` relationship mints war_front channels | **Enemies carry faith hardest of the two-way carriers**: any `hostile` relationship mints war_front channels | Own finding V1 carried into §6.2's bullet, whose comparison names only the alliance and trade strengths. |
| C45 | design | `docs/volumes/V13-world.md` | a war front — hostility carries hardest — a garrison, an authority | a war front — hostility carries harder than any alliance or trade tie; only an overlord's authority over its vassal carries harder, and one way — a garrison, an authority | Own finding V1 reached V13 §5.9 (6)'s pressure row through lens-implications §1.3 and J379.1; the host's vassal authority channel (0.82, overlord → vassal) is a faith carrier stronger than a war front (0.72). The bundle docs/ARCHITECTURE-FULL.md:76766 regenerates from the volume. |
| C46 | research | `research/sf/lens-implications.md` | war_front 0.72 (hostility carries hardest) | war_front 0.72 (hostility carries hardest of the two-way carriers; an overlord's authority channel reaches its vassal at 0.82, one way) | Own finding V1 carried into the lenses note's faith row, which cites FAITH §6.2 (the lenses lane's file; the finding originates here). |
| C47 | record | `docs/validation/retrovalidation-2026-10-18/rulings.md` | (never flows on routes; hostility carries hardest) | (never flows on routes; hostility carries hardest of the two-way carriers, an overlord's authority over its vassal harder still, one way) | Own finding V1 reached the rulings record's J379.1 AMENDED text; the record is not a journal row and may be corrected. |
| C48 | research | `research/sf/faith-system.md` | lane's gated reach and `buildFaithReach`'s ungated one. | lane's gated reach and `buildFaithReach`'s ungated one [Fable-reviewed 2026-10-18: only `faithCarriersOut` (`wp/religiousContest.js:314`) and `buildFaithReach` (`:361`) are exported; the spread lane's gated reach (`:596-653`) is internal to `advanceReligionStates`, so a lens may recompute the carriers and the ungated reach by the host's own functions, and the gated reach only once the host exports it (a host ask) — V13 §5.9 (6) draws pressure only from the host's sent weight]. | Own finding V2: a map re-implementation of the internal reach would be a map-invented derivation under the four-class rule (lens-implications §1.5; V13 §5.8 (4)); the note's item implied both reaches were exported. |
| C49a | research | `research/sf/faith-system.md` | - [INFERRED] A legacy plural `trade_partners` *edge* would not carry, because the carrier check matches the raw label | - [INFERRED] A legacy plural `trade_partners` *edge* would not carry when read raw (the `snapshot.relationships` fallback, `wp/religiousContest.js:327`, or an edge normalized without the sync, `rg/graph.js:204`), because the carrier check matches the raw label [Fable-reviewed 2026-10-18: a graph rebuilt from the saves' links canonicalizes every edge's label, `rg/graph.js:462`, `:481`, `:498`, so such an edge carries there] | Own finding V3 (overstated inference): the sync at rg/graph.js:452-500 writes liveType = canonicalRelationshipLabel(...) onto every edge it builds or refreshes. |
| C49b | research | `research/sf/faith-system.md` | while only the channel bundle canonicalizes it (`rg/graph.js:670-672`); the trade bundle mints no carrier channel. | while the channel bundle canonicalizes it (`rg/graph.js:670-672`); the trade bundle mints no carrier channel either way. | Own finding V3, the sentence's second half. |
| C50 | research | `research/sf/faith-system.md` | positioned sites would be map-side facts needing the owner's ruling and, to matter, a host | positioned sites would be map-side facts needing the owner's ruling and, to matter, a host [Fable-reviewed 2026-10-18: ruled by J384 (10) under the owner's delegation — holy places and hidden cult sites enter only as DM-placed world sites tagged with a deity, DM-only by default, offered to the host; never generated] | Own finding V5: the question the note left open was answered after it was written; the bracket keeps the note from reading as still open. |
| C51 | research | `research/sf/faith-system.md` | Coastal footholds across water would be a host change, outside a lens. | Coastal footholds across water would be a host change, outside a lens. [Fable-reviewed 2026-10-18: the owner answered "yes" to the session's reading — faith gets no sea carrier (J382 (c)).] | Own finding V5: answered by the owner's J382. |
| C52 | research | `research/sf/faith-system.md` | - Should the contest read **seasons, travel time or sea lanes** | - Should the contest read **seasons, travel time or sea lanes** [Fable-reviewed 2026-10-18: no sea carrier for faith — the owner's J382 (c)] | Own finding V5 carried into §10.3. |
| C53 | research | `research/sf/faith-system.md` | minting a fact the host does not hold? Same question for map-side holy sites. | minting a fact the host does not hold? Same question for map-side holy sites. [Fable-reviewed 2026-10-18: holy sites answered by J384 (10) — DM-placed, deity-tagged, never generated; the catchment drawn only as the set the host sends (V13 §5.9 (6), T-V13-54; J379.1 as amended in the rulings record).] | Own finding V5 carried into §10.3. |

Counts: 67 fragments — 65 research (64 in `research/sf/faith-system.md`, 1 in `research/sf/lens-implications.md`, the
lenses lane's file, listed because the finding originates here), 1 design (`docs/volumes/V13-world.md` §5.9 (6) pressure
row), 1 record (`docs/validation/retrovalidation-2026-10-18/rulings.md` J379.1 text). Journal rows: J380's two phrases
(R22) are named for J392 and not edited.

## 6. Verdict and notice replacement

**Verdict: PASS-WITH-CORRECTIONS.** The note's conclusions hold at `81f1cd96`: the four-layer account, the lit/dark
status by preset, the three defects, the map-lens consequences and the ten J379 corrections. The corrections above make
it sound: 41 verifier findings (38 accepted, 3 amended, 0 rejected) and three findings of my own (the "strongest carrier"
overstatement, which also reaches V13 §5.9 (6) and the rulings record; the exported-reach qualifier; the edge-label
inference), plus dated brackets on the questions the owner has since answered.

**Notice replacement** (the one line that replaces the file's "PENDING FABLE REVIEW — written by Opus 5.5 standing in for
the Fable seat research/sf-faith …" notice):

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — conclusions hold; citations, quotes and the "strongest carrier" overstatement corrected in place (lane retrovalidation/faith; J392)
