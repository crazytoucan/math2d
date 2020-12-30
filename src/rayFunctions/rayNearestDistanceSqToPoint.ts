import { _dot } from "../internal/_dot";
import { nearestPointResultAlloc } from "../nearestPointResultFunctions/nearestPointResultAlloc";
import { nearestPointResultReset } from "../nearestPointResultFunctions/nearestPointResultReset";
import { Ray, Vec } from "../types";
import { vecDistanceSq } from "../vecFunctions/vecDistanceSq";
import { rayGetPointAtT } from "./rayGetPointAtT";

/**
 * Determines the closest the ray comes to a given reference point
 *
 * If the point lies on the positive side of the ray (_t_ ≥ 0), this function
 * finds the projection of the point onto the ray's geometry.
 * If the point lies on the negative side of the ray (_t_ < 0),
 * this function returns the ray's initial point.
 *
 * This function returns the squared distance in the result's `distanceValue`.
 * This is preferred over returning the (non-squared) distance because points
 * behind the ray need to measure distance to the ray's initial point, which would otherwise involve a square root.
 * If you know the point lies in front of the ray, and want to measure the distance while avoiding a square
 * root, prefer {@link lineNearestDistanceToPoint}. To determine which side of the ray a point lies on,
 * see {@link lineProjectPoint}.
 *
 * @param ray the ray to inspect
 * @param point the reference point to project onto the ray
 * @param out
 */
export function rayNearestDistanceSqToPoint(ray: Ray, point: Vec, out = nearestPointResultAlloc()) {
  const t = Math.max(0, _dot(ray, point));
  const closest = rayGetPointAtT(ray, t);
  const distanceSq = vecDistanceSq(closest, point);
  return nearestPointResultReset(closest.x, closest.y, t, distanceSq, out);
}
