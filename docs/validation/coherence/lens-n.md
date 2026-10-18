# Coherence application — amendments file n (items 780–837) applied to volumes 13 and 14, the proposal, the brief and the base (amendments/lens-n-apply)

> Fable-reviewed 2026-10-18: PASS-WITH-CORRECTIONS — 2 design fragments on V13, 22 dated record brackets and fixes across files m–q and the realm record, 1 research count (lane retrovalidation/amendments; J392)

Seat `amendments/lens-n-apply`, 2026-10-17 (Opus 5.5 standing in for Fable, J375). The coherence pass for
`docs/AMENDMENTS-2026-10-17n.md` (the map lenses over the host's simulated systems; the J384 rulings): every change item
applied to its target as the pass applies items — the quoted current text found by exact search (exactly one occurrence
at its turn), replaced by the item's new text verbatim, never paraphrased or guessed. The three items bound for
`docs/ARCHITECTURE.md` (835–836, each a place the base itself is wrong; 837, the base's world port paragraph and its
fifth door brought to the lens window and the site offers) were applied the same way: the base changes only through
amendment files applied by a coherence pass, and this seat is that pass for file n.

- **Source as applied.** `docs/AMENDMENTS-2026-10-17n.md` in the working tree at md5 `2ae0751b713b1269f1a44d70a7579f66`
  (2 007 lines) before this seat changed its status line; after the change, md5 `6f6097d54bbb2f4978da486c757ec180`
  (2 007 lines). The file is untracked (written by `amendments/lens-n`, lane log 2026-10-17 11:00, and revised by its
  reviser seat, its review record at the end of the file). [OBSERVED] `git status --short` before application showed
  only `docs/lane-events.log`, `research/sf/fp-physical-integration.md` and `research/sf/fp-realm-review.md` modified
  (the last two carry the authoring seat's two dated brackets, file n's "*Written directly by this seat*", not
  application items; this seat did not touch them) and file n untracked; none of the five targets was modified, and
  each target's md5 equalled the "after" md5 recorded by `docs/validation/coherence/realm-m.md` — the targets stood
  exactly as file m's application left them.
- **Items.** 58 change items, 780–837 (V13 46, items 780–825; V14 6, items 826–831; the proposal 1, item 832; the
  brief 2, items 833–834; the base 3, items 835–837), 131 fragments in all — the count file n's review record states
  ("131 fragments over 58 items"). File n's group A (J382 (a)–(b)) and J384 (2), (4) carry no item: file m applied
  them (file n's *Not items*).
- **Method.** Each item parsed from file n by its markers (`**n.** **title**`, a title wrapping to a second line read
  whole; `*Current text*` / `*New text*`, lettered fragments in order), the target taken from the `###` heading above
  the item (`Volume 13` → `docs/volumes/V13-world.md`, `Volume 14` → `docs/volumes/V14-sites.md`, `The proposal` →
  `docs/design/proposal-world-native.md`, `The brief` → `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md`,
  `BASE` → `docs/ARCHITECTURE.md`). A current text's `⏎` read as a line break with the continuation's indentation
  kept; a new text's blockquote lines taken with the `> ` prefix removed and a bare `>` as an empty line. The parse was
  checked before application: 58 items numbered 780–837 without a gap, every fragment one quoted current line and a
  non-empty new text, letters (a), (b) … in order, every `>` line inside a marked block, no trailing whitespace on any
  quote line. Items applied in file order, each fragment against the target as the earlier items and fragments left it
  (an item applies whole or not at all); a quote found other than exactly once would have been recorded NOT APPLIED
  with its count — none was. After application, each fragment's new text was searched as an exact string in the target
  on disk: every one found exactly once. Each landing line was also checked against the nearest preceding Markdown
  heading in the target, and agrees with the section the item's heading in file n names [OBSERVED] (780 and 781 land in
  the volume's head above §1; 805 and 806–807 inside §3.11, whose subsections §3.11.5 and §3.11.6 are not `#`
  headings; 810's new text begins with the quoted close of §5.7 and opens the new §5.8 after it).
- **Targets** (md5 and line count, before → after):
  - `docs/volumes/V13-world.md`: `aec3207d63a16ce8818b7ae32c37bc9c`, 3 679 → `c6956b05837e3116b1e82c6e4e892e20`, 4 216.
  - `docs/volumes/V14-sites.md`: `9d59d45d799b0dde12d0544c911478ab`, 3 198 → `56bef233583153d7caa7b64f6e49d46f`, 3 208.
  - `docs/design/proposal-world-native.md`: `7374c2860e4930907a072fd747052018`, 275 → `efc7ce31a7f8e7f9ebeb0a89a066e53b`, 277.
  - `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md`: `a01b8471dfe5d5e18379f7783cf1d87e`, 189 → `9d60fdd06fc147921ad1dfacd5e8774c`, 194.
  - `docs/ARCHITECTURE.md`: `c6b036435d7c1310a0236de63c6e6295`, 24 456 → `81efb0c63319bf1927b0eebcabb42558`, 24 457.
- **V13's new sections.** [OBSERVED] after application V13 has `### 5.8 The lens mechanism` (line 3007) and
  `### 5.9 The lenses` (line 3099), each once, between §5.7 (line 2990) and `## 6 Performance budgets` (line 3268).
- **Status line.** File n's `**PENDING APPLICATION**` replaced by "**APPLIED** by amendments/lens-n-apply on 2026-10-17
  (record: docs/validation/coherence/lens-n.md)", with the note that all 58 items and 131 fragments applied and no item
  was left unapplied.
- **Bundle.** `python3 tools/bundle_architecture.py` rebuilt `docs/ARCHITECTURE-FULL.md`; `--check` run after (see §2).
- **Kernel.** No item targets `plat/packages/kernel`, and [OBSERVED by exact search over the 131 new texts] none names
  BCR-V13-8, the kernel or its registry files (the one "registry" hit is item 782's "the base's live-layer registry",
  a base view row, BCR-V13-13). [INFERRED] nothing in file n touches the kernel's frozen surface; the plate cache
  (`Document.lensPlates`) enters the base only as BCR-V13-38's request (item 822), not as a base edit.
- **Not checked here.** The clean-room lint and the residue check over every changed fragment are the reviser seat's
  (file n's review record); this seat re-ran neither in full, but read the base's and the proposal's applied seams in
  `git diff` [OBSERVED: each joins its surrounding text without a doubled or dropped word].

## 1 The items, one row each

Columns: item · target file · heading in file n · item title · matched · applied / not · check (each fragment's new
text counted by exact search in the target on disk after the whole file's application, with the line or lines it now
occupies).

| item | target | heading | title | matched | status | check |
|---|---|---|---|---|---|---|
| 780 | `docs/volumes/V13-world.md` | Volume 13 — the revision notes under the title | The lens design recorded under the title. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L45–56 — PASS |
| 781 | `docs/volumes/V13-world.md` | Volume 13 — *How to read this volume* (the citation rule) | The item ranges as they now stand. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L66–67 — PASS |
| 782 | `docs/volumes/V13-world.md` | Volume 13 — §1.1 What this volume builds | The lens engine. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L146–147 — PASS |
| 783 | `docs/volumes/V13-world.md` | Volume 13 — §1.3 The owner rules obeyed (file j; quoted by item) | J384 in the territory rule's paragraph; the owner's lens requests. | 3 fragments (a, b, c); each current text found exactly once at its turn | APPLIED | (a) ×1 at L290–291; (b) ×1 at L294–295; (c) ×1 at L300–314 — PASS |
| 784 | `docs/volumes/V13-world.md` | Volume 13 — §1.4 Out of scope, with the reason | The host's political facts as now sent; the host's simulated systems are the host's, the lenses draw them. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L327–328; (b) ×1 at L331–335 — PASS |
| 785 | `docs/volumes/V13-world.md` | Volume 13 — §1b.1 Records, fields and tables | The polity window's new fields; the lens records, the lens table, the codes and the view keys. | 5 fragments (a, b, c, d, e); each current text found exactly once at its turn | APPLIED | (a) ×1 at L403–407; (b) ×1 at L420; (c) ×1 at L421–422; (d) ×1 at L424; (e) ×1 at L398 — PASS |
| 786 | `docs/volumes/V13-world.md` | Volume 13 — §1b.2 Stage outputs and interfaces | The lens window on the port; the lens readers. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L446; (b) ×1 at L457–460 — PASS |
| 787 | `docs/volumes/V13-world.md` | Volume 13 — §1b.3 Edit kinds (each with its tool, lifecycle row and undo) | The lens view keys and the plate pin are not edits. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L486–489 — PASS |
| 788 | `docs/volumes/V13-world.md` | Volume 13 — §1b.4 Entity kinds (each rendered, labelled, exported, persisted) | The lens marks. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L503–504 — PASS |
| 789 | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (the canon's sites slot) | The sites slot's ground carries its class and step cost. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L743 — PASS |
| 790 | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (the polity window and the sway's revision) | The strength band and its dated changes, the satellites, the claims renamed, the culture band's week, the held median. | 6 fragments (a, b, c, d, e, f); each current text found exactly once at its turn | APPLIED | (a) ×1 at L757–758; (b) ×1 at L759; (c) ×1 at L762–764; (d) ×1 at L767; (e) ×1 at L772–773; (f) ×1 at L777 — PASS |
| 791 | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (the lived network) | A bypass among the network's change kinds. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L781 — PASS |
| 792 | `docs/volumes/V13-world.md` | Volume 13 — §2.2 New records (the event index and the lens records) | Events tagged with their lenses; the lens records. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L732–734; (b) ×1 at L784–821 — PASS |
| 793 | `docs/volumes/V13-world.md` | Volume 13 — §2.3 New rule tables (`world.polity`) | Log-linear size and prosperity on the relative rung; the push per band; the patrol's force shift. | 8 fragments (a, b, c, d, e, f, g, h); each current text found exactly once at its turn | APPLIED | (a) ×1 at L897; (b) ×1 at L899; (c) ×1 at L902; (d) ×1 at L903; (e) ×1 at L1037–1038; (f) ×1 at L1042; (g) ×1 at L1047; (h) ×1 at L1048 — PASS |
| 794 | `docs/volumes/V13-world.md` | Volume 13 — §2.3 New rule tables (`world.lens`) | The lens rule. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L912–917; (b) ×1 at L1051–1061 — PASS |
| 795 | `docs/volumes/V13-world.md` | Volume 13 — §2.6 The lifecycle of every state field this volume adds or gives a producer | The plates' lifecycle; the lens view keys. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L1185–1186; (b) ×1 at L1194 — PASS |
| 796 | `docs/volumes/V13-world.md` | Volume 13 — §2.7 The version table, the digests and the storage of the world | The plates are a cache outside the digests. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L1217–1219 — PASS |
| 797 | `docs/volumes/V13-world.md` | Volume 13 — §3.8 W7 Routes, (9) *The lived network* | A bypass re-lays the route around the avoided seat. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L1693–1696 — PASS |
| 798 | `docs/volumes/V13-world.md` | Volume 13 — §3.9 W8b, (5) *Inputs* | The strength band, the satellites and the claims among the inputs. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L1747; (b) ×1 at L1748–1749 — PASS |
| 799 | `docs/volumes/V13-world.md` | Volume 13 — §3.9 W8b, (7) *Strength and reach* | Prosperity relative to the realm's held median; the size third the seat's own; ln reach linear. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L1768–1779 — PASS |
| 800 | `docs/volumes/V13-world.md` | Volume 13 — §3.9 W8b, (8) *Neighbours* | The adversarial push defers to the host's strength order; the vassal reinforcement left to the tie-break; "outranked". | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L1790–1801; (b) ×1 at L1823–1826 — PASS |
| 801 | `docs/volumes/V13-world.md` | Volume 13 — §3.9 W8b, (11) *Fights over the debatable land* | A raid with the host's outcome word is a verdict; embattlement through the overlay only. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L1848–1851 — PASS |
| 802 | `docs/volumes/V13-world.md` | Volume 13 — §3.9 W8b, (12) *Events* | Satellites at their frozen site points and their small reach; the host's lineage claims drawn. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L1863–1870 — PASS |
| 803 | `docs/volumes/V13-world.md` | Volume 13 — §3.9 W8b, (13) *Revisions, not ticks* | The median, the strength band and the satellites as triggers; the planting line. | 3 fragments (a, b, c); each current text found exactly once at its turn | APPLIED | (a) ×1 at L1874–1876; (b) ×1 at L1882–1884; (c) ×1 at L1886 — PASS |
| 804 | `docs/volumes/V13-world.md` | Volume 13 — §3.9 W8b, (14) *Patrols* | The patrol cadence moved by the force band of its source. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L1900–1904 — PASS |
| 805 | `docs/volumes/V13-world.md` | Volume 13 — §3.11.5 P5 — the precedence stamp, mirror, world-wins and the orientation-dependent terms | A dossier fact changed after placement re-runs the blend. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L2182–2186 — PASS |
| 806 | `docs/volumes/V13-world.md` | Volume 13 — §3.11.6 The port (the simulator feed's physical facts and the charter) | The sites slot's classes and step costs; a water edge's limits on request; the charter's terrain word. | 4 fragments (a, b, c, d); each current text found exactly once at its turn | APPLIED | (a) ×1 at L2239–2240; (b) ×1 at L2247; (c) ×1 at L2248–2250; (d) ×1 at L2287–2289 — PASS |
| 807 | `docs/volumes/V13-world.md` | Volume 13 — §3.11.6 The port (the lens window, the site offers, the word law) | The lens window; the DM-placed site offers; `outranked` and *plate* in the word law. | 3 fragments (a, b, c); each current text found exactly once at its turn | APPLIED | (a) ×1 at L2273–2276; (b) ×1 at L2324–2329; (c) ×1 at L2349–2352 — PASS |
| 808 | `docs/volumes/V13-world.md` | Volume 13 — §5.1 The world map: layers and styles | The week drawn; satellites at their points; claims; planting lines; the lens layers; the player picture's strength bands; the lens sentence. | 7 fragments (a, b, c, d, e, f, g); each current text found exactly once at its turn | APPLIED | (a) ×1 at L2905; (b) ×1 at L2905; (c) ×1 at L2905; (d) ×1 at L2907; (e) ×1 at L2908–2909; (f) ×1 at L2919–2921; (g) ×1 at L2923–2926 — PASS |
| 809 | `docs/volumes/V13-world.md` | Volume 13 — §5.7 What the world gives a 2.5D projection | The lens marks are draped too. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L2998; (b) ×1 at L3001 — PASS |
| 810 | `docs/volumes/V13-world.md` | Volume 13 — §5.8 The lens mechanism (new) | One mechanism for every lens: the record, the regime, the honesty rule, the four classes, the words, the audience, the scrub and the plates. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L3005–3097 — PASS |
| 811 | `docs/volumes/V13-world.md` | Volume 13 — §5.9 The lenses (new) | The eight lenses, in J384 (8)'s order, each a row set of the mechanism. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L3099–3268 — PASS |
| 812 | `docs/volumes/V13-world.md` | Volume 13 — §6 Performance budgets (the budget register) | The plate store's budget and a lens's draw. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L3345–3348 — PASS |
| 813 | `docs/volumes/V13-world.md` | Volume 13 — §7 Tests and acceptance bars (the corpus; §7.3's blend; §7.4's sway and patrol tests) | The corpus takes the lens window; T-V13-24 the dossier re-blend; T-V13-41 and T-V13-42 take J384, the force shift, the reinforcement, the bypass and the planting line. | 7 fragments (a, b, c, d, e, f, g); each current text found exactly once at its turn | APPLIED | (a) ×1 at L3359–3363; (b) ×1 at L3404; (c) ×1 at L3424; (d) ×1 at L3424; (e) ×1 at L3424; (f) ×1 at L3424; (g) ×1 at L3425 — PASS |
| 814 | `docs/volumes/V13-world.md` | Volume 13 — §7.4 Editing, view, exports, budgets (the lens tests) | T-V13-47 – T-V13-55: one test per lens rule and per lens group. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L3430–3439 — PASS |
| 815 | `docs/volumes/V13-world.md` | Volume 13 — §7.5 The report codes | The strength, satellite and lens codes; the lens refusals in their own row. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L3455–3459; (b) ×1 at L3471–3472 — PASS |
| 816 | `docs/volumes/V13-world.md` | Volume 13 — §8.2 Milestones | M-W5 the lenses; T-V13-44 and T-V13-45 gated; the estimate. | 6 fragments (a, b, c, d, e, f); each current text found exactly once at its turn | APPLIED | (a) ×1 at L3499; (b) ×1 at L3501; (c) ×1 at L3502–3503; (d) ×1 at L3505; (e) ×1 at L3506; (f) ×1 at L3508 — PASS |
| 817 | `docs/volumes/V13-world.md` | Volume 13 — §8.5 The host's parallel track (the one list; the critic's gaps) | The design's one host-change list; H5, H12, H14, H16 and H21 as the critic found them. | 7 fragments (a, b, c, d, e, f, g); each current text found exactly once at its turn | APPLIED | (a) ×1 at L3540–3552; (b) ×1 at L3560; (c) ×1 at L3567; (d) ×1 at L3569; (e) ×1 at L3571; (f) ×1 at L3571; (g) ×1 at L3576 — PASS |
| 818 | `docs/volumes/V13-world.md` | Volume 13 — §8.5 The host's parallel track (the lens asks) | H13 takes the strength order, the satellites, the claims and the forced tributes; H22 – H30 the lens asks and a native world canonized at birth. | 5 fragments (a, b, c, d, e); each current text found exactly once at its turn | APPLIED | (a) ×1 at L3568; (b) ×1 at L3568; (c) ×1 at L3568; (d) ×1 at L3568; (e) ×1 at L3576–3585 — PASS |
| 819 | `docs/volumes/V13-world.md` | Volume 13 — §9 Decisions | J-V13.83 – J-V13.99; J-V13.78's words. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L3672; (b) ×1 at L3676–3693 — PASS |
| 820 | `docs/volumes/V13-world.md` | Volume 13 — §10 Base change requests (BCR-V13-5, BCR-V13-11) | The world's view keys gain the lens keys; the world port's revision note names the lens window. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L3752–3755; (b) ×1 at L3816–3820 — PASS |
| 821 | `docs/volumes/V13-world.md` | Volume 13 — §10 Base change requests (BCR-V13-32) | The fabric crosswalk's rows. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L3982–4000 — PASS |
| 822 | `docs/volumes/V13-world.md` | Volume 13 — §10 Base change requests (BCR-V13-37, BCR-V13-38) | The estimate with M-W5; the plate cache. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L4018–4029 — PASS |
| 823 | `docs/volumes/V13-world.md` | Volume 13 — §10.2 Requests to V14 | R-V14-13: the devotion card. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L4046–4047 — PASS |
| 824 | `docs/volumes/V13-world.md` | Volume 13 — §11 Owner questions | Who keeps a gate under the sway: ruled, recorded; Q2's question and schedule take H22 – H30 and M-W5. | 4 fragments (a, b, c, d); each current text found exactly once at its turn | APPLIED | (a) ×1 at L4060; (b) ×1 at L4062; (c) ×1 at L4065; (d) ×1 at L4080–4089 — PASS |
| 825 | `docs/volumes/V13-world.md` | Volume 13 — §12 CONFIRMED versus PLAUSIBLE | The bounded deferral of the owner's normalization directive; the lens cells PLAUSIBLE. | 3 fragments (a, b, c); each current text found exactly once at its turn | APPLIED | (a) ×1 at L4106; (b) ×1 at L4115; (c) ×1 at L4122–4128 — PASS |
| 826 | `docs/volumes/V14-sites.md` | Volume 14 — §1b.1 Records, fields and tables | The request's devotion and its readers. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L351 — PASS |
| 827 | `docs/volumes/V14-sites.md` | Volume 14 — §2.2 The card, the request, the programme, the vector, the graph and the lifecycle | A DM-placed holy or hidden cult site: the devotion on the request. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L576–577; (b) ×1 at L581–587 — PASS |
| 828 | `docs/volumes/V14-sites.md` | Volume 14 — §3.3 G2 — Request resolution | A cult devotion makes the site secret by default. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L1367–1368 — PASS |
| 829 | `docs/volumes/V14-sites.md` | Volume 14 — §7 Tests and acceptance bars | T-V14-33: the devotion card. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L2857–2858 — PASS |
| 830 | `docs/volumes/V14-sites.md` | Volume 14 — §9 Decisions | J-V14.56: holy and cult sites as cards with a devotion. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L3004–3005 — PASS |
| 831 | `docs/volumes/V14-sites.md` | Volume 14 — §10.2 Cross-volume requests | Request (5) names the culture as it now stands. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L3048 — PASS |
| 832 | `docs/design/proposal-world-native.md` | The proposal — §6 What the host must change | §6 points at V13 §8.5, the one list; the sixth old item's terrain word. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L191–194; (b) ×1 at L198–199 — PASS |
| 833 | `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | The brief — §6 Part C — rulings under the delegation | Who keeps a gate; the lenses. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L103–108 — PASS |
| 834 | `docs/OWNER-BRIEF-WORLD-SITES-HYDROLOGY-DRAFT-2026-10-16.md` | The brief — §9 Order and timing | The world milestones take the lenses; the host's track beside them takes H22 – H30. | 2 fragments (a, b); each current text found exactly once at its turn | APPLIED | (a) ×1 at L187; (b) ×1 at L188 — PASS |
| 835 | `docs/ARCHITECTURE.md` | BASE — §11.3 The host bridge, *Vocabulary* (the base is wrong: an unindented continuation line) | The continuation line indented. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L17583–17584 — PASS |
| 836 | `docs/ARCHITECTURE.md` | BASE — §11.3 The host bridge, *View state* (the base is wrong: the host's clock omits the world windows) | The host's clock reaches a world document through door (5)'s windows too. | 1 fragment; each current text found exactly once at its turn | APPLIED | ×1 at L17629–17630 — PASS |
| 837 | `docs/ARCHITECTURE.md` | BASE — §7.7 the world port paragraph and §11.4 door (5) (the base is stale: the lens window and the site offers) | The world port's presentation inputs gain the lens window, its map feed the site offers, door (5) the plates. | 3 fragments (a, b, c); each current text found exactly once at its turn | APPLIED | (a) ×1 at L12896; (b) ×1 at L12896; (c) ×1 at L17682 — PASS |

## 2 The bundle

- `python3 tools/bundle_architecture.py` → "wrote docs/ARCHITECTURE-FULL.md: 80813 lines from 16 source(s)" (exit 0).
- `python3 tools/bundle_architecture.py --check` → "UP TO DATE /home/user/maps-architecture/docs/ARCHITECTURE-FULL.md"
  (exit 0).

## 3 Result

58 of 58 change items APPLIED (131 fragments); none NOT APPLIED. The base changed through items 835–837 only. File n's
status line reads APPLIED with this record named. Not done here, as file n's *Not items* state: J382 (a)–(b) and J384
(2), (4) (applied by file m); the critic's list itself (unchanged); the six system notes' corrections to
`research/sf/fp-physical-integration.md` beyond row A1 (the research seats'); the lens note's asks 18 and 35 (host
questions, carried as H25's clauses). The two research brackets file n's seat wrote directly
(`research/sf/fp-realm-review.md` §5, `research/sf/fp-physical-integration.md` §8) are that seat's, not application
items, and were left as found.
