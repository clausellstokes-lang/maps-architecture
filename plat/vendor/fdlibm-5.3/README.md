# vendor/fdlibm-5.3/ — the published C that dmath ports

Sun's fdlibm 5.3 ("Freely Distributable LIBM"), read directly from <https://www.netlib.org/fdlibm/> on 2026-10-03
(choice C-0029) and kept here **unmodified, byte for byte**; each file's URL and SHA-256 is a row of
`plat/CLEAN-ROOM.md` §5. These files are never run by PLAT and never bundled: `packages/kernel/src/dmath/` is our
TypeScript port of them (item M0-d-03; §3.1, §6.5 (2), §17.4), and the C is compiled only to make the port's
known-answer vectors (`packages/kernel/test/vectors/fdlibm/`, by `gen/gen.sh` there). This folder has no
`package.json`, so it is no pnpm workspace member and `vendor:verify` does not lock it (vendor/README.md).

| file | what it is | ported to |
|---|---|---|
| `e_pow.c` | `__ieee754_pow` | `dmath/pow.ts` (`dmath.pow`) |
| `e_log.c` | `__ieee754_log` | `dmath/log.ts` (`dmath.log`) |
| `e_exp.c` | `__ieee754_exp` | `dmath/exp.ts` (`dmath.exp`) |
| `s_sin.c`, `s_cos.c` | `sin`, `cos` | `dmath/trig.ts` (`dmath.sin`, `dmath.cos`) |
| `k_sin.c`, `k_cos.c` | `__kernel_sin`, `__kernel_cos` | `dmath/k-trig.ts` |
| `e_rem_pio2.c`, `k_rem_pio2.c` | `__ieee754_rem_pio2`, `__kernel_rem_pio2` (argument reduction) | `dmath/rem-pio2.ts` (the kernel at its one called precision) |
| `e_atan2.c`, `s_atan.c` | `__ieee754_atan2`, `atan` | `dmath/atan.ts` (`dmath.atan2`, `dmath.atan`) |
| `s_scalbn.c`, `s_copysign.c` | `scalbn`, `copysign` | `dmath/scalbn.ts` |
| `s_floor.c`, `s_fabs.c` | `floor`, `fabs` | compiled for the vectors only; the port uses `Math.floor` and `Math.abs`, exact by IEEE 754 like these |
| `fdlibm.h` | the header (`__HI` / `__LO` word access) | `dmath/words.ts` |
| `readme` | fdlibm 5.3's own release notes | — |
| `NOTICE.txt` | Sun's two notices (1993 and 2004), as the files carry them | `THIRD-PARTY-NOTICES.txt` (`corepack pnpm notices`, C-0095) |

The routines not here (`asin`, `acos`, `tan`, `log1p`, `expm1` and the rest) are added with their readers, each with its
vectors (C-0039). The wrappers `w_pow.c`, `w_log.c`, `w_exp.c` and `w_atan2.c` are not taken: in fdlibm's IEEE mode
they return the `__ieee754_` result unchanged, and their SVID / X/Open error handling has no reader (C-0135).
