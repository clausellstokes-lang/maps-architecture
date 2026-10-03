// The kernel's shared types (M0-a-01; C-0112): every type the kernel reads, declared here and re-exported by
// @plat/model under its design name (M0-m-01), never redeclared. Types only — this folder has no runtime export, which
// test/types/ holds by a grep test and by the empty module namespace. Its one re-export line in kernel/src/index.ts is
// the scaffold's fourth fix round's (C-0113, C-0064).
export type * from './units.js';
export type * from './ids.js';
export type * from './refs.js';
export type * from './rows.js';
