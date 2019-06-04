import { _polygonIntersectAllHelper } from "../internal/internalFunctions";
import { segmentIntersectLine } from "../segmentFunctions/segmentIntersectLine";
import { IIntersection, ILine, IPolygon } from "../types";

export function polygonIntersectLineIterator(poly: IPolygon, line: ILine): IterableIterator<IIntersection> {
  return _polygonIntersectAllHelper(poly, line, segmentIntersectLine).values();
}
