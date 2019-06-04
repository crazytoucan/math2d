import { EPSILON_SQ } from "../internal/const";
import { IPolyline } from "../types";

export function polylineIsClosed(poly: IPolyline) {
  if (poly.length === 0) {
    return true;
  } else {
    const dx = poly[poly.length - 2] - poly[0];
    const dy = poly[poly.length - 1] - poly[1];
    return dx * dx + dy * dy < EPSILON_SQ;
  }
}
