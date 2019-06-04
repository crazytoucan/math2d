import { IPolyline, IVec } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { polylineNearestT } from "./polylineNearestT";
import { polylinePointAt } from "./polylinePointAt";

export function polylineNearestPoint(poly: IPolyline, point: IVec, out = vecAlloc()) {
  const d = polylineNearestT(poly, point);
  return polylinePointAt(poly, d, out);
}
