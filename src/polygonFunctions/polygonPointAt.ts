import { _toPolyline } from "../internal/internalFunctions";
import { EPSILON } from "../internal/parameters";
import { polylinePointAt } from "../polylineFunctions/polylinePointAt";
import { IPolygon } from "../types";
import { vecAlloc } from "../vecFunctions/vecAlloc";
import { vecReset } from "../vecFunctions/vecReset";
import { polygonGetPerimeter } from "./polygonGetPerimeter";

export function polygonPointAt(poly: IPolygon, t: number, out = vecAlloc()) {
  if (poly.length === 0) {
    return vecReset(NaN, NaN, out);
  }

  const perimeter = polygonGetPerimeter(poly);
  if (perimeter < EPSILON) {
    return vecReset(poly[0], poly[1], out);
  }

  t = ((t % perimeter) + perimeter) % perimeter;
  return polylinePointAt(_toPolyline(poly), t, out);
}
