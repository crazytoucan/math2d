import { Polyline } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";

/**
 * Retrieves a vertex from this polyline's geometry, starting at index 0
 *
 * @param poly
 * @param index
 * @param out
 */
export function polylineGetVertex(poly: Polyline, index: number, out = vecAlloc()) {
  const l = 2 * index;
  return l >= 0 && l < poly.length ? vecReset(poly[l], poly[l + 1], out) : vecReset(NaN, NaN, out);
}
