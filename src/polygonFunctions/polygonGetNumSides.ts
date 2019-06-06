import { IPolygon } from "../types";

/**
 * Return the number of sides of this polygon, which is `poly.length / 2`.
 *
 * This function makes no attempt to identify trivial or "empty" sides.
 *
 * @param poly the polygon to inspect
 * @see {@link polylineGetNumSegments}
 */
export function polygonGetNumSides(poly: IPolygon) {
  return poly.length / 2;
}
