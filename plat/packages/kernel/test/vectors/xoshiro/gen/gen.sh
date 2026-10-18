#!/bin/sh
# Regenerates the known-answer vectors of the kernel's xoshiro128** (item M0-d-01; choices C-0029, C-0143): compiles
# kat.c with the authors' unmodified xoshiro128starstar.c (and the f2x.c it includes) from plat/vendor/xoshiro/ by
# Apple clang in C-0029's strict mode, once for arm64 and once for x86-64, runs each (the x86-64 build under Rosetta 2,
# `arch -x86_64`), and requires the two vector sets to be bit-identical.
#
#   sh packages/kernel/test/vectors/xoshiro/gen/gen.sh            write ../arm64/ and ../x86_64/ (the committed sets)
#   sh packages/kernel/test/vectors/xoshiro/gen/gen.sh --check    regenerate into a temporary folder and compare both
#                                                                 sets with the committed files byte for byte
#
# Build products go to a temporary folder outside plat/ and are removed; nothing is read from outside plat/ but the
# compiler and the SDK.
set -eu

here=$(cd "$(dirname "$0")" && pwd -P)
vectors=$(cd "$here/.." && pwd -P)
plat=$(cd "$here/../../../../../.." && pwd -P)
src="$plat/vendor/xoshiro"
[ -f "$src/xoshiro128starstar.c" ] || { echo "gen.sh: $src/xoshiro128starstar.c not found" >&2; exit 1; }
[ -f "$src/f2x.c" ] || { echo "gen.sh: $src/f2x.c not found" >&2; exit 1; }

FLAGS="-O0 -ffp-contract=off -fno-fast-math -w"
FILES="xoshiro128ss.txt xoshiro128ss-long.txt"
ARCHES="arm64 x86_64"

check=0
[ "${1:-}" = "--check" ] && check=1

work=$(mktemp -d "${TMPDIR:-/tmp}/plat-xoshiro-kat.XXXXXX")
trap 'rm -rf "$work"' EXIT INT TERM

if [ "$check" -eq 1 ]; then out="$work/out"; else out="$vectors"; fi

clang --version | head -n 1
for a in $ARCHES; do
  # shellcheck disable=SC2086
  clang -arch "$a" $FLAGS -I"$src" -o "$work/kat-$a" "$here/kat.c"
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
