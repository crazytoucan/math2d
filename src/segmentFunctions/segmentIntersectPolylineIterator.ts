import { _polylineIntersectIteratorHelper } from "../internal/_polylineIntersectIteratorHelper";
import { _swapAndReorderIntersections } from "../internal/_swapAndReorderIntersections";
import { IPointIntersectionResult, IPolyline, ISegment } from "../types";
import { segmentIntersectSegment } from "./segmentIntersectSegment";

/**
 * Computes all locations at which a line segment meets a given polyline.
 *
 * For each returned intersection, the intersection's _t0_ describes where the point fell on the segment's geometry
 * according to {@link ISegment} parameterization:
 * linear interpolation between its endpoints where _t0_ = 0 represents its starting vertex
 * and _t0_ = 1 its ending vertex.
 * Smooth values of _t_ within that range will move along the segment, so for example
 * _t0_ = 0.5 is its midpoint.
 *
 * The returned points will be sorted by _t0_ increasing, i.e. they will be sorted according to the
 * order in which one would visit those locations if one were to travel from the line segment's starting
 * vertex to its ending vertex.
 *
 * Almost equivalent to {@link polylineIntersectSegmentIterator}, except the _t0_ and _t1_ values are reversed
 * and the returned intersections are sorted according to the segment's geometry.
 *
 * @param segment the segment to intersect
 * @param poly the polyline to find intersections with
 * @see {@link IPointIntersectionResult}
 * @see {@link ISegment}
 * @see {@link polylineIntersectSegmentIterator}
 * @see {@link segmentIntersectLine}
 * @see {@link segmentIntersectRay}
 * @see {@link segmentIntersectSegment}
 */
export function segmentIntersectPolylineIterator(segment: ISegment, poly: IPolyline): IterableIterator<IPointIntersectionResult> {
  return _swapAndReorderIntersections(_polylineIntersectIteratorHelper(poly, segment, segmentIntersectSegment));
}
