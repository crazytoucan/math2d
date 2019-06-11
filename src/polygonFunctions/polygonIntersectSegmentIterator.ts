import { _polygonIntersectIteratorHelper } from "../internal/_polygonIntersectIteratorHelper";
import { segmentIntersectSegment } from "../segmentFunctions/segmentIntersectSegment";
import { IPointIntersectionResult, IPolygon, ISegment } from "../types";

/**
 * Computes all locations at which a polygon crosses a given line segment.
 *
 * For each returned intersection, the intersection's _t0_ describes where the point fell on the polygon's geometry
 * according to the {@link IPolygon} parameterization: integer values of _t0_ correspond to the polygon's
 * vertices in order, and smooth values of _t0_ therein interpolate linearly between adjacent vertices, with an
 * additional segment connecting the last vertex to the first.
 *
 * The returned points will be sorted by _t0_ increasing, i.e. they will be sorted according to the
 * order in which one would visit those locations if one were to travel around the polygon's perimeter in the
 * order of its vertices.
 *
 * Almost equivalent to {@link segmentIntersectPolygonIterator}, except the _t0_ and _t1_ values are reversed
 * and the returned intersections are sorted according to the polygon's geometry.
 *
 * @param poly the polygon to intersect
 * @param segment the line segment to find intersections with
 * @see {@link IPointIntersectionResult}
 * @see {@link IPolygon}
 * @see {@link segmentIntersectPolygonIterator}
 * @see {@link polygonIntersectLineIterator}
 * @see {@link polygonIntersectRayIterator}
 */
export function polygonIntersectSegmentIterator(poly: IPolygon, segment: ISegment): IterableIterator<IPointIntersectionResult> {
  return _polygonIntersectIteratorHelper(poly, segment, segmentIntersectSegment).values();
}
