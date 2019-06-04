import {
  _invertValuesIterator as _reorderValuesIterator,
  _polylineIntersectAllHelper,
} from "../internal/internalFunctions";
import { IIntersection, IPolyline, IRay } from "../types";
import { segmentIntersectRay } from "./segmentFunctions";

export function rayIntersectPolylineIterator(ray: IRay, poly: IPolyline): IterableIterator<IIntersection> {
  return _reorderValuesIterator(_polylineIntersectAllHelper(poly, ray, segmentIntersectRay));
}
