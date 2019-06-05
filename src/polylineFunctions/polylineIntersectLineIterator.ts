import { _polylineIntersectIteratorHelper } from "../internal/_polylineIntersectIteratorHelper";
import { segmentIntersectLine } from "../segmentFunctions/segmentIntersectLine";
import { IIntersection, ILine, IPolyline } from "../types";

/**
 * Computes all locations at which a polyline crosses a given line.
 *
 * For each returned intersection, the intersection's _t0_ describes where the point fell on the polyline's geometry
 * according to the {@link IPolyline} parameterization:
 * values of _t0_ are between 0 and the polyline's vertex count, and smooth values of _t0_ therein
 * signify linear interpolation between adjacent vertices along the polyline's geometry.
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
