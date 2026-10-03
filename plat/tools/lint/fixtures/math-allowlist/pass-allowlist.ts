// Every allowlisted member, and Math names that are not the global.
export function allowed(x: number, y: number): number[] {
  return [
    Math.abs(x), Math.floor(x), Math.ceil(x), Math.round(x), Math.trunc(x), Math.sign(x),
    Math.min(x, y), Math.max(x, y), Math.sqrt(x), Math.imul(x, y), Math.clz32(x), Math.fround(x),
    globalThis.Math.floor(y),
  ];
}
export function shadowed(): number {
  const Math = { pow: (a: number, b: number) => a * b };
  return Math.pow(2, 3);
}
export const notTheGlobal = { Math: { sin: 1 } }.Math.sin;
