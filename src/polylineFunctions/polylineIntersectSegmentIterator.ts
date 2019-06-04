import { _polylineIntersectIteratorHelper } from "../internal/_polylineIntersectIteratorHelper";
import { segmentIntersectSegment } from "../segmentFunctions/segmentIntersectSegment";
import { IIntersection, IPolyline, ISegment } from "../types";

export function polylineIntersectSegmentIterator(poly: IPolyline, segment: ISegment): IterableIterator<IIntersection> {
  return _polylineIntersectIteratorHelper(poly, segment, segmentIntersectSegment).values();
}
