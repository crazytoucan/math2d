import { IPolyline } from "../types";

/**
 * Returns the number of vertices in this polyline
 *
 * Always equal to `poly.length / 2`. This function makes no attempt to remove repeated
 * or NaN vertices, for instance.
 *
 * @param poly
 */
export function polylineGetNumVertices(poly: IPolyline) {
  return poly.length / 2;
}
