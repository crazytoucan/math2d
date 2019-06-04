import { _polygonIntersectIteratorHelper } from "../internal/_polygonIntersectIteratorHelper";
import { segmentIntersectSegment } from "../segmentFunctions/segmentIntersectSegment";
import { IIntersection, IPolygon, ISegment } from "../types";

export function polygonIntersectSegmentIterator(poly: IPolygon, segment: ISegment): IterableIterator<IIntersection> {
  return _polygonIntersectIteratorHelper(poly, segment, segmentIntersectSegment).values();
}
