# Coherence application — amendments file p (items 878–896) applied to volume 13, the proposal, the brief, the base, the index and the summary (amendments/lens-p-apply)

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — 2 design fragments on V13, 22 dated record brackets and fixes across files m–q and the realm record, 1 research count (lane retrovalidation/amendments; J392)

Seat `amendments/lens-p-apply`, 2026-10-17 (Opus 5.5 standing in for Fable, J375). The coherence pass for
`docs/AMENDMENTS-2026-10-17p.md` (closing the lens design's last six gaps: the lens closing pass critic's list,
`docs/validation/coherence/lens-o-critic.md`, and the session's ruling J387): every change item applied to its target as
the pass applies items — the quoted current text found by exact search (exactly one occurrence at its turn), replaced by
the item's new text verbatim, never paraphrased or guessed. The one item bound for `docs/ARCHITECTURE.md` (890: the
world document's plate cache, BCR-V13-38, declared in §2.9's `Document`) was applied the same way: the base changes only
through amendment files applied by a coherence pass, and this seat is that pass for file p. The index and the summary
(items 891–896) were likewise written by their items, as file p directs, not refreshed by this seat.

- **Source as applied.** `docs/AMENDMENTS-2026-10-17p.md` in the working tree at md5 `ce8e356dc05f5ba26003101528fd1bc3`
  (677 lines) before this seat changed its status line; after the change, md5 `87d9705c4ae3fe33df7d355259d6c81a`
  (677 lines). The file is untracked (written by `amendments/lens-p`, lane log 2026-10-17 13:28, and revised by its
  reviser seat, its review record at the end of the file). [OBSERVED] `git status --short` before application showed
  only `docs/lane-events.log` modified (the authoring seat's LANDED line) and file p untracked; none of the six targets
  was modified, and each target's md5 equalled the prefix file p's preamble and verification record give as its
  baseline (V13 `3320f3ca…`, the base `96598bab…`, the index `72f97005…`, the summary `f70c63d4…`, the proposal
  `efc7ce31…`, the brief `234f3895…`) — V13 and the base exactly as `docs/validation/coherence/lens-o.md` records them
  after file o's application.
- **Items.** 19 change items, 878–896 (V13 9, items 878–886; the proposal 1, item 887; the brief 2, items 888–889; the
  base 1, item 890; the index 4, items 891–894; the summary 2, items 895–896), 32 fragments in all — the count file p's
  verification record states ("19 items, 32 fragments"). Per item: 878 1; 879 2; 880 1; 881 4 (a–d); 882 1; 883 1;
  884 4 (a–d); 885 1; 886 2; 887 1; 888 2; 889 1; 890 2; 891 2; 892 2; 893 1; 894 1; 895 2; 896 1.
- **Method.** Each item parsed from file p by its markers (`**n.** **title**`; `*Current text:*` / `*New text:*` for a
  single fragment, `*Current text* (x):` / `*New text* (x):` for lettered ones, in order), the target taken from the
  `###` heading above the item (`Volume 13` → `docs/volumes/V13-world.md`, `The proposal` →
  `docs/design/proposal-world-native.md`, `The brief` → `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md`,
  `BASE` → `docs/ARCHITECTURE.md`, `The index` → `docs/volumes/INDEX.md`, `The summary` → `docs/volumes/SUMMARY.md`). A
  current text's `⏎` read as a line break with the continuation's indentation kept; a new text's blockquote lines taken
  with the `> ` prefix removed and a bare `>` as an empty line (so item 878's `> > …` lines enter V13 as `> …`
  revision-note lines, an empty line between the file o note and the new one). The parse was checked before
  application: 19 items numbered 878–896 without a gap, every fragment one quoted current line and a non-empty new
  text, letters (a), (b) … in order with each `*New text*` letter matching its `*Current text*`, every `>` line inside a
  marked block, no trailing whitespace on any quote line, no `⏎` in a new text. Items applied in file order, each
  fragment against the target as the earlier items and fragments left it (an item applies whole or not at all; 884's
  fragments in their written order (a), (b), (c), (d), though (d) lands above (a) in the preamble); a quote found other
  than exactly once would have been recorded NOT APPLIED with its count — none was. A dry run over in-memory copies
  preceded the write and gave the same result. After application, each fragment's new text was searched as an exact
  string in the target on disk: every one found exactly once (32 of 32). Each landing line was also checked against
  the nearest preceding Markdown heading in the target and, inside V13 §5.8 and §5.9, against the numbered paragraph or
  lens it falls in, and agrees with the section the item's heading in file p names [OBSERVED]: 878 in the volume's head
  above §1 (the revision notes, after file o's note); 879 in §2.2 (`GateExpr` L820, `LensLayer.legend` L827); 880 in
  §2.3 (`LensRule` L956); 881 (a) inside §5.8 (1) *One record* (from L3068), (b) inside (3) *The honesty rule* (from
  L3090), (c) inside §5.9's lens 5 *Populations* (from L3275), (d) inside lens 7 *Prosperity* (from L3340); 882 on
  T-V13-41's row and 883 on T-V13-47's row of §7.4; 884 (a), (b), (d) in §8.5's preamble and (c) on H22's row; 885 on
  J-V13.100's row of §9; 886 in §11 (Q4's premise and the ruling); 887 in the proposal's §3.8; 888 in the brief's Part C
  (§6), 889 on its §9 host-track row; 890 in the base's §2.9 (the opening list and `Document`); 891 on INDEX §1's V13
  row, 892 in §3 (the diagram and the dependency row), 893 in §4, 894 in §8; 895 in the summary's *How big the whole
  program is*, 896 in its *Decisions that are yours*.
- **Targets** (md5 and line count, before → after):
  - `docs/volumes/V13-world.md`: `3320f3ca1fdc26115f891698bb9d04b0`, 4 348 → `32b526d5d0c52db61a1ad6cbbd339d61`, 4 377.
  - `docs/design/proposal-world-native.md`: `efc7ce31a7f8e7f9ebeb0a89a066e53b`, 277 → `f509e32a3349f0d5d3ac9a5727b332d4`, 281.
  - `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md`: `234f3895b9591452826087b7835278fb`, 199 → `645dc230cf2e1c8b55590c98e095952c`, 203.
  - `docs/ARCHITECTURE.md`: `96598bab9bdd09a6aedde51659a568a7`, 24 457 → `d0f1b84b508f615f3965d45fc6057471`, 24 459.
  - `docs/volumes/INDEX.md`: `72f970053cd983d7eedb94bf45e80d8b`, 251 → `157f091cfc01b08e64f115e90abefbbc`, 251.
  - `docs/volumes/SUMMARY.md`: `f70c63d40cbe1029679336ae1822f541`, 197 → `163f7a0befdb8ec393d319efd3decbd9`, 199.
- **Seams read.** [OBSERVED in `git diff --word-diff`] each applied seam joins its surrounding text without a doubled or
  dropped word: 884 (a) leaves "behaviour — a raid's outcome word"; 884 (d) "H22 carries ⏎ the birth canon every
  lens's regime starts on, and H23 – H30 the lenses' asks … within H23 – H30 the exports"; 881 (c) ends "none where the
  lane is dark or no intensity is sent." and the paragraph continues as before; 886 (a) ends "as the campaign is
  created." with V13's " The session reads it as outside door 1" kept on the same line; 888 (a) closes its parenthesis
  before the brief's kept "and a host fight verdict alone moving a march line"; 890 (b) adds one `Document` line after
  `derived`'s, before `undo?`. Several replace text inside one table row or one long line, which stays one line: 879
  (a), (b), 880, 882, 883, 884 (c), 885, 889, 891 (a), (b), 892 (a), (b), 893, 894, 896.
- **Status line.** File p's `**PENDING APPLICATION**` (its line 7) replaced by "**APPLIED** by amendments/lens-p-apply on
  2026-10-17 (record: docs/validation/coherence/lens-p.md)", with the note that all 19 items and 32 fragments applied and
  no item was left unapplied. The verification record's own sentence "The file is PENDING APPLICATION and, under J375,
  pending Fable review" (file p's line 640) is that record's dated account and was left as written.
- **Bundle.** `python3 tools/bundle_architecture.py` rebuilt `docs/ARCHITECTURE-FULL.md`; `--check` run after (§2).
- **Kernel.** No item targets `plat/packages/kernel`, and [OBSERVED by exact search over file p's change items] none
  names the kernel. [INFERRED] nothing in file p touches the kernel's frozen surface.
- **Not checked here.** The clean-room lint and the residue check over every fragment are the reviser seat's (file p's
  preamble and verification record); this seat re-ran neither in full. The arithmetic in item 895 was re-added by this
  seat [INFERRED: 392 + 37 + 25.75 = 454.75 → 455; 539 + 45 + 36.25 = 620.25 → 620 — agreeing with the new text].

## 1 The items, one row each

Columns: item · target file · heading in file p · item title · matched · applied / not · check (each fragment's new
text counted by exact search in the target on disk after the whole file's application, with the line or lines it now
occupies).

| item | target | heading | title | matched | status | check |
|---|---|---|---|---|---|---|
| 878 | `docs/volumes/V13-world.md` | Volume 13 — the revision notes under the title | The lens design's last six gaps recorded under the title. | 1 fragment; its current text found exactly once at its turn | APPLIED | ×1 at L71–84 — PASS |
| 879 | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (the lens records) | `GateExpr` reads the birth defaults and the host's intensity; the legend's notes carry their gates. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L820; (b) ×1 at L827 — PASS |
| 880 | `docs/volumes/V13-world.md` | Volume 13 — §2.3 New rule tables (`world.lens`) | `world.lens`'s rows carry each lens's notes with their gates. | 1 fragment; its current text found exactly once at its turn | APPLIED | ×1 at L956 — PASS |
| 881 | `docs/volumes/V13-world.md` | Volume 13 — §5.8 The lens mechanism, (1) *One record* and (3) *The honesty rule*; §5.9 (5) and (7), the populations and prosperity notes | The gate atoms name the birth defaults and the intensity; each built bias said under the gate the host's facts give it. | 4 fragments (a, b, c, d); each current text found exactly once at its turn | APPLIED | (a) ×1 at L3071; (b) ×1 at L3094–3103; (c) ×1 at L3277–3284; (d) ×1 at L3342–3343 — PASS |
| 882 | `docs/volumes/V13-world.md` | Volume 13 — §7.4 Editing, view, exports, budgets (T-V13-41) | T-V13-41 (s): a verdict the player picture is not shown decides none of its cells. | 1 fragment; its current text found exactly once at its turn | APPLIED | ×1 at L3537 — PASS |
| 883 | `docs/volumes/V13-world.md` | Volume 13 — §7.4 Editing, view, exports, budgets (T-V13-47) | T-V13-47: a note whose gate fails is absent; the small-seat, authorship and lean notes on the host's own gates. | 1 fragment; its current text found exactly once at its turn | APPLIED | ×1 at L3543 — PASS |
| 884 | `docs/volumes/V13-world.md` | Volume 13 — §8.5 The host's parallel track (the preamble; H22) | The birth canon is the product ruling the host implements, not an offer and not the entitlement's choice; its prerequisites kept, its later seats said. | 4 fragments (a, b, c, d); each current text found exactly once at its turn | APPLIED | (a) ×1 at L3662; (b) ×1 at L3666–3670; (c) ×1 at L3696; (d) ×1 at L3658–3660 — PASS |
| 885 | `docs/volumes/V13-world.md` | Volume 13 — §9 Decisions (J-V13.100) | J-V13.100: the birth canon a product ruling; the host's choice among the rejected options. | 1 fragment; its current text found exactly once at its turn | APPLIED | ×1 at L3813 — PASS |
| 886 | `docs/volumes/V13-world.md` | Volume 13 — §11 Owner questions (the birth canon ruling) | Q4's premise names the birth canon; the §11 ruling states it as the product ruling. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L4226–4228; (b) ×1 at L4244–4247 — PASS |
| 887 | `docs/design/proposal-world-native.md` | The proposal — §3.8 Political materialization | The religions and the economy are drawn by the lenses, never projected by the sway. | 1 fragment; its current text found exactly once at its turn | APPLIED | ×1 at L142–147 — PASS |
| 888 | `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | The brief — §6 Part C — rulings under the delegation and the owner questions that remain | The birth canon stated as the product ruling, with what it gives and what it leaves; Q4 holds it. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L110–115; (b) ×1 at L120 — PASS |
| 889 | `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | The brief — §9 Order and timing | The host's track: the birth canon a product ruling, after its prerequisites and held by Q4. | 1 fragment; its current text found exactly once at its turn | APPLIED | ×1 at L197 — PASS |
| 890 | `docs/ARCHITECTURE.md` | BASE — §2.9 The document and serialisation, `Document` (the base is stale: BCR-V13-38) | The world document's plate cache declared beside `derived`. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L3849–3850; (b) ×1 at L3880–3881 — PASS |
| 891 | `docs/volumes/INDEX.md` | The index — §1 The product map (the V13 row) | V13's row: the sway, patrols and lenses in its contents; M-W0 – M-W5 at 37–45 pw. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L39; (b) ×1 at L39 — PASS |
| 892 | `docs/volumes/INDEX.md` | The index — §3 The dependency graph (the diagram; the world row) | The diagram and the dependency row run to M-W5. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L109; (b) ×1 at L133 — PASS |
| 893 | `docs/volumes/INDEX.md` | The index — §4 The combined build order after M5, with estimates | The build order names M-W5. | 1 fragment; its current text found exactly once at its turn | APPLIED | ×1 at L147 — PASS |
| 894 | `docs/volumes/INDEX.md` | The index — §8 CONFIRMED versus PLAUSIBLE | The world's price among the PLAUSIBLE: 37–45 pw. | 1 fragment; its current text found exactly once at its turn | APPLIED | ×1 at L248 — PASS |
| 895 | `docs/volumes/SUMMARY.md` | The summary — How big the whole program is | The world about 37–45 person-weeks, the lenses named; the whole program about 455–620. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L113–116; (b) ×1 at L119 — PASS |
| 896 | `docs/volumes/SUMMARY.md` | The summary — Decisions that are yours | The two volumes' cost: 37–45 and 25.75–36.25 person-weeks. | 1 fragment; its current text found exactly once at its turn | APPLIED | ×1 at L186 — PASS |

## 2 The bundle

- `python3 tools/bundle_architecture.py` → "wrote docs/ARCHITECTURE-FULL.md: 80976 lines from 16 source(s)" (exit 0).
- `python3 tools/bundle_architecture.py --check` → "UP TO DATE /home/user/maps-architecture/docs/ARCHITECTURE-FULL.md"
  (exit 0).

## 3 Result

19 of 19 change items APPLIED (32 fragments); none NOT APPLIED. The base changed through item 890 only. File p's status
line reads APPLIED with this record named. The index's and the summary's milestone and price lines that file o left to
a refresh (INDEX :39, :248; SUMMARY :113, :184) now read 37–45 pw and M-W5 by items 891–896, so the bundle, which
carries the index, no longer carries the stale 28–36. Not done here, as file p's preamble states (*Not items*, *The
pending BCR ledger*, *For the session*): BCR-V13-30 – BCR-V13-36 and BCR-V13-39 still await admission items of their own
(J387's ledger, `docs/PROGRESS.md:446`); the J-row on an additive re-canonize outside the premium entitlement is the
session's to write; the index's V13 owner-question rows (`docs/volumes/INDEX.md:217-219`) and the summary's
plain-language world section, build-order step and decisions paragraph; the base's D-20 restatement of the whole
program and its §11.4 sentence on the world port's canon (left to the coherence pass); the summary's figures against
the base's §16 totals; V13's revision notes m, n and o; the critic's list (unchanged).
