import { Polyline } from "../types";
import { polylineAlloc } from "./polylineAlloc";

/**
 * Repeats the polyline's first vertex to form a closed path.
 *
 * @param poly
 * @param out
 */
export function polylineClose(poly: Polyline, out = polylineAlloc()) {
  const len = poly.length;
  if (len === 0) {
    out.length = 0;
    return out;
  }

  if (out.length !== len + 2) {
    out.length = len + 2;
  }

  for (let i = 0; i < len; i++) {
    out[i] = poly[i];
  }

  out[len] = poly[0];
  out[len + 1] = poly[1];
  return out;
}
