import { IPolyline, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { polylineGetPointAt } from "./polylineGetPointAt";
import { polylineNearestT } from "./polylineNearestT";

/**
 * Computes the closest point that the polyline comes to a given reference point
 *
 * @param poly
 * @param point
 * @param out
 */
export function polylineNearestPoint(poly: IPolyline, point: IVec, out = vecAlloc()) {
  const d = polylineNearestT(poly, point);
  return polylineGetPointAt(poly, d, out);
}
