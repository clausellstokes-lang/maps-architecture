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
