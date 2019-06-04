import { _invertValuesIterator, _polylineIntersectAllHelper } from "../internal/internalFunctions";
import { IIntersection, ILine, IPolyline } from "../types";
import { segmentIntersectLine } from "./segmentFunctions";

export function lineIntersectPolylineIterator(line: ILine, poly: IPolyline): IterableIterator<IIntersection> {
  return _invertValuesIterator(_polylineIntersectAllHelper(poly, line, segmentIntersectLine));
}
