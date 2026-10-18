// Key enumerations reached through a destructured, aliased, passed, cast or computed Object or Reflect (C-0128).
declare function pass(x: unknown): unknown;
const name = 'keys';
export function f(o: Record<string, number>): unknown[] {
  const { keys, entries } = Object; // planted: keyEnumeration, keyEnumeration
  const { ownKeys } = Reflect; // planted: keyEnumeration
  const O = Object; // planted: ownerAsValue
  const R = globalThis.Reflect; // planted: ownerAsValue
  const { [name]: k } = Object; // planted: computedMember
  const { ...rest } = Object; // planted: ownerAsValue
  const via = (Object as any).values; // planted: ownerAsValue
  let later: unknown;
  ({ getOwnPropertyNames: later } = Object); // planted: keyEnumeration
  return [keys(o), entries(o), ownKeys(o), O.values(o), R.ownKeys(o), k, rest, via, later, Object[name](o), pass(Object)]; // planted: computedMember, ownerAsValue
}
export function g({ values } = Object): unknown { // planted: keyEnumeration
  return values;
}
