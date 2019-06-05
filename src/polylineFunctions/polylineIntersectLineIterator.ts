import { _polylineIntersectIteratorHelper } from "../internal/_polylineIntersectIteratorHelper";
import { segmentIntersectLine } from "../segmentFunctions/segmentIntersectLine";
import { IIntersection, ILine, IPolyline } from "../types";

/**
 * Computes all locations at which a polyline crosses a given line.
 *
 * For each returned intersection, the intersection's _t0_ describes where the point fell on the polyline's geometry
 * according to the {@link IPolyline} parameterization:
 * values of _t0_ will fall between 0 and the polyline's total length, inclusive, and the
 * point corresponding to a given value _t0_ is defined by traveling an absolute distance _t0_
 * along the polyline's geometry.
 *
 * The returned points will be sorted by _t0_ increasing, i.e. they will be sorted according to the
 * order in which one would visit those locations if one traveled from the polyline's start to its end
 * along its segment geometry.
 *
 * @param poly
 * @param line
 * @see {@link IIntersection}
 * @see {@link IPolyline}
 * @see {@link lineIntersectPolylineIterator}
 * @see {@link polylineIntersectRayIterator}
 * @see {@link polylineIntersectSegmentIterator}
 */
export function polylineIntersectLineIterator(poly: IPolyline, line: ILine): IterableIterator<IIntersection> {
  return _polylineIntersectIteratorHelper(poly, line, segmentIntersectLine).values();
}
