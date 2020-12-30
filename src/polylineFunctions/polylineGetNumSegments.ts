import { Polyline } from "../types";

/**
 * Returns the number of individual line segments in this polyline
 *
 * This function computes the number of line segments represented by this polyline,
 * which is always `Math.max(0, poly.length / 2 - 1)`. This function makes no effort to identify and filter
 * "trivial" or "empty" segments that may exist along its path.
 *
 * @param poly
 */
export function polylineGetNumSegments(poly: Polyline) {
  return Math.max(0, poly.length / 2 - 1);
}
