import { _polygonIntersectAllHelper } from "../internal/internalFunctions";
import { segmentIntersectRay } from "../segmentFunctions/segmentIntersectRay";
import { IIntersection, IPolygon, IRay } from "../types";

export function polygonIntersectRayIterator(poly: IPolygon, ray: IRay): IterableIterator<IIntersection> {
  return _polygonIntersectAllHelper(poly, ray, segmentIntersectRay).values();
}
