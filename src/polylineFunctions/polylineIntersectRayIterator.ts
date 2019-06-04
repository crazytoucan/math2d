import { _polylineIntersectAllHelper } from "../internal/internalFunctions";
import { segmentIntersectRay } from "../segmentFunctions/segmentIntersectRay";
import { IIntersection, IPolyline, IRay } from "../types";

export function polylineIntersectRayIterator(poly: IPolyline, ray: IRay): IterableIterator<IIntersection> {
  return _polylineIntersectAllHelper(poly, ray, segmentIntersectRay).values();
}
