import { _toPolyline } from "../internal/internalFunctions";
import { EPSILON } from "../internal/parameters";
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

  return polylineNearestT(_toPolyline(poly), point);
}
