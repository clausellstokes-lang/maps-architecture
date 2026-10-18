#!/bin/sh
# Regenerates dmath's known-answer vectors (item M0-d-03; choices C-0029, C-0135): compiles kat.c with the unmodified
# fdlibm 5.3 sources of plat/vendor/fdlibm-5.3/ by Apple clang in strict IEEE mode, once for arm64 and once for x86-64,
# runs each (the x86-64 build under Rosetta 2, `arch -x86_64`), and requires the two vector sets to be bit-identical.
#
#   sh packages/kernel/test/vectors/fdlibm/gen/gen.sh            write ../arm64/ and ../x86_64/ (the committed sets)
#   sh packages/kernel/test/vectors/fdlibm/gen/gen.sh --check    regenerate into a temporary folder and compare both
#                                                                sets with the committed files byte for byte
#
# -D__LITTLE_ENDIAN selects fdlibm.h's word order for both hosts (its own list names neither arm64 nor x86-64);
# -fno-builtin keeps every call on fdlibm's own fabs, floor, scalbn and copysign; sqrt (pow's y = 0.5 case) is the
# platform's correctly rounded square root, exact by IEEE 754 like JavaScript's Math.sqrt. Build products go to a
# temporary folder outside plat/ and are removed; nothing is read from outside plat/ but the compiler and the SDK.
set -eu

here=$(cd "$(dirname "$0")" && pwd -P)
vectors=$(cd "$here/.." && pwd -P)
plat=$(cd "$here/../../../../../.." && pwd -P)
src="$plat/vendor/fdlibm-5.3"
[ -f "$src/fdlibm.h" ] || { echo "gen.sh: $src/fdlibm.h not found" >&2; exit 1; }

FLAGS="-O0 -ffp-contract=off -fno-fast-math -fno-builtin -D__LITTLE_ENDIAN -w"
SOURCES="e_pow.c e_log.c e_exp.c s_sin.c s_cos.c k_sin.c k_cos.c e_rem_pio2.c k_rem_pio2.c e_atan2.c s_atan.c
s_scalbn.c s_copysign.c s_floor.c s_fabs.c"
FILES="pow.txt log.txt exp.txt sin.txt cos.txt atan2.txt atan.txt"
ARCHES="arm64 x86_64"

check=0
[ "${1:-}" = "--check" ] && check=1

work=$(mktemp -d "${TMPDIR:-/tmp}/plat-fdlibm-kat.XXXXXX")
trap 'rm -rf "$work"' EXIT INT TERM

if [ "$check" -eq 1 ]; then out="$work/out"; else out="$vectors"; fi

srcs=""
for f in $SOURCES; do srcs="$srcs $src/$f"; done

clang --version | head -n 1
for a in $ARCHES; do
  # shellcheck disable=SC2086
  clang -arch "$a" $FLAGS -I"$src" -o "$work/kat-$a" "$here/kat.c" $srcs
  mkdir -p "$out/$a"
  echo "kat ($a):"
  arch "-$a" "$work/kat-$a" "$out/$a"
done

status=0
for f in $FILES; do
  if ! cmp -s "$out/arm64/$f" "$out/x86_64/$f"; then
    echo "gen.sh: arm64/$f and x86_64/$f differ — a build-flag error, never a design fact (C-0029)" >&2
    status=1
  fi
  if [ "$check" -eq 1 ]; then
    for a in $ARCHES; do
      if ! cmp -s "$out/$a/$f" "$vectors/$a/$f"; then
        echo "gen.sh --check: $a/$f differs from the committed file" >&2
        status=1
      fi
    done
  fi
done
if [ "$status" -eq 0 ]; then
  if [ "$check" -eq 1 ]; then echo "gen.sh --check: both sets regenerated bit-identical to each other and to the committed files"
  else echo "gen.sh: both sets written, bit-identical"; fi
fi
exit "$status"
