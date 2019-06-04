import { _polylineIntersectIteratorHelper } from "../internal/_polylineIntersectIteratorHelper";
import { _swapAndReorderIntersections } from "../internal/_swapAndReorderIntersections";
import { segmentIntersectRay } from "../segmentFunctions/segmentIntersectRay";
import { IIntersection, IPolyline, IRay } from "../types";

export function rayIntersectPolylineIterator(ray: IRay, poly: IPolyline): IterableIterator<IIntersection> {
  return _swapAndReorderIntersections(_polylineIntersectIteratorHelper(poly, ray, segmentIntersectRay));
}
