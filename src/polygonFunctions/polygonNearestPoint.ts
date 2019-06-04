import { IPolygon, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { polygonNearestT } from "./polygonNearestT";
import { polygonPointAt } from "./polygonPointAt";

export function polygonNearestPoint(poly: IPolygon, point: IVec, out = vecAlloc()) {
  const d = polygonNearestT(poly, point);
  return polygonPointAt(poly, d, out);
}
