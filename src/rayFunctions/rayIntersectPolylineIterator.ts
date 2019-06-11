import { _polylineIntersectIteratorHelper } from "../internal/_polylineIntersectIteratorHelper";
import { _swapAndReorderIntersections } from "../internal/_swapAndReorderIntersections";
import { segmentIntersectRay } from "../segmentFunctions/segmentIntersectRay";
import { IPointIntersectionResult, IPolyline, IRay } from "../types";

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
 * Almost equivalent to {@link polylineIntersectRayIterator}, except the _t0_ and _t1_ values are reversed
 * and the returned intersections are sorted according to the ray's geometry.
 *
 * @param poly
 * @param ray
 * @see {@link IPointIntersectionResult}
 * @see {@link IPolyline}
 * @see {@link lineIntersectPolylineIterator}
 * @see {@link polylineIntersectLineIterator}
 * @see {@link polylineIntersectSegmentIterator}
 */
export function rayIntersectPolylineIterator(ray: IRay, poly: IPolyline): IterableIterator<IPointIntersectionResult> {
  return _swapAndReorderIntersections(_polylineIntersectIteratorHelper(poly, ray, segmentIntersectRay));
}
