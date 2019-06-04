import { IIntersection, IPolygon, ISegment } from "../types";
import { _Allocator } from "./_Allocator";
import { _asPolyline } from "./_asPolyline";
import { _polylineIntersectAllHelper } from "./_polylineIntersectIteratorHelper";

const ALLOCATOR = new _Allocator();

export function _polygonIntersectAllHelper<T>(
  poly: IPolygon,
  value: T,
  doIntersectSegment: (segment: ISegment, value: T, out: IIntersection) => IIntersection,
) {
  return _polylineIntersectAllHelper(_asPolyline(poly, ALLOCATOR), value, doIntersectSegment);
}
