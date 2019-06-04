import { _polylineIntersectAllHelper } from "../internal/internalFunctions";
import { segmentIntersectLine } from "../segmentFunctions/segmentIntersectLine";
import { IIntersection, ILine, IPolyline } from "../types";

export function polylineIntersectLineIterator(poly: IPolyline, line: ILine): IterableIterator<IIntersection> {
  return _polylineIntersectAllHelper(poly, line, segmentIntersectLine).values();
}
