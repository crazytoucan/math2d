import { _polylineIntersectIteratorHelper } from "../internal/_polylineIntersectIteratorHelper";
import { _swapAndReorderIntersections } from "../internal/_swapAndReorderIntersections";
import { IIntersection, IPolyline, ISegment } from "../types";
import { segmentIntersectSegment } from "./segmentIntersectSegment";

export function segmentIntersectPolylineIterator(segment: ISegment, poly: IPolyline): IterableIterator<IIntersection> {
  return _swapAndReorderIntersections(_polylineIntersectIteratorHelper(poly, segment, segmentIntersectSegment));
}
