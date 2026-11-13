#!/usr/bin/env python3
"""Build and append the merged round of pass B's first batch — M0-d-08 S2 (Q153), M0-f-02a S4 (Q201), M0-a-11 S8
(Q197 (b), (c), (e)) — to specs.json. Three independent legs on file-disjoint items that no child is editing."""
import json
P = '/home/user/maps-architecture/workflows/lane-prompts/session-fix-cloud/specs.json'
s = json.load(open(P, encoding='utf-8'))
tmpl = next(e for e in s['rounds'] if e['id'] == 'M0-c-05' and e.get('round') == 'S4')['session']
a = tmpl.index("Each 'failing line' below is one such row")
b = tmpl.index('THIS ROUND, IN THIS ORDER:')
RULES = tmpl[a:b]
assert "'Hardening round S4'" in RULES

REDS = ("THE HEAD'S DECLARED REDS, should your RELATED@1000 reach them, notes never a failing line of yours: Q152's six bands tests (packages/kernel/test/arr/bands: closing.test.ts ×2, "
        "dryrun.test.ts, hardening-s15.test.ts, restage.test.ts ×2); the reference-machine tests of bench/test/calibrate, host and timing (J176); bench/test/site/summary.test.ts's canary "
        "(J772 (7): the committed site summary is stale until the session's re-run — you neither re-run nor edit a summary); Q202 — the seven 'later rungs' cases of "
        "packages/layout/test/enceinte/s5seeds.test.ts, which register only at FULL strength (PLAT_FUZZ_RUNS unset); and, until leg 1 of this round lands, the flake of Q153 "
        "(testkit/test/determinism/dilation.test.ts, green alone — leg 1 is its fix). ")
RESTARTS = ("THE RESTARTS (a fact of this platform on 2026-11-12 / 13: a container restarts about every two hours whether or not background tasks are live; /home/user/maps-scratch survives, "
            "every process dies, /tmp does not survive): every run over ten minutes is a STEP OF A RE-ENTRANT CHAIN under /home/user/maps-scratch/waves/ — its log and its exit-code file beside "
            "it, and for a run of many parts one exit-code file per part, so that a seat that comes back after a restart skips what is finished; RELATED@1000 IN CHUNKS — collect RELATED's own "
            "file list once (`vitest related --run` with the JSON reporter and a test-name filter that matches nothing, e.g. -t '^__no_such_test__$'), split it by 12 files, run each chunk with "
            "`vitest run --passWithNoTests` at PLAT_FUZZ_RUNS=1000 under ONE recorded PLAT_FUZZ_SEED, each chunk's JSON report and exit code beside it, the totals summed from the JSON reports; "
            "each mutant its own exit-code file. ")
MERGED = ("THIS IS LEG {n} OF A MERGED ROUND (the MERGED-ROUND RULE, J443): M0-d-08 S2, then M0-f-02a S4, then M0-a-11 S8, on ONE tree and ONE branch, no reset between, each leg with its own "
          "build, closing check, LANDED line and record. THE LEGS ARE INDEPENDENT (three items with no file in common; none reads another's change): each leg launches when the one before it has "
          "ENDED, passed or not. ")


def opening(item, rnd, q, rows):
    return (f"This round was opened by the SESSION as {item}'s HARDENING ROUND {rnd} (J237 (2): the M0 hardening phase's fix rounds, batched per owning item; J238: M0 is the bedrock — the default for "
            f"an M0 row is FIX with an exact precaution and a pin; J567: the bar is an independent closing check's PASS on the evidence), on rows the session queued in docs/M0-FIX-QUEUE.md — read each "
            f"row whole by its own grep ({q}) — at PASS B, the final triage of the queue's reported rows (the session's record J800, on the parent's branch; what it rules for this leg is said here): "
            f"{rows}. ")


d08 = {
 'id': 'M0-d-08', 'from': 2, 'round': 'S2',
 'session': opening('M0-d-08', 'S2', "grep '^| Q153 '", "Q153 — a FLAKE in the determinism harness's own test, seen once under load and declared in every gate since") +
  RULES.replace("'Hardening round S4'", "'Hardening round S2'") + MERGED.format(n=1) +
  "THIS ROUND: ONE LINE, TESTS ONLY unless the reading shows the SHIM at fault. OWNS: plat/packages/testkit/src/determinism/ and plat/packages/testkit/test/determinism/ (plat/docs/build/M0-work.json) "
  "— nothing else is edited; the kernel fixtures the bar reads are other items'. THE BAR'S TEST (the dilation ×10 and ×0.1 digests, §16 M0 (d)) is not touched and stays green. A nondeterministic "
  "test of the determinism harness is a defect, and the fix is to remove the race, never to widen a number until it stops failing: a tolerance is allowed only with its derivation. " + REDS +
  RESTARTS + "Notes section 'Hardening round S2' in plat/docs/build/checks/M0-d-08-notes.md; verdict plat/docs/build/checks/M0-d-08-s2.md; lanes build/M0-d-08-fix-s2 / check/M0-d-08-close-s2; "
  "ledger ids the next free at build time.",
 'lines': [
  {'line': "LINE 1 — Q153: packages/testkit/test/determinism/dilation.test.ts 'withDilation: every clock the host layer reads, scaled (§6.5 (9)) › restores every clock on return, on a throw and "
           "when a promise settles; nests' failed once (after 32 ms) in a three-worker run and passed alone and under six busy loops; the run was cut before it printed the assertion. THE SESSION'S "
           "READING, to be confirmed or refuted FIRST: the nested case's last assertion (`expect(outer.inner / outer.outer).toBeGreaterThan(5)`, :111) divides a ×100-dilated measure of a 200-unit "
           "spin by a ×10-dilated measure of the whole outer body — the ratio is 10 only if no real time passes outside the spin, and a preemption of about two milliseconds between `t0` and the "
           "outer's last read (the inner call's set-up and tear-down included) brings it under 5. Every other assertion of the test compares identities, not durations.",
   'evidence': "packages/testkit/test/determinism/dilation.test.ts :80-113 and `spin` in the same file; packages/testkit/src/determinism/ — how `withDilation` replaces and restores the clocks, "
               "which base clock it reads and how nesting composes the factors; docs/M0-FIX-QUEUE.md row Q153; the session's rows J731 and J736 (grep '^| J731 ' docs/PROGRESS.md).",
   'required_change': "(a) FIND THE RACING ASSERTION: show it red by a CONSTRUCTED delay — a real-time busy wait placed between the two reads in a scratch copy of the test, never by loading the "
               "machine and hoping — and name every other assertion of the folder's tests that compares two real-time durations, or a duration against a bound (each is either shown free of the "
               "race or fixed here in the same form). (b) BOUND IT WITHOUT A RACE: the nested claim ('×10 inside ×10 runs ×100') asserted either on a base clock the test controls (a test-side "
               "stub of the underlying clock installed before the shim captures it and restored after, if the shim's design admits it with no export change — then the two factors are read "
               "EXACTLY), or by reading the inner and the outer dilated clocks at the SAME two instants, so that their ratio is the inner factor up to the clock's granularity, with the tolerance "
               "stated and DERIVED from that granularity; the test's other claims unchanged. (c) PINNED UNDER LOAD: the test green 200 times in a row beside four busy loops (the command and the "
               "count in the notes), and the constructed delay of (a) no longer turning it red. (d) A MUTANT in your mirror: the nesting broken (the inner factor replacing the outer instead of "
               "multiplying it) → the new assertion red. IF THE READING SHOWS THE SHIM AT FAULT (a clock restored late, a read answered by the wrong factor across an await), that is a defect of "
               "testkit/src/determinism/: fix it with its pin, and say so first in the notes. No export of the package changes; the bar's test and its digests do not move (shown)."},
 ],
}

f02a = {
 'id': 'M0-f-02a', 'from': 4, 'round': 'S4',
 'session': opening('M0-f-02a', 'S4', "grep '^| Q201 '", "Q201 — the closing note N-15 of this item's round S3: one value must decide both the tier runner's guard and its fallback") +
  RULES.replace("'Hardening round S4'", "'Hardening round S4'") + MERGED.format(n=2) +
  "THIS ROUND: ONE LINE — one source statement and its pins. OWNS: plat/bench/src/tiers/ and plat/bench/test/tiers/ (plat/docs/build/M0-work.json); bench/src/tier-jobs/'s lists are read. Round "
  "S3's refusal (a fallback on a manifest that is not the PR tier's, its message pinned verbatim) STANDS as landed: it is not re-opened, and its pins stay green. A manifest relabelled "
  "`tier: 'pr'` that carries the nightly jobs is the manifest's own lie, REPORTED by round S3 and not this line's. " + REDS + RESTARTS +
  "Notes section 'Hardening round S4' in plat/docs/build/checks/M0-f-02a-notes.md; verdict plat/docs/build/checks/M0-f-02a-s4.md; lanes build/M0-f-02a-fix-s4 / check/M0-f-02a-close-s4; ledger "
  "ids the next free at build time.",
 'lines': [
  {'line': "LINE 1 — Q201 (N-15 of the S3 closing check): `runTier`'s guard tests `opts.fallback === true` while `applyFallback` is handed `opts.fallback ?? false` and applies on any truthy "
           "value — so `runTier(nightlyManifest, { fallback: 1 as unknown as boolean })` (and 'yes') RUNS a nightly manifest with the sizes cut and records `fallback.applied: 1` / \"yes\". Only "
           "a caller that defeats the `boolean` type reaches it, and the record shows the cut; it is still two readings of one switch.",
   'evidence': "plat/bench/src/tiers/runner.ts — `runTier` :156-172 (the guard :163, the call :172), `applyFallback` :103-120, the option's doc :59-60 (re-read on your tree; the forms are binding, "
               "the numbers are not); plat/bench/test/tiers/ (round S3's pins of the refusal); plat/docs/build/checks/M0-f-02a-s3.md (3) and M0-f-02a-notes.md 'Closing check S3' N-15; "
               "docs/M0-FIX-QUEUE.md row Q201.",
   'required_change': "ONE VALUE DECIDES BOTH: the switch is read once (`const fb = opts.fallback === true`) and that one value is what the guard tests AND what `applyFallback` receives — or, if "
               "you judge a typed refusal of a NON-BOOLEAN `fallback` (before any status, unit or log) the better reading of 'a caller that defeats the type', build that instead, say why, and pin "
               "its message verbatim (J263 Q6). Either way: no value of `fallback` runs a manifest that is not the PR tier's with its sizes cut, and the record's `fallback.applied` is always a "
               "boolean. PINS: 1 and 'yes' on the nightly manifest → no size cut and a boolean in the record (or the typed refusal); the same two values on the PR manifest → the reading you chose, "
               "stated; `true` and absent unchanged on both. MUTANT in your mirror: the old two readings restored → red. The refusal census of the tier tests 0 → 0; no export changes."},
 ],
}

a11 = {
 'id': 'M0-a-11', 'from': 8, 'round': 'S8',
 'session': opening('M0-a-11', 'S8', "grep '^| Q197 '", "Q197 (b), (c) and (e) — three closing notes of this item's round S7 (the skeleton's third reading): N-s7c-1, N-s7c-3, N-s7c-7") +
  RULES.replace("'Hardening round S4'", "'Hardening round S8'") + MERGED.format(n=3) +
  "THE SESSION'S RULING ON WHAT IS NOT THIS ROUND'S (J800; vetoable): Q197 (a) — the three classes of lawful faces that §3.8's coalescing sentence does not join (N-s7-1 … N-s7-3: each a typed "
  "`W_DOWNGRADE`, the reader's fallback exact; one face of the registered families in 40 107) — is NOT built here and no tolerance of §3.8 changes: it is decided with the final site and fusion "
  "summaries at the end of the phase (carried to M1 unless they show the registered face's downgrade costing a reader), and (d)'s crossing arcs (N-s7c-5) are a fixture candidate for that "
  "decision, not a line of this round. So NO EXECUTABLE LINE OF packages/kernel/src/skeleton/ CHANGES IN THIS ROUND: LINE 1 is tests only, LINE 2 is a comment, LINE 3 is text — and the round "
  "SHOWS it: the built kernel bundle byte-identical before and after (its SHA-256, base mirror and tree), every digest and golden of the item unmoved. OWNS: plat/packages/kernel/src/skeleton/ "
  "and plat/packages/kernel/test/skeleton/ (plat/docs/build/M0-work.json). THE ORDER: LINE 1, LINE 2, LINE 3. " + REDS + RESTARTS +
  "Notes section 'Hardening round S8' in plat/docs/build/checks/M0-a-11-notes.md; verdict plat/docs/build/checks/M0-a-11-s8.md; lanes build/M0-a-11-fix-s8 / check/M0-a-11-close-s8; ledger ids "
  "the next free at build time.",
 'lines': [
  {'line': "LINE 1 — N-s7c-1 (Q197 (b); tests only): the third reading's work law is pinned only through the second — a mutant that runs the `coalescing` reading under a FRESH law (`limit` "
           "where the loop passes `limit − spent`) survives the item's tests, because tolerant.test.ts's 'one work law for both readings' exhausts the law in the second reading only.",
   'evidence': "plat/docs/build/checks/M0-a-11-notes.md 'Closing check S7' N-s7c-1 (read the row whole) and plat/docs/build/checks/M0-a-11-s7.md; packages/kernel/test/skeleton/tolerant.test.ts "
               "('one work law for both readings') and the `skipResolution` hook it uses; packages/kernel/src/skeleton/ — the loop that runs the three readings under one law (`limit − spent`).",
   'required_change': "EXTEND THE WORK-LAW PIN TO THE THIRD READING, in the note's own shape: with the `skipResolution` hook burn the law in the third reading and expect the first reading's "
               "`validator` cause and `events` ≤ the law + 1; state in the test which reading spends what. MUTANT in your mirror: a fresh law for the third reading (the note's L10) → red by the "
               "new test alone. If the existing hook cannot reach the third reading without a source change, change nothing in src/: REPORT the smallest test seam it would need."},
  {'line': "LINE 2 — N-s7c-3 (Q197 (c); a comment only): engine.ts's header says of the third reading that 'every candidate event of the wavefront within 1 mm in offset time and 1 cm in position "
           "of the earliest joins it'; the queue gathers a reflex vertex's SPLIT candidates only up to the earliest event plus the rounding scale (`if (c.t > bt + eps) break`), so a split later "
           "than the earliest by more than `eps` and less than 1 mm is no candidate and does not join. Every edge collapse is gathered. Fail-safe either way (the validator is the net).",
   'evidence': "packages/kernel/src/skeleton/engine.ts — the header's paragraph on the third reading and the split candidates' loop (`if (c.t > bt + eps) break`); "
               "plat/docs/build/checks/M0-a-11-notes.md 'Closing check S7' N-s7c-3 and 'Hardening round S7' (the wider look-ahead tried and dropped: no face of 57 moved).",
   'required_change': "REWORD THE HEADER to what the queue gathers — which candidates join (every edge collapse within the millimetre; a split only within the rounding scale of the earliest) and "
               "why the wider look-ahead is not taken (the round S7 measurement, in one clause) — and the same sentence wherever the item's notes repeat the header's claim, append-only. COMMENT "
               "ONLY: no executable token changes (the bundle's SHA-256 before and after, in the notes). The wider look-ahead is NOT built: it belongs to Q197 (a)'s decision."},
  {'line': "LINE 3 — N-s7c-7 (Q197 (e); text): round S7's shift paragraph, its census table's total row and its choices row give 40 995 faces × 3 uses (122 985 calls); the eight family rows — "
           "2 000 + 3 000 + 3 000 + 6 000 + 24 000 + 542 + 612 + 841 — sum to 39 995 (119 985 calls), which is what the closing check's own probe read. Every per-family row and every refusal "
           "count stands.",
   'evidence': "plat/docs/build/checks/M0-a-11-notes.md 'Hardening round S7' (the shift paragraph and the census table) and 'Closing check S7' N-s7c-7; the round's choices row in "
               "plat/docs/build/choices.md (grep its id from the S7 notes).",
   'required_change': "THIS ROUND'S CHOICES ROW states the right total (39 995 faces, 119 985 calls) and names the earlier row's figure as superseded — rows are append-only, the earlier row is not "
               "edited; the notes' S7 section gains ONE dated correction line beneath its table, the table itself unchanged. Re-add the eight rows yourself and say so."},
 ],
}

have = {(e['id'], e.get('round')) for e in s['rounds']}
for e in (d08, f02a, a11):
    assert (e['id'], e['round']) not in have, e['id']
s['rounds'] += [d08, f02a, a11]
json.dump(s, open(P, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
open(P, 'a').write('\n')
print('appended; rounds =', len(s['rounds']), [len(e['session']) for e in (d08, f02a, a11)])
