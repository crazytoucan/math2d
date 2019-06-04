import { _toPolyline } from "../internal/internalFunctions";
import { polylineGetSegmentLength } from "../polylineFunctions/polylineGetSegmentLength";
import { IPolygon } from "../types";

export function polygonGetSideLength(poly: IPolygon, idx: number) {
  return polylineGetSegmentLength(_toPolyline(poly), idx);
}
