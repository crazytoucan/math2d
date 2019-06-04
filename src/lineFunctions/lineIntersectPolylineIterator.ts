import { _polylineIntersectIteratorHelper } from "../internal/_polylineIntersectIteratorHelper";
import { _swapAndReorderIntersections } from "../internal/_swapAndReorderIntersections";
import { segmentIntersectLine } from "../segmentFunctions/segmentIntersectLine";
import { IIntersection, ILine, IPolyline } from "../types";

export function lineIntersectPolylineIterator(line: ILine, poly: IPolyline): IterableIterator<IIntersection> {
  return _swapAndReorderIntersections(_polylineIntersectIteratorHelper(poly, line, segmentIntersectLine));
}
