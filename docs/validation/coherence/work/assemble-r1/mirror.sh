#!/bin/sh
# mirror.sh SRC DEST — a tree for refs.py: the set's files from SRC (a folder holding docs/ARCHITECTURE.md, docs/volumes/*.md),
# everything else refs.py reads (_integrate.md, files f and g, research/, docs/volumes/critique/) linked from the repository.
SRC=$1; D=$2; R=/home/user/maps-architecture
rm -rf "$D"; mkdir -p "$D/docs/volumes"
cp "$SRC/docs/ARCHITECTURE.md" "$D/docs/"; cp "$SRC"/docs/volumes/V*.md "$SRC/docs/volumes/INDEX.md" "$D/docs/volumes/"
ln -s "$R/docs/volumes/_integrate.md" "$D/docs/volumes/_integrate.md"; ln -s "$R/docs/volumes/critique" "$D/docs/volumes/critique"
ln -s "$R/docs/AMENDMENTS-2026-09-28f.md" "$D/docs/"; ln -s "$R/docs/AMENDMENTS-2026-09-28g.md" "$D/docs/"; ln -s "$R/research" "$D/research"
