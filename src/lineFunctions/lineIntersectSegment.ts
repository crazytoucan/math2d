import { _intersectionDNE } from "../internal/_intersectionDNE";
import { _lookAt } from "../internal/_lookAt";
import { intersectionAlloc } from "../intersectionFunctions/intersectionAlloc";
import { segmentGetLength } from "../segmentFunctions/segmentGetLength";
import { ILine, ISegment } from "../types";
import { lineAlloc } from "./lineAlloc";
import { lineIntersectLine } from "./lineIntersectLine";

const TMP0 = lineAlloc();

/**
 * Computes the intersection point between the given line and segment, if it exists.
 *
 * Finds the location at which the line and line segment meet.
 * If the line "misses" the segment, this function returns no intersection.
 * If the line completely overlaps the segment, this function returns the line's initial point.
 *
 * The returned value is an {@link IIntersection} object which will have have the
 * `exists` flag set to `true` iff an intersection was found. It additionally
 * has the following fields, if the intersection exists:
 *
 * - `x` – the x-coordinate of the point of intersection
 * - `y` – the y-coordinate of the point of intersection
 * - `t0` – where along the line's geometry the intersection was found,
 *      according to the line's parameterization
 * - `t1` – where along the segment's geometry the intersection was found,
 *      according to the segment's parameterization
 *
 * Almost equivalent to {@link segmentIntersectLine}, except the returned intersection reverses its _t0_ and _t1_.
 *
 * @param line the line to intersect
 * @param segment the segment to find intersection with
 * @param out
 * @see {@link lineIntersectLine}
 * @see {@link lineIntersectPolylineIterator}
 * @see {@link lineIntersectRay}
 */
export function lineIntersectSegment(line: ILine, segment: ISegment, out = intersectionAlloc()) {
  // TODO: https://github.com/crazytoucan/geometry/issues/1
  const segmentLine = _lookAt(segment.x0, segment.y0, segment.x1, segment.y1, TMP0);
  const segmentLength = segmentGetLength(segment);
  lineIntersectLine(line, segmentLine, out);
  if (!out.exists || out.t1 < 0 || out.t1 > segmentLength) {
    return _intersectionDNE(out);
  } else {
    out.t1 /= segmentLength;
    return out;
  }
}
