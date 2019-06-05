import { _dot } from "../internal/_dot";
import { IRay, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { rayGetPointAt } from "./rayGetPointAt";

/**
 * Determines the closest point that the ray comes to a given reference point
 *
 * If the point lies on the positive side of the ray (_t_ ≥ 0), this function
 * returns the projection of the point onto the ray's geometry.
 * If the point lies on the negative side of the ray (_t_ < 0),
 * this function returns the ray's initial point.
 *
 * To always return the projected point for all values of _t_, use
 * {@link lineGetClosestPoint}.
 *
 * @param ray the ray to inspect
 * @param point the reference point to project onto the ray
 * @see {@link lineGetClosestPoint}
 * @see {@link rayGetClosestDistanceToPoint}
 */
export function rayGetClosestPoint(ray: IRay, point: IVec, out = vecAlloc()) {
  const t = Math.max(0, _dot(ray, point));
  return rayGetPointAt(ray, t, out);
}
