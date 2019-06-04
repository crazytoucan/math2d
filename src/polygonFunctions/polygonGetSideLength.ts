import { _asPolyline } from "../internal/_asPolyline";
import { polylineGetSegmentLength } from "../polylineFunctions/polylineGetSegmentLength";
import { IPolygon } from "../types";

export function polygonGetSideLength(poly: IPolygon, idx: number) {
  return polylineGetSegmentLength(_asPolyline(poly), idx);
}
