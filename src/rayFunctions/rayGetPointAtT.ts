import { IRay } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

/**
 * Gets a point along the ray, parameterized according to distance along its
 * direction vector.
 *
 * Retrieves a point on the ray's geometry according to moving distance _t_
 * along the direction vector from its initial point. This function does allow
 * negative values of _t_, returning points in the direction "behind" the ray.
 *
 * Synonymous to {@link lineGetPointAt}.
 *
 * @param ray the ray to inspect
 * @param t distance along the ray at which to compute point
 * @param out
 * @see {@link IRay}
 */
export function rayGetPointAtT(ray: IRay, t: number, out = vecAlloc()) {
  return vecReset(ray.x0 + ray.dirX * t, ray.y0 + ray.dirY * t, out);
}
