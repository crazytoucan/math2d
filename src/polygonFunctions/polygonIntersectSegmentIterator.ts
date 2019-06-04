import { _polygonIntersectAllHelper } from "../internal/internalFunctions";
import { segmentIntersectSegment } from "../segmentFunctions/segmentIntersectSegment";
import { IIntersection, IPolygon, ISegment } from "../types";

export function polygonIntersectSegmentIterator(poly: IPolygon, segment: ISegment): IterableIterator<IIntersection> {
  return _polygonIntersectAllHelper(poly, segment, segmentIntersectSegment).values();
}
