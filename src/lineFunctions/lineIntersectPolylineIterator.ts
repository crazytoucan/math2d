import { _polylineIntersectIteratorHelper } from "../internal/_polylineIntersectIteratorHelper";
import { _swapAndReorderIntersections } from "../internal/_swapAndReorderIntersections";
import { segmentIntersectLine } from "../segmentFunctions/segmentIntersectLine";
import { ILine, IPointIntersectionResult, IPolyline } from "../types";

/**
 * Computes all locations at which a line crosses a given polyline.
 *
 * For each returned intersection, the intersection's _t0_ describes where the point fell on the line's geometry
 * according to {@link ILine} parameterization. (See {@link lineGetPointAt}.)
 *
 * The returned points will be sorted by _t0_ increasing, i.e. they will be sorted according to the
 * order in which one would hit the intersections if one were to start from -∞ and travel toward +∞ along the line's
 * direction vector.
 *
 * Almost equivalent to {@link polylineIntersectLineIterator}, except the _t0_ and _t1_ values are reversed
 * and the returned intersections are sorted according to the line's geometry.
 *
 * @param poly
 * @param ray
 * @see {@link IPointIntersectionResult}
 * @see {@link ILine}
 * @see {@link polylineIntersectLineIterator}
 * @see {@link lineIntersectLine}
 * @see {@link lineIntersectRay}
 * @see {@link lineIntersectSegment}
 */
export function lineIntersectPolylineIterator(line: ILine, poly: IPolyline): IterableIterator<IPointIntersectionResult> {
  return _swapAndReorderIntersections(_polylineIntersectIteratorHelper(poly, line, segmentIntersectLine));
}
