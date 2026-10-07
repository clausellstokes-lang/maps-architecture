// S5c's heading model (M0-c-05; §4.4 S5c *Heading model per proposal class and preset* (FTG-17, FTG-6; J-P8), §6.1's
// `growth.heading` and `growth.curvature` concerns, §6.5 (2) — every real function through dmath; readings C-0254):
//
//   `ou`, a mean-reverting curvature walk: per step Δs
//     κ ← ρ·κ + (1 − ρ)·κ_goal + s·√(1 − ρ²)·ξ,   ρ = e^(−Δs/ℓ),   κ_goal = (θ_goal − θ)/L_r,   θ ← θ + κ·Δs,
//   with ℓ the correlation length, L_r the reversion length and s the curvature's stationary spread, read from
//   `headingSigma` in degrees per 100 m (regimes.json's `heading.<preset>` row: organic 20° per 100 m, ℓ = 90 m,
//   L_r = 250 m; planned 5° per 100 m).
//
// Units (C-0254 (1)): angles in radians (the math convention, counter-clockwise from +x, as the step vector
// (cos θ, sin θ) reads them), lengths in cm, κ in radians per cm; s = headingSigma ÷ 100 m. ξ is one standard normal of
// the heading stream per step (the stream's Irwin–Hall normal, §6.1); ρ goes through dmath.exp. A proposal's first
// curvature is drawn from the walk's stationary law N(0, s²) on `growth.curvature` (`initialCurvature`), so every step
// of a street, its first included, has the per-step turn law the design's receipt states (p95 ≈ 11.4°, p99 ≈ 14.9° at
// 30 m steps).
import { dmath, type Stream } from '@plat/kernel';
import type { TableView } from '@plat/tables';
import { PI, quot } from '../siting/geom.js';

/** Radians per centidegree (π ÷ 18 000). */
export const RAD_PER_CDEG = 0.00017453292519943296;

/** The `ou` heading model's parameters (§4.4), in radians and centimetres. */
export interface HeadingModel {
  readonly kind: 'ou';
  /** s: the curvature's stationary spread, radians per cm (headingSigma ÷ 100 m). */
  readonly sigmaRadPerCm: number;
  /** ℓ: the correlation length (cm). */
  readonly correlationCm: number;
  /** L_r: the reversion length toward the goal heading (cm). */
  readonly reversionCm: number;
}

/** The presets whose heading rows M0 reads (`heading.<preset>` in regimes.json); `ringed` / `american` are M1's. */
export type HeadingPreset = 'organic' | 'planned';

/**
 * The `ou` model of a preset (§4.4): regimes.json's `heading.<preset>` row — `sigmaCdegPer100m`, `correlationM`,
 * `reversionM` — in radians and centimetres.
 */
export function headingModel(tables: TableView, preset: HeadingPreset = 'organic'): HeadingModel {
  const t = tables.table('regimes');
  const row = `heading.${preset}`;
  const sigmaCdeg = t.num(row, 'sigmaCdegPer100m');
  return {
    kind: 'ou',
    sigmaRadPerCm: quot(sigmaCdeg * RAD_PER_CDEG, 10_000, 'length', 'headingSigma per 100 m'),
    correlationCm: t.num(row, 'correlationM') * 100,
    reversionCm: t.num(row, 'reversionM') * 100,
  };
}

/** A proposal's heading state: its heading, its curvature and the heading it reverts to (radians, radians per cm). */
export interface HeadingState {
  readonly heading: number;
  readonly curvature: number;
  readonly goalHeading: number;
}

/** One step's input to the walk: the state, the step's length Δs (cm) and the model. */
export interface HeadingStepState extends HeadingState {
  readonly stepCm: number;
  readonly model: HeadingModel;
}

/** One step of the walk: the new heading and curvature, and the step's turn κ·Δs (radians). */
export interface HeadingStepped extends HeadingState {
  readonly turn: number;
}

/** An angle wrapped to (−π, π]. */
export function wrapAngle(a: number): number {
  let x = a;
  while (x > PI) x -= 2 * PI;
  while (x <= -PI) x += 2 * PI;
  return x;
}

/** ρ = e^(−Δs/ℓ) through dmath.exp (§4.4; C-0137 (4): exactly 1 at Δs = 0, in (0, 1) after). */
export function correlationOf(stepCm: number, model: HeadingModel): number {
  return dmath.exp(-quot(stepCm, model.correlationCm, 'length', 'correlation length'));
}

/**
 * `headingStep(state, stream)` (§4.4 S5c's `ou`): one step Δs of the mean-reverting curvature walk — one standard normal
 * ξ from `stream` (the proposal's `growth.heading` stream) — returning the new curvature, the new heading θ + κ·Δs
 * (wrapped to (−π, π]) and the step's turn κ·Δs; the goal heading is kept. Throws a RangeError on a step that is not a
 * finite length > 0.
 */
export function headingStep(state: HeadingStepState, stream: Stream): HeadingStepped {
  const ds = state.stepCm;
  if (!(ds > 0 && Number.isFinite(ds))) throw new RangeError(`headingStep: the step is a length > 0, got ${String(ds)}`);
  const m = state.model;
  const rho = correlationOf(ds, m);
  const goal = quot(wrapAngle(state.goalHeading - state.heading), m.reversionCm, 'length', 'reversion length');
  const xi = stream.normal();
  const kappa = rho * state.curvature + (1 - rho) * goal + m.sigmaRadPerCm * Math.sqrt(1 - rho * rho) * xi;
  const turn = kappa * ds;
  return { heading: wrapAngle(state.heading + turn), curvature: kappa, goalHeading: state.goalHeading, turn };
}

/** A proposal's first curvature: one draw of the walk's stationary law N(0, s²) from its `growth.curvature` stream. */
export function initialCurvature(model: HeadingModel, stream: Stream): number {
  return model.sigmaRadPerCm * stream.normal();
}
