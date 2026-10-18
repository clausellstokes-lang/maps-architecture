# retrovalidation/fix2-design — the two findings of confirm2-design applied (amendments file s)

Lane retrovalidation/fix2-design (Opus 5.5, high; the owner's J394, 2026-10-18 ~09:05Z: confirmation re-checks and
their fixes on Opus, Fable kept for critique; J390 otherwise). 2026-10-18 09:13 UTC. Applied exactly the fixes (a)–(e)
of `confirm2-design.md` (*The exact fixes*), in order, then (f). Files edited: `docs/volumes/V13-world.md`,
`docs/AMENDMENTS-2026-10-18s.md`, the regenerated bundle `docs/ARCHITECTURE-FULL.md`, this record and the lane line.
No git command run; the host repository untouched.

## Read before editing

`confirm2-design.md` whole; `docs/AMENDMENTS-2026-10-18s.md` whole (285 lines, every line); V13 :95-125 (file r's and
file s's revision notes). The before md5s equal confirm2-design's check 1a (V13 `09fbe522…`, file s `090329b6…`, bundle
`ef177d68…`).

## The changes (script `apply.py` in the scratch folder: each old asserted once before, each new once after; (e)'s
paragraph parsed verbatim from confirm2-design's fenced block, not retyped)

| fix | file : line | old → new |
|---|---|---|
| (a) | V13 :107; file s :93 | `taken whole save §2.3's prosperity row:` → `… row and §9's J-V13.83:` |
| (b) | V13 :116; file s :102 | `…above a war front.` → `…above a war front; §9's J-V13.83 keeps the rejected absolute rung's reason under a dated bracket saying the band polarises, the relative choice standing.` |
| (c) | file s :104 | `items 928–935 (the V13 changes it lists)` → `items 928–935 and 939 (the V13 changes it lists)` |
| (d) | file s :5 | `(939 added by the confirm-design check, 2026-10-18)` → `(939 added by the confirm-design check and applied by retrovalidation/fix-design, 2026-10-18; the verification record gives both passes)` |
| (e) | file s :272 (+13 lines, :273-285) | the line kept, then an empty line and the paragraph *The confirm check and its fixes (2026-10-18). …* verbatim |

## md5s

| file | before | after |
|---|---|---|
| `docs/volumes/V13-world.md` | `09fbe522c52b4b1c7c89e7c243f0f19d` (4,465 lines) | `d0de9ad8dadfeccc89ac86f2ea4d62f4` (4,465 lines) — equal to confirm2-design's simulation |
| `docs/AMENDMENTS-2026-10-18s.md` | `090329b6c51ca9abe907a8970acc5677` (285 lines) | `3b83b3af9a0fc3ce818d1d2ad1039da8` (298 lines) |
| `docs/ARCHITECTURE-FULL.md` | `ef177d681015a4a8edb471810b02c527` | `bbe57b8b682f378fd616e3342bb94d8b` (81,080 lines from 16 sources) |
| INDEX, V14, the base | `42881796…`, `70d8aa1b…`, `1f871a01…` | unchanged |

## Checks

- `diff -U0` before vs after: V13 2 hunks (:107, :116); file s 5 hunks (:5, :93, :102, :104, +13 after :272) — nothing else moved.
- Item 927's new text, unfolded from file s (`> ` stripped, bare `>` empty), occurs **once** in V13.
- (a)'s and (b)'s new texts: 1 in V13, 1 in file s, 1 in the bundle; their olds 0 in each. (c), (d) and (e)'s paragraph once in file s (file s is not a bundle source; the paragraph 0 in the bundle).
- `python3 tools/bundle_architecture.py && python3 tools/bundle_architecture.py --check`: `UP TO DATE`, **exit 0**.

Seen, not changed: nothing. Both findings FIXED.

Scratch: `/tmp/claude-0/-home-user-maps-architecture/4291a60d-8240-5d49-a54e-2b2a213d093f/scratchpad/retro/fix2-design/`
(`apply.py`, `before/` copies of V13, file s and the bundle).

**LANDED** 2026-10-18 (see the lane line).
