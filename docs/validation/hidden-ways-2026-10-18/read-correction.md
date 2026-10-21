# hidden-ways/read-correction — the delta reader (Opus/high), started 2026-10-19 02:26

Seat: the delta reader of the correction run (J415). Inputs: the corrected request `docs/host-requests/2026-10-18-hidden-ways.md`
(REQ:n; 47 lines, md5 `45612fdd…`) against `docs/host-requests/2026-10-18-hidden-ways-v1.md` (REQv1:n; 47 lines, md5 `251c96a9…`);
the v1 reply `docs/HOST-REPLY-HIDDEN-WAYS-2026-10-18.md` (RPL:n; md5 `a181541f…`, byte-identical to `reply-v1.md`), draft w
`docs/validation/hidden-ways-2026-10-18/draft-w.md` (DW:n; md5 `0b15e315…`, byte-identical to `draft-w-v1.md`), `synthesis.md` §1
(SYN:n; md5 `74f5027c…`); V13 `docs/volumes/V13-world.md` (V13:n; md5 `e68af748…`, unchanged since the v1 run), V14
(md5 `f5dd37a7…`), the host document HRQ (md5 `7db37cc1…`). Tags: [STATED] the cited text says it; [OBSERVED] checked in the
repository; [INFERRED] this reader's reading. No git run; nothing applied; no host code read.

## 0. Progress
- 02:26 stub; `diff` run: the two files differ in exactly two lines, REQ:33 (§C) and REQ:35 (§D); every other line (1–32, 34, 36–47)
  is byte-identical [OBSERVED: `diff` output `33c33`, `35c35` only].

## 1. The diff, sentence by sentence

### 1.1 REQ:33 (§C, the reveal and the legend) — the four v1 sentences kept verbatim, three sentences appended

Kept (REQv1:33 = REQ:33's first four sentences, byte-identical) [OBSERVED]:
- C0.1 "A lens rule: an unknown way is undrawn; a known way draws in the way's own style with the knowing town's mark; a way the DM reveals draws for the party's view."
- C0.2 "The legend says hidden ways exist and are known per town (true), never how many there are (a leak)."
- C0.3 "The host sends `way_known(settlementId, wayId, how, tick)` through the events window when it lights; until then the layer is map-only, like patrols."

Added (REQ:33 only) [OBSERVED]:
- **c1 (office).** "One more source of knowing, added 2026-10-18 evening: a town whose public-security office is held by a warden-type person (a ranger or border-warden, custom content on the host side) knows every way inside that office's jurisdiction as part of the job — the host sends those as `way_known` with `how: 'office'` and withdraws them if the office changes hands to someone without the trade; the map treats them like any other known way." (REQ:33)
- **c2 (lapse).** "Knowledge also LAPSES: a town's learned ways fade unless used or watched (the host's own decay), so the host will send `way_forgotten(settlementId, wayId, tick)` and the map returns that way to undrawn for that town — knowledge of a way is a state with a lifetime, not a permanent reveal." (REQ:33)
- **c3 (partial).** "Learning is also PARTIAL: a town may know a prefix of a way's nodes ("as far as the ford"); if your record can draw a partial way (the known segment only), say so — otherwise the host sends the way as known only when the whole of it is." (REQ:33)

Reading notes [INFERRED]: (n1) c1's "withdraws them" names no event: whether the withdrawal is a `way_forgotten`, a retraction of the `way_known` row, or a new `how` is not said — the map need not care (either is the latest row per (town, trod) at the log head), but the reply should say both are read the same. (n2) c2's "for that town" keeps the lapse per (settlement, way); it says nothing of the party's view — the DM's reveal (C0.1's third clause) is untouched by c2. (n3) c3's unit is "a prefix of a way's nodes" — the host's word "nodes"; the request offers a fallback (whole-only) so c3 is a capability question, not a demand. (n4) c3's "prefix" is directional: a prefix from which end is not said (a town near junction `b` would know a suffix); the record's ends are `a`/`b` (DW:107 `a: Id; b: Id`).

### 1.2 REQ:35 (§D, the lifecycle) — the whole paragraph replaced

v1 (REQv1:35), three sentences, all REMOVED [OBSERVED]:
- D1v1 heading "**D. Interaction with your route lifecycle (ENC-HP-13) and detours (ENC-HL-10).**"
- D2v1 "A way is never promoted to a road by the map on its own; a road that decays to "overgrown" in the host's ledger does not become a way."
- D3v1 "If you want a way to be born where a road dies, say so — the host has no such law and would rather not mint one."

Corrected (REQ:35), seven sentences [OBSERVED]:
- **d0 (heading).** "**D. Interaction with your route lifecycle (ENC-HP-13) and detours (ENC-HL-10) — CORRECTED the same evening (the owner's word):**"
- **d1 (one ladder).** "the host WANTS the lifecycle, and it is one ladder, not two networks."
- **d2 (bottom rung).** "The host's road ladder ends in `hidden` (your ENC-HL-12 names it), so a hidden way is the ladder's bottom rung: an abandoned road decays through track and trail into a way; a way worn by bodies, smugglers and spies rises to a trail and, if a settlement adopts it, to a track and a road; a way nobody walks is lost to the wild; a new way forms where bodies keep crossing the same cover between road nodes."
- **d3 (candidates/rungs split).** "Your canon layer (A) supplies the CANDIDATE geometry — every way that could exist; the host's lived road ledger holds each way's RUNG, moved by use and disuse, and sends rung changes out through the window (`way_rung(wayId, rung, tick)`) for the lens to draw."
- **d4 (the law restated).** "So the map never promotes or retires a way on its own, and the host never invents geometry: you give the candidates, the host gives the life."
- **d5 (Q8).** "Question 8 for you: can your canon carry candidate ways that are not yet usable (rung `wild`), so the host can light them later without a new record?"

What reverses [INFERRED]: D2v1's second clause ("a road that decays … does not become a way") is reversed by d2 ("an abandoned road decays through track and trail into a way"); D3v1's "would rather not mint one" is reversed by d2's "a new way forms" and d1's "WANTS the lifecycle"; D2v1's first clause survives as d4's "the map never promotes or retires a way on its own", now paired with "the host never invents geometry". New words on the wire: `way_rung(wayId, rung, tick)` (REQ:35), the rung `wild` (REQ:35), `way_forgotten(settlementId, wayId, tick)` (REQ:33), the how-value `'office'` (REQ:33).

Reading notes [INFERRED]: (n5) the rung words are not listed: d2 names the ladder's words in prose — road, track, trail, way (= `hidden`), wild — and REQ:35's `rung` field is unenumerated; `hidden` (REQ:10, 35) and "way" (d2) both name the bottom usable rung; whether the host sends `hidden` or `way` as the rung word is not said. (n6) the ladder's upper words *road*, *track*, *trail* are the map's route class words (V13:786 `'highway'|'road'|'track'|'trail'|'sea'|'river'`) and the host's grade words "among" them (V13:788) — one word, one meaning is kept only if a trod at rung `trail` means "drawn and walked like a trail", not "a WorldRoute of class trail" (h1). (n7) "highway" is absent from the host's ladder in d2 (road is its top). (n8) d2's "an abandoned road decays through track and trail into a way" concerns a host edge (a `WorldRoute` with a host key), d2's "a way … rises to … a road" concerns a trod — two directions over two record kinds; d1's "one ladder, not two networks" is the host's model, not a demand that the map merge the records (h1/h2). (n9) d2's "a new way forms where bodies keep crossing the same cover between road nodes" + d3's "every way that could exist" + d4's "the host never invents geometry" ⇒ the forming is the host lighting a candidate the map already laid (h3; Q8). (n10) Unchanged lines that the correction re-reads: REQ:9–12 (the rules), REQ:17 (knowledge per town), REQ:44 (Q7: "200–2,000 ways" — now "every candidate" bears on it), REQ:47 (tokens `hidden` and `way`).

## 2. What each change contradicts (X) or extends (E) — the sentences that must change

Locations: RPL:n the reply; DW:n draft w's line, with its item and the item's target line in V13/V14/HRQ/INDEX/SUMMARY; SYN §1.n the
synthesis decision. Every quote below is verbatim [OBSERVED].

### 2.0 Housekeeping the correction forces in every deliverable
- RPL:3 "(47 lines, md5 `251c96a9…`; cited REQ:n)" and DW:9 "(47 lines, md5 `251c96a9…`)" — the request is now md5 `45612fdd…`
  (still 47 lines); `251c96a9…` is the -v1 file's [OBSERVED md5sum]. **E** (re-cite; REQ:n lines are unchanged in number).
- RPL:113 quotes a sentence that no longer exists: "the request itself keeps the two things apart ("a road that decays to
  'overgrown' … does not become a way", REQ:35)". **X** (d2 reverses it).

### 2.1 c1 (office) — EXTENDS decisions 6/7, RPL §5, item 956 (g), H32 (a)
- RPL:298–299 "`cause` your how-word through the vocabulary table (a patrol's catch, an operative's map, …; the field V13 reserves
  for "the host's cause word", V13:837)" — **E**: add `office` among the how-words; nothing else changes (any how value rides
  `cause` through the adapter folder's vocabulary table, DW:131 item 956 (g) → V13:837).
- RPL:76 "`cause` your how-word" (§1 Q5) — **E** (same).
- c1's withdrawal "if the office changes hands" — no v1 sentence answers it; **E**: RPL §5 must say the withdrawal is read like any
  lapse (c2), whichever form the host sends (a `way_forgotten`, or a retraction of the office-sourced `way_known` row).
- SYN §1.6/§1.7 — unchanged in substance; c1 adds a sentence, no ruling.

### 2.2 c2 (lapse; `way_forgotten`) — EXTENDS decisions 6/7; CONTRADICTS the "retracted by the windowed replace" reading
v1 modelled forgetting as a **retraction** of the knowledge row; c2 sends forgetting as a **new dated event** with its own tick.
V13's retraction is the windowed replace's withdrawal of a fact from a window ("the fold adds, supersedes and retracts — a retraction
is a forward event, never an undo target", V13:2534–2535) — the host's undo/resume path, not a dated "the town forgot at week w"
[STATED V13:2530–2535; INFERRED the difference]. Sentences that must change:
- RPL:76–77 "retracted by the windowed replace when your ledger forgets (V13:2530–2535)" — **X**.
- RPL:300–301 "Its retraction is the windowed replace (V13:2534) when your ledger forgets." — **X**.
- RPL:369–370 (§7 H32 (a)) "a town's knowledge of a trod sent as the events-window row above" — **E** (+ `way_forgotten`).
- DW:297, item 959 (b) → V13:1875 (W7 (13) **Knowledge**): "with its resolved audience, retracted by the windowed replace" — **X**.
- DW:596, item 964 (c) → V13:3906 (H32 (a)): "and retracted by the windowed replace when its ledger forgets" — **X**.
- DW:722, item 968 (b) → HRQ:84 (H32 plain words): "a retraction is forgetting." — **X**.
- DW:563, item 963 (e) → V13:3751 (T-V13-60): "and a retracted event removes the pin" — **E** (add: a later forgetting event
  for the same (seat, trod) removes the pin from its week on; a re-learning restores it).
- DW:456, item 961 (b) → V13:3149 (the `events` row): "`WorldEvent`s by kind at their place up to the view's `lensWeek`" with the
  knowledge clause — **E**: a knowledge pin draws from its learning event until a later forgetting event of the same (seat, trod)
  at or before `lensWeek`; today's row would draw every past knowledge event forever [INFERRED from V13:3149's "up to the view's
  `lensWeek`"].
- DW:866, item 969 (i) → SUMMARY:74 "unknown to every town until the campaign says one has learned it" — **E** (", and forgotten
  again when it fades").
- DW:811, item 969 (b) → INDEX:39 "unknown to every town until the host says a settlement knows one" — **E** (same).
- SYN §1.6 "a knowledge event never sets the state by itself" — stands; c2 confirms it (the party's `SecretState` is the DM's
  reveal apart; V14 admits a lowering `discovered` → `dmOnly` only as the DM's recorded act, V14:795–796) [STATED].

### 2.3 c3 (partial; a prefix) — EXTENDS decisions 6/7, the record (956 (e)), the event shape (RPL §5), the draw rule (961 (a)/(b))
No v1 sentence speaks of a partial way [OBSERVED: grep "prefix\|partial" over draft-w.md: 0 hits]. Sentences that must grow:
- RPL:295–301 the `way_known` shape ("`where: { kind: 'trod', trod }` by the trod's id … `radiusM` 0; … `at` placed at fold at
  the trod's midpoint") — **E**: an optional known-extent field; `at` at the midpoint is wrong for a prefix that stops short of it
  (place it at the known stretch's midpoint) [INFERRED].
- DW:121–126, item 956 (f) → V13:835 (`WorldEvent.at`): "placed at fold at the trod's midpoint vertex or the junction's point" — **E**.
- DW:135–140, item 956 (h) → V13:887 (`WorldWhere`): `trod?: Id; junction?: Id` with `fraction` — **E**: the known extent rides
  here or on the event (the synthesis to choose); `fraction` already exists on `WorldWhere` (V13:887) [STATED] but is a position,
  not an extent.
- DW:456, item 961 (b) and DW:449, item 961 (a) → V13:3148–3149 — **E**: the drawing rule for a known prefix (the line from the
  known end to the known station only, for an audience the knowledge admits; the rest undrawn).
- RPL:311–313 the legend sentence "Trods show only where a settlement is known to use one or the game master has revealed one;
  others may exist." — stands count-free; **E**: "or part of one" if the prefix draws [INFERRED].

### 2.4 d1–d4 (one ladder; candidates from the map, rungs from the host) — CONTRADICTS decision 10 and every sentence that carries it
- SYN §1.10 "LIFECYCLE (unanimous): never promoted; a demoted road stays a `WorldRoute` (DM-only ghost) and its junction stays; no
  trod born where a road dies (answer to D3: no); a road chartered across adds a `crossing` junction (B), one chartered along it
  supersedes the trod" — **X** (re-decide: "never promoted *by the map*" survives as d4; "no trod born where a road dies" and
  "a demoted road stays a … DM-only ghost" fall to d2 and h2; "chartered along it supersedes" may survive as h1's first option).
- SYN §1.1 "`hidden` TAKEN (the host's grade of a demoted overt road …)" — **E/X**: under d2 `hidden` is the ladder's bottom rung
  for both a decayed road and a way, so "the host's grade of an overt road only" is too narrow; "`kind: 'hidden'` refused" stands
  (kind is the width hint) [INFERRED].
- RPL:327–331 (§6) "**Never promoted by the map.** No `network` change word names a trod …; a trod has no class, so there is
  nothing to promote; the map lays no road along a trod. The one way a trod and a road meet in time runs the other way: **a road
  you charter along a trod's course supersedes the trod**" — **E** (the first clause stands as d4; "the one way … runs the other
  way" is X: the host now moves trods up the ladder).
- RPL:333–338 "**A decayed road never becomes a trod.** A road you grade `hidden` stays the same `WorldRoute` … drawn as a DM-only
  ghost with no patrol; … with no map record at all." — **X** in its heading and its drawing (h2); the geometry clause ("stays the
  same `WorldRoute`", V13:1813) can stand.
- RPL:340–344 "**Position on "a way born where a road dies" (REQ:35): no.** … because (i) you have no such law and "would rather not
  mint one"; (ii) … a trod beside it would be a second record of one thing; (iii) a trod's law is cover, not history" — **X**:
  reason (i) is withdrawn by the host (d1, d2); (ii) survives as the argument for h2 (no second record: the decayed road *is* the
  way, drawn by the way's rule, geometry the route's); (iii) survives (a candidate's law stays cover).
- RPL:111–115 (§2) "`hidden` stays your grade, with its one meaning on both sides" — **E** (one meaning kept: the bottom rung of
  the one ladder, on either record kind).
- RPL:13–14 "'hidden' is used only for the host's own road grade" — **E** (same).
- RPL:59–61 (§1 Q3) "a way born in geography that was never a road … is a **record of its own** outside `WorldRoute`" — stands for
  the candidates; **E**: say a hidden-graded road is the same rung on the other record kind (h2).
- DW:51, item 955 (c) → V13:2592 (law (9)): "*hidden* is the host's grade of an overt road only: a trod is never graded and a
  hidden road never a trod." — **X** (a trod now has a rung, the host's; and under one ladder a hidden road is the same rung).
- DW:65, item 955 (e) → V13:3317: "*hidden* is the host's road grade only" — **E/X** (same).
- DW:31, item 955 (a) → V13:140: "no patrol cadence on a trod; a decayed road never a trod and no trod born where a road dies." — **X**.
- DW:42, item 955 (b) → V13:374: "a trod is never promoted to a route and no trod is born where a road dies." — **X** (first clause
  survives only as "never promoted *by the map*"; the second falls).
- DW:254–255, item 959 (b) (c) → V13:1875: "the patch **asks** min(`perPatchMax`, ⌈patch km² ÷ `perRoughKm2` × (250 ÷ fineCellM)²⌉)
  trods and takes the candidates in rank order until that many are laid" — **X/E** under d3 + Q8 (every candidate the density rule
  admits laid, rung `wild` by default; h3).
- DW:278–285, item 959 (b) (g) → V13:1875: "unless the route runs along the trod's course …, when the trod is tombstoned: a road
  born supersedes a trod, never the reverse" and "the map never promotes a trod (no `network` change word names one, and a trod has
  no class to edit), mints no trod where a road dies (a road the host grades hidden is the host's own edge, the overgrown way its
  ledger describes, with its own key: two records would name one thing; and a trod's law is cover, not history), and turns no
  decayed road into a trod." — **X** in "has no class to edit" (it now has a host rung) and in the framing; the "two records would
  name one thing" argument is kept for h2; "never the reverse" is X (a demoted road at rung hidden is a way by d2).
- DW:617, J-V13.124 (item 965 (a) → V13:4028): "chose **a road born along a trod superseding it, a road chartered across it adding a
  `crossing` junction, a decayed road never becoming a trod, and no trod born where a road dies**, over a trod minted from a dead
  road, because the host has no such law and asks for none" — **X** (its "because" is withdrawn by REQ:35; re-decide).
- DW:779, item 968 (j) → HRQ:655 (ENC-HL-12): "never a route class and never the host's `hidden` grade (which stays a decayed overt
  road, drawn DM-only)" — **X** (h2).
- DW:534, item 963 (a) → V13:3720 (T-V13-59): "one chartered along it tombstones it; a demotion to hidden moves nothing" — **E**
  (the test clauses gain rung and candidate cases; "a demotion to hidden moves nothing" may stand for geometry).
- DW:283 "and a trod has no class to edit" + DW:51 "a trod is never graded" + the trod record's "no echo of a host fact"
  (V13:2435–2437, DW:400 "no knowledge") — **E**: the rung must be a folded host fact on the map's `Trod` (like `WorldRoute.grade`,
  V13:788) and absent from the simulator product (the host's own fact never echoed back) [INFERRED from V13:2435–2437].
- DW:91 item 956 (c) → V13:601 "for the DM every trod with V14 §5.1's state cue"; DW:408 item 960 (d) → V13:2503 "the DM audience
  every trod with its state"; DW:449 item 961 (a) → V13:3148 "with the layer on the DM sees every trod"; DW:610 J-V13.117 "on, the
  DM sees every trod" — **X/E** if `wild` is undrawn for every audience (h1); at the least the DM's view gains the rung.
- RPL:282–291 (§5 the layer rule) — **E** by the rung (a `wild` candidate drawn for nobody, or for the DM as a candidate only).

### 2.5 d5 (Q8) and the budget — EXTENDS RPL §1 Q7, §8, items 957 (b), 958 (e), 962
- RPL:89–96 (§1 Q7) "**7. … 200–2,000 ways?** *No.* … ≈ 16 ms of lay at the province rung (§8)" — **E** (the count is now every
  candidate, not the lived ways).
- RPL:221–222 "A province whose rough country is two fifths of its 64 000 km² asks at most ≈ 800 trods … a continent at most ≈ 7 200"
  and DW:173 item 957 (b) → V13:1137 (the same figures) — **E/X** (the asked count no longer bounds the laid set if every candidate is
  laid).
- RPL:391–396 (§8 table) and DW:223 item 958 (e) → V13:1362 "200–2 000 trods at the province rung add ≤ 40 KB at rest and ≈
  0.07–0.7 MB in memory" — **E** (re-count by candidates; the at-rest figure now also holds the rungs as host events).
- DW:509 item 962 (a) → V13:3591 (the W7c row 25 / 50 / 100 ms, "2 000 trods ≈ 2 × 10⁶ cells ≈ 16 ms") and DW:523 item 962 (c) →
  V13:3656 (`WORLD-18`) — **E** (§3.8 below: the 16 ms omits the rough pass, ≈ 10 ms at the province rung).
- No v1 sentence answers Q8 (the v1 reply answers seven questions, RPL:18 "## §1 The seven answers") — **E**: an eighth answer.

### 2.6 The milestone, the H rows and the owner question — EXTENDED
- RPL:82–87 (§1 Q6) "*M-W2, both, with B.* … re-declares it 8 → 9 pw" and DW:579–581 item 964 (a) → V13:3814 "9 pw (file w's trods ≈ 1
  pw … on the row's whole-week resolution" — **E** (h5: does the rung fold, the lapse and the prefix fit inside the +1 pw).
- RPL:360–363 (§7 M-W2 carries … "the knowledge events' fold") — **E** (+ forgetting, rungs, prefix).
- RPL:368–382 (§7 H32 (a)–(h)) and DW:596 item 964 (c) → V13:3906, DW:722 item 968 (b) → HRQ:84, DW:725–731 item 968 (c) → HRQ:577 —
  **E**: way_forgotten (H9's channel), way_rung (H9's or H12's — §3.6), the initial rungs at birth (§3.6), the prefix field, the
  `office` how-word in the vocabulary rows (f).
- RPL:380–382 "Nothing of H9, H12, H13 or H17 changes shape: the knowledge event is a new event kind in H9's channel" — **E** (two
  more event kinds; and H12 changes if rungs ride the network window).
- RPL:409–418 (§9.1 Q5) and DW:641–665 item 966 (c) → V13:4460, DW:842–848 item 969 (g) → INDEX:224, DW:889–903 item 969 (l) →
  SUMMARY:209 — **E** (the price if it moves; h6).
- RPL:438–452 (§9.3 premises stated back) — **E**: add the premises the correction brings (§3.9 below: `trail` is not on the host's
  recorded grade ladder; "never absence" and `wild`; "nothing is forgotten" and the lapse).

### 2.7 THE OWNER'S WORD 2 (J416, 2026-10-19 02:31Z / 02:33Z; not in the request) — the sentences it CONTRADICTS (X) or EXTENDS (E)
- RPL:21–22 (§1 Q1) "*Not for a host route, and it never will; the map's own road already ends at a junction at one end; the two-junction record is new and lands with M-W2.*" — **X** ("and it never will" falls: the owner opens the law; the answer becomes "today no — only the map's approach road; by the owner's word of 2026-10-19 the route record and the lay admit junction ends in the same milestone as the trods").
- RPL:31 "No host route gains a junction end; your legs still end at settlements." — **X**.
- RPL:22–24 the quotation of V13:1827–1828 as the standing law — **E** (quoted as the law being opened, with the owner's words).
- DW:108, item 956 (e) → V13:841, `Trod.a/b` "TrodJunction ids — each a point on a public land route's polyline …; never a seat id, never a host key" — **E** (the junction becomes the one junction kind shared with routes; the trod's ends still never seat ids).
- DW:115–118, item 956 (e), `TrodJunction` — **E** (generalized: arms naming a route or a trod; a route-end kind; the gate junction by `nearSeat`).
- DW:608, J-V13.115 "over … a `WorldRoute` of a new origin with two `join`s" — stands for the trod (a trod is still no route); **E**: a route's ends generalize beside it.
- V13:1827–1829 law (11), V13:786 `a`/`b`, V13:885 `RouteGenesis.edges`, V13:886 `NetworkChange`, V13:1792–1793 (5)'s trail, V13:3144 the routes row — the targets draft w must now carry (§3b G1–G14) [INFERRED].
- SYN §1.3 "No seat end" — stands for the trod; SYN §1.10 "a road chartered along it supersedes the trod" — survives as the organic path (h8), now lawful because the charter may name the trod's two junctions as its ends.

## 3. The facts in the volumes that bear on h1–h6

### 3.1 The route record and the host's grade word (h1, h2)
- F1. `WorldRoute { id; a: Id; b: Id /* its two ends: seat ids …; an approach road's … \`a\` its site's placement and \`b\` the public route it joins */; join?: { route: Id; atCm: WorldPointCm } … }` (V13:786) [STATED].
- F2. `class: 'highway'|'road'|'track'|'trail'|'sea'|'river' /* standalone: W7's rank class; bound: mapped from the host's grade */; grade?: string /* bound: the host's grade word, hidden among them */` (V13:788) [STATED] — the slot the request's rung word would occupy on a route already exists and is a host string; nothing types it.
- F3. The host's recorded ladder is `highway|road|track|hidden` (genesis grades, research/sf/fp-physical-integration.md:98; "the lived network with grades highway / road / track / hidden", research/sf/trade-system.md:636) and runs "down to `hidden`, never absence" (fp-physical-integration.md:99) [STATED]. **`trail` is not on the host's recorded ladder** and `wild` appears nowhere in research/sf [OBSERVED grep]; d2 (REQ:35) adds both. "highway" is on the recorded ladder but absent from d2 [OBSERVED].
- F4. On a bound world W7 lays genesis "with the host's grades: no pair selection, no rank classes, no trails to host seats" (V13:1805–1806) [STATED]: the map's class `trail` is a standalone artefact (read-v13-routes.md:167–169) [INFERRED there].
- F5. The map's trail is a public route: an approach looks for "a public land route of any class … highway > road > track > trail" (V13:1839–1840) [STATED] — so a trod at rung `trail` made a `WorldRoute` of class `trail` would become an approach target, a cost-surface discount (V13:1763) and a charter road (V13:762 "trail → path") [INFERRED]. This is the strongest line for h1's first option.
- F6. The trod record has no class and "no echo of a host fact": its only map-owned knowledge field is `secret` (DW:113, item 956 (e) → V13:841); "a settlement's knowledge of a trod is never on the record" (DW:113) [STATED in draft w]. A rung would be the record's first host-written field — the precedent is `WorldRoute.grade` (V13:788), a host word folded onto a map record [INFERRED].

### 3.2 The network change words (h1, h2, h5)
- F7. `NetworkChange { hostKey: string; kind: string /* … mapped by the adapter folder's network table to chartered, promoted, demoted, abandoned, revived, facet, bypass or retract */; grade?; avoids?; radiusM?; facet?; via?: WorldPointCm[] /* a charter's course hint */; week; window }` (V13:886) [STATED]. It is **keyed by `hostKey`**; a trod is "never a host key" (DW:108) [STATED] — so `way_rung(wayId, …)` cannot ride `NetworkChange` without a new field; it is an events-window kind like `way_known` [INFERRED].
- F8. `abandoned` is already a network word (V13:886) [STATED]; d2's "an abandoned road decays through track and trail into a way" is a sequence of `demoted` grades on one host key ending at `hidden` (V13:1813 "a demotion keeps the polyline; a revival restores the hidden one") [STATED; INFERRED the mapping].
- F9. "only `chartered` lays new geometry (its course hint honoured …)" (V13:1811–1812) [STATED] — the existing door for h1's first option (the host charters along a trod with the trod's course as `via`).
- F10. "a grade edit on a host route is refused (`refuse.world.hostRoute`)" (V13:1817) [STATED] — the map never moves a rung on a host route; the same law extended to a trod's rung keeps d4 [INFERRED].

### 3.3 The demoted road's drawing (h2)
- F11. Charter row `hidden?: boolean /* a road the host grades hidden: no public road, drawn DM-only */` (V13:764) [STATED].
- F12. "a hidden land road is a DM-only ghost and a hidden water lane a quiet-quay mark; … a hidden road counts as no public road" (V13:1815–1820) [STATED].
- F13. "a road the host demotes to hidden under a toll house raises `siteIncoherent` at the next window" (V13:2421) [STATED].
- F14. The `routes` view layer: "a hidden host road a DM-only ghost, a hidden water lane a quiet-quay mark" (V13:3144) [STATED].
- F15. Patrols: `gradeShift` "highway +1, road 0, track −1 (hidden: none)" (V13:1163) and "a road the host grades hidden: none" (V13:2065) [STATED via read-v13-routes.md:93; OBSERVED there].
- F16. A hidden road's drawing is DM-only for every town and the party alike; it carries **no per-town knowledge** (no field, no event) [OBSERVED: V13:764, 1815–1820, 3144 name only the DM audience]. Moving its drawing to the trod rule (known per town by `way_known`) changes the drawing, not the record: polyline, stations and key stay the route's (V13:1813 "a demotion keeps the polyline") [INFERRED]; the `where` of a `way_known` for a hidden road would need `kind: 'road'` with `edge` (V13:887 `WorldWhere` already has `'road'` and `edge?`) rather than `trod` [INFERRED].

### 3.4 The routes layer's style ladder (h1)
- F17. "highway 2 px solid, road 1.2 px, track 0.8 px dashed, trail 0.5 px dotted, sea 1 px dashed blue, river (navigable) a darker water line" (V13:3144) [STATED]; drawn "by class, or by the host's grade on a host-bound world" (V13:3144) [STATED]. No end mark and no junction mark exists in the row [OBSERVED].
- F18. The trods layer is a toggle beside `patrols`, with V14 §5.1's state cue per state (DW:449, item 961 (a) → V13:3148; SYN §1.6) [STATED in draft w]. A rung-styled trod can borrow the ladder's cues (dotted for way/trail, dashed for track) only if the cue does not say "public route" — today the trail cue (0.5 px dotted) *is* a public route's [INFERRED: one cue, one meaning].

### 3.5 Knowledge: knownTo and the three secret states (h4)
- F19. "Every world entity above carries `knownTo` … (`'public'|'local'|'secret'`), default `public` for physical facts …; **Host facts carry the host's resolved audience** (J-V13.77) … a fact the host hides is never sent; a host fact arriving with no resolved audience is stored DM-only" (V13:957–963) [STATED].
- F20. `SecretState { state: 'dmOnly'|'revealed'|'discovered'; since; cause }` — dmOnly: absent from every party key's `places`; revealed: the DM or the host added the anchor to the party's places; discovered: the party reached it (V14:763–766) [STATED]. A lowering `discovered` → `dmOnly` is only the DM's recorded act (V14:795–796, cited in §2.2 above) [STATED].
- F21. `events(world, window, events)` is a recorded windowed replace that "adds, supersedes and retracts — a retraction is a forward event, never an undo target" (V13:2530–2535) [STATED]; read-v13-lenses.md:162–163 records the same [STATED there]. A town's knowledge as "the latest `way_known` / `way_forgotten` per (town, trod) at the log head" is a fold over dated events of this store — no new store [INFERRED].
- F22. The `events` view row draws "`WorldEvent`s by kind at their place up to the view's `lensWeek`" (V13:3149) [STATED] — a pin drawn from every past knowledge event; c2 needs the row (or the trods layer's knowing-town mark) to read the latest per (seat, trod) at `lensWeek`, not every event up to it [INFERRED].
- F23. `WorldEvent.cause?: string /* the host's cause word … by the adapter folder's vocabulary table, when sent */` (V13:837) [STATED]; draft w routes the how-word through it (DW:128–132, item 956 (g) → V13:837). So c1's `how: 'office'` is one more vocabulary-table row on the adapter's side and nothing in the record [INFERRED]. The host's "warden" is already a host word in V13: H13 carries "its road closures and wardens' terms" (V13:3888, read-v13-lenses.md:285–286) and patrol coverage "a warden at least monthly" (research/sf/fp-realm-review.md:613) [STATED] — the office's jurisdiction is the host's, never the map's to compute [INFERRED].
- F24. The host's law "NOTHING IS FORGOTTEN" (research/sf/fp-physical-integration.md:159; read-host.md:26) [STATED] concerns its ledger; c2's lapse is a dated state change kept in the log, so the two agree — the map keeps every `way_known` and `way_forgotten` as facts, and only the drawing lapses [INFERRED].

### 3.6 The events window, H9 / H12 / H17 / H23 (h5)
- F25. H9: "the events window after every advance, undo and resume, committed facts only, keyed by the advance nonce …, with the resolved audience" (V13:3884; HRQ:68) [STATED] — the carrier of `way_known`, `way_forgotten` and `way_rung` on a trod: three event kinds in one channel; H9's text needs no change (read-v13-lenses.md:276–278 for `way_known`) [INFERRED].
- F26. H12: "route changes and grades per window" (V13:3887; HRQ:79) [STATED] — the carrier of a host road's decay to `hidden` (F8); unchanged by the correction [INFERRED].
- F27. H17: presentation messages, movers projected for the audience (V13:3892; HRQ:83) [STATED]; H23: the lens window "beside the events window", "and in the events window (H9) the dated events each lens reads" (V13:3898; HRQ:102) [STATED]. Neither carries rungs or lapses [INFERRED].
- F28. **The initial rung.** The trod record is born map-side with no rung field (DW:108–114); if every candidate is laid `wild` by default (h3), a host world's first lit rungs arrive as `way_rung` events after the record is read; nothing need be "sent at birth" [INFERRED]. On a standalone world no host sends rungs: the session must say what a standalone trod draws as (the v1 drawing, the DM's layer, rung absent) [INFERRED; open point O3].
- F29. HRQ's V13 line numbers are stale (H9 "line 3747" at HRQ:68, now V13:3884) [OBSERVED]; already in SYN §1.18 [STATED].

### 3.7 The trod record's ordered stretches and its unit (h4 c3)
- F30. `polyline: WorldPointCm[]; stations: Int32Array /* per vertex: cumulative effort-metres from \`a\` under the cost law's time terms */; vertexClass: Uint8Array /* per segment … */; lengthM; effortM; … layVersion: number /* bumped by every re-lay; the former course kept as a version */` (DW:111–112, item 956 (e) → V13:841) [STATED in draft w]. The record's own unit along a trod is the **station in integer effort-metres from `a`**, the same unit `TrodJunction.arms[].stationM` uses (DW:116) and `WorldRoute.stations` uses (V13:790) [STATED].
- F31. `routeFacts`' ordered stretches: "each a maximal run of one terrain class: integer metres, integer effort-metres and the class word — read at the call from the record's `stations` and `vertexClass`" (DW:392, item 960) [STATED in draft w].
- F32. `WorldWhere.fraction?: { num; den }` exists (V13:887) and draft w adds `trod?: Id; junction?: Id` (DW:135–140, item 956 (h)) [STATED]; a fraction is a position, an extent needs two (an end and a station) [INFERRED].
- F33. The request's unit is "a prefix of a way's nodes" (REQ:33) and "junction nodes on the overt route network" (REQ:24) [STATED]: a trod has two junctions, so "nodes" past the first can only be polyline vertices or stretch boundaries (a ford is a class boundary — a stretch end) [INFERRED]. A prefix from the `b` end is a suffix in the record's frame: the field needs the end it counts from [INFERRED]. A re-lay (layVersion, DW:112) moves stations; a known extent dated at week w reads against the lay version in force at w [INFERRED; open point O4].

### 3.8 §8's budget arithmetic (h3)
- F34. v1's asked count: one trod per 32 km² of rough country, ≤ 12 per patch, junctions ≥ 3 km apart (RPL:217); "A province whose rough country is two fifths of its 64 000 km² asks at most ≈ 800 trods …; a continent at most ≈ 7 200" (RPL:221–222; DW:173, item 957 (b) → V13:1137) [STATED]. The candidate set is the Urquhart edges of each patch's touch points with straight length in [2, 40] km (DW:251–254, item 959 (c) → V13:1875) [STATED]; laying "every candidate the density rule admits" means dropping the `perPatchMax` / `perRoughKm2` ask and keeping only the lay's drops (cost, open share, road hug) [INFERRED].
- F35. The time row: "≤ 10 ns × fine cells (the rough pass) + 8 ns × Σ ellipse cells (a 10 km trod's ellipse ≈ 960 cells …)", "≈ 16 ms (budget 25 ms)" at 2 000 (RPL:395; DW:509, item 962 (a) → V13:3591) [STATED]. Recomputed: the province rung is 1 280 × 800 = 1.02 × 10⁶ fine cells → the rough pass ≈ 10.2 ms; 2 000 × 960 × 8 ns ≈ 15.4 ms; **total ≈ 25.6 ms, already over the 25 ms cell**; the cell bears ≈ (25 − 10.2) ÷ 7.68 µs ≈ **1 900 trods** at the province rung [INFERRED arithmetic; the omission noted in §2.5 above]. Every candidate past ≈ 1 900 needs the row re-declared (or a lighter law for `wild` candidates).
- F36. Memory ≈ 350 B per 10 km trod (RPL:394); the host's record ≈ 410 KB at 2 000 trods with 2 500 junctions, "the size of your frozen-digest cap of 400 000 bytes (HRQ:840)" (RPL:396) [STATED]; the cap itself is at HRQ:912 ("capped at 400,000 bytes"), not HRQ:840 (which states the world record's 24 / 11 / 3 MB) [OBSERVED: a mis-citation in the v1 reply and SYN §1.12]. Every candidate multiplies both linearly (≈ 205 B per trod in the record); the record already sits at the host's cap at 2 000 [INFERRED].
- F37. In the file: "only secret states that are not `dmOnly`" (RPL:393); rungs and lapses are host events in the recorded events store (F21), so they count against the events store, not the trod record or its at-rest figure [INFERRED].

### 3.9 The milestone and the H32 row as draft w writes them (h5, h6)
- F38. M-W2 today: 8 pw (V13:3814) [STATED]; draft w: "9 pw (file w's trods ≈ 1 pw — W7 (13), the record, the layer, the secret states and T-V13-59 – 60 — on the row's whole-week resolution" (DW:579–581, item 964 (a) → V13:3814) [STATED]. The rung fold, the lapse fold and the prefix draw are folds and draw rules over existing stores (F21, F25) — inside the +1 pw's "knowledge events' fold" (DW:581) at whole-week resolution unless the candidate lay's budget re-declaration (F35) or the junction generalization (§3b) adds work [INFERRED].
- F39. H32 as draft w writes it: "with M-W2 (the trod record), after H9, H12 and H17 … (a) its knowledge of a trod per settlement sent as a dated event of the events window … and retracted by the windowed replace when its ledger forgets; … (f) its register rows for `trod`, `junction` and the kind words `goat`, `drove`, `broad`, `hidden` kept for its grade and `way` minted on neither side" (DW:596, item 964 (c) → V13:3906) [STATED]. Under the correction (a) gains `way_forgotten` and the office how-word, a new clause names `way_rung` with its rung words (and `wild`), (f) gains the rung words' register rows, and "`hidden` kept for its grade" now means the bottom usable rung on either record kind [INFERRED].
- F40. The owner question: one (Q5: the price +1 pw, staged row 38–46, the product order; DW:641–665, item 966 (c) → V13:4460; RPL:409–418) [STATED]. Under the correction a candidate count above the budget cell (F35) or above the host's digest cap (F36) is a session ruling (a budget re-declaration), not an owner decision; the junction generalization's price (§3b) changes Q5's figure, not its question [INFERRED].

## 3b. THE OWNER'S WORD 2 (J416) — the facts that bear on h7–h9

- G1. The ends: `a: Id; b: Id /* … seat ids …; an approach road's \`a\` its site's placement and \`b\` the public route it joins */; join?: { route; atCm } /* an approach road only */` (V13:786) [STATED] — `b` already holds a route id on one origin, and `join` is a singular junction; no record has a typed junction id [OBSERVED].
- G2. The approach road's join: the A\* runs to "the nearest fine cell carrying a public route of class ≥ `minClass`" (V13:1846–1847), "simplified at `routeToleranceM`, ending at the **junction** (the joined route's polyline point nearest the path's last cell)" (V13:1849–1850), written with "`b` the joined route, `join` the junction" (V13:1851–1852) [STATED]. **No stretch split**: the joined route stays "byte-identical" (V13:1844, said of `along`; the approach road is laid with no edit to the joined route, V13:1851–1853) [STATED; OBSERVED no split]. The "stretch split at the junction node" of the brief is not in V13; the station on the joined route is draft w's `TrodJunction.route.stationM` (DW:115) [STATED in draft w].
- G3. `SiteApproach { …; atCm?: WorldPointCm /* … road: the approach road's junction */ }` (V13:841) [STATED]; `routeToleranceM` 60 m (V13:1135) [STATED].
- G4. Re-join: an approach road "whose joined route is removed, or re-classed below its row's `minClass`, re-joins the nearest qualifying public route or its site's approach reads none" (V13:1860–1861); "a hidden road no public road" (V13:1839) [STATED]. **h9's "the junction stays when the joined route is demoted" contradicts this precedent** for the approach road; a route junction must choose (keep, as h9 asks, or re-join, as V13:1860 does) [INFERRED; open point O6].
- G5. The law to open: "**Legs end at settlements.** On a host-bound world every host route ends at two host settlements; a site, a proposal or a junction is a position along a route, never an end of a host route (the map's own approach road, (12), ends at it), so dropping or removing a site changes no route's geometry, effort or number of legs" (V13:1827–1829) [STATED]; and "A placed frame's exits are W7's terminals: a highway or road meets the town at its gate station after `exitRunM` through the margin" (V13:1829–1830) [STATED] — the gate station is frame geometry (door 1), so "a settlement's gate station is a junction too" can only be the seat's key at the world scale (draft w's `nearSeat`, DW:118), never the station's frame point [INFERRED].
- G6. The site guarantee survives: sites stay positions along a route (V13:1827–1829) — the opened law adds junction ends and does not make a site an end [INFERRED].
- G7. `toward: Id | null /* the next host settlement along the route, never a site, a proposal or a junction; on an approach road … the next host settlement along the route it joins from its junction, the nearer by land effort, ties by the lower key */` (V13:763) [STATED] — the reuse for a junction-ended route's charter road row [INFERRED].
- G8. `RouteGenesis { lawVersion; edges: { hostKey; a: string; b: string; mode; grade }[]; week }` (V13:885) [STATED] — ends are host strings (seat keys); a junction end needs a form (a route's host key and a station, or a world point snapped within `routeToleranceM`) [INFERRED]. `NetworkChange` has no end fields at all — a charter's pair is encoded in `hostKey` ("the host's edge key, the pair and the mode", V13:786) — and carries `via?: WorldPointCm[]` (V13:886) [STATED]: a junction-ended charter needs an end field on `NetworkChange` [INFERRED].
- G9. `TimeDeltaReceipt.legs: { a: string; b: string; foot; army; … }` (V13:888) [STATED] — legs are seat pairs and their times are the host's; a junction-ended route is not a leg, the host composes legs over its network (V13:1797–1802 "never enter a time") [INFERRED].
- G10. The standalone selection: seats are the nodes (V13:1756); the cost surface's `existingRoute` multiplier "when `b` already carries a public route … (the share of cells that gain a second route is what makes roads converge …)" (V13:1763–1764); Urquhart pairs (V13:1770–1775); A\* per edge in descending rank "so later roads ride earlier ones" (V13:1780–1786); drops over `maxCostFactor` (V13:1788–1790); classes (V13:1791–1793) [STATED]. **Convergence exists today as cell overlap**, never as a typed junction: two seat-to-seat routes ride the same cells as two records [INFERRED] — the fork rule turns the overlap into a junction end.
- G11. **A junction-ended route already exists on a standalone world, untyped:** "every seat still unjoined after the passes gets a `trail` to its nearest routed cell (one Dijkstra to the route set)" (V13:1792–1793) [STATED]; "That end is a routed cell, not a seat, yet `b` is typed 'seat ids'" (read-v13-routes.md:35–38) [INFERRED there]. The generalized end types it; the fork rule generalizes (5)'s trail rule from "unjoined seats, class trail" to "any seat whose detour is within a bound" [INFERRED].
- G12. The rule-table rows the fork rule sits beside: `RouteLayRule { existingRoute; portOnly; classes: { primaryShare }; routeToleranceM; maxCostFactor; sea; exitRunM }` (V13:1009–1010); defaults `classes.primaryShare` 0.3 (V13:1134), `routeToleranceM` / `maxCostFactor` 60 / 6 (V13:1135) [STATED] — the fork bound (a detour ratio) and its terrain terms would be new `world.routeLay` cells (V13:503, 1131) [INFERRED].
- G13. The time row W7a + W7b: "Σ over edges of the search ellipse's cells … 60 ms | 200 ms | 520 ms" (V13:3591) [STATED]; a fork test is one Dijkstra to the route set per seat (the trail rule's cost, V13:1793) beside its own A\* [INFERRED].
- G14. The routes layer draws no end or junction mark (V13:3144) [OBSERVED]; the trods layer's junction mark is draft w's (DW:449, item 961 (a)) [STATED in draft w]; the legend row for a junction is new [INFERRED].
- G15. **The model to generalize:** `interface TrodJunction { id; at: WorldPointCm /* a point on the route's polyline */; route: { id; hostKey?; stationM /* integer effort-metres from the route's \`a\` */ }; arms: { trod: Id; stationM }[] /* sorted by trod id */; kind: 'end'|'crossing'; nearSeat?: { placement; hostKey? } }` (DW:115–118, item 956 (e) → V13:841) [STATED in draft w]; its identity "(`junction`, the joined route's lineage, its fine cell) — a re-lay of the route that keeps the cell keeps the junction; one that moves it re-joins within `rejoinM`" (DW:194, item 957 → V13 §2.5) [STATED in draft w]. Generalizing it: `arms[].trod` becomes an arm naming a route or a trod; `kind` gains the route-end meaning; the record keeps one host route at `route` [INFERRED].
- G16. J-V13.115 chose `Trod` "over … a `WorldRoute` of a new origin with two `join`s, because a trod has no seat, no host key, no leg, no class, no patrol and no charter road — every reader of `WorldRoute` would need an exclusion" (DW:608, item 965) [STATED in draft w] — it stands under h7: a junction-ended *route* keeps a class, a key, patrols and charter roads, so it stays a `WorldRoute`; only its ends generalize [INFERRED].
- G17. **Words.** `fork` is TAKEN: V13's counterfactual fork (`forkAt`, V13:261; J-V13.21 at V13:3936; 44 whole-word hits) and the host's "fork" = its copy of the old map generator (HRQ:28) [OBSERVED]. `spur` is a terrain feature (V13:4064 "hill, spur") [OBSERVED]. `junction` is V13's world word already (V13:1850; 14 hits) and the base's frame word for street junctions (ARCHITECTURE.md: 117 hits) and V14's (V14:1037, 1047) — one word in two frames, which SYN §1.1 accepted for the world sense [OBSERVED]. `trace`/`traces` is TAKEN (V13:3143 the `traces` layer, 47 + 16 hits) [OBSERVED]; `trod`/`byway` 0 hits in V13, V14, the base and HRQ [OBSERVED]. So the owner's "join, fork, or diverge" stay prose in the owner-rule block; a junction's kind value must not be `fork` [INFERRED].

## 4. What the readers' records already answer
- read-v13-routes.md:16–47 answers Q1 as of v1 (host route cannot end at a junction, V13:1827–1828; the approach road ends at one; no record has two junction ends; the gate station is door 1; the milestone M-W2) — **its "A host route cannot" (:18) is the sentence the owner's word 2 opens** [STATED there].
- read-v13-routes.md:35–38 the standalone trail's untyped non-seat end (G11) [STATED there].
- read-v13-routes.md:85–98 and :160–169 the class table: trail a public route; `hidden` a grade, not a class; the host ladder `highway|road|track|hidden` (FPI:98); "never absence" (FPI:99) [STATED there].
- read-v13-routes.md:171–187 the approach-road precedent: what a junction-ended line shares and where it differs [STATED there].
- read-v13-lenses.md:158–163 law (3) truth only and the windowed replace (adds, supersedes, retracts) [STATED there]; :200–224 the knowledge kind's lens grammar (known to ⟨seat⟩ since week n) [STATED there]; :274–290 the H rows (H9 carries the knowledge event with no text change; H23 the presence rows; H13 the wardens' terms; H32 recommended) [STATED there].
- read-host.md:19–43 (F1–F5) the host's `hidden` rung = the decayed "overgrown road", "Law 5 NOTHING IS FORGOTTEN", and V13's existing carriage of the hidden grade (V13:764, 788, 1811–1820, 1163, 3737, 3144) [STATED there]; :78–79 (F12) ENC-HP-13 "Roads that rise, decay and become hidden" [STATED there].
- None of the three readers covers c1–c3, `way_rung`, `wild`, Q8 or the owner's word 2 (they predate both) [OBSERVED].

## 5. Open points for the synthesis
- O1. `way_rung`'s rung vocabulary is unenumerated (REQ:35) and `trail`/`wild` are not on the host's recorded ladder (F3): the reply should ask the host to send the rung words through the adapter's vocabulary table and state which word the bottom usable rung carries (`hidden` or `way`; the latter is TAKEN map-side).
- O2. h1: F5 (a trail is a public route to approaches, the cost surface and charters) argues for "a trod stays a trod at every rung below road; at road the host charters a route along it (`chartered` + `via`, F9) and the map supersedes the trod"; the rung cue must not reuse the public trail's dotted 0.5 px (F17–F18).
- O3. A standalone world has no host to send rungs (F28): say whether its trods draw as v1 (DM layer, no rung) or carry a map default.
- O4. c3's extent: station (effort-metres) from a named end (`a`|`b`) is the record's unit (F30); a re-lay moves stations — read the extent against the lay version in force at the event's week, or send it as a fraction (F32).
- O5. The budget: 2 000 trods already exceed the 25 ms cell by ≈ 0.6 ms once the rough pass is counted (F35); "every candidate" needs the cell re-declared or a `wild`-candidate lay that is cheaper; the host's record sits at its digest cap at 2 000 (F36).
- O6. h9 vs V13:1860–1861: an approach road re-joins when its joined route is removed or re-classed below `minClass` (a hidden road is no public road, V13:1839); h9 keeps a route junction when the joined road is demoted. Decide whether the approach road's rule changes to match, or the two differ by origin.
- O7. `NetworkChange` and `RouteGenesis` need a junction-end form (G8): a route host key + station, or a world point snapped within `routeToleranceM` (60 m, V13:1135).
- O8. Synthesis decision 2 (`narrow`) was superseded by §2.1's `goat` (synthesis.md:37) — any re-issue of §1 should carry the ruling forward [OBSERVED].
- O9. The v1 reply (RPL:396) and SYN §1.12 cite the host's 400 000-byte digest cap as HRQ:840; it is HRQ:912 [OBSERVED] — fix in the revision.
- O10. Line-number note for §2: DW:131 there means item 956 (g) at DW:128–132 [OBSERVED].

## 6. Verification
Every V13, V14, HRQ, RPL and DW line cited in §3–§3b re-read against the files at the md5s of the header (V13 `e68af748…`, V14 `f5dd37a7…`, HRQ `7db37cc1…`, RPL `a181541f…`, DW `0b15e315…`) at 02:40 [OBSERVED]; the arithmetic in F35 is this reader's own [INFERRED]. LANDED.
