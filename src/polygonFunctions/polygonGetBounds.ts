import { boxAlloc } from "../boxFunctions/boxAlloc";
import { polylineGetBounds } from "../polylineFunctions/polylineGetBounds";
import { IPolygon } from "../types";

/**
 * Calculate the smallest bounding box that contains this polygon's geometry
 *
 * @param poly the polygon to compute the bounds of
 * @param out
 */
export function polygonGetBounds(poly: IPolygon, out = boxAlloc()) {
  return polylineGetBounds(poly, out);
}
