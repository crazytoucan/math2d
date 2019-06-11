import { nearestPointResultAlloc } from "./nearestPointResultAlloc";

/**
 * Construct a new intersection given `exists`, `x`, `y`, `t0`, and `t1` values.
 *
 * @param exists whether an intersection was found. If `false`, the other passed values should be `NaN`
 * @param x the x-coordinate of the intersection, if an intersection point was found.
 * @param y the y-coordinate of the intersection, if an intersection point was found.
 * @param t0 the parameterization of the intersection along the first shape's geometry,
 *  if an intersection point was found.
 * @param t1 the parameterization of the intersection along the second shape's geometry,
 *  if an intersection point was found.
 * @param out
 */
export function nearestPointResultReset(
  x: number,
  y: number,
  t: number,
  distanceValue: number,
  out = nearestPointResultAlloc(),
) {
  out.x = x;
  out.y = y;
  out.t = t;
  out.distanceValue = distanceValue;
  return out;
}
