# M0-a-05 round S14, the router round: revision 4 of the spec entry (spec seat, 2026-11-10)

The entry is `spec-a05-s14-r4.json`, which sits beside this file. It is revision 3 with exactly the sentence-level edits that `confirm-r3.md`'s "Ready to bind?" section lists: edits 1–7, among them NEW-1 to NEW-6. The session accepted every one of them. Edit 1 replaces the earlier work ruling.

The edits were applied by exact string replacement on r3's JSON. Each old string was asserted to occur exactly once. Nothing else was reworded.

Two additions go beyond the refuter's edit list, and both were made on the coordinator's instruction:

- **The session's fix paragraph now carries edit 1's sentence**, so that it and LINE 12 (f) cannot disagree.
- **Edit 2 cites :1674, not the refuter's ":1671".** On b81502bd the reset `ctx.chainPath = null` is at insertChain.ts:1674, and :1671 is the `back.ok ? back : passes(null)` line. The text is otherwise verbatim. The other cite in edit 2 was checked as written: readings' ends `const ends = ctx.strip != null ? [a, b] : []` is at :1042.

## The edits, and each sentence as it now stands

| edit | where | the text now in the entry (the replacement or insertion, verbatim) |
|---|---|---|
| edit 1 (LINE 12 (f)) | LINE 12 required_change | a NEW E_WORK_LIMIT on any registered family, stage fixture or census seed FAILS unless the notes show that its batch's base total stood within that batch's measured pass-5 spend of its limit — such a batch is DECLARED (batch, base total, limit, pass-5 spend, the code before and after, and any stage rung that moved) and REPORTED to M0-f-03b; cost.test.ts green, or a record over its fitted constant that a pass-5 commit created DECLARED with its figures and REPORTED to M0-a-06 |
| edit 1 (session THE FIX) | session | pass 5 is charged like any pass, so a chain it leaves refused still moves its batch's work (LINE 12 (f)): a NEW E_WORK_LIMIT on any registered family, stage fixture or census seed FAILS unless the notes show that its batch's base total stood within that batch's measured pass-5 spend of its limit — such a batch is DECLARED (batch, base total, limit, pass-5 spend, the code before and after, and any stage rung that moved) and REPORTED to M0-f-03b; cost.test.ts green, or a record over its fitted constant that a pass-5 commit created DECLARED with its figures and REPORTED to M0-a-06. |
| edit 2 (NEW-1, LINE 1) | LINE 1 required_change | it runs as attempt with chainPath 'back' (ctx.chainPath = 'back' set before it, :1674's reset after), as attempt(extended true, strip null) with endRules as pass 3's; each strip-gated site LINES 2–4 use — stepTwoStrip :489, readings' ends :1042, the wedge gate :679, stripLanding :710 — is re-gated on (ctx.strip ?? the field), and W-STRIP / P-STRIP mean that site gated on ctx.strip alone (a retrace |
| edit 3 (R2-16, LINE 1) | LINE 1 required_change | the field OBJECT set for the whole of pass 5 (its presence the only pass-5 test, step 2 included), its a / b null in step 2 and set per segment by routeSegment as strip's are |
| edit 4 (R2-4, LINE 3) | LINE 3 required_change | and each crossed run spans the bound (both its ends outside the input segment's bound region), so every in-bound route crosses it — test-side, importing nothing from insert/ but types; the readings r1–r8 out of bound recorded beside it |
| edit 5 (R2-12, session) | session | whichever of this round and S18 lands second, the SESSION runs on the merged tree M0-a-09's bands NEAR and S18's construction-relation measurement |
| edit 6a (R2-7, LINE 4) | LINE 4 required_change | V-2X (the budget doubled) — both red on a fixture whose segment-to-route distance equals the bound at a rational breakpoint |
| edit 6b (R2-7, LINE 4) | LINE 4 required_change | by squared comparisons against a rational enclosure of FIDELITY² = 5408, never a double |
| edit 7 NEW-2 (session) | session |  (ok, not reentered) |
| edit 7 NEW-3 (LINE 1 (c)) | LINE 1 required_change | failing that, the kill is LINE 12 (a)'s per-case census diff, named in the table; if neither kills it, P5-INSIDE is stated as a survivor with the search made, and the checker confirms by reading the code that pass 5 is called only after :1670; |
| edit 7 NEW-4 (LINE 11 (iii)) | LINE 11 required_change | (its grid step stated, ≤ 1 cm; the grid's worst error e stated; lawful only within DRY_MOVE_CM − e; between DRY_MOVE_CM − e and + e decided exactly or REPORTED) |
| edit 7 NEW-5 (LINE 11 (ii)) | LINE 11 required_change | W_WEDGE_ROUTED or W_PLACED — where none is reported, any move beyond the hot pixel is a defect; |
| edit 7 NEW-6 (LINE 1 (d)) | LINE 1 required_change | (d) a reading of LINES 2–4 run in passes 1–4 (E-, S-, DWPV-EARLY) killed by LINE 12 (a). |

## What moved from r3 to r4

Only these texts changed:

| text | characters |
|---|---|
| session | 16 494 → 17 011 (+517) |
| LINE 1 required_change | 1 623 → 2 250 (+627) |
| LINE 3 required_change | 1 632 → 1 832 (+200) |
| LINE 4 required_change | 1 438 → 1 600 (+162) |
| LINE 11 required_change | 1 690 → 1 888 (+198) |
| LINE 12 required_change | 1 503 → 1 849 (+346) |

Everything else is identical to r3:

- id, from and round;
- every line's `line` and `evidence`;
- LINES 2, 5, 6, 7, 8, 9 and 10 whole.

The largest line is now LINE 1, at 3 382 bytes.

## Rendered

A copy of specs.json with the r4 entry appended was rendered with this machine's fitted args:

- **build:** 65 446 characters
- **check:** 63 661 characters

Both briefs carry the renderer's WAITING RULE: "wait for it in the FOREGROUND in chunks of at most FOUR minutes — timeout 240 bash -c …" and "is waited for in four-minute chunks". They also carry the entry's own "are waited for in FOUR-MINUTE chunks (the WAITING RULE below)".
