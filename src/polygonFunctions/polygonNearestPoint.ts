import { IPolygon, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { polygonGetPointAt } from "./polygonGetPointAt";
import { polygonNearestT } from "./polygonNearestT";

export function polygonNearestPoint(poly: IPolygon, point: IVec, out = vecAlloc()) {
  const d = polygonNearestT(poly, point);
  return polygonGetPointAt(poly, d, out);
}
