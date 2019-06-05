import { _dot } from "../internal/_dot";
import { EPSILON } from "../internal/const";
import { lineClosestDistanceToPoint } from "../lineFunctions/lineClosestDistanceToPoint";
import { IRay, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecDistance } from "../vecFunctions/vecDistance";
import { vecReset } from "../vecFunctions/vecReset";

const TMP0 = vecAlloc();

/**
 * Determines the closest distance the ray comes to a given point
 *
 * If the point lies on the positive side of the ray (_t_ ≥ 0), this function
 * measures the perpendicular distance from the point to its projection onto
 * the ray's geometry. If the point lies on the negative side of the ray (_t_ < 0),
 * this function measures the distance from the given point to the ray's initial point.
 *
 * To always measure the perpendicular distance for all values of _t_, use
 * {@link lineGetClosestDistanceToPoint}.
 *
 * @param ray the ray to inspect
 * @param point the reference point to check for closest distance
 * @see {@link lineGetClosestDistanceToPoint}
 * @see {@link rayGetClosestPoint}
 */
export function rayGetClosestDistanceToPoint(ray: IRay, point: IVec) {
  const t = _dot(ray, point);
  if (t <= -EPSILON) {
    const initial = vecReset(ray.x0, ray.y0, TMP0);
    return vecDistance(initial, point);
  } else {
    return lineClosestDistanceToPoint(ray, point);
  }
}
