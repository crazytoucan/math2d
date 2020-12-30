import { Polyline } from "../types";

/**
 * Computes the length of one of a polyline's segments by index, starting at 0.
 *
 * @param poly
 * @param idx
 */
export function polylineGetSegmentLength(poly: Polyline, idx: number) {
  const l = 2 * idx;
  const dx = poly[l + 2] - poly[l];
  const dy = poly[l + 3] - poly[l + 1];
  return Math.sqrt(dx * dx + dy * dy);
}
