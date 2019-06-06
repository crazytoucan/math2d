import { polylineNearestVertexIndex } from "../polylineFunctions/polylineNearestVertexIndex";
import { IPolygon, IVec } from "../types";

/**
 * Returns the index of the nearest vertex to the given point, starting at 0.
 *
 * @param poly the polygon to inspect
 * @param point the reference point to measure distance to
 */
export function polygonNearestVertexIndex(poly: IPolygon, point: IVec) {
  return polylineNearestVertexIndex(poly, point);
}
