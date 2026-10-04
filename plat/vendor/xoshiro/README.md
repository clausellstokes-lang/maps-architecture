# vendor/xoshiro/ — the published C that the kernel's stream generator ports

xoshiro128\*\* 1.1 by David Blackman and Sebastiano Vigna (public domain), read directly from the authors' site
<https://prng.di.unimi.it/> on 2026-10-03 (choice C-0029) and kept here **unmodified, byte for byte**; each file's URL
and SHA-256 is a row of `plat/CLEAN-ROOM.md` §5. These files are never run by PLAT and never bundled:
`packages/kernel/src/rng/stream.ts` is our TypeScript port of the generator's `next()` (item M0-d-01; §6.1, §17.1 (8)),
and the C is compiled only to make the port's known-answer vectors (`packages/kernel/test/vectors/xoshiro/`, by
`gen/gen.sh` there). This folder has no `package.json`, so it is no pnpm workspace member and `vendor:verify` does not
lock it (vendor/README.md).

| file | what it is | ported to |
|---|---|---|
| `xoshiro128starstar.c` | the generator: `rotl`, the four-word state `s[4]`, `next()` (the `**` scrambler `rotl(s[1] · 5, 7) · 9` and the linear engine), and the jump functions `jump`, `long_jump`, `jump_ce`, `jump_n` | `next()` only, as `Stream.u32()` (`src/rng/stream.ts`); no jump function is ported — a stream is created once per derivation from its key and continued (§6.1), so nothing reads a jump |
| `f2x.c` | the authors' minimal F₂[x] arithmetic that the file's arbitrary-jump functions `#include` | nothing: it is here because `xoshiro128starstar.c` includes it, so the known-answer generator compiles the authors' file unmodified |

The authors' note in the file: the state must not be everywhere zero. The kernel replaces an all-zero stream key by a
fixed nudge before seeding (§6.1; choice C-0143), so the ported core never sees that state.
