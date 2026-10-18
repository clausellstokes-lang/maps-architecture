// @plat/model — the package index (C-0013): it re-exports every module folder's index, and the package's public
// API is their union. A folder's index belongs to the item that builds the folder.
export * from './types/index.js';
export * from './records/index.js';
export * from './schema/index.js';
export * from './stage/index.js';
export * from './identity/index.js';
export * from './match/index.js';
export * from './digest/index.js';
