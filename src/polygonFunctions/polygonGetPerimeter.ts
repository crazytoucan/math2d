import { _asPolyline } from "../internal/_asPolyline";
import { polylineGetLength } from "../polylineFunctions/polylineGetLength";
import { IPolygon } from "../types";

export function polygonGetPerimeter(poly: IPolygon) {
  return polylineGetLength(_asPolyline(poly));
}
