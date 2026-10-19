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
