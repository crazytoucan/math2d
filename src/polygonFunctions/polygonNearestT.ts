import { _asPolyline } from "../internal/_asPolyline";
import { EPSILON } from "../internal/const";
import { polylineNearestT } from "../polylineFunctions/polylineNearestT";
import { IPolygon, IVec } from "../types";
import { polygonGetPerimeter } from "./polygonGetPerimeter";

export function polygonNearestT(poly: IPolygon, point: IVec) {
  if (poly.length === 0) {
    return NaN;
  }

  const perimeter = polygonGetPerimeter(poly);
  if (perimeter < EPSILON) {
    return 0;
  }

  return polylineNearestT(_asPolyline(poly), point);
}
