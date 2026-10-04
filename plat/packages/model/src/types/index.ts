// @plat/model's types (M0-m-01; C-0112 (4)): the kernel's shared types re-exported under their design names, and the
// model-only identity, lifecycle and vocabulary types. Types only — this folder has no runtime export (test/types/
// holds it by a grep test and by the empty module namespace).
export type * from './kernel.js';
export type * from './identity.js';
export type * from './vocabulary.js';
export type * from './staged.js';
