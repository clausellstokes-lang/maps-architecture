// Members outside the allowlist, computed members, and Math used as a value.
const name = 'cos';
export const a = Math.pow(2, 0.5); // planted: memberNotAllowed
export const b = Math.sin(1) + Math.hypot(3, 4); // planted: memberNotAllowed, memberNotAllowed
export const c = Math.PI; // planted: memberNotAllowed
export const d = Math.random(); // planted: memberNotAllowed
export const e = Math['log'](2); // planted: memberNotAllowed
export const f = (Math as any)[name](0); // planted: mathAsValue
export const g = Math[name as 'cos'](0); // planted: computedMember
export const h = Math; // planted: mathAsValue
export const { exp } = Math; // planted: mathAsValue
export const i = globalThis.Math.atan2(1, 1); // planted: memberNotAllowed
