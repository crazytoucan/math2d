import { _polylineIntersectIteratorHelper } from "../internal/_polylineIntersectIteratorHelper";
import { segmentIntersectLine } from "../segmentFunctions/segmentIntersectLine";
import { IIntersection, ILine, IPolyline } from "../types";

export function polylineIntersectLineIterator(poly: IPolyline, line: ILine): IterableIterator<IIntersection> {
  return _polylineIntersectIteratorHelper(poly, line, segmentIntersectLine).values();
}
