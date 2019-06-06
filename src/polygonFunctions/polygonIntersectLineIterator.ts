import { _polygonIntersectIteratorHelper } from "../internal/_polygonIntersectIteratorHelper";
import { segmentIntersectLine } from "../segmentFunctions/segmentIntersectLine";
import { IIntersection, ILine, IPolygon } from "../types";

/**
 * Computes all locations at which a polygon crosses a given line.
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
 * Almost equivalent to {@link lineIntersectPolygonIterator}, except the _t0_ and _t1_ values are reversed
 * and the returned intersections are sorted according to the polygon's geometry.
 *
 * @param poly the polygon to intersect
 * @param line the line to find intersections with
 * @see {@link IIntersection}
 * @see {@link IPolygon}
 * @see {@link lineIntersectPolygonIterator}
 * @see {@link polygonIntersectRayIterator}
 * @see {@link polygonIntersectSegmentIterator}
 */
export function polygonIntersectLineIterator(poly: IPolygon, line: ILine): IterableIterator<IIntersection> {
  return _polygonIntersectIteratorHelper(poly, line, segmentIntersectLine).values();
}
