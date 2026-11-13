# Stash of child DV's chain files (2026-11-13 09:32Z, tree head 0a5b10da)

The state of this child's long runs as it stood when the child was stopped: `/home/user/maps-scratch/waves/` (chain
steps, exit codes, logs, JSON reports, census stores; mirrors as their differences from the tree). `MANIFEST.txt` lists
every file. Restore in a fresh container, after the tree is this branch's tree:

    python3 /home/user/maps-architecture/tools/session/stash_waves.py restore DV

then remove `stash/` from the working tree (`rm -rf /home/user/maps-architecture/stash`) so that later snapshots do not
carry it. To the seat that resumes, the restored folder is what a container restart leaves: every finished part of a
chain (its exit code beside it) is read, never run again; node_modules of a mirror is installed again when needed.
