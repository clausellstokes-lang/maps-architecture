# hidden-ways/apply — file w applied to the five targets (2026-10-19)

**Seat:** hidden-ways/apply (Opus/high), under the apply workflow J422, on the owner's decision J421 (2026-10-19 07:12Z,
verbatim: "i follow your recommendations"). No git run. Written as the seat goes.

## 1. Before
- Resume check: no `apply.md`, no LANDED line for `hidden-ways/apply` in `docs/lane-events.log` — fresh start.
- Targets before (md5, `wc -l`): V13 `e68af748638dd3c8474d21b37005c7ac` (4611), V14 `f5dd37a7e9b739da7f29095d47a17a87` (3340),
  HRQ `7db37cc1a4e03fc8db665c1be9d55211` (935), INDEX `10a72c97f86a88533292971629c56539` (260),
  SUMMARY `1c0ada295f24b9e22909ce86eaec2cd8` (228) — every one the fragments' stated md5. Copies kept in the session
  scratchpad `pre-apply/`.
- Record: `draft-w.md` 8148b834 (1143 lines), `draft-w.fragments.json` f79dbd49 (114 records) — the answer seat's outputs.
- `synth-scripts/check_json.py` re-run: PASS 114/114; after application V13 81b3a003, V14 1fcdce8e, HRQ 7ff6f944,
  INDEX 1f988c2d, SUMMARY 7de28faa.

## 2. The application — `synth-scripts/apply_w.py` (`python3 -I`)
- Form: for each record of `draft-w.fragments.json` in order — its new must not occur yet (the resume guard), its old
  exactly once in the target as it then stood; old → new once; the new checked once, at the old's place; the target
  written after each fragment; stop at the first failure. Dry run on in-memory copies first (`dry` mode): 114 applied,
  no failure, the same five after-md5s as below. Then live: **114 applied, 0 already, 0 failures**. Machine copy of the
  run: `apply-run.json`.
- After (md5, `wc -l`): V13 `81b3a00364b1026b7c3b6a047a59a605` (4832), V14 `1fcdce8e633db3b39322e3c3854cc99a` (3341),
  HRQ `7ff6f94425d4842757116d20a0ee628c` (938), INDEX `1f988c2d9795d10fb8cb5a9ccaf06c5b` (261),
  SUMMARY `7de28faa4c5df1819d33063058523ae6` (245).
- Against the expectations: V14, HRQ, INDEX, SUMMARY equal fix-2's (`fix-2.md:16`) and `answer.md` §3's. V13 is
  **81b3a003**, not fix-2's a276c57f: the answer seat's 966 (c) edit (J421's sentence, two lines) moved it; the
  expectation was recomputed by applying to copies first (the dry run, and `check_json.py`), both giving 81b3a003.

## 3. The checks after
- Every new text exactly once in its target: **114/114**. No current text left outside its own new text: 0.
- Reversal: the 114 new texts put back by their old in reverse order on the live texts (scratchpad `reverse_check.py`)
  restore all five targets byte for byte against `pre-apply/`.
- Clean room: no token of critic-3's list (`critic-3.md:34`: `way_known`, `way_rung`, `way_forgotten`, `settlementId`,
  `wayId`, `.js`, `.ts`, `research/sf`, `HRQ:`, `FPI:`, `TRD:`, `FTH:`, `FPS:`, `FRR:`, `PLG:`, `LNS:`, `src/`) added by
  any V13/V14 new text. The H-row ids in V13 new texts (H9, H12, H17, H32, …) are V13 §8.5's own host-track rows (20
  such ids in V13 before this file); 955 (a) cites the request document's path (a map-repository doc, not host source).
- `draft-w.md` 8148b834 and `draft-w.fragments.json` f79dbd49 unchanged (re-hashed after).
- `tools/bundle_architecture.py --check`: UP TO DATE before, **STALE** after (exit 1) — not regenerated: outside this
  seat's step as the task names it (the draft's status line `draft-w.md:7` assigns it to the apply lane); left for the
  managing session (one command, `python3 -I tools/bundle_architecture.py`).

## 4. The applied file
`docs/AMENDMENTS-2026-10-18w.md` by `synth-scripts/write_w.py`: file v's form — title, the provenance line, "Numbered
from **955** (file v ended at 954); items 955–975", the **APPLIED** line (2026-10-19, J421 verbatim and its three
parts), *The application, target by target* (the five before → after md5s, lines, fragment counts), the draft's
*Sources* and *How to read the items* (with one sentence: "as it stands now" = before this file), `---`, then the
items **byte for byte** as `draft-w.md` holds them (from `## The items` to its end; asserted by the script), then
*For the session (not items)*.

## 5. Residue (not edited; for the managing session)
Four applied new texts still call V13 §11 Q5 open (the answer seat's `answer.md` §4, confirmed live):
965 (a) J-V13.116 `V13-world.md:4213` ("put to the owner in Q5 (vetoable)"); 968 (l) `HOST-REQUIREMENTS-2026-10-18.md:717`
("open for the owner with the price and the bodies chain's order"); 969 (g) `INDEX.md:225` (the V13 Q5 row,
"(recommended; vetoable)"); 969 (k) `SUMMARY.md:173` ("file w, pending your look"). A follow-up file x in file v's
form would carry J421 into them. Also the bundle (§3) and the ledger row for J421's application.

## 6. The application table
"landed" = the line the fragment's text started at in the target as it stood at its turn; "final" = its line in the
finished target (later fragments of the same file above it move it); "stated" = the draft's line (before file w).

| id | file | stated | landed | final | ok |
|---|---|---|---|---|---|
| 955 (a) | V13 | 140 | 140 | 140 | ok (new ×1) |
| 955 (b) | V13 | 374 | 388 | 389 | ok (new ×1) |
| 955 (c) | V13 | 2592 | 2607 | 2766 | ok (new ×1) |
| 955 (d) | V13 | 1174 | 1189 | 1220 | ok (new ×1) |
| 955 (e) | V13 | 3317 | 3332 | 3492 | ok (new ×1) |
| 956 (a) | V13 | 493 | 508 | 509 | ok (new ×1) |
| 956 (b) | V13 | 547 | 563 | 564 | ok (new ×1) |
| 956 (c) | V13 | 601 | 617 | 618 | ok (new ×1) |
| 956 (d) | V13 | 712 | 729 | 730 | ok (new ×1) |
| 956 (e) | V13 | 841 | 859 | 860 | ok (new ×1) |
| 956 (f) | V13 | 835 | 853 | 854 | ok (new ×1) |
| 956 (g) | V13 | 837 | 855 | 856 | ok (new ×1) |
| 956 (h) | V13 | 887 | 918 | 920 | ok (new ×1) |
| 956 (i) | V13 | 958 | 989 | 991 | ok (new ×1) |
| 957 (a) | V13 | 1010 | 1041 | 1043 | ok (new ×1) |
| 957 (b) | V13 | 1137 | 1173 | 1176 | ok (new ×1) |
| 957 (c) | V13 | 1163 | 1206 | 1209 | ok (new ×1) |
| 958 (a) | V13 | 1260 | 1303 | 1306 | ok (new ×1) |
| 958 (b) | V13 | 1276 | 1321 | 1324 | ok (new ×1) |
| 958 (c) | V13 | 1306 | 1351 | 1354 | ok (new ×1) |
| 958 (d) | V13 | 1334 | 1380 | 1383 | ok (new ×1) |
| 958 (e) | V13 | 1362 | 1408 | 1411 | ok (new ×1) |
| 959 (a) | V13 | 1445 | 1491 | 1494 | ok (new ×1) |
| 959 (b) | V13 | 1873 | 1920 | 1923 | ok (new ×1) |
| 959 (c) | V13 | 2065 | 2191 | 2239 | ok (new ×1) |
| 959 (d) | V13 | 2089 | 2215 | 2263 | ok (new ×1) |
| 959 (e) | V13 | 2822 | 2948 | 2996 | ok (new ×1) |
| 959 (f) | V13 | 2822 | 2948 | 2996 | ok (new ×1) |
| 959 (g) | V13 | 2914 | 3040 | 3088 | ok (new ×1) |
| 959 (h) | V13 | 2914 | 3040 | 3088 | ok (new ×1) |
| 959 (i) | V13 | 2914 | 3040 | 3088 | ok (new ×1) |
| 959 (j) | V13 | 2929 | 3055 | 3103 | ok (new ×1) |
| 959 (k) | V13 | 2944 | 3070 | 3118 | ok (new ×1) |
| 959 (l) | V13 | 2947 | 3073 | 3121 | ok (new ×1) |
| 960 (a) | V13 | 2435 | 2561 | 2609 | ok (new ×1) |
| 960 (b) | V13 | 2485 | 2611 | 2659 | ok (new ×1) |
| 960 (c) | V13 | 2490 | 2616 | 2664 | ok (new ×1) |
| 960 (d) | V13 | 2503 | 2629 | 2677 | ok (new ×1) |
| 960 (e) | V13 | 2515 | 2641 | 2689 | ok (new ×1) |
| 960 (f) | V13 | 2518 | 2644 | 2692 | ok (new ×1) |
| 960 (g) | V13 | 2558 | 2684 | 2732 | ok (new ×1) |
| 960 (h) | V13 | 2577 | 2703 | 2751 | ok (new ×1) |
| 961 (a) | V13 | 3148 | 3274 | 3322 | ok (new ×1) |
| 961 (b) | V13 | 3149 | 3276 | 3324 | ok (new ×1) |
| 961 (c) | V13 | 3209 | 3336 | 3384 | ok (new ×1) |
| 961 (d) | V13 | 3211 | 3338 | 3386 | ok (new ×1) |
| 961 (e) | V13 | 3324 | 3451 | 3499 | ok (new ×1) |
| 961 (f) | V13 | 3389 | 3516 | 3564 | ok (new ×1) |
| 961 (g) | V13 | 3428 | 3555 | 3603 | ok (new ×1) |
| 961 (h) | V13 | 4040 | 4167 | 4242 | ok (new ×1) |
| 962 (a) | V13 | 3591 | 3718 | 3766 | ok (new ×1) |
| 962 (b) | V13 | 3594 | 3722 | 3770 | ok (new ×1) |
| 962 (c) | V13 | 3656 | 3784 | 3832 | ok (new ×1) |
| 963 (a) | V13 | 3720 | 3848 | 3897 | ok (new ×1) |
| 963 (b) | V13 | 3737 | 3866 | 3915 | ok (new ×1) |
| 963 (c) | V13 | 3738 | 3867 | 3916 | ok (new ×1) |
| 963 (d) | V13 | 3745 | 3874 | 3923 | ok (new ×1) |
| 963 (e) | V13 | 3751 | 3880 | 3929 | ok (new ×1) |
| 963 (f) | V13 | 3766 | 3896 | 3945 | ok (new ×1) |
| 964 (a) | V13 | 3814 | 3946 | 3995 | ok (new ×1) |
| 964 (b) | V13 | 3820 | 3952 | 4001 | ok (new ×1) |
| 964 (c) | V13 | 3906 | 4038 | 4087 | ok (new ×1) |
| 965 (a) | V13 | 4028 | 4161 | 4210 | ok (new ×1) |
| 966 (a) | V13 | 4432 | 4585 | 4634 | ok (new ×1) |
| 966 (b) | V13 | 4437 | 4590 | 4639 | ok (new ×1) |
| 966 (c) | V13 | 4460 | 4613 | 4662 | ok (new ×1) |
| 967 (a) | V14 | 766 | 766 | 766 | ok (new ×1) |
| 967 (b) | V14 | 994 | 995 | 995 | ok (new ×1) |
| 967 (c) | V14 | 2091 | 2092 | 2092 | ok (new ×1) |
| 967 (d) | V14 | 2100 | 2101 | 2101 | ok (new ×1) |
| 967 (e) | V14 | 3177 | 3178 | 3178 | ok (new ×1) |
| 968 (a) | HRQ | 83 | 83 | 83 | ok (new ×1) |
| 968 (b) | HRQ | 84 | 84 | 84 | ok (new ×1) |
| 968 (c) | HRQ | 577 | 578 | 578 | ok (new ×1) |
| 968 (d) | HRQ | 606 | 608 | 608 | ok (new ×1) |
| 968 (e) | HRQ | 606 | 608 | 608 | ok (new ×1) |
| 968 (f) | HRQ | 625 | 627 | 627 | ok (new ×1) |
| 968 (g) | HRQ | 653 | 655 | 655 | ok (new ×1) |
| 968 (h) | HRQ | 653 | 655 | 655 | ok (new ×1) |
| 968 (i) | HRQ | 654 | 656 | 656 | ok (new ×1) |
| 968 (j) | HRQ | 655 | 657 | 657 | ok (new ×1) |
| 968 (k) | HRQ | 656 | 658 | 658 | ok (new ×1) |
| 968 (l) | HRQ | 714 | 716 | 716 | ok (new ×1) |
| 969 (a) | INDEX | 14 | 14 | 14 | ok (new ×1) |
| 969 (b) | INDEX | 39 | 39 | 39 | ok (new ×1) |
| 969 (c) | INDEX | 39 | 39 | 39 | ok (new ×1) |
| 969 (d) | INDEX | 186 | 186 | 186 | ok (new ×1) |
| 969 (e) | INDEX | 222 | 222 | 222 | ok (new ×1) |
| 969 (f) | INDEX | 222 | 222 | 222 | ok (new ×1) |
| 969 (g) | INDEX | 224 | 224 | 224 | ok (new ×1) |
| 969 (h) | SUMMARY | 15 | 15 | 15 | ok (new ×1) |
| 969 (i) | SUMMARY | 74 | 74 | 74 | ok (new ×1) |
| 969 (j) | SUMMARY | 124 | 130 | 130 | ok (new ×1) |
| 969 (k) | SUMMARY | 165 | 171 | 171 | ok (new ×1) |
| 969 (l) | SUMMARY | 209 | 220 | 220 | ok (new ×1) |
| 969 (m) | SUMMARY | 223 | 240 | 240 | ok (new ×1) |
| 970 (a) | V13 | 365 | 379 | 379 | ok (new ×1) |
| 970 (b) | V13 | 1827 | 1875 | 1877 | ok (new ×1) |
| 970 (c) | V13 | 1875 | 2002 | 2004 | ok (new ×1) |
| 970 (d) | V13 | 1793 | 1841 | 1843 | ok (new ×1) |
| 971 (a) | V13 | 786 | 805 | 805 | ok (new ×1) |
| 971 (b) | V13 | 1851 | 1899 | 1901 | ok (new ×1) |
| 971 (c) | V13 | 1259 | 1303 | 1305 | ok (new ×1) |
| 971 (d) | V13 | 493 | 509 | 509 | ok (new ×1) |
| 971 (e) | V13 | 4025 | 4204 | 4207 | ok (new ×1) |
| 971 (f) | V14 | 3177 | 3178 | 3178 | ok (new ×1) |
| 971 (g) | V13 | 763 | 782 | 782 | ok (new ×1) |
| 972 (a) | V13 | 885 | 917 | 917 | ok (new ×1) |
| 972 (b) | V13 | 886 | 919 | 919 | ok (new ×1) |
| 972 (c) | V13 | 888 | 921 | 921 | ok (new ×1) |
| 973 (a) | V13 | 1009 | 1042 | 1042 | ok (new ×1) |
| 973 (b) | V13 | 1136 | 1174 | 1174 | ok (new ×1) |
| 974 (a) | V13 | 3144 | 3318 | 3318 | ok (new ×1) |
| 975 (a) | V13 | 3719 | 3895 | 3895 | ok (new ×1) |
