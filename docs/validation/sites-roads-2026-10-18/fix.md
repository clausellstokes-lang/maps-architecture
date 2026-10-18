# fix — the synthesizer's fix round on draft t (sites, road access and the catalogue-driven autocorrect; J393)

> Designed on Opus 5.5 under the owner's staffing word of 2026-10-18 (J394); Fable critique closes the run (lane sites-roads/critic)

Lane `sites-roads/fix` (opus; J394, Fable-critiqued). 2026-10-18, 10:30–10:40 UTC. Nothing applied to any target; no
git command run; the host repository untouched; written only in this folder and the lane scratchpad
`sites-roads/fix/` (`fix.py`, `md.py`, `prose.py`, `verify_installed.py` and their outputs; the pre-fix machine copy
kept as `draft-t.fragments.orig.json`).

## Inputs, at the md5s read (`md5sum`, 10:30 UTC)

| file | md5 |
|---|---|
| `docs/validation/sites-roads-2026-10-18/critic.md` (339 lines; C-1 – C-12) | `5392816a…` |
| `docs/validation/sites-roads-2026-10-18/verify.md` (0 failures, 0 drifts) | — |
| `draft-t.md` before (1 474 lines) / after (1 610 lines) | `09b4bf05…` / `2642fddb013956e33a2071356cc8a733` |
| `draft-t.fragments.json` before (127) / after (138) | `b4604f94…` / `66d102471989116cb52253a1c33f403f` |
| V13 / V14 / base / INDEX / SUMMARY / brief / README / gate, as they stand (unchanged since the critic, re-hashed 10:36) | `d0de9ad8` / `70d8aa1b` / `1f871a01` / `42881796` / `9d142283` / `fc252070` / `2a4b54c8` / `b6c5be2a` |

Every live passage a new fragment quotes was re-read at its line now: V13:199, :771, :1258, :1763, :1783–1784, :2000,
:2111; V14:3113, :3131–3132; INDEX:48; the base's line 5 (its tail, the J392 note, followed by a blank line); SUMMARY:213;
the gate's rows (K1–K13, M1–M11, so 26 once M12–M13 land: C-12's count holds).

## The gaps

| gap | outcome | what changed |
|---|---|---|
| **C-3** (high) bridge fort vs V13 §3.9 (16) | **FIXED** | 941 (j)'s `bridgeFort` row: `along · track`, `atCrossing 5 m · 5 [track]`, the critic's why; new **948 (d)** on V13:2000 (a bridge fort at a crossing of a route of class track or better; a watchpost at a trail's) |
| **C-1** (medium) "exactly / only the host's edges" | **FIXED** | new **948 (a)** V13:199, **948 (b)** V13:1763, **948 (c)** V13:1258 — the critic's §3 texts exactly (948 (c) the full-row text of critic.md §3, which the task's summary abbreviated) |
| **C-2** (medium) W7 (11) "never an end" | **FIXED** | 942 (m) restated in place (not dropped and re-added): current text widened to "never an end, so … never the number of legs." (V13:1783–1784, once), the critic's new text; its reason names the restatement |
| **C-4** (medium) `along` reads any public land route | **FIXED** | 942 (n) (a) the critic's text ((b)'s `minClass` target unchanged); 941 (i)'s `role` comment and `minClass?`'s comment; 946 (d)'s T-V13-57 gains "a fort whose frame a trail crosses lies along the trail and gets no approach road;" |
| **C-5** (medium) the way to a gate a kind may lack | **FIXED** | 945 (g) the critic's replacement (the entrance unit's point; the enclosure's `GateSite` where the policy has one; ground part 0); 946 (p)'s T-V14-35 (the free mine; "an entrance no road reaches"; "the way to the entrance writes its reason (the charter road, the entrance, S4's class)"); 946 (x) M13 and 947 (p)'s mirror ("an entrance point (a gate where the enclosure has one)"); 945 (h), 945 (j), 946 (u) ("its entrance (its gate where the enclosure has one, else the entrance unit's point)"; in 945 (h) the phrase spans the line break after "the") |
| C-5, carried | **FIXED** (by the fix lane, the critic's own words) | two instances of the same phrase the critic's list did not name: 945 (f) "each joined to an entrance gate by G5 (f)" and 946 (t)'s J-V14.59 "join it to the nearest entrance gate by S4's router" now read "an entrance (its gate where the enclosure has one, else the entrance unit's point)" — the same defect, the critic's replacement words, nothing invented |
| **C-6** (medium) settlement frames in the A\* path | **FIXED** | 942 (n) (b): every cell inside a placed settlement frame's extent + margin impassable, the critic's words |
| **C-7** (low) an `inFrame` hideout | **FIXED** | 946 (p): "an `inFrame` battlefield none" |
| **C-8** (low) "the full six terms" | **FIXED** | new **948 (e)** V13:2111 ("seven"); J-V13.37's dated "six" (V13:3814) left as the critic says |
| **C-9** (low, optional) `SuitabilityContext.routes` | **FIXED** (taken: the critic supplied the text, and it says at the record what its readers must skip) | new **948 (f)** V13:771 |
| **C-10** (low) V14 §12 | **FIXED** | new **948 (g)** V14:3113 (the dated bracket), **948 (h)** V14:3131–3132 (the PLAUSIBLE bullet) |
| **C-11** (low) census and base head | **FIXED** | new **948 (i)** INDEX:48, **948 (j)** base:5 (insertion after the J392 note: a blank line, then the file-t revision note) |
| **C-12** (low) SUMMARY:213 | **FIXED** | new **948 (k)** ("twenty-six") |
| verifier failures | none to fix | `verify.md` lists none and no drift |

**LEFT:** none of the twelve.

## Choices the fix round made (each the critic's to make, or a mechanical consequence)

- **948 as an item of its own** (the critic offered either that or folding into the items corrected, "the apply lane's
  choice"): taken as item **948. The Fable critique's corrections**, after 947, so each correction keeps its critic id;
  in consequence the record's item range in 947 (a), (b), (c) and 947 (r) reads "items 940–948" (four one-token edits,
  each noted in its fragment's *From:*).
- **draft-t.md kept in step with the machine copy:** the preamble's counts (nine items, 138 fragments: V13 70, V14 44,
  base 4, INDEX 10, SUMMARY 5, brief 2, README 1, gate 2); a "fix round" paragraph; "How to read the items" names item
  948; item 945's opening prose and the "leaves unchanged" bullet on V14 §3.6 (b) 2 say "the nearest entrance (its gate
  where the enclosure has one …)" (C-5); the "leaves unchanged" bullet on V14 §12's CONFIRMED line cites V14:3113 (the
  draft had V14:3223, past the file's 3 213 lines) and names 948 (g)'s bracket; "For the session" (2) no longer lists
  SUMMARY:213 (948 (k) fixes it); a section **Gaps judged not taken** (none, with the three observations below).

## Observed and answered (no change beyond the critic's)

1. **"The way to the gate"** as the step's name (945 (g)'s bold name — kept in the critic's own new text —, 945 (i),
   946 (s), 946 (x)'s "to its gate"): kept; it names the step whose end G5 (f) now defines, and T-V14-35's "the way to
   the entrance writes its reason" (the critic's words) reads the same step. Not a word with two meanings.
2. **"A bridge fort onto the road's river crossing"** (940 (b), 947 (m), item 940's clause table): plain words for the
   owner, where a track is a road ("road access" is the owner's own phrase); the kind row carries the class (`track`).
3. **T-V14-35's "an `inFrame` fort's reservation gains one L3 `driveway` face from its entrance gate"**: right as
   written — a fort has an enclosure and so a gate.

## Verification (the lane scratchpad `sites-roads/fix/verify_installed.py`, run on the installed files at 10:37 UTC)

All 138 fragments: each current text occurs exactly once in its live target, at its recorded line, at the recorded md5;
no two fragments of one target overlap (948 (f) on V13:771 and 941 (b) on :772 are disjoint; 948 (c) on :1258 and
942 (h) on :1263 likewise); applied in order to copies of the eight targets, each current text is found once at its turn
and each new text is present after; no new text already in its target; every fragment's quoted block in `draft-t.md`
equals its machine copy (current, new, reason), and the 138 headings run in the machine copy's order. The corrected rows
keep their tables' cell counts (the kind table 6 cells, V13 §1.1's engine table 4, §2.6's lifecycle table 7). The
after-copies are in `sites-roads/fix/after-*`. Problems: none.

Landed 2026-10-18 (opus; J394, Fable-critiqued).
