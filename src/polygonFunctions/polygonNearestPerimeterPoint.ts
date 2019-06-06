import { IPolygon, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { polygonGetPerimeterPointAt } from "./polygonGetPerimeterPointAt";
import { polygonNearestPerimeterT } from "./polygonNearestPerimeterT";

/**
 * Computes the closest point that the polygon's perimeter comes to a given reference point
 *
 * @param poly the polygon to inspect
 * @param point the reference point to measure distance to
 * @param out
 * @see {@link polygonNearestPerimeterT}
 */
export function polygonNearestPerimeterPoint(poly: IPolygon, point: IVec, out = vecAlloc()) {
  const d = polygonNearestPerimeterT(poly, point);
  return polygonGetPerimeterPointAt(poly, d, out);
}
