import { _polylineIntersectHelper } from "../internal/_polylineIntersectHelper";
import { _swapAndReorderIntersections } from "../internal/_swapAndReorderIntersections";
import { segmentIntersectRay } from "../segmentFunctions/segmentIntersectRay";
import { Polyline, Ray } from "../types";

/**
 * Computes all locations at which a ray crosses a given polyline.
 *
 * For each returned intersection, the intersection's _t0_ describes where the point fell on the ray's geometry
 * according to {@link IRay} parameterization:
 * _t0_ ≥ 0, corresponds to travel of distance _t0_ along the ray's direction vector. (See {@link rayGetPointAt}.)
 *
 * The returned points will be sorted by _t0_ increasing, i.e. they will be sorted according to the
 * order in which one would hit the intersections if one were to start from the ray's initial point and
 * shoot along its direction vector.
 *
 * Almost equivalent to {@link polylineIntersectRay}, except the _t0_ and _t1_ values are reversed
 * and the returned intersections are sorted according to the ray's geometry.
 *
 * @param poly
 * @param ray
 */
export function rayIntersectPolyline(ray: Ray, poly: Polyline) {
  return _swapAndReorderIntersections(_polylineIntersectHelper(poly, ray, segmentIntersectRay));
}
