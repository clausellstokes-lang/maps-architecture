// @plat/site — the package index (C-0013): it re-exports every module folder's index, and the package's public
// API is their union. A folder's index belongs to the item that builds the folder.
export * from './terrain/index.js';
export * from './hydro/index.js';
export * from './water/index.js';
