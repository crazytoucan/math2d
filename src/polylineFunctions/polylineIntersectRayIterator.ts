import { _polylineIntersectIteratorHelper } from "../internal/_polylineIntersectIteratorHelper";
import { segmentIntersectRay } from "../segmentFunctions/segmentIntersectRay";
import { IIntersection, IPolyline, IRay } from "../types";

export function polylineIntersectRayIterator(poly: IPolyline, ray: IRay): IterableIterator<IIntersection> {
  return _polylineIntersectIteratorHelper(poly, ray, segmentIntersectRay).values();
}
