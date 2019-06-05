import { EPSILON_SQ } from "../internal/const";
import { IPolyline } from "../types";

/**
 * Returns whether the polyline's last vertex equals its first
 *
 * Computes whether the polyline forms a closed shape, i.e. its last vertex
 * is the same as its first. As a special case, the empty polyline `[]` is
 * considered closed.
 *
 * @param poly
 */
export function polylineIsClosed(poly: IPolyline) {
  if (poly.length === 0) {
    return true;
  } else {
    const dx = poly[poly.length - 2] - poly[0];
    const dy = poly[poly.length - 1] - poly[1];
    return dx * dx + dy * dy < EPSILON_SQ;
  }
}
