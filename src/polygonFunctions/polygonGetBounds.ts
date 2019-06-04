import { boxAlloc } from "../boxFunctions/boxAlloc";
import { polylineGetBounds } from "../polylineFunctions/polylineGetBounds";
import { IPolygon } from "../types";

export function polygonGetBounds(poly: IPolygon, out = boxAlloc()) {
  return polylineGetBounds(poly, out);
}
