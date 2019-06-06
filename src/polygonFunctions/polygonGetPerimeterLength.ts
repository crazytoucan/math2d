import { _asPolyline } from "../internal/_asPolyline";
import { polylineGetLength } from "../polylineFunctions/polylineGetLength";
import { IPolygon } from "../types";

/**
 * Computes the total perimeter length of this polygon.
 *
 * @param poly the polygon whose perimeter should be measured
 * @see {@link polylineGetLength}
 */
export function polygonGetPerimeterLength(poly: IPolygon) {
  return polylineGetLength(_asPolyline(poly));
}
