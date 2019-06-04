import { _toPolyline } from "../internal/internalFunctions";
import { polylineGetLength } from "../polylineFunctions/polylineGetLength";
import { IPolygon } from "../types";

export function polygonGetPerimeter(poly: IPolygon) {
  return polylineGetLength(_toPolyline(poly));
}
