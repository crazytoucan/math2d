import { IIntersection, IPolygon, ISegment } from "../types";
import { _asPolyline } from "./_asPolyline";
import { _polylineIntersectIteratorHelper } from "./_polylineIntersectIteratorHelper";

export function _polygonIntersectIteratorHelper<T>(
  poly: IPolygon,
  value: T,
  doIntersectSegment: (segment: ISegment, value: T, out: IIntersection) => IIntersection,
) {
  return _polylineIntersectIteratorHelper(_asPolyline(poly), value, doIntersectSegment);
}
