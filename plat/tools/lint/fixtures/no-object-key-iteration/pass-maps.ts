// Map and Set iterate in insertion order (C-0009); key iteration goes through a total-order helper.
declare function sortedKeys(o: object): string[];
export function f(m: Map<string, number>, s: Set<number>, o: Record<string, number>): number {
  let n = 0;
  for (const [, v] of m) n += v;
  for (const v of s) n += v;
  for (const k of sortedKeys(o)) n += o[k] ?? 0;
  for (const v of [1, 2, 3]) n += v;
  return n + Object.freeze([1]).length + (Object.fromEntries(m) === o ? 1 : 0);
}
export function shadowed(): string[] {
  const Object = { keys: (_o: unknown) => ['x'] };
  return Object.keys({});
}
// Uses of Object and Reflect that reach no enumeration (C-0128): instanceof, a call, static non-enumerating members
// (destructured too) and types.
type Keys = typeof Object.keys;
export function harmless(x: unknown, k: Keys | null): unknown[] {
  const { freeze, prototype } = Object;
  return [x instanceof Object, Object(x), freeze([1]), prototype, Object.prototype.hasOwnProperty.call(x, 'a'), Reflect.has({}, 'a'), k];
}
