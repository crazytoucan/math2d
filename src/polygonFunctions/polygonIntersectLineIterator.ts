import { _polygonIntersectIteratorHelper } from "../internal/_polygonIntersectIteratorHelper";
import { segmentIntersectLine } from "../segmentFunctions/segmentIntersectLine";
import { IIntersection, ILine, IPolygon } from "../types";

export function polygonIntersectLineIterator(poly: IPolygon, line: ILine): IterableIterator<IIntersection> {
  return _polygonIntersectIteratorHelper(poly, line, segmentIntersectLine).values();
}
