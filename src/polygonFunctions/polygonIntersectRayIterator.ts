import { _polygonIntersectIteratorHelper } from "../internal/_polygonIntersectIteratorHelper";
import { segmentIntersectRay } from "../segmentFunctions/segmentIntersectRay";
import { IIntersection, IPolygon, IRay } from "../types";

export function polygonIntersectRayIterator(poly: IPolygon, ray: IRay): IterableIterator<IIntersection> {
  return _polygonIntersectIteratorHelper(poly, ray, segmentIntersectRay).values();
}
