import { IPolyline, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { polylineGetPointAt } from "./polylineGetPointAt";
import { polylineNearestT } from "./polylineNearestT";

export function polylineNearestPoint(poly: IPolyline, point: IVec, out = vecAlloc()) {
  const d = polylineNearestT(poly, point);
  return polylineGetPointAt(poly, d, out);
}
