#!/usr/bin/env bash
# Q133 controls: seeds 1, 2, 74 integrated (full: S1 … S8) on the head (2 at a time) and, beside them, seed 74 integrated
# (full) on 4abd334a (the chunk record's root is then comparable byte for byte). Touches out/controls.done at the end.
Q=/tmp/claude-0/-home-user-maps-architecture/d499ae8b-5088-523d-96b3-13eb55179f60/scratchpad/q133
$Q/run-seeds.sh /home/user/maps-architecture/plat head-96c17417 2 integrated - 1 2 74 &
A=$!
$Q/run-seeds.sh /home/user/maps-scratch/q133-4abd334a/plat orig-4abd334a 1 integrated - 74 &
B=$!
wait $A $B
date -u +%FT%TZ > $Q/out/controls.done
