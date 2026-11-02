# a05-s14-spec / fix — the critic's gaps, one by one (Opus/high, 2026-11-02)

Seat: fix a05-s14-spec/fix. I read critic.md whole, plus spec-a05-s14.json and spec-a05-s14.md, and edited both in place. Tags: [OBSERVED] means checked in the tree on 2026-11-02 with `sed -n` or `grep`; [INFERRED] means my reading. I measured nothing and ran no git.

JSON after the fix: it parses with `python3 -I -c json.load`. The five model keys are unchanged: `id` "M0-a-05", `from` 14 (a number), `round` "S14", `session`, and `lines`, which holds 6 entries of {line, evidence, required_change}. The session text is 6 989 characters, under the designer's limit of 7 000 (workflows/51-a05-s14-spec.js:27). One key was added: `openQuestions`, as this seat's brief asks. It is inert in rendering because render.mjs:33-56 reads only id, round, from, lines, session and the mode keys. specs.json's rounds already carry extra keys such as consolidation, fromDisk, confirmOnly and buildExtra [OBSERVED]. The session drops `openQuestions` or keeps it when it appends the entry. The md's sections 1 and 2 were regenerated from the JSON; I checked that every row and the session text match.

## Gaps

**G1 (blocking): r8 targeted the wrong vertex. FIXED, with a wider wording than the critic proposed.**
- [OBSERVED] `via(v, pass + 1)` at snapRound.ts:584-589, :693 and :724 makes a fallback vertex v the current pair's end in `route(a, v)` and its start in `route(v, b)`.
- [OBSERVED] stretch.ts:835-837 skips every piece incident to the current pair's a or b, except where `cutStretch` meets the whole segment's `ctx.path.end` / `order[0]`. snapRound.ts:638-639 has the same gate.
- [OBSERVED] Class S's letter is the provenance of the farthest vertex: CLASS_OF `fallback → 'S'` at insertChain.ts:1149-1151 and :1176.
- [INFERRED] The far fallback vertex is therefore the symptom. Sharing a stretch at that vertex cannot take it off the route. The share has to happen on the pair whose step 4 would land it, and that pair's ends can be the segment's own ends, an earlier fallback-landed vertex (the critic's case) or any other route vertex.
- **Change:** LINE 2 (line, evidence and required_change) now places r8 at the current pair's ends of `route()` at every depth. It reads stretch.ts:835-837's exclusion, :848-852's band / join / leave and snapRound.ts:638-643's on-path skip for those ends, in the same way `cutStretch` reads them for the segment's ends. For (x → v) it uses the 'end' form; for (v → y) it uses the 'start' form, with the leave placed by `planLandingAfter`. The critic cited that call at :649; it is at :648 [OBSERVED].
- **Other places updated:** §4 (A)'s amendment text now says "an end of the routed pair". Design note 3 explains why the share happens on that pair. The session text's S sentence now says "the routed pair's end … route()'s current pair at every depth". The open question on (A) (Q1) names the widening so the session rules on the real scope.

**G2 (blocking): "in EVERY pass" contradicted bar (v). FIXED by choosing NO-SHIFT BY CONSTRUCTION.**
- **What the round now does:** every new reading of LINES 1–3 (E's in-bound end candidates, r8, D/W/P's input-bound gates and V's exact half) runs in a NEW fifth pass. That pass sits after `inBound(1)` in `passes` (insertChain.ts:1630-1652) and runs only when passes 1–4 have refused for the bound. Passes 1–4 are unchanged.
- **r8 moved too:** it was "from pass 2, after r7". That placement had the same flaw: a chain that refuses in pass 2 today and commits in pass 3 / 4 would have reached r8 in pass 2 and committed by a different route. It now sits in pass 5.
- **V is limited to pass 5:** the exact judge applies there only, and passes 1–4 keep today's budget. Changing `inFidelity` in every pass could also move a chain to an earlier pass.
- **Bar (v)'s DECLARED-shift list** now also names a Q77 tie past 2⁵³ and a retrace that LINE 5 routes. Both change behaviour in passes 1–4 or in the cut back, so they cannot be NO-SHIFT by construction.
- **The other option is not mine to impose:** the critic offered declared same-chain shifts as an alternative. It is open question Q5, so the session can overrule.
- **Edited:** the session text (THE FIX paragraph and bar (v)), LINE 1 (a), its mutant, LINE 2's required_change, LINE 3's required_change and its mutants, design notes 1, 2 and 3, §4 (A)'s last sentence, and §5's bars.

**G3 (blocking, needs a ruling): J693 (1)'s nine seeds against the router's set. NOT MINE TO DECIDE; carried as open question Q2, marked as blocking the append.**
- The session text now says "AS THE SESSION RULED before launch". The session must make that true, or rewrite the sentence, before it appends the entry.
- Q2 states both options: amend J693 (1)'s wording to the router's set, or extend the round to a-08's arr/winding.ts.

**G4 (minor): 2708765650. FIXED.**
- It is dropped from baseline (b) and bar (ii). The session text says "x-06's coincident plant 2708765650 is no bar input".
- [OBSERVED] testkit/src/edge/ep01.ts:390 calls it "Q21: a typed refusal of unlawful input". docs/build/checks/refusal-census.md:119 (R-38) classes it UNLAWFUL. testkit/test/edge/repins.test.ts:47 pins its E_INVARIANT 'settlementPerimeter: the union'. M0-work.json:2886 places repins.test.ts under x-06.
- §5 has a new REPORTED row to M0-x-06 for repins.test.ts:47. Its lawfulness goes to the session as open question Q3.

**G5 (minor): a residual among bar (ii)'s inputs cannot be carried. FIXED.**
- New session sentence: the proof covers "the trio's and the census's cases only: a bar-(ii) input left refused is REPORTED to the session (amend J693 (1)'s bar or rule (B) at M0), not carried".
- I wrote "left refused" rather than "noSeat certifies", because a bar-(ii) input could also stay refused without a certificate, and that is equally not carriable.
- Also updated: §4 (B) ("no EXISTING M0 bar … but this round's bar (ii) does"), §5's REPORTED row for the session, and open question Q4.

**G6 (minor): register/s14-rescues.json had no NEW mark. FIXED.**
- It is now marked NEW in the session text ("NEW, s5-rescues.json's form"), in LINE 2 ("NEW, s5-rescues.json's form, read by a describe like router.test.ts:1022-1033's"), in LINE 3 ("NEW, LINE 2") and in design note 7.
- [OBSERVED] The precedent is router.test.ts:1022, which reads register/s5-rescues.json, and its describe at :1024-1033.

**G7 (minor): no mechanism for the by-class census. FIXED.**
- Bar (iii) now says that `recordCounts` (caps.ts:45) gains the tally of the refusal detail's 'class X' (insertChain.ts:1177). [OBSERVED]
- A lowering is written to caps.ts:21-29 and :63-71 (MEASURED_PER_1E4 at :63, MEASURED_COUNT at :71) and to router.test.ts:1215-1218's ratchet. The critic cited :1210-1216; the ratchet comment is at :1215 and the `toBeLessThanOrEqual` at :1218 [OBSERVED].
- §5 names the callers that pass the tally: bfuzz.test.ts:260, :419, :445 and fidelity.test.ts:59, all in the owns [OBSERVED].

**G8 (minor): line drifts and pointers. FIXED**, each one checked in the tree:
- snapRound.ts's wedge is :672-680, with the gate at :677-678 (LINE 3, note 5).
- q133.test.ts's buffered list is at :120 (session text, §5).
- The oracle is S9's line 5.
- The census paragraph in M0-a-05-notes.md is at **:932-935**. It begins at :932, so the critic's :933 is one line late.
- num/exact.ts's EXACT_BELOW is at :29 (LINE 4).
- "Hausdorff both ways" is at :5185 (note 5, §4 (C), LINE 3's evidence).
- "S9 edits no insert/ file".
- "specs.json rounds[131] / [132]" is replaced by "their spec entries and landed records".
- The delegation is now J680 (1) (PROGRESS.md:737 [OBSERVED]). J631 (1) was dropped to save characters.
- "The door's two tests" are now named: door.test.ts and write-door.test.ts, plus S9's oracle.
- support.ts's `cityRun` (critic: :348 rather than the md's :347): the md no longer cites support.ts's line after the rewrite, so nothing to change.
- **Paid for by cuts:** the caps arithmetic, the restated noSeat parenthetical (it now points to LINE 1), the B2 cm figures, "(REPORTED with the measured rungs)" and the restated pins of bar (ii) (now pointed to LINES 2–3).

**G9 (minor): LINE 3 needs a ChainCtx field that does not exist. FIXED.**
- The field is now "a NEW optional ChainCtx field (the segment's input points; optional, C-0456 (5))" in the session text, LINE 1 (a) and LINE 3.
- It is set in pass 5, not "for every pass" as the critic wrote. Under G2's construction, only pass 5 reads it.
- Note 5 records why `strip` (:193) and `anchor` (:176) cannot serve [OBSERVED].

**G10 (minor): "no committed chain changes". FIXED together with G2.** The claim is struck from LINE 1 (a). The claim that is now true replaces it: a chain the base commits never reaches pass 5.

**G11 (minor): LINE 5's hedge cannot bite. FIXED, while keeping an exit that requires evidence.**
- LINE 5's line now gives the critic's arithmetic. A (1273, 978) to Q (974, 1102) is √(299² + 124²) ≈ 323.7 cm. pp is A, not P, which is [INFERRED] from the order of the route.
- required_change: a refusal on the S9 head is a retrace the cut back missed, and it is fixed this round. notBuilt #3's forms (2) and (1′) are open only where the captured chain differs from M0-a-06-s7.md:64's and the notes row shows that form from it, never by assumption.
- I kept that narrow exit because pp = A is an inference from the recorded route, not from a captured chain. Design note 9 is updated to match.

**G12 (minor): stale ids. FIXED.** The session text now says "ledger ids the next free at build time (C-0463 / L-0729 at this writing)". [OBSERVED] choices.md's last row is C-0462 and CLEAN-ROOM.md's last row is L-0728.

## Left for the session (open questions in the JSON's `openQuestions` and md §6)

- **Q1:** is r8 a re-reading or a design addition? It now uses the wider pair-end wording, and a refuter pass is owed.
- **Q2:** J693 (1)'s bar. This BLOCKS the append.
- **Q3:** whether 2708765650 is lawful input, and x-06's pin.
- **Q4:** (B) at M0 or M4, including a bar-(ii) input left refused.
- **Q5:** NO-SHIFT by construction, or declared same-chain shifts.
- **Q6–Q10:** carried over from the designer: Q77's crossings half, the class text in the registers, the GATE hash, the 32nd seed, and FAR1's regeneration.
