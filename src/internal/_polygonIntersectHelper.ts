import { IPointIntersectionResult, IPolygon, ISegment } from "../types";
import { _asPolyline } from "./_asPolyline";
import { _polylineIntersectHelper } from "./_polylineIntersectHelper";

export function _polygonIntersectHelper<T>(
  poly: IPolygon,
  value: T,
  doIntersectSegment: (segment: ISegment, value: T, out: IPointIntersectionResult) => IPointIntersectionResult,
) {
  return _polylineIntersectHelper(_asPolyline(poly), value, doIntersectSegment);
}
