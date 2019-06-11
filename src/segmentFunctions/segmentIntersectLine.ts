import { _intersectionSwapTs } from "../internal/_intersectionSwapTs";
import { lineIntersectSegment } from "../lineFunctions/lineIntersectSegment";
import { pointIntersectionResultAlloc } from "../pointIntersectionResultFunctions/pointIntersectionResultAlloc";
import { ILine, ISegment } from "../types";

/**
 * Computes the intersection point between the given segment and line, if it exists.
 *
 * Finds the location at which the line segment and line meet.
 * If the line "misses" the segment, this function returns no intersection.
 * If the line completely overlaps the segment, this function returns the segment's starting vertex.
 *
 * The returned value is an {@link IPointIntersectionResult} object which will have have the
 * `exists` flag set to `true` iff an intersection was found. It additionally
 * has the following fields, if the intersection exists:
 *
 * - `x` – the x-coordinate of the point of intersection
 * - `y` – the y-coordinate of the point of intersection
 * - `t0` – where along the segment's geometry the intersection was found,
 *      according to the segment's parameterization
 * - `t1` – where along the line's geometry the intersection was found,
 *      according to the line's parameterization
 *
 * Almost equivalent to {@link lineIntersectSegment}, except the returned intersection reverses its _t0_ and _t1_.
 *
 * @param segment the segment to intersect
 * @param line the line to find intersection with
 * @param out
 * @see {@link segmentIntersectPolylineIterator}
 * @see {@link segmentIntersectRay}
 * @see {@link segmentIntersectSegment}
 */
export function segmentIntersectLine(segment: ISegment, line: ILine, out = pointIntersectionResultAlloc()) {
  return _intersectionSwapTs(lineIntersectSegment(line, segment, out));
}
