import { _invertValuesIterator, _polylineIntersectAllHelper } from "../internal/internalFunctions";
import { IIntersection, IPolyline, ISegment } from "../types";
import { segmentIntersectSegment } from "./segmentIntersectSegment";

export function segmentIntersectPolylineIterator(segment: ISegment, poly: IPolyline): IterableIterator<IIntersection> {
  return _invertValuesIterator(_polylineIntersectAllHelper(poly, segment, segmentIntersectSegment));
}
