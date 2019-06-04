import { _polylineIntersectAllHelper } from "../internal/internalFunctions";
import { segmentIntersectSegment } from "../segmentFunctions/segmentIntersectSegment";
import { IIntersection, IPolyline, ISegment } from "../types";

export function polylineIntersectSegmentIterator(poly: IPolyline, segment: ISegment): IterableIterator<IIntersection> {
  return _polylineIntersectAllHelper(poly, segment, segmentIntersectSegment).values();
}
