import { segmentAlloc } from "./segmentAlloc";

/**
 * Construct a new line segment given an (x0, y0) starting vertex and (x1, y1) ending vertex.
 * The two points are allowed to be the same.
 *
 * @param x0 x-coordinate of the segment's starting vertex
 * @param y0 y-coordinate of the segment's starting vertex
 * @param x1 x-coordinate of the segment's ending vertex
 * @param y1 y-coordinate of the segment's ending vertex
 * @param out
 * @see {@link ISegment}
 * @see {@link segmentAlloc}
 * @see {@link segmentClone}
 */
export function segmentReset(x0: number, y0: number, x1: number, y1: number, out = segmentAlloc()) {
  out.x0 = x0;
  out.y0 = y0;
  out.x1 = x1;
  out.y1 = y1;
  return out;
}
