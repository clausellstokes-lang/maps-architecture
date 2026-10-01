# Verify — volumes V09, V10 after repair round 3 (coherence/verify-vol-V09-V10-r3t)

> PROGRESS: P1 done (inputs) · P2 pending (round-2 findings re-checked) · P3 pending (every round-3 block in scope read
> whole) · P4 pending (mechanical checks) · report and result pending.

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
| VV910-r2-01 | V09 | FIX, amended per R3-23 (b) (closes VDC2-05) | FIXED as amended | §4.21.14 (4) l.3694–3700: the commonest kind live at that moment (band holds `yearWeek`; under `light: 'time'` its hours hold the view's hour, §6.1); none live → starts none, button disabled with `settings.weather.noneNow` "No weather comes here at this time of year or day.", never a silent no-op (§7.8); dust-haze clause gone; (1) "enabled while the effects are on and a weather kind is live ((4))"; §4.9 `settings.weather.<word>` adds `noneNow`; row 93; T-V9-87 (heat shimmer; the disabled button; T-V11-48). Second end: V11 §3.25.11 *The commonest kind* l.4659–4661 agrees |
| VV910-r2-02 | V09 | FIX per R3-21 (b) | FIXED | §4.21.7 (2) l.3379–3383 is the required sentence word for word; row 94 "the drawn week moves, the Season control and its switch staying as the viewer left them (§11.3)"; T-V9-77's clause; J-V9.148 drops the host clause. Base end: §11.3 l.16513 (`view.set { week }`: §2.9's `week` … never `yearWeek`/`seasonFollow`) |
| VV910-r2-03 | V10 | FIX | FIXED | V10 l.1024 (§2.13 `FindAnswer.chips[].id`), l.1978 (§3.9b (7)), l.2266 (§3.13 step 4) read "a place, an area (V01 §5.4's `FindArea`), a person or an institution"; prompt rule 20 (l.1278) adds people and institutions |
| VV910-r2-04 | V09 | FIX, amended per R3-16 (b) | FIXED as amended | §4.21.12 (4) l.3604–3607: units from the look's `districts` in §11.2's `looks` reader, never a call to V01 on the main thread; (5) l.3617–3619 **Show** frames a `disaster` look by the union of its units' `FindArea` shapes (V01 §5.4 (6)); §1b's crisis-lines row names the input; base `LooksAnswer.crises[].districts` l.16165; V10 l.1010's citation now reads `LooksAnswer.crises[].districts`. One residual of the same class is new: VV910-r3-01 |
| VV910-r2-05 | V09 | MERGED into VV34-r2-13 (FIX per R3-16 (c)) | CLOSED (VV34-r2-13 fixed) | §4.21.13 (3) l.3663–3668 is the required text; §5.8's `plan` section "at the building's own level"; T-V9-86's last clauses (own-level rows; the look named by `info.crisis.*`, V10 §3.23 C10); §1b's and §2.12's damage rows: the look's level to the plan panel only |
| VV910-r2-06 | V10 | FIX | FIXED | V10 l.1492 (§3.5 step 3) and l.2363 (§3.16 `dossier` row) read "V10 §4.1's T1 `intend` row" |
| VV910-r2-07 | scope | FIX | FIXED | INDEX l.33 "C4's Find content (the find form and read) at M5's exit"; §16's M3c row l.19991 "V10 §8's exits (C4's item-120 content — the find form and read — landing with M5's exit)" |
| VV910-r2-08 | V09 | FIX per R3-16 (d) | FIXED | §4.21.12 (5) l.3619–3622: the card's line on V10's `drawer` entry (`ClerkHandle.send(text, 'drawer')`, no attachment), the clerk reading the look by `read_map { kind: 'look' }` (V10 §3.9b (8); prompt rule 21) |
| VV910-r2-09 | V09 | FIX per R3-24 | FIXED | §4.21.10 (7) l.3502–3505 adds each change of §2.9's `week` and passes the query's `week`; (8) l.3523–3526 states the frame restriction in the required words; (3) lists at the drawn week; row 87's edge and outcome; T-V9-83 (e)'s scrub clause; §2.12's and §1b's index rows. Ends: base §11.2 `gazetteer` `week?` l.16120; V10 §3.9b (7)'s read passes the week (END, l.1983–1987), V10 §3.23 row 32, T-V10-51 |

All nine round-2 findings are closed (eight FIXED as ruled, VV910-r2-05 closed by its merge target's fix). Every END
line Part H gives V09 and V10 is written (P3 lists each).

## P3 Round-3 blocks in scope, read whole

(in progress) Section-level word diffs pre-r3 → live: V09 19 changed sections, V10 18. Read whole so far: V09 §4.21.1 –
§4.21.14, §3.16 rows 21 and 85–94, §1b's changed rows, §2.12's changed rows, §4.9's new and changed rows, §4.17's new
paragraph; V10 §2.13, §3.9b (1)–(5). Drafted: VV910-r3-01 (Show's frame for a camp-less look), VV910-r3-02 (the
disaster look's per-building hand-over absent in V09), VV910-r3-03 (LooksAnswer.festivals standalone), VV910-r3-04
(V10's stale `crisis.look.<kind>` references), VV910-r3-05 (V07's example word).

## P4 Mechanical checks

(pending)

## Issues

(pending)
