# Verify — volumes V09, V10 after repair round 3 (coherence/verify-vol-V09-V10-r3t)

> PROGRESS: P1 done (inputs) · P2 done (round-2 findings re-checked) · P3 done (every round-3 block in scope read whole
> as a pre → live word diff) · P4 done (mechanical checks) · report written; result next.

Seat: opus verifier (stand-in), PENDING FABLE REVIEW. Design files untouched.

## P1 Inputs

* Live: `docs/volumes/V09-application.md` sha256 `cfe4df19…` (4 953 lines), `docs/volumes/V10-clerk.md` `382ea60e…`
  (3 533 lines) — assemble-r3's after hashes; base `docs/ARCHITECTURE.md` `593c657d…`, INDEX `90e2844a…`.
* Before round 3: git `920d280` (V09 `23398a30…`, V10 `6efb987b…`, base `4ed292e9…`, INDEX `1774db18…`) — assemble-r3's
  before hashes.
* Round-2 findings: `results/coherence_verify-vol-V09-V10-r2t.json` (9 issues). Rulings: `adjudication-r3.md` R3-01 – R3-03,
  R3-04, R3-06, R3-08, R3-13, R3-16, R3-21, R3-23, R3-24, R3-26 and Part H · V09, V10, scope, rendering (END lines).

## P2 Round-2 findings re-checked against the live text

| id | owner | Part H | verdict | evidence (live) |
|---|---|---|---|---|
| VV910-r2-01 | V09 | FIX, amended per R3-23 (b) (closes VDC2-05) | FIXED as amended | §4.21.14 (4) l.3695–3701: the commonest kind live at that moment (band holds `yearWeek`; under `light: 'time'` its hours hold the view's hour, §6.1); none live → starts none, button disabled with `settings.weather.noneNow` "No weather comes here at this time of year or day.", never a silent no-op (§7.8); dust-haze clause gone; (1) "enabled while the effects are on and a weather kind is live ((4))"; §4.9 `settings.weather.<word>` adds `noneNow`; row 93; T-V9-87 (heat shimmer; the disabled button; T-V11-48). Second end: V11 §3.25.11 *The commonest kind* l.4659–4661 agrees |
| VV910-r2-02 | V09 | FIX per R3-21 (b) | FIXED | §4.21.7 (2) l.3380–3384 is the required sentence word for word; row 94 "the drawn week moves, the Season control and its switch staying as the viewer left them (§11.3)"; T-V9-77's clause; J-V9.148 drops the host clause. Base end: §11.3 l.16513 (`view.set { week }`: §2.9's `week` … never `yearWeek`/`seasonFollow`) |
| VV910-r2-03 | V10 | FIX | FIXED | V10 l.1024 (§2.13 `FindAnswer.chips[].id`), l.1978 (§3.9b (7)), l.2266 (§3.13 step 4) read "a place, an area (V01 §5.4's `FindArea`), a person or an institution"; prompt rule 20 (l.1278) adds people and institutions |
| VV910-r2-04 | V09 | FIX, amended per R3-16 (b) | FIXED as amended | §4.21.12 (4) l.3605–3607: units from the look's `districts` in §11.2's `looks` reader, never a call to V01 on the main thread; (5) l.3617–3619 **Show** frames a `disaster` look by the union of its units' `FindArea` shapes (V01 §5.4 (6)); §1b's crisis-lines row names the input; base `LooksAnswer.crises[].districts` l.16165; V10 l.1010's citation now reads `LooksAnswer.crises[].districts`. One residual of the same class is new: VV910-r3-01 |
| VV910-r2-05 | V09 | MERGED into VV34-r2-13 (FIX per R3-16 (c)) | CLOSED (VV34-r2-13 fixed) | §4.21.13 (3) l.3668–3673 is the required text; §5.8's `plan` section "at the building's own level"; T-V9-86's last clauses (own-level rows; the look named by `info.crisis.*`, V10 §3.23 C10); §1b's and §2.12's damage rows: the look's level to the plan panel only |
| VV910-r2-06 | V10 | FIX | FIXED | V10 l.1492 (§3.5 step 3) and l.2363 (§3.16 `dossier` row) read "V10 §4.1's T1 `intend` row" |
| VV910-r2-07 | scope | FIX | FIXED | INDEX l.33 "C4's Find content (the find form and read) at M5's exit"; §16's M3c row l.19991 "V10 §8's exits (C4's item-120 content — the find form and read — landing with M5's exit)" |
| VV910-r2-08 | V09 | FIX per R3-16 (d) | FIXED | §4.21.12 (5) l.3618–3622: the card's line on V10's `drawer` entry (`ClerkHandle.send(text, 'drawer')`, no attachment), the clerk reading the look by `read_map { kind: 'look' }` (V10 §3.9b (8); prompt rule 21) |
| VV910-r2-09 | V09 | FIX per R3-24 | FIXED | §4.21.10 (7) l.3503–3506 adds each change of §2.9's `week` and passes the query's `week`; (8) l.3518–3522 states the frame restriction in the required words; (3) lists at the drawn week; row 87's edge and outcome; T-V9-83 (e)'s scrub clause; §2.12's and §1b's index rows. Ends: base §11.2 `gazetteer` `week?` l.16120; V10 §3.9b (7)'s read passes the week (END, l.1983–1987), V10 §3.23 row 32, T-V10-51 |

All nine round-2 findings are closed (eight FIXED as ruled, VV910-r2-05 closed by its merge target's fix). Every END
line Part H gives V09 and V10 is written (P3 lists each).

## P3 Round-3 blocks in scope, read whole

A section-level word diff of pre-r3 (`920d280`) → live was read hunk by hunk: V09 19 changed sections (§1b, §2.12, §3.8,
§3.16, §4.2, §4.3, §4.9, §4.12, §4.17, §4.18, §4.19, §4.20.6, §4.21, §5.8, §5.15, §7, §7.1, §8.1, §9 — repair-r3-V09's 18
REPLACE blocks), V10 18 (§1.2, §1b.1, §1b.5, §2.3, §2.13, §2.14, §3.3, §3.5, §3.9a, §3.9b, §3.13, §3.16, §3.23, §6.1, §7.1,
§8, §9, §10.2 — repair-r3-V10's 18). Read whole in the live text: V09 §4.21.1 – §4.21.14, §1b's changed rows (l.311–312,
369, 374, 377–379, 409), §2.12's changed rows (l.1000–1009), §3.16 rows 21 and 85–94, §4.9's new rows (l.2042–2044) and
changed rows (l.2174–2192), §4.12, §4.17's new paragraph *A building's own way down*, §5.8, §5.15's crisis row, §7's lead,
T-V9-15, -22, -72, -75 – -77, -79, -83, -85 – -87, J-V9.148; V10 §1.2's changed rows, §2.13, §3.5, §3.9a's damage part,
§3.9b (5)–(8), §3.13 step 4, §3.23 rows 32–35, T-V10-11, -45, -49, -51 – -53, §8, CVR-V10-22.

**END lines (Part H) at V09 and V10 — all written:** VCS-r2-03 (§4.12's fallback "a default only, switchable back on and
never removed (item 126 (e))"; T-V9-22 "with `AppPrefs.touch.editFabric` on (T126-1)"); VAT-r2-04 (§4.2 "(§7.8's layer
controls: `LayerSpec.visible`, written by `setLayer`, §8.4)"; row 21 "(by `setLayer`, §8.4)"); VAT-r2-05 (V09 §4.21.8
(1), §4.21.12 (3)–(7), §2.12's crisis-card row; V10 §2.13's projections, §3.5's `look` read, §1.2's §11.2 row); VAH-r2-07
(T-V9-85's knowledge clause, word for word); VRC2T-01 (§4.21.10 (5): chip k's glyph by (k − 1) mod 9); R3-06/R3-08 (c)
(V09 §4.9 `head.restored` "In use again{, years}"; §4.21.13 (1)'s head sentence; V10 §3.9a's head row, word for word);
VRC2T-18 (V10 §2.13's `FindAnswer` types both layer fields `Layer`, §1.2's §2.1 row); VV910-r2-09 (V10 §3.9b (7)).
The other V09/V10 fixes Part H names (VAF-R2T-05, -07, VAH-r2-08, VAP-r2-06, -07, VAT-r2-02, -06, VDC2-17, VEL2-r2-03,
VM-R2T-09, VV34-r2-13, -14, VV78-r2-08, VV1112-r2-14; VAH-r2-06, VAP-r2-10, VAT-r2-01, -03, VM-R2T-07) were read in place
for new problems; their verdicts are their reporters'.

**No nuance lost.** The removals are R3-02's review ids (records in §9 and §10 keep theirs), the `crisis.look.<kind>`
family (VV1112-r2-14: each look worded by its row's `label`), the dust-haze clause and `head.reused` (ruled), the
"legend's entries" as a read's source (now §11.2's `looks` reader, R3-16 (a)), the inline layer unions (now §2.1's
`Layer`) and V10's `ViewState[…]` aliases (spelled out) — each the ruling's text, nothing thinned. Neither unit shrank
(V09 119 682 → 121 337 words, +1.4 %; V10 80 145 → 81 335, +1.5 %; a repair round's added design).

**New problems the repair made or left at its edges:** the per-look **Show** frame now covers `disaster` but not the six
other looks without camps (VV910-r3-01); V09 never states the disaster look's building-by-building hand-over the rest of
the set now states (VV910-r3-02); V10's round-3 projection of the festival list assumes standalone entries the base's
list does not hold (VV910-r3-03); V09's deletion of `crisis.look.<kind>` left three stale V10 citations and one V07
example (VV910-r3-04, VV910-r3-05) — both named in repair-r3-V09's HAND-OFFS; the ruled weather wording lacks the hour
its own rule reads (VV910-r3-06); the condition's name is read twice in V09 (VV910-r3-07); V09's damage-line rule omits
the roofless-wing case V10 now states (VV910-r3-08).

## P4 Mechanical checks

* **Ids.** T-V9-1 – T-V9-87, J-V9.1 – J-V9.149, BCR-V9-1 – BCR-V9-37, V09 §3.16 rows 3–94 (rows 1–2 the bullet rules)
  each defined once; T-V10-1 – T-V10-53, J-V10.1 – J-V10.128, BCR-V10-1 – BCR-V10-23, CVR-V10-1 – CVR-V10-22 each once;
  every T-V… and J-V… id V09 and V10 cite is defined in the set.
* **References.** Every "V0n §x" pointer in V09 and V10 resolves to a heading or bold sub-item (0 broken); every
  "V09 §4.21.n (m)" across the set resolves (§4.21.10 1–15, §4.21.12 1–10, §4.21.13 1–5, §4.21.14 1–7 …; 0 broken); every
  "V10 §3.9b (n)" resolves (1–8). Stale *names* (not section pointers): VV910-r3-04, VV910-r3-05.
* **Review ids** (R3-02): none in design text; the eight left in V09 are §9's J-V9.144 – J-V9.149 rows and §10's BCR-V9-37
  (records); V10 none.
* **Tool words:** 0 bare first uses in round-3 text (V10's two round-2 sites now read "T1 `intend` row").
* **Retired terms** (canon glossary patterns): 0 new hits in either volume.
* **Deferral wording:** 0 in round-3 text.
* **Item 126 (a2):** V09's seven "phone" words state the rule or its removal (l.100, 186, 2534, 3685, 4306, 4659, 4794);
  V10 none; nothing designed for a phone.
* **Cohesion.** V09 §8.1 and V10 §8 figures unchanged by round 3 and equal to INDEX l.32–33 (23.75–34.75; 14.75–20.25)
  and §16; INDEX l.33 and §16's M3c row now place Find's clerk content in C4 as V10 §8 does.
* **doc_checks** (`--heads docs/ARCHITECTURE.md`; WARNING printed: reference corpus INCOMPLETE — captures,
  research/patreon, research/devlogs, research/ftg-docs, research/external missing — results NOT authoritative,
  PROVISIONAL): V09 C1 1/0 unreviewed, C2 1/0, C3 290/270, C4 0, S1 0, S2 443/92; V10 C1 0, C2 0, C3 163/144, C4 0, S1 0,
  S2 315/13. Every unreviewed S2 hit is a volume-prefixed pointer (checked: 0 unprefixed in either); the C3 runs are
  common English.
* **Words:** V09 119 682 → 121 337 (+1.4 %), V10 80 145 → 81 335 (+1.5 %) (wc); growth is the defect fixes' design text.

## Issues

| id | sev | kind | owner | claim (short) |
|---|---|---|---|---|
| VV910-r3-01 | major | EDGE-UNDEFINED | V09 | **Show** / Find's **Go to** have no frame for the six looks that take no camp land and are not `disaster` |
| VV910-r3-02 | major | CONFLICT | V09 | V09 never hands a disaster look over building by building (`crisisLookYields`); the rest of the set does |
| VV910-r3-03 | major | CONFLICT | V10 | V10's look read assumes standalone generic festivals in `LooksAnswer.festivals`; the base's list holds none, so T-V10-49 cannot pass standalone |
| VV910-r3-04 | minor | BROKEN-REFERENCE | V10 | three V10 sites still name the deleted `crisis.look.<kind>` keys |
| VV910-r3-05 | minor | TERM | V07 | V07's crisis-line example uses the deleted word "Disaster" for `{look}` |
| VV910-r3-06 | minor | CONFLICT | V09 | row 93 and T-V9-87's "heat shimmer in an arid row's dry weeks" omit the hour shimmer is live |
| VV910-r3-07 | minor | ELEGANCE | V09 | the condition's name read by a second §11.2 read (and `condition` called a binding key) where `LooksAnswer.crises[].name` carries it |
| VV910-r3-08 | minor | CONFLICT | V09 | §4.21.13 (1)'s damage rule omits §2.6 step 7's roofless-wing case, which V10 §3.9a states |

**VV910-r3-01 (V09; major; EDGE-UNDEFINED).** V09 §4.21.12 (5) (l.3617–3619) frames the crisis card's **Show** by "the
look's place — its camps, or for a `disaster` look the union of its units' `FindArea` shapes (V01 §5.4 (6))", and (7)'s
Find **Go to** "frames it as the card's **Show** does". Six of §10.2's twelve look kinds take no camp land and are not
`disaster` — `famine` (`fields`), `beast` (`edge`), `raiders` (`outlyingFarms`), `rebellion`, `boom` and `bust`
(`streets`) (V11 §3.25.9 l.4531–4537: "the other looks take no camp land") — so their **Show** and **Go to** have no
stated frame; and nothing gives V09 one look's camps either (`LooksAnswer.crises[]` carries no extent; §2.9's crisis
framing is the union over every look). Round 3 closed the `disaster` case only (R3-16 (b)); the adjudicator graded that
same gap MAJOR. *Required:* V09 §4.21.12 (5)'s **Show** reads "**Show**, framing the look's place — the box of the marks
`live.crises` draws for that look (§8.2's look rows, keyed by its condition, a preview by its look kind: its camps, siege
line and engines, its bare fields, torn edge runs, burned farmsteads, barricades, scaffolds or shutters, and its massed
marks on §8.8's ring), or for a `disaster` look the union of its units' `FindArea` shapes (V01 §5.4 (6)) — as **Fit the
town** frames the town"; §1b's crisis-lines row (l.377) adds the input "`live.crises`'s marks by look (§8.2), for
**Show**'s frame"; §3.16 row 91 adds the edge "**Show** on a look that takes no camp land (a famine, a rebellion)" with
the outcome "framed on the marks drawn for it"; T-V9-85 adds "a previewed `famine`'s and `rebellion`'s **Show** framing
their bare fields and their barricades".

**VV910-r3-02 (V09; major; CONFLICT).** R3-10 rules that a disaster look leaves each building in the week V06 §3.22
(3)'s `crisisLookYields` turns true on it (a Works other than a `decay` Works begun on it), a preview never handing over;
the base (§8.2 l.13013–13016, §8.6 l.13986, §10.2 (f) l.15575), V03 §5.6 (4) (l.2726), V02 §5.7, V01 §3.16 and V10
(§3.9a l.1852–1855; §3.9b (8) l.2020–2025, "the drawn ruin leaving with the condition or its rebuilding Works") all state
it. V09 states it nowhere (0 hits of `crisisLookYields`, "reconstruction" or a hand-over): §4.21.12 (4) (l.3604–3609)
puts `info.crisis.ruinedFor` on the why card "of a building in a district a disaster look ruins"; §4.21.13 (3)
(l.3668–3673) has the plan panel show "the building's lines at the look's `lookLevel` … under the head
`info.crisis.ruinedFor`" for every building of such a district; §5.8 (l.3951–3953) likewise; row 92 and T-V9-86 test no
handed-over building; §2.12's crisis-card row (l.1005) re-reads only "at each week change, absorb and `onEffectiveKey`"
(a commit that begins a Works is no trigger) and its damage-lines row (l.1008) not at a change of the `crises` key. For a
building whose rebuild Works has begun, V09's panel and card show the ruin and "For now: Ruined quarters, …" while the
map draws its scaffolding (§8.2) and the clerk says the look has left it (V10): two outcomes for one case (R3-03 (b)).
*Required:* V09 §4.21.12 (4): "… as a `facts` row on the why card of a building a disaster look still draws ruined — one
of the look's `districts` in §11.2's `looks` reader (…), not yet handed over to its rebuilding (V06 §3.22 (3)'s
`crisisLookYields`, evaluated in the generation worker: the look's `yielded` buildings; a preview never hands over) — or
of a field a famine leaves bare …"; §4.21.13 (3): "In a district a disaster look ruins, until the look leaves the
building (V06 §3.22 (3)'s `crisisLookYields`: a Works other than a `decay` Works begun on it; a preview never hands over),
the plan panel (V03 §4.5) shows …; once it has left, the panel shows the building's own level's lines and the card no
`info.crisis.ruinedFor` row (V03 §5.6 (4); V10 §3.9a)"; §5.8's "for a building in a district a disaster look ruins"
reads "for a building a disaster look still draws ruined (V09 §4.21.12 (4))"; §2.12's crisis-card row adds "each
`doc.changed`" to its triggers and its damage-lines row "each change of the `crises` key"; row 92 adds the edge "a
building of the district whose rebuilding Works has begun" with the outcome "its own level's lines, no look, no
`info.crisis.ruinedFor`"; T-V9-86 adds "a building of the disaster's district under its `reconstruction` Works shows its
own level's lines and no `info.crisis.ruinedFor`, and under a `disaster` preview the look". END (rendering): §11.2's
`LooksAnswer.crises[]` gains `yielded?: Id[] /* a disaster look: the buildings of its districts V06 §3.22 (3)'s
crisisLookYields has handed over at the drawn week; key-filtered; absent on a preview */`.

**VV910-r3-03 (V10; major; CONFLICT).** V10 §2.13's `LookAnswer.festivals` (l.1000–1001) projects §11.2's
`LooksAnswer.festivals`, its `name` commented "a dossier tradition's (V08 §3.16 (5)); a standalone generic festival,
which it names not"; §3.9b (5) (l.1946–1948) calls it "the list V09 §4.21.8 reads"; T-V10-49 asserts `read_map look`
returns "the festival list the view shows". But the base's `LooksAnswer.festivals` is "DR43's list" (l.16159) and DR43
holds "standalone no tradition exists and none is invented" (l.11980); V11's registry row 105 gives `festival.generic`
to "V09's preview list, standalone" and the renderer directly (V11 l.1030); V09 §4.21.8 (1) lists the generic festivals
standalone (T-V9-78: "standalone, the four generic festivals are listed"). On a standalone map the look read so returns no
festival while the panel shows four, and T-V10-49 cannot pass against a base-conformant build. (V10's round-3 HAND-OFFS
name the gap for rendering; the base, V09 and V11 agree with each other, so V10 is the end that moves.) *Required:* V10
§2.13's `name` comment reads "LooksAnswer's `name` — a dossier tradition's (V08 §3.16 (5)); the list is DR43's, so a
standalone map's is empty (no tradition exists, DR43), a previewed generic festival (V11 §3.25.7's `festival.generic`)
reaching the model only through `display.id`, rendered in V09's `view.festival.<id>` words"; §3.9b (5)'s
"(`LooksAnswer.festivals`: §7.7's DR43, the list V09 §4.21.8 reads, under the session's key)" reads "(`LooksAnswer.festivals`:
§7.7's DR43, the dossier's festivals V09 §4.21.8 lists, under the session's key; standalone none, a previewed generic
festival named from the display)"; T-V10-49's "the festival list the view shows" reads "the dossier's festival list the
view shows (§11.2's `LooksAnswer.festivals`), and on a standalone fixture no festival, a previewed generic one named in
V09's words".

**VV910-r3-04 (V10; minor; BROKEN-REFERENCE).** Round 3 deleted V09 §4.9's `crisis.look.<kind>` family (VV1112-r2-14:
each look is worded by its `crisis.looks` row's `label`, V11 §3.25.9; V09 §4.9 has no such row). V10 still names it at
§1.2's V09 row (l.202, "V09 §4.21.12: `crisis.look.<kind>`, `info.crisis.*`"), T-V10-29 (l.3097, "every `info.damage.*`,
`info.crisis.*` and `crisis.look.<kind>` key V10 §3.9a and V10 §3.9b (8) render") and CVR-V10-22 (l.3449, "the
`crisis.look.<kind>`, `info.crisis.*` and `info.damage.*` rows"); repair-r3-V09's HAND-OFFS name all three. *Required:*
l.202 reads "(V09 §4.21.12: each look row's `label` (V11 §3.25.9) and `info.crisis.*`)"; T-V10-29 reads "every
`info.damage.*` and `info.crisis.*` key V10 §3.9a and V10 §3.9b (8) render"; CVR-V10-22's first cell reads "the
`info.crisis.*` and `info.damage.*` rows, each look worded by its `crisis.looks` row's `label` (V11 §3.25.9); …" (the rest
as it stands).

**VV910-r3-05 (V07; minor; TERM).** V07 l.3125's example of V09's line, "For now: Disaster, the mill-end fire, weeks
30–34", fills `{look}` with the deleted `crisis.look.disaster` word; `{look}` is now the row's `label`, "Ruined quarters"
(V11 l.4535; V09 §4.21.12 (4)). Named in repair-r3-V09's HAND-OFFS. *Required:* the example reads "For now: Ruined
quarters, the mill-end fire, weeks 30–34".

**VV910-r3-06 (V09; minor; CONFLICT).** Row 93's outcome (l.1611, "the commonest live kind (heat shimmer in an arid
row's dry weeks)") and T-V9-87 (l.4370, "heat shimmer in an arid row's dry weeks") omit the hour V09 §4.21.14 (4)'s own
rule reads: under `light: 'time'` shimmer is live only in its hours 10–18 (V11 §3.25.11's kinds table, l.4677), while
dust (no hours, weeks 13–38 at 1 an hour, l.4691) stays live, so at night there the commonest live kind is dust haze; a
fixture run at a night hour fails the bar against a correct build. *Required:* row 93's parenthesis reads "(heat shimmer
in an arid row's dry weeks by day, dust haze there at night under `light: 'time'`)"; T-V9-87's "heat shimmer in an arid
row's dry weeks" reads "heat shimmer in an arid row's dry weeks at midday, and dust haze there at midnight under
`light: 'time'`".

**VV910-r3-07 (V09; minor; ELEGANCE).** V09 §4.21.12 (4) (l.3598–3600) reads `{condition}` "by the look's `condition`
(the overlay's binding key, §2.7's `ConditionOverlay.key`) through §11.2 at `effectiveKey()`" — a second read of a fact
§11.2's `LooksAnswer.crises[].name` already carries ("the condition's name where the dossier gives one (tier
dossier)"), which V10 §2.13 projects; and `LooksAnswer.crises[].condition` is the overlay's `Id`, not its binding key
(§2.7: `id` and `key` are two fields). §1b's crisis-lines row (l.377, "each condition's name read through §11.2 at
`effectiveKey()`") and §4.9's `info.crisis.<line>` codes cell (l.2186, "with the condition's entity read") follow it.
*Required:* (4) reads "`{condition}` the look's `name` in §11.2's `looks` reader (the condition's name as V08 carries it
from the dossier, tier `dossier`)" and `info.crisis.lineUnnamed` "for a look that carries no `name`"; §1b's row reads
"each look's `name`"; §4.9's codes cell reads "the standing looks of §11.2's `looks` reader, `{condition}` each look's
`name`, `{look}` each look row's `label` (V11 §3.25.9)".

**VV910-r3-08 (V09; minor; CONFLICT).** V09 §4.21.13 (1) (l.3649–3652) states which elements show damaged by R3-04's
comparison alone; §2.6 step 7 (l.2091) adds the one case with no threshold — while a building is `decayed` or `ruined`,
every roof bay over a room of a wing whose `RoofSpec.kind` is `none` is damaged whatever its t (R3-05) — which V03 §5.6
(2) (c) draws and V10 §3.9a (l.1821–1823) now states for the same `info.damage.roofBay` lines. *Required:* after "(a level
of 0 damages nothing, so a never-decayed building draws its plan unchanged)" add "; while the building is `decayed` or
`ruined`, every roof bay over a room of a wing whose `RoofSpec.kind` is `none` shows damaged whatever its threshold
(§2.6 step 7)".

Totals: 8 issues — 0 blocker, 3 major, 5 minor; owners V09 5, V10 2, V07 1. Round 2's nine findings are all closed.
